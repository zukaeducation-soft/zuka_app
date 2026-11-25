// Álgebra · mundos 1 (Teoría de Conjuntos: alg-0b y alg-0c) y 2 (La Recta Real), Explora. Ejemplos propios, que no salen en los ejercicios.
{
  const bola = (K, x, y, r, t, cls, tx = 'b') => K.c(x, y, r, cls) + K.t(x, y - r + 20, t, tx);
  // ---------------------------------------------------------------------------------------------------------- alg-0b
  const dentro = (v, K) => K.r(14, 8, 312, 160, 'fc', 10) + K.c(150 + 40 * (1 - v.in), 92, 66, 'fa') + K.t(150 + 40 * (1 - v.in) - 44, 46, 'B', 'b ta') + K.c(60 + 90 * v.in, 104, 30, 'fg') + K.t(60 + 90 * v.in, 110, 'A', 'b tg') + (v.p ? K.t(170, 190, v.p, 'ta') : '');
  const partes = (v, K) => {
    const n = Math.round(v.n), N = 2 ** n, e = ['t', 'c', 'm', 'q', 'n'], w = Math.min(58, 310 / Math.min(N, 8)); let h = K.t(170, 24, `{${e.slice(0, n).join(', ')}}`, 'b ta');
    for (let i = 0; i < N; i++) { const s = e.filter((_, k) => i >> k & 1).join(''); const f = Math.floor(i / 8), c = i % 8, x = 170 + (c - (Math.min(N, 8) - 1) / 2) * w; h += K.r(x - w / 2 + 2, 40 + f * 30, w - 4, 26, 'fa', 6) + K.t(x, 57 + f * 30, s || '∅', 's'); }
    return h;
  };
  xpLec('alg-0b', [
    ['Estar contenido', xpMira('dibujo', 'Empecemos por la idea: un conjunto puede estar **dentro** de otro.', { dib: dentro, v: { in: 0, p: '' }, alto: 200 }, [
      ['A son los perros callejeros del barrio; B, todos los perros del barrio.', {}],
      ['Cada elemento de A también está en B: A cabe entero dentro.', { in: 1 }, '$A \\subseteq B$'],
      ['Se dice que A es **subconjunto** de B. Basta un solo elemento afuera para que no lo sea.', {}, '$A \\subseteq B$'],
      ['Además, B tiene perros con dueño, que no están en A: es un subconjunto propio.', {}, '$A \\subset B$'],
      ['Ojo: ∈ une un elemento con un conjunto; ⊆ une dos conjuntos.', {}, '$x \\in A, \\quad A \\subseteq B$'],
    ], '$A \\subseteq B$: todo elemento de A está en B. El elemento usa $\\in$; el conjunto, $\\subseteq$.'),
    xpHaz('fichas', 'Deja en A solo letras que hagan cierto $A \\subseteq B$, con B = {r, i, o, s}. Son tres.', { slots: [{ x: 170, y: 50, w: 220, h: 56, n: 3 }], fichas: ['r', 'a', 's', 'm', 'o'], meta: [['r', 's', 'o']], alto: 90, pista: 'Alguna de tus letras no está en B.' }, 'r, s y o están en B: $\\{r, s, o\\} \\subseteq B$.')],
    ['El vacío y los iguales', xpMira('dibujo', 'Segunda idea: el **vacío** cabe en todos, y dos iguales caben uno en el otro.', { dib: (v, K) => K.c(90, 84, 54, 'fa') + K.t(90, 90, v.a, 's') + K.c(250, 84, 54, 'fg') + K.t(250, 90, v.b, 's') + K.t(170, 92, v.m, 'b'), v: { a: 'a, m, o, r', b: 'r, o, m, a', m: '?' }, alto: 160 }, [
      ['Letras de AMOR y letras de ROMA. ¿Son conjuntos distintos?', {}],
      ['Cada uno está dentro del otro: son el mismo conjunto.', { m: '=' }, '$A \\subseteq B \\text{ y } B \\subseteq A$'],
      ['Ahora A son los triángulos de cuatro lados. No hay ninguno.', { a: '∅', b: 'figuras', m: '⊆' }, '$A = \\varnothing$'],
      ['El vacío no tiene elementos que se salgan: está contenido en todo conjunto.', {}, '$\\varnothing \\subseteq B$'],
      ['Pero {∅} no está vacío: es una caja con una caja vacía adentro.', { a: '{∅}', b: '1 cosa', m: '→' }, '$\\{\\varnothing\\} \\neq \\varnothing$'],
    ], 'Iguales: cada uno contenido en el otro. El vacío está contenido en todos.'),
    xpFila('Pon entre cada pareja el símbolo que va: 3 □ {1, 3}; {3} □ {1, 3}; {3, 1} □ {1, 3}.', ['3 □ {1, 3}', '{3} □ {1, 3}', '{3, 1} □ {1, 3}'], ['∈', '⊂', '='], ['∉'], 'Elemento con conjunto: pertenece. Uno menor que el otro: contenido. Los mismos: iguales.', 'Elemento, subconjunto propio e iguales.')],
    ['Todos los subconjuntos', xpMira('dibujo', 'Tercera idea: el **conjunto de partes** reúne todos los subconjuntos.', { dib: partes, v: { n: 0 }, alto: 150 }, [
      ['El vacío tiene un solo subconjunto: él mismo.', {}, '$2^0 = 1$'],
      ['Con un elemento hay dos: no llevarlo o llevarlo.', { n: 1 }, '$2^1 = 2$'],
      ['Con dos, cuatro: cada subconjunto anterior sin el nuevo y con el nuevo.', { n: 2 }, '$2^2 = 4$'],
      ['Con tres, ocho. Cada elemento nuevo duplica.', { n: 3 }, '$2^3 = 8$'],
      ['Con n elementos: dos opciones por cada uno.', { n: 3 }, '$2^n$'],
    ], 'Un conjunto de n elementos tiene $2^n$ subconjuntos.'),
    xpMueve('¿Cuántos elementos hacen falta para tener **32** subconjuntos?', 230, { n: 1 }, [xpRegla('n', 0, 5, 'elementos')], { n: 5 }, partes, '$2^5 = 32$.', { lee: v => `$2^{${v.n}} = ${2 ** v.n}$` })],
    ['Ahora sí, un problema', xpMueve('Una hamburguesería cobra lo mismo por cualquier combinación de salsas, incluso ninguna. Quiere ofrecer **16** combinaciones. ¿Cuántas salsas necesita?', 230, { n: 1 }, [xpRegla('n', 0, 5, 'salsas')], { n: 4 }, partes, 'Cada salsa se pone o no: $2^4 = 16$.', { lee: v => `$2^{${v.n}} = ${2 ** v.n}$` })],
  ], 'Contenido es «todos los de uno están en el otro»; y hay $2^n$ subconjuntos.');

  // ---------------------------------------------------------------------------------------------------------- alg-0c
  const R = 62, h0 = Math.sqrt(R * R - 1444), T = 92 - h0, U = 92 + h0, ar = `A${R} ${R} 0`;
  const Z = { a: `M170 ${T} ${ar} 1 0 170 ${U} ${ar} 0 1 170 ${T} Z`, i: `M170 ${T} ${ar} 0 0 170 ${U} ${ar} 0 0 170 ${T} Z`, b: `M170 ${T} ${ar} 1 1 170 ${U} ${ar} 0 0 170 ${T} Z` };
  const pz = (k, c) => `<path class="xf ${c} sn" d="${Z[k]}"/>`;
  const venn = (v, K) => K.r(14, 10, 312, 164, v.o > 0.5 ? 'fa' : 'fc', 10) + ['a', 'i', 'b'].map(k => pz(k, v[k] > 0.5 ? 'fa' : 'fop')).join('') + K.c(132, 92, R, 'fn') + K.c(208, 92, R, 'fn') + K.t(66, 34, 'A', 'b ta') + K.t(274, 34, 'B', 'b tg') + [['ta', 102], ['ti', 170], ['tb', 238]].map(([k, x]) => K.t(x, 98, v[k] || '', 's')).join('') + (v.p ? K.t(170, 196, v.p, 'ta') : '');
  const num = (v, K) => { const i = v.i, a = v.A - i, b = v.B - i; return venn({ a: 1, i: 1, b: 1 }, K) + K.t(102, 98, K.sig(a), 'b') + K.t(170, 98, K.sig(i), 'b') + K.t(238, 98, K.sig(b), 'b') + K.t(170, 194, `en total ${K.sig(a + i + b)}`, 's'); };
  xpLec('alg-0c', [
    ['Unir y cruzar', xpMira('dibujo', 'Empecemos por la idea: la **unión** junta y la **intersección** deja lo común.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0, ta: 'bus', ti: 'a pie', tb: 'bici' }, alto: 180 }, [
      ['A: como llega Lina al trabajo, en bus o a pie. B: como llega Óscar, en bici o a pie.', {}],
      ['La unión toma lo que está en A, en B o en los dos, sin repetir.', { a: 1, i: 1, b: 1 }, '$A \\cup B$'],
      ['La intersección, solo lo que está en los dos: a pie.', { a: 0, b: 0 }, '$A \\cap B$'],
      ['«O» une y «y» cruza.', {}, '$A \\cap B$'],
      ['Si no comparten nada, la intersección es el vacío: son disjuntos.', { i: 0, ti: '' }, '$A \\cap B = \\varnothing$'],
    ], '$\\cup$: en uno o en el otro. $\\cap$: en los dos.'),
    xpFila('A = {lun, mié, vie}; B = {mié, jue}. ¿Cuántos elementos hay?', ['A ∪ B', 'A ∩ B', 'A'], ['4', '1', '3'], ['5', '2'], 'El miércoles está en los dos: en la unión se cuenta una sola vez.', 'La unión tiene 4, porque mié no se repite.')],
    ['Quitar', xpMira('dibujo', 'Segunda idea: la **diferencia** quita y el **complemento** toma lo de afuera.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0 }, alto: 180 }, [
      ['A menos B: lo de A que no está en B.', { a: 1 }, '$A - B$'],
      ['B menos A es otra zona: el orden importa.', { a: 0, b: 1 }, '$B - A$'],
      ['Las dos a la vez: en uno o en otro, pero no en ambos.', { a: 1 }, '$A \\triangle B$'],
      ['El complemento de A es todo lo del universo que no está en A.', { a: 0, b: 1, o: 1 }, "$A'$"],
      ['Afuera de la unión: ni en A ni en B.', { b: 0 }, "$(A \\cup B)' = A' \\cap B'$"],
    ], 'La diferencia parte de uno y quita el otro; el complemento necesita el universo.'),
    xpFila('U = {1, …, 8}; A = {2, 3, 5, 7}; B = {3, 6}. ¿Cuántos elementos?', ['A − B', 'B − A', 'A△B', "A'"], ['3', '1', '4', '4'], ['2', '8'], 'Empieza por lo común, el 3. La diferencia simétrica junta las dos diferencias.', 'A − B = {2, 5, 7}; B − A = {6}; juntas, cuatro.')],
    ['Contar sin repetir', xpMira('dibujo', 'Tercera idea: al sumar A y B, lo común se cuenta **dos veces**.', { dib: num, v: { A: 9, B: 7, i: 0 }, alto: 205 }, [
      ['9 personas tocan tambor y 7 cantan. Si nadie hace las dos cosas, son 16.', {}, '$9 + 7 = 16$'],
      ['Si una hace las dos, va en la zona del medio y el total baja.', { i: 1 }, '$9 + 7 - 1 = 15$'],
      ['Con cuatro comunes, baja cuatro.', { i: 4 }, '$9 + 7 - 4 = 12$'],
      ['Se suma todo y se resta una vez lo común.', {}, '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$'],
    ], '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.'),
    xpMueve('11 personas tienen moto y 8, bicicleta. En total son **14**. Mueve cuántas tienen las dos.', 270, { A: 11, B: 8, i: 0 }, [xpRegla('i', 0, 8, 'tienen las dos')], { i: 5 }, num, '$11 + 8 - 5 = 14$.', { lee: v => `$11 + 8 - ${v.i} = ${19 - v.i}$` })],
    ['Ahora sí, un problema', xpFila('De 40 viajeros, 22 llevan mapa, 17 brújula y 8 las dos. Llena las cuatro zonas.', ['solo mapa', 'las dos', 'solo brújula', 'nada'], ['14', '8', '9', '9'], ['22', '17', '1'], 'Empieza por las dos y réstalo a cada total; lo que falte para 40 no lleva nada.', '$14 + 8 + 9 = 31$ y quedan 9 sin nada.')],
  ], 'Unir, cruzar, quitar y mirar afuera: cada operación es una zona.');

  // ---------------------------------------------------------------------------------------------------------- alg-11
  const recta = (v, K) => { const L = XM.linea(K, -6, 6, 110); return L.s + K.c(L.X(v.x), 110, 8, 'fA') + (v.q > 0.5 ? K.ar(L.X(v.d), 84, L.X(v.x), 84, 'la gr') : '') + (v.e > 0.5 ? K.c(L.X(-v.x), 110, 8, 'fF') + K.l(L.X(0), 60, L.X(0), 140, 'lm d') : '') + (v.p ? K.t(170, 40, v.p, 'b ta') : ''); };
  xpLec('alg-11', [
    ['Contar y deber', xpMira('dibujo', 'Empecemos por la idea: los **naturales** cuentan; los **enteros** también pueden deber.', { dib: recta, v: { x: 3, d: 0, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['1, 2, 3… sirven para contar: son los naturales.', {}, '$\\mathbb{N}$'],
      ['Un buzo está 3 metros sobre el agua y baja 5. ¿Dónde queda?', { d: 3, q: 1, x: -2 }, '$3 - 5 = -2$'],
      ['No hay natural para eso: hacen falta los negativos.', { q: 0 }, '$-2$'],
      ['Con el cero y los negativos se arman los enteros.', {}, '$\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$'],
      ['Todo natural es entero, pero no al revés.', {}, '$\\mathbb{N} \\subset \\mathbb{Z}$'],
    ], '$\\mathbb{N} \\subset \\mathbb{Z}$: los enteros suman el cero y los negativos.'),
    xpMueve('Un ascensor está en el piso 4 y baja 7. Llévalo a donde queda.', 220, { x: 4, d: 4, q: 1, e: 0 }, [xpRegla('x', -6, 6, 'piso')], { x: -3 }, recta, '$4 - 7 = -3$: tercer sótano.', { lee: v => `$${v.x}$` })],
    ['El espejo del cero', xpMira('dibujo', 'Segunda idea: cada entero tiene un **opuesto**, a la misma distancia del cero.', { dib: recta, v: { x: 4, d: 0, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['El 4 está a cuatro pasos del cero.', {}],
      ['Al otro lado, a los mismos pasos, está su opuesto: −4.', { e: 1 }, '$4 + (-4) = 0$'],
      ['El opuesto de −5 es 5: dos cambios de lado.', { x: -5 }, '$-(-5) = 5$'],
      ['Juntos siempre dan cero.', {}, '$a + (-a) = 0$'],
      ['El cero es su propio opuesto.', { x: 0 }, '$-0 = 0$'],
    ], 'El opuesto está a la misma distancia del cero y juntos dan 0.'),
    xpMueve('Mueve el punto hasta que su opuesto (el otro color) quede en **5**.', 220, { x: 2, d: 0, q: 0, e: 1 }, [xpRegla('x', -6, 6, 'punto')], { x: -5 }, recta, 'El opuesto de $-5$ es 5.', { lee: v => `$-(${v.x}) = ${-v.x}$` })],
    ['Restar es sumar el opuesto', xpMira('dibujo', 'Tercera idea: restar un negativo **quita una deuda**.', { dib: recta, v: { x: -2, d: -2, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['Tienes −2: debes dos.', {}, '$-2$'],
      ['Te quitan una deuda de 5: quedas mejor.', { q: 1, x: 3, p: '−2 − (−5)' }, '$-2 - (-5)$'],
      ['Es lo mismo que sumar 5.', { p: '−2 + 5 = 3' }, '$-2 + 5 = 3$'],
      ['Siempre: restar es sumar el opuesto.', {}, '$a - b = a + (-b)$'],
    ], '$a - b = a + (-b)$.'),
    xpMueve('Lleva el punto al resultado de $-3 - (-7)$.', 220, { x: -3, d: -3, q: 1, e: 0 }, [xpRegla('x', -6, 6, 'resultado')], { x: 4 }, recta, '$-3 + 7 = 4$.', { lee: v => `$${v.x}$` })],
    ['Ahora sí, un problema', xpFila('A las 6 a. m. hay −5 °C; sube 9 y luego baja 7. Pon la temperatura después de cada cambio.', ['sube 9', 'baja 7'], ['4', '−3'], ['14', '3', '−4'], 'Desde −5, nueve pasos a la derecha; y desde ahí, siete a la izquierda.', '$-5 + 9 = 4$ y $4 - 7 = -3$.')],
  ], 'Los enteros tienen opuestos, y restar es sumar el opuesto.');

  // ---------------------------------------------------------------------------------------------------------- alg-11b
  const frac = (v, K) => { const d = Math.round(v.d), n = Math.round(v.n); return Array.from({ length: d }, (_, i) => K.r(20 + i * 300 / d, 50, 300 / d, 50, i < n ? 'fa' : 'fc')).join('') + K.t(170, 34, `${n}/${d}`, 'b ta') + (v.m > 0.5 ? XM.barra(K, 112, [[v.mn, '', 'fg'], [v.md - v.mn, '', 'fc']], { h: 26 }) : ''); };
  xpLec('alg-11b', [
    ['Partes iguales', xpMira('dibujo', 'Empecemos por la idea: un **racional** es un reparto en partes iguales.', { dib: frac, v: { d: 1, n: 1 }, alto: 130 }, [
      ['Una cinta entera, sin cortes.', {}],
      ['Se parte en 5 pedazos iguales: cada uno es un quinto.', { d: 5, n: 1 }, '$\\tfrac15$'],
      ['Tomamos tres: tres quintos.', { n: 3 }, '$\\tfrac35$'],
      ['Abajo, en cuántas partes; arriba, cuántas se toman.', {}, '$\\tfrac{a}{b}, \\ b \\neq 0$'],
      ['Abajo no puede ir 0: no se puede partir en cero pedazos.', {}, '$b \\neq 0$'],
    ], 'Racional: un cociente de enteros con denominador distinto de 0.'),
    xpMueve('Arma $\\tfrac{4}{7}$ de la cinta.', 240, { d: 2, n: 1 }, [xpRegla('d', 2, 9, 'partes'), xpRegla('n', 0, 9, 'tomadas')], { d: 7, n: 4 }, frac, 'Siete partes y cuatro tomadas.', { lee: v => `$\\tfrac{${v.n}}{${v.d}}$` })],
    ['El mismo pedazo', xpMira('dibujo', 'Segunda idea: fracciones distintas pueden valer **lo mismo**.', { dib: frac, v: { d: 3, n: 2, m: 1, mn: 2, md: 3 }, alto: 150 }, [
      ['Arriba, dos tercios. Abajo, la misma cantidad sin cortes.', {}, '$\\tfrac23$'],
      ['Cortamos cada tercio en dos: seis pedazos, cuatro tomados.', { d: 6, n: 4 }, '$\\tfrac46$'],
      ['El largo no cambió: se multiplicó arriba y abajo por 2.', {}, '$\\tfrac23 = \\tfrac46$'],
      ['Al revés, dividir arriba y abajo simplifica.', { d: 3, n: 2 }, '$\\tfrac46 = \\tfrac23$'],
    ], 'Multiplicar o dividir arriba y abajo por lo mismo no cambia el valor.'),
    xpMueve('Con **12** partes, toma las que valen lo mismo que la barra de abajo, $\\tfrac34$.', 230, { d: 12, n: 2, m: 1, mn: 3, md: 4 }, [xpRegla('n', 0, 12, 'tomadas')], { n: 9 }, frac, '$\\tfrac34 = \\tfrac{9}{12}$.', { lee: v => `$\\tfrac{${v.n}}{12}$` })],
    ['Decimales que paran o se repiten', xpMira('dibujo', 'Tercera idea: al dividir, el decimal **se detiene** o **se repite**.', { dib: (v, K) => XM.pasos(K, v, ['3 ÷ 4 = 0.75', '2 ÷ 11 = 0.18 18…', '0.18 18… = 2/11'], 44, 40), v: { n: 1 }, alto: 150 }, [
      ['3 ÷ 4: el residuo llega a cero y se detiene.', {}, '$\\tfrac34 = 0.75$'],
      ['2 ÷ 11: los residuos se repiten y las cifras también.', { n: 2 }, '$\\tfrac{2}{11} = 0.\\overline{18}$'],
      ['Solo hay unos pocos residuos posibles: tarde o temprano vuelve alguno.', {}],
      ['Y al revés: todo decimal que para o se repite viene de una fracción.', { n: 3 }, '$0.\\overline{18} = \\tfrac{18}{99} = \\tfrac{2}{11}$'],
    ], 'Racional = decimal que termina o que se repite.'),
    xpFila('Pon cada decimal bajo su fracción.', ['1/4', '4/9', '7/20'], ['0.25', '0.444…', '0.35'], ['0.4', '0.14', '0.49'], 'Los novenos se repiten; los cuartos y veinteavos se vuelven centésimos.', 'Dos se detienen y los novenos se repiten.')],
    ['Ahora sí, un problema', xpMueve('De una pista de 1 km, Iván corrió $\\tfrac25$. Con marcas cada **décimo**, ¿cuántas marcas pasó?', 230, { d: 10, n: 0, m: 1, mn: 2, md: 5 }, [xpRegla('n', 0, 10, 'décimos')], { n: 4 }, frac, '$\\tfrac25 = \\tfrac{4}{10} = 0.4$.', { lee: v => `$\\tfrac{${v.n}}{10}$` })],
  ], 'Un racional es un reparto: muchas fracciones lo nombran y su decimal para o se repite.');

  // ---------------------------------------------------------------------------------------------------------- alg-11c
  const diag = (v, K) => K.p([[40, 150], [40 + v.l * 40, 150], [40 + v.l * 40, 150 - v.l * 40], [40, 150 - v.l * 40]], 'fa') + K.l(40, 150, 40 + v.l * 40, 150 - v.l * 40, 'lf gr') + K.f(v.g, K.ar(40, 170, 40 + v.l * 56.57, 170, 'lf gr') + K.t(50 + v.l * 56.57, 176, v.t || '√2', 'b tf', 'start'));
  const lupa = (v, K) => { const a = Math.round(v.a * 10) / 10, L = XM.linea(K, 0, 6, 90); return L.s + K.r(L.X(v.a), 70, L.X(v.a + v.w) - L.X(v.a), 40, 'fa') + K.t(170, 40, `${K.sig(a * a)}  y  ${K.sig((a + v.w) ** 2)}`, 'b ta'); };
  xpLec('alg-11c', [
    ['Un largo sin fracción', xpMira('dibujo', 'Empecemos por la idea: hay largos que **ninguna fracción** mide.', { dib: diag, v: { l: 2, g: 0 }, alto: 190 }, [
      ['Un cuadrado de lado 1. Su diagonal parte la figura en dos triángulos.', {}],
      ['Por Pitágoras, la diagonal al cuadrado es 1 + 1.', {}, '$d^2 = 1^2 + 1^2 = 2$'],
      ['La diagonal mide raíz de dos.', { g: 1 }, '$d = \\sqrt2$'],
      ['Su decimal ni para ni se repite: 1.41421356…', {}, '$1.41421356\\ldots$'],
      ['No es racional: se llama **irracional**. π es otro.', {}, '$\\sqrt2, \\pi \\in \\mathbb{I}$'],
    ], 'Irracional: su decimal no termina ni se repite.'),
    xpFila('Pon cada número en su familia más pequeña.', ['√9', '−2.5', '√5'], ['natural', 'racional', 'irracional'], ['entero'], 'Primero calcula la raíz si es exacta. −2.5 es una división de enteros.', '$\\sqrt9 = 3$ es natural; $\\sqrt5$ no es exacta.')],
    ['Encerrar una raíz', xpMira('dibujo', 'Segunda idea: una raíz se **encierra** entre dos números que sí conocemos.', { dib: lupa, v: { a: 2, w: 1 }, alto: 130 }, [
      ['¿Dónde está raíz de siete? Probemos entre 2 y 3.', {}],
      ['Dos al cuadrado es 4 y tres al cuadrado, 9. El 7 queda en medio.', {}, '$2 < \\sqrt7 < 3$'],
      ['Se angosta: 2.5 al cuadrado es 6.25.', { a: 2.5, w: 0.5 }, '$2.5 < \\sqrt7 < 3$'],
      ['Y 2.6 al cuadrado es 6.76; 2.7, 7.29.', { a: 2.6, w: 0.1 }, '$2.6 < \\sqrt7 < 2.7$'],
      ['Nunca se llega exacto, pero se puede acercar cuanto se quiera.', {}, '$\\sqrt7 \\approx 2.65$'],
    ], 'Si $a^2 < n < b^2$, entonces $a < \\sqrt{n} < b$.'),
    xpMueve('Mueve la ventana de ancho 1 hasta encerrar $\\sqrt{20}$.', 190, { a: 0, w: 1 }, [xpRegla('a', 0, 4, 'empieza en')], { a: 4 }, lupa, '$4^2 = 16$ y $5^2 = 25$.', { lee: v => `$${v.a}^2 = ${v.a ** 2}, \\ ${v.a + 1}^2 = ${(v.a + 1) ** 2}$` })],
    ['La recta llena', xpMira('dibujo', 'Tercera idea: racionales e irracionales juntos llenan la recta: los **reales**.', { dib: (v, K) => { const L = XM.linea(K, -2, 4, 80); return L.s + [[-1.5, 'fa', 1], [0.75, 'fa', 1], [2, 'fa', 1], [1.414, 'fF', 2], [3.1416, 'fF', 2]].map(([x, c, k]) => K.f(v.n - k + 1, K.c(L.X(x), 80, 6, c))).join('') + K.f(v.n - 2, K.r(L.X(-2), 76, 292, 8, 'fo')); }, v: { n: 0 }, alto: 120 }, [
      ['Primero, algunos racionales en la recta.', { n: 1 }, '$\\mathbb{Q}$'],
      ['Entre dos racionales cualquiera siempre hay otro.', {}, '$\\tfrac{a+b}{2}$'],
      ['Aun así quedan huecos: ahí están los irracionales.', { n: 2 }, '$\\mathbb{I}$'],
      ['Juntos, sin huecos, son los reales.', { n: 3 }, '$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$'],
    ], '$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$ y $\\mathbb{Q} \\cap \\mathbb{I} = \\varnothing$.'),
    xpFila('Ordena de menor a mayor.', ['1.º', '2.º', '3.º'], ['1.4', '√2', '3/2'], [], 'Raíz de dos vale 1.414…', '$1.4 < 1.414\\ldots < 1.5$.')],
    ['Ahora sí, un problema', xpMueve('Un jardín cuadrado tiene **30** m² de área. ¿Entre qué enteros está su lado? Mueve la ventana (hasta 6).', 190, { a: 0, w: 1 }, [xpRegla('a', 0, 5, 'empieza en')], { a: 5 }, lupa, '$5^2 = 25 < 30 < 36 = 6^2$.', { lee: v => `$${v.a ** 2} \\ \\text{y} \\ ${(v.a + 1) ** 2}$` })],
  ], 'Los irracionales llenan los huecos; juntos con los racionales son los reales.');

  // ---------------------------------------------------------------------------------------------------------- alg-12b
  const rec = (v, K) => XM.reja(K, 40, 30, v.b, v.a, 26, 'fa') + XM.reja(K, 40 + v.b * 26 + v.s * 24, 30, v.c, v.a, 26, 'fg');
  xpLec('alg-12b', [
    ['Cambiar y agrupar', xpMira('dibujo', 'Empecemos por la idea: sumar y multiplicar dejan **cambiar el orden** y **agrupar**.', { dib: (v, K) => K.f(1 - v.g, XM.reja(K, 60, 20, 5, 3, 30)) + K.f(v.g, XM.reja(K, 120, 20, 3, 5, 26, 'fg')), v: { g: 0 }, alto: 165 }, [
      ['Una bandeja de 3 filas con 5 panes.', {}, '$3 \\cdot 5$'],
      ['Se gira: 5 filas de 3. Son los mismos panes.', { g: 1 }, '$5 \\cdot 3$'],
      ['Es la propiedad **conmutativa**: vale para sumar y para multiplicar.', {}, '$a \\cdot b = b \\cdot a$'],
      ['La **asociativa** deja escoger qué se hace primero.', {}, '$(a + b) + c = a + (b + c)$'],
      ['Restar y dividir no dejan: 8 − 3 no es 3 − 8.', {}, '$8 - 3 \\neq 3 - 8$'],
    ], 'Conmutativa cambia el orden; asociativa, la agrupación. Solo suma y producto.'),
    xpFila('Agrupa para calcular fácil: $25 \\cdot 7 \\cdot 4$. Pon la pareja y el resultado.', ['25 · 4', 'por 7'], ['100', '700'], ['175', '28', '107'], 'Cambia el orden: multiplica 25 por 4 antes.', '$(25 \\cdot 4) \\cdot 7 = 700$.')],
    ['Repartir', xpMira('dibujo', 'Segunda idea: la **distributiva** une la suma con el producto.', { dib: rec, v: { a: 3, b: 4, c: 3, s: 1 }, alto: 120 }, [
      ['Dos bloques de 3 filas: uno de 4 y otro de 3.', {}, '$3 \\cdot 4 + 3 \\cdot 3$'],
      ['Se juntan: un solo bloque de 3 filas y 7 columnas.', { s: 0 }, '$3 \\cdot (4 + 3)$'],
      ['Son los mismos cuadros: 12 y 9, o 21 de una vez.', {}, '$3(4 + 3) = 12 + 9$'],
      ['Separar es distribuir; juntar es sacar factor común.', { s: 1 }, '$a(b + c) = ab + ac$'],
    ], '$a(b + c) = ab + ac$: se lee en los dos sentidos.'),
    xpMueve('Haz que los dos bloques sumen **32** cuadros con 4 filas y el primero de 5 columnas.', 260, { a: 4, b: 5, c: 1, s: 0.5 }, [xpRegla('c', 1, 6, 'columnas del segundo')], { c: 3 }, rec, '$4(5 + 3) = 32$.', { lee: v => `$4(5 + ${v.c}) = ${4 * (5 + v.c)}$` })],
    ['Neutros e inversos', xpMira('dibujo', 'Tercera idea: hay números que **no cambian nada** y otros que **deshacen**.', { dib: (v, K) => { const L = XM.linea(K, -4, 4, 60); return L.s + K.c(L.X(v.x), 60, 8, 'fA') + K.t(170, 116, v.p, 'b ta'); }, v: { x: 3, p: '3 + 0 = 3' }, alto: 140 }, [
      ['Sumar 0 deja igual: es el neutro de la suma.', {}, '$a + 0 = a$'],
      ['Su inverso aditivo lo lleva a 0.', { x: 0, p: '3 + (−3) = 0' }, '$a + (-a) = 0$'],
      ['Multiplicar por 1 deja igual.', { x: 4, p: '4 · 1 = 4' }, '$a \\cdot 1 = a$'],
      ['El recíproco lo lleva a 1.', { x: 1, p: '4 · 1/4 = 1' }, '$a \\cdot \\tfrac1a = 1$'],
      ['El 0 no tiene recíproco: nada por 0 da 1.', { x: 0, p: '0 · ? = 1' }, '$a \\neq 0$'],
    ], 'Neutros: 0 y 1. Inversos: el opuesto lleva a 0; el recíproco, a 1.'),
    xpFila('Pon lo que deshace cada cosa.', ['+ (−6)', '· 5/3', '· (−2)'], ['+ 6', '· 3/5', '· (−1/2)'], ['· 2', '− 6', '· 5/3'], 'A una suma la deshace el opuesto; a un producto, el recíproco, que conserva el signo.', 'Opuesto para la suma; recíproco para el producto.')],
    ['Ahora sí, un problema', xpFila('6 cajas con 18 limas y 6 con 12 limones. Saca el 6 y calcula.', ['18 + 12', 'por 6'], ['30', '180'], ['108', '72', '36'], 'Es $6 \\cdot 18 + 6 \\cdot 12$: junta primero.', '$6(18 + 12) = 6 \\cdot 30 = 180$.')],
  ], 'Cambiar, agrupar, repartir y deshacer: con eso se mueve todo el álgebra.');

  // ---------------------------------------------------------------------------------------------------------- alg-12c
  const giro = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.ar(L.X(0), 78, L.X(v.x), 78, 'la gr') + K.t(170, 40, v.p || '', 'b ta'); };
  xpLec('alg-12c', [
    ['Restar y dividir se deshacen', xpMira('dibujo', 'Empecemos por la idea: restar y dividir son **sumar y multiplicar disfrazados**.', { dib: (v, K) => XM.pasos(K, v, ['10 − 4 = 10 + (−4)', '12 ÷ 3 = 12 · 1/3', '12 ÷ 2/5 = 12 · 5/2 = 30'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['Restar 4 es sumar su opuesto.', { n: 1 }, '$a - b = a + (-b)$'],
      ['Dividir entre 3 es multiplicar por su recíproco.', { n: 2 }, '$a \\div b = a \\cdot \\tfrac1b$'],
      ['Por eso, dividir entre dos quintos es multiplicar por cinco medios.', { n: 3 }, '$12 \\cdot \\tfrac52 = 30$'],
      ['Y por eso no se divide entre 0: no tiene recíproco.', {}, '$a \\div 0 \\ \\text{no existe}$'],
    ], 'Restar: sumar el opuesto. Dividir: multiplicar por el recíproco.'),
    xpFila('Pon cada resultado.', ['8 ÷ 1/2', '6 ÷ 3/4', '−5 − (−9)'], ['16', '8', '4'], ['4.5', '−14', '2'], 'Multiplica por el recíproco; y quitar −9 es sumar 9.', '$8 \\cdot 2$, $6 \\cdot \\tfrac43$ y $-5 + 9$.')],
    ['Por qué menos por menos es más', xpMira('dibujo', 'Segunda idea: multiplicar por −1 **voltea** la flecha.', { dib: giro, v: { x: 3, p: '3' }, alto: 140 }, [
      ['Una flecha de 3 hacia la derecha.', {}],
      ['Por 2: el doble de larga, misma dirección.', { x: 6, p: '2 · 3 = 6' }, '$2 \\cdot 3 = 6$'],
      ['Por −2: el doble de larga y volteada.', { x: -6, p: '−2 · 3 = −6' }, '$-2 \\cdot 3 = -6$'],
      ['Otra vez por −1: se voltea y vuelve a la derecha.', { x: 6, p: '(−1)(−6) = 6' }, '$(-1)(-6) = 6$'],
      ['Dos vueltas dejan la flecha como estaba.', {}, '$(-a)(-b) = ab$'],
    ], 'Cada factor negativo voltea; dos vueltas se anulan.'),
    xpMueve('Lleva la flecha a $(-2)(-4)$.', 200, { x: -4, p: '' }, [xpRegla('x', -8, 8, 'flecha', 2)], { x: 8 }, giro, 'Dos negativos: $8$.', { lee: v => `$${v.x}$` })],
    ['El cero y cancelar', xpMira('dibujo', 'Tercera idea: si un producto da 0, **algún factor es 0**; y se cancela lo que no es 0.', { dib: (v, K) => XM.pasos(K, v, ['a · 0 = 0', '5 · x = 0  →  x = 0', '3x = 3 · 7  →  x = 7', '0 · 2 = 0 · 9, pero 2 ≠ 9'], 34, 34), v: { n: 0 }, alto: 160 }, [
      ['Cero veces cualquier cosa es cero.', { n: 1 }, '$a \\cdot 0 = 0$'],
      ['Si el producto da cero, alguno de los factores lo es.', { n: 2 }, '$ab = 0 \\Rightarrow a = 0 \\text{ o } b = 0$'],
      ['Un factor que no es 0 se puede cancelar a ambos lados.', { n: 3 }, '$3x = 3 \\cdot 7$'],
      ['El 0 no se cancela: borraría números distintos.', { n: 4 }, '$0 \\cdot 2 = 0 \\cdot 9$'],
    ], 'Producto 0: algún factor es 0. Se cancela solo lo que no es 0.'),
    xpFila('$(x - 3)(x + 8) = 0$. Pon los valores de x, de menor a mayor.', ['menor', 'mayor'], ['−8', '3'], ['8', '−3', '0'], 'Cada paréntesis puede ser el que vale 0.', '$x = -8$ o $x = 3$.')],
    ['Ahora sí, un problema', xpMueve('Un submarino baja 2 m por minuto: velocidad −2. ¿A qué altura, respecto de ahora, estaba **hace 3 minutos**?', 200, { x: 0, p: '' }, [xpRegla('x', -8, 8, 'altura', 2)], { x: 6 }, giro, '$(-2)(-3) = 6$: seis metros más arriba.', { lee: v => `$${v.x}$` })],
  ], 'Los signos y el cero salen de los axiomas: no hay que creerlos, se deducen.');

  // ---------------------------------------------------------------------------------------------------------- alg-12d
  const ord = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.c(L.X(v.a), 100, 8, 'fA') + K.t(L.X(v.a), 82, 'a', 'ta') + K.c(L.X(v.b), 100, 8, 'fF') + K.t(L.X(v.b), 82, 'b', 'tf') + K.t(170, 40, v.p || '', 'b'); };
  const tramo = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.r(L.X(v.c - v.r), 94, L.X(v.c + v.r) - L.X(v.c - v.r), 12, 'fa') + K.c(L.X(v.c), 100, 5, 'fF') + K.l(L.X(v.c), 70, L.X(v.c + v.r), 70, 'lf') + K.t(L.X(v.c + v.r / 2), 62, `${K.sig(v.r)}`, 's tf'); };
  xpLec('alg-12d', [
    ['Quién va a la izquierda', xpMira('dibujo', 'Empecemos por la idea: **menor** es estar a la izquierda.', { dib: ord, v: { a: -4, b: 1, p: 'a < b' }, alto: 140 }, [
      ['a está a la izquierda de b: a es menor.', {}, '$a < b$'],
      ['Sumar lo mismo a los dos los corre juntos: el orden sigue.', { a: -1, b: 4, p: 'a + 3 < b + 3' }, '$a + c < b + c$'],
      ['Por un positivo, se estiran: el orden sigue.', { a: -2, b: 8, p: '' }, '$c > 0: \\ ac < bc$'],
      ['Por un negativo, se voltean como en un espejo: ¡cambia el orden!', { a: 2, b: -8, p: '−a > −b' }, '$c < 0: \\ ac > bc$'],
    ], 'Al multiplicar por un negativo, la desigualdad se voltea.'),
    xpFila('Pon el signo que va.', ['−7 □ −2', '(−1)(−7) □ (−1)(−2)', '−7 + 10 □ −2 + 10'], ['<', '>', '<'], ['='], 'El −1 voltea; sumar no.', 'Solo el producto por un negativo cambia el sentido.')],
    ['La distancia', xpMira('dibujo', 'Segunda idea: el **valor absoluto** es una distancia, y nunca es negativa.', { dib: tramo, v: { c: 0, r: 5 }, alto: 130 }, [
      ['El valor absoluto de −5 es 5: su distancia al cero.', {}, '$|-5| = 5$'],
      ['El de 5 también: están igual de lejos.', {}, '$|5| = 5$'],
      ['La distancia entre dos números es el valor absoluto de su resta.', { c: 2, r: 4 }, '$|6 - 2| = 4$'],
      ['Los que están a 4 del 2 son dos: 6 y −2.', {}, '$|x - 2| = 4$'],
    ], '$|x - c|$ es la distancia de x a c.'),
    xpMueve('Mueve la distancia hasta que los bordes queden en **−7 y 3**.', 200, { c: -2, r: 1 }, [xpRegla('r', 1, 6, 'distancia')], { r: 5 }, tramo, '$|x + 2| = 5$: $-7$ y $3$.', { lee: v => `$|x + 2| = ${v.r}$` })],
    ['Cerca o lejos', xpMira('dibujo', 'Tercera idea: «menor que» es **cerca**; «mayor que» es **lejos**.', { dib: tramo, v: { c: 1, r: 0 }, alto: 130 }, [
      ['Los números a menos de 3 del 1: crece desde el 1.', { r: 3 }, '$|x - 1| < 3$'],
      ['Es un solo tramo: entre −2 y 4.', {}, '$-2 < x < 4$'],
      ['Lejos es lo demás: dos pedazos.', {}, '$|x - 1| > 3: \\ x < -2 \\text{ o } x > 4$'],
      ['Y una distancia menor que −1 no existe.', {}, '$|x| < -1: \\ \\varnothing$'],
    ], 'Cerca: un tramo. Lejos: dos pedazos.'),
    xpMueve('Arma $|x - 2| \\le 4$: pon el centro y la distancia.', 250, { c: 0, r: 1 }, [xpRegla('c', -4, 4, 'centro'), xpRegla('r', 1, 4, 'distancia')], { c: 2, r: 4 }, tramo, 'Centro 2 y distancia 4: de $-2$ a $6$.', { lee: v => `$[${v.c - v.r}, ${v.c + v.r}]$` })],
    ['Ahora sí, un problema', xpMueve('Un horno trabaja bien entre −1 y 7 unidades de su escala. Escríbelo como $|x - c| \\le r$: halla c y r.', 250, { c: 0, r: 1 }, [xpRegla('c', -4, 4, 'centro c'), xpRegla('r', 1, 4, 'distancia r')], { c: 3, r: 4 }, tramo, 'El medio es 3 y los bordes están a 4: $|x - 3| \\le 4$.', { lee: v => `$[${v.c - v.r}, ${v.c + v.r}]$` })],
  ], 'Orden es izquierda o derecha; valor absoluto es distancia.');
}
