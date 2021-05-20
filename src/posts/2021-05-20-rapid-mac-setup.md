---
layout: post
title: Rapid Mac Setup for Frontend Development
description:
slug: rapid-mac-setup
tags: ['mac', 'tools', 'workflow']
---
My Macbook broke down after using it for a year — the logic board got fried. I got this Mac repaired and it broke down a month later. The logic board got fried again 🤦‍♂️.   

Long story short, Apple agreed to repair the Mac again for free. They also agreed to send me a new Macbook as a replacement since my current one gave me so many problems.   

In the meantime, I've gotten pretty good at setting up my Mac and I'd like to share how I do this with you.   

<!-- more -->  

## The Mac Setup   

The first thing I do is increase the tracking speed for both my mouse and trackpad since it means I become (slightly) more productive with a faster mouse cursor.   

<figure role="figure" aria-label="Trackpad tracking speed">
<img src="/images/2021/rapid-mac-setup/trackpad-speed.png" alt="Trackpad speed settings">
<figcaption>Trackpad tracking speed</figcaption>  
</figure> 

<figure role="figure" aria-label="Mouse tracking speed">
<img src="/images/2021/rapid-mac-setup/mouse-speed.png" alt="Mouse speed settings">
<figcaption>Mouse tracking speed</figcaption>  
</figure>  

Then I change the keyboard layout since [I use Dvorak Qwerty](https://zellwk.com/blog/dvorak/) as my main layout.   

<figure role="figure">
<img src="/images/2021/rapid-mac-setup/keyboard-layout-settings.png" alt="Keyboard layout settings">
</figure> 

But I don't change the keyboard delay until repeat because I have [a macos script](https://github.com/zellwk/dotfiles/blob/master/mac/macos) that shortens the delay way beyond what the Mac setting can do.   

This macos script (inspired by [Mathias Bynen's script](https://github.com/mathiasbynens/dotfiles/blob/main/.macos)) also configures many other OS-level settings that are gonna be useful for developers.  

  

## My External Keyboard  

I'm very thankful that I bought [a Moonlander](https://zellwk.com/blog/moonlander/) and configured it a while back. This lets me plug in my keyboard into my computer and almost all my shortcuts come back automatically.   

It also lets me switch between my Mac and my [Windows machine](https://zellwk.com/blog/windows-wsl/) (which is my backup computer) without having to get used to changes in the keyboard layout.   

  

## Dotfiles  

I [wrote about dotfiles](/blog/mac-setup-2) back in 2019 which helps me configure how several programs behave. I [share my Dotfiles publicly on Github](https://github.com/zellwk/dotfiles) so you're free to use them if you wish to.   

While setting up my new computer, I realized my Dotfiles weren't optimized for computer setup — they contained many [binaries](https://github.com/zellwk/dotfiles/blob/master/mac/brew-binaries.sh) that were useful for development, but they weren't essential right away. So I optimized the setup by prioritizing [essential apps](https://github.com/zellwk/dotfiles/blob/master/mac/brew-essentials.sh) like Alfred, Dropbox, Google Drive, Tower, etc.   

  

## Copying SSH Credentials  

It's a hassle to create new SSH credentials for every new Macbook, so I decided to save a copy of my SSH configuration into a private Github repository.   

<figure role="figure">
<img src="/images/2021/rapid-mac-setup/github-repo.png" alt="SSH configuration saved in Github repository">
</figure> 

I then copy these secrets and fix their permissions with a handy script. (I'm not sure whether the `755` permission for `.ssh` is excessive though).   

```shell
# Create .ssh folder
mkdir -p ~/.ssh

# Copies SSH config into .ssh folder
sudo cp -r ssh-mac/* ~/.ssh

# Fix permissions
sudo chmod 755 ~/.ssh
sudo chmod 400 ~/.ssh/id_rsa
```  

This makes it easy for me to SSH anywhere — both to Github and my [Digital Ocean](https://m.do.co/c/64daa7a7a455) Server.   

  

## Visual Studio Code  

Setting up Visual Studio Code is easy because I've already saved my preferences with the [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) extension. It saves everything you need — including keyboard shortcuts, visual studio code preferences, and even the snippets you created for each language.   

If you use Visual Studio Code and haven't created a Settings Sync profile yet, I highly encourage you to do so. You'll never know when you need to setup your code editor... (but I hope you don't have to use it).  

  

## Apps  

Aside from the apps I can [download](https://github.com/zellwk/dotfiles/blob/master/mac/brew-essentials.sh) with [Homebrew](https://zellwk.com/blog/homebrew/), I also have paid apps that can't be downloaded with Homebrew. These apps are managed under Setapp and the Mac App store.   

### Setapp  

In Setapp, I favourited all the apps I want to download and install and I can install them all with a single click. Makes things easy!  

<figure role="figure">
<img src="/images/2021/rapid-mac-setup/setapp.png" alt="Setapp favourite apps">
</figure> 

Not to mention, Setapp has really good apps that can cost a bunch. Notable mentions include:   
  - Bartender - for hiding stuff  
  - Busycal - my calendar  
  - Cleanshot - better screenshot tool   
  - Clean My Mac - for cleaning up the mac   
  - Dash - reading documentations  
  - Mind Node - for creating mindmaps.   
  - Petrify - generating code images  
  - Sizzy - browser for responsive web development  
  - Typeface - organizing my fonts  

I recommend checking out [Setapp](https://setapp.sjv.io/c/2100771/344537/5114) if you're on a Mac. It has many handy Mac apps.   

### Mac App Store   

In the app store, I basically sign in, view my purchase history and download the things I need.   

The only notable mention here is [Moom](https://manytricks.com/moom/), which I use to tile my windows in various positions. Setapp has an app called [Mosaic](https://setapp.sjv.io/c/2100771/354736/5114) which does the same thing. But I prefer sticking to Moom because I haven't found a need to change the workflow.   

### List of apps 🤔  

I'm curious if anyone is interested about a list of apps I use on a daily basis. It'll be cool to compile and share this list. But I only want to do it if there's sufficient interest 😂   

  

## How I store my files and documents  

With the amount of computer-switching going on, I found myself relying on Dropbox and Google Drive for most of my files — I store almost everything there so I don't lose any documents.   

But I have a bad habit of storing files on my Desktop (which is how [I lost the files for my redesign](https://twitter.com/zellwk/status/1389266479409889280?s=20) 😢). It's good to change up this habit so I actually don't lose anything even if my logic board dies again.   

<figure role="figure">
<img src="/images/2021/rapid-mac-setup/twitter-post.png" alt="Zell twitter post">
</figure> 

I don't keep code projects inside Dropbox/Google Drive for obvious reasons — there's a ton of dependencies with `npm` for each project. Storing `node_modules` in Dropbox or Google Drive is simply a waste of space...   

I don't keep code projects inside Dropbox/Google Drive for obvious reasons — there's a ton of dependencies with `npm` for each project. Storing `node_modules` in Dropbox or Google Drive is simply a waste of space... I version control them with Git instead 🤓. But this means I'll need to build a habit of committing and pushing updates into the Git repository.   

  

## Wrapping up  

I hope this gives you a good idea of my workflows on my computer. Everything here is made to minimize downtime should I have to switch to another laptop.   

It's tedious to set this up. But once you have this ready, getting up to speed can take 1-2 hours instead of 1-2 days. It's a huge time saver going forward.   

What's your workflow regarding your computer? Do you do something similar to how I do it? I'd love to hear your thoughts so please feel free to [let me know](https://zellwk.com/contact)!  
