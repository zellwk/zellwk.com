---
title: Why you shouldn't reassign values in JavaScript
layout: post
slug: dont-reassign
tags:
 - javascript
newsletter: jsr
---

In JavaScript, you can reassign values to variables you declared with `let` or `var`.

I used to reassign values a lot. But as I got better with JavaScript, I realized you shouldn't reassign values if you can. This is because:

1. You may change external state by accident when you reassign values
2. You create more complex code when you reassign values

<!--more-->

<div class="jsCkClone" data-should-not-clone></div>

## You may change external state by accident when you reassign values

When you assign a new value to a variable, you write the variable name, followed by `=`, followed by your new value.

```js
// Declaring a variable
let name = 'Zell'

// Reassigning a variable
name = 'Vincy'
```

It seems okay to reassign values at first glance, but it isn't. The problem arises when you look at scopes.

Let's say you have a variable called `name` in the global context.

Let's also say you created a function called `sayName`. `sayName` logs the argument you passed into it. But before you log the argument, you change the `name` variable.

```js
let name = 'Zell'

function sayName (arg) {
  name = arg
  console.log(name)
}
```

When you call `sayName`, you change the value of `name` forever. It changed the state outside of the function.

```js
sayName('Vincy') // Vincy
console.log(name) // Vincy
```

Now, you may think that this example sounds stupid, and you'll never write silly code like this.

The question is, can you guarantee that you'll never make this mistake, even when you're in the thick of things?

I can't.

**Make it a habit not to reassign variables.**

I recommend always create variables with the `const` keyword. This is because variables created with a `const` keyword cannot be reassigned. You'll get an error if you try to assign a new value to them.

```js
const name = 'Zell'

function sayName (arg) {
  name = arg
  console.log(name)
}

sayName('Vincy') // TypeError: invalid assignment to const `name'
```

## You create complex code when you reassign values

Imagine a colleague of your changes her hairstyle every day. She comes into the office with:

1. Bangs on Monday
2. Braids on Tuesday
3. Short hair on Wednesday
4. Long hair on Thursday
5. Bright pink hair on Friday

It'll be hard for you to recognize her.

When you create a variable with `let`, your brain knows the variable is going to change. It exerts more energy to keep track of the changes down the road.

Let's go through an example and you'll see how this works.

```js
let hair

if (today === 'Monday') {
  hair = 'bangs'
} else {
  hair = 'something else'
}
```

Here, your brain goes:

1. There's a variable called `hair`.
2. The value of `hair` is going to change later. I don't know its value now. (This is uncomfortable).
3. Later...
4. `today` is Monday.
5. Hair is going to be `bangs`

Now compare this thought process with one where you use ternary operators.

```js
const hair = today === 'Monday'
  ? 'bangs'
  : 'something else'
```

Here, your brain goes:

1. There's a variable called hair.
2. `today` is Monday.
3. Hair is going to be `bangs`.

There's no "wait and see" moments with the ternary operator code. Your brain does lesser work since doesn't need to "wait and see".

It's kind of like deciding what you're going to have for lunch. You won't waste energy thinking about what to eat if you've decided beforehand.

### Working with many branches

Ternary operators only work if you have simple `if/else` statements. What if you need more branches?

```js
let hair

if (today === 'Monday') {
  hair = 'bangs'
} else if (today === 'Tuesday') {
  hair = 'braids'
} else if (today === 'Wednesday') {
  hair = 'short hair'
} else if (today === 'Thursday') {
  hair = 'long hair'
} else if (today === 'Friday') {
  hair = 'bright pink hair'
}
```

The best way to handle many `if/else` statements (or even a `switch` statement) is to contain the `if/else` logic in a function.

Here's a start (where we simply wrap a function around the above code):

```js
function getHairType (today) {
  let hair

  if (today === 'Monday') {
    hair = 'bangs'
  } else if (today === 'Tuesday') {
    hair = 'braids'
  } else if (today === 'Wednesday') {
    hair = 'short hair'
  } else if (today === 'Thursday') {
    hair = 'long hair'
  } else if (today === 'Friday') {
    hair = 'bright pink hair'
  }

  return hair
}
```

When you call `getHairType`, you don't really care how it works. All you care about is the value you'll get back from `getHairType`. This makes it easier for you to understand how your code executes.

```js
// Using the function
const hair = getHairType('Wednesday') // short hair
```

The next step will be to improve `getHairType`. Here, you can use an **early return**.

An early return means you return a value before the function completes execution. When you do this, you don't even need to create a `hair` variable. You can return the value of `hair` directly.

```js
function getHairType (today) {
  if (today === 'Monday') return 'bangs'
  if (today === 'Tuesday') return 'braids'
  if (today === 'Wednesday') return 'short hair'
  if (today === 'Thursday') return 'long hair'
  if (today === 'Friday') return 'bright pink hair'
}
```

Much easier to read now, isn't it?

## Wrapping up

You want to avoid reassigning values to variables because:

1. You may change external state by accident when you reassign values
2. You create more complex code when you reassign values

Instead of reassigning values, try using ternary operators and early returns. They can make your code terser and easier to read.

If this lesson has helped you, might enjoy [Learn JavaScript](https://learnjavascript.today), where you'll learn how to build anything you want from scratch. Enrollment for Learn JavaScript opens in July 2018 (in three weeks!).
