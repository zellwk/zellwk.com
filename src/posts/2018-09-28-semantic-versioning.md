---
title: Semantic Versioning
layout: post
slug: semantic-versioning
newsletter: better-fed
youtubeHash: rTZ35Subk9U
tags:
 - video
 - git
description: When we use Semantic versioning, we let developers know whether a change will break their code. This video explains what Semantic Versioning is and how to use it.
---

We created numbers like `1.0.0` and `1.0.1` for releases and hotfixes when we worked on Git Flow. What do these numbers represent, and why do we use them?

These numbers represent the version number of the product we put out in the world. We use them because we're following a best practice called Semantic Versioning.

**When we use Semantic Versioning, developers will know whether a change will break their code.** The numbers give a clue to the kind of changes that have occurred.

Many popular projects use Semantic Versioning. Examples are React and Vue.

<!-- more -->

<div class="jsCkClone" data-should-not-clone></div>

## Understanding Semantic Versioning

**A semantic version has three numbers.** The rightmost number is a patch version.

### Patch Versions

**Patch versions are used for bugfixes.** There are no functionality changes. (That's why we use a patch version when we released a hotfix in the [previous lesson][1]).

When you increase a new patch, **you increase the rightmost number by 1.** From 1, you increase it to 2, then to 3, and so on.

**If your patch number is 9,** when you increase the patch version again, **you increase it to 10,** then 11, then 12, and so on. (There are no limits to the numbers)

<figure><img src="/images/2018/semantic-versioning/patch.png" alt="A patch version is the rightmost number">
</figure>

### Minor versions

The second number is called the minor version number. It is **used when you release new functionality** in your project.

When you increase the minor version, you also increase it by one. But **when you increase the minor version, you must reset the patch version to zero.**

<figure><img src="/images/2018/semantic-versioning/minor.png" alt="A minor version is the second number">
</figure>

### Major versions

The leftmost number is a major version. When you increase the major version, you tell people that there are **backward-incompatible changes**. People may experience breakage if they use the next version.

**When you increase the major version number, you reset both patch version and minor versions.**

<figure><img src="/images/2018/semantic-versioning/major.png" alt="A major version is the leftmost number">
</figure>

## Pre-releases

If you want to create a pre-release (like an alpha or beta version), you can add a `-`, followed by the words `alpha` or `beta`.

There are **no hard and fast rules for pre-releases**, so you can name them anything you want. Usually, we use alpha or beta, followed by a number, like `alpha1`.

## Starting a project

Most people start projects with `0.1.0`. When you're ready to release the project to the public, you increase the version to `1.0.0`.


[1]:	/blog/git-flow "Git Flow"
