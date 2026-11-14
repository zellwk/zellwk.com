---
title: How and when to use async and defer
---

Both `async` and `defer` attributes look like they do the same thing at first glance, but there are nuances to `async` and `defer`. Most of the time, you'd want to use `defer` instead of `async`, even though `async` sounds sexier.

But why?

I'd like to walk you through the differences and why you should use them (and also why you don't have to use them).

[Click here to read the article](https://zellwk.com/blog/javascript-async-and-defer). Enjoy!

The gist of things:

You should use `async` if your script contains the following conditions:

- The DOM you need is already present (or the script doesn't need the DOM)
- The script doesn't depend on other scripts

You should use `defer` for all other scripts.

When we use `defer`, we can load our scripts upfront — which I now propose as best practice going forward (at least for myself 😜).
