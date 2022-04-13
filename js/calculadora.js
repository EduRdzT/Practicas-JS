const d = document,
  $calculadora = d.getElementById("all_button"),
  display1 = d.querySelector(".display-1"),
  display2 = d.querySelector(".display-2"),
  operacion = {
    a: [],
    b: [],
    op: null,
    res: null
  };

export default function calculadora(e) {
  if (e.target.parentNode !== $calculadora) {return;}
  if (e.target.matches(".number")) {
    if (isNaN(operacion.res) || operacion.res !== null) {clear();}
    if (display2.textContent === "0") {display2.textContent = "";}
    display2.textContent += e.target.textContent;
    if (!operacion.op) {
      operacion.a.push(e.target.textContent);
    } else {
      operacion.b.push(e.target.textContent);
    }
  } else if (e.target.matches(".operation")) {
    if (isNaN(operacion.res)) {clear();}
    if (operacion.a.length === 0) return;
    if (operacion.b.length > 0) {
      operacion.a = [...String(operaciones(operacion.a, operacion.b, operacion.op))]
      operacion.b = [];
    }
    display1.textContent = `${operacion.a.join("")} ${e.target.textContent}`;
    operacion.op = e.target.textContent;
    display2.textContent = "0";
  } else if (e.target.matches(".last-entity-clear")) {
    if (operacion.res !== null) return;
    if (!operacion.op) {
      operacion.a.pop();
      display2.textContent = operacion.a.join("") || "0";
    } else {
      operacion.b.pop();
      display2.textContent = operacion.b.join("") || "0";
    }
  } else if (e.target.matches(".all-clear")) {
    clear();
  } else if (e.target.matches(".equal")) {
    if (operacion.res !== null) return;
    display1.textContent += ` ${display2.textContent}`;
    operacion.res = operaciones(operacion.a, operacion.b, operacion.op)
    display2.textContent = operacion.res;
    if (isNaN(operacion.res) || operacion.b.length === 0) {display1.textContent = "0"}
  }
}

function operaciones(a, b, op) {
  switch (op) {
    case "+":
      return parseFloat(a.join("")) + parseFloat(b.join(""));
    case "-":
      return parseFloat(a.join("")) - parseFloat(b.join(""));
    case "x":
      return parseFloat(a.join("")) * parseFloat(b.join(""));
    case "/":
      return parseFloat(a.join("")) / parseFloat(b.join(""));
    case "%":
      return parseFloat(a.join("")) % parseFloat(b.join(""));
    default:
      return parseFloat(a.join(""));
  }
}
function clear() {
    operacion.a = [];
    operacion.b = [];
    operacion.op = null;
    operacion.res = null;
    display1.textContent = `0`;
    display2.textContent = "0";
}