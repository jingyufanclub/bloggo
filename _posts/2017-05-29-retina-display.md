---
layout: post
title: Sounds Like Enjoy - Finer points of "Retina" display
---
Some things to consider when starting a canvas project.

Add a fallback behavior, e.g. an alternate image or text, directly between the opening and closing `<canvas>` tags. Browsers that do not support `canvas` will ignore the tags and display the fallback content.  

It's a good idea to include support for high pixel density (Retina) displays, especially if you will be using jpgs or pngs. One way to do this is to size your assets at twice their display size and sizing them down for the browser with CSS or JS.

Another way is to set up the canvas from the start to support HiDPI displays. [Apple's canvas guide](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/HTML-canvas-guide/SettingUptheCanvas/SettingUptheCanvas.html) details how the backing store and pixel ratios work. From the guide, these are basic steps to detect HiDPI displays and draw your canvas accordingly with JavaScript. First, check whether the browser has `window.devicePixelRatio` defined. If it is greater than one, the browser is open on an HiDPI screen.
```js
function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}
```
> Retina devices have a pixel ratio of 2 because there is a 2:1 ratio of display pixels to backing store pixels in both the x and y direction. Standard-resolution displays, on the other hand, map one backing store pixel to one display pixel, so their device pixel ratio will always be 1.

Then I set up my canvas like so, using the newly determined scale factor to [transform the scale](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) of the canvas accordingly:
```js
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const scaleFactor = backingScale(ctx);
  ctx.scale(scaleFactor, scaleFactor);
```
Lastly, on
backing store multiplier

You must manually multiply your canvas pixel values by the device pixel ratio as demonstrated in Listing 1-2. Drawing instructions that refer to points in the coordinate space must also be multiplied by this backing scale to ensure your canvas is Retina-read

```js
function resizeCanvas() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (scaleFactor > 1) {
      canvas.width = w * scaleFactor;
      canvas.height = h * scaleFactor;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      draw();
    } else {
      canvas.width = w;
      canvas.height = h;
      draw();
    }
  }
```
