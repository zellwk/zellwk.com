---
layout: post
title: Getting CSS Translate values with JavaScript
description: "You can get CSS translate values in JavaScript by parsing 2d and 3d matrices. Here's how to do it, and what you should watch out for"
slug: css-translate-values-in-javascript
tags:
  - css
  - javascript
newsletter: jsSnippets
---

How do you get a `translateX`, `translateY` or `translateZ` value in JavaScript?

Turns out, you need to read transform matrices. But it can be quite easy.

<!-- more -->

## Matrices

Browsers turn `transform` values into `2d` or `3d` matrices depending on what transformations you applied.

- Browsers create `3d` matrices if you apply 3d transforms (X, Y, Z axes).
- Browsers create `2d` matrices if you apply 2d transforms (X, Y axes only).

We can get the matrix via JavaScript with `getComputedStyle`.

```js
const style = window.getComputedStyle(element)
const matrix = style.transform || style.webkitTransform || style.mozTransform
```

Let's have a look at some examples:

```css
.two-d {
  transform: translateX(10px) translateY(20px);
}
```

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/two-d.png" alt="2d transformation matrix">
</figure>

```css
.three-d {
  transform: translateX(10px) translateY(20px) translateZ(30px);
}
```

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/three-d.png" alt="3d transformation matrix">
</figure>

## 2d vs 3d matrices

Pay attention to the matrix values above. You may notice this:

### 2d Matrix

A 2d matrix has `6` values.

1. 5th value is `translateX`
2. 6th value is `translateY`

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/two-d.png" alt="2d transformation matrix">
</figure>

### 3d Matrix

A 3d matrix has `16` values.

1. 13th value is `translateX`
2. 14th value is `translateY`
3. 15th value is `translateZ`

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/three-d.png" alt="3d transformation matrix">
</figure>

## Getting the translate values

Once we know the pattern, extracting the values is easy. First, we need to know which matrix we're dealing with.

```js
const style = window.getComputedStyle(element)
const matrix = style.transform || style.webkitTransform || style.mozTransform

// Can either be 2d or 3d transform
const matrixType = matrix.includes('3d') ? '3d' : '2d'
```

If the Matrix is `2d`, we can get values `translateX` and `translateY` values like this:

```js
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
if (matrixType === '2d') {
  const x = matrixValues[4]
  const y = matrixValues[5]
}
```

If the Matrix is `3d`, we can get values `translateX`, `translateY`, and `translateZ` values like this:

```js
const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
if (matrixType === '3d') {
  const x = matrixValues[12]
  const y = matrixValues[13]
  const z = matrixValues[14]
}
```

I packed this up into a nice function for us to use.

```js
/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getTranslateValues (element) {
  const style = window.getComputedStyle(element)
  const matrix = style.transform || style.webkitTransform || style.mozTransform

  // No transform property. Simply return 0 values.
  if (matrix === 'none') {
    return {
      x: 0,
      y: 0,
      z: 0
    }
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes('3d') ? '3d' : '2d'
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === '2d') {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0
    }
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === '3d') {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14]
    }
  }
}
```

Using it:

```js
const {x, y, z} = getTranslateValues(element)
```

💥.

## Simple transforms only

`getTranslateValues` works only if `translate` is declared before other transforms. This is because transform values stack onto each other.

Let's explain this with a 2d matrix example.

Let's say you have this element.

```css
.element {
  transform: translateX(10px) translateY(20px);
}
```

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/two-d.png" alt="2d transformation matrix">
</figure>

You already know these:

- 5th number is `10` which is the same value as `translateX`
- 6th number is `20`, which is the same value as `translateY`

Now let's add a `rotate` transformation behind `translateX` and `translateY`.

```css
.element {
  transform: translateX(10px) translateY(20px) rotate(10deg);
}
```

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/translate-rotate.png" alt="Translate then rotate.">
</figure>

There's no difference in the 5th and 6th values:

- 5th number is `10` which is the same value as `translateX`
- 6th number is `20`, which is the same value as `translateY`

But watch what happens if you `rotate` first.

```css
.element {
  transform: rotate(10deg) translateX(10px) translateY(20px);
}
```

<figure role="figure">
  <img src="/images/2020/translate-in-javascript/rotate-translate.png" alt="Rotate then translate.">
</figure>

- 5th number is `6.37511` which is the NOT what we wrote for `translateX`
- 6th number is `21.4326`, which is the NOT what we wrote for `translateY`

Just take note of this!

## Getting other transform values in JavaScript

I haven't had the chance to deal with `scale`, `skew`, and `rotate` yet, but I was curious. So I googled and found some answers:

- `rotate` on [on CSS Tricks][1]
- `scale` on [Michael Le's blog][2]
- both `rotate` + `skew` on this [Stack overflow answer][3]

I believe the calculations work with individual transforms. I'm not so sure they work if transformations are stacked on top of each other. (For example, `skew -> rotate` gives a very different value compared to `rotate -> skew`).

Keep it simple, I guess!

## Useful JavaScript Snippets repository

I added this code to a Github repository that contains JavaScript snippets I found useful. You may be interested in [checking it out][4].

[1]:	https://css-tricks.com/get-value-of-css-rotation-through-javascript/ "Get Value of CSS Rotation through JavaScript"
[2]:	https://www.michael1e.com/get-scale-value-css-javascript/ "Get Scale Value of CSS Transformation through Javascript"
[3]:	https://stackoverflow.com/questions/5107134/find-the-rotation-and-skew-of-a-matrix-transformation "Find the Rotation and Skew of a Matrix transformation"
[4]:	https://github.com/zellwk/useful-js-snippets "Useful JavaScript snippets"