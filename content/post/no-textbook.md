---
title: "No Textbook: lessons for fellow developers"
date: 2025-08-19T15:09:25+04:00
draft: false
---

I have stopped writing since roughly 2023. In part because war had changed my perspective on things. But that perhaps for another article. The main reason though that I stopped writing was due to AI: I felt lack of originality and I also tend to em a lot.

But here we are 2 3 years later after we were promised chatgpt and artificial general intelligence are bound to happen. 

The goal of this post, albeit of the bumpy start is about software the _engineering_ part. I'd like to share some of the small things that usually you learn somehow but you rarely find them in a textbook. Or a youtube video. They are nonetheless pre-requisites and everyone just assumes you have prior knowledge. 

- you need to actually test your changes as in: test they are actually working as intended in their respective env. Unit and integration tests while are useful; you still _must_ do that manual thing. 
- make your commits independent and cherry-pickable. That will help you in reverting them and it will make for a nice logical block of code
- atop of that make your commit related to a single feature. It will hurt more than it helps when making a commit that will touch feature-a and feature-b
- be teachable: try to be open to be wrong, skill issues are fine! They will help you get better. Stay humble.
- always benchmark, vibes and gut feeling are good but better support that with data
- communication is important: if you are unable to deliver a feature in time relay that. There's simply nothing wrong with not delivering a task. Just communicate that.
- be someone that others want to work with. I don't know how to put this in words, it can vary from being approachable in general, to being supportive and/or well versed in the work. Each one of those has its impact but I think in general you want to be the one who knows the most about work, who's humble enough that others can tap into and ask. Basically, try to learn more AND try to help others by unblocking them, help/and steer them with what you have.
- rely on database, rely on SQL don't follow the hype. Where's GraphQL now? SQL can help you with 99% of your business problem in a large system. For the remaining 1% you wouldn't need this advice anyway.
- simple code is always better than genius. Optimize for reading, write a code that you can easily debug. Minimize surface and entry points. Write code that can fit into your brain (your now brain with all of the context, and the future one). That can be:
    - in most of the cases you want to have a simple way to call your function and ideally, you want that function to do a simple thing
    - writing small functions for sake of readability is often hurtful: a longer method that does what it advertises is often better than the mental juggling of going between many method calls
    - functional approach is smart but kinda difficult to follow (my skill issues are leaking!). Procedural top to bottom is just better.


There are many more I will try to add them in sometime.