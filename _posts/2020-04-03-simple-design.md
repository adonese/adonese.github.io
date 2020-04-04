---
title: "Simple design: probably a good one!"
layout: post
---

This article is intended to be rather short ™. I will discuss my latest tool [https://github.com/adonese/ebs-live](ebs live dashboard api consumer). As the name suggests, this tool simply converts EBS's website into an API. Pretty simple right.

## the problem

- we have an html document
- we want to parse it
- to extract some text, `v`

We can use Go's excellent x/net/html library to parse the html. `html` package provides the following:

- proper utf-8 encoding
- html `body` node traversing (e.g., it does exactly what your browser do with manipulating and accessing the DOM)

The code for this part is really simple so, i won't go into it at all.


## challenges

- ebs server is down. This is a problem in that we have to need a way for failure retrial, and we also don't want to offload their server with unnecessary hits. 
- having their server down is also problematic in that if we will fail *whenever* ebs fails, then what is the value proposition of what we're offering here?

Caching for the win! Or storage. We need to store the value somewhere so we can retrieve it (if we failed to get results from EBS).

## keep it simple, stupid

The urge to use a database for this task is just isane. But, you really don't need to do so!

- we can store it in a list
- we can store it in hashmap 
etc

Let's model the problem we are fixing actually.

```go
type store struct {
    time time.Time // time of retrieval
    value int // value we want
    isEmpty bool
    result []store //hmmm what is this thing?
}
```

As you can see, we have added `result` which is a list of type `store`. This is really neat feature as it will allow us to recursively add new `store` objects to the `store` object. Slices in go are pointers to arrays and as a result they can be passed around efficiently. We can append into this list from different state in our application.

`store` struct has other methods as well, namely:

    (*store).getEBS(url string)

    (*store).append(store)

    (*store).getLatest()store

    (*store).toJson(store)someJsonObject

They can be used to keep the code clean and let you to easily refactor and fix the code.

## channels and caching

ebs-live will use channels. Another awesome concept from go to achieve concurrency and communicate between different threads (or go routines). Every 1 minute, we check EBS endpoint and `(*store).getEBS(url string)` to ebs-live. This way we will only be hitting EBS servers one time per minute.

Caching the result is the nice part, and it is where everything comes together. After we `(*store).getEBS(url string)` from ebs, we append these data:

```go
s.result = append(s.result, newData)
```

This way, s.result will be updated with the latest result from ebs PLUS, we are also preserving the previous data. 

### failures

Preserving data is vital here since ebs service (or this external service) in unreliable and we believe it will get down. Our users expect to find something when they hit our system, and it will be extremely awkward if we return an error.

Let's see how `(*store).getLatest()store` works. 

```go
func (s *store)getLatest()store {
    
    for i := len(s.result); i--; i ==0 {
        if s.result[i].isEmpty {
            continue
        }
        return s.result[i]
    }
    // error handling is ommitted
}
```

So, starting backward, we traverse the []store and returns the first value with `isEmpty` is not true. This solves the problem of what happens when ebs server is down for us. Remember we have `store.time` field, which will be used in the response to notify the user when this data was retrieved.

There are plenty of nice things i enjoyed and learned a lot while doing this exercise, and I'd definitely recommend everyone to check out the code at: https://github.com/adonese/ebs-live and contribute to it. 

Keeping the design simple makes our programs maintainable and "nice" to work with. In this post we learned how to:

- use the standard library to make an in-memory storage
- use the standard library to parse html document
- use the standard library to do concurrency
- use the standard library to orchestrate all of that

Developers often forget how Computer Science topics in data structure are so powerful and can help a lot! Relying on other's code is usually a bad trait and it should be discouraged. And data structures are really powerful topic and a huge area to explore and learn from!