---
title: Susy vs other CSS based grid systems
---

CSS based grid systems provide you with far more flexibility compared to HTML based ones. But how would you choose one over the rest?

Let’s look through popular systems today and have a look at how they compare to Susy.

## Neat vs Susy

Neat is a simple grid system created by the guys who created Bourbon. Neat primarily uses floats to create grid layouts. Hence, Neat can do everything HTML based layouts like Bootstrap or Foundation can.

The only difference is that Neat is a CSS based grid system and hence, allows you to change up the markup based on classes you choose.

Neat allows you to use two additional resources – Bitters and Refills, which are basically scaffold styles and a UI toolkit.

You can think of it this way:

Neat + Bitters + Refills = CSS based Bootstrap Framework

Susy on the other hand, is a complete grid engine that allows you to use both float-based layouts and isolation based layouts.

Isolation based layouts uses the isolate technique to enable you to place precise grids that overcome browser subpixel rounding errors. They also allow you to use asymmetric grids. You can read more about the isolate technique in this CSS Tricks post

Susy only has a grid system. You’ll be disappointed if you’re looking for a full-featured framework.

However, that said, Susy is flexible enough that you can use it with any UI toolkit of your choice. You can even use Susy with Bootstrap if you want to.

In Short, Susy is more powerful and more flexible compared to Neat.

## Singularity vs Susy

Singularity was the first grid system that allowed you to create asymmetric grid layouts with the isolate technique.

You can also create normal layouts, but you’ll have to use isolation as well.

The creators of Singularity joined forces with the creator of Susy (now called Susyone) to create Susy 2 (now called Susy). Hence, Susy contains important concepts from Singularity and that made asymmetric layouts were possible in Susy.

This means that Susy is effectively capable of doing both things that Neat and Singularity does.

Guess which is more powerful? :)

## Jeet vs Susy

Jeet is a popular grid system that prides itself as a grid system for humans. It uses a language syntax, like `cycle` and `stack`, that’s entirely different from other grid systems.

I’ll be honest, I have difficulties trying to comprehend what Jeet does through its limited documentations, and I didn’t dive too far in.

From my limited perspective, it seems like Jeet is capable of what Neat does, but it’s written in a different way.

## Flexbox vs Susy

Flexbox is a CSS3 module that’s in the rage these days. It solves many longstanding CSS issues that previously required weird hacks to fix. One of such issues is vertical alignment in CSS.

Flexbox is very powerful and it can also be used to create grids. As a result, some people felt like they had to choose between Flexbox and Susy.

Grids created with Flexbox can be solid. Unfortunately, it is difficult to create precise grids with Flexbox unless you are willing to do complicated math yourself.

Here’s one secret not many people knew about:

You can combine Flexbox and Susy to take advantage of Susy’s precise measurements and Flexbox’s power to create grids that were impossible to make previously. The secret is to use the functions provided by Susy to get precise values to use in Flexbox.

Hence if you master Susy, you can not only create float and isolation based grids, but flex-based ones as well.

## So.. what’s your decision?

What are your thoughts about Susy after comparing it with the different systems? Are you going to use it?

Hold off your decision if you’re still undecided. I’ll tell you more about how I made my choice in the next email.

Hopefully that’ll help :)
