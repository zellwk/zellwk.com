---
title: Writing modular CSS (Part 1) — BEM
description: How to use BEM and namespacing to create a sensible CSS architecture
layout: post
slug: css-architecture-1
tags:
 - css
 - best
newsletter: better-fed
---

Have you worked on large websites that spans more than a few pages? If you did, you probably realized the horrors of not conforming to a robust CSS architecture. You probably would also have researched on ways to write maintainable CSS.

Since our industry is awesome, we don't only have one recommended solution. Experts have jumped in and provided us with suggestions like BEM, OOCSS, SMACSS, Atomic Design and many others.

Now, instead of suffering from *"I don't know what to do"*, the question becomes: *"there's so many ways. Which should I try?" Should I use everything, only one approach or create a custom architecture from the possible picks out there?*.

I started off with only one approach. Then, as I tried different approaches, I began to include what I thought made sense into my process. In this article, I want to share with you how I structure my CSS and why I do so. Hopefully, it'll help you find your preferred method.

<!--more-->

## What I look for in a good CSS Architecture

I looked for four things when I cobbled together different methodologies to create my convention. They are:

1. I must *instantly know whether it's safe to edit* a class without interrupting other any other CSS. This is most important, especially when I need to make quick changes. I don't want to be afraid of changing cause I'll break something else.
2. I must *instantly know where a class fits in the grand scheme of things* to prevent brain overload. This allows me to style things quickly without referencing back and forth.
3. Classes must *bloat HTML as little as possible* since I switch off when I see a long list of class names.
4. I must *instantly know if a component uses JavaScript* so I don't accidentally break any the component if I changed its classes.

In my search, I found that a combination of **BEM** and **namespacing** fulfills the criteria I look for.

## Starting with BEM

BEM is the foundation to my approach. If you've never heard of BEM before, it stands for `block`, `element` and `modifier`. It looks incredibly ugly when you first feast your eyes on it.

```css
.block { /* styles */ }
.block__element { /* styles */ }
.block--modifier { /* styles */ }
```

I hated BEM to a point where I didn't even give it a chance when I first got to know about it. I can't remember what made me try BEM, but I realized how powerful it is to work with it. Let me explain by going through the entirety of what BEM is (with my modifications, of course).

## Block

A block is a component. It's a little abstract, so let's use examples instead.

Let's say you're building a contact form. In this case, the form can be a block. In BEM, blocks are written as class names, like this:

```css
.form { /* styles */ }
```

The reason BEM uses a `.form` class instead of the `<form>` element is because *classes allow for infinite reusability*, even if the fundamental element should change in style.

Buttons are good examples of blocks that can contain different possible styles. If you set the background color of a `<button>` element to be red, all `<buttons>` are forced to inherit the red background. Following which, you have to fix your code by overwriting your `<button>` elements (and probably end up with broken limbs in the process 🤕).

```css
button {
  background-color: red;
}

.something button {
  background-color: blue; /* 😱 */
}
```

If styled a button with a `.button` class instead, you can choose whether to use the `.button` class on any `<button>` elements. Then, if you need a different background color, all you do is to change to a new class, say `.button--secondary`, and you're good to go!

```css
.button {
  background-color: red;
}

.button--secondary {
  background-color: blue; /* 😄 */
}
```

This brings us to the next part of BEM — modifiers.

## Modifiers

Modifiers are flags that change the appearance of a said block. To use a modifier, you add `--modifier` to the block.

Moving on with the button example from above, the modified button would be named `.button--secondary`.

In traditional BEM, when you use a modifier, you're supposed to *add the block and the modifier* into your HTML so you don't rewrite your `.button` styles in the new `.button--secondary`.

```html
<button class="button">Primary button</button>
<button class="button button--secondary">Secondary button</button>
```

```css
.button {
  padding: 0.5em 0.75em;
  background-color: red;
}

.button--secondary {
  background-color: green;
}
```

Notice how there's no need to redeclare `padding`s in `.button--secondary` because it's already been declared in button? This is sweet since BEM ensures you write DRY CSS without a ton of effort.

However, I don't really like declaring the `.button` class in my HTML since `.button--modifier` already tells me that it's a `.button` with a `--secondary` flag. Ideally, my HTML should look like this instead:

```html
<button class="button">Primary button</button>
<button class="button--secondary">Secondary button</button>
```

It's much cleaner, isn't it?

Unfortunately, without the `.button` class in the HTML, we have to revert back to a non-DRY CSS approach:

