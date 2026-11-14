---
title: The best font-loading strategies and how to execute them
---

Zach Leatherman wrote up a [comprehensive list of font loading strategies](https://www.zachleat.com/web/comprehensive-webfonts/) that have been widely shared in the web development field.

I took a look at this list before, but I got so scared (and confused), that I decided NOT to do anything at all. I don't know how to begin loading fonts the best way and I don't want to feel like an idiot going through this list.

I gave myself some time to [sit down and figure it out](https://zellwk.com/blog/figure-it-out/). In this article, I want to share with you the best loading strategies and how to execute all of them.

[Click here to read the article!](https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them).

## Quick Summary

If you use a cloud-hosted provider:

- Use \`font-display: swap\` if the host provides it.
- Otherwise, use FOUT with class

If you host your web fonts, you have a few choices:

1. \`@font-face\` + \`font-display: swap\`
2. FOUT with Class
3. Standard FOFT
4. Critical FOFT

Here's how to choose between them:

- Choose \`@font-face\` + \`font-display: swap\` if you're starting out and don't want to mess with JavaScript. It's the simplest of them all. Also choose this option if you use only few font files (less than 2 files) for each typeface.
- Choose Standard FOFT if you're ready to use JavaScript, but don't want to do the extra work of subsetting the roman font.
- Choose a Critical FOFT variant if you want to go all the way for performance.

Here's a [Twitter thread](https://twitter.com/zellwk/status/1367050022492241921?s=20) that contains a summary too — but with more explanations.

Finally, [here's the full article again](https://css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them).

I hope you enjoy this deep dive!
