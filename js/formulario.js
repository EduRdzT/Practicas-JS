const d = document;

export default function formulario(form) {
  const $form = d.getElementById(form);
  let ventana;
  const page = {};

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