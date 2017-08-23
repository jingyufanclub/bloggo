window.onload = function() {
  console.log("meow!");
  const images = document.querySelectorAll(".lazy-image");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1
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
    })
  }

  function handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        let img = entry.target
        observer.unobserve(img);
        img.src = img.dataset.src;
        img.classList.add("fade-in");
      }
    })
  }
}
