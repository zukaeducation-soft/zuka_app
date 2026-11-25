// Página de presentación en la web (spec 2026-11-20-presentacion; referencia: la portada de Brilliant).
// Quien abre Zuka en el navegador sin tenerla instalada y sin sesión ve primero quiénes somos, con «Iniciar sesión»
// arriba. Va como capa propia (#landing) sobre la app; los botones de cuenta abren la pantalla de entrada (js/cuenta.js).

// ¿Sale? Pura: se prueba en Node.
function presentacionToca({ standalone, user, query = '' }) {
  const q = k => new RegExp(`[?&]${k}(=|&|$)`).test(query);
  if (q('presentacion')) return true;
  if (q('app')) return false;
  return !standalone && !user;
}

// El nombre en letra (pedido del 2026-11-20: sin el cerebro de puntos): barra de la presentación, entrada y barra de
// escritorio. El logo es logoHTML (js/marca.js).
const zukaWord = () => logoHTML();

const pzEsc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const pzLessons = c => (c.units || []).reduce((n, u) => n + ((u.lessons || []).length), 0);

// ---- la portada se juega (spec 2026-11-24-portada-viva): cuentas puras, se prueban en Node ----
// Punto de la rueda: ángulo en grados [0, 360) de un desplazamiento en pantalla (y hacia abajo).
const pzAngulo = (dx, dy) => (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
// La altura del punto, dibujada hacia la derecha: en x0 vale sen θ y más lejos, lo que valía antes.
function pzOnda(deg, { x0, x1, cy, r, largo = 2.6 }) {
  const t = deg * Math.PI / 180, n = Math.max(24, Math.ceil((x1 - x0) / 7));
  let d = '';
  for (let i = 0; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n;
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(cy - r * Math.sin(t - (x - x0) / (r * largo / Math.PI))).toFixed(1)}`;
  }
  return d;
}
// Reto de la portada: que la altura sea ½. Devuelve el ángulo exacto (30 o 150) si quedó cerca; si no, null.
const pzReto = deg => [30, 150].find(a => Math.abs(deg - a) <= 2.5) ?? null;
const PZ_LADO = 10;   // lado del cuadrado de (a + b)²
const pzArea = a => ({ a, b: PZ_LADO - a, aa: a * a, ab: a * (PZ_LADO - a), bb: (PZ_LADO - a) ** 2 });
// Palanca: 2 kg a 3 pasos contra 3 kg a d pasos. Inclinación en grados (positiva: baja la derecha).
const pzPalanca = d => ({ izq: 2 * 3, der: 3 * d, giro: Math.max(-13, Math.min(13, (3 * d - 6) * 2.2)), ok: 3 * d === 6 });

const PZ_RETO = 'Arrastra el punto hasta que su altura sea <b>½</b>.';
const pzRueda = () => `<div class="pz-stage">
    <svg class="pz-rueda" viewBox="0 0 1440 380" preserveAspectRatio="xMinYMid meet">
      <path class="pz-eje"/><path class="pz-meta"/><text class="pz-meta-t">½</text>
      <path class="pz-onda"/><circle class="pz-aro"/><path class="pz-tri"/><path class="pz-arco"/><path class="pz-guia"/><path class="pz-alto"/>
      <circle class="pz-fin" r="5"/>
      <g class="pz-knob" role="slider" tabindex="0" aria-label="Ángulo del punto en la rueda" aria-valuemin="0" aria-valuemax="359" aria-valuenow="48">
        <circle class="pz-hit" r="40"/><circle class="pz-halo" r="20"/><circle class="pz-bola" r="11"/></g>
    </svg>
    <div class="pz-reto">
      <p class="pz-lee"><i>sen</i> <b>48°</b> = <b>0.74</b></p>
      <p class="pz-reto-t" aria-live="polite">${PZ_RETO}</p>
      <button class="pz-reto-go" type="button" data-pz="prueba" hidden>Pide tu código y sigue gratis</button>
    </div></div>`;

const PZ_AREA = `<svg class="pz-area" viewBox="0 0 320 300">
    <rect class="pz-aa"/><rect class="pz-ab"/><rect class="pz-ab pz-ba"/><rect class="pz-bb"/>
    <text class="pz-t-aa"/><text class="pz-t-ab"/><text class="pz-t-ba"/><text class="pz-t-bb"/>
    <text class="pz-l-a"/><text class="pz-l-b"/><path class="pz-corte"/>
    <g class="pz-knob" role="slider" tabindex="0" aria-label="Dónde se parte el lado del cuadrado" aria-valuemin="1" aria-valuemax="9" aria-valuenow="7">
      <circle class="pz-hit" r="30"/><circle class="pz-bola" r="10"/></g></svg>`;
const PZ_PALANCA = `<svg class="pz-pal" viewBox="0 0 360 250">
    <path class="pz-base" d="M180 148l-26 60h52z"/><path class="pz-suelo" d="M96 208h168"/>
    <g class="pz-viga"><path class="pz-brazo" d="M24 144h312"/>
      ${[-4, -3, -2, -1, 1, 2, 3, 4].map(k => `<path class="pz-marca" d="M${180 + k * 36} 144v9"/>`).join('')}
      <g class="pz-izq" transform="translate(72 144)"><rect x="-19" y="-40" width="38" height="38" rx="9"/><text y="-15">2</text></g>
      <g class="pz-knob pz-der" role="slider" tabindex="0" aria-label="Distancia del peso de 3 kilos al apoyo" aria-valuemin="1" aria-valuemax="4" aria-valuenow="4">
        <rect class="pz-hit" x="-32" y="-64" width="64" height="76"/><rect x="-23" y="-48" width="46" height="46" rx="10"/><text y="-18">3</text></g></g>
    <circle class="pz-pivote" cx="180" cy="145" r="6"/></svg>`;
const PZ_TUTOR = `<div class="pz-agenda" aria-hidden="true"><div class="pz-dias">${['L', 'M', 'M', 'J', 'V'].map((d, i) => `<span${i === 2 ? ' class="on"' : ''}><small>${d}</small>${11 + i}</span>`).join('')}</div>
    <div class="pz-horas">${['2:00 p. m.', '3:00 p. m.', '4:00 p. m.'].map((h, i) => `<span${i === 2 ? ' class="on"' : ''}>${h}</span>`).join('')}</div></div>`;
const PZ_MUNDOS = 12;   // mundos a la vista por curso; los demás se cuentan

// ---- tu camino: del colegio al grado (spec 2026-11-24-portada-aliado) ----
// Cada etapa nombra los cursos que la sirven; el que aún no está publicado sale como «Muy pronto».
const PZ_ETAPAS = [
  { id: 'colegio', name: 'Colegio', h: 'Llega con bases', p: 'Cierra los vacíos desde cero, con la idea antes que la fórmula.', cursos: ['algebra', 'trig', 'preicfes'] },
  { id: 'admision', name: 'Admisión', h: 'Presenta el examen sabiendo qué esperar', p: 'Razonamiento lógico y comprensión lectora, explicados paso a paso y con la forma en que se preguntan.', cursos: ['preuda'], mas: [{ t: 'Libros impresos' }, { t: 'Asesorías', si: ['preuda'] }] },
  { id: 'semestres', name: 'Semestres', h: 'Que las matemáticas no te frenen la carrera', p: 'Temas que siguen el programa de la Universidad de Antioquia y ejercicios para llegar preparado al parcial.', cursos: ['algebra', 'trig', 'calc', 'geo'], mas: [{ t: 'Asesorías' }] },
  { id: 'grado', name: 'Grado', h: 'Alguien a quien preguntarle', p: 'Cálculo, Física y Álgebra Lineal, con asesorías virtuales de una hora para cuando una materia se ponga difícil.', cursos: ['int', 'lin', 'fis'], mas: [{ t: 'Asesorías de universidad', si: ['calc', 'fis', 'int', 'lin'] }] },
];
const PZ_PARADAS = [.1, .37, .64, .9];
const pzCaminoY = x => .8 - .62 * x - .09 * Math.sin(x * Math.PI * 3);   // altura del camino, 0 arriba y 1 abajo
const pzEtapaEn = x => PZ_PARADAS.reduce((m, p, i) => (Math.abs(p - x) < Math.abs(PZ_PARADAS[m] - x) ? i : m), 0);
const pzCursosDe = (e, visibles, todos) => e.cursos.map(id => ({ c: visibles.find(c => c.id === id) || todos.find(c => c.id === id), listo: visibles.some(c => c.id === id) })).filter(x => x.c);
// Resorte amortiguado (un paso): devuelve [posición, velocidad].
function pzResorte(x, v, meta, dt, k = 170, c = 24) {
  const h = Math.min(dt, .032), a = k * (meta - x) - c * v;
  return [x + (v + a * h) * h, v + a * h];
}
const pzCaminoD = () => Array.from({ length: 61 }, (_, i) => `${i ? 'L' : 'M'}${(i / 60 * 1000).toFixed(1)} ${(pzCaminoY(i / 60) * 300).toFixed(1)}`).join('');
const PZ_DUDAS = [
  ['En clase lo entiendo, pero en el parcial me bloqueo', 'Mirar no es hacer. Aquí mueves cada idea hasta que puedes reconstruirla sin ayuda, y después la usas en problemas distintos.'],
  ['Me aprendo la fórmula y al mes se me olvida', 'Primero ves de dónde sale. Cuando la idea es tuya, la fórmula se puede volver a armar.'],
  ['No sé por dónde empezar a estudiar', 'Cada curso es un camino desde cero: un mundo después de otro. Abres Zuka y la lección que sigue ya está lista.'],
  ['Me da pena preguntar', 'Te equivocas sin público y pides pistas cuando quieras. Si hace falta, separas una asesoría y lo resuelves con una persona.'],
];
const pzCamino = (cursos, todos) => `<div class="pz-ruta" data-en="1">
      <div class="pz-ruta-map"><svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path class="pz-ruta-b" d="${pzCaminoD()}"/><path class="pz-ruta-l" d="${pzCaminoD()}"/></svg>
        <span class="pz-ruta-yo" aria-hidden="true"></span>
        <div role="tablist" aria-label="Etapas">${PZ_ETAPAS.map((e, i) => `<button type="button" role="tab" id="pz-et-${i}" aria-controls="pz-ep-${i}" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}" style="left:${PZ_PARADAS[i] * 100}%;top:${(pzCaminoY(PZ_PARADAS[i]) * 100).toFixed(1)}%"><i></i><span>${e.name}</span></button>`).join('')}</div></div>
      <div class="pz-ruta-txt">${PZ_ETAPAS.map((e, i) => `<div role="tabpanel" id="pz-ep-${i}" aria-labelledby="pz-et-${i}" class="pz-ep${i === 1 ? ' on' : ''}"${i === 1 ? '' : ' inert'}><h3>${e.h}</h3><p>${e.p}</p>
        <ul>${pzCursosDe(e, cursos, todos).map(({ c, listo }) => `<li style="--c:${c.color}"${listo ? '' : ' class="pronto"'}>${pzEsc(c.name)}${listo ? '' : '<small>Muy pronto</small>'}</li>`).join('')}${(e.mas || []).map(m => (!m.si || cursos.some(c => m.si.includes(c.id)) ? `<li>${m.t}</li>` : `<li class="pronto">${m.t}<small>Muy pronto</small></li>`)).join('')}</ul></div>`).join('')}</div></div>`;

// ---- programas (spec 2026-11-24-portada-programas; referencia de estructura: instruimos.com) ----
const PZ_LIBROS = [['Número y forma', 1], ['Orden, lógica y azar', 2], ['Leer lo que dice', 3], ['Leer lo que quiere decir', 4]];
// Lo que cada curso es para el estudiante. `tag`: su etiqueta; `meta`: para qué sirve; `trae`: además de las lecciones.
const PZ_PROG = {
  preuda: { color: '#22a652', tag: 'Admisión', h: 'Entra a la UdeA entendiendo el examen', meta: 'Llega al examen de admisión sabiendo qué se pregunta y cómo razonarlo.', trae: 'Explicaciones interactivas, ejercicios y evaluaciones por mundo' },
  preicfes: { tag: 'Grado 11', h: 'Las cinco pruebas del Saber 11, una por una', meta: 'Prepara el Saber 11 área por área, con problemas en contexto.', trae: 'Matemáticas, Lectura, Sociales, Ciencias e Inglés' },
};
// Cursos de fundamentación en Ingeniería y Ciencias: van juntos en una lámina y una tarjeta ancha.
const PZ_FUND = ['algebra', 'trig', 'calc', 'geo', 'int', 'lin', 'fis'], PZ_FUND_N = 'Fundamentación en Ingeniería y Ciencias', PZ_FUND_C = '#5eead4';
const PZ_ORDEN = ['preuda', 'preicfes', 'algebra', 'trig'];
const pzOrdena = cs => [...cs].sort((a, b) => ((PZ_ORDEN.indexOf(a.id) + 1) || 99) - ((PZ_ORDEN.indexOf(b.id) + 1) || 99));
// Precio más bajo que se vende hoy, de lo que publica la tienda: { precio, meses } o null (entonces no se muestra nada).
function pzDesdeCurso(productos, id) {
  const ps = (productos || []).filter(p => p.curso === id && p.activo && p.precio != null).sort((a, b) => a.precio - b.precio);
  return ps.length ? { precio: ps[0].precio, meses: ps[0].meses } : null;
}
function pzDesdeArt(arts, tipo) {
  // la hora en grupo se anuncia aparte: el precio de la tarjeta es el de una hora individual
  const ps = (arts || []).filter(a => a.tipo === tipo && a.activo && a.precio != null && (tipo !== 'asesoria' || (a.da.horas === 1 && a.da.horas_tipo === 'general'))).map(a => a.precio);
  return ps.length ? { precio: Math.min(...ps) } : null;
}
const PZ_I = {
  dia: '<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>', hoja: '<path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7"/>', mas: '<path d="M3 5h18v12H3zM8 21h8M12 17v4"/>',
  meta: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', precio: '<path d="M3 12V4h8l10 10-7 7zM7.5 8.5v.01"/>',
  fl: '<path d="M9 5l7 7-7 7"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const pzI = k => `<svg class="pz-i" viewBox="0 0 24 24" aria-hidden="true">${PZ_I[k]}</svg>`;
const PZ_WA = '<svg class="pz-wa-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.600 15L2 22l5.100-1.300A10 10 0 1 0 12 2zm0 18.200a8.200 8.200 0 0 1-4.200-1.150l-.3-.18-3 .8.8-2.950-.2-.31A8.200 8.200 0 1 1 12 20.200zm4.700-6.100c-.26-.13-1.520-.75-1.760-.84-.23-.08-.4-.13-.57.13-.17.26-.66.84-.8 1-.15.17-.3.2-.55.07a6.900 6.900 0 0 1-3.450-3c-.26-.45.26-.42.75-1.390.08-.17.04-.31-.02-.44l-.8-1.900c-.2-.5-.42-.43-.57-.44h-.5c-.17 0-.44.06-.67.31-.23.26-.88.86-.88 2.100s.9 2.440 1.030 2.600c.13.17 1.780 2.720 4.310 3.810 1.600.69 2.230.75 3.030.63.49-.07 1.520-.62 1.730-1.220.21-.6.21-1.110.15-1.220-.06-.11-.23-.17-.49-.3z"/></svg>';

// Quiénes somos: tres afiches (entrar, no soltarla, cumplir el sueño). Símbolos: Phosphor Icons 2.1.1, duotono (licencia MIT).
const PZ_SUENOS = [
  { c: '#a3e635', h: 'Que entrar a la U no sea un lujo', p: 'Educación de la buena, desde tu celu y a tu ritmo, vivas donde vivas. Y el primer mundo va por cuenta de la casa.',
    d: '<path d="M200,40V224H168V32h24A8,8,0,0,1,200,40Z" opacity="0.2"/><path d="M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-40,0H176V40h16ZM64,40h96V216H64Zm80,92a12,12,0,1,1-12-12A12,12,0,0,1,144,132Z"/>' },
  { c: '#ff9d8c', h: 'Que nadie tire la toalla', p: 'A muchos la carrera se les enreda por las mates del primer semestre. Nosotros te ayudamos a llegar bien parado, para que no te toque soltarla.',
    d: '<path d="M200,152l-40,40L96,176,40,136,72.68,70.63,128,56l55.32,14.63L183.6,72H144L98.34,116.29a8,8,0,0,0,1.38,12.42C117.23,139.9,141,139.13,160,120Z" opacity="0.2"/><path d="M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l55.07-55.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41ZM41.53,64,62,74.22,36.43,125.27,16,115.06Zm116,119.13L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm62-57.87-25.52-51L214.47,64,240,115.06Zm-87.75,92.67a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z"/>' },
  { c: '#ffd257', h: 'Que cumplas ese sueño', p: 'Ser la primera de la casa en graduarse, ingeniero, profe, doctora… El sueño lo pones tú. Nosotros le metemos la ficha contigo.',
    d: '<path d="M216,113.07v53.22a8,8,0,0,1-2,5.31c-11.3,12.59-38.9,36.4-86,36.4s-74.68-23.81-86-36.4a8,8,0,0,1-2-5.31V113.07L128,160Z" opacity="0.2"/><path d="M251.76,88.94l-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V240a8,8,0,0,0,16,0V199.51a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12ZM128,200c-43.27,0-68.72-21.14-80-33.71V126.4l76.24,40.66a8,8,0,0,0,7.52,0L176,143.47v46.34C163.4,195.69,147.52,200,128,200Zm80-33.75a97.83,97.83,0,0,1-16,14.25V134.93l16-8.53ZM188,118.94l-.22-.13-56-29.87a8,8,0,0,0-7.52,14.12L171,128l-43,22.93L25,96,128,41.07,231,96Z"/>' },
];
const PZ_COMO = ['Primero la idea, después la fórmula', 'Juegas en vez de memorizar', 'Pistas cuando te trabas', 'Sin cronómetro ni afán'];

function presentacionHTML(lista, { worlds = {}, install = '', todos = lista } = {}) {
  const cursos = pzOrdena(lista);
  const logo = zukaWord();
  const mascot = pose => (typeof mascotSVG === 'function' ? mascotSVG(pose) : '');
  const art = c => (typeof courseArt === 'function' ? courseArt(c, 'lg') : `<span class="pz-dot" style="background:${c.color}"></span>`);
  const empieza = (cls = '') => `<button class="btn main brand ${cls}" type="button" data-pz="prueba">Pide tu código de prueba</button>`;
  const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
  const pasos = '<ol class="pz-pasos"><li><b>Pide tu código</b><span>Por WhatsApp, gratis.</span></li><li><b>Juega el primer mundo</b><span>Y decide con calma.</span></li><li><b>Sigue donde vas</b><span>Tu curso se activa en el mismo código.</span></li></ol>';
  const info = (que, cls = '', txt = '') => `<button class="pz-wa ${cls}" type="button" data-pz="info" data-que="${pzEsc(que)}"${txt ? '' : ` aria-label="Preguntar por WhatsApp sobre ${pzEsc(que || 'Zuka')}"`}>${PZ_WA}${txt}</button>`;
  const precio = k => `<p class="pz-f pz-f-precio" data-pz-precio="${k}" hidden>${pzI('precio')}<span></span></p>`;
  const fila = (i, b, t) => `<p class="pz-f">${pzI(i)}<span><b>${b}</b>${t ? `<br>${t}` : ''}</span></p>`;
  const celu = id => `<span class="pz-celu"><img src="brand/app/${id}.webp" alt="" width="480" height="973" loading="lazy"></span>`;
  const libros = cls => `<div class="pz-estante ${cls}" data-inclina="9">${PZ_LIBROS.map(([t, n]) => `<span style="--i:${n - 2.5}"><img src="brand/libros/${n}.webp" alt="Libro ${n}: ${t}" loading="lazy" width="340" height="480"></span>`).join('')}</div>`;
  const orden = cursos;
  const tarjeta = ({ color, fig, cls = '', name, tag, pills, filas, pr, ir, tab }) => `<article class="pz-prog ${cls}" style="--c:${color}"><div class="pz-prog-art" aria-hidden="true">${fig}</div>
      <div class="pz-prog-txt"><h3>${pzEsc(name)}</h3><p class="pz-pills"><span>${tag}</span>${pills.map(t => `<span class="b">${t}</span>`).join('')}</p>${filas}${precio(pr)}</div>
      <div class="pz-prog-pie"><button class="btn sm" type="button" data-pz-ir="${ir}"${tab == null ? '' : ` data-tab="${tab}"`}>Más información<span class="pz-sr"> sobre ${pzEsc(name)}</span></button>${info(name)}</div></article>`;
  const fund = PZ_FUND.map(id => cursos.find(c => c.id === id) || todos.find(c => c.id === id)).filter(Boolean), hayFund = cursos.some(c => PZ_FUND.includes(c.id));
  const foto = '<img src="brand/ingenieros.webp" alt="Dos ingenieros resuelven las reacciones de una viga en un tablero" width="1300" height="732" loading="lazy">';
  const logos = hayFund ? `<ul class="pz-logos">${fund.map(c => `<li>${art(c)}<span>${pzEsc(c.name)}${cursos.includes(c) ? '' : '<small>Muy pronto</small>'}</span></li>`).join('')}</ul>` : '';
  const tarjetaFund = hayFund ? `<article class="pz-prog pz-prog-fund" style="--c:${PZ_FUND_C}"><div class="pz-prog-art" aria-hidden="true">${foto}</div>
      <div class="pz-prog-txt"><h3>${PZ_FUND_N}</h3><p class="pz-pills"><span>Primeros semestres</span><span class="b">Virtual</span></p>
        ${fila('meta', 'Cierra los vacíos del colegio y llega preparado a tus parciales.', 'Desde cero y a tu ritmo, con ejercicios que se juegan')}
        <ul class="pz-fcs">${fund.map(c => (cursos.includes(c) ? `<li><button type="button" data-pz-ir="#pz-cursos" data-tab="${cursos.indexOf(c)}" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}</small><small data-pz-precio="curso:${c.id}" hidden><span></span></small></span></button></li>` : `<li class="pronto" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>Muy pronto</small></span></li>`)).join('')}</ul></div>
      <div class="pz-prog-pie"><button class="btn sm" type="button" data-pz-ir="#pz-cursos" data-tab="${cursos.findIndex(c => PZ_FUND.includes(c.id))}">Más información<span class="pz-sr"> sobre ${PZ_FUND_N}</span></button>${info(`los cursos de ${PZ_FUND_N}`)}</div></article>` : '';
  const progs = orden.filter(c => !PZ_FUND.includes(c.id)).map(c => {
    const p = PZ_PROG[c.id] || { tag: pzEsc(c.level || 'Curso'), meta: pzEsc(c.tagline || ''), trae: 'Explicaciones y ejercicios que se juegan' };
    return tarjeta({ color: p.color || c.color, fig: PZ_PROG[c.id] ? celu(c.id) : art(c), name: c.name, tag: p.tag, pills: ['Virtual'], pr: `curso:${c.id}`, ir: '#pz-cursos', tab: cursos.indexOf(c),
      filas: fila('dia', 'Empiezas cuando quieras', 'A tu ritmo, en celular o computador') + fila('hoja', 'Contiene', `${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}`) + fila('mas', 'Incluye', p.trae) + fila('meta', p.meta) });
  }).concat([
    tarjeta({ color: '#f5c451', cls: 'pz-prog-lib', fig: libros(''), name: 'Libros de admisión', tag: 'Impresos', pills: ['Con envío'], pr: 'art:fisico', ir: '#pz-libros',
      filas: fila('dia', 'A color, en tu casa', 'Sueltos o el juego completo') + fila('hoja', 'Contiene', 'Cuatro libros: dos de razonamiento lógico y dos de comprensión lectora') + fila('mas', 'Incluye', 'Ejemplos resueltos y talleres con clave') + fila('meta', 'Estudia el examen de admisión sin pantalla, tema por tema.') }),
    tarjetaFund,
    tarjeta({ color: '#ff8a7a', cls: 'pz-prog-ase', fig: PZ_TUTOR, name: 'Asesorías en vivo', tag: 'Por horas', pills: ['Virtual'], pr: 'art:asesoria', ir: '#pz-d-tut',
      filas: fila('dia', 'Tú eliges el día y la hora', 'Según los cupos disponibles') + fila('hoja', 'Contiene', 'Una hora virtual sobre los temas que escojas') + fila('mas', 'Materias', 'Las de los cursos que ya están abiertos') + fila('meta', 'Resuelve con una persona lo que se te puso difícil.') }),
  ]).join('');
  const prontos = todos.filter(c => !cursos.some(x => x.id === c.id) && !(hayFund && PZ_FUND.includes(c.id)));
  // Carrusel: la promesa con la foto, un programa por lámina y los libros. `data-c`: el color de la franja.
  const lamina = (c, name, cuerpo, fig, cls = '') => `<div class="pz-lamina ${cls}" data-c="${c}" role="group" aria-roledescription="lámina" aria-label="${pzEsc(name)}"><div class="pz-in pz-lam-in"><div class="pz-lam-txt">${cuerpo}</div><div class="pz-lam-fig">${fig}</div></div></div>`;
  const mancha = f => `<div class="pz-mancha" data-inclina="7" aria-hidden="true">${f}</div>`;
  const laminas = [
    lamina('#a3e635', 'Zuka, tu aliado', `<h1>Tu aliado para <em>entrar</em> a la universidad y <em>terminarla</em></h1><p class="pz-lead">Cursos que se juegan, libros y asesorías para preparar la admisión y sacar adelante las matemáticas de la carrera.</p>
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz-ir="#pz-programas">Ver programas</button></div>`, '<div class="pz-mancha pz-foto" data-inclina="5"><img src="brand/estudiantes.webp" alt="Cuatro estudiantes universitarios conversan en el campus" width="1200" height="885" fetchpriority="high"></div>', 'pz-lam-foto'),
    lamina('#fdeee0', 'Estudia desde cualquier lugar', `<h2>Estudia desde cualquier lugar, <em>a tu ritmo</em></h2><p class="pz-lead">Desde tu celular, computador o tablet. Entras con el mismo código y tu avance te sigue.</p>
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz-ir="#pz-dudas">Cómo funciona</button></div>`, `<div class="pz-disp"><img class="pz-disp-f" src="brand/dispositivos.webp" alt="Una estudiante sonríe con su computador en un parque" width="1072" height="694" loading="lazy">
      <div class="pz-equipos" role="img" aria-label="La app Zuka en un celular, un computador y una tablet"><span class="pz-eq-cel"><img src="brand/app/preuda.webp" alt="" width="480" height="973" loading="lazy"></span><span class="pz-eq-pc"><img src="brand/app/computador.webp" alt="" width="880" height="550" loading="lazy"><i></i></span><span class="pz-eq-tab"><img src="brand/app/tablet.webp" alt="" width="480" height="662" loading="lazy"></span></div></div>`, 'pz-lam-disp'),
    ...orden.filter(c => PZ_PROG[c.id]).map(c => lamina(PZ_PROG[c.id].color || c.color, c.name, `<p class="pz-lam-k">${pzEsc(c.name)}</p><h2>${PZ_PROG[c.id].h}</h2><p class="pz-lead">${plural((c.units || []).length, 'mundo', 'mundos')} y ${plural(pzLessons(c), 'lección', 'lecciones')}, a tu ritmo. El primer mundo es gratis con un código de prueba.</p>
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="${pzEsc(c.name)}">Quiero inscribirme</button><button class="btn ghost" type="button" data-pz="prueba">Probar gratis</button></div>`, mancha(celu(c.id)))),
    ...(hayFund ? [lamina(PZ_FUND_C, PZ_FUND_N, `<p class="pz-lam-k">Primeros semestres</p><h2>Fundamentación en Ingeniería y Ciencias</h2><p class="pz-lead">Las matemáticas que sostienen tu carrera, desde cero y a tu ritmo.</p>${logos}
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="los cursos de ${PZ_FUND_N}">Quiero inscribirme</button><button class="btn ghost" type="button" data-pz-ir=".pz-prog-fund">Ver los cursos</button></div>`, `<div class="pz-mancha pz-foto pz-foto-ing" data-inclina="5">${foto}</div>`, 'pz-lam-fund')] : []),
    lamina('#f5e6c0', 'Libros de admisión', `<p class="pz-lam-k">Libros de admisión</p><h2>El examen, también en papel</h2><p class="pz-lead">Dos libros de razonamiento lógico y dos de comprensión lectora. Impresos a color, con envío.</p>
      <div class="pz-ctas"><button class="btn main brand" type="button" data-pz="info" data-que="los libros de admisión">Quiero los libros</button><button class="btn ghost" type="button" data-pz-ir="#pz-libros">Conocerlos</button></div>`, mancha(libros('pz-est-lam')), 'pz-lam-libros'),
  ];
  const mundo = u => {
    const w = worlds[u.world] || {};
    return `<li>${w.art ? `<span class="pz-lam world-art" aria-hidden="true">${w.art}</span>` : ''}<span>${pzEsc(w.name || u.title)}</span></li>`;
  };
  const gymC = cursos[0];
  const gymArt = typeof GYM_3D === 'string' && gymC
    ? `<span class="pz-gymart" data-inclina="14" style="${typeof gymFabColors === 'function' ? gymFabColors(gymC) : `--c:${gymC.color}`}">${GYM_3D}</span>` : '';
  const plates = n => (typeof gymPlates === 'function' ? gymPlates(n) : '');
  const demo = (cls, h, p, fig, pie = '') => `<article class="pz-demo ${cls} pz-rev" id="${cls}"><div class="pz-demo-txt"><h3>${h}</h3><p>${p}</p></div>
      <div class="pz-demo-fig">${fig}</div>${pie}</article>`;
  const menu = [['#pz-programas', 'Programas'], ['#pz-somos', 'Quiénes somos'], ['#pz-ruta', 'Tu camino'], ['#pz-como', 'Cómo se aprende'], ['#pz-dudas', 'Preguntas']];
  return `<header class="pz-bar"><div class="pz-in"><span class="pz-logo">${logo}</span>
      <nav class="pz-nav" id="pz-nav" aria-label="Secciones">${menu.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <span class="pz-bar-acts"><button class="pz-plat" type="button" data-pz="login"><span class="pz-larga">Plataforma virtual</span><span class="pz-corta">Entrar</span>${pzI('fl')}</button>
      <button class="pz-menu" type="button" aria-label="Menú" aria-expanded="false" aria-controls="pz-nav">${pzI('menu')}</button></span></div></header>
    <main class="pz-main">
    <section class="pz-hero pz-tinta" aria-roledescription="carrusel" aria-label="Programas destacados">
      <div class="pz-pista">${laminas.join('')}</div>
      <button class="pz-fl pz-ant" type="button" aria-label="Lámina anterior">${pzI('fl')}</button><button class="pz-fl pz-sig" type="button" aria-label="Lámina siguiente">${pzI('fl')}</button>
      <div class="pz-puntos"><button class="pz-pausa" type="button" aria-label="Pausar el carrusel"></button>${laminas.map((x, i) => `<button type="button" class="pz-pto" aria-label="Lámina ${i + 1} de ${laminas.length}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
    </section>
    <section class="pz-sec pz-in pz-programas" id="pz-programas">
      <h2 class="pz-rev">Nuestros programas disponibles</h2>
      <div class="pz-progs">${progs}</div>
      ${prontos.length ? `<p class="pz-prontos"><b>Muy pronto</b>${prontos.map(c => `<span style="--c:${c.color}">${pzEsc(c.name)}</span>`).join('')}</p>` : ''}
    </section>
    <section class="pz-franja pz-azul" id="pz-somos"><div class="pz-in">
      <div class="pz-somos-top pz-rev"><div class="pz-somos-txt"><p class="pz-somos-k">Quiénes somos</p>
        <h2>Acá nadie se queda <em>por fuera</em></h2>
        <p class="pz-lead">Somos Zuka, una app hecha en Colombia. Creemos que estudiar con calidad no debería depender de la plata ni del barrio. Por eso te acompañamos a entrar a la U, a quedarte en ella y a salir con el cartón en la mano.</p></div>
        <div class="pz-somos-m" data-inclina="10"><p class="pz-globo">¿Malo para las mates? <b>¡Qué va!</b> De pronto nadie te las había explicado bien.</p><span aria-hidden="true">${mascot('cheer')}</span></div></div>
      <div class="pz-tres">${PZ_SUENOS.map(s => `<article class="pz-rev" style="--c:${s.c}"><svg viewBox="0 0 256 256" aria-hidden="true">${s.d}</svg><h3>${s.h}</h3><p>${s.p}</p></article>`).join('')}</div>
      <div class="pz-somos-como pz-rev"><h3>¿Y cómo? Sin enredos:</h3><ul>${PZ_COMO.map(t => `<li>${t}</li>`).join('')}</ul></div>
      </div>
    </section>
    <section class="pz-sec pz-in" id="pz-ruta">
      <header class="pz-head pz-rev"><h2>Contigo del colegio al grado</h2><p>Recorre el camino y mira qué tienes en cada etapa.</p></header>
      <div class="pz-rev">${pzCamino(cursos, todos)}</div>
    </section>
    <section class="pz-sec pz-in pz-pasa">
      <h2 class="pz-rev">¿Te ha pasado?</h2>
      <ul class="pz-quejas pz-rev">${PZ_DUDAS.map(([q, r], i) => `<li${i ? '' : ' class="on"'}><button type="button" aria-expanded="${!i}" aria-controls="pz-q-${i}">«${q}»</button><div class="pz-resp" id="pz-q-${i}"><p>${r}</p></div></li>`).join('')}</ul>
    </section>
    <section class="pz-sec pz-in" id="pz-como">
      <header class="pz-head pz-rev"><h2>Cómo se aprende en Zuka</h2>
        <p>Primero ves la idea, después la fórmula. Estos dibujos funcionan: pruébalos.</p></header>
      <div class="pz-demos">
        ${demo('pz-d-rueda', 'La rueda que dibuja la onda', 'La altura del punto es el seno del ángulo. Muévelo y mira cómo se dibuja.', pzRueda())}
        ${demo('pz-d-area', 'La fórmula deja de ser un truco', 'Mueve el corte: el cuadrado siempre se arma con las mismas cuatro piezas.', PZ_AREA,
    '<p class="pz-cuenta pz-cuenta-area"></p>')}
        ${demo('pz-d-pal', 'Practicas jugando', 'Corre el peso hasta equilibrar la palanca. La cuenta se escribe sola.', PZ_PALANCA,
    '<p class="pz-cuenta pz-cuenta-pal"></p>')}
        ${demo('pz-d-gym', 'Gimnasio cerebral', 'Retos guiados de lo que ya aprendiste. Empiezas suave y subes cuando estés listo.', gymArt,
    `<ul class="pz-levels"><li class="lv1">${plates(1)}Calentamiento</li><li class="lv2">${plates(2)}Fuerza</li><li class="lv3">${plates(3)}Élite</li></ul>`)}
        ${demo('pz-d-tut', 'Tutorías en vivo', 'Separa una asesoría virtual: eliges la materia, los temas, el día y la hora. Se compran por horas.', PZ_TUTOR)}
      </div>
    </section>
    <section class="pz-sec pz-in pz-topics" id="pz-cursos">
      <header class="pz-head pz-rev"><h2>Lo que vas a aprender</h2><p>Cada curso es un mapa de mundos, en orden y desde cero.</p></header>
      <div class="pz-cursos pz-rev">
        <div class="pz-tabs" role="tablist" aria-label="Cursos">${cursos.map((c, i) => `<button type="button" role="tab" id="pz-tab-${i}" aria-controls="pz-panel-${i}" data-pz-tab="${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" style="--c:${c.color}">${art(c)}<span><b>${pzEsc(c.name)}</b><small>${plural(pzLessons(c), 'lección', 'lecciones')}</small></span></button>`).join('')}</div>
        ${cursos.map((c, i) => `<div class="pz-panel" role="tabpanel" id="pz-panel-${i}" aria-labelledby="pz-tab-${i}" data-pz-panel="${i}" style="--c:${c.color}"${i ? ' hidden' : ''}>
          <p>${pzEsc(c.tagline || '')}</p><ul class="pz-mundos">${(c.units || []).slice(0, PZ_MUNDOS).map(mundo).join('')}</ul>
          ${(c.units || []).length > PZ_MUNDOS ? `<p class="pz-mas">y ${plural(c.units.length - PZ_MUNDOS, 'mundo más', 'mundos más')}</p>` : ''}</div>`).join('')}
      </div>
    </section>
    <section class="pz-sec pz-in pz-libros" id="pz-libros">
      <div class="pz-libros-txt pz-rev"><h2>También en papel</h2>
        <p>Cuatro libros para el examen de admisión: dos de razonamiento lógico y dos de comprensión lectora. Ejemplos resueltos, talleres con clave y la forma en que se pregunta cada tema. Impresos a color, con envío.</p></div>
      <div class="pz-rev">${libros('')}</div>
    </section>
    <section class="pz-sec pz-in pz-dudas" id="pz-dudas">
      <h2 class="pz-rev">Preguntas frecuentes</h2>
      <div class="pz-faq pz-rev">
        <details open><summary>¿Qué puedo hacer gratis?</summary><p>El primer mundo del curso, con un código de prueba que pides por WhatsApp. Para seguir, compras el curso y se activa en tu mismo código.</p></details>
        <details><summary>¿Necesito saber mucho para empezar?</summary><p>No. Los cursos empiezan desde cero, y casi todos los ejercicios traen una pista.</p></details>
        <details><summary>¿Sirve en el celular y en el computador?</summary><p>Sí. Funciona en el navegador de los dos y también se instala como una app, sin pasar por la tienda.</p>${install}</details>
        <details><summary>¿Cómo entro y qué pasa con mi avance?</summary><p>Escribes tu código y listo. Con ese mismo código entras siempre y conservas tu avance.</p></details>
      </div>
    </section>
    <section class="pz-final pz-tinta"><div class="pz-in"><div class="pz-final-art" data-inclina="16">${mascot('cheer')}</div>
      <div class="pz-final-txt"><h2>¿Qué estás esperando?</h2><p class="pz-lead">La universidad empieza hoy, y el primer mundo es gratis.</p>${pasos}
      <div class="pz-ctas">${empieza()}<button class="btn ghost" type="button" data-pz="login">Ya tengo código</button></div></div></div></section>
    </main>
    <footer class="pz-foot"><div class="pz-in"><div class="pz-foot-m"><span class="pz-logo">${logo}</span><small>Potencia tu mente</small></div>
      <nav aria-label="Programas"><b>Programas</b>${orden.map(c => `<a href="#pz-cursos" data-tab="${cursos.indexOf(c)}">${pzEsc(c.name)}</a>`).join('')}<a href="#pz-libros">Libros de admisión</a></nav>
      <nav aria-label="Zuka"><b>Zuka</b>${menu.slice(1).map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      <div class="pz-foot-c"><b>Escríbenos</b>${info('', 'con', 'WhatsApp')}<button type="button" data-pz="login">Entrar a la plataforma</button></div>
      <small class="pz-foot-c2">© 2026 Zuka</small></div></footer>
    ${info('', 'pz-flota')}`;
}
// Precios de la tienda: se escriben al llegar, sin volver a dibujar la página.
function pzPrecios(el, productos, arts) {
  el.querySelectorAll('[data-pz-precio]').forEach(p => {
    const [k, v] = p.dataset.pzPrecio.split(':'), d = k === 'curso' ? pzDesdeCurso(productos, v) : pzDesdeArt(arts, v);
    p.hidden = !d;
    if (d) p.querySelector('span').innerHTML = `Desde <b>${cop(d.precio)}</b>${d.meses ? ` por ${mesesTexto(d.meses)}` : v === 'asesoria' ? ' la hora' : ' cada libro'}`;
  });
}

// ---- dibujos que se mueven ----
// Arrastre directo (dedo, ratón) y flechas del teclado sobre una pieza `role="slider"`.
function pzArrastra(svg, knob, { mueve, tecla, suelta = () => {} }) {
  const punto = e => new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  let id = null;
  knob.addEventListener('pointerdown', e => {
    if (id !== null || e.button) return;
    id = e.pointerId; knob.setPointerCapture(id); knob.classList.add('held'); mueve(punto(e));
  });
  knob.addEventListener('touchstart', e => e.preventDefault(), { passive: false });   // el dedo arrastra, no desplaza
  knob.addEventListener('pointermove', e => { if (e.pointerId === id) mueve(punto(e)); });
  const fin = e => { if (e.pointerId !== id) return; id = null; knob.classList.remove('held'); suelta(); };
  knob.addEventListener('pointerup', fin); knob.addEventListener('pointercancel', fin);
  knob.addEventListener('keydown', e => {
    const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (d) { e.preventDefault(); tecla(d); }
  });
}
function pzRuedaViva(el, quieto) {
  const st = el.querySelector('.pz-stage'), svg = st.querySelector('svg'), $q = c => st.querySelector(c), knob = $q('.pz-knob');
  const [lee, dice, go] = [$q('.pz-lee'), $q('.pz-reto-t'), $q('.pz-reto-go')];
  let deg = 48, g, hecho = false, tocado = 0, visible = true, antes = 0, raf = 0;
  const pinta = () => {
    const t = deg * Math.PI / 180, x = g.cx + g.r * Math.cos(t), y = g.cy - g.r * Math.sin(t), n = Math.round(deg) % 360;
    const set = (c, k, v) => $q(c).setAttribute(k, v);
    set('.pz-onda', 'd', pzOnda(deg, g));
    set('.pz-tri', 'd', `M${g.cx} ${g.cy}L${x} ${y}V${g.cy}Z`);
    set('.pz-alto', 'd', `M${x} ${g.cy}V${y}`);
    set('.pz-guia', 'd', `M${x} ${y}H${g.x0}`);
    const q = g.r * .26;
    set('.pz-arco', 'd', `M${g.cx + q} ${g.cy}A${q} ${q} 0 ${deg > 180 ? 1 : 0} 0 ${g.cx + q * Math.cos(t)} ${g.cy - q * Math.sin(t)}`);
    set('.pz-fin', 'cx', g.x0); set('.pz-fin', 'cy', y);
    knob.setAttribute('transform', `translate(${x} ${y})`);
    knob.setAttribute('aria-valuenow', n);
    const v = Math.sin(t);
    knob.setAttribute('aria-valuetext', `${n} grados, altura ${v.toFixed(2)}`);
    lee.innerHTML = `<i>sen</i> <b>${n}°</b> = <b>${(Math.abs(v) < .005 ? 0 : v).toFixed(2).replace('-', '−')}</b>`;
  };
  const mide = () => {
    const W = st.clientWidth || 1440, H = svg.clientHeight || 380, ancho = W >= 760;
    const r = ancho ? Math.min(H * .41, 165) : Math.min(W * .22, H * .4);
    const gut = ancho ? 8 : 4, cx = gut + r + 14;
    g = { r, cx, cy: H / 2, x0: cx + r + (ancho ? 90 : 34), x1: W + 8, largo: ancho ? 2.6 : 1.5 };
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const aro = $q('.pz-aro');
    aro.setAttribute('cx', cx); aro.setAttribute('cy', g.cy); aro.setAttribute('r', r);
    $q('.pz-eje').setAttribute('d', `M0 ${g.cy}H${W}M${cx} ${g.cy - r - 22}V${g.cy + r + 22}`);
    $q('.pz-meta').setAttribute('d', `M${cx - r - 14} ${g.cy - r / 2}H${W}`);
    $q('.pz-meta-t').setAttribute('x', W - (ancho ? 32 : 14)); $q('.pz-meta-t').setAttribute('y', g.cy - r / 2 - 8);
    pinta();
  };
  const revisa = () => {
    const a = pzReto(deg);
    if (a === null) return;
    deg = a; pinta(); hecho = true; st.classList.add('ok');
    dice.innerHTML = `<b>¡Eso es!</b> sen ${a}° = ½. Así se siente una lección.`;
    go.hidden = false;
  };
  const toca = () => {   // se vuelve a mover después de acertar: el reto queda abierto otra vez
    tocado = performance.now(); st.classList.add('tocado');
    if (hecho) { hecho = false; st.classList.remove('ok'); dice.innerHTML = PZ_RETO; go.hidden = true; }
  };
  pzArrastra(svg, knob, {
    mueve: p => { toca(); deg = pzAngulo(p.x - g.cx, p.y - g.cy); pinta(); },
    tecla: d => { toca(); deg = (Math.round(deg / 5) * 5 + 5 * d + 360) % 360; pinta(); revisa(); },
    suelta: () => { tocado = performance.now(); revisa(); },
  });
  mide();
  const ro = new ResizeObserver(() => (st.isConnected ? mide() : ro.disconnect())); ro.observe(st);
  if (quieto) return;
  // Gira sola hasta que alguien la toca; después espera, y tras acertar se queda quieta.
  const paso = t => {
    raf = 0;
    if (!st.isConnected || !visible) return;
    const dt = Math.min(50, t - antes || 0); antes = t;
    if (!knob.classList.contains('held') && !hecho && !knob.matches(':focus-visible') && t - tocado > 6000) { deg = (deg + dt * .022) % 360; pinta(); }
    raf = requestAnimationFrame(paso);
  };
  tocado = -1e9; raf = requestAnimationFrame(paso);
  new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(paso); }, { root: el }).observe(st);
}
// ---- lo que responde al puntero (solo ratón; con «reducir movimiento», nada) ----
function pzPuntero(el) {
  const cosas = [];   // { paso(dt) → ¿sigue en marcha? }
  let raf = 0, antes = 0;
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = antes ? (t - antes) / 1000 : .016; antes = t;
    if (cosas.map(c => c.paso(dt)).some(Boolean)) raf = requestAnimationFrame(bucle); else antes = 0;
  };
  const anda = () => { if (!raf) raf = requestAnimationFrame(bucle); };
  // Dos números que persiguen su meta con un resorte y se pintan.
  const sigue = (pinta, k, c) => {
    const s = { x: 0, y: 0, vx: 0, vy: 0, mx: 0, my: 0, paso(dt) {
      [s.x, s.vx] = pzResorte(s.x, s.vx, s.mx, dt, k, c); [s.y, s.vy] = pzResorte(s.y, s.vy, s.my, dt, k, c);
      const vivo = Math.abs(s.mx - s.x) + Math.abs(s.my - s.y) + (Math.abs(s.vx) + Math.abs(s.vy)) * .1 > .02;
      if (!vivo) { s.x = s.mx; s.y = s.my; s.vx = s.vy = 0; }
      pinta(s.x, s.y); return vivo;
    } };
    cosas.push(s); return s;
  };
  const rel = (e, caja) => { const r = caja.getBoundingClientRect(); return [(e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5, r]; };
  // Botones principales: se dejan atraer un poco.
  el.querySelectorAll('.pz-main .btn.brand').forEach(b => {
    const s = sigue((x, y) => { b.style.translate = x || y ? `${x.toFixed(2)}px ${y.toFixed(2)}px` : ''; }, 220, 18);
    b.addEventListener('pointermove', e => { const [x, y] = rel(e, b); s.mx = x * 14; s.my = y * 10; anda(); });
    b.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Piezas que se inclinan hacia el puntero en 3D (libros, mancuerna, personaje).
  el.querySelectorAll('[data-inclina]').forEach(d => {
    const g = +d.dataset.inclina, zona = d.closest('.pz-demo, .pz-final, .pz-libros, .pz-prog, .pz-lamina, .pz-somos-top') || d;
    const s = sigue((x, y) => { d.style.setProperty('--rx', `${y.toFixed(2)}deg`); d.style.setProperty('--ry', `${x.toFixed(2)}deg`); }, 120, 16);
    zona.addEventListener('pointermove', e => { const [x, y] = rel(e, zona); s.mx = x * 2 * g; s.my = -y * 2 * g; anda(); });
    zona.addEventListener('pointerleave', () => { s.mx = s.my = 0; anda(); });
  });
  // Luz que sigue al puntero en las tarjetas.
  el.querySelectorAll('.pz-demo, .pz-panel, .pz-ruta, .pz-prog').forEach(d => {
    d.classList.add('pz-luz');
    d.addEventListener('pointermove', e => { const [x, y] = rel(e, d); d.style.setProperty('--mx', `${((x + .5) * 100).toFixed(1)}%`); d.style.setProperty('--my', `${((y + .5) * 100).toFixed(1)}%`); });
  });
}
// El camino: el punto sigue al puntero (o al dedo) y se queda en la etapa elegida.
function pzCaminoVivo(el, quieto) {
  const ruta = el.querySelector('.pz-ruta'), map = ruta.querySelector('.pz-ruta-map'), yo = ruta.querySelector('.pz-ruta-yo'), luz = ruta.querySelector('.pz-ruta-l');
  const tabs = [...ruta.querySelectorAll('[role="tab"]')], eps = [...ruta.querySelectorAll('.pz-ep')];
  let x = PZ_PARADAS[1], v = 0, meta = x, sel = 1, raf = 0, t0 = 0;
  const pinta = () => {
    yo.style.left = `${x * 100}%`; yo.style.top = `${pzCaminoY(x) * 100}%`;
    luz.style.clipPath = `inset(0 ${(1 - x) * 100}% 0 0)`;
  };
  const bucle = t => {
    raf = 0;
    if (!el.isConnected) return;
    const dt = t0 ? (t - t0) / 1000 : .016; t0 = t;
    [x, v] = pzResorte(x, v, meta, dt, 150, 21);
    if (Math.abs(meta - x) < .0005 && Math.abs(v) < .002) { x = meta; v = t0 = 0; } else raf = requestAnimationFrame(bucle);
    pinta();
  };
  const va = m => { meta = Math.max(.02, Math.min(.98, m)); if (quieto) { x = meta; pinta(); } else if (!raf) raf = requestAnimationFrame(bucle); };
  const elige = (i, foco) => {
    if (i !== sel) {
      sel = i;
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      eps.forEach((d, k) => { d.classList.toggle('on', k === i); d.inert = k !== i; });
    }
    if (foco) tabs[i].focus();
  };
  const mueve = e => { const r = map.getBoundingClientRect(), m = (e.clientX - r.left) / r.width; va(m); elige(pzEtapaEn(m)); };
  // con el dedo, solo tras un arrastre de lado: empezar a bajar la página no cambia la etapa
  let x0 = 0, lado = false;
  map.addEventListener('pointerdown', e => { x0 = e.clientX; lado = e.pointerType === 'mouse'; });
  map.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || (lado = lado || Math.abs(e.clientX - x0) > 10)) mueve(e); });
  ['pointerleave', 'pointercancel', 'pointerup'].forEach(n => map.addEventListener(n, () => va(PZ_PARADAS[sel])));
  tabs.forEach((b, i) => {
    b.onclick = () => { elige(i); va(PZ_PARADAS[i]); };
    b.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; elige(j, true); va(PZ_PARADAS[j]);
    };
  });
  pinta();
}
// «¿Te ha pasado?»: la frase que se toca (o se señala) muestra cómo ayuda Zuka.
function pzQuejasVivas(el, raton) {
  const lis = [...el.querySelectorAll('.pz-quejas li')];
  const abre = i => lis.forEach((li, k) => { li.classList.toggle('on', k === i); li.firstElementChild.setAttribute('aria-expanded', k === i); });
  lis.forEach((li, i) => {
    li.firstElementChild.onclick = () => abre(!esEscritorio() && li.classList.contains('on') ? -1 : i);   // en el celular, otro toque la cierra
    if (raton) li.firstElementChild.addEventListener('pointerenter', () => { if (esEscritorio()) abre(i); });
  });
}
// Carrusel: se desliza, con flechas, puntos o solo (cada 7 s hasta que alguien lo toca; nunca con «reducir movimiento»).
const PZ_PASA = 7000;
function pzCarrusel(el, quieto) {
  const hero = el.querySelector('.pz-hero'), pista = hero.querySelector('.pz-pista'), ls = [...pista.children], ptos = [...hero.querySelectorAll('.pz-pto')], pausa = hero.querySelector('.pz-pausa');
  let i = 0, anda = !quieto, enc = false, reloj = 0;
  const marca = k => {
    i = k; hero.style.backgroundColor = ls[k].dataset.c; hero.classList.toggle('azul', ls[k].classList.contains('pz-azul'));
    ls.forEach((l, j) => { l.inert = j !== k; });
    ptos.forEach((b, j) => { if (j === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
  };
  const va = k => pista.scrollTo({ left: ((k + ls.length) % ls.length) * pista.clientWidth, behavior: quieto ? 'auto' : 'smooth' });
  const para = () => { anda = false; clearInterval(reloj); pausa.hidden = true; };
  let ancho = 0;   // al cambiar de ancho la lámina se queda en su sitio
  const mira = () => { const w = pista.clientWidth; if (w !== ancho) return; const k = Math.max(0, Math.min(ls.length - 1, Math.round(pista.scrollLeft / (w || 1)))); if (k !== i) marca(k); };
  pista.addEventListener('scroll', mira, { passive: true });
  hero.querySelector('.pz-ant').onclick = () => { para(); va(i - 1); };
  hero.querySelector('.pz-sig').onclick = () => { para(); va(i + 1); };
  ptos.forEach((b, k) => { b.onclick = () => { para(); va(k); }; });
  pausa.onclick = () => { para(); ptos[i].focus({ preventScroll: true }); };
  pista.addEventListener('pointerdown', para); pista.addEventListener('keydown', para);
  hero.addEventListener('pointerenter', () => { enc = true; }); hero.addEventListener('pointerleave', () => { enc = false; });
  const ro = new ResizeObserver(() => { if (!pista.isConnected) return ro.disconnect(); ancho = pista.clientWidth; pista.scrollLeft = i * ancho; }); ro.observe(pista);
  marca(0); pausa.hidden = !anda;
  if (anda) reloj = setInterval(() => {
    if (!pista.isConnected) return clearInterval(reloj);
    if (!enc && !document.hidden && !el.inert && el.scrollTop < 200 && !(hero.contains(document.activeElement) && document.activeElement.matches(':focus-visible'))) va(i + 1);
  }, PZ_PASA);
}
function pzAreaViva(el) {
  const svg = el.querySelector('.pz-area'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-area');
  const L = 232, X = 52, Y = 44;
  let a = 7;
  const pinta = () => {
    const m = pzArea(a), k = L / PZ_LADO, w = a * k - 2, v = m.b * k - 2, x2 = X + a * k + 2, y2 = Y + a * k + 2;
    const rect = (r, x, y, ww, h) => Object.entries({ x, y, width: ww, height: h, rx: 6 }).forEach(([n, z]) => r.setAttribute(n, z));
    const txt = (c, x, y, t, vis = true) => { const e = svg.querySelector(c); e.setAttribute('x', x); e.setAttribute('y', y + 6); e.textContent = t; e.style.opacity = vis ? 1 : 0; };
    rect(svg.querySelector('.pz-aa'), X, Y, w, w); rect(svg.querySelector('.pz-ab'), x2, Y, v, w);
    rect(svg.querySelector('.pz-ba'), X, y2, w, v); rect(svg.querySelector('.pz-bb'), x2, y2, v, v);
    txt('.pz-t-aa', X + w / 2, Y + w / 2, m.aa, a > 1); txt('.pz-t-ab', x2 + v / 2, Y + w / 2, m.ab, m.b > 1 && a > 1);
    txt('.pz-t-ba', X + w / 2, y2 + v / 2, m.ab, m.b > 1 && a > 1); txt('.pz-t-bb', x2 + v / 2, y2 + v / 2, m.bb, m.b > 1);
    txt('.pz-l-a', X + w / 2, 296 - 8, `a = ${a}`); txt('.pz-l-b', x2 + v / 2, 296 - 8, `b = ${m.b}`);
    svg.querySelector('.pz-corte').setAttribute('d', `M${X + a * k} ${Y - 14}V${Y + L}M${X} ${Y + a * k}H${X + L}`);
    knob.setAttribute('transform', `translate(${X + a * k} ${Y - 18})`);
    knob.setAttribute('aria-valuenow', a); knob.setAttribute('aria-valuetext', `a vale ${a}, b vale ${m.b}`);
    out.innerHTML = `(${a} + ${m.b})² = <b class="a">${m.aa}</b> + 2 · <b class="m">${m.ab}</b> + <b class="b">${m.bb}</b> = ${PZ_LADO ** 2}`;
  };
  const pon = v => { const n = Math.max(1, Math.min(PZ_LADO - 1, v)); if (n !== a) { a = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - X) / (L / PZ_LADO))), tecla: d => pon(a + d) });
  pinta();
}
function pzPalancaViva(el) {
  const svg = el.querySelector('.pz-pal'), knob = svg.querySelector('.pz-knob'), out = el.querySelector('.pz-cuenta-pal');
  let d = 4;
  const pinta = () => {
    const m = pzPalanca(d);
    svg.querySelector('.pz-viga').style.transform = `rotate(${m.giro}deg)`;
    knob.style.transform = `translate(${180 + d * 36}px, 144px)`;
    knob.setAttribute('aria-valuenow', d); knob.setAttribute('aria-valuetext', `${d} pasos${m.ok ? ', en equilibrio' : ''}`);
    svg.classList.toggle('ok', m.ok);
    out.innerHTML = `<b class="b">2 × 3</b> ${m.ok ? '=' : m.der > m.izq ? '&lt;' : '&gt;'} <b class="a">3 × ${d}</b><span>${m.ok ? 'En equilibrio' : m.der > m.izq ? 'Pesa más la derecha' : 'Pesa más la izquierda'}</span>`;
  };
  const pon = v => { const n = Math.max(1, Math.min(4, v)); if (n !== d) { d = n; pinta(); } };
  pzArrastra(svg, knob, { mueve: p => pon(Math.round((p.x - 180) / 36)), tecla: k => pon(d + k) });
  pinta();
}

// ---- en la página ----
let pzDesde = false;   // la pantalla de entrada se abrió desde aquí: muestra «Volver» (js/cuenta.js)
function presentacionPide() {
  if (claveAlAbrir()) return true;   // se vuelve del correo de la contraseña (js/clave.js)
  const ok = presentacionToca({ standalone: isStandalone(), user: Cuenta.user, query: location.search });
  if (ok) presentacionAbrir();
  return ok;
}
// Se ve la portada (o la entrada abierta desde ella): tema claro por defecto (applyTheme, js/app.js).
const presentacionClara = () => !!document.getElementById('landing') || (pzDesde && !!document.getElementById('auth'));
function presentacionCerrar() {
  pzDesde = false;
  document.getElementById('landing')?.remove();
  pzInerte(false); applyTheme();
}
// Mientras se ve, lo de atrás no se alcanza con Tab ni con el lector de pantalla.
const PZ_DETRAS = ['#topbar', '#view', '#tabbar', '#overlay'];
function pzInerte(on) {
  PZ_DETRAS.forEach(s => { const x = document.querySelector(s); if (x) x.inert = on && !!document.getElementById('landing'); });
}
// Botón atrás del celular (js/back.js): desde la pantalla de entrada abierta aquí, vuelve a la presentación.
function presentacionAtras() {
  if (!document.getElementById('auth') || !pzDesde) return false;
  pzVolver();
  return true;
}
// De la pantalla de entrada a la presentación: la ventana se cierra (escritorio) o la presentación vuelve (celular).
function pzVolver() {
  document.getElementById('auth')?.remove();
  const lz = document.getElementById('landing');
  if (!lz) return presentacionAbrir();
  lz.inert = false; pzDesde = false;
  lz.focus({ preventScroll: true });
}
// Llegó la lista de cursos publicados (js/cuenta.js): se redibuja sin perder el sitio.
function presentacionRefresca() {
  const el = document.getElementById('landing');
  if (!el || el.inert) return;
  const y = el.scrollTop; presentacionAbrir(); el.scrollTop = y;
}
function presentacionInstall() {
  if (isStandalone()) return '';
  if (installEvt) return '<button class="btn main brand" type="button" data-pz="install">Instalar Zuka</button>';
  return `<p class="pz-help">${installHelp()}</p>`;
}
function presentacionAbrir() {
  let el = document.getElementById('landing');
  if (!el) {
    el = document.createElement('div'); el.id = 'landing';
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Conoce Zuka');
    document.body.appendChild(el);
    applyTheme();
  }
  el.innerHTML = presentacionHTML(cursosVisibles(), { worlds: typeof WORLDS === 'undefined' ? {} : WORLDS, install: presentacionInstall(), todos: COURSES });
  el.scrollTop = 0;
  pzInerte(true);
  el.tabIndex = -1; el.focus({ preventScroll: true });   // la capa, no el título: las láminas se vuelven inertes
  el.querySelectorAll('[data-pz]').forEach(b => b.onclick = () => {
    const m = b.dataset.pz;
    if (m === 'install') return promptInstall().then(() => b.remove());
    const wa = m !== 'login' && waLink(Cuenta.ajustes.whatsapp, m === 'info' ? WA.info(b.dataset.que) : WA.prueba());
    if (wa) { window.open(wa, '_blank', 'noopener'); return; }
    // En el computador la entrada es una ventana sobre la presentación (css/escritorio.css); en el celular la reemplaza.
    const encima = esEscritorio();
    if (!encima) presentacionCerrar();
    pzDesde = true; authScreen(); applyTheme();
    const auth = document.getElementById('auth'), h1 = auth.querySelector('h1');
    h1.tabIndex = -1;
    if (encima) {
      el.inert = true; h1.focus();   // la presentación de atrás no se alcanza con Tab; Escape cierra la ventana
      if (!auth.dataset.pzEsc) { auth.dataset.pzEsc = '1'; auth.addEventListener('keydown', e => { if (e.key === 'Escape') pzVolver(); }); }
    }
  });
  // Pestañas de cursos (con flechas, foco itinerante).
  const tabs = [...el.querySelectorAll('[data-pz-tab]')];
  const pick = i => tabs.forEach((t, k) => {
    t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1;
    el.querySelector(`[data-pz-panel="${k}"]`).hidden = k !== i;
  });
  tabs.forEach((t, i) => {
    t.onclick = () => pick(i);
    t.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); const j = (i + d + tabs.length) % tabs.length; pick(j); tabs[j].focus();
    };
  });
  // Las secciones se alcanzan sin tocar la dirección (#… es de Supabase).
  const bar = el.querySelector('.pz-bar'), quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boton = bar.querySelector('.pz-menu'), menu = on => { bar.classList.toggle('abre', on); boton.setAttribute('aria-expanded', on); };
  boton.onclick = () => menu(!bar.classList.contains('abre'));
  bar.onkeydown = e => { if (e.key === 'Escape' && bar.classList.contains('abre')) { menu(false); boton.focus(); } };
  const ir = (sel, tab) => {
    menu(false);
    if (tab != null) pick(+tab);
    const sec = el.querySelector(sel);
    sec.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' });
    const h = sec.querySelector('h2, h3'); h.tabIndex = -1; h.focus({ preventScroll: true });
  };
  el.querySelectorAll('.pz-nav a, .pz-foot a').forEach(x => x.onclick = e => { e.preventDefault(); ir(x.getAttribute('href'), x.dataset.tab); });
  el.querySelectorAll('[data-pz-ir]').forEach(b => b.onclick = () => ir(b.dataset.pzIr, b.dataset.tab));
  // Precios: primero los guardados; después, los de la base.
  pzPrecios(el, Cuenta.productos, Tienda.arts);
  if (Cuenta.sb) Promise.all([cuentaTienda(), tiendaCarga()]).then(() => { if (el.isConnected) pzPrecios(el, Cuenta.productos, Tienda.arts); }, () => {});
  pzCarrusel(el, quieto); pzRuedaViva(el, quieto); pzAreaViva(el); pzPalancaViva(el); pzCaminoVivo(el, quieto);
  const raton = matchMedia('(hover: hover) and (pointer: fine)').matches;
  pzQuejasVivas(el, raton);
  if (raton && !quieto) pzPuntero(el);
  // Cada bloque aparece suave al entrar en pantalla.
  const rev = el.querySelectorAll('.pz-rev');
  if (!('IntersectionObserver' in window) || quieto) rev.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { root: el, threshold: .12 });
    rev.forEach(r => io.observe(r));
  }
}
