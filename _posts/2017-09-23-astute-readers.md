---
layout: post
title: Astute Readers, Lazy Loaders
---
Astute readers of this blog may notice that I have been employing certain CSS properties on this site as I [write]({{ site.baseurl }}/if-you-select-something/) [about]({{ site.baseurl }}/skip-it/) [them]({{ site.baseurl }}/last-one/). Today, I added lazy loading for images using the Intersection Observer API and Javascript, and I will tell you about it.

Since this site uses infinite scroll for posts, I decided to load the images as they come into view rather than all at once. Here is a great overview of the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) with some examples. Because this API is still experimental, not all browsers support it and you will have to write a fall back.

First, in the HTML all images are given the class `"lazy-image"`, and instead of a `src` attribute, they use `data-src` to define the sources to be loaded as they scroll into view.

```html
<img class="lazy-image" data-src="/blog/images/lacroy.jpg" alt="enjoy la croy">
```

With Javascript

```js
let images;
window.addEventListener("load", function(event) {
  console.log("meow")
  images = document.querySelectorAll(".lazy-image");
  createObserver();
}, false);
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


And finally in CSS I create a little animation for the image fade-in.

```css
.fade-in {
  animation: fadeIn 1.2s ease-out;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```
