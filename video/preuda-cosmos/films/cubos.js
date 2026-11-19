// «Vistas y cubos» · escenas de la lección pu-es-2. Motor en kit.js, preu.js y piezas.js; guion en cubos.data.js.
// Cubitos con tres caras pintadas en rosa, con dos en ámbar, con una en cian, sin pintar en gris; las vistas en violeta, el
// resultado en verde y lo que se hace ahora en lima.
const C3 = C.mag, C2 = C.amber, C1 = C.cyan, C0 = '#7f8ab0', VIEW = C.violet, RES = C.green, NOW = C.lime;
// Proyección isométrica: (x, y, z) en unidades → pantalla, con origen O y u px por unidad.
const iso = (O, u) => (x, y, z) => [O[0] + (x - y) * u * .866, O[1] + (x + y) * u * .5 - z * u];
// Cubito unitario en (x, y, z), color col; o.a opacidad de las caras.
function unit(P, x, y, z, col, o = {}) {
  const f = (pts, a) => { X.save(); X.beginPath(); pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); if (!o.glass) { X.fillStyle = '#0a0e22'; X.fill(); } X.fillStyle = hexA(col, a); X.fill(); X.restore(); stroke('rgba(225,232,255,.55)', 1.2, () => { pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); }, { g: 0 }); };
  const a = o.a ?? 1;
  f([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], .55 * a);
  f([P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], .38 * a);
  f([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], .26 * a);
}
// Varios cubitos en orden de atrás hacia adelante: lista de [x, y, z, color].
function build(P, cubes, o) { [...cubes].sort((a, b) => a[0] + a[1] - b[0] - b[1] || a[2] - b[2]).forEach(c => unit(P, c[0], c[1], c[2], c[3], o)); }
// Categoría de un cubito del cubo de lado n: cuántas caras quedan afuera.
const cat = (n, x, y, z, m = [n, n, n]) => [x, y, z].filter((v, i) => v === 0 || v === m[i] - 1).length;
const catCol = k => [C0, C1, C2, C3][k];
function painted(P, n, filter = () => true, m = [n, n, n]) { const cs = []; for (let x = 0; x < m[0]; x++) for (let y = 0; y < m[1]; y++) for (let z = 0; z < m[2]; z++) { const k = cat(n, x, y, z, m); if (k && filter(k)) cs.push([x, y, z, catCol(k)]); else if (k) cs.push([x, y, z, C0]); } build(P, cs, {}); }
const HT = [[2, 1, 2], [3, 1, 2], [1, 1, 1]];   // máximo: filas de lado (2, 3, 1) × columnas de frente (3, 1, 2)
const S = {
  // 1 · El reto: el cubo de 4 pintado.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Un cubo de madera de 6 cm de arista se pinta de rojo por', 'todas sus caras y luego se corta en cubitos de 1 cm de', 'arista. La cantidad de cubitos que quedan con exactamente', 'dos caras pintadas es:'], opts: ['48', '24', '96', '64'], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      const P = iso([CX, 1180], 46);
      const cs = []; for (let x = 0; x < 6; x++) for (let y = 0; y < 6; y++) for (let z = 0; z < 6; z++) if (cat(6, x, y, z)) cs.push([x, y, z, t < 12 ? '#ff5a6a' : C0]);
      build(P, cs);
      if (t >= 12) stroke('rgba(225,232,255,.3)', 1, () => {}, { g: 0 });
      fade(A(t, 12, .5), () => mono('216 cubitos', CX + 330, 1400, C.ink, { s: 26 }));
    });
  },
  // 2 · Contar por capas: la pirámide.
  capas(t) {
    stars(t, .3);
    const P = iso([CX, 640], 90), cs = [];
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) cs.push([x, y, 0, C1]);
    if (t > 2) for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) cs.push([x + .5, y + .5, 1, C2]);
    if (t > 3) cs.push([1, 1, 2, C3]);
    build(P, cs);
    fade(A(t, 9.2, .5), () => F([['3 · 3 + 2 · 2 + 1 · 1 = ', 'r'], ['9', 'r', C1], [' + ', 'r'], ['4', 'r', C2], [' + ', 'r'], ['1', 'r', C3]], CX, 1180, 46));
    fade(A(t, 18.2, .5), () => F([['= ', 'r'], ['14', 'r', RES], [' cubos', 'r']], CX, 1270, 56));
  },
  // 3 · Los cubos que no se ven: contar columnas.
  ocultos(t) {
    stars(t, .3);
    const P = iso([CX - 40, 640], 90), h = [[2, 1], [3, 2]], cs = [];
    h.forEach((row, y) => row.forEach((n, x) => { for (let z = 0; z < n; z++) cs.push([x, y, z, z === n - 1 ? C1 : C0]); }));
    build(P, cs, { a: t > 9.4 ? .7 : 1, glass: t > 9.4 });
    fade(A(t, 1.6, .5), () => mono('un cubo arriba → otro debajo', CX, 1100, NOW, { s: 26 }));
    fade(A(t, 18.2, .5), () => { const G = gridT(380, 1150, 110, 90, ['', ''], ['', ''], (i, j) => [String(h[i][j]), RES], { hw: 0, hh: 0, cs: 44 }); F([['2 + 1 + 3 + 2 = ', 'r'], ['8', 'r', RES]], CX, 1420, 46); });
  },
  // 4 · Tres vistas.
  vistas(t) {
    stars(t, .3);
    const h = [[2, 1], [3, 2]], P = iso([CX, 520], 80), cs = [];
    h.forEach((row, y) => row.forEach((n, x) => { for (let z = 0; z < n; z++) cs.push([x, y, z, C1]); }));
    build(P, cs);
    fade(A(t, 9.6, .5), () => {
      const panel = (x0, cols, lab) => { cols.forEach((n, i) => { for (let z = 0; z < n; z++) { X.save(); X.fillStyle = hexA(VIEW, .4); X.fillRect(x0 + i * 60, 1180 - (z + 1) * 60, 56, 56); X.restore(); } }); mono(lab, x0 + cols.length * 30, 1220, VIEW, { s: 22 }); };
      panel(180, [3, 2], 'de frente'); panel(480, [2, 3], 'de lado');
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { X.save(); X.fillStyle = hexA(VIEW, .4); X.fillRect(780 + i * 60, 1060 + j * 60, 56, 56); X.restore(); } mono('desde arriba', 840, 1220, VIEW, { s: 22 });
    });
    fade(A(t, 20, .5), () => mono('cada vista: la columna más alta de su fila', CX, 1300, NOW, { s: 26 }));
  },
  // 5 · Problema: el máximo de cubitos.
  maximo(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Sobre una base cuadriculada de 3 × 3 se apilan cubitos y', 'ninguna casilla queda vacía. Vistas de frente, las columnas', 'más altas miden 3, 1 y 2; vistas de lado, 2, 3 y 1. La', 'mayor cantidad de cubitos que puede haber es:'], opts: ['14', '12', '9', '18'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const front = [3, 1, 2], side = [2, 3, 1];
      const G = gridT(330, 900, 130, 110, side.map(String), front.map(String), (i, j) => (t > 11 + (i * 3 + j) * .5 ? [String(Math.min(front[j], side[i])), i === 1 ? NOW : C1] : null), { hw: 90, hh: 60, hs: 32, hc: VIEW, rs: 32, rc: VIEW, rk: 'r', cs: 44 });
      mono('frente →', 330 + 90 + 195, 890, VIEW, { s: 20 }); mono('lado', 300, 1100, VIEW, { s: 20, a: 'r' });
      fade(A(t, 20.4, .5), () => F([['5 + 6 + 3 = ', 'r'], ['14', 'r', RES]], CX, 1360, 54));
    });
  },
  // 6 · Y el mínimo con las mismas vistas.
  minimo(t) {
    stars(t, .3);
    const mins = [[1, 1, 2], [3, 1, 1], [1, 1, 1]];
    gridT(300, 520, 140, 120, ['2', '3', '1'], ['3', '1', '2'], (i, j) => (t > 1 + (i * 3 + j) * .25 ? [String(t > 9.4 ? mins[i][j] : 1), mins[i][j] > 1 && t > 9.4 ? NOW : C1] : null), { hw: 90, hh: 60, hs: 32, hc: VIEW, rs: 32, rc: VIEW, rk: 'r', cs: 48 });
    fade(A(t, 9.4, .5), () => mono('el 3 sirve al frente y al lado · el 2 también', CX, 1010, NOW, { s: 24 }));
    fade(A(t, 18.2, .5), () => { F([['9 + 2 + 1 = ', 'r'], ['12', 'r', RES]], CX, 1110, 52); mono('entre 12 y 14: las vistas no lo fijan', CX, 1180, C.mute, { s: 24 }); });
  },
  // 7 · El cubo de 3 pintado: 8 + 12 + 6 + 1.
  pintado3(t) {
    stars(t, .3);
    const P = iso([CX, 640], 110), k = t < 10 ? 4 : t < 13 ? 3 : t < 16 ? 2 : t < 19 ? 1 : 0;
    painted(P, 3, c => c >= k, [3, 3, 2]);
    const rows = [[3, '8 esquinas', C3, 10], [2, '8 aristas', C2, 13], [1, '2 centros', C1, 16], [0, 'ninguno', C0, 19]];
    rows.forEach(([n, s, c, t0], i) => fade(A(t, t0, .4), () => { dot(240 + i * 200, 1180, 14, c, 14); mono(`${n} caras`, 240 + i * 200, 1230, c, { s: 22 }); mono(s, 240 + i * 200, 1270, C.ink, { s: 22 }); }));
    fade(A(t, 20.4, .5), () => F([['8 + 8 + 2 = ', 'r'], ['18', 'r', RES]], CX, 1380, 50));
  },
  // 8 · Para cualquier cubo de lado n.
  formula(t) {
    stars(t, .3);
    const row = (y, t0, col, parts, lab) => fade(A(t, t0, .5), () => { dot(170, y - 14, 14, col, 14); F(parts, 560, y, 48); mono(lab, 560, y + 46, C.mute, { s: 20 }); });
    row(540, 1, C3, [['3 caras: ', 'r'], ['8', 'r', C3]], 'una por vértice');
    row(720, 9.2, C2, [['2 caras: 12 · (', 'r'], ['n', 'i', NOW], [' − 2)', 'r']], 'aristas sin sus esquinas');
    row(900, 18.2, C1, [['1 cara: 6 · (', 'r'], ['n', 'i', NOW], [' − 2)', 'r'], ['2', 'sp']], 'el centro de cada cara');
    row(1080, 20.4, C0, [['0 caras: (', 'r'], ['n', 'i', NOW], [' − 2)', 'r'], ['3', 'sp']], 'el cubo de adentro');
  },
  // 9 · El cubo de 4 resuelto.
  resolver(t) {
    stars(t, .3);
    const P = iso([CX, 660], 54);
    painted(P, 6, c => (t < 10 ? c === 3 || c === 2 : c === 2));
    fade(A(t, 1, .5), () => mono('cada arista: esquina · 4 · esquina', CX, 1150, C2, { s: 26 }));
    fade(A(t, 20.2, .5), () => { F([['12 · 4 = ', 'r'], ['48', 'r', RES]], CX, 1250, 56); F([['8 + 48 + 96 + 64 = 216', 'r']], CX, 1330, 40); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['48', '24', '96', '64'], 0, [['12 aristas · 4 = ', 'r'], ['48', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['9 + 4 + 1', 'r']], 'por capas'], [[['la más alta', 'r']], 'cada vista'], [[['12 · (n − 2)', 'r']], 'dos caras pintadas'], [[['8 + 8 + 2', 'r']], 'el ladrillo de 3 × 3 × 2']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [C1, NOW, C2]);
    });
  },
};
