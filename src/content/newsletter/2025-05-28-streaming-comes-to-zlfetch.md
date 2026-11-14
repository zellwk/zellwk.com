---
title: Streaming comes to zlFetch
---

If you’ve never heard of zlFetch before, it’s a library that I’ve created that helps you with the Fetch API. It provides a ton of quality of life improvements like:

- Automatic response solution (so no need to use `response.json`)
- Promise-like error handling
- Usage with `await` easily
- Simple Basic and Token based authentication headers
- And a [ton of other things](https://github.com/zellwk/zl-fetch)

Just my personal opinion:

- It’s better than [axios](https://www.npmjs.com/package/axios) cos it’s less complicated
- It’s better than [ky](https://www.npmjs.com/package/ky) cos it has better defaults

Last Sunday, I sat down and gave zlFetch a brand new update — streaming capabilities.

- zlFetch can **detect and convert** streams automatically
- zlFetch has a new retry functionality with `zlEventSource`
- zlFetch now has types support so it Typescript users won’t have to face red wriggly line complaints. This update is thanks to Juji.
- zlFetch now has aborting capabilities built in by default — no need to create a new abort controller!

[Read this article for more info](https://zellwk.com/blog/streaming-capabilities-comes-to-zlfetch/)

With new streaming capabilities, zlFetch is better primed for supporting a brand new influx of AI-first applications.

I’m really excited at what this means — and potentially what I’ll be able to build.

I hope you have fun with `zlFetch`!
