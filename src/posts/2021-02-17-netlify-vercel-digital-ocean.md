---
layout: post
title: Choosing between Netlify, Vercel and Digital Ocean
slug: netlify-vercel-digital-ocean
tags:
  - Serverless
  - Servers
---

A while back, I jumped onto the hype train and tried to host [Learn JavaScript's marketing page](https://learnjavascript.today) on Netlify — I wanted to join the cool kids. After getting charged for it, I switched to Vercel and I got charged for it (again). I finally went back to good old Digital Ocean.

In this article I want to detail the differences between hosting on Netlify, Vercel, and Digital Ocean, along with what I experienced in the process.

<!-- more -->

## What is Netlify, Vercel, and Digital Ocean?

[Netlify](https://www.netlify.com) and [Vercel](https://vercel.com) are serverless platforms. They let you put websites up onto the web without having to fiddle with servers. You can read more about [serverless](https://serverless.css-tricks.com) if you're curious about what it is.

Vercel and Netlify have practically no differences between them (as far as I can tell). They're just competitors providing the same thing.

[Digital Ocean](https://m.do.co/c/64daa7a7a455) is a dedicated server. It's harder to set up a site with Digital Ocean compared to Vercel/Netlify since you need more knowledge about Linux and Nginx.

## Choosing between these platforms

There are two main factors to consider when choosing between these platforms:

- Ease of use
- Pricing.

## Ease of Use

Vercel and Netlify are easier for frontend-only projects. You can link to a Github repository and you'll have your website up and ready.

If you need server functionality, you can still use serverless functions via Netlify and Vercel. You have to learn how serverless functions work, but they're still pretty simple compared to Digital Ocean.

Digital Ocean lets you set up a server. It's harder to use because you need to know:

- A server language (Node, PHP, Ruby, Python, etc)
- A bit of Linux (Operating system)
- A bit of Nginx (Server language)
- How to setup HTTPS

Although Digital Ocean is harder to set up, the rewards can be worth it. (See the pricing section below).

## Pricing

### Netlify Pricing

Netlify prices according to the amount of bandwidth you use. For example, you get 100GB for free with Netlify.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/netlify-pricing.png" alt="netlify pricing">
</figure>

100GB seems like a lot, doesn't it?

I thought so too, so I put the [Learn JavaScript's marketing](https://learnjavascript.today) site onto Netlify for a test run. This site averaged 5,101 visitors in the month I did the test.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/website-visitor-chart.png" alt="website visitor chart">
</figure>

About a week (or maybe two) later, I suddenly received a $20 bill for exceeding the bandwidth. Another week (or two) later, I got a second $20 bill.

So 100GB is very little after all, since 200 GB only supports approximately 2,700 visitors.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/netlify-bill.png" alt="netlify bill">
</figure>

I pulled the plug on Netlify at this point, as I'm paying too much for it. I only pay \$10 on Digital Ocean for way more visitors!

### Vercel Pricing

Vercel seems to be free forever at first glance. There aren't any limits shown on the pricing page.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/vercel-pricing.png" alt="vercel pricing">
</figure>

I was skeptical — it seemed too good to be true. But I took my chances and hosted Learn JavaScript's marketing site on Vercel after Netlify.

Some time later, I received an email saying I breached the fair use policy.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/vercel-email-fair-usage.png" alt="vercel email fair usage">
</figure>

I was shocked — I breached a policy?! I always try to abide by the rules and act in good faith. Being told I breached feels VERY uncomfortable.

After asking further, I discovered that Vercel's free tier has a cap at 100GB Bandwidth too. This information is hidden inside a Fair-Use Policy page (not on the pricing page).

At this point, I gave up on serverless architecture completely and went back to good old Digital Ocean.

UPDATE: Vercel has now updated their pricing pages to be more transparent — the 100GB limit is now listed. Thank you Steven for letting me know.

### Digital Ocean Pricing

Digital Ocean's pricing seems complicated at first glance because there are many factors involved.

<figure role="figure">
  <img src="/images/2021/netlify-vercel-and-digital-ocean/digital-ocean-pricing.png" alt="digital ocean pricing">
</figure>

But it isn't.

For Digital Ocean, you can imagine you're renting a computer and the factors stated are the specs of each computer.

You don't need a super fast computer for servers. The $5 or $10 plan is going to be good enough most of the time.

For example, I'm running the following two sites on one \$10 plan, and I don't see any problems with it so far.

- This website — 103,112 visitors per month
- Learn JavaScript's marketing site — 5,101 visitors per month

I don't know how much bandwidth I'm using, but that doesn't matter since Digital Ocean doesn't charge according to bandwidth.

## Verdict

If you have a small project: Go with netlify.

If you have a larger project: Use Digital Ocean.

I wouldn't choose Vercel anymore because of that dark pattern pricing strategy.

By the way, [Use this link to get a free \$100 credit](https://m.do.co/c/64daa7a7a455) if you want to try out Digital Ocean. Happy server(less)-ing!

## Update

Jason Lengstorf reached out to me and mentioned he only used 7GB for 32,000 visitors on [learnwithjason](https://www.learnwithjason.dev). We talked a little and we suspect the high amount of bandwidth usage is due to two things:

1. [Learn JavaScript](https://learnjavascript.today) is an extremely asset-heavy site. The main cause may be GIFs on the home page.
2. I didn't include lazy-loading on the site yet — so this causes unnecessary downloads for people who haven't scrolled down yet.

I'm willing to give Netlify another try now, but I'm still frustrated about the lack of transparency in "bandwidth" and how I wasn't able to debug it on a per page or per resource basis. Jason said he'll raise it internally with the team so that really helps!

I look forward to trying out Netlify again when there's more transparency with bandwidth.
