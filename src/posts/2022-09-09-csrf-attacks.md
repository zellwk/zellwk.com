---
layout: post
title: Understanding CSRF Attacks
slug: understanding-csrf-attacks
tags: ['web-security', 'node', 'express', 'javascript']
status: draft
---

I went about researching web security recently as I was writing [Understanding Asynchronous JavaScript](https://asyncjs.today) — I wanted to make sure my recommendations were secure and I'm not doing any of my students a disservice with my recommendations.

Unfortunately, articles in the security space were pretty hard to understand. There were many words that trigger lots of fear, uncertainty, and doubt in the articles. I get emotionally panicky when I read these articles — and I worry I may end up doing something wrong — even though the intention of these articles was good!

Many articles also don't disclose full details CSRF, how to set up a CSRF Attack, and how to prevent a CSRF Attack, which leaves me doubtful about what I learned. I end up having to figure things out on my own.

I want to make it easier for you to understand CSRF, so I took a stab at writing an article with complete (and step-by-step) information about CSRF Attacks. I hope this article gives you the clarity and confidence you need to build secure web applications.

<!-- more -->

## Two Kinds of CSRF Attacks

There are two kinds of CSRF Attacks:

1. Normal CSRF Attack
2. Login CSRF

We'll discuss the Normal CSRF Attack first, followed by the Login CSRF.

## What is a CSRF Attack

**A CSRF attack is one that tricks a victim into submitting a malicious request** — a request they did not intend to make — **to a website where they are authenticated** (logged in to).

The request must originate from another website, which gives in the name "Cross-Site". This request also impersonates an authenticated user, which gives it the name "Request Forgery".

**CSRF Attacks are blind** — which means the attacker doesn't see what happens after the victim submits the request. So CSRF attacks often target a state-change on the server.

What is a state change? Basically, anything that modifies the database is a state change. Examples of state changes include:

- Changing username and password
- Sending money to an account
- Sending fake messages from the user's account
- Sharing inappropriate images or videos from the user's account

CSRF Attacks take advantage of the fact that browsers automatically send cookies to the server in each request. Without any CSRF protection, the server may assume a request is valid when an authentication cookie is present.

Authentication cookies may be anything as long as the server uses them to check whether a user is valid. It can be an access token. It can also be a session ID. It depends on how the server handles authentication.

## Prerequisites for CSRF Attacks to work

There are four prerequisites needed for a CSRF Attack to succeed.

1. A request of any method is sent to the server.
2. The user must be authenticated.
3. The server must store authentication information in cookies.
4. The server does not implement CSRF prevention techniques (which would be discussed below).

## How CSRF Attacks work

Before an attacker can launch a CSRF Attack, they need to find a consistent request they can target. They must know what the request does. This can be any request — GET, POST, PUT, or DELETE. Anything goes.

Once they selected the request to target, they must generate a fake request to trick the user.

Finally, they must trick the user into sending the request. Most of the time, this means:

1. Finding a way to send the request automatically without the user knowing. The most common approaches are through image tags and submitting a JavaScript form automatically.
2. Misrepresenting a link (or button), which tricks a user into clicking it. (AKA [Social Engineering](<https://en.wikipedia.org/wiki/Social_engineering_(security)>)).

### Attacks via a GET request

CSRF Attacks with a GET request only work if the server allows a user to change state with GET requests. You don't have to worry about this type of CSRF Attack if your GET requests are read-only.

But let's say we have a server that doesn't follow programming best practices and allowed state changes via a GET request. If they do this, they are in trouble — huge trouble.

For example, say there is a bank that allows you to transfer money with the following endpoint. You just have to enter `account` and `amount` in the GET request to send money to a person.

```shell
https://bank.com/transfer?account=Mary&amount=100
```

The attacker can generate a link that sends the money to their account.

```shell
# Sends 9999 to the Attacker's account
https://bank.com/transfer?account=Attacker&amount=9999
```

At this point, the attacker can find a way to trigger the link automatically without the user knowing.

One way is to include the link in a 0x0 image in a webpage or an email. If the user visits this webpage or email, the GET request gets triggered automatically since browsers and emails are configured to fetch images automatically.

(Now I understand why email providers disable images from loading as a safety precaution).

```html
<!-- Downloading this image triggers the GET request attack -->
<img
  src="https://bank.com/transfer?account=Attacker&amount=9999"
  width="0"
  height="0"
  border="0"
/>
```

Another way is to misrepresent what a link does. This works because people don't check links before clicking on them. If the person clicks the link, they would have sent the GET request for the attacker without knowing.

```html
<!-- Fake link that triggers the GET request attack -->
<a href="https://bank.com/transfer?account=Attacker&amount=9999"
  >View my Pictures</a
>
```

If the user is authenticated, the server will receive an authentication cookie which makes it believe the request is valid. If the server did not use any CSRF protection mechanisms, the money will be sent to the attacker.

Examples of GET CSRF Attacks:

- uTorrent suffered a CSRF Attack back in [2008](https://en.wikipedia.org/wiki/Cross-site_request_forgery/) it allowed state changes with GET requests.
- Youtube used to have a security vulnerability in [2008]() that allowed the attacker to perform almost all actions possible for a user, including sending messages, adding to a friends list, etc.

If you click the links above. You'll be able to find examples of real GET requests that create such a CSRF attack. (Don't worry, no weird links over here 😜).

### CSRF Attacks with POST requests

CSRF Attacks with POST requests follow the same pattern — but they cannot be sent through links or image tags. They need to be sent through a form or through JavaScript.

Let's assume we have the same vulnerable endpoint and the attacker simply needs to enter the `account` and `amount` information to trigger the request.

```shell
POST https://bank.com/transfer?account=Attacker&amount=9999
```

The attacker can create a form and hide the `account` and `amount` values from the user. People who click this misrepresented form will send the POST request without them knowing.

```html
<!-- Form disguised as a button! -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="acct" value="Attacker" />
  <input type="hidden" name="amount" value="9999" />
  <button>View my pictures</button>
</form>
```

This form can also be executed with JavaScript automatically without people knowing — real users don't even need to click the button but they are already in trouble.

```html
<form>...</form>
<script>
  const form = document.querySelector('form')
  form.submit()
</script>
```

POST CSRF Attacks are scary, but there are ways to prevent them. We'll talk about the techniques in the prevention section below.

### CSRF Attacks with PUT and DELETE requests

CSRF Attacks **cannot** be executed with `PUT` and `DELETE` requests because the technologies we use don't allow them to.

Yup. You read that right.

CSRF Attacks cannot be executed via HTML forms because forms don't support `PUT` and `DELETE` requests. It only supports `GET` and `POST`. If you use any other method (except for `GET` and `POST`), browsers will automatically convert them into a GET request.

```html
<!-- Form doesn't send a PUT request because HTML doesn't support PUT method. This will turn into a GET request instead. -->
<form action="https://bank.com/transfer" method="PUT"></form>
```

So you can never execute a CSRF Attack via a HTML from.

Now here's a fun aside: How do people send `PUT` and `w` requests through a form if HTML doesn't allow it? After some research, I discovered most frameworks let you send a `POST` request with a `_method` parameter.

```html
<!-- How most frameworks handle PUT requets -->
<form method="post" ...>
  <input type="hidden" name="_method" value="put" />
</form>
```

You can execute a `PUT` CSRF Attack via JavaScript, but the default prevention mechanism in browsers and servers today make it really hard to for these attacks to happen — you have to deliberately let down the defenses for it to happen.

Here's why.

To execute a `PUT` CSRF Attack, you need to send a Fetch request with the `put` method. You also need to include the `credentials` option.

```js
const form = document.querySelector('form')

// Sends the request automatically
form.submit()

// Intercepts the form submission and use Fetch to send an AJAX request instead.
form.addEventListener('submit', event => {
  event.preventDefault()
  fetch(/*...*/, {
    method: 'put'
  credentiials: 'include' // Includes cookies in the request
 })
    .then(/*...*/)
    .catch(/*...*/)
})
```

This wouldn't work because of three reasons.

**First, this request will NOT be executed by browsers** automatically because of CORS. Unless — of course — the server creates a vulnerability by allowing requests from anyone with the following header:

```shell
Access-Control-Allow-Origin: *
```

Second, even if you allow all origins to access your server, you still need a `Access-Control-Allow-Credentials` option for browsers to send cookies to the server.

```shell
Access-Control-Allow-Credentials: true
```

Third, even if you allow cookies to be sent to the server, browsers will only send cookies that have the `sameSite` attribute set to `none`. (These are also called third-party cookies).

If you have no idea what I'm talking about regarding the third point, you're safe — you really have to be a malicious developer who wants to screw your server up if you send authentication cookies as third-party cookies.

This section is huge to take in. I created a few more articles to help you understand exactly what's going on — and why it's so frigging impossibly hard to expose yourself to a `PUT` CSRF Attack:

- [Understanding sameSite cookies](/blog/samesite-cookies)
- [Understanding Fetch credentials](/blog/handling-cookies-with-fetchs-credentials)

In short — you only have to worry about `POST` CSRF Attacks unless you really screwed up your server.

## CSRF Prevention methods

The most common CSRF prevention methods today are:

- Double Submit Cookie pattern
- Cookie to header method

Both methods follow the same formula.

When the user visits your website, your server must create a CSRF token and place them in the browser's cookies. Common names for this token are:

- CSRF-TOKEN
- X-SRF-TOKEN
- X-XSRF-TOKEN
- X-CSRF-TOKEN

Use whatever token name you prefer. They all work.

What's important is the CSRF Token must be a randomly generated, cryptographically strong string. If you use Node, you can generate the string with `crypto`.

```js
import crypto from 'crypto'

function csrfToken (req, res, next) {
  return crypto.randomBytes(32).toString('base64')
}
```

If you use Express, you can place this CSRF token in your cookies like this. While doing so, I recommend using the `sameSite` strict option as well. (We'll talk about `sameSite` in a bit).

```js
import cookieParser from 'cookie-parser'

// Use this to read cookies
app.use(cookieParser())

// Setting CSRF Token for all endpoints
app.use(*, (req, res) => {
  const { CSRF_TOKEN } = req.cookies

 // Sets the token if the user visits this page for the first time in this session
 if (!CSRF_TOKEN) {
  res.cookie('CSRF_TOKEN', csrfToken(), { sameSite: 'strict' })
 }
})
```

How you use the CSRF Token changes depending on whether you support the Double cookie submit pattern or the Cookie to header method (or both).

### Double Submit Cookie pattern

This pattern's name is a bit misleading — because it seems to mean sending a cookie twice with "Double Submit Cookie".

What this actually means is:

1. You send the CSRF Token in a cookie
2. You render the `<form>` with a CSRF Token — which would be included in the form's submission.

(Hence double submission).

If you use Express, you can pass the CSRF Token into the HTML like this:

```js
app.get('/some-url', (req, res) => {
  const { CSRF_TOKEN } = req.cookies

  // Render with Nunjucks.
  // Replace Nunjucks with any other Template Engine you use
  res.render('page.nunjucks', {
    CSRF_TOKEN: CSRF_TOKEN
  })
})
```

You can then use `CSRF_TOKEN` in the form like this:

```html
<form>
  <input type="hidden" name="csrf" value="{{CSRF_TOKEN}}" />
  <!-- ... -->
</form>
```

The server can then check the validity of the session by comparing two CSRF Tokens. If they match, it means the request is not forged — because there is no way for an attacker to guess the CSRF token value in another website.

```js
// Checks the validity of the CSRF Token
app.post('/login', (req, res) => {
  const { CSRF_TOKEN } = req.cookies
  const { csrf } = req.body

  // Abort the request
  // You can also throw an error if you wish to
  if (CSRF_TOKEN !== csrf) return

  // ...
})
```

### Cookie to Header method

The cookie to header method is similar — except this is executed with JavaScript. In this case, the CSRF Token must be included in both the cookie and the request header.

In this case, we need to:

1. Set `credentials` to `include` or `same-origin` to include cookies
2. Grab the CSRF token from `document.cookies` and add it as a request header.

Here's an example request:

```js
// Gets the value of a named cookie
function getCookie () {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]
}

// Sends the request
fetch('/login', (req, res) => {
  credentials: 'include',
  headers: {
    'CSRF_TOKEN': getCookie('CSRF_TOKEN')
 }
})
```

The server can check the validity of the CSRF Token like this:

```js
// Checks the validity of the CSRF Token
app.post('/login', (req, res) => {
  const { CSRF_TOKEN } = req.cookies
  const { CSRF_TOKEN: csrf } = req.headers

  // Abort the request
  // You can also throw an error if you wish to
  if (CSRF_TOKEN !== csrf) return

  // ...
})
```

### Make all these easier with a library

I showed you how to manually create and test CSRF Tokens because I wanted to give you an understanding of the process.

This process has already been solved many times so we shouldn't do it manually (unless you're learning, like what I did here).

If you use Express, I recommend using the [csurf](https://github.com/expressjs/csurf) library since it's more robust and flexible compared to what I could show in this example above.

### SameSite Cookie attribute

Setting `sameSite` to `strict` in the above example ensures the CSRF Token cookie is only sent to the server if the request originates from the same website. This ensures the CSRF Token will never be leaked to external pages.

You can — optionally but recommended — set the `sameSite` attribute to `strict` as you set the authentication cookie. This ensures no CSRF Attacks can be conducted since the authentication cookie will no longer be included in cross-site requests.

Do you need the CSRF Token protection if you used set `sameSite` to `strict` for your authentication cookie?

I would say no in most cases — because `sameSite` already protects the server from cross-site requests. But we still need the CSRF token to protect against one particular type of CSRF: Login CSRF.

You can read more about sameSite cookies in [this article](/blog/samesite-cookies).

## Login CSRF

A Login CSRF is completely different from a Normal CSRF Attack in terms of intent.

**In a Login CSRF, the attacker tricks a user into logging in with the attacker's credentials**. Once the attack succeeds, the user will continue to use the attacker's account if they're not paying attention.

```html
<form action="http://target/login" method="post">
  <input name="user" value="Attacker" />
  <input name="pass" type="password" value="AttackerPassword" />
  <button>Submit</button>
</form>
```

They can also trigger the form automatically with JavaScript.

```js
const form = document.querySelector('form')

// Sends the request automatically
form.submit()
```

If the user doesn't realize they have been logged into the attacker's account they may add personal data — like credit card information or search history — to the account. Attackers can then log back into their accounts to view these data.

Google was vulnerable against Login CSRF Attacks [in the past](https://seclab.stanford.edu/websec/csrf/csrf.pdf).

We can prevent Login CSRF with the Double Submit Cookie pattern mentioned above — attackers will not be able to guess the CSRF Token, which means they cannot launch a CSRF Login Attack.

## Wrapping up

CSRF stands for across Site Request Forgery. There are two kinds of CSRF Attacks:

1. Normal CSRF
2. Login CSRF

In Normal CSRF, the attacker aims to create a state change through a request.

In Login CSRF, the attacker aims to trick the user into logging into the attacker's account — and hopefully benefit from the user's actions if they are unaware.

You can prevent both kinds of CSRF Attacks with the Double Submit Cookie pattern and the Cookie to header method. Setting `sameSite` to `strict` prevents normal CSRF but not Login CSRF.

That's it!
