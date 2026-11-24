// Preuniversitario · pu-ar-1 «Fracciones de lo que queda» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barra del total T: gastos g1 y g2 (cantidades) con su intensidad; lo que queda al final.
  const barra = (v, K) => {
    const L = 292, u = L / v.T, x1 = 24 + v.g1 * u, x2 = x1 + v.g2 * u; let h = K.r(24, 60, L, 44, 'fa', 5);
    h += K.f(v.a, K.r(24, 60, v.g1 * u, 44, 'ff', 5) + K.t(24 + v.g1 * u / 2, 88, v.e1 ?? N(v.g1), 's')) + K.f(v.b, K.r(x1, 60, v.g2 * u, 44, 'fg', 5) + K.t(x1 + v.g2 * u / 2, 88, v.e2 ?? N(v.g2), 's'));
    for (let i = 1; i < (v.n1 || 1); i++) h += K.l(24 + i * L / v.n1, 60, 24 + i * L / v.n1, 104, 'ls');
    if (v.n2) for (let i = 1; i < v.n2; i++) h += K.f(v.c2, K.l(x1 + i * (316 - x1) / v.n2, 60, x1 + i * (316 - x1) / v.n2, 104, 'lm d'));
    return h + K.t(170, 46, v.t ?? N(v.T), 'tm') + K.f(v.q, K.cota(v.b > 0.5 ? x2 : x1, 116, 316, 116, v.eq ?? `quedan ${N(v.T - v.g1 - (v.b > 0.5 ? v.g2 : 0))}`, 'ta'));
  };
  const V = { a: 0, b: 0, q: 0, c2: 0 };

  xpLec('pu-ar-1', [
    ['El segundo pedazo es de lo que queda',
      xpMira('dibujo', 'Empecemos por la idea: «de lo que queda» cambia **el todo**.', { dib: barra, v: { T: 72, g1: 12, g2: 30, n1: 6, n2: 2, ...V }, alto: 145 }, [
        ['Alguien tiene 72 mil. Gasta la sexta parte: cada sexta parte son 12 mil.', {}, '$72 \\div 6 = 12$'],
        ['Le quedan 60 mil. Ese es ahora el todo.', { a: 1, q: 1 }, '$72 - 12 = 60$'],
        ['Gasta la mitad de **lo que queda**: la mitad de 60, no de 72.', { c2: 1 }, '$60 \\div 2 = 30$'],
        ['Son 30 mil. Le quedan otros 30 mil.', { b: 1 }, '$60 - 30 = 30$'],
        ['Si hubiera tomado la mitad de 72, la cuenta saldría mal.', {}, '$\\tfrac12 \\text{ de } 60 \\neq \\tfrac12 \\text{ de } 72$'],
      ], 'Después de cada gasto hay un todo nuevo: la fracción siguiente se toma de ahí.'),
      xpHaz('fichas', 'De 84 km se recorren dos séptimos en bus y luego un tercio de lo que falta, a pie. Pon los km de bus, a pie y lo que falta.', { slots: [{ x: 62, y: 58, w: 92, et: 'en bus' }, { x: 170, y: 58, w: 92, et: 'a pie' }, { x: 278, y: 58, w: 92, et: 'faltan' }], fichas: ['24', '20', '40', '28', '32', '60'], meta: ['24', '20', '40'], alto: 106, pista: 'Un séptimo de 84 son 12. El tercio se toma de los 60 que faltan.' }, '$2 \\cdot 12 = 24$; de los 60 que faltan, un tercio es 20; faltan 40.')],
    ['Multiplicar lo que queda',
      xpMira('rejilla', 'Segunda idea: para saber qué fracción queda, se **multiplican las que quedan**.', { f: 4, c: 6, cw: 46, ch: 36, estados: 3, rot: ['', '', '✗'] }, [
        ['Un terreno de 24 cuadros. Se vende un sexto: una columna.', { x: [0, 6, 12, 18] }, '$\\tfrac16$'],
        ['Quedan cinco sextos del terreno.', {}, '$1 - \\tfrac16 = \\tfrac56$'],
        ['De lo que queda se siembra un cuarto: una fila de las columnas que quedaron.', { x: [1, 2, 3, 4, 5] }, '$\\tfrac14 \\text{ de } \\tfrac56$'],
        ['Quedan tres cuartos de cinco sextos: 15 de 24 cuadros.', { on: [7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23] }, '$\\tfrac34 \\cdot \\tfrac56 = \\tfrac{15}{24} = \\tfrac58$'],
      ], 'Si se gasta $\\tfrac16$ queda $\\tfrac56$; si luego se gasta $\\tfrac14$ de eso, queda $\\tfrac34 \\cdot \\tfrac56$.'),
      xpHaz('rejilla', 'De un lote de 20 cuadros se venden dos quintos (dos columnas) y se riega un cuarto de lo que queda. Pinta lo que sobra, cualquier pedazo de ese tamaño.', { f: 4, c: 5, cw: 48, ch: 36, cumple: c => c.reduce((a, b) => a + b, 0) === 9, sol: [0, 1, 2, 5, 6, 7, 10, 11, 12], lee: c => `$\\tfrac{${c.reduce((a, b) => a + b, 0)}}{20}$`, dice: c => `${c.reduce((a, b) => a + b, 0)} de 20 cuadros pintados.` }, '$\\tfrac35 \\cdot \\tfrac34 = \\tfrac{9}{20}$: nueve cuadros.')],
    ['Al revés: hallar el principio',
      xpMira('dibujo', 'Tercera idea: si se sabe lo que sobró, se camina **de atrás hacia adelante**.', { dib: barra, v: { T: 60, g1: 20, g2: 10, n1: 3, n2: 4, a: 1, b: 1, q: 1, c2: 1, e1: '?', e2: '?', t: '?', eq: 'sobraron 30' }, alto: 145 }, [
        ['Gastó un tercio, luego un cuarto de lo que quedaba, y le sobraron 30. ¿Cuánto tenía?', {}],
        ['Los 30 son tres cuartos de lo que había antes del segundo gasto.', {}, '$30 = \\tfrac34 \\text{ de ?}$'],
        ['Cada cuarto son 10: antes tenía 40.', { e2: '10' }, '$30 \\div 3 = 10 \\quad 4 \\cdot 10 = 40$'],
        ['Y 40 son dos tercios del principio: cada tercio son 20, así que tenía 60.', { e1: '20', t: '60' }, '$40 \\div 2 = 20 \\quad 3 \\cdot 20 = 60$'],
        ['Comprobamos: 60 menos 20 son 40; menos 10, quedan 30.', {}, '$60 - 20 - 10 = 30$'],
      ], 'De atrás hacia adelante: lo que sobró es una fracción conocida de lo que había antes.'),
      xpHaz('dibujo', 'Gastó un cuarto y luego la mitad de lo que le quedaba; le sobraron 24. Ajusta el total hasta que sobren 24.', { dib: (v, K) => barra({ T: v.T, g1: v.T / 4, g2: v.T * 3 / 8, n1: 4, n2: 2, a: 1, b: 1, q: 1, c2: 0 }, K), v: { T: 40 }, metas: { T: 64 }, alto: 195, manijas: [{ k: 'T', min: 16, max: 96, paso: 8, et: 'total' }],
        lee: v => `$\\tfrac12 \\cdot \\tfrac34 \\cdot ${v.T} = ${N(v.T * 3 / 8)}$`, dice: v => `Con ${v.T} sobrarían ${N(v.T * 3 / 8)}.` }, '24 es la mitad de 48, y 48 son tres cuartos de 64.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De una torta se come un tercio y luego dos quintos de lo que queda. Sobran 18 porciones. ¿Cuántas había antes del segundo corte, al principio, y en el primer corte?', { slots: [{ x: 62, y: 58, w: 96, et: 'antes del 2.º' }, { x: 170, y: 58, w: 96, et: 'al principio' }, { x: 278, y: 58, w: 96, et: 'primer corte' }], fichas: ['30', '45', '15', '27', '18', '12'], meta: ['30', '45', '15'], alto: 106, pista: '18 son tres quintos de lo que había antes; y eso, dos tercios del principio.' }, '18 son tres quintos de 30, y 30 son dos tercios de 45; el primer corte fue 15.')],
  ], 'Cada gasto deja un todo nuevo, lo que queda se multiplica, y al revés se camina hacia atrás.');
}
