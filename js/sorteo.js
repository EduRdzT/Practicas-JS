const d = document;

export default function sorteo(id, btn, users) {
  const $id = d.getElementById(id),
    $btn = d.getElementById(btn),
    $ul = document.createElement("ul"),
    $fragmento = document.createDocumentFragment();

  users.forEach(e => {
    const $li = document.createElement("li");
    $li.textContent = e;
    $fragmento.appendChild($li);
  });
  
  $ul.appendChild($fragmento);
  $id.appendChild($ul);

  $btn.addEventListener("click", () => {
    const numeroRandom = () => Math.floor(Math.random() * (users.length) );
    alert(`El ganador del sorteo es ${users[numeroRandom()]}`)
  })
}