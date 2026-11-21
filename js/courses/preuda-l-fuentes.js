// Preuniversitario · Comprensión lectora · mundo 7 «Fuentes y voces» con textos de verdad (spec 2026-11-19-preuda-lectura-textos):
// un debate sobre las tareas con tres voces citadas y la del autor (citas y voces) y otro sobre el turismo en un páramo con
// posturas a favor, en contra y matizada, más citas externas que apoyan o debilitan la tesis (posturas y citas externas). La
// evaluación usa un texto sobre grafitis con cuatro voces. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const TAREAS = {
    id: 'lec-tareas-casa', title: '¿Sirven las tareas para la casa?',
    ficha: { autor: 'Columna de una periodista de educación', fuente: 'Periódico de Medellín, sección Educación', fecha: 'Abril de 2025' },
    paras: [
      'Cada tarde, en miles de casas, se repite la misma escena: un niño frente a un cuaderno, un adulto cansado a su lado y una pregunta que nadie se atreve a hacer en voz alta: ¿sirve de algo todo esto? Las tareas para la casa son tan viejas como la escuela, pero la discusión sobre ellas nunca había estado tan viva.',
      'La psicopedagoga Adriana Velásquez, que ha estudiado el tema durante una década, sostiene que la respuesta depende de la edad. «En primaria, la tarea larga no mejora el aprendizaje; lo que mejora es el hábito de leer un rato cada día», explica. En bachillerato, en cambio, reconoce que las tareas bien diseñadas sí se relacionan con mejores resultados, siempre que no pasen de una hora diaria.',
      'Jairo Benavides, profesor de matemáticas en un colegio público de Itagüí, no está tan convencido de que haya que reducirlas. Según él, sin práctica en la casa los estudiantes olvidan en una semana lo que aprendieron en clase. Admite, sin embargo, que muchas tareas se dejan «por cumplir» y que nadie las revisa con cuidado.',
      'Para Liliana Ospina, madre de tres hijos, el problema es otro: las tareas suponen que en todas las casas hay un adulto con tiempo y estudios para ayudar. «Yo llego a las ocho de la noche. ¿A qué hora le explico fracciones a mi hija?», pregunta. Su vecina, cuenta, le paga a una muchacha para que le haga las tareas al niño, y eso, a su juicio, es peor que no dejarlas.',
      'A mi modo de ver, los tres tienen parte de razón, y por eso la pregunta está mal planteada. No se trata de tareas sí o tareas no, sino de qué tareas. Una tarea que el estudiante puede hacer solo, que se revisa al día siguiente y que no depende de lo que haya en la casa difícilmente le hace daño a alguien. Una tarea que solo se puede hacer con ayuda, en cambio, mide más la casa que al estudiante.',
    ],
  };

  const PARAMO = {
    id: 'lec-paramo-turismo', title: 'Caminar el páramo sin romperlo',
    ficha: { autor: 'Columna de opinión', fuente: 'Periódico regional de Boyacá', fecha: 'Enero de 2026' },
    paras: [
      'Hace diez años, al páramo de La Cumbrera subían unos cuantos campesinos y algún biólogo despistado. Hoy, los fines de semana, llegan hasta trescientos visitantes que quieren tomarse una foto junto a los frailejones, esas plantas peludas que crecen apenas un centímetro al año. La pregunta ya no es si el turismo llegará al páramo: ya llegó. La pregunta es qué hacer con él.',
      'Para Mauricio Lenis, guía e hijo de la vereda, el turismo es la mejor oportunidad que ha tenido la zona. «Antes, para ganarse la vida aquí había que tumbar monte para sembrar papa. Ahora hay familias que viven de cocinarles a los caminantes», dice. Lenis defiende que se siga abriendo el páramo, pero con guías locales obligatorios: nadie cuida mejor un lugar, dice, que quien vive de mostrarlo y piensa quedarse en él toda la vida.',
      'La bióloga Carolina Mesa no está de acuerdo. Según sus mediciones, en los senderos más visitados el suelo se ha compactado tanto que ya no absorbe el agua como antes, y el páramo es, ante todo, una esponja que surte de agua a los pueblos de abajo. «Cada pisada fuera del sendero es una pequeña herida que tarda años en cerrarse», advierte. Para ella, la mayor parte del páramo debería cerrarse a las visitas.',
      'El secretario de ambiente del departamento propone un camino intermedio: abrir solo dos senderos, con un cupo de cien personas al día, reservas previas y un cobro que se invierta en restaurar las zonas dañadas. Reconoce que el cupo será impopular, pero sostiene que sin límites no habrá páramo que mostrar dentro de veinte años. El dinero del cobro, explica, alcanzaría para pagar a los guías de la vereda.',
      'Creo que el secretario se acerca más a la respuesta, aunque se queda corto. Un cupo protege el suelo, pero no basta si los caminantes no entienden lo que pisan. Por eso, además del límite, cada visita debería empezar con una charla sobre el agua y los frailejones. Quien sabe que está caminando sobre la fuente de su propio acueducto pisa distinto.',
    ],
  };

  // ---------------- Lección 1 · Citas y voces ----------------
  setLesson('pu-fu-1', [
    play('quien-lo-dice', 'Cuatro voces sobre las tareas', { doc: TAREAS, voices: ['Adriana Velásquez', 'Jairo Benavides', 'Liliana Ospina', 'La autora'], cards: [
      ['En primaria, lo que mejora es el hábito de leer cada día.', 0],
      ['En bachillerato, las tareas bien diseñadas se relacionan con mejores resultados.', 0],
      ['Sin práctica en la casa, en una semana se olvida lo aprendido.', 1],
      ['Muchas tareas se dejan solo para cumplir.', 1],
      ['Las tareas suponen un adulto con tiempo para ayudar.', 2],
      ['La pregunta está mal planteada.', 3],
      ['Una tarea que solo se hace con ayuda mide más la casa que al estudiante.', 3],
    ] }, 'Cada voz tiene su marca: «sostiene», «explica» y «reconoce» para la psicopedagoga; «según él» y «admite» para el profesor; «el problema es otro» y la pregunta para la madre; y «a mi modo de ver» para la autora.',
      { hint: 'Busca las marcas de cada voz: los verbos de decir, «según él», «para Liliana», «a mi modo de ver».' }),
    play('signos-que-hablan', 'Citas largas y citas cortas', { doc: TAREAS, rounds: [
      { p: 2, text: '|«|En primaria, la tarea larga no mejora el aprendizaje', options: ['abre una cita directa', 'marca ironía', 'abre el título de un libro', 'marca una palabra extranjera'], answer: 0 },
      { p: 3, text: 'muchas tareas se dejan |«|por cumplir»', options: ['reproduce una expresión corta tal como la dijo el profesor', 'abre una cita larga de un libro', 'indica el título de una tarea', 'señala una pregunta'], answer: 0 },
    ] }, 'Las primeras comillas abren las palabras exactas de la psicopedagoga. Las segundas encierran solo una expresión del profesor, con sus palabras exactas, dentro de una frase de la autora: tareas que se dejan solo por cumplir.',
      { hint: 'Mira cuánto encierran las comillas: ¿una declaración completa de alguien o una expresión corta?' }),
    play('resume-parrafo', 'Cada voz en una frase', { doc: TAREAS, paras: [2, 3, 4, 5], options: [
      'Para la psicopedagoga depende de la edad: en primaria no ayudan y en bachillerato sí, con medida.',
      'El profesor defiende la práctica en casa, aunque admite que muchas tareas no se revisan.',
      'La madre señala que las tareas suponen un adulto con tiempo y estudios en cada casa.',
      'El autor cree que la pregunta no es si dejar tareas, sino cuáles.',
      'La psicopedagoga quiere prohibir las tareas en todos los grados.',
      'Una vecina le paga a una muchacha para que le haga las tareas al niño.',
    ], key: [0, 1, 2, 3] },
      'Cada párrafo trae una voz y su postura completa. La psicopedagoga no quiere prohibir nada: distingue por edad. Y lo de la vecina es un ejemplo que usa la madre, no la idea de su párrafo.',
      { hint: 'Para cada párrafo pregúntate qué piensa esa persona, con su matiz. Un ejemplo que cuenta no es su postura.' }),
    play('resumen-esencial', 'El resumen en tres renglones', { doc: TAREAS, ideas: [
      ['La discusión sobre las tareas para la casa está más viva que nunca.', true],
      ['Una experta, un profesor y una madre ven el problema de maneras distintas.', true],
      ['Para el autor, lo importante no es si hay tareas sino qué tareas se dejan.', true],
      ['En bachillerato las tareas no deberían pasar de una hora diaria.', false],
      ['La madre llega del trabajo a las ocho de la noche.', false],
      ['El profesor enseña matemáticas en un colegio público de Itagüí.', false],
    ] }, 'El texto plantea la discusión, presenta tres miradas y cierra con la postura del autor. La hora diaria, las ocho de la noche y el colegio de Itagüí son detalles de cada voz.',
      { hint: 'Un resumen de un texto con varias voces dice que hay varias voces y cuál es la del autor. No hace falta copiar lo de cada una.' }),
    play('balanza-argumento', 'La tesis de la autora', { doc: TAREAS, thesis: 'Lo que importa no es si hay tareas, sino qué tipo de tareas se dejan.', cards: [
      ['En bachillerato, las tareas bien diseñadas se relacionan con mejores resultados.', 0],
      ['Una tarea que solo se hace con ayuda mide más la casa que al estudiante.', 0],
      ['Un estudio muestra que cualquier tarea, larga o corta, da los mismos resultados.', 1],
      ['Los estudiantes que hacen más horas de tarea, del tipo que sea, siempre aprenden más.', 1],
      ['Las tareas para la casa son tan viejas como la escuela.', null],
    ] }, 'Si el diseño de la tarea cambia los resultados, el tipo importa: eso apoya la tesis. Si cualquier tarea diera lo mismo, o si solo importaran las horas, el tipo no importaría. La antigüedad de las tareas no dice nada.',
      { hint: 'La tesis dice que el tipo de tarea marca la diferencia. Busca lo que muestra que la marca y lo que muestra que no.' }),
    play('donde-buscar', '¿A qué párrafo vuelvo?', { doc: TAREAS, cards: [
      ['¿Qué admite el profesor?', [3]], ['¿Qué tipo de tarea defiende la autora?', [5]], ['¿Qué escena se repite cada tarde?', [1]],
      ['¿A qué hora llega Liliana a su casa?', [4]], ['¿Qué dice la psicopedagoga sobre primaria?', [2]],
    ] }, 'La escena (1), la psicopedagoga (2), el profesor (3), la madre (4) y la autora (5): cada voz tiene su párrafo.',
      { hint: 'En este texto cada párrafo es de una voz. Ubica a quién pertenece cada pregunta.' }),
    play('hilo-referente', '¿Quién es «él»?', { doc: TAREAS, rounds: [
      { p: 3, text: '|Jairo Benavides|, profesor de matemáticas en |un colegio público de Itagüí|, no está tan convencido de que haya que reducirlas. Según |él|', from: 5, answer: 1 },
      { p: 4, text: '|Su vecina|, cuenta, |le paga a una muchacha para que le haga las tareas al niño|, y |eso|', from: 5, answer: 3 },
    ] }, '«Él» es el profesor: un colegio no tiene opiniones. Y «eso» no es una persona sino una acción completa: pagarle a alguien para que haga las tareas del niño.',
      { hint: '«Eso» puede referirse a una acción entera, no solo a una palabra. Y un colegio no da opiniones.' }),
  ]);

  // ---------------- Lección 2 · Posturas y citas externas ----------------
  setLesson('pu-fu-2', [
    play('quien-lo-dice', 'Tres posturas y una opinión', { doc: PARAMO, voices: ['Mauricio Lenis', 'Carolina Mesa', 'El secretario', 'El autor'], cards: [
      ['El turismo es la mejor oportunidad que ha tenido la zona.', 0],
      ['Hay que seguir abriendo el páramo, con guías locales obligatorios.', 0],
      ['El suelo de los senderos ya no absorbe el agua como antes.', 1],
      ['La mayor parte del páramo debería cerrarse a las visitas.', 1],
      ['Hay que abrir solo dos senderos, con cupo diario.', 2],
      ['Cada visita debería empezar con una charla sobre el agua.', 3],
    ] }, 'Lenis está a favor de abrir; Mesa, en contra; el secretario propone un camino intermedio, y el autor lo apoya pero agrega la charla.',
      { hint: 'Las posturas van de a favor a en contra, con una intermedia. Ubica primero la del autor: empieza con «Creo».' }),
    play('balanza-argumento', 'Citas que llegan de afuera', { doc: PARAMO, ask: 'Estas citas no están en el texto. Pon en cada platillo las que apoyan o debilitan la tesis del autor.', thesis: 'Las visitas al páramo deben tener un límite diario y empezar con una charla sobre el agua.', cards: [
      ['«Con cupo diario, la vegetación de los senderos se recuperó en cinco años» (estudio de otro páramo).', 0],
      ['«Los visitantes que reciben una charla salen menos de los senderos» (informe de un parque nacional).', 0],
      ['«Los turistas olvidan las charlas y se salen igual del sendero» (encuesta a guías).', 1],
      ['«Un cupo de cien personas no reduce el daño del suelo» (investigación universitaria).', 1],
      ['«Los frailejones son plantas de alta montaña» (enciclopedia).', null],
    ] }, 'Que la vegetación se recupere con cupo y que la charla funcione apoyan las dos partes de la tesis. Si la charla no sirve o el cupo no reduce el daño, la tesis se debilita. La definición de frailejón no toca la tesis.',
      { hint: 'Compara cada cita con la tesis, no con un detalle del texto: ¿muestra que el límite o la charla funcionan, o que no?' }),
    play('lupa-evidencia', 'Lo que dice cada uno', { doc: PARAMO, cards: [
      ['Los frailejones crecen cerca de un centímetro al año.', 0],
      ['El secretario sabe que a muchos no les gustará el cupo.', 0],
      ['Lenis cree que el turismo puede reducir la tala para sembrar papa.', 1],
      ['La bióloga propone cerrar todo el páramo.', 2],
      ['El autor está en contra de cualquier visita.', 2],
    ] }, 'El crecimiento de los frailejones y el reconocimiento del secretario están escritos. Lo de Lenis se deduce de su cita: antes había que tumbar monte, ahora se vive de cocinarles a los caminantes. La bióloga habla de «la mayor parte», no de todo, y el autor acepta visitas con límite.',
      { hint: 'Ojo con el alcance: «la mayor parte» no es «todo». Y el autor propone condiciones, no prohibiciones.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: PARAMO, ask: 'Según el texto, el secretario de ambiente propone todo lo siguiente, EXCEPTO:', cards: [
      ['Abrir solo dos senderos', [4]],
      ['Un cupo de cien personas al día con reservas previas', [4]],
      ['Un cobro que se invierta en restaurar las zonas dañadas', [4]],
      ['Prohibir la entrada de los campesinos de la vereda', null],
    ] }, 'Los dos senderos, el cupo con reservas y el cobro están en el párrafo 4. Nadie propone prohibirles la entrada a los campesinos: al contrario, el dinero alcanzaría para pagar a los guías de la vereda.',
      { hint: 'Lleva cada propuesta al párrafo del secretario. La que no está allí es la respuesta.' }),
    play('trampa-opcion', 'Cada opción con su trampa', { doc: PARAMO, q: 'Según el texto, ¿qué piensa la bióloga Carolina Mesa del turismo en el páramo?', options: [
      ['Que hay que abrir el páramo con guías locales obligatorios.', 4],
      ['Que todo el páramo debe cerrarse para siempre, incluso a los campesinos.', 1],
      ['Que la mayor parte del páramo debería cerrarse a las visitas.', 0],
      ['Que las pisadas no le hacen ningún daño al suelo.', 2],
    ] }, 'C es lo que dice el párrafo 3. A mezcla voces: los guías obligatorios son la idea de Lenis, no de la bióloga. B dice de más: ella habla de «la mayor parte», no de todo, y nunca menciona a los campesinos. D dice lo contrario de «cada pisada es una pequeña herida». Sobra el sello «El texto no lo dice».',
      { hint: 'Antes de sellar, pregúntate de quién es cada idea y cuánto dice: ¿todo, la mayor parte o una parte?' }),
    play('mapa-del-texto', 'El orden del debate', { doc: PARAMO, labels: ['plantea el problema', 'presenta una postura a favor', 'presenta una postura en contra', 'presenta una postura intermedia', 'da la opinión del autor', 'presenta la postura de los turistas'], key: [0, 1, 2, 3, 4] },
      'La columna plantea el problema, da la palabra a tres posturas y termina con la del autor. Las tres voces son un guía, una bióloga y un secretario: ningún párrafo da la postura de los turistas.',
      { hint: 'Ubica las posturas de a favor a en contra y fíjate dónde aparece el «Creo».' }),
    play('conector-bisagra', 'Cómo matiza el autor', { doc: PARAMO, rounds: [
      { a: 'El secretario se acerca más a la respuesta,', b: 'se queda corto.', options: ['aunque', 'porque', 'así que', 'por ejemplo,'], answer: 0 },
      { a: 'Un cupo protege el suelo,', b: 'no basta si los caminantes no entienden lo que pisan.', options: ['pero', 'por eso', 'es decir,', 'además,'], answer: 0 },
      { a: 'Los caminantes deben entender lo que pisan.', b: 'cada visita debería empezar con una charla.', options: ['Por eso,', 'Aunque', 'Sin embargo,', 'Por ejemplo,'], answer: 0 },
    ] }, 'El autor apoya al secretario con una reserva (contraste), le pone un límite al cupo (contraste) y de ahí saca su propuesta (consecuencia).',
      { hint: 'Una postura matizada acepta algo y le pone una reserva. Busca dónde aparece la reserva y dónde la conclusión.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const GRAFITI = {
    id: 'lec-grafitis', title: 'Muros que hablan',
    paras: [
      'En el barrio San Javier, los muros que hace quince años estaban llenos de amenazas hoy están cubiertos de murales. Los turistas recorren las escaleras eléctricas tomando fotos, y los jóvenes del barrio cobran por guiar los recorridos. Pero no todos los muros pintados de la ciudad cuentan una historia tan amable.',
      'El grafitero Andrés «Trazo» Gómez defiende que la calle es el museo de quienes nunca han entrado a uno. «Un muro gris no le pertenece a nadie; un muro pintado le pertenece a todos», afirma. Reconoce, eso sí, que hay quienes rayan sin permiso las fachadas recién pintadas de las casas, y dice que eso «no es arte, es falta de respeto».',
      'Gloria Arango, presidenta de una junta de acción comunal, está cansada de pintar la pared de su casa cada mes. Según ella, el problema no son los murales, sino las firmas rápidas que aparecen de noche y que nadie pidió. Propone que la alcaldía multe a quienes rayen propiedades privadas.',
      'La Secretaría de Cultura, por su parte, asegura que ha entregado más de doscientos muros legales para pintar y que, en las zonas donde lo hizo, las rayas en fachadas privadas se redujeron casi a la mitad.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: GRAFITI, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-fuentes', 'Evaluación · Fuentes y voces', [
    ['pu-fu-1', 'Antes de responder, se identifica de quién es cada cita: el verbo que la acompaña lo dice.',
      Q('La frase «Un muro gris no le pertenece a nadie; un muro pintado le pertenece a todos» es de:', ['Gloria Arango', 'La Secretaría de Cultura', 'El autor del texto', 'Andrés Gómez'], 3,
        'Va entre comillas, seguida de «afirma», en el párrafo de Andrés «Trazo» Gómez.',
        'Busca la cita en el texto y mira qué verbo la acompaña y en qué párrafo está.')],
    ['pu-fu-1', 'Las comillas con un verbo de decir marcan las palabras exactas de alguien.',
      Q('Las comillas en «no es arte, es falta de respeto» indican que:', ['son las palabras exactas de Andrés Gómez', 'el autor usa la frase con ironía', 'es el título de un mural', 'es una idea de la Secretaría de Cultura'], 0,
        'La frase va con «dice que», y quien la dice es Gómez, refiriéndose a quienes rayan las fachadas.',
        'Fíjate en el verbo que va antes de las comillas y en quién es el sujeto.')],
    ['pu-fu-1', 'Un dato también tiene una voz: «asegura», «según», «informa».',
      Q('Según el texto, quien asegura que las rayas en fachadas privadas se redujeron casi a la mitad es:', ['Gloria Arango', 'La Secretaría de Cultura', 'Andrés Gómez', 'Los guías del barrio'], 1,
        'El párrafo 4 dice que la Secretaría de Cultura «asegura» ese dato.',
        'Busca el dato de «casi a la mitad» y quién lo asegura.')],
    ['pu-fu-2', 'Una postura matizada acepta una parte y rechaza otra.',
      Q('La postura de Gloria Arango frente al grafiti es:', ['A favor de cualquier grafiti', 'En contra de todos los murales', 'Matizada: acepta los murales pero rechaza las firmas sin permiso', 'Indiferente'], 2,
        'Dice que «el problema no son los murales, sino las firmas rápidas»: acepta una cosa y rechaza la otra.',
        'Lee la frase de Gloria que empieza con «el problema no son…».')],
    ['pu-fu-2', 'Una cita externa apoya una propuesta si muestra que lo propuesto funciona.',
      Q('Un dato que apoyaría la propuesta de Gloria Arango sería:', ['Un informe de que los turistas prefieren los murales', 'Un estudio que muestra que las multas redujeron las firmas en fachadas de otra ciudad', 'Una encuesta según la cual a los jóvenes les gusta pintar', 'Un dato sobre el precio de la pintura'], 1,
        'Gloria propone multas; un estudio donde las multas funcionaron la apoya. Las demás opciones no tocan la propuesta.',
        'Recuerda qué propone Gloria y busca el dato que muestre que eso funciona.')],
    ['pu-fu-2', 'Un dato debilita una idea si muestra lo contrario de lo que ella afirma.',
      Q('El dato de la Secretaría de Cultura (párrafo 4) debilita sobre todo la idea de que:', ['los murales atraen turistas', 'Gloria pinta su pared cada mes', 'Andrés Gómez es grafitero', 'entregar muros legales no sirve para reducir las rayas en las casas'], 3,
        'Si en las zonas con muros legales las rayas bajaron casi a la mitad, se debilita la idea de que esos muros no sirven.',
        'Pregúntate qué idea quedaría en duda si el dato de la Secretaría es cierto.')],
  ]);
});
