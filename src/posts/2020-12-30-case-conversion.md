---
layout: post
title: Case Conversion in JavaScript
description: How to convert any string in JavaScript into kebab case, camel case, sentence case, or title case.
slug: case-conversion
tags: ['javascript']
---

I got fed-up searching Google for case conversion utilities. The useful ones I found ([Voca](https://vocajs.com) and [change-case](https://www.npmjs.com/package/change-case)) both require an environment that allows me to use npm.

But I was using Vanilla JavaScript. I did not want to include any toolchains in this project, and I'm reluctant to send an asynchronous request to download a module just for case-conversion.

So I decided to write a set of conversion utilities myself.

It's simpler than I thought.

<!-- more -->

## The Common Cases

I usually use these cases when writing HTML, CSS, and JavaScript:

- `camelCase`
- `kebab-case`
- `Sentence case`
- `Title Case`

I don't use these two cases, but I know they exist.

- `snake_case`
- `PascalCase`

So far, I've relied on simple functions that convert from one case to another. But I was fed-up with writing things like `camelToTitle` or `camelToKebab`. It's much nicer to have a function that converts all cases to the one I need.

## Converting any case to kebab-case

I started converting stuff into `kebab-case` because that was what I needed when I searched for case conversion utilities.

To convert all cases into `kebab-case`, I had to consider the possible cases. Here are the cases once again:

- `camelCase`
- `PascalCase`
- `snake_case`
- `Sentence case`
- `Title Case`

Converting `snake_case`, `Sentence case` and `Title Case` into `kebab-case` is easy. I only need to do two things:

1. Lowercase everything
2. Replace `_` and spaces with `-`

But I cannot begin by lowercasing everything if I want to support case conversion from `camelCase` and `PascalCase`. I would lose the word-break point.

So I had to begin by searching for the capital letters which denote the start of a new word (for `camelCase` and `PascalCase`). The easiest way is to loop through each letter and run a simple `/[A-Z]/` regex. This regex searches for any letter that's between A and Z.

```javascript
function toKebab (string) {
  return string
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        // Capital letters
      }
      return letter
    })
    .join('')
}
```

Then I lowercased the capital letters and added a space in front of them. (It doesn't matter whether I add space or `_`, both are fine since I'm going to replace them with `-` later).

```javascript
function toKebab (string) {
  return string
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
}
```

Note: I'm pretty sure there's a regex that can do these three steps in one. It probably uses capturing groups and substitution, which I'm not familiar with. I didn't try it since I didn't have the time nor energy to research further. If you know a good regex for this, let me know!

This step converts the cases into the following:

- `camel case`
- `pascal case`
- `snake_case`
- `sentence case`
- `title case`

There's a space at the start of some cases. I removed them with
`trim`.

```javascript
function toKebab (string) {
  return string
    .split('')
    .map((letter, index) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`
      }
      return letter
    })
    .join('')
    .trim()
}
```

This gives me the following:

- `camel case`
- `pascal case`
- `snake_case`
- `sentence case`
- `title case`

I can now replace both `_` and spaces with `-`. This can be done with two `replace` calls like this:

- 1. First, replace uses `/_/g` to replace all occurrences of `_`.
- 2. Second, replace uses `/\s+/` to replace all spaces into `-`. The `+` indicates "one or more", so it matches the two spaces in `title case`.

```javascript
export function toKebab (string) {
  return (
    string
      // ...
      .replace(/_/g, '-')
      .replace(/\s+/g, '-')
  )
}
```

I can combine both `replace` calls into a single regex with `[]`. The square brackets indicate an OR value.

```javascript
export function toKebab (string) {
  return (
    string
      // ...
      .replace(/[_\s]+/g, '-')
  )
}
```

That gives me this:

- `camel-case`
- `pascal-case`
- `snake-case`
- `sentence-case`
- `title-case`

It even works for complicated mixed cases too. For example, if you try `case_With-long name` you'll get `case-with-long-name`.

## Converting anything to Sentence case

I worked on this utility next since I wanted to convert `camelCase` into `Sentence case`.

At first, I dreaded the thought of finding the similarities between all 6 cases again. It felt like a lot of work.

But I realized I can use my `toKebab` function to convert everything into `kebab-case` first. This takes advantage of the work I've already done.

I was against this idea at first because from a performance standpoint, it seemed like a "waste of resources" to run another function first. But I realized I was being idealistic. From a practical standpoint, it doesn't have much impact on performance since the operations are really fast.

```javascript
// Starting with toKebab
function toTitle (string) {
  return toKebab(string)
}
```

Now I just need to convert `kebab-case` to `Title Case`.

Here, I only need to do the following:

1. Split the string at `-`. This gives me an array of words.
2. Capitalize the first letter of each word.
3. Join the array with space.

```javascript
export function toTitle (string) {
  return toKebab(string)
    .split('-')
    .map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
```

And I'm done!

## Converting anything into Sentence case

It's equally easy to convert all cases into Sentence case. Once again, I started by converting things into `kebab-case`.

```javascript
export function toSentence (string) {
  return toKebab(string)
}
```

Now I only need to convert `kebab-case` into `Sentence case`. There are two things to do:

- Capitalize the first letter
- replace `-` with space.

I can do either step first. In this case, I chose to do the `replace` step first since I can chain it after `toKebab`.

```javascript
export function toSentence (string) {
  const interim = toKebab(string).replace(/-/g, ' ')
  return interim.slice(0, 1).toUpperCase() + interim.slice(1)
}
```

## Convert anything into camelCase

Finally, I want to be able to convert any string back into camel case.

I start with `toKebab` as usual.

```javascript
export function toCamel (string) {
  return toKebab(string)
}
```

At this point, I only need to convert `kebab-case` into `camelCase`.

I can do this by:

1. Splitting the word at each `-`. This creates an array of words.
2. Loop through the array and capitalize the first letter, if it's not the first word.

```javascript
function toCamel (string) {
  return toKebab(string)
    .split('-')
    .map((word, index) => {
      if (index === 0) return word
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}
```

Simple as that!

## Case Conversion Library

I placed added these case-conversion utilities into [my JavaScript repository](https://github.com/zellwk/javascript/tree/master/src/utils/convert-case). You can grab them if you want them :)
