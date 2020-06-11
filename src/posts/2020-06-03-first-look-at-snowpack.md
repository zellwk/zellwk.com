---
layout: post
title: First look at Snowpack
description: "Things I learned about Snowpack after tinkering for a few hours."
slug: first-look-at-snowpack
tags:
  - tooling
  - snowpack
---

I was tinkering around with Dynamic Imports this week when I saw Snowpack in the [JavaScript Weekly][1] newsletter. It caught my eye and I gave it a whirl.

I managed to get a decent Eleventy + Snowpack + Sass setup in a couple of hours. I'll share this setup next week. But first, I want to share some things I noticed about Snowpack.

<!-- more -->

## Snowpack Config

Commands you write inside `snowpack.config.js` run in a specific order. It doesn't matter how you write them.

They'll always run in this format:

1. `mount` scripts first.
2. `run` scripts second.
3. `build` scripts last

(I haven't tried `proxy` yet so I don't know where it goes).

Within each script type, **scripts are ran in alphabetical order**. So the order of your scripts doesn't matter.

This means all ** processes within `snowpack.config.js` must be asynchronous**. You cannot make one script depend on another (which creates a problem with cache-busting that I'll talk about next week as I dive into my Eleventy + Snowpack + Sass setup).

Example: Let's say you want to clean up a generated `dist` folder before running `eleventy` or `sass` or other processes. You can't do this inside `snowpack.config.js`.

You can use other tooling methods to do this. For example, you can use npm scripts:

```js
"scripts" : {
  "clean": "del dist"
  "dev": "npm run clean && snowpack dev"
}
```

You can also use Gulp:

```js
// Use child_process to run a CLI command inside Gulp
const exec = require('child_process').exec
const snowpack = cb => {
  exec('snowpack dev', (err, stdout, stderr) => {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
}

// Cleans up dist folder with del
const del = require('del')
const clean = _ => del('dist')

// Configure the process
exports.dev = gulp.series(clean, snowpack)
```

### `mount` scripts

Mount scripts let you structure the server `snowpack dev` creates for you. This gives you flexible architecture.

Here's an example I used:

```js
"scripts": {
  "mount:static": "mount static --to /",
  "mount:eleventy": "mount dist --to /",
}
```

In this case, since I mounted my `static` folder onto `/`, I can point all static requests straight to `/`. (Real and in-depth explanation coming up next week).

### The `::watch` modifier

The `::watch` modifier can be used to watch files within `run` scripts. This is useful for development work where you want to watch file changes.

Here's an example where you run `eleventy` on watch mode.

```js
// snowpack.config.js
module.exports = {
  "run:eleventy": "eleventy",
  "run:eleventy::watch": "$1 --watch"
}
```

## Snowpack Dev is amazing

Snowpack Dev does Hot Module Reload (HMR) automatically. There's no need to write tons of configuration. I was able to reload Sass and JavaScript files easily.

Live Reload refreshes the screen when you change a file. On the other hand, Hot Module Reload updates the things you changed without needing to refresh the screen. So HMR can make development work go faster.

So Snowpack's HMR replaces Browsersync (which I loved and depended on for years).

Caveat: I haven't tried out HMR with complicated, multiple-module scripts yet. But I definitely like what I'm seeing.

## ES6 Modules and Dynamic Imports

Most bundlers create a huge `bundle.js` file. Snowpack doesn't. This is pretty cool since we get ES6 modules and dynamic import support without having to jump through hoops like other bundlers!

It does two things when you import a package from `node_modules`:

1. It copies the modules you imported into a `web_modules` folder.
2. It changes the import path to include this `web_modules` folder.

Example:

```js
// What you write
import confetti from 'canvas-confetti'
```

```js
// Created by Snowpack when you run `snowpack build`
import confetti from "/web_modules/canvas-confetti.js";
```

I'm not sure how Snowpack resolves the differences between CJS and ESM, but I think it does it while copying the module into a `web_modules` folder.

## Unknown Plugin architecture

Unfortunately, I could not understand what Snowpack plugins are used for. I had a few questions:

1. What can plugins do?
2. When do these plugins run? (Only inside `run` script?  Only inside `build` scripts? Or both?)
3. What available plugins are there?

I couldn't find answers to any of these three questions. (Yes, I read the docs multiple times but I didn't understand the plugin section without context).

So I didn't experiment with plugins yet.

## Overall thoughts

Snowpack looks pretty good overall! There are some more kinks I have to work out before actually using it in production. But I do like how it's being done so far.

If you are an experienced Snowpack user, please get in touch. I have a few questions I want to ask :)


[1]:	https://javascriptweekly.com
