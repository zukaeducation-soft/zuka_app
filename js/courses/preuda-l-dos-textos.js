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
      'Un adolescente que juega cuatro horas diarias deja de hacer otras cosas en esas horas: dormir, moverse, conversar cara a cara, aburrirse, que también es necesario para imaginar. Varios estudios han relacionado el exceso de pantallas con peor sueño y menos actividad física en los jóvenes.',
      'Además, muchos juegos están diseñados para que sea difícil dejarlos: recompensas cada pocos minutos, cofres sorpresa que se pagan con dinero real, misiones que se pierden si uno no entra cada día. No es casualidad: de que el jugador vuelva depende el negocio.',
      'No se trata de prohibir los videojuegos, sino de reconocer que no son una actividad neutra. Hace falta que las familias pongan límites claros de tiempo y que el Estado regule los cofres pagados, que se parecen demasiado a las apuestas.',
    ],
  };

  const REMOTO = {
    id: 'lec-trabajo-remoto', title: 'El trabajo remoto llegó para quedarse',
    ficha: { autor: 'Columna de una consultora', fuente: 'Revista de negocios', fecha: 'Febrero de 2025' },
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
      ['Varios estudios respaldan lo que se afirma.', 1],
      ['Muchos juegos están diseñados para que sea difícil dejarlos.', 2],
      ['El Estado debería regular los cofres pagados.', 2],
    ] }, 'Los dos rechazan prohibir, piden límites de tiempo y citan estudios. El texto Uno se concentra en lo que los juegos dan (estrategia, amigos); el Dos, en lo que quitan y en cómo están diseñados para enganchar.',
      { hint: 'Una coincidencia tiene que estar en los dos textos. Antes de ponerla en el medio, búscala en cada uno.' }),
    play('mapa-del-texto', 'El recorrido del texto Uno', { ...A, labels: ['presenta beneficios para la atención', 'presenta beneficios sociales', 'muestra juegos para aprender', 'reconoce los límites del argumento', 'propone acompañar en vez de prohibir', 'enumera los juegos más vendidos'], key: [0, 1, 2, 3, 4] },
      'El texto Uno suma beneficios (párrafos 1 a 3), reconoce un límite (4) y propone qué hacer (5). No nombra juegos concretos.',
      { hint: 'Fíjate en los conectores: «Sin embargo», «Además», «Hay también», «Nada de esto quiere decir», «Por eso».' }),
    play('lupa-evidencia', 'Lo que dicen los textos', { ...A, cards: [
      ['El texto Uno dice que ciertos juegos de acción mejoran la atención visual.', 0],
      ['Los dos textos aceptan que hace falta poner límites.', 0],
      ['El autor del texto Dos desconfía de las empresas de videojuegos.', 1],
      ['El autor del texto Uno juega videojuegos con sus hijos.', 2],
      ['Los dos textos piden prohibir los cofres pagados.', 2],
    ] }, 'Las dos primeras están dichas (el texto Uno habla de «poner límites», el Dos de «límites claros»). La desconfianza del Dos sale de «No es casualidad: de que el jugador vuelva depende el negocio». El Uno recomienda jugar con los hijos, pero no dice que su autora lo haga; y solo el Dos habla de los cofres, para regularlos, no para prohibirlos.',
      { hint: 'Cuando una afirmación dice «los dos textos», búscala en cada uno. Y «regular» no es «prohibir».' }),
    play('conector-bisagra', 'Cómo se relacionan los dos textos', { ...A, rounds: [
      { a: 'El texto Uno destaca lo que los videojuegos dan.', b: 'el texto Dos insiste en lo que quitan.', options: ['En cambio,', 'Por eso,', 'Es decir,', 'Por ejemplo,'], answer: 0 },
      { a: 'Los dos textos rechazan la prohibición.', b: 'los dos piden límites de tiempo.', options: ['Además,', 'Sin embargo,', 'Por lo tanto,', 'Aunque'], answer: 0 },
      { a: 'Según el texto Dos, de que el jugador vuelva depende el negocio.', b: 'pide que el Estado regule los cofres pagados.', options: ['Por eso,', 'Aunque', 'En cambio,', 'Es decir,'], answer: 0 },
    ] }, 'Los enfoques se oponen (contraste); las coincidencias se suman (adición); y el diseño del negocio es la razón de la regulación que pide el Dos (consecuencia).',
      { hint: 'Pregúntate si las dos ideas se oponen, se suman o una explica la otra.' }),
    play('donde-buscar', 'Vuelve al texto Uno', { ...A, cards: [
      ['¿Qué dicen los estudios sobre los juegos de acción?', [1]], ['¿Qué pasa con los jóvenes tímidos?', [2]], ['¿Qué hacen algunos colegios?', [3]],
      ['¿Dónde está el problema, según la autora?', [4]], ['¿Qué deben hacer los padres?', [5]],
    ] }, 'Atención (1), lo social (2), juegos para aprender (3), el límite (4) y la propuesta (5).',
      { hint: 'Cada párrafo del texto Uno trata un aspecto. Ubica la palabra clave de la pregunta.' }),
    play('termometro-tono', 'Dos tonos distintos', { ...A, rounds: [
      { frag: 'Por eso, más que prohibir, conviene acompañar: saber a qué juegan los hijos, jugar con ellos de vez en cuando y acordar horarios.', scale: ['conciliador', 'alarmado', 'burlón', 'indiferente'], answer: 0 },
      { frag: 'No es casualidad: de que el jugador vuelva depende el negocio.', scale: ['suspicaz', 'ingenuo', 'festivo', 'resignado'], answer: 0 },
    ] }, 'El texto Uno propone acompañar y acordar: es conciliador. El Dos sospecha de las intenciones de quien diseña los juegos: es suspicaz.',
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
      { hint: 'Revisa el párrafo 4 del texto Uno antes de decidir si una idea es solo del Dos.' }),
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
    ] }, 'El texto Uno cierra con frases cortas y sin matices: es tajante. El Dos empieza concediéndole algo al otro: es conciliador.',
      { hint: 'Compara: uno cierra la discusión de golpe; el otro empieza reconociendo algo de la postura contraria.' }),
    play('lupa-evidencia', 'Lo que dirían y lo que no', { ...B, cards: [
      ['El autor Uno dice que la pandemia volvió normal el trabajo en casa.', 0],
      ['El autor Dos acepta que trabajar desde la casa tiene ventajas.', 0],
      ['El autor Uno respondería que la falta de lugar se resuelve con apoyo de las empresas.', 1],
      ['El autor Dos rechazaría el trabajo remoto por completo.', 2],
      ['El autor Uno pide cerrar todas las oficinas.', 2],
    ] }, 'Las dos primeras están escritas. Lo que respondería el Uno sale de su párrafo 4: esos problemas «se pueden resolver con apoyo de las empresas». El Dos propone un camino intermedio, no rechaza el remoto; y el Uno se opone al regreso obligatorio, no pide cerrar oficinas.',
      { hint: 'Para saber qué diría un autor, busca en su propio texto algo que ya haya dicho sobre ese punto.' }),
    play('mapa-del-texto', 'El recorrido del texto Uno', { ...B, labels: ['plantea el cambio', 'enumera ventajas', 'responde a una crítica', 'reconoce límites y los responde', 'cierra con una frase tajante', 'cita a un experto en oficinas'], key: [0, 1, 2, 3, 4] },
      'El texto Uno plantea el cambio, da ventajas, responde a los críticos, reconoce límites con «Por supuesto… Pero» y cierra de golpe. No cita a ningún experto.',
      { hint: 'Busca las marcas: «Los críticos dicen», «Por supuesto… Pero».' }),
    play('hilo-referente', '¿A qué se refiere?', { ...B, rounds: [
      { p: 5, text: 'Quien defiende |el regreso obligatorio a la oficina| defiende, en el fondo, |una costumbre|. |Las costumbres| cambian. |Esta| ya cambió.', from: 7, answer: 3 },
      { p: 2, text: 'Muchas personas, sobre todo |madres y padres|, ganaron tiempo para |sus| hijos, y en las horas pico hubo menos carros en |las calles|', from: 3, answer: 1 },
    ] }, '«Esta» es la costumbre de ir a la oficina, que ya cambió. Y los hijos son de las madres y los padres: las calles no tienen hijos.',
      { hint: '«Esta» va en singular; «Las costumbres», en plural. ¿Cuál de las opciones en singular puede cambiar?' }),
  ]);

  // ---------------- Evaluación: formato real, dos textos nuevos ----------------
  const TURISMO = {
    id: 'lec-turismo-bendicion', title: 'Una ciudad abierta',
    paras: [
      'El turismo dejó el año pasado más de un billón de pesos en la ciudad y creó miles de empleos en restaurantes, hoteles y transporte. Barrios que antes nadie visitaba hoy reciben extranjeros que pagan por conocer su historia.',
      'Es cierto que hay problemas, pero se resuelven con regulación, no cerrando la puerta. Una ciudad que se cierra al visitante se cierra también a sus ingresos.',
    ],
  };
  const DECORADO = {
    id: 'lec-ciudad-decorado', title: 'La ciudad no es un decorado',
    paras: [
      'En algunos barrios turísticos, el arriendo se ha duplicado en cinco años porque muchos dueños prefieren alquilar por noches a visitantes. Las familias que vivieron allí toda la vida tienen que irse a barrios más lejanos.',
      'No estoy en contra del turismo. Estoy en contra de un turismo que convierte la casa de unos en el hotel de otros, sin que nadie ponga reglas.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { docs: [TURISMO, DECORADO], q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-dos-textos', 'Evaluación · Lectura de dos textos', [
    ['pu-dt-1', 'Una coincidencia debe estar en los dos textos.',
      Q('Los dos textos coinciden en que:', ['el turismo debe prohibirse', 'el turismo trae problemas que necesitan reglas', 'el arriendo se duplicó en cinco años', 'el turismo dejó un billón de pesos'], 1,
        'El Uno dice que los problemas «se resuelven con regulación»; el Dos critica que «nadie ponga reglas». Las cifras solo están en uno de los textos.',
        'Para cada opción, busca si aparece en el texto Uno y en el texto Dos.')],
    ['pu-dt-1', 'Una diferencia de enfoque es lo que cada texto pone en primer plano.',
      Q('Una diferencia entre los textos es que:', ['el Uno destaca los ingresos y el Dos el desplazamiento de las familias', 'el Uno está en contra del turismo y el Dos a favor', 'los dos hablan solo de restaurantes', 'el Dos no menciona el turismo'], 0,
        'El Uno habla de dinero y empleos; el Dos, de las familias que tienen que irse. Ninguno está en contra del turismo.',
        'Pregúntate de qué habla primero cada texto.')],
    ['pu-dt-1', '«Es interés del texto Dos más que del Uno» pide algo que solo trate el Dos.',
      Q('Es interés del texto Dos más que del texto Uno:', ['el empleo en hoteles', 'los extranjeros que pagan', 'el arriendo de las familias del barrio', 'los ingresos de la ciudad'], 2,
        'Solo el texto Dos habla del arriendo y de las familias. Lo demás está en el Uno.',
        'Busca la opción que no aparece en el texto Uno.')],
    ['pu-dt-2', 'Para saber qué diría un autor, se usa su tesis como lente.',
      Q('Ante el problema que plantea el texto Dos, el autor del texto Uno probablemente diría que:', ['hay que prohibir el alquiler por noches', 'el arriendo no ha subido', 'las familias deben irse', 'se resuelve con regulación, sin cerrarle la puerta al turismo'], 3,
        'Su tesis es que los problemas «se resuelven con regulación, no cerrando la puerta». No negaría el dato ni pediría prohibir.',
        'Relee la segunda frase del texto Uno.')],
    ['pu-dt-2', 'La respuesta de un autor no puede contradecir lo que ya dijo en su texto.',
      Q('El autor del texto Dos le respondería al autor del Uno que:', ['el turismo no deja dinero', 'está totalmente de acuerdo con él', 'los ingresos no compensan que las familias tengan que irse sin reglas que las protejan', 'los extranjeros no deberían venir'], 2,
        'El Dos no niega el turismo («No estoy en contra»), pero insiste en las familias desplazadas y en la falta de reglas.',
        'Recuerda que el autor Dos dice no estar en contra del turismo. ¿Qué le reprocharía entonces al Uno?')],
  ]);
});
