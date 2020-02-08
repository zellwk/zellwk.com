---
title: Checking if an input is empty with CSS
layout: post
slug: check-empty-input-css
newsletter: better-fed
tags:
 - css
description: 'Is it possible to know if an input is empty with only CSS? I had that question when I tried to make an autocomplete component for Learn JavaScript. Basically, I wanted to: 1. Hide a dropdown if the input is empty 2. Show the dropdown if the input is filled'
---

Is it possible to know if an input is empty with only CSS?

I had that question when I tried to make an autocomplete component for Learn JavaScript. Basically, I wanted to:

1. Hide a dropdown if the input is empty
2. Show the dropdown if the input is filled

<figure><img src="/images/2018/empty-input-validation-css/autocomplete.gif" alt="autocomplete demo from https://learnjavascript.today"></figure>

I found a way to do it. It's not perfect. There are a few nuances involved, but I want to share it with you.

<!-- more -->

## The form

First, let's build a form so we're on the same page. We're going to use a simple form with one input.

```html
<form>
  <label for="input"> Input </label>
  <input type="text" id="input" />
</form>
```

When the input is filled, we want to change its `border-color` to green. Here's an example of what we're creating:

<figure><img src="/images/2018/empty-input-validation-css/check.gif" alt="when input is filled, borders should turn green"></figure>

## Checking if the input is empty

I relied on HTML form validation to check whether the input is empty. That meant I needed a `required` attribute.

```html
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required />
</form>
```

At this point, it works fine when the input is filled. Borders turned green.

<figure><img src="/images/2018/empty-input-validation-css/check.gif" alt="borders turned green when input is filled"></figure>

But there's a problem: If the user enters a whitespace into the field, the borders turn green too.

<figure><img src="/images/2018/empty-input-validation-css/check-whitespace.gif" alt="Borders turn green even if user enters a whitespace"></figure>

Technically, this is correct. The input is filled because the user typed something into it.

But I didn't want whitespaces to trigger a blank dropdown menu (for the autocomplete component).

It wasn't enough. I needed a more stringent check.

## Further checks

HTML gives you the ability to validate inputs with regular expressions with the `pattern` attribute. I decided to test it out.

Since I didn't want whitespaces to be recognized, I started with the `\S+` pattern. This pattern meant: One or more characters that's not a whitespace.

```html
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required pattern="\S+"/>
</form>
```

Sure enough, it worked. If a user enters a whitespace into the field, the input doesn't get validated.

<figure><img src="/images/2018/empty-input-validation-css/check-pattern-pre1.gif" alt="Input doesn't get validated when whitespaces are entered"></figure>

But when a whitespace is entered (anywhere) into the input, the input gets invalidated.

<figure><img src="/images/2018/empty-input-validation-css/check-pattern1.gif" alt="Borders turned from greet to black when a whitespace is added."></figure>

Unfortunately, this pattern didn't work in my use case.

In Learn JavaScript's autocomplete component, I taught students how to complete a list of countries. The names of some countries had spaces...

<figure><img src="/images/2018/empty-input-validation-css/autocomplete.gif" alt="Dropdown contains countries with names that have spaces in them. For example, United States."></figure>

I had to include whitespaces in the mix.

The next best alternative I could think of is `\S+.*`. This means 1 or more non-whitespace characters, followed by zero or more (any) characters.

```html
<form>
  <label> Input </label>
  <input type="text" name="input" id="input" required pattern="\S+.*"/>
</form>
```

This worked! I can enter whitespaces into the mix now!

<figure><img src="/images/2018/empty-input-validation-css/check-pattern2.gif" alt="Borders remained green when whitespace is added in the middle of the input"></figure>

But there's one more problem... the input doesn't validate if you START with a whitespace...

<figure><img src="/images/2018/empty-input-validation-css/check-pattern3.gif" alt="Borders turned black when whitespace is added to the start of input"></figure>

And that's the problem I couldn't resolve. More on this later.

When I worked on this article, I came across another interesting question: Is it possible to style an invalid state when the input is filled incorrectly?

## Invalidating the input

We don't want to use `:invalid` because we'll kickstart the input with an invalid state. (When the input is empty, it's already invalid).

This is where Chris Coyier swooped in to the rescue with "[ Form Validation UX in HTML and CSS][1]".

In the article, Chris talks about a `:placeholder-shown` pseudo-class. It can be used to check whether a placeholder is shown.

The idea is:

1. You add a placeholder to your input
2. If the placeholder is hidden, it means the user typed something into the field
3. Proceed with validation (or invalidation)

Here's the CSS (simplified version. For the complete version, check out [Chris's article][2])

```css
/* Show red borders when filled, but invalid */
input:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);
}
```

Since I had both validation AND invalidation styles, I had to ensure the valid styles came after the invalid styles.

```css
/* Show red borders when filled, but invalid */
input:not(:placeholder-shown) {
  border-color: hsl(0, 76%, 50%);;
}

/* Show green borders when valid */
input:valid {
  border-color: hsl(120, 76%, 50%);
}
```

Here's a demo for you to play with:

<p data-height="486" data-theme-id="7929" data-slug-hash="dgEKxX" data-default-tab="result" data-user="zellwk" data-pen-title="Pure CSS Empty validation" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/dgEKxX/">Pure CSS Empty validation</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Note: Edge doesn't support `:placeholder-shown`,  so it's probably not a good idea to use it in production yet. There's no good way to detect this feature.

Now back to the problem I couldn't resolve.

## The problem with pattern

The `pattern` attribute is wonderful because it lets you accept a regular expression. This regular expression lets you validate the input with anything you can think of.

But... **the regular expression must match the text completely**. If the text doesn't get matched completely, the input gets invalidated.

This created the problem I mentioned above. (Reminder of the problem: If a user enters a whitespace first, the input becomes invalid).

I couldn't find a regular expression that worked for all use-cases that I thought of. If you want to try your hand at creating a regular expression that I need, I'd be more than welcome to receive the help!

Here are the use-cases:

```js
// Should not match
''
' '
'  '
'   '

// Should match
'one-word'
'one-word '
' one-word'
' one-word '
'one phrase with whitespace'
'one phrase with whitespace '
' one phrase with whitespace'
' one phrase with whitespace '
```

(Then again, I might be overthinking it... 🙄).

## Update: Problem solved!

Many readers were generous enough to email me their solutions. I want to thank everyone who helped. Thank you so much!

The cleanest solution I received is: `.*\S.*` by [Daniel O'Connor][3]. This means:

- `.*`: Any character
- `\S`: Followed *one* non-whitespace character
- `.*`: Followed by any character

Other regexes I received include:

- `.*\S+.*` by [Matt Mink][4].
- `\s*\S.*` by [Sungbin Jo][5]
- `^\s?(?=\S).*` with a lookahead by [Konstantin][6]

And many others!

Here's a codepen with the updated solution by Daniel:

<p data-height="486" data-theme-id="7929" data-slug-hash="NeRaPw" data-default-tab="result" data-user="zellwk" data-pen-title="Pure CSS Empty validation" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/NeRaPw/">Pure CSS Empty validation</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Wrapping up

Yes, it is possible to validate a form with pure CSS, but there are potential problems with validation when whitespace characters are involved.

If you don't mind the whitespaces, it works perfectly. Have fun trying this pattern out! (Sorry, I can't help it).

[1]:	https://css-tricks.com/form-validation-ux-html-css/ "Form Validation UX in HTML and CSS"
[2]:	https://css-tricks.com/form-validation-ux-html-css/ "Form Validation UX in HTML and CSS"
[3]:	https://www.nvinteractive.com
[4]:	https://twitter.com/matthewjmink
[5]:	https://github.com/pcr910303
[6]:	https://twitter.com/KonstantinRouda
