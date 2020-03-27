---
title: How To Write Mobile-first CSS
layout: post
slug: how-to-write-mobile-first-css
tags:
 - responsive
 - susy
newsletter: susy
---

Building responsive websites is a must-have skill for front-end developers today. When we speak about responsive websites, the term mobile-first pops into mind immediately.

We know the importance of designing from a mobile-first perspective. Unfortunately, much less was said about coding from a mobile-first approach.

Today, I'd like to share with you about the mobile-first approach to styling, why it is much better, and how to work its magic.

Note: This article will be immensely helpful if you are learning to build responsive layouts with Susy.

<!--more-->

## What are Mobile-first and Desktop-first approaches?

Let's understand the differences between mobile-first and desktop-first before we dive into why the mobile-first approach is better.

A mobile-first approach to styling means that styles are applied first to mobile devices. Advanced styles and other overrides for larger screens are then added into the stylesheet via media queries.

This approach uses `min-width` media queries.

Here's a quick example:

~~~scss
// This applies from 0px to 600px
body {
  background: red;
}

// This applies from 600px onwards
@media (min-width: 600px) {
  body {
    background: green;
  }
}
~~~

In the example above, `<body>` will have a red background below 600px. Its background changes to green at 600px and beyond.

On the flipside, a desktop-first approach to styling means that styles are applied first to desktop devices. Advanced styles and overrides for smaller screens are then added into the stylesheet via media queries.

This approach uses `max-width` media queries.

Here's a quick example:

~~~scss
body {
  background: green;
}

// This applies from 0px to 600px
@media (max-width: 600px) {
  body {
    background: red;
  }
}
~~~

`<body>` will have a background colour of green for all widths. If the screen goes below 600px, the background colour becomes red instead.

## Why Code Mobile-first?

Code for larger screens is usually more complicated than the codes for smaller screens. This is why coding mobile first helps simplify your code.

Consider a situation where you have a content-sidebar layout for a website. `.content` takes up a 100% width on mobile, and 66% on the desktop.

![](/images/2014/12/mw-5.png)

Most of the time, we can rely on default properties to style content for smaller screens. In this case, a `<div>` has a width of 100% by default.

If we work with the mobile-first approach, the Sass code will be:

~~~scss
.content {
  // Properties for smaller screens.
  // Nothing is required here because we can use the default styles

  // Properties for larger screens
  @media (min-width: 800px) {
    float: left;
    width: 60%;
  }
}
~~~

If we go with the desktop-first approach instead, we will have to restore the default properties for smaller viewports most of the time. The Sass code for the same result is:

~~~scss
.content {
  // Properties for larger screens.
  float: left;
  width: 60%;

  // Properties for smaller screens.
  // Note that we have to write two default properties to make the layout work
  @media (max-width: 800px) {
    float: none;
    width: 100%;
  }
}
~~~

With this one example, we save two lines of code and a few seconds of mind-bending CSS. Imagine how much time and effort this will save you if you worked on a larger site.

Most of the time `min-width` queries would be enough to help you code a website. There are however instances where a combination of both `min-width` and `max-width` queries helps to reduce complications that pure `min-width` queries cannot hope to achieve.

Let's explore some of these instances.

## Using Max-width Queries With A Mobile-First Approach

`Max-width` queries come into play when you want styles to be constrained below a certain viewport size. A combination of both `min-width` and `max-width` media queries will help to constrain the styles between two different viewport sizes.

Consider a case of a gallery of thumbnails. This gallery has 3 thumbnails in a row on a smaller viewport and 4 items in a row on a larger viewport.

![](/images/2014/12/mw-1.png)

Since there are no spaces between each item, its simple:

~~~scss
.gallery__item {
  float: left;
  width: 33.33%;
  @media (min-width: 800px) {
    width: 25%;
  }
}
~~~

It gets slightly complicated if there are empty spaces within each item.

![](/images/2014/12/mw-2.png)

Say these spaces each take up 5% of the width:

~~~scss
.gallery__item {
  float: left;
  width: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
}
~~~

We will also have to give the final (3rd item) on the row a `margin-right` of 0 to make sure it doesn't get pushed down into the next column.

~~~scss
.gallery__item {
  float: left;
  width: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
  &:nth-child(3n) {
    margin-right: 0;
  }
}
~~~

This code must also work for the case where there are four items in the row. If we go according to the min-width query we had above...

~~~scss
.gallery__item {
  float: left;
  width: 30%;
  margin-right: 5%;
  margin-bottom: 5%;
  &:nth-child(3n) {
    margin-right: 0;
  }

  @media (min-width: 800px) {
    width: 21.25%; // (100% - 15%) / 4
    &:nth-child (4n) {
      margin-right: 0;
    }
  }
}
~~~

![](/images/2014/12/mw-3.png)

This doesn't work properly because we specified that every 3rd item should have a `margin-right` of 0px. This property gets cascaded towards a larger viewport and breaks the pattern we wanted.

We can fix it by resetting the `margin-right` property of every 3rd item to 5%:

~~~scss
.gallery__item {
  // ...
  @media (min-width: 800px) {
    // ...
    &:nth-child (3n) {
      margin-right: 5%;
    }
    &:nth-child(4n) {
      margin-right: 0%;
    }
  }
}
~~~

This isn't a very nice approach since we are going to repeat the 5% `margin-right` property if we have to change the number of items on a larger viewport.

We should keep the code as DRY as possible.

A better way is to constrain `nth-child(3n)` selector within its rightful viewport by using a `max-width` query.

~~~scss
.gallery__item {
  float: left;
  margin-right: 5%;
  margin-bottom: 5%;
  @media (max-width: 800px) {
    width: 30%;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (min-width: 800px) {
    width: 21.25%; // (100% - 15%) / 4
    &:nth-child (4n) {
      margin-right: 0;
    }
  }
}
~~~

![](/images/2014/12/mw-2.png)

This works because the  `max-width` property limits the selectors to below 800px and the styles given within will not affect styles for any other viewports.

Now imagine if you have a larger viewport and you wanted to show 5 items per row in the gallery. This is when a combination of `min` and `max-width` queries come together.

~~~scss
.gallery__item {
  float: left;
  margin-right: 5%;
  margin-bottom: 5%;
  @media (max-width: 800px) {
    width: 30%;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  // combining both min-width and max-width queries
  @media (min-width: 800px) and (max-width: 1200px) {
    width: 21.25%; // (100% - 15%) / 4
    &:nth-child (4n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1200px){
    width: 16%; // (100% - 20%) / 5
    &:nth-child (5n) {
      margin-right: 0;
    }
  }
}
~~~

![](/images/2014/12/mw-4.png)

## A Video!

The guys over at [Webucator](https://www.webucator.com/mobile-training/mobile-web-development.cfm) were extremely kind and volunteered to create a video to summarize this blog post. So if videos are your thing, do check this out.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LCveWtlvSbM" frameborder="0" allowfullscreen></iframe>

## Conclusion

`Min-width` media queries are extremely helpful when it comes to coding responsive websites because it reduces code complexity. `Min-width` queries are, however, not the solution to every problem as you can see from the examples above. It can sometimes be beneficial to add `max-width` queries into your stylesheet to help keep things DRYer.
