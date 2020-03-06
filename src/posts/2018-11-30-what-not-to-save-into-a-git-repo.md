---
title: What not to save into a Git repository
layout: post
slug: what-not-to-save-into-a-git-repo
newsletter: better-fed
youtubeHash: grKh2Sl35bE
tags:
 - video
 - git
description: You already know Git is like a save point system. What you've done so far is to learn to save. But how do you undo, and go back to a previous state? That's what we're going to cover
---

You should not commit these four types of files into your Git repository.

1. Files that don't belong to the project
2. Files that are automatically generated
3. Libraries (depends on the situation)
4. Credentials

<!-- more -->

## Files that don't belong to the project

Files like `.DS_Store` (for Mac OS), `Thumds.db` (for Windows), `.vscode` (for code editors) have nothing to do with your project.

They should not be checked in.

## Files that are automatically generated

This includes files from preprocessors (like Sass to CSS). You don't check in the CSS. You check in the Sass files.

If you use JavaScript compilers like Webpack or Rollup, you don't check in the generated JavaScript file. You check in the code you write.

## Libraries

If you don't use a package manager, you should check in your libraries. This is because if you want to download the library, you have to:

1. Google for the library
2. Get to the website
3. Find the link
4. Download the library
5. Put into your project

This process is tedious. If your code needs the library to work, you should check in the library.

On the other hand, if you use a package manager, you shouldn't check in a library because you can install the library with a single command like `npm install`.

## Credentials

You shouldn't store credentials like usernames, passwords, API keys and API secrets.

If someone else steals your credentials, they can do nasty things with it. I almost lost $40,00 to $60,000 because a friend accidentally exposed my amazon credentials. Luckily, the amount was waived.

If you don't want to get into sticky situations like I did, then don't store your credentials in a Git repository.
