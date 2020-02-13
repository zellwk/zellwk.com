---
layout: post
title: "Emulating Mac's Dvorak-Qwerty-⌘ on Windows"
description: Here's what I did to setup Dvorak-Qwerty-⌘ on Windows. I even talk about how I switched the position of Ctrl, Alt, and Win keys to make keyboard shortcuts easier for me!
slug: dvorak-qwerty
series: windows-web-dev
tags:
  - windows
  - setup
---

I write A LOT. When I got my Windows PC, the first thing I did was to change the keyboard so it's the same as my Mac's keyboard. 

I want to show you how to do this. It'll help if you're transitioning from Mac to Windows! (Or if you want to use both at the same time, like me). 

<!--more-->

First, let's talk about the keyboard layout I use for Mac: Dvorak-Qwerty-⌘. 

## What is Dvorak-Qwerty-⌘?

Qwerty is a keyboard layout. Dvorak is another keyboard layout. I switched to Dvorak from Qwerty because my hands ached when I typed. I wrote about my experience [switching to Dvorak as a web developer][1] if you're interested in hearing more.  

Dvorak-Qwerty-⌘ is a hybrid between Dvorak and Qwerty. If you hold down the Command key (on Mac), the keyboard layout switches back to QWERTY. This lets me use shortcuts like Cut, Copy, Paste, etc.

Mac has Dvorak-Qwerty-⌘ built into the system. Windows doesn't. 

## Installing Dvorak-Qwerty-⌘ for Windows

After a quick search on Google, I found three options that let you install Dvorak-Qwerty-⌘. All three options were created by other developers. (And they were all old repositories). 

1. [This one][2] by Kenton Varda
3. [This one][3] by Jeffrey Min
4. [And this one][4] by Brad Feehan

I tried the third option since I felt Brad used a robust method. It worked, so I didn't try the other two. 

The good thing about the third option is it changes the keyboard layout to QWERTY when I pressed the `Win` modifier as well. It wasn't strictly mapped to `Ctrl`. 

## Changing the locations of Ctrl and Alt

There's a major difference in the keyboard layouts between Windows and Mac. I'm talking about the modifiers here. 

On my Windows machine (Surface Laptop 3), `Alt` is located next to the `Space`. On Mac, `Command` is located next to the `Space`.

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/surface-keyboard.jpg" alt="Keyboard layout for Surface Laptop 3.">
</figure>

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/mac-keyboard.jpg" alt="Mac keyboard layout.">
</figure>

I wanted to switch the `Ctrl` and `Alt` keys so I can use the keyboard shortcuts as if I'm still on Mac. I found [an article][5] by Alan Hogan that shows me how to do this.  

Basically, I needed to use a software called [Auto Hot Key][6] to switch `Ctrl` and `Alt` keys. (Later, I discovered that Auto Hot Key is really popular with Windows users. They even have a Visual Studio Code extension!)

It's easy to switch `Ctrl` and `Alt` with Auto Hot Key. First, I had to create a file with the `.ahk` extension. I named it `change-key-mappings.ahk`. 

In this file, I had to include the following code:

```ahk
; Switches left control and left alt keys
LAlt::LCtrl 
LCtrl::LAlt
```

This code simply says: 

1. Map Left `Ctrl` to Left `Alt` 
2. Map Left `Alt` to Left `Ctrl`

Run the `.ahk` file once you're done creating it. That's all you need to do to switch the Left `Ctrl` and Left `Alt` keys.

### Making left modifiers behave like Mac modifiers

On a Mac, the modifiers go in this order (right-to-left from the spacebar): 

1. `Command`
2. `Option`
3. `Control` 
4. `Fn`

I wanted my modifiers on my Surface Laptop to do the same, so I changed the keys inside my `.ahk` file. This was the best I could do: 

1. `Ctrl` (as explained above)
2. `Alt` 
3. `Fn`
4. `Win`

`Fn` remained in the third position because I couldn't detect in with Auto Hot key. 

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/surface-keyboard-after.jpg" alt="Changed left modifiers.">
</figure>

I did this by changing the `.ahk` code to this: 

```ahk
; Makes left modifiers behave like MacOS
LAlt::LCtrl 
LWin::LAlt
LCtrl::LWin                    
```

