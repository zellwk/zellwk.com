---
title: Best way to loop through JavaScript objects
ps: |-
  P.S. I’ve been building utilities to make coding much simpler and easier compared to just using Vanilla JS over the past few months.

  I’m consolidating them all into a project called [Splendid UI](https://splendid-ui.com). It’s still in the early stages at this point but I’m adding more content as I go along.

  I’d love for you to give me some feedback if you’re happy to spare some time! :)
---

Bringing back an oldie but goodie this week.

Way back in 2018, I wrote an article about [how you can iterate through objects in JavaScript](https://zellwk.com/blog/iterating-through-js-objects).

The whole idea is this: The best way to iterate over a JavaScript object is to convert the object into an Array first. Then loop over that array.

You can do this with three methods:

- `Object.keys`
- `Object.values`
- `Object.entries`

Although these methods were good, I can’t help but feel that it’s tedious to convert objects into arrays first before looping over them.

I mean, why not loop over the objects immediately instead?

That’s when I wrote two new helper functions that allows me to loop over objects immediately:

1. `objectForEach`
2. `objectMap`

Here’s what they look like:

Today, I extended the article to include how you can use `objectForEach` and `objectMap` so you can loop through objects easily and quickly.

[Here’s the article](https://zellwk.com/blog/iterating-through-js-objects).

Once again, thanks for reading and I hope this has been helpful.
