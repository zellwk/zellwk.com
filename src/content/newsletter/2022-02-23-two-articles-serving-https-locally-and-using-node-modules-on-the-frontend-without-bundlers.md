---
title: Two articles — Serving HTTPS locally and Using node_modules on the frontend without bundlers
---

I'm beginning to break down my barriers against writing publicly once again — I'm writing a ton right now. So much that I have two articles for you today, and many more in various stages of drafts.

Here we go.

## Serving HTTPS locally with Node

You don't need a HTTPS scheme when you use `localhost`most of the time because `localhost` is considered to be a secure context.

But sometimes you need to run a HTTPS site on your local computer. They can be many various reasons why you need this. Examples:

- Facebook API doesn't recognize `localhost`as a secure context and requests you to serve up \`HTTPS scheme.
- I was playing around with sameSite cookies (which I'll talk about in a future article) that needed a local HTTPS website that's not served on `localhost`.

Whatever the reason, sometimes you need it. When you need it, you can pull this out of your pocket and use it.

[Here's the article](https://zellwk.com/blog/serving-https-locally-with-node/). Enjoy.

## Using node\_modules in the frontend — without bundlers.

Yes. You read this right.

It's possible to use packages installed in the folder without using any bundlers. This is incredibly liberating because we can now use code that others have wrote (or even those we wrote ourselves) that is hosted on npm.

No more having to deal with complicated bundlers like Webpack and Rollup — debugging them is really not fun. We can download what we want, serve it up, and have fun building the things we want to build.

I’m so excited to share this discovery with you. Some would call this method a "hack", but heck, why do we care about hacks? This method is so powerful because it lets us make magic without being lost in the tools required to make the magic happen.

[Here's the article](https://zellwk.com/blog/node-modules-in-frontend-without-bundlers/). Have fun reading it.

## Learn UI Design

I saw Eric Kennedy tweet about [designing layouts](https://twitter.com/erikdkennedy/status/1495872081988366344?s=20&t=StZgs7JH820qi1-tBub4Ow) recently on Twitter.

Eric has good stuff. I recommend reading this thread if you're interested in UI Design.

This reminded me of Eric's [Learn UI Design](https://app.learnui.design/a/aff_1tdkp34d/external?affcode=70335_dlmxp26f) which I highly recommend for people who are interested in making great designs.

I love the course because it uses a similar principle to how I teach — it gives the fundamentals you need to know, so you can go out there and make magic.

I already benefited from the course even though I didn't complete it.

Note: I get some kickback if you use the link above to buy Learn UI. I'm not recommending this because I get kickbacks, but because I truly benefited from the course.

Hm. I'm wondering if I should create an affiliate system for Learn JavaScript at this point. Should I? If you are experienced with how affiliates work and would like to help, please contact me. I'd love to have a chat.

## How's your week?

I'm still working hard on writing Understanding Async JavaScript — even as I write the blog posts.

I'm also getting my mind blown by RuPaul's Masterclass videos. He's so good. Neil deGrasse Tyson's Masterclass videos are freaking amazing too.

How's your week? Let me know!
