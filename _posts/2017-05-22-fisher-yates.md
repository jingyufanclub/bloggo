---
layout: post
title: Sounds Like Enjoy - Salient Points
---
Randomize image selection
![la croy wallpaper]({{ site.baseurl }}/images/lacroy.jpg)

```js
const images = ['avocado', 'berry', 'cuke', 'flowers', 'grapefruit', 'peony', 'plain', 'pomelo', 'tangerine']

  function randomize(array) {
    // Choose random integer between two values, inclusive, i.e. minimum 4, maximum number of items in array: Math.floor(Math.random() * (max - min + 1)) + min
    let n = Math.floor(Math.random() * (array.length - 4 + 1)) + 4;

    let randomizedImages = [];

    // Iterate n times and randomly select an item to remove by splicing and put that item into a new array
    while (n) {
      image = array.splice(Math.floor(Math.random() * array.length), 1);
      randomizedImages.push("url('images/" + image.toString() + ".png')");
      n--
    }
    return randomizedImages;
  }
  ```

  compact array with each splice

  shuffle the array in place using Fisher-Yates O(n) and select a subset of that array.
  ```js
  function shuffle(array) {
    let currentIndex = array.length, temp, randomIndex;
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex--);
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
```
I grabbed the debounce function from the Underscore library
```js
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
  };
```
