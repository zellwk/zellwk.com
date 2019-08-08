---
layout: post
title: Three useful Express middleware
description: "I want to share three useful express middlewares with you. They are: Morgan, Camelcase, and Remove Empty Properties."
slug: express-middlewares
tags:
  - express
  - node 
  - javascript
---

As I created applications with Express and Node, I learned about three useful middlewares: 

1. Morgan 
2. Camelcase
3. Remove empty properties  

Of these three, Morgan is an actual middleware. You can download [Morgan][1] from npm directly. The other two are middlewares I created with [camelcase-keys][2] and [omit-empty][3] respectively. 

I want to share what these three middlewares do, and how they make life easier for me when I'm creating applications. 

<!-- more -->

## Morgan

Morgan is a request logger. It tells you several things when your server receives a request. It can log things like: 

- Date
- HTTP version
- Method 
- Referrer
- Remote Address
- Remote User 
- Request header 
- Response headers 
- Response time 
- Status code 
- Url of the request 
- User Agent 

Morgan comes with five predefined formats for you to choose from: 

1. Combined
2. Common
3. Short
4. Dev
5. Tiny 

I only use the `dev` format. A `dev` log from Morgan looks like this: 

<figure role="figure"><img src="/images/2019/express-middlewares/200.png" alt="Example of a Dev log."></figure>

I use Morgan to check two things: 

1. The method and the endpoint
2. Status codes

### Checking the method and endpoint

When you write backend code, you need to make sure you send a request with the correct method and endpoint. If the method or endpoint is wrong, you will not be able to trigger the request handler you're expecting to trigger. 

For example, if you want to trigger `requestHandler` in the code below, you need to send a `GET` request to the `/testing` endpoint. 

```js
app.get('/testing', requestHandler)
```

If something goes wrong when I code backend applications, the first thing I check whether I'm sending the correct method and endpoint. Checking this first helps me save a ton of time debugging what would have been a typo. 

When I send a request to the server, I get a log from Morgan. This log tells me the method and endpoint. The first value is the method. The second value is the endpoint. 

<figure role="figure"><img src="/images/2019/express-middlewares/breakdown.png" alt="Identifies the method and endpoint in a dev log."></figure>

### Checking status codes  

Since backend is about [communication][4], I want to make sure I send the correct status code back to the frontend. If a user tries to login with an incorrect username or password, I want to send an 401 Unauthorized Error instead of a 500 Internal Server Error. 

The best part about the `dev` format is it shows the status code with different colors. This makes status codes easier to spot. 

A 200+ status code is green: 

<figure role="figure"><img src="/images/2019/express-middlewares/200.png" alt="200 status code is green."></figure>

A 300+ status code is cyan: 

<figure role="figure"><img src="/images/2019/express-middlewares/300.png" alt="300 status code is cyan."></figure>

A 400+ status code is yellow: 

<figure role="figure"><img src="/images/2019/express-middlewares/400.png" alt="400 status code is yellow."></figure>

And a 500+ status code is red: 

<figure role="figure"><img src="/images/2019/express-middlewares/500.png" alt="500 status code is red."></figure>

## CamelCase

Let's say you want to get a user's first name from a form. To do this, you need a `<form>` in your HTML. The `<form>` should contain an `<input>` with the `name` of `first-name`. 

```html
<form>
  <input name="first-name">
</form>
```

To receive `first-name` in the backend, you need to use the bracket notation. This is because `-` is an operator in JavaScript. It is not recognized as a hyphen. 

```js
app.get('/endpoint', (req, res) => {
  // Bracket notation to get the value of a property
  const firstName = req.body['first-name']
})
```

I don't like using the bracket notation. I prefer using the dot notation whenever possible. 

```js
app.get('/endpoint', (req, res) => {
  // Dot notation
  const firstName = req.body.firstName
})
```

I prefer the dot notation because I use it everywhere. I'm used to writing camel case in JavaScript. It feels weird if I don't use the dot notation. Plus, I can destructure the property if I can use the dot notation. 

