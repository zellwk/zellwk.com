---
layout: post
title: How to build a calendar with CSS Grid 
description: Building a calendar with CSS Grid is quite simple. Here's how to do it. 
slug: calendar-with-css-grid
tags:
  - css
---

Building a calendar with CSS Grid is actually quite easy. I want to show you how to do it. 

Here's what you'll create by the end of this article: 

<figure><img src="/images/2019/calendar-css-grid/calendar-fixed.png" alt="A calendar built with CSS Grid"></figure>

<!-- more -->

# Creating the HTML

You can tell from the image that the calendar contains three parts: 

1. The month indicator 
2. The weekday/weekend indicator 
3. The dates themselves

<figure><img src="/images/2019/calendar-css-grid/structure.png" alt="Structure of the calendar"></figure>

The best way to structure the HTML is to go with what feels right. We'll create the HTML according to these three sections: 

```html
<div class="calendar">
  <div class="month-indicator"> ... </div>
  <div class="day-of-week"> ... </div>
  <div class="date-grid"> ... </div>
</div>
```

You should also be able to see we need seven columns for the grid. 

<figure><img src="/images/2019/calendar-css-grid/seven-columns.png" alt="Seven columns required for the grid"></figure>

We'll focus the conversation on `.day-of-week` and `.date-grid` since we're only talking about grid. 

## Structuring the grid

There are two ways to create the CSS Grid. 

The first way is to merge elements within `.day-of-week` and `.date-grid` into one selector. If we do this, we can set the selector in `display: grid`. Here's what the HTML would have looked like if we did this: 

```html
<div class="grid">
  <!-- Day of week -->
  <div>Su</div>
  <div>Mo</div>
  <div>Tu</div>
  <div>We</div>
  <div>Th</div>
  <div>Fr</div>
  <div>Sa</div>

  <!-- Dates -->
  <button><time datetime="2019-02-01">1</time></button>
  <button><time datetime="2019-02-02">2</time></button>
  <button><time datetime="2019-02-03">3</time></button>
  <!-- ... --> 
  <button><time datetime="2019-02-28">28</time></button>
</div>
```

I discourage this method because the HTML loses its structural meaning. I prefer keeping `.day-of-week` and `.date-grid` as separate elements if possible. This makes it easy for me to read/understand the code I've written. 

Here's the HTML structure i chose to go with: 

```html
<div class="day-of-week">
  <div>Su</div>
  <div>Mo</div>
  <div>Tu</div>
  <div>We</div>
  <div>Th</div>
  <div>Fr</div>
  <div>Sa</div>
</div>

<div class="date-grid">
  <button><time datetime="2019-02-01">1</time></button>
  <button><time datetime="2019-02-02">2</time></button>
  <button><time datetime="2019-02-03">3</time></button>
  <!-- ... --> 
  <button><time datetime="2019-02-28">28</time></button>
</div>
```

The best way to create a CSS Grid with the structure I proposed is to use subgrid. Unfortunately, most browsers don't support subgrid yet. In the meantime, the best way is to create two separate grids—one for `.day-of-week` and one for `.date-grid`. 

Both `.day-of-week` and `.date-grid` can use the same seven-column grid. 

```css
/* The grid */
.day-of-week,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
```

<figure><img src="/images/2019/calendar-css-grid/calendar-grid.png" alt="1 Feb 2019 begins on a Friday"></figure>

## Pushing the dates

February 2019 begins on a Friday. If we want the calendar to be correct, we need to make sure: 

1. 1 Feb 2019 falls on Friday 
2. 2 Feb 2019 falls on Saturday 
3. 3 Feb 2019 falls on Sunday 
4. And so on...

With CSS Grid, this part is easy. 

CSS Grid has placement algorithm that kinda follows the following rules (if you didn't set `grid-auto-flow` to `dense`): 

1. Place items that have explicit `grid-column` or `grid-row` first
2. Fill in the rest according to the last-placed item 

What this means is: 

1. If the first item falls on column 6 
2. The second item will be placed in column 7. 
3. The third item will be placed on the next row, in column 1 (because there are only seven columns). 
4. The fourth item will be placed in column 2, 
5. And so on...

So, if we position 1 February on the sixth column (friday), the rest of the dates will be placed correctly. 

Simple as that!

```css
 /* Positioning the first day on a Friday */
.date-grid button:first-child {
  grid-column: 6;
}
```

<figure><img src="/images/2019/calendar-css-grid/calendar-fixed.png" alt="1 Feb 2019 begins on a Friday"></figure>

Here's a codepen for you to play with: 

<p class="codepen" data-height="581" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="xNpKwp" style="height: 581px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Building a Calendar with CSS Grid">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/xNpKwp/">
  Building a Calendar with CSS Grid</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Want to learn more?

This article contains one fraction of a component (a datepicker) from Learn JavaScript. There's so much more I want to show you. (But they're mostly JavaScript related topics).

For example, in Learn JavaScript, I show you how to: 

1. Build a calendar for any month (and any year) 
2. Add a previous/next button to switch between months 
3. Click on each date to display a date

Here's what it looks like: 

<figure><img src="/images/2019/calendar-css-grid/datepicker.gif" alt="Example of the datepicker in action"></figure>

If you want to learn to build this datepicker, I highly recommend joining [Learn JavaScript][1] when enrolment opens in July 2019. I'm excited to share it with you! 

[1]:	https://learnjavascript.today "Learn JavaScript"
