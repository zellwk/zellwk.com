---
layout: post
title: Designing a focus style
description: Problem with the default focus style + inspirations to design your own focus style. 
slug: design-focus-style
tags:
  - design
  - accessibility
---

**Focus is important.** It tells us what element we're currently focusing on. Most developers suggest keeping the default focus style. 

I think **there are problems with the default style.** I tried searching for inspiration to design a better focus style, but I couldn't find anything on this topic. So I did some quick research by visiting sites I use and paying attention to their focus styles.  

I want to document my research and findings in this article. I hope it helps you: 

1. Understand the problems with the default focus style
2. Give you some inspiration to **design your own focus styles**

<!-- more -->

Let's start off by talking about the pros and cons of browser default focus styles. 

## Pros and cons with the defaults

### Pros

The default focus style is great because **we're familiar with it**. When we see the blue ring around something, we know it is in focus. 

Note: Since the default focus style is a ring around the content, I'm going to use the term "focus ring" and "focus style" interchangeably. 

<figure role="figure"><img src="/images/2019/focus/chrome-focus.png" alt="Default focus ring in Chrome."></figure>

It is also great because **you don't have to write any code** to create a usable focus ring. 

### Cons

Here's the major problem. **The default focus style is different across browsers.** They're not consistent. 

- Safari: Blue solid outline
- Firefox: Thin dotted outline 
- Chrome: Blue blurry outline 

 <figure role="figure"><img src="/images/2019/focus/default-style.png" alt="Default focus style across browsers."></figure>

Here's the second major problem. The default focus lacks contrast in specific situations. 

**Firefox's thin dotted outline lacks contrast on pages with a white background**. You can hardly see the outline. Luckily, firefox switches the outline from black to white on dark backgrounds. The contrast is okay. 

<figure role="figure"><img src="/images/2019/focus/default-style-dark.png" alt="Default focus style on a dark background."></figure>

**Safari and Chrome's blue outlines lack contrast on pages with dark backgrounds**. The contrast is even worse if you used a bluebackground. 

<figure role="figure"><img src="/images/2019/focus/default-style-blue.png" alt="Default focus styles on a blue background. "></figure>

Third problem. **Chrome's focus-ring blur makes the element looks unfocused**. 

The purpose of a focus ring is to draw attention to the focused element. If you blur the focus ring, you lose focus. Why would you draw attention to an element, but take away attention at the same time? It doesn't make sense. Are you telling me to focus or not? 

Fourth problem. This is more of a design thing. When you think about branding, **you want users to have a consistent experience** across your site (as much as possible). It shouldn't matter if they're using Safari, or Chrome, or Firefox. 

Focus is one small part of the entire experience. We have the tools to make sure focus remains consistent across browsers. It's not hard at all! 

If you "just use the default", does it mean focus is an afterthought in your design process?

## Focus inspirations

I couldn't find any good articles about designing the focus ring, so I went to websites I normally visit, and paid special attention to their focus. 🤓.

### CSS Tricks

CSS Tricks used the default focus ring for every element. 

There's a tiny addition to links. If you focus on links, they get a color-gradient. I love this color-gradient treatment. It brings a ton of personality to the site. 

<figure role="figure"><img src="/images/2019/focus/css-tricks-links.gif" alt="Tabbing over CSS Tricks links."></figure>

However, buttons don't get any special treatment. If you focus over buttons, you only see the default focus style. Also, the focus ring doesn't show up clearly on the dark background.

<figure role="figure"><img src="/images/2019/focus/css-tricks-buttons.gif" alt="Tabbing over CSS Tricks buttons."></figure>

There was a special treatment on tags though. When I focused on the tag for the article, the white border popped out at me. I see this element clearly compared to the others. 

<figure role="figure"><img src="/images/2019/focus/css-tricks-header.gif" alt="Tabbing over CSS Tricks elements in the header."></figure>

### Smashing Magazine

Smashing Magazine uses a dark-red outline instead of the default one. I found it pleasant to look at. The contrast is large enough for most of the links. 

<figure role="figure"><img src="/images/2019/focus/smashing-text.gif" alt="Tabbing over links in Smashing Mag."></figure>

However, the dark-red outline doesn't make focused elements stand out as much when they're on a red background. The contrast wasn't huge. But the text color change from white to black draws my attention. 

