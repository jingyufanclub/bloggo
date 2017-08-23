window.onload = function() {
  console.log("meow!");
  const images = document.querySelectorAll(".lazy-image");
  const options = {
    root: null,
    rootMargin: "-50px",
    threshold: 0.5
  };

  let observer = new IntersectionObserver(handleIntersect, options);
  images.forEach(image => {
    observer.observe(image);
  })

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
