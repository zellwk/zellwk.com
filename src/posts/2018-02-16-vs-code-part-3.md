---
title: Setting up Visual Studio Code (Part 3)—Extensions
layout: post
slug: vscode-3
newsletter: better-fed
youtubeHash: o6HiFpxL1-0
tags:
 - video
 - vscode
shareText: "Setting up Visual Studio Code (Part 3)—Extensions"
---

Welcome Part 3 of the VS Code setup series.

If you haven't watched the [first](/blog/vscode-1) or [second](/blog/vscode-2) parts yet, I suggest you go watch them first. Everything I'm sharing today builds on what I showed you before. For today, I want to share the extensions I use on a daily basis.

<!--more-->

Here's a complete list of the extensions I use. We'll go through them one by one.

- Advanced new file
- Bracket pair colorizer
- Code spell checker
- Editor config
- Path intellisense
- Settings Sync
- Sort JSON Objects
- Sort lines
- SVG Viewer
- TODO Highlight

## Advanced new file

Advanced New file helps me create new files and folders with keyboard shortcuts.

To use Advanced New File, you hit the `command + opt + n`. When you do so, you'll see a tiny window at the top of VS Code. In this window, you enter the folder where you wish to create the new file. Then, once you hit enter, you'll get another prompt to enter your file name.

## Bracket pair colorizer

Bracket pair colorizer adds color to your brackets. It helps you see which is the closing bracket for every bracket you open. It works for parenthesis (`()`), square brackets (`[]`), and curly brackets (`{}`).

## Code Spell checker

Code spell checker checks if your code exist in an English dictionary. It underlines your code with a squiggly green underline if a word doesn't exist in the dictionary. This helps to reduce errors that are caused through typos.

It works even when you write camelCase variables, which is super helpful for people who write a lot of JavaScript.

You can add on other dictionaries if you prefer coding in another language.

## Editor Config

Editor config essential if you work with colleagues who prefers other text editor settings. It overrides your default project settings to a team based if it finds an `.editorconfig` file.

It only has six options, so you'll still need things like linters to help you check code style.

## Path intellisense

Path intellisense gives you helps you find the right files by giving you suggestions for file paths. You can link styles, images and other files easily. For example, in your HTML, you can type the directory you want, and Path intellisense will start looking for options for you.

## Settings Sync

Settings sync saves the settings file in a Github Gist. You can use this extension to transfer your VS code settings file across computers. It's a pity it doesn't save the extensions you use though, because that would be awesome.

## Sort JSON Objects

By this time, your settings file would be a little messy. Sort JSON Objects lets you list JSON items in alphabetical order.

## Sort Lines

Like Sort JSON Object, Sort lines let you sort lines in alphabetical order.

## Todo highlight

Todo highlight let you leave `TODO` and `FIXME` notes in your code so you can find them easily. `TODO` notes have a bright yellow background while `FIXME` notes have a bright red background.

You can find all `TODO` and `FIXME` notes through the "List highlight annotations command".
