---
title: How to make interactive components
layout: post
slug: interactive-components
newsletter: jsr
shareText: "How to you make interactive components? Here's the answer:"
tags:
 - javascript
 - video
youtubeHash: dTyVuBk5eIg

---

How do you make a website interactive? That's one question that many beginners get stuck at. In this video, I walk you through you need to know to build an interactive website.

<!--more-->

The first thing you want to ask yourself is this—what makes a website interactive? Does it become interactive if you can click on things, or does it become interactive if things start moving around?

For most people, the answer is both.

But technically, a website becomes interactive when it responds to a user in some way.

If you can click on a something and something happens, or you can type on a keyboard and something happens, or can say something, and something happens, your site is interactive.



## How do you know when something happens?

Imagine you're thirsty right now. You get up from your computer and grab a cup of water.

In this case, there is a cue. Because you're thirsty, you go grab water.

In Javascript, these cues, are called events. So, a click is an event, a keyboard tab is an event, a scroll is an event, and so on.

Javascript allows you to listen to many kinds of events, including but not limited to:

1. mouse events
2. touch events
3. keyboard events
4. form events
5. scroll events

You can find a complete list of events on [MDN's event reference](https://developer.mozilla.org/en-US/docs/Web/Events), you'll find a link below the video.

To act on the events, your program needs to be able to detect the event itself. To do so, you use an event listener.

To add an event listener, you first have to select an element, with querySelector. In this example here we have a button and we're selecting the button with document.querySelector.

To add an event listener, you use the `addEventListener` method that's present on all HTML elements.

The first parameter you pass into `addEventListener` is the event you're listening to. In this video, I'm going only to show you how to use the 'click' event, which is very basic mouse event. If you're interested to learn to use the rest, I recommend you check out [Learn Javascript](https://learnjavascript.today)

In Learn Javascript, I walk you through how to build 20 different real-world components, steps by step, and you'll learn to use different kinds of events at the same time to make things you build super interactive.

So back to event the event listener. In this case, we pass in click as the first parameter.

The second parameter is a function to execute when the event occurs.

Callbacks allow you to configure different actions to perform when an event occurs; you can do anything you want in the callback function, including changing the back ground color with `style` property or adding a class with classList.

To create some sort of animation, you can use CSS Transitions, that's the easiest way. If you're watching from the future, you'll see a link in the description below. If you're watching it now, wait till next Wednesday and I'll send you an article.

That's a super basic intro of events and how to create interactive components. With this info, you can get a lot done, including creating a sidebar that stays outside of the screen.

I teach you how to create components like this one, plus many other advanced ones in [Learn Javascript](https://learnjavascript.today); you can check it out if you're interested.

One more thing before we end.

## The listening element

We used the button variable directly in the function for now. This is okay when you're starting out, but not okay when you create more complex code.

If you refactor, and shift the callback out of the element, it becomes hard for you to understand what `button` refers to. Let's call this callback `handleClick`.

If you change the `button` variable to something else down below, the `handleClick` function breaks.

One way to get the button, which I call the listening element, is to use the `this` keyword.

Another way of getting the listening element is through event object.

The event object is an argument that's present on all event listeners. You can get the listening element through `event.currentTarget`.

Personally, I prefer use event.currentTarget because I prefer to use ES6 arrow functions whenever I can. ES6 arrow functions lets you write succinct code, but it doesn't give you the same `this` value as normal functions. You can find out more about `this` in [this article](https://zellwk.com/blog/this/).

One funny thing is: if you `console.log(event)`, you'll see that currentTarget is actually `null`, I'm not sure why this happens though, because `event.currentTarget` refers to the listening element itself.

If you know why, or if you're interested in finding the answer, do it and let me know in the comments below.

That's it for today, I hope you have learned something useful.

If you liked this video, be sure to hit the subscribe button below, and you'll get a video from me every Friday.

What's even better is go to my website at zellwk.com and subscribe there. If you do that, I'll share one article and one video every week to help you get better with frontend development.

With that, I'm off for the week. Have a great weekend.