```css
.button {
  padding: 0.5em 0.75em;
  background-color: red;
}

.button--secondary {
  padding: 0.5em 0.75em; /* 😱 */
  background-color: green;
}
```

Ugh, anything that's not DRY sucks 😢. But there are two ways to write DRY CSS without the extra HTML bloat!

### Method 1: Use a mixin

The first way, if you use Sass or any other preprocessor, is to *use a mixin to encapsulate all code* that needs to be reused. In our button example, we just need to write `padding` into a mixin. Here, I name the mixin after the block:

```scss
@mixin button {
  padding: 0.5em 0.75em;
}

.button {
  @include button; // 😄
  background-color: red;
}

.button--secondary {
  @include button; // 😄
  background-color: green;
}
```

Hooray! Now we have the best of both worlds!🎉🎉🎉

*But but... what if I don't use Sass?!*

Chill! 😄. The second method I'm about to share uses vanilla CSS, so you can use it too!

### Method 2: Use CSS attribute selectors

This second method *uses CSS attribute selectors* to perform a slightly more complex selection. I'll show you what it is, then explain why this works:

```css
/* 😄 */
[class*='button']:not([class*='button__']) {
  padding: 0.5em 0.75em;
}
```

Now, that's not a selector that you'll normally see anywhere, so let me break it down for you.

The first part (`[class*='button']`) tells the parser to look for all classes that contain the text `button`. (`*=` searches for anything that matches the exact string). Naturally, this means the CSS targets both `.button` and `.button--modifier`. Unfortunately, this also means the selector targets BEM elements as well, which is why the second part comes in.

The second part (`:not([class*='button__'])`) tells the parser to exclude anything that contains `.button__`, which excludes BEM elements. (BEM elements has the `.block__element` syntax).

