---
title: Writing modular CSS (Part 2) — Namespaces
description: Are you afraid of breaking your website when you change CSS? Here's how to overcome it with namespaces.
layout: post
slug: css-architecture-2
tags:
 - css
newsletter: better-fed
---

Last week, I shared how I use BEM to create a sensible CSS architecture. Although BEM is awesome, it's only part of the solution. There's another part I've yet to mention — namespaces.

In this article today, I want to share with you why BEM isn't enough and how I use namespaces to bridge the gap.

<!--more-->

## Why BEM isn't enough

The examples I showed you [last week](/blog/css-architecture-1) were pretty simple. I only showed you how to deal with different modifiers and children (or grandchildren) elements within a single block. What happens if there's more than one block?

Things get a little more complicated. Let's use a site-wide navigation to illustrate the relationship between two blocks.

```html
<nav class="main-nav">
  <a href="#">Home</a>
  <button class="button">Menu</button>
</nav>
```

Awesome. Now there are two blocks. One called `.main-nav` while the other is called `.button`. `.button` exists within `.main-nav`.

Let's say you want to change the button color from blue to green. You also want to add some padding to the left of `.button` so it separates itself from the `home` link.

The question is, how should you write the CSS code? Here are a few possible answers:

1. Add both `margin` and `background-color` to `.main-nav .button`.
2. Add both `margin` and `background-color` a `button--modifier`.
3. Add `margin` to `.main-nav .button` and `background-color` a `button--modifier`.
4. Add `margin` to `.main-nav a` and `background-color` a `.main-nav .button`.
5. Add `margin` to `.main-nav a` and `background-color` a `button--modifier`.

Which one makes sense? How do you ensure every developer on your project feels the same way?

Even if all your developers are clones of you (and therefore think the same way), how do you know if you did not introduce a side effect (that broke another part of the site)? 😱😱😱.

Honestly, it's hard to guarantee! There are too many possible factors that are open to interpretation if we only BEM.

This is where namespaces come in. It helps you *create a structure that governs how CSS properties get written*. If you follow the convention, you'll be able to write CSS without being afraid of side effects.

Here's an example.

Let's say I switched the code above to one with namespaces. The HTML will be completely the same (less a few class prefixes). Pay special attention to `.o` and `.c` prefixes in this example:

```html
<nav class="c-main-nav">
  <a href="#">Home</a>
  <button class="o-button">Menu</button>
</nav>
```

What does `.o-` and `.c-` say? From this code, I know I can change the color of `.o-button` if I want to, but I shouldn't add any margins to `.o-button`.

How? Well, I'll have to explain these namespaces, so let's dive right in :)

## The namespaces I use

Here's a list of namespaces I use:

1. `.l-`: layouts
2. `.o-`: objects
3. `.c-`: components
4. `.js`: JavaScript hooks
5. `.is-`|`.has-`: state classes
6. `.t1`|`.s1`: typography sizes
7. `.u-`: utility classes

Let's dive into what each namespace is, and what its supposed to do.

Before moving on, if you remain unconvinced about namespaces, I highly recommend you to check out Harry Robert's [more transparent ui code with namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/). (Fun fact: Harry's inspired me to use namespaces).

If you read his article, just note that I namespace differently from Harry. (I'll share what's different when we come to it).

With that, let's jump into the first namespace — layouts.

## Layouts with .l-

