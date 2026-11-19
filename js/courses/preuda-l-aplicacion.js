// Preuniversitario · Comprensión lectora · mundo 6 «Aplicación y analogía» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): los senderos de deseo de los parques, una idea que sirve para mil casos (aplicar a un caso
// nuevo), y el sistema de defensa del cuerpo explicado como una ciudad con murallas y archivos (analogías). La evaluación usa un
// mecánico que pregunta antes de tocar el carro. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const SENDEROS = {
    id: 'lec-senderos-deseo', title: 'Los caminos que nadie diseñó',
    ficha: { autor: 'Columna de un urbanista', fuente: 'Revista de arquitectura y ciudad', fecha: 'Marzo de 2025' },
    paras: [
      'En casi todos los parques hay uno: un caminito de tierra pelada que cruza el pasto en diagonal, justo al lado del sendero de cemento que los arquitectos dibujaron con tanto cuidado. Nadie lo trazó en un plano. Lo hicieron los pies de cientos de personas que, día tras día, eligieron el camino más corto. Los urbanistas los llaman «senderos de deseo».',
      'Durante décadas, la respuesta de muchas administraciones fue la misma: poner una cerca, sembrar arbustos espinosos o clavar un letrero de «No pise el césped». Casi nunca funcionó. La gente saltaba la cerca, rodeaba los arbustos o simplemente ignoraba el letrero, y al cabo de unos meses el caminito volvía a aparecer, a veces un poco más allá.',
      'Algunos diseñadores decidieron hacer lo contrario. Cuando una universidad estrenaba un campus, por ejemplo, dejaban todo el terreno sembrado de pasto durante el primer año y esperaban. Al final del año, los estudiantes ya habían marcado con sus pasos por dónde querían caminar, y solo entonces se pavimentaban esos trazos. El resultado eran senderos que la gente sí usaba, porque eran los que ya usaba.',
      'La idea va mucho más allá de los parques. Detrás de cada sendero de deseo hay una lección incómoda para quien diseña: la gente no hace lo que uno espera, sino lo que le resulta más fácil o más útil. Se puede pelear contra eso con prohibiciones, o se puede observar primero y diseñar después. Lo segundo suele salir más barato y dura más.',
      'Eso no significa que todo atajo deba volverse camino. Hay senderos que cruzan zonas frágiles, como un humedal o el lugar donde anidan unas aves, y ahí sí hace falta proteger el terreno. Pero incluso en esos casos, quien observa por qué la gente toma el atajo puede ofrecerle otra ruta igual de corta, en vez de limitarse a prohibirle la que ya escogió.',
      'La próxima vez que vea un caminito de tierra en un parque, no lo mire como un daño. Mírelo como un mensaje: alguien, muchas veces, le está diciendo a la ciudad por dónde necesita pasar.',
    ],
  };

  const DEFENSA = {
    id: 'lec-ciudad-defensas', title: 'Una ciudad con murallas y archivos',
    ficha: { autor: 'Artículo de divulgación', fuente: 'Revista de ciencia para colegios', fecha: 'Agosto de 2024' },
    paras: [
      'Explicar cómo se defiende el cuerpo de una infección es difícil, porque intervienen miles de células y sustancias con nombres largos. Por eso muchos profesores recurren a una comparación: el cuerpo es como una ciudad antigua, con murallas, guardias, mensajeros y un archivo donde se guardan los retratos de los enemigos.',
      'La primera defensa es la muralla. La piel y las mucosas de la nariz y la garganta impiden que la mayoría de los microbios entre. Así como una muralla no distingue entre un ladrón y un comerciante, la piel tampoco elige: simplemente cierra el paso. Cuando hay una herida, se abre una brecha en la muralla, y por ahí pueden colarse los invasores.',
      'Detrás de la muralla patrullan los guardias: ciertos glóbulos blancos que recorren la sangre y los tejidos y atacan cualquier cosa que no reconocen como propia. Son rápidos pero poco precisos, como una patrulla que detiene a todo el que parezca sospechoso. Muchas veces el enrojecimiento y la hinchazón alrededor de una herida son la huella de esa pelea.',
      'Si la invasión continúa, entra en acción una defensa más lenta y más precisa. Algunas células fabrican anticuerpos, unas proteínas que encajan en una parte específica del invasor como una llave en su cerradura. Cada anticuerpo sirve para un solo tipo de enemigo, y por eso esta defensa tarda días en organizarse: primero hay que fabricar la llave adecuada.',
      'Lo más asombroso viene después. Cuando la infección termina, el cuerpo conserva células de memoria, una especie de archivo con los retratos de los enemigos ya vencidos. Si el mismo microbio vuelve, la respuesta es mucho más rápida, porque la llave ya existe. En esa memoria se apoyan las vacunas: le muestran al cuerpo el retrato de un enemigo, sin la enfermedad, para que lo archive antes de conocerlo.',
      'Toda comparación tiene límites, y esta también. Una ciudad no fabrica sus guardias según el enemigo que llega, y el cuerpo sí. Pero la imagen ayuda a recordar lo esencial: hay defensas que cierran el paso, otras que atacan sin preguntar y otras que aprenden.',
    ],
  };

  // ---------------- Lección 1 · Aplicar a un caso nuevo ----------------
  setLesson('pu-ap-1', [
    play('caso-nuevo', 'La idea de los senderos, en otros lugares', { doc: SENDEROS, principle: 'Antes de diseñar o de prohibir, conviene observar lo que la gente ya hace y facilitarlo.', cards: [
      ['Una biblioteca que pone enchufes donde los estudiantes ya se sentaban en el piso a cargar el celular.', true],
      ['Un colegio que, al ver que todos se reúnen en la escalera, pone allí bancas y una mesa.', true],
      ['Una aplicación que mueve el botón más usado al lugar donde la gente ya tocaba.', true],
      ['Un conjunto que multa a quien cruce la zona verde, sin preguntar por qué la cruzan.', false],
      ['Una tienda que cambia los precios cada semana sin avisar.', false],
    ] }, 'La biblioteca, el colegio y la aplicación observan primero lo que la gente hace y lo facilitan: el tema cambia, pero la estructura es la misma. La multa es la cerca del párrafo 2, y la tienda no tiene que ver con la idea.',
      { hint: 'No busques parques: busca la misma estructura. ¿Alguien observó lo que la gente ya hacía y le dio forma?' }),
    play('mapa-del-texto', 'Cómo avanza la columna', { doc: SENDEROS, labels: ['presenta el fenómeno', 'cuenta la respuesta que fracasó', 'cuenta la respuesta que funcionó', 'saca la lección general', 'le pone un límite a la idea', 'cierra con una invitación al lector', 'da cifras sobre parques'], key: [0, 1, 2, 3, 4, 5] },
      'La columna va del caso a la idea general: qué son los senderos, qué falló, qué funcionó, qué lección dejan, cuándo no aplica y qué hacer al ver uno. No hay cifras.',
      { hint: 'El párrafo 4 empieza con «La idea va mucho más allá»; el 5, con «Eso no significa». ¿Qué hace cada uno?' }),
    play('balanza-argumento', '¿Pavimentar o prohibir?', { doc: SENDEROS, thesis: 'Es mejor convertir los senderos de deseo en caminos que prohibirlos.', cards: [
      ['Las cercas y los letreros casi nunca funcionaron.', 0],
      ['Los senderos pavimentados después de observar sí se usaban.', 0],
      ['Algunos atajos cruzan zonas frágiles, como un humedal.', 1],
      ['Un estudio halla que pavimentar un atajo hace que aparezcan atajos nuevos por todo el parque.', 1],
      ['Los urbanistas los llaman «senderos de deseo».', null],
    ] }, 'El fracaso de las prohibiciones y el éxito de pavimentar apoyan la tesis. Las zonas frágiles le ponen un límite, y si pavimentar multiplicara los atajos, la idea perdería fuerza. El nombre de los senderos no pesa en ningún lado.',
      { hint: 'Imagina cada oración como cierta: ¿le da la razón a quien quiere pavimentar, a quien quiere prohibir o a ninguno?' }),
    play('lupa-evidencia', 'Lo que dice la columna', { doc: SENDEROS, cards: [
      ['Las prohibiciones casi nunca lograron borrar los atajos.', 0],
      ['En algunos campus se esperó un año antes de pavimentar.', 0],
      ['Un letrero no cambia la ruta que la gente considera más útil.', 1],
      ['El autor desaprueba prohibir sin observar antes.', 1],
      ['Todos los atajos deben convertirse en caminos.', 2],
      ['Los senderos de deseo dañan el pasto para siempre.', 2],
    ] }, 'Las dos primeras están escritas. Que un letrero no cambia la ruta se deduce de que la gente lo ignoraba y el caminito volvía a aparecer; y la postura del autor, de que llama a lo segundo «más barato» y más duradero. El párrafo 5 dice lo contrario de la quinta, y el texto no habla de daños permanentes.',
      { hint: 'Ojo con «todos»: el párrafo 5 pone un límite a la idea.' }),
    play('resume-parrafo', 'Cada párrafo en una frase', { doc: SENDEROS, paras: [2, 3, 4, 5], options: [
      'Prohibir los atajos casi nunca funcionó.',
      'Observar primero y pavimentar después dio senderos que sí se usan.',
      'La gente hace lo más fácil; conviene observarla antes de diseñar.',
      'Hay atajos que se deben proteger, pero aun así se puede ofrecer otra ruta.',
      'Los arquitectos no saben diseñar parques.',
      'Los letreros de «No pise el césped» deben quitarse.',
    ], key: [0, 1, 2, 3] }, 'Los cuatro resúmenes recogen la idea de su párrafo. El autor no ataca a los arquitectos ni pide quitar los letreros: dice que prohibir sin observar no funciona.',
      { hint: 'Descarta los resúmenes que dicen más de lo que dice el autor.' }),
    play('conector-bisagra', 'Las bisagras de la columna', { doc: SENDEROS, rounds: [
      { a: 'Muchas administraciones pusieron cercas, arbustos y letreros.', b: 'casi nunca funcionaron.', options: ['Sin embargo,', 'Por eso,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'Algunos diseñadores decidieron hacer lo contrario.', b: 'dejaban el terreno sembrado de pasto durante el primer año.', options: ['Por ejemplo,', 'Sin embargo,', 'Por lo tanto,', 'Aunque'], answer: 0 },
      { a: 'Hay senderos que cruzan zonas frágiles.', b: 'ahí sí hace falta proteger el terreno.', options: ['Por eso,', 'Aunque', 'Es decir,', 'En cambio,'], answer: 0 },
    ] }, 'El esfuerzo de prohibir choca con su fracaso (contraste). Lo del campus es un caso de «hacer lo contrario» (ejemplo). Y la fragilidad del terreno es la razón para protegerlo (consecuencia).',
      { hint: 'Pregúntate si la segunda idea se opone a la primera, la ilustra con un caso o resulta de ella.' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: SENDEROS, rounds: [
      { p: 1, text: 'Los urbanistas los llaman |«|senderos de deseo».', options: ['marca el nombre técnico que se presenta', 'cita a una persona con nombre propio', 'marca ironía', 'abre una pregunta'], answer: 0 },
      { p: 6, text: 'Mírelo como un mensaje|:| alguien, muchas veces,', options: ['anuncia en qué consiste el mensaje', 'abre una lista', 'cierra una cita', 'marca un cambio de tema'], answer: 0 },
    ] }, 'Las comillas presentan el nombre que usan los urbanistas. Los dos puntos anuncian qué dice el «mensaje» del caminito.',
      { hint: 'Las comillas no siempre citan a una persona: a veces presentan una palabra o un nombre. Mira qué hay dentro.' }),
  ]);

  // ---------------- Lección 2 · Analogías ----------------
  setLesson('pu-ap-2', [
    play('quien-lo-dice', 'Cada parte en su papel', { doc: DEFENSA, ask: 'Lleva cada parte del cuerpo al papel que cumple en la ciudad de la comparación.', voices: ['La muralla', 'Los guardias', 'Las llaves', 'El archivo de retratos'], cards: [
      ['La piel y las mucosas', 0],
      ['Glóbulos blancos que patrullan', 1],
      ['Los anticuerpos', 2],
      ['Las células de memoria', 3],
    ] }, 'La piel cierra el paso como una muralla; los glóbulos blancos patrullan como guardias; los anticuerpos encajan en el invasor como llaves; y las células de memoria guardan a los enemigos como un archivo de retratos.',
      { hint: 'Busca en el texto el «como» de cada comparación.' }),
    play('caso-nuevo', '¿Es la misma relación?', { doc: DEFENSA, principle: 'Una analogía funciona cuando la relación entre A y B es la misma que entre C y D.', ask: '¿Cuáles analogías son correctas según el texto?', cards: [
      ['Piel es a cuerpo como muralla es a ciudad.', true],
      ['Anticuerpo es a invasor como llave es a cerradura.', true],
      ['Célula de memoria es a microbio vencido como retrato archivado es a enemigo.', true],
      ['Herida es a piel como guardia es a ciudad.', false],
      ['Vacuna es a enfermedad como ladrón es a comerciante.', false],
    ] }, 'Las tres primeras conservan la relación del texto (barrera, encaje, memoria). La herida es una brecha en la muralla, no un guardia; y la vacuna no es a la enfermedad lo que un ladrón a un comerciante.',
      { hint: 'Di en voz alta la relación de la primera pareja y prueba si la misma frase sirve para la segunda.' }),
    play('palabra-a-la-medida', 'Palabras del artículo', { doc: DEFENSA, rounds: [
      { p: 1, before: 'Por eso muchos profesores ', word: 'recurren', after: ' a una comparación', options: ['acuden', 'renuncian', 'se oponen', 'vuelven a correr'], answer: 0 },
      { p: 2, before: 'y por ahí pueden ', word: 'colarse', after: ' los invasores', options: ['entrar sin permiso', 'filtrarse como el café', 'salir', 'esconderse'], answer: 0 },
    ] }, 'Recurrir es acudir a algo para resolver un problema. Y los invasores se cuelan: entran sin permiso por la brecha; «colar» el café es otro sentido de la palabra.',
      { hint: 'Lee la frase completa: ¿qué hacen los invasores cuando encuentran una brecha en la muralla?' }),
    play('lupa-evidencia', 'Lo que dice el artículo', { doc: DEFENSA, cards: [
      ['La piel no distingue entre unos microbios y otros.', 0],
      ['Los anticuerpos tardan días en organizarse.', 0],
      ['El cuerpo se defiende mejor de un microbio que ya enfrentó.', 1],
      ['La hinchazón de una herida puede ser una señal de defensa.', 0],
      ['Una persona vacunada se defiende más rápido que una que nunca ha visto el microbio.', 1],
      ['Los glóbulos blancos atacan solo a los microbios que ya conocen.', 2],
      ['Todas las infecciones entran por heridas.', 2],
    ] }, 'Las tres primeras están escritas: la hinchazón es «la huella de esa pelea». La respuesta más rápida ante el mismo microbio permite inferir que el cuerpo se defiende mejor, y que una persona vacunada responde más rápido. Los glóbulos blancos atacan lo que no reconocen como propio, no lo que ya conocen, y las mucosas también son una puerta.',
      { hint: 'Compara cada afirmación con las palabras del texto. ¿Atacan lo conocido o lo que no reconocen?' }),
    play('termometro-tono', 'El tono del artículo', { doc: DEFENSA, rounds: [
      { frag: 'Lo más asombroso viene después.', scale: ['admirado', 'aburrido', 'temeroso', 'irónico'], answer: 0 },
      { frag: 'Toda comparación tiene límites, y esta también.', scale: ['prudente', 'eufórico', 'burlón', 'enojado'], answer: 0 },
    ] }, '«Asombroso» deja ver la admiración del autor por la memoria del cuerpo. Y al final, reconoce que su propia comparación no es perfecta: es prudente.',
      { hint: 'Busca la palabra que delata la actitud en cada fragmento.' }),
    play('mapa-del-texto', 'Cómo se arma la comparación', { doc: DEFENSA, labels: ['presenta la comparación', 'explica la primera barrera', 'explica la defensa rápida', 'explica la defensa precisa', 'explica la memoria y las vacunas', 'señala los límites de la comparación', 'da consejos para no enfermarse'], key: [0, 1, 2, 3, 4, 5] },
      'Cada párrafo desarrolla una parte de la ciudad: la comparación, la muralla, los guardias, las llaves, el archivo y, al final, dónde la comparación deja de servir. No hay consejos de salud.',
      { hint: 'Fíjate en la imagen de la ciudad que aparece en cada párrafo: muralla, guardias, llaves, archivo.' }),
    play('conector-bisagra', 'Las bisagras de la explicación', { doc: DEFENSA, rounds: [
      { a: 'Cada anticuerpo sirve para un solo tipo de enemigo.', b: 'esta defensa tarda días en organizarse.', options: ['Por eso,', 'Aunque', 'En cambio,', 'Por ejemplo,'], answer: 0 },
      { a: 'Si el mismo microbio vuelve, la llave ya existe.', b: 'la respuesta es mucho más rápida.', options: ['Por lo tanto,', 'Sin embargo,', 'Aunque', 'En cambio,'], answer: 0 },
      { a: 'Una ciudad no fabrica sus guardias según el enemigo que llega.', b: 'la imagen ayuda a recordar lo esencial.', options: ['Pero', 'Por lo tanto,', 'Es decir,', 'Además,'], answer: 0 },
    ] }, 'Fabricar una llave para cada enemigo explica la demora (consecuencia), y tener la llave lista explica la rapidez (consecuencia). El límite de la comparación no le quita su utilidad (contraste).',
      { hint: 'En las dos primeras, una idea explica la otra. En la tercera, ¿la segunda idea va en la misma dirección que la primera?' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const MECANICO = {
    id: 'lec-mecanico', title: 'El que adivina cobra dos veces',
    paras: [
      'Don Ramiro, el mecánico de la esquina, tiene una costumbre que desespera a algunos clientes: antes de abrir el capó, les pide que le cuenten, con detalle, cuándo empezó el ruido, si suena en frío o en caliente, si se oye al frenar o al acelerar. Mientras escucha, no toca el carro. «El que adivina cobra dos veces», dice.',
      'Su método tiene una lógica sencilla. Un mismo síntoma puede tener muchas causas: un golpeteo puede venir del motor, de la suspensión o de algo suelto en el baúl. Si el mecánico cambia la primera pieza que se le ocurre, puede acertar, pero también puede gastar el dinero del cliente en una pieza que estaba buena. Preguntar primero reduce las posibilidades antes de gastar un peso.',
      'Los clientes apurados prefieren el taller de enfrente, donde le cambian a uno las pastillas de freno en veinte minutos sin muchas preguntas. Algunos vuelven a la semana con el mismo ruido. Don Ramiro no se alegra: solo saca otra vez su libreta y empieza de nuevo por las preguntas.',
      'Él dice que el oficio le enseñó algo que sirve para todo: el que escucha bien gasta menos. Lo repite cuando sus nietos se pelean, cuando un vecino le pide consejo y hasta cuando va al médico, al que le cuenta sus síntomas con el mismo orden con que le gustaría que le contaran los de un carro.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: MECANICO, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-aplicacion', 'Evaluación · Aplicación y analogía', [
    ['pu-ap-1', 'Aplicar es reconocer la misma estructura en un tema distinto.',
      Q('Una situación que aplica el método de don Ramiro es la de:', ['un técnico que cambia el computador completo apenas falla', 'un profesor que pone el examen sin explicar el tema', 'una médica que pregunta cuándo empezó el dolor antes de pedir exámenes', 'un vendedor que ofrece primero el producto más caro'], 2,
        'La médica, como don Ramiro, pregunta primero para reducir las posibilidades antes de gastar. El técnico hace lo contrario.',
        'Saca primero el principio del texto (preguntar antes de actuar) y busca el caso que lo cumple.')],
    ['pu-ap-1', 'Un caso nuevo puede aplicar la idea del texto o su contrario: hay que distinguirlos.',
      Q('Según la idea del texto, cambiar de inmediato la primera pieza que se le ocurre al mecánico se parece a:', ['tomar un remedio para el dolor de cabeza sin saber de dónde viene', 'leer el manual antes de usar una máquina', 'preguntarle al vecino qué pasó', 'revisar la cuenta antes de pagar'], 0,
        'Tomar un remedio sin saber la causa es actuar antes de averiguar, como cambiar una pieza al azar. Las otras opciones averiguan primero.',
        'Busca la opción que actúa antes de averiguar, igual que el taller de enfrente.')],
    ['pu-ap-1', 'Para predecir qué haría alguien en otra situación, se usa el principio que guía sus actos.',
      Q('Si don Ramiro fuera profesor, ante un estudiante que pierde matemáticas, probablemente:', ['le pondría más tareas de inmediato', 'lo cambiaría de curso', 'le diría que estudie más, sin preguntarle nada', 'le preguntaría en qué temas y desde cuándo se le dificulta'], 3,
        'Su principio es escuchar antes de actuar: primero averiguaría dónde está la dificultad.',
        'Recuerda lo que hace don Ramiro antes de abrir el capó.')],
    ['pu-ap-2', 'En una analogía se compara la relación entre las parejas, no las cosas sueltas.',
      Q('La relación entre «síntoma» y «causa» en el texto es la misma que hay entre:', ['llanta y carro', 'humo y fuego', 'mecánico y taller', 'freno y acelerador'], 1,
        'El síntoma es la señal que deja una causa escondida, como el humo es la señal de un fuego. Llanta y carro es parte y todo; mecánico y taller, persona y lugar; freno y acelerador, opuestos.',
        'Nombra la relación de la primera pareja (¿qué es el síntoma de la causa?) y pruébala en cada opción.')],
    ['pu-ap-2', 'Un refrán puede ser análogo a otro si enseñan lo mismo en oficios distintos.',
      Q('«El que adivina cobra dos veces» es a don Ramiro lo que, para un carpintero, sería el refrán:', ['«Mide dos veces y corta una»', '«Al que madruga, Dios le ayuda»', '«Más vale tarde que nunca»', '«En casa de herrero, cuchillo de palo»'], 0,
        'Los dos refranes enseñan que comprobar antes de actuar evita pagar dos veces por un error.',
        'Pregúntate qué enseña la frase de don Ramiro y busca el refrán que enseña lo mismo.')],
    ['pu-ap-2', 'Una analogía puede llevar la idea del texto a la manera de presentar el examen.',
      Q('Preguntarle al cliente antes de tocar el carro es a don Ramiro lo que, para un buen lector en el examen, es:', ['marcar la primera opción que suena bien', 'dejar en blanco las preguntas difíciles', 'volver al texto antes de marcar una opción', 'leer solo el título'], 2,
        'Volver al texto es reunir la información antes de decidir, como don Ramiro antes de cambiar una pieza. Marcar lo primero que suena bien es adivinar.',
        'Busca la opción en la que el lector averigua antes de decidir.')],
  ]);
});
