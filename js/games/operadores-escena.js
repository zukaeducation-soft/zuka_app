// Ejercicios de «Operadores definidos» (pu-op-1 y pu-op-2) con las escenas de la explicación: la máquina de dos entradas, la tabla, el
// árbol de paréntesis y la balanza. Armazones en figura-kit.js, logica-kit.js, conteo-escena.js y proposiciones-escena.js.
(() => {
  const N = x => String(x).replace('-', '−'), P = x => (x < 0 ? `(${N(x)})` : N(x));
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a mirar la receta.', 'Le faltó. Vuelve a mirar la receta.'];
  const maq = (K, y, a, s, b, r, cls = 'fg') => K.r(22, y, 62, 44, 'fa', 10) + K.t(53, y + 29, a, 'b') + K.t(106, y + 29, s, 'b') + K.r(128, y, 62, 44, 'fa', 10) + K.t(159, y + 29, b, 'b') + K.ar(200, y + 22, 236, y + 22, 'lm') + K.r(242, y, 78, 44, cls, 10) + K.t(281, y + 29, r, 'b');
  // Tabla de una operación: fila del primero, columna del segundo.
  const tabK = (K, p, ch) => { const n = p.letras.length, x = j => 46 + j * 32, y = i => 46 + i * ch; return K.l(8, 28, 30 + n * 32, 28, 'lm') + K.l(30, 6, 30, 28 + n * ch, 'lm') + K.t(19, 22, '✱', 'tm') + p.letras.map((l, i) => K.t(x(i), 21, l, 'b ta') + K.t(19, y(i) + 5, l, 'b tg') + p.letras.map((_, j) => K.t(x(j), y(i) + 5, p.tab[i][j])).join('')).join(''); };
  const tablero = (nombre, ch) => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: 306, y: 34 + i * 52, w: 56, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: p => Math.max(34 + p.metas.length * 52 - 26, 32 + p.letras.length * ch),
    fondo: (K, p) => tabK(K, p, ch) + p.et.map((t, i) => K.t(270, 39 + i * 52, t, 's', 'end')).join(''), aviso: avisa, bien: p => p.ok,
  });

  // ------------------------------------------------------------------------------------------------ pu-op-1 · operaciones nuevas
  XG.rotula('arma-receta', {
    slots: () => [44, 114].flatMap(y => [{ x: 134, y, w: 48, h: 40 }, { x: 200, y, w: 48, h: 40 }, { x: 296, y, w: 60, h: 40 }]), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.et.map((t, i) => `${t}: ${p.metas[i * 3 + 2]}`).join('; '), alto: () => 144, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => [44, 114].map((y, i) => K.t(44, y + 5, `${p.et[i]} =`, 'ta') + K.t(96, y + 5, '4 ·') + K.t(167, y + 5, '−', 'b') + K.t(232, y - 8, '2', 's') + K.t(250, y + 5, '=', 'b')).join(''),
  });
  XG.figura('maquina-ida-vuelta', {
    ini: () => ({ a: 0, b: 0 }), manijas: p => [{ k: 'a', min: 0, max: 9, paso: 1, et: 'entrada a' }, { k: 'b', min: 0, max: 9, paso: 1, et: 'entrada b' }], ok: (v, p) => p.f(v.a, v.b) === p.m[0] && p.f(v.b, v.a) === p.m[1], sol(p) { for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) if (p.f(a, b) === p.m[0] && p.f(b, a) === p.m[1]) return { a, b }; return null; },
    texto: p => p.texto, alto: () => 226, ms: 900, pie: 'Mueve las dos entradas.',
    dib(v, K, p, f) { const s = f >= 1, r = [p.f(v.a, v.b), p.f(v.b, v.a)]; return [0, 1].map(i => maq(K, 6 + i * 56, K.sig(i ? v.b : v.a), '★', K.sig(i ? v.a : v.b), s ? N(Math.round(r[i])) : '?', s ? (r[i] === p.m[i] ? 'fo' : 'ff') : 'fg')).join(''); },
    aviso(v, p) { const r = [p.f(v.a, v.b), p.f(v.b, v.a)]; return `Arriba sale ${N(r[0])} y abajo ${N(r[1])}: ${r[0] === p.m[0] ? 'falla la de abajo' : r[1] === p.m[1] ? 'falla la de arriba' : 'fallan las dos'}.`; }, bien: p0 => `Con ${p0.a} y ${p0.b} salen los dos: el orden cambia el resultado.`,
  });
  XG.frases('cuales-conmutan');
  XG.cuenta('entran-negativos', 62, (K, p) => maq(K, 6, p.a, '★', p.b, '?'));
  tablero('lee-operacion', 34);
  const CX = j => 96 + j * 64, CY = i => 50 + i * 43;
  XG.marca('tabla-desigual', {
    sitios: p => p.letras.flatMap((_, i) => p.letras.map((_, j) => ({ x: CX(j), y: CY(i), w: 56, h: 38 }))), cara: (K, p, k) => { const n = p.letras.length, i = Math.floor(k / n), j = k % n; return K.t(CX(j), CY(i) + 6, p.tab[i][j], 'b'); }, alto: () => 202, nombre: (p, k) => { const n = p.letras.length; return `${p.letras[Math.floor(k / n)]} con ${p.letras[k % n]}: ${p.tab[Math.floor(k / n)][k % n]}`; },
    fondo: (K, p) => K.t(36, 22, '✱', 'tm') + p.letras.map((l, i) => K.t(CX(i), 22, l, 'b ta') + K.t(36, CY(i) + 6, l, 'b tg')).join(''),
    sol: p => { const n = p.letras.length, o = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (p.tab[i][j] !== p.tab[j][i]) o.push(i * n + j); return o; },
    aviso(on, p) { const n = p.letras.length, L = p.letras; for (let k = 0; k < on.length; k++) { const i = Math.floor(k / n), j = k % n; if (on[k] && i === j) return `${L[i]} ✱ ${L[i]} es lo mismo al derecho y al revés.`; if (on[k] && p.tab[i][j] === p.tab[j][i]) return `${L[i]} ✱ ${L[j]} y ${L[j]} ✱ ${L[i]} dan lo mismo.`; } for (let k = 0; k < on.length; k++) { const i = Math.floor(k / n), j = k % n; if (on[k] && !on[j * n + i]) return `Si ${L[i]} ✱ ${L[j]} cambia al voltearlo, la casilla de ${L[j]} ✱ ${L[i]} también cuenta.`; } return 'Falta otra pareja que cambia al voltearla.'; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las casillas que cambian.',
  });
  XG.renglones('neutro-de-cada', { w: 64, x: 270 });
  XG.ascensor('sube-operador', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-op-2 · anidados y ecuaciones
  XG.renglones('dos-parentesis', { w: 64, x: 270 });
  XG.rotula('arbol-operador', {
    slots: () => [{ x: 90, y: 96, w: 64, h: 40 }, { x: 250, y: 96, w: 64, h: 40 }, { x: 170, y: 28, w: 64, h: 40 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 178, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.l(150, 48, 100, 76, 'lm') + K.l(190, 48, 240, 76, 'lm') + K.t(170, 74, p.s[2], 'b ta') + [90, 250].map((x, i) => K.l(x - 10, 116, x - 32, 140, 'lm') + K.l(x + 10, 116, x + 32, 140, 'lm') + K.t(x, 138, p.s[i], 'b ta') + [0, 1].map(j => K.r(x - 52 + j * 64, 140, 40, 32, 'fc', 8) + K.t(x - 32 + j * 64, 162, p.h[i * 2 + j], 'b')).join('')).join(''),
  });
  XG.renglones('lugar-x', { w: 148, x: 254 });
  XG.figura('iguala-lados', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'x' }], ok: (v, p) => p.l(v.x) === p.r(v.x), sol(p) { for (let x = 0; x <= p.max; x++) if (p.l(x) === p.r(x)) return { x }; return null; }, texto: p => p.texto, alto: () => 208, ms: 1100, pie: 'Mueve la x.',
    dib(v, K, p, f) { const a = p.l(v.x), b = p.r(v.x), d = Math.max(-26, Math.min(26, (b - a) * 2)) * f, s = f >= 1, c = s ? (a === b ? 'fo' : 'ff') : ''; return K.l(80, 88 - d, 260, 88 + d, 'gr') + K.p([[170, 88], [154, 138], [186, 138]], 'fc') + K.r(34, 46 - d, 92, 40, c || 'fa', 8) + K.t(80, 72 - d, s ? N(Math.round(a)) : p.et[0], 'b') + K.r(214, 46 + d, 92, 40, c || 'fg', 8) + K.t(260, 72 + d, s ? N(Math.round(b)) : p.et[1], 'b'); },
    aviso: (v, p) => `Con x = ${v.x}, la izquierda vale ${p.l(v.x)} y la derecha ${p.r(v.x)}.`, bien: (v, p) => `Los dos lados valen ${p.l(v.x)}.`,
  });
  tablero('cadena-en-tabla', 38);
  XG.marca('x-consigo', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, N(p.nums[i]), 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60, nombre: (p, i) => `x igual a ${N(p.nums[i])}`,
    sol: p => p.nums.map((_, i) => i).filter(i => p.f(p.nums[i], p.nums[i]) === p.t), aviso(on, p) { const i = on.findIndex((x, k) => x && p.f(p.nums[k], p.nums[k]) !== p.t); return i < 0 ? 'Falta otro número que también cumple.' : `${P(p.nums[i])} ◆ ${P(p.nums[i])} da ${N(p.f(p.nums[i], p.nums[i]))}.`; }, bien: p => p.ok, texto: p => p.nums.filter(x => p.f(x, x) === p.t).map(N).join(' y '), pie: 'Toca todos los que cumplen.',
  });
  XG.rotula('deshace-operador', {
    slots: () => [{ x: 44, y: 62, w: 64, h: 42 }, { x: 170, y: 62, w: 64, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' → '), alto: () => 112, aviso: (q, p) => { const i = q[1][0] !== p.metas[1] ? 1 : 0; return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },   bien: p => p.ok,   // se deshace desde el final
    fondo: (K, p) => K.ar(82, 62, 132, 62, 'lm') + K.ar(208, 62, 260, 62, 'lm') + K.t(107, 46, p.s[0], 'b ta') + K.t(234, 46, p.s[1], 'b ta') + K.r(264, 41, 68, 42, 'fo', 10) + K.t(298, 68, p.sale, 'b') + K.t(44, 104, 'entra x', 's tm') + K.t(170, 104, 'en la mitad', 's tm') + K.t(298, 104, 'sale', 's tm'),
  });
  XG.ascensor('sube-anidado', 40, 1, neutro);
})();
