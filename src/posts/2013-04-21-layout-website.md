---
title: The Layout of a Website
layout: post
slug: layouts-of-a-website
tags:
 - css
 - html
 - layout
newsletter: better-fed
---

Websites have a structure, just like houses have pillars. Understanding the structure of a website and how it is made up is an essential first step in creating a website. Today, I'll dive into the overview of what a website structure look like, and how planning this structure in advance can really help you learn to create a website.

<!--more-->

## The Basic Building Block ##
Many HTML elements make up the website that you see on a browser. There are generally two types of elements – block elements and inline elements. Don't worry if you can't remember all the elements though, if you start making a website, you'll quickly understand which is which.

I'm going to focus on creating the layout of a website today, and I'll focus on the block elements since 95% of elements used in layout are block elements.

## What are Block Elements? ##
Block elements are HTML elements that have been set to `block` as a default display method in CSS. Here's a quick picture of how it looks like.
![HTML Block Elements][1]

Width and height of the element could be controlled with other units as well. Other commonly used units are:

* pixels
* em
* rem

The width thing is part of CSS, and I'll explain how to place them in CSS in [another blog post](/blog/9-important-css-properties-you-must-know). For now, just grasp the theory behind how elements could be used.

## Common Usage of Elements for Layout ##
Here are some common layouts you see around the web:
![Content Layouts][4]

## Nesting HTML Elements ##
Another point to note regarding HTML elements is that they don't appear alone in any website. Each website makes use of many HTML elements in order to attain the visual effect that you see. Nesting of elements simply refers to placing an element within another element. An example of such code is

    <div class="outer">
        <div class="inner">
            <p>Some text</p>
            <p>Some text</p>
        </div>
        <div class="inner">
        </div>
        <div class="inner">
        </div>
    </div>

And this is what you will see on a web browser
![Nested HTML Elements][2]

Note: A simple mistake that I made when I first started out in web design is that I didn't understand how HTML elements work. One important concept that you have to know is that elements **cannot intersect each other**.
![ HTML elements cannot intersect ][3]

The final sample here is a detailed layout of my blog, and you can see how the elements come together to make up the whole website.
![Zell's Blog Layout][5]

## Final Words ##
I hope this was a great introduction to looking at structures in a website. **Let me know if I made anything too complicated in the comments!**

P.S. I'll dive into how to use these elements and create them in the same exact layout as my blog in the next session. Stay tuned!

[1]: /images/2013/04/Widths.jpg "HTML Block Elements"
[2]: /images/2013/04/Nesting.jpg "Nested HTML Elements"
[3]: /images/2013/04/no-intersect.jpg "HTML elements cannot intersect"
[4]: /images/2013/04/Content-Layouts.jpg "Content Layouts"
[5]: /images/2013/04/My-blog-layout.jpg "Zell's Blog Layout"
