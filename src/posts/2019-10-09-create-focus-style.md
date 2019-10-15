---
layout: post
title: Creating a custom focus style
description: How to create (and change) a focus style easily with CSS. 
slug: creating-focus-style
tags:
  - accessibility
  - css
  - design
---

When you create a custom focus style, you want to think about four things: 

1. Adding an outline 
2. Creating animations that contain movement
3. Changing the background color 
4. Changing the text color

I wrote more about this in my article on [designing focus][1]. During my research, I found three kinds of focus style I liked. 

1. The one on Smashing Magazine
2. The one on WTF Forms
3. The one on Slack

<figure role="figure"><img src="/images/2019/create-focus/combined.png" alt="Focus styles on Smashing Mag, WTF Forms and Slack"></figure>

Today, I want to show you how to create these focus styles and use them effortlessly across your website.

<!-- more -->

## Creating the focus for Smashing Magazine

Smashing Magazine uses a large dotted outline for focus. To create this focus style, you set the `outline` property to `3px dotted`. 

<figure role="figure"><img src="/images/2019/create-focus/smashing.png" alt="Focus styles on Smashing Magazine."></figure>

```css
*:focus {
  outline: 3px dotted #761b15;
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="dybzwPj" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Focus style Smashing Mag (default)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/dybzwPj/">
  Focus style Smashing Mag (default)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

If you want to change the color of the outline, you can change the `outline-color` property. 

```css
.red-background *:focus {
  outline-color: white;
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="gOYxZMJ" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Focus style Smashing Mag (changing outline colors)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/gOYxZMJ/">
  Focus style Smashing Mag (changing outline colors)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Alternatively, you can use CSS Variables. 

```css
:root {
  --outline-color: #761b15;
}

*:focus {
  outline: 3px dotted var(--outline-color);
}

.red-background {
  --outline-color: white;
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="ZEzJVpK" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Focus style Smashing Mag (with CSS Variables)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/ZEzJVpK/">
  Focus style Smashing Mag (with CSS Variables)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Creating focus styles for WTF Forms

The focus style for WTF forms contains two parts:

1. A white border
2. A blue border

<figure role="figure"><img src="/images/2019/create-focus/wtf.png" alt="Focus styles for WTF Forms."></figure>

This style can be created with `box-shadow`. The idea is you create two shadows: 

1. The first shadow with the background's color
2. The second shadow with the focus's color

```css
*:focus {
  outline: none;
  box-shadow: 0 0 0 .075rem #fff, 
              0 0 0 .2rem #0069d4;  
}
```

If you want to change the focus color, you need to rewrite the entire `box-shadow`. 

```css
.blue-background *:focus {
  outline: none;
  box-shadow: 0 0 0 .075rem #0069d4, 
              0 0 0 .2rem #fff;  
}
```

Note: WTF Forms does not have styles for links and buttons. Only form elements. It doesn't have styles for a darker background either. I created this demo according to what I thought looks okay. 

<p class="codepen" data-height="305" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="KKPvbag" style="height: 305px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="WTF Forms focus style">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/KKPvbag/">
  WTF Forms focus style</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

There's an easier way. If you used CSS variables, you only need to switch the colors. 

```css
:root {
  --focus-inner-color: #fff;
  --focus-outer-color: #0069d4;
}

*:focus {
  outline: none;
  box-shadow: 0 0 0 .075rem var(--focus-inner-color), 
              0 0 0 .2rem var(--focus-outer-color);
}

.blue-background {
  --focus-inner-color: #0069d4;
  --focus-outer-color: #fff;
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="ExYvGXQ" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="WTF Forms focus style (with CSS Variables)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/ExYvGXQ/">
  WTF Forms focus style (with CSS Variables)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Creating focus styles for Slack

The focus style on Slack contains two parts: 

1. A dark blue outline 
2. A light-blue border

<figure role="figure"><img src="/images/2019/create-focus/slack.png" alt="Focus styles on Slack."></figure>

This focus style can be created with the same technique as WTF Forms. 

```css
*:focus {
  outline: none;
  box-shadow: 0 0 0 2px hsla(210, 52%, 42%, 1.00), 
              0 0 0 .6rem hsla(200, 72%, 83%, 0.75);
}
```

The CSS Variables trick works wonders if you need to change colors. 

```css
:root {
  --focus-inner-color: hsla(210, 52%, 42%, 1.00);
  --focus-outer-color: hsla(200, 72%, 83%, 0.75);
}

*:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-inner-color), 
              0 0 0 .6rem var(--focus-outer-color);
}

.dark {
  --focus-inner-color: hsla(0, 0%, 100%, 0.75);
  --focus-outer-color: hsla(0, 0%, 100%, 0.25);
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="JjPywVx" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Slack Forms focus style (with CSS Variables)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/JjPywVx/">
  Slack Forms focus style (with CSS Variables)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

If you use this technique on elements with borders, you might want to remove the borders. It's not pretty to see two stacking borders. 

<figure role="figure"><img src="/images/2019/create-focus/double-borders.png" alt=""></figure>

```css
button:focus {
  border-color: transparent;
}
```

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="rNBzPNr" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Slack Forms focus style (improved border)">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/rNBzPNr/">
  Slack Forms focus style (improved border)</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Combined demo

I combined the different methods onto one demo for you to play with. Here it is: 

<p class="codepen" data-height="300" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="yLBOqLG" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Focus style">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/yLBOqLG/">
  Focus style</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

[1]:	/blog/design-focus-style "Designing a focus style"
