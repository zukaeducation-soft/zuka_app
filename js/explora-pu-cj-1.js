// Preuniversitario · pu-cj-1 «Operaciones y Venn» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Dos círculos y sus cuatro zonas como caminos: a = solo A, i = ambos, b = solo B, o = afuera.
  const AX = 130, BX = 210, CY = 96, R = 68, dy = Math.sqrt(R * R - 1600), y1 = CY - dy, y2 = CY + dy;
  const P = { a: `M170 ${y1} A${R} ${R} 0 1 0 170 ${y2} A${R} ${R} 0 0 1 170 ${y1} Z`, i: `M170 ${y1} A${R} ${R} 0 0 1 170 ${y2} A${R} ${R} 0 0 1 170 ${y1} Z`, b: `M170 ${y1} A${R} ${R} 0 1 1 170 ${y2} A${R} ${R} 0 0 0 170 ${y1} Z` };
  const zona = (k, cls) => `<path class="xf ${cls} sn" d="${P[k]}"/>`;
  const venn = (v, K) => {
    let h = K.r(16, 8, 308, 190, v.o > 0.5 ? 'fa' : 'fc', 10);
    if (v.o > 0.5) h += ['a', 'i', 'b'].map(k => zona(k, 'fop')).join('');
    for (const k of ['a', 'i', 'b']) if (v[k] > 0.5) h += zona(k, 'fa');
    return h + K.c(AX, CY, R, 'fn') + K.c(BX, CY, R, 'fn') + K.t(AX - 62, 32, 'A', 'b ta') + K.t(BX + 62, 32, 'B', 'b tg');
  };
  const num = (v, K) => venn(v, K) + [['na', 105], ['ni', 170], ['nb', 235]].map(([k, x]) => K.t(x, CY + 6, v[k] ?? '', 'b')).join('') + K.t(44, 172, v.no ?? '', 'b tm') + (v.p ? K.t(170, 217, v.p, 'ta') : '');
  // Zonas para fichas: solo A, ambos, solo B y afuera.
  const Z = [{ x: 98, y: 96, w: 76, h: 112, n: 4, libre: true }, { x: 170, y: 96, w: 58, h: 100, n: 3, libre: true }, { x: 242, y: 96, w: 76, h: 112, n: 4, libre: true }, { x: 170, y: 172, w: 290, h: 24, n: 4, libre: true }];

  // Zona donde se suelta una ficha: según la distancia a los centros.
  const donde = (x, y) => { if (x < 10 || x > 330 || y < 4 || y > 202) return -1; const a = Math.hypot(x - AX, y - CY) <= R, b = Math.hypot(x - BX, y - CY) <= R; return a && b ? 1 : a ? 0 : b ? 2 : 3; };

  xpLec('pu-cj-1', [
    ['Cada cosa en su zona',
      xpMira('fichas', 'Empecemos por la idea: dos círculos hacen **cuatro zonas**.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34 } : z)), fichas: ['1', '2', '4', '5', '10', '15'], alto: 202, fondo: K => venn({}, K) }, [
        ['A son los pares y B, los múltiplos de 5. Repartimos algunos números.', {}],
        ['El 2 y el 4 son pares y no múltiplos de 5: van solo en A.', { pon: { 0: ['2', '4'] } }],
        ['El 10 cumple las dos cosas: va en el centro, en la intersección.', { pon: { 1: '10' } }],
        ['El 5 y el 15, solo en B.', { pon: { 2: ['5', '15'] } }],
        ['Y el 1 no cumple ninguna: queda afuera, en el universo.', { pon: { 3: '1' } }],
      ], 'Pregunta dos veces: ¿está en A?, ¿está en B? Las respuestas dicen la zona.'),
      xpHaz('fichas', 'A: divisores de 12. B: impares. Ubica los números.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34 } : z)), donde, fichas: ['1', '2', '3', '4', '5', '6', '7', '8'], meta: [['2', '4', '6'], ['1', '3'], ['5', '7'], '8'], alto: 202, fondo: K => venn({}, K), pista: 'El 1 y el 3 dividen a 12 y son impares.' }, 'Solo A: 2, 4, 6. Ambos: 1, 3. Solo B: 5, 7. Afuera: 8.')],
    ['Las operaciones se pintan',
      xpMira('dibujo', 'Segunda idea: cada operación **pinta** unas zonas.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0 }, alto: 206 }, [
        ['Unión: lo que está en A, en B o en los dos.', { a: 1, i: 1, b: 1 }, '$A \\cup B$'],
        ['Intersección: solo lo que está en los dos.', { a: 0, b: 0 }, '$A \\cap B$'],
        ['Diferencia A menos B: lo de A, quitándole lo que también es de B.', { a: 1, i: 0 }, '$A - B$'],
        ['Complemento de A: todo lo que **no** está en A, también lo de afuera.', { a: 0, b: 1, o: 1 }, '$A^c$'],
        ['Complemento de la unión: solo lo de afuera.', { b: 0 }, '$(A \\cup B)^c$'],
      ], 'Unión: todo. Intersección: lo común. Diferencia: quitar lo común. Complemento: lo que falta del universo.'),
      xpHaz('fichas', 'Pinta $(A \\cap B)^c$: lleva una mancha a cada zona que le pertenece.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34, n: 2 } : { ...z, n: 2 })), donde, fichas: ['●', '●', '●', '●'], meta: ['●', null, '●', '●'], alto: 202, fondo: (K, v, q) => venn({ a: q[0].length, i: q[1].length, b: q[2].length, o: q[3].length }, K), dice: q => (q[1].length ? 'El centro es justo lo que no va.' : 'Es todo lo que no está en la intersección.'), pista: 'Va todo menos el centro: solo A, solo B y afuera.' }, 'Todo menos el centro: es lo contrario de la intersección.')],
    ['Contar sin repetir',
      xpMira('dibujo', 'Tercera idea: al contar la unión, lo común **no se cuenta dos veces**.', { dib: num, v: { a: 1, i: 1, b: 1, o: 0, na: '', ni: '', nb: '', no: '', p: '' }, alto: 224 }, [
        ['A tiene 13 elementos, B tiene 8 y en común tienen 5.', { ni: '5' }],
        ['Solo en A quedan 13 menos 5: ocho.', { na: '8' }, '$13 - 5 = 8$'],
        ['Solo en B, 8 menos 5: tres.', { nb: '3' }, '$8 - 5 = 3$'],
        ['En la unión hay 8 más 5 más 3: dieciséis.', { p: '8 + 5 + 3 = 16' }, '$13 + 8 - 5 = 16$'],
        ['Sumar 13 y 8 daría 21: los 5 comunes se contarían dos veces.', {}],
      ], '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.'),
      xpHaz('fichas', 'A tiene 14 elementos, B tiene 11 y la unión, 19. Llena las zonas.', { slots: [{ x: 98, y: 96, w: 52 }, { x: 170, y: 96, w: 44 }, { x: 242, y: 96, w: 52 }], fichas: ['8', '6', '5', '14', '11', '3'], meta: ['8', '6', '5'], alto: 202, fondo: K => venn({}, K), pista: '14 + 11 son 25, y la unión es 19: sobran los que se contaron dos veces.' }, '$25 - 19 = 6$ en común; $14 - 6 = 8$ y $11 - 6 = 5$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un grupo de 30, 16 están en A, 12 en B y 5 en los dos. Llena las cuatro zonas.', { slots: [{ x: 98, y: 96, w: 52 }, { x: 170, y: 96, w: 44 }, { x: 242, y: 96, w: 52 }, { x: 54, y: 164, w: 52, h: 34 }], fichas: ['11', '5', '7', '7', '16', '12', '2'], meta: ['11', '5', '7', '7'], alto: 202, fondo: K => venn({}, K), pista: 'Empieza por el centro. Afuera quedan 30 menos los de la unión.' }, 'Centro 5, solo A 11, solo B 7: la unión es 23 y afuera quedan 7.')],
  ], 'Cuatro zonas, operaciones que las pintan y lo común que se cuenta una sola vez.');
}
