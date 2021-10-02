---
title: technical jargons
layout: post
excerpt: "fuck best practices and to clean code my ass"
tags:
    - technical
    - bad-practices
    - ranting
---

i'm back to writing again. Hooray! Something's been coocked aight?

Today i want to talk about a few things i hate about programming. Lots of enthusiastic programmers fall into this trap that is: 🥁🥁🥁 clean code! I don't know of anything that is as subjective as _clean code_. You just cannot say whether this code is clean or not. It doesn't make sense at all.


## java

fuck java. Honestly, whenever i have a conversation with a java developer and no matter how senior they are it is always the same topics: best practices, clean code, and design patterns. They are all shitty, 90s terminologies! 

So, what is the fuss? 

- design patterns
these are mostly java-orginiated concepts. Unless your work requires you to actually work on a codebase that follows a strict structure, you don't need to know about them. I personally don't know any thing about them and i don't even want to bother to know.

- clean code
Fuck. there's nothing as clean code. 

- best practices
Fuck. there's nothing as a best practice. Write it first, iterate on that. You will at some point find a practice that better suits your mental model. Your practice doesn't necessarily translates to Ahmed's practice, remember it was a mental model and we know mental models differ

I hate these terminologies because i feel they work as a gatekeeper: you are not a developer before you know design patterns, you are not a developer before you write a clean code. Actually fuck all of that! 

### and now for something completely different

Tada! the new boss in town is "testable" and "maintainable". Honestly, guys what the actual fuck? have you lost your minds? this is very abstract it actually drives me crazy! like what the fuck "maintainable" even means? how on the fucking earth would anyone be able to decide that?

Guys, let's get back a bit: maintainable means: someone can actually handle my code after i left the company or after i left my code or whatever. How can we ensure that my next peer will find it easy to run my code and add on it. Two things: 

- we write documentations: eg we write human text that shows the intention of our code and why we did this or that
- we write tests for our functions within that source code (usually called unit-testing): these tests ensure that our functions run as intended AND when we modify our functions' code we still have these test in place to ensure that it works as expected.

nothing beyond those two simple things we can objectively use to judge how a code can be maintinable. 

When i read "maintinable" and "testable" it seems so abstract a concept, and so weird thing that i fail to grasp what that even means. Maintainable is a very tricky word: you can use it to label anything you don't like, on your own personal perferences. 

If i have an advice to younger developer it would be: be curious, start building and stop theorizing, be eager to be wronged and actually learn from that. And programming is really dope, no matter how those idiots try to make it look lame.