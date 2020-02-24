---
layout: post
title: Using Async/await in Express
description: The easiest way to use async/await in Express is use express-async-handler. This article shows you why, and how you can use it.
slug: async-await-express
tags:
  - javascript
  - express
  - node
---

Have you noticed you write a lot of asynchronous code in Express request handlers? This is normal because you need to communicate with the database, the file system, and other APIs.

When you have so much asynchronous code, it helps to use Async/await. It makes your code easier to understand.

Today, I want to share how to use async/await in an Express request handler.

<!-- more -->

Note: Before you continue, you need to know what Async/await is. If you don't know, you can read [this article][1] for more information.

## Using Async/await with a request handler

To use Async/await, you need to use the `async` keyword when you define a request handler. (Note: These request handlers are known as called "controllers". I prefer calling them request handlers because request handlers are more explicit).

```js
app.post('/testing', async (req, res) => {
  // Do something here
})
```

Once you have the `async` keyword, you can `await` something immediately in your code.

```js
app.post('/testing', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
})
```

## Handling Async errors

Let's say you want to create a user through a POST request. To create a user, you need to pass in a `firstName` and an `email` address. Your Mongoose Schema looks like this:

```js
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  }
})
```

Here's your request handler:

```js
app.post('/signup', async(req, res) => {
  const { email, firstName } = req.body
  const user = new User({ email, firstName })
  const ret = await user.save()
  res.json(ret)
})
```

Now, let's say you send a request that lacks an email address to your server.

```js
fetch('/signup', {
  method: 'post'
  headers: { 'Content-Type': 'application/json' }
  body: JSON.stringify({
    firstName: 'Zell'
  })
}
```

This request results in an error. Unfortunately, Express will not be able to handle this error. You'll receive a log like this:

<figure role="figure"><img src="/images/2019/async-await-express/unhandled-error.png" alt="Unhandled Promise Rejection Warning."></figure>

To handle an error in an asynchronous function, you need to catch the error first. You can do this with `try/catch`.

```js
app.post('/signup', async(req, res) => {
  try {
    const { email, firstName } = req.body
    const user = new User({ email, firstName })
    const ret = await user.save()
    res.json(ret)
  } catch (error) {
    console.log(error)
  }
})
```

<figure role="figure"><img src="/images/2019/async-await-express/console-log-error.png" alt="Logging the error into the console."></figure>

Next, you pass the error into an Express error handler with the `next` argument.

```js
app.post('/signup', async(req, res, next) => {
  try {
    const { email, firstName } = req.body
    const user = new User({ email, firstName })
    const ret = await user.save()
    res.json(ret)
  } catch (error) {
    // Passes errors into the error handler
    return next(error)
  }
})
```

If you did not write a custom error handler yet, Express will handle the error for you with its default error handler. (Though I recommend you write a custom error handler. You can learn more about it [here][2]).

Express's default error handler will:

1. Set the HTTP status to 500
2. Send a Text response back to the requester
3. Log the text response in the console

<figure role="figure" aria-label="I used Postman to send a request to my server. Here's the text response back from the server."><img src="/images/2019/async-await-express/default-error-handler-response.png" alt="Sends a text response back to the request"><figcaption>I used Postman to send a request to my server. Here's the text response back from the server. </figcaption></figure>

<figure role="figure" aria-label="Notice the 500 HTTP Status log in this image. This tells me Express's default handler changed the HTTP Status to 500."><img src="/images/2019/async-await-express/default-error-handler-log.png" alt="Logs the text response into the console."><figcaption>Notice the 500 HTTP Status log in this image. This tells me Express's default handler changed the HTTP Status to 500. The log is from Morgan. I talked about Morgan in detail <a href="/blog/express-middlewares"> here</a>. </figcaption></figure>

## Handling two or more async errors

If you need to handle two `await` statements, you might write this code:

```js
app.post('/signup', async(req, res, next) => {
  try {
    await firstThing()
  } catch (error) {
    return next(error)
  }

  try {
    await secondThing()
  } catch (error) {
    return next(error)
  }
})
```

This is unnecessary. If `firstThing` results in an error, the request will be sent to an error handler immediately. You would not trigger a call for `secondThing`. If `secondThing` results in an error, `firstThing` would not have triggered an error.

This means: Only one error will be sent to the error handler. It also means we can wrap all `await` statements in ONE `try/catch` statement.

```js
app.post('/signup', async(req, res, next) => {
  try {
    await firstThing()
    await secondThing()
  } catch (error) {
    return next(error)
  }
})
```

## Cleaning up

It sucks to have a `try/catch` statement in each request handler. They make the request handler seem more complicated than it has to be.

A simple way is to change the `try/catch` into a promise. This feels more friendly.

```js
app.post('/signup', async(req, res, next) => {
  function runAsync () {
    await firstThing()
    await secondThing()
  }

  runAsync()
    .catch(next)
})
```

But it's a chore to write `runAsync` for every Express handler. We can abstract it into a wrapper function. And we can attach this wrapper function to each request handler

```js
function runAsyncWrapper (callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

app.post('/signup', runAsyncWrapper(async(req, res) => {
    await firstThing()
    await secondThing()
})
```

## Express Async Handler

You don't have to write `runAsyncWrapper` code each time you write an express app either. [Alexei Bazhenov][3] has created a package called [express-async-handler][4] that does the job in a slightly more robust way. (It ensures `next` is always the last argument).

To use `express-async-handler`, you have to install it first:

```bash
npm install express-async-handler --save
```

Using it in your app:

```js
const asyncHandler = require('express-async-handler')

app.post('/signup', asyncHandler(async(req, res) => {
    await firstThing()
    await secondThing()
}))
```

I don't like to write `asyncHandler`. It's quite long. My obvious solution is to abbreviate `asyncHandler` to `ash`.

If you're fancier, you can consider using [@awaitjs/express][5] by [Valeri Karpov][6]. It adds methods like `getAsync` and `postAsync` to Express so you don't have to use `express-async-handler`.

[1]:	/blog/async-await
[2]:	https://zellwk.com/blog/express-errors/ "Handling express errors"
[3]:	https://github.com/Abazhenov
[4]:	https://www.npmjs.com/package/express-async-handler
[5]:	https://www.npmjs.com/package/@awaitjs/express
[6]:	https://twitter.com/code_barbarian