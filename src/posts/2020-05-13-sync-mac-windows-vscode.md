---
layout: post
title: Syncing Visual Studio Code settings between Mac and Windows
description: "Digs into the nuances when syncing settings between Mac and Windows with Settings Sync."
slug: sync-mac-windows-vscode
series: windows-web-dev
tags:
  - vscode
  - mac
  - windows
---

When I got my Windows computer, the first thing I did was to set up Windows so it [mirrors the writing system I had on Mac][1]. I also [mirrored Mac's modifiers as much as possible][2]. 

Then, I set up my [Windows development environment][3] (with Windows Subsystem for Linux) on my new Windows computer. 

Next, I had to do was to make Visual Studio Code on both Mac and Windows play nice. 

By "play nice", I meant: 

1. Syncing preferences across Mac and Windows 
2. Syncing extensions across Mac and Windows
3. Syncing key bindings across Mac and Windows

<!-- more -->

Enter Settings Sync. 

## Settings Sync

[Settings Sync][4] is an extension for Visual Studio Code. It lets you sync preferences and extensions. I also found out it synced key bindings later! (More on key bindings later because it's more nuanced). 

It's easy to sync preferences and extensions. Settings Sync does this automatically. To sync extensions and preferences across my Mac and Windows computer, all I had to do is install the settings sync extension, log in with Github, and, select a Gist to sync to. 

<figure role="figure">
  <img src="/images/2020/vscode-sync/settings-sync.png" alt="Settings Sync in Visual Studio Code extension panel">
</figure>

<figure role="figure">
  <img src="/images/2020/vscode-sync/login.png" alt="Points to a login with Github button.">
</figure>

<figure role="figure">
  <img src="/images/2020/vscode-sync/select-gist.png" alt="Selects a gist from a list of gists.">
</figure>

### Separating preferences for Windows and Mac

Thankfully, most of my preferences can be shared between Windows and Mac. I don't have to change many things. I only changed the `fontSize` of the code editor and the integrated terminal between my Windows and Mac. 

I changed `fontSize` because I have a 15' Mac and a 13' Windows. Their screen resolutions were different too. After some testing, I figured I needed the following sizes: 

- Mac: `18px`
- Mac (Integrated Terminal): `16px`
- Windows: `16px`
- Windows (Integrated Terminal): `14px`

Settings Sync lets you preserve specific settings with a thing they call [sync pragmas][5]. A pragma is a piece of code that tells a compiler about something. In this case, the sync pragmas tell Settings Sync whether to keep a specific setting. 

Sync pragma looks like this: 

```js
{
  // @sync [information about to tell Settings Sync]
  "property": "value"
}
```

A sync pragma can only be applied to one property (as far as I can tell). 

I used the Operating System pragma (`os`) to preserve preferences between Mac and Windows. Here's what I wrote for Mac: 

```js
// Mac
{
  // @sync os=mac
  "editor.fontSize": 18,
  // @sync os=mac
  "terminal.integrated.fontSize": 16,  
}
```

And here's what I wrote for Windows: 

```js
// Windows 
{
  // @sync os=windows
  "editor.fontSize": 16,
  // @sync os=windows
  "terminal.integrated.fontSize": 14,  
}
```

Settings decides whether to apply a property with sync pragmas. If Settings Sync thinks the property should be disabled, it'll comment it out. 

For example, anything labelled with `os=windows` got commented out on my Mac's preferences (the `settings.json` file). 

```js
// Mac preferences
{
  // @sync os=mac
  "editor.fontSize": 18,
  // @sync os=windows
  // "editor.fontSize": 16,

  // @sync os=mac
  "terminal.integrated.fontSize": 16,  
  // @sync os=windows
  // "terminal.integrated.fontSize": 14,  
}
```

Likewise anything labelled with `os=mac` got commented out on my Windows' `settings.json` file.  

```js
// Windows preferences
{
  // @sync os=mac
  // "editor.fontSize": 18,
  // @sync os=windows
  "editor.fontSize": 16,

  // @sync os=mac
  // "terminal.integrated.fontSize": 16,  
  // @sync os=windows
  "terminal.integrated.fontSize": 14,  
}
```

So I get to keep the settings I like for both computers. Pretty cool! 

Settings Sync is a real lifesaver here :) 

## Syncing keyboard shortcuts

If you can keep preferences with sync settings, how do you keep preferences for keyboard shortcuts? 

I put a ton of effort into customising my keyboard shortcuts. (I'll share them in the next article). And I'm worried my shortcuts will overwrite each other. 

Turns out, there's nothing to worry! 

Settings Sync is smart. It uses a file called `keyBindings.json` to store Windows shortcuts. For Mac, it uses a file called `keybindingsMac.json`. 

<figure role="figure">
  <img src="/images/2020/vscode-sync/keybindings-mac.png" alt="Mac key bindings uses a file called keyBindingsMac.json">
</figure>

<figure role="figure">
  <img src="/images/2020/vscode-sync/keybindings-windows.png" alt="Windows key bindings uses a file called keyBindings.json">
</figure>

So feel free to upload your key bindings without adding any comments. They would NOT overwrite each other. 

This, however, means you need to configure key bindings for Mac and Windows separately. 

I'll share my configurations in the next article. 

[1]:	/blog/dvorak-qwerty
[2]:	/blog/dvorak-qwerty#changing-the-locations-of-ctrl-and-alt
[3]:	/blog/windows-wsl
[4]:	https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync
[5]:	https://github.com/shanalikhan/code-settings-sync/wiki/Sync-Pragmas