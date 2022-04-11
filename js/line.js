export default function line(id) {
  const updateOnLine = () => {
    const condition = navigator.onLine ? "✅ online ✅" : "⛔ offline ⛔";
    document.getElementById("conexion").innerHTML = condition;
  }

  window.addEventListener("online", updateOnLine)
  window.addEventListener("offline", updateOnLine)

  const condition = navigator.onLine ? "✅ online" : "⛔ offline"
  document.getElementById(id).innerHTML = condition;
}