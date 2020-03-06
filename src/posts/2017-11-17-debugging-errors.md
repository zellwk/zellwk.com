---
title: How to debug Javascript errors
layout: post
slug: debug-javascript-errors
newsletter: jsr
tags:
 - javascript
 - video
youtubeHash: B6EZIEqO15w
shareText: "It's normal for you to make errors when you code. I get error messages all the time. When I have bad days, I get more error messages! Here's how to fix errors:"
---

It's normal for you to make errors when you code. So if you see an error, you don't have to be afraid. I get error messages all the time. When I have bad days, I get more error messages!

<!--more-->

Error messages are something bad. We're actually lucky to have error messages show up infront of us when code.

Think about designers and other professions, when they create something, its hard for them to know what's wrong with their work.

In our case, we get instant feedback through error messages. These error messages are like angels that gently tell us that something is wrong. You can correct the code and your program would work.

Let's go through an example.

In this code, we're trying to add an event listener to a button, and when the button is clicked, the button should turn orange.

If you hit the refresh button, you'll see an error message. The first thing you do is to breathe and relax.

Then, you read the error message. You also look at where the message occurs.

The error message says you can't read a property `addEventListener` of null. If you're unsure whether `btn` is null, you can do a `console.log`.

Here, you'll understand you missed a `.` when declaring the `btn` variable. What you'll need to do is fix this `querySelector` declaration and your code works.

I hope this video has been helpful for you.

If you like this video, you might want to consider subscribing to this youtube channel, and I'll send you a helpful tip about frontend development every friday.

You may also want to consider subscribing over at my blog at zellwk.com, and you'll get one article plus one video from me every week to help you become a better frontend developer.

Now good luck, and have a nice day!

