---
title: A tale of three channels
layout: post
---
_This post is about systems, APIs, business decisions_.

# Payment
Nearly every transaction involves three parties: a merchant that accepts the card, a bank that issues it, and a payment network that facilitates the transaction between the first two parties [1]. You hear the term PCI a lot.

> The standard was created to increase controls around cardholder data to reduce credit card fraud.
~ [Wikipedia](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard)

We (financial institutions) offer our clients (card holders) these services to ease their access into their accounts. _In most cases, the bank takes the liability for any frauds that happen_. So, PCI standards are used in the whole payment process, in the _card_, _POS_, and the _payment network_ itself, EBS. It is the industry best practices for the security.

## what could possibly go wrong, 1
Again, we have four parties in the payment process
- the card holder (issuer)
- the merchant, POS
- the payment network
- and the bank (acquirer)
We need to secure the transaction in every one of them.

All of the credit cards in Sudan are magnetic strip ones. There are, indeed, EMV ones, but our systems don't support EMV transactions. Magnetic strip cards are very cheap as oppose of their counterpart, EMV ones. And there in lies a problem.

What defines your card is actually just three fields: PAN, PIN, expDate (I intentionally used their EBS request fields one). I can encode your PAN and expDate into a newly printed card and use it as if it were your card! (I will have to guess your PIN, which will be your birth year.)
These are not new problems, it is known for years and people have moved into new security practices, EMV.
The current request looks something like this, in our supposed payment network system.
```shell
{"PAN": "92220617xxxxxx", "PAN": "332acfd13412", "exDate": "2206"}
```
And these are exactly the fields that represent your card.

EMV solves this problem by generating a secure random string that is unique to every transaction. This way, even someone has hacked the system, they will only gets to see this random string that does nothing! _Unlike magnetic strip ones, your data won't be sent over the wire--just a very secure random text will be_.

```shell
{"EMV": "very secure text"}
```
Even if the system was hacked, I cannot use these information to retrieve any of the cards data. But, we _cannot_ just simply upgrade to EMV. It requires a whole infrastructure upgrade. And that's pretty expensive. VERY expensive. And we don't need it, either.

> We know the current system issues, you can either wait for someone to fix them, or know these issues and work with them. ~ Omrabi

I totally agree with this view. I don't think we need to upgrade the system and I don't think that upgrading it will solve any of the current problems.

## towards EMV system
Upgrading our infrastructure is challenging. We need to upgrade the whole infrastructure
- EMV cards
- Certified EMV POS
- and a payment network that accepts EMV transactions

We have EMV POS, in fact, most of our POS in Morsal are EMV ones. But the challenging part is upgrading all of these POS to use EMV info instead of magnetic strip ones. This won't be possible at all and it will hurt the system.
The card part, while being the easiest, is also challenging. Magnetic strip cards are _really_ cheap. You can get one by as low as cents. While EMV ones are very expensive. Given that there is no demand on even the cheap ones, why would you force people into investing one something that is not used?

What about the payment network?

## Why not just ditching the whole merchant thingy?
