---
layout: post
title: Polymorphism in JavaScript
description: There are three kinds of Polymorphism—Adhoc Polymorphism, Parametric Polymorphism, and Subtype Polymorphism. I explain what each of them are and what they do.
slug: polymorphism-javascript
tags:
  - javascript
newsletter: jsr
---

For the longest time, I thought that "Polymorphing" was about converting something into sheep (thanks to Warcraft). The sheep image stuck with me and made it hard to understand exactly what Polymorphism is.

Today I want to explore what Polymorphism actually is. (Fun fact: Most articles about Polymorphism in JavaScript covers less than 1/3 of what it actually is).

<!-- more -->

## What is Polymorphism

Polymorphism comes from the word Polymorph.

- Poly: Many.
- Morph: Change from one form to another.

So Polymorphism is the ability to take on multiple forms.

**There are three kinds of Polymorphism in programming: **

1. Adhoc Polymorphism
2. Parametric Polymorphism
3. Subtype Polymorphism

Most articles on Object Oriented Programming and Polymorphism explains the 3rd type only. They don't explain the other two.

## Adhoc polymorphism

Adhoc is used to describe creation of something without previous planning. In other words, Adhoc Polymorphism means to **change something from one form to another on the spot.**

There are many forms of Adhoc Polymorphism

1. Operator Overloading
2. Function Overloading
3. Coercion Polymorphism

### Operator Overloading

Overloading means being able to do more than one thing.

Example:

The `+` operator in JavaScript does many things. You can use it to add numbers. You can also use it to concatenate strings.

```js
// Adding numbers
1 + 1 // Results in 2

// Adding Strings
'Hello' + ' ' + 'World' // Results in 'Hello World'

// Adding Numbers to Strings
1 + 'up' // Results in '1up'
```

<figure role="figure">
  <img src="/images/2020/polymorphism/operator-overload.png" alt="Shows results of the code above inside a dev console.">
</figure>

The `type` of the result changes depending on what's being added.

- `Number` + `Number` creates `Number`
- `Number` + `String` creates `String`

The `+` operator in this case, allows you to change the values from one form (like `Number`) to another (like `String`).

### Function Overloading

In some programming languages, Function overloading means creating two (or more) functions with the same name. Each function does something different depending on the arguments given to it.

[Example from Wikipedia][1] on calculating Volume in C+\+:

```js
// Volume of a Cube.
int Volume(int s) {
  return s * s * s;
}

// Volume of a Cuboid.
long Volume(long l, int b, int h) {
  return l * b * h;
}
```

Function Overloading in JavaScript is slightly different because we cannot produce two different functions with the same name.

We use one function, but **we change the results according to the arguments we receive**.

The above example could be rewritten as follows in JavaScript:

```js
function volumeCuboid (length, breadth, height) {
  return length * breadth * height
}

function volumeCube (length) {
  return volumeCubion(length, length, length)
}


// Overloading happens here
function calculateVolume (...args) {
  if (args.length === 3) return volumeCubiod(...args)
  return volumeCube(args[0])
}
```

We don't *need* to depend on the number of arguments. We can also change the result depending on the value of each argument.

Example:

We can have a `createShape` function that returns different objects depending on value of `shape`. (The [Factory Pattern][2] uses this type of Polymorphism).

```js
function createShape (size, shape) {
  if (shape === 'triangle') return new Triangle(/* ... */)
  if (shape === 'rectangle') return new Rectangle(/* ... */)
  if (shape === 'square') return new Square(/* ... */)
}
```

(Fun Fact: I understood this version of Polymorphism from Martin Fowler's <a target="_blank" href="https://www.amazon.com/gp/product/0134757599/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0134757599&linkCode=as2&tag=zellwk0a-20&linkId=e181f258b3c20e8e6968d35f1be703cc">Refactoring: Improving the Design of Existing Code</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=zellwk0a-20&l=am2&o=1&a=0134757599" width="1" height="1" border="0" alt="" style="display: inline; border:none !important; margin:0px !important;" />. It made me a little more curious about Polymorphism, which eventually led to this article you're reading!)

If we distill this theory down further, all `if` and `switch` statements result in Function Overloading.

