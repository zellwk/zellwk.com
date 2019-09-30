---
layout: post
title: A new (and easy) way to hide content accessibly
description: Possibly the best way to hide content accessibly. The CSS is easy to write and understand!
slug: hide-content-accessibly
tags:
  - css
  - accessibility
---

When I want to hide content accessibly, I always turn to [Jonathan Snook's snippet][1].

```css
.element-invisible {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}
```

But yesterday, I happened to chance upon Scott O'Hara's [article on hiding content][2]. Scott says we only want to hide content in three different contexts:

1. Hide it completely
2. Hide it visually
3. Hide it from screen readers

<!-- more -->

When we say hide content accessibly, we effectively mean option #2 (hiding content visually, but not from screen readers and keyboard users).

## Then I had an idea

If we only want to hide elements visually, why don't we use `opacity: 0`? Opacity is used to hide elements visually anyway. Content hidden with `opacity: 0` is still accessible to screen readers.

```css
.hide-accessibly {
  opacity: 0;
}
```

I took it up a notch by adding `position: absolute`. This takes the element away from the document flow; and allows us to style other elements as if the hidden content isn't there.

```css
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
}
```

I thought this felt good enough, and I asked Jonathan about it.

Here's what he responded with:

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">While it pulls it out of flow, it can obscure clickable items. You could add `pointer-events: none;` to it. I don&#39;t know how screenreaders behave with pointer-events turned off; I haven&#39;t tested it. <a href="https://t.co/fa8qHvfWic">https://t.co/fa8qHvfWic</a></p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120809900878307328?ref_src=twsrc%5Etfw">April 23, 2019</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

He also wondered if `pointer-events: none` would stop keyboard-trigged click events (which are absolutely essential for screen readers and keyboard users).

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Pointer events shouldn’t obscure because any click/touch events pass through. Although, actually, unsure if that breaks keyboard-triggered clock events. 🤔</p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120844382754754562?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

I was curious, so I tested `pointer-events: none` and discovered it works with keyboard-generated clicks, screen-reader-generated clicks, and JavaScript generated clicks.

Here's the Codepen I used for my test:

<p class="codepen" data-height="450" data-theme-id="0" data-default-tab="html,result" data-user="zellwk" data-slug-hash="mgzPXa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Pointer-events test">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/mgzPXa/">
  Pointer-events test</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

I reported my findings back to Jonathan and he said we might have a winner!

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Sounds like we might have a winner then!</p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1120862948866633728?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

## The snippet

Here's the snippet if you want to use this method.

```css
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
  pointer-events: none;
}
```

**DISCLAIMER:** This method is still incredibly new. I've only tested it on the latest versions of Firefox, Safari, and Chrome. I wasn't able to run a test on Edge and other browsers yet.

If you're an accessibility consultant, I'd greatly appreciate it if help me take this snippet out for a spin.

For the rest: I don't recommend using this snippet in production yet. (Not until I get confirmation from accessibility experts).

**UPDATE**: Many developers voiced their opinions, concerns, and experiments over at Twitter. I wanted to share with you what I consolidated and learned.

At the start, all three properties were debated upon.

First, let's talk about `opacity`.

## The problem with opacity?

Patrick and Vadim were concerned about `opacity` because it seemed to break in some browser/screen reader combination.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">don&#39;t have test results to hand/time to test just now, but in short: yes, in at least some browser/screen reader combination, opacity below a certain value results in content not being announced. suggest sticking with tried and tested (albeit a bit lengthy looking) sr-only styles</p>&mdash; patrick h. lauke (@patrick_h_lauke) <a href="https://twitter.com/patrick_h_lauke/status/1120955137491705856?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

But Jonathan found some research that suggests that `opacity` is okay. Patrick further did some tests and agreed that `opacity` is okay.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">embarassing, but i stand corrected. it appears the half-remembered fact about opacity not working was, in essence, for the opposites case (problems with sites using it thinking it hides it from AT, but it not doing it).<br><br>just opacity itself seems to be ignored by AT 1/</p>&mdash; patrick h. lauke (@patrick_h_lauke) <a href="https://twitter.com/patrick_h_lauke/status/1121000192080273409?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

Scott O'Hara also chimed in on the original problem with `opacity`

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">ChromeVox used to completely ignore opacity: 0; essentially treated it the same as display: none.<br><br>that was a few years back with the browser extension version. Would need an actual chromebook to test if that&#39;s still an issue with the modern build.</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121045899982012416?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

The verdict at this point:

1. Opacity seems to be screen-reader friendly!
2. But it might not work on ChromeVox now. More tests are required to validate this.

Next, let's talk about `pointer-events` because it's the second most-troublesome thing.

## Pointer-events

Scott O'Hara pointed out that iOS Voiceover users wouldn't be able to trigger a click if an element had `pointer-events: none`. I tested what Scott said and found it to be true.

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Definitely a contextually appropriate solution to hide static text content. But this should be noted as not recommended for visually hiding interactive elements. For instance IOS VoiceOver will not be able to activate a pointer-events none button.</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1120909503585767424?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

This means we can't use the `pointer-events` universally on all elements.

My next question was: If we can't use `pointer-events`, what if we set `z-index` to `-999`? This would prevent the hidden element from obscuring clickable elements.

```css
.hide-accessibly {
  position: absolute !important;
  opacity: 0;
  z-index: -999;
}
```

Well, Scott said we shouldn't use `z-index: -999` on buttons as well, because visually hidden buttons wouldn't work correctly on iOS Voiceover.

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">it should not be used on buttons, as visually hidden buttons also won&#39;t work correctly with iOS VO. It also has the potential to trigger desktop VoiceOver&#39;s reading out of order, as <a href="https://twitter.com/letrastudio?ref_src=twsrc%5Etfw">@letrastudio</a> mentioned, depending on real world styling of the interactive element it&#39;s used w/in</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121016947251064832?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

I'll be honest. I don't understand why `z-index: -999` wouldn't work correctly with iOS Voiceover, so I don't have a proper conclusion here. I didn't test it.

## MacOS Voiceover reading content out of source order

Scott and João Beleza Freire (@letrastudio mentioned above) pointed out a noteworthy bug where macOS Voiceover read content out of source-order.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Even for static text, VoiceOver can sometimes read hidden content out of order (it tries to follow visual order instead of source order). And sadly this solution isn&#39;t impervious to that issue. Here&#39;s a test: <a href="https://t.co/sRfZNcmE7r">https://t.co/sRfZNcmE7r</a></p>&mdash; Letra Studio (@letrastudio) <a href="https://twitter.com/letrastudio/status/1120970115628130304?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I did my own test on this, but the bug Joao reported doesn't seem to happen on my computer, even though we used the same device!

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">Huh, that’s weird. I’ve done some more tests, macOS 10.14.4:<br><br>- Latest Safari and Chrome act the same: fail example 1, correct on 2<br>- Firefox reads 1 correctly and fails on 2!<br>- Safari Tech Preview reads both correctly<br><br>That’s what I call *finicky*</p>&mdash; Letra Studio (@letrastudio) <a href="https://twitter.com/letrastudio/status/1120980475307274240?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Scott O'Hara shared a little more info on when this bug occurs:

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">it&#39;s definitely still a bug, as Letra mentioned.<br><br>It only occurs if you place position absolute content (visually hidden) within focusable elements. <br><br>Spent way too long trying to tackle that when Joe reported it. His last workaround ended up being the best.</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121005390412562432?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It turns out, a bunch of experts (including Scott) were already going back-and-forth about this macOS Voiceover bug since 2017. It's worth reading through the entire [issue thread][3] about the problem.

From what I've read, it seems like the problem happens when `position: absolute` is used. When you use `position: absolute` and you mess around with the CSS positing, it messes with the position of the Voiceover focus-ring, which changes the reading order.

<figure><img src="/images/2019/hide-content-accessibly/focus-ring.png" alt="An image detailing the experiments done by Joe Watkin on how CSS affects focus rings"></figure>

This means ANY solution that there's a chance that macOS Voiceover screws ANY solution that contains `position: absolute`.

😱

And this whole issue is only Voiceover related. We haven't considered how `position: absolute` can make it weird for other screen readers.

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">and that was all just VoiceOver related. nothing in there about how position: absolute can make for awkward announcements when used within interactive elements with PC screen readers...<br><br>moral of all of this, there is presently no silver bullet to be found here.</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121053472105934849?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## The solution in HTML Boilerplate

Some folks have suggested they use the `sr-only` snippet from HTML5 Boilerplate. They felt it's the best method out there because many experts came together to create this.

```css
.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  /* 1 */
}
```

However, this is the same solution that triggered the [issue thread][4] I mentioned above! Experts, like Scott O'Hara, have been working on this since 2017 and there doesn't seem like THE solution to date.

The best solution so far was suggested by Joe Watkin:

```css
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto; /* new - was 1px */
    margin: 0; /* new - was -1px */
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap; /* 1 */
}
```

At the time of writing, this solution has not been integrated into HTML5 Boilerplate officially. Do take note.

Again, it's worth going through the [conversations in the issue thread][5] if you nerd out in this field. It's priceless. (As an aside, I learned that `aria-label` is [ignored by Google's and Microsoft's translators][6]! 😱).

Update: Aswin notified me that `clip` [is deprecated][7]. We should use `clip-path` instead.  I haven't tested `clip-path` in production yet though. 

## Concluding words

**While Joe Watkin's solution seems to be the best so far, the real answer is it depends.** Each method we discussed above, in [Jonathan's article][8], and elsewhere on the internet has their pros and cons.

