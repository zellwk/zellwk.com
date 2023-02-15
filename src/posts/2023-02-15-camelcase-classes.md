---
layout: post
title: Why Camel Case class names are way better than kebab-case class names
slug: camelcase-classes
tags: ['css', 'css-architecture']
---

I found a better way to write classes as I dove into my latest project. This approach is much better than BEM and I'm excited to share it with you today.

**Long story short: The better way is to use write classes with a camelCase syntax.**

<!-- more -->

Now before you label me as a JavaScript dude who's trying to make CSS more like JavaScript, hear me out.

- I started my career more of a CSS guy and I love CSS.
- I have no intentions of defacing CSS, so I'm definitey not coming from the point where CSS sucks.
- I'm coming from a point of bettering the systems we have — which is a constant I've been doing for most of my programming life.

And today, I write this post because I truly feel that camelCase classes is better than traditional kebab-case classes — especially when you're using the BEM write modular CSS.

First, let's recap what BEM is.

## The Traditional BEM

BEM stands for Block, Element, Modifier.

- Block is the name of the component itself
- Elements are children inside the component
- Modifiers can be used to modify the base styles we give the block or element.

**Traditionally, BEM is written with the following format:**

- Block: The component is kebab-case like: `block`
- Element: The block, followed by two underscores, then the element: `block__element`
- Modifier: The block or element, followed by two dashes, then the modifier: `Block--modifier` or `block__element--modifier`

So it looks like this when used with classes:

<!-- prettier-ignore -->
```css
.block { } /* The component */
.block__element { } /* Children */
.block--modifier { } /* Modifying a block */
.block__element--modifier { } /* Modifying an element */
```

