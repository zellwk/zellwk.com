---
title: Copying properties from one object to another (including Getters and Setters)
---

`Object.assign` is the standard way to copy properties from one object to another. It is often used for copying properties that are one-layer deep. (One-layer deep means there are no nested objects).

Unfortunately, `Object.assign` doesn't copy accessors. (Accessor is a term for Getter and Setter functions). `Object.assign` reads the value of a Getter function and copies that value instead.

Today, I want to share how to copy an accessor over to another object. I'll also share a library I created to make this easy.

[Here's the article again](https://zellwk.com/blog/copy-properties-of-one-object-to-another-object). Enjoy!
