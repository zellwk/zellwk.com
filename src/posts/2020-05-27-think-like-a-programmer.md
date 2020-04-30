---
title: How to think like a programmer
description:
layout: post
slug: think-like-a-programmer
tags:
 - javascript
 - best
newsletter: thinkLikeDev
---

"I don't get JavaScript. I can't make components from scratch. My mind goes blank when I stare at a blank JavaScript file. I guess I can't do it because I don't know how to think like a programmer".

Sounds familiar? You're not alone, my friend. Many people faced the same problem when they try to write JavaScript.

No more.

Let today be the day where you learn to think like a programmer.

<!--more-->

## You don't believe you can think like a programmer

You don't believe you can think like a programmer because you freeze when you see a blank JavaScript file. But **you already know how to think like a programmer.**

It's about **using logic to solve problems**.

For example, where are you going to go for lunch today? There are COUNTLESS of solutions. But how are you going to solve this problem?

One way to solve this is the process of elimination:

- You don't want to cook (so you eat out)
- You don't want to go out (so you order takeaway)
- So you go on Food Panda, Grab, Deliveroo, or another service you know.
- You want healthy food (so Macdonalds is not an option)
- You find something that looks appetizing to you.
- And you order the food.

Problem solved!

Understand this: **If you can decide how get lunch for yourself, you can think like a programmer.**

## How to stop freezing when you see a blank JavaScript file

**You freeze** when you face a blank JavaScript file **because you think about how you should structure the code**.

- Should you use functions?
- Should you use classes?
- Or maybe Object-oriented Programming?

Coders like to talk about coding paradigms. So you're lured into the illusion that you need to code with ONE of these paradigms.

But you don't.

**Don't think of structure**.

Overcoming coder's block is simple. **Think of the problem you want to solve**. You can follow these four steps:

1. Break down the problem into small problems
2. Find solutions to your small problems
3. Assemble the solutions in a coherent manner
4. Refactor and improve

**Structure comes in last** (during the 4th step, refactoring). If you think of structure, you screw up your brain before you even begin. Thinking of structure before solving the problem leads to complicated, overwhelming, bloated code.

### Errors are your friends

A second reason why you freeze is because you're afraid of the errors that show up.

**Don't be afraid of errors.**

Errors are your friends. We're lucky to have them.

Think about designers and other professions, when they create something, it's hard for them to know what's wrong with their work.

But **we get instant feedback** through error messages. We know instantly whether our code works. **Errors are like angels that gently tell us something is wrong** so we can make adjustments and correct things.

{% youtube 'B6EZIEqO15w' %}

## Overcoming Coder's Block

Think of the problem you want to solve. You can follow these four steps:

1. Break down the problem into small problems
2. Find solutions to your small problems
3. Assemble the solutions in a coherent manner
4. Refactor and improve

<div class="jsCkClone"></div>

### Step 1: Break down the problem into smaller problems.

How do you put an elephant into the fridge?

Here's what most people would answer:

1. Open the fridge
2. Put the elephant in
3. Close the fridge

Problem solved.

