---
title: Building a Simple CRUD Application with Express and MongoDB – Part 2
layout: post
slug: crud-express-and-mongodb-2
tags:
 - node
 - mongo
 - javascript
newsletter: jsr
---

This article is the second part on creating a CRUD application with Express and MongoDB. We're going to venture deep into the last two operations that were not covered in the [first part](/blog/crud-express-mongodb/) – **UPDATE** and **DELETE**.

Without further ado, let's start the second part.

<!--more-->

## CRUD - UPDATE

The **UPDATE** operation is used when you want to change something. It can only be triggered by browsers through a **PUT** request. Like the **POST** request, the **PUT** request can either be triggered through JavaScript or through a `<form>` element.

Let's try triggering a **PUT** request through JavaScript this time since we've already learned how to trigger a request through a `<form>` element while going through the **POST** request in the previous article.

For the purpose of this tutorial, we're going to create a button that, when clicked on, will *replace the last quote written by Master Yoda* with a quote written by Darth Vadar.

To do so, we first add a `button` into the `index.ejs` file:

~~~html
<div>
  <h2>Replace last quote written by Master Yoda with a quote written by Darth Vadar</h2>
  <button id="update"> Darth Vadar invades! </button>
</div>
~~~

We're also going to create an external JavaScript file to execute the **PUT** request when the button is clicked. According to Express conventions, this file is placed in a folder called `public`

~~~bash
$ mkdir public
$ touch public/main.js
~~~

Then, we have to tell Express to make this `public` folder accessible to the public by using a built-in middleware called `express.static`

~~~javascript
app.use(express.static('public'))
~~~

Once this is done, we can add the `main.js` file to the `index.ejs` file:

~~~html
<!-- ... -->
<script src="main.js"></script>
</body>
~~~

Next, we're going to send the **PUT** request when the button is clicked:

~~~js
// main.js
var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
})
~~~

The easiest way to trigger a **PUT** request in modern browsers is to use the [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API). It is only supported on [Firefox, Chrome and Opera](http://caniuse.com/#search=fetch), so you might want to use a [polyfill](https://github.com/github/fetch) if you want to use Fetch on an actual project.

We're going to send the following fetch request to the server. Have a quick look at it and I'll explain what it all means:

~~~js
fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Darth Vader',
    'quote': 'I find your lack of faith disturbing.'
  })
})
~~~

Ready to understand why the Fetch request is written this way? :)

Fetch takes in two parameters. **The first parameter** is a path. In this case, we're sending the request to `/quote`, which will be handled on our server.

**The second parameter, `options`,** is an optional object that allows you to control a number of different settings. The ones we used above are `method`, `headers` and `body`.

`method` is straightforward. We set the `method` to `put` because we're sending a PUT request.

`headers` here refers to [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) you want to send to the server. It is an object with multiple key-value pairs.

`body` refers to the content you send to the server.

One thing you may notice is that we've set the `Content-Type` to `application/json`. We've also converted Darth Vadar's quote into JSON in the body with `JSON.stringify`. We're making these steps because we're sending Darth Vadar's quote in the JSON format (a standard format for sending information on the web) to the server.

Unfortunately, our server doesn't read JSON data yet. We can teach it to read JSON data by using the `bodyparser.json()` middleware:

~~~javascript
app.use(bodyParser.json())
~~~

Once we've done everything above, we will be able to handle this **PUT** request by using the `put` method:

~~~javascript
app.put('/quotes', (req, res) => {
  // Handle put request
})
~~~

The next step, then, is to learn how to look for the last quote by Master Yoda and change it to a quote by Darth Vadar in MongoDB.

## Updating a Collection in MongoDB

MongoDB Collections come with a method called `findOneAndUpdate` that allows us to change one item from the database. It takes in four parameters – `query`, `update`, `options` and a `callback`.

~~~javascript
db.collections('quotes').findOneAndUpdate(
  query,
  update,
  options,
  callback
)
~~~

**The first parameter, `query`**, allows us to filter the collection through key-value pairs given to it. We can filter the `quotes` collection for Master Yoda's quotes by setting the `name` to `Yoda`.

~~~javascript
{
  name: 'Yoda'
}
~~~

**The second parameter, `update`,** tells MongoDB what to do with the update request. It uses MongoDB's [update operators](https://docs.mongodb.org/manual/reference/operator/update/) like `$set`, `$inc` and `$push`. We will use the `$set` operator since we're changing Yoda's quotes into Darth Vadar's quotes:

