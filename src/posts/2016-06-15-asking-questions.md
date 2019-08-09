---
title: How to Ask Good Coding Questions That Get Great Answers
layout: post
slug: asking-questions
tags:
 - mindset
 - best
newsletter: jsr
---

Have you ever asked code-related questions and never got a response? Even if you got a response, did you go through multiple back-and-forth clarification questions before you finally get a useful answer?

It happens. A lot.

It happens because you didn't ask questions that were good enough for anyone to answer you immediately. In this article, I'll help you learn the art of asking good coding questions so you'll always get great answers.

<!--more-->

But first off, don't get pissed (or feel that you're not good enough) if you didn't get a response.

## Why People Don't Answer Questions

Contrary to what you may believe, people DO answer questions, even if they're busy. Many experts actively answer questions via their email whenever they can; some reply Github issues at the speed of light; others browse through Stack Overflow to help answer questions on a daily basis.

**But nobody wants to spend 100% of their time answering questions**. Everyone has their priorities. Answering questions, frankly, falls to the bottom of these priorities. **The onus is on you to craft questions that others can understand and reply quickly**

So, what makes a great question that people want to reply to?

## Structure of a Great Question

1. It's specific
2. It's clear and concise
3. It shows you've put work into it.

There's no fixed structure. As long as you covered the three guidelines above, you're good to go.

Here's an example of a question that I procrastinated before answering (any procrastination from your answerer is bad because they might end up skipping them entirely):

<figure role="figure"><img src="/images/2016/asking-questions/badq1.png" alt="Example of a bad question."></figure>

Let's break it down why this question doesn't get answered immediately, and how it can be improved.

**First, it's not specific enough.** There are three instances where being more specific will greatly improve the question:

1. What should I comment on? How should I comment? Do I have to justify my work to him? Is he asking for help?
2. What does accessibility mean? Accessibility is a  big word and can mean a number of things.
3. What are my scaling techniques? Which technique is he specifically referring to?

**Second, the lack of specificity in this question made it unclear**. Even if I wanted to answer the question, I can't answer it without asking further.

**Third, it's unclear how much work was put into (1) crafting the question and (2) trying out the techniques mentioned**. Here, the lack of specificity shows that this guy hasn't sat down and crafted the question carefully. Besides, has he even tried the scaling techniques before asking about it? Trying to ask a broad question without first getting your hands dirty doesn't provide any value to you, usually.

Because of the ambiguity, I can spin 27 angles to this question. Answering every angle is exhausting and well, frankly, I don't want to.

What I do usually, is to ask clarifying questions to narrow down these angles. By the way, asking clarifying questions is a pain in the ass. Many people don't even reply to them, and the effort I put into asking (almost) always go to the trashcan. /rant

Note: You don't *always* have to ask about code. In this case, I get a sense that he's unwilling to even begin trying the techniques I mentioned because he doesn't know if the techniques scale (whatever it may mean).

After some clarifying questions, I realized that what he wanted was the ability for people to zoom in / out of the webpage while retaining the proportions of elements on a page.

Here's one way to make the question better:

> Hey Zell,
> 
> Thanks for all the articles you wrote about responsive typography. It helped me xxxx.
> 
> I have one question that I'm confused about. When you use em and rems, will you be able to keep the proportions between elements on a page consistent even if someone else zooms in or out?
> 
> To make it clearer, let's say the font-size of my body text is 16px while the font-size of h1 is twice of that at 32px. Will the font-size of h1 always be twice of the body text?
> 
> Thanks,
> Name-of-awesome-question-asker

Let's break it down why this works:

**First, the question started off with a "thanks"** that makes the answerer feel good. It also helps contextualize the situation, which makes it easier to answer.

**Second, there is only one specific question**. It's clear and specific. You immediately know what he's asking, so it's much easier to answer.

**Third, it's painfully clear**. Words can mean different things to different people. If need be, you can make it painfully clear by providing examples so there's no misunderstanding in your question. This helps to get the correct answer immediately. Clarity *always* beats *conciseness*.

**Finally, it shows that the guy has done his work**. It's difficult to boil down your question into a specific question. Doing that is already a bonus point. It also shows that the person has internalized (or at least tried things in his mind). People want to help others who put in work. They know the effort used to answer the questions will be put to good use. Me too.

Now, this question is ambiguous and seeks clarification. But what if you had a real code-related question and you need the answerer to look at your code?

## Getting The Answerer To Look At Your Code

**If you write code, you're already proving that you've done some work, so kudos to you.**

You can still use the same guidelines as above to help. Once again, the guidelines are:

1. Be specific
2. Be clear and concise
3. Show your work

This is where we get an interesting dilemma. What happens usually with people asking code-related questions is that they show *too much* of their work.

Here's an example of a question I received:

<figure role="figure"><img src="/images/2016/asking-questions/badq2.png" alt="Example of a bad question."></figure>

😄

Okay, what's wrong?

**First, it's not specific enough**. Where's the problem? It's awesome that he has a demo to show, but the demo is pretty large! Plus, this came from someone who bought my Susy book, so I'm wondering if the question is about Susy. It's not stated clearly, too.

When you think about the specificity of your questions, **think about how you can make it painfully clear to the answerer**. Take a screenshot, draw an image, shoot a video. Do whatever it takes to make it easier for the answerer to answer your question.

**Second, where's the code**? I can't do anything without looking at the code, can I? 😄

**When you show code, make sure you only show the relevant parts to the question.** Don't show everything, because it's immensely overwhelming. Will you debug someone's code with 1000 lines of CSS at a whim? Probably not. I don't want to either.

By the way, this is what we call a reduced test case. Chris Coyier explains in detail what a reduced test case is, and how to pull it off properly in [his article][1]. I recommend you check it out.

**If you need to show code, make sure you find a way for the answerer to look at, and edit your code easily.** Even though the person you're asking is much better than you, he probably can't get to the correct code without debugging (I know some awesome people can, but I can't. I'm sorry).

For frontend / static questions, you can use [Codepen][2] to create your test case easily. If you don't know how to use Codepen, make sure you take a look at [this video][3] by Chris, where he walks you through the basics of Codepen. It's old, but the principles remain the same.

If you can't use Codepen, it's your job to find an alternative way where your answerer can quickly look and code through your question. Git repos are an excellent way of doing so.

If you can't use Codepen nor Github (I honestly can't think of a reason why), send a zip file over. It's better than nothing.

If you noticed, **the underlying principle is to show that you respect your answerer's time**. Make your questions specific, clear and concise. Respect their time and you'll increase your chances of getting a great reply.

## Don't Feel Bad About Asking The Question

Your question is legit. It bothers you, so ask it even if you feel that it's going to be a waste of your answerer's time!

People love to help. More often than not, they would already have seen the question so many times that they can point you in the correct direction without even thinking about it. I point people to my blog posts pretty often ;) This way, they don't waste their time, and you get to go towards the correct direction much quicker. Win win.

**Also, don’t worry if English isn’t your native language.** You don’t need fanciful words to get question across. In fact, simple words and sentences often work way better than big words. Ignore trolls that criticize your English. They're not important.

## Pop The Question At The Correct Place

You can pop the question via email, in forums, Stack Overflow, or anywhere you can think of. The point is to make sure you ask the question where the answerer feels most comfortable with answering your questions.

Different people have different preferences. Some prefer you ask via email, some twitter, others maybe in person perhaps?

For me, I'm switching the way I answer questions starting from today. **If you want to ask me a question (Design, Frontend, Backend, Life etc), please [head over to this Github repo][4] and file an issue.** I'll reply.

I want to handle code-related questions via Github because:

1. This way, your questions don't get lost in my inbox.
2. I (might) have answered your question before. You can search for them easily on the Github issues.
3. It's much easier for me to search through Github issues and point people towards the correct answers than write a new reply for every question that comes my way.
4. (This last one is a fantasy). If you ask questions, I'll have more materials to talk about in blog posts (where I expand the replies). At the moment, everything gets lost in emails and I have to think of new topics every week. So ask away!

## Wrapping Up

I used to pride myself in answering every question that comes into my inbox (even the ambiguous ones). I'll send clarifying questions until I burn myself out.

It's tiring. I reply to emails more than doing actual work that I care about. So, to be completely honest, I'm actually writing this for two reasons. (1) To help you ask better questions and (2) to reduce the amount of work I take on.

So, if your question doesn't follow the guidelines I mentioned in this article, I'll point you back here until you refine them. Deal?

Besides, you know the benefits to learning to ask good questions. I don't have to spell it out :)

[1]:	https://css-tricks.com/reduced-test-cases/
[2]:	http://codepen.io
[3]:	https://css-tricks.com/video-screencasts/112-using-codepen/
[4]:	https://github.com/zellwk/ama/issues