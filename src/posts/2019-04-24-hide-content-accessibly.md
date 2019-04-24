---
layout: post
title: A new (and easy) way to hide content accessibly  
description: Possibly the best way to hide content accessibly. The CSS is easy to write and understand!
slug: hide-content-accessibly
tags:
  - css
  - accessibility
---

When I want to hide content accessibly, I always turn to [Jonathan Snook's snippet][1]. 

```css
.element-invisible {
  position: absolute !important;
  height: 1px; width: 1px; 
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}
```

But yesterday, I happened to chance upon Scott O'Hara's [article on hiding content][2]. Scott says we only want to hide content in three different contexts: 

1. Hide it completely
2. Hide it visually 
3. Hide it from screen readers 

<!-- more -->

When we say hide content accessibly, we effectively mean option #2 (hiding content visually, but not from screen readers and keyboard users). 

## Then I had an idea

If we only want to hide elements visually, why don't we use `opacity: 0`? Opacity is used to hide elements visually anyway. Content hidden with `opacity: 0` is still accessible to screen readers. 

```css
.hide-accessibly {
  opacity: 0; 
}
```

I took it up a notch by adding `position: absolute`. This takes the element away from the document flow; and allows us to style other elements as if the hidden content isn't there. 

```css
.hide-accessibly {
  position: absolute !important; 
  opacity: 0; 
}
```

I thought this felt good enough, and I asked Jonathan about it. 

Here's what he responded with: 

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">While it pulls it out of flow, it can obscure clickable items. You could add `pointer-events: none;` to it. I don&#39;t know how screenreaders behave with pointer-events turned off; I haven&#39;t tested it. <a href="https://t.co/fa8qHvfWic">https://t.co/fa8qHvfWic</a></p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120809900878307328?ref_src=twsrc%5Etfw">April 23, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

He also wondered if `pointer-events: none` would stop keyboard-trigged click events (which are absolutely essential for screen readers and keyboard users). 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Pointer events shouldn’t obscure because any click/touch events pass through. Although, actually, unsure if that breaks keyboard-triggered clock events. 🤔</p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120844382754754562?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> 

I was curious, so I tested `pointer-events: none` and discovered it works with keyboard-generated clicks, screen-reader-generated clicks, and JavaScript generated clicks. 

Here's the Codepen I used for my test: 

<p class="codepen" data-height="450" data-theme-id="0" data-default-tab="html,result" data-user="zellwk" data-slug-hash="mgzPXa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Pointer-events test">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/mgzPXa/">
  Pointer-events test</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

I reported my findings back to Jonathan and he said we might have a winner! 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sounds like we might have a winner then!</p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120862948866633728?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> 

## The snippet 

Here's the snippet if you want to use this method. 

```css
.hide-accessibly {
  position: absolute !important; 
  opacity: 0; 
  pointer-events: none;
}
```

This is method is still incredibly new. I've only tested it on the latest versions of Firefox, Safari, and Chrome. I wasn't able to run a test on Edge and other browsers yet. 

Please feel free to take this snippet out for a spin. 

And let me know if it works for you! 

[1]:	https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
[2]:	https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html