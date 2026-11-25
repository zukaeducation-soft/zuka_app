// Ejercicios de «Probabilidad» (pu-pb-1 y pu-pb-2) con las escenas de la explicación: la ruleta, las urnas, la tabla de dos dados, la escala
// de 0 a 1, el cuadro de casillas y la bolsa que cambia. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100), idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a contar.', 'Le faltó. Vuelve a contar.'];
  const bolas = (K, n, k, x, y, cols, cls) => Array.from({ length: R(n) }, (_, i) => K.c(x + (i % cols) * 22, y + Math.floor(i / cols) * 22, 9, i < k ? 'fF' : cls || 'fA')).join('');

  // -------------------------------------------------------------------------------------------- pu-pb-1 · espacio muestral y Laplace
  const RU = (i, n, r) => { const a = (90 - (i + 0.5) * 360 / n) * Math.PI / 180; return [170 + r * Math.cos(a), 104 - r * Math.sin(a)]; };
  XG.marca('ruleta-favorables', {
    sitios: p => p.nums.map((_, i) => { const [x, y] = RU(i, p.nums.length, 70); return { x, y, w: 36, h: 36, red: true }; }), cara: (K, p, i) => { const [x, y] = RU(i, p.nums.length, 70); return K.t(x, y + 6, p.nums[i], 'b'); }, alto: () => 208,
    fondo: (K, p) => K.c(170, 104, 100, 'fc') + p.nums.map((_, i) => K.l(170, 104, ...K.at(170, 104, 100, 90 - i * 360 / p.nums.length), 'lm')).join(''),
    sol: p => idx(p.nums.length, i => p.f(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.f(p.nums[k])); return i < 0 ? 'Falta otro: basta con que cumpla una de las dos cosas.' : `El ${p.nums[i]} no cumple ninguna de las dos cosas.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.f).join(', '), pie: 'Toca todos los favorables.',
  });
  XG.figura('iguala-urnas', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'verdes en la urna B' }], ok: (v, p) => p.b * p.t === p.a * (p.b + v.x), sol: p => ({ x: p.b * p.t / p.a - p.b }), texto: p => `${p.b * p.t / p.a - p.b} verdes`, alto: () => 196, ms: 900, pie: 'Echa verdes en la urna B.',
    dib: (v, K, p, f) => K.r(12, 24, 148, 98, 'fn', 14) + K.r(180, 24, 148, 98, 'fn', 14) + K.t(86, 16, 'urna A', 's tm') + K.t(254, 16, 'urna B', 's tm') + bolas(K, p.t, p.a, 30, 42, 6) + bolas(K, p.b + R(v.x), p.b, 198, 42, 6) + K.f(f, K.t(86, 140, `${p.a}/${p.t}`, 'b') + K.t(254, 140, `${p.b}/${p.b + R(v.x)}`, 'b')),
    aviso: (v, p) => `En la B quedan ${p.b} naranjas de ${p.b + v.x}, y esa parte es ${p.b * p.t > p.a * (p.b + v.x) ? 'mayor' : 'menor'} que ${p.a} de ${p.t}.`, bien: (v, p) => `${p.a} de ${p.t} es la misma parte que ${p.b} de ${p.b + v.x}.`,
  });
  const DX = j => 64 + j * 48, DY = i => 42 + i * 32;
  XG.marca('tabla-diferencia', {
    sitios: () => idx(36, () => true).map(k => ({ x: DX(k % 6), y: DY(Math.floor(k / 6)), w: 44, h: 30 })), cara: (K, p, k, on) => K.t(DX(k % 6), DY(Math.floor(k / 6)) + 5, on ? '✓' : '·', 'b'), alto: () => 220, nombre: (p, k) => `${Math.floor(k / 6) + 1} y ${k % 6 + 1}`,
    fondo: K => [1, 2, 3, 4, 5, 6].map(n => K.t(DX(n - 1), 20, n, 's ta') + K.t(24, DY(n - 1) + 5, n, 's tg')).join(''),
    sol: p => idx(36, k => p.f(Math.floor(k / 6) + 1, k % 6 + 1)), aviso(on, p) { const k = on.findIndex((x, i) => x && !p.f(Math.floor(i / 6) + 1, i % 6 + 1)); return k < 0 ? 'Faltan parejas: recuerda que cada una sale también al revés.' : `Con ${Math.floor(k / 6) + 1} y ${k % 6 + 1} la diferencia es ${Math.abs(Math.floor(k / 6) - k % 6)}.`; }, bien: p => p.ok, texto: p => p.texto, pie: 'Fila: primer dado. Columna: segundo dado.',
  });
  XG.renglones('cuantas-parejas', { w: 64, x: 270 });
  XG.renglones('cero-a-uno', { w: 60, x: 274 });
  XG.figura('punto-escala', {
    ini: () => ({ x: 0 }), manijas: () => [{ k: 'x', min: 0, max: 1, paso: 0.05, r: 12, en: v => [30 + v.x * 280, 112], de: x => (x - 30) / 280 }], ok: (v, p) => Math.abs(v.x - p.k / p.n) < 1e-9, sol: p => ({ x: p.k / p.n }), texto: p => `${p.k}/${p.n} = ${N(p.k / p.n)}`, alto: () => 152, ms: 900, pie: 'Arrastra el punto.',
    dib: (v, K, p, f) => bolas(K, p.n, p.k, 170 - (p.n - 1) * 11, 24, 20) + K.l(30, 112, 310, 112, 'gr') + [['0', 0], ['1/2', 0.5], ['1', 1]].map(([t, x]) => K.l(30 + x * 280, 106, 30 + x * 280, 118) + K.t(30 + x * 280, 142, t)).join('') + Array.from({ length: 21 }, (_, i) => K.l(30 + i * 14, 109, 30 + i * 14, 115, 'lm')).join('') + K.t(30, 84, 'imposible', 's tm') + K.t(306, 84, 'seguro', 's tm') + K.f(f, K.t(Math.max(30, Math.min(300, 30 + v.x * 280)), 66, N(v.x), 'b')),
    aviso: (v, p) => `Pusiste ${N(v.x)}: así sería más ${v.x > p.k / p.n ? 'fácil' : 'difícil'} de lo que es. Compara las naranjas con todas las bolas.`, bien: (v, p) => `${p.k} de ${p.n} es ${N(v.x)}.`,
  });
  XG.cuenta('grupo-gafas', 62, (K, p) => Array.from({ length: p.n }, (_, i) => { const m = i < p.m, g = m ? i < p.mg : i - p.m < p.hg, x = 34 + (i % 15) * 19.4, y = 12 + Math.floor(i / 15) * 32; return K.c(x, y, 8, m ? 'fa' : 'fg') + (g ? K.l(x - 6, y - 1, x + 6, y - 1, 'gr') : ''); }).join(''));
  XG.ascensor('sube-favorables', 40, 1, neutro);

  // ----------------------------------------------------------------------------------------- pu-pb-2 · complemento e independencia
  XG.renglones('lo-que-falta', { w: 64, x: 284 });
  const GX = j => 84 + j * 50, GY = i => 52 + i * 42;
  XG.marca('cruce-sin-b', {
    sitios: p => idx(p.c * p.f, () => true).map(k => ({ x: GX(k % p.c), y: GY(Math.floor(k / p.c)), w: 46, h: 38 })), cara: (K, p, k, on) => K.t(GX(k % p.c), GY(Math.floor(k / p.c)) + 6, on ? '✓' : '·', 'b'), alto: p => GY(p.f - 1) + 26, nombre: (p, k) => `${k % p.c < p.a ? 'A' : 'no A'} y ${Math.floor(k / p.c) < p.b ? 'B' : 'no B'}`,
    fondo: (K, p) => idx(p.c, () => true).map(j => K.t(GX(j), 24, j < p.a ? 'A' : 'no A', j < p.a ? 's ta' : 's tm')).join('') + idx(p.f, () => true).map(i => K.t(50, GY(i) + 5, i < p.b ? 'B' : 'no B', i < p.b ? 's tg' : 's tm', 'end')).join(''),
    sol: p => idx(p.c * p.f, k => k % p.c < p.a && Math.floor(k / p.c) >= p.b), aviso(on, p) { const k = on.findIndex((x, i) => x && !(i % p.c < p.a && Math.floor(i / p.c) >= p.b)); return k < 0 ? 'Faltan casillas que están en A y no en B.' : k % p.c >= p.a ? 'Marcaste una columna en la que A no pasa.' : 'Marcaste una fila en la que B sí pasa.'; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca las casillas.',
  });
  XG.cuenta('fallan-todos', 52, (K, p) => [[110, p.x, 'fa'], [230, p.y, 'fg']].map(([x, t, c]) => K.r(x - 50, 8, 100, 36, c, 8) + K.t(x, 31, t, 's')).join(''));
  XG.frases('no-se-afectan');
  XG.rotula('arbol-bolsa', {
    slots: () => [36, 80, 126, 170].map(y => ({ x: 236, y, w: 56, h: 36 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 198, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => bolas(K, p.n + p.v, p.n, 18, 88, 3) + K.l(82, 103, 126, 58, 'lm') + K.l(82, 103, 126, 148, 'lm') + K.c(138, 58, 11, 'fF') + K.c(138, 148, 11, 'fA') + K.t(96, 70, p.p1[0], 's', 'end') + K.t(96, 144, p.p1[1], 's', 'end') + [[58, 36, 'fF'], [58, 80, 'fA'], [148, 126, 'fF'], [148, 170, 'fA']].map(([a, b, c]) => K.l(150, a, 206, b, 'lm') + K.c(290, b, 11, c)).join('') + K.t(138, 16, '1.ª', 's tm') + K.t(290, 16, '2.ª', 's tm'),
  });
  XG.renglones('devuelve-o-no', { w: 64, x: 290 });
  XG.figura('falla-cuadrado', {
    ini: () => ({ q: 0.9 }), manijas: () => [{ k: 'q', min: 0.02, max: 1, paso: 0.02, et: 'probabilidad de que falle uno' }], ok: (v, p) => Math.abs(1 - v.q * v.q - p.al) < 1e-9, sol: p => ({ q: Math.sqrt(1 - p.al) }), texto: p => N(Math.sqrt(1 - p.al)), alto: () => 208, ms: 900, pie: 'Mueve la probabilidad de fallar.',
    dib(v, K, p, f) { const L = 130, s = v.q * L; return K.r(105, 14, L, L, 'fa', 2) + K.r(105, 14, s, s, 'ff', 2) + K.t(105 + s / 2, 18 + s / 2, s > 92 ? 'fallan los dos' : '', 's') + K.f(f, K.t(96, 60, N(v.q * v.q), 'b tf', 'end') + K.t(244, 130, N(1 - v.q * v.q), 'b ta', 'start')); },
    aviso: (v, p) => `Fallarían los dos con probabilidad ${N(v.q * v.q)}, y acertaría al menos uno con ${N(1 - v.q * v.q)}.`, bien: (v, p) => `${N(v.q)} · ${N(v.q)} = ${N(v.q * v.q)}, y 1 − ${N(v.q * v.q)} = ${N(p.al)}.`,
  });
  XG.ascensor('sube-por-ciento', 100, 2, neutro);
})();
