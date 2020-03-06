---
title: Setting up Visual Studio Code (Part 2)—HTML, CSS and JavaScript settings
layout: post
slug: vscode-2
newsletter: better-fed
youtubeHash: Hv8FgxJyI9Y
tags:
 - video
 - vscode
shareText: "Setting up Visual Studio Code (Part 2)—HTML, CSS and JavaScript settings"
---

Hey, it's Zell. Welcome back to Part 2 of the VS code setup series.

If you haven't watched the 1st part yet, I suggest you go [watch it first](/blog/vscode-1), because everything we're going to do today follows from there.  Everything follows from there.

What we're going to do in this video is to setup VS code to write HTML, CSS and JavaScript properly. Let's work on HTML first.

<!--more-->

## Format On Save

The first I like to do is add `editor.formatOnSave` to your settings file. With this option turned on, VS Code will format or (beautify) your code when you save the file. It's very very useful for maintaining good quality code.

```json
{
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
}
```

## HTML Settings

VS Code has a weird way of splitting lines by the number of characters. If you have a long paragraph of text in your HTML and if you hit save, you may notice that long paragraph gets split into two lines of code. It's pretty weird because you want to use HTML tags to split them properly.

What I'll do is set the `wrapLineLength` property to 0. This prevents VS Code from acting in the weird manner. While I'm at the HTTML part, I also set suggestions for `angular1` and `ionic` to false since I don't use them.

```json
{
  "html.format.wrapLineLength": 0,
  "html.suggest.angular1": false,
  "html.suggest.ionic": false,
}
```

That's it for the settings file.

### HTML Extensions

VS Code has pretty code HTML Extensions. I use the following extensions:

1. Auto close tag
2. Auto rename tag
3. intellisense for CSS Names

**Auto close tag** helps you close HTML tags automatically. You can write lesser keystrokes, which is always a win.

**Auto rename tag** helps you rename the closing tag when you change the opening tag. This is a lifesaver because I always forget to rename the closing tag whenever I change an opening tag.

**Intellisense for classnames** gives you auto class completions, which when you're writing classes. It doesn't always work, but when it works, it's useful. I have no idea why it works or why it doesn't sometime. This is a bonus for me.

That's it for HTML. Let's move on to CSS.

## CSS

For CSS, I install the following extensions.

1. Sass
2. Prettier
3. Stylelint
4. CSS Peek

**Sass** gives you syntax highlighting for Sass files (both `.sass` and `.scss`). I use Sass whenever I write CSS, so this is a no-brainer.

**Prettier** is the best CSS formatter I've seen to date. When you install prettier, you can hit save and your CSS or Sass files will be formatted properly. You can even add stylelint integrations which is useful if you're more advanced on the config part of things.

**Stylelint** is a CSS Linter. A Linter is a tool that checks your file for consistent formatting. It also tells you when there is an error, so you don't make silly typo mistakes.

**CSS Peek** gives you the ability to search for CSS Selectors in a file. It helps when you have a long CSS file.

Settings-wise, I set `prettier.stylelintIntegration` and and `stylelint.enable` to `true`. That's all. If you don't use stylelint, there's nothing for you to configure.

```js
{
  "prettier.stylelintIntegration": true,
  "stylelint.enable": true,
}
```

## JavaScript

For JavaScript, I install the following extensions.

1. JavaScript standard style
2. JavaScript standardjs styled snippets
3. Sublime Babel
4. npm intellisense

### JavaScript standard style

**JavaScript Standard Style** is a linter that follows the JavaScript standard format. It's a popular format made by a guy called @feross. It contains a linter plus a formatter. But making the formatter work is kinda tricky.

To make the formatter work with VSCode, you need disable the default formatter built into VS Code. To do so, you set `javascript.validate.enable` to `false`.

```js
{
  "javascript.validate.enable": false,
}
```

To make JavaScript Standard Style work with Prettier, you also need to disable the default formatter built into VSCode. You can do by adding "javascript" to `prettier.disableLanguages`. I also add `javascriptreact` and `json` to the array of disabled languages.

```js
{
  "prettier.disableLanguages": [
    "javascript",
    "javascriptreact",
    "json"
  ]
}
```

Then, you'll need to turn on JavaScript Standard Style's formatter with `standard.autoFixOnSave` and `standard.validate`.

```json
{
  "standard.autoFixOnSave": true,
  "standard.validate": [
    "javascript",
    "javascriptreact"
  ],
}
```

**JavaScript standardjs styled snippets** gives you some snippets that can help you increase your coding speed. For example, you if type cl followed by tab, you'll get `console.log`. You can find a list of snippet extension keywords in the snippet itself.

**Sublime Babel** gives you better syntax highlighting for JavaScript files when you use newer JavaScript syntax through Babel. That is pretty self explanatory so I'm not going to say anymore.

**npm intellisense** is good when you use npm modules in your code. It helps you autocomplete node modules, which is awesome.

## Wrapping up

This is how I configure VS Code for HTML, CSS and JavaScript.

I hope this video has been helpful for you. In the next video, I show you some useful extensions I use to improve the overall VS Code experience.

