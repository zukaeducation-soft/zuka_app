// Ejercicios de «Ecuaciones y planteamiento» (pu-ec-1 a pu-ec-3) con las escenas de la explicación: la balanza, las edades que crecen
// juntas, los cambios de uno por otro, los recibos y la recta. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−'), S = x => (x < 0 ? `(${N(x)})` : N(x));
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Comprueba ese número en el enunciado.', 'Le faltó. Comprueba ese número en el enunciado.'];

  // ------------------------------------------------------------------------------------------------ pu-ec-1 · del texto a la ecuación
  XG.renglones('traduce-frases', { w: 104, x: 278 });
  XG.frases('sigue-equilibrada');
  XG.rotula('pasos-despeje', {
    slots: () => [0, 1, 2].map(i => ({ x: 200, y: 70 + i * 50, w: 130, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 196, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(200, 28, p.ec, 'B ta') + p.et.map((t, i) => K.t(122, 75 + i * 50, t, 's tm', 'end')).join(''),
  });
  XG.renglones('misma-x', { w: 120, x: 266 });
  XG.figura('ancho-del-marco', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 1, max: p.max, paso: 1, et: 'ancho' }], ok: (v, p) => 2 * (v.x + p.k * v.x - p.q) === p.P, sol: p => ({ x: (p.P / 2 + p.q) / (p.k + 1) }), texto: p => `ancho ${(p.P / 2 + p.q) / (p.k + 1)}`, alto: () => 182, ms: 900, pie: 'Mueve el ancho.',
    dib(v, K, p, f) { const u = 9, L = p.k * v.x - p.q; return K.r(170 - L * u / 2, 62 - v.x * u / 2, L * u, v.x * u, 'fa', 2) + K.f(f, K.t(170, 70, N(L), 'b') + K.t(170, 128, `borde ${N(2 * (v.x + L))}`, 's')); },
    aviso: (v, p) => `Con ancho ${v.x} el largo es ${p.k * v.x - p.q} y el borde mide ${2 * (v.x + p.k * v.x - p.q)}.`, bien: (v, p) => `${v.x} por ${p.k * v.x - p.q}: el borde mide ${p.P}.`,
  });
  XG.cuenta('cinco-seguidos', 56, (K, p) => Array.from({ length: p.n }, (_, i) => K.r(170 + (i - p.n / 2) * 46 + 3, 10, 40, 38, i === 2 ? 'fg' : 'fa', 6) + K.t(170 + (i - (p.n - 1) / 2) * 46, 34, ['x', 'x+1', 'x+2', 'x+3', 'x+4'][i], 's')).join(''));
  XG.cuenta('dos-cuerdas', 66, K => K.r(40, 10, 84, 14, 'fa', 7) + K.r(40, 38, 84, 14, 'fg', 7) + K.r(124, 38, 84, 14, 'fg', 7) + K.r(208, 38, 34, 14, 'ff', 7) + K.t(82, 34, 'x', 's') + K.t(225, 66, '5', 's tf'));
  XG.ascensor('sube-ecuacion', 60, 1, neutro);

  // ------------------------------------------------------------------------------------------- pu-ec-2 · edades, mezclas y monedas
  XG.figura('hace-cuantos', {
    ini: () => ({ t: 0 }), manijas: p => [{ k: 't', min: 0, max: p.b - 1, paso: 1, et: 'años hacia atrás' }], ok: (v, p) => p.a - v.t === p.k * (p.b - v.t), sol: p => ({ t: (p.k * p.b - p.a) / (p.k - 1) }), texto: p => `hace ${(p.k * p.b - p.a) / (p.k - 1)} años`, alto: () => 172, ms: 900, pie: 'Mueve los años.',
    dib(v, K, p, f) { const u = 6, A = p.a - v.t, B = p.b - v.t; return K.t(24, 18, p.na, 's tm', 'start') + K.r(24, 24, p.a * u, 26, 'fc') + K.r(24, 24, A * u, 26, 'fa') + K.t(24, 72, p.nb, 's tm', 'start') + K.r(24, 78, p.b * u, 26, 'fc') + K.r(24, 78, B * u, 26, 'fg') + K.f(f, K.t(34 + p.a * u, 43, N(A), 'ta', 'start') + K.t(34 + p.b * u, 97, N(B), 'tg', 'start')) + K.f(1 - f, K.t(34 + p.a * u, 43, p.a, 's tm', 'start') + K.t(34 + p.b * u, 97, p.b, 's tm', 'start')); },
    aviso: (v, p) => `Hace ${v.t} ${v.t === 1 ? 'año' : 'años'} tenían ${p.a - v.t} y ${p.b - v.t}, y ${p.k} veces ${p.b - v.t} son ${p.k * (p.b - v.t)}.`, bien: (v, p) => `${p.a - v.t} es ${p.k} veces ${p.b - v.t}.`,
  });
  XG.rotula('tabla-edades', {
    slots: () => [66, 120].flatMap(y => [{ x: 196, y, w: 84, h: 42 }, { x: 290, y, w: 84, h: 42 }]), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 148, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => [[110, 'hoy'], [196, p.col[0]], [290, p.col[1]]].map(([x, t]) => K.t(x, 28, t, 's tm')).join('') + K.l(10, 40, 332, 40, 'lm') + p.fila.map(([n, h], i) => K.t(14, 71 + i * 54, n, '', 'start') + K.t(110, 71 + i * 54, h, 'b ta')).join(''),
  });
  XG.cuenta('todos-iguales', 56, (K, p) => Array.from({ length: p.n }, (_, i) => K.r(22 + (i % 9) * 34, 4 + Math.floor(i / 9) * 26, 28, 20, 'fc', 4)).join(''));
  XG.figura('aranas-hormigas', {
    ini: () => ({ k: 0 }), manijas: p => [{ k: 'k', min: 0, max: p.n, paso: 1, et: 'arañas' }], ok: (v, p) => 6 * p.n + 2 * v.k === p.T, sol: p => ({ k: (p.T - 6 * p.n) / 2 }), texto: p => `${(p.T - 6 * p.n) / 2} arañas`, alto: () => 182, ms: 900, pie: 'Mueve la cantidad de arañas.',
    dib(v, K, p, f) { let h = ''; for (let i = 0; i < p.n; i++) { const x = 50 + (i % 6) * 48, y = 34 + Math.floor(i / 6) * 56, n = i < R(v.k) ? 8 : 6; for (let j = 0; j < n; j++) h += K.l(x, y, ...K.at(x, y, 19, (j + 0.5) * 360 / n), 'lr'); h += K.c(x, y, 10, n === 8 ? 'ff' : 'fg'); } return h + K.f(f, K.t(316, 128, `${6 * p.n + 2 * R(v.k)} patas`, 's', 'end')); },
    aviso: (v, p) => `Con ${v.k} ${v.k === 1 ? 'araña' : 'arañas'} hay ${6 * p.n + 2 * v.k} patas.`, bien: (v, p) => `${8 * v.k} de arañas y ${6 * (p.n - v.k)} de hormigas.`,
  });
  XG.figura('aguado', {
    ini: () => ({ b: 0 }), manijas: p => [{ k: 'b', min: 0, max: p.max, paso: 1, et: 'litros de agua' }], ok: (v, p) => p.pu * 100 === p.d * (p.L + v.b), sol: p => ({ b: p.pu * 100 / p.d - p.L }), texto: p => `${p.pu * 100 / p.d - p.L} L`, alto: () => 186, ms: 900, pie: 'Agrega agua.',
    dib(v, K, p, f) { const u = 10, y = 126; return K.r(120, y - (p.L + v.b) * u, 100, (p.L + v.b) * u, 'fc', 3) + K.r(120, y - p.L * u, 100, p.L * u, 'fa', 3) + K.r(120, y - p.pu * u, 100, p.pu * u, 'fg', 3) + K.t(112, y - p.pu * u / 2 + 5, 'pulpa', 's tg', 'end') + K.t(112, y - (p.L + p.pu) * u / 2 + 5, 'jugo', 's ta', 'end') + (v.b > 0.6 ? K.t(228, y - (p.L + v.b / 2) * u + 5, 'agua', 's tm', 'start') : '') + K.f(f, K.t(290, 70, `${N(p.pu * 100 / (p.L + v.b))} %`, 'b')); },
    aviso: (v, p) => `La pulpa son ${p.pu} L de ${p.L + v.b} L: ${N(p.pu * 100 / (p.L + v.b))} %.`, bien: (v, p) => `${p.pu} L de pulpa en ${p.L + v.b} L.`,
  });
  XG.marca('precio-posible', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, `${p.nums[i]} mil`, ''), alto: () => 128,
    sol: p => p.nums.map((_, i) => i).filter(i => p.nums[i] > p.a && p.nums[i] < (p.a + p.b) / 2), aviso(on, p) { const i = on.findIndex((x, k) => x && !(p.nums[k] > p.a && p.nums[k] < (p.a + p.b) / 2)), n = p.nums[i], m = (p.a + p.b) / 2; return i < 0 ? 'Falta otro precio que también se puede.' : n <= p.a || n >= p.b ? `${n} mil no está entre los dos precios.` : n === m ? `${n} mil saldría con la misma cantidad de los dos.` : `Para ${n} mil hace falta más del caro.`; }, bien: p => p.ok, texto: p => p.nums.filter(n => n > p.a && n < (p.a + p.b) / 2).join(', '), pie: 'Toca todos los posibles.',
  });
  XG.renglones('se-llevan-igual', { w: 56, x: 290 });
  XG.ascensor('sube-edades', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-ec-3 · sistemas y desigualdades
  const rec = (K, p) => p.f.map(([a, b, s], i) => { const y = 18 + i * 32; let h = ''; for (let k = 0; k < a; k++) h += K.r(18 + k * 26, y - 11, 22, 22, 'fa', 5); for (let k = 0; k < b; k++) h += K.c(134 + k * 26, y, 11, 'fg'); return h + K.t(278, y + 5, `= ${s}`, 'b', 'start'); }).join('');
  XG.cuenta('resta-recibos', 70, rec);
  XG.renglones('iguala-recibos', { w: 56, x: 290 });
  XG.figura('lleva-ventaja', {
    ini: () => ({ m: 1 }), manijas: p => [{ k: 'm', min: 1, max: p.max, paso: 1, et: 'el menor' }], ok: (v, p) => 2 * v.m + p.d === p.s, sol: p => ({ m: (p.s - p.d) / 2 }), texto: p => `${(p.s - p.d) / 2} y ${(p.s + p.d) / 2}`, alto: () => 172, ms: 900, pie: 'Mueve el menor.',
    dib(v, K, p, f) { const u = 7; return K.t(24, 18, 'mayor', 's tm', 'start') + K.r(24, 24, v.m * u, 26, 'fa') + K.r(24 + v.m * u, 24, p.d * u, 26, 'ff') + K.t(24 + (v.m + p.d / 2) * u, 43, p.d, 's') + K.t(24, 72, 'menor', 's tm', 'start') + K.r(24, 78, v.m * u, 26, 'fg') + K.f(f, K.t(300, 97, `suman ${N(2 * v.m + p.d)}`, 's', 'end')); },
    aviso: (v, p) => `Serían ${v.m} y ${v.m + p.d}: suman ${2 * v.m + p.d}.`, bien: (v, p) => `${v.m} + ${v.m + p.d} = ${p.s}.`,
  });
  const PX = x => 70 + x * 25, PY = y => 186 - y * 21;
  XG.figura('punto-comun', {
    ini: () => ({ x: 0, y: 0 }), manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [8, 8], paso: 1, r: 10, en: v => [PX(v.x), PY(v.y)], de: (x, y) => [(x - 70) / 25, (186 - y) / 21] }], ok: (v, p) => p.e.every(([a, b, c]) => a * v.x + b * v.y === c), sol(p) { for (let x = 0; x < 9; x++) for (let y = 0; y < 9; y++) if (p.e.every(([a, b, c]) => a * x + b * y === c)) return { x, y }; return null; }, texto: p => p.texto, alto: () => 212, ms: 900, pie: 'Arrastra el punto.',
    dib(v, K, p, f) { let h = ''; for (let i = 0; i < 9; i++) h += K.l(PX(i), PY(0), PX(i), PY(8), i ? 'lr' : 'lm') + K.l(PX(0), PY(i), PX(8), PY(i), i ? 'lr' : 'lm') + K.t(PX(i), 204, i, 's tm') + (i ? K.t(58, PY(i) + 5, i, 's tm', 'end') : ''); return h + K.t(290, 190, 'x', 'ta') + K.t(70, 14, 'y', 'tg') + K.f(f, p.l.map(([a, b, c, d], i) => K.l(PX(a), PY(b), PX(c), PY(d), i ? 'lg gr' : 'la gr')).join('')) + (f ? K.c(PX(v.x), PY(v.y), 7, 'fF') : ''); },
    aviso(v, p) { const i = p.e.findIndex(([a, b, c]) => a * v.x + b * v.y !== c); return `Con x = ${v.x} y y = ${v.y} ${p.e.every(([a, b, c]) => a * v.x + b * v.y !== c) ? 'no se cumple ninguna de las dos' : `no se cumple la ${i ? 'segunda' : 'primera'}`}.`; }, bien: () => 'Es el único punto que está en las dos rectas.',
  });
  XG.renglones('voltea-o-sigue', { w: 104, x: 278 });
  const X = x => 170 + x * 22;
  XG.figura('pinta-intervalo', {
    ini: () => ({ b: 0, dir: 1, ab: 0 }), manijas: () => [{ k: 'b', min: -6, max: 6, paso: 1, r: 12, en: v => [X(v.b), 16], de: x => (x - 170) / 22 }, { k: 'dir', min: -1, max: 1, paso: 2, et: 'sentido', rot: v => (v.dir > 0 ? '→' : '←') }, { k: 'ab', min: 0, max: 1, paso: 1, et: 'el borde: lleno entra, vacío no entra', rot: v => (v.ab ? '○' : '●') }],
    ok: (v, p) => v.b === p.b && v.dir === p.dir && v.ab === p.ab, sol: p => ({ b: p.b, dir: p.dir, ab: p.ab }), texto: p => p.texto, alto: () => 182, ms: 900, pie: 'Mueve el borde, el sentido y si el borde entra.',
    dib(v, K) { const d = v.dir > 0 ? 1 : -1; let h = K.l(12, 52, 328, 52, 'lm'); for (let k = -7; k <= 7; k++) h += K.l(X(k), 48, X(k), 56, 'lm') + K.t(X(k), 80, N(k), k ? 's tm' : 's'); return h + K.l(X(v.b), 28, X(v.b), 44, 'lm') + K.ar(X(v.b) + 8 * d, 52, d > 0 ? 328 : 12, 52, 'la gr') + K.c(X(v.b), 52, 8, v.ab > 0.5 ? 'fn' : 'fA'); },
    aviso(v, p) { const t = x => `${N(p.n)} ${p.m < 0 ? '−' : '+'} ${Math.abs(p.m)} · ${S(x)} da ${N(p.n + p.m * x)}`, si = x => p.n + p.m * x > p.c; if (v.b === p.b && v.dir === p.dir) return 'Mira el borde: ¿cumple él mismo?'; const x = v.b + v.dir; return !si(x) ? `Tu zona incluye el ${N(x)}, y ${t(x)}: no cumple.` : v.ab === 0 && !si(v.b) ? `Tu zona incluye el ${N(v.b)}, y ${t(v.b)}: no cumple.` : v.dir !== p.dir ? 'Tu zona sigue sin parar hacia números que no cumplen.' : 'Los de tu zona cumplen, pero quedan otros por fuera.'; }, bien: p => 'Al dividir entre un negativo, el sentido se volteó.',
  });
  XG.marca('enteros-entre', {
    sitios: p => p.nums.map((_, i) => ({ x: 38 + (i % 5) * 66, y: 34 + Math.floor(i / 5) * 60, w: 56, h: 48 })), cara: (K, p, i) => K.t(38 + (i % 5) * 66, 41 + Math.floor(i / 5) * 60, N(p.nums[i]), 'b'), alto: () => 128,
    sol: p => p.nums.map((_, i) => i).filter(i => p.si(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.si(p.nums[k])); return i < 0 ? 'Falta otro que cumple las dos partes.' : `Con x = ${N(p.nums[i])}, ${p.ex} da ${N(p.g(p.nums[i]))}: no cumple.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.si).map(N).join(', '), pie: 'Toca todos los que cumplen.',
  });
  XG.ascensor('sube-sistema', 40, 1, neutro);
})();
