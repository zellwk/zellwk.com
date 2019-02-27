---
title: Writing modular CSS (Part 3) — CSS file structure
description: Can't find your Sass or JavaScript component files? Well, here's a way to organize them properly :)
layout: post
slug: css-architecture-3
tags:
 - css
newsletter: better-fed
---

We've already talked about writing Modular CSS with BEM and namespaces in the past two articles. In this article, I want to veer away from the process of writing CSS selectors into the mystical art of file structure and organization.

If you've ever wondered what's the best practice for organizing files, how to find any CSS file easily and how big or small each file should be, this article is written for you.

<!--more-->

Let's start off by looking at the two ways you can organize assets.

## You can organize assets in two ways.

When I say assets in this article, I'm referring to CSS and JavaScript files. We cannot neglect either type, especially in today's websites.

There are two main ways you can use to store your CSS and JavaScript files.

**The first way** is to store CSS and JavaScript files in distinct folders *according to their type*. This is the traditional method that many developers are accustomed to.

```bash
- project/
    |- js/
    |- sass/
```

**The second way** is to store CSS and JavaScript files *according to their components*. With this method, the file structure may resemble the following:

```bash
-project/
    |- component-a/
        |- index.scss
        |- index.js
    |- component-b/
        |- index.scss
        |- index.js
```

This method is commonly used by people who build webapps with tools like React, since HTML is usually written directly in JavaScript. You can easily `require` only the needed styles with Webpack like this:

```js
import css from './index.scss';
```

### Which method should you use?

Honestly, there's not too much of a difference between methods. The best method is one that gives you a clear picture of your components.

At this point, I prefer the traditional method of storing CSS and JavaScript files in distinct folders because:

1. I'm used to the structure.
2. I can find components easily with my methods.
3. It's easier to keep everything consistent since I write both websites and webapps.
4. I prefer to separate CSS and JavaScript as much as possible

As you can see, I have my preferences. You can have yours too. It's perfectly ok. So, pick either method and stick with it.

## How I structure my project

I prefer to keep my written code in a `src/` (source) folder as much as possible. Files in the `src/` folder will then be compiled and placed in a `dist/` folder for production purposes. So, my initial project structure looks like this:

```bash
- project/
    |- dist/ # For production purposes
    |- src/  # All source code
        |- js/
        |- scss/
        # templates and other stuff as required
```

From this point on, I'm going to focus on the `scss/` folder since the `js/` folder mirrors it (but with much lesser stuff).

The `scss/` folder contains seven subfolders, along with one partial and one main scss file, like this:

```bash
- scss/
    |- lib/
    |- helpers/
    |- variables/
    |- base/
    |- layouts/
    |- objects/
    |- components/
    |- styles.scss
    |- _utilities.scss
```

Let me first explain what's in my `styles.scss` file. It's the point of reference for mp projects. Here's what it looks like:

```scss
// Libraries and helpers
// ---------
@import 'lib/lib';
@import 'helpers/helpers';

// Variables
// ---------
@import 'variables/colors';
@import 'variables/typography';
@import 'variables/breakpoints';
@import 'variables/themes'; // only when necessary

// Reset and base files
// --------------------
@import 'base/base';

// Layouts
// -------
@import 'layouts/layouts';

// Objects
// -------
@import 'objects/buttons';
@import 'objects/input';
@import 'objects/typography';
// Other objects as necessary

// Components
// ----------
@import 'components/component-name-1';
@import 'components/component-name-2';
@import 'components/component-name-3';
@import 'components/component-name-4';
// Other components as necessary

// Utilities
// ----------
@import 'utilities';

// Shame
// -----
@import 'shame';
```

At a glance, you can tell from the `styles.scss` file that there are *four types of variables*, *three objects* and *four components*.

This declarative method of listing variables, objects and components, is the heart and soul of my scss structure. It lets me know what I've used for the project immediately.

Whenever I need to search for a component, I can always refer to this `styles.scss` file, look for the component and type `c component name` in my Sublime Text's file search field.

<figure><img src="/images/2017/css-architecture-3/search-file.gif" alt="Searching for files with Sublime Text">
  <figcaption>Searching for files with Sublime Text</figcaption>
</figure>

This is sweet because I'll always find the right file without much searching. 😊

Now, let me tell you what each subfolder contains.

### The lib/ folder

The `lib/` folder contains a single file — `_lib.scss`. This `_lib.scss` declares all libraries I use for the project. In case you were wondering, the libraries I use are:

