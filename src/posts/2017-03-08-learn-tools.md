---
title: Should you learn [insert shiny new tool]?
description: Have you felt the pressure to a new tool? Do you feel like a shitty developer? Don't! Here's why (and how to think through it)
layout: post
slug: learn-tools
tags:
 - life
 - learning
newsletter: jsr
---

*Oh look! Everyone is talking about Webpack now! Should I upgrade my workflow to use Webpack?!*

*"Hmmmmm... Maaaybe I should use PostCSS since expert X highly recommends it. I can't decide..."*

*"OH WOW. FACEBOOK USES REACT! REACT MUST BE HAWT! I NEED TO LEARN THAT TOO!"*

Are you familiar with any of these conversations? It's not surprising if you are! New tools pop up in the frontend world incredibly quickly. Whenever something new pops up, people scream about how cool it is. Even industry experts begin using them. Heck, the expert you love and follow may even recommend you to use them!

Do you feel pressured to try the new tool out? Do you feel like a shitty developer if you don't keep up with the latest tools?

If you do, you're not alone!

Today, I want to share with you a simple framework to determine if you should learn/switch to [insert shiny tool]. Read on if it sounds any interesting.

<!--more-->

It's simple. There are five steps:

1. Figure out what [insert tool] does.
2. Figure out what sucks right now
3. Determine if it's worth the investment
4. Learn it (if it's worth it)
5. Differentiate opinions from facts

## Step 1: What does [insert tool] do?

The first step is to understand what the tool does on a high level. You'll want to answer these three questions:

1. What does the tool do?
2. What's so awesome about it?
3. What's sucky about it?

More often than not, you only need a little bit of research to tell what the tool does. The articles you see circulating through your favorite newsletters and social media should be enough to bring you through this step.

If you want to, you can dig a little deeper to find out what's so awesome and what's sucky about it.

Want some examples? Let's see...

**PostCSS**:

- *What it does*: It transforms your CSS so you write lesser code.
- *Special power*: Write lesser code + use new CSS things! Yay!
- *Sucky areas*: Need to evaluate possible plugins.

**Webpack**:

- *What it does*: Huge asset bundler with lots of options. Almost like a generic task runner, but specialized for asset bundling. Oh, and there's a server thingy too.
- *Special power*s: Hot-reload!
- *Sucky areas*: Hard to understand and configure

**Gulp**:

- *What it does*: Generic task runner that can [automate all the things](/blog/workflow-overview/)!
- *Special power*: Extremely flexible and configurable
- *Sucky areas*: Have to wait for maintainers to update their gulp plugins when new versions get released

**React**:

- *What it does*: Like a special kind of template engine with performance improvements in the browser.
- *Special power*: Can be used to make amazing + complex apps when combined with React Router and Redux
- *Sucky areas*: Shitloads to learn!

Right, the comments probably too short and doesn't do any of the above tools justice. But the point is, *you don't need to be 100% sure at this stage* (you have to be using it to know everything!)

## Step 2: What's sucky right now?

What are you unhappy about with your current workflow?

- Do you hate PHP? 😆
- Do you hate manually copy/pasting files?
- Do you hate writing JavaScript callbacks?
- Do you hate downloading libraries manually?
- Do you hate stressful deployment situations?

What do you hate about your development processes right now? *Once you know what you hate/want to improve, you'll be able to evaluate tools much more effectively*.

For example, let's say you build amazing Wordpress websites.

If you want to improve your CSS authoring processes, you may want to add [Sass](http://sass-lang.com) or even [PostCSS](http://postcss.org) into your workflow.

If you want to use the latest enhancements in JavaScript, you may want to add [Babel](https://babeljs.io) (or [Webpack](https://webpack.js.org) or [Rollup](http://rollupjs.org), depending on whether you need to import node packages).

If you're unhappy with triggering workflows separately, maybe you want to use [Gulp](http://gulpjs.com) or npm scripts to trigger a chain of build commands for you!

Do you need React, React Router or even Redux? It doesn't really fit, does it? See how it becomes much easier once you know what you want to change? :)

On the flipside, you can't always tell if a tool is what you need from your current workflow. *Sometimes, you need something entirely new*. Here's an example:

Let's say your familiar with building websites with Wordpress, and you want to learn to build webapps.

However, you don't want to use Wordpress to build your webapp. Maybe you want to use Node (with Express), Python (with Django) or Ruby (with Rails).

Each stack mentioned here works with a completely different (but strangely similar) process. They often use different tools. Understanding these constraints will help you in your search for your bunch of shiny new tools to use.

## Step 3: Is it worth your investment?

Time is the most important resource you'll ever have. You want to consider whether it's worth it to spend time on [insert shiny tool]. Of course, besides time, you also want to consider your sanity and the risks for the project.

Here are some things you can consider:

1. Will [insert tool] help you reduce errors
2. Will [insert tool] help you write better code?
3. Will [insert tool] prevent stressed deployment situations?
4. Will [insert tool] help you feel better about your new process?
5. Will [insert tool] shorten the time needed for your sucky process?
6. How long do you have to learn [insert tool]?
7. How long can you afford to spend to learn [insert tool]?
8. Is it worth the risk to change to [insert tool] now?

As much as possible, try to consider different angles before you make your decision. *What you ultimately base your decision on is entirely up to you*. **It's okay**.

1. *It's okay* to change because you want to learn something new.
2. *It's okay* to change because the expert you admired tells you to do so.
3. *It's okay* to change because you hate your sucky processes right now.

Just remember **it's also okay not to change**. There's no need to be pressured to change into something that's not needed. If you've built a decent website with Wordpress right now, there's no need to rush and change it to a static site generator unless that's what you want.

Don't worry about what others say. It's your project. (Of course, talk it through if you have a team!)

## Step 4: Learn and implement

If you decide to learn [insert tool], don't learn halfheartedly. Make sure nothing stops you until you're completely equipped with the knowledge you need. (With reason, of course).

When you try to learn something deeply, articles on the web are often not enough. You need to experiment and try new things on your own.

Sometimes, it helps immensely to buy courses and books that teach the topic in-depth. It'll bring you to where you need to be in double quick time.

- Need a CSS layouts course? Consider Rachel Andrew's [CSS Layout Workshop](https://thecssworkshop.com).
- Need to learn ES6? Consider Wes Bos's [ES6 for everyone](http://wesbos.com/es6-for-everyone/).
- Need to learn Animations? Consider signing up for Sarah Drasner and Val head's [web animation workshop](https://webanimationworkshops.com).
- Need to learn accessibility? Consider Heydon Pickering's [Smashing mag book, inclusive design patterns](https://www.smashingmagazine.com/inclusive-design-patterns/).

(No affiliate links here. Feel free to click! 🤗).

There are tons of books and courses created by well-meaning experts. *The wealth of knowledge they share, condensed in one book/course is intense that you'll get up to speed in one short month* (as opposed to banging your head on the wall for a year).

Now, if you (unfortunately) read a book/course that's not to par, don't let that lousy experience stop you from learning [insert tool]!

When I tried to learn Gulp in the past, I bought a book to help me with it. Unfortunately, what's written there is almost the same as what's written on the docs (why did I even buy the book in the first place? 😑). But I kept going and learned a ton. Now, I can use Gulp to help me automate looooots of stuff!

(And because that book sucked, [I wrote another that's pretty amazing](http://automateyourworkflow.com). What a shameless plug! 😜)

Oh! While we're there (with shameless plugs), I'm releasing my latest course, [Mastering Responsive Typography](https://mastering-responsive-typography.com), next week. It's a course for frontend developers who want to build good-looking websites with good typography with resorting to hacky CSS. Check it out if you geek out in web typography.

Finally. Just one more step!

## Step 5: Differentiate opinions from facts

Huge loads of opinions fly around the web (even in offline, too!). If you're not careful, you might succumb to opinions that lead you astray instead of helping you out!

Let me illustrate with PostCSS as an example.

If you heard of PostCSS, you probably would have thought of switching Sass with PostCSS (if you use Sass). Where does this thought come from?

Maybe you heard you need to reduce dependencies as much as possible? Well, where's the fun in that if you can't use your favorite Sass libraries like [Susy](http://susy.oddbird.net) or [Typi](https://github.com/zellwk/typi)? 😉

Or maybe you thought must choose between Sass or PostCSS? If you are, then you probably should do more homework 😝. You don't need to choose between them. You can use them both because the tool chain looks like this:

`Sass -> CSS -> PostCSS -> Final Output (CSS)`

And well, maybe PostCSS will replace Sass eventually. Maybe, just maybe. But until that time comes, you're not restricted to only one of them.

One more thing. Don't choose plugins/tools blindly because of what they advertise. One example I frown upon is the [CSSNext](http://cssnext.io) PostCSS plugin.

Don't get me wrong. CSSNext is great and awesome. There's only one thing I hate. It claims you can use CSS Variables in your code, but outputs pure values that have nothing to do with CSS Variables! 😡

<figure><img src="/images/2017/learn-tools/css-next.jpg" alt="CSS Next doesn't create any CSS Variables!">
  <figcaption>CSS Next doesn't create any CSS Variables!</figcaption>
</figure>

## Wrapping up

We're at the end!

So, there's no need to feel the pressure to change into [shiny new tool]. This *"I need to keep up!"* pressure causes much burnout, and it's probably the origin of the whole JavaScript fatigue thing (did you know that's a thing?!).

What you can do instead, is to evaluate whether you need [shiny new thing]. *Find a good reason to switch (or not switch) and stick by that decision*. (Again, within reason, of course).

If you decide to switch, make sure you *learn everything you can*. Don't learn anything halfheartedly because it'll only do more harm than good in the long run.

Finally, **thanks for being a developer**. You're one of the most wonderful people on the planet that make dreams come true! 💥💥💥
