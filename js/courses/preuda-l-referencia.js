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
    play('ordena-parrafos', 'Arma el relato otra vez', { doc: FAROS },
      '«Este» y «aquel» del párrafo 1 presentan a los dos guardianes; el 2 describe al tío y «Abel, en cambio» del 3 se le opone; «Una noche de octubre» trae el apagón y «Al día siguiente», la visita del capitán.',
      { hint: '«En cambio» opone dos cosas: la segunda tiene que venir después de la primera. Y «al día siguiente» necesita un día antes.' }),
    play('hilo-referente', 'Tira del hilo hasta el referente', { doc: FAROS, rounds: [
      { p: 1, text: '|don Eliécer|, que cuidaba |el faro del morro|, y su sobrino |Abel|, que vigilaba la boya luminosa de la entrada. |Este| era joven', from: 7, answer: 5 },
      { p: 2, text: '|una lancha sin luces|, |un pescador que se demoraba demasiado|, |una nube que anunciaba tormenta|. |Esto último|', from: 7, answer: 5 },
      { p: 4, text: 'Bajó como pudo, despertó a |su sobrino| y entre |los dos| encendieron a mano |una lámpara de emergencia| que |este| había dejado olvidada', from: 7, answer: 1 },
    ] }, '«Este» señala al más cercano de los dos nombrados: Abel (y «aquel», al más lejano: don Eliécer). «Esto último» es lo último de la lista: la nube que anuncia tormenta. Y en el párrafo 4, «este» vuelve a ser el sobrino, el último hombre nombrado.',
      { hint: '«Este» y «esto último» apuntan a lo más cercano, lo último que se nombró antes.' }),
    play('termometro-tono', 'El tono del relato', { doc: FAROS, rounds: [
      { frag: 'decía que un guardián que duerme no es guardián, sino inquilino.', scale: ['burlón', 'admirado', 'temeroso', 'triste'], answer: 0 },
      { frag: 'Abel no respondió nada, pero esa noche subió con su tío los ochenta escalones.', scale: ['humilde', 'orgulloso', 'furioso', 'indiferente'], answer: 0 },
    ] }, 'El tío se burla del sobrino con una comparación. Y Abel, sin decir nada, sube con él: reconoce su error con humildad.',
      { hint: 'En el segundo fragmento, Abel no habla. ¿Qué dice su gesto?' }),
    play('resume-parrafo', 'Cada párrafo en una frase', { doc: FAROS, paras: [2, 3, 4, 5], options: [
      'Don Eliécer sube cada noche al faro porque desde arriba ve lo que ningún sensor ve.',
      'Abel confía en una aplicación que le avisa de las fallas de la boya.',
      'La noche del apagón, el tío ve el peligro y entre los dos encienden una lámpara.',
      'Después de esa noche, cada uno aprende algo del método del otro.',
      'Abel salva solo el barco gracias a su aplicación.',
      'El faro del morro tiene ochenta escalones.',
    ], key: [0, 1, 2, 3] },
      'Cada resumen cubre su párrafo entero. Abel no salva solo el barco: dormía, y fue el tío quien vio el peligro. Y los ochenta escalones son un dato, no la idea de ningún párrafo.',
      { hint: 'Un resumen no se queda en un número ni le cambia el papel a los personajes. Revisa quién hace qué en el párrafo 4.' }),
    play('subraya-prueba', 'La prueba en el relato', { doc: FAROS, rounds: [
      { claim: 'La aplicación dependía de algo que no estaba en manos de Abel.', p: 4, answer: 0 },
      { claim: 'El capitán cree que la tecnología sirve, pero que no basta sola.', p: 5, answer: 1 },
    ] }, 'La aplicación falló porque se cayó la señal de todo el pueblo, algo que Abel no controlaba. Y la idea del capitán está en su frase: la aplicación es una maravilla «siempre que alguien siga mirando el mar».',
      { hint: 'Busca la oración que trae una causa o una condición: un «porque» o un «siempre que».' }),
    play('caso-nuevo', 'La lección de los faros', { doc: FAROS, principle: 'La tecnología ayuda, pero no reemplaza la atención de una persona.', cards: [
      ['Un piloto que, aunque vuela con piloto automático, sigue mirando los instrumentos.', true],
      ['Una enfermera que revisa al paciente aunque la máquina diga que todo está bien.', true],
      ['Un señor que compra un celular nuevo porque el viejo se dañó.', false],
      ['Una niña que aprende a montar en bicicleta.', false],
    ] }, 'El piloto y la enfermera usan la máquina sin dejar de mirar. Comprar un celular o aprender a montar en bicicleta no tiene que ver con la idea.',
      { hint: 'Busca los casos en que alguien usa la tecnología y además sigue atento, como el capitán le pidió a Abel.' }),
    play('cadena-causas', 'La noche del apagón', { doc: FAROS, chain: [
      'Se cae la señal de todo el pueblo.',
      'La aplicación de Abel deja de funcionar.',
      'Abel no se entera de que la boya se apagó.',
    ], extra: ['Se baja la batería de la boya.', 'Don Eliécer sube los ochenta escalones del faro.'] },
      'El párrafo 4 encadena los hechos: sin señal, la aplicación deja de funcionar, y Abel, que esperaba el aviso, no se da cuenta de que la boya se apagó. El texto no dice que se bajara la batería, y la subida del tío es lo que salvó la noche, no una causa del apagón.',
      { hint: 'Empieza por la oración que tiene un «porque» al comienzo del párrafo 4.' }),
  ]);

  // ---------------- Lección 2 · Sustituciones y elipsis ----------------
  setLesson('pu-rf-2', [
    play('ordena-parrafos', 'Arma el reportaje otra vez', { doc: AGUACATE },
      'Primero el auge del aguacate; «El fruto tiene ventajas» explica por qué se sembró; «Pero la bonanza tiene un costo» se opone a esas ventajas; los agrónomos y doña Amparo proponen otra salida, y el 5 cierra con «ni el villano ni el héroe».',
      { hint: '«El fruto» y «la bonanza» sustituyen algo que ya se nombró. Y un «Pero» se opone a lo que acaba de decirse.' }),
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
    play('resumen-esencial', 'El resumen en tres renglones', { doc: AGUACATE, ideas: [
      ['El aguacate se volvió en pocos años el gran cultivo de la región.', true],
      ['Trae ventajas, pero gasta mucha agua y deja a la región en manos de pocos compradores.', true],
      ['Conviene no depender de un solo cultivo y sembrar con las cuentas claras.', true],
      ['Cada semana salen decenas de camiones rumbo al puerto.', false],
      ['Doña Amparo tiene café en la parte media de su finca.', false],
      ['Los mayores dicen no reconocer las lomas donde crecieron.', false],
    ] }, 'El reportaje cuenta el auge, pesa sus ventajas y costos y cierra con una recomendación. Los camiones, el café de doña Amparo y las lomas que cambiaron son detalles que ilustran esas ideas.',
      { hint: 'El último párrafo da la postura de la autora. Una idea esencial lleva hasta ella; un detalle solo la adorna.' }),
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
