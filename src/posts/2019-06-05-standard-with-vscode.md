---
layout: post
title: Using Standard with VSCode
description: How to use Standard JS with VSCode (and not have weird formatting problems).
slug: standard-with-vscode
tags:
  - vscode
  - javascript
---

I use [Visual Studio Code][1] as my text editor. When I write JavaScript, I follow [JavaScript Standard Style][2].

There's an easy way to integrate Standard in VS Code—with the [vscode-standardjs][3] plugin. I made a [video][4] for this some time ago if you're interested in setting it up.

But, if you follow the instructions in the video (or on vscode-standardjs's readme file), you'll come to notice there's one small detail that needs to be ironed out.

Try writing a `function` the old way, and save it repeatedly. VS code will toggle between having and not having a space before the left-parenthesis of the function.

<figure><img src="/images/2019/vscode-standard/functions.gif" alt="VS code toggles between having and not having a space before '('."></figure>

You get the same problem when you write methods with the ES6 method shorthands:

<figure><img src="/images/2019/vscode-standard/methods.gif" alt="Same problem happens when you create methods with ES6 method shorthands."></figure>

<!-- more -->

There's a quick way to fix this issue.

What you need to do is set `javascript.format.enable` to `false`. This disables VS Code's default Javascript formatter (and lets vscode-standandjs does the formatting work).

So the minimum configuration you need to get Standard and VS Code to work together is:

```js
{
  // Prevents VS Code from formatting JavaScript with the default linter
  "javascript.format.enable": false,

  // Prevents VS Code linting JavaScript with the default linter
  "javascript.validate.enable": false,

  // Lints with Standard JS
  "standard.enable": true,

  // Format files with Standard whenever you save the file
  "standard.autoFixOnSave": true,

  // Files to validate with Standard JS
  "standard.validate": [
    "javascript",
    "javascriptreact"
  ]
}
```

[1]:	https://code.visualstudio.com "Visual Studio Code"
[2]:	https://standardjs.com
[3]:	https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs "vscode-standardjs plugin"
[4]:	https://youtu.be/Hv8FgxJyI9Y