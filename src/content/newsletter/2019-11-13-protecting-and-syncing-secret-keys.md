---
title: Protecting and syncing secret keys
---

You should never expose API keys or secrets. If you expose them, you might get into trouble. Once, I had to almost had to pay an excessive amount because my friend leaked my Amazon API key by accident.

What’s the amount? I can’t remember, but I think somewhere between $20,000 to $60,000. Thankfully, Amazon waived the charges.

It’s big trouble if you expose your API keys. So don’t expose them.

The best way to protect your API keys is to use environment variables.

[https://zellwk.com/blog/environment-variables](https://zellwk.com/blog/environment-variables)
