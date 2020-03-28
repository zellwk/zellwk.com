---
layout: post
title: Bash vs Zsh vs Fish
description: "When I set up my Windows computer, I had the chance to take another look at the shell I'm using. The three main ones out there are Bash, Zsh, and Fish. I want to share which one I chose and how I went about setting it up."
slug: bash-zsh-fish
series: windows-web-dev
tags:
  - windows
  - shell
  - setup
---

When I set up my Windows computer, I had the chance to take another look at the shell I'm using. The three main ones out there are Bash, Zsh, and Fish. 

I knew of Bash. I used Zsh previously. But how would Fish fare? I've heard great things about it, so I tried it out. 

I want to share which one I chose and how I went about setting it up. 

<!--more-->

## Bash

Bash is the most basics of shells. If you open up a Terminal on Mac, or if you used Linux before, you've seen Bash. There's nothing super special about it. 

You can create aliases, make functions, export variables, and run commands. That's about it. 

Some people managed to make Bash shells look amazing. I have no idea how to do it (nor do I have the programming chops and patience to try this for myself). 

I wanted my shell to look better. That's why I went with Zsh in the past.  

## Zsh

Zsh is a shell, like Bash. 

Functionally, there's nothing different between Zsh and Bash. You can also create aliases, make functions, export variables, and run commands.  

What Zsh brings to the picture is colour customisation. You can change the theme and colour of your shell without much programming capabilities. 

All we had to do was install a "package manager" of sorts called [oh-my-zsh][1].  

Oh-my-zsh let you switch between built-in themes by changing one line of code. You can find out more about the themes [here][2]. You can also include plugins to make Bash-ing easier than before! 

Here's how my shell looks today (with the `avit` theme). 

```bash
ZSH_THEME="avit"
```

<figure role="figure">
  <img src="/images/2020/bash-zsh-fish/avit.png" alt="Avit theme.">
</figure>

## Fish

Fish (again) is another shell. Functionally (again), there's nothing much different between Fish, Bash, or Zsh. You can still create aliases, write functions, export variables, and run commands. 

On first glance, Fish stands out because it comes with these two features out of the box: 

1. Auto suggestions
2. Syntax highlighting

### Autosuggestions

Fish suggests commands as you type. These suggestions are in gray. 

<figure role="figure">
  <img src="/images/2020/bash-zsh-fish/fish-suggestions.png" alt="Auto suggestions in Fish">
</figure>

Fish knows about paths and options. It can even give you suggestions from the `man` page. This was something I never saw before, until today. 

### Syntax highlighting

Syntax highlighting is amazing. It shows you whether your command exists before you even hit enter. 

<figure role="figure">
  <img src="/images/2020/bash-zsh-fish/fish-syntax-highlighting.png" alt="Syntax highlighting in Fish.">
</figure>

You'll know whether you're typing anything wrong before you hit enter. This saves some keystrokes and unnecessary frustrations. 

Brilliant. 

## The Verdict: Bash, Zsh, or Fish?

**I recommend Fish, but I use Zsh**. 

I recommend Fish because it's easy to get started. You don't need any Bash chops to install Fish and Fish themes. For Zsh, you need to be able to edit the `.zshrc` file. You also need to be able to download plugins and put them in the `.oh-my-zsh/custom` folder. This takes more skills. 

I use Zsh because I have a bunch of aliases and functions written in Bash. I don't want to convert them into the Fish. 

### Fish syntax vs Bash syntax

Fish syntax is simply just different. It's not easier or harder. Here's an example of how you'd set variables Fish vs Bash. 

```bash
# Set variable in Fish
set name 'Zell Liew'
```

```bash
# Set variable in Bash 
NAME='Zell Liew'
```

The biggest difference (to me) is Fish doesn't have aliases. You need to use Functions. Bash uses aliases. 

```bash
# Set alias in Bash
alias dt="cd ~/Desktop"
```

I don't want to convert my functions and aliases into Fish syntax. I don't have the time nor space to it right now. So I continued to use Zsh. 

I think I won't ever use Fish because of the difference in syntax... But I want the automatic suggestions and syntax highlighting features from Fish. 

How?!

## Zsh plugins

People have built Zsh plugins that give us Fish-like auto-suggestions and syntax highlighting. Here are links to these plugins: 

1. [Zsh-autosuggestions][3]
2. [Zsh-syntax-highlighting][4]

Installing these plugins is quite simple. 

The basic idea is: 

1. You clone these repositories into `.oh-my-zsh/custom/plugins`. 
2. You fix their permissions with `chmod` (if necessary)
3. You add the plugin name inside your `.zshrc` file. 

Here's an example `.zshrc` configuration that uses four plugins—git, auto jump, zsh-autosuggestions, and zsh-syntax-highlighting. 

```bash
# Plugins option in .zshrc
plugins=(
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

## One-command installation script

Being the nerd I am, I created an installation script that helps you (me, actually) install Zsh, Oh-my-zsh, and Zsh plugins with a single command. It fixes Zsh plugin permissions as well. 

You can find this script in my [Dotfiles repository][5]. I call it [`install-zsh.sh`][6]. 

You have to add the plugin into your own `.zshrc` though! 

## Plugins I use

I use four plugins so far: 

1. git
2. autojump
3. zsh-autosuggestions
4. zsh-syntax-highlighting

Do you know of any useful Zsh plugins? Please share them with me! Also, I'd love to hear your thoughts on Bash vs Zsh vs Fish if you have any :) 

[1]:	https://ohmyz.sh "Oh my ZSH"
[2]:	https://github.com/ohmyzsh/ohmyzsh/wiki/Themes "Oh my zsh themes"
[3]:	https://github.com/zsh-users/zsh-autosuggestions
[4]:	https://github.com/zsh-users/zsh-syntax-highlighting
[5]:	https://github.com/zellwk/dotfiles "Zell's dotfiles"
[6]:	https://github.com/zellwk/dotfiles/blob/master/install-zsh.sh "One-command install script for Zsh, .oh-mi-zsh, and some plugins. "