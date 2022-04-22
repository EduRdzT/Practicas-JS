import { helpHttp } from "../helpers/apiHttp.js";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Day = ["Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"];

export default function weather() {
  const $ubicacion = document.getElementById("card"),
    $card = document.querySelector(".card-3d"),
    $h3 = document.createElement("h3"),
    $h4 = document.createElement("h4"),
    $h6 = document.createElement("h6"),
    $span = document.createElement("span"),
    $pWeather = document.createElement("p"),
    $pMin = document.createElement("p"),
    $pMax = document.createElement("p"),
    $img = document.createElement("img"),
    $fragment = document.createDocumentFragment();
  let exclude = "minutely",
    unit = "metric",
    APIkey = "aa6e52e853e3a55bd3fe55a6918814b7";
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=${exclude}&appid=${APIkey}`;
      await helpHttp()
        .get(url)
        .then((res) => {
          let horaActual = new Date(res.current.dt * 1000);
          if (horaActual.getHours() >= 18) {
            $card.classList.add("atardecer");
          }
          if (horaActual.getHours() <= 11) {
            $card.classList.add("amanecer");
          }
          if (horaActual.getHours() >= 21 || horaActual.getHours() <= 5) {
            $card.classList.add("noche");
          }
          if (horaActual.getHours() > 11 && horaActual.getHours() < 18) {
            $card.classList.add("soleado");
          }
          if (res.current.weather[0].main === "Clouds" || "Rain") {
            $card.classList.add("nublado");
          }

          $h3.classList.add("title");
          $h3.textContent = res.timezone.split("/")[1];
          $h4.classList.add("temp");
          $h4.textContent = parseInt(res.current.temp);
          $span.classList.add("celcius");
          $span.textContent = "°C";
          $h4.appendChild($span);
          $pMin.classList.add("temp-m");
          $pMin.innerHTML = `<span class="material-symbols-outlined">arrow_downward</span>
          ${parseInt(res.daily[0].temp.min)}°`;
          $pMax.classList.add("temp-m");
          $pMax.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>
            ${Math.round(res.daily[0].temp.max)}°`;
          $h6.classList.add("day");
          $h6.textContent = `${horaActual.getDate()}/${
            months[horaActual.getMonth()]
          }/${horaActual.getFullYear()}`;
          $pWeather.classList.add("weather");
          $pWeather.textContent = res.current.weather[0].main;
          $img.classList.add("weather");
          $img.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`
          );
          $img.setAttribute("alt", res.current.weather[0].main);

          $fragment.appendChild($h3);
          $fragment.appendChild($h6);
          $fragment.appendChild($pMax);
          $fragment.appendChild($pMin);
          $fragment.appendChild($h4);
          $fragment.appendChild($pWeather);
          $fragment.appendChild($img);

          for (let i = 1; i < 8; i++) {
            const $h5 = document.createElement("h5"),
              $img = document.createElement("img"),
              $pMin = document.createElement("p"),
              $pMax = document.createElement("p"),
              $div = document.createElement("div");

            $h5.textContent = Day[new Date(res.daily[i].dt * 1000).getDay()];
            $img.setAttribute(
              "src",
              `http://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}@2x.png`
            );
            $img.setAttribute("alt", res.daily[i].weather[0].main);
            $pMin.innerHTML = `<span class="material-symbols-outlined">arrow_downward</span>
              ${parseInt(res.daily[i].temp.min)}°`;
            $pMax.innerHTML = `<span class="material-symbols-outlined">arrow_upward</span>
              ${Math.round(res.daily[i].temp.max)}°`;
            $div.classList.add("weather-week");

            $div.appendChild($h5);
            $div.appendChild($img);
            $div.appendChild($pMax);
            $div.appendChild($pMin);
            $fragment.appendChild($div);
          }
          //console.log(res);
        })
        .catch((err) => {
          let message = err.statusText || "Ocurrio un error";
          let status = err.status || "400";
          $h3.textContent = `Error ${status}: ${message}`;
          $fragment.appendChild($h3);
        })
        .finally(() => $ubicacion.appendChild($fragment));
    },
    function (err) {
      let message = err.message || "Ocurrio un error";
      let status = err.code || "400";
      $ubicacion.insertAdjacentHTML(
        "beforeend",
        `<p><b>Error ${status}: ${message}</b></p>`
      );
    }
  );
}
