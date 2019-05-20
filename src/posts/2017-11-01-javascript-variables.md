---
layout: post
slug: javascript-variables
title: What are variables and why use them in JavaScript
newsletter: jsr
tags:
  - javascript
shareText: "Use const over let when declaring variables. No need to use var anymore"
---

The main purpose of coding is to solve problems. What happens when you click on a button? That's also a problem for us to solve.

So, let's begin this article by solving a simple problem.

<!--more-->

## Counting apples

If you have 4 apples and you buy 27 more, how many apples do you have? Take a second and write your answer in your text editor.

What's your answer?

```js
// This?
31

// Or this?
4 + 27
```

Both answers are right, but the second method is better, because you're offloading the calculation to JavaScript. You're teaching it how to arrive at the answer.

But there's still one problem with the code.

If you look at `4 + 27` without any context from our apple problem, do you know we're calculating the number of apples you're currently holding?

Probably not.

So, a better way is to use Algebra to substitute 4 and 27 with variables. When you do so, you'll get the ability to write code that has meaning:

```js
initialApples + applesBought
```

The process of substituting 4 with a variable called `initialApples` is called declaring variables.

## Declaring Variables

You declare variables with the following syntax:

```js
const variableName = 'value'
```

There are four parts you'll want to take note of:

1. The `variableName`
2. The `value`
3. The `=` sign
4. The `const` keyword

### The variableName

`variableName` is the name of the variable you're declaring. You can name it anything, as long as it follows these rules:

1. It must be one word
2. It must consist only of letters, numbers or underscores (0-9, a-z, A-Z, `_`).
3. It cannot begin with a number.
4. It cannot be any of these [reserved keywords](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)

If you need to use two or more words to name your variable, you should join the words together, but capitalize the first letter of each subsequent word. This weird capitalization is called *camel case*.

A good example of a camel cased variable is `applesToBuy`.

### The value

The value is what you want the variable to be. It can be primitives (like strings and numbers etc) or objects (like arrays and functions).

### = in JavaScript

`=` in JavaScript doesn't work like `=` in Math. Don't get confused.

In JavaScript, `=` means **assignment**. When you use `=`, you set (or assign) the value on the right hand side (RHS) of the `=` sign to the left hand side (LHS) of the `=` sign.

In the following statement, you set the variable `initialApples` to the number 4.

```js
const initialApples = 4
```

If you `console.log` this variable, you can see that `initialApples` is 4.

```js
console.log(initialApples) // 4
```

### Evaluation before assignment

Every variable can only take up one value. So, if you have an equation that needs to be evaluated on the RHS, it will be evaluated before it is assigned to the variable.

```js
const initialApples = 4
const applesToBuy = 27

const totalApples = initialApples + applesToBuy
```

In this example, JavaScript will evaluate the answer of `initialApples` + `applesToBuy` (which results to 31) before assigning the results to `totalApples`. This is why you get `31` if tried to log `totalApples`.

```js
console.log(totalApples) // 31
```

### The const keyword

`const` is one of three keywords you can use to declare variables. There are two other keywords – `let` and `var`.

All three keywords declare variables, but they're slightly different from each other.

## Const vs let vs var

`const` and `let` are keywords made available to us in ES6. They are better keywords to create variables than `var` because [they're block scoped while var is function scoped](/blog/es6/#let-and-const).

For now, let's concentrate on the difference between `const` and `let`.

## Const vs let

**If you declare a variable with** `const`, **you cannot reassign** it with a new value. The following code produces an error:

```js
const applesToBuy = 22

// Reassigning to a variable declared with const results in an error
applesToBuy = 27
```

<figure><img src="/images/2017/js-variables/const.png" alt="Reassigning a variable declared with const results in an error">
  <figcaption>Reassigning a variable declared with const results in an error</figcaption>
</figure>

**If you declare a variable with** `let`, **you can reassign it with a new value.**

```js
let applesToBuy = 22
applesToBuy = 27
console.log(applesToBuy)
```

<figure><img src="/images/2017/js-variables/let.png" alt="It's okay to reassign variables declared with let">
  <figcaption>It's okay to reassign variables declared with let</figcaption>
</figure>

## Should you use const or let?

Understanding whether you should use `const` or `let` is more of an advanced topic.

When you're starting out, using `let` would be much simpler than using `const`.

However, as you write more programs, you'll slowly realize that you want to refrain from reassigning your variables, and you'll begin to use `const` over `let`.  Why you'll want to do so is a different topic for another day.

Since you're going to use `const` over `let` anyway when you write more advanced programs, it's better to get into the habit of preferring `const` over `let` when you're starting out.

In case you're wondering, don't use `var` anymore, because there's no need for it. `let` and `const` are much better than `var`.

## Wrapping up

In JavaScript, variables are used to hold a value. It can hold any value, from primitives to objects.

The `=` sign in JavaScript isn't the same as the `=` sign in Math. In JavaScript, `=` means assignment.

When you declare variables, use camelCase to name your variables. Avoid the reserved keywords.

You can declare variables with either `const`, `let` or `var`. As much as possible, you'll want to use `const` over `let`. Use `let` when you need to reassign values. There's no longer a need to use `var`.

**This article is a sample lesson from Learn JavaScript** – a course that helps you learn JavaScript and build real, practical components from scratch. If you found this article helpful, I invite you to [find out more about Learn JavaScript](https://learnjavascript.today).
