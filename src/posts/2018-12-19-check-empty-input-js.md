---
title: Checking if an input is empty with JavaScript
layout: post
slug: check-empty-input-js
newsletter: better-fed
tags:
 - css
 - javascript
description: This article shows you how to check if an input is empty with JavaScript
---

Last week, I shared how to [check if an input is empty with CSS][1]. Today, let's talk about the same thing, but with JavaScript.

It's much simpler.

Here's what we're building:

<figure><img src="/images/2018/empty-input-validation-js/check.gif" alt="When input is filled, borders should turn green"></figure>

<!-- more -->

## Events to validate the input

If you want to validate the input when a user types into the field, you can use the `input` event.

```js
const input = document.querySelector('input')
input.addEventListener('input', evt => {
  // Validate input
})
```

If you want to validate the input when a user submits a form, you can use the `submit` event. Make sure you prevent the default behavior with`preventDefault`.

If you don't prevent the default behavior, browsers will navigate the user to the URL stated in the action attribute.

```js
const form = document.querySelector('form')
form.addEventListener('submit', evt => {
  evt.preventDefault()

  // Validate input
})
```

## Validating the input

We want to know whether an input is empty. For our purpose, empty means:

1. The user hasn't typed anything into the field
2. The user has typed one or more empty spaces, but not  other characters

In JavaScript, the pass/fail conditions can be represented as:

```js
// Empty
' '
'  '
'   '

// Filled
'one-word'
'one-word '
' one-word'
' one-word '
'one phrase with whitespace'
'one phrase with whitespace '
' one phrase with whitespace'
' one phrase with whitespace '
```

Checking this is easy. We just need to use the `trim` method. `trim` removes any whitespace from the front and back of a string.

```js
const value = input.value.trim()
```

If the input is valid, you can set `data-state` to `valid`. If the input is invalid, you can set the `data-state` to `invalid`.

```js
input.addEventListener('input', evt => {
  const value = input.value.trim()

  if (value) {
    input.dataset.state = 'valid'
  } else {
    input.dataset.state = 'invalid'
  }
})
```

```css
/* Show red borders when filled, but invalid */
input[data-state="invalid"] {
  border-color: hsl(0, 76%, 50%);;
}

/* Show green borders when valid */
input[data-state="valid"] {
  border-color: hsl(120, 76%, 50%);
}
```

This isn't the end yet. We have a problem.

When a user enters text into the field, input validation begins. However, if the user removes all text from the field, the input continues to be invalid.

We don't want to invalidate the input if the user removes all text. They may need a moment to think, but the invalidated state sets off an unnecessary alarm.

<figure><img src="/images/2018/empty-input-validation-js/problem.gif" alt="Form becomes invalid when empty after user types into it"></figure>

To fix this, we can check whether the user has entered any text into the input before we `trim` it.

```js
input.addEventListener('input', evt => {
  const value = input.value

  if (!value) {
    input.dataset.state = ''
    return
  }

  const trimmed = value.trim()

  if (trimmed) {
    input.dataset.state = 'valid'
  } else {
    input.dataset.state = 'invalid'
  }
})
```

Here's a Codepen for you to play with:

<p data-height="476" data-theme-id="7929" data-slug-hash="EObQpr" data-default-tab="result" data-user="zellwk" data-pen-title="Empty validation with JavaScript" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/EObQpr/">Empty validation with JavaScript</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[1]:	/blog/check-empty-input-css "Checking if an input is empty with CSS"
