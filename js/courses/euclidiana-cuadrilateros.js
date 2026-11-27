// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (spec 2026-11-26-curso-euclidiana). Números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  // ------------------------------------------------------------------------------------------- 1 · paralelas y perpendiculares
  const l1 = leccion('euc-cuadrilateros-1', 'Paralelas y perpendiculares', guion(
    ['Una sola perpendicular', 'Por un punto pasa una y solo una recta perpendicular a una recta dada.'],
    ['La distancia', 'La distancia de un punto a una recta es el segmento perpendicular: es más corto que cualquier oblicua.'],
    ['Paralelas', 'Dos rectas de un plano que no se cortan son paralelas. Por un punto exterior a una recta pasa una sola paralela a ella.'],
    ['Perpendiculares a la misma recta', 'Dos rectas perpendiculares a una misma recta son paralelas entre sí.'],
    ['Paralelas a una tercera', 'Dos rectas paralelas a una tercera son paralelas entre sí; y una perpendicular a una de dos paralelas lo es a la otra.']), [
    x('pie-perpendicular', 'Desde el punto **P** se tiende un cable hasta la recta **r**. Corre el pie **F** hasta que el cable sea el **más corto** posible.', { o: [0, 1], d: [1, 0.5], n: 12, P: [4, 8], t0: 1 },
      'El segmento más corto de un punto a una recta es el de la perpendicular: cae a escuadra sobre r y mide $\\sqrt{20} \\approx 4.5$ cuadros. Cualquier oblicua mide más.', 'Mira los dos ángulos que el cable forma con la recta, a un lado y al otro del pie: ¿en qué posición quedan iguales?'),
    x('traza-paralela', 'La recta **r** pasa por los dos puntos marcados. Arrastra **D** para que la recta que pasa por **P** y por D sea **paralela** a r.', { A: [1, 1], B: [4, 2], P: [3, 5], ini: [8, 4] },
      'La recta r sube 1 cuadro por cada 3 que avanza. La paralela por P repite ese paso: de (3, 5) llega a (6, 6). Por P no pasa ninguna otra paralela a r.', 'Cuenta cuánto avanza y cuánto sube la recta r entre sus dos puntos, y repite ese mismo paso saliendo de P.'),
    x('traza-perpendicular', 'La recta dorada **r** es perpendicular a **t**. Sin copiar a r, arrastra **D** para trazar por **P** otra perpendicular a t.', { A: [1, 2], B: [5, 4], Q: [3, 3], P: [7, 5], ini: [10, 6] },
      'La recta t sube 1 por cada 2; la perpendicular gira ese paso un cuarto de vuelta: avanza 1 y baja 2, de (7, 5) a (8, 3) (o retrocede 1 y sube 2). Como las dos son perpendiculares a t, quedan paralelas.', 'Un cuarto de vuelta intercambia lo que se avanza con lo que se sube. Cuenta el paso de t y gíralo.'),
    x('paralelas-seguro', 'En un plano hay tres rectas distintas: **r**, **s** y **t**. Toca **todas** las condiciones que garantizan que r y s son **paralelas**.', { casos: [
      { t: 'r ⊥ t  y  s ⊥ t', si: true },
      { t: 'r corta a t  y  s corta a t', no: 'Cortar a la misma recta no basta: r y s pueden cortarse entre sí.' },
      { t: 'r ∥ t  y  s ∥ t', si: true },
      { t: 'r ⊥ t  y  s ∥ t', no: 'Si s es paralela a t y r es perpendicular a t, entonces r también es perpendicular a s.' },
      { t: 'r y s no tienen ningún punto común', si: true }],
    falta: 'Falta alguna condición que sí lo garantiza.', ok: 'Perpendiculares a una misma recta, paralelas a una tercera, o sin puntos comunes.' },
      'Dos perpendiculares a una misma recta son paralelas; dos paralelas a una tercera también; y no tener puntos comunes es la definición de paralelas en un plano.', 'Imagina cada caso con tres lápices sobre la mesa y pregúntate si r y s podrían llegar a cortarse.'),
    x('cuantas-rectas', 'En un plano, **r** es una recta y **P** un punto. Pon **cuántas** rectas hay de cada clase.', {
      et: ['Perpendiculares a r por P', 'Paralelas a r por P, exterior a r', 'Rectas por P que cortan a r', 'Perpendiculares a r, en total'],
      metas: ['una', 'una', 'infinitas', 'infinitas'], fichas: ['una', 'una', 'infinitas', 'infinitas', 'ninguna', 'dos'],
      mira: ['Por un punto pasa una sola perpendicular a una recta dada.', 'Postulado de las paralelas: por un punto exterior pasa una sola.', 'Cada punto de r, unido con P, da una recta distinta.', 'Por cada punto de r se levanta una perpendicular distinta.'],
      trampas: { '1:infinitas': 'Si la paralela se gira un poco, termina cortando a r: solo sirve una posición.', '1:ninguna': 'Siempre existe una paralela por un punto exterior, y es única.', '0:dos': 'Si hubiera dos perpendiculares por P, formarían un triángulo con dos ángulos rectos.' },
      ok: 'Una perpendicular y una paralela por cada punto; secantes, las que se quiera.' },
      'Por P pasa una sola perpendicular y, si P es exterior, una sola paralela. En cambio hay infinitas secantes por P, e infinitas perpendiculares a r (una por cada punto).', 'Fíjate en si la pregunta amarra la recta a un punto fijo o la deja libre.'),
    x('relacion-rectas', 'De cinco rectas de un plano solo se sabe lo que dice la tarjeta. Deduce la relación de cada pareja: **∥** o **⊥**.', {
      da: ['a ⊥ t', 'b ⊥ t', 'c ∥ b', 'd ⊥ c'], et: ['a y b', 'a y c', 'c y t', 'd y t'], metas: ['∥', '∥', '⊥', '∥'], fichas: ['∥', '∥', '∥', '⊥', '⊥', '∥'],
      lin: [[14, 104, 314, 104, 't'], [70, 124, 70, 14, 'a', 'la gr'], [150, 124, 150, 14, 'b', 'la gr'], [230, 124, 230, 14, 'c', 'lg gr'], [196, 44, 300, 44, 'd', 'lf gr']], esc: [[70, 104], [150, 104], [230, 104], [230, 44]],
      mira: ['Las dos son perpendiculares a t: dos perpendiculares a una misma recta son paralelas.', 'c es paralela a b, y b es paralela a la recta a: paralelas a una tercera.', 't es perpendicular a b; entonces también lo es a su paralela c.', 'd y t son perpendiculares a la misma recta, c.'],
      trampas: {}, ok: 'Todo sale de dos ideas: perpendiculares a una misma recta y paralelas a una tercera.' },
      'a ∥ b (perpendiculares a t); a ∥ c (paralelas a b); c ⊥ t (t es perpendicular a una de dos paralelas); d ∥ t (las dos perpendiculares a c).', 'Haz un dibujo aparte: empieza por t y ve agregando una recta por cada dato.'),
    x('sube-distancia', 'Sube a la distancia que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'De **P** salen hacia una recta tres segmentos, de 17, 15 y 19. Solo el de 15 llega a escuadra. ¿Cuál es la distancia de P a la recta?', r: 15, c: 'd(P, r)', e: { 17: 'Ese es una oblicua: mide más que la perpendicular.', 19: 'Ese es una oblicua: mide más que la perpendicular.' } },
      { q: 'Tres rectas paralelas: de **r** a **s** hay 8 y de **s** a **t** hay 13, con s en medio. ¿Qué distancia hay de r a t?', r: 21, c: '8 + 13', e: { 5: 'Con s en medio, las dos distancias se suman.' } },
      { q: 'Dos paralelas están a 34 de distancia. Un punto **entre** ellas queda a 9 de una. ¿A cuánto queda de la otra?', r: 25, c: '34 - 9', e: { 43: 'El punto está entre las dos: se resta.' } }] },
      'La distancia es el segmento perpendicular: 15. Entre paralelas la distancia es la misma en todas partes: $8 + 13 = 21$ y $34 - 9 = 25$.', 'La distancia siempre se mide a escuadra. Dibuja las paralelas y marca cada dato sobre una misma perpendicular.'),
    sol('En un plano, las rectas distintas r y s son perpendiculares a la recta t. Demuestra que r y s son paralelas.', [
      'Supongamos lo contrario, que r y s se cortan en un punto P: es el método [[indirecto]]',
      'Entonces por P pasarían [[dos]] rectas perpendiculares a t',
      'Pero por un punto pasa [[una sola]] perpendicular a una recta dada',
      'La suposición lleva a una contradicción: r y s son [[paralelas]]'], ['directo', 'infinitas', 'perpendiculares'],
      'Si se cortaran en P, por P habría dos perpendiculares a t, lo que contradice la unicidad de la perpendicular. Luego no se cortan.', 'Supón que sí se cortan y busca qué teorema conocido quedaría contradicho.'),
    err('Desde un punto P se mide hasta una pared recta en tres direcciones: 5 m, 4 m y 4.2 m. Solo la medida de 4 m forma ángulo recto con la pared. ¿Cuál es la distancia de P a la pared?', [
      'La distancia de un punto a una recta se mide sobre la perpendicular', 'El segmento perpendicular es el de 4 m', 'Las otras dos medidas son de segmentos oblicuos', 'Como hay tres medidas, la distancia es su promedio: 4.4 m'], 3,
      ['La distancia es 4 m: el segmento perpendicular es el más corto', 'La distancia es 5 m: se toma la medida mayor', 'La distancia es 4.2 m: se toma la medida del medio'],
      'La distancia es la medida del segmento perpendicular, 4 m; las oblicuas siempre miden más y no entran en la cuenta.', '¿Cuál de las tres medidas corresponde a la definición de distancia de un punto a una recta?'),
    opc('En un plano, la recta m es perpendicular a la recta k, y la recta n es paralela a m. Entonces las rectas n y k:', ['son paralelas', 'son perpendiculares', 'forman un ángulo de 45°', 'no se cortan'], 1,
      'Si una recta es perpendicular a una de dos paralelas, también es perpendicular a la otra: k ⊥ m y m ∥ n dan k ⊥ n.', 'Dibuja primero las dos paralelas y luego la recta que cae a escuadra sobre una de ellas.'),
  ]);

  // ------------------------------------------------------------------------------------------- 2 · ángulos entre paralelas y en polígonos
  const l2 = leccion('euc-cuadrilateros-2', 'Ángulos entre paralelas y en polígonos', guion(
    ['Los pares de ángulos', 'Una transversal que corta dos rectas forma ángulos alternos internos, alternos externos, correspondientes y colaterales.'],
    ['Si son paralelas', 'Entre paralelas, los alternos y los correspondientes son congruentes, y los colaterales son suplementarios.'],
    ['Y al revés', 'Si un par de alternos o de correspondientes es congruente, o los colaterales son suplementarios, las rectas son paralelas.'],
    ['El triángulo', 'Los ángulos interiores de un triángulo suman 180°, y un exterior mide la suma de los dos interiores no adyacentes.'],
    ['Polígonos', 'Los ángulos interiores de un polígono de n lados suman (n − 2) · 180°; los exteriores, uno por vértice, suman 360°.']), [
    x('cruce-ocho', 'Las dos rectas horizontales son **paralelas**. Con el ángulo que se da, pon los cuatro que faltan.', { a: 68, fichas: ['68°', '68°', '68°', '112°', '112°', '22°'] },
      'Correspondientes, alternos internos y opuestos por el vértice son congruentes: 68°. El colateral interior es su suplemento: $180^\\circ - 68^\\circ = 112^\\circ$.', 'Nombra cada pareja antes de poner la ficha: ¿es de las que son congruentes o de las que son suplementarias?'),
    x('nombra-pares', 'Una transversal corta dos rectas y forma ocho ángulos. Pon el **nombre** de cada pareja.', { pares: [[3, 6], [1, 5], [4, 6], [2, 7]], fichas: ['alternos internos', 'correspondientes', 'colaterales', 'alternos externos', 'op. por el vértice', 'correspondientes'] },
      '3 y 6 están adentro y a lados distintos: alternos internos. 1 y 5 ocupan la misma esquina: correspondientes. 4 y 6, adentro y del mismo lado: colaterales. 2 y 7, afuera y a lados distintos: alternos externos.', 'Para cada pareja responde dos cosas: ¿están entre las rectas o fuera?, ¿del mismo lado de la transversal o a lados distintos?'),
    x('endereza-paralela', 'El ángulo de arriba mide $100^\\circ$ y el de abajo es su **colateral interior**. Gira la recta ℓ₂ hasta que se pueda asegurar que ℓ₁ y ℓ₂ son **paralelas**.', { t: 80, modo: 'col', b0: 10 },
      'Si los colaterales interiores son suplementarios, las rectas son paralelas: el de abajo debe medir $180^\\circ - 100^\\circ = 80^\\circ$.', 'Los colaterales interiores no se comparan como los alternos. ¿Qué deben cumplir juntos los dos ángulos?'),
    x('tercer-angulo', 'Una cercha tiene forma de triángulo con los dos ángulos de la base **congruentes**, y el de arriba debe medir $96^\\circ$. Ajústala.', { top: 96 },
      'Los tres suman 180°: para los dos de la base quedan $180^\\circ - 96^\\circ = 84^\\circ$, es decir, 42° cada uno.', 'Quita el ángulo de arriba de la suma de los tres y reparte lo que queda.'),
    x('exterior-alcanza', 'Corre el vértice de la derecha hasta que el ángulo **exterior** mida $120^\\circ$.', { a: 65, ext: 120 },
      'El exterior mide la suma de los dos interiores no adyacentes: $65^\\circ + 55^\\circ = 120^\\circ$.', 'El exterior se arma con los dos ángulos interiores que no lo tocan.'),
    x('poligono-regular', 'El marco de un reloj es un polígono **regular** con ángulos interiores de $144^\\circ$. Elige cuántos lados tiene.', { ang: 144 },
      'Cada exterior mide $180^\\circ - 144^\\circ = 36^\\circ$ y todos suman 360°: $360 \\div 36 = 10$ lados. También $(10 - 2) \\cdot 180^\\circ \\div 10 = 144^\\circ$.', 'Piensa en el ángulo exterior de cada vértice: todos juntos completan una vuelta.'),
    x('lanza-angulo', 'El faro gira desde la derecha. Dale el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'Entre dos paralelas, un ángulo mide $55^\\circ$. Su **colateral interior**', r: 125, c: '180^\\circ - 55^\\circ', e: { 55: 'Los colaterales no son congruentes: son suplementarios.' } },
      { q: 'Cada ángulo **exterior** de un polígono regular de 18 lados', r: 20, c: '360^\\circ \\div 18', e: { 160: 'Ese es el interior: el exterior es lo que le falta para 180°.' } },
      { q: 'Un exterior de un triángulo mide $150^\\circ$ y un interior no adyacente, $85^\\circ$. El **otro** no adyacente', r: 65, c: '150^\\circ - 85^\\circ', e: { 30: 'Ese es el interior adyacente al exterior.' } }] },
      '$180 - 55 = 125$; $360 \\div 12 = 30$; $150 - 85 = 65$.', 'Colaterales: suplementarios. Exteriores de un polígono: suman 360°. Exterior de un triángulo: suma de los dos no adyacentes.'),
    sol('Demuestra que los ángulos interiores del triángulo ABC suman $180^\\circ$. Por C se traza la recta m paralela a AB; sobre m, a los lados del ángulo C, quedan los ángulos 1 y 2.', [
      'Por C pasa una sola paralela a AB: postulado de las [[paralelas]]',
      '$\\angle 1 \\cong \\angle A$ por ser [[alternos internos]] entre paralelas',
      '$\\angle 2 \\cong \\angle B$ por la misma razón',
      '$\\angle 1 + \\angle C + \\angle 2 =$ [[180°]] porque forman un ángulo [[llano]]',
      'Al sustituir: $\\angle A + \\angle C + \\angle B = 180^\\circ$'], ['correspondientes', 'recto', '360°', 'colaterales'],
      'La paralela por C copia los ángulos A y B como alternos internos; los tres juntos llenan un ángulo llano.', 'Los ángulos 1 y A quedan entre las paralelas, a lados distintos de la transversal AC.'),
    err('Se quiere hallar la suma de los ángulos interiores de un octágono partiéndolo en triángulos.', [
      'Desde un vértice se trazan todas las diagonales', 'Se forman tantos triángulos como lados: 8', 'Cada triángulo aporta $180^\\circ$ a la suma'], 1,
      ['Se forman dos triángulos menos que lados: 6', 'Se forman tantos triángulos como diagonales: 5', 'Se forma un triángulo más que lados: 9'],
      'Desde un vértice salen $n - 3$ diagonales y quedan $n - 2$ triángulos: $6 \\cdot 180^\\circ = 1\\,080^\\circ$.', 'Dibuja un cuadrilátero y un pentágono y cuenta los triángulos que salen desde un vértice.'),
    opc('Una transversal corta dos rectas y forma ángulos colaterales interiores de 72° y 108°. De las dos rectas se puede asegurar que:', ['son perpendiculares', 'se cortan del lado de esos ángulos', 'son paralelas', 'coinciden'], 2,
      '$72^\\circ + 108^\\circ = 180^\\circ$: si los colaterales interiores son suplementarios, las rectas son paralelas.', 'Suma los dos ángulos y recuerda el recíproco del teorema de los colaterales.'),
  ]);

  // ------------------------------------------------------------------------------------------- 3 · paralelogramos y trapecios
  const l3 = leccion('euc-cuadrilateros-3', 'Paralelogramos y trapecios', guion(
    ['Paralelogramo', 'Tiene los lados opuestos paralelos. Por eso sus lados y ángulos opuestos son congruentes, los consecutivos son suplementarios y las diagonales se bisecan.'],
    ['Cómo reconocerlo', 'Basta una de estas: lados opuestos congruentes, ángulos opuestos congruentes, diagonales que se bisecan, o un par de lados paralelos y congruentes.'],
    ['Rectángulo y rombo', 'En el rectángulo las diagonales son congruentes; en el rombo son perpendiculares y bisectrices de sus ángulos.'],
    ['Cuadrado', 'Es rectángulo y rombo a la vez: sus diagonales son congruentes, perpendiculares y se bisecan.'],
    ['Trapecio', 'Tiene un solo par de lados paralelos. En el isósceles, los lados no paralelos, los ángulos de cada base y las diagonales son congruentes.']), [
    x('cuarto-vertice', 'A, B y C son tres vértices seguidos de un **paralelogramo**. Arrastra el cuarto vértice, **D**, a su lugar.', { A: [-4, -1], B: [1, -3], C: [3, 2] },
      'Los lados opuestos son paralelos y congruentes: de B a A se retrocede 5 y se sube 2; lo mismo desde C lleva a D = (−2, 4).', 'El lado CD debe ser una copia del lado BA: mismo largo y misma inclinación.'),
    x('paralelogramo-especial', 'ABCD es un paralelogramo con la base AB fija, de 5 cuadros. Arrastra **C** hasta que sea un **rombo** sin ángulos rectos.', { A: [1, 1], B: [6, 1], ini: [8, 3], tipo: 'rombo' },
      'En el rombo los cuatro lados son congruentes: BC debe medir 5. Con 3 cuadros a la derecha y 4 hacia arriba, $\\sqrt{9 + 16} = 5$.', 'El lado BC debe medir lo mismo que AB. ¿Qué triángulo rectángulo de lados enteros tiene hipotenusa 5?'),
    x('diagonales-cruce', 'AC y BD son las diagonales de un cuadrilátero. Mueve el cruce **M** y desliza la diagonal BD hasta que ABCD sea un **paralelogramo**.', { n: 10, m: 8, g: 60, t0: 3, s0: 6 },
      'Si las diagonales se cortan en sus puntos medios, el cuadrilátero es un paralelogramo: $AM = MC = 5$ y $BM = MD = 4$.', 'En un paralelogramo, ¿en qué punto de cada diagonal queda el cruce? Cuenta las marcas a cada lado.'),
    x('angulos-paralelogramo', 'En el paralelogramo ABCD, el ángulo A mide $64^\\circ$. Pon la medida de los otros tres.', { a: 64, fichas: ['64°', '116°', '116°', '26°', '64°', '126°'] },
      'El opuesto es congruente: C = 64°. Los consecutivos son suplementarios: B = D = $180^\\circ - 64^\\circ = 116^\\circ$.', 'Los lados AD y BC son paralelos y AB es una transversal: ¿qué pareja de ángulos forman A y B?'),
    x('trapecio-isosceles', 'AB es la base mayor y D ya está puesto. Arrastra **C** para que ABCD sea un **trapecio isósceles**.', { A: [1, 1], B: [11, 1], D: [3, 6], ini: [7, 4] },
      'DC debe ser paralela a AB (a la misma altura que D) y BC congruente con AD: D está 2 cuadros adentro desde A, así que C queda 2 adentro desde B, en (9, 6).', 'Dos condiciones: una base paralela a la otra y los lados no paralelos congruentes. El trapecio isósceles tiene un eje de simetría.'),
    x('siempre-paralelogramo', 'De un cuadrilátero solo se sabe lo que dice cada tarjeta. Toca **todas** las que garantizan que es un **paralelogramo**.', { casos: [
      { t: 'Los lados opuestos son congruentes', si: true },
      { t: 'Las diagonales son congruentes', no: 'Un trapecio isósceles tiene las diagonales congruentes y no es un paralelogramo.' },
      { t: 'Las diagonales se bisecan', si: true },
      { t: 'Un par de lados paralelos y congruentes', si: true },
      { t: 'Un par paralelo y el otro congruente', no: 'Eso también lo cumple un trapecio isósceles: bases paralelas y lados congruentes.' },
      { t: 'Los ángulos opuestos son congruentes', si: true }],
    falta: 'Falta alguna condición que sí lo garantiza.', ok: 'Son los cuatro recíprocos que caracterizan al paralelogramo.' },
      'Lados opuestos congruentes, ángulos opuestos congruentes, diagonales que se bisecan, o un par de lados paralelos y congruentes: cada una basta. Las otras dos las cumple un trapecio isósceles.', 'Para descartar una tarjeta basta un contraejemplo: prueba con un trapecio isósceles.'),
    x('que-cuadrilatero', 'Cada renglón describe un cuadrilátero por sus lados o sus diagonales. Pon el nombre **más preciso**.', {
      et: ['Paralelogramo, diagonales ≅', 'Paralelogramo, diagonales ⊥', 'Un solo par de lados paralelos', 'Diagonales ≅, ⊥ y se bisecan'],
      metas: ['rectángulo', 'rombo', 'trapecio', 'cuadrado'], fichas: ['rectángulo', 'rombo', 'trapecio', 'cuadrado', 'paralelogramo', 'trapezoide'],
      mira: ['Un paralelogramo con diagonales congruentes es un rectángulo.', 'Un paralelogramo con diagonales perpendiculares es un rombo.', 'Con un solo par de lados paralelos es un trapecio.', 'Si se bisecan es paralelogramo; congruentes y perpendiculares: cuadrado.'],
      trampas: { '0:rombo': 'En el rombo las diagonales son perpendiculares; las congruentes son las del rectángulo.', '1:rectángulo': 'En el rectángulo las diagonales son congruentes; las perpendiculares son las del rombo.', '3:rombo': 'Además de perpendiculares son congruentes: es más que un rombo.', '3:rectángulo': 'Además de congruentes son perpendiculares: es más que un rectángulo.' },
      ok: 'Las diagonales delatan al cuadrilátero.' },
      'Diagonales congruentes en un paralelogramo: rectángulo. Perpendiculares: rombo. Las dos cosas: cuadrado. Un solo par de lados paralelos: trapecio.', 'Piensa en las diagonales de cada figura: ¿cuáles miden lo mismo?, ¿cuáles se cortan a escuadra?'),
    x('abre-marco', 'El marco articulado se abre con el ángulo que le des. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un ángulo de un paralelogramo mide $115^\\circ$. Abre el marco con el ángulo **consecutivo**.', r: 65, c: '180^\\circ - 115^\\circ', e: { 115: 'Ese es el opuesto: el consecutivo es su suplemento.' } },
      { q: 'En un rombo, un ángulo mide $50^\\circ$. Abre el marco con el ángulo que forma la **diagonal** con un lado en ese vértice.', r: 25, c: '50^\\circ \\div 2', e: { 50: 'La diagonal del rombo es bisectriz: parte ese ángulo en dos.' } },
      { q: 'En un trapecio isósceles, un ángulo de la base mayor mide $70^\\circ$. Abre el marco con un ángulo de la **base menor**.', r: 110, c: '180^\\circ - 70^\\circ', e: { 70: 'Ese es el otro ángulo de la misma base: los de bases distintas son suplementarios.' } }] },
      '$180 - 115 = 65$; la diagonal del rombo biseca: $50 \\div 2 = 25$; entre las bases paralelas, colaterales: $180 - 70 = 110$.', 'Busca en cada figura las paralelas y la transversal: los ángulos consecutivos son colaterales interiores.'),
    sol('En el paralelogramo ABCD se traza la diagonal AC. Demuestra que los lados opuestos AB y CD son congruentes.', [
      '$\\angle BAC \\cong \\angle DCA$ por ser [[alternos internos]] entre $AB \\parallel CD$',
      '$\\angle BCA \\cong \\angle DAC$ por la misma razón, entre $BC \\parallel AD$',
      'AC es lado [[común]] de los triángulos ABC y CDA',
      '$\\triangle ABC \\cong \\triangle CDA$ por el criterio [[A-L-A]]',
      '$AB \\cong CD$ por ser lados [[correspondientes]] de triángulos congruentes'], ['L-L-L', 'colaterales', 'opuestos por el vértice'],
      'La diagonal es transversal de los dos pares de paralelas: da dos pares de alternos internos con el lado común entre ellos, que es A-L-A.', 'La diagonal parte al paralelogramo en dos triángulos: busca qué ángulos y qué lado comparten.'),
    err('Las dos diagonales de un cuadrilátero miden 10 cm. ¿Se puede asegurar que el cuadrilátero es un rectángulo?', [
      'En todo rectángulo las diagonales son congruentes', 'Este cuadrilátero tiene las diagonales congruentes', 'Por lo tanto, el cuadrilátero es un rectángulo'], 2,
      ['No se puede asegurar: falta saber que es un paralelogramo', 'Por lo tanto, el cuadrilátero es un rombo', 'Por lo tanto, el cuadrilátero es un cuadrado'],
      'El recíproco pide que sea un paralelogramo: un trapecio isósceles también tiene diagonales congruentes y no es rectángulo.', 'Se está usando un teorema al revés. ¿Con qué hipótesis vale su recíproco?'),
    opc('Las diagonales de un rombo miden 16 cm y 12 cm. Como se cortan perpendicularmente en sus puntos medios, cada lado del rombo mide:', ['14 cm', '20 cm', '28 cm', '10 cm'], 3,
      'Las mitades de las diagonales, 8 y 6, son catetos de un triángulo rectángulo cuya hipotenusa es el lado: $\\sqrt{64 + 36} = 10$.', 'Las diagonales parten al rombo en cuatro triángulos rectángulos congruentes.'),
  ]);

  // ------------------------------------------------------------------------------------------- 4 · rectas y puntos notables
  const l4 = leccion('euc-cuadrilateros-4', 'Rectas y puntos notables', guion(
    ['Paralela media', 'El segmento que une los puntos medios de dos lados de un triángulo es paralelo al tercer lado y mide la mitad.'],
    ['En el triángulo rectángulo', 'La mediana sobre la hipotenusa mide la mitad de ella; y si un ángulo mide 30°, el cateto opuesto es la mitad de la hipotenusa.'],
    ['Mediana del trapecio', 'Une los puntos medios de los lados no paralelos: es paralela a las bases y mide su semisuma.'],
    ['Baricentro', 'Las tres medianas se cortan en un punto situado a dos tercios de cada una, contando desde el vértice.'],
    ['Circuncentro, incentro y ortocentro', 'Las mediatrices se cortan en el punto que equidista de los vértices; las bisectrices, en el que equidista de los lados; las alturas, en el ortocentro.']), [
    x('paralela-media', 'En el triángulo ABC, **M** es el punto medio de AC y el lado AB mide **26**. Desliza **N** por CB hasta que MN sea **paralela** a AB.', { c: 26, n: 12, s0: 3 },
      'La paralela a un lado trazada por el punto medio de otro pasa por el punto medio del tercero: N parte a CB en 6 y 6, y MN mide $26 \\div 2 = 13$.', 'M parte su lado en dos partes iguales. ¿Cómo debe partir N al suyo para que MN no se incline?'),
    x('baricentro-desliza', 'La mediana **AM** mide **12**. Desliza **G** por ella hasta el **baricentro** del triángulo.', { n: 12, s0: 3 },
      'El baricentro está a dos tercios de la mediana desde el vértice: $AG = \\tfrac23 \\cdot 12 = 8$ y $GM = 4$.', 'El baricentro parte cada mediana en dos tramos, uno el doble del otro. ¿Cuál queda junto al vértice?'),
    x('centro-equidista', 'Tres antenas están en los vértices del triángulo. Arrastra la central hasta el punto que queda a **igual distancia de los tres vértices**.', { V: [[2, 2], [10, 2], [4, 8]], tipo: 'vertices', ini: [5, 5] },
      'Es el circuncentro, donde se cortan las mediatrices: la de AB es la vertical por (6, 2), y sobre ella el punto (6, 4) queda a $\\sqrt{20}$ de A, de B y de C.', 'Los puntos que equidistan de A y de B están en la mediatriz de AB. Empieza por ahí y luego compara con C.'),
    x('treinta-sesenta', 'Una rampa de **16** m se apoya en el piso. Sube o baja su punta hasta que forme $30^\\circ$ con el piso.', { c: 16, h0: 12 },
      'En el triángulo 30°-60°-90°, el cateto opuesto a 30° mide la mitad de la hipotenusa: $16 \\div 2 = 8$.', 'Ese triángulo es la mitad de uno equilátero: compara la altura de la punta con el largo de la rampa.'),
    x('medios-miden', 'Tres segmentos dorados: la mediana sobre la hipotenusa, una paralela media y la mediana de un trapecio. Pon cuánto mide cada uno.', {
      h: 34, b: 22, B: 15, b2: 9, et: ['mediana', 'paralela media', 'base media'], metas: ['17', '11', '12'], fichas: ['17', '11', '12', '24', '44', '6', '68'],
      mira: ['La mediana sobre la hipotenusa mide la mitad de la hipotenusa.', 'La paralela media mide la mitad del tercer lado.', 'La mediana del trapecio es la semisuma de las bases.'],
      trampas: { '2:24': 'Esa es la suma de las bases: falta partirla en dos.', '2:6': 'Esa es la diferencia de las bases: la mediana es la semisuma.', '0:68': 'Es la mitad de la hipotenusa, no el doble.', '1:44': 'Es la mitad del tercer lado, no el doble.' },
      ok: 'Dos mitades y un promedio.' },
      '$34 \\div 2 = 17$; $22 \\div 2 = 11$; $(15 + 9) \\div 2 = 12$.', 'En los dos triángulos el segmento dorado es una mitad; en el trapecio, un promedio.'),
    x('punto-de-que', 'Cada renglón describe un punto notable del triángulo. Pon su **nombre**.', {
      et: ['Corte de las medianas', 'Equidista de los vértices', 'Equidista de los lados', 'Corte de las alturas'],
      metas: ['baricentro', 'circuncentro', 'incentro', 'ortocentro'], fichas: ['baricentro', 'circuncentro', 'incentro', 'ortocentro', 'punto medio'],
      mira: ['Las medianas se cortan en el baricentro.', 'Está en las tres mediatrices: es el circuncentro.', 'Está en las tres bisectrices: es el incentro.', 'Las alturas se cortan en el ortocentro.'],
      trampas: { '1:incentro': 'El incentro equidista de los lados; de los vértices equidista el circuncentro.', '2:circuncentro': 'El circuncentro equidista de los vértices; de los lados equidista el incentro.', '0:ortocentro': 'El ortocentro es el corte de las alturas, no de las medianas.' },
      ok: 'Medianas, mediatrices, bisectrices y alturas: cada terna tiene su punto.' },
      'Medianas: baricentro. Mediatrices: circuncentro, que equidista de los vértices. Bisectrices: incentro, que equidista de los lados. Alturas: ortocentro.', 'La mediatriz reúne los puntos que equidistan de dos vértices; la bisectriz, los que equidistan de dos lados.'),
    x('trapecio-base', 'La base menor de un trapecio mide **7** y su mediana debe medir **12**. Estira la base mayor.', { b: 7, m: 12, B0: 9 },
      'La mediana es la semisuma de las bases: $\\tfrac{B + 7}{2} = 12$, así que $B = 24 - 7 = 17$.', 'La mediana es el promedio de las dos bases: si una está 5 por debajo de 12, ¿dónde debe estar la otra?'),
    x('lanza-escala', 'Manda el dron al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'La hipotenusa de un triángulo rectángulo mide 26. ¿Cuánto mide la **mediana** que llega a ella?', r: 13, c: '26 \\div 2', e: { 26: 'La mediana sobre la hipotenusa mide la mitad de ella.' } },
      { q: 'Una mediana de un triángulo mide 27. ¿A qué distancia del **vértice** está el baricentro?', r: 18, c: '\\tfrac23 \\cdot 27', e: { 9: 'Ese es el tramo que va del baricentro al lado.' } },
      { q: 'En un triángulo 30°-60°-90°, el cateto opuesto a $30^\\circ$ mide 14. ¿Cuánto mide la **hipotenusa**?', r: 28, c: '2 \\cdot 14', e: { 7: 'Al revés: la hipotenusa es el doble de ese cateto.' } }] },
      '$26 \\div 2 = 13$; $\\tfrac23 \\cdot 27 = 18$; $2 \\cdot 14 = 28$.', 'Mitad de la hipotenusa, dos tercios de la mediana y el doble del cateto opuesto a 30°.'),
    sol('En el triángulo ABC, M y N son los puntos medios de AB y AC, y BC mide 38 cm. La mediana AD mide 24 cm y G es el baricentro. Halla MN, AG y GD.', [
      'MN une dos puntos medios: es la [[paralela media]] y es paralela a BC',
      'Mide la mitad de BC: $38 \\div 2 =$ [[19]] cm',
      'G está a dos tercios desde el vértice: $AG = \\tfrac23 \\cdot 24 =$ [[16]] cm',
      'El resto de la mediana: $GD = 24 - 16 =$ [[8]] cm'], ['mediatriz', '76', '12'],
      'Paralela media: mitad del tercer lado, 19. Baricentro: 16 desde el vértice y 8 hasta el lado.', 'Una medida es una mitad; la otra, dos tercios contados desde el vértice.'),
    err('Las bases de un trapecio miden 10 cm y 18 cm. ¿Cuánto mide su mediana, el segmento que une los puntos medios de los lados no paralelos?', [
      'La mediana del trapecio es paralela a las bases', 'Su medida es la semidiferencia de las bases', 'Se reemplazan las dos bases en esa regla'], 1,
      ['Su medida es la semisuma de las bases: $\\tfrac{10 + 18}{2} = 14$ cm', 'Su medida es la suma de las bases: 28 cm', 'Su medida es la de la base mayor: 18 cm'],
      'La mediana mide la semisuma, 14 cm. La semidiferencia, 4 cm, es el segmento que une los puntos medios de las diagonales.', 'La mediana queda entre las dos bases: ¿puede medir menos que la base menor?'),
    opc('El punto de un triángulo que está a la misma distancia de sus tres lados es el:', ['incentro', 'circuncentro', 'baricentro', 'ortocentro'], 0,
      'Los puntos de una bisectriz equidistan de los lados del ángulo; el corte de las tres bisectrices, el incentro, equidista de los tres lados.', '¿Qué recta reúne a los puntos que equidistan de los dos lados de un ángulo?'),
  ]);

  return mundo('euc-cuadrilateros', [l1, l2, l3, l4], [
    ['euc-cuadrilateros-1', 'La distancia de un punto a una recta se mide sobre la perpendicular.', x('pie-perpendicular', 'Corre el pie **F** hasta que el segmento PF mida la **distancia** de P a la recta r.', { o: [0, 7], d: [1, -0.5], n: 12, P: [3, 3], t0: 10 },
      'La distancia es el segmento perpendicular: cae a escuadra sobre r y mide $\\sqrt5 \\approx 2.2$.', 'El segmento más corto forma ángulos iguales con la recta a ambos lados del pie.')],
    ['euc-cuadrilateros-1', 'Por un punto exterior a una recta pasa una sola paralela.', x('traza-paralela', 'Arrastra **D** para que la recta que pasa por **P** y por D sea **paralela** a r.', { A: [2, 7], B: [6, 5], P: [5, 2], ini: [9, 3] },
      'La recta r baja 1 por cada 2 que avanza; la paralela por P hace lo mismo: de (5, 2) a (7, 1).', 'Copia el paso de r, lo que avanza y lo que baja, saliendo desde P.')],
    ['euc-cuadrilateros-1', 'El segmento perpendicular es más corto que cualquier oblicua.', opc('Desde un punto exterior a una recta se trazan el segmento perpendicular, de 12 cm, y un segmento oblicuo. El oblicuo puede medir:', ['13 cm', '12 cm', '11 cm', '6 cm'], 0,
      'Toda oblicua mide más que la perpendicular: solo 13 cm supera a 12 cm.', 'Compara cada opción con la medida del segmento perpendicular.')],
    ['euc-cuadrilateros-2', 'Entre paralelas, los colaterales interiores son suplementarios.', x('conjugados-justos', 'Las rectas son paralelas. Inclina la transversal hasta que el colateral interior de arriba mida **30° más** que el de abajo.', { dif: 30 },
      '$x + (x + 30^\\circ) = 180^\\circ$: miden 75° y 105°.', 'Los dos colaterales suman 180°: reparte esa suma con 30° de diferencia.')],
    ['euc-cuadrilateros-2', 'Alternos internos congruentes obligan a que las rectas sean paralelas.', x('endereza-paralela', 'Los dos ángulos marcados son **alternos internos**. Gira la recta ℓ₂ hasta que se pueda asegurar que ℓ₁ y ℓ₂ son paralelas.', { t: 65, modo: 'alt', rot: -8, b0: -15 },
      'Si los alternos internos son congruentes, las rectas son paralelas: el de abajo debe medir 65°.', 'Compara las dos medidas: ¿qué deben cumplir los alternos internos?')],
    ['euc-cuadrilateros-2', 'Los ángulos interiores de un polígono suman (n − 2) · 180°.', opc('La suma de los ángulos interiores de un polígono es 1 980°. El polígono tiene:', ['11 lados', '13 lados', '12 lados', '15 lados'], 1,
      '$(n - 2) \\cdot 180^\\circ = 1\\,980^\\circ$ da $n - 2 = 11$: 13 lados.', 'Divide la suma entre 180° para saber cuántos triángulos hay.')],
    ['euc-cuadrilateros-3', 'Un paralelogramo con un ángulo recto es un rectángulo.', x('paralelogramo-especial', 'ABCD es un paralelogramo con el lado AB fijo. Arrastra **C** hasta que sea un **rectángulo**.', { A: [2, 1], B: [6, 3], ini: [7, 6], tipo: 'rectangulo' },
      'AB avanza 2 y sube 1; BC debe caer a escuadra: retrocede 1 y sube 2, hasta (5, 5).', 'Gira un cuarto de vuelta el paso de AB para trazar BC.')],
    ['euc-cuadrilateros-3', 'Si las diagonales se bisecan, el cuadrilátero es un paralelogramo.', x('diagonales-cruce', 'Mueve el cruce **M** y desliza la diagonal BD hasta que ABCD sea un **paralelogramo**.', { n: 12, m: 6, g: 110, t0: 9, s0: 2 },
      'El cruce debe ser punto medio de las dos: $AM = MC = 6$ y $BM = MD = 3$.', 'Cuenta las marcas a cada lado del cruce, en las dos diagonales.')],
    ['euc-cuadrilateros-3', 'El cuadrado reúne las propiedades del rectángulo y del rombo.', opc('Un paralelogramo cuyas diagonales son congruentes y además perpendiculares es un:', ['trapecio isósceles', 'rombo que no es cuadrado', 'cuadrado', 'rectángulo que no es cuadrado'], 2,
      'Diagonales congruentes: rectángulo. Perpendiculares: rombo. Las dos cosas a la vez: cuadrado.', 'Mira qué figura cumple cada propiedad por separado.')],
    ['euc-cuadrilateros-4', 'El incentro equidista de los tres lados del triángulo.', x('centro-equidista', 'Arrastra el punto hasta el lugar que queda a **igual distancia de los tres lados** del triángulo.', { V: [[2, 1], [10, 1], [2, 7]], tipo: 'lados', ini: [6, 2] },
      'Es el incentro: en (4, 3) queda a 2 cuadros de cada cateto y también a 2 de la hipotenusa.', 'Empieza por quedar a la misma distancia de los dos catetos y avanza por esa bisectriz.')],
    ['euc-cuadrilateros-4', 'El baricentro está a dos tercios de la mediana desde el vértice.', x('baricentro-desliza', 'La mediana **AM** mide **15**. Desliza **G** hasta el **baricentro**.', { n: 15, s0: 4 },
      '$AG = \\tfrac23 \\cdot 15 = 10$ y $GM = 5$.', 'El tramo junto al vértice es el doble del otro.')],
    ['euc-cuadrilateros-4', 'La mediana sobre la hipotenusa mide la mitad de la hipotenusa.', opc('Los catetos de un triángulo rectángulo miden 18 y 24. La mediana relativa a la hipotenusa mide:', ['21', '30', '12', '15'], 3,
      'La hipotenusa mide $\\sqrt{324 + 576} = 30$ y su mediana, la mitad: 15.', 'Halla primero la hipotenusa.')],
  ]);
})());
