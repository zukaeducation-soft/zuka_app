// Pantallas completas (auditoría 2026-11-26, hallazgo 6): la lección, la evaluación, el simulacro y el gimnasio se
// abren en #overlay, y la entrada en #auth. Mientras una está abierta, lo de atrás queda inerte (ni Tab ni el lector de
// pantalla lo alcanzan) y el foco entra a ella. Se vigila la página en vez de tocar cada sitio que abre o cierra una:
// así una pantalla nueva queda cubierta sin acordarse de nada. Las hojas, el recorrido y la presentación tapan lo suyo
// por su cuenta; aquí solo se suelta lo que aquí se tapó.
const TAPA_APP = ['#topbar', '#view', '#tabbar'];

// Pura: qué queda detrás según lo que está abierto.
function tapaDetras(leccion, entrada) {
  return [...(leccion || entrada ? TAPA_APP : []), ...(entrada ? ['#overlay'] : [])];
}

let tapaPuestos = new Set(), tapaCima = null;
function tapaSync(doc = document) {
  const ov = doc.querySelector('#overlay'), auth = doc.querySelector('#auth'), abierta = !!ov && ov.classList.contains('open');
  const quiere = tapaDetras(abierta, !!auth).map(s => doc.querySelector(s)).filter(Boolean);
  // Si al soltar hay otra capa completa encima (la presentación o la tienda, que tapan lo mismo por su cuenta), lo de
  // atrás sigue siendo suyo: solo se olvida. Caso: de la entrada se vuelve a «Conocer Zuka».
  const otra = doc.querySelector('#landing') || doc.querySelector('#tienda');
  for (const el of [...tapaPuestos]) if (!quiere.includes(el)) { if (!otra) el.inert = false; tapaPuestos.delete(el); }
  for (const el of quiere) if (!el.inert) { el.inert = true; tapaPuestos.add(el); }
  // El foco entra al abrirse, y también si una pantalla reemplazó a otra y el foco quedó en el aire (el botón que lo
  // tenía se borró). Con una hoja encima (pantalla inerte) se queda en la hoja.
  const cima = auth || (abierta ? ov : null), act = doc.activeElement;
  if (cima && !cima.inert && !cima.contains(act) && (cima !== tapaCima || !act || act === doc.body)) { cima.tabIndex = -1; cima.focus({ preventScroll: true }); }
  tapaCima = cima;
}

if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined' && document.body) {
  const mo = new MutationObserver(() => tapaSync());
  mo.observe(document.body, { childList: true });   // #auth entra y sale de <body>
  ['#overlay', ...TAPA_APP].forEach(s => { const el = document.querySelector(s); if (el) mo.observe(el, { attributes: true, attributeFilter: ['class', 'inert'] }); });
  tapaSync();
}
