---
layout: post
title: Serving HTTPS locally with Node
slug: serving-https-locally-with-node
tags: ['node', 'https', 'express']
---

You won't need to serve up HTTPS when developing locally because `localhost` is treated like a secure context.

But you need to use a HTTPS scheme even on localhost in some cases — like when you're trying to work with Facebook's API.

We're going to talk about how to serve up a HTTPS website on `localhost`. It's quite simple. Really.

<!-- more -->

First you need to install [mkcert](https://github.com/FiloSottile/mkcert). You can do this with Homebrew if you're on a Mac.

```shell
brew install mkcert
brew install nss # Required for Firefox
```

Then you need to run the `mkcert` install command, which creates a certificate authority on your computer.

```
mkcert -install
```

Next, you can run `mkcert` with `localhost` or any other ip address you want. This generates the certificates. If you're using Node, it's best to run this command within your project.

```shell
# Generates certificates for localhost and 127.0.0.1
mkcert localhost 127.0.0.1
```

This creates two `pem` files.

<figure role="figure">
  <img src="/images/2022/node-https-localhost/generate-certs.png" alt="" loading="lazy">
</figure>

I like to put these files in a `certs` folder and rename them into `key.pem` and `cert.pem` to keep things tidy.

<figure role="figure">
  <img src="/images/2022/node-https-localhost/rename-certs.png" alt="" loading="lazy">
</figure>

The final step is to serve them in your server.

If you use Express, you can use the following code:

```javascript
import express from 'express'
import https from 'https'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Express routes here
// ...

// Listen with SSL
const server = https.createServer(
  {
    key: fs.readFileSync(`${__dirname}/certs/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/certs/cert.pem`, 'utf8')
  },
  app
)

server.listen(443, _ => {
  console.log('App listening at https://localhost')
})
```

Final thing to do is load your site at `https://localhost` and you're done!

<figure role="figure">
  <img src="/images/2022/node-https-localhost/demo.png" alt="" loading="lazy">
</figure>

One final thing: You can also use port 80 instead of 443. But if you use port 80, you need to load the site at <https://localhost:80>.

Here's a [demo](https://github.com/zellwk/demos/tree/main/node-https) for you to play with :)

That's it!
