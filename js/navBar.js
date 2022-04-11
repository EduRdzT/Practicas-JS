export default function menuNavBar () {
  const navbar = document.querySelector(".navbar"),
    btnMenu = document.querySelector(".menu-btn");

  var menuOpen = false;
  
  btnMenu.addEventListener("click", () => {
    if (!menuOpen) {
      navbar.classList.add("show");
      btnMenu.classList.add("open");
      menuOpen = true;
    } else {
      navbar.classList.remove("show");
      btnMenu.classList.remove("open");
      menuOpen = false;
    }
  })

  navbar.addEventListener("click", () => {
    if (!menuOpen) {
      navbar.classList.add("show");
      btnMenu.classList.add("open");
      menuOpen = true;
    } else {
      navbar.classList.remove("show");
      btnMenu.classList.remove("open");
      menuOpen = false;
    }
  })
}