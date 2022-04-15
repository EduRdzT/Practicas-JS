const d = document;

export default function passwordGenerator() {
  const $Pw = d.getElementById("pw"),
    $copy = d.getElementsByClassName("pw")[0],
    $length = d.getElementById("length"),
    $upper = d.getElementById("upper"),
    $lower = d.getElementById("lower"),
    $symbol = d.getElementById("symbol"),
    $generate = d.getElementById("generate"),
    $number = d.getElementById("number");

  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerLetters = "abcdefghijklmnopkrstuvwxyz",
    numbers = "0123456789",
    symbols = "~!@#$%^&-_+./*";

  function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
  }
  function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
  }
  function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
  }
  function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  function generateX() {
    const xs = [];
    if ($upper.checked) {
      xs.push(getUppercase());
    }
    if ($lower.checked) {
      xs.push(getLowercase());
    }
    if ($number.checked) {
      xs.push(getNumber());
    }
    if ($symbol.checked) {
      xs.push(getSymbol());
    }
    if (xs.length === 0) return "";
    return xs[Math.floor(Math.random() * xs.length)];
  }
  $generate.addEventListener("click", () => {
    const len = $length.value;
    let password = "";
    for (let i = 0; i < len; i++) {
      const x = generateX();
      password += x;
    }
    $Pw.textContent = password;
  });
  $copy.addEventListener("click", () => {
    const password = $Pw.textContent;
    if (!password || password === "Password Here") return;
    navigator.clipboard.writeText(password)
  })
}