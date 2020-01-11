---
layout: post
title: Building a login system with HTML, CSS, and JavaScript
description: I built a login system with HTML, CSS, and JavaScript when I made Learn JavaScript's student portal. I'd like to share this system with you since it seems to work well. 
slug: frontend-login-system
tags:
  - javascript
  - html
  - css
---

I built a login system with HTML, CSS, and JavaScript when I made Learn JavaScript's student portal. I'd like to share this system with you since it seems to work well. 

<!-- more -->

## How the system works

The system goes like this: 

1. Let user login at the login page 
	1. Upon login, store user's information in `localStorage`. 
	2. Redirect to the content page 
2. When student lands on a page 
	1. Check if student can access the page 
	2. If yes, allow student to enter
	3. If no, redirect to login page 

## Logging in

Students can log in to the course with their email address and a password. 

<figure role="figure">
  <img src="/images/2020/login-system/login.png" alt="Login form. It has two fields: email address and password.">
</figure>

When they submit the form, I send their email and password to my server through a POST request. Here's what the request looks like: 

```js
async function basiclogin (email, password) {
  const response = await zlFetch.post(loginEndpoint, {
    auth: {
      username: email,
      password: password
    },
    body: { /*...*/ }
  })
}
```

:::note
`zlFetch` is a library I built to make the Fetch API easier to use. You can find out more about `zlFetch` [here][1]. The `auth` option transforms `username` and `password` into a basic authentication header. 
:::

My server uses [JSON Web Tokens][2] (JWT) to authenticate users. It sends back a JWT token. The JWT token is a long string that looks like this: 

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJaZWxsIiwiZW1haWwiOiJ6ZWxsd2tAZ21haWwuY29tIiwiaWF0IjoxNTc3ODYzNzc3LCJleHAiOjE1ODA0NTU3Nzd9.i3rOwqV1Bc-JEAaxT7lHZHUlDuFf9ADVP7qjy50WqT0
```

This token acts as credentials for future logins. I save this token inside `localStorage` so I can log students in automatically. 

```js
async function basiclogin (email, password) {
  const response = await zlFetch.post(/*...*/)
  const { token } = response.body
  
  localStorage.setItem('token', token)
}
```

## Checking if the student is logged in

To check whether a student is logged in, I check the `localStorage` for the token. If `localStorage` doesn't have a `token`, I know the student has not logged in. 

```js
async function isLoggedIn () {
  const token = store.get('token')
  if (!token) return false
}
```

If the student is not logged in, I redirect them to the login page.  

```js
async function autoRedirect () {
  const validLogin = await isLoggedIn()
  if (!validLogin && location.pathname !== '/login/') redirect('/login')
  if (validLogin && location.pathname === '/login/') redirect('/')
}
```


If the `localStorage` has a token, I still need to check the validity of this token. To do this, I send another POST request to my server. 

```js
async function isLoggedIn () {
  // ...
  // Checks validity of token
  const response = await zlFetch.post(loginEndpoint, {
    auth: token,
    body: { course: 'learn-javascript' }
  })
}
```

If the response is successful, my server returns another token with a new expiry date. This new token allows students to remain logged in for a longer period. 

```js
async function isLoggedIn () {
  // ...
  // Saves token into localStorage again
  const { token } = response.body
  localStorage.setItem('token', token)

  return true
}
```


### Updating a student's access level

Besides `token`, I store a student's "access level" inside `localStorage` as well. This "access level" determines what lessons a student can access. 

<figure role="figure" aria-label="Students can access these lessons">
  <img src="/images/2020/login-system/can-access.png" alt="">
  <figcaption>Students can access these lessons</figcaption>
</figure>

<figure role="figure" aria-label="Students cannot access these lessons">
  <img src="/images/2020/login-system/cannot-access.png" alt="">
  <figcaption>Students cannot access these lessons</figcaption>
</figure>

I store this access level when the student logs in for the first time. 

```js
function basiclogin (email, password) {
  const response = await zlFetch.post(/*...*/)
  const { token, user } = response.body
  // ...

  // user contains accessLevel
  localStorage.setItem('user', user)
}
```

I store the access level again when the token is validated. This allows me to: 

1. Prevent students from tampering with their `localStorage` (and getting access to lessons they should not have) 
2. Update a student's access automatically once they upgraded to a higher tier

Two birds with one stone!

```js
function isLoggedIn () {
  // ...
  const { token, user } = response.body
  localStorage.setItem('user', user)
}
```

## Logging out

It's simple to logout. We just have to clear the items we placed in `localStorage`. 

```js
function logout () {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
```

## Preventing access for students without JavaScript

This course is built with a static site generator. Each lesson is a plain HTML file. Students can bypass the authentication layer and read the HTML directly if they turned off JavaScript. 

This should not happen. 

To prevent people from turning off their JavaScript to view lessons, I added a `no-js` class to the HTML element. 

```html
<html lang="en" class="no-js">...</html>
```

I remove this `no-js` class when there's JavaScript. 

```js
document.documentElement.classList.remove('no-js')
```

And I hide the main content if the user turned off JavaScript. 

```css
/* Disallow access if there's no JavaScript */
.no-js main {
  display: none !important;
}
```

## A message to turn on JavaScript

Students who try to access the course portal without JavaScript will see a blank page. They may get confused and think the page didn't load. 

I need to tell these students to turn on JavaScript, so I added a `<noscript>` tag. 

```html
<noscript>This course portal requires JavaScript to verify your identity. Please enable JavaScript to access the course.</noscript>
```

<figure role="figure">
  <img src="/images/2020/login-system/noscript.png" alt="Noscript message">
</figure>

That's the entire login process! 

[1]:	https://github.com/zellwk/zl-fetch
[2]:	https://en.wikipedia.org/wiki/JSON_Web_Token