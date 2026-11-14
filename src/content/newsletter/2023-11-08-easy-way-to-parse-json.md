---
title: Easy way to parse JSON
---

When you use \`JSON.parse\` to parse JSON, you almost always need to make sure you pass in a JSON value, so you will end up having to use a try/catch block most of the time.

Most of the time, you'll also want to set a default value when the parsing fails. So the code ends up looking like this:

I think this process can be simplified so I created a helper function, `parseJSON` that lets you do these two things in a single line:

1. Specify the JSON content to parse.
2. And if that fails, specify a default value.

It looks like this:

Simple right? 😄.

[In today’s post](https://zellwk.com/blog/easy-way-to-parse-json), I’m going to show you how to install `parseJSON` and use it in your project.

It’ll be so much easier to use JSON from this point onwards :)

so much easier to use JSON from this point onwards :)
