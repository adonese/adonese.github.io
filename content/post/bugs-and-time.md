---
title: "Bugs and Time"
date: 2026-05-08T21:13:05+04:00
draft: false
---

Some bugs haunt you somewhere in the future. Majority of them comes from technical debts. I.e. something you or your clanker must have overlooked or underestimated it at the moment, and we know how that ends. It can come as a late night production incident, or via product request in what you hoped to be a quiet sprint planning. I want to mention the bugs that dies with time though and I have particular story to tell. We have this system where it has a sliding window. In essence, some data will just be invalid after n period of time. The bug was in the data but it was not too devstating as the system would work but not in the "business preferred branch". The engineering effort to fix this would be manageable to fix this issue. But what if we did not do anything? Well, it turns out one can just sleep on this bug and let it turn itself into a feature n months later.

