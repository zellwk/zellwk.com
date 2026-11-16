---
title: What are you using to deploy your website?
---

HELLO! I managed to put up a website that shares more about Build and Deploy. If you’re curious, or if you missed out on certain pieces of information, you can find them all here! [Have a look](https://buildanddeploy.today)!

There’s an update too. Based on the questions I’m receiving from folks who have bought Build and Deploy, I have created a tentative lesson plan for the 8 Workshop sessions:

- **Session 1:** Introduction to the system (and the essential stuff)
- **Session 2:** SEO
- **Session 3:** CSS
- **Session 4:** Building Reusable Components
- **Session 5:** Asset Management and JavaScript
- **Session 6:** Using a Content Management System
- **Session 7:** Advanced Astro & Netlify stuff
- **Session 8:** To be determined

Remember, this lesson plan is tentative. We may go through some topics quickly and we may stay longer on others — depending on the questions and interests of the people who showed up. So I highly recommend you turn up even though you can just watch the recording!

With that said, let me direct your attention towards the 3rd part of building and putting a website up on the internet.

1. Building the website itself — Building
2. Readying the website for production — Optimization
3. **Putting the website online — Deployment**

We’ll talk about deployment today.

## How do you deploy your website?

There are three ways:

- The Traditional way — with a hosting service like Bluehost
- The DIY way — where you spin up a server with Digital Ocean or Linode
- The “Modern” way — where you use Netlify, Vercel, or equivalent services

Which way are you using?

If you’re using traditional web hosts like Bluehost / Justhost / Media Temple / Siteground and others, I have bad news for you. **You should stop using traditional web hosts because you’re wasting good money.**

Why?

Because Traditional web hosts are expensive (for no good reason).

They entice you with a lower monthly price when you sign up, but they hit you with a “regular rate” that’s almost double or triple the initial amount. That’s the reason why my friend had to pay $400 each year to Siteground for hosting.

You don’t have to pay so much for hosting!

- Netlify lets you host for free up to 100GB bandwidth — which is practically free for most people (unless your site gets a large amount of traffic, like mine).
- Digital Ocean lets you host for cheap at $4/month — which is peanuts compared to what you pay for traditional web hosts.

So stop using traditional web hosts. **Stop throwing good money away.**

**If you’re starting out, I highly recommend using Netlify**, not only because it is free, but because it has amazing features built into it.

- **You get continuous delivery automatically** — you can push a commit into Github and Netlify updates your website automatically. No need to manually deploy anything with FTP or Rsync.
- **You get staging environments for free** — You can set up multiple branches in Git and ask Netlify to deploy other branches. These branches would serve as a staging environment for you to test out how things look like in production (without going cowboy on your main server).
- **You get forms for free** — Netlify lets you create forms without a hassle. And as you know, forms are essential for websites (hint: contact page).

You can do the same with Digital Ocean… but you have to learn lots of stuff. It’s hardly worth the effort when you’re starting out. Save that for when your site is growing and you’re making money. (Or if you’re building apps).

Setting up Netlify is not difficult. But knowing what you get for free and learning to use that takes a tiny bit of effort. I’m already telling you lots of stuff in this email so that should reduce the amount of work you need to do!

And of course, I’ll show you everything you need to know in [Build and Deploy](https://buildanddeploy.today/)

I hope this email helps you work out any kinks in choosing a web host! Remember, stop using traditional web hosts because you’re throwing away your money!

Tomorrow, I’ll talk about optimization and LOTS OF EXCITING FEATURES that Astro provides! (It’s one of the reasons why Astro is SOOO GOOOD).

I’ll see you tomorrow in your inbox!
