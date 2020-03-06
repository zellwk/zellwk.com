---
title: Setting up Visual Studio Code (Part 1)—appearances
layout: post
slug: vscode-1
newsletter: better-fed
shareText: "Setting up Visual Studio Code (Part 1)—appearances"
youtubeHash: xzAOWzG7A7c
tags:
 - post
 - video
 - vscode
---

Hey, It's Zell.

I switched from Sublime Text to Visual Studio Code recently, and I'd like to show you how I set it up.

<!--more-->

For this video, I'm going to use Visual Studio Code—Insiders, which is the development version of Visual Studio Code. The icons look slightly different. Insiders is green in color, while the standard version is blue. You can choose the normal version or insiders version. Both are good. There's no right or wrong choice.

Once you open up Visual Studio Code (I'm going to call it vscode for short), you'll come to the welcome page. The first thing I'll do is to set up Sublime shortcuts since I switched from Sublime Text to Visual Studio Code. I don't want to relearn VSCode shortcuts because it's going to be a big dip in my productivity. So, the first I do is add Sublime Text keyboard shortcuts. You can do that by clicking on Sublime Text here.

## Color Themes

Next you'll want to use a color theme that you're comfortable with. To choose a color theme, you open up the extensions tab by clicking on it, or by hitting command shift x. Once the extension tab is open, you can type the theme you're looking for.

When I used Sublime Text, the theme I used is called Tomorrow Night Eighties; I still recommend it. But somehow, in VSCode, I feel that Atom One Dark is nicer, so we're going to install Atom One Dark instead.

## Editor Settings

Next, let's open up the editor settings. There are more things to customize. For mac users, you can hit `command` `comma`. For Windows users, I believe it's `ctrl` `comma`.

You'll open a page where the screen splits into two. On the left side, you'll see a list of all possible configurations. On the right, you'll be able to create your custom settings to overwrite whatever is on the left.

The first thing I'll do here is change the typeface and fontSize to something I like. For typeface, I choose Fira Mono. You can download Fira Mono from Google fonts if you want to use it without the Internet.

For font size, I use 16.

```
"editor.fontFamily": "Fira Mono",
"editor.fontSize": 16,
```

16 is a too big for me normally when I'm on my laptop. What I usually do is I'll hit `command` `-` to reduce the size of the editor. The good thing is `command` `-` also reduces the size of the extra stuff around, which gives me more room to code.

But for now, let me put back to zoom level 0, so it's easier for you to see and follow along.

## The indent guides

You may have noticed the white color guidelines on the left of each setting. These are indent guidelines. They're good, but they're too distracting for me.

If you don't want indent guidelines at all, you can remove them by setting `editor.renderIndentGuides` to `false`.

```
"editor.renderIndentGuides": false,
```

Instead of removing the guides entirely, I recommend you install an extension called Guides, since indent guidelines can help you when you're working with large codebases.

Once you install Guides, you'll notice the thick white line becomes a red line instead. It's more subtle and doesn't distract as much. If you have a second layer of indent, you can see that the current indent lines will be red, while everything else is offwhite. This helps a tiny bit with focus.

## Wrapping up

This is the setup I use for the appearance of my VS Code. I hope you learned something useful from this video. Next week, I'll show you the extensions and settings I use for HTML, CSS and JavaScript.

I hope this video has been helpful for you. If you like this video, hit the subscribe button below and I'll send you one video every week.

Or better yet, if you subscribe over at my blog at zellwk.com, I'll send you one video and one article every week to help you become a better frontend developer.

Happy Friday. Have a good weekend
