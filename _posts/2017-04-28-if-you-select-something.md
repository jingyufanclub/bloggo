---
layout: post
title: If You Select Something, See Something.
---
Highlight something on this page.

OMG PINK!

Let me tell you about the CSS pseudo-element `::selection`. It allows you to change the default browser style for selected text. There are three properties you can use:
+  color
+  background
+  text-shadow

For this page I changed selected text to pink with no background color. You'll need the vendor prefix for Firefox to recognize this selector.

```css
::-moz-selection {
  color: $pink;
}
::selection {
  color: $pink;
}
```
You may have noticed the different colors when selecting list items, indicated by the "❥" symbol. I achieved this by writing `::selection` for `nth-child` of `<li>` like so:

```css
li:nth-child(n)::selection  {
  color: $lilacLite;
}
li:nth-child(2n)::selection {
  color: $periwinkle;
}
li:nth-child(3n)::selection {
  color: $lilac;
}
```
On selection, The first element in the list will turn a light lilac color, followed by the second element in periwinkle, and the third in a darker lilac. The colors will repeat in order as more items are added to the list. Pretty!
