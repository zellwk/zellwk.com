---
title: Easier way to use Facebook Pixel and Conversion API.
---

I hope you’ve been well.

This week was a mess for me. I attended my master’s father’s funeral and I realized that I have not completely grieved for my grandfather’s passing a few years ago. So my emotions got affected quite a bit.

I’m a little better today now — and therefore I have enough space to finish this email and send it out to you.

## Analytics and Ads

True to my word, I spent the last two weeks diving into analytics and advertisements — mostly the tracking part of it.

I decided to use the following:

1. Use Posthog for analytics
2. Use Facebook for advertisements

I’m using Posthog because it gives you 1 million events for free — and I can extend it from basic analytics to include other cool features like feature flags and A/B testing in the future, which paves the way for things I wanted to try.

And I decided on Facebook as an advertisement channel because I’ve heard some good things about it, so it’s time to try it out for myself.

My setup is pretty simple. I’m only tracking 4 events:

1. Pageview
2. Signup
3. Begin Checkout
4. Purchase

This is good enough to start.

## An easy way to implement conversion tracking for Facebook

If you research into tracking the effectiveness of Facebook ads, you’ll probably run into these two terms:

- Facebook Pixel
- Conversion API

Facebook Pixel is a tracking script placed on the browser (kinda like a Google analytics script).

Conversion API, on the other hand, is you sending a POST request to Facebook from your server. This POST request should contain the same data as that in the Facebook Pixel.

The reason you have to do this (sending the same data) is because **many browsers have started blocking tracking scripts**. So if you only use the Pixel, you will have very inaccurate data.

This also means you need to supplement the the Pixel data with a source that doesn’t get interrupted by adblockers and privacy blockers, hence **Conversion API is a necessity** if you want accurate data (even though they made it sound optional) .

This should clarify things up a little for you if you’re confused about these terms.

Moving on, **I created a library** that allows me to send both Pixel and Conversion API events at the same time.

So…

- I can get accurate tracking with just **one line of code**.
- I don’t have to write Pixel and Conversion API events separately.
- Pixel and Conversion API events are deduplicated automatically.
- I don’t have to worry about the different parameters for Pixel and Conversion API (which turns out, is very different).
- I don’t have to remember to hash user-related values because my library hashes them automatically.
- I don’t have to pay extra for server-side hosting of this script, which can get ridiculously expensive.
- And I may be able to enhance this script to include Twitter (or X), Google, or other platforms down the road, since tracking stuff is pretty similar across the board.

### Why not use Google Tag Manager?

Good question.

I tried out Google Tag Manager last year when setting up tracking scripts. At first, I thought it was wonderful since it promised to unify all tracking scripts under it.

But I found the implementation lackluster.

(Coincidentally, I find myself losing faith in most marketing-related statements since lots of them are hype-related…)

**The problem is Google Tag Manager is a browser-only script**. This meant you will miss out on many events since ad-blockers and privacy blockers are so prevalent nowadays.

To make it worse, Google Tag Manager is so popular and well-known, you can be sure that it will be blocked. So you’ll definitely receive inaccurate data.

**Second problem: You can provision a Google Tag Manager server instance, but it costs at least $120/month**, which is insane! There are lower-cost alternatives (like [Stape](https://stape.io)), but it can still cost quite a bit.

**With my solution, I don’t have to pay extra**! I can just spin up another server (if I want to) on my Digital Ocean instance and viola, I got my tracking script!

Now I’m a happy man who can finally begin to test Facebook ads, knowing I’m getting accurate data.

### Want the code?

I’m really excited to share this library with you because I think it is wonderful.

If you feel that Facebook Ads might become a channel for your business (or a business you support), then this Pixel + Conversion API Helper script may help you out a ton.

To summarize, here are a few things this helper library does for you:

1. Initialize Facebook Pixel and Conversion API
2. Test Facebook Pixel and Conversion API on localhost
3. Send events to both Pixel and Conversion API at the same time with just one line of code.
4. Events are automatically deduplicated
5. It organizes your parameters to correctly pass data to both Pixel and Conversion API without extra work.
6. It hashes sensitive information automatically.
7. Use your own server - no need to pay extra for tracking script hosting.

So your code only looks like this:

Finally — there’s an easy way to track Facebook ads.

I’m now super excited to test out this channel! I hope it works wonders for my business!

If you want the code, I’m happy to share it with you for $49. One time fee.

[Just click here to purchase](https://store.zellwk.com/fb-pixel-capi/).

I’ll write a documentation about it within the next two weeks or so.

## Featured Song: Keep a dream in your pocket

I’m deeply in touch with my dreams these two weeks thanks to my master [Kelvin Lim](https://liveyourmark.com/our-trainers/kelvin-lim/) and his friend [Richard Quinn](https://www.richardquinn.org/#intro).

Here’s [a song](https://youtu.be/ANWmPWzv_Sg?si=a8_Ysj-YD9K5ASQo) related to dreams that I’ve been listening to. Hope you keep a dream in your pocket too — and you never let that fade away.
