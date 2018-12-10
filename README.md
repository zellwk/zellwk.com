# Introduction

Protoflow is a static-site generator that Zell has created to help you (and him) create a static website easily without the need to mess around with things like Jeykll, Middleman, Assemble or any other static site generators.

Everything here is built directly with Gulp, and is very similar to the workflow we have crafted in "Automating Your Workflow".

It is also used to prototype HTML quickly when you're creating designs so you can spend more time improving your designs instead of mangling with changes.

## Installing Protoflow

Download the zip folder (or clone the repository), extract it,then run the following commands to install all dependencies required by Protoflow:

Note: See below under "bugs and contributing" if  you want access to the repository.

```bash
$ npm install
$ bower install
```

Note: You also need to install the scss-lint gem if you want to lint your sass files with the `lint:scss` task.

## Project Structure for Protoflow

Protoflow's project is divided into four main folders:

- `src`
- `dev`
- `dist`
- `data`

`src` is where you would place all your source files. This includes all your code, images, fonts and everything else.

These files will then be treated and copied over to `dev` or `dist` depending on whether you're developing or creating an optimized build.

`data` is used to contain all `.json` data files. These data files are to be used with the Nunjucks Templating Engine that is used in Protoflow. [More on that here](#using-nunjucks-in-protoflow).

## Developing with Protoflow

You begin the development phase with the `gulp` command:

```bash
$ gulp
```

When `gulp` is ran, Protoflow will look through all your source folders and execute the following tasks:

- `clean` - to clean the `dev` directory
- `lint:scss` and `lint:js` - Check for code formats
- `sprites` - Produce image sprites
- `images` - Copies images to `dev` folder
- `fonts` - Copies fonts to `dev` folder
- `sass` - Compiles Sass into CSS
- `generateSite` - Generates static site with Nunjucks
- `webpack` - Compiles JavaScript with Webpack
- `browserSync` - Launches browser for live-reload
- `watch` - watch files for changes.

You can find the configurations for each of these tasks in `gulp/task/task-name.js`.

Once the command has finished executing, you can navigate to `localhost:3000` to view your website. Everything here is placed in the `dev` folder.

### Writing Sass in Protoflow

Sass files are kept in the `src/scss` directory. They are pre-configured to import libraries from both `bower_components` and `node_modules` folders. You can use the `@import` statement to import these modules without having to refer to the `bower_components` or `node_modules` folder.

```scss
// Importing Susy.
// No need to add `bower_components` or `node_modules` folder
@import 'susy/sass/susy';
```

### Writing JavaScript in Protoflow

JavaScript files are kept in the `src/js` folder. They are compiled from ES6 syntax to ES5 syntax with Webpack. Feel free to write ES6 immediately within any file located in `src/js`.

```js
// ES5 syntax
var _ = require('lodash');

// ES6 Syntax
import _ from 'lodash';
```

### Adding Images to Protoflow

All images are to be placed in the `src/images` directory. Please take a look at the next section to find out how to work with image sprites.

### Using Sprites with Protoflow

Images will be combined into an image sprite are kept in the `src/images/sprites` folder. Support for retina sprites are enabled by default, so please make sure you have the same number of `@2x` images. Gulp.spritesmith will throw you an error otherwise.

Once sprites are compiled, you can use them in the same way as we described in the book.

Note: You can disable support for retina sprites by heading to the configuration file located in `gulp/config.js`. (More on the configuration file later).

### Using Nunjucks in Protoflow

Protoflow uses Nunjucks as the template engine of choice. It is configured to do a whole lot more compared to the `nunjucks` task we described in the book. Here's a summary of how to use it:

#### Templates Folder

`src/templates` contain all `.nunjucks` template files. This is also the location where you add files (like partials and macros) that can be imported into other `.nunjucks` files. This works in the same way as we discussed in Automating Your Workflow.

#### Pages Folder

`src/pages` is used to keep `.nunjucks` files that are converted into HTML. These files function in the same way as we discussed in the book. You can use two extra features I've coded in to help you with prototying. They are – [Markdown](#using-markdown) and [Data](#adding-data-to-pages).

#### Posts Folder

`src/posts` are used to keep blog posts you write. Each markdown file will be converted into a blog post that lives on it's own URL. You need to provide a YAML frontmatter at the top of each post to let Protoflow know what to do with them.

Here's an example of the YAML file:

```yaml
---
title: This is awesome
template: post
permalink: First-awesome-post
tags: awesome
---
```

- `title` – Title of the post. This will be available to you as the `{{title}}` variable in Nunjucks
- `template` – Nunjucks template used for this post. It defaults to `post.nunjucks`. You can switch this up to a separate template anytime you want to.
- `permalink` – URL for the post. The default URL is `your-site.com/blog/anything-that-comes-in-permalink`. This will also be available to you as the `{{permalink}}` variable in Nunjucks
- `tags` – Tags for the post. An archive page (list of all posts with the same tag) will be created for each tag. They default URL for the tag page is `your-site.com/tag-name/`.

Blog posts will also be consolidated into an archive page that lives at `your-site.com/blog`. You can view the template used to create Blog and Tag archive pages at `src/templates/blog.nunjucks` and `src/templates/tag.nunjucks` respectively.

Note: The markdown content for the post will be available to you as the `{{body}}` tag in Nunjucks.

Note: You can add a summary marker to determine what content to show on the archive pages. This summary marker defaults to `<!--more-->`.

#### Using Markdown

Posts are not the only place you can use the Markdown syntax. Protoflow is created for folks who love to use Markdown everywhere, even in pages. You can use Markdown in `src/pages` with either one of the following formats:

- use the nunjucks markdown tag

```html
{% markdown  %}
## Markdown H2
{% endmarkdown %}
```

- import a markdown file

```html
{% markdown 'path-to-markdown/markdown.md' %}
```

Take a look at `src/pages/markdown.nunjucks` for an example of how these two formats can be used.

Markdown FTW! :)

#### Adding Data to Pages

When you prototype a large website, you often find yourself having to work with hundreds of lines of data. When this happens, it gets incredibly difficult to browse and change your `data.json` quickly.

The workaround, hence, is allow you to import data files as needed so you can split up your data into smaller, modular files.

You add data by adding a frontmatter to your `.nunjucks` files that are located in `src/pages`.

```yaml
---
data: ['path-to-file', './data/moar-data.json']
---
```

You can name your data anything you want. For example, I used `chapters.json` when creating the sales page for Automating Your Workflow.

NOTE: This function is only available for Nunjucks files in `src/pages`.

### Summary for Development Phase

In short, here are the files you'd want to touch:

- `src/sass` – For Sass files
- `src/js` – For JavaScript files
- `src/images` – For images
- `src/images/sprites` – For image sprites
- `src/posts` – For blog posts
- `src/pages` – For HTML pages
- `src/templates` – For Nunjucks templates, partials, macros and everything else you use in Nunjucks.
- `data/` – For data that is added to Nunjucks pages.

### A Quick Note on Watching

Protoflow watches every file you need, and automatically regenerates all your files whenever you save a `.nunjucks`, `.scss`, `.js`, `.json` file in the folders mentioned above.

The only thing to note is that Protoflow doesn't know when you have added a new file into the `src` folder. It cannot regenerate your site in this case.

Hence, whenever you add a new file into `gulp.src`, you must re-run the `gulp` command.

### A Quick Note on Asset paths

Protoflow is built to let you use pretty URLs like `yoursite.com/blog` instead of having to write `yoursite.com/blog.html`. For this to work, all asset paths written in Nunjucks must use absolute URLs.

Here's an example:

```
// Absolute URL. Do this
<img src="/images/bear.jpg">

// Relative URL. Please DO NOT do this
<img src="images/bear.jpg">
```

## Optimization Phase

Protoflow is built to optimize your entire website in one single command: `gulp --prod`.

```bash
$ gulp --prod
```

The `--prod` flag is a custom flag introduced to tell Protoflow that you're building a optimized site for production. Protoflow will then run through the following tasks and create an optimized site in the `dist` folder.

- `clean` - to clean the `dist` directory
- `lint:scss` and `lint:js` - Check for code formats
- `sprites` - Produce image sprites
- `images` - Copies images to `dist` folder, and optimize them if they're not optimized previously
- `fonts` - Copies fonts to `dist` folder
- `sass` - Compiles Sass into CSS
- `generateSite` - Generates static site with Nunjucks
- `webpack` - Compiles JavaScript with Webpack
- `useref` – Optimizes JavaScript and CSS. Removes unused CSS. Also adds a revisioned hash name to the final output for cachebusting.
- `critical` – Speeds up your website by inlining critical CSS into the `<head>` section of the site.

Note: `useref` and `critical` may take a while to run if you have a large site. I'm looking for a way to speed things up, and will update as soon as I find a way.

## Deployment Phase

Protoflow has three built-in methods to help you deploy your website. They are `rsync`, `s3` and `ghpages`.

You can set the deploy method by changing the `deploy` key in `gulp/config.js`.

If you use `rsync` or `s3`, please make sure you add a `.secrets.json` file to the root of the project. This file is already ignored to prevent you from accidentally committing it into your remote repository.

Here's a sample `.secrets.json` file you can use:

```json
{
  "rsync": {
    "dest": "username@server-address:public_html/path-to-project"
  },
  "aws": {
    "key": "Your-API-Key",
    "secret": "Your-AWS-Secret",
    "bucket": "Your-AWS-bucket",
    "region": "Your-region"
  }
}
```

If you use `ghpages` to deploy to your website, you can (optionally) add a remoteURL parameter to `deploy` in `gulp/config.js` if you are deploying a `gh-pages`branch on another git repository.

## Testing and Integration Phases

Protoflow does not have unit-testing functionality set up yet. I have encountered difficultites getting Webpack to play nicely with Karma, the test-runner we're using.

I'm also keeping a looking for how to get this to work, and I'll update as soon as I have any news. If you know something about Testing with Karma and Webpack, please let me know so I can update this for everyone else! :)

## Bugs & Contributing

I'm unable to automatically invite everyone yet, so please feel free to request developer rights to this repo by sending me an email.

You can list your bugs & issues under the issue tracker in Gitlab (which I assume to work in a similar fashion as Github).

Feel free to pull the repo and contribute as well. I'll be stoked to have your improvements! :)

## Final notes

Free feel to play around with the Gulp configurations in `gulp/config.js` if you want to change your settings.

Let me know if you run into problems, or if you want some additional functionality. I'll see if I'm able to incorporate them.

It'll also be awesome if you think of ways to make this generator even better! :)

Have fun!
1