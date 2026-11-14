---
title: How to debug a Github Actions' secret
---

One irritating thing about Github Actions is you can't debug secrets. If you try to debug secrets you'll get \*\*\* in the log.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fzellwk%2F7BGXQ29ALg.png?alt=media&token=a1a0acb5-f313-4127-a487-eb3acc2088fa)

This makes sense because Github is trying to help us keep the secret secret (ha!). But it doesn't help when we're trying to figure out whether there's something wrong with the secret we provided.

There's still a way to show this secret if you really want to show it. You can separate the characters with a space using the following code. The secret will now show up.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fzellwk%2Fmg53L0avdg.png?alt=media&token=dd76ee6b-4323-4d0f-bcd3-127e288e5e56)

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fzellwk%2FNDoblJ013-.png?alt=media&token=821717c6-2de7-4267-af27-3fa33db20a12)

That said, **make sure you're testing a fake secret if you use this method**, since this secret will get logged into the Github Actions panel for everyone to see.

[Here's the article](https://zellwk.com/blog/debug-github-actions-secret) if you want to share this with someone 😉. Enjoy!
