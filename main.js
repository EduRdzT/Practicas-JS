import active from "./js/active.js";
import animationFormulario from "./js/animationFormulario.js";
import calculadora from "./js/calculadora.js";
import camaraweb from "./js/camaraweb.js";
import slider from "./js/carrusel.js";
import countdown from "./js/countdown.js";
import dispositivos from "./js/dispositivos.js";
import searchFilters from "./js/filtro_busquedas.js";
import formulario from "./js/formulario.js";
import getGeolocation from "./js/geolocalizacion.js";
import inicio from "./js/inicio.js";
import { shortcuts, teclado } from "./js/keyup.js";
import line from "./js/line.js";
import speechReader from "./js/narrador.js";
import menuNavBar from "./js/navBar.js";
import { audio, reloj } from "./js/reloj.js";
import responsive from "./js/responsive.js";
import sorteo from "./js/sorteo.js";
import theme from "./js/theme.js";
import gato from "./js/ticTacToe.js";
import validaciones from "./js/validaciones.js";
import smartVideo from "./js/video_inteligente.js";

const d = document,
   w = window,
   users = [
    "JavaScript", 
    "PHP",
    "JAVA",
    "C",
    "Python", 
    "Ruby", 
    "Go", 
    "Visual Basic", 
    "Rust", 
    "Perl" 
  ];

d.addEventListener("DOMContentLoaded", () => {
  menuNavBar();
  reloj();
  audio("../sound/alerta-sismica-cdmx.mp3", ".i-alarma", ".d-alarma");
  countdown("countdown", "January 01, 2023 00:00:00", "¡Feliz Año Nuevo!");
  theme("theme","dark-mode");
  /* responsive(
    "video",
    "Link de Video",
    800,
    "https://www.youtube.com/watch?v=BS5RX27VaAQ",
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/BS5RX27VaAQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  );
  responsive(
    "mapa",
    "Link en map",
    800,
    "https://www.google.com.mx/maps/place/33%C2%B026'49.7%22S+70%C2%B034'50.2%22W/@-33.4477814,-70.5980687,14z/data=!4m6!3m5!1s0x9662cfb18e5a056b:0xb0e7436dd534a896!7e2!8m2!3d-33.4471447!4d-70.5806136",
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26632.46831500149!2d-70.59806873342689!3d-33.447781361946966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cfb18e5a056b%3A0xb0e7436dd534a896!2zMzPCsDI2JzQ5LjciUyA3MMKwMzQnNTAuMiJX!5e0!3m2!1ses-419!2smx!4v1649882266138!5m2!1ses-419!2smx" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  ); */
  formulario("formulario");
  dispositivos("lista-dispositivos", "aviso");
  camaraweb("webcam");
  getGeolocation("geolocation");
  searchFilters(".card-filter", ".card");
  sorteo("list-lottery", "btn-lottery", users);
  slider();
  active();
  smartVideo();
  validaciones();
  animationFormulario();
});

d.addEventListener("keydown", e => {
  shortcuts(e);
  teclado(e, ".container-keyup", ".circulo");
})

w.addEventListener("scroll", () => {
  inicio(scrollY || d.documentElement.scrollTop, ".inicio");
})

d.addEventListener("click", e => {
  calculadora(e);
})

line("conexion");
speechReader();
gato();