---
layout: post
title: Dealing with nested callbacks
description: 4 solutions to callback hell
slug: nested-callbacks
tags:
  - javascript
---

JavaScript is a strange language. Once in a while, you have to deal with a callback that's in another callback that's in yet another callback.

People affectionately call this pattern the *callback hell*.

It kinda looks like this:

```js
firstFunction(args, function() {
  secondFunction(args, function() {
    thirdFunction(args, function() {
      // And so on...
    })
  })
})
```

This is JavaScript for you. It's mind-boggling to see nested callbacks, but I don't think it's a "hell". The "hell" can be manageable if you know what to do with it.

<!-- more -->

## On callbacks

I assume you know what callbacks are if you're reading this article. If you don't, please read [this article][1] for an introduction to callbacks before continuing. There, we talk about what callbacks are and why you use them in JavaScript.

## Solutions to callback hell

There are four solutions to callback hell:

1. Write comments
2. Split functions into smaller functions
3. Using Promises
4. Using Async/await

Before we dive into the solutions, let's construct a callback hell together. Why? Because it's too abstract to see `firstFunction`, `secondFunction`, and `thirdFunction`. We want to make it concrete.

## Constructing a callback hell

Let's imagine we're trying to make a burger. To make a burger, we need to go through the following steps:

1. Get ingredients (we're gonna assume it's a beef burger)
2. Cook the beef
3. Get burger buns
4. Put the cooked beef between the buns
5. Serve the burger

If these steps are synchronous, you'll be looking at a function that resembles this:

```js
const makeBurger = () => {
  const beef = getBeef()
  const patty = cookBeef(beef)
  const buns = getBuns()
  const burger = putBeefBetweenBuns(buns, patty)
  return burger
}

const burger = makeBurger()
serve(burger)
```

However, in our scenario, let's say we can't make the burger ourselves. We have to instruct a helper on the steps to make the burger. After we instruct the helper, we have to *WAIT* for the helper to finish before we begin the next step.

If we want to wait for something in JavaScript, we need to use a callback. To make the burger, we have to get the beef first. We can only cook the beef after we get the beef.

```js
const makeBurger = () => {
  getBeef(function (beef) {
    // We can only cook beef after we get it.
  })
}
```

To cook the beef, we need to pass `beef` into the `cookBeef` function. Otherwise, there's nothing to cook! Then, we have to wait for the beef to get cooked.

Once the beef gets cooked, we get buns.

```js
const makeBurger = () => {
  getBeef(function (beef) {
    cookBeef(beef, function (cookedBeef) {
      getBuns(function (buns) {
        // Put patty in bun
      })
    })
  })
}
```

After we get the buns, we need to put the patty between the buns. This is where a burger gets formed.

```js
const makeBurger = () => {
  getBeef(function (beef) {
    cookBeef(beef, function (cookedBeef) {
      getBuns(function (buns) {
        putBeefBetweenBuns(buns, cookedBeef, function(burger) {
          // Serve the burger
        })
      })
    })
  })
}
```

Finally, we can serve the burger! But we can't return `burger` from `makeBurger` because it's asynchronous. We need to accept a callback to serve the burger.

```js
const makeBurger = nextStep => {
  getBeef(function (beef) {
    cookBeef(beef, function (cookedBeef) {
      getBuns(function (buns) {
        putBeefBetweenBuns(buns, cookedBeef, function(burger) {
          nextStep(burger)
        })
      })
    })
  })
}

// Make and serve the burger
makeBurger(function (burger) {
  serve(burger)
})
```

(I had fun making this callback hell example 😆).

## First solution to callback hell: Write comments

The `makeBurger` callback hell is simple to understand. We can read it. It just... doesn't look nice.

If you're reading `makeBurger` for the first time, you may think "Why the hell do we need so many callbacks to make a burger? It doesn't make sense!".

In such a case, you'd want to leave comments to explain your code.

```js
// Makes a burger
// makeBurger contains four steps:
//   1. Get beef
//   2. Cook the beef
//   3. Get buns for the burger
//   4. Put the cooked beef between the buns
//   5. Serve the burger (from the callback)
// We use callbacks here because each step is asynchronous.
//   We have to wait for the helper to complete the one step
//   before we can start the next step
const makeBurger = nextStep => {
  getBeef(function (beef) {
    cookBeef(beef, function (cookedBeef) {
      getBuns(function (buns) {
        putBeefBetweenBuns(buns, cookedBeef, function(burger) {
          nextStep(burger)
        })
      })
    })
  })
}
```

Now, instead of thinking "wtf?!" when you see the callback hell, you get an understanding of why it has to be written this way.

## Second solution to callback hell: Split the callbacks into different functions

Our callback hell example is already an example of this. Let me show you the step-by-step imperative code and you'll see why.

For `getBeef`, our first callback, we have to go to the fridge to get the beef. There are two fridges in the kitchen. We need to go to the right fridge.

