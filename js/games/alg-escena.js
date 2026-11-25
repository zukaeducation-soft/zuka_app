// Escenas de Álgebra para los retos del gimnasio (spec 2026-11-25-explora-algebra-trigonometria): una de fichas y una que se mueve
// por mundo. Va después de trig-escena.js (XG.mueve) y de conteo-escena.js (XG.cuenta). Se dibujan con XM (explora-mate.js).
(() => {
  const C = XG.cuenta, M = XG.mueve, N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const cap = (K, p, y = 26) => (p.cap ? K.t(170, y, p.cap, 'b ta') : '');
  // 1 · Conjuntos
  C('fichas-venn', 150, (K, p) => K.r(16, 6, 308, 138, 'fc', 10) + K.c(132, 76, 56, 'fa') + K.c(208, 76, 56, 'fg') + K.t(66, 30, p.na || 'A', 'ta') + K.t(274, 30, p.nb || 'B', 'tg') + (p.z || []).map((t, i) => K.t([104, 170, 236, 40][i], i < 3 ? 82 : 134, t, 'b')).join(''));
  M('solapa-conjuntos', 150, (v, K, p, f) => { const u = 280 / (p.a + p.b); return K.r(30, 40, p.a * u, 34, 'fa') + K.t(38, 62, `A: ${p.a}`, 's', 'start') + K.r(30 + (p.a - v.i) * u, 82, p.b * u, 34, 'fg') + K.t(38 + (p.a - v.i) * u, 104, `B: ${p.b}`, 's', 'start') + K.f(f, K.t(170, 142, `unión: ${p.a + p.b - v.i}`, 'b ta')); }, v => `$n(A \\cap B) = ${v.i}$`);
  // 2 · Recta real
  C('fichas-recta', 110, (K, p) => { const L = XM.linea(K, p.lim?.[0] ?? -8, p.lim?.[1] ?? 8, 62, { p: p.paso || 2 }); return cap(K, p) + L.s + (p.pts || []).map(x => K.c(L.X(x), 62, 6, 'fA')).join(''); });
  M('tramo-recta', 130, (v, K, p, f) => { const L = XM.linea(K, -10, 10, 80, { p: 2 }); return L.s + K.r(L.X(v.c - v.r), 74, L.X(v.c + v.r) - L.X(v.c - v.r), 12, 'fa') + K.c(L.X(v.c), 80, 5, 'fF') + K.f(f, K.t(170, 36, `de ${N(v.c - v.r)} a ${N(v.c + v.r)}`, 'b ta')); }, v => `$c = ${v.c}, \\ r = ${v.r}$`);
  // 3 · Escalas y proporciones
  C('fichas-barra', 100, (K, p) => cap(K, p) + XM.barra(K, 44, p.segs || [[1, '', 'fa']], { h: 38 }));
  M('barra-factor', 150, (v, K, p, f) => XM.barra(K, 36, [[p.base, `antes ${p.base}`, 'fa']], { T: p.T, h: 34 }) + XM.barra(K, 92, [[v.x, '', 'fg']], { T: p.T, h: 34 }) + K.f(f, K.t(170, 146, `${v.x} ÷ ${p.base} = ${N(v.x / p.base)}`, 's')), v => `$${v.x}$`);
  // 4 · Exponentes y radicales
  C('fichas-torre', 120, (K, p) => cap(K, p) + Array.from({ length: p.n || 4 }, (_, i) => K.r(170 - (p.n || 4) * 17 + i * 34, 50, 30, 30, 'fa', 5) + K.t(185 - (p.n || 4) * 17 + i * 34, 71, p.b || 'x', 's')).join(''));
  M('lado-area', 190, (v, K, p, f) => XM.reja(K, 170 - v.s * 9, 16, v.s, v.s, 18) + K.f(f, K.t(300, 30, `área ${v.s * v.s}`, 's', 'end')), v => `$\\text{lado } ${v.s}$`);
  // 5 · Sucesiones
  C('fichas-escalera', 130, (K, p) => cap(K, p, 18) + (p.xs || []).map((x, i) => { const h = x / Math.max(...p.xs) * 80; return K.r(50 + i * 42, 124 - h, 34, h, 'fa') + K.t(67 + i * 42, 118 - h, x, 's'); }).join(''));
  M('escalera-salto', 170, (v, K, p, f) => Array.from({ length: p.n }, (_, i) => { const x = p.geo ? p.a * v.d ** i : p.a + v.d * i, h = Math.min(130, x * 130 / p.top); return K.r(34 + i * 280 / p.n, 160 - h, 240 / p.n, h, 'fa') + (i === 0 || f ? K.t(34 + i * 280 / p.n + 120 / p.n, 152 - h, N(x), 's') : ''); }).join(''), v => `$${v.d}$`);
  // 6 · Polinomios
  C('fichas-area', 132, (K, p) => cap(K, p, 18) + K.r(90, 30, 90, 60, 'fa') + K.r(184, 30, 60, 60, 'fg') + K.r(90, 94, 90, 34, 'fg') + K.r(184, 94, 60, 34, 'ff') + (p.t || ['', '', '', '']).map((t, i) => K.t([135, 214, 135, 214][i], [66, 66, 116, 116][i], t, 's')).join(''));
  M('rectangulo-barras', 210, (v, K, p, f) => K.r(60, 20, 80, 80, 'fa') + K.t(100, 66, 'x²', 'b') + Array.from({ length: v.p }, (_, i) => K.r(140 + i * 18, 20, 18, 80, 'fg')).join('') + Array.from({ length: v.q }, (_, i) => K.r(60, 100 + i * 18, 80, 18, 'fg')).join('') + XM.reja(K, 140, 100, v.p, v.q, 18, 'ff') + K.f(f, K.t(330, 200, `${v.p + v.q} barras y ${v.p * v.q} unidades`, 's', 'end')), v => `$(x + ${v.p})(x + ${v.q})$`);
  // 7 · Parábolas y complejos
  C('fichas-parabola', 170, (K, p) => { const P = XM.plano(K, -6, 6, -5, 7, { H: 164 }); return P.s + XM.curva(K, P, x => p.f[0] * x * x + p.f[1] * x + p.f[2]); });
  M('vertice-mueve', 200, (v, K, p, f) => { const P = XM.plano(K, -6, 6, -5, 7, { H: 190 }); return P.s + XM.curva(K, P, x => p.a * (x - p.meta.h) ** 2 + p.meta.k, 'lm d') + XM.curva(K, P, x => p.a * (x - v.h) ** 2 + v.k) + K.c(P.X(v.h), P.Y(v.k), 5, 'fF'); }, v => `$(${v.h}, ${v.k})$`);
  // 8 · Raíces de polinomios
  C('fichas-cubica', 170, (K, p) => { const P = XM.plano(K, -4, 4, -12, 12, { H: 164, gy: 4 }); return P.s + XM.curva(K, P, x => (p.k || 1) * (x - p.r[0]) * (x - p.r[1]) * (x - p.r[2])); });
  M('toca-raiz', 200, (v, K, p, f) => { const P = XM.plano(K, -4, 4, -12, 12, { H: 190, gy: 4 }), F = x => p.c.reduce((s, a) => s * x + a, 0); const y = Math.max(-12, Math.min(12, F(v.x))); return P.s + K.l(P.X(v.x), 8, P.X(v.x), 182, 'lm d') + K.f(f, XM.curva(K, P, F) + K.c(P.X(v.x), P.Y(y), 6, 'fF') + K.t(14, 22, `P(${N(v.x)}) = ${N(F(v.x))}`, 'ta', 'start')); }, v => `$x = ${v.x}$`);
  // 9 · Fracciones algebraicas
  C('fichas-fraccion', 90, (K, p) => K.r(20, 10, 300, 70, 'fc', 10) + K.t(170, 52, p.cap || '', 'b'));
  M('cruce-rectas', 200, (v, K, p, f) => { const P = XM.plano(K, -1, 9, -1, 9, { H: 190 }); return P.s + XM.curva(K, P, x => p.m * x + p.b) + XM.curva(K, P, x => p.n * x + p.d, 'lf gr') + K.c(P.X(v.x), P.Y(v.y), 6, 'fG'); }, v => `$(${v.x}, ${v.y})$`);
  // 10 · Crecimiento exponencial
  C('fichas-crece', 130, (K, p) => cap(K, p, 18) + (p.xs || []).map((x, i) => { const h = x / Math.max(...p.xs) * 80; return K.r(50 + i * 42, 124 - h, 34, h, 'fg') + K.t(67 + i * 42, 118 - h, x, 's'); }).join(''));
  M('curva-crece', 200, (v, K, p, f) => { const P = XM.plano(K, -3, 4, -1, 12, { H: 190, gy: 2 }); return P.s + XM.curva(K, P, x => p.meta.a * p.b ** x + (p.meta.k || 0), 'lm d') + XM.curva(K, P, x => v.a * p.b ** x + (v.k || 0)) + (p.meta.k != null ? K.l(18, P.Y(v.k), 322, P.Y(v.k), 'lf d') : ''); }, v => `$a = ${v.a}$`);
})();
