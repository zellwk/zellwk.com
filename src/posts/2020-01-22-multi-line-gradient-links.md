---
layout: post
title: Multi-line gradient links
description: How to create links with gradients that spans multiple lines
slug: multi-line-gradient-links
tags:
  - css
---

When I saw the CSS Tricks redesign, I was hooked. I loved the links with gradients. I told myself I'm going to use gradient links for my next project. 

That's what I did for Learn JavaScript's course portal. The links look like this: 

<figure role="figure"><img src="/images/2020/multi-line-gradient/link.gif" alt="Blue color link with blue underline. When hovered, the text has an orange to yellow gradient; underline becomes solid orange."></figure>

I want to share what I learned about creating gradient links

<!-- more -->

## Creating Gradient Text

Chris Coyier wrote an [article on creating gradient text][1] back in 2012. The article is old, but it's still valid. He gave the following snippet in the article: 

```css
.gradient-text {
  background: -webkit-linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

`linear-gradient` is now supported across all browsers. We don't need to add the `-webkit` prefix anymore. The code shortened can be shortened to: 

```css
.gradient-text {
  background: linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/gradient-text.png" alt="Text with vertical gradient. From light gray at the top to dark gray at the bottom.">
</figure>

### Creating a slanted gradient

We can provide an angle to `linear-gradient` to change the angle of the gradient. After playing around for a bit, I decided to use `120deg` as the angle. 

```css
.gradient-text {
  background: linear-gradient(120deg, #ab4e19, #c99a2e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/gradient-text-2.png" alt="Text with linear gradient set to 120 degrees.">
</figure>

### Multi-line gradient text

The snippet above supports multi-line gradient text on Chrome, Firefox, and Edge. But it doesn't work on Safari. Text that goes into the second (or later) rows become completely transparent. 

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/multiline-safari.png" alt="Second row of text on Safari is transparent.">
</figure>

I didn't understand why, so I inspected the links on CSS Tricks. I noticed they used a [`box-decoration-break`][2] property. The multiline gradient text works on Safari after I set `box-decoration-break` to `clone`. 

```css
.gradient-text {
  background: linear-gradient(120deg, #ab4e19, #c99a2e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
}
```

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/multiline-safari-fixed.png" alt="Gradient text on safari fixed.">
</figure>

## Underlines

**Links should have underlines**. The underlines make it obvious that links are links. 

I tried putting the `.gradient-text` snippet onto links, but I discovered there weren't any underlines. 

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/multiline-safari-fixed.png" alt="Gradient text on safari fixed.">
</figure>

Why? 

I dug around and realised that `-webkit-text-fill-color` changes the `text-decoration-color`. When we set `-webkit-text-fill-color` to transparent, we also set `text-decoration-color` to `transparent`. 

<figure role="figure"><img src="/images/2020/multi-line-gradient/text-fill-color.gif" alt="Textsfill-color: transparent set text decoration color to transparent as well"></figure>

So the easiest way to bring back the underline is to change `text-decoration-color`. 

```css
a {
  background-image: linear-gradient(120deg, #ab4e19, #c99a2e);
  text-decoration-color: #ab4e19;
  /*...*/
}
```

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/text-decoration-color.png" alt="Set text decoration color to orange.">
</figure>

### Gradient underlines

I thought about creating a gradient underline since the text contains a gradient. Unfortunately, it's not possible. 😢.  

You can only create gradient underlines with `background-image`. (See "[styling underlines for the web][3]" for a list of possible methods to create underlines). We can't use `background-image` to create gradient underlines since we used it to create the gradient text. 

### But the underline looks ugly!

The `text-decoration` underline looks ugly at large font sizes. But when they're ok when they're at normal font sizes. 

<figure role="figure"><img src="/images/2020/multi-line-gradient/link.gif" alt="Blue color link with blue underline. When hovered, text has a orange to yellow gradient; underline becomes solid orange."></figure>

I suggest you don't add `text-decoration` underlines to large text. Consider [creating underlines with a different method ][4]instead. 

## Gradient + Focus  

Gradient links look amazing with focus outlines. [Just saying][5]. 

<figure role="figure">
  <img src="/images/2020/multi-line-gradient/focus.gif" alt="">
</figure>

[1]:	https://css-tricks.com/snippets/css/gradient-text/ "Creating gradient text"
[2]:	https://css-tricks.com/almanac/properties/b/box-decoration-break/ "Box decoration break"
[3]:	https://css-tricks.com/styling-underlines-web/
[4]:	https://css-tricks.com/styling-underlines-web/ "Styling underlines for the web"
[5]:	/blog/style-hover-focus-active-states "Styles focus states different from other states"