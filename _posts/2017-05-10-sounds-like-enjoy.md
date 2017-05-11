---
layout: post
title: Sounds Like Enjoy
---
At the last CSS Layout Club meeting, Jen Simmons suggested I look at using the "cicada principle" with CSS elements to create "random" designs. [As an evolutionary strategy](http://www.newyorker.com/tech/elements/the-cicadas-love-affair-with-prime-numbers), certain cicadas emerge in prime-numbered intervals like thirteen or seventeen years. Since prime numbers may not be evenly divided into smaller integers, cicada life cycles become naturally asynchronous with those of predators that have a two-to-ten-year population cycle, leaving them immune. We can use this idea of prime-numbered intervals to generate seemingly random, non-repeating image patterns.

I probably drink three cans of LaCroix a day and I wanted to make something that reflected my love for this beverage. I made several PNG images with transparent areas and adjusted their dimensions to prime numbers, e.g. squares of 337px or 409px, etc. In the CSS I add multiple files to the `background-image` property, and the list order determines the layer order of the images starting with the top one at the forefront.
```css
body {
  background-image:
  url('../images/berry.png'),
  url('../images/flowers.png'),
  url('../images/peony.png'),
  url('../images/grapefruit.png'),
  url('../images/avocado.png'),
  url('../images/pomelo.png'),
  url('../images/cuke.png'),
  url('../images/tangerine.png');
}
```
I played around with the dimensions to get the effect I wanted. I can imagine adjusting the transparency of the images to mix new colors where the tiles overlap. And even though the full pattern looks complex, I can keep the file size fairly small. After compressing the images with [TinyPNG](https://tinypng.com/), the file sizes ranged from 5kb to 20kb each. LaCroix, please send me soda!
