---
layout: post
title: Baby’s First CSS
date: '2017-04-03T00:43:50-04:00'
tags: []
tumblr_url: http://duncecapsforcats.com/post/159116242057/babys-first-css
---
This is the complete stylesheet from my very first homepage published to the Internet. The original HTML 4.0 files are unreadable, likely because they were written in MS Word and exported for web as HTML. This was a thing that one was once able to do. The layout was constructed with tables, frames, and indiscriminate use of

<marquee>marquee.</marquee>

That's the *marquee* element in case your browser doesn't support it, and it is animating the word *marquee* to scroll across the page. I'd also drawn a bunch of navigation buttons in varying monochromatic hues and drop shadow effects for hover and click transformations using javascript.

```css
body {
  font-family: verdana, geneva, arial, helvetica, sans-serif;
  font-size: 13px;
  color: #333333;
}
a {text-decoration: none;}
a:link {color: #666666;}
a:visited {color: #999999;}
a:hover {color: #6699FF;}

img {border: none;}

input {
  font-family: verdana, geneva, arial, helvetica, sans-serif;
  color: #333333;
  border: thin solid #666666;
  font-variant: small-caps;
}

select {
  font-family: verdana, geneva, arial, helvetica, sans-serif;
  color:#333333;
  border: thin solid #666666;
  font-variant: small-caps;
}

textarea {
  font-family: verdana, geneva, arial, helvetica, sans-serif;
  color:#333333;
  border: thin solid #666666;
  font-variant: small-caps;
}
```

Lol, so basic. The site had an image gallery of my artwork and a little js quiz you could take to determine if we could be best friends irl. My cool friend, the first person I knew who had her own custom url, hosted it as a subdomain of her site. I'm still making dumb websites and I've become a huge CSS fangirl. There is so much you can do now to make interesting design without third party frameworks. I'm pretty tired of seeing the same bootstrapped websites with full screen images overlaid with sans-serif type and scroll animations that belie little aesthetic vision or substance. Give CSS a chance. Bring back marquee.
