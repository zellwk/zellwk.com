---
layout: post
title: Your first Git commit
description: We're going to talk about how to make your first Git commit.
slug: your-first-git-commit
newsletter: better-fed
youtubeHash: nsORVjJTkeI
tags:
  - video
  - git
---

Note: This the second video in the Git for beginners series. [Watch the first video here][1].

Today we're going to talk about how to make your first Git commit.

<!-- more -->

If you open up Fork from where we left off previously, you'll see the project screen. If you click on changes, the screen will split into two parts.

On the left of the screen, you'll see a section that says unstaged files. Below this section, you'll see another another section that says staged files.

To the right, you'll see a placeholder that shows Fork's icon. At the bottom, you'll see a few fields:

1. A commit message field
2. A description field
3. An ammend checkbox
4. A commit button

This place is called the **staging area**. This is where you decide what files you want to save into Git.

<figure><img src="/images/2018/your-first-commit/staging-area.png" alt="The staging area">
  <figcaption aria-hidden>The staging area</figcaption>
</figure>

## Staging a file

Before you save anything, you need to make a change in the Git repository.

Open up your Git project in a text editor like VS Code. Create a file called `index.html` and give it some HTML to start with.

Once you save this file, you'll see this file in the staging area. It should appear in the unstaged files section of the staging area.

<figure><img src="/images/2018/your-first-commit/unstaged-file.png" alt="Files that have been changed will appear in the unstaged area">
  <figcaption aria-hidden>Files that have been changed will appear in the unstaged area</figcaption>
</figure>

**An unstaged file is a file that has been changed since you last committed into the Git repository.**

If you want to commit a file (in this case, the `index.html` file), you can click on the file and click on stage. This file will be moved from the unstaged files section into the staged files section.

<figure><img src="/images/2018/your-first-commit/staged-file.png" alt="Files that have been staged will appear in the staged area">
  <figcaption aria-hidden>Files that have been staged will appear in the staged area</figcaption>
</figure>

**When you have a file in the staged file section**, what you're saying is **you want to save that file when you make a commit**.

If you click on the file, you'll see the lines of code (in green) that will be saved into the repository.

## Creating a commit

To create a commit, you write your commit message at the bottom right corner, then click the "create commit" button.

<figure><img src="/images/2018/your-first-commit/creating-a-commit.png" alt="Creating a commit">
  <figcaption aria-hidden>Creating a commit</figcaption>
</figure>

Once you click on the commit button, the staged files will disappear from the staging area. This is because the files are saved; there are no more new changes for the file in the repository.

## Committing more than one file

You can commit many files at the same time. To do so, you need to change many files.

In this example, I added a CSS file and a JavaScript file to the repository. I also added code to the `index.html` file to point to the CSS and JavaScript files.

If you go back into Fork now, you should see the folders and files that are changed.

<figure><img src="/images/2018/your-first-commit/staging-area-multiple.png" alt="Files and folders that are changed in the staging area. This shows a CSS folder, a styles.css file, a JS folder, a main.js file and an index.html file. ">
  <figcaption>You can see all files and folders that are changed in the staging area</figcaption>
</figure>

To commit all three files at once, you select the files and click the stage button. Then, you write your commit message and commit the files.

<figure><img src="/images/2018/your-first-commit/commit-multi.png" alt="Committing multiple files at once">
  <figcaption aria-hidden>Committing multiple files at once</figcaption>
</figure>

## Checking the Git History

If you click on All Commits in the sidebar, you'll see the commits you have made so far. In some Git clients, this is called Git History.

## Exercise

Try to make a few commits into your Git repository with Fork. In the next video, I'll show you how to push to a git remote and how to pull from a git remote.

[1]:	/blog/setting-up-git
