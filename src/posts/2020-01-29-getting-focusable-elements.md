---
layout: post
title: Getting keyboard-focusable elements
description: How to get all keyboard-focusable elements
slug: keyboard-focusable-elements
tags:
  - javascript
newsletter: jsSnippets
---

If you create JavaScript widgets, one of the key parts to accessibility is managing focus.

To manage focus, you need to find keyboard-focusable elements.

<!-- more -->

## When you know the contents

It's easy to find keyboard-focusable elements if you know the contents of the element beforehand.

For example, I know the focusable elements in this modal are `<input>` and `<button>`.

<figure role="figure">
  <img src="/images/2020/get-focusables/modal.png" alt="Modal with two inputs and one button.">
</figure>

I can get the focusable elements with `querySelectorAll`.

```js
const focusableElements = [...modal.querySelectorAll('input, button')]
```

## When you don't know the contents

It's harder to find keyboard-focusable elements if you don't know the content beforehand.

After some research, I realised you could only focus on these elements with a keyboard:

1. `<a>`
2. `<button>`
3. `<input>`
4. `<textarea>`
5. `<select>`
6. `<details>`
7. Elements with `tabindex` set to `0`
8. Elements with `tabindex` set to a positive number

We can get all keyboard-focusable elements with the following `querySelectorAll`. It looks a little complicated, but there's no other way to include everything:

```js
const keyboardfocusableElements = document.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
)
```

Some elements (like `button`) can be disabled. Disabled elements are not focusable. We can remove these elements with `filter`.

```js
const keyboardfocusableElements = [...document.querySelectorAll(
  'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
)]
  .filter(el => !el.hasAttribute('disabled'))
```

## Turning it into a function

This `querySelectorAll` code is hard to read. We can put the entire thing into a function to make it more understandable.

```js
/**
 * Gets keyboard-focusable elements within a specified element
 * @param {HTMLElement} [element=document] element
 * @returns {Array}
 */
function getKeyboardFocusableElements (element = document) {
  return [...element.querySelectorAll(
    'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
  )]
    .filter(el => !el.hasAttribute('disabled'))
}
```
