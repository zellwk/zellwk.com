---
layout: post
title: Publishing packages that can be used in browsers and Node
description: If you want to create a package that's usable in both browsers and Node, this article is here to help.
slug: publishing-npm-packages-that-can-be-used-in-browsers-and-node
tags:
  - npm
  - javascript
  - node
---

When you create a package for others to use, you have to consider where your user will use your package. Will they use it in a browser-based environment (or frontend JavaScript)? Will they use it in Node (or backend JavaScript)? Or both?

If you want to create a package that's usable in both browsers and Node, this article is here to help.

You'll learn:

1. How to write packages for use in browsers
2. How to write packages for use in Node
3. How to publish your packages for use in both browsers and Node

<!-- more -->

## Writing a package for use in browsers

If you want to include a library in frontend JavaScript, you have to link the library first with a `<script>` tag. You can use the library anytime after you link it.

```html
<script src="link-to-jquery.js"></script>

<script>
  // You can use jQuery anytime after you link to it
  console.log(jQuery)
</script>
```

This works because JavaScript in browsers shares one global scope. It doesn't matter how many JavaScript files you link to. They behave as if they're one big JavaScript file.

With this information, we can begin writing a library for use in the frontend world.

Let's say you want to create a library called `peachBlossom`. `peachBlossom` has a `bloom` function. You write this `bloom` function in a separate JavaScript file, `peach-blossom.js`.

```js
// peach-blossom.js
function bloom () {
  console.log('Bloom!')
}
```

You can include `peachBlossom` in your frontend JavaScript by linking to the `peach-blossom.js` file. Once you do this, you can use `bloom` anywhere.

```html
<script src="peach-blossom.js"></script>
<script src="main.js"></script>
```

```js
// main.js
bloom() // Bloom!
```

Libraries usually have more than one piece of code. We don't want to pollute the global scope with little variables. What we can do is wrap the functions we want to expose in an immediately-invoked function expression (IIFE).

This means:

1. We create a function and run it immediately
2. We return the library from within the function so we can use the library later.

In code, it looks somewhat like this:

```js
// peach-blossom.js
const peachBlossom = (function () {
  // Write as much code as you want here

  // Return what others can use
  return {
    bloom: function () {
      console.log('Bloom!')
    }
  }
})()
```

You can then use `bloom` anywhere by writing `peachBlossom.bloom`.

```js
// main.js
peachBlossom.bloom() // Bloom!
```

This is the basics of writing a frontend library.

Now, let's talk about writing a library for Node.

## Writing a package for Node

Adding a library to Node is different from adding a library to browsers. This is because Node doesn't have HTML files and `<script>` tags.

Let's make sure you know how to run Node before we begin writing a library for Node.

### Running Node

First, you need to make sure you have Node installed on your computer. You can install Node from [Node's website][1] if you don't have it installed already.

Once you have Node installed, you'll want to create a folder to store your Node project. In this case, let's call it "node-project".

The command to create a folder is this:

```bash
mkdir node-project
```

Then, you need to navigate to the `node-project` directory. You can do it with `cd`:

```bash
cd node-project
```

If you're having problems with the command line, you can use [this guide][2] to help you out.

Next, we want to create a file. This will be a JavaScript file. (We will run Node on this file). Let's call it `index.js`.

```bash
touch index.js
```

<figure><img src="/images/2019/authoring-packages/node-project.png" alt=""><figcaption></figcaption></figure>

In `index.js`, we're going to write a `console.log` statement. This is for us to know if we run the file.

```js
// index.js
console.log('Running index.js!')
```

Finally, you can use `node` to run `index.js`. Here's the command:

```bash
node index.js
```

Once you run `index.js`, you should see the `console.log` in the terminal. That's how we know the file has ran.

<figure><img src="/images/2019/authoring-packages/run-node.png" alt=""></figure>

### Adding libraries to Node

To add libraries to Node, you have to use the `require` statement. Once you add a library, you can use the library anywhere in the same JavaScript file.

Here's an example:

```js
const fs = require('fs')
console.log(fs)
```

<figure><img src="/images/2019/authoring-packages/log-fs.png" alt=""></figure>

When you use `require`, Node looks for the library you specified in three places:

First, it checks whether the library is built into Node. In this example, `fs` is built directly into Node. You can use `fs` anytime if you use Node.

Second, it checks whether the library exists in the `node_modules` folder. These are user-installed libraries. You can add a library to the `node_modules` folder by running `npm install`.

Here's an example where we install `express`, then require express in Node:

```bash
# Run this in the command line
npm install express
```

```js
// Index.js
const express = require('express')
console.log(express)
```

<figure><img src="/images/2019/authoring-packages/log-express.png" alt=""></figure>

Third, if you add `./` to `require`, Node will look for a file located in the current directory. This is where we can begin writing the `peach-blossom` library.

### Writing your first library for Node

Let's start by creating a `peach-blossom.js` file. This file should be in the same directory as `index.js`.

```js
touch peach-blossom.js
```

<figure><img src="/images/2019/authoring-packages/node-peach-blossom.png" alt=""><figcaption></figcaption></figure>

We can add `peach-blossom.js` to `index.js` by using `require`. Here's what it looks like:

```js
const peachBlossom = require('./peach-blossom')
```

In Node, there's no concept of a shared global scope. Each file has its own scope. So, if you write `peach-blossom.js` as if it's used for frontend JavaScript, you won't be able to use it. You'll get an error.

```js
// peach-blossom.js
const peachBlossom = (function () {
  // Write as much code as you want here

  // Return what others can use
  return {
    bloom: function () {
      console.log('Bloom!')
    }
  }
})()
```

```js
// index.js
const peachBlossom = require('./peach-blossom')
```

<figure><img src="/images/2019/authoring-packages/node-peach-blossom-error.png" alt=""><figcaption></figcaption></figure>

To pass variables from one file to another in Node, you have to write `module.exports`. Variables passed to `module.exports` can be retrieved from another file.

This means we must write `module.exports` in `peach-blossom.js`.

```js
// Write as much code as you want here
const peachBlossom = {
  bloom () {
    console.log('Bloom!')
  }
}

// Exports peachBlossom for use in other files
module.exports = peachBlossom
```

Once we have exported `peachBlossom`, we can use it in other files:

```js
// index.js
const peachBlossom = require('./peach-blossom')
peachBlossom.bloom() // Bloom!
```

This format of passing variables around in Node with `require` and `module.exports` is called **CommonJS**.

### Publishing your library as an npm package

In short, to make your module work in Node, you have to export a variable with `module.exports`. Other people can then `require` this module in their code.

At this point, you can move `peach-blossom` into a separate project folder and publish it as an npm package. You can use [this guide][3] to find out more about publishing the process.

## Writing modules that are usable in both frontend and backend JavaScript

Let's take a moment to reconcile what we know.

To write a library for the frontend, we need to declare it as a variable. As much as possible, we want to expose one variable only.

```js
const peachBlossom = (function () {
  // Write as much code as you want here

  // Return what others can use
  return {
    bloom: function () {
      console.log('Bloom!')
    }
  }
})()
```

To write a library for the Node, we need to export the variable with `module.exports`. Here, we only expose one variable.

```js
// Write as much code as you want here
const peachBlossom = {
  bloom () {
    console.log('Bloom!')
  }
}

// Exports peachBlossom for use in other files
module.exports = peachBlossom
```

But these are two completely different formats! How can we write a library once and use it in both contexts?

Enter UMD.

### UMD

[UMD (Universal Module Definition)][4] is a block of code we can use to wrap around our library. This block of code makes it possible to use a library both on the frontend and in Node.

It kinda looks like this:

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node.
        module.exports = factory(require('b'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (b) {
    // Use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```

Whoa! This is confusing! Hold up!

In practice, we don't have to know how to UMD-ify our code by ourselves. Many tools, like Webpack and Parcel, gives us the ability to UMD-ify our code through them.

Here are some examples (and their relevant setup instructions):

1. [Gulp-umd][5]
2. [Webpack][6]
3. [Parcel][7]
4. [Rollup][8]

This, means you have to set up these tools if you want to write packages that can be used for both Frontend JavaScript and in Node. Yes, it complicates the authoring process, but there's nothing much we can do about it at this point.

## Wrapping up

If you want your library to work both on Frontend JavaScript and in Node, you need to wrap your module with UMD (Universal Module Definition).

If you want to UMD-ify your code, you need to use a build tool when you author your package. This makes the authoring process more complicated. But the tradeoff can be worth it for providing users with an option to use your library anywhere.

[1]:	https://nodejs.org/en/ "Node"
[2]:	https://zellwk.com/blog/fear-of-command-line/ "Overcoming your fear of the command line"
[3]:	/blog/publish-to-npm/ "How to publish packages to npm (the way the industry does things)"
[4]:	https://github.com/umdjs/umd "UMD"
[5]:	https://github.com/eduardolundgren/gulp-umd
[6]:	https://webpack.js.org/guides/author-libraries/
[7]:	https://parceljs.org/cli.html#expose-modules-as-umd
[8]:	https://rollupjs.org/guide/en
