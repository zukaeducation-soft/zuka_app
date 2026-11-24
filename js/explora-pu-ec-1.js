// Preuniversitario · pu-ec-1 «Del texto a la ecuación» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Balanza: cajas x y pesas sueltas a cada lado; iq/de = [cajas, pesas].
  const plato = (K, x, y, c, p) => { let h = K.l(x - 62, y, x + 62, y, 'gr'); let k = 0; const X = i => x - 52 + i * 26; for (let i = 0; i < c; i++, k++) h += K.r(X(k % 4) , y - 26 - Math.floor(k / 4) * 28, 24, 24, 'fa', 4) + K.t(X(k % 4) + 12, y - 9 - Math.floor(k / 4) * 28, 'x', 's'); return h + (p ? K.r(x + 28, y - 26 - (c > 3 ? 28 : 0), 34, 24, 'fg', 4) + K.t(x + 45, y - 9 - (c > 3 ? 28 : 0), p, 's') : ''); };
  const bal = (v, K) => { const d = Math.max(-16, Math.min(16, v.d ?? 0)); return K.l(84, 128 + d, 256, 128 - d, 'gr') + K.p([[170, 128], [152, 178], [188, 178]], 'fc') + plato(K, 84, 128 + d, Math.round(v.c1), Math.round(v.p1)) + plato(K, 256, 128 - d, Math.round(v.c2), Math.round(v.p2)) + K.t(170, 28, v.t || '', 'b ta'); };
  // Partes iguales en barras.
  const partes = (v, K) => v.f.map(([n, e, s], i) => { const y = 34 + i * 46; let h = K.t(58, y + 21, e, 's', 'end'); for (let k = 0; k < n; k++) h += K.r(66 + k * 52, y, 50, 32, 'fa', 5) + K.t(91 + k * 52, y + 21, v.x ?? 'x', ''); return h + (s ? K.r(66 + n * 52, y, 44, 32, 'fg', 5) + K.t(88 + n * 52, y + 21, `+${s}`, 's') : ''); }).join('') + K.t(170, 34 + v.f.length * 46 + 12, v.t || '', 'ta');

  xpLec('pu-ec-1', [
    ['Traducir palabra por palabra',
      xpMira('dibujo', 'Empecemos por la idea: una frase se **traduce** a símbolos, pedazo por pedazo.', { dib: (v, K) => v.l.map(([a, b], i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(160, 38 + i * 36, a, '', 'end') + K.ar(172, 33 + i * 36, 198, 33 + i * 36, 'lm') + K.t(212, 38 + i * 36, b, 'b ta', 'start'))).join(''), v: { l: [['un número', 'x'], ['el doble', '2x'], ['más 5', '2x + 5'], ['es 21', '2x + 5 = 21']], n: 0 }, alto: 170 }, [
        ['«El doble de un número, más 5, es 21». Al número que no se conoce lo llamamos x.', { n: 1 }],
        ['El doble es dos veces el número.', { n: 2 }, '$2x$'],
        ['Más 5: se le suma 5 a eso.', { n: 3 }, '$2x + 5$'],
        ['La palabra «es» se vuelve el signo igual.', { n: 4 }, '$2x + 5 = 21$'],
        ['Ojo: «el doble de un número más 5» puede confundir. La coma dice qué va primero.', {}],
      ], 'Ponle x a lo que no sabes; cada palabra es una operación, y «es» es el igual.'),
      xpHaz('fichas', 'Arma la ecuación: «al triple de un número le quito 4 y me da 20».', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 60, y: 50, w: 52 })), fichas: ['3x', '−', '4', '=', '20', '+', 'x'], cumple: q => ['3x−4=20', '20=3x−4'].includes(q.map(l => l[0]).join('')), sol: ['3x', '−', '4', '=', '20'], alto: 84, pista: 'El triple es tres veces el número.' }, '$3x - 4 = 20$.')],
    ['La balanza',
      xpMira('dibujo', 'Segunda idea: una ecuación es una **balanza**: lo que hagas a un lado, hazlo al otro.', { dib: bal, v: { c1: 3, p1: 4, c2: 0, p2: 19, d: 0, t: '3x + 4 = 19' }, alto: 190 }, [
        ['Tres cajas iguales y 4 de peso equilibran 19.', {}, '$3x + 4 = 19$'],
        ['Si quitamos 4 solo de un lado, se desequilibra.', { p1: 0, d: -12, t: '' }],
        ['Quitamos 4 también del otro: quedan tres cajas y 15.', { p2: 15, d: 0, t: '3x = 15' }, '$19 - 4 = 15$'],
        ['Repartimos entre 3: una caja pesa 5.', { c1: 1, p2: 5, t: 'x = 5' }, '$15 \\div 3 = 5$'],
        ['Comprobamos: 3 por 5, más 4, son 19.', {}, '$3 \\cdot 5 + 4 = 19$'],
      ], 'Quita lo mismo a los dos lados hasta dejar sola la x; luego divide.'),
      xpHaz('dibujo', 'Aquí hay cajas a los dos lados: $4x + 1 = x + 16$. Mueve la x hasta que la balanza quede derecha.', { dib: (v, K) => bal({ c1: 4, p1: 1, c2: 1, p2: 16, d: (3 * v.x - 15) * 1.4, t: '' }, K), v: { x: 1 }, metas: { x: 5 }, alto: 240, manijas: [{ k: 'x', min: 0, max: 10, paso: 1, et: 'x' }],
        lee: v => `$4 \\cdot ${v.x} + 1 = ${4 * v.x + 1} \\qquad ${v.x} + 16 = ${v.x + 16}$`, dice: v => (v.x < 5 ? 'Pesa más la derecha.' : v.x > 5 ? 'Pesa más la izquierda.' : 'En equilibrio.') }, 'Quitando una caja y 1 de cada lado: $3x = 15$, $x = 5$.')],
    ['Todo con la misma x',
      xpMira('dibujo', 'Tercera idea: si hay varias cantidades, **escríbelas todas** con la misma x.', { dib: partes, v: { f: [[1, 'Ana', 0], [2, 'Beto', 0], [1, 'Caro', 8]], x: 'x', t: '' }, alto: 200 }, [
        ['Beto tiene el doble de Ana, y Caro, 8 más que Ana. Entre los tres, 48.', { t: 'suman 48' }],
        ['Ana es x, Beto 2x y Caro x + 8. Son cuatro cajas iguales y 8 más.', {}, '$x + 2x + x + 8 = 4x + 8$'],
        ['Quitamos el 8: cuatro cajas valen 40.', {}, '$4x = 48 - 8 = 40$'],
        ['Cada caja vale 10: Ana 10, Beto 20 y Caro 18.', { x: '10', t: '10 + 20 + 18 = 48' }, '$x = 10$'],
        ['Conviene llamar x al más pequeño, o al que se usa para describir a los otros.', {}],
      ], 'Llama x a uno, escribe los demás con esa x y súmalos.'),
      xpHaz('dibujo', 'El segundo tiene el triple del primero, y el tercero, 2 más que el primero. Suman 62. Ajusta x.', { dib: (v, K) => partes({ f: [[1, '1.º', 0], [3, '2.º', 0], [1, '3.º', 2]], x: v.x, t: `suman ${5 * v.x + 2}` }, K), v: { x: 5 }, metas: { x: 12 }, alto: 245, manijas: [{ k: 'x', min: 1, max: 20, paso: 1, et: 'x' }],
        lee: v => `$5 \\cdot ${v.x} + 2 = ${5 * v.x + 2}$`, dice: v => (5 * v.x + 2 < 62 ? 'Aún no llegan a 62.' : 5 * v.x + 2 > 62 ? 'Se pasaron de 62.' : 'Justo 62.') }, '$5x + 2 = 62$: $x = 12$, y son 12, 36 y 14.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Tres números **impares** seguidos suman 51. Encuéntralos.', { slots: [0, 1, 2].map(i => ({ x: 90 + i * 80, y: 56, w: 66, et: ['x', 'x + 2', 'x + 4'][i] })), fichas: ['15', '17', '19', '16', '13', '21'], meta: ['15', '17', '19'], alto: 104, pista: 'El del medio es la tercera parte de 51.' }, '$3x + 6 = 51$, $x = 15$: 15, 17 y 19.')],
  ], 'Traducir, equilibrar y escribir todo con la misma x.');
}
