---
layout: post
title: Sounds Like Retina Display
---
After I finished writing my [La-Croy Pattern Generator]({{ site.baseurl }}/just-shufflin/) last week, I decided to add in the HTML5 `canvas` element so users may download the image as a [wallpaper](http://jingyufan.club/sounds-like-enjoy/) for their phone or computer.  

Here are some things to consider when starting a canvas project. First, you ought to add a fallback behavior, e.g. an alternate image or text, directly between the opening and closing `<canvas>` tags. Browsers that do not support `canvas` will ignore the tags and display the fallback content.  

It is a also good idea to include support for high pixel density (Retina) displays, especially if you will be using JPGs or PNGs, so your images will look crisp on those screens. (SVGs are scalable and will remain sharp on any display.) One way to do this is to size your assets at twice their display dimensions and then halve them in the browser with CSS or JS.

Another way is to set up the canvas from the start to support HiDPI displays. [Apple's canvas guide](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/HTML-canvas-guide/SettingUptheCanvas/SettingUptheCanvas.html) details how the backing store and pixel ratios work, and lists the steps to detect HiDPI displays and draw the canvas. First, check whether the browser has `window.devicePixelRatio` defined. If it is greater than one, the browser is open on an HiDPI screen.
```js
function backingScale(context) {
  if ('devicePixelRatio' in window) {
    if (window.devicePixelRatio > 1) {
        return window.devicePixelRatio
    }
  }
  return 1
}
```
> Retina devices have a pixel ratio of 2 because there is a 2:1 ratio of display pixels to backing store pixels in both the x and y direction. Standard-resolution displays, on the other hand, map one backing store pixel to one display pixel, so their device pixel ratio will always be 1.

I set up the canvas like so, using the newly determined device pixel ratio to [transform the scale](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) of the canvas accordingly:
```js
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const scaleFactor = backingScale(ctx)
  ctx.scale(scaleFactor, scaleFactor)
```
I then drew the HiDPI canvas by multiplying the canvas pixel values by the device pixel ratio and set its width and height to the dimensions of the browser window. This would create a canvas larger than the window size and shrink it to fit for a higher number of pixels per inch.
```js
function resizeCanvas() {
    let w = window.innerWidth
    let h = window.innerHeight
    if (scaleFactor > 1) {
      canvas.width = w * scaleFactor
      canvas.height = h * scaleFactor
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      draw()
    } else {
      canvas.width = w
      canvas.height = h
      draw()
    }
  }
```
Lastly, I used the [`HTMLCanvasElement.toDataURL()` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) to generate a download link for the full pattern.
```js
function download(link, filename) {
  link.href = canvas.toDataURL()
  link.download = filename
}
downloadButton.addEventListener('click', function() {
  download(this, 'livelacroix.png')
  }, false)
```
Enjoy LaCroix and try a [La-Croy wallpaper](http://jingyufan.club/sounds-like-enjoy/)!
