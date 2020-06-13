---
layout: post
title: Snowpack + Eleventy + Sass + PostCSS
description: "Sharing how I combined these tools together to create websites."
slug: eleventy-snowpack-sass-postcss
tags:
  - tooling
  - snowpack
---

I was able to create an Eleventy + Snowpack + Sass + PostCSS setup that works pretty well. I want to share this setup with you in this article.

<!-- more -->

## File structure

There are basically two ways to structure source code:

1. Put everything you write inside an `src` folder
2. Split up the `src` folder up into two: `views` and `public`.

I usually use the first method. But I decided to try the second method this time round. I tried it because Snowpack makes it easy to mount folders onto a development server.

I wanted to split up `src` into `views` and `static` because I can use them for specific responsibilities:

- `views` is used for everything 11ty-related
- `static` is used for all static assets (CSS, JS, Images, etc).

Note: We'll use CSS here for now. I'll add Sass later.

```bash
project
  |- views
    |- _includes
    |- index.njk
    |- Other 11ty related files
  |- static
    |- css
      |- styles.css
    |- images
      |- image.png
    |-js
      |- main.js
```

## Eleventy config

First, you need to install Eleventy.

```bash
npm install @11ty/eleventy --save-dev
```

For this file structure to work, I configured Eleventy with an `.eleventy.js` file.

Here, I set `input` to `views` and `output` to `dist`.

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "views",
      output: "dist",
    },
  }
}
```

## Snowpack Dev Server

If you don't know about Snowpack, I suggest reading [Snowpack's intro blog post](https://www.snowpack.dev) and [my notes on Snowpack][2] before you continue with the rest of this article.

First, make sure to install Snowpack.

```bash
npm install snowpack --save-dev
```

We can run commands for Snowpack inside a `snowpack.config.json` file. Here, I made `dist` the root of Snowpack's server with a  `mount` script.

```js
// snowpack.config.json
"scripts": {
  "mount:eleventy": "mount dist --to /",
}
```

I also had to mount the `static` folder so I could access my CSS, images, and other assets.

```js
"scripts": {
  "mount:eleventy": "mount dist --to /",
  "mount:static": "mount static --to /",
}
```

I can access static assets from my Eleventy files like this:

```html
<!-- CSS -->
<link rel="stylesheet" href="/css/styles.css">

<!-- JavaScript -->
<script src="/js/main.js"></script>

<!-- Images -->
<img src="/images/image.png" />
```

The next step is to run eleventy. Here, we can use a `run` script. We also watch eleventy with a [`::watch` modifier][3].

```js
"scripts": {
  "mount:eleventy": "mount dist --to /",
  "mount:static": "mount static --to /",
  "run:eleventy": "eleventy",
  "run:eleventy::watch": "$1 --watch",
}
```

Let's run snowpack:

```js
npx snowpack dev
```

You should see this log. A browser will also open up. This browser directs you to `http://localhost:8080` (which is where the Snowpack's dev server is hosted).

<figure role="figure">
  <img src="/images/2020/snowpack-eleventy/snowpack-dev.png" alt="">
</figure>

I eventually set `snowpack dev` as an npm script so I can use `npm run dev`. `npm run dev` is easier for me to write because I have an alias for it.

```js
// package.json
"scripts": {
  "dev": "snowpack dev"
}
```

### Adjusting the dev server

I set four options for the dev server:

```js
"devOptions": {
  "port": 3000,
  "open": "none",
  "bundle": false,
  "out": "dist"
}
```

- `port` because I prefer using `:3000` over `:8080`.
- `open` to `none` because I don't want browsers to open a tab.
- `bundle` to `false` to silence the `bundle` log.
- `out` to `dist` because I want my final build to be in a `dist` folder. (This appears when you run `snowpack build`).

Try running `snowpack build`. You should see a `dist`. This `dist` folder should contain your 11ty-generated files + static files.

```bash
npx snowpack build
```

<figure role="figure">
  <img src="/images/2020/snowpack-eleventy/snowpack-dist.png" alt="Snowpack Dist folder.">
</figure>

Again, I used an npm script. I set this to `build`.

```bash
"scripts": {
  "build": "snowpack build"
}
```

## JavaScript

Snowpack lets you import packages from npm out of the box. Here, you need to make sure you save your package as a `dependency`.

For example, let's install a `canvas-confetti`  package that creates confetti (which comes bundled in [Snowpack's examples][4] 😃).

```bash
npm install canvas-confetti --save
```

We can import this `canvas-confetti` package in the JavaScript file.

```js
// main.js
import confetti from 'canvas-confetti'

// Adds a canvas element to the HTML
const canvas = document.createElement('canvas')
canvas.style.width = '100vw';
canvas.style.height = '100vh';
document.body.appendChild(canvas)

// Makes confetti
confetti.create(canvas, {
  resize: true,
  useWorker: true
})({ particleCount: 200, spread: 200 })
```

When you run `snowpack build`, you should see a `web_modules` folder. This `web_modules` folder contains dependencies we imported.

<figure role="figure">
  <img src="/images/2020/snowpack-eleventy/js.png" alt="Snowpack JavaScript.">
</figure>

Snowpack will also point your import statements to this `/web_modules` folder automatically.

```js
// In dist/js/main.js
import confetti from '/web_modules/canvas-confetti'
```

## Sass + PostCSS