I'm pretty sure you've heard of [Object Oriented CSS](https://github.com/stubbornella/oocss/wiki) (OOCSS) by [Nicole Sullivan](https://twitter.com/stubbornella). If you have yet to dive into it, the main idea behind OOCSS is the *separation of skin and structure*. In other words, *properties that affect the position of a block or its elements should be abstracted into a separate class for reusability*.

In CSS, the act of positioning a block is also called laying out the block. In a general sense, positioning is given the term **layout**.

Maybe it's just a happy coincidence (just maybe 😉), but [Jonathan Snook](https://twitter.com/snookca) recommends a `.l-` prefix for layout rules in [SMACSS](https://smacss.com). These two paradigms share the same principles when it comes to layouts. As such, I happily stole `.l-` from SMACSS as the layout namespace.

Since you understand the origins of the namespace, it probably helps you understand how it's used as well. When it comes to layouts, I split layouts into two different categories — **global layouts** and **block-level layouts**.

### Global layouts

Global layouts are layouts that are applied globally on all pages. (Duh 😑). In my use case, they are usually big grid containers that are used everywhere. An example is the `.l-wrap` class:

```scss
// I like to write in Sass :)
.l-wrap {
  padding-left: 1em;
  padding-right: 1em;

  @media (min-width: 1000px) {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

I'll use this `.l-wrap` class everywhere, like in the header and footer to align content:

```html
<div class="site-header">
  <div class="l-wrap">
    <!-- stuff -->
  </div>
</div>

<div class="site-footer">
  <div class="l-wrap">
    <!-- stuff -->
  </div>
</div>
```

Since these classes are used globally, I prefer to write them in a `_layouts.scss` partial.

### Block-level layouts

Each block (either object or components, as we'll discuss later) may have its own layouts. Through personal experience, I discovered that these layouts are often independent of the global layout.

Let me give you an example.

When I created the website for [Mastering Responsive Typography](https://mastering-responsive-typography.com), I added a payment form that looks like the following:

<figure><img src="/images/2017/css-architecture-2/mrt-form-main.png" alt="Payment form on Mastering Responsive Typography">
  <figcaption>Payment form on Mastering Responsive Typography</figcaption>
</figure>

In the design above, you can see that the form contains two rows of input elements. There are two equal-sized input fields in the first row, and two input fields of different sizes in the second row.

To differentiate between the three different input sizes, I've opted to use a layout prefix:

```html
<form class="form l-form" action="#">
  <div class="form__row">
    <div class="form__item l-form__item"></div>
    <div class="form__item l-form__item"></div>
  </div>
  <div class="form__row">
    <div class="form__item l-form__item--large"></div>
    <div class="form__item l-form__item--small"></div>
  </div>
  <!-- ... -->
</form>
```

Did you notice how I kept the BEM implementation even to layouts as well? This makes things much clearer for me. You can immediate see where my CSS would go to. It's incredibly clear.

```css
.l-form {/* container styles */}
.l-form__item {/* half-width styles */}
.l-form__item--large {/* larger-width styles */}
.l-form__item--small {/* smaller-width styles */}
```

Since `.l-form`, `.l-form__item`, `.l-form__item--small` and `.l-form__item--large` has nothing to do with other blocks, I write these classes in `_form.scss` to keep context.

By the way, some people disagreed with my thoughts on removing `.block` when `.block--modifier` is present in my [previous article](/blog/css-architecture-1). Well, watch what happens if you insert all the "required" BEM classes in this case, you'll notice the "HTML starts to bloat":

```html
<form class="form l-form" action="#">
  <div class="form__row">
    <div class="form__item l-form__item"></div>
    <div class="form__item l-form__item"></div>
  </div>
  <div class="form__row">
    <!-- This HTML starts to get looooong 😢 -->
    <div class="form__item l-form__item l-form__item--large"></div>
    <div class="form__item l-form__item l-form__item--small"></div>
  </div>
  <!-- ... -->
</form>
```

One final note: Harry uses the object namespace (`.o-`) to signify structural layouts like this. I just group them into `.l-` and use `.o-` for something else.

With that, let's move on to objects (my version 😜).

## Objects with .o-

*Objects* (`.o-`) *are the smallest building blocks of a website*. Consider them to be Lego blocks where you can *copy-paste anywhere* in your website. If you've heard of [Atomic Design](http://atomicdesign.bradfrost.com) by [Brad Frost](https://twitter.com/brad_frost), consider objects to be a *hybrid of elements and molecules*.

Objects have the following properties:

1. Objects uses the `.o-` prefix
2. They *cannot contain other objects or components*.
3. They *are context independent*.
4. Certain objects can ignore the `.o-` prefix when it makes sense.

### Objects cannot contain other objects or components

Objects can be small or large. The number of HTML elements within the object isn't relevant. Let me explain.

For example, buttons are objects. They're small and they can be placed anywhere. It's quite self-evident:

```html
<a href="#" class="o-button">A button</a>
```

An example of a larger object is the countdown timer I built for Mastering Responsive Typography:

<figure><img src="/images/2017/css-architecture-2/obj-countdown.png" alt="Example of a large object">
  <figcaption>Example of a large object. Still considered an object since it contains neither objects nor components</figcaption>
</figure>

The HTML of the countdown timer is:

```html
<div class="o-countdown jsCountdown">
  <div class="o-countdown__inner">
    <span data-token="days">1</span>
    <span>day</span>
  </div>
  <div class="o-countdown__inner">
    <span data-token="hours">21</span>
    <span>hours</span>
  </div>
  <div class="o-countdown__inner">
    <span data-token="minutes">41</span>
    <span>minutes</span>
  </div>
  <div class="o-countdown__inner">
    <span data-token="seconds">50</span>
    <span>seconds</span>
  </div>
</div>
```

Notice `.o-countdown` contains three layers of HTML elements. It's huge, but it's still an object since there isn't any other objects or components in it. The *actual number of elements* within the `.o-countdown` *is irrelevant* because all inner elements can only exist when there's `.o-countdown`.

### Objects are context independent

When I say objects are context independent, I mean they *don't know where they're used*. You could pick any object up, throw it somewhere else and it won't break the structure of your site.

This also means objects *should not change any structure outside* itself. So, object blocks cannot contain any of these properties/values:

1. `absolute` or `fixed` position.
2. `margin`.
3. `padding` (unless you have a `background-color` applied. In this case, it doesn't interrupt break the alignment outside the object).
4. `float`.
5. etc...

Since you know objects need to be context independent, you immediately know the `.button` in our site-wide navigation example earlier cannot contain any margins.

Here's an example of a typical `.o-button` object in my stylesheets:

```css
/* Check back to the previous article if you don't understand this whacky selector. */
[class*='o-button']:not([class*='o-button__']) {
  display: inline-block;
  padding: 0.75em 1.25em;
  border-radius: 4px;
  background-color: green;
  color: white;
  font-size: inherit;
  line-height: inherit;
  transition: all 0.15s ease-in-out;
}
```

Although objects cannot affect external structure, it can change it's internal structure as it sees fit. For example, the `.o-countdown` timer I mentioned could have the following HTML and CSS:

```html
<div class="o-countdown l-countdown jsCountdown">
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="days">3</span>
    <span>days</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="hours">20</span>
    <span>hours</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="minutes">57</span>
    <span>minutes</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="seconds">33</span>
    <span>seconds</span>
  </div>
</div>
```

```css
.l-countdown {
  display: flex;
}

.l-countdown__inner {
  /* Do as you please, maybe? */
}
```

The bottom line is, you can freely style an object as long as it doesn't affect anything outside. (Also, make sure you don't accidentally add `padding` and make it look misaligned).

### Certain objects can ignore the .o- prefix when it makes sense.

Whoa, are we breaking the rules already? Heck yes! 😈.

It just doesn't make sense for some objects to contain the `.o-` prefix (or even a class for that matter) since they're used so much. One such example is the input element:

```html
<input type="text">
```

Sure, you can tag a class to the input if you want, but what happens if you can't access the `input` element to give it a class? Instead of modifying input classes, I'll do this:

```scss
@mixin input {
  padding: 0.5em 0.75em;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
}


input[type="text"],
input[type="email"],
input[type="textarea"] {
  @include input;
}

// ...
```

Another example of objects I feel shouldn't require an `.o-` prefixes are typefaces. They get special treatment (as I'll explain later). Feel free to disagree on this point though.

### Objects in summary

Objects (`.o-`) are the *smallest building blocks of a website*. They have the following properties:

1. Objects uses the `.o-` prefix.
2. They *cannot contain other objects or components*.
3. They *are context independent*.
4. Certain objects can ignore the `.o-` prefix when it makes sense.

Let's move on to components

## Components with .c-

If objects are the smallest build blocks, *components are larger building blocks* that you can use throughout your site. If you've read Atomic Design, consider components to be organisms. (Except this organism can contain other organisms 😉).

Components have the following properties:

1. Components uses a `.c-` prefix.
2. Components *can contain other objects and components*.
3. Components are *context aware*.

Let's dive into the properties and I'll supplement you with much-needed examples 😜.

### Components can contain other objects and components

Let's go back to the form I described where I talked about layouts. It's the perfect example of a component.

<figure><img src="/images/2017/css-architecture-2/mrt-form-main.png" alt="Payment form on Mastering Responsive Typography">
  <figcaption>Payment form on Mastering Responsive Typography</figcaption>
</figure>

Earlier, I mentioned the following HTML:

```html
<form class="form l-form" action="#">
  <div class="form__row">
    <div class="form__item l-form__item"></div>
    <div class="form__item l-form__item"></div>
  </div>
  <div class="form__row">
    <div class="form__item l-form__item--large"></div>
    <div class="form__item l-form__item--small"></div>
  </div>
  <!-- ... -->
</form>
```

I actually omitted a lot of code to make it reasonable to look at in the layouts section. If we dig deeper, you'll see there are `input` and `.o-button` objects.

```html
<form class="c-form l-form" action="#">
  <div class="c-form__row">
    <div class="c-form__item l-form__item">
      <label for="fname">
        <span>First Name</span>
        <input type="text" id="fname" name="fname">
      </label>
    </div>
    <!-- ... the email input item -->
  </div>
  <!-- ... other form_rows -->
  <div class="c-form__row">
    <button class="o-button c-form__button">Buy Mastering Responsive Typography!</button>
  </div>
</form>
```

See how `.c-form` contains other objects now? :)

### Components are context aware (usually)

Components are large enough that you want to take special care about positioning them in different places. For example, this `.c-form` component can either be placed in a *full-width* or *sidebar* context.

Here's what the form looks like in a sidebar context:

<figure><img src="/images/2017/css-architecture-2/mrt-form-sidebar.png" alt="Form component in a sidebar context">
  <figcaption>Form component in a sidebar context</figcaption>
</figure>

Immediately, you can see three things are altered:

1. Label gets hidden
2. layout of `input` and `o-button` objects becomes full-width
3. `Font-size` and `line-height` of text becomes smaller on button objects.

The HTML for this altered form can be:

```html
<form class="c-form--sidebar l-form--sidebar" action="#">
  <div class="c-form__row">
    <div class="c-form__item l-form__item">
      <label for="fname">
        <span>First Name</span>
        <input type="text" id="fname" name="fname">
      </label>
    </div>
  </div>
  <!-- ... the email input row -->
  <div class="c-form__row">
    <button class="o-button c-form__button">Buy Mastering Responsive Typography!</button>
  </div>
</form>
```

And the respective (S)CSS changes are:

```scss
.l-from--sidebar {
  .l-form__item { /* change to full width style */}
}

.c-form--sidebar {
  label {
    // http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
    @include is-invisible;
  }

  .c__button {
    font-size: 16px;
    line-height: 1.25;
  }
}
```

One more thing. Notice I mixed an object and component class in `.c-form__button`? This is called a [BEM mix](https://en.bem.info/methodology/key-concepts/#mix), which allows me to style an object with the component's class without affecting the original button.

### Components in summary

Components (`.c-`) are the *larger building blocks of a website*. They have the following properties:

1. They use the `.c-` prefix.
2. They *can contain other objects or components*.
3. They *are context aware*.

Let's move on to the next namespace

## JavaScript hooks with .js

*Javascript hooks* (`.js`) *indicate if an object/component requires JavaScript*. An example is the countdown timer I mentioned earlier:

```html
<div class="o-countdown jsCountdown">
  <!-- ... -->
</div>
```

The great thing about using JavaScript namespaces is that you can separate JS functionality from styles, which makes them much easier to maintain.

For example, the `.jsCountdown` class you've just seen tells me immediately that `.o-countdown` requires JavaScript to work properly. If there's a need to change `o-countdown` to `c-countdown` sometime in future, I can do so without worrying about breaking any JS functionality.

JavaScript hooks are pretty straightforward, so let's move on.

## State classes with .is- or .has-

*State classes indicate the current state of the object/component*. When a state class is applied, you immediately know if an object/component has a dropdown (`.has-dropdown`) or is currently in the opened state (`.is-open`). These lovely classes came from SMACSS (if you were wondering).

When you style state classes in your CSS, I suggest you keep the styles as close as possible to the object/component in question. For example:

```scss
// Sass
.object {
  &.is-animating { /* styles */}
}
```

If you don't use Sass, you can also opt to write your CSS this way:

```css
.object.is-animating { /* styles */ }
```

You probably know about state classes since they've been introduced long ago by Jonathan. I shall not bore you further :)

Let's move on.

## Typography classes with .t or .s

One best practice in typography is to use only a handful of styles (sizes, typefaces, etc) on a webpage. Now, you're probably writing typography styles in headings `<h1>` to `<h6>` like this:

```css
h1 { /* styles */ }
h2 { /* styles */ }
h3 { /* styles */ }
h4 { /* styles */ }
h5 { /* styles */ }
h6 { /* styles */ }
```

This is great for a start if your website is simple, without the need to use the same heading styles for multiple objects/components.

What if, for instance, you have a navigation with links that are styled exactly like your h5?

Do you do this?

```html
<!-- No! Don't do this! -->
<nav class="c-nav">
  <h5><a href="#">Link</a></h5>
  <h5><a href="#">Link</a></h5>
  <h5><a href="#">Link</a></h5>
</nav>
```

Obviously not. A better way is to change your CSS. So, maybe this?

```css
nav a {
  font-size: 14px;
  line-height: 1.25;
}
```

Although the CSS version is slightly better, you no longer have one source of truth when it comes to typography styles. It's only a matter of time before you end up with 30 different combinations...

Here's one potential solution.

Instead of just styling `<h1>` - `<h6>`, you can create classes `.h1` to `.h6` to apply to your HTML, like this:

```html
<nav class="c-nav">
  <a class="h5" href="#">Link</a>
  <a class="h5" href="#">Link</a>
  <a class="h5" href="#">Link</a>
</nav>
```

I like the simplicity of this solution where there's one source of truth for typography. You'll always be able to tell the number of different typography sizes in your website by just visiting a `_typography.scss` file.

Now, although the `.h1` - `.h6` class solution is great, I highly recommend against going with `.h1` - `.h6` for your classes, simply because they're implicitly tied to `<h1>`-`<h6>` objects.

What happens if you have a `<h2>` element, but instead decide to style it with `.h3`? Another developer who takes over your codebase might experience an initial dissonance they go *"why is* `.h3` *doing with* `<h2>`*?!"*

So, instead of `.h1` to `.h6`, I give typography classes *different prefixes*, depending on whether they're *larger or smaller than my base font-size*. Here's an example:

- `.t1` - largest font-size.
- `.t2` - second largest font-size.
- `.t3` - third largest font-size.
- `.s1` - first font-size smaller that base font-size.
- `.s2` - second font-size smaller that base font-size.
- ...

These five classes are typically everything I need for every project (so far). The good thing about such a convention is that I'm able to tell the size of an element at a glance. In the example below, I know for sure this link is one size smaller than my base font-size.

```html
<nav><a class="s1" href="#" >Link</a></nav>
```

Now, what happens if you don't have control over your HTML, but want to include the typography class sizes nevertheless?

For this scenario, I'd recommend creating and using mixins, like this:

```scss
@mixin s1 {
  font-size: 14px;
  line-height: 1.25
}

h1,
nav a {
  @include s1;
}
```

One final thing before we move on. Pay special attention to this.

Typography classes are *subsets of objects*. You should *apply the same set of rules to typography classes as you would to objects*. This means you should not add `margin` or `padding` to typography classes, for example. Instead, these `margin` or `padding` should be added directly to components. (Read Harry's [managing typography on large apps](https://csswizardry.com/2016/02/managing-typography-on-large-apps/) to understand why I recommend this).

Let's move on.

## Utility classes with .u-

*Utility classes are helper classes that perform one thing extremely well*. They do it so well, *they override everything else*. As such, they often only contain one property, and they include the `!important` declaration.

For example:

```css
.u-text-left { text-align: left !important; }
.u-text-center { text-align: center !important; }
.u-text-right { text-align: right !important; }

.u-hide-st-med {
  @media (max-width: 599px) {
    display: none !important;
  }
}

.u-hide-bp-med {
  @media (min-width: 600px) {
    display: none !important;
  }
}
```

The classes I just stated here are almost everything I ever use for utilities. I've never found a need to go beyond these classes.

Phew. It's about time I shut up and let you get back to work/play/study or whatever you're doing, so let's wrap up.

## Wrapping up

In this article, I've shown you how I use namespaces to fill the gap that BEM left out. With the inclusion of namespaces, I've finally fulfilled all four criteria that I look for in a good architecture:

1. Classes must *bloat HTML as little as possible*.
2. I must *instantly know if the component uses JavaScript*.
3. I must *instantly know whether it's safe to edit* a class without interrupting other any other CSS.
4. I must *instantly know where a class fits in the grand scheme of things* to prevent brain overload.

In short, I use a total of seven different namespaces. They are:

1. `.l-`: layouts
2. `.o-`: objects
3. `.c-`: components
4. `.js`: JavaScript hooks
5. `.is-`|`.has-`: state classes
6. `.t1`|`.s1`: typography sizes
7. `.u-`: utility classes

Each namespace has a function to play within the grand scheme of things, which further reinforces hierarchy within the stylesheet.

Up next, I'll share with you how when to break these rules I've just set (*"huh? Again?! You really like breaking the rules huh?"* 😅) and how I organize my CSS files.

For now, I'm curious to hear your thoughts. What do you think of the namespaces I use? Is my 'go-against-the-expert-namespaces' use of `.o-` and `.c-` helpful/useful for you? Or does it confuse you even more? I'd love to hear what you think in the comments below :)
