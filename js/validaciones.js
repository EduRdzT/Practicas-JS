const d = document;

export default function validaciones() {
  const $form = d.querySelector("form[data-validaciones]"),
    $inputs = d.querySelectorAll("form[data-validaciones] [required]");
    
  $inputs.forEach(input => {
    console.log()
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none")
    input.offsetParent.insertAdjacentElement("afterend", $span);
  });
  
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Enviando Formulario")

    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-respinse");

    $loader.classList.remove("none");
    
    setTimeout(() => {
      $loader.classList.add("none");
      //$response.classList.remove("none");
      $form.reset();
    }, 3000);
  })

  $form.addEventListener("blur", e => {
    let $input = e.target,
      pattern = $input.pattern || $input.dataset.pattern;
    
    if (pattern && $input.value !== "") {
      let regex = new RegExp(pattern);
      return !regex.exec($input.value)
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }

    if (!pattern) {
      return $input.value === "" 
        ? d.getElementById($input.name).classList.add("is-active")
        : d.getElementById($input.name).classList.remove("is-active");
    }
  }, true)
}