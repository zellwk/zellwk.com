---
layout: post
title: Protecting and syncing secret keys
description: How to use environment variables to protect your credentials. And how to sync environment variables across environments
slug: environment-variables
tags:
  - node
---

You should never expose API keys or secrets. If you expose them, you might get into trouble. Once, I almost had to pay an excessive amount because my friend leaked my Amazon API key by accident.

What's the amount? I can't remember, but I think somewhere between $20,000 to $60,000. Thankfully, Amazon waived the charges.

It's big trouble if you expose your API keys. So don't expose them.

The best way to protect your API keys is to use environment variables.

<!-- more -->

## Setting environment variables

An environment variable is a variable that's set outside of the code you're running. Environment variables can be set on a Machine level.

If you use Bash, you can set environment variables in `.bash_profile`. If you use ZSH, you can set environment variables in `.zshrc`.

```bash
# Exports a variable called helloworld
export helloworld="Hello world!"
```

After setting the environment variable, update your shell. You can do this by:

1. Running `source` on the file you changed. (like `source ~/.zshrc`)
2. Restarting the terminal

Either way works.

After you sourced the file (or restarted the terminal), type `echo $helloworld` in your Terminal. You should see this:

```bash
echo $helloworld
```

<figure role="figure"><img src="/images/2019/dotenv/env-var.png" alt="Echoing the environment variable."></figure>

## Using environment variables

In Node, you can use the environment variable by writing `process.env.VARIABLE_NAME`.

```js
// This is located in a Node file called server.js
const variable = process.env.helloworld
console.log(variable)
```

<figure role="figure">
  <img src="/images/2019/dotenv/env-in-node.png" alt="Terminal shows Hello world! when we run the server.js file.">
</figure>

## A better way to use environment variables

It can be a hassle to setup environment variables on your computer, on the server, and on computers for all your team members.

The easy way to sync environment variables across all computers is to use a `dotenv`.

### Setting up dotenv

First, you'll need to install `dotenv` from npm:

```bash
npm install dotenv --save
```

`dotenv` lets you save environment variables into a `.env` file. I like to put this `.env` file in the `secrets` folder. This can go along with all my secret files (like `gcreds.json`).

<figure role="figure"><img src="/images/2019/dotenv/dotenv-location.png" alt="Placed the variables.env file in the secrets folder."></figure>

Here's the syntax to create an environment variable in a `.env` file. (Note: DO NOT write the `export` keyword!).

```bash
# Creates a environment variable called "variable".
variable="value"
```

Example:

```bash
helloworld="Hello world!"
```

### Using variables from dotenv

First, you need to load the `.env` file. If you placed `.env` in `./secrets`, you can load the `.env` file this way:

```js
const dotenv = require('dotenv').config({
  path: './secrets/.env'
})
```

Then, you use the environment variable like before:

```js
const variable = process.env.helloworld
console.log(variable)
```

<figure role="figure"><img src="/images/2019/dotenv/dotenv-usage.png" alt="Logged helloworld environment variable in the console."></figure>

## Syncing the .env file into the server

You can use [rsync][1] to sync the `.env` file into your server. (I use [Digital Ocean][2] if you're curious. Use this link to get $50 credit).

To use rsync, you can run a command like this:

```bash
rsync -avzr ./secrets/ user@host:/path-to-destination
```

This command syncs everything in the `./secrets` folder into your destination folder. In the example above, I had a `greds.json` file. This `gcreds.json` file gets synced as well.

Unfortunately, you need to enter `user` and `host` into the rsync command. This means the user and hostname of your server gets exposed (if you synced the command).

A better way is to run `rsync` in Node.

### Node Rsync

First, you need to install rsync from npm:

```bash
npm install rsync --save-dev
```

Then, you need to require `rsync`.

```js
const Rsync = require('rsync')
```

Then, you create an rsync object with the options you want to include. Here's what I use:

```js
const rsync = new Rsync()
  .shell('ssh') // Tells rsync to use SSH
  .set('stats') // Tells rysnc to display stats from the
  .flags('avz') // Tells rsync to use `a`, `v`, and `z` options. (Archive, Verbose, and Compress).
  .flags('n') // This is for dryrun. Test before syncing! :)
  .source('./secrets') // The folder you want to sync
  .destination(`${process.env.SSH_USER}@${process.env.SSH_HOST}:/path-to-destination`) // The destination
```

Notice I used `SSH_USER` and `SSH_HOST` environment variables in the `rsyrc` object? This allows me to access the server on any computer via SSH. (Provided the computer has a valid SSH private key).

This also means I need to include `dotenv` before `rsync`.

```js
const dotenv = require('dotenv').config({
  path: './secrets/.env'
})

const rsync = new Rsync()
// ...
```

After setting up the `rsync` object, you can pipe the outputs from rsync into the terminal. You can do it with this command.

Note: You only do this if you want to see the results from rsync in your terminal.

```js
rsync.output(
  function (data) {
    // do things like parse progress
    const string = Buffer.from(data).toString()
    console.log(string)
  }, function (data) {
    // do things like parse error output
    console.log(data)
  }
)
```

Finally, you execute rsync with this:

```js
// Execute the command
rsync.execute(function (error, code, cmd) {
  if (error) console.error(error)
  console.log(cmd)
})
```

I put all the code above into a file called `sync.js`. When I want to sync my secrets, I run this `sync.js` file.

```bash
node sync.js
```

To make things easier for me, I put this command as a script in my `package.json` file.

```json
"scripts": {
  "sync": "node sync.js"
}
```

## Updating environment variables

`dotenv` does not overwrite environment variables that are already set. If you need to overwrite environment variables, you can run this code:

```js
const Rsync = require('rsync')
const fs = require('fs')
const dotenv = require('dotenv')

const updateEnv = pathToConfig => {
  const envConfig = dotenv.parse(fs.readFileSync(pathToConfig))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

updateEnv('./secrets/.env')
```

That's it!

[1]:	https://linux.die.net/man/1/rsync
[2]:	https://m.do.co/c/64daa7a7a455 "Digital Ocean"
