---
title: Should you switch to Gulp if you’re happy with your workflow?
---

I had a question from Benjamin. He wonders if he should ditch his workflow and learn everything about Gulp from scratch.

I thought you might have this question as well, so I wanted to share my answer with you.

In order to answer this question, we first have to look at the two different types of build tools.

The first type of tools are tools with a graphical user interface (GUI). They give you multiple options to choose from. Tools like Codekit and Prepros fall into this category.

The second type of tools are those that can only be used via the command line. You’ll have to install their command line interfaces (CLI) and learn to write their configurations in order to use them. Tools like Grunt and Gulp fall into this category.

In order to answer the question, we first have to look choosing between GUI or CLI tools.

**GUI tools or CLI tools?**

GUI tools are great for beginners. They come with configurations that are already setup nicely for you to automate your workflow straight away. You don’t have to learn to configure anything at all.

However, in exchange for it’s ease of use, GUI tools are often limited in terms of flexibility. You wouldn’t be able to use open-sourced tools that aren’t built into these GUI tools until the developer decides to implement them.

If you want proof, just look at the feature requests for both [Codekit](https://github.com/bdkjones/CodeKit/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+feature+request) and [Prepros](http://discuss.prepros.io/c/feature).

At the time of writing this email, Codekit has 52 outstanding feature requests. Most of them were requests to add support for commonly used open-sourced tools. (Like Babel, JSX etc). Prepros’s feature requests threads were similar as well.

This also means that you won’t be able to use the latest libraries (even for supported modules) unless the developer decides to update them.

CLI tools, on the other hand, offer far more flexibility compared to GUI tools. You get to choose from tonnes of plugins (in both Gulp’s and Grunt’s community) to build your workflow.

Since you’re the one choosing, you also have the power to add, remove or update the libraries for your project. You also get to extend your workflow and build new practices whenever you want.

In addition to the flexibility of choosing your plugins, you’d also find that it becomes easier for you to lock down processes for your team. This is because everyone uses the workflow that you’ve built. You won’t be able to ensure that everyone is on the same version of Codekit or Prepros though.

Finally, perhaps the most important benefit you’d get from using CLIs tools is the confidence to try out new things.

I’ve experienced this benefit myself as I got more comfortable adapting to new technologies as I switched over from Codekit to Grunt and eventually Gulp.

So, take your pick between GUI or CLI tools. I highly recommend CLI tools if you’re looking to customize or improve your workflow.

That said, don’t be afraid to stick with GUI tools if you feel that CLI tools are too much for you right now. I’ll explain further down this email.

For now, let’s shift our focus into CLI tools and find out why I choose Gulp.

**Gulp vs other CLI Tools**

The two most popular CLI Tools out there are Grunt and Gulp. Grunt was released first and it became extremely popular because it revolutionized the way people built websites.

Gulp came into existence after Grunt, and aimed to fix some problems that Grunt had. It then took Grunt’s place as the most popular build tool soon after.

There are two reasons why Gulp became more popular than Grunt.

1. Gulp’s approach to executing tasks is much faster and more intuitive.
2. Gulp’s configuration files are much shorter compared to Grunt.

Gulp is able to beat Grunt in these two areas because of its stream-based approach as opposed to Grunt’s file-based approach. Let me explain this approach with a simple analogy.

Imagine you own a factory that manufactures sodas. You need to do the following tasks for each can of soda you sell:

1) Get raw materials from the supplier
2) Manufacture the can
3) Fill the can with soda
4) Sell it to customers

Here’s Grunt’s way of doing these tasks:

1. Get all the materials from the supplier and store them in the warehouse.
2. Take all the materials out, send them to be made into soda cans, and store the newly made cans back in the warehouse.
3. Take the cans out and fill them up with soda, then place them back in the warehouse again.
4. Deliver the soda from the warehouse to the customer

Doesn’t it seem like Grunt takes some unnecessary trips to the warehouse?

The warehouse in this contrived example is your computer’s file system. Grunt needs to put files back into the file system whenever it completes a task. When a new process starts, Grunt needs to access the files from the file system again.

Here’s a simple diagram of how a workflow with Grunt may look like:

![](https://convertkit.s3.amazonaws.com/assets/pictures/393/5058/content_grunt.png)

Since you have to tell your workers (each grunt task in this case) where to store the materials after each step, the configuration can become long and complicated if you need to run multiple tasks.

Here’s how a Grunt configuration compares to a Gulp configuration.

![](https://convertkit.s3.amazonaws.com/assets/pictures/393/5060/content_grunt-vs-gulp-config.png)

Here’s what Gulp does that allows it to have a considerably shorter configuration.

1. Gather raw materials from the warehouse and place them into an assembly line
2. Use the materials and make some cans
3. Once cans are made, fill them up with soda, and put them back into the warehouse.
4. Deliver the soda cans from the warehouse to the customer

As you can see, Gulp works like an assembly line. Once a task is completed, the cans (files) are passed to the next process immediately.

Once all processes are completed, Gulp then stores the final output in the warehouse (file system).

Here’s how a process would look like:

![](https://convertkit.s3.amazonaws.com/assets/pictures/393/5061/content_gulp.png)

So there you have it. This example, although contrived, shows the main difference between Grunt and Gulp and why Gulp became more popular than Grunt.

The reason I choose Gulp over Grunt is simple. I find that it’s easier to configure Gulp than to configure Grunt (especially for more complex workflows).

Now, after having all this background knowledge, I can answer the question.

**Should you ditch your workflow and try Gulp?**

I heard about Gulp just two months after I learned Grunt. I didn't want to ditch my perfect (at least I thought i was at the time) Grunt workflow for Gulp so I understand your frustration and anxiety you face when you make such a decision.

There’s another question that may stand out to you as well.

What if you learn Gulp, and something better pops up YET AGAIN?

The answer to both of these questions are the same, so I’ll answer them together.

**There are three things I’d like to point out in my answer:**

**First, your workflow hasn’t been made obsolete just because of the existence of Gulp** (or any other tool). Even if a new one pops up, it’s unlikely that it’ll render our current tools obsolete as well.

So, if you already have a workflow you’re happy with, it doesn’t make sense to throw everything away just to embrace a new technology, doesn’t it?

**Second, there’s never going to be a perfect tool for everyone.** Just pick the one that feels right for you. If GUI tools does everything you need, feel free to stick with it! If you prefer Grunt’s configuration methods over Gulp, feel free to stick with Grunt as well. No one is pointing a gun at you to try Gulp.

**Third, are you looking for a better and more robust workflow?** I used to think my workflow with Codekit was perfect. That was until I gave Grunt a try. I discovered that I can do so much more.

Likewise, I became overprotective of my Grunt workflow and refused to try Gulp for almost half a year. I eventually relented, and I was amazed at how much easier it is to setup a Gulp workflow.

I’ve since went ahead and learned how to build complex workflows that I would have never been able to achieve with Codekit or Grunt. This workflow I’m teaching you to build in [Automating Your Workflow](http://automateyourworkflow.com/) is one of the best I’ve seen around. (I’m obviously biased :))

Anyway, here’s the short answer:

**You don’t have to ditch your current workflow and learn to build one with Gulp. However, if you give me the chance, I’ll show you a workflow that may surpass whatever you can think of right now.**

So yup, it’s your choice. Decision time!

[Click here to get Automating Your Workflow](http://automateyourworkflow.com/) if you’re interested.

Note: If you’re not interested, you can [click here](http://www.zell-weekeat.com/opt-out-workflow/) instead, and I’ll stop sending you emails about Automating Your Workflow.
