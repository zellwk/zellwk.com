---
layout: post
title: Bounding Box Helper
description: A helper for getting horizontal and vertical centers of an element
slug: bounding-box-helper
tags:
  - javascript
newsletter: jsSnippets
---

I often find myself needing to calculate the horizontal center and vertical center of an element.

One example is a popover.

<video autoplay loop>
  <source src="/images/2020/bounding-box-helper/popover.mp4" type="video/mp4">
  Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/bounding-box-helper/popover.mp4"> here </a> instead.
</video>

To position the popover perfectly, I need to know the horizontal and vertical centers of the button that triggers the popover. Here's one example of a calculation I had to make.

<figure role="figure">
  <img src="/images/2020/bounding-box-helper/popover-calc.jpg" alt="One of the popover calculations.">
</figure>

<!-- more -->

Another example: When I built this spinning pacman, I need to get the center of the pacman to calculate the angle of rotation.

<video autoplay loop>
  <source src="/images/2020/bounding-box-helper/spinning-pacman.mp4" type="video/mp4">
  Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/bounding-box-helper/spinning-pacman.mp4"> here </a> instead.
</video>

<figure role="figure">
  <img src="/images/2020/bounding-box-helper/spinning-pacman-calc.png" alt="Need the center to calculate the angel.">
</figure>

:::note
I taught people how to build these two things step-by-step in [Learn JavaScript][1]. You may find it helpful if you want to learn to build things from scratch.
:::

## Getting the horizontal and vertical centers

It's easy to get both the horizontal and vertical centers.

First, we use `getBoundingClientRect` to get information about the bounding box.

- To get the horizontal center (which I call `xCenter`), we use the average of the `left` and `right` values from this bounding box.
- To get the vertical center (which I call `yCenter`), we use the average of the `top` and `bottom` values of the bounding box.

```js
const box = element.getBoundingClientRect()
const xCenter = (box.left + box.right) / 2
const yCenter = (box.top + box.bottom) / 2
```

## Function to simplify everything

I made a function to streamline this calculation. I call it `getBoundingBox`. It returns all values `getBoundingClientRect` plus `xCenter` and `yCenter`.

The function look like this:

```js
function getBoundingBox (element) {
  const box = element.getBoundingClientRect()
  const ret = { }

  // Loops through all DomRect properties.
  // Cannot spread because they're not enumerable.
  for (const prop in box) {
    ret[prop] = box[prop]
  }

  ret.xCenter = (box.left + box.right) / 2
  ret.yCenter = (box.top + box.bottom) / 2

  return ret
}
```

Using it:

```js
const box = getBoundingBox(element)
const { xCenter, yCenter } = box
```

[1]:	https://learnjavascript.today