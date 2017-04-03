---
layout: post
title: Grid Your Lions for CSS Grid
date: '2017-03-22T22:45:07-04:00'
tags: []
---
I’m really excited about the CSS grid layout implementation that became widely available this month. I personally love the control of hand-coded layout. Imagine positioning elements using two dimensions instead of one and now you can throw out all your frameworks (but hang on to your Sass)!

[Jen Simmons](https://twitter.com/jensimmons) has been [writing](http://jensimmons.com/writing) about and working with grid extensively and I’ve been learning from her [demos](http://labs.jensimmons.com/) and [meetups](https://www.meetup.com/CSS-Layout-Club). To dive into grid, I made a [homepage](http://jingyufanclub.co/) using many of its new [properties](http://jensimmons.com/post/mar-1-2017/wow-grid-has-so-many-properties-do-we-need-them-all). Firefox has an inspector [tool](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_grid_layouts) to help visualize grid layout. Herewith a few examples from my [stylesheet](https://github.com/jingyufanclub/jingyufanclub.github.io/blob/master/stylesheets/index.css).

Grid is not yet available in all browsers, so you ought to write a [feature query](https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/) to test whether the property is [supported](http://caniuse.com/#feat=css-grid).

```css
@supports (display: grid) {
  // code runs only if grid is supported //
}
```

I wrote CSS to use flex display if grid is not supported (not shown). I wanted a simple layout for my page: one column with multiple rows and plenty of whitespace to show off the beautiful background image. Here you can see I used [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) to name my row sections and grid-template-rows to define the height of each row using fractional units to calculate proportions. I added a gap of 6.66% between rows.

```css
.container {
  display: grid;
  grid-template-columns: 1fr;  grid-template-rows: 2fr 1.5fr auto .75fr;
  grid-template-areas:
    "header"
    "content"
    "links"
    "footer";
    grid-gap: 6.66%;
}
```

Then, for the grid area “links”, I used a nested grid to generate boxes of a certain width to fill the width of a column. The browser computes how many columns can fit in each row and automatically wraps to the line. Each list item will occupy one box in the grid. The columns are responsive to the viewport size and I do not have to write any media queries for this to be so.

```css
.projects ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 6.66%;
}
```

For the footer, I nested a grid for social media icons. Here I practiced using explicitly placed elements. First, I created a grid that has one row and six columns of equal width.

```css
.social-icons {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 6.66%;
  height: inherit;
}
```

Then I placed my email icon into the first row, second column.

```css
.email {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
```

The numbers above are not fractions, rather they delineate the starting and ending line numbers of the column in which the element ought to be placed. You can see the line numbers using Firefox inspector tool, but currently this feature is only available with the Nightly build.
