// Preuniversitario · Comprensión lectora · mundo 12 «Lenguaje figurado» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): una crónica de Medellín de madrugada llena de metáforas, comparaciones, personificaciones e
// hipérboles (figuras literarias) y un «elogio» del trancón que dice lo contrario de lo que piensa (ironía). La evaluación usa el
// recuerdo de un abuelo pescador del río Cauca. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const MADRUGADA = {
    id: 'lec-ciudad-cinco', title: 'La ciudad a las cinco',
    ficha: { autor: 'Crónica de un escritor de Medellín', fuente: 'Suplemento literario de un periódico', fecha: 'Enero de 2025' },
    paras: [
      'A las cinco de la mañana, Medellín todavía no se ha puesto los zapatos. Las montañas que la rodean son un abrazo oscuro, y las luces de las laderas parecen un pesebre que alguien se olvidó de recoger en enero. En el centro, los primeros buses bostezan en los paraderos con las puertas abiertas, y un perro callejero cruza la avenida vacía como si fuera el dueño de la ciudad.',
      'Los que madrugan forman una ciudad aparte. Hay panaderos con los brazos blancos de harina, como estatuas que se movieran; vigilantes que llevan mil noches sin dormir; vendedoras de tinto que empujan sus carritos cuesta arriba con una paciencia de piedra. Nadie habla mucho a esa hora: las palabras también están dormidas, y los saludos se hacen con la cabeza.',
      'A las seis, el sol asoma por el oriente y la ciudad empieza a desperezarse. El río, que de noche era una cinta negra, se vuelve de plata por unos minutos. Las palomas del parque Berrío ocupan sus puestos como funcionarias puntuales, y el metro, ese gusano de acero, empieza a tragarse a la gente por montones. En los vagones, muchos dormitan de pie, agarrados de las barras, como si todavía estuvieran soñando con la cama.',
      'A las siete ya no queda nada de aquella ciudad en voz baja. Los pitos, los gritos de los vendedores y la música de los almacenes llenan cada rincón, y uno tiene la impresión de que todo el mundo llegó tarde a la misma cita. Los semáforos cambian de color sin que nadie los mire, y hasta los edificios parecen tener prisa. Nadie se acuerda ya del perro de las cinco ni de las palabras dormidas.',
      'Pero quien vio la ciudad a las cinco sabe que ella también tiene un rato de silencio, y que lo guarda solo para los que madrugan. Es un secreto pequeño, de una hora apenas, que no sale en las postales ni en los noticieros. Para conocerlo no hay que pagar nada: basta con poner el despertador un poco antes que el sol.',
    ],
  };

  const TRANCON = {
    id: 'lec-elogio-trancon', title: 'Elogio del trancón',
    ficha: { autor: 'Columna de humor', fuente: 'Periódico de Medellín, página de opinión', fecha: 'Noviembre de 2025' },
    paras: [
      'Quiero dedicar estas líneas a una institución que no recibe el reconocimiento que merece: el trancón de la autopista a las seis de la tarde. Mientras otras ciudades desperdician su tiempo en trenes rápidos y carriles exclusivos, nosotros hemos sabido conservar una tradición que nos regala, cada día, hora y media de reflexión obligatoria. Todos los días, sin falta: ni el colegio fue nunca tan puntual.',
      'Gracias al trancón, miles de personas han descubierto la música de los vendedores ambulantes, el arte de comer empanada sin soltar el volante y la paciencia, esa virtud que los monjes buscan durante años en las montañas y que nosotros encontramos entre una buseta y un camión de gaseosas. ¿Qué más se le puede pedir a una vía? Hay quienes han aprendido a leer, a rezar el rosario completo y hasta a cortarse las uñas mientras esperan que se mueva el carro de adelante.',
      'Hay quienes se quejan, claro. Dicen que pasan más tiempo en el carro que con sus hijos, que el humo les irrita los ojos y que llegan a la casa sin ganas de nada. Son, sin duda, personas que no han entendido la belleza de quedarse quietas durante cuarenta minutos frente a la misma valla de un colchón. Allá ellos, que se lo pierden.',
      'Las autoridades, sabias como siempre, han decidido proteger esta tradición. Llevan quince años estudiando la ampliación de la vía, y es de esperar que la sigan estudiando quince más, por si acaso. Construirla de afán sería, como todo el mundo sabe, un error imperdonable. Mientras tanto, cada año se venden más carros y la vía sigue midiendo lo mismo, lo cual garantiza que la tradición no corra ningún peligro.',
      'Así que la próxima vez que esté detenido en la autopista, no se desespere ni pite por gusto. Apague el radio, mire a su alrededor y respire hondo el aire fresco del exhosto del carro de adelante: está rodeado de miles de personas que, como usted, están aprovechando al máximo su vida.',
    ],
  };

  // ---------------- Lección 1 · Figuras literarias ----------------
  setLesson('pu-lf-1', [
    play('quien-lo-dice', 'Cada figura en su lugar', { doc: MADRUGADA, ask: 'Lleva cada expresión de la crónica a la figura que usa.', voices: ['Metáfora', 'Comparación', 'Personificación', 'Hipérbole'], cards: [
      ['Las montañas son un abrazo oscuro.', 0],
      ['El metro, ese gusano de acero.', 0],
      ['Panaderos blancos de harina, como estatuas que se movieran.', 1],
      ['Las luces parecen un pesebre olvidado.', 1],
      ['Los buses bostezan en los paraderos.', 2],
      ['La ciudad todavía no se ha puesto los zapatos.', 2],
      ['Vigilantes que llevan mil noches sin dormir.', 3],
    ] }, 'La metáfora dice que A es B (las montañas son un abrazo); la comparación usa «como» o «parecen»; la personificación da gestos humanos a cosas (bostezar, ponerse zapatos); y la hipérbole exagera (mil noches sin dormir).',
      { hint: 'Busca las pistas: «como» o «parece» (comparación), un gesto humano en una cosa (personificación), una exageración imposible (hipérbole).' }),
    play('palabra-a-la-medida', 'Lo que quieren decir las figuras', { doc: MADRUGADA, rounds: [
      { p: 1, before: 'Medellín todavía no se ha ', word: 'puesto los zapatos', after: '.', options: ['empezado su día', 'comprado ropa', 'salido a caminar', 'dormido'], answer: 0 },
      { p: 2, before: 'empujan sus carritos cuesta arriba con una ', word: 'paciencia de piedra', after: '.', options: ['paciencia enorme, que no se cansa', 'paciencia dura y fría', 'paciencia de escultor', 'poca paciencia'], answer: 0 },
      { p: 3, before: 'el metro, ese gusano de acero, empieza a ', word: 'tragarse', after: ' a la gente por montones', options: ['recibir en sus vagones', 'comerse', 'asustar', 'olvidar'], answer: 0 },
    ] }, 'En el examen importa lo que significa la figura: la ciudad que no se ha puesto los zapatos todavía no empieza el día; la paciencia de piedra es firme e incansable; y el metro «se traga» a la gente porque la recibe a montones en sus vagones.',
      { hint: 'No leas la figura al pie de la letra: pregúntate qué idea real quiere transmitir.' }),
    play('lupa-evidencia', 'Figurado o literal', { doc: MADRUGADA, cards: [
      ['A las cinco de la mañana ya hay buses en los paraderos.', 0],
      ['A las siete hay mucho ruido en el centro.', 0],
      ['El río cambia de color con la luz del amanecer.', 1],
      ['El autor prefiere la ciudad de la madrugada.', 1],
      ['Los vigilantes llevan exactamente mil noches sin dormir.', 2],
      ['Las palomas trabajan para la alcaldía.', 2],
    ] }, 'Los buses y el ruido están dichos (con figuras, pero dichos). Que el río cambia con la luz se entiende de «se vuelve de plata» al salir el sol; y la preferencia del autor, del «secreto» que guarda la madrugada. Las mil noches son una exageración, y las palomas son «como» funcionarias: no lo son.',
      { hint: 'Una hipérbole o una comparación no se toman al pie de la letra.' }),
    play('termometro-tono', 'El tono de la crónica', { doc: MADRUGADA, rounds: [
      { frag: 'Nadie habla mucho a esa hora: las palabras también están dormidas, y los saludos se hacen con la cabeza.', scale: ['poético', 'técnico', 'agresivo', 'irónico'], answer: 0 },
      { frag: 'Pero quien vio la ciudad a las cinco sabe que ella también tiene un rato de silencio, y que lo guarda solo para los que madrugan.', scale: ['afectuoso', 'burlón', 'técnico', 'alarmado'], answer: 0 },
    ] }, 'Las palabras «dormidas» son una imagen poética. Y el cierre habla de la ciudad con cariño, como de alguien que guarda un secreto.',
      { hint: 'Fíjate en cómo trata el autor a la ciudad: ¿como un objeto o como alguien a quien quiere?' }),
    play('hilo-referente', '¿Qué guarda la ciudad?', { doc: MADRUGADA, rounds: [
      { p: 5, text: 'Pero quien vio |la ciudad| a las cinco sabe que |ella| también tiene |un rato de silencio|, y que |lo| guarda solo para |los que madrugan|', from: 7, answer: 5 },
      { p: 5, text: 'Pero quien vio |la ciudad| a las cinco sabe que |ella| también tiene |un rato de silencio|, y que |lo| guarda solo para |los que madrugan|', from: 3, answer: 1 },
    ] }, 'Lo que la ciudad guarda es su rato de silencio. Y «ella» es la ciudad: la crónica la trata como a una persona que guarda secretos.',
      { hint: '«Lo» va en masculino singular; «ella», en femenino singular. Busca hacia atrás.' }),
    play('caso-nuevo', '¿Hay personificación?', { doc: MADRUGADA, principle: 'Una personificación les da acciones o rasgos humanos a cosas, lugares o animales.', ask: '¿En cuáles frases hay personificación?', cards: [
      ['El viento golpeaba la puerta con rabia.', true],
      ['La nevera ronca toda la noche.', true],
      ['La casa era grande y vieja.', false],
      ['Corrió como un rayo.', false],
    ] }, 'Sentir rabia y roncar son cosas de personas: el viento y la nevera están personificados. «Grande y vieja» describe sin figura, y «como un rayo» es una comparación.',
      { hint: 'Pregúntate si la cosa hace algo que solo haría una persona.' }),
    play('mapa-del-texto', 'La crónica hora por hora', { doc: MADRUGADA, labels: ['la ciudad a las cinco', 'los que madrugan', 'la ciudad a las seis', 'la ciudad a las siete', 'el secreto de la madrugada', 'las rutas del metro'], key: [0, 1, 2, 3, 4] },
      'La crónica sigue el reloj: cinco, la gente de la madrugada, seis y siete, y cierra con el secreto que solo ven los que madrugan. No describe rutas.',
      { hint: 'Busca las horas al comienzo de los párrafos.' }),
  ]);

  // ---------------- Lección 2 · Ironía ----------------
  setLesson('pu-lf-2', [
    play('termometro-tono', 'Lo que dice y lo que piensa', { doc: TRANCON, rounds: [
      { frag: 'Las autoridades, sabias como siempre, han decidido proteger esta tradición.', scale: ['irónico', 'respetuoso', 'técnico', 'temeroso'], answer: 0 },
      { frag: '¿Qué más se le puede pedir a una vía?', scale: ['sarcástico', 'curioso', 'preocupado', 'neutral'], answer: 0 },
      { frag: 'está rodeado de miles de personas que, como usted, están aprovechando al máximo su vida.', scale: ['irónico', 'sincero', 'solemne', 'asustado'], answer: 0 },
    ] }, 'Llamar «sabias» a autoridades que llevan quince años sin hacer la obra es ironía. La pregunta finge admiración por una vía que no funciona. Y nadie aprovecha su vida detenido en un trancón: el autor dice lo contrario de lo que piensa.',
      { hint: 'Compara lo que dice cada frase con los hechos del texto: quince años de estudio, cuarenta minutos quietos, humo.' }),
    play('caso-nuevo', '¿Hay ironía?', { doc: TRANCON, principle: 'La ironía dice lo contrario de lo que se piensa, y los hechos que la rodean la delatan.', ask: '¿En cuáles frases hay ironía?', cards: [
      ['«¡Qué puntual!», a quien llega una hora tarde.', true],
      ['«Excelente servicio», después de esperar tres horas por un recibo equivocado.', true],
      ['«Qué lindo día», en una mañana soleada de paseo.', false],
      ['«Gracias por ayudarme», a quien cargó las bolsas.', false],
    ] }, 'En las dos primeras, lo que se dice choca con lo que pasó: eso es ironía. En las otras dos, las palabras y los hechos coinciden.',
      { hint: 'Compara lo que se dice con lo que pasó. Si chocan, hay ironía.' }),
    play('balanza-argumento', 'La tesis escondida', { doc: TRANCON, ask: 'La tesis real del autor está detrás de la ironía. Pesa estas oraciones frente a ella.', thesis: 'El trancón de la autopista es un problema que las autoridades no han querido resolver.', cards: [
      ['Llevan quince años estudiando la ampliación de la vía.', 0],
      ['Hay quienes pasan más tiempo en el carro que con sus hijos.', 0],
      ['Cada año se venden más carros y la vía sigue midiendo lo mismo.', 0],
      ['La vía se amplió el año pasado y el trancón desapareció.', 1],
      ['En la autopista hay vallas de colchones.', null],
    ] }, 'Los quince años de estudio, el tiempo perdido y los carros que aumentan muestran el problema y la inacción. Si la vía ya se hubiera ampliado y el trancón desaparecido, la tesis sería falsa. La valla del colchón es un detalle cómico.',
      { hint: 'Primero saca la tesis real: lo contrario de lo que dice el «elogio». Luego pesa cada oración.' }),
    play('lupa-evidencia', 'Leer la ironía', { doc: TRANCON, cards: [
      ['La ampliación de la vía lleva quince años en estudio.', 0],
      ['El trancón ocurre a las seis de la tarde.', 0],
      ['El autor critica a las autoridades.', 1],
      ['El autor quiere de verdad que el trancón continúe.', 2],
      ['El autor se burla de quienes se quejan.', 2],
    ] }, 'Los quince años y la hora están escritos. La crítica a las autoridades se deduce de la ironía. Al pie de la letra, el autor elogia el trancón y se burla de los que se quejan; leído con la ironía, piensa justo lo contrario: está del lado de ellos.',
      { hint: 'En un texto irónico, lo que se dice al pie de la letra no es lo que el autor piensa.' }),
    play('palabra-a-la-medida', 'Palabras con doble filo', { doc: TRANCON, rounds: [
      { p: 1, before: 'que nos regala, cada día, hora y media de reflexión ', word: 'obligatoria', after: '.', options: ['que no se puede evitar', 'voluntaria', 'agradable', 'pagada'], answer: 0 },
      { p: 4, before: 'Construirla de afán sería, como todo el mundo sabe, un error ', word: 'imperdonable', after: '.', options: ['que no se puede perdonar', 'pequeño', 'útil', 'frecuente'], answer: 0 },
    ] }, '«Regala» y «obligatoria» chocan: nadie regala algo obligatorio; la ironía está en ese choque. Y llamar «imperdonable» a construir rápido una vía que lleva quince años en estudio es decir lo contrario de lo que se piensa.',
      { hint: 'Busca el choque entre la palabra y lo que la rodea: un regalo obligatorio, un error que sería hacer la obra.' }),
    play('mapa-del-texto', 'Cómo avanza el elogio', { doc: TRANCON, labels: ['elogia el trancón en broma', 'enumera falsos beneficios', 'finge burlarse de quienes se quejan', 'critica con ironía a las autoridades', 'cierra con un falso consejo', 'propone una solución técnica'], key: [0, 1, 2, 3, 4] },
      'Todo el texto finge un elogio: lo presenta, enumera beneficios absurdos, se «burla» de quienes se quejan, «elogia» a las autoridades y aconseja disfrutar el humo. No propone ninguna solución técnica.',
      { hint: 'En cada párrafo, pregúntate qué critica el autor en realidad.' }),
    play('signos-que-hablan', 'Signos de la ironía', { doc: TRANCON, rounds: [
      { p: 2, text: '|¿|Qué más se le puede pedir a una vía?', options: ['abre una pregunta retórica que no espera respuesta', 'abre una duda real del autor', 'cita a un conductor', 'marca una exclamación'], answer: 0 },
      { p: 4, text: 'Las autoridades|,| sabias como siempre, han decidido', options: ['abre un inciso irónico sobre las autoridades', 'separa los elementos de una lista', 'anuncia un ejemplo', 'marca el final de una cita'], answer: 0 },
    ] }, 'La pregunta no espera respuesta: finge admiración. Y entre las comas va el inciso «sabias como siempre», que en este contexto quiere decir lo contrario.',
      { hint: 'Pregúntate si el autor espera que alguien le responda, y qué va entre las dos comas.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const ABUELO = {
    id: 'lec-abuelo-rio', title: 'Mi abuelo y el río',
    paras: [
      'Mi abuelo tenía las manos como raíces: anchas, torcidas y llenas de tierra aunque se las lavara. Decía que el río Cauca era un señor de mal genio que no avisaba antes de crecer, y que había que hablarle con respeto.',
      'Cuando construyeron la represa, un funcionario vino a explicarnos que el río ahora sería «más ordenado». Mi abuelo lo escuchó con atención y le dio las gracias: «Qué bueno, doctor. A ver si ahora los peces también aprenden a hacer fila».',
      'Ese año pescó tan poco que, según él, los pescados venían a contarle chistes de lo vacía que estaba la canoa.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: ABUELO, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-figurado', 'Evaluación · Lenguaje figurado', [
    ['pu-lf-1', 'La comparación une dos cosas con «como»; la metáfora las identifica sin «como».',
      Q('La expresión «las manos como raíces» es:', ['una ironía', 'una hipérbole', 'una comparación', 'una personificación'], 2,
        'Une las manos y las raíces con «como»: es una comparación.',
        'Busca la palabra que une las manos con las raíces.')],
    ['pu-lf-1', 'La personificación da rasgos humanos a lo que no es humano.',
      Q('Decir que el río «era un señor de mal genio» es una figura que:', ['exagera el tamaño del río', 'le da rasgos humanos al río', 'dice lo contrario de lo que se piensa', 'compara el río con una raíz'], 1,
        'Tener mal genio y no avisar son rasgos de una persona: el río está personificado.',
        'Pregúntate quién puede tener mal genio.')],
    ['pu-lf-1', 'Una hipérbole exagera para decir algo con fuerza; se lee por su sentido.',
      Q('La frase «los pescados venían a contarle chistes de lo vacía que estaba la canoa» quiere decir que:', ['los peces hablaban', 'la canoa estaba rota', 'el abuelo contaba chistes', 'pescó muy poco'], 3,
        'La exageración humorística dice que la canoa estaba casi vacía: pescó muy poco ese año.',
        'Lee el comienzo de la oración: «Ese año pescó tan poco que…».')],
    ['pu-lf-2', 'La ironía dice lo contrario de lo que se piensa; los hechos la delatan.',
      Q('Cuando el abuelo dice «Qué bueno, doctor», su intención es:', ['agradecer sinceramente', 'burlarse con ironía de la promesa del funcionario', 'pedir un favor', 'felicitar al funcionario'], 1,
        'Enseguida dice que los peces tendrán que «hacer fila»: se burla de la idea de un río «ordenado».',
        'Lee lo que el abuelo dice justo después del «Qué bueno».')],
    ['pu-lf-2', 'Las comillas pueden marcar distancia frente a la palabra de otro.',
      Q('Las comillas en «más ordenado» indican que el narrador:', ['toma distancia de la palabra del funcionario', 'cita a su abuelo', 'marca un título', 'destaca una palabra extranjera'], 0,
        'Son las palabras del funcionario, y el narrador las cita con distancia, porque el resultado fue que el abuelo casi no pescó.',
        'Pregúntate de quién son esas palabras y si el narrador está de acuerdo con ellas.')],
    ['pu-lf-2', 'La ironía se reconoce cuando lo que se dice choca con lo que pasa.',
      Q('Lo que delata la ironía del abuelo es que:', ['el funcionario era doctor', 'el río es muy grande', 'los peces no pueden hacer fila, y después de la represa casi no pescó', 'el abuelo era amable'], 2,
        'La imagen absurda de los peces en fila y la pesca que se acabó muestran que el «Qué bueno» no era sincero.',
        'Busca el hecho que contradice el agradecimiento del abuelo.')],
  ]);
});
