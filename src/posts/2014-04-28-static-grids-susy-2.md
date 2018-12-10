---
title: Static Grids with Susy 2
layout: post
slug: static-grids-with-susy2
tags:
 - susy
newsletter: susy
---

There are times where you might want to use grids that break that certain points instead of using a fully fluid grid. Susy lets you do that easily as well. But first, you'll need to do a few quick configurations to get that to work.

<!--more-->

This is the third part of our tutorial series with Susy 2. If you're completely new, I suggest you check out the [first part][1], which will get you started quickly.

## Configuring Susy to use Static Widths

If you wanted to use static widths with Susy, you need to change math value to `static`. You'll also have to set the `column-width` of the grid that you'll like to use. Valid units are pixels, ems and rems. Let's work with pixels in this example.

If you're going to make the grid responsive, the default susy column should be set to the number of columns in the smallest view.

  // Static Style
  $susy: (
    math: static,
    columns: 4,
    column-width: 60px,
    gutters: 1 / 4,
    use-custom: (rem: true)
  );

## Using Susy Static Grids

The steps to use Susy is exactly the same as if we had used the fluid grid.

First we have to include a container. When using Static grids take note to add the `$susy` map to the container.

When Susy is set to static mode, its container widths are set according to the column width, the number of columns given and the gutter width.

  .container {
    @include container($susy);
  }

Susy will automatically calculate the max width for you. The CSS output is

  .container {
    width: 285px;
    width: 15.83333rem;
    margin-left: auto;
    margin-right: auto;
  }

The only difference between static and fluid grids is that in static mode, Susy calculates a max-width for the container whereas Susy uses a max-width of 100% in fluid mode.

## Responsifying with Static Grids

Making your grids responsive with Susy in static mode is essentially the same as that when Susy is in fluid mode. There difference is... you guessed it, the container. I'll only touch on the container in this tutorial, [check back here][2] if you're interested to find out how to do the rest.

When working with fluid grids, we didn't have to be bothered about the container since its going to be 100% anyway. But now, we do.

Thankfully, its a problem at all. Here's the best method I found by far.

  .container {
    @include container($susy);

    // Tablet View
    @include breakpoint(600px) {
      @include container(12)
    }

    // Desktop View
    @include breakpoint(900px) {
      @include container(16)
    }
  }

Within each breakpoint, redeclare the container with the number of columns as the argument to container.

If by any chance you're changing your layout map (which probably wouldn't happen), add the layout as the argument to container instead.

The CSS Output is this:

  .wrap {
    width: 285px;
    width: 15.83333rem;
    margin-left: auto;
    margin-right: auto;
  }
  .wrap::after {
    content: " ";
    display: block;
    clear: both;
  }
  @media (min-width: 600px) {
    .wrap {
      width: 885px;
      width: 49.16667rem;
      margin-left: auto;
      margin-right: auto;
    }
    .wrap::after {
      content: " ";
      display: block;
      clear: both;
    }
  }
  @media (min-width: 900px) {
    .wrap {
      width: 1185px;
      width: 65.83333rem;
      margin-left: auto;
      margin-right: auto;
    }
    .wrap::after {
      content: " ";
      display: block;
      clear: both;
    }
  }

It works, but its also unsightly. There are extra margin-left and margin-right and clearfixes written into the CSS because we redeclared the container.

I'm pretty sure there's way a to make the CSS output DRY-er, but I've yet to discover it. If you know about this, please let me know in the comments.

## Conclusion

In the nutshell, the steps to using static grids is exactly the same with fluid grids. You just have to take note of declaring the container at various breakpoints and to set the `$susy` map correctly.

[1]:  /blog/susy2-tutorial/ "A complete tutorial to Susy 2"
[2]:  /blog/susy2-tutorial-2/ "A complete Tutorial to susy 2 part 2"
