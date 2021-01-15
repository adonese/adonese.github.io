---
title: API design
layout: post
---

This post serves as a walkthrough for noebs sdks. Noebs is an open source payment gateway with large support and adoption from many corporations in Sudan. Our goal is to _make payments secure and simple_, and we want to do that super fast. To this end, we started rolling out our sdks. SDKs are fancy way of saying libraries, a code that others can import to interact with our services. Noebs sdk is derived from our code, and it is being used in prod for a while now. The code for all of these sdks are available [here](https://github.com/noebs)

When started developing our sdk, we had these constraints:

- we have to comply with payment regulation
- the code needs to be tested
- we want to offer a very simple api, developer can use in a matter of minutes:
    - no try - catch: we believe that developers don't properly handle `try catch` block and they log the error to the stderr instead
    - type safe and that is derived from being `try catch` free

We come up with this simple design:

- One class `Noebs`
- Use of generics (or interfaces)
- Three types of `Responses`:
    - `Successful`: for successful responses only
    - `PaymentError`: for payment specific errors such as insufficient funds, etc
    - `Error`: for generics errors such as fields errors, network timeouts, etc

Every class of these classes has its own: `isError()`, `isPaymentError()` and `isSuccessful()` to get the appropriate messages for each response. We believe designing it this way is simple and straighforward to use. We also believe the explicit way of returning errors as part of the api, instead of relying on the consumer to handle them helps us avoid common pitfalls in programming.

The other part is our http client design. One of the unique goals behind `noebs` is to offer a unified api for ebs services. It took us a bit to oblige with that ourselves too.

Here's how noebs works internally:

- takes a `request`
- `request` has common fields (we literally call them so in our code)[https://github.com/adonese/noebs/blob/16fb401241018eac71aed2ebd244cc65d1c17f81/ebs_fields/fields.go#L153-L158]
- the only differences between say `balance` api and `purchase` api are extra fields for amount and destination, and change in the url (balance <=> purchase), we can use purchase api in balance api, and so on.


We simply have a very big class that contains *every* field in noebs! They are not that much, so don't worry. Our class, `Request`, has all the necessary fields that will be used by evert method in our SDK. marshalling internally excludes empty and null fields, and noebs does the same too. This way, we wouldn't need to have a `per method` class to contain the request data. This is a huge win and reduction in code. In fact the whole [noebs-dart sdk](https://pub.dev/packages/noebs) only consists of 144 LOC for the logic part (and other 232 SLOC for the `Request` class)! And this includes documentations, empty lines, etc!

We have a private method called `_api` that serves as our http client for all `noebs` services.


Writing code this way is easier for us to maintain, and easier for the library consumers too to use and they are comfortably know that everything is exposed to them, and they don't need to trap panics through `try catch` block. We believe that many develoeprs simply ignore `catch` block and they opt to stderr it instead. Errors are first class citizens in noebs sdks and they are as important as successful responses, if not moreso.