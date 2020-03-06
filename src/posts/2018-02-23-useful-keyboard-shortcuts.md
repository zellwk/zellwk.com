---
title: Useful VS Code keyboard shortcuts
layout: post
slug: useful-vscode-keyboard-shortcuts
newsletter: better-fed
youtubeHash: Ng5EtzuD0AE
tags:
 - video
 - vscode
---

Today, I want to share vs code shortcuts I use on a daily basis. Here's a list of what we're going to go through:

1. Opening and closing the sidebar
2. File explorer
3. Marketplace
4. Switching workspaces
5. Opening the terminal
6. Go to file
7. Go to line
8. Go to symbol
9. The command palette
10. Split editor
11. Toggle editor group layout
12. Working with tabs
13. Select word
14. Folding and unfolding
15. Move line upwards or downwards.
16. Split lines
17. Pageup/pagedown
18. Jump to word
19. Expand region

<!--more-->

## The shortcuts

Two things before we dive into the shortcuts.

First, I use a mac, so I'm only going to share the Mac keyboard shortcuts with you. If you're on a Windows machine, you you can use most shortcuts I'm going to talk about by replacing `command` with `ctrl`. If that doesn't work, you may have to google for the right shortcut.

Second, some of the shortcuts you'll see in this video may not be native VS Code shortcuts. This is because I used Sublime Text before I switched to VS Code. When I made the switch, I installed the Sublime Text Keymap extensios, which preserves Sublime Text shortcuts.

Let's move on to the shortcuts.

### Opening and closing the sidebar

To close or open the sidebar, you can use `command` + `b`.

### File Explorer

To open the file explorer, you can use `command` + `shift` + `e`.

### Marketplace

To open the VS Code marketplace, you can use `command` + `shift` + `x`.

### Switching workspaces

VS Code keeps tracks of folders you opened automatically. Each folder is a workspace. To switch between workspaces, use `ctrl` + `r`, then select the workspace you want.

### Opening the terminal

VS Code has a built-in terminal that navigates to the project's folder. To open the terminal, use `command` + <code>`</code>.

I tend to use the VS code terminal for simple one-off commands. When I need a dedicated terminal, I switch over to my iTerm. My shortcut to bring up iTerm is `option` + `space`.

### Go to file

To go to a file, you use `command` + `p`, then type the name of the file you're looking for. This should help you locate files quickly.

### Go to line

To go to a line in the file, you use `ctrl` + `g`, then type a line number. Alternatively, you can also open the go to file menu with `command` + `p` first, then type `:`, then type your line number.

### Go to symbol

In CSS, a symbol means a selector. In JavaScript, a symbol is variable.

To jump to a symbol in VS Code, you use `command` + `r`, then look for the symbol you want.

To jump to a symbol in your project workspace, you use `command` + `shift` + `r`.

### The command palette

The command palette lets you execute tasks in VS code. To bring up the command palette, you use `command` + `shift` + `p`.

You can type any task you want to complete and VS Code will search for the task for you. If a keyboard shortcut exists, VS Code will show you the shortcut too.

### Split Editor

When I code, I usually split the screen into two. You can bring up to three different editor views in VS Code.

To split the editor, you can use the `split editor` command. The original keyboard shortcut for split editor is `123`. I switched it to `command` + `option` + `2`.

To switch keyboard shortcuts, you can open up the keyboard shortcut editor by opening the command palette, type the keyboard shortcut, then click the pencil icon to the left of the command and enter your new command.

### Toggle editor group layout

You can also toggle between horizontal or vertical split layouts in VS Code. To do so, you use the `toggle editor group` command.

The original keyboard shortcut is `command` + `option` + `0`. I switched it to `command` + `option` + `1`.

### Working with tabs

You can open a new tab by hitting `command` + `t`.

To switch between tabs, you use `command` + the tab number. 1 works for the leftmost tab; 2 for the second tab, and so on.

If you want to switch between tabs in different editors, use `ctrl` + the editor number. 1 works for the leftmost editor; 2 works for the second editor, and so on.

To close a tab, use `command` + `w`.

### Select word

To select a word, use `command` + `d`. If you hit `command` + `d` more than once, you'll add another occurrence of the same keyword to your selection.

To select all instances of a keyword in the same file, use `ctrl` + `command` + `g`. You can also use `command` + `F2`.

### Folding and unfolding

To fold code, use `command` + `opt` + `[`. This command lets you hide code that you might not need.

To unfold code, use `command` + `opt` + `]`

### Move line upwards or downwards.

To move a line upwards or downwards, use `opt` + the `up` or `down` arrow key.

### Split lines

To split a selection into multiple lines, first select multiple lines, then use `command` + `opt` + `l`.

### Pageup / Pagedown

If you want to move up or down a document quickly, like through the good old `pageup` or `pagedown` shortcut in Windows, you can use `fn` + `up` or `fn` + `down`.

### Jump to word

To jump to a word in VS Code, you need to install the Jumpy extension.

Once you've installed Jumpy, you can activate Jumpy's "word mode" through the command line to enter the word jump mode.

In this mode, you can type the two letter characters that's shown all over the editor to jump to the right word.

To exit jumpy's word mode, you can type a non a-z character like space or enter.

I set the Jumpy's word mode keyboard shortcut to `command` + `j` since J stands for jump.

### Expand Region

The Expand region shortcut can only be used if you have installed the Expand Region extension. It should have been in the last video, but I completely forgot about it.

Expand region lets you select a word, expand the selection upwards to the containing brackets (or tags), then another level of brackets, and so on.

To expand upwards, I set the keyboard shortcut to `command` + `option` + `up`.

To undo the expansion, I set the keyboard shortcut to `command` + `option` + `down`.

## Syncing keyboard shortcuts across devices

Keyboard shortcuts can be synced automatically across VS Code editors if you use the settingsSync extension mentioned in an [earlier video](/blog/vscode-3).

## Wrapping up

That's it for today. I hope you learned something useful.

If you like this video, I hope you subscribe to the channel so I can send you more videos like this every Friday. Or better yet, I hope you subscribe to my blog at https://zellwk.com. If you do so, I'll send you one article and one video every week to help you become a better frontend developer.

Thanks for watching. Have a good Friday and see you next week.
