---
layout: post
title: What programming languages should you learn?
description: What to consider when picking languages. What not to worry about. And recommendations for languages to learn. 
slug: languages-to-learn
tags:
  - html
  - css
  - javascript
---

There are LOTS of languages. Picking one (or two, or three! 😱) can be scary and overwhelming at first. In this article, I want to share three things:

1. What to consider when picking languages
2. What NOT to worry about when you pick languages 
3. Recommendations for languages to learn

<!-- more -->

For this article, I assume you want **to be a web developer**. If you don't want to be a web developer, then these considerations and recommendations do not apply to you.

## Two categories of web development

Web development can be divided into two large categories: 

1. Frontend
2. Backend 

I wrote about the difference between Frontend and Backend in detail in "[Frontend vs Backend][1]". 

The basic gist is: 

1. Frontend is about stuff a user can see (and touch). 
2. Backend is about stuff a user cannot see (or touch). 

## Must-learn languages

It doesn't matter whether you want to specialize in Frontend or Backend (or both). **You need to know these two languages**: 

1. HTML 
2. CSS

I wrote more about the difference between HTML, CSS, and JavaScript in [this article][2]. The basic gist is: 

1. HTML is used to structure a website. 
2. CSS makes it look nice(r). 

**You don't have to be an expert in either one**. You just need to know the basics before you decide whether to work on your Frontend or Backend skills. 

You also need to learn a little bit of server stuff (more on this in the [Server][3] section later). 

## Learning Frontend Development

If you want to specialize in Frontend, **you need to become good at these three languages:** 

1. HTML
2. CSS
3. JavaScript

Here's what I measure by good. 

1. For HTML: 
	1. You know how to create a structure for the site
	2. You know when to use which tag (and why)
2. For CSS: 
	1. You know how to create responsive websites
	2. You can get things to look exactly as you want it to
3. For JavaScript: 
	1. You know how to add interactions. For example, if a user clicks a button, you can get a menu to show up. 
	2. You know how to use APIs 
	3. You know how to create keyboard shortcuts
	4. You know how to make accessible components

Of course, there's much more to each language than what I mentioned above. You can spend years honing your skills and becoming amazing at each language. But I know you're not looking so far ahead yet 😉. 

When it comes to these three languages: 

1. HTML is easy for most people
2. CSS starts off easy, but it becomes hard later
3. JavaScript is scary for most people

By the way, I wrote a [huge course on JavaScript][4]. If you need help, look at the course details. I'm sure it can help you. 

## Learning backend development

Backend can be split into three parts:

1. Backend languages 
2. Databases 
3. Servers

### Backend languages

There are many backend languages. You can choose from: 

1. [PHP][5] 
2. [Node][6] (JavaScript on the backend) 
3. [Python][7] 
4. [Ruby][8]
5. [Go][9]
6. ...

These languages do the same thing. They let you serve up a website from a server (more on servers later). You don't need to learn everything. Pick one.

**Learn one language.**

Don't learn any other backend languages until you're proficient enough to build stuff without googling (much). 

What language you choose depends on what you want to build. 

- If you want to **build Wordpress websites**, you need to learn **PHP**. 
- If you want to **build an app**, you can go with **any language**. 

If you want to build an app, I recommend choosing one of these: 

1. Node
2. Ruby
3. Python

Again, **doesn't matter which one you pick**. Pick one and go. **I chose Node** because I can use JavaScript both on the frontend and backend. I don't have to switch between languages)

When you pick a backend language, you also want to **pick a framework** to go with it. It's hard to build a backend without a framework. Plus, tutorials and books usually teach you how to use a framework (and not build things from scratch).  

I suggest you **use these frameworks** if you don't know what to choose: 

1. [Express][10] (for Node)
2. [Ruby on Rails][11] (for Ruby)
3. [Django][12] (for Python)

### Databases

**Databases let you save things.**

For example. Let's say you logged into Twitter. How does Twitter know you're you? The answer is they saved your login information and your preferences in a database. 

When it comes to databases, there are two main types: 

1. SQL Databases 
2. No-SQL Databases 

Note: SQL can be spoken as "sequel". When people say "sequel", they mean SQL. Same thing. 

Again, both types of databases work. You don't want to learn both types when you're starting out. **Pick one and go.** Doesn't matter which you pick. **Don't worry about pros and cons** (you're won't know enough to evaluate the differences at this stage). 

If you pick SQL databases, you can choose from three: 

1. [MySQL][13]
2. [SQLite][14]
3. [PostgreSQL][15]

If you pick No-SQL databases, popular choices include: 

1. [MongoDB][16]
2. [Redis][17]

Again, **pick one and go**. Don't get paralyzed. **I chose MongoDB** because people were talking about MongoDB when I started learning. (See, pick and go!). 

You can (and will) learn about their differences as you get more advanced. No hurry to learn the differences. **Build something first.** 

### Servers

**Servers are where you host your website.** They can go from simple to super-duper complicated. 

For servers, you can choose from these platforms: 

1. [Now][18]
2. [Netlify][19]
3. [Heroku][20]
4. [Digital Ocean][21]

Both **Now and Netlify** let you host **static frontend** websites easily. (And they're free!). If you only need frontend stuff, then go for Now.sh or Netlify. 

**Heroku** is a good choice if you want to build an app, but you're **not ready to dive into server** configurations. 

**Digital Ocean** is a good choice to **configure your own server**. (The link above gives you $50 credit). 

### Configuring a server

**Servers are hosted on Linux machines** (not Windows, not Mac). This means you need to learn to use Linux when you configure a server. 

Before learning Linux, you need to **be comfortable with the command line**. ([Here][22]'s a good place to start). 

You also need to **pick a language**. Here, you can choose from:

1. [Apache][23] 
2. [Nginx][24]

Again, pick one and go. **I used Apache initially** when I first built websites (because it was configured for me). **Later, I moved on to Nginx** when I configured my server. Today, this blog (and almost everything I build) runs on a Digital Ocean server. 

## Wrapping up

Here's a quick summary. 

**Web development can be split into two categories**: Frontend and Backend. 

It doesn't matter whether you want to be a frontend developer or backend developer (or full-stack, if that's what you want). **You need to know the basics of HTML and CSS**. 

If you want to become a frontend developer, you need to become good at HTML, CSS, and JavaScript. 

If you want to become a backend developer, you need to: 

1. Choose one backend language
2. Choose one database language

Start by building a website on Now.sh or Netlify. Then, move to Heroku. Finally, configure your own server with Digital Ocean. 

When you configure your server, you need to:

1. Learn to use Linux
2. Choose between Apache or Nginx

There's a lot of stuff going on here. **Take your time to learn**. Don't rush. Enjoy the learning process :) 

[1]:	/blog/frontend-vs-backend "Frontend vs backend"
[2]:	/blog/difference-between-html-css-javascript
[3]:	#configuring-a-server
[4]:	https://learnjavascript.today "Learn JavaScript"
[5]:	https://www.php.net "PHP"
[6]:	https://nodejs.org/en/ "Node"
[7]:	https://www.python.org "Python"
[8]:	https://www.ruby-lang.org/en/ "Ruby"
[9]:	https://golang.org "Go"
[10]:	https://expressjs.com "Express"
[11]:	https://rubyonrails.org
[12]:	https://www.djangoproject.com
[13]:	https://www.mysql.com
[14]:	https://www.sqlite.org
[15]:	https://www.postgresql.org
[16]:	https://www.mongodb.com
[17]:	https://redis.io
[18]:	https://zeit.co
[19]:	https://www.netlify.com
[20]:	https://www.heroku.com
[21]:	https://m.do.co/c/64daa7a7a455 "Digital Ocean"
[22]:	/blog/fear-of-command-line/ "Overcome fear of command line"
[23]:	https://httpd.apache.org
[24]:	https://nginx.org/en/