<p data-height="265" data-theme-id="dark" data-slug-hash="XMaGYb" data-default-tab="html,result" data-user="zellwk" data-embed-version="2" data-pen-title="XMaGYb" class="codepen">See the Pen <a href="http://codepen.io/zellwk/pen/XMaGYb/">XMaGYb</a> by Zell Liew (<a href="http://codepen.io/zellwk">@zellwk</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

🎉🎉🎉

(NOTE: I don't use method 2 anymore since it adds unnecessary specificity to the `[class*='button']`. If you choose to write modifiers like me, I highly suggest the first approach with mixins).

### Dislike BEM for the fugly syntax?

You may dislike BEM for the fugly `--modifier` syntax. I can see why. I loathed it too.

But now, I've come to love the syntax because *I suck at naming things.* Sometimes, I find the need to write BEM block or element uses more than a word. An example is `inner-section`.

If I used `-modifier` instead (as some methods suggest), it'll be impossible for me to tell at a glance if `-section` was a modifier. It'd be a false positive. Likewise, I won't be able to immediately know whether `.button-secondary` is a modifier too!

It's ironic, but the fugliness made my code cleaner and more maintainable. So highly recommend you try it out too :)

Let's move on to the third essential part of BEM — Elements.

## Elements

Elements are children of a block. To say that something is an element, you add `__element` to the block name. So, if you see a class that says .`form__row`, you'll immediately know that there's a `row` element within the `.form` block.

```html
<form class="form" action="">
  <div class="form__row">
    <!-- ... -->
  </div>
</form>
```

```css
.form__row { /* styles */ }
```

There are *two advantages to BEM elements*:

1. You can keep CSS specificity relatively flat.
2. You immediately know if something is a child element.

To see why, consider the alternate approach of using two separate classes (that many frameworks do). You'll probably use something like:

```html
<form class="form" action="">
  <div class="row">
    <!-- ... -->
  </div>
</form>
```

```css
.form .row { /* styles */ }
```

If you use BEM elements, you can style `.form__row` with a specificity of 10 instead of 20. Also, you can immediately tell (both in the HTML and CSS) that `.form__row` is a child of `.form`.

(By the way, if you haven't gotten over the ugliness of the `__element` syntax, wait till you see snake case classes when you use a third party plugin 😛)

Moving on, there's one thing you need to know about BEM elements. You **should never chain BEM elements**. If your classes ends up like `.form__row__input`, you're doing something terribly wrong. (I did that when I started so don't feel too bad about yourself! 🤗).

There are two ways of getting around long BEM children chains. They are:

1. Chain grandchildren elements to the block whenever it makes sense
2. Create new blocks to hold elements

### Chaining grandchildren elements to the block

Although BEM recommends you to use write BEM elements as `.block__element`, it doesn't dictate how your HTML should be. So, whenever it makes sense to, you can chain your grandchildren elements to the block.

Here's an example. In the code below, you'll see that `.article__header` is a child to `.article`. `.article__title` is a grandchild to `article` (or a child of `.article__header`. There are no conflicts if you signify them both as a child of `.article` since they'll be used together in this form anyway.

```html
<article class="article">
  <header class="article__header">
    <h1 class="article__title"></h1>
  </header>
</article>
```

Although this works, you'd also encounter situations where it just doesn't make sense to chain grandchildren elements. Take for example:

```html
<section class="comments">
  <h2 class="comments__title"></h2>
  <article class="comments__comment">
    <h3 class="comments__comment-title"></h3>
  </article>
  <article class="comments__comment">
    <h3 class="comments__comment-title"></h3>
  </article>
  <!-- ... -->
</section>
```

Uhh?

This is where you'll want to create new blocks to hold grandchildren elements.

### Creating new blocks to hold grandchildren elements

In the situation above, you can easily break `.comments__comment` down into `.comments` and `.comment`:

```html
<section class="comments">
  <h2 class="comments__title"></h2>
  <article class="comment">
    <h3 class="comment__title"></h3>
  </article>
  <article class="comment">
    <h3 class="comment__title"></h3>
  </article>
  <!-- ... -->
</section>
```

Makes more sense, doesn't it? If you do this, just make sure to place both `.comments` and `.comment` blocks in the same file for easy reference.

Unfortunately, sometimes it's not as straightforward as `.comments__comment`. For example, let's say you have a list element within a block.

```html
<div class="block">
  <ul class="block__list">
    <li class="block__item">
      <!-- how would you name this class? -->
      <h3 class="???????"></h3>
    </li>
    <!-- ... -->
  </ul>
</div>
```

If you noticed, I have already chained `.block__item`, which is a grandchild to `.block`. It doesn't make sense any further to chain children within `.block__item` to `.block` or I might end up with some mangled context.

Yet, at the same time, since they are used together, it doesn't really make sense to create a new block for `.block__list` or `.block__item`. What would you name it to keep it in context?

In this case, I default to creating a pseudo block called `.item` for `block__item`. Take a look at the HTML below.

```html
<div class="block">
  <h3 class="block__title"></h3>
  <ul class="block__list">
    <li class="block__item">
      <h3 class="item__title"></h3>
    </li>
    <!-- ... -->
  </ul>
</div>
```

A pseudo block, as it's name suggests, is pseudo. There's no actual declaration of `.item` in the HTML above. However, there are elements chained to `.item` within `.block__item` where the pseudo block lives.

In my CSS (Sass), I nest `.item` elements within `.block__item`, which gives it the required context.

```scss
.block__item {
  .item__title {
    /* styles... */
  }
}
```

You may say, *"but that's breaking BEM convention!"*. That's true, but read the [next article](/blog/css-architecture-2). You'll see why I do this 😉.

Next, there's one more thing I add to BEM for my use case — containers.

## Containers

Sometimes (many, actually), I run into situations where I had to bleed the background color of a section while ensuring everything else is aligned, like this:

<figure><img src="/images/2017/css-architecture/container.png" alt="Image of a block that contains a background that bleeds out of it">
  <figcaption>The greyish background bleeds out of alignment</figcaption>
</figure>

If you're familiar with building layouts, you'll structure your HTML with something like this:

```html
<section>
  <div class="l-wrap">
    <div class="block">
      <!-- ... -->
    </div>
  </div>
</section>
```

The question is, what should you name the block container? Or in this case, the `<section>` element. My default approach is to name in `block-container`. I only use `-container` for instances like this, so I feel it's still acceptable. Do you have a better idea?

(Btw, see the `.l-` in `.l-wrap`? That's namespacing. I'll share more about it in the [next article](/blog/css-architecture-2)).

## Wrapping up

So, that's how I use BEM in a nutshell. If you paid attention to the criteria I set above, you'd notice that I checked only two checkboxes:

2. Classes must *bloat HTML as little as possible*.
1. I must *instantly know where a class fits in the grand scheme of things* to prevent brain overload.

The other two checkboxes aren't fulfilled yet:

2. I must *instantly know if the component uses JavaScript*.
1. I must *instantly know whether it's safe to edit* a class without interrupting other any other CSS.

These two checkboxes will be checked in the [next article](/blog/css-architecture-2) when I discuss *namespacing*.

What are your thoughts? Did you learn something new? Is sharing my process any useful? I'd love to hear what you think in the comments below.
