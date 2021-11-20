---
date: "2020-01-04T00:00:00Z"
title: A premiere on system design
---

We run [noebs](https://github.com/adonese/noebs) and it is by far the most feature complete payment middleware in Sudan. Noebs is used by different banks and other payment providers, in addition to us. This post is not about that, I want to discuss more on what is it like to build such a system.

When doing software, we almost always tend to make more features, and many times it is because of the sheer joy of doing so. Fixing bugs is boring, and optimizing the system to gain more performance is quite hard. The easiest thing is to just build a new feature! This is also very clear when adopting a new technology or maintaining the old one. We all love the shiny new thing.

noebs is written in GO, we could have used Python instead. In fact, when i built noebs i first started with a Python project! Python is quite very hard to maintain actually. Runtime errors have been very hard on me during my work at @Morsal. Go feels just awesome for this work. After that we settled on gorm and sqlite for database driver and database respectively. You can see that none of these choices are "enterprise software".
The enterprise-y world runs on Java + MySQL and friends, not those "development tools!" Feedback loop is very important. Development time is extremely important. Noebs by all means is a toy project and i will always make sure to make it that way. If you take the joy out of programming, it becomes a task, and i happen to hate tasks.

We were in the early days of building what becomes later [Solus](https://soluspay.net). We had a market to catch, and I really didn't need to fight with the database server, or try and debug it. We just need a local "testing" database, and later we can change that!

# Gradually building

There's no such thing as a final release. We all know that, but do we really work accordingly? Noebs has had more than 500 commits past year, which means nearly 2 commits per day. We nearly deploy new code EVERYDAY, more than once! This is insane right? There's no magic though:

- we use Azure DevOps
- it runs our test suite
- reports the results
- [can optionally deploy to our testing server]

Noebs was not meant to be a fully fledged system. In fact, i deliberately tried to make it as simple as possible.
We work in electronic payment. I happened to work with really old and complicated embedded system POS. We had this HUGE payment system i used to maintain. It has all of the payment features and more. It has everything, too much of everything. It was a huge monolithic system with the payment logic mostly tied to the business logic--and that's a big mistake!

> The thin-est available layer

Noebs is fully compatible with EBS[2] APIs. It can be used easily as a drop-in-replacement for EBS actually!

## Grow independantly

We write software in pieces. Just like how we (or we should) write a program. We organize it into pieces.

```ts
function reader(f: string) {
 // read some data
}

function process(d: Type) {
    // process data
}

function writer(f: string) {
    // write data
}

main(){

}
```

The same applies to systems, as well.

- http services / endpoints
- database and persistent layer
- logging and instrumentation

And as simple and quite the case that might be, people often miss it and don't generalize this to other situations.
