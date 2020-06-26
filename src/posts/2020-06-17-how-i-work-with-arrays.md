---
layout: post
title: How I work with arrays
description: "There are many ways to work with arrays in JavaScript. In this article, I explain how I work with them."
slug: how-i-work-with-arrays
tags:
  - javascript
---

There are many flavours to arrays in JavaScript. The possible methods you to create or change arrays are: `unshift`, `shift`, `push`, `pop`, `splice`, `concat`, `slice`, *destructuring*, *rest operators*, and *spread operators*.

There are also looping methods like `for`, `forEach`, `map`, `filter`, `reduce`, `find`, `findIndex`.

17 different flavours! 😱.

I want to document how I choose the array methods I use. This should help you understand how to pick methods.

<!-- more -->

## On Mutation

**Never mutate arrays**. [It can break your code when you're unaware][1]. And these kinds of bugs are hard to find.

If you need to mutate arrays, always use `slice` to make a copy before you mutate them.

```js
const array = [1, 2, 3]
const copy = array.slice()

// Use these methods only after you slice
copy.push(4)
copy.pop()
copy.unshift(0)
copy.shift()
copy.splice(0, 0, 0)
```

## Adding items to arrays

We can add items in three ways:

1. Start of an array
2. End of an array
3. Middle of an array

### Adding items to start

When I add items to the start of an array, I prefer creating a new array with *spread operators*. This is the cleanest method.

```js
const array = [3, 4, 5]
const after = [1, 2, ...array]

console.log(after) // [1, 2, 3, 4, 5]
```

### Adding items to end

When adding items to the end of an array, I also prefer creating a new array with *spread operators*.

```js
const array = [3, 4, 5]
const after = [...array, 6, 7]

console.log(after) // [3, 4, 5, 6, 7]
```

### Adding to the middle

I prefer `splice` when adding items to the middle of an array. I do this because using `slice` alone feels more clunky.

For example, let's say I have an array of 25 kinds of fruit. I want to add `Orange` after `Pear`. But I don't know where `Pear` is. I have to find `Pear` first with `indexOf`.

```js
const index = fruits.indexOf('Pear')
```

Now, I can add `Orange` after `Pear`. Compare the difference between `slice` and `splice`.

```js
// Using Slice
const result = [
  ...fruits.slice(0, index)
  'Orange',
  ...fruits.slice(index + 1)
]
```

```js
// Using Splice
const result = fruits.slice()
result.splice(index + 1, 0, 'Orange')
```

`splice` is much easier to read compared to the `slice`-only alternative. It takes a while to get used to `splice` though. (Apparently, liking `splice` [is weird][2]).

## Removing items from arrays

We can remove items from arrays in three ways:

1. From the start of an array
2. From the end of an array
3. From the middle of an array

### Removing items from the start

When I remove items from the start of an array, I prefer to destructure the array. This is cleaner than `unshift` or `splice`.

```js
const array = [1, 2, 3]
const [throwaway, ...result] = array

console.log(result) // [2, 3]
```

### Removing items from the end

When I remove items from the end of an array, I prefer using `slice`. Here, I can use negative indexes instead of `array.length`. This makes things much simpler.

```js
const array = [1, 2, 3]
const result = array.slice(0, -2)

console.log(result) // [1]
```

If I need to remove only 1 or 2 items, then I consider `pop`. This is friendlier for beginners to read.

```js
const array = [1, 2, 3]
const result = array.slice()
result.pop()

console.log(result) // [1, 2]
```

### Removing items from the middle

I prefer `splice` over other methods as I described in [adding items to the middle][3].

```js
// Using Slice
const result = [
  ...fruits.slice(0, index)
  ...fruits.slice(index + 1)
]
```

```js
// Using Splice
const result = fruits.slice()
result.splice(index, 1)
```

## Looping through arrays

When I loop through arrays, I prefer to use `map` and `filter` as much as possible. If they can do the job, great!

```js
// Map
const array = [1, 2, 3]
const doubled = array.map(x => x * 2)

console.log(doubled) // [2, 4, 6]
```

```js
// Filter
const array = [1, 5, 10]
const below6 = array.filter(x => x < 6)

console.log(below6) // [1, 5]
```

I never `reduce` if I can `map` + `filter` because `map` + `filter` is easier to read. I only use `reduce` when I have to convert the array into a primitive value (usually only with numbers).

```js
// Reducing an array of numbers
const array = [1, 2, 3]
const sum = array.reduce((sum, current) => sum + current, 0)

console.log(sum) // 6
```

If I need to turn arrays into objects, I prefer using a `forEach` loop.

```js
const fruits = ['apple', 'apple', 'pear']

// With forEach
const tally = {}
fruits.forEach(fruit => {
  if (tally[fruit]) {
    tally[fruit] += 1
    return
  }
  tally[fruit] = 1
})

console.log(tally)
// {
//   apple: 2,
//   pear : 1
// }
```

```js
// with Reduce
const tally = fruits.reduce((tally, fruit) => {
  if (tally[fruit]) {
    tally[fruit] += 1
  } else {
    tally[fruit] = 1
  }
  return tally
}, {})

console.log(tally)
// {
//   apple: 2,
//   pear : 1
// }
```

If I need to execute something (like change classes), I prefer `forEach`. I can also use `for...of`, but I like `forEach` more.

```js
const nodes = document.querySelectorAll('.hey')

// With forEach
[...nodes].forEach(node => {
  node.classList.remove('hey')
})

// With for...of
for (const node of nodes) {
  node.classList.remove('hey')
}
```

When I read `forEach`, my mind goes like this:

1. Nodes array.
2. Loop through the nodes array.
3. Do something with each node.

When I see `for...of`, my mind goes like this:

1. For loop. Okay.
2. Created a variable called `node`.
3. Looping through `nodes`
4. Do something with `node`

`for...of` just doesn't flow as smoothly as `forEach`.

## Asynchronous loops

If I can batch asynchronous takes together, I'll use `map` then `Promise.all`.

```js
const array = ['url1', 'url2']
const promises = array.map(url => fetch(url).then(/*...*/))
const results = Promise.all(promises)

console.log(results)
// [
//   [results from url1], [results from url2]
// ]
```

If I use the `await` keyword, I prefer `for...of`. [I explained why in this article][4].

```js
async function execute () {
  for (const link of links) {
    await fetch(link).then()
    // Do something...
  }
}
```

That's it! I hope this clears things up!

[1]:	https://alistapart.com/article/why-mutation-can-be-scary/ "why mutation can be scary"
[2]:	https://twitter.com/zellwk/status/1228798747653443584?s=20 "Liking splice is weird"
[3]:	#adding-items-to-the-middle
[4]:	/blog/async-await-in-loops/ "JavaScript async and await in loops"
