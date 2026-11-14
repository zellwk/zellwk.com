---
title: A new (and easy) way to hide content accessibly
---

When I want to hide content accessibly, I always turn to [Jonathan Snook’s snippet](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility).

```
.element-invisible {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}
```

But yesterday, I happened to chance upon Scott O'Hara’s [article on hiding content](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html). Scott says we only want to hide content in three different contexts:

1. Hide it completely
2. Hide it visually
3. Hide it from screen readers

And I had an idea to about a new snippet to hide content accessibly. Jonathan Snook even said we might have a winner with my new snippet!

I’m beyond excited to share this with you (so much that I interrupted the two-article async/await series 🤗.

Here’s the snippet:

```
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
  pointer-events: none;
}
```

And here’s an article about the discovery process.

[https://zellwk.com/blog/hide-content-accessibly](https://zellwk.com/blog/hide-content-accessibly)

Let me know what you think of this.

Enjoy!
