---
title: 'Supporting older browsers—Part 3: JavaScript'
layout: post
slug: older-browsers-js
newsletter: better-fed
tags:
 - best practice
description: It's easy to provide JavaScript support for older browsers. Most of the time, you just need to use a polyfill. But there are more things you can do.
---

It's easy to provide JavaScript support for older browsers. Most of the time, you just need to use a polyfill.

But there are more things you can do.

<!-- more -->

<div class="jsCkClone" data-should-not-clone></div>

## What's a polyfill?

A Polyfill is a piece of code that tells browsers how to implement a JavaScript feature. Once you add a polyfill, you don't need to worry about support anymore. It'll work.

Here's how a Polyfill works:

1. It checks whether the feature is supported
2. If not, it adds code to support the feature

Here's an example of a polyfill at work. It checks if the browser supports `Array.prototype.find`. If the browser doesn't support `Array.prototype.find`, it tells the browser how to support it.

You can find this code on [MDN][1].

```js
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this
 -  null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
```

## Using Polyfills

There are two ways to use Polyfills:

1. Polyfill manually (like in the example above)
2. Adding many polyfills at once through a library

### Polyfilling manually

First, you need to **search for the polyfill** you need. You should be able to find one if you google around. Smart developers have created polyfills for almost everything you'll ever need.

Once you found the polyfill, **use the above process** to create provide support to older browsers.

### Adding many polyfills at once

**Some libraries contain many polyfills.** [ES6-shim][2] is one example of such a library. It provides support for all ES6 features on older browsers.

(Note: A polyfill is a subset of a shim. A shim is a library that brings a new API to an older environment).

## Using cutting-edge JavaScript features

If you want to use cutting-edge JavaScript features, consider adding Babel into your build process.

Babel is a tool that compiles JavaScript. During this compile process, it can:

1. Add any shim / polyfill you need
2. Compiles preprocessors into JavaScript

More on the second point:

Babel works offline in your build process. It can read files you pass into it, and then convert these files into JavaScript the browser can read.

What this means is you can use cutting-edge features like Flow, TypeScript and other cool technologies you've heard about. They'll all work in browsers (provided you pass them through Babel first!)

## What if polyfills aren't enough?

If polyfills aren't enough to support the feature, you might want to reconsider the amount of support you provide for the browser in question.

Do you need to provide the same functionality across different browsers? Maybe you should consider progressive enhancement instead?

Maybe you can code in a way that doesn't use the feature?

Lots of maybes, but you get the drift.

## How to tell if a browser supports the feature?

First, I'll check [caniuse.com][3]. Write the name of the JavaScript feature you want, and you'll be able to see browser support levels.

Here's an example with [Abort Controller][4]

<figure>
  <img src="/images/2018/older-browsers/abort-caniuse.png" alt="Searching for abort controller in caniuse.com">
</figure>

If [caniuse.com][5] doesn't give me any information, I'll check MDN. You'll find browser support at the bottom of most articles.

Here's the example with [Abort Controller][6] again:

<figure>
  <img src="/images/2018/older-browsers/abort-mdn.png"alt="Searching for abort controller in MDN">
</figure>

## Beware the cost of JavaScript

When you use Polyfills, you add more JavaScript code.

The problem with adding more JavaScript is, well, there is more JavaScript. And with more JavaScript comes more problems:

1. Older browsers usually live in older computers. They may not have enough processing power.
2. JavaScript bundles can delay site load. More on this in  "[The cost of JavaScript][7]" by Addy Osmani

## Other articles in this series

1. Part 1: [Supporting older browsers][8]
2. Part 2: [Supporting older browsers—Part 2: CSS][9]
3. Part 3: This article
4. Part 4: Why support older browsers? (To be released!)

## Wrapping up

It's easy to add support for JavaScript features. Most of the time, you add a polyfill and call it a day. But be aware of the cost of JavaScript when you do so!

Sometimes, it might be good to ditch the feature entirely.

[1]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find "Array.prototype.find"
[2]:	https://github.com/paulmillr/es6-shim "ES6 shim"
[3]:	https://caniuse.com "Can I use?"
[4]:	https://caniuse.com/#search=Abort "Searching for "abort" in caniuse"
[5]:	https://caniuse.com "Can I use?"
[6]:	https://developer.mozilla.org/en-US/docs/Web/API/AbortController "Searching for abort controller in MDN"
[7]:	https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4 "The cost of JavaScript"
[8]:	/blog/older-browsers-css "Supporting older browsers"
[9]:	/blog/older-browsers-css "Supporting older browsers—Part 2: CSS"