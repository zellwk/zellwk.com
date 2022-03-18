---
layout: post
title: Deploying to a server via SSH and Rsync in a Github Action
description: The hardest part is installing the SSH key and getting it to work. I'm going to show you how so you can do this easily.
slug: github-actions-deploy
tags:
  - github actions
  - tooling
  - DevOps
---

I wanted to use Github Actions to deploy [zellwk.com](https://zellwk.com) — when I push a commit into Github, I want Github Actions to build my site and deploy to my Digital Ocean server.

The hardest part of this process is deploying to the server with SSH and rsync. I tried various Github actions like [SSH Deploy](https://github.com/marketplace/actions/ssh-deploy) and [SSH Action](https://github.com/appleboy/ssh-action), but I couldn't get the permissions to work for A LONG TIME.

I found most articles about Github actions and SSH didn't help me much. I got stuck with debugging for a few days before I finally figured out how to make the process work.

Today, I want to share the exact steps to deploy via rsync and SSH. This process works for any server, even if you don't use Digital Ocean.

<!-- more -->

## Step 1: Generate an SSH Key

You can generate the SSH key either on your local computer or on your server. It doesn't matter since we can delete the key afterwards, but I recommend doing this on the server so you can reuse your SSH key for other Github Actions.

In this case we'll SSH into the server.

```shell
ssh username@host.com
```

Once you're in the server, navigate to the `.ssh` folder. We will generate the SSH key here.

```shell
cd ~/.ssh
```

When we generate the SSH Key, we cannot use the [default instructions on Github's generating an SSH key page](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). This is because Github Actions doesn't support the latest Ed22159 algorithm. We need to use the legacy command instead.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/use-legacy-command.png" alt="use legacy command">
</figure>

So here's the command you need to use. Remember to replace `your_email@example.com` with your email address.

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Note: Some Github Action authors said we need the PEM format for SSH keys to work. This is false. I've tested with the standard RSA format (which I recommended above) and it works.

Next we need to name the SSH Key file. Here, I don't recommend using the default file name (which is `id_rsa`). I recommend switching the file name to `github-actions` so we know this key is used for Github Actions. It pays to be explicit when you view your SSH keys 6 months down the road.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/name-ssh-key-file.png" alt="name ssh key file">
</figure>

You'll also be asked to provide a passphrase. Leave this empty since we can't enter passwords when Github Actions run the SSH command for us.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/passphrase-empty.png" alt="leave passphrase empty">
</figure>

When you're done generating your SSH keys you should get a cute image like this:

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/ssh-key-randomart.png" alt="ssh key randomart image">
</figure>

If you use the `ls` command now, you should see your keys in the `.ssh` folder.

```shell
ls
```

The public key contains a `.pub` extension while the private key doesn't.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/public-key-extension.png" alt="public key has extension .pub">
</figure>

## Step 2: Adding the Public Key to authorized_keys

We need to add the public key (`github-actions.pub`) to `authorized_keys` so machines using the private key (`github-actions`) can access the server.

The easiest way is to use a `cat` command to append `github-actions.pub` into `authorized_keys`. It look like this:

```shell
cat github-actions.pub >> authorized_keys
```

Here's what the command does:

- Grab the contents of `github-actions.pub` with `cat`.
- Append to `authorized_keys` with `>>`.

Note: Make sure you use double-right-angled brackets (`>>`) and not single-angled brackets (`>`). Double means append, while single means overwrite. Be careful!

## Step 3: Adding the private key to your repository's secrets

Go to your repository on Github and click on "Settings", then "Secrets". You should see a button that says "New repository secret".

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/github-settings-location.png" alt="github settings navigation location">
</figure>

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/github-secrets-location.png" alt="github secrets navigation location">
</figure>

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/new-repository-secret-button.png" alt="new repository secret button location">
</figure>

Click "New repository secret" and you'll be prompted to enter a secret. This secret contains two things — a secret name and the contents. The secret name is used to get the contents later in a Github Actions workflow.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/adding-a-secret.png" alt="adding a new repository secret">
</figure>

When you write your secret name, please use uppercase letters with underscores as spaces (as shown in the placeholder). This is a format we usually use for specifying secrets.

In this case, I chose to name the secret `SSH_PRIVATE_KEY`.

For the value, we need to go back into your server and open up the `github-actions` private key. We can do this with `nano.`.

```shell
nano github-actions
```

You'll see a file similar to this. (Don't worry about me exposing this key, I trashed it already. I just wanted to show you exactly what to expect :)).

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/private-key.png" alt="github actions private key">
</figure>

We need to copy everything and paste it inside the Secret value

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/paste-secret-value.png" alt="paste private key inside secret value">
</figure>

We can use the key like this:

Next, click on "Add secret" and you'll be brought back to the secrets page. Here, you'll see `SSH_PRIVATE_KEY` under the repository's secrets.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/ssh-private-key.png" alt="saved secret ssh-private-key">
</figure>

## Step 4: Adding the Private key to a Github Actions Workflow

I'm assuming you already know [how to create a basic Github Actions file](https://zellwk.com/blog/understanding-github-actions), so I'll only talk about steps for adding the SSH Key here.

Adding the private key is a complex business, I chose to look for available Github Actions here. The only action that worked for me was Shimataro's [Install SSH Key](https://github.com/marketplace/actions/install-ssh-key).

```yaml
steps:
  - name: Install SSH Key
    uses: shimataro/ssh-key-action@v2
```

The Install SSH Key action requires two inputs — `key` and `known_hosts` value.

`key` is the private key we added to Github Secrets. We can use the secrets like this:

```yaml
steps:
  - name: Install SSH Key
    uses: shimataro/ssh-key-action@v2
    with:
      key: {%- raw -%} ${{ secrets.SSH_PRIVATE_KEY }} {% endraw %}
```

The `known_hosts` value is a weird hashed value. If you open up a `known_hosts` file in the `.ssh` server, you'll see something like this:

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/known-hosts-file.png" alt="opened known hosts file">
</figure>

We're supposed to add ONE of these values into a Github Actions secret. How do we even get this value in the first place?! Unfortunately, none of the Github Actions showed me how to do this, so I had to google around for a while -\_-.

Thankfully, we can use a command to generate this weird hashed value. I'll talk about this command in the next step. For now, we simply have to add a random value to `known_hosts` so Shimataro's Install SSH Key won't give us an error.

```yaml
steps:
  - name: Install SSH Key
    uses: shimataro/ssh-key-action@v2
    with:
      key: {%- raw -%} ${{ secrets.SSH_PRIVATE_KEY }} {% endraw %}
      known_hosts: 'just-a-placeholder-so-we-dont-get-errors'
```

## Step 5: Adding a correct known_hosts value

We can generate the correct `known_hosts` value with a `ssh-keyscan` command. It looks like this:

```shell
ssh-keyscan -H IP_ADDRESS_OF_HOST
```

If you replace `IP_ADDRESS_OF_HOST` with the actual ip address of your server, you should get a result like this. (I omitted my ip address but tried to show you everything else).

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/add-ip-address.png" alt="inserted ip address result">
</figure>

Once we know this, we can manually add the IP address (which I named as `SSH_HOST`) into the Github Secrets.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/add-ip-github-secrets.png" alt="add IP address to github secrets">
</figure>

Then we can generate the correct information via `ssh-keyscan` and append it to the `known_hosts` file.

```yaml
steps:
  # ...
  - name: Adding Known Hosts
    run: ssh-keyscan -H {% raw %}${{ secrets.SSH_HOST }}{% endraw%} >> ~/.ssh/known_hosts
```

## Step 6: Rsync into Server

We can finally rsync via SSH into the server. To do this, you need to know your SSH user and host. Here's what the command looks like.

```shell
rsync -flags source user@host:destination
```

- `flags` are the flags you would like to rsync with. We commonly use `avz` which stands for `archive`, `verbose`, and `compress`. If you're rsync-ing for the first time, I recommend using the `n` flag for `dry-run` as well.
- `source` is the source file you want to copy from
- `user@host` is the username and ip address of the your server. These values should be kept as secrets.
- `destination` is the location of the files you want to copy to.

Here's a real example of what I use to deploy zellwk.com to my server.

```yaml
- name: Deploy with rsync
  run: rsync -avz ./dist/ {% raw %}${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}{% endraw %}:/home/zellwk/zellwk.com/dist/
```

Since we have the `verbose` flag, you should be able to see a list of resources that are copied via rsync.

<figure role="figure">
  <img src="/images/2021/github-actions-deploy/list-of-resources.png" alt="list of resources copied via rsync">
</figure>

Note: There are a few extra steps if you need to use rsync with a custom port. Please read [this article](/blog/rsync-with-github-actions-when-using-a-custom-port) for more information.

That's it!

## Wrapping up

Here are the steps to summarize everything:

1. Generate a SSH Keyphrase using the standard RSA format
2. Add the public key to `authorized_keys`
3. Add the private key as a Github secret
4. Use Shimataro's [Install SSH Key](https://github.com/marketplace/actions/install-ssh-key) action to generate a SSH Key in the runner.
5. Append the correct `known_hosts` configuration with `ssh-keyscan`
6. Deploy with Rsync via SSH

Done! :)
