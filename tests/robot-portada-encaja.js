// Robot de la portada (spec 2026-11-28-portada-encaja): mide si cada sección del menú cabe bajo la barra.
// En la página (?presentacion): fetch('tests/robot-portada-encaja.js').then(r => r.text()).then(eval); __encaja()
// Devuelve, por sección, su alto y lo que queda libre (negativo = no cabe). Las secciones de carrusel cuentan solo su fila.
window.__encaja = () => {
  const L = document.getElementById('landing'), bar = L.querySelector('.pz-bar').getBoundingClientRect().height;
  const alto = innerHeight - bar;
  const ids = ['pz-programas', 'pz-somos', 'pz-ruta', 'pz-como', 'pz-inst', 'pz-dudas'];
  const hero = L.querySelector('.pz-hero').getBoundingClientRect().height;
  return {
    ventana: `${innerWidth}×${innerHeight}`, alto: Math.round(alto),
    hero: Math.round(alto - hero),
    ...Object.fromEntries(ids.map(id => [id.slice(3), Math.round(alto - document.getElementById(id).getBoundingClientRect().height)])),
    ancho: document.documentElement.scrollWidth <= innerWidth && L.scrollWidth <= L.clientWidth + 1,
  };
};
