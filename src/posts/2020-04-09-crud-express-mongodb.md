---
title: Building a Simple CRUD app with Node, Express, and MongoDB
description: Mega walkthrough on what CRUD, Express, MongoDB are. And how to use them to build a simple web application.
layout: post
slug: crud-express-mongodb
tags:
  - best
  - node
  - mongodb
  - express
  - javascript
newsletter: CUCrud
---

I finally understood how to work with Node, Express, and MongoDB. I want to write a comprehensive tutorial so you won't have to go through the same headache I went through.

<!--more-->

## CRUD, Express and MongoDB

CRUD, Express and MongoDB are big words for a person who has never touched any server-side programming in their life. Let's quickly introduce what they are before we diving into the tutorial.

**[Express][1] is a framework for building web applications on top of [Node.js][2]**. It simplifies the server creation process that is already available in Node. In case you were wondering, Node allows you to use JavaScript as your server-side language.

**[MongoDB][3] is a database**. This is the place where you store information for your websites (or applications).

**[CRUD][4] is an acronym for Create, Read, Update and Delete**. It is a set of operations we get servers to execute (`POST`, `GET`, `PUT` and `DELETE` requests respectively). This is what each operation does:

- **Create (POST)** - Make something
- **Read (GET)**- Get something
- **Update (PUT)** - Change something
- **Delete (DELETE)**- Remove something

`POST`, `GET`, `PUT`, and `DELETE` requests let us construct [Rest APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/).

If we put CRUD, Express and MongoDB together into a single diagram, this is what it would look like:

<figure><img src="/images/2020/crud/crud-express-mongo.png" alt="">
</figure>

Does CRUD, Express and MongoDB makes more sense to you now?

Great. Let's move on.

## We'll build a simple application together

Let's build a simple application that lets you track a list of quotes from Star Wars Characters. Here's what it looks like:

<figure role="figure">
  <img src="/images/2020/crud/looks.png" alt="Add CSS to make the app look better.">
</figure>

Free free to check out the [demo][5] before continuing with this tutorial.

:::note
This article is LONG! Remember to **grab the source code by leaving your name and email address in [this form][6]**. I'll also send you this article in PDF so you can read it at your leisure.
:::

By the way, I'm not going to focus on the styles since we're focusing on learning Crud, Express, and MongoDB in this tutorial.

## Prerequisites

You'll need two things to get started with this tutorial:

1. You are not afraid of typing commands into a Command Line. If you're afraid, use [this article to get over your fear][7].
2. You need to have [Node][8] installed.

To check if you have Node installed, open up your Command Line and run the following code:

```bash
$ node -v
```

<figure role="figure">
  <img src="/images/2020/crud/node-version.png" alt="Node version">
</figure>

You should get a version number if you have Node installed. If you don't, you can install Node either by downloading the installer from [Node's website][9] or downloading it through package managers like [Homebrew][10] (Mac) and [Chocolatey][11] (Windows).

## Getting started

Start by creating a folder for this project. Feel free to call it anything you want. After you've created the folder, navigate into it with the Terminal and run `npm init`.

`npm init` creates a `package.json` file which helps you manage dependencies (which we will install as we go through the tutorial).

```bash
$ npm init
```

<figure role="figure">
  <img src="/images/2020/crud/npm-init.png" alt="npm init.">
</figure>

Just hit enter through everything that appears. I'll talk about the ones you need to know as we go along.

## Running Node for the first time in your life

The simplest way to use node is to run the `node` command, and specify a path to a file. Let's create a file called `server.js` to run node with.

```bash
touch server.js
```

Next, put this a `console.log` statement into `server.js`. This lets us know whether Node is running properly.

```javascript
// server.js
console.log('May Node be with you')
```

Now, run `node server.js` in your command line and you should see this:

<figure>
  <img src="/images/2020/crud/node-log.png" alt="Logged May Node be with you.">
</figure>

Great. Node works. The next step is to learn to use Express.

## Using Express

First, we have to install Express. We can do this by running the `npm install` command. (`npm` is installed with Node, which is why you use commands like `npm init` and `npm install`).

Run `npm install express --save` command in your command line.

:::note
The `--save` flag saves `express` as a `dependency` in `package.json`. It's important to know these dependencies because `npm` can retrieve dependencies with another `npm install` command when you need it later.
:::

```bash
npm install express --save
```

<figure>
  <img src="/images/2020/crud/exp-dependency.png" alt="Saved express as a dependency">
</figure>

Next, we use express in `server.js` by requiring it.

```javascript
const express = require('express');
const app = express();
```

We need to create a server that browsers can connect to. We do this by using the Express's `listen` method.

```javascript
app.listen(3000, function() {
  console.log('listening on 3000')
})
```

Now, run `node server.js` and navigate to `localhost:3000` on your browser. You should see a message that says `cannot get /`.

