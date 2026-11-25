// Explora · piezas de dibujo para las lecciones de Álgebra y Trigonometría (spec 2026-11-25-explora-algebra-trigonometria). Va
// después de explora-escenas.js. Todo son funciones puras que devuelven SVG con las piezas de XPK (K).
const XM = {
  // Recta numérica de a a b en la altura y: { X(valor) → píxel, s: dibujo }. o = { p: cada cuánto hay marca, n: 0 sin números, f: rótulo }
  linea(K, a, b, y = 100, o = {}) {
    const X = x => 24 + (x - a) / (b - a) * 292; let s = K.ar(12, y, 330, y);
    for (let x = a; x <= b + 1e-9; x += o.p || 1) s += K.l(X(x), y - 5, X(x), y + 5) + (o.n === 0 ? '' : K.t(X(x), y + 22, o.f ? o.f(x) : K.sig(x), 's tm'));
    return { X, s };
  },
  // Plano cartesiano: { X, Y, s }. o = { H alto, g paso de la cuadrícula, ex, ey rótulos de los ejes, num: cada cuánto números }
  plano(K, a, b, c, d, o = {}) {
    const H = o.H || 210, X = x => 18 + (x - a) / (b - a) * 304, Y = y => 8 + (d - y) / (d - c) * (H - 16), g = o.g || 1; let s = '';
    for (let x = Math.ceil(a / g) * g; x <= b; x += g) s += K.l(X(x), 8, X(x), H - 8, 'ls');
    for (let y = Math.ceil(c / (o.gy || g)) * (o.gy || g); y <= d; y += o.gy || g) s += K.l(18, Y(y), 322, Y(y), 'ls');
    if (c <= 0 && d >= 0) s += K.l(18, Y(0), 322, Y(0), 'lm'); if (a <= 0 && b >= 0) s += K.l(X(0), 8, X(0), H - 8, 'lm');
    return { X, Y, s, a, b, c, d };
  },
  curva(K, P, f, cls = 'la gr', u = P.a, w = P.b, n = 120) {
    let out = '', q = []; const cierra = () => { if (q.length > 1) out += K.pl(q, cls); q = []; };
    for (let i = 0; i <= n; i++) { const x = u + (w - u) * i / n, y = f(x); if (Number.isFinite(y) && y >= P.c && y <= P.d) q.push([P.X(x), P.Y(y)]); else cierra(); }
    cierra(); return out;
  },
  // Barra partida: segs = [[ancho, rótulo, clase]], anchos en partes de W.
  barra(K, y, segs, o = {}) {
    const x0 = o.x ?? 20, W = o.W || 300, h = o.h || 34, T = o.T || segs.reduce((a, s) => a + s[0], 0); let x = x0, s = '';
    for (const [w, t, c] of segs) { const p = w / T * W; s += K.r(x, y, p, h, c || 'fa') + (t !== '' && t != null && p > 10 ? K.t(x + p / 2, y + h / 2 + 5, t, 's') : ''); x += p; }
    return s;
  },
  // Renglones que van saliendo: se ven los primeros v.n.
  pasos: (K, v, l, y = 40, d = 36, cls = 'b') => l.map((t, i) => K.f(v.n - i, K.t(170, y + i * d, t, cls))).join(''),
  bolas: (K, x, y, n, cls = 'fa', u = 26, r = 10) => Array.from({ length: Math.round(n) }, (_, i) => K.c(x + i * u, y, r, cls)).join(''),
  // Rejilla de a × b cuadros de lado u.
  reja(K, x, y, a, b, u, cls = 'fa') { let s = ''; for (let i = 0; i < Math.round(a); i++) for (let j = 0; j < Math.round(b); j++) s += K.r(x + i * u, y + j * u, u - 2, u - 2, cls); return s; },
  // Rueda de radio r con el radio a g grados y sus proyecciones.
  rueda(K, x, y, r, g, o = {}) {
    const [px, py] = K.at(x, y, r, g);
    return K.l(x - r - 14, y, x + r + 14, y, 'lm') + K.l(x, y - r - 14, x, y + r + 14, 'lm') + K.arc(x, y, r, 0, 360, 'lm') + (o.arco === 0 ? '' : K.sec(x, y, 22, 0, g, 'fa'))
      + (o.cs === 0 ? '' : K.l(x, y, px, y, 'lg gr') + K.l(px, y, px, py, 'lf gr')) + K.l(x, y, px, py, 'la gr') + K.c(px, py, 5, 'fA');
  },
};
// Práctica de fichas en fila: rótulos de los casilleros, fichas buenas (en orden) y fichas que sobran.
const xpFila = (texto, et, ok, sobra, pista, idea, o = {}) => {
  const n = et.length, y = o.y || 58, W = Math.min(104, 340 / n - 12);
  return xpHaz('fichas', texto, { slots: et.map((e, i) => ({ x: 340 * (i + 0.5) / n, y, w: W, et: e })), fichas: [...ok, ...sobra].sort((a, b) => (a < b ? 1 : -1)), meta: ok, alto: y + 48, pista, ...(o.fondo ? { fondo: o.fondo } : {}) }, idea);
};
// Práctica de dibujo que se mueve.
const xpMueve = (texto, alto, v, manijas, metas, dib, idea, o = {}) => xpHaz('dibujo', texto, { alto, v, manijas, ...(typeof metas === 'function' ? { cumple: metas } : { metas }), dib, ...o }, idea);
const xpRegla = (k, min, max, et, paso = 1) => ({ k, min, max, paso, et });
