---
title: Compass Vertical Rhythms
layout: post
slug: compass-vertical-rhythm
tags:
 - css
 - typography
 - design
newsletter: better-fed
---

Vertical Rhythms are part and parcel of good web design. Although they are important, they can be an incredibly chore to calculate.

Luckily, Compass has a great vertical rhythm module that helps clears this mess up.

<!--more-->

## Compass Vertical Rhythm
Compass requires the use of [Sass][1], a css preprocessor. If you're not sure whether you want to start using a preprocessor like Sass, [check out one of my previously written articles][2].

The [Compass Vertical Rhythm][3] reference is great, but may possibly overwhelm if you're new to it.

In this post, we're going to talk about how to use this powerful  addon.

Note: You need to have the alpha version of Compass installed to before this tutorial will work. You can install compass alpha with

```bash
$ sudo gem install compass --pre
```

## Configuring Vertical Rhythms
The first step to using Compass vertical rhythms is to configure a few variables. You can ignore most of the variables listed on the compass reference page with the exception of these two.

```scss
// Compass Vertical Rhythm Settings
$base-font-size: 20px; // Sets the base font size
$base-line-height: 36px; // Sets the base line height
```

The following two modules are useful, but completely optional

```scss
$round-to-nearest-half-line: true; // Allows compass to round to  multiples of 0.5x line height
$rhythm-unit: "rem"; // Sets rhythm unit to rem. Remove to use default em unit.
```

I personally like to allow compass to automatically round to the nearest half line instead, and this can be very helpful when large header titles have to get bumped to two lines.

Rem unit is one of my favourites, and I use them for my development. However, it is not supported by IE 8. Unless you're willing to get a polyfill for the rem unit, you might want to stick with default ems.

Now that you've set the basic compass variables, you're more to less good to go. I will go one step further and list down basic font sizes that will be used in the website.

```scss
// Note these are custom. You have to tell compass to use them yourself
$h1-fz: 45px;
$h2-fz: 30px;
$h3-fz: 24px;
$h4-fz: 20px;
$h5-fz: 16px;
$h6-fz: 13px;
```

## Using Compass Vertical Rhythm

Telling Compass to set the baseline is quite simple, with the use of only one line of code.

```scss
// Establishes baseline with Compass.
@include establish-baseline;
```

This sets the default font size and line height you have previously declared into the html selector. The output will be slightly different depending on whether you're using the experimental version of compass.

```scss
/* Standard Compass Version. At the time of writing this is v0.12.2.
Thanks to Maximilien for noticing this */
* html {
  font-size: 125%; }

html {
  font-size: 20px;
  line-height: 1.8em;
}

/* Experimental Compass Version. At the time of writing this is v1.0.0.alpha.18 */
html {
  font-size: 125%;
  line-height: 1.8em;
}
```

Remember the various heading font sizes we set earlier? You have to tell compass to use them with the `adjustfont-size-to` mixin. This mixin takes up to 3 arguments.

```scss
// Adjust font size to mixin.
// Note that those in [] are optional arguments.
adjust-font-size-to($to-size, [$lines], [$from-size])

$lines = number of line heights this font is suppose to take up.
$from-size = current font size used to adjust to target font size.
```

`$lines` will default to the nearest line height multiple that can accomodate the target font size. It will round to the nearest half line height if `$round-to-nearest-half-line` is set to true. This number need not be an integer.

For example, if the target font size is 45px, the base-line-height is 36px, the resultant line height will either be 54px or 72px (in em or rem unit), depending on what `$round-to-nearest-half-line`is set to. By stating `$lines` explicitly, you are telling compass to use your declaration instead of calculating them.

If you're using ems as the rhythm unit, you have to tell compass to use the `$from-size` variable if the current container has a different font size than the base declared up above.

If you are using rems, you don't have to bother about `$from-size` at all.

Here's how you can use the `adjust-font-size-to` mixin. You can use this anywhere you need to.

```scss
h1 {
  @include adjust-font-size-to($h1-fz);
}

h2 {
  @include adjust-font-size-to($h2-fz);
}

h3 {
  @include adjust-font-size-to($h3-fz);
}

h4 {
  @include adjust-font-size-to($h4-fz);
}

h5 {
  @include adjust-font-size-to($h5-fz);
}

h6 {
  @include adjust-font-size-to($h6-fz);
}
```

## The rhythm() function

The `rhythm()` function is the single most useful function in Compass. It allows you to quickly calculate multiple line-heights worth of margins and paddings without doing the math. This number need not be an integer

```scss
.example-selector {
  margin: rhythm(1) 0; // This translates to 36px margin top and bottom since the declared base lineheight is 36px.
  padding: rhythm(1) 0; Similarly, this adds 36px of padding instead
}
```

## In Conclusion

That's really all to it to using Compass for vertical rhythm. Its incredibly quick and easy. There are many other functions provided that I don't use often, but you can find them all in the [reference][4].

Try using vertical rhythms in your next project and let me know how you find it!

## Resources
[http://24ways.org/2006/compose-to-a-vertical-rhythm/][5]
[http://typecast.com/blog/4-simple-steps-to-vertical-rhythm][6]
[http://drewish.com/tools/vertical-rhythm/][7]

[1]:  http://sass-lang.com "Sass"
[2]:  http://zellwk.com/blog/how-to-organize-and-edit-your-css-painlessly/
[3]:  http://compass-style.org/reference/compass/typography/vertical_rhythm/ "Compass vertical rhythm"
[4]:  http://compass-style.org/reference/compass/typography/vertical_rhythm/ "Compass vertical rhythm reference"
[5]:  http://24ways.org/2006/compose-to-a-vertical-rhythm/
[6]:  http://typecast.com/blog/4-simple-steps-to-vertical-rhythm
[7]:  http://drewish.com/tools/vertical-rhythm/
