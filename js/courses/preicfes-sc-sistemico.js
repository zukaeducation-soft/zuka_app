// Preicfes · Sociales y Ciudadanas · mundo 5 «Problemas Complejos» (spec 2026-11-25-preicfes-estructura). Casos inventados para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BASURA = {
    id: 'icf-quebrada', title: 'La quebrada que se desborda',
    ficha: { autor: 'Equipo de una emisora comunitaria', fuente: 'Serie «Preguntas del barrio»', fecha: 'Marzo de 2026' },
    paras: [
      'En abril la quebrada La Honda se desbordó por tercera vez en cinco años y dejó barro en ciento veinte casas. «Fue el aguacero», dijeron muchos. Tenían razón a medias. Ese día llovió fuerte, pero en 1998 llovió más y no pasó nada. El aguacero fue lo que disparó el desborde; no explica por qué ahora sí.',
      'Las causas de fondo se fueron juntando. Cuando la fábrica de tejidos cerró, llegaron familias sin empleo que construyeron en la ladera, donde el suelo era barato. Para hacer las casas se cortaron árboles; sin raíces, la tierra se suelta y baja hasta el cauce. Además, el camión de la basura no sube hasta allá, así que una parte termina en el agua y tapa el paso.',
      'Las consecuencias también vienen en cadena. Con el barro se cerró la escuela dos semanas. Sin clases, varias madres dejaron de ir a trabajar para cuidar a los hijos. Con menos ingresos, algunas familias se atrasaron en el arriendo y se mudaron más arriba, a la ladera, donde es más barato. Así, una consecuencia del desborde se volvió una nueva causa.',
      'En la reunión del barrio, un líder propuso un culpable: «Esto es por los que llegaron». Una vecina le respondió que ellos no cerraron la fábrica ni decidieron por dónde sube el camión. Que dos cosas ocurran juntas no significa que una sea la única causa de la otra. Además, señalar a un grupo suele tapar las decisiones que nadie quiere revisar.',
      'La ingeniera de la alcaldía llevó un mapa con flechas. En él, casi ninguna flecha salía de un solo lugar. Empleo, vivienda, bosque, basura y lluvia se empujaban unos a otros. «Si solo hacemos un muro», advirtió, «el agua pasará, pero volverá a taparse».',
      'Acordaron tres cosas: una ruta de recolección que suba, sembrar con las familias en las zonas de mayor riesgo y reubicar a las veinte casas que están dentro del cauce. El muro quedó para el final. Nadie cree que esto evite todos los aguaceros. La idea es que un aguacero vuelva a ser solo un aguacero.',
    ],
  };
  const l1 = leccion('icf-sc-sistemico-1', 'Causas y consecuencias', guion(
    ['Detonante y causa de fondo', 'El detonante dispara; las causas de fondo explican por qué esta vez sí.'],
    ['Varias causas', 'Los problemas sociales casi nunca tienen una sola.'],
    ['En cadena y en círculo', 'Una consecuencia puede volverse una nueva causa.'],
    ['Juntas no es por', 'Que dos cosas pasen a la vez no prueba que una cause la otra.']), [
    x('genero-o-cita', '¿Es el **detonante** o una **causa de fondo**?', { doc: BASURA, rot: ['detonante', 'causa de fondo'],
      ...F(['El aguacero de ese día', 0, '¿Disparó el hecho o lo venía preparando?'], ['Casas en la ladera sin árboles', 1, '¿Disparó el hecho o lo venía preparando?'], ['El camión no sube por la basura', 1, '¿Disparó el hecho o lo venía preparando?'], ['El cierre de la fábrica', 1, '¿Disparó el hecho o lo venía preparando?']), bien: 'Lo que dispara y lo que prepara.' },
      'El aguacero disparó el desborde; la ladera, la basura y el cierre lo fueron preparando.', 'Pregunta si ocurrió ese día o si venía de tiempo atrás.'),
    x('pasos-del-proceso', 'Ordena la cadena. El primer paso está en su puesto.', { doc: BASURA, que: 'la cadena', de: 'Del cierre al desborde', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Cierra la fábrica.', 'Llegan familias a la ladera.', 'Se cortan árboles.', 'La tierra baja al cauce.', 'Un aguacero lo desborda.'], mira: ['', 'Llegan cuando ya no hay empleo.', 'Se cortan para construir las casas.', 'La tierra se suelta cuando faltan raíces.', 'Es lo que dispara al final.'], bien: 'Cierre, ladera, tala, tierra y desborde.' },
      'El cierre lleva familias a la ladera, se tala, la tierra baja y el aguacero desborda.', 'Busca en el párrafo 2 qué pasó antes y qué después.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: BASURA,
      ...F(['cuenta el hecho y separa el detonante', 0, 'Busca el desborde.'], ['explica las causas de fondo', 1, 'Busca lo que se fue juntando.'], ['sigue las consecuencias', 2, 'Busca la escuela.'], ['discute una explicación simple', 3, 'Busca el culpable.'], ['muestra cómo se conectan', 4, 'Busca el mapa.'], ['cuenta lo que acordaron', 5, 'Busca las tres cosas.'], ['narra la historia de la fábrica', null, 'La fábrica solo se nombra.']),
      luz: [[1, 'lo que disparó el desborde'], [2, 'Las causas de fondo'], [3, 'Las consecuencias'], [4, 'un culpable'], [5, 'un mapa con flechas'], [6, 'Acordaron tres cosas']], bien: 'Hecho, causas, consecuencias, crítica, mapa y acuerdo.' },
      'Va del hecho a las causas, las consecuencias, una explicación simple, el mapa y el acuerdo.', 'Busca en el comienzo de cada párrafo de qué se ocupa.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: BASURA, texto: '|El líder| señaló a |los recién llegados|. Una vecina le respondió que ellos no cerraron la fábrica.',
      ...T(['«le»', 0, 'Pon en su lugar lo que ataste: ¿a quién respondió?'], ['«ellos»', 1, 'Pon en su lugar lo que ataste: ¿quiénes no la cerraron?']), bien: 'El líder y los recién llegados.' },
      'La vecina le responde al líder y «ellos» son los que llegaron al barrio.', 'Mira si la palabra nombra a uno o a varios.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: BASURA, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['En 1998 llovió más y no se desbordó.', 0, 'Léela junto al párrafo 1.'], ['Algo cambió en la quebrada después de 1998.', 1, '¿Por qué con más lluvia no pasó nada?'], ['El problema puede repetirse con más fuerza.', 1, '¿Adónde se mudan las familias después?'], ['La alcaldía ocultó el mapa.', 2, '¿Alguna oración lo dice?']),
      luz: [[1, 'en 1998 llovió más'], [3, 'a la ladera'], [3, 'una nueva causa']], bien: 'Comparar dos fechas descubre causas.' },
      '1998 está escrito; que algo cambió y que puede repetirse se deducen; ocultar el mapa se inventa.', 'Compara los dos aguaceros y sigue el círculo del párrafo 3.'),
    x('balanza-tesis', 'Afirmación: «la única causa es la lluvia». ¿Qué hace cada dato?', { doc: BASURA, tesis: 'La única causa es la lluvia',
      ...F(['Con una lluvia mayor, años atrás, no pasó nada.', 1, '¿Bastó la lluvia esa vez?'], ['Otra quebrada limpia y con bosque no se desbordó ese día.', 1, '¿Le llovió también?'], ['Todas las quebradas de la región se desbordaron, sin importar su estado.', 0, 'Si fuera así, ¿qué explicaría todo?'], ['La reunión fue un martes.', 2, '¿Dice algo de las causas?']), bien: 'Comparar casos prueba causas.' },
      'Que no pasara con más lluvia o con bosque la debilita; que todas se desbordaran la apoyaría; el martes no pesa.', 'Pregunta qué cambia entre los casos que se desbordan y los que no.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: BASURA, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'El desborde tiene varias causas conectadas.',
      ...T(['Los recién llegados cerraron la fábrica.', 1, 'Busca qué no hicieron ellos.'], ['Un muro bastaría para siempre.', 7, 'Busca qué advirtió la ingeniera.'], ['El acuerdo evitará todos los aguaceros.', 10, 'Busca qué cree la gente del acuerdo.']), bien: 'Una oración desmiente cada una.' },
      'Ellos no la cerraron, el muro volvería a taparse y nadie cree que evite todos los aguaceros.', 'Saca la palabra clave: fábrica, muro, aguaceros.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: BASURA, lineas: ['La lluvia disparó el desborde, pero no lo explica sola.', 'El barro era oscuro.', 'Desempleo, tala y basura lo fueron preparando.', 'Las consecuencias se vuelven nuevas causas.', 'El camión es de basura.', 'Las soluciones atienden varias causas.'], ...S([1, 4], { 0: 'Separa detonante y fondo.', 2: 'Son las causas de fondo.', 3: 'Es el círculo.', 5: 'Es el acuerdo.' }), bien: 'Detonante, fondo, círculo y acuerdo.' },
      'El color del barro y el tipo de camión no explican nada; lo demás sí.', 'Deja lo que ayuda a entender por qué pasó.'),
  ]);

  const MINA = {
    id: 'icf-turismo', title: 'Un hotel frente a la ciénaga',
    ficha: { autor: 'Periódico escolar «El Manglar»', fuente: 'Edición especial', fecha: 'Abril de 2026' },
    paras: [
      'Una empresa quiere construir un hotel de doscientas habitaciones frente a la ciénaga de Las Garzas. El proyecto parece un asunto de dinero y, en efecto, lo es: promete cien empleos y más impuestos para un municipio que apenas paga sus profesores. Pero los que fuimos a preguntar volvimos con un cuaderno lleno de otras cosas.',
      'La bióloga del parque nos habló de la dimensión ambiental. El manglar cría los peces que se pescan en toda la costa y frena las olas en las tormentas. Cortar cuatro hectáreas para el muelle no acaba con la ciénaga, dijo, pero la parte en dos, y hay animales que no cruzan.',
      'Doña Petrona, que preside el consejo comunitario, nos habló de lo cultural. En esa orilla se hace cada año el velorio de los santos del agua, y allí están enterrados los ombligos de medio pueblo. «Ustedes ven una playa», nos dijo; «nosotros vemos un altar». Para ella no hay precio que alcance, porque no está en venta.',
      'El alcalde insistió en lo político y en lo legal. Como se trata de territorio de una comunidad negra, la ley ordena una consulta previa antes de decidir. Él la apoya, aunque teme que se alargue. También hay división: los jóvenes del puerto están a favor, porque llevan dos años buscando trabajo.',
      'Al comparar notas descubrimos que casi todos tenían razón en lo suyo. El choque no es entre buenos y malos, sino entre dimensiones: lo que mejora la economía puede dañar el ambiente; lo que cuida la cultura puede dejar sin empleo a los jóvenes. Incluso dentro de una misma dimensión hay tensiones: el hotel daría trabajo, pero podría quitárselo a los pescadores.',
      'Un profesor propuso una regla que nos gustó: antes de votar, cada grupo debe explicar con sus palabras lo que más le importa al otro, hasta que el otro diga «sí, es eso». Todavía no hay decisión. Hay, eso sí, un nuevo plano del hotel: más pequeño, sin muelle y lejos de la orilla. Nadie está feliz del todo. Quizá esa sea una buena señal.',
    ],
  };
  const l2 = leccion('icf-sc-sistemico-2', 'Dimensiones en choque', guion(
    ['Mirar por dimensiones', 'Económica, ambiental, cultural, política, legal, social.'],
    ['Cada actor enfatiza una', 'La bióloga, el ambiente; la líder, la cultura; la empresa, el dinero.'],
    ['El choque', 'Lo que mejora una dimensión puede empeorar otra.'],
    ['Acordar', 'Ceder un poco en cada una suele ser mejor que ganar solo en una.']), [
    x('pinta-tipos', 'Pinta cada dato con su dimensión.', { doc: MINA, plumas: ['económica', 'ambiental', 'cultural'],
      ...P(['El manglar cría los peces de la costa.', 1, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Habrá más impuestos para el municipio.', 0, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Se hace el velorio de los santos del agua.', 2, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Hay animales que no cruzan.', 1, '¿Habla de dinero, de naturaleza o de creencias y costumbres?'], ['Promete cien empleos.', 0, '¿Habla de dinero, de naturaleza o de creencias y costumbres?']), bien: 'Dinero, naturaleza y costumbres.' },
      'Impuestos y empleos son económicos; peces y animales, ambientales; el velorio, cultural.', 'Pregunta qué se gana o se pierde en cada dato.'),
    x('voz-de-la-fuente', 'Ata cada preocupación a quien la tiene.', { ayuda: 'Tira un hilo desde cada preocupación hasta quien la tiene.', doc: MINA, portadas: [['La bióloga', 'actor'], ['Doña Petrona', 'actor'], ['El alcalde', 'actor'], ['Los jóvenes del puerto', 'actor']],
      ...T(['que la ciénaga quede partida', 0, '¿Quién habla de animales que no cruzan?'], ['que se pierda un lugar sagrado', 1, '¿Quién ve un altar?'], ['que el trámite se alargue', 2, '¿Quién habla de la ley?'], ['seguir sin trabajo', 3, '¿Quién lleva dos años buscando?']), bien: 'Cada actor, su dimensión.' },
      'La bióloga cuida la ciénaga, doña Petrona lo sagrado, el alcalde el trámite y los jóvenes el empleo.', 'Busca quién dijo cada cosa y qué le preocupa.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: MINA,
      ...F(['¿Qué exige la ley antes de decidir?', 3, 'Busca el comienzo que habla de lo legal.'], ['¿Para qué sirve el manglar?', 1, 'Busca el comienzo que habla del ambiente.'], ['¿Qué regla propuso un profesor?', 5, 'Busca el comienzo que lo nombra.']),
      luz: [[4, 'una consulta previa'], [2, 'frena las olas'], [6, 'cada grupo debe explicar']], bien: 'Ley, ambiente y regla.' },
      'La ley está en el 4, el manglar en el 2 y la regla en el 6.', 'Lee solo el comienzo de cada párrafo y decide.'),
    x('genero-o-cita', '¿El choque es **entre dimensiones** o **dentro de una misma**?', { doc: MINA, rot: ['entre dimensiones', 'dentro de una'],
      ...F(['Más empleo en el hotel, menos para los pescadores', 1, '¿Las dos partes hablan de lo mismo?'], ['Más impuestos, menos manglar', 0, '¿Las dos partes hablan de lo mismo?'], ['Se cuida un altar y se frena el empleo', 0, '¿Las dos partes hablan de lo mismo?'], ['Los jóvenes ganan sueldo, los pescadores pierden ventas', 1, '¿Las dos partes hablan de lo mismo?']), bien: 'Dos temas o uno solo.' },
      'Empleo contra empleo y sueldo contra ventas son de una misma; impuestos y altar chocan con otra.', 'Nombra la dimensión de cada parte y compáralas.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MINA, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Doña Petrona preside el consejo comunitario.', 0, 'Léela junto al párrafo 3.'], ['Ofrecerle más dinero no cambiaría su posición.', 1, '¿Qué dice ella del precio?'], ['El nuevo plano atiende a quienes se oponían.', 1, '¿Qué le quitaron al hotel y adónde lo movieron?'], ['El hotel ya abrió.', 2, '¿Hay decisión?']),
      luz: [[3, 'no hay precio que alcance'], [6, 'sin muelle y lejos de la orilla']], bien: 'Los cambios muestran a quién se oyó.' },
      'El cargo está escrito; lo del dinero y lo del plano se deducen; aún no hay decisión.', 'Compara el plano nuevo con las quejas de cada uno.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MINA, filas: [{ antes: 'Cortar cuatro hectáreas', topes: ['acaba la ciénaga', 'no la afecta', 'la parte en dos'], va: 2 }, { antes: 'La consulta previa es', topes: ['un favor', 'una orden de la ley', 'ilegal'], va: 1 }, { antes: 'Con el plano nuevo,', topes: ['nadie está feliz del todo', 'todos están felices', 'nadie cede'], va: 0 }], mira: ['Relee lo que dijo la bióloga.', 'Relee por qué se hace.', 'Relee el final del párrafo 6.'], luz: [[2, 'la parte en dos'], [4, 'la ley ordena'], [6, 'Nadie está feliz del todo']], bien: 'Parte, ordena y reparte.' },
      'La parte en dos, la ley la ordena y nadie quedó feliz del todo.', 'Busca la oración exacta que corresponde a cada perilla.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que dice **cómo es** el conflicto.', { doc: MINA, nums: [5], apuesta: 'Chocan dimensiones, no buenos y malos.', ...S(['5.1'], { '5.0': 'Dice lo que descubrieron, no cómo es el choque.', '5.2': 'Da un caso dentro de una dimensión.' }), bien: '«No… sino» define el conflicto.' },
      'La segunda oración lo define: el choque es entre dimensiones, no entre buenos y malos.', 'Busca la oración que descarta una idea y pone otra.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MINA, lineas: ['Un hotel promete empleo e impuestos.', 'El cuaderno se llenó.', 'También afecta el ambiente, la cultura y la ley.', 'El choque es entre dimensiones.', 'El hotel tiene habitaciones.', 'Se busca un plan en que cada uno ceda.'], ...S([1, 4], { 0: 'Es la dimensión económica.', 2: 'Son las otras dimensiones.', 3: 'Es la idea central.', 5: 'Es la salida.' }), bien: 'Propuesta, dimensiones, choque y salida.' },
      'El cuaderno y las habitaciones son detalles; lo demás explica el conflicto.', 'Deja lo que necesitas para entender el desacuerdo.'),
  ]);

  const PICO = {
    id: 'icf-pico', title: 'La buena idea que hizo trancón',
    ficha: { autor: 'Semillero de políticas públicas', fuente: 'Cuaderno de casos', fecha: 'Mayo de 2026' },
    paras: [
      'En la ciudad de Altamira el tráfico era insoportable. El concejo aprobó una medida sencilla: cada carro debía quedarse en casa un día a la semana, según el último número de la placa. El primer mes las calles se vaciaron. El alcalde salió en televisión con una bicicleta.',
      'Al año, el trancón era peor que antes. ¿Qué pasó? Quienes podían pagarlo compraron un segundo carro, casi siempre viejo y barato, con una placa que terminara en otro número. Una medida contra los carros había aumentado los carros. Y como eran viejos, contaminaban más.',
      'Nadie en el concejo quería ese resultado. A eso se le llama efecto no deseado: lo que produce una intervención sin que nadie lo busque. Aparece porque las personas no se quedan quietas cuando cambia una regla: se acomodan. Quien diseña una política debe preguntarse qué hará la gente al día siguiente.',
      'También hubo efectos desiguales. Quien tenía dinero compró otro carro; quien no, empezó a salir a las cuatro y media de la mañana para alcanzar un bus repleto. Los repartidores que usaban su moto perdían un día de ingreso por semana. La misma regla pesaba distinto según quién la cargara. Sin embargo, en las cifras que publicaba el concejo aparecía un solo promedio para toda la ciudad, y ese promedio escondía la diferencia.',
      'Y hubo un efecto bueno que nadie anunció: como el bus iba lleno, los pasajeros se organizaron y lograron un carril exclusivo. El carril, y no la placa, redujo los tiempos de viaje en veinte minutos para quienes usan el transporte público.',
      'El concejo corrigió. Mantuvo el carril, cambió la medida por un cobro a quien entra solo en carro al centro y usó ese dinero para más buses. Esta vez publicó de antemano qué iba a medir: tiempos de viaje, calidad del aire y gasto de las familias más pobres. Si en un año no mejora, la regla se cae sola. Una buena intervención no es la que suena bien, sino la que se deja corregir.',
    ],
  };
  const l3 = leccion('icf-sc-sistemico-3', 'Efectos de una intervención', guion(
    ['Lo que se busca', 'Toda medida tiene un propósito.'],
    ['Lo que no se busca', 'La gente se acomoda y aparecen efectos no deseados.'],
    ['Para quién', 'La misma regla pesa distinto según quién la cargue.'],
    ['Medir y corregir', 'Conviene decir de antemano qué se va a medir.']), [
    x('genero-o-cita', '¿Es un efecto **buscado** o **no buscado** por el concejo?', { doc: PICO, rot: ['buscado', 'no buscado'],
      ...F(['Menos carros en la calle el primer mes', 0, '¿Para eso se aprobó?'], ['Se compran segundos carros', 1, '¿Para eso se aprobó?'], ['Más contaminación por carros viejos', 1, '¿Para eso se aprobó?'], ['Los pasajeros logran un carril', 1, '¿Para eso se aprobó?']), bien: 'También hay efectos buenos no buscados.' },
      'Solo vaciar las calles era el propósito; los carros, la contaminación y el carril no estaban previstos.', 'Compara cada efecto con lo que quería la medida.'),
    x('pasos-del-proceso', 'Ordena lo que pasó. El primer paso está en su puesto.', { doc: PICO, que: 'el caso', de: 'La medida de Altamira', fija: 1, ini: [0, 2, 4, 1, 3], tiras: ['Se aprueba la medida de la placa.', 'Las calles se vacían.', 'Se compran segundos carros.', 'El trancón empeora.', 'El concejo corrige.'], mira: ['', 'Ocurre el primer mes.', 'Es lo que hace la gente para acomodarse.', 'Es lo que se ve al año.', 'Es lo último que cuenta el texto.'], bien: 'Aprobar, vaciar, acomodarse, empeorar y corregir.' },
      'Se aprueba, funciona un mes, la gente compra carros, empeora y se corrige.', 'Fíjate en las palabras que dicen cuándo ocurrió cada cosa.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: PICO,
      ...F(['presenta la medida y su éxito', 0, 'Busca el primer mes.'], ['cuenta el resultado contrario', 1, 'Busca el segundo carro.'], ['define el efecto no deseado', 2, 'Busca «se le llama».'], ['muestra a quién le pesó más', 3, 'Busca los repartidores.'], ['cuenta un efecto bueno', 4, 'Busca el carril.'], ['explica la corrección', 5, 'Busca lo que se va a medir.'], ['explica cómo se fabrica un bus', null, 'Nadie fabrica buses aquí.']),
      luz: [[1, 'El primer mes'], [2, 'un segundo carro'], [3, 'efecto no deseado'], [4, 'efectos desiguales'], [5, 'un carril exclusivo'], [6, 'El concejo corrigió']], bien: 'Medida, resultado, concepto, desigualdad, carril y corrección.' },
      'Presenta la medida, su mal resultado, el concepto, la desigualdad, un efecto bueno y la corrección.', 'Mira de qué efecto habla cada párrafo del caso.'),
    x('pista-tipo', 'Ata cada grupo a cómo le pesó la medida.', { doc: PICO, lineas: ['Compró otro carro.', 'Salía a las cuatro y media.', 'Perdía un día de ingreso.', 'Ganó un viaje más corto, al final.'],
      ...T(['quien tenía dinero', 0, '¿Quién podía evitarla pagando?'], ['quien dependía del bus lleno', 1, '¿Quién madrugaba más?'], ['el repartidor en moto', 2, '¿Quién trabaja con su vehículo?'], ['el pasajero, tras el carril', 3, '¿A quién ayudó lo no previsto?']), bien: 'La misma regla, pesos distintos.' },
      'Con dinero se evitaba; el del bus madrugaba, el repartidor perdía ingreso y el carril ayudó al pasajero.', 'Busca qué hizo, ganó o perdió cada grupo de personas.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: PICO, frases: [[3, 'lo que produce una ', 'intervención', ' sin que nadie lo busque'], [3, 'cuando cambia una regla: se ', 'acomodan', ''], [6, 'publicó ', 'de antemano', ' qué iba a medir']],
      ...F(['medida', 0, '¿Cómo llama el texto a lo que hizo el concejo?'], ['adaptan', 1, '¿Qué hizo la gente con la placa?'], ['desde antes', 2, '¿Cuándo avisó qué mediría?'], ['cirugía', null, 'Aquí nadie opera a nadie.'], ['sientan', null, 'No se trata de sillas.']), bien: 'El contexto decide el sentido.' },
      'La intervención es la medida, acomodarse es adaptarse y de antemano es desde antes.', 'Reemplaza y mira si la oración dice lo mismo.'),
    x('balanza-tesis', 'Afirmación: «la placa redujo los tiempos de viaje». ¿Qué hace cada dato?', { doc: PICO, tesis: 'La placa redujo los tiempos de viaje',
      ...F(['Al año el trancón era peor.', 1, '¿Se viajaba más rápido?'], ['Los tiempos bajaron solo donde hay carril.', 1, '¿Qué otra cosa los explica?'], ['El primer mes las calles se vaciaron.', 0, '¿Apoya al menos por un tiempo?'], ['La bicicleta del alcalde es verde.', 2, '¿Mide tiempos?']), bien: 'Otra causa explica mejor.' },
      'El trancón y el carril la debilitan; el primer mes la apoya; la bicicleta no pesa.', 'Pregunta si el dato señala a la placa o a otra causa.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PICO, nums: [2, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los segundos carros contaminaban más.', 0, 'Léela junto al párrafo 2.'], ['El concejo aprendió de su primera medida.', 1, '¿Qué hace distinto esta vez?'], ['Al concejo le importa no cargar a los más pobres.', 1, '¿Qué va a medir esta vez?'], ['El alcalde fue reelegido.', 2, '¿Se habla de elecciones?']),
      luz: [[2, 'contaminaban más'], [6, 'Esta vez publicó'], [6, 'gasto de las familias más pobres']], bien: 'Lo que se mide muestra lo que importa.' },
      'La contaminación está escrita; que aprendió y que cuida a los pobres se deducen; la reelección no aparece.', 'Mira qué anunció que mediría y qué pasa si no mejora.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PICO, lineas: ['Una medida contra el tráfico lo empeoró.', 'El alcalde usó una bicicleta.', 'La gente se acomodó y surgieron efectos no deseados.', 'La regla pesó distinto según el dinero.', 'Algunos salían a las cuatro y media.', 'Se corrigió anunciando qué se mediría.'], ...S([1, 4], { 0: 'Es el problema.', 2: 'Es el concepto.', 3: 'Es la desigualdad.', 5: 'Es la lección.' }), bien: 'Problema, concepto, desigualdad y corrección.' },
      'La bicicleta y la hora son detalles; lo demás sirve para evaluar otra medida.', 'Deja lo que usarías para analizar otra política.'),
  ]);

  const ESCUELA = {
    id: 'icf-celulares', title: 'El colegio sin celulares',
    paras: [
      'El colegio San Isidro prohibió los celulares desde enero. La rectora explicó el motivo: en un año, las peleas grabadas y publicadas habían pasado de tres a diecinueve. «El celular tiene la culpa», afirmó una madre en la asamblea. Otra recordó que ese mismo año el colegio recibió, de un día para otro, a los estudiantes de una sede que cerró por grietas, y que los cursos pasaron de treinta a cuarenta y cinco alumnos.',
      'A los tres meses los videos bajaron a uno. Las peleas, según el registro de enfermería, siguieron iguales: solo dejaron de grabarse. Los profesores notaron más conversación en el recreo y más atención en clase. Al mismo tiempo aparecieron problemas que nadie previó. Varios estudiantes que trabajan por la tarde perdieron turnos porque no veían los mensajes de sus jefes. Dos niñas con diabetes, que medían su glucosa con una aplicación, tuvieron que pedir permiso cada vez.',
      'Los que tenían dinero compraron relojes que reciben mensajes. Los demás se quedaron sin nada. Además surgió, detrás de la cancha, un pequeño negocio: un alumno de once alquilaba su teléfono a quinientos pesos el minuto.',
      'El consejo directivo se reunió en abril. Los profesores pedían mantener la prohibición por la atención; los padres que trabajan, poder comunicarse; los estudiantes, confianza; y la orientadora, que se hablara de las peleas y no solo de los videos. La secretaría de educación recordó que cualquier regla debe respetar el derecho a la salud.',
      'La decisión fue intermedia. Los celulares se guardan en clase y se pueden usar en el primer recreo; quienes los necesiten por salud los llevan siempre. Se crearon tres grupos de mediación para los cursos que crecieron, y la secretaría se comprometió a abrir dos cursos más. En noviembre se revisará con cuatro datos: atención en clase, peleas en enfermería, quejas de acoso y opinión de los estudiantes. «Si solo miramos los videos», dijo la orientadora, «vamos a creer que todo se arregló».',
    ],
  };
  const Q = preg(ESCUELA, 'sociales');
  return mundo('icf-sc-sistemico', 'Problemas Complejos', 'sociales', [l1, l2, l3], [
    ['icf-sc-sistemico-1', 'Busca qué más cambió al mismo tiempo.', Q('El dato de los cursos de cuarenta y cinco alumnos sirve para:', ['Probar que el celular causa las peleas', 'Señalar otra posible causa del aumento de peleas', 'Mostrar que la sede cerró por error', 'Negar que hubo peleas'], 1, 'Ese año también cambió el tamaño de los cursos: puede ser otra causa.', 'Pregunta qué más pasó ese mismo año.')],
    ['icf-sc-sistemico-1', 'Que algo deje de verse no significa que deje de ocurrir.', Q('Según el registro de enfermería, la prohibición:', ['Acabó con las peleas', 'Aumentó las peleas', 'Redujo las grabaciones, pero no las peleas', 'No cambió nada en el colegio'], 2, 'Las peleas siguieron iguales: solo dejaron de grabarse.', 'Compara el número de videos con el registro de enfermería.')],
    ['icf-sc-sistemico-2', 'Cada actor enfatiza una dimensión distinta.', Q('El caso de las niñas con diabetes muestra un choque entre:', ['La disciplina y el derecho a la salud', 'La moda y el estudio', 'El deporte y la economía', 'Los profesores y los bomberos'], 0, 'La regla de disciplina dificultaba cuidar su salud.', 'Nombra lo que buscaba la regla y lo que ellas necesitaban.')],
    ['icf-sc-sistemico-2', 'Una salida puede atender varias dimensiones.', Q('La decisión de abril atiende sobre todo a:', ['Solo los profesores', 'Solo los padres', 'Nadie, porque mantiene la regla', 'Varios intereses, con concesiones de cada grupo'], 3, 'Guarda en clase, permite un recreo, exceptúa la salud y crea mediación.', 'Compara cada parte de la decisión con lo que pedía cada grupo.')],
    ['icf-sc-sistemico-3', 'La gente se acomoda a las reglas.', Q('El alquiler del teléfono detrás de la cancha es un ejemplo de:', ['Efecto buscado por la rectora', 'Efecto no deseado de la medida', 'Causa de la prohibición', 'Dimensión ambiental'], 1, 'Nadie quería ese negocio: apareció cuando los estudiantes se acomodaron a la regla.', 'Pregunta si la prohibición se hizo para eso.')],
    ['icf-sc-sistemico-3', 'Medir una sola cosa puede engañar.', Q('La frase final de la orientadora advierte que:', ['Los videos deben volver', 'Hay que prohibir las cámaras', 'Un solo indicador puede hacer creer que el problema se resolvió', 'Las peleas ya se acabaron'], 2, 'Si solo se cuentan videos, parece resuelto aunque las peleas sigan.', 'Une la frase con el dato de enfermería.')],
  ]);
})());
