// Preicfes · Matemáticas, mundo 3 «Conteo y Probabilidad», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde contar
// parejas en una tabla, ordenar en fila, qué es la probabilidad y cómo se lee una tabla con totales, hasta las trampas que más
// salen (sumar en vez de multiplicar, contar con orden lo que no lo tiene, casos que no son igual de probables, el total equivocado).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Bolsa: k rojas (de color) entre n bolas.
  const bolsa = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => K.c(58 + (i % 8) * 32, 50 + Math.floor(i / 8) * 36, 12, i < Math.round(v.k) ? 'fA' : 'fc')).join('') + K.t(170, 150, v.t || '', 'ta');

  xpAmplia('icf-ma-azar-1', {
    conecta: 'icf-ma-proporcion-3',
    desde: [
      ['Desde cero: contar parejas en una tabla',
        xpMira('rejilla', 'Contar combinaciones es contar **casillas**: cada fila es una opción de una cosa y cada columna, una opción de la otra.', { f: 3, c: 2, filas: ['roja', 'azul', 'blanca'], cols: ['negra', 'gris'], celda: i => ['R N', 'R G', 'A N', 'A G', 'B N', 'B G'][i] }, [
          ['En la lección de regla de tres viste que un rectángulo de 4 por 6 tiene 24 cuadros.', {}],
          ['Contar combinaciones es lo mismo. Tienes 3 camisas y 2 gorras.', {}],
          ['Cada fila es una camisa y cada columna, una gorra.', { luz: [0, 1] }],
          ['Cada casilla es una pinta: camisa roja con gorra negra, por ejemplo.', { on: [0] }],
          ['Se cuentan las casillas: 3 filas por 2 columnas, 6 pintas.', { on: [1, 2, 3, 4, 5] }, '$3 \\cdot 2 = 6$'],
          ['Contar una por una sirve con pocas; multiplicar sirve siempre.', {}],
        ], 'Cada pareja posible es una casilla: filas por columnas.'),
        xpHaz('rejilla', 'Hay 4 jugos y 3 empanadas. Marca **todas** las combinaciones de un jugo con una empanada.', { f: 4, c: 3, filas: ['mora', 'lulo', 'mango', 'piña'], cols: ['carne', 'pollo', 'queso'], meta: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          lee: c => `$${c.filter(x => x === 1).length} \\text{ de } 4 \\cdot 3$`, dice: c => `${c.filter(x => x === 1).length} combinaciones marcadas.` }, '$4 \\cdot 3 = 12$ combinaciones.')],
    ],
    despues: [
      ['Más difícil: al menos uno',
        xpMira('fichas', 'Cuando piden «**al menos uno**», casi siempre es más fácil contar **todo** y quitar lo que **no** sirve.', { slots: fila('todas', 'sin ningún 7', 'con algún 7'), fichas: ['1 000', '729', '271'], alto: 96 }, [
          ['Una clave tiene 3 dígitos del 0 al 9. ¿Cuántas tienen al menos un 7?', {}],
          ['Contarlas directo es enredado: un 7, dos 7 o tres 7, en distintos puestos.', {}],
          ['Mejor contar todas: 10 opciones en cada puesto, 1 000 claves.', { pon: { 0: '1 000' } }, '$10 \\cdot 10 \\cdot 10 = 1\\,000$'],
          ['Ahora las que no tienen ningún 7: quedan 9 opciones en cada puesto.', { pon: { 1: '729' } }, '$9 \\cdot 9 \\cdot 9 = 729$'],
          ['Las que tienen algún 7 son el resto.', { pon: { 2: '271' } }, '$1\\,000 - 729 = 271$'],
          ['Al menos uno: todas menos las que no tienen ninguno.', { marca: [2] }],
        ], 'Al menos uno = todos los casos − los que no tienen ninguno.'),
        xpHaz('fichas', 'Una placa lleva 2 letras de entre A, B, C, D y E, que se pueden repetir. Pon cuántas hay en total y cuántas tienen **al menos una A**.', { slots: fila('total', 'con alguna A'), fichas: ['25', '9', '16', '10', '5'], meta: ['25', '9'], alto: 96, pista: 'Cuenta todas y quita las que no tienen ninguna A: sin A quedan 4 letras por puesto.' }, '$5 \\cdot 5 = 25$, sin A $4 \\cdot 4 = 16$, y $25 - 16 = 9$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un restaurante ofrece 3 sopas, 5 platos fuertes y 2 postres. Un almuerzo lleva sopa, plato y postre. ¿Cuántos almuerzos distintos hay?', { letras: ['A', 'B', 'C', 'D'], paras: [['3 + 5 + 2 = 10'], ['3 · 5 · 2 = 30'], ['3 · 5 = 15, porque el postre no cambia el almuerzo.'], ['5 · 2 = 10, porque la sopa siempre se sirve.']] }, [
        ['Un almuerzo lleva tres decisiones: una sopa, y un plato, y un postre.', {}],
        ['A suma: eso contaría escoger una sola cosa de todo el menú.', { luz: [0], nota: { 0: 'suma' } }],
        ['C y D dejan por fuera una decisión, y cada una cambia el almuerzo.', { luz: [2, 3], nota: { 2: 'falta una', 3: 'falta una' } }],
        ['Cada sopa va con cada plato, y cada pareja con cada postre: se multiplica.', {}],
        ['B: 3 por 5 por 2 son 30 almuerzos. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$3 \\cdot 5 \\cdot 2 = 30$'],
      ], 'Cuenta las decisiones: si son varias seguidas, multiplica todas.'),
      xpHaz('hoja', 'Para ir al colegio, Ana puede ir a pie por 3 caminos o en bus por 2 rutas. Subraya de cuántas maneras puede ir.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['6, porque 3 · 2 = 6.'], ['5, porque escoge una sola manera: a pie o en bus.'], ['3, porque a pie es lo más común.'], ['2, porque son dos medios de transporte.']], pista: 'Pregúntate si Ana toma una decisión o dos para hacer el viaje.' }, 'Una sola elección entre los dos grupos: $3 + 2 = 5$.')],
    cierre: 'Varias decisiones se multiplican, una sola elección suma, y al menos uno es todo menos ninguno.',
  });

  xpAmplia('icf-ma-azar-2', {
    conecta: 'icf-ma-azar-1',
    desde: [
      ['Desde cero: ordenar en fila',
        xpMira('fichas', 'Ordenar cosas en fila es tomar **decisiones seguidas**, y en cada puesto queda **una opción menos**.', { slots: fila('1.º', '2.º', '3.º', 'total').map(s => ({ ...s, w: 62 })), fichas: ['3', '2', '1', '6'], alto: 96 }, [
          ['En la lección anterior viste que una decisión y otra se multiplican.', {}],
          ['Ordenar tres libros en un estante son tres decisiones seguidas.', {}],
          ['Para el primer puesto hay 3 libros.', { pon: { 0: '3' } }],
          ['Para el segundo quedan 2, porque uno ya se usó.', { pon: { 1: '2' } }],
          ['Para el último queda 1. En total hay 6 órdenes.', { pon: { 2: '1', 3: '6' } }, '$3 \\cdot 2 \\cdot 1 = 6$'],
          ['A 3 · 2 · 1 se le llama 3 factorial, y se escribe 3!.', { marca: [3] }, '$3! = 6$'],
        ], 'n cosas en fila: n · (n − 1) · … · 1, que se escribe n!.'),
        xpHaz('fichas', 'Cinco fotos van en una fila de 5 marcos. Pon las opciones del **primer** marco y el **total** de órdenes.', { slots: fila('primer marco', 'total'), fichas: ['5', '120', '25', '60', '15'], meta: ['5', '120'], alto: 96, pista: 'En cada marco queda una foto menos. Multiplica hasta llegar a 1.' }, '$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.')],
    ],
    despues: [
      ['Más difícil: filas con condiciones',
        xpMira('fichas', 'Si alguien tiene un puesto **obligado**, se fija primero. Si dos deben ir **juntos**, se amarran como un bloque.', { slots: fila('Ana primera', 'el bloque y 3', 'por dentro', 'juntos').map(s => ({ ...s, w: 66 })), fichas: ['24', '24', '2', '48'], alto: 96 }, [
          ['Cinco amigos se toman una foto en fila. ¿Y si Ana debe ir primera?', {}],
          ['Su puesto ya está decidido: los otros 4 se ordenan libres.', { pon: { 0: '24' } }, '$4! = 24$'],
          ['Ahora Ana y Beto deben quedar juntos. Se amarran como un solo bloque.', {}],
          ['Quedan 4 piezas, el bloque y 3 amigos, que se ordenan de 24 maneras.', { pon: { 1: '24' } }],
          ['Dentro del bloque puede ir Ana y Beto, o Beto y Ana: 2 maneras.', { pon: { 2: '2' } }],
          ['En total, 24 por 2: 48 fotos con los dos juntos.', { pon: { 3: '48' } }, '$24 \\cdot 2 = 48$'],
        ], 'Fija lo obligado, amarra lo que va junto y cuenta lo demás.'),
        xpHaz('fichas', 'Cuatro libros van en un estante. Pon cuántos órdenes hay si el de arte va **al final**, y cuántos si en cambio dos libros deben ir **juntos**.', { slots: fila('arte al final', 'dos juntos'), fichas: ['6', '12', '24', '4', '8'], meta: ['6', '12'], alto: 96, pista: 'Con el de arte fijo se ordenan 3. Con el bloque hay 3 piezas, y el bloque se voltea.' }, '$3! = 6$ y $3! \\cdot 2 = 12$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'De 8 estudiantes se escogen 2 para representar al curso, con los mismos deberes. Camilo dice que hay 56 maneras. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque hay 8 para el primero y 7 para el segundo.'], ['No, porque cada pareja se contó dos veces: son 28.'], ['No, porque son 8 + 7 = 15.'], ['Sí, porque 8 · 7 = 56 siempre da las parejas.']] }, [
        ['Pregunta primero si importa el orden. Los dos tienen los mismos deberes.', {}],
        ['No importa: Ana y Beto es la misma pareja que Beto y Ana.', {}],
        ['A da una razón cierta, 8 por 7, pero concluye mal: contó con orden.', { luz: [0], nota: { 0: 'contó con orden' } }],
        ['D generaliza: 8 · 7 cuenta parejas con orden, no grupos.', { luz: [3], nota: { 3: 'siempre' } }],
        ['C suma, y con dos decisiones seguidas nunca se suma.', { luz: [2], nota: { 2: 'suma' } }],
        ['B divide entre los 2 órdenes de cada pareja. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$56 \\div 2 = 28$'],
      ], 'Decide si importa el orden antes de leer las razones de cada opción.'),
      xpHaz('hoja', 'De 6 canciones, una emisora escoge 3 para un concurso, sin orden. Rita dice que hay 120 maneras. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Sí, porque 6 · 5 · 4 = 120.'], ['No: son 120 entre 2, o sea 60.'], ['No: cada grupo de 3 se contó 6 veces, así que son 20.'], ['Sí, porque el orden de las canciones siempre importa.']], pista: 'Si el orden no importa, ¿de cuántas maneras se puede ordenar un mismo grupo de 3?' }, 'Un grupo de 3 se ordena de $3! = 6$ maneras: $120 \\div 6 = 20$.')],
    cierre: 'En fila, n factorial; con condiciones, fija y amarra; sin orden, divide entre los órdenes del grupo.',
  });

  xpAmplia('icf-ma-azar-3', {
    conecta: 'icf-ma-azar-2',
    desde: [
      ['Desde cero: qué es la probabilidad',
        xpMira('dibujo', 'La **probabilidad** mide qué tan fácil es que algo pase cuando no sabes qué va a salir. Se calcula **contando**.', { dib: bolsa, v: { n: 10, k: 0, t: '' }, alto: 170 }, [
          ['En la lección de permutaciones aprendiste a contar todos los casos posibles.', {}],
          ['Algo es aleatorio cuando no sabes qué va a salir, como sacar una bola sin mirar.', {}],
          ['Los casos posibles son todo lo que puede salir: aquí, 10 bolas.', { t: '10 posibles' }],
          ['Los favorables son los que te sirven. Si quieres roja, hay 3 rojas.', { k: 3, t: '3 favorables' }],
          ['La probabilidad es favorables entre posibles: 3 de 10.', { t: '3 de 10' }, '$\\tfrac{3}{10} = 0.3 = 30\\,\\%$'],
          ['Fracción, decimal o porcentaje: es el mismo número dicho de tres formas.', {}],
        ], 'Probabilidad = casos favorables ÷ casos posibles.'),
        xpHaz('fichas', 'Se lanza un dado normal. Pon los casos posibles, los favorables a «sale un número mayor que 4» y la probabilidad.', { slots: fila('posibles', 'favorables', 'probabilidad'), fichas: ['6', '2', '1/3', '4', '1/2'], meta: ['6', '2', '1/3'], alto: 96, pista: 'Mayores que 4 son los que pasan del 4: el 4 no cuenta.' }, 'Sirven el 5 y el 6: $\\tfrac26 = \\tfrac13$.')],
    ],
    despues: [
      ['Más difícil: casos igual de probables',
        xpMira('hoja', 'Para dividir favorables entre posibles, los casos tienen que ser **igual de probables**. Si no, la cuenta engaña.', { paras: [['cara y cara'], ['cara y sello'], ['sello y cara'], ['sello y sello']] }, [
          ['Se lanzan dos monedas. ¿Qué tan probable es que salga una cara y un sello?', {}],
          ['Tentación: hay tres resultados, dos caras, mixto y dos sellos. Entonces 1/3. Trampa.', {}],
          ['Piensa las monedas como distintas: la primera y la segunda.', {}],
          ['Salen cuatro casos, todos igual de fáciles.', { luz: [0, 1, 2, 3] }],
          ['El mixto sale de dos maneras: cara y sello, o sello y cara.', { luz: [1, 2], nota: { 1: 'mixto', 2: 'mixto' } }],
          ['Entonces es 2 de 4, la mitad, no un tercio.', { luz: [1, 2] }, '$\\tfrac24 = \\tfrac12$'],
        ], 'Los casos deben ser igual de probables: separa la primera de la segunda.'),
        xpHaz('fichas', 'Se lanzan tres monedas. Pon cuántos casos hay en total y la probabilidad de que salgan **exactamente dos caras**.', { slots: fila('casos', 'dos caras'), fichas: ['8', '3/8', '6', '1/3', '3/6'], meta: ['8', '3/8'], alto: 96, pista: 'Cada moneda tiene 2 caras. El sello puede quedar en la primera, la segunda o la tercera.' }, '$2 \\cdot 2 \\cdot 2 = 8$ casos, y 3 tienen dos caras.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una ruleta tiene 8 casillas iguales: 3 azules, 4 rojas y 1 verde. ¿Cuál afirmación es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Rojo es más probable que azul: 4 de 8 frente a 3 de 8.'], ['La probabilidad de verde es 1/3, porque hay tres colores.'], ['La de azul es 3/5, porque hay 3 azules y 5 que no.'], ['Si salió rojo tres veces, ahora es más probable azul.']] }, [
        ['Primero los casos posibles: 8 casillas iguales. Ese es el total.', {}],
        ['B cuenta colores, no casillas, y los colores no son igual de probables.', { luz: [1], nota: { 1: 'cuenta colores' } }],
        ['C divide entre las que no sirven. Siempre se divide entre el total.', { luz: [2], nota: { 2: 'mal total' } }],
        ['D cree que la ruleta recuerda. Cada giro empieza igual que el primero.', { luz: [3], nota: { 3: 'sin memoria' } }],
        ['A compara 4 de 8 con 3 de 8, sobre el mismo total. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Divide siempre entre el total de casos igual de probables.'),
      xpHaz('hoja', 'Una caja tiene 5 lápices negros, 3 rojos y 2 azules. Se saca uno sin mirar. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La de rojo es 3/7, porque hay 3 rojos y 7 que no.'], ['La de azul es 1/3, porque hay tres colores.'], ['La de negro es 1/2, porque son 5 de 10.'], ['Si salen dos negros y se devuelven, el siguiente será rojo seguro.']], pista: 'Cuenta todos los lápices de la caja: ese es el total de casos posibles.' }, 'Hay 10 lápices y 5 son negros: $\\tfrac{5}{10} = \\tfrac12$.')],
    cierre: 'Favorables entre posibles, con casos igual de probables; y el azar no tiene memoria.',
  });

  const T4 = ['12', '8', '20', '18', '22', '40', '30', '30', '60'];
  xpAmplia('icf-ma-azar-4', {
    conecta: 'icf-ma-azar-3',
    desde: [
      ['Desde cero: una tabla con totales',
        xpMira('rejilla', 'Las preguntas de este tema casi siempre traen una **tabla de doble entrada con totales**. Antes de calcular, hay que saber leerla.', { f: 3, c: 3, filas: ['usa bus', 'no usa', 'total'], cols: ['mañana', 'tarde', 'total'], izq: 70, celda: i => T4[i] }, [
          ['En la lección anterior viste que la probabilidad es favorables entre posibles.', {}],
          ['Esta tabla cuenta 60 estudiantes según su jornada y si usan bus.', {}],
          ['Cada casilla de adentro cruza dos cosas: 12 son de la mañana y usan bus.', { luz: [0] }],
          ['La última columna suma cada fila: 20 usan bus en total.', { luz: [2] }, '$12 + 8 = 20$'],
          ['La última fila suma cada columna: 30 son de la mañana.', { luz: [6] }, '$12 + 18 = 30$'],
          ['Y la esquina es el total de todos: 60 estudiantes.', { luz: [8] }],
        ], 'Adentro, los cruces; en los bordes, los totales; en la esquina, todos.'),
        xpHaz('rejilla', 'Toca la casilla que dice cuántos estudiantes de la **tarde** **no** usan bus.', { f: 3, c: 3, filas: ['usa bus', 'no usa', 'total'], cols: ['mañana', 'tarde', 'total'], izq: 70, celda: i => T4[i], unoAUno: true, meta: [4] }, 'Fila «no usa», columna «tarde»: son 22.')],
    ],
    despues: [
      ['Más difícil: completar la tabla',
        xpMira('rejilla', 'A veces la tabla llega **incompleta**. Con los totales se llenan los huecos restando, y después se calcula.', { f: 3, c: 3, filas: ['con gafas', 'sin gafas', 'total'], cols: ['niñas', 'niños', 'total'], izq: 74, celda: i => ({ 0: '9', 2: '15', 6: '20', 7: '20', 8: '40' }[i] || '?') }, [
          ['A veces la tabla llega incompleta. Los totales ayudan a llenarla.', {}],
          ['Con gafas hay 15 y 9 son niñas: los niños con gafas son 6.', { txt: { 1: '6' }, luz: [1] }, '$15 - 9 = 6$'],
          ['Las niñas son 20 y 9 tienen gafas: 11 niñas sin gafas.', { txt: { 3: '11' }, luz: [3] }, '$20 - 9 = 11$'],
          ['Los niños son 20 y 6 tienen gafas: 14 niños sin gafas.', { txt: { 4: '14' }, luz: [4] }, '$20 - 6 = 14$'],
          ['Sin gafas en total hay 11 más 14: 25. Y cuadra, porque 15 + 25 = 40.', { txt: { 5: '25' }, luz: [5] }],
          ['Entre los de gafas, la probabilidad de niño es 6 de 15.', { luz: [1, 2] }, '$\\tfrac{6}{15} = \\tfrac25$'],
        ], 'Llena los huecos restando de los totales y revisa que todo cuadre.'),
        xpHaz('fichas', 'De 50 clientes, 30 pagan con tarjeta. Compraron ropa 25, y 18 de ellos con tarjeta. Pon los de ropa en efectivo y la de tarjeta **entre** los de ropa.', { slots: fila('ropa, efectivo', 'tarjeta | ropa'), fichas: ['7', '18/25', '18/30', '12', '25/50'], meta: ['7', '18/25'], alto: 96, pista: 'Los de ropa son 25: ese es el total de la segunda pregunta.' }, '$25 - 18 = 7$ y $\\tfrac{18}{25}$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se encuestó a 80 personas: 30 viven en el campo, y de ellas 12 tienen moto. Si se escoge al azar una persona **del campo**, ¿qué probabilidad hay de que tenga moto?', { letras: ['A', 'B', 'C', 'D'], paras: [['12/80'], ['12/30'], ['30/80'], ['12/50, porque 50 no viven en el campo.']] }, [
        ['La frase clave es «una persona del campo»: el total ya no son las 80.', {}],
        ['A divide entre todos: sería la de campo y moto entre los 80.', { luz: [0], nota: { 0: 'total de todos' } }],
        ['C es la probabilidad de vivir en el campo: responde otra pregunta.', { luz: [2], nota: { 2: 'otra pregunta' } }],
        ['D divide entre los que no son del campo: el grupo equivocado.', { luz: [3], nota: { 3: 'otro grupo' } }],
        ['B toma las 12 con moto entre las 30 del campo. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$\\tfrac{12}{30} = \\tfrac25$'],
      ], 'Busca la frase que dice entre quiénes se escoge: ese es el total.'),
      xpHaz('hoja', 'En una caja hay 4 jugos de mora y 2 de lulo. Se sacan dos **sin devolver**. Subraya la probabilidad de que los dos sean de mora.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['4/6 · 4/6 = 4/9'], ['4/6 · 3/5 = 2/5'], ['4/6 + 3/5'], ['2/6 · 1/5']], pista: 'Después de sacar el primero, ¿cuántos jugos quedan en la caja y cuántos son de mora?' }, 'Quedan 5 jugos y 3 de mora: $\\tfrac46 \\cdot \\tfrac35 = \\tfrac25$.')],
    cierre: 'Lee entre quiénes se escoge, llena la tabla con los totales y, sin devolver, cambia el total.',
  });
}
