export function reloj() {
  const $btn = document.getElementById("btn-container"),
    hora = document.getElementById("reloj");
  let temporizador;
  
  $btn.addEventListener("click", (e) => {
    if (e.target.className === "i-reloj"){
      e.target.disabled = true;
      temporizador = setInterval(() => {
        let reloj = new Date().toLocaleTimeString();
        hora.textContent = reloj;
        hora.style.marginTop = "20px";
      }, 1000);
    } else if (e.target.className === "d-reloj") {
      e.path[1].children[0].disabled = false;
      clearInterval(temporizador);
      hora.textContent = null;
      hora.removeAttribute("style");
    }
  })
}

export function audio(sound, btnPlay, btnStop) {
  const d = document,
    $alarm = d.createElement("audio");
  let alarmTempo;
  $alarm.src = sound;

  d.addEventListener("click", e => {
    if(e.target.matches(btnPlay)){
      e.target.disabled = true;
      alarmTempo = setTimeout(() => {
        $alarm.play();
      }, 2000);
    }

    if(e.target.matches(btnStop)){
      clearTimeout(alarmTempo);
      $alarm.pause();
      $alarm.currentTime = 0;
      d.querySelector(btnPlay).disabled = false;
    }
  })
}