<figure>
  <img src="/images/2020/crud/cannot-get.png" alt="Cannot get /.">
</figure>

That's a good sign. It means **we can now communicate to our express server through the browser**. This is where we begin CRUD operations.

## CRUD - READ

Browsers perform the **READ** operation when you visit a website. Under the hood, they send a **GET** request to the server to perform this READ operation.

You see `cannot get /` because our server sent nothing back to the browser.

In Express, we handle a **GET** request with the `get` method:

```javascript
app.get(endpoint, callback)
```

**`endpoint` is the requested endpoint.** It's the value that comes after your domain name. Here are some examples:

- When you visit `localhost:3000`, you're actually visiting `localhost:3000/`. In this case, browsers requested for `/`.
- You're reading this article on `https://zellwk.com/blog/crud-express-mongodb/`. The domain name is `zellwk.com`. The requested endpoint is anything that comes after `zellwk.com` (which is `/blog/crud-express-mongodb`).

`callback` tells the server what to do when the requested endpoint matches the endpoint stated. It takes two arguments: A `request` object and a `response` object.

```javascript
// We normally abbreviate `request` to `req` and `response` to `res`.
app.get('/', function (req, res) {
  // do something here
})
```

For now, let's write `Hello World` back to the browser. We do so by using a `send` method that comes with the `response` object:

```javascript
app.get('/', function(req, res) {
  res.send('Hello World')
})
```

I'm going to start writing in ES6 code and show you how to convert to ES6 along the way as well. First off, I'm replacing `function()` with an [ES6 arrow function][12]. The below code is the same as the above code:

```javascript
app.get('/', (req, res) => {
  res.send('Hello World')
})
```

Now, restart your server by doing the following:

1. Stop the current server by hitting `CTRL + C` in the command line.
2. Run `node server.js` again.

Then, navigate to `localhost:3000` on your browser. You should be able to see a string that says "Hello World".

<figure>
  <img src="/images/2020/crud/get-hello-world.png" alt="">
</figure>

Great.

Next, let's change `server.js` so we serve up an `index.html` page back to the browser. To do this, we use the `sendFile` method that's provided by the `res` object.

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
```

In the `sendFile` method above, we told Express to serve an `index.html` file that can be found in the root of your project folder. We don't have that file yet. Let's make it now.

```bash
touch index.html
```

Let's put some text in our `index.html` file as well:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>
  <h1> May Node and Express be with you. </h1>
</body>
</html>
```

Restart your server and refresh your browser. You should be able to see your HTML file now.

<figure>
  <img src="/images/2020/crud/get-index.png" alt="The HTML file.">
</figure>

This is how Express handles a **GET** request (**READ** operation) in a nutshell.

At this point, you probably have realized that you need to restart your server whenever you make a change to `server.js`. This is process is incredibly tedious, so let's take a quick detour and streamline it by using a tool called [nodemon][13].

## Enter Nodemon

**Nodemon restarts the server automatically** when you save a file that's used by the `server.js`. We can install Nodemon with the following command:

```bash
$ npm install nodemon --save-dev
```

:::note
We use a `--save-dev` flag here because we only use Nodemon when we are developing stuff. We won't use Nodemon on an actual server. `--save-dev` here adds Nodeman as a `devDependency` in the `package.json` file.
:::

<figure role="figure">
  <img src="/images/2020/crud/nodemon-dev-dep.png" alt="Saved Nodemon as a dev dependency.">
</figure>

