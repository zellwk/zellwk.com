---
layout: post
title: Understanding JavaScript Prototype
description: The word "Prototype" in JavaScript doesn't mean an initial version that was quickly put together. It refers to a system instead. 
slug: javascript-prototype
tags:
  - javascript
newsletter: jsr
---

JavaScript is said to be a Prototype-based language. So "prototypes" must be an important concept, right? 

Today I'm going to explain what Prototypes are, what you need to know, and how to use Prototypes effectively. 

<!-- more -->

## What are prototypes? 

First of all, **do not let the word "Prototype" mislead you**. The "prototype" in JavaScript isn't the same thing as "prototype" in English. It doesn't mean an initial version of a product that was quickly put together. 

Instead, prototype in JavaScript is simply a word that means absolutely nothing. We can replace prototype with oranges and it can mean the same thing. 

For example, think of Apple. Before Apple Computers became popular, you'll probably think of Apple as the red color fruit. "Apple" in Apple Computers doesn't have a meaning initially – but it does now. 

In JavaScript's case, prototype refers to a system. This system allows you to define properties on objects that can be accessed via the object's instances. 

:::note
Prototype is closely related to Object Oriented Programming. It wouldn't make sense if you don't understand what Object Oriented Programming is about. 

I suggest you familiarise yourself with [this introductory series on Object Oriented Programming]() before going further. 
:::

For example, an `Array` is a blueprint for array instances. You create an array instance with  `[]` or `new Array()`. 

```js
const array = ['one', 'two', 'three'] 
console.log(array)

// Same result as above
const array = new Array('one', 'two', 'three')
```

If you `console.log` this array, you don't see any methods. But yet, you can use methods like `concat`, `slice`, `filter`, and `map`! 

<figure role="figure">
  <img src="/images/2020/prototype/array.png" alt="Array doesn't contain method.">
</figure>

Why? 

Because these methods are located in the Array's prototype. You can expand the `__proto__` object (Chrome Devtools) or `<prototype>` object (Firefox Devtools) and you'll see a list of methods. 

<figure role="figure" aria-label="Array.prototype contains the methods">
  <img src="/images/2020/prototype/array-prototype.png" alt="">
  <figcaption>Array.prototype contains the methods</figcaption>
</figure>

<figure role="figure" aria-label="Firefox logs prototype as <prototype>">
  <img src="/images/2020/prototype/firefox.png" alt="">
  <figcaption>Firefox logs prototype as <code>prototype</code></figcaption>
</figure>

:::note
Both `__proto__` in Chrome and `<prototype>` in Firefox points to the Prototype object. They're just written differently in different browsers. 
:::

When you use `map`, JavaScript looks for `map` in the object itself. If `map` is not found, JavaScript tries to look for a Prototype. If JavaScript finds a prototype, it continues to search for `map` in that prototype. 

So the correct **definition for Prototype** is: **An object where instances can access** when they're trying to look for a property. 

## Prototype Chains 

Here’s what JavaScript does when you access a property:

**Step 1**: JavaScript checks if the property available inside the object. If yes, JavaScript uses the property straight away.

**Step 2**: If the property is NOT inside the object, JavaScript checks if there’s a Prototype available. If there is a Prototype, repeat Step 1 (and check if the property is inside the prototype).

**Step 3**: If there are no more Prototypes left, and JavaScript cannot find the property, it does the following:

- Returns `undefined` (if you tried to access a property).
- Throws an error (if you tried to call a method).

Diagrammatically, here’s how the process looks like:

<figure role="figure">
  <img src="/images/2020/prototype/prototype-chain.jpg" alt="Prototype chain.">
</figure>

### Prototype Chain example 

Let's say we have a `Human` class. We also have a `Developer` Subclass that inherits from `Human`. `Human`s have a `sayHello` method and `Developers` have a `code` method. 

Here's the code for `Human`

