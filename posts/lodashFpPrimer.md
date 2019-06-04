# Lodash/FP - A Primer

Throughout my professional career, functional programming has been the
mythical paradigm that developers talk about in both fear and awe. Quotes
like: "There's this cool new language, but its _functional_ so I guess I
won't learn it", and "Functional languages are so verbose. Why would I use
one instead of an OO language?" are commonplace. At the same time, when
looking at successful projects written in functional languages, developers
are in awe of the elegance, power, and conciseness of the style. A large
barrier to getting started with functional programming is the terminology. In
this post I'll cover the basics of functional programming and explain some of
the terms used in the [lodash/fp
documentation](https://github.com/lodash/lodash/wiki/FP-Guide) so it makes
more sense.

## Terminology - An Overview

First off we need to see some terms and definitions we'll use throughout the
article. Don't worry if you don't understand them now; we'll get into the
weeds later.

1. **First-Class Function**: functions can be assigned to variables
2. **Curry**: to partially execute a function
3. **Immutability**: unable to be modified
4. **Iteratee**: an operation (function) to be performed on data
   1. **Variadic Iteratee**: an overloaded iteratee
5. **Arity**: number of arguments are required before a function executes
6. **Composition**: practice of making a function by calling multiple
   iteratees in sequence

## First-Class Functions

In object-oriented languages, functions are a way to modify data in an object.
In order to invoke a function, you need an instance of an object first and
then you invoke the function on the object. In functional languages, functions
are what's called **first-class functions**.