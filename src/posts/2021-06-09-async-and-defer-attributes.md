---
layout: post
title: How and when to use Async and Defer attributes
slug: javascript-async-and-defer
tags: ['javascript']
---  
Both `async` and `defer` attributes look like they do the same thing at first glance, but there are nuances to `async` and `defer`. Most of the time, you'd want to use `defer` instead of `async`, even though `async` sounds sexier.   

But why?   

I'd like to walk you through the differences and why you should use them (and also why you don't have to use them).   

<!-- more -->  

## Why use `async` or `defer` in the first place?                                                                                      

When the browser comes across a `<script>` tag when loading HTML, the browser is forced to download parse the entire `<script>` and evaluate it first, before it can continue with reading the rest of the HTML to build the DOM.   

This means the normal `<script>` tag is blocking and can cause the DOM to stop loading.   

Here's an example where I deliberately created a script with 20000 lines of `console.log` statements within `long.js`. This stalls the loading of the rest of the page  

```html
<p>Before Script</p>
<script src="long.js"></script>
<p>After Script</p>
```  

  <figure role="figure">
  <video controls autoplay>
    <source src="/images/2021/async-and-defer-attributes/after-script.mp4" type="video/mp4">
  Your browser does not support the video tag. Watch the video <a href="/images/2021/async-and-defer-attributes/after-script.mp4"> here </a> instead.
  </video>
  </figure> 

Both `async` and `defer` allows the browser load and parse the JavaScript file separately, so the DOM can be shown immediately. This allows users to see content faster.   

<figure role="figure">
<video controls autoplay>
  <source src="/images/2021/async-and-defer-attributes/async.mp4" type="video/mp4">
Your browser does not support the video tag. Watch the video <a href="/images/2021/async-and-defer-attributes/async.mp4"> here </a> instead.
</video>
</figure> 

## We can still put scripts normally at the bottom  

Since a `script` is blocking, it became a best practice to put all scripts at the bottom of the page.   

```html
<body>
  <!-- ALL OTHER STUFF --> 
  
  <!-- All script -->
  <script src="blah.js"></script>
  <script src="blah2.js"></script>
  <script src="blah3.js"></script>
 </body>
```  

This practice still works. We don't have to get fancy with `async` and `defer` attributes if you don't want to. Feel free to continue using the old-school method without feeling guilty!   

## Async vs Defer  

Both `async` and `defer` load scripts without blocking the DOM, but there are two differences between `async` and `defer`.   

### Defer waits for the DOM. Async doesn't.   

The first difference is `async` doesn't care whether the DOM is fully loaded. `defer` waits for DOM to be loaded before it executes.   

This means:   
  - You should use `defer` if your script requires the DOM.   
  - If you use `async` and you need the DOM, you run the risk that the element you need cannot be found (which is a potential source of bugs).   

Regarding the second point, the risk happens when you have a large DOM to parse through. For example, say you have 20,000 button elements and you want to select them all. `defer` would ensure all `20000` elements are selected. But `async` would select as many elements as there are when the `async`-ed script is fully loaded.   

```html
<head>
  <script src="defer.js" defer></script>
  <script src="async.js" async></script>
</head>
<body>
  <!-- 20000 buttons -->
</body>
```  

```javascript
// defer.js
const deferButtons = document.querySelectorAll('button')
console.log('Defer:', deferButtons.length)
```  

```javascript
// async.js
const asyncButtons = document.querySelectorAll('button')
console.log('Async:', asyncButtons.length)
```  

<figure role="figure">
<img src="/images/2021/async-and-defer-attributes/number-of-elements.png" alt="Number of elements selected by async and defer">
</figure>   

### Defer respects the sequence of scripts. Async doesn't.   

We can prove this with another example. We'll have three scripts. Each script logs a number into the console. If we slap `async` into the scripts, the loading order becomes unpredictable.   

```html
<script async src="script1.js"></script>
<script async src="script2.js"></script>
<script async src="script3.js"></script>
```  

<figure role="figure">
<img src="/images/2021/async-and-defer-attributes/async-sequence.png" alt="Loading order of async">
</figure>  

But if we use `defer` the loading order will always be as specified  

```html
<script defer src="script1.js"></script>
<script defer src="script2.js"></script>
<script defer src="script3.js"></script> 
```  

<figure role="figure">
<img src="/images/2021/async-and-defer-attributes/defer-sequence.png" alt="Loading order of defer">
</figure>   

## When to use async  

You should use `async` if your script contains the following conditions:   
  - The DOM you need is already present (or the script doesn't need the DOM)  
  - The script doesn't depend on other scripts  

People normally say analytics is a good case for `async` scripts. I disagree. `async` is only good for analytics when you're using it for simple analytics like tracking page loads. We cannot rely on `async` if we want to track events like button clicks that require the DOM. In such cases, I prefer to use `defer` instead.   

### Loading scripts in the middle  

`async` is great for loading scripts in the middle of the DOM if you have to. Since the DOM is already present, the script can be executed immediately without problems.   

One example here is my newsletter signup form (which is powered by Convertkit). I load this newsletter form via the async attribute because I want it to show as soon as possible. It works because all necessary elements are already present.   

```html
<div class="newsletter">
  <script async src="link-to-script"></script>
</div>
```   

That said, do this kinda scripts-in-the-middle style sparingly. If your scripts are all over the place, it becomes really hard to remember where you placed your scripts.   

## When to use defer  

You should use `defer` for all other scripts. `defer` is great because it:   
  - Gets loaded as soon as possible — so it reduces load times.   
  - Doesn't execute until everything you need is ready — so all the DOM you need is there  
  - Follows script order — allows you to structure which script comes first  

### New-age loading  

Since `defer` loads scripts in the order specified, and it only executes scripts after the DOM is loaded, we can safely substitute `defer` as the best-practice default going forward.   

This is practically the same as the old method — but it has the benefit that scripts are loaded first and asynchronously, which means faster execution overall!   

```html
<head>
  <script defer src="script1.js"></script>
  <script defer src="script2.js"></script>
  <script defer src="script3.js"></script> 
</head>
```  

When we do this, we can keep all scripts (including CSS) at the `<head>` which creates a cleaner HTML overall.   

## Wrapping up   

Practically, `defer` is more useful, but `async` sounds sexier 😜. Most of the time you'd want `defer` instead of `async`.   
