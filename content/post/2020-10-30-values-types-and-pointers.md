---
date: "2020-10-30T00:00:00Z"
excerpt: Pointers, values, and a fun way to learn about go's `json/encoding` internals.
title: 'Values and pointers: What could possibly go wrong?'
---

This post highlights a weird and expected behavior we encountered while using Go's `encoding/json` library. 

In go, we pass by value, that really means this:

```go

type User struct {
    Name string
}

func changeMe(u User) {
    u.Name = "New Name"
}

func main(){
    u := User{Name: "mohamed"}

    changeMe(u)
    log.Printf("The user is: %s", u.Name)

    // mohamed
}
```

To change by value, we must pass a pointer, we can change the code to be something like this:

```go

func changeMe(u *User) {
     u.Name = "New Name"
}

// same code

    u := User{Name: "mohamed"}

    changeMe(&u)   //<--- we made a change here! We should pass the memory address to user
    log.Printf("The user is: %s", u.Name)

    // New Name
```

But in go, we slightly use a different syntax for this, we use a method receiver on the struct. More like method to classes on other languages.

The code will be something like this.


```go

type User struct {
    Name string
}

func (u User) changeMe(u User) {
    u.Name = "New Name"
}

func main(){
    u := User{Name: "mohamed"}

    changeMe(u)
    log.Printf("The user is: %s", u.Name)

    // mohamed
}
```

Note that, we are still printing in `mohamed`, as we are still passing to the `changeMe` method a new value. We pass by value in Go. To pass by reference (as in Python or Java), we do this slight change:


```go

type User struct {
    Name string
}

func (u *User) changeMe(u User) {
    u.Name = "New Name"
}

func main(){
    u := User{Name: "mohamed"}

    changeMe(&u)
    log.Printf("The user is: %s", u.Name)

    // New Name
}
```

This very small but subtle change was a cause of horror for me in the past couple of days.


## about marshalling

Or really how to do http handlers wrong!

In go, everything is initialized to its zero value: `""` for a string, `0` for int, and `nil` for pointers. That turns out to be very powerful and it indeeds avoid certain types of bugs. It is also very convenient to use as well. One bad pitfalls of it, but not relevant to my bug is how to differentiate between zero as a value or zero as a initial value. We usually make these types pointers to get a nil instead of its zero value -- especially when a zero value is actually meaningful. For example, EBS response code for successfull transactions is 0, and at the same time, when our connection to EBS times out (or any other http connection errors), we get a zero as well (since it is initialized to its zero value). Subtle, but helpful.

Now, how does that work if we were the server and not the client. That turns out to be very interesting in two distinctive places:

- Go's `encoding/json` library
- and global state (yeah global is really really terrible)

Let us get back to our previous example again and add some json marshalling to it. For breifty our code was like this, i also added an http handler


```go

type User struct {
    ID int // add this field just to make sense
    Name string
}

func (u *User) changeMe(u User) {
    u.Name = "New Name"
}

func main(){
    u := User{Name: "mohamed"}

    changeMe(&u)
    log.Printf("The user is: %s", u.Name)
    http.HandlerFunc("/create", createNewUser)
    http.ListenAndServe(":8080", nil)

    // New Name
}

// the correct approach
func createNewUser(w http.ResponseWriter, r *http.Request){
    var u User
    body, err := ioutil.ReadAll(r.Body)
    // handle err
    defer r.Body.Close()

    // we have []byte body, let's marshall it

    err := json.Marshall(body, &u) // since json.Marshall accepts an interface, we have to send to it the pointer of u not its value

    // do DB writeup, etc..
}
```

Now, if we curl:

`curl -X POST http://localhost:8080/create -d '{"Name": "Mohamed"}'`

Now, this is cool, simple and straightforward. This code works well. Now let's fuck it up a bit. I'm gonna make a few changes to instate this brain fuckery.


