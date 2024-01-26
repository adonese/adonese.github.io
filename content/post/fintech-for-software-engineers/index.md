---
title: "Payment for developers![Alt text](image.png)"
date: 2024-01-12T12:57:44+04:00
draft: false
---



## Use Public Key Cryptography

> Remember, security is a complex field that often involves balancing the needs of the system, including performance and usability


Before we jump directly into what PKC is, why and how to use it. Let's explain all of the approaches first and from there we can conclude why our recommendation is to deploy [Ledger](https://github.com/adonese/ledger) recommends the usage of public key cryptography.

## How POS encryption and transactions work

POS usually use these combination of methods for securely communicating with the bank or the payment processor. They may vary between different institutions, but the idea is the same:
- POS connects via a private network, VPN, to the Bank or the payment processor
- POS uses a symmetric key to encrypt the PIN, usually DES or 3DES, we call that _card present_ transactions, in that the card itself should phyiscally be present to fullfill the transaction (swipe, chip, etc)
- The communication is usually done via ISO 8583, which is a standard for financial transactions. Sometimes, it is just JSON over HTTPS. ISO8583 is merely just a protcol for laying out the data in a specific way that is easy to parse and understand, a protocol. It does not do any encryption or security by itself.
- The bank or the payment processor decrypts the PIN and processes the transaction, to access the raw PIN and further perform the transactions

We are starting with the POS because it is the most used platform (historically) for performing transactions, and it is legacy enough to steer us and help us set up the stage for whatever we aim to propose. Banks, fintech companies, and regulators have spent huge capital on POS, and it is not going away anytime soon. So, we need to understand how it works so we can be thoughtful about ways to improve it.


![ISO8583](./iso8583.png)



