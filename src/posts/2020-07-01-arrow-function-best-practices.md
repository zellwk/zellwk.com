---
layout: post
title: Arrow Function Best Practices
description: 
slug: arrow-function-best-practices
tags:
  - javascript
newsletter: jsr
---

When `this` is used in an arrow function, `this` will be the `this` value in the surrounding lexical scope. 

Arrow functions change MANY things, so there are two best practices you need to know. 

1. Don't create methods with arrow functions
2. Create functions INISDE methods with arrow functions

<!-- more -->

:::note
This article is an excerpt from [Learn JavaScript][1]. Check it out if you found this article helpful.
:::

## Before you read this

If you're confused about the `this` keyword, try reading [this article][2]. It can help your clear up some confusions regarding `this`. 

## Practice #1: Don't create methods with arrow functions

When you use Object Oriented Programming, you may need to call a method from another method. To call a method from another method, you need `this` to point back to the instance (which called the method).

Example: 

Let's build a `Human` with a `sayHi` method. `sayHi` says `Hi!`, then proceeds to end the conversation by saying the person's name. 

We can use a `getFullname` method that returns the full name of the person inside `sayHi`.

```js
function Human (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Human.prototype.getFullname = function () {
  return this.firstName + ' ' + this.lastName
}

Human.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.getFullName()}`)
}
```

An instance can use the `sayHi` method and you'd expect it to work. It works because `this` points back to the instance. 

```js
const zell = new Human('Zell', 'Liew')
zell.sayHi() 
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/sayhi-correct.png" alt="Zell says hi.">
</figure>

Watch what happens if you change `sayHi` to an arrow function. 

```js
Human.prototype.sayHi = _ => {
  console.log(`Hi! My name is ${this.getFullName()}`)
}

// ...
zell.sayHi()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/sayhi-error.png" alt="Error, this.getFullname is not a function.">
</figure>

...

Why? 

In this case, `this` inside `sayHi` points to `Window`. Since `Window` doesn't have a `getFullName` method, calling `getFullName` will result in an error. 

`this` points to `Window` because `Window` is the lexical `this` value is `Window`. We can verify that `this` is `Window` by logging it. 

```js
Human.prototype.sayHi = _ => {
  console.log(this)
  console.log(`Hi! My name is ${this.getFullName()}`)
}

// ...
zell.sayHi()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/sayhi-arrow-method.png" alt="This is windows.">
</figure>

In short: **Do not use arrow functions to create methods!** 

## Create functions INISDE methods with arrow functions

`this` always points to `Window` when it is used in a simple function. The statement is true even if you create a simple function inside a method. 

```js
const object = {
  this () {
    function sayThis () {
      console.log(this)
    }
    sayThis()
  }
}

object.this()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/window.png" alt="This is Window.">
</figure>

We usually want `this` to be the object when we use `this` inside a method. (So we can call other methods). 

One way is to assign `this` to another variable. We often call this variable `self` or `that`. We'll then use `self` or `that` inside the function. 

```js
const object = {
  this () {
    const self = this
    function sayThis () {
      console.log(self)
    }
    sayThis()
  }
}

object.this()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/object.png" alt="This is the object.">
</figure>

Another way is to create a new function with `bind`. 

```js
const object = {
  this () {
    function sayThis () {
      console.log(this)
    }
    const correctSayThis = sayThis.bind(this)
    correctSayThis()
  }
}

object.this()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/object.png" alt="This is the object.">
</figure>

If you use arrow functions, you don't need to use `self`, `that`, or `bind`. You can write the arrow function directly, and `this` will point to the object (because the surrounding `this` value is the object). 

```js
const object = {
  hello () {
    const sayThis = _ => {
      console.log(this)
    }
    sayThis()
  }
}

object.hello()
```

<figure role="figure">
  <img src="/images/2020/arrow-function-best-practices/object.png" alt="This is the object.">
</figure>


[1]:	https://learnjavascript.today
[2]:	https://zellwk.com/blog/this "This in JavaScript"