```js
const getBeef = (nextStep) => {
  const fridge = leftFridge
  const beef = getBeefFromFridge(fridge)
  nextStep(beef)
}
```

To cook beef, we need to put the beef into an oven; turn the oven to 200 degrees, and wait for twenty minutes.

```js
const cookBeef = (beef, nextStep) => {
  const workInProgress = putBeefInOven(beef)
  setTimeout (function () {
    nextStep(workInProgress)
 }, 1000 * 60 * 20)
}
```

Now imagine if you have to write each of these steps in `makeBurger`... you'll probably faint from the sheer amount of code!

For a concrete example on splitting callbacks into smaller functions, you can read [this small section][2] in my callback article.

## Third solution to callback hell: Use promises

I'm going to assume you know what promises are. If you don't, please [read this article][3].

Promises can make callback hell much easier to manage. Instead of the nested code you see above, you'll have this:

```js
const makeBurger = () => {
  return getBeef()
    .then(beef => cookBeef(beef))
    .then(cookedBeef => getBuns(cookedBeef))
    .then(bunsAndBeef => putBeefBetweenBuns(bunsAndBeef))
}

// Make and serve burger
makeBurger()
  .then(burger => serve(burger))
```

If you take advantage of the single-argument style with promises, you can tweak the above to this:

```js
const makeBurger = () => {
  return getBeef()
    .then(cookBeef)
    .then(getBuns)
    .then(putBeefBetweenBuns)
}

// Make and serve burger
makeBurger()
  .then(serve)
```

Much easier to read and manage.

But the question is how do you convert callback-based code into promise-based code.

### Converting callbacks to promises

To convert callbacks into promises, we need to create a new promise for each callback. We can `resolve` the promise when the callback is successful. Or we can `reject` the promise if the callback fails.

```js
const getBeefPromise = _ => {
  const fridge = leftFridge
  const beef = getBeefFromFridge(fridge)

  return new Promise((resolve, reject) => {
    if (beef) {
      resolve(beef)
    } else {
      reject(new Error('No more beef!'))
    }
  })
}
```

```js
const cookBeefPromise = beef => {
  const workInProgress = putBeefInOven(beef)

  return new Promise((resolve, reject) => {
    setTimeout (function () {
      resolve(workInProgress)
    }, 1000 * 60 * 20)
  })
}
```

In practice, callbacks would probably be written for you already. If you use Node, each function that contains a callback will have the same syntax:

1. The callback would be the last argument
2. The callback will always have two arguments. And these arguments are in the same order. (Error first, followed by whatever you're interested in).

```js
// The function that's defined for you
const functionName = (arg1, arg2, callback) => {
  // Do stuff here
  callback(err, stuff)
}

// How you use the function
functionName(arg1, arg2, (err, stuff) => {
  if (err) {
    console.error(err)
  }
  // Do stuff
})
```

If your callback has the same syntax, you can use libraries like [ES6 Promisify][4] or [Denodeify][5] (de-node-ify) that callback into a promise. If you use Node v8.0 and above, you can use [util.promisify][6].

All three of them work. You can choose any library to work with. There are slight nuances between each method though. I'll leave you to check their documentation for how-tos.

## Fourth solution to callback hell: Use asynchronous functions

To use asynchronous functions, you need to know two things first:

1. How to convert callbacks into promises (read above)
2. How to use asynchronous functions ([read this][7] if you need help).

With asynchronous functions, you can write `makeBurger` as if it's synchronous again!

```js
const makeBurger = async () => {
  const beef = await getBeef()
  const cookedBeef = await cookBeef(beef)
  const buns = await getBuns()
  const burger = await putBeefBetweenBuns(buns, cookedBeef)
  return burger
}

// Make and serve burger
makeBurger()
  .then(serve)
```

There's one improvement we can make to the `makeBurger` here. You can probably get two helpers to `getBuns` and `getBeef` at the same time. This means you can `await` them both with `Promise.all`.

```js
const makeBurger = async () => {
  const [beef, buns] = await Promise.all([getBeef(), getBuns()])
  const cookedBeef = await cookBeef(beef)
  const burger = await putBeefBetweenBuns(buns, cookedBeef)
  return burger
}

// Make and serve burger
makeBurger()
  .then(serve)
```

(Note: You can do the same with Promises... but the syntax isn't as nice and as clear as async/await functions).

## Wrapping up

Callback hell isn't as hellish as you think. There are four easy ways to manage callback hell:

1. Write comments
2. Split functions into smaller functions
3. Using Promises
4. Using Async/await

[1]:	/blog/callbacks "Introduction to callbacks in JavaScript"
[2]:	/blog/callbacks#callback-hell "Real Callback Hell example"
[3]:	/blog/js-promises/ "Promises in JavaScript"
[4]:	https://www.npmjs.com/package/es6-promisify "ES6 Promisify"
[5]:	https://www.npmjs.com/package/denodeify "Denodeify"
[6]:	https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
[7]:	/blog/async-await "Asynchronous functions (Async/await) in JavaScript"
