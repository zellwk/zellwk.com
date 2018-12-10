---
title: Advanced Usage with Typi
layout: post
slug: advanced-typi
tags:
 - typography
 - responsive
 - typi
newsletter: mrt-simplicity
---

Last week, I wrote a tutorial to show you how to use the mixins and functions of Typi, a library I’ve created for responsive typography. There’s a lot more to Typi that I can cover in one article. So, this week, I’m going to show you some advanced tips that I use with Typi so you can use them as well.

<!--more-->

You’ll learn:

- How to output `em` media queries with Typi
- How to use Typi with the Modular Scale library
- How to combine Modular Scale and Vertical Rhythm with Typi.

Sounds exciting, doesn’t it?

Before moving on, make sure you already know [how to use the basic mixins and functions](/blog/typi) that Typi provides. Nothing is going to make sense without the foundations.

Let’s begin.

## EM Media Queries with Typi

In the [previous article](/blog/typi), I showed you how to create multiple media queries with Typi just by using the `$breakpoints` and `$typi` maps. Although that’s neat, we have a problem. The media queries created by Typi are written in pixels. It’s a practice that web professionals frown upon :(

Instead of pixels, we should use the `em` unit for media queries. I’ve went deep down the rabbit hole and found that `em` media queries work the best across all browsers. You can read more about my tests in [this article](/blog/media-query-units/).

Moving on, there are two ways to make Typi create `em` media queries. The first way is to write your `$breakpoints` map with `em` units:

```scss
$breakpoints: (
  small: 25em, // 400px
  large: 50em // 800px
);
```

The CSS Typi creates is (Note the media queries):

```css
html {
  font-size: 100%;
  line-height: 1.4;
}
@media all and (min-width: 25em) {
  html { font-size: 112.5%; }
}

@media all and (min-width: 50em) {
  html {font-size: 125%; }
}
```

We have `em` media queries now. The reason why this method works is because Typi outputs any value you provide to the `$breakpoints` map.

Although it works, the method isn't elegant. You have to calculate the `em` values yourself. It's a big headache for us developers who like to do as little work as possible.

There’s an alternative (much better way) to tell Typi to create `em` media queries. That is to use libraries that output media queries in `em` with Typi. Examples of these libraries include [Mappy Breakpoint](https://github.com/zellwk/mappy-breakpoints) and [Breakpoint](http://breakpoint-sass.com).

Typi supports both libraries out of the box. Let me show you how to use them.

First of all, choose a library you're comfortable with. Here are the installation instructions:

**Mappy Breakpoints:**

- `bower`: `bower install mappy-breakpoints --save`
- `npm`: `npm install mappy-breakpoints --save`

**Breakpoint:**

- `bower`: `bower install breakpoint-sass --save`
- `npm`: `npm install breakpoint-sass --save`

After installing the library, make sure you `@import` them before importing Typi:

```scss
// Choose either one. Make sure it comes before Typi
@import 'path-to-mappy-breakpoints/mappy-breakpoints';
@import 'path-to-breakpoints/stylesheets/breakpoint';

// Import Typi
@import 'path-to-typi/scss/typi';
```

The next step is to tell Typi to use either Mappy Breakpoint or Breakpoint by setting the `$typi-breakpoint` setting.

```scss
// If you use mappy-breakpoint
$typi-breakpoint: mappy-breakpoint;

// If you use breakpoint
$typi-breakpoint: breakpoint;
```

Once you’re done with these steps, go ahead and try compiling your Sass files. You see that pixel values within the `$breakpoints` map are converted into em values with both libraries.

```scss
html {
  font-size: 100%;
  line-height: 1.4;
}
@media all and (min-width: 25em) {
  html { font-size: 112.5%; }
}

@media all and (min-width: 50em) {
  html {font-size: 125%; }
}
```

Sweet, isn't it? :)

I highly recommend this alternative method because you can take advantage of both Mappy Breakpoints and Breakpoint to create more complex queries.

Let's run through an example.

Say you want to create a `min-width` and `max-width` query. Both Mappy Breakpoints and Breakpoint allow you to create such a query by writing two widths, like this:

```scss
// Mappy Breakpoint
@include mappy-bp(400px 800px) { //... }

// Breakpoint
@include breakpoint(400px 800px) { //... }
```

We can take this syntax and put it straight into the `$breakpoints` map:

```scss
$breakpoints: (
  small: 400px 800px
);
```

Then, both Mappy Breakpoints and Breakpoint will convert the small query into a query that contains `(min-width: 400px)` and `(max-width: 800px)`.

The only difference is that Mappy Breakpoints subtracts 1px from the `max-width` query (`(max-width: 799px)`) to ensure that you don't run into a case where some styles get overlapped at 800px.

```css
/* Output from Mappy Breakpoints */
@media all and (min-width: 25em) and (max-width: 49.9375em) {
  html {font-size: 112.5%; }
}

/* Output from Breakpoint */
@media (min-width: 25em) and (max-width: 50em) {
  html {font-size: 112.5%; }
}
```

Neat eh? :)

The syntax for Mappy Breakpoint and Breakpoint differ, so if you want to create any other complex query, you'll have to check out their respective documentations.

How about another example?

Let's say you want to make a `min-width` and `min-height` query this time. This pattern is quite important when working with responsive typography.

In Mappy Breakpoints, you specify a `height` keyword, followed by the min-height you want:

```scss
$breakpoints: (
  small: 400px height 400px
);
```

In Breakpoint, you need to create a list with `()` and specify the query you want:

```scss
$breakpoints: (
  small: 400px (min-height 400px)
);
```

In both cases, you'll get the same output:

```css
@media all and (min-width: 25em) and (min-width: 25em) {
  html {font-size: 112.5%; }
}
```

I’m going to leave you here to experiment with other queries yourself. Be sure to check out the documentations ([Mappy Breakpoints](https://github.com/zellwk/mappy-breakpoints), [Breakpoint](https://github.com/at-import/breakpoint/wiki)) if you get stuck!

Let’s move on to the next tip.

## Using Typi with Modular Scale

One best practice in web typography is to use modular scale to choose the `font-size` of your text elements.

When modular scale is concerned, it’s quite common to see people either use the [modular scale calculator](http://modularscale.com) or manually calculate `font-size`s by multiplying their bases with ratios over and over.

No matter which of the above methods you choose, you still have to input the values manually after getting the right sizes, like this:

```css
h1 { font-size: 3.157em; }
h2 { font-size: 2.369em; }
```

If you choose to change your `font-size` at different media queries, then, this is what you’ll do:

```css
h1 { font-size: 3.157em; }
h2 { font-size: 2.369em; }

@media all and (min-width: 25em) {
  h1 { font-size: 4.209em; }
  h2 { font-size: 3.157em; }
}
```

In Typi, we can create these CSS by using a font-map. (Yep, Typi font maps can take in `em` units as well):

```scss
$h1-map: (
  null: 3.157em,
  small: 4.209em
);

$h2-map: (
  null: 2.369em,
  small: 3.157em
);

h1 { @include typi($h1-map); }
h2 { @include typi($h2-map); }
```

There's only one problem with this approach. It's difficult to change the values of your modular scale.

What if you decided to change the ratio you used?

You have to calculate the sizes and change the values one by one... Boo :(

Luckily, there's a way to make this much simpler. [Scott Kellum](http://scottkellum.com) and [Tim Brown](http://nicewebtype.com) have made it easy for us by creating the [Modular Scale Sass Library](https://github.com/modularscale/modularscale-sass).

What you have to do is install the library either with `bower`, `npm` or download it manually:

- `bower`: `bower install modular-scale --save`
- `npm`: `npm install modularscale-sass --save`

Then, `@import` modular scale into your Scss file. This can come either before or after Typi.

```scss
@import 'path-to-modular-scale/stylesheets/modular-scale';
```

Once you're done installing the library, you can use the `ms()` function to calculate `font-size`s.

For example, you can write `ms(3)` if you wanted a value of 2.369em. It saves you a ton of effort either from calcuating or copy-pasting it.

```scss
$ms1: ms(1); // => 1em * 1.333 = 1.333em
$ms2: ms(2); // => 1em * 1.333 * 1.333 = 1.777em
$ms3: ms(3); // => 1em * 1.333 * 1.333 * 1.333 = 2.369em
```

The default ratio used in Modular Scale is 1.618. If you want to change this ratio, you can change the `$ms-ratio` setting:

```scss
$ms-ratio: 1.25;

$ms1: ms(1); // => 1em * 1.25 = 1.25em
$ms2: ms(2); // => 1em * 1.25 * 1.25 = 1.563em
$ms3: ms(3); // => 1em * 1.25 * 1.25 * 1.25 = 1.953em
```

The good news is, since Typi takes in a `em` based font-size, it integrates with `ms()` perfectly. You can write your font-maps like this:

```scss
$h1: (
  null: ms(4),
  small: ms(5)
);
```

With this change, you don't have to worry about choosing the perfect scale your design tool before moving it into HTML. Everything can be calculated for you in Sass. So go ahead and play! Try out different scales and see which one fits your design best!

**UPDATE:** Because Modular Scale is so important, I made it even simpler to integrate modular scale (along with some other neat features) right into Typi. [Read this article](/blog/modular-scale/) for more info.

Oh, we've come to the end of the second tip. How time flies. There's one more tip for you in this article.

## Combining Modular Scale with Vertical Rhythm with Typi

In the [previous article](/blog/typi), I showed you how to create `line-height` values both with the `$typi` map and your custom font map:

```scss
$typi: (
  null: (16px, 1.5) // Line height of 1.5
);

$h1-map: (
  null: (ms(3), 1.2) // Line height of 1.2
);
```

These `line-height` values (both 1.2 and 1.5) are called unitless line-height because no units (like `px`, `em` or `rem`) are attached to it.

Using unitless line-height is a recommended practice on the web because children elements can inherit the line-height value, then recompute their respectively `line-height` using their `font-size` instead of inheriting a computed value.

Although unitless line-heights are cool, it’s difficult to maintain Vertical Rhythm if we used them, especially if you chose your `font-size` with Modular Scale.

Let’s walk through an example to show what I mean.

Before we continue, I’m assuming you know what Vertical Rhythm is. If not, read this [post](/blog/why-vertical-rhythms).

Let’s say you have a `font-size` of 16px and a `line-height` of 24px. The `font-size` of your header text is 3.157em (50.5px).

When you use Vertical Rhythm on your sites, you want the `line-height` of your text elements to be a multiple of the baseline. So, the `line-height` of this header text is either going to be 48px, 60px or 72px (2, 2.5 or 3 baselines. See why you can use these multiples [here](/blog/why-vertical-rhythms/))

The question is, what is 48px, 60px or 72px in unitless `line-height`s? There's no way of calculating the value without doing some complex math.

For example, if you have a 60px line-height, your unitless line-height value should be `1.19` (`60/50.5`). You need to calculate the `font-size` value from modular scale, then calculate the unitless line height...

Which is a lot of work.

There's a simpler way if you're okay with not using unitless line-height for these elements.

If you remember, Typi has a `vr()` function that helps you calculate the number of baselines and output the value in rems. We know that 48px is two baselines, 60px is 2.5 baselines and 72px is three baselines.

So, if you want to simplify the calculation, you can use this `vr()` function directly within your font maps to calculate the `line-height` value.

```scss
$h1: (
  null: (ms(4), vr(2.5))
);

h1 {
  @include typi($h1);
}
```

The CSS produced by Typi is:

```css
h1 {
  font-size: 3.157rem;
  line-height: 3.75rem; /* 2.5 baselines */
}
```

Tada! Beauty of using `rems`.

Many people, like Miriam Suzanne, the creator of [Susy](http://susy.oddbird.net), have been using this approach for a long time.

By the way, I feel it's okay to use `rems` in this case because it's unlikely that you're going to have text within `<h1>` that needs to inherit a raw `line-height` value. If you do, then, probably it's time to take a look at your HTML.

Note: Don’t do this with the `$typi` map. You’ll want the `line-height` to remain unitless.

## Wrapping Up

That’s it for now! You’ve learned how to:

- Create Media Queries in em with Typi
- Use Modular scale with Typi
- Combine Modular Scale with Vertical Rhythm in Typi

There are other interesting things you can do with Typi. I’ll cover them in future blog posts :)

For now, play around with these newfound features! Let me know what you think of them in the comments below!
