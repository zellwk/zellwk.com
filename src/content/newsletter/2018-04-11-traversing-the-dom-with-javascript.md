---
title: Traversing the DOM with JavaScript
---

A good JavaScript developer needs to know how to traverse the DOM—it’s the act of selecting an element from another element.

But why do we need to learn to traverse the DOM? Isn’t document.querySelector enough for most of our needs?

In this article, I’m going to show you why traversing is better that document.querySelector, and how to traverse like a pro. So sit back, relax, and enjoy the article!

[https://zellwk.com/blog/dom-traversals](https://zellwk.com/blog/dom-traversals)

To summarize, you can traverse the DOM in three directions—downwards, upwards and sideways. Here’s a bullet point of the methods I taught in the article:

1. Traversing downwards
   1. `element.querySelector`
   2. `element.querySelectorAll`
   3. `element.children`
2. Traversing upwards
   1. `element.parentElement`
   2. `element.closest`
3. Traversing sideways
   1. `element.nextElementSibling`
   2. `element.previousElementSibling`
   3. Combine `parentElement`, `children`, and `index`
