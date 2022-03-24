---
layout: post
title: Using node_modules in the frontend without bundlers
slug: node-modules-in-frontend-without-bundlers
tags: ['npm', 'node', 'javascript', 'esm', 'workflow', 'express']
---

It is possible to use packages installed in `node_modules` in your frontend without any bundlers today.

This is amazing because we don't need to create complicated workflows to reuse code — **we can simply download the library from npm and import it**. Our projects can become simpler and more straightforward.

<!-- more -->

## Prerequisites

Two things:

1. **Your server needs to be able to serve up the `node_modules` folder** (or at least a part of it that you want to expose)
2. **The library you're using must be ES Modules (ESM) compatible**. It cannot be written in Common JS (CJS)

Although many libraries are still written in CJS today, it shouldn't be a problem going forward with prolific authors like [Sindre Sorheus](https://twitter.com/sindresorhus) supporting a move to [ESM](https://github.com/sindresorhus/meta/discussions/15).

## Importing the library

Let's assume you have this project structure.

```shell
- project
  |- index.html
  |- js
    |- main.js
  |- node_modules
```

If your server can serve the `node_modules` folder, importing the library is easy — you simply traverse into the `node_modules`folder and grab the correct javascript file.

Here's how I import a library called [`zlFetch`](https://github.com/zellwk/zl-fetch).

```js
import zlFetch from '../node_modules/zl-fetch/dist/index.mjs'
```

You can test this with [http-server](https://www.npmjs.com/package/http-server) since http-server serves up the `node_modules` folder.

```shell
npx http-server
```

## Serving node_modules with Express

Now let's assume you have a common Express folder structure, like this:

```shell
- project
  |- views
    |- index.html
  |- public
    |- js
      |- main.js
  |- node_modules
```

Express doesn't serve up the `node_modules` folder so you have to make slight changes.

```js
// Doesn't work
app.use(express.static('node_modules'))
```

The best way I found is to create a manual route for each library you want to import.

```js
// Allows browsers to access `node_modules/zl-fetch`
app.use('/zl-fetch', express.static('node_modules/zl-fetch')
```

We can now import `zlFetch` like this.

```js
import zlFetch from `../zl-fetch/dist/index.mjs`
```

Notice we don't even need to include `node_modules` in the path anymore, which is a much better developer experience (because there are fewer things to write!).

We can improve it further by configuring any necessary paths in Express. In this case, we can include the `dist` path so we don't even need to write it in the frontend.

```js
// Adds the `/dist` folder
app.use('/zl-fetch', express.static('node_modules/zl-fetch/dist'))
```

```js
import zlFetch from `../zl-fetch/index.mjs`
```

You notice the import path begins with `../`? We did this because the `main.js` file is in the `js` folder. We can convert `../` to `./` if we include the `js` folder in our Express route.

```js
// Includes the `/js` folder in the express route
app.use('/js/zl-fetch', express.static('node_modules/zl-fetch/dist'))
```

```js
import zlFetch from `./zl-fetch/index.mjs`
```

## Using this method with multiple libraries

We can create an object of library–path mappings. Here's an example that would work.

```js
const libraries = {
  '@zellwk/javascript': '@zellwk/javascript/lib',
  'zl-fetch': 'zl-fetch/dist'
}

Object.entries(libraries).forEach(library => {
  const [lib, libPath] = library
  app.use(`/js/${lib}`, express.static(path.join('node_modules', libPath)))
})
```

We can import multiple libraries without any problems once we do this. Here's an example:

```js
import * as localStore from './@zellwk/javascript/localstore.js'
import zlFetch from './zl-fetch/index.mjs'
```

## Demo

Here's [a demo](https://github.com/zellwk/demos/tree/main/node-modules-without-bundlers) for you to play with.

## Improving it further?

It's possible to read the `package.json` file to find the correct file to import, so we don't need to create manual mappings. I'm not sure how this would work yet since I haven't tested it out.

If you work on this, let me know!