```js
class Human {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastname = lastName 
  }
  
  sayHello () {
    console.log(`Hi, I'm ${this.firstName}`)
  }
} 
```

:::note
`Human` (and `Developer` below) can be written with Constructor functions. If we use Constructor functions, the `prototype` becomes clearer, but creating Subclasses becomes harder. That's why I'm showing an example with Classes. (See [this article]() for the 4 different ways to use Object Oriented Programming). 

Here's how you would write `Human` if you used a Constructor instead. 

```js
function Human (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Human.prototype.sayHello = function () {
  console.log(`Hi, I'm ${this.firstName}`)
}
```
:::

Here's the code for `Developer`. 

```js
class Developer extends Human {
  code (thing) {
    console.log(`${this.firstName} coded ${thing}`)
  }
}
```

A `Developer` instance can use both `code` and `sayHello` because these methods are located in the instance's prototype chain. 

```js
const zell = new Developer('Zell', 'Liew')
zell.sayHello() // Hi, I'm Zell
zell.code('website') // Zell coded website
```

If you `console.log` the instance, you can see the methods in the prototype chain. 

<figure role="figure">
  <img src="/images/2020/prototype/prototype-chain-eg.png" alt="`code` and `sayHello` in the prototype chain.">
</figure>

## Prototypal Delegation / Prototypal Inheritance 

Prototypal Delegation and Prototypal Inheritance mean the same thing. 

They're simply saying we use the prototype system – where we put properties and methods in the `prototype` object. 

## Should we use Prototypal Delegation? 

Since JavaScript is a Prototype-based language, we should use Prototypal Delegation. Right? 

Not really. 

I'd argue it depends on how you write Object Oriented Programming. It makes sense to use Prototypes if you use classes because they're more convenient. 

```js
class Blueprint {
  method1 () {/* ... */}
  method2 () {/* ... */}
  method3 () {/* ... */}
}
```

But it makes sense NOT to use prototypes if you use Factory functions. 

```js
function Blueprint {
  return {
	  method1 () {/* ... */}
	  method2 () {/* ... */}
	  method3 () {/* ... */}
  }
}
```

Again, read [this article]() for four different ways to write Object Oriented Programming. 

## Performance Implications 

Performance between the two methods doesn't matter much – unless your app requires millions of operations. In this section, I'm going to share some experiments to prove this point. 

### Setup

We can use `performance.now` to log a timestamp before running any operations. After running the operations, we will use `performance.now` to log the timestamp again. 

We'll then get the difference in timestamps to measure how long it the operations took. 

```js
const start = performance.now()
// Do stuff 
const end = performance.now()

const elapsed = end - start
console.log(elapsed)
```

I used a `perf` function to help with my tests: 

```js
function perf (message, callback, loops = 1) {
  const startTime = performance.now()
  for (let index = 0; index <= loops; index++) {
    callback()
  }
  const elapsed = performance.now() - startTime
  console.log(message + ':', elapsed)
}
```

Note: You can learn more about `performance.now` in [this article](/blog/performance-now). 

### Experiment #1: Using Prototypes vs Not using Prototypes 

First, I tested how long it takes to access a method via a prototype vs another method that is located in the object itself. 

Here's the code: 

```js
class Blueprint () {
  constructor () {
    this.inObject = function () { return 1 + 1 }
  }
  
  inPrototype () { return 1 + 1 }
}

const count = 1000000 
const instance = new Blueprint()
perf('In Object', _ => { instance.inObject() }, count) 
perf('In Prototype', _ => { instance.inPrototype() }, count) 
```

The average results are summarised in this table as follows: 

| Test          | 1,000,000 ops  | 10,000,000 ops |
|:-----------|:--------------|:---------------|
| In Object     | 3ms              | 15ms          |
| In Prototype | 2ms              | 12ms          |

Note: Results are from Firefox's Devtools. Read [this](/blog/performance-now) to understand why I'm only benchmarking with Firefox. 

The verdict: It doesn't matter whether you use Prototypes or not. It's not going to make a difference unless you run > 1 million operations. 

### Experiment #2: Classes vs Factory Functions

I had to run this test since I recommend using Prototypes when you use Classes, and not using prototypes when you use Factory functions. 

I needed to test whether creating Factory functions was significantly slower than creating classes. 

Here's the code. 

```js
// Class blueprint
class HumanClass {
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  sayHello () {
    console.lg(`Hi, I'm ${this.firstName}}`)
  }
}

// Factory blueprint
function HumanFactory (firstName, lastName) {
  return {
    firstName,
    lastName,
    sayHello () {
	    console.log(`Hi, I'm ${this.firstName}}`)
	  }
  }
}

// Tests
const count = 1000000
perf('Class', _ => { new HumanClass('Zell', 'Liew') }, count)
perf('Factory', _ => { HumanFactory('Zell', 'Liew') }, count)
```

The average results are summarised in the table as follows: 

| Test          | 1,000,000 ops  | 10,000,000 ops |
|:-----------|:--------------|:---------------|
| Class         | 5ms              | 18ms          |
| Factory      | 6ms              | 18ms          |

The verdict: It doesn't matter whether you use Class or Factory functions. It's not going to make a difference even if you run > 1 million operations. 

### Conclusion about performance tests

You can use Classes or Factory functions. You choose to use Prototypes, or you can choose not to. It's really up to you. 

There's no need to worry about performance. 