Snowpack has a weird quirk: [Scripts you write in `snowpack.config.json` runs asynchronously](). You cannot make one script depend on another.

This means we cannot use Sass, then PostCSS inside with `run` scripts. This is a huge problem.

The best solution I found is to run Sass via PostCSS. We can do this with [postcss-sass][6] by Jonathan Neal. To use postcss-sass, we need to install three modules:

1. `postcss-cli`
2. `postcss-scss`
3. `@csstools/postcss-sass`

Here's the command to install all three modules:

```bash
npm install postcss-cli postcss-scss @csstools/postcss-sass --save-dev
```

### Configuring PostCSS

We can configure PostCSS with a `postcss.config.js` file. I set `syntax` to `postcss-scss` to tell PostCSS to expect a `.scss` file. Then, I used postcss-sass plugin to do the Sass part.

I also added an `includePaths` option so I can import libraries from the `node_modules`.

```js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('@csstools/postcss-sass')({
      includePaths: ['./node_modules']
    }),
  ]
}
```

I also added Autoprefixer to the build.

```bash
npm install autoprefixer --save-dev
```

```js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('@csstools/postcss-sass')({
      includePaths: ['./node_modules']
    }),
    require('autoprefixer')
  ]
}
```

### Configuring Snowpack for Sass + PostCSS

Since I want `static` to contain source files, I changed the `static/css` to `static/scss`.

```bash
project
  |- static
    |- scss
      |- styles.scss
  |- ...
```

The `run` script I came with looks like this:

```bash
"scripts": {
  "run:css": "postcss static/scss/**/[^_]*.scss --dir dist/css --ext css",
  "run:css::watch": "$1 --watch"
},
```

It does five things:

1. Grab all `.scss` files (except for partials)
2. Transform them with `postcss`
3. Output the files inside `dist/css`
4. Change the file extension to `.css`
5. Watch `.scss` files for changes (when using `snowpack dev`).

This process works pretty well, but I'm concerned about two things.

### Postcss-sass may be outdated

Dart Sass and Node Sass are actively worked on. Last I checked, [Node Sass][7] was updated 20 days ago. Jonathan's [postcss-sass plugin][8], however, was updated 14 months ago.

There's a considerable difference in Sass versions as well. (10 minor versions when I checked).

I'm concerned update delays in this package. I'll be super happy if Jonathan keeps the package up to date, but we can't be sure this happens.

I'd prefer using the traditional `Sass -> PostCSS` approach if possible... but it's impossible to set this up with Snowpack (unless I'm getting it wrong).

### Problems with Sourcemaps

Sourcemaps generated with the above process doesn't link back to `.scss` files. It links to the generated `.css` file... so the sourcemaps aren't very useful.

I can't find a solution for this after hours of Googling so I gave up.

## Cleanup

I like to clean up generated files before I run `snowpack dev` or `snowpack build`. I do this with `del`.

```bash
npm install del-cli --save-dev
```

```bash
"scripts": {
  "clean": "del dist",
  "dev": "npm run clean && snowpack dev",
  "build": "npm run clean && snowpack build"
}
```

## Deploying

I can now build a site with `npm run build`. The generated `dist` folder is ready for deploy.

The deploy process is already complete if I use Netlify to serve my sites. It does [further optimisations][9] and [cache-busting][10] for me automatically.

But it's another story if I don't use Netlify.

## Minification and Optimization

Snowpack has `build` scripts that run after `run` scripts.I imagine we can run `cssnano` to minify CSS and `terser` to minify JavaScript. I didn't test them out since I don't have the time to do it yet.

I suppose we can also do image optimisation with `imagemin`... So there are no real problems with optimisation.

The real problem is cache-busting.

## Cache-busting

We can cache bust in three ways:

- Using query strings (like `style.css?v=3.4.1)`
- Adding a hash to the file name (like `style.232124.css`)
- Using ETags

CSS Tricks has a [complete article that talks about each of these strategies][11] if you want to find out more.

Traditionally, the best way to cache bust is to add a hash to the file. This hash is based on file contents, so it changes when the contents change. Webpack uses this method to generate hashes.

I also used the hash method to generate hashes for this blog.

However, to use a hash with a static site generator like Eleventy, you need to:

1. Compile the CSS and JavaScript files first.
2. Save the hash details somewhere
3. Feed the hash details into Eleventy.
4. Let Eleventy generate the files.

Which means we have to use Snowpack as part of a npm build process or gulp build script. It feels like I'm mixing too many tools together and I don't like this. Maybe I'm missing something here.

Second problem with caching: How do we best cache ESM files? I haven't researched about this process so I don't have answers yet.

Anyway, cache-busting is a problem I still struggle with in a Snowpack environment. If you have answers, please let me know how you handle it! My eyes are open :)

[2]:	https://zellwk.com/blog/first-look-at-snowpack
[3]:	https://zellwk.com/blog/first-look-at-snowpack
[4]:	https://www.snowpack.dev/#create-snowpack-app-(csa)
[6]:	https://github.com/jonathantneal/postcss-sass
[7]:	https://github.com/sass/node-sass
[8]:	https://github.com/jonathantneal/postcss-sass
[9]:	https://www.netlify.com/blog/2019/08/05/control-your-asset-optimization-settings-from-netlify.toml/
[10]:	https://www.netlify.com/blog/2015/09/11/instant-cache-invalidation/
[11]:	https://css-tricks.com/strategies-for-cache-busting-css/
