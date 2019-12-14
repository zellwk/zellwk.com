---
layout: post
title: Handling Errors in Express
description: How to handle Express errors
slug: express-errors
cover: "/images/2019/express-errors/cover.png"
coverAlt: "Handling Express Errors"
tags:
  - node
  - express
---

I had a hard time learning how to handle errors in Express when I started. Nobody seemed to have written the answers I needed, so I had to learn it the hard way.

Today, I want to share everything I know about handling errors in an Express app.

<!-- more -->

Let's begin with synchronous errors.

## Handling synchronous errors

If you want to handle a synchronous error, you can `throw` the error in an Express request handler. (Note: Request handlers are also called controllers. I prefer saying request handlers because they're explicit and easy to understand).

```js
app.post('/testing', (req, res) => {
  throw new Error('Something broke! 😱')
})
```

These errors can be caught with an Express error handler. If you did not write a custom error handler (more on this below), Express will handle the error for you with a default error handler.

Express's default error handler will:

1. Set the HTTP Status to 500
2. Sends a text response to the requester
3. Logs the text response in the console

<figure role="figure"><img src="/images/2019/express-errors/sync-error.png" alt="Error returns to the client"></figure>

## Handling asynchronous errors

If you want to handle an asynchronous error, you need to send the error into an express error handler through the `next` argument.

```js
app.post('/testing', async (req, res, next) => {
  return next(new Error('Something broke again! 😱'))
})
```

<figure role="figure"><img src="/images/2019/express-errors/async-error-log.png" alt=""></figure>

If you're using Async/await in an Express app, you want to use a wrapper function like [express-async-handler][1]. This lets you write asynchronous code without try/catch blocks. I wrote more about this in "[Using Async/await in Express][2]".

```js
const asyncHandler = require('express-async-handler')

app.post('/testing', asyncHandler(async (req, res, next) => {
  // Do something
}))
```

Once you wrapped the request handler with `express-async-handler`, you can `throw` the error as before, and it'll be handled with an Express error handler.

```js
app.post('/testing', asyncHandler(async (req, res, next) => {
  throw new Error('Something broke yet again! 😱')
}))
```

<figure role="figure"><img src="/images/2019/express-errors/async-handler-error-log.png" alt=""></figure>

## Writing a custom error handler

Express error handlers take in four arguments:

1. `error`
2. `req`
3. `res`
4. `next`

They must be placed after all your middlewares and routes.

```js
app.use(/*...*/)
app.get(/*...*/)
app.post(/*...*/)
app.put(/*...*/)
app.delete(/*...*/)

// Place your error handler after all other middlewares
app.use((error, req, res, next) => { /* ... */ })
```

Express will stop using its default error handler once you create a custom error handler. To handle an error, you need to communicate with the frontend that's requesting the endpoint. This means you need to:

1. Send over a valid HTTP status code
2. Send over a valid response

A valid HTTP status code depends on what happened. Here's a list of common errors you should prepare for:

1. **400 Bad Request Error:**
	- Used when user fails to include a field (like no credit card information in a payment form)
	- Also used when user enters incorrect information (Example: Entering different passwords in a password field and password confirmation field).
2. **401 Unauthorized Error:** Used when user enters incorrect login information (like username, email or password).
3. **403 Forbidden Error:** Used when user is not allowed access the endpoint.
4. **404 Not Found Error:** Used when the endpoint cannot be found.
5. **500 Internal Server Error:** Used the request sent by the frontend is correct, but there was an error from the backend.

Once you determined the correct HTTP status code, you want to set the status with `res.status`

```js
app.use((error, req, res, next) => {
  // Bad request error
  res.status(400)
  res.json(/* ... */)
})
```

The HTTP status code should match the error message. For the status code to match the error message, you must send the status code together with the error.

The easiest way is to use the [http-errors][3] package. It lets you send three things in your errors:

1. A status code
2. A message to go with the error
3. Any properties you'd like to send. This is optional.

Installing `http-errors`:

```bash
npm install http-errors --save
```

Using `http-errors`:

```js
const createError = require('http-errors')

// Creating an error
throw createError(status, message, properties)
```

Let's work through an example together to make it clearer. Let's say you tried to find a user by their email address. The user cannot be found. You want to throw an error that says "User not found".

When you create the error, you want to:

1. Send a 400 Bad Request Error (because the user filled in incorrect information). You send this as the first parameter.
2. Send a message that says "User not found". You send this as the second parameter.

```js
app.put('/testing', asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  // Throws error if user not found
  if (!user) throw createError(400, `User '${email}' not found`)
}))
```

You can get the status code with `error.status` and the error message with `error.message`.

```js
// Logging the error
app.use((error, req, res, next) => {
  console.log('Error status: ', error.status)
  console.log('Message: ', error.message)
})
```

<figure role="figure"><img src="/images/2019/express-errors/http-errors.png" alt="Status code and error message logged into the console. "></figure>

Then, you set the error status with `res.status`. You send the message with `res.json`.

```js
app.use((error, req, res, next) => {
  // Sets HTTP status code
  res.status(error.status)

  // Sends response
  res.json({ message: error.message })
})
```

Personally I like to send the status, the message, and the stack trace for me to debug easily.

```js
app.use((error, req, res, next) => {
  // Sets HTTP status code
  res.status(error.status)

  // Sends response
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
})

```

### Fallback status code

If the error did not originate from `createError`, it will not have a status property.

Here's an example. Let's say you tried to read a file with `fs.readFile`, but the file does not exist.

```js
const fs = require('fs')
const util = require('util')

// Converts readFile from callbacks to Async/await.
// Find out how to do this here: https://zellwk.com/blog/callbacks-to-promises
const readFilePromise = util.promisify(fs.readFile)

app.get('/testing', asyncHandler(async (req, res, next) => {
  const data = await readFilePromise('some-file')
})
```

This error would not contain a `status` property.

```js
app.use((error, req, res, next) => {
  console.log('Error status: ', error.status)
  console.log('Message: ', error.message)
})
```

<figure role="figure"><img src="/images/2019/express-errors/fallback-error.png" alt="Error does not contain the status property"></figure>

In these cases, you can default to 500 Internal Server Error.

```js
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
})
```

### Changing an error's status code

Let's say you want to retrieve a file from a user's input. If the file does not exist, you should throw a 400 Bad Request Error, because it's not your server's fault.

In this case, you want to use `try/catch` to catch the original error. Then, you recreate an error with `createError`.

```js
app.get('/testing', asyncHandler(async (req, res, next) => {
  try {
    const { file } = req.body
    const contents = await readFilePromise(path.join(__dirname, file))
  } catch (error) {
    throw createError(400, `File ${file} does not exist`)
  }
})
```

## Handling 404 errors

An endpoint is not found if a request falls through all your middlewares and routes.

To handle a Not Found Error, you insert a middleware between your routes and your error handler. Here, create an error with `createError`.

```js
// Middlewares...
// Routes...

app.use((req, res, next) => {
  next(createError(404))
})

// Error handler...
```

<figure role="figure"><img src="/images/2019/express-errors/not-found-error.png" alt="Not found error sent to the client."></figure>

## Regarding "Cannot set headers after they are sent to the client"

Don't panic if you see an error that says "Cannot set headers after they're sent to the server".

<figure role="figure"><img src="/images/2019/express-errors/http-errors.png" alt="Error: Cannot set headers after they're sent."></figure>

This error happens because the code ran methods that set response headers more than once in the same handler. These are the methods that set a response headers for you:

1. `res.send`
2. `res.json`
3. `res.render`
4. `res.sendFile`
5. `res.sendStatus`
6. `res.end`
7. `res.redirect`

For example, if you run `res.render` and `res.json` in the same response handler, you will get the "Cannot set headers after they're sent" error.

```js
app.get('/testing', (req, res) => {
  res.render('new-page')
  res.json({ message: '¯\_(ツ)_/¯' })
})
```

So, if you get this error, double-check your response handlers to make it doesn't run the above methods twice.

### When streaming

If an error occurs when you're streaming a response to the frontend, you will get the same "Cannot set headers" error.

In this case, Express states you should delegate the error handling to the default Express handlers. It will send an error and close the connection for you.

```js
app.use((error, req, res, next) => {
  // Do this only if you're streaming a response
  if (res.headersSent) {
    return next(error)
  }

  // Rest of the error handlers
})
```

That's all I know for now! :)

[1]:	/blog/express-errors/
[2]:	/blog/async-await-express
[3]:	https://www.npmjs.com/package/http-errors "Http errors package"
