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
    play('linea-vida', 'Lleva cada idea a donde está: solo en un texto o en los dos.', { ...A, rot: ['solo el Uno', 'los dos', 'solo el Dos'], fichas: ['Los juegos de estrategia exigen planear.', 'No se trata de prohibir.', 'Hay que poner límites.', 'El Estado debería regular los cofres.', 'El juego ayuda a jóvenes tímidos.'], va: [0, 1, 1, 2, 0],
      mira: ['Busca la estrategia en los dos textos: ¿quién dice que enseña a planear?', 'Busca «prohibir» en los dos textos.', 'Busca límites u horarios en los dos textos.', 'Busca los cofres en los dos textos.', 'Busca a los tímidos en los dos textos.'], bien: 'Coincidir es estar en los dos.' },
      'Los dos rechazan prohibir y piden límites. Planear y los tímidos son del Uno; los cofres, del Dos.',
      { hint: 'Abre los dos textos y busca cada idea en cada uno, aunque la digan con otras palabras.' }),
    play('genero-o-cita', '¿El segundo fragmento **explica** por qué pasa lo primero, o no?', { ...A, rot: ['lo explica', 'no lo explica'], fichas: ['Uno: no les da miedo equivocarse. → Dos: perder no duele, enseguida empieza otra partida.', 'Uno: mejoran la atención. → Dos: los defensores hablan de atención.', 'Uno: hay quien deja de dormir. → Dos: están hechos para que sea difícil dejarlos.', 'Uno: muchos juegan en equipo. → Dos: algunos juegan cuatro horas diarias.'], va: [0, 1, 0, 1],
      mira: ['¿El segundo dice la causa o solo repite?', '¿El segundo dice la causa o solo repite?', '¿El segundo dice la causa o solo repite?', '¿El segundo dice la causa o cuenta otra cosa?'], bien: 'Explicar es dar la causa; repetir o contar otra cosa, no.' },
      'Si perder no duele, se entiende que no teman; si cuesta dejarlos, se entiende que no duerman. Repetir «atención» o contar cuántas horas juegan no explica.',
      { hint: 'Pon «porque» entre los dos fragmentos: si la oración tiene sentido, lo explica.' }),
    play('pista-tipo', '¿Con qué se respalda cada uno? Ata cada respaldo a su fragmento.', { ...A, lineas: ['Varios estudios han encontrado que mejoran la atención.', 'Un profesor cuenta que discutieron una semana.', 'En mi consultorio lo veo cada semana.'], tarjetas: ['investigaciones', 'lo que vive el propio autor', 'lo que cuenta otra persona'], va: [0, 2, 1],
      mira: ['Busca la palabra que habla de ciencia.', 'Busca la primera persona.', 'Busca a alguien distinto del autor.'], bien: 'También se comparan los respaldos.' },
      'Los estudios son investigaciones; «mi consultorio», la experiencia del autor; y el profesor, lo que cuenta otro.',
      { hint: 'Fíjate quién habla: ¿la ciencia, otra persona o «yo»?' }),
    play('pinta-voces', 'Pinta cada oración según el enfoque del texto de donde salió.', { ...A, plumas: ['lo que los juegos dan', 'lo que los juegos quitan'], lineas: ['Se reparten tareas y discuten estrategias.', 'Esas horas se las quitan a dormir y a moverse.', 'El juego es el primer lugar donde se sienten parte de un grupo.', 'De que el jugador vuelva depende el negocio.', 'Equivocarse es parte de avanzar.'], va: [0, 1, 0, 1, 0],
      mira: ['¿Es una ganancia o una pérdida?', '¿Es una ganancia o una pérdida?', '¿Es una ganancia o una pérdida?', '¿A quién le conviene que no lo dejen?', '¿Es una ganancia o una pérdida?'], bien: 'El mismo tema, dos enfoques.' },
      'Estrategia, grupo y equivocarse sin miedo son lo que dan (Uno). Las horas y el negocio de que vuelvan, lo que quitan (Dos).',
      { hint: 'Pregunta si la oración muestra algo que el joven gana o algo que pierde.' }),
    play('bisagras', 'Pon en cada hueco cómo se relacionan los dos textos. Sobran dos.', { ...A, pares: [['El Uno destaca lo que dan;', 'el Dos, lo que quitan.'], ['El Uno pide horarios;', 'el Dos pide límites.'], ['Al negocio le conviene que el jugador no pare;', 'el Dos pide regular los cofres.']], fichas: ['en cambio,', 'del mismo modo,', 'por eso', 'es decir,', 'por ejemplo,'], va: [0, 1, 2, null, null],
      mira: ['¿Dónde se oponen?', '¿Dónde dicen algo parecido?', '¿Dónde lo segundo resulta?', 'Ninguna segunda parte aclara la primera.', 'Ninguna segunda parte es un caso.'], bien: 'Se oponen, coinciden y resulta.' },
      'Los enfoques se oponen («en cambio»), coinciden en los límites («del mismo modo») y la regulación resulta del negocio («por eso»).',
      { hint: 'Una pareja choca, otra se parece y en otra lo segundo es consecuencia.' }),
    play('talla-idea', 'Tres resúmenes del párrafo 4 del Texto Uno: pon cada uno en su talla.', { ...A, p: 4, rot: ['se queda en un detalle', 'justa', 'dice de más'], fichas: ['También se puede dejar de dormir por leer.', 'El problema es el exceso, no el videojuego.', 'Ningún juego le hace daño a nadie.'], va: [0, 1, 2],
      mira: ['Es una comparación: ¿es la idea del párrafo?', 'Mira cómo termina el párrafo.', 'Compárala con «ni que no haya que poner límites».'], luz: [[4, 'el problema está en el exceso']], bien: 'Defender no es decir que todo vale.' },
      'Leer es la comparación; «ninguno» exagera. La justa es la última oración: el exceso.',
      { hint: 'El párrafo pone un freno y luego dice dónde está el problema.' }),
    play('descarta-prueba', 'Estas tres opciones son falsas sobre el Texto Uno. Ata cada una a una oración que la desmiente.', { ...A, nums: [4, 5], pregunta: 'Queda en pie', queda: 'Los dos autores rechazan prohibir.', tarjetas: ['Todo juego es bueno.', 'El problema es el videojuego mismo.', 'Lo mejor es prohibirlos.'], va: [0, 2, [3, 4]],
      mira: ['Busca «Nada de esto quiere decir».', 'Busca dónde está el problema.', 'Busca qué conviene.'], bien: 'Cada falsa cae con una oración.' },
      '«Nada de esto quiere decir que todo juego sea bueno»; el problema está en el exceso; y «más que prohibir, conviene acompañar».',
      { hint: 'Busca la oración que habla de lo mismo y lee qué niega.' }),
    play('cambia-palabra', 'Pon en cada hueco la palabra que dice lo mismo. Sobran dos.', { ...A, frases: [[1, 'los videojuegos cargaron con la ', 'fama', ' de ser una pérdida de tiempo'], [4, 'Pero el problema está en el ', 'exceso', ' y en lo que se deja de hacer']], fichas: ['reputación', 'abuso', 'celebridad', 'precio'], va: [0, 1, null, null],
      mira: ['Es algo malo que se decía de ellos.', 'Es jugar tanto que se deja de dormir.', 'Ser célebre es bueno: ¿encaja con «pérdida de tiempo»?', 'Nada en la oración habla de dinero.'], bien: 'La fama puede ser mala.' },
      'Aquí la fama es la reputación y el exceso, el abuso.',
      { hint: 'Lee hasta el final de la oración y mira si se habla bien o mal.' }),
  ]);

  // ---------------- Lección 2 · Qué diría el otro autor ----------------
  setLesson('pu-dt-2', [
    play('pinta-voces', '¿Quién lo diría, según su tesis?', { ...B, plumas: ['el autor Uno', 'el autor Dos', 'ninguno'], lineas: ['«Midamos lo que entrega, no la hora a la que llega.»', '«Al nuevo, siéntenlo junto a alguien con experiencia.»', '«Volvamos todos los cinco días.»', '«Contratemos a la diseñadora de Pasto.»', '«Para él, la oficina es su único escritorio.»'], va: [0, 1, 2, 0, 1],
      mira: ['¿Cuál defiende medir por resultados?', '¿A cuál le preocupan los que empiezan?', '¿Alguno pide cinco días?', '¿Cuál celebra el talento de otras ciudades?', '¿Cuál habla del joven del apartamento?'], bien: 'La tesis es el lente.' },
      'Resultados y talento de otras ciudades son del Uno; el nuevo y el escritorio, del Dos. Cinco días no los pide nadie: el Dos propone dos o tres.',
      { hint: 'Recuerda la tesis de cada uno y pregunta si la frase la contradice.' }),
    play('linea-vida', 'Lleva cada idea a donde está.', { ...B, rot: ['solo el Uno', 'los dos', 'solo el Dos'], fichas: ['Trabajar en casa tiene ventajas.', 'No todos tienen un lugar para trabajar.', 'Se evita el trancón.', 'Los nuevos aprenden oyendo a otros.', 'Conviene ir dos o tres días.'], va: [1, 1, 0, 2, 2],
      mira: ['Lee el comienzo del Dos.', 'Busca «lugar» en los dos textos.', 'Busca el trancón en los dos textos.', 'Busca el pasillo en los dos textos.', 'Busca los días en los dos textos.'], bien: 'El Dos concede: ahí coinciden.' },
      'Las ventajas y la falta de lugar están en los dos. El trancón es del Uno; el aprendizaje y los días, del Dos.',
      { hint: 'Una concesión («No niego que…», «Por supuesto») también es una coincidencia.' }),
    play('balanza-tesis', 'Tesis del **Uno**: el trabajo remoto debe ser la norma. ¿Qué le hace cada idea?', { ...B, tesis: 'El trabajo remoto debe ser la norma', fichas: ['Se ahorran horas de trancón.', 'El aprendizaje del pasillo se pierde.', 'Muchos no tienen dónde trabajar en casa.', 'La pandemia fue hace cinco años.'], va: [0, 1, 1, 2],
      mira: ['Si se ahorra tiempo, ¿la tesis gana o pierde?', 'Si se aprende menos, ¿la tesis gana o pierde?', 'Si no hay dónde, ¿la tesis gana o pierde?', '¿Esa fecha da o quita razones?'], bien: 'Se pesa frente a una sola tesis.' },
      'El ahorro la apoya; perder aprendizaje y no tener lugar la debilitan; la fecha no pesa.',
      { hint: 'No importa de qué texto sale la idea: pregunta qué le hace a esa tesis.' }),
    play('genero-o-cita', 'Una gerente quiere argumentos **contra el Texto Uno**. ¿Cuáles le sirven?', { ...B, rot: ['le sirve', 'no le sirve'], fichas: ['Dos: lo del pasillo no cabe en una videollamada.', 'Uno: los críticos dicen que baja la productividad.', 'Uno: exige un lugar tranquilo y no todos lo tienen.', 'Uno: se contrata talento de cualquier ciudad.'], va: [0, 1, 0, 1],
      mira: ['¿Lo sostiene su autor y choca con el Uno?', '¿El autor lo sostiene o lo rechaza?', 'El autor lo concede: ¿puede usarse en su contra?', '¿Favorece o contradice al Uno?'], bien: 'Lo que el autor rechaza no es idea suya.' },
      'El pasillo es del Dos y choca; el lugar tranquilo lo concede el propio Uno. La productividad la dicen los críticos y él la rechaza; el talento lo favorece.',
      { hint: 'Sirve lo que su autor sostiene o concede y que choca con la tesis del Uno.' }),
    play('comprueba-apuesta', 'Subraya en el párrafo 3 del Texto Uno la oración que mejor prueba esta conclusión.', { ...B, nums: [3], n: 1, apuesta: 'El autor rechaza lo que dicen los críticos sobre vigilar.', va: ['3.1'],
      mira: { '3.0': 'Ahí solo cuenta lo que dicen otros.', '3.2': 'Dice cómo se reconoce un buen trabajo, sin hablar de los críticos.', '3.3': 'Cuenta lo que hicieron algunas empresas.' }, bien: '«Pero esa crítica…»: ahí responde.' },
      '«Pero esa crítica dice más de los jefes que de los trabajadores»: responde y rechaza. La anterior solo la nombra.',
      { hint: 'Busca dónde el autor toma la palabra frente a esa crítica.' }),
    play('descarta-prueba', 'Estas tres opciones son falsas sobre el Texto Uno. Ata cada una a una oración que la desmiente.', { ...B, nums: [4, 5], pregunta: 'Queda en pie', queda: 'El Uno reconoce problemas, pero cree que se resuelven.', tarjetas: ['Todos tienen en casa lo necesario.', 'Esos problemas obligan a volver.', 'Las empresas quieren volver atrás.'], va: [0, 1, 2],
      mira: ['Busca «no todos».', 'Busca «se pueden resolver».', 'Busca «no piensan».'], bien: 'Cada falsa cae con una oración.' },
      '«No todos los tienen»; son problemas «que se pueden resolver… no razones para volver»; y «no piensan volver atrás».',
      { hint: 'Busca la oración que habla de lo mismo y termina de leerla.' }),
    play('voz-de-la-fuente', 'Ata cada frase a la manera de discutir.', { ...B, portadas: [['Tajante', 'corta la discusión'], ['Conciliador', 'le concede al otro'], ['Propositivo', 'ofrece una salida'], ['Cuestionador', 'pone en duda al otro']], tarjetas: ['«Las costumbres cambian. Esta ya cambió.»', '«No niego que tiene ventajas.»', '«Propongo un camino intermedio.»', '«Esa crítica dice más de los jefes.»'], va: [0, 1, 2, 3],
      mira: ['¿Cuál no deja lugar a dudas?', '¿Cuál acepta algo?', '¿Cuál ofrece algo?', '¿Cuál le da la vuelta a lo que dicen otros?'], bien: 'Discutir también tiene tonos.' },
      'La frase corta es tajante; «no niego» concilia; «propongo» ofrece; y la crítica a los jefes cuestiona.',
      { hint: 'Pregunta qué hace con el otro: ¿lo corta, le acepta, le ofrece o lo cuestiona?' }),
    play('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { ...B, texto: 'Quien defiende |el regreso obligatorio a la oficina| defiende, en el fondo, |una costumbre|. Las costumbres cambian. Esta ya cambió. |Madres y padres| ganaron tiempo para sus hijos, y en |las calles| hubo menos carros.', tarjetas: ['«Esta»', '«sus»'], va: [1, 2],
      mira: ['¿Qué es lo que ya cambió?', '¿Quiénes tienen hijos?'], bien: 'Se reemplaza y se lee.' },
      '«Esta» es la costumbre de ir a la oficina; los hijos son de las madres y los padres.',
      { hint: 'Pon cada opción en vez de la palabra y lee la oración.' }),
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
