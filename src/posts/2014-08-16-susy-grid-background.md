---
title: How to Debug Your Susy Layout with the Susy Background Image (Even If The Grid Changes)
layout: post
slug: susy-grid-background-image
tags:
 - susy
newsletter: susy
---

When trying to build your layouts with Susy, the first thing you might have tried is to output Susy's grid background so you can make sure you're coding the right thing.

I know I did.

But it was tough. I couldn't figure out that out the first couple of months I used Susy. Even if I did manage to find a way to output the grid, I can't seem to change the grids when I introduced a change in media queries. It was incredibly frustrating and it was very difficult to learn Susy during that period.

I'd like to share with you one way you can produce as many grid backgrounds and use them with as many breakpoints as you like to.

<!--more-->


## What We're Producing

We're producing a Susy container than has 2 different breakpoints for this tutorial.

When the viewport is below 800px, we will use a Susy grid with 4 columns. When it is between 800px to 1200px, we will use a Susy grid with 8 columns and when the it is larger than 1200px, we will use a Susy grid with 12 columns.

Here's a Codepen view what we're creating. Try resizing the Codepen browser and notice the grids change at the breakpoints mentioned. (**Note: You will have to open this up on Codepen**)

<p data-height="268" data-theme-id="7929" data-slug-hash="jDFdI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/zellwk/pen/jDFdI/'>Learning To Use Susy Background Grids</a> by Zell Liew (<a href='http://codepen.io/zellwk'>@zellwk</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

## Setting up HTML and SCSS

The html and css setup for this tutorial is relatively straightforward. Since we're only dealing with the container, we only need one div to see the magic happen. I've chosen to name it `.wrap` as I always do for all my sites.

    <div class="wrap"></div>

We also have to force `.wrap` to a specific height in order to show its grid since there are no contents within it. If there are contents within your grid, you don't have to add this.

    .wrap {
        height: 100vh;
    }

We're now ready to setup Susy.

## Set Up Susy Global Settings for Debugging

Susy provides you with a map called `$susy` that you can use to setup the global defaults for Susy. If you want to output the background image for Susy, the very first thing you will need to do is to set the `image` key under `debug` to `show`.

    $susy: (
      debug: (image: show)
      );

## Using The Susy Grid Background Image

When you have set `image` to `show`, Susy automatically outputs the background image when you call a susy container with the `container` mixin.

Since the default `columns` settings is 4 columns, you should see a grid with 4 columns when you call the the `container`.

![](/images/2014/08/grid-4.png)

If you want to change the number of grids that show up, change the `columns` setting within the `$susy` map.

    $susy:(
      columns: 8,
      debug: (image:show)
    )

And you should now have 8 columns shown on the grid.

![](/images/2014/08/grid-8.png)

## Changing Susy's Background Grid at Different Breakpoints

Earlier I said we're creating a grid that breaks has 3 different breakpoints. Small grid with 4 columns under when the viewport is under 800px, medium grid with 8 breakpoints when the viewport is under 1200px and a large grid with 12 breakpoints when the viewport is under 1200px.

If we follow the above method, we can do this:

    .wrap {
        @include container();

        @media (min-width: 800px) {
            @include container();
        }

        @media (min-width: 1200px) {
            @include container();
        }
    }

This unfortunately produces alot of unnecessary code because the `container` mixin produces 3 additional properties that are not necessarily required for other breakpoints – `max-width`, `margin-left` and `margin-right`.

Instead, we're going to use another mixin Susy provides – `show-grid`. Show grid can take on one argument which can potentially be a full Susy shorthand, but that is unnecessarily complicated. It needs only a single number – the context.

We just have to replace the above `container()` with `show-grid(n)` , where n is the context.

    .wrap {
        @include container();

        @media (min-width: 800px) {
            @include show-grid(8);
        }

        @media (min-width: 1200px) {
            @include show-grid(12);
        }
    }

And Tada! Thats all you need to do to change the background image!

<p data-height="268" data-theme-id="7929" data-slug-hash="jDFdI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/zellwk/pen/jDFdI/'>Learning To Use Susy Background Grids</a> by Zell Liew (<a href='http://codepen.io/zellwk'>@zellwk</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Conclusion

Being able to produce a Susy background grid to help you check your work is definitely the most important and most effective step when learning to work with Susy. Now you'll be able to get quite visual feedback and know whether you're doing the right thing!

I've learnt this the hard way after multiple hard knocks while writing [Learn Susy](http://bit.ly/learnsusy), and I'm proud to be able to share this with you :)

Let me know if you have learnt something very useful today!
