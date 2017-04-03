---
layout: post
title: Learn Me a Haskell!
date: '2017-02-07T17:46:49-05:00'
tags: []
---
My friend who teaches linguistics at Rutgers sent me his Github repo for Haskell exercises designed to introduce his students to computational semantics. Computational semantics uses the results of studying the logical aspects of meaning, i.e. formal semantics, to implement programs that process natural language. Naturally, I decided to learn Haskell so I can woo him through pull requests to his class assignments.

Haskell is a general-purpose functional programming language. It is named after the American mathematician Haskell Brooks Curry, best known for his work on combinatory logic. He has three programming languages named after him: Haskell, Brook, and Curry.

Herewith the main features of Haskell (via [haskell.org](http://www.haskell.org))

*Purely Functional*: Every function in Haskell is a function in the mathematical sense (i.e., "pure"). Even side-effecting IO operations are but a description of what to do, produced by pure code. There are no statements or instructions, only expressions which cannot mutate variables (local or global) nor access state like time or random numbers.

*Type Inference*: You don't have to explicitly write out every type in a Haskell program. Types will be inferred by unifying every type bidirectionally. However, you can write out types if you choose, or ask the compiler to write them for you for handy documentation.

*Lazy*: Functions don't evaluate their arguments. This means that programs can compose together very well, with the ability to write control constructs (such as if/else) just by writing normal functions. The purity of Haskell code makes it easy to fuse chains of functions together, allowing for performance benefits.

*Statically Typed*: Every expression in Haskell has a type which is determined at compile time. All the types composed together by function application have to match up. If they don't, the program will be rejected by the compiler. Types become not only a form of guarantee, but a language for expressing the construction of programs.

These features limit side effects in your program and make Haskell apps concise and less prone to errors. This is important to industries requiring software with high fault tolerances, for example defense and finance. But you can also use Haskell for web development!

Like Ruby, Haskell has many libraries for web frameworks, databases, and templating. Yesod and Spock are analogous to Rails and Sinatra, respectively. For example, Yesod enforces RESTful design and uses an MVC configuration.

You, too, can [learn you a haskell](http://learnyouahaskell.com). Download the Haskell platform [here](https://www.haskell.org/platform/) or

```
brew cask install haskell-platform
```
