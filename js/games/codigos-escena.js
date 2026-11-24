// Ejercicios de «Codificación» (pu-cd-1 y pu-cd-2) con las escenas de la explicación: disco de letras, letras con valor, bombillos y
// máquinas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', N = l => ABC.indexOf(l) + 1;
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const X = (n, i, w = 60) => R(170 + (i - (n - 1) / 2) * w);
  // Alfabeto en dos renglones (sin números mientras se responde).
  const LX = i => 22 + (i % 13) * 24.6, LY = (i, y) => y + (i < 13 ? 0 : 1) * 58;
  const alfabeto = (K, y, on = '') => [...ABC].map((l, i) => K.t(22 + (i % 13) * 24.6, y + (i < 13 ? 0 : 24), l, on.includes(l) ? 'ta' : 's tm')).join('');
  const flecha = (K, y, a, b) => K.t(136, y, a, 'b', 'end') + K.ar(148, y - 6, 186, y - 6, 'lm') + K.t(200, y, b, 'b ta', 'start');

  // ------------------------------------------------------------------------------------------- pu-cd-1 · claves de sustitución
  // Cuántos lugares avanza la clave.  params { de, a }   v { k }
  XG.figura('avanza-clave', {
    ini: () => ({ k: 1 }), manijas: () => [{ k: 'k', min: 0, max: 25, paso: 1, et: 'lugares' }], ok: (v, p) => v.k === (N(p.a) - N(p.de) + 26) % 26, sol: p => ({ k: (N(p.a) - N(p.de) + 26) % 26 }), texto: p => `${(N(p.a) - N(p.de) + 26) % 26} lugares`, alto: () => 262, ms: 1900, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const A = i => 90 - i * 360 / 26, a = N(p.de) - 1, k = R(R(v.k) * f); let h = K.c(170, 106, 92, 'fn'); for (let i = 0; i < 26; i++) { const [x, y] = K.at(170, 106, 92, A(i)), on = ABC[i] === p.de ? 'fa' : ABC[i] === p.a ? 'fg' : ''; h += K.c(x, y, 11, 'fop') + (on ? K.c(x, y, 11, on) : '') + K.t(x, y + 5, ABC[i], 's'); } if (f) { for (let j = 1; j <= k; j++) h += K.c(...K.at(170, 106, 70, A(a + j)), 4, ABC[(a + j) % 26] === p.a ? 'fG' : 'fA'); h += K.t(170, 112, `${k}`, 'B ta'); } else h += K.t(170, 112, `${p.de} → ${p.a}`, 'b ta'); return h; },
    lee: (v, p) => `$\\text{${p.de}} \\to \\text{${ABC[(N(p.de) - 1 + R(v.k)) % 26]}}$`, aviso(v, p) { const m = (N(p.a) - N(p.de) + 26) % 26; return v.k === 26 - m ? `Contaste de la ${p.a} a la ${p.de}: hay que ir de la ${p.de} a la ${p.a}.` : v.k === m + 1 ? `La ${p.de} es el punto de partida: no se cuenta.` : `Con ${v.k}, la ${p.de} cae en la ${ABC[(N(p.de) - 1 + v.k) % 26]}.`; }, bien: () => 'Después de la Z sigue la A.',
  });
  // Letras que se ponen en fila.  params { w (letras de arriba), fichas, metas, mira, trampas?, ok }
  const letras = (nombre, rot) => XG.rotula(nombre, {
    slots: p => [...p.metas].map((_, i) => ({ x: X(p.metas.length, i), y: 118, w: 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 212,
    fondo: (K, p) => [...p.w].map((l, i) => { const x = X(p.w.length, i); return K.t(x, 50, l, 'B') + K.ar(x, 60, x, 90, 'lm'); }).join('') + K.t(170, 18, rot, 's tm') + alfabeto(K, 174), aviso: avisa, bien: p => p.ok,
  });
  letras('cifra-palabra', 'se cifra'); letras('descifra-mensaje', 'se descifra');
  XG.rotula('suma-letras', {
    slots: p => p.metas.map((_, i) => ({ x: R(40 + i * 62 + (i === p.w.length ? 12 : 0)), y: 82, w: i === p.w.length ? 60 : 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 166,
    fondo: (K, p) => [...p.w].map((l, i) => K.t(40 + i * 62, 48, l, 'B ta') + K.t(71 + i * 62 + (i === p.w.length - 1 ? 3 : 0), 88, i === p.w.length - 1 ? '=' : '+', 'b')).join('') + K.t(40 + p.w.length * 62 + 12, 48, 'total', 's tm') + alfabeto(K, 132), aviso: avisa, bien: p => p.ok,
  });
  // Qué letra falta.  params { w ('M_L'), total, meta }   v { i }
  const suma = (p, l) => [...p.w].reduce((a, x) => a + N(x === '_' ? l : x), 0);
  XG.figura('letra-falta', {
    ini: () => ({ i: 18 }), manijas: () => [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[R(v.i)], en: v => [LX(R(v.i)), LY(R(v.i), 96)], de: (x, y) => Math.max(0, Math.min(12, R((x - 22) / 24.6))) + (y > 125 ? 13 : 0) }], ok: (v, p) => ABC[v.i] === p.meta, sol: p => ({ i: N(p.meta) - 1 }), texto: p => `${p.w.replace('_', p.meta)}: ${suma(p, p.meta)}`, alto: () => 192, pie: 'Arrastra el señalador por el alfabeto.',
    dib: (v, K, p, f) => [...p.w].map((l, i) => K.r(X(p.w.length, i, 50) - 21, 8, 42, 44, 'fc', 9) + K.t(X(p.w.length, i, 50), 38, l === '_' ? (f ? ABC[R(v.i)] : '?') : l, l === '_' ? 'b ta' : 'b') + K.f(f, K.t(X(p.w.length, i, 50), 70, N(l === '_' ? ABC[R(v.i)] : l), 's tg'))).join('') + K.t(316, 36, `= ${p.total}`, 'b tg', 'end') + [...ABC].map((l, i) => K.c(LX(i), LY(i, 96), 11.5, f && i === R(v.i) ? (l === p.meta ? 'fo' : 'ff') : 'fc') + K.t(LX(i), LY(i, 96) + 5, l, 's') + (i % 5 === 4 || f ? K.f(i % 5 === 4 ? 1 : f, K.t(LX(i), LY(i, 96) + 27, i + 1, 's tm')) : '')).join(''),
    lee: (v, p) => `$${[...p.w].map(l => N(l === '_' ? ABC[R(v.i)] : l)).join(' + ')} = ${suma(p, ABC[R(v.i)])}$`, aviso: (v, p) => `Con la ${ABC[v.i]} la palabra vale ${suma(p, ABC[v.i])}: ${suma(p, ABC[v.i]) > p.total ? 'se pasa' : 'le falta'}.`, bien: p => 'Al total se le quitan las letras que se conocen.',
  });
  const BIT = [16, 8, 4, 2, 1], focos = (K, b, y) => BIT.map((n, i) => K.c(50 + i * 60, y, 22, b?.[i] === '1' ? 'fG' : 'fc') + K.t(50 + i * 60, y + 6, n, b?.[i] === '1' ? 'tc' : 'tm')).join('');
  XG.marca('prende-focos', {
    sitios: () => BIT.map((_, i) => ({ x: 50 + i * 60, y: 66, w: 52, h: 60 })), cara: (K, p, i, on) => K.c(50 + i * 60, 60, 18, on ? 'fG' : 'fc') + K.t(50 + i * 60, 66, BIT[i], on ? 'tc' : 'tm') + K.t(50 + i * 60, 90, on ? '1' : '0', 's'), alto: () => 108, fondo: (K, p) => K.t(170, 22, `número: ${p.n}`, 'b ta'), nombre: (p, i) => `bombillo de ${BIT[i]}`,
    sol: p => BIT.map((b, i) => (p.n & b ? i : -1)).filter(i => i >= 0), aviso(on, p) { const s = BIT.reduce((a, b, i) => a + (on[i] ? b : 0), 0); return `Los prendidos suman ${s}: ${s > p.n ? 'se pasa' : 'le falta'}.`; }, bien: p => 'Primero el más grande que quepa, y sigue lo que falta.', texto: p => `${BIT.filter(b => p.n & b).join(' + ')} = ${p.n}`, pie: 'Toca los bombillos que van prendidos.',
  });
  XG.cuenta('lee-tablero', 92, (K, p) => focos(K, p.b, 42) + [...p.b].map((b, i) => K.t(50 + i * 60, 86, b, 'b')).join(''));
  XG.ascensor('sube-codigo', 50, 1, ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.']);

  // ------------------------------------------------------------------------------------------------ pu-cd-2 · deducir la regla
  const maq = (K, e, y) => e.map(([a, b], i) => flecha(K, y + i * 28, a, b)).join('');
  XG.marca('regla-todos', {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 116 + i * 44, w: 320, h: 38 })), cara: (K, p, i) => K.t(170, 121 + i * 44, p.casos[i].t, 's'), alto: p => 96 + p.casos.length * 44, fondo: (K, p) => maq(K, p.e, 28),
    sol: p => p.casos.map((_, i) => i).filter(i => p.e.every(([a, b]) => p.casos[i].f(a) === b)), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.e.every(([a, b]) => p.casos[k].f(a) === b)); if (i < 0) return 'Falta otra que también funciona con los tres.'; const [a, b] = p.e.find(([a, b]) => p.casos[i].f(a) !== b); return `«${p.casos[i].t}» con ${a} da ${p.casos[i].f(a)}, no ${b}.`; }, bien: () => 'Una regla sirve si funciona con todos los ejemplos.', texto: p => p.casos.filter(c => p.e.every(([a, b]) => c.f(a) === b)).map(c => c.t).join('; '), pie: 'Toca todas las reglas que sirven.',
  });
  XG.rotula('maquina-cifras', {
    slots: () => [{ x: 94, y: 138, w: 120, h: 42 }, { x: 246, y: 138, w: 120, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(': '), alto: () => 186, fondo: (K, p) => maq(K, p.e, 28) + K.t(94, 178, 'con las cifras', 's tm') + K.t(246, 178, `con ${p.ask}`, 's tm'), aviso: avisa, bien: p => p.ok,
  });
  XG.cuenta('maquina-dos-pasos', 96, (K, p) => maq(K, p.e, 28));
  const puestos = nombre => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: X(p.metas.length, i), y: 130, w: 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 160, fondo: (K, p) => flecha(K, 32, p.de, p.a) + K.t(170, 86, p.ask, 'b ta') + K.t(170, 62, p.rot, 's tm'), aviso: avisa, bien: p => p.ok,
  });
  puestos('puestos-cambian'); puestos('devuelve-puestos');
  XG.rotula('avances-crecen', {
    slots: p => p.metas.map((_, i) => ({ x: X(3, i % 3, 74), y: i < 3 ? 98 : 148, w: 60, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' '), alto: () => 222, fondo: (K, p) => flecha(K, 28, p.de, p.a) + [...p.ask].map((l, i) => K.t(X(3, i, 74), 68, l, 'B')).join('') + K.t(8, 103, 'avance', 's tm', 'start') + K.t(8, 153, 'letra', 's tm', 'start') + alfabeto(K, 190), aviso: avisa, bien: p => p.ok,
  });
  XG.rotula('clave-comparada', {
    slots: p => p.metas.map((_, i) => ({ x: X(p.metas.length, i, 64), y: 136, w: 54, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 168, fondo: (K, p) => p.filas.map((s, r) => [...s].map((t, i) => K.r(86 + r * 168 + (i - 1) * 46 - 20, 10, 40, 44, 'fc', 9) + K.t(86 + r * 168 + (i - 1) * 46, 38, t, 'b ta')).join('')).join('') + [...p.ask].map((l, i) => K.t(X(p.ask.length, i, 64), 96, l, 'B')).join(''), aviso: avisa, bien: p => p.ok,
  });
  XG.ascensor('sube-regla', 50, 1, ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.']);
})();
