---
layout: post
title: Astute Readers, Lazy Loaders
---
Astute readers may notice that I have been employing certain CSS properties on this site as I [write]({{ site.baseurl }}/if-you-select-something/) [about]({{ site.baseurl }}/skip-it/) [them]({{ site.baseurl }}/last-one/). Today, I added lazy loading for images using the Intersection Observer API and Javascript, and I will tell you about it.

Since this site uses infinite scroll for posts, I decided to load the images as they come into view rather than all at once. Here is a great overview of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) with some examples. Because this API is still experimental, not all browsers support it and you will have to write a fall back.

First, in the HTML the image is given the class `"lazy-image"`, and instead of a `src` attribute, it uses `data-src` to define the source to be loaded as it scrolls into view.

```html
<img class="lazy-image" data-src="/blog/images/lacroy.jpg" alt="enjoy la croy">
```

With Javascript 

```js
const images = document.querySelectorAll(".lazy-image");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3
};
let observer;

if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver(handleIntersect, options);
  images.forEach(image => {
    observer.observe(image);
  });
} else {
  images.forEach(image => {
    image.src = image.dataset.src;
  });
}
```




```css
.fade-in {
  animation: fadeIn 1.7s ease-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```
