---
layout: post
title: How to debug a Github Actions' secret
description: How to debug a Github Actions' secret so it no longer shows ***. 
slug: debug-github-actions-secret
tags: 
  - github actions
  - tooling
  - DevOps
---
One irritating thing about Github Actions is you can't debug secrets. If you try to debug secrets you'll get `***` in the log.   

<figure role="figure">
  <img src="/images/2021/debug-github-actions-secret/run-echo.png" alt="run echo">
</figure>

This makes sense because Github is trying to help us keep the secret secret (ha!). But it doesn't help when we're trying to figure out whether there's something wrong with the secret we provided. 

<!-- more --> 

There's still a way to show this secret if you really want to show it. You can separate the characters with a space using the following code. The secret will now show up.   

```javascript
run: echo ${{secrets.YOUR_SECRET }} | sed 's/./& /g'
```  

<figure role="figure">
  <img src="/images/2021/debug-github-actions-secret/separate-characters.png" alt="separate characters with a space">
</figure>

That said, **make sure you're testing a fake secret if you use this method**, since this secret will get logged into the Github Actions panel for everyone to see.   

  