~~~javascript
{
  $set: {
    name: req.body.name,
    quote: req.body.quote
  }
}
~~~

**The third parameter, `options`,** is an optional parameter that allows you to define additional stuff. Since we're looking for the last quote by Yoda, we will set `sort` within options to `{_id: -1}`. This allows MongoDB to search through the database, starting from the newest entry.

~~~javascript
{
  sort: {_id:-1}
}
~~~

There's a possibility that there aren't any quotes by Master Yoda in our database. MongoDB does nothing by default when this happens. We can force it to create a new entry if we set the `upsert` option, which means insert (or save) if no entries are found, to true:

~~~javascript
{
  sort: {_id: -1},
  upsert: true
}
~~~

**The final parameter is a callback function** that allows you to do something once MongoDB has replaced the final quote by Yoda with a quote by Darth Vadar. In this case, we can send the results back to the fetch request.

~~~javascript
(err, result) => {
  if (err) return res.send(err)
  res.send(result)
}
~~~

Here's the entire `findOneAndUpdate` command we've written over the previous few steps:

~~~javascript
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
~~~

Now, whenever someone clicks on the update button, the browser will send a *PUT* request through Fetch to our Express server. Then, the server responds by sending the changed quote back to fetch. We can then handle the response within by chaining `fetch` with a `then` method. This is possible because Fetch returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.

The proper way to [check if fetch resolved successfully](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful) is to use the `ok` method on the response object. You can then `return res.json()` if you want to read the data that was sent from the server:

~~~javascript
fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
})
~~~

![](/images/2016/01/put-data.png)

If you are working on a fancy webapp, this is the part where you use JavaScript to update the DOM so users can see the new changes immediately. Updating the DOM is out of the scope of this article, so we're just going to refresh the browser to see the changes.

~~~javascript
fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
~~~

That's it for the **CREATE** operation! Let's move on to the final one – **DELETE**.

## CRUD - DELETE

The **DELETE** operation can only be triggered through a **DELETE** request. It's similar to the **UPDATE** request so it's simple if you understand what we've done earlier.

For this part, let's learn to delete the first quote by Darth Vadar. To do so, we first have to add a button to the `index.ejs` file.

~~~html
<div>
  <h2>Delete Darth Vadar's first quote</h2>
  <button id="delete"> Delete first Darth Vadar quote </button>
</div>
~~~

Then, we'll trigger a **DELETE** request through Fetch whenever the delete button is clicked:

~~~js
var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
~~~

We can then handle the event on our server side with the `delete` method:

~~~js
app.delete('/quotes', (req, res) => {
  // Handle delete event here
})
~~~

## Deleting an entry in MongoDB

MongoDB Collections come with a method called `findOneAndDelete` that allows us to remove one item from the database. It takes in three parameters – `query`, `options` and a `callback`. These parameters are exactly the same as the ones we used in `findOneAndUpdate` when updating an entry in MongoDB. The only difference here is that there's no `upsert` within `options`.

~~~javascript
db.collections('quotes').findOneAndDelete(
  query,
  options,
  callback
)
~~~

Remember, we are trying to delete the first quote by Darth Vadar. To do so, we filter the `quotes` collection by the name, "Darth Vadar". The `query` parameter is hence:

~~~javascript
{
  name: req.body.name
}
~~~

We can skip the `options` parameter since we don't have to reverse the sorting order. Then, we can send a response back to the Fetch request in the callback function.

~~~javascript
(err, result) => {
  if (err) return res.send(500, err)
  res.send({message: 'A darth vadar quote got deleted'})
})
~~~

The complete code for the delete handler is as follows:

~~~javascript
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})
~~~

Now, whenever somebody clicks on the delete button, the browser will send a *DELETE* request through Fetch to our Express server. Then, the server responds by sending either an error or a message back.

As before, we can reload the website when the fetch is successfully completed.

~~~javascript
fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
~~~

That's it for the **DELETE** operation!

## Other articles in this series

1. Part 1: [Building a Simple CRUD Application with Express and MongoDB](/blog/crud-express-mongodb)
2. Part 2: This article

## Wrapping Up

You have now learned all you need to know about creating simple applications with Node and MongoDB. Now, go forth and create more applications, young padawan. May the force be with you.
