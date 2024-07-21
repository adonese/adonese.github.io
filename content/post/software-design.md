---
title: "Software Design"
date: 2024-07-21T17:13:50+03:00
draft: false
---

Designing a software program that can work efficiently very well, and testable in that new features and enhancements can be added to it is a bit of work. The way I approach can often be labeled as a _lazy_ or naive way. That is a fair statement. I believe a good design is the simple one. A simple design is iterative in its nature, always assume that your first version of your program is a beta one. Even if your program was the best, it might not meet the expected requirements, or the requirements might have just changed.



So you need to start from somewhere and then iterate on it. I believe it is always better to start from a place where you are very comfortable at. Start with REST apis as oppose to gRPC, a single server as oppose to kubernetes. That well serve as a good proof of concept and will provide you with first hand exposure to the problem at hand. 

But there are some tricks and quality of life tools you might opt to:
- instrument your application, use prometheus and maybe export its logs to grafana: that way you have more clarity whether your problem is io bound or cpu one
- logging can help you go long way
that way you will be able to monitor the actual performance of your system and you will manage to squeeze every bit of performance out of it. Whenever someone tells me that tool a or b is slow, I always ask them whether they have benchmarks to support that. We yearn for complexity and fancy-ness and in our pursuit for that we discard the simple and efficient tools, for the psychological reward of deploying a complex architecture.

And sometimes requirements changes and for startups POC is always prefered over a full blown solution. By then, you would have more clarity about the problem and its interactions too. You will become more adept to the problem nuances and that will help you enhance your next iteration with more context about the problem. Computers are really fast and in most of the cases you don't really need kubernetes, nor a 3-pager AWS architecture.

