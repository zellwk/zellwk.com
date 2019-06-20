---
title: Creating a simple form with CSS Grid
layout: post
slug: simple-form-with-css-grid
tags:
 - css
newsletter: better-fed
description: CSS Grid can help you create a simple form that contains an email and a submit button easily. I'll show you how in this article.
---

You learned to create a simple form with Flexbox in the [previous article][1]. Today, you'll understand how to create the same thing with CSS Grid.

Here's what we're building:

<figure><img src="/images/2018/simple-form-css-grid/form.png" alt="The simple form we're building consists of one email input and one submit button">
</figure>

<!-- more -->

<div class="jsCkClone" data-should-not-clone></div>

## Building the form with CSS Grid

From the picture above, we know the form contains two elements:

1. An email field
2. A submit button

Here's the HTML:

```html
<form>
  <input type="email" name="email">
  <button type="submit">Send</button>
</form>
```

To build the form with CSS Grid, you need to set the parent's `display` property to `grid`.

```css
form {
  display: grid;
}
```

Here’s what you get:

<figure><img src="/images/2018/simple-form-css-grid/grid1.png" alt="Two rows of elements. The first row is the email input. The second row is the submit button">
</figure>

Why did we get two rows?

We get two rows because we did not specify the number of columns for the grid. Browsers will always default to one column.

For this form, we need to set two columns.

1. The first column should expand to fill up any available space
2. The second column should be sized according to its contents

For the first column, we can use the `fr` unit. For the second column, we can use `auto`.

```css
form {
  display: grid;
  grid-template-columns: 1fr auto;
}
```

With this, you have completed form's layout. Here's a Codepen for you to play:

<p data-height="300" data-theme-id="7929" data-slug-hash="qMLErJ" data-default-tab="result" data-user="zellwk" data-pen-title="Simple form with CSS Grid" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/qMLErJ/">Simple form with CSS Grid</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## When elements are of unequal height...

We will simulate elements of unequal height by substituting the `button`'s text with an SVG. [This is the same as what we've done in the previous article][2].

```html
<form action="#">
  <input type="email" placeholder="Enter your email">
  <button type="button"><svg> <!-- a smiley icon --> </svg></button>
</form>
```

<figure><img src="/images/2018/simple-form-css-grid/smiley.png" alt="Adding a smiley icon as the to the submit button">
  <figcaption aria-hidden>Adding a smiley icon as the to the submit button</figcaption>
</figure>

Notice the `input`'s height increases to fit the large SVG icon too! Once again, we don't have to write any extra code. This happens because grid items are stretched vertically to fill up any available space.

If you want to change this behavior, you can change the `align-items` property to either `start`, `end`, or `center`.

<figure><img src="/images/2018/simple-form-css-grid/align-items.png" alt="Items can be aligned differently if you set `align-items` to a different value">
  <figcaption aria-hidden>Items can be aligned differently if you set `align-items` to a different value</figcaption>
</figure>

Here's a Codepen for you to play:

<p data-height="300" data-theme-id="7929" data-slug-hash="jvXEzm" data-default-tab="result" data-user="zellwk" data-pen-title="Simple form with CSS Grid (with SVG Button)" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/jvXEzm/">Simple form with CSS Grid (with SVG Button)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Wrapping up

CSS Grid makes it easy to create layouts. It doesn't have to be used for macro layout. It can also be used for micro layouts like the form example you've seen here.

Have fun with CSS Grid!

[1]:	/blog/simple-form-with-flexbox "Creating a simple form with Flexbox"
[2]:	/blog/simple-form-with-flexbox "Building a simple form with Flexbox"
