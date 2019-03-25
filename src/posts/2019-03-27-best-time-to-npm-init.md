---
layout: post
title: The best time to npm init 
description: "If you're building an open source project, the best time to npm init is after you've added a Git remote to the project"
slug: best-time-to-npm-init
tags:
  - npm
---

When should you `npm init`? 

Most developers run `npm init` right after creating and navigating into a new project. 

It makes sense to `npm init` at the start of the project because we use npm to download dependencies. Once we `npm init`, we can begin downloading (and saving) our dependencies. 

For most projects, this workflow works.

But if you're creating an open source project, the best time to `npm init` is slightly later. If you `npm init` right after creating and navigating into the project, you'll miss out a few things. 

<!-- more -->

## The best time to npm init

The best time to `npm init` (for an open source project) is after you added a Git remote to your project. In other words, you should only `npm init` after you have completed the following commands: 

1. `git init`
2. `git remote add origin`

If you `npm init` after you have added a Git remote, npm will generate three extra things in your `package.json` files. They are: 

1. A `repository` property with a link to your remote repo
2. A `bugs` property with a link to the issues page. 
3. A `homepage` property that links to the `readme.md` file. 

<figure><img src="/images/2019/npm-init/extras.png" alt="package.json that shows a 'repository' property, a 'bugs' property and a 'homepage' property"></figure>

These three properties will be displayed as metadata on the right side of the project's npm page. 

<figure><img src="/images/2019/npm-init/npm-page.png" alt="Metadata showing up on npm page. "></figure>

These metadata are links. They let people move to your project's Github page easily from the npm page. You'll want these links for better discoverability. 

## The second best time to npm init

The second best time to npm init is now. If you run `npm init` now, it will generate the three properties I mentioned above. 

Before you run `npm init`, make sure you rename your original `package.json` file to something else. This way, you can copy-paste dependencies and other changes you've made from the  original `package.json` file to the newly generated one. 

## Wrapping up

The best time to `npm init` is after you've added a Git remote to your project. The second best time? Anytime! 