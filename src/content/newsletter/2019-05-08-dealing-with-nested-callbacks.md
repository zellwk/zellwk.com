---
title: Dealing with nested callbacks
---

JavaScript is a strange language. Once in a while, you have to deal with a callback that’s in another callback that’s in yet another callback.

People affectionately call this pattern the _callback hell_.

It kinda looks like this:

```
firstFunction(args, function() {
  secondFunction(args, function() {
    thirdFunction(args, function() {
      // And so on...
    })
  })
})
```

This is JavaScript for you. It’s mind-boggling to see nested callbacks, but I don’t think it’s a “hell”. The “hell” can be manageable if you know what to do with it.

In essence, you can:

1. Write comments
2. Split functions into smaller functions
3. Using Promises
4. Using Async/await

More in today’s article. Enjoy!

[https://zellwk.com/blog/nested-callbacks](https://zellwk.com/blog/nested-callbacks)
