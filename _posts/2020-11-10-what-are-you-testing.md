---
title: "What are you testing"
layout: post
excerpt: "This post discusses security, PCI DSS, and EBS and random ranting as always. It is often easier said than done, but whenever you do anything it makes sense to know first what you are doing and why are you doing it. We always get lost in the details and forget about the bigger picture."
---



## Testing in EBS

Ultimately security tests in EBS are meant to assess PCI compliance of an organization, to this end, PCI DSS requirements are:

- Install a firewall
- Change all default passwords on network-connected devices
- Protect stored cardholder data via encryption, hashing, or other data protection methods
- Encrypt cardholder data in transit
- Install malware protection
- Patch vulnerabilities in all systems and applications
- Restrict access to cardholder data to authorized personnel
- Control and restrict system access
- Control and restrict physical access to cardholder data
- Monitor access to data
- Test security systems regularly
- Maintain an information security policy

Let us go through them one by one, they are not that hard eh?

- Install a firewall
That is literally done by the cloud / data center provider. You can also employ local firewall policies in your server (using ufw or iptables), but they are usually not that effective. This is a datacenter compliance problem! If your datacenter provider doesn't have a firewall, then they violated PCI DSS #1 rule and you should change your datacenter. That simple!

- Change all default password on network connected devices

Devil lies in the details. While this seemingly easy task to do, EBS security dedicates a huge pile of todos and what not regarding this simple one.

What does this simply means is to change your default password for your server (that was assigned by the cloud provider). It goes further to basically change any vendor assigned password since these can be known to hackers.

- Protect stored card holder data

Hmm. Interesting. What if you don't even store them?

On the sending end, we do use TLS to encrypt our transactions between our servers (btw did you know ACTUALLY EBS USES SELF SIGNED CERT AND CLIENTS, LIKE US, HAVE TO SKIP TLS VERIFICATION WHEN CONNECTING TO EBS. Now you know.)

Storing card holder data is tricky. We partially do it, albiet recommend against it very clearly in the app. 

- Encrypt card holder data in transit

_Yeah, see above_

- Install malware protection

WTF.
WE use Linux. Maybe it makes sense if this rule were rewrote to something like this:

+ Ensure that your backend services are run with a non-root user (e.g, if you are using docker it is more secure to run docker in a non root mode, by creating a new user and user group for docker. This way you gonna isolate your program and backend service from the rest of the system)

- Patch vulnerabilities

This is really important and totally overlooked. In a retrospect, it goes against EBS certifcation process.

Let us discuss what vulnerabilities are:

- we have vulnerabilities in our OS
- we have vulnerabilities in our installed packages in our OS
- we have vulnerabilities in our programming langauge
- we have vulnerabilities in our libraries and frameworks we use in our programming language

_This rule simply means, you have to regulary update your OS, update your OS packages, update your programming language version, and update your programming langauge libraries and frameworks (the one you use to write your hopefully PCI compliant system). But that also goes further to the client of this backend system, now here the shit gets real. 

Working with clients or in this case POS devices and mobile apps is tricky. It gets extra tricky when working with POS devices, and devil's level of tricky-ness when working with Linux-based POS devices.

Majority of POS devices are using SSL. The good ones use TLS v1.1 which is permittable albeit not recommended. The recommended version is TLS v1.2 (which in itsefl is deprecated[1]). This is a huge problem since TLS or SSL v3 have really severe security impacts. The other annoying thing is that they actually affect the whole backend system security level as we have to support these devices!

The situation is like this (in our server):

- TLS v1.1, TLS v1.2, TLS v1.3 (WTF!)

EBS:
- TLS v1.2
- TLS v1.1
- TLS v1.0

(FUCK)

It makes sense though, since EBS must have to support wide range of obsolete and insecure POS devices. Let's just not ever again discuss EBS wound. It hurts.


- Restrict access to cardholder data to authorized personnel

You don't need to restrict access to card holder data if you are not storing any of them. But in all cases, it makes sense to write this and consider it in the company's process document.

- Control and restrict system access

You bet.

- Control and restrict physical access to cardholder data

Sure.

- Monitor access to data

This is hard and it requires thinking (which way more harder actually, thinking sometimes lead to sinking). But practically speaking, a combination of rsyslog and sshd and /var/log/auth.log can help with that. Essentially what you want to achieve is that whenever someone attempts to access your server, you get notified via email. That's monitoring. You can go all fancy and make a dashboard for that too.

- Test security systems regularly

And this is where systems in Sudan fall short. No testing whatsoever have been done after the certification is issued and that is quite catastrophic. Can you imaging swiping your card in a system that has not been maintained for over couple of years (and even more!)

- Maintain an information security policy

This falls in good suggestions yet no one cares! But it is important it is extremely important to maintain security policy and adhere to it. It should be part of the company process and manual. (An echo from the abyss that sounds: who listens WHO LISTENS!).



[1]: https://www.tbs-certificates.co.uk/FAQ/en/tls-12-obligatoire.html