This means: 

- Left `Alt` is now Left `Ctrl`. 
- Left `Windows` is now Left `Alt`. 
- Left `Ctrl` is now Left `Windows`.

### Automatically running the Auto Hot Key script

I wanted Windows to run `change-key-mappings.ahk` when my computer starts up. To do this, I had to put it in the Startup scripts folder. 

To do this, click the Windows icon and search for`Run`. 

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/run.png" alt="Search for Run in the start menu.">
</figure>

Then, type `shell:startup` and select `Ok`. 

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/run-startup.png" alt="Typed `shell:startup` in the field. ">
</figure>

Windows will open the File Explorer. What you need to do is drag your Auto Hot Key file into this folder. 

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/startup-script-saved.png" alt="Added `change-key-mappings.ahk` to the Startup folder.">
</figure>

## The right modifier keys

On my Surface Laptop, the right of the keyboard contained two modifier keys: `Alt` and `Appskey`. 

I wanted them to behave like MacOS's modifiers too, so I added this to `change-key-mappings.ahk`. 

```
; Make right modifiers behave like MacOS
RAlt:: Control
AppsKey::Alt 
```

## Better writing experience

When I tried to write, I discovered that Mac and Windows had different shortcuts for changing text insertion points. 

| Mac shortcut   | What it does   | Windows Shortcut |
| :------------- | :------------- | :--------------- |
| Command + Left | Go to beginning of line | Home |
| Command + Right | Go to end of line      | End | 
| Option + Left   | Go to start of word    | Control + Left |
| Option + Right  | Go to end of word      | Control + Right |

I switch text insertion points frequently when I write. For example, I often use `Command` + `Left` to move to the start of the line. Then, I use `Option` + `Shift` + `Right` to select some words. Then I use `Backspace` to delete the words I selected.  

I wanted to recreate this experience when writing as well. 

