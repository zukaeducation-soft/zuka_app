// Preuniversitario · Comprensión lectora · mundo 5 «Vocabulario en contexto» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): una huerta escolar con palabras que cambian de sentido según la frase (sinónimos), una planta
// de secado de café donde «planta», «banco», «nota», «salvar» y «tiempo» significan otra cosa (polisemia), el testimonio de un
// primer semestre lleno de colombianismos (frases hechas) y una cueva de guácharos con palabras que se entienden por sus piezas
// (prefijos y raíces). La evaluación usa la crónica de un remendón. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const HUERTA = {
    id: 'lec-huerta-colegio', title: 'Una huerta en el patio de atrás',
    ficha: { autor: 'Nota del periódico escolar', fuente: 'Gaceta de un colegio público de Envigado', fecha: 'Noviembre de 2025' },
    paras: [
      'Hace tres años, el patio de atrás del colegio Simón Bolívar era un terreno árido donde solo crecían piedras y bolsas de papas fritas. Los estudiantes de décimo lo miraban desde la ventana del laboratorio y, un día, la profesora de biología les propuso convertirlo en una huerta. La idea parecía un chiste: la tierra estaba tan dura que había que romperla con barra.',
      'El primer semestre fue de pura preparación. Los muchachos recogieron cascarones de huevo, borra de café y hojas secas en sus casas, y armaron una compostera al lado de la cancha. Tardó cuatro meses en dar abono, y durante ese tiempo más de uno se cansó de revolver una montaña que olía a cebolla podrida. Pero cuando por fin la mezclaron con la tierra del patio, el suelo cambió de color: se volvió oscuro, suelto y húmedo.',
      'Hoy la huerta tiene doce eras de lechuga, cilantro, tomate y frijol, y una cosecha sólida que alcanza para el restaurante escolar dos veces por semana. Los estudiantes llevan un registro de cada siembra: la fecha, la semilla, cuánta agua recibió y qué plagas aparecieron. Con esos datos han aprendido más estadística, dice el profesor de matemáticas, que con todos los ejercicios del libro.',
      'No todo ha salido bien. El año pasado una plaga de babosas arrasó con las lechugas en una sola semana, y una sequía larga obligó a racionar el agua del tanque. Los estudiantes probaron trampas de cerveza para las babosas y aprendieron a regar al amanecer, cuando el sol todavía no evapora el agua. De cada fracaso quedó una anotación en el registro, y la anotación sirvió al año siguiente.',
      'Lo que más sorprende a los profesores no es la cosecha, sino lo que cambió en los estudiantes. Algunos que apenas hablaban en clase ahora les explican a los visitantes cómo se hace el abono. Otros, que se escapaban por la malla, llegan temprano para regar. «La huerta no les enseñó a sembrar», dice la profesora de biología; «les enseñó a esperar».',
      'Para el próximo año, el colegio quiere vender en la tienda escolar lo que sobre y usar el dinero en semillas y herramientas. Los de décimo ya hicieron las cuentas: si la huerta sigue produciendo como hasta ahora, en dos años se pagará sola.',
    ],
  };

  const CAFE = {
    id: 'lec-planta-cafe', title: 'El primer año de la planta',
    ficha: { autor: 'Crónica de un periodista del suroeste', fuente: 'Revista de una federación de productores', fecha: 'Septiembre de 2025' },
    paras: [
      'Cuando la asociación de caficultores de Tablazo inauguró su planta de secado, en enero, nadie en la vereda había visto una máquina tan grande. Hasta entonces, cada familia secaba el café en el patio, sobre lonas, y lo recogía a la carrera cada vez que amenazaba el aguacero. Bastaba un descuido para que la humedad dañara el grano de toda una semana, y con él buena parte de lo que una familia ganaba en el mes.',
      'La planta costó más de lo que la asociación tenía. El banco agrario prestó una parte, y el resto salió de una vaca que hicieron las cuarenta familias socias: cada una puso según lo que había cosechado el año anterior. Don Hernán, el presidente, todavía guarda en el bolsillo la libreta donde anotó cada aporte, con nombres, fechas y cifras que repasa en voz alta cuando alguien duda.',
      'Al cabo de seis meses, los resultados se ven en la taza. Un catador que vino de Medellín probó el café de la asociación y le dio una nota de 86 sobre 100, la más alta que ha recibido la vereda. Describió notas de panela y de mandarina, palabras que hicieron reír a más de uno, porque en Tablazo el café siempre había sabido simplemente a café.',
      'Con ese puntaje, la asociación entró a una red de productores que vende directamente, sin intermediarios, a tostadores de Europa y Asia. El precio por kilo casi se duplicó. Algunos socios, sin embargo, desconfían: dicen que el gusto de los compradores extranjeros cambia como el tiempo y que no conviene sembrar pensando solo en ellos.',
      'Mientras tanto, la planta ya salvó una cosecha. En mayo llovió tres semanas seguidas, y las familias que antes habrían perdido el grano lo llevaron a secar a la máquina. Doña Fabiola, que lleva cuarenta años en el café, se sentó en el banco de la entrada a ver girar el tambor, y dijo que por primera vez no había rezado para que dejara de llover.',
    ],
  };

  const SEMESTRE = {
    id: 'lec-primer-semestre', title: 'Aguanten el primer golpe',
    ficha: { autor: 'Testimonio de un estudiante de ingeniería', fuente: 'Blog de bienvenida de una universidad pública', fecha: 'Febrero de 2026' },
    paras: [
      'El primer día de clases en la universidad llegué con una hora de anticipación, porque mi mamá me había dicho que en la ciudad uno no puede dar papaya. Me senté en la última fila, con el bolso abrazado, y no me lo quité ni para escribir. Venía de un colegio de pueblo donde todos nos conocíamos desde el kínder, y aquí no conocía ni al celador.',
      'Las primeras semanas no di pie con bola. Confundía los bloques, llegaba a clases que no eran las mías y en el primer parcial de cálculo saqué 1.8. Esa noche llamé a mi papá para decirle que me devolvía. Él me escuchó sin interrumpir y al final me dijo: «Mijo, póngase las pilas, que usted no se fue hasta allá para tirar la toalla en el primer asalto».',
      'Lo que me salvó fue un grupo de estudio. Lo armaron tres compañeros que también venían de pueblos y que también estaban en la olla. Nos reuníamos en la biblioteca hasta que nos echaban, y cuando alguien entendía algo se lo explicaba a los demás con dibujos en una servilleta. Para las fotocopias hacíamos vaca, y para el almuerzo también.',
      'También metí la pata varias veces. Una vez le respondí mal a un profesor delante de todos, creyendo que se estaba burlando de mi acento, y resultó que solo me estaba pidiendo que hablara más duro. Me tocó ir a su oficina a pedirle disculpas con la cara roja. Él se rio y me dijo que no me preocupara, que él también había llegado del campo con las botas embarradas.',
      'Terminé el semestre con un promedio de 3.6. No es para echar voladores, pero tampoco es para llorar. Lo que aprendí, más que cálculo, es que en la universidad nadie se salva solo, y que pedir ayuda no es de débiles. A los que entran este año les digo lo mismo que me dijo mi papá, aunque con otras palabras: aguanten el primer golpe, que el segundo ya no duele tanto.',
    ],
  };

  const CUEVA = {
    id: 'lec-cueva-guacharos', title: 'Los habitantes de la oscuridad',
    ficha: { autor: 'Artículo de divulgación', fuente: 'Revista de ciencia para jóvenes', fecha: 'Abril de 2025' },
    paras: [
      'A la entrada de la cueva, el guía apaga la linterna y pide silencio. Al principio no se oye nada. Luego, desde el fondo, llega un chillido largo, después otro, y en pocos segundos la oscuridad se llena de un ruido que parece de mil puertas oxidadas. Son guácharos, unas aves nocturnas que pasan el día dentro de las cuevas y salen de noche a buscar frutos.',
      'Los guácharos son frugívoros: se alimentan casi solo de frutos, sobre todo de palmas y de laureles silvestres, que tragan enteros. Las semillas que no digieren caen al suelo de la cueva, y algunas alcanzan a germinar en la penumbra. Por eso el piso de muchas cuevas donde viven está cubierto de plántulas pálidas y delgadas, que crecen unos días buscando una luz que nunca llega y luego mueren.',
      'Para moverse en la oscuridad total, los guácharos usan un sistema parecido al de los murciélagos: emiten chasquidos y se orientan por el eco que rebota en las paredes. A diferencia de los murciélagos, que usan sonidos agudísimos, inaudibles para nosotros, los chasquidos del guácharo se oyen perfectamente. Fuera de la cueva, en cambio, se guían sobre todo por la vista y el olfato, que les permite encontrar de noche los frutos maduros desde lejos.',
      'La cueva no solo alberga aves. En sus aguas subterráneas viven peces ciegos, sin pigmento, y en sus paredes, comunidades de microorganismos que los científicos estudian con atención: algunos producen sustancias capaces de frenar a otras bacterias, y podrían servir algún día para fabricar antibióticos nuevos. Cada cueva es, en ese sentido, un laboratorio que todavía nadie ha terminado de explorar.',
      'Por eso los biólogos insisten en que las visitas se hagan con reglas: grupos pequeños, sin linternas potentes y sin tocar las paredes. Un exceso de luz o de ruido puede hacer que las aves abandonen la cueva, y una mano con bloqueador solar puede alterar en minutos comunidades de microorganismos que tardaron siglos en formarse. Quien entra a una cueva, dicen, entra a la casa de otros.',
    ],
  };

  // ---------------- Lección 1 · Sinónimos según el contexto ----------------
  setLesson('pu-vo-1', [
    play('palabra-a-la-medida', 'La palabra que encaja', { doc: HUERTA, rounds: [
      { p: 1, before: 'era un terreno ', word: 'árido', after: ' donde solo crecían piedras', options: ['seco', 'aburrido', 'lejano', 'plano'], answer: 0 },
      { p: 3, before: 'y una cosecha ', word: 'sólida', after: ' que alcanza para el restaurante', options: ['abundante y segura', 'dura', 'pesada', 'congelada'], answer: 0 },
      { p: 4, before: 'una plaga de babosas ', word: 'arrasó', after: ' con las lechugas', options: ['acabó por completo', 'se paseó', 'creció', 'jugó'], answer: 0 },
    ] }, 'Un terreno árido es seco: «aburrido» es otro sentido de la palabra, el de un libro árido. Una cosecha sólida es abundante y segura, no dura. Y la plaga arrasó: acabó con todo «en una sola semana».',
      { hint: 'Reemplaza la palabra por cada opción y lee la frase entera. ¿Cuál conserva el sentido sin volverlo raro?' }),
    play('hilo-referente', 'Lo que no se repite', { doc: HUERTA, rounds: [
      { p: 2, text: 'y armaron |una compostera| al lado de |la cancha|. |Tardó| cuatro meses en dar abono', from: 5, answer: 1 },
      { p: 3, text: 'Los estudiantes llevan |un registro de cada siembra|: |la fecha|, la semilla, cuánta agua recibió y qué plagas aparecieron. Con |esos datos|', from: 5, answer: 1 },
    ] }, 'Lo que tardó cuatro meses en dar abono fue la compostera, no la cancha. Y «esos datos» son todo lo que se anota en el registro de cada siembra, no solo la fecha.',
      { hint: 'Pregúntate qué puede dar abono y qué reúne varios datos a la vez.' }),
    play('termometro-tono', 'El tono de la nota', { doc: HUERTA, rounds: [
      { frag: 'La idea parecía un chiste: la tierra estaba tan dura que había que romperla con barra.', scale: ['incrédulo', 'solemne', 'furioso', 'triste'], answer: 0 },
      { frag: '«La huerta no les enseñó a sembrar», dice la profesora de biología; «les enseñó a esperar».', scale: ['reflexivo', 'burlón', 'alarmado', 'técnico'], answer: 0 },
    ] }, 'Al comienzo nadie creía en la huerta: el tono es incrédulo, casi de broma. La frase de la profesora, en cambio, invita a pensar en lo que de verdad se aprendió.',
      { hint: 'Fíjate en «parecía un chiste» y en la oposición entre sembrar y esperar.' }),
    play('resume-parrafo', 'La idea de cada párrafo', { doc: HUERTA, paras: [2, 3, 4, 5], options: [
      'Preparar el suelo tomó tiempo y paciencia, pero lo transformó.',
      'La huerta ya produce y además sirve para aprender.',
      'Hubo fracasos, y cada uno dejó una lección anotada.',
      'La huerta cambió la actitud de los estudiantes.',
      'La huerta alimenta a todo el colegio todos los días.',
      'Las babosas son la peor plaga de las lechugas.',
    ], key: [0, 1, 2, 3] }, 'Los resúmenes buenos dicen la idea central de cada párrafo. La huerta alcanza para el restaurante dos veces por semana, no todos los días, y lo de las babosas es un detalle.',
      { hint: 'Compara las cantidades: ¿cuántas veces por semana alcanza la cosecha?' }),
    play('donde-buscar', '¿Dónde está la respuesta?', { doc: HUERTA, cards: [
      ['¿Cómo era el patio antes?', [1]], ['¿Con qué se hizo el abono?', [2]], ['¿Qué se anota en el registro?', [3]],
      ['¿Cómo enfrentaron la sequía?', [4]], ['¿Qué quiere hacer el colegio el próximo año?', [6]],
    ] }, 'El antes (1), el abono (2), el registro (3), los fracasos (4), el cambio en los estudiantes (5) y el plan (6).',
      { hint: 'La nota sigue el tiempo: antes, preparación, hoy, problemas, lo que cambió y lo que viene.' }),
    play('conector-bisagra', 'Cómo se unen las ideas', { doc: HUERTA, rounds: [
      { a: 'La compostera olía a cebolla podrida.', b: 'cuando la mezclaron con la tierra, el suelo cambió de color.', options: ['Pero', 'Por eso,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'Aprendieron a regar al amanecer', b: 'a esa hora el sol todavía no evapora el agua.', options: ['porque', 'aunque', 'sin embargo,', 'por ejemplo,'], answer: 0 },
    ] }, 'El mal olor se opone al buen resultado (contraste). Y el sol que aún no evapora el agua explica por qué regar a esa hora (causa).',
      { hint: 'Pregúntate si la segunda idea se opone a la primera o dice por qué ocurre.' }),
    play('lupa-evidencia', 'Lo que dice la nota', { doc: HUERTA, cards: [
      ['La huerta tiene doce eras.', 0],
      ['El abono tardó cuatro meses en estar listo.', 0],
      ['Antes de la huerta, algunos estudiantes se volaban de clase.', 1],
      ['La huerta produce para el restaurante todos los días.', 2],
      ['El profesor de matemáticas dirige la huerta.', 2],
      ['Las trampas de cerveza acabaron con las babosas.', 2],
    ] }, 'Las eras y el abono están escritos. Que algunos se volaban se deduce de «se escapaban por la malla». La huerta alcanza dos veces por semana; quien propuso la huerta fue la profesora de biología, y el texto dice que probaron las trampas, no que funcionaran.',
      { hint: '«Probaron» no es lo mismo que «funcionó». Compara cada verbo con el del texto.' }),
  ]);

  // ---------------- Lección 2 · Palabras con varios sentidos ----------------
  setLesson('pu-vo-2', [
    play('palabra-a-la-medida', 'El sentido de esta frase', { doc: CAFE, rounds: [
      { p: 1, before: 'inauguró su ', word: 'planta', after: ' de secado', options: ['instalación', 'mata', 'suela', 'piso'], answer: 0 },
      { p: 3, before: 'y le dio una ', word: 'nota', after: ' de 86 sobre 100', options: ['calificación', 'apunte', 'sonido musical', 'cuenta por pagar'], answer: 0 },
      { p: 3, before: 'Describió ', word: 'notas', after: ' de panela y de mandarina', options: ['sabores que se perciben', 'calificaciones', 'mensajes escritos', 'sonidos'], answer: 0 },
      { p: 5, before: 'la planta ya ', word: 'salvó', after: ' una cosecha', options: ['rescató', 'aprobó', 'saltó', 'ahorró'], answer: 0 },
    ] }, 'La misma palabra cambia con la frase: «planta» de secado es una instalación; una «nota» de 86 es una calificación, pero las «notas» de panela son sabores; y salvar una cosecha es rescatarla, no aprobarla como una materia.',
      { hint: 'Mira las palabras que acompañan a cada una: «de secado», «sobre 100», «de panela», «una cosecha».' }),
    play('donde-buscar', 'Cada sentido en su párrafo', { doc: CAFE, ask: 'Lleva cada sentido de una palabra al párrafo donde se usa con ese sentido.', cards: [
      ['«banco» como entidad que presta dinero', [2]], ['«banco» como asiento', [5]], ['«nota» como calificación', [3]],
      ['«red» como grupo de productores', [4]], ['«tiempo» como el clima', [4]],
    ] }, 'El banco agrario presta (2) y el banco de la entrada es un asiento (5). La nota de 86 está en el 3. En el 4, la red es un grupo de productores y el gusto que «cambia como el tiempo» habla del clima, que cambia de un día a otro.',
      { hint: 'Busca cada palabra en el texto y lee la frase completa: ¿presta dinero o sirve para sentarse? ¿Pasa el tiempo o cambia el clima?' }),
    play('lupa-evidencia', 'Lo que cuenta la crónica', { doc: CAFE, cards: [
      ['El banco agrario prestó parte del dinero.', 0],
      ['Antes de la planta, la lluvia podía dañar el café.', 0],
      ['No todas las familias aportaron lo mismo para la planta.', 1],
      ['Antes, el café de la vereda había recibido notas más bajas.', 1],
      ['El precio por kilo se triplicó.', 2],
      ['Todos los socios confían en la red de productores.', 2],
    ] }, 'El préstamo y el riesgo de la lluvia están escritos. Que no aportaron igual sale de «cada una puso según lo que había cosechado»; y que antes hubo notas más bajas, de que esta es «la más alta que ha recibido». El precio «casi se duplicó», y algunos socios desconfían.',
      { hint: '«Duplicar» es multiplicar por dos. Y «algunos desconfían» no permite decir «todos confían».' }),
    play('termometro-tono', 'El tono de la crónica', { doc: CAFE, rounds: [
      { frag: 'palabras que hicieron reír a más de uno, porque en Tablazo el café siempre había sabido simplemente a café.', scale: ['humorístico', 'solemne', 'amargo', 'alarmado'], answer: 0 },
      { frag: 'y dijo que por primera vez no había rezado para que dejara de llover.', scale: ['aliviado', 'temeroso', 'furioso', 'burlón'], answer: 0 },
    ] }, 'El cronista se ríe con cariño de las palabras del catador. Y doña Fabiola, por primera vez, no teme la lluvia: está aliviada.',
      { hint: 'Pregúntate qué siente doña Fabiola al no tener que rezar esta vez.' }),
    play('mapa-del-texto', 'El año de la planta', { doc: CAFE, labels: ['cuenta cómo se secaba antes el café', 'explica cómo se pagó la planta', 'muestra la mejora en la calidad', 'cuenta un mercado nuevo y una duda', 'narra cómo la planta salvó una cosecha', 'enseña a catar café'], key: [0, 1, 2, 3, 4] },
      'La crónica sigue el primer año: el problema de antes, el costo, la nota del catador, la red y la duda de algunos socios, y la lluvia de mayo. No enseña a catar.',
      { hint: 'Cada párrafo abre con su tema: hasta entonces, el costo, los resultados, el puntaje, mientras tanto.' }),
    play('conector-bisagra', 'Bisagras', { doc: CAFE, rounds: [
      { a: 'La asociación entró a una red que vende a Europa y Asia.', b: 'el precio por kilo casi se duplicó.', options: ['Por eso,', 'Aunque', 'Es decir,', 'Por ejemplo,'], answer: 0 },
      { a: 'El precio por kilo casi se duplicó.', b: 'algunos socios desconfían.', options: ['Sin embargo,', 'Por lo tanto,', 'Además,', 'O sea,'], answer: 0 },
    ] }, 'Vender directamente subió el precio (consecuencia). Y aun con un buen precio, hay quien desconfía (contraste).',
      { hint: 'La primera pareja va de una causa a su resultado. En la segunda, ¿lo esperable sería confiar o desconfiar?' }),
    play('hilo-referente', '¿En quiénes no conviene pensar solo?', { doc: CAFE, rounds: [
      { p: 4, text: 'Algunos |socios|, sin embargo, desconfían: dicen que el gusto de |los compradores extranjeros| cambia como |el tiempo| y que no conviene sembrar pensando solo en |ellos|.', from: 7, answer: 3 },
    ] }, '«Ellos» son los compradores extranjeros: no conviene sembrar pensando solo en su gusto. Los socios son quienes lo dicen.',
      { hint: 'Quien habla no suele ser aquel de quien habla. ¿De quién se queja este grupo de socios?' }),
  ]);

  // ---------------- Lección 3 · Expresiones y frases hechas ----------------
  setLesson('pu-vo-3', [
    play('palabra-a-la-medida', 'Lo que quieren decir', { doc: SEMESTRE, rounds: [
      { p: 1, before: 'en la ciudad uno no puede ', word: 'dar papaya', after: '.', options: ['dar la oportunidad de que lo roben', 'regalar fruta', 'ser amable', 'llegar tarde'], answer: 0 },
      { p: 2, before: 'Las primeras semanas no ', word: 'di pie con bola', after: '.', options: ['acerté en nada', 'jugué fútbol', 'caminé mucho', 'dormí bien'], answer: 0 },
      { p: 3, before: 'y que también estaban en ', word: 'la olla', after: '.', options: ['una situación difícil', 'la cocina', 'una fiesta', 'la biblioteca'], answer: 0 },
    ] }, 'En una frase hecha, el sentido no sale de sumar las palabras: dar papaya es descuidarse y dar la oportunidad de un robo; no dar pie con bola, no acertar en nada; y estar en la olla, pasar por un mal momento.',
      { hint: 'Lee lo que pasa alrededor: el bolso abrazado, las clases equivocadas y el 1.8, los compañeros que también necesitaban ayuda.' }),
    play('caso-nuevo', 'Nadie se salva solo', { doc: SEMESTRE, principle: 'Pedir ayuda y trabajar en grupo no es de débiles: es como se sale adelante.', cards: [
      ['Una enfermera nueva que le pregunta a una colega cómo usar una máquina.', true],
      ['Unos vecinos que se turnan para cuidar a sus hijos y así poder trabajar.', true],
      ['Un estudiante que copia en el examen para no perder la materia.', false],
      ['Un trabajador que oculta un error para que nadie piense que no sabe.', false],
    ] }, 'La enfermera y los vecinos se apoyan en otros, como el grupo de estudio. Copiar no es pedir ayuda, y ocultar un error es justo lo contrario de lo que aprendió el autor.',
      { hint: 'Busca los casos donde alguien reconoce que necesita a otros y se apoya en ellos de manera honesta.' }),
    play('termometro-tono', 'Cómo se siente', { doc: SEMESTRE, rounds: [
      { frag: 'Me tocó ir a su oficina a pedirle disculpas con la cara roja.', scale: ['avergonzado', 'orgulloso', 'furioso', 'aburrido'], answer: 0 },
      { frag: 'No es para echar voladores, pero tampoco es para llorar.', scale: ['conforme', 'eufórico', 'desesperado', 'burlón'], answer: 0 },
    ] }, 'La cara roja delata la vergüenza. Y quien dice que su nota no es para celebrar con pólvora ni para llorar está conforme.',
      { hint: '«Echar voladores» es celebrar con pólvora. ¿Qué siente quien dice que su nota no da para eso ni para llorar?' }),
    play('lupa-evidencia', 'Lo que cuenta y lo que no', { doc: SEMESTRE, cards: [
      ['En el primer parcial de cálculo sacó 1.8.', 0],
      ['El profesor también había llegado del campo.', 0],
      ['El autor pensó en dejar la universidad.', 1],
      ['Los del grupo de estudio tenían poco dinero.', 1],
      ['El autor perdió cálculo.', 2],
      ['El grupo de estudio lo organizó la universidad.', 2],
    ] }, 'El 1.8 y el profesor del campo están escritos. Que pensó en irse sale de «me devolvía»; que tenían poco dinero, de que hacían vaca hasta para el almuerzo. Un parcial perdido no es la materia perdida, y el grupo lo armaron tres compañeros.',
      { hint: 'Perder un parcial no es perder la materia. Lee con cuidado quién armó el grupo.' }),
    play('hilo-referente', '¿Quién y qué?', { doc: SEMESTRE, rounds: [
      { p: 3, text: 'Lo que me salvó fue |un grupo de estudio|. |Lo| armaron |tres compañeros|', from: 3, answer: 1 },
      { p: 2, text: 'en |el primer parcial de cálculo| saqué 1.8. Esa noche llamé a |mi papá| para decirle que me devolvía. |Él| me escuchó', from: 5, answer: 3 },
    ] }, 'Lo que armaron los tres compañeros fue el grupo de estudio. Y quien escuchó sin interrumpir fue el papá.',
      { hint: '¿Qué se puede armar entre varios? ¿Y quién puede escuchar una llamada?' }),
    play('resume-parrafo', 'El semestre en cuatro frases', { doc: SEMESTRE, paras: [2, 3, 4, 5], options: [
      'Al principio todo le salió mal y pensó en rendirse.',
      'Un grupo de compañeros lo sacó adelante.',
      'Cometió errores y aprendió a reconocerlos.',
      'Terminó bien y aprendió que nadie se salva solo.',
      'Cálculo es la materia más difícil de la universidad.',
      'Los profesores se burlan de los estudiantes de pueblo.',
    ], key: [0, 1, 2, 3] }, 'Cada resumen recoge su párrafo. El autor no dice que cálculo sea la más difícil, y el profesor no se burlaba: le pedía que hablara más duro.',
      { hint: 'Ojo con el resumen que repite lo que el autor creyó y que luego resultó falso.' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: SEMESTRE, rounds: [
      { p: 2, text: 'y al final me dijo: |«|Mijo, póngase las pilas', options: ['abre las palabras exactas del papá', 'marca ironía', 'abre el título de un libro', 'encierra una palabra extranjera'], answer: 0 },
      { p: 5, text: 'aunque con otras palabras|:| aguanten el primer golpe', options: ['anuncia el consejo que da', 'abre una lista de materias', 'cita al papá con sus palabras exactas', 'marca una pregunta'], answer: 0 },
    ] }, 'Las comillas abren la cita directa del papá. Los dos puntos anuncian el consejo del autor, que repite la idea del papá «con otras palabras»: por eso no es una cita exacta.',
      { hint: 'Fíjate en «con otras palabras» antes de los dos puntos: ¿son las palabras exactas de alguien?' }),
  ]);

  // ---------------- Lección 4 · Prefijos y raíces ----------------
  setLesson('pu-vo-4', [
    play('palabra-a-la-medida', 'Palabras que se arman por piezas', { doc: CUEVA, rounds: [
      { p: 2, before: 'Los guácharos son ', word: 'frugívoros', after: ':', options: ['que comen frutos', 'que vuelan de noche', 'que viven en grupo', 'que cantan fuerte'], answer: 0 },
      { p: 3, before: 'sonidos agudísimos, ', word: 'inaudibles', after: ' para nosotros', options: ['que no se pueden oír', 'muy fuertes', 'desagradables', 'que se oyen lejos'], answer: 0 },
      { p: 4, before: 'En sus aguas ', word: 'subterráneas', after: ' viven peces ciegos', options: ['que corren bajo tierra', 'muy frías', 'saladas', 'que caen en cascada'], answer: 0 },
      { p: 4, before: 'comunidades de ', word: 'microorganismos', after: ' que los científicos', options: ['seres vivos diminutos', 'minerales brillantes', 'plantas trepadoras', 'insectos grandes'], answer: 0 },
    ] }, 'Fruti- (fruto) + -voro (que come); in- (no) + audible (que se oye); sub- (debajo) + terra (tierra); micro- (pequeño) + organismo (ser vivo). Las piezas dan el sentido, y la frase lo confirma.',
      { hint: 'Parte cada palabra en piezas: un comienzo (in-, sub-, micro-) y una raíz que ya conoces (fruto, audio, tierra, organismo).' }),
    play('intruso-excepto', 'Quiénes viven en la cueva', { doc: CUEVA, ask: 'Según el texto, en la cueva viven todos estos, EXCEPTO:', cards: [
      ['Aves que se orientan por el eco', [1, 3]],
      ['Peces ciegos, sin pigmento', [4]],
      ['Microorganismos que frenan a otras bacterias', [4]],
      ['Murciélagos que comen frutos', null],
    ] }, 'Los guácharos (párrafos 1 y 3), los peces y los microorganismos (párrafo 4) viven allí. Los murciélagos solo aparecen como comparación: el texto no dice que vivan en esa cueva.',
      { hint: 'Que algo se mencione en el texto no quiere decir que el texto afirme lo que dice la opción. ¿Para qué se nombran los murciélagos?' }),
    play('lupa-evidencia', 'Lo que dice el artículo', { doc: CUEVA, cards: [
      ['Los guácharos salen de noche a buscar frutos.', 0],
      ['Los chasquidos del guácharo se oyen sin aparatos.', 0],
      ['Los guácharos llevan semillas al interior de la cueva.', 1],
      ['Las plántulas de la cueva mueren por falta de luz.', 1],
      ['Ya se fabricó un antibiótico con microorganismos de la cueva.', 2],
      ['Los guácharos son ciegos.', 2],
    ] }, 'Las dos primeras están escritas. Si las semillas que no digieren caen dentro, son ellos quienes las llevan; y las plántulas buscan una luz «que nunca llega» y mueren. Los antibióticos «podrían» fabricarse algún día; y los ciegos son los peces: fuera de la cueva, los guácharos se guían por la vista.',
      { hint: '«Podrían servir algún día» no es «ya se hizo». Y fíjate bien de quién se dice que es ciego.' }),
    play('termometro-tono', 'El tono del artículo', { doc: CUEVA, rounds: [
      { frag: 'en pocos segundos la oscuridad se llena de un ruido que parece de mil puertas oxidadas.', scale: ['inquietante', 'alegre', 'técnico', 'burlón'], answer: 0 },
      { frag: 'Quien entra a una cueva, dicen, entra a la casa de otros.', scale: ['respetuoso', 'indiferente', 'irónico', 'eufórico'], answer: 0 },
    ] }, 'El comienzo crea una atmósfera inquietante, con un ruido de puertas oxidadas en la oscuridad. El cierre pide respeto por los habitantes de la cueva.',
      { hint: 'Imagina la escena del primer fragmento con la linterna apagada. Y piensa en cómo se entra a la casa de otros.' }),
    play('conector-bisagra', 'Contrastes y consecuencias', { doc: CUEVA, rounds: [
      { a: 'Los murciélagos usan sonidos agudísimos, inaudibles para nosotros.', b: 'los chasquidos del guácharo se oyen perfectamente.', options: ['En cambio,', 'Por eso,', 'Además,', 'Es decir,'], answer: 0 },
      { a: 'Un exceso de luz puede hacer que las aves abandonen la cueva.', b: 'las visitas se hacen sin linternas potentes.', options: ['Por eso,', 'Aunque', 'Sin embargo,', 'Por ejemplo,'], answer: 0 },
    ] }, 'Los dos animales se comparan por lo que se oye (contraste). Y el riesgo de la luz es la razón de la regla (consecuencia).',
      { hint: 'Pregúntate si las dos ideas se oponen o si la segunda es lo que se hace por causa de la primera.' }),
    play('donde-buscar', 'Vuelve al párrafo', { doc: CUEVA, cards: [
      ['¿Qué se oye cuando el guía apaga la linterna?', [1]], ['¿Qué comen los guácharos?', [2]], ['¿Cómo se orientan en la oscuridad?', [3]],
      ['¿Qué vive en las aguas de la cueva?', [4]], ['¿Qué reglas tienen las visitas?', [5]],
    ] }, 'La escena de entrada (1), la comida (2), la orientación (3), los otros habitantes (4) y las reglas (5).',
      { hint: 'Ubica la palabra clave de cada pregunta en el texto: linterna, frutos, eco, aguas, reglas.' }),
    play('balanza-argumento', '¿Visitas con reglas?', { doc: CUEVA, thesis: 'Las visitas a las cuevas deben hacerse con reglas estrictas.', cards: [
      ['El exceso de luz puede hacer que las aves se vayan.', 0],
      ['Una mano con bloqueador puede alterar comunidades de microorganismos.', 0],
      ['Un estudio muestra que el ruido de los visitantes no afecta a los guácharos.', 1],
      ['Las cuevas con visitas libres conservan tantas aves como las protegidas.', 1],
      ['Los guácharos son frugívoros.', null],
    ] }, 'Los daños de la luz y del bloqueador justifican las reglas. Si el ruido no afectara a las aves o las cuevas sin reglas estuvieran igual de bien, las reglas perderían sentido. Lo que comen los guácharos no dice nada sobre las visitas.',
      { hint: 'Pregúntate si cada oración muestra un daño de las visitas, una prueba de que no hay daño, o nada sobre las visitas.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const REMENDON = {
    id: 'lec-remendon', title: 'El último remendón de la plaza',
    paras: [
      'En la esquina de la plaza de mercado, debajo de un parasol desteñido, don Isaías Mejía remienda zapatos desde 1979. Tiene una lezna, un martillo, tres hormas y una paciencia que no se compra. Por su banco han pasado botas de policía, zapatillas de bailarina y unos tacones que, según él, «tenían más kilómetros que un bus intermunicipal».',
      'Hace veinte años, en la misma cuadra trabajaban seis remendones. Hoy queda él solo. Los zapatos baratos, que se botan cuando se dañan, acabaron con el oficio más rápido que cualquier impuesto. «Ahora la gente prefiere comprar otro par que arreglar el que tiene», dice sin rabia, como quien describe el clima.',
      'Sin embargo, en los últimos años algo ha empezado a cambiar. Estudiantes de diseño vienen a preguntarle cómo se cose una suela, y una tienda de ropa reutilizada le manda cada semana una caja de botas para restaurar. Él cobra lo mismo que antes y trabaja más que nunca. «Me tocó vivir para ver que lo viejo se volviera moda», dice, y se ríe.',
      'Don Isaías no cree que el oficio vaya a desaparecer, pero tampoco que vuelva a ser lo que fue. Lo que sí le preocupa es que nadie aprenda. Ha ofrecido enseñar gratis los sábados, y hasta ahora solo han ido dos muchachos. Uno se cansó al tercer día; el otro ya cose suelas mejor que él, asegura, aunque nadie le crea.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: REMENDON, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-vocabulario', 'Evaluación · Vocabulario en contexto', [
    ['pu-vo-1', 'El sinónimo correcto es el que, puesto en la frase, conserva su sentido.',
      Q('En el párrafo 1, la palabra «remienda» puede reemplazarse por:', ['arregla', 'vende', 'fabrica', 'limpia'], 0,
        'Remendar es arreglar algo roto o gastado; don Isaías trabaja con hormas y lezna para reparar zapatos.',
        'Reemplaza la palabra por cada opción y relee la frase con las herramientas que tiene don Isaías.')],
    ['pu-vo-1', 'Una expresión se entiende con el sentido de toda la frase, no palabra por palabra.',
      Q('En «una paciencia que no se compra», se quiere decir que la paciencia de don Isaías:', ['es muy cara', 'no se consigue con dinero', 'está prohibida', 'se vende en la plaza'], 1,
        'Algo que «no se compra» no se obtiene pagando: se forma con los años, como la paciencia del oficio.',
        'Piensa en qué cosas no se pueden comprar aunque uno tenga dinero.')],
    ['pu-vo-2', 'Una palabra con varios sentidos se interpreta por las demás palabras de la frase.',
      Q('En el párrafo 1, la palabra «banco» se refiere a:', ['una entidad que presta dinero', 'el asiento y la mesa donde trabaja', 'un grupo de peces', 'un lugar donde se guarda sangre'], 1,
        'Por el banco «han pasado» botas y zapatillas: es el lugar de trabajo del remendón, no una entidad financiera.',
        'Lee qué ha pasado «por su banco».')],
    ['pu-vo-2', 'El sentido más común de una palabra suele ser la trampa.',
      Q('En «Los zapatos baratos, que se botan cuando se dañan», la palabra «botan» significa:', ['rebotan', 'fabrican', 'calzan', 'tiran a la basura'], 3,
        'Botar, en Colombia, es tirar a la basura: los zapatos baratos se desechan en vez de arreglarse.',
        'Lee la oración siguiente: la gente prefiere comprar otro par.')],
    ['pu-vo-3', 'La exageración es una manera de decir algo con fuerza.',
      Q('«Tenían más kilómetros que un bus intermunicipal» quiere decir que los tacones:', ['estaban muy usados', 'habían viajado en bus', 'eran muy rápidos', 'eran nuevos'], 0,
        'Comparar los tacones con un bus que viaja todo el día exagera para decir que habían caminado muchísimo: estaban muy gastados.',
        'Piensa en cuánto anda un bus que va de un municipio a otro y en cómo quedan unos zapatos que caminan tanto.')],
    ['pu-vo-3', 'Una frase hecha expresa una actitud; el contexto dice cuál.',
      Q('Con la expresión «me tocó vivir para ver que lo viejo se volviera moda», don Isaías expresa:', ['tristeza por el pasado', 'obligación de trabajar más', 'sorpresa ante algo que no esperaba', 'miedo al futuro'], 2,
        '«Me tocó vivir para ver» se dice ante algo inesperado; y él se ríe: le sorprende que su oficio vuelva a interesar.',
        'Fíjate en lo que hace don Isaías justo después de decirlo.')],
    ['pu-vo-4', 'Los prefijos dan pistas del sentido: re- (de nuevo), sub- (debajo), inter- (entre).',
      Q('En «ropa reutilizada», el prefijo re- significa:', ['antes', 'contra', 'debajo', 'de nuevo'], 3,
        'Reutilizar es utilizar de nuevo: la tienda vende ropa que ya tuvo otro dueño.',
        'Piensa en otras palabras con re-: releer, rehacer, reconstruir.')],
    ['pu-vo-4', 'Inter- significa «entre»: internacional, intercambio.',
      Q('Un bus «intermunicipal» es uno que:', ['circula dentro de un solo municipio', 'viaja de un municipio a otro', 'pertenece a la alcaldía', 'pasa por debajo de la ciudad'], 1,
        'Inter- es «entre»: el bus intermunicipal va entre municipios.',
        'Piensa en «internacional»: ¿dentro de un país o entre países?')],
  ]);
});
