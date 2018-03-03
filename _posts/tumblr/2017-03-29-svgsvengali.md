---
layout: post
title: SVG...Svengali?
date: '2017-03-29T23:11:18-04:00'
tags: []
---
These puns are getting worse. I’m sorry.

I wanted to mention a couple of things not related [grid]({{ site.baseurl }}/grid-your-lions-for-css-grid) that I learned about CSS while making my [homepage](http://jingyufan.club). First, I used viewport units for some spacing and typography. One viewport unit is measured as 1/100th of the viewport size and can be height based (vh), width based (vw), or the smaller (vmin) or the larger (vmax) of the two. Thus the size of the element is a ratio of the window size and this is pretty handy for responsive design. I wrote one media query to slightly alter the layout and type size for smaller screens.

I also used inline svg images for my social icons. The nice thing about inline svg is that you can style it using CSS, circumventing the need for javascript or other libraries. For example, I can change the color of images with icon class by using the svg fill property and also animate the transition.

```css
.icon {
  fill: rgba(176, 4, 44, 0.9);
  transition: fill 400ms ease;
  height: 24px;
}
.icon:hover {
  fill: rgba(255, 0, 23, 0.9);
  transition: fill 400ms ease;
}
```

The HTML markup will not look as clean because it contains all the paths to draw the object, but for a small project and this CSS enthusiast, inline svg is just the ticket.

If you use Adobe Illustrator, it’s easy to retrieve the code for your svg image. Prepare your vector graphic and save as svg. The svg options dialog box will appear and clicking on the button ‘SVG Code...’ will show the code that you can copy and paste into your HTML file. Alternatively, you can use [SVG Optimiser](http://petercollingridge.appspot.com/svg-optimiser) to create the inline code or optimize what you already have.
