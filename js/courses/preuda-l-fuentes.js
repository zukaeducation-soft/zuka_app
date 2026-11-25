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
    play('pinta-voces', 'Pinta cada idea con el color de quien la dice.', { doc: TAREAS, plumas: ['Adriana', 'Jairo', 'Liliana', 'la autora'], lineas: ['En primaria, lo que mejora es leer un rato cada día.', 'Sin práctica en la casa, lo aprendido se olvida en una semana.', 'Las tareas suponen un adulto con tiempo.', 'La pregunta está mal planteada.', 'Muchas tareas se dejan «por cumplir».'], va: [0, 1, 2, 3, 1],
      mira: ['Busca «explica».', 'Busca «Según él».', 'Busca quién llega a las ocho.', 'Busca «A mi modo de ver».', 'Busca «Admite».'], bien: 'Cada voz lleva su marca.' },
      'Adriana «explica», Jairo habla «según él» y «admite», Liliana cuenta su caso y la autora dice «a mi modo de ver».',
      { hint: 'Vuelve al texto y busca al lado de cada idea el verbo o la marca de quien habla.' }),
    play('genero-o-cita', '¿Es cita **directa** (palabras exactas) o **indirecta** (contada)?', { rot: ['directa', 'indirecta'], doc: TAREAS, fichas: ['«¿A qué hora le explico fracciones a mi hija?», pregunta.', 'Según él, sin práctica los estudiantes olvidan.', 'Sostiene que la respuesta depende de la edad.', '«En primaria, la tarea larga no mejora el aprendizaje», explica.'], va: [0, 1, 1, 0],
      mira: ['¿Lleva comillas?', '¿Lleva comillas?', 'Mira el «que» después del verbo.', '¿Lleva comillas?'], bien: 'Comillas: exactas. «Que» o «según»: contadas.' },
      'Las comillas copian las palabras exactas. «Según él» y «sostiene que» las cuentan con otras palabras.',
      { hint: 'Busca comillas. Si no hay, mira si un «que» o un «según» cuenta lo dicho.' }),
    play('signo-oficio', 'Los dos son comillas, pero no hacen lo mismo. Ata cada oficio a las suyas.', { doc: TAREAS, texto: 'Admite que muchas tareas se dejan |«por cumplir»|. La psicopedagoga explica: |«En primaria, la tarea larga no mejora el aprendizaje»|.', tarjetas: ['reproduce solo una expresión', 'copia una oración completa'], va: [0, 1],
      mira: ['Busca las que encierran pocas palabras dentro de otra oración.', 'Busca las que encierran todo lo que alguien dijo.'], bien: 'Una expresión corta o una oración entera.' },
      '«Por cumplir» es solo una expresión del profesor dentro de la oración de la autora; las otras comillas copian la oración completa.',
      { hint: 'Quita las comillas: ¿lo que queda adentro es una oración completa o un pedazo?' }),
    play('donde-mirar', 'De cada párrafo solo ves el comienzo. Lleva cada pregunta al párrafo donde la buscarías.', { doc: TAREAS, fichas: ['¿Qué opina la experta?', '¿Qué reconoce el profesor?', '¿Qué propone la autora?'], va: [1, 2, 4],
      mira: ['Busca el comienzo que presenta a alguien que ha estudiado el tema.', 'Busca el comienzo que presenta a quien enseña.', 'Busca el comienzo con la marca de la autora.'], luz: [[2, 'reconoce que las tareas bien diseñadas'], [3, 'Admite, sin embargo'], [5, 'sino de qué tareas']], bien: 'Los comienzos presentan a cada voz.' },
      'La psicopedagoga abre el 2, el profesor el 3 y «A mi modo de ver» anuncia a la autora en el 5.',
      { hint: 'Cada párrafo presenta a alguien en su primera oración. Busca a quién corresponde la pregunta.' }),
    play('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: TAREAS, texto: '|Su vecina|, cuenta, |le paga a una muchacha para que le haga las tareas al niño|, y eso, a su juicio, es peor que no dejarlas. Para |Liliana Ospina|, el problema es otro.', tarjetas: ['«eso»', '«su» de «a su juicio»'], va: [1, 2],
      mira: ['No es una persona: ¿qué hecho es peor?', '¿De quién es el juicio: de quien paga o de quien lo cuenta?'], bien: '«Eso» puede apuntar a un hecho completo.' },
      '«Eso» es pagar para que hagan las tareas. Y el juicio es de Liliana, que es quien lo cuenta.',
      { hint: 'Abre el texto y mira quién habla en ese párrafo. Luego prueba cada opción.' }),
    play('talla-idea', 'Tres versiones de lo que piensa la autora (párrafo 5): pon cada una en su talla.', { doc: TAREAS, p: 5, rot: ['se queda en un detalle', 'justa', 'dice de más'], fichas: ['Las tareas se revisan al día siguiente.', 'Importa qué tareas se dejan, no si se dejan.', 'Habría que acabar con todas las tareas.'], va: [0, 1, 2],
      mira: ['Es una condición: ¿es toda su idea?', 'Mira «No se trata de… sino de…».', '¿La autora pide acabarlas?'], luz: [[5, 'No se trata de tareas sí o tareas no, sino de qué tareas']], bien: '«No… sino…» dice la idea entera.' },
      'La revisión es un detalle; acabar con todas exagera. «No se trata de tareas sí o no, sino de qué tareas» es la idea.',
      { hint: 'Busca en el párrafo la oración que niega una cosa para afirmar otra.' }),
    play('balanza-tesis', 'Tesis de la autora: importa **qué** tareas se dejan. ¿Qué hace cada dato?', { doc: TAREAS, tesis: 'Importa qué tareas se dejan', fichas: ['Las bien diseñadas se relacionan con mejores resultados.', 'Las que exigen ayuda miden más la casa que al estudiante.', 'Un estudio: cualquier tarea da los mismos resultados.', 'Las tareas son tan viejas como la escuela.'], va: [0, 0, 1, 2],
      mira: ['Si el diseño cambia el resultado, ¿importa cuáles?', 'Si unas miden la casa, ¿importa cuáles?', 'Si todas dan lo mismo, ¿importa cuáles?', 'La edad de las tareas, ¿dice cuáles importan?'], bien: 'Si todas dieran lo mismo, la tesis caería.' },
      'El diseño y la ayuda muestran que no todas son iguales: apoyan. Que cualquiera dé lo mismo debilita. Que sean viejas no pesa.',
      { hint: 'Supón que el dato es cierto y pregunta: ¿importa cuál tarea, o da igual?' }),
    play('tacha-resumen', 'Tacha las tres oraciones que no hacen falta para entender la columna.', { doc: TAREAS, n: 3, lineas: ['La discusión sobre las tareas está muy viva.', 'Liliana llega a las ocho de la noche.', 'Una experta, un profesor y una madre la ven distinto.', 'El colegio queda en Itagüí.', 'La autora cree que importa qué tareas se dejan.', 'La vecina le paga a una muchacha.'], va: [1, 3, 5],
      mira: { 0: 'Plantea el tema.', 2: 'Reúne las tres voces.', 4: 'Es la tesis de la autora.' }, bien: 'Tema, voces y tesis.' },
      'La hora, el lugar y la vecina son detalles de cada voz. Quedan el tema, las voces y la tesis.',
      { hint: 'De un texto con varias voces se guarda el tema, quiénes discuten y qué concluye quien escribe.' }),
  ]);

  // ---------------- Lección 2 · Posturas y citas externas ----------------
  setLesson('pu-fu-2', [
    play('pinta-voces', 'Pinta cada idea con el color de quien la dice.', { doc: PARAMO, plumas: ['Lenis', 'Mesa', 'el secretario', 'el autor'], lineas: ['El turismo es la mejor oportunidad de la zona.', 'La mayor parte debería cerrarse a las visitas.', 'Hay que abrir solo dos senderos con cupo.', 'Cada visita debería empezar con una charla.', 'El suelo ya no absorbe el agua como antes.'], va: [0, 1, 2, 3, 1],
      mira: ['Busca a quien vive de mostrar el lugar.', 'Busca «Para ella».', 'Busca «propone un camino intermedio».', 'Busca «Creo que».', 'Busca «Según sus mediciones».'], bien: 'Cada postura tiene su dueño.' },
      'Lenis, el guía, quiere abrir; Mesa, la bióloga, cerrar casi todo; el secretario, abrir poco; y el autor agrega la charla.',
      { hint: 'Vuelve al texto y busca quién está hablando en el párrafo de cada idea.' }),
    play('linea-vida', 'Pon a cada quien en su postura frente a abrir el páramo.', { doc: PARAMO, rot: ['a favor', 'matizada', 'en contra'], fichas: ['Lenis: es una oportunidad; que se siga abriendo.', 'Mesa: cerrar la mayor parte.', 'El secretario: dos senderos con cupo.', 'El autor: cupo y, además, una charla.'], va: [0, 2, 1, 1],
      mira: ['Pide guías, pero ¿quiere abrir más o menos?', 'No dice «todo», pero ¿qué quiere para la mayor parte?', '¿Dice sí, no o sí con condiciones?', '¿Dice sí, no o sí con condiciones?'], bien: 'Sí, no, o sí pero…' },
      'Lenis quiere que se siga abriendo: a favor. Mesa quiere cerrar casi todo: en contra. El secretario y el autor aceptan visitas con condiciones: matizan.',
      { hint: 'Pregunta de cada uno: ¿quiere más visitas, menos, o visitas con condiciones?' }),
    play('balanza-tesis', 'Estas citas **no** están en el texto. ¿Qué le hacen a la tesis del autor?', { doc: PARAMO, tesis: 'Las visitas deben tener cupo y empezar con una charla', fichas: ['«Con cupo, la vegetación se recuperó en cinco años.»', '«Quien recibe una charla se sale menos del sendero.»', '«Un cupo de cien personas no reduce el daño.»', '«El frailejón es una planta de alta montaña.»'], va: [0, 0, 1, 2],
      mira: ['Si el cupo sirve, ¿la tesis gana o pierde?', 'Si la charla sirve, ¿la tesis gana o pierde?', 'Si el cupo no sirve, ¿la tesis gana o pierde?', '¿Habla del cupo o de la charla?'], bien: 'Se compara con la tesis, no con un detalle.' },
      'El cupo y la charla que funcionan apoyan; el cupo que no reduce el daño debilita; definir el frailejón no toca la tesis.',
      { hint: 'La tesis tiene dos partes: cupo y charla. ¿La cita le da o le quita razón a alguna?' }),
    play('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PARAMO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], fichas: ['El secretario sabe que el cupo no gustará.', 'Lenis cree que el turismo puede evitar que tumben monte.', 'El cobro se invertiría en restaurar.', 'Los guías ganan más que los agricultores.', 'El cupo ya se aplicó.'], va: [0, 1, 0, 2, 2],
      mira: ['Busca «impopular».', 'Compara su «Antes» con su «Ahora».', 'Busca el cobro.', '¿Alguien compara lo que ganan?', 'Mira el verbo: ¿propone o hizo?'], luz: [[4, 'Reconoce que el cupo será impopular'], [2, 'había que tumbar monte'], [4, 'un cobro que se invierta en restaurar']], bien: 'Proponer no es haber hecho.' },
      'Impopular y el cobro están escritos. De «Antes… Ahora» se deduce lo de Lenis. Lo que ganan no se compara y el cupo es una propuesta.',
      { hint: 'Busca primero la palabra clave; si no está, mira si sale de juntar dos frases.' }),
    play('sella-parrafo', '«El secretario propone todo lo siguiente, **EXCEPTO**:» Ata cada opción al párrafo donde está **como idea suya**.', { doc: PARAMO, tarjetas: ['Dos senderos', 'Reservas previas', 'Un cobro', 'Sacar a los campesinos'], va: [3, 3, 3, 5],
      mira: ['Busca «abrir solo».', 'Busca cómo se entraría.', 'Busca en qué se invierte.', 'Los campesinos se nombran: ¿alguien pide sacarlos?'], luz: [[4, 'abrir solo dos senderos, con un cupo de cien personas al día, reservas previas y un cobro']], bien: 'Nombrarlos no es querer sacarlos.' },
      'Los senderos, las reservas y el cobro son del párrafo 4. Sacar a los campesinos no lo propone nadie.',
      { hint: 'Tres opciones pueden venir en una sola oración. Revisa además de quién es la idea.' }),
    play('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: PARAMO, fichas: ['plantea el problema', 'da una postura a favor', 'da una postura en contra', 'da una postura intermedia', 'da la opinión del autor', 'da la voz de los turistas'], va: [0, 1, 2, 3, 4, null],
      mira: ['Busca la pregunta que abre el texto.', 'Busca la «mejor oportunidad».', 'Busca «no está de acuerdo».', 'Busca «camino intermedio».', 'Busca «Creo que».', 'Se habla de ellos, pero ¿hablan?'],
      luz: [[1, 'La pregunta es qué hacer con él'], [2, 'la mejor oportunidad'], [3, 'no está de acuerdo'], [4, 'un camino intermedio'], [5, 'Creo que']], bien: 'Problema, tres posturas y la del autor.' },
      'El problema, el guía a favor, la bióloga en contra, el secretario en el medio y el autor.',
      { hint: 'Mira cómo empieza cada párrafo y quién habla en él.' }),
    play('bisagras', 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.', { doc: PARAMO, pares: [['El secretario se acerca a la respuesta,', 'se queda corto.'], ['Defiende el cupo', 'sin límites no habrá páramo.'], ['No basta el cupo;', 'propone una charla.']], fichas: ['aunque', 'porque', 'por eso', 'es decir,', 'por ejemplo'], va: [0, 1, 2, null, null],
      mira: ['¿Dónde se acepta algo y se le pone un pero?', '¿Dónde lo segundo es la razón de lo primero?', '¿Dónde la segunda resulta de la primera?', 'En ninguna la segunda repite la primera con otras palabras.', 'En ninguna la segunda es un caso.'], bien: 'Matizar es decir sí, pero.' },
      '«Aunque» acepta y frena; «porque» da la razón de defender el cupo; «por eso» trae la propuesta.',
      { hint: 'En una lo segundo frena, en otra es la razón y en otra es lo que resulta.' }),
    play('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a una oración que la desmiente.', { doc: PARAMO, nums: [3, 4], pregunta: 'Queda en pie', queda: 'El secretario busca un punto medio.', tarjetas: ['La bióloga quiere cerrar todo el páramo.', 'Pisar fuera del sendero no le hace daño.', 'El secretario cree que el cupo le gustará a todos.'], va: [3, 2, 5],
      mira: ['Busca cuánto quiere cerrar.', 'Busca la pequeña herida.', 'Busca lo que reconoce.'], bien: '«La mayor parte» no es «todo».' },
      'Ella habla de «la mayor parte»; cada pisada «es una pequeña herida»; y él reconoce que será «impopular».',
      { hint: 'Fíjate en la palabra que exagera o niega en cada opción y busca la oración que la corrige.' }),
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
