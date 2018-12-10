---
title: Overcoming your Fear of the Command Line
layout: post
slug: fear-of-command-line
tags:
 - terminal
newsletter: ayw
---

Most tools that help you automate your workflow require the use of the command line. Hence, the first obstacle you have to overcome is getting comfortable with the command line.

But the command line is scary.

Playing with it feels like you're dismantling a bomb that could go off any moment. One wrong move and that'll mean the end of your life, and your computer.

I didn't dare to touch it when I first began to code. I felt that the command line was a tool that only experts could use.

However, as I got to know more about it, I began to realize that the command line isn't scary at all! It's incredibly safe, even for beginners, and anyone can use it to help improve their workflow.

In this article I'll show you why the command line isn't that scary, and how to start to get comfortable with it.

Ready to go? Let's begin!

<!--more-->

## Starting Up the Command Line

The command line is a program that takes in written commands and performs them with your operating system.

Your operating system should have a program built in to run the command line. It's called the Terminal on the Mac, and the Command Prompt on Windows. Fire that up and you're already looking at the command line (Note: Windows users might want to use a command line emulator like [Cmder](http://cmder.net) instead).

Here's how it looks like on a Mac

![command line](/images/2015/06/command-line.png)

You don't see anything you can do with it, there's no step by step instructions you can follow and everything you type in seems to return an error.

No wonder it's so scary!

Well, don't worry.

## Nothing you do will break your computer

Even if you entered multiple invalid commands.

When you enter an invalid command, all the command line does is to show you an error message, then do nothing.

Here's an example if what it does if you enter an invalid command:

~~~bash
$ blah
~~~

![invalid-command](/images/2015/06/invalid-command.png)

You'll get is a "command not found" error message, then nothing happens. You're still safe and your computer didn't explode.

The only command you need to be wary of is the `rm` command. This means to remove files permanently, which deletes your file and leaves it nowhere to be found, not even in your trash.

Next, you'll want to learn a few commands that you can use with the command line. It comes with [a big list of commands](http://ss64.com/osx/), but you'll only need to know 6 of them.

## The 6 commands you need to know

The 6 commands you need to know are:

1. pwd
2. cd
3. ls
4. mkdir
5. touch
6. clear

Let's go through them one by one.

### pwd

`pwd` means print working directory. All it does is to let you see the location you are at in the terminal.

~~~bash
$ pwd
~~~

![pwd](/images/2015/06/pwd.png)

### ls

`ls` means list files. If you enter this command you'll get a list of all the files and folders that is in your current location.

~~~bash
$ ls
~~~

![ls](/images/2015/06/ls.png)

In this case, you'll see that I have folders such as Desktop, Music, Pictures and Library within my current working directory.

This information is good knowledge for the next command you'll use.

### cd

`cd` means change directory. It allows you to change the current directory to different folders. It is the most used command of all.

When combined with the `ls` command, you'll be able to see the folders you can navigate to. If I wanted to navigate to Desktop, all I have to do is to write this:

~~~bash
$ cd Desktop
~~~

![cd](/images/2015/06/cd.png)

If you wanted to go back up a directory, you'll just have to type in `..` after `cd`.

~~~bash
$ cd ..
~~~

![cd back a directory](/images/2015/06/cd2.png)

You can repeat this `ls`, `cd` combination to get to any folder you want to get to.

Here's a neat thing. You can type cd and drag any folder on the mac into the terminal, and it'll fill up the correct path for you.

![cd with drag](/images/2015/06/cd-drag.gif)

### mkdir

`mkdir` means make directory. It's the same as creating a new folder by right clicking with your mouse and selecting create new folder.

~~~bash
$ mkdir testing
~~~

This creates the testing directory.

![mkdir](/images/2015/06/mkdir.png)

### touch

Touch is the command to create a file. You can create any kind of file with touch.

~~~bash
$ touch index.html
~~~

This means to create a file named `index` with the extension `html` in the current working directory.

![touch](/images/2015/06/touch.png)

### clear

`clear` means to clear the terminal screen. It'll remove all the clutter you have on the screen and revert it back to the clean state you had when you open the terminal.

~~~bash
$ clear
~~~

![clear](/images/2015/06/clear.png)

There you go, the 6 commands you'll need to know to use the terminal effectively.

And this point you may be wondering about other commands like `git`, `bower`, `npm`, `gulp` and all other kinds of commands you see around the internet.

The thing is these commands are not native to the command line. You'll wont be able to use them unless you have installed their command line interfaces (CLIs).

This means you don't have to worry about these commands for now. You can pick them up one by one as you learn more about them.

But even if you make mistakes with these additional commands, you're still safe. Let's take a look at an example with the `git` command

## Addtional commands from other CLIs

To use the `git` command, you'll need to make sure that Git is installed on your machine.

Git is already installed on the Mac, so Mac users can skip the installation step. Windows users will have to [install Git](https://git-scm.com/download/win) though.

Once you have Git installed, you can type commands that Git provides. You'll see a scary bunch of text if you type in an invalid command:

~~~bash
$ git
~~~

![Invalid command git](/images/2015/06/git1.png)

Let's look at it part by part so it's not so overwhelming. Here's the first part:

![git usage](/images/2015/06/git2.png)

Here we can see that the `git` command doesn't work alone. You'll have to accompany it with either an argument or a command.

So commands like these would work:

~~~bash
$ git --version # shows you the version of git installed
$ git --help # shows git help
~~~

The second part of this huge chunk tells you the common commands that people use with Git.

![Git commands](/images/2015/06/git3.png)

One of these commands is the `checkout` command, where you can check out a branch. Here's an example of how you can use it:

~~~bash
$ git checkout development # checks out the development branch
~~~

Finally, the last part simply tells you to enter the commands if you need more help:

![git4](/images/2015/06/git4.png)

As you can see, **nothing broke even when you entered an invalid command**. The command line is smart enough to prompt you that something is wrong, and ask you to correct your commands.

## Wrapping Up

We've covered the basics of the command line and you've seen why there's nothing to be afraid of. We also took a look at other CLIs with `git` as an example. I hope this article has helped you overcome your fear with the command line.

Don't worry if you don't understand what the `git` commands do right now. Every CLI has its own set of commands and you'll have to learn them by reading through their documentation or viewing tutorials on the web.

What's important right now is for you to get your feet wet with the command line and make sure you're comfortable typing in it.

One more thing. If you want to up your command line game, I highly suggest checking out the [free command line video series](http://commandlinepoweruser.com) by [Wes Bos](https://twitter.com/wesbos).

Try playing around with the 6 commands mentioned in the article – `pwd`, `ls`, `cd`, `mkdir`, `touch` and `clear` and let me know how you feel about the command line in the comments section below!
