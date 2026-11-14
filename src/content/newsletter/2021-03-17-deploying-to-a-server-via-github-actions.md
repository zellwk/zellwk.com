---
title: Deploying to a server via Github Actions
---

I wanted to use Github Actions to deploy [zellwk.com](https://zellwk.com) — when I push a commit into Github, I want Github Actions to build my site and deploy to my Digital Ocean server.

The hardest part of this process is deploying to the server with SSH and rsync. I tried various Github actions like [SSH Deploy](https://github.com/marketplace/actions/ssh-deploy) and [SSH Action](https://github.com/appleboy/ssh-action), but I couldn't get the permissions to work for A LONG TIME.

I found most articles about Github actions and SSH didn't help me much. I got stuck with debugging for a few days before I finally figured out how to make the process work.

Today, I want to share the exact steps to deploy via rsync and SSH. This process works for any server, even if you don't use Digital Ocean.

[Click here to read the article!](https://zellwk.com/blog/github-actions-deploy)
