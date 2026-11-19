// Preuniversitario · Comprensión lectora · mundo 11 «Referencia y cohesión» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): un relato de dos guardianes de faro lleno de «este», «aquel», «esto último» y «lo cual»
// (pronombres y referentes) y una crónica del aguacate que nombra lo mismo de muchas maneras y omite verbos con comas
// (sustituciones y elipsis). La evaluación usa un texto sobre un constructor de canoas. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const FAROS = {
    id: 'lec-guardianes-faro', title: 'Los guardianes de la bahía',
    ficha: { autor: 'Relato de una escritora del Caribe', fuente: 'Antología de relatos del mar', fecha: '2024' },
    paras: [
      'En la bahía de Taganga hubo durante años dos guardianes de faro: don Eliécer, que cuidaba el faro del morro, y su sobrino Abel, que vigilaba la boya luminosa de la entrada. Este era joven y confiaba en los aparatos; aquel había aprendido el oficio de memoria y desconfiaba de todo lo que tuviera batería.',
      'Cada noche, don Eliécer subía los ochenta escalones del faro con una linterna, aunque la luz ya se prendía sola desde 1990. Lo hacía por costumbre, decía, pero también porque desde arriba podía ver lo que ningún sensor veía: una lancha sin luces, un pescador que se demoraba demasiado, una nube que anunciaba tormenta. Esto último, según él, no lo enseñaba ningún manual.',
      'Abel, en cambio, revisaba la boya desde su celular. Una aplicación le avisaba si la batería bajaba o si la luz dejaba de parpadear, lo cual le permitía dormir tranquilo. Su tío se burlaba de él: decía que un guardián que duerme no es guardián, sino inquilino. Abel se reía y le mostraba en la pantalla cuántas horas llevaba encendida la boya sin una sola falla.',
      'Una noche de octubre, la aplicación dejó de funcionar porque se cayó la señal de todo el pueblo. Abel no se dio cuenta de que la boya se había apagado: dormía con el celular en la mano, esperando un aviso que nunca llegó. Quien sí lo notó fue don Eliécer, que desde lo alto del morro vio un barco de turistas acercarse a las rocas de la entrada. Bajó como pudo, despertó a su sobrino y entre los dos encendieron a mano una lámpara de emergencia que este había dejado olvidada en el bote.',
      'Al día siguiente, el capitán del barco fue a darles las gracias. Le dijo a Abel que la aplicación era una maravilla, siempre que alguien siguiera mirando el mar. Abel no respondió nada, pero esa noche subió con su tío los ochenta escalones. Desde entonces lo acompaña los jueves, y don Eliécer, a cambio, aprendió a leer los avisos del celular, cosa que nunca pensó que haría.',
    ],
  };

  const AGUACATE = {
    id: 'lec-oro-verde', title: 'El oro verde',
    ficha: { autor: 'Reportaje de una periodista agraria', fuente: 'Revista de un periódico de Antioquia', fecha: 'Julio de 2025' },
    paras: [
      'Hace veinte años, el aguacate hass era casi desconocido en las fincas del oriente antioqueño. Hoy, esta variedad de piel rugosa ocupa miles de hectáreas, y el llamado «oro verde» se exporta a Europa en contenedores refrigerados; cada semana salen de la región decenas de camiones rumbo al puerto. Los productores de papa, muchos de ellos, cambiaron de cultivo; los de leche, unos pocos.',
      'El fruto tiene ventajas claras para el campesino: se vende en dólares, aguanta bien el viaje y los compradores extranjeros pagan por él más que el mercado local. Por eso muchas familias dejaron sus potreros y sembraron árboles; otras, sus huertas de pancoger. En algunas veredas, el paisaje cambió tanto que los mayores dicen no reconocer las lomas donde crecieron. Los jornaleros, en cambio, encontraron trabajo casi todo el año en la recolección.',
      'Pero la bonanza tiene un costo. Cada árbol necesita mucha agua, y en algunas veredas los acueductos comunitarios ya han tenido que racionar el líquido en verano. Además, el monocultivo deja al productor en manos de unos pocos compradores: si el precio internacional cae, toda la región cae con él. Eso ya pasó con el café en otras épocas, cuando una caída del precio dejó endeudadas a muchas familias.',
      'Algunos agrónomos recomiendan no apostarlo todo a la misma fruta. Doña Amparo Gómez, por ejemplo, tiene aguacates en la parte alta de su finca, café en la media y una huerta en la baja. Cuando el precio de los primeros bajó el año pasado, el segundo la salvó; y la tercera, como siempre, le dio la comida. Su finca no es la que más gana en la vereda, dice, pero es la única que nunca ha tenido que venderse.',
      'El aguacate no es el villano de esta historia ni tampoco el héroe. Es un cultivo, y como todo cultivo conviene sembrarlo con las cuentas claras: cuánta agua hay, cuántos compradores, qué pasa si un año sale mal. Quien hace esas cuentas antes de sembrar no se arrepiente después de haber sembrado.',
    ],
  };

  // ---------------- Lección 1 · Pronombres y referentes ----------------
  setLesson('pu-rf-1', [
    play('hilo-referente', 'Tira del hilo hasta el referente', { doc: FAROS, rounds: [
      { p: 1, text: '|don Eliécer|, que cuidaba |el faro del morro|, y su sobrino |Abel|, que vigilaba la boya luminosa de la entrada. |Este| era joven', from: 7, answer: 5 },
      { p: 2, text: '|una lancha sin luces|, |un pescador que se demoraba demasiado|, |una nube que anunciaba tormenta|. |Esto último|', from: 7, answer: 5 },
      { p: 4, text: 'Bajó como pudo, despertó a |su sobrino| y entre |los dos| encendieron a mano |una lámpara de emergencia| que |este| había dejado olvidada', from: 7, answer: 1 },
    ] }, '«Este» señala al más cercano de los dos nombrados: Abel (y «aquel», al más lejano: don Eliécer). «Esto último» es lo último de la lista: la nube que anuncia tormenta. Y en el párrafo 4, «este» vuelve a ser el sobrino, el último hombre nombrado.',
      { hint: '«Este» y «esto último» apuntan a lo más cercano, lo último que se nombró antes.' }),
    play('lupa-evidencia', 'Lo que cuenta el relato', { doc: FAROS, cards: [
      ['La luz del faro se prende sola desde 1990.', 0],
      ['Abel revisaba la boya desde el celular.', 0],
      ['El barco se salvó porque don Eliécer estaba mirando desde lo alto.', 1],
      ['Abel cambió su manera de trabajar después de esa noche.', 1],
      ['Don Eliécer nunca aprendió a usar el celular.', 2],
      ['El barco de turistas chocó contra las rocas.', 2],
    ] }, 'Las dos primeras están escritas. Que el barco se salvó gracias a don Eliécer y que Abel cambió se deduce de lo que pasa (la lámpara encendida, los jueves en el faro). El final dice que don Eliécer sí aprendió a leer los avisos del celular, y en ningún momento el barco choca.',
      { hint: 'Cuidado con la última oración del relato: cuenta un cambio también en don Eliécer.' }),
    play('termometro-tono', 'El tono del relato', { doc: FAROS, rounds: [
      { frag: 'decía que un guardián que duerme no es guardián, sino inquilino.', scale: ['burlón', 'admirado', 'temeroso', 'triste'], answer: 0 },
      { frag: 'Abel no respondió nada, pero esa noche subió con su tío los ochenta escalones.', scale: ['humilde', 'orgulloso', 'furioso', 'indiferente'], answer: 0 },
    ] }, 'El tío se burla del sobrino con una comparación. Y Abel, sin decir nada, sube con él: reconoce su error con humildad.',
      { hint: 'En el segundo fragmento, Abel no habla. ¿Qué dice su gesto?' }),
    play('mapa-del-texto', 'El orden del relato', { doc: FAROS, labels: ['presenta a los dos guardianes', 'describe el método del tío', 'describe el método del sobrino', 'narra la noche del apagón', 'muestra el cambio en los dos', 'explica cómo funciona un faro'], key: [0, 1, 2, 3, 4] },
      'Presentación, dos maneras de trabajar, el conflicto de la noche del apagón y el cambio final. El relato no explica cómo funciona un faro.',
      { hint: 'Los párrafos 2 y 3 se oponen con «en cambio». ¿Qué se opone allí?' }),
    play('donde-buscar', 'Vuelve al párrafo', { doc: FAROS, cards: [
      ['¿Qué cuidaba cada guardián?', [1]], ['¿Cuántos escalones tiene el faro?', [2, 5]], ['¿Qué hacía la aplicación de Abel?', [3]],
      ['¿Por qué dejó de funcionar la aplicación?', [4]], ['¿Qué le dijo el capitán a Abel?', [5]],
    ] }, 'Los ochenta escalones aparecen dos veces (párrafos 2 y 5): las dos respuestas sirven. Lo demás tiene un solo lugar.',
      { hint: 'Un dato puede aparecer en más de un párrafo. Si es así, cualquiera de los dos sirve.' }),
    play('caso-nuevo', 'La lección de los faros', { doc: FAROS, principle: 'La tecnología ayuda, pero no reemplaza la atención de una persona.', cards: [
      ['Un piloto que, aunque vuela con piloto automático, sigue mirando los instrumentos.', true],
      ['Una enfermera que revisa al paciente aunque la máquina diga que todo está bien.', true],
      ['Un señor que compra un celular nuevo porque el viejo se dañó.', false],
      ['Una niña que aprende a montar en bicicleta.', false],
    ] }, 'El piloto y la enfermera usan la máquina sin dejar de mirar. Comprar un celular o aprender a montar en bicicleta no tiene que ver con la idea.',
      { hint: 'Busca los casos en que alguien usa la tecnología y además sigue atento, como el capitán le pidió a Abel.' }),
    play('palabra-a-la-medida', 'Palabras del relato', { doc: FAROS, rounds: [
      { p: 3, before: 'un guardián que duerme no es guardián, sino ', word: 'inquilino', after: '.', options: ['alguien que solo vive en el lugar', 'un ladrón', 'un turista', 'un jefe'], answer: 0 },
      { p: 2, before: 'Lo hacía por ', word: 'costumbre', after: ', decía', options: ['hábito', 'obligación', 'dinero', 'miedo'], answer: 0 },
    ] }, 'Un inquilino vive en un lugar sin cuidarlo como suyo: eso es, para el tío, un guardián que duerme. Y hacer algo por costumbre es hacerlo por hábito.',
      { hint: 'Piensa en la diferencia entre cuidar una casa y solo vivir en ella.' }),
  ]);

  // ---------------- Lección 2 · Sustituciones y elipsis ----------------
  setLesson('pu-rf-2', [
    play('quien-lo-dice', 'Muchos nombres para lo mismo', { doc: AGUACATE, ask: 'Lleva cada expresión del texto a lo que nombra.', voices: ['el aguacate', 'el agua', 'el café'], cards: [
      ['esta variedad de piel rugosa', 0],
      ['el llamado «oro verde»', 0],
      ['el fruto', 0],
      ['la misma fruta', 0],
      ['el líquido', 1],
      ['el segundo', 2],
    ] }, 'Para no repetir «aguacate», el texto dice «esta variedad», «oro verde», «el fruto» y «la misma fruta». «El líquido» es el agua que se raciona, y «el segundo» es el café, segundo cultivo de la lista de doña Amparo.',
      { hint: 'Para cada expresión, busca hacia atrás de qué se venía hablando.' }),
    play('hilo-referente', 'Lo que se sustituye', { doc: AGUACATE, rounds: [
      { p: 3, text: 'Cada árbol necesita |mucha agua|, y en algunas veredas |los acueductos comunitarios| ya han tenido que racionar |el líquido|', from: 5, answer: 1 },
      { p: 4, text: 'tiene |aguacates| en la parte alta de su finca, |café| en la media y |una huerta| en la baja. Cuando el precio de los primeros bajó el año pasado, |el segundo|', from: 7, answer: 3 },
    ] }, '«El líquido» sustituye al agua. Y «el segundo» es el segundo cultivo nombrado: el café, que salvó a doña Amparo cuando bajó el aguacate.',
      { hint: 'En una lista, «el primero», «el segundo» y «la tercera» siguen el orden en que se nombraron.' }),
    play('signos-que-hablan', 'La coma de la elipsis', { doc: AGUACATE, rounds: [
      { p: 1, text: 'cambiaron de cultivo; los de leche|,| unos pocos.', options: ['ocupa el lugar de «cambiaron de cultivo», que no se repite', 'separa los elementos de una lista', 'abre un inciso', 'marca el final de una cita'], answer: 0 },
      { p: 2, text: 'dejaron sus potreros y sembraron árboles; otras|,| sus huertas de pancoger.', options: ['ocupa el lugar de «dejaron», que no se repite', 'separa dos adjetivos', 'abre una explicación', 'marca una pregunta'], answer: 0 },
      { p: 1, text: 'el llamado |«|oro verde» se exporta a Europa', options: ['marca un apodo que se usa para el aguacate', 'cita a un agrónomo', 'marca la ironía de la autora', 'abre el título de un libro'], answer: 0 },
    ] }, 'En «los de leche, unos pocos» y «otras, sus huertas», la coma ocupa el lugar del verbo que se omite para no repetirlo: es la elipsis. Las comillas de «oro verde» marcan un apodo («el llamado»).',
      { hint: 'Lee la frase anterior y pregúntate qué verbo falta después de la coma.' }),
    play('lupa-evidencia', 'Lo que se dice sin repetir', { doc: AGUACATE, cards: [
      ['Algunos productores de leche cambiaron de cultivo.', 0],
      ['El café salvó a doña Amparo cuando bajó el precio del aguacate.', 0],
      ['La huerta de doña Amparo ya le daba comida antes de que bajara el precio.', 1],
      ['Todos los productores de papa cambiaron de cultivo.', 2],
      ['La autora está en contra de sembrar aguacate.', 2],
    ] }, 'Las dos primeras están dichas, aunque con elipsis («los de leche, unos pocos») y sustitución («el segundo la salvó»). Lo de la huerta se deduce de «como siempre, le dio la comida». «Muchos de ellos» no es «todos», y la autora dice que el aguacate no es villano ni héroe.',
      { hint: 'Una idea dicha con elipsis o con otra palabra sigue estando dicha. Reconstruye la frase completa antes de decidir.' }),
    play('conector-bisagra', 'Bisagras del reportaje', { doc: AGUACATE, rounds: [
      { a: 'El fruto se vende en dólares y aguanta bien el viaje.', b: 'muchas familias dejaron sus potreros y sembraron árboles.', options: ['Por eso,', 'Aunque', 'Es decir,', 'En cambio,'], answer: 0 },
      { a: 'El aguacate trajo una bonanza.', b: 'la bonanza tiene un costo.', options: ['Pero', 'Por lo tanto,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'Algunos agrónomos recomiendan no apostarlo todo a la misma fruta.', b: 'doña Amparo tiene aguacates, café y una huerta.', options: ['Por ejemplo,', 'Sin embargo,', 'Por eso,', 'Aunque'], answer: 0 },
    ] }, 'Las ventajas explican el cambio de cultivo (consecuencia); la bonanza tiene su contracara (contraste); y doña Amparo es un caso de lo que recomiendan los agrónomos (ejemplo).',
      { hint: 'Pregúntate si la segunda idea resulta de la primera, se le opone o la ilustra con un caso.' }),
    play('balanza-argumento', '¿Un solo cultivo?', { doc: AGUACATE, thesis: 'Conviene no depender de un solo cultivo.', cards: [
      ['Si el precio internacional cae, toda la región cae con él.', 0],
      ['A doña Amparo la salvó el café cuando bajó el aguacate.', 0],
      ['Un estudio muestra que las fincas con un solo cultivo ganan más y resisten mejor las crisis.', 1],
      ['El aguacate hass tiene la piel rugosa.', null],
    ] }, 'El riesgo de la caída del precio y el caso de doña Amparo apoyan la tesis. Si las fincas de un solo cultivo resistieran mejor, la tesis se caería. La piel rugosa no tiene que ver.',
      { hint: 'Imagina cada oración como cierta: ¿muestra el riesgo de depender de un cultivo o lo contrario?' }),
    play('mapa-del-texto', 'El recorrido del reportaje', { doc: AGUACATE, labels: ['presenta el auge del aguacate', 'explica sus ventajas', 'señala sus costos', 'da un ejemplo de alternativa', 'cierra con una postura equilibrada', 'compara precios de varios países'], key: [0, 1, 2, 3, 4] },
      'Auge, ventajas, costos, una alternativa y un cierre que no condena ni celebra. No hay comparación de precios entre países.',
      { hint: 'El párrafo 3 empieza con «Pero» y el 5 dice «ni el villano ni el héroe». ¿Qué hace cada uno?' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const CANOA = {
    id: 'lec-canoas-tumaco', title: 'Las canoas de don Pastor',
    paras: [
      'En el puerto de Tumaco, algunos constructores de canoas todavía trabajan con machete y azuela. Don Pastor Quiñones, el más viejo de ellos, aprendió de su padre, y este, de un abuelo que había llegado del Chocó. Sus canoas se reconocen en todo el puerto: la proa es más alta que la de las demás, lo cual las hace más seguras con oleaje.',
      'Cada embarcación sale de un solo tronco. El árbol se escoge en el monte, se corta y se arrastra hasta el río; allí, el agua lo lleva hasta el taller. Tallarlo toma dos meses; pintarlo, una semana.',
      'Los jóvenes prefieren las lanchas de fibra de vidrio, que son más rápidas y no se pudren. Don Pastor no los culpa. Solo les pide que, antes de comprar una, aprendan a hacer la otra.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: CANOA, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-referencia', 'Evaluación · Referencia y cohesión', [
    ['pu-rf-1', '«Este» señala a lo más cercano de lo que se acaba de nombrar.',
      Q('En «aprendió de su padre, y este, de un abuelo», la palabra «este» se refiere a:', ['don Pastor', 'el padre de don Pastor', 'el abuelo', 'el Chocó'], 1,
        '«Este» es el último nombrado antes: el padre, que a su vez aprendió de un abuelo.',
        'Busca el nombre más cercano antes de «este» y prueba reemplazándolo.')],
    ['pu-rf-1', '«Lo cual» se refiere a toda una idea dicha antes, no a una sola palabra.',
      Q('En el párrafo 1, «lo cual» se refiere a:', ['que la proa sea más alta que la de las demás', 'el puerto de Tumaco', 'las demás canoas', 'el oleaje'], 0,
        'Lo que hace más seguras a las canoas es que su proa sea más alta: «lo cual» recoge esa idea entera.',
        'Pregúntate qué hace más seguras las canoas con oleaje.')],
    ['pu-rf-1', 'Un pronombre concuerda en género y número con su referente.',
      Q('En «Don Pastor no los culpa», «los» se refiere a:', ['las lanchas', 'los troncos', 'los constructores', 'los jóvenes'], 3,
        'Lo que don Pastor podría reprochar es que los jóvenes prefieran las lanchas: no los culpa a ellos.',
        'Busca en la oración anterior un grupo, en masculino plural, al que se pueda culpar de algo.')],
    ['pu-rf-2', 'En la elipsis, la coma ocupa el lugar de una palabra que no se repite.',
      Q('En «Tallarlo toma dos meses; pintarlo, una semana», la coma después de «pintarlo» ocupa el lugar de:', ['tronco', 'semana', 'toma', 'dos meses'], 2,
        'La frase completa sería «pintarlo toma una semana»; el verbo se omite para no repetirlo.',
        'Reconstruye la segunda parte con la palabra que falta.')],
    ['pu-rf-2', 'Un texto nombra lo mismo de varias maneras para no repetir.',
      Q('La expresión «Cada embarcación» (párrafo 2) sustituye a:', ['las canoas', 'los troncos', 'las lanchas de fibra', 'los talleres'], 0,
        'El párrafo 2 sigue hablando de las canoas de don Pastor: cada una sale de un solo tronco.',
        'Las lanchas de fibra aparecen después. ¿De qué se hablaba al final del párrafo 1?')],
    ['pu-rf-2', '«El otro» o «la otra» señalan el término de la pareja que no se acaba de mencionar.',
      Q('En «aprendan a hacer la otra», «la otra» se refiere a:', ['la lancha de fibra de vidrio', 'la canoa de un solo tronco', 'la proa', 'la azuela'], 1,
        'Frente a la lancha que van a comprar, «la otra» es la canoa tradicional que don Pastor les pide aprender a hacer.',
        'En el párrafo 3 hay dos tipos de embarcación. Si una es la que se compra, ¿cuál es la otra?')],
  ]);
});
