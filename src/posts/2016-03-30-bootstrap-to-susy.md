---
title: Moving from HTML Grid Systems to CSS Grid Systems
layout: post
slug: from-html-grids-to-css-grids
tags:
 - responsive
 - layout
 - susy
newsletter: susy
---

I think it was a few months ago where someone asked me if I had any pointers to help them transit from Bootstrap's dom-littering `.col` classes to either Susy or Neat. It struck me that I haven't talked about this even though I've been using Susy grids for so long!

Anyway, this transition is a fairly big undertaking if you're doing it for the first time. Allow me to walk you through a four-step process that I use in this article.

<!--more-->

Before we begin, **I'm assuming you already understand why you're moving from a dom-littering HTML Grid system** (like Bootstrap, Foundation or any framework out there) **to a CSS Grid system** (like Susy, Neat or even Flexbox with CSS). If you're unsure why you're doing so, I highly suggest you check out [this article](/blog/migrating-from-bootstrap-to-susy/) to find out the pros and cons of both systems before moving on.

Ready?

**The four steps are:**

1. Identify the layout patterns
2. Decide on new markup and classes
3. Create layout patterns in CSS
4. Replace old markup with new markup

Let's walk through each of these steps in the article.

## Step 1: Identifying layout patterns

**A layout pattern is pattern that determines how your layout changes at different breakpoints.** An example of a layout pattern is a content-sidebar layout. In this layout, both content and sidebar elements take up the full 12 columns on the mobile (assuming you're using a 12-column grid). At `600px`, the content takes up 9 columns while the sidebar takes up 3 columns.

<figure><img src="/images/2016/html-grids-to-css-grids/layout-content-sidebar.png" alt="Content Sidebar Layout pattern">

  <figcaption>Content Sidebar Layout pattern</figcaption>
</figure>

The code for this layout in Bootstrap is relatively straightforward. (Btw, let's just say `col-md` triggers at `600px`. I don't remember the actual breakpoint that Bootstrap uses)

```html
<div class="row">
  <div class="col-12 col-md-9">Content</div>
  <div class="col-12 col-md-3">Sidebar</div>
</div>
```

Another example of a layout pattern is a 3-column grid. In this layout, each grid item takes up the full 12 columns on a mobile. At `600px`, each grid item takes up 4 columns.

<figure><img src="/images/2016/html-grids-to-css-grids/layout-grid-3col.png" alt="3-column grid layout">

  <figcaption>3-column grid layout</figcaption>
</figure>

The code for this 3-column grid in Bootstrap is straightforward as well:

```html
<div class="row">
  <div class="col-12 col-md-4">Grid item</div>
  <div class="col-12 col-md-4">Grid item</div>
  <div class="col-12 col-md-4">Grid item</div>
</div>
```

Once in a while, you may encounter a layout that's more complex. For example, you might want to feature two items in a 3-column grid. Each featured item should take up 6 columns instead of 4 columns at `600px`.

<figure><img src="/images/2016/html-grids-to-css-grids/layout-featured.png" alt="Feature Grid">

  <figcaption>Feature Grid</figcaption>
</figure>

With Bootstrap, your code will be similar to this:

```html
<div class="row">
  <div class="col-12 col-md-6">Featured Grid Item</div>
  <div class="col-12 col-md-6">Featured Grid Item</div>
  <div class="col-12 col-md-4">Grid item</div>
  <div class="col-12 col-md-4">Grid item</div>
  <div class="col-12 col-md-4">Grid item</div>
</div>
```

We've listed three different patterns so far. They are:

1. Content-sidebar pattern
2. 3-column grid pattern
3. 3-column feature grid pattern

Your turn now. Go ahead and identify layout patterns you have in your design. Once you're done identifying them, the next step is to decide on the new markup and classes for each pattern.

## Step 2: Decide on New Markup and Classes

One good thing about using HTML-based grid systems is that we don't have to think about markup nor classes. It has already been decided for us. When we switch from a HTML-based grid system to a CSS-based one, we suddenly have to create `.some-class-name` to replace familiar numbers like `.col-md-6`.

This process is a huge problem that many people get stuck with. I got stuck when I first started with CSS-based layouts as well.

In the beginning, I tried to be semantically correct. I would use class names like `.content` and `.sidebar` whenever I could. I also tried to remove as much nesting as possible. Here's the initial markup for my content-sidebar pattern:

```html
<div class="content">Content</div>
<div class="sidebar">Sidebar </div>
```

This is good enough if your layout is simple, with only `.content` and `.sidebar` on your site. It starts getting weird if you add other types of layout patterns.

For instance, the simplest way I could create a 3-column grid layout was with a markup that looks like this:

```html
<div class="grid">
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
</div>
```

If you put the two markups together, you'll see that my initial method results in inconsistent markup between the 3-column-grid and content-sidebar :(

```html
<!-- DO NOT FOLLOW THIS! -->
<div class="content">Content</div>
<div class="sidebar">Sidebar </div>
<div class="grid">
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
</div>
```

A better markup structure will be to use a container div much like Bootstrap's `.row` class:

```html
<div class="content-sidebar-container">
  <div class="content">Content</div>
  <div class="sidebar">Sidebar</div>
</div>
<div class="three-column-grid-container">
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
  <div class="grid-item">Grid item</div>
</div>
```

The neat trick to adding container divs is that you can use `nth-child` in the CSS to style their direct descendants:

```scss
// Note: This is SCSS
.content-sidebar-container {
  > div:nth-child(1) {
    // Styles for Content
  }

  > div:nth-child(2) {
    // Styles for Sidebar
  }
}
```

This means there's no longer a need to provide class names for descendants. (like `.content`, `.sidebar` and `.grid-item`). The markup gets simplified a little more:

```html
<div class="content-sidebar-container">
  <div>Content</div>
  <div>Sidebar</div>
</div>
```

There's one more improvement we can make here. `.content-sidebar-container` is a lot to type. As a lazy developer, I don't like to type much.

Here, I chose to use SMACSS's naming convention to help change the class names slightly. SMACSS recommends that you prepend `.l` to all layout rules. Since we're writing only container classes, and these container classes define layout patterns, we can shorten `.content-sidebar-container` to `.l-content-sidebar`.

Furthermore, `.content-sidebar` is pretty long to type. If you want to, you can further shorten it to `.l-cs`. (This class name makes sense too, doesn't it? Just be sure to document it somewhere :))

**To summarize this step, I recommend you create naming conventions such like these:**

1. Content-sidebar pattern => `.l-cs`
2. 3-column grid pattern => `.l-g3`
3. 3-column feature grid pattern  `.l-fg3`

Once you have decided on your markup and classes, the next step is to create your layouts in CSS

## Step 3: Create Layout Patterns in CSS

You can use any method you want to build your layout patterns in CSS. They include Susy, Neat, Bootstrap's Sass, Flexbox etc. **What you need here is to learn the foundations of the method you're using**.

- For all methods, you need to learn how to write [mobile-first media queries](http://zellwk.com/blog/how-to-write-mobile-first-css/) and [CSS Box Sizing](http://zellwk.com/blog/understanding-css-box-sizing/).
- For Susy, Neat, Bootstrap's Sass, you need to learn about [floats](https://css-tricks.com/all-about-floats/).
- For Flexbox, well, you need to learn about [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

The list goes on and on, but you get the drift.

In this article, I'll use a combination of the above methods to show you that you can build any layout with any method in CSS. I'm going to create:

- `.l-cs` with floats (in plain SCSS) and Susy
- `.l-g3` with floats (in plain SCSS) and Susy
- `.l-fg` with Flexbox

Let's start by going through `.l-cs`

### Creating .l-cs with vanilla SCSS

First of all, we already know the trick to creating layouts with the markup I proposed is to use the `nth-child` pseudo class. You also have to take note to use the direct descendant selector (`>`) to prevent yourself from accidentally selecting other divs within the layout.

```scss
.l-cs {
  > div:nth-child(1) {
    // Content styles
  }

  > div:nth-child(2) {
    // Sidebar styles
  }
}
```

We know that divs take up 100% of the width by default. This means we don't need to add any styles to create the pattern's layout for small screens.

At `600px`, we know that we're going to use floats to make the content takes up 9 of 12 columns while the sidebar takes up 3 of 12 columns. When working with floats, each div in the layout require a `width` property and a `float` property. So the code looks like this so far:

```scss
.l-cs {
  > div:nth-child(1) {
    @media (min-width: 600px) {
      float: left;
      width: 74.57627%;
    }
  }

  > div:nth-child(2) {
    @media (min-width: 600px) {
      float: right;
      width: 23.72881%;
    }
  }
}
```

One more thing. When working with floats, we have add a clearfix to the container element to make sure the container doesn't collapse:

```scss
@mixin clearfix() {
  &:after {
    display: table;
    content: ' ';
    clear: both;
  }
}

.l-cs {
  @include clearfix;

  // ... code from above
}
```

That's it! Not too hard, right? :)

The only tough part here is the `width` calculation in both the content and the sidebar. It's a big headache that most CSS grid libraries like Susy and Neat try to solve.

If we choose to use Susy, we can simplify the above code by using the `span()` mixin to automatically create the properties needed:

```scss
.l-cs {
  @include clearfix

  > div:nth-child(1) {
    @media (min-width: 600px) {
      @include span(9);
    }
  }

  > div:nth-child(2) {
    @media (min-width: 600px) {
      @include span(3 last);
    }
  }
}
```

<p data-height="105" data-theme-id="7929" data-slug-hash="ONjjJK" data-default-tab="result" data-user="zellwk" class="codepen">See the Pen <a href="http://codepen.io/zellwk/pen/ONjjJK/">Content Sidebar Layout with Vanilla SCSS</a> by Zell Liew (<a href="http://codepen.io/zellwk">@zellwk</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Susy makes it much simpler, isn't it?

Let's move on.

### Creating .l-g3 with Susy

The same technique applies when we're creating the 3-column grid. We're going to use the `nth-child` pseudo class and the direct descendant (`>`) to create the layout.

Here, you'll have to start learning some `nth-child` jitsu. CSS Tricks has this [nth-tester](https://css-tricks.com/examples/nth-child-tester/) that can help you level up your `nth-child` skills if you need to.

```scss
.l-g3 {
  > div:nth-child(3n+1) { // Leftmost grid item }
  > div:nth-child(3n+2) { // Center grid item }
  > div:nth-child(3n+3) { // Rightmost grid item }
}
```

Since we're creating the 3-column grid with floats, we already know that we need to add the clearfix even before we work on anything else.

```scss
.l-g3 {
  @include clearfix;
  > div:nth-child(3n+1) { // Leftmost grid item }
  > div:nth-child(3n+2) { // Center grid item }
  > div:nth-child(3n+3) { // Rightmost grid item }
}
```

As before, we already know that a div takes up a width of 100% by default. So, there's no need to write any styles to make the layout pattern right on a small screen. We also know that we need to write `float` and `width` properties at `600px` since we're going to create the grid.

In this case, we need to add a `margin` property to the grid item as well since there are more than two columns.

Here's what the code looks like:

```
.l-g3 {
  @include clearfix;

  @media (min-width: 600px) {
    // Leftmost grid item
    > div:nth-child(3n+1) {
      width: 32.20339%;
      float: left;
      margin-right: 1.69492%;
    }

    // Center grid item
    > div:nth-child(3n+2) {
      width: 32.20339%;
      float: left;
      margin-right: 1.69492%;
    }

    // Rightmost grid item
    > div:nth-child(3n+3) {
      float:right;
      width: 32.20339%;
      margin-right: 0;
    }
  }
}
```

Whoa, this is some scary looking `nth-child` code. Looks complex, plus you have to calculate the damn `margin` and `width` properties correctly. Ngh.

It becomes much simpler if you do this with Susy. You can either choose to use the `span()` mixin, or the `gallery()` mixin.

If you're creating grids, I highly recommend the `gallery()` mixin because it uses the [isolate technique](https://css-tricks.com/build-web-layouts-easily-susy/#article-header-id-4) to reduce subpixel rounding errors. The code with the `gallery()` mixin looks like this:

```scss
.l-g3 {
  @include clearfix;

  > div {
    @include gallery(4 of 12);
  }
}
```

Susy then automatically generates the correct `nth-child` selectors and properties that go within them. Sweet stuff!

Play around with the codepen and take a look for yourself!

<p data-height="104" data-theme-id="7929" data-slug-hash="eZEEJR" data-default-tab="result" data-user="zellwk" class="codepen">See the Pen <a href="http://codepen.io/zellwk/pen/eZEEJR/">3-column Grid Layout with Susy</a> by Zell Liew (<a href="http://codepen.io/zellwk">@zellwk</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

I highly recommend checking out Susy since it makes making grid much simpler.

Ahem. Let's move on.

### Creating .l-fg3 with Flexbox

Creating grids with Flexbox is slightly more difficult compared to creating grids with floats. Let's examine the markup I've decided to use for `.l-fg3` before we continue.

```html
<div class="l-fg3">
  <div>Featured Item</div>
  <div>Featured Item</div>
  <div>Grid item</div>
  <div>Grid item</div>
  <div>Grid item</div>
</div>
```

The first thing to do when creating grids with Flexbox is to add the `flex` property to the container. We also have to set the `flex-wrap` property to `wrap` so our elements can flow onto the second row.

*Note: I'm leaving out vendor prefixes to make the code simpler. Please use [autoprefixer](https://autoprefixer.github.io) to generate these vendor prefixes. It's the best method out there.*

```scss
.l-fg3 {
  display: flex;
  flex-wrap: wrap;
}
```

Once you've done this, you'll notice that flex items take up only their required space:

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-req-space.png" alt="Flex items only take up their required spaces">

  <figcaption>Flex items only take up their required spaces</figcaption>
</figure>

This means we have to force flex items to take up 100% of the width for the mobile layout. There are two methods to doing so. You can either:

1. Set `flex-flow` of `.l-fg` to `column`
2. Set `flex-basis` to of each flex item to `100%`

Let's go with setting `flex-basis` to `100%`. It's easier to understand.

```scss
.l-fg3 > div {
  flex-basis: 100%;
}
```

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-mobile.png" alt="Fixing Flexbox layout for mobile">

  <figcaption>Fixing Flexbox layout for mobile</figcaption>
</figure>

*Note: I added a gray border of 1px here to help you see the boundary of each grid item.*

We're done with setting the mobile layout. Let's move on and create the feature grid at `600px`. Here, we know that there are three grid items on each row. Each grid item should be exactly a third of viewport if there are no spaces between grid items. What we do is to change `flex-basis` to `33.333%`:

```scss
.l-fg3 > div {
  flex-basis: 100%;
  @media (min-width: 600px) {
    flex-basis: 33.333%;
  }
}
```

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-1.png" alt="Three-column featured grid without margins">

  <figcaption>Three-column featured grid without margins</figcaption>
</figure>

The next step is to create spaces between each grid item.

When working with flexbox, you have to split gutters in half and place them on the edges of each grid item. If the space between each item is `20px`, you have to give each grid item a `margin-left` and a `margin-right` of `10px`.

```scss
.l-fg3 > div {
  flex-basis: 100%;
  @media (min-width: 600px) {
    margin: 10px;
    flex-basis: 33.333%;
  }
}
```

Unfortunately, when you look at the layout produced by this code, you'll probably get confused and disappointed :(

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-2.png" alt="Layout gets screwed up because Flex-basis wasn't calculated properly">

  <figcaption>Layout gets screwed up because Flex-basis wasn't calculated properly </figcaption>
</figure>

The layouts are now screwed because `margin`s are added into the flex basis calculation. The full width of 3 grid items then becomes `100% + 60px`, which is bigger than 100%. Hence, browsers have no choice but to make the 3rd item flow onto the next row.

The fix is surprisingly simple. We just have to remove the margins from each grid item with `calc()`:

```scss
.l-fg3 > div {
  // ...
  @media (min-width: 600px) {
    margin: 10px;
    flex-basis: calc(33.333% - 20px);
  }
}
```

And you'll get a normal three-column grid (but with a fixed gutter width of 20px).

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-3.png" alt="three-column-grid with Flexbox">

  <figcaption>three-column-grid with Flexbox</figcaption>
</figure>

Let's make the two featured items next.

We know each featured item is supposed to half up approximately 50% of the width (minus the `20px` space between them). Using the same formula, we can simply switch the `flex-basis` for the first two elements and we'll get the feature grid.

```scss
.l-fg3 {
  // ...
  > div:nth-child(1),
  > div:nth-child(2) {
    @media (min-width: 600px) {
      flex-basis: calc(50% - 20px);
    }
  }
}
```

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-4.png" alt="3-column Feature Grid with Flexbox">

  <figcaption>3-column Feature Grid with Flexbox</figcaption>
</figure>

We're not done yet.

Normally, you wouldn't want the additional `10px` margin on all four sides of the grid. If you want to remove these margins, you can do so with negative margins on the `.l-fg3` container.

```scss
.l-fg3 {
  margin: -10px;
}
```

If you do this, you'll find that you'll be able to scroll to the right. This is something we definitely don't want.

<figure><img src="/images/2016/html-grids-to-css-grids/l-fg-5.png" alt="Negative margins allow users to scroll right">

  <figcaption>Negative margins allow users to scroll right</figcaption>
</figure>

To fix this, you can create a flex container that contains a `overflow-x: hidden` property. This flex container should then wrap `.l-fg` within it:

```html
<div class="l-flex">
  <div class="l-fg">
    <div>Featured Item</div>
    <div>Featured Item</div>
    <div>Grid Item</div>
    <div>Grid Item</div>
    <div>Grid Item</div>
  </div>
</div>
```

```.scss
.l-flex {
  overflow-x: hidden;
}
```

That's it! Who says it's hard to create grids with Flexbox? :)

Oh by the way, I ran through creating creating the grid with Flexbox pretty quickly since it's not the main topic of this article. I hope it's thorough enough though. If you want to find out the mechanics behind creating grids with Flexbox, I suggest you check out [this article](https://www.smashingmagazine.com/2015/12/website-layout-tools-compared-flexbox-vs-susy/).

Let's move on.

## Step 4: Replace Old Markup with New Markup

The final step to the process is to replace your old markup with the new markup. Here, you should also check for any mistakes that you've made in step 3.

Beep. Boop. We're done.

## Wrapping Up

In this article, we learned how to move from a HTML-based grid system (that most frameworks Bootstrap provide) to a CSS-based grid system that we coded up.

To summarize, there are four steps.

1. Identify the layout patterns you have
2. Decide on new markup and classes
3. Create layout patterns in CSS
4. Replace old markup with new markup

Has this article helped you move from a HTML-based grid system to a CSS-based grid system? Let me know in the comments below!
