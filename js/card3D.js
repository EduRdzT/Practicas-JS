export default function card3D(limit) {
  const $card = document.getElementById("card"),
    $container = document.getElementsByClassName("container-card")[0],
    $title = document.getElementById("title");
  let rect = $card.getBoundingClientRect();

  $container.addEventListener("mousemove", (e) => {
    makeTransformation(e.layerX, e.layerY);
  });

  function makeTransformation(x, y) {
    let x1 = x - rect.width / 2;
    let y1 = -y + rect.height / 2;
    $card.style.transform = `
      translateZ(10px) 
      rotateX(${limit * (y1 / (rect.height / 2))}deg) 
      rotateY(${limit * (x1 / (rect.width / 2))}deg)
    `;
  }
  $container.addEventListener("mouseout", () => {
    $card.style.transform = `translateZ(0px) rotateX(0deg) rotateY(0deg)`;
  });
}