Nodemod behaves like Node. So you can run `nodemon server.js` and you'd expect to see the same thing. Unfortunately, this only works if you've installed nodemon globally with the `-g` flag (and we didn't do this).

We have other ways to run Nodemon. For example, you can execute Nodemon directly from the `node_modules` folder. This is super unweildy, but it works:

```bash
./node_modules/.bin/nodemon server.js
```

We can make things simpler by adding ` script` key in the `package.json` file. This lets us run `nodemon server.js` without the `./node_modules...` preamble.

```javascript
{
  // ...
  "scripts": {
    "dev": "nodemon server.js"
  }
  // ...
}
```

Now, you can run `npm run dev` to trigger `nodemon server.js`.

<figure role="figure">
  <img src="/images/2020/crud/nodemon-server.png" alt="Uses npm run dev to run nodemon server.js">
</figure>

Back to the main topic. We're going to cover the **CREATE** operation next.

## CRUD - CREATE

Browsers can only perform a **CREATE** operation if they send **POST**  request to the server. This `POST` request can be triggered through JavaScript or through a `<form>` element.

Let's figure out how to use a `<form>` element to create new entries for this Star Wars quote application for now. We'll examine how to send requests via JavaScript later.

To send a POST request through a `<form>`, you need to add the `<form>` element to your `index.html` file.

You need three things on this form element:

1. An `action` attribute
2. A `method` attribute
3. `name` attributes on each `<input>` elements within the form

```html
<form action="/quotes" method="POST">
  <input type="text" placeholder="name" name="name">
  <input type="text" placeholder="quote" name="quote">
  <button type="submit">Submit</button>
</form>
```

The `method` tells browsers what kind of request to send. In this case, we use `POST` because we're sending a `POST` request.

The `action` attribute tells the browser where to send the `POST` request. In this case, we're send the `POST` request to `/quotes`.

We can handle this `POST` request with a `post` method in `server.js`. The `path` path should be the value you placed in the `action` attribute.

```js
app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})
```

Restart your server (hopefully you've set up Nodemon so it restarts automatically) and refresh your browser. Then, enter something into the `<form>` element and submit the form. Next, look at your command line. You should see `Hellooooooooooooooooo!` in your command line.

<figure>
  <img src="/images/2020/crud/post-log.png" alt="Logs helloooo in the command line.">
</figure>

Great, we know that Express is handling the form for us right now. The next question is, how do we get the input values with Express?

Turns out, Express doesn't handle reading data from the `<form>` element on it's own. We have to add another package called [body-parser][14] to gain this functionality.

```bash
npm install body-parser --save
```

Body-parser is a **middleware**. They help to tidy up the `request` object before we use them. Express lets us use middleware with the `use` method.

```js
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// All your handlers here...
app.get('/', (req, res) => {/*...*/})
app.post('/quotes', (req, res) => {/*...*/})
```

The `urlencoded` method within body-parser tells body-parser to extract data from the `<form>` element and add them to the `body` property in the `request` object.

You should be able to see values from the `<form>` element inside  `req.body`  now. Try doing a `console.log` and see what it is!

```js
app.post('/quotes', (req, res) => {
  console.log(req.body)
})
```

You should see an object similar to the following:

<figure><img src="/images/2020/crud/post-log-req-body.png" alt="Logs the request body."></figure>

Hmmm.

Master Yoda has spoken! Let's make sure we remember Yoda's words. It's important. We want to be able to retrieve it the next time we load our index page.

Enter the database, MongoDB.

## MongoDB

MongoDB is a database. We can store information into this database to remember Yoda's words. Then, we can retrieve this information and display to people who view our app.

:::note
I normally use [Mongoose][15] (which is a framework for MongoDB) when I use MongoDB. I'll teach you how to use basic MongoDB in this article. If you want to learn Mongoose, consider reading [my article on Mongoose][16].
:::

First, we need to install MongoDB via npm.

```bash
npm install mongodb --save
```

Once installed, we can connect to MongoDB through the `MongoClient`'s connect method as shown in the code below:

```javascript
const MongoClient = require('mongodb').MongoClient
```

```javascript
MongoClient.connect('mongodb-connection-string', (err, client) => {
  // ... do something here
})
```

The next part is to get the correct link to our database. Most people store their databases on cloud services like [MongoDB Atlas][17]. We're going to do same as well. (It's free).

:::note
You can also create a database on your computer for development work. Read "[How to setup a local MongoDB Connection][18]" for instructions.
:::

### Setting up MongoDB Atlas

Go ahead and [create an account on MongoDB Atlas][19]. Once you're done,  you need to create an "Organization". It's sort of like a company name. You can name it anything you want. (You can change it later).

<figure role="figure">
  <img src="/images/2020/crud/atlas-create-org.png" alt="Creates an Atlas Organization">
</figure>

You also need to select a cloud service. Go ahead with MongoDB Atlas in this case.

<figure>
  <img src="/images/2020/crud/atlas-select-cloud.png" alt="Selects a cloud service.">
</figure>

Next, you need to set permissions for users. MongoDB Atlas will automatically fill up your current email address as the user. So just continue to the next step.

You should end up with a screen that looks like this:

<figure role="figure">
  <img src="/images/2020/crud/atlas-projects.png" alt="Atlas project screen.">
</figure>

Next, you need to create a Database in MongoDB Atlas. There are several steps to do this.

First, you need to create a new Project. You can do this by going under "Context" in the top left hand menu. Click the Dropdown. Then, select New Project.

<figure role="figure">
  <img src="/images/2020/crud/atlas-cp.png" alt="Creating a new project.">
</figure>

Next, you will need to name your project. Call it anything you want. I'm going to call this `star-wars`.

<figure role="figure">
  <img src="/images/2020/crud/atlas-cp-name-project.png" alt="Naming the project.">
</figure>

Then, you will need to add members. Again, you're already added so go ahead and click "Create Project" to move on.

You should end up with a screen that says Create a Cluster.

<figure role="figure">
  <img src="/images/2020/crud/atlas-cluster.png" alt="Create Cluster Screen.">
</figure>

Click on "Build a Cluster". You should see this screen:

<figure role="figure">
  <img src="/images/2020/crud/atlas-cc.png" alt="Selecting a cluster">
</figure>

Select the free cluster (left option) and continue. You should now see a screen to configure a cluster. Scroll down. Make sure you see these two things:

1. Cluster Tier is M0 Sandbox
2. Monthly Estimate is FREE

<figure role="figure">
  <img src="/images/2020/crud/atlas-cc-m0.png" alt="Configured the cluster.">
</figure>

Click on Create cluster next. You should see "Your cluster is being created".

<figure role="figure">
  <img src="/images/2020/crud/atlas-cc-creating.png" alt="Creating cluster.">
</figure>

You have to wait for approximately 5 minutes for the cluster creation. When the cluster is ready, you'll see this:

<figure role="figure">
  <img src="/images/2020/crud/atlas-cc-ready.png" alt="Cluster ready">
</figure>

Now, we need to connect our Star Wars app with this cluster.

### Connecting to MongoDB Atlas

Click on the Connect button.

<figure role="figure">
  <img src="/images/2020/crud/atlas-connect.png" alt="Connect button.">
</figure>

A modal should pop up.

<figure role="figure">
  <img src="/images/2020/crud/atlas-connect-modal.png" alt="Connection modal.">
</figure>

You need to whitelist your IP address before you can connect to your cluster. This is a security feature built into MongoDB Atlas. Go ahead and click "Add your Current IP Address".

<figure role="figure">
  <img src="/images/2020/crud/atlas-connect-add-ip.png" alt="Adds IP address.">
</figure>

Next, you need to create a MongoDB user. This username and password is different from the one you used to login to MongoDB Atlas. This username and password is used ONLY for the database.

Make sure you remember MongoDB user and password. We'll use it to connect to the database.

<figure role="figure">
  <img src="/images/2020/crud/atlas-connect-mongodb-user.png" alt="MongoDB User.">
</figure>

Next, click on choose your connection method. Select "Connect to your application" and copy the connection string.

<figure role="figure">
  <img src="/images/2020/crud/atlas-connect-method.png" alt="Choosing a connection method.">
</figure>

<figure role="figure">
  <img src="/images/2020/crud/atlas-connection-string.png" alt="Copy the connection string.">
</figure>

The connection string should look something like this:

```js
'mongodb+srv://<username>:<password>@<clustername>-rmp3c.mongodb.net/test?retryWrites=true&w=majority'
```

You need to replace 2 things here:

1. Replace `<username>` with your Database username
2. Replace `<password>` with the Database user's password

:::note
The `test` in the connection string points to a `test` database. You would need to replace `test` with the name of your database if you use Mongoose. You can leave it as `test` if you use MongoClient like what we're doing in this tutorial.
:::

Put this connection string inside the `MongoClient.connect`.

```js
MongoClient.connect(connectionString, (err, client) => {
  // ... do something here
}))
```

We know we've connected to the database if there are no errors. Let's create `console.log` statement that says "Connected to database". This will help us know we've connected to the database when we restart the server.

```javascript
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})
```

You should see something like this:

<figure role="figure">
  <img src="/images/2020/crud/connected.png" alt="Connected to database.">
</figure>

You can remove the deprecation warning by adding the option into `MongoClient.connect`

```javascript
MongoClient.connect(connectionString, {
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
})
```

<figure role="figure">
  <img src="/images/2020/crud/connect-no-deprecation-warnings.png" alt="Connection without deprecation warning.">
</figure>

MongoDB supports promises. If you want to use promises instead of callbacks, you can write `MongoClient.connect` like this. It behaves exactly like the code above.

```javascript
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
  })
  .catch(error => console.error(error))
```

:::note
Read [this article][20] if you want to learn about promises in JavaScript.
:::

### Changing the Database

We need to change the database from `test` to something else. You can name it anything you want. I chose name my new database `star-wars-quotes` because it helps me remember what I'm building.

```javascript
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
  })
```

### MongoDB and Server

We need the `db` variable from the connection to to access MongoDB. This means we need to put our express request handlers into the MongoClient's `then` call.

```js
MongoClient.connect(/* ... */)
  .then(client => {
    // ...
    const db = client.db('star-wars-quotes')
    app.use(/* ... */)
    app.get(/* ... */)
    app.post(/* ... */)
    app.listen(/* ... */)
  })
  .catch(console.error)
```

We can finally store Yoda's quote into the database now!

## CRUD - CREATE (continued)

We need to create a `collection` before we can store items into a database. Here's a simple analogy to help you clear up the terms in MongoDB:

- Imagine a Database is a Room.
- A Room contains boxes (`collections`).

Like Databases, you can name collections anything you want. In this case, let's store quotes into a `quotes` collection. We use `db.collection` to specify the collection.

```js
MongoClient.connect(/* ... */)
  .then(client => {
    // ...
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // ...
  })
```

We can use the `insertOne` method to add items into a MongoDB collection.

```js
app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
})
```

Try submitting the `<form>` from the browser. You should see a big scary looking `result` in the Terminal.

<figure role="figure">
  <img src="/images/2020/crud/post-result.png" alt="Post result.">
</figure>

If you see this, congratulations! You've successfully add the quote into the database.

You can check the items inside the database by going to "Collections" in MongoDB Atlas.

<figure role="figure">
  <img src="/images/2020/crud/atlas-collections.png" alt="Collections in MongoDB Atlas.">
</figure>

You should see a document in your database. (Each database entry is called a document).

<figure role="figure">
  <img src="/images/2020/crud/atlas-collection-view.png" alt="Documents in MongoDB Atlas.">
</figure>

If you go back to the Browser, you'll see it's still trying to load something.

<figure role="figure">
  <img src="/images/2020/crud/post-loading.png" alt="Browser still trying to load a page.">
</figure>

This happens because the browser expects something back from the server.

In this case, we don't need to send the browser information. Let's ask the browser to redirect back to `/` instead. We do this with `res.redirect`.

```js
app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})
```

<figure role="figure">
  <img src="/images/2020/crud/post-redirected.png" alt="Redirected. Browser is no longer waiting to load something.">
</figure>

Yay!

Since we have some quotes in the collection, let's show them to our user when they land on the page!

## Showing quotes to users (READ operation)

We need to do two things to show quotes from MongoDB Atlas to our users.

1. Get quotes from MongoDB Atlas.
2. Rendering the quotes in HTML with a template engine

Let's go one step at a time.

### Getting quotes from MongoDB

We can get quotes we stored in MongoDB with the `find` method. This method from mLab by using the `find` method that's available in the `collection` method.

```javascript
app.get('/', (req, res) => {
  const cursor = db.collection('quotes').find()
  console.log(cursor)
  // ...
})
```

The `find` method returns a `cursor` which won't make sense if you tried logging it.

<figure>
  <img src="/images/2020/crud/cursor.png" alt="Cursor object from MongoDB">
</figure>

But this `cursor` object contains all quotes from our database! It has a bunch of method that lets us get our data. For example, we can use `toArray` to convert the data into an array.

```javascript
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))
  // ...
})
```

<figure>
  <img src="/images/2020/crud/mongodb-get.png" alt="">
</figure>

Great! We see the quotes we added! (You see so many of the same quotes because I added them all when writing this tutorial 😆).

Next we want to generate a HTML that contains all our quotes.

### Rendering the HTML

We cannot serve up the `index.html` file and expect quotes to magically appear because there's no way to add dynamic content to a HTML file.

What we can do, instead, is to use a template engine to generate the HTML. Popular template engines include [Pug][21], [Embedded JavaScript][22], and [Nunjucks][23].

:::note
I've wrote extensively about the how and why of template engines in a [separate post][24]. You might want to check it out if you have no idea what template engines are.

I use Nunjucks as my template engine of choice. Feel free to check out the post to find out why.
:::

For this tutorial, we will use [Embedded JavaScript][25] (EJS) as our template engine because it's the easiest to start with. You'll find it familiar from the get-go since you'll be writing HTML and JavaScript.

### Using EJS

First, we need to install EJS.

```bash
npm install ejs --save
```

Next, we need to set `view engine` to `ejs`. This tells Express we're using EJS as the template engine. You can need to place it before any `app.use`, `app.get` or `app.post` methods.

```javascript
app.set('view engine', 'ejs')

// Middlewares and other routes here...
```

**We can now generate HTML that contains the quotes**. This process is called **rendering** the HTML.

We will use the `render` method built into Express's `response`. It needs to follow the following syntax:

```javascript
res.render(view, locals)
```

- `view` is the name of the file we're rendering. This file must be placed inside a `views` folder.
- `locals`is the data passed into the file.

Let's create a view. We'll make an `index.ejs` file inside the views folder.

```bash
mkdir views
touch views/index.ejs
```

We'll copy/paste everything from `index.html` into `index.ejs`.

```html
<!-- index.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Star Wars Quote App</title>
  </head>

  <body>
    <h1>May Node and Express be with you.</h1>

    <form action="/quotes" method="POST">
      <input type="text" placeholder="name" name="name" />
      <input type="text" placeholder="quote" name="quote" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

Next, we'll use `res.render` to render this `index.ejs` file.

```javascript
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
    .then(/* ... */)
    .catch(/* ... */)
  res.render('index.ejs', {})
})
```

If you refresh the page, you should still see the same thing. Nothing should change, nothing should break.

<figure role="figure">
  <img src="/images/2020/crud/get-ejs.png" alt="Renders an ejs file.">
</figure>

Let's put the quotes into `index.ejs`. To do this, we need to pass the quotes into the `render` method.

```js
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results })
    })
    .catch(/* ... */)
})
```

In `index.ejs`, we can use place variables between `<%=` and `%>` tags. Let's try putting `quotes` into the HTML:

```html
<!-- In index.ejs -->
<body>
  <h1> ... </h1>
  <form> ... </form>
  <%= quotes %>
