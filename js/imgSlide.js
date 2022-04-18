const d = document;
export default function imgSlide() {
  const $carruselSlide = d.querySelectorAll(".slide"),
    $btnPrev = d.querySelector(".prev-1"),
    $btnNext = d.querySelector(".next-1"),
    $dotsSlide = d.querySelector(".dots-container");
  let currentSlide = 0;

  const activeDot = (slide) => {
    d.querySelectorAll(".dots").forEach((dot) => dot.classList.remove("focus"));
    d.querySelector(`.dots[data-slide="${slide}"]`).classList.add("focus");
  };
  activeDot(currentSlide);

  const changeSlide = (slides) => {
    $carruselSlide.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - slides)}%)`)
    );
  };
  changeSlide(currentSlide);

  $btnNext.addEventListener("click", () => {
    currentSlide++;
    if ($carruselSlide.length - 1 < currentSlide) {
      currentSlide = 0;
    }
    changeSlide(currentSlide);
    activeDot(currentSlide);
  });
  $btnPrev.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = $carruselSlide.length - 1;
    }
    changeSlide(currentSlide);
    activeDot(currentSlide);
  });
  $dotsSlide.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots")) {
      const slide = e.target.dataset.slide;
      changeSlide(slide);
      activeDot(slide);
    }
  });
}
