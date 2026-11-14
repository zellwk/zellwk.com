---
title: State of Affairs — Updates for UAJS and ECSS
---

It's been a while since I sent you any updates about what's going on at Zellwk.com. I'd like to experiment with sending update emails once a month to let you know what's happening behind the scenes. These emails will only be sent to customers like you.

At any point, if you don't want to receive monthly updates about what's going on, feel free to click the unsubscribe link below that says "Unsubscribe from State of Affairs emails".

## UAJS and ECSS

I finally resolved the backend server issues that let me serve up both UAJS and ECSS courses in their respective platforms.

The links are as follows:

- [Understanding Async JS](https://students.asyncjs.today/)
- [Essential CSS](https://students.essentialcss.today/)

You can log in with the following credentials:

- Email: This email address you're using
- Password: 12345678

Note: Your login credentials are shared across all courses you're taking at zellwk.com. If you change the password in UAJS, you can log in with that new password in Learn JavaScript, Essential CSS, etc.

For those who are curious, the main problem I had with my server was regarding using Let's Encrypt with Digital Ocean and Cloudflare.

Let's Encrypt allows you to get SSL certificates for free. Having an SSL certificate allows people to browse your website with a protocol. It's important to have since browsers deter people from viewing websites without with a big warning.

Let's Encrypt works flawlessly with Digital Ocean, but it messes up when I tried to use it with Cloudflare. Unfortunately, most online articles weren't very helpful in resolving this situation. I managed to find a resolution though!

## PPP is coming to Learn JavaScript

I've been thinking about PPP for Learn JS for a while now. I didn't want to include PPP previously because it wouldn't have been "fair" for people to pay differing prices and yet receive the same amount of service for the course.

After thinking for a long time, I decided to one way to remove this "unfairness" was to remove community support for those who purchased via PPP.

Does this sound fair to you? I'm open to hearing opinions and suggestions :)

That's it for today!

Do you enjoy these status updates? If yes, what would you like to hear more of? Please reply and let me know!
