export default function colorRandom(e) {
  const $colorContainer = document.getElementById("colorCode"),
    $genButton = document.getElementById("genNewBtn"),
    $wrapper = document.querySelector(".wrapper"),
    symbols = "0123456789ABCDEF";
  let color = "";

  if (e.target === $genButton) {
    for (let i = 0; i < 6; i++) {
      color += symbols[Math.floor(Math.random() * 16)];
    }
    $colorContainer.textContent = `#${color}`;
    $wrapper.style.background = `#${color}`;
    color = "";
  }
}