const d = document, w = window;

export default function formulario(form) {
  const $form = d.getElementById(form);
  let ventana;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(e.submitter.name === "cerrar"){
      ventana.close();
    } else {
      ventana = w.open(
        $form.url.value, 
        "tester", 
        `innerWidth=${$form.ancho.value}, innerHeight=${$form.cerrar.value}`
      );
    }
  })
}