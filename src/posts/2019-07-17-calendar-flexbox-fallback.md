---
layout: post
title: How to add Flexbox fallback to CSS Grid
description: How to add a flexbox fallback to a calendar built with CSS Grid
slug: calendar-flexbox-fallback
tags:
  - css
---

I shared how to build a calendar with CSS Grid in the [previous article][1]. Today, I want to share how to build a Flexbox fallback for the same calendar.

<!-- more -->

## How to provide support

Generally, there are three ways to provide support when it comes to CSS.

**First method:** Write fallback code. Overwrite fallback code.

```css
.selector {
  property: fallback-value;
  property: actual-value;
}
```

**Second method:** Write fallback code. Overwrite fallback code in CSS Feature Queries (`@supports`). Reset properties inside `@supports` if you need.

```css
.selector {
  property: fallback-value;
}

@supports (display: grid) {
  property: actual-value;
}
```

**Third method:** Write everything in `@supports`.

```css
@supports not (display: grid) {
  .selector {
    property: fallback-value;
  }
}

@supports (display: grid) {
  .selector {
    property: actual-value;
  }
}
```

These three methods are listed in order of decreasing-complexity. (If you need to overwrite code, it's more complicated). This means writing everything in `@supports` is the simplest of the three.

How you choose to support your project depends on browser support for:

1. The feature
2. The fallback feature
3. Support for Feature Queries

## Checking for support

The best place to check for support is [caniuse][2]. Here, I see that support for CSS Grid is decent. Browsers I have to worry about are:

1. Opera Mini: 1.42% global usage
2. Android Browsers 2.1 to 4.4.4: 0.67% global usage
3. Blackberry browser: 0.02% global usage (Not gonna worry about this one).

<figure><img src="/images/2019/calendar-flexbox/css-grid-support.png" alt=""></figure>

Support for the fallback (Flexbox) is also good.

But we have a problem: Flexbox fallback wouldn't work for Android 2.1 to 4.3 (it doesn't support wrapping). Global usage for Android 2.1 to 4.3 is 0.37%.

Here, I have to decide:

1. Is providing Flexbox fallback for Opera Mini (1.42%), Android 4.4.4 (0.3%), and Blackberry (0.02%) worth the effort?
2. Should I change fallback from Flexbox to an older feature to support Android 2.1 to 4.3 (another 0.37%)?

<figure><img src="/images/2019/calendar-flexbox/flexbox-support.png" alt=""></figure>

Let's assume, for this project, I decide that Flexbox fallback is sufficient. I'm not going to worry about Android 2.1 to 4.3.

Next, I want to check whether browsers support CSS Feature Queries.

Here, I see:

1. Opera Mini supports Feature Queries
2. Android 4.4.4 supports Feature Queries
3. Blackberry browser doesn't support Feature Queries
4. IE 11 does't support Feature Queries

<figure><img src="/images/2019/calendar-flexbox/feature-queries-support" alt=""></figure>

## Deciding how to write fallback code

Earlier, I mentioned there are three ways to write fallback code for CSS:

1. Write fallback code. Overwrite fallback code.
2. Write fallback code. Overwrite fallback code in `@supports`.
3. Write everything in `@supports`.

If I write everything inside `@supports`, I can provide support for:

1. Opera Mini (1.43%)
2. Android 4.4.4 (0.3%)

But I lose support for:

1. IE 11 (2.3%)
2. Blackberry (0.02%)

I do not want to forsake the 2.3% of IE users, which means Method 3 (write everything in `@supports`) is out.

If I use Method 2 (Write fallback code. Overwrite fallback code in `@supports`), I can provide support for:

1. IE 11 (2.3%)
2. Opera Mini (1.43%)
3. Android 4.4.4 (0.3%)
4. Blackberry browser (0.02%)

That's everything I need. That's why I'm gonna go with Method 2.

Note: If you want to code along, you can use [demo][3] from [my previous article][4] as the starting point.

## Disabling Grid code

First, we park the CSS Grid code under `@supports` (like we discussed above).

```css
@supports (display: grid) {
  .day-of-week,
  .date-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .date-grid button:first-child {
    grid-column: 6;
  }
}
```

We can disable the CSS Grid code by setting `display` to an invalid value (not `grid`). This disables the entire block of code.

(Thank Rachel Andrew for this neat trick. I believe I learned it from her 😄).

```css
@supports (display: gridx) {
  /*...*/
}
```

<figure><img src="/images/2019/calendar-flexbox/inital-layout.png" alt="Initial layout."></figure>

## Writing Flexbox code

We need to build the same seven-column grid with Flexbox. The first thing we need to do is acknowledge that Flexbox and Grid work differently. We won't be able to get a perfect replica, but we can get close.

The first thing is set `display` to `flex`.