<figure><img src="/images/2017/think/ele-in-fridge.jpg" alt="Image of an elephant in the fridge">
  <figcaption>Poor elephant. It looks so sad in the fridge :(</figcaption>
</figure>

This answer is the best example of why you get stuck when you face a blank JavaScript file. **You skipped steps**.

If you think logically about the question, you'll see a few glaring problems that remain unanswered:

1. What fridge are we talking about?
2. What kind of elephant are we talking about?
3. If the elephant is too huge to fit into the fridge, what do you do?
4. Where do you find the elephant in the first place?
5. How do you transport the elephant to your fridge?

When you code, you need to answer every small question you can think of. That's why the first step is to break your problem into smaller pieces.

### Step 2: Find solutions to your small problems.

The second step is to find a solution to each of your small problems. Here, it's important to be as detailed as possible.

1. What fridge? – the fridge that sits in your kitchen
2. What kind of elephant? – the [african bush elephant][1]
3. What if the elephant is too big? – Get a shrink gun (🔫) to shrink the elephant (😎).
4. Where do you find the elephant? – Africa
5. How do you transport the elephant? – Put it in your bag after you've shrunk it, then take a plane back home.

Sometimes, you need to dig a few layers in to get the answer you need. In the example above, we can dig deeper into answers 3 and 4.

1. Where do you get the shrink gun? – Borrow from the mad scientist next door.
2. Where in Africa can you find your elephant? – Addo Elephant Park in South Africa.

Once you have answers to all your smaller problems, you piece them together to solve your big problem.

### Step 3: Assemble the solutions in a coherent manner.

So, in the put-elephant-in-fridge example, you can probably follow the following steps:

1. Get a shrink gun from the scientist next door
2. Fly to South Africa
3. Travel to Addo Elephant Park
4. Find an elephant in the park
5. Shoot the elephant with the shrink gun
6. Put the shrunk elephant in your bag
7. Travel back to the airport
8. Fly back to your country
9. Travel to your house
10. Put the elephant in your fridge

Problem solved.

As interesting as it sounds, you wouldn't be capturing elephants and putting them into fridges with JavaScript anytime soon. Let's go through a real example instead.

## Let's use a real example.

Let's say you want to a create button that, when clicked, shows you a sidebar.

<p data-height="300" data-theme-id="7929" data-slug-hash="zdqmLe" data-default-tab="result" data-user="zellwk" data-embed-version="2" data-pen-title="Sidebar for Thinking like a programmer article" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/zdqmLe/">Sidebar for Thinking like a programmer article</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Breaking down the problem

The first step to building this button-and-sidebar component is to break down the component into smaller pieces. Here are a few problems you may identify:

1. What is the markup of this button?
2. How should the button look?
3. What happens when the button gets clicked once?
4. What happens when the button gets clicked again?
5. What happens when the button gets clicked a third time?
6. What is the markup of this sidebar?
7. How does the sidebar look when it is shown?
8. How does the sidebar look when it is hidden?
9. How does the sidebar show up?
10. How does the sidebar go away?
11. Should the sidebar show up when the page loads?

### Creating solutions for each small problem

To create solutions, you need to have knowledge about the medium you're creating for. In our case, you need to know sufficient HTML, CSS, and JavaScript.

Don't worry if you don't know the answer to any of these questions. If you've broken them down sufficiently, you should be able to find an answer through Google in five minutes.

Let's answer each of the questions:

**What is the markup of this button?**

The markup is an `<a>` tag with a class of `.button`.

```html
<a href="#" class="button">Click me</a>
```

**How should this button look?**

This button should have the following CSS:

```css
.btn {
  display: inline-block;
  font-size: 2em;
  padding: 0.75em 1em;
  background-color: #1ce;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
}
```

**What happens when the button gets clicked once? Twice? Three times?**

- Click once: Sidebar shows up
- Click twice: Sidebar goes away
- Click 3 times: Sidebar shows up again

**What is the markup of this sidebar?**

The sidebar should be a `<div>` that contains a list of links:

```html
<div class="sidebar">
  <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
    <li><a href="#">Link 3</a></li>
    <li><a href="#">Link 4</a></li>
    <li><a href="#">Link 5</a></li>
  </ul>
</div>
```

**How does the sidebar look when it is shown?**

The sidebar should be placed at the right of the window. It needs to be fixed in place so the user sees it. It should be 300px wide...

When you finish solving the problem, you may end up with CSS that looks similar to the following:

```css
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 300px;
  background-color: #333;
}

.sidebar ul {
  margin: 0;
  padding: 0;
}

.sidebar li {
  list-style: none;
}

.sidebar li + li {
  border-top: 1px solid white;
}

.sidebar a {
  display: block;
  padding: 1em 1.5em;
  color: #fff;
  text-decoration: none;
}
```

**How does the sidebar look when it is hidden?**

The sidebar should be shifted 300px to the right, so it is off the screen.

When you answer this question, another two may pop into your mind:

1. How do you know whether the sidebar is shown or hidden?
2. How do you style the hidden sidebar?

Let's answer them as well.

**How do you know whether the sidebar is shown or hidden?**

If the sidebar has a `.is-hidden` class, the sidebar should be hidden from view. Otherwise, it should be visible.

**How do you style the hidden sidebar?**

We use `translateX` to shift the sidebar 300px to the right since `transform` is one of the better properties for animation. Your styles then becomes:

```css
.sidebar.is-hidden {
  transform: translateX(300px);
}
```

**How does the sidebar show up?**

The sidebar cannot appear immediately. It needs to move from the right (where it's hidden from view) to the left (where it becomes visible).

If you know your CSS, you'll be able to use the `transition` property. If you don't, you'll be able to find your answer through Google.

```css
.sidebar {
  /* other properties */
  transition: transform 0.3s ease-out;
}
```

**How does the sidebar disappear?**

It should disappear the same way it appears, in the opposite direction. With this, you don't have to write any additional CSS code.

**Should the sidebar show up when the page loads?**

Nope. Given what we have, we can add an `is-hidden` class in the sidebar markup and the sidebar should remain hidden.

```html
<div class="sidebar is-hidden">
  <!-- links -->
</div>
```

**Now, we've answered almost everything, except one – what happens when the button gets clicked once? Twice? Three times?**

Our answer above was too vague. We know the sidebar should appear when you click on it, but how? The sidebar should disappear when you click on it again, but how?

At this point, we can answer this question again with much more details. But before that, how do know when you clicked on a button?

**How to know when you click on a button**.

If you know your JavaScript, you know you can add an event listener to the button and listen for a `click` event. If you don't know, you'll be able to google it.

Before you add an event listener, you need to find the button from the markup with `querySelector`.

```js
const button = document.querySelector('.btn')

button.addEventListener('click', function() {
  console.log('button is clicked!')
})
```

**What happens when the button is clicked once?**

When the button is clicked once, we should remove the `is-hidden` class so the button shows up. To remove a class in JavaScript, we use `Element.classList.remove`. This means we need to select the sidebar first.

```js
const button = document.querySelector('.btn')
const sidebar = document.querySelector('.sidebar')

button.addEventListener('click', function() {
  sidebar.classList.remove('is-hidden')
})
```

**What happens when the button is clicked twice?**

When the button is clicked again, we should add the `is-hidden` class back to the sidebar so it disappears.

Unfortunately, we can't detect how many times a button is clicked with an event listener. The best way, then, is to check if the class `is-hidden` is present on the sidebar already. If it is, we remove it. If it's not, we add it.

```js
const button = document.querySelector('.btn')
const sidebar = document.querySelector('.sidebar')

button.addEventListener('click', function() {
  if (sidebar.classList.contains('is-hidden')) {
    sidebar.classList.remove('is-hidden')
  } else {
    sidebar.classList.add('is-hidden')
  }
})
```

And with this, you have an initial prototype of the component.

<p data-height="300" data-theme-id="7929" data-slug-hash="zdqmLe" data-default-tab="result" data-user="zellwk" data-embed-version="2" data-pen-title="Sidebar for Thinking like a programmer article" class="codepen">See the Pen <a href="https://codepen.io/zellwk/pen/zdqmLe/">Sidebar for Thinking like a programmer article</a> by Zell Liew (<a href="https://codepen.io/zellwk">@zellwk</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Final Step: Refactor and improve.

The final step is to refactor and improve your code. This step may not come naturally to you right now. It takes effort and practice before you can tell whether your code can be improved.

So, once you're done with the three steps, take a break and work on something else. When you get better with JavaScript, you may notice you missed a few details when you come back.

In this example above, you can ask a few more questions:

1. How do you make this sidebar component accessible to users who have visual disabilities?
2. How do you make this sidebar component easier to use for people with keyboards?
3. Can you improve the code in any other way?

For the third point, if you googled a little further, you may notice there's a `toggle` method that removes a class if it's present. If the class isn't present, the `toggle` method adds it for us:

```js
const button = document.querySelector('.btn')
const sidebar = document.querySelector('.sidebar')

button.addEventListener('click', function() {
  sidebar.classList.toggle('is-hidden')
})
```

## Wrapping up

Thinking like a programmer is simple. The key is to **know how to break problems down into smaller ones**.

When you're done breaking the problem down, **find solutions for your small problems** and code them up. Along the way, you'll discover more problems you didn't think of before. Solve them too.

By the time you're done with writing your answers to each small problem, you'll have the answer to your large problem.

Finally, the work isn't done when you create your first solution. There's always going to be room for improvement. However, you most likely won't be able to see the improvements right now. Take a break, work on something else and come back later. You'll be able to ask even better questions then.

[1]:	https://en.wikipedia.org/wiki/African_elephant