</body>
```

You should see this:

<figure role="figure">
  <img src="/images/2020/crud/ejs-quotes.png" alt="Rendered quotes in EJS.">
</figure>

We see lots of `[object Object]` because each quote inside `results` is a JavaScript object. `ejs` cannot convert that object into HTML automatically.

We need to loop through the quotes. We can do this with a `for` loop. In EJS, we write a for loop like how we write a JavaScript `for` loop. The only difference is we need to put the `for` loop statements between `<%` and `%>`.

```html
<h2> Quotes </h2>

<ul class="quotes">
  <!-- Loop through quotes -->
  <% for(var i = 0; i < quotes.length; i++) {%>
    <li class="quote">
      <!-- Output name from the iterated quote object -->
      <span><%= quotes[i].name %></span>:
      <!-- Output quote from the iterated quote object -->
      <span><%= quotes[i].quote %></span>
    </li>
  <% } %>
</ul>
```

<figure role="figure">
  <img src="/images/2020/crud/ejs-rendered-quotes.png" alt="Rendered quotes with EJS.">
</figure>

## CRUD - UPDATE

We use the **UPDATE** operation when we want to change something. It can be triggered with a **PUT** request. Like `POST`, `PUT` can be triggered either through JavaScript or through a `<form>` element.

Let's switch things up and use JavaScript since you already know how to use `<form>` elements.

For this update operation, we will create a button that replaces the first quote by Yoda to something written by Darth Vadar.

To do this, we need to add a `button` into the `index.ejs` file:

```html
<div>
  <h2>Darth Vadar invades!</h2>
  <p>
    Replace first Yoda's quote with a quote written by Darth Vadar
  </p>
  <button id="update-button">Replace Yoda's quote</button>
