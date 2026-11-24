// Preuniversitario · pu-nu-1 «Primos y divisibilidad» (Explora). Los ejemplos no son los de los ejercicios.
{
  // n puntos en filas de c: si sobra, la última fila queda incompleta.
  const puntos = (v, K) => { const n = Math.round(v.n), c = Math.max(1, Math.round(v.c)), f = Math.ceil(n / c), u = Math.min(26, 290 / c, 130 / f); let h = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / c), inc = r === f - 1 && n % c; h += K.c(170 + (i % c - (c - 1) / 2) * u, 40 + r * u, u * 0.36, inc ? 'fF' : 'fA'); } return h + K.t(170, 22, n % c ? `sobran ${n % c}` : `${f} × ${c} = ${n}`, n % c ? 'tf' : 'b ta'); };
  // Árbol de factores por pasos: lista de [número, izquierda, derecha].
  const arbol = (v, K) => { const q = Math.round(v.n); let h = K.t(120, 30, '60', 'B'), x = 120, y = 30; [['2', '30'], ['2', '15'], ['3', '5']].forEach(([a, b], i) => { if (i < q) { h += K.l(x - 6, y + 8, x - 34, y + 32, 'lm') + K.l(x + 6, y + 8, x + 34, y + 32, 'lm') + K.c(x - 42, y + 46, 15, 'fA') + K.t(x - 42, y + 51, a, 'tc') + (i === 2 ? K.c(x + 42, y + 46, 15, 'fA') + K.t(x + 42, y + 51, b, 'tc') : K.t(x + 42, y + 52, b, 'b')); x += 42; y += 46; } }); return h + K.t(182, 66, v.p || '', 'ta', 'start'); };
  const crit = (v, K) => K.t(170, 70, v.t, 'B') + K.t(170, 112, v.a || '', 'b ta') + K.t(170, 146, v.b || '', 'tg');

  xpLec('pu-nu-1', [
    ['Primos: los que no se acomodan',
      xpMira('dibujo', 'Empecemos por la idea: dividir es **acomodar en filas** iguales.', { dib: puntos, v: { n: 12, c: 12 }, alto: 190 }, [
        ['Doce puntos en una fila.', {}, '$12 = 1 \\cdot 12$'],
        ['También caben en filas de 4: por eso 4 y 3 son divisores de 12.', { c: 4 }, '$12 = 3 \\cdot 4$'],
        ['En filas de 5 no: sobran 2. El 5 no divide a 12.', { c: 5 }],
        ['Ahora 7 puntos. En filas de 2, de 3, de 4… siempre sobra algo.', { n: 7, c: 3 }],
        ['Solo se acomodan en una fila de 7. El 7 es **primo**: lo dividen solo 1 y él.', { c: 7 }, '$7 = 1 \\cdot 7$'],
        ['El 1 no es primo, y el 2 es el único primo par.', { n: 2, c: 2 }],
      ], 'Primo: solo se acomoda en una fila. Compuesto: forma un rectángulo.'),
      xpHaz('dibujo', 'Muestra que 35 **no** es primo: busca filas, de más de uno, en que no sobre nada.', { dib: puntos, v: { n: 35, c: 2 }, cumple: v => v.c === 5 || v.c === 7, sol: { c: 5 }, alto: 235, manijas: [{ k: 'c', min: 2, max: 12, paso: 1, et: 'puntos por fila' }],
        lee: v => `$35 \\div ${v.c} = ${Math.floor(35 / v.c)}${35 % v.c ? ` \\text{ y sobran } ${35 % v.c}` : ''}$`, dice: v => (35 % v.c ? `En filas de ${v.c} sobran ${35 % v.c}.` : 'No sobra nada: es un divisor.') }, '$35 = 5 \\cdot 7$: no es primo.')],
    ['Descomponer en primos',
      xpMira('dibujo', 'Segunda idea: todo número se arma **multiplicando primos**.', { dib: arbol, v: { n: 0, p: '' }, alto: 205 }, [
        ['Empezamos con 60. ¿Lo divide el 2? Sí.', {}],
        ['60 es 2 por 30. El 2 es primo: queda encerrado.', { n: 1 }, '$60 = 2 \\cdot 30$'],
        ['30 es 2 por 15.', { n: 2 }, '$60 = 2 \\cdot 2 \\cdot 15$'],
        ['15 es 3 por 5, y los dos son primos. Se acabó.', { n: 3 }, '$60 = 2^2 \\cdot 3 \\cdot 5$'],
        ['Los divisores de 60 salen de combinar esos primos: hay 3 por 2 por 2, doce.', { p: '(2+1)(1+1)(1+1) = 12' }, '$3 \\cdot 2 \\cdot 2 = 12$'],
      ], 'Se divide entre primos hasta llegar a 1. Divisores: suma 1 a cada exponente y multiplica.'),
      xpHaz('fichas', 'Descompón 90 en primos: pon los cuatro factores, en cualquier orden.', { slots: [0, 1, 2, 3].map(i => ({ x: 74 + i * 64, y: 56, w: 54 })), fichas: ['2', '3', '3', '5', '9', '10', '6'], cumple: q => q.map(l => l[0]).sort().join() === '2,3,3,5', sol: ['2', '3', '3', '5'], alto: 86, fondo: K => K.t(2, 61, '90 =', '', 'start') + [0, 1, 2].map(i => K.t(106 + i * 64, 61, '·', 'b')).join(''), pista: 'Todos deben ser primos: 9, 10 y 6 no lo son.' }, '$90 = 2 \\cdot 3 \\cdot 3 \\cdot 5$.')],
    ['Criterios de divisibilidad',
      xpMira('dibujo', 'Tercera idea: hay **atajos** para saber si un número se deja dividir.', { dib: crit, v: { t: '3 741', a: '', b: '' }, alto: 165 }, [
        ['Entre 3: se suman las cifras. 3 más 7 más 4 más 1 son 15, y 15 es de 3: sí.', { a: '3 + 7 + 4 + 1 = 15', b: 'entre 3: sí' }, '$15 = 3 \\cdot 5$'],
        ['Entre 9 es igual: 15 no es múltiplo de 9. No se puede.', { b: 'entre 9: no' }],
        ['Entre 2, 5 y 10 se mira la última cifra. 1 no sirve para ninguno.', { a: 'última cifra: 1', b: 'ni 2, ni 5, ni 10' }],
        ['Entre 4 se miran las dos últimas: en 5 316, el 16 es de 4. Sí.', { t: '5 316', a: 'dos últimas: 16', b: 'entre 4: sí' }, '$16 = 4 \\cdot 4$'],
        ['Entre 6 debe cumplir con 2 y con 3: 5 316 es par y sus cifras suman 15. Sí.', { a: 'par, y 5 + 3 + 1 + 6 = 15', b: 'entre 6: sí' }],
      ], '3 y 9: suma de cifras. 2, 5 y 10: última cifra. 4: dos últimas. 6: entre 2 y entre 3.'),
      xpHaz('fichas', 'El número 73_ debe ser divisible entre **4**. ¿Qué cifras pueden ir al final?', { slots: [{ x: 98, y: 66, w: 150, h: 72, n: 5, et: 'sirven', ey: -44 }, { x: 248, y: 66, w: 140, h: 72, n: 5, et: 'no sirven', ey: -44 }], fichas: ['0', '2', '4', '6', '8'], meta: [['2', '6'], ['0', '4', '8']], alto: 112, pista: 'Mira las dos últimas cifras: 30, 32, 34, 36 y 38.' }, '32 y 36 son múltiplos de 4; 30, 34 y 38 no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Los divisores de 48 van por parejas. Completa las parejas y di cuántos divisores hay.', { slots: [0, 1, 2, 3].map(i => ({ x: 48 + i * 62, y: 96, w: 52 })).concat([{ x: 302, y: 96, w: 60, et: 'divisores' }]), fichas: ['24', '16', '12', '8', '10', '9', '18'], meta: ['24', '16', '12', '8', '10'], alto: 144, fondo: K => K.t(170, 22, '1 · 48', 'tm') + [2, 3, 4, 6].map((n, i) => K.t(48 + i * 62, 64, `${n} ·`, 'b')).join(''), pista: 'Cada pareja multiplica 48. Cuenta también el 1 y el 48.' }, '1·48, 2·24, 3·16, 4·12 y 6·8: cinco parejas, 10 divisores.')],
  ], 'Filas sin sobrantes, números armados con primos, y atajos para dividir.');
}