Like Scott mentioned, it's almost like a situation where you can choose between grid vs flex vs other layout methods. You have to pick the best method depending on the situation (and your knowledge of the weird quirks).

<blockquote class="twitter-tweet" data-conversation="none" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">I look at it like float vs inline-block vs column-count vs flexbox vs grid vs positioning for layout purposes.<br><br>or display none, visibility hidden, inert, aria-hidden=true, role=presentation, and the hidden attribute for fully hiding content<br><br>they are all contextually appropriate</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121056096356007937?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote>

**There's one thing we can do to further clarify things.** And that's to compile the pros and cons of each solution we know so far.

<blockquote class="twitter-tweet" data-dnt="true" data-theme="light"><p lang="en" dir="ltr">that&#39;s what i tried to do at a high level in my post about this, while leaving out a lot of the techniques that i knew had problems.<br><br>though per all this, seems there&#39;s a need to go deeper and call out the various pros/cons.</p>&mdash; Scott O&#39;Hara (@scottohara) <a href="https://twitter.com/scottohara/status/1121067322477817856?ref_src=twsrc%5Etfw">April 24, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Unfortunately, this is something that's way out of my league right now. If you'd like to step up and participate in the conversation, I'm sure Jonathan, Scott, and many others would love to chat!


[1]:	https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
[2]:	https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
[3]:	https://github.com/h5bp/main.css/issues/12
[4]:	https://github.com/h5bp/main.css/issues/12
[5]:	https://github.com/h5bp/main.css/issues/12
[6]:	https://github.com/h5bp/main.css/issues/12#issuecomment-392156112
[7]:	https://developer.mozilla.org/en-US/docs/Web/CSS/clip "Clip"
[8]:	https://snook.ca/archives/html_and_css/hiding-content-for-accessibility