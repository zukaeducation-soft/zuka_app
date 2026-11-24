// Preuniversitario · pu-lo-3 «El condicional» (Explora). Los ejemplos no son los de los ejercicios.
{
  // «Si p, entonces q»: el círculo de p está dentro del de q. Un punto se mueve por las tres zonas.
  const C = [170, 104];
  const circ = (v, K) => K.c(...C, 88, v.lq > 0.5 ? 'fg' : 'fc') + K.c(C[0] - 18, C[1] + 12, 44, v.lp > 0.5 ? 'fa' : 'fc') + K.t(C[0], C[1] - 58, v.q, 'tg') + K.t(C[0] - 18, C[1] + 42, v.p, 'ta') + (v.pt === 0 ? '' : K.c(v.x, v.y, 8, 'fF'));
  const enP = v => Math.hypot(v.x - C[0] + 18, v.y - C[1] - 12) < 44, enQ = v => Math.hypot(v.x - C[0], v.y - C[1]) < 88;
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];

  xpLec('pu-lo-3', [
    ['Uno dentro del otro',
      xpMira('dibujo', 'Empecemos por la idea: «si p, entonces q» es un círculo **dentro** de otro.', { dib: circ, v: { p: 'abejas', q: 'insectos', lp: 0, lq: 0, x: 150, y: 108, pt: 0 }, alto: 206 }, [
        ['«Si es una abeja, es un insecto». Las abejas están dentro de los insectos.', {}],
        ['Estar en el círculo chico obliga a estar en el grande: ser abeja **basta** para ser insecto.', { pt: 1, lp: 1 }, '$p \\to q$'],
        ['Pero se puede ser insecto sin ser abeja: una hormiga.', { x: 225, y: 100, lp: 0, lq: 1 }],
        ['Y afuera del grande nadie puede ser abeja.', { x: 300, y: 60, lq: 0 }],
        ['p es suficiente para q; q es necesaria para p.', {}],
      ], '«Si p, entonces q»: p está dentro de q. p basta; q hace falta.'),
      xpHaz('dibujo', '«Si es de Cali, es colombiano». Lleva el punto a alguien que muestre que el **revés** es falso.', { dib: (v, K) => circ({ ...v, p: 'de Cali', q: 'colombianos', lp: 0, lq: 0, pt: 0 }, K), v: { x: 312, y: 30 }, cumple: v => enQ(v) && !enP(v), sol: { x: 226, y: 104 }, alto: 206,
        manijas: [{ k: ['x', 'y'], min: [20, 16], max: [320, 190], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }],
        lee: () => '', dice: v => (enP(v) ? 'Es de Cali y colombiano: cumple las dos, no sirve.' : enQ(v) ? 'Es colombiano y no es de Cali.' : 'No es colombiano: no dice nada del revés.') }, 'Un colombiano que no es de Cali muestra que «si es colombiano, es de Cali» es falso.')],
    ['La vuelta que sí vale',
      xpMira('dibujo', 'Segunda idea: el **contrarrecíproco** niega y voltea, y dice lo mismo.', { dib: circ, v: { p: 'corcho', q: 'flota', lp: 0, lq: 0, x: 150, y: 108, pt: 0 }, alto: 206 }, [
        ['«Si es corcho, flota». El corcho está dentro de lo que flota.', {}],
        ['Algo **no flota**: está afuera del círculo grande.', { pt: 1, x: 304, y: 50 }],
        ['Entonces tampoco puede estar en el chico: no es corcho.', {}, '$\\neg q \\to \\neg p$'],
        ['Eso es el contrarrecíproco: se niegan las dos partes y se cambian de lugar.', {}],
        ['Dice exactamente lo mismo que la frase original.', {}, '$(p \\to q) = (\\neg q \\to \\neg p)$'],
      ], '$p \\to q$ equivale a $\\neg q \\to \\neg p$: negar las dos y voltear.'),
      xpHaz('fichas', 'Arma el contrarrecíproco de «**si estudia, aprueba**».', { slots: [{ x: 170, y: 40, w: 170, et: 'entonces', ey: 42 }, { x: 170, y: 118, w: 170 }], fichas: ['no aprueba', 'no estudia', 'aprueba', 'estudia'], meta: ['no aprueba', 'no estudia'], alto: 146, fondo: K => K.t(54, 45, 'si', 'ta'), pista: 'Niega las dos partes y cámbialas de lugar.' }, 'Si no aprueba, entonces no estudia.')],
    ['Las dos trampas',
      xpMira('dibujo', 'Tercera idea: hay dos conclusiones que **parecen** válidas y no lo son.', { dib: circ, v: { p: 'abejas', q: 'insectos', lp: 0, lq: 1, x: 222, y: 100, pt: 1 }, alto: 206 }, [
        ['Trampa 1: «es un insecto, luego es una abeja». El punto puede estar aquí.', {}],
        ['O aquí. Con solo saber que está en el grande no se sabe.', { x: 152, y: 116 }],
        ['Trampa 2: «no es una abeja, luego no es un insecto».', { lq: 0, x: 236, y: 120 }],
        ['Falso: puede estar en el grande sin estar en el chico.', { lq: 1 }],
        ['Solo hay dos deducciones seguras: si pasa p, pasa q; si no pasa q, no pasa p.', { lq: 0, lp: 0, pt: 0 }],
      ], 'Seguras: de p se llega a q, y de «no q» a «no p». Con q o con «no p» no se concluye nada.'),
      xpHaz('fichas', '«Si hay partido, hay trancón». ¿Con cuáles datos se puede concluir algo seguro?', { slots: Z('se concluye', 'no se sabe'), fichas: ['hay partido', 'no hay trancón', 'hay trancón', 'no hay partido'], meta: [['hay partido', 'no hay trancón'], ['hay trancón', 'no hay partido']], alto: 138, pista: 'Solo sirven p y «no q».' }, 'Con partido hay trancón; sin trancón no hay partido. Los otros dos no dicen nada.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Cada tarjeta tiene letra por un lado y número por el otro. Regla: «si hay vocal, al otro lado hay par». ¿Cuáles hay que voltear para revisarla?', { f: 1, c: 4, cw: 70, ch: 74, celda: i => ['E', 'K', '4', '7'][i], unoAUno: true, meta: [0, 3], dice: c => (c[2] ? 'Con el 4: detrás puede haber vocal o consonante; nunca rompe la regla.' : c[1] ? 'La regla no habla de consonantes.' : 'Voltea solo las que podrían romper la regla.') }, 'La E (debe tener par) y el 7 (no puede tener vocal). El 4 y la K nunca la rompen.')],
  ], 'p dentro de q, el contrarrecíproco que vale, y las dos trampas que no.');
}
