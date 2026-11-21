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
      'Esto no quiere decir que reciclar sea inútil. Al contrario: cada kilo que se recupera es un kilo que no llega al río ni al relleno sanitario. El problema no está en reciclar; está, más bien, en creer que con eso basta. El reciclaje es la última de tres tareas, no la primera. Antes vienen reducir lo que compramos y reutilizar lo que ya tenemos.',
      'Por ejemplo, una botella de vidrio retornable puede volver a llenarse decenas de veces antes de romperse, mientras que una de plástico desechable se usa una vez. Del mismo modo, una bolsa de tela que se lleva al mercado durante un año reemplaza cientos de bolsas plásticas, y un frasco que se lleva a la tienda para comprar a granel ahorra un empaque cada semana. Ninguna de estas soluciones necesita una planta de reciclaje.',
      'En conclusión, separar la basura está bien, pero no nos exime de lo más difícil: comprar menos y desechar menos. Reciclar no es el comienzo del camino; antes bien, es lo que queda cuando ya no se pudo reducir ni reutilizar. El mejor residuo, como dicen los ambientalistas, es el que nunca se produce.',
    ],
  };

  const PLAZA = {
    id: 'lec-plaza-modernizada', title: 'La «modernización» de la plaza',
    ficha: { autor: 'Columna de opinión', fuente: 'Periódico de un municipio del oriente antioqueño', fecha: 'Septiembre de 2025' },
    paras: [
      'En marzo, la alcaldía anunció con bombos y platillos la «modernización» de la plaza de mercado: pisos de baldosa blanca, locales con vitrina y un parqueadero de dos pisos. Hubo banda, discursos y una cinta tricolor que cortó el alcalde. Las fotos del proyecto mostraban gente sonriente, frutas brillantes y ningún perro. Seis meses después de la inauguración, la mitad de los vendedores ya no está.',
      'Pongamos un ejemplo. Doña Rubiela vendía hierbas aromáticas —toronjil, limoncillo, ruda— en un puesto de un metro cuadrado que pagaba a diario. El nuevo local, con vitrina y contador de luz, cuesta un arriendo mensual que equivale a lo que ella ganaba en dos meses. Hoy vende en la acera de enfrente, sin techo, y la policía la saca cada tanto por «ocupar el espacio público». Sus clientes de siempre la siguen buscando; los nuevos, los del parqueadero, ni la ven.',
      'Se dirá, con razón, que la plaza vieja tenía problemas serios: el techo goteaba, los baños eran una vergüenza y las ratas se paseaban a plena luz del día. Nadie pide volver a eso, ni defender la suciedad en nombre de la tradición. Pero arreglar un techo no obligaba a cambiar a quienes vivían debajo de él.',
      'Los funcionarios repiten que los vendedores pueden presentarse a una convocatoria para los locales (siempre que tengan cámara de comercio, cuenta bancaria y un fiador). Es decir, pueden presentarse todos, menos los que más lo necesitan. Ninguno de los requisitos tiene que ver con saber vender, ni con los años que cada uno lleva en la plaza, ni con la calidad de lo que ofrece a sus clientes. La alcaldía presume de que hoy llegan más compradores a la plaza; puede ser, pero de poco sirve que lleguen más si ya no encuentran a quién comprarle.',
      'En suma, una plaza no se moderniza cuando cambia de baldosa, sino cuando sirve mejor a quienes la usan. Y la plaza de mercado la usaban, sobre todo, los vendedores pequeños y sus clientes de siempre. Si ellos ya no caben, lo que se hizo no fue una modernización: fue un desalojo con buena iluminación. Una modernización de verdad habría empezado por preguntarles a ellos qué necesitaban.',
    ],
  };

  // ---------------- Lección 1 · Conectores ----------------
  setLesson('pu-cn-1', [
    play('ordena-parrafos', 'Arma el texto otra vez', { doc: RECICLA },
      'Las costuras son conectores: «Las razones son varias» explica el problema anunciado; «Por otra parte» suma otra razón; «Esto no quiere decir» matiza; «Por ejemplo» ilustra lo de reducir y reutilizar, y «En conclusión» cierra.',
      { hint: 'Lee la primera palabra de cada párrafo. «Por otra parte» suma, «Por ejemplo» ilustra y «En conclusión» cierra: cada uno necesita algo antes.' }),
    play('conector-bisagra', 'Las bisagras de la columna', { doc: RECICLA, rounds: [
      { a: 'Nos han enseñado que reciclar es la mejor manera de cuidar el planeta.', b: 'solo una pequeña parte del plástico separado se convierte en un objeto nuevo.', options: ['Sin embargo,', 'Por lo tanto,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'Cada vez que un plástico se recicla pierde calidad,', b: 'una botella rara vez vuelve a ser botella.', options: ['de modo que', 'aunque', 'por ejemplo,', 'sin embargo,'], answer: 0 },
      { a: 'Muchos plásticos mezclan materiales que no se separan.', b: 'cada reciclaje les hace perder calidad.', options: ['Además,', 'En cambio,', 'Por lo tanto,', 'Es decir,'], answer: 0 },
      { a: 'Antes de reciclar vienen reducir y reutilizar.', b: 'una botella retornable se llena decenas de veces.', options: ['Por ejemplo,', 'Sin embargo,', 'Aunque', 'Por lo tanto,'], answer: 0 },
      { a: 'Esto no quiere decir que reciclar sea inútil.', b: 'cada kilo que se recupera es un kilo que no llega al río.', options: ['Al contrario:', 'Sin embargo,', 'Por ejemplo,', 'Es decir,'], answer: 0 },
    ] }, 'Lo que nos enseñaron choca con los datos (contraste). Perder calidad tiene una consecuencia. La mezcla de materiales y la pérdida de calidad son dos razones que se suman. La botella retornable ilustra la idea de reutilizar (ejemplo). Y después de una idea que la autora rechaza («no quiere decir que sea inútil») va un conector que rectifica: pone en su lugar lo que ella sí sostiene, que reciclar sirve. «Sin embargo» no cabe ahí: no hay nada a qué oponerse.',
      { hint: 'Para cada pareja, pregúntate: ¿se oponen, una resulta de la otra, se suman o la segunda ilustra la primera? Si la primera frase niega algo, busca el conector que pone en su lugar lo que el autor sí piensa.' }),
    play('cadena-causas', 'La vida de una botella', { doc: RECICLA, chain: [
      'Una botella de plástico se recicla.',
      'El plástico pierde calidad.',
      'La botella termina convertida en fibra para ropa o en relleno.',
    ], extra: ['El petróleo sube de precio.', 'Una botella de vidrio se llena decenas de veces.'] },
      'El párrafo 2 lo encadena con «de modo que»: cada reciclaje baja la calidad, y por eso una botella rara vez vuelve a ser botella. El texto habla del petróleo barato, no caro, y la botella de vidrio es el ejemplo de reutilizar, no de reciclar.',
      { hint: 'Busca el «de modo que» del párrafo 2: une una causa con su consecuencia.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: RECICLA, ask: 'Según el texto, el reciclaje de plástico tiene estos problemas, EXCEPTO:', cards: [
      ['Algunos empaques mezclan materiales que no se separan', [2]],
      ['El plástico pierde calidad cada vez que se recicla', [2]],
      ['Consume agua y energía', [3]],
      ['Libera gases que enferman a quienes trabajan en las plantas', null],
    ] }, 'Los empaques y la pérdida de calidad están en el párrafo 2; el consumo de agua y energía, en el 3. Los gases no aparecen.',
      { hint: 'Lleva cada problema al párrafo que lo menciona. El que no encuentre lugar es la respuesta.' }),
    play('quien-lo-dice', 'Qué hace cada conector', { doc: RECICLA, ask: 'Lleva cada fragmento de la columna a la relación que marca su conector.', voices: ['Contraste: opone dos ideas que siguen en pie', 'Rectificación: niega una idea y pone otra en su lugar', 'Consecuencia: lo que resulta de lo anterior', 'Adición: suma otra razón', 'Ejemplo: muestra la idea en un caso'], cards: [
      ['Nos enseñaron que reciclar es lo mejor. Sin embargo, los datos cuentan una historia menos cómoda.', 0],
      ['Esto no quiere decir que reciclar sea inútil. Al contrario: cada kilo que se recupera no llega al río.', 1],
      ['El problema no está en reciclar; está, más bien, en creer que con eso basta.', 1],
      ['Reciclar no es el comienzo del camino; antes bien, es lo que queda cuando ya no se pudo reducir.', 1],
      ['Cada vez que un plástico se recicla pierde calidad, de modo que una botella rara vez vuelve a ser botella.', 2],
      ['Además, cada vez que un plástico se recicla pierde calidad.', 3],
      ['Por ejemplo, una botella de vidrio retornable puede volver a llenarse decenas de veces.', 4],
    ] }, 'Con «sin embargo» quedan en pie las dos ideas: lo que nos enseñaron y lo que dicen los datos. «Al contrario», «más bien» y «antes bien» hacen otra cosa: llegan después de una idea que la autora niega («no quiere decir», «no está en», «no es») y ponen en su lugar la que ella sí sostiene. «De modo que» anuncia un resultado, «Además» suma y «Por ejemplo» ilustra.',
      { hint: 'Mira si antes del conector hay una negación. Si la autora rechaza una idea y el conector trae la que la reemplaza, no es un simple contraste.' }),
    play('resume-parrafo', 'La idea de cada párrafo', { doc: RECICLA, paras: [2, 3, 4, 5], options: [
      'Muchos plásticos no se pueden reciclar o pierden calidad al hacerlo.',
      'Reciclar cuesta agua, energía y dinero.',
      'Reciclar sirve, pero va después de reducir y reutilizar.',
      'Reutilizar evita residuos sin necesidad de plantas de reciclaje.',
      'El petróleo barato es la causa de la contaminación.',
      'Las bolsas de tela son mejores que cualquier otra solución.',
    ], key: [0, 1, 2, 3] }, 'Cada resumen recoge la idea central de su párrafo. El petróleo barato explica por qué se recicla menos, no causa toda la contaminación; y la bolsa de tela es solo un ejemplo.',
      { hint: 'Cuidado con los resúmenes que convierten un detalle o un ejemplo en la idea principal.' }),
    play('subraya-prueba', 'La prueba en el texto', { doc: RECICLA, rounds: [
      { claim: 'Que la gente separe la basura no garantiza que el plástico se recicle.', p: 1, answer: 2 },
      { claim: 'Reciclar plástico conviene más o menos según el precio del petróleo.', p: 3, answer: 2 },
    ] }, 'La primera conclusión sale del «Sin embargo» del párrafo 1: solo una pequeña parte de lo que se separa se convierte en algo nuevo. La segunda, de la oración del petróleo barato, que hace más económico fabricar plástico nuevo.',
      { hint: 'Busca la oración que trae el dato o la condición que hace verdadera la conclusión.' }),
  ]);

  // ---------------- Lección 2 · Función de párrafos y signos ----------------
  setLesson('pu-cn-2', [
    play('mapa-del-texto', 'La función de cada párrafo', { doc: PLAZA, labels: ['presenta el hecho con ironía', 'ejemplifica con un caso concreto', 'concede una objeción y la refuta', 'desmonta lo que dicen los funcionarios', 'concluye con la tesis', 'propone volver a la plaza vieja'], key: [0, 1, 2, 3, 4] },
      '«Pongamos un ejemplo» abre el párrafo 2; «Se dirá, con razón» concede una objeción que el «Pero» refuta; «Es decir» desmonta el argumento de los funcionarios; «En suma» concluye. Nadie propone volver a la plaza vieja: el párrafo 3 lo descarta («Nadie pide volver a eso»).',
      { hint: 'Las primeras palabras de cada párrafo anuncian su función: «Pongamos un ejemplo», «Se dirá», «En suma». Revisa también qué dice el párrafo 3 de la plaza vieja.' }),
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
    play('trampa-opcion', 'Cada opción con su trampa', { doc: PLAZA, q: 'Según el autor, ¿por qué la mitad de los vendedores ya no está en la plaza?', options: [
      ['Porque ya no llegan compradores a la plaza modernizada.', 2],
      ['Porque prefirieron la plaza vieja, aunque tuviera goteras y ratas.', 4],
      ['Porque la policía los sacó a todos de la plaza.', 1],
      ['Porque los arriendos y los requisitos de los locales quedaron fuera de su alcance.', 0],
    ] }, 'D es lo que muestran el caso de doña Rubiela y los requisitos del párrafo 4. A dice lo contrario: la alcaldía presume de que llegan más compradores. B mezcla datos ciertos (las goteras y las ratas) con una preferencia que nadie menciona. C dice de más: la policía saca «cada tanto» a doña Rubiela de la acera, no a todos de la plaza. Sobra el sello «El texto no lo dice».',
      { hint: 'Compara cada opción con el ejemplo del párrafo 2 y con los requisitos del 4. Fíjate si dice «todos» donde el texto dice «una».' }),
    play('quien-lo-dice', 'Verbos de función', { doc: PLAZA, ask: 'Las opciones del examen usan estos verbos. Lleva cada frase de la columna a lo que hace en el argumento.', voices: ['Ejemplifica o ilustra: muestra la idea en un caso', 'Concede: acepta algo de la postura contraria', 'Matiza: precisa hasta dónde llega lo que el propio autor sostiene', 'Relativiza: acepta un dato del otro, pero le quita peso', 'Refuta: muestra que una idea no se sostiene', 'Concluye: recoge lo dicho'], cards: [
      ['Pongamos un ejemplo. Doña Rubiela vendía hierbas aromáticas.', 0],
      ['Se dirá, con razón, que la plaza vieja tenía problemas serios.', 1],
      ['Nadie pide volver a eso, ni defender la suciedad en nombre de la tradición.', 2],
      ['Puede ser que lleguen más compradores, pero de poco sirve si ya no encuentran a quién comprarle.', 3],
      ['Pero arreglar un techo no obligaba a cambiar a quienes vivían debajo de él.', 4],
      ['Es decir, pueden presentarse todos, menos los que más lo necesitan.', 4],
      ['En suma, una plaza no se moderniza cuando cambia de baldosa.', 5],
    ] }, 'Doña Rubiela ilustra la idea. «Se dirá, con razón» concede que la plaza vieja estaba mal. «Nadie pide volver a eso» no concede nada nuevo (la concesión ya se hizo en la frase anterior): matiza la crítica del propio autor, aclara que no defiende la suciedad. Lo de los compradores relativiza: el autor no niega el dato de la alcaldía («puede ser»), pero muestra que pesa menos de lo que parece. El «Pero» refuta la objeción, y «Es decir» desmonta lo que dicen los funcionarios: la convocatoria no está abierta a todos. «En suma» concluye.',
      { hint: 'Pregúntate de quién es la idea que se limita. Si el autor precisa hasta dónde llega lo suyo, matiza; si acepta un dato del otro lado y le quita importancia, relativiza; si se lo quita del todo, refuta.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const LLUVIA = {
    id: 'lec-cosechar-lluvia', title: 'Cosechar la lluvia',
    paras: [
      'En La Guajira llueve poco, pero cuando llueve, llueve fuerte. Por eso, desde hace mucho tiempo, las comunidades wayuu construyen jagüeyes: depresiones en la tierra que recogen el agua de los aguaceros y la guardan para los meses secos. Sin embargo, el agua de un jagüey se evapora rápido y se ensucia con facilidad.',
      'Algunas escuelas rurales han probado otra solución: canaletas en los techos que llevan el agua a tanques cerrados. Un techo de cien metros cuadrados, por ejemplo, puede recoger miles de litros en una sola temporada de lluvias. Además, como el tanque está tapado, el agua llega más limpia y no se pierde por evaporación. Esto no significa que haya que tapar los jagüeyes. Al contrario: donde hay tanque, el jagüey queda libre para los animales y los cultivos.',
      'Es cierto que un tanque cuesta más que un jagüey y que no todas las casas tienen un techo grande. No obstante, varias familias pueden compartir el tanque de la escuela, y el costo se reparte.',
      'En suma, cosechar la lluvia no reemplaza un acueducto, pero puede ser la diferencia entre tener agua o no tenerla durante la sequía.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: LLUVIA, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-conectores', 'Evaluación · Conectores y función de partes', [
    ['pu-cn-1', 'Después de una idea que el autor rechaza («Esto no significa que…»), «al contrario» rectifica: pone en su lugar lo que el autor sí sostiene.',
      Q('En el párrafo 2, «Al contrario» introduce:', ['un problema de los tanques que el autor no había mencionado', 'lo que el autor sí sostiene sobre los jagüeyes, en lugar de lo que acaba de rechazar', 'una consecuencia de que el agua del jagüey se evapore tan rápido', 'un ejemplo de las escuelas rurales que construyen canaletas'], 1,
        'Antes, el autor rechaza una idea: que haya que tapar los jagüeyes. «Al contrario» trae la idea que la reemplaza: los jagüeyes siguen sirviendo, ahora para los animales y los cultivos. No opone dos datos: corrige una lectura equivocada.',
        'Lee la oración anterior al conector: ¿qué idea niega el autor? Lo que sigue a «Al contrario» es lo que pone en su lugar.')],
    ['pu-cn-1', 'Un conector de contraste anuncia una idea que se opone o le pone un límite a la anterior.',
      Q('En el párrafo 1, «Sin embargo» introduce:', ['un ejemplo de cómo se construye un jagüey', 'una limitación de los jagüeyes', 'una consecuencia de que llueva tan fuerte', 'la conclusión de todo el texto sobre el agua'], 1,
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
      Q('La función del párrafo 3 es:', ['presentar una objeción y responderla', 'dar un ejemplo de una escuela que usa tanques', 'introducir el tema de la sequía en La Guajira', 'concluir que el jagüey es la mejor solución'], 0,
        'Reconoce dos desventajas del tanque («Es cierto que…») y las responde con «No obstante»: compartir el tanque reparte el costo.',
        'Fíjate en cómo empieza el párrafo y en el conector que viene después.')],
    ['pu-cn-2', 'Los conectores «en suma», «en conclusión» y «en fin» anuncian un cierre.',
      Q('El párrafo 4 cumple la función de:', ['contraargumentar', 'ejemplificar', 'concluir', 'introducir'], 2,
        '«En suma» anuncia la conclusión: la cosecha de lluvia no reemplaza un acueducto, pero ayuda en la sequía.',
        'Mira la primera expresión del párrafo.')],
    ['pu-cn-2', 'Conceder es aceptar una parte de la postura contraria; relativizar, mostrar que pesa menos de lo que parece.',
      Q('En el párrafo 3, el autor:', ['refuta con datos la idea de que un tanque cueste más que un jagüey', 'concede dos desventajas del tanque y luego les quita peso', 'ejemplifica cómo se construye un jagüey', 'concluye que el jagüey es mejor que el tanque'], 1,
        '«Es cierto que…» acepta que el tanque es más caro y que no todas las casas tienen techo grande; «No obstante» les quita peso: el tanque se comparte y el costo se reparte. No niega que cueste más.',
        'Fíjate en si el autor niega la desventaja o la acepta y luego dice por qué no es tan grave.')],
    ['pu-cn-2', 'Matizar es precisar hasta dónde llega lo que se afirma, sin cambiar de postura.',
      Q('Con «cosechar la lluvia no reemplaza un acueducto», el autor:', ['refuta a quienes piden construir acueductos en La Guajira', 'concede que cosechar la lluvia no sirve', 'matiza el alcance de la solución que defiende', 'ilustra cómo funciona un acueducto'], 2,
        'Sigue defendiendo la cosecha de lluvia («puede ser la diferencia»), pero precisa hasta dónde llega: no es un acueducto. Eso es matizar.',
        'Lee la frase completa del párrafo 4: después del «pero», ¿el autor abandona su propuesta o la mantiene?')],
    ['pu-cn-2', 'Los dos puntos pueden anunciar una definición, una lista o una explicación.',
      Q('Los dos puntos en «jagüeyes: depresiones en la tierra que recogen el agua…» sirven para:', ['introducir una definición de jagüey', 'citar las palabras de las comunidades wayuu', 'enumerar las escuelas que recogen la lluvia', 'marcar ironía frente a la palabra jagüey'], 0,
        'Lo que sigue a los dos puntos explica qué es un jagüey.',
        'Lee lo que viene después de los dos puntos: ¿qué te dice de la palabra anterior?')],
  ]);
});
