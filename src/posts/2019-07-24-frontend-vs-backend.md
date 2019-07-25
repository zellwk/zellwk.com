---
layout: post
title: Frontend vs Backend
description: "The difference between Frontend and Backend is: Frontend is about perception; Backend is about communication."
slug: frontend-vs-backend
tags:
  - thoughts
---

I used to think it would be easy to write backend if I knew JavaScript. I thought it would be easy because Node is JavaScript. I didn't have to learn a new language. 

But I was wrong. 

But backend was hard to learn. I took ages to learn it. (And I'm still trying to master it). 

I realized I had problems learning backend because I thought Frontend and Backend were the same—they were just code.

That's a big mistake.

**Frontend and Backend are different beasts altogether**. I had to respect their differences before I could learn Backend properly.

If I were to explain the difference between Frontend and Backend (in terms of implementation), I would say:

- Frontend is about perception
- Backend is about communication

<!-- more -->

## Frontend is about perception

When we build Frontend things, we care a lot about how users perceive what we built. We spend an ungodly amount of time asking these questions (so much that countless jobs were created for each of them).

1. Does it look good?
2. Does it make sense?
3. Is it user-friendly?
4. Is it accessible?
5. Is it fast?

We care.

And sometimes, we want to elevate a user's perceived experience (bring delight; yay!), we add things like:

1. Video/Images/Gifs
2. Animations
3. Color themes

With each additional feature, we also have to consider their possible implications:

1. Are videos/images/gifs too large?
2. What if someone can't stand our animations?
3. Does the user prefer a light theme or a dark theme?

We account for many things—all from a user's perspective. That's why I say Frontend is about perception.

**We think for our users.** And we build for them.

(Unfortunately, some developers delude themselves into thinking that `users === themselves`. They build sites for themselves instead of the people they should be building it for).

## Backend is about communication

Let me be specific. When I say backend, I'm referring to the layer between the Frontend and the Database. It's also the layer between the Frontend and any API you need to communicate with (if it goes through your own server).

To make things simple for some people, I'm talking about where you would create an Express app.

<figure><img src="/images/2019/frontend-vs-backend/server.png" alt="Image of a frontend, a server, and a database."></figure>

When you work on the Backend, you'll notice we don't create interfaces anymore. You don't fill up forms; you don't click on buttons. That's because they're not needed.

Backend isn't about perception. Nobody has to see anything. It just has to... work.

But what does "work" mean?

**Backend is there to allow communication between a Frontend and a Database** (or any external API). Imagine a telephone operator back in the early days. If you called someone on the phone, these operators had to manually connect your call to the person you're calling. (If they get it wrong, you call the wrong person).

<figure><img src="/images/2019/frontend-vs-backend/bell-telephone-operators.jpg" alt=""><figcaption>Watch <a href="https://youtu.be/2BzRjfOoiVQ">bell telephone switchboard operators</a> at work</figcaption></figure>

When you build a Backend, you're like the telephone operator. You connect things so they work.

When we build a Backend, we ask questions like:

1. What info do we need from the Frontend?
2. What info should we send to the Database/API
3. Was the operation saved properly on the Database/API?
4. What info did the Database/API return?
5. What info should we send back to the Frontend?
6. Are we rendering a website? If yes, which page should we render?
7. What should we do when info is wrong or missing?

We also think about speed and reliability. (Imagine what happens if you send something but don't hear from anything back in return...). But this one is more of an advanced topic.

## Different mental models

Here's a common pattern I observed in my early days of learning backend:

1. I would assume things to work in a specific way
2. I would search on Google on how to implement things the specific way I thought
3. (Google results would come up empty)
4. I would hack around it and build my own infrastructure
5. Only to learn (much later) that my way sucked

I was almost always wrong because I unconsciously relied on my frontend experience while I learned backend. I had to learn things the hard way to rewire my thinking.

Here's my biggest takeaway:

**Don't assume you know anything about what you're learning.** You're almost always wrong. Slow down so you have the time and space to learn. Always verify as you learn, so you remember and you rewire your brain.

(I hope I remember this when I learn something new next time).