```go

type User struct {
    ID int // add this field just to make sense
    Name string
}

func (u *User) changeMe(u User) {
    u.Name = "New Name"
}

var u &User

func init(){
    u.DB = getMyDbHandler()
}

func main(){
   

    http.HandlerFunc("/create", u.createNewUser)
    http.ListenAndServe(":8080", nil)

    // This is bad code... VERY BAD TERRIBLE ONE
}

// the correct approach
func (u *User)createNewUser(w http.ResponseWriter, r *http.Request){
   
    body, err := ioutil.ReadAll(r.Body)
    // handle err
    defer r.Body.Close()

    // we have []byte body, let's marshall it

    err := json.Marshall(body, u) // since json.Marshall accepts an interface, we have to send to it the pointer of u not its value

    // do DB writeup, etc..
}
```

What we did is actually simply following one of Go's http handlers practices. We want to share the DB connection among our services as oppose of creating a new db instead EVERYTIME we connect to a database.


This code has two subtilities:

- it manages a global state that is shared between the program (`var u &User`)

When we `json.Marshall` in `createNewUser`, we are not marshalling to a new zero-initialized `User` struct. Instead we are overriding a previous `User` struct (e.g., made from a previous request). And this is a stright up memory fuckery.

This is literally like this:

    - user1 sends a request and it compelted
    - when user2 sends a request it overrides user1's *data*

Now, when the really shit gets going:

- and it also subjects to an error in json marshalling

Let's see

### how does json marshalling works in Go

`json.Marshall` takes an interface and the reason for that is:

- in go we don't have generics type
- json.Marshall uses reflect (or reflection) to get the underlying type of the interface pointer and what we refer to in go as struct tags. They are special syntax attached to the struct to be used by json.Marshall to achieve certain features, one of them being json representation for a struct field, etc.

For example, if we were to return `{"name": "Mohamed"}`, instead of `{"Name": "Mohamed"}`, we were to do this in User struct definition:

```go

type User struct {
    Name string `json:"name"`
}
```
and so on.

Now let's walk through how `json.Marshall` actually works in Go:

And bear in mind that _every value in go is initalized to its zero value_.

WHAT HAPPENS WHEN WE SEND IN NULL, FROM THE CLIENT!


`curl -X POST http://localhost:8080/create -d '{"Name": null, "ID": 1}'`

Now this is interesting!

Well, that *depends*. State is bad my friend. Don't ever manage a state.



1. When we first launch the program

```shell
$ print(u)
{Name: "", ID: 1}
```
Now, let's curl it again, but this time with a value for Name

`curl -X POST http://localhost:8080/create -d '{"Name": "mohamed", "ID": 1}'`

```shell
$ print(u)
{Name: "mohamed", ID: 1}
```

NOW, let's curl it *again*, but this time with null instead. I also changed the ID so one can see where i'm going with this!

`curl -X POST http://localhost:8080/create -d '{"Name": null, "ID": 10}'`

```shell
$ print(u)
{Name: "mohamed", ID: 10}
```

WTF! WTF!!!! how this even happened!


The reason is two things:

- in our struct tag, we defined `Name` as a string, not NULL!
- and the major fuckery is that our code manages state. So, it has the previous data stored there. The previous request data stored there!

In languages like python and javascript, where memory model is so abstracted away it is so hard to fall into this kind of bugs. But in go you do and you do that very simply.

When marshalling a value, in reflection `encoding/json` iterate through all exported fields to get and match their types with the incoming json. If it fails, it _leaves in the specific field as it is with its value and not attempt to change it_. That is usefull, totally intuitive and makes sense and a source of a bug for our program.

The simple fix is to refactor the struct code to be something like this:

```go

type UserService struct {
    User
    ... add other fields here
}


```
And change the `/create` handler to be a method receiver for `UserService` not for `User`. The reason being we want to preserve state in UserService (for example we want to store DB connection there), *AND* not storing or keeping track of the `User`.


