---
title: Busyness & Svelte Reactive Bindings
---

How’s it going?

Another week has passed… Ever since I had a child, time has been passing incredibly quickly for me. It’s as if I don’t have sufficient time for rest, contemplation, or even working on things that I wish to work on.

Time just keeps whizzing by…

Perhaps I’m feeling this way because I’m trying to recuperate from the strain I put myself through last year (for staying up in the middle of the night too much, and I’m paying the price for it now).

I hope things are going well for you.

Two articles today:

## Busyness

People are incredibly busy nowadays. But what we failed to notice is how being busy impacts us negatively.

Busy, in the Chinese language, is represented by 忙 (mang). The constituents of this word are 心 (xin) and 亡 (wan).

- 心 means heart
- 亡 means death

Busyness then represents the process or state of your heart’s impending doom.

Interestingly, these two words also have a relationship with forgetting (忘).

I’ll leave you to read the rest in [this article](https://zellwk.com/articles/busyness/). It’s a short read.

## Speed of Svelte’s reactive bindings

When I was building a Combobox Component for Splendid Labz, I ran into a problem where Svelte’s reactive bindings didn’t update in an `input` event.

Upon further digging, I realized that Svelte’s reactive bindings update after `input`, which was why the bindings weren’t updated yet.

I’ve documented the [relationship between Svelte’s bindings and keyboard events](https://zellwk.com/blog/svelte-reactive-bindings-speed/) in an article and suggested solutions for working with/around it.

Hope this helps you in some way.

Talk next week.
