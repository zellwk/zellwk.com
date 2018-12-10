---
title: An Overview of a Development Workflow
layout: post
slug: workflow-overview
tags:
 - workflow
newsletter: ayw
---

A good workflow is crucial for development because it saves time. We know this, and yet we constantly procrastinate this important task.

We can't blame ourselves really. New technologies pop up and we have no idea how to use them. The web industry moves too fast and sometimes causes us to be completely overwhelmed.

So for the first post in the workflow series, I wanna show you what a development workflow is, and how to automate different parts of the workflow.

<!--more-->

## The 6 parts of a development workflow

There are 6 parts in a development workflow:

1. Scaffold
2. Develop
3. Test
4. Integrate
5. Optimize
6. Deploy

**Scaffold** is where you setup your web project. This is where you'll create a git repo, prepare file structures, download libraries and dependencies and all other tasks just to make sure your project is ready to go.

**Develop** is where you spend the most of your time - writing code!

**Test** is where you test to see if your code works. You'll go back and develop more if things aren't working out, or if your new code breaks some other stuff on your website.

**Integrate** is where you merge your code with the rest of your team. This usually involves merging git branches. You skip integration if you work solo.

**Optimize** is where you prepare all your assets for use on the production server. Files are optimized such that they allow your visitors to view your site as quickly as possible.

**Deploy** is where you push your code and assets up into the server and allow changes to be viewed by the public.

We will dive into each part and figure out what can be automated. Here's a question for you before we do so though:

**Which part(s) are a major pain in the ass for you?**

Keep that in mind as you continue through the rest of this article. All 6 parts of the workflow can be automated so you'll reap the largest benefit from automating your most painful areas first.

Let's go through each part one by one.

## Automating Scaffold

We know that scaffold is the process where you first setup your project.

One of the things you'll have to do here is to install libraries like Susy and jQuery.

You know you're still on a manual process if you have to go to the Susy or jQuery website, download the source files and add them to your project.

This manual process takes up a huge amount of time and energy, which could have been used for development instead.

You could have saved the time and energy if you used a dependency manager like [Bower](http://bower.io). You just have to enter two commands in the command line and both Susy and jQuery will be downloaded for you.

~~~bash
bower install susy --save
bower install jquery --save
~~~

A 5-minute task of downloading libraries off the net can effectively become a 10-second task!

Another great thing about dependency managers is that you can install multiple libraries with a single command if you have it set up already.

~~~bash
bower install
~~~

This one command can effectively install any number of libraries as long as you have it configured beforehand, which saves your team members the trouble of downloading libraries.

Don't worry if you're unfamiliar with Bower or the command line because we can talk about these tools in detail in later posts. For now, just be aware that these are possible processes that you can put in place to quicken your workflow.

Now, back to dependency managers.

Different dependency managers work with different languages. Bower is one that specializes in frontend libraries.

If you use other languages, you'll want to keep these package managers in mind:

- [Node Package Manager(NPM)](https://www.npmjs.com) for NodeJS
- [Bundler](http://bundler.io) for Ruby and
- [Composer](https://getcomposer.org) for PHP

Another level of automation will be to use Yeoman to scaffold the entire project for you, including files and folders. That's way more advanced though. We can come back to this at a later stage.

Now on to develop.

## Automating Development

Go back to the good old days when we use only HTML and CSS. When you save any of these files, you'll have to manually reload the browser to see your changes, right?

Have you thought about the possibility of having your browser reloading the page for you?

Now, you probably use some preprocessing languages like Sass or CoffeeScript that require compilation into normal CSS or JavaScript before the browser can render them.

What if you could compile the languages and reload the browser as well when you save these files?

There's more. You might have to manually reload the pages if you used a templating language like Mustache or a CMS like Wordpress. What if you can watch for mustache or php files and reload the browser as well?

One more thing. You probably have different environments like development, staging and production set up. What would it mean for you if you could get the website to detect the environment you're on and serve the correct files automatically?

Wouldn't you want something like this? Developing and seeing your changes straight in the browser is definitely one of the most awesome automations you can do in the development stage. And you know what, it's possible now!

Doing so requires you to learn how to use a build tool, like [Grunt](http://gruntjs.com) or [Gulp](http://gulpjs.com).

If you're happy with a subset of what we mentioned here, and are afraid of the command line, you might want to check out GUI tools like [Codekit](https://incident57.com/codekit/) or [Prepros](https://prepros.io) instead.

There's really more to this, but let's talk more about it at a later stage. Onto the next part.

## Automating Testing

There are three kinds of tests you can run to ensure that your code is up to standard, works great and doesn't break anything.

The first kind of test is code format tests, where you check your code formatting to see if they follow industry practices using tools like [JShint](http://jshint.com) and [SCSSlint](https://github.com/brigade/scss-lint).

The second kind of test is unit tests, where you check your code against tests you have written to ensure that they work correctly, and new code doesn't break the functionality of other parts of the site. These tests are usually JavaScript-oriented and you'll have to learn to write tests with a JavaScript unit testing framework like [Jasmine](http://jasmine.github.io).

The third type of tests is CSS Regression testing, where you check the output of the browser to see whether it breaks parts of the page that you have previously coded. These tests helps catch visual errors on even on parts of the site that you may fail to notice yourself. They require you to learn more stuff, like [PhantomCSS](https://github.com/Huddle/PhantomCSS) and more.

You can run these tests with their own commands or you can use a tool to run all these tests together with a single command, which saves time and energy again, because you don't have to run the tests manually every single time.

If you want to run these tools with a single command, you'll have to learn how to use a build tool, and that means Grunt or Gulp again.

Next to integration!

## Automating Integration

Integration is normally done purely with Git, where you push, pull and merge code from different developers into a single repository.

If you want to make sure code from every developer is up to the standard and doesn't break any part of the website, you can run tests while integrating the code into the git repo.

To do so, you can set up a continuous integration (CI), which basically means automated testing after you integrate the codebase.

You'll have to learn how to write a CI config file to set this up.

Next!

## Automating your optimization process

You'll want to optimize all your assets for use on the production server to ensure the page loads as quickly as possible.

That'll involve minifying and concatenating CSS and JavaScript, optimizing images and SVGs and other processes.

You can also optionally amend your file structure such that production assets are placed in a specific folder.

If you only wanted to do basic minifying and concatenation of CSS and JavaScript without having to touch the command line, you can choose to use GUI apps like Codekit and Prepros.

However, if you want to have better control over asset management, then you'll want to use a build tool like Grunt or Gulp instead.

Finally, we have deployment.

## Automating Deployment

This is the process where you push your code and assets into the server and allow the changes you make to be viewed by the public.

The old manual way would be to use FTP and upload the necessary files.

A more modern method is to ssh into the server and do a git pull, which removes a ton of hassle already.

An automated way would be to create a post-receive hook where your server automatically pulls the new project whenever there is an update.

You'll just need to learn how to write this post-receive hook if you want to automate this process.

## Wrapping Up

And we have a quick 1500+ word nutshell of what makes up a development workflow, along with some automate-able ideas for each part. I hope this article has given you more clarity on what to expect and what to learn in this jargon-filled dev world.

What would you like to automate for your own workflow? What's your biggest pain point? I'd love to hear them in the comments below!
