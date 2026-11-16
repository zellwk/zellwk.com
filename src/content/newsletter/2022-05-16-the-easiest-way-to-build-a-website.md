---
title: The easiest way to build a website
---

The most important thing you need to do as a developer is to be able to put up your website on the internet. Once you can do this, the world becomes your oyster. Your possibilities open up.

You can use this website to:

- Find employment
- Show your portfolio
- Display interesting projects
- Write about stuff you care about
- Make websites for other people
- _… The possibilities are endless!_

**But how do you build a website and put it up online?**

I’m not talking about a simple website (like a single page one), but one that is complex enough to call a _real_ website.

There are three parts to the equation:

1. Building the website itself — Building
2. Readying the website for production — Optimization
3. Putting the website online — Deployment

We’ll talk about the building part today and leave the rest for another day.

## Building a _real_ website is harder than you imagined it to be

There are many ways to go about building a website.

The most simple way is to build a website with plain HTML, CSS, and JavaScript. Let’s not talk about the JavaScript part for now because it’s not essential for a simple website. (It’s useful, but not essential. Big difference).

Let’s talk about HTML first.

If you build your website with plain HTML, you have to create one new HTML file for each page you create. This means you need 2 HTML files for 2 pages, 3 HTML files for 3 pages, and so on.

There are going to be pieces of content you reuse across different pages. Examples of these pieces of content are the navigation and footer.

You copy and paste these pieces of content, but it’s a pain to change them. If you want to change something, you have to go through all the pages and change the same thing.

It’s painful and frustrating, so most people stop at 3-4 pages max and try to find better ways to build websites without copy-pasting.

There are many ways.

## Building a _real_ website can also be easier than you imagined it to be

Most people turn to Wordpress to build a real website because Wordpress is a trusted model. You can’t really go wrong. There are many features:

- You can break HTML into chunks and include them in different places
- You can have plugins to handle SEO if you don’t know how to deal with it.

But Wordpress is not the best stack you can use as a developer. There are many reasons why Wordpress is not a good fit:

- Wordpress is cumbersome — you can’t just edit the content on your text editor. You have to use the CMS.
- Wordpress is slow — it uses a database (which is an extra connection compared to a plain HTML file) and this increases the amount of time it takes to load a website.
- Wordpress uses PHP — you might not want to learn it because that’s an extra language to work with.

Some people tried to emulate Wordpress with Node by creating a blog Express, and MongoDB. This removes the need to use PHP but it doesn’t reduce the drawbacks of the other points I wrote above.

The easiest way to create a real website is to use a Static Site Generator.

## The easiest way is to use a Static Site Generator

Static Site Generators let you break HTML into smaller chunks. They also let you include these smaller chunks anywhere you want to. They work with a HTML Template Engine — like Nunjucks and Pug.

There are many Static Site Generators.

When I first began to code, the most popular Static Site Generators out there don’t use JavaScript. They used Ruby, Go, and other backend languages (which I’m unwilling to learn). So I hacked out my own Static Site Generator with Gulp 😂.

That took a lot of work!

I don’t use the Static Site Generator I hacked out anymore because there are many great Static Site Generators (that use JavaScript) out there today.

The best one is [Astro](https://astro.build/). The second best one is [Eleventy](https://www.11ty.dev/).

I’m excited to show you how to use Astro to build your website. **I want to show you the system I use — which is so good that a client paid me $2000 to to port over her website from Wordpress to my system.**

The best part is this client is not a developer. She doesn’t know how to code. So the system I’m going to show you is so easy that a non-coder can use it too. Imagine what you can do with it.

I’ll tell you more about the system tomorrow.

For today, go explore [Astro](https://astro.build/). Tell me what you feel about it. Does it sound confusing, or exciting for you? What emotions does it generate?

My eyes and ears are open. I can’t wait to hear back from you.
