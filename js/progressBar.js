export default function bar(e) {
  const $progress = document.querySelector("#button-bar"),
    $container = document.querySelector("#container-bar");
  let target =
    e.path[2] === $progress
      ? e.target.parentElement
      : e.target.parentElement === $progress
      ? e.target
      : null;
  if (!target) return;
  let getSelection = target.getAttribute("name");
  let setSelection = document.querySelector(`.${getSelection}`);
  let getCounter = document.querySelector(
    `.${getSelection}-counter`
  ).textContent;
  let setCounter = Number.parseInt(getCounter) + 1;
  let currentWidth = setSelection.style.width || 0;
  let newWidth = Number.parseInt(currentWidth) + 20;
  setSelection.classList.add("running");
  $container.classList.add("running");
  setTimeout(() => {
    setSelection.classList.remove("running");
    $container.classList.add("running");
  }, 1000);
  if (newWidth <= 100) {
    setSelection.style.width = `${newWidth}%`;
  } else {
    setSelection.style.width = "0%";
    setCounter = 0;
  }
  setSelection.getAttribute("style");
  document.querySelector(`.${getSelection}-counter`).textContent = setCounter;
}