<figure role="figure"><img src="/images/2019/focus/smashing-links.gif" alt="Tabbing over links in the red background on Smashing Mag."></figure>

The dark-red outline failed to catch my attention when I tabbed through a button on a red background. The `color` change from blue to red wasn't enough to draw my attention. 

Deep in my mind, I might have expected a change in the button's `background-color`. Regardless of my expectations, I failed to realize when the button got focus. 

<figure role="figure"><img src="/images/2019/focus/smashing-button.gif" alt="Tabbing over buttons in the red background on Smashing Mag."></figure>

### Twitter

Twitter used a combination of styles for focus. They used: 

1. The default focus ring for most elements
2. An underline (no focus ring) for text links 
3. Background and outline changes for buttons

<figure role="figure"><img src="/images/2019/focus/twitter.gif" alt="Tabbing through a Twitter card."></figure>

Here's what I think. 

1. The default focus ring does not have enough contrast 
2. Underlined links (without focus ring) doesn't catch my attention. I had to search for what I focused on. 
3. I love the focus styles for the buttons. The slight difference in background colors gave each action distinct personalities. 

On the sidebar, Twitter highlighted each menu item with a bright border (I suspect with `outline`) and a change in `background-color`. These changes were visible and held my attention. 

However, the focus style on the Tweet button wasn't as obvious since the outline was light. It does not have enough contrast when compared to the button's bright `background-color`. 

<figure role="figure"><img src="/images/2019/focus/twitter-sidebar.gif" alt="Tabbing through the sidebar on Twitter."></figure>

### Slack

Slack's focus looks good. They introduced a (tiny) dark-blue border plus a (larger) light-blue tint around their focused elements. 

I liked how the dark-blue border stood out from other elements. I also liked how the light-blue tint allowed the dark-blue border to blend in with other elements on the same page. 

(Although I used the word "border" here, I suspect this is created with `box-shadow`). 

<figure role="figure"><img src="/images/2019/focus/slack.gif" alt="Tabbing through a Slack message."></figure>

Slack used the same styles on the sidebar, but they used white instead. This stuff works for both dark and light backgrounds! 

<figure role="figure"><img src="/images/2019/focus/slack-sidebar.gif" alt="Tabbing through the sidebar in Slack."></figure>

### WTF Forms

Chris Coyier pointed to [WTF Forms][1] by [Mark Otto][2] during my research. The focus ring for WTF Forms looks pretty good! It contains two parts: 

1. A white border 
2. And a solid blue border 

(Again, even though I used the word "border", this is actually created with `box-shadow`).  

<figure role="figure"><img src="/images/2019/focus/wtf-forms.gif" alt="Tabbing through elements on WTF Forms."></figure>

### My own site

No research is complete without checking whether I failed or succeeded at creating focus styles. (Bad habit). 

Turns out, I did not create enough focus for the links on my own site. The color change was not enough to catch my attention immediately. It would have been sufficient if I added the focus ring though! 

<figure role="figure"><img src="/images/2019/focus/zellwk.gif" alt="Tabbing through links on my site."></figure>

However, I did good work for the navigation. The pink border and animation made the focused element pop. 🎉. 

<figure role="figure"><img src="/images/2019/focus/zell-nav.gif" alt="Tabbing through my nav."></figure>

## What I learned

**The default focus ring works.** There are problems with it, but it can be good enough, especially **if you can't dedicate time and energy to create a custom focus ring**. (This can be quite easy. I'll show you how in the [next article][3]). 

If you want to design your own focus style, you need to **think about four variables.** The presence of each variable helps your focus stand out more. I ranked these variables **in the order of importance.** 

1. Creating an outline (with outline, box-shadow, borders, etc). 
2. Animations with movement (if any) 
3. Changing the background color (if any) 
4. Changing the color of the text (if any)

Outlines are best because they create the most amount of contrast. 

Animations come next because our eyes get drawn to moving objects. 

Changes in `background-color` can sometimes be sufficient. This is because the change happens in a relatively large surface area. 

Finally, you want to consider changing `color`. Use `color` with the three other things I mentioned above. Try to avoid using `color` by itself because contrast might not be enough to draw a keyboard user's attention. 

[1]:	http://wtfforms.com/
[2]:	https://twitter.com/mdo/
[3]:	/blog/creating-focus-style "Creating a custom focus style"