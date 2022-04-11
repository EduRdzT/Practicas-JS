export default function responsive(id, message, limit, url, apiFram) {
  let breakpoint = matchMedia(`(min-width: ${limit}px)`);

  const responsiveMedia = (e) => {
    if (e.matches) {
      document.getElementById(id).innerHTML = apiFram;
    } else {
      document.getElementById(id).innerHTML = `<a href="${url}">${message}</a>`;
    }
  }
  
  breakpoint.addEventListener("change", responsiveMedia);
  responsiveMedia(breakpoint);
}