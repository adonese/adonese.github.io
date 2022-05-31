---
title: What are we cooking in noebs
layout: post
tags:
    - noebs
    - techie
    - software
excerpt: "Are we ready for noebs v1 yet?"
---

noebs is couple of yours old now, actually next October it will complete its 4th year. That's a lot of years especially in Sudan, software are rather dropped quickly.

## what is noebs?

noebs is an open source payment gateway. Currently it implements all of EBS services, it supports both EBS Merchant Web Services and Consumer Web Services. It also comes with a built-in support for the new Dynamic Fees model. We also support QR services and the new Merchant Web APIs. In that, I know of none that actually have such thorough level of coverage and actively being developed. So yaaay to us!

## noebs v1 

We are not there yet, I wish I could say that, but we are not there yet. Let's get back a bit and understand what we were initially thinking of when we started this project.

### we want to change the payment landscape

Originally, noebs was meant to act as a unified payment gateway for all of EBS services. However, we realized that we need to separate the services into different sets: _consumer_ and _merchant_. They vary slightly in terms of fields, but we made a good progress into fixing that.

> We wanted to both be compatible with EBS APIs, and at the same time make a unified interface for their two rather varying APIs.

That doesn't really work at all in practice: we had to make a tradeoff, either sticking to EBS APIs or building a shim layer on top of it. We opted to become fully compatible with EBS.

### the database

I hated this part the most. We were using gorm v1 and the SQL code we wrote was ribbish. One of the biggest changes we introduced was upgrading to Gorm v2. At least, we now at least migrated to gorm v2. I'm less embarrassed now.

### noebs API

noebs APIs have been stable since the first release in 2019. We have not changed any API since then. I don't think we will change that status. Though we should.

#### API improvements

So far, we don't manage sessions or authentication. We are delegating this task to the consumer of noebs to deploy however authentication system they like. I still feel this is the right way of doing things. There are infinite ways of rolling out an authentication server, and in certain cases, payment companies, hide their authentication server behind a VPN. I don't think we will change anything about that, at least not in the public noebs repo.

### Security

We are yet to perform an auditing in noebs. It is expensive to be honest and we are relying EBS tests we have passed to be our security baseline.

## areas that need improvement

- Fix our gRPC layer, it helps a lot in integrating with noebs
- Complete our SDKs: we have Java, Dart, and JS, but we need to add more languages especially WordPress and PHP and their plugins.
- Unit testing noebs is a non-trivial task and it needs to be done before we can claim we have a noebs V1 product... But that is challenging.


As we are heading towards the 4th year of noebs, I believe we are more closer than ever to have a V1 product.