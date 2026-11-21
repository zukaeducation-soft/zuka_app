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
      'A la entrada de la cueva, el guía apaga la linterna y pide silencio. Lleva quince años recorriendo esta cueva con grupos reducidos de visitantes. Al principio no se oye nada. Luego, desde el fondo, llega un chillido largo, después otro, y en pocos segundos la oscuridad se llena de un ruido que parece de mil puertas oxidadas. Son guácharos, unas aves nocturnas que pasan el día dentro de las cuevas y salen de noche a buscar frutos.',
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
      { p: 3, before: 'y una cosecha ', word: 'sólida', after: ' que alcanza para el restaurante', options: ['abundante y segura', 'dura', 'pesada', 'congelada en bloques'], answer: 0 },
      { p: 4, before: 'una plaga de babosas ', word: 'arrasó', after: ' con las lechugas', options: ['acabó por completo', 'se paseó', 'creció', 'jugó entre las hojas'], answer: 0 },
    ] }, 'Un terreno árido es seco: «aburrido» es otro sentido de la palabra, el de un libro árido. Una cosecha sólida es abundante y segura, no dura. Y la plaga arrasó: acabó con todo «en una sola semana».',
      { hint: 'Reemplaza la palabra por cada opción y lee la frase entera. ¿Cuál conserva el sentido sin volverlo raro?' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: HUERTA, ask: 'Según el texto, los estudiantes hicieron todo lo siguiente, EXCEPTO:', cards: [
      ['Armar una compostera al lado de la cancha', [2]],
      ['Llevar un registro de cada siembra', [3, 4]],
      ['Probar trampas de cerveza para las babosas', [4]],
      ['Construir un invernadero de plástico', null],
    ] }, 'La compostera está en el párrafo 2; el registro, en el 3 y en el 4; las trampas de cerveza, en el 4. Ningún invernadero aparece en el texto.',
      { hint: 'Lleva cada acción a su párrafo. La que no encuentre lugar es la respuesta.' }),
    play('cadena-causas', 'Del patio a la cosecha', { doc: HUERTA, chain: [
      'Recogen cascarones, borra de café y hojas secas.',
      'La compostera da abono después de cuatro meses.',
      'El suelo del patio se vuelve oscuro, suelto y húmedo.',
      'La huerta da una cosecha que alcanza para el restaurante escolar.',
    ], extra: ['Una plaga de babosas arrasa con las lechugas.', 'Los estudiantes aprenden estadística con los datos.'] },
      'Los párrafos 2 y 3 cuentan el camino: lo que recogen se vuelve abono, el abono cambia el suelo y el suelo da la cosecha. Las babosas fueron un tropiezo, no un paso, y la estadística es otro efecto de la huerta, no de la cosecha.',
      { hint: 'Empieza por lo que llevaron de sus casas y sigue qué se volvió cada cosa.' }),
    play('resume-parrafo', 'La idea de cada párrafo', { doc: HUERTA, paras: [2, 3, 4, 5], options: [
      'Preparar el suelo tomó tiempo y paciencia, pero lo transformó.',
      'La huerta ya produce y además sirve para aprender.',
      'Hubo fracasos, y cada uno dejó una lección anotada.',
      'La huerta cambió la actitud de los estudiantes.',
      'La huerta alimenta a todo el colegio todos los días.',
      'Las babosas son la peor plaga de las lechugas.',
    ], key: [0, 1, 2, 3] }, 'Los resúmenes buenos dicen la idea central de cada párrafo. La huerta alcanza para el restaurante dos veces por semana, no todos los días, y lo de las babosas es un detalle.',
      { hint: 'Compara las cantidades: ¿cuántas veces por semana alcanza la cosecha?' }),
    play('subraya-prueba', 'La prueba en el texto', { doc: HUERTA, rounds: [
      { claim: 'Los estudiantes aprendieron de sus errores.', p: 4, answer: 3 },
      { claim: 'La huerta logró que algunos estudiantes quisieran estar en el colegio.', p: 5, answer: 2 },
    ] }, 'Aprender de los errores lo prueba la anotación que quedó de cada fracaso y que sirvió al año siguiente. Y las ganas de estar en el colegio, los que antes se escapaban por la malla y ahora llegan temprano para regar.',
      { hint: 'Hay oraciones del mismo párrafo que hablan de cambios distintos. Busca la que muestra justo el de la conclusión.' }),
    play('conector-bisagra', 'Cómo se unen las ideas', { doc: HUERTA, rounds: [
      { a: 'La compostera olía a cebolla podrida.', b: 'cuando la mezclaron con la tierra, el suelo cambió de color.', options: ['Pero', 'Por eso,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'Aprendieron a regar al amanecer', b: 'a esa hora el sol todavía no evapora el agua.', options: ['porque', 'aunque', 'sin embargo,', 'por ejemplo,'], answer: 0 },
    ] }, 'El mal olor se opone al buen resultado (contraste). Y el sol que aún no evapora el agua explica por qué regar a esa hora (causa).',
      { hint: 'Pregúntate si la segunda idea se opone a la primera o dice por qué ocurre.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: HUERTA, q: '¿Qué quiere decir la profesora con «les enseñó a esperar»?', options: [
      ['Que aprendieron a esperar su turno en el restaurante escolar.', 4],
      ['Que ahora son pacientes en todo lo que hacen.', 1],
      ['Que la huerta les mostró que los frutos toman tiempo, como el abono que tardó meses.', 0],
      ['Que la huerta les enseñó sobre todo a sembrar.', 2],
    ] }, 'C recoge lo que cuenta el texto: el abono tardó cuatro meses y el suelo cambió despacio. A mezcla la frase con un dato del texto que no tiene que ver (el restaurante); B dice de más («en todo»), y D dice lo contrario de «no les enseñó a sembrar». Sobra el sello «El texto no lo dice».',
      { hint: 'Lee la frase completa de la profesora: tiene dos partes, una que niega y otra que afirma.' }),
  ]);

  // ---------------- Lección 2 · Palabras con varios sentidos ----------------
  setLesson('pu-vo-2', [
    play('ordena-parrafos', 'Arma el reportaje otra vez', { doc: CAFE },
      '«La planta costó más de lo que la asociación tenía» explica cómo se pagó la planta recién inaugurada; «Al cabo de seis meses» trae los resultados; «Con ese puntaje» usa la nota del catador, y «Mientras tanto» cierra con la cosecha salvada.',
      { hint: '«Ese puntaje» y «al cabo de seis meses» necesitan algo antes. Busca qué retoman.' }),
    play('palabra-a-la-medida', 'El sentido de esta frase', { doc: CAFE, rounds: [
      { p: 1, before: 'inauguró su ', word: 'planta', after: ' de secado', options: ['instalación', 'mata', 'suela', 'piso de abajo'], answer: 0 },
      { p: 3, before: 'y le dio una ', word: 'nota', after: ' de 86 sobre 100', options: ['calificación', 'apunte', 'sonido musical', 'cuenta por pagar'], answer: 0 },
      { p: 3, before: 'Describió ', word: 'notas', after: ' de panela y de mandarina', options: ['sabores que se perciben', 'calificaciones', 'mensajes escritos en papel', 'sonidos'], answer: 0 },
      { p: 5, before: 'la planta ya ', word: 'salvó', after: ' una cosecha', options: ['rescató', 'aprobó', 'saltó', 'ahorró dinero'], answer: 0 },
    ] }, 'La misma palabra cambia con la frase: «planta» de secado es una instalación; una «nota» de 86 es una calificación, pero las «notas» de panela son sabores; y salvar una cosecha es rescatarla, no aprobarla como una materia.',
      { hint: 'Mira las palabras que acompañan a cada una: «de secado», «sobre 100», «de panela», «una cosecha».' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: CAFE, rounds: [
      { p: 2, text: 'el resto salió de una vaca que hicieron las cuarenta familias socias|:| cada una puso según lo que había cosechado', options: ['anuncia cómo se hizo la vaca', 'abre una cita de don Hernán', 'separa una lista de nombres', 'marca una pregunta'], answer: 0 },
      { p: 4, text: 'Algunos socios|,| sin embargo, desconfían', options: ['abre un inciso con un conector que contrasta', 'separa dos cifras', 'reemplaza un verbo que no se repite', 'cierra una enumeración'], answer: 0 },
      { p: 4, text: 'una red de productores que vende directamente|,| sin intermediarios, a tostadores', options: ['abre un inciso que aclara cómo se vende', 'separa dos verbos', 'anuncia una cita', 'marca el final de la oración'], answer: 0 },
    ] }, 'Los dos puntos anuncian la explicación de cómo funcionó la vaca. En el párrafo 4, las comas abren incisos: uno con «sin embargo», que contrasta con la buena noticia del precio, y otro que aclara que se vende sin intermediarios.',
      { hint: 'Lee la oración sin lo que queda entre los signos. Si sigue teniendo sentido, el signo abrió un inciso; si anuncia algo, mira qué viene después.' }),
    play('resume-parrafo', 'Cada párrafo en una frase', { doc: CAFE, paras: [2, 3, 4, 5], options: [
      'La planta se pagó con un préstamo y con aportes de las familias.',
      'El café de la asociación recibió la mejor nota de su historia.',
      'La buena nota abrió un mercado que paga casi el doble, aunque algunos desconfían.',
      'La planta ya salvó una cosecha en un mes de lluvias.',
      'Don Hernán guarda en el bolsillo la libreta de los aportes.',
      'El café de Tablazo siempre ha sabido a panela y mandarina.',
    ], key: [0, 1, 2, 3] },
      'Cada resumen dice de qué trata el párrafo entero: cómo se pagó, qué nota sacó, qué mercado abrió (con la duda de algunos socios) y la cosecha salvada. La libreta de don Hernán es un detalle, y el texto dice que el café de Tablazo siempre había sabido «simplemente a café».',
      { hint: 'Un buen resumen cubre todo el párrafo. Si una frase solo habla de una persona o de un objeto, es un detalle.' }),
    play('cadena-causas', 'Del puntaje al precio', { doc: CAFE, chain: [
      'El café de la asociación recibe una nota de 86 sobre 100.',
      'La asociación entra a una red que vende sin intermediarios.',
      'El precio por kilo casi se duplica.',
    ], extra: ['Algunos socios desconfían de los compradores extranjeros.', 'Llueve tres semanas seguidas en mayo.'] },
      'El párrafo 4 empieza «Con ese puntaje»: la nota del catador abre la puerta de la red, y vender sin intermediarios casi duplica el precio. La desconfianza de algunos socios es una reacción, no un paso de la cadena, y la lluvia de mayo pertenece a otra historia, la de la cosecha salvada.',
      { hint: 'Busca la expresión que une la nota del catador con lo que vino después.' }),
    play('resumen-esencial', 'El resumen en tres renglones', { doc: CAFE, ideas: [
      ['Cuarenta familias construyeron juntas una planta para secar el café.', true],
      ['Con la planta, su café ganó calidad y se vende casi al doble.', true],
      ['La planta ya protegió una cosecha de la lluvia.', true],
      ['El catador describió notas de panela y de mandarina.', false],
      ['Don Hernán anotó cada aporte en una libreta.', false],
      ['Doña Fabiola lleva cuarenta años en el café.', false],
    ] }, 'El reportaje cuenta cómo se hizo la planta, qué ganó el café y la cosecha que ya salvó. La panela, la libreta de don Hernán y los años de doña Fabiola son ciertos, pero son detalles que dan color a esas ideas.',
      { hint: 'Pregúntate qué cambió para las familias. Lo que solo describe a una persona es un detalle.' }),
    play('hilo-referente', '¿En quiénes no conviene pensar solo?', { doc: CAFE, rounds: [
      { p: 4, text: 'Algunos |socios|, sin embargo, desconfían: dicen que el gusto de |los compradores extranjeros| cambia como |el tiempo| y que no conviene sembrar pensando solo en |ellos|.', from: 7, answer: 3 },
    ] }, '«Ellos» son los compradores extranjeros: no conviene sembrar pensando solo en su gusto. Los socios son quienes lo dicen.',
      { hint: 'Quien habla no suele ser aquel de quien habla. ¿De quién se queja este grupo de socios?' }),
  ]);

  // ---------------- Lección 3 · Expresiones y frases hechas ----------------
  setLesson('pu-vo-3', [
    play('anticipa-texto', 'Antes de leer', { doc: SEMESTRE, slots: [
      ['Tema', ['el primer semestre de un estudiante en la universidad', 'cómo se calcula el promedio de notas', 'la historia de una universidad pública'], 0],
      ['Propósito', ['animar a los que entran, a partir de la propia experiencia', 'explicar el reglamento de la universidad', 'criticar a los profesores de cálculo'], 0],
      ['Tipo de texto', ['testimonio, contado en primera persona', 'noticia, con datos oficiales', 'instructivo, con pasos numerados'], 0],
    ] }, 'El título habla como un consejo («Aguanten»), lo firma un estudiante y sale en un blog de bienvenida: se espera un testimonio que cuente el primer semestre para animar a los que llegan.',
      { hint: 'Mira a quién le habla el título y dónde se publica. La ficha dice también quién escribe.' }),
    play('palabra-a-la-medida', 'Lo que quieren decir', { doc: SEMESTRE, rounds: [
      { p: 1, before: 'en la ciudad uno no puede ', word: 'dar papaya', after: '.', options: ['facilitar que lo roben', 'regalar fruta en la calle', 'ser amable', 'llegar tarde'], answer: 0 },
      { p: 2, before: 'Las primeras semanas no ', word: 'di pie con bola', after: '.', options: ['acerté en nada', 'jugué fútbol', 'caminé mucho', 'dormí bien por las noches'], answer: 0 },
      { p: 3, before: 'y que también estaban en ', word: 'la olla', after: '.', options: ['una situación difícil', 'la cocina', 'una fiesta', 'la biblioteca de la universidad'], answer: 0 },
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
      { p: 1, before: 'Lleva quince años ', word: 'recorriendo', after: ' esta cueva', options: ['andando por', 'corriendo otra vez por', 'vigilando de lejos', 'cerrando el paso a'], answer: 0 },
      { p: 1, before: 'con grupos ', word: 'reducidos', after: ' de visitantes', options: ['pequeños', 'conducidos de nuevo', 'callados', 'de estudiantes'], answer: 0 },
      { p: 2, before: 'Los guácharos son ', word: 'frugívoros', after: ':', options: ['que comen frutos', 'que vuelan de noche', 'que viven en grupo', 'que cantan fuerte'], answer: 0 },
      { p: 3, before: 'sonidos agudísimos, ', word: 'inaudibles', after: ' para nosotros', options: ['que no se pueden oír', 'muy fuertes', 'desagradables al oído', 'que se oyen lejos'], answer: 0 },
      { p: 4, before: 'En sus aguas ', word: 'subterráneas', after: ' viven peces ciegos', options: ['que corren bajo tierra', 'muy frías', 'saladas', 'que caen en cascada desde lo alto'], answer: 0 },
      { p: 4, before: 'comunidades de ', word: 'microorganismos', after: ' que los científicos', options: ['seres vivos diminutos', 'minerales brillantes', 'plantas trepadoras', 'insectos grandes y nocturnos'], answer: 0 },
    ] }, 'Frugi- (fruto, del latín frux) + -voro (que come); in- (no) + audible (que se oye); sub- (debajo) + terra (tierra); micro- (pequeño) + organismo (ser vivo): ahí las piezas dan el sentido y la frase lo confirma. Pero las piezas también engañan: en «recorriendo» y «reducidos», re- no quiere decir «de nuevo». El guía no corre otra vez: anda la cueva de un lado a otro; y un grupo reducido es pequeño, no uno que se conduce dos veces. Cuando la lectura por piezas no encaja en la frase, manda el contexto.',
      { hint: 'Parte cada palabra en piezas: un comienzo (re-, in-, sub-, micro-) y una raíz que ya conoces. Luego pon tu lectura en la frase: si no tiene sentido ahí, las piezas te engañaron y decide el contexto.' }),
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
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: CUEVA, rounds: [
      { p: 2, text: 'Los guácharos son frugívoros|:| se alimentan casi solo de frutos', options: ['explica qué quiere decir la palabra anterior', 'abre una lista de cuevas', 'marca una cita del guía', 'separa dos preguntas'], answer: 0 },
      { p: 5, text: 'los biólogos insisten en que las visitas se hagan con reglas|:| grupos pequeños, sin linternas potentes y sin tocar las paredes.', options: ['anuncia las reglas una por una', 'da la causa de las visitas', 'abre una cita de los biólogos', 'marca una ironía'], answer: 0 },
      { p: 1, text: 'Son guácharos|,| unas aves nocturnas que pasan el día dentro de las cuevas', options: ['abre una aclaración de qué son los guácharos', 'separa los elementos de una lista', 'reemplaza un verbo que no se repite', 'anuncia una pregunta'], answer: 0 },
    ] }, 'En el párrafo 2, los dos puntos traducen «frugívoros» a palabras de todos los días. En el 5, anuncian la lista de reglas. Y la coma del párrafo 1 abre una aclaración: dice qué clase de animal es un guácharo.',
      { hint: 'Mira lo que viene después del signo: ¿aclara una palabra, enumera cosas o explica quién es alguien?' }),
    play('conector-bisagra', 'Contrastes y consecuencias', { doc: CUEVA, rounds: [
      { a: 'Los murciélagos usan sonidos agudísimos, inaudibles para nosotros.', b: 'los chasquidos del guácharo se oyen perfectamente.', options: ['En cambio,', 'Por eso,', 'Además,', 'Es decir,'], answer: 0 },
      { a: 'Un exceso de luz puede hacer que las aves abandonen la cueva.', b: 'las visitas se hacen sin linternas potentes.', options: ['Por eso,', 'Aunque', 'Sin embargo,', 'Por ejemplo,'], answer: 0 },
    ] }, 'Los dos animales se comparan por lo que se oye (contraste). Y el riesgo de la luz es la razón de la regla (consecuencia).',
      { hint: 'Pregúntate si las dos ideas se oponen o si la segunda es lo que se hace por causa de la primera.' }),
    play('resumen-esencial', 'El resumen en tres renglones', { doc: CUEVA, ideas: [
      ['Los guácharos viven en la oscuridad de las cuevas y se orientan por el eco.', true],
      ['Las cuevas guardan otras formas de vida valiosas para la ciencia.', true],
      ['Por eso las visitas deben hacerse con reglas que protejan la cueva.', true],
      ['El guía lleva quince años recorriendo la cueva.', false],
      ['Los murciélagos usan sonidos tan agudos que no los oímos.', false],
      ['En el piso crecen plántulas pálidas que mueren en pocos días.', false],
    ] }, 'El texto presenta a los guácharos y cómo se orientan, muestra que la cueva guarda otra vida valiosa y concluye que hay que visitarla con reglas. El guía, los murciélagos y las plántulas son detalles que ilustran esas ideas.',
      { hint: 'La última oración del texto resume a dónde quería llegar. Las ideas esenciales llevan hasta ella.' }),
    play('cadena-causas', 'Las plántulas de la cueva', { doc: CUEVA, chain: [
      'Los guácharos tragan los frutos enteros.',
      'Las semillas que no digieren caen al suelo de la cueva.',
      'Algunas germinan en la penumbra.',
      'Las plántulas crecen unos días sin luz y luego mueren.',
    ], extra: ['Los guácharos emiten chasquidos para orientarse.', 'Una mano con bloqueador altera a los microorganismos.'] },
      'El párrafo 2 encadena los cuatro hechos: los frutos se tragan enteros, las semillas caen sin digerir, algunas germinan y las plántulas mueren porque la luz nunca llega. Los chasquidos y el bloqueador son ciertos, pero pertenecen a otras partes del texto.',
      { hint: 'Todo ocurre en un solo párrafo. Sigue lo que le pasa a una semilla desde que el guácharo se traga el fruto.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const REMENDON = {
    id: 'lec-remendon', title: 'El último remendón de la plaza',
    paras: [
      'En la esquina de la plaza de mercado, debajo de un parasol desteñido, don Isaías Mejía remienda zapatos desde 1979. Tiene una lezna, un martillo, tres hormas y una paciencia que no se compra. Por su banco han pasado botas de policía, zapatillas de bailarina y unos tacones que, según él, «tenían más kilómetros que un bus intermunicipal».',
      'Hace veinte años, en la misma cuadra trabajaban seis remendones. Hoy queda él solo. Los zapatos baratos, que se botan cuando se dañan, acabaron con el oficio más rápido que cualquier impuesto. «Ahora la gente prefiere comprar otro par que arreglar el que tiene», dice sin rabia, como quien describe el clima.',
      'Sin embargo, en los últimos años algo ha empezado a cambiar. Estudiantes de diseño vienen a preguntarle cómo se cose una suela, y una tienda de ropa reutilizada le manda cada semana una caja de botas para restaurar. Sin proponérselo, van desarmando la idea de que lo remendado es cosa de pobres. Él cobra lo mismo que antes y trabaja más que nunca. «Me tocó vivir para ver que lo viejo se volviera moda», dice, y se ríe.',
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
      Q('En «una paciencia que no se compra», se quiere decir que la paciencia de don Isaías:', ['es tan cara que pocos la pueden pagar', 'no se consigue con dinero', 'está prohibida', 'se vende en la plaza'], 1,
        'Algo que «no se compra» no se obtiene pagando: se forma con los años, como la paciencia del oficio.',
        'Piensa en qué cosas no se pueden comprar aunque uno tenga dinero.')],
    ['pu-vo-1', 'Un verbo concreto puede tener un sentido abstracto: desarmar una idea es refutarla.',
      Q('En el párrafo 3, «van desarmando la idea de que lo remendado es cosa de pobres» quiere decir que los estudiantes y la tienda:', ['van mostrando que esa idea no se sostiene', 'van reforzando la idea con sus compras', 'van desbaratando los zapatos viejos', 'van repitiendo esa idea entre sus clientes'], 0,
        'Una idea no se desarma con las manos: se desarma mostrando que no se sostiene, es decir, refutándola. Que los jóvenes de diseño y una tienda de moda busquen lo remendado contradice que sea «cosa de pobres».',
        'Reemplaza «desarmando» por cada opción y lee la frase entera. Recuerda que lo que se desarma aquí es una idea, no un objeto.')],
    ['pu-vo-2', 'Una palabra con varios sentidos se interpreta por las demás palabras de la frase.',
      Q('En el párrafo 1, la palabra «banco» se refiere a:', ['una entidad que presta dinero a los vecinos', 'el asiento y la mesa donde trabaja', 'un grupo de peces', 'un lugar donde se guarda sangre'], 1,
        'Por el banco «han pasado» botas y zapatillas: es el lugar de trabajo del remendón, no una entidad financiera.',
        'Lee qué ha pasado «por su banco».')],
    ['pu-vo-2', 'El sentido más común de una palabra suele ser la trampa.',
      Q('En «Los zapatos baratos, que se botan cuando se dañan», la palabra «botan» significa:', ['rebotan contra el piso', 'fabrican', 'calzan', 'tiran a la basura'], 3,
        'Botar, en Colombia, es tirar a la basura: los zapatos baratos se desechan en vez de arreglarse.',
        'Lee la oración siguiente: la gente prefiere comprar otro par.')],
    ['pu-vo-3', 'La exageración es una manera de decir algo con fuerza.',
      Q('«Tenían más kilómetros que un bus intermunicipal» quiere decir que los tacones:', ['estaban muy usados', 'habían viajado en bus', 'eran muy rápidos', 'eran nuevos'], 0,
        'Comparar los tacones con un bus que viaja todo el día exagera para decir que habían caminado muchísimo: estaban muy gastados.',
        'Piensa en cuánto anda un bus que va de un municipio a otro y en cómo quedan unos zapatos que caminan tanto.')],
    ['pu-vo-3', 'Una frase hecha expresa una actitud; el contexto dice cuál.',
      Q('Con la expresión «me tocó vivir para ver que lo viejo se volviera moda», don Isaías expresa:', ['tristeza por el pasado', 'obligación de trabajar más que antes por la moda', 'sorpresa ante algo que no esperaba', 'miedo al futuro'], 2,
        '«Me tocó vivir para ver» se dice ante algo inesperado; y él se ríe: le sorprende que su oficio vuelva a interesar.',
        'Fíjate en lo que hace don Isaías justo después de decirlo.')],
    ['pu-vo-4', 'Los prefijos dan pistas del sentido: re- (de nuevo), sub- (debajo), inter- (entre).',
      Q('En «ropa reutilizada», el prefijo re- significa:', ['antes', 'contra', 'por debajo', 'de nuevo'], 3,
        'Reutilizar es utilizar de nuevo: la tienda vende ropa que ya tuvo otro dueño.',
        'Piensa en otras palabras con re-: releer, rehacer, reconstruir.')],
    ['pu-vo-4', 'Las piezas orientan, pero el contexto manda: re- no siempre es «de nuevo» (restaurar, recorrer, reducir).',
      Q('En «una caja de botas para restaurar» (párrafo 3), «restaurar» significa:', ['volver a guardar en la tienda', 'reparar hasta dejar en buen estado', 'servir como en un restaurante', 'volver a vender sin arreglarlas'], 1,
        'Por las piezas, re- invita a leer «otra vez», pero no hay ningún «staurar» que se repita: lo que decide es el contexto. Don Isaías es remendón y la tienda le manda botas gastadas: restaurarlas es repararlas. Con la prueba del reemplazo, solo «reparar» deja la frase con sentido.',
        'No te quedes con lo que sugiere el re-. Pon cada opción en la frase y piensa en el oficio de don Isaías.')],
    ['pu-vo-4', 'Inter- significa «entre»: internacional, intercambio.',
      Q('Un bus «intermunicipal» es uno que:', ['circula dentro de un solo municipio', 'viaja de un municipio a otro', 'pertenece a la alcaldía', 'pasa por debajo de la ciudad'], 1,
        'Inter- es «entre»: el bus intermunicipal va entre municipios.',
        'Piensa en «internacional»: ¿dentro de un país o entre países?')],
  ]);
});
