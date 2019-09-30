---
layout: post
title: Inconsistent behavior among browsers when clicking on buttons
description: I noticed browsers were inconsistent in how they handle a click on a button element. Some browsers choose to focus on the button. Some browsers don't.
slug: inconsistent-button-behavior
tags:
  - javascript
  - accessibility
---

I noticed browsers were inconsistent in how they handle a click on `<button>`. Some browsers choose to focus on the button. Some browsers don't.

In this article, I want to show you my test and findings. Then, I want to talk about a way to overcome these inconsistencies.

<!-- more -->

## The test

The test is simple. We're testing what happens when we click on a `<button>`. Specifically, we want to know if:

1. Does clicking focus the button?
2. After clicking, does keypresses originate from the button?
3. After clicking, can we tab to the next element?
4. After clicking, can we shift-tab to the previous element?

Here's the HTML we're using for the test:

```html
<div tabindex="0">Placeholder for testing tab</div>
<button>Button</button>
<div tabindex="0">Placeholder for testing tab</div>
```

The `<div>`s are there for us to test tabbing and shift-tabbing easily.

Here's a Codepen for you if you want to follow along with the tests.

<p class="codepen" data-height="402" data-theme-id="7929" data-default-tab="result" data-user="zellwk" data-slug-hash="WVMMvy" style="height: 402px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Button and link focus test">
  <span>See the Pen <a href="https://codepen.io/zellwk/pen/WVMMvy/">
  Button and link focus test</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

### Testing for focus

We can test for focus visually. If the button gets focused, there should be the default visual glow around the button.

We can also test for focus programmatically. In JavaScript, you can get the focused element with `document.activeElement`. When we click a button, we can log the focused element.

```js
const button = document.querySelector('button')
button.addEventListener('click', event => {
  console.log('Click:', document.activeElement)
})
```

Note: If you're using Chrome, you can use the Live Expression tool (so there's no need to log `document.activeElement`).

### Testing for keypress

Here, we can add a `keydown` event listener to the document. Here, we want to log what element triggered the event. We can tell the element with `event.target`.

```js
document.addEventListener('keydown', event => {
  console.log(`Keydown:`, event.target)
})
```

### Testing for Tab and Shift-tab

After clicking on a button, does Tab go to the next focusable element? If it goes to the next focusable element, that element should receive a focus outline.

Likewise, does `Shift` + `Tab` goes to the previous focusable element? If it goes to the previous focusable element, that element should receive a focus outline too.

I did not log `document.activeElement` because the focus glow is enough.

## Results

### Safari (Mac)

When you click on a button in Safari (12.1.1), the button does not get focus. The document gets focus instead. We know this because:

1. There's no focus glow on the button.
2. `document.activeElement` points to `<body>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/safari-click.gif" alt="In Safari, document gets focused when you click on a button"></figure>

Since `<body>` gets focus, any further keypress originates from the `<body>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/safari-keydown.gif" alt="Next keypress originate from the document."></figure>

Tabbing into the next element works as expected. The next element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/safari-tab.gif" alt="Tabbing into the next element works as expected."></figure>

`Shift` + `Tab` doesn't work as I expected. I expect the previous element to get focus, but `<button>` gets focus instead.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/safari-shift-tab.gif" alt="Shift tab does not focus on the previous element. It focuses on the button instead."></figure>

### Firefox (Mac)

When you click on a button in Firefox (Nightly 70.0a1), the button does not get focus. The document gets focus instead.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-click.gif" alt="In Firefox, document gets focused when you click on a button"></figure>

Any further keypress originates from the `<body>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-keydown.gif" alt="Next keypress originate from the document."></figure>

`Tab` does not work as expected. When you press `Tab`, Firefox focuses on the first element in the document.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-tab.gif" alt="Tab goes to the first element."></figure>

`Shift` + `Tab` is funny. If `<button>` is the first thing you clicked on, Firefox focuses on the last focusable element in the document. If you focused on an element before clicking the button, Firefox focuses that element.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-shift-tab.gif" alt="Shift-tab behavior."></figure>

The problem with Firefox and buttons date back to Firefox 63 (at least). MDN has a section on this:

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/mdn.png" alt="MDN's documentation regarding button clicks in Firefox and other browsers."></figure>

### Firefox (Windows)

When you click on a button in Firefox (Quantum 68.0.1, Windows version), the button gets focus, but the focus glow does not show up.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-windows-click.gif" alt="Buttons gets focus but the focus glow does not show up."></figure>

Further keypress originates from the `<button>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-windows-keydown.gif" alt="Next keypress originate from the button."></figure>

Tab works as expected. The next item gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-windows-tab.gif" alt="Next item gets focus."></figure>

`Shift` + `Tab` works as expected. The previous item gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/firefox-windows-shift-tab.gif" alt=""></figure>

### Chrome (Mac)

When you click on a button in Chrome (Canary 78.0), the button gets focus. This implementation is different from Safari and Firefox.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-click.gif" alt="In Chrome, the button gets focus when you click on it."></figure>

The next keypress originates from `<button>`. This is expected since `<button>` is the focused element.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-keydown.gif" alt="Next keypress originates from the button"></figure>

`Tab` works as expected. The next element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-tab.gif" alt="Next element gets focus when you tab"></figure>