1. Normalize.css
2. Mappy-breakpoints (for breakpoints)
3. Typi (for typography)
4. Themify (if I'm working with themes)

### The helpers/ folder

The `helpers/` folder contains convenient mixins and functions I use in the project. Examples of such mixins include include the [clearfix hack](https://css-tricks.com/snippets/css/clear-fix/), [element-invisible](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility) and CSS shapes (like triangles).

### The variables/ folder

The `variables/` folder is where I store variables used in the project. As you can tell from my `styles.scss` file, I use only four types of variables:

1. breakpoints
2. colors
3. typography
4. themes

I prefer to store these variables in Sass maps, which allow me to write functions and get values from them easily. For instance, here's what my `_breakpoints.scss` file looks like:

```scss
$breakpoints: (
  small: 400px,
  med: 640px,
  large: 900px,
  wide: 1100px,
  mega: 1800px,
  ultra: 2800px,
  );
```

To extract breakpoints from the `$breakpoints` map, I use a library I've created ([Mappy breakpoints](https://github.com/zellwk/mappy-breakpoints)):

```scss
.component {
  @include mappy-breakpoint(small) {/* styles here */}
}
```

I'm not going to go through the other files since they're mostly similar to the `_breakpoints` file.

Let's move on.

### The base/ folder

The `base/` folder is where I write any resets in addition to Normalize.css. I'm pretty aggressive with resetting margins, paddings and the looks of input and button elements, like this:

```scss
// Resets margins and paddings for headers, ul, ol and p
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
p,
blockquote {
  margin: 0;
  padding: 0;
}

// Completely resets form items
// ----------------------------
// Super hard reset that removes all borders
// and radius of all form items.
//
 -
 -
 -
 -
 -
 -
 -
 -
 -
 -
 -
 -
 -
 -
input,
textarea,
button {
  border: 0;
  border-radius: 0;
  outline: none;
  appearance: none;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
}
```

In addition to resetting, I also write styles that apply throughout the project in this file. For example:

```scss
// Use border-box for everything
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

// Set Image and Objects to have a max-width of 100%
embed,
iframe,
img,
object,
video {
  max-width: 100%;
}
```

What you choose to put here is ultimately up to you. Feel free to ignore the entire `base/` folder if you don't want to reset as aggressive as I did.

### The layouts/ folder

The `layouts/` folder is where I write layouts that apply globally to my project. I explained what these are in my previous article so [check it out](/blog/css-architecture-2#global-layouts) if you don't know what I'm talking about

### The objects/ and components/ folders

The `objects/` and `components/` folders are pretty self-explanatory. It's where I write objects and components. Each object/component has it's dedicated file. So, given the above `styles.scss` file, I have three object files: `input`, `button` and `typography`.

(Note: my definition of objects and components are different from others', be sure to [read my previous article](/blog/css-architecture-2) if you haven't read it yet).

As far as objects and components are concerned, I'll always begin by writing objects. Whenever objects grow to include another object or component, I'll rename all instances of `.o-object` with `.c-object` with the help of Sublime Text's find and replace tool.

<figure><img src="/images/2017/css-architecture-3/find-and-replace.png" alt="Find and replace tool in Sublime Text">
  <figcaption>Find and replace tool in Sublime Text</figcaption>
</figure>

### The utilities.scss file

The `_utilities.scss` file is where I write [utility-namespaced classes](/blog/css-architecture-2#utility-classes-with-u-) like `.u-text-center`.

Let's move on.

## What's the minimum/maximum file size?

Determining what to put in a file based on the number of lines of code is probably not the best practice. Some people hate to open a file, only to find two lines of code. Others hate going through 300 lines of code to correct what they're there for.

Instead of worrying about the minimum/maximum file size, I encourage you to write as much code in a file as it makes sense. For example, just write all the code you need to style `.c-component-a` in `components/_component-a.scss`. Modularity and clarity are more important than file length.

With that, let's wrap up!

## Wrapping up

File structure and organization is subjective. Different people have different ideas on what it means to have a proper structure. Instead of getting stuck over what's the best structure, pick one and go with it. Be consistent, and you'll be able to find your files every single time.

If your structure isn't good enough, you'll start to dislike certain parts anyway, and that's when you have some room to change.

Did you enjoy this article on file structure? What did you think of it? How did you organize your files? Would you do anything differently after reading my method? I'd love to hear your thoughts in the comments below :)
