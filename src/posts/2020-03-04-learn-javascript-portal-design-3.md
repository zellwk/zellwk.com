---
layout: post
title: Designing Learn JavaScript's course portal (Part 3)
description: This is the third article where I explain how I designed Learn JavaScript's course portal.
slug: learn-javascript-portal-design-3
tags:
  - design
series: learnjavascript-portal-design
---

This is the third article in the Learn JavaScript design series. Today, I'll talk about how I built the Account and Component Page.

<!-- more -->

## Account page

I gave each student a default password. I want to let them change their password, so I created the Account page.

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/account-page.png" alt="The account page.">
</figure>

There's only one important activity here: The changing of passwords.

You need three fields to change passwords:

1. The old password
2. The new password
3. Confirmation for the new password

We can put the fields in a single column.

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/change-password-1.png" alt="Password fields in a single column.">
</figure>

This works on mobile, but it looks weird on desktop; there's too much whitespace on the right.

I tried to reduce the awkwardness by reducing the whitespace. I did this by creating a two-column grid in the form. Labels on the left, fields on the right.

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/change-password-2.png" alt="Labes on the left, fields on the right.">
</figure>

It looks much better than before, but there's still room for improvement.

Here each label looks disjointed from their respective fields. This happens because the whitespace between labels and fields are quite large.

According to proximity rule, related fields should be close to each other. The easiest way to do this is to right-align the labels.

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/change-password-3.png" alt="Aligned labels to the right.">
</figure>

This looks better, but it's still weird. Why? It looks weird because the button is full-width. It's not aligned to anything (on the left edge).

Since a "button" is kinda like a "field", we can align it like a field.

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/change-password-done.png" alt="Aligned buttons to the right.">
</figure>

This looks better since the entire form looks well aligned.

## Components page

There are 20 components in Learn JavaScript. Students progress through the course like this:

1. Learn concepts
2. Build simple components
3. Learn more complicated concepts
4. Improve the things they built (plus build more things)

This means a single component can be separated into different modules. For example, the simplest component, an off-canvas menu, is separated into 4 modules.

1. Module 3: Building simple components
2. Module 7: Animations
3. Module 15: Keyboard
4. Module 16: Accessibility

Students may want to go through the lessons for one component in sequence, so I created a Components page.

I could build this page like the Content page (with a list), but it's not enough. Each lesson comes with starter files and source code. I want to allow students to download these files easily too.

So I chose to go with a table instead. Here's what it looks like:

<figure role="figure">
  <img src="/images/2020/ljs-portal-3/components-table.png" alt="Example of a table of lessons for each component. It contains three columns: Lesson, starter files, source code. ">
</figure>

That's it!

## Ending thoughts

I hope this series helped you learn to think more about design.

I hesitate to write this series because I feel my design skills still not refined. I feel that there are things I can improve in, but I'm not sure what.

I'm always on the lookout to improve my design skills though. Please let me know if you have any thoughts or suggestions!
