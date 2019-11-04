---
layout: post
title: The difference between HTML, CSS, and JavaScript
description: In this article, I want to explain the difference between HTML, CSS, and JavaScript with an analogy. I hope it helps you understand what these languages are, and what they do. 
slug: difference-between-html-css-javascript
tags:
  - html
  - css
  - javascript
---

In this article, I want to explain the difference between HTML, CSS, and JavaScript with an analogy. I hope it helps you understand what these languages are, and what they do. 

<!-- more -->

Let's start with HTML. 

## HTML 

**HTML** stands for **Hypertext Markup Language**. It creates the structure of a website. 

Let's use a house as an analogy. Think about the house you currently live in. How many rooms does it have? My house has: 

- One living room
- One kitchen 
- Two bedrooms 

If I write this structure into code, it might look something like this: 

```xml
<house>
  <living-room></living-room>
  <kitchen></kitchen>
  <bedroom></bedroom>
  <bedroom></bedroom>
</house>
```

Each set of **item within angled brackets** (`<` and `>`) **is called a tag**. Here, `<house>` is a tag. It has one `<living-room>`, one `<kitchen>`, and two `<bedroom>`s in it. 

HTML is similar to the code above. But **HTML requires you to use a predefined list of tags** instead of `<house>` and `<living-room>`. You can find a list of all possible tags on [MDN][1]. Examples of these tags include: 

1. `<div>`, `<section>`, `<article>`
2. `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, 
3. `<p>`, 
4. `<a>`
5. `<span>`
6. ... 

**The most basic of all tags in HTML is `<div>`.** For this article, I'll use `<div>` to show you what basic HTML is about. 

In HTML, we can't write `<house>` because `<house>` is not a valid HTML tag. We can use `<div>` as a replacement for the `<house>` tag. But we need some way to identify "house". 

**To identify "house", we use a class.** A HTML version of the house looks like this: 

```html
<div class="house">
  <div class="living-room"></div>
  <div class="kitchen"></div>
  <div class="bedroom"></div>
  <div class="bedroom"></div>
</div>
```

We can dive deeper. 

Consider the room you are in. What furniture do you have in the room? In my room, there's a chair, a table, a wardrobe, and a bed. 

The HTML version of this would be: 

```html
<div class="house">
  <div class="living-room"></div>
  <div class="kitchen"></div>
  <div class="bedroom">
    <!-- Items in the bedroom -->
    <div class="chair"></div>
    <div class="table"></div>
    <div class="wardrobe"></div>
    <div class="bed"></div>
  </div>
  <div class="bedroom"></div>
</div>
```

**The words between `<--` and `-->` are called comments.** They're words meant for you and me to read. Browsers will not try to understand what they are. We use comments to write down thoughts for ourselves and other developers. 

You can still dive deeper. 

On my bed, I have: 

1. Two pillows
2. One bolster

```html
<div class="house">
  <div class="living-room"></div>
  <div class="kitchen"></div>
  <div class="bedroom">
    <!-- Items in the bedroom -->
    <div class="chair"></div>
    <div class="table"></div>
    <div class="wardrobe"></div>
    <div class="bed">
      <!-- Items on my bed --> 
      <div class="pillow"></div>
      <div class="pillow"></div>
      <div class="bolster"></div>
    </div>
  </div>
  <div class="bedroom"></div>
</div>
```

If you go on, **you can create the entire structure of your house in HTML.** This is what I mean when I say **HTML is the structure** of a website. 

```html
<div class="house">
  <div class="living-room"><!-- ... --> </div>
  <div class="kitchen"><!-- ... --> </div>
  <div class="bedroom"><!-- ... --> </div>
  <div class="bedroom"><!-- ... --> </div>
</div>
```

## CSS 

**CSS** stands for **Cascading Stylesheets**. It lets you **make a website look nicer**. In industry terms, we say you "style" a website with CSS. 

You can style an item by writing the following: 

```css
selector {
  property: value;
}
```

`selector` refers to the tag or class, (or attributes, if you get a bit more advanced) you want to style. `property` and `value` pairs let you defined the style. These would make more sense if we go back to our house analogy again. 

Consider your bedroom. How's the furniture arranged? For my bedroom, my: 

- Bed is placed in the north-eastern corner
- Wardrobe is placed in the south-eastern corner 
- door is at the south-west corner

On a website, we don't have north/east/south/west directions. But we can still say where things are with top/right/bottom/left. 

Let's say my bed is placed in the top-right corner of the room. This is what I might write: 

```css
.bed {
  position: absolute;
  top: 0; 
  right: 0;
}
```

This means: 

1. Set `position` to `absolute` for elements the `bed` class
2. Push it all the way to the top
3. Push it all the way to the right 

Besides locations, you can also change things like size and color. 

```css
.bed {
  width: 400px; 
  height: 200px; 
  background-color: lightskyblue;
}
```

<p class="codepen" data-height="404" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="vYBWLwM" style="height: 404px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="vYBWLwM">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/vYBWLwM/">
  vYBWLwM</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You can find a list of all CSS properties [here][2]. 

Note: This is a huge list. You might get overwhelmed if you look at it. The good news is, you don't have to learn everything at once. If you're starting out from scratch, I highly suggest reading "[Interneting is hard][3]". It explains the basics of HTML and CSS in a simple manner. 

(I'll work on a step-by-step CSS course to bring you from novice to advance in future. Leave your email [here][4] if you want to ask questions/get updates about this course). 

## JavaScript 

HTML and CSS are static. You cannot change HTML and CSS (by changing the HTML or CSS file) after a website gets loaded. But **JavaScript** gives you the ability to **change the HTML and CSS** on the page. 

Let's use the analogy of a house again to explain what JavaScript is. By the way, **JavaScript and Java are two different things.** Don't mix them up! 

Let's say it's dark right now. You walk into your room. What would you see? 

Nothing. Because it's pitch black inside. 

You move your hands to the switch and you switch on the lights. This is an example of an interaction. Other examples are: 

1. Turning on the TV
2. Turning on the tap for running water 
3. Turning on the air-conditioner

On a website, a basic interaction is similar to switching on the lights. You click a button and something happens. In this GIF below, I clicked a button and a menu pops out. I clicked the button again and the menu closes. 

<figure role="figure"><img src="/images/2019/html-css-js/off-canvas.gif" alt="Menu pops out when I click a button. Menu closes when I click the button again."></figure>

You can do a lot more with JavaScript. Examples are: 

1. Play an animation when you scroll down 
2. Open a menu when you hit a button on the keyboard
3. Create keyboard shortcuts for your website
4. Create a carousel where people can switch between slides 
5. Make a calculator

There's so much more about JavaScript than I can say with one blog post. If you're interested in learning JavaScript, I wrote **a course to teach you everything** you need to know **about JavaScript**. It's called [Learn JavaScript][5]. Check it out! You'll also see some inspirations on what you can build :) 

## Wrapping up 

**HTML** lets you **create the structure** of a website. 

**CSS** lets you **make the website look nice**. 

**JavaScript** lets you **change HTML and CSS**. Because it lets you change HTML and CSS, it can do tons of things. 

That's it! Hope this helps you better understand the differences between HTML, CSS, and JavaScript!  

[1]:	https://developer.mozilla.org/en-US/docs/Web/HTML/Element "HTML elements reference"
[2]:	https://developer.mozilla.org/en-US/docs/Web/CSS/Reference "CSS reference"
[3]:	https://internetingishard.com "Interneting is hard"
[4]:	https://zellwk.com/newsletter/
[5]:	https://learnjavascript.today "Learn JavaScript"
