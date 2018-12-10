---
title: I'm Going To Make The Learning Susy Book Better, And What That Means For You
layout: post
slug: updating-learning-susy
tags:
 - updates
newsletter: susy
---

It's been 3 months since Learning Susy has been released and the support from the community has been wonderful. It's heartening to see so many people start to learn about Susy, and how they have benefited as a result.

I have learned a lot more about what people are looking for since releasing the book through observations, questions and surveys, and I feel that I am now able to make Learning Susy 10x better.

In this post, I'd like to share with you my observations of issues that people often encounter, how I intend to help solve these issues in the next version of Learning Susy, and what all this means to you.

<!--more-->

**UPDATE**: The new Learning Susy Book is now live at [http://learnsusy.zellwk.com](http://learnsusy.zellwk.com).

## The Bucket List of Issues

I discovered that there are 5 main areas where people have problems with Susy. A quick overview of these 5 areas are:

1. Installing and running Susy
2. Structuring your project with Susy
3. Using Susy correctly
4. Using Susy to make more complicated layouts
5. Using Susy to quickly prototype and build websites

### 1. Installing Susy

Installation is often the biggest headache for beginners. It is especially challenging and scary if you are still very new to Sass. It can also be incredibly frustrating to spend hours and hours trying to figure out how Sass and Susy work, and not find the answer, or discover that it was just a tiny typo you made earlier.

The issue is usually not with the installation process, but rather, making sure you are able to compile Sass to CSS with Susy. This is the step in the process where you can choose to use different tools to help you out. Some of these tools are:

- The terminal (with Sass or Compass)
- Applications like Codekit or Prepros
- Task builders like Grunt or Gulp
- Special cases like with Rails or Bundler

Just in case you didn't know, there are three ways you can install Susy into your project. You can install the Susy gem via the terminal, or opt to use only the Sass files by installing them via Bower or downloading them manually.

The configuration required for each of these tools differ slightly depending on how you have chosen to install Susy.

If you are just starting out with Sass, you may feel overwhelmed by all this.

Unfortunately, the installation process specific to most of these tools isn't covered very well in the current version of Learning Susy. I could have helped more by explaining how to install Susy in conjunction with some of these tools.

If you are slightly more seasoned, you might have heard of LibSass and how it's lightning fast. Susy is almost ready to support LibSass right now, and instructions on how to use LibSass with Susy will be useful for you if you are looking to speed up your development time.

That's what I'm doing for the next version. It will include instructions on installing Susy using a variety of methods, and these instructions will go onto Susy's documentation when I'm done.

### 2. Structuring Projects with Susy

Right after installation and compilation comes the topic of structuring project files within Susy.

This question was asked because there have been many instances where frameworks require you to structure your project in a specific way. Most people wondered if Susy required this as well.

Thankfully, you don't have to do anything special with Susy. You can just structure your project as if you are running a standard Sass project.

Such questions and frustrations are inevitable if you are new to Sass. I could have improved the earlier parts of the book by slowly doing more, and explaining how to create a recommended starting point for all your projects.

I ran into the same problems when I started out learning. I got so familiar with them over time that I missed this point entirely. The new version of Learning Susy will also teach you how to structure your first project so you can start out smoothly.

### 3. Understanding how to use Susy correctly

Most people have no problems with the first two areas, but trip up in this section. Although Susy is built to simple and flexible, the flexibility comes with a price of complexity. It's somewhat of an oxymoron and can be mind-boggling when you are just getting started.

In a nutshell, you need to know certain core concepts in order to understand how Susy works. One of the most important is to [understand what context is](blog/context-with-susy/).

There are a few other concepts that get people confused. They are:

- [The steps to debug Susy with the Susy background grid](/blog/susy-grid-background-image/)
- [The difference between each gutter position, and how to use them](/blog/susy-gutter-positions/)
- What the `container()` mixin does, and when to use it

There are more concepts that you will need to fully understand in order to use Susy for every situation possible. Most of these are already covered in the book. Right now, it's not written in a way that highlights that these are key things you will need to know.

I'm rewriting most of the book to change that. I would be dedicating chapters to these core concepts so you know where to look for them, and know what all of them are.

In addition to rewriting the book, I'm going to include a cheatsheet on the different Susy settings that you can quickly refer to, so you can set up your Susy grid immediately. You no longer have to flip through the book to find this information.

### 4. Understanding how to make complex layouts with Susy

I assumed people would start with learning how to work with basic layouts in Susy, then progress onto the more advanced layouts.

What I realised was that most people don't follow that path. People start trying to make more complex layouts without first understanding how Susy works, and they run into problems. In retrospect, I too was like that when I started as well.

Some of the questions I got were:

- How to centre the Susy container
- How to centre every item in a Susy layout
- [How to make off-canvas layouts with Susy](/blog/off-canvas-layouts-susy/)
- How to use more than one Susy layout on the same page
- How to change gutter settings on different layouts on the same page
- ... among many others

These are all great questions that would challenge your understanding of Susy, and you might have to spend hours figuring them out.

Instead of letting you figure it out on your own, I will show you how to make these layouts, step by step, through different tutorials, then provide you with the code templates so you can run with them. This would mean remaking the 20 templates I currently have within the Full Package so the instructions are baked into them. The actual number of templates is still unconfirmed yet, but there will be a minimum of 10 templates.

In addition to these 10 solid templates, there will also be more chapters on best practices, organising code, handling context and other good-to-know information to help you out with learning Susy.

Also, to take it to the next level, I'm intending to interview experts on how they use Susy and why they prefer to use it in certain ways. That should help you gain deep insights into when and why some Susy methods are used, and how to use them.

To beef it up even more, I'm including video tutorials on how to code 5 different websites from scratch with Susy (even if those websites are not using Susy right now). This should give you a complete understanding on how to start from scratch when building Susy sites. It will also be beneficial for those of you who are more video-oriented :)

### 5. How to use Susy to quickly prototype or build websites

Finally, it matters how fast you are able to prototype or build your website.

Although Susy makes it quick to get the layout right, there's a huge gap when it comes to prototyping or building websites because it doesn't provide any UI kits to go along with it.

It's also hard to justify to your company if you switched to Susy, and built sites slower than you previously could, because you are missing these UI elements.

The good news is, Susy can integrate with ANY framework you want to use. It can play nicely with major frameworks like Bootstrap and Foundation, or even your home-grown UI kit as long as you know how to integrate it.

And I'll help you out with this integration process by dedicating a bonus chapter to it.

To help you build websites quicker, I'll also create starter templates that integrate Susy tightly with existing frameworks like Bootstrap, Foundation (and even the awesome looking Startup Design Framework if I manage to get permission for it)

All of these starter templates will also come with a build process that automatically helps you streamline concatenation, minification and all other optimisation processes that you'll need to run.

## What This Means For You

There's going to be a tonne of additions to the book, and prices are definitely going to increase. Let me first tell you about the revised packages before telling you the good news :)

### The full package

The full package will contain everything you will ever need to get started with Susy, and understand it so well you can do anything you want with it.

TL; DR: It will contain everything mentioned in this article :)

