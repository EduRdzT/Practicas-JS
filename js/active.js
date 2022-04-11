  const d = document;

  export default function active() {
    /* const $sec = d.querySelectorAll("section");

    const cb = (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          d.querySelector(`a[href="#${id}"]`).
          classList.add("focus");
        } else {
          d.querySelector(`a[href="#${id}"]`).
          classList.remove("focus");
        }
      })
    };

    const observer = new IntersectionObserver(cb, {
      //root
      //rootMargin: "-300px",
      threshold: 0.5
    });

    $sec.forEach(el => observer.observe(el)); */

    const li = d.querySelectorAll(".btn"),
      sec = d.querySelectorAll("section");

    window.onscroll = function () {
      let len = sec.length;
      
      while(--len && window.scrollY + 97 < sec[len].offsetTop){}
      
      li.forEach(ltx => ltx.classList.remove("focus"));
      
      li[len].classList.add("focus");
    }
  }