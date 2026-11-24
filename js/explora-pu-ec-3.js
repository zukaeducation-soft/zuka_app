// Preuniversitario · pu-ec-3 «Sistemas y desigualdades» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Recibos: filas de dibujos (cafés en azul, tortas en dorado) con su total.
  const rec = (v, K) => v.f.map(([c, t, s], i) => { const y = 40 + i * 52; let h = ''; for (let k = 0; k < c; k++) h += K.r(26 + k * 34, y - 14, 26, 28, 'fa', 6) + K.t(39 + k * 34, y + 5, 'c', 's'); for (let k = 0; k < t; k++) h += K.c(140 + k * 34, y, 14, 'fg') + K.t(140 + k * 34, y + 5, 't', 's'); return h + K.t(262, y + 5, `= ${s}`, 'b', 'start'); }).join('') + K.f(v.r ?? 0, K.l(20, 118, 320, 118, 'lm')) + K.t(170, 40 + v.f.length * 52 + 4, v.p || '', 'b ta');
  // Recta con una solución pintada desde b hacia dir.
  const X = x => 170 + x * 22, recta = (v, K) => { let h = K.l(12, 90, 328, 90, 'lm'); for (let k = -7; k <= 7; k++) h += K.l(X(k), 86, X(k), 94, 'lm') + K.t(X(k), 112, K.sig(k), k === 0 ? 's' : 's tm'); return h + (v.sol ? K.l(X(v.b) + 8 * Math.sign(v.dir), 90, v.dir > 0 ? 326 : 14, 90, 'la gr') + K.ar(X(v.b) + 8 * Math.sign(v.dir), 90, v.dir > 0 ? 328 : 12, 90, 'la gr') + K.c(X(v.b), 90, 8, v.ab ? 'fn' : 'fA') : '') + K.t(170, 40, v.t || '', 'b ta'); };
  // Dos puntos en la recta: p < q, y sus imágenes al multiplicar por k.
  const dos = (v, K) => recta({ t: v.t }, K) + K.c(X(v.p), 90, 10, 'fA') + K.t(X(v.p), 72, K.sig(Math.round(v.p * 10) / 10), 'ta') + K.c(X(v.q), 90, 10, 'fG') + K.t(X(v.q), 72, K.sig(Math.round(v.q * 10) / 10), 'tg');

  xpLec('pu-ec-3', [
    ['Dos recibos',
      xpMira('dibujo', 'Empecemos por la idea: dos condiciones a la vez se **comparan**, como dos recibos.', { dib: rec, v: { f: [[2, 3, 19], [2, 1, 9]], p: '', r: 0 }, alto: 170 }, [
        ['Dos cafés y tres tortas cuestan 19. Dos cafés y una torta, 9.', {}],
        ['Los dos recibos tienen los mismos cafés. Se diferencian en dos tortas.', { p: '3 − 1 = 2 tortas' }],
        ['Y en el precio se diferencian en 10: dos tortas valen 10.', { p: '2t = 19 − 9 = 10' }, '$19 - 9 = 10$'],
        ['Cada torta vale 5.', { p: 't = 5' }, '$t = 5$'],
        ['En el segundo recibo: dos cafés más 5 son 9, así que cada café vale 2.', { p: 'c = 2' }, '$2c + 5 = 9$'],
      ], 'Si dos ecuaciones comparten una parte, réstalas: esa parte desaparece.'),
      xpHaz('dibujo', 'Un lápiz y dos borradores cuestan 8; tres lápices y dos borradores, 12. Ajusta los dos precios.', { dib: (v, K) => [[1, 2, 8], [3, 2, 12]].map(([a, b, s], i) => { const y = 40 + i * 44, t = a * v.l + b * v.b; let h = ''; for (let k = 0; k < a; k++) h += K.r(26 + k * 34, y - 12, 26, 24, 'fa', 6) + K.t(39 + k * 34, y + 5, v.l, 's'); for (let k = 0; k < b; k++) h += K.c(146 + k * 34, y, 13, 'fg') + K.t(146 + k * 34, y + 5, v.b, 's'); return h + K.t(212, y + 5, `= ${t}`, t === s ? 'b to' : 'b tf', 'start') + K.t(290, y + 5, `(${s})`, 'tm', 'start'); }).join(''), v: { l: 5, b: 1 }, metas: { l: 2, b: 3 }, alto: 210, manijas: [{ k: 'l', min: 0, max: 8, paso: 1, et: 'lápiz' }, { k: 'b', min: 0, max: 8, paso: 1, et: 'borrador' }],
        lee: v => `$${v.l} + 2 \\cdot ${v.b} = ${v.l + 2 * v.b} \\qquad 3 \\cdot ${v.l} + 2 \\cdot ${v.b} = ${3 * v.l + 2 * v.b}$`, dice: () => 'Los dos recibos deben cuadrar a la vez. Se diferencian en dos lápices.' }, 'Dos lápices son $12 - 8 = 4$: cada uno 2, y el borrador 3.')],
    ['Suma y diferencia',
      xpMira('dibujo', 'Segunda idea: si se conocen la **suma** y la **diferencia**, se emparejan.', { dib: (v, K) => K.t(30, 46, 'mayor', 's tm', 'start') + K.r(30, 52, v.s * 14, 32, 'fa') + K.r(30 + v.s * 14, 52, v.d * 14, 32, 'ff') + K.t(30, 112, 'menor', 's tm', 'start') + K.r(30, 118, v.s * 14, 32, 'fg') + K.t(170, 28, v.p || '', 'b ta') + K.f(v.n, K.t(30 + v.s * 7, 73, v.s, 's') + K.t(30 + v.s * 7, 139, v.s, 's')) + (v.d > 0.2 ? K.t(30 + v.s * 14 + v.d * 7, 73, '4', 's') : ''), v: { s: 7, d: 4, p: '', n: 0 }, alto: 165 }, [
        ['Dos números suman 18 y el mayor le lleva 4 al menor.', { p: 'suman 18' }],
        ['Si al mayor le quitamos los 4 de ventaja, quedan iguales y suman 14.', { d: 0, p: '18 − 4 = 14' }, '$18 - 4 = 14$'],
        ['Cada uno es la mitad de 14: siete. Ese es el menor.', { n: 1, p: 'menor: 7' }, '$14 \\div 2 = 7$'],
        ['El mayor es 7 más los 4: once.', { d: 4, p: 'mayor: 11' }, '$7 + 4 = 11$'],
        ['Con ecuaciones es sumar las dos: 2x es 18 más 4.', {}, '$2x = 18 + 4 = 22$'],
      ], 'Menor = (suma − diferencia) ÷ 2. Mayor = (suma + diferencia) ÷ 2.'),
      xpHaz('fichas', 'Dos números suman 26 y se llevan 8. Pon el menor y el mayor.', { slots: [{ x: 110, y: 56, w: 92, et: 'menor' }, { x: 230, y: 56, w: 92, et: 'mayor' }], fichas: ['9', '17', '18', '8', '13'], meta: ['9', '17'], alto: 104, pista: 'Quita la ventaja: 26 − 8 = 18, y reparte entre 2.' }, '$18 \\div 2 = 9$ y $9 + 8 = 17$.')],
    ['Desigualdades',
      xpMira('dibujo', 'Tercera idea: multiplicar por un negativo **voltea** la desigualdad.', { dib: (v, K) => (v.m < 0.5 ? dos(v, K) : recta(v, K)), v: { m: 0, p: 2, q: 5, t: '2 < 5', sol: 0, b: 0, dir: 1, ab: 0 }, alto: 130 }, [
        ['2 es menor que 5: está más a la izquierda.', {}, '$2 < 5$'],
        ['Si multiplicamos los dos por −1, saltan al otro lado del cero, en espejo.', { p: -2, q: -5, t: '−2 > −5' }],
        ['Ahora −2 está a la derecha de −5: el signo se volteó.', {}, '$-2 > -5$'],
        ['Para resolver −4x < 8, se divide entre −4 y se voltea.', { m: 1, t: 'x > −2', sol: 1, b: -2, dir: 1, ab: 1 }, '$-4x < 8 \\;\\Rightarrow\\; x > -2$'],
        ['Sumar o restar no voltea nada; solo multiplicar o dividir por un negativo.', {}],
      ], 'Se despeja como una ecuación, pero al multiplicar o dividir por un negativo se voltea el signo.'),
      xpHaz('dibujo', 'Pinta la solución de $1 - 2x \\ge -7$: mueve el borde y elige hacia dónde va la flecha.', { dib: (v, K) => recta({ ...v, sol: 1, ab: 0, t: `x ${v.dir > 0 ? '≥' : '≤'} ${K.sig(v.b)}` }, K), v: { b: 0, dir: 1 }, metas: { b: 4, dir: -1 }, alto: 190,
        manijas: [{ k: 'b', min: -6, max: 6, paso: 1, r: 10, en: v => [X(v.b), 90], de: x => (x - 170) / 22 }, { k: 'dir', min: -1, max: 1, paso: 2, et: 'sentido de la flecha', rot: v => (v.dir > 0 ? '→' : '←') }],
        lee: v => `$x = ${v.b}: \\; 1 - 2 \\cdot ${v.b < 0 ? `(${v.b})` : v.b} = ${1 - 2 * v.b}$`, dice: v => { const p = v.dir > 0 ? Math.max(5, v.b + 1) : v.b; return 1 - 2 * p < -7 ? `Tu zona incluye el ${K1(p)}, y 1 − 2x da ${K1(1 - 2 * p)}: menos que −7.` : v.b < 4 ? 'Todos los de tu zona cumplen, pero quedan otros por fuera, como el 4.' : 'Todos cumplen, y no queda ninguno por fuera.'; } }, '$-2x \\ge -8$; al dividir entre $-2$ se voltea: $x \\le 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un taxi cobra 5 mil de arranque y 3 mil por kilómetro. Con 32 mil, ¿cuántos kilómetros como **máximo** se pueden recorrer?', { dib: (v, K) => K.t(170, 40, `5 + 3 · ${v.k} = ${5 + 3 * v.k}`, 5 + 3 * v.k > 32 ? 'B tf' : 'B ta') + K.r(30, 70, 280, 30, 'fc') + K.r(30, 70, Math.min(280, (5 + 3 * v.k) * 7), 30, 5 + 3 * v.k > 32 ? 'ff' : 'fa') + K.l(30 + 32 * 7, 62, 30 + 32 * 7, 108, 'lg gr') + K.t(30 + 32 * 7, 124, '32', 'tg'), v: { k: 2 }, metas: { k: 9 }, alto: 190, manijas: [{ k: 'k', min: 0, max: 12, paso: 1, et: 'kilómetros' }],
        lee: () => '$5 + 3k \\le 32$', dice: v => (5 + 3 * v.k > 32 ? 'Se pasó del dinero.' : v.k < 9 ? 'Todavía alcanza para más.' : 'Justo: uno más ya no alcanza.') }, '$3k \\le 27$: como máximo 9 km.')],
  ], 'Restar recibos, emparejar suma y diferencia, y voltear el signo con los negativos.');
  function K1(x) { return String(x).replace('-', '−'); }
}
