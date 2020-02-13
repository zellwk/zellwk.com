---
layout: post
title: Overcoming my panic towards accessibility
description: I've been afraid of touching accessibility for a few years now. This fear magnified when I began writing the accessibility lessons for Learn JavaScript. Today, I want to share with you why I became afraid of accessibility, and how I overcame this fear.  
slug: overcoming-panic-towards-accessibility
tags:
  - accessibility
  - life
---

Accessibility is a big part of JavaScript. If you build anything with JavaScript, you need to make them accessible.

I've been afraid of touching accessibility for a few years now. This fear magnified when I began writing the accessibility lessons for [Learn JavaScript][1]. 

Today, I want to share with you why I became afraid of accessibility, and how I overcame this fear. 

<!-- more -->

## My background

I grew up in an environment where I felt I was constantly scrutinised for my actions. Whenever something goes wrong, it was always my fault; it doesn't matter whether I actually did anything wrong. 

So I grew up being very sensitive towards whether things are "right" or "wrong". I need to make things "right" in order not to get punished. I also grew up thinking that everyone out there is trying to harm me. 

It's unhealthy, I know. I just realised this a few months ago. 

## Why I was scared of accessibility

I keep track of dev-related conversations on Twitter. I noticed a trend whenever I see anything about accessibility: Someone fucked up. 

There are two kinds of fuck-ups.

### First kind: Made by companies

The first kind is where big (and rich) companies refuse to build accessible websites. Developers all around Twitter-verse would talk negatively about these companies. 

When I see these conversations, I can't help but wonder whether I fucked up somewhere. I can't help but wonder if anyone was angry at me for creating something not accessible. 

Yes, the news is not about me. But I can't help it. I was the kind of person where everything (that's bad) will always be about me. Because everything is my fault. I grew up that way. 

(I'm admitting all my flaws right in this article. It's so freaking hard to write). 

I became guarded against the "Accessibility" topic. I cannot afford to screw up on this topic (I told myself this unconsciously). 

### Second kind: Made by individuals

The second kind of fuck-ups is made by developers who make and share experiments (or discoveries). Accessibility critics will always be there to point out more accessible options. Sometimes, they'll simply denounce the idea by saying the experiment is not accessible. 

I was defensive against such comments because I grew up thinking everyone was scrutinising me for my actions. Everyone was judging me. Everyone was everyone out to get me. I can't help it. 

There was one incident where I created a calendar with CSS Grid. I shared how I made this through [an article][2]. I also tweeted about it. 

<figure role="figure">
  <img src="/images/2020/overcoming-panic-towards-accessibility/calendar-fixed.png" alt="Calendar built with CSS Grid.">
</figure>

Guess what? The only people that jumped on this topic were the accessibility folks. They mentioned I should use a `<table>` element because it's more semantically correct. 

<figure role="figure">
  <img src="/images/2020/overcoming-panic-towards-accessibility/rik.png" alt="Rik says he would use table instead of CSS Grid.">
</figure>

<figure role="figure">
  <img src="/images/2020/overcoming-panic-towards-accessibility/meduz.png" alt="Meduz says he would use table instead of CSS Grid.">
</figure>

These weren't troll-type comments. They were valid replies. 

But when I saw these comments, I jumped and got angry. Why? Remember, I was at a point where I took things personally. I believed that everyone out there was trying to harm me. I grew up needing to be "correct". 

These comments pointed out where I was "wrong". When I was wrong, I get punished. This process was so ingrained in me that I punished myself (by beating myself up psychologically) even when nobody was around to punish me physically. It reinforced the idea that people are out there to get me. 

Here's another incident. It was worse than the previous one. 

Back in April 2019, I published an article about [a new way to hide content accessibly][3]. This article challenged long-standing conventions in the accessibility field. I was excited about the idea because it was a major discovery for me. 

When I published the article, I got this email. 

<figure role="figure">
  <img src="/images/2020/overcoming-panic-towards-accessibility/eric-1.png" alt="Email that asked if I tested this with a full range of assistive technology and browser pairings. If I didn't, then I'm being incredibly irresponsible.">
</figure>

I wasn't trying to be irresponsible. I already mentioned explicitly (in the article) that my suggestion was new and not thoroughly tested in the article, but the email came anyway. Once again, this reaffirmed my views that people are out there are watching me and are trying to get me. 

I tried to calm down. I understood that accessibility people were immensely concerned about accessibility. So I gave an adult reply to his message. I even added the words "disclaimer" in bold and caps in my article to emphasise the instability of the new method. 

<figure role="figure" aria-label="Adding a huge bold disclaimer to my article">
  <img src="/images/2020/overcoming-panic-towards-accessibility/disclaimer.png" alt="">
  <figcaption>Adding a huge bold disclaimer to my article</figcaption>
