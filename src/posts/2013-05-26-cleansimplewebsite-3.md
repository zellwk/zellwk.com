---
title: Creating a clean and simple website (Part 3 - Style the content and 6 items to take note)
layout: post
slug: creating-a-clean-and-simple-website-part-3-style-the-content-and-6-items-to-take-note
tags:
 - css
 - design
newsletter: better-fed
---

Now that you've managed to create the layout and header sections, its time to move into the meat of the series. In this article, I'll discuss how I styled the content section on my blog and also mention various elements that are easily overlooked by first time designers. If you're working on your own blog, this would be a great post to pick up important design considerations and to see if you missed anything out.

<!--more-->

Note: This is the third article of the series on creating a clean and simple website. If you're new here, you might want to check out [Part 1 on creating the HTML][1] and [Part 2 on styling the header section][2] first.

Okay lets begin!

## Let me give you a heads up on the 6 items you need to take note of

1. Text.
2. Font styles (think about bold and italic text)
3. Links
4. Images, videos, audio
5. Lists
6. Blockquotes

All of the above items are extremely important and could break a blog post if they are not properly styled. (Honestly, I forgot to style **`<strong>`** and *`<em>`* tags and discovered that none of my text were bold when I used them. Not fun, and I don't think you'll want that to happen to you.)

## 1. Text
There are very many factors when it comes to choosing the text that you use in your website. The most common problem of them all is probably "how to choose a typeface", and its a whole discipline by itself and is way out of scope in this article.

**No matter which typeface you have chosen, the same steps are involved in making sure your article is easy to read. **

1. Choose the text size

  The default font size on modern browsers today is 16px. I recommend choosing a font size slightly larger than 16px because it aids legibility. It is up to you to choose. I personally like 18px or 20px for my own designs.

2. Select a comfortable leading (Line-height in css)

  Leading refers to the amount of space inbetween each line of text. The general convention is to use a multiple between 1.2 to 1.5. The larger the width of your text (also called measure), the larger your leading should be.

3. Create a vertical rhythm

  Vertical rhythm is a big term. Simply put, it means to create visual consistency, and that would allow user's eyes to be able to follow your text without the need to concentrate. Basically, its just a fancy pants term that says **"create margins or paddings that are a multiple of the line height"**

I'll post my take on the vertical rhythm in the next blog post. If you are interested in knowing what it is in the meantime, do check out these two awesome articles on vertical rhythm.

+ [Compose a Vertical Rhythm][3] on 24ways
+ [4 Simple Steps to Vertical Rhythm][4] on the typecast blog

## 2. Font Style and Font Weight

Closely linked with text are font styles and weights. I mentioned earlier that I totally missed these two things and had wondered why my text couldn't be **bolded** nor *italicised*. This was simply because I didn't remember to style the `strong` and `em` tags.

Here are the codes you'll need.

    strong { font-weight: bold;  }
    em     { font-style: italic; }

## 3. Links

Links have **5 different states** to be styled. We touched on this a little while styling the navigation last session.

1. Link - appearance of links
2. Visited - appearance of visited links
3. Hover - appearance of links when the mouse lands on it
4. Focus - appearance of links when it is tabbed to
5. Active - appearance of links when it is clicked on

Of the 5 states, I believe only the active state is not essential. I will style the rest of the states to make sure its consistent with my design.

**Note: you have to style them in the order stated above. Expect hiccups otherwise**

An acronym to remember these link states goes by **L**o**V**e **HA**te. Oh the irony.

Focus is not included in the acronym. As a rule of thumb, whenever you use hover, use the same style for focus.

    a {
        color: #ce6f20;
    }

    a:visited {
        color: #ce6f20;
        /* Visited color set to the color as a link because I wanted them to look the same */
    }
    a:hover,
    a:focus {
        color: #45433f;
        text-decoration: underline;
    }

## 4. Images

Images are styled in a different way that you might expect in content management systems such as wordpress. When inserting images, you are given the opportunity to select the alignment of your image. There are 4 choices: "none", "align left", "center" or "align right".

What these choices does is that it adds the specifc class to your image.

**The image is automatically given an alignleft class if you chose to align it to the left.** This is what happens for the other alignment options as well.

To style images, it is important to style all the possible align ment styles.

    img,
    a img{
        max-width: 100%;
        height: auto;
    }

    .alignnone,
    a img.alignnone {
        display: inline;
        margin: 0 27px 27px;
    }

    .aligncenter,
    a img.aligncenter  {
        display: block;
        margin: 0 auto 27px;
    }

    .alignright,
    a img.alignright {
        float: right;
        margin: 0 0 27px 27px;
    }

    .alignleft,
    img.alignleft {
        float: left;
        margin: 0 27px 27px 0;
    }

    /* Wordpress automatically wraps the image in a paragraph, hence margin-bottom: 0; removes the margin that we have previously set in the images above. */
    #content p > img {
        margin-bottom: 0;
    }

## 5. Lists

List posts anyone? Nah, these lists are not for list posts. **Lists make up bullet points, and you would have encountered a few of my own above. **

Lists are important because people use them. I was using a wordpress backend coded by an outsourced company in my current work and felt totally horrible when I had to use lists in my presentation, simply because the lists are not styled.

Note that some CSS resets remove all list styles. Check your CSS reset and see if they do so and enable the styles, at least for the content portion.

Here's what I did for mine:

    .entry ul {
      list-style: disc;
    }
    .entry ol {
      list-style: decimal;
    }

    /* pads the ul or ol to the right and ensures there is a margin at the bottom  */
    .entry ul, .entry ol {
      padding-left: 27px;
      margin-left: 27px;
      margin-bottom: 27px;
    }

## 6. Blockquotes

Blockquotes are not exceptionally important for some, but are crucial for others. I leave you to see if they are important for you.

    blockquote {
      padding: 14px 27px 14px 27px;
      margin-bottom: 27px;
    }

    blockquote p {
      display: inline;
    }

    /* This is the part to cite the author of the quote */
    blockquote cite {
      text-align: right;
      display: block;
    }
    blockquote cite::before {
      content: "– ";
    }

## Conclusion

This is the end of the 3 part series on creating a website. I think I might have loaded the posts with a little too much information if you're just starting, but I hope it was informational enough for you to make sense of everything.

The CSS I showed you is nowhere perfect. There are very many flaws within the codes. What is more important to get out of these posts is practice. The more you practice, the more you will get the hang of using CSS.

**Have fun coding! And do share with me your creations, I'm interested! :) **

[1]:  https://zellwk.com/blog/creating-a-clean-and-simple-website-part-1-html/ "Creating a clean and simple website - Write the HTML"
[2]:  https://zellwk.com/blog/creating-a-clean-and-simple-website-part-2-styling-the-header/ "Creating a clean and simple website - Style the header"
[3]:  http://24ways.org/2006/compose-to-a-vertical-rhythm/
[4]:  http://typecast.com/blog/4-simple-steps-to-vertical-rhythm
