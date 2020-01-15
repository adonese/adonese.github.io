---
title: How to design libraries
layout: post
---

This post is about how to design libraries. It can help you write good code that you can reuse it in other different parts.

## don't do too much

We will take examples to make it more clear. When working with [Cashqbot our Telegram Payment Bot](https://t.me/cashqbot). We have `/rate` feature which allows our users to get the USD rate of today [Thanks to the folks of price today](https://www.price-today.com/currency-prices-sudan/). I will just go through how we implmeneted this feature and what we can learn from that.

### make it works for GOD'S sake!

it is of zero use to discuss about any fancy api design when the functionality is not working!

This part is quite easy, we used of go x/html stuff to parse www.price-today.com/currency-prices-sudan. Parsing was quite straightforward:

- we iterate through html tag that contains our fields
- match against our hardcoded values (representing the fields we want)
- final round of clearing the text and parsing the strings to floats

Now, it actually works, whenever we call this function we get a result. And it is mostly the same result, every time.

We shipped the code as it is.

#### it works, let's enhance it

This system has a problem, everytime a user's hit `/rate` we make an external http call to the currency website. And we parse it too. The external http call is quite expensive, and we don't want to bloat our good folks with unnecessary traffic. Cache it.

The idea is we want an in-memory caching that allows us to store and retrieve data. It should also invlidates the cache. We found _a third part go library that offers a nice caching api_.

Our caching stopped working! TESTING TESTING TESTING

Let's enlist the dependancies to see where things could possibly go wrong:

- we are relying on an external caching library
- we are relying on an external provider (for currency rate)
- we have also refactored the code to make the rate service an external grpc endpoint.

Things are getting pretty tough now.

###### Don't optimize twice

There's no rule for this and it seems quite arbitrary actually. In procedural linear systems catching bugs is really simple! You just traverse through the program until you hit that line that breaks and then you fix it.

When hitting `/rate`, this happens:

- we query the cache service to see if we have any valid values, if yes we use this value and we are all set ready 🚀.
- if not, we:
  - call the rate **function**
  - retrieve the value and update the cache
  - get the value from the cache

Since rate service will be used by different clients on our stack, we find that it makes sense to refactor it and make it a grpc endpoint, so now we have:

- we query the cache service to see if we have any valid values, if yes we use this value and we are all set ready 🚀.
- if not, we:
  - call the rate **grpc endpoint**
  - retrieve the value and update the cache
  - get the value from the cache

Now, we can use our rate service from different platforms without rewriting it over and over.

But none of that fixed the problem.

#### testing is vital for software

Software is intrinsically broken, and the moment you realize that you stop trusting everything, and most importantly YOU!

Our external currency provider has changed their html which break all of our parsing logic. We fixed it.

### revisiting the design

The rate service was a good decision. It will allow for this service to grow independantly from the rest of the system, while being used by different clients. In cashqbot, it was like 100 LOC, but what if we want to add more currency providers? What if we want to handle different currencies than just USD (this will likely result in breaking current implementation). It can also decide to maintain the api for these clients, while having another one. The possibilities are endless. It can grow too much that containing it in cashqbot requirements. And software always grows. Containment is wrong. Embrace its complexity and let it grows without affecting other parts. Let it grow _independently_.

#### library and the clients

Libraries are made to handle the general case, their clients should accounts for the special cases. The design of rate service is quite simple:

- it uses grpc protocol
- it gets the result with error if available

It is the responsibility of the client to implement the protocol and to handle the errors. But, what about caching the results? It is the client responsibility to handle the results. `rate service` doesn't care about this, it just gets a (float32, error). Adding the cache there is completely hurtful -- and I see lot's of people do that. The clients are responsible for implementing this logic. And this is the gist of this post.

##### rate limiting

cashqbot has a go routine that handles the limiting service, the logic is quite simple:

- get the result and store it in a package level variable
- a ticker channel that activates every [TIME]
- at each time it activates, we update that variable by connection to `rate service`
- our bot rate handler becomes like this:

```go
// it is not exactly this way, but it is the gist of it
func rate() float32{
    return myGlobalRateVariable
}
```

## Results

- We have refactored the rate function into a new rate service that is exposed over grpc endpoint. The new grpc service can grow in complexity while not affecting other system components and maintinaing backward compatibility
- We have hugely simplified bot rate handler
- The `rate service` is not tightly coupled to any client's specifications
- We hardened our tests for the rate service parsing logic
