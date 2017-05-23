---
layout: post
title: Just Shufflin'
---
Last week I made a [demonstration]({{ site.baseurl }}/sounds-like-enjoy/) using images with prime-numbered dimensions to build a non-repeating background pattern. Then I decided to create a generator that would randomly select a number of images from my collection and change their display order to make a new wallpaper pattern.

![la croy wallpaper]({{ site.baseurl }}/images/lacroy.jpg)
*[I <3 LaCroix]({{ site.url }}/la-croy/)*

Here are some of the mechanics of the project. I made an array of image names and spliced it randomly to create a new array with a length randomly selected between a minimum of four and a maximum of the number of items in the original array.
```js
const images = ['avocado', 'berry', 'cuke', 'flowers', 'grapefruit', 'peony', 'plain', 'pomelo', 'tangerine']
function randomize(array) {
  // Choose a random integer between two values, inclusive, i.e. minimum of 4 and maximum of number of items in original array: Math.floor(Math.random() * (max - min + 1)) + min
  let n = Math.floor(Math.random() * (array.length - 4 + 1)) + 4
  let randomizedImages = []
  // Iterating n times, splice an item at a random index and put it into a new array
  while (n) {
    image = array.splice(Math.floor(Math.random() * array.length), 1)
    randomizedImages.push("url('images/" + image.toString() + ".png')")
    n--
  }
  return randomizedImages
}
```
I researched whether splicing is the most efficient and [unbiased](https://bost.ocks.org/mike/shuffle/compare.html) method to randomize an array and came across the [Fisher-Yates shuffle algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle). [This article by Mike Bostock](https://bost.ocks.org/mike/shuffle/) has a good explanation and visual demonstration of the difference between the two methods. The animations on his page were made with [D3.js](https://d3js.org/), a JavaScript library for data visualization created by Mike Bostock. It shows what while random splicing is unbiased, at each iteration the elements in the original array must shift down to compact the array, resulting in O(n<sup>2</sup>) performance.

In contrast the Fisher-Yates algorithm has O(n) complexity because it would shuffle the elements of the array in place. The tail of the array is used to store the shuffled items while we draw only from the remaining elements at the head.
```js
function shuffle(array) {
  let currentIndex = array.length, temp, randomIndex
  // While there remain elements to shuffle
  while (currentIndex) {
    // Select an element at random from the front (and decrement the bound between shuffled and untouched items)
    randomIndex = Math.floor(Math.random() * currentIndex--)
    // And swap it with the current element at the back
    temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}
```
I also used the Fisher-Yates shuffle to select a random background color from an array of hex codes that would change with each new pattern. I further added the ability to generate a new pattern by clicking a button or by resizing the browser window. In order to avoid a strobing effect when the images and colors change, I limited the rate at which the resize function could be fired by using the debounce method from the Underscore.js library:
```js
function debounce(func, wait, immediate) {
  let timeout
  return function() {
      let context = this, args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(function() {
          timeout = null
          if (!immediate) func.apply(context, args)
      }, wait)
      if (immediate && !timeout) func.apply(context, args)
  }
}
```
