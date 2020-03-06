---
title: The Gitignore file
layout: post
slug: gitignore-file
newsletter: better-fed
youtubeHash: xlQIABDgTOs
tags:
 - video
 - git
description: You already know Git is like a save point system. What you've done so far is to learn to save. But how do you undo, and go back to a previous state? That's what we're going to cover
---

If you don't want to commit a file into a Git repository, it makes sense not to have the file show up in the staging area.

You can do this with a Gitignore file.

<!-- more -->

In the video, we installed a library called Typi with npm. Many files come into our staging area when we installed Typi.

<figure><img src="/images/2018/gitignore/node-modules-folder.png" alt="Node modules files in staging area"></figure>

To prevent `node_modules` and its files from appearing in the staging area, you:

1. Create a `.gitignore` file at the root of the project
2. Add `node_modules` in the Gitignore file

And the staging area becomes clean. AT this point, you want to commit your `.gitignore` file to preserve what to ignore.

<figure><img src="/images/2018/gitignore/clean-staging-area.png" alt="Node modules removed from staging area"></figure>

## How to use Gitignore

Each line in the Gitignore file can be used to match files and folders you don't want to see in the staging area.

1. To ignore a file, you write the file name.
2. To ignore a folder, you write the folder name
3. To ignore an extension, you can use a `*` wildcard, like `*.log`