`Shift` + `Tab` works as expected. The previous element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-shift-tab.gif" alt="Previous element gets focus when you press Shift + Tab"></figure>

### Chrome (Windows)

When you click on a button in Chrome (Chrome 75.0), the button gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-windows-click.gif" alt="The button gets focus when you click on it."></figure>

The next keypress originates from `<button>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-windows-keydown.gif" alt="Next keypress originates from the button"></figure>

`Tab` works as expected. The next element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-windows-tab.gif" alt="Next element gets focus when you tab"></figure>

`Shift` + `Tab` works as expected. The previous element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/chrome-windows-shift-tab.gif" alt="Previous element gets focus when you press Shift + Tab"></figure>

### Edge (Windows)

When you click on a button in Edge (Edge 17), the button gets focus, but the focus ring did not appear.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/edge-click.gif" alt="The button gets focus when you click on it, but the focus ring did not appear."></figure>

The next keypress originates from `<button>`.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/edge-keydown.gif" alt="Next keypress originates from the button"></figure>

`Tab` works as expected. The next element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/edge-tab.gif" alt="Next element gets focus when you tab"></figure>

`Shift` + `Tab` works as expected. The previous element gets focus.

<figure role="figure"><img src="/images/2019/inconsistent-button-behavior/edge-shift-tab.gif" alt="Previous element gets focus when you press Shift + Tab"></figure>

## Summary of the results

We tested for four things across the common browsers:

1. Does clicking focus the button?
2. After clicking, does keypresses originate from the button?
3. After clicking, can we tab to the next element?
4. After clicking, can we shift-tab to the previous element?

Here are the results in a table form.

<table>
  <thead>
    <tr>
      <th>Test</th>
      <th>Safari</th>
      <th>Firefox ()</th>
      <th>Firefox (⊞)</th>
      <th>Chrome ()</th>
      <th>Chrome (⊞)</th>
      <th>Edge (⊞)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Focused element</td>
      <td><code>&lt;body&gt;</code></td>
      <td><code>&lt;body&gt;</code></td>
      <td><code>&lt;button&gt;</code> (but no focus glow)</td>
      <td><code>&lt;button&gt;</code></td>
      <td><code>&lt;button&gt;</code></td>
      <td><code>&lt;button&gt;</code> (but no focus glow)</td>
    </tr>
    <tr>
      <td>Next Keypress from:</td>
      <td><code>&lt;body&gt;</code></td>
      <td><code>&lt;body&gt;</code></td>
      <td><code>&lt;button&gt;</code></td>
      <td><code>&lt;button&gt;</code></td>
      <td><code>&lt;button&gt;</code></td>
      <td><code>&lt;button&gt;</code></td>
    </tr>
    <tr>
      <td>Tab goes to:</td>
      <td>Next element</td>
      <td>First element in document</td>
      <td>Next element</td>
      <td>Next element</td>
      <td>Next element</td>
      <td>Next element</td>
    </tr>
    <tr>
      <td>Shift + Tab goes to:</td>
      <td><code>&lt;button&gt;</code></td>
      <td>Previously focused element (if any)</td>
      <td>Previous Element</td>
      <td>Previous Element</td>
      <td>Previous Element</td>
      <td>Previous Element</td>
    </tr>
  </tbody>
</table>

You can see the inconsistencies here. It's clear as day. The major inconsistencies are:

1. **Firefox on Mac is simply weird.** Everything seems wrong.
2. **Some browsers don't focus on the button** when they're clicked.
3. **Some browsers don't include a focus glow** on the button when they're clicked.

The [HTML Spec][1] doesn't state what browsers should do after a user clicks on a button. So *no browsers are at fault* for the inconsistent behavior.

## Here's a potential fix

**I think Chrome's implementation (both Mac and Windows) makes the most sense.**

1. When you click on a button, focus should be on the button.
2. Button should have a focus glow.
3. When you press `Tab` after clicking a button, the next element should get focus.
4. When you press `Shift` + `Tab` after clicking a button, the previous element should get focus.

Note: If you're the kind of person that hates the default focus style, you can restyle the focus ring (or you can wait for `:focus-visible` to be widely supported).

There's a quick fix if you want to make the other browsers behave consistently with Chrome's implementation. All you have to do is add this code at the top of your JavaScript.

```js
document.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    event.target.focus()
  }
})
```

This code focuses on the button when you click on it. This also makes sure:

1. The focus glow appears.
2. Tab goes to the next element.
3. Shift-Tab goes to the previous element

**Important note:** You want to put this code AT THE TOP of your JavaScript files. It works because event listeners are called in the order they're declared. Focus will always go to the button first. You can then redirect focus to other elements if you desire.

**Important note #2:** I have not tested this code thoroughly with all devices yet. (Only Mac versions Safari, Firefox, and Chrome). I appreciate it if you can help to conduct some tests. Let me know if I'm wrong in any way. Thanks.

In case you were wondering why I did these tests: I realized the inconsistent behavior when I was writing the Keyboard section for [Learn JavaScript][2]. I did these tests because I wanted to teach my students the right way to handle buttons and focus (which is a big part of accessibility!).

[1]:	https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html#the-button-element
[2]:	https://learnjavascript.today "Learn JavaScript"