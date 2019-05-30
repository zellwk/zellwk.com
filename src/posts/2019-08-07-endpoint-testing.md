---
layout: post
title: Endpoint testing with Jest and Supertest
description: It's generally better to test endpoints because you're testing the round trip. It makes sure you application works. Here, I show you how to test and how to set up the tests.
slug: endpoint-testing
tags:
  - javascript
  - testing
---

After spending a long time learning about testing, I finally settled on testing my backend applications with Jest. I discovered the best way to test backend applications (and APIs) is to test the endpoints.

In this article, I want to share why I prefer testing endpoints and how I setup my tests with Jest.

<!-- more -->

## Why test endpoints?

Generally, there are two ways to think about testing—unit testing and integration testing.

**Unit testing** is about testing small components. The hope is: If your small components work individually, your application would work.

**Integration testing** is about testing your entire application, from end to end, to make sure it works.

I subscribe to Integration testing more than Unit testing. If you do Integration testing, you wouldn't end up with things like this...

<figure><img src="/images/2019/endpoint-testing/unit-testing-fail.gif" alt="Automated door and gate. Each has a sensor. Door and gate perpetually opens because the sensors interefere with each other."></figure>

And if you test endpoints, you're doing integration testing. You can test for:

1. The information that a user sends you
2. What happens if user sends you missing/wrong information
3. If user sends correct information, does it persist to the database?
4. What response does the database send you?
5. What do you send back to the user?

In short, you test the round trip and make sure the endpoint works. `frontend -> backend -> database -> backend -> frontend`.

That's why I test endpoints.

## Why Jest?

I tried many different test frameworks before deciding on Jest. (I tried Mocha, Jasmine, Tap, Tape, and AVA). What I like about Jest is:

1. No configuration needed. It works like magic.
2. The [watch-mode][1] is amazing. It lets me choose which tests to focus on (which reduce development time).

## Setting up Jest

First, you need to install Jest.

```js
npm install jest --save-dev
```

Next, you want to add tests scripts to your `package.json` file. It helps to add the `test` and `test:watch` scripts (for one-off testing and watch-mode respectively).

```js
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
},
```

You can choose to write your test files in one of the following formats. Jest would pick them up and test them for you automatically.

1. `js` files in the `__tests__` folder
2. files that contains `test.js` (like `user.test.js`)
3. files that contains `spec.js` (like `user.spec.js`)

When I test endpoints, I like to put my tests next to my endpoints. This makes it easy for me to find my test files.

```bash
- routes
  |- users/
    |- index.js
    |- users.test.js
```

## Writing your first test

Jest includes `describe`, `it` and `expect` for you in every test file. You don't have to `require` them.

- `describe` lets you wrap many tests together under one umbrella. (It is used for organizing your tests).
- `it` lets you run a test.
- `expect` lets you perform assertions. The test passes if all assertions passes.

Here's an example of a test that fails. In this example, we `expect` that `1` should be strictly equal to `2`. Since `1 !== 2`, the test fails.

```js
// This test fails because 1 !== 2
it('Testing to see if Jest works', () => {
  expect(1).toBe(2)
})
```

You'll see a failing message from Jest if you run Jest.

```js
npm run test:watch
```

<figure><img src="/images/2019/endpoint-testing/test-fail.png" alt="Output from Terminal. Test fails."></figure>

We can make the test pass by expecting `1 === 1`.

```js
// This passes because 1 === 1
it('Testing to see if Jest works', () => {
  expect(1).toBe(1)
})
```

<figure><img src="/images/2019/endpoint-testing/test-pass.png" alt="Output from Terminal. Test successful."></figure>

## Setting up your server to test endpoints

Let's assume you use Express as your server. Most tutorials teach you to setup a server this way:

```js
const express = require('express')
const app = express()

// Middlewares...
// Routes...

app.listen(3000)
```

This doesn't work because we want each test file to start its own server (to run tests concurrently). To let each test file start its own server, we need to export `app`.

```js
// server.js
const express = require('express')
const app = express()

// Middlewares...
// Routes...

module.exports = app
```

You can `listen` for normal development or production through a different file like `start.js`.

```js
// start.js
const app = require('./server.js')
app.listen(3000)
```

## Testing endpoints

You can use [supertest]() to test your endpoints.

First, let's install supertest.

```js
npm install supertest --save-dev
```

To use supertest, you `require` it, then you pass your server to it. Once you do so, you can use `request` to send GET, POST, PUT, DELETE requests.

```js
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async done => {
  // Sends GET Request to /test endpoint
  const res = await request.get('/test')

  // ...
  done()
})
```

Now let's say we have a GET endpoint at `/test`.

```js
app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})
```

You can test both the response and message from the Endpoint like this:

```js
it('gets the test endpoint', async done => {
  const response = await request.get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')
  done()
})
```

<figure><img src="/images/2019/endpoint-testing/test-endpoint-pass.png" alt="First endpoint test passes."></figure>

If you'd like to find out more about Supertest, you can read its documentation [here][3].

# Real tests coming up

In this article, you learned how to test endpoints with Jest and Supertest. But the tests we built together in this lession is basic. We're not testing real-world stuff yet.

That's because we haven't added the database layer yet. Adding the database layer can be complicated, so I'm going to explain it in full in the next article.

[1]:	https://egghead.io/lessons/javascript-use-jest-s-interactive-watch-mode "Use Jest's Interactive Watch Mode"
[3]:	https://github.com/visionmedia/supertest "Supertest"
