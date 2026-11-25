// Ejercicios de Álgebra con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria). Va después de guia.js y
// antes de alg-practica-*.js, que traen los datos. Cada lección tiene siete: dos que se mueven (M), dos de fichas (F), uno de tocar
// los que cumplen (T), uno de frases ciertas (S) y uno en movimiento (V). AP.leccion(id, tiro, [...]) registra los juegos de la
// lección (id-m1, id-f1…) y reemplaza sus ejercicios. La evaluación del mundo conserva los juegos de la revisión anterior.
const AP = (() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−'), R = Math.round, K0 = () => XPK;
  const SUP = n => String(n).split('').map(c => ({ '-': '⁻', '−': '⁻' })[c] || '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');
  // ------------------------------------------------------------------------------------------------------- escenas
  // cada una: [alto, (v, K, p, f) → SVG]. v: perillas (o los datos, en las de fichas); p: datos; f: 0 al responder, 1 al comprobar.
  const P = (K, p, H, o) => { const [a, b, c, d] = p.ej || [-6, 6, -5, 7]; return XM.plano(K, a, b, c, d, { H, g: 1, gy: p.gy || 1, ...o }); };
  const rayo = (K, p) => (p.cap ? K.t(170, 24, p.cap, 'b ta') : '');
  const ESC = {
    texto: [64, (v, K, p) => K.r(20, 8, 300, 50, 'fc', 10) + K.t(170, 39, p.cap || '', 'b')],
    venn: [156, (v, K, p) => K.r(14, 6, 312, 144, 'fc', 10) + K.c(130, 80, 58, 'fa') + K.c(210, 80, 58, 'fg') + K.t(62, 28, p.A || 'A', 'ta') + K.t(278, 28, p.B || 'B', 'tg') + (p.z || []).map((t, i) => K.t([100, 170, 240, 170][i], [86, 86, 86, 146][i], t, 's')).join('')],
    solape: [140, (v, K, p, f) => { const u = 280 / (p.a + p.b); return K.r(30, 30, p.a * u, 34, 'fa') + K.t(38, 52, `A: ${p.a}`, 's', 'start') + K.r(30 + (p.a - v.i) * u, 72, p.b * u, 34, 'fg') + K.t(38 + (p.a - v.i) * u, 94, `B: ${p.b}`, 's', 'start') + K.f(f, K.t(170, 132, `unión ${p.a + p.b - v.i}`, 'ta')); }],
    partes: [140, (v, K, p, f) => { const n = R(v.n), T = 2 ** n, w = Math.min(38, 300 / Math.min(T, 8)); return K.t(170, 20, `${n} elementos`, 'ta') + K.f(f, Array.from({ length: T }, (_, i) => K.r(170 + (i % 8 - Math.min(T, 8) / 2) * w, 30 + Math.floor(i / 8) * Math.min(13, 104 / Math.ceil(T / 8)), w - 3, Math.min(10, 80 / Math.ceil(T / 8)), 'fa', 3)).join('')); }],
    recta: [110, (v, K, p, f) => { const [a, b] = p.r || [-10, 10], L = XM.linea(K, a, b, 70, { p: p.paso || 2 }); return rayo(K, p) + L.s + (p.pts || []).map((x, i) => K.c(L.X(x), 70, 6, ['fG', 'fF'][i % 2])).join('') + (v.x != null ? (p.de != null ? K.f(f, K.ar(L.X(p.de), 46, L.X(v.x), 46, 'la gr')) : '') + K.c(L.X(v.x), 70, 8, 'fA') : '') + (p.espejo && v.x != null ? K.f(f, K.c(L.X(-v.x), 70, 8, 'fF')) : ''); }],
    tramo: [110, (v, K, p, f) => { const L = XM.linea(K, -10, 10, 70, { p: 2 }); return L.s + K.r(L.X(Math.max(-10, v.c - v.r)), 64, L.X(Math.min(10, v.c + v.r)) - L.X(Math.max(-10, v.c - v.r)), 12, 'fa') + K.c(L.X(v.c), 70, 5, 'fF') + K.f(f, K.t(170, 34, `de ${N(v.c - v.r)} a ${N(v.c + v.r)}`, 'ta')); }],
    fraccion: [120, (v, K, p, f) => { const d = Math.max(1, R(v.d ?? p.d)), n = R(v.n ?? p.n); return Array.from({ length: d }, (_, i) => K.r(20 + i * 300 / d, 30, 300 / d, 40, i < n ? 'fa' : 'fc')).join('') + (p.guia ? XM.barra(K, 82, [[p.guia[0], '', 'fg'], [p.guia[1] - p.guia[0], '', 'fc']], { h: 26 }) : ''); }],
    reja: [150, (v, K, p, f) => { const a = R(v.a ?? p.a), b = R(v.b ?? p.b), u = Math.min(24, 124 / b, 280 / a); return XM.reja(K, 170 - a * u / 2, 10, a, b, u, 'fa') + K.f(f, K.t(170, 148, `${a} · ${b} = ${a * b}`, 's')); }],
    dosreja: [140, (v, K, p, f) => { const a = p.a, b = p.b, c = R(v.c ?? p.c), u = Math.min(22, 280 / (b + c + 1)); return XM.reja(K, 30, 14, b, a, u, 'fa') + XM.reja(K, 30 + (b + (f ? 1 - f : 1) * 0.8) * u, 14, c, a, u, 'fg'); }],
    barra: [96, (v, K, p) => rayo(K, p) + XM.barra(K, 40, p.segs || [[1, '', 'fa']], { h: 40, ...(p.T ? { T: p.T } : {}) })],
    dobleBarra: [130, (v, K, p, f) => XM.barra(K, 20, [[p.base, p.r1 || N(p.base), 'fa']], { T: p.T, h: 36 }) + XM.barra(K, 78, [[v.x, '', 'fg']], { T: p.T, h: 36 }) + K.f(f, K.t(170, 128, p.unir ? p.unir(v) : N(v.x), 's'))],
    bolas: [110, (v, K, p) => XM.bolas(K, 34, 34, v.a ?? p.a, 'fa', Math.min(26, 270 / (p.M || 10)), 9) + XM.bolas(K, 34, 78, v.b ?? p.b, 'fg', Math.min(26, 270 / (p.M || 10)), 9)],
    cien: [160, (v, K, p, f) => { let h = ''; for (let i = 0; i < 100; i++) h += K.r(80 + (i % 10) * 18, 8 + Math.floor(i / 10) * 14, 16, 12, i < R(v.k ?? p.k ?? 0) ? 'fa' : 'fc', 2); return h; }],
    cascada: [150, (v, K, p, f) => { const f1 = v.f1 ?? p.f1, f2 = v.f2 ?? p.f2, xs = [100, 100 * f1, 100 * f1 * f2], u = 120 / Math.max(160, ...xs); return xs.map((x, i) => (i >= (p.ve || 2) && !f ? K.r(50 + i * 92, 140 - 100 * u, 66, 100 * u, 'fn d') + K.t(83 + i * 92, 90, '?', 'b') : K.r(50 + i * 92, 140 - x * u, 66, x * u, ['fa', 'fg', 'ff'][i]) + K.t(83 + i * 92, 132 - x * u, N(x), 's'))).join(''); }],
    torre: [150, (v, K, p, f) => { const b = p.b, e = R(v.e ?? p.e), T = Math.min(256, b ** e), c = T > 128 ? 24 : T > 40 ? 16 : Math.max(1, Math.ceil(Math.sqrt(T))), u = Math.min(22, 300 / c, 110 / Math.ceil(T / c)); return K.t(170, 20, `${b}${SUP(e)}`, 'b ta') + K.f(f, Array.from({ length: T }, (_, i) => K.r(170 - c * u / 2 + (i % c) * u, 32 + Math.floor(i / c) * u, u - 2, u - 2, 'fa', 2)).join('')); }],
    cuadrado: [180, (v, K, p, f) => { const s = R(v.s ?? p.s), u = Math.min(20, 150 / s); return XM.reja(K, 170 - s * u / 2, 10, s, s, u, 'fa') + K.f(f, K.t(330, 24, `área ${s * s}`, 's', 'end')); }],
    factores: [100, (v, K, p) => { const l = p.l || [], u = Math.min(38, 300 / l.length); return rayo(K, p) + l.map((t, i) => K.r(170 - l.length * u / 2 + i * u, 42, u - 4, 34, i < (p.k ?? l.length) ? 'fa' : 'fg', 5) + K.t(168 - l.length * u / 2 + (i + 0.5) * u, 64, t, 's')).join(''); }],
    escalera: [150, (v, K, p, f) => { const n = p.n, xs = Array.from({ length: n }, (_, i) => (p.geo ? (v.a ?? p.a) * (v.d ?? p.d) ** i : (v.a ?? p.a) + (v.d ?? p.d) * i)), top = p.top || Math.max(...xs), w = 290 / n; return xs.map((x, i) => { const h = Math.max(2, Math.min(116, x / top * 112)); return K.r(25 + i * w, 142 - h, w - 6, h, 'fa') + (f || (p.ver || [0]).includes(i) ? K.t(25 + i * w + (w - 6) / 2, 136 - h, N(x), 's') : ''); }).join(''); }],
    cinta: [110, (v, K, p, f) => { let x = 20, w = 300 * (1 - p.r), h = ''; for (let i = 0; i < 7; i++) { h += K.r(x, 34, w, 46, ['fa', 'fg', 'ff', 'fo'][i % 4]); x += w; w *= p.r; } return rayo(K, p) + h + K.r(20, 34, 300, 46, 'fn'); }],
    tiles: [170, (v, K, p) => Array.from({ length: R(v.a ?? p.a ?? 0) }, (_, i) => K.r(20 + i * 56, 8, 50, 50, 'fa') + K.t(45 + i * 56, 38, 'x²', 's')).join('') + Array.from({ length: R(v.b ?? p.b ?? 0) }, (_, i) => K.r(20 + i * 24, 66, 18, 50, 'fg')).join('') + Array.from({ length: R(v.c ?? p.c ?? 0) }, (_, i) => K.r(20 + i * 24, 126, 18, 18, 'ff')).join('')],
    rect: [200, (v, K, p, f) => { const a = R(v.p), b = R(v.q); return K.r(60, 12, 76, 76, 'fa') + K.t(98, 56, 'x²', 'b') + Array.from({ length: a }, (_, i) => K.r(136 + i * 17, 12, 17, 76, 'fg')).join('') + Array.from({ length: b }, (_, i) => K.r(60, 88 + i * 17, 76, 17, 'fg')).join('') + XM.reja(K, 136, 88, a, b, 17, 'ff') + K.f(f, K.t(330, 194, `${a + b} barras, ${a * b} unidades`, 's', 'end')); }],
    area4: [130, (v, K, p) => K.r(80, 12, 100, 62, 'fa') + K.r(184, 12, 66, 62, 'fg') + K.r(80, 78, 100, 40, 'fg') + K.r(184, 78, 66, 40, 'ff') + (p.t || []).map((t, i) => K.t([130, 217, 130, 217][i], [48, 48, 103, 103][i], t, 's')).join('') + (p.lados || []).map((t, i) => K.t([70, 130, 217, 70][i], [48, 10, 10, 103][i], t, 's tm', i % 3 ? 'middle' : 'end')).join('')],
    pascal: [160, (v, K, p) => { let h = ''; for (let i = 0; i < (p.f || 5); i++) { let c = 1; for (let j = 0; j <= i; j++) { h += K.c(170 + (j - i / 2) * 42, 18 + i * 28, 12, 'fa') + K.t(170 + (j - i / 2) * 42, 23 + i * 28, c, 's'); c = c * (i - j) / (j + 1); } } return h; }],
    balanza: [150, (v, K, p) => K.l(40, 110, 300, 110, 'gr') + K.p([[170, 110], [152, 142], [188, 142]], 'fk') + XM.bolas(K, 58, 92, p.x, 'fa', 28, 12) + XM.bolas(K, 58, 66, p.u, 'fg', 18, 7) + XM.bolas(K, 200, 92, p.y, 'fa', 28, 12) + XM.bolas(K, 200, 66, Math.min(6, p.w), 'fg', 18, 7) + XM.bolas(K, 200, 48, Math.max(0, p.w - 6), 'fg', 18, 7)],
    balanzaX: [150, (v, K, p, f) => { const iz = p.x * v.n + p.u, de = p.y * v.n + p.w, g = f * Math.max(-12, Math.min(12, (de - iz))); return K.l(40, 100 - g, 300, 100 + g, 'gr') + K.p([[170, 100], [152, 140], [188, 140]], 'fk') + K.t(90, 84 - g, p.izq, 'ta') + K.t(250, 84 + g, p.der, 'tg') + K.f(f, K.t(90, 60 - g, N(iz), 's') + K.t(250, 60 + g, N(de), 's')); }],
    linea2: [190, (v, K, p, f) => { const q = P(K, p, 186); return q.s + XM.curva(K, q, x => (v.m ?? p.m) * x + (v.b ?? p.b)) + (p.o ? XM.curva(K, q, x => p.o[0] * x + p.o[1], 'lf gr') : ''); }],
    cruce: [190, (v, K, p, f) => { const q = P(K, { ej: [-1, 9, -1, 9], ...p }, 186); return q.s + p.l.map(([m, b], i) => XM.curva(K, q, x => m * x + b, i ? 'lf gr' : 'la gr')).join('') + K.c(q.X(v.x), q.Y(v.y), 6, 'fG'); }],
    parab: [190, (v, K, p, f) => { const q = P(K, p, 186), o = { a: 1, h: 0, k: 0, ...p.b0, ...v }; return q.s + (p.sombra ? XM.curva(K, q, x => p.sombra[0] * (x - p.sombra[1]) ** 2 + p.sombra[2], 'lm d') : '') + XM.curva(K, q, x => o.a * (x - o.h) ** 2 + o.k) + K.c(q.X(o.h), q.Y(Math.max(q.c, Math.min(q.d, o.k))), 5, 'fF'); }],
    raices: [190, (v, K, p, f) => { const q = P(K, { ej: [-6, 6, -8, 8], gy: 2, ...p }, 186), k = p.k || 1; return q.s + XM.curva(K, q, x => k * (x - v.r) * (x - v.s)) + K.c(q.X(v.r), q.Y(0), 6, 'fA') + K.c(q.X(v.s), q.Y(0), 6, 'fA'); }],
    curva: [170, (v, K, p) => { const q = P(K, p, 166); return q.s + XM.curva(K, q, x => p.fx(x)) + (p.pts || []).map(([x, y]) => K.c(q.X(x), q.Y(y), 5, 'fG')).join('') + (p.as != null ? K.l(q.X(p.as), 8, q.X(p.as), 158, 'lf d') : ''); }],
    sonda: [190, (v, K, p, f) => { const q = P(K, p, 186); const y = Math.max(q.c, Math.min(q.d, p.fx(v.x))); return q.s + K.l(q.X(v.x), 8, q.X(v.x), 178, 'lm d') + K.f(f, XM.curva(K, q, p.fx) + K.c(q.X(v.x), q.Y(y), 6, 'fF')); }],
    corta: [190, (v, K, p, f) => { const q = P(K, p, 186); return q.s + XM.curva(K, q, p.fx) + XM.curva(K, q, x => p.m * x + v.b, 'lf gr'); }],
    complejo: [200, (v, K, p, f) => { const q = XM.plano(K, -8.7, 8.7, -5, 5, { H: 190 }); return q.s + (p.z ? K.ar(q.X(0), q.Y(0), q.X(p.z[0]), q.Y(p.z[1]), 'lg gr') : '') + K.ar(q.X(0), q.Y(0), q.X(v.x), q.Y(v.y), 'la gr') + K.f(f, K.c(q.X(v.x), q.Y(v.y), 6, 'fA')); }],
    rio: [190, (v, K, p, f) => { const q = P(K, { ej: [-6, 6, -6, 6], gy: 2, ...p }, 186); return q.s + K.l(q.X(v.q), 8, q.X(v.q), 178, 'lf d') + K.f(f, XM.curva(K, q, x => (Math.abs(x - v.q) < 0.07 ? NaN : 2 / (x - v.q)))); }],
    expo: [190, (v, K, p, f) => { const q = P(K, { ej: [-4, 4, -2, 12], gy: 2, ...p }, 186), o = { a: 1, k: 0, ...p.b0, ...v }; return q.s + (p.sombra ? XM.curva(K, q, x => p.sombra[0] * p.base ** x + p.sombra[1], 'lm d') : '') + XM.curva(K, q, x => o.a * (v.base ?? p.base) ** x + o.k) + K.l(18, q.Y(o.k), 322, q.Y(o.k), 'lf d'); }],
    logv: [190, (v, K, p, f) => { const q = XM.plano(K, -1, 17, -3, 5, { H: 186, g: 2, gy: 1 }), L = x => (x > 0.02 ? Math.log(x) / Math.log(p.base) : NaN); return q.s + K.f(f, XM.curva(K, q, L)) + K.l(q.X(p.x), 8, q.X(p.x), 178, 'lm d') + K.c(q.X(p.x), q.Y(v.y), 6, 'fF'); }],
    cubica: [170, (v, K, p) => { const q = P(K, { ej: [-5, 5, -12, 12], gy: 4, ...p }, 166); return q.s + XM.curva(K, q, p.fx); }],
    ahorro: [150, (v, K, p, f) => Array.from({ length: 5 }, (_, i) => { const s = p.C * (1 + p.i * i), c = p.C * (1 + p.i) ** i, u = 110 / (p.C * (1 + p.i) ** 4); return K.r(30 + i * 60, 142 - s * u, 22, s * u, 'fa') + K.r(54 + i * 60, 142 - c * u, 22, c * u, 'fg'); }).join('')],
  };
  const esc = p => ESC[p.esc] || ESC.texto;

  // --------------------------------------------------------------------------------------------------------- juegos
  const man = p => p.ks.map(([k, min, max, et, paso]) => ({ k, min, max, et, paso: paso || 1 }));
  const mueve = name => XG.figura(name, {
    ini: p => ({ ...p.v }), manijas: man, sol: p => ({ ...p.v, ...p.meta }),
    ok: (v, p) => (p.vale ? !!p.vale(v) : Object.entries(p.meta).every(([k, x]) => Math.abs(v[k] - x) < 1e-6)),
    texto: p => p.ks.filter(([k]) => p.meta[k] != null).map(([k, , , et]) => `${et}: ${N(p.meta[k])}`).join('; '), alto: p => esc(p)[0] + 44 * p.ks.length + 6, ms: 1100, pie: 'Mueve la perilla. Al comprobar la escena responde.',
    dib: (v, K, p, f) => esc(p)[1](v, K, p, f || 0), aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
  });
  const X = (p, i) => 170 + (i - (p.et.length - 1) / 2) * (324 / p.et.length);
  const cuenta = name => XG.rotula(name, {
    slots: p => p.et.map((_, i) => ({ x: R(X(p, i)), y: esc(p)[0] + 24, w: R(Math.min(96, 324 / p.et.length - 14)), h: 38 })), fichas: p => p.fichas, metas: p => p.metas, alto: p => esc(p)[0] + 66,
    texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '),
    fondo: (K, p, f) => esc(p)[1](p, K, p, f || 0) + p.et.map((t, i) => K.t(X(p, i), esc(p)[0] + 60, t, 's tm')).join(''),
    aviso: (q, p) => p.mira, bien: p => p.ok,
  });
  const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i][1]);
  const dice = (on, p) => { const s = si(p); return on.some((x, i) => x && !s.includes(i)) ? 'Alguna de las marcadas no cumple. ' + p.mira : 'Falta alguna por marcar. ' + p.mira; };
  const toca = name => XG.marca(name, {
    sitios: p => p.casos.map((_, i) => ({ x: 92 + (i % 2) * 156, y: 30 + Math.floor(i / 2) * 54, w: 146, h: 44 })), cara: (K, p, i) => K.t(92 + (i % 2) * 156, 35 + Math.floor(i / 2) * 54, p.casos[i][0], p.casos[i][0].length > 13 ? 's' : ''), alto: p => Math.ceil(p.casos.length / 2) * 54 + 8,
    sol: si, aviso: dice, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i][0]).join('; '), pie: 'Toca todas las que cumplen.',
  });
  const frases = name => XG.marca(name, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 26 + i * 46, w: 324, h: 40 })), cara: (K, p, i) => K.t(170, 31 + i * 46, p.casos[i][0], 's'), alto: p => p.casos.length * 46 + 8,
    sol: si, aviso: dice, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i][0]).join('; '), pie: 'Toca todas las que cumplen.',
  });
  // En movimiento: se fija un valor y la escena lo lanza; con el valor justo llega a la meta.
  // Si el recorrido es muy largo, cada tiro lleva una ventana de 30 pasos que contiene su respuesta (sin quedar siempre en la mitad).
  const VAL = (t, k, p) => t.a + (k - 1) * p.paso;
  const TIRO = {
    globo: (K, q) => K.l(40, 30, 300, 30, 'lg d') + K.t(306, 34, 'meta', 's tm', 'start') + K.c(170, 130 - 100 * q + 4, 18, 'fa') + K.l(170, 152 - 100 * q, 170, 164 - 100 * q, 'lm'),
    rana: (K, q) => { const L = XM.linea(K, 0, 10, 130, { n: 0 }); return L.s + K.l(L.X(8), 96, L.X(8), 130, 'lg gr') + K.p([[L.X(8), 96], [L.X(8) + 22, 103], [L.X(8), 110]], 'fg') + K.c(L.X(8 * q), 116 - 50 * Math.abs(Math.sin(q * Math.PI * 3)), 10, 'fA'); },
    tanque: (K, q) => K.r(110, 20, 120, 120, 'fc') + K.r(110, 140 - 84 * q, 120, 84 * q, 'fa') + K.l(100, 56, 240, 56, 'lg d gr'),
    puente: (K, q) => K.r(10, 100, 60, 46, 'fc') + K.r(258, 100, 70, 46, 'fc') + K.r(70, 92, 188 * q, 9, 'fa') + K.c(70 + 188 * Math.min(q, 1) * 0.98, 80, 9, 'fA'),
    tren: (K, q) => K.l(14, 130, 326, 130, 'lm') + K.l(266, 96, 266, 130, 'lg gr') + [0, 1, 2].map(i => K.r(20 + 188 * q - i * 4 + i * 22 - 20 + 20, 108, 18, 18, ['fa', 'fa', 'fA'][i])).join(''),
    cohete: (K, q) => K.c(290, 34, 16, 'fg') + (([x, y]) => K.p([[x, y - 12], [x - 8, y + 10], [x + 8, y + 10]], 'fA'))([50 + 240 * q, 130 - 96 * q]),
    bola: (K, q) => K.pl([[20, 40], [120, 120], [320, 120]], 'lm') + K.c(250, 124, 14, 'fk') + (q < 0.34 ? K.c(20 + 100 * q / 0.34, 30 + 80 * q / 0.34, 10, 'fA') : K.c(120 + 130 * (q - 0.34) / 0.66, 110, 10, 'fA')),
    arco: (K, q) => K.l(14, 140, 326, 140, 'lm') + K.l(240, 112, 290, 112, 'lg gr') + K.c(40 + 225 * q, 140 - 400 * q * (1.07 - q) - 4, 9, 'fA'),
    bote: (K, q) => K.r(10, 60, 320, 70, 'fa') + K.l(270, 50, 270, 140, 'lg gr') + (x => K.p([[x - 22, 92], [x + 22, 92], [x + 12, 108], [x - 12, 108]], 'fA'))(40 + 230 * q),
    planta: (K, q) => K.l(40, 140, 300, 140, 'lm') + K.l(170, 140, 170, 140 - 90 * q, 'lo gr') + [0.3, 0.55, 0.8].filter(t => t < q + 0.01).map((t, i) => K.c(170 + (i % 2 ? -14 : 14), 140 - 90 * t, 8, 'fo')).join('') + K.l(100, 50, 240, 50, 'lg d'),
  };
  const vuela = (name, tipo) => XG.tiros(name, {
    perilla: (t, p) => ({ et: 'Tu valor', min: 0, max: R((t.b - t.a) / p.paso) + 1, cara: k => (k ? N(VAL(t, k, p)) : '·'), lee: k => N(VAL(t, k, p)) }), meta: (t, p) => R((t.r - t.a) / p.paso) + 1, alto: 160, ms: 1600,
    dib(t, k, K, p, f) { const m = R((t.r - t.a) / p.paso) + 1, q = k == null ? 0 : (k === m ? 1 : k < m ? 0.66 : 1.24) * f; return TIRO[tipo](K, q); },
    falla: (t, k, p) => (VAL(t, k, p) < t.r ? 'Se quedó corto. ' : 'Se pasó. ') + (t.e || p.mira), cuenta: t => `$${t.c}$`, pie: 'Estira hasta tu valor y suelta.',
  });

  // ------------------------------------------------------------------------------------------------- escribir ejercicios
  const base = (q, hint, explain) => ({ mira: hint, ok: 'Esa era la idea.' });
  const E = (tipo, q, params, explain, hint) => ({ tipo, q, params: { ...base(q, hint), ...params }, explain, hint });
  const M = (q, escena, ks, v, meta, explain, hint, x = {}) => E('m', q, { esc: escena, ks, v, meta, ...x }, explain, hint);
  const F = (q, escena, et, metas, sobra, explain, hint, x = {}) => E('f', q, { esc: escena, et, metas, fichas: [...metas, ...sobra], ...x }, explain, hint);
  const T = (q, casos, explain, hint) => E('t', q, { casos }, explain, hint);
  const S = (q, casos, explain, hint) => E('s', q, { casos }, explain, hint);
  const V = (q, min, max, tiros, explain, hint, paso = 1) => E('v', q, { min, max, paso, tiros: tiros.map(([q, r, c, e]) => { const n = (max - min) / paso, a = n <= 40 ? min : Math.max(min, Math.min(max - 30 * paso, r - paso * (3 + Math.abs(r * 7 + q.length) % 24))); return { q, r, c, e, a, b: n <= 40 ? max : a + 30 * paso }; }) }, explain, hint);
  const HACE = { m: mueve, f: cuenta, t: toca, s: frases };
  const GUIA = { m: [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]], f: [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]], t: [['tap', 'Toca todas las que cumplen y comprueba.', { items: ['A', 'B', 'C'], pick: [0, 2] }]], s: [['tap', 'Toca las frases ciertas y comprueba.', { items: ['A', 'B', 'C'], pick: [0, 2] }]], v: [['slide', 'Estira hasta tu valor y suelta: la escena lo lanza.', { label: 'valor' }]] };
  const hechas = [];
  function leccion(id, tiro, list) {
    const l = COURSE_ALGEBRA.units.flatMap(u => u.lessons).find(x => x.id === id), n = {};
    l.ex = list.map((e, i) => {
      const k = n[e.tipo] = (n[e.tipo] || 0) + 1, name = `${id}-${e.tipo}${k}`;
      e.tipo === 'v' ? vuela(name, tiro) : HACE[e.tipo](name);
      if (typeof GUIDES !== 'undefined') GUIDES[name] = GUIA[e.tipo];
      return { ...play(name, e.q, e.params, e.explain, { hint: e.hint }), motion: i === list.length - 1 };
    });
    hechas.push(id);
  }
  return { M, F, T, S, V, leccion, hechas, ESC, TIRO };
})();
