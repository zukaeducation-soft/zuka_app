// Preuniversitario · Comprensión lectora · mundo 10 «Lectura de dos textos» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): dos parejas de textos sobre el mismo tema con posturas distintas, siempre a la vista los dos
// (Texto Uno y Texto Dos): videojuegos (coincidencias y diferencias) y trabajo remoto (qué diría el otro autor). El texto Uno es el
// de la lección (330–560 palabras); el Dos es más corto, como en el examen. La evaluación usa otra pareja sobre el turismo.
// Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const JUEGOS = {
    id: 'lec-videojuegos-ensenan', title: 'Los videojuegos también enseñan',
    ficha: { autor: 'Columna de una psicóloga', fuente: 'Revista para padres de familia', fecha: 'Mayo de 2025' },
    paras: [
      'Durante años, los videojuegos cargaron con la fama de ser una pérdida de tiempo. Sin embargo, la investigación de las últimas dos décadas pinta un cuadro más interesante. Varios estudios han encontrado que ciertos juegos de acción mejoran la atención visual y la capacidad de seguir varios objetos a la vez, y que los juegos de estrategia exigen planear, equivocarse y volver a intentar. Otros obligan a leer instrucciones largas, a administrar recursos escasos o a resolver acertijos que no tienen una sola salida.',
      'Además, muchos juegos son hoy espacios sociales. Los adolescentes no juegan solos: juegan con amigos, se organizan en equipos, se reparten tareas y discuten estrategias durante horas. Para algunos jóvenes tímidos, el juego en línea es el primer lugar donde se sienten parte de un grupo, y a veces es allí donde ensayan conversaciones que después se atreven a tener en el colegio.',
      'Hay también juegos diseñados para aprender. En algunos colegios, los estudiantes construyen ciudades virtuales para entender la economía o recorren el cuerpo humano como si fuera un mapa. Los profesores que los usan dicen que los estudiantes se equivocan más que en un examen, pero que no les da miedo equivocarse, porque en el juego equivocarse es parte de avanzar. Un profesor de sociales cuenta que sus estudiantes discutieron una semana entera sobre cómo repartir el agua en su ciudad inventada.',
      'Nada de esto quiere decir que todo juego sea bueno ni que no haya que poner límites. Un adolescente que deja de dormir por jugar tiene un problema, como lo tendría si dejara de dormir por leer novelas. Pero el problema está en el exceso y en lo que se deja de hacer, no en el videojuego en sí.',
      'Por eso, más que prohibir, conviene acompañar: saber a qué juegan los hijos, jugar con ellos de vez en cuando y acordar horarios. Un padre que conoce el juego puede conversar sobre él; uno que solo lo prohíbe pierde la oportunidad de entender qué le gusta a su hijo y por qué.',
    ],
  };
  const PANTALLAS = {
    id: 'lec-pantallas-costo', title: 'Lo que las pantallas quitan',
    ficha: { autor: 'Columna de un médico pediatra', fuente: 'Periódico nacional, sección Salud', fecha: 'Junio de 2025' },
    paras: [
      'Los defensores de los videojuegos suelen hablar de lo que los juegos dan: atención, estrategia, amigos. Rara vez hablan de lo que quitan. Y lo que quitan, sobre todo, es tiempo.',
      'En mi consultorio lo veo cada semana. Llegan adolescentes que juegan cuatro horas diarias, con sueño, sin moverse y sin ganas de conversar con nadie. Cuando les pregunto a qué hora se duermen, la respuesta casi siempre tiene que ver con una partida que no podían dejar a medias. Esas horas se las quitan a dormir, a moverse, a conversar cara a cara y hasta a aburrirse, que también es necesario para imaginar.',
      'Además, muchos juegos están diseñados para que sea difícil dejarlos: recompensas cada pocos minutos, cofres sorpresa que se pagan con dinero real, misiones que se pierden si uno no entra cada día. No es casualidad: de que el jugador vuelva depende el negocio. Esas recompensas tan seguidas hacen, además, que perder no duela: se pierde una partida y en segundos empieza otra.',
      'No se trata de prohibir los videojuegos, sino de reconocer que no son una actividad neutra. Hace falta que las familias pongan límites claros de tiempo y que el Estado regule los cofres pagados, que se parecen demasiado a las apuestas.',
    ],
  };

  const REMOTO = {
    id: 'lec-trabajo-remoto', title: 'El trabajo remoto llegó para quedarse',
    ficha: { autor: 'Columna de un consultor', fuente: 'Revista de negocios', fecha: 'Febrero de 2025' },
    paras: [
      'Hace cinco años, trabajar desde la casa era un privilegio de unos pocos. La pandemia lo convirtió, de un día para otro, en la norma para millones de personas, y muchas empresas descubrieron algo que antes se negaban a creer: que buena parte del trabajo de oficina se podía hacer igual de bien, o mejor, desde la mesa del comedor. Algunas lo descubrieron con alivio; otras, con un poco de vergüenza por haberlo negado tanto tiempo.',
      'Las ventajas son evidentes para quien las ha vivido. Se ahorran las dos o tres horas diarias de trancón, el dinero del transporte y del almuerzo. Muchas personas, sobre todo madres y padres, ganaron tiempo para sus hijos, y en las horas pico hubo menos carros en las calles. Y las empresas descubrieron que podían contratar talento en cualquier ciudad, no solo en la capital, y ahorrarse además buena parte del arriendo de sus sedes.',
      'Los críticos dicen que la productividad baja cuando nadie vigila. Pero esa crítica dice más de los jefes que de los trabajadores: si a alguien solo se le puede medir por las horas que pasa sentado frente a un escritorio, lo que falla es la manera de medir. Un buen trabajo se reconoce por sus resultados, no por la silla donde se hizo. Las empresas que lo entendieron cambiaron el control de horarios por metas claras y revisiones semanales.',
      'Por supuesto, el trabajo remoto exige disciplina, una conexión estable y un lugar tranquilo, y no todos los tienen. Pero esos son problemas que se pueden resolver con apoyo de las empresas, por ejemplo con un auxilio para internet o espacios de trabajo compartidos cerca de la casa, no razones para volver a encerrar a todos en un edificio.',
      'Muchas de las empresas que probaron el trabajo remoto no piensan volver atrás, y algunas de las que obligaron a regresar vieron irse a sus mejores empleados. Quien defiende el regreso obligatorio a la oficina defiende, en el fondo, una costumbre. Las costumbres cambian. Esta ya cambió.',
    ],
  };
  const OFICINA = {
    id: 'lec-oficina-ensena', title: 'La oficina también enseña',
    ficha: { autor: 'Columna de un ingeniero con veinte años de experiencia', fuente: 'Revista de negocios', fecha: 'Marzo de 2025' },
    paras: [
      'No niego que trabajar desde la casa tiene ventajas. Pero quienes lo celebran suelen ser personas con experiencia, que ya aprendieron su oficio. Para los que empiezan, la oficina sigue siendo una escuela.',
      'Lo que un practicante aprende al oír cómo su jefa resuelve una llamada difícil, o al preguntarle algo a un compañero en el pasillo, no está en ningún manual ni cabe en una videollamada programada. Ese aprendizaje casual, que nadie planea, es el que más se pierde cuando todos trabajan desde la casa.',
      'Además, no todos tienen en su casa un lugar para trabajar. Para un joven que vive con cinco personas en un apartamento pequeño, la oficina no es una costumbre: es el único escritorio que tiene.',
      'Por eso propongo un camino intermedio: dos o tres días presenciales a la semana, sobre todo en los equipos donde hay gente nueva.',
    ],
  };

  const A = { doc: JUEGOS, docs: [JUEGOS, PANTALLAS] };
  const B = { doc: REMOTO, docs: [REMOTO, OFICINA] };

  // ---------------- Lección 1 · Coincidencias y diferencias ----------------
  setLesson('pu-dt-1', [
    play('puente-dos-textos', 'El puente entre los dos textos', { ...A, cards: [
      ['Los juegos de estrategia exigen planear.', 0],
      ['El juego en línea ayuda a jóvenes tímidos a sentirse en un grupo.', 0],
      ['Hay que poner límites de tiempo.', 1],
      ['No se trata de prohibir los videojuegos.', 1],
      ['Se apoya en varios estudios.', 0],
      ['Muchos juegos están diseñados para que sea difícil dejarlos.', 2],
      ['El Estado debería regular los cofres pagados.', 2],
      ['El autor cuenta lo que ve en su consultorio.', 2],
    ] }, 'Los dos rechazan prohibir y piden límites de tiempo. El texto Uno se concentra en lo que los juegos dan (estrategia, amigos) y se apoya en estudios; el Dos, en lo que quitan y en cómo están diseñados para enganchar, y se apoya en lo que el médico ve en su consultorio.',
      { hint: 'Una coincidencia tiene que estar en los dos textos. Antes de ponerla en el medio, búscala en cada uno.' }),
    play('caso-nuevo', 'Un texto que explica al otro', { ...A, principle: 'Una idea de un texto «encuentra explicación» en el otro cuando el otro da la causa o el mecanismo de lo que el primero solo afirma. Repetir la idea o coincidir con ella no es explicarla.', ask: '¿En cuáles parejas el segundo fragmento explica por qué pasa lo que afirma el primero?', cards: [
      ['Uno: a los estudiantes no les da miedo equivocarse en el juego. → Dos: las recompensas seguidas hacen que perder no duela, porque en segundos empieza otra partida.', true],
      ['Uno: un adolescente que deja de dormir por jugar tiene un problema. → Dos: muchos juegos están diseñados para que sea difícil dejarlos.', true],
      ['Uno: ciertos juegos de acción mejoran la atención visual. → Dos: los defensores de los videojuegos hablan de atención y estrategia.', false],
      ['Uno: más que prohibir, conviene acompañar. → Dos: no se trata de prohibir los videojuegos.', false],
      ['Dos: los cofres sorpresa se pagan con dinero real. → Uno: hay juegos diseñados para aprender.', false],
    ] }, 'En las dos primeras parejas, el texto Dos da el mecanismo que el Uno solo afirma: si perder no duele, no da miedo equivocarse; y si el juego está hecho para que no se pueda dejar, se entiende al que deja de dormir. Las otras no explican: una solo repite la palabra «atención» (el Dos cuenta lo que dicen los defensores), otra es una coincidencia (los dos rechazan prohibir) y la última une ideas que no tienen que ver. Un texto puede explicar al otro aunque sus autores no estén de acuerdo: la psicóloga ve en el error sin miedo una ventaja; el médico, parte del enganche.',
      { hint: 'No te guíes por la palabra que se repite. Pregúntate si el segundo fragmento responde «¿por qué pasa eso?» sobre el primero.' }),
    play('lupa-evidencia', 'Lo que dicen los textos', { ...A, cards: [
      ['El texto Uno dice que ciertos juegos de acción mejoran la atención visual.', 0],
      ['Los dos textos aceptan que hace falta poner límites.', 0],
      ['El autor del texto Dos desconfía de las empresas de videojuegos.', 1],
      ['La autora del texto Uno juega videojuegos con sus hijos.', 2],
      ['Los dos textos piden prohibir los cofres pagados.', 2],
    ] }, 'Las dos primeras están dichas (el texto Uno habla de «poner límites», el Dos de «límites claros»). La desconfianza del Dos sale de «No es casualidad: de que el jugador vuelva depende el negocio». El Uno recomienda jugar con los hijos, pero no dice que su autora lo haga; y solo el Dos habla de los cofres, para regularlos, no para prohibirlos.',
      { hint: 'Cuando una afirmación dice «los dos textos», búscala en cada uno. Y «regular» no es «prohibir».' }),
    play('conector-bisagra', 'Cómo se relacionan los dos textos', { ...A, rounds: [
      { a: 'El texto Uno destaca lo que los videojuegos dan.', b: 'el texto Dos insiste en lo que quitan.', options: ['En cambio,', 'Por eso,', 'Es decir,', 'Por ejemplo,'], answer: 0 },
      { a: 'Los dos textos rechazan la prohibición.', b: 'los dos piden límites de tiempo.', options: ['Además,', 'Es decir,', 'Por ejemplo,', 'En cambio,'], answer: 0 },
      { a: 'Según el texto Dos, de que el jugador vuelva depende el negocio.', b: 'pide que el Estado regule los cofres pagados.', options: ['Por eso,', 'Aunque', 'En cambio,', 'Es decir,'], answer: 0 },
    ] }, 'Los enfoques se oponen (contraste); las coincidencias se suman (adición); y el diseño del negocio es la razón de la regulación que pide el Dos (consecuencia).',
      { hint: 'Pregúntate si las dos ideas se oponen, se suman o una explica la otra.' }),
    play('quien-lo-dice', '¿Con qué se sostiene cada uno?', { ...A, ask: 'Las preguntas del examen comparan cómo respalda cada texto lo que dice. Lleva cada fragmento al tipo de respaldo que usa.', voices: ['Estudios o investigaciones', 'Lo que cuentan otras personas', 'La experiencia del propio autor'], cards: [
      ['Varios estudios han encontrado que ciertos juegos de acción mejoran la atención visual. (Uno)', 0],
      ['Los profesores que los usan dicen que los estudiantes no tienen miedo de equivocarse. (Uno)', 1],
      ['Un profesor de sociales cuenta que sus estudiantes discutieron una semana sobre el agua. (Uno)', 1],
      ['En mi consultorio lo veo cada semana. (Dos)', 2],
      ['Cuando les pregunto a qué hora se duermen, hablan de una partida que no podían dejar. (Dos)', 2],
    ] }, 'El texto Uno expone con cautela: se apoya en estudios («varios», «ciertos juegos») y en lo que cuentan profesores, y casi no habla de sí misma. El Dos opina desde la experiencia: el médico habla en primera persona de lo que ve en su consultorio. Esa es una diferencia de respaldo, no de tema.',
      { hint: 'Fíjate en quién habla en cada fragmento: un estudio, otra persona citada o el autor en primera persona («mi», «les pregunto»).' }),
    play('termometro-tono', 'Dos tonos distintos', { ...A, rounds: [
      { frag: 'Por eso, más que prohibir, conviene acompañar: saber a qué juegan los hijos, jugar con ellos de vez en cuando y acordar horarios.', scale: ['conciliador', 'alarmado', 'burlón', 'indiferente'], answer: 0 },
      { frag: 'No es casualidad: de que el jugador vuelva depende el negocio.', scale: ['suspicaz', 'ingenuo', 'festivo', 'resignado'], answer: 0 },
    ] }, 'El texto Uno propone acompañar y acordar: es conciliador (busca acercar las posturas). El Dos sospecha de las intenciones de quien diseña los juegos: es suspicaz (suspicaz es quien desconfía y sospecha).',
      { hint: 'El primer fragmento propone un acuerdo; el segundo insinúa una intención escondida.' }),
    play('palabra-a-la-medida', 'Palabras del texto Uno', { ...A, rounds: [
      { p: 1, before: 'los videojuegos cargaron con la ', word: 'fama', after: ' de ser una pérdida de tiempo', options: ['reputación', 'fortuna', 'costumbre', 'celebridad'], answer: 0 },
      { p: 4, before: 'Pero el problema está en el ', word: 'exceso', after: ' y en lo que se deja de hacer', options: ['abuso', 'juego', 'precio', 'gusto'], answer: 0 },
    ] }, 'Aquí «fama» es la reputación, buena o mala, no la celebridad. Y el exceso es el abuso: jugar tanto que se deja de dormir.',
      { hint: 'Una «fama de ser una pérdida de tiempo» no es algo que haga famoso a nadie. ¿Qué significa entonces?' }),
  ]);

  // ---------------- Lección 2 · Qué diría el otro autor ----------------
  setLesson('pu-dt-2', [
    play('quien-lo-dice', '¿Quién lo diría?', { ...B, ask: 'Lleva cada frase al autor que la diría, según su tesis, o a «Ninguno».', voices: ['Lo diría el autor Uno', 'Lo diría el autor Dos', 'No lo diría ninguno'], cards: [
      ['«Contratemos a la diseñadora que vive en Pasto, aunque nunca venga a la sede».', 0],
      ['«Midamos a cada empleado por lo que entrega, no por la hora en que llega».', 0],
      ['«Al practicante nuevo conviene sentarlo al lado de alguien con experiencia».', 1],
      ['«Para el joven que vive en un apartamento pequeño, la oficina es su escritorio».', 1],
      ['«Volvamos todos a la oficina cinco días, como antes».', 2],
    ] }, 'Contratar en cualquier ciudad y medir por resultados son ideas del Uno; el aprendizaje junto a alguien con experiencia y el escritorio que falta en casa, del Dos. Ninguno pide volver cinco días: el Dos propone dos o tres.',
      { hint: 'Usa la tesis de cada autor como lente. Ojo: el autor Dos no está en contra del trabajo remoto del todo.' }),
    play('puente-dos-textos', 'Lo que dice cada uno', { ...B, cards: [
      ['Trabajar en casa ahorra horas de trancón.', 0],
      ['La productividad se mide por resultados, no por horas.', 0],
      ['Trabajar desde la casa tiene ventajas.', 1],
      ['No todos tienen un lugar para trabajar en casa.', 1],
      ['Los que empiezan aprenden mucho en la oficina.', 2],
      ['Conviene ir dos o tres días a la oficina.', 2],
    ] }, 'Los dos reconocen las ventajas y el problema del lugar para trabajar (el Uno en el párrafo 4, el Dos en el 3). El Uno defiende medir por resultados; el Dos, el aprendizaje en la oficina y un camino intermedio.',
      { hint: 'Antes de dejar una idea en un solo lado, búscala en el otro texto.' }),
    play('balanza-argumento', 'Ideas de los dos frente a la tesis del Uno', { ...B, ask: 'Pon en cada platillo las ideas, de cualquiera de los dos textos, que apoyan o debilitan la tesis del texto Uno.', thesis: 'El trabajo remoto debería ser la norma, no la excepción.', cards: [
      ['Se ahorran horas de trancón y dinero.', 0],
      ['Las empresas pueden contratar talento en cualquier ciudad.', 0],
      ['El aprendizaje casual del pasillo se pierde en casa.', 1],
      ['Muchos jóvenes no tienen en casa un lugar para trabajar.', 1],
      ['La pandemia empezó hace cinco años.', null],
    ] }, 'El ahorro y el talento de otras ciudades son argumentos del Uno. El aprendizaje perdido y la falta de lugar son objeciones del Dos. La fecha de la pandemia no pesa.',
      { hint: 'La tesis es del texto Uno, pero las ideas pueden venir de cualquiera de los dos.' }),
    play('termometro-tono', 'Dos maneras de discutir', { ...B, rounds: [
      { frag: 'Las costumbres cambian. Esta ya cambió.', scale: ['tajante', 'dudoso', 'nostálgico', 'burlón'], answer: 0 },
      { frag: 'No niego que trabajar desde la casa tiene ventajas.', scale: ['conciliador', 'agresivo', 'irónico', 'eufórico'], answer: 0 },
    ] }, 'El texto Uno cierra con frases cortas y sin matices: es tajante (corta la discusión, no deja lugar a dudas). El Dos empieza concediéndole algo al otro: es conciliador.',
      { hint: 'Compara: uno cierra la discusión de golpe; el otro empieza reconociendo algo de la postura contraria.' }),
    play('lupa-evidencia', 'Lo que dirían y lo que no', { ...B, cards: [
      ['El autor Uno dice que la pandemia volvió normal el trabajo en casa.', 0],
      ['El autor Dos acepta que trabajar desde la casa tiene ventajas.', 0],
      ['El autor Uno respondería que la falta de lugar se resuelve con apoyo de las empresas.', 1],
      ['El autor Dos rechazaría el trabajo remoto por completo.', 2],
      ['El autor Uno pide cerrar todas las oficinas.', 2],
    ] }, 'Las dos primeras están escritas. Lo que respondería el Uno sale de su párrafo 4: esos problemas «se pueden resolver con apoyo de las empresas». El Dos propone un camino intermedio, no rechaza el remoto; y el Uno se opone al regreso obligatorio, no pide cerrar oficinas.',
      { hint: 'Para saber qué diría un autor, busca en su propio texto algo que ya haya dicho sobre ese punto.' }),
    play('caso-nuevo', 'Un tercero en la discusión', { ...B, principle: 'Una gerente defiende el regreso a la oficina. Busca en los dos textos ideas que los autores sostengan, o concedan, y que le sirvan contra la tesis del texto Uno.', ask: '¿Cuáles ideas puede usar la gerente como argumento contra el texto Uno?', cards: [
      ['El aprendizaje casual del pasillo se pierde cuando todos trabajan desde la casa. (Dos)', true],
      ['Para un joven que vive con cinco personas, la oficina es el único escritorio que tiene. (Dos)', true],
      ['El trabajo remoto exige disciplina, buena conexión y un lugar tranquilo, y no todos los tienen. (Uno)', true],
      ['La productividad baja cuando nadie vigila, como sostiene el autor del texto Uno.', false],
      ['Las empresas pueden contratar talento en cualquier ciudad. (Uno)', false],
    ] }, 'Las dos ideas del texto Dos son argumentos de su autor contra el trabajo remoto como norma. La tercera es del texto Uno, pero su autor la concede («Por supuesto…»): un tercero puede usarla en su contra. La productividad que baja aparece en el Uno, pero es lo que dicen «los críticos», y el autor la rechaza: no se le puede atribuir. Y contratar en cualquier ciudad favorece al Uno.',
      { hint: 'Que una frase aparezca en un texto no significa que su autor la defienda. Revisa quién la dice: el autor, «los críticos» o el autor cuando concede algo.' }),
    play('hilo-referente', '¿A qué se refiere?', { ...B, rounds: [
      { p: 5, text: 'Quien defiende |el regreso obligatorio a la oficina| defiende, en el fondo, |una costumbre|. |Las costumbres| cambian. |Esta| ya cambió.', from: 7, answer: 3 },
      { p: 2, text: 'Muchas personas, sobre todo |madres y padres|, ganaron tiempo para |sus| hijos, y en las horas pico hubo menos carros en |las calles|', from: 3, answer: 1 },
    ] }, '«Esta» es la costumbre de ir a la oficina, que ya cambió. Y los hijos son de las madres y los padres: las calles no tienen hijos.',
      { hint: '«Esta» es femenino singular: ¿cuál de las opciones concuerda con ella?' }),
  ]);

  // ---------------- Evaluación: formato real, dos textos nuevos ----------------
  // Dos textos de longitud de examen: el Uno expone con cifras y cautela; el Dos opina desde la experiencia de una vecina.
  const TURISMO = {
    id: 'lec-turismo-bendicion', title: 'Una ciudad abierta',
    ficha: { autor: 'Columna de una economista', fuente: 'Revista de economía regional', fecha: 'Julio de 2025' },
    paras: [
      'El turismo dejó el año pasado más de un billón de pesos en la ciudad, según la cámara de comercio, y creó cerca de doce mil empleos directos en restaurantes, hoteles y transporte. Barrios que antes nadie visitaba hoy reciben extranjeros que pagan por conocer su historia, y muchos de esos recorridos los guían jóvenes del mismo barrio.',
      'Las cifras, desde luego, no cuentan toda la historia. Una parte de ese dinero se queda en cadenas hoteleras y en plataformas que no tributan en la ciudad, y los empleos del sector suelen ser temporales. Aun así, los estudios disponibles indican que, por cada peso que gasta un visitante, la economía local mueve casi dos, porque el restaurante compra en la plaza y el guía paga arriendo en su barrio.',
      'Es cierto que hay problemas. En algunos sectores los arriendos han subido, porque a un propietario le rinde más alquilar por noches a visitantes que por meses a una familia, y hay vecinos que se quejan del ruido. Pero esos problemas tienen nombre y se pueden resolver con regulación: límites al alquiler por noches, cobros a las plataformas y horarios para los bares. Cerrar la puerta, en cambio, no resuelve nada; solo cambia el problema por otro.',
      'Una ciudad que se cierra al visitante se cierra también a sus ingresos. La pregunta útil no es si queremos turismo, sino qué reglas necesitamos para que deje más de lo que se lleva.',
    ],
  };
  const DECORADO = {
    id: 'lec-ciudad-decorado', title: 'La ciudad no es un decorado',
    ficha: { autor: 'Columna de una vecina del barrio', fuente: 'Periódico comunitario', fecha: 'Agosto de 2025' },
    paras: [
      'Vivo hace treinta años en la misma cuadra. Aquí aprendí a montar en bicicleta, aquí nacieron mis hijos y aquí, hasta hace poco, conocía el nombre de cada vecino. Hoy, de las doce casas de la cuadra, siete se alquilan por noches. Los fines de semana veo pasar maletas de rueditas a todas horas, y los lunes la cuadra queda en silencio, como un teatro después de la función.',
      'La señora de la tienda de la esquina cerró en marzo. No porque le faltaran clientes, sino porque el dueño del local le duplicó el arriendo: un turista paga en tres noches lo que ella pagaba en un mes. Mi hija, que trabaja como guía, me dice que el turismo le dio empleo. Le creo. Pero ella ya no puede pagar un apartamento en el barrio que muestra a los extranjeros.',
      'No estoy en contra del turismo. Me gusta que vengan a ver los murales y que se interesen por lo que vivimos. Estoy en contra de un turismo que convierte la casa de unos en el hotel de otros, sin que nadie ponga reglas, y que trata al barrio como un decorado para la foto.',
      'Cuando la alcaldía habla de los ingresos del turismo, yo pienso en la cuadra vacía de los lunes. Un barrio sin vecinos puede salir muy bonito en las postales, pero ya no es un barrio.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { docs: [TURISMO, DECORADO], q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-dos-textos', 'Evaluación · Lectura de dos textos', [
    ['pu-dt-1', 'Una idea de un texto «encuentra explicación» en el otro cuando el otro da su causa o su mecanismo; repetir las mismas palabras no es explicar.',
      Q('Que siete de las doce casas de la cuadra se alquilen por noches (texto Dos) encuentra explicación en el texto Uno, cuando este dice que:', ['hay que poner límites al alquiler por noches', 'a un propietario le rinde más alquilar por noches que por meses', 'barrios que antes nadie visitaba reciben hoy a extranjeros que pagan por su historia', 'por cada peso de un visitante, la economía local mueve casi dos'], 1,
        'El Dos solo cuenta lo que ve: siete casas alquiladas por noches. El Uno da la causa: alquilar por noches le rinde más al propietario que alquilar por meses. La opción A repite las palabras «alquiler por noches», pero es una solución, no una explicación; C y D hablan de los beneficios del turismo.',
        'No elijas la opción que repite las palabras del Dos. Busca en el Uno la que responde «¿por qué pasa eso?».')],
    ['pu-dt-1', 'Una coincidencia debe estar en los dos textos.',
      Q('Los dos textos coinciden en que:', ['el turismo debería prohibirse en los barrios residenciales', 'el turismo trae problemas que necesitan reglas', 'el arriendo se duplicó en todos los barrios de la ciudad', 'el turismo dejó más de un billón de pesos el año pasado'], 1,
        'El Uno dice que los problemas se resuelven «con regulación»; el Dos critica que «nadie ponga reglas». Las cifras solo están en el Uno, y el arriendo duplicado es de un local del Dos.',
        'Para cada opción, busca si aparece en el texto Uno y en el texto Dos.')],
    ['pu-dt-1', 'Una diferencia de enfoque es lo que cada texto pone en primer plano.',
      Q('Una diferencia entre los textos es que:', ['el Uno destaca los ingresos y el Dos la vida de los vecinos', 'el Uno está en contra del turismo y el Dos lo defiende sin reservas', 'el Uno habla solo de restaurantes y el Dos solo de murales', 'el Dos no menciona ningún beneficio del turismo para el barrio'], 0,
        'El Uno habla de dinero, empleos y reglas; el Dos, de la cuadra que se vacía. Ninguno está en contra del turismo, y el Dos reconoce un beneficio: el empleo de su hija.',
        'Pregúntate qué pone cada texto en primer plano. Y revisa si el Dos reconoce algo bueno del turismo.')],
    ['pu-dt-1', 'También se compara cómo respalda cada texto lo que dice: cifras y estudios, o la experiencia de quien escribe.',
      Q('Una diferencia en la manera de sostener lo que dicen es que:', ['el Uno se apoya en cifras y estudios, y el Dos en lo que su autora vive en la cuadra', 'el Uno cuenta su experiencia de vecina y el Dos presenta cifras de la cámara de comercio', 'los dos se apoyan sobre todo en la opinión de expertos en turismo', 'el Dos cita estudios sobre arriendos y el Uno cuenta la historia de una tienda'], 0,
        'El Uno cita a la cámara de comercio y «los estudios disponibles», con cautela («no cuentan toda la historia»). El Dos habla en primera persona: «Vivo hace treinta años», la tienda de la esquina, su hija. La opción B intercambia los textos.',
        'Busca las marcas: cifras y «según», o «yo», «mi hija», «vivo». Cuidado con la opción que cambia un texto por el otro.')],
    ['pu-dt-1', '«Es interés del texto Dos más que del Uno» pide algo que el Dos trate a fondo y el Uno no.',
      Q('Es interés del texto Dos más que del texto Uno:', ['el empleo que el turismo les da a los jóvenes de los barrios', 'los extranjeros que pagan por conocer la historia del barrio', 'que los vecinos de siempre puedan seguir viviendo en el barrio', 'los ingresos que el turismo le deja cada año a la ciudad entera'], 2,
        'El Uno menciona los arriendos como un problema que se regula; el Dos gira entero alrededor de los vecinos que se van. El empleo, los extranjeros y los ingresos son temas del Uno.',
        'Busca la opción que en el texto Uno solo aparece de paso y en el Dos ocupa todo el texto.')],
    ['pu-dt-2', 'Para saber qué diría un autor, se usa su tesis como lente.',
      Q('Ante el caso de la tienda de la esquina, la autora del texto Uno probablemente diría que:', ['hay que prohibir de una vez el alquiler por noches en toda la ciudad', 'el dueño del local tenía todo el derecho de duplicar el arriendo', 'la tienda cerró porque ya no tenía clientes en la cuadra', 'es un problema que se resuelve con límites al alquiler por noches'], 3,
        'Su tesis es que los problemas «tienen nombre y se pueden resolver con regulación», y nombra los límites al alquiler por noches. No pediría prohibir, y el texto Dos dice que a la tienda no le faltaban clientes.',
        'Relee el párrafo 3 del texto Uno: ¿qué soluciones propone?')],
    ['pu-dt-2', 'La respuesta de un autor no puede contradecir lo que ya dijo en su texto.',
      Q('La autora del texto Dos le respondería a la del Uno que:', ['el turismo no le deja ningún dinero a la ciudad ni a sus barrios', 'está de acuerdo con ella en todo, también en lo de las reglas', 'las cifras de ingresos no muestran lo que pierde un barrio sin vecinos', 'los extranjeros no deberían venir a visitar los murales del barrio nunca más'], 2,
        'El Dos no niega los ingresos ni rechaza a los visitantes («Me gusta que vengan»), pero piensa en «la cuadra vacía de los lunes» cuando oye hablar de ingresos.',
        'Recuerda el último párrafo del texto Dos: ¿en qué piensa la autora cuando le hablan de los ingresos?')],
    ['pu-dt-2', 'Un tercero puede usar una idea de un texto contra el otro; sirve lo que el autor sostiene o concede, no lo que solo menciona para rechazarlo.',
      Q('Un defensor de limitar el alquiler por noches tomaría del texto Uno, como argumento a favor de la autora del Dos, que:', ['parte del dinero se queda en plataformas y cadenas, y los empleos suelen ser temporales', 'por cada peso que gasta un visitante, la economía local mueve casi dos pesos, según los estudios', 'cerrar la puerta al turismo no resuelve nada: solo cambia un problema por otro', 'muchos de los recorridos turísticos los guían jóvenes que viven en el mismo barrio'], 0,
        'La autora del Uno concede que «las cifras no cuentan toda la historia»: parte del dinero se va y los empleos son temporales. Eso sirve contra el entusiasmo por los ingresos. El efecto multiplicador, cerrar la puerta y los guías del barrio son argumentos a favor del turismo.',
        'Busca en el texto Uno lo que su autora reconoce como limitación. Las demás opciones son argumentos que ella usa a favor del turismo.')],
    ['pu-dt-2', 'Comparar el tono ayuda a ver la postura: quien concede algo al otro suele ser más conciliador.',
      Q('Las frases «Mi hija… me dice que el turismo le dio empleo. Le creo» muestran que la autora del Dos:', ['reconoce un beneficio del turismo antes de mostrar su costo', 'cambia de opinión y termina defendiendo el turismo sin reservas', 'desconfía de lo que le cuenta su propia hija sobre el trabajo', 'piensa que su hija debería buscar otro empleo lejos del barrio'], 0,
        '«Le creo» concede: el turismo da empleo. Enseguida viene el costo: la hija no puede vivir en el barrio que muestra. No cambia de postura ni desconfía de su hija.',
        'Lee la oración que sigue a «Le creo»: ¿qué agrega la autora?')],
  ]);
});