I tried googling how to use Auto Hot Key to change insertion points. The code I saw was so complicated, I gave up trying this. ([Here's an example][7]). 

I thought of an easier way: 

1. Map Right `Alt` + `Left` as `Home`
2. Map Right `Alt` + `Right` as `End`
3. Map `Appskey` as `Ctrl`

This meant I couldn't make right-hand modifiers the same as Mac. It was OK because changing text insertion points were more important to me. 

Mapping `Appskey` to `Ctrl` is easy: 

```Ahk
; Mirror shortcuts for changing text insertion points on Mac
AppsKey::Control 
```

It's harder to map `Alt` + arrow keys. After some research, here's what I came up with. (It allows you to select words with `Shift` too). 

```Ahk
; Set RAlt + Left as Home 
RAlt & Left:: 
If GetKeyState("Shift")
  Send, +{Home} 
else 
  Send, {Home}
Return

; Set RAlt + Right as End 
RAlt & Right:: 
If GetKeyState("Shift")
  Send, +{End} 
else 
  Send, {End}
Return
```

**Caveat: Auto Hot Key disables the default functionality of the prefix key**. My right `Alt` key became useless from this point onwards. I can't change a normal right `Alt` keypress to `Ctrl`.  

:::note
My right `Alt` key isn't supposed to work (according to Auto Hot Key documentation). But when I hold it down, it still behaves as `Alt`. I don't know why. 
:::

Since my right `Alt` key doesn't work, I can't comment code with `Command` + `/` anymore. It's unfortunate, but I think the tradeoff (for text insertion points) is worth it. 

## Customisations I wished I could make

I would LOVE to customise my Windows keyboard more. For example, I want to switch programs with `Command` + `Tab` instead of `Alt` + `Tab`. This means I have to create a mapping for `Ctrl` + `Tab`. But I couldn't do it since Auto Hot Key disables the functionality of the prefix key. 

Here are examples of customisations I wished I could make: 

1. `Command` + `Tab` for switching applications 
2. `Command` + `q` for quitting applications 
3. Switch `Ctrl` on my Window's right `Alt` key (while still allowing me to change text insertion points with the shortcuts I mentioned above). 
4. Allowing me to change text insertion points with the Left `Ctrl` and `Alt` keys

## Taming the language switcher

You can switch languages with `Alt` + `Shift` on Windows. This is bad news. I trigger the language switcher whenever I pressed right `Alt` + `Shift` + `Left` to select text. 

It's frustrating to switch languages when you're typing. I tried changing the [language switching shortcut][8], but Windows doesn't give me much choice here :(

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/disable-language-switching.png" alt="Disabled language switching shortcuts.">
</figure>

I decided to disable the language switching shortcut entirely. 

Later, I accidentally discovered I could still use `Win` + `Space` to switch languages. Who knew! Since my `Win` key is now on the left `Ctrl`, this far-away-yet-easy-to-access shortcut is great whenever I need to switch languages.

<figure role="figure">
  <img src="/images/2020/dvorak-qwerty-windows/showed-language-switcher.png" alt="Showed the language switcher.">
</figure>

## Running as administrator

**Auto Hot Key does not have admin privileges**. You would LOSE changes you wrote with Auto Hot Key when you run programs as an administrator. 

There are three ways to overcome this problem: 

**The first way is to do nothing**. You can pretend Auto Hot Key doesn't exist when you run programs in Administrator mode. This is the easy way to handle things. (I went with this method in the end). 

**The second way is to right-click on your scripts in the Startup folder and select "Run as Administrator"**. This grants your Auto Hot Key script administrative rights until you restart your computer. 

**The third way is to [create elevated permissions with the Task Scheduler][9]**. It lets you start the Auto Hot Key scripts as Administrator without showing the User Account Controls pop up. 

Option 3 sounds like the best option. I tried it. After setting up the Task Scheduler, I noticed a slight delay between typing a letter and the letter appearing on screen. (Maybe 0.2 seconds delay?). I didn't like this delay, so I stopped using Option 3.  

I'm not sure if you'll get a delay as well, so feel free to try out option 3! If you get a delay, delete the task from your Task scheduler and everything will go back to normal. No harm trying! 

## Notes to avoid frustration

I tested this Dvorak-Qwerty + Auto Hot Key setup for a few days now. I ran into some quirks that can get annoying. 

**First, Text Expander doesn't work with Auto Hot Key**. I don't understand why. When I expand a snippet, my keyboard would go haywire. Worse, the snippet didn't even get expanded properly.

I chose to write another Auto Hot Key script for all snippets I use daily. I intend to use Mac as my main machine anyway, so it's cool for me. I didn't need a second option here. 

**Second, Auto Hot Key can randomly screw up**. When this happens, you won't be able to type anything with your normal keyboard. 

I noticed the screwups usually happen in these cases: 

1. When I `Ctrl` + `Tab` out of a program running in Administrator mode.
2. When I install/remove programs 

To prevent #1 from happening, I always press `Ctrl` + `Tab` to go back to the program with Admin rights first. Then, I press `Alt` + `Tab` (which I originally intended to use) to switch programs. 

Another way to prevent #1 from happening is to run the Auto Hot Key script in Admin mode. 

To fix the screwups, I press each modifier key repeatedly a few times. After a while, I got the hang of which screwup requires which keys. 

Most of the time, these are the three keys that hang up:

1. My Left `Ctrl` key (which is `Win`). 
2. My right `Alt` key (which doesn't map to anything) 
3. A `Shift` key (don't know why) 

Maybe I made a mistake with the Auto Hot Key script above. I can't tell for sure. If you're an Auto Hot Key expert, I'd like some help! 😃. 

That's it for my setup. 

Hope this helps!  

[1]:	https://zellwk.com/blog/dvorak/
[2]:	https://github.com/kentonv/dvorak-qwerty
[3]:	https://github.com/chid/dvorak-qwerty/tree/master/dverty
[4]:	https://github.com/bradfeehan/Dvorak-QWERTY-Ctrl
[5]:	https://alanhogan.com/tips/swap-left-alt-and-ctrl-keys-in-windows "Swap left Alt and Ctrl keys in Windows"
[6]:	https://www.autohotkey.com/
[7]:	https://autohotkey.com/board/topic/94417-hotkey-to-move-insertion-point-to-end-of-sentence/
[8]:	https://windowsloop.com/change-keyboard-language-shortcut-windows-10/
[9]:	https://www.tenforums.com/tutorials/57690-create-elevated-shortcut-without-uac-prompt-windows-10-a.html#option2