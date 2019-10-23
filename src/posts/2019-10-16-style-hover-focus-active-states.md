---
layout: post
title: Style hover, focus, and active states differently
description: Why you should (and how to) style hover, focus, and active states differently
slug: style-hover-focus-active-states
tags:
  - accessibility
  - css
  - design
---

I've been styling `:hover`, `:focus`, and `:active` states the same way for years. I can't remember when I started styling this way. Here's the code I always use: 

```scss
// Not the best approach. I'll explain why in this article
.selector {
  &:hover, 
  &:focus,
  &:active {
    // Styles here
  }
}
```

As I paid more attention to keyboard accessibility (and therefore paying more attention to focus), I began to think we should not style hover, focus, and active states the same way. 

**Hover, focus, and active states should be styled different.**  

There's a simple reason: They're different states!

Today, I want to show you a magical way to style all three states effortlessly.

<!-- more -->

Let's start with `:hover`. 

## Styling hover states

`:hover` triggers when a user brings their mouse over an element. 

**Hover states are usually represented by a change in `background-color` (and/or `color`)**. The difference in states doesn't have to be obvious because users already know they hovered on something. 

```scss
button {
  background-color: #dedede;
}

button:hover {
  background-color: #aaa;
}
```

<figure role="figure"><img src="/images/2019/states/hover.gif" alt="On hover, button darkens slightly."></figure>

## Styling focus states

`:focus` activates when an element receives focus. Elements can receive focus in two ways: 

1. When users tab into a focusable element
2. When users click on a focusable element

Focusable elements are: 

1. Links (`<a>`)
2. Buttons (`<button>`)
3. Form elements (`input`, `textarea`, etc.)
4. Elements with `tabindex`

Here are a few important points to note: 

1. Users cannot tab into an element with `tabindex="-1"`, but they can click on it. The click triggers focus.
2. On Safari and Firefox (Mac), clicks do not focus the `<button>` element. [More info here][1]. 
3. When you click on a link (`<a>`), focus remains on the link until you lift your finger from your mouse. When you lift your finger, the focus gets redirected elsewhere if the `href` points to a valid `id` on the same page. 

For focus, we're more concerned about users tabbing into elements than clicking on elements. 

When a user hits tab, they don't know where the focus will go to. They can only guess. This is why **we need a prominent change a user's attention attention to the focused element**.

The default focus style is okay most of the time. If you want to [design your own focus][2], think about these four things: 

1. Adding an outline 
2. Creating animations with movement 
3. Changing `background-color`
4. Changing `color` 

Since `background-color` and `color` changes often accompany `:hover`, it makes sense that **outlines or animations should accompany `:focus`.**

You can use a combination of `outline`, `border`, and `box-shadow` properties to create nice focus styles. I share how to do this in "[Creating a custom focus style][3]".  

```scss
button {
  background-color: #dedede;
}

button:hover {
  background-color: #aaa;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px lightskyblue;
}
```

<figure role="figure"><img src="/images/2019/states/focus.gif" alt="Focus a button with Tab. When focused, shows an outline with box-shadow."></figure>

## Styling active states

When you interact with things in real life, you expect some sort of feedback. For example, if you push a button, you expect the button to get pressed. 

This feedback is useful on websites too. You can style the "push button" moment with `:active`. **`:active` triggers when you interact with an element**. Interacting here means: 

1. Holding down your left mouse button on an element (even non-focusable ones)
2. Holding down the Space key (on buttons)

```scss
button:active {
  background-color: #333;
  border-color: #333;
  color: #eee;
}
```

<figure role="figure"><img src="/images/2019/states/active.gif" alt="Changes background-color and color when user holds their left mouse button down on the button."></figure>

Two weird things to take note of: 

1. Holding down Space triggers `:active` on buttons, but holding down Enter doesn't.
2. Enter triggers links but it doesn't create create an active state. Space doesn't trigger links at all. 

### Default styles for links

Links have a default active style. They turn red when they get clicked. 

<figure role="figure"><img src="/images/2019/states/link-active.gif" alt="By default, links turn red when they get clicked."></figure>

### The relationship between active and focus

When you **hold down the left mouse button** on a focusable element, you **trigger the active state**. You also **trigger the focus state** at the same time. 

When you release the left mouse button, focus remains on the element

👆 is true for most focusable elements except links and buttons. 

**For links:**

1. When you hold down left mouse button: Triggers `:active` and `:focus` state on Firefox and Chrome  Only triggers active on Safari (tested on Mac only)
2. When you release left mouse button: `:focus` remains on link (if the link's `href` does not match an `id` on the same page). On Safari, focus goes back to `<body>`. 

**For buttons:**

1. When you hold down left mouse button: Triggers `:active` and `:focus` state on Chrome only. Does not trigger `:focus` at all in Safari and Firefox (Mac). I wrote about this strange behavior [here][4].

If you want clicks to focus on buttons, you need to add this JavaScript as early as you can. (As for why, you can read the article I linked to above for more information). 

```js
document.addEventListener('click', event => {
  if (event.target.matches('button')) {
    event.target.focus()
  }
})
```

Once you have this code, click behaviour on buttons become: 

1. When you hold down left mouse button: Triggers `:active` in all browsers. Triggers `:focus` on Chrome only. 
2. When you release left mouse button: Triggers `:focus` on Safari and Firefox (Mac). `:focus` remains on button for other browsers. 

<figure role="figure" aria-label="Button's behavior on Safari after adding the JavaScript snippet above."><img src="/images/2019/states/magic-mouse-safari.gif" alt="Button behavior on Safari."><figcaption>Button's behavior on Safari after adding the JavaScript snippet above.</figcaption></figure>

Now you know about hover, focus, and active states, I want to talk about styling all three. 

## The magic combination

The magic combination **allows users to get feedback when they hover, focus, and interact** with an element. Here's the code you need: 

```css
.element:hover,
.element:active {
  /* Change background/text color */ 
}

.element:focus {
  /* Show outline /* 
}
```

For mouse users:

1. When the user hovers over an element, `background-color` (and/or `color`) changes. They get feedback. 
2. When the user clicks on an element, focus outline shows. They get feedback. 

<figure role="figure"><img src="/images/2019/states/magic-mouse.gif" alt="Mouse users receive feedback on hover and on click."></figure>

For keyboard users: 

1. When the user tabs into an element, focus outline shows. They get feedback. 
2. When they interact with the element, `background-color` (and/or `color`) changes. They get feedback. 

<figure role="figure"><img src="/images/2019/states/magic-keyboard.gif" alt="Keyboard users receive focus on Tab and on interaction."></figure>

Best of both worlds! 

1. **I have not tested the magic combination thoroughly.** This is a proof of concept. I'd appreciate it if you help me with some tests and let me know how it fares.
2. **If you run tests, don't use Codepen.** Focus states for links are weird on Codepen. If you hover over a link, the focus outline gets removed. Why? I don't know. Sometimes I think it's best to test stuff like these without any fancy tools. Just plain ol' HTML, CSS, JS.

## The non-magic (but might be better) combination

Like I mentioned above, clicks on buttons have a weird behavior in Safari and Firefox (Mac). If you added the JavaScript snippet I showed you, the magic combination still works. But it's not perfect. 

For Safari and Firefox (Mac), this is what happens: 

1. When users hold their mouse button down, nothing changes. 
2. When users lift their mouse button up, the element gets focus

<figure role="figure"><img src="/images/2019/states/magic-mouse-safari.gif" alt="Button behavior on click in Safari."></figure>

If you think this is enough affordance, then the magic combination works. You can stop here. 

But if you think there's not enough affordance, you'd want to style `:hover`, `:focus`, and `:active` separately. 

```css
.element:hover {
  /* Change background/text color */ 
}

.element:active {
  /* Another change in background/text color */
}

.element:focus {
  /* Show outline /* 
}
```

<figure role="figure" aria-label="Button behavior on Safari if you styled all three states."><img src="/images/2019/states/non-magic-safari.gif" alt=""><figcaption>Button behavior on Safari if you styled all three states.</figcaption></figure>

That's it! Hope you learned something today! 

[1]:	/blog/inconsistent-button-behavior "Inconsistent button behavior across browsers"
[2]:	/blog/design-focus-style "Design your own focus"
[3]:	/blog/creating-focus-style "Creating a custom focus style"
[4]:	/blog/inconsistent-button-behavior "Inconsistent button behavior across browsers"