</div>
```

<figure role="figure">
  <img src="/images/2020/crud/put-ejs.png" alt="Add update section to HTML.">
</figure>

We will also create an external JavaScript file to execute a `PUT` request. According to Express conventions, this JavaScript is kept in a folder called `public`

```bash
$ mkdir public
$ touch public/main.js
```

Then, we have to tell Express to make this `public` folder accessible to the public by using a built-in middleware called `express.static`

```javascript
app.use(express.static('public'))
```

We now can add the `main.js` file to the `index.ejs` file:

```html
<body>
  <!-- ... -->
  <script src="/main.js"></script>
</body>
```

We will send a `PUT` request when the button gets clicked. This means we need to listen to a `click` event.

Next, we're going to send the **PUT** request when the button is clicked:

```js
// main.js
const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  // Send PUT Request here
})
```

### Sending a PUT Request

The easiest way to trigger a **PUT** request in modern browsers is to use the [Fetch API][26].

Fetch has the following syntax:

```js
fetch(endpoint, options)
```

In this case, let's say we want to send the request to `/quotes`. We'll set `endpoint` to `/quotes`.

```js
update.addEventListener('click', _ => {
  fetch('/quotes', {/* ... */})
})
```

We need to send a `PUT` request this time. We can do this by setting Fetch's method to `put`.

```js
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put'
  })
})
```

Modern applications send JSON data to servers. They also receive JSON data back to servers. JSON stands for JavaScript Object Notation. They're like JavaScript objects, but each property and value are written between two quotation marks.

Here's an example of JavaScript data:

```js
const data = {
  name: 'Darth Vadar',
  quote: 'I find your lack of faith disturbing.'
}
```

And what its JSON counterpart looks like. (Notice how everything is wrapped between two `"`).