This is pretty much how every POS network operates, and by all means it is a work of art. Elegant and beautifully done peace of system. It doesn't compromise security for convenience. It is _usable_ and to this day very much in used whenever you swipe your card. Pretty much like HTTP/1.1. Elegant design. But let's unroll it even further since we are in the business of security, and let's see what attack vectors we have:
- Level-0 is the VPN network, without that the whole security are bound to collapse ![Wireguard and l2tp/ipsec](./crypto.png)
- Level-1 is the symmetric key, which is usually DES or 3DES. ![DES](./ped.png). There are strict requirements when it comes to PED (PIN Entry Device) and the encryptions too imposed by the regulator. Now, the exact way to DES/3DES encrypt a PIN is irrelevant to this article, however we encourage the curious readers to look into our open source repo that shows an implementation in python, [Check TA, funnily named after one of the authors' ex](https://github.com/adonese/ta).

It is also super important to visualize the actual process, because payment infrastructure might be so overwhelming that often developers find them obscure to understand. What really happens is the following:
- A terminal POS will send the request, with the sufficient information, including the pan, encrypted pin, expdate, terminal id (super important), transaction amount, system trace audit number 
- The payment processor will then lookup the database to retrieve the terminal key via the terminal ID -- sometimes the process might be a little bit more involving than that, but the idea is the same: you would still need to lookup the terminal key via a same old database query. We are still doing a regular CRUD here, nothing fancy.

Before we move further, it is important to see the whole picture here and reflect again on the system:
- Each participant is a node in the network, with a responsibility to fullfill.
- PED (like POS) are very crucial in that they are the biggest attack surface to the whole ecosystem, they initiative the transaction, and the encryption happens within them
- The card holder is equally responsible of the safety of their own cards
- Merchants are also well legilible to ensure they are in compliance with procedures for card acceptance. A good scenario to emphasize how this ecosystem plays together is the classical example of "my card was stolen", and _chargebacks_. When a cardholder flags a transaction as not authorized, their bank (issuer bank) would hard (they have the incentive) to refund the card-holder. Now, depending on the circumantances, the merchant is weakest link in the chain -- and while a $1000 won't yield the bank bankrupt, it can inflict a considerable damage to the merchant.
![Chargebacks](./ecosystem.png)

## Point to Point Encryption and E2EE 

An enticing but not largely deployed technology is Point to Point Encryption. P2PE is a fancy way of saying that financial information is encrypted at each point, starting from the POS (Point of Interaction, POI) all the way to the payment processor, where the data will be decrypted with the aim of Hardware Secure Module (HSM). In one of our previous works, we were trying to deploy a card reader solution and as per the shared specifications, our solution felt to be compliant. We were doing a software encryption and from there, from the POS all the way to the payment processor the payload was encrypted. Eventually, the payment processor delegated the whole case to the regulator and the regulator deemed our approach to be non-compliant. Payment has nuances. We as developers are adept to https, especially younger generations of developers. I remember when I first started learning coding everything was http only, before recently https became the norm.

**Why not just https? Wouldn't that helps everything payment?**

That is it actually. We could use https for everything and it's as secure as it could be. And while https offers the utmost level of security to ensure that the financial message, the payload, is encrypted and secured at transmit, it doesn't really help at all to ensure that the transaction was in fact made from the authorized party. The same way that, when you click on https://facebook.com/adonese10 you wouldn't actually be authorized to access my account just because you are using https. That's why you use username and password to access it. And with the advancement of technology even the mere password username combination is not enough. We discovered the need of a second factor authenticator.

```
Security is the game of cat and mouse
```

So, the typical password:username combination didn't work and we had to discover 2FA or two factor authentications. Dictionary-based and similar brute-force attack made it just with sufficient coding skills, it was not at all difficult to hack into an online account. That was the time where the world was heading to Internet Banking: a new concept that promised to radically change the way we bank by banking using our computers. But before we dive deeper into that world, let's stumble upon the wonder world of 2FA and MFA.



### Two Factor Authentication and Multi-Factor Authentication

With the advancements of technology, and the era of internet has kicked it, it was imminent to find alternative ways to authenticate transactions, a la _card not present_ transactions. 
![Security](./security.png)

Now, remember we used to have:
- the VPN network
- the physical card itself 
- DES and symmetric encryption 
- the POS 

Losing the card-present requirement renders our whole system useless in terms of security. 

### Anatomy of payment cards 

Remember this is actually how your cards look like: ![Card](./card.png), it is only just 16 digits -- it is not necessarily something you can guess; but also not very hard to "accidentally take a picture of it off of your friend". 


A Visa card number typically has 16 digits, and they are structured as follows:

- Major Industry Identifier (MII): The first digit of the card number, for visa it is 4 -- that's why for spotty readers you can see some forms would turn into Visa icon even before you finish entering your card number

- Issuer Identifier: The next five digits, along with the MII, make up the Issuer Identifier Number (IIN), also known as the Bank Identification Number (BIN). The length of pan varies between 16-19, and in fact VISA increased BIN from 6 to 8 to accomodate the growth of its partner banks. 

- Account Number: The remaining of the digits, except the last digit, are the individual account identification number. The length of this account number varies by institution. It is often used in conjunction with the IIN/BIN to identify the issuer of the card.

- Check Digit: The final digit is the check digit, known as Luhn number, is used as a first line quick check. It is like client-side form validation, if that makes sense. 

So, if you have a Visa card number like this: 4123 4567 8901 2349, it would break down like this:


- 4 is the MII, indicating a banking and financial institution. 
- 412345 is the IIN/BIN, indicating the specific institution that issued the card. 
- 678901234 is the account number. 
- 9 is the check digit.  


```mathjax
4  1  2 3  4 5  6 7  8 9  0  1 2  3  4
x2   x2   x2   x2   x2   x2   x2    x2
8 1   4 3  8 5 12 7 16 9 0  1  4 3   8

Now, if they are greater than 9, reduce 9
8 1 4 3 8 5 12 7 16 9 0 1 4 3 8
            -9   -9    
8 1 4 3 8 5  3 7  7 9 0 1 4 3 8

8 + 1 + 4 + 3 + 8 + 5 + 1 + 2 + 7 + 1 + 6 + 9 + 0 + 1 + 4 + 3 + 8 = 71
Now, we take the modulo of the sum
71 % 10 = 1
Now, we subtract the modulo from 10
10 - 1 = 9
9 is the check digit
```

None of that really matters that big and can be frankly ignored. But, I'd like to once again explain the elegancy of these systems. Work of art. Point to take home: if you are developer, you might as well get some inspirations from this. If you are a user then you be warned about your cards security.

## Sometimes

Working