---
title: Async and await in loops
---

Basic `async` and `await` is simple. Things get a bit more complicated when you try to use `await` in loops.

In this article, I want to share some gotchas to watch out for if you intend to use `await` in loops.

Here’s the article. Enjoy!

[https://zellwk.com/blog/async-await-in-loops](https://zellwk.com/blog/async-await-in-loops)

Key takeaways in this article:

1. If you want to execute `await` calls in series, use a for-loop (or any loop without a callback).
2. Don’t ever use `await` with `forEach`. Use a for-loop (or any loop without a callback) instead.
3. Don’t `await` inside `filter` and `reduce`. Always `await` an array of promises with `map`, then `filter` or `reduce` accordingly.
