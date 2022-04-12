const d = document,
  w = window;

export default function speechReader() {
  const $speechSelect = d.getElementById("speech-select"),
    $speechTextarea = d.getElementById("speech-text"),
    $speechBtn = d.getElementById("speech-btn"),
    speechMessage = new SpeechSynthesisUtterance();

  let voices = [];

  d.addEventListener("DOMContentLoaded", () => {
    speechSynthesis.addEventListener("voiceschanged", () => {
      voices = speechSynthesis.getVoices();
      
      voices.forEach(voice => {
        const $option = d.createElement("option");
        $option.value = voice.name;
        $option.textContent = `${voice.name} - ${voice.lang}`;

        $speechSelect.appendChild($option);
      })
    });
  });

  d.addEventListener("change", e => {
    if(e.target === $speechSelect) {
      speechMessage.voice = voices.find(voice => voice.name === e.target.value);
    }
  });
  
  d.addEventListener("click", e => {
    if(e.target === $speechBtn) {
      if(e.path[1].querySelector("select").value === "") {
        alert("Elige una voz");
        return;
      }
      speechMessage.text = $speechTextarea.value;
      speechSynthesis.speak(speechMessage);
    }
  });

  d.addEventListener("focusin", e => {
    if(e.target === $speechSelect) {
      console.log(e.target[0])
      e.target[0].disabled = true;
    }
  })
}