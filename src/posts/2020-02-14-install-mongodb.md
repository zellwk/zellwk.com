---
layout: post
title: Installing MongoDB on Mac (Catalina and non-Catalina)
description: Updated steps to install MongoDB on a Mac.
slug: install-mongodb
tags:
  - mongodb
  - homebrew
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

MongoDB is now installed on your computer.

## Preparations (Before MacOS Catalina)

Before you can use MongoDB, you need to create a `/data/db` folder on your computer to use MongoDB. You can create this folder with the following command:

```js
sudo mkdir -p /data/db
```

You also need to give permissions to use it:

```js
sudo chown -R `id -un` /data/db
```

Now you can follow the rest of [the article][3] to set up your MongoDB connection.

## Preparations (MacOS Catalina onwards)

[Apple created a new Volume in Catalina][4] for security purposes. If you're on Catalina, you need to create the `/data/db` folder in `System/Volumes/Data`.

Use this command:

```js
sudo mkdir -p /System/Volumes/Data/data/db
```

Then, use this command to give permissions:

```js
sudo chown -R `id -un` /System/Volumes/Data/data/db
```

## Using MongoDB

In the past, I can run the `mongod` command to start MongoDB. This no longer works out for the box from MongoDB v4.2.3 onwards.

The best way to start MongoDB now is via `brew services`.

### **Starting MongoDB**

Use this command:

```bash
brew services run mongodb-community
```

MongoDB will start as a background service. Here's what you'll see:

<figure role="figure">
  <img src="/images/2020/install-mongodb/start.png" alt="Started MongoDB with brew services">
</figure>

:::note
You can use `start` instead of `run`. `start` will start MongoDB automatically when you login into your Macbook. I prefer `run` since I don't want MongoDB to be running all the time.
:::

### Checking if MongoDB is running

Use this command:

```bash
brew services list
```

Homebrew will list all running services. If MongoDB is running, `mongodb-community` will have a status set to `started`.

<figure role="figure">
  <img src="/images/2020/install-mongodb/list.png" alt="Mongodb-community has status set to started.">
</figure>

### The Mongo Shell

If MongoDB is running, you should be able to access the Mongo shell with the `mongo` command.

```bash
mongo
```

<figure role="figure">
  <img src="/images/2020/install-mongodb/mongo-shell.png" alt="Starts the Mongo shell.">
</figure>

### Stopping MongoDB

Use this command:

```bash
brew services stop mongodb-community
```

Homebrew will stop MongoDB and let you know.

<figure role="figure">
  <img src="/images/2020/install-mongodb/stop.png" alt="Stopped MongoDB">
</figure>

## Aliases to make these easier

It's a chore typing `brew services run mongodb-community` every time I want to start MongoDB.

I created some aliases to make things easier for me. Here are my aliases:

```bash
alias mongod='brew services run mongodb-community'
alias mongod-status='brew services list'
alias mongod-stop='brew services stop mongodb-community'
```

## What's next?

If you haven't already, you should learn [how to set up a local MongoDB connection][5].

[1]:	/blog/local-mongodb/ "Setting up a local MongoDB connection"
[2]:	/blog/homebrew "Understanding Homebrew"
[3]:	/blog/local-mongodb/ "Setting up a local MongoDB connection"
[4]:	https://support.apple.com/en-us/HT210650
[5]:	/blog/local-mongodb/
