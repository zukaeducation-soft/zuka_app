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
      'En San José de las Nieblas, de cada diez casas de la calle principal, tres tienen candado en la puerta y una mata de helecho que nadie riega. Sus dueños no murieron ni se perdieron: viven en Medellín, en Bogotá o en Madrid, y vuelven, si acaso, para las fiestas de diciembre.',
      'La historia empezó a cambiar hace unos veinte años, cuando el precio de la leche cayó y varias familias vendieron sus vacas. Con menos ordeño hubo menos trabajo para los jóvenes, que antes se empleaban en las fincas desde los catorce. Muchos se fueron a estudiar o a buscar empleo a la ciudad. Al principio volvían cada mes; después, cada año. En diciembre todavía se nota: durante dos semanas las calles se llenan de carros con placas de otras ciudades, y en enero el pueblo se vacía de nuevo.',
      'La escuela de la vereda La Esperanza cerró en 2019 porque quedaban seis niños. Los que quedaron empezaron a viajar una hora en chiva hasta el colegio del pueblo, y algunas familias prefirieron mudarse más cerca o irse del todo. Así, la falta de niños cerró la escuela, y el cierre de la escuela se llevó a más niños.',
      'Hay quien culpa a la carretera pavimentada, que se terminó en 2010, justo cuando más gente se estaba yendo. Pero la carretera no expulsó a nadie: los que se iban ya tenían razones para irse, y lo único que cambió fue que el viaje se hizo más corto. De hecho, la misma carretera trajo el año pasado a los primeros turistas, y con ellos dos hostales y una tienda de quesos.',
      'La alcaldía ofrece ahora un subsidio para jóvenes que quieran volver y montar un negocio. Todavía es pronto para saber si funcionará: hasta ahora, dos jóvenes han preguntado por él, una para abrir una panadería y otro para montar un taller de motos. Lo que sí parece claro es que no bastará con el dinero: quien vuelve necesita también una escuela para sus hijos, señal en el celular y alguien con quien hablar en la tarde.',
    ],
  };

  const MAQUINA = {
    id: 'lec-maquina-coser', title: 'La máquina del comedor',
    ficha: { autor: 'Testimonio de una lectora de Bello', fuente: 'Concurso de relatos «Historias de mi casa»', fecha: '2024' },
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
    play('subraya-prueba', 'Lo que prueba el gesto', { doc: PAN, rounds: [
      { claim: 'Don Aurelio está preocupado por las ventas, aunque no lo diga.', p: 4, answer: 2 },
      { claim: 'Camilo renunció a la idea de comprar la máquina.', p: 5, answer: 1 },
    ] }, 'Nadie dice «preocupado»: lo muestra la libreta de las ventas, que ya no queda abierta sino guardada en el delantal. Y la renuncia a la máquina está en el folleto que Camilo dobla y bota a la basura.',
      { hint: 'En un relato, los sentimientos se prueban con gestos. Busca el gesto que encaja con la conclusión.' }),
    play('caso-nuevo', 'Gestos que hablan', { doc: PAN, principle: 'Las personas muestran lo que sienten más por lo que hacen que por lo que dicen.', cards: [
      ['Una vecina que, sin decir nada, le lleva sopa todos los días a un enfermo.', true],
      ['Un estudiante que guarda en un cajón el boletín de notas para que nadie lo vea.', true],
      ['Un hombre que escribe en una carta: «Estoy muy preocupado».', false],
      ['Una tienda que pone el letrero «Cerrado por vacaciones».', false],
    ] }, 'La sopa diaria y el boletín escondido dicen mucho sin palabras, como la libreta de don Aurelio o el folleto en la basura. La carta lo dice abiertamente, y el letrero solo informa.',
      { hint: 'Busca los casos en los que un sentimiento se adivina por un gesto, sin que nadie lo diga.' }),
    play('palabra-a-la-medida', 'Palabras del relato', { doc: PAN, rounds: [
      { p: 2, before: 'Don Aurelio amasa como si estuviera ', word: 'escuchando', after: ' la masa.', options: ['prestándole atención a', 'hablándole en voz baja a', 'vendiéndole', 'olvidando'], answer: 0 },
      { p: 3, before: 'la vio devolver uno porque estaba ', word: 'pálido', after: '.', options: ['poco tostado', 'enfermo', 'frío', 'duro como una piedra'], answer: 0 },
    ] }, 'Amasar «escuchando» es estar atento a cómo responde la masa. Y un pan pálido está poco tostado: por eso don Aurelio le guarda el más tostado. «Enfermo» es el sentido más común de la palabra, pero no el de esta frase.',
      { hint: 'Pregúntate de qué se habla en cada frase. Un pan no puede estar enfermo.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: PAN, q: '¿Por qué Camilo bota el folleto de la máquina al final?', options: [
      ['Porque la máquina era demasiado cara para la panadería.', 3],
      ['Porque al ver a su papá contar los billetes entendió que la panadería pasa por un mal momento.', 0],
      ['Porque decidió que nunca más en su vida va a usar una máquina.', 1],
      ['Porque ya no le interesa trabajar en la panadería.', 2],
    ] }, 'B se apoya en lo que pasa: Camilo mira a su papá contar los billetes, bota el folleto y promete llegar a las tres. A no está en el texto (nadie habla del precio); C dice de más, porque habla de toda su vida; y D dice lo contrario de «Mañana llego a las tres». Sobra el sello «Mezcla datos».',
      { hint: 'Para cada opción pregúntate: ¿el texto lo dice, dice algo más pequeño, dice lo opuesto o no habla de eso?' }),
    play('cadena-causas', 'Lo que trajo el supermercado', { doc: PAN, chain: [
      'Abre un supermercado con pan más barato a tres cuadras.',
      'Don Aurelio hornea dos bandejas menos cada mañana.',
      'La libreta de las ventas pasa del mostrador al bolsillo del delantal.',
    ], extra: ['Camilo deja el folleto de la máquina sobre el mostrador.', 'Don Aurelio le guarda el pan más tostado a la señora Inés.'] },
      'El párrafo 4 encadena el supermercado, las bandejas de menos y la libreta que ya no se deja a la vista. El folleto lo dejaba Camilo desde antes, y el pan de la señora Inés es una costumbre que no tiene que ver con el supermercado.',
      { hint: 'Empieza por «Hace dos meses» y sigue lo que cambió «desde entonces».' }),
  ]);

  // ---------------- Lección 2 · Presupuestos ----------------
  setLesson('pu-in-2', [
    play('lupa-evidencia', 'Lo que la columna da por hecho', { doc: CICLO, cards: [
      ['La ciclorruta mide once kilómetros.', 0],
      ['Antes del lunes, los ciclistas compartían el carril con los buses.', 1],
      ['El puente peatonal del colegio estuvo alguna vez en los presupuestos.', 1],
      ['Los niños del colegio llevan años cruzando la avenida entre los carros.', 1],
      ['El puente peatonal fue cancelado oficialmente.', 2],
      ['La mayoría de quienes viven en la loma tienen bicicleta.', 2],
    ] }, 'Los once kilómetros están escritos. Lo demás el texto lo da por sentado: lo presuponen palabras como «ya no tienen que» (antes tenían que), «dejó de aparecer» (antes aparecía) y «como lo hacían sus hermanos mayores» (llevan años cruzando así). El texto dice que nadie canceló el puente y no dice cuántos tienen bicicleta.',
      { hint: 'Busca palabras como «ya no», «dejó de», «vuelve a», «todavía». Cada una da por hecho algo que pasó antes.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: CICLO, ask: 'Según el texto, todas estas obras quedaron a medias o sin hacer, EXCEPTO:', cards: [
      ['El tramo de la ciclorruta en la loma de San Antonio', [2, 3]],
      ['El parque de la quebrada', [3]],
      ['El puente peatonal del colegio', [3]],
      ['La ampliación de la avenida para los buses', null],
    ] }, 'El tramo de la loma está en los párrafos 2 y 3; el parque de la quebrada y el puente del colegio, en el 3. Ninguna ampliación de la avenida aparece en el texto.',
      { hint: 'Lleva cada obra al párrafo que la nombra. La que no tenga dónde ir es la respuesta.' }),
    play('quien-lo-dice', 'Presupuestos sin palabra pista', { doc: CICLO, ask: 'El autor da por sentadas todas estas ideas. Lleva cada una a lo que la delata en el texto.', voices: ['Una palabra de la lista: «ya no», «dejó de», «todavía», «otra vez»', 'Otra cosa: una comparación, un «sí» que insiste o un verbo como «saber»'], cards: [
      ['Antes, los ciclistas tenían que disputarles el carril a los buses.', 0],
      ['El puente del colegio aparecía antes en los presupuestos.', 0],
      ['Casi todas las obras de la ciudad se quedan a medias en lo difícil.', 1],
      ['Las segundas etapas de esta ciudad no suelen llegar.', 1],
      ['Hay quienes dudan de que la ciudad sea capaz de hacer bien una obra.', 1],
    ] }, '«Ya no tienen que» y «dejó de aparecer» son palabras de la lista. Las otras tres no tienen ninguna: «donde terminan casi todas las obras de esta ciudad» compara la ciclorruta con las demás obras y da por sentado que se quedan a medias; «esta ciudad ya sabe lo que significa una segunda etapa» da por hecho que no se cumplen; y el «sí» de «la ciudad sí puede hacer bien una obra» responde a quien lo duda.',
      { hint: 'Para cada idea, busca la frase que la supone. Si lo que la sostiene no es «ya no», «dejó de», «todavía» ni «otra vez», el presupuesto sale de otra cosa.' }),
    play('balanza-argumento', '¿Hay que hacer ya la loma?', { doc: CICLO, thesis: 'La ciudad debería construir ya el tramo de la ciclorruta en la loma.', cards: [
      ['En la loma viven los trabajadores que más la necesitan.', 0],
      ['La gente de las lomas usa poco la bicicleta porque no tiene por dónde subir.', 0],
      ['En esta ciudad, las segundas etapas suelen quedarse sin hacer.', 0],
      ['Un estudio muestra que en lomas así casi nadie usaría la bicicleta aunque hubiera vía.', 1],
      ['El tramo plano está bien iluminado.', null],
    ] }, 'Las tres primeras son razones del autor para no esperar. Si casi nadie fuera a usar la vía, la urgencia se cae. La iluminación del tramo plano no dice nada sobre la loma.',
      { hint: 'Si cada oración fuera cierta, ¿le daría más razón o menos razón a quien pide la obra ya?' }),
    play('subraya-prueba', 'La prueba en la columna', { doc: CICLO, rounds: [
      { claim: 'El autor duda de que la segunda etapa se haga pronto.', p: 3, answer: 1 },
      { claim: 'Una vía nueva puede crear ciclistas donde antes no los había.', p: 4, answer: 3 },
    ] }, 'La duda está en «esta ciudad ya sabe lo que significa una segunda etapa», seguida del parque y del puente que nunca llegaron. Y que la vía crea ciclistas lo prueba el caso de los barrios planos: no había ciclistas hasta que tuvieron por dónde andar.',
      { hint: 'Busca la oración que trae un antecedente o un caso que ya pasó: eso es lo que sostiene la conclusión.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: CICLO, q: 'Según el autor, ¿por qué la gente de las lomas usa poco la bicicleta?', options: [
      ['Porque nadie le ha construido una vía por donde subir con ella.', 0],
      ['Porque las bicicletas le cuestan medio día de jornal.', 4],
      ['Porque en toda la ciudad no se ha construido ninguna ciclorruta.', 1],
      ['Porque a la gente de las lomas no le interesa la bicicleta.', 2],
    ] }, 'A es lo que dice el párrafo 4. B mezcla datos: el medio día de jornal es lo que cuesta el bus, no la bicicleta. C dice de más, porque la ciudad sí tiene once kilómetros nuevos. Y D es justo lo que el autor niega con «Tampoco es cierto». Sobra el sello «El texto no lo dice».',
      { hint: 'Revisa cada opción contra el párrafo 4 y fíjate de quién es cada dato: del bus, de la bicicleta o de los funcionarios.' }),
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
    play('cadena-causas', 'Por qué se fueron', { doc: PUEBLO, chain: [
      'El precio de la leche cae y varias familias venden sus vacas.',
      'Los jóvenes, que trabajaban en las fincas, se quedan sin empleo.',
      'Muchos jóvenes se van a la ciudad a estudiar o a trabajar.',
    ], extra: ['Se termina la carretera pavimentada.', 'Llegan los primeros turistas.'] },
      'Según el párrafo 2, la caída de la leche dejó sin trabajo a los jóvenes y por eso se fueron. El autor discute, en el párrafo 4, que la carretera los haya expulsado: solo hizo más corto el viaje. Y los turistas llegaron mucho después, gracias a la carretera.',
      { hint: 'El texto separa la causa de fondo de lo que solo coincidió en el tiempo. Sigue el párrafo que empieza «La historia empezó a cambiar».' }),
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
    play('resumen-esencial', 'El resumen en cuatro renglones', { doc: PUEBLO, ideas: [
      ['El pueblo se ha ido quedando sin gente.', true],
      ['La caída de la leche dejó sin trabajo a los jóvenes, que se fueron.', true],
      ['La falta de niños y el cierre de la escuela se alimentan entre sí.', true],
      ['Para que la gente vuelva no basta con un subsidio.', true],
      ['Tres de cada diez casas de la calle principal tienen candado.', false],
      ['La carretera se terminó de pavimentar en 2010.', false],
      ['Dos jóvenes han preguntado por el subsidio de la alcaldía.', false],
    ] }, 'Las cuatro ideas siguen el texto: el pueblo vacío, la causa de fondo, el círculo de la escuela y lo que haría falta para volver. Las casas con candado, el año de la carretera y los dos jóvenes son datos que ilustran esas ideas.',
      { hint: 'Si una frase trae una cifra o un año de un solo párrafo, probablemente es un detalle.' }),
    play('balanza-argumento', '¿Culpa de la carretera?', { doc: PUEBLO, thesis: 'La carretera no fue la causa de que el pueblo se vaciara.', cards: [
      ['Los que se iban ya tenían razones para irse.', 0],
      ['La gente empezó a irse antes de que se terminara la carretera.', 0],
      ['Un censo muestra que casi nadie se fue antes de 2010.', 1],
      ['En pueblos vecinos sin carretera nueva, casi nadie se fue.', 1],
      ['La escuela de La Esperanza cerró en 2019.', null],
    ] }, 'Que ya hubiera razones y que la salida empezara antes apoyan la tesis. Si nadie se hubiera ido antes de 2010, o si sin carretera nadie se fuera, la carretera sí parecería la causa. El cierre de la escuela no dice nada sobre la carretera.',
      { hint: 'Para debilitar «no fue la causa», hace falta algo que relacione la salida de la gente con la carretera.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: PUEBLO, q: 'Según el texto, ¿qué papel tuvo la carretera pavimentada en la salida de la gente?', options: [
      ['Fue la causa principal de que el pueblo se vaciara.', 2],
      ['Atrajo a los turistas que compraron las casas con candado.', 4],
      ['Ninguno de fondo: los que se iban ya tenían razones y solo se acortó el viaje.', 0],
      ['Cambió por completo la economía del pueblo.', 1],
    ] }, 'C es lo que dice el párrafo 4. A dice lo contrario: el autor niega que la carretera expulsara a alguien. B mezcla dos datos ciertos (los turistas y las casas con candado) que el texto nunca une. D dice de más: la carretera trajo dos hostales y una tienda de quesos, no un cambio total. Sobra el sello «El texto no lo dice».',
      { hint: 'Fíjate en la oración que empieza «Pero la carretera no expulsó a nadie» y compara cada opción con ella.' }),
  ]);

  // ---------------- Lección 4 · Actitudes y motivos ----------------
  setLesson('pu-in-4', [
    play('ordena-parrafos', 'Arma el relato otra vez', { doc: MAQUINA },
      'El relato abre en el presente con la máquina; el 2 cuenta los treinta años de costura de la mamá; «Yo nunca quise aprender» responde a esa costura, así que va después; «El año pasado» trae el grado y el 5 cierra con la foto de ese grado.',
      { hint: 'La foto del grado no puede ir antes del grado. Y «nunca quise aprender» responde a algo que ya se contó.' }),
    play('termometro-tono', 'Lo que siente quien escribe', { doc: MAQUINA, rounds: [
      { frag: 'Nadie la usa desde hace seis años, pero todos los domingos alguien le quita el polvo.', scale: ['nostálgico', 'alegre', 'burlón', 'furioso'], answer: 0 },
      { frag: 'Le decía que yo iba a ser abogada y que las abogadas no hacían ojales.', scale: ['desdeñoso', 'agradecido', 'temeroso', 'triste'], answer: 0 },
      { frag: 'Cuando alguien me pregunta por qué no la mandé arreglar con un fotógrafo, le digo que me gusta así. No le explico más.', scale: ['reservado', 'avergonzado', 'burlón', 'furioso'], answer: 0 },
    ] }, 'Cuidar una máquina que nadie usa es nostalgia. De joven, la autora miraba el oficio por encima del hombro: era desdeñosa (desdeñar es despreciar algo, creerlo poca cosa). Y al final guarda para sí lo que esa foto significa: es reservada, no cuenta lo que siente.',
      { hint: 'Ninguna emoción está nombrada en el texto: búscala en lo que la autora hace o deja de hacer.' }),
    play('lupa-evidencia', 'Lo que se sabe y lo que se adivina', { doc: MAQUINA, cards: [
      ['La madre cosió durante treinta años.', 0],
      ['La autora estudió Derecho.', 1],
      ['Alguna de las hermanas limpia la máquina sin admitirlo.', 1],
      ['La autora aprendió a usar la máquina mirando a su madre.', 1],
      ['La madre ganaba mucho dinero con los uniformes.', 2],
      ['Las hermanas de la autora saben coser.', 2],
    ] }, 'Los treinta años están escritos. Que estudió Derecho se infiere de que quería ser abogada y se graduó con toga; que alguna la cuida en secreto, de que alguien le quita el polvo y nadie lo admite; y que aprendió mirando, de «como la había visto hacerlo diez mil veces». «Descansar es para los ricos» sugiere lo contrario de mucho dinero, y del oficio de las hermanas no se dice nada.',
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
    play('palabra-a-la-medida', 'Palabras de la casa', { doc: MAQUINA, rounds: [
      { p: 1, before: 'con su ', word: 'forro', after: ' de tela de flores.', options: ['funda', 'cajón', 'pedal', 'dibujo'], answer: 0 },
      { p: 2, before: 'y se reía, pero no ', word: 'paraba', after: '.', options: ['dejaba de coser', 'se enojaba', 'dormía', 'pagaba sus deudas'], answer: 0 },
      { p: 4, before: 'La costura quedó ', word: 'torcida', after: '.', options: ['chueca', 'perfecta', 'rota en dos partes', 'escondida'], answer: 0 },
    ] }, 'El forro es la funda de tela que cubre la máquina. Y la madre se reía, pero no dejaba de coser: seguía trabajando hasta la madrugada. Y una costura torcida queda chueca, no recta: a la narradora no le importó.',
      { hint: 'En el párrafo 4 la autora «abre» el forro. Y en el 2, lee qué le pedían a la madre que hiciera.' }),
    play('subraya-prueba', 'Lo que prueba el gesto', { doc: MAQUINA, rounds: [
      { claim: 'De joven, la narradora despreciaba lo que su mamá hacía por ella.', p: 3, answer: 5 },
      { claim: 'Al coser la toga, la narradora sintió la presencia de su mamá.', p: 4, answer: 3 },
    ] }, 'El desprecio se ve en la carpeta bordada que la mamá le hizo y que ella usó un mes y cambió por una de plástico. La presencia de la mamá, en las manos que temblaban «como si ella estuviera mirándome por encima de las gafas».',
      { hint: 'El relato no nombra los sentimientos: los muestra con un objeto o con un gesto. Busca cuál.' }),
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
      Q('Del párrafo 1 se puede inferir que:', ['Hoy Rubén lleva menos cartas personales que antes', 'Rubén quiere jubilarse pronto y dejar la bicicleta', 'En la vereda nadie usa internet ni pide paquetes', 'La carretera a El Carmen ya está pavimentada del todo'], 0,
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
      Q('La expresión «La última carta escrita a mano que entregó» presupone que:', ['Doña Gilma no sabe leer la letra de su hermana', 'La hermana de Chile escribe cada mes', 'No volverá a entregar ninguna carta', 'Antes entregó otras cartas escritas a mano'], 3,
        'Si hubo una última, hubo otras antes. Que no vuelva a entregar ninguna es una suposición, y doña Gilma lee la carta en voz alta.',
        'Pregúntate qué tiene que haber pasado para que algo sea «el último».')],
    ['pu-in-2', '«Da por sentado» pregunta lo mismo que «presupone»: qué tiene que ser cierto para que la frase tenga sentido, aunque no haya palabra pista.',
      Q('Al pedir hacer el recorrido de los jueves «hasta diciembre», Rubén da por sentado que:', ['después de diciembre ya no hará ese recorrido', 'su jefe le va a negar el permiso que le pidió', 'en diciembre llegarán otra vez muchas cartas', 'la mensajería pasará por la vereda todos los jueves'], 0,
        'Si pide seguir «hasta diciembre» y quiere «despedirse», supone que después el recorrido se acaba: lo hará la mensajería. No hay «ya no» ni «dejó de»: el presupuesto sale de «hasta» y de la despedida. La mensajería pasará «cuando haya paquetes», no cada jueves.',
        'No busques una palabra de la lista. Pregúntate qué tiene que ser cierto para que alguien pida algo «hasta» una fecha y hable de despedirse.')],
    ['pu-in-1', 'Una inferencia también puede ser una crítica que el texto no dice: sale del contraste entre dos datos.',
      Q('Al contraponer «cuando haya paquetes» con «todos los jueves» (párrafo 4), el texto sugiere que la empresa:', ['solo ve en el recorrido una entrega, no la visita que es para la vereda', 'quiere despedir a Rubén porque ya casi no entrega cartas escritas a mano', 'va a cobrarles más a las familias de la vereda por cada envío', 'ya no tendrá paquetes que llevar a la vereda El Carmen'], 0,
        'El texto no critica a la empresa con palabras, pero el párrafo 3 mostró lo que hace Rubén en cada casa aunque no lleve nada. Pasar solo «cuando haya paquetes» deja por fuera justo eso. Nada habla de despidos, de cobros ni de que se acaben los paquetes.',
        'Relaciona el párrafo 4 con lo que Rubén hace en el párrafo 3 cuando no lleva nada para entregar.')],
    ['pu-in-3', 'Una causa puede ir marcada solo por «cuando» y por el orden de los hechos.',
      Q('Según el párrafo 2, los hijos que se fueron a la ciudad dejaron de escribir cartas porque:', ['Olvidaron a sus padres cuando se fueron a vivir a la ciudad', 'En las casas de la vereda empezaron a aparecer celulares', 'El correo subió de precio y ya no podían pagar el envío', 'Rubén dejó de subir a la vereda'], 1,
        'El texto une las dos cosas: dejaron de escribir «cuando» aparecieron los celulares; es decir, empezaron a comunicarse por teléfono.',
        'Busca qué cambió en las casas de la vereda justo cuando dejaron de llegar las cartas.')],
    ['pu-in-3', 'Para explicar una excepción, se busca qué la hace distinta de los demás casos.',
      Q('La carta para doña Gilma siguió llegando cuando las demás ya no llegaban porque:', ['La hermana de Chile no tiene celular', 'Doña Gilma prefiere las cartas a las llamadas', 'Chile queda muy lejos', 'Rubén se la pidió a la hermana'], 0,
        'Las cartas se acabaron por los celulares; la hermana de Chile «no tiene celular», por eso siguió escribiendo.',
        'Relaciona el dato sobre la hermana con la causa de que las demás cartas desaparecieran.')],
    ['pu-in-4', 'El lugar donde alguien guarda algo dice cuánto lo valora.',
      Q('Que doña Gilma guarde la carta dentro de una Biblia muestra que:', ['Quiere esconderla de Rubén', 'La carta habla de religión', 'La considera algo valioso', 'No le importa la carta'], 2,
        'La guarda en un lugar especial y la vuelve a leer en voz alta cada vez que Rubén pregunta: la valora.',
        'Piensa en qué objetos se guardan en un lugar así y en lo que hace doña Gilma con la carta.')],
    ['pu-in-4', 'Los motivos se infieren de las acciones y de las palabras elegidas.',
      Q('La petición de Rubén de hacer el recorrido hasta diciembre, «para despedirme bien», revela sobre todo:', ['Enojo con la empresa de correos', 'Cariño por la gente de su recorrido', 'Interés en ganar más dinero antes de irse', 'Deseo de cambiar de trabajo'], 1,
        'No protesta en público: solo quiere despedirse de las personas que visita cada jueves. Eso muestra cariño.',
        'Fíjate en lo que Rubén no hace (opinar en público) y en lo que pide.')],
  ]);
});
