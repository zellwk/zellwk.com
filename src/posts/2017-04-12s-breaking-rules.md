---
title: Breaking the rules
layout: post
slug: breaking-the-rules
tags:
 - css
 - mindset
newsletter: better-fed
---

If you read my past articles on CSS architecture, you would have noticed I took parts of techniques created by experts and mixed them into a set of rules that I follow. Some of my rules helped others understand how to use a technique, while others sparked public outrage (like my unconventional BEM usage. People exclaimed that I broke BEM rules).

I'd like to confess today that I broke more rules than that. Breaking rules is my way of finding out what to take in from techniques mentioned by experts. It's also my way of figuring what to change to adapt to my personal belief. Today, I'd like to dig into this rule-breaking process.

<!--more-->

## When should you break rules?

Techniques and practices are created by experts for only one reason — they found a solution to their problems. We only hear about them because they share it with the world. Then, only a handful that stays around as best practices are widely used by everyone.

Before breaking these established rules and techniques, you should ideally have a firm grasp of the fundamentals of the medium. You should also have a firm understanding of the rule you're trying to break.

So, the first step of breaking rules is to use them religiously. Once you begin using the rules, you'll start to see what works and what doesn't. Then, you have a chance to change it.

Here's one example.

Once, I tried to write BEM classes for every HTML element, because, we're supposed to name everything with BEM, right? So, I did this:

```html
<nav class="nav">
  <a href="nav__link"> Link</a>
  <a href="nav__link"> Link</a>
  <a href="nav__link"> Link</a>
  <a href="nav__link"> Link</a>
  <a href="nav__link"> Link</a>
</nav>
```

But I felt it was redundant to write the `.nav__link` class for every `<a>` tag because I'm already stating the obvious. Here, I broke the BEM rules again and styled links `.nav > a` instead.

### You probably broke some rules too

You may not know it, but you've probably broken a few best practices yourself too. If you want to find out, just think back to when you feel that a rule felt cringe-worthy, and you decided to learn something new to change it.

The most common example I can think of is people switching from HTML-classes based grids like the ones offered by Bootstrap and Foundation to [creating their own CSS-based grids](/blog/from-html-grids-to-css-grids) with Susy, Flexbox, or the newer CSS Grid spec.

I went through the process myself too, and I never looked back. In this process of changing, I felt something was wrong. I wanted to change it, and I did.

So, the first and foremost step to breaking rules is to use them religiously and notice what feels wrong. Once you know what feels wrong, you have the chance to change things up.

But first, let's talk about the psychology of breaking rules.

## Should you be breaking rules?

"No, it's not right to break rules", you may think. You're not alone. It's a common thought because of two reasons.

First, we've been conditioned to believe there's a right answer to everything in the world thanks to our education system. If we break a rule, we feel that we'll provide a wrong answer. A wrong answer can equate a failure, which sends shivers down our spines. So, we avoid breaking rules at all costs. (Besides, you've probably been punished for breaking rules before).

Second, rules from best practices we hear often originate from experts in the field who have years of experience. Since we're newer and relatively inexperienced compared to these veterans, what makes us believe that its possible to come up with solutions much better than theirs? It's perfectly reasonable to be following rules laid out by others. It's probably safer anyway.

Unfortunately, experts' answers, although good, may not be the best solution to your questions. Your circumstances are different from theirs. Technological improvements in today's world may also have made certain practices obsolete.

What you need is a critical mind. The ability to think critically and evaluate if a certain tool or technique is what you really need. A key ingredient of critical thinking is the ability to question and challenge assumptions so you emerge with a better answer.

So, if not for a better solution, you should probably invest some time to figure rules out and try to change them for the better. It'll make you a better developer eventually because you've thoroughly considered your options. (You'll also become more opinionated, which apparently seems to be a good trait for coding interviews).

## The rule-breaking process

Rule-breaking is a process of trial and error. It's an experiment where you test everything you can think of to find a better solution (or until you prove yourself wrong).

To do so, you first need to isolate the problem and create a hypothesis to solve it. In the BEM example I gave above, I felt the need to write BEM selectors for links was redundant, and came up with a solution for it.

Is my solution better than the previous one? Well, I won't know. Not until I test my new rule and see if it works well. If it does, I'll call it a day and maybe look for new rules to break.

If it doesn't, well, I go back to the drawing board and try to think of a better solution. Sometimes, it also helps to talk about your problems/solutions with other developers and see if they have better answers.

The idea here isn't to seek victory in successfully changing rules with your own hands. The idea is to go through the process of finding better solutions. The more you try finding better solutions, the better your solutions eventually become, the better you become as a developer. (And of course, the more sought after you become, if you need me to spell it out).

## Should you be breaking rules constantly?

Er. You'll become nuts if you look for things to break constantly. Careful that vase! 😂.

But yeah, go ahead and change up your rules whenever you feel that something can be improved. That's how you can learn and become better.

What did you think of this article? Did it help change your mindset? I'd love to hear what you feel in the comments below.

