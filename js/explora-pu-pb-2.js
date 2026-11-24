// Preuniversitario · pu-pb-2 «Complemento e independencia» (Explora). Los ejemplos no son los de los ejercicios.
{
  const barra = (v, K) => K.r(24, 60, 292, 44, 'fg', 6) + K.r(24, 60, 292 * v.p, 44, 'fa', 6) + (v.p > 0.12 ? K.t(24 + 146 * v.p, 88, v.ta, '') : '') + K.f(v.f, K.t(24 + 292 * (v.p + 1) / 2, 88, v.tb, '')) + K.t(24, 46, v.ea || '', 's ta', 'start') + K.f(v.f, K.t(316, 46, v.eb || '', 's tg', 'end'));
  // Bolsa con r naranjas y g verdes, y los pasos de la cuenta.
  const bolsa = (v, K) => { let h = K.r(30, 30, 130, 120, 'fn', 16); const n = Math.round(v.r) + v.g; for (let i = 0; i < n; i++) h += K.c(56 + (i % 4) * 26, 130 - Math.floor(i / 4) * 30, 11, i < Math.round(v.r) ? 'fF' : 'fA'); return h + v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(246, 56 + i * 44, t, i === 2 ? 'B ta' : 'b'))).join(''); };
  const grid = (f, c, o) => ({ f, c, cw: 50, ch: 42, ...o });

  xpLec('pu-pb-2', [
    ['El complemento',
      xpMira('dibujo', 'Empecemos por la idea: lo que pasa y lo que **no** pasa completan 1.', { dib: barra, v: { p: 0.2, f: 0, ta: '1/5', tb: '4/5', ea: 'gana', eb: 'no gana' }, alto: 125 }, [
        ['La probabilidad de ganar una rifa es un quinto.', {}],
        ['La de no ganar es todo lo demás: cuatro quintos.', { f: 1 }, '$1 - \\tfrac15 = \\tfrac45$'],
        ['Si la de ganar sube al 60 %, la de no ganar baja al 40 %.', { p: 0.6, ta: '60 %', tb: '40 %' }, '$100\\,\\% - 60\\,\\% = 40\\,\\%$'],
        ['Sirve para «al menos uno»: es más fácil contar cuándo no sale ninguno.', { ea: 'al menos uno', eb: 'ninguno', p: 0.8, ta: '1 − ninguno', tb: '' }, '$P(\\text{al menos uno}) = 1 - P(\\text{ninguno})$'],
      ], '$P(\\text{no A}) = 1 - P(A)$. «Al menos uno» es 1 menos «ninguno».'),
      xpHaz('rejilla', 'Se lanzan dos monedas. Pinta los casos en que sale **al menos una** cara.', grid(2, 2, { cw: 70, ch: 56, filas: ['1.ª cara', '1.ª sello'], cols: ['2.ª cara', '2.ª sello'], izq: 84, celda: i => ['CC', 'CS', 'SC', 'SS'][i], meta: [0, 1, 2], lee: c => `$\\tfrac{${c.filter(x => x).length}}{4}$`, dice: () => 'Solo falla si las dos son sello.' }), 'Solo SS falla: $1 - \\tfrac14 = \\tfrac34$.')],
    ['Independientes: se multiplican',
      xpMira('rejilla', 'Segunda idea: si una cosa no afecta a la otra, las probabilidades **se multiplican**.', grid(4, 6, { cw: 44, ch: 36, estados: 3, rot: ['', '', ''] }), [
        ['Un cuadro de 24 casillas es el total. Llueve con probabilidad un medio: tres columnas.', { x: [0, 1, 2, 6, 7, 8, 12, 13, 14, 18, 19, 20] }, '$\\tfrac12$'],
        ['El bus llega tarde con probabilidad un cuarto, llueva o no: una fila.', { luz: [0, 1, 2, 3, 4, 5] }, '$\\tfrac14$'],
        ['Que pasen las dos cosas es el cruce: tres casillas.', { on: [0, 1, 2], luz: [0, 1, 2, 3, 4, 5] }],
        ['Tres de 24 es un octavo: un medio por un cuarto.', {}, '$\\tfrac12 \\cdot \\tfrac14 = \\tfrac{3}{24} = \\tfrac18$'],
      ], 'Si A y B son independientes, $P(A \\text{ y } B) = P(A) \\cdot P(B)$.'),
      xpHaz('rejilla', 'A pasa con probabilidad dos tercios y B, con un cuarto; son independientes. Pinta el cruce: «A y B».', grid(4, 3, { cw: 62, ch: 40, cols: ['A', 'A', 'no A'], filas: ['B', 'no B', 'no B', 'no B'], izq: 60, meta: [0, 1], lee: c => `$\\tfrac{${c.reduce((a, b) => a + b, 0)}}{12}$`, dice: () => 'Dos de las tres columnas, y de ellas una de las cuatro filas.' }), '$\\tfrac23 \\cdot \\tfrac14 = \\tfrac{2}{12} = \\tfrac16$.')],
    ['Sin devolver: cambia la bolsa',
      xpMira('dibujo', 'Tercera idea: si no se devuelve, el segundo paso es con **otra bolsa**.', { dib: bolsa, v: { r: 3, g: 2, l: ['3/5', '2/4', '3/10'], n: 0 }, alto: 170 }, [
        ['Una bolsa con 3 bolas naranjas y 2 verdes. Se sacan dos, sin devolver.', {}],
        ['La primera es naranja con probabilidad tres quintos.', { n: 1 }, '$\\tfrac35$'],
        ['Ahora quedan 2 naranjas y 2 verdes: la segunda, dos cuartos.', { r: 2, n: 2 }, '$\\tfrac24$'],
        ['Las dos naranjas: se multiplican. Tres décimos.', { n: 3 }, '$\\tfrac35 \\cdot \\tfrac24 = \\tfrac{6}{20} = \\tfrac{3}{10}$'],
        ['Si se devolviera la primera, sería tres quintos otra vez: nueve veinticincoavos.', { r: 3, l: ['3/5', '3/5', '9/25'] }, '$\\tfrac35 \\cdot \\tfrac35 = \\tfrac{9}{25}$'],
      ], 'Sin devolver: en el segundo paso hay una bola menos, abajo y (si salió de ese color) arriba.'),
      xpHaz('fichas', 'Hay 5 fichas verdes y 3 negras. Se sacan dos sin devolver. Pon la probabilidad de cada paso y la de que las dos sean verdes.', { slots: [{ x: 66, y: 58, w: 88, et: '1.ª verde' }, { x: 170, y: 58, w: 88, et: '2.ª, tras verde' }, { x: 274, y: 58, w: 88, et: 'las dos' }], fichas: ['5/8', '4/7', '5/14', '5/7', '25/64', '4/8'], meta: ['5/8', '4/7', '5/14'], alto: 106, pista: 'Después de sacar una verde quedan 4 verdes de 7 fichas.' }, '$\\tfrac58 \\cdot \\tfrac47 = \\tfrac{20}{56} = \\tfrac{5}{14}$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ana acierta 2 de cada 3 tiros y Beto, 1 de cada 2. Tiran una vez, cada uno por su lado. Pon la probabilidad de que falle cada uno y de que acierte al menos uno.', { slots: [{ x: 66, y: 58, w: 88, et: 'falla Ana' }, { x: 170, y: 58, w: 88, et: 'falla Beto' }, { x: 274, y: 58, w: 92, et: 'al menos uno' }], fichas: ['1/3', '1/2', '5/6', '1/6', '2/3', '7/6'], meta: ['1/3', '1/2', '5/6'], alto: 106, pista: 'Fallan los dos con probabilidad 1/3 · 1/2.' }, 'Fallan los dos: $\\tfrac13 \\cdot \\tfrac12 = \\tfrac16$; al menos uno: $1 - \\tfrac16 = \\tfrac56$.')],
  ], 'El complemento completa 1, lo independiente se multiplica, y sin devolver cambia la bolsa.');
}
