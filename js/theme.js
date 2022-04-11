export default function theme(btn, classDark) {
  const $btn = document.getElementById(btn),
    $icon = $btn.firstElementChild,
    $selectors = document.querySelectorAll("[data-dark]");
  var theme = localStorage.getItem("theme");

  $icon.textContent = theme || "wb_sunny";
  seleccion($icon, $selectors, classDark);

  $btn.addEventListener("click", () => {
    seleccion($icon, $selectors, classDark);
  })
}

function seleccion (icon, selectors, dark) {
  if(icon.textContent === "wb_sunny"){
    icon.textContent = "dark_mode";
    localStorage.setItem("theme", "wb_sunny");
    selectors.forEach(el => el.classList.remove(dark));
  } else {
    icon.textContent = "wb_sunny";
    localStorage.setItem("theme", "dark_mode");
    selectors.forEach(el => el.classList.add(dark));
  }
}