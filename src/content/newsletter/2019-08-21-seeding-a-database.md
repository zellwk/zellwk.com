---
title: Seeding a database
---

When you write tests for the backend, you need to test for four different kinds of operations:

1. Create (for adding things to the database)
2. Read (for getting things from the database)
3. Update (for changing the database)
4. Delete (for deleting things from the database)

The easiest type to test for is create operations. You put something into the database and test whether it’s there.

For the other three types of operations, you need to put something into the database _before_ you write the test.

The process of putting things into the database at the start is called **Seeding the database**.

Today, I want to share how I seed the database automatically. Here’s the article. Enjoy!

[https://zellwk.com/blog/seed-database](https://zellwk.com/blog/seed-database)
