// Ejercicios de «Conjuntos» (pu-cj-1 y pu-cj-2) con las escenas de la explicación: los círculos y sus zonas, y las barras que se solapan.
// Armazones en figura-kit, logica-kit, conteo-escena (XG.cuenta, XG.ascensor) y proposiciones-escena (XG.renglones, XG.frases).
(() => {
  const R = Math.round, idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó: algo se contó dos veces o de sobra.', 'Le faltó: algo quedó sin contar.'];
  // Dos círculos: a = solo A, i = los dos, b = solo B, o = afuera.  Centro (x, y), radio r, separados d a cada lado.
  const zona = (k, x, y, r, d) => { const h = Math.sqrt(r * r - d * d), u = y - h, v = y + h, A = `A${r} ${r} 0`; return k === 'a' ? `M${x} ${u} ${A} 1 0 ${x} ${v} ${A} 0 1 ${x} ${u} Z` : k === 'i' ? `M${x} ${u} ${A} 0 0 ${x} ${v} ${A} 0 0 ${x} ${u} Z` : `M${x} ${u} ${A} 1 1 ${x} ${v} ${A} 0 0 ${x} ${u} Z`; };
  const pz = (k, cls, ...g) => `<path class="xf ${cls}" d="${zona(k, ...g)}"/>`;
  const mini = (K, ks, x, y) => K.r(x - 62, y - 30, 124, 60, ks.includes('o') ? 'fa' : 'fc', 6) + ['a', 'i', 'b'].map(k => pz(k, ks.includes(k) ? 'fa' : 'fop', x, y, 23, 13)).join('') + K.c(x - 13, y, 23, 'fn') + K.c(x + 13, y, 23, 'fn') + K.t(x - 50, y - 14, 'A', 's') + K.t(x + 50, y - 14, 'B', 's');
  const venn = K => K.r(16, 8, 308, 168, 'fc', 10) + K.c(130, 92, 66, 'fa') + K.c(210, 92, 66, 'fg');

  // ----------------------------------------------------------------------------------------------------- pu-cj-1 · operaciones y Venn
  const DON = (x, y) => { if (x < 16 || x > 324 || y < 8 || y > 176) return -1; const a = Math.hypot(x - 130, y - 92) <= 66, b = Math.hypot(x - 210, y - 92) <= 66; return a && b ? 1 : a ? 0 : b ? 2 : 3; };
  const SITIO = [[[92, 68], [92, 112]], [[170, 70], [170, 114]], [[248, 68], [248, 112]], [[46, 152], [294, 152]]], NZ = ['solo en A', 'en los dos', 'solo en B', 'afuera'];
  XG.figura('ubica-cada', {
    ini: p => Object.assign({}, ...p.els.map((_, i) => ({ [`x${i}`]: 50 + i * 60, [`y${i}`]: 206 }))),
    manijas: p => p.els.map((e, i) => ({ k: [`x${i}`, `y${i}`], min: [20, 16], max: [320, 206], paso: 2, rot: () => e.t, en: v => [v[`x${i}`], v[`y${i}`]], de: (x, y) => [x, y] })),
    ok: (v, p) => p.els.every((e, i) => DON(v[`x${i}`], v[`y${i}`]) === e.z),
    sol: p => { const n = [0, 0, 0, 0]; return Object.assign({}, ...p.els.map((e, i) => { const [x, y] = SITIO[e.z][n[e.z]++]; return { [`x${i}`]: x, [`y${i}`]: y }; })); },
    texto: p => p.els.map(e => `${e.t} ${NZ[e.z]}`).join('; '), alto: () => 226, ms: 500, pie: 'Arrastra cada número a su zona.',
    dib: (v, K, p, f) => venn(K) + K.t(60, 30, p.a, 's ta') + K.t(280, 30, p.b, 's tg') + (f ? p.els.map((e, i) => { const x = v[`x${i}`], y = v[`y${i}`]; return K.f(f, K.c(x, y, 16, DON(x, y) === e.z ? 'fo' : 'ff') + K.t(x, y + 5, e.t, 'b')); }).join('') : ''),
    aviso(v, p) { const f = p.els.find((e, i) => DON(v[`x${i}`], v[`y${i}`]) < 0); if (f) return `El ${f.t} quedó fuera del recuadro: todos van en alguna zona.`; const i = p.els.findIndex((e, k) => DON(v[`x${k}`], v[`y${k}`]) !== e.z); return `El ${p.els[i].t} quedó ${NZ[DON(v[`x${i}`], v[`y${i}`])]}: ${p.pr}`; }, bien: (v, p) => 'Cada número cayó en una sola zona.',
  });
  const ORD = ['o', 'a', 'i', 'b'], PZ = { o: [46, 152], a: [100, 92], i: [170, 92], b: [240, 92] };
  XG.marca('pinta-operacion', {
    sitios: () => ORD.map(k => ({ x: PZ[k][0], y: PZ[k][1], w: 36, h: 34 })), alto: () => 184, nombre: (p, i) => ['afuera', 'solo A', 'los dos', 'solo B'][i],
    cara: (K, p, i, on) => { const k = ORD[i]; return (k === 'o' ? K.r(16, 8, 308, 168, on ? 'fa' : 'fc', 10) : pz(k, 'fop', 170, 92, 66, 40) + pz(k, on ? 'fa' : 'fn', 170, 92, 66, 40)) + (k === 'b' ? K.t(66, 34, 'A', 'b ta') + K.t(274, 34, 'B', 'b tg') : '') + `<rect class="caja" x="${PZ[k][0] - 18}" y="${PZ[k][1] - 17}" width="36" height="34" rx="10"/>` + K.t(PZ[k][0], PZ[k][1] + 6, on ? '✓' : '·', 'b'); },   // la caja va encima: la zona la taparía
    sol: p => idx(4, i => p.zonas.includes(ORD[i])), aviso(on, p) { return p.mira[ORD[on.findIndex((x, i) => x !== p.zonas.includes(ORD[i]))]]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca las zonas.',
  });
  XG.rotula('nombra-dibujo', {
    slots: () => [0, 1, 2, 3].map(i => ({ x: 88 + (i % 2) * 164, y: 84 + Math.floor(i / 2) * 100, w: 92, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 204, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.ks.map((ks, i) => mini(K, ks, 88 + (i % 2) * 164, 34 + Math.floor(i / 2) * 100)).join(''),
  });
  XG.cuenta('zonas-y-total', 66, K => K.c(150, 32, 30, 'fa') + K.c(190, 32, 30, 'fg') + K.t(112, 20, 'A', 's ta', 'end') + K.t(228, 20, 'B', 's tg', 'start'));
  XG.frases('ciertas-siempre');
  XG.marca('elementos-de', {
    sitios: p => p.nums.map((_, i) => ({ x: 38 + (i % 5) * 66, y: 34 + Math.floor(i / 5) * 60, w: 56, h: 48 })), cara: (K, p, i) => K.t(38 + (i % 5) * 66, 41 + Math.floor(i / 5) * 60, p.nums[i], 'b'), alto: () => 128,
    sol: p => idx(p.nums.length, i => p.si(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.si(p.nums[k])); return i < 0 ? 'Falta otro: recorre los de A uno por uno.' : !p.A.includes(p.nums[i]) ? `El ${p.nums[i]} no está en A, y de A se parte.` : `El ${p.nums[i]} está en A, pero es de los que se quitan.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.si).join(', '), pie: 'Toca los elementos que quedan.',
  });
  XG.frases('misma-zona');
  XG.ascensor('sube-union', 40, 1, neutro);

  // -------------------------------------------------------------------------------------------------------------- pu-cj-2 · encuestas
  XG.rotula('llena-encuesta', {
    slots: () => [{ x: 98, y: 92, w: 46 }, { x: 170, y: 92, w: 44 }, { x: 242, y: 92, w: 46 }, { x: 46, y: 154, w: 46, h: 34 }].map(s => ({ h: 40, ...s })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 184, fondo: (K, p) => venn(K) + K.t(60, 28, p.a, 's ta') + K.t(280, 28, p.b, 's tg'),
    aviso: (q, p) => { const i = [1, 0, 2, 3].find(k => q[k][0] !== p.metas[k]); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,   // se llena desde el centro
  });
  XG.figura('corre-solape', {
    ini: () => ({ s: 0 }), manijas: p => [{ k: 's', min: 0, max: p.b, paso: 1, rot: v => R(v.s), en: v => [24 + (p.a + p.b - v.s) * 290 / (p.a + p.b), 118], de: x => p.a + p.b - (x - 24) * (p.a + p.b) / 290 }], ok: (v, p) => p.a + p.b - v.s + p.n === p.T, sol: p => ({ s: p.a + p.b + p.n - p.T }), texto: p => `${p.a + p.b + p.n - p.T}`, alto: () => 168, ms: 900, pie: 'Corre la barra de abajo: la ficha dice cuántos se solapan.',
    dib(v, K, p, f) { const u = 290 / (p.a + p.b), xb = 24 + (p.a - v.s) * u; return K.r(24, 40, p.a * u, 34, 'fa') + K.t(30, 62, `${p.na}: ${p.a}`, 's', 'start') + K.r(xb, 84, p.b * u, 34, 'fg') + K.t(xb + 8, 106, `${p.nb}: ${p.b}`, 's', 'start') + (v.s > 0.3 ? K.r(xb, 40, v.s * u, 78, 'ff d') : '') + K.f(f, K.l(24 + (p.T - p.n) * u, 26, 24 + (p.T - p.n) * u, 128, 'lo gr') + K.t(24 + (p.T - p.n) * u, 20, `${p.T - p.n} hacen alguna`, 's')); },
    aviso: (v, p) => `Así harían algo ${p.a + p.b - v.s}, y con los ${p.n} que no hacen ninguna serían ${p.a + p.b - v.s + p.n} personas.`, bien: (v, p) => `${p.a} + ${p.b} − ${v.s} = ${p.T - p.n}.`,
  });
  const C3 = [[138, 66], [202, 66], [170, 120]], tres = (K, p) => K.c(...C3[0], 54, 'fa') + K.c(...C3[1], 54, 'fg') + K.c(...C3[2], 54, 'ff') + K.t(76, 22, p.e[0], 's ta', 'end') + K.t(264, 22, p.e[1], 's tg', 'start') + K.t(232, 164, p.e[2], 's tf', 'start');
  const Z3 = [[170, 46], [133, 102], [207, 102], [104, 54], [236, 54], [170, 152], [170, 80], [40, 140]];
  XG.rotula('tres-circulos', {
    slots: () => Z3.slice(0, 6).map(([x, y]) => ({ x, y, w: 36, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 178, fondo: (K, p) => tres(K, p) + K.t(170, 87, p.c, 'b'), aviso: avisa, bien: p => p.ok,
  });
  XG.marca('pinta-tres', {
    sitios: () => Z3.map(([x, y]) => ({ x, y, w: 32, h: 30 })), cara: (K, p, i, on) => K.t(Z3[i][0], Z3[i][1] + 6, on ? '✓' : '·', 'b'), alto: () => 180, nombre: (p, i) => ['A y B', 'A y C', 'B y C', 'solo A', 'solo B', 'solo C', 'los tres', 'ninguno'][i], fondo: (K, p) => tres(K, p),
    sol: p => p.zonas, aviso(on, p) { return p.mira[on.findIndex((x, i) => x !== p.zonas.includes(i))]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las zonas que cumplen.',
  });
  XG.rotula('lee-encuesta', {
    slots: p => p.metas.map((_, i) => ({ x: 306, y: 26 + i * 48, w: 52, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: () => 196, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.r(4, 34, 156, 130, 'fc', 8) + K.c(62, 94, 42, 'fa') + K.c(102, 94, 42, 'fg') + K.t(24, 52, 'A', 's ta') + K.t(140, 52, 'B', 's tg') + [[40, 94], [82, 94], [124, 94], [24, 152]].map(([x, y], i) => K.t(x, y + (i < 3 ? 6 : 0), p.z[i], 'b')).join('') + p.et.map((t, i) => K.t(274, 31 + i * 48, t, 's', 'end')).join(''),
  });
  XG.cuenta('desde-los-totales', 62, (K, p) => K.c(150, 30, 28, 'fa') + K.c(190, 30, 28, 'fg') + K.t(112, 35, p.a, 's ta', 'end') + K.t(228, 35, p.b, 's tg', 'start'));
  XG.cuenta('porciento-comun', 62, (K, p) => K.c(150, 30, 28, 'fa') + K.c(190, 30, 28, 'fg') + K.t(112, 35, p.a, 's ta', 'end') + K.t(228, 35, p.b, 's tg', 'start'));
  XG.ascensor('sube-encuesta', 60, 1, neutro);
})();
