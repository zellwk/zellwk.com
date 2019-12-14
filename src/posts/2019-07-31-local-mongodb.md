---
layout: post
title: How to setup a local MongoDB Connection
description: This article shows you how to install MongoDB on your computer and different ways you can access it.
slug: local-mongodb
tags:
  - mongodb
  - mongoose
  - node
---

I always use MongoDB as a database when I work on an app. And I like to connect to a database on my computer because it speeds up dev and test-related work.

Today, I want to share how to create and connect to a local MongoDB Database.

<!-- more -->

## Installing MongoDB

You need to install MongoDB on your computer before you can connect to it. You can install MongoDB by following these instructions ([Mac][1] and [Windows][2]).

Once you have completed the installation process, try typing `mongo --version` into your command line. You should get a response similar to the following:

```js
mongo --version
```

<figure><img src="/images/2019/local-mongodb/version.png" alt="Terminal showing MongoDB Version"></figure>

## Starting MongoDB

You can start MongoDB on your computer with the `mongod` command.

```js
mongod
```

<figure><img src="/images/2019/local-mongodb/mongod.png" alt=""></figure>

Keep the `mongod` window running when you want to work with your local MongoDB. MongoDB stops when you close the window.

## Brief overview of how MongoDB works

MongoDB lets you store things (called *documents*) inside *databases*. Each database contains multiple *collections*.

To make it easier to understand, you can think of MongoDB as a building. It contains many rooms.

**Each room is a database**. Each database is responsible for storing information about one application. You can store as much information as you want.

You have an unlimited supply of **boxes** in each room. Each box is a  **collection**. Each collection can only contain one type of data.

For example, one collection can be used for books, one collection for users, one collection for toys, and so on.

## Adding items to a database

One way to add items to a MongoDB database is through the Mongo Shell. To open up the Mongo Shell, you open another command line window and run `mongo`.

```js
mongo
```

<figure><img src="/images/2019/local-mongodb/mongo-shell.png" alt=""></figure>

Note: Make sure you keep the `mongod` window open! You won't be able to interact with the Mongo Shell if you close the `mongod` window.

First, we need a database to work with. You can see the currently selected database with the `db` command. (By default, you should be on the `test` database).

```bash
> db
```

Note: The `>` in the code above signifies the Mongo Shell. You don't need to type `>`. It is not part of the command.

<figure><img src="/images/2019/local-mongodb/test-db.png" alt="Terminal returns 'test' when we run the 'db' command."></figure>

For this article, we'll create a database called `game-of-thrones`. You can use the `use <database>` command to create and switch to a new database.

```bash
> use game-of-thrones
```

<figure><img src="/images/2019/local-mongodb/switch-db.png" alt="Switch to a database named game-of-thrones."></figure>

We're going to add a character into the `game-of-thrones`. Here, we need to put the character into a collection. We'll use `characters` as the name of the collection.

To add an item to a collection, you can pass a JavaScript object into `db.<collectionName>.insertOne()`.

```js
db.characters.insertOne({ name: 'Jon Snow' })
```

<figure><img src="/images/2019/local-mongodb/insert-1.png" alt="Added 'Jon Snow' into the 'characters' collection."></figure>

Let's add one character into the database before we continue.

```js
db.characters.insertOne({ name: 'Arya Stark' })
```

<figure><img src="/images/2019/local-mongodb/insert-2.png" alt="Added 'Arya Stark' into the 'characters' collection."></figure>

You can see the characters we've added by using the `find` command. (`db.<collectionName>.find()`).

```js
db.characters.find()
```

<figure><img src="/images/2019/local-mongodb/db-find.png" alt="Database returns two characters—Jon Snow and Arya Stark."></figure>

This is all you need to know about the Mongo Shell for now.

## Accessing MongDB with MongoDB Compass

MongoDB Compass gives you another way to access MongoDB. It's an app that makes checking (and editing) databases easier if you're not a fan of the command line.

To use MongoDB Compass, you have to install it first. You can download and install MongoDB Compass from the [this page][3].

When you open MongoDB Compass, you'll see a screen that looks like this:

<figure><img src="/images/2019/local-mongodb/mongodb-compass.png" alt="MongoDB Compass startup screen."></figure>

To connect to your local MongoDB, you set `Hostname` to `localhost` and `Port` to `27017`. These values are the default for all local MongoDB connections (unless you changed them).

<figure><img src="/images/2019/local-mongodb/mongodb-compass-settings.png" alt="Sets Hostname to localhost and Port to 27017."></figure>

Press connect, and you should see the databases in your local MongoDB. Here, you should be able to see `game-of-thrones` (the database we created for this tutorial).

<figure><img src="/images/2019/local-mongodb/mongodb-compass-databases.png" alt="List of databases in my local MongoDB"></figure>

If you click on `game-of-thrones`, you'll see a `characters` collection.

<figure><img src="/images/2019/local-mongodb/mongodb-compass-collection.png" alt="The characters collection in MongoDB Compass."></figure>

And if you click on `characters`, you'll see the two characters we created in the earlier section.

<figure><img src="/images/2019/local-mongodb/mongodb-compass-documents.png" alt="Documents 'Jon Snow' and 'Arya Stark' in the 'Characters' collection."></figure>

This is how you can use MongoDB Compass to connect to a MongoDB that's running on your own computer.

## Connecting to MongoDB with a Node server

When we build applications, we connect to MongoDB through our applications (not through Mongo Shell nor MongoDB Compass).

To connect to MongoDB, we need to use the [mongodb][4] package. Alternatively, you can also use [Mongoose][5].

(By the way, I prefer using Mongoose over the MongoDB native driver. I'll share why in a future article).

### Connecting with MongoDB native driver

First you have to install and require the mongodb package.

```bash
npm install mongodb --save
```

```js
const MongoClient = require('mongodb').MongoClient
```

You can connect to your local MongoDB with this url:

```js
const url = 'mongodb://127.0.0.1:27017'
```

With the Mongo Client, you need to specify the database you're using after you connect to MongoDB. Here's what it looks like:

```js
const dbName = 'game-of-thrones'
let db

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)

  // Storing a reference to the database so you can use it later
  db = client.db(dbName)
  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
})
```

<figure><img src="/images/2019/local-mongodb/connect-mongodb.png" alt="Connected to local MongoDB with MongoDB native driver."></figure>

### Connecting with Mongoose

To connect with Mongoose, you need to download and require `mongoose`.

```bash
npm install mongoose --save
```

```js
const mongoose = require('mongoose')
```

When you use Mongoose, the connection `url` should include the database you're connecting to:

```js
const url = 'mongodb://127.0.0.1:27017/game-of-thrones'
```

You can connect to MongoDB with the `connect` method:

```js
mongoose.connect(url, { useNewUrlParser: true })
```

Here's how you can check whether the connection succeeds.

```js
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
```

<figure><img src="/images/2019/local-mongodb/connect-mongoose.png" alt="Connected to local MongoDB through Mongoose."></figure>

[1]:	/blog/install-mongodb "Install MongoDB on Mac"
[2]:	https://treehouse.github.io/installation-guides/windows/mongo-windows.html "Treehouse — Install MongoDB on Windows"
[3]:	https://docs.mongodb.com/compass/master/install/ "MongoDB Compass"
[4]:	https://www.npmjs.com/package/mongodb "MongoDB driver"
[5]:	https://www.npmjs.com/package/mongoose "Mongoose"