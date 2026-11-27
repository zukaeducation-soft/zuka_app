// Ilustraciones de los cursos: formas planas con volumen. Cada figura se dibuja con la paleta base ART_C y al final
// se pinta con la del curso (ART_PAL): cuatro tonos de su color (el `color` del curso en js/courses y js/data.js) y un
// acento que combina con él.

const ART_C = { blue: '#2f5bff', deep: '#1c3dc4', soft: '#6f8fff', pale: '#8aa6ff', sun: '#ffc531', sunDeep: '#d99a00' };
const ART_PAL = {
  algebra: { blue: '#7c6cf5', deep: '#4b3bb8', soft: '#a99cff', pale: '#cfc8ff', sun: '#ff8fc7', sunDeep: '#d0599b' },   // morado + rosa
  trig:    { blue: '#1bb6dc', deep: '#0c7c9e', soft: '#67e0f5', pale: '#b3f0fb', sun: '#5b8cff', sunDeep: '#3560d8' },   // cian + azul
  calc:    { blue: '#ee5fa7', deep: '#b3387a', soft: '#f99bcb', pale: '#fdc9e2', sun: '#a78bfa', sunDeep: '#7a5ee0' },   // rosa + violeta
  geo:     { blue: '#4f93f0', deep: '#2a62bd', soft: '#8dbdfc', pale: '#c5dcfd', sun: '#5eead4', sunDeep: '#2bb39c' },   // azul + turquesa
  fis:     { blue: '#f2b705', deep: '#b48200', soft: '#fbd94a', pale: '#fde99a', sun: '#fb7a3c', sunDeep: '#cf541c' },   // amarillo + naranja
  int:     { blue: '#22c087', deep: '#11845a', soft: '#6ee7b7', pale: '#b6f3da', sun: '#d9f25e', sunDeep: '#a4bd2c' },   // verde + lima
  euc:     { blue: '#14b8a6', deep: '#0f766e', soft: '#5eead4', pale: '#ccfbf1', sun: '#fb923c', sunDeep: '#c2540a' },   // turquesa + naranja
  preuda:  { blue: '#84cc16', deep: '#4d7c0f', soft: '#bef264', pale: '#d9f99d', sun: '#38bdf8', sunDeep: '#0284c7' },   // lima + celeste
  preicfes: { blue: '#e879f9', deep: '#a21caf', soft: '#f0abfc', pale: '#fae8ff', sun: '#fbbf24', sunDeep: '#d97706' },   // fucsia + ámbar
  lin:     { blue: '#f5822a', deep: '#b9580f', soft: '#fdb070', pale: '#fed3ab', sun: '#ff5d7a', sunDeep: '#d23a58' },   // naranja + rojo rosado
};
const artTint = (svg, pal) => (pal ? svg.replace(/#[0-9a-f]{6}/g, h => { const k = Object.keys(ART_C).find(n => ART_C[n] === h); return k ? pal[k] : h; }) : svg);
const artSvg = body => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const ART_AXES = `<path d="M9 6v49h50" fill="none" stroke="${ART_C.blue}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 11l4-5 4 5M54 51l5 4-5 4" fill="none" stroke="${ART_C.blue}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
const ART_GRID = `<path d="M21 6v49M33 6v49M45 6v49M9 19h50M9 31h50M9 43h50" stroke="${ART_C.pale}" stroke-width="1.2" opacity=".35"/>`;

const COURSE_ART_BASE = {
  // Álgebra: modelo de área de (x + 1)² con fichas.
  algebra: artSvg(`
    <rect x="9" y="15" width="28" height="28" rx="3" fill="${ART_C.deep}"/>
    <rect x="6" y="12" width="28" height="28" rx="3" fill="${ART_C.blue}"/>
    <path d="M11 17h18" stroke="${ART_C.pale}" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
    <rect x="42" y="15" width="12" height="28" rx="2.5" fill="${ART_C.deep}"/>
    <rect x="39" y="12" width="12" height="28" rx="2.5" fill="${ART_C.soft}"/>
    <rect x="9" y="48" width="28" height="12" rx="2.5" fill="${ART_C.deep}"/>
    <rect x="6" y="45" width="28" height="12" rx="2.5" fill="${ART_C.soft}"/>
    <rect x="42" y="48" width="12" height="12" rx="2.5" fill="${ART_C.sunDeep}"/>
    <rect x="39" y="45" width="12" height="12" rx="2.5" fill="${ART_C.sun}"/>`),

  // Trigonometría: triángulo rectángulo dentro de un arco de círculo.
  trig: artSvg(`
    <path d="M54.9 52A46.9 46.9 0 0 0 8 5.1" fill="none" stroke="${ART_C.pale}" stroke-width="2.5" stroke-dasharray="3 4" stroke-linecap="round"/>
    <path d="M11 55h36V25z" fill="${ART_C.deep}"/>
    <path d="M8 52h36V22z" fill="${ART_C.blue}"/>
    <path d="M38 52v-6h6" fill="none" stroke="${ART_C.pale}" stroke-width="2"/>
    <path d="M21 52a13 13 0 0 0-3-8.4" fill="none" stroke="${ART_C.sun}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="44" cy="22" r="5" fill="${ART_C.sun}" stroke="${ART_C.sunDeep}" stroke-width="2"/>`),

  // Cálculo diferencial: curva con su recta tangente en el máximo.
  calc: artSvg(`
    ${ART_GRID}${ART_AXES}
    <path d="M12 47C21 47 23 19 34 19S49 35 58 31" fill="none" stroke="${ART_C.sun}" stroke-width="4" stroke-linecap="round"/>
    <path d="M18 19h33" stroke="${ART_C.blue}" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="34" cy="19" r="5" fill="#fff" stroke="${ART_C.blue}" stroke-width="3"/>`),

  // Geometría vectorial y analítica: un vector desde el origen hasta una elipse, con su componente.
  geo: artSvg(`
    ${ART_AXES}
    <ellipse cx="36" cy="32" rx="20" ry="13" fill="none" stroke="${ART_C.pale}" stroke-width="2.5" stroke-dasharray="3 4" stroke-linecap="round"/>
    <path d="M48.5 24v31" stroke="${ART_C.sun}" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round"/>
    <g transform="translate(3 3)">
      <path d="M9 55L41.7 27.2" stroke="${ART_C.deep}" stroke-width="5" stroke-linecap="round"/>
      <path d="M48.5 21.3L44.9 31L38.4 23.4z" fill="${ART_C.deep}" stroke="${ART_C.deep}" stroke-width="2" stroke-linejoin="round"/>
    </g>
    <path d="M9 55L41.7 27.2" stroke="${ART_C.blue}" stroke-width="5" stroke-linecap="round"/>
    <path d="M48.5 21.3L44.9 31L38.4 23.4z" fill="${ART_C.blue}" stroke="${ART_C.blue}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="48.5" cy="55" r="4" fill="${ART_C.sun}" stroke="${ART_C.sunDeep}" stroke-width="2"/>`),

  // Física mecánica: bloque sobre un plano inclinado.
  fis: artSvg(`
    <path d="M6 59h52V25z" fill="${ART_C.deep}"/>
    <path d="M6 56h52V22z" fill="${ART_C.blue}"/>
    <path d="M12 52L52 26" stroke="${ART_C.pale}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    <g transform="rotate(-33.2 32 39)">
      <rect x="27" y="29" width="15" height="13" rx="2" fill="${ART_C.sunDeep}"/>
      <rect x="25" y="27" width="15" height="12" rx="2" fill="${ART_C.sun}"/>
    </g>
    <path d="M24 22l-12 8" stroke="${ART_C.soft}" stroke-width="3" stroke-linecap="round"/>
    <path d="M11 25.5l1 4.5 4.5-.5" fill="none" stroke="${ART_C.soft}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`),

  // Cálculo integral: rectángulos que llenan el área bajo una curva.
  int: artSvg(`
    ${ART_AXES}
    <rect x="16" y="45" width="8" height="10" fill="${ART_C.deep}"/>
    <rect x="14" y="43" width="8" height="12" fill="${ART_C.soft}"/>
    <rect x="26" y="37" width="8" height="18" fill="${ART_C.deep}"/>
    <rect x="24" y="35" width="8" height="20" fill="${ART_C.blue}"/>
    <rect x="36" y="27" width="8" height="28" fill="${ART_C.deep}"/>
    <rect x="34" y="25" width="8" height="30" fill="${ART_C.soft}"/>
    <rect x="46" y="15" width="8" height="40" fill="${ART_C.deep}"/>
    <rect x="44" y="13" width="8" height="42" fill="${ART_C.blue}"/>
    <path d="M11 46C25 42 38 30 58 8" fill="none" stroke="${ART_C.sun}" stroke-width="4" stroke-linecap="round"/>`),

  // Preuniversitario UdeA: el birrete sobre un libro abierto.
  preuda: artSvg(`
    <path d="M32 61C24 56 14 55 5 57V43c9-2 19-1 27 4z" fill="${ART_C.deep}"/>
    <path d="M32 61c8-5 18-6 27-4V43c-9-2-19-1-27 4z" fill="${ART_C.blue}"/>
    <path d="M10 49.5c5-.6 10 0 15 2M54 49.5c-5-.6-10 0-15 2" fill="none" stroke="${ART_C.pale}" stroke-width="2" stroke-linecap="round"/>
    <path d="M15 22v13c0 5 7.6 8.5 17 8.5S49 40 49 35V22z" fill="${ART_C.deep}"/>
    <path d="M32 43.5c9.4 0 17-3.5 17-8.5V22H32z" fill="${ART_C.blue}"/>
    <path d="M32 6L61 18.5 32 31 3 18.5z" fill="${ART_C.deep}" stroke="${ART_C.deep}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M32 3L61 15.5 32 28 3 15.5z" fill="${ART_C.soft}" stroke="${ART_C.soft}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M32 3L61 15.5 32 28z" fill="${ART_C.blue}" opacity=".35"/>
    <path d="M32 15.5L56 19v17" fill="none" stroke="${ART_C.sunDeep}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 34l4 11h-8z" fill="${ART_C.sun}" stroke="${ART_C.sun}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="32" cy="15.5" r="3" fill="${ART_C.sun}"/>`),
  // Álgebra lineal: plano deformado por una matriz y dos vectores.
  lin: artSvg(`
    <path d="M10 50h28l16-28H26z" fill="${ART_C.pale}" fill-opacity=".3" stroke="${ART_C.pale}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M19.3 50l16-28M28.7 50l16-28M18 36h28" stroke="${ART_C.pale}" stroke-width="1.5" opacity=".8"/>
    <path d="M10 50l24.9-29.8" stroke="${ART_C.blue}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M40 14l-1.3 9.4-7.6-6.5z" fill="${ART_C.blue}" stroke="${ART_C.blue}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M10 50l38.2-8.3" stroke="${ART_C.sun}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M56 40l-6.8 6.6-2.1-9.8z" fill="${ART_C.sun}" stroke="${ART_C.sun}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="10" cy="50" r="4" fill="${ART_C.deep}"/>`),
  // Geometría Euclidiana: un triángulo inscrito en su circunferencia y el compás que la traza.
  euc: artSvg(`
    <circle cx="30" cy="35" r="23" fill="none" stroke="${ART_C.pale}" stroke-width="2.5" stroke-dasharray="3 4" stroke-linecap="round"/>
    <path d="M13 53.5L50 49.5L27.5 15z" fill="${ART_C.deep}" transform="translate(3 3)"/>
    <path d="M13 53.5L50 49.5L27.5 15z" fill="${ART_C.blue}" stroke="${ART_C.soft}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M27.5 15L30 35" stroke="${ART_C.pale}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M30 35L52 9" stroke="${ART_C.sun}" stroke-width="4" stroke-linecap="round"/>
    <path d="M52 9L57 41" stroke="${ART_C.sun}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="52" cy="9" r="4.5" fill="${ART_C.sun}" stroke="${ART_C.sunDeep}" stroke-width="2"/>
    <circle cx="30" cy="35" r="3" fill="${ART_C.pale}"/>`),

  // Preicfes Saber 11: la hoja de respuestas, con una burbuja rellena por fila, y un lápiz.
  preicfes: artSvg(`
    <rect x="12" y="9" width="38" height="50" rx="4" fill="${ART_C.deep}"/>
    <rect x="9" y="6" width="38" height="50" rx="4" fill="${ART_C.blue}"/>
    <path d="M15 14h18" stroke="${ART_C.pale}" stroke-width="3" stroke-linecap="round"/>
    ${[24, 33, 42].map((y, r) => [0, 1, 2, 3].map(k => k === [1, 3, 0][r]
      ? `<circle cx="${17 + k * 8}" cy="${y}" r="3" fill="${ART_C.sun}"/>`
      : `<circle cx="${17 + k * 8}" cy="${y}" r="2.6" fill="none" stroke="${ART_C.pale}" stroke-width="1.5"/>`).join('')).join('')}
    <path d="M44 52l12-30 5 2-12 30-6 3z" fill="${ART_C.sun}" stroke="${ART_C.sunDeep}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M56 22l1.6-4 5 2-1.6 4z" fill="${ART_C.soft}"/>`),
};
const COURSE_ART = Object.fromEntries(Object.entries(COURSE_ART_BASE).map(([id, svg]) => [id, artTint(svg, ART_PAL[id])]));

const courseArt = (c, size = '') => `<span class="cart ${size}" aria-hidden="true">${COURSE_ART[c.id] || ''}</span>`;

// Figuras de los componentes de un curso (c.blocks), con la paleta del curso. Clave: curso/componente. El que no
// tiene figura muestra su número (renderComponents en js/app.js).
const ART_CUBE = (x, y, up = ART_C.soft, left = ART_C.blue, right = ART_C.deep) => `<path d="M${x} ${y}l13 6.5-13 6.5-13-6.5z" fill="${up}"/>
    <path d="M${x - 13} ${y + 6.5}l13 6.5v14l-13-6.5z" fill="${left}"/><path d="M${x + 13} ${y + 6.5}l-13 6.5v14l13-6.5z" fill="${right}"/>
    <path d="M${x} ${y}l13 6.5v14L${x} ${y + 27}l-13-6.5v-14zM${x - 13} ${y + 6.5}l13 6.5 13-6.5M${x} ${y + 13}v14" fill="none" stroke="${ART_C.deep}" stroke-width="1" stroke-linejoin="round"/>`;
const BLOCK_ART_BASE = {
  // Razonamiento lógico: un cubo de bloques al que le llega la pieza que falta.
  'preuda/razonamiento': artSvg(`
    ${[[32, 22], [19, 28.5], [45, 28.5], [32, 35], [32, 8], [19, 14.5], [45, 14.5]].map(([x, y]) => ART_CUBE(x, y)).join('')}
    ${ART_CUBE(32, 17, ART_C.pale, ART_C.sun, ART_C.sunDeep)}`),
  // Comprensión lectora: un texto con una frase subrayada bajo la lupa.
  'preuda/lectura': artSvg(`
    <path d="M32 57C24 52 14 51 5 53V13c9-2 19-1 27 4z" fill="${ART_C.deep}"/>
    <path d="M32 57c8-5 18-6 27-4V13c-9-2-19-1-27 4z" fill="${ART_C.blue}"/>
    <path d="M32 17v40" stroke="${ART_C.soft}" stroke-width="2"/>
    <path d="M10 21.5c6-.8 11 0 16 2M10 37.5c6-.8 11 0 16 2M10 45.5c5-.6 8-.2 11 .8M38 23.5c5-2 10-2.8 16-2" fill="none" stroke="${ART_C.pale}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M10 29.5c6-.8 11 0 16 2" fill="none" stroke="${ART_C.sun}" stroke-width="4" stroke-linecap="round"/>
    <path d="M49.5 46.5l9 10" stroke="${ART_C.sunDeep}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="43" cy="38" r="11" fill="${ART_C.deep}" stroke="${ART_C.sun}" stroke-width="4"/>
    <path d="M38 35.5h10M38 41h6" stroke="${ART_C.pale}" stroke-width="2.5" stroke-linecap="round"/>`),
};
const BLOCK_ART = Object.fromEntries(Object.entries(BLOCK_ART_BASE).map(([k, svg]) => [k, artTint(svg, ART_PAL[k.split('/')[0]])]));
const blockArt = (c, b) => (BLOCK_ART[`${c.id}/${b.id}`] ? `<span class="cart lg" aria-hidden="true">${BLOCK_ART[`${c.id}/${b.id}`]}</span>` : '');
