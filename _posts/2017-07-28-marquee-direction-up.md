---
layout: post
title: Marquee Direction="Up"
---
I wanted to reproduce the obsolete html tag `<marquee direction="up">` with CSS animation. Here is my demonstration on [Codepen](https://codepen.io/jingyufanclub/pen/wqdEYe) and you can see this effect in action in this [post]({{ site.baseurl }}/blink-if-you-like-my-work/).

First, I wrapped my marquee block inside `<div class="box">` so I could center this section on the page:
```html
<div class="box">
  <div class="marquee--up">
    <p>
      😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎  😎
    </p>
  <div>
</div>
```
And in CSS I created and used a keyframe animation:

```css
.box {
  height: 200px;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.marquee--up {
  width: 100%;
  position: absolute;
  text-align: center;
  animation: marquee-up 2.5s linear infinite;
}
@keyframes marquee-up {
  0% { top: 100%; }
  100% { top: -20%; }
}
```
