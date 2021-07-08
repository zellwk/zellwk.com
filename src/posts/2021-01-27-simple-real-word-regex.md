---
layout: post
title: How to write super simple and useful regular expressions for the real world
description:
slug: simple-real-world-regex
tags:
  - javascript
  - regex
---

Regular expressions are HARD! They look so complicated, they're turn me off completely most of the time. Sometimes I wished I was smarter so I can use them more effectively.

While working on Learn JavaScript, I noticed that using regular expressions effectively doesn't mean you need to write complicated regex. You can write super simple regex that solves a ton of problems.

I'm going to show you a real example.

<!-- more -->

## Best place to learn regular expressions

The best place to learn regular expressions is [regexone.com](https://regexone.com). It gives you step-by-step challenges to work through, which helps to build your regex vocabulary. It also has a handy cheatsheet that I always refer back to when I need some regex help.

<figure role="figure">
  <img src="/images/2021/real-world-regex/regex-cheatsheet.png" alt="">
</figure>

Now onward to the real-life example.

## The example

In [Learn JavaScript](https://learnjavascript.today), I decided to teach students how to use a framework by building one together with them. This approach kills two birds with one stone:

1. They get to see how to use frameworks, which eases them into React/Vue and other frameworks they may want to learn.
2. They get to see how Vanilla JavaScript can be used to build something complex, which bolsters their confidence with JavaScript.

I decided to call this framework `Tiny` since it's a small framework that's not meant for production-use. There are many lessons you need to know — and one of them is a tiny bit of knowledge regarding regular expressions.

If you're curious, here's a draft of table of contents for this framework part.

<figure role="figure">
  <img src="/images/2021/real-world-regex/table-of-contents.png" alt="">
</figure>

Now on to the part where I needed regular expressions.

## Extracting patterns from a string

When building Tiny, we added properties into children components via props. Since I wanted to keep things simple, we added all props into a `tiny-props` HTML attribute.

Here's an example of such an attribute.

```html
<div tiny-props="[count, state.count]">...</div>
```

The child component should then get a `count` property which corresponds to the value written inside the parent's `state.count` property.

The challenge here is to extract `count` and `state.count` separately, so we can assign appropriate values.

This is simple if we only have one set of props.

- We can `replace`[` and `]` with empty strings
- Then we split the string at `,`
- Then we trim any unnecessary whitespace.

```javascript
const attribute = div.getAttribute('tiny-props')
const props = attribute
  .replace('[', '')
  .replace(']', '')
  .split(',')
  .map(part => part.trim())

console.log(props)
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/props.png" alt="">
</figure>

The problem becomes slightly more complicated when we need to pass multiple props. In this case, I chose to separate each prop-value pair with square brackets.

```html
<div tiny-props="[count, state.count] [message, state.message]">...</div>
```

We cannot same `replace` code above for this new string. You'll get weird results.

<figure role="figure">
  <img src="/images/2021/real-world-regex/weird.png" alt="">
</figure>

The culprit becomes obvious when omit the `split` and `trim` parts. You can clearly see `replace` only replaces the first instance of `[` and `]`.

```javascript
const attribute = div.getAttribute('tiny-props')
const props = attribute.replace('[', '').replace(']', '')

console.log(props)
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/replaced.png" alt="">
</figure>

Fixing this is easy. We can use a regular expression with a `g` flag. The `g` flag signifies "global" (but I remember it as greedy 😂), allows the regular expression to match all occurrences of the specified value.

In this case, we need to escape `[` and `]` with a `\` because square brackets mean something in regular expressions. The escape character tells the regular expression we're literally searching for `[` and `]` characters.

```javascript
const attribute = div.getAttribute('tiny-listener')
const props = attribute.replace(/\[/g, '').replace(/\]/g, '')

console.log(props)
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/no-brackets.png" alt="">
</figure>

At this point we can also replace all commas, then split the string at each empty space to put each value into an array.

```javascript
const props = attribute
  .replace(/\[/g, '')
  .replace(/\]/g, '')
  .replace(/,/g, '')
  .split(' ')

console.log(props)
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/array.png" alt="">
</figure>

At this point we can loop through the `props` array to get the values we need. Each odd item is the property and each even item is the value needed.

## Combining the regular expressions

Square brackets symbolizes OR in regular expressions. If we put any character inside square brackets, the regular expression will find the letter inside it.

So if a regular expression says `/[abc]/, it will look for letter a, or letter b, or letter c.

We can use this behaviour to combine all three `replace` call into a single one.

```javascript
const props = attribute.replace(/[\[\],]/g, '').split(' ')
console.log(string)
```

This regular expression looks foreign and scary, but if you can trace back its origins (by splitting them up), then it's not as scary as it seems.

## Making the code more robust

Users can break the string by adding in unwanted spaces before or after the string. If they do this, we'll end up empty items which throws the array into disarray (Ha! 😂).

```html
<div tiny-props=" [count, state.count] [message, state.message] ">...</div>
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/disarray.png" alt="">
</figure>

The simple way to prevent these issues is to trim the string before passing `replace`.

```javascript
const props = attribute
  .trim()
  .replace(/[\[\],]/g, '')
  .split(' ')

console.log(props)
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/trimmed.png" alt="">
</figure>

Users can also break the implementation by adding extra whitespaces between commas or between square brackets.

```html
<div tiny-props="[count,    state.count]     [message,     state.message]">
  ...
</div>
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/break.png" alt="">
</figure>

The simplest way to fix this is, once again, with regular expressions. In this case, we'll use split the string with `\s+`.

- `\s` means any whitespace character.
- `+` means one or more instances of the whitespace character.

Once we add `+`, multiple whitespaces don't matter anymore. What matters is users actually leave one whitespace between values.

```javascript
const props = attribute
  .trim()
  .replace(/[\[\],]/g, '')
  .split(/\s+/)
```

Finally, users can break this implementation (again) by omitting whitespaces between each value.

```html
<div tiny-props="[count,state.count][message,state.message]">...</div>
```

<figure role="figure">
  <img src="/images/2021/real-world-regex/omit-whitespace.png" alt="">
</figure>

We can fix this by creating whitespaces intentionally when replacing `[`, `]` and `,`. This creates extra whitespace in three places:

- The front of the string
- Between each item
- At the back of the string

The whitespace between each item can be stripped away with `\s+`. The whitespace in front and behind can be removed by using `trim` before `split`.

```javascript
const props = attribute
  .replace(/[\[\],]/g, ' ')
  .trim()
  .split(/\s+/)

console.log(props)
```

That's it!

I hope this taught you a bit more about real-world regex usage. The regular expressions do not have to be complicated, unreadable, and overwhelming. It can be quite simple as long as you understand the principles behind it 😉.
