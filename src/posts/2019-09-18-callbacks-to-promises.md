---
layout: post
title: Converting callbacks to promises 
description: It's easier to work with Promises and Async/await compared to callbacks. I teach you how to convert any callback into a promise. 
slug: converting-callbacks-to-promises
tags:
  - javascript
---

It's easier to work with Promises (or Async/await) compared to callbacks. This is especially true when you work in Node-based environments. Unfortunately, most Node APIs are written with callbacks. 

Today I want to show you how to convert callbacks to promises. 

<!-- more -->

Before you read this article, it helps to know what a [promise][1] is. 

## Converting Node-styled callbacks to promises

Callbacks from Node's API have the same pattern. They're passed into functions as the final argument. Here's an example with `fs.readFile`. 

```js
const fs = require('fs') 

fs.readFile(filePath, options, callback)
```

Also, each callback contains at least two arguments. The first argument must be an error object. 

```js
fs.readFile('some-file', (err, data) => {
  if (err) {
    // Handle error 
  } else {
    // Do something with data
  }
})
```

If you encounter a callback of this pattern, you can convert it into a promise with Node's `util.promisify`. 

```js
const fs = require('fs')
const util = require('util')

const readFilePromise = util.promisify(fs.readFile)
```

Once you convert the callback into a promise, you can use it like any other promise. 

```js
readFilePromise(filePath, options)
  .then(data => {/* Do something with data */})
  .catch(err => {/* Handle error */}
```

Once in a while, you may run into APIs that do not conform to Node's error-first callback format. For these situations, you cannot use `util.promisify`. You need to write your own promise. 

## Writing your own promise

To convert a callback into a promise, you need to return a promise. 

```js
const readFilePromise = () => {
  return new Promise ((resolve, reject) => {
    // ...  
  })
}
```

You run the code with the callback inside the promise. 

```js
const readFilePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      // ...
    })
  })
}
```

If there's an error, you reject the promise. This allows users to handle errors in `catch`. 

If there are no errors, you resolve the promise. This allows users to decide what to do next in `then`. 

```js
const readFilePromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
```

Next, you need to provide arguments like `filePath` and `options` to the code within the promise. To do this, you can use [rest and spread][2] operators. 

```js
const readFilePromise = (...args) => {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
```

You can then use `readFilePromise` as a promise. 

```js
readFilePromise(filePath, options)
  .then(data => {/* Do something with data */})
  .catch(err => {/* Handle error */}
```

## Converting non-Node-styled callbacks into promises

Turning a non-Node-style callback into a promise is easy once you know how to construct a promise. You follow the same steps: 

1. Reject if there's an error 
2. Resolve otherwise 

Let's say you have an API that returns `data` as the first argument and `err` as the second argument. Here's what you do: 

```js
const shootPeasPromise = (...args) => {
  return new Promise((resolve, reject) => {
    // This is a not a Node styled callback. 
    // 1. data is the first argument 
    // 2. err is the second argument
    shootPeas(...args, (data, err) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
```

## Callbacks with multiple arguments

Let's say you have a callback with three arguments: 

1. An error object 
2. Some data
3. Another piece of data 

```js
growTrees(options, (error, location, size) => {
  // ... 
})
```

You cannot write this: 

```js
// Note: This does not work 
const growTreesPromise = (...args) => {
  return new Promise((resolve, reject) => {
    growTrees(...args, (error, location, size) => {
      if (err) return reject(err)
      // You can't send two arguments into resolve
      resolve(location, size)
    })
  })
}
```

The code above doesn't work because promises can only return one argument. If you want to return many arguments, you can either use an array or an object. 

```js
// Using an array object
resolve([location, size])

// Using an object
resolve({location, size})
```

Then, You can destructure the array or object in the `then` call. 

```js
// If you use arrays
growTreesPromise(options)
  .then([location, size]) => {/* Do something */})

// If you use objects
growTreesPromise(options)
  .then({location, size}) => {/* Do something */})
```

[1]:	/blog/js-promises/ "JavaScript promise"
[2]:	/blog/es6/#the-rest-parameter-and-spread-operator "Introduction to ES6: Rest and Spread Operators"