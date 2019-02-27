---
title: How I remember CSS Grid properties
layout: post
slug: remember-css-grid-properties
tags:
 - post
 - css
 - best
newsletter: better-fed
description: I want to share how I remember the most common CSS Grid properties. This will help you use CSS Grid without googling like a maniac.
---

The syntax for CSS Grid is foreign and hard to remember. But if you can't remember CSS Grid's syntax, you won't be confident when you use CSS Grid.

To wield CSS Grid effectively, you need to remember its properties and values.

I want to share how I remember the most common CSS Grid properties today. This will help you use CSS Grid without googling like a maniac.

<!-- more -->

## Groups of properties

I remember CSS Grid according to four groups of properties:

1. The explicit grid
2. Gaps
3. Aligning things
4. The implicit grid

## The explicit grid

Let's say you want to make a grid with 4 columns and 3 rows. You say this 4 columns and 3 rows out loud. It's explicit.

If you declare the number of rows and columns in your grid, the grid is explicit.

You can use two properties to make an explicit grid:

1. `grid-template-columns`
2. `grid-template-rows`

`grid-template-columns` lets you define the number of columns.  `grid-template-rows` lets you define the number of rows.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 3em 3em 3em;
}
```

This creates a grid with four columns and three rows.

<p data-height="300" data-theme-id="7929" data-slug-hash="XPyGZp" data-default-tab="result" data-user="zellwk" data-pen-title="XPyGZp" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/XPyGZp/">XPyGZp</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

How do you know there are four columns and three rows?

`grid-template-columns` create a new column for each length value you add to it. In the `grid-template-columns` declaration above, we have four `1fr` values. This means four columns.

`grid-template-rows` work the same way. The grid above has three `3em` values, which means it has 3 rows.

`grid-template-columns` and `grid-template-rows` can also take in values like `repeat`, `autofill`, `autofit`, `minmax`. We won't go into these values in this article.

What you need to know now is you can create an explicit grid with two properties:

1. `grid-template-columns`: creates columns
2. `grid-template-rows`: creates rows

### Positioning items in your grid

You can control the position of items in a grid with two properties:

1. `grid-column`
2. `grid-row`

These two properties can only be used on a grid item.

`grid-column` lets you choose which column(s) you want to place your grid item. It is a shorthand for `grid-column-start` and `grid-column-end`.

It works this way: `grid-column-start / grid-columns-end`.

```css
/* Using the longhand */
.grid-item {
  grid-column-start: 1;
  grid-column-end: 3;
}

/* Using the shorthand */
.grid-item {
  grid-column: 1 / 3;
}
```

Note: You can also use the `span` keyword to tell CSS Grid how many columns you want your item to take up.

```css
/* Using the longhand */
.grid-item {
  grid-column-start: 1; /* Start at column one */
  grid-column-end: span 2; /* Width is two columns */
}
```

<p data-height="300" data-theme-id="7929" data-slug-hash="dqQrmm" data-default-tab="result" data-user="zellwk" data-pen-title="Explicit Grid properties" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/dqQrmm/">Explicit Grid properties</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

`grid-row` lets you choose which row(s) you want to place your grid item. It is a shorthand for `grid-row-start` and `grid-row-end`.

It works this way: `grid-row-start / grid-row-end`.

```css
/* Using the longhand */
.grid-item {
  grid-row-start: 1;
  grid-row-end: span 2;
}

/* Using the shorthand */
.grid-item {
  grid-row: 1 / span 2;
}
```

<p data-height="300" data-theme-id="7929" data-slug-hash="OoaqoG" data-default-tab="result" data-user="zellwk" data-pen-title="Positioning items (rows)" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/OoaqoG/">Positioning items (rows)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Positioning items in named areas

You can name parts of your grid if you don't like counting rows and columns. These named parts are called grid areas. To create a grid area, you use `grid-template-areas` on the grid.

Some notes on creating grid areas:

1. You must name every grid area
2. If you don't want to name an area, use `.`
3. Each group separated by inverted commas (`"row1" "row2"`) signifies a row
4. Each value within inverted commas (`"area1 area2"`) signifies an area

The example below has three grid areas:

1. `header` on the first two and takes up 4 columns
2. `main` on the second row and takes up the middle 2 columns
3. `footer` on the third row and takes up 4 columns

```css
.grid {
  grid-template-areas: "header header header header"
                      ".      main   main   .     "
                      "footer footer footer footer";
}
```

To place items in a grid area, you use the `grid-area` property on the grid item.

To place items on a grid-area, you use `grid-area`.

```css
.grid {
  display: grid;
  /* ... */
}

main {
  grid-area: main
}
```

<p data-height="300" data-theme-id="7929" data-slug-hash="PdxLyg" data-default-tab="result" data-user="zellwk" data-pen-title="Grid-template-area" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/PdxLyg/">Grid-template-area</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### How to remember these properties

You learned 6 properties so far:

1. `grid-template-columns`
2. `grid-template-rows`
3. `grid-template-areas`
4. `grid-column`
5. `grid-row`
6. `grid-area`

Some tips to remember these 6 properties:

1. The `template` keyword can only be used on the grid
	1. They're used to declare grids and named areas
	2. Properties with the `template` keyword are plural
2. Properties for grid items do not have the `template` keyword
	1. These properties are singular
	2. These properties affect positioning

## Gaps

When you create a grid, you can create spaces between columns and rows. These spaces are called gaps.

There are three properties to remember:

1. `grid-column-gap`
2. `grid-row-gap`
3. `grid-gap`

`grid-column-gap` determines the space between columns.

`grid-row-gap` determines the space between rows.

`grid-gap` is a shorthand for `grid-column-gap` and `grid-row-gap`.

For this shorthand:
1. the `row` value comes first: `row-gap column-gap`
2. If you use a single number, both values will be that number.

```css
/* Different values */
.grid {
  grid-column-gap: 1em;
  grid-row-gap: 2em;
}

.grid {
  grid-gap: 2em 1em;
}
```

```css
/* Same values */
.grid {
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}

.grid {
  grid-gap: 1em;
}
```

<p data-height="300" data-theme-id="7929" data-slug-hash="bxQZZG" data-default-tab="result" data-user="zellwk" data-pen-title="Explicit Grid with gap" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/bxQZZG/">Explicit Grid with gap</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Aligning things

This is where many people get confused.

There are six properties to align things:

1. `justify-content`
2. `align-content`
3. `justify-items`
4. `align-items`
5. `justify-self`
6. `align-self`

You can see two groups of patterns here:

- The first group is `justify` vs `align`
- The second group is `content`, `items`, and `self`

These two groups of properties tell you what you're dealing with. If you understand the property keyword, you'll know how to use them.

### Justify vs align

Each CSS Grid has two axes:

1. The inline-axis
2. The block-axis

When you `justify` something, you're changing the alignment according to the *inline-axis*. When you `align` something, you're changing the alignment according to the *block-axis*.

Here's an easy way to identify the inline and block axes:

1. Identify the direction of the language
2. Inline-axis is the way you read the language
3. Block-axis is the way you read after you read the end of the first line.

Let's take English as an example. How do you read English?

1. Left to right
2. Top to bottom

So the inline and block axis is:

1. Inline: left to right
2. Block: top to bottom

<figure><img src="/images/2018/remember-css-grid-properties/axes.png" alt="Inline-axis reads left to right. Block-axis reads top to bottom">
  <figcaption aria-hidden>Inline-axis reads left to right. Block-axis reads top to bottom</figcaption>
</figure>

Note: the inline and block axes change if you change the language direction with `writing-mode`.

### Content, items, and self

`justify-content` and `align-content` lets you align the grid itself to the available space outside of the grid. You will only need these properties if your grid is smaller than its defined area. (Which is rare).

```css
.grid {
  justify-content: /* some value */;
  align-content: /* some value */;
}
```

You can pick from seven values:

1. **start**: flush grid to the start of the axis
2. **end**: flushed grid to the end of the axis
3. **center**: align grid to the center of the axis
4. **stretch**: grid fills the axis (this is the default value)
5. **space-between**: spreads whitespace between grid items. No whitespace on at the ends
6. **space-around**: spreads whitespace around each grid item
7. **space-evenly**: spreads whitespace evenly around all grid items including the ends

<figure><img src="/images/2018/remember-css-grid-properties/alignment-values.png" alt="7 possible alignment values and what they do">
  <figcaption aria-hidden>7 possible alignment values and what they do</figcaption>
</figure>

The pictures above are taken from CSS Tricks's [A complete Guide to Grid][1]. It explains what each value does in detail. You can read it for more information.

Our focus here is remembering the properties and how to use them. Let's get back on track with the next set of properties.

`justify-items` and `align-items` lets you align grid-items to any available whitespace in their respective cells. Most of the time, when you're trying to align things, you're looking for either `justify-items` or `align-items`.

```css
.grid {
  justify-items: /* some value */;
  align-items: /* some value */;
}
```

You can pick from the same four values:

1. **start**: flush item to the start of the axis
2. **end**: flushed item to the end of the axis
3. **center**: align item to the center of the axis
4. **stretch**: fills the axis (this is the default value)

<figure><img src="/images/2018/remember-css-grid-properties/alignment-values-2.png" alt="4 possible alignment values and what they do">
  <figcaption>4 possible alignment values and what they do</figcaption>
</figure>

`justify-self` and `align-self` does the same thing as `justify-items` and `align-items`. The difference is it lets you change the alignment for only one grid-item.

```css
.grid-item {
  justify-self: /* some value */;
  align-self: /* some value */;
}
```

## Implicit Grid

Let's say you created a CSS Grid, but you don't have enough rows. In this example below, I only created an explicit grid for three items. (3 columns, 1 row)

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-row: 3em;
}
```

But I have six items!

```html
<div class="grid">
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
  <div class="grid-item"></div>
</div>
```

When you don't have enough space in your explicit grid, CSS Grid will help you create additional grids automatically. By default, it'll create more rows.

If you want to switch the grid direction, you'll set `grid-auto-flow` to `row`.

This automatically created parts are called the implicit grid.

You can adjust the automatically created column(s) or row(s) with these two properties:

1. `grid-auto-columns`
2. `grid-auto-rows`

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3em;
  grid-auto-rows: 6em;
}
```

<p data-height="300" data-theme-id="7929" data-slug-hash="yxQrJb" data-default-tab="result" data-user="zellwk" data-pen-title="Implicit grid" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/yxQrJb/">Implicit grid</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### How to remember the implicit grid

`auto` is the keyword you want to watch out for.

1. `template` creates the explicit grid
2. `auto` creates the implicit grid

I use the implicit grid a lot. I'll share how I use CSS Grid in another article.

## Wrapping up

That's almost every CSS Grid property you need to know for 80% of your grids! Here's a summary of the properties you learned:

1. Creating a grid
	1. Explicit:
		1. `grid-template-columns`
		2. `grid-template-rows`
		3. `grid-template-areas`
	2. Implicit:
		1. `grid-auto-columns`
		2. `grid-auto-rows`
2. Gaps
	1. `grid-column-gap`
	2. `grid-row-gap`
	3. `grid-gap`
3. Positioning items in a grid
	1. `grid-column`
	2. `grid-row`
4. Aligning things
	1. `justify-content`
	2. `align-content`
	3. `justify-items`
	4. `align-items`
	5. `justify-self`
	6. `align-self`

I hope this helps you remember CSS Grid! All the best!

[1]:	https://css-tricks.com/snippets/css/complete-guide-grid/ "A complete guide to grid"