If you're new to BEM, here's an [article](https://zellwk.com/blog/css-architecture-1/) that will bring you up to speed.

**Now, this old BEM system may have been exceptional in the past** because it ensures we don't style another component's elements and modifiers by mistake. **But it's a system that was created a long time ago** and it doesn't take into account the best practices we have today.

For instance, many of us now write utility plugins on top of traditional BEM, thanks to Tailwind's influence. (Which is honestly a great invention even though I'm not a big fan of using it wholesale, but that's a story for another day).

Think about it for a minute.

How would you add utility classes to BEM without breaking the contention?

Well, the simplest way is to add a `u-` prefix before the class (like what I've done [here](/blog/css-architecture-2/)), which looks like this:

<!-- prettier-ignore -->
```css
.u-block__element--modifier {}
```

Ugh. If you're shuddering about writing this kind of class names, I understand. That's because I shudder too.

I recommended it in the [past](/blog/css-architecture-2/) because I didnt have a better system. And the world didn't have a better system either.

**But today, we don't have to use the old ugly BEM system because the new one I'm introducing is going to look much better.**

Let me share it with you right now.

## The new BEM System — camelCased BEM

The new BEM system uses primarily cameCased class names. We're going to write BEM this way:

- **Block**: PascalCase the block (which is just camelCase beginning with a capital letter), like: `Block`.
- **Element**: camelCase, like: `element`
- **Modifier**: camelCase with a `m` for modifier, like: `.mModifier`

<!-- prettier-ignore -->
```css
.Block {} /* The component */
.element {} /* Children */
.mModifier {} /* Modifying a block or element */
```

This doesn't look like much on first glance, but there are major benefits.

1. The block looks like components in major frameworks
2. It's much more readable
3. It's super extendable
4. We can stack modifiers and utility classes
5. Naming components becomes infinitely easier

Let's explore these five benefits together.

### Benefit 1: It looks like Components in major frameworks

If you build components with Svelte, Vue, or React, you would know that we typically write the component in PascalCase.

<figure role="figure">
  <img src="/images/blog/camelcase-classes/components.png" alt="Image of a folder of components. Each item is written PascalCase." loading="lazy">
</figure>

The new BEM syntax simply follows the PascalCase convention for blocks because we don't have to translate the component between PascalCase and kebab-case.

When we don't have to translate the component between PascalCase and kebab-case, there's less energy wastage and we have more energy to focus on things that matter like ..., making a great site and writing great code.

### Benefit 2: It's much more readable

Let's go through an example and you'll see why camelCase BEM is much more readable that kebab-case BEM.

Look at the code below. Which one looks easier to understand?

```html
<!-- Traditional BEM -->
<h2 class="u-text-center u-center">some text here</h2>

<!-- camelCase BEM -->
<h2 class="uTextCenter uCenter">some text here</h2>
```

You can see the new BEM way is much easier to understand because we instinctively know there are two utility classes.

The old BEM way looks very complex — almost as if we have to deal with 5 classes (even though we know there's only two upon closer inspection).

Why does that happen?

Well, I have a theory that we subconsciously relate dashes, underscores, and spaces together because they are all separators of some sort. So when we see `-` or `_` or spaces, we subconsciously think that the next item is separate from what comes before.

But we don't think like that with camelCase because the words are joined together (and this is related to a design principle known as proximity).

This is why camelCase class names are more readable than traditional BEM class names.

### Benefit 3: It's super extendable

Did you notice I added `u` to create utility classes in the example above?

Yes? That's great! Now the utility classes feel natural to the syntax doesn't it? It's not like some extra thing that we brute force into the system.

This means we can extend the camelCase BEM system to include other classes for typography, icons, and even container classes.

Here's an example:

- Typography classes: prefix with `t`
- Icons: prefix with `i`
- Containers: Add a `Container` suffix

<!-- prettier-ignore -->
```css
.tStylish {} /* Typography class */
.iStar {} /* Icon class*/
.iStarContainer {} /* Container class */
```

Container classes are extremely useful when using Container Queries — it's one of the biggest best practices I discovered while using it for a new project.

I'll talk about it some day.

Today, we have to focus on this new system.

### Benefit 4: We can compose classes

As I've shown above, it's easy to add compose utility classes together.

```html
<h2 class="uTextCenter uCenter">some text here</h2>
```

This also means we can compose blocks and modifiers together in a single class.

Let me give you an example to illustrate this point. Let's say you have two types of backgrounds:

1. Color backgrounds
2. Pattern backgrounds

What we can do is create `Background` block and `color` and `pattern` modifiers. We can then compose these two backgrounds along with the relevant patterns or colors as necessary.

```html
<div class="Background mColor RadialYellowGreen"></div>
<div class="Background mPattern CometRain"></div>
```

This HTML is like a work of art — super readable and easy to understand.

In the CSS, we can style each of these classes without repeating styles.

<!-- prettier-ignore -->
```css
.Background { /* ... */ }
.Background.mColor { /* ... */ }
.Background.mPattern { /* ... */ }
.RadialYellowGreen { /* ... */ }
.CometRain { /* ... */ }
```

Here's a simple example:

```css
/* Styling the background */
*:has(> .Background) {
  position: relative;
}

.Background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

/* Styling the modifiers */
.Background.mColor {
  z-index: -3;
}

.Background.mPattern {
  z-index: -2;
}
```

Pay attention to the modifiers here. Notice I stacked them in the CSS like `.Background.mColor` and `.Background.mPattern`?

This is important because of a few reasons:

1. Modifiers don't make sense on their own so they should always accompany what they're modifying.
2. The increased specificity ensures that modifiers will always modify the block (or element) — and we don't have to depend on the order of the classes written in the CSS.

At this point it makes sense to talk about styling elements too.

When we style elements, we want to use direct descendant selectors whenever possible.

<!-- prettier-ignore -->
```css
.Block > .element { /* ... */ }
```

We do this because we don't want to spillover styles from one Block from another — especially if we're using the same element name.

Here's an example.

```html
<div class="Block">
  <div class="content">
    <div class="SomeOtherBlock">
      <div class="content">...</div>
    </div>
  </div>
</div>
```

Using `.Block > .content` prevents `.Block .content .content` from being styled by mistake. That's why we want to use direct descendents whenever we can.

### Benefit 5: It becomes much easier to name components

In the old BEM, we are hard-pressed to use a single word to represent our block, so we had to get super creative when naming our components.

I imagine this is what happened when Nicole Sullivan coined the `.media` block which had become the staple example for the industry — she has no choice but to get creative. (This is also why today we have generic class names like Card, which basically means some sort of enclosure).

Although it's good to have common class names, but as you code, you'll soon discover that you'll run out of clever single-word names pretty soon — and this is why we complain and say naming is hard...

But is it?

Or is it because we restrained ourselves to a single word unconsciously?

What if you allowed yourself to use 2-3 words instead?

If you do this, naming becomes much easier.

For example, I have a component that contains some text and an image. But unlike the traditional media element, I want to remove the image and insert it into a portion of my text on mobile.

The actual component looks like this.

<video autoplay loop muted playsinline>
  <source src="/images/blog/camelcase-classes/text-image-insert.mp4" type="video/mp4">
  Your browser doesn't support embedded videos. Watch the video <a href="/images/blog/camelcase-classes/text-image-insert.mp4"> here </a> instead. 
</video>

The HTML looks like this:

```html
<div class="Block">
  <div class="imageContainer"/>
    <img src="...">
  </div>
  <div class="content">
    <div class="part1"> ... </div>
    <div class="insert">
      <img src="...">
    </div>
    <div class="part2"> ... </div>
  </div>
</div>
```

What would you even call this component?

I could get creative and call it something unrelated — like `.Apple` — but it's going to take some training for my brain to associate this component with Apple.

But even if I could, I don't think it's a good idea to use generic meaningless class names. That's because I'll likely forget what it is after 6 months.

So what did I call it?

I went with what came naturally to me: I called it `.TextImageInsert` — there's some text, there's going to be an image, and the image is going to be inserted somewhere else on mobile.

Done. There's a story behind this name — something that I can immediately understand — which makes it easy to stick.

Now if I used the traditiona/ BEM naming convention, I wouldn't be able to create this class at all.

That's it folks.

What do you think of camelCased class names after reading all of this? Let me know on Twitter :)
