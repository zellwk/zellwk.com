---
layout: post
title: Understanding the color-scheme property
description: "color-scheme is not necessary because it only changes the colors in the user-agent stylesheet. If you are confident you would override all user-agent stylesheet colors, there's no need to add this extra line."
slug: understanding-color-scheme
tags: ['css', 'color', 'theme']
---

You would have heard of the CSS `color-scheme` property if you are interested in adding a dark theme to your website. Here's what it looks like:

```css
:root {
  color-scheme: light dark;
}
```

`color-scheme` tells the browser to render user-agent stylesheets according to the user's preferred color scheme (which is set in their operating system).

There are three possible values (and it's super easy to understand):

- `light`: Browser will render styles according to the light scheme only
- `dark`: Browser will render styles according to the dark scheme only
- `light dark` (or `dark light`): Browser will render styles according to the scheme the user prefers

This means:

- `color-scheme: light` will give black text on a white background
- `color-scheme: dark` will give white text on a black background
- `color-scheme: light dark` or `dark light` will give either `light` or `dark` depending on the user's color scheme preference in their operating system.

## Is `color-scheme` necessary?

Most articles would recommend you use `color-scheme`.

But nope. `color-scheme` is not necessary.

`color-scheme` is not necessary because it only changes the colors in the user-agent stylesheet. If you are confident you would override all user-agent stylesheet colors, there's no need to add this extra line.

In fact, I'd argue it's safer to omit `color-scheme` when you're building Light and Dark themes... but that's a topic for another day when I consolidate all the information I found about creating Light and Dark themes.

Just my two cents.
