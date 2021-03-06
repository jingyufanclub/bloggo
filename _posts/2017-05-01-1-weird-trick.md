---
layout: post
title: 1 Weird Trick
---
This blog is written with Markdown. You're probably wondering, "How did she make those cute image captions when Markdown doesn't handle text formatting like that?" It's a trick, you see.

<img class="lazy-image" data-src="/blog/images/croissando.jpg" alt="kitten croissandwich">
*Untitled (a kitten croissando)*

```md
![a kitten croissando](/images/croissando.jpg)
*Untitled (a kitten croissando)*
```

This Markdown syntax produces the following HTML:

```html
<p>
  <img src="/images/croissando.jpg" alt="a kitten croissando">
  <em>Untitled (a kitten croissando)</em>
</p>
```

In your CSS file you can write `img + em { }` where the '+' combinator selects the adjacent sibling of the specified element. Thus you can style all `<em>` tags immediately following `<img>` within the `<p>` block without changing other `<em>` tags across the page.

```css
img + em {
  font: italic 69%/1.5em $content-font;
  display: block;
  text-align: center;
}
```
And if you write `{display: block; text-align: center;}` you can center that caption. Whee!
