---
title: "The #1 mistake people make when learning Susy"
---

The #1 mistake most people make with Susy is that **they don’t understand what context is**.

Because they don’t understand this fundamental principle, they’ll end up having weird problems with grids not lining up properly, like this:

![](https://convertkit.s3.amazonaws.com/assets/pictures/393/1074/img2.png)

The neat thing is that you only need a single line of code to fix this:

```
.content {  padding: gutter($context);  }
```

\~~~

And to fix it, you’ll have to understand what this `$context` is all about. I’ll show you how to do so in chapter 6 of the sample chapters I sent you.

Things become so much simpler once you know context. You can even use this `gutter()` trick to help you line up your galleries nicely, like this:

```
.gallery-item {     margin-bottom: gutter($context); }
```

\~~~![](https://convertkit.s3.amazonaws.com/assets/pictures/393/1075/img1.png)

Ain’t that great? So head over to chapter 6 in your sample chapters and read this context part carefully!

This is just one of the many tricks I’ve discovered about using Susy effectively. I have a couple more that’ll help speed up your process when you learn Susy.

I’ll share another trick with in the next email regarding building responsive websites. This trick saved myself more hours than I can possibly count. Watch out for it.
