---
title: "Mongoose 101: Population"
---

MongoDB documents have a size limit of 16MB. This means you can use subdocuments (or embedded documents) if they are small in number.

For example, Street Fighter characters have a limited number of moves. Ryu only has 4 special moves. In this case, it’s okay to use embed moves directly into Ryu’s character document.

![](https://files.convertkitcdnm.com/assets/pictures/393/2648693/ryu.png)

But if you have data that can contain an unlimited number of subdocuments, you need to design your database differently.

One way is to create two separate models and combine them with populate.

[https://zellwk.com/blog/mongoose-population](https://zellwk.com/blog/mongoose-population)
