// Preicfes · Lectura Crítica · mundo 1 «Lo que Dice el Texto» (spec 2026-11-20-curso-preicfes): la primera competencia de la
// prueba, identificar y entender los contenidos locales (datos, ideas de cada párrafo, palabras y referencias). Cada lección
// trabaja un texto original en 7 juegos LEC distintos y cierra con un juego en movimiento; la evaluación usa otro texto con
// preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, mueve, preg } = ICF;

  const AGUA = {
    id: 'icf-agua', title: 'El agua que se pierde antes de llegar',
    ficha: { autor: 'Redacción de medio ambiente', fuente: 'Periódico regional', fecha: 'Marzo de 2026' },
    paras: [
      'En muchas ciudades colombianas, de cada 100 litros de agua que una planta potabiliza, cerca de 40 nunca llegan a una casa. Se escapan por tubos rotos, conexiones ilegales y medidores que marcan menos de lo que pasa por ellos. Los ingenieros llaman a esa diferencia «agua no contabilizada», y es uno de los problemas más caros y menos visibles de los acueductos.',
      'La mayor parte de esa agua no se pierde en grandes rupturas, que se ven y se reparan rápido, sino en fugas pequeñas y constantes. Un tubo con una grieta del tamaño de una lenteja puede botar más de mil litros al día durante años, enterrado bajo el pavimento, sin que nadie lo note. Como el agua se filtra hacia el suelo, la calle sigue seca y la fuga sigue abierta.',
      'Encontrar esas fugas es un trabajo de oído. Por la noche, cuando casi nadie usa el agua y el tráfico disminuye, los técnicos recorren las calles con geófonos, unos audífonos conectados a un sensor que se apoya en el piso. El agua que escapa a presión produce un silbido característico. «Uno aprende a distinguir el sonido de una fuga del de un desagüe o un motor», cuenta Marcela Ortiz, técnica de un acueducto municipal que lleva doce años en ese oficio.',
      'Reparar no basta si el agua circula a una presión mayor de la necesaria. Por eso algunas empresas dividieron sus redes en sectores y les instalaron válvulas que bajan la presión en la madrugada. Con menos presión, las fugas pierden menos agua y los tubos se rompen con menos frecuencia. En un municipio del Valle del Cauca, esa medida redujo las pérdidas en una cuarta parte en tres años.',
      'El problema también tiene un lado social. Algunas familias que viven en barrios sin redes formales se conectan como pueden, con mangueras y uniones improvisadas que se rompen con facilidad. Para los acueductos, convertir esas conexiones en servicios legales, con medidor y tarifas diferenciales, recupera agua y, al mismo tiempo, garantiza un derecho.',
      'Cada litro recuperado es un litro que no hay que sacar de un río ni tratar de nuevo. En temporadas secas, cuando los embalses bajan, esa diferencia puede decidir si una ciudad raciona o no. Cerrar las fugas, concluyen los expertos, es la fuente de agua más barata que existe.',
    ],
  };

  const SUENO = {
    id: 'icf-sueno', title: 'Dormir tarde no siempre es pereza',
    ficha: { autor: 'Equipo de divulgación de una facultad de medicina', fuente: 'Revista para familias', fecha: 'Febrero de 2026' },
    paras: [
      'A las once de la noche, Daniela, de dieciséis años, no tiene sueño. Su mamá cree que es por el celular; sus profesores, que es desorden. Sin embargo, buena parte de la explicación está en su cuerpo: durante la adolescencia, el reloj interno que regula el sueño se corre más o menos dos horas hacia la noche.',
      'Ese reloj depende, entre otras cosas, de la melatonina, una hormona que el cerebro libera cuando oscurece y que prepara al cuerpo para dormir. En los niños aparece temprano, hacia las ocho o nueve de la noche; en los adolescentes, en cambio, llega cerca de las once. Por eso un joven que se acuesta a las nueve suele quedarse mirando el techo: su cuerpo todavía no da la señal.',
      'El problema es que el horario del colegio no se corre con él. Si la jornada empieza a las seis y media de la mañana, Daniela tiene que levantarse a las cinco, y con suerte habrá dormido seis horas, cuando los especialistas recomiendan entre ocho y diez a esa edad. La falta de sueño no se nota solo en los bostezos: afecta la memoria, el ánimo y la capacidad de concentrarse en clase.',
      'Algunos colegios de otros países hicieron un experimento sencillo: retrasaron la entrada una hora. Los estudiantes no se acostaron más tarde, como temían los rectores; durmieron más. Las faltas de asistencia bajaron y las notas de las primeras clases mejoraron. Aun así, el cambio no es fácil: mover el horario afecta el transporte escolar, el trabajo de los padres y las actividades de la tarde.',
      'Mientras tanto, hay hábitos que ayudan. La luz de las pantallas (sobre todo la azul) retrasa la melatonina todavía más, así que apagar el celular una hora antes de dormir sí sirve. También ayuda levantarse a la misma hora los fines de semana: dormir hasta el mediodía el domingo hace que el lunes se sienta como un viaje a otro país.',
      'Entender el reloj de los adolescentes no significa justificarlo todo. Significa dejar de llamar «pereza» a lo que en parte es biología, y buscar soluciones que trabajen con ese reloj y no contra él.',
    ],
  };

  const l1 = leccion('icf-lc-literal-1', 'Datos e ideas del texto', [
    sc(6, 'Casi la mitad de la prueba se responde volviendo al texto. La primera habilidad es saber **qué dice**: sus datos, quién habla y cuál es la idea de cada párrafo.', { title: 'Volver al texto' }),
    sc(7, 'Antes de leer, el título, el autor y la fuente anuncian el tema y el propósito. «Cómo funciona una vacuna», en una revista de ciencia, promete explicar; una columna de opinión promete defender una postura.', { title: 'La ficha avisa' }),
    sc(7, 'Cada párrafo hace algo: presenta un problema, explica una causa, da un ejemplo, cita a alguien o concluye. Ponerle una etiqueta a cada uno arma el **esqueleto** del texto.', { title: 'El esqueleto' }),
    sc(7, 'Ejemplo: «El café se cultiva entre 1 200 y 2 000 metros» es un dato que el texto **dice**. «En la costa no se cultiva café» **se deduce**. «El café colombiano es el mejor» **no lo dice**, aunque suene bien.', { title: 'Dice, se deduce, no lo dice' }),
    sc(6, 'En una pregunta EXCEPTO, se busca cada opción en el texto. La que no aparece, o la que lo contradice, es la respuesta.', { title: 'La trampa del EXCEPTO' }),
  ], [
    play('anticipa-texto', 'Antes de leer, mira la ficha y anticipa', { doc: AGUA, slots: [
      ['Tema', ['el agua que pierden los acueductos', 'la historia de los ríos del país', 'el precio de las tarifas de energía'], 0],
      ['Propósito', ['informar sobre un problema y sus soluciones', 'contar la vida de una técnica', 'convencer de no pagar el servicio'], 0],
      ['Tipo de texto', ['informativo', 'narrativo', 'poético'], 0],
    ] }, 'El título habla del agua que se pierde y sale en la sección de medio ambiente de un periódico: se espera un texto informativo sobre un problema, con sus causas y soluciones.',
      { hint: 'Fíjate en lo que anuncia el título y en la sección donde se publica: dicen de qué trata y para qué se escribió.' }),
    play('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { doc: AGUA, labels: ['presenta el problema con un dato', 'explica dónde se pierde el agua', 'describe cómo se buscan las fugas', 'presenta una medida y su resultado', 'muestra el lado social del problema', 'concluye con el beneficio de cerrar fugas', 'cuenta la historia del primer acueducto'], key: [0, 1, 2, 3, 4, 5] },
      'El texto abre con el dato de 40 de cada 100 litros, explica que las fugas pequeñas son las que más pierden, cuenta cómo se escuchan con geófonos, presenta las válvulas y su resultado, muestra las conexiones informales y cierra con el ahorro. Ningún párrafo cuenta la historia de un acueducto.',
      { hint: 'Para cada párrafo pregúntate: ¿da un dato, explica, describe un método, presenta una medida o concluye?' }),
    play('donde-buscar', '¿A qué párrafo vuelves para responder?', { doc: AGUA, cards: [
      ['¿Qué es el «agua no contabilizada»?', [1]], ['¿Por qué una fuga pequeña puede durar años?', [2]], ['¿Qué instrumento usan los técnicos?', [3]],
      ['¿Qué pasó en el municipio del Valle?', [4]], ['¿Qué ganan los acueductos al legalizar conexiones?', [5]], ['¿Por qué cerrar fugas ayuda en temporada seca?', [6]],
    ] }, 'Cada pregunta tiene su párrafo: el nombre técnico está en el 1, las fugas que no se ven en el 2, los geófonos en el 3, el resultado de las válvulas en el 4, las conexiones informales en el 5 y los embalses en el 6.',
      { hint: 'Usa el esqueleto del texto: busca en qué párrafo aparece la palabra clave de cada pregunta.' }),
    play('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { doc: AGUA, cards: [
      ['De cada 100 litros potabilizados, cerca de 40 no llegan a las casas.', 0],
      ['Las fugas se buscan de noche, cuando hay menos tráfico.', 0],
      ['Una fuga que no moja la calle puede pasar mucho tiempo sin repararse.', 1],
      ['Con menos agua perdida, una ciudad tiene menos riesgo de racionar.', 1],
      ['Los geófonos son un invento colombiano.', 2],
      ['Las conexiones ilegales causan la mitad de las pérdidas.', 2],
    ] }, 'Los dos primeros están en los párrafos 1 y 3. Que una fuga seca dure mucho se deduce del párrafo 2, y lo del racionamiento, del 6. El origen de los geófonos y la mitad de las pérdidas no aparecen.',
      { hint: 'Busca cada afirmación: si está casi con esas palabras, «lo dice»; si sale de juntar lo que dice, «se deduce»; si no hay de dónde sacarla, «no lo dice».' }),
    play('resume-parrafo', 'Cada párrafo en una frase', { doc: AGUA, paras: [2, 4, 6], options: [
      'Las fugas pequeñas y ocultas son las que más agua pierden.',
      'Bajar la presión en las redes reduce las pérdidas y las roturas.',
      'Cerrar fugas es la manera más barata de tener más agua.',
      'Las grandes rupturas son el principal problema de los acueductos.',
      'Las válvulas suben la presión para que el agua llegue más lejos.',
    ], key: [0, 1, 2] },
      'El párrafo 2 dice que el agua se pierde sobre todo en fugas pequeñas, no en grandes rupturas; el 4, que bajar la presión reduce las pérdidas; el 6, que cerrar fugas es la fuente más barata. Las otras dos frases dicen lo contrario del texto.',
      { hint: 'El resumen de un párrafo tiene que valer para todo el párrafo y no contradecirlo. Cuidado con las frases que invierten un dato.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: AGUA, ask: 'Según el texto, el agua se pierde por estas causas, EXCEPTO:', cards: [
      ['Tubos rotos', [1, 2]], ['Conexiones ilegales', [1, 5]], ['Medidores que marcan menos', [1]], ['La evaporación en los embalses', null],
    ] }, 'Los tubos rotos, las conexiones ilegales y los medidores aparecen en el párrafo 1 (y se amplían en el 2 y el 5). Los embalses se nombran en el 6, pero no como causa de pérdida: la evaporación no aparece.',
      { hint: 'Lleva cada opción al párrafo que la respalda. La que no encuentra casa es la respuesta, aunque nombre algo que sí sale en el texto.' }),
    play('quien-lo-dice', '¿Quién sostiene cada idea?', { doc: AGUA, voices: ['El autor del artículo', 'Marcela Ortiz', 'Los expertos'], cards: [
      ['Distinguir el sonido de una fuga se aprende con la práctica.', 1],
      ['Cerrar las fugas es la fuente de agua más barata que existe.', 2],
      ['Cerca de 40 de cada 100 litros no llegan a una casa.', 0],
      ['Las conexiones improvisadas se rompen con facilidad.', 0],
    ] }, 'La técnica Marcela Ortiz habla del oído que se entrena (párrafo 3); «concluyen los expertos» introduce la idea de la fuente más barata (párrafo 6). Los datos y las conexiones los presenta el autor sin atribuirlos a nadie.',
      { hint: 'Busca las comillas y verbos como «cuenta» o «concluyen»: señalan quién dice cada cosa. Lo que no tiene dueño lo dice el autor.' }),
    mueve('rompe-cambios', 'Manda la pelota al dato que dice el texto', 'El texto dice', [
      ['Una grieta pequeña puede botar al día…', ['más de mil litros', 'unos diez litros', 'un millón de litros'], 0],
      ['Las fugas se escuchan de noche porque…', ['hay menos ruido', 'hace más frío', 'hay más presión'], 0],
      ['En el Valle, bajar la presión redujo…', ['las pérdidas', 'las tarifas', 'los embalses'], 0],
    ], 'El párrafo 2 habla de más de mil litros al día; el 3, de la noche, cuando hay menos uso y menos tráfico; el 4, de una reducción de las pérdidas en una cuarta parte.',
      'Antes de lanzar, ubica el párrafo de cada pregunta: el dato está escrito ahí.'),
  ]);

  const l2 = leccion('icf-lc-literal-2', 'Palabras y referencias', [
    sc(6, 'Muchas preguntas piden el sentido de una palabra **en esa oración**. El diccionario da varias; el texto escoge una.', { title: 'La palabra en su lugar' }),
    sc(7, 'Ejemplo: «el río **arrastra** troncos» es llevar; «él **arrastra** una tristeza» es cargar con algo. Se prueba cada opción dentro de la oración y se queda la que no cambia el sentido.', { title: 'Probar en la oración' }),
    sc(7, 'Palabras como «este», «ella», «lo», «las primeras» o «él» **apuntan** a algo dicho antes. Para saber a qué, se busca hacia atrás lo que concuerda en género, número y sentido.', { title: 'Hilos hacia atrás' }),
    sc(7, 'Los conectores dicen cómo se unen dos ideas: «sin embargo» contrasta, «por eso» saca una consecuencia, «porque» da la causa y «por ejemplo» ilustra.', { title: 'Bisagras entre ideas' }),
    sc(6, 'Los signos también hablan: las comillas citan o presentan un nombre, los paréntesis aclaran y los dos puntos anuncian una explicación.', { title: 'Lo que hacen los signos' }),
  ], [
    play('palabra-a-la-medida', 'La palabra que dice lo mismo en su oración', { doc: SUENO, rounds: [
      { p: 1, before: 'el reloj interno que ', word: 'regula', after: ' el sueño', options: ['controla', 'prohíbe', 'mide', 'acorta'], answer: 0 },
      { p: 2, before: 'una hormona que el cerebro ', word: 'libera', after: ' cuando oscurece', options: ['suelta', 'encierra', 'compra', 'borra'], answer: 0 },
      { p: 6, before: 'no significa ', word: 'justificarlo', after: ' todo', options: ['darle la razón en', 'castigarlo por', 'olvidarlo en', 'medirlo en'], answer: 0 },
    ] }, 'El reloj interno controla el sueño; el cerebro suelta la melatonina al oscurecer; y entender el reloj no es darle la razón en todo a quien se trasnocha.',
      { hint: 'Lee la oración con cada opción puesta: la buena conserva el sentido del texto, aunque haya otras que también sean sinónimos en el diccionario.' }),
    play('hilo-referente', '¿A qué apunta cada palabra?', { doc: SUENO, rounds: [
      { p: 6, text: 'y buscar |soluciones| que trabajen con |ese reloj| y no contra |él|.', from: 5, answer: 3 },
      { p: 2, text: 'Ese reloj depende, entre otras cosas, de |la melatonina|, una hormona que |el cerebro| libera cuando oscurece y que prepara al cuerpo para dormir. En |los niños| |aparece| temprano', from: 7, answer: 1, ask: '¿Qué es lo que «aparece» temprano en los niños? Tira el hilo desde el nudo.' },
    ] }, 'En el párrafo 6, las soluciones deben trabajar con el reloj y no contra «él»: el mismo reloj. En el 2, lo que «aparece» temprano en los niños es la melatonina, la hormona de la que se viene hablando.',
      { hint: 'Busca hacia atrás la palabra que concuerda con la referencia y prueba ponerla en su lugar: la oración debe seguir teniendo sentido.' }),
    play('conector-bisagra', 'Las bisagras del texto', { doc: SUENO, rounds: [
      { a: 'Su mamá cree que es por el celular.', b: 'buena parte de la explicación está en su cuerpo.', options: ['Sin embargo,', 'Por eso,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'En los adolescentes la melatonina llega cerca de las once.', b: 'un joven que se acuesta a las nueve suele quedarse despierto.', options: ['Por eso,', 'Aunque', 'Es decir,', 'En cambio,'], answer: 0 },
      { a: 'Retrasar la entrada mejoró las notas.', b: 'el cambio no es fácil para el transporte y las familias.', options: ['Aun así,', 'Por lo tanto,', 'Además,', 'Es decir,'], answer: 0 },
    ] }, 'La opinión de la mamá choca con la explicación biológica (contraste). La hora de la melatonina es la causa de que el joven no se duerma (consecuencia). Y los buenos resultados conviven con las dificultades (contraste).',
      { hint: 'Mira qué pasa entre las dos ideas: ¿la segunda se opone a la primera, sale de ella o le suma algo?' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: SUENO, rounds: [
      { p: 5, text: 'La luz de las pantallas |(|sobre todo la azul) retrasa la melatonina', options: ['aclara de qué luz se trata', 'cita a un especialista', 'abre una lista de hábitos', 'marca ironía'], answer: 0 },
      { p: 6, text: 'Significa dejar de llamar |«|pereza» a lo que en parte es biología', options: ['marca una palabra de la que el autor se distancia', 'cita una frase textual de Daniela', 'presenta un término científico', 'anuncia una explicación'], answer: 0 },
    ] }, 'El paréntesis precisa cuál luz retrasa más la melatonina. Las comillas de «pereza» señalan la palabra que usan otros y que el autor no acepta del todo.',
      { hint: 'Fíjate en lo que queda dentro del signo y en si el autor lo dice con su voz o con la de otros.' }),
    play('donde-buscar', '¿Dónde está la respuesta?', { doc: SUENO, cards: [
      ['¿A qué hora aparece la melatonina en los niños?', [2]], ['¿Cuántas horas recomiendan dormir a los adolescentes?', [3]],
      ['¿Qué pasó cuando algunos colegios retrasaron la entrada?', [4]], ['¿Por qué conviene apagar el celular antes de dormir?', [5]],
    ] }, 'La hora de la melatonina está en el 2; las horas recomendadas, en el 3; el experimento de los colegios, en el 4; y el consejo del celular, en el 5.',
      { hint: 'Ubica la palabra clave de cada pregunta (melatonina, horas, colegios, celular) y el párrafo donde aparece.' }),
    play('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { doc: SUENO, cards: [
      ['En la adolescencia, el reloj del sueño se corre unas dos horas.', 0],
      ['Un estudiante que entra a las seis y media puede dormir menos de lo recomendado.', 1],
      ['Dormir hasta tarde el domingo empeora el lunes.', 1],
      ['El celular es la principal causa del insomnio juvenil.', 2],
      ['En Colombia ya se retrasó la entrada de los colegios.', 2],
    ] }, 'Lo del reloj está en el párrafo 1. Que entrar temprano quite sueño y que el domingo largo cueste el lunes se deduce de los párrafos 3 y 5. El texto no dice que el celular sea la causa principal (dice lo contrario) ni que Colombia haya cambiado el horario: los colegios del experimento son de otros países.',
      { hint: 'Cuidado con las afirmaciones que exageran o cambian el lugar: compáralas palabra por palabra con el párrafo.' }),
    play('caso-nuevo', 'La idea del texto, en otros casos', { doc: SUENO, principle: 'Antes de juzgar una conducta como un defecto, conviene buscar si tiene una causa en el cuerpo y adaptar la solución a ella.', cards: [
      ['Un profesor que, al ver que un niño con miopía no copia del tablero, lo sienta adelante en vez de regañarlo.', true],
      ['Una empresa que programa las reuniones difíciles en las horas en que su equipo está más despierto.', true],
      ['Un entrenador que castiga a un jugador cansado sin preguntar cuánto durmió.', false],
      ['Una familia que culpa al niño de comer poco sin consultar si tiene una alergia.', false],
    ] }, 'Sentar adelante al niño con miopía y mover las reuniones aplican la idea: buscan la causa y ajustan la solución. Castigar sin preguntar y culpar sin consultar hacen justo lo que el texto critica.',
      { hint: 'Pregúntate en cada caso si alguien buscó primero la causa antes de llamar «defecto» a la conducta.' }),
    mueve('vuela-precios', 'Vuela al sentido que tiene en el texto', 'En el texto', [
      ['«Regula el sueño» quiere decir que lo…', ['controla', 'prohíbe', 'acorta'], 0],
      ['En el párrafo 2, «aparece» se refiere a…', ['la melatonina', 'el cerebro', 'los niños'], 0],
      ['«Sin embargo» en el párrafo 1 marca…', ['un contraste', 'una causa', 'un ejemplo'], 0],
    ], 'Regular es controlar; lo que aparece temprano en los niños es la melatonina; y «sin embargo» opone la opinión de la mamá a la explicación del cuerpo.',
      'Vuelve a la oración de cada pregunta y prueba cada opción en su lugar.'),
  ]);

  const MURALES = {
    id: 'icf-murales', title: 'Las paredes que cuentan el barrio',
    paras: [
      'Hace diez años, la calle principal del barrio era una fila de muros grises con avisos de «se vende» y grafitis sin firma. Hoy, los buses turísticos se detienen allí para que los visitantes fotografíen más de cuarenta murales pintados por artistas del sector. Lo que empezó como una jornada de limpieza organizada por la junta de acción comunal se convirtió en uno de los recorridos más visitados de la ciudad.',
      'Los murales no son decoración al azar. Cada uno cuenta un episodio de la historia del barrio: la llegada de las primeras familias desplazadas del campo, la construcción del acueducto comunitario con trabajo de los propios vecinos, los partidos de fútbol en el potrero que hoy es una cancha. «Pintar es nuestra manera de que no se olvide lo que costó levantar esto», explica Yeison Mosquera, uno de los artistas.',
      'El recorrido trajo beneficios visibles. Abrieron cafeterías y tiendas de recuerdos, varios jóvenes trabajan como guías y algunos artistas reciben encargos de otras ciudades. La junta calcula que unas trescientas personas obtienen hoy algún ingreso relacionado con los visitantes, y que la calle es más segura porque siempre hay gente en ella.',
      'Sin embargo, no todos están contentos. Algunos vecinos se quejan del ruido, de la basura y de los visitantes que toman fotos de sus casas sin pedir permiso. Otros temen que el éxito haga subir los arriendos y que las familias de siempre terminen yéndose, como ha ocurrido en barrios de otras ciudades que se pusieron de moda.',
      'Para evitarlo, la junta propuso reglas: horarios para los recorridos, guías obligatorios del propio barrio y un aporte de cada visitante para mantener los murales y apoyar a las familias con arriendos más altos. La propuesta todavía se discute, pero deja clara una idea: un barrio puede abrir sus paredes al turismo sin dejar de pertenecer a quienes lo construyeron.',
    ],
  };
  const Q = preg(MURALES, 'lectura');
  return mundo('icf-lc-literal', 'Lo que Dice el Texto', 'lectura', [l1, l2], [
    ['icf-lc-literal-1', 'La idea central reúne lo que dicen todos los párrafos, sin quedarse en un detalle.',
      Q('¿Cuál de los siguientes enunciados resume mejor el texto?', ['Los murales atraen muchos turistas, pero la basura es el mayor problema del barrio', 'Un barrio convirtió sus muros en un recorrido turístico que trae beneficios y tensiones, y busca reglas para seguir siendo de sus vecinos', 'Los artistas del barrio reciben encargos de otras ciudades', 'Las juntas de acción comunal organizan jornadas de limpieza'], 1,
        'El texto recorre el origen de los murales, su sentido, sus beneficios, las quejas y la propuesta de reglas. Las demás opciones toman un solo detalle de un párrafo.',
        'El resumen tiene que valer para el principio y el final del texto, no solo para un párrafo.')],
    ['icf-lc-literal-1', 'Para saber la función de un párrafo, mira qué hace frente al anterior.',
      Q('El párrafo 4 cumple la función de:', ['Presentar las dificultades que trajo el éxito del recorrido', 'Explicar el significado de cada mural', 'Contar la historia de las primeras familias', 'Proponer las reglas para los recorridos'], 0,
        '«Sin embargo, no todos están contentos» anuncia el giro: el párrafo enumera el ruido, la basura, las fotos sin permiso y el miedo a los arriendos.',
        'Lee la primera oración del párrafo: indica qué viene después de los beneficios.')],
    ['icf-lc-literal-1', 'En una pregunta EXCEPTO, cada opción se busca en el texto; la que no está es la respuesta.',
      Q('Según el texto, son beneficios del recorrido, EXCEPTO:', ['Nuevas cafeterías y tiendas', 'Trabajo de guías para jóvenes', 'Encargos para los artistas', 'Arriendos más baratos para las familias'], 3,
        'Las tres primeras están en el párrafo 3. Los arriendos aparecen en el párrafo 4, pero como un temor de que suban, no como un beneficio.',
        'Vuelve al párrafo de los beneficios y marca cada opción que encuentres allí.')],
    ['icf-lc-literal-2', 'Una referencia se entiende buscando hacia atrás lo que concuerda con ella.',
      Q('En el párrafo 5, la expresión «para evitarlo» se refiere a evitar que:', ['Los buses turísticos dejen de llegar', 'Las familias de siempre tengan que irse del barrio', 'Los artistas pinten nuevos murales', 'La junta pierda el control de la cancha'], 1,
        'El párrafo anterior termina con el temor de que suban los arriendos y las familias se vayan; las reglas buscan evitar eso.',
        'Lee la última idea del párrafo 4: «lo» recoge lo que se acaba de decir.')],
    ['icf-lc-literal-2', 'El sentido de una palabra se prueba dentro de su oración.',
      Q('En el párrafo 2, la palabra «levantar» significa:', ['Construir con esfuerzo', 'Despertarse temprano', 'Subir un objeto pesado', 'Protestar contra algo'], 0,
        '«Lo que costó levantar esto» se refiere al barrio: construirlo con el trabajo de las familias, como el acueducto comunitario.',
        'Pregúntate qué es «esto» en la cita del artista y prueba cada opción en la oración.')],
    ['icf-lc-literal-2', 'Las comillas con un nombre al lado citan las palabras de una persona.',
      Q('En el párrafo 2, las comillas se usan para:', ['Destacar una palabra que el autor no acepta', 'Presentar el título de un mural', 'Reproducir lo que dice uno de los artistas', 'Indicar una frase en otro idioma'], 2,
        'Después de la cita viene «explica Yeison Mosquera, uno de los artistas»: las comillas reproducen sus palabras.',
        'Mira lo que viene justo después de las comillas: dice quién habla.')],
  ]);
})());