```js
function createEmoji (emotion) {
  if (emotion === 'happy') return '😃'
  if (emotion === 'sad') return '😞'
  return 😑
}
```

### Coercion Polymorphism

JavaScript has Type coercion. It converts value from one type to another while evaluating them.

For example, you can any expression inside an `if` statement. JavaScript converts expression into `true` or `false`. If the expression converts to `true`, the expression is said to be truthy. If the expression converts to `false`, the expression is said to be falsey.

```js
const string = 'hello'
if (string) {
  console.log(string)
}
```

Another example: You can compare strings and numbers with `==` (although this is generally not recommended).

```js
22 == '22' // true
```

Since type coercion happens on the spot, it is a form of adhoc polymorphism.

### Variable overloading?

I'm not sure about this one.

Wikipedia defines Polymorphism as this:

> Polymorphism is the provision of single interface to entities of different types, or the use of a single symbol to represent different types

"Use a single symbol to represent different types" feels like Variable overloading to me. (Variable Overloading is not an actual term. It's something I came up with).

We already overload variables in JavaScript since each variable can represent any value.

```js
// Variables in JavaScript can represent any value
const str = 'string'
const num = 123
const bool = true
const array = []
const obj = {}
const nah = null
```

## Parametric Polymorphism

Parametric Polymorphism is polymorphism related to parameters... But that's not very useful so let's describe what it's about.

Parametric Polymorphism has two parts:

1. Data that can contain many types of data
2. Functions that can work with many types of data

### Data that can contain many types of data

Everything in JavaScript is an Object. So Objects are parametric. It can be converted into other types of data.

Objects can also store multiple types. It doesn't care what values are stored.

```js
const object = {
  str: 'hello',
  num: 123,
  bool: true
}
```

Arrays are also parametric. It lets you store many types of data and it doesn't care what they are.

```js
const array = ['hello', 123, true]
```

### Functions that can work with many types of data

Functions that can work with many types of data are called polymorphic functions. They don't care what comes in. They'll apply the transformation they're told to do, and they spit out a result.

`map` is a good example. It takes in an array and spits out another array. It doesn't care what goes in-between.

```js
const doubled = [1, 2, 3].map(num => num * 2)
```

You can use `map` to convert numbers into strings.

```js
const toString = [1, 2, 3].map(num => `${num}`)
```

`Object.assign` is another example. It takes in an object and spits out another object, but it doesn't care what goes inside each object.

```js
Object.assign({}, { property: 'value'})
```

## Subtype Polymorphism

Subtype Polymorphism involves **creating derivative objects from a parent object**. It's can be called Inclusion Polymorphism, Subclassing, or Inheritance. (Inheritance is such a loaded word. I'll explain it another day).

Derivatives objects can then override a method from the parent and it'll still work.

Example:

Let's say you have a `Human` class with a `sayHi` method:

```js
class Human {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    console.log(`Hi! My name is ${name}`)
  }
}
```

Then you create a `Developer` and `Designer` subclass from `Human`.

```js
class Developer extends Human {/* ... */}
class Designer extends Human {/* ... */}
```

We `Designer` and `Developer` to talk more about themselves, so we can override the `sayHi` method.

```js
class Developer extends Human () {
  sayHi() {
    console.log(`Hi! My name is ${name}. I am a developer.`)
  }
}

class Designer extends Human () {
  sayHi() {
    console.log(`Hi! My name is ${name}. I am a designer.`)
  }
}
```

Now you have three different classes. Each one of them can `sayHi`. You can use `sayHi` normally and they'll all work, but they produce different results.

```js
const zell = new Human('Zell')
const vincy = new Developer('Vincy')
const tim = new Designer('Tim')

zell.sayHi() // Hi! My name is Zell.
vincy.sayHi() // Hi! My name is Vincy. I am a developer.
zell.sayHi() // Hi! My name is Tim. I am a designer.
```

That's it!

## Wrapping up

There are the three kinds of Polymorphism.

1. Adhoc Polymorphism
2. Parametric Polymorphism
3. Subtype Polymorphism

Chances are, you're already using Polymorphism without knowing it 😉. I hope this clears up Polymorphism for you!

[1]:	https://en.wikipedia.org/wiki/Function_overloading
[2]:	https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript