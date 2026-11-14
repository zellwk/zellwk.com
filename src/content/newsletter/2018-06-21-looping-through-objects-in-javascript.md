---
title: Looping through objects in JavaScript
ps: P.S. Learn JavaScript enrollment begins in less than 2 weeks! I’m so excited! I can’t wait to share it with you!
---

Once in a while you may need to loop through objects in JavaScript. The only way to do so before ES6 is with a for...in loop.

The problem with a for...in loop is that it iterates through properties in the Prototype chain. When you loop through an object with the for...in loop, you need to check if the property belongs to the object. You can do this with hasOwnProperty.

We no longer have to rely on for...in and hasOwnProperty now. There’s a better way.

This article shows you the better way:

[https://zellwk.com/blog/looping-through-js-objects](https://zellwk.com/blog/looping-through-js-objects)
