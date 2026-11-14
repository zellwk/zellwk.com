---
title: Update for hiding content accessibly
ps: |-
  P.S. Phew! This is was more work than I expected! Lemme take a break for a week to cool off. I’ll be back with articles in 2 weeks.

  P.P.S. Accessibility testing is one of the most difficult things anyone can do. Hats off to all the accessibility consultants and advocates out there. Thanks for what you do! (It’s a damn freaking hard job!).
---

I’m so glad I posted about my idea for a new way to hide content accessibly yesterday. After I released my post, my twitter feed exploded with activity. (It’s not the viral kind of activity though. It’s the kind where we talked about the technical aspects, which I absolutely dig).

I found out that my idea had weird bugs from these conversations. In fact, NONE of the solutions out there are 100% fool-proof.

The best solution I found so far is by a senior accessibility consultant by the name of Joe Watkins. Here’s the solution:

```
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto; /* new - was 1px */**
    margin: 0; /* new - was -1px */
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap; /* 1 */
}
```

An interesting fact you might not know: This snippet works BETTER than the one proposed in HTML5 Boilerplate 🤓.

I updated my article with the conversations we had. I also stated my final conclusion on this topic. Here’s the updated article.

[https://zellwk.com/blog/hide-content-accessibly/](https://zellwk.com/blog/hide-content-accessibly/)

I thought you might enjoy this!