```js
app.get('/endpoint', (req, res) => {
  const { firstName } = req.body
})
```

To use dot notation, I need to make sure the `name` property in the `<input>` element is written in camel case. 

```js
<input name="firstName">
```

But this feels weird, because we don't usually camel case stuff in HTML! We separate words with hyphens!

```html
<!-- This feels weird -->
<input name="firstName">

<!-- This feels normal -->
<input name="first-name">
```

My solution is to convert all properties into camel case when before it hits my request handler. I do this with a middleware I made using [Sindre Sorhus's][5] [camelcase-keys][6] package. 

```js
const camelcaseKeys = require('camelcase-keys')

const camelcase = () => {
  return function (req, res, next) {
    req.body = camelcaseKeys(req.body, { deep: true })
    req.params = camelcaseKeys(req.params)
    req.query = camelcaseKeys(req.query)
    next()
  }
}
```

You can use the middleware like this: 

```js
app.use(camelcase())
```

With `camelcase`, you don't have to worry about `first name`, `first_name`, `first-name`, or `FirstName`. It'll always be `firstName`.

It doesn't matter whether you're getting from `req.body`, `req.params` or `req.query` too. All properties will be in camel case. 

## Remove empty properties

Let's imagine a situation where you expect an array of skills. 

```js
fetch('/endpoint', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' }
  body: JSON.stringify({
    name: 'Zell',
    skills: ['coding', 'designing', 'writing']
  })
}
```

If there are one or more skills, you want to add the skills to the database. 

```js
app.post('/endpoint', (req, res) => {
  const { skills } = req.body

  if (skills.length !== 0) {
    // Add skills to database
  }
})
```

But we have a problem. Users can send you a variation of the request: 

1. Contains no `skills` property 
2. Contains an empty `skills` property 
3. Contains a `skills` property with at least one skill

If the user does not send you a `skills` property, you cannot write `skills.length`. You'll get an error that says `Cannot read property 'length' of undefined `. 

To correctly check for one or more skills, you need two conditions: 

1. Check if there's a skills array
2. Check if there's at least one item in the array

```js
app.post('/endpoint', (req, res) => {
  const { skills } = req.body
  
  if (skills && skills.length !== 0) {
    // Add skills to database
  }
})

```

There's a way to simplify these checks. My solution is to create a middleware with [Jon Schlinkert's][7] [omit-empty][8] package. 

`omitEmpty` removes empty properties from an object. 

```js
const object = {
  null: null, 
  undefined: undefined,
  emptyString: '',
  emptyArray: [],
  emptyObject: {},
  filled: 'yay'
}

console.log(omitEmpty(object))
// {
//   filled: 'yay'
// }
```

Here's the middleware I made: 

```js
const omitEmpty = require('omitEmpty')

const removeEmptyProperties = () => {
  return function (req, res, next) {
    req.body = omitEmpty(req.body)
    req.params = omitEmpty(req.params)
    req.query = omitEmpty(req.query)
    next()
  }
}
```

You can use `removeEmptyProperties` this way: 

```js
app.use(removeEmptyProperties())
```

Once you use the `removeEmptyProperties` middleware, you don't have to check for the length of `skills`. You can be sure `skills` contains one or more items if it is present. 

So the code becomes: 

```js
app.post('/endpoint', (req, res) => {
  const { skills } = req.body
  
  if (skills) {
    // Add skills to database
  }
})
```

Much simpler! 


[1]:	https://www.npmjs.com/package/morgan "Morgan"
[2]:	https://www.npmjs.com/package/camelcase-keys "camelcase-keys"
[3]:	https://www.npmjs.com/package/omit-empty "Omit Empty"
[4]:	/blog/frontend-vs-backend "Frontend vs Backend"
[5]:	https://sindresorhus.com "Sindre Sorhus"
[6]:	https://www.npmjs.com/package/camelcase-keys "camelcase-keys"
[7]:	https://twitter.com/jonschlinkert "Jon Schlinkert"
[8]:	https://www.npmjs.com/package/omit-empty "Omit Empty"