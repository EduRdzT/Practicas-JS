const d = document,
  us = navigator.userAgent,
  usd = navigator.userAgentData;

export default function dispositivos(id ,estilo) {
  const $id = d.getElementById(id),
    isMobile = {
      android: () => us.match(/android/i),
      ios: () => us.match(/iphone|ipad|ipod/i),
      windows: () => us.match(/windows phone/i),
      any: function () {
        return this.android() || this.ios() || this.windows();
      }
    },
    isDesktop = {
      linux: () => us.match(/linux/i),
      mac: () => us.match(/mac os/i),
      windows: () => us.match(/windows nt/i),
      any:function () {
        return this.linux() || this.mac() || this.windows();
      }
    },
    isBrowser = {
      chrome: () => us.match(/chrome/i),
      safari: () => us.match(/safari/i),
      firefox: () => us.match(/firefox/i),
      opera: () => us.match(/opera|opera mini|opr/i),
      ie: () => us.match(/msie|iemobil/i),
      edge: () => us.match(/edge/i),
      any: function () {
        return (
          this.ie() ||
          this.edge() ||
          this.chrome() ||
          this.safari() ||
          this.firefox() ||
          this.opera()
        );
      }
    },
    isNavigator = {
      "User Agent": us,
      Plataforma: usd ? usd.platform : (isMobile.any()? isMobile.any():isDesktop.any()),
      Navegador: usd ? usd.brands[2] ? usd.brands[2].brand === ";Not A Brand" ? usd.brands[0].brand : usd.brands[2].brand
        : (isBrowser.any()) : (isBrowser.any())
    },
    $ul = document.createElement("ul"),
    $fragmento = document.createDocumentFragment();
    
  Object.entries(isNavigator).forEach(([key, value]) => {
    const $li = document.createElement("li");
    $li.innerHTML = `${key}: <b>${value}</b>`;
    $fragmento.appendChild($li);
  })
  $ul.appendChild($fragmento);
  $ul.style.textAlign = "center";
  $id.appendChild($ul);

  $id.insertAdjacentHTML("beforeend",`<p class="${estilo}">Este contenido sólo se ve en ${isNavigator.Navegador}</p>`)

  if (isMobile.any()) {
    $id.insertAdjacentHTML("beforeend",`<p class="${estilo}">Este contenido sólo se ve en Plataforma Mobil</p>`)
  } else {
    $id.insertAdjacentHTML("beforeend",`<p class="${estilo}">Este contenido sólo se ve en Plataforma de Escritorio</p>`)
  } 
}