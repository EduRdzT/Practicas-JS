const d = document;

export function shortcuts(e){
  if (e.key === "a" && e.altKey) {
    alert("Haz lanzado una alerta con el teclado");
  }

  if (e.key === "c" && e.altKey) {
    confirm("Haz lanzado una confirmación con el teclado");
  }

  if (e.key === "p" && e.altKey) {
    prompt("Haz lanzado un aviso con el teclado");
  }
}

export function teclado(e, container, ball) {
  const $ball = d.querySelector(ball),
    $container = d.querySelector(container),
    limitsBall = $ball.getBoundingClientRect(),
    limitsStage = $container.getBoundingClientRect(),
    incremento = 10;
  var vLeft = parseFloat(getComputedStyle($ball).getPropertyValue("left")),
    vTop = parseFloat(getComputedStyle($ball).getPropertyValue("top"));
  
  const move = (direccion, limite = Infinity) => {
    if ((direccion + limitsBall.width) > limite) {
      return limite - limitsBall.width;
    } else if (direccion < 0) {
      return 0;
    } else {
      e.preventDefault();
      return direccion;
    }
  };

  switch (e.keyCode) {
    case 37:
      vLeft = move(vLeft -= incremento);
      break;
    
    case 38:
      vTop = move(vTop -= incremento);
      break;

    case 39:
      vLeft = move(vLeft += incremento, limitsStage.width);
      break;

    case 40:
      vTop = move(vTop += incremento, limitsStage.height);
      break;
  
    default:
      break;
  }

  $ball.style.top = `${vTop}px`;
  $ball.style.left = `${vLeft}px`;
}