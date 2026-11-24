// Preuniversitario · pu-gr-3 «Qué se puede concluir» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos barras con el eje empezando en f.
  const eje = (v, K) => { const H = 136, Y = x => 170 - Math.max(0, (x - v.f) / (v.top - v.f)) * H; return [0, 0.5, 1].map(t => { const x = v.f + (v.top - v.f) * t; return K.l(60, Y(x), 310, Y(x), 'ls') + K.t(52, Y(x) + 4, Math.round(x), 's tm', 'end'); }).join('') + K.r(90, Y(v.a), 70, 170 - Y(v.a), 'fa') + K.r(210, Y(v.b), 70, 170 - Y(v.b), 'fg') + K.t(125, 188, `A: ${v.a}`, 's') + K.t(245, 188, `B: ${v.b}`, 's'); };
  const grupo = (K, x, y, n, k, cols, u, cls) => { let h = ''; for (let i = 0; i < n; i++) h += K.c(x + (i % cols) * u, y + Math.floor(i / cols) * u, u * 0.36, i < k ? cls : 'fc'); return h; };
  // Ciudad de 10 × 10: al oeste casi todos opinan que sí. La muestra es un rectángulo o un puñado repartido.
  const SI = i => (i % 10) < (Math.floor(i / 10) % 2 ? 4 : 5), REP = [3, 12, 18, 27, 34, 41, 50, 59, 66, 72, 75, 88, 93, 97, 9, 20];
  const ciudad = (v, K) => { let h = ''; for (let i = 0; i < 100; i++) { const x = 70 + (i % 10) * 18, y = 18 + Math.floor(i / 10) * 17, en = v.m < 0.5 ? false : v.m < 1.5 ? i % 10 < 4 && i < 40 : REP.includes(i); h += K.c(x, y, 5.5, SI(i) ? 'fA' : 'fG') + (en ? K.c(x, y, 8.5, 'fn') : ''); } return h + K.t(258, 80, v.p || '', 'ta', 'start') + K.t(258, 104, v.q || '', 's tm', 'start'); };
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];

  xpLec('pu-gr-3', [
    ['El eje que engaña',
      xpMira('dibujo', 'Empecemos por la idea: si el eje no empieza en 0, la diferencia **se agranda**.', { dib: eje, v: { a: 96, b: 100, f: 94, top: 102 }, alto: 200 }, [
        ['La barra B parece tres veces más alta que la A.', {}],
        ['Pero mira el eje: empieza en 94, no en 0.', {}],
        ['Bajemos el eje hasta 0. Las barras casi son iguales: 96 y 100.', { f: 0 }],
        ['La diferencia es de 4, apenas un poco más del 4 %.', {}, '$\\tfrac{4}{96} \\approx 4.2\\,\\%$'],
      ], 'Antes de comparar alturas, mira dónde empieza el eje. Compara los números, no el dibujo.'),
      xpHaz('dibujo', 'A vende 60 y B vende 70. Sube el piso del eje hasta que B **parezca** el doble de alta que A.', { dib: eje, v: { a: 60, b: 70, f: 0, top: 72 }, metas: { f: 50 }, alto: 250, manijas: [{ k: 'f', min: 0, max: 58, paso: 2, et: 'el eje empieza en' }],
        lee: v => `$\\tfrac{70 - ${v.f}}{60 - ${v.f}} = ${N((70 - v.f) / (60 - v.f))}$`, dice: v => `Con el piso en ${v.f}, las barras miden ${60 - v.f} y ${70 - v.f}.` }, 'Con el piso en 50 miden 10 y 20: parece el doble, y en realidad es un 17 % más.')],
    ['Cantidad no es proporción',
      xpMira('dibujo', 'Segunda idea: para comparar grupos de **distinto tamaño**, usa la proporción.', { dib: (v, K) => grupo(K, 40, 50, 40, 20, 8, 15, 'fA') + grupo(K, 190, 50, 100, 30, 10, 15, 'fG') + K.t(92, 30, '20 de 40', 'ta') + K.t(258, 30, '30 de 100', 'tg') + K.f(v.p, K.t(92, 146, '50 %', 'b ta') + K.t(258, 216, '30 %', 'b tg')), v: { p: 0 }, alto: 225 }, [
        ['En un salón, 20 tocan guitarra. En otro, 30. ¿Dónde hay más afición?', {}],
        ['30 es más que 20, pero el segundo salón es mucho más grande.', {}],
        ['Miremos de cada cien: 20 de 40 es la mitad; 30 de 100 es el 30 %.', { p: 1 }, '$\\tfrac{20}{40} = 50\\,\\% \\quad \\tfrac{30}{100} = 30\\,\\%$'],
        ['En proporción, hay más afición en el salón pequeño.', {}],
      ], 'La cantidad cuenta cuántos; la proporción dice cuántos **de cada cien**.'),
      xpHaz('fichas', 'En el barrio P reciclan 24 de 80 casas; en el Q, 18 de 45. Pon los porcentajes y dónde es mayor la proporción.', { slots: [{ x: 62, y: 58, w: 92, et: 'barrio P' }, { x: 170, y: 58, w: 92, et: 'barrio Q' }, { x: 278, y: 58, w: 92, et: 'mayor en' }], fichas: ['30 %', '40 %', 'P', 'Q', '24 %', '18 %'], meta: ['30 %', '40 %', 'Q'], alto: 106, pista: 'Divide cada cantidad entre el total de su barrio.' }, '$\\tfrac{24}{80} = 30\\,\\%$ y $\\tfrac{18}{45} = 40\\,\\%$: recicla más, en proporción, el Q.')],
    ['¿A quién se le preguntó?',
      xpMira('dibujo', 'Tercera idea: una **muestra** sirve si se parece a todos.', { dib: ciudad, v: { m: 0, p: '', q: '' }, alto: 190 }, [
        ['Una ciudad de 100 personas. Las verdes dicen que sí: son 45.', { p: '45 %', q: 'de verdad' }],
        ['Un periodista pregunta solo en un barrio, arriba a la izquierda.', { m: 1, p: '', q: '' }],
        ['Allí todos dicen que sí. Anuncia: «el 100 % está de acuerdo».', { p: '100 %', q: 'según él' }],
        ['Si escoge personas por toda la ciudad, al azar, se acerca mucho más.', { m: 2, p: '7 de 16', q: 'el 44 %' }, '$\\tfrac{7}{16} \\approx 44\\,\\%$'],
        ['Una muestra de un solo lugar no representa a todos, aunque sea grande.', {}],
      ], 'Una muestra representa a todos si se escoge al azar y de todas partes.'),
      xpHaz('fichas', 'Se quiere saber cuánto leen **todos** los estudiantes de un colegio. ¿Qué muestras sirven?', { slots: Z('sirve', 'no sirve'), fichas: ['en la biblioteca', 'lista al azar', 'solo grado once', 'sorteo en todos'], meta: [['lista al azar', 'sorteo en todos'], ['en la biblioteca', 'solo grado once']], alto: 138, pista: '¿Todos tienen la misma oportunidad de salir?' }, 'En la biblioteca y en un solo grado quedan por fuera muchos; el azar por todo el colegio no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A 200 clientes escogidos al azar se les preguntó: 120 prefieren té. ¿Qué se concluye de esos datos?', { slots: Z('se concluye', 'no se concluye'), fichas: ['60 % de la muestra', 'todos toman té', '80 no lo prefieren', 'es por el frío'], meta: [['60 % de la muestra', '80 no lo prefieren'], ['todos toman té', 'es por el frío']], alto: 138, pista: 'Los datos dicen cuántos; no dicen por qué, ni hablan de todos.' }, '120 de 200 es el 60 % y 80 no lo eligieron. Ni el motivo ni «todos» salen de esos números.')],
  ], 'Mirar el eje, comparar proporciones y preguntar a quién se le preguntó.');
}
