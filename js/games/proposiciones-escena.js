// Ejercicios de «Lógica proposicional» (pu-lo-1 a pu-lo-5) con las escenas de la explicación: interruptores, tablas de V y F, círculos y
// personas que mienten. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const VF = b => (b ? 'V' : 'F'), idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Tabla de verdad: se tocan las filas en las que la frase es V.  params { cols: [títulos], f(p, q), pie? }
  const FIL = [[1, 1], [1, 0], [0, 1], [0, 0]], YF = i => 62 + i * 44;
  const tablaV = nombre => XG.marca(nombre, {
    sitios: () => FIL.map((_, i) => ({ x: 248, y: YF(i), w: 96, h: 38 })), cara: (K, p, i, on) => K.t(248, YF(i) + 6, VF(on), on ? 'b ta' : 'tm'), alto: () => 222, nombre: (p, i) => `fila ${i + 1}`,
    fondo: (K, p) => K.t(58, 26, 'p', 'b') + K.t(128, 26, 'q', 'b') + K.t(248, 26, p.frase, 'b ta') + K.l(20, 38, 320, 38, 'lm') + FIL.map(([a, b], i) => K.t(58, YF(i) + 6, VF(a)) + K.t(128, YF(i) + 6, VF(b))).join(''),
    sol: p => idx(4, i => p.f(!!FIL[i][0], !!FIL[i][1])), aviso(on, p) { const i = FIL.findIndex(([a, b], k) => on[k] !== !!p.f(!!a, !!b)), [a, b] = FIL[i]; return `Con p ${VF(a)} y q ${VF(b)} la frase es ${VF(p.f(!!a, !!b))}: ${p.regla}`; }, bien: p => p.ok, texto: p => FIL.map(([a, b]) => VF(p.f(!!a, !!b))).join(', '), pie: 'Toca las casillas que valen V. Las demás quedan en F.',
  });
  // Casillas con su rótulo, en renglones.  params { et, metas, fichas, mira, trampas?, ok }
  const renglones = (nombre, d = {}) => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: d.x ?? 250, y: (d.y0 ?? 30) + i * 48, w: d.w ?? 124, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => (d.y0 ?? 30) + p.metas.length * 48 - 18,
    fondo: (K, p) => (d.fondo?.(K, p) || '') + p.et.map((t, i) => K.t((d.x ?? 250) - (d.w ?? 124) / 2 - 12, (d.y0 ?? 30) + i * 48 + 5, t, t.length > 20 ? 's' : '', 'end')).join(''), aviso: avisa, bien: p => p.ok,
  });
  const frases = nombre => { const si = p => idx(p.casos.length, i => p.casos[i].si), y0 = p => (p.da ? 24 + p.da.length * 24 : 8); XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: y0(p) + 20 + i * 44, w: 330, h: 38 })), cara: (K, p, i) => K.t(170, y0(p) + 25 + i * 44, p.casos[i].t, 's'), alto: p => y0(p) + p.casos.length * 44 + 2, fondo: (K, p) => (p.da || []).map((t, i) => K.t(170, 20 + i * 24, t, 'ta')).join(''), sol: si,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.casos[k].si); return i >= 0 ? p.casos[i].no : p.falta; }, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie: 'Toca todas las que cumplen.',
  }); };
  // Negación en tres pedazos (en el mismo orden de la frase).
  const negacion = nombre => XG.rotula(nombre, {
    slots: () => [{ x: 170, y: 58, w: 190, h: 38 }, { x: 170, y: 102, w: 190, h: 38 }, { x: 170, y: 146, w: 190, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' '), alto: () => 170, fondo: (K, p) => K.t(170, 24, p.frase, 'ta'), aviso: avisa, bien: p => p.ok,
  });

  // ------------------------------------------------------------------------------------ pu-lo-1 · conectivos y tablas de verdad
  const LL = [[120, 46], [120, 126], [226, 86]];
  XG.marca('prende-circuito', {
    sitios: () => LL.map(([x, y]) => ({ x, y, w: 68, h: 56 })), alto: () => 170, nombre: (p, i) => `llave ${'pqr'[i]}`,
    cara: (K, p, i, on) => { const [x, y] = LL[i]; return K.c(x - 24, y, 4, 'fk') + K.c(x + 24, y, 4, 'fk') + K.l(x - 24, y, x + (on ? 24 : 18), y - (on ? 0 : 18), on ? 'la gr' : 'gr') + K.t(x, y + 20, 'pqr'[i], 's'); },
    fondo: K => K.l(10, 86, 60, 86) + K.pl([[96, 46], [60, 46], [60, 126], [96, 126]]) + K.pl([[144, 46], [178, 46], [178, 126], [144, 126]]) + K.l(178, 86, 202, 86) + K.l(250, 86, 284, 86) + K.c(304, 86, 20, 'fc') + K.t(304, 92, '?', 'tm'),
    sol: p => p.sol, aviso(on, p) { const l = (on[0] || on[1]) && on[2]; return on[p.abierta] ? `La llave ${'pqr'[p.abierta]} tenía que quedar abierta.` : l ? 'Prende, pero cerraste una llave de más.' : !on[2] ? 'Se corta en r: está en serie con todo lo demás.' : 'No llega corriente por ninguno de los dos caminos.'; }, bien: () => '(p o q) y r: un camino de la izquierda y además r.', texto: p => p.sol.map(i => 'pqr'[i]).join(' y '), pie: 'Toca una llave para cerrarla.',
  });
  XG.rotula('valor-frases', {
    slots: p => p.et.map((_, i) => ({ x: 170 + (i - (p.et.length - 1) / 2) * 64, y: 92, w: 56, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: () => 124, fondo: (K, p) => K.t(170, 28, p.da, 'b ta') + p.et.map((t, i) => K.t(170 + (i - (p.et.length - 1) / 2) * 64, 62, t)).join(''), aviso: avisa, bien: p => p.ok,
  });
  tablaV('tabla-disyuncion'); frases('promesa-sigue');
  XG.cuenta('cuenta-filas', 70, (K, p) => K.t(170, 42, p.frase, 'B ta'));
  XG.rotula('nombra-columna', {
    slots: p => p.cols.map((_, i) => ({ x: 152 + i * 74, y: 206, w: 70, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 234, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(34, 26, 'p', 'b') + K.t(80, 26, 'q', 'b') + K.l(14, 38, 330, 38, 'lm') + FIL.map(([a, b], i) => K.t(34, 66 + i * 34, VF(a)) + K.t(80, 66 + i * 34, VF(b)) + p.cols.map((c, j) => K.t(152 + j * 74, 66 + i * 34, c[i], c[i] === 'V' ? 'ta' : 'tm')).join('')).join('') + p.cols.map((_, j) => K.t(152 + j * 74, 26, '?', 'tm')).join(''),
  });
  renglones('frase-larga', { w: 56, x: 280 });
  XG.ascensor('sube-filas', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------- pu-lo-2 · negación y De Morgan
  negacion('niega-y'); negacion('niega-mezclada'); negacion('niega-cartel');
  tablaV('tabla-negada'); frases('casos-tumban'); renglones('parejas-negacion', { w: 148, x: 254 });
  const ZV = [[96, 92, 'solo p'], [170, 92, 'p y q'], [244, 92, 'solo q'], [300, 162, 'ninguna']];
  const venn = (K, a, b) => K.r(8, 8, 324, 176, 'fn', 8) + K.c(133, 92, 68, 'fa') + K.c(207, 92, 68, 'fg') + K.t(62, 36, a, 's ta') + K.t(278, 36, b, 's tg');
  const zonas = (nombre, pie) => XG.marca(nombre, {
    sitios: () => ZV.map(([x, y]) => ({ x, y, w: 44, h: 40 })), cara: (K, p, i, on) => K.t(ZV[i][0], ZV[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 194, nombre: (p, i) => ZV[i][2], fondo: (K, p) => venn(K, p.a, p.b),
    sol: p => p.zonas, aviso(on, p) { const i = on.findIndex((x, k) => x !== p.zonas.includes(k)); return p.mira[i]; }, bien: p => p.ok, texto: p => p.zonas.map(i => ZV[i][2].replace('p', p.a).replace('q', p.b)).join('; '), pie,
  });
  zonas('pinta-negacion', 'Toca las zonas.');
  XG.ascensor('sube-niega', 20, 1, neutro);

  // -------------------------------------------------------------------------------------------------- pu-lo-3 · el condicional
  const Z3 = [[152, 116, 0], [226, 96, 1], [304, 170, 2]];
  XG.marca('zonas-posibles', {
    sitios: () => Z3.map(([x, y]) => ({ x, y, w: 46, h: 40 })), cara: (K, p, i, on) => K.t(Z3[i][0], Z3[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 206, nombre: (p, i) => [p.p, `${p.q} sin ser ${p.p}`, `fuera de ${p.q}`][i],
    fondo: (K, p) => K.c(170, 104, 94, 'fg') + K.c(152, 116, 48, 'fa') + K.t(170, 34, p.q, 'tg') + K.t(152, 86, p.p, 's ta'), sol: p => p.zonas, aviso(on, p) { return p.mira[on.findIndex((x, k) => x !== p.zonas.includes(k))]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las zonas posibles.',
  });
  const siE = (K, p) => K.t(170, 24, p.frase, 'ta') + K.t(46, 74, 'si', 's tm') + K.t(46, 130, 'entonces', 's tm');
  XG.rotula('voltea-niega', { slots: () => [{ x: 200, y: 69, w: 190, h: 42 }, { x: 200, y: 125, w: 190, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => `si ${p.metas[0]}, entonces ${p.metas[1]}`, alto: () => 154, fondo: siE, aviso: avisa, bien: p => p.ok });
  frases('mismo-condicional'); renglones('basta-falta', { w: 112, x: 274 });
  XG.marca('revisa-regla', {
    sitios: p => p.cartas.map((_, i) => ({ x: 88 + (i % 2) * 164, y: 40 + Math.floor(i / 2) * 76, w: 148, h: 62 })), cara: (K, p, i) => K.t(88 + (i % 2) * 164, 46 + Math.floor(i / 2) * 76, p.cartas[i].t, 's'), alto: p => 8 + Math.ceil(p.cartas.length / 2) * 76, sol: p => idx(p.cartas.length, i => p.cartas[i].si), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.cartas[k].si); return i >= 0 ? p.cartas[i].no : p.falta; }, bien: p => p.ok, texto: p => p.cartas.filter(c => c.si).map(c => c.t).join(' y '), pie: 'Toca a las que hay que revisar.',
  });
  renglones('deduce-seguro', { w: 112, x: 268 }); renglones('cadena-si', { w: 124, x: 254, y0: 100, fondo: (K, p) => p.da.map((t, i) => K.t(170, 22 + i * 24, t, i < 2 ? '' : 'ta')).join('') });
  XG.ascensor('sube-regla-si', 20, 1, neutro);

  // ------------------------------------------------------------------------------------ pu-lo-4 · cuantificadores y silogismos
  const rel = (v, r, x, y, s) => { const d = Math.hypot(v.x - x, v.y - y); return d <= s - r ? 'dentro' : d >= s + r ? 'fuera' : 'cruza'; };
  const eB = v => rel(v, 36, 130, 112, 88), eA = v => rel(v, 36, 108, 126, 40);
  XG.figura('dibujo-contra', {
    ini: () => ({ x: 290, y: 60 }), manijas: () => [{ k: ['x', 'y'], min: [40, 46], max: [300, 176], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }], ok: v => eB(v) !== 'fuera' && eA(v) === 'fuera', sol: () => ({ x: 206, y: 76 }), texto: p => `${p.c} toca a ${p.b} sin tocar a ${p.a}`, alto: () => 216, pie: 'Arrastra el círculo rojo.',
    dib: (v, K, p) => K.c(130, 112, 88, 'fg') + K.c(108, 126, 40, 'fa') + K.c(v.x, v.y, 36, 'ff') + K.t(130, 44, p.b, 's tg') + K.t(108, 131, p.a, 's ta') + K.t(v.x, v.y + 24, p.c, 's tf'), aviso: (v, p) => (eB(v) === 'fuera' ? `Así ningún ${p.b1} sería ${p.c1}: no se cumple la segunda frase.` : `Así el círculo de ${p.c} alcanza a los ${p.a}: el dibujo no muestra la duda.`), bien: () => 'Las dos frases se cumplen y la conclusión no: no es segura.',
  });
  XG.rotula('frase-dibujo', {
    slots: () => [0, 1, 2].map(i => ({ x: 252, y: 28 + i * 52, w: 130, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 160, aviso: avisa, bien: p => p.ok,
    fondo: K => K.c(90, 28, 25, 'fg') + K.c(82, 33, 13, 'fa') + K.t(82, 37, 'A', 's') + K.t(102, 24, 'B', 's') + K.c(76, 80, 22, 'fa') + K.c(104, 80, 24, 'fg') + K.t(66, 85, 'A', 's') + K.t(116, 85, 'B', 's') + K.c(89, 80, 3.5, 'fF') + K.c(62, 132, 18, 'fa') + K.c(112, 132, 24, 'fg') + K.t(62, 137, 'A', 's') + K.t(112, 137, 'B', 's'),
  });
  frases('se-voltea'); zonas('donde-alguien', 'Toca las zonas donde seguro hay alguien.'); frases('seguro-tres');
  XG.rotula('cadena-todos', {
    slots: () => [{ x: 130, y: 150, w: 78, h: 34 }, { x: 130, y: 84, w: 78, h: 34 }, { x: 130, y: 28, w: 78, h: 34 }, { x: 286, y: 92, w: 78, h: 34 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 214, fondo: K => K.c(130, 106, 100, 'fg') + K.c(130, 126, 74, 'fa') + K.c(130, 148, 46, 'ff') + K.c(286, 92, 50, 'fc'), aviso: avisa, bien: p => p.ok,
  });
  XG.marca('tumba-todos', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, p.nums[i], 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60, sol: p => idx(p.nums.length, i => p.nums[i] % p.a === 0 && p.nums[i] % p.b !== 0), aviso(on, p) { const i = on.findIndex((x, k) => x && (p.nums[k] % p.a || p.nums[k] % p.b === 0)); return i < 0 ? 'Falta otro que también la tumba.' : p.nums[i] % p.a ? `El ${p.nums[i]} no es múltiplo de ${p.a}: la frase no habla de él.` : `El ${p.nums[i]} es múltiplo de los dos: cumple la frase.`; }, bien: p => `Múltiplos de ${p.a} que no lo son de ${p.b}.`, texto: p => p.nums.filter(n => n % p.a === 0 && n % p.b).join(', '), pie: 'Toca todos los que tumban la frase.',
  });
  XG.ascensor('sube-circulos', 30, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-lo-5 · verdad y mentira
  const combos = n => Array.from({ length: 2 ** n }, (_, m) => Array.from({ length: n }, (_, i) => !!(m >> i & 1)));
  const YG = i => 30 + i * 48, gente = (K, p, i, on) => K.c(30, YG(i), 16, ['fa', 'fg', 'ff', 'fc'][i % 4]) + K.t(30, YG(i) + 5, p.gente[i].n[0], 's') + K.t(184, YG(i) + 5, `${p.gente[i].n}: «${p.gente[i].d}»`, 's');
  const filaG = p => p.gente.map((_, i) => ({ x: 170, y: YG(i), w: 332, h: 42 }));
  // Quiénes mienten: cada frase f(v) recibe quién dice la verdad.
  const reparto = p => combos(p.gente.length).filter(v => p.gente.every((g, i) => g.f(v) === v[i]));
  const mienten = nombre => XG.marca(nombre, {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: p => idx(p.gente.length, i => !reparto(p)[0][i]),
    aviso(on, p) { const v = on.map(x => !x), i = p.gente.findIndex((g, k) => g.f(v) !== v[k]); return v[i] ? `Con lo que marcaste, choca: si ${p.gente[i].n} dice la verdad, su frase debería cumplirse, y no se cumple.` : `Con lo que marcaste, choca: ${p.gente[i].n} mentiría, pero su frase se cumple.`; }, bien: p => p.ok, texto: p => `mienten ${idx(p.gente.length, i => !reparto(p)[0][i]).map(i => p.gente[i].n).join(', ')}`, pie: 'Toca a los que mienten.',
  });
  mienten('quien-miente-tres'); mienten('cadena-acusan');
  // Quién fue: cada frase f(c) según el culpable c; se cumple con p.v verdades.
  const culpables = p => idx(p.gente.length, c => p.gente.filter(g => g.f(c)).length === p.v);
  const culpable = nombre => XG.marca(nombre, {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: culpables,
    aviso(on, p) { if (on.filter(Boolean).length > 1) return `Es ${p.que}.`; const c = on.indexOf(true), k = p.gente.filter(g => g.f(c)).length; return `Con ${p.gente[c].n} habría ${k === 1 ? 'una verdad' : `${k} verdades`}, y debe haber ${p.v === 1 ? 'solo una' : p.v}.`; }, bien: p => p.ok, texto: p => p.gente[culpables(p)[0]].n, pie: 'Toca tu respuesta.',
  });
  culpable('tres-cofres'); culpable('culpable-una-verdad');
  XG.marca('tabla-sospechosos', {
    sitios: p => p.gente.flatMap((_, r) => [...p.gente.map((_, c) => ({ x: 148 + c * 62, y: 116 + r * 48, w: 54, h: 40 })), { x: 54, y: 116 + r * 48, w: 100, h: 40 }]), alto: () => 240, nombre: (p, i) => { const n = p.gente.length + 1, r = Math.floor(i / n), c = i % n; return c === n - 1 ? `fue ${p.gente[r].n}` : `si fue ${p.gente[r].n}, frase de ${p.gente[c].n}`; },
    cara(K, p, i, on) { const n = p.gente.length + 1, r = Math.floor(i / n), c = i % n; return c === n - 1 ? K.t(54, 121 + r * 48, `fue ${p.gente[r].n}`, on ? 's ta' : 's') : K.t(148 + c * 62, 122 + r * 48, VF(on), on ? 'b ta' : 'tm'); },
    fondo: (K, p) => p.gente.map((g, c) => K.t(148 + c * 62, 84, g.n, 's')).join('') + p.gente.map((g, i) => K.t(170, 18 + i * 20, `${g.n}: «${g.d}»`, 's tm')).join(''),
    sol: p => p.gente.flatMap((_, r) => [...p.gente.map((g, c) => (g.f(r) ? r * (p.gente.length + 1) + c : -1)), culpables(p).includes(r) ? r * (p.gente.length + 1) + p.gente.length : -1]).filter(i => i >= 0),
    aviso(on, p) { const n = p.gente.length + 1; for (let r = 0; r < p.gente.length; r++) for (let c = 0; c < n - 1; c++) if (on[r * n + c] !== p.gente[c].f(r)) return `Si fue ${p.gente[r].n}, la frase de ${p.gente[c].n} es ${VF(p.gente[c].f(r))}.`; return 'Las V y las F están bien; mira a la izquierda: en una sola fila falla una sola frase.'; }, bien: p => p.ok, texto: p => `fue ${p.gente[culpables(p)[0]].n}`, pie: 'Toca las casillas que valen V y, a la izquierda, quién fue.',
  });
  XG.marca('frases-opuestas', {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: p => p.par, aviso(on, p) { const l = idx(on.length, i => on[i]); if (l.length !== 2) return 'Son dos frases.'; const t = idx(p.gente.length, c => p.gente[l[0]].f(c) && p.gente[l[1]].f(c)), n = idx(p.gente.length, c => !p.gente[l[0]].f(c) && !p.gente[l[1]].f(c)); return t.length ? `Las dos serían verdad si fue ${p.gente[t[0]].n}.` : `Las dos serían falsas si fue ${p.gente[n[0]].n}.`; }, bien: p => p.ok, texto: p => p.par.map(i => p.gente[i].n).join(' y '), pie: 'Toca las dos frases que se contradicen.',
  });
  renglones('supone-choca', { w: 148, x: 256, y0: 68, fondo: (K, p) => K.t(170, 26, p.da, 'ta') });
  XG.ascensor('sube-mentira', 15, 1, neutro);
  Object.assign(XG, { renglones, frases });   // los usan otros mundos
})();
