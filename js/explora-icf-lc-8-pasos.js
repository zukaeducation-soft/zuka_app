// Preicfes · Lectura Crítica, mundo 8 «Comparar Textos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): comparar, propósito y
// postura desde cero; luego ampliar frente a ejemplificar, qué le respondería un autor al otro y las trampas del examen (matizar no
// es contradecir, invertir las posturas, darle a uno la idea del otro). Parejas breves propias.
{
  xpAmplia('icf-lc-comparar-1', {
    conecta: 'icf-lc-evalua-3',
    desde: [
      ['Desde cero: leer dos textos a la vez',
        xpMira('hoja', 'Antes de las palabras difíciles: comparar dos textos es como comparar dos fotos del mismo sitio: qué se repite y qué cambia.', { letras: ['T1', 'T2'], paras: [['«La plaza de mercado abre a las cinco y vende frutas de la región».'], ['«Desde niña voy a la plaza con mi abuela; huele a guayaba y a café».']] }, [
          ['En la lección de valores viste que dos textos pueden coincidir y chocar.', {}],
          ['Primero busca el tema: los dos hablan de la plaza.', { luz: [0, 1], nota: { 0: 'la plaza', 1: 'la plaza' } }],
          ['T1 informa: horarios y productos.', { luz: [0], nota: { 0: 'informa' } }],
          ['T2 cuenta un recuerdo: olores y la abuela.', { luz: [1], nota: { 1: 'recuerda' } }],
          ['Mismo tema, distinto propósito: eso ya es comparar.', {}],
        ], 'Comparar es buscar el tema común y ver qué hace distinto cada texto.'),
        xpHaz('hoja', 'T1: «El café colombiano se vende en muchos países». T2: «El tinto de mi papá a las cinco despierta la casa». Subraya lo que comparten.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Hablan del café.'], ['Dan cifras.'], ['Hablan del papá.']], pista: 'Esa solo está en uno. Busca lo que puedas señalar en los dos.' }, 'El café está en los dos; el papá, solo en uno.')],
    ],
    despues: [
      ['Más difícil: ampliar o ejemplificar',
        xpMira('hoja', 'Un paso más: cuando dos textos van del mismo lado, mira si el segundo **muestra un caso** o **agrega algo nuevo**.', { letras: ['T1', 'a', 'b', 'c'], paras: [['«Caminar media hora al día protege el corazón».'], ['«Mi tío camina cada mañana y su médico lo felicitó».'], ['«Además, caminar mejora el ánimo».'], ['«Caminar media hora es bueno para el corazón».']] }, [
          ['Arriba está la idea de T1.', { luz: [0] }],
          ['La a es un caso de lo que dice T1: ejemplifica.', { luz: [1], nota: { 1: 'ejemplifica' } }],
          ['La b suma un beneficio nuevo: amplía.', { luz: [2], nota: { 2: 'amplía' } }],
          ['La c solo repite T1 con otras palabras.', { luz: [3], nota: { 3: 'repite' } }],
          ['Ninguna contradice: todas van del mismo lado.', { luz: [1, 2, 3] }],
        ], 'Ejemplificar: un caso de lo mismo. Ampliar: algo nuevo del mismo lado. Repetir: lo mismo dicho distinto.'),
        xpHaz('hoja', 'T1: «Leer en voz alta mejora la pronunciación». Pon al margen qué hace cada texto con T1.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['repite', 'ejemplifica', 'amplía'], meta: [1, 2, 0], paras: [['«Mi hija lee cuentos en voz alta y ya no se traba».'], ['«Además, leer en voz alta ayuda a recordar».'], ['«Leer en voz alta hace que uno pronuncie mejor».']], pista: 'Alguno no va ahí: ¿es un caso, algo nuevo o lo mismo?' }, 'La hija es un caso, recordar es algo nuevo y la última repite.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué relación hay entre el texto 1 y el texto 2?». Las trampas confunden **matizar** con contradecir.', { letras: ['textos', 'A', 'B', 'C', 'D'], paras: [['T1: «Las vacunas protegen a los niños». T2: «Las vacunas protegen, pero hay que ponerlas a tiempo».'], ['T2 contradice a T1.'], ['T2 matiza a T1: le agrega una condición.'], ['T2 repite a T1.'], ['T2 no habla del mismo tema.']] }, [
        ['La pregunta: ¿qué relación hay entre T1 y T2?', { luz: [0] }],
        ['A falla: T2 no niega que las vacunas protejan.', { luz: [1], nota: { 1: 'no niega' } }],
        ['C falla: T2 agrega algo que T1 no dice.', { luz: [3], nota: { 3: 'agrega' } }],
        ['D falla: los dos hablan de vacunas.', { luz: [4], nota: { 4: 'mismo tema' } }],
        ['B: «pero hay que…» pone una condición. Eso es matizar.', { luz: [2], nota: { 2: 'matiza' } }],
      ], 'Contradecir niega; matizar acepta y pone un límite; ampliar agrega; ejemplificar muestra un caso.'),
      xpHaz('hoja', 'T1: «El reciclaje reduce la basura». T2: «En mi conjunto separamos todo y el camión ya lleva la mitad de bolsas». ¿Qué relación hay?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['T2 contradice a T1.'], ['T2 matiza a T1.'], ['T2 da un caso que ejemplifica a T1.'], ['T2 cambia de tema.']], pista: 'Esa relación no encaja: ¿T2 niega, pone un límite o muestra un caso?' }, 'El conjunto es un caso de lo que dice T1.')],
    cierre: 'Busca el tema común, el propósito de cada uno y si uno ejemplifica, amplía, matiza o contradice al otro.',
  });

  xpAmplia('icf-lc-comparar-2', {
    conecta: 'icf-lc-comparar-1',
    desde: [
      ['Desde cero: qué es una postura',
        xpMira('hoja', 'Antes de las palabras difíciles: una **postura** es el lado en que se pone alguien frente a un asunto: a favor, en contra o con condiciones.', { paras: [['Asunto: ¿uniforme obligatorio en el colegio?'], ['Laura: «Sí, así nadie se fija en la ropa».'], ['Tomás: «No, cada uno debe vestirse como quiera».'], ['Sara: «Sí, pero solo para las salidas».']] }, [
          ['En la lección de dos textos viste que uno puede matizar al otro.', {}],
          ['Este es el asunto que se discute.', { luz: [0], nota: { 0: 'asunto' } }],
          ['Laura está a favor y da su razón.', { luz: [1], nota: { 1: 'a favor' } }],
          ['Tomás está en contra.', { luz: [2], nota: { 2: 'en contra' } }],
          ['Sara acepta, con una condición: matiza.', { luz: [3], nota: { 3: 'con condición' } }],
          ['Cada postura tiene su tesis y sus razones.', {}],
        ], 'Postura: el lado de cada uno frente al asunto. Puede ser a favor, en contra o con condiciones.'),
        xpHaz('hoja', 'Asunto: ¿cerrar la calle los sábados para el mercado? Pon al margen la postura de cada voz.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['con condición', 'en contra', 'a favor'], meta: [2, 0, 1], paras: [['«Sí, se mueve la economía».'], ['«Sí, pero solo hasta mediodía».'], ['«No, la ambulancia no podría pasar».']], pista: 'Alguno no va ahí: busca «sí», «sí, pero» y «no».' }, '«Sí» apoya, «sí, pero» pone condición y «no» se opone.')],
    ],
    despues: [
      ['Más difícil: qué le respondería uno al otro',
        xpMira('hoja', 'Un paso más: a veces hay que imaginar **qué le diría** un autor al otro. Usa la idea del primero contra lo que dice el segundo.', { letras: ['T1', 'T2', 'a', 'b'], paras: [['«Hay que construir más vías para acabar el trancón».'], ['«Más vías atraen más carros; el trancón vuelve».'], ['T2 le diría a T1: las vías nuevas se llenarán pronto.'], ['T2 le diría a T1: hay que hacer vías más anchas.']] }, [
          ['T1 propone una salida: más vías.', { luz: [0], nota: { 0: 'propone' } }],
          ['T2 da una razón que choca con esa salida.', { luz: [1], nota: { 1: 'su idea' } }],
          ['La a usa la idea de T2 contra la propuesta de T1.', { luz: [2], nota: { 2: 'responde' } }],
          ['La b le da la razón a T1: invierte la postura de T2.', { luz: [3], tacha: [3], nota: { 3: 'al revés' } }],
          ['Primero di la tesis de cada uno; después, cómo chocan.', {}],
        ], 'Para saber qué respondería un autor, aplica su idea a lo que propone el otro.'),
        xpHaz('hoja', 'T1: «Multar a quien bote basura limpiará el río». T2: «La gente bota basura porque el camión no pasa». ¿Qué le diría T2 a T1?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que sin camión, las multas no bastan.'], ['Que las multas deben ser más altas.'], ['Que el río es muy largo.']], pista: 'Esa respuesta no usa la idea de T2. ¿Qué dice T2 que causa la basura?' }, 'Si la causa es el camión, multar no resuelve el problema.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿En qué coinciden los dos autores?» o «¿qué diría el autor 2 del autor 1?». Hay trampas que invierten las posturas.', { letras: ['textos', 'A', 'B', 'C', 'D'], paras: [['T1: «El festival del río debe cancelarse: deja toneladas de basura». T2: «La basura es un problema, sí; pongamos canecas en vez de cancelarlo».'], ['Los dos quieren cancelar el festival.'], ['Coinciden en que hay un problema de basura, no en la salida.'], ['T2 niega que haya basura.'], ['T1 propone poner canecas.']] }, [
        ['La pregunta: ¿en qué coinciden y en qué no?', { luz: [0] }],
        ['A invierte la postura de T2: él no quiere cancelar.', { luz: [1], nota: { 1: 'invierte' } }],
        ['C contradice el «sí» de T2: él acepta el problema.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D le da a T1 la propuesta de T2.', { luz: [4], nota: { 4: 'cambia el dueño' } }],
        ['B separa el hecho común de las salidas distintas.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Separa en cada texto el hecho, la postura y la salida: así ves en qué coinciden y en qué chocan.'),
      xpHaz('hoja', 'T1: «Madrugar a entrenar forma el carácter». T2: «Forma el carácter, sí, pero entrenar cansado causa lesiones». ¿En qué coinciden?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['En que hay que madrugar.'], ['En que entrenar puede formar el carácter.'], ['En que entrenar siempre causa lesiones.'], ['En que el carácter no importa.']], pista: 'Esa opción le da a uno la idea del otro o exagera. Busca lo que aceptan los dos.' }, 'El «sí» de T2 acepta lo del carácter; difieren en lo demás.')],
    cierre: 'Di la tesis de cada uno, cómo responde el otro y qué quedó sin contestar.',
  });
}
