---
layout: post
title: How to publish packages to npm (the way the industry does things)
description: "It's not simple to publish and update packages to npm according to industry standards. We'll go through the steps involved and what you have to watch out for"
slug: publish-to-npm
tags:
  - npm
---


It's simple to publish a package onto npm. There are two steps:

1. Create your package.
2. Publish the package.

But publishing packages the way the industry does it? Not so simple. There are more steps. We'll go through what steps are required, and I'll show you an easy way to publish and update your package.

<!--more-->

## Creating your first package

This section is for you if you haven't published a package to npm before. Feel free to skip to the next section if you've published one before.

To publish your first package to npm, you need to go through these steps:

**First, you need to have an npm account**. Create one [here][1] if you don't have one yet.

**Second, you need to login to your npm account through the command line**. (You need to have Node and npm installed on your system before you perform this step. Install them [here][2]).

To sign in, you use `npm login`.

```bash
npm login
```

You'll be prompted to enter your username, password, and email address.

<figure><img src="/images/2019/publish-to-npm/npm-login.png" alt="Logging into npm via the command line"></figure>

**Third, you need to create a package**. To do so, create a folder somewhere on your computer and navigate to it. The command line version is:

```bash
# Creating a folder named how-to-publish-to-npm
mkdir how-to-publish-to-npm

# Navigating into the folder
cd how-to-publish-to-npm
```

Next, you want to begin the project with the `npm init` command.

```css
npm init
```

This command runs you through a few questions and creates a `package.json` file for you at the end. This `package.json` file contains the bare necessities you need to publish your project. (Feel free to skip questions that don't make sense).

<figure><img src="/images/2019/publish-to-npm/npm-init.png" alt="Image of the npm init command"></figure>

**The final step is to publish your package** with the `npm publish` command.

```css
npm publish
```

If the package already exists on npm (because your package has the same name as another package on npm), you won't be able to publish it. You'll get an error.

<figure><img src="/images/2019/publish-to-npm/npm-publish-error.png" alt=""></figure>

You'll need to change your package name.

To change your package name, you change the `name` property in the `package.json` file. Here, I changed it to `publishing-to-npm`.

(You can check for naming collisions by doing a search on npm, or through the `npm search` command).

<figure><img src="/images/2019/publish-to-npm/renaming.png" alt="Changed name property to publishing-to-npm"></figure>

It's also a good idea to update the folder name as well for consistency. Here's the command line equivalent.

```bash
# Command to change folder names by moving everything
mv how-to-publish-to-npm publishing-to-npm
```

Try the `publish` command again. You should get a success message now.

<figure><img src="/images/2019/publish-to-npm/npm-publish.png" alt="Successfully published to npm"></figure>

### What to do if every name you came up with is taken up already

This is a common problem since many people create packages on npm. It's difficult to get the package name you desire sometimes. (It's like how I can *never* find a good `.com` domain).

To combat against this problem, npm lets you publish to a scope.   This means you can publish the package under your own username (or npm organization), so you're free from naming problems.

To publish to a scope, you can either:

1. Change the `name` to `@username/package-name` manually in  `package.json`
2. Run `npm init --scope=username` instead of `npm init`

If your repository has a scope, you need to adjust the publish command slightly:

```css
npm publish --access public
```

That's all you need to do to publish a package to npm.

Now, let's move on to how the industry does publishes packages.

## The way the industry publishes (and updates) packages.

Consider a popular framework like React. If you dig around React, you'll notice a few things:

First, React has a [Github repository][3].

Second, React is [published on][4] npm.

Third, React follows [Semantic versioning][5] (Semver for short).

<figure><img src="/images/2019/publish-to-npm/semver.png" alt="npm packages follows Semver"></figure>

Fourth, each update to React has a git tag associated with it. This git tag follows Semver as well.

<figure><img src="/images/2019/publish-to-npm/git-tag.png" alt="Each git tag is follows Semver"></figure>

Fifth, there are [release notes][6] for every React update.

This means publishing a package involves many steps. At the very least, you need to:

1. Run tests (if there are any)
2. Update `version` in `package.json` according to Semver
3. Create a git tag according to Semver
4. Push the package to Github
5. Push the package to npm
6. Create release notes for every update

It's common to forget one of these things when we're ready to push. Sometimes we `npm publish` and we enjoy a break. When we're back, we screw ourselves for forgetting.

There's an easier way. It's with a tool called `np`.

## np

[np][7] (created by [Sindre Sorhus][8]) makes it easier for us to publish packages without missing any of the steps I detailed above.

### Installing np

To install `np`, you can run the following command:

```css
npm install np
```

This works. But I prefer installing `np` globally on my computer so I can run the `np` command anywhere.

```css
sudo npm install --global np
```

### Before using np

Before you use `np` you need to make sure:

1. Your project is a Git repository
2. It needs to have a remote
3. You must have pushed to the remote at least once.
4. You also need to make sure your working directory is clean.

```bash
# Initialize Git
git init

# Adds a remote repository
git remote add origin some-url

# Commit changes
git add .
git commit -m "Initial Commit"
```

If your project is not a Git repository, you'll get this error:

<figure><img src="/images/2019/publish-to-npm/np-error-no-git.png" alt="np's error if project is not a Git repository"><figcaption>np's error if project is not a Git repository</figcaption></figure>

If your project doesn't have remote, you'll get this error (at a later part of the checks).

<figure><img src="/images/2019/publish-to-npm/np-error-no-remote.png" alt="np's error if project does not have a remote"><figcaption>np's error if project does not have a remote. This error happens later in the process</figcaption></figure>

If your working directory is dirty, you'll get this error:

<figure><img src="/images/2019/publish-to-npm/np-error-dirty.png" alt="np's error working directory is dirty"><figcaption>np's error working directory is dirty</figcaption></figure>

If you haven't pushed to the Git remote at least once, `np` will just hang and do nothing.

### Using npm

To use `np`, you run the `np` command.

```bash
np
```

`np` will prompt you to enter a Semver number.

<figure><img src="/images/2019/publish-to-npm/np.png" alt="np prompts the user for a Semver number"></figure>

Choose a number and `np` will ask you to confirm your choice.

<figure><img src="/images/2019/publish-to-npm/np-confirm.png" alt="np prompts a confirmation of the chosen Semver number"></figure>

`np` then does the rest of the publishing stuff for you.

### Error with running tests

`np` runs the `npm test` command as part of its checks.

If you followed the tutorial up to this point, you would get an error that looks like this:

<figure><img src="/images/2019/publish-to-npm/np-test-error.png" alt="An error with running tests"></figure>

This happens because our `npm test` command results in an error. You can try it yourself:

```bash
npm test
```

<figure><img src="/images/2019/publish-to-npm/npm-test-error.png" alt="npm test results in an error"></figure>

To fix this error, we need to change the `test` script in `package.json` file.

Right now it looks like this:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Change it to this:

```json
"scripts": {
  "test": "echo \"No test specified\""
},
```

This change works because `exit 1` creates an error.

With this change, `np` should complete the publishing process. (Remember to commit the change before running `np`).

<figure><img src="/images/2019/publish-to-npm/np-process.png" alt="The np publishing process"></figure>

At the end of the process, `np` launches a browser window for you to write your release notes.

<figure><img src="/images/2019/publish-to-npm/np-release.png" alt="Writing release notes"></figure>

In short, `np` makes publishing packages much simpler!

[1]:	https://www.npmjs.com/signup
[2]:	https://nodejs.org/en/
[3]:	https://github.com/facebook/react
[4]:	https://www.npmjs.com/package/react
[5]:	/blog/semantic-versioning/
[6]:	https://github.com/facebook/react/releases
[7]:	https://github.com/sindresorhus/np
[8]:	https://github.com/sindresorhus
