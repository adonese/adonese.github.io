---
date: "2021-01-09T00:00:00Z"
title: what is an api
---

So essentially your mobile is somewhere, with an ip address right? And we are pretty much familiar with ip addresses, domain names and stuff, we type in google.com and we are welcomed with google search, and so on. This process is technically called http request. Http cause is the protocol that was used to make the request happens, protocol is really just a fancy way of saying "hey dude, umm can you tell me how are you going to send me your bytes"--everythying is a byte. 

So when we send a request, we send it to a server right? The server is really just a computer. Inside that server, one of the awesome guys like Hashim and co. will probably have a web server. The web server is really just a program that's running in your server. There's a technical name for that and they usually call it _binding_, simple the your web server will be binded to a specific port. There's really a long story for ports and it's quite fascinating, I highly recommend you to read this awesome article about it[1].

So, now, we are in the server right? Your web server, be it in python or whatever language is listening to the incoming requests. Let's say you sent a request to `/login` right. We usually json json when we send requests, there are other forms (remember when we used to submit website forms?, Yeah that was one of it). Json is human readable and machine friendly as well, y'all can easily read this `{"username": "test", "password": "123456"}`. That's json. The server now needs to receive the stream of bytes (the request we sent) and parse it. There are so many great stuff happens here, but let's just say that our nice simple python server finally received the bytes, and somehow it was able to read it as json.

Server does their stuff eg., validation, database calls, etc and responds back with their response, for example it could be a token you use further, or it could be any other thing. 

The whole thing (request <-> response) happens as a network call between the client (mobile, flutter code, etc) and the server (eg. python web server), through a network layer, via a protocol (http). 

We call this whole thing api. But to further simplify the process, imagine you are only working on your layer, on your just mobile device, and you want to call a function like "login". Let's say that _login_ just verifies you sent `{"username": "mohamed", "password": "123456"}` -- if you sent this request, it is going to do Navigator.pushNamed("/settings"), or letting you enter to a widget in your flutter code. That does seem pretty simple, eh? Now imagine the same analogy, but with a very slight difference: the function is not located in our app, and it's only accessible via network call). We can access this function via (https://my.awesome.url/login). We are getting there, right? The same function is accessed via network as oppose of via dart code. The rest is really just semantics.

I hope that helps.

[1]: https://blog.cloudflare.com/the-history-of-the-url/