---
layout: post
title: Preventing a Windows PC from adjusting the screen's brightness automatically
description: I noticed huge changes in the screen's brightness (which causes me to get distracted). I hated it, so I removed it. 
slug: windows-brightness
series: windows-web-dev
tags:
  - windows
  - setup
---

Mac changes the brightness of your screen automatically. It brightens up when you're in a bright place. It dims when you're in a dark place. They do it elegantly and slowly. Most of the time, their brightness adjustment is great.

The same cannot be said for Windows. I noticed huge changes in the screen's brightness (which causes me to get distracted). I hated it, so I removed it. 

Turns out, it's not as easy as you think it should be. 

<!--more-->

## Step 1: Turning off the option

This is the easy part. Search for "display" in the Start menu and select "Change brightness level". 

<figure role="figure">
  <img src="/images/2020/windows-brightness/change-brightness-level.png" alt="Shows how to find the setting to change brightness .">
</figure>

Then, uncheck the checkbox. 

<figure role="figure">
  <img src="/images/2020/windows-brightness/change-brightness-checkbox.png" alt="Uncheck the change brightness automatically checkbox.">
</figure>

This should be it, right? 

Nope. Not for every Windows computer.

If your PC is built on a Windows system, you still need to turn off adaptive contrast. 

## Step 2: Turning off adaptive contrast

Adaptive contrast is a feature that **changes the brightness of a screen depending on how bright the screen is**. 

I discovered it when I was working in a room with the lights turned off. (I know, bad for my eyes, but I still do it occasionally). I set the display brightness to the lowest level, but adaptive contrast brought it back up... 

Super irritating! 

You need to dig into the Window's Register to change this. [Follow this article][1] to do so. 

:::note
The article says to change `TestFeatureControl` from 2440 to 2450. The original value of my `TestFeatureControl` was 200. I still changed it to 2550 and it worked. 
:::

The article also said Windows updates can change the registry back to its original value, so you might need to do this once or twice a year. It's not fun, but there's nothing much we can do about it. At least we can disable the feature!  

[1]:	https://www.windowscentral.com/how-disable-adapative-contrast-surface