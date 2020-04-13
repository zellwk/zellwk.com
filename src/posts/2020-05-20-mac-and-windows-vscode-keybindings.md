---
layout: post
title: Customised (and effective) Visual Studio Code keyboard shortcuts for Mac and Windows
description: "I made customisations to Visual Studio Code shortcuts so I can use the same shortcuts on BOTH Windows and Mac"
slug: mac-and-windows-vscode-keybindings
series: windows-web-dev
tags:
  - vscode
  - mac
  - windows
---

Since I code on both Windows and Mac, I want my Visual Studio Code shortcuts to be interchangeable on both systems.

So I dug deep into Visual Studio Code's keyboard shortcuts for both systems and made my personal customisations.

I want to share these customisations with you so you can use them to rock at Visual Studio Code too 😃.

<!-- more -->

## Things you need to know before you continue

Four things:

1. Modifiers' locations are different on Mac and Windows.
2. This guide is Qwerty-friendly
3. Small bugs with Visual Studio Code and Dvorak-Qwerty on Windows.
4. Why I ditched the sublime text importer plugin.

### Modifiers' locations are different on Mac and Windows.

Modifiers on Mac (`Command`, `Option`, `Control`) and modifiers on Windows (`Ctrl`, `Alt`, `Win`, `Appskey`) are placed in different locations on the keyboard.

Here's where the original modifiers are located on Mac:

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/mac-keyboard.jpg" alt="Mac keyboard.">
</figure>

On my Windows PC (which is a Surface Laptop).

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/surface-keyboard.jpg" alt="Windows (Surface Laptop 3) keyboard">
</figure>