</figure>

What happened next was a productive discussion on Twitter about the pros/cons of this new method. Some people were more aggressive (fuckers, I would call them in my mind). Others were more understanding. 

Overall, it was a great learning experience. Here, I realised that Scott O'Hara is probably the most understanding and nicest person in the accessibility field. 

I then wrote about my findings and updated the article after the discussion. And I sent another email out to tell my readers about my new findings. 

Everything above happened in a day. 

Then, I received this in my email. From the same guy. 

<figure role="figure">
  <img src="/images/2020/overcoming-panic-towards-accessibility/eric-2.png" alt="Person stressed curt tone was justified. And if I break accessibility, I deny people of their civil rights.">
</figure>

I blew up. 

I raged at him for pushing my buttons (about being "wrong", about being "irresponsible"). I raged at him for feeling justified about his crudeness by punishing me with words, and it was all my fault to begin with. (I realised much later that I was the one who punished myself. But the process was so ingrained I felt that dude punished me).

I'm the one who's wrong here. Yes, even though it's not my fault. 😡. 

So once again, this reaffirmed my world-view that people are out to get me. This is especially prevalent when it comes to accessibility. 

I allowed myself to let out my frustrations by writing an article [on Advocacy][4]. I thought I let it all out. 

But that wasn't the end.

Deep down, I wanted nothing to do with accessibility anymore. I don't want to think about it. I don't want to touch it. And I retreated. 

But I didn't know I retreated. I didn't know I would become afraid of touching accessibility. 

The damage was done. But I was unaware.

## Deciding to overcome the panic

I was the kind of person who retreated when challenged. It made absolute sense why I was afraid of accessibility if you consider my background and experiences. 

But I had a reason to overcome my panic towards accessibility. My reason? I was writing [Learn JavaScript][5]. JavaScript is a huge part of accessibility. If I teach people to build things with JavaScript, I need to teach them how to make it accessible for other users. It's the right thing to do. 

So I had to step back out into the accessibility minefield.

## Overcoming the panic towards accessibility

I worked through two things to overcome my panic. 

**First: I had to allow myself to understand why I panicked**. I did this with the help of a life coach. This was how I discovered the whole background story you read above. (This was for general anxiety/panic related things. I panicked in many other parts of my life too). 

**Second: I had to understand accessibility**. I ate my own medicine. [I sat down and figured it out][6]. I got good enough to know the field. 

I spent one month doing these: 

1. Reading and understanding the spec 
2. Reorganizing content from the spec
3. Setting up screen readers on both Mac and Windows
4. Testing properties and attributes with Voiceover and NVDA
5. Building accessible components 
6. Testing components with both Voiceover and NVDA 
7. Writing about accessibility

In one month, I built 8 accessible components for [Learn JavaScript][7]. I also wrote 20+ lessons about accessibility. I figured out enough things to know the accessibility field. 

Am I still afraid of accessibility? 

Yes. I still get panic attacks when I think about accessibility. Heck, I even get panic attacks when I write CSS and JavaScript. I have not gotten to a point where I can manage all my panic reactions flawlessly. 

But I moved on. I'm at a better place compared to where I was a few months ago. I'm more confident. I became a better developer and a better teacher. 

## Why I'm writing this?

I felt like writing an extremely righteous message here (like saying it's for you to break out of your panic attacks towards code).

But if I'm honest. I would say I don't really know.

On one hand, I hope learning about my experiences would help you see yourself in a new light. That it's okay to panic. And you can continue to learn and improve even if you're panicking. 

I also hope you take the chance to work through any past traumas when you were a child (which led to the panic attacks). 

But ultimately, I think I'm telling this story so I can close this panic episode with integrity and honesty. I think I want to tell myself that it's okay to be weak and imperfect. That it was okay for me to be defensive. That it was okay for me to be angry. 

And it's okay to let the anger go now. Nobody out there is trying to harm me. Nobody out there is trying to force me to admit to mistakes I didn't make. Nobody out there is trying to make me "wrong". 

Even if I'm wrong, I don't have to punish myself. It's okay to make mistakes. I don't have to stay vigilant against the world. I don't have to protect myself from the entire world anymore. 

I can let go of my defensive barrier and receive the world with a pair of lenses that are less tinted compared to before. I don't know if how long it would take for me to let this all go. But I've started to let go. And that's a good thing.


[1]:	https://learnjavascript.today
[2]:	/blog/calendar-with-css-grid/ "How to build a calendar with CSS Grid"
[3]:	/blog/hide-content-accessibly/
[4]:	https://zellwk.com/blog/advocacy/
[5]:	https://learnjavascript.today
[6]:	/blog/figure-it-out/
[7]:	https://learnjavascript.today