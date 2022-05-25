---
layout: post
title: Best way to install Node and keep it up to date
slug: install-node
tags: ['node']
---

The easiest way to install Node is head over to [NodeJS's website](https://nodejs.org/en/) and download the LTS version.

<figure role="figure">
<img src="/images/blog/node/lts.png" alt="" loading="lazy">
</figure>

The LTS Version is good enough for most users. I use LTS myself.

<!-- more -->

The Current version is the latest available version. Developers will be making changes and creating libraries on this version. If you use Current, be prepared to run into bugs.

Once you downloaded and installed Node, you should be able to use the `node` command and the `npm` command. You can add `-v` to each of these commands to see their respective versions.

```shell
node -v
npm -v
```

<figure role="figure">
  <img src="/images/blog/node/versions.png" alt="" loading="lazy">
</figure>

## Upgrading and Downgrading Node with a Package Manager

You want to have the flexbility to upgrade and downgrade Node easily if you're going to work with Node.

The simplest way is to use npm (node default package manager), to install a package `n`. `n` lets install a specific version of Node easily.

You can install `n` with the following command.

```shell
sudo npm install n -g
```

The `-g` flag here stands for `global`. It lets you use the `n` command everywhere.

Once you have installed `n`, you can use the following commands to install different versions of Node.

- `sudo n lts` — installs the LTS version
- `sudo n latest` — installs the latest version
- `sudo n install <num>` — Installs a specific version on Node. Here, you only need to provide the first number. (To get the latest version of 16.xx.yy, you can simply write 16).

:::note
Node's version numbers are written with a standard called Semver. You can find out more about Semver [in this article](https://zellwk.com/blog/semantic-versioning/)
:::

## Using other package managers

You're not limited to using `n` to upgrade or downgrade Node. There are other package managers available and you can [choose the one you like](https://nodejs.org/en/download/package-manager).
