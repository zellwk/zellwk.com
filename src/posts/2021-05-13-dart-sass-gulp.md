---
layout: post
title: Using Gulp with Dart Sass
description: How to set up Dart Sass with Gulp
slug: dart-sass-gulp
tags: ['gulp', 'css', 'tools', 'workflow', 'sass']
---

I'm playing around with Sass again recently and I noticed newer features (like `@use` and `@forward`) are only available on Dart Sass. Upon further inspection, I noticed that [LibSass is now deprecated](https://sass-lang.com/blog/libsass-is-deprecated).   

This article aims to help you get started with Dart Sass if you're using Gulp.  

<!-- more -->   

## Setting up Gulp  

First, you need to install Gulp.   

```shell
npm install gulp --save-dev
```  

Second, you need to create a file called `gulpfile.js` inside your project.  

```javascript
- project
  |- gulpfile.js 
```  

We will require `gulp` in this gulpfile. I'm destructuring `src` and `dest` at the same time since we'll use them later.   

```javascript
const {src, dest} = require('gulp')
```  

Next let's create a `css` function to transpile Sass to CSS. Make sure you change the `src` and `dest` values to match the appropriate folders in your project.   

```javascript
function css () {
  // ... 
  return src('src/scss/**/*.{scss,sass}')
    .pipe(dest('dist/css'))
}
```  

Gulp will register a `css` command if you export this `css` from the Gulpfile.   

```javascript
exports.css = css
```  

You should be able to run `gulp css` if you have Gulp installed globally on your computer. Otherwise, you can run `npx gulp css`.   

```javascript
gulp css
```  

<figure role="figure">
<img src="/images/2021/dart-sass-gulp/npx-gulp-css.png" alt="Run npx gulp css">
</figure> 

## Transpiling Sass to CSS with Dart Sass  

We need two things to use Dart Sass with Gulp:   
  - [The `gulp-sass` plugin](https://www.npmjs.com/package/gulp-sass)  
  - [The Dart Sass compiler](https://www.npmjs.com/package/sass)  

We can install them both like this:   

```shell
npm install gulp-sass sass --save-dev
```  

We will require both `gulp-sass` and `sass` in the Gulpfile.   

`gulp-sass` uses Libsass by default. We can change it to Dart Sass by changing the `compiler` property.   

```javascript
const sass = require('gulp-sass')
sass.compiler = require('sass')
```  

We can now transpile Sass to CSS.   

```javascript
function css () {
  return src('src/scss/**/*.{scss,sass}')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
}
```  

The `sass.logError` part is important because it allows any errors to be emitted into the Terminal. Without this, you won't be able to watch Sass files for changes - any errors would stop the watching of files. (More on watching files later).  

## Including special paths  

If you've downloaded any packages with npm, you can include them in `gulp-sass` so you can write lesser code to import the file. `includePath` takes in an array. Feel free to include any additional paths if you need to!   

```javascript
function css () {
  return src('src/scss/**/*.{scss,sass}')
    .pipe(
      sass({includePaths: ['./node_modules']})
        .on('error', sass.logError)
    )
    .pipe(dest('dist/css'))
}
```  

```javascript
// Without includePaths
@use '../../node_modules/package'

// With includePaths
@use 'package'
```  

## Increasing compile speed  

[Synchronous Dart Sass is two times faster than asynchronous Dart Sass](https://www.npmjs.com/package/sass). Unfortunately for us, Gulp runs asynchronously. But it's important for Gulp to be asynchronous so we can process multiple tasks at the same time.   

:::note   
I wrote a book on [Automating Your Workflow with Gulp](https://automateyourworkflow.com/) a while ago. The contents are dated (it's written for Gulp v3, but we're working with Gulp v4 now).   
Although the contents are dated, it should still give you a good understanding on how a developer workflow works and how to set it up. Check it out if you're interested!   
:::

To improve Dart Sass compilation speed, we can use a package called `fibers`.   

```javascript
npm install fibers --save-dev
```  

```javascript
const Fiber = require('fibers')

function css () {
  return src('src/scss/**/*.{scss,sass}')
    .pipe(
      sass({
        includePaths: ['./node_modules'],
        fiber: Fiber
      })
        .on('error', sass.logError)
    )
    .pipe(dest('dist/css'))
}
```  

I have no idea what `fibers` does at this point. I haven't figured it out yet. I'm just adding it because the official docs recommend it. ¯\_(ツ)_/¯  

:::note  
  - Although [Dart Sass is 1.5x slower compared to Libsass](https://sass-lang.com/blog/announcing-dart-sass#:~:text=First%2C%20it's%20really%20fast%E2%80%94the,1.5x%20slower%20than%20LibSass.&text=And%20Dart's%20performance%20continues%20to%20get%20better%20all%20the%20time), there's practically no performance hit unless you're working with a humongous code base. So feel free to switch!   
:::

## Sourcemaps, PostCSS, and extra plugins  

You can add PostCSS plugins like autoprefixer by requiring them in the gulpfile too. Here's how to include autoprefixer.   

```javascript
npm install gulp-postcss autoprefixer --save-dev
```  

```javascript
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

function css () {
  return src('src/scss/**/*.{scss,sass}')
    .pipe(sass(/* ... */).on(/* ... */))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('dist/css'))
}
```   
You can include sourcemaps as well.  

```javascript
npm install gulp-sourcemaps --save-dev
```  

```javascript
function css () {
  return src('src/scss/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass(/* ... */).on(/* ... */))
    .pipe(postcss(/* ... */))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
}
```   

## Watching Sass files for changes  

When a Sass file changes, we want to compile the new Sass into CSS. We can do this with a `watcher` function.   

```javascript
function watcher (cb) {
  
}
```  

In `watcher` we need to use `gulp.watch`. `gulp.watch` lets us watch files and perform gulp tasks when the files are changed. It takes in three arguments  
  1. The files to watch  
  2. Gulp tasks to execute when the files changes  
  3. A callback to tell Gulp the execute is complete  

Here's how we can watch our sass files for changes and compile them into CSS when we save a file.   

```javascript
const {src, dest, watch} = gulp

function watcher (cb) {
  watch('src/scss/**/*.{scss,sass}', css, cb)  
}
```  

That's it! Now go ahead and add Dart Sass into your workflow 🤓  