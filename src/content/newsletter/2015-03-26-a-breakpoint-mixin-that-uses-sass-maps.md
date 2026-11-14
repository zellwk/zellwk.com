---
title: A Breakpoint Mixin that uses Sass Maps
ps: "PS: If you love Mappy Breakpoints, it’ll be awesome if use it and tell everyone else about it :)"
---

I like using Breakpoint to handle my media queries and I love to store all my breakpoints in a Sass map. Unfortunately, these two don’t go very well together :(

So I hacked together my own breakpoint mixin and affectionately named it [Mappy Breakpoints](https://github.com/zellwk/mappy-breakpoints). I believe you’ll like it.

It makes writing media queries with Sass maps MUCH easier.

Say you have a map with various breakpoints:

```
$breakpoints: (   small: 320px   large: 920px   // ... );
```

If you wanted do a min-width and max-width query with the small and large keys, you’ll have to write a complex query like this with breakpoint:

```
@include breakpoint(map-get($breakpoints, small) map-get($breakpoints, large)) { // stuff }
```

But you can write something simple with Mappy Breakpoints

```
@include mappy-bp(small large) { // stuff  }
```

There’s much more to what Mappy Breakpoints can do. It might just be the breakpoint mixin that you’re looking for too. :)

Find out [all about Mappy Breapkoints in this post](http://www.zell-weekeat.com/mappy-breakpoints/).

What do you think of Mappy breakpoints? I’ll love to hear your comments about Mappy breapkoints on the blog.
