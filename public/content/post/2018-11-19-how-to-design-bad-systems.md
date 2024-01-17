---
date: "2018-11-19T00:00:00Z"
excerpt: EBS is a huge mess. they made terrible decisions, but they're not the only
  ones to be blamed for everything. Fixing this mess is important, but it is very
  challenging. In this post, i've tried to distill why?
title: A tale of three channels
---


_This post is about systems, APIs, business decisions_.

# Payment
Nearly every transaction involves three parties: a merchant that accepts the card, a bank that issues it, and a payment network that facilitates the transaction between the first two parties. You hear the term PCI a lot.

> The standard was created to increase controls around cardholder data to reduce credit card fraud.
~ [Wikipedia](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard)

We (financial institutions) offer our clients (card holders) these services to ease their access into their accounts. _In most cases, the bank takes the liability for any frauds that happen_. So, PCI standards are used in the whole payment process, in the _card_, _POS_, and the _payment network_ itself, EBS. It is the industry best practices for the security.

## What could possibly go wrong, 1
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

## Towards EMV system
Upgrading our infrastructure is challenging. We need to upgrade the whole infrastructure
- EMV cards
- Certified EMV POS
- and a payment network that accepts EMV transactions

We have EMV POS, in fact, most of our POS in Morsal are EMV ones. But the challenging part is upgrading all of these POS to use EMV info instead of magnetic strip ones. This won't be possible at all and it will hurt the system.
The card part, while being the easiest, is also challenging. Magnetic strip cards are _really_ cheap. You can get one by as low as cents. While EMV ones are very expensive. Given that there is no demand on even the cheap ones, why would you force people into investing one something that is not used?

What about the payment network?

## Why not just ditching the whole merchant thingy?
EBS has introduced new APIs called Consumer. They are used as a way to enable transactions over internet.
From PCI PIN securtiy requirements #1
> All cardholders-entered PINs must be processed in equipment that conforms to the requirements for secure cryptographic devices (SCDs). PINs must never appear in the clear outside of an SCD.

Translation: you cannot just enter your PIN over a merchants keyboard. The keyboard you're keyying your PIN in must hash your PIN to avoid keylogging. This is why you don't see merchants with PCs. But people love to use their credit card over the internet right?

EBS has introduced new set of APIs called consumer APIs. As their names imply, they are used by consumers, and they are mainly used to allow ecommerce. To solve the problem of `PIN should be entered over SCD` they use something called IPIN, or internet PIN. But that affects the whole system, in a very disastoruos way.

## PCI standards
PCI standards are established to secure the transactions and to decrease the fraud cases. A payment system should be PCI complaint at every endpoint of it. It is the only possible way to integrate with other payment systems.

Using Consumer and IPIN allowed us to make PCI compliant transactions over internet, but that comes with a huge cost. Every other bank with private switch (e.g., Khartoum Bank) cannot use this functionality. They don't have an IPIN. Let's revise the payment process again. You have an internet store where you sell books, you allow your customers to pay for the book's price online. And you're connected to EBS. EBS uses iPIN instead of PIN, right? Very soon you will notice that your Bank of Khartoum clients cannot use your service.
			accepts iPIN
			|
issuer => payment_network => acquirer
			|
			accepts PIN
			!= wrong pin entered
			BoK

There's no such a thing as iPIN in BoK switch. While you can happily use your BoK card in every possible merchant (POS), you cannot do the same over internet. The just don't match. So, for our system to be a PCI compliant, _we introduced new APIs that doesn't work with the country's major Bank_. Good job guys, you nailed it there.

>Requirement 2a:
     Cardholder PINs shall be processed in accordance with approved standards.
a.    All cardholder PINs processed online must be encrypted and decrypted using an approved cryptographic technique that provides a level of security compliant with international and industry standards. Any cryptographic technique implemented meets or exceeds the cryptographic strength of TDEA using double-length keys.
b.    All cardholder PINs processed offline using IC card technology must be protected in accordance with the requirements in Book 2 of the EMV IC Card Specifications for Payment Systems and ISO 9654.

## EBS v2.0
- Make it PCI complaint
- Ditch the consumer to interoperate with other switches
- Ditch the merchant layer, to be a PCI complaint

>You cannot fix the unfixable, mate. ~ Captain Jack Sparrow

The current system cannot be PCI complaint. It requires rewriting and renewing the whole infrastructure, EBS itself, every POS, all of the cards. This is not possible.
_Merchant layer abuses PCI at every possible way, yet it is the only working one_. You cannot ditch it either. And none of these issues actually have affected the system adoption. Let's first make the transformation, and later think of improving or replacing what we have.

# [noebs](noebs.acts-sd.com)
When I launched this project one of my goals is to fix exactly these kinda of issues. The name might not be the greatest, but if anything, _If anything, we are embracing the use of EBS_. One of the first design decisions I took was to use EBS merchant services and totally ignore consumer ones. And that turns out to be very good decision. Here's our solution to the aroused problems.
- there will be one and only one service: merchant. It will allow interoperability between all switches.
- to secure the PIN over internet issue, we will be using an OTP that will be sent over the cardholder mobile number.
Our philosophy is to do what others do. And they are all using OTP to validate the transaction was initiated from the original card holder, not of a security breach. Of course that is not the most secure system either, but you always have to take the risk. If you compare it, you will find that it is more risky to use magnetic strip cards than to enter your PIN over internet. They are really the same. There is no single POS that employs SCD practices anyway.

_We designed a new API layer, with a new security check called IPIN to comply with PCI PIN requirements. It affects the whole system. Our system is not PCI complaint, at almost every piece of it. STOP PCI BULLYING and be dynamic for the good of the community_.
This problem cannot be solved unless the whole parties come together and discuss them. We encourage openess, interoperability and building systems that comply with the industry standards. We also beleive that, for the good of the system, we can skip these standards and encourage the system adoption with its whole problems.