I changed modifier locations of my Windows PC with a program called [Auto Hot Key](https://www.autohotkey.com). Here's what they look like right now:

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/surface-keyboard-after.jpg" alt="Changed positions of Ctrl, Alt, and Win key on the Window's keyboard.">
</figure>

You can learn how I changed the modifiers in [this article](/blog/dvorak-qwerty).

### This guide is Qwerty-friendly

**All keyboard shortcuts in this article are friendly for Qwerty users**.

People who're familiar with me know I use [Dvorak-Qwerty](/blog/dvorak-qwerty) on both Mac and Windows.

This means:

1. I use a Dvorak keyboard layout.
2. The keyboard switches to Qwerty when I hold down `Command` on Mac.
3. The keyboard also switches to Qwerty when I hold down `Ctrl` or `Win` on Windows.

Since all shortcuts I recommend in this guide involves the `Command` or `Ctrl` key. they're useable for all Qwerty users.

### Windows Visual Studio Code and Dvorak-Qwerty

Visual Studio Code's keyboard shortcut panel gets a little cranky when I tried using used Dvorak-Qwerty on Windows.

For example.

1. I changed the *"Go To File"* keyboard shortcut to `Ctrl` + `T`
2. But the keyboard shortcuts panel shows `Ctrl` + `Y`.

This is likely because of two reasons:

1. `Y` holds the position of `T` on a Dvorak keyboard.
2. Windows doesn't have Dvorak-Qwerty built-in by default

But the keyboard shortcut still works. When I press `Ctrl` + `T`, I still fire the *"Go To File"* action.

So, if you use Dvorak-Qwerty, I recommend switching to Qwerty to examine keyboard shortcuts in Visual Studio Code. You can always switch back to Dvorak-Qwerty later.

### Ditching Sublime Settings Importer

**TL;DR**: I removed the [Sublime Text Keymap and Settings Importer][4] extension from Visual Studio Code. This allowed me to create keyboard shortcuts that synced up between Mac and Windows.

(It didn't work on my Windows PC because I don't have Sublime Text installed).

**Longer version**:

I used the Sublime Text Importer when I switched to Visual Studio for the first time. This extension helped me create keyboard shortcuts that I was familiar with in Sublime Text.

I did this when I was on Mac.

Unfortunately, Sublime Text shortcuts did not get synced to my Windows PC because [Settings Sync doesn't sync keyboard shortcuts across different platforms][5].

Then, I noticed Sublime Settings Importer doesn't work on my Windows Computer. It tried to find a Sublime Text application (which doesn't exist). It will never work since I don't intend to install Sublime Text on Windows.

But my Mac has Sublime Text shortcuts and My Windows PC doesn't. This gets confusing quickly. To make my life easier when creating keyboard shortcuts, I decided to uninstall the Sublime Text Keymap and Settings importer extension.

Ok, that's a ton of things you *need* to know before actually diving into the key bindings. I'm sorry you had to read through the preamble, but some of my bindings wouldn't have made sense otherwise.

From now on, **let's jump into the exciting part!**

## Go to File

The *Go to File* shortcut is my bread-and-butter shortcut. It opens a list box that lets you type a file you want to go to.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/go-to-file.gif" alt="Opens the quick open dropdown menu with Command + T.">
</figure>

**The default shortcut is:**

- Mac: `Command` + `P`
- Windows: `Alt` + `P`

**I changed the shortcut to:**

- Mac:
	- `Command` + `T`
	- `Command` + `P`
- Windows:
	- `Control` + `T`
	- `Control` + `P`

:::note
`Command` + `T` overwrites *Go to Symbol in Workspace*. I don't mind overwriting this shortcut since I don't use it. I find *Go to Symbol in Workspace* hard to use because the search is too broad. I prefer using *Go to Symbol in File* instead.
:::

**How to change**

First, open up the keyboard settings preferences. There are three ways:

*Method 1:* From the menu

- Mac: `Code` -\> `Preferences` -\> `Keyboard Shortcuts`
- Windows: `File` -\> `Preferences` -\> `Keyboard Shortcuts`

*Method 2:* Use show all Commands

- Mac: `Command` + `Shift` + `P`, then type keyboard shortcuts.
- Windows: `Ctrl` + `Shift` + `P`, then type keyboard shortcuts.

*Method 3:* Use a keyboard shortcut

- Mac: `Command + K`, `Command + S`
- Windows: `Ctrl + K`, `Ctrl + S`

Search for *Go to file* in the keyboard shortcuts panel. You should see one option from the list box on Mac. Change this to `Command` + `T`. On Windows, you'll see many options. Change the `Ctrl` + `P` one to `Ctrl` + `T`.

This creates a shortcut with `Command` + `T`.

<figure role="figure" aria-label="Searched for Go to file (on Mac)">
  <img src="/images/2020/vscode-keybindings-1/go-to-file.png" alt="">
  <figcaption>Searched for Go to file (on Mac)</figcaption>
</figure>

Next, I brought back `Command` + `P` as a keyboard shortcut. To do this, open up `keybindings.json` by clicking on the third icon from the top-right corner.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/keybindings.png" alt="Green arrow pointing to an icon that opens the keybindings.json file.">
</figure>

Look for `workbench.action.quickOpen`. You should find two values:

```js
// keybindings.json on Mac
{
  "key": "cmd+t",
  "command": "workbench.action.quickOpen"
},
{
  "key": "cmd+p",
  "command": "-workbench.action.quickOpen"
}
```

Delete the `-` from `-workbench.action.quickOpen` from the `cmd+p` entry.

```language-diff-javascript
{
  "key": "cmd+p",
-  "command": "-workbench.action.quickOpen"
+  "command": "workbench.action.quickOpen"
}
```

Do the same thing for Windows. You'll see `ctrl+t` and `ctrl+p` instead of `cmd+t` and `cmd+p`.

**Why this change?**

I use `Command` + `T` to open new tabs in browsers. It makes sense for me to use `Command` + `T` to open a new tab in Visual Studio Code as well.

I kept `Command` + `P` because it's a leftover shortcut I use once in a while (mostly by accident).

On Windows, my `Ctrl` key is in the position of the `Alt` key. Since `Ctrl` is in the same position as `Command` (on Mac), I'm effectively hitting the same thing on both Mac and Windows.

## Selecting a tab

I open many tabs when I'm coding, so I need a shortcut to switch between tabs.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/select-tab.gif" alt="Changes betwen three tabs with keyboard shortcuts.">
</figure>

**The default shortcut is:**

- Mac: `Control` + Number key
- Windows: `Alt` + Number key

**I changed it to:**

- Mac: `Command` + Number key
- Windows: `Ctrl` + Number key

**How to change:**

Look for *openEditorAtIndex* in the keyboard settings panel. You should find 9 entries (both Mac and Windows). Change this to `Command` (or `Ctrl`) + Numbers 1 to 9.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/open-editor-at-index.png" alt="Searched for Open editor at index. Found 9 entries.">
</figure>

**Why this change?**

I use `Command` + Number keys to switch between tabs when I browse. It makes sense to use the same keyboard shortcut to switch between tabs in Visual Studio Code.

- First Tab: `Command` + `1`
- Second Tab: `Command` + `2`
- Third Tab: `Command` + `3`
- And so on...

On Windows, my `Ctrl` modifier sits on my `Alt` key. This means `Ctrl` is in the same position as the `Command` key.

## Creating code panels (and switching between them)

It's super helpful to have two (sometimes three) panels to edit code. I use this for referencing code.

For example, I would open a HTML file on one panel. Then, I would open a CSS file on the second panel. Sometimes, I would use a third panel to open a JavaScript file. (But I stick with two panels most of the time).

<figure role="figure">
  <video controls>
    <source src="/images/2020/vscode-keybindings-1/create-code-panels.mp4" type="video/mp4">
    Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-1/create-code-panels.mp4"> here </a> instead.
  </video>
</figure>

Visual Studio Code offers a variety of ways to split the text editor. I found *focus on editor group* the best shortcut because it:

1. Opens a new panel when there isn't one.
2. Lets me switch between panels

In this example below, I jump from the second panel to the third panel, then back to the first panel.

<figure role="figure">
  <video controls>
    <source src="/images/2020/vscode-keybindings-1/jump-panels.mp4" type="video/mp4">
    Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-1/jump-panels.mp4"> here </a> instead.
  </video>
</figure>

**The default shortcut is:**

- Mac: `Command` + Number key
- Window: `Ctrl` + Number key

**I changed it to:**

- Mac: `Alt` + Number key
- Windows: `Alt` + Number key

**How to change:**

Look for *focus editor group* in Visual Studio Code's keyboard shortcuts panel. You'll see options that say `workbench.actions.focus[Number]EditorGroup`. (Where `Number` is first, second, third, fourth, and so on).

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/focus-editor-group.png" alt="Searched for focus editor group in Visual Studio Code keyboard shortcuts panel.">
</figure>

Change the shortcuts to `Alt` + the corresponding number.

- First: `Alt` + `1`
- Second: `Alt` + `2`
- Third: `Alt` + `3`
- And so on...

I use up to three editor groups, but I still changed all eight of them to maintain consistency.

**Why this change?**

`Command` + Number to switch tabs and `Alt` + Number to switch panels? That's the best combination I came up with. `Alt` is right next to `Command`. It's easy to access. You can see how fast I switched between the panels in the video earlier!

(Ok, I slowed down when I made the video... but you get the point).

On Windows, my `Alt` is right next to `Ctrl`. It makes sense. I'm pressing the same buttons on Mac and Windows.

## Move editor into group

What happens I opened a tab from the wrong panel? This is where *Move editor into group* comes in handy. It lets me move a tab from one panel to another.

<figure role="figure">
  <video controls>
    <source src="/images/2020/vscode-keybindings-1/move-panel.mp4" type="video/mp4">
    Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-1/move-panel.mp4"> here </a> instead.
  </video>
</figure>

*Move editor into group* also lets me open up a panel if there are none.

<figure role="figure">
  <video controls>
    <source src="/images/2020/vscode-keybindings-1/move-open-panel.mp4" type="video/mp4">
    Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-1/move-open-panel.mp4"> here </a> instead.
  </video>
</figure>

You can even create a Vertical + Horizontal split combination with *Move editor into group*!

<figure role="figure">
  <video controls>
    <source src="/images/2020/vscode-keybindings-1/move-open-panel-vertical.mp4" type="video/mp4">
    Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-1/move-open-panel-vertical.mp4"> here </a> instead.
  </video>
</figure>

You can move panels (which Visual Studio Code calls editor groups) in 8 ways:

1. First group
2. Last group
3. Previous group
4. Next group
5. Up
6. Down
7. Left
8. Right

The first four are generally useless. I prioritised the last four.

**The default shortcut is:**

No default keyboard shortcuts are assigned to the last four actions 😢.

**I changed it to:**

- Mac:
	- Move up: `Command` + `Alt` + `Up`
	- Move down: `Command` + `Alt` + `Down`
	- Move left: `Command` + `Alt` + `Left`
	- Move right: `Command` + `Alt` + `Right`
- Windows:
	- Move up: `Control` + `Alt` + `Up`
	- Move down: `Control` + `Alt` + `Down`
	- Move left: `Control` + `Alt` + `Left`
	- Move right: `Control` + `Alt` + `Right`

**How to change:**

Search for "*Move editor into*" in Visual Studio Code's keyboard shortcuts panel. You should see 8 entries.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/move-editor-into.png" alt="Searched for Move editor into in the keyboarh shortcuts panel.">
</figure>

Change key bindings to the ones I mentioned above.

Then, remove the key bindings for previous and next group by right-clicking and selecting "remove key binding". This ensures there are no conflicts between key bindings.

:::note
`Command + Alt + Up` overrides *Add cursor above* while `Command + Alt + Down` overrides *Add cursor below*. Feel free to remove their key bindings. I find this ok because I use another shortcut to add cursors.
:::

**Why this change?**

`Command` + Number keys to switch tabs. `Alt` + Number keys to move focus between tabs. And if you make a mistake, use `Command` + `Alt` + Direction keys to move the tab.

I find that this makes a lot of sense!

## Closing an empty panel

Let's say you create an empty panel by accident. You want to close this panel.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/close.gif" alt="Closes an empty panel.">
</figure>

Visual Studio Code lets you close this empty panel with the following shortcuts:

- Mac: `Command` + `W`
- Windows: `Ctrl` + `W`

I didn't change this shortcut. I just wanted to tell you about this because I find it useful.

## Toggle Vertical/Horizontal split

I prefer to split the screen vertically. But when I need code gets long, it makes sense to split things up horizontally. This is especially useful for those pesky JavaScript methods with super long names.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-1/toggle-split.gif" alt="Toggles split direction of panels">
</figure>

Visual Studio Code lets you close this empty panel with the following shortcuts:

- Mac: `Command` + `Option` + `0`
- Windows: `Ctrl` + `Alt` + `0`

I didn't change this shortcut. I just wanted to tell you about this because I find it useful.

That's it for today. I'll share more keyboard shortcuts with you next week.

[4]:	https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings
[5]:	/blog/sync-mac-windows-vscode
