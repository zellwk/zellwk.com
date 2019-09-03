---
layout: post
title: Seeding a database
description: The process where you add initial content to a database is called seeding. Here, I teach you how to seed a database automatically. 
slug: seed-database
tags:
  - javascript
  - express
  - node
  - testing
series: endpoint-testing
---

When you write tests for the backend, you need to test for four different kinds of operations: 

1. Create (for adding things to the database)
2. Read (for getting things from the database)
3. Update (for changing the database)
4. Delete (for deleting things from the database) 

The easiest type to test for is create operations. You put something into the database and test whether it's there.

For the other three types of operations, you need to put something into the database *before* you write the test. 

<!-- more -->

## Putting things into the database

The process where you add initial content to a database is called **seeding**. 

Let's say you want to add three users to the database. These users contain a name and an email address. 

```js
const users = [{
  name: 'Zell', 
  email: 'testing1@gmail.com'
}, {
  name: 'Vincy', 
  email: 'testing2@gmail.com'
}, {
  name: 'Shion', 
  email: 'testing3@gmail.com'
}]
```

You can use your models to seed the database at the start of the test. 

```js
const User = require('../model/User') // Link to User model 

it('does something', async done => {
  // Add users to the database
  for (const u of users) {
    const user = new User(u)
    await user.save()
  }

  // Create the rest of your test here
})
```

If you need these users for every test, the best way is to add them through the `beforeEach` hook. The `beforeEach` hook runs before every `it` declaration. 

```js
// Seed the database with users
beforeEach(async () => {
  for (u of users) {
    const user = new User(u)
    await user.save()
  }
})
```

You can also use Mongoose's `create` function to do the same thing. It runs `new Model()` and `save()`, so the code below and the one above does the same thing. 

```js
// Seed the database with users
beforeEach(async () => {
  await User.create(users)
})
```

## create vs insertMany

Mongoose has a second method to help you seed the database. This method is called `insertMany`. `insertMany` is faster than `create`, because: 

- `insertMany` sends one operation to the server
- `create` sends one operation for each document

However, `insertMany` does not run the `save` middleware. 

### Is triggering the save middleware important?

This depends on your seed data. If your seed data needs to go through the `save` middleware, you need to use `create`. For example, let's say you want to save a user's password into the database. You have this data: 

```js
const users = [{
  name: 'Zell', 
  email: 'testing1@gmail.com',
  password: '12345678'
}, {
  name: 'Vincy', 
  email: 'testing2@gmail.com',
  password: '12345678'
}, {
  name: 'Shion', 
  email: 'testing3@gmail.com',
  password: '12345678'
}]
```

When we save a user's password into the database, we want to hash the password for security reasons. We usually hash the password through the `save` middleware. 

```js
// Hashes password automatically
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword =  bcrypt.hashSync(password, salt)
  this.password = hashedPassword
})
```

If you use `create`, you'll get users with hashed passwords: 

<figure role="figure"><img src="/images/2019/seed-database/create.png" alt="Create runs the save middleware."></figure>

If you use `insertMany`, you'll get users without hashed passwords: 

<figure role="figure"><img src="/images/2019/seed-database/insert-many.png" alt="InsertMany does not run the save middleware."></figure>

### When to use create, when to use insertMany

Since `insertMany` is faster than `create`, you want to use `insertMany` whenever you can. 

Here's how I do it: 

1. If seed data does not require the `save` middleware, use `insertMany`. 
2. If seed data requires `save` middleware, use `create`. Then, overwrite seed data so it no longer requires the `save` middleware. 

For the password example above, I would run `create` first. Then, I copy-paste the hashed password seed data. Then, I'll run `insertMany` from this point onwards. 

If you want to overwrite complicated seed data, you might want to get JSON straight from MongoDB. To do this, you can use `mongoexport`: 

```js
mongoexport --db <databaseName> --collection <collectionName> --jsonArray --pretty --out output.json
```

This says: 

1. Export `<collection>` from `<databaseName>` 
2. Creates output as a JSON Array, prettified, in a file called `output.json`. This file will be placed in the folder where you run the command. 

## Seeding multiple test files and collections

You want a place to store your seed data so you can use them across all your tests and collections. Here's a system I use: 

1. I name my seed files according to their models. I seed a `User` model with the `user.seed.js` file. 
2. I put my seed files in the `seeds` folder
3. I loop through each seed file to seed the database.

To loop through each seed file, you need to use the `fs` module. `fs` stands for filesystem. 

The easiest way to loop through the files is to create an `index.js` file in the same `seeds` folder. Once you have the `index.js` file, you can use the following code to look for all files with `*.seed.js`

