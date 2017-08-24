---
layout: post
title: Astute Readers, Lazy Loaders
---
Astute readers of this blog may notice that I have been employing certain CSS properties on this site as I [write]({{ site.baseurl }}/if-you-select-something/) [about]({{ site.baseurl }}/skip-it/) [them]({{ site.baseurl }}/svgsvengali/). Today I added lazy loading for images using the Intersection Observer API, and I will tell you about it.

Since this site uses infinite scroll for posts, I decided to load the images as they come into view rather than all at once. Here is a great overview of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) with some examples. In brief, it observes if a target element intersects an ancestor—in this case when an image enters the viewport—and performs a callback. Because the API is still experimental, not all browsers support it and you will have to write a fallback behavior.

First, in HTML images are given the class `lazy-image`, and instead of `src` attribute, they use `data-src` to define the sources to be loaded as they scroll into view.
```html
<img class="lazy-image" data-src="/blog/images/lacroy.jpg" alt="enjoy la croy">
```
With Javascript, an event listener is set up on window load that collects all `lazy-image` class images and creates an intersection observer.
```js
let images;
window.addEventListener("load", function(event) {
  images = document.querySelectorAll(".lazy-image");
  createObserver();
}, false);
```
The observer is attached to each target image. The callback function `handleIntersect` is executed whenever a target is observed to cross a certain threshold as defined in `options`. Here `root: null` refers to the viewport and has a margin around it of 0px. A threshold of 0.05 means that the callback is run when 5% of the target is visible within the viewport. The fallback behavior is to load all images at once.
```js
function createObserver() {
  let observer;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.05
  };
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
}
```
The `intersectionRatio` is a number between 0.0 and 1.0 that indicates how much of the target is visible within the root. The callback checks that the target is visible and sets `src` to the `data-src` to load the image. It also adds `fade-in` class to the image for a tiny animation effect and removes the observer. Since I'm only checking whether the image is visible in the viewport and do not need to know by how much, I could instead use the Boolean property `entry.isIntersecting` for the if statement.
```js
function handleIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      let img = entry.target;
      img.src = img.dataset.src;
      img.classList.add("fade-in");
      observer.unobserve(img);
    }
  });
}
```
And this is the CSS animation. The image fades in from invisible and moves up slightly as if sliding into view.
```css
.fade-in {
  animation: fade-in 1.2s ease-in-out;
}
@keyframes fade-in {
  0% {top: 8px; opacity: 0;}
  100% {top: 0; opacity: 1}
}
```
You can see this lazy loader in action as you scroll through this blog.
