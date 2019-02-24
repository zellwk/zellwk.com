---
title: Creating a clean and simple website (Part 1 – HTML)
layout: post
slug: creating-a-clean-and-simple-website-part-1-html
tags:
 - design
 - css
newsletter: better-fed
---

After getting to know the structure of the website look like, its time to create them. In this article, we're going to explore how to create the HTML content of a website.

<!--more-->

## What you need ##
All you need is just a simple text editor. If you have not gotten one yet, I suggest checking out here and just grab a recommended one. Whip out your text editor and lets get started!

## Identifying Elements, IDs and Classes ##
There are a total of 3 different was for CSS documents to target HTML documents. These methods have to be included while writing the HTML in order for you to play around with the design at a later stage.

The 3 methods are:

1. Targeting with the HTML element. These include things like `<div>, <h1>, <p>`
3. Targeting with a Class. Classes are given to areas where there is duplicated content. They are referenced in css with a dot, like: `.class`
4. Targeting with an ID. IDs are given to areas where there is no duplication and are referenced in CSS with a # like this: `#id`.

The preferred order is to target the HTML element whenever possible, followed by classes and IDs


## Writing the HTML ##
When writing HTML, always go in this direction:

1. Left to right
2. Top to bottom

Before taking a dive into the HTML, lets take a step back and revisit how our website strucutre look like. If this is new to you, I recommend starting from the previous article over
 [here][1].

Here's a quick view of the structure that we're working with.
![Full Website Layout][i1]

First, lets write get the basic HTML starters down into our document.

    <!DOCTYPE html>
    <html>

        <head>
            <meta charset= "UTF-8">
            <link rel="stylesheet" href="css/style.css">
            <title> My First Website </title>
        </head>

        <body>
        </body>

    </html>

Heading from top to bottom, we first encounter the header area. We will give this an id of header for to easily style and target its inner elements in CSS.
Notice also how the header are has a `.wrap` that is duplicated throughout the webpage.

We will also dive into `#header` get the navigation element in the top right in this quick html file below.

    <body>
        <div id="header">
            <!-- #header given to allow better targeting for CSS at a later stage  -->
            <div class="wrap">
                <!-- .wrap given  because multiple elements use the same wrap -->
                <div id="title-area">
                    <h1 id="title">
                        <a href="#">Zell Liew</a>
                        <!-- anchor tags are given href of # for demo purposes. -->
                    </h1>
                </div>

                <nav>
                    <ul>
                    <!-- An unordered list is used for navigation -->
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About Me</a></li>
                        <li><a href="#">Contact </a></li>
                    </ul>
                </nav>
            </div>
        </div>

    </body>

You might have noticed that HTML is just a bunch of tags, combined with the words you would normally use. These tags allow us to tell the computer what each element is, and what they are supposed to do.

In the middle section of the page, we have a `#content` and a `#sidebar`. In this case, we go by a left to right order and create the stuff in `#content` first before `#sidebar`.

    <div id="content">
        <div class="post">
            <h2 class="entry-title">
                <a href="#">
                <!-- We use an anchor tag here because we want the post preview to link to the post itself -->
                    The Layout of a Website
                    <!-- Title of post goes here -->
                </a>
            </h2>
            <div class="postinfo">
                APRIL 21, 2013
                <!-- Post info, like time goes here -->
            </div>
            <div class="entry-content">
                <!-- Actual post items goes here -->
                <img src="" alt="">
                <p>
                    Some post information
                </p>
            </div>
        </div>
    </div>

Within `#content`, items in `.post` are repeated as many times as required.

Without complicating things too much, the basic structure of the sidebar is as follows:

    <div id="sidebar">
        <div class="widget-wrap">
            <!-- Similarly, a wrap is used here to allow easy duplicating of layouts in the sidebar -->
            <h4 class="widgettitle">
                Title of sidebar item
            </h4>
            <p>
                Sidebar item text
            </p>
        </div>
    </div>

Finally, the footer of the website:

    <div id="footer" class="footer">
        <div class="wrap">
            <div class="creds">
                <p>Copyright &#x000A9; 2013 &middot;
                    <a href="#">Zell Liew</a> &middot; Built on the <a href="#">Genesis Framework</a>
                </p>
            </div>
        </div>
    </div>

## Wrapping it up ##
HTML, as you can see, is a series of tags and text. It's not exceptionally difficult to grasp and I'd recommend you to sign up for my newsletter and grab the getting ebook on how to get started if you're having difficulties. It'll make things much clearer.

This example is also a tad more complicated because I wanted to give you a clearer picture of how a website would look like. If it is too complicated, let me know in the comments and I'll make a shorter one instead.

In the next post, I'll break down how to style the HTML that we have created using CSS.

Finally, [click here][2] for the full code that we have created together

[i1]: /images/2013/04/website.jpg "Full Website Layout"

[1]: http://www.zell-weekeat.com/layouts-of-a-website  "Layout of your website"
[2]: /images/2013/04/Website-HTML.html "HTML Codes"
