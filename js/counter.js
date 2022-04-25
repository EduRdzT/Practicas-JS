export default function counter() {
  const d = document;

  //Template UI
  const template = () => {
    let todos = template.data.todoList;
    return todos;
  };

  //Agregar State al Template que agrege al Componente de UI (State Local)
  template.data = {
    todoList: 0,
  };

  //Render UI
  const render = () => {
    const $counter = d.getElementById("counter");
    $counter.textContent = template();
  };

  //Actualizar el State de forma Reactiva
  const setState = (obj) => {
    for (let key in obj) {
      if (template.data.hasOwnProperty(key)) {
        template.data[key] = obj[key];
      }
    }

    render();
  };

  //Obtenemos una copia inmutable del State
  const getState = () => JSON.parse(JSON.stringify(template.data));

  d.addEventListener("DOMContentLoaded", render);

  d.addEventListener("click", (e) => {
    if (e.target.value !== "cont") return;
    const action = e.target.textContent;

    //Actualizar el STate de forma reactiva
    const lastState = getState();
    lastState.todoList = operacion(lastState.todoList, action);
    setState({ todoList: lastState.todoList });
  });
}

function operacion(num, op) {
  switch (op) {
    case "Incrementar":
      num++;
      return num;
    case "Reset":
      num = 0;
      return num;
    case "Decrementar":
      num--;
      return num;
  }
}
