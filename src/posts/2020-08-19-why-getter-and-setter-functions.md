---
layout: post
title: Why use Getters and Setters functions
description: Because they create better and safer code. 
slug: why-use-getter-and-setter-functions
tags:
  - javascript
newsletter: jsr
---

Getter and Setter functions are collectively known as accessor functions. In my previous two articles, I talked about how I created [`mix`][1] because I wanted to use Getter and Setter functions. 

But why do we even use Getters and Setters in the first place? 

<figure role="figure">
  <img src="/images/2020/accessors/why-use-accessors.png" alt="Why use getters and setters?">
</figure>

I have two reasons. 

1. Syntax reasons 
2. Encapsulation 

<!-- more -->

## Syntax reasons

When you try to get the length of an array, you write `array.length`. This `length` property acts like a Getter function. It returns values to you in real-time. 

If `length` is a simple property, `length` will remain no matter how many items you add to the array. Since `length` changes value depending on the length of the array, it proves that `length` is NOT a simple property. 

I'm not sure whether `length` is a Getter function though. It wasn't documented anywhere, but I suspect it is. 

Since we use `array.length` (which acts like a Getter function) to get values, why don't we use other Getter functions to get values too? We're already familiar with this syntax. 

For example, let's say you have a carousel and you want to get the current slide. You have two options: 

1. Create a normal function
2. Create a getter function

Here's what the code would look like: 

```js
const carousel = {
  // Option 1: Normal function
  getCurrentSlide () {/* ... */},
  
  // Option 2: Getter function
  get currentSlide () {/* ...*/}
}
```

First, you can see there's no extra work to define a Getter function. So, why not create one? 

Second, if you use a Getter function, you use it by calling the property. If you use a normal function, you need to call the method by writing parenthesis. 

```js
// Normal function
const currentSlide = carousel.getCurrentSlide()

// Getter function
const currentSlide = carousel.currentSlide
```

I think the Getter function version is neater, terser, and easier to understand. It makes more sense to me. 

On the flip side, we can also use Setter functions instead of normal functions. 

```js
// Normal function
carousel.setCurrentSlide(4)

// Setter function
carousel.currentSlide = 4 // Uses a Setter function
```

Again, the Setter function version looks neater to me. I'm already used to this syntax because I'm used to assigning values with `=`. 

Now, the key is the use Getter and Setter functions to communicate the code's intent. 

- Getters get something
- Setters set something 
- Methods do the rest

Once you get this set of intent down, code written with Getter and Setter functions will become easier to parse. 

Here's an example where we get a value, set a value, and run a process – all done with functions. 

```js
const value = object.getValue() // Gets value
object.setValue(5) // Sets value
object.method() // Runs a process
```

And here's the same version with Getter and Setter functions. 

```js
const value = object.value // Getter
object.value = 5 // Setter 
object.method() // Runs a method
```

Which is clearer to you? To me, the Getter and Setter version is. 

When you use Getter and Setters, it becomes easier to see whether that line of code is GETTING a value, CHANGING a value, or RUNNING a process. You don't even have to pay attention to the specifics of what you wrote. 

Yes, it's a small thing. But small things add up. When it adds up, it saves major brainpower. 

## Encapsulation

The second reason is the ability to create safe code. 

Let's say you have a Car. A Car has fuel. When the car leaves the factory, it has 50 litres of fuel. 

```js
function Car () {
  const fuel = 50
}
```

Cars need to know how much fuel they have left. One way is to expose the entire fuel property. 

```js
function Car () {
  const fuel = 50
  return {
    fuel
  }
}

const car = Car() 
console.log(car.fuel) // 50
```

But when you expose the `fuel` property this way, we allow users to make changes to `fuel` without limits. 

Let's say the car's fuel capacity is 100. They can add any amount and break the car. 

```js
car.fuel = 3000
console.log(car.fuel) // 3000
```

If you used a Getter function, they won't be able to change this `fuel` property. 

```js
function Car () {
  const fuel = 50
  return {
    get fuel () { return fuel } 
  }
}

const car = Car() 
car.fuel = 3000
console.log(car.fuel) // 50
```

Let's push this further. 

If you used a Setter function for `fuel`, you can create a safeguard for the possible limits. Here's one where we make sure the car's fuel never exceeds 100. 

```js
function Car () {
  let fuel = 50
  return {
    get fuel () { return fuel } 
    set fuel (value) {
      fuel = value
      if (value > 100) fuel = 100
    }
  }
}

const car = Car()
car.fuel = 3000
console.log(car.fuel) // 100
```

In short, I like Getter and Setter functions because of two reasons: 

1. Syntax reasons. It's easier and faster to read code created with accessor functions 
2. Encapsulation. I can create safer code with accessor functions. 

That's it! 


[1]:	https://github.com/zellwk/javascript/tree/master/mix
