---
layout: post
title: What's the difference between an Interface and an API?
description: Interface is the wrapper keyword you're provided with. API is the set of rules you need to follow.
slug: interface-vs-api
tags:
  - javascript
newsletter: jsr
---

I used to think JavaScript doesn't have Interfaces because it doesn't have the `Interface` keyword, unlike Java.

<figure role="figure">
  <img src="/images/2020/interface-vs-api/java-interface.png" alt="">
  <figcaption>Interface keyword in Java</figcaption>
</figure>

But JavaScript DOES have interfaces. I found out about this when I tried Googling for the `location` API, which turned out to the `location` Interface 🤦‍♂️.

<figure role="figure">
  <img src="/images/2020/interface-vs-api/location.png" alt="Location interface.">
</figure>

I was confused. What the hell is the difference between an interface and an API? I [sat down and figured it out](/blog/figure-it-out/) (as usual). I want to share my newfound understanding with you in this article.

Let's begin with interfaces.

<!-- more -->

## What is an interface?

According to a dictionary, **an interface is a point where two things** (people, systems, objects, etc) **meet and interact**.

Confused yet? Let's start with some examples.

**First example:** There's this thing called a Graphical User Interface (GUI), where you use a program that contains buttons and pictures and stuff. In this case, you (person) interact with the computer via the GUI.

**Second example:** There's also this thing called a Command Line Interface (CLI). In this case, you (person) interacts with the computer via lines of code.

**Third example:** Let's say you use Visual Studio Code to code. When you write code, you interact with Visual Studio Code, which is an interface between you and the computer too.

All three are interfaces between people and computers.

Let's kick this up a notch.

When you write JavaScript, you are provided with many keywords you can use.

- One example is `location` where you can interact with the URL in the browser.
- Another example is `fetch`, where you can interact with other websites or servers via a request.

**Both `location` and `fetch` are interfaces** – they provide you with a thing (a set of code) you can use to talk to something else (the browser).

Want proof? MDN Says the Fetch API provides you with an interface too 😉.

<figure role="figure">
  <img src="/images/2020/interface-vs-api/fetch.png" alt="MDN documentations says Fetch API provides an interface.">
</figure>

## What is an API then?

API is short for Application Programming Interface. (Again, the interface keyword. We'll sort it out). We can further divide APIs into two types:

- Web APIs
- Rest APIs

[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) let you interact with browsers – You write code on your computer and the correct thing will happen magically on a user's browser.

Rest APIs let browsers (and servers) interact with other browsers and servers – Browser A sends a request, and Server B responds. Browser A magically knows how to interpret this response.

For all this magic to happen, you need to follow a specific set of instructions laid out in API documentation.

Examples of such documentation include [Github's Rest API](https://developer.github.com/v3/), [Youtube's Rest API](https://developers.google.com/youtube/v3), and all the [Web APIs you can find on MDN](https://developer.mozilla.org/en-US/docs/Web/API). (Of course, there's also GraphQL nowadays. You can assume they're like Rest APIs, just written in a different format)

At this point, **it seems like an API is an interface with a specific set of instructions tied to it.** But let's dive deeper to unravel the mystery. We'll look at Web APIs and Rest APIs separately.

### The relationship between Web APIs and Interfaces

**Interfaces are the wrapper object that you're provided with**. `location`, `fetch`, `history`, `document` are all examples of Interfaces – they're exposed for you to use.

At the same time, **they are also Application Programming Interfaces because they can only be used in specific ways**. If you don't follow these specific methods laid out for you, the code will fail.

For example, try running `document.helloworld` and see what happens 😉. I'm pretty sure that'll result in an error unless you extended the API yourself.

By extension, all libraries provide you with at least one interface.

Examples:

- If you use jQuery, `$` is the interface.
- If you use React, `React` is the interface.

### The relationship between Rest APIs and Interfaces

Rest APIs are slightly different. They don't provide you with a direct interface. For example, there's no "Github" keyword for you to use the Github Rest API.

**You need to use Rest APIs through another interface** like `fetch` or `axios`. In this sense, **Rest APIs are more like a set of rules and formats you need to follow**.

### Summing up APIs

Once we combine these two types of APIs, we can have a better sense of what **an API** actually is – it **is the rules and formats you need to follow in order to use an interface.**

## Interfacing with Interfaces

What we're seeing here is only one end of the story – we're only seeing it from our perspective.

The truth is, when developers program a Web API, they also need to follow certain guidelines before they can get the browser to do things. When developers program a Rest API, they also need to follow guidelines to do things (like sending the data into a database, for example).

So it's interfaces all the way down. It's a rabbit hole. 🕳️🐇

## Conclusion

**Just two points to sum up:**

- Interfaces are the wrapper object you're provided with.
- Application Programming Interfaces are a set of rules you need to follow to use the thing you want to use.

That's it! I hope this clears things up for you.
