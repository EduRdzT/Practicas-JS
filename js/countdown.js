export default function countdown(id, limitDate, finalMessage) {
  const $count = document.getElementById(id),
    newYear = new Date(limitDate).getTime();

  let countdownTempo = setInterval(() => {
    let today = new Date().getTime(),
      tiempoFaltante = newYear - today;

    var dia = Math.floor(tiempoFaltante / (1000 * 60 * 60 * 24));
    var hora = ("0" + Math.floor(tiempoFaltante / (1000 * 60 * 60) - dia * 24)).slice(-2);
    var min = ("0" + Math.floor((tiempoFaltante % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
    var seg = ("0" + Math.floor((tiempoFaltante % (1000 * 60)) / (1000))).slice(-2);
    
    $count.textContent = `días: ${dia} horas: ${hora} minutos: ${min} segundos: ${seg}`;

    if (tiempoFaltante <= 0) {
      $count.textContent = finalMessage;
      clearInterval(countdownTempo);
    }
  }, 1000);
}