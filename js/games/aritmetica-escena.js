// Ejercicios de «Aritmética y promedios» (pu-ar-1 a pu-ar-4) con las escenas de la explicación: la barra de lo que queda, el rectángulo
// del promedio, las columnas con llevada, las bolas del peor caso y el corral. Armazones en figura-kit, logica-kit, conteo-escena
// (XG.cuenta, XG.ascensor) y proposiciones-escena (XG.renglones, XG.frases).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−');
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a hacer la cuenta.', 'Le faltó. Vuelve a hacer la cuenta.'];

  // ------------------------------------------------------------------------------------------- pu-ar-1 · fracciones de lo que queda
  XG.renglones('fraccion-de-que', { w: 64, x: 270 });
  XG.figura('corta-barra', {
    ini: () => ({ a: 2, b: 36 }), manijas: p => [{ k: 'a', min: 1, max: p.n - 1, paso: 1, rot: v => R(v.a), en: v => [24 + v.a * 292 / p.n, 26], de: x => (x - 24) * p.n / 292 }, { k: 'b', min: 1, max: p.n - 1, paso: 1, rot: v => R(v.b), en: v => [24 + v.b * 292 / p.n, 138], de: x => (x - 24) * p.n / 292 }],
    ok: (v, p) => v.a === p.a && v.b === p.b, sol: p => ({ a: p.a, b: p.b }), texto: p => `cortes en ${p.a} y en ${p.b}`, alto: () => 166, ms: 900, pie: 'Arrastra los dos cortes.',
    dib(v, K, p, f) { const x = n => 24 + n * 292 / p.n, b = Math.max(v.a, v.b); let h = K.r(24, 58, 292, 44, 'fa', 5) + K.r(24, 58, v.a * 292 / p.n, 44, 'ff', 5) + K.r(x(v.a), 58, (b - v.a) * 292 / p.n, 44, 'fg', 5); for (let i = 0; i <= p.n; i++) h += K.l(x(i), 102, x(i), i % 5 ? 105 : 109, 'lm') + (i % 10 === 0 ? K.t(x(i), 120, i, 's tm') : ''); return h + K.l(x(v.a), 42, x(v.a), 102, 'gr') + K.l(x(v.b), 58, x(v.b), 122, 'gr') + K.f(f, K.t(x((b + p.n) / 2), 85, p.n - R(b), 'b')); },
    aviso: (v, p) => (v.a !== p.a ? `El corte de arriba: parte los ${p.n} en ${p.f1[1]} pedazos iguales y toma ${p.f1[0]}.` : v.b <= v.a ? 'El segundo pedazo empieza donde termina el primero.' : 'El segundo pedazo se toma de lo que quedó a la derecha del primer corte, no de toda la barra.'), bien: (v, p) => `Quedan ${p.n - p.b} cuadros.`,
  });
  const barra = (K, y = 12) => K.r(24, y, 292, 36, 'fa', 5);
  XG.cuenta('queda-producto', 56, (K, p) => barra(K) + Array.from({ length: p.n - 1 }, (_, i) => K.l(24 + (i + 1) * 292 / p.n, 12, 24 + (i + 1) * 292 / p.n, 48, 'ls')).join(''));
  XG.rotula('desde-el-final', {
    slots: () => [{ x: 46, y: 70, w: 66, h: 42 }, { x: 170, y: 70, w: 66, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' → '), alto: () => 122, bien: p => p.ok,
    aviso: (q, p) => { const i = q[1][0] !== p.metas[1] ? 1 : 0; return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },   // se camina desde el final
    fondo: (K, p) => K.ar(84, 70, 132, 70, 'lm') + K.ar(208, 70, 260, 70, 'lm') + K.t(108, 30, p.s[0], 's tf') + K.t(234, 30, p.s[1], 's tf') + K.r(264, 49, 66, 42, 'fo', 10) + K.t(297, 76, p.queda, 'b') + K.t(46, 112, 'al principio', 's tm') + K.t(170, 112, 'después del 1.º', 's tm') + K.t(297, 112, 'quedan', 's tm'),
  });
  XG.frases('dejan-lo-mismo');
  XG.cuenta('tres-tandas', 66, (K, p) => [0, 1, 2].map(i => K.r(R(170 + (i - 1) * 108) - 34, 8, 68, 46, 'fc', 6) + K.t(170 + (i - 1) * 108, 36, p.s[i], 's tf')).join(''));
  XG.cuenta('porciento-resto', 58, K => barra(K));
  XG.ascensor('sube-resto', 140, 5, neutro);

  // -------------------------------------------------------------------------------------------------------- pu-ar-2 · promedios
  const gr = (K, x, n, m, cls) => { let h = K.r(x, 146 - m * 10, n * 20, m * 10, cls, 3); for (let i = 1; i < n; i++) h += K.l(x + i * 20, 146, x + i * 20, 146 - m * 10, 'lr'); return h; };
  XG.figura('misma-suma', {
    ini: () => ({ m: 11 }), manijas: () => [{ k: 'm', min: 1, max: 13, paso: 1, r: 16, rot: v => R(v.m), en: v => [302, 146 - v.m * 10], de: (x, y) => (146 - y) / 10 }], ok: (v, p) => v.m * p.k === p.n * p.m, sol: p => ({ m: p.n * p.m / p.k }), texto: p => `${p.n * p.m / p.k}`, alto: () => 176, ms: 900, pie: 'Sube o baja el nivel.',
    dib: (v, K, p, f) => K.l(20, 146, 326, 146, 'lm') + gr(K, 46, p.n, p.m, 'fa') + K.t(38, 150 - p.m * 5, p.m, 'ta', 'end') + K.t(46 + p.n * 10, 165, `${p.n} datos`, 's tm') + gr(K, 168, p.k, v.m, 'fg') + K.t(168 + p.k * 10, 165, `${p.k} datos`, 's tm') + K.l(168 + p.k * 20, 146 - v.m * 10, 302, 146 - v.m * 10, 'lg d') + K.f(f, K.t(46 + p.n * 10, 151 - p.m * 5, p.n * p.m, 'b') + K.t(168 + p.k * 10, 151 - Math.max(2, v.m) * 5, p.k * R(v.m), 'b')),
    aviso: (v, p) => (v.m === p.m ? 'Con el mismo nivel y más datos, la suma crece.' : `Así los ${p.k} suman ${p.k * v.m}, y los ${p.n} suman otra cosa.`), bien: (v, p) => `Los dos rectángulos tienen la misma área: ${p.n * p.m}.`,
  });
  XG.renglones('sube-baja-igual', { w: 84, x: 262 });
  const fila = (K, n, y = 28, sel = -1) => Array.from({ length: n }, (_, i) => K.c(170 + (i - (n - 1) / 2) * Math.min(34, 300 / n), y, 13, i === sel ? 'fg' : 'fa')).join('');
  XG.cuenta('cambia-uno', 56, (K, p) => fila(K, p.n, 26, p.n - 1) + K.t(170 + (p.n - 1) / 2 * 34, 54, p.c, 's tg'));
  XG.cuenta('reparte-sobra', 56, (K, p) => fila(K, p.n + 1, 26, p.n));
  XG.figura('parte-pesos', {
    ini: () => ({ w: 80 }), manijas: () => [{ k: 'w', min: 5, max: 95, paso: 5, rot: v => `${R(v.w)}`, en: v => [24 + v.w * 2.92, 116], de: x => (x - 24) / 2.92 }], ok: (v, p) => v.w === p.w, sol: p => ({ w: p.w }), texto: p => `${p.w} % y ${100 - p.w} %`, alto: () => 150, ms: 900, pie: 'Arrastra la división de los pesos.',
    dib: (v, K, p, f) => K.r(24, 50, v.w * 2.92, 46, 'fa', 5) + K.r(24 + v.w * 2.92, 50, 292 - v.w * 2.92, 46, 'fg', 5) + K.t(24 + v.w * 1.46, 78, v.w > 12 ? p.a : '', 'b') + K.t(170 + v.w * 1.46, 78, v.w < 88 ? p.b : '', 'b') + K.t(24, 38, `${p.na}: ${p.a}`, 's ta', 'start') + K.t(316, 38, `${p.nb}: ${p.b}`, 's tg', 'end') + K.l(24 + v.w * 2.92, 50, 24 + v.w * 2.92, 100, 'gr') + K.f(f, K.t(170, 18, N((p.a * v.w + p.b * (100 - v.w)) / 100), 'b')),
    aviso: (v, p) => `Con esos pesos la definitiva es ${N((p.a * v.w + p.b * (100 - v.w)) / 100)}: ${(p.a * v.w + p.b * (100 - v.w)) / 100 > p.d ? 'pesa de más la nota alta' : 'pesa de más la nota baja'}.`, bien: v => `Pesan ${v.w} % y ${100 - v.w} %.`,
  });
  XG.figura('cuantos-llegan', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'los que llegan' }], ok: (v, p) => p.k * p.a + v.n * p.b === p.m * (p.k + v.n), sol(p) { for (let n = 1; n <= p.max; n++) if (p.k * p.a + n * p.b === p.m * (p.k + n)) return { n }; return null; }, texto: p => `${p.k * (p.m - p.a) / (p.b - p.m)}`, alto: () => 168, ms: 900, pie: 'Mueve la cantidad.',
    dib: (v, K, p, f) => fila(K, p.k, 24) + K.t(170, 54, `promedian ${p.a}`, 's ta') + Array.from({ length: R(v.n) }, (_, i) => K.c(170 + (i - (R(v.n) - 1) / 2) * 24, 80, 10, 'fg')).join('') + K.t(170, 108, `promedian ${p.b}`, 's tg') + K.f(f, K.t(300, 34, N((p.k * p.a + R(v.n) * p.b) / (p.k + R(v.n))), 'b')),
    aviso: (v, p) => `Con ${v.n} el promedio de todos es ${N((p.k * p.a + v.n * p.b) / (p.k + v.n))}.`, bien: (v, p) => `Suman ${p.k * p.a + v.n * p.b} entre ${p.k + v.n}.`,
  });
  XG.renglones('aportes-nota', { w: 60, x: 276 });
  XG.ascensor('sube-promedio', 40, 1, neutro);

  // --------------------------------------------------------------------------------------------------- pu-ar-3 · criptoaritmética
  XG.figura('bloques-volteo', {
    ini: () => ({ a: 1, b: 0 }), manijas: () => [{ k: 'a', min: 1, max: 9, paso: 1, et: 'decenas' }, { k: 'b', min: 0, max: 9, paso: 1, et: 'unidades' }], ok: (v, p) => v.a + v.b === p.s && 9 * (v.a - v.b) === p.d, sol: p => ({ a: (p.s + p.d / 9) / 2, b: (p.s - p.d / 9) / 2 }), texto: p => `${(p.s + p.d / 9) / 2}${(p.s - p.d / 9) / 2}`, alto: () => 200, ms: 900, pie: 'Mueve las decenas y las unidades.',
    dib(v, K, p, f) { const A = R(v.a), B = R(v.b); let h = ''; for (let i = 0; i < A; i++) h += K.r(30 + i * 17, 10, 13, 86, 'fa', 3); for (let i = 0; i < B; i++) h += K.r(206 + (i % 5) * 20, 14 + Math.floor(i / 5) * 20, 16, 16, 'fg', 3); return h + K.f(f, K.t(254, 88, `${A}${B} → ${B}${A}`, 'b')); },
    aviso(v, p) { const c = (v.a - v.b) * 9; return v.a + v.b !== p.s ? `Sus cifras suman ${v.a + v.b}.` : `Las cifras suman bien, pero al voltearlo ${c === 0 ? 'queda igual' : `${c > 0 ? 'baja' : 'sube'} ${Math.abs(c)}`}.`; }, bien: (v, p) => `${v.a}${v.b} − ${v.b}${v.a} = ${p.d}.`,
  });
  XG.renglones('valor-letras', { w: 108, x: 252 });
  const col = (nombre, sg, slots) => XG.rotula(nombre, {
    slots: () => slots.map(([x, y]) => ({ x, y, w: 46, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 182, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.c.map(([x, y, t]) => K.t(x, y + 8, t, 'B')).join('') + K.t(96, 106, sg, 'b') + K.l(100, 132, 240, 132) + (p.rot || []).map(([x, y, t]) => K.t(x, y + 5, t, 's tm', 'start')).join(''),
  });
  col('suma-con-letras', '+', [[206, 106], [146, 22], [146, 66]]);
  col('resta-con-letras', '−', [[206, 60], [146, 106]]);
  XG.frases('siempre-once');
  XG.marca('siete-veces', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, p.nums[i], 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60,
    sol: p => p.nums.map((_, i) => i).filter(i => p.nums[i] === p.k * (Math.floor(p.nums[i] / 10) + p.nums[i] % 10)), aviso(on, p) { const s = n => Math.floor(n / 10) + n % 10, i = on.findIndex((x, k) => x && p.nums[k] !== p.k * s(p.nums[k])); return i < 0 ? 'Falta otro que también cumple.' : `Las cifras de ${p.nums[i]} suman ${s(p.nums[i])}, y ${p.k} veces eso es ${p.k * s(p.nums[i])}.`; }, bien: p => p.ok, texto: p => p.nums.filter(n => n === p.k * (Math.floor(n / 10) + n % 10)).join(', '), pie: 'Toca todos los que cumplen.',
  });
  XG.rotula('producto-con-letras', {
    slots: () => [{ x: 62, y: 30, w: 46, h: 38 }, { x: 62, y: 98, w: 46, h: 38 }, { x: 262, y: 98, w: 46, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 130, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(94, 35, 'se lleva a las decenas', 's tm', 'start') + K.t(100, 106, p.u, 'B') + K.t(140, 106, `× ${p.k}`, 'b') + K.t(184, 106, '=', 'b') + K.t(222, 106, p.r[0], 'B') + K.t(300, 106, p.r[1], 'B'),
  });
  XG.ascensor('sube-cifras', 60, 1, neutro);

  // ------------------------------------------------------------------------------------------------ pu-ar-4 · máximos y mínimos
  const CL = ['fF', 'fG', 'fA', 'fM', 'fk'];
  const bolsa = (K, g, y = 26) => g.map((n, i) => { const x = 170 + (i - (g.length - 1) / 2) * 64; return K.c(x - 12, y, 11, CL[i]) + K.t(x + 4, y + 5, `× ${n}`, 's', 'start'); }).join('');
  XG.cuenta('peor-suerte', 50, (K, p) => bolsa(K, p.g, 24));
  XG.cuenta('color-pedido', 50, (K, p) => bolsa(K, p.g, 24));
  XG.frases('seguro-o-suerte');
  XG.figura('corral-pared', {
    ini: () => ({ a: 1 }), manijas: p => [{ k: 'a', min: 1, max: p.T / 2 - 1, paso: 1, et: 'ancho' }], ok: (v, p) => v.a === p.T / 4, sol: p => ({ a: p.T / 4 }), texto: p => `${p.T / 4} por ${p.T / 2}`, alto: () => 182, ms: 900, pie: 'Mueve el ancho.',
    dib(v, K, p, f) { const u = 9, w = (p.T - 2 * v.a) * u, h = v.a * u, x = 170 - w / 2; return K.r(20, 12, 300, 10, 'fk', 2) + K.r(x, 22, w, h, 'fa', 0) + K.pl([[x, 22], [x, 22 + h], [x + w, 22 + h], [x + w, 22]], 'lg gr') + K.t(x - 8, 28 + h / 2, N(v.a), 'tg', 'end') + K.t(170, 40 + h, N(p.T - 2 * v.a), 'tg') + K.f(f, K.t(170, 28 + h / 2, N(v.a * (p.T - 2 * v.a)), 'b')); },
    aviso: (v, p) => `Así el área es ${v.a * (p.T - 2 * v.a)}: hay un ancho que da más.`, bien: (v, p) => `${v.a} por ${p.T - 2 * v.a}: ${v.a * (p.T - 2 * v.a)} m².`,
  });
  XG.figura('menor-cerca', {
    ini: () => ({ k: 0 }), manijas: () => [{ k: 'k', min: 0, max: 6, paso: 1, et: 'largo', rot: v => 2 ** R(v.k) }], ok: v => v.k === 3, sol: () => ({ k: 3 }), texto: () => '8 por 8', alto: () => 196, ms: 900, pie: 'Mueve el largo.',
    dib(v, K, p, f) { const a = 2 ** v.k, b = 64 / a, u = 1.9; return K.r(170 - a * u / 2, 130 - b * u, a * u, b * u, 'fa', 2) + K.t(170, 148, N(a), 'tg') + K.t(170 + a * u / 2 + 10, 136 - b * u / 2, N(b), 'tg', 'start') + K.f(f, K.t(40, 24, `cerca: ${N(2 * (a + b))}`, 's', 'start')); },
    aviso: v => `Así se gastan ${2 * (2 ** v.k + 64 / 2 ** v.k)} m de cerca: se puede con menos.`, bien: () => 'El cuadrado gasta la menor cerca: 32 m.',
  });
  XG.cuenta('reparto-distinto', 56, (K, p) => fila(K, p.n));
  XG.renglones('techo-piso', { w: 56, x: 290 });
  XG.ascensor('sube-extremo', 40, 1, neutro);
})();
