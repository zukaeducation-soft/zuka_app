// Preuniversitario · pu-ar-3 «Criptoaritmética» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Número de dos cifras en barras de 10 y cuadritos de 1.
  const bloques = (v, K) => { let h = ''; const A = Math.round(v.a), B = Math.round(v.b); for (let i = 0; i < A; i++) h += K.r(34 + i * 18, 40, 14, 110, 'fa', 3); for (let i = 0; i < B; i++) h += K.r(230 + (i % 3) * 22, 40 + Math.floor(i / 3) * 22, 18, 18, 'fg', 3); return h + K.t(100, 172, `${A} decenas`, 'ta') + K.t(262, 172, `${B} unidades`, 'tg') + K.t(170, 24, v.t ?? `${A}${B}`, 'B'); };
  // Suma en columnas con llevada: filas de textos.
  const suma = (v, K) => { const X = [150, 200], h = K.l(116, 112, 226, 112) + K.t(120, 96, '+', 'b'); const f = (r, y, c) => r.map((t, i) => (t === '' ? '' : K.t(X[i], y, t, `B ${c[i] || ''}`))).join(''); return h + f(v.r1, 58, v.c || []) + f(v.r2, 98, v.c || []) + f(v.r3, 148, v.c || []) + K.f(v.ll, K.t(X[0], 30, '1', 's tf') + K.t(X[0] + 44, 30, '← llevo 1', 's tf', 'start')); };

  xpLec('pu-ar-3', [
    ['Cada cifra según su puesto',
      xpMira('dibujo', 'Empecemos por la idea: el número $\\overline{AB}$ vale **10A + B**.', { dib: bloques, v: { a: 4, b: 7, t: '47' }, alto: 185 }, [
        ['47 son 4 barras de diez y 7 cuadritos: 40 más 7.', {}, '$47 = 10 \\cdot 4 + 7$'],
        ['Si se voltean sus cifras queda 74: 7 barras y 4 cuadritos.', { a: 7, b: 4, t: '74' }, '$74 = 10 \\cdot 7 + 4$'],
        ['Subió 27. Cambiar un cuadrito por una barra suma 9, y se cambiaron 3.', {}, '$74 - 47 = 27 = 9 \\cdot 3$'],
        ['Siempre pasa: al voltear, el número cambia 9 veces la diferencia de sus cifras.', {}, '$9 \\cdot (7 - 4)$'],
      ], '$\\overline{AB} = 10A + B$. Al voltear las cifras, cambia en 9 veces su diferencia.'),
      xpHaz('fichas', 'Un número de dos cifras: sus cifras suman 10 y, al voltearlo, **sube** 36. Pon sus cifras.', { slots: [{ x: 130, y: 58, w: 70, et: 'decenas' }, { x: 220, y: 58, w: 70, et: 'unidades' }], fichas: ['3', '7', '4', '6', '2', '8'], meta: ['3', '7'], alto: 106, pista: '36 son 9 por 4: las cifras se llevan 4. Sube, así que la mayor está en las unidades.' }, 'Se llevan 4 y suman 10: 3 y 7. El número es 37, y $73 - 37 = 36$.')],
    ['Columna por columna',
      xpMira('dibujo', 'Segunda idea: en una suma con letras, se empieza por **las unidades** y se cuida lo que se lleva.', { dib: suma, v: { r1: ['A', '7'], r2: ['2', 'B'], r3: ['6', '1'], ll: 0, c: ['ta', 'tg'] }, alto: 165 }, [
        ['A7 más 2B da 61. Cada letra es una cifra.', {}],
        ['Unidades: 7 más B debe terminar en 1. Con B = 4 da 11.', { r2: ['2', '4'] }, '$7 + 4 = 11$'],
        ['Se escribe 1 y se lleva 1 a las decenas.', { ll: 1 }],
        ['Decenas: 1 que se lleva, más A, más 2, da 6. Entonces A es 3.', { r1: ['3', '7'] }, '$1 + A + 2 = 6$'],
        ['Comprobamos: 37 más 24 son 61.', {}, '$37 + 24 = 61$'],
      ], 'Primero unidades; si pasan de 9, se lleva 1. Luego decenas, sumando lo que se llevó.'),
      xpHaz('fichas', '$\\overline{3A} + \\overline{B8} = 85$. Descubre A y B.', { slots: [{ x: 130, y: 190, w: 70, et: 'A' }, { x: 220, y: 190, w: 70, et: 'B' }], fichas: ['7', '4', '5', '3', '6'], meta: ['7', '4'], alto: 236, fondo: K => suma({ r1: ['3', 'A'], r2: ['B', '8'], r3: ['8', '5'], ll: 0, c: ['ta', 'tg'] }, K), pista: 'A + 8 termina en 5: es 15. Se lleva 1 a las decenas.' }, '$7 + 8 = 15$, se lleva 1; $1 + 3 + B = 8$, así que B = 4. Y $37 + 48 = 85$.')],
    ['Letras repetidas',
      xpMira('dibujo', 'Tercera idea: si las letras se repiten, se **juntan** como en el álgebra.', { dib: (v, K) => v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 44 + i * 40, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join(''), v: { l: ['AA + BB = 88', '11A + 11B = 88', '11 · (A + B) = 88', 'A + B = 8'], n: 1 }, alto: 180 }, [
        ['AA más BB es 88. AA es diez A más una A: once A.', {}, '$\\overline{AA} = 10A + A = 11A$'],
        ['Igual, BB son once B.', { n: 2 }],
        ['Se saca el 11 común.', { n: 3 }],
        ['Dividimos entre 11: A más B suman 8. Lo demás no se sabe, y no hacía falta.', { n: 4 }, '$88 \\div 11 = 8$'],
        ['También $\\overline{AB} + \\overline{BA}$ es once veces A + B.', { l: ['AB + BA', '10A + B + 10B + A', '11A + 11B', '11 · (A + B)'] }],
      ], 'Escribe cada número con 10 y 1, junta las letras iguales y saca el factor común.'),
      xpHaz('fichas', '$\\overline{AB} + \\overline{BA} = 77$ y $A - B = 3$. Pon A + B y las dos cifras.', { slots: [{ x: 66, y: 58, w: 84, et: 'A + B' }, { x: 170, y: 58, w: 84, et: 'A' }, { x: 274, y: 58, w: 84, et: 'B' }], fichas: ['7', '5', '2', '4', '3', '11'], meta: ['7', '5', '2'], alto: 106, pista: '77 son once veces A + B. Dos cifras que suman 7 y se llevan 3.' }, '$77 \\div 11 = 7$; suman 7 y se llevan 3: 5 y 2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En $\\overline{5A} + \\overline{A5} = 99$, A es la misma cifra. Pon cuánto suman los dos números en términos de A y el valor de A.', { slots: [{ x: 100, y: 58, w: 130, et: 'la suma es' }, { x: 256, y: 58, w: 84, et: 'A' }], fichas: ['55 + 11·A', '10 + 2·A', '4', '9', '5'], meta: ['55 + 11·A', '4'], alto: 106, pista: 'El primero vale 50 + A, y el segundo, 10 · A + 5.' }, '$50 + A + 10A + 5 = 55 + 11A = 99$: $11A = 44$ y A = 4.')],
  ], 'Diez por las decenas, columnas con lo que se lleva, y letras que se juntan.');
}
