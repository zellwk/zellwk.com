---
layout: post
title: Disabling languages for Prettier (in VScode)
description: How to disable Prettier for specific languages.
slug: prettier-disable-languages
tags: ['writing', 'vscode', 'tools', javascript]
---
It used to be straightforward to disable languages for Prettier in VSCode. You just added a `prettier.disableLanguages` setting and you were done. 

(Please set to JSON syntax)

```javascript
// In settings.json
[
  "prettier.disableLanguages": [
    "javascript",
    "javascriptreact",
    "json",
    "markdown"
  ],
]
```

Unfortunately, `prettier.disableLanguages` is deprecated so we can’t do this anymore. Here’s what we can do instead. 

<!-- more -->

There are two methods. 

  1. Enable Prettier in specific languages. 
  2. Enable Prettier globally but disable it in specific languages. 

## Enabling Prettier in specific languages 

The first option is to enable Prettier for specific languages you use. You can do this with the `editor.defaultFormatter` property. Here's an example where you enable it for CSS. 

(JSON Syntax)

```javascript
[
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
]
```

If you use this method, you need to enable Prettier for every language, which can be tedious. 

```javascript
[
  "[html]": {
  	"editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
]
```

So I prefer to enable Prettier globally, but overwrite Prettier in specific languages. 

## Enabling Prettier Globally but disabling it in specific languages

We can enable Prettier globally with the `editor.defaultFormatter` property. 

```javascript
"editor.defaultFormatter": "esbenp.prettier-vscode",
```

If you want to disable Prettier for a specific language, you can set the `editor.defaultFormatter` to `null`. 

```javascript
"editor.defaultFormatter": null;
```

You can also choose to overwrite a specific formatter for a specific language. In the following example, I use Standard JS instead of Prettier for formatting JavaScript. 

Note:
If you're using Standard for JavaScript, it's much easier to use the [prettier-vscode-standard](https://marketplace.visualstudio.com/items?itemName=numso.prettier-standard-vscode) extension instead. I wrote about this in [another article](/blog/prettier-standard).

```javascript
"[javascript]": {
    "editor.defaultFormatter": "chenxsan.vscode-standardjs"
},
```
