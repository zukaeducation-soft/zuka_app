// Preuniversitario · Comprensión lectora · mundo 4 «Inferencia» con textos de verdad (spec 2026-11-19-preuda-lectura-textos): una
// panadería donde casi nada se dice y todo se ve (ideas implícitas), una columna llena de «por fin», «todavía» y «otra vez»
// (presupuestos), un pueblo que se vacía y una causa equivocada (causa y efecto) y un testimonio sobre una máquina de coser
// (actitudes y motivos). La evaluación usa la crónica de un cartero rural. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const PAN = {
    id: 'lec-panaderia', title: 'Las tres de la mañana',
    ficha: { autor: 'Relato de un escritor de Medellín', fuente: 'Antología de relatos de barrio', fecha: '2023' },
    paras: [
      'A las tres de la mañana, cuando el barrio todavía duerme, en la panadería de don Aurelio ya huele a levadura. Él llega primero, prende el horno y pone a hervir el agua del tinto. Su hijo Camilo llega media hora después, con los ojos a medio abrir, y se lava las manos sin decir palabra. Hace cuatro años que trabajan juntos, y en ese tiempo han aprendido a hablar poco antes de que salga la primera bandeja.',
      'Don Aurelio amasa como si estuviera escuchando la masa. Hunde los dedos, la dobla, la vuelve a hundir y de pronto se detiene. «Todavía no», dice, y la deja reposar bajo un trapo. Camilo, en cambio, mira el reloj del celular cada tanto. Ha visto en internet unas máquinas que amasan solas en diez minutos y ya ha dejado sobre el mostrador, más de una vez, el folleto de una de ellas.',
      'A las cinco y media empiezan a llegar los primeros clientes: los celadores que terminan su turno, las enfermeras que lo empiezan, un señor que compra siempre seis panes de queso y nunca saluda. Don Aurelio los conoce a todos por lo que piden. A la señora Inés le guarda el pan más tostado sin que ella tenga que pedirlo, desde que una mañana la vio devolver uno porque estaba pálido.',
      'Hace dos meses abrió un supermercado a tres cuadras, con una panadería que vende el pan más barato. Desde entonces, don Aurelio hornea dos bandejas menos cada mañana. No ha dicho nada en la casa, pero la libreta donde anota las ventas ya no queda abierta sobre el mostrador: ahora la guarda en el bolsillo del delantal.',
      'Esta mañana, cuando salió la última bandeja, Camilo se quedó mirando a su papá mientras contaba los billetes. Después recogió el folleto de la máquina, lo dobló en cuatro y lo metió en la basura. «Mañana llego a las tres», dijo. Don Aurelio no contestó. Siguió contando, pero se le perdió la cuenta y tuvo que empezar otra vez.',
    ],
  };

  const CICLO = {
    id: 'lec-ciclorruta', title: 'La ciclorruta, por fin (y a medias)',
    ficha: { autor: 'Columna de opinión', fuente: 'Periódico de una ciudad intermedia', fecha: 'Agosto de 2025' },
    paras: [
      'Por fin, después de tres alcaldías y otras tantas promesas, la ciclorruta que une el barrio La Floresta con el centro dejó de ser un dibujo en un plano. Desde el lunes, quienes van en bicicleta al trabajo ya no tienen que disputarles el carril a los buses en la avenida. Es una buena noticia, y vale la pena decirlo antes de cualquier queja.',
      'Pero las quejas también hay que decirlas. La ciclorruta vuelve a terminar donde terminan casi todas las obras de esta ciudad: en el borde de lo difícil. Recorre once kilómetros planos y bien iluminados y se interrumpe justo antes de la loma de San Antonio, donde viven los trabajadores que más la necesitan, los que todavía suben a pie porque el bus les cuesta medio día de jornal.',
      'La secretaría de movilidad explica que el tramo de la loma quedó para una segunda etapa. Lo malo es que esta ciudad ya sabe lo que significa una segunda etapa: el parque de la quebrada sigue esperando la suya desde 2015, y el puente peatonal del colegio dejó de aparecer en los presupuestos hace dos años, aunque nadie lo haya cancelado oficialmente. Los niños de ese colegio siguen cruzando la avenida entre los carros, como lo hacían sus hermanos mayores cuando se anunció el puente.',
      'Tampoco es cierto, como repiten algunos funcionarios, que la gente de las lomas no usa bicicleta. La usa menos porque nadie le ha construido por dónde subir con ella. Pedir que primero aparezcan los ciclistas para después hacer la vía es como exigir que alguien aprenda a nadar antes de dejarlo meterse al agua. En los barrios planos tampoco había ciclistas antes de la ciclorruta; aparecieron cuando tuvieron por dónde andar.',
      'La ciclorruta que se inauguró el lunes demuestra que la ciudad sí puede hacer bien una obra cuando decide hacerla. Ahora falta que decida hacerla completa, empezando por donde la cuesta es más dura y el bolsillo más corto. Ojalá esta vez la segunda etapa no tenga que esperar a otra alcaldía.',
    ],
  };

  const PUEBLO = {
    id: 'lec-casas-candado', title: 'Las casas con candado',
    ficha: { autor: 'Reportaje de una periodista regional', fuente: 'Revista de un periódico del Eje Cafetero', fecha: 'Mayo de 2025' },
    paras: [
      'En San José de la Montaña, de cada diez casas de la calle principal, tres tienen candado en la puerta y una mata de helecho que nadie riega. Sus dueños no murieron ni se perdieron: viven en Medellín, en Bogotá o en Madrid, y vuelven, si acaso, para las fiestas de diciembre.',
      'La historia empezó a cambiar hace unos veinte años, cuando el precio de la leche cayó y varias familias vendieron sus vacas. Con menos ordeño hubo menos trabajo para los jóvenes, que antes se empleaban en las fincas desde los catorce. Muchos se fueron a estudiar o a buscar empleo a la ciudad. Al principio volvían cada mes; después, cada año. En diciembre todavía se nota: durante dos semanas las calles se llenan de carros con placas de otras ciudades, y en enero el pueblo se vacía de nuevo.',
      'La escuela de la vereda La Esperanza cerró en 2019 porque quedaban seis niños. Los que quedaron empezaron a viajar una hora en chiva hasta el colegio del pueblo, y algunas familias prefirieron mudarse más cerca o irse del todo. Así, la falta de niños cerró la escuela, y el cierre de la escuela se llevó a más niños.',
      'Hay quien culpa a la carretera pavimentada, que se terminó en 2010, justo cuando más gente se estaba yendo. Pero la carretera no expulsó a nadie: los que se iban ya tenían razones para irse, y lo único que cambió fue que el viaje se hizo más corto. De hecho, la misma carretera trajo el año pasado a los primeros turistas, y con ellos dos hostales y una tienda de quesos.',
      'La alcaldía ofrece ahora un subsidio para jóvenes que quieran volver y montar un negocio. Todavía es pronto para saber si funcionará: hasta ahora, dos jóvenes han preguntado por él, una para abrir una panadería y otro para montar un taller de motos. Lo que sí parece claro es que no bastará con el dinero: quien vuelve necesita también una escuela para sus hijos, señal en el celular y alguien con quien hablar en la tarde.',
    ],
  };

  const MAQUINA = {
    id: 'lec-maquina-coser', title: 'La máquina del comedor',
    ficha: { autor: 'Testimonio de una abogada de Bello', fuente: 'Concurso de relatos «Historias de mi casa»', fecha: '2024' },
    paras: [
      'La máquina de coser de mi mamá sigue en el rincón del comedor, con su forro de tela de flores. Nadie la usa desde hace seis años, pero todos los domingos alguien le quita el polvo. Mis hermanas dicen que soy yo; yo digo que son ellas. Ninguna lo ha visto, y ninguna lo pregunta.',
      'Mi mamá cosió en esa máquina durante treinta años. Hacía uniformes para dos colegios del barrio, y en diciembre se acostaba a la una de la mañana con los dedos llenos de curitas. Cuando alguien le decía que descansara, contestaba: «Descansar es para los ricos», y se reía, pero no paraba. Cosía con la radio prendida, tarareando boleros, y solo se callaba cuando tenía que contar los botones. Con esos uniformes pagó el estudio de las tres.',
      'Yo nunca quise aprender. Me daba rabia el ruido del pedal cuando quería ver televisión, y me daba más rabia que ella me pidiera ayuda para hacer los ojales. Le decía que yo iba a ser abogada y que las abogadas no hacían ojales. Ella me miraba por encima de las gafas y seguía cosiendo. Cuando entré a la universidad, me hizo una carpeta de tela para los apuntes, con mis iniciales bordadas. La usé un mes y la cambié por una de plástico.',
      'El año pasado se me descosió la toga el día de mi grado. Faltaba una hora para la ceremonia. Mis hermanas estaban peinándose, nadie tenía aguja, y yo me encontré abriendo el forro de flores, enhebrando la máquina como la había visto hacerlo diez mil veces y pisando el pedal. Me temblaban las manos, como si ella estuviera mirándome por encima de las gafas. La costura quedó torcida. No me importó.',
      'En la foto del grado salgo sonriendo, con la toga torcida a la altura del hombro. La tengo en la mesa de noche. Cuando alguien me pregunta por qué no la mandé arreglar con un fotógrafo, le digo que me gusta así. No le explico más.',
    ],
  };

  // ---------------- Lección 1 · Ideas implícitas ----------------
  setLesson('pu-in-1', [
    play('lupa-evidencia', 'Lo que el relato no dice, pero muestra', { doc: PAN, cards: [
      ['Hace cuatro años que padre e hijo trabajan juntos.', 0],
      ['Las ventas de la panadería bajaron desde que abrió el supermercado.', 1],
      ['Don Aurelio no quiere que su familia vea cómo van las ventas.', 1],
      ['Camilo quería que compraran una máquina de amasar.', 1],
      ['El supermercado vende pan de peor calidad.', 2],
      ['Camilo piensa irse a trabajar al supermercado.', 2],
    ] }, 'Los cuatro años están escritos. Lo demás se infiere con pistas: dos bandejas menos desde el supermercado; la libreta que ya no queda abierta, sino en el bolsillo; el folleto que Camilo dejaba una y otra vez en el mostrador. El texto no juzga el pan del supermercado (solo dice que es más barato) ni sugiere que Camilo se quiera ir.',
      { hint: 'Una inferencia se apoya en un detalle del texto. Para cada afirmación, busca el gesto o el dato que la sostiene.' }),
    play('termometro-tono', 'Lo que dicen los gestos', { doc: PAN, rounds: [
      { frag: '«Todavía no», dice, y la deja reposar bajo un trapo.', scale: ['paciente', 'apurado', 'enojado', 'burlón'], answer: 0 },
      { frag: 'Siguió contando, pero se le perdió la cuenta y tuvo que empezar otra vez.', scale: ['conmovido', 'indiferente', 'furioso', 'aburrido'], answer: 0 },
    ] }, 'Don Aurelio espera a que la masa esté lista: es paciente. Y quien pierde la cuenta justo después de oír a su hijo está conmovido, aunque no conteste.',
      { hint: 'El relato no nombra lo que sienten: lo muestra. ¿Qué le pasa a alguien que pierde la cuenta en ese momento?' }),
    play('hilo-referente', '¿Quién y qué?', { doc: PAN, rounds: [
      { p: 3, text: 'A |la señora Inés| le guarda |el pan más tostado| sin que |ella| tenga que pedirlo', from: 5, answer: 1 },
      { p: 5, text: 'Camilo se quedó mirando a |su papá| mientras contaba |los billetes|. Después recogió |el folleto de la máquina|, |lo| dobló en cuatro', from: 7, answer: 5 },
    ] }, '«Ella» es la señora Inés: es quien no tiene que pedir su pan. Y lo que Camilo dobla en cuatro es el folleto de la máquina, que luego bota.',
      { hint: 'Fíjate en el género y el número: «ella» es una mujer; «lo», algo masculino y singular que se puede doblar.' }),
    play('caso-nuevo', 'Gestos que hablan', { doc: PAN, principle: 'Las personas muestran lo que sienten más por lo que hacen que por lo que dicen.', cards: [
      ['Una vecina que, sin decir nada, le lleva sopa todos los días a un enfermo.', true],
      ['Un estudiante que guarda en un cajón el boletín de notas para que nadie lo vea.', true],
      ['Un hombre que escribe en una carta: «Estoy muy preocupado».', false],
      ['Una tienda que pone el letrero «Cerrado por vacaciones».', false],
    ] }, 'La sopa diaria y el boletín escondido dicen mucho sin palabras, como la libreta de don Aurelio o el folleto en la basura. La carta lo dice abiertamente, y el letrero solo informa.',
      { hint: 'Busca los casos en los que un sentimiento se adivina por un gesto, sin que nadie lo diga.' }),
    play('palabra-a-la-medida', 'Palabras del relato', { doc: PAN, rounds: [
      { p: 2, before: 'Don Aurelio amasa como si estuviera ', word: 'escuchando', after: ' la masa.', options: ['prestándole atención a', 'hablándole a', 'vendiéndole', 'olvidando'], answer: 0 },
      { p: 3, before: 'la vio devolver uno porque estaba ', word: 'pálido', after: '.', options: ['poco tostado', 'enfermo', 'frío', 'duro'], answer: 0 },
    ] }, 'Amasar «escuchando» es estar atento a cómo responde la masa. Y un pan pálido está poco tostado: por eso don Aurelio le guarda el más tostado. «Enfermo» es el sentido más común de la palabra, pero no el de esta frase.',
      { hint: 'Pregúntate de qué se habla en cada frase. Un pan no puede estar enfermo.' }),
    play('donde-buscar', 'Vuelve a la escena', { doc: PAN, cards: [
      ['¿A qué hora llega don Aurelio?', [1]], ['¿Qué ha visto Camilo en internet?', [2]], ['¿Qué pan le guardan a la señora Inés?', [3]],
      ['¿Qué cambió con el supermercado?', [4]], ['¿Qué hizo Camilo con el folleto?', [5]],
    ] }, 'El relato sigue una mañana: la llegada (1), el amasado (2), los clientes (3), la amenaza del supermercado (4) y la decisión de Camilo (5).',
      { hint: 'Piensa en qué momento de la mañana ocurre cada cosa.' }),
    play('mapa-del-texto', 'Cómo avanza el relato', { doc: PAN, labels: ['presenta a padre e hijo y su rutina', 'contrasta dos maneras de trabajar', 'muestra la relación con los clientes', 'cuenta la amenaza del supermercado', 'narra la decisión de Camilo', 'da la receta del pan'], key: [0, 1, 2, 3, 4] },
      'El relato prepara el final: dos maneras de trabajar (párrafo 2) y una amenaza (párrafo 4) hacen que el gesto de Camilo en el párrafo 5 tenga peso. No hay receta.',
      { hint: 'El párrafo 2 tiene un «en cambio». ¿Qué se opone allí?' }),
  ]);

  // ---------------- Lección 2 · Presupuestos ----------------
  setLesson('pu-in-2', [
    play('lupa-evidencia', 'Lo que la columna da por hecho', { doc: CICLO, cards: [
      ['La ciclorruta mide once kilómetros.', 0],
      ['Antes del lunes, los ciclistas compartían el carril con los buses.', 1],
      ['El puente peatonal del colegio estuvo alguna vez en los presupuestos.', 1],
      ['Otras obras de la ciudad también quedaron incompletas.', 1],
      ['La segunda etapa del puente fue cancelada oficialmente.', 2],
      ['La mayoría de quienes viven en la loma tienen bicicleta.', 2],
    ] }, 'Los once kilómetros están escritos. Lo demás lo presuponen palabras como «ya no tienen que» (antes tenían que), «dejó de aparecer» (antes aparecía) y «vuelve a terminar donde terminan casi todas» (ya pasó con otras obras). El texto dice que nadie canceló el puente y no dice cuántos tienen bicicleta.',
      { hint: 'Busca palabras como «ya no», «dejó de», «vuelve a», «todavía». Cada una da por hecho algo que pasó antes.' }),
    play('palabra-a-la-medida', 'Palabras que cargan pasado', { doc: CICLO, rounds: [
      { p: 2, before: 'los que ', word: 'todavía', after: ' suben a pie', options: ['aún hoy', 'nunca', 'a veces', 'ya no'], answer: 0 },
      { p: 3, before: 'el parque de la quebrada ', word: 'sigue', after: ' esperando la suya desde 2015', options: ['continúa', 'empieza', 'deja de', 'vuelve a'], answer: 0 },
    ] }, '«Todavía» dice que siguen subiendo a pie, como antes. «Sigue esperando» presupone que la espera empezó hace tiempo, en 2015, y no ha terminado.',
      { hint: 'Las dos palabras hablan de algo que empezó antes y no ha terminado. ¿Cuál opción conserva esa idea?' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: CICLO, rounds: [
      { p: 2, text: 'La ciclorruta vuelve a terminar donde terminan casi todas las obras de esta ciudad|:| en el borde de lo difícil.', options: ['anuncia dónde terminan esas obras', 'introduce una cita', 'abre una lista de calles', 'cierra una pregunta'], answer: 0 },
      { p: 4, text: 'Tampoco es cierto|,| como repiten algunos funcionarios, que la gente', options: ['abre un inciso que dice quién sostiene esa idea', 'separa los elementos de una lista', 'anuncia un ejemplo', 'marca el final de la oración'], answer: 0 },
    ] }, 'Los dos puntos anuncian el lugar donde terminan las obras. La coma abre un inciso que dice de quién es la idea que el autor va a desmentir.',
      { hint: 'Lee lo que viene justo después de cada signo y pregúntate qué agrega.' }),
    play('balanza-argumento', '¿Hay que hacer ya la loma?', { doc: CICLO, thesis: 'La ciudad debería construir ya el tramo de la ciclorruta en la loma.', cards: [
      ['En la loma viven los trabajadores que más la necesitan.', 0],
      ['La gente de las lomas usa poco la bicicleta porque no tiene por dónde subir.', 0],
      ['En esta ciudad, las segundas etapas suelen quedarse sin hacer.', 0],
      ['Un estudio muestra que en lomas así casi nadie usaría la bicicleta aunque hubiera vía.', 1],
      ['El tramo plano está bien iluminado.', null],
    ] }, 'Las tres primeras son razones del autor para no esperar. Si casi nadie fuera a usar la vía, la urgencia se cae. La iluminación del tramo plano no dice nada sobre la loma.',
      { hint: 'Si cada oración fuera cierta, ¿le daría más razón o menos razón a quien pide la obra ya?' }),
    play('termometro-tono', 'El tono de la columna', { doc: CICLO, rounds: [
      { frag: 'Es una buena noticia, y vale la pena decirlo antes de cualquier queja.', scale: ['equilibrado', 'furioso', 'burlón', 'triste'], answer: 0 },
      { frag: 'Ojalá esta vez la segunda etapa no tenga que esperar a otra alcaldía.', scale: ['desconfiado', 'eufórico', 'indiferente', 'burlón'], answer: 0 },
    ] }, 'El autor reconoce lo bueno antes de criticar: es equilibrado. Y «ojalá esta vez» deja ver que desconfía, porque antes no se cumplió.',
      { hint: 'Fíjate en «esta vez»: ¿qué da por hecho sobre las veces anteriores?' }),
    play('conector-bisagra', 'Bisagras de la columna', { doc: CICLO, rounds: [
      { a: 'La ciclorruta es una buena noticia.', b: 'las quejas también hay que decirlas.', options: ['Pero', 'Por eso,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'La gente de las lomas usa menos la bicicleta', b: 'nadie le ha construido por dónde subir con ella.', options: ['porque', 'aunque', 'en cambio,', 'por ejemplo,'], answer: 0 },
      { a: 'La ciudad sí puede hacer bien una obra cuando decide hacerla.', b: 'falta que decida hacerla completa.', options: ['Sin embargo,', 'Por ejemplo,', 'Porque', 'O sea,'], answer: 0 },
    ] }, 'Lo bueno se opone a las quejas (contraste); la falta de vía explica el poco uso (causa); y el logro tiene un límite (contraste).',
      { hint: 'Pregúntate si la segunda idea se opone a la primera o la explica.' }),
    play('resume-parrafo', 'La idea de cada párrafo', { doc: CICLO, paras: [2, 3, 4], options: [
      'La ciclorruta se detiene justo donde más falta hace.',
      'Las segundas etapas de la ciudad suelen quedarse esperando.',
      'No es que en la loma no usen bicicleta: no tienen por dónde subir.',
      'La ciclorruta es un desperdicio de dinero.',
      'El puente peatonal fue cancelado oficialmente.',
    ], key: [0, 1, 2] }, 'Cada resumen recoge la crítica de su párrafo. El autor celebra la ciclorruta, así que no la llama desperdicio, y dice que nadie canceló el puente.',
      { hint: 'Desconfía de los resúmenes que contradicen al autor o que convierten un detalle en la idea principal.' }),
  ]);

  // ---------------- Lección 3 · Causa y efecto ----------------
  setLesson('pu-in-3', [
    play('mapa-del-texto', 'De las causas a los efectos', { doc: PUEBLO, labels: ['muestra el efecto: casas vacías', 'cuenta la primera causa', 'explica una cadena que se alimenta sola', 'descarta una causa equivocada', 'presenta una posible solución y sus límites', 'da cifras del turismo'], key: [0, 1, 2, 3, 4] },
      'El reportaje empieza por el efecto (las casas con candado), va a la causa (la leche), muestra el círculo de la escuela, descarta la carretera y termina con el subsidio. Del turismo solo se dice que llegó; no hay cifras.',
      { hint: 'El texto no sigue el orden del tiempo: empieza por lo que se ve hoy y luego busca por qué.' }),
    play('lupa-evidencia', 'Causas dichas y causas deducidas', { doc: PUEBLO, cards: [
      ['La escuela cerró porque quedaban pocos niños.', 0],
      ['La caída del precio de la leche dejó a los jóvenes con menos trabajo.', 0],
      ['La carretera facilitó la salida de quienes ya querían irse.', 1],
      ['El turismo podría abrir nuevas fuentes de trabajo en el pueblo.', 1],
      ['La carretera es la causa principal de que el pueblo se vaciara.', 2],
      ['El subsidio ya hizo volver a varios jóvenes.', 2],
    ] }, 'Las dos primeras causas están escritas. Que la carretera solo acortó el viaje de quienes ya se iban, y que el turismo trajo negocios, se deduce del párrafo 4. El texto niega que la carretera sea la causa, y dice que es pronto para saber si el subsidio funciona.',
      { hint: 'Ojo con la causa que el texto menciona para descartarla: mencionarla no es afirmarla.' }),
    play('caso-nuevo', 'Después no es por', { doc: PUEBLO, principle: 'Que algo ocurra después de otro hecho no prueba que ese hecho lo haya causado.', ask: '¿En cuáles situaciones sirve esta idea para corregir un error?', cards: [
      ['Llovió el día que se inauguró el parque, y alguien culpa al parque de la lluvia.', true],
      ['Un estudiante usó el mismo lápiz en dos exámenes que ganó y cree que el lápiz le da suerte.', true],
      ['Un pueblo culpa a una antena nueva de que ese invierno hubo más gripa.', true],
      ['Un vaso se rompe porque se cayó al piso.', false],
      ['Una planta se seca porque nadie la riega.', false],
    ] }, 'El parque, el lápiz y la antena repiten el error de culpar a la carretera: solo coincidieron en el tiempo. El vaso y la planta son causas reales.',
      { hint: 'Pregúntate si en cada caso hay una causa real o solo dos cosas que pasaron una después de la otra.' }),
    play('conector-bisagra', 'La cadena de causas', { doc: PUEBLO, rounds: [
      { a: 'El precio de la leche cayó y varias familias vendieron sus vacas.', b: 'hubo menos trabajo para los jóvenes.', options: ['Por eso,', 'Aunque', 'Por ejemplo,', 'En cambio,'], answer: 0 },
      { a: 'Hay quien culpa a la carretera pavimentada.', b: 'la carretera no expulsó a nadie.', options: ['Pero', 'Por lo tanto,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'La escuela cerró en 2019', b: 'quedaban seis niños.', options: ['porque', 'así que', 'aunque', 'sin embargo,'], answer: 0 },
    ] }, 'La venta de las vacas produce la falta de trabajo (consecuencia). La creencia sobre la carretera se desmiente (contraste). Y los pocos niños explican el cierre (causa).',
      { hint: 'Mira en qué orden van la causa y el efecto: a veces la causa va primero y a veces después.' }),
    play('hilo-referente', '¿Con quiénes llegaron los hostales?', { doc: PUEBLO, rounds: [
      { p: 4, text: 'Pero |la carretera| no expulsó a nadie: |los que se iban| ya tenían razones para irse, y lo único que cambió fue que |el viaje| se hizo más corto. De hecho, |la misma carretera| trajo el año pasado a |los primeros turistas|, y con |ellos|', from: 11, answer: 9 },
    ] }, 'Con los turistas llegaron los hostales y la tienda de quesos. «Los que se iban» también es plural, pero ellos se fueron: no trajeron nada.',
      { hint: 'Busca un grupo de personas, en plural, que pueda traer negocios a un pueblo.' }),
    play('balanza-argumento', '¿Culpa de la carretera?', { doc: PUEBLO, thesis: 'La carretera no fue la causa de que el pueblo se vaciara.', cards: [
      ['Los que se iban ya tenían razones para irse.', 0],
      ['La gente empezó a irse antes de que se terminara la carretera.', 0],
      ['Un censo muestra que casi nadie se fue antes de 2010.', 1],
      ['En pueblos vecinos sin carretera nueva, casi nadie se fue.', 1],
      ['La escuela de La Esperanza cerró en 2019.', null],
    ] }, 'Que ya hubiera razones y que la salida empezara antes apoyan la tesis. Si nadie se hubiera ido antes de 2010, o si sin carretera nadie se fuera, la carretera sí parecería la causa. El cierre de la escuela no dice nada sobre la carretera.',
      { hint: 'Para debilitar «no fue la causa», hace falta algo que relacione la salida de la gente con la carretera.' }),
    play('donde-buscar', 'Cada causa en su párrafo', { doc: PUEBLO, cards: [
      ['¿Cuántas casas tienen candado?', [1]], ['¿Qué pasó con el precio de la leche?', [2]], ['¿Por qué cerró la escuela?', [3]],
      ['¿Cuándo se terminó la carretera?', [4]], ['¿Qué ofrece la alcaldía?', [5]],
    ] }, 'Las casas (1), la leche (2), la escuela (3), la carretera (4) y el subsidio (5): cada párrafo trata una pieza de la explicación.',
      { hint: 'Ubica la palabra clave de cada pregunta: candado, leche, escuela, carretera, alcaldía.' }),
  ]);

  // ---------------- Lección 4 · Actitudes y motivos ----------------
  setLesson('pu-in-4', [
    play('termometro-tono', 'Lo que siente quien escribe', { doc: MAQUINA, rounds: [
      { frag: 'Nadie la usa desde hace seis años, pero todos los domingos alguien le quita el polvo.', scale: ['nostálgico', 'alegre', 'burlón', 'furioso'], answer: 0 },
      { frag: 'Le decía que yo iba a ser abogada y que las abogadas no hacían ojales.', scale: ['desdeñoso', 'agradecido', 'temeroso', 'triste'], answer: 0 },
      { frag: 'Cuando alguien me pregunta por qué no la mandé arreglar con un fotógrafo, le digo que me gusta así. No le explico más.', scale: ['reservado', 'avergonzado', 'burlón', 'furioso'], answer: 0 },
    ] }, 'Cuidar una máquina que nadie usa es nostalgia. De joven, la autora miraba el oficio por encima del hombro. Y al final guarda para sí lo que esa foto significa.',
      { hint: 'Ninguna emoción está nombrada en el texto: búscala en lo que la autora hace o deja de hacer.' }),
    play('lupa-evidencia', 'Lo que se sabe y lo que se adivina', { doc: MAQUINA, cards: [
      ['La madre cosió durante treinta años.', 0],
      ['La autora estudió Derecho.', 1],
      ['Las tres hermanas cuidan la máquina sin decirlo.', 1],
      ['La autora aprendió a usar la máquina mirando a su madre.', 1],
      ['La madre ganaba mucho dinero con los uniformes.', 2],
      ['Las hermanas de la autora saben coser.', 2],
    ] }, 'Los treinta años están escritos. Que estudió Derecho se infiere de que quería ser abogada y se graduó con toga; que todas cuidan la máquina, de que alguien le quita el polvo y nadie lo admite; y que aprendió mirando, de «como la había visto hacerlo diez mil veces». «Descansar es para los ricos» sugiere lo contrario de mucho dinero, y del oficio de las hermanas no se dice nada.',
      { hint: 'Para inferir hace falta una pista. Si ninguna frase apunta en esa dirección, es una suposición.' }),
    play('caso-nuevo', 'Lo que se guarda', { doc: MAQUINA, principle: 'Los sentimientos se muestran más en lo que se hace o se guarda que en lo que se dice.', cards: [
      ['Un hombre que conserva en la billetera el último boleto de bus que compró con su padre.', true],
      ['Una abuela que sigue poniendo un plato de más en la mesa los domingos.', true],
      ['Una joven que escribe en su diario: «Hoy estoy triste».', false],
      ['Un comerciante que guarda los recibos para pagar impuestos.', false],
    ] }, 'El boleto y el plato de más muestran el cariño sin palabras, como la foto torcida. El diario lo nombra, y los recibos se guardan por una obligación, no por un sentimiento.',
      { hint: 'No basta con guardar algo: pregúntate si lo que se guarda revela un sentimiento.' }),
    play('hilo-referente', '¿Qué tiene en la mesa de noche?', { doc: MAQUINA, rounds: [
      { p: 5, text: 'En |la foto del grado| salgo sonriendo, con |la toga| torcida a la altura del hombro. |La| tengo en la mesa de noche.', from: 5, answer: 1 },
    ] }, 'Lo que está en la mesa de noche es la foto del grado. «La toga» también es femenina, pero lo que se manda arreglar «con un fotógrafo» es una foto.',
      { hint: 'Lee la oración siguiente: habla de arreglar algo con un fotógrafo.' }),
    play('mapa-del-texto', 'El orden del testimonio', { doc: MAQUINA, labels: ['presenta la máquina y un secreto de familia', 'cuenta el esfuerzo de la madre', 'confiesa su rechazo al oficio', 'narra el día en que usó la máquina', 'cierra con el recuerdo que conserva', 'explica cómo funciona la máquina'], key: [0, 1, 2, 3, 4] },
      'El testimonio va de hoy al pasado y vuelve: la máquina, la madre, el rechazo de la autora, el grado y la foto. No es un manual: nunca explica cómo funciona la máquina.',
      { hint: 'Busca el giro: el párrafo 3 dice «nunca quise aprender» y el 4 cuenta lo que pasó después.' }),
    play('palabra-a-la-medida', 'Palabras de la casa', { doc: MAQUINA, rounds: [
      { p: 1, before: 'con su ', word: 'forro', after: ' de tela de flores.', options: ['funda', 'cajón', 'pedal', 'dibujo'], answer: 0 },
      { p: 2, before: 'y se reía, pero no ', word: 'paraba', after: '.', options: ['dejaba de coser', 'se enojaba', 'dormía', 'pagaba'], answer: 0 },
    ] }, 'El forro es la funda de tela que cubre la máquina. Y la madre se reía, pero no dejaba de coser: seguía trabajando hasta la madrugada.',
      { hint: 'En el párrafo 4 la autora «abre» el forro. Y en el 2, lee qué le pedían a la madre que hiciera.' }),
    play('donde-buscar', 'Vuelve al párrafo', { doc: MAQUINA, cards: [
      ['¿Dónde está la máquina?', [1]], ['¿Para quién hacía uniformes la madre?', [2]], ['¿Qué quería ser la autora?', [3]],
      ['¿Qué se le dañó el día del grado?', [4]], ['¿Dónde guarda la foto?', [5]],
    ] }, 'La máquina hoy (1), la madre (2), la autora joven (3), el grado (4) y la foto (5).',
      { hint: 'El testimonio sigue a la máquina en el tiempo. Ubica en qué momento cae cada pregunta.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const CARTERO = {
    id: 'lec-cartero', title: 'El cartero de los jueves',
    paras: [
      'Todos los jueves, a las ocho de la mañana, Rubén Darío Gallego cuelga en la bicicleta un bolso de lona y sale del pueblo por la carretera destapada que sube a la vereda El Carmen. Lleva veintiocho años haciendo ese recorrido. Antes cargaba cartas; ahora carga, sobre todo, recibos de servicios, citas médicas impresas y, de vez en cuando, un paquete que alguien pidió por internet.',
      'Las cartas dejaron de llegar poco a poco. Primero dejaron de escribir los hijos que se habían ido a la ciudad, cuando en las casas de la vereda empezaron a aparecer celulares. Después dejaron de llegar las postales de diciembre. La última carta escrita a mano que entregó, dice, fue hace tres años, para doña Gilma, de una hermana que vive en Chile y que no tiene celular.',
      'Aun así, Rubén no ha dejado de detenerse en cada casa. En la de don Jesús, que vive solo, se toma un tinto aunque no lleve nada para él. En la de los Ospina, les cuenta a los niños cómo va el partido del domingo. A doña Gilma le pregunta siempre por la hermana de Chile, y ella saca la carta, que guarda dentro de una Biblia, y se la vuelve a leer en voz alta.',
      'La empresa de correos anunció que el próximo año los envíos a la vereda se harán con una empresa de mensajería que pasará cuando haya paquetes, no todos los jueves. Rubén no ha opinado en público. Solo le pidió a su jefe que le dejara hacer el recorrido de los jueves hasta diciembre, «para despedirme bien».',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: CARTERO, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-inferencia', 'Evaluación · Inferencia', [
    ['pu-in-1', 'Una inferencia válida se apoya en una pista del texto, no en lo que uno supone.',
      Q('Del párrafo 1 se puede inferir que:', ['Hoy Rubén lleva menos cartas personales que antes', 'Rubén quiere jubilarse pronto', 'En la vereda nadie usa internet', 'La carretera a El Carmen está pavimentada'], 0,
        '«Antes cargaba cartas; ahora carga, sobre todo, recibos…» deja ver que las cartas personales disminuyeron. El paquete pedido por internet desmiente la opción C, y la carretera es destapada.',
        'Compara lo que Rubén cargaba antes con lo que carga ahora.')],
    ['pu-in-1', 'Un gesto que no tiene una razón práctica suele revelar un motivo afectivo.',
      Q('Que Rubén se tome un tinto en casa de don Jesús «aunque no lleve nada para él» permite inferir que:', ['Don Jesús le paga por la visita', 'Don Jesús espera una carta importante', 'Rubén considera que su visita acompaña a don Jesús', 'Rubén tiene que entrar a todas las casas por reglamento'], 2,
        'Don Jesús vive solo y Rubén entra sin tener nada que entregarle: su visita es compañía. Nada habla de pagos ni de reglamentos.',
        'Fíjate en el detalle que el texto da sobre don Jesús.')],
    ['pu-in-2', 'Las expresiones «no ha dejado de», «ya no», «otra vez» dan por hecho algo anterior.',
      Q('La frase «Rubén no ha dejado de detenerse en cada casa» presupone que:', ['Nunca se había detenido en las casas', 'Antes también se detenía en cada casa', 'Pronto dejará de hacerlo', 'Las casas están muy lejos unas de otras'], 1,
        '«No ha dejado de» supone que lo hacía antes y lo sigue haciendo.',
        'Para dejar de hacer algo, primero hay que haberlo hecho.')],
    ['pu-in-2', '«El último» presupone que hubo otros antes; no dice que no habrá más.',
      Q('La expresión «La última carta escrita a mano que entregó» presupone que:', ['Doña Gilma no sabe leer', 'La hermana de Chile escribe cada mes', 'No volverá a entregar ninguna carta', 'Antes entregó otras cartas escritas a mano'], 3,
        'Si hubo una última, hubo otras antes. Que no vuelva a entregar ninguna es una suposición, y doña Gilma lee la carta en voz alta.',
        'Pregúntate qué tiene que haber pasado para que algo sea «el último».')],
    ['pu-in-3', 'Una causa puede ir marcada solo por «cuando» y por el orden de los hechos.',
      Q('Según el párrafo 2, los hijos que se fueron a la ciudad dejaron de escribir cartas porque:', ['Olvidaron a sus padres', 'En las casas de la vereda empezaron a aparecer celulares', 'El correo subió de precio', 'Rubén dejó de subir a la vereda'], 1,
        'El texto une las dos cosas: dejaron de escribir «cuando» aparecieron los celulares; es decir, empezaron a comunicarse por teléfono.',
        'Busca qué cambió en las casas de la vereda justo cuando dejaron de llegar las cartas.')],
    ['pu-in-3', 'Para explicar una excepción, se busca qué la hace distinta de los demás casos.',
      Q('La carta para doña Gilma siguió llegando cuando las demás ya no llegaban porque:', ['La hermana de Chile no tiene celular', 'Doña Gilma prefiere las cartas', 'Chile queda muy lejos', 'Rubén se la pidió a la hermana'], 0,
        'Las cartas se acabaron por los celulares; la hermana de Chile «no tiene celular», por eso siguió escribiendo.',
        'Relaciona el dato sobre la hermana con la causa de que las demás cartas desaparecieran.')],
    ['pu-in-4', 'El lugar donde alguien guarda algo dice cuánto lo valora.',
      Q('Que doña Gilma guarde la carta dentro de una Biblia muestra que:', ['Quiere esconderla de Rubén', 'La carta habla de religión', 'La considera algo valioso', 'No le importa la carta'], 2,
        'La guarda en un lugar especial y la vuelve a leer en voz alta cada vez que Rubén pregunta: la valora.',
        'Piensa en qué objetos se guardan en un lugar así y en lo que hace doña Gilma con la carta.')],
    ['pu-in-4', 'Los motivos se infieren de las acciones y de las palabras elegidas.',
      Q('La petición de Rubén de hacer el recorrido hasta diciembre, «para despedirme bien», revela sobre todo:', ['Enojo con la empresa de correos', 'Cariño por la gente de su recorrido', 'Interés en ganar más dinero', 'Deseo de cambiar de trabajo'], 1,
        'No protesta en público: solo quiere despedirse de las personas que visita cada jueves. Eso muestra cariño.',
        'Fíjate en lo que Rubén no hace (opinar en público) y en lo que pide.')],
  ]);
});