It will contain the following:

- The book (in ePub, Mobi, PDF and HTML versions)
- Source code for all examples mentioned in the book
- A step-by-step checklist on how to use Susy for all grid combinations
- 4 bonus chapters on best practices, code organisation, handling complex context and integration with frameworks
- 10 code templates with detailed explanations to help you understand how to use Susy to the extremes, like the [off canvas layout](/blog/off-canvas-layouts-susy/)
- Sass starter template
- Sass starter template with Bootstrap
- Sass starter template with Foundation
- Sass starter template with Startup Design Framework (Possibly)
- 5 videos on rebuilding popular sites with Susy
- 5 video interviews on how experts use Susy

Price for the package: $199.

### The premium package

The premium package will contain everything you will need to understand Susy and use it at a expert level. It will teach you everything you need to know about Susy to the extremes.

You'll be missing out on the speedy prototyping templates and detailed videos from the full package though :(

However, this is good if you are comfortable with figuring out how you want to use Susy by yourself and cobble together your own framework.

It will contain the following:

- The book (in ePub, Mobi, PDF and HTML versions)
- Source code for all examples mentioned in the book
- A step-by-step checklist on how to use Susy for all grid combinations
- 4 bonus chapters on best practices, code organisation, handling complex context and integration with frameworks
- 10 code templates with detailed explanations to help you understand how to use Susy to the extremes, like the [off canvas layout](/blog/off-canvas-layouts-susy/)

Price for the package: $99.

### The book

If you are on a tight budget and still want to learn to use Susy to build your websites, the book is a good choice for you.

I want to make sure the book doesn't get undervalued. It really is where I spent the most time and effort. The content in the book will help build up your foundation with Susy, and once you have that, figuring out the rest of it by yourself becomes much simpler.

Note that you'll now get the source code for all examples mentioned in the book to help you learn quicker!

It will contain the following:

- HTML, EPUB, MOBI and HTML versions
- Source code for all examples mentioned in the book

Price: $49.

## Release Date

This new version will contain lots of new material that will take some time to produce. I'd like to get it to your hands as soon as I can. The tentative release date will be 31st Jan, 2015.

## The Good News

And here's what you have been waiting for :)

If you have already bought any of the current packages (book, premium or full), you will be given a free update to the next version of the book with the same package.

This means that if you already bought the full package at $79, you'll get the new full package worth $199 without spending an extra cent.

This extends to anyone who has bought the book recently, or way long ago, up till the day where the new version is released.

Sounds good? :)

## What's Going To Happen Next

I'm focusing on these areas for the next release of the book. If you happen to catch an area that I have missed out, please do leave a comment and let me know what it is!

As I continue to write the book, I'm planning to share with you the writing process and show you snippets of the book from time to time. I will also be doing some polls to find out what websites to make for the video tutorial. Make sure you're on my email list if you want to follow along and be updated!

Finally, I'd love to hear what you think of these improvements and changes to the packages. Let me know in the comments!
