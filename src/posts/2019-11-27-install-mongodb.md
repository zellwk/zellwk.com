---
layout: post
title: Installing MongoDB with Homebrew
description: Updated steps to install MongoDB on a Mac.
slug: install-mongodb
tags:
  - mongodb
---

I had to reconfigure my Macbook after sending it for repairs. During the reconfiguration period, I noticed the instructions I linked to in ["Setting up a local MongoDB connection"][1] were outdated.

Here's an updated version on how to install MongoDB on a Mac.

<!-- more -->

There are a few steps:

**First, you install Homebrew.** If you're curious about what Homebrew is, read [this article][2].

```bash
# Installs Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Second, find the MongoDB tap**.

```bash
brew tap mongodb/brew
```

**Third, install MongoDB**.

```js
brew install mongodb-community
```

MongoDB is now installed on your computer. To use MongoDB, you need to create the `/data/db` folder with this command:

```js
sudo mkdir -p /data/db
```

If you are running MacOS Catalina you will need to create the data directory in `/System/Volumes/Data` due to security measures in that OS (namely SIP - System Integrity Protection). Then set the db path for Mongo:

`mongod --dbpath /users/<username>/data/db/`

You also need to give permissions to use it:

```js
sudo chown -R `id -un` /data/db
```

Now you can follow the rest of [the article][3] to set up your MongoDB connection.

[1]:	/blog/local-mongodb/ "Setting up a local MongoDB connection"
[2]:	/blog/homebrew "Understanding Homebrew"
[3]:	/blog/local-mongodb/ "Setting up a local MongoDB connection"
