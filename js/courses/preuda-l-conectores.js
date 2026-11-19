// Preuniversitario · Comprensión lectora · mundo 8 «Conectores y función de partes» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): una columna sobre el reciclaje llena de «sin embargo», «además», «de modo que», «por ejemplo»
// y «en conclusión» (conectores), y otra sobre la «modernización» de una plaza de mercado con párrafos que ejemplifican,
// contraargumentan y concluyen, y con comillas irónicas, rayas y paréntesis (función de párrafos y signos). La evaluación usa un
// texto sobre la cosecha de lluvia en La Guajira. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const RECICLA = {
    id: 'lec-reciclar-no-basta', title: 'Reciclar no es suficiente',
    ficha: { autor: 'Columna de una ingeniera ambiental', fuente: 'Revista de ciencia y sociedad', fecha: 'Junio de 2025' },
    paras: [
      'Durante años nos han enseñado que reciclar es la mejor manera de cuidar el planeta. Separamos las botellas, lavamos los envases y los llevamos al punto ecológico con la conciencia tranquila. Sin embargo, los datos cuentan una historia menos cómoda: en muchos países, solo una pequeña parte del plástico que se separa termina convertida en un objeto nuevo.',
      'Las razones son varias. En primer lugar, muchos plásticos no se pueden reciclar porque mezclan materiales que no se separan, como los empaques de papas fritas, que llevan una capa metálica por dentro. Además, cada vez que un plástico se recicla pierde calidad, de modo que una botella rara vez vuelve a ser botella: suele convertirse en fibra para ropa o en relleno, y ahí termina su vida.',
      'Por otra parte, reciclar tiene costos que casi nunca vemos. Hay que transportar el material, lavarlo, triturarlo y fundirlo, y todo eso consume agua y energía. Por eso, cuando el petróleo está barato, a muchas empresas les sale más económico fabricar plástico nuevo que comprar el reciclado. Y si el material llega sucio o mezclado, buena parte termina de todos modos en el relleno sanitario.',
      'Esto no quiere decir que reciclar sea inútil. Al contrario: cada kilo que se recupera es un kilo que no llega al río ni al relleno sanitario. Lo que quiere decir es que el reciclaje es la última de tres tareas, no la primera. Antes vienen reducir lo que compramos y reutilizar lo que ya tenemos.',
      'Por ejemplo, una botella de vidrio retornable puede volver a llenarse decenas de veces antes de romperse, mientras que una de plástico desechable se usa una vez. Del mismo modo, una bolsa de tela que se lleva al mercado durante un año reemplaza cientos de bolsas plásticas, y un frasco que se lleva a la tienda para comprar a granel ahorra un empaque cada semana. Ninguna de estas soluciones necesita una planta de reciclaje.',
      'En conclusión, separar la basura está bien, pero no nos exime de lo más difícil: comprar menos y desechar menos. El mejor residuo, como dicen los ambientalistas, es el que nunca se produce.',
    ],
  };

  const PLAZA = {
    id: 'lec-plaza-modernizada', title: 'La «modernización» de la plaza',
    ficha: { autor: 'Columna de opinión', fuente: 'Periódico de un municipio del oriente antioqueño', fecha: 'Septiembre de 2025' },
    paras: [
      'En marzo, la alcaldía anunció con bombos y platillos la «modernización» de la plaza de mercado: pisos de baldosa blanca, locales con vitrina y un parqueadero de dos pisos. Hubo banda, discursos y una cinta tricolor que cortó el alcalde. Las fotos del proyecto mostraban gente sonriente, frutas brillantes y ningún perro. Seis meses después de la inauguración, la mitad de los vendedores ya no está.',
      'Pongamos un ejemplo. Doña Rubiela vendía hierbas aromáticas —toronjil, limoncillo, ruda— en un puesto de un metro cuadrado que pagaba a diario. El nuevo local, con vitrina y contador de luz, cuesta un arriendo mensual que equivale a lo que ella ganaba en dos meses. Hoy vende en la acera de enfrente, sin techo, y la policía la saca cada tanto por «ocupar el espacio público». Sus clientes de siempre la siguen buscando; los nuevos, los del parqueadero, ni la ven.',
      'Se dirá, con razón, que la plaza vieja tenía problemas serios: el techo goteaba, los baños eran una vergüenza y las ratas se paseaban a plena luz del día. Nadie pide volver a eso, ni defender la suciedad en nombre de la tradición. Pero arreglar un techo no obligaba a cambiar a quienes vivían debajo de él.',
      'Los funcionarios repiten que los vendedores pueden presentarse a una convocatoria para los locales (siempre que tengan cámara de comercio, cuenta bancaria y un fiador). Es decir, pueden presentarse todos, menos los que más lo necesitan. Ninguno de los requisitos tiene que ver con saber vender, ni con los años que cada uno lleva en la plaza, ni con la calidad de lo que ofrece a sus clientes.',
      'En suma, una plaza no se moderniza cuando cambia de baldosa, sino cuando sirve mejor a quienes la usan. Y la plaza de mercado la usaban, sobre todo, los vendedores pequeños y sus clientes de siempre. Si ellos ya no caben, lo que se hizo no fue una modernización: fue un desalojo con buena iluminación. Una modernización de verdad habría empezado por preguntarles a ellos qué necesitaban.',
    ],
  };

  // ---------------- Lección 1 · Conectores ----------------
  setLesson('pu-cn-1', [
    play('conector-bisagra', 'Las bisagras de la columna', { doc: RECICLA, rounds: [
      { a: 'Nos han enseñado que reciclar es la mejor manera de cuidar el planeta.', b: 'solo una pequeña parte del plástico separado se convierte en un objeto nuevo.', options: ['Sin embargo,', 'Por lo tanto,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'Cada vez que un plástico se recicla pierde calidad,', b: 'una botella rara vez vuelve a ser botella.', options: ['de modo que', 'aunque', 'por ejemplo,', 'sin embargo,'], answer: 0 },
      { a: 'Muchos plásticos mezclan materiales que no se separan.', b: 'cada reciclaje les hace perder calidad.', options: ['Además,', 'En cambio,', 'Por lo tanto,', 'Es decir,'], answer: 0 },
      { a: 'Antes de reciclar vienen reducir y reutilizar.', b: 'una botella retornable se llena decenas de veces.', options: ['Por ejemplo,', 'Sin embargo,', 'Aunque', 'Por lo tanto,'], answer: 0 },
    ] }, 'Lo que nos enseñaron choca con los datos (contraste). Perder calidad tiene una consecuencia. La mezcla de materiales y la pérdida de calidad son dos razones que se suman. Y la botella retornable ilustra la idea de reutilizar (ejemplo).',
      { hint: 'Para cada pareja, pregúntate: ¿se oponen, una resulta de la otra, se suman o la segunda ilustra la primera?' }),
    play('mapa-del-texto', 'Lo que hace cada párrafo', { doc: RECICLA, labels: ['plantea una creencia y la objeta', 'da razones técnicas', 'agrega los costos', 'aclara para no ser malinterpretado', 'ejemplifica', 'concluye', 'cuenta la historia del plástico'], key: [0, 1, 2, 3, 4, 5] },
      'Los conectores del comienzo de cada párrafo anuncian su función: «Sin embargo» objeta, «En primer lugar» y «Además» dan razones, «Por otra parte» agrega, «Esto no quiere decir» aclara, «Por ejemplo» ilustra y «En conclusión» cierra.',
      { hint: 'Lee el conector con que empieza o en que gira cada párrafo: casi siempre anuncia lo que hace.' }),
    play('lupa-evidencia', 'Lo que dice la columna', { doc: RECICLA, cards: [
      ['Los empaques de papas fritas llevan una capa metálica.', 0],
      ['Reciclar consume agua y energía.', 0],
      ['El precio del petróleo influye en cuánto plástico se recicla.', 1],
      ['La autora considera más útil la botella de vidrio retornable que la de plástico desechable.', 1],
      ['La autora considera que reciclar es inútil.', 2],
      ['Una botella de plástico reciclada vuelve a ser botella muchas veces.', 2],
    ] }, 'Las dos primeras están escritas. Si con petróleo barato las empresas prefieren plástico nuevo, el precio influye en el reciclaje; y la preferencia por el vidrio retornable sale de que se llena «decenas de veces» y no necesita planta de reciclaje. La autora dice expresamente que reciclar no es inútil, y que una botella «rara vez» vuelve a ser botella.',
      { hint: 'Un conector como «Esto no quiere decir que…» desmiente una lectura equivocada. No la tomes por la idea de la autora.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: RECICLA, ask: 'Según el texto, el reciclaje de plástico tiene estos problemas, EXCEPTO:', cards: [
      ['Algunos empaques mezclan materiales que no se separan', [2]],
      ['El plástico pierde calidad cada vez que se recicla', [2]],
      ['Consume agua y energía', [3]],
      ['Libera gases que enferman a quienes trabajan en las plantas', null],
    ] }, 'Los empaques y la pérdida de calidad están en el párrafo 2; el consumo de agua y energía, en el 3. Los gases no aparecen.',
      { hint: 'Lleva cada problema al párrafo que lo menciona. El que no encuentre lugar es la respuesta.' }),
    play('signos-que-hablan', 'Lo que anuncian los dos puntos', { doc: RECICLA, rounds: [
      { p: 2, text: 'una botella rara vez vuelve a ser botella|:| suele convertirse en fibra', options: ['anuncia lo que pasa en su lugar', 'abre una cita', 'abre una lista de países', 'marca una pregunta'], answer: 0 },
      { p: 4, text: 'Al contrario|:| cada kilo que se recupera', options: ['anuncia la razón que sostiene lo dicho', 'abre un ejemplo extranjero', 'introduce una pregunta', 'cita a los ambientalistas'], answer: 0 },
    ] }, 'Los primeros dos puntos anuncian en qué termina la botella. Los segundos, la razón por la que reciclar no es inútil.',
      { hint: 'Los dos puntos anuncian algo: una explicación, una lista o una cita. Mira qué viene después.' }),
    play('resume-parrafo', 'La idea de cada párrafo', { doc: RECICLA, paras: [2, 3, 4, 5], options: [
      'Muchos plásticos no se pueden reciclar o pierden calidad al hacerlo.',
      'Reciclar cuesta agua, energía y dinero.',
      'Reciclar sirve, pero va después de reducir y reutilizar.',
      'Reutilizar evita residuos sin necesidad de plantas de reciclaje.',
      'El petróleo barato es la causa de la contaminación.',
      'Las bolsas de tela son mejores que cualquier otra solución.',
    ], key: [0, 1, 2, 3] }, 'Cada resumen recoge la idea central de su párrafo. El petróleo barato explica por qué se recicla menos, no causa toda la contaminación; y la bolsa de tela es solo un ejemplo.',
      { hint: 'Cuidado con los resúmenes que convierten un detalle o un ejemplo en la idea principal.' }),
    play('palabra-a-la-medida', 'Palabras de la columna', { doc: RECICLA, rounds: [
      { p: 6, before: 'pero no nos ', word: 'exime', after: ' de lo más difícil', options: ['libra', 'acusa', 'obliga', 'acerca'], answer: 0 },
      { p: 2, before: 'de modo que una botella ', word: 'rara vez', after: ' vuelve a ser botella', options: ['pocas veces', 'nunca', 'siempre', 'de forma extraña'], answer: 0 },
    ] }, 'Eximir es librar de una obligación: separar no nos libra de comprar menos. Y «rara vez» es pocas veces, no nunca.',
      { hint: 'Cuidado con el alcance: «rara vez» no es lo mismo que «nunca».' }),
  ]);

  // ---------------- Lección 2 · Función de párrafos y signos ----------------
  setLesson('pu-cn-2', [
    play('mapa-del-texto', 'La función de cada párrafo', { doc: PLAZA, labels: ['presenta el hecho con ironía', 'da un ejemplo concreto', 'reconoce una objeción y la responde', 'muestra una contradicción', 'concluye con la tesis', 'describe el parqueadero'], key: [0, 1, 2, 3, 4] },
      '«Pongamos un ejemplo» abre el párrafo 2; «Se dirá, con razón» anuncia una objeción que el «Pero» responde; «Es decir» deja ver una contradicción; «En suma» concluye.',
      { hint: 'Las primeras palabras de cada párrafo anuncian su función: «Pongamos un ejemplo», «Se dirá», «En suma».' }),
    play('signos-que-hablan', 'Comillas, rayas y paréntesis', { doc: PLAZA, rounds: [
      { p: 1, text: 'la |«|modernización» de la plaza de mercado', options: ['marca ironía: el autor duda de que sea una modernización', 'cita a un vendedor', 'marca un título oficial que el autor respeta', 'encierra una palabra extranjera'], answer: 0 },
      { p: 2, text: 'hierbas aromáticas |—|toronjil, limoncillo, ruda—', options: ['abre un inciso con ejemplos', 'marca el turno de un diálogo', 'anuncia una conclusión', 'cita a doña Rubiela'], answer: 0 },
      { p: 4, text: 'una convocatoria para los locales |(|siempre que tengan', options: ['abre una aclaración con las condiciones', 'abre una cita', 'marca un ejemplo extranjero', 'indica una pregunta'], answer: 0 },
    ] }, 'Las comillas de «modernización» son irónicas: el autor sostiene que fue un desalojo. La raya abre ejemplos de hierbas. El paréntesis guarda las condiciones, que en el fondo son lo más importante.',
      { hint: 'Lee el final de la columna para saber si el autor cree en la palabra entre comillas.' }),
    play('conector-bisagra', 'Bisagras del argumento', { doc: PLAZA, rounds: [
      { a: 'La plaza vieja tenía problemas serios.', b: 'arreglar un techo no obligaba a cambiar a quienes vivían debajo de él.', options: ['Pero', 'Por eso,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'Pueden presentarse quienes tengan cámara de comercio, cuenta bancaria y fiador.', b: 'pueden presentarse todos, menos los que más lo necesitan.', options: ['Es decir,', 'Sin embargo,', 'Además,', 'Porque'], answer: 0 },
      { a: 'El arriendo equivale a lo que ella ganaba en dos meses.', b: 'hoy vende en la acera de enfrente.', options: ['Por eso,', 'Aunque', 'Es decir,', 'Además,'], answer: 0 },
    ] }, 'El autor reconoce los problemas y luego los separa del desalojo (contraste). Explica con otras palabras lo que significan los requisitos (aclaración). Y el arriendo impagable explica por qué doña Rubiela está en la acera (consecuencia).',
      { hint: 'Pregúntate si la segunda idea responde, repite con otras palabras o resulta de la primera.' }),
    play('termometro-tono', 'El tono de la columna', { doc: PLAZA, rounds: [
      { frag: 'Las fotos del proyecto mostraban gente sonriente, frutas brillantes y ningún perro.', scale: ['burlón', 'admirado', 'técnico', 'asustado'], answer: 0 },
      { frag: 'Si ellos ya no caben, lo que se hizo no fue una modernización: fue un desalojo con buena iluminación.', scale: ['irónico', 'neutral', 'eufórico', 'temeroso'], answer: 0 },
    ] }, '«Ningún perro» se burla de unas fotos demasiado perfectas. Y «un desalojo con buena iluminación» es ironía: dice algo bonito para criticar algo grave.',
      { hint: 'Busca el detalle que no encaja con un elogio: ¿por qué mencionar que no había perros?' }),
    play('balanza-argumento', '¿Desalojo o modernización?', { doc: PLAZA, thesis: 'La modernización sacó de la plaza a los vendedores que más la necesitaban.', cards: [
      ['El nuevo arriendo equivale a dos meses de ganancia de doña Rubiela.', 0],
      ['Los requisitos de la convocatoria dejan por fuera a los vendedores pequeños.', 0],
      ['La mitad de los vendedores ya no está.', 0],
      ['Un censo muestra que los vendedores que se fueron consiguieron locales mejores por su cuenta.', 1],
      ['El techo de la plaza vieja goteaba.', null],
    ] }, 'El arriendo, los requisitos y la salida de la mitad apoyan la tesis. Si los que se fueron hubieran mejorado por su cuenta, no habría desalojo. El techo explica por qué había que arreglar la plaza, pero no dice quién se quedó.',
      { hint: 'Fíjate en que la tesis habla de quiénes salieron y por qué. ¿Qué dice cada oración sobre eso?' }),
    play('hilo-referente', '¿A quién se refiere?', { doc: PLAZA, rounds: [
      { p: 5, text: 'Y |la plaza de mercado| la usaban, sobre todo, |los vendedores pequeños y sus clientes de siempre|. Si |ellos| ya no caben', from: 5, answer: 3 },
      { p: 2, text: '|Doña Rubiela| vendía hierbas aromáticas —toronjil, limoncillo, ruda— en |un puesto de un metro cuadrado| que pagaba a diario. |El nuevo local|, con vitrina y contador de luz, cuesta un arriendo mensual que equivale a lo que |ella|', from: 7, answer: 1 },
    ] }, '«Ellos» son los vendedores pequeños y sus clientes: los que ya no caben. Y «ella» es doña Rubiela, la única mujer nombrada: es quien ganaba en dos meses lo que hoy cuesta el arriendo.',
      { hint: 'En el primero, busca hacia atrás un grupo de personas en plural; en el segundo, quién podía ganar dinero.' }),
    play('donde-buscar', 'Cada función en su lugar', { doc: PLAZA, cards: [
      ['¿Dónde se reconoce lo que estaba mal en la plaza vieja?', [3]], ['¿Dónde está el ejemplo de una vendedora?', [2]],
      ['¿Dónde está la conclusión del autor?', [5]], ['¿Qué requisitos pide la convocatoria?', [4]], ['¿Qué mostraban las fotos del proyecto?', [1]],
    ] }, 'El hecho (1), el ejemplo (2), la objeción (3), la contradicción de los requisitos (4) y la conclusión (5).',
      { hint: 'Si ya sabes la función de cada párrafo, sabes dónde buscar.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const LLUVIA = {
    id: 'lec-cosechar-lluvia', title: 'Cosechar la lluvia',
    paras: [
      'En La Guajira llueve poco, pero cuando llueve, llueve fuerte. Por eso, desde hace mucho tiempo, las comunidades wayuu construyen jagüeyes: depresiones en la tierra que recogen el agua de los aguaceros y la guardan para los meses secos. Sin embargo, el agua de un jagüey se evapora rápido y se ensucia con facilidad.',
      'Algunas escuelas rurales han probado otra solución: canaletas en los techos que llevan el agua a tanques cerrados. Un techo de cien metros cuadrados, por ejemplo, puede recoger miles de litros en una sola temporada de lluvias. Además, como el tanque está tapado, el agua llega más limpia y no se pierde por evaporación.',
      'Es cierto que un tanque cuesta más que un jagüey y que no todas las casas tienen un techo grande. No obstante, varias familias pueden compartir el tanque de la escuela, y el costo se reparte.',
      'En suma, cosechar la lluvia no reemplaza un acueducto, pero puede ser la diferencia entre tener agua o no tenerla durante la sequía.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: LLUVIA, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-conectores', 'Evaluación · Conectores y función de partes', [
    ['pu-cn-1', 'Un conector de contraste anuncia una idea que se opone o le pone un límite a la anterior.',
      Q('En el párrafo 1, «Sin embargo» introduce:', ['un ejemplo de jagüey', 'una limitación de los jagüeyes', 'una consecuencia de la lluvia', 'la conclusión del texto'], 1,
        'Después de explicar para qué sirven los jagüeyes, «Sin embargo» presenta sus problemas: el agua se evapora y se ensucia.',
        'Mira qué dice el texto de los jagüeyes antes y después del conector.')],
    ['pu-cn-1', 'Dos conectores son intercambiables si establecen la misma relación.',
      Q('«Además» (párrafo 2) puede reemplazarse, sin cambiar el sentido, por:', ['En cambio', 'Por lo tanto', 'Aunque', 'Asimismo'], 3,
        '«Además» suma una ventaja más; «asimismo» también suma. Los otros marcan contraste, consecuencia o concesión.',
        'Pregúntate qué relación marca «Además»: ¿suma, opone o concluye?')],
    ['pu-cn-1', '«No obstante» es un conector de contraste, como «sin embargo».',
      Q('«No obstante» (párrafo 3) tiene el mismo valor que:', ['por eso', 'sin embargo', 'por ejemplo', 'es decir'], 1,
        'Introduce una respuesta que se opone a la desventaja dicha antes: es contraste, igual que «sin embargo».',
        'Lee lo que hay antes (una desventaja) y lo que viene después (una salida).')],
    ['pu-cn-2', 'Un párrafo que empieza con «Es cierto que…» suele reconocer una objeción para luego responderla.',
      Q('La función del párrafo 3 es:', ['presentar una objeción y responderla', 'dar un ejemplo', 'introducir el tema', 'concluir'], 0,
        'Reconoce dos desventajas del tanque («Es cierto que…») y las responde con «No obstante»: compartir el tanque reparte el costo.',
        'Fíjate en cómo empieza el párrafo y en el conector que viene después.')],
    ['pu-cn-2', 'Los conectores «en suma», «en conclusión» y «en fin» anuncian un cierre.',
      Q('El párrafo 4 cumple la función de:', ['contraargumentar', 'ejemplificar', 'concluir', 'introducir'], 2,
        '«En suma» anuncia la conclusión: la cosecha de lluvia no reemplaza un acueducto, pero ayuda en la sequía.',
        'Mira la primera expresión del párrafo.')],
    ['pu-cn-2', 'Los dos puntos pueden anunciar una definición, una lista o una explicación.',
      Q('Los dos puntos en «jagüeyes: depresiones en la tierra que recogen el agua…» sirven para:', ['introducir una definición de jagüey', 'citar a los wayuu', 'enumerar escuelas', 'marcar ironía'], 0,
        'Lo que sigue a los dos puntos explica qué es un jagüey.',
        'Lee lo que viene después de los dos puntos: ¿qué te dice de la palabra anterior?')],
  ]);
});
