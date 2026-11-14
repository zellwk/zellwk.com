---
title: Easy caching on the local file system with Node
---

Have you ever wondered how to cache a file on your local file system?

It’s not as simple as it seems.

There are usually a couple of steps like:

- You have to create the folder to cache the file
- You have to create the file
- You have to be able to load the cache when necessary
- You have to be able to update the cache when necessary…

Most of the work can be done with `fs` (which is built into Node). But that’s a low-level utility so it’s going to take quite a bit of work.

Today, I’m going to share with you a utility that I built — `fileCache` — that will make it super easy to cache files on the local file system.

Here’s how it looks like:

[Here’s an article that explains how `fileCache` works and how to use it](https://zellwk.com/blog/caching-in-node).
