const d = document;
export default function todo() {
  //Template UI
  const template = () => {
    if (template.data.todoList.length < 1) {
      return `<p></p><p>Lista sin Tareas por hacer</p>`;
    } else {
      let todos = template.data.todoList
        .map(
          (item, index) => `
            <input type="checkbox" id="todo${index}" value="${item}"/>
            <lable for="todo${index}">${item}</lable>
          `
        )
        .join("");
      return todos;
    }
  };
  //Agregar State al Template que agrege al Componente de UI (State Local)
  template.data = {
    todoList: [],
  };
  //Render UI
  const render = () => {
    const $list = d.getElementById("todo-list");
    if (!$list) return;
    $list.innerHTML = template();
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
  //Pintado al iniciar la pagina
  render();
  //Deteccion de nueva tarea por hacer
  d.addEventListener("submit", (e) => {
    if (!e.target.matches("#todo-form")) return false;
    e.preventDefault();
    const $item = d.getElementById("todo-item");
    if (!$item.value) return;
    if (!$item) return;
    //Actualizar el STate de forma reactiva
    const lastState = getState();
    lastState.todoList.push($item.value);
    setState({ todoList: lastState.todoList });
    //Limpiar el input
    $item.value = "";
    $item.focus();
  });
  d.addEventListener("change", (e) => {
    if (!e.target.parentElement.matches("#todo-list")) return;
    console.log(e.target.value);
  });
}