```js
{
  "name": "Darth Vadar",
  "quote": "I find your lack of faith disturbing."
}
```

We need to tell the server we're sending JSON data by setting the `Content-Type` headers to `application/json`.

```js
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
  })
})
```

Next, we need to convert the data we send into JSON. We can do this with `JSON.stringify`. This data is passed via the `body` property.

```js
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar',
      quote: 'I find your lack of faith disturbing.'
    })
  })
})
```

### Accepting the PUT request

Our server doesn't accept JSON data yet. We can teach it to read JSON by adding the `body-parser`'s `json` middleware.

```javascript
app.use(bodyParser.json())
```

Next, we can handle the `PUT` request with a `put` method. You should be able to see the values we send from the fetch request.

```javascript
app.put('/quotes', (req, res) => {
  console.log(req.body)
})
```

<figure role="figure">
  <img src="/images/2020/crud/put-body.png" alt="Put request body">
</figure>

The next step is to change the Yoda's first quote to this quote by Darth Vadar.

### Changing Yoda's quote

MongoDB Collections come with a method called `findOneAndUpdate`. This method lets us find and change one item in the database. It has the following syntax:

```javascript
quotesCollection.findOneAndUpdate(
  query,
  update,
  options
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

`query` lets us filter the collection with key-value pairs. If we want to filter quotes to those written by Yoda, we can set `{ name: 'Yoda' }` as the query.

```javascript
quotesCollection.findOneAndUpdate(
  { name: 'Yoda' },
  update,
  options
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

`update`, tells MongoDB what to change. It uses MongoDB's [update operators][27] like `$set`, `$inc` and `$push`.

We will use the `$set` operator since we're changing Yoda's quotes into Darth Vadar's quotes:

```javascript
quotesCollection.findOneAndUpdate(
  { name: 'Yoda' },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  options
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

`options` tells MongoDB to define additional options for this update request.

In this case, it's possible that no Yoda quotes exist in the database. We can force MongoDB to create a new Darth Vadar quote if no Yoda quotes exist. We do this by setting `upsert` to `true`. `upsert` means: Insert a document if no documents can be updated.

```javascript
quotesCollection.findOneAndUpdate(
  { name: 'Yoda' },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    upsert: true
  }
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

Finally, let's log the `result` into the command line.

```javascript
app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(/* ... */)
    .then(result => {
      console.log(result)
     })
    .catch(error => console.error(error))
}
```

Try clicking the "replace first Yoda quote" button in the browser. You should see this result in your command line. This says we changed one of Yoda's quote.

<figure role="figure">
  <img src="/images/2020/crud/put-result.png" alt="Put result.">
</figure>

If you refresh the browser, you should see Darth Vadar's quote as the first quote.

<figure role="figure">
  <img src="/images/2020/crud/put-check.png" alt="Checking the HTML after a PUT request.">
</figure>

:::note
Does the `findOneAndUpdate` look complicated to you? Well, It IS complicated. This is why I use Mongoose instead of MongoDB. You can find out more about Mongoose in [this article][28].
:::

Finally, we need to respond to the JavaScript that sent the `PUT` request. In this case, we'll simply send the `success` message.

```javascript
app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(/* ... */)
    .then(result => {
       res.json('Success')
     })
    .catch(error => console.error(error))
}
```

Next, we can handle the response from the server via a `then` object. (We do this because `fetch` returns a promise). However, Fetch is slightly different from most promises. You need to use another `then` object to get the response from the server.

Here's what you should do:

```javascript
fetch({ /* request */ })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    console.log(response)
  })
```

You should be able to see a `Success` message from the server in the console.

<figure role="figure">
  <img src="/images/2020/crud/put-response.png" alt="Response from the server.">
</figure>

:::note
I wrote an [article on the Fetch API][29] if you're wondering why we need two `then` calls. Give it a read! It'll help cement your understanding.
:::

If you are working on a fancy webapp, you can use JavaScript to update the DOM, so users see the new changes immediately.

However, updating the DOM is out of scope of this article, so we're just going to refresh the browser to see the changes.

```javascript
fetch({ /* request */ })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
```

:::note
If you want to learn to use JavaScript to update the DOM, I suggest going through my [Learn JavaScript][30] course. I even teach you how make your interface fast and snappy! (Check the Todolist Component).
:::

That's it for the **UPDATE** operation! Let's move on to delete.

## CRUD - DELETE

The **DELETE** operation can be triggered through a **DELETE** request. It's similar to the `UPDATE` request so this should be simple if you understand what we've done above.

For this, let's delete the first quote by Darth Vadar.

First, we need to add a delete button to `index.ejs`.

```html
<div>
  <h2>Remove Darth Vadar!</h2>
  <p>
    Delete one Darth Vadar's quote. Does nothing if there are no more Darth
    Vadar's quote
  </p>
  <button id="delete-button">Delete Darth Vadar's quote</button>
</div>
```

<figure role="figure">
  <img src="/images/2020/crud/delete-ejs.png" alt="Adds delete button to the index.ejs file.">
</figure>

Then, we'll trigger a **DELETE** request through Fetch when a user clicks the delete button.

```js
const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
  })
})
```

Since we're deleting a quote by Darth Vadar, we only need to send Darth Vadar's name to the server.

```js
deleteButton.addEventListener('click', _ => {
  fetch(/* ... */, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vadar'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})
```

We can then handle the event on our server side with the `delete` method:

```js
app.delete('/quotes', (req, res) => {
  // Handle delete event here
})
```

### Deleting a document from MongoDB

MongoDB Collections has a method called `deleteOne`. It lets us remove a document from the database. It takes in two parameters: `query` and `options`.

```javascript
quotesCollection.remove(
  query,
  options
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

`query` works like `query` in `findOneAndUpdate`. It lets us filter the collection to the entries we're searching for. In this case, we can set `name` to Darth Vadar.

```javascript
quotesCollection.remove(
  { name: 'Darth Vadar' },
  options
)
  .then(result => {/* ... */})
  .catch(error => console.error(error))
```

However, since we already pass the name `Darth Vadar` from Fetch, we don't need to hardcode it in Express anymore. We can simply use `req.body.name`.

```js
app.delete('/quotes', (req, res) => {
  quotesCollection.remove(
    { name: req.body.name },
    options
  )
})
```

In this case, we don't need to change any options, so we can omit `options`.

```js
app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
})
```

Then, we can send a response back to the JavaScript in the `then` call.

```javascript
app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
})
```

Now, when you click the delete button, the browser will sends *DELETE* request through Fetch to our Express server. Then, the server responds by sending either an error or a message back.

### What if there are no more Darth Vadar quotes?

If there are no more Darth Vadar quotes, `result.deletedCount` will be `0`. We can send a message that says tells the browser that there are no more Darth Vadar quotes to delete.

```javascript
app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(/* ... */)
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
})
```

If the JavaScript receives a `No quote to delete` response, we can tell the user there's no Darth Vadar quote to delete.

To do this, let's add an element where we can tell users about this message.

```html
<div id="message"></div>
```

If we receive `No quote to delete`, we can change the `textContent` of this `.message` div.

```js
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch(/* ... */)
    .then(/* ... */)
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Darth Vadar quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(/* ... */)
})
```

<figure role="figure">
  <img src="/images/2020/crud/delete-result.gif" alt="Message if no quotes can be deleted.">
</figure>

That's it for the **DELETE** operation!

## Make it look better...

The final step is to make the app look a little better by sprinkling some styles!

<figure role="figure">
  <img src="/images/2020/crud/looks.png" alt="Add CSS to make the app look better.">
</figure>

## Wrapping Up

We covered A LOT in this mega tutorial. Here's a list of things we've done together:

1. Understood what Express, Node, and MongoDB are used for
2. Understood CRUD
3. Executed Create, Read, Update and Delete operations
4. Created an Atlas account for MongoDB
5. Save, read, update, and delete from MongoDB
6. Display variable data with template engines

You have now learned all you need to know about creating simple applications with Node, Express, and MongoDB. Now, go forth and create more applications, young padawan. May the force be with you.

## Grab the Source Code

You can grab the source code by leaving your name and email address in [this form][31]. I'll also send you this article in PDF so you can read it at your leisure.

## Further reading

Here's some further readings if you're interested to continue with the Node, Express, MongoDB journey

- Express articles
	- [3 useful Express middleware][32]
	- [Handling Express errors][33]
	- [JavaScript Async/await][34]
	- [Using Async/await in Express][35]
- MongoDB articles
	- [Mongoose 101][36]
- Testing related articles
	- [Endpoint testing with Jest and Supertest][37]
	- [Connecting Jest and Mongoose][38]

[1]:	https://expressjs.com/
[2]:	https://nodejs.org/en/
[3]:	https://www.mongodb.com/
[4]:	https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[5]:	https://crud-demo.zellwk.com
[6]:	#convertkit
[7]:	/blog/fear-of-command-line/ "Overcoming fear of the command line"
[8]:	https://nodejs.org/
[9]:	https://nodejs.org/
[10]:	/blog/homebrew/
[11]:	https://chocolatey.org/
[12]:	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[13]:	https://nodemon.io/
[14]:	https://www.npmjs.com/package/body-parser
[15]:	https://mongoosejs.com/
[16]:	/blog/mongoose
[17]:	https://www.mongodb.com/cloud/atlas
[18]:	https://zellwk.com/blog/local-mongodb/
[19]:	https://www.mongodb.com/download-center
[20]:	https://zellwk.com/blog/js-promises/ "Promises in JavaScript"
[21]:	https://pugjs.org/api/getting-started.html "Pug"
[22]:	https://ejs.co "Embedded JavaScript (EJS)"
[23]:	https://mozilla.github.io/nunjucks/ "Nunjucks"
[24]:	/blog/nunjucks-with-gulp/
[25]:	http://www.embeddedjs.com/
[26]:	https://developer.mozilla.org/en/docs/Web/API/Fetch_API
[27]:	https://docs.mongodb.org/manual/reference/operator/update/
[28]:	/blog/mongoose "Mongoose 101"
[29]:	https://css-tricks.com/using-fetch/
[30]:	https://learnjavascript.today
[31]:	#convertkit
[32]:	/blog/express-middlewares
[33]:	/blog/express-errors
[34]:	/blog/async-await
[35]:	/blog/async-await-express
[36]:	/blog/mongoose
[37]:	/blog/endpoint-testing
[38]:	/blog/jest-and-mongoose
