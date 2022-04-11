export default function inicio(scrolY, btn) {
  const $btn = document.querySelector(btn);

  if (scrolY > 300) {
    $btn.classList.add("mostrar");
  } else {
    $btn.classList.remove("mostrar");
  }
  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
        left: 0
      });
    }
  })
}
