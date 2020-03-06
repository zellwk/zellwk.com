---
title: Console.log everything!
layout: post
slug: console-log-everything
newsletter: jsr
tags:
 - javascript
 - video
youtubeHash: rBHzRjJSQbI
---

When you write Javascript, you're bound to be unsure of something in your code somewhere. That's a normal thing.

When you're unsure, you need to clarify what that unknown thing is. Otherwise, you won't be able to code anything up.

And how do you clarify?

You write `console.log` statements.

<!--more-->

Console.log is your friend. Use it as often as you can and you'll learn much more about Javascript than reading any article or watching any videos out there.

It lets you learn by trial and error, and when you make a mistake and figure something out afterwards, you'll remember it for life. That's why console.log is extremely powerful.

Let me give you an example when console.log is extremely helpful, especially for beginners.

Here's your task. I want you to get the firstName of everyone in the people array in a `for` loop.

If you're a beginner, you mind would go blank with this question immediately, even if you learned what a for loop is.

Why? Because many people don't understand what happens inside a for loop!

For this example, I'm going to use a `for of` loop instead of the traditional `for` loop because its easier to understand and its easier to write than the traditional loop.

So here's how the `for of` loop looks like

```js
const people = [
  {name: 'Zell'},
  {name: 'Vincy'},
  {name: 'Huijing'},
  {name: 'Chris'}
]

for (let item of people) {
  // Do stuff here
}

```

So, here's the question. What is item?

If you're unsure, you'll never be able to get the answer. Right. So you need to clarify.

And what do you do?

You console.log whatever you're unsure of.

```js
for (let item of people) {
  console.log(item.name)
}

```

And if you take a look it the console, you'll immediately see what item is.

In the first run of the loop, you get the object in the array. In the second run of the loop, you get the second object and so on.

See how that makes a difference immediately?

Now, if you know about objects, you can get the firstName of each person in the loop by using item.firstName.

That is why you need to clarify things with console.log!

Now, `item` isn't the best variable to use here. If I were to write real code, I'll use a better variable, like `person` or something.

But what I'm doing in this video is to deliberately mislead you with a weird variable name and a for loop that you probably never seen before so you get confused.

And the good thing is, if you do get confused, you can see how console.log helps you solve that confusion altogether.

And with this, my friend, you have learned the ultimate skill to learning how to code.

If you like this video, you'll love [Learn JavaScript](https://learnJavaScript.today), a course to help you learn Javascript properly and build things from scratch.

With that. Good luck and I'll see you next week.