```css
.day-of-week,
.date-grid {
  display: flex;
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-1.png" alt="Results after setting display to flex."></figure>

We need the buttons in `.date-grid` to wrap, so we set `flex-wrap` to `wrap`.

```css
.date-grid {
  flex-wrap: wrap;
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-2.png" alt="Buttons in date grid wrapped at the edges."></figure>

We need to replicate the seven-column grid. An easy way to do this is calculate the width of the grid according to the width of each button. Here, I have already set each button to 4.5ch. This means the width of the grid should be `7 x 4.5ch`.

(We can use CSS Calc to do the math for us).

```css
.day-of-week,
.date-grid {
  max-width: calc(4.5ch * 7);
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-3.png" alt="Wrapping at 7 columns"></figure>

We need the elements in `.day-of-week` to spread out across the available width. One simple way is to set `justify-content` to `space-between`.

```css
.day-of-week {
  justify-content: space-between;
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-4.png" alt="After setting space-between."></figure>

Here, we can see that elements in `.day-of-week` extend past the grid. This extension happens because we let Flexbox calculate `flex-basis` for us. If we want every element in `.day-of-week` to be have the same width, we need to set `flex-basis` ourselves.

In this case, the easiest way is to set `flex-basis` to the width of one grid item (or `4.5ch`). Note: I adjusted `font-size` of each item in `.day-of-week` to `0.7em` (for visual aesthetics). We have to account for this change.

```css
.day-of-week > * {
  flex-basis: calc(4.5ch / 0.7);
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-5.png" alt="Adjusted .day-of-week for size."></figure>

Finally, we need to push the 1 February to Friday. (Five columns). Since column is `4.5ch`, we simply push it by `4.5ch x 5`.

(Again, we can use CSS Calc to help us with this).

```css
.date-grid button:first-child {
  margin-left: calc(4.5ch * 5)
}
```

<figure><img src="/images/2019/calendar-flexbox/flexbox-6.png" alt="Pushed 1 Febuary to Friday"></figure>

## Fixing the CSS Grid version

We can reactivate the CSS Grid code and make any necessary changes now.

```css
@supports(display: grid) {
  /* ... */
}
```

<figure><img src="/images/2019/calendar-flexbox/grid-fix-1.png" alt="Activating CSS Grid code"></figure>

Here, we see some values fly far out to the right. This happens because we added `margin-left` to the first grid item. We need to reset the added margin.

```css
@supports(display: grid) {
  /* ... */
  .date-grid button:first-child {
    grid-column: 6;
    margin-left: 0;
  }
}
```

<figure><img src="/images/2019/calendar-flexbox/grid-fix-2.png" alt="Removed margin-left."></figure>

Another thing: We can remove `max-width` because we don't need it in the CSS Code. (Even though this doesn't affect the CSS Code, we still want to remove it. Always better to have less properties).

```css
@supports(display: grid) {
  .day-of-week,
  .date-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    max-width: initial;
  }

  /* ... */
}
```

Here's the visual difference between the Flexbox and CSS Grid versions. Not too bad!

<figure><img src="/images/2019/calendar-flexbox/difference.gif" alt="Visual difference between the Flexbox and CSS Grid code"></figure>

## One fun thing

CSS Grid is cool because it follows writing direction. We can easily change the flow from left-to-right to right-to-left.

Note: I don't know if calendars are read from right to left in rtl languages. I just thought it'll fun to mention this 😜).

<figure><img src="/images/2019/calendar-flexbox/rtl.gif" alt="Switching between ltr and rtl."></figure>

Our code for CSS Grid supports this behaviour naturally. If you want to support the same behaviour with Flexbox, you need to use [CSS Logical Properties][5].

<figure><img src="/images/2019/calendar-flexbox/css-logical-properties-support.png" alt="Support for CSS Logical Properties."></figure>

Since support for CSS Logical Properties is not-so-great, we need to provide fallback for it. (Best way is to through Method 1: Write fallback; overwrite fallback).

```css
.date-grid button:first-child {
  margin-left: calc(4.5ch * 5);
  margin-inline-start: calc(4.5ch * 5);
}


@supports(display: grid) {
  /* ... */
 .date-grid button:first-child {
    grid-column: 6;
    margin-left: 0;
    margin-inline-start: 0;
  }
}
```

That's it! Here's a Codepen for the final code:

<p class="codepen" data-height="581" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="ZNrezV" style="height: 581px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Building a Calendar with CSS Grid (and fallback with Flexbox)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/ZNrezV/">
  Building a Calendar with CSS Grid (and fallback with Flexbox)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[1]:	/blog/calendar-with-css-grid
[2]:	https://caniuse.com "Can I use"
[3]:	https://codepen.io/zellwk/pen/xNpKwp "Codepen: Building a Calendar with CSS Grid"
[4]:	/blog/calendar-with-css-grid
[5]:	https://css-tricks.com/css-logical-properties/ "CSS Logical Properties"
