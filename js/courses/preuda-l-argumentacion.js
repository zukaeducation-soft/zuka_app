// Preuniversitario · Comprensión lectora · mundo 9 «Argumentación, intención y tono» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): una columna que defiende la educación financiera con argumentos de datos, ejemplo y analogía y
// una objeción respondida (tesis y argumentos), una columna irónica sobre los cursos para hacerse rico (intención y tono) y una
// crónica de aniversario de una biblioteca que mezcla cifras y valoraciones (hechos y opiniones). La evaluación usa una columna
// sobre los perros en el metrocable. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const FINANZAS = {
    id: 'lec-educacion-financiera', title: 'Enseñar a no endeudarse',
    ficha: { autor: 'Columna de un economista', fuente: 'Periódico nacional, página de opinión', fecha: 'Marzo de 2026' },
    paras: [
      'Casi todos los colombianos que terminan el bachillerato saben calcular el área de un trapecio, pero muy pocos saben qué es una tasa de interés efectiva anual o cuánto terminan pagando por un celular comprado a treinta y seis cuotas. Sostengo que esa ausencia no es un detalle del currículo: es una falla que les cuesta caro a millones de familias, y que el colegio debería corregir enseñando finanzas personales desde noveno grado.',
      'El primer argumento es de datos. Según una encuesta nacional reciente, más de la mitad de los adultos no sabe calcular cuánto pagará en total por un crédito. No es extraño, entonces, que muchas familias acumulen deudas en tarjetas de crédito con intereses altísimos sin entender del todo lo que firmaron.',
      'El segundo es de experiencia. En un colegio público de Pereira, un profesor de matemáticas dedicó un semestre a enseñar presupuestos, ahorro y créditos con ejemplos de la vida real: el recibo de la luz, la cuota de la moto, la natillera del barrio. Al final, varios estudiantes les explicaron a sus padres por qué no les convenía un préstamo «gota a gota» que pensaban pedir.',
      'El tercero lo da una comparación. A nadie se le ocurriría entregarle a un joven las llaves de un carro sin enseñarle antes las señales de tránsito. Sin embargo, a los dieciocho años le entregamos una cédula con la que puede firmar créditos, sin haberle explicado nunca qué está firmando.',
      'Se dirá que el currículo ya está lleno y que no hay espacio para una materia más. Es cierto. Pero la educación financiera no necesita una materia nueva: cabe en las clases de matemáticas, donde los porcentajes y las funciones exponenciales se enseñan casi siempre con ejemplos que no le importan a nadie. Enseñarlos con el interés de una tarjeta no le quita rigor a la matemática; le da un motivo.',
      'Un país que enseña a sumar, pero no a endeudarse con cuidado, deja a sus jóvenes a merced de quien sí sabe hacer las cuentas.',
    ],
  };

  const MILLON = {
    id: 'lec-millonario-treinta-dias', title: 'Cómo hacerse millonario en treinta días (garantizado)',
    ficha: { autor: 'Columna de humor y opinión', fuente: 'Periódico nacional, página de opinión', fecha: 'Octubre de 2025' },
    paras: [
      'Esta semana, mientras buscaba una receta de arepas, el celular me ofreció seis veces el mismo milagro: un muchacho de veintitrés años, recostado en un carro rojo que probablemente no es suyo, promete enseñarme a ganar diez millones de pesos al mes «sin jefe y sin horario». Solo tengo que pagar su curso, que hoy, por ser yo, cuesta apenas novecientos noventa mil pesos. El video, por supuesto, tiene música de fondo y un reloj que cuenta hacia atrás.',
      'Decidí tomarme en serio su propuesta, por pura curiosidad científica. Vi completo el video gratuito, que dura cuarenta minutos y repite once veces la palabra «libertad». El método, por lo que alcancé a entender en el video gratuito, consiste en vender el mismo curso a otras personas, que a su vez lo venderán a otras, y así hasta el infinito. Es una idea brillante, con un solo inconveniente: en algún momento se acaban las personas.',
      'Lo admirable es la seguridad con que lo dice. No hay en sus palabras ni un «quizás» ni un «depende». Tampoco hay cifras que se puedan revisar: solo capturas de pantalla de transferencias y testimonios de gente feliz que, curiosamente, también vende el curso. Si alguien pregunta por los riesgos, la respuesta es siempre la misma: «Los que dudan se quedan pobres». Es una frase cómoda: convierte cualquier pregunta razonable en un defecto de quien la hace.',
      'No quiero burlarme de quienes caen. Muchos son jóvenes cansados de trabajos mal pagados, o padres que no ven otra salida, y la promesa de un dinero rápido es más tentadora cuanto más difícil está la vida. Conozco a una mujer que pagó el curso con la prima de diciembre y todavía no ha vendido el primero. Por eso mismo me indigna que alguien haga negocio con esa desesperación.',
      'Si un día usted ve un anuncio así, haga una prueba sencilla: busque cómo gana dinero quien le habla. Si la respuesta es «vendiéndole a usted lo mismo que le promete», ya tiene la lección completa, y gratis. Esa, al menos, sí se la garantizo.',
    ],
  };

  const CERRO = {
    id: 'lec-biblioteca-cerro', title: 'Veinte años de la biblioteca del cerro',
    ficha: { autor: 'Crónica de aniversario', fuente: 'Periódico comunitario de un barrio de Bello', fecha: 'Agosto de 2025' },
    paras: [
      'La biblioteca del barrio El Cerro abrió sus puertas el 12 de agosto de 2005, en una casa de dos pisos que antes había sido una bodega de cemento. Empezó con mil doscientos libros donados y una sola computadora; las primeras estanterías las hicieron los vecinos con tablas de la bodega. Hoy tiene once mil libros, veinte computadores y un promedio de trescientos visitantes al día.',
      'Es, sin exagerar, el lugar más importante del barrio. Ninguna otra obra pública ha cambiado tanto la vida de la gente: ni la cancha sintética, que se llena solo los fines de semana, ni el puesto de salud, que abre medio día y casi siempre tiene la fila hasta la esquina.',
      'Las cifras de la propia biblioteca muestran lo que hacen sus usuarios: el año pasado se prestaron diecinueve mil libros, se dictaron ciento cuarenta talleres y cerca de dos mil personas usaron los computadores para hacer trámites, buscar empleo o inscribirse en la universidad. Los sábados, la fila para entrar empieza antes de que abran.',
      'Su directora, Marleny Arias, lleva doce años en el cargo. Dice que el mayor logro no son los préstamos, sino que los niños que llegaban a hacer tareas hoy vuelven como profesores de los talleres; tres de ellos estudian una licenciatura en una universidad pública. A mi juicio, ese es el mejor indicador que puede tener una biblioteca, mejor que cualquier cifra.',
      'Sin embargo, el edificio ya no da abasto. En las tardes no hay sillas suficientes y los niños hacen las tareas en el piso, el techo del segundo piso se filtra cuando llueve y la alcaldía aún no ha asignado presupuesto para la ampliación que prometió en 2022. Es lamentable que una obra que funciona tan bien tenga que mendigar lo que a otras se les da sin pedirlo.',
      'Ojalá el próximo aniversario se celebre en un edificio a la altura de lo que la biblioteca ha hecho por el barrio durante estos veinte años y por los lectores que salieron de ella.',
    ],
  };

  // ---------------- Lección 1 · Tesis y argumentos ----------------
  setLesson('pu-ag-1', [
    play('mapa-del-texto', 'El esqueleto del argumento', { doc: FINANZAS, labels: ['presenta la tesis', 'argumenta con datos', 'argumenta con un ejemplo', 'argumenta con una analogía', 'responde una objeción', 'cierra reforzando la tesis', 'cuenta la historia de los bancos'], key: [0, 1, 2, 3, 4, 5] },
      'La tesis va en el párrafo 1 («Sostengo que…»). Los párrafos 2, 3 y 4 anuncian sus argumentos: datos, experiencia y comparación. «Se dirá que…» abre una objeción, y la última frase vuelve a la tesis.',
      { hint: 'Busca «Sostengo», «El primer argumento», «El segundo», «El tercero» y «Se dirá».' }),
    play('quien-lo-dice', 'Cada argumento, de qué tipo', { doc: FINANZAS, ask: 'Lleva cada parte del texto al tipo de argumento que es.', voices: ['De datos', 'De ejemplo', 'Por analogía', 'Contraargumento'], cards: [
      ['Más de la mitad de los adultos no sabe calcular cuánto pagará por un crédito.', 0],
      ['Un profesor de Pereira enseñó presupuestos con el recibo de la luz.', 1],
      ['Nadie entrega las llaves de un carro sin enseñar antes las señales de tránsito.', 2],
      ['El currículo ya está lleno y no hay espacio para otra materia.', 3],
    ] }, 'La encuesta da cifras; Pereira es un caso; el carro y la cédula comparan dos situaciones con la misma estructura; y el currículo lleno es la objeción que el autor responde.',
      { hint: 'Pregúntate: ¿es una cifra, un caso concreto, una comparación con otra situación o una objeción a la tesis?' }),
    play('balanza-argumento', 'Lo que pesa sobre la tesis', { doc: FINANZAS, thesis: 'El colegio debería enseñar finanzas personales desde noveno grado.', cards: [
      ['Más de la mitad de los adultos no sabe calcular cuánto pagará por un crédito.', 0],
      ['Unos estudiantes de Pereira convencieron a sus padres de no pedir un préstamo gota a gota.', 0],
      ['Un estudio muestra que los cursos de finanzas en el colegio no cambian cómo se endeudan los adultos.', 1],
      ['Los jóvenes que reciben clases de finanzas se endeudan igual que los demás.', 1],
      ['El área del trapecio se enseña en el colegio.', null],
    ] }, 'La encuesta muestra la necesidad y Pereira muestra que enseñar funciona. Si los cursos no cambiaran nada, la propuesta perdería su razón. El trapecio solo aparece como contraste en la introducción.',
      { hint: 'Para debilitar la tesis, hace falta mostrar que enseñar finanzas no sirve o no es necesario.' }),
    play('lupa-evidencia', 'Lo que dice el autor', { doc: FINANZAS, cards: [
      ['El autor propone enseñar finanzas desde noveno grado.', 0],
      ['En Pereira se enseñó con ejemplos de la vida real.', 0],
      ['El autor cree que muchos ejemplos de las clases de matemáticas no interesan.', 1],
      ['El autor propone crear una materia nueva de finanzas.', 2],
      ['Todos los adultos colombianos tienen deudas en tarjetas.', 2],
    ] }, 'Las dos primeras están escritas. Lo de los ejemplos sale de «ejemplos que no le importan a nadie». El autor dice que no hace falta una materia nueva, y la encuesta habla de «más de la mitad», no de todos.',
      { hint: 'Revisa el párrafo 5: ¿qué dice el autor sobre una materia nueva?' }),
    play('conector-bisagra', 'Cómo se encadenan los argumentos', { doc: FINANZAS, rounds: [
      { a: 'Más de la mitad de los adultos no sabe calcular cuánto pagará por un crédito.', b: 'muchas familias acumulan deudas sin entender lo que firmaron.', options: ['Por eso,', 'Aunque', 'En cambio,', 'Es decir,'], answer: 0 },
      { a: 'Nadie entrega las llaves de un carro sin enseñar las señales de tránsito.', b: 'a los dieciocho años entregamos una cédula para firmar créditos sin explicar nada.', options: ['Sin embargo,', 'Por lo tanto,', 'Además,', 'Por ejemplo,'], answer: 0 },
      { a: 'El currículo ya está lleno; es cierto.', b: 'la educación financiera cabe en las clases de matemáticas.', options: ['Pero', 'Por eso,', 'Además,', 'Es decir,'], answer: 0 },
    ] }, 'No saber calcular lleva a endeudarse sin entender (consecuencia). La analogía funciona por contraste: con el carro sí enseñamos, con la cédula no. Y la objeción se acepta para luego responderla (contraste).',
      { hint: 'En una objeción respondida, el autor reconoce algo y luego gira. ¿Qué conector marca ese giro?' }),
    play('signos-que-hablan', 'Signos de la columna', { doc: FINANZAS, rounds: [
      { p: 3, text: 'por qué no les convenía un préstamo |«|gota a gota» que pensaban pedir', options: ['marca el nombre popular de un tipo de préstamo', 'cita al profesor de Pereira', 'abre una pregunta', 'marca el título de un libro'], answer: 0 },
      { p: 1, text: 'esa ausencia no es un detalle del currículo|:| es una falla', options: ['anuncia lo que el autor sí cree que es', 'abre una lista', 'cita una ley', 'marca ironía'], answer: 0 },
    ] }, 'Las comillas marcan «gota a gota», el nombre popular de los préstamos informales. Los dos puntos anuncian la tesis: la ausencia es una falla.',
      { hint: 'Fíjate qué hay entre las comillas: ¿palabras de una persona o un nombre que usa la gente?' }),
    play('resume-parrafo', 'Cada argumento en una frase', { doc: FINANZAS, paras: [2, 3, 4, 5], options: [
      'Los datos muestran que muchos adultos no entienden sus créditos.',
      'Una experiencia en un colegio muestra que enseñar finanzas funciona.',
      'Dejamos firmar créditos sin enseñar antes lo que se firma.',
      'No hace falta una materia nueva: cabe en matemáticas.',
      'Los bancos engañan a sus clientes.',
      'Las matemáticas del colegio no sirven para nada.',
    ], key: [0, 1, 2, 3] }, 'Cada resumen recoge un argumento o la respuesta a la objeción. El autor no acusa a los bancos ni desprecia las matemáticas: propone enseñarlas con otros ejemplos.',
      { hint: 'Descarta los resúmenes que exageran: el autor critica los ejemplos de las clases, no las matemáticas.' }),
  ]);

  // ---------------- Lección 2 · Intención y tono ----------------
  setLesson('pu-ag-2', [
    play('anticipa-texto', 'Antes de leer: ¿para qué escribe?', { doc: MILLON, slots: [
      ['Intención probable', ['criticar con humor un tipo de anuncio', 'enseñar a invertir', 'vender un curso'], 0],
      ['Tono esperado', ['irónico', 'solemne', 'técnico'], 0],
      ['Género', ['columna de opinión', 'manual de instrucciones', 'noticia'], 0],
    ] }, 'Una «columna de humor y opinión» con un título que promete millones en treinta días «(garantizado)» anuncia ironía: el autor va a criticar ese tipo de promesas, no a hacerlas.',
      { hint: 'El título promete algo imposible y lo publica una columna de humor. ¿Lo dice en serio?' }),
    play('termometro-tono', 'Tres tonos en una columna', { doc: MILLON, rounds: [
      { frag: 'Es una idea brillante, con un solo inconveniente: en algún momento se acaban las personas.', scale: ['irónico', 'admirado', 'técnico', 'triste'], answer: 0 },
      { frag: 'No quiero burlarme de quienes caen.', scale: ['comprensivo', 'despectivo', 'burlón', 'asustado'], answer: 0 },
      { frag: 'Por eso mismo me indigna que alguien haga negocio con esa desesperación.', scale: ['indignado', 'burlón', 'indiferente', 'eufórico'], answer: 0 },
    ] }, 'Llamar «brillante» a un método que se agota es ironía. Con quienes caen, el autor es comprensivo; con quien vende el curso, indignado. Un texto puede cambiar de tono según de quién hable.',
      { hint: 'El tono cambia según de quién habla el autor: del método, de las víctimas o del vendedor.' }),
    play('lupa-evidencia', 'Lo que dice y lo que no', { doc: MILLON, cards: [
      ['El curso cuesta novecientos noventa mil pesos.', 0],
      ['El autor cree que el método no puede funcionar para todos.', 1],
      ['El autor no pagó el curso.', 1],
      ['El autor desprecia a las personas que compran estos cursos.', 2],
      ['El muchacho del anuncio es dueño del carro rojo.', 2],
    ] }, 'El precio está escrito. Si «se acaban las personas», el método no sirve para todos; y el autor solo vio «el video gratuito». Dice expresamente que no quiere burlarse de quienes caen, y sobre el carro dice lo contrario: «probablemente no es suyo».',
      { hint: 'Una ironía no se lee al pie de la letra. Y revisa lo que el autor dice de quienes caen.' }),
    play('balanza-argumento', '¿Engaño o negocio?', { doc: MILLON, thesis: 'Los cursos para hacerse rico rápido son un engaño que se aprovecha de la desesperación.', cards: [
      ['El método consiste en vender el mismo curso a otras personas.', 0],
      ['No hay cifras que se puedan revisar, solo capturas y testimonios.', 0],
      ['Los testimonios felices son de personas que también venden el curso.', 0],
      ['Una auditoría independiente muestra que la mayoría de quienes compraron el curso ganan lo prometido.', 1],
      ['El autor buscaba una receta de arepas.', null],
    ] }, 'Un método que vive de venderse a sí mismo, sin cifras revisables y con testigos interesados, apoya la tesis. Una auditoría que confirmara las ganancias la debilitaría. La receta de arepas solo sitúa la escena.',
      { hint: 'Pregúntate si cada oración muestra una señal de engaño, una prueba de que no lo es o nada.' }),
    play('caso-nuevo', 'La prueba del autor, en otros casos', { doc: MILLON, principle: 'Antes de creer una promesa de dinero fácil, hay que averiguar cómo gana dinero quien la hace.', cards: [
      ['Antes de entrar a una natillera que promete pagar el triple, una señora pregunta de dónde sale ese dinero.', true],
      ['Un joven revisa quién financia la página que le recomienda un préstamo.', true],
      ['Un estudiante compara dos computadores por sus características técnicas.', false],
      ['Una familia ahorra cada mes en una alcancía.', false],
    ] }, 'La señora y el joven aplican la prueba: averiguan cómo gana quien les promete. Comparar computadores o ahorrar no tiene que ver con creer promesas de dinero fácil.',
      { hint: 'Busca los casos en que alguien desconfía de una promesa y averigua quién gana con ella.' }),
    play('mapa-del-texto', 'Cómo avanza la ironía', { doc: MILLON, labels: ['presenta el anuncio', 'explica el método con ironía', 'muestra las señales de engaño', 'aclara a quién no critica', 'da un consejo al lector', 'cuenta su propia fortuna'], key: [0, 1, 2, 3, 4] },
      'Del anuncio al consejo: el autor presenta la promesa, se burla del método, muestra las señales del engaño, aclara que no ataca a las víctimas y termina con una prueba para el lector.',
      { hint: 'El párrafo 4 cambia de tono: empieza con «No quiero burlarme». ¿Qué aclara ahí?' }),
    play('signos-que-hablan', 'Comillas con intención', { doc: MILLON, rounds: [
      { p: 1, text: 'ganar diez millones de pesos al mes |«|sin jefe y sin horario»', options: ['cita las palabras del anuncio, con distancia', 'marca el título de un libro', 'abre la voz del autor', 'señala una pregunta'], answer: 0 },
      { p: 3, text: 'No hay en sus palabras ni un |«|quizás» ni un «depende».', options: ['presenta palabras como palabras: las que el vendedor nunca usa', 'cita a un experto', 'marca un título', 'indica una pregunta retórica'], answer: 0 },
    ] }, 'Las primeras comillas copian la promesa del anuncio, y el autor se distancia de ella. Las segundas no citan a nadie: muestran palabras que faltan en el discurso del vendedor.',
      { hint: 'Las comillas pueden citar a alguien, distanciarse de lo citado o mostrar una palabra como palabra. ¿Cuál es cada caso?' }),
  ]);

  // ---------------- Lección 3 · Hechos y opiniones ----------------
  setLesson('pu-ag-3', [
    play('quien-lo-dice', '¿Se puede comprobar?', { doc: CERRO, ask: 'Lleva cada afirmación a «Hecho» si se puede comprobar, o a «Opinión» si es una valoración.', voices: ['Hecho comprobable', 'Opinión'], cards: [
      ['La biblioteca abrió el 12 de agosto de 2005.', 0],
      ['Hoy tiene once mil libros.', 0],
      ['El año pasado se prestaron diecinueve mil libros.', 0],
      ['El techo del segundo piso se filtra cuando llueve.', 0],
      ['Es el lugar más importante del barrio.', 1],
      ['Ese es el mejor indicador que puede tener una biblioteca.', 1],
      ['Es lamentable que tenga que mendigar el presupuesto.', 1],
    ] }, 'Una fecha, una cantidad o una gotera se pueden verificar. «Lo más importante», «el mejor» y «lamentable» son valoraciones del autor: alguien podría pensar distinto.',
      { hint: 'Busca palabras que valoran: «más importante», «mejor», «lamentable». Lo que se puede contar o medir es un hecho.' }),
    play('palabra-a-la-medida', 'Palabras que valoran', { doc: CERRO, rounds: [
      { p: 5, before: 'el edificio ya no ', word: 'da abasto', after: '.', options: ['alcanza para todos', 'se abre', 'tiene libros', 'cobra la entrada'], answer: 0 },
      { p: 5, before: 'tenga que ', word: 'mendigar', after: ' lo que a otras se les da', options: ['pedir con insistencia, como un favor', 'robar', 'comprar', 'prestar'], answer: 0 },
    ] }, '«No dar abasto» es no alcanzar para lo que se necesita: faltan sillas y espacio. Y «mendigar» carga una opinión: la biblioteca tiene que pedir como favor lo que debería recibir.',
      { hint: 'Lee lo que sigue a cada expresión: faltan sillas; a otras obras se les da «sin pedirlo».' }),
    play('termometro-tono', 'Datos con tono y datos sin tono', { doc: CERRO, rounds: [
      { frag: 'el año pasado se prestaron diecinueve mil libros, se dictaron ciento cuarenta talleres', scale: ['informativo', 'apasionado', 'irónico', 'triste'], answer: 0 },
      { frag: 'Es lamentable que una obra que funciona tan bien tenga que mendigar lo que a otras se les da sin pedirlo.', scale: ['indignado', 'neutral', 'burlón', 'eufórico'], answer: 0 },
    ] }, 'Las cifras se presentan sin adjetivos: el tono es informativo. «Lamentable» y «mendigar», en cambio, dejan ver la indignación del autor.',
      { hint: 'Busca adjetivos o verbos que valoren. Si no hay ninguno, el tono es informativo.' }),
    play('lupa-evidencia', 'Lo que dice la crónica', { doc: CERRO, cards: [
      ['La biblioteca empezó con una sola computadora.', 0],
      ['La directora lleva doce años en el cargo.', 0],
      ['El número de libros se multiplicó por más de nueve.', 1],
      ['La alcaldía no ha cumplido una promesa de 2022.', 1],
      ['La cancha sintética nunca se usa.', 2],
      ['La biblioteca recibe el mayor presupuesto del barrio.', 2],
    ] }, 'Las dos primeras están escritas. De mil doscientos a once mil libros es más de nueve veces; y una ampliación prometida en 2022 sin presupuesto es una promesa incumplida. La cancha se llena los fines de semana, y el texto dice que la biblioteca tiene que «mendigar».',
      { hint: 'Para la tercera tarjeta, haz la cuenta con los dos datos del párrafo 1.' }),
    play('balanza-argumento', '¿Ampliar ya?', { doc: CERRO, thesis: 'La alcaldía debería financiar ya la ampliación de la biblioteca.', cards: [
      ['En las tardes no hay sillas suficientes.', 0],
      ['Cerca de dos mil personas usaron los computadores el año pasado.', 0],
      ['El techo del segundo piso se filtra.', 0],
      ['Un estudio muestra que las visitas a la biblioteca vienen bajando desde hace tres años.', 1],
      ['La casa antes fue una bodega de cemento.', null],
    ] }, 'La falta de sillas, el uso intenso y la gotera muestran la necesidad. Si las visitas estuvieran bajando, ampliar sería menos urgente. El pasado de la casa no pesa en la decisión.',
      { hint: 'Los hechos también sirven para argumentar. ¿Cuáles muestran que hace falta más espacio y cuál que no?' }),
    play('mapa-del-texto', 'Hechos y opiniones en orden', { doc: CERRO, labels: ['da los datos del origen y de hoy', 'valora la biblioteca frente a otras obras', 'presenta cifras de uso', 'recoge la voz de la directora y la opinión del autor', 'señala los problemas actuales', 'cierra con un deseo', 'narra la vida de la directora'], key: [0, 1, 2, 3, 4, 5] },
      'La crónica alterna hechos (párrafos 1 y 3) y valoraciones (2 y 4), señala los problemas (5) y cierra con un deseo (6). De la directora solo se dice cuánto lleva y qué piensa.',
      { hint: 'Fíjate en qué párrafos hay cifras y en cuáles hay palabras como «más importante» o «a mi juicio».' }),
    play('donde-buscar', 'Vuelve al párrafo', { doc: CERRO, cards: [
      ['¿Cuándo abrió la biblioteca?', [1]], ['¿Con qué otras obras se compara?', [2]], ['¿Cuántos talleres se dictaron?', [3]],
      ['¿Cuál es, según la directora, el mayor logro?', [4]], ['¿Qué problemas tiene el edificio?', [5]],
    ] }, 'Origen (1), comparación (2), cifras de uso (3), la directora (4) y los problemas (5).',
      { hint: 'Ubica la palabra clave de cada pregunta: abrió, otra obra, talleres, directora, edificio.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const PERROS = {
    id: 'lec-perros-metrocable', title: 'Perros en el cable',
    paras: [
      'Desde enero, el metrocable permite subir con perros de cualquier tamaño, siempre que lleven bozal y correa. La medida ha dividido a los usuarios, y a mi juicio es una de las mejores decisiones que ha tomado la empresa en años.',
      'Para muchas familias de las laderas, el perro no es un lujo sino parte de la casa, y llevarlo al veterinario implicaba pagar un taxi que cuesta lo mismo que un mercado pequeño. Según la empresa, en los primeros tres meses viajaron más de cuatro mil perros y no se registró ningún incidente.',
      'Hay quienes temen las mordidas o las alergias, y es razonable. Pero el bozal resuelve lo primero, y para lo segundo bastaría con reservar una de cada diez cabinas sin animales, como ya se hace en otras ciudades.',
      'Que un perro viaje en cable no debería escandalizar a nadie. Lo verdaderamente escandaloso era que, durante años, quienes no tenían carro tuvieran que dejar solo a su animal enfermo.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: PERROS, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-argumentacion', 'Evaluación · Argumentación, intención y tono', [
    ['pu-ag-1', 'La tesis es lo que el autor defiende; suele ir con «a mi juicio», «creo», «sostengo».',
      Q('La tesis del autor es que:', ['los perros deben llevar bozal', 'las alergias son un problema grave', 'permitir perros en el metrocable fue una buena decisión', 'el taxi es muy caro'], 2,
        '«A mi juicio es una de las mejores decisiones»: eso es lo que el texto defiende. El bozal, las alergias y el taxi son detalles o argumentos.',
        'Busca la frase con «a mi juicio».')],
    ['pu-ag-1', 'Un argumento de datos se apoya en cifras que se pueden comprobar.',
      Q('El dato de los cuatro mil perros que viajaron sin incidentes es un argumento:', ['de autoridad', 'de datos', 'por analogía', 'de experiencia personal'], 1,
        'Usa una cifra para mostrar que la medida no trajo problemas.',
        'Pregúntate si el argumento se apoya en un experto, en una cifra, en una comparación o en algo que vivió el autor.')],
    ['pu-ag-2', 'La intención es para qué se escribe: informar, persuadir, criticar, narrar.',
      Q('La intención principal del texto es:', ['informar los horarios del metrocable', 'vender bozales', 'narrar un viaje en cable', 'persuadir de que la medida es buena'], 3,
        'El autor da su opinión, la apoya con razones y responde a una objeción: quiere convencer.',
        'Fíjate en lo que hace el autor con la objeción del párrafo 3.')],
    ['pu-ag-2', 'El tono se nota en las palabras que elige el autor.',
      Q('En el párrafo 4, el tono del autor es:', ['indignado ante una injusticia anterior', 'temeroso', 'burlón con los dueños de perros', 'neutral'], 0,
        '«Lo verdaderamente escandaloso» muestra indignación por lo que pasaba antes de la medida.',
        'Busca la palabra que repite el autor en el párrafo 4.')],
    ['pu-ag-3', 'Una opinión valora y no se puede comprobar; un hecho sí.',
      Q('Es una opinión, y no un hecho:', ['Desde enero se permite subir perros con bozal y correa', 'En los primeros tres meses viajaron más de cuatro mil perros', 'Es una de las mejores decisiones que ha tomado la empresa en años', 'La medida exige bozal y correa'], 2,
        '«Una de las mejores» es una valoración del autor. Lo demás se puede verificar.',
        'Busca la opción con una palabra que valore.')],
    ['pu-ag-3', 'Un hecho atribuido a una fuente («según la empresa») se puede comprobar en esa fuente.',
      Q('Es un hecho que se puede comprobar:', ['Según la empresa, en tres meses no se registró ningún incidente', 'La medida es razonable', 'Lo escandaloso era dejar solo al animal enfermo', 'Que un perro viaje en cable no debería escandalizar'], 0,
        'Los registros de la empresa se pueden revisar. Las demás opciones valoran: «razonable», «escandaloso», «no debería».',
        'Descarta las opciones con palabras como «razonable», «escandaloso» o «debería».')],
  ]);
});