```js
const fs = require('fs')
const util = require('util')

// fs.readdir is written with callbacks. 
// This line converts fs.readdir into a promise
const readDir = util.promisify(fs.readdir)

async function seedDatabase () {
  // Gets list of files in the directory
  // `__dirname` points to the `seeds/` folder
  const dir = await readDir(__dirname)

  // Gets a list of files that matches *.seed.js
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'))
}
```

Once you have a list of seed files, you can loop through each seed file to seed the database. Here, I use a `for...of` loop to keep things simple. 

```js
async function seedDatabase () {
  for (const file of seedFiles) {
    // Seed the database
  } 
}
```

To seed the database, we need to find the correct Mongoose model from the name of the seed file. A file called `user.seed.js` should seed the `User` model. This means: 

1. We must find `user` from `user.seed.js`
2. We must capitalize `user` into `User`

Here's a crude version that does what's required. (If you want to, you can make the code more robust with regex instead of `split`). 

```js
for (const file of seedFiles) {
  const fileName = file.split('.seed.js')[0]
  const modelName = toTitleCase(fileName)
  const model = mongoose.models[modelName]
}
```

Next, we want to make sure each file has a Model that corresponds to it. If the model cannot be found, we want to throw an error. 

```js
for (const file of seedFiles) {
  //...
  if (!model) throw new Error(`Cannot find Model '${modelName}'`)
}
```

If there's a corresponding model, we want to seed the database with the contents in the seed file. To do this, we need to read the seed file first. Here, since I used the `.js` extension, I can simply require the file. 

```js
for (const file of seedFiles) {
  //...
  const fileContents = require(path.join(__dirname, file))
}
```

For this to work, my seed files must export an array of data. 

```js
module.exports = [{
  name: 'Zell',
  email: 'testing1@gmail.com',
  password: '12345678'
}, {
  name: 'Vincy',
  email: 'testing2@gmail.com',
  password: '12345678'
}, {
  name: 'Shion',
  email: 'testing3@gmail.com',
  password: '12345678'
}]
```

Once I have the contents of the seed file, I can run `create` or `insertMany`. 

```js
async function seedDatabase (runSaveMiddleware = false) {
  // ...
  for (const file of seedFiles) {
    // ... 

    runSaveMiddleware
      ? model.create(fileContents)
      : model.insertMany(fileContents)
  } 
}
```

Here's the whole `seedDatabase` code: 

```js
const fs = require('fs')
const util = require('util')
const readDir = util.promisify(fs.readdir).bind(fs)
const path = require('path')
const mongoose = require('mongoose')

function toTitleCase (str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

async function seedDatabase (runSaveMiddleware = false) {
  const dir = await readDir(__dirname)
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'))

  for (const file of seedFiles) {
    const fileName = file.split('.seed.js')[0]
    const modelName = toTitleCase(fileName)
    const model = mongoose.models[modelName]

    if (!model) throw new Error(`Cannot find Model '${modelName}'`)
    const fileContents = require(path.join(__dirname, file))

    runSaveMiddleware
      ? await model.create(fileContents)
      : await model.insertMany(fileContents)
  }
}
```


## Why JS, not JSON?

It's the industry norm to use JSON to store data. In this case, I find it easier to use JavaScript objects because: 

1. I don't have to write opening and closing double-quotes for each property. 
2. I don't have to use double-quotes at all! (It's easier to write single-quotes because there's no need to press the shift key). 

```js
// Which is easier to write. JavaScript objects or JSON? 

// JavaScript objects 
module.exports = [{
  objectName: 'property'
}]

// JSON
[{
  "objectName": "property"
}]
```

If you want to use JSON, make sure you change `seedDatabase` to work with JSON. (I'll let you work through the code yourself).  

## Adjusting the setupDB function  

In the [previous article][1], I created a `setupDB` function to help set up databases for my tests. `seedDatabase` goes into the `setupDB` function since seeding is part of the setting up process.  

```js
async function seedDatabase (runSaveMiddleware = false) {
  // ...
}

module.exports = {
  setupDB (databaseName, runSaveMiddleware = false) {
    // Connect to Mongoose
    beforeAll(/*...*/)

    // Seed Data 
    beforeEach(async () => {
      await seedDatabase(runSaveMiddleware)
    })

    // Cleans up database between each test
    afterEach(/*...*/)

    // Disconnect Mongoose
    afterAll(/*...*/)
  }
}
```

## A Github Repository

I created a [Github repository][2] to go with this three-part testing series. I hope this demo code helps you start testing your applications. 

[1]:	/blog/jest-and-mongoose
[2]:	https://github.com/zellwk/endpoint-testing-example "Endpoint testing example"
