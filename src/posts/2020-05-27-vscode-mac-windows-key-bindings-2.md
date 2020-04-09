---
layout: post
title: Customised (and effective) Visual Studio Code keyboard shortcuts for Mac and Windows (Part 2)
description: "Customised Visual Studio Code shortcuts to make the Integrated Terminal easy to use."
slug: mac-and-windows-vscode-keybindings-2
series: windows-web-dev
tags:
  - vscode
  - mac
  - windows
---

I talked about the key bindings I used to switch between tabs and panels last week. This week, I want to share some wicked shortcuts I use for the Integrated Terminal.

They're really sweet. 😘.

<!-- more -->

## I didn't like the Integrated Terminal previously

I have to be honest.

I didn't like the Integrated Terminal in Visual Studio Code for a long time. I felt it was too small; there wasn't enough space for code and the terminal to coexist. I know this sounds funny considering I use a 15" Mac. It sounds even funnier I say I use a 27" display...

But space wasn't the real problem.

The real problem was because Mac's shortcut for accessing the Integrated Terminal (`Control` + <code>\`</code>) wasn't accessible enough. Once I changed this shortcut, BOOM; I rarely use the integrated terminal anymore.

Let's start by toggling the integrated terminal.

## Toggling the integrated terminal

This keyboard shortcut opens and closes the Integrated Terminal. It's really important!

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/toggle-terminal.gif" alt="Toggles the integrated terminal.">
</figure>

**The default shortcut is:**

- Mac: `Control` + <code>\`</code>
- Windows: `Ctrl` + <code>\`</code>

**I changed it to:**

- Mac: `Command` + `Option` + <code>\`</code>
- Windows: `Ctrl` + `Alt` + <code>\`</code>

**How to change:**

Search for *"Integrated Terminal"* in the keyboard shortcuts panel. You should see an option to toggle the integrated terminal.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/view-integrated-terminal.png" alt="Searched for integrated terminal. View: Toggle integrated terminal appeared as the second option.">
</figure>

On Mac, you can't set `Command` + `Option` + <code>\`</code> through this panel. (Mac Visual Studio Code won't register <code>\`</code> with `Command` or `Option` keys). You must set it through the JSON file, so open up `keybindings.json` and insert the following entry.

```js
// Toggles terminal with Command + Option + `
{
  "key": "alt+cmd+`",
  "command": "workbench.action.terminal.toggleTerminal"
}
```

For Windows, set `Ctrl` + `Alt` + <code>\`</code> via the keyboard shortcut panel.

**Why this change?**

I fell in love with the Integrated Terminal when I was forced to use Visual Studio Code on Windows.

The shortcut for opening and closing the Integrated Terminal on Windows (`Ctrl` + <code>\`</code>) was extremely accessible to me. This is because I switched the positions of `Ctrl` and `Alt`. My left thumb is on the spacebar most of the time. `Ctrl` is next right next to it.

([Here's how I switched `Ctrl` and `Alt`][1])

I love it so much, I wanted to toggle the Integrated Terminal on Mac with `Command` + <code>\`</code>. But I can't do this because Mac uses `Command` + <code>\`</code> to switch windows of the same application.

So I settled with using `Command` + `Option` + <code>\`</code>. It's still easy to use because I can press `Command` and `Option` together with my thumb.

On Windows, my `Alt` key is next to the `Ctrl` key. I changed the shortcut to `Ctrl` + `Alt` to keep it consistent with the Mac version.

## Splitting the terminal

We can split the terminal into two with the *Split Terminal* action.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/split-terminal.gif" alt="Splitting terminals with a keyboard shortcut.">
</figure>

**The default shortcuts are:**

- Mac:
	- `Command` + `\\`
	- `Control` + `Shift` + `5`
- Windows:
	- `Ctrl` + `Shift` + `S`

**I changed them to:**

- Mac: `Command` + `Option` + `Control` + <code>\`</code>
- Windows: `Ctrl` + `Alt` + `Win` + <code>\`</code>

**How to change:**

Search for *Split Terminal* in Visual Studio Code's keyboard shortcuts panel.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/split-terminal.png" alt="Searched for split terminal in the keyboard shortcuts panel.">
</figure>

**Why this change?**

I already toggle the terminal with `Command` + `Option` + <code>\`</code>. I wanted this shortcut to be a slight variant of the toggle terminal shortcut.

The easiest way, I thought, would be to add another modifier. Here, I used the `Control` modifier for Mac (or `Win` for Windows).

:::note
I added another shortcut: `Command` + `D` because [iTerm2][2] uses that shortcut. I'm used to it.
:::

## Creating terminals

We can create a new terminal with the *New Integrated Terminal* action.

When you create a new terminal, a new window replaces the old one. You can switch between terminals by clicking on the "Switch terminal" box at the top-right corner.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/new-terminal.gif" alt="Creating new terminals with a keyboard shortcut.">
</figure>

**The default shortcuts are:**

- Mac: `Control` + `Shift` + <code>\`</code>
- Windows: `Ctrl` + `Shift` + <code>\`</code>

**I changed them to:**

- Mac: `Command` + `Alt` + `Control` + `Shift` + <code>\`</code>
- Windows: `Ctrl` + `Alt` + `Win` + `Shift` + <code>\`</code>

**How to change:**

Search for *New Integrated Terminal* in Visual Studio Code's keyboard shortcuts panel.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/new-terminal.png" alt="Searched for new integratde terminal in the keyboard shortcuts panel.">
</figure>

**Why this change?**

I already used these combinations so far:

- New Integrated Terminal: `Command` + `Alt` + <code>\`</code>
- Split Terminal: `Command` + `Alt` + `Control` + <code>\`</code>

It's easy for me to add `Shift` to the mix. So I did it.

Both *Split terminal* and *New Integrated Terminal* are easy to remember. I simply have to press 3 or 4 modifiers on the left side :)

:::note
I prefer to split the terminal over creating a new one. That's why *Split Terminal* has an easier keyboard shortcut.
:::

## Focusing on a terminal

I wanted a shortcut that lets me focus on a terminal window quickly. The best one I found is *terminal.focusAtIndexNumber*.

This shortcut lets me focus on both split terminals and new terminals.

<video controls>
  <source src="/images/2020/vscode-keybindings-2/focus-panels.mp4" type="video/mp4">
  Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-2/focus-panels.mp4"> here </a> instead.
</video>

**The default shortcut is:**

There are no default shortcuts for this feature 😢.

**I changed it to:**

- Mac: `Command` + `Option` + Number key
- Windows: `Ctrl` + `Alt` + Number key

**How to change:**

Look for *"focus terminal at index"* in the keyboard shortcuts panel. You should see this.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/focus-terminal-at-index.png" alt="Searched for focus terminal at index.">
</figure>

**Why this change?**

If you remember from [the previous article][3], here are the shortcuts I used:

1. Switch Tabs: `Command` + Number key
2. Switch code panels: `Option` + Number key

These two shortcuts help me focus my cursor on a specific tab. It makes sense to use a similar convention for focusing on terminals. That's why I settled with `Command` + `Option` + Number key.

For Windows, you know my answer by now. My `Ctrl` is in the same position as `Command`, and my `Alt` is in the name position as `Option`. By setting `Ctrl` + `Alt` + Number key, I'm essentially pressing the same thing on both systems.

## Kill the active terminal

When you can create terminals, you also need to be able to close them. This shortcut closes a terminal window. (It doesn't matter whether we're focusing on a split terminal or a new terminal).

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/close-terminal.gif" alt="Closes terminals with a keyboard shortcut.">
</figure>

**The default shortcut is:**

There are no default shortcuts: 😢.

**I changed it to:**

- Mac: `Command` + `W`
- Windows: `Ctrl` + `W`

**How to change:**

Search for *"kill terminal"* in the keyboard shortcuts panel and change it to the shortcut I mentioned above.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/kill-terminal.png" alt="Searched for kill terminal in the keyboard shortcuts panel.">
</figure>

There's one more step.

We only want to kill a terminal when the terminal has focus. It doesn't make sense to kill a terminal otherwise. We can restrict this shortcut with the `when` expression.

After you created a key binding, right-click the property and select *"Change when expression"*.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/kill-change-when.png" alt="Highlights change expression in the contextual menu.">
</figure>

Enter `terminalFocus` into the textbox.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/kill-when-changed.png" alt="Changed the when expression to terminalFocus.">
</figure>

**Why this change?**

On Mac, we use `Command` + `W` to close a tab. This shortcut let us close BOTH code tabs and panels. It makes sense to the same keyboard shortcut to kill a terminal window!

For Windows, I use `Ctrl` + `W` so I'm pressing the same thing.

## Positioning Workspace and Terminal side by side

I felt the Integrated Terminal doesn't have enough space, remember? With *Move Panel*, I can position my terminal and code editors side by side to get more vertical space.

I can even make Visual Studio Code look like Codepen if I wanted to!

<video controls>
  <source src="/images/2020/vscode-keybindings-2/codepen-it.mp4" type="video/mp4">
  Your browser doesn't support embedded videos. Watch the video <a href="/images/2020/vscode-keybindings-2/codepen-it.mp4"> here </a> instead.
</video>

(I expanded the terminal with another shortcut. You'll learn this later).

You can position the terminal panel in three ways:

1. Left
2. Right
3. Bottom

**The default shortcut is:**

There are no default shortcuts 😢

**I changed it to:**

- Mac: `Command` + `Option` + `Control` + Arrow key
- Windows: `Ctrl` + `Alt` + `Win` + Arrow key

**How to change:**

Search for *"Move Panel"* in Visual Studio Code's keyboard shortcuts panel. You should see this:

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/move-panel.png" alt="Searched for 'move panel' in Visual Studio Code keyboard shortcuts screen.">
</figure>

Change them to the shortcuts I mentioned above.

**Why this change?**

I already use `Command` + `Option` + `Control` for work on the Integrated Terminal. It doesn't hurt to add one more keyboard shortcut into this memory hook!

Besides, I can't use `Command` + `Option` + Arrow keys. They're used to move code editors into different panels (which is more important).

I also don't want to use `Command` + `Control` + Arrow keys. They're used for something else. (See the next section).

## Changing terminal panel size

Visual Studio Code lets you change the size of your terminal panel with a keyboard shortcut. That's what I used to resize the terminal in the video above 👆.

**The default shortcut: **

- Mac:
	- Resize Up: `Command` + `Control` + `Up`
	- Resize Down: `Command` + `Control` + `Down`
	- Resize Left: `Command` + `Control` + `Left`
	- Resize Right: `Command` + `Control` + `Right`
- Windows: No default shortcut 😢

**I changed it to:**

- Mac: I kept the defaults
- Windows: I didn't create a shortcut for this 😢

**Why?**

I thought of using `Ctrl` + `Win` + Arrow keys on Windows to resize terminals. Unfortunately, `Win` + Arrow keys make Windows resize the entire application. I couldn't think of a better shortcut, so I left it untouched.

## Maximizing the terminal

Here's one last tip for the terminal. You can maximise the terminal if you don't need the code editor. To do this, you can click the "Up chevron" icon on a terminal window.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/maximize-terminal.png" alt="Location of the button to maximize the terminal.">
</figure>

Here's what it does:

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/maximize-terminal.gif" alt="Maximizes the terminal panel.">
</figure>

**The default shortcut is**

There are no default shortcuts 😢

**I changed it to:**

- Mac: `Command` + `Control` + <code>\`</code>
- Windows: `Ctrl` + `Win` +  <code>\`</code>

**How to change:**

Look for *View maximise panel* in the keyboard shortcuts panel.

<figure role="figure">
  <img src="/images/2020/vscode-keybindings-2/view-maximize-panel.png" alt="Searched for Viwe maximize panel in the keyboard shortcuts panel.">
</figure>

**Why this change?**

I already use <code>\`</code> lots of shortcuts regarding the terminal:

- Toggle terminal: `Command` + `Option` + <code>\`</code>
- Split terminal: `Command` + `Option` + `Control` <code>\`</code>
- Create new terminal: `Command` + `Option` + `Control` + `Shift` <code>\`</code>

Creating another combination with a memory hook to <code>\`</code> is easier than finding a brand new key to use.

That's it for today. I'll share more shortcuts next week.

[1]:	/blog/dvorak-qwerty#changing-the-locations-of-ctrl-and-alt
[2]:	https://iterm2.com
[3]:	/blog/mac-and-windows-vscode-keybindings/