// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/courses/preicfes-sc-sistemico.js
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
;
//#archivo js/courses/preicfes-sc-historia.js
// Preicfes · Sociales y Ciudadanas · mundo 6 «Historia de Colombia» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const COLONIA = {
    id: 'icf-colonia', title: 'De súbditos a ciudadanos',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Febrero de 2026' },
    paras: [
      'Durante casi tres siglos, lo que hoy es Colombia fue parte del imperio español. La Corona nombraba a quienes gobernaban, cobraba impuestos y controlaba el comercio: solo se podía vender y comprar, legalmente, con la metrópoli. La sociedad estaba ordenada por origen. Arriba, los españoles nacidos en Europa; luego sus descendientes americanos, los criollos; después mestizos, indígenas y, en la base, los africanos esclavizados.',
      'Ese orden nunca fue tranquilo. Hubo indígenas que pleitearon por sus resguardos y esclavizados que huyeron y fundaron palenques, como el de San Basilio, reconocido por la Corona a comienzos del siglo XVIII. Resistir no era siempre pelear: también era conservar una lengua, una fiesta o una forma de sembrar.',
      'En el siglo XVIII, los reyes de la casa de Borbón quisieron sacar más provecho de sus colonias. Subieron los impuestos, crearon monopolios como el del tabaco y prefirieron a los peninsulares para los cargos. En 1781, en El Socorro, Manuela Beltrán rompió el edicto de un nuevo impuesto, y miles de personas marcharon hacia Santafé. Los comuneros pactaron unas capitulaciones que el gobierno incumplió. José Antonio Galán, que siguió en rebeldía, fue ejecutado en 1782.',
      'Los criollos tenían dinero y estudios, pero no el poder. Leían a los ilustrados franceses y conocían la independencia de Estados Unidos. A fines de 1793, Antonio Nariño tradujo e imprimió los Derechos del Hombre; al año siguiente, eso le costó la cárcel. Cuando en 1808 Napoleón invadió España y puso preso al rey, surgió una pregunta incómoda: si no hay rey, ¿quién manda?',
      'El 20 de julio de 1810, en Santafé, una disputa por un florero fue la chispa de un cabildo abierto que formó una junta de gobierno. No fue todavía la independencia total: la junta decía gobernar en nombre del rey. Vinieron años de división entre centralistas y federalistas, la reconquista española de 1816 y, por fin, la campaña libertadora, que triunfó en Boyacá el 7 de agosto de 1819.',
      'La nueva república cambió muchas cosas y dejó otras. Ya no había súbditos, sino ciudadanos; pero solo votaban los hombres libres con propiedades o renta. La esclavitud duró hasta 1851. Los indígenas perdieron, poco a poco, sus tierras comunales. La independencia cambió quién gobernaba antes de cambiar cómo se vivía.',
    ],
  };
  const l1 = leccion('icf-sc-historia-1', 'De la Colonia a la República', guion(
    ['El orden colonial', 'Un imperio que controla cargos, comercio e impuestos, y una sociedad ordenada por origen.'],
    ['Resistencias', 'Palenques, pleitos, comuneros: el orden nunca fue tranquilo.'],
    ['Causas y detonantes', 'Reformas, ideas y crisis del rey; el florero fue la chispa.'],
    ['Cambios y permanencias', 'Hubo república, pero siguieron la esclavitud y el voto de pocos.']), [
    x('linea-vida', 'Lleva cada hecho a su época.', { doc: COLONIA, rot: ['antes de 1800', 'de 1800 a 1819', 'después de 1819'],
      ...F(['La marcha de los comuneros', 0, 'Busca el año de El Socorro.'], ['La junta de Santafé', 1, 'Busca el año del florero.'], ['El fin legal de la esclavitud', 2, 'Busca hasta cuándo duró.'], ['La batalla de Boyacá', 1, 'Busca el triunfo de la campaña.']), luz: [[3, 'En 1781'], [5, '20 de julio de 1810'], [6, 'hasta 1851']], bien: '1781, 1810, 1819 y 1851.' },
      'Los comuneros son de 1781; la junta, de 1810; Boyacá, de 1819; la esclavitud terminó en 1851.', 'Busca la fecha de cada hecho en el texto.'),
    x('genero-o-cita', '¿Es una **causa de fondo** o el **detonante** del 20 de julio?', { doc: COLONIA, rot: ['de fondo', 'detonante'],
      ...F(['La disputa por el florero', 1, '¿Venía de tiempo atrás?'], ['Los cargos para los peninsulares', 0, '¿Venía de tiempo atrás?'], ['Las ideas ilustradas', 0, '¿Venía de tiempo atrás?'], ['Los impuestos y monopolios', 0, '¿Venía de tiempo atrás?']), bien: 'La chispa y la leña.' },
      'El florero fue la chispa; cargos, ideas e impuestos venían acumulándose.', 'Pregunta si ocurrió ese día o desde antes.'),
    x('pista-tipo', 'Ata cada grupo a lo que lo caracteriza en el texto.', { doc: COLONIA, lineas: ['peninsulares', 'criollos', 'africanos esclavizados', 'indígenas'],
      ...T(['preferidos para los cargos', 0, '¿A quiénes prefirieron los Borbones?'], ['con dinero y estudios, sin el poder', 1, '¿Quiénes leían a los ilustrados?'], ['algunos huyeron y fundaron palenques', 2, '¿Quiénes hicieron San Basilio?'], ['pleitearon por sus resguardos', 3, '¿Quiénes defendían tierras comunales?']), bien: 'Cada grupo, su lugar y su lucha.' },
      'Peninsulares con cargos, criollos sin poder, palenques de esclavizados y resguardos indígenas.', 'Busca en el texto qué se dice de cada grupo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: COLONIA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'La independencia fue un proceso con varias etapas.',
      ...T(['El gobierno cumplió lo pactado con los comuneros.', 3, 'Busca qué pasó con las capitulaciones.'], ['El 20 de julio fue la independencia total.', 6, 'Busca en nombre de quién gobernaba la junta.'], ['Desde 1819 votaron todos.', 9, 'Busca quiénes votaban.']), bien: 'Incumplió, todavía no y solo algunos.' },
      'Las capitulaciones se incumplieron, la junta gobernaba en nombre del rey y votaban pocos.', 'Busca la palabra clave: comuneros, independencia, votar.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: COLONIA, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Nariño fue preso por imprimir los Derechos del Hombre.', 0, 'Búscala junto al nombre de Nariño.'], ['Al gobierno le inquietaban esas ideas.', 1, '¿Por qué castigaría una traducción?'], ['Un hombre sin propiedades podía ser ciudadano y no votar.', 1, '¿Quiénes votaban?'], ['Nariño viajó con Napoleón.', 2, '¿El texto los une?']),
      luz: [[4, 'eso le costó la cárcel'], [6, 'solo votaban']], bien: 'El castigo muestra el miedo.' },
      'La cárcel está escrita; la inquietud y el ciudadano sin voto se deducen; el viaje se inventa.', 'Pregunta por qué un gobierno castigaría eso.'),
    x('balanza-tesis', 'Tesis: «la independencia cambió quién gobernaba antes de cambiar cómo se vivía». ¿Qué hace cada dato?', { doc: COLONIA, tesis: 'Cambió quién gobernaba antes de cómo se vivía',
      ...F(['La esclavitud siguió más de treinta años.', 0, '¿Siguió algo de la vida de antes?'], ['Solo votaban hombres con propiedades o renta.', 0, '¿Cambió para la mayoría?'], ['En 1820 se repartió la tierra entre todos.', 1, 'Si fuera cierto, ¿qué diría de la tesis?'], ['El florero era de porcelana.', 2, '¿Habla de la vida o del gobierno?']), bien: 'Cambios y permanencias.' },
      'La esclavitud y el voto restringido la apoyan; un reparto general la debilitaría; el florero no pesa.', 'Supón cierto cada dato y pregunta si la vida cambió pronto.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: COLONIA, frases: [[1, 'legalmente, con la ', 'metrópoli', ''], [3, 'crearon ', 'monopolios', ' como el del tabaco'], [2, 'indígenas que ', 'pleitearon', ' por sus resguardos']],
      ...F(['España', 0, '¿Quién dominaba la colonia?'], ['negocios de un solo vendedor', 1, '¿Quién podía vender el tabaco?'], ['reclamaron ante la ley', 2, '¿Cómo defendieron sus tierras?'], ['ciudad grande', null, 'Aquí se habla de un imperio.'], ['bailaron', null, 'Se trata de defender tierras.']), bien: 'Cada palabra en su época.' },
      'La metrópoli es el país que domina, el monopolio es un solo vendedor y pleitear es reclamar ante la ley.', 'Lee la oración completa y piensa quién manda.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: COLONIA, lineas: ['La sociedad colonial estaba ordenada por origen.', 'La campaña triunfó en agosto.', 'Hubo resistencias y reformas que molestaron.', 'La crisis del rey abrió el camino a la independencia.', 'Galán siguió en rebeldía.', 'La república dejó muchas desigualdades.'], ...S([1, 4], { 0: 'Es el punto de partida.', 2: 'Son causas de fondo.', 3: 'Es el momento clave.', 5: 'Es lo que permaneció.' }), bien: 'Orden, resistencia, crisis y permanencias.' },
      'El mes y la rebeldía de Galán son detalles; lo demás explica el proceso.', 'Deja lo que ayuda a entender por qué y qué cambió.'),
  ]);

  const SIGLO = {
    id: 'icf-siglo19', title: 'Un país que se escribía y se borraba',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'Pocos países estrenaron tantas constituciones en un siglo. Entre 1821 y 1886 hubo, por lo menos, ocho textos nacionales. Varios cambiaban el nombre del país y casi todos, la respuesta a tres preguntas: ¿cuánto poder tiene el gobierno central?, ¿qué lugar ocupa la Iglesia?, ¿quién puede votar?',
      'La primera república unió a la Nueva Granada, Venezuela y Ecuador. Los historiadores la llaman Gran Colombia. Era enorme y sus regiones estaban mal comunicadas; además, Bolívar y Santander tenían ideas distintas sobre cuánto debía mandar el centro. En 1830 se separaron Venezuela y Ecuador, y ese mismo año murió Bolívar en Santa Marta.',
      'A mitad de siglo aparecieron los dos partidos que marcarían la historia. Los conservadores defendían, en general, un Estado central fuerte y a la Iglesia católica como base del orden. Los liberales pedían más libertades, más poder para las regiones y separar a la Iglesia del Estado. Dentro de cada partido había ricos y pobres; muchas veces se era liberal o conservador por la familia o por el pueblo.',
      'Las reformas liberales de mitad de siglo abolieron la esclavitud, expropiaron tierras de la Iglesia y, en 1863, consolidaron con la Constitución de Rionegro un país federal, los Estados Unidos de Colombia, con nueve estados que tenían ejército propio. Hubo muchas libertades y también muchas guerras locales.',
      'En 1886, con Rafael Núñez y Miguel Antonio Caro, la Regeneración hizo lo contrario: un país unitario, con un presidente fuerte, y un acuerdo con la Iglesia que le entregó la educación. Los liberales quedaron casi por fuera del gobierno. El siglo terminó con la guerra de los Mil Días, entre 1899 y 1902, que dejó unos cien mil muertos según los cálculos más citados. Al año siguiente, con apoyo de Estados Unidos, se separó Panamá.',
      'Mientras los partidos peleaban, el café crecía en las laderas. A fines de siglo ya era el principal producto que se exportaba. Con él llegaron caminos, pequeños propietarios en unas regiones y grandes haciendas en otras. La política se escribía en constituciones; la vida, en recibos de café.',
    ],
  };
  const l2 = leccion('icf-sc-historia-2', 'Siglo XIX', guion(
    ['Tres preguntas', 'Centro o regiones, Iglesia y Estado, y quién vota.'],
    ['Dos partidos', 'Conservadores y liberales, a mitad de siglo.'],
    ['Péndulo', '1863, federal y liberal; 1886, central y conservadora.'],
    ['Economía', 'El café cambió el país mientras los partidos peleaban.']), [
    x('pinta-tipos', 'Pinta cada idea con el partido que, en general, la defendía.', { doc: SIGLO, plumas: ['conservador', 'liberal'],
      ...P(['Un Estado central fuerte.', 0, '¿Quién quería un centro fuerte?'], ['Separar a la Iglesia del Estado.', 1, '¿Quién quería separarla?'], ['Más poder para las regiones.', 1, '¿Quién quería repartir el poder?'], ['La Iglesia como base del orden.', 0, '¿Quién veía así a la Iglesia?']), bien: 'Centro e Iglesia; regiones y libertades.' },
      'Los conservadores, centro e Iglesia; los liberales, regiones y separación.', 'Relee el párrafo que presenta a los dos partidos.'),
    x('linea-vida', 'Lleva cada rasgo a su constitución.', { doc: SIGLO, rot: ['Rionegro, 1863', 'Regeneración, 1886'],
      ...F(['Nueve estados con ejército', 0, 'Busca el nombre «Estados Unidos de Colombia».'], ['Un presidente fuerte', 1, 'Busca a Núñez y Caro.'], ['La Iglesia recibe la educación', 1, 'Busca el acuerdo con la Iglesia.'], ['Un país federal', 0, 'Busca la palabra en el párrafo 4.']), luz: [[4, 'un país federal'], [5, 'un país unitario']], bien: 'De un extremo al otro.' },
      'Rionegro fue federal, con ejércitos regionales; la de 1886, unitaria, presidencial y con la Iglesia.', 'Compara lo que hizo cada reforma: párrafos 4 y 5.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: SIGLO,
      ...F(['¿Por qué se separó la Gran Colombia?', 1, 'Busca el comienzo que nombra la primera república.'], ['¿Qué producto se exportaba más?', 5, 'Busca el comienzo que nombra un cultivo.'], ['¿Qué tres preguntas cambiaban?', 0, 'Busca el comienzo sobre constituciones.']),
      luz: [[2, 'mal comunicadas'], [6, 'el principal producto'], [1, 'tres preguntas']], bien: 'Comienzo, segundo y último.' },
      'La separación está en el 2, el café en el 6 y las preguntas en el 1.', 'Lee solo la primera oración de cada párrafo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SIGLO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['En cada partido había ricos y pobres.', 0, 'Léela junto al párrafo 3.'], ['Dejar por fuera a un partido ayudó a que hubiera guerra.', 1, '¿Qué pasó después de que los liberales quedaran por fuera?'], ['Dos vecinos con ideas parecidas podían ser de partidos opuestos.', 1, '¿Por qué se era liberal o conservador muchas veces?'], ['Panamá se separó por una guerra de religión.', 2, '¿El texto da esa causa?']),
      luz: [[3, 'había ricos y pobres'], [5, 'casi por fuera del gobierno'], [3, 'por la familia o por el pueblo']], bien: 'La familia y el pueblo pesaban.' },
      'Ricos y pobres está escrito; la exclusión y la herencia del partido se deducen; la religión no.', 'Une lo que pasa antes con lo que pasa después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: SIGLO, filas: [{ antes: 'Los conservadores defendían el centro', topes: ['nunca', 'siempre y todos', 'en general'], va: 2 }, { antes: 'Con Rionegro hubo', topes: ['solo paz', 'libertades y guerras locales', 'solo guerra'], va: 1 }, { antes: 'La cifra de muertos de los Mil Días es', topes: ['un cálculo', 'exacta', 'falsa'], va: 0 }], mira: ['Busca las dos palabras que limitan la idea.', 'Relee el final del párrafo 4.', 'Busca «unos» y «según».'], luz: [[3, 'en general'], [4, 'muchas guerras locales'], [5, 'según los cálculos']], bien: 'En general, las dos cosas y un cálculo.' },
      'En general, libertades con guerras locales y una cifra calculada.', 'Busca en el texto la palabra que pone el límite.'),
    x('pasos-del-proceso', 'Ordena el siglo. El primer paso está en su puesto.', { doc: SIGLO, que: 'el siglo', de: 'De la Gran Colombia a Panamá', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Se une la Gran Colombia.', 'Venezuela y Ecuador se separan.', 'Se escribe la de Rionegro.', 'Llega la Regeneración.', 'Guerra de los Mil Días.'], mira: ['', 'Ocurre en 1830.', 'Ocurre en 1863.', 'Ocurre en 1886.', 'Cierra el siglo.'], bien: 'Unión, separación, federal, central y guerra.' },
      'Primero la unión, en 1830 la separación, luego 1863, 1886 y la guerra.', 'Busca los años en el texto y ponlos en fila.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que opone las **leyes** y los **recibos**.', { doc: SIGLO, nums: [6], apuesta: 'Una se escribía en leyes; la otra, en café.', ...S(['6.3'], { '6.0': 'Dice que las dos cosas pasaban a la vez.', '6.1': 'Da un dato de exportación.', '6.2': 'Dice qué llegó con el café.' }), bien: 'La imagen final resume la idea.' },
      'La última oración opone las constituciones a los recibos de café.', 'Busca la oración que cierra el texto con una imagen.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO, lineas: ['El siglo discutió centro, Iglesia y voto.', 'Bolívar murió en Santa Marta.', 'Dos partidos nacieron a mitad de siglo.', 'Se pasó de un país federal a uno central.', 'La guerra empezó en 1899.', 'El café transformó la economía.'], ...S([1, 4], { 0: 'Es la idea que organiza el texto.', 2: 'Son los actores.', 3: 'Es el péndulo.', 5: 'Es el cambio económico.' }), bien: 'Preguntas, partidos, péndulo y café.' },
      'El lugar y el año son detalles; lo demás organiza el siglo.', 'Deja lo que explica los cambios del país.'),
  ]);

  const SIGLO20 = {
    id: 'icf-siglo20', title: 'La paz y sus intentos',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'Las primeras décadas del siglo XX trajeron ferrocarriles, café y la indemnización por Panamá. En las plantaciones y los pozos petroleros nacieron los sindicatos. En diciembre de 1928, en Ciénaga, el ejército disparó contra trabajadores en huelga de una bananera extranjera. Aún se discute cuántos murieron; nadie discute que marcó al país.',
      'En 1930 los liberales volvieron al poder y, pocos años después, hicieron reformas: derecho a la huelga, función social de la propiedad, más educación pública. Parte del país sintió que por fin avanzaba; otra parte, que se perdía el orden. Jorge Eliécer Gaitán, que hablaba del «país político» y del «país nacional», reunió multitudes. El 9 de abril de 1948 lo asesinaron en Bogotá.',
      'Su muerte no creó la violencia entre liberales y conservadores, que ya venía, pero la multiplicó. A los años que siguieron se les llama «La Violencia», con mayúscula: unos doscientos mil muertos y cientos de miles de personas que huyeron del campo. Entre 1953 y 1957 gobernó el general Rojas Pinilla. Para salir de la dictadura y de la guerra, los dos partidos crearon el Frente Nacional: se turnaron la presidencia durante dieciséis años.',
      'El Frente Nacional redujo la guerra entre partidos, pero cerró la puerta a los demás. Quien no era liberal ni conservador tenía muy difícil participar. En los años sesenta, en un mundo partido por la Guerra Fría, nacieron guerrillas como las FARC y el ELN, que decían luchar por la tierra y la igualdad. Más tarde aparecieron grupos paramilitares, que decían defenderse de ellas, y el narcotráfico, que financió a unos y a otros.',
      'La población civil puso la mayoría de las víctimas. Hubo desplazamiento, secuestros, masacres, reclutamiento de niños y ejecuciones de inocentes presentados como combatientes. Todos los grupos armados y también agentes del Estado cometieron crímenes. Decir esto no es repartir culpas por igual: es reconocer que ninguna víctima vale menos por quién la mató.',
      'Los intentos de paz también hacen parte de la historia. En 1990 el M-19 dejó las armas; un año después, una asamblea plural escribió una nueva Constitución. En 2016 el Estado y las FARC firmaron un acuerdo, rechazado por poca diferencia en un plebiscito y luego modificado. Creó una comisión de la verdad y una justicia especial. El conflicto no terminó del todo, pero miles de personas siguen vivas porque algo cambió.',
    ],
  };
  const l3 = leccion('icf-sc-historia-3', 'Siglo XX y conflicto armado', guion(
    ['De la huelga al 9 de abril', 'Sindicatos, reformas y la muerte de Gaitán.'],
    ['La Violencia y el Frente Nacional', 'Guerra entre partidos y un pacto que cerró la puerta a otros.'],
    ['El conflicto armado', 'Guerrillas, paramilitares, narcotráfico y Estado; las víctimas, sobre todo civiles.'],
    ['Intentos de paz', '1990, la Constitución de 1991, el acuerdo de 2016.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: SIGLO20,
      ...F(['el comienzo del siglo y las huelgas', 0, 'Busca los sindicatos.'], ['reformas y Gaitán', 1, 'Busca el regreso de los liberales.'], ['La Violencia y el pacto', 2, 'Busca el turno en la presidencia.'], ['el origen del conflicto armado', 3, 'Busca los años sesenta.'], ['las víctimas', 4, 'Busca a la población civil.'], ['los intentos de paz', 5, 'Busca el año 1990.'], ['la llegada de los españoles', null, 'Eso fue siglos antes.']),
      luz: [[1, 'nacieron los sindicatos'], [2, 'hicieron reformas'], [3, 'el Frente Nacional'], [4, 'nacieron guerrillas'], [5, 'La población civil'], [6, 'Los intentos de paz']], bien: 'Huelgas, reformas, violencia, conflicto, víctimas y paz.' },
      'El texto recorre huelgas, reformas, La Violencia, el conflicto, las víctimas y la paz.', 'Lee el comienzo de cada párrafo y dale un nombre.'),
    x('linea-vida', 'Lleva cada hecho a su momento.', { doc: SIGLO20, rot: ['antes de 1950', 'de 1950 a 1989', 'desde 1990'],
      ...F(['La masacre de las bananeras', 0, 'Busca el año de Ciénaga.'], ['El Frente Nacional', 1, 'Busca qué vino después de Rojas.'], ['Nacen las FARC y el ELN', 1, 'Busca los años sesenta.'], ['La nueva Constitución', 2, 'Busca un año después de 1990.']), luz: [[1, '1928'], [4, 'años sesenta'], [6, 'En 1990']], bien: '1928, los cincuenta, los sesenta y 1991.' },
      'Bananeras 1928, Frente Nacional tras 1957, guerrillas en los sesenta y Constitución en 1991.', 'Busca la fecha o la década de cada hecho.'),
    x('genero-o-cita', 'Del Frente Nacional, ¿es un efecto **buscado** o **no buscado**?', { doc: SIGLO20, rot: ['buscado', 'no buscado'],
      ...F(['Salir de la dictadura', 0, '¿Para eso se creó?'], ['Reducir la guerra entre partidos', 0, '¿Para eso se creó?'], ['Cerrar la puerta a otros grupos', 1, '¿El texto lo da como meta o como resultado?'], ['Alimentar que algunos buscaran las armas', 1, '¿Para eso se creó?']), bien: 'Un pacto con efectos inesperados.' },
      'Salir de la dictadura y de la guerra era la meta; la exclusión y lo que siguió, no.', 'Mira para qué se creó y qué pasó después.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: SIGLO20, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'La mayoría de las víctimas fueron civiles.',
      ...T(['Se sabe exactamente cuántos murieron en Ciénaga.', 3, 'Busca lo que aún se discute.'], ['La violencia empezó con la muerte de Gaitán.', 4, 'Busca si ya venía.'], ['Solo un grupo cometió crímenes.', 10, 'Busca quiénes los cometieron.']), bien: 'Se discute, ya venía y todos.' },
      'La cifra se discute, la violencia ya venía y los crímenes fueron de todos los grupos y de agentes del Estado.', 'Saca la palabra clave: cuántos, empezó, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SIGLO20, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El narcotráfico financió a grupos enfrentados.', 0, 'Léela junto al final del párrafo 4.'], ['El país estaba dividido frente al acuerdo.', 1, '¿Cómo fue el resultado del plebiscito?'], ['Un contexto mundial influyó en el conflicto.', 1, '¿Qué pasaba en el mundo en los sesenta?'], ['El M-19 ganó la presidencia en 1990.', 2, '¿Se habla de esa elección?']),
      luz: [[4, 'financió a unos y a otros'], [6, 'por poca diferencia'], [4, 'la Guerra Fría']], bien: 'Poca diferencia: un país dividido.' },
      'El narcotráfico está escrito; la división y el contexto se deducen; la presidencia no aparece.', 'Piensa qué muestra un resultado tan cerrado.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que **aclara** cómo se debe entender lo anterior.', { doc: SIGLO20, nums: [5], apuesta: 'Ninguna víctima vale menos.', ...S(['5.3'], { '5.0': 'Dice quiénes fueron la mayoría.', '5.1': 'Da ejemplos de lo que ocurrió.', '5.2': 'Dice quiénes cometieron crímenes.' }), bien: '«No es… es…» aclara.' },
      'La última oración aclara: no se trata de repartir culpas por igual, sino de reconocer a las víctimas.', 'Busca la oración que dice qué no es y qué sí es.'),
    x('balanza-tesis', 'Tesis: «el Frente Nacional trajo una paz incompleta». ¿Qué hace cada dato?', { doc: SIGLO20, tesis: 'El Frente Nacional trajo una paz incompleta',
      ...F(['Redujo la guerra entre liberales y conservadores.', 0, '¿Trajo algo de paz?'], ['Nacieron guerrillas en esos años.', 0, '¿Fue completa?'], ['Durante el pacto no hubo ningún grupo armado.', 1, 'Si fuera cierto, ¿sería incompleta?'], ['Duró un número par de años.', 2, '¿Habla de la paz?']), bien: 'Algo de paz y algo de guerra.' },
      'Reducir una guerra y ver nacer otra apoyan «incompleta»; no haber armados la debilitaría; el número par no pesa.', 'La tesis tiene dos partes: hubo paz y no fue completa.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO20, lineas: ['Las huelgas y las reformas abrieron el siglo.', 'Rojas era general.', 'La Violencia llevó a un pacto que excluyó a otros.', 'El conflicto armado golpeó sobre todo a civiles.', 'La huelga fue en diciembre.', 'Hubo varios intentos de paz.'], ...S([1, 4], { 0: 'Es el comienzo.', 2: 'Es el puente entre dos guerras.', 3: 'Es el centro del texto.', 5: 'Es el cierre.' }), bien: 'Comienzo, pacto, conflicto y paz.' },
      'El grado y el mes son detalles; lo demás es el hilo del siglo.', 'Deja lo que explica cómo se llegó hasta hoy.'),
  ]);

  const CAJA = {
    id: 'icf-caja', title: 'Tres papeles en una caja de galletas',
    paras: [
      'Al morir doña Carmen Arango, su nieta, que estudia historia, abrió la caja de galletas donde guardaba «lo importante». Había tres papeles, envueltos en el mismo pañuelo.',
      'El primero era la copia de una carta de 1782. Un antepasado, tejedor de El Socorro, le contaba a un compadre: «Volvimos con las manos llenas de papeles firmados y ya no valen nada. Subieron otra vez el tabaco. A Galán lo mataron para que los demás aprendamos. Yo no aprendí a callarme; aprendí a leer lo que se firma».',
      'El segundo era un billete de 1886, con un mensaje en el reverso. Lo escribió un bisabuelo que había sido soldado del Estado Soberano de Santander: «Me licenciaron. Ya no hay Estado, ni ejército, ni bandera: todo se manda desde Bogotá. Dicen que así habrá orden. El cura abrió la escuela y echó al maestro liberal. Mi hermano está contento; yo no. En la mesa ya no hablamos».',
      'El tercero era la cédula de Carmen, con la fecha en que votó por primera vez: primero de diciembre de 1957. Ese día se decidía en un plebiscito si liberales y conservadores se turnarían el poder para salir de la dictadura y de la guerra entre ellos. Ninguna colombiana había votado antes en una elección nacional, aunque el derecho se había aprobado en 1954. Votaron más de un millón ochocientas mil mujeres. El mismo texto que confirmaba sus derechos reservaba los cargos a los dos partidos.',
      'Junto a la cédula había un recorte con una caricatura: una señora entra a votar y, detrás, el marido carga al niño y la olla. El dibujante quiso burlarse. La abuela había escrito encima, con esfero azul: «Ojalá».',
      'La nieta puso los tres papeles en fila. Uno hablaba de promesas incumplidas; otro, de un país que cambiaba de dueño; el último, de una puerta que se abría mientras otra quedaba cerrada. Comprendió por qué su abuela no los había guardado con las fotos, sino con las escrituras de la casa.',
    ],
  };
  const Q = preg(CAJA, 'sociales');
  return mundo('icf-sc-historia', 'Historia de Colombia', 'sociales', [l1, l2, l3], [
    ['icf-sc-historia-1', 'Los comuneros pactaron y el gobierno incumplió.', Q('«Papeles firmados que ya no valen nada» se refiere a:', ['Las cédulas de 1957', 'Las capitulaciones pactadas con los comuneros', 'La Constitución de 1886', 'Los Derechos del Hombre'], 1, 'La carta es de 1782 y nombra El Socorro, el tabaco y a Galán: habla de lo pactado con los comuneros.', 'Mira la fecha, el lugar y a quién nombra la carta.')],
    ['icf-sc-historia-1', 'El monopolio y los impuestos: causas de fondo.', Q('La frase «Subieron otra vez el tabaco» muestra una de las causas del descontento colonial:', ['La falta de escuelas', 'La guerra entre partidos', 'El voto femenino', 'Las cargas y monopolios de la Corona'], 3, 'El tabaco era un monopolio de la Corona, que subía sus cobros.', 'Recuerda qué reformas hicieron los Borbones.')],
    ['icf-sc-historia-2', '1886: del federalismo al centralismo.', Q('El cambio que cuenta el soldado es el paso de:', ['Un país federal a uno central', 'Una colonia a una república', 'Una dictadura a un pacto', 'Un reino a un imperio'], 0, '«Ya no hay Estado, ni ejército: todo se manda desde Bogotá».', 'Compara dónde se mandaba antes y dónde después.')],
    ['icf-sc-historia-2', 'La Iglesia recibió la educación en la Regeneración.', Q('«El cura abrió la escuela y echó al maestro liberal» ilustra:', ['La abolición de la esclavitud', 'La independencia', 'El papel de la Iglesia en la educación desde 1886', 'El origen de los sindicatos'], 2, 'La Regeneración acordó con la Iglesia que dirigiera la educación.', 'Piensa qué decidió la Constitución de ese año sobre la escuela.')],
    ['icf-sc-historia-3', 'Mira qué abre y qué cierra una reforma.', Q('«Una puerta que se abría mientras otra quedaba cerrada» quiere decir que el plebiscito:', ['Abrió escuelas y cerró iglesias', 'Permitió votar solo a los hombres', 'Confirmó derechos a las mujeres, pero reservó los cargos a dos partidos', 'Separó a Panamá'], 2, 'El mismo texto hizo las dos cosas.', 'Busca las dos cosas que hizo el mismo texto.')],
    ['icf-sc-historia-3', 'Una caricatura también es una fuente de su época.', Q('La palabra «Ojalá», escrita sobre la caricatura, muestra que la abuela:', ['Convirtió la burla en un deseo de mayor igualdad', 'Admiraba al dibujante', 'Quería que nadie votara', 'No entendió el dibujo'], 0, 'El dibujante se burlaba de que el hombre cuidara; ella lo desea.', 'Compara lo que quería el dibujante con lo que escribe ella.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-mundo.js
// Preicfes · Sociales y Ciudadanas · mundo 7 «Historia del Mundo» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REVO = {
    id: 'icf-revoluciones', title: 'Cuando el mundo cambió de máquinas y de dueño',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Febrero de 2026' },
    paras: [
      'A finales del siglo XVIII ocurrieron, casi a la vez, dos clases de revolución. Unas cambiaron quién mandaba; otra cambió cómo se producía. Ninguna fue cosa de un día, y entre todas fabricaron buena parte del mundo en que vivimos.',
      'En 1776, trece colonias inglesas de América del Norte declararon su independencia. Su argumento era nuevo: todos los hombres nacen iguales, los gobiernos existen para proteger derechos y obtienen su poder del consentimiento de los gobernados. En la práctica, ese «todos» no incluía a las mujeres, a los pueblos indígenas ni a las personas esclavizadas.',
      'En Francia, el rey gobernaba con poder absoluto y la sociedad estaba dividida en estamentos. El clero y la nobleza casi no pagaban impuestos; el resto, la inmensa mayoría, sí. En 1789, con las cuentas en quiebra y el pan cada vez más caro, los representantes del pueblo se declararon Asamblea Nacional. En agosto proclamaron los Derechos del Hombre y del Ciudadano. Después vinieron la república, el Terror y, en 1799, Napoleón.',
      'La revolución que más lejos llevó la palabra «libertad» ocurrió en Haití. Allí, en 1791, se rebelaron miles de personas esclavizadas en las plantaciones de azúcar. En 1804 fundaron un país sin esclavos. Francia les cobró después una enorme suma por reconocerlo. Muchas historias olvidan mencionarlo; los dueños de esclavos de toda América, en cambio, no lo olvidaron un solo día.',
      'Mientras tanto, en Inglaterra, la máquina de vapor movía telares y, pronto, trenes y barcos. La Revolución Industrial multiplicó lo que se producía y llenó las ciudades de obreros, entre ellos niños, con jornadas de doce o más horas. Surgieron dos grupos con intereses opuestos: quienes tenían las fábricas y quienes solo tenían su trabajo.',
      'Del choque nacieron los sindicatos, las leyes laborales y nuevas ideas. El liberalismo defendía la propiedad y las libertades individuales; el socialismo, que la riqueza se repartiera. El voto se fue ampliando, despacio: primero algunos propietarios, luego los hombres, mucho más tarde las mujeres. La democracia no fue un regalo de las revoluciones, sino una pelea que ellas dejaron abierta.',
    ],
  };
  const l1 = leccion('icf-sc-mundo-1', 'Revoluciones y democracia', guion(
    ['Dos clases', 'Políticas: quién manda. Industrial: cómo se produce.'],
    ['Derechos para ¿todos?', 'La palabra era universal; la práctica, no.'],
    ['Haití', 'La revolución hecha por personas esclavizadas.'],
    ['Después', 'Sindicatos, leyes, liberalismo, socialismo y un voto que se amplía despacio.']), [
    x('linea-vida', 'Lleva cada hecho a su revolución.', { doc: REVO, rot: ['Estados Unidos', 'Francia', 'Haití'],
      ...F(['Trece colonias se independizan', 0, 'Busca el año 1776.'], ['Se proclaman los Derechos del Hombre', 1, 'Busca el año 1789.'], ['Se funda un país sin esclavos', 2, 'Busca el año 1804.'], ['Gobierna Napoleón', 1, 'Busca el año 1799.']), luz: [[2, 'trece colonias'], [3, 'En agosto proclamaron'], [4, 'un país sin esclavos']], bien: '1776, 1789 y 1804.' },
      'Las colonias en 1776; Derechos y Napoleón en Francia; un país sin esclavos en Haití.', 'Busca en qué párrafo del texto aparece cada hecho.'),
    x('genero-o-cita', '¿Es un cambio **político** o **de la producción**?', { doc: REVO, rot: ['político', 'de la producción'],
      ...F(['El pueblo se declara Asamblea Nacional', 0, '¿Cambia quién manda o cómo se produce?'], ['La máquina de vapor mueve telares', 1, '¿Cambia quién manda o cómo se produce?'], ['Se reconocen derechos del ciudadano', 0, '¿Cambia quién manda o cómo se produce?'], ['Las ciudades se llenan de obreros', 1, '¿Cambia quién manda o cómo se produce?']), bien: 'Mandar y producir.' },
      'La asamblea y los derechos cambian el poder; el vapor y los obreros, la producción.', 'Pregunta si habla de gobierno o de fábricas.'),
    x('pista-tipo', 'Ata cada idea a quien la defendía o la vivía.', { doc: REVO, lineas: ['El gobierno nace del consentimiento.', 'Libertades individuales y propiedad.', 'Que la riqueza se reparta.', 'Un país fundado sin esclavos.'],
      ...T(['colonias de América del Norte', 0, '¿Quién explicó para qué existen los gobiernos?'], ['liberalismo', 1, '¿Cuál defiende al individuo?'], ['socialismo', 2, '¿Cuál defiende repartir?'], ['revolución haitiana', 3, '¿Quiénes eran antes esclavizados?']), bien: 'Cada idea, su origen.' },
      'Consentimiento en Norteamérica, libertades en el liberalismo, reparto en el socialismo y Haití sin esclavos.', 'Relee los párrafos 2, 4 y 6: ahí está cada idea.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REVO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las colonias se independizaron en 1776.', 0, 'Léela junto al párrafo 2.'], ['Haití asustó a los dueños de esclavos.', 1, '¿Por qué no lo olvidaron un solo día?'], ['La declaración prometía más de lo que cumplió.', 1, '¿A quiénes dejaba por fuera?'], ['Haití le declaró la guerra a Inglaterra.', 2, '¿El texto las une?']),
      luz: [[2, 'En 1776'], [4, 'no lo olvidaron'], [2, 'no incluía']], bien: 'No olvidar puede ser temer.' },
      'El año está escrito; el temor y la promesa incumplida se deducen; la guerra no aparece.', 'Piensa por qué a alguien le importaría tanto Haití.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REVO, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'El voto se amplió poco a poco.',
      ...T(['En Francia todos pagaban impuestos por igual.', 1, 'Busca quiénes casi no pagaban.'], ['En las fábricas no había niños.', 6, 'Busca quiénes llenaron las ciudades.'], ['La democracia llegó completa con las revoluciones.', [10, 11], 'Busca qué dejaron las revoluciones.']), bien: 'Casi no, entre ellos, pelea abierta.' },
      'El clero y la nobleza casi no pagaban, había niños y la democracia quedó como pelea abierta.', 'Saca la palabra clave: impuestos, niños, completa.'),
    x('balanza-tesis', 'Tesis: «la Revolución francesa tuvo causas económicas». ¿Qué hace cada dato?', { doc: REVO, tesis: 'Tuvo causas económicas',
      ...F(['Las cuentas estaban en quiebra.', 0, '¿Habla de dinero?'], ['El pan estaba cada vez más caro.', 0, '¿Habla de dinero?'], ['Ese año la cosecha fue abundante y barata.', 1, 'Si fuera cierto, ¿quedaría la causa del pan?'], ['El rey usaba peluca.', 2, '¿Cambia la economía?']), bien: 'Quiebra y pan.' },
      'La quiebra y el pan la apoyan; una cosecha barata la debilitaría; la peluca no pesa.', 'Pregunta si el dato tiene que ver con precios o cuentas.'),
    x('bisagras', 'Pon en cada hueco la palabra que une. Sobran dos.', { doc: REVO, pares: [['La palabra era «todos»,', 'muchos quedaban por fuera.'], ['Las jornadas eran larguísimas;', 'nacieron los sindicatos.'], ['El pueblo protestó', 'el pan era muy caro.']],
      ...F(['pero', 0, 'Contrasta: ¿dónde lo segundo no es lo prometido?'], ['por eso', 1, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['porque', 2, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['es decir,', null, 'Repetiría lo mismo: ninguna pareja repite.'], ['para que', null, 'Anunciaría un propósito: aquí nadie lo busca.']), bien: 'Contraste, resultado y causa.' },
      'La promesa contrasta, las jornadas traen sindicatos y el pan explica la protesta.', 'Di qué hace la segunda idea con la primera.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REVO, lineas: ['Hubo revoluciones políticas y una de la producción.', 'Las colonias eran trece.', 'Proclamaron derechos que no alcanzaban a todos.', 'Haití fundó un país sin esclavos.', 'Los Derechos se proclamaron en agosto.', 'El voto y las leyes laborales llegaron por luchas.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es la tensión central.', 3: 'Es el caso más radical.', 5: 'Es el cierre.' }), bien: 'Dos clases, límites, Haití y luchas.' },
      'El número y el mes son detalles; lo demás es el hilo.', 'Deja lo que explica qué cambió y para quién.'),
  ]);

  const GUERRA = {
    id: 'icf-guerras', title: 'Treinta años de guerra y cuarenta de miedo',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'A comienzos del siglo XX las potencias europeas competían por colonias, mercados y prestigio, y se habían repartido en dos alianzas. El 28 de junio de 1914 un nacionalista mató en Sarajevo al heredero de Austria-Hungría. En pocas semanas, por el juego de las alianzas, media Europa estaba en guerra. El disparo fue la chispa; la pólvora llevaba años guardada.',
      'La Primera Guerra Mundial duró hasta 1918 y dejó alrededor de diez millones de soldados muertos. En plena guerra, en 1917, una revolución llevó al poder en Rusia a los bolcheviques, que se proponían construir el socialismo. El Tratado de Versalles, en 1919, culpó a Alemania y le impuso pagos enormes. Muchos alemanes lo vivieron como una humillación.',
      'En 1929 quebró la bolsa de Nueva York y la crisis se regó por el mundo. Sin trabajo y con miedo, mucha gente escuchó a quienes ofrecían orden y culpables. En Italia ya gobernaba el fascismo; en 1933 Hitler llegó al poder en Alemania por vías legales y acabó con la democracia. El nazismo convirtió el racismo en política de Estado.',
      'La Segunda Guerra Mundial comenzó en 1939 con la invasión de Polonia. Murieron entre sesenta y ochenta millones de personas, la mayoría civiles. En el Holocausto, el régimen nazi asesinó a unos seis millones de judíos, y también a gitanos, personas con discapacidad, opositores y otros grupos. La guerra terminó en 1945, después de que Estados Unidos lanzara bombas atómicas sobre Hiroshima y Nagasaki.',
      'Ese mismo año se fundó la Organización de las Naciones Unidas y, en 1948, se proclamó la Declaración Universal de los Derechos Humanos. Pero los vencedores se separaron. Estados Unidos, capitalista, y la Unión Soviética, comunista, armaron bloques rivales. Como las dos tenían bombas capaces de destruirlo todo, no se atacaron de frente: fue una guerra «fría».',
      'Fría para ellas. En Corea, Vietnam, Angola o Centroamérica, los bloques apoyaron a bandos distintos y la guerra fue muy caliente. En América Latina, el miedo al comunismo sirvió para justificar golpes militares. El Muro de Berlín, levantado en 1961 para que nadie se fuera del lado oriental, cayó en 1989; dos años después dejó de existir la Unión Soviética.',
    ],
  };
  const l2 = leccion('icf-sc-mundo-2', 'Guerras y Guerra Fría', guion(
    ['1914', 'Alianzas, colonias y nacionalismo: un disparo fue la chispa.'],
    ['Entre guerras', 'Versalles, la crisis del 29, fascismo y nazismo.'],
    ['1939–1945', 'La mayoría de las víctimas, civiles; el Holocausto; las bombas atómicas.'],
    ['Guerra Fría', 'Dos bloques que no se atacan de frente y pelean en otros países.']), [
    x('pasos-del-proceso', 'Ordena los hechos. El primero está en su puesto.', { doc: GUERRA, que: 'los hechos', de: 'De Sarajevo al Muro', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Atentado de Sarajevo.', 'Tratado de Versalles.', 'Crisis de la bolsa.', 'Invasión de Polonia.', 'Cae el Muro de Berlín.'], mira: ['', 'Se firma un año después de la guerra.', 'Ocurre en 1929.', 'Empieza la segunda guerra.', 'Ocurre en 1989.'], bien: '1914, 1919, 1929, 1939 y 1989.' },
      'Sarajevo 1914, Versalles 1919, crisis 1929, Polonia 1939 y el Muro 1989.', 'Busca el año de cada uno y ponlos en fila.'),
    x('genero-o-cita', 'De la Primera Guerra, ¿es **causa de fondo** o **detonante**?', { doc: GUERRA, rot: ['de fondo', 'detonante'],
      ...F(['La competencia por colonias', 0, '¿Venía de años?'], ['El atentado de Sarajevo', 1, '¿Fue lo que disparó todo?'], ['Las dos alianzas', 0, '¿Venía de años?'], ['El afán de prestigio de las potencias', 0, '¿Venía de años?']), bien: 'La pólvora y la chispa.' },
      'Colonias, alianzas y prestigio venían de años; el atentado la disparó.', 'Pregunta si ocurrió ese día o se venía guardando.'),
    x('pista-tipo', 'Ata cada hecho a su consecuencia en el texto.', { doc: GUERRA, lineas: ['El Tratado de Versalles', 'La crisis de 1929', 'La Segunda Guerra', 'El miedo al comunismo'],
      ...T(['humillación en Alemania', 0, '¿Cuál le impuso pagos?'], ['gente que busca orden y culpables', 1, '¿Cuál dejó sin trabajo?'], ['fundación de la ONU', 2, '¿Cuál terminó en 1945?'], ['golpes militares justificados', 3, '¿Cuál se usó en América Latina?']), bien: 'Cada hecho, su efecto.' },
      'Versalles humilló, la crisis dio miedo, la guerra llevó a la ONU y el miedo justificó golpes.', 'Busca qué cuenta el texto justo después de cada hecho.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: GUERRA, nums: [3, 4, 6], pregunta: 'Queda en pie', queda: 'La Guerra Fría fue violenta en varios países.',
      ...T(['Hitler llegó al poder con un golpe militar.', 2, 'Busca por qué vías llegó.'], ['La mayoría de los muertos fueron soldados.', 5, 'Busca quiénes fueron la mayoría.'], ['El Muro se hizo para que no entraran extranjeros.', 11, 'Busca para qué se levantó.']), bien: 'Legales, civiles y salir.' },
      'Llegó por vías legales, la mayoría fueron civiles y el Muro evitaba que se fueran.', 'Saca la palabra clave: Hitler, muertos, Muro.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GUERRA, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Declaración Universal es de 1948.', 0, 'Léela junto al párrafo 5.'], ['Las armas atómicas no impidieron otras guerras.', 1, '¿Dónde fue caliente la guerra?'], ['Los derechos humanos fueron en parte una respuesta a la guerra.', 1, '¿Qué había pasado justo antes?'], ['La ONU fue idea de Rusia.', 2, '¿Se dice de quién fue la idea?']),
      luz: [[5, 'en 1948'], [6, 'muy caliente'], [5, 'Ese mismo año']], bien: 'El orden de los hechos ayuda a deducir.' },
      'El año está escrito; las otras guerras y la respuesta al horror se deducen; el autor de la idea no.', 'Une lo que pasó antes con lo que pasó después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: GUERRA, filas: [{ antes: 'La Guerra Fría fue «fría»', topes: ['en todo el mundo', 'en ninguna parte', 'entre las dos potencias'], va: 2 }, { antes: 'El Holocausto asesinó a', topes: ['solo judíos', 'judíos y también otros grupos', 'solo opositores'], va: 1 }, { antes: 'La Unión Soviética dejó de existir', topes: ['en 1991', 'en 1989', 'en 1961'], va: 0 }], mira: ['Relee dónde fue caliente.', 'Relee a quiénes asesinó.', 'Suma dos años a la caída del Muro.'], luz: [[6, 'Fría para ellas'], [4, 'y también a gitanos'], [6, 'dos años después']], bien: 'Ellas, varios y 1991.' },
      'Fría entre potencias, víctimas de varios grupos y fin en 1991.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Tesis: «la crisis económica ayudó al ascenso del nazismo». ¿Qué hace cada dato?', { doc: GUERRA, tesis: 'La crisis ayudó al nazismo',
      ...F(['El voto nazi creció cuando creció el desempleo.', 0, '¿Crecieron a la vez?'], ['El voto nazi ya era mayoría antes de la crisis.', 1, 'Si fuera cierto, ¿habría ayudado la crisis?'], ['Hitler había nacido en Austria.', 2, '¿Habla de la crisis?']), bien: 'El orden en el tiempo importa.' },
      'Crecer con el desempleo la apoya; ser mayoría antes la debilitaría; el lugar de nacimiento no pesa.', 'Pregunta qué ocurrió primero y qué vino después.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: GUERRA, lineas: ['Las alianzas convirtieron un atentado en guerra mundial.', 'El atentado fue en junio.', 'Versalles y la crisis abonaron el nazismo.', 'La segunda guerra mató sobre todo a civiles.', 'La bolsa estaba en Nueva York.', 'Dos bloques se enfrentaron sin atacarse de frente.'], ...S([4, 1], { 0: 'Es el comienzo.', 2: 'Es el puente entre guerras.', 3: 'Es el centro del texto.', 5: 'Es la Guerra Fría.' }), bien: 'Alianzas, nazismo, civiles y bloques.' },
      'El mes y la ciudad son detalles; lo demás une los hechos.', 'Deja lo que explica por qué pasó lo siguiente.'),
  ]);

  const LIBRES = {
    id: 'icf-descolonizacion', title: 'Los que no esperaron permiso',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'En 1945, cerca de un tercio de la población del mundo vivía en territorios gobernados por otro país. Treinta años después, casi todas esas colonias eran Estados independientes. A ese proceso se le llama descolonización. Las potencias europeas habían quedado debilitadas por la guerra, pero eso no basta para explicarlo: había, sobre todo, millones de personas que no pensaban seguir esperando.',
      'La India mostró un camino. Mohandas Gandhi propuso la desobediencia civil no violenta: no pagar impuestos injustos, no comprar telas inglesas, caminar cientos de kilómetros para fabricar sal, cosa que estaba prohibida. En 1947 se logró la independencia. El país nació partido en dos, la India, de mayoría hindú, y Pakistán, de mayoría musulmana; en la partición murieron cientos de miles de personas.',
      'Otros caminos fueron armados. Argelia peleó casi ocho años contra Francia, hasta 1962. En muchos lugares de África, las fronteras que heredaron los nuevos países habían sido trazadas en Europa, con regla, sin preguntar quién vivía a cada lado. Parte de las guerras que vinieron después nació en esas rayas.',
      'En Sudáfrica el problema era otro: una minoría blanca gobernaba el país y, desde 1948, había convertido la segregación en ley. El apartheid decía dónde podía vivir, estudiar o sentarse cada persona según su color. Nelson Mandela pasó veintisiete años preso. En 1994, en las primeras elecciones en que todos pudieron votar, fue elegido presidente.',
      'También dentro de países independientes hubo quienes exigieron que la palabra «todos» se cumpliera. En 1955, en Estados Unidos, Rosa Parks se negó a ceder su puesto en un bus; el boicot que siguió dio a conocer a Martin Luther King. En 1964 y 1965 se aprobaron leyes contra la segregación y a favor del voto. Las mujeres, los estudiantes, los pueblos indígenas y, más tarde, las personas LGBT organizaron sus propios movimientos.',
      'Un movimiento social no es un partido ni un ejército: es gente que se organiza, fuera de las instituciones, para cambiar algo que considera injusto. Sus herramientas son la marcha, el boicot, la huelga, el arte, la ley. Casi nunca gana todo lo que pide. Pero, cuando gana algo, lo que antes parecía imposible empieza a parecer de sentido común.',
    ],
  };
  const l3 = leccion('icf-sc-mundo-3', 'Descolonización y movimientos sociales', guion(
    ['Descolonización', 'En treinta años casi todas las colonias fueron Estados.'],
    ['Dos caminos', 'La no violencia de la India y la guerra de Argelia.'],
    ['Fronteras y apartheid', 'Rayas trazadas en Europa y segregación hecha ley.'],
    ['Movimientos sociales', 'Gente organizada, fuera de las instituciones, para cambiar algo injusto.']), [
    x('pinta-tipos', 'Pinta cada hecho con su lugar.', { doc: LIBRES, plumas: ['India', 'Sudáfrica', 'Estados Unidos'],
      ...P(['Caminar para fabricar sal.', 0, 'Busca quién propuso la no violencia.'], ['Apartheid desde 1948.', 1, 'Busca dónde la segregación fue ley así.'], ['Rosa Parks no cede su puesto.', 2, 'Busca el boicot del bus.'], ['No comprar telas inglesas.', 0, 'Busca quién propuso la no violencia.'], ['Mandela, presidente en 1994.', 1, 'Busca las primeras elecciones de todos.']), bien: 'Sal, apartheid y bus.' },
      'La sal y las telas son de la India; apartheid y Mandela, de Sudáfrica; Parks, de Estados Unidos.', 'Busca el nombre propio que aparece en cada párrafo.'),
    x('genero-o-cita', '¿Es una acción **no violenta** o **armada**?', { doc: LIBRES, rot: ['no violenta', 'armada'],
      ...F(['Boicot a los buses', 0, '¿Se usan armas ahí?'], ['La guerra de Argelia', 1, '¿Se usan armas ahí?'], ['No pagar impuestos injustos', 0, '¿Se usan armas ahí?'], ['Negarse a ceder un puesto', 0, '¿Se usan armas ahí?']), bien: 'Desobedecer también es luchar.' },
      'Boicot, impuestos y el puesto son desobediencia; Argelia fue una guerra.', 'Pregunta si alguien usa la fuerza contra otros.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: LIBRES,
      ...F(['define la descolonización', 0, 'Busca «se le llama».'], ['un camino sin violencia y su costo', 1, 'Busca a Gandhi.'], ['caminos armados y fronteras', 2, 'Busca la regla.'], ['segregación hecha ley', 3, 'Busca el apartheid.'], ['luchas dentro de países independientes', 4, 'Busca el bus.'], ['define movimiento social', 5, 'Busca «no es un partido».'], ['la vida de un rey', null, 'No aparece ningún rey.']),
      luz: [[1, 'se le llama descolonización'], [2, 'no violenta'], [3, 'con regla'], [4, 'El apartheid'], [5, 'Rosa Parks'], [6, 'Un movimiento social']], bien: 'Definir, dos caminos, apartheid, luchas y definir.' },
      'Abre con una definición, recorre casos y cierra con otra definición.', 'Mira de qué caso o idea habla cada párrafo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: LIBRES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La India se independizó en 1947.', 0, 'Léela junto al párrafo 2.'], ['Una independencia sin guerra puede traer violencia.', 1, '¿Qué pasó en la partición?'], ['Algunas fronteras separaron a un mismo pueblo.', 1, '¿A quién no se le preguntó?'], ['Francia ganó la guerra de Argelia.', 2, '¿Hasta cuándo peleó Argelia y qué logró?']),
      luz: [[2, 'En 1947'], [2, 'en la partición'], [3, 'sin preguntar']], bien: 'Una raya puede partir un pueblo.' },
      'El año está escrito; la violencia de la partición y los pueblos divididos se deducen; que ganara Francia no.', 'Une lo que hicieron con lo que pasó después.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: LIBRES, frases: [[2, 'propuso la ', 'desobediencia civil', ' no violenta'], [4, 'había convertido la ', 'segregación', ' en ley'], [5, 'el ', 'boicot', ' que siguió']],
      ...F(['negativa a cumplir normas injustas', 0, '¿Qué hacían con los impuestos y la sal?'], ['separación por el color', 1, '¿Qué decidía dónde vivir o sentarse?'], ['acuerdo de no usar el servicio', 2, '¿Qué hizo la gente con los buses?'], ['unión de todos', null, 'Es lo contrario de una de ellas.'], ['desfile militar', null, 'Aquí no hay ejércitos.']), bien: 'Palabras de la ciudadanía.' },
      'Desobedecer es no cumplir lo injusto, segregar es separar y boicotear es dejar de usar.', 'Mira los ejemplos que da el texto alrededor.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 1 la oración que dice que **una causa no basta**.', { doc: LIBRES, nums: [1], apuesta: 'Europa débil no explica todo.', ...S(['1.3'], { '1.0': 'Da la situación del comienzo.', '1.1': 'Da la situación treinta años después.', '1.2': 'Le pone nombre al proceso.' }), bien: '«Pero eso no basta» suma otra causa.' },
      'La última oración reconoce la debilidad de Europa y dice que no basta para explicarlo.', 'Busca la oración que reconoce una causa y agrega otra.'),
    x('balanza-tesis', 'Tesis: «un movimiento social puede cambiar las leyes». ¿Qué hace cada dato?', { doc: LIBRES, tesis: 'Un movimiento social puede cambiar las leyes',
      ...F(['Después del boicot y las marchas se aprobaron leyes.', 0, '¿Hubo un cambio legal?'], ['Las leyes ya estaban aprobadas antes de las marchas.', 1, 'Si fuera cierto, ¿habrían cambiado por ellas?'], ['El bus era amarillo.', 2, '¿Habla de leyes?']), bien: 'El orden de los hechos decide.' },
      'Leyes después de las marchas la apoyan; si fueran de antes, la debilitarían; el color no pesa.', 'Mira en cada dato qué pasó primero: ¿las marchas o las leyes?'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: LIBRES, lineas: ['En treinta años casi todas las colonias se independizaron.', 'Fabricar sal estaba prohibido.', 'Hubo caminos pacíficos y armados, con costos.', 'Se luchó también contra la segregación.', 'Mandela estuvo veintisiete años preso.', 'Los movimientos cambian lo que parece posible.'], ...S([1, 4], { 0: 'Es el proceso.', 2: 'Son los caminos.', 3: 'Es la otra lucha.', 5: 'Es la conclusión.' }), bien: 'Proceso, caminos, segregación y conclusión.' },
      'La sal y los años de cárcel son detalles; lo demás es el hilo.', 'Deja lo que explica el proceso, no un solo caso.'),
  ]);

  const SOPA = {
    id: 'icf-carta-berlin', title: 'La mesa de los abuelos',
    paras: [
      'En una residencia para mayores de una ciudad europea, cuatro personas comparten la mesa del almuerzo. La directora les pidió que contaran, para un libro, qué día cambió su vida. Estas son sus respuestas.',
      'Greta, de noventa y un años, habló de su padre. «En 1932 era obrero y se quedó sin trabajo. Tenía hambre y vergüenza. Un partido le ofreció un plato de sopa, un uniforme y alguien a quien culpar. Nunca le perdoné el uniforme. La sopa, sí. Cuando oigo hoy que todo se arreglaría si se fueran los de afuera, vuelvo a oler esa sopa».',
      'Samuel, de ochenta y ocho, nació en una colonia africana. «El mapa de mi país lo dibujaron en una oficina, a cinco mil kilómetros. La raya pasaba por el patio de mi abuela: la cocina quedó de un lado y la letrina del otro. En 1960 nos dieron bandera. La raya la dejaron. He vivido dos guerras y en las dos se peleaba por el patio de mi abuela».',
      'Irina, de ochenta y cuatro, vivía en Berlín oriental. «Una mañana de agosto de 1961 amaneció el alambre. Mi novio trabajaba al otro lado. Nos hacíamos señas desde una ventana con un espejo. Cuando cayó el muro, veintiocho años después, fui a buscarlo. Tenía nietos. Me mostró un cajón: adentro estaba el espejo».',
      'Marie, de ochenta y seis, nació en Haití. «En la escuela, el primer día, nos hacían decir una fecha: 1804. Mi abuela contaba que una mujer de la familia cortó caña encadenada y murió siendo dueña de un pedazo de tierra y de su nombre. También contaba que la libertad nos la cobraron: Francia exigió una fortuna por perder a sus esclavos y el país pagó durante más de un siglo».',
      'La directora publicó las cuatro historias sin cambiar una palabra. En el prólogo escribió: «Los libros de historia cuentan que hubo una revolución, una crisis, un reparto y un muro. Aquí se ve qué se siente cuando la historia entra a la casa sin tocar la puerta».',
      'Un lector le escribió para quejarse: cuatro recuerdos, dijo, no son pruebas de nada. Ella le contestó que tenía razón: no prueban lo que pasó en el mundo. Prueban que pasó en alguien, y que todavía duele cuando se sirve la sopa.',
    ],
  };
  const Q = preg(SOPA, 'sociales');
  return mundo('icf-sc-mundo', 'Historia del Mundo', 'sociales', [l1, l2, l3], [
    ['icf-sc-mundo-1', 'Haití: la revolución de los esclavizados, en 1804.', Q('La fecha que Marie repetía en la escuela recuerda:', ['La caída de Napoleón', 'La fundación de un país por quienes habían sido esclavizados', 'La llegada de los españoles', 'El fin de la Guerra Fría'], 1, 'En 1804 nació Haití, fundado por personas que habían sido esclavizadas.', 'Recuerda qué pasó en Haití ese año.')],
    ['icf-sc-mundo-1', 'La palabra «libertad» y su costo.', Q('«La libertad nos la cobraron» muestra una contradicción con los ideales de 1789 porque:', ['Francia proclamó la libertad y exigió dinero por la de otros', 'Haití no quería ser libre', 'Los ideales eran solo económicos', 'Haití era más rico que Francia'], 0, 'El país que proclamó los Derechos del Hombre cobró por perder a sus esclavos.', 'Une lo que Francia proclamó con lo que exigió.')],
    ['icf-sc-mundo-2', 'Las condiciones económicas influyen en la política.', Q('La historia del padre de Greta ayuda a entender por qué algunas personas apoyaron un régimen autoritario:', ['Por amor a la democracia', 'Por el desempleo, el hambre y un culpable que les ofrecieron', 'Porque odiaban la sopa', 'Por orden de un juez'], 1, 'Sin trabajo y con vergüenza, le ofrecieron comida, uniforme y alguien a quien culpar.', 'Mira qué le faltaba y qué le ofrecieron.')],
    ['icf-sc-mundo-2', 'Culpar a un grupo simplifica un problema.', Q('Cuando Greta dice «vuelvo a oler esa sopa», advierte que:', ['La comida de hoy es mala', 'Extraña a su padre', 'El discurso que culpa a los de afuera se parece al de entonces', 'Le gusta cocinar'], 2, 'Compara el discurso actual con el que sedujo a su padre.', 'Lee la frase que va justo antes de la sopa.')],
    ['icf-sc-mundo-2', 'El Muro dividió Berlín desde 1961 hasta 1989.', Q('El relato de Irina ilustra una consecuencia de la Guerra Fría:', ['La división de familias y personas por la separación en bloques', 'El reparto de África', 'La crisis de la bolsa', 'La Revolución Industrial'], 0, 'El muro separó a quienes vivían a cada lado.', 'Piensa qué separó a Irina de su novio.')],
    ['icf-sc-mundo-2', 'Un testimonio prueba lo vivido, no lo general.', Q('La respuesta de la directora al lector reconoce que los testimonios:', ['Son falsos', 'Sirven para conocer cómo se vivió, no para probar lo general', 'Reemplazan los libros de historia', 'No sirven para nada'], 1, 'No prueban lo que pasó en el mundo; prueban que pasó en alguien.', 'Compara lo que dice que no prueban y lo que sí.')],
    ['icf-sc-mundo-3', 'Muchas fronteras africanas se trazaron en Europa.', Q('La imagen de la raya en el patio de la abuela muestra que:', ['La casa era muy grande', 'La abuela construyó mal', 'Las fronteras coloniales ignoraron a quienes vivían allí', 'El mapa era pequeño'], 2, 'El mapa se dibujó lejos, sin tener en cuenta a la gente.', 'Mira dónde dibujaron el mapa.')],
    ['icf-sc-mundo-3', 'La independencia no siempre cambió las fronteras.', Q('La frase «nos dieron bandera. La raya la dejaron» sugiere que la independencia:', ['No ocurrió', 'Resolvió todos los problemas', 'Fue pagada con dinero', 'Dejó sin resolver problemas heredados de la Colonia'], 3, 'Hubo país nuevo, pero con la frontera que causó guerras.', 'Compara lo que cambió con lo que quedó igual.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-geografia.js
// Preicfes · Sociales y Ciudadanas · mundo 8 «Territorio y Ambiente» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REGIONES = {
    id: 'icf-regiones', title: 'Un país en seis pedazos que se tocan',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Febrero de 2026' },
    paras: [
      'Colombia suele dividirse en seis regiones naturales: Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular. La división mira el relieve, el clima y la vegetación. No es una reja: hay municipios con un pie en cada lado, y la gente, los ríos y las mercancías las cruzan todos los días.',
      'La cordillera de los Andes entra por el sur y se abre en tres ramales. Por eso, cerca de la línea del ecuador, el clima depende sobre todo de la altura: cada mil metros que se suben, la temperatura baja unos seis grados. En un viaje de dos horas se pasa del plátano al frailejón. En la Andina vive la mayor parte de la población, aunque ocupa cerca de la cuarta parte del territorio.',
      'La Amazonía y la Orinoquía, juntas, son más de la mitad del país y tienen menos de una décima parte de sus habitantes. El Pacífico es uno de los lugares más lluviosos del mundo; La Guajira, en el Caribe, es casi un desierto. La densidad de población, que es el número de habitantes por kilómetro cuadrado, cambia muchísimo de un lugar a otro.',
      'Un mapa no muestra todo: escoge. El mapa político muestra límites; el físico, montañas y ríos; el temático, un solo asunto, como las lluvias o el desempleo. La escala dice cuánto se redujo la realidad. En un mapa 1 : 1 000 000, un centímetro son diez kilómetros. Con una escala más grande, por ejemplo 1 : 10 000, cabe menos territorio y se ven más detalles.',
      'La población también se mueve. A mediados del siglo XX, la mayoría de los colombianos vivía en el campo; hoy, unas tres de cada cuatro personas viven en ciudades. Unos migraron buscando trabajo o estudio; muchos otros huyeron de la violencia. Las ciudades crecieron rápido y sin plan, y en sus bordes surgieron barrios levantados por sus propios habitantes.',
      'Además, la población envejece. Las familias tienen menos hijos y la gente vive más años. En las pirámides de población, la base se encoge y la parte alta se ensancha. Eso obliga a pensar en más cuidados y pensiones, y en menos salones de primaria. Un dibujo de barras puede anunciar, con veinte años de ventaja, lo que una sociedad va a necesitar.',
    ],
  };
  const l1 = leccion('icf-sc-geografia-1', 'Regiones, mapas y población', guion(
    ['Seis regiones', 'Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular.'],
    ['Altura y clima', 'Cerca del ecuador, la temperatura depende de la altura.'],
    ['Mapas', 'Político, físico, temático; y la escala.'],
    ['Población', 'Densidad, migración del campo a la ciudad y envejecimiento.']), [
    x('pinta-tipos', 'Pinta cada dato con su región.', { doc: REGIONES, plumas: ['Andina', 'Caribe', 'Pacífica'],
      ...P(['Vive la mayor parte de la población.', 0, 'Busca qué región concentra la gente.'], ['Tiene un lugar casi desértico.', 1, 'Busca dónde está La Guajira.'], ['Es de los lugares más lluviosos.', 2, 'Busca el que casi siempre se moja.'], ['La cruzan tres ramales de cordillera.', 0, 'Busca dónde se abren los Andes.']), bien: 'Gente, desierto y lluvia.' },
      'La Andina concentra gente y cordilleras, el Caribe tiene La Guajira y el Pacífico, la lluvia.', 'Busca el nombre de la región junto a cada dato.'),
    x('pista-tipo', 'Ata cada necesidad al mapa que la resuelve.', { doc: REGIONES, lineas: ['mapa político', 'mapa físico', 'mapa temático', 'mapa a escala 1 : 10 000'],
      ...T(['ver los límites de un departamento', 0, '¿Cuál muestra límites?'], ['ver montañas y ríos', 1, '¿Cuál muestra el relieve?'], ['ver dónde llueve más', 2, '¿Cuál muestra un solo asunto?'], ['ver las calles de un barrio', 3, '¿Cuál deja ver más detalles?']), bien: 'Cada mapa escoge.' },
      'Límites en el político, relieve en el físico, lluvias en el temático y detalle en la escala grande.', 'Piensa qué elige mostrar cada uno de esos mapas.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: REGIONES, filas: [{ antes: 'Al subir mil metros, la temperatura', topes: ['sube seis grados', 'no cambia', 'baja unos seis grados'], va: 2 }, { antes: 'En 1 : 1 000 000, un centímetro son', topes: ['un kilómetro', 'diez kilómetros', 'mil kilómetros'], va: 1 }, { antes: 'Hoy viven en ciudades', topes: ['tres de cada cuatro', 'uno de cada cuatro', 'todos'], va: 0 }], mira: ['Relee lo que pasa con la altura.', 'Relee el ejemplo de la escala.', 'Relee cómo se movió la población.'], luz: [[2, 'baja unos seis grados'], [4, 'diez kilómetros'], [5, 'tres de cada cuatro']], bien: 'Baja, diez y tres de cuatro.' },
      'Baja unos seis grados, un centímetro son diez kilómetros y tres de cada cuatro viven en ciudades.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REGIONES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Andina ocupa cerca de la cuarta parte del territorio.', 0, 'Léela junto al párrafo 2.'], ['La densidad de la Amazonía es baja.', 1, 'Compara su tamaño con sus habitantes.'], ['A 2 000 metros hace unos doce grados menos que al nivel del mar.', 1, 'Multiplica lo que baja por cada mil metros.'], ['En la Amazonía no hay ciudades.', 2, '¿Tener poca gente es no tener ciudades?']),
      luz: [[2, 'la cuarta parte'], [3, 'menos de una décima parte'], [2, 'unos seis grados']], bien: 'Comparar y multiplicar.' },
      'La cuarta parte está escrita; la densidad y los doce grados se deducen; lo de las ciudades no.', 'Haz la comparación o la cuenta con los datos.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REGIONES, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'La población del país envejece.',
      ...T(['Las regiones son fronteras que nadie cruza.', 2, 'Busca qué dice que no es.'], ['Un buen mapa muestra todo.', 3, 'Busca qué hace un mapa.'], ['Las familias tienen cada vez más hijos.', [9, 10], 'Busca qué pasa con los hijos.']), bien: 'No es reja, escoge y menos hijos.' },
      'La división no es una reja, un mapa escoge y las familias tienen menos hijos.', 'Saca la palabra clave: fronteras, todo, hijos.'),
    x('genero-o-cita', '¿Es una migración **por decisión** o **forzada**?', { doc: REGIONES, rot: ['por decisión', 'forzada'],
      ...F(['Se fue a estudiar a Cali', 0, '¿Podía quedarse?'], ['Huyó de un grupo armado', 1, '¿Podía quedarse?'], ['Buscó un mejor empleo', 0, '¿Podía quedarse?'], ['Una amenaza la sacó de su finca', 1, '¿Podía quedarse?']), bien: 'Elegir o huir.' },
      'Estudio y empleo son decisiones; el grupo armado y la amenaza obligan.', 'Pregunta si la persona podía quedarse sin peligro.'),
    x('balanza-tesis', 'Idea: «esta ciudad necesitará más cuidado para mayores». ¿Qué hace cada dato?', { doc: REGIONES, tesis: 'Necesitará más cuidado para mayores',
      ...F(['La parte alta de su pirámide se ensancha.', 0, '¿Qué edades están arriba?'], ['Llegan miles de familias jóvenes con bebés.', 1, '¿Hacia qué edades crece?'], ['Su escudo tiene un cóndor.', 2, '¿Habla de edades?']), bien: 'La pirámide anuncia.' },
      'Ensancharse arriba la apoya; familias jóvenes la debilitan; el escudo no pesa.', 'Piensa qué edades de la población crecen con cada dato.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REGIONES, lineas: ['El país se divide en seis regiones que se cruzan.', 'El frailejón crece arriba.', 'La altura y la lluvia cambian mucho entre lugares.', 'Los mapas escogen qué mostrar.', 'Hay barrios en los bordes.', 'La población se concentra, se mueve y envejece.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es el contraste natural.', 3: 'Es la idea sobre los mapas.', 5: 'Es la idea sobre la población.' }), bien: 'Regiones, contrastes, mapas y población.' },
      'El frailejón y los bordes son detalles; lo demás resume.', 'Deja lo que sirve para explicar el país en general.'),
  ]);

  const PARAMO = {
    id: 'icf-paramo-agua', title: 'El agua que nace en la neblina',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Marzo de 2026' },
    paras: [
      'Los recursos naturales se dividen en renovables, como el agua, el bosque o el viento, que pueden recuperarse si se usan con medida, y no renovables, como el petróleo o el carbón, que tardan millones de años en formarse. Que algo sea renovable no quiere decir que sea infinito: un bosque talado más rápido de lo que crece se acaba igual.',
      'Los páramos son un buen ejemplo. Están por encima de los tres mil metros, más o menos, y casi la mitad de los que hay en el mundo está en Colombia. Sus plantas atrapan la neblina y sus suelos la guardan como una esponja. De allí viene buena parte del agua que toman las ciudades. Un frailejón crece alrededor de un centímetro al año: si se arranca uno de dos metros, se arrancan dos siglos.',
      'En los páramos también vive gente, muchas veces desde antes de que existieran las leyes que los protegen. Siembran papa, tienen vacas, abren caminos. Prohibirles todo de un día para otro los deja sin sustento; permitirles todo seca el agua de millones. Por eso la ley habla de reconversión: ayudarlos a cambiar, poco a poco, a actividades que no dañen el suelo.',
      'El desarrollo sostenible busca satisfacer las necesidades de hoy sin quitarles a las generaciones futuras la posibilidad de satisfacer las suyas. Tiene tres patas: la económica, la social y la ambiental. Si una falla, la mesa se cae. Una mina que da empleo y envenena un río cojea; una reserva que protege un río y expulsa a sus habitantes, también.',
      'El cambio climático lo complica todo. La quema de combustibles y la tala aumentan los gases que retienen calor en la atmósfera. Colombia emite una parte pequeña del total mundial, pero es muy vulnerable: hay glaciares que se derriten, costas que se inundan, sequías y lluvias más fuertes. En el país, la mayor fuente de esas emisiones no son las fábricas: es la deforestación y el uso de la tierra.',
      'Las decisiones sobre el territorio nunca son solo técnicas. Alguien gana y alguien pierde, y no siempre quien pierde está sentado a la mesa. La consulta previa, las audiencias públicas y los planes de ordenamiento existen para que se oiga a los que viven allí. Un mapa con todos los recursos marcados y ninguna casa dibujada es un mapa peligroso.',
    ],
  };
  const l2 = leccion('icf-sc-geografia-2', 'Recursos, ambiente y desarrollo', guion(
    ['Renovables y no', 'Renovable no es infinito: depende de la velocidad a la que se use.'],
    ['Páramos', 'Fábricas de agua donde también vive gente.'],
    ['Sostenible', 'Tres patas: económica, social y ambiental.'],
    ['Clima y decisiones', 'Emitimos poco, somos vulnerables y la deforestación pesa mucho.']), [
    x('genero-o-cita', '¿Es un recurso **renovable** o **no renovable**?', { doc: PARAMO, rot: ['renovable', 'no renovable'],
      ...F(['El viento', 0, '¿Se recupera pronto?'], ['El carbón', 1, '¿Se recupera pronto?'], ['Un bosque', 0, '¿Se recupera pronto?'], ['El petróleo', 1, '¿Se recupera pronto?'], ['El agua', 0, '¿Se recupera pronto?']), bien: 'Años o millones de años.' },
      'Viento, bosque y agua se recuperan; carbón y petróleo tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('pinta-tipos', 'Pinta cada efecto con la pata del desarrollo que toca.', { doc: PARAMO, plumas: ['económica', 'social', 'ambiental'],
      ...P(['Se crean empleos.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se envenena un río.', 2, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se expulsa a una comunidad.', 1, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Aumentan las ventas.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se recupera el suelo.', 2, '¿Habla de dinero, de la gente o de la naturaleza?']), bien: 'Dinero, gente y naturaleza.' },
      'Empleos y ventas son económicos; la comunidad, social; río y suelo, ambientales.', 'Di quién o qué gana o pierde con cada efecto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PARAMO, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'El páramo se puede proteger sin expulsar a su gente.',
      ...T(['Lo renovable nunca se acaba.', 1, 'Busca qué pasa si se usa muy rápido.'], ['En los páramos no vive nadie.', 2, 'Busca quién vive allí.'], ['Lo que más emite el país son las fábricas.', 9, 'Busca la mayor fuente.']), bien: 'Se acaba, vive gente y deforestación.' },
      'Un bosque talado muy rápido se acaba, en los páramos vive gente y la mayor fuente es la deforestación.', 'Saca la palabra clave: nunca, nadie, fábricas.'),
    x('voz-de-la-fuente', 'Ata cada preocupación a quien la tendría.', { ayuda: 'Tira un hilo desde cada preocupación hasta quien la tendría.', doc: PARAMO, portadas: [['Campesina del páramo', 'actor'], ['Acueducto de la ciudad', 'actor'], ['Empresa minera', 'actor'], ['Comunidad consultada', 'actor']],
      ...T(['perder su siembra de papa', 0, '¿Quién vive de la tierra?'], ['que disminuya el agua', 1, '¿Quién la lleva a las casas?'], ['no poder extraer', 2, '¿Quién busca minerales?'], ['que no se oiga su voz', 3, '¿Para quién existe la consulta?']), bien: 'Cada actor, su interés.' },
      'La campesina teme por su siembra, el acueducto por el agua, la empresa por extraer y la comunidad por ser oída.', 'Piensa qué perdería cada uno si se decide sin él.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: PARAMO, frases: [[3, 'la ley habla de ', 'reconversión', ''], [5, 'es muy ', 'vulnerable', ''], [4, 'envenena un río ', 'cojea', '']],
      ...F(['cambio gradual de actividad', 0, '¿Qué busca la ley con los campesinos?'], ['fácil de afectar', 1, '¿Qué le pasa al país con el clima?'], ['está incompleta', 2, '¿Qué le falta a esa mesa?'], ['expulsión', null, 'Es lo contrario de lo que busca la ley.'], ['muy fuerte', null, 'Es lo contrario de lo que le pasa.']), bien: 'El contexto las explica.' },
      'Reconversión es cambiar poco a poco, vulnerable es fácil de afectar y cojear es estar incompleta.', 'Lee el ejemplo que da el texto alrededor.'),
    x('balanza-tesis', 'Propuesta: «prohibir toda siembra en el páramo desde mañana». ¿Qué hace cada dato?', { doc: PARAMO, tesis: 'Prohibir toda siembra desde mañana',
      ...F(['El ganado y la siembra secan el suelo que guarda agua.', 0, '¿Es una razón a favor?'], ['Trescientas familias viven solo de esa siembra.', 1, '¿A quién deja sin sustento?'], ['Donde se ayudó a cambiar, el agua se recuperó sin expulsar a nadie.', 1, '¿Hacía falta prohibir de golpe?'], ['Las papas son amarillas.', 2, '¿Cambia la decisión?']), bien: 'Proteger sí, ¿de golpe?' },
      'El suelo la apoya; las familias y el cambio gradual la debilitan; el color no pesa.', 'Pregunta si el dato hace más o menos conveniente prohibir ya.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que **define** el desarrollo sostenible.', { doc: PARAMO, nums: [4], apuesta: 'Hoy sí, sin quitarle a mañana.', ...S(['4.0'], { '4.1': 'Dice cuáles son sus partes.', '4.2': 'Dice qué pasa si falta una.', '4.3': 'Da ejemplos que cojean.' }), bien: 'Necesidades de hoy y de mañana.' },
      'La primera oración lo define: satisfacer lo de hoy sin quitarles a las generaciones futuras.', 'Busca la oración que dice qué es lo que busca.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PARAMO, lineas: ['Renovable no significa infinito.', 'La neblina es blanca.', 'Los páramos dan agua y allí vive gente.', 'Lo sostenible cuida economía, sociedad y ambiente.', 'Hay vacas.', 'Las decisiones deben oír a quienes viven en el territorio.'], ...S([1, 4], { 0: 'Es la primera idea.', 2: 'Es el ejemplo central.', 3: 'Es el concepto.', 5: 'Es el cierre.' }), bien: 'Recursos, páramo, sostenible y voces.' },
      'La neblina blanca y las vacas son detalles; lo demás resume.', 'Deja lo que usarías para evaluar otro proyecto.'),
  ]);

  const PUERTO = {
    id: 'icf-puerto', title: 'El puerto de Bahía Mangle',
    paras: [
      'Bahía Mangle es un municipio de ocho mil habitantes en una costa de manglares. Dos de cada tres adultos viven de la pesca o de sacar piangua, un molusco que crece entre las raíces. Un mapa físico muestra allí una entrada honda y tranquila, ideal para barcos grandes. Un mapa de biodiversidad muestra, en el mismo punto, el criadero de peces más importante de la zona.',
      'En 2023 una empresa propuso construir un puerto. Ofreció seiscientos empleos durante la obra y noventa después. El gobierno nacional apoyó la idea: las mercancías del interior ahorrarían once horas de camino. El alcalde también, porque los impuestos alcanzarían para el hospital que el pueblo pide desde hace veinte años.',
      'El consejo comunitario pidió la consulta previa a la que tiene derecho. En las reuniones, los jóvenes se dividieron. «Yo no quiero sacar piangua toda la vida», dijo uno. «Y yo no quiero pedirle permiso a una empresa para entrar a mi playa», contestó otra. Las mujeres piangueras llevaron un mapa hecho por ellas, con los sitios donde trabajan, los caminos de agua y los nombres que les dieron sus abuelas. Ninguno aparecía en los planos de la empresa.',
      'Los estudios ambientales calcularon que se perdería un tercio del manglar. La empresa ofreció sembrar el doble en otra bahía, a sesenta kilómetros. Una bióloga advirtió que un manglar tarda unos quince años en volver a ser criadero y que, además, frena las olas en las tormentas, cada vez más fuertes.',
      'Después de un año acordaron un muelle más pequeño, en una punta sin manglar, aunque menos honda. Entrarán barcos medianos. Serán menos empleos, pero con cupos y formación para gente del municipio. El mapa de las piangueras quedó pegado al acuerdo como documento oficial: es el primero de la región en el que los lugares llevan los nombres que usa quien los camina.',
    ],
  };
  const Q = preg(PUERTO, 'sociales');
  return mundo('icf-sc-geografia', 'Territorio y Ambiente', 'sociales', [l1, l2], [
    ['icf-sc-geografia-1', 'Un mapa temático muestra un solo asunto.', Q('El mapa de biodiversidad y el físico muestran cosas distintas del mismo punto porque:', ['Uno está equivocado', 'Cada mapa escoge qué representar', 'Son de países distintos', 'Tienen el mismo tema'], 1, 'Uno muestra la profundidad y otro, el criadero: cada uno escoge.', 'Relee qué se ve en cada mapa en el párrafo 1.')],
    ['icf-sc-geografia-1', 'Un mapa puede dejar por fuera a la gente.', Q('El mapa de las piangueras es importante porque:', ['Es más bonito', 'Está a una escala menor', 'Muestra usos y nombres que los planos de la empresa no incluían', 'Fue hecho por el gobierno'], 2, 'Ninguno de esos sitios aparecía en los planos de la empresa.', 'Relee el final del párrafo 3 del texto.')],
    ['icf-sc-geografia-1', 'La población y su trabajo dependen del territorio.', Q('El dato de que dos de cada tres adultos viven de la pesca o la piangua permite deducir que:', ['El puerto afectaría el sustento de la mayoría', 'Nadie quiere el puerto', 'El municipio es muy rico', 'Todos son pescadores'], 0, 'Si el manglar se pierde, se afecta la actividad de la mayoría.', 'Une ese dato con lo que pasaría con el manglar.')],
    ['icf-sc-geografia-2', 'Sostenible: tres patas.', Q('El acuerdo final se acerca al desarrollo sostenible porque:', ['Elimina el puerto', 'Da el máximo de empleos', 'Busca equilibrar empleo, comunidad y manglar', 'Siembra en otra bahía'], 2, 'Menos empleos pero con formación, sin talar el manglar y con la comunidad.', 'Revisa qué pasa con cada pata.')],
    ['icf-sc-geografia-2', 'Compensar en otro lugar puede no reemplazar.', Q('La advertencia de la bióloga cuestiona la compensación porque:', ['Sembrar es ilegal', 'La otra bahía es más grande', 'Los manglares no existen', 'El daño es aquí y ahora; la recuperación, lejos y en quince años'], 3, 'El manglar nuevo estaría a sesenta kilómetros y tardaría años.', 'Compara dónde y cuándo se pierde y dónde y cuándo se recupera.')],
    ['icf-sc-geografia-2', 'La consulta previa busca oír a quienes viven en el territorio.', Q('La consulta previa permitió en este caso:', ['Que el gobierno decidiera solo', 'Que se prohibiera pescar', 'Que la empresa se fuera del país', 'Que la comunidad aportara información y cambiara el proyecto'], 3, 'Las piangueras llevaron su mapa y el proyecto cambió.', 'Compara el proyecto del comienzo con el acuerdo.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-economia.js
// Preicfes · Sociales y Ciudadanas · mundo 9 «Economía y Globalización» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const MERCADO = {
    id: 'icf-mercado-papa', title: 'Lo que dice un precio',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Febrero de 2026' },
    paras: [
      'Un precio es un mensaje. Cuando mucha gente quiere algo y hay poco, sube; cuando sobra, baja. La cantidad que los compradores quieren a cada precio se llama demanda; la que los vendedores ofrecen, oferta. El precio en que las dos coinciden es el de equilibrio.',
      'En el mercado de Villa Rica, una helada dañó la mitad de la papa. El bulto pasó de 80 mil a 140 mil pesos. Nadie se puso de acuerdo para subirlo: había menos papa y las mismas ganas de comerla. Algunas familias se pasaron a la yuca, que también subió un poco. Cuando un producto puede reemplazar a otro, se llaman sustitutos.',
      'No todos los mercados se parecen. Si hay muchos vendedores, compiten y ninguno manda. Si hay uno solo, es un monopolio: puede cobrar caro y atender mal. Si unos pocos se ponen de acuerdo en secreto para fijar el precio, forman un cartel, y en Colombia eso es ilegal.',
      'El Estado interviene por varias razones. Regula los monopolios, protege al consumidor y paga lo que el mercado no paga, como un faro o una campaña de vacunas. También pone límites: si una fábrica ensucia el río, el daño lo pagan otros, y a eso los economistas le dicen externalidad. Puede incluso fijar un precio máximo, pero si lo pone muy bajo los vendedores ofrecen menos y aparecen la escasez y la reventa.',
      'Para hacer todo eso cobra impuestos. Los directos, como el de renta, dependen de lo que cada quien gana o tiene. Los indirectos, como el IVA, se pagan al comprar: el mismo peso de impuesto sale del bolsillo de un rico y del de un pobre, aunque al pobre le duele más. Un impuesto es progresivo cuando cobra una proporción mayor a quien más tiene; es regresivo cuando termina pesando más sobre quien menos tiene.',
      'El dinero recogido va al presupuesto. En él se ve qué le importa a un gobierno: cuánto pone en escuelas, en carreteras o en pagar deudas. Si gasta más de lo que recibe hay déficit, y debe pedir prestado, recortar o cobrar más. Cada salida tiene quien la aplauda y quien la pague.',
    ],
  };
  const l1 = leccion('icf-sc-economia-1', 'Mercado, precios e impuestos', guion(
    ['Oferta y demanda', 'El precio sube si hay poco y muchos lo quieren; baja si sobra.'],
    ['Competencia, monopolio y cartel', 'Muchos compiten; uno solo manda; unos pocos se ponen de acuerdo.'],
    ['El papel del Estado', 'Regula, protege y paga lo que el mercado no paga.'],
    ['Impuestos', 'Directos e indirectos; progresivos y regresivos.']), [
    x('pinta-tipos', 'Pinta cada noticia con lo que cambió en el mercado.', { doc: MERCADO, plumas: ['baja la oferta', 'sube la oferta', 'sube la demanda'],
      ...P(['Una plaga acabó con los limones.', 0, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Hubo cosecha récord de tomate.', 1, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Llegó la temporada escolar y todos buscan cuadernos.', 2, '¿Cambió lo que se ofrece o lo que se quiere?'], ['Cerró la mitad de las panaderías.', 0, '¿Cambió lo que se ofrece o lo que se quiere?']), bien: 'Vendedores o compradores.' },
      'La plaga y los cierres bajan la oferta, la cosecha la sube y la temporada sube la demanda.', 'Pregunta si el cambio les ocurrió a los que venden o a los que compran.'),
    x('genero-o-cita', '¿El impuesto es **directo** o **indirecto**?', { doc: MERCADO, rot: ['directo', 'indirecto'],
      ...F(['El de renta, según lo que se gana', 0, '¿Depende de lo que se tiene o de comprar?'], ['El IVA de un jabón', 1, '¿Depende de lo que se tiene o de comprar?'], ['El predial de una casa', 0, '¿Depende de lo que se tiene o de comprar?'], ['El que va en el precio de una gaseosa', 1, '¿Depende de lo que se tiene o de comprar?']), bien: 'Tener o comprar.' },
      'Renta y predial dependen de lo que se gana o se tiene; IVA y gaseosa, de comprar.', 'Mira si se paga por ganar o tener, o al momento de comprar.'),
    x('pista-tipo', 'Ata cada nombre a su caso.', { doc: MERCADO, lineas: ['una sola empresa vende el agua del pueblo', 'tres fábricas acuerdan en secreto el precio del pañal', 'cuarenta puestos venden arepas', 'el humo de un horno enferma a los vecinos'],
      ...T(['monopolio', 0, '¿Dónde hay un solo vendedor?'], ['cartel', 1, '¿Dónde hay un acuerdo secreto?'], ['competencia', 2, '¿Dónde hay muchos vendedores?'], ['externalidad', 3, '¿Dónde el daño lo pagan otros?']), bien: 'Uno, pocos, muchos y terceros.' },
      'Uno solo es monopolio, el acuerdo es cartel, muchos compiten y el humo es externalidad.', 'Cuenta los vendedores y mira quién paga el daño.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MERCADO, filas: [{ antes: 'La papa subió porque', topes: ['los vendedores se pusieron de acuerdo', 'el gobierno lo ordenó', 'había menos papa y la misma demanda'], va: 2 }, { antes: 'Un precio máximo muy bajo puede traer', topes: ['más producción', 'escasez y reventa', 'nada'], va: 1 }, { antes: 'Los carteles en Colombia son', topes: ['ilegales', 'legales', 'obligatorios'], va: 0 }], mira: ['Relee qué pasó después de la helada.', 'Relee el final del párrafo 4.', 'Relee el final del párrafo 3.'], luz: [[2, 'había menos papa'], [4, 'la escasez y la reventa'], [3, 'eso es ilegal']], bien: 'Menos papa, escasez e ilegales.' },
      'Había menos papa, el precio muy bajo trae escasez y los carteles son ilegales.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MERCADO, nums: [2, 3, 5], pregunta: 'Queda en pie', queda: 'El IVA se paga al comprar.',
      ...T(['Los vendedores de papa hicieron un acuerdo.', 2, 'Busca qué no hizo nadie.'], ['Todos los mercados funcionan igual.', 5, 'Busca la oración más corta del párrafo 3.'], ['El IVA depende de cuánto gana cada quien.', 11, 'Busca qué se dice de los indirectos.']), bien: 'Nadie, no todos y al comprar.' },
      'Nadie se puso de acuerdo, no todos los mercados se parecen y el IVA se paga al comprar.', 'Saca la palabra clave: acuerdo, igual, gana.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MERCADO, nums: [2, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El bulto llegó a 140 mil pesos.', 0, 'Léela junto a la helada.'], ['Para esas familias, la yuca es un sustituto de la papa.', 1, '¿Qué hicieron algunas familias?'], ['El mismo IVA quita una proporción mayor del ingreso de un pobre.', 1, 'Compara el mismo peso en dos bolsillos.'], ['La helada duró tres días.', 2, '¿Se dice cuánto duró?']),
      luz: [[2, '140 mil'], [2, 'se pasaron a la yuca'], [5, 'al pobre le duele más']], bien: 'Sustitutos y proporciones.' },
      'Los 140 mil están escritos; la yuca y la proporción se deducen; los días no aparecen.', 'Piensa qué significa en la práctica cada ejemplo del texto.'),
    x('balanza-tesis', 'Propuesta: «fijar un precio máximo a los arriendos». ¿Qué hace cada dato?', { doc: MERCADO, tesis: 'Fijar un precio máximo a los arriendos',
      ...F(['Miles de familias gastan en arriendo más de la mitad del sueldo.', 0, '¿A quién ayudaría?'], ['Donde se hizo, muchos dueños dejaron de arrendar.', 1, '¿Qué pasó con la oferta?'], ['Las casas tienen ventanas.', 2, '¿Cambia la decisión?']), bien: 'Ayuda a unos, reduce la oferta.' },
      'El gasto de las familias la apoya; la oferta que bajó la debilita; las ventanas no pesan.', 'Pregunta si el dato hace más o menos conveniente la medida.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MERCADO, lineas: ['El precio depende de la oferta y la demanda.', 'El bulto es de papa.', 'Hay competencia, monopolios y carteles.', 'El Estado interviene y cobra impuestos.', 'Hay un faro.', 'El presupuesto muestra las prioridades de un gobierno.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Son las clases de mercado.', 3: 'Es el papel del Estado.', 5: 'Es el cierre.' }), bien: 'Precio, mercados, Estado y presupuesto.' },
      'El bulto y el faro son detalles; lo demás resume.', 'Deja lo que usarías para explicar otro mercado.'),
  ]);

  const CANASTA = {
    id: 'icf-canasta-rosa', title: 'La canasta de Rosa',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Marzo de 2026' },
    paras: [
      'En enero, Rosa llenaba su canasta con 100 mil pesos. En diciembre, la misma canasta le costó 110 mil. Esa subida general de los precios se llama inflación: en su caso fue del 10 %. Que suba solo el tomate no es inflación; que suba casi todo, sí.',
      'Rosa gana lo mismo que en enero. Su salario nominal, el que dice el recibo, no cambió; su salario real, que es lo que alcanza a comprar, bajó. Si se lo hubieran subido el 10 %, estaría igual. Quien guarda billetes debajo del colchón también pierde, y quien debe plata a una tasa fija a veces gana.',
      'El banco central de un país, que en Colombia es el Banco de la República, intenta mantener la inflación baja. Su herramienta principal es la tasa de interés. Si la sube, los préstamos salen caros, la gente gasta menos y los precios se frenan. El costo es que también se frenan las ventas y el empleo.',
      'La tasa de desempleo mide qué parte de la fuerza laboral busca trabajo y no lo encuentra. Quien no busca no cuenta: ni el estudiante de tiempo completo, ni quien se cansó de buscar. Por eso la tasa puede bajar por dos razones muy distintas. Además, muchos de los que trabajan lo hacen en la informalidad: sin contrato, ni salud, ni pensión.',
      'La pobreza se mide de más de una forma. La monetaria compara el ingreso con lo que cuesta una canasta básica. La multidimensional mira también la escuela, la salud, el agua y la vivienda. Una familia puede pasar la línea del ingreso y seguir sin acueducto. También hay hogares que salen de la pobreza y vuelven a entrar varias veces en pocos años.',
      'La desigualdad es otra cosa: mira cómo se reparte. El índice de Gini va de 0, cuando todos tienen lo mismo, a 1, cuando uno solo lo tiene todo. Un país puede volverse más rico y más desigual a la vez. El producto interno bruto por persona divide la torta por igual en el papel, no en la mesa.',
    ],
  };
  const l2 = leccion('icf-sc-economia-2', 'Inflación, desempleo y pobreza', guion(
    ['Inflación', 'Subida general de los precios; baja lo que alcanza el salario.'],
    ['Tasa de interés', 'Si sube, se gasta menos y los precios se frenan; también el empleo.'],
    ['Desempleo', 'Solo cuenta a quien busca trabajo y no lo encuentra.'],
    ['Pobreza y desigualdad', 'Cuánto falta y cómo se reparte son preguntas distintas.']), [
    x('genero-o-cita', '¿La medida habla de **pobreza** o de **desigualdad**?', { doc: CANASTA, rot: ['pobreza', 'desigualdad'],
      ...F(['Hogares que no alcanzan la canasta básica', 0, '¿Mira lo que falta o cómo se reparte?'], ['Índice de Gini', 1, '¿Mira lo que falta o cómo se reparte?'], ['Viviendas sin agua potable', 0, '¿Mira lo que falta o cómo se reparte?'], ['Parte del ingreso que recibe el 10 % más rico', 1, '¿Mira lo que falta o cómo se reparte?']), bien: 'Lo que falta o el reparto.' },
      'La canasta y el agua miran lo que falta; el Gini y la parte del más rico, el reparto.', 'Pregunta si se compara con una línea o entre personas.'),
    x('pasos-del-proceso', 'Ordena lo que ocurre cuando el banco central frena la inflación. El primero está en su puesto.', { doc: CANASTA, que: 'el freno', de: 'La canasta de Rosa', fija: 1, ini: [0, 2, 4, 1, 3], tiras: ['Los precios suben mucho.', 'El banco sube la tasa de interés.', 'Los préstamos salen caros.', 'La gente gasta menos.', 'Los precios se frenan.'], mira: ['', 'Es la herramienta del banco.', 'Es lo primero que cambia con la tasa.', 'Es lo que hace la gente con créditos caros.', 'Es el resultado buscado.'], bien: 'Tasa, préstamos, gasto y precios.' },
      'Sube la tasa, se encarecen los préstamos, se gasta menos y los precios se frenan.', 'Pregunta qué tuvo que pasar antes de cada paso.'),
    x('pinta-tipos', 'Pinta cada persona según cómo cuenta en la tasa de desempleo.', { doc: CANASTA, plumas: ['desempleada', 'ocupada', 'no está en la fuerza laboral'],
      ...P(['Busca trabajo hace tres meses y no encuentra.', 0, '¿Trabaja? ¿Busca?'], ['Vende tintos sin contrato.', 1, '¿Trabaja? ¿Busca?'], ['Estudia todo el día y no busca trabajo.', 2, '¿Trabaja? ¿Busca?'], ['Se cansó de buscar y ya no busca.', 2, '¿Trabaja? ¿Busca?']), bien: 'Trabajar, buscar o ninguna.' },
      'La que busca es desempleada, la que vende está ocupada y quienes no buscan no cuentan.', 'Haz dos preguntas: si trabaja y, si no, si está buscando.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CANASTA, filas: [{ antes: 'El salario nominal de Rosa', topes: ['subió', 'bajó', 'no cambió'], va: 2 }, { antes: 'Su salario real', topes: ['subió', 'bajó', 'no cambió'], va: 1 }, { antes: 'Un Gini de 0 significa', topes: ['que todos tienen lo mismo', 'que uno lo tiene todo', 'que nadie trabaja'], va: 0 }], mira: ['Relee qué dice el recibo.', 'Relee lo que alcanza a comprar.', 'Relee entre qué números va el índice.'], luz: [[2, 'no cambió'], [2, 'lo que alcanza a comprar, bajó'], [6, 'cuando todos tienen lo mismo']], bien: 'Igual, menos y todos igual.' },
      'El nominal no cambió, el real bajó y un Gini de 0 es que todos tienen lo mismo.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CANASTA, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'Un país puede crecer y volverse más desigual.',
      ...T(['Si sube el tomate, hay inflación.', 3, 'Busca el ejemplo del tomate.'], ['Todo el que no trabaja cuenta como desempleado.', 5, 'Busca quién no cuenta.'], ['El PIB por persona muestra lo que recibe cada quien.', 11, 'Busca la torta.']), bien: 'Casi todo, quien busca y el papel.' },
      'Que suba solo el tomate no es inflación, quien no busca no cuenta y la torta se reparte igual solo en el papel.', 'Saca la palabra clave: tomate, no trabaja, por persona.'),
    x('voz-de-la-fuente', 'Con inflación alta, ata cada efecto a quien lo vive.', { ayuda: 'Tira un hilo desde cada efecto hasta quien lo vive.', doc: CANASTA, portadas: [['Empleada con sueldo fijo', 'actor'], ['Quien guarda billetes', 'actor'], ['Quien debe a tasa fija', 'actor'], ['Banco central', 'actor']],
      ...T(['compra menos con lo mismo que gana', 0, '¿Quién recibe igual cada mes?'], ['sus ahorros alcanzan para menos', 1, '¿Quién tiene la plata quieta?'], ['lo que paga vale cada vez menos', 2, '¿Quién puede ganar?'], ['debe subir la tasa', 3, '¿Quién tiene esa herramienta?']), bien: 'No todos la viven igual.' },
      'El sueldo alcanza menos, los billetes pierden, la deuda fija pesa menos y el banco sube la tasa.', 'Piensa qué tiene cada uno y si ese valor cambia.'),
    x('balanza-tesis', 'Afirmación: «bajó el desempleo, así que hay más gente trabajando». ¿Qué hace cada dato?', { doc: CANASTA, tesis: 'Hay más gente trabajando',
      ...F(['Aumentó en 200 mil el número de ocupados.', 0, '¿Creció el número que importa?'], ['Muchos dejaron de buscar y hay los mismos ocupados.', 1, '¿Por qué bajó la tasa?'], ['La encuesta se imprimió en papel azul.', 2, '¿Dice algo del empleo?']), bien: 'La tasa baja por dos razones.' },
      'Más ocupados la apoya; dejar de buscar la debilita; el papel no pesa.', 'Recuerda que la tasa puede bajar por dos razones.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: CANASTA, frases: [[2, 'Su salario ', 'nominal', ', el que dice el recibo'], [4, 'lo hacen en la ', 'informalidad', ''], [1, 'Esa subida ', 'general', ' de los precios']],
      ...F(['en pesos', 0, '¿Qué mira el recibo?'], ['falta de protección', 1, '¿Qué no tienen: contrato, salud?'], ['de casi todos', 2, '¿Sube uno o muchos?'], ['de uno solo', null, 'Es lo contrario de general.'], ['en compras', null, 'Eso sería el salario real.']), bien: 'El contexto las explica.' },
      'Nominal es en pesos, informalidad es falta de protección y general es de casi todos.', 'Lee el ejemplo que da el texto alrededor.'),
  ]);

  const CAMISETA = {
    id: 'icf-camiseta', title: 'La camiseta que dio la vuelta al mundo',
    ficha: { autor: 'Cuaderno de economía', fuente: 'Colección «Cuentas claras»', fecha: 'Abril de 2026' },
    paras: [
      'La camiseta que lleva puesta Nico dice «Hecho en Vietnam». El algodón creció en la India, la tela se tejió en China, el diseño se dibujó en España y el barco que la trajo navega con bandera de Panamá. A esa red de países conectados por el comercio, el dinero, la información y las personas se le llama globalización.',
      'No es nueva. Hace siglos, la seda y la plata ya cruzaban el mundo. Lo nuevo es la velocidad: los contenedores abarataron el transporte, internet acercó las oficinas y los tratados bajaron los aranceles, que son los impuestos a lo que entra de otro país.',
      'Un tratado de libre comercio abre la puerta en los dos sentidos. Quien exporta flores o café encuentra más compradores; quien produce arroz o leche debe competir con fincas gigantes que a veces reciben subsidios de sus gobiernos. El consumidor suele pagar menos. El pequeño productor, si nadie lo ayuda a prepararse, puede quebrar.',
      'Las multinacionales llevan empleo y tecnología a los países donde se instalan. También buscan dónde los salarios y las exigencias ambientales son menores. Si un país sube sus reglas, pueden amenazar con irse. Por eso algunos proponen reglas comunes: un impuesto mínimo y derechos laborales que valgan en todas partes.',
      'La cultura también viaja. Millones de migrantes envían dinero a sus casas y llevan consigo recetas, palabras, canciones y fiestas de su tierra. Nico oye música coreana y, en Seúl, una muchacha baila salsa caleña. Unos temen que todo termine pareciéndose; otros ven mezclas nuevas. A lo local que se cruza con lo global algunos le dicen «glocal»: una hamburguesa con patacón.',
      'Estar conectados también contagia los problemas. Una crisis en los bancos de un país deja sin empleo a gente de otro; un virus da la vuelta al mundo en semanas; una guerra lejana encarece el pan. Organismos como la ONU, el Fondo Monetario Internacional o la Organización Mundial del Comercio intentan coordinar respuestas. No todos los países pesan lo mismo en ellos.',
    ],
  };
  const l3 = leccion('icf-sc-economia-3', 'Globalización', guion(
    ['Una red', 'Países conectados por comercio, dinero, información y personas.'],
    ['Libre comercio', 'Bajan los aranceles: unos ganan mercados y otros pierden el suyo.'],
    ['Empresas y reglas', 'Las multinacionales llevan empleo y buscan costos bajos.'],
    ['Cultura y crisis', 'También viajan las costumbres y los problemas.']), [
    x('pinta-tipos', 'Pinta cada ejemplo con la dimensión de la globalización que muestra.', { doc: CAMISETA, plumas: ['económica', 'cultural', 'política'],
      ...P(['Se exportan flores a otro continente.', 0, '¿Comercio, costumbres o gobierno?'], ['Se baila salsa en Seúl.', 1, '¿Comercio, costumbres o gobierno?'], ['Varios países firman un acuerdo en la ONU.', 2, '¿Comercio, costumbres o gobierno?'], ['Una hamburguesa lleva patacón.', 1, '¿Comercio, costumbres o gobierno?']), bien: 'Comercio, costumbres y acuerdos.' },
      'Las flores son economía, la salsa y la hamburguesa cultura, y el acuerdo política.', 'Pregunta qué cruza la frontera: cosas, costumbres o decisiones.'),
    x('genero-o-cita', 'Con un tratado de libre comercio, ¿más bien **gana** o **arriesga**?', { doc: CAMISETA, rot: ['gana', 'arriesga'],
      ...F(['Quien exporta café', 0, '¿Encuentra compradores o competidores?'], ['Quien siembra arroz en una finca pequeña', 1, '¿Encuentra compradores o competidores?'], ['Quien compra más barato', 0, '¿Paga menos o más?'], ['Quien vende leche sin ayuda para prepararse', 1, '¿Encuentra compradores o competidores?']), bien: 'La puerta se abre en los dos sentidos.' },
      'Exportador y consumidor ganan; arroz y leche de pequeños productores arriesgan.', 'Piensa a quién se le abre un mercado y a quién le llega un competidor.'),
    x('pista-tipo', 'Ata cada término a su ejemplo.', { doc: CAMISETA, lineas: ['impuesto a lo que entra de otro país', 'fábrica con sedes en nueve países', 'ayuda de un gobierno a sus fincas', 'arepa rellena de sushi'],
      ...T(['arancel', 0, '¿Cuál se cobra en la frontera?'], ['multinacional', 1, '¿Cuál está en muchos países?'], ['subsidio', 2, '¿Cuál es una ayuda?'], ['glocal', 3, '¿Cuál mezcla lo local y lo global?']), bien: 'Impuesto, empresa, ayuda y mezcla.' },
      'El arancel se cobra al entrar, la multinacional está en varios países, el subsidio ayuda y lo glocal mezcla.', 'Busca en el texto la explicación que acompaña cada término.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CAMISETA, filas: [{ antes: 'La globalización', topes: ['empezó con internet', 'ya terminó', 'no es nueva'], va: 2 }, { antes: 'En los organismos internacionales los países', topes: ['pesan todos igual', 'no pesan todos lo mismo', 'no participan'], va: 1 }, { antes: 'Los tratados', topes: ['bajaron los aranceles', 'subieron los aranceles', 'crearon la seda'], va: 0 }], mira: ['Relee el comienzo del párrafo 2.', 'Relee el final del texto.', 'Relee lo nuevo del párrafo 2.'], luz: [[2, 'No es nueva'], [6, 'No todos los países pesan lo mismo'], [2, 'bajaron los aranceles']], bien: 'No es nueva, no pesan igual y bajaron.' },
      'No es nueva, los países no pesan lo mismo y los tratados bajaron los aranceles.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CAMISETA, nums: [2, 4, 6], pregunta: 'Queda en pie', queda: 'Un problema lejano puede afectar lo que se paga aquí.',
      ...T(['El comercio entre continentes es un invento reciente.', [0, 1], 'Busca la seda y la plata.'], ['Las multinacionales solo buscan donde hay más exigencias.', 4, 'Busca qué buscan también.'], ['Una crisis se queda siempre en el país donde nace.', [7, 8], 'Busca el ejemplo de los bancos.']), bien: 'Seda, menores y otro país.' },
      'La seda cruzaba hace siglos, las multinacionales buscan exigencias menores y la crisis pasa a otro país.', 'Saca la palabra clave: reciente, exigencias, crisis.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CAMISETA, nums: [1, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El algodón creció en la India.', 0, 'Léela junto a la camiseta.'], ['La etiqueta no cuenta todos los países que participaron.', 1, 'Compara lo que dice con los países que nombra el texto.'], ['Al arrocero le convendría ayuda antes de firmar el tratado.', 1, '¿Qué le puede pasar si nadie lo prepara?'], ['Nico pagó veinte mil por la camiseta.', 2, '¿Se dice cuánto pagó?']),
      luz: [[1, 'El algodón creció en la India'], [1, '«Hecho en Vietnam»'], [3, 'si nadie lo ayuda a prepararse']], bien: 'Comparar y prever.' },
      'La India está escrita; la etiqueta y la ayuda se deducen; el precio no aparece.', 'Compara lo que muestra la etiqueta con lo que cuenta el texto.'),
    x('voz-de-la-fuente', 'Ata cada opinión sobre un tratado a quien la diría.', { ayuda: 'Tira un hilo desde cada opinión hasta quien la diría.', doc: CAMISETA, portadas: [['Exportadora de flores', 'actor'], ['Arrocero pequeño', 'actor'], ['Sindicato', 'actor'], ['Comprador', 'actor']],
      ...T(['«por fin entro a ese mercado»', 0, '¿A quién se le abre una puerta?'], ['«no puedo competir con sus subsidios»', 1, '¿Quién enfrenta fincas gigantes?'], ['«que los derechos valgan aquí y allá»', 2, '¿Quién defiende a los trabajadores?'], ['«ahora me sale más barato»', 3, '¿Quién paga menos?']), bien: 'Cada quien desde su lugar.' },
      'La exportadora gana mercado, el arrocero compite, el sindicato pide derechos y el comprador ahorra.', 'Pregunta qué le cambia el tratado a cada uno.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CAMISETA, lineas: ['La globalización conecta países.', 'El barco lleva bandera.', 'El libre comercio beneficia a unos y golpea a otros.', 'La cultura también viaja y se mezcla.', 'El patacón va con hamburguesa.', 'Las crisis se contagian y piden coordinación.'], ...S([1, 4], { 0: 'Es la definición.', 2: 'Es la idea sobre el comercio.', 3: 'Es la idea sobre la cultura.', 5: 'Es el cierre.' }), bien: 'Red, comercio, cultura y crisis.' },
      'La bandera y el patacón son detalles; lo demás resume.', 'Deja lo que sirve para entender otro producto o país.'),
  ]);

  const CAFE = {
    id: 'icf-cooperativa-cafe', title: 'La taza y la montaña',
    paras: [
      'En Alto Brisas, trescientas familias siembran café. Durante años se lo vendieron al único comprador que subía con camión. Pagaba lo que quería: no había otro. En 2023 las familias formaron una cooperativa, compraron su propio camión y empezaron a vender directo a tostadores de Japón y Alemania. El precio que reciben por carga subió un 40 %.',
      'No todo fue ganancia. El precio del café se decide en una bolsa, a miles de kilómetros. Cuando en Brasil hay buena cosecha, baja en Alto Brisas, aunque allí no haya cambiado nada. En la última caída, la carga pasó de un millón a setecientos mil pesos en cuatro meses. Ese mismo año, los fertilizantes importados se encarecieron por una guerra en otro continente.',
      'Con los ingresos de los primeros años, la cooperativa pagó mejor a los recolectores. Pero en el pueblo los precios subieron 12 % y el jornal, solo 8 %. «Gano más pesos y compro menos mercado», resumió doña Elvira, recolectora. La mayoría trabaja sin contrato, y fuera de la cosecha muchos dejan de buscar empleo porque saben que no hay. Las cifras oficiales dicen que el desempleo del municipio es bajo.',
      'El alcalde propuso un impuesto igual para todas las familias: cien mil pesos al año para arreglar la carretera. La cooperativa respondió con otra idea: que cada quien pague un porcentaje de lo que vende. «Cien mil pesos es un almuerzo para el hotel y un mes de mercado para un recolector», dijo su gerente. Después de varias asambleas se aprobó el porcentaje.',
      'Un estudiante calculó que el ingreso promedio por persona del municipio se había duplicado en seis años. También que casi todo el aumento había quedado en el 10 % de las familias, las dueñas de más tierra. En la plaza hay ahora un café con letrero en inglés donde una taza cuesta lo que un recolector gana en media mañana. Los turistas le toman fotos a la montaña. «Yo a esa montaña la conozco por debajo», dice doña Elvira, «que es por donde se recoge».',
    ],
  };
  const Q = preg(CAFE, 'sociales');
  return mundo('icf-sc-economia', 'Economía y Globalización', 'sociales', [l1, l2, l3], [
    ['icf-sc-economia-1', 'Un solo comprador tiene mucho poder.', Q('Antes de la cooperativa, el comprador podía pagar lo que quería porque:', ['Era el único que compraba', 'El café era malo', 'Lo ordenaba la ley', 'Había muchos compradores'], 0, 'Sin otros compradores, las familias no tenían a quién más vender.', 'Relee qué dice el texto del único camión.')],
    ['icf-sc-economia-1', 'Progresivo: paga más quien más tiene.', Q('El argumento del gerente contra los cien mil pesos iguales es que esa cuota:', ['Es ilegal', 'No alcanza para la carretera', 'Pesa más sobre quien menos tiene', 'La cobran en dólares'], 2, 'Es un almuerzo para el hotel y un mes de mercado para un recolector.', 'Compara qué significa esa suma para cada uno.')],
    ['icf-sc-economia-2', 'El salario real es lo que se alcanza a comprar.', Q('La frase «gano más pesos y compro menos mercado» significa que doña Elvira:', ['Perdió su empleo', 'Tiene más salario real', 'Tiene el mismo salario nominal', 'Tiene más salario nominal y menos salario real'], 3, 'El jornal subió 8 % y los precios, 12 %.', 'Compara la subida del jornal con la de los precios.')],
    ['icf-sc-economia-2', 'Quien no busca no cuenta como desempleado.', Q('El desempleo oficial puede ser bajo aunque fuera de la cosecha falte trabajo porque:', ['Todos tienen contrato', 'Quienes dejan de buscar no se cuentan', 'La cooperativa miente', 'Los turistas cuentan como empleados'], 1, 'Muchos dejan de buscar y salen de la cuenta.', 'Recuerda a quién cuenta la tasa de desempleo.')],
    ['icf-sc-economia-2', 'Promedio alto y reparto desigual.', Q('Los cálculos del estudiante muestran que el municipio:', ['Es más rico y más desigual', 'Es más pobre', 'Reparte todo por igual', 'No ha cambiado'], 0, 'El promedio se duplicó y casi todo quedó en el 10 % de las familias.', 'Une los dos datos del estudiante.')],
    ['icf-sc-economia-3', 'Lo que pasa lejos llega hasta aquí.', Q('Un ejemplo de que la globalización contagia problemas en Alto Brisas es:', ['La compra del camión', 'El letrero en inglés', 'Las asambleas', 'El alza de los fertilizantes por una guerra lejana'], 3, 'Una guerra en otro continente encareció un insumo local.', 'Busca un hecho lejano con efecto en el pueblo.')],
    ['icf-sc-economia-3', 'La puerta se abre en los dos sentidos.', Q('La relación de la cooperativa con el mercado mundial se describe mejor como:', ['Solo beneficios', 'Una oportunidad que también trae riesgos', 'Solo pérdidas', 'Un asunto que no la afecta'], 1, 'Subió el precio que reciben, pero dependen de la bolsa y de los insumos.', 'Compara el final del párrafo 1 con el párrafo 2.')],
  ]);
})());
;
//#archivo js/courses/preicfes-sc-modelos.js
// Preicfes · Sociales y Ciudadanas · mundo 10 «Modelos para Decidir» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const CONCEPTOS = {
    id: 'icf-conceptos', title: 'Las palabras que ordenan el mundo',
    ficha: { autor: 'Cuaderno de ciencias sociales', fuente: 'Colección «Ideas»', fecha: 'Febrero de 2026' },
    paras: [
      'En una clase, Samir preguntó si Colombia es un Estado, una nación o un país. La profesora contestó que depende de qué se quiera mirar. Un concepto es una herramienta: sirve para ver una parte de la realidad y deja otra en la sombra. Usar uno por otro hace que dos personas discutan sin hablar de lo mismo.',
      'El Estado es una organización que gobierna un territorio y una población, y que tiene la autoridad para hacer leyes y hacerlas cumplir. Tiene soberanía cuando ningún otro manda sobre él. El gobierno es apenas el grupo de personas que lo dirige por un tiempo: los gobiernos cambian y el Estado continúa.',
      'La nación es otra cosa: un grupo que se reconoce unido por una historia, una lengua o unas costumbres. Un Estado puede reunir varias naciones, como ocurre en Bolivia, que se define como plurinacional. Y hay naciones sin Estado propio, como el pueblo kurdo, repartido entre varios países.',
      'Poder es la capacidad de influir en lo que hacen otros. A veces se ejerce por la fuerza; a veces, porque la gente reconoce que quien manda tiene derecho a hacerlo. A eso último se le llama legitimidad. Algo puede ser legal y perder legitimidad: una norma aprobada según las reglas, pero que casi todos consideran injusta.',
      'La sociedad también se mira por capas. La clase social agrupa según los ingresos, el trabajo o la propiedad; la etnia, según una cultura y un origen compartidos; el género, según lo que una sociedad espera de hombres y mujeres. Una misma persona está en todas a la vez. Cuando es posible subir o bajar de posición, se habla de movilidad social.',
      'La cultura no es solo arte ni folclor: son los modos de vivir, creer y hacer que se aprenden. Juzgar otra cultura con la medida de la propia es etnocentrismo; tratar de entenderla desde sus propias razones es relativismo cultural. Entender, aclaró la profesora, no obliga a aprobarlo todo: los derechos humanos ponen un límite.',
    ],
  };
  const l1 = leccion('icf-sc-modelos-1', 'Conceptos básicos', guion(
    ['Para qué un concepto', 'Deja ver una parte de la realidad.'],
    ['Estado, gobierno y nación', 'Una organización, quienes la dirigen y un grupo que se siente unido.'],
    ['Poder y legitimidad', 'Influir en otros; y que reconozcan el derecho a mandar.'],
    ['Sociedad y cultura', 'Clase, etnia, género; y modos de vivir que se aprenden.']), [
    x('pinta-tipos', 'Pinta cada ejemplo con el concepto que le corresponde.', { doc: CONCEPTOS, plumas: ['Estado', 'gobierno', 'nación'],
      ...P(['El presidente y sus ministros de este periodo.', 1, '¿Organización, personas o grupo unido?'], ['Un pueblo que comparte lengua e historia, sin país propio.', 2, '¿Organización, personas o grupo unido?'], ['La organización que hace leyes en un territorio.', 0, '¿Organización, personas o grupo unido?'], ['Lo que continúa cuando cambian los gobernantes.', 0, '¿Organización, personas o grupo unido?']), bien: 'Organización, personas y grupo.' },
      'Los ministros son gobierno, el pueblo es nación y la organización que continúa, Estado.', 'Pregunta si cambia con las elecciones y si depende de sentirse unidos.'),
    x('genero-o-cita', '¿Es poder por la **fuerza** o por **legitimidad**?', { doc: CONCEPTOS, rot: ['fuerza', 'legitimidad'],
      ...F(['Obedecen porque los amenazan con armas', 0, '¿Reconocen el derecho a mandar?'], ['Aceptan al alcalde porque lo eligieron', 1, '¿Reconocen el derecho a mandar?'], ['Siguen a la mayora por respeto a su sabiduría', 1, '¿Reconocen el derecho a mandar?'], ['Pagan una «vacuna» por miedo', 0, '¿Reconocen el derecho a mandar?']), bien: 'Miedo o reconocimiento.' },
      'Armas y miedo son fuerza; la elección y el respeto, legitimidad.', 'Piensa si obedecerían aunque nadie los amenazara.'),
    x('pista-tipo', 'Ata cada concepto a su caso.', { doc: CONCEPTOS, lineas: ['la hija de un obrero llega a ser jueza', '«qué raro comen ellos, lo normal es lo nuestro»', 'estudiar por qué otro pueblo entierra así a sus muertos', 'ningún otro país decide por este'],
      ...T(['movilidad social', 0, '¿Dónde cambia la posición?'], ['etnocentrismo', 1, '¿Dónde se juzga con la medida propia?'], ['relativismo cultural', 2, '¿Dónde se intenta entender?'], ['soberanía', 3, '¿Dónde nadie manda de afuera?']), bien: 'Cada caso, su palabra.' },
      'Subir es movilidad, juzgar es etnocentrismo, entender es relativismo y no recibir órdenes, soberanía.', 'Busca en el texto la explicación que acompaña cada palabra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CONCEPTOS, filas: [{ antes: 'Un Estado', topes: ['tiene una sola nación', 'no tiene naciones', 'puede reunir varias naciones'], va: 2 }, { antes: 'Algo legal', topes: ['siempre es legítimo', 'puede perder legitimidad', 'nunca es legítimo'], va: 1 }, { antes: 'Entender otra cultura', topes: ['no obliga a aprobarlo todo', 'obliga a aprobarlo todo', 'es imposible'], va: 0 }], mira: ['Relee el ejemplo de Bolivia.', 'Relee el final del párrafo 4.', 'Relee lo que aclaró la profesora.'], luz: [[3, 'puede reunir varias naciones'], [4, 'puede ser legal y perder legitimidad'], [6, 'no obliga a aprobarlo todo']], bien: 'Varias, puede y no obliga.' },
      'Puede reunir varias naciones, lo legal puede perder legitimidad y entender no obliga a aprobar.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONCEPTOS, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'El gobierno dirige el Estado por un tiempo.',
      ...T(['Cuando cambia el gobierno, el Estado termina.', 2, 'Busca qué cambia y qué continúa.'], ['Toda nación tiene su propio Estado.', 5, 'Busca el pueblo kurdo.'], ['La cultura es solo el arte y el folclor.', 6, 'Busca qué no es la cultura solamente.']), bien: 'Continúa, sin Estado y no solo.' },
      'El Estado continúa, hay naciones sin Estado y la cultura no es solo arte.', 'Saca la palabra clave: termina, toda, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONCEPTOS, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Bolivia se define como plurinacional.', 0, 'Léela junto al ejemplo.'], ['Estado y nación no siempre coinciden.', 1, 'Compara los dos ejemplos del párrafo 3.'], ['Dos personas de la misma clase pueden ser de distinta etnia.', 1, '¿Por qué cosas agrupa cada capa?'], ['El pueblo kurdo tiene treinta lenguas.', 2, '¿Se dice cuántas tiene?']),
      luz: [[3, 'se define como plurinacional'], [3, 'naciones sin Estado propio'], [5, 'Una misma persona está en todas a la vez']], bien: 'Comparar ejemplos.' },
      'Lo plurinacional está escrito; que no coinciden y las capas se deducen; las lenguas no aparecen.', 'Une los ejemplos con las definiciones del texto.'),
    x('balanza-tesis', 'Idea: «en este municipio hay poca movilidad social». ¿Qué hace cada dato?', { doc: CONCEPTOS, tesis: 'Hay poca movilidad social',
      ...F(['Nueve de cada diez hijos de jornaleros son jornaleros.', 0, '¿Cambian de posición?'], ['La mitad de los hijos de jornaleros terminó la universidad y cambió de oficio.', 1, '¿Cambian de posición?'], ['El municipio tiene un río.', 2, '¿Habla de posiciones?']), bien: 'Subir o quedarse.' },
      'Que repitan el oficio la apoya; que cambien la debilita; el río no pesa.', 'Recuerda qué significa movilidad social y compara padres e hijos.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CONCEPTOS, lineas: ['Un concepto deja ver una parte de la realidad.', 'Samir hizo una pregunta en clase.', 'Estado, gobierno y nación son cosas distintas.', 'El poder puede apoyarse en la fuerza o en la legitimidad.', 'Los kurdos viven en varios países.', 'Clase, etnia, género y cultura ayudan a mirar la sociedad.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es la primera distinción.', 3: 'Es la idea sobre el poder.', 5: 'Son las otras herramientas.' }), bien: 'Herramientas y distinciones.' },
      'La pregunta de Samir y los kurdos son ejemplos; lo demás resume.', 'Deja lo que serviría para analizar otro país.'),
  ]);

  const MODELOS = {
    id: 'icf-rio-manso', title: 'Cuatro maneras de arreglar un pueblo',
    ficha: { autor: 'Cuaderno de ciencias sociales', fuente: 'Colección «Ideas»', fecha: 'Marzo de 2026' },
    paras: [
      'Río Manso tiene un hospital viejo, una escuela llena y poco dinero. El concejo pidió propuestas. Llegaron cuatro, y detrás de cada una había una idea distinta de lo que debe hacer un Estado. A esas ideas simplificadas, que ayudan a comparar, las ciencias sociales les dicen modelos.',
      'La primera propone bajar impuestos y dejar que empresas privadas compitan por atender a la gente. Confía en la libertad de cada quien y en el mercado: el Estado debe ser pequeño y cuidar las reglas. Es la lógica liberal en lo económico. Sus críticos preguntan qué pasa con quien no puede pagar.',
      'La segunda propone cobrar más a quienes más tienen y ofrecer salud y escuela gratuitas para todos. Es la lógica del Estado de bienestar, que mantiene el mercado y reparte una parte de lo que produce. Sus críticos preguntan cuánto puede cobrarse antes de que las empresas se vayan.',
      'La tercera propone que el municipio sea dueño de las principales empresas y decida qué producir. Es la lógica socialista: lo que es de todos debe servir a todos. Sus críticos señalan que, sin competencia ni controles, quien administra puede volverse ineficiente o abusar del poder.',
      'La cuarta viene de la vereda: que las comunidades decidan en asamblea, según sus costumbres, y que el bienestar no se mida solo en dinero, sino en agua limpia, tiempo y vida en común. Es la lógica comunitaria, cercana a lo que varios pueblos andinos llaman buen vivir. Sus críticos preguntan si funciona para una ciudad de un millón de personas.',
      'El concejo terminó mezclando: salud pública, un parque industrial privado y presupuesto votado en las veredas. Casi ningún país usa un modelo puro. Reconocerlos sirve para otra cosa: ante una decisión, preguntar qué valor pone primero, si la libertad, la igualdad, la propiedad común o la comunidad; a quién beneficia, y qué deja por fuera. Ningún modelo es neutral; tampoco lo es quien lo critica. Por eso conviene comparar las respuestas que da cada uno y no solo su nombre.',
    ],
  };
  const l2 = leccion('icf-sc-modelos-2', 'Modelos y decisiones públicas', guion(
    ['Modelo', 'Una idea simplificada que ayuda a comparar.'],
    ['Cuatro lógicas', 'Liberal, de bienestar, socialista y comunitaria.'],
    ['Valores', 'Cada una pone primero un valor y recibe críticas.'],
    ['Mezclas', 'Casi ningún país usa un modelo puro.']), [
    x('pista-tipo', 'Ata cada medida a la lógica que tiene detrás.', { doc: MODELOS, lineas: ['menos impuestos y más competencia', 'impuesto progresivo para salud gratuita', 'el municipio compra la fábrica de leche', 'la asamblea decide el turno del agua'],
      ...T(['liberal', 0, '¿Cuál confía en el mercado?'], ['de bienestar', 1, '¿Cuál mantiene el mercado y reparte?'], ['socialista', 2, '¿Cuál vuelve pública la empresa?'], ['comunitaria', 3, '¿Cuál decide en asamblea?']), bien: 'Mercado, reparto, propiedad y asamblea.' },
      'Competir es liberal, repartir es de bienestar, ser dueños es socialista y la asamblea, comunitaria.', 'Pregunta quién decide y quién es dueño en cada medida.'),
    x('pinta-tipos', 'Pinta cada frase con el valor que pone primero.', { doc: MODELOS, plumas: ['libertad', 'igualdad', 'comunidad'],
      ...P(['«Que cada quien escoja su médico y lo pague».', 0, '¿Escoger, repartir o vivir juntos?'], ['«Que nadie se quede sin escuela por ser pobre».', 1, '¿Escoger, repartir o vivir juntos?'], ['«Decidamos juntos, como nos enseñaron los mayores».', 2, '¿Escoger, repartir o vivir juntos?'], ['«El Estado no debe decirme qué vender».', 0, '¿Escoger, repartir o vivir juntos?']), bien: 'Escoger, repartir y juntos.' },
      'Escoger y vender sin permiso es libertad, la escuela para todos igualdad y decidir juntos, comunidad.', 'Busca la palabra que delata lo que más le importa a quien habla.'),
    x('voz-de-la-fuente', 'Ata cada crítica a la propuesta que la recibe.', { ayuda: 'Tira un hilo desde cada crítica hasta la propuesta.', doc: MODELOS, portadas: [['Primera: mercado', 'propuesta'], ['Segunda: bienestar', 'propuesta'], ['Tercera: socialista', 'propuesta'], ['Cuarta: comunitaria', 'propuesta']],
      ...T(['deja por fuera a quien no puede pagar', 0, '¿Cuál depende de pagar?'], ['las empresas podrían irse', 1, '¿Cuál cobra más?'], ['quien administra puede abusar', 2, '¿Cuál concentra la propiedad?'], ['quizás no sirve en una gran ciudad', 3, '¿Cuál se piensa para comunidades?']), bien: 'Cada modelo, su crítica.' },
      'El mercado excluye a quien no paga, cobrar espanta empresas, concentrar permite abusos y la asamblea es difícil en grande.', 'Busca la última oración del párrafo de cada propuesta.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MODELOS, filas: [{ antes: 'Los modelos son', topes: ['copias exactas de un país', 'leyes', 'ideas simplificadas'], va: 2 }, { antes: 'El Estado de bienestar', topes: ['elimina el mercado', 'mantiene el mercado', 'no cobra impuestos'], va: 1 }, { antes: 'Un modelo puro lo usa', topes: ['casi ningún país', 'la mitad de los países', 'todo país'], va: 0 }], mira: ['Relee el final del párrafo 1.', 'Relee la segunda propuesta.', 'Relee el párrafo 6.'], luz: [[1, 'ideas simplificadas'], [3, 'mantiene el mercado'], [6, 'Casi ningún país usa un modelo puro']], bien: 'Simplificadas, mantiene y casi ninguno.' },
      'Son ideas simplificadas, el de bienestar mantiene el mercado y casi ningún país usa uno puro.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MODELOS, nums: [2, 5, 6], pregunta: 'Queda en pie', queda: 'Conviene preguntar a quién beneficia una decisión.',
      ...T(['Para la lógica liberal, el Estado debe ser grande.', 1, 'Busca cómo debe ser el Estado.'], ['El buen vivir mide el bienestar solo en dinero.', 4, 'Busca en qué más se mide.'], ['El concejo escogió una sola propuesta.', 7, 'Busca qué terminó haciendo.']), bien: 'Pequeño, no solo y mezclando.' },
      'El Estado debe ser pequeño, el bienestar no se mide solo en dinero y el concejo mezcló.', 'Saca la palabra clave: grande, solo, una sola.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 1 la oración que **define** qué es un modelo.', { doc: MODELOS, nums: [1], apuesta: 'Una idea simplificada para comparar.', ...S(['1.3'], { '1.0': 'Describe los problemas del pueblo.', '1.1': 'Cuenta lo que hizo el concejo.', '1.2': 'Dice qué había detrás, pero no lo define.' }), bien: 'Ideas simplificadas que ayudan a comparar.' },
      'La última oración lo define: ideas simplificadas, que ayudan a comparar.', 'Busca la oración que pone el nombre y dice para qué sirve.'),
    x('balanza-tesis', 'Propuesta: «que una empresa privada maneje el hospital de Río Manso». ¿Qué hace cada dato?', { doc: MODELOS, tesis: 'Que una empresa privada maneje el hospital',
      ...F(['En un pueblo parecido, la empresa redujo a la mitad las filas sin cobrar más.', 0, '¿Mejoró la atención?'], ['Seis de cada diez habitantes no podrían pagar las tarifas previstas.', 1, '¿A quién deja por fuera?'], ['El hospital está pintado de blanco.', 2, '¿Cambia la decisión?']), bien: 'Eficiencia y acceso.' },
      'Las filas la apoyan; las tarifas la debilitan; el color no pesa.', 'Pregunta si el dato hace más o menos conveniente la medida para la gente.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MODELOS, lineas: ['Los modelos son ideas simplificadas sobre lo que debe hacer un Estado.', 'La escuela está llena.', 'Hay lógicas liberal, de bienestar, socialista y comunitaria.', 'Cada una pone primero un valor y recibe críticas.', 'Habrá un parque industrial.', 'Casi siempre se mezclan.'], ...S([1, 4], { 0: 'Es la definición.', 2: 'Son los modelos.', 3: 'Es lo que permite compararlos.', 5: 'Es la conclusión.' }), bien: 'Definición, modelos, valores y mezcla.' },
      'La escuela y el parque son detalles; lo demás resume.', 'Deja lo que usarías para analizar otra decisión.'),
  ]);

  const AGUA = {
    id: 'icf-acueducto-alto', title: 'El agua de Cerro Alto',
    paras: [
      'Cerro Alto tiene cuatro mil habitantes y un acueducto construido a mano por sus abuelos. Lo maneja una junta de vecinos elegida cada dos años. Cobra una tarifa baja e igual para todos y, cuando falta plata, se llama a convite: un día de trabajo por familia. «Aquí el agua no es de nadie, por eso la cuidamos todos», dice la fundadora.',
      'En 2023 la sequía bajó el caudal y los nuevos conjuntos de casas aumentaron el consumo. Hubo semanas con agua un día sí y otro no. La alcaldía, elegida el año anterior con una votación alta, propuso entregar el servicio a una empresa privada por veinte años. La empresa prometió arreglar las tuberías, poner contadores y cobrar según lo que gaste cada casa. «El que gasta más debe pagar más; así nadie desperdicia», explicó su representante.',
      'El contrato era legal: cumplía todas las normas. Pero en la audiencia casi nadie lo apoyó. «Ustedes fueron elegidos para dirigir, no para entregar lo que hicimos nosotros», dijo un vecino. Una concejala propuso otra salida: que el municipio fuera el dueño y que las casas de mayor valor pagaran una tarifa más alta para subsidiar a las de menor valor. Un grupo de jóvenes recordó que en la vereda de abajo vive una comunidad indígena que considera sagrado el nacimiento y que nadie la había consultado.',
      'Un profesor hizo un cuadro en el tablero. En cada columna puso una propuesta; en cada fila, una pregunta: quién decide, quién es dueño, quién paga y quién queda por fuera. «No les voy a decir cuál es mejor», advirtió. «Les pido que no comparen los nombres, sino las respuestas».',
      'Después de cinco meses acordaron que la junta siguiera administrando, con contadores y cobro según el consumo, una tarifa menor para los hogares de menos ingresos y apoyo técnico del municipio. La comunidad indígena quedó con un puesto y con derecho a opinar sobre el nacimiento. El profesor borró el tablero y dejó solo las preguntas. «Esas sirven para el próximo problema», dijo.',
    ],
  };
  const Q = preg(AGUA, 'sociales');
  return mundo('icf-sc-modelos', 'Modelos para Decidir', 'sociales', [l1, l2], [
    ['icf-sc-modelos-1', 'Legal y legítimo no son lo mismo.', Q('El contrato con la empresa era legal, pero en la audiencia se mostró que le faltaba:', ['Soberanía', 'Legitimidad', 'Movilidad social', 'Territorio'], 1, 'Cumplía las normas, pero casi nadie lo reconocía como aceptable.', 'Compara lo que dice la norma con lo que aceptó la gente.')],
    ['icf-sc-modelos-1', 'El gobierno dirige por un tiempo.', Q('La frase «fueron elegidos para dirigir, no para entregar lo que hicimos nosotros» distingue entre:', ['Etnia y género', 'Nación y cultura', 'El gobierno de turno y lo que pertenece a la comunidad', 'La clase alta y la clase baja'], 2, 'El vecino reconoce que pueden dirigir, pero no disponer de lo construido por todos.', 'Pregunta qué les reconoce y qué les niega.')],
    ['icf-sc-modelos-1', 'La cultura son modos de vivir y creer.', Q('Que la comunidad indígena considere sagrado el nacimiento muestra que:', ['El agua es también un asunto cultural', 'El agua no sirve para beber', 'El acueducto es ilegal', 'La alcaldía es indígena'], 0, 'Un mismo lugar tiene un sentido que viene de los modos de creer de un grupo.', 'Relee qué significa el nacimiento para esa comunidad.')],
    ['icf-sc-modelos-2', 'Cada lógica responde distinto quién decide y quién paga.', Q('La forma en que la junta manejaba el acueducto al comienzo corresponde sobre todo a una lógica:', ['Liberal', 'De bienestar', 'Colonial', 'Comunitaria'], 3, 'Decisión de vecinos, convite y cuidado común.', 'Mira quién decide y cómo se trabaja.')],
    ['icf-sc-modelos-2', 'Propiedad pública y subsidio.', Q('La propuesta de la concejala pone primero:', ['La igualdad, porque quien más tiene ayuda a quien menos tiene', 'La libertad de escoger empresa', 'La competencia', 'El lucro del municipio'], 0, 'Las casas de mayor valor subsidian a las de menor valor.', 'Relee quién pagaría más y para qué.')],
    ['icf-sc-modelos-2', 'Comparar respuestas, no nombres.', Q('El cuadro del profesor sirve para:', ['Mostrar que todas son iguales', 'Escoger la más barata', 'Comparar propuestas con los mismos criterios', 'Defender a la empresa'], 2, 'Las mismas preguntas se aplican a cada propuesta.', 'Mira qué puso en las filas y qué pidió.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-indaga.js
// Preicfes · Ciencias Naturales · mundo 1 «Indagación Científica» (spec 2026-11-20-curso-preicfes): la competencia que más
// pregunta la prueba de ciencias: la pregunta de un experimento, sus variables, el control, los datos y qué se puede concluir.
// Estándar de diez: el experimento se lee con juegos LEC y sus datos se manejan con juegos de lienzo; un juego en movimiento y la
// zona de examen al final. Experimentos escritos para Zuka (los resultados siguen lo que pasa de verdad).
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc } = ICF;

  const FRIJOL = {
    id: 'icf-frijol', title: 'Frijoles a oscuras',
    ficha: { autor: 'Grupo de ciencias de un colegio público', fuente: 'Informe de laboratorio de grado once', fecha: 'Abril de 2026' },
    paras: [
      'Un grupo de grado once se preguntó si la cantidad de luz que recibe una planta de frijol cambia lo que crece en sus primeras dos semanas de vida.',
      'Antes de empezar escribieron su hipótesis: «Las plantas que reciben más horas de luz crecerán más altas». Les parecía evidente, porque las plantas necesitan luz para fabricar su alimento.',
      'Sembraron 40 semillas del mismo paquete en 40 vasos con la misma tierra y las repartieron en cuatro grupos de diez. Cada grupo recibió 0, 4, 8 o 12 horas diarias de luz de una lámpara, dentro de cajas que se mantuvieron a la misma temperatura. Todas recibieron 20 mililitros de agua al día. Lo único que cambiaba de un grupo a otro era la luz.',
      'A los 14 días midieron la altura de cada plántula y contaron sus hojas. Germinaron casi todas las semillas en los cuatro grupos. La altura promedio fue de 12 cm en el grupo sin luz, 10 cm con 4 horas, 8 cm con 8 horas y 7 cm con 12 horas. Las plántulas que crecieron a oscuras eran amarillas, delgadas y casi no tenían hojas; las de 12 horas eran verdes, gruesas y tenían en promedio seis hojas.',
      'El resultado contradijo la hipótesis. La profesora les explicó que una plántula a oscuras se estira buscando la luz, con la energía que tenía guardada en la semilla: es más alta, pero no más sana. El grupo concluyó que la altura no era una buena medida de lo que querían saber.',
      'Para mejorar el estudio propusieron medir también la masa de las plantas secas y repetir el experimento con otra variedad de frijol, para saber si el resultado se mantiene.',
    ],
  };

  const PENDULO = {
    id: 'icf-pendulo', title: 'El péndulo de la clase',
    ficha: { autor: 'Profesora de física', fuente: 'Bitácora de laboratorio', fecha: 'Mayo de 2026' },
    paras: [
      'En una clase de física, dos equipos se preguntaron de qué depende el tiempo que tarda un péndulo en ir y volver, lo que se llama su período. El equipo de Samuel pensaba que dependía de la masa: una pesa más pesada debería oscilar más rápido. El equipo de Lucía creía que dependía de la longitud de la cuerda.',
      'Para probar la primera idea, ataron a una cuerda de un metro pesas de 50, 100 y 200 gramos. Soltaron cada una desde el mismo ángulo pequeño y midieron con un cronómetro el tiempo de diez oscilaciones completas, para dividirlo después entre diez. El período fue de 2.0 segundos en los tres casos.',
      'Para probar la segunda, usaron siempre la pesa de 100 gramos y cambiaron la longitud: 25, 50, 100 y 200 centímetros. Los períodos fueron 1.0, 1.4, 2.0 y 2.8 segundos. Al cuadruplicar la longitud, de 25 a 100 centímetros, el período se duplicó.',
      'Samuel propuso una conclusión: «Ninguna variable importa mucho, porque el período casi no cambió». Lucía le mostró la tabla: con la masa el período no cambió nada, pero con la longitud sí, y siempre en la misma dirección: a mayor longitud, mayor período. Además, la relación no es proporcional, porque duplicar la longitud no duplica el período.',
      'La profesora agregó dos advertencias. Primero, medir diez oscilaciones y dividir reduce el error del cronómetro, que depende de los reflejos de quien lo maneja. Segundo, los resultados valen para ángulos pequeños; con oscilaciones muy amplias el período cambia un poco.',
      'Al final, los dos equipos escribieron una conclusión común: en sus mediciones, el período depende de la longitud de la cuerda y no de la masa de la pesa.',
    ],
  };

  const l1 = leccion('icf-cn-indaga-1', 'Preguntas, variables y control', [
    sc(6, 'Casi un tercio de la prueba de Ciencias es **indagación**: no pregunta un dato de memoria, sino cómo se averigua algo con un experimento.', { title: 'Cómo se averigua' }),
    sc(7, 'Todo experimento empieza con una **pregunta** y una **hipótesis**, una respuesta posible que se puede poner a prueba.', { title: 'Pregunta e hipótesis' }),
    sc(7, 'La **variable independiente** es la que el investigador cambia; la **dependiente**, la que mide para ver el efecto; las **controladas** se mantienen iguales para que no confundan el resultado.', { title: 'Tres clases de variables' }),
    sc(7, 'Ejemplo: para saber si el abono hace crecer más el pasto, se abonan unas macetas y otras no, con la misma semilla, la misma agua y la misma luz. Si se riega más a las abonadas, ya no se sabe qué causó la diferencia.', { title: 'Cambiar una sola cosa' }),
    sc(6, 'Un resultado que contradice la hipótesis no es un fracaso: es información. La hipótesis se corrige y el experimento se mejora.', { title: 'Cuando la hipótesis falla' }),
  ], [
    x('descarta-prueba', 'Estas tres afirmaciones son falsas. Ata cada una a la oración que la desmiente.', { doc: FRIJOL, nums: [3, 4, 5], pregunta: 'Queda en pie', queda: 'La única diferencia entre los grupos fue la luz.',
      ...T(['Cada grupo recibió distinta agua.', [2, 3], 'Busca qué recibieron todas o qué cambiaba entre los grupos.'], ['Sin luz, las semillas no germinan.', 5, 'Busca la oración que dice cuántas germinaron.'], ['Los datos confirmaron la hipótesis.', 8, 'Busca la oración que compara resultado e hipótesis.']), bien: 'Los datos mandan sobre lo que uno esperaba.' },
      'Todas recibieron 20 mililitros, germinaron casi todas y el resultado contradijo la hipótesis.', 'Busca la palabra clave de cada afirmación: agua, germinar, hipótesis.'),
    x('genero-o-cita', 'En el experimento de los frijoles, ¿qué **cambió** a propósito el grupo y qué no?', { doc: FRIJOL, rot: ['lo que cambiaron', 'lo que midieron o dejaron igual'],
      ...F(['Las horas de luz', 0, '¿Los cuatro grupos recibieron lo mismo?'], ['La altura a los 14 días', 1, '¿La escogieron ellos o la leyeron con la regla?'], ['El agua diaria', 1, '¿Los cuatro grupos recibieron cantidades distintas?'], ['La tierra de los vasos', 1, '¿Los cuatro grupos tenían tierras distintas?'], ['El número de hojas', 1, '¿Lo decidieron antes o lo contaron al final?']), luz: [[3, 'Lo único que cambiaba de un grupo a otro era la luz']], bien: 'Se cambia una sola cosa; lo demás se mide o se controla.' },
      'La luz es la variable independiente; la altura y las hojas se miden; el agua y la tierra se controlan.', 'Pregunta por cada una: ¿la decidieron distinta para cada grupo?'),
    x('pista-tipo', 'Ata cada parte de la investigación a su oración.', { doc: FRIJOL, lineas: ['¿Cambia la luz lo que crece una planta de frijol?', 'Con más luz crecerán más altas.', 'La altura promedio sin luz fue de 12 cm.', 'La altura no era una buena medida.'],
      ...T(['la pregunta', 0, 'Busca la oración que no afirma nada todavía.'], ['la hipótesis', 1, 'Busca lo que se espera antes de medir.'], ['un resultado', 2, 'Busca un dato leído con un instrumento.'], ['una conclusión', 3, 'Busca lo que se piensa después de ver los datos.']), bien: 'Pregunta, hipótesis, resultado y conclusión.' },
      'La pregunta abre, la hipótesis predice, el resultado es un dato medido y la conclusión interpreta.', 'Piensa cuándo se escribe cada cosa: antes de medir, al medir o después.'),
    x('balanza-tesis', 'Conclusión: «a oscuras el frijol se estira, pero no crece más sano». ¿Qué hace cada dato?', { doc: FRIJOL, tesis: 'A oscuras se estira, pero no crece más sano',
      ...F(['Sin luz eran altas, amarillas y sin hojas.', 0, '¿Muestra altura y mala salud a la vez?'], ['Con 12 horas tenían más masa seca.', 0, 'Más masa, ¿habla de mejor o de peor crecimiento?'], ['A oscuras, otra variedad tuvo más hojas y masa.', 1, '¿Crecieron mejor o peor sin luz?'], ['Los vasos eran blancos.', 2, '¿Tiene que ver con la luz o con la salud?']), bien: 'Un dato pesa si cambia lo que se puede concluir.' },
      'Altas y amarillas, y más masa con luz, apoyan; una variedad más sana a oscuras debilita; el color del vaso no pesa.', 'Supón que cada dato es cierto: ¿creerías más o menos en la conclusión?'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FRIJOL, nums: [4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Con 12 horas tuvieron unas seis hojas.', 0, 'Léela junto a la última oración del párrafo 4.'], ['A más luz, menos altura.', 1, 'No está escrita: mira las cuatro alturas en orden.'], ['Con 24 horas no crecerían.', 2, '¿Probaron ese número de horas?'], ['La plántula a oscuras es más alta, pero no más sana.', 0, 'Léela junto a la explicación de la profesora.']),
      luz: [[4, '12 cm en el grupo sin luz, 10 cm con 4 horas'], [5, 'es más alta, pero no más sana']], bien: 'Lo que no se probó no se puede afirmar.' },
      'Las hojas y la salud están escritas; la tendencia sale de los cuatro datos; 24 horas no se probaron.', 'Mira hasta dónde llegan los datos: más allá de ellos solo se puede suponer.'),
    x('lee-escala', 'La gráfica muestra la altura promedio de tres grupos. Pon la altura de **cada uno** y cuánto suman.', { vals: [12, 10, 7], rot: ['0 h', '4 h', '12 h'], hi: 16, st: 4, et: ['0 h', '4 h', '12 h', 'suma'], ops: ['+', '+', '='], metas: ['12', '10', '7', '29'], fichas: ['12', '10', '7', '29', '9', '8', '3'],
      mira: ['Mira en qué línea termina la barra.', 'Está a mitad de camino entre 8 y 12.', 'Está un poco abajo de la línea del 8.', 'Suma las tres barras.'], trampas: { '1:9': 'Entre 8 y 12 hay 4: la mitad son 2 más que 8.', '2:8': 'No alcanza la línea del 8.', '2:3': 'Cada línea vale 4: cuenta desde abajo.' }, ok: 'La escala manda: aquí va de 4 en 4.' },
      'Las líneas van de 4 en 4: 12 cae en una línea, 10 está a la mitad entre 8 y 12, y 7 un poco abajo de 8.', 'Antes de leer, mira cuánto vale cada línea del eje y cuánto es la mitad de ese espacio.'),
    sol('Una estudiante quiere saber si la temperatura del agua cambia el tiempo que tarda en disolverse una pastilla efervescente. ¿Cómo debe organizar su experimento?',
      ['La variable que ella cambia es [[la temperatura del agua]]', 'La variable que mide es [[el tiempo de disolución]]', 'Debe mantener igual [[la cantidad de agua]] y el tipo de pastilla', 'Para confiar en el resultado, cada temperatura se prueba [[varias veces]]'],
      ['una sola vez', 'la opinión de sus compañeros', 'el color de la pastilla al final'],
      'La temperatura es la independiente y el tiempo la dependiente. Si cambiara también la cantidad de agua, no sabría qué causó la diferencia; y repetir cada prueba reduce el efecto de los errores al medir.',
      'Pregúntate qué cambia ella a propósito, qué mide con el cronómetro y qué podría confundir el resultado si no lo deja igual.'),
    err('Para saber si un fertilizante hace crecer más el maíz, un agricultor diseña este experimento.',
      ['Siembra dos parcelas iguales con la misma semilla', 'A la parcela A le pone fertilizante y a la B no', 'Riega la parcela A todos los días y la B una vez por semana', 'Al mes compara la altura de las plantas de las dos parcelas'], 2,
      ['Riega las dos parcelas con la misma cantidad y frecuencia', 'Riega la parcela B todos los días y la A una vez por semana', 'Riega más la parcela que vaya creciendo menos'],
      'El riego distinto agrega una segunda diferencia: si A crece más, no se sabría si fue el fertilizante o el agua. El agua debe ser una variable controlada, igual en las dos parcelas.',
      'Busca el paso en que las dos parcelas dejan de ser iguales en algo distinto del fertilizante.'),
    opc('Una investigadora quiere saber si la cantidad de sal en el agua afecta la germinación de semillas de rábano. Pone 20 semillas en cada uno de cuatro platos con agua que tiene 0, 1, 2 y 4 gramos de sal por litro. ¿Cuál de las siguientes condiciones debe ser igual en los cuatro platos?',
      ['La cantidad de sal del agua', 'El número de semillas que germinan', 'La temperatura y la luz que reciben', 'El tiempo que tarda cada semilla en germinar'], 2,
      'La sal es la variable que ella cambia y las semillas que germinan (y cuándo) son lo que mide. La temperatura y la luz deben ser iguales para que no confundan el resultado.',
      'Separa lo que se cambia a propósito, lo que se mide y lo que hay que dejar fijo.'),
  ]);

  const l2 = leccion('icf-cn-indaga-2', 'Datos y conclusiones', [
    sc(6, 'Una conclusión vale si los datos la respaldan. La prueba pregunta mucho: «¿cuál conclusión es válida según la tabla?».', { title: 'Lo que dicen los datos' }),
    sc(7, 'Una variable **no influye** si al cambiarla el resultado no cambia; **influye** si el resultado cambia siempre en la misma dirección.', { title: 'Influye o no influye' }),
    sc(7, 'Ejemplo: si al duplicar la carga de una bicicleta el frenado pasa de 4 a 8 metros, la relación parece **proporcional**. Si pasa de 4 a 6, aumenta, pero no es proporcional.', { title: 'Proporcional o solo creciente' }),
    sc(7, 'Repetir una medición y promediar reduce el error. Y una conclusión solo vale para las condiciones medidas: no se puede extender a lo que nadie probó.', { title: 'Errores y límites' }),
    sc(6, 'Muchos fenómenos crecen o decrecen por multiplicación: las bacterias se duplican y los medicamentos se reducen a la mitad. Se reconocen porque cada paso multiplica por lo mismo.', { title: 'Patrones que multiplican' }),
  ], [
    x('ajusta-alcance', 'Mueve cada perilla hasta que la conclusión diga lo que muestran los datos del péndulo.', { doc: PENDULO, filas: [{ antes: 'Al cambiar la masa, el período', topes: ['aumenta', 'no cambia', 'disminuye'], va: 1 }, { antes: 'Al alargar la cuerda, el período', topes: ['disminuye', 'no cambia', 'aumenta'], va: 2 }, { antes: 'Si la longitud se cuadruplica, el período', topes: ['se duplica', 'se triplica', 'se cuadruplica'], va: 0 }], mira: ['Relee los tres casos del párrafo 2.', 'Mira los cuatro períodos del párrafo 3 en orden.', 'Compara el período de 25 con el de 100 centímetros.'], luz: [[2, '2.0 segundos en los tres casos'], [3, '1.0, 1.4, 2.0 y 2.8 segundos'], [3, 'el período se duplicó']], bien: 'Cada conclusión, con su dato.' },
      'Con la masa dio 2.0 s siempre; con la longitud subió de 1.0 a 2.8 s; de 25 a 100 cm pasó de 1.0 a 2.0 s.', 'Lleva cada frase a su serie de datos y compara el primero con el último.'),
    x('pinta-tipos', 'Pinta cada oración: ¿es un **dato**, una **hipótesis** o una **conclusión**?', { doc: PENDULO, plumas: ['dato', 'hipótesis', 'conclusión'],
      ...P(['Una pesa más pesada debería oscilar más rápido.', 1, '¿Se midió ya o se espera que pase?'], ['El período fue de 2.0 segundos.', 0, '¿Se leyó en un instrumento o se pensó después?'], ['El período depende de la longitud y no de la masa.', 2, '¿Es una medida o una idea que las junta?'], ['Con 200 cm tardó 2.8 segundos.', 0, '¿Se leyó en un instrumento o se pensó después?']), bien: 'Se espera, se mide y se concluye.' },
      'La hipótesis se dice antes de medir, el dato se lee en el cronómetro y la conclusión junta los datos.', 'Pregúntate si la oración sale del cronómetro, de antes de usarlo o de mirar toda la tabla.'),
    x('pasos-del-proceso', 'Ordena cómo se prueba una idea. El primer paso está en su puesto.', { que: 'el método', de: 'La prueba de la longitud', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Preguntarse de qué depende el período.', 'Proponer que depende de la longitud.', 'Fijar la masa y el ángulo y cambiar la cuerda.', 'Medir diez oscilaciones con cada cuerda.', 'Comparar los períodos y concluir.'], mira: ['', 'La propuesta responde una pregunta que ya se hizo.', 'El diseño prueba una propuesta que ya se tiene.', 'Se mide cuando ya se sabe qué se cambia.', 'Se compara lo que ya se midió.'], bien: 'Pregunta, hipótesis, diseño, medida y conclusión.' },
      'Se pregunta, se propone, se diseña cambiando una sola cosa, se mide y solo al final se concluye.', 'Cada paso usa lo que dejó el anterior: ¿qué hace falta tener antes?'),
    x('comprueba-apuesta', 'Subraya la oración del párrafo 4 que muestra por qué Samuel se **equivoca**.', { doc: PENDULO, nums: [4], apuesta: 'Ninguna variable importa mucho.', ...S(['4.1'], { '4.0': 'Es lo que dijo Samuel, no lo que lo desmiente.', '4.2': 'Agrega cómo es la relación; que sí exista ya se dijo antes.' }), bien: 'Con la longitud sí cambia, y siempre en la misma dirección.' },
      'Lucía separa las dos series: con la masa no cambia nada, pero con la longitud crece siempre.', 'Busca la oración que compara las dos variables con la tabla en la mano.'),
    x('genero-o-cita', 'Para probar **solo** la longitud, ¿sirve esta prueba?', { doc: PENDULO, rot: ['sí sirve', 'mezcla variables'],
      ...F(['Misma pesa y ángulo, cuerdas de 40 y 80 cm', 0, '¿Cuántas cosas cambian entre las dos?'], ['Pesa grande en cuerda larga, chica en corta', 1, '¿Cuántas cosas cambian entre las dos?'], ['Misma pesa y ángulo, cinco cuerdas distintas', 0, '¿Cuántas cosas cambian entre las cinco?'], ['Cuerda larga con ángulo grande, corta con chico', 1, 'Además de la cuerda, ¿cambia algo más?']), bien: 'Si cambian dos cosas, no se sabe cuál fue.' },
      'Solo sirven las pruebas en las que la cuerda es lo único distinto; en las otras no se sabe a qué se debe el cambio.', 'Cuenta cuántas cosas cambian de una medida a la otra: solo puede ser una.'),
    x('mayor-tramo', 'La gráfica muestra el período (en décimas de segundo) con 25, 50, 100 y 200 cm. Toca el tramo que más creció **en porcentaje**.', { v: [10, 14, 20, 28] },
      'De 10 a 14 y de 20 a 28 sube el 40 %; de 14 a 20 sube 6 de 14, cerca del 43 %: ese es el mayor, aunque el último suba más décimas.', 'Divide lo que subió cada tramo entre el valor con que empezó ese tramo.'),
    sol('Una estudiante calienta agua y registra la temperatura cada minuto: 20, 26, 32, 38 y 44 °C en los minutos 0 a 4. Si la tendencia sigue igual, ¿qué temperatura tendrá a los 7 minutos y hasta cuándo vale la predicción?',
      ['Cada minuto la temperatura sube [[6]] °C', 'A los 7 minutos: 20 °C más 7 veces lo que sube por minuto, [[62]] °C', 'La temperatura cambia de forma [[constante]] mientras se calienta', 'La predicción vale solo hasta que el agua llegue a unos [[100]] °C, donde hierve'],
      ['44', 'variable', '50'],
      'Los datos suben 6 °C por minuto, así que a los 7 minutos el agua estaría a 62 °C. La tendencia no sigue para siempre: al hervir, la temperatura deja de subir aunque se siga calentando.',
      'Halla cuánto sube por minuto restando dos datos seguidos, y piensa qué le pasa al agua cuando hierve.'),
    err('Un estudiante cuelga masas de un resorte y mide cuánto se estira: 100 g, 2 cm; 200 g, 4 cm; 300 g, 6 cm. Este es su análisis.',
      ['Cada 100 g, el resorte se estira 2 cm más', 'El estiramiento es directamente proporcional a la masa', 'Con 500 g el resorte se estirará 8 cm', 'Con 50 g se estirará 1 cm'], 2,
      ['Con 500 g el resorte se estirará 10 cm', 'Con 500 g el resorte se estirará 5 cm', 'Con 500 g el resorte ya no se estirará más'],
      'Si son proporcionales, 500 g son 5 veces 100 g: $5 \\cdot 2 = 10$ cm. El 8 sale de sumar 2 cm a los 6 que había con 300 g, como si 500 g fueran solo 100 g más.',
      'Revisa la predicción con 500 g: ¿cuántas veces cabe 100 g en 500 g?'),
    opc('Una investigadora mide el oxígeno disuelto en un río en cinco puntos, desde su nacimiento hasta la salida de una ciudad: 9, 9, 8, 5 y 3 mg/L. Los dos últimos puntos están después de una descarga de aguas residuales. La conclusión mejor respaldada por estos datos es:',
      ['Las aguas residuales son la única causa de la falta de oxígeno en todos los ríos', 'El oxígeno del río aumenta a medida que se acerca a la ciudad', 'En el nacimiento del río no hay peces', 'En este río hay menos oxígeno después de la descarga de aguas residuales'], 3,
      'Los datos muestran que el oxígeno baja a 5 y 3 mg/L justo después de la descarga. No permiten hablar de todos los ríos ni de los peces, y el oxígeno disminuye, no aumenta.',
      'Descarta las conclusiones que hablan de algo que no se midió o que van más allá de este río.'),
  ]);

  return mundo('icf-cn-indaga', 'Indagación Científica', 'ciencias', [l1, l2], [
    ['icf-cn-indaga-1', 'Dos variables son inversamente proporcionales cuando su producto se mantiene.',
      play('grafica-relacion', 'A temperatura constante, un gas ocupa 6 L con una presión de 2 atm. Si presión y volumen son inversamente proporcionales, mueve los puntos', { kind: 'inversa', k: 12, given: [[2, 6]], xs: [3, 4, 6], tol: 0.25, xmax: 8, ymax: 8 },
        'El producto presión por volumen se mantiene en 12: con 3 atm, 4 L; con 4 atm, 3 L; con 6 atm, 2 L.', { hint: 'Multiplica las coordenadas del punto dado: ese producto debe ser igual en todos los puntos.' })],
    ['icf-cn-indaga-1', 'Antes de leer una barra, mira cuánto vale cada raya de la escala.',
      play('lee-barras', 'Plantas de tomate con distintas dosis de abono: altura a las tres semanas, en cm. ¿Cuánto mide el grupo C?', { rounds: [{ bars: [['A', 18], ['B', 24], ['C', 27], ['D', 21]], hi: 30, step: 6, q: 'val', a: 2, max: 30, tstep: 1 }] },
        'Las rayas van de 6 en 6: la barra C llega a la mitad entre 24 y 30, es decir, 27 cm.', { hint: 'Calcula cuánto vale cada raya del eje y ubica la barra entre dos de ellas.' })],
    ['icf-cn-indaga-1', 'La variable dependiente es la que se mide para ver el efecto de la que se cambia.',
      opc('Un estudiante quiere saber si la cantidad de sal disuelta cambia la temperatura a la que se congela el agua. Prepara vasos con 0, 5, 10 y 15 g de sal en 100 mL de agua y los pone en el mismo congelador. La variable dependiente de su experimento es:',
        ['La cantidad de sal de cada vaso', 'La cantidad de agua de cada vaso', 'La temperatura a la que se congela el agua', 'El congelador que usa'], 2,
        'Él cambia la sal (independiente) y mide la temperatura de congelación (dependiente). El agua y el congelador son iguales en todos los vasos: son variables controladas.', 'Pregúntate qué mide el estudiante al final para saber si la sal tuvo efecto.')],
    ['icf-cn-indaga-2', 'Cuando una cantidad se reduce a la mitad cada cierto tiempo, se cuentan las mitades.',
      play('media-vida', 'Una muestra de 160 g de una sustancia radiactiva se reduce a la mitad cada 5 horas. ¿Cuándo quedan 20 g?', { rounds: [{ A0: 160, T: 5, target: 20, thing: 'sustancia', unit: 'g' }] },
        '160, 80, 40 y 20 g: tres medias vidas, 15 horas.', { hint: 'Parte 160 por la mitad hasta llegar a 20 y cuenta cuántas veces lo hiciste.' })],
    ['icf-cn-indaga-2', 'En una mezcla, el porcentaje compara una parte con el total.',
      play('mezcla', 'Hay 40 g de alcohol. Añade agua hasta que la solución tenga 25 % de alcohol', { solute: 40, target: 25, step: 10, max: 300 },
        'Si 40 g son el 25 %, la mezcla pesa 160 g: se añaden 120 g de agua.', { hint: 'El alcohol tiene que ser la cuarta parte de toda la mezcla.' })],
    ['icf-cn-indaga-2', 'Una conclusión válida describe lo que muestran los datos medidos, sin ir más allá.',
      opc('En el experimento de la sal, los vasos con 0, 5, 10 y 15 g de sal se congelaron a 0, −3, −6 y −9 °C. La conclusión que mejor se apoya en estos datos es:',
        ['La sal hace que el agua hierva a menor temperatura', 'A más sal disuelta, más baja es la temperatura a la que se congela el agua', 'Con 20 g de sal el agua ya no se congela nunca', 'La sal no tiene ningún efecto sobre el agua'], 1,
        'Cada 5 g de sal bajan 3 °C la temperatura de congelación. Nadie midió la ebullición ni 20 g de sal, y los datos sí muestran un efecto.', 'Quédate con la opción que describe la tendencia de la tabla sin hablar de lo que no se midió.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-celula.js
// Preicfes · Ciencias Naturales · mundo 2 «Célula y Organismos» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const PAPA = {
    id: 'icf-papa', title: 'La papa que pesó distinto',
    ficha: { autor: 'Grupo de biología de grado once', fuente: 'Informe de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'Toda célula está rodeada por una membrana que deja pasar unas sustancias y otras no. El agua la atraviesa con facilidad; la sal, muy poco. Un grupo quiso ver qué ocurre con las células de una papa en agua con distinta cantidad de sal.',
      'Cortaron doce cilindros iguales de una misma papa, los pesaron y los repartieron en cuatro vasos: agua destilada y soluciones con 1 %, 3 % y 5 % de sal. A la media hora los secaron con papel y volvieron a pesarlos.',
      'En agua destilada los cilindros aumentaron su masa 8 %; con 1 % de sal casi no cambiaron; con 3 % perdieron 6 % y con 5 %, 11 %. Los del agua destilada quedaron rígidos; los de 5 %, blandos.',
      'La explicación es la ósmosis: el agua pasa por la membrana hacia donde hay más sal disuelta. En agua destilada hay más sal dentro de la célula, así que el agua entra. En la solución de 5 % hay más sal afuera, y el agua sale.',
      'Con 1 % la cantidad de sal era parecida adentro y afuera; por eso entraba tanta agua como salía. Las células vegetales, además, tienen una pared rígida que impide que se revienten cuando se llenan de agua. Un glóbulo rojo, que no la tiene, sí se rompe en agua destilada.',
      'La ósmosis no gasta energía de la célula. Para mover sustancias en sentido contrario, de donde hay menos a donde hay más, la célula debe usar energía: es el transporte activo.',
    ],
  };
  const l1 = leccion('icf-cn-celula-1', 'Célula y transporte', guion(
    ['La puerta', 'La membrana decide qué entra y qué sale: el agua pasa fácil; la sal, muy poco.'],
    ['Ósmosis', 'El agua va hacia donde hay más sal disuelta.'],
    ['Sin gasto o con gasto', 'Ir a favor no gasta energía; ir en contra, de menos a más, sí: transporte activo.'],
    ['La pared', 'Las células vegetales tienen pared: se ponen rígidas en vez de reventar.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que da la **regla** de la ósmosis.', { doc: PAPA, nums: [4], apuesta: 'El agua se mueve hacia donde hay más sal.', ...S(['4.0'], { '4.1': 'Aplica la regla al agua destilada.', '4.2': 'Aplica la regla a la solución de 5 %.' }), bien: 'Lo demás son casos de la regla.' },
      'La primera oración enuncia la regla; las otras dos la aplican a cada vaso.', 'Busca la oración que vale para cualquier vaso.'),
    x('genero-o-cita', '¿Hacia dónde va el agua: **entra** a la célula o **sale**?', { doc: PAPA, rot: ['entra', 'sale'],
      ...F(['Papa en agua destilada', 0, '¿Dónde hay más sal: adentro o afuera?'], ['Papa en sal al 5 %', 1, '¿Dónde hay más sal: adentro o afuera?'], ['Lechuga salada en la ensalada', 1, '¿Dónde quedó la sal?'], ['Uva pasa en agua pura', 0, '¿Dónde hay más azúcar disuelto?']), bien: 'El agua va hacia donde hay más disuelto.' },
      'En agua pura hay más soluto dentro y el agua entra; con sal afuera, sale.', 'Compara dónde hay más sustancia disuelta: hacia allá va el agua.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PAPA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'Con 1 % entraba tanta agua como salía.',
      ...T(['Con 3 % de sal la masa aumentó.', 0, 'Busca los cambios de masa.'], ['Un glóbulo rojo resiste en agua destilada.', 4, 'Busca qué pasa con los glóbulos.'], ['La ósmosis gasta energía.', 5, 'Busca lo que no gasta la célula.']), bien: 'Los datos y la explicación coinciden.' },
      'Con 3 % perdieron masa, el glóbulo se rompe y la ósmosis no gasta energía.', 'Busca la palabra clave de cada afirmación en el texto.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: PAPA, filas: [{ antes: 'Al aumentar la sal de 1 % a 5 %, la masa', topes: ['sube', 'baja', 'no cambia'], va: 1 }, { antes: 'Con 1 % de sal, la masa', topes: ['casi no cambia', 'se duplica', 'se pierde toda'], va: 0 }, { antes: 'La variable que cambió el grupo fue', topes: ['la papa', 'el tiempo', 'la sal'], va: 2 }], mira: ['Compara 1 %, 3 % y 5 % en orden.', 'Relee la primera oración del párrafo 3.', 'Relee en qué se diferenciaban los vasos.'], luz: [[3, 'perdieron 6 %'], [3, 'casi no cambiaron'], [2, '1 %, 3 % y 5 % de sal']], bien: 'Cada frase, con su dato.' },
      'De 1 % a 5 % la masa baja cada vez más; con 1 % casi no cambia, y lo único distinto era la sal.', 'Lee los datos en orden, de menos sal a más sal.'),
    x('pista-tipo', 'Ata cada papel a lo que le corresponde en el experimento.', { doc: PAPA, lineas: ['La cantidad de sal del agua', 'El cambio de masa', 'El tamaño de los cilindros', 'El agua pasa hacia donde hay más sal'],
      ...T(['variable independiente', 0, '¿Qué cambió el grupo a propósito?'], ['variable dependiente', 1, '¿Qué midieron para ver el efecto?'], ['variable controlada', 2, '¿Qué dejaron igual?'], ['explicación', 3, '¿Qué dice por qué ocurre?']), bien: 'Tres papeles y una explicación.' },
      'La sal se cambia, la masa se mide, el tamaño se controla y la ósmosis explica.', 'Pregunta qué se cambió, qué se midió y qué se dejó igual.'),
    x('lee-escala', 'En otro experimento, la gráfica muestra cuánta masa **perdieron** unos cilindros (en décimas de %). Pon cada valor y la diferencia entre 5 % y 3 %.', { vals: [60, 110, 80], rot: ['3 %', '5 %', '4 %'], hi: 120, st: 40, et: ['3 %', '5 %', '4 %', '5 % menos 3 %'], ops: ['', '', ''], metas: ['60', '110', '80', '50'], fichas: ['60', '110', '80', '50', '45', '85', '170'],
      mira: ['Está a mitad de camino entre 40 y 80.', 'Está a tres cuartos del camino entre 80 y 120.', 'Mira en qué línea termina.', 'Resta la de 3 % a la de 5 %.'], trampas: { '0:45': 'Cada línea vale 40: la mitad son 20, no 5.', '1:85': 'Cada línea vale 40: tres cuartos son 30, no 5.', '3:170': 'Eso es la suma.' }, ok: 'La escala manda.' },
      'Las líneas van de 40 en 40: 60 y 110 no caen en una línea, 80 sí. La diferencia es $110 - 60 = 50$.', 'Mira cuánto vale cada línea y qué parte del espacio alcanza la barra.'),
    sol('En un vaso con 2 % de sal, un cilindro de papa de 25 g queda en 24 g. ¿Qué porcentaje de su masa perdió y qué ocurrió con el agua?', ['Perdió $25 - 24 =$ [[1]] gramo', 'Es $1 \\div 25 =$ [[0.04]], es decir, el [[4]] %', 'El agua [[salió]] de las células'], ['25', '0.25', 'entró'], 'El cambio se compara con la masa inicial: 4 %. Si perdió masa, salió agua.', 'Divide lo que cambió entre la masa del comienzo.'),
    err('Un estudiante explica por qué se marchita una lechuga con sal.', ['La sal queda afuera de las células', 'Hay más sal afuera que adentro', 'El agua entra a las células', 'Las células pierden rigidez'], 2, ['El agua sale de las células', 'La sal entra rápido a las células', 'La pared de las células se rompe'], 'El agua va hacia donde hay más sal, que es afuera: sale y la hoja se ablanda.', 'Aplica la regla: ¿hacia dónde va el agua si hay más sal afuera?'),
    opc('A una persona deshidratada no se le inyecta agua destilada en la sangre, sino suero con una cantidad de sal parecida a la de la sangre. Esto se hace porque con agua destilada:', ['Los glóbulos rojos perderían agua y se arrugarían', 'El agua entraría a los glóbulos rojos y podrían romperse', 'La sal de los glóbulos gastaría energía', 'La membrana de los glóbulos dejaría de existir'], 1, 'Dentro del glóbulo habría más sal que afuera: el agua entra y, como no tiene pared, puede reventar.', 'Decide dónde habría más sal y recuerda que el glóbulo no tiene pared.'),
  ]);

  const AZUCAR = {
    id: 'icf-glucosa', title: 'El termostato del azúcar',
    ficha: { autor: 'Equipo de un hospital universitario', fuente: 'Boletín de salud', fecha: 'Marzo de 2026' },
    paras: [
      'Nuestro cuerpo trabaja para que su interior cambie poco aunque afuera cambie mucho. A ese equilibrio se le llama homeostasis. La temperatura, el agua y el azúcar de la sangre se mantienen dentro de ciertos límites gracias a varios sistemas que se avisan unos a otros.',
      'Después de comer, el sistema digestivo rompe los alimentos en moléculas pequeñas. La glucosa pasa del intestino delgado a la sangre y el sistema circulatorio la reparte. El páncreas, que pertenece al sistema endocrino, detecta que la glucosa subió y libera insulina, una hormona que ayuda a las células a tomarla.',
      'Para comprobarlo, se midió la glucosa de dos voluntarios antes de un desayuno y cada hora después. En la persona A los valores fueron 90, 130, 105 y 90 miligramos por decilitro. En la persona B, 140, 240, 230 y 210.',
      'En A la glucosa subió y volvió a su valor inicial: su cuerpo respondió. En B subió mucho más y a las tres horas seguía alta. Los médicos sospecharon que su cuerpo produce poca insulina o no responde bien a ella, como ocurre en la diabetes; para confirmarlo pidieron más exámenes.',
      'El ejercicio también participa. Al moverse, los músculos gastan glucosa y piden más oxígeno; entonces el corazón late más rápido y la respiración se acelera. El dióxido de carbono que producen las células sale por los pulmones, y el calor sobrante, con el sudor.',
      'Ningún sistema trabaja solo. Si los riñones fallan, los desechos se acumulan en la sangre aunque el corazón esté sano; si los pulmones fallan, al músculo le falta oxígeno aunque haya glucosa de sobra.',
    ],
  };
  const l2 = leccion('icf-cn-celula-2', 'Sistemas del cuerpo y homeostasis', guion(
    ['Equilibrio', 'Homeostasis: mantener el interior estable aunque afuera cambie.'],
    ['El aviso', 'Sube la glucosa, el páncreas libera insulina y las células la toman: la glucosa baja.'],
    ['Trabajo en equipo', 'Digestivo, circulatorio, respiratorio, excretor y endocrino dependen unos de otros.'],
    ['Leer la curva', 'Lo importante es si el valor vuelve al punto de partida.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: AZUCAR,
      ...F(['¿Qué es la homeostasis?', 0, 'Busca el comienzo que habla de que el interior cambie poco.'], ['¿Quién libera la insulina?', 1, 'Busca el comienzo que habla de comer.'], ['¿Qué hace el cuerpo al moverse?', 4, 'Busca el comienzo que nombra el ejercicio.']),
      luz: [[1, 'homeostasis'], [2, 'libera insulina'], [5, 'el corazón late más rápido']], bien: 'Equilibrio, comida y ejercicio.' },
      'El primer párrafo define el equilibrio, el segundo explica la comida y el quinto, el ejercicio.', 'Busca en los comienzos la idea más cercana a la pregunta.'),
    x('pasos-del-proceso', 'Ordena lo que pasa después de comer. El primer paso está en su puesto.', { que: 'el aviso', de: 'De la comida a la célula', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Los alimentos se rompen en moléculas.', 'La glucosa pasa a la sangre.', 'El páncreas detecta que subió.', 'Libera insulina.', 'Las células toman la glucosa.'], mira: ['', 'Pasa a la sangre lo que ya se rompió.', 'Se detecta algo que ya está en la sangre.', 'La hormona responde a un aviso.', 'Las células la toman con ayuda de la hormona.'], bien: 'Digestión, sangre, aviso, hormona y célula.' },
      'Se digiere, pasa a la sangre, el páncreas lo detecta, libera insulina y las células la toman.', 'Cada paso necesita lo que dejó el anterior.'),
    x('voz-de-la-fuente', 'Ata cada tarea a su sistema.', { ayuda: 'Tira un hilo desde cada tarea hasta su sistema.', doc: AZUCAR, portadas: [['Digestivo', 'sistema'], ['Circulatorio', 'sistema'], ['Respiratorio', 'sistema'], ['Excretor', 'sistema']],
      ...T(['Rompe los alimentos', 0, '¿Dónde se vuelve pequeña la comida?'], ['Reparte la glucosa por el cuerpo', 1, '¿Quién lleva cosas a todas partes?'], ['Saca el dióxido de carbono', 2, '¿Por dónde sale ese gas?'], ['Filtra desechos de la sangre', 3, '¿Qué hacen los riñones?']), bien: 'Cada sistema, su tarea.' },
      'Romper es del digestivo, repartir del circulatorio, sacar el gas del respiratorio y filtrar del excretor.', 'Piensa en el órgano que hace cada tarea y a qué sistema pertenece.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: AZUCAR, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['A volvió a su valor inicial.', 0, 'Léela junto a la primera oración del párrafo 4.'], ['A las tres horas B tenía más que A en su punto más alto.', 1, 'Compara 210 con los valores de A.'], ['Hacen falta más exámenes para confirmar.', 0, 'Léela junto al final del párrafo 4.'], ['B come demasiado dulce.', 2, '¿Se midió lo que come?']),
      luz: [[4, 'volvió a su valor inicial'], [3, '140, 240, 230 y 210'], [4, 'pidieron más exámenes']], bien: 'Sospechar no es confirmar.' },
      'El regreso y los exámenes están escritos; comparar 210 con 130 se deduce; la dieta de B no se midió.', 'Revisa los números de las dos personas antes de decidir.'),
    x('balanza-tesis', 'Hipótesis: el cuerpo de B no regula bien la glucosa. ¿Qué hace cada dato?', { doc: AZUCAR, tesis: 'El cuerpo de B no regula bien la glucosa',
      ...F(['Tres horas después seguía en 210.', 0, '¿Volvió a su valor inicial?'], ['Otro día, en ayunas, también dio alta.', 0, '¿Apoya que el problema se repite?'], ['El medidor de B estaba dañado.', 1, '¿Se puede confiar en sus valores?'], ['B es más alto que A.', 2, '¿La estatura mide la glucosa?']), bien: 'Un aparato dañado cambia todo.' },
      'Seguir alta y repetirse apoyan; un medidor dañado debilita; la estatura no pesa.', 'Supón cierto cada dato y mira si creerías más o menos.'),
    x('mayor-tramo', 'La gráfica muestra las pulsaciones (en decenas) de un corredor: reposo, trote, carrera y pique. Toca el tramo que más creció **en porcentaje**.', { v: [6, 9, 12, 16] },
      'De 6 a 9 sube 50 %; de 9 a 12 y de 12 a 16, cerca de 33 %. El último sube más pulsaciones, pero no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('La persona A tenía 90 mg/dL en ayunas y 135 una hora después de una fruta. ¿En qué porcentaje subió?', ['Subió $135 - 90 =$ [[45]]', 'Se compara con el valor de [[antes]]: 90', '$45 \\div 90 = 0.5$: subió el [[50]] %'], ['después', '33', '135'], 'El aumento se compara con el valor inicial: la mitad de 90 es 45, un 50 %.', '¿Con cuál de los dos valores se compara el cambio?'),
    err('Un estudiante describe qué ocurre cuando alguien corre.', ['Los músculos gastan más glucosa', 'Necesitan más oxígeno', 'El corazón late más despacio para ahorrar energía', 'Sale más dióxido de carbono por los pulmones'], 2, ['El corazón late más rápido para llevar oxígeno', 'El corazón se detiene un momento', 'El corazón deja de llevar glucosa'], 'Si los músculos piden más oxígeno y glucosa, la sangre debe circular más rápido.', 'Piensa cómo llega el oxígeno a los músculos.'),
    opc('En un día muy caluroso una persona suda y orina menos que en un día fresco, aunque beba lo mismo. La explicación más adecuada es que:', ['Los riñones dejan de funcionar con el calor', 'El sudor se convierte en orina', 'El cuerpo conserva agua por los riñones porque pierde más por la piel', 'La sangre se evapora'], 2, 'Para mantener estable el agua, si se pierde más con el sudor se elimina menos por la orina: homeostasis.', 'Piensa cómo mantiene el cuerpo la misma cantidad de agua.'),
  ]);

  const ADN = {
    id: 'icf-proteina', title: 'Una receta copiada con errores',
    ficha: { autor: 'Profesora de biología molecular', fuente: 'Guía para docentes', fecha: 'Abril de 2026' },
    paras: [
      'El ADN guarda las instrucciones para fabricar proteínas. Está escrito con cuatro letras, las bases A, T, C y G, y en las células de las plantas y los animales casi todo permanece en el núcleo. Las proteínas, en cambio, se fabrican fuera de él, en los ribosomas. ¿Cómo llega la receta de un lugar a otro?',
      'El primer paso se llama transcripción: se abre una parte del ADN y se copia en una molécula más corta, el ARN mensajero. En el ARN no hay T; en su lugar aparece U. Donde el ADN tiene A, el ARN lleva U; donde tiene T, lleva A; donde tiene C, lleva G, y donde tiene G, lleva C.',
      'El segundo paso es la traducción. El ribosoma lee el ARN mensajero de tres en tres letras. Cada grupo de tres, llamado codón, indica un aminoácido. Los ARN de transferencia traen los aminoácidos y el ribosoma los une en fila: esa fila es la proteína.',
      'Con cuatro letras se pueden formar 64 codones, pero solo hay unos veinte aminoácidos comunes. Por eso varios codones indican el mismo. Por ejemplo, GAA y GAG indican ácido glutámico, mientras que GUA indica valina.',
      'Un cambio en una letra del ADN es una mutación. Si el codón nuevo indica el mismo aminoácido, la proteína no cambia. Si indica otro, puede cambiar. Es lo que ocurre en la anemia falciforme: una sola letra distinta pone valina donde iba ácido glutámico, y la hemoglobina se deforma.',
      'Agregar o quitar una letra suele ser peor, porque desde ese punto todos los grupos de tres se corren. Es como leer una frase con los espacios en el lugar equivocado: las letras son casi las mismas, pero ya no dicen nada.',
    ],
  };
  const l3 = leccion('icf-cn-celula-3', 'Del ADN a la proteína', guion(
    ['La receta', 'El ADN guarda instrucciones en el núcleo; las proteínas se hacen en los ribosomas.'],
    ['Transcripción', 'ADN → ARN mensajero: A con U, T con A, C con G, G con C.'],
    ['Traducción', 'El ribosoma lee de tres en tres: cada codón indica un aminoácido.'],
    ['Mutación', 'Cambiar una letra puede no cambiar nada; agregar o quitar una corre todos los grupos.']), [
    x('pasos-del-proceso', 'Ordena el camino del ADN a la proteína. El primer paso está en su puesto.', { doc: ADN, que: 'el proceso', de: 'Del ADN a la proteína', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Se abre una parte del ADN.', 'Se copia en ARN mensajero.', 'El ARN llega al ribosoma.', 'El ribosoma lee de tres en tres.', 'Los aminoácidos se unen en fila.'], mira: ['', 'Se copia lo que ya está a la vista.', 'Llega al ribosoma lo que ya se copió.', 'Se lee lo que ya llegó.', 'Se unen según lo que se leyó.'], bien: 'Abrir, copiar, llevar, leer y unir.' },
      'El ADN se abre y se copia; el ARN llega al ribosoma, que lee codones y une aminoácidos.', 'Distingue lo que pasa en el núcleo de lo que pasa en el ribosoma.'),
    x('genero-o-cita', '¿Pasa en la **transcripción** o en la **traducción**?', { doc: ADN, rot: ['transcripción', 'traducción'],
      ...F(['Se forma ARN mensajero', 0, '¿Se copia o se lee?'], ['Se leen codones', 1, '¿Se copia o se lee?'], ['A del ADN se vuelve U', 0, '¿Se copia o se lee?'], ['Se unen aminoácidos', 1, '¿Se copia o se arma la proteína?'], ['Trabaja el ribosoma', 1, '¿Dónde está: en el núcleo o fuera?']), bien: 'Copiar y leer.' },
      'Copiar el ADN en ARN es transcripción; leer codones y unir aminoácidos, traducción.', 'Pregunta si se está copiando la receta o si ya se está cocinando.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ADN, nums: [1, 2, 5], pregunta: 'Queda en pie', queda: 'Una letra puede cambiar una proteína.',
      ...T(['Las proteínas se fabrican en el núcleo.', 2, 'Busca dónde se fabrican.'], ['El ARN usa la letra T.', [5, 6], 'Busca qué aparece en lugar de T.'], ['Toda mutación cambia la proteína.', 8, 'Busca cuándo la proteína no cambia.']), bien: 'Lugar, letra y excepción.' },
      'Se fabrican en los ribosomas, el ARN lleva U y hay mutaciones que no cambian la proteína.', 'Busca en cada opción la palabra que el texto corrige.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ADN, filas: [{ antes: 'El ribosoma lee las letras de', topes: ['dos en dos', 'tres en tres', 'cuatro en cuatro'], va: 1 }, { antes: 'Un mismo aminoácido puede tener', topes: ['varios codones', 'ningún codón', 'solo un codón'], va: 0 }, { antes: 'Quitar una letra suele', topes: ['no hacer nada', 'mejorar la proteína', 'correr los grupos'], va: 2 }], mira: ['Relee el párrafo 3: ¿cómo lee?', 'Relee el párrafo 4: GAA y GAG.', 'Relee el párrafo 6: ¿qué pasa desde ese punto?'], luz: [[3, 'de tres en tres letras'], [4, 'varios codones indican el mismo'], [6, 'todos los grupos de tres se corren']], bien: 'Tres reglas del código.' },
      'Se lee de tres en tres, varios codones indican lo mismo y quitar una letra corre todo.', 'Cada regla está en un párrafo distinto: 3, 4 y 6.'),
    x('pilares', 'El techo es una afirmación. ¿Qué la sostiene y qué no?', { doc: ADN, idea: 'Una mutación puede no cambiar la proteína',
      ...F(['GAA y GAG indican lo mismo.', 0, '¿Muestra un cambio de letra sin efecto?'], ['Hay 64 codones y unos 20 aminoácidos.', 0, '¿Explica que sobren codones?'], ['El ADN está en el núcleo.', 1, '¿Dice algo de cambiar letras?'], ['El ARN usa U.', 1, '¿Dice algo de cambiar letras?']), bien: 'Sobran codones: por eso caben cambios sin efecto.' },
      'Que varios codones indiquen lo mismo sostiene la idea; el lugar del ADN y la U son ciertos, pero no la apoyan.', 'Una oración puede ser cierta y no sostener la idea.'),
    x('lee-escala', 'La gráfica cuenta proteínas normales en tres muestras. Pon cada valor y cuántas **menos** tiene C que A.', { vals: [80, 60, 30], rot: ['A', 'B', 'C'], hi: 80, st: 20, et: ['A', 'B', 'C', 'A menos C'], ops: ['', '', ''], metas: ['80', '60', '30', '50'], fichas: ['80', '60', '30', '50', '25', '110', '21'],
      mira: ['Mira en qué línea termina.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 20 y 40.', 'Resta la de C a la de A.'], trampas: { '2:25': 'Cada línea vale 20: la mitad son 10.', '2:21': 'Cada línea vale 20: la mitad son 10.', '3:110': 'Eso es la suma.' }, ok: 'La muestra C es la que menos tiene.' },
      'Las líneas van de 20 en 20; C queda a mitad entre 20 y 40. La diferencia es $80 - 30 = 50$.', 'Mira cuánto vale cada línea antes de leer la barra de C.'),
    sol('Un trozo de ADN dice TAC. ¿Cuál es su ARN mensajero?', ['Donde el ADN tiene T, el ARN lleva [[A]]', 'Donde tiene A, lleva [[U]]', 'Donde tiene C, lleva [[G]]', 'El ARN mensajero es [[AUG]]'], ['T', 'ATG', 'C'], 'T con A, A con U y C con G: AUG. El ARN no usa T.', 'Copia letra por letra con la regla y recuerda que el ARN no tiene T.'),
    err('Alguien traduce un ARN mensajero de 12 letras.', ['El ribosoma lee de tres en tres', 'Son $12 \\div 3 = 4$ codones', 'Cada codón indica un aminoácido', 'La fila tiene 12 aminoácidos'], 3, ['La fila tiene 4 aminoácidos', 'La fila tiene 3 aminoácidos', 'La fila tiene 36 aminoácidos'], 'Un aminoácido por codón: 4 codones, 4 aminoácidos.', '¿Cuántos codones se contaron en el segundo paso?'),
    opc('En un gen se cambia una letra y el codón pasa de GAA a GAG. Según el texto, la proteína:', ['No cambia, porque los dos codones indican ácido glutámico', 'Pierde todos sus aminoácidos', 'Cambia ácido glutámico por valina', 'Se fabrica en el núcleo'], 0, 'GAA y GAG indican el mismo aminoácido; el cambio a valina ocurre con GUA.', 'Busca en el párrafo 4 qué indica cada codón.'),
  ]);

  const AGUA = {
    id: 'icf-pez', title: 'El pez de dos aguas',
    paras: [
      'El salmón nace en ríos de agua dulce, vive en el mar y vuelve al río a reproducirse. En cada lugar su cuerpo enfrenta un problema distinto: conservar la misma cantidad de sal y de agua por dentro.',
      'En el río, el agua de afuera tiene menos sal que su sangre. Por ósmosis entra agua a su cuerpo; el pez casi no bebe y produce mucha orina muy diluida.',
      'En el mar ocurre lo contrario: afuera hay más sal y el agua tiende a salir. El pez bebe agua de mar, orina poco y elimina el exceso de sal por células de las branquias, que gastan energía para sacarla.',
      'Un grupo midió la sal en la sangre de salmones pasados del río al mar. El primer día subió de 150 a 190 unidades; al quinto día había bajado a 160 y se mantuvo así. En peces de otra especie, que solo viven en ríos, subió a 260 y murieron.',
      'Los investigadores encontraron que, antes de salir al mar, los salmones fabrican más de una proteína de las branquias que bombea sal. Esa proteína se produce a partir de un gen que los peces de río también tienen, pero que en ellos se usa poco.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: AGUA, ...p }, e, { hint: h });
  return mundo('icf-cn-celula', 'Célula y Organismos', 'ciencias', [l1, l2, l3], [
    ['icf-cn-celula-1', 'El agua va hacia donde hay más sal disuelta.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Por qué entra agua en el río?', [2]], ['¿Cuánto bebe y orina en el mar?', [3]], ['¿Qué pasó con los peces de río?', [4]]] }, 'El río está en el 2, el mar en el 3 y el experimento en el 4.', 'Busca la palabra clave de cada pregunta: río, beber, experimento.')],
    ['icf-cn-celula-1', 'Ir en contra, de menos a más, gasta energía.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Sacar una sustancia hacia donde ya hay más de ella exige gastar energía.', cards: [['Una célula que mete potasio aunque adentro ya hay más.', true], ['Una raíz que absorbe un mineral del que ya tiene más que el suelo.', true], ['Agua que entra a una pasa en un vaso.', false], ['Oxígeno que pasa de donde hay mucho a donde hay poco.', false]] }, 'Meter potasio o un mineral que ya abunda adentro va en contra y gasta; la pasa y el oxígeno van a favor.', 'Pregunta si va de más a menos (gratis) o de menos a más (con gasto).')],
    ['icf-cn-celula-1', 'Compara dónde hay más sal antes de decir hacia dónde va el agua.', opc('Si un pez de río se pone en agua de mar, lo primero que ocurre es que:', ['Entra agua a su cuerpo y se hincha', 'Deja de tener membranas', 'Gana agua por la orina', 'Sale agua de su cuerpo por ósmosis'], 3, 'Afuera hay más sal: el agua sale del pez.', 'Decide dónde hay más sal: en su sangre o en el mar.')],
    ['icf-cn-celula-2', 'Homeostasis: volver a un valor estable después de un cambio.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Al quinto día la sal bajó a 160.', 0], ['El salmón recuperó el equilibrio; el pez de río, no.', 1], ['Los salmones beben agua en el mar.', 0], ['El salmón vive más de diez años.', 2]] }, 'Los 160 y el agua que bebe están escritos; el equilibrio se deduce al comparar; la edad no aparece.', 'Compara lo que pasó con los dos grupos de peces.')],
    ['icf-cn-celula-2', 'Un sistema puede ajustar lo que entra y lo que sale.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'En el mar, el salmón hace todo esto, EXCEPTO:', cards: [['Beber agua', [3]], ['Orinar poco', [3]], ['Sacar sal por las branquias', [3, 5]], ['Producir mucha orina diluida', null]] }, 'La orina abundante y diluida es del río, no del mar.', 'Revisa en qué lugar ocurre cada cosa.')],
    ['icf-cn-celula-2', 'Lo importante de una curva es si vuelve al punto de partida.', opc('Los datos de los salmones muestran que su cuerpo:', ['No reaccionó al cambio', 'Reguló la sal hasta un valor cercano al inicial', 'Aumentó la sal sin límite', 'Cambió de especie'], 1, 'Subió a 190 y volvió a 160, cerca de los 150 iniciales.', 'Compara el primer valor, el más alto y el último.')],
    ['icf-cn-celula-3', 'Tener un gen no significa usarlo: puede estar casi apagado.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [3, 5], options: ['En el mar el pez bebe y gasta energía para sacar sal.', 'Los salmones usan más un gen que otros peces también tienen.', 'Los peces de río no tienen genes para la sal.', 'En el mar el pez no necesita agua.'], key: [0, 1] }, 'El 3 explica qué hace en el mar; el 5, que el gen existe en ambos y se usa distinto.', 'El resumen no puede contradecir el párrafo: mira «también tienen».')],
    ['icf-cn-celula-3', 'Del gen a la proteína: transcripción y traducción.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['plantea el problema', 'explica lo que pasa en el río', 'explica lo que pasa en el mar', 'da los datos de un experimento', 'explica la causa en las proteínas', 'cuenta una leyenda'], key: [0, 1, 2, 3, 4] }, 'Problema, río, mar, datos y explicación; no hay leyenda.', 'Busca las palabras río, mar, midió y proteína.')],
    ['icf-cn-celula-3', 'Para fabricar más proteína hay que copiar más el gen.', opc('Que los salmones fabriquen más de la proteína que bombea sal implica que en sus branquias:', ['El ADN se convirtió en sal', 'Apareció un gen que no existía', 'Se transcribe y traduce más ese gen', 'Los ribosomas entraron al núcleo'], 2, 'Para tener más proteína, el gen se copia más en ARN y se traduce más. El gen ya existía.', 'Recuerda los dos pasos que llevan del gen a la proteína.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-movimiento.js
// Preicfes · Ciencias Naturales · mundo 3 «Movimiento y Fuerzas» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const CARRO = {
    id: 'icf-carrito', title: 'Dos carritos y un cronómetro',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Para describir un movimiento hay que decir desde dónde se mide, en qué lugar está el objeto y en qué momento. La posición es ese lugar; la velocidad dice cuánto cambia la posición en cada segundo, y hacia dónde; la aceleración, cuánto cambia la velocidad en cada segundo.',
      'El curso soltó dos carritos sobre rieles y anotó su posición cada segundo. El carrito A, movido por un motor, estuvo en 0, 20, 40, 60 y 80 centímetros. El carrito B, que bajaba por una rampa, en 0, 5, 20, 45 y 80.',
      'Los dos llegaron a los 80 centímetros en cuatro segundos, así que su velocidad media fue la misma: 20 centímetros por segundo. Sin embargo, no se movieron igual. A recorrió 20 centímetros en cada segundo: su velocidad fue constante. B recorrió 5, luego 15, luego 25 y luego 35: cada segundo avanzó 10 más que en el anterior, es decir, su velocidad aumentó siempre en la misma cantidad.',
      'Al dibujar la posición contra el tiempo, la gráfica de A es una recta; la de B, una curva que se empina. En la gráfica de A la inclinación es la velocidad: si fuera más empinada, A sería más rápido. Un tramo horizontal significaría que está quieto, no que va por un camino plano.',
      'Un estudiante afirmó que, como las dos gráficas se cruzan a los cuatro segundos, en ese momento iban a la misma velocidad. Su compañera lo corrigió: el cruce solo dice que están en el mismo lugar. En ese instante, la curva de B es más empinada; B iba más rápido.',
      'Para terminar, pusieron a A en sentido contrario. La posición pasó de 80 a 0 en cuatro segundos, y la velocidad fue de −20 centímetros por segundo. El signo menos no significa que vaya más despacio: indica el sentido.',
    ],
  };
  const l1 = leccion('icf-cn-movimiento-1', 'Posición, velocidad y aceleración', guion(
    ['Tres preguntas', 'Posición: dónde está. Velocidad: cuánto cambia la posición por segundo. Aceleración: cuánto cambia la velocidad.'],
    ['La recta y la curva', 'En la gráfica de posición, una recta es velocidad constante; una curva, velocidad que cambia.'],
    ['La inclinación', 'Más empinada, más rápido. Horizontal, quieto.'],
    ['El signo', 'Dice el sentido, no la rapidez.']), [
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: CARRO, filas: [{ antes: 'La velocidad del carrito A', topes: ['aumenta', 'es constante', 'disminuye'], va: 1 }, { antes: 'La velocidad media de A y la de B son', topes: ['muy distintas', 'cero', 'iguales'], va: 2 }, { antes: 'En cada segundo B avanza 10 cm', topes: ['más que antes', 'en total', 'menos que antes'], va: 0 }], mira: ['Mira cuánto avanza A en cada segundo.', 'Compara cuánto recorrieron y en cuánto tiempo.', 'Compara 5, 15, 25 y 35.'], luz: [[3, 'su velocidad fue constante'], [3, 'su velocidad media fue la misma'], [3, '10 más que en el anterior']], bien: 'Constante, igual media y en aumento.' },
      'A avanza siempre 20; los dos hacen 80 en 4 segundos; y B suma 10 más cada vez.', 'Resta las posiciones seguidas para ver cuánto avanza en cada segundo.'),
    x('genero-o-cita', '¿Describe la **velocidad** o la **aceleración**?', { doc: CARRO, rot: ['velocidad', 'aceleración'],
      ...F(['Avanza 20 cm cada segundo', 0, '¿Cambia la posición o cambia la rapidez?'], ['Cada segundo va 10 cm/s más rápido', 1, '¿Cambia la posición o cambia la rapidez?'], ['Una moto frena antes de la curva', 1, '¿Cambia la posición o cambia la rapidez?'], ['Un tren va a 80 km/h por la recta', 0, '¿Cambia la posición o cambia la rapidez?']), bien: 'Cambia el lugar o cambia la rapidez.' },
      'Avanzar es velocidad; ganar o perder rapidez, aceleración. Frenar también es acelerar.', 'Pregunta si lo que cambia es dónde está o qué tan rápido va.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CARRO, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'La gráfica de A es una recta.',
      ...T(['Un tramo horizontal es un camino plano.', 2, 'Busca qué significa horizontal.'], ['Al cruzarse iban igual de rápido.', [4, 5], 'Busca qué dice de verdad el cruce.'], ['El signo menos indica que va despacio.', 8, 'Busca qué indica el signo.']), bien: 'La gráfica no es el dibujo del camino.' },
      'Horizontal es quieto, el cruce es el mismo lugar y el menos indica el sentido.', 'Busca en cada opción la palabra que el texto corrige.'),
    x('tres-viajes', 'Completa el dato que falta en cada movimiento.', { viajes: [{ n: 'trote', d: 12, v: 8, t: 1.5, falta: 'd' }, { n: 'bici', d: 60, v: 20, t: 3, falta: 't' }, { n: 'bus', d: 150, v: 60, t: 2.5, falta: 'v' }], fichas: ['12', '3', '60', '9.5', '40', '147'] },
      '$8 \\cdot 1.5 = 12$; $60 \\div 20 = 3$; $150 \\div 2.5 = 60$.', 'Distancia es velocidad por tiempo; las otras dos se despejan dividiendo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CARRO, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['B estuvo en 45 cm a los tres segundos.', 1, 'Cuenta: la primera posición es a los cero segundos.'], ['A llevaba un motor.', 0, 'Léela junto a la descripción de A.'], ['A los 5 segundos B estaría en 125 cm si siguiera igual.', 1, 'Suma lo que avanzaría en el segundo siguiente.'], ['B pesa más que A.', 2, '¿Se pesaron los carritos?']),
      luz: [[2, 'movido por un motor'], [2, '0, 5, 20, 45 y 80']], bien: 'Los datos permiten ir un paso más.' },
      'El motor está escrito; los 45 a los 3 s y los $80 + 45 = 125$ se deducen; el peso no se midió.', 'Ordena las posiciones con su segundo: 0, 1, 2, 3 y 4.'),
    x('lee-escala', 'La gráfica muestra cuánto avanzó otro carrito en tres segundos seguidos (en cm). Pon cada avance y el total.', { vals: [10, 30, 50], rot: ['1.º', '2.º', '3.º'], hi: 60, st: 20, et: ['1.º', '2.º', '3.º', 'total'], ops: ['+', '+', '='], metas: ['10', '30', '50', '90'], fichas: ['10', '30', '50', '90', '5', '25', '45'],
      mira: ['Está a mitad de camino entre 0 y 20.', 'Está a mitad de camino entre 20 y 40.', 'Está a mitad de camino entre 40 y 60.', 'Suma los tres avances.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '1:25': 'Cada línea vale 20: la mitad son 10.', '2:45': 'Cada línea vale 20: la mitad son 10.' }, ok: 'Cada segundo avanza 20 más: acelera.' },
      'Las líneas van de 20 en 20: $10 + 30 + 50 = 90$ cm. Cada segundo avanza 20 más.', 'Mira cuánto vale cada línea y cuánto es la mitad.'),
    sol('Un carro pasa de 10 m/s a 25 m/s en 5 segundos. ¿Cuál es su aceleración?', ['El cambio de velocidad es $25 - 10 =$ [[15]] m/s', 'Ocurre en [[5]] segundos', 'La aceleración es $15 \\div 5 =$ [[3]] m/s cada segundo'], ['5 m', '35', '7'], 'La aceleración es cuánto cambia la velocidad por segundo: 3 m/s².', 'Halla cuánto cambió la velocidad y repártelo en los segundos.'),
    err('Un estudiante lee una gráfica de posición contra tiempo con un tramo horizontal entre 2 s y 6 s.', ['El eje vertical es la posición', 'Entre 2 s y 6 s la posición no cambia', 'El objeto avanza por un camino plano'], 2, ['El objeto está quieto', 'El objeto acelera', 'El objeto se devuelve'], 'Si la posición no cambia con el tiempo, el objeto no se mueve.', 'Si la posición es la misma cuatro segundos, ¿se movió?'),
    opc('Dos atletas corren 100 metros en 14 segundos. La primera va siempre a la misma velocidad; la segunda empieza despacio y acelera. Es correcto afirmar que:', ['Tienen la misma velocidad media', 'La segunda recorrió más distancia', 'La primera tuvo mayor aceleración', 'En todo momento fueron igual de rápidas'], 0, 'Misma distancia en el mismo tiempo: misma media, aunque en cada instante fueran distinto.', 'La velocidad media solo mira la distancia total y el tiempo total.'),
  ]);

  const CAJA = {
    id: 'icf-caja', title: 'La caja que no se quería mover',
    ficha: { autor: 'Equipo de un taller de mecánica', fuente: 'Cartilla para aprendices', fecha: 'Abril de 2026' },
    paras: [
      'Una fuerza es un empujón o un jalón. Se mide en newtons y tiene dirección: no es lo mismo empujar hacia la derecha que hacia arriba. Cuando sobre un objeto actúan varias fuerzas, lo que importa es la fuerza neta, es decir, lo que resulta al juntarlas.',
      'En el taller hay una caja de 20 kilogramos. Dos aprendices la empujan hacia la derecha con 50 y 30 newtons, y el piso la frena con 80. La fuerza neta es cero. La caja, que estaba quieta, sigue quieta. Si ya venía moviéndose, seguiría a la misma velocidad: con fuerza neta cero, un objeto no cambia su movimiento.',
      'Esto sorprende, porque estamos acostumbrados a que todo se detenga. Pero lo que detiene a una caja que se suelta es el roce, que también es una fuerza. Sobre una pista de hielo, donde el roce es pequeño, la misma caja avanza mucho más con el mismo empujón.',
      'Después, los aprendices empujaron con 140 newtons en total. Ahora la fuerza neta era de 60 hacia la derecha, y la caja aceleró 3 metros por segundo cada segundo. Con el doble de fuerza neta habría acelerado el doble; con el doble de masa y la misma fuerza, la mitad. Esa relación se escribe: fuerza neta igual a masa por aceleración.',
      'Uno de los aprendices preguntó por qué le dolían las manos si era él quien empujaba. La respuesta es que las fuerzas vienen por pares: cuando empujas la caja, la caja te empuja a ti con la misma fuerza y en sentido contrario. No se anulan, porque actúan sobre objetos distintos: una sobre la caja y la otra sobre ti.',
      'Por último, pesaron la caja. El peso es la fuerza con que la Tierra la atrae, unos 200 newtons; la masa, 20 kilogramos, es la cantidad de materia. En la Luna, la masa sería la misma y el peso, cerca de la sexta parte.',
    ],
  };
  const l2 = leccion('icf-cn-movimiento-2', 'Fuerzas y equilibrio', guion(
    ['Fuerza neta', 'Las fuerzas se juntan: hacia el mismo lado se suman; en sentidos contrarios se restan.'],
    ['Neta cero', 'El objeto no cambia su movimiento: quieto sigue quieto; si se mueve, sigue igual.'],
    ['F = m · a', 'Más fuerza, más aceleración; más masa, menos aceleración.'],
    ['Pares', 'Si empujas algo, te empuja igual en sentido contrario.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 2 la oración con la **regla** para fuerza neta cero.', { doc: CAJA, nums: [2], apuesta: 'Con fuerza neta cero, el movimiento no cambia.', ...S(['2.4'], { '2.0': 'Presenta la caja y su masa.', '2.1': 'Dice qué fuerzas actúan.', '2.2': 'Calcula la fuerza neta de este caso.', '2.3': 'Dice qué pasó con la caja quieta.' }), bien: 'Quieto o a la misma velocidad.' },
      'La última oración termina con la regla general: con fuerza neta cero no cambia el movimiento.', 'Busca la oración que vale para cualquier objeto.'),
    x('genero-o-cita', '¿La fuerza neta es **cero** o **no**?', { doc: CAJA, rot: ['es cero', 'no es cero'],
      ...F(['Un libro quieto sobre la mesa', 0, '¿Cambia su movimiento?'], ['Un bus que arranca', 1, '¿Cambia su movimiento?'], ['Un carro a 60 km/h constantes en línea recta', 0, '¿Cambia su movimiento?'], ['Un balón que frena en el pasto', 1, '¿Cambia su movimiento?']), bien: 'Si el movimiento no cambia, neta cero.' },
      'El libro y el carro constante no cambian; el bus que arranca y el balón que frena, sí.', 'No preguntes si se mueve: pregunta si cambia su movimiento.'),
    x('pista-tipo', 'Ata cada idea a su situación.', { doc: CAJA, lineas: ['Con el doble de masa, acelera la mitad.', 'Al remar, el agua empuja al bote.', 'La caja avanza más en el hielo.', 'En la Luna pesa menos.'],
      ...T(['fuerza, masa y aceleración', 0, 'Busca la que compara cuánto acelera.'], ['las fuerzas vienen por pares', 1, 'Busca la que habla de dos cosas que se empujan.'], ['el roce frena', 2, 'Busca la que compara pisos.'], ['el peso no es la masa', 3, 'Busca la que cambia de lugar en el espacio.']), bien: 'Cuatro ideas, cuatro casos.' },
      'La masa y la aceleración, el par agua y bote, el roce del piso y el peso en otro lugar.', 'Busca la palabra de cada idea: masa, empuja, frena o pesa.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CAJA, filas: [{ antes: 'Con 140 N hacia la derecha y 80 de roce, la fuerza neta es', topes: ['220 N', '60 N', '0 N'], va: 1 }, { antes: 'Con el doble de fuerza neta, la aceleración', topes: ['se duplica', 'no cambia', 'baja a la mitad'], va: 0 }, { antes: 'En la Luna la masa', topes: ['desaparece', 'se reduce', 'es la misma'], va: 2 }], mira: ['El roce va en sentido contrario.', 'Relee el final del párrafo 4.', 'Relee la última oración del texto.'], luz: [[4, '60 hacia la derecha'], [4, 'habría acelerado el doble'], [6, 'la masa sería la misma']], bien: 'Restar, duplicar y conservar.' },
      '$140 - 80 = 60$; el doble de fuerza da el doble de aceleración; la masa no cambia de lugar a lugar.', 'Busca la oración exacta para cada perilla.'),
    x('balanza-tesis', 'Afirmación: «todo objeto en movimiento se detiene solo». ¿Qué hace cada dato?', { doc: CAJA, tesis: 'Todo objeto en movimiento se detiene solo',
      ...F(['Una nave sigue viajando sin motores.', 1, '¿La nave se detuvo?'], ['En el hielo la caja llega más lejos.', 1, '¿Se detiene por sí sola o por el roce?'], ['Un experimento sin roce mostró que se frena igual.', 0, 'Si fuera cierto, ¿a quién le daría la razón?'], ['La caja es de madera.', 2, '¿Dice algo del movimiento?']), bien: 'Lo que frena es el roce.' },
      'La nave y el hielo la debilitan; que se frenara sin roce la apoyaría; la madera no pesa.', 'Piensa qué tendría que pasar si la afirmación fuera cierta.'),
    x('mayor-tramo', 'La gráfica muestra la aceleración de una caja con cuatro empujones cada vez mayores. Toca el tramo que más creció **en porcentaje**.', { v: [8, 14, 20, 30] },
      'De 8 a 14 sube 75 %; de 14 a 20, cerca de 43 %; de 20 a 30, 50 %. El último sube más unidades, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('Una lancha de 400 kg recibe 1 500 N hacia adelante del motor y 300 N hacia atrás del agua. ¿Cuál es su aceleración?', ['La fuerza neta es $1\\,500 - 300 =$ [[1 200]] N', 'Se divide entre la masa: [[400]] kg', 'La aceleración es [[3]] m/s²'], ['1 800', '4.5', '480 000'], '$1\\,200 \\div 400 = 3$: fuerza neta entre masa.', 'Junta primero las fuerzas; el agua empuja en contra.'),
    err('Un niño empuja una pared con 100 N y la pared no se mueve. Alguien lo explica.', ['El niño empuja la pared con 100 N', 'La pared empuja al niño con 100 N', 'Esas dos fuerzas se anulan y por eso la pared no se mueve'], 2, ['No se anulan, porque actúan sobre objetos distintos; a la pared la sostienen otras fuerzas', 'La pared no hace ninguna fuerza', 'La pared empuja con más fuerza que el niño'], 'El par acción y reacción actúa sobre cuerpos distintos. La pared no se mueve porque el piso y la estructura la sujetan.', '¿Sobre quién actúa cada una de esas fuerzas?'),
    opc('Un paracaidista cae a velocidad constante. Las fuerzas que actúan sobre él son el peso, hacia abajo, y la resistencia del aire, hacia arriba. Se puede afirmar que:', ['El peso es mayor, porque baja', 'No actúa ninguna fuerza', 'La resistencia del aire es mayor', 'Las dos fuerzas son iguales, porque su velocidad no cambia'], 3, 'Velocidad constante es fuerza neta cero: el peso y la resistencia se equilibran, aunque se mueva hacia abajo.', 'Pregunta si su movimiento cambia, no si se mueve.'),
  ]);

  const LUNA = {
    id: 'icf-gravedad', title: 'Por qué la Luna no se cae',
    ficha: { autor: 'Observatorio de un colegio', fuente: 'Boletín de astronomía', fecha: 'Mayo de 2026' },
    paras: [
      'Todos los objetos con masa se atraen. A esa atracción se le llama gravedad. Es más fuerte cuanto mayores son las masas y más débil cuanto más lejos están. Por eso notamos la de la Tierra, que es enorme, y no la de una silla.',
      'Cerca del suelo, todos los objetos caen con la misma aceleración si el aire no estorba: cada segundo su velocidad aumenta unos 10 metros por segundo. En un tubo al vacío, una pluma y una moneda llegan al tiempo. En el aire, la pluma se demora, no porque pese menos, sino porque el aire la frena más en proporción a su peso.',
      'El grupo soltó una bola desde una torre y, con una cámara, calculó su velocidad: 0 al comienzo, 10 a un segundo, 20 a los dos y 30 a los tres metros por segundo. Luego soltó otra del doble de masa. Los valores fueron los mismos, dentro del error de la cámara.',
      'Si la Tierra atrae a la Luna, ¿por qué no se cae? Porque además de caer se mueve de lado. Imaginemos una montaña muy alta y una bola lanzada cada vez con más velocidad: primero cae cerca; después, más lejos; con la velocidad justa, cae siguiendo la curva de la Tierra y nunca llega al suelo. Eso es una órbita: caer sin alcanzar el piso.',
      'La gravedad también explica las mareas. La Luna atrae más el agua del lado que le queda cerca que el centro de la Tierra, y menos el agua del lado opuesto. Esa diferencia estira los océanos y forma dos abultamientos; al girar la Tierra, cada costa pasa por ellos dos veces al día, más o menos.',
      'El peso cambia con el lugar porque depende de la gravedad. Una persona de 60 kilogramos pesa unos 600 newtons en la Tierra y unos 100 en la Luna. Su masa es la misma en los dos sitios. Los astronautas de una estación flotan no porque allá no haya gravedad, sino porque ellos y la estación caen juntos.',
    ],
  };
  const l3 = leccion('icf-cn-movimiento-3', 'Gravedad', guion(
    ['Se atraen', 'Más masa, más atracción; más lejos, menos.'],
    ['Caer', 'Sin aire, todo cae igual: unos 10 m/s más cada segundo.'],
    ['Órbita', 'Es caer mientras se avanza de lado.'],
    ['Peso y masa', 'El peso cambia con el lugar; la masa, no.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: LUNA,
      ...F(['¿De qué depende la fuerza de gravedad?', 0, 'Busca el comienzo que habla de que se atraen.'], ['¿Por qué la Luna no cae al suelo?', 3, 'Busca el comienzo que hace esa pregunta.'], ['¿Por qué cambia el peso?', 5, 'Busca el comienzo que nombra el peso.']),
      luz: [[1, 'más fuerte cuanto mayores son las masas'], [4, 'además de caer se mueve de lado'], [6, 'depende de la gravedad']], bien: 'Atracción, órbita y peso.' },
      'La atracción abre el 1, la Luna el 4 y el peso el 6.', 'Busca en los comienzos la palabra clave de cada pregunta.'),
    x('genero-o-cita', '¿Es **masa** o **peso**?', { doc: LUNA, rot: ['masa', 'peso'],
      ...F(['Sesenta kilogramos en la Tierra y en la Luna', 0, '¿Cambia con el lugar?'], ['Cien newtons en la Luna', 1, '¿Es una fuerza o una cantidad de materia?'], ['La fuerza con que la Tierra te atrae', 1, '¿Es una fuerza o una cantidad de materia?'], ['La cantidad de materia', 0, '¿Es una fuerza o una cantidad de materia?']), bien: 'Materia o fuerza.' },
      'La masa es materia y no cambia; el peso es una fuerza, en newtons, que depende del lugar.', 'Mira la unidad: kilogramos o newtons. Y si cambia con el lugar.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: LUNA, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'La gravedad depende de la masa y de la distancia.',
      ...T(['La pluma cae lento porque pesa menos.', [1, 2], 'Busca por qué se demora.'], ['Con el doble de masa cayó más rápido.', 5, 'Busca cómo fueron los valores.'], ['En la estación no hay gravedad.', 9, 'Busca por qué flotan.']), bien: 'El aire, los datos y caer juntos.' },
      'La frena el aire, los valores fueron iguales y los astronautas caen junto con la estación.', 'Busca la palabra clave de cada opción: pluma, masa y estación.'),
    x('pasos-del-proceso', 'Ordena los lanzamientos desde la montaña, de menor a mayor velocidad. El primero está en su puesto.', { doc: LUNA, que: 'lo que pasa', de: 'La bola en la montaña', fija: 1, ini: [0, 2, 3, 1], tiras: ['Se suelta: cae al pie.', 'Se lanza suave: cae cerca.', 'Se lanza fuerte: cae lejos.', 'Con la velocidad justa: da la vuelta.'], mira: ['', 'Va con poca velocidad de lado.', 'Va más rápido, pero todavía toca el suelo.', 'Es la única que no llega al suelo.'], bien: 'Caer, cada vez más lejos, hasta no llegar.' },
      'A más velocidad de lado, más lejos cae, hasta que la curva de la Tierra se lo impide.', 'Piensa qué tan lejos llega cada lanzamiento.'),
    x('balanza-tesis', 'Tesis: sin aire, la masa no cambia la caída. ¿Qué hace cada dato?', { doc: LUNA, tesis: 'Sin aire, la masa no cambia la caída',
      ...F(['Pluma y moneda llegan al tiempo en el vacío.', 0, '¿Cayeron igual con masas distintas?'], ['Dos bolas de distinta masa dieron los mismos valores.', 0, '¿Cayeron igual con masas distintas?'], ['En otro tubo al vacío la moneda llegó antes.', 1, '¿Cayeron igual?'], ['La torre es de ladrillo.', 2, '¿Dice algo de la caída?']), bien: 'Dos apoyan, uno debilitaría.' },
      'El tubo y las dos bolas apoyan; otro tubo con resultado distinto debilitaría; la torre no pesa.', 'Supón cierto cada dato y compara masas y tiempos.'),
    x('lee-escala', 'La gráfica muestra la velocidad de una bola que cae (en m/s) a 1, 2 y 3 segundos. Pon cada una y cuánto creció de 1 s a 3 s.', { vals: [10, 20, 30], rot: ['1 s', '2 s', '3 s'], hi: 40, st: 20, et: ['1 s', '2 s', '3 s', 'creció'], ops: ['', '', ''], metas: ['10', '20', '30', '20'], fichas: ['10', '20', '30', '20', '5', '25', '60'],
      mira: ['Está a mitad de camino entre 0 y 20.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 20 y 40.', 'Resta la velocidad de 1 s a la de 3 s.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '2:25': 'Cada línea vale 20: la mitad son 10.', '3:60': 'Eso es la suma de las tres.' }, ok: 'Crece 10 m/s en cada segundo.' },
      'Las líneas van de 20 en 20: 10, 20 y 30. De 1 s a 3 s creció 20 m/s.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('Una piedra se suelta desde un puente y tarda 4 segundos en llegar al agua. Si cada segundo gana 10 m/s, ¿con qué velocidad llega y cuál fue su velocidad media?', ['Llega con $4 \\cdot 10 =$ [[40]] m/s', 'Empezó en [[0]] m/s', 'La media, entre la inicial y la final, es [[20]] m/s'], ['10', '14', '80'], 'Gana 10 cada segundo: llega a 40. La media entre 0 y 40 es 20 m/s.', 'La velocidad crece parejo desde que se suelta.'),
    err('Alguien compara a una astronauta en la Tierra y en la Luna.', ['Su masa en la Tierra es 70 kg', 'En la Luna la gravedad es menor', 'En la Luna su masa es cerca de 12 kg'], 2, ['En la Luna su masa sigue siendo 70 kg', 'En la Luna su masa es 420 kg', 'En la Luna no tiene masa'], 'Lo que baja a la sexta parte es el peso, no la masa.', '¿Cuál de los dos depende del lugar: la masa o el peso?'),
    opc('Un satélite da vueltas alrededor de la Tierra con los motores apagados. No cae al suelo porque:', ['A esa altura no hay gravedad', 'Se mueve de lado tan rápido que cae siguiendo la curva de la Tierra', 'El aire lo sostiene', 'Pesa muy poco'], 1, 'La gravedad lo hace caer todo el tiempo, pero su velocidad lateral lo mantiene en órbita.', 'Recuerda la bola lanzada desde la montaña.'),
  ]);

  const FRENO = {
    id: 'icf-frenado', title: 'Cuánto tarda en parar una moto',
    paras: [
      'Un grupo estudió la distancia que recorre una moto desde que el conductor ve un obstáculo hasta que se detiene. Esa distancia tiene dos partes: la de reacción, mientras el conductor decide frenar, y la de frenado, mientras la moto pierde velocidad.',
      'En pavimento seco, a 10 metros por segundo, la de reacción fue de 10 metros y la de frenado, de 7. A 20 metros por segundo, la de reacción fue de 20 y la de frenado, de 28. Al duplicar la velocidad, la reacción se duplicó y el frenado se cuadruplicó.',
      'Repitieron la prueba en pavimento mojado. La reacción fue igual; el frenado casi se duplicó, porque el roce entre la llanta y el piso es menor.',
      'También probaron con un pasajero. La moto, con más masa, necesitó más fuerza para frenar en la misma distancia; con la misma fuerza de frenos, se detuvo más adelante.',
      'El grupo concluyó que mirar el celular, que aumenta el tiempo de reacción, y la lluvia, que reduce el roce, alargan la distancia por razones distintas, y que sus efectos se suman.',
    ],
  };
  const MARTE = {
    id: 'icf-marte', title: 'Una piedra en tres mundos',
    paras: [
      'Una misma piedra de 6 kilogramos se lleva, en un relato, a la Tierra, a Marte y a la Luna. Su masa no cambia en el viaje, porque tiene la misma cantidad de materia.',
      'Su peso sí cambia: unos 60 newtons en la Tierra, 22 en Marte y 10 en la Luna, porque la gravedad es distinta en cada lugar.',
      'Al soltarla desde la misma altura, sin aire, tarda más en la Luna que en la Tierra, pues allá gana menos velocidad en cada segundo.',
      'Si en la Luna se suelta además una pluma, las dos llegan al tiempo: sin aire, la masa no cambia la caída.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: FRENO, ...p }, e, { hint: h });
  return mundo('icf-cn-movimiento', 'Movimiento y Fuerzas', 'ciencias', [l1, l2, l3], [
    ['icf-cn-movimiento-1', 'A velocidad constante, la distancia crece parejo con el tiempo.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué dos partes tiene la distancia?', [1]], ['¿Qué pasó al duplicar la velocidad?', [2]], ['¿Qué cambia con la lluvia?', [3]]] }, 'Las partes están en el 1, la velocidad en el 2 y la lluvia en el 3.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-movimiento-1', 'Compara cómo cambia una cantidad cuando otra se duplica.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Al duplicar la velocidad, el frenado se cuadruplicó.', 0], ['A 20 m/s el total en seco fue de 48 metros.', 1], ['A 30 m/s la moto se cae.', 2], ['A 10 m/s el total en seco fue de 17 metros.', 1]] }, 'Lo del frenado está escrito; $20 + 28 = 48$ y $10 + 7 = 17$ se deducen; lo de 30 m/s no aparece.', 'Suma las dos partes cuando haga falta.')],
    ['icf-cn-movimiento-1', 'Distancia es velocidad por tiempo.', opc('Durante la reacción la moto sigue a velocidad constante. A 20 m/s recorrió 20 m; el tiempo de reacción fue de:', ['0.5 s', '20 s', '2 s', '1 s'], 3, '$20 \\div 20 = 1$ segundo.', 'Divide la distancia entre la velocidad.')],
    ['icf-cn-movimiento-2', 'El roce es una fuerza que frena.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'Alargan la distancia total todas estas, EXCEPTO:', cards: [['El pavimento mojado', [3, 5]], ['Llevar un pasajero', [4]], ['Mirar el celular', [5]], ['Pintar la moto de rojo', null]] }, 'La lluvia está en el 3 y el 5, el pasajero en el 4 y el celular en el 5; el color no aparece.', 'Busca cada opción como causa.')],
    ['icf-cn-movimiento-2', 'Con más masa hace falta más fuerza para el mismo cambio.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Con la misma fuerza, un objeto con más masa tarda más en cambiar su movimiento.', cards: [['Un camión lleno frena más lejos que vacío con los mismos frenos.', true], ['Una carreta cargada arranca más despacio con el mismo caballo.', true], ['Una bombilla alumbra más con más corriente.', false], ['Una planta crece más con agua.', false]] }, 'El camión y la carreta tienen más masa y la misma fuerza; las otras no hablan de fuerza y masa.', 'Busca casos donde cambie la masa y no la fuerza.')],
    ['icf-cn-movimiento-2', 'Fuerza neta es masa por aceleración.', opc('Si la moto lleva el doble de masa y los frenos hacen la misma fuerza, su desaceleración es:', ['El doble', 'La mitad', 'Igual', 'Cero'], 1, 'Con la misma fuerza y el doble de masa, la aceleración es la mitad.', 'Usa fuerza igual a masa por aceleración.')],
    ['icf-cn-movimiento-3', 'La masa no cambia con el lugar; el peso, sí.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { doc: MARTE, labels: ['dice lo que no cambia: la masa', 'compara el peso en tres lugares', 'compara cómo cae en dos lugares', 'compara dos objetos que caen', 'cuenta cómo se hizo el viaje'], key: [0, 1, 2, 3] }, 'Masa, peso, caída en dos lugares y caída de dos objetos; el viaje no se narra.', 'Mira qué se compara en cada párrafo.')],
    ['icf-cn-movimiento-3', 'Sin aire, la masa no cambia la caída; la gravedad del lugar, sí.', pl('resume-parrafo', 'Cada párrafo en una frase', { doc: MARTE, paras: [2, 3, 4], options: ['El peso depende de la gravedad del lugar.', 'Con menos gravedad, la caída es más lenta.', 'Sin aire, objetos de distinta masa caen igual.', 'En la Luna la piedra tiene menos masa.', 'La pluma cae más lento por ser liviana.'], key: [0, 1, 2] }, 'El 2 habla del peso, el 3 de la gravedad al caer y el 4 de la masa. Las otras dos contradicen el texto.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-movimiento-3', 'En la Luna el peso es menor y la masa es la misma.', opc('Si la misma moto estuviera en la Luna, es correcto afirmar que:', ['Tendría menos masa y el mismo peso', 'No tendría masa ni peso', 'Tendría la misma masa y menos peso', 'Tendría el mismo peso y más masa'], 2, 'La masa es la cantidad de materia; el peso depende de la gravedad, que allá es menor.', 'Separa lo que depende del lugar de lo que no.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-materia.js
// Preicfes · Ciencias Naturales · mundo 4 «Materia y Mezclas» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const HIELO = {
    id: 'icf-hielo', title: 'La olla que no pasaba de noventa y seis',
    ficha: { autor: 'Curso de química de grado décimo', fuente: 'Bitácora de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'Toda la materia está hecha de partículas que se mueven. En un sólido vibran en su sitio, muy juntas; en un líquido se deslizan unas sobre otras; en un gas se mueven libres y separadas. Al calentar, las partículas se mueven más; al enfriar, menos. Las partículas no cambian de tamaño: cambian su movimiento y la distancia entre ellas.',
      'El curso puso 200 gramos de hielo en una olla y midió la temperatura cada minuto mientras la calentaba. Durante seis minutos el termómetro marcó 0 °C, aunque la llama estaba encendida. Después subió hasta 96 °C y allí se quedó, mientras el agua hervía.',
      'En los tramos planos la energía no sube la temperatura: se usa en vencer las fuerzas que mantienen unidas a las partículas. Mientras quede hielo, la mezcla sigue a 0 °C; mientras quede agua líquida hirviendo, sigue a la misma temperatura. Por eso poner más fuego a una sopa que ya hierve no la calienta más: solo hace que se evapore más rápido.',
      'Un estudiante creyó que el termómetro estaba dañado, porque el agua hierve a 100 °C. No lo estaba: el colegio queda a 1 200 metros de altura, donde el aire presiona menos y las partículas escapan con mayor facilidad. A nivel del mar habría marcado 100; en un páramo, menos de 90.',
      'Al final pesaron lo que quedó. La olla tenía 170 gramos de agua: faltaban 30. No desaparecieron: se fueron al aire como vapor. Cuando pusieron una tapa fría encima, aparecieron gotas. El cambio de estado es físico: la sustancia sigue siendo agua.',
      'También midieron la densidad, que es la masa que hay en cada unidad de volumen. Un cubo de hielo de 10 centímetros cúbicos tenía 9.2 gramos, y la misma cantidad de agua, 10. Por eso el hielo flota: en el agua, al congelarse, las partículas quedan más separadas. Con casi todas las demás sustancias ocurre lo contrario.',
    ],
  };
  const l1 = leccion('icf-cn-materia-1', 'Estados y propiedades', guion(
    ['Partículas', 'Sólido: juntas y vibrando. Líquido: se deslizan. Gas: libres y separadas.'],
    ['El tramo plano', 'Mientras cambia de estado, la temperatura no sube.'],
    ['Presión', 'Con menos presión del aire, el agua hierve a menor temperatura.'],
    ['Densidad', 'Masa entre volumen: lo menos denso flota.']), [
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica **por qué** la temperatura no sube en un tramo plano.', { doc: HIELO, nums: [3], apuesta: 'La energía suelta a las partículas en vez de calentarlas.', ...S(['3.0'], { '3.1': 'Dice cuánto dura cada tramo.', '3.2': 'Aplica la idea a una sopa.' }), bien: 'Energía que suelta, no que calienta.' },
      'La primera oración lo explica: la energía vence las fuerzas entre partículas en lugar de subir la temperatura.', 'Busca la oración que dice en qué se usa la energía.'),
    x('genero-o-cita', '¿Es un cambio **físico** o **químico**?', { doc: HIELO, rot: ['físico', 'químico'],
      ...F(['El hielo se derrite', 0, '¿Aparece otra sustancia?'], ['Un papel se quema', 1, '¿Aparece otra sustancia?'], ['El vapor se vuelve gotas', 0, '¿Aparece otra sustancia?'], ['Una manzana se oxida', 1, '¿Aparece otra sustancia?'], ['Se corta un alambre', 0, '¿Aparece otra sustancia?']), bien: 'Si la sustancia es la misma, es físico.' },
      'Derretir, condensar y cortar conservan la sustancia; quemar y oxidar forman otras.', 'Pregunta si al final sigue siendo la misma sustancia.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: HIELO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'A mayor altura, el agua hierve a menor temperatura.',
      ...T(['Al calentar, las partículas crecen.', 3, 'Busca qué cambia y qué no en las partículas.'], ['El termómetro estaba dañado.', 5, 'Busca por qué marcaba 96.'], ['El agua que faltaba desapareció.', 9, 'Busca adónde se fue.']), bien: 'Movimiento, altura y vapor.' },
      'Las partículas no cambian de tamaño, el termómetro servía y el agua se fue como vapor.', 'Busca la palabra clave de cada afirmación.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: HIELO, filas: [{ antes: 'Mientras se derretía, la temperatura', topes: ['subió', 'no cambió', 'bajó'], va: 1 }, { antes: 'Comparado con el agua, el hielo es', topes: ['más denso', 'igual de denso', 'menos denso'], va: 2 }, { antes: 'Más fuego a una sopa que hierve la', topes: ['evapora más rápido', 'calienta más', 'enfría'], va: 0 }], mira: ['Relee los seis minutos del párrafo 2.', 'Compara 9.2 con 10 gramos.', 'Relee el final del párrafo 3.'], luz: [[2, 'marcó 0 °C'], [6, '9.2 gramos'], [3, 'se evapore más rápido']], bien: 'Plano, flota y evapora.' },
      'La temperatura quedó en 0 °C, el hielo tiene menos masa en el mismo volumen y hervir más solo evapora.', 'Busca el dato de cada perilla antes de moverla.'),
    x('pista-tipo', 'Ata cada estado a cómo están sus partículas.', { doc: HIELO, lineas: ['Juntas, vibran en su sitio.', 'Se deslizan unas sobre otras.', 'Libres y muy separadas.', 'Unas en su sitio y otras deslizándose.'],
      ...T(['sólido', 0, '¿En cuál no cambian de lugar?'], ['líquido', 1, '¿En cuál toman la forma del vaso?'], ['gas', 2, '¿En cuál llenan todo el espacio?'], ['hielo derritiéndose', 3, '¿En cuál conviven dos estados?']), bien: 'Vibrar, deslizar y volar.' },
      'El sólido vibra, el líquido desliza, el gas se separa y al derretirse conviven dos estados.', 'Piensa qué tanto se pueden mover en cada caso.'),
    x('lee-escala', 'La gráfica muestra a qué temperatura hierve el agua en tres lugares (en °C). Pon cada una y la diferencia entre mar y páramo.', { vals: [100, 95, 85], rot: ['mar', 'pueblo', 'páramo'], hi: 100, st: 20, et: ['mar', 'pueblo', 'páramo', 'mar − páramo'], ops: ['', '', ''], metas: ['100', '95', '85', '15'], fichas: ['100', '95', '85', '15', '99', '81', '185'],
      mira: ['Mira en qué línea termina.', 'Está a tres cuartos del camino entre 80 y 100.', 'Está a un cuarto del camino entre 80 y 100.', 'Resta la del páramo a la del mar.'], trampas: { '1:99': 'Cada línea vale 20: tres cuartos son 15.', '2:81': 'Cada línea vale 20: un cuarto son 5.', '3:185': 'Eso es la suma.' }, ok: 'Más arriba, hierve a menos.' },
      'Las líneas van de 20 en 20: 100, 95 y 85. La diferencia es 15 °C.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    sol('Una piedra de 90 g ocupa 30 cm³. ¿Cuál es su densidad y qué pasa si se echa al agua (1 g/cm³)?', ['La densidad es $90 \\div 30 =$ [[3]] g/cm³', 'Es [[mayor]] que la del agua', 'Por eso la piedra se [[hunde]]'], ['2 700', 'menor', 'mantiene a flote'], 'Masa entre volumen: 3 g/cm³, más que el agua, así que se hunde.', 'Divide la masa entre el volumen y compara con 1.'),
    err('Alguien explica por qué una botella con agua llena y tapada se rompe en el congelador.', ['El agua se congela', 'Al congelarse ocupa más volumen', 'Porque su masa aumenta'], 2, ['Porque sus partículas quedan más separadas', 'Porque se vuelve más densa', 'Porque entra aire por la tapa'], 'La masa no cambia; el hielo ocupa más porque sus partículas quedan más separadas.', '¿De dónde saldría más masa si está tapada?'),
    opc('Se calientan 500 g de agua a nivel del mar hasta que hierve y se deja cinco minutos más con la llama al máximo. Al final, la temperatura del agua es:', ['Mayor de 100 °C, porque recibió más calor', '100 °C, y hay menos agua que al comienzo', '100 °C, y hay la misma cantidad de agua', 'Menor de 100 °C, porque se enfrió'], 1, 'Mientras hierve sigue a 100 °C; la energía extra la convierte en vapor, así que queda menos.', 'Recuerda en qué se usa la energía durante un cambio de estado.'),
  ]);

  const MEZCLA = {
    id: 'icf-balde', title: 'El balde revuelto',
    ficha: { autor: 'Profesor de química', fuente: 'Guía de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'En un balde cayeron, por accidente, agua, sal, arena, virutas de hierro y un chorro de aceite. La profesora no dejó botarlo. «Separarlo es un rompecabezas», dijo, «y las piezas son las propiedades».',
      'Una mezcla reúne sustancias que conservan sus propiedades. Si se ven partes distintas, como arena en agua, es heterogénea. Si se ve pareja, como agua con sal, es homogénea y se llama disolución: la sal es el soluto y el agua, el solvente. Un compuesto es otra cosa: en el agua, el hidrógeno y el oxígeno están unidos y no se separan con un colador.',
      'Primero pasaron un imán envuelto en plástico y salió el hierro, porque es magnético. Después dejaron quieto el balde: el aceite, menos denso y que no se mezcla con el agua, quedó arriba. Lo retiraron con un embudo de decantación, que deja salir primero el líquido de abajo.',
      'Luego vertieron el resto en un filtro de papel. La arena, que no se disuelve, quedó atrapada; el agua salada pasó, porque las partículas disueltas son mucho más pequeñas que los huecos del papel. Un estudiante propuso filtrar otra vez para sacar la sal. Filtraron tres veces: el agua siguió salada.',
      'Para separar la sal calentaron el agua. Al evaporarse, la sal quedó en el fondo. Como además querían recuperar el agua, enfriaron el vapor y lo recogieron: eso es destilar. La destilación también separa dos líquidos que hierven a distinta temperatura, como el alcohol, que hierve a 78 °C, y el agua.',
      'Pesaron todo al final. La suma de las partes dio casi lo mismo que el balde del comienzo; faltaban unos gramos, que se quedaron en el papel y en las paredes. Separar una mezcla no crea ni destruye nada: solo aprovecha que cada sustancia es distinta.',
    ],
  };
  const l2 = leccion('icf-cn-materia-2', 'Mezclas y separación', guion(
    ['Mezcla o compuesto', 'En una mezcla cada sustancia conserva sus propiedades; en un compuesto están unidas.'],
    ['Homogénea o heterogénea', 'Pareja o con partes visibles.'],
    ['La propiedad manda', 'Imán si es magnético, filtro si no se disuelve, decantar si flota, evaporar si hierve distinto.'],
    ['Nada se pierde', 'La masa total se conserva.']), [
    x('pasos-del-proceso', 'Ordena cómo separaron el balde. El primer paso está en su puesto.', { doc: MEZCLA, que: 'la separación', de: 'El balde revuelto', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Imán: sale el hierro.', 'Reposo y embudo: sale el aceite.', 'Filtro: queda la arena.', 'Calor: se evapora el agua.', 'La sal queda en el fondo.'], mira: ['', 'Se retira lo que flota antes de filtrar.', 'Se filtra cuando ya no hay aceite.', 'Se calienta lo que pasó por el papel.', 'Aparece cuando ya no hay agua.'], bien: 'Imán, embudo, filtro, calor y sal.' },
      'Primero el hierro, luego el aceite, después la arena y al final se evapora el agua y queda la sal.', 'Busca «Primero», «Después», «Luego» y «Para separar».'),
    x('voz-de-la-fuente', 'Ata cada método a la propiedad que aprovecha.', { ayuda: 'Tira un hilo desde cada propiedad hasta su método.', doc: MEZCLA, portadas: [['Imán', 'método'], ['Filtración', 'método'], ['Decantación', 'método'], ['Destilación', 'método']],
      ...T(['ser atraído', 0, '¿Cuál sirve para el hierro?'], ['no disolverse y tener granos grandes', 1, '¿Cuál sirve para la arena?'], ['distinta densidad', 2, '¿Cuál sirve para lo que flota?'], ['hervir a distinta temperatura', 3, '¿Cuál sirve para alcohol y agua?']), bien: 'Cada método, su propiedad.' },
      'El imán atrae, el filtro retiene granos, decantar usa la densidad y destilar, la ebullición.', 'Pregunta qué diferencia hay entre las dos sustancias.'),
    x('genero-o-cita', '¿La mezcla es **homogénea** o **heterogénea**?', { doc: MEZCLA, rot: ['homogénea', 'heterogénea'],
      ...F(['Agua con sal', 0, '¿Se ven partes distintas?'], ['Agua con arena', 1, '¿Se ven partes distintas?'], ['Aire limpio', 0, '¿Se ven partes distintas?'], ['Ensalada', 1, '¿Se ven partes distintas?'], ['Agua con aceite', 1, '¿Se ven partes distintas?']), bien: 'Pareja o con partes.' },
      'El agua salada y el aire se ven parejos; arena, ensalada y aceite muestran partes.', 'Imagínala en un vaso: ¿se ve igual en todas partes?'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MEZCLA, nums: [4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Filtrar diez veces tampoco sacaría la sal.', 1, '¿Por qué pasó el agua salada las tres veces?'], ['El alcohol hierve a 78 °C.', 0, 'Léela junto a la destilación.'], ['Al destilar, el alcohol sale antes que el agua.', 1, 'Compara las temperaturas a las que hierven.'], ['La arena pesaba 200 gramos.', 2, '¿Se dice cuánto pesaba?']),
      luz: [[4, 'el agua siguió salada'], [5, '78 °C']], bien: 'El tamaño y la temperatura deciden.' },
      'Los 78 °C están escritos; la sal y el orden de salida se deducen; el peso de la arena no aparece.', 'Usa la explicación del texto para ir un paso más.'),
    x('balanza-tesis', 'Afirmación: «la sal se destruye al disolverse». ¿Qué hace cada dato?', { doc: MEZCLA, tesis: 'La sal se destruye al disolverse',
      ...F(['Al evaporar el agua reaparece la sal.', 1, '¿Se había destruido?'], ['El agua sigue salada después de filtrar.', 1, '¿La sal sigue ahí?'], ['La masa del agua con sal es menor que la suma.', 0, 'Si fuera cierto, ¿faltaría algo?'], ['La sal es blanca.', 2, '¿Dice si sigue ahí?']), bien: 'Reaparece: no se destruyó.' },
      'Que reaparezca y que siga salada la debilitan; una masa menor la apoyaría; el color no pesa.', 'Piensa qué debería pasar si la sal dejara de existir.'),
    x('mayor-tramo', 'La gráfica muestra los gramos de sal que van quedando al evaporar agua de mar, en cuatro momentos. Toca el tramo que más creció **en porcentaje**.', { v: [8, 10, 15, 21] },
      'De 8 a 10 sube 25 %; de 10 a 15, 50 %; de 15 a 21, 40 %. El último sube más gramos, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('Se mezclan 180 g de agua y 20 g de sal. ¿Cuánto pesa la disolución y qué porcentaje es sal?', ['La disolución pesa $180 + 20 =$ [[200]] g', 'La sal es $20 \\div 200 =$ [[0.1]]', 'Es el [[10]] % de la masa'], ['160', '11', '20'], 'El porcentaje se calcula sobre toda la disolución: 10 %.', 'El total incluye también la sal.'),
    err('Se quiere separar una mezcla de arena, sal y agua y recuperar las tres.', ['Se filtra: la arena queda en el papel', 'Pasa el agua con sal', 'Se filtra otra vez con el mismo papel para sacar la sal', 'Se enfría el vapor para recuperar el agua'], 2, ['Se destila: se calienta para separar el agua de la sal', 'Se pasa un imán para sacar la sal', 'Se deja reposar hasta que la sal flote'], 'La sal disuelta pasa por el papel: hay que evaporar el agua y enfriar el vapor.', '¿Qué pasó cuando filtraron varias veces?'),
    opc('Para separar una mezcla de dos líquidos que se disuelven entre sí y hierven a 56 °C y 100 °C, el método más adecuado es:', ['Filtración', 'Destilación', 'Imantación', 'Decantación'], 1, 'Como forman una mezcla pareja y hierven a distinta temperatura, se destila.', 'Busca la propiedad en que se diferencian.'),
  ]);

  const AZUCAR = {
    id: 'icf-azucar', title: 'Cuánta azúcar cabe en un vaso',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Disolver no es derretir. Cuando el azúcar se disuelve, las partículas de agua rodean a las de azúcar y las reparten por todo el vaso. La azúcar sigue ahí: el agua queda dulce y la masa es la suma de las dos. La solubilidad dice cuánto soluto se puede disolver, como máximo, en cierta cantidad de solvente a una temperatura dada.',
      'El club midió la solubilidad del azúcar en 100 gramos de agua. A 20 °C se disolvieron 200 gramos; a 40 °C, 240; a 60 °C, 290; a 80 °C, 360. Con la sal de cocina repitieron la prueba: 36, 36.5, 37 y 38 gramos. La temperatura cambia mucho la solubilidad del azúcar y casi nada la de la sal.',
      'Si a 20 °C se agregan 250 gramos de azúcar, se disuelven 200 y quedan 50 en el fondo. La disolución está saturada: no admite más. Con menos de 200 estaría insaturada. Agitar o moler el azúcar hace que se disuelva más rápido, pero no que quepa más; para que quepa más hay que calentar o agregar agua.',
      'Calentaron la disolución con los 250 gramos hasta 60 °C: se disolvió todo. Luego la dejaron enfriar, quieta, hasta 20 °C. No apareció azúcar en el fondo. La disolución estaba sobresaturada, con más soluto del que corresponde. Bastó dejar caer un cristal para que el exceso se cristalizara en minutos.',
      'Con los gases ocurre al revés. El oxígeno se disuelve menos en agua caliente: en 1 litro a 10 °C caben unos 11 miligramos; a 30 °C, 7.5. Por eso los peces de un estanque sufren en los días de calor, y por eso una gaseosa tibia pierde rápido su gas.',
      'No todo se disuelve en todo. El agua, cuyas partículas tienen un lado positivo y otro negativo, disuelve bien la sal y el azúcar; el aceite, no. «Lo semejante disuelve a lo semejante», dicen los químicos. El jabón sirve porque tiene una punta que se lleva con el agua y otra que se lleva con la grasa.',
    ],
  };
  const l3 = leccion('icf-cn-materia-3', 'Solubilidad', guion(
    ['Disolver no es derretir', 'El soluto se reparte entre las partículas del solvente; la masa se conserva.'],
    ['Hasta cuánto', 'Solubilidad: lo máximo que cabe en cierta cantidad de solvente a una temperatura.'],
    ['Más rápido no es más', 'Agitar acelera; calentar (en muchos sólidos) aumenta lo que cabe.'],
    ['Gases', 'Al revés: en agua caliente cabe menos gas.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: AZUCAR,
      ...F(['¿Cuántos gramos se disolvieron a cada temperatura?', 1, 'Busca el comienzo que dice que se midió.'], ['¿Qué pasa con los gases?', 4, 'Busca el comienzo que los nombra.'], ['¿Por qué sirve el jabón?', 5, 'Busca el comienzo que dice que no todo se disuelve.']),
      luz: [[2, '240'], [5, 'El oxígeno se disuelve menos'], [6, 'El jabón sirve']], bien: 'Medidas, gases y semejanza.' },
      'Las medidas están en el 2, los gases en el 5 y el jabón en el 6.', 'Busca en los comienzos la palabra más cercana.'),
    x('genero-o-cita', '¿Hace que se disuelva **más rápido** o que **quepa más**?', { doc: AZUCAR, rot: ['más rápido', 'cabe más'],
      ...F(['Agitar con una cuchara', 0, '¿Cambia la cantidad máxima?'], ['Agregar más agua', 1, '¿Cambia la cantidad máxima?'], ['Moler el azúcar', 0, '¿Cambia la cantidad máxima?'], ['Pasar de 20 a 60 °C', 1, '¿Cambia la cantidad máxima?']), bien: 'Rapidez no es capacidad.' },
      'Agitar y moler aceleran; más agua y más temperatura (en el azúcar) permiten que quepa más.', 'Mira si al final se disuelve más o solo antes.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: AZUCAR, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'La temperatura casi no cambia la solubilidad de la sal.',
      ...T(['Disolver es lo mismo que derretir.', 0, 'Busca la oración más corta del comienzo.'], ['Agitar hace que quepa más azúcar.', 7, 'Busca qué logra agitar.'], ['El oxígeno se disuelve mejor en agua caliente.', 9, 'Busca qué pasa con el oxígeno al calentar.']), bien: 'Tres oraciones, tres desmentidos.' },
      'Disolver no es derretir, agitar solo acelera y el oxígeno se disuelve menos en agua caliente.', 'Saca la palabra clave: derretir, agitar, oxígeno.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: AZUCAR, filas: [{ antes: 'De 20 a 80 °C, la solubilidad del azúcar', topes: ['baja', 'no cambia', 'sube mucho'], va: 2 }, { antes: 'La de la sal', topes: ['casi no cambia', 'se duplica', 'llega a cero'], va: 0 }, { antes: 'A 20 °C, con 250 g de azúcar quedan sin disolver', topes: ['0 g', '50 g', '200 g'], va: 1 }], mira: ['Compara 200 con 360.', 'Compara 36 con 38.', 'Relee cuántos se disuelven a 20 °C.'], luz: [[2, 'a 80 °C, 360'], [2, '36, 36.5, 37 y 38'], [3, 'quedan 50 en el fondo']], bien: 'Sube mucho, casi no y sobran.' },
      'El azúcar pasa de 200 a 360; la sal, de 36 a 38; y a 20 °C sobran 50 gramos.', 'Compara el primer valor de cada serie con el último.'),
    x('pista-tipo', 'Ata cada nombre a su vaso (100 g de agua a 20 °C).', { doc: AZUCAR, lineas: ['150 g de azúcar, todo disuelto', '200 g de azúcar, todo disuelto', '250 g disueltos tras enfriar quieta', '250 g con 50 en el fondo'],
      ...T(['insaturada', 0, '¿En cuál todavía cabe más?'], ['justo saturada, sin sobrante', 1, '¿En cuál ya no cabe más y no sobra?'], ['sobresaturada', 2, '¿En cuál hay más de lo que corresponde, disuelto?'], ['saturada, con sobrante', 3, '¿En cuál sobra en el fondo?']), bien: 'El límite son 200 gramos.' },
      'Con menos de 200 cabe más; con 200 está justa; 250 disueltos pasan del límite; y el fondo muestra lo que sobra.', 'Compara lo disuelto en cada vaso con lo máximo que cabe.'),
    x('lee-escala', 'La gráfica muestra la solubilidad del azúcar a 20, 60 y 80 °C (en gramos). Pon cada valor y cuánto sube de 20 a 80 °C.', { vals: [200, 290, 360], rot: ['20 °C', '60 °C', '80 °C'], hi: 400, st: 80, et: ['20 °C', '60 °C', '80 °C', 'sube'], ops: ['', '', ''], metas: ['200', '290', '360', '160'], fichas: ['200', '290', '360', '160', '245', '325', '560'],
      mira: ['Está a mitad de camino entre 160 y 240.', 'Está entre 240 y 320, un poco más de la mitad.', 'Está a mitad de camino entre 320 y 400.', 'Resta la de 20 a la de 80.'], trampas: { '1:245': 'Cada línea vale 80: 5 sería muy poquito.', '2:325': 'Cada línea vale 80: la mitad son 40.', '3:560': 'Eso es la suma.' }, ok: 'A más temperatura, cabe más azúcar.' },
      'Las líneas van de 80 en 80: 200, 290 y 360. La diferencia es $360 - 200 = 160$ g.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('A 40 °C se disuelven hasta 240 g de azúcar en 100 g de agua. ¿Cuánto se disuelve en 50 g de agua, y cuánto queda en el fondo si se echan 150 g?', ['En la mitad del agua cabe la mitad: [[120]] g', 'Se echan 150 g: quedan $150 - 120 =$ [[30]] g en el fondo', 'La disolución está [[saturada]]'], ['240', '90', 'insaturada'], 'La solubilidad es proporcional al agua: 120 g; sobran 30.', 'Con la mitad del agua, ¿cuánto cabe?'),
    err('Alguien explica por qué una gaseosa tibia pierde su gas.', ['El gas está disuelto en el líquido', 'Al calentarse cabe más gas disuelto', 'Por eso se escapa'], 1, ['Al calentarse cabe menos gas disuelto', 'Al calentarse el gas se vuelve azúcar', 'Al calentarse el líquido se vuelve más denso'], 'En agua tibia cabe menos gas: lo que sobra se escapa.', 'Recuerda qué pasa con el oxígeno al calentar.'),
    opc('Un estudiante dice que 260 g de azúcar se disolverán por completo en 100 g de agua a 60 °C. Según los datos, su afirmación es:', ['Falsa, porque a 20 °C solo caben 200 g', 'Falsa, porque agitar no ayuda', 'Verdadera, porque la sal también se disuelve', 'Verdadera, porque a 60 °C caben hasta 290 g'], 3, 'A 60 °C caben hasta 290 g: 260 se disuelven todos.', 'Busca el límite a la temperatura que se pregunta.'),
  ]);

  const MAR = {
    id: 'icf-salina', title: 'De dónde sale la sal',
    paras: [
      'En las salinas, el agua de mar entra a piscinas anchas y poco profundas. El sol y el viento evaporan el agua; la sal, que no se evapora, queda en el fondo.',
      'Cien litros de agua de mar traen unos 3.5 kilogramos de sales, casi todas sal común. Una piscina de mil metros cuadrados recibe agua hasta una altura de veinte centímetros.',
      'Antes de la última piscina, el agua pasa por otras en las que se asientan la arena y el barro. Después de varios días, la disolución se satura y empiezan a formarse cristales.',
      'La sal cruda trae arcilla. Para limpiarla se disuelve otra vez, se filtra y se vuelve a evaporar.',
      'Cuando llueve, se pierde la cosecha: el agua dulce vuelve a disolver los cristales. Por eso las salinas están en lugares secos y con viento.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: MAR, ...p }, e, { hint: h });
  return mundo('icf-cn-materia', 'Materia y Mezclas', 'ciencias', [l1, l2, l3], [
    ['icf-cn-materia-1', 'Evaporar es un cambio físico: la sustancia es la misma.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué evapora el agua?', [1]], ['¿Cuánta sal trae el agua de mar?', [2]], ['¿Qué daña la cosecha?', [5]]] }, 'El sol y el viento están en el 1, la cantidad en el 2 y la lluvia en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-materia-1', 'El viento y el calor aceleran la evaporación.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['La sal no se evapora.', 0], ['Una piscina ancha evapora más que una honda con la misma agua.', 1], ['Mil litros traen unos 35 kg de sales.', 1], ['La sal es más cara que el azúcar.', 2]] }, 'La sal está escrita; la piscina ancha y los 35 kg se deducen; el precio no aparece.', 'Usa el dato de cien litros para hallar el de mil.')],
    ['icf-cn-materia-1', 'Al evaporarse, las partículas de agua se separan y pasan al aire.', opc('Cuando el agua de la piscina se evapora, sus partículas:', ['Se convierten en sal', 'Crecen hasta volverse gas', 'Se separan y pasan al aire, pero siguen siendo agua', 'Desaparecen'], 2, 'Es un cambio físico: la sustancia es la misma, con sus partículas separadas.', 'Recuerda qué cambia en un cambio de estado.')],
    ['icf-cn-materia-2', 'Cada método aprovecha una propiedad.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Lo que no se disuelve se separa dejando asentar o filtrando.', cards: [['Dejar reposar un río turbio en un tanque', true], ['Colar el café molido', true], ['Evaporar agua para obtener sal', false], ['Usar un imán para sacar clavos', false]] }, 'El barro y el café no se disuelven; evaporar y atraer usan otras propiedades.', 'Busca casos en que se separe algo sin disolver.')],
    ['icf-cn-materia-2', 'Para limpiar la sal se disuelve, se filtra y se evapora.', pl('intruso-excepto', 'Pregunta EXCEPTO', { ask: 'Para limpiar la sal cruda se hace todo esto, EXCEPTO:', cards: [['Disolverla', [4]], ['Filtrarla', [4]], ['Evaporar el agua', [4]], ['Pasarle un imán', null]] }, 'Disolver, filtrar y evaporar están en el 4; el imán no aparece.', 'Busca cada paso en el párrafo de la limpieza.')],
    ['icf-cn-materia-2', 'La arcilla no se disuelve: queda en el filtro.', opc('Al disolver la sal cruda y filtrarla, en el papel queda:', ['La arcilla', 'La sal', 'El agua', 'Nada, porque todo pasa'], 0, 'La arcilla no se disuelve y no pasa por el papel; la sal disuelta, sí.', '¿Cuál de las sustancias no se disuelve?')],
    ['icf-cn-materia-3', 'Saturada: no admite más soluto.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [3, 5], options: ['Se asienta la arena, la disolución se satura y se forman cristales.', 'La lluvia disuelve de nuevo la sal.', 'Los cristales se forman antes de que se evapore el agua.', 'La lluvia aumenta la cosecha.'], key: [0, 1] }, 'El 3 cuenta la saturación; el 5, el efecto de la lluvia. Las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-materia-3', 'La lluvia agrega agua y vuelve a caber sal: cada párrafo cuenta una parte.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['explica la idea general', 'da cantidades', 'cuenta el paso por varias piscinas', 'explica cómo se limpia', 'explica el efecto de la lluvia', 'cuenta la historia de un pueblo'], key: [0, 1, 2, 3, 4] }, 'Idea, cantidades, piscinas, limpieza y lluvia; no hay historia del pueblo.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-materia-3', 'La solubilidad depende del agua que haya.', opc('Cuando llueve sobre los cristales, estos se disuelven de nuevo porque:', ['La lluvia está más caliente', 'El agua dulce que cae no está saturada y admite sal', 'La sal se evapora con la lluvia', 'La lluvia trae más sal'], 1, 'El agua nueva puede disolver sal: la disolución deja de estar saturada.', 'Piensa si al agua de lluvia le cabe sal.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-ecosistemas.js
// Preicfes · Ciencias Naturales · mundo 5 «Ecosistemas y Energía» (spec 2026-11-25-preicfes-estructura). Casos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const LAGUNA = {
    id: 'icf-laguna', title: 'Quién se come a quién en la laguna',
    ficha: { autor: 'Grupo ecológico escolar', fuente: 'Guía de campo', fecha: 'Febrero de 2026' },
    paras: [
      'En la laguna de Chircal, las algas y las plantas fabrican su alimento con la luz del sol: son productores. Los caracoles y los renacuajos comen algas: son consumidores primarios. Las mojarras se comen a los renacuajos: son consumidoras secundarias. La garza, que se come a las mojarras, es consumidora terciaria.',
      'La flecha de una cadena trófica va de quien es comido hacia quien come, porque muestra hacia dónde pasa la energía: alga → renacuajo → mojarra → garza. Varias cadenas que se cruzan forman una red. La garza también come caracoles; en esa cadena es consumidora secundaria.',
      'Los hongos y las bacterias descomponen hojas, heces y animales muertos. No están al final de la fila: reciben materia de todos los niveles y devuelven al agua nutrientes que las algas vuelven a usar. La materia da vueltas; la energía, no.',
      'El grupo calculó la energía de cada nivel por metro cuadrado al año: algas, 8 000 kilocalorías; consumidores primarios, 800; mojarras, 80; garzas, 8. De un nivel al siguiente pasa, más o menos, la décima parte. El resto se gasta en respirar, moverse y mantenerse vivos, y sale en forma de calor, o queda en partes que nadie se come.',
      'Por eso hay muchas algas y pocas garzas, y por eso las cadenas casi nunca tienen más de cinco eslabones: no queda energía para uno más. También por eso alimentar a una población con granos exige menos terreno que alimentarla con carne de animales que comieron granos.',
      'Un verano alguien soltó truchas que se comieron casi todos los renacuajos. Las algas, casi sin quien las comiera, cubrieron la laguna de verde. De noche, al respirar y descomponerse, gastaron el oxígeno, y en la mañana aparecieron mojarras muertas. Cambiar un solo eslabón movió toda la red.',
    ],
  };
  const l1 = leccion('icf-cn-ecosistemas-1', 'Cadenas y pirámides tróficas', guion(
    ['Niveles', 'Productores, consumidores primarios, secundarios, terciarios; y descomponedores.'],
    ['La flecha', 'Va hacia quien come: por ahí pasa la energía.'],
    ['La décima parte', 'De un nivel al siguiente pasa cerca del 10 %; el resto sale como calor o no se come.'],
    ['Una red', 'Cambiar un eslabón mueve a los demás.']), [
    x('pista-tipo', 'Ata cada nivel a su organismo en la cadena alga → renacuajo → mojarra → garza.', { doc: LAGUNA, lineas: ['alga', 'renacuajo', 'mojarra', 'garza'],
      ...T(['productor', 0, '¿Cuál fabrica su alimento con luz?'], ['consumidor primario', 1, '¿Cuál come productores?'], ['consumidor secundario', 2, '¿Cuál come al que come algas?'], ['consumidor terciario', 3, '¿Cuál está al final de esta cadena?']), bien: 'De la luz a la garza.' },
      'El alga produce, el renacuajo come algas, la mojarra lo come y la garza cierra la cadena.', 'Sigue la flecha desde el organismo que usa la luz.'),
    x('genero-o-cita', '¿Es la **materia** o la **energía** de la laguna?', { doc: LAGUNA, rot: ['la materia', 'la energía'],
      ...F(['Da vueltas y se vuelve a usar', 0, '¿Cuál reciclan los hongos?'], ['Entra con la luz y sale como calor', 1, '¿Cuál se va y no regresa?'], ['Los nutrientes que las algas toman otra vez', 0, '¿Son sustancias o algo que se pierde en calor?'], ['Pasa a otro nivel cerca de la décima parte', 1, '¿Qué midieron en kilocalorías?']), bien: 'Una circula, la otra pasa.' },
      'Los nutrientes circulan; la energía entra con la luz, pasa en parte y sale como calor.', 'Relee el final del párrafo 3 y piensa en el calor.'),
    x('mayor-tramo', 'La gráfica cuenta garzas en cuatro años. Toca el tramo en que más crecieron **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %. El último suma más garzas, no más porcentaje.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: LAGUNA, nums: [2, 3, 4], pregunta: 'Queda en pie', queda: 'La garza puede ocupar dos niveles distintos.',
      ...T(['La flecha va hacia quien es comido.', 0, 'Busca hacia dónde apunta la flecha.'], ['Los hongos solo reciben materia de las garzas.', [3, 4], 'Busca de qué niveles reciben.'], ['Casi toda la energía pasa al nivel siguiente.', [6, 7, 8], 'Busca qué parte pasa.']), bien: 'Flecha, hongos y décima parte.' },
      'La flecha va hacia quien come, los hongos reciben de todos y pasa cerca de la décima parte.', 'Saca la palabra clave: flecha, hongos, energía.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestra el texto.', { doc: LAGUNA, filas: [{ antes: 'Sin renacuajos, las algas', topes: ['disminuyeron', 'aumentaron', 'no cambiaron'], va: 1 }, { antes: 'De algas a primarios pasó', topes: ['la mitad', 'todo', 'la décima parte'], va: 2 }, { antes: 'Las mojarras murieron por falta de', topes: ['oxígeno', 'agua', 'luz'], va: 0 }], mira: ['Relee qué pasó sin quien las comiera.', 'Compara 8 000 con 800.', 'Relee lo que ocurrió de noche.'], luz: [[6, 'cubrieron la laguna de verde'], [4, 'la décima parte'], [6, 'gastaron el oxígeno']], bien: 'Más algas, un décimo y sin oxígeno.' },
      'Las algas aumentaron, pasó la décima parte y faltó oxígeno.', 'Busca el dato de cada perilla antes de moverla.'),
    x('lee-escala', 'La gráfica muestra la masa de tres niveles de otra laguna (en kg). Pon cada una y cuánto **más** pesan los productores que los primarios.', { vals: [180, 45, 15], rot: ['productores', 'primarios', 'secundarios'], hi: 200, st: 40, et: ['productores', 'primarios', 'secundarios', 'más'], ops: ['', '', ''], metas: ['180', '45', '15', '135'], fichas: ['180', '45', '15', '135', '165', '20', '225'],
      mira: ['Está a mitad de camino entre 160 y 200.', 'Está un poco por encima de 40.', 'Está por debajo de la mitad del primer tramo.', 'Resta los primarios a los productores.'], trampas: { '0:165': 'Cada línea vale 40: la mitad son 20.', '2:20': 'Eso sería justo la mitad del primer tramo.', '3:225': 'Eso es la suma.' }, ok: 'Abajo hay mucho más que arriba.' },
      'Las líneas van de 40 en 40: 180, 45 y 15. La diferencia es $180 - 45 = 135$ kg.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('En un pastizal, los productores tienen 50 000 kcal. Si a cada nivel pasa la décima parte, ¿cuánto llega al consumidor terciario?', ['Al primario llegan [[5 000]] kcal', 'Al secundario, [[500]] kcal', 'Al terciario, [[50]] kcal'], ['10 000', '5', '25 000'], 'Se toma la décima parte tres veces.', 'Cuenta los niveles: son tres pasos.'),
    err('Alguien explica por qué hay pocas águilas en un bosque.', ['El águila está en el último nivel', 'A cada nivel pasa parte de la energía', 'El águila recibe toda la energía de las plantas'], 2, ['Al águila le llega muy poca de la energía de las plantas', 'El águila fabrica su energía con la luz', 'El águila devuelve la energía a las plantas'], 'En cada nivel se pierde casi todo: al último llega muy poca.', '¿Qué parte pasa en cada nivel?'),
    opc('Un insecticida que no se degrada se acumula en los organismos. La mayor concentración se espera en:', ['Las algas', 'Los renacuajos', 'Las garzas, que comen muchos organismos contaminados', 'El agua'], 2, 'Cada nivel come muchos del anterior y guarda lo que no se degrada: arriba se concentra.', 'Piensa cuántas mojarras come una garza y cuántos renacuajos comió cada mojarra.'),
  ]);

  const CICLO = {
    id: 'icf-compost', title: 'El cuaderno del compost',
    ficha: { autor: 'Huerta escolar', fuente: 'Cuaderno de observación', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos de la Tierra son casi siempre los mismos: lo que cambia es dónde están y con quién se juntan. El carbono que hoy está en una hoja estuvo ayer en el aire. A ese ir y venir entre los seres vivos, el aire, el agua y el suelo se le llama ciclo.',
      'En el ciclo del carbono, las plantas toman dióxido de carbono del aire y, con agua y luz, fabrican azúcares y liberan oxígeno: es la fotosíntesis. Plantas, animales, hongos y bacterias usan esos azúcares y devuelven dióxido de carbono al aire: es la respiración. Quemar leña, carbón o gasolina también lo devuelve, pero mucho más rápido, y desde depósitos que tardaron millones de años en formarse.',
      'El nitrógeno es casi cuatro quintas partes del aire y, sin embargo, las plantas no pueden usarlo así. Necesitan que ciertas bacterias, muchas de ellas en las raíces del fríjol y otras leguminosas, lo conviertan en formas que se disuelven en el suelo. Otras bacterias hacen lo contrario y lo regresan al aire.',
      'La huerta hizo una prueba. En la cama A sembró maíz; en la B, maíz con fríjol; en la C, maíz con abono químico. Las tres recibieron la misma agua y la misma luz. A los tres meses, las matas medían en promedio 140, 168 y 175 centímetros. En el agua que escurrió de C había nueve veces los nitratos de A; en la de B, casi los mismos de A.',
      'Ese exceso llega a la quebrada y alimenta las algas, que crecen sin control; al morir, las bacterias que las descomponen consumen el oxígeno. La cama B creció casi lo mismo que C sin ese problema: el nitrógeno del fríjol se va soltando despacio.',
      'Con los restos de la cosecha hicieron compost. Los descomponedores calentaron la pila hasta 58 °C: era su respiración. La masa bajó de 40 a 22 kilogramos. No se destruyó: casi todo lo que falta se fue al aire como dióxido de carbono y vapor de agua.',
    ],
  };
  const l2 = leccion('icf-cn-ecosistemas-2', 'Ciclos de la materia', guion(
    ['La materia circula', 'Los mismos átomos pasan por aire, agua, suelo y seres vivos.'],
    ['Carbono', 'La fotosíntesis lo toma del aire; la respiración y la quema lo devuelven.'],
    ['Nitrógeno', 'Las bacterias lo vuelven útil para las plantas.'],
    ['Exceso', 'Demasiados nutrientes en el agua acaban con el oxígeno.']), [
    x('genero-o-cita', '¿**Toma** dióxido de carbono del aire o lo **devuelve**?', { doc: CICLO, rot: ['lo toma', 'lo devuelve'],
      ...F(['La fotosíntesis del maíz', 0, '¿Qué usa la planta para hacer azúcar?'], ['La respiración de un hongo', 1, '¿Qué sale al usar azúcares?'], ['Quemar gasolina', 1, '¿Qué sale por el exhosto?'], ['La pila de compost caliente', 1, '¿Qué están haciendo los descomponedores?']), bien: 'Una lo guarda, las otras lo sueltan.' },
      'Solo la fotosíntesis lo toma; respirar, quemar y descomponer lo devuelven.', 'Pregunta si se fabrica azúcar o si se gasta.'),
    x('pasos-del-proceso', 'Ordena cómo un exceso de abono deja sin oxígeno una quebrada. El primer paso está en su puesto.', { doc: CICLO, que: 'la cadena', de: 'Del abono a la quebrada', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Sobran nitratos en el suelo.', 'El agua los lleva a la quebrada.', 'Las algas crecen sin control.', 'Mueren y las bacterias las descomponen.', 'Se agota el oxígeno.'], mira: ['', 'Llegan con el agua que escurre.', 'Crecen cuando ya tienen nutrientes.', 'Se descomponen después de morir.', 'Es el resultado final.'], bien: 'Sobra, escurre, crece, muere y falta.' },
      'Los nitratos escurren, las algas crecen, mueren, se descomponen y se agota el oxígeno.', 'Sigue el párrafo 5 de la primera palabra a la última.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: CICLO, portadas: [['Cama A', 'experimento'], ['Qué se siembra o abona', 'experimento'], ['Altura de las matas', 'experimento'], ['Agua y luz', 'experimento']],
      ...T(['el control', 0, '¿Con cuál se comparan las otras?'], ['lo que se cambió', 1, '¿Qué es distinto entre las camas?'], ['lo que se midió', 2, '¿Qué se anotó a los tres meses?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron las tres por igual?']), bien: 'Control, cambio, medida e igualdad.' },
      'A es el control, se cambió lo sembrado o abonado, se midió la altura y agua y luz fueron iguales.', 'Relee el párrafo que cuenta la prueba de las camas.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CICLO, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las matas de C midieron en promedio 175 cm.', 0, 'Léela junto a los datos.'], ['El fríjol ayudó al maíz a crecer.', 1, 'Compara A con B.'], ['Unos 18 kg de la pila pasaron al aire, sobre todo.', 1, 'Compara la masa de antes y la de después.'], ['El fríjol de B dio más cosecha que el maíz.', 2, '¿Se midió la cosecha?']),
      luz: [[4, '140, 168 y 175'], [6, 'de 40 a 22 kilogramos']], bien: 'Comparar y restar.' },
      'Los 175 están escritos; la ayuda del fríjol y los 18 kg se deducen; la cosecha no se midió.', 'Haz la comparación o la resta con los datos.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica **cómo** llega el nitrógeno a las plantas.', { doc: CICLO, nums: [3], apuesta: 'Ciertas bacterias lo vuelven útil.', ...S(['3.1'], { '3.0': 'Dice que está en el aire y que así no sirve.', '3.2': 'Dice cómo vuelve al aire.' }), bien: 'Bacterias en la raíz.' },
      'La segunda oración dice que las bacterias lo convierten en formas que se disuelven.', 'Busca la oración donde algo se convierte en otra cosa útil.'),
    x('mayor-tramo', 'La gráfica muestra la altura (en cm) de una mata de maíz en cuatro semanas. Toca el tramo que más creció **en porcentaje**.', { v: [16, 20, 30, 42] },
      'De 16 a 20 crece 25 %; de 20 a 30, 50 %; de 30 a 42, 40 %. El último crece más centímetros, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('En la prueba, A midió 140 cm, B 168 y C 175. ¿Cuánto más creció B que A, en porcentaje, y cuánto le faltó para igualar a C?', ['B creció $168 - 140 =$ [[28]] cm más', 'Comparado con los 140 de A es un [[20]] % más', 'Le faltaron [[7]] cm para igualar a C'], ['35', '25', '17'], '28 de 140 son el 20 %; $175 - 168 = 7$.', 'El porcentaje se calcula sobre la altura de A.'),
    err('Alguien explica la pérdida de masa del compost.', ['Los descomponedores respiran', 'Al respirar usan los azúcares', 'La materia que falta se destruyó'], 2, ['La materia que falta se fue, sobre todo, como dióxido de carbono y vapor', 'La materia que falta se volvió energía de la luz', 'La materia que falta se volvió nitrógeno del fríjol'], 'La materia no se destruye: salió al aire.', '¿Puede desaparecer la materia en un ciclo?'),
    opc('Para reducir los nitratos que llegan a la quebrada sin perder mucho crecimiento del maíz, la huerta debería:', ['Doblar el abono químico', 'Sembrar maíz con fríjol', 'Quitar toda el agua', 'Sembrar solo maíz'], 1, 'B creció casi lo mismo que C sin el exceso de nitratos.', 'Compara las alturas y lo que escurre de cada cama.'),
  ]);

  const ISLA = {
    id: 'icf-parejas', title: 'Vecinos obligados',
    ficha: { autor: 'Reserva natural «El Roble»', fuente: 'Cartilla para visitantes', fecha: 'Abril de 2026' },
    paras: [
      'Ninguna especie vive sola. En un mismo árbol de la reserva se cruzan al menos cinco maneras de convivir, y se distinguen por una pregunta: ¿quién gana, quién pierde y a quién le da igual?',
      'En el mutualismo ganan los dos. El colibrí toma néctar y lleva polen de una flor a otra. Los hongos de las raíces le dan agua y minerales al roble y reciben azúcares. En el comensalismo uno gana y al otro le da igual: una bromelia se apoya en una rama alta para recibir luz sin quitarle nada al árbol.',
      'En el parasitismo uno gana y el otro pierde, casi siempre sin morir de inmediato. El muérdago hunde sus raíces en la rama y le roba savia. En la depredación el que gana mata: el gavilán caza ratones. La competencia es distinta: pierden los dos, porque gastan energía disputando lo mismo, como dos aves que buscan el mismo hueco para anidar.',
      'Los depredadores y sus presas suben y bajan juntos, con un poco de retraso. La reserva contó cada año ratones y gavilanes: 400 y 8; 700 y 10; 500 y 18; 250 y 12. Cuando hay muchos ratones, los gavilanes crían más; cuando hay muchos gavilanes, los ratones disminuyen; y entonces los gavilanes, sin comida, también.',
      'Todo lugar tiene un límite. La capacidad de carga es el número de individuos que un ambiente puede sostener con su comida, su agua y su espacio. Una población que la supera agota los recursos y baja.',
      'Hace cinco años llegó una rana de otro país. No tenía depredadores en la reserva y comía los mismos insectos que las ranas de aquí. Hoy, de cada diez ranas que se oyen de noche, siete son las nuevas. Es una especie invasora: no por ser extranjera, sino por crecer desplazando a las demás. La reserva no propone acabarlas de golpe, porque ya hay culebras que se alimentan de ellas.',
    ],
  };
  const l3 = leccion('icf-cn-ecosistemas-3', 'Relaciones entre especies', guion(
    ['La pregunta', '¿Quién gana, quién pierde y a quién le da igual?'],
    ['Nombres', 'Mutualismo, comensalismo, parasitismo, depredación y competencia.'],
    ['Suben y bajan', 'Presas y depredadores se siguen con retraso.'],
    ['Límite e invasoras', 'La capacidad de carga y las especies que desplazan a otras.']), [
    x('pinta-tipos', 'Pinta cada caso con su relación.', { doc: ISLA, plumas: ['mutualismo', 'comensalismo', 'parasitismo'],
      ...P(['El colibrí lleva polen y toma néctar.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El muérdago roba savia.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['La bromelia se apoya en la rama.', 1, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El hongo da minerales y recibe azúcares.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['Una garrapata chupa sangre de un perro.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?']), bien: 'Gana-gana, gana-igual y gana-pierde.' },
      'Colibrí y hongo: ganan los dos; bromelia: al árbol le da igual; muérdago y garrapata: el otro pierde.', 'Di qué le pasa a cada uno de los dos seres vivos.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: ISLA,
      ...F(['¿Cuántos gavilanes se contaron?', 3, 'Busca el comienzo que nombra depredadores.'], ['¿Qué es la capacidad de carga?', 4, 'Busca el comienzo que habla de un límite.'], ['¿Cuándo llegó la rana?', 5, 'Busca el comienzo que habla de años.']),
      luz: [[4, '400 y 8'], [5, 'La capacidad de carga'], [6, 'Hace cinco años']], bien: 'Conteo, límite y llegada.' },
      'El conteo está en el 4, el límite en el 5 y la rana en el 6.', 'Lee solo los comienzos de los párrafos y decide.'),
    x('balanza-tesis', 'Afirmación: «la rana nueva desplaza a las de aquí». ¿Qué hace cada dato?', { doc: ISLA, tesis: 'La rana nueva desplaza a las de aquí',
      ...F(['Comen los mismos insectos.', 0, '¿Compiten por algo?'], ['Siete de cada diez que se oyen son nuevas.', 0, '¿Quién domina hoy?'], ['El número de ranas de aquí no ha bajado.', 1, '¿Las desplazó de verdad?'], ['La rana nueva es verde clara.', 2, '¿Cambia quién desplaza?']), bien: 'Comer lo mismo apoya; si no bajan, no.' },
      'Competir y ser mayoría la apoyan; que no bajaran la debilitaría; el color no pesa.', 'Pregunta si el dato muestra que las otras pierden algo.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ISLA, filas: [{ antes: 'Después de que hubo más ratones, los gavilanes', topes: ['bajaron', 'subieron', 'no cambiaron'], va: 1 }, { antes: 'Una especie es invasora por', topes: ['venir de lejos', 'ser fea', 'crecer desplazando'], va: 2 }, { antes: 'En la competencia', topes: ['pierden los dos', 'ganan los dos', 'gana uno siempre'], va: 0 }], mira: ['Compara 10 con 18.', 'Busca «no por… sino por».', 'Relee el final del párrafo 3.'], luz: [[4, '500 y 18'], [6, 'crecer desplazando'], [3, 'pierden los dos']], bien: 'Suben después, desplazan y pierden.' },
      'Los gavilanes subieron al año siguiente, invade quien desplaza y en la competencia pierden los dos.', 'Busca en el texto el dato de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ISLA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'Una población que supera el límite baja.',
      ...T(['El parásito mata siempre de inmediato.', 0, 'Busca qué le pasa al que pierde.'], ['Toda especie extranjera es invasora.', 10, 'Busca por qué es invasora.'], ['La reserva quiere acabar ya las ranas nuevas.', 11, 'Busca qué no propone la reserva.']), bien: 'Casi siempre, sino y no propone.' },
      'El parásito casi nunca mata enseguida, invade quien desplaza y la reserva no las acaba de golpe.', 'Saca la palabra clave: parásito, extranjera, reserva.'),
    x('lee-escala', 'La gráfica muestra los ratones de tres años de otra reserva. Pon cada valor y cuántos **menos** hay en el tercero que en el segundo.', { vals: [350, 600, 200], rot: ['año 1', 'año 2', 'año 3'], hi: 800, st: 200, et: ['año 1', 'año 2', 'año 3', 'menos'], ops: ['', '', ''], metas: ['350', '600', '200', '400'], fichas: ['350', '600', '200', '400', '300', '250', '800'],
      mira: ['Está a tres cuartos del camino entre 200 y 400.', 'Mira en qué línea termina.', 'Mira en qué línea termina.', 'Resta el año 3 al año 2.'], trampas: { '0:300': 'Pasa de la mitad del tramo.', '0:250': 'Eso es un cuarto del tramo.', '3:800': 'Eso es la suma.' }, ok: 'Sube y baja.' },
      'Las líneas van de 200 en 200: 350, 600 y 200. Hay $600 - 200 = 400$ menos.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    sol('Un potrero puede sostener 4 vacas por hectárea. Tiene 15 hectáreas y hoy hay 72 vacas. ¿Cuántas sobran?', ['La capacidad de carga es $4 \\cdot 15 =$ [[60]] vacas', 'De las 72 que hay, sobran [[12]]', 'Si siguen así, el pasto se [[agota]]'], ['19', '132', 'recupera'], 'La capacidad es 60; sobran 12 y el pasto se agota.', 'Multiplica lo que aguanta una hectárea por las que hay.'),
    err('Alguien clasifica la relación entre una abeja y una flor.', ['La abeja toma néctar', 'La flor recibe polen de otra flor', 'Como la abeja se lleva algo, es parasitismo'], 2, ['Como ganan las dos, es mutualismo', 'Como a la flor le da igual, es comensalismo', 'Como compiten, es competencia'], 'La abeja se alimenta y la flor se poliniza: mutualismo.', '¿La flor pierde o gana?'),
    opc('Si una enfermedad acaba con la mayoría de los ratones, lo más probable a corto plazo es que los gavilanes:', ['Aumenten, porque hay más espacio', 'No cambien, porque comen plantas', 'Se vuelvan productores', 'Disminuyan o busquen otra presa'], 3, 'Sin su alimento, bajan o cambian de presa.', 'Mira qué pasa con los gavilanes cuando hay pocos ratones.'),
  ]);

  const BOSQUE = {
    id: 'icf-lobos', title: 'El regreso de las dantas',
    paras: [
      'La danta es el mamífero terrestre más grande de nuestras selvas. Come hojas y frutos y, al caminar, reparte las semillas en sus heces, a veces a varios kilómetros.',
      'En un bosque donde desaparecieron por la caza, los árboles de semilla grande dejaron de nacer lejos de sus padres. Los brotes, apiñados, competían por la luz y casi todos morían.',
      'Hace diez años soltaron quince dantas con collar de rastreo. Hoy son treinta y dos. En las parcelas que visitan hay cinco veces más brotes de semilla grande que en las que no.',
      'Las heces también alimentan a escarabajos que entierran el abono y airean el suelo. Los escarabajos son comida de aves y ranas.',
      'El bosque tiene espacio y frutos para unas cuarenta dantas. Los guardias calculan que se llegará a ese número en pocos años y que después la población se mantendrá cerca de él.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BOSQUE, ...p }, e, { hint: h });
  return mundo('icf-cn-ecosistemas', 'Ecosistemas y Energía', 'ciencias', [l1, l2, l3], [
    ['icf-cn-ecosistemas-1', 'La danta come hojas y frutos: es consumidora primaria.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué come la danta?', [1]], ['¿Cuántas dantas hay hoy?', [3]], ['¿Quién come escarabajos?', [4]]] }, 'La dieta está en el 1, el número en el 3 y los escarabajos en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-ecosistemas-1', 'Una cadena sigue a quien come a quien.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Los escarabajos son comida de aves.', 0], ['Con más dantas, las ranas pueden tener más comida.', 1], ['Las dantas tienen collar de rastreo.', 0], ['Las ranas comen semillas.', 2]] }, 'Aves y collar están escritos; lo de las ranas se deduce por los escarabajos; las semillas no.', 'Sigue la cadena: danta, heces, escarabajo, rana.')],
    ['icf-cn-ecosistemas-1', 'Los consumidores primarios comen productores.', opc('En este bosque, la danta ocupa el nivel de:', ['Productor', 'Consumidor secundario', 'Consumidor primario', 'Descomponedor'], 2, 'Come hojas y frutos: se alimenta de productores.', 'Mira de qué se alimenta la danta.')],
    ['icf-cn-ecosistemas-2', 'El abono devuelve materia al suelo.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Los restos de unos seres vuelven al suelo y sirven a otros.', cards: [['Hojas secas que se pudren y abonan un árbol', true], ['Estiércol que fertiliza un cultivo', true], ['La luz del sol que calienta una piedra', false], ['El agua que se evapora de un charco', false]] }, 'Hojas y estiércol devuelven materia; la piedra y el charco no son restos de seres vivos.', 'Busca restos de seres vivos que otro aprovecha.')],
    ['icf-cn-ecosistemas-2', 'Enterrar el abono mantiene los nutrientes en el suelo.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 5], options: ['Las heces alimentan escarabajos que mejoran el suelo.', 'El bosque sostiene a unas cuarenta dantas.', 'Los escarabajos dañan el suelo.', 'La población crecerá sin parar.'], key: [0, 1] }, 'El 4 habla de los escarabajos y el 5 del límite; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-ecosistemas-2', 'La materia circula: lo que uno desecha, otro lo usa.', opc('Los escarabajos ayudan al ciclo de la materia porque:', ['Crean nutrientes de la nada', 'Hacen fotosíntesis', 'Destruyen el carbono', 'Llevan al suelo los nutrientes de las heces'], 3, 'Entierran las heces y sus nutrientes quedan disponibles.', 'Piensa adónde va el abono.')],
    ['icf-cn-ecosistemas-3', 'Los brotes apiñados compiten por la luz.', pl('intruso-excepto', 'La opción que no corresponde a la danta', { ask: 'Según el texto, las dantas hacen todo esto, EXCEPTO:', cards: [['Comer frutos', [1]], ['Repartir semillas', [1]], ['Alimentar escarabajos', [4]], ['Cazar ranas', null]] }, 'Comer, repartir y alimentar están en el texto; cazar ranas no.', 'Busca cada acción en el texto.')],
    ['icf-cn-ecosistemas-3', 'Capacidad de carga: cuántos sostiene el lugar.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al animal', 'cuenta qué pasó sin él', 'muestra datos del regreso', 'sigue otro efecto en la red', 'explica hasta dónde crecerá', 'enseña a cazar dantas'], key: [0, 1, 2, 3, 4] }, 'Presenta, cuenta la ausencia, da datos, sigue la red y explica el límite.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-ecosistemas-3', 'Cerca del límite, la población deja de crecer.', opc('Los guardias esperan que la población se mantenga cerca de cuarenta porque:', ['Las dantas dejan de respirar', 'Es la capacidad de carga del bosque', 'Los collares lo impiden', 'Las ranas se las comen'], 1, 'El bosque tiene espacio y frutos para unas cuarenta.', 'Relee el último párrafo.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-energia.js
// Preicfes · Ciencias Naturales · mundo 6 «Energía y Calor» (spec 2026-11-25-preicfes-estructura). Experimentos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const PISTA = {
    id: 'icf-pista', title: 'La pista de canicas',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Febrero de 2026' },
    paras: [
      'La energía no se ve: se nota en lo que puede hacer. Un cuerpo que se mueve tiene energía cinética: depende de su masa y del cuadrado de su velocidad. Uno que está en alto tiene energía potencial gravitatoria: depende de su masa, de la gravedad y de la altura. A la suma de las dos se le llama energía mecánica.',
      'El curso soltó una canica de 100 gramos desde una rampa de 80 centímetros de alto. Arriba, quieta, toda su energía era potencial: 0.8 julios, tomando la gravedad como 10. Al bajar, la altura disminuye y la velocidad crece: la potencial se convierte en cinética.',
      'Si nada frenara a la canica, la suma sería siempre 0.8 julios. A mitad de la altura habría 0.4 de potencial y 0.4 de cinética; abajo, 0.8 de cinética, y, sin contar el giro, la velocidad sería de 4 metros por segundo. En la otra rampa subiría de nuevo hasta 80 centímetros.',
      'Midieron. Abajo la velocidad fue de 3.7 metros por segundo y la canica subió solo 60 centímetros en la otra rampa. Faltaba energía. No había desaparecido: el roce había calentado un poquito la pista y la canica, y parte se había ido en sonido. La energía total se conserva; la mecánica, solo si no hay roce.',
      'Repitieron con una canica de 200 gramos, desde la misma altura. Tenía el doble de energía, pero llegó abajo con la misma velocidad. Al chocar con un taco de madera, sin embargo, lo empujó el doble de distancia. La masa no cambia la rapidez de la caída; cambia lo que la energía puede hacer.',
      'Por último soltaron la canica desde el doble de altura. Abajo no llegó con el doble de velocidad, sino con cerca de 1.4 veces. Como la energía cinética va con el cuadrado de la velocidad, duplicarla exige menos que duplicar la rapidez. Por eso un carro que va al doble de velocidad necesita unas cuatro veces la distancia para frenar.',
    ],
  };
  const l1 = leccion('icf-cn-energia-1', 'Energía mecánica', guion(
    ['Cinética y potencial', 'Movimiento y altura. Su suma es la energía mecánica.'],
    ['Se transforma', 'Al bajar, la potencial se vuelve cinética; al subir, al revés.'],
    ['Se conserva', 'Sin roce, la suma no cambia; con roce, una parte pasa a calor y sonido.'],
    ['El cuadrado', 'El doble de velocidad es cuatro veces la energía cinética.']), [
    x('genero-o-cita', '¿Qué energía tiene **más**: potencial o cinética?', { doc: PISTA, rot: ['potencial', 'cinética'],
      ...F(['La canica quieta, arriba', 0, '¿Está en alto o se mueve rápido?'], ['La canica al pasar por abajo', 1, '¿Está en alto o se mueve rápido?'], ['Un columpio en el punto más alto', 0, '¿Está en alto o se mueve rápido?'], ['Una flecha que pasa a ras del suelo', 1, '¿Está en alto o se mueve rápido?']), bien: 'Altura o movimiento.' },
      'Quieta arriba y en lo alto del columpio, potencial; abajo y a ras, cinética.', 'Pregunta si lo que la tiene es la altura o el movimiento.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PISTA, nums: [4, 5, 6], pregunta: 'Queda en pie', queda: 'Con roce, la energía mecánica disminuye.',
      ...T(['La energía que faltaba desapareció.', [3, 4], 'Busca adónde se fue.'], ['La canica pesada cae más rápido.', [6, 8], 'Busca con qué velocidad llegó.'], ['Con el doble de altura, el doble de velocidad.', [10, 11], 'Busca cuánto creció la velocidad.']), bien: 'Calor, misma rapidez y 1.4.' },
      'Se fue en calor y sonido, la masa no cambia la rapidez y la velocidad creció 1.4 veces.', 'Saca la palabra clave: desapareció, pesada, doble.'),
    x('voz-de-la-fuente', 'Ata cada momento a su energía, si no hay roce.', { ayuda: 'Tira un hilo desde cada reparto hasta su momento.', doc: PISTA, portadas: [['Arriba', 'momento'], ['A la mitad', 'momento'], ['Abajo', 'momento'], ['En la otra rampa, al parar', 'momento']],
      ...T(['0.8 J de potencial, al soltarla', 0, '¿Cuándo está quieta al comienzo?'], ['0.4 J y 0.4 J', 1, '¿Cuándo están repartidas?'], ['0.8 J de cinética', 2, '¿Cuándo va más rápido?'], ['otra vez 0.8 J de potencial', 3, '¿Cuándo vuelve a quedar quieta?']), bien: 'La suma siempre es 0.8.' },
      'Arriba toda es potencial, a la mitad se reparte, abajo toda es cinética y al parar vuelve a ser potencial.', 'En cada momento, las dos deben sumar 0.8 julios.'),
    x('lee-escala', 'La gráfica muestra la energía (en mJ) de otra canica en tres momentos. Pon cada valor y cuánta se **perdió** del inicio al final.', { vals: [500, 450, 350], rot: ['inicio', 'mitad', 'final'], hi: 600, st: 100, et: ['inicio', 'mitad', 'final', 'se perdió'], ops: ['', '', ''], metas: ['500', '450', '350', '150'], fichas: ['500', '450', '350', '150', '405', '305', '850'],
      mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre 400 y 500.', 'Está a mitad de camino entre 300 y 400.', 'Resta la final a la inicial.'], trampas: { '1:405': 'Cada línea vale 100: la mitad son 50.', '2:305': 'Cada línea vale 100: la mitad son 50.', '3:850': 'Eso es la suma.' }, ok: 'El roce la convierte en calor.' },
      'Las líneas van de 100 en 100: 500, 450 y 350. Se perdieron $500 - 350 = 150$ mJ.', 'Mira cuánto vale cada línea antes de leer.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestran los datos.', { doc: PISTA, filas: [{ antes: 'En la otra rampa subió', topes: ['80 cm', 'más de 80 cm', '60 cm'], va: 2 }, { antes: 'Con doble masa, la velocidad abajo fue', topes: ['el doble', 'la misma', 'la mitad'], va: 1 }, { antes: 'La energía total', topes: ['se conserva', 'se pierde', 'se crea'], va: 0 }], mira: ['Relee lo que midieron.', 'Relee la segunda prueba.', 'Relee el final del párrafo 4.'], luz: [[4, 'subió solo 60 centímetros'], [5, 'con la misma velocidad'], [4, 'La energía total se conserva']], bien: 'Menos altura, igual rapidez, total constante.' },
      'Subió 60 cm, la velocidad fue la misma y la energía total se conserva.', 'Busca el dato de cada perilla antes de moverla.'),
    x('mayor-tramo', 'La gráfica muestra la velocidad (en dm/s) de un carrito en cuatro momentos. Toca el tramo que más creció **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    sol('Un bloque de 2 kg se suelta desde 5 m. Sin roce y con gravedad 10, ¿qué energía tiene y con qué rapidez llega?', ['Energía potencial: $2 \\cdot 10 \\cdot 5 =$ [[100]] J', 'Abajo toda es [[cinética]]', '$\\tfrac12 \\cdot 2 \\cdot v^2$ iguala ese valor: $v =$ [[10]] m/s'], ['50', 'potencial', '20'], 'La cinética de abajo vale 100 J: $v^2 = 100$ y llega a 10 m/s.', 'Iguala la energía de arriba con la de abajo.'),
    err('Un carro pasa de 20 a 40 km/h. ¿Qué pasa con su energía cinética?', ['La velocidad se duplica', 'La energía va con el cuadrado de la velocidad', 'La energía se duplica'], 2, ['La energía se multiplica por 4', 'La energía no cambia', 'La energía se multiplica por 20'], 'La velocidad se multiplica por 2 y la energía, por $2^2 = 4$.', 'Aplica el cuadrado al factor 2.'),
    opc('Un péndulo se suelta desde cierta altura y, sin roce, sube al otro lado:', ['Más alto, porque toma impulso', 'Hasta la misma altura', 'La mitad, porque se cansa', 'No sube'], 1, 'La energía mecánica se conserva: llega a la misma altura.', 'Si no hay roce, la suma de energías no cambia.'),
  ]);

  const CAFE = {
    id: 'icf-termo', title: 'Tres vasos de café',
    ficha: { autor: 'Curso de física de grado once', fuente: 'Bitácora de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Temperatura y calor no son lo mismo. La temperatura dice qué tanto se mueven, en promedio, las partículas de un cuerpo. El calor es energía que pasa de un cuerpo más caliente a uno más frío. Un lago tibio tiene menos temperatura que una taza de café hirviendo, pero muchísima más energía en sus partículas.',
      'El calor viaja de tres maneras. Por conducción, de partícula en partícula, como en una cuchara metida en la sopa. Por convección, cuando un líquido o un gas caliente sube y el frío baja. Por radiación, en ondas que no necesitan materia: así llega el calor del Sol.',
      'El grupo sirvió café a 80 °C en tres vasos iguales de tamaño: uno de metal, uno de vidrio y uno de icopor, todos con la misma tapa. El salón estaba a 20 °C. A los diez minutos midieron 52, 61 y 72 grados. A la hora, el de metal estaba casi a 20, el de vidrio a 26 y el de icopor a 45.',
      'El metal es buen conductor: deja pasar el calor con rapidez. El icopor es aislante, porque está lleno de aire quieto. Por eso, aunque los tres vasos llevan horas en el mismo salón y tienen la misma temperatura, el de metal se siente más frío al tocarlo: se lleva más rápido el calor de la mano.',
      'Al final, si se espera lo suficiente, todos llegan a 20 grados: es el equilibrio térmico. El calor deja de pasar cuando las temperaturas se igualan. Nunca pasa «frío»: lo que sentimos como frío es calor que sale de nosotros.',
      'No todo se calienta con la misma facilidad. Para subir un grado a un kilo de agua se necesitan unos 4 200 julios; a un kilo de arena, unos 800. A esa cantidad se le llama calor específico. Por eso en la playa, a mediodía, la arena quema y el mar no; y por la noche la arena se enfría primero.',
    ],
  };
  const l2 = leccion('icf-cn-energia-2', 'Calor y temperatura', guion(
    ['No son lo mismo', 'Temperatura: qué tanto se mueven las partículas. Calor: energía que pasa.'],
    ['Tres caminos', 'Conducción, convección y radiación.'],
    ['Equilibrio', 'El calor pasa hasta que las temperaturas se igualan.'],
    ['Calor específico', 'El agua necesita mucho calor para subir un grado.']), [
    x('pinta-tipos', 'Pinta cada caso con la manera en que viaja el calor.', { doc: CAFE, plumas: ['conducción', 'convección', 'radiación'],
      ...P(['Una cuchara se calienta en la sopa.', 0, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['El aire caliente sube en un cuarto.', 1, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['El Sol calienta la cara.', 2, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['Las brasas calientan la mano puesta a un lado.', 2, '¿Pasa por contacto, por un fluido que se mueve o en ondas?'], ['La baldosa enfría el pie descalzo.', 0, '¿Pasa por contacto, por un fluido que se mueve o en ondas?']), bien: 'Contacto, fluido y ondas.' },
      'Cuchara y baldosa por contacto, el aire sube por convección y Sol y brasas por radiación.', 'Mira si hay contacto, un fluido que se mueve o nada en medio.'),
    x('genero-o-cita', '¿Se habla de **calor** o de **temperatura**?', { doc: CAFE, rot: ['calor', 'temperatura'],
      ...F(['Lo que marca el termómetro', 1, '¿Se mide en grados?'], ['Energía que pasa a lo más frío', 0, '¿Es algo que pasa o algo que se tiene?'], ['Qué tanto se mueven las partículas', 1, '¿Es un promedio o una energía que pasa?'], ['Los 4 200 julios para un kilo de agua', 0, '¿En qué unidad se mide?']), bien: 'Grados o julios.' },
      'El termómetro y el movimiento promedio son temperatura; la energía que pasa, calor.', 'Los grados miden una; los julios miden la otra.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CAFE, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El salón estaba a 20 °C.', 0, 'Léela junto al experimento.'], ['En diez minutos, el de metal perdió más grados.', 1, 'Compara 80 con cada medida.'], ['El icopor es más barato que el metal.', 2, '¿Se habla de precios?'], ['Con el mismo calor, un kilo de arena sube más grados que uno de agua.', 1, 'Compara 800 con 4 200.']),
      luz: [[3, 'El salón estaba a 20'], [3, '52, 61 y 72'], [6, 'unos 800']], bien: 'Restar y comparar.' },
      'Los 20 están escritos; lo del metal y lo de la arena se deducen; el precio no.', 'Haz las restas de grados y compara los julios.'),
    x('lee-escala', 'La gráfica muestra la temperatura (en °C) a los diez minutos de tres recipientes nuevos. Pon cada una y la diferencia entre la mayor y la menor.', { vals: [75, 60, 45], rot: ['termo', 'barro', 'lata'], hi: 80, st: 20, et: ['termo', 'barro', 'lata', 'diferencia'], ops: ['', '', ''], metas: ['75', '60', '45', '30'], fichas: ['75', '60', '45', '30', '63', '41', '120'],
      mira: ['Está a tres cuartos del camino entre 60 y 80.', 'Mira en qué línea termina.', 'Está a un cuarto del camino entre 40 y 60.', 'Resta la menor a la mayor.'], trampas: { '0:63': 'Cada línea vale 20: tres cuartos son 15.', '2:41': 'Cada línea vale 20: un cuarto son 5.', '3:120': 'Eso es la suma de dos.' }, ok: 'El termo conserva mejor.' },
      'Las líneas van de 20 en 20: 75, 60 y 45. La diferencia es $75 - 45 = 30$ °C.', 'Mira qué parte del tramo alcanza cada barra.'),
    x('balanza-tesis', 'Afirmación: «el icopor conserva mejor el calor». ¿Qué hace cada dato?', { doc: CAFE, tesis: 'El icopor conserva mejor el calor',
      ...F(['A la hora, su café estaba a 45 y los otros por debajo de 30.', 0, '¿Cuál quedó más caliente?'], ['Solo el vaso de icopor tenía tapa.', 1, 'Si fuera cierto, ¿sería por el material?'], ['Los tres vasos tenían la misma tapa.', 0, '¿La comparación es justa?'], ['El café era de la sierra.', 2, '¿Cambia el material del vaso?']), bien: 'Comparar cambiando una sola cosa.' },
      'Los 45 grados y la misma tapa la apoyan; una tapa solo en uno la debilitaría; el origen no pesa.', 'Pregunta si lo único distinto era el material.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que explica por qué el metal **se siente** más frío.', { doc: CAFE, nums: [4], apuesta: 'Se lleva más rápido el calor de la mano.', ...S(['4.2'], { '4.0': 'Dice cómo es el metal, sin hablar de la mano.', '4.1': 'Habla del icopor.' }), bien: 'Misma temperatura, distinta rapidez.' },
      'La tercera oración une las dos cosas: misma temperatura, pero el metal se lleva más rápido el calor.', 'Busca la oración que habla de lo que siente la mano.'),
    sol('Se mezclan 1 kg de agua a 20 °C y 1 kg de agua a 60 °C, sin perder calor. ¿A qué temperatura quedan?', ['El agua caliente [[cede]] calor a la otra', 'Como hay igual masa, quedan a [[40]] °C', 'Cada una cambió [[20]] grados'], ['recibe', '80', '30'], 'Masas iguales de agua: el punto medio, 40 °C.', 'La que está más caliente es la que da.'),
    err('Alguien explica por qué una cobija abriga.', ['El cuerpo está más caliente que el aire', 'El calor pasa del cuerpo al aire', 'La cobija produce calor'], 2, ['La cobija hace que el calor salga más despacio', 'La cobija enfría el aire', 'La cobija deja entrar frío al cuerpo'], 'La cobija es aislante: frena la salida del calor.', '¿De dónde sale el calor: de la cobija o del cuerpo?'),
    opc('A mediodía la arena está a 50 °C y el mar a 27 °C. La mejor explicación es que:', ['El Sol calienta solo la arena', 'El mar refleja toda la luz', 'El agua necesita más calor para subir cada grado', 'La arena está más cerca del Sol'], 2, 'El calor específico del agua es mayor: con el mismo calor sube menos.', 'Compara los julios que pide cada kilo.'),
  ]);

  const SOLAR = {
    id: 'icf-horno', title: 'El horno de la vereda',
    paras: [
      'En una vereda sin gas, los estudiantes construyeron un horno solar: una caja negra por dentro, con tapa de vidrio y paredes rellenas de papel arrugado.',
      'La luz del Sol atraviesa el vidrio y el negro la absorbe. El interior se calienta; el vidrio deja salir poco calor y el aire quieto del papel lo retiene.',
      'Un día despejado midieron: a las diez, 35 °C; a las once, 60; a las doce, 85; a la una, 95. Un huevo tardó cuarenta minutos en cocerse.',
      'Pintaron de blanco otra caja igual. A la una marcaba 52 °C: el blanco refleja gran parte de la luz.',
      'En un día nublado, la caja negra llegó a 50 °C. De noche, sin Sol, se enfrió más despacio que una olla de metal puesta al lado.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: SOLAR, ...p }, e, { hint: h });
  return mundo('icf-cn-energia', 'Energía y Calor', 'ciencias', [l1, l2], [
    ['icf-cn-energia-1', 'La energía se transforma: luz en calor.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Con qué rellenaron las paredes?', [1]], ['¿Cuánto tardó el huevo?', [3]], ['¿Qué pasó en un día nublado?', [5]]] }, 'El relleno está en el 1, el huevo en el 3 y el nublado en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-energia-1', 'Nada se crea: la energía del horno viene del Sol.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El negro absorbe la luz.', 0], ['Sin Sol el horno no cocina.', 1], ['La caja blanca se calentó menos que la negra.', 1], ['El vidrio es irrompible.', 2]] }, 'El negro está escrito; lo de la noche y la comparación se deducen; el vidrio no.', 'Compara 95 con 52 y piensa en la noche.')],
    ['icf-cn-energia-1', 'En el horno, energía luminosa se convierte en térmica.', opc('La transformación de energía que ocurre dentro del horno es:', ['De calor a luz', 'De movimiento a altura', 'De luz a calor', 'De sonido a luz'], 2, 'El negro absorbe la luz y se calienta.', 'Mira qué entra por el vidrio y qué se siente adentro.')],
    ['icf-cn-energia-2', 'Aire quieto: buen aislante.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'El aire quieto retiene el calor.', cards: [['Plumas esponjadas de un pájaro con frío', true], ['Ventana de doble vidrio', true], ['Un ventilador que mueve el aire', false], ['Una cuchara de metal en la sopa', false]] }, 'Plumas y doble vidrio guardan aire quieto; el ventilador lo mueve y el metal conduce.', 'Busca dónde hay aire que no se mueve.')],
    ['icf-cn-energia-2', 'El color cambia cuánta radiación se absorbe.', pl('intruso-excepto', 'La opción que no ayuda a calentar el horno', { ask: 'Todo esto ayuda a que el horno se caliente, EXCEPTO:', cards: [['La tapa de vidrio', [2]], ['El interior negro', [2]], ['El papel de las paredes', [2]], ['Pintarlo de blanco', null]] }, 'Vidrio, negro y papel ayudan; el blanco refleja la luz.', 'Busca lo que hace cada parte en el texto.')],
    ['icf-cn-energia-2', 'Los aislantes frenan el paso del calor.', opc('De noche la caja se enfría más despacio que la olla porque:', ['La caja produce calor', 'El papel con aire quieto frena la salida del calor', 'El metal atrae el frío', 'La Luna la calienta'], 1, 'El aire quieto es aislante; el metal conduce.', 'Compara el material de las dos.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-atomo.js
// Preicfes · Ciencias Naturales · mundo 7 «Átomo y Enlaces» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const ATOMO = {
    id: 'icf-atomo', title: 'La casa vacía de la materia',
    ficha: { autor: 'Profesora de química', fuente: 'Guía de décimo grado', fecha: 'Febrero de 2026' },
    paras: [
      'Todo lo que tocas está hecho de átomos. Cada átomo tiene un núcleo diminuto, con protones, de carga positiva, y neutrones, sin carga. Alrededor se mueven los electrones, de carga negativa y casi dos mil veces más livianos que un protón. Si el núcleo fuera una canica en el centro de un estadio, los electrones andarían por las gradas. En medio no hay nada.',
      'El número de protones se llama número atómico y decide qué elemento es: con 6 protones es carbono; con 7, nitrógeno. No importa lo demás. El número de masa suma protones y neutrones. Un átomo neutro tiene tantos electrones como protones.',
      'Dos átomos del mismo elemento pueden tener distinto número de neutrones: son isótopos. El carbono 12 tiene 6 neutrones y el carbono 14 tiene 8. Químicamente se comportan casi igual. El carbono 14 es inestable: con el tiempo se transforma y emite radiación, y por eso sirve para calcular la edad de restos antiguos.',
      'Un átomo que gana o pierde electrones se vuelve un ion. El sodio pierde uno con facilidad y queda con carga +1: 11 protones y 10 electrones. El cloro gana uno y queda con carga −1. Al formarse un ion cambian los electrones; el núcleo no, así que sigue siendo el mismo elemento.',
      'La tabla periódica ordena los elementos por su número atómico. Las columnas son grupos: los elementos de un mismo grupo tienen igual número de electrones en su última capa y por eso se parecen. Las filas son periodos. Al bajar por un grupo, los átomos son más grandes, porque tienen más capas; al avanzar por un periodo, en general, son más pequeños, porque el núcleo atrae con más fuerza.',
      'A la izquierda y en el centro están los metales, que tienden a perder electrones; a la derecha, los no metales, que tienden a ganarlos. Los gases nobles, en la última columna, tienen completa su última capa y casi no reaccionan. El modelo también ha cambiado: Dalton imaginó esferas; Thomson descubrió el electrón; Rutherford, el núcleo; Bohr propuso niveles de energía.',
    ],
  };
  const l1 = leccion('icf-cn-atomo-1', 'El átomo y la tabla periódica', guion(
    ['Tres partículas', 'Protones y neutrones en el núcleo; electrones alrededor.'],
    ['¿Qué elemento es?', 'Lo decide el número de protones. Isótopo: otros neutrones. Ion: otros electrones.'],
    ['La tabla', 'Grupos que se parecen y periodos que avanzan.'],
    ['Tamaño', 'Crece al bajar y, en general, disminuye al avanzar.']), [
    x('pinta-tipos', 'Pinta cada dato con su partícula.', { doc: ATOMO, plumas: ['protón', 'neutrón', 'electrón'],
      ...P(['Decide qué elemento es.', 0, '¿Cuál da el número atómico?'], ['Está en el núcleo y no tiene carga.', 1, '¿Cuál es neutro?'], ['Es casi dos mil veces más liviano.', 2, '¿Cuál pesa menos?'], ['Cambia de número en un isótopo.', 1, '¿Qué distingue al carbono 12 del 14?'], ['Se gana o se pierde al formar un ion.', 2, '¿Qué cambia al volverse ion?']), bien: 'Identidad, masa y carga.' },
      'El protón decide, el neutrón distingue isótopos y el electrón forma iones.', 'Relee los párrafos 2, 3 y 4: cada uno habla de una.'),
    x('genero-o-cita', '¿Es un **isótopo** o un **ion** del átomo neutro?', { doc: ATOMO, rot: ['isótopo', 'ion'],
      ...F(['Carbono con 8 neutrones', 0, '¿Cambian los neutrones o los electrones?'], ['Sodio con 10 electrones', 1, '¿Cambian los neutrones o los electrones?'], ['Cloro que ganó un electrón', 1, '¿Cambian los neutrones o los electrones?'], ['Hidrógeno con un neutrón más', 0, '¿Cambian los neutrones o los electrones?']), bien: 'Neutrones o electrones.' },
      'El carbono y el hidrógeno cambian neutrones; el sodio y el cloro, electrones.', 'Mira qué partícula es distinta de la del átomo neutro.'),
    x('lee-escala', 'La gráfica muestra el radio (en picómetros) de tres átomos de un mismo grupo. Pon cada uno y cuánto **más** mide el tercero que el primero.', { vals: [150, 190, 230], rot: ['litio', 'sodio', 'potasio'], hi: 240, st: 40, et: ['litio', 'sodio', 'potasio', 'más'], ops: ['', '', ''], metas: ['150', '190', '230', '80'], fichas: ['150', '190', '230', '80', '143', '195', '380'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a tres cuartos del camino entre 160 y 200.', 'Está a tres cuartos del camino entre 200 y 240.', 'Resta el primero al tercero.'], trampas: { '0:143': 'Cada línea vale 40: tres cuartos son 30.', '1:195': 'Cada línea vale 40: tres cuartos son 30.', '3:380': 'Eso es una suma.' }, ok: 'Al bajar por el grupo, crecen.' },
      'Las líneas van de 40 en 40: 150, 190 y 230. La diferencia es $230 - 150 = 80$ pm.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ATOMO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Los elementos de un grupo se parecen.',
      ...T(['El número de neutrones decide qué elemento es.', [0, 1], 'Busca cuál número lo decide.'], ['Al volverse ion, cambia el elemento.', 7, 'Busca qué no cambia.'], ['Al bajar por un grupo los átomos son más pequeños.', 11, 'Busca cómo cambia el tamaño.']), bien: 'Protones, mismo elemento y más grandes.' },
      'Deciden los protones, el núcleo no cambia y al bajar son más grandes.', 'Saca la palabra clave: neutrones, ion, bajar.'),
    x('voz-de-la-fuente', 'Ata cada idea al científico.', { ayuda: 'Tira un hilo desde cada idea hasta su autor.', doc: ATOMO, portadas: [['Dalton', 'modelo'], ['Thomson', 'modelo'], ['Rutherford', 'modelo'], ['Bohr', 'modelo']],
      ...T(['esferas', 0, '¿Quién las imaginó?'], ['el electrón', 1, '¿Quién lo descubrió?'], ['el núcleo', 2, '¿Quién lo descubrió?'], ['niveles de energía', 3, '¿Quién los propuso?']), bien: 'Un modelo se corrige con otro.' },
      'Dalton esferas, Thomson electrón, Rutherford núcleo y Bohr niveles.', 'Relee la última oración del texto: nombra a los cuatro.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ATOMO, filas: [{ antes: 'Entre el núcleo y los electrones hay', topes: ['aire', 'neutrones', 'nada'], va: 2 }, { antes: 'Los gases nobles', topes: ['reaccionan mucho', 'casi no reaccionan', 'son metales'], va: 1 }, { antes: 'Los metales tienden a', topes: ['perder electrones', 'ganar electrones', 'ganar protones'], va: 0 }], mira: ['Relee la comparación del estadio.', 'Relee la última columna.', 'Relee dónde están los metales.'], luz: [[1, 'En medio no hay nada'], [6, 'casi no reaccionan'], [6, 'tienden a perder electrones']], bien: 'Vacío, estables y pierden.' },
      'En medio no hay nada, los nobles casi no reaccionan y los metales pierden electrones.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('Un átomo neutro tiene número atómico 17 y número de masa 35. ¿Cuántas partículas tiene de cada clase?', ['Protones: [[17]]', 'Neutrones: [[18]]', 'Si gana un electrón, queda con [[18]] electrones', 'Su carga será [[−1]]'], ['35', '16', '+1'], 'Protones 17; neutrones $35 - 17 = 18$; con un electrón más, 18 y carga $-1$.', 'El número de masa suma protones y neutrones.'),
    err('Alguien explica qué es el carbono 14.', ['Tiene 6 protones, como todo carbono', 'Su número de masa es 14', 'Por eso tiene 14 neutrones'], 2, ['Por eso tiene 8 neutrones', 'Por eso tiene 14 electrones', 'Por eso tiene 14 protones'], '$14 - 6 = 8$ neutrones: la masa suma los dos.', 'Resta los protones al número de masa.'),
    opc('Dos elementos de un mismo grupo de la tabla se parecen químicamente porque tienen:', ['El mismo número de protones', 'El mismo número de capas', 'Los mismos electrones en la última capa', 'La misma masa'], 2, 'Los electrones de la última capa deciden cómo reaccionan.', 'Piensa qué comparten los de una columna.'),
  ]);

  const ENLACE = {
    id: 'icf-enlace', title: 'Cuatro polvos sin nombre',
    ficha: { autor: 'Grupo de laboratorio', fuente: 'Bitácora de química', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos se unen porque juntos quedan más estables. La mayoría busca completar ocho electrones en su última capa. Hay tres maneras principales de lograrlo y cada una deja su huella en las propiedades de la sustancia.',
      'En el enlace iónico, un metal le entrega electrones a un no metal. Quedan iones de cargas opuestas que se atraen y forman una red ordenada. Por eso las sales son duras, se funden a temperaturas altas y, disueltas o fundidas, conducen la electricidad: sus iones pueden moverse. Sólidas no la conducen, porque los iones están fijos.',
      'En el enlace covalente, dos no metales comparten electrones. Si los comparten por igual, como en el oxígeno del aire, el enlace es apolar. Si uno atrae más, como el oxígeno en el agua, queda un lado un poco negativo y otro un poco positivo: es polar. Muchas sustancias covalentes se funden a temperaturas bajas y no conducen.',
      'En el enlace metálico, los átomos sueltan sus electrones más externos, que se mueven por toda la pieza como un mar. Eso explica que los metales conduzcan bien la electricidad y el calor, y que se puedan doblar sin romperse.',
      'El grupo recibió cuatro polvos o granos sin nombre y los probó. A se fundió a 801 °C, se disolvió en agua y su disolución encendió el bombillo. B se fundió a 186 °C, se disolvió y no lo encendió. C no se disolvió en agua, se fundió a 63 °C y no condujo. D no se disolvió, brillaba, y encendió el bombillo estando sólido.',
      'Con la tabla de la profesora los identificaron: sal, azúcar, parafina y limadura de aluminio. Nadie los probó con la lengua. No fue solo por seguridad: las propiedades que se miden dicen más que el sabor. El color, en cambio, no ayudó: tres eran blancos y solo el enlace los distinguía.',
    ],
  };
  const l2 = leccion('icf-cn-atomo-2', 'Tipos de enlace', guion(
    ['Iónico', 'Un metal entrega electrones a un no metal: sales.'],
    ['Covalente', 'Dos no metales comparten: por igual (apolar) o no (polar).'],
    ['Metálico', 'Electrones sueltos, como un mar.'],
    ['Propiedades', 'El enlace se nota en la fusión, la disolución y la electricidad.']), [
    x('pinta-tipos', 'Pinta cada caso con su enlace.', { doc: ENLACE, plumas: ['iónico', 'covalente', 'metálico'],
      ...P(['Un metal entrega electrones a un no metal.', 0, '¿Se entregan, se comparten o se sueltan?'], ['Dos no metales comparten.', 1, '¿Se entregan, se comparten o se sueltan?'], ['Electrones como un mar.', 2, '¿Se entregan, se comparten o se sueltan?'], ['El agua.', 1, '¿De qué son sus átomos: metales o no metales?'], ['El cobre de un cable.', 2, '¿Es un metal solo?']), bien: 'Entregar, compartir o soltar.' },
      'Entregar es iónico, compartir covalente y soltar metálico; el agua es covalente y el cobre, metálico.', 'Pregunta qué pasa con los electrones en cada caso.'),
    x('pista-tipo', 'Ata cada polvo a su sustancia.', { doc: ENLACE, lineas: ['A: 801 °C, conduce disuelta', 'B: 186 °C, se disuelve, no conduce', 'C: 63 °C, no se disuelve', 'D: brilla y conduce sólida'],
      ...T(['sal', 0, '¿Cuál tiene iones?'], ['azúcar', 1, '¿Cuál se disuelve sin iones?'], ['parafina', 2, '¿Cuál se funde primero?'], ['aluminio', 3, '¿Cuál es metal?']), bien: 'La propiedad delata el enlace.' },
      'La sal conduce disuelta, el azúcar no, la parafina no se disuelve y el aluminio brilla y conduce.', 'Usa juntos la temperatura de fusión y el bombillo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ENLACE, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'La sal disuelta conduce la electricidad.',
      ...T(['La sal sólida conduce.', 3, 'Busca por qué no lo hace.'], ['En el agua los electrones se comparten por igual.', 6, 'Busca quién atrae más.'], ['El color permitió identificarlos.', 11, 'Busca qué no ayudó.']), bien: 'Fijos, polar y no ayudó.' },
      'Los iones están fijos, el oxígeno atrae más y el color no ayudó.', 'Saca la palabra clave: sólida, agua, color.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ENLACE, nums: [2, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El polvo A se fundió a 801 °C.', 0, 'Léela junto a los datos.'], ['Al disolver B no se forman iones.', 1, '¿Por qué no encendió el bombillo?'], ['Si se funde A, encendería el bombillo.', 1, '¿Qué pasa con los iones de una sal fundida?'], ['C es más barato que D.', 2, '¿Se habla de precios?']),
      luz: [[5, 'A se fundió a 801'], [5, 'no lo encendió'], [2, 'fundidas']], bien: 'Sin iones que se muevan, no conduce.' },
      'Los 801 están escritos; que B no forma iones y que A fundida conduce se deducen; el precio no.', 'Usa la regla de los iones para explicar el bombillo.'),
    x('mayor-tramo', 'La gráfica muestra los gramos de una sal que se disuelven en el mismo vaso de agua a cuatro temperaturas. Toca el tramo en que más crece **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Hipótesis: «este polvo es una sal». ¿Qué hace cada dato?', { doc: ENLACE, tesis: 'Este polvo es una sal',
      ...F(['Se funde a 770 °C y disuelto conduce.', 0, '¿Se parece a A?'], ['Conduce estando sólido.', 1, '¿Los iones fijos conducen?'], ['Se funde a 60 °C.', 1, '¿Las sales se funden tan bajo?'], ['Es blanco.', 2, '¿El color decide?']), bien: 'Fusión y electricidad, no color.' },
      'Fundirse alto y conducir disuelto la apoya; conducir sólido o fundirse a 60 la debilita; el color no pesa.', 'Compara cada dato con lo que hizo el polvo A.'),
    sol('El magnesio pierde 2 electrones y el cloro gana 1. ¿Qué compuesto forman?', ['El magnesio queda con carga [[+2]]', 'Cada cloro queda con carga [[−1]]', 'Para que la suma dé cero hacen falta [[2]] cloros', 'El enlace es [[iónico]]'], ['+1', '1', 'covalente'], 'Dos cloros de $-1$ compensan un magnesio de $+2$: $MgCl_2$.', 'Las cargas deben sumar cero.'),
    err('Alguien explica por qué se dobla un alambre de cobre.', ['El cobre tiene enlace metálico', 'Sus electrones forman un mar', 'Como sus iones están fijos, se rompe al doblarlo'], 2, ['Como el mar de electrones se acomoda, las capas se deslizan sin romperse', 'Como comparte electrones por parejas, se vuelve líquido', 'Como no tiene electrones, se estira'], 'El mar de electrones mantiene unida la pieza al deslizarse.', '¿Qué hace el mar de electrones cuando se mueve una capa?'),
    opc('Una sustancia no conduce sólida, se funde a 850 °C y, fundida, conduce. Su enlace es:', ['Iónico', 'Covalente apolar', 'Metálico', 'Covalente polar'], 0, 'Iones fijos en el sólido y móviles al fundirse: iónico.', 'Compara con lo que hace la sal.')]);

  const FUEGO = {
    id: 'icf-pirotecnia', title: 'Los colores de la pólvora',
    paras: [
      'Cada color de un fuego artificial viene de un metal: el sodio da amarillo; el cobre, verde azulado; el estroncio, rojo; el bario, verde.',
      'Al calentarse, los electrones del átomo suben a niveles de mayor energía. Cuando regresan, sueltan esa energía en forma de luz.',
      'Como cada elemento tiene sus propios niveles, cada uno emite sus propios colores: son como una huella digital. Así se sabe de qué están hechas las estrellas.',
      'Los metales se usan en forma de sales, porque son más estables y fáciles de manejar que el metal puro. El sodio puro, por ejemplo, reacciona con violencia con el agua.',
      'El helio se descubrió así: en 1868 se vio en la luz del Sol un color que no correspondía a ningún elemento conocido. Décadas después se encontró en la Tierra.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: FUEGO, ...p }, e, { hint: h });
  return mundo('icf-cn-atomo', 'Átomo y Enlaces', 'ciencias', [l1, l2], [
    ['icf-cn-atomo-1', 'Cada elemento tiene sus propios niveles de energía.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué metal da el rojo?', [1]], ['¿Por qué se emite luz?', [2]], ['¿Cómo se descubrió el helio?', [5]]] }, 'El rojo está en el 1, la luz en el 2 y el helio en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-atomo-1', 'La luz emitida identifica al elemento.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El sodio da amarillo.', 0], ['La luz de una estrella permite saber si tiene sodio.', 1], ['Con la luz se podría saber qué metal lleva un cohete.', 1], ['El bario es el metal más caro.', 2]] }, 'El sodio está escrito; la estrella y el cohete se deducen; el precio no.', 'Une los párrafos 1 y 3.')],
    ['icf-cn-atomo-1', 'Los electrones suben y bajan de nivel.', opc('La luz de un fuego artificial se produce cuando los electrones:', ['Salen del núcleo', 'Regresan a un nivel de menor energía', 'Se vuelven protones', 'Se detienen'], 1, 'Al regresar sueltan energía en forma de luz.', 'Relee qué pasa cuando regresan.')],
    ['icf-cn-atomo-2', 'Las sales son compuestos iónicos, más estables que el metal.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Un elemento se comporta distinto solo que unido a otros.', cards: [['El cloro es tóxico, pero en la sal se come', true], ['El sodio reacciona con agua, la sal no', true], ['El agua caliente se enfría', false], ['Un cable se dobla', false]] }, 'Cloro y sodio cambian al unirse; enfriarse y doblarse no cambian la sustancia.', 'Busca casos en que el elemento está solo y luego unido.')],
    ['icf-cn-atomo-2', 'Metal con no metal: enlace iónico.', pl('intruso-excepto', 'La opción que no es razón para usar sales', { ask: 'Se usan sales en la pólvora por todo esto, EXCEPTO:', cards: [['Son más estables', [4]], ['Son más fáciles de manejar', [4]], ['El metal puro puede ser peligroso', [4]], ['Apagan los colores', null]] }, 'Las tres primeras están en el párrafo 4; los colores no se apagan.', 'Busca cada razón en el párrafo de las sales.')],
    ['icf-cn-atomo-2', 'En una sal, el metal entrega electrones.', opc('En el cloruro de estroncio, el estroncio (metal) y el cloro (no metal) se unen porque:', ['Comparten electrones por igual', 'Sueltan un mar de electrones', 'No tienen electrones', 'El metal entrega electrones al no metal'], 3, 'Metal con no metal: enlace iónico.', 'Pregunta qué hace un metal frente a un no metal.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-herencia.js
// Preicfes · Ciencias Naturales · mundo 8 «Herencia y Evolución» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const CONEJOS = {
    id: 'icf-conejos', title: 'Los conejos de la profesora',
    ficha: { autor: 'Colegio agrícola', fuente: 'Cuaderno de cruces', fecha: 'Febrero de 2026' },
    paras: [
      'Un gen es un tramo de ADN con información para una característica. Cada gen puede tener versiones distintas, llamadas alelos. Una coneja recibe dos alelos de cada gen: uno de la madre y otro del padre. Al conjunto de alelos se le llama genotipo; a lo que se ve, fenotipo.',
      'En los conejos del colegio, el pelo corto es dominante y el largo, recesivo. El alelo dominante se escribe con mayúscula, A; el recesivo, con minúscula, a. Un conejo AA o Aa tiene pelo corto; solo el aa lo tiene largo. El que tiene dos alelos iguales es homocigoto; el que los tiene distintos, heterocigoto.',
      'La profesora cruzó un macho AA con una hembra aa. Todos los hijos recibieron una A del padre y una a de la madre: los doce fueron Aa, de pelo corto. Después cruzó dos de esos hijos. Cada uno puede dar A o a. Las combinaciones son cuatro: AA, Aa, aA y aa. Se esperan tres de pelo corto por cada uno de pelo largo.',
      'Nacieron ocho conejos: cinco cortos y tres largos. Un estudiante dijo que la regla había fallado. No había fallado: la probabilidad dice lo que se espera en muchos nacimientos, no lo que ocurre en cada camada. En los registros de cinco años, con 412 nacimientos de esa clase de cruce, 305 fueron cortos y 107 largos.',
      'No todo se hereda tan sencillo. En algunas flores, ni el rojo ni el blanco dominan y el heterocigoto es rosado. En los grupos sanguíneos, A y B se notan los dos: el hijo puede ser AB. La estatura depende de muchos genes y también de la alimentación.',
      'Además, hay genes en los cromosomas sexuales. El daltonismo más común está en el cromosoma X y es recesivo. Una mujer, XX, necesita dos copias para tenerlo; un hombre, XY, con una le basta. Por eso es más frecuente en ellos. Una mujer con una sola copia no lo tiene, pero puede transmitirlo: es portadora.',
    ],
  };
  const l1 = leccion('icf-cn-herencia-1', 'Genes y cruces', guion(
    ['Dos alelos', 'Uno de la madre y otro del padre. Genotipo: los alelos. Fenotipo: lo que se ve.'],
    ['Dominante y recesivo', 'Con uno dominante basta; el recesivo necesita dos.'],
    ['El cuadro', 'Cuatro casillas con las combinaciones posibles.'],
    ['Probabilidad', 'Dice lo que se espera en muchos, no en cada camada.']), [
    x('genero-o-cita', '¿Es **genotipo** o **fenotipo**?', { doc: CONEJOS, rot: ['genotipo', 'fenotipo'],
      ...F(['Aa', 0, '¿Son letras de alelos o algo que se ve?'], ['Pelo largo', 1, '¿Son letras de alelos o algo que se ve?'], ['Tener dos alelos iguales', 0, '¿Habla de los alelos o de lo que se ve?'], ['Flor rosada', 1, '¿Habla de los alelos o de lo que se ve?']), bien: 'Lo que se tiene y lo que se ve.' },
      'Aa y los alelos iguales son genotipo; el pelo y el color se ven: fenotipo.', 'Pregunta si lo puedes ver o si está en los genes.'),
    x('pista-tipo', 'Ata cada nombre a su genotipo.', { doc: CONEJOS, lineas: ['AA', 'Aa', 'aa'],
      ...T(['homocigoto de pelo corto', 0, '¿Cuál tiene dos iguales y dominantes?'], ['heterocigoto', 1, '¿Cuál tiene dos distintos?'], ['pelo largo', 2, '¿Cuál no tiene ninguna A?']), bien: 'Iguales, distintos y sin A.' },
      'AA es homocigoto corto, Aa heterocigoto y aa de pelo largo.', 'Mira si las letras son iguales y si hay mayúscula.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONEJOS, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un hijo recibe un alelo de cada padre.',
      ...T(['Un conejo Aa tiene el pelo largo.', 2, 'Busca qué pelo tiene el que lleva una A.'], ['Como nacieron tres largos de ocho, la regla falló.', 6, 'Busca qué dice la probabilidad.'], ['La estatura depende de un solo gen.', 11, 'Busca de qué depende.']), bien: 'Corto, no falló y muchos genes.' },
      'El Aa tiene pelo corto, la probabilidad vale en muchos nacimientos y la estatura depende de muchos genes.', 'Saca la palabra clave: Aa, regla, estatura.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONEJOS, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los doce primeros hijos fueron de pelo corto.', 0, 'Léela junto al primer cruce.'], ['Un hijo daltónico recibió el alelo de su madre.', 1, '¿De quién recibe un hombre su X?'], ['Dos padres de pelo corto pueden tener hijos de pelo largo.', 1, '¿Qué pasó al cruzar dos Aa?'], ['Los conejos de pelo largo viven más.', 2, '¿Se habla de cuánto viven?']),
      luz: [[3, 'los doce fueron Aa'], [6, 'un hombre, XY'], [3, 'cada uno de pelo largo']], bien: 'El Y viene del padre, la X de la madre.' },
      'Los doce están escritos; la X de la madre y los hijos largos se deducen; la edad no aparece.', 'Piensa de quién viene cada cromosoma o alelo.'),
    x('lee-escala', 'La gráfica muestra los nacimientos de otro registro. Pon cada valor y cuántos cortos hay **más** que largos.', { vals: [150, 50, 200], rot: ['cortos', 'largos', 'total'], hi: 200, st: 40, et: ['cortos', 'largos', 'total', 'más'], ops: ['', '', ''], metas: ['150', '50', '200', '100'], fichas: ['150', '50', '200', '100', '123', '42', '250'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a un cuarto del camino entre 40 y 80.', 'Mira en qué línea termina.', 'Resta los largos a los cortos.'], trampas: { '0:123': 'Cada línea vale 40: tres cuartos son 30.', '1:42': 'Cada línea vale 40: un cuarto son 10.' }, ok: 'Tres a uno.' },
      'Las líneas van de 40 en 40: 150, 50 y 200. La diferencia es 100.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CONEJOS, filas: [{ antes: 'Al cruzar Aa con Aa se esperan largos', topes: ['la mitad', 'ninguno', 'uno de cada cuatro'], va: 2 }, { antes: 'Una mujer portadora', topes: ['es daltónica', 'no es daltónica, pero puede transmitirlo', 'no lo transmite'], va: 1 }, { antes: 'En las flores rosadas', topes: ['ninguno domina', 'domina el rojo', 'domina el blanco'], va: 0 }], mira: ['Relee las cuatro combinaciones.', 'Relee la última oración.', 'Relee lo de las flores.'], luz: [[3, 'tres de pelo corto por cada uno'], [6, 'es portadora'], [5, 'ni el rojo ni el blanco dominan']], bien: 'Uno de cuatro, transmite y ninguno.' },
      'Uno de cada cuatro, la portadora transmite y en las flores ninguno domina.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('En una planta, la flor morada (M) domina a la blanca (m). Se cruza Mm con mm. ¿Qué se espera?', ['El padre Mm puede dar M o m; la madre, solo [[m]]', 'Los hijos serán Mm o [[mm]]', 'Se espera que sean blancas el [[50]] %'], ['M', 'MM', '25'], 'Mitad Mm (moradas) y mitad mm (blancas).', 'Escribe lo que puede dar cada uno y combínalo.'),
    err('Alguien cruza dos conejos Aa y explica lo que espera.', ['Cada uno da A o a', 'Las combinaciones son AA, Aa, aA y aa', 'Se espera que la mitad sea de pelo largo'], 2, ['Se espera que la cuarta parte sea de pelo largo', 'Se espera que todos sean de pelo largo', 'Se espera que ninguno sea de pelo largo'], 'Solo aa tiene pelo largo: una de cuatro.', 'Cuenta en cuántas combinaciones no hay mayúscula.'),
    opc('Una pareja sin daltonismo tiene un hijo daltónico. Lo más probable es que:', ['El padre sea portador', 'La madre sea portadora', 'Los dos sean daltónicos', 'El hijo no sea de ellos'], 1, 'El hijo recibe su X de la madre; el padre sin daltonismo no tiene el alelo.', 'Pregunta de quién recibe la X un hombre.'),
  ]);

  const REPRO = {
    id: 'icf-fresas', title: 'Las fresas y las abejas',
    ficha: { autor: 'Vivero comunitario', fuente: 'Guía de siembra', fecha: 'Marzo de 2026' },
    paras: [
      'Una mata de fresa puede tener hijas de dos maneras. Con un estolón, un tallo que se arrastra y echa raíces, produce otra mata sin ayuda de nadie: es reproducción asexual. Con la flor, cuando un grano de polen llega al pistilo de otra y se forma una semilla, la reproducción es sexual.',
      'En la asexual hay un solo progenitor y los hijos son genéticamente iguales a él, salvo que ocurra una mutación. Es rápida y no necesita pareja. Así se multiplican las bacterias, que se parten en dos; las levaduras, que forman yemas; y las papas, que se siembran por pedazos.',
      'En la sexual se unen dos células especiales, los gametos: el óvulo y el espermatozoide; en las plantas con flor, el gameto masculino viaja en el polen. Cada gameto tiene la mitad de los cromosomas. Al unirse, el cigoto recupera el número completo. Los gametos humanos tienen 23 cromosomas; las demás células del cuerpo, 46.',
      'Hay dos divisiones celulares que no conviene confundir. La mitosis produce dos células iguales a la original y sirve para crecer y reparar. La meiosis produce cuatro células con la mitad de cromosomas y sirve para formar gametos. En la meiosis los cromosomas intercambian pedazos y se reparten al azar: por eso dos hermanos no son iguales.',
      'En el vivero hicieron una prueba. Cubrieron treinta flores con una malla que no dejaba entrar insectos; dejaron otras treinta abiertas. Las cubiertas dieron 11 fresas, casi todas deformes; las abiertas, 27. La malla dejaba pasar el sol, el aire y la lluvia.',
      'El año siguiente apareció un hongo. En la parcela sembrada con estolones de una sola mata murieron casi todas; en la que venía de semillas, murió una de cada cuatro. Ser iguales ahorra tiempo mientras nada cambia. Cuando algo cambia, la variedad es el seguro de vida de una especie.',
    ],
  };
  const l2 = leccion('icf-cn-herencia-2', 'Reproducción', guion(
    ['Asexual', 'Un progenitor, hijos iguales, rápida.'],
    ['Sexual', 'Dos gametos con la mitad de cromosomas: hijos variados.'],
    ['Mitosis y meiosis', 'Dos iguales para crecer; cuatro con la mitad para gametos.'],
    ['Variedad', 'Protege cuando el ambiente cambia.']), [
    x('pinta-tipos', 'Pinta cada caso con su tipo de reproducción.', { doc: REPRO, plumas: ['asexual', 'sexual'],
      ...P(['Una bacteria se parte en dos.', 0, '¿Hay uno o dos progenitores?'], ['El polen llega a otra flor.', 1, '¿Hay uno o dos progenitores?'], ['Un estolón echa raíces.', 0, '¿Hay uno o dos progenitores?'], ['Un óvulo se une a un espermatozoide.', 1, '¿Hay uno o dos progenitores?'], ['Se siembra un pedazo de papa.', 0, '¿Hay uno o dos progenitores?']), bien: 'Uno o dos progenitores.' },
      'Bacteria, estolón y papa tienen un progenitor; polen y óvulo unen dos gametos.', 'Cuenta cuántos progenitores aportan en cada caso.'),
    x('genero-o-cita', '¿Es **mitosis** o **meiosis**?', { doc: REPRO, rot: ['mitosis', 'meiosis'],
      ...F(['Cierra una herida', 0, '¿Repara o forma gametos?'], ['Forma óvulos', 1, '¿Repara o forma gametos?'], ['Da dos células iguales', 0, '¿Cuántas y cómo quedan?'], ['Reduce a la mitad los cromosomas', 1, '¿Cuál divide el número?']), bien: 'Crecer o formar gametos.' },
      'Reparar y dar dos iguales es mitosis; formar óvulos con la mitad, meiosis.', 'Pregunta para qué sirve y cuántos cromosomas quedan.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba de la malla.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: REPRO, portadas: [['Flores abiertas', 'experimento'], ['Malla', 'experimento'], ['Número de fresas', 'experimento'], ['Sol, aire y lluvia', 'experimento']],
      ...T(['el control', 0, '¿Con cuáles se compara?'], ['lo que se cambió', 1, '¿Qué impedía entrar a los insectos?'], ['lo que se midió', 2, '¿Qué contaron?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron todas?']), bien: 'Control, cambio, medida e igual.' },
      'Las abiertas son el control, la malla lo que se cambió, las fresas lo medido y sol, aire y lluvia lo igual.', 'Relee cómo se hizo la prueba con las flores.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REPRO, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las flores abiertas dieron 27 fresas.', 0, 'Léela junto a la prueba.'], ['Los insectos ayudan a que se formen buenas fresas.', 1, 'Compara cubiertas y abiertas.'], ['Entre las matas de semilla había algunas resistentes al hongo.', 1, '¿Por qué no murieron todas?'], ['El hongo llegó en las abejas.', 2, '¿Se dice cómo llegó?']),
      luz: [[5, '27'], [5, '11 fresas'], [6, 'una de cada cuatro']], bien: 'Comparar grupos permite deducir.' },
      'Las 27 están escritas; los insectos y la resistencia se deducen; cómo llegó el hongo no.', 'Compara qué pasó en cada grupo de plantas.'),
    x('mayor-tramo', 'La gráfica muestra cuántas bacterias (en miles) hay cada hora. Toca el tramo que más creció **en porcentaje**.', { v: [8, 14, 24, 36] },
      'De 8 a 14 crece 75 %; de 14 a 24, 71 %; de 24 a 36, 50 %. El último suma más, pero en porcentaje crece menos.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Idea: «la variedad genética protegió a las fresas de semilla». ¿Qué hace cada dato?', { doc: REPRO, tesis: 'La variedad protegió a las de semilla',
      ...F(['Las iguales murieron casi todas.', 0, '¿Qué pasó donde no había variedad?'], ['Las de semilla estaban en otra parcela, con menos humedad para el hongo.', 1, '¿Hay otra explicación?'], ['Se repitió en la misma parcela con igual resultado.', 0, '¿Descarta otra explicación?'], ['Las fresas son rojas.', 2, '¿Habla de la variedad?']), bien: 'Otra explicación posible debilita.' },
      'Las iguales y la repetición la apoyan; la humedad distinta la debilita; el color no pesa.', 'Pregunta qué más pudo ser distinto entre las parcelas.'),
    sol('Una célula del cuerpo de un perro tiene 78 cromosomas. ¿Cuántos tienen sus gametos y el cigoto?', ['El gameto tiene la mitad: [[39]]', 'El cigoto junta dos gametos: [[78]]', 'El gameto se forma por [[meiosis]]'], ['156', 'mitosis', '40'], '$78 \\div 2 = 39$ y dos gametos suman 78.', 'Los gametos llevan la mitad.'),
    err('Alguien explica por qué dos hermanos no son iguales.', ['Cada gameto se forma por meiosis', 'En la meiosis los cromosomas se reparten al azar', 'Por eso todos los gametos de una persona son iguales'], 2, ['Por eso los gametos de una persona son distintos entre sí', 'Por eso los hermanos tienen distinto número de cromosomas', 'Por eso los hermanos son genéticamente iguales'], 'El reparto al azar hace distintos a los gametos.', '¿Qué produce un reparto al azar?'),
    opc('Un cultivo de banano se multiplica siempre por hijuelos de la misma planta. Su mayor riesgo es que:', ['Crezca muy despacio', 'Una sola enfermedad afecte a todas las plantas', 'Las plantas sean muy distintas', 'No tenga cromosomas'], 1, 'Son genéticamente iguales: si una es vulnerable, todas lo son.', 'Recuerda qué pasó con las fresas de estolones.'),
  ]);

  const EVO = {
    id: 'icf-lagartijas', title: 'Las lagartijas de la isla Parda',
    ficha: { autor: 'Grupo de campo', fuente: 'Diario de observación', fecha: 'Abril de 2026' },
    paras: [
      'En la isla Parda, las rocas son oscuras. Hace ochenta años, un naturalista contó lagartijas: nueve de cada diez eran verdes y una era parda. Hoy, de cada diez, ocho son pardas. Nadie las pintó y ninguna lagartija verde se volvió parda. Lo que cambió fue la población.',
      'La selección natural lo explica con cuatro pasos. Uno: los individuos de una población no son iguales; hay variación. Dos: parte de esa variación se hereda. Tres: nacen más de los que pueden sobrevivir. Cuatro: los que tienen características favorables en ese ambiente sobreviven y se reproducen más, y dejan más hijos parecidos.',
      'Sobre roca oscura, los halcones ven mejor a las verdes. Las pardas llegaban más a menudo a tener crías, que también eran pardas. Generación tras generación, la proporción cambió. La variación apareció antes, por mutaciones al azar; el ambiente no la fabricó, la seleccionó.',
      'Conviene evitar dos errores. El primero es pensar que los individuos se adaptan porque lo necesitan: una lagartija no se oscurece por esforzarse. El segundo es creer que lo favorable lo es siempre: en la isla vecina, de arena clara, las pardas casi no existen. Estar adaptado es estarlo a un lugar y a un momento.',
      'Las pruebas de la evolución vienen de muchas partes. Los fósiles muestran formas intermedias. Los huesos del brazo humano, la aleta de la ballena y el ala del murciélago son los mismos, acomodados de otra manera. El ADN de especies emparentadas se parece más que el de especies lejanas.',
      'También la vemos mientras ocurre. Si se toma un antibiótico y se abandona antes de tiempo, mueren primero las bacterias sensibles y quedan las pocas resistentes. Esas se multiplican. La siguiente infección ya no responde. No es que la bacteria «se acostumbre»: es que las otras murieron.',
    ],
  };
  const l3 = leccion('icf-cn-herencia-3', 'Selección natural', guion(
    ['Cuatro pasos', 'Variación, herencia, más nacimientos que sobrevivientes y reproducción diferente.'],
    ['La población cambia', 'El individuo no se transforma: cambia la proporción.'],
    ['Al azar y seleccionada', 'La mutación es al azar; el ambiente selecciona.'],
    ['Pruebas', 'Fósiles, huesos parecidos, ADN y bacterias resistentes.']), [
    x('pasos-del-proceso', 'Ordena lo que pasó con las lagartijas. El primer paso está en su puesto.', { doc: EVO, que: 'el cambio', de: 'De verdes a pardas', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Hay verdes y unas pocas pardas.', 'Los halcones cazan más verdes.', 'Las pardas tienen más crías.', 'Las crías heredan el color.', 'La mayoría es parda.'], mira: ['', 'Es lo que hace el ambiente.', 'Es lo que logran las que sobreviven.', 'Es lo que les pasa a sus hijas.', 'Es el resultado.'], bien: 'Variar, cazar, criar, heredar y cambiar.' },
      'Había variación, los halcones cazan verdes, las pardas crían, heredan el color y la población cambia.', 'Sigue los cuatro pasos que explica el párrafo 2.'),
    x('genero-o-cita', '¿La explicación es **correcta** o tiene el **error** típico?', { doc: EVO, rot: ['correcta', 'error típico'],
      ...F(['Se oscureció porque lo necesitaba', 1, '¿El individuo cambia por esfuerzo?'], ['Las pardas dejaron más crías', 0, '¿Habla de reproducción?'], ['La bacteria se acostumbró al remedio', 1, '¿El individuo cambia por esfuerzo?'], ['Quedaron las que ya eran resistentes', 0, '¿La variación estaba antes?']), bien: 'No se esfuerzan: se seleccionan.' },
      'Necesitar y acostumbrarse son el error; dejar crías y quedar las resistentes es la selección.', 'Pregunta si cambia el individuo o la población.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVO, nums: [1, 3, 4], pregunta: 'Queda en pie', queda: 'Lo favorable depende del lugar.',
      ...T(['Cada lagartija verde se volvió parda.', 3, 'Busca qué no hizo ninguna.'], ['El ambiente fabricó el color pardo.', 8, 'Busca qué hizo el ambiente.'], ['Ser parda es ventaja en cualquier isla.', [11, 12], 'Busca la isla vecina.']), bien: 'Ninguna, seleccionó y otra isla.' },
      'Ninguna se volvió parda, el ambiente seleccionó y en la arena clara casi no hay pardas.', 'Saca la palabra clave: cada, fabricó, cualquier.'),
    x('pista-tipo', 'Ata cada clase de prueba a su ejemplo.', { doc: EVO, lineas: ['formas intermedias en la roca', 'brazo, aleta y ala con los mismos huesos', 'secuencias parecidas', 'bacterias resistentes'],
      ...T(['fósiles', 0, '¿Cuál se halla en la roca?'], ['anatomía comparada', 1, '¿Cuál habla de huesos?'], ['ADN', 2, '¿Cuál compara secuencias?'], ['evolución observada hoy', 3, '¿Cuál ocurre ante nosotros?']), bien: 'Muchas pruebas, una idea.' },
      'Los fósiles, los huesos, el ADN y las bacterias apuntan a lo mismo.', 'Mira de dónde sale cada una de las pruebas.'),
    x('lee-escala', 'La gráfica muestra las pardas de cada cien en tres conteos. Pon cada valor y cuánto **subió** del primero al último.', { vals: [10, 45, 80], rot: ['hace 80 años', 'hace 40', 'hoy'], hi: 80, st: 20, et: ['primero', 'segundo', 'hoy', 'subió'], ops: ['', '', ''], metas: ['10', '45', '80', '70'], fichas: ['10', '45', '80', '70', '5', '41', '90'],
      mira: ['Está a mitad de camino de la primera línea.', 'Está a un cuarto del camino entre 40 y 60.', 'Mira en qué línea termina.', 'Resta el primero al último.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '1:41': 'Cada línea vale 20: un cuarto son 5.', '3:90': 'Eso es la suma.' }, ok: 'De 10 a 80.' },
      'Las líneas van de 20 en 20: 10, 45 y 80. Subió $80 - 10 = 70$.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('balanza-tesis', 'Hipótesis: «los halcones causaron el cambio». ¿Qué hace cada dato?', { doc: EVO, tesis: 'Los halcones causaron el cambio',
      ...F(['En un islote oscuro sin halcones, siguen siendo verdes.', 0, '¿Qué pasa al quitar los halcones?'], ['En un islote oscuro sin halcones, también son pardas.', 1, '¿Hicieron falta los halcones?'], ['Los halcones anidan en marzo.', 2, '¿Explica el color?']), bien: 'Quitar una causa la pone a prueba.' },
      'Sin halcones y verdes la apoya; sin halcones y pardas la debilita; el mes no pesa.', 'Compara lugares con halcones y lugares sin ellos.'),
    sol('En una población de 200 polillas, 20 son oscuras. Tras un incendio sobreviven 18 oscuras y 42 claras. ¿Qué porcentaje es oscuro antes y después?', ['Antes eran oscuras el [[10]] %', 'Sobrevivieron en total [[60]]', 'Ahora son oscuras el [[30]] %'], ['18', '20', '43'], '$20 \\div 200 = 10\\%$; $18 \\div 60 = 30\\%$.', 'Compara siempre con el total de ese momento.'),
    err('Alguien explica el cuello largo de las jirafas.', ['Había jirafas de cuello más largo y más corto', 'Las de cuello largo alcanzaban más comida', 'Al estirarse, el cuello les creció y lo heredaron'], 2, ['Dejaron más crías, que heredaron el cuello largo', 'Las de cuello corto se estiraron hasta alcanzar', 'El cuello creció porque lo necesitaban'], 'Lo que se gana por estirarse no se hereda: se seleccionó la variación que ya había.', '¿Se hereda lo que se estira en la vida?'),
    opc('Un paciente suspende el antibiótico al sentirse mejor. Esto favorece la resistencia porque:', ['Las bacterias aprenden a defenderse', 'El antibiótico crea bacterias nuevas', 'Sobreviven y se multiplican las más resistentes', 'El cuerpo rechaza el remedio'], 2, 'Mueren las sensibles y quedan las resistentes, que se multiplican.', 'Piensa cuáles quedan vivas.'),
  ]);

  const MAIZ = {
    id: 'icf-maiz', title: 'De dónde salió el maíz',
    paras: [
      'Hace unos nueve mil años, en lo que hoy es México, la gente recogía los granos de una hierba llamada teocinte. Su mazorca medía lo que un dedo y tenía una docena de granos duros.',
      'Cada año guardaban para sembrar las semillas de las plantas con granos más grandes o más blandos. Es selección artificial: escoge la gente y no el ambiente.',
      'Cuando los científicos compararon el ADN del maíz y del teocinte, hallaron que la diferencia de forma depende, en gran parte, de unos pocos genes. Todavía se pueden cruzar y dar hijos fértiles.',
      'El maíz moderno ya no puede vivir solo: sus granos no se sueltan y, si la mazorca cae entera, los brotes se ahogan entre sí. Necesita quien lo desgrane.',
      'Hay cientos de variedades: de colores, de clima frío o caliente. Cuando un hongo atacó los cultivos de un país que sembraba casi una sola, se perdió una parte enorme de la cosecha. La resistencia se halló en otras variedades que casi nadie sembraba.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: MAIZ, ...p }, e, { hint: h });
  return mundo('icf-cn-herencia', 'Herencia y Evolución', 'ciencias', [l1, l2, l3], [
    ['icf-cn-herencia-1', 'Unos pocos genes pueden cambiar mucho la forma.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué se halló al comparar el ADN?', [3]], ['¿Cómo era el teocinte?', [1]], ['¿Por qué no puede vivir solo el maíz?', [4]]] }, 'El ADN está en el 3, el teocinte en el 1 y la dependencia en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-herencia-1', 'Lo que se hereda pasa en las semillas.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El teocinte tenía una docena de granos.', 0], ['El tamaño del grano se hereda.', 1], ['Maíz y teocinte son parientes cercanos.', 1], ['El teocinte era amarillo.', 2]] }, 'La docena está escrita; que se hereda y el parentesco se deducen; el color no.', 'Piensa por qué sirvió guardar esas semillas.')],
    ['icf-cn-herencia-1', 'El fenotipo depende del genotipo.', opc('Guardar las semillas de las plantas con granos grandes sirvió porque:', ['Las semillas grandes no necesitan agua', 'Los hijos heredan los alelos de sus padres', 'El grano crece por desearlo', 'El teocinte no tiene genes'], 1, 'Al reproducir esas plantas, sus alelos se hicieron más comunes.', 'Pregunta qué reciben las plantas hijas.')],
    ['icf-cn-herencia-2', 'La variedad protege.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Sembrar una sola variedad es un riesgo.', cards: [['Un cultivo de papas iguales arrasado por una plaga', true], ['Un bosque con un solo tipo de pino, enfermo', true], ['Una huerta con veinte especies', false], ['Una vaca que da más leche', false]] }, 'Papas iguales y pinos iguales muestran el riesgo; la huerta variada es lo contrario.', 'Busca casos en que todo es igual y algo lo ataca.')],
    ['icf-cn-herencia-2', 'Hijos fértiles: parentesco cercano.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del maíz moderno se dice todo esto, EXCEPTO:', cards: [['Necesita quien lo desgrane', [4]], ['Puede cruzarse con el teocinte', [3]], ['Tiene cientos de variedades', [5]], ['Crece bajo el agua', null]] }, 'Las tres primeras están en el 4, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-herencia-2', 'Reproducción sexual: variedad.', opc('Conservar variedades viejas de maíz es útil porque:', ['Pueden tener alelos que sirvan ante una enfermedad', 'Son más bonitas', 'No se reproducen', 'Todas son iguales'], 0, 'La resistencia al hongo se halló en variedades que casi nadie sembraba.', 'Piensa qué puede faltarles a plantas casi iguales cuando llega una plaga.')],
    ['icf-cn-herencia-3', 'Selección artificial: escoge la gente.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 4], options: ['La gente escogió qué semillas sembrar.', 'El maíz depende de las personas.', 'El ambiente escogió las semillas.', 'El maíz se siembra solo.'], key: [0, 1] }, 'El 2 habla de escoger semillas; el 4, de su dependencia; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-herencia-3', 'Las mismas reglas: variación, herencia y selección.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al antepasado', 'explica la selección', 'da la prueba del ADN', 'muestra una consecuencia', 'cuenta un riesgo y su salida', 'enseña a cocinar'], key: [0, 1, 2, 3, 4] }, 'Antepasado, selección, prueba, consecuencia y riesgo; no hay receta.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-herencia-3', 'Natural o artificial: quién selecciona.', opc('La diferencia entre la selección del maíz (la gente guardaba las semillas de granos grandes) y la de unas lagartijas que los halcones cazan según su color es:', ['En el maíz no hubo herencia', 'En las lagartijas no hubo variación', 'En el maíz escogió la gente y en las lagartijas, el ambiente', 'Ninguna de las dos es selección'], 2, 'Las dos tienen variación y herencia; cambia quién selecciona.', 'Pregunta quién decidía cuáles se reproducían.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-reacciones.js
// Preicfes · Ciencias Naturales · mundo 9 «Reacciones y Cantidades» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, S, sol, err, opc, guion } = ICF;

  const FRASCO = {
    id: 'icf-frasco-cerrado', title: 'El frasco que no cambió de peso',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'En un cambio físico, la sustancia sigue siendo la misma: el hielo derretido es agua. En un cambio químico, o reacción, unas sustancias se convierten en otras con propiedades distintas. Las que se gastan se llaman reactivos; las que aparecen, productos.',
      'Hay señales que hacen sospechar una reacción: sale un gas, cambia el color, aparece un sólido en un líquido, se libera o se absorbe calor. Son pistas, no pruebas. El agua que hierve también suelta burbujas, y no es una reacción: el vapor sigue siendo agua.',
      'El club quemó un trozo de madera en una balanza. La masa bajó de 50 a 4 gramos y alguien dijo que el resto se había destruido. Después echaron vinagre y bicarbonato en un frasco con tapa. Salió gas y, sin embargo, la balanza marcó lo mismo antes y después. Cuando abrieron la tapa, la masa bajó.',
      'La explicación es que en una reacción los átomos no se crean ni se destruyen: se sueltan de unos y se unen a otros. Por eso la masa total se conserva. La madera parecía perder masa porque los gases se iban; y con un clavo ocurre lo contrario: al oxidarse pesa más, porque se le unen átomos de oxígeno del aire.',
      'Una ecuación química cuenta esa historia. A la izquierda de la flecha van los reactivos; a la derecha, los productos. Debe haber los mismos átomos de cada clase en los dos lados. Para lograrlo se cambian los coeficientes, que dicen cuántas moléculas hay; nunca los subíndices, porque eso cambiaría la sustancia: el agua es H₂O y el agua oxigenada, H₂O₂.',
      'Las reacciones pueden clasificarse. En una síntesis, varias sustancias forman una sola. En una descomposición, una sola da varias. En una combustión, una sustancia se une con oxígeno y libera energía en forma de calor y luz. Si la reacción libera calor es exotérmica; si lo absorbe, endotérmica. Encender una estufa es lo primero; la compresa que se enfría al golpearla, lo segundo. Las plantas también absorben energía, la del Sol, para formar azúcar.',
    ],
  };
  const l1 = leccion('icf-cn-reacciones-1', 'Reacciones y conservación', guion(
    ['Físico o químico', 'En una reacción aparecen sustancias nuevas.'],
    ['La masa se conserva', 'Los átomos no se crean ni se destruyen: se reacomodan.'],
    ['Balancear', 'Se cambian los coeficientes, nunca los subíndices.'],
    ['Clases', 'Síntesis, descomposición y combustión; exotérmica o endotérmica.']), [
    x('genero-o-cita', '¿Es un cambio **físico** o **químico**?', { doc: FRASCO, rot: ['físico', 'químico'],
      ...F(['Se derrite un helado', 0, '¿Aparece una sustancia nueva?'], ['Se quema un papel', 1, '¿Aparece una sustancia nueva?'], ['Se disuelve azúcar en agua', 0, '¿Aparece una sustancia nueva?'], ['Se oxida una reja', 1, '¿Aparece una sustancia nueva?'], ['Se agria la leche', 1, '¿Aparece una sustancia nueva?']), bien: 'Misma sustancia o sustancia nueva.' },
      'Derretir y disolver no cambian la sustancia; quemar, oxidar y agriar, sí.', 'Pregunta si al final hay una sustancia que antes no estaba.'),
    x('balancea-atomos', 'Balancea la formación del **agua**: $H_2 + O_2 \\to H_2O$. Mueve cuántas moléculas hay de cada una, con los números **más pequeños**.', { izq: [['H₂', { H: 2 }], ['O₂', { O: 2 }]], der: [['H₂O', { H: 2, O: 1 }]], sol: [2, 1, 2], max: 6 },
      'Con $2H_2 + O_2 \\to 2H_2O$ hay 4 hidrógenos y 2 oxígenos en cada lado.', 'Empieza por el oxígeno: ¿cuántas moléculas de agua usan los dos?'),
    x('conserva-atomos', 'Toca **todas** las ecuaciones que están **balanceadas**.', { casos: [{ t: 'C + O₂ → CO₂', si: true }, { t: 'N₂ + H₂ → NH₃', no: 'Hay 2 nitrógenos antes y 1 después.' }, { t: '2Mg + O₂ → 2MgO', si: true }, { t: 'CH₄ + O₂ → CO₂ + 2H₂O', no: 'Hay 2 oxígenos antes y 4 después.' }, { t: '2H₂O₂ → 2H₂O + O₂', si: true }], falta: 'Falta otra: cuenta átomo por átomo en los dos lados.', ok: 'Los mismos átomos antes y después.' },
      'Carbono, magnesio y agua oxigenada cuadran; en las otras sobran o faltan átomos.', 'Multiplica el coeficiente por el subíndice de cada átomo.'),
    x('masa-cerrada', 'En frascos **cerrados**, pon la masa que falta, en gramos.', { et: ['24 + 32 → ?', '10 + ? → 26', '? → 44 + 56', '7 + 3 → 4 + ?'], metas: ['56', '16', '100', '6'], fichas: ['56', '16', '100', '6', '36', '12', '8'], mira: ['Suma los reactivos.', 'Lo que falta completa el producto.', 'Suma los productos.', 'Los dos lados deben pesar igual.'], trampas: { '1:36': 'Sumaste: los reactivos juntos deben dar 26.', '2:12': 'Restaste: un solo reactivo dio los dos productos.' }, ok: 'La masa total es la misma.' },
      'Los dos lados pesan igual: 56, 16, 100 y 6 gramos.', 'Suma todo lo de un lado e iguálalo con el otro.'),
    x('pista-tipo', 'Ata cada clase de reacción a su ejemplo.', { doc: FRASCO, lineas: ['hierro y azufre forman un solo sólido', 'el agua oxigenada da agua y oxígeno', 'el gas de la estufa arde con oxígeno', 'una compresa química se pone helada'],
      ...T(['síntesis', 0, '¿En cuál varias dan una sola?'], ['descomposición', 1, '¿En cuál una sola da varias?'], ['combustión', 2, '¿En cuál hay llama?'], ['endotérmica', 3, '¿En cuál se absorbe calor?']), bien: 'Cuántas entran, cuántas salen y qué pasa con el calor.' },
      'Juntarse es síntesis, partirse es descomposición, arder es combustión y enfriar es absorber calor.', 'Cuenta los reactivos y los productos, y mira el calor.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: FRASCO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un clavo pesa más al oxidarse.',
      ...T(['Si hay burbujas, hay una reacción.', [1, 2], 'Busca otra cosa que también suelta burbujas.'], ['Al quemarse, los átomos de la madera desaparecen.', 3, 'Busca qué no les pasa a los átomos.'], ['Para balancear se cambian los subíndices.', 9, 'Busca qué se cambia y qué nunca.']), bien: 'Burbujas, átomos y coeficientes.' },
      'El agua que hierve suelta burbujas, los átomos no se destruyen y se cambian los coeficientes.', 'Saca la palabra clave: burbujas, desaparecen, subíndices.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FRASCO, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La madera pasó de 50 a 4 gramos en la balanza.', 0, 'Léela junto al primer experimento.'], ['Los gases de la madera se llevaron más de la mitad de la masa que marcaba.', 1, 'Compara lo que había con lo que quedó.'], ['El frasco abierto perdió gas.', 1, '¿Por qué bajó la masa al abrir la tapa?'], ['El vinagre pesaba 30 gramos.', 2, '¿Se dice cuánto pesaba?']),
      luz: [[3, 'La masa bajó de 50 a 4 gramos'], [4, 'los gases se iban'], [3, 'Cuando abrieron la tapa']], bien: 'Comparar y explicar.' },
      'Los 50 y 4 están escritos; los gases se deducen; el peso del vinagre no aparece.', 'Une lo que midieron con la explicación del párrafo 4.'),
    sol('Balancea $CH_4 + O_2 \\to CO_2 + H_2O$ y cuenta los oxígenos.', ['El metano trae 4 hidrógenos: salen [[2]] moléculas de agua', 'A la derecha hay $2 + 2 =$ [[4]] oxígenos', 'Hacen falta [[2 moléculas]] de $O_2$'], ['3', '1', '4 moléculas'], '$CH_4 + 2O_2 \\to CO_2 + 2H_2O$.', 'Cuadra primero carbono e hidrógeno y deja el oxígeno para el final.'),
    err('Alguien balancea la reacción del hidrógeno con el oxígeno.', ['Se escribe $H_2 + O_2 \\to H_2O$', 'Falta un oxígeno a la derecha', 'Se cambia la fórmula: $H_2 + O_2 \\to H_2O_2$'], 2, ['Se cambian los coeficientes: $2H_2 + O_2 \\to 2H_2O$', 'Se quita un oxígeno: $H_2 + O \\to H_2O$', 'Se agrega un oxígeno suelto a la derecha'], '$H_2O_2$ es otra sustancia: el agua oxigenada. Los subíndices no se tocan.', '¿Sigue siendo agua lo que quedó a la derecha?'),
    opc('Una vela encendida dentro de un frasco sellado se apaga a los pocos segundos. Si se pesa el frasco completo antes y después, la masa:', ['Es la misma, porque nada entra ni sale', 'Disminuye, porque la vela se gastó', 'Aumenta, porque se forma humo', 'Disminuye, porque el oxígeno desaparece'], 0, 'Los átomos siguen dentro del frasco: la masa se conserva.', 'Piensa si algún átomo salió del frasco.'),
  ]);

  const RECETA = {
    id: 'icf-receta-moles', title: 'La receta de los átomos',
    ficha: { autor: 'Profesora de química', fuente: 'Hoja de clase', fecha: 'Abril de 2026' },
    paras: [
      'Para hacer un sándwich se necesitan dos panes y una tajada de queso. Con diez panes y cuatro tajadas salen cuatro sándwiches: se acaba el queso y sobran dos panes. El queso es lo que limita. En química pasa lo mismo, pero no se cuentan panes sino moléculas.',
      'Las moléculas son demasiado pequeñas para contarlas una por una. Por eso se cuentan por paquetes llamados moles. Un mol tiene 6.02 · 10²³ partículas, así como una docena tiene doce. Un mol de cualquier sustancia tiene el mismo número de partículas, pero no pesa lo mismo: una docena de huevos no pesa lo que una docena de sandías.',
      'La masa molar dice cuántos gramos pesa un mol. Se obtiene sumando las masas de los átomos: si el hidrógeno pesa 1 y el oxígeno 16, un mol de agua, H₂O, pesa 18 gramos. Con 36 gramos de agua se tienen dos moles.',
      'La ecuación balanceada es la receta. En N₂ + 3H₂ → 2NH₃, un mol de nitrógeno necesita tres moles de hidrógeno y produce dos de amoníaco. Los coeficientes dan proporciones entre moles, no entre gramos: un mol de nitrógeno pesa 28 gramos y tres de hidrógeno, apenas 6. Suman 34, que es justo lo que pesan los dos moles de amoníaco.',
      'El reactivo que se acaba primero se llama reactivo límite y decide cuánto producto sale. El otro queda en exceso. Si hay dos moles de nitrógeno y tres de hidrógeno, el hidrógeno alcanza solo para gastar un mol de nitrógeno: salen dos moles de amoníaco y sobra un mol de nitrógeno. El límite no es siempre el que pesa menos, ni el que tiene menos moles: depende de la receta.',
      'En la vida real casi nunca sale todo lo calculado. Parte se pierde, parte no reacciona. El rendimiento compara lo que se obtuvo con lo que se esperaba: si se calculaban 20 gramos y salieron 15, fue del 75 %. Las fábricas gastan mucho dinero para subirlo unos pocos puntos.',
    ],
  };
  const l2 = leccion('icf-cn-reacciones-2', 'Estequiometría', guion(
    ['El mol', 'Un paquete de partículas, como la docena.'],
    ['La receta', 'Los coeficientes dan proporciones entre moles.'],
    ['El que limita', 'El reactivo que se acaba primero decide cuánto sale.'],
    ['Rendimiento', 'Lo que se obtuvo comparado con lo que se esperaba.']), [
    x('paquetes-limite', 'La receta $N_2 + 3H_2 \\to 2NH_3$ usa **1** de $N_2$ y **3** de $H_2$. Hay **5** de $N_2$ y **12** de $H_2$. Mueve cuántas veces se completa la receta.', { hay: [['N₂', 5, 1], ['H₂', 12, 3]], que: 'recetas', max: 8 },
      'El hidrógeno alcanza para $12 \\div 3 = 4$ recetas; sobra 1 de nitrógeno.', 'Divide lo que hay de cada uno entre lo que pide la receta.'),
    x('relacion-moles', 'En $N_2 + 3H_2 \\to 2NH_3$, pon los **moles** que faltan.', { et: ['con 2 de N₂, hidrógeno', 'con 2 de N₂, amoníaco', 'con 9 de H₂, nitrógeno', 'para 10 de NH₃, hidrógeno'], metas: ['6', '4', '3', '15'], fichas: ['6', '4', '3', '15', '2', '30', '27'], mira: ['Por cada nitrógeno van tres.', 'Por cada nitrógeno salen dos.', 'Por cada tres hidrógenos va uno.', 'Halla cuántas recetas dan 10.'], trampas: { '3:30': 'Cada receta da 2 de amoníaco, no 1.', '2:27': 'Multiplicaste: aquí se divide entre 3.', '0:2': 'La receta es 1 a 3.' }, ok: 'Los coeficientes son la receta.' },
      'La receta 1 : 3 : 2 da 6, 4, 3 y 15 moles.', 'Cuenta primero cuántas veces se hace la receta.'),
    x('sube-moles', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un mol de $SO_2$, con S = 32 y O = 16, ¿cuántos **gramos** pesa?', r: 64, c: '32 + 2 \\cdot 16', e: { 48: 'Hay dos oxígenos.' } },
      { q: 'Se esperaban **50 g** y salieron **40 g**. ¿De qué **porcentaje** fue el rendimiento?', r: 80, c: '40 \\div 50 \\cdot 100', e: { 40: 'Esos son los gramos.' } },
      { q: 'En $2Mg + O_2 \\to 2MgO$, con Mg = 24 y O = 16, ¿cuántos **gramos** de $O_2$ gastan **48 g** de Mg?', r: 32, c: '1 \\cdot 32', e: { 16: 'El oxígeno viene en pares: $O_2$.', 48: 'Los coeficientes hablan de moles, no de gramos.' } }] },
      '$32 + 32 = 64$ g; $40 \\div 50 = 80\\%$; 48 g son 2 moles de Mg, que gastan 1 mol de $O_2$: 32 g.', 'Pasa los gramos a moles antes de usar la receta.'),
    x('balancea-atomos', 'Balancea la descomposición $KClO_3 \\to KCl + O_2$, con los números **más pequeños**.', { izq: [['KClO₃', { K: 1, Cl: 1, O: 3 }]], der: [['KCl', { K: 1, Cl: 1 }], ['O₂', { O: 2 }]], sol: [2, 2, 3], max: 6 },
      'Los oxígenos cuadran en 6: $2KClO_3 \\to 2KCl + 3O_2$.', 'Busca un número de oxígenos que sirva para grupos de 3 y de 2.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECETA, filas: [{ antes: 'Un mol de agua y un mol de hierro tienen', topes: ['la misma masa', 'el mismo volumen', 'el mismo número de partículas'], va: 2 }, { antes: 'Los coeficientes dan proporciones entre', topes: ['gramos', 'moles', 'litros'], va: 1 }, { antes: 'El reactivo límite es el que', topes: ['se acaba primero', 'pesa menos', 'cuesta más'], va: 0 }], mira: ['Relee la comparación con la docena.', 'Relee qué dicen los coeficientes.', 'Relee cómo se llama el que se acaba.'], luz: [[2, 'el mismo número de partículas'], [4, 'proporciones entre moles'], [5, 'se acaba primero']], bien: 'Partículas, moles y el que se acaba.' },
      'Igual número de partículas, proporciones entre moles y se acaba primero.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('lee-escala', 'La gráfica muestra los gramos de producto en tres intentos. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [12, 18, 27], rot: ['primero', 'segundo', 'tercero'], hi: 30, st: 6, et: ['primero', 'segundo', 'tercero', 'aumentó'], ops: ['', '', ''], metas: ['12', '18', '27', '15'], fichas: ['12', '18', '27', '15', '25', '39', '13'],
      mira: ['Mira en qué línea termina.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 24 y 30.', 'Resta el primero al último.'], trampas: { '2:25': 'Cada línea vale 6: la mitad son 3.', '3:39': 'Eso es la suma.' }, ok: 'De 12 a 27.' },
      'Las líneas van de 6 en 6: 12, 18 y 27. Aumentó $27 - 12 = 15$ g.', 'Mira cuánto vale cada línea antes de leer.'),
    x('balanza-tesis', 'Afirmación: «en este experimento, el oxígeno era el reactivo límite». ¿Qué hace cada dato?', { doc: RECETA, tesis: 'El oxígeno era el límite',
      ...F(['Al agregar más oxígeno salió más producto.', 0, '¿Qué pasa si se agrega del que limita?'], ['Al final sobró oxígeno.', 1, '¿Sobra el que limita?'], ['El frasco era azul.', 2, '¿Cambia las cantidades?']), bien: 'El que limita se acaba.' },
      'Que salga más al agregarlo la apoya; que sobre la debilita; el color no pesa.', 'Recuerda qué le pasa al reactivo límite al final.'),
    sol('En $2H_2 + O_2 \\to 2H_2O$ se tienen 8 moles de $H_2$ y 3 de $O_2$. ¿Cuántos moles de agua salen?', ['El hidrógeno alcanza para $8 \\div 2 =$ [[4]] recetas', 'El oxígeno alcanza para [[3]] recetas: es el límite', 'Salen $3 \\cdot 2 =$ [[6]] moles de agua'], ['8', '2', '11'], 'El oxígeno limita: 3 recetas de 2 moles de agua.', 'Cuenta cuántas recetas permite cada reactivo.'),
    err('Se tienen 10 moles de A y 6 de B para la receta $2A + B \\to C$. Alguien busca el límite.', ['Para 6 de B harían falta 12 de A', 'Solo hay 10 de A', 'B tiene menos moles: B es el límite'], 2, ['No alcanza A para todo B: A es el límite', 'Como hay más A, sobra A', 'Los dos se acaban a la vez'], 'A alcanza para 5 recetas y B, para 6: limita A, aunque tenga más moles.', '¿Cuántas recetas permite cada uno?'),
    opc('Si en $C + O_2 \\to CO_2$ se queman 36 g de carbono (C = 12, O = 16), la masa de $CO_2$ que se produce es:', ['36 g', '44 g', '96 g', '132 g'], 3, '36 g son 3 moles: 3 moles de $CO_2$ pesan $3 \\cdot 44 = 132$ g.', 'Pasa los gramos de carbono a moles.'),
  ]);

  const PH = {
    id: 'icf-repollo', title: 'El repollo que cambia de color',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Mayo de 2026' },
    paras: [
      'El jugo del repollo morado cambia de color según lo que se le eche. Con limón se vuelve rojo; con agua pura queda morado; con jabón, verde. Una sustancia que hace eso se llama indicador.',
      'Los ácidos, como el limón o el vinagre, liberan iones de hidrógeno, H⁺, cuando están en agua. Las bases, como el jabón o la leche de magnesia, liberan iones OH⁻ o atrapan los H⁺. Los ácidos suaves saben agrios y las bases se sienten jabonosas, pero probar o tocar una sustancia desconocida es peligroso: los ácidos y las bases fuertes queman.',
      'El pH mide qué tan ácida es una disolución. Va, por lo general, de 0 a 14: menos de 7 es ácida, 7 es neutra y más de 7 es básica. La escala no avanza de uno en uno, sino por diez: una disolución de pH 3 tiene diez veces más H⁺ que una de pH 4 y cien veces más que una de pH 5.',
      'El club midió varias cosas. El jugo de limón marcó 2; el café, 5; la leche, 6.5; la sangre ronda 7.4; el agua con jabón, 10; el blanqueador, 12. Al agregarle agua al jugo de limón, el pH subió hacia 7, pero por más agua que echaron nunca pasó de 7.',
      'Cuando un ácido y una base se mezclan en la proporción justa, se neutralizan: los H⁺ y los OH⁻ forman agua, y queda una sal. Por eso un antiácido, que es una base suave, alivia la acidez del estómago, y por eso se echa cal a los suelos muy ácidos. Si se echa base de más, la mezcla queda básica.',
      'El pH importa en todas partes. La sangre tiene sustancias que impiden que cambie mucho, porque con pocas décimas de más o de menos el cuerpo falla. La lluvia normal tiene pH cercano a 5.6, porque disuelve dióxido de carbono; la lluvia ácida, por gases de fábricas y carros, puede bajar de 4.5 y daña hojas, lagos y estatuas de mármol.',
    ],
  };
  const l3 = leccion('icf-cn-reacciones-3', 'Ácidos, bases y pH', guion(
    ['Ácidos y bases', 'Los ácidos liberan H⁺; las bases, OH⁻ o atrapan H⁺.'],
    ['La escala', 'Menos de 7 ácida, 7 neutra, más de 7 básica; cada paso es por 10.'],
    ['Neutralizar', 'Ácido y base en la proporción justa dan agua y sal.'],
    ['Diluir', 'Con agua, el pH se acerca a 7 sin pasarlo.']), [
    x('nivel-ph', 'La muestra A tiene pH **6**. Mueve la muestra B, que es **mil veces más ácida**.', { base: 6, k: -3 },
      'Mil es $10^3$: tres pasos hacia lo ácido, pH 3.', 'Cada paso de pH es por diez: cuenta cuántos hacen mil.'),
    x('genero-o-cita', '¿La sustancia es **ácida** o **básica**?', { doc: PH, rot: ['ácida', 'básica'],
      ...F(['Jugo de limón, pH 2', 0, 'Compara su pH con 7.'], ['Agua con jabón, pH 10', 1, 'Compara su pH con 7.'], ['Café, pH 5', 0, 'Compara su pH con 7.'], ['Sangre, pH 7.4', 1, 'Compara su pH con 7.'], ['Lluvia normal, pH 5.6', 0, 'Compara su pH con 7.']), bien: 'Menos o más de 7.' },
      'Limón, café y lluvia están por debajo de 7; jabón y sangre, por encima.', 'El 7 es el punto neutro: mira de qué lado está cada una.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PH, nums: [3, 4, 5], pregunta: 'Queda en pie', queda: 'Un antiácido es una base suave.',
      ...T(['Un pH de 3 es apenas un poco más ácido que uno de 4.', 2, 'Busca cómo avanza la escala.'], ['Con mucha agua, el limón se vuelve básico.', 5, 'Busca de qué número nunca pasó.'], ['Al mezclar ácido y base, la mezcla siempre queda neutra.', 8, 'Busca qué pasa si se echa base de más.']), bien: 'Por diez, hasta 7 y sin pasarse.' },
      'La escala va por diez, el limón diluido nunca pasó de 7 y con base de más queda básica.', 'Saca la palabra clave: poco, agua, siempre.'),
    x('lee-escala', 'La gráfica muestra el pH de tres suelos. Pon cada valor y cuánto **debe subir** el primero para igualar al último.', { vals: [4, 5, 7], rot: ['suelo 1', 'suelo 2', 'suelo 3'], hi: 8, st: 2, et: ['suelo 1', 'suelo 2', 'suelo 3', 'debe subir'], ops: ['', '', ''], metas: ['4', '5', '7', '3'], fichas: ['4', '5', '7', '3', '6.5', '11', '2'],
      mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre 4 y 6.', 'Está a mitad de camino entre 6 y 8.', 'Resta el primero al último.'], trampas: { '2:6.5': 'Cada línea vale 2: la mitad es 1.', '3:11': 'Eso es la suma.' }, ok: 'De 4 a 7.' },
      'Las líneas van de 2 en 2: 4, 5 y 7. Debe subir 3 pasos: mil veces menos H⁺.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pista-tipo', 'Ata cada explicación a lo que se observó.', { doc: PH, lineas: ['el jugo de repollo se vuelve rojo', 'el antiácido alivia el estómago', 'al echar agua, el pH del limón sube hacia 7', 'el pH de la sangre casi no cambia'],
      ...T(['le echaron un ácido', 0, '¿Cuál habla del color?'], ['se neutralizan ácido y base', 1, '¿Cuál mezcla un ácido con una base suave?'], ['se diluye', 2, '¿Cuál agrega agua?'], ['hay sustancias que lo regulan', 3, '¿Cuál se mantiene estable?']), bien: 'Indicador, neutralizar, diluir y regular.' },
      'El rojo indica ácido, el antiácido neutraliza, el agua diluye y la sangre se regula.', 'Pregunta qué se agregó en cada caso y qué cambió.'),
    x('balanza-tesis', 'Hipótesis: «el lago está muriendo por la lluvia ácida». ¿Qué hace cada dato?', { doc: PH, tesis: 'El lago muere por la lluvia ácida',
      ...F(['Su pH bajó de 6.8 a 4.6 en veinte años de lluvias ácidas.', 0, '¿Hay acidez como se esperaba?'], ['Su pH no ha cambiado y apareció una fuga de petróleo.', 1, '¿Hay acidez? ¿Hay otra causa?'], ['El lago tiene forma de pera.', 2, '¿Dice algo de la acidez?']), bien: 'La causa debe dejar huella.' },
      'Que el pH baje la apoya; sin cambio y con otra causa se debilita; la forma no pesa.', 'Piensa qué debería medirse si la causa fuera esa.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que explica **qué ocurre con los iones** al neutralizar.', { doc: PH, nums: [5], apuesta: 'Los iones se juntan y forman agua.', ...S(['5.0'], { '5.1': 'Da dos usos de la neutralización.', '5.2': 'Dice qué pasa si se echa de más.' }), bien: 'H⁺ y OH⁻ forman agua.' },
      'La primera oración lo explica: los H⁺ y los OH⁻ forman agua, y queda una sal.', 'Busca la oración que nombra los dos iones.'),
    sol('Una muestra de pH 9 se lleva a pH 7. ¿Cómo cambia la cantidad de H⁺?', ['La muestra de pH 9 es [[básica]]', 'De 9 a 7 hay [[2]] pasos', 'La cantidad de H⁺ se multiplica por [[100]]'], ['ácida', '20', '16'], 'Cada paso hacia lo ácido multiplica por 10: $10 \\cdot 10 = 100$.', 'Recuerda: a menor pH, más H⁺.'),
    err('Alguien quiere subir el pH de un suelo de pH 4.', ['Un suelo de pH 4 es ácido', 'Para neutralizarlo hace falta una base', 'Se le echa vinagre, que tiene pH 3'], 2, ['Se le echa cal, que es una base', 'Se le echa jugo de limón, que tiene pH 2', 'Se le echa más tierra de pH 4'], 'El vinagre es un ácido y bajaría el pH: la cal lo sube.', '¿De qué lado de 7 está lo que se le echa?'),
    opc('La muestra P tiene pH 2 y la muestra Q, pH 4. Es correcto afirmar que:', ['Q es el doble de ácida que P', 'P es cien veces más ácida que Q', 'P es el doble de ácida que Q', 'Las dos son básicas'], 1, 'Dos pasos de pH: $10 \\cdot 10 = 100$ veces.', 'Cada paso de la escala es por diez.'),
  ]);

  const ARREPA = {
    id: 'icf-levadura', title: 'Por qué crece el pan',
    paras: [
      'Las levaduras son hongos diminutos que se alimentan del azúcar de la masa. Sin oxígeno, transforman cada molécula de azúcar en dos de alcohol y dos de dióxido de carbono. La ecuación es C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.',
      'El gas queda atrapado en la masa y la infla. Si la masa se deja en un recipiente abierto, pierde un poco de masa, porque parte del gas se escapa; en uno cerrado, la balanza no cambia.',
      'En el horno, el alcohol se evapora, las burbujas se agrandan con el calor y las levaduras mueren. La corteza se dora por otras reacciones entre azúcares y proteínas.',
      'Hay otra forma de inflar: el polvo de hornear. Trae bicarbonato, que es una base, y un ácido seco. Al mojarse reaccionan y sueltan dióxido de carbono. Con exceso de bicarbonato la torta queda con sabor a jabón.',
      'Una panadera pesó: con 180 gramos de azúcar, que es un mol, esperaba 88 gramos de dióxido de carbono, que son dos moles. Obtuvo 66, porque no toda el azúcar alcanzó a fermentar.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: ARREPA, ...p }, e, { hint: h });
  return mundo('icf-cn-reacciones', 'Reacciones y Cantidades', 'ciencias', [l1, l2, l3], [
    ['icf-cn-reacciones-1', 'En la fermentación aparecen sustancias nuevas.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué produce la levadura?', [1]], ['¿Por qué cambia la masa en un recipiente abierto?', [2]], ['¿Cuánto gas se obtuvo?', [5]]] }, 'Los productos están en el 1, el recipiente en el 2 y lo obtenido en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-reacciones-1', 'Los átomos se conservan.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Cada azúcar da dos moléculas de dióxido de carbono.', 0], ['En un recipiente cerrado el gas sigue adentro.', 1], ['En un recipiente abierto, una parte de los átomos de la mezcla pasa al aire.', 1], ['La levadura es de color café.', 2]] }, 'Las dos moléculas están escritas; lo del gas se deduce; el color no aparece.', 'Une el párrafo 2 con la conservación de la masa.')],
    ['icf-cn-reacciones-1', 'Evaporarse es un cambio físico.', opc('Según el texto, en el horno ocurren cambios físicos y químicos. Un cambio físico es:', ['El dorado de la corteza', 'La fermentación', 'La evaporación del alcohol', 'La reacción del bicarbonato'], 2, 'El alcohol evaporado sigue siendo alcohol.', 'Busca dónde no aparece una sustancia nueva.')],
    ['icf-cn-reacciones-2', 'Los coeficientes son la receta.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se obtuvo menos producto del que permitía la receta.', cards: [['Se esperaban 40 g y salieron 30', true], ['Parte del reactivo no reaccionó', true], ['Salió justo lo calculado', false], ['Se pesó el frasco vacío', false]] }, '30 de 40 y lo que no reaccionó muestran un rendimiento menor; los otros no.', 'Busca casos en que salga menos de lo esperado.')],
    ['icf-cn-reacciones-2', 'La masa de los productos viene de los reactivos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del dióxido de carbono se dice todo esto, EXCEPTO:', cards: [['Infla la masa', [2]], ['También lo suelta el polvo de hornear', [4]], ['Se esperaban 88 gramos', [5]], ['Huele a limón', null]] }, 'Las tres primeras están en el 2, el 4 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-reacciones-2', 'Rendimiento: obtenido sobre esperado.', opc('El rendimiento de la fermentación que midió la panadera fue del:', ['75 %', '22 %', '66 %', '133 %'], 0, 'Se divide lo obtenido: $66 \\div 88 = 0.75$.', 'Divide lo que obtuvo entre lo que esperaba.')],
    ['icf-cn-reacciones-3', 'Ácido y base reaccionan.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 3], options: ['Un ácido y una base sueltan el gas que infla.', 'El calor termina el trabajo.', 'El bicarbonato es un ácido.', 'El horno enfría la masa.'], key: [0, 1] }, 'El 4 habla del polvo de hornear; el 3, del horno; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-reacciones-3', 'Con base de más, la mezcla queda básica.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta la reacción', 'explica qué pasa con la masa', 'cuenta lo que hace el horno', 'muestra otra forma de inflar', 'da una medición', 'compara panaderías'], key: [0, 1, 2, 3, 4] }, 'Reacción, masa, horno, otra forma y medición; no hay panaderías.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-reacciones-3', 'El sabor a jabón delata una base.', opc('La torta con exceso de bicarbonato sabe a jabón porque:', ['Quedó ácida', 'Se evaporó el alcohol', 'Murió la levadura', 'Quedó básica'], 3, 'El bicarbonato sobrante es una base.', 'Recuerda qué clase de sustancia es el bicarbonato.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-ondas.js
// Preicfes · Ciencias Naturales · mundo 10 «Ondas, Luz y Sonido» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const CUERDA = {
    id: 'icf-cuerda', title: 'Lo que viaja y lo que se queda',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Una onda es una perturbación que viaja. Lleva energía de un lugar a otro, pero no lleva la materia: un corcho en un estanque sube y baja mientras la onda pasa, y se queda casi en el mismo sitio. Las que necesitan un medio, como el sonido o las olas, se llaman mecánicas; la luz no lo necesita: es electromagnética y cruza el vacío.',
      'Si el medio vibra de lado a lado mientras la onda avanza, como una cuerda sacudida, es transversal. Si vibra en la misma dirección en que avanza, como un resorte que se aprieta y se suelta, es longitudinal. El sonido en el aire es de esta última clase: zonas apretadas y zonas sueltas que viajan.',
      'Para describirla se mide la amplitud, que es cuánto se aparta del centro; la longitud de onda, que es la distancia entre dos crestas seguidas, y la frecuencia, que es cuántas vibraciones ocurren en un segundo y se mide en hertz. El periodo es lo que tarda una vibración: si hay cinco por segundo, cada una tarda un quinto de segundo.',
      'La rapidez es la longitud de onda multiplicada por la frecuencia. La pone el medio, no quien produce la onda: en el aire, a unos 20 °C, el sonido viaja a cerca de 340 metros por segundo, sea grave o agudo. Por eso, si la frecuencia se duplica, la longitud de onda se reduce a la mitad. En el agua, el sonido va más de cuatro veces más rápido que en el aire.',
      'En el sonido, la frecuencia es el tono: más frecuencia, más agudo. La amplitud es la intensidad: más amplitud, más fuerte. Los humanos oímos, más o menos, de 20 a 20 000 hertz; los perros llegan más arriba. Lo que pasa de nuestro límite se llama ultrasonido.',
      'En la luz visible, la frecuencia es el color: el rojo tiene la menor y el violeta, la mayor. En el vacío todos los colores van igual de rápido, a unos 300 000 kilómetros por segundo. Por eso se ve el rayo antes de oír el trueno: contar los segundos y multiplicarlos por 340 da, más o menos, la distancia en metros.',
    ],
  };
  const l1 = leccion('icf-cn-ondas-1', 'Frecuencia y longitud', guion(
    ['Qué viaja', 'La energía; la materia vibra y se queda.'],
    ['Transversal y longitudinal', 'Vibra de lado o en la misma dirección.'],
    ['Medidas', 'Amplitud, longitud de onda, frecuencia y periodo.'],
    ['Rapidez', 'Longitud por frecuencia; la pone el medio.']), [
    x('largo-onda', 'Una onda viaja a **24 m/s** con frecuencia de **3 Hz**. Mueve su **longitud de onda**.', { v: 24, f: 3, max: 16, u: 'm' },
      'La rapidez entre la frecuencia: $24 \\div 3 = 8$ m de longitud.', 'La longitud por la frecuencia debe dar la rapidez: ¿qué número falta?'),
    x('cuenta-vibraciones', 'El dibujo muestra lo que vibró un punto en **4 s**. Mueve su **frecuencia**.', { n: 12, t: 4, max: 12 },
      'Hay 12 vibraciones en 4 s: 3 cada segundo, 3 Hz.', 'Cuenta las vibraciones completas y repártelas entre los segundos.'),
    x('genero-o-cita', '¿La onda es **mecánica** o **electromagnética**?', { doc: CUERDA, rot: ['mecánica', 'electromagnética'],
      ...F(['El sonido de una flauta', 0, '¿Necesita un medio?'], ['La luz de una estrella', 1, '¿Necesita un medio?'], ['Las olas de un lago', 0, '¿Necesita un medio?'], ['La señal de radio de un satélite', 1, '¿Necesita un medio?'], ['El temblor del suelo', 0, '¿Necesita un medio?']), bien: 'Con medio o en el vacío.' },
      'Sonido, olas y temblores necesitan un medio; luz y radio cruzan el vacío.', 'Pregunta si podría llegar atravesando el espacio vacío.'),
    x('tono-o-volumen', '¿Qué se cambia en el sonido de cada caso?', { et: ['subir el volumen', 'cantar más agudo', 'tocar más suave', 'voz más grave'], metas: ['amplitud', 'frecuencia', 'amplitud', 'frecuencia'], fichas: ['amplitud', 'frecuencia', 'amplitud', 'frecuencia', 'rapidez', 'rapidez'], mira: ['¿Es más fuerte o más agudo?', '¿Es más fuerte o más agudo?', '¿Cambia la fuerza o el tono?', '¿Cambia la fuerza o el tono?'], trampas: { '0:rapidez': 'La rapidez la pone el medio.', '1:rapidez': 'La rapidez la pone el medio.', '2:rapidez': 'La rapidez la pone el medio.', '3:rapidez': 'La rapidez la pone el medio.' }, ok: 'Fuerza: amplitud. Tono: frecuencia.' },
      'El volumen es amplitud; el tono, frecuencia; la rapidez no cambia.', 'Separa lo fuerte o suave de lo agudo o grave.'),
    x('pista-tipo', 'Ata cada medida a su definición.', { doc: CUERDA, lineas: ['cuánto se aparta del centro', 'distancia entre dos crestas seguidas', 'vibraciones en un segundo', 'lo que tarda una vibración'],
      ...T(['amplitud', 0, '¿Cuál mide qué tan alta es?'], ['longitud de onda', 1, '¿Cuál es una distancia entre crestas?'], ['frecuencia', 2, '¿Cuál cuenta en cada segundo?'], ['periodo', 3, '¿Cuál es un tiempo?']), bien: 'Altura, distancia, cuántas y cuánto tarda.' },
      'La amplitud se aparta, la longitud separa crestas, la frecuencia cuenta y el periodo tarda.', 'Mira si cada una es una distancia, un número por segundo o un tiempo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CUERDA, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'El sonido viaja más rápido en el agua que en el aire.',
      ...T(['La onda arrastra el corcho hasta la orilla.', 1, 'Busca qué hace el corcho.'], ['Los sonidos agudos viajan más rápido por el aire.', 4, 'Busca quién pone la rapidez.'], ['En el vacío, la luz roja es más lenta que la violeta.', 8, 'Busca cómo van los colores en el vacío.']), bien: 'Se queda, el medio e igual.' },
      'El corcho se queda, la rapidez la pone el medio y los colores van igual en el vacío.', 'Saca la palabra clave: corcho, agudos, roja.'),
    x('lee-escala', 'La gráfica muestra la rapidez del sonido (en m/s) en tres gases. Pon cada valor y cuánto **mayor** es la tercera que la primera.', { vals: [250, 350, 450], rot: ['gas 1', 'gas 2', 'gas 3'], hi: 500, st: 100, et: ['gas 1', 'gas 2', 'gas 3', 'diferencia'], ops: ['', '', ''], metas: ['250', '350', '450', '200'], fichas: ['250', '350', '450', '200', '205', '305', '700'],
      mira: ['Está a mitad de camino entre 200 y 300.', 'Está a mitad de camino entre 300 y 400.', 'Está a mitad de camino entre 400 y 500.', 'Resta la primera a la tercera.'], trampas: { '0:205': 'Cada línea vale 100: la mitad son 50.', '1:305': 'Cada línea vale 100: la mitad son 50.', '3:700': 'Eso es la suma.' }, ok: 'El medio cambia la rapidez.' },
      'Las líneas van de 100 en 100: 250, 350 y 450. La diferencia es 200 m/s.', 'Mira cuánto vale cada línea antes de leer.'),
    x('sube-rapidez', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Longitud de **0.5 m** y frecuencia de **80 Hz**. ¿Cuál es la **rapidez** en m/s?', r: 40, c: '0.5 \\cdot 80', e: { 80: 'Esa es la frecuencia.' } },
      { q: 'Cada vibración tarda **0.05 s**. ¿Cuál es la **frecuencia** en Hz?', r: 20, c: '1 \\div 0.05', e: { 6: 'Se divide 1 entre el periodo.' } },
      { q: 'La rapidez no cambia y la frecuencia se **triplica**. Si la longitud era **60 cm**, ¿cuánto mide ahora?', r: 20, c: '60 \\div 3', e: { 60: 'Con otra frecuencia cambia.' } }] },
      '$0.5 \\cdot 80 = 40$; $1 \\div 0.05 = 20$; y $60 \\div 3 = 20$ cm.', 'Con la misma rapidez, si una sube, la otra baja en la misma proporción.'),
    sol('Se ve un rayo y el trueno se oye 5 s después. ¿A qué distancia cayó?', ['El sonido recorre cada segundo [[340]] m', 'En 5 s recorre [[1700]] m', 'En kilómetros son [[1.7]]'], ['300', '68', '17'], '$340 \\cdot 5 = 1\\,700$ m: 1.7 km.', 'La luz llega casi al instante: usa la rapidez del sonido.'),
    err('Alguien compara dos sonidos en el mismo aire: uno de 200 Hz y otro de 400 Hz.', ['El de 400 Hz es más agudo', 'Los dos viajan igual de rápido', 'El de 400 Hz tiene el doble de longitud de onda'], 2, ['El de 400 Hz tiene la mitad de longitud de onda', 'Los dos tienen la misma longitud de onda', 'El de 400 Hz no tiene longitud de onda'], 'Con la misma rapidez, doble frecuencia es mitad de longitud.', '¿Qué producto debe quedar igual?'),
    opc('En una cuerda se aumenta solo la amplitud de la onda, sin cambiar la cuerda ni la frecuencia. Entonces:', ['La onda transporta más energía', 'La onda viaja más rápido', 'La longitud de onda se duplica', 'El periodo se reduce'], 0, 'La rapidez la pone la cuerda; más amplitud es más energía.', 'Piensa qué depende del medio y qué no.'),
  ]);

  const ESPEJO = {
    id: 'icf-espejo', title: 'Rebotar, doblarse o quedarse',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Abril de 2026' },
    paras: [
      'Cuando una onda llega a una superficie pueden pasar tres cosas: que rebote, que siga del otro lado o que sea absorbida. Casi siempre ocurre un poco de cada una. Un vidrio deja pasar la mayor parte de la luz y devuelve una pequeña parte: por eso, de noche, nos vemos en la ventana.',
      'Al rebotar, o reflejarse, el ángulo con que sale es igual al ángulo con que llega. Los dos se miden desde la normal, una línea perpendicular a la superficie. En un espejo los rayos salen ordenados y forman una imagen; en una hoja de papel, que es rugosa, salen en todas direcciones.',
      'El eco es el sonido reflejado. Si grito frente a un cerro y el eco vuelve a los dos segundos, el sonido hizo ida y vuelta: el cerro está a la mitad de los 680 metros que recorrió. Los murciélagos y los barcos usan esa idea con ultrasonido. En una sala llena de cortinas casi no hay eco, porque las telas lo absorben.',
      'Al pasar de un medio a otro, la onda cambia de rapidez y, si entra inclinada, de dirección. Eso es la refracción. Cuando la luz pasa del aire al agua, va más despacio y se acerca a la normal; al salir del agua al aire, se aleja. Si llega derecha, sobre la normal, no se desvía.',
      'Por la refracción, un lápiz metido en un vaso parece partido y una moneda en el fondo parece más cerca de la superficie. La frecuencia no cambia al pasar de un medio a otro; la longitud de onda, sí. Como cada color se desvía un poco distinto, un prisma, o una gota de lluvia, separa la luz blanca: de ahí sale el arcoíris.',
      'Si la luz va del agua hacia el aire y llega muy inclinada, ya no puede salir: se refleja toda hacia adentro. Se llama reflexión total interna. Con ella funciona la fibra óptica, un hilo de vidrio por el que la luz viaja rebotando y lleva los mensajes de internet a miles de kilómetros.',
    ],
  };
  const l2 = leccion('icf-cn-ondas-2', 'Reflexión y refracción', guion(
    ['Tres destinos', 'Rebotar, pasar o ser absorbida.'],
    ['Reflexión', 'Sale con el mismo ángulo con que llega, desde la normal.'],
    ['Eco', 'El sonido va y vuelve: la distancia es la mitad.'],
    ['Refracción', 'Al cambiar de medio cambia la rapidez y, si entra inclinada, la dirección.']), [
    x('refleja-angulo', 'Un rayo llega al espejo formando **35° con el espejo**. Mueve el rayo que sale, medido **desde la normal**.', { g: 55, con: true },
      'Con la normal forma $90 - 35 = 55°$, y sale con el mismo ángulo.', 'El ángulo con el espejo y el de la normal completan 90°.'),
    x('eco-distancia', 'En un aire donde el sonido va a **340 m/s**, el eco vuelve a los **3 s**. Mueve la distancia al cerro.', { v: 340, t: 3, max: 1200, paso: 10 },
      'Recorrió $340 \\cdot 3 = 1\\,020$ m en ida y vuelta: el cerro está a 510 m.', 'Halla lo que recorrió en total y piensa que fue y volvió.'),
    x('se-acerca-normal', 'La luz pasa de un medio a otro. ¿Qué hace el rayo?', { et: ['del aire al agua, inclinado', 'del agua al aire, inclinado', 'del aire al agua, sobre la normal', 'del aire al vidrio, inclinado'], metas: ['se acerca', 'se aleja', 'no se desvía', 'se acerca'], fichas: ['se acerca', 'se aleja', 'no se desvía', 'se acerca', 'se aleja', 'no se desvía'], mira: ['En el agua va más despacio.', 'En el aire va más rápido.', 'Llega derecho.', 'En el vidrio va más despacio.'], trampas: { '2:se acerca': 'Cambia la rapidez, pero no la dirección.' }, ok: 'Más despacio, se acerca; más rápido, se aleja.' },
      'Al ir más despacio se acerca a la normal; al ir más rápido, se aleja; derecho no se desvía.', 'Pregunta en qué medio va más despacio y si entra inclinado.'),
    x('genero-o-cita', '¿Es **reflexión** o **refracción**?', { doc: ESPEJO, rot: ['reflexión', 'refracción'],
      ...F(['El eco en un cañón', 0, '¿Rebota o cambia de medio?'], ['Un lápiz que parece partido en el agua', 1, '¿Rebota o cambia de medio?'], ['La luna vista en un charco', 0, '¿Rebota o cambia de medio?'], ['La lente de unas gafas', 1, '¿Rebota o cambia de medio?']), bien: 'Rebotar o cambiar de medio.' },
      'Eco y charco rebotan; el lápiz y la lente cambian de medio.', 'Mira si la onda vuelve o atraviesa la superficie.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ESPEJO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Una gota de lluvia puede separar los colores.',
      ...T(['El vidrio deja pasar toda la luz.', 2, 'Busca qué devuelve el vidrio.'], ['Un rayo que llega sobre la normal se desvía.', 6, 'Busca qué pasa si llega derecha.'], ['Al entrar al agua cambia la frecuencia de la luz.', 8, 'Busca qué no cambia.']), bien: 'Devuelve, no se desvía y no cambia.' },
      'El vidrio devuelve una parte, el rayo derecho no se desvía y la frecuencia no cambia.', 'Saca la palabra clave: toda, normal, frecuencia.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ESPEJO, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las telas absorben el sonido.', 0, 'Léela junto a la sala de cortinas.'], ['Una pared lisa y dura da más eco que una cortina.', 1, '¿Qué hacen las telas con el sonido?'], ['Si el eco volviera en seis segundos, el cerro estaría a 1 020 metros.', 1, 'Usa la misma cuenta del párrafo 3.'], ['El cerro está cubierto de pinos.', 2, '¿Se dice qué tiene?']),
      luz: [[3, 'las telas lo absorben'], [3, 'a la mitad de los 680 metros']], bien: 'Comparar y calcular.' },
      'Las telas están escritas; la pared y los 1 020 m se deducen; los pinos no aparecen.', 'Haz la cuenta de ida y vuelta con otro tiempo.'),
    x('balanza-tesis', 'Hipótesis: «la luz se desvía porque cambia de rapidez». ¿Qué hace cada dato?', { doc: ESPEJO, tesis: 'Se desvía porque cambia de rapidez',
      ...F(['Entre dos líquidos en los que va igual de rápido, no se desvía.', 0, '¿Qué pasa si la rapidez no cambia?'], ['Entre dos medios con la misma rapidez, se desvía mucho.', 1, 'Si fuera cierto, ¿haría falta el cambio de rapidez?'], ['El vaso es de plástico rojo.', 2, '¿Habla de la rapidez?']), bien: 'Quitar la causa la pone a prueba.' },
      'Sin cambio y sin desvío la apoya; sin cambio y con desvío la debilita; el color no pesa.', 'Compara lo que pasa cuando la rapidez cambia y cuando no.'),
    sol('Un barco envía un sonido al fondo y lo recibe 0.4 s después. En el agua va a 1 500 m/s. ¿Qué profundidad hay?', ['En total recorre $1\\,500 \\cdot 0.4 =$ [[600]] m', 'Fue ida y [[vuelta]]', 'La profundidad es [[300]] m'], ['1500', 'sola', '1200'], '$600 \\div 2 = 300$ m.', 'El sonido baja y sube.'),
    err('Un rayo llega a un espejo a 20° de la normal. Alguien halla el ángulo entre el rayo que llega y el que sale.', ['Sale a 20° de la normal', 'Los dos están a lados distintos de la normal', 'Entre los dos hay 20°'], 2, ['Entre los dos hay 40°', 'Entre los dos hay 70°', 'Entre los dos hay 0°'], '20° a un lado y 20° al otro: 40°.', 'Dibuja la normal en medio de los dos rayos.'),
    opc('Una moneda en el fondo de una piscina parece más cerca de la superficie porque, al salir del agua, la luz:', ['Se refleja toda', 'Se acerca a la normal', 'Se absorbe', 'Se aleja de la normal'], 3, 'Al pasar al aire va más rápido y se aleja de la normal: el ojo la ve más arriba.', 'Piensa en qué medio va más rápido.'),
  ]);

  const ECO = {
    id: 'icf-ecografia', title: 'Ver con sonido',
    paras: [
      'Una ecografía usa ultrasonido: sonido de millones de hertz, muy por encima de lo que oímos. Un aparato que se apoya en la piel envía pulsos cortos y escucha lo que vuelve.',
      'Cada vez que el pulso pasa de un tejido a otro, una parte se refleja y otra sigue. Un computador mide cuánto tarda cada eco y calcula a qué profundidad está la superficie que lo devolvió.',
      'Entre la piel y el aparato se pone un gel. Sin él quedaría una capa de aire, y el aire devuelve casi todo el ultrasonido: nada entraría al cuerpo.',
      'Con más frecuencia se ven detalles más pequeños, pero el sonido se absorbe más y no llega tan hondo. Por eso se usa una frecuencia alta para el cuello y una más baja para el abdomen.',
      'Si la superficie que refleja se mueve, como la sangre, el eco vuelve con una frecuencia un poco distinta. Con ese cambio se calcula qué tan rápido va la sangre.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: ECO, ...p }, e, { hint: h });
  return mundo('icf-cn-ondas', 'Ondas, Luz y Sonido', 'ciencias', [l1, l2], [
    ['icf-cn-ondas-1', 'Ultrasonido: más frecuencia de la que oímos.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Para qué sirve el gel?', [3]], ['¿Qué cambia con la frecuencia?', [4]], ['¿Cómo se mide la sangre?', [5]]] }, 'El gel está en el 3, la frecuencia en el 4 y la sangre en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-ondas-1', 'El tiempo del eco da la profundidad.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El aire devuelve casi todo el ultrasonido.', 0], ['Un eco que tarda más viene de más hondo.', 1], ['Para ver hondo conviene una frecuencia menor.', 1], ['El gel es de color azul.', 2]] }, 'Lo del aire está escrito; lo del eco y la hondura se deducen; el color no aparece.', 'Une lo que tarda el eco con la profundidad.')],
    ['icf-cn-ondas-1', 'No oímos por encima de unos 20 000 Hz.', opc('El paciente no oye los pulsos de la ecografía porque:', ['Son muy suaves', 'Su frecuencia es mayor que la que oímos', 'Son electromagnéticos', 'No hay gel'], 1, 'Son millones de hertz; oímos hasta unos 20 000.', 'Compara la frecuencia del aparato con la que oímos.')],
    ['icf-cn-ondas-2', 'El tiempo del eco da la distancia.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se halla una distancia con el tiempo que tarda un eco.', cards: [['El murciélago que encuentra un insecto', true], ['El barco que mide la profundidad', true], ['La linterna que alumbra un cuarto', false], ['El termómetro que marca la fiebre', false]] }, 'El murciélago y el barco usan ecos; la linterna y el termómetro, no.', 'Busca casos en que algo va, rebota y vuelve.')],
    ['icf-cn-ondas-2', 'En cada cambio de medio, una parte se refleja.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del ultrasonido se dice todo esto, EXCEPTO:', cards: [['Una parte se refleja y otra sigue', [2]], ['El aire lo devuelve casi todo', [3]], ['Se absorbe más con más frecuencia', [4]], ['Viaja en el vacío', null]] }, 'Las tres primeras están en el 2, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-ondas-2', 'El eco va y vuelve.', opc('Un pulso viaja a 1 500 m/s dentro del cuerpo y su eco vuelve en 0.0001 s. La superficie que lo reflejó está a:', ['15 cm', '30 cm', '7.5 cm', '1.5 cm'], 2, 'Recorre 0.15 m en ida y vuelta: 7.5 cm.', 'Halla lo que recorre en total y pártelo en dos.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-gases.js
// Preicfes · Ciencias Naturales · mundo 11 «Gases y Disoluciones» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const JERINGA = {
    id: 'icf-jeringa', title: 'La jeringa tapada',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Las partículas de un gas están muy separadas y se mueven sin parar. Al chocar con las paredes del recipiente empujan: eso es la presión. Si el gas se calienta, sus partículas se mueven más rápido y chocan con más fuerza. Si hay más partículas, o menos espacio, los choques son más frecuentes.',
      'Una jeringa tapada encierra una cantidad fija de aire. Al empujar el émbolo sin cambiar la temperatura, el aire cabe en menos espacio y las partículas chocan más seguido: la presión sube. Si el volumen se reduce a la mitad, la presión se duplica. El producto de la presión por el volumen no cambia; es la ley de Boyle.',
      'Un globo inflado y metido al congelador se encoge. La presión es casi la misma, la del aire de afuera, pero al bajar la temperatura el volumen baja. Es la ley de Charles: volumen y temperatura son proporcionales, siempre que la temperatura se mida en kelvin. Para pasar de grados Celsius a kelvin se suman 273.',
      '¿Por qué en kelvin? Porque su cero es el de verdad: no hay nada más frío. Pasar de 10 a 20 °C parece el doble, pero son 283 y 293 kelvin: apenas un 3.5 % más. Un globo no duplica su tamaño por eso.',
      'Si el recipiente es rígido, como una lata de aerosol, el volumen no puede cambiar. Al calentarla, lo que sube es la presión: por eso dice que no se arroje al fuego. Es la ley de Gay-Lussac.',
      'Al inflar una llanta entran más partículas, y con más partículas hay más choques. Presión, volumen, cantidad y temperatura están unidos en una sola ecuación, la del gas ideal: PV = nRT. Un gas real se parece a uno ideal cuando la presión no es muy alta y la temperatura no es muy baja. A gran altura hay menos presión, y en cada litro de aire hay menos partículas de oxígeno: por eso los montañistas se cansan.',
    ],
  };
  const l1 = leccion('icf-cn-gases-1', 'Leyes de los gases', guion(
    ['Presión', 'Los choques de las partículas contra las paredes.'],
    ['Boyle', 'Con temperatura fija, presión por volumen no cambia.'],
    ['Charles', 'Con presión fija, el volumen es proporcional a los kelvin.'],
    ['Gay-Lussac', 'Con volumen fijo, la presión es proporcional a los kelvin.']), [
    x('boyle-embolo', 'Un gas ocupa **6 L** a **2 atm**. Sin cambiar la temperatura, la presión sube a **3 atm**. Mueve el émbolo.', { P: 2, V: 6, P2: 3, max: 9, paso: 1 },
      'El producto es $2 \\cdot 6 = 12$ y $12 \\div 3 = 4$ L.', 'El producto de la presión por el volumen debe ser el mismo.'),
    x('charles-globo', 'Un globo tiene **6 L** a **300 K**. Con la misma presión se enfría a **250 K**. Mueve su volumen.', { V: 6, T: 300, T2: 250, max: 10, paso: 0.5 },
      'El volumen y los kelvin van en la misma proporción: $6 \\cdot \\tfrac{250}{300} = 5$ L.', 'Halla cuántos kelvin corresponden a cada litro.'),
    x('gas-sube-baja', '¿Qué le pasa a lo que se pregunta en cada caso?', { et: ['más presión, igual T: volumen', 'más calor, presión igual: volumen', 'lata al sol: presión', 'sale aire de la llanta: presión'], metas: ['baja', 'sube', 'sube', 'baja'], fichas: ['baja', 'sube', 'sube', 'baja', 'igual', 'igual'], mira: ['El producto no cambia: si una sube, la otra…', 'Con más kelvin, más volumen.', 'El volumen es fijo y las partículas van más rápido.', 'Hay menos partículas que chocan.'], trampas: { '2:igual': 'El volumen es el que no cambia.', '0:igual': 'Para que el producto no cambie, algo debe bajar.' }, ok: 'Boyle, Charles, Gay-Lussac y menos partículas.' },
      'Con Boyle baja, con Charles y Gay-Lussac sube y con menos partículas baja.', 'Mira qué se deja fijo en cada caso y qué se mueve.'),
    x('genero-o-cita', '¿En cada caso se mantiene **la presión** o **el volumen**?', { doc: JERINGA, rot: ['la presión', 'el volumen'],
      ...F(['Un globo en el congelador', 0, '¿Puede cambiar de tamaño?'], ['Una lata cerrada al sol', 1, '¿Puede cambiar de tamaño?'], ['Un globo que se infla al calentarse', 0, '¿Puede cambiar de tamaño?'], ['Una olla sellada que se calienta', 1, '¿Puede cambiar de tamaño?']), bien: 'Flexible o rígido.' },
      'Los globos cambian de tamaño y quedan con la presión de afuera; la lata y la olla son rígidas.', 'Pregunta si las paredes del recipiente pueden moverse.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: JERINGA, nums: [2, 3, 5], pregunta: 'Queda en pie', queda: 'La presión viene de los choques de las partículas.',
      ...T(['Si el volumen baja a la mitad, la presión también.', [1, 2], 'Busca qué le pasa a la presión con la mitad del volumen.'], ['En el congelador el globo crece.', [4, 5], 'Busca qué le pasa al globo.'], ['Al calentar una lata, su volumen crece.', 8, 'Busca qué no puede cambiar.']), bien: 'Se duplica, se encoge y no puede.' },
      'La presión se duplica, el globo se encoge y en la lata el volumen no puede cambiar.', 'Saca la palabra clave: mitad, congelador, lata.'),
    x('lee-escala', 'La gráfica muestra el volumen de un globo (en mL) a 280, 320 y 360 K. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [700, 800, 900], rot: ['280 K', '320 K', '360 K'], hi: 1000, st: 200, et: ['280 K', '320 K', '360 K', 'aumentó'], ops: ['', '', ''], metas: ['700', '800', '900', '200'], fichas: ['700', '800', '900', '200', '650', '850', '1600'],
      mira: ['Está a mitad de camino entre 600 y 800.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 800 y 1 000.', 'Resta el primero al último.'], trampas: { '0:650': 'Cada línea vale 200: la mitad son 100.', '2:850': 'Cada línea vale 200: la mitad son 100.', '3:1600': 'Eso es la suma.' }, ok: 'Cada 40 K, 100 mL más.' },
      'Las líneas van de 200 en 200: 700, 800 y 900. Aumentó 200 mL.', 'Mira cuánto vale cada línea antes de leer.'),
    x('sube-gas', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un gas a **5 atm** ocupa **8 L**. ¿Cuántos **litros** ocupa a **2 atm**, con la misma temperatura?', r: 20, c: '5 \\cdot 8 \\div 2', e: { 16: 'El producto 5 por 8 debe conservarse.' } },
      { q: 'Una lata está a **30** unidades de presión y **300 K**. ¿Cuál es su **presión** a **600 K**?', r: 60, c: '30 \\cdot 2', e: { 30: 'Al calentarse, la presión sube.' } },
      { q: '¿Cuántos **grados Celsius** son **353 K**?', r: 80, c: '353 - 273', e: {} }] },
      '$40 \\div 2 = 20$ L; el doble de kelvin es el doble de presión, 60; y $353 - 273 = 80$.', 'Mira qué queda fijo en cada caso antes de calcular.'),
    sol('Un gas ocupa 4 L a 27 °C. Con la misma presión se calienta a 177 °C. ¿Qué volumen ocupa?', ['27 °C son [[300]] K', '177 °C son [[450]] K', 'El volumen es $4 \\cdot 1.5 =$ [[6]] L'], ['327', '26', '8'], '$\\tfrac{450}{300} = 1.5$: el volumen crece a 6 L.', 'Pasa las temperaturas a kelvin antes de comparar.'),
    err('Un globo de 2 L pasa de 20 °C a 40 °C con la misma presión.', ['Con presión fija, al calentarse el globo crece', 'La temperatura se duplicó', 'El volumen crece en la misma proporción que los kelvin'], 1, ['En kelvin pasó de 293 a 313: un 7 % más', 'La temperatura no cambió', 'La temperatura se redujo a la mitad'], 'La proporción vale en kelvin: el globo crece un 7 %.', '¿En qué unidad se comparan las temperaturas?'),
    opc('Se tapa una jeringa con 20 mL de aire y se empuja hasta 5 mL, sin que cambie la temperatura. La presión del aire:', ['Se reduce a la cuarta parte', 'No cambia', 'Se duplica', 'Se hace cuatro veces mayor'], 3, 'El volumen es la cuarta parte: la presión, cuatro veces mayor.', 'El producto no cambia: compara los volúmenes.'),
  ]);

  const SUERO = {
    id: 'icf-suero', title: 'El suero de la abuela',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una disolución tiene un soluto, lo que se disuelve, y un solvente, lo que disuelve. La concentración dice cuánto soluto hay en cierta cantidad de disolución. No es lo mismo tener mucho soluto que estar muy concentrada: una piscina tiene más sal que una cucharada de salmuera y, sin embargo, está menos salada.',
      'Hay varias formas de medirla. El porcentaje en masa compara los gramos de soluto con cien gramos de disolución; los gramos por litro, con un litro; la molaridad compara los moles de soluto con los litros de disolución. Para cantidades muy pequeñas se usan las partes por millón: un miligramo en un kilogramo. Una cifra sin su unidad no dice nada: cinco puede ser mucho o casi nada.',
      'La abuela de Tania prepara suero casero: un litro de agua hervida, seis cucharaditas rasas de azúcar y media de sal. «Con más sal es peligroso», advierte. Tiene razón: un suero muy concentrado saca agua de las células en vez de dársela.',
      'Diluir es agregar solvente. El soluto no cambia; se reparte en más volumen y la concentración baja. Si a un litro con 10 gramos se le agrega otro litro de agua, quedan 10 gramos en dos litros: cinco por litro. Por eso el producto de la concentración por el volumen es el mismo antes y después.',
      'También se puede concentrar: al evaporar agua, el soluto se queda y la concentración sube. Si se sacan unas gotas de la disolución, en cambio, la concentración no cambia: sale soluto y sale solvente en la misma proporción. Una cucharada de suero está tan salada como la jarra entera.',
      'El agua de los acueductos se trata con cloro: queda entre 0.3 y 2 partes por millón. Con menos, sobreviven microbios; con más, molesta y puede hacer daño. Por eso se mide varias veces al día, en la planta y en las casas. En la etiqueta de un remedio, un cero de más puede convertirlo en veneno.',
    ],
  };
  const l2 = leccion('icf-cn-gases-2', 'Concentración', guion(
    ['Concentración', 'Cuánto soluto hay en cierta cantidad de disolución.'],
    ['Unidades', 'Porcentaje, gramos por litro, molaridad y partes por millón.'],
    ['Diluir', 'Se agrega solvente: el soluto es el mismo.'],
    ['Sacar un poco', 'La concentración no cambia.']), [
    x('concentra-agua', 'Hay **30 g** de azúcar. Mueve el volumen de la disolución para que quede a **20 g por litro**.', { g: 30, meta: 20, max: 3, paso: 0.25 },
      'Los gramos entre la concentración: $30 \\div 20 = 1.5$ litros.', 'Cada litro debe llevar 20 gramos: ¿para cuánto alcanza?'),
    x('diluye-agua', 'Hay **2 L** a **15 g/L**. Mueve el agua que hay que **agregar** para que quede a **5 g/L**.', { V: 2, C: 15, C2: 5, max: 8, paso: 0.5 },
      'Hay 30 g: a 5 g/L llenan 6 L. Se agregan 4 L.', 'Halla cuántos gramos hay y cuántos litros deben ser al final.'),
    x('concentracion-tabla', 'Pon la concentración de cada disolución.', { et: ['12 g en 3 L', '5 g de sal en 50 g de disolución', '0.5 mol en 0.25 L', '4 mg en 2 kg'], metas: ['4 g/L', '10 %', '2 mol/L', '2 ppm'], fichas: ['4 g/L', '10 %', '2 mol/L', '2 ppm', '36 g/L', '5 %', '0.125 mol/L'], mira: ['Divide los gramos entre los litros.', 'Compara con cien gramos.', 'Divide los moles entre los litros.', 'Cada parte por millón es 1 mg por kg.'], trampas: { '0:36 g/L': 'Multiplicaste: se divide entre los litros.', '1:5 %': 'Son 5 de 50, no de 100.', '2:0.125 mol/L': 'Multiplicaste: se divide entre los litros.' }, ok: 'Soluto entre disolución.' },
      '$12 \\div 3 = 4$; $5 \\div 50 = 10\\%$; $0.5 \\div 0.25 = 2$; y 2 mg por kg.', 'Siempre se divide el soluto entre la disolución.'),
    x('mas-o-menos-concentrada', '¿Qué le pasa a la **concentración**?', { et: ['se agrega agua', 'se evapora agua', 'se saca la mitad del jugo', 'se agrega y disuelve azúcar'], metas: ['baja', 'sube', 'no cambia', 'sube'], fichas: ['baja', 'sube', 'no cambia', 'sube', 'baja', 'no cambia'], mira: ['El mismo soluto en más volumen.', 'El mismo soluto en menos volumen.', 'Sale soluto y sale solvente.', 'Más soluto en casi el mismo volumen.'], trampas: { '2:baja': 'Queda menos jugo, pero igual de dulce.' }, ok: 'Soluto y solvente.' },
      'Con agua baja, al evaporar o agregar soluto sube y al sacar un poco no cambia.', 'Pregunta qué pasó con el soluto y qué con el solvente.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: SUERO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Al evaporar agua, la concentración sube.',
      ...T(['Lo que tiene más soluto siempre está más concentrado.', 2, 'Busca la piscina.'], ['Al diluir se pierde soluto.', [4, 5], 'Busca qué no cambia.'], ['Una cucharada de suero está menos salada que la jarra.', [8, 9], 'Busca la comparación con la jarra.']), bien: 'La piscina, no cambia y tan salada.' },
      'La piscina tiene más sal y está menos salada, el soluto no cambia y la cucharada está igual.', 'Saca la palabra clave: más soluto, diluir, cucharada.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SUERO, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El suero lleva media cucharadita de sal por litro.', 0, 'Léela junto a la receta.'], ['Para dos litros hacen falta doce cucharaditas de azúcar.', 1, 'Usa la receta con el doble de agua.'], ['Un agua con 3 partes por millón de cloro tiene demasiado.', 1, 'Compara con el intervalo.'], ['La abuela vive en un pueblo con río.', 2, '¿Se dice dónde vive?']),
      luz: [[3, 'media de sal'], [3, 'seis cucharaditas rasas'], [6, 'entre 0.3 y 2 partes por millón']], bien: 'Proporción y comparación.' },
      'La sal está escrita; las doce y las 3 partes se deducen; el pueblo no aparece.', 'Usa la receta y el intervalo con otros números.'),
    x('balanza-tesis', 'Hipótesis: «la planta murió por un abono muy concentrado». ¿Qué hace cada dato?', { doc: SUERO, tesis: 'Murió por un abono muy concentrado',
      ...F(['Las plantas con el abono diluido siguen sanas.', 0, '¿Qué pasa al bajar la concentración?'], ['Las plantas sin abono también murieron.', 1, '¿Hizo falta el abono?'], ['La maceta es redonda.', 2, '¿Cambia la concentración?']), bien: 'Comparar con y sin.' },
      'Las diluidas la apoyan; las que no tenían abono la debilitan; la maceta no pesa.', 'Compara lo que pasa al quitar o bajar la causa.'),
    sol('Se mezclan 1 L de jugo con 40 g de azúcar y 3 L de agua. ¿Cómo queda?', ['El azúcar sigue siendo [[40]] g', 'El volumen es [[4]] L', 'La concentración es [[10]] g/L'], ['3', '13.3', '160'], '$40 \\div 4 = 10$ g/L.', 'El azúcar no cambia: cambia el volumen.'),
    err('Alguien prepara una disolución de sal al 10 % en masa.', ['Pesa 10 g de sal', 'Pesa 100 g de agua', 'Mezcla hasta que se disuelva'], 1, ['Pesa 90 g de agua, para 100 g de disolución', 'Pesa 10 g de agua', 'Pesa 1 000 g de agua'], 'Con 100 g de agua serían 110 g de disolución: 9.1 %.', '¿El porcentaje es del agua o de toda la disolución?'),
    opc('De una jarra con suero se sirve la mitad en un vaso. La concentración del suero del vaso:', ['Es la misma que la de la jarra', 'Es la mitad', 'Es el doble', 'No se puede comparar'], 0, 'Sale soluto y solvente en la misma proporción.', 'Piensa si el vaso queda más o menos salado.'),
  ]);

  const BUZO = {
    id: 'icf-buzo', title: 'El aire del buzo',
    paras: [
      'En la superficie, el aire nos aprieta con una atmósfera de presión. Bajo el agua, cada diez metros agregan otra: a diez metros hay dos; a veinte, tres.',
      'Un globo lleno de aire que baja se encoge. Si se llena a diez metros y se suelta, crece al subir y puede reventar. Por eso un buzo nunca debe contener la respiración mientras asciende.',
      'Con más presión, más gas se disuelve en la sangre. A gran profundidad, el nitrógeno del aire se disuelve en el cuerpo del buzo.',
      'Si sube muy rápido, la presión baja de golpe y ese nitrógeno deja de estar disuelto: forma burbujas, como al destapar una gaseosa. Es muy peligroso.',
      'La solución es subir despacio y hacer paradas, para que el gas salga poco a poco por los pulmones. Las tablas dicen cuánto esperar según la profundidad y el tiempo.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BUZO, ...p }, e, { hint: h });
  return mundo('icf-cn-gases', 'Gases y Disoluciones', 'ciencias', [l1, l2], [
    ['icf-cn-gases-1', 'A más presión, menos volumen.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuánta presión hay a veinte metros?', [1]], ['¿Por qué no contener la respiración?', [2]], ['¿Para qué se hacen paradas?', [5]]] }, 'La presión está en el 1, la respiración en el 2 y las paradas en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-gases-1', 'Cada diez metros, una atmósfera más.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['A diez metros hay dos atmósferas.', 0], ['A treinta metros hay cuatro atmósferas.', 1], ['El aire de los pulmones crece al subir.', 1], ['El mar estaba a 20 °C.', 2]] }, 'Las dos atmósferas están escritas; las cuatro y los pulmones se deducen; la temperatura no aparece.', 'Usa la regla de los diez metros y el ejemplo del globo.')],
    ['icf-cn-gases-1', 'Presión por volumen no cambia.', opc('Un globo tiene 6 L en la superficie. A 20 metros, con la misma temperatura, ocupa:', ['18 L', '6 L', '2 L', '3 L'], 2, 'A 20 m hay 3 atmósferas: $6 \\div 3 = 2$ L.', 'Halla cuántas atmósferas hay a esa profundidad.')],
    ['icf-cn-gases-2', 'Con más presión se disuelve más gas.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Al bajar la presión, el gas disuelto se escapa.', cards: [['La gaseosa que burbujea al destaparla', true], ['La champaña que suelta gas al abrirla', true], ['El agua que se congela', false], ['La sal que queda al evaporar', false]] }, 'Gaseosa y champaña sueltan gas al bajar la presión; las otras no.', 'Busca casos en que se abre algo que estaba a presión.')],
    ['icf-cn-gases-2', 'El gas disuelto sale poco a poco.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del buzo se dice todo esto, EXCEPTO:', cards: [['No debe contener la respiración al subir', [2]], ['Se le disuelve nitrógeno', [3]], ['Debe hacer paradas', [5]], ['Debe beber gaseosa', null]] }, 'Las tres primeras están en el 2, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-gases-2', 'Más tiempo y más hondo: más gas disuelto.', opc('Si la sangre de un buzo tiene 6 mg de nitrógeno por cada 0.3 L, su concentración es:', ['1.8 mg/L', '20 mg/L', '2 mg/L', '6.3 mg/L'], 1, 'Se dividen los miligramos entre los litros: $6 \\div 0.3 = 20$.', 'Divide el soluto entre el volumen.')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-electrico.js
// Preicfes · Ciencias Naturales · mundo 12 «Electricidad y Magnetismo» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const CASA = {
    id: 'icf-casa-luz', title: 'La casa que se quedó a oscuras',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Una corriente eléctrica es carga que se mueve por un conductor. Para que circule hace falta un camino cerrado y algo que la empuje, como una pila. Ese empuje se llama voltaje y se mide en voltios; la corriente, en amperios. Si el camino se corta en cualquier punto, como cuando se abre un interruptor, la carga deja de circular.',
      'Todo conductor se opone un poco al paso de la carga: es su resistencia, que se mide en ohmios. La ley de Ohm dice que el voltaje es la corriente por la resistencia. Con la misma pila, si la resistencia se duplica, la corriente se reduce a la mitad. Un alambre largo y delgado resiste más que uno corto y grueso del mismo metal.',
      'En serie hay un solo camino. La corriente es la misma en todos los elementos y el voltaje se reparte. Las resistencias se suman. Si un bombillo se quema, se apagan todos: así eran las luces de Navidad de antes.',
      'En paralelo cada elemento tiene su propio camino. Todos reciben el mismo voltaje y la corriente se reparte. Si uno se apaga, los demás siguen. Las casas se conectan así. Cada aparato que se enchufa abre otro camino, y la corriente total aumenta.',
      'Cuando la corriente total es demasiado grande, los cables se calientan y puede haber un incendio. Para evitarlo, un interruptor automático de la caja corta el paso. Un cortocircuito es un camino casi sin resistencia: la corriente se dispara en un instante. Por eso nunca se deben juntar los dos cables pelados de un enchufe.',
      'La potencia dice cuánta energía se gasta en cada segundo: es el voltaje por la corriente, y se mide en vatios. Un bombillo de 10 vatios encendido cien horas gasta lo mismo que una ducha de 5 000 vatios en doce minutos: un kilovatio hora. Eso es lo que se cobra en el recibo.',
    ],
  };
  const l1 = leccion('icf-cn-electrico-1', 'Circuitos', guion(
    ['Corriente', 'Carga que se mueve por un camino cerrado.'],
    ['Ohm', 'Voltaje es corriente por resistencia.'],
    ['Serie y paralelo', 'Un solo camino, o uno para cada elemento.'],
    ['Potencia', 'Voltaje por corriente: energía en cada segundo.']), [
    x('corriente-resistor', 'La pila es de **12 V** y la resistencia, de **8 Ω**. Mueve la **corriente**.', { V: 12, R: 8, max: 4, paso: 0.25 },
      'El voltaje entre la resistencia: $12 \\div 8 = 1.5$ A.', 'La corriente por la resistencia debe dar el voltaje.'),
    x('serie-resistencia', 'Con una pila de **24 V** pasan **2 A** por dos resistencias **en serie**. Una es de **5 Ω**. Mueve la otra.', { V: 24, I: 2, R1: 5, max: 15 },
      'En total hay $24 \\div 2 = 12$ Ω; la otra es $12 - 5 = 7$ Ω.', 'Halla primero la resistencia de todo el camino.'),
    x('paralelo-ramas', 'Una pila de **12 V** alimenta **en paralelo** una resistencia de **6 Ω** y otra de **4 Ω**. Completa.', { et: ['voltaje en la de 4 Ω', 'corriente en la de 6 Ω', 'corriente en la de 4 Ω', 'corriente total'], metas: ['12 V', '2 A', '3 A', '5 A'], fichas: ['12 V', '2 A', '3 A', '5 A', '6 V', '1.2 A'], mira: ['En paralelo, todas reciben lo mismo.', 'Divide el voltaje entre 6.', 'Divide el voltaje entre 4.', 'Suma las de las dos ramas.'], trampas: { '0:6 V': 'El voltaje se reparte en serie, no en paralelo.', '3:1.2 A': 'Esa sería la corriente si estuvieran en serie.' }, ok: 'Mismo voltaje; la corriente se suma.' },
      'Las dos reciben 12 V; pasan 2 A y 3 A; en total, 5 A.', 'Aplica la ley de Ohm en cada rama por separado.'),
    x('que-prende', 'Hay cinco circuitos con una pila y bombillos buenos, salvo lo que se dice. Toca **todos** en los que **algún bombillo prende**.', { casos: [{ t: 'dos en paralelo, uno quemado', si: true }, { t: 'dos en serie, uno quemado', no: 'En serie hay un solo camino y quedó cortado.' }, { t: 'uno solo, con el interruptor cerrado', si: true }, { t: 'uno solo, con el cable suelto', no: 'Sin camino cerrado no hay corriente.' }, { t: 'tres en serie, todos buenos', si: true }], falta: 'Falta otro: busca un camino cerrado que pase por un bombillo bueno.', ok: 'Hay camino cerrado.' },
      'En paralelo queda el otro camino; el cerrado y los tres en serie también tienen camino completo.', 'Sigue con el dedo el camino de la pila y mira si vuelve a ella.'),
    x('genero-o-cita', '¿Es propio de un circuito **en serie** o **en paralelo**?', { doc: CASA, rot: ['en serie', 'en paralelo'],
      ...F(['La corriente es la misma en todos', 0, '¿Hay uno o varios caminos?'], ['Todos reciben el mismo voltaje', 1, '¿Hay uno o varios caminos?'], ['Si uno falla, todos se apagan', 0, '¿Hay uno o varios caminos?'], ['Las tomas de una casa', 1, '¿Hay uno o varios caminos?']), bien: 'Un camino o varios.' },
      'Un camino: misma corriente y falla total; varios caminos: mismo voltaje, como en las casas.', 'Cuenta los caminos que puede tomar la carga.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CASA, nums: [2, 3, 4], pregunta: 'Queda en pie', queda: 'Un alambre grueso y corto resiste menos que uno largo y delgado del mismo metal.',
      ...T(['Con más resistencia y la misma pila pasa más corriente.', 2, 'Busca qué pasa si la resistencia se duplica.'], ['En serie, si un bombillo se quema los demás siguen.', 7, 'Busca las luces de Navidad.'], ['En paralelo todos usan el mismo camino.', [8, 12], 'Busca qué tiene cada elemento.']), bien: 'A la mitad, todos y el propio.' },
      'Con más resistencia la corriente baja, en serie se apagan todos y en paralelo cada uno tiene su camino.', 'Saca la palabra clave: más resistencia, quema, mismo camino.'),
    x('sube-vatios', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un cargador usa **20 V** y **3 A**. ¿Cuál es su **potencia** en vatios?', r: 60, c: '20 \\cdot 3', e: { 6: 'Se multiplica el voltaje por la corriente.' } },
      { q: 'Tres resistencias **en serie** de **10**, **14** y **20** Ω. ¿Cuál es la **total**?', r: 44, c: '10 + 14 + 20', e: { 20: 'En serie se suman todas.' } },
      { q: '¿Cuántos **voltios** hacen pasar **4 A** por **9 Ω**?', r: 36, c: '4 \\cdot 9', e: { 14: 'Se multiplican.' } }] },
      '$20 \\cdot 3 = 60$ W; $10 + 14 + 20 = 44$ Ω; y $4 \\cdot 9 = 36$ V.', 'Escribe primero qué fórmula relaciona los datos.'),
    sol('Una plancha de 1 200 W se usa 30 minutos cada día. ¿Cuánta energía gasta en 10 días?', ['Cada día funciona [[0.5]] horas', 'Cada día gasta $1\\,200 \\cdot 0.5 =$ [[600]] Wh', 'En 10 días son [[6]] kWh'], ['30', '36000', '12'], '$600 \\cdot 10 = 6\\,000$ Wh: 6 kWh.', 'Pasa los minutos a horas.'),
    err('Alguien conecta dos bombillos iguales en serie a una pila de 6 V.', ['Hay un solo camino', 'La corriente es la misma en los dos', 'Cada bombillo recibe 6 V'], 2, ['Cada bombillo recibe 3 V', 'Cada bombillo recibe 12 V', 'Uno recibe 6 V y el otro 0 V'], 'En serie el voltaje se reparte: 3 V para cada uno.', '¿Qué se reparte y qué se mantiene en serie?'),
    opc('En una casa se enchufan más aparatos a la misma red. El interruptor automático corta el paso porque:', ['El voltaje bajó a cero', 'La corriente total aumentó demasiado', 'La resistencia de cada aparato aumentó', 'Los aparatos quedaron en serie'], 1, 'Cada aparato abre otro camino y la corriente total crece.', 'Piensa qué le pasa a la corriente total con cada aparato.'),
  ]);

  const GLOBO = {
    id: 'icf-globo-iman', title: 'El globo, el imán y la brújula',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Al frotar un globo con lana, pasan electrones de la lana al globo. El globo queda con carga negativa y la lana, con positiva. No se creó carga: solo se movió de un lado a otro.',
      'Las cargas del mismo signo se repelen y las de signo contrario se atraen. La fuerza crece si las cargas son mayores y disminuye mucho con la distancia: al doble de distancia, la fuerza es cuatro veces menor. Es la ley de Coulomb.',
      'El globo cargado también atrae pedacitos de papel que no tienen carga. Las cargas del papel se acomodan: las positivas quedan un poco más cerca del globo y las negativas, más lejos. Como la atracción actúa desde más cerca, gana. Por la misma razón, un globo frotado se queda pegado a la pared durante un buen rato.',
      'Un imán tiene dos polos, norte y sur. Los polos iguales se repelen y los distintos se atraen. Si se parte, cada pedazo vuelve a tener los dos: hasta ahora nadie ha podido separar un polo solo. Un imán atrae hierro, níquel y cobalto, pero no cobre, aluminio ni plástico.',
      'La Tierra se comporta como un imán enorme, y la brújula es una aguja imantada que se alinea con ella. Una corriente también produce magnetismo: en 1820, Oersted vio que una aguja se movía cerca de un cable. Un alambre enrollado en un clavo de hierro, con corriente, es un electroimán: se puede prender y apagar.',
      'Lo contrario también ocurre: al mover un imán cerca de una bobina aparece corriente en ella. Se llama inducción, y con ella funcionan los generadores de las hidroeléctricas: el agua mueve imanes o bobinas y así se empujan los electrones. Electricidad y magnetismo resultaron ser dos caras de lo mismo. Si el imán se queda quieto, en cambio, no aparece ninguna corriente: hace falta que algo cambie.',
    ],
  };
  const l2 = leccion('icf-cn-electrico-2', 'Cargas e imanes', guion(
    ['Cargas', 'Iguales se repelen y distintas se atraen; no se crean.'],
    ['Coulomb', 'Al doble de distancia, la cuarta parte de la fuerza.'],
    ['Imanes', 'Siempre tienen dos polos.'],
    ['Electroimán e inducción', 'La corriente produce magnetismo y el imán que se mueve, corriente.']), [
    x('atrae-repele', '¿Se **atraen**, se **repelen** o **nada**?', { et: ['dos globos frotados con lana', 'polo norte y polo sur', 'imán y moneda de aluminio', 'globo cargado y papelitos'], metas: ['se repelen', 'se atraen', 'nada', 'se atraen'], fichas: ['se repelen', 'se atraen', 'nada', 'se atraen', 'se repelen', 'nada'], mira: ['Los dos quedaron con la misma carga.', 'Son polos distintos.', 'Mira qué metales atrae un imán.', 'Las cargas del papel se acomodan.'], trampas: { '2:se atraen': 'El imán no atrae aluminio.', '3:nada': 'Aunque no tengan carga, sus cargas se acomodan.' }, ok: 'Signos, polos, metales y acomodo.' },
      'Globos iguales se repelen, polos distintos se atraen, el aluminio no siente nada y el papel es atraído.', 'Mira primero si tienen la misma carga o el mismo polo.'),
    x('fuerza-cambia', 'Dos cargas se atraen con una fuerza de **36**. ¿Cuánto vale en cada cambio?', { et: ['al doble de distancia', 'a la mitad de distancia', 'una carga al doble', 'al triple de distancia'], metas: ['9', '144', '72', '4'], fichas: ['9', '144', '72', '4', '18', '12', '36'], mira: ['Al doble, cuatro veces menor.', 'A la mitad, cuatro veces mayor.', 'La fuerza crece igual que la carga.', 'Al triple, nueve veces menor.'], trampas: { '0:18': 'La distancia va al cuadrado.', '1:72': 'La distancia va al cuadrado.', '3:12': 'La distancia va al cuadrado.' }, ok: 'La distancia, al cuadrado; la carga, no.' },
      '$36 \\div 4 = 9$; $36 \\cdot 4 = 144$; $36 \\cdot 2 = 72$; y $36 \\div 9 = 4$.', 'La distancia cuenta al cuadrado y al contrario.'),
    x('genero-o-cita', '¿Es **electroimán** (corriente que da magnetismo) o **inducción** (magnetismo que da corriente)?', { doc: GLOBO, rot: ['electroimán', 'inducción'],
      ...F(['La grúa que suelta la chatarra al apagarse', 0, '¿Qué produce qué?'], ['El generador de una hidroeléctrica', 1, '¿Qué produce qué?'], ['El clavo con alambre y pila', 0, '¿Qué produce qué?'], ['La linterna que se agita para cargarla', 1, '¿Qué produce qué?']), bien: 'Corriente o movimiento.' },
      'La grúa y el clavo usan corriente para atraer; el generador y la linterna producen corriente.', 'Pregunta qué se pone y qué se obtiene en cada aparato.'),
    x('pista-tipo', 'Ata cada explicación a lo que se observa.', { doc: GLOBO, lineas: ['el globo frotado queda cargado', 'la brújula apunta al norte', 'la aguja se mueve cerca de un cable', 'un imán partido sigue siendo imán'],
      ...T(['pasaron electrones', 0, '¿Dónde hubo frotación?'], ['la Tierra es como un imán', 1, '¿Dónde actúa un imán enorme?'], ['la corriente produce magnetismo', 2, '¿Dónde hay un cable?'], ['los polos no se separan', 3, '¿Dónde se parte algo?']), bien: 'Electrones, Tierra, corriente y polos.' },
      'Frotar mueve electrones, la Tierra orienta, la corriente mueve la aguja y los polos van juntos.', 'Busca en el texto la causa de cada observación.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: GLOBO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Un electroimán se puede apagar.',
      ...T(['Al frotar se crea carga nueva.', 2, 'Busca qué no se creó.'], ['Al partir un imán queda un solo polo en cada pedazo.', 5, 'Busca qué tiene cada pedazo.'], ['Solo un imán puede mover una aguja imantada.', 8, 'Busca el hallazgo de Oersted.']), bien: 'No se creó, los dos y un cable.' },
      'La carga solo se movió, cada pedazo tiene dos polos y un cable con corriente movió la aguja.', 'Saca la palabra clave: crea, partir, solo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GLOBO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Al doble de distancia, la fuerza es cuatro veces menor.', 0, 'Léela junto a la ley de Coulomb.'], ['Una lata de aluminio no se puede separar con un imán.', 1, '¿Qué no atrae un imán?'], ['Si se acercan a la mitad, la fuerza es cuatro veces mayor.', 1, 'Lee la ley al contrario.'], ['El imán del texto es de herradura.', 2, '¿Se dice su forma?']),
      luz: [[2, 'cuatro veces menor'], [4, 'no cobre, aluminio ni plástico']], bien: 'Al contrario y con otro objeto.' },
      'El doble está escrito; el aluminio y la mitad se deducen; la forma no aparece.', 'Aplica lo que dice el texto a un caso distinto.'),
    x('balanza-tesis', 'Hipótesis: «el clavo atrae por la corriente y no porque ya fuera imán». ¿Qué hace cada dato?', { doc: GLOBO, tesis: 'Atrae por la corriente',
      ...F(['Al desconectar la pila, los clips se caen.', 0, '¿Qué pasa al quitar la corriente?'], ['Sin pila, el clavo atrae los mismos clips.', 1, '¿Hizo falta la corriente?'], ['El clavo mide 8 cm.', 2, '¿Dice de dónde viene la atracción?']), bien: 'Quitar la causa la pone a prueba.' },
      'Que se caigan la apoya; que atraiga sin pila la debilita; el largo no pesa.', 'Compara lo que pasa con corriente y sin corriente.'),
    sol('Dos cargas a 2 cm se repelen con fuerza 80. ¿Con qué fuerza se repelen a 8 cm?', ['La distancia se multiplica por [[4]]', 'La fuerza se divide entre [[16]]', 'La nueva fuerza es [[5]]'], ['20', '6', '64'], '$4^2 = 16$ y $80 \\div 16 = 5$.', 'La distancia cuenta al cuadrado.'),
    err('Alguien explica por qué se pega a la pared un globo frotado.', ['Al frotarlo, el globo ganó electrones', 'En la pared, las cargas se acomodan', 'La pared se queda con todos los electrones del globo'], 2, ['La parte positiva queda más cerca y la atracción gana', 'La pared se convierte en un imán', 'El globo pierde su carga al instante'], 'La pared no necesita carga: basta que sus cargas se acomoden.', 'Compara con lo que hacen los pedacitos de papel.'),
    opc('Para hacer más fuerte un electroimán, lo más adecuado es:', ['Cambiar el clavo de hierro por uno de plástico', 'Quitar la pila', 'Dar menos vueltas de alambre', 'Dar más vueltas de alambre'], 3, 'Con más vueltas, la misma corriente produce más magnetismo.', 'Piensa qué cambio aumenta el efecto de la corriente.'),
  ]);

  const TREN = {
    id: 'icf-tren-iman', title: 'El tren que flota',
    paras: [
      'Algunos trenes no ruedan: flotan. Debajo llevan electroimanes, y en la vía hay otros. Al encenderlos con los polos adecuados, el tren queda suspendido a unos centímetros, sin tocar el riel.',
      'Como no hay roce con la vía, casi todo lo que lo frena es el aire. Algunos han pasado de 600 kilómetros por hora en pruebas.',
      'Para avanzar, los electroimanes de la vía cambian de polo muchas veces por segundo: los de adelante atraen al tren y los de atrás lo empujan. Cambiar el polo es fácil: basta invertir el sentido de la corriente.',
      'Para frenar se hace lo contrario. En ese momento los imanes del tren se mueven frente a las bobinas de la vía y producen corriente, que se devuelve a la red.',
      'El problema es el costo. La vía entera lleva bobinas, y algunos modelos usan superconductores: materiales que, muy fríos, no tienen resistencia y conducen corrientes enormes sin calentarse.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: TREN, ...p }, e, { hint: h });
  return mundo('icf-cn-electrico', 'Electricidad y Magnetismo', 'ciencias', [l1, l2], [
    ['icf-cn-electrico-1', 'Sin resistencia, la corriente no calienta.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Por qué es tan veloz?', [2]], ['¿Cómo se invierte un polo?', [3]], ['¿Qué es un superconductor?', [5]]] }, 'La velocidad está en el 2, el polo en el 3 y el superconductor en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-electrico-1', 'La resistencia calienta.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Los superconductores no tienen resistencia.', 0], ['Un cable con resistencia se calienta con mucha corriente.', 1], ['Al frenar, el tren devuelve energía.', 1], ['El tren es de color blanco.', 2]] }, 'El superconductor está escrito; el cable y la energía se deducen; el color no aparece.', 'Piensa qué pasaría si hubiera resistencia.')],
    ['icf-cn-electrico-1', 'Voltaje es corriente por resistencia.', opc('Con el mismo voltaje, si la resistencia de una bobina baja a la cuarta parte, la corriente:', ['Baja a la cuarta parte', 'No cambia', 'Se hace cuatro veces mayor', 'Se duplica'], 2, 'El producto no cambia: cuatro veces menos resistencia es cuatro veces más corriente.', 'Aplica la ley de Ohm con el voltaje fijo.')],
    ['icf-cn-electrico-2', 'Polos distintos se atraen, iguales se repelen.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Una corriente produce magnetismo que se puede prender y apagar.', cards: [['El timbre con electroimán', true], ['La grúa de chatarra', true], ['El imán de la nevera', false], ['Un globo frotado', false]] }, 'Timbre y grúa usan corriente; el de la nevera es permanente y el globo es carga quieta.', 'Busca dónde hay corriente que se enciende.')],
    ['icf-cn-electrico-2', 'Un imán que se mueve produce corriente.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del tren se dice todo esto, EXCEPTO:', cards: [['No roza la vía', [2]], ['Los de adelante lo atraen', [3]], ['Devuelve corriente al frenar', [4]], ['Lleva ruedas de caucho', null]] }, 'Las tres primeras están en el 2, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-electrico-2', 'Imán que se mueve frente a una bobina: inducción.', opc('La corriente que el tren devuelve al frenar se explica por:', ['La inducción', 'La ley de Coulomb', 'El roce con la vía', 'La carga estática'], 0, 'Imanes que se mueven frente a bobinas producen corriente: inducción.', '¿Qué se mueve frente a las bobinas?')],
  ]);
})());
;
//#archivo js/courses/preicfes-cn-cts.js
// Preicfes · Ciencias Naturales · mundo 13 «Ciencia y Sociedad» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const VACUNA = {
    id: 'icf-vacuna-pueblo', title: 'El brote de San Roque',
    ficha: { autor: 'Puesto de salud', fuente: 'Boletín escolar', fecha: 'Marzo de 2026' },
    paras: [
      'En San Roque hubo un brote de sarampión. La enfermedad la causa un virus, que se multiplica dentro de las células. Los antibióticos matan bacterias, así que no sirven contra él. Tomarlos por si acaso solo ayuda a que aparezcan bacterias resistentes.',
      'Una vacuna le muestra al cuerpo una parte del virus, o un virus debilitado, para que las defensas aprendan a reconocerlo. Quien se vacuna queda con células de memoria: si el virus llega después, la respuesta es rápida. La vacuna no cura a quien ya está enfermo; previene.',
      'En la escuela había 200 niños vacunados y 50 sin vacunar. Se enfermaron 4 de los vacunados y 20 de los otros. Alguien dijo: «¿Ven? También se enferman los vacunados». Es cierto, pero el riesgo fue muy distinto: 2 de cada 100 frente a 40 de cada 100.',
      'Cuando casi todos están protegidos, el virus no encuentra a quién pasar y se protegen también los que no pueden vacunarse, como los recién nacidos. A eso se le llama inmunidad de grupo. Para el sarampión, que se contagia muchísimo, hace falta que cerca del 95 % esté protegido.',
      'Ninguna medicina es perfecta. La vacuna puede dar fiebre o dolor en el brazo y, muy rara vez, una reacción grave. Antes de usarse se prueba en miles de voluntarios y después se sigue vigilando. Decidir es comparar el riesgo de usarla con el de no usarla: tampoco hacer nada es gratis.',
      'La tecnología también diagnostica. Los rayos X atraviesan la carne y se detienen en el hueso; la ecografía usa sonido; la resonancia, imanes. Cada una sirve para algo distinto y tiene su cuidado: los rayos X, por ejemplo, llevan energía que puede dañar el ADN, y por eso se usan solo lo necesario. Un buen diagnóstico ahorra remedios, tiempo y miedo, pero ninguna imagen reemplaza la conversación con quien atiende.',
    ],
  };
  const l1 = leccion('icf-cn-cts-1', 'Salud y tecnología', guion(
    ['Virus y bacterias', 'El antibiótico mata bacterias, no virus.'],
    ['Vacunas', 'Enseñan a las defensas: previenen, no curan.'],
    ['Riesgo', 'Se compara en proporción, no en cantidad.'],
    ['Tecnología', 'Rayos X, ecografía y resonancia sirven para cosas distintas.']), [
    x('riesgo-grupos', 'De **400** con casco se golpearon **8**; de **50** sin casco, **10**. Completa.', { et: ['riesgo con casco', 'riesgo sin casco', 'veces mayor sin casco', 'con casco, en 1 000'], metas: ['2 %', '20 %', '10', '20'], fichas: ['2 %', '20 %', '10', '20', '8 %', '80', '12'], mira: ['Divide 8 entre 400.', 'Divide 10 entre 50.', 'Compara los dos porcentajes.', 'Saca el 2 % de 1 000.'], trampas: { '0:8 %': 'Son 8 de 400, no de 100.', '2:12': 'Compara dividiendo, no restando otras cantidades.' }, ok: 'Proporción, no cantidad.' },
      '$8 \\div 400 = 2\\%$; $10 \\div 50 = 20\\%$; diez veces; y 20 de cada 1 000.', 'Divide cada caso entre el tamaño de su grupo.'),
    x('genero-o-cita', '¿Serviría un **antibiótico**?', { doc: VACUNA, rot: ['sí serviría', 'no serviría'],
      ...F(['Sarampión', 1, '¿La causa un virus o una bacteria?'], ['Una herida con estafilococos', 0, '¿Es un virus o una bacteria?'], ['Gripa', 1, '¿La causa un virus o una bacteria?'], ['Tuberculosis (bacilo de Koch)', 0, '¿Es un virus o una bacteria?']), bien: 'Solo contra bacterias.' },
      'Sarampión y gripa son virus; la herida y la tuberculosis, bacterias.', 'El antibiótico actúa contra un solo tipo de microbio.'),
    x('pista-tipo', 'Ata cada tecnología a lo que conviene mirar.', { doc: VACUNA, lineas: ['un hueso que pudo romperse', 'un bebé antes de nacer', 'prevenir el sarampión', 'una infección por bacterias'],
      ...T(['rayos X', 0, '¿Qué se detiene en el hueso?'], ['ecografía', 1, '¿Cuál usa sonido y no daña el ADN?'], ['vacuna', 2, '¿Cuál prepara las defensas?'], ['antibiótico', 3, '¿Cuál mata bacterias?']), bien: 'Cada una para lo suyo.' },
      'Rayos X para el hueso, sonido para el bebé, vacuna para prevenir y antibiótico para bacterias.', 'Busca cómo funciona cada una en el texto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: VACUNA, nums: [1, 2, 4], pregunta: 'Queda en pie', queda: 'Vacunarse protege también a otros.',
      ...T(['El antibiótico mata el virus del sarampión.', 2, 'Busca contra qué sirven.'], ['La vacuna cura a quien ya está enfermo.', 6, 'Busca qué hace y qué no.'], ['Para frenar el sarampión basta vacunar a la mitad.', 9, 'Busca el porcentaje.']), bien: 'Bacterias, previene y 95 %.' },
      'Los antibióticos matan bacterias, la vacuna previene y hace falta cerca del 95 %.', 'Saca la palabra clave: virus, cura, mitad.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: VACUNA, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Se enfermaron 20 de los no vacunados.', 0, 'Léela junto a los datos de la escuela.'], ['El riesgo sin vacuna fue veinte veces mayor.', 1, 'Compara 2 y 40 de cada cien.'], ['Con 80 % de vacunados, el sarampión podría seguir pasando.', 1, 'Compara con lo que hace falta.'], ['La escuela tenía doce salones.', 2, '¿Se dice cuántos salones?']),
      luz: [[3, '20 de los otros'], [3, '2 de cada 100 frente a 40 de cada 100'], [4, 'cerca del 95 %']], bien: 'Dividir y comparar.' },
      'Los 20 están escritos; las veinte veces y el 80 % se deducen; los salones no aparecen.', 'Compara entre sí los números que da el texto.'),
    x('balanza-tesis', 'Afirmación: «esta vacuna protege». ¿Qué hace cada dato?', { doc: VACUNA, tesis: 'Esta vacuna protege',
      ...F(['Enfermaron 3 de 1 000 vacunados y 60 de 1 000 sin vacunar.', 0, '¿En qué grupo hubo más riesgo?'], ['Enfermaron 50 de 1 000 en cada grupo.', 1, '¿Hubo diferencia?'], ['El frasco es de vidrio.', 2, '¿Habla de protección?']), bien: 'Comparar grupos iguales.' },
      'La diferencia la apoya; el empate la debilita; el frasco no pesa.', 'Compara el riesgo que hubo en los dos grupos.'),
    sol('De 250 personas con un remedio mejoraron 200; de 250 con un placebo, 120. ¿Cuánto más mejoró el grupo del remedio?', ['Con remedio mejoró el [[80]] %', 'Con placebo, el [[48]] %', 'La diferencia son [[32]] puntos'], ['200', '120', '128'], '$200 \\div 250 = 80\\%$ y $120 \\div 250 = 48\\%$.', 'Divide cada cantidad entre 250.'),
    err('«Se enfermaron 30 vacunados y 20 no vacunados: la vacuna empeora». Había 3 000 vacunados y 100 sin vacunar.', ['Con vacuna: 30 de 3 000, el 1 %', 'Sin vacuna: 20 de 100, el 20 %', 'Como 30 es más que 20, la vacuna empeora'], 2, ['Como 1 % es menos que 20 %, la vacuna protege', 'Como hay más vacunados, no se puede comparar', 'Como 20 es menos que 30, conviene no vacunarse'], 'Los grupos son de distinto tamaño: se comparan los porcentajes.', '¿Se comparan cantidades o proporciones?'),
    opc('A una mujer embarazada le duele el tobillo y el médico prefiere evitar los rayos X. La razón es que:', ['No muestran los huesos', 'Son un sonido muy fuerte', 'Llevan energía que puede dañar el ADN', 'Producen campos magnéticos'], 2, 'Los rayos X pueden dañar el ADN; por eso se usan lo necesario.', 'Relaciona la técnica con su cuidado.'),
  ]);

  const RECURSO = {
    id: 'icf-energia-isla', title: 'La isla que apagó su planta',
    ficha: { autor: 'Grupo de energía', fuente: 'Boletín escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una isla producía su electricidad con una planta de diésel. Cada litro quemado soltaba unos 2.7 kilogramos de dióxido de carbono, además de hollín. El combustible llegaba en barco y, si había mal tiempo, la isla se quedaba a oscuras. Los ancianos contaban que, en las noches de tormenta, el puesto de salud guardaba las vacunas en neveras con hielo.',
      'Los habitantes estudiaron otras fuentes. El sol alcanza, pero de noche no hay; el viento sopla más en la tarde y algunos días falta. Las dos son renovables y no sueltan gases mientras funcionan, aunque fabricar los paneles y las baterías sí tiene un costo ambiental: hay que sacar minerales y, al final, reciclarlos.',
      'Decidieron instalar paneles y turbinas, guardar energía en baterías y dejar el diésel para emergencias. Al primer año, el consumo de combustible bajó de 900 a 300 mil litros. En el segundo, a 180 mil. La factura bajó, pero la inversión tardará nueve años en pagarse.',
      'El dióxido de carbono y el metano dejan pasar la luz del sol y retienen parte del calor que sale de la Tierra. Es el efecto invernadero, y sin él el planeta sería helado. El problema es que hoy hay más gases de los que había y el calor retenido aumenta.',
      'También revisaron la basura. La mitad era materia orgánica, que hicieron compost. El plástico se redujo con envases que se devuelven: reducir y reutilizar ahorra más que reciclar, porque reciclar también gasta energía. Las pilas se guardan aparte: tienen metales que contaminan el agua y el suelo.',
      'Un grupo se opuso a las turbinas: temía por las aves. En vez de discutir a ciegas, contaron aves durante un año y cambiaron de lugar dos turbinas. Murieron muchas menos. La solución no fue parar ni seguir igual, fue medir y corregir. Hoy publican cada mes el conteo en la puerta de la escuela.',
    ],
  };
  const l2 = leccion('icf-cn-cts-2', 'Recursos y ambiente', guion(
    ['Fuentes de energía', 'Renovables o no; todas tienen costos.'],
    ['Efecto invernadero', 'Es necesario; el problema es que aumenta.'],
    ['Residuos', 'Reducir y reutilizar antes que reciclar.'],
    ['Medir y corregir', 'Las decisiones mejoran con datos.']), [
    x('compensa-justo', 'Una familia suelta **1 200 kg** de CO₂ al año con su moto. Cada árbol adulto absorbe **20 kg** al año. Mueve cuántos árboles la **compensan**.', { gasta: 1200, cada: 20, max: 100, et: 'árboles', u: 'kg' },
      'Lo que suelta entre lo que absorbe cada uno: $1\\,200 \\div 20 = 60$.', 'Divide lo que se suelta entre lo que absorbe cada uno.'),
    x('genero-o-cita', '¿La fuente es **renovable** o **no renovable**?', { doc: RECURSO, rot: ['renovable', 'no renovable'],
      ...F(['Viento', 0, '¿Se repone pronto?'], ['Diésel', 1, '¿Se repone pronto?'], ['Sol', 0, '¿Se repone pronto?'], ['Carbón', 1, '¿Se repone pronto?'], ['Corriente de un río', 0, '¿Se repone pronto?']), bien: 'Cada día o en millones de años.' },
      'Viento, sol y ríos se reponen; diésel y carbón tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('lee-escala', 'La gráfica muestra el diésel (en miles de litros) antes, al primer año y al segundo. Pon cada valor y cuánto **bajó** en total.', { vals: [900, 300, 180], rot: ['antes', 'año 1', 'año 2'], hi: 960, st: 120, et: ['antes', 'año 1', 'año 2', 'bajó'], ops: ['', '', ''], metas: ['900', '300', '180', '720'], fichas: ['900', '300', '180', '720', '880', '250', '1080'],
      mira: ['Está a mitad de camino entre 840 y 960.', 'Está a mitad de camino entre 240 y 360.', 'Está a mitad de camino entre 120 y 240.', 'Resta el último al primero.'], trampas: { '1:250': 'Cada línea vale 120: la mitad son 60.', '3:1080': 'Eso es la suma.' }, ok: 'De 900 a 180.' },
      'Las líneas van de 120 en 120: 900, 300 y 180. Bajó 720 mil litros.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pinta-tipos', 'Pinta cada dato con lo que muestra de la decisión.', { doc: RECURSO, plumas: ['ventaja', 'costo', 'corrección'],
      ...P(['El diésel bajó a 180 mil litros.', 0, '¿Mejora, cuesta o ajusta?'], ['La inversión tardará nueve años en pagarse.', 1, '¿Mejora, cuesta o ajusta?'], ['Cambiaron de lugar dos turbinas.', 2, '¿Mejora, cuesta o ajusta?'], ['Fabricar baterías exige sacar minerales.', 1, '¿Mejora, cuesta o ajusta?']), bien: 'Mejora, cuesta y ajusta.' },
      'Menos diésel es ventaja; pagar y sacar minerales, costos; mover turbinas, corrección.', 'Pregunta qué se gana, qué se paga y qué se arregló.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: RECURSO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Medir ayudó a cuidar las aves.',
      ...T(['Los paneles no tienen ningún costo ambiental.', 2, 'Busca qué pasa al fabricarlos.'], ['Sin efecto invernadero estaríamos mejor.', 4, 'Busca cómo sería el planeta.'], ['Reciclar es siempre lo primero que hay que hacer.', 8, 'Busca qué ahorra más.']), bien: 'Fabricar, helado y reducir.' },
      'Fabricar paneles cuesta, sin efecto invernadero sería helado y reducir ahorra más que reciclar.', 'Saca la palabra clave: ningún, sin, primero.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECURSO, filas: [{ antes: 'El diésel quedó para', topes: ['uso diario', 'vender', 'emergencias'], va: 2 }, { antes: 'Las pilas se guardan aparte porque', topes: ['pesan mucho', 'tienen metales que contaminan', 'son caras'], va: 1 }, { antes: 'De la basura, la materia orgánica era', topes: ['la mitad', 'la décima parte', 'toda'], va: 0 }], mira: ['Relee qué decidieron.', 'Relee el final del párrafo 5.', 'Relee el comienzo del párrafo 5.'], luz: [[3, 'para emergencias'], [5, 'metales que contaminan'], [5, 'La mitad era materia orgánica']], bien: 'Emergencias, metales y la mitad.' },
      'El diésel quedó para emergencias, las pilas tienen metales y la mitad era orgánica.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Propuesta: «cambiar todos los buses por eléctricos». ¿Qué hace cada dato?', { doc: RECURSO, tesis: 'Cambiar todos los buses por eléctricos',
      ...F(['La ciudad respiraría 40 % menos hollín.', 0, '¿Es una razón a favor?'], ['Su electricidad viene casi toda de quemar carbón.', 1, '¿Cuánto bajarían de verdad los gases?'], ['Los buses son azules.', 2, '¿Cambia la decisión?']), bien: 'Mirar también de dónde sale la energía.' },
      'Menos hollín la apoya; el carbón la debilita; el color no pesa.', 'Pregunta qué se gana y de dónde sale la energía.'),
    sol('La isla bajó de 900 a 300 mil litros de diésel y cada litro suelta 2.7 kg de CO₂.', ['Dejó de quemar [[600]] mil litros', 'Evitó $600 \\cdot 2.7 =$ [[1620]] mil kg', 'Son [[1620 toneladas]]'], ['300', '810', '16.2 toneladas'], '1 620 mil kilogramos son 1 620 toneladas.', 'Multiplica los litros que dejó de quemar.'),
    err('Alguien explica el calentamiento global.', ['El CO₂ deja pasar la luz del sol', 'Retiene parte del calor que sale de la Tierra', 'Por eso el efecto invernadero es un invento dañino que no debería existir'], 2, ['Por eso, si los gases aumentan, aumenta el calor retenido', 'Por eso, si los gases aumentan, la Tierra se enfría', 'Por eso, sin gases la Tierra estaría más caliente'], 'El efecto invernadero es natural y necesario; el problema es su aumento.', '¿Cómo sería el planeta sin él?'),
    opc('Una familia quiere reducir al máximo su basura plástica. Lo más efectivo es:', ['Comprar más plástico reciclable', 'Usar envases que se devuelven y comprar a granel', 'Quemar el plástico', 'Mezclarlo con lo orgánico'], 1, 'Reducir y reutilizar ahorra más que reciclar.', 'Piensa qué evita que el residuo aparezca.'),
  ]);

  const EVID = {
    id: 'icf-pulsera', title: 'La pulsera milagrosa',
    ficha: { autor: 'Club de ciencias', fuente: 'Boletín escolar', fecha: 'Mayo de 2026' },
    paras: [
      'Una página vendía una pulsera de cobre «con energía» que quitaba el dolor de rodilla. Mostraba a un deportista famoso, treinta testimonios y una frase: «probado científicamente». No decía dónde ni cómo. El club decidió revisar la afirmación. No querían burlarse de nadie: querían saber si era cierto.',
      'Un testimonio cuenta lo que le pasó a una persona. Puede ser sincero y no probar nada: el dolor sube y baja solo, y quien espera mejorar suele sentirse mejor. Eso último se llama efecto placebo. Además, la página mostraba a los que mejoraron, no a los que siguieron igual.',
      'Para saberlo hicieron un experimento con 60 voluntarios. A 30, escogidos al azar, les dieron la pulsera; a los otros 30, una idéntica de plástico pintado. Ni ellos ni quien les preguntaba por el dolor sabían cuál tenían: eso es doble ciego. Después de un mes mejoraron 17 con la de cobre y 16 con la de plástico.',
      'La diferencia es tan pequeña que puede deberse al azar. Los dos grupos mejoraron, pero por igual. El club no dijo «está demostrado que no sirve jamás»; dijo que, con ese experimento, no hay evidencia de que la pulsera funcione mejor que una falsa.',
      'En ciencia, un solo estudio casi nunca cierra un tema. Se repite, lo revisan otros expertos, se juntan muchos estudios. También importa quién paga: si lo paga quien vende el producto, hay que mirar con más cuidado. No significa que sea falso, significa que hay que pedir los datos.',
      'Decidir con evidencia no es dejar de lado los valores. La ciencia puede decir cuánto contamina una mina o cuánto protege un casco; si se permite la mina o se exige el casco lo decide la sociedad, mirando también quién gana, quién pierde y qué le importa. Pero decidir contra los datos, o sin ellos, sale caro.',
    ],
  };
  const l3 = leccion('icf-cn-cts-3', 'Decisiones con evidencia', guion(
    ['Testimonio no es prueba', 'El dolor varía solo y existe el placebo.'],
    ['Buen experimento', 'Grupos al azar, control y doble ciego.'],
    ['Más de un estudio', 'Se repite y lo revisan otros.'],
    ['Datos y valores', 'La ciencia informa; la sociedad decide.']), [
    x('solida-o-no', '¿La evidencia es **más sólida** o **más débil**?', { et: ['treinta testimonios', 'experimento con control', 'veinte estudios juntos', '«lo dijo un famoso»'], metas: ['más débil', 'más sólida', 'más sólida', 'más débil'], fichas: ['más débil', 'más sólida', 'más sólida', 'más débil', 'más débil', 'más sólida'], mira: ['¿Con qué se comparan?', '¿Se compara con otro grupo?', '¿Coinciden muchos estudios?', '¿La fama es una prueba?'], ok: 'Comparar y repetir.' },
      'Comparar con un control y juntar estudios es sólido; testimonios y fama, no.', 'Pregunta si hubo comparación y si se repitió.'),
    x('buena-evidencia', 'Se quiere probar si un té ayuda a dormir. Toca **todo** lo que hace **mejor** el experimento.', { casos: [{ t: 'repartir los grupos al azar', si: true }, { t: 'que cada quien escoja su grupo', no: 'Así los grupos quedan distintos desde el comienzo.' }, { t: 'dar al otro grupo un té parecido, falso', si: true }, { t: 'contar solo a los que mejoraron', no: 'Así se esconde a quienes siguieron igual.' }, { t: 'que nadie sepa quién toma cuál', si: true }], falta: 'Falta otra que evita que los grupos se distingan.', ok: 'Azar, control y doble ciego.' },
      'Azar, control y doble ciego dejan que solo cambie el té.', 'Busca lo que hace que los grupos sean iguales en lo demás.'),
    x('pasos-del-proceso', 'Ordena cómo el club revisó la afirmación. El primer paso está en su puesto.', { doc: EVID, que: 'la revisión', de: 'La pulsera milagrosa', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Leen la afirmación de la página.', 'Reparten a los voluntarios al azar.', 'Dan pulseras iguales, una falsa.', 'Cuentan cuántos mejoran.', 'Comparan los dos grupos.'], mira: ['', 'Va antes de dar las pulseras.', 'Va después de repartir.', 'Va después del mes.', 'Es lo último: con los dos conteos.'], bien: 'Leer, repartir, dar, contar y comparar.' },
      'Leen, reparten al azar, dan las pulseras, cuentan y comparan.', 'Pregunta qué necesitaban tener antes de cada paso.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVID, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Quien espera mejorar suele sentirse mejor.',
      ...T(['Un testimonio sincero es una prueba.', 1, 'Busca la palabra sincero.'], ['El club demostró que la pulsera no sirve jamás.', 6, 'Busca qué no dijo el club.'], ['Un solo estudio basta para cerrar un tema.', 7, 'Busca cuánto vale un solo estudio.']), bien: 'No prueba, no dijo y casi nunca.' },
      'Un testimonio puede ser sincero y no probar, el club no dijo «jamás» y un estudio casi nunca cierra un tema.', 'Saca la palabra clave: sincero, jamás, solo.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica el **doble ciego**.', { doc: EVID, nums: [3], apuesta: 'Nadie sabía cuál pulsera era cuál.', ...S(['3.2'], { '3.0': 'Dice cuántas personas participaron.', '3.1': 'Dice cómo se repartieron las pulseras.', '3.3': 'Da el resultado.' }), bien: 'Ni ellos ni quien preguntaba.' },
      'La tercera oración: ni ellos ni quien les preguntaba sabían cuál tenían.', 'Busca la oración que dice quién no sabía.'),
    x('genero-o-cita', '¿Es una pregunta para **la ciencia** (datos) o para **la sociedad** (valores)?', { doc: EVID, rot: ['la ciencia', 'la sociedad'],
      ...F(['¿Cuánto mercurio hay en el río?', 0, '¿Se responde midiendo?'], ['¿Debe permitirse la mina?', 1, '¿Se responde solo midiendo?'], ['¿Cuánto baja el casco las lesiones?', 0, '¿Se responde midiendo?'], ['¿Es justo cobrar por entrar al parque?', 1, '¿Se responde solo midiendo?']), bien: 'Medir o decidir.' },
      'El mercurio y las lesiones se miden; permitir y cobrar también dependen de valores.', 'Pregunta si bastaría con medir para responder.'),
    x('sube-evidencia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Mejoraron **33** de **50** voluntarios. ¿Qué **porcentaje** es?', r: 66, c: '33 \\div 50 \\cdot 100', e: { 34: 'Ese es el que no mejoró.' } },
      { q: 'En **5** estudios de **80** personas cada uno, mejoró el **25 %**. ¿Cuántas personas **mejoraron**?', r: 100, c: '400 \\cdot 0.25', e: { 20: 'Esas son las de un solo estudio.' } },
      { q: 'Con remedio mejoró el **70 %** y con placebo, el **42 %**. ¿Cuántos **puntos** de diferencia?', r: 28, c: '70 - 42', e: { 70: 'También mejoró el grupo del placebo.' } }] },
      '$33 \\div 50 = 66\\%$; el 25 % de 400 son 100; y $70 - 42 = 28$.', 'El efecto del remedio es lo que supera al placebo.'),
    sol('Con la pulsera de cobre mejoraron 17 de 30 y con la falsa, 16 de 30. ¿Qué se concluye?', ['La diferencia es de [[1]] persona', 'En porcentaje son unos [[3]] puntos', 'La diferencia puede deberse [[al azar]]'], ['17', '33', 'a la pulsera'], '$1 \\div 30$ es cerca del 3 %: muy poco para 60 personas.', 'Resta y compara con los 30 de cada grupo.'),
    err('Un anuncio dice que una crema «funciona» porque 8 de cada 10 clientas que la siguen comprando la recomiendan.', ['8 de cada 10 la recomiendan', 'Se preguntó solo a quienes siguieron comprándola', 'Entonces funciona para cualquier persona'], 2, ['Entonces no se sabe: faltan quienes la dejaron y un grupo de control', 'Entonces funciona para 2 de cada 10', 'Entonces no funciona para nadie'], 'Solo se oyó a quienes siguieron: la muestra está sesgada y no hay control.', '¿A quién no se le preguntó?'),
    opc('Un estudio pagado por una fábrica de gaseosas concluye que el azúcar no afecta el peso. Lo más razonable es:', ['Aceptarlo, porque es un estudio', 'Decir que es falso, porque lo pagó la fábrica', 'Creerle solo si lo dice un famoso', 'Revisar los datos y compararlo con otros estudios'], 3, 'El interés no prueba que sea falso, pero obliga a pedir los datos y comparar.', 'Evita aceptar o rechazar sin mirar.'),
  ]);

  const AGUA = {
    id: 'icf-filtro', title: 'El filtro de barro',
    paras: [
      'En la vereda El Cedro muchos niños tenían diarrea. Un análisis encontró bacterias en el agua del pozo. Un grupo propuso filtros de barro con una capa de plata, que detienen y matan bacterias.',
      'Antes de comprarlos para todos hicieron una prueba. De 100 casas, 50 escogidas al azar recibieron el filtro. A los tres meses hubo diarrea en 6 de esas casas y en 21 de las otras.',
      'También midieron el agua: antes tenía 80 colonias de bacterias por cada 100 mililitros; filtrada, 2. El filtro no quita sales ni metales, así que no sirve para un agua contaminada por una mina.',
      'Cada filtro cuesta 60 mil pesos y dura tres años si se lava cada mes. Hervir el agua también mata las bacterias, pero gasta leña, y la leña se saca del bosque que protege el pozo.',
      'La vereda decidió comprar filtros para todos y cercar el pozo, porque por ahí entraban los animales. «El filtro limpia el agua», dijo la promotora, «la cerca evita que se ensucie».',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: AGUA, ...p }, e, { hint: h });
  return mundo('icf-cn-cts', 'Ciencia y Sociedad', 'ciencias', [l1, l2, l3], [
    ['icf-cn-cts-1', 'Las bacterias del agua enferman.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuántas casas enfermaron?', [2]], ['¿Qué no quita el filtro?', [3]], ['¿Para qué la cerca?', [5]]] }, 'Las casas están en el 2, lo que no quita en el 3 y la cerca en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-cts-1', 'El riesgo se compara en proporción.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Hubo diarrea en 21 de las casas sin filtro.', 0], ['El riesgo con filtro fue del 12 %.', 1], ['Si el agua tuviera mercurio, el filtro no bastaría.', 1], ['El pozo tiene diez metros.', 2]] }, 'Las 21 están escritas; el 12 % y el mercurio se deducen; la hondura no aparece.', 'Divide y usa lo que el filtro no quita.')],
    ['icf-cn-cts-1', 'Comparar dos grupos.', opc('Hubo diarrea en 6 de 50 casas con filtro y en 21 de 50 sin filtro. El riesgo con filtro, frente al de sin filtro, fue:', ['3.5 veces menor', '15 veces menor', 'Igual', '3.5 veces mayor'], 0, '$21 \\div 6 = 3.5$, y los grupos son iguales.', 'Compara 6 de 50 con 21 de 50.')],
    ['icf-cn-cts-2', 'Evitar la contaminación es mejor que limpiarla.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Es mejor evitar un daño que arreglarlo después.', cards: [['Cercar el nacimiento de un río', true], ['Usar menos bolsas en vez de recogerlas del mar', true], ['Limpiar el derrame cuando ya ocurrió', false], ['Medir el largo de un puente', false]] }, 'Cercar y usar menos evitan; limpiar llega después y medir no tiene que ver.', 'Busca lo que actúa antes de que aparezca el daño.')],
    ['icf-cn-cts-2', 'Toda solución tiene costos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del filtro se dice todo esto, EXCEPTO:', cards: [['Lleva una capa de plata', [1]], ['No quita sales', [3]], ['Dura tres años si se lava', [4]], ['Funciona con electricidad', null]] }, 'Las tres primeras están en el 1, el 3 y el 4; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-cts-2', 'Lo que pasa en un lugar afecta a otro.', opc('En una vereda, la leña se corta en el bosque que rodea el pozo. Hervir el agua con leña puede ser un problema a largo plazo porque:', ['No mata las bacterias', 'Agrega metales al agua', 'Acaba el bosque que protege el pozo', 'Enfría el agua'], 2, 'La leña se saca del bosque que protege el pozo.', 'Sigue de dónde sale la leña.')],
    ['icf-cn-cts-3', 'Grupos al azar y control.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 5], options: ['Probaron el filtro en la mitad de las casas, al azar.', 'Decidieron limpiar y también prevenir.', 'Dieron el filtro a quien lo pidió primero.', 'Decidieron no hacer nada.'], key: [0, 1] }, 'El 2 cuenta la prueba; el 5, la decisión; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-cts-3', 'Del problema a la decisión.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['plantea el problema y una salida', 'describe la prueba', 'muestra alcances y límites', 'compara costos', 'cuenta la decisión', 'enseña a nadar'], key: [0, 1, 2, 3, 4] }, 'Problema, prueba, límites, costos y decisión; nadar no aparece.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-cts-3', 'Al azar, para que los grupos sean iguales.', opc('Escoger al azar las casas que recibieron el filtro sirvió para:', ['Gastar menos', 'Que todos quedaran contentos', 'Usar menos plata', 'Que los dos grupos se parecieran en lo demás'], 3, 'Al azar, lo único distinto entre los grupos es el filtro.', 'Piensa qué pasaría si cada quien escogiera.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-avisos.js
// Preicfes · Inglés · mundo 1 «Avisos y Vocabulario» (spec 2026-11-20-curso-preicfes): las primeras partes de la prueba de inglés:
// qué dice un aviso, dónde se vería y qué palabra corresponde a una descripción. Las instrucciones van en español, como en el
// examen; los textos, en inglés. Cada lección trabaja un texto original en 7 juegos LEC y un juego en movimiento; la evaluación,
// otros avisos con preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg } = ICF;

  const AVISOS = {
    id: 'icf-avisos', title: 'Notices around town',
    paras: [
      'SCHOOL LIBRARY. Please return books by Friday. Students who return books late cannot borrow new ones for two weeks. If you need more time, ask the librarian before the date on your card.',
      'CITY PARK. No cycling on the grass. Bicycles must stay on the path, and dogs must be on a lead at all times. The park closes at 7 p.m. from November to February.',
      'DANGER: WET FLOOR. The cleaning team is working in this area. Please use the stairs on the left until the floor is dry. Thank you for your patience.',
      'SCIENCE MUSEUM. Free entry for students on Wednesdays. Show your student card at the ticket office. Groups of more than ten people must book their visit one week before.',
      'BUS STATION. The 8:15 bus to the airport is cancelled today because of the storm. Passengers can take the 9:00 bus with the same ticket. We are sorry for any problems this may cause.',
      'LOST AND FOUND. Did you lose a blue jacket in the gym on Monday? Come to the main office before 3 p.m. and describe it to collect it. Things that nobody collects go to charity after one month.',
    ],
  };

  const MERCADO = {
    id: 'icf-mercado', title: 'Saturday at the market',
    ficha: { autor: 'Students of an English class', fuente: 'School magazine', fecha: 'June 2026' },
    paras: [
      'Every Saturday morning, the main square of San Rafael changes. At six o\'clock, farmers from the mountains arrive in old trucks full of potatoes, oranges, cheese and fresh flowers. By seven, the square is full of tables, voices and the smell of coffee.',
      'Doña Rosa has sold vegetables here for thirty years. She grows everything on her small farm, two hours away, without chemicals. "People come back because they know where their food comes from," she says. Her daughter Camila helps her now, and she uses a phone to take payments, so customers do not need cash.',
      'Next to them, a young baker called Julián sells bread made with corn and cheese. He started with one basket two years ago. Now he bakes three hundred pieces every Friday night, and he usually sells everything before ten o\'clock.',
      'The market is not only a place to shop. Children run between the tables, old friends meet for breakfast, and on the first Saturday of the month a band plays music in the square. For many families, it is the most important day of the week.',
      'However, life is not easy for the farmers. Transport is expensive, and when it rains the roads become dangerous. Some young people prefer to move to the city. "If nobody buys from us, the farms will disappear," Doña Rosa explains. That is why the town council now gives free stalls to farmers who come every week.',
    ],
  };

  const l1 = leccion('icf-en-avisos-1', 'Signs and notices', [
    sc(6, 'La prueba de inglés empieza con avisos cortos: hay que saber **qué dicen** y **dónde se verían**. No hace falta entender cada palabra, sino la idea.', { title: 'Avisos cortos' }),
    sc(7, 'Las palabras que mandan: **No** + verbo en -ing prohíbe («No smoking»); **must** obliga («You must wear a helmet»); **Please** pide con cortesía («Please close the door»).', { title: 'Prohibir, obligar, pedir' }),
    sc(7, 'Ejemplo: «Staff only» quiere decir «solo empleados»: no se puede entrar si no trabajas allí. «Out of order» quiere decir «no funciona».', { title: 'Avisos que se repiten' }),
    sc(7, 'Las palabras de tiempo cambian todo: «until» (hasta), «before» (antes de), «after» (después de), «from … to …» (de … a …).', { title: 'Hasta, antes, después' }),
    sc(6, 'Truco del examen: lee la opción y vuelve al aviso. Una opción que agrega algo que el aviso no dice es incorrecta, aunque suene lógica.', { title: 'Volver al aviso' }),
  ], [
    x('donde-mirar', 'Where can you read this? Lleva cada pregunta al aviso donde la buscarías.', { doc: AVISOS,
      ...F(['When can a student go in for free?', 3, 'Busca el lugar que cobra entrada.'], ['Where can I ride my bike?', 1, 'Busca un lugar al aire libre.'], ['What can I do if my bus does not leave?', 4, 'Busca el lugar de donde salen los viajes.']),
      luz: [[2, 'Bicycles must stay on the path'], [4, 'Free entry for students on Wednesdays'], [5, 'Passengers can take the 9:00 bus']], bien: 'The first words say the place.' },
      'Las primeras palabras de cada aviso dicen el lugar: museo (free entry), parque (bike) y estación (bus).', 'Lee solo el lugar con el que empieza cada aviso y piensa qué se hace ahí.'),
    x('genero-o-cita', 'Is it a **rule** you must follow or just **information**?', { doc: AVISOS, rot: ['a rule', 'information'],
      ...F(['Dogs must be on a lead', 0, 'Mira el verbo: «must», ¿cuenta u obliga?'], ['The park closes at 7 p.m.', 1, '¿Te pide hacer algo o te dice una hora?'], ['No cycling on the grass', 0, '«No» + «-ing», ¿informa o prohíbe?'], ['The 8:15 bus is cancelled', 1, '¿Te pide hacer algo o te cuenta lo que pasa?'], ['Please return books by Friday', 0, '«Please» + verbo, ¿cuenta algo o pide algo?']), bien: '«Must», «no -ing» and «please» tell you what to do.' },
      '«Must», «No cycling» y «Please return» piden u obligan; «closes» y «is cancelled» solo dan información.', 'Fíjate en el verbo: ¿le dice al lector qué hacer o le cuenta algo?'),
    x('sella-parrafo', 'All these things are in the notices, **EXCEPT**: Ata cada opción a su aviso.', { doc: AVISOS,
      ...T(['Use a different way because the floor is wet', 2, 'Busca «stairs» y «dry».'], ['Describe a jacket to get it back', 5, 'Busca «lost» y «collect».'], ['Book early if your group is big', 3, 'Busca «groups» y «ten people».'], ['Buy food at the museum', 6, 'El museo está. ¿Dice algo de comida?']),
      luz: [[3, 'use the stairs on the left'], [4, 'Groups of more than ten people'], [6, 'describe it to collect it']], bien: 'The option with no notice is the answer.' },
      'El piso mojado está en el aviso 3, la chaqueta en el 6 y los grupos en el 4; de comida no hay nada.', 'Busca la acción de cada opción, no solo el lugar que nombra.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: AVISOS, frases: [[1, 'Please ', 'return', ' books by Friday'], [2, 'The park ', 'closes', ' at 7 p.m.'], [6, 'Things that nobody ', 'collects', ' go to charity']],
      ...F(['give back', 0, 'What do you do with a library book at the end?'], ['shuts', 1, 'At 7 p.m. you cannot go in any more: what happens?'], ['picks up', 2, 'What does the owner do with a lost thing?'], ['buy', null, 'In a library you do not pay for the books.'], ['starts', null, 'It is the end of the day, not the beginning.']), bien: 'Same meaning, different word.' },
      '«Return» es «give back», «close» es «shut» y «collect» es «pick up»: la oración dice lo mismo.', 'Pon cada palabra en la oración y mira si el aviso sigue pidiendo lo mismo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: AVISOS, nums: [4, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Students need a card for free entry.', 0, 'Léela junto a «Show your student card».'], ['On Mondays students pay to enter.', 1, 'Si es gratis los miércoles, ¿qué pasa otro día?'], ['The old ticket is good for the 9:00 bus.', 0, 'Léela junto a «with the same ticket».'], ['The 9:00 bus is more expensive.', 2, 'Busca si el aviso habla de precios.']),
      luz: [[4, 'Show your student card'], [4, 'on Wednesdays'], [5, 'with the same ticket']], bien: 'Written, deduced or not there.' },
      'La tarjeta y el tiquete están escritos; lo del lunes se deduce; el precio del bus de las 9 no aparece.', 'Busca primero si está escrito. Si no, pregunta qué frase del aviso te lleva a esa idea.'),
    x('voz-de-la-fuente', 'Where can you see these notices? Átalos.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: AVISOS, portadas: [['In a hospital', 'place'], ['In a swimming pool', 'place'], ['In a restaurant', 'place'], ['In a classroom', 'place']],
      ...T(['Please turn off your phone near the patients', 0, 'Busca a quién hay que cuidar.'], ['Shower before you get in the water', 1, 'Busca dónde te mojas.'], ['Ask the waiter for the menu', 2, 'Busca quién trabaja ahí.'], ['Clean the board after the lesson', 3, 'Busca qué objeto se limpia.']), bien: 'One word shows the place.' },
      '«Patients», «water», «waiter» y «board» delatan el lugar: hospital, piscina, restaurante y salón.', 'En cada aviso hay una palabra que solo tiene sentido en un lugar. Encuéntrala.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: AVISOS, nums: [1, 2, 6], pregunta: 'It is true', queda: 'The library, the park and the office have rules about time.',
      ...T(['If you are late, you can borrow more books.', 2, 'Busca «late» y «borrow».'], ['You can ride on the grass.', [5, 6], 'Busca «cycling» o «bicycles».'], ['Lost things stay in the office for ever.', 11, 'Busca «one month».']), bien: 'One sentence is enough to say no.' },
      'Quien devuelve tarde no puede prestar, no se puede montar en el pasto y lo no reclamado se dona al mes.', 'Busca la palabra clave de cada frase y lee completa la oración donde está.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are not important to understand the notices.', { doc: AVISOS, lineas: ['Return books on time.', 'The jacket is blue.', 'Keep bikes on the path.', 'Students enter the museum free on Wednesdays.', 'There is a storm today.', 'Lost things are in the main office.'], ...S([1, 4], { 0: 'It is the rule of the library.', 2: 'It is the rule of the park.', 3: 'It is the offer of the museum.', 5: 'It says where to go.' }), bien: 'Rules and places stay; details go.' },
      'El color de la chaqueta y la tormenta son detalles; las reglas y los lugares son el mensaje del aviso.', 'Pregunta qué necesita saber quien lee el aviso para saber qué hacer.'),
  ]);

  const l2 = leccion('icf-en-avisos-2', 'Words and meanings', [
    sc(6, 'Otra parte del examen da una **descripción** en inglés y pide la palabra: «This person makes bread» → «baker».', { title: 'De la descripción a la palabra' }),
    sc(7, 'Las profesiones se reconocen por lo que la persona **hace**: «a farmer grows food», «a nurse helps doctors», «a driver takes you from one place to another».', { title: 'Lo que hace cada uno' }),
    sc(7, 'En un texto, «he», «she», «it» y «they» apuntan a algo dicho antes. Ejemplo: «My aunt has a dog. She walks it every day»: «she» es la tía y «it» el perro.', { title: 'He, she, it, they' }),
    sc(7, 'Una palabra se entiende por su oración: en «the roads become dangerous», «dangerous» tiene que ser algo malo que causa la lluvia.', { title: 'El contexto ayuda' }),
    sc(6, 'Palabras que cambian el sentido: «however» (sin embargo), «because» (porque), «so» (así que), «but» (pero).', { title: 'Bisagras en inglés' }),
  ], [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: MERCADO, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['a market day', 0, 'Read the title again: which word names the topic?'], ['describe a place', 1, 'Who writes it, and why would they write for a school magazine?'], ['a magazine article', 2, 'Look at the source.'], ['a football match', null, 'There is no sport in the title.'], ['sell a car', null, 'A school magazine is not for that.'], ['a poem', null, 'The source and the authors do not say that.']),
      luz: [[1, 'the main square of San Rafael changes'], [4, 'The market is not only a place to shop']], bien: 'Title, author and source gave it away.' },
      'El título habla de un mercado y la fuente es una revista escolar: un artículo que describe un lugar.', 'Lee por separado el título, quién escribe y dónde se publica.'),
    x('voz-de-la-fuente', 'Match each description with its word. Átalas.', { ayuda: 'Tira un hilo desde cada frase hasta la tarjeta que le toca, o toca la frase y luego la tarjeta.', doc: MERCADO, portadas: [['basket', 'a thing'], ['farmer', 'a person'], ['square', 'a place'], ['cash', 'a thing']],
      ...T(['You carry bread or fruit in it', 0, 'Is it a person, a place or a thing?'], ['This person grows food', 1, 'Is it a person, a place or a thing?'], ['An open place in the middle of a town', 2, 'Is it a person, a place or a thing?'], ['Coins and notes', 3, 'You use it to pay: what is it?']), bien: 'First the kind of word, then the meaning.' },
      '«You carry… in it» es un objeto, «this person» una persona, «an open place» un lugar; monedas y billetes, «cash».', 'Decide primero si la descripción es de una persona, un lugar o una cosa.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: MERCADO, frases: [[2, 'so customers do not ', 'need', ' cash'], [3, 'He ', 'started', ' with one basket'], [4, 'old friends ', 'meet', ' for breakfast']],
      ...F(['have to use', 0, 'They can pay with a phone: what is not necessary?'], ['began', 1, 'It was the first thing he did two years ago.'], ['get together', 2, 'What do friends do when they eat with each other?'], ['finished', null, 'He still works: it is not the end.'], ['sell', null, 'Friends are there to eat, not to do business.']), bien: 'Same meaning in the same place.' },
      '«Need» es «have to use», «start» es «begin» y «meet» es «get together»: la oración no cambia.', 'Pon cada opción en la oración y léela entera antes de decidir.'),
    x('tira-referente', 'What do these words refer to? Átalas.', { doc: MERCADO, texto: 'Next to |the farmers|, |a young baker| called Julián sells |bread| made with corn. He started with |one basket|, and now he bakes it every Friday night.',
      ...T(['«He»', 1, 'Put it in the sentence: who started?'], ['«it»', 2, 'Put it in the sentence: what can you bake?']), bien: '«He» is a person; «it» is a thing.' },
      '«He» apunta a una persona, el panadero; «it» apunta a lo que se hornea, el pan.', '«He» es para un hombre y «it» para una cosa. Prueba cada opción en la oración.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: MERCADO,
      ...F(['shows how the day begins', 0, 'Look for the hours of the morning.'], ['presents a farmer', 1, 'Look for a woman and her vegetables.'], ['presents a baker', 2, 'Look for bread and Friday nights.'], ['says why the market is special', 3, 'Look for music and old friends.'], ['explains a problem and a help', 4, 'Look for «However».'], ['gives a recipe', null, 'Nobody explains how to cook something.']),
      luz: [[1, 'At six o\'clock'], [2, 'vegetables'], [5, 'However']], bien: 'Beginning, two people, what makes it special and a problem.' },
      'El texto muestra cómo empieza el día, presenta a dos personas, dice qué lo hace especial y cierra con un problema.', 'Lee la primera oración de cada párrafo y pregunta para qué sirve.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: MERCADO, rot: ['before', 'now', 'the future'],
      ...F(['He had one basket', 0, 'Is the verb in the past or in the present?'], ['He bakes three hundred pieces', 1, 'Look at the word «Now».'], ['He sells everything before ten', 1, 'Look at the word «usually».'], ['Farms will disappear if nobody buys', 2, 'Look at the word «will».']),
      luz: [[3, 'He started with one basket two years ago'], [3, 'Now he bakes'], [5, 'the farms will disappear']], bien: 'The verb tells you when.' },
      '«Started» está en pasado, «bakes» y «sells» en presente y «will disappear» en futuro: el verbo dice cuándo.', 'Mira el verbo y palabras como «ago», «now» o «will».'),
    x('pista-tipo', 'Match each clue with its sentence.', { doc: MERCADO, lineas: ['By seven, the square is full of tables.', 'For many families, it is the most important day.', 'Transport is expensive.', 'The town council now gives free stalls.'],
      ...T(['a time', 0, 'Look for an hour.'], ['an opinion of people', 1, 'Look for what people feel about the day.'], ['a problem', 2, 'Look for something that makes life difficult.'], ['a solution', 3, 'Look for a help that somebody gives.']), bien: 'Time, opinion, problem and solution.' },
      '«By seven» es la hora, «most important» es lo que sienten, «expensive» es un problema y «free stalls» una ayuda.', 'Busca en cada oración una palabra que muestre hora, opinión, dificultad o ayuda.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MERCADO, lineas: ['Every Saturday farmers sell in the square.', 'The trucks are old.', 'People trust the food they buy there.', 'It is also a place to meet.', 'Julián uses cheese.', 'Life is hard for farmers, so the town helps them.'], ...S([1, 4], { 0: 'It says what happens and when.', 2: 'It is why people come back.', 3: 'It is the other reason to go.', 5: 'It is the problem and the help.' }), bien: 'Main ideas stay; details go.' },
      'Los camiones viejos y el queso son detalles: sin ellos se entiende qué es el mercado y qué problema tiene.', 'Quita cada oración y mira si todavía se entiende de qué trata el texto.'),
  ]);

  const TERMINAL = {
    id: 'icf-terminal', title: 'Notices at the bus station',
    paras: [
      'TICKETS. Buy your ticket before you get on the bus. Drivers do not sell tickets. Students pay half price from Monday to Friday if they show their student card at the ticket office.',
      'WAITING ROOM. Please keep your bags with you at all times. Bags left alone will be removed by security. Do not leave food on the seats, and please keep the room clean for other passengers.',
      'PLATFORM 4. Closed for repairs until 15 July. Buses to the coast now leave from Platform 6. Ask at the information desk if you are not sure where to go.',
      'CAFÉ. Open every day from 5 a.m. to 10 p.m. Fresh coffee, fruit and sandwiches. Bring your own cup and get a 10 % discount on hot drinks.',
      'LOST TICKETS. If you lose your ticket, go to Window 2 with your ID. We cannot give you a new ticket without it, so always carry it when you travel.',
    ],
  };
  const Q = preg(TERMINAL, 'ingles');
  return mundo('icf-en-avisos', 'Avisos y Vocabulario', 'ingles', [l1, l2], [
    ['icf-en-avisos-1', 'Un aviso da información concreta: búscala en él antes de elegir.',
      Q('According to the notices, buses to the coast now leave from:', ['Platform 4', 'Window 2', 'Platform 6', 'The café'], 2,
        'El aviso del andén 4 dice que está cerrado por reparaciones y que los buses a la costa salen ahora del andén 6.', 'Lee el aviso PLATFORM 4 completo: dice dónde salen ahora los buses.')],
    ['icf-en-avisos-1', '«Please keep» pide algo y «will be removed» dice lo que pasa si no se cumple.',
      Q('What does the WAITING ROOM notice ask you to do?', ['Give your bags to the driver', 'Leave your bags with security', 'Eat only in the café', 'Keep your bags with you'], 3,
        'El aviso pide tener las maletas con uno todo el tiempo; las que se dejan solas se las lleva seguridad. No obliga a comer en la cafetería.', 'Mira qué pasa con las maletas que se dejan solas.')],
    ['icf-en-avisos-1', 'Las condiciones de un aviso deben cumplirse todas.',
      Q('The TICKETS notice says that students:', ['Always travel free', 'Pay half price on weekdays if they show their card', 'Can buy tickets from the driver', 'Pay half price only on Sundays'], 1,
        'Pagan la mitad de lunes a viernes mostrando el carné. Los conductores no venden tiquetes y nadie viaja gratis.', 'Busca dos condiciones en el aviso: qué días y qué deben mostrar.')],
    ['icf-en-avisos-2', 'Una palabra se entiende por lo que la rodea en el aviso.',
      Q('In the CAFÉ notice, "discount" means:', ['Less money to pay', 'A bigger cup', 'A free sandwich', 'A later closing time'], 0,
        'Si traes tu propio vaso te cobran un 10 % menos por las bebidas calientes: «discount» es pagar menos.', 'Fíjate en el «10 %»: ¿qué le pasa al precio si traes tu vaso?')],
    ['icf-en-avisos-2', '«It» apunta a algo dicho antes que concuerda con él.',
      Q('In the LOST TICKETS notice, the word "it" in "without it" refers to:', ['Your ticket', 'Your ID', 'Window 2', 'The bus'], 1,
        'Para dar un tiquete nuevo hace falta el documento: «without it» es sin tu ID. Por eso dicen que lo lleves siempre.', 'Pregúntate qué hay que llevar a la ventanilla 2 para recibir un tiquete nuevo.')],
    ['icf-en-avisos-2', 'Muchas palabras del examen describen el estado de un lugar.',
      Q('"Closed for repairs" means that Platform 4:', ['Is very busy', 'Is only for students', 'Is being fixed', 'Is a new platform'], 2,
        '«Repairs» son arreglos: el andén está cerrado mientras lo arreglan.', 'Piensa por qué cerrarían un andén hasta una fecha.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-dialogos.js
// Preicfes · Inglés · mundo 2 «Conversaciones Cortas» (spec 2026-11-25-preicfes-estructura): completar una conversación con la respuesta
// que encaja. Diálogos escritos para Zuka; las explicaciones van en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BUS = {
    id: 'icf-en-bus', title: 'On the way to school',
    ficha: { autor: 'English club', fuente: 'School podcast script', fecha: 'March 2026' },
    paras: [
      'Laura is at the bus stop. It is half past six and it is raining. Diego arrives with a big green umbrella. "Good morning! How are you?" he asks. "Not very well," says Laura. "I forgot my umbrella and my shoes are wet." Diego laughs and opens his. "Don\'t worry. There is room for two."',
      'While they wait, they talk about the English test. "What time does it start?" asks Diego. "At eight," answers Laura, "in room twelve." Diego looks nervous. He studied for two hours last night, but he does not remember the past tense. "Can you help me?" he asks. "Of course," she says, and she takes out her notebook.',
      'The bus is late. At ten to seven a woman asks them a question. "Excuse me, does this bus go to the hospital?" "No, it doesn\'t," says Diego. "You need number forty. It stops across the street." The woman thanks them and runs, because the forty is already coming.',
      'Finally their bus arrives. It is full, so they have to stand. "How long does it take?" asks a new student next to them. His name is Samuel and it is his first week. "About twenty minutes," says Laura. "Which class are you in?" "I\'m in 11B," he says. "So are we!" answer Laura and Diego at the same time.',
      'When they get off, the rain has stopped. Samuel does not know where room twelve is. "Why don\'t you come with us?" says Laura. "That would be great," he says. They are five minutes late, but the teacher is still looking for her keys.',
    ],
  };
  const l1 = leccion('icf-en-dialogos-1', 'Everyday replies', guion(
    ['La palabra que pregunta', 'What time pide una hora; where, un lugar; who, una persona; how long, una duración; why, una razón.'],
    ['Do, does, is', 'Does it go…? se responde Yes, it does o No, it doesn’t. Is it…? se responde Yes, it is.'],
    ['Dar y aceptar', 'Why don’t you come? invita; That would be great acepta.'],
    ['La trampa', 'Una opción puede repetir una palabra de la pregunta y no responderla.']), [
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: BUS,
      ...F(['What did Laura forget?', 0, 'Busca el comienzo en la parada.'], ['What subject is the test?', 1, 'Busca el comienzo en el que hablan de una prueba.'], ['Why do they stand on the bus?', 3, 'Busca el comienzo en que llega el bus.']),
      luz: [[1, 'I forgot my umbrella'], [2, 'the English test'], [4, 'It is full']], bien: 'The beginning of each paragraph helps.' },
      'La parada abre el 1, la prueba el 2 y la llegada del bus el 4.', 'Lee solo el comienzo de cada párrafo y busca la palabra clave.'),
    x('voz-de-la-fuente', 'Match each question with its answer.', { ayuda: 'Tira un hilo desde cada respuesta hasta su pregunta.', doc: BUS, portadas: [['What time?', 'question'], ['How long?', 'question'], ['Which class?', 'question'], ['Does it go there?', 'question']],
      ...T(['At eight.', 0, '¿Es una hora, una duración, un grupo o un sí/no?'], ['About twenty minutes.', 1, '¿Es una hora, una duración, un grupo o un sí/no?'], ['I\'m in 11B.', 2, '¿Es una hora, una duración, un grupo o un sí/no?'], ['No, it doesn\'t.', 3, '¿Es una hora, una duración, un grupo o un sí/no?']), bien: 'The question word asks for the answer.' },
      '«What time» pide hora, «how long» duración, «which class» un grupo y «does» se contesta con «does».', 'Mira qué clase de dato pide cada palabra de pregunta.'),
    x('genero-o-cita', 'Is it an **invitation** or a **request for help**?', { doc: BUS, rot: ['invitation', 'request for help'],
      ...F(['Why don\'t you come with us?', 0, '¿Ofrece un plan o pide algo?'], ['Can you help me?', 1, '¿Ofrece un plan o pide algo?'], ['Could you open the door, please?', 1, '¿Ofrece un plan o pide algo?'], ['Would you like to have lunch?', 0, '¿Ofrece un plan o pide algo?'], ['Let\'s go to the park.', 0, '¿Ofrece un plan o pide algo?']), bien: 'Why don\'t you, would you like, let\'s: plans.' },
      '«Why don’t you», «would you like» y «let’s» invitan; «can you» y «could you» piden un favor.', 'Pregunta si quien habla ofrece hacer algo juntos o necesita un favor.'),
    x('pinta-voces', 'Paint each sentence with its speaker.', { doc: BUS, plumas: ['Laura', 'Diego', 'Samuel'],
      ...P(['My shoes are wet.', 0, 'Busca quién no tiene paraguas.'], ['There is room for two.', 1, 'Busca quién abre el paraguas.'], ['That would be great.', 2, 'Busca quién recibe la invitación.'], ['At eight, in room twelve.', 0, 'Busca quién «answers».'], ['You need number forty.', 1, 'Busca quién le responde a la mujer.']), bien: 'Says, asks and answers show the speaker.' },
      'Los verbos «says», «asks» y «answers» muestran quién habla en cada caso.', 'Busca el verbo de decir que está después de las comillas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: BUS, frases: [[3, 'The bus is ', 'late', '.'], [5, 'When they ', 'get off', ', the rain has stopped'], [4, '', 'Finally', ' their bus arrives']],
      ...F(['not on time', 0, 'They wait and wait: how is the bus?'], ['leave the bus', 1, 'They arrive at school: what do they do?'], ['at last', 2, 'After a long time, the bus arrives.'], ['very fast', null, 'It is slow today, not quick.'], ['never', null, 'The bus does arrive.']), bien: 'Same idea.' },
      '«Late» es «not on time», «get off» es «leave the bus» y «finally» es «at last».', 'Pon la ficha en la oración y mira si cuenta lo mismo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BUS, nums: [3, 4], pregunta: 'It is true', queda: 'Samuel is in the same class.',
      ...T(['The bus is early.', 0, 'Busca cómo llega el bus.'], ['Number forty stops far away.', 5, 'Busca dónde para el cuarenta.'], ['They sit on the bus.', 8, 'Busca cómo viajan.']), bien: 'One sentence says no.' },
      'El bus llega tarde, el cuarenta para al frente y en el bus van de pie.', 'Busca la palabra contraria a la de cada frase.'),
    x('tira-referente', 'What do these words refer to?', { doc: BUS, texto: '|Diego| has |a green umbrella| and |Laura| forgot hers. He opens it and they wait.',
      ...T(['«He»', 0, 'Put it in the sentence: who opens?'], ['«it»', 1, 'Put it in the sentence: what can you open?']), bien: 'He is a boy; it is a thing.' },
      '«He» es Diego, el único hombre; «it» es la cosa que se abre: el paraguas.', '«He» es para un hombre; «it», para una sola cosa.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BUS, lineas: ['Laura and Diego wait for the bus.', 'The umbrella is green.', 'They talk about the test.', 'They help a woman and meet Samuel.', 'The woman needs number forty.', 'They go to class together.'], ...S([1, 4], { 0: 'It is where the story begins.', 2: 'It is what worries Diego.', 3: 'It is what happens while they wait.', 5: 'It is how the story ends.' }), bien: 'Main events stay.' },
      'El color del paraguas y el número del otro bus son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si todavía se entiende la historia.'),
  ]);

  const TIENDA = {
    id: 'icf-en-tienda', title: 'A day at the clothes shop',
    ficha: { autor: 'Students of tourism', fuente: 'Customer service handbook', fecha: 'April 2026' },
    paras: [
      'Paula works at a clothes shop on Saturdays. Her boss, Mr. Reyes, has one rule: polite words cost nothing. He says that customers forget the price, but they do not forget how you speak to them.',
      'The first customer is a man who looks angry. "This shirt has a hole in it," he says. "I\'m very sorry about that," answers Paula. "Would you like a new one or your money back?" The man did not expect it. "A new one, please," he says, and his voice is softer.',
      'Later, a tourist comes in. She does not speak Spanish. "Could you tell me how much these boots are?" "They\'re eighty dollars," says Paula. "Oh, that\'s a bit too expensive for me." "I see. May I show you another pair?" The tourist smiles. "Yes, please. That\'s very kind of you."',
      'In the afternoon a boy asks, "Do you mind if I take a photo of this jacket? I want to show it to my mother." Paula knows that Do you mind is a strange question, because the polite answer is no. "Not at all," she says. "Go ahead." Ten minutes later the mother arrives and buys two jackets.',
      'At six, Mr. Reyes closes the door. "How was your day?" he asks. "Tiring, but nice," says Paula. "Would you mind working next Saturday too?" he asks. She thinks for a second. "I\'d love to, but I have an exam." "No problem," he says. "Good luck with it." Paula goes home thinking that her boss follows his own rule.',
    ],
  };
  const l2 = leccion('icf-en-dialogos-2', 'Polite answers', guion(
    ['Pedir con cortesía', 'Could you…?, May I…? y Would you like…? son más corteses que una orden.'],
    ['Do you mind', 'Do you mind if…? pregunta si molesta: para decir que sí se puede, se responde No o Not at all.'],
    ['Rechazar sin ofender', 'I’d love to, but… dice que no con amabilidad y da la razón.'],
    ['Disculpas y suerte', 'A una queja: I’m sorry. A un examen: Good luck. A un favor: That’s very kind of you.']), [
    x('voz-de-la-fuente', 'Match each situation with the polite answer.', { ayuda: 'Tira un hilo desde cada situación hasta su respuesta.', doc: TIENDA, portadas: [['I\'m so sorry', 'answer'], ['Good luck!', 'answer'], ['Of course not', 'answer'], ['You\'re welcome', 'answer']],
      ...T(['This phone is broken!', 0, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['I have an exam today.', 1, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Do you mind if I sit here?', 2, '¿La persona se queja, agradece, pide permiso o va a hacer algo?'], ['Thank you for your help.', 3, '¿La persona se queja, agradece, pide permiso o va a hacer algo?']), bien: 'Complaint, exam, permission, thanks.' },
      'A una queja se pide disculpa, a un examen se desea suerte, al permiso «of course not» y a las gracias «you’re welcome».', 'Di primero qué hace la persona: se queja, agradece, pide o cuenta.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: TIENDA,
      ...F(['presents the rule', 0, 'Look for the boss and his idea.'], ['an angry customer', 1, 'Look for a hole.'], ['a foreign customer', 2, 'Look for the boots.'], ['a question about a photo', 3, 'Look for «Do you mind».'], ['the end of the day', 4, 'Look for the hour.'], ['a robbery', null, 'Nobody takes anything without paying.']),
      luz: [[1, 'one rule'], [2, 'angry'], [3, 'a tourist'], [4, 'a photo'], [5, 'At six']], bien: 'Rule, three customers and the end.' },
      'El texto da la regla, muestra tres clientes y termina con el día.', 'Busca en cada párrafo quién entra o qué hora es.'),
    x('genero-o-cita', 'Does it say **yes** or **no**?', { doc: TIENDA, rot: ['says yes', 'says no'],
      ...F(['Do you mind if I open it? Not at all.', 0, 'Si no le molesta, ¿se puede?'], ['Would you like to come? I\'d love to, but I can\'t.', 1, 'Lee lo que va después de «but».'], ['May I come in? Go ahead.', 0, '¿Le da permiso o no?'], ['Can I smoke here? I\'m afraid not.', 1, '¿Le da permiso o no?']), bien: 'Not at all means yes, you can.' },
      '«Not at all» y «go ahead» dan permiso; «but I can’t» y «I’m afraid not» lo niegan con cortesía.', 'Con «Do you mind», decir «no» es dar permiso.'),
    x('pinta-tipos', 'Paint each sentence: does it **offer**, **ask permission** or **refuse**?', { doc: TIENDA, plumas: ['offers', 'asks permission', 'refuses'],
      ...P(['Would you like a new one?', 0, '¿Da algo, pide permiso o dice que no?'], ['Do you mind if I take a photo?', 1, '¿Da algo, pide permiso o dice que no?'], ['I\'d love to, but I have an exam.', 2, '¿Da algo, pide permiso o dice que no?'], ['May I use your pen?', 1, '¿Da algo, pide permiso o dice que no?'], ['Can I get you some water?', 0, '¿Da algo, pide permiso o dice que no?']), bien: 'Three ways of being polite.' },
      '«Would you like» y «can I get you» ofrecen; «do you mind» y «may I» piden permiso; «I’d love to, but» rechaza.', 'Pregunta quién hará la acción y si la acepta.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: TIENDA, nums: [2, 4], pregunta: 'It is true', queda: 'Paula is polite with everybody.',
      ...T(['The man wants his money back.', 5, 'Busca lo que pide al final.'], ['The man expected that answer.', 4, 'Busca cómo le cayó la pregunta de Paula.'], ['The mother buys one jacket.', 11, 'Busca cuántas compra.']), bien: 'One sentence is enough.' },
      'Pide una camisa nueva, no esperaba esa respuesta y la madre compra dos chaquetas.', 'Busca el dato exacto que cambia cada frase.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: TIENDA, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The boots are eighty dollars.', 0, 'Léela junto a la respuesta de Paula.'], ['The man feels better.', 1, '¿Cómo es su voz al final?'], ['The tourist does not speak Spanish.', 0, 'Léela junto a la segunda oración del párrafo 3.'], ['The tourist is from Canada.', 2, '¿Alguna oración dice su país?']),
      luz: [[3, 'eighty dollars'], [2, 'his voice is softer'], [3, 'She does not speak Spanish']], bien: 'A softer voice shows a feeling.' },
      'El precio y el idioma están escritos; que se siente mejor se deduce de su voz; el país no aparece.', 'Busca pistas en cómo hablan las personas.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: TIENDA, frases: [[2, 'a man who looks ', 'angry', ''], [3, 'a bit too ', 'expensive', ' for me'], [5, '"', 'Tiring', ', but nice," says Paula']],
      ...F(['very annoyed', 0, 'His shirt has a hole: how does he feel?'], ['high in price', 1, 'She cannot pay eighty dollars.'], ['exhausting', 2, 'She worked all day: how was it?'], ['cheap', null, 'It is the opposite.'], ['hungry', null, 'It looks similar, but it is about food.']), bien: 'Angry is not hungry.' },
      '«Angry» es enojado (no «hungry»), «expensive» es caro y «tiring» es agotador.', 'Cuidado con palabras que se parecen: prueba en la oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: TIENDA, lineas: ['Paula\'s boss believes in polite words.', 'She works on Saturdays.', 'She calms an angry customer.', 'She helps a tourist and a boy.', 'The shop closes at six.', 'Her boss is polite with her too.'], ...S([1, 4], { 0: 'It is the rule of the story.', 2: 'It is the first example.', 3: 'They are the other examples.', 5: 'It is the end of the idea.' }), bien: 'The rule and its examples stay.' },
      'El día y la hora de cierre son detalles; la regla y sus ejemplos son la historia.', 'Busca lo que tiene que ver con hablar con cortesía.'),
  ]);

  const PLAN = {
    id: 'icf-en-plan', title: 'The trip that almost did not happen',
    ficha: { autor: 'Eleventh grade', fuente: 'Class blog', fecha: 'May 2026' },
    paras: [
      'Our class is going to visit the desert next month. We have dreamed about it for two years, and last Friday we had a meeting to decide everything. It was not easy. Everybody had a different idea and, at the beginning, nobody was listening.',
      '"I think we should go by bus," said Manuela. "It\'s cheaper." "I don\'t agree," answered Nico. "It takes fourteen hours. I\'d rather fly." Then Tatiana said quietly, "I\'m worried about the money. My family can\'t pay for a plane." There was a long silence.',
      'Nico looked at the floor. "I\'m sorry. I didn\'t think about that," he said. "What if we sell food at the school fair?" suggested Manuela. "That\'s a brilliant idea!" said almost everybody. "I\'m going to make empanadas," said Tatiana, and for the first time she looked happy.',
      'We sold three hundred empanadas and two hundred juices. We were exhausted, but we were also proud. On Monday we counted the money: it was enough for a comfortable bus, but not for a plane. "I\'m a little disappointed," said Nico, "but I\'m excited too. We can sing for fourteen hours." "Oh no," said the teacher, and we all laughed.',
      'Now everything is ready. We will leave on the tenth of June at five in the morning. If it rains, we will visit the museum first. Tatiana is bringing a speaker, Manuela is bringing the tickets, and Nico, who wanted to fly, is bringing a pillow.',
    ],
  };
  const l3 = leccion('icf-en-dialogos-3', 'Feelings and plans', guion(
    ['Cómo se siente', 'Worried, proud, exhausted, excited: la respuesta debe ir con el sentimiento.'],
    ['Planes', 'Be going to: lo que ya se decidió. Will: lo que se promete o se calcula. What if…?: se sugiere.'],
    ['De acuerdo o no', 'I agree, So do I aceptan; I don’t agree, I’d rather… prefieren otra cosa.'],
    ['Reaccionar', 'A una buena noticia: That’s great! A una mala: I’m sorry to hear that.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: PLAN, rot: ['at the meeting', 'the fair and Monday', 'the trip'],
      ...F(['Nobody was listening', 0, 'Busca cuándo tenían que decidir.'], ['They sold empanadas', 1, 'Busca el verbo «sold».'], ['They counted the money', 1, 'Busca el día.'], ['They will leave at five', 2, 'Busca «will».']), luz: [[1, 'we had a meeting'], [4, 'On Monday we counted the money'], [5, 'We will leave']], bien: 'Past, past and future.' },
      'La reunión va primero, luego la venta y el conteo, y el viaje está en futuro con «will».', 'Mira el tiempo del verbo y los días que nombra el texto.'),
    x('voz-de-la-fuente', 'Match each piece of news with the best reaction.', { ayuda: 'Tira un hilo desde cada noticia hasta la reacción.', doc: PLAN, portadas: [['I\'m sorry to hear that', 'reaction'], ['Congratulations!', 'reaction'], ['Don\'t worry, I\'ll help you', 'reaction'], ['Have a nice trip!', 'reaction']],
      ...T(['My dog is very ill.', 0, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I won the race!', 1, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['I can\'t do this homework.', 2, '¿Es una noticia triste, un logro, un problema o una despedida?'], ['We leave for the desert now.', 3, '¿Es una noticia triste, un logro, un problema o una despedida?']), bien: 'Each feeling has its answer.' },
      'A lo triste se lamenta, al logro se felicita, al problema se ofrece ayuda y al viaje se desea suerte.', 'Nombra primero el sentimiento de quien habla.'),
    x('genero-o-cita', 'Does the speaker **agree** or **disagree**?', { doc: PLAN, rot: ['agrees', 'disagrees'],
      ...F(['That\'s a brilliant idea!', 0, '¿Le gusta la propuesta o prefiere otra?'], ['I\'d rather fly.', 1, '¿Le gusta la propuesta o prefiere otra?'], ['So do I.', 0, '¿Piensa lo mismo o distinto?'], ['I don\'t think so.', 1, '¿Piensa lo mismo o distinto?'], ['You\'re right.', 0, '¿Piensa lo mismo o distinto?']), bien: 'I\'d rather means another choice.' },
      '«Brilliant», «so do I» y «you’re right» aceptan; «I’d rather» y «I don’t think so» prefieren otra cosa.', 'Pregunta si quien habla seguiría con la misma idea.'),
    x('pinta-voces', 'Paint each idea with its speaker.', { doc: PLAN, plumas: ['Manuela', 'Nico', 'Tatiana'],
      ...P(['A bus is cheaper.', 0, 'Busca quién habla primero en la reunión.'], ['I\'d rather fly.', 1, 'Busca quién «answered».'], ['I\'m worried about the money.', 2, 'Busca quién habló «quietly».'], ['What if we sell food?', 0, 'Busca quién «suggested».'], ['We can sing for fourteen hours.', 1, 'Busca quién está un poco decepcionado.']), bien: 'Said, answered and suggested.' },
      'Manuela propone el bus y la venta, Nico prefiere volar y canta, Tatiana se preocupa por el dinero.', 'Busca el nombre que está junto a cada cita.'),
    x('comprueba-apuesta', 'Underline the sentence in paragraph 3 that shows Tatiana **changes** her feelings.', { doc: PLAN, nums: [3], apuesta: 'Tatiana is not worried any more.', ...S(['3.5'], { '3.0': 'It is about another person.', '3.1': 'Somebody says sorry here.', '3.2': 'Somebody explains why he is sorry.', '3.3': 'It is a suggestion.', '3.4': 'It is the reaction of the group.' }), bien: 'For the first time she looked happy.' },
      'La última oración dice que por primera vez se vio feliz: antes estaba preocupada.', 'Busca la oración con el nombre de Tatiana y un adjetivo de sentimiento.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: PLAN, frases: [[4, 'We were ', 'exhausted', ', but we were also proud'], [3, 'That\'s a ', 'brilliant', ' idea'], [2, 'I\'m ', 'worried', ' about the money']],
      ...F(['very tired', 0, 'They worked a lot: how did they feel?'], ['very good', 1, 'Almost everybody liked it.'], ['not calm', 2, 'She thinks her family cannot pay.'], ['very angry', null, 'Nobody is fighting here.'], ['bored', null, 'They were working, not waiting.']), bien: 'Feelings in context.' },
      '«Exhausted» es muy cansado, «brilliant» muy bueno y «worried» preocupado.', 'Piensa qué pasó antes para que se sintieran de esa manera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: PLAN, nums: [4, 5], pregunta: 'It is true', queda: 'They are going to the desert by bus.',
      ...T(['They got money for a plane.', 2, 'Busca para qué alcanzó.'], ['They leave at night.', 7, 'Busca la hora de salida.'], ['If it rains, they will not go out.', 8, 'Busca qué harán con mal tiempo.']), bien: 'One sentence says no.' },
      'Alcanzó para un bus, salen a las cinco de la mañana y si llueve van al museo.', 'Busca el dato de dinero, de hora y de lluvia.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: PLAN, lineas: ['The class plans a trip.', 'They sold two hundred juices.', 'They disagree about the bus and the plane.', 'They sell food to get money.', 'Nico brings a pillow.', 'They go by bus and they are happy.'], ...S([1, 4], { 0: 'It is the beginning of the story.', 2: 'It is the problem.', 3: 'It is the solution.', 5: 'It is the end.' }), bien: 'Plan, problem, solution and end.' },
      'La cantidad de jugos y la almohada son detalles; lo demás es plan, problema, solución y final.', 'Deja el plan, el problema, la solución y el final.'),
  ]);

  const CAFE = {
    id: 'icf-en-cafe', title: 'Two friends and a new job',
    paras: [
      'Sara meets her friend Julio at a café on Sunday morning. "You look happy," she says. "I am," he answers. "I got the job at the animal hospital!" "Congratulations!" says Sara. "When do you start?" "Tomorrow at seven. I\'m a little nervous."',
      'The waiter comes. "Are you ready to order?" "Could I have a coffee, please?" says Julio. "I\'m sorry, the machine is broken," says the waiter. "Would you like some tea?" Julio does not like tea very much, but he smiles. "Tea is fine, thank you."',
      '"How are you going to get there?" asks Sara. "By bike. It takes half an hour." "Do you mind if I go with you? My school is on the same street." "Not at all," says Julio. "We can talk on the way."',
      'Sara looks at her watch. Her grandmother is waiting for her. "I\'d love to stay longer, but I have to go," she says. "What about lunch on Friday? You can tell me about your first week." "That sounds great," he says. "And Sara… thanks for coming."',
    ],
  };
  const Q = preg(CAFE, 'ingles');
  return mundo('icf-en-dialogos', 'Conversaciones Cortas', 'ingles', [l1, l2, l3], [
    ['icf-en-dialogos-1', '«When» pide un momento y «how» con un viaje pide el medio.', Q('When Sara asks "How are you going to get there?", she wants to know:', ['The time Julio starts', 'The place of the hospital', 'The way Julio will travel', 'The price of the bike'], 2, 'Julio responde «By bike»: la pregunta es por el medio de transporte.', 'Mira qué responde Julio a esa pregunta.')],
    ['icf-en-dialogos-1', 'La respuesta debe dar el dato que pide la palabra de pregunta.', Q('Which answer is correct for "When do you start?"', ['By bike', 'Tomorrow at seven', 'At the animal hospital', 'A little nervous'], 1, '«When» pide un momento: mañana a las siete.', '¿Cuál opción es un momento?')],
    ['icf-en-dialogos-2', 'A «Do you mind if…?» se responde «Not at all» para dar permiso.', Q('When Julio says "Not at all", he means that:', ['He prefers to go alone', 'He does not like Sara', 'He does not have a bike', 'Sara can go with him'], 3, 'No le molesta: ella puede ir con él. Después dice que pueden hablar en el camino.', 'Lee lo que Julio agrega después.')],
    ['icf-en-dialogos-2', '«I’d love to, but…» rechaza con cortesía.', Q('Sara says "I\'d love to stay longer, but I have to go" to:', ['Leave politely', 'Order more tea', 'Invite the waiter', 'Say she is bored'], 0, 'Dice con cortesía que no puede quedarse, porque la esperan.', 'Fíjate en lo que va después de «but».')],
    ['icf-en-dialogos-3', 'La reacción va con la noticia: a un logro se felicita.', Q('Sara says "Congratulations!" because Julio:', ['Has a new job', 'Drinks tea', 'Has a new bike', 'Is nervous'], 0, 'Acaba de contar que consiguió el trabajo en el hospital de animales.', 'Lee lo que Julio dijo justo antes.')],
    ['icf-en-dialogos-3', '«What about…?» sugiere un plan.', Q('At the end, Sara and Julio decide to:', ['Work together', 'Go to see her grandmother', 'Have lunch on Friday', 'Drink coffee every Sunday'], 2, 'Sara sugiere almorzar el viernes y Julio responde que suena muy bien.', 'Busca la sugerencia que empieza con «What about».')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-gramatica.js
// Preicfes · Inglés · mundo 3 «Gramática en Contexto» (spec 2026-11-25-preicfes-estructura): textos escritos para Zuka; se explica en español.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const RADIO = {
    id: 'icf-en-abuelo', title: 'My grandfather\'s bicycle',
    ficha: { autor: 'Valentina, 16', fuente: 'School story contest', fecha: 'March 2026' },
    paras: [
      'My grandfather bought his bicycle in 1971. It was green, and it cost him three months of work. He rode it to the factory every morning, and on Sundays he took my grandmother to the river on it. When he was seventy, he stopped riding because his knees hurt.',
      'For ten years the bicycle has been in our garage, under an old blanket. Nobody has used it, and spiders have made their houses in the wheels. Last month, while I was looking for a box, I found it. I asked my grandfather if I could repair it. He was watching television. He turned it off and smiled.',
      'We have worked on it every Saturday since then. He knows the name of every piece, but his hands are weak, so he tells me what to do and I do it. I have learned more words than in any class: chain, brake, pedal, spoke. When something is difficult, he says the same thing: "Slowly. It isn\'t running away."',
      'Yesterday we finished. I was going to paint it blue, but he looked so sad that I chose green. This afternoon I am riding it to the river for the first time. He is coming too, in my uncle\'s car, and he is bringing a sandwich, because he says that nobody rides well on an empty stomach.',
      'One day I will give this bicycle to someone younger than me. I will tell them who bought it, how much it cost and why it must always be green. And if something breaks, I won\'t be afraid. I know that it isn\'t running away.',
    ],
  };
  const l1 = leccion('icf-en-gramatica-1', 'Verbs and tenses', guion(
    ['Pasado simple', 'Bought, rode, took: algo que terminó. Va con yesterday, last month, in 1971.'],
    ['Presente perfecto', 'Has been, have worked… since: empezó antes y sigue o importa hoy.'],
    ['Pasado continuo', 'Was looking: lo que estaba pasando cuando ocurrió otra cosa.'],
    ['Futuro', 'Will para promesas; am riding this afternoon para planes ya hechos.']), [
    x('linea-vida', 'Put each fact in its moment.', { doc: RADIO, rot: ['before', 'now', 'the future'],
      ...F(['He rode it to the factory', 0, 'Mira el verbo: ¿«rode» ya pasó?'], ['He knows the name of every piece', 1, 'Mira el verbo: ¿es así hoy?'], ['She will give it to someone younger', 2, 'Busca «will».'], ['It cost three months of work', 0, 'Mira de qué año se habla.']),
      luz: [[1, 'He rode it'], [3, 'He knows'], [5, 'I will give']], bien: 'Rode, knows, will give.' },
      '«Rode» y «cost» están en pasado, «knows» en presente y «will» es futuro.', 'Mira la forma del verbo antes de mirar la historia.'),
    x('genero-o-cita', 'Is it **finished** or does it **continue until now**?', { doc: RADIO, rot: ['finished', 'until now'],
      ...F(['He bought it in 1971', 0, '¿Hay una fecha cerrada?'], ['It has been in our garage for ten years', 1, '¿Dice «for» con «has»?'], ['We have worked every Saturday since then', 1, '¿Dice «since»?'], ['Yesterday we finished', 0, '¿Hay una fecha cerrada?']), bien: 'In 1971, yesterday: finished. For, since: until now.' },
      'Con «in 1971» y «yesterday» terminó; con «has… for» y «have… since» llega hasta hoy.', 'Busca las palabras de tiempo: in, yesterday, for, since.'),
    x('cambia-palabra', 'Put the verb that means the same. Sobran dos.', { doc: RADIO, frases: [[1, 'he ', 'stopped riding', ' because his knees hurt'], [2, 'I ', 'found', ' it'], [4, 'Yesterday we ', 'finished', '']],
      ...F(['did not ride any more', 0, 'He was seventy and it hurt: what happened?'], ['discovered', 1, 'She was looking for a box and saw it.'], ['completed the work', 2, 'The bicycle is ready.'], ['started to ride', null, 'It is the opposite idea.'], ['lost', null, 'She did not lose it: she saw it.']), bien: 'Same tense, same idea.' },
      '«Stopped riding» es dejó de montar, «found» encontró y «finished» terminó el trabajo.', 'Pon cada opción en la oración y mira si cuenta lo mismo.'),
    x('tira-referente', 'What do these words refer to?', { doc: RADIO, texto: '|My grandfather| was watching |television| when I asked him about |the bicycle|. He turned it off and smiled.',
      ...T(['«He»', 0, 'Put it in the sentence: who was there?'], ['«it»', 1, 'Put it in the sentence: what can you turn off?']), bien: 'A man, and something you turn off.' },
      '«He» es el abuelo y «it» es el televisor, lo único que se apaga.', 'Pregunta qué cosa se puede apagar, es decir, «turn off».'),
    x('pasos-del-proceso', 'Put the story in order. The first step is in its place.', { doc: RADIO, que: 'the story', de: 'The green bicycle', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['He buys the bicycle.', 'He stops riding it.', 'She finds it in the garage.', 'They repair it together.', 'She rides it to the river.'], mira: ['', 'It happens when he is seventy.', 'It happens after ten years in the garage.', 'It happens every Saturday.', 'It is the plan for this afternoon.'], bien: 'Buy, stop, find, repair, ride.' },
      'Primero la compra, luego la deja, años después ella la encuentra, la reparan y por fin sale.', 'Busca las edades, los años y los días de la historia.'),
    x('pista-tipo', 'Match each tense with its sentence.', { doc: RADIO, lineas: ['He took my grandmother to the river.', 'I was looking for a box.', 'Nobody has used it.', 'I won\'t be afraid.'],
      ...T(['a finished action', 0, 'Busca un pasado simple.'], ['an action in progress in the past', 1, 'Busca «was» y «-ing».'], ['something until now', 2, 'Busca el auxiliar «has».'], ['something about the future', 3, 'Busca «will» o «won\'t».']), bien: 'Four tenses.' },
      '«Took» terminó, «was looking» estaba en curso, «has used» llega hasta hoy y «won’t» habla del futuro.', 'Mira el auxiliar de cada oración: was, has o will.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: RADIO, nums: [1, 4], pregunta: 'It is true', queda: 'The bicycle is green again.',
      ...T(['He stopped because of the rain.', 3, 'Busca por qué dejó de montar.'], ['They are still repairing it.', [4, 6], 'Busca qué pasó ayer.'], ['The grandfather stays at home today.', 7, 'Busca qué hará él.']), bien: 'One sentence says no.' },
      'Le dolían las rodillas, ayer terminaron y el abuelo también va.', 'Busca la razón, el día y quién va al paseo.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RADIO, lineas: ['A grandfather had a bicycle.', 'The blanket was old.', 'It stayed in a garage for years.', 'He and his granddaughter repaired it.', 'There is a sandwich.', 'She will give it to someone one day.'], ...S([1, 4], { 0: 'It is the beginning.', 2: 'It is the problem.', 3: 'It is the main event.', 5: 'It is the end.' }), bien: 'Beginning, problem, event and end.' },
      'La manta y el sándwich son detalles; lo demás cuenta la historia.', 'Quita cada oración y mira si se entiende.'),
  ]);

  const FARM = {
    id: 'icf-en-cafe-farm', title: 'Where your coffee comes from',
    ficha: { autor: 'Tourism students', fuente: 'Guide for visitors', fecha: 'April 2026' },
    paras: [
      'Most of the coffee in this region grows on small farms in the mountains, between 1,200 and 1,800 metres above sea level. The plants need a lot of water, but they do not like too much sun, so farmers often put banana trees among them to give shade.',
      'From September to December, many people come to pick the coffee. It is hard work because every fruit must be picked by hand. Only the red ones are ready. If you pick the green ones, the coffee tastes bitter. A good worker can fill a basket in less than an hour, although most visitors cannot fill even half of it in a morning.',
      'After that, the beans are washed and dried in the sun for about ten days. Someone has to move them every few hours, and if it rains, they must be covered at once. Finally they are put into bags and sold. A farmer gets only a little of the money that you pay for a cup in a big city.',
      'That is why some families have opened their farms to visitors. During the tour, you can walk between the plants, learn how to choose the best fruits and drink a cup at the end. The money from the tours helps them in the months without harvest. There are also a few houses where you can sleep, but there isn\'t much space, so you should book before you come.',
      'Bring good shoes and a hat, and do not wear anything white. You don\'t need much money, because lunch is included. And please ask before you take a photo of anybody. They are at work, and nobody likes to be a postcard.',
    ],
  };
  const l2 = leccion('icf-en-gramatica-2', 'Small words that matter', guion(
    ['Preposiciones', 'In un mes o un lugar cerrado, on un día o una superficie, at una hora o un punto, from… to un tramo.'],
    ['Cantidades', 'Much con lo que no se cuenta; many y a few con lo que sí; a little con lo que no.'],
    ['Conectores', 'So trae el resultado; because, la causa; although, un obstáculo; but, un contraste.'],
    ['Somebody, anybody, nobody', 'Nobody ya niega; anybody va en preguntas y negaciones.']), [
    x('bisagras', 'Put the word that joins the two ideas. Sobran dos.', { doc: FARM, pares: [['They do not like too much sun,', 'farmers put banana trees among them.'], ['It is hard work', 'every fruit must be picked by hand.'], ['A good worker can fill a basket in an hour,', 'most visitors cannot fill even half.']],
      ...F(['so', 0, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['because', 1, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['although', 2, 'Pone un contraste: ¿dónde lo segundo no es lo esperado?'], ['before', null, 'It is about time: no pair is about what is first.'], ['or', null, 'It gives a choice: no pair gives two options.']), bien: 'Result, cause and contrast.' },
      'La sombra es resultado del sol, la mano es la causa del trabajo duro y los visitantes contrastan.', 'Di qué hace la segunda idea: ¿resulta, explica o contrasta?'),
    x('genero-o-cita', 'Can you count it? **many / a few** or **much / a little**', { doc: FARM, rot: ['many / a few', 'much / a little'],
      ...F(['houses', 0, '¿Se puede decir «two houses»?'], ['water', 1, '¿Se puede decir «two waters» para contar litros?'], ['money', 1, '¿Se puede decir «three moneys»?'], ['visitors', 0, '¿Se puede decir «ten visitors»?'], ['space', 1, '¿Se puede decir «four spaces» para un cuarto?']), bien: 'Count it: many. Not: much.' },
      'Casas y visitantes se cuentan; agua, dinero y espacio, no.', 'Prueba con un número delante de la palabra.'),
    x('pista-tipo', 'Match each time word with the part of the text it completes.', { doc: FARM, lineas: ['___ September to December', '___ about ten days', '___ the tour', 'book ___ you come'],
      ...T(['From', 0, 'Busca dos meses, de uno a otro.'], ['For', 1, 'Busca cuánto dura algo.'], ['During', 2, 'Busca un evento en el que pasan cosas.'], ['before', 3, 'Busca qué se hace primero.']), bien: 'From… to, for, during, before.' },
      '«From… to» une dos meses, «for» mide duración, «during» va con un evento y «before» pone algo antes.', 'Mira lo que sigue: meses, días, un evento o una acción.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: FARM,
      ...F(['What do the plants need?', 0, 'Busca el comienzo que habla de dónde crece.'], ['What happens if it rains on the beans?', 2, 'Busca el comienzo «After that».'], ['What should you wear?', 4, 'Busca el comienzo que pide llevar cosas.']),
      luz: [[1, 'a lot of water'], [3, 'they must be covered'], [5, 'good shoes and a hat']], bien: 'Growing, drying and visiting.' },
      'El 1 habla de dónde crece, el 3 de lo que pasa después y el 5 de lo que hay que llevar.', 'Lee los comienzos y busca la palabra más cercana.'),
    x('cambia-palabra', 'Put the word that means the same. Sobran dos.', { doc: FARM, frases: [[2, 'It is ', 'hard', ' work'], [3, 'they must be covered ', 'at once', ''], [4, 'learn how to ', 'choose', ' the best fruits']],
      ...F(['difficult', 0, 'You do it by hand all day: how is it?'], ['immediately', 1, 'It starts to rain: when do you cover them?'], ['select', 2, 'You want the red ones: what do you do?'], ['easy', null, 'It is the opposite idea.'], ['throw away', null, 'You want to keep the best fruits.']), bien: 'Small changes, same idea.' },
      '«Hard» es difícil, «at once» es de inmediato y «choose» es seleccionar.', 'Lee la oración completa con cada ficha en el hueco.'),
    x('tira-referente', 'What do these words refer to?', { doc: FARM, texto: '|The beans| are dried in |the sun|. |Someone| has to move them every few hours, and it must shine for ten days.',
      ...T(['«them»', 0, 'Put it in the sentence: what is moved?'], ['«it»', 1, 'Put it in the sentence: what can shine?']), bien: 'Many beans, one sun.' },
      '«Them» es plural: los granos; «it» es singular y brilla: el sol.', '«Them» es para varias cosas; «it», para una.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: FARM, nums: [2, 4], pregunta: 'It is true', queda: 'The money from tours helps the families.',
      ...T(['You can pick the fruits with a machine.', 1, 'Busca cómo se recoge cada fruto.'], ['Green fruits taste better.', 3, 'Busca qué pasa con los verdes.'], ['You do not need to book a house.', 8, 'Busca qué debes hacer antes de ir.']), bien: 'One sentence says no.' },
      'Se recoge a mano, los verdes amargan y hay que reservar porque hay poco espacio.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: FARM, lineas: ['Coffee grows on small farms in the mountains.', 'Bags are used at the end.', 'It is picked by hand and dried in the sun.', 'Farmers get little money.', 'A hat is a good idea.', 'Tours help the families.'], ...S([1, 4], { 0: 'It says where it grows.', 2: 'It is how it is made.', 3: 'It is the problem.', 5: 'It is the solution.' }), bien: 'Place, process, problem and solution.' },
      'Las bolsas y el sombrero son detalles; lo demás es lugar, proceso, problema y ayuda.', 'Deja lo que explica por qué reciben visitantes.'),
  ]);

  const CITY = {
    id: 'icf-en-ciudades', title: 'Two sisters, two cities',
    ficha: { autor: 'Daniela Prieto', fuente: 'Travel magazine', fecha: 'May 2026' },
    paras: [
      'My sister Ana lives in Bogotá and I live in Santa Marta. We grew up in the same house, but our lives are very different now. Her city is bigger than mine, and it is also higher and colder. When I visit her, I wear two jackets, and she laughs at me.',
      'Bogotá has the best museums in the country, and I have never been bored there. There are more concerts in one week than in a whole year in my city. However, it isn\'t as relaxed as Santa Marta. The traffic is terrible. Ana\'s trip to work is longer than my whole morning: she leaves home at five to arrive at seven.',
      'Santa Marta is not as exciting, but the sea is the most beautiful thing I know. Everything is closer. I go to work on foot, and I have lunch at home. Food is cheaper too, especially fish. On the other hand, it is so hot in February that it is impossible to walk at noon, and some services, like the internet, are worse than in the capital.',
      'We often argue about who is happier. She says that I am lazier than her, and I say that she is more tired than me. Last Christmas our mother, who lives in a tiny town, listened to us for an hour. "You are both as stubborn as your father," she said. "The best city is the one where somebody waits for you."',
      'This year Ana is going to spend a month with me. She says it will be the quietest month of her life. I think it will be the loudest of mine, because she never stops talking. I can\'t wait.',
    ],
  };
  const l3 = leccion('icf-en-gramatica-3', 'Comparing things', guion(
    ['Más que', 'Cortas: bigger than, colder than. Largas: more tired than.'],
    ['Menos o igual', 'As… as: tan como. Not as… as: no tan como.'],
    ['El más', 'The biggest, the most beautiful, the best, the worst.'],
    ['Irregulares', 'Good, better, the best. Bad, worse, the worst.']), [
    x('pinta-tipos', 'Paint each sentence: which city does it describe?', { doc: CITY, plumas: ['Bogotá', 'Santa Marta', 'both'],
      ...P(['It is colder.', 0, 'Busca dónde se usan dos chaquetas.'], ['Food is cheaper.', 1, 'Busca dónde hay pescado.'], ['It has the best museums.', 0, 'Busca quién tiene conciertos.'], ['A sister lives there.', 2, '¿En cuál de las dos no vive ninguna hermana?'], ['Everything is closer.', 1, 'Busca dónde se va a pie.']), bien: 'Compare, then decide.' },
      'El frío y los museos son de Bogotá, la comida barata y lo cercano de Santa Marta, y en ambas vive una hermana.', 'Busca la oración del texto que compara cada cosa.'),
    x('genero-o-cita', 'Is it **comparing two** or **choosing the top one**?', { doc: CITY, rot: ['comparing two', 'the top one'],
      ...F(['bigger than mine', 0, '¿Lleva «than» o «the…-est / the most»?'], ['the most beautiful thing', 1, '¿Lleva «than» o «the…-est / the most»?'], ['as stubborn as your father', 0, '¿Compara con alguien o escoge entre todos?'], ['the quietest month of her life', 1, '¿Compara con alguien o escoge entre todos?'], ['worse than in the capital', 0, '¿Lleva «than» o «the…-est / the most»?']), bien: 'Than, as… as: two. The…-est, the most: top.' },
      '«Than» y «as… as» comparan; «the most» y «the quietest» escogen el mayor de todos.', 'Busca «than» o «the» con «-est» o «most».'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: CITY, frases: [[2, 'it ', 'isn\'t as relaxed as', ' Santa Marta'], [3, 'Everything is ', 'closer', ''], [2, 'The traffic is ', 'terrible', '']],
      ...F(['is less relaxed than', 0, 'Which city is calmer?'], ['nearer', 1, 'She goes on foot: how far are things?'], ['very bad', 2, 'Two hours to get to work: how is it?'], ['is more relaxed than', null, 'It says the opposite.'], ['very good', null, 'Nobody is happy with two hours.']), bien: 'Not as… as = less… than.' },
      '«Isn’t as relaxed as» es «less relaxed than», «closer» es «nearer» y «terrible», «very bad».', 'Cuidado: «not as… as» quiere decir menos.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: CITY, filas: [{ antes: 'Santa Marta is', topes: ['colder than Bogotá', 'as cold as Bogotá', 'hotter than Bogotá'], va: 2 }, { antes: 'The number of concerts in Bogotá is', topes: ['higher', 'lower', 'the same'], va: 0 }, { antes: 'The internet in Santa Marta is', topes: ['better', 'worse', 'the same'], va: 1 }], mira: ['Read paragraph 1 again: where is it colder?', 'Read paragraph 2 again: concerts in one week.', 'Read the end of paragraph 3 again.'], luz: [[1, 'higher and colder'], [2, 'more concerts'], [3, 'are worse than in the capital']], bien: 'Hotter, higher and worse.' },
      'Bogotá es más fría, tiene más conciertos y en Santa Marta el internet es peor.', 'Busca la palabra que compara en cada párrafo.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: CITY, nums: [2, 3], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Ana needs two hours to get to work.', 1, 'Leave at five, arrive at seven.'], ['Fish is cheaper in Santa Marta.', 0, 'Read the part about food.'], ['The writer works near her home.', 1, 'How does she go to work?'], ['Ana earns more money.', 2, 'Is there a sentence about what they earn?']),
      luz: [[2, 'leaves home at five'], [3, 'especially fish'], [3, 'on foot']], bien: 'Five to seven is two hours.' },
      'El pescado está escrito; las dos horas y la cercanía se deducen; lo que ganan no aparece.', 'Haz la cuenta de las horas y fíjate en cómo va al trabajo.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: CITY, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Ana will visit her sister.',
      ...T(['The writer is always bored in Bogotá.', 0, 'Busca qué dice de aburrirse.'], ['Their mother lives in a big city.', 7, 'Busca dónde vive la mamá.'], ['Ana will stay for a weekend.', 10, 'Busca cuánto tiempo se queda.']), bien: 'One sentence says no.' },
      'Nunca se aburre, la mamá vive en un pueblo diminuto y Ana se queda un mes.', 'Busca en el texto el dato exacto de cada frase.'),
    x('pinta-voces', 'Paint each idea with the person who says it.', { doc: CITY, plumas: ['Ana', 'the writer', 'the mother'],
      ...P(['You are lazier than me.', 0, 'Busca quién critica a la escritora.'], ['You are more tired than me.', 1, 'Busca quién le contesta.'], ['The best city is where somebody waits for you.', 2, 'Busca quién escuchó una hora.'], ['It will be the loudest month.', 1, 'Busca «I think».'], ['It will be the quietest month.', 0, 'Busca «She says».']), bien: 'She says, I say, our mother said.' },
      '«She says» es de Ana, «I think» de la escritora y las comillas, de la mamá.', 'Busca el verbo de decir y mira quién es su sujeto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: CITY, lineas: ['Two sisters live in different cities.', 'The writer wears two jackets.', 'Bogotá is more exciting but less relaxed.', 'Santa Marta is cheaper and closer.', 'Ana leaves at five.', 'Their mother says people matter more than places.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is one side of the comparison.', 3: 'It is the other side.', 5: 'It is the message.' }), bien: 'Situation, two sides and message.' },
      'Las chaquetas y la hora son detalles; lo demás es la comparación y el mensaje.', 'Deja las dos ciudades y lo que dice la mamá.'),
  ]);

  const MUSEO = {
    id: 'icf-en-museo', title: 'The smallest museum in the valley',
    paras: [
      'In 2012, Teresa Gómez opened a museum in her own kitchen. She had only eleven objects: old radios that her neighbours did not want any more. Today there are more than three hundred, and the kitchen has become the smallest but the most visited museum in the valley.',
      'Teresa has never asked anybody for money. People bring radios because they have a story. A taxi driver brought the one that his father was listening to when he was born. A nurse gave her a tiny radio that is smaller than a matchbox.',
      'Although many of them do not work, Teresa repairs at least one every month. She learned by herself, from books, and she is better than most of the technicians in the city. While she works, she tells visitors who owned each radio.',
      'Next year she will move the museum to a bigger house, because there isn\'t much space. "The new place is as old as the radios," she says. "They will feel at home."',
    ],
  };
  const Q = preg(MUSEO, 'ingles');
  return mundo('icf-en-gramatica', 'Gramática en Contexto', 'ingles', [l1, l2, l3], [
    ['icf-en-gramatica-1', '«Has become» llega hasta hoy; «In 2012, … opened» cierra el pasado.', Q('According to the text, the museum started:', ['Last year', 'In 2012', 'Next year', 'When Teresa was born'], 1, '«In 2012, Teresa Gómez opened»: un pasado con fecha.', 'Busca el verbo «opened».')],
    ['icf-en-gramatica-1', '«Will» habla del futuro.', Q('According to Teresa, what will happen next year?', ['The museum will close', 'Teresa will learn English', 'The museum will be in a bigger house', 'Teresa will sell the radios'], 2, '«Next year she will move the museum to a bigger house».', 'Busca «will» en el último párrafo.')],
    ['icf-en-gramatica-2', '«Although» une una idea con lo que no se esperaba.', Q('"Although many of them do not work" means that:', ['All the radios work', 'A lot of radios are broken, but she repairs some', 'Teresa does not work', 'Nobody visits the museum'], 1, 'Muchas no funcionan; aun así, ella repara al menos una al mes.', '¿Qué hace Teresa a pesar de eso?')],
    ['icf-en-gramatica-2', '«Much» va con lo que no se cuenta: much space.', Q('Teresa needs a new house because:', ['The kitchen is too small now', 'The kitchen is too old', 'Her neighbours want the kitchen', 'She has a lot of money'], 0, '«There isn’t much space»: hay poco espacio para más de trescientas radios.', 'Busca lo que va después de «because».')],
    ['icf-en-gramatica-3', '«Smaller than» compara dos cosas.', Q('In the text, the nurse\'s radio is:', ['As big as a matchbox', 'Bigger than a matchbox', 'The biggest radio', 'Not as big as a matchbox'], 3, '«Smaller than a matchbox» es lo mismo que «not as big as a matchbox».', '«Not as… as» quiere decir menos.')],
    ['icf-en-gramatica-3', '«Better than most» no es lo mismo que «the best».', Q('According to the text, Teresa is:', ['A better technician than most in the city', 'The worst technician in the city', 'As good as her neighbours', 'The youngest technician'], 0, '«She is better than most of the technicians in the city».', 'Busca «better than» y mira con quién la comparan.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-corto.js
// Preicfes · Inglés · mundo 4 «Textos Cortos» (spec 2026-11-25-preicfes-estructura): mensajes y textos de nivel básico, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const MAILS = {
    id: 'icf-en-mails', title: 'Messages on the fridge',
    ficha: { autor: 'The Suárez family', fuente: 'Notes, emails and chats', fecha: 'One week in April 2026' },
    paras: [
      'NOTE ON THE FRIDGE. Monday, 6 a.m. Kids, I have an early meeting. There are eggs and bread. Lucas, please walk the dog before school, not after, because the neighbours don\'t like the noise at noon. Sofía, your blue shirt is in the washing machine, so wear the white one. Love, Mum.',
      'CHAT. Monday, 3 p.m. Sofía: Mum, I have a problem. I\'m sleeping at Ana\'s house tonight and I left my project at home. It is for tomorrow morning. Can Grandpa bring it? Mum: He doesn\'t drive at night any more. Ask your teacher if you can send a photo today and bring it on Wednesday. Sofía: Good idea. She said yes!',
      'EMAIL TO THE COACH. Tuesday. Dear Mr Ramos, Lucas hurt his foot this morning while he was walking the dog. The doctor says it isn\'t broken, but he can\'t run for two weeks. He would like to come to training to watch and help with the water. Is that all right? Best wishes, Clara Suárez.',
      'ANSWER. Wednesday. Dear Ms Suárez, I\'m sorry to hear that. Of course he can come. In fact, I need someone to write down the points on Saturday, and Lucas is very good at maths. Tell him to bring a pencil and a hat. Regards, Andrés Ramos.',
      'NOTE ON THE FRIDGE. Saturday. Mum, Dad: we have gone to the game. Lucas is the new "assistant". He has told everybody. There is pizza in the oven for you; we made it, so don\'t worry if it looks strange. Back at six. Grandpa is coming with us, because it is in the afternoon. Sofía.',
    ],
  };
  const l1 = leccion('icf-en-corto-1', 'Short messages', guion(
    ['¿Quién a quién?', 'Mira quién firma y a quién saluda: Dear Mr Ramos… Best wishes, Clara.'],
    ['¿Para qué?', 'Un mensaje pide, avisa, responde, invita o agradece.'],
    ['Datos', 'Subraya día, hora, lugar y lo que hay que hacer.'],
    ['Lo que no se dice', 'Si el abuelo no maneja de noche y va por la tarde, se entiende por qué puede ir.']), [
    x('donde-mirar', 'Lleva cada pregunta al mensaje donde la buscarías.', { doc: MAILS,
      ...F(['What should Sofía wear?', 0, 'Busca la nota de la mañana.'], ['Why can\'t Lucas run?', 2, 'Busca el mensaje al entrenador.'], ['What is there to eat on Saturday?', 4, 'Busca la nota del sábado.']),
      luz: [[1, 'wear the white one'], [3, 'hurt his foot'], [5, 'There is pizza']], bien: 'Read the heading first.' },
      'La ropa está en la nota del lunes, el pie en el correo y la comida en la nota del sábado.', 'Lee solo los encabezados y decide dónde está.'),
    x('pinta-voces', 'Paint each message with its writer.', { doc: MAILS, plumas: ['Mum', 'Sofía', 'Mr Ramos'],
      ...P(['Please walk the dog before school.', 0, 'Busca quién firma la nota del lunes.'], ['I left my project at home.', 1, 'Busca quién tiene un problema.'], ['Tell him to bring a pencil.', 2, 'Busca quién responde el correo.'], ['He would like to come and watch.', 0, 'Busca quién escribe al entrenador.'], ['We made it, so don\'t worry.', 1, 'Busca quién firma el sábado.']), bien: 'The name at the end tells you.' },
      'Mum firma la nota del lunes y el correo (Clara), Sofía escribe el chat y la nota del sábado, y Mr Ramos responde.', 'Mira el nombre o la firma de cada mensaje.'),
    x('voz-de-la-fuente', 'Match each purpose with its message.', { ayuda: 'Tira un hilo desde cada propósito hasta su mensaje.', doc: MAILS, portadas: [['Monday note', 'message'], ['The chat', 'message'], ['Email to the coach', 'message'], ['Saturday note', 'message']],
      ...T(['to tell the kids what to do', 0, '¿Cuál da instrucciones?'], ['to ask for help with homework', 1, '¿Cuál empieza con un problema?'], ['to explain an injury and ask permission', 2, '¿Cuál le escribe a alguien de fuera?'], ['to say where they are', 3, '¿Cuál avisa que salieron?']), bien: 'Tell, ask, explain, inform.' },
      'La nota del lunes da instrucciones, el chat pide ayuda, el correo explica y la del sábado avisa.', 'Pregunta qué quiere lograr quien escribe.'),
    x('genero-o-cita', 'Is it **formal** or **informal**?', { doc: MAILS, rot: ['formal', 'informal'],
      ...F(['Dear Mr Ramos', 0, '¿Se le escribe así a un amigo?'], ['Love, Mum', 1, '¿Se le escribe así a un jefe?'], ['Regards', 0, '¿Se usa con alguien que no es de la familia?'], ['Good idea. She said yes!', 1, '¿Suena a chat o a carta?']), bien: 'Dear and Regards; Love and chat.' },
      '«Dear Mr» y «Regards» son formales; «Love, Mum» y la frase del chat, informales.', 'Piensa a quién le escribirías de esa manera.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: MAILS, nums: [3, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Lucas\'s foot is not broken.', 0, 'Léela junto a lo que dice el doctor.'], ['Grandpa drives them to the game.', 1, '¿Por qué importa que sea por la tarde?'], ['Lucas is proud of his new job.', 1, '¿A quién se lo ha contado?'], ['Lucas\'s team wins.', 2, '¿Se dice el resultado?']),
      luz: [[3, 'it isn\'t broken'], [5, 'because it is in the afternoon'], [5, 'He has told everybody']], bien: 'He does not drive at night.' },
      'El pie está escrito; que el abuelo maneje y que Lucas esté orgulloso se deducen; el resultado no.', 'Junta la nota del sábado con lo que se dijo en el chat.'),
    x('pasos-del-proceso', 'Put the week in order. The first step is in its place.', { doc: MAILS, que: 'the week', de: 'The Suárez family', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Mum leaves a note.', 'Sofía forgets her project.', 'Lucas hurts his foot.', 'The coach answers.', 'They go to the game.'], mira: ['', 'It happens on Monday afternoon.', 'It happens on Tuesday morning.', 'It happens on Wednesday.', 'It happens on Saturday.'], bien: 'Monday, Monday, Tuesday, Wednesday, Saturday.' },
      'La nota y el proyecto son del lunes, el pie del martes, la respuesta del miércoles y el juego del sábado.', 'Mira el día que aparece en cada encabezado.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: MAILS, nums: [1, 4], pregunta: 'It is true', queda: 'Lucas will write down the points.',
      ...T(['Lucas must walk the dog after school.', 4, 'Busca cuándo debe pasear al perro.'], ['Sofía wears the blue shirt on Monday.', 5, 'Busca dónde está la camisa azul.'], ['Lucas is bad at maths.', 11, 'Busca en qué es muy bueno.']), bien: 'One sentence says no.' },
      'El perro va antes del colegio, la camisa azul está lavándose y Lucas es muy bueno en matemáticas.', 'Busca en cada frase la palabra que cambia la verdad.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: MAILS, lineas: ['A family leaves messages for a week.', 'There are eggs and bread.', 'Sofía forgets a project and solves it.', 'Lucas hurts his foot and gets a new job.', 'The pizza is in the oven.', 'The kids and Grandpa go to the game.'], ...S([1, 4], { 0: 'It says what the text is.', 2: 'It is the first problem.', 3: 'It is the second problem and its solution.', 5: 'It is the end.' }), bien: 'Problems and solutions stay.' },
      'Los huevos y la pizza son detalles; los problemas y sus soluciones son la historia.', 'Deja lo que le pasa a cada hijo y cómo acaba.'),
  ]);

  const LIBRARY = {
    id: 'icf-en-burro', title: 'The library with four legs',
    ficha: { autor: 'Young readers\' magazine', fuente: 'Section «People like us»', fecha: 'May 2026' },
    paras: [
      'When Nelson Bravo was a young teacher, he noticed that many of his students had no books at home. The school was two hours from the nearest town, and there was no road. One morning he put forty books on his donkey and went from farm to farm. He thought that nobody would open the door. He came back with an empty bag.',
      'Now he is fifty-three, and he has two donkeys, Comma and Period, and almost two thousand books. Every weekend he visits eight villages. Children wait for him under a tree. They can keep a book for two weeks and, if they tell the story to someone else, they get an extra week. "A book is not finished until you tell it," he says.',
      'At first, some parents were not happy. They thought that reading was a waste of time when there was so much work on the farm. Nelson did not argue. He started to bring books about cows, corn and water. Soon the parents were asking for them, and two of them have learned to read with their children.',
      'It isn\'t always easy. Once, thieves took his bag and found only fairy tales, so they gave it back. Another time, Period fell into the river. He was fine, but sixty books were wet. The children put them in the sun, page by page. Some of those books look terrible now. They are everybody\'s favourites.',
      'People often ask Nelson why he does not use a motorbike. He says that a motorbike cannot cross the river, and that nobody runs out of the house to see a motorbike. When he arrives, the first thing that children do is hug the donkeys. The second is to ask: "What did you bring today?"',
    ],
  };
  const l2 = leccion('icf-en-corto-2', 'What the text says', guion(
    ['Idea principal', 'De qué trata todo el texto, no un párrafo.'],
    ['Detalles', 'Quién, dónde, cuándo, cuánto: están escritos.'],
    ['Palabra por el contexto', 'Si no conoces una palabra, mira lo que la rodea.'],
    ['Correct, wrong, doesn’t say', 'Una opción puede sonar bien y no estar en el texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: LIBRARY, frase: 'It is about [0], to [1]. It is [2].', rot: ['what topic?', 'what for?', 'what kind of text?'],
      ...F(['an unusual library', 0, 'Read the title again: what has four legs there?'], ['tell a person\'s story', 1, 'Read the name of the section.'], ['a magazine article', 2, 'Look at the source.'], ['a horse race', null, 'The title names another thing with the legs.'], ['sell furniture', null, 'A magazine for young readers is not a shop.'], ['a letter to a friend', null, 'A magazine section is not a private message.']),
      luz: [[1, 'forty books on his donkey'], [2, 'two thousand books']], bien: 'Title, author and section gave it away.' },
      'El título habla de una biblioteca rara y la sección, de personas: un artículo que cuenta una historia.', 'Lee por separado el título, quién escribe y la sección.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: LIBRARY,
      ...F(['tells how it started', 0, 'Look for a young teacher.'], ['tells how it works now', 1, 'Look for his age today.'], ['tells how parents changed', 2, 'Look for the parents.'], ['tells two difficult moments', 3, 'Look for thieves and a river.'], ['explains why donkeys', 4, 'Look for another kind of transport.'], ['explains how to build a road', null, 'Nobody builds a road here.']),
      luz: [[1, 'a young teacher'], [2, 'Now he is fifty-three'], [3, 'some parents were not happy'], [4, 'It isn\'t always easy'], [5, 'a motorbike']], bien: 'Start, now, parents, problems and donkeys.' },
      'El texto cuenta el comienzo, cómo funciona hoy, el cambio de los padres, dos problemas y por qué burros.', 'Lee la primera oración de cada párrafo y nómbrala.'),
    x('genero-o-cita', 'Is it **correct** or does the text **not say** it?', { doc: LIBRARY, rot: ['correct', 'doesn\'t say'],
      ...F(['Children can keep a book for two weeks.', 0, '¿Encuentras la oración que lo dice?'], ['Nelson is married.', 1, '¿Encuentras la oración que lo dice?'], ['He has two donkeys.', 0, '¿Encuentras la oración que lo dice?'], ['The government gives him money.', 1, '¿Encuentras la oración que lo dice?'], ['Thieves gave his bag back.', 0, '¿Encuentras la oración que lo dice?']), bien: 'If you can\'t find it, it doesn\'t say.' },
      'Las dos semanas, los dos burros y los ladrones están escritos; el matrimonio y el dinero no aparecen.', 'Busca la oración; si no la encuentras, no lo dice.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LIBRARY, frases: [[1, 'he ', 'noticed', ' that many of his students had no books'], [3, 'reading was ', 'a waste of time', ''], [4, 'Some of those books ', 'look terrible', ' now']],
      ...F(['saw', 0, 'He was their teacher: what did he do?'], ['not useful', 1, 'There was a lot of work: what did parents think?'], ['are in bad condition', 2, 'They were wet and dried in the sun.'], ['very important', null, 'Parents thought the opposite at first.'], ['are more expensive', null, 'Nobody talks about the price of the books.']), bien: 'The sentence gives the meaning.' },
      '«Noticed» es vio, «a waste of time» es inútil y «look terrible» es que están en mal estado.', 'Mira lo que pasa antes y después de la palabra.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LIBRARY, rot: ['when he was young', 'at first with parents', 'now'],
      ...F(['He took forty books to the farms', 0, 'Busca «a young teacher».'], ['They thought reading was not useful', 1, 'Busca «At first».'], ['He visits eight villages', 2, 'Busca «Every weekend».'], ['He has almost two thousand books', 2, 'Busca la palabra «Now».']), luz: [[1, 'One morning'], [3, 'At first'], [2, 'Every weekend']], bien: 'Was, thought, visits.' },
      'Los cuarenta libros son del comienzo, la duda de los padres vino al principio y lo demás es de hoy.', 'Mira el tiempo del verbo y las palabras de tiempo.'),
    x('tira-referente', 'What do these words refer to?', { doc: LIBRARY, texto: '|Thieves| took |his bag| and found only |fairy tales|, so they gave it back.',
      ...T(['«they»', 0, 'Put it in the sentence: who gave something back?'], ['«it»', 1, 'Put it in the sentence: what did they take?']), bien: 'People, and one thing.' },
      '«They» son los ladrones y «it» es la bolsa, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LIBRARY, nums: [1, 4, 5], pregunta: 'It is true', queda: 'Parents changed their minds.',
      ...T(['There was a good road to the school.', 1, 'Busca cómo se llegaba a la escuela.'], ['The wet books were thrown away.', [9, 10, 11], 'Busca qué hicieron con los libros mojados.'], ['A motorbike would be better, Nelson says.', 13, 'Busca por qué no la usa.']), bien: 'One sentence says no.' },
      'No había carretera, los libros mojados se secaron y siguen siendo favoritos, y la moto no cruza el río.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LIBRARY, lineas: ['A teacher takes books to farms on donkeys.', 'One donkey is called Comma.', 'Children borrow books and tell the stories.', 'Parents became interested too.', 'It takes two hours to get to town.', 'He does not change the donkeys for a motorbike.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it works.', 3: 'It is an important change.', 5: 'It is the end and the reason.' }), bien: 'Idea, system, change and reason.' },
      'El nombre del burro y las dos horas son detalles; lo demás es la historia.', 'Deja lo que contarías en una frase a un amigo.'),
  ]);

  const PIANO = {
    id: 'icf-en-piano', title: 'The piano at the station',
    paras: [
      'Last year, somebody left an old piano at the train station in our town. There was a note on it: "Play me. I am free." At first, people only looked at it. Then a cleaner called Marta sat down one night, after work, and played a song that she had learned when she was six.',
      'Someone made a video, and soon the station was full of music. Students played before class, and an old man came every day at five to play the same waltz. The trains were still late, but nobody complained as much as before.',
      'In December, the company wanted to take the piano away because some passengers could not hear the announcements. People signed a letter, and the company had a better idea: now there is a small red light on the piano. When it turns on, you stop playing for a minute.',
      'Marta still cleans the station. On Fridays she gives lessons there for free. Her oldest student is the man of the waltz. He is learning a second song.',
    ],
  };
  const Q = preg(PIANO, 'ingles');
  return mundo('icf-en-corto', 'Textos Cortos', 'ingles', [l1, l2], [
    ['icf-en-corto-1', 'Un mensaje tiene un propósito: pedir, avisar, invitar.', Q('The note on the piano invited people to:', ['Buy the piano', 'Play the piano', 'Clean the piano', 'Move the piano'], 1, '«Play me. I am free» invita a tocarlo; «free» es que no cuesta.', 'Lee la nota que está entre comillas.')],
    ['icf-en-corto-1', 'Busca qué hay que hacer y cuándo.', Q('When the red light turns on, people must:', ['Leave the station', 'Play louder', 'Wait for a minute without playing', 'Buy a ticket'], 2, '«You stop playing for a minute»: hay que parar un minuto.', 'Lee la última oración del párrafo 3.')],
    ['icf-en-corto-2', 'La idea principal vale para todo el texto.', Q('What is the text mainly about?', ['A train company that loses money', 'An old man who can\'t play', 'A cleaner who leaves her job', 'How a piano changed life at a station'], 3, 'Todo el texto cuenta lo que pasó en la estación desde que apareció el piano.', 'Busca la opción que sirve para los cuatro párrafos.')],
    ['icf-en-corto-2', 'La razón está junto a «because».', Q('The company wanted to take the piano away because:', ['Some passengers could not hear the announcements', 'The piano was too old', 'Marta played every night', 'The trains were late'], 0, '«Because some passengers could not hear the announcements».', 'Busca «because» en el párrafo 3.')],
    ['icf-en-corto-2', 'Lo que no se puede señalar, el texto no lo dice.', Q('Which of these does the text NOT say?', ['Marta gives free lessons', 'The old man plays a waltz', 'Students played before class', 'The piano was made in France'], 3, 'Las clases, el vals y los estudiantes están; de dónde es el piano no se dice.', 'Busca cada opción: una no aparece.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-largo.js
// Preicfes · Inglés · mundo 5 «Textos Largos» (spec 2026-11-25-preicfes-estructura): artículos de nivel intermedio, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const NIGHT = {
    id: 'icf-en-night', title: 'The school that opens at night',
    ficha: { autor: 'Interview by Laura Peña', fuente: 'Magazine «Second Chances»', fecha: 'June 2026' },
    paras: [
      'Every evening, when most schools are dark, the lights of the San Roque school come on. The students are not children. Some of them are builders who still have paint on their hands; others are grandmothers who have already cooked dinner for six. The youngest is nineteen and the oldest is seventy-four. They are all here to finish the studies that they once had to leave.',
      'The night school was the idea of Teresa Lozano, who used to clean the building in the afternoons. She could not read the notes that the teachers left for her, and she was too embarrassed to say so. One day she threw away a box of exams by mistake. Instead of shouting at her, the maths teacher, Mr Ibarra, asked her a simple question: "Would you like to learn?"',
      'At first there were only two of them, sitting in an empty classroom. Then Teresa brought her sister, and her sister brought three neighbours. After a year there were forty students, and the headteacher had to ask the town for money to pay the electricity. Today there are two hundred and ten, as well as a waiting list.',
      'The biggest problem is not the maths, Mr Ibarra says, but tiredness. Many students work for ten hours before they come. For that reason, classes last only forty minutes, and the first five are always for coffee. "You cannot teach a person who is asleep," he explains. The school also looks after the students\' children in a room next door, because otherwise half of the mothers would stay at home.',
      'Not everybody finishes. About a third of the students leave during the first three months, often because they have found a job with a different timetable. The school does not see this as a failure. It keeps their notebooks in a cupboard with their names on them, and almost half of those who leave come back one day to ask for them.',
      'Teresa finished secondary school last December, at the age of sixty-one. She no longer cleans the building: she works in the office, where she writes the notes that other people read. On the wall behind her desk there is an old box. It still says "Exams".',
    ],
  };
  const l1 = leccion('icf-en-largo-1', 'Main idea and details', guion(
    ['Primero, de qué trata', 'Lee el título y la primera oración de cada párrafo.'],
    ['La idea de un párrafo', 'Lo que tienen en común sus oraciones.'],
    ['Detalles', 'La pregunta usa otras palabras: «at the age of sixty-one» es «when she was 61».'],
    ['Orden', 'Las preguntas suelen seguir el orden del texto.']), [
    x('antes-de-leer', 'The text is covered. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: NIGHT, frase: 'It is about [0], from [1], and it wants [2].', rot: ['what topic?', 'where does it appear?', 'what for?'],
      ...F(['a school for adults', 0, 'Read the title: at what time does it open?'], ['a magazine', 1, 'Look at the source.'], ['to tell real stories', 2, 'Look at the source and the kind of text.'], ['a school for musicians', null, 'Nothing in the title talks about music.'], ['a text message', null, 'It has an interviewer and a source.'], ['to sell coffee', null, 'A magazine about second chances is not a shop.']),
      luz: [[1, 'The students are not children'], [1, 'finish the studies']], bien: 'Title and source gave it away.' },
      'El título habla de una escuela nocturna y la fuente es una revista de segundas oportunidades.', 'Lee por separado el título, quién escribe y la fuente.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: NIGHT,
      ...F(['presents the students', 0, 'Look for the people in the first lines.'], ['tells how the idea started', 1, 'Look for a mistake with a box.'], ['tells how it grew', 2, 'Look for the numbers of students.'], ['explains a problem and its solutions', 3, 'Look for tired people.'], ['talks about those who leave', 4, 'Look for a cupboard.'], ['tells where Teresa is now', 5, 'Look for December.'], ['explains how to open a bank', null, 'Nobody talks about a bank.']),
      luz: [[1, 'The students are not children'], [2, 'was the idea of Teresa'], [3, 'After a year there were forty'], [4, 'The biggest problem'], [5, 'Not everybody finishes'], [6, 'Teresa finished']], bien: 'Students, idea, growth, problem, leaving, today.' },
      'El texto presenta a los estudiantes, cuenta el origen, el crecimiento, un problema, quiénes se van y el hoy.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: NIGHT,
      ...F(['Why are classes so short?', 3, 'Busca el párrafo que habla de un problema.'], ['How many people study there today?', 2, 'Busca el párrafo que cuenta cómo creció.'], ['What happens to the notebooks?', 4, 'Busca el párrafo de los que no terminan.']),
      luz: [[4, 'classes last only forty minutes'], [3, 'two hundred and ten'], [5, 'It keeps their notebooks']], bien: 'Each question has its paragraph.' },
      'La duración está en el 4, el número en el 3 y los cuadernos en el 5.', 'Di primero de qué habla cada párrafo del texto.'),
    x('linea-vida', 'Put each fact about Teresa in its moment.', { doc: NIGHT, rot: ['before the school', 'at the beginning', 'now'],
      ...F(['She could not read the notes', 0, 'Busca lo que no podía hacer.'], ['She cleaned the building', 0, 'Busca «used to».'], ['She brought her sister', 1, 'Busca «Then».'], ['She works in the office', 2, 'Busca «no longer».']), luz: [[2, 'used to clean'], [3, 'Teresa brought her sister'], [6, 'she works in the office']], bien: 'Used to, then and now.' },
      'No podía leer y limpiaba antes, trajo a su hermana al comienzo y hoy trabaja en la oficina.', '«Used to» es antes; «no longer» marca un cambio.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: NIGHT, nums: [2, 4], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['Teresa was embarrassed.', 0, 'Léela junto al párrafo 2.'], ['Mr Ibarra understood why she made the mistake.', 1, '¿Qué le preguntó en vez de gritar?'], ['Some students have small children.', 1, '¿Para quiénes es el cuarto de al lado?'], ['Mr Ibarra has three children.', 2, '¿Se habla de su familia?']),
      luz: [[2, 'too embarrassed to say so'], [2, 'Would you like to learn?'], [4, 'looks after the students\' children']], bien: 'His question shows that he understood.' },
      'La pena está escrita; que él entendió y que hay estudiantes con hijos pequeños se deducen; sus hijos no se nombran.', 'Mira qué hace cada persona, no solo lo que dice.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: NIGHT, nums: [1, 4, 5], pregunta: 'It is true', queda: 'The oldest student is seventy-four.',
      ...T(['The students are children.', [1, 2, 3], 'Busca quiénes no son.'], ['The biggest problem is maths.', 5, 'Busca cuál es el problema.'], ['The school thinks that leaving is a failure.', 12, 'Busca qué piensa la escuela.']), bien: 'One sentence says no.' },
      'No son niños, el problema es el cansancio y la escuela no lo ve como un fracaso.', 'Busca en el texto la palabra clave de cada frase.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: NIGHT, frases: [[2, 'she was too ', 'embarrassed', ' to say so'], [4, 'The school also ', 'looks after', ' the students\' children'], [6, 'She ', 'no longer cleans', ' the building']],
      ...F(['ashamed', 0, 'She could not read: how did she feel?'], ['takes care of', 1, 'What does the school do with them in the room?'], ['doesn\'t clean any more', 2, 'Does she clean now?'], ['proud', null, 'It is the opposite of how she felt.'], ['searches for', null, 'The children are not lost.']), bien: 'The sentence gives the meaning.' },
      '«Embarrassed» es con vergüenza, «looks after» es cuidar y «no longer» es ya no.', 'Mira lo que pasa antes y después de la palabra.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: NIGHT, lineas: ['Adults finish school at night.', 'There is a cupboard.', 'A cleaner and a teacher started it.', 'The school adapts to tired students.', 'Classes begin with coffee.', 'Today Teresa works in the office.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is how it works.', 5: 'It closes the story.' }), bien: 'Idea, start, system and end.' },
      'El mueble y el café son detalles; lo demás es la historia.', 'Deja lo que contarías a alguien en un minuto.'),
  ]);

  const SILENCE = {
    id: 'icf-en-noise', title: 'Please don\'t help me with my silence',
    ficha: { autor: 'Daniela Rueda', fuente: 'Opinion page, «Campus News»', fecha: 'May 2026' },
    paras: [
      'I have been quiet since I was born. My mother says that I did not cry: I looked around. At school, my teachers wrote the same sentence every year: "Daniela is an excellent student, but she should participate more." I am twenty now, and I would like to answer them, in writing, of course.',
      'People usually think that quiet people are sad, rude or afraid. Some are, just as some noisy people are. But silence can also be a way of listening. In a group of five, if four are talking, somebody has to notice that the fifth idea was the best one. Very often, that somebody is me.',
      'I understand why teachers ask us to speak. It is difficult to know what a student is thinking if she never opens her mouth, and in many jobs you have to explain your ideas aloud. I have worked on it, and I can do it. What I do not accept is the word "but" in that sentence, as if being quiet were a hole in an otherwise good person.',
      'Last month, a professor tried something different. Before each discussion, she gave us three minutes to write. Then everybody read one idea. The result surprised her: the students who usually talked the most had the shortest papers, and some of the best questions came from the back of the room. She has used the method ever since, and nobody calls it a favour for shy people any more.',
      'I am not asking noisy people to be quiet. I love my noisy friends; they order the pizza, and I hate the telephone. I am asking for something smaller: a pause. Count to five before you fill the silence. You may discover that it was not empty.',
      'So, dear teachers, thank you for those twelve reports. If you ever write one about a student like me again, please take out three letters. "Daniela is an excellent student, and she listens." You will not need the rest.',
    ],
  };
  const l2 = leccion('icf-en-largo-2', 'The writer and the reader', guion(
    ['¿Para qué escribe?', 'To tell, to explain, to complain, to persuade, to thank…'],
    ['¿Qué siente u opina?', 'Busca adjetivos, «I think», «what I do not accept».'],
    ['¿Qué quiere del lector?', 'Pide, invita o advierte: «I am asking for…».'],
    ['El tono', 'Puede ser serio, divertido, molesto o agradecido.']), [
    x('pinta-tipos', 'Paint each sentence: is it a fact or an opinion?', { doc: SILENCE, plumas: ['fact', 'opinion'],
      ...P(['I am twenty now.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Silence can be a way of listening.', 1, '¿Se puede comprobar o es lo que ella piensa?'], ['A professor gave us three minutes to write.', 0, '¿Se puede comprobar o es lo que ella piensa?'], ['Being quiet is not a hole in a person.', 1, '¿Se puede comprobar o es lo que ella piensa?']), bien: 'You can check a fact.' },
      'La edad y los tres minutos se comprueban; lo demás es lo que ella piensa del silencio.', 'Pregunta si alguien podría no estar de acuerdo.'),
    x('voz-de-la-fuente', 'Match each purpose with its paragraph.', { ayuda: 'Tira un hilo desde cada propósito hasta su párrafo.', doc: SILENCE, portadas: [['Paragraph 2', 'text'], ['Paragraph 3', 'text'], ['Paragraph 4', 'text'], ['Paragraph 5', 'text']],
      ...T(['to correct a wrong idea', 0, '¿Cuál empieza con lo que la gente piensa?'], ['to accept a reason and set a limit', 1, '¿Cuál empieza con «I understand»?'], ['to give an example', 2, '¿Cuál cuenta lo que hizo alguien?'], ['to ask the reader for something', 3, '¿Cuál dice lo que pide?']), bien: 'Correct, accept, show, ask.' },
      'El 2 corrige una idea, el 3 reconoce y pone un límite, el 4 da un ejemplo y el 5 pide algo.', 'Lee la primera oración de cada párrafo y dile un nombre.'),
    x('genero-o-cita', 'Would the writer **agree** or **disagree**?', { doc: SILENCE, rot: ['she agrees', 'she disagrees'],
      ...F(['Quiet students can have great ideas.', 0, '¿Qué mostró el método de la profesora?'], ['Noisy people should stop talking.', 1, '¿Qué dice que no está pidiendo?'], ['Speaking aloud is useful in many jobs.', 0, '¿Qué reconoce en el párrafo 3?'], ['A quiet person always feels sad.', 1, '¿Qué piensa de esa idea?']), bien: 'She asks for a pause, not for silence.' },
      'Reconoce que hablar sirve y que los callados tienen ideas; no pide callar a nadie ni cree que estén tristes.', 'Busca en el texto qué dice ella de cada idea.'),
    x('subraya-tesis', 'Underline in paragraph 5 the sentence that says **what she is asking for**.', { doc: SILENCE, nums: [5], n: 1, va: ['5.2'], mira: { '5.0': 'She says what she is not asking.', '5.1': 'She talks about her friends.', '5.3': 'It is how to do it, not the request itself.', '5.4': 'It is what may happen after.' }, bien: 'She asks for something small.' },
      '«I am asking for something smaller: a pause» dice lo que pide.', 'Una oración dice lo que no pide; busca la que dice lo que sí.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: SILENCE, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['They had three minutes.', 0, 'It is true, but what happened after that?'], ['Writing first helped quiet students to share good ideas.', 1, 'Does it cover the whole paragraph?'], ['Students who talk a lot never think.', 2, 'Does the text say «never»?']),
      luz: [[4, 'she gave us three minutes to write'], [4, 'some of the best questions']], bien: 'The method gave everybody a chance.' },
      'Los tres minutos son un detalle; «never» dice de más; la idea justa es que escribir antes ayudó.', 'La idea justa explica para qué sirvió el método.'),
    x('tira-referente', 'A new sentence about her friends: what do these words refer to?', { doc: SILENCE, texto: 'I love |my noisy friends|; they order |the pizza|, and it is always good.',
      ...T(['«they»', 0, 'Put it in the sentence: who orders?'], ['«it»', 1, 'Put it in the sentence: what is good?']), bien: 'People, and one thing.' },
      '«They» son los amigos que piden y «it», la pizza, una sola cosa.', '«They» es para varios y «it» para una cosa.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: SILENCE, nums: [5, 6], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['She hates the telephone.', 0, 'Busca lo que odia.'], ['The three letters are the word "but".', 1, 'Compara la frase de los reportes con la nueva.'], ['She writes with humour.', 1, '¿Cómo suena lo de la pizza y los reportes?'], ['Her teachers have read this text.', 2, '¿Se dice si lo leyeron?']),
      luz: [[5, 'I hate the telephone'], [6, 'take out three letters']], bien: 'But becomes and.' },
      'Lo del teléfono está escrito; la palabra y el humor se deducen; si la leyeron no se sabe.', 'Compara las dos frases sobre Daniela, al comienzo y al final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: SILENCE, lineas: ['A quiet student answers her teachers.', 'She did not cry when she was born.', 'Silence can be a way of listening.', 'Writing first gave everybody a chance.', 'Her friends order pizza.', 'She asks people for a pause.'], ...S([1, 4], { 0: 'It is who writes and why.', 2: 'It is her main opinion.', 3: 'It is her example.', 5: 'It is her request.' }), bien: 'Purpose, opinion, example and request.' },
      'El nacimiento y la pizza son detalles; lo demás es su argumento.', 'Deja lo que ella quiere que entiendas al leerla.'),
  ]);

  const MAP = {
    id: 'icf-en-map', title: 'The man who draws wrong maps',
    paras: [
      'If you get lost in the old part of our city, there is a good chance that it is Fabio Serna\'s fault. For eleven years he has been drawing maps for tourists, and every one of them has a mistake. He makes the mistakes on purpose.',
      'It started when he worked in a hotel. Guests used to arrive with a perfect map on their phones, walk straight to the cathedral, take the same photo and walk straight back. "They had seen everything and met nobody," he says. So he drew a map in which one street was missing. The first couple who used it came back three hours late, with a bag of bread and the telephone number of a baker who had walked with them.',
      'His maps are free, and at the bottom they say, in very small letters: "This map has one mistake. Ask somebody." He never puts the mistake near a dangerous street, and he changes it every month, because the neighbours enjoy being asked, but it should not always be the same ones, at the same corner.',
      'Not everyone is amused. A tour company complained to the mayor that the maps made visitors miss their buses. The mayor\'s answer was to order two thousand copies. Since then, a university has studied the effect: visitors with Fabio\'s map talk to six local people on average, while those with a phone talk to one, and that one is usually the waiter.',
      'I asked Fabio if he was not tired of drawing the same streets. He gave me a map of my own neighbourhood, where I have lived for twenty years. I looked for the mistake all afternoon. In the end I had to ask a neighbour. We had never spoken before.',
    ],
  };
  const Q = preg(MAP, 'ingles');
  return mundo('icf-en-largo', 'Textos Largos', 'ingles', [l1, l2], [
    ['icf-en-largo-1', 'La idea principal sirve para todo el texto.', Q('What is the text mainly about?', ['A hotel that loses its guests', 'A tour company with late buses', 'Maps with a mistake that make people talk to each other', 'A baker who helps tourists'], 2, 'Todo el texto habla de los mapas con un error y de lo que producen.', 'Busca la opción que sirve para los cinco párrafos.')],
    ['icf-en-largo-1', 'La pregunta usa otras palabras que el texto.', Q('Why does Fabio change the mistake every month?', ['Because the streets are dangerous', 'So that the same neighbours are not always asked', 'Because the mayor told him to', 'To sell more maps'], 1, 'Los vecinos disfrutan que les pregunten, pero no siempre los mismos en la misma esquina.', 'Lee el final del párrafo 3.')],
    ['icf-en-largo-1', 'Los números: mira de quién es cada uno.', Q('According to the university, people who use a phone usually talk to:', ['One person, often a waiter', 'Six local people', 'Nobody', 'Two thousand people'], 0, '«Those with a phone talk to one, and that one is usually the waiter».', 'Hay dos números en el párrafo 4: mira cuál es el del teléfono.')],
    ['icf-en-largo-2', 'Pregunta para qué escribe el autor.', Q('The writer\'s main purpose is to:', ['Complain about tourists', 'Sell a map', 'Teach people to draw', 'Tell the story of an unusual project'], 3, 'Cuenta la historia de Fabio y de sus mapas, sin vender ni quejarse.', 'Piensa qué hace el autor en casi todos los párrafos.')],
    ['icf-en-largo-2', 'El final muestra lo que el autor aprendió.', Q('At the end, the writer realises that:', ['The map was perfect', 'Fabio is tired of his work', 'It is better to buy a phone', 'The people next door were strangers until that day'], 3, 'Después de veinte años nunca había hablado con su vecino.', 'Lee las dos últimas oraciones.')],
    ['icf-en-largo-2', 'El tono se nota en los gestos y las palabras.', Q('How does the mayor feel about the maps?', ['He likes them', 'He is afraid of them', 'He hasn\'t seen them', 'He wants to stop them'], 0, 'Ante la queja, mandó pedir dos mil copias: le gustan.', 'Mira qué hizo cuando recibió la queja.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-vocabulario.js
// Preicfes · Inglés · mundo 6 «Palabras en Contexto» (spec 2026-11-25-preicfes-estructura): textos de nivel A2 y B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const BAKERY = {
    id: 'icf-en-bakery', title: 'A bakery without a door',
    ficha: { autor: 'Written by Iris Vélez', fuente: 'Travel blog «Slow Streets»', fecha: 'April 2026' },
    paras: [
      'There is a bakery in the old part of Popayán that has no door. It has a small window, a bell, and a basket that goes down on a rope from the second floor. You ring the bell, put your money in the basket and shout what you want. A minute later, the basket comes back with warm bread. In eleven years, nobody has ever stolen it.',
      'The owner, Fermín Ruiz, opened the place after an accident at work. He was told that he would hardly walk again, and his flat had thirty-two stairs. Moving was too expensive, so he decided to stay at home and let the bread travel instead of him. At first his neighbours laughed at the idea. Then they tried the bread.',
      'He gets up at three. He does not use any machines, except for an old radio. While the dough is resting, he reads the notes that people leave in the basket. Some are orders for the following day. Others are jokes, recipes, or questions such as "How do you get rid of mice?" He answers every one of them, usually with a piece of cake.',
      'Business has grown so quickly that a supermarket offered to sell his bread. He turned it down. "They wanted two thousand rolls a day, all the same size," he explains. "I make two hundred, and each one looks like the person I am thinking of." He did accept, however, a smaller offer: the hospital now sends a nurse with a long list every Friday.',
      'Last month the rope broke. The basket fell on the street with forty rolls in it. Before Fermín could reach the window, the children of the block had already picked everything up, and someone had climbed a ladder with a new rope. There was one roll missing. The next morning he found a coin in the basket, with a note: "Sorry. I was hungry."',
    ],
  };
  const l1 = leccion('icf-en-vocabulario-1', 'Choosing the right word', guion(
    ['Mira alrededor', 'La palabra correcta encaja en sentido y en gramática.'],
    ['Palabras parecidas', 'say / tell, make / do, look / watch: cada una tiene su compañía.'],
    ['Verbos con partícula', 'get up, give up, turn down, look after: el sentido cambia.'],
    ['Cantidad', 'much, many, few, any, every.']), [
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: BAKERY, frases: [[2, 'he would ', 'hardly', ' walk again'], [3, 'How do you ', 'get rid of', ' mice?'], [4, 'He ', 'turned it down', '.']],
      ...F(['only with difficulty', 0, 'After the accident, could he walk easily?'], ['remove', 1, 'Who wants mice at home?'], ['said no to it', 2, 'Did the supermarket sell his bread?'], ['very fast', null, 'He had an accident: think about it.'], ['accepted it', null, 'It is the opposite.']), bien: 'The sentence gives the meaning.' },
      '«Hardly» es apenas, «get rid of» es deshacerse de y «turn down» es rechazar.', 'Lee lo que pasa antes y después de cada palabra.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: BAKERY, pares: [['He uses no machines,', 'an old radio.'], ['Moving was too expensive,', 'he stayed at home.'], ['He reads the notes', 'the dough is resting.']],
      ...F(['except for', 0, 'One thing is different: which pair has an exception?'], ['so', 1, 'The second idea is the result of the first one.'], ['while', 2, 'Two things happen at the same time.'], ['because of', null, 'It gives a cause before a noun.'], ['unless', null, 'It is a condition: no pair has one.']), bien: 'Exception, result and time.' },
      '«Except for» exceptúa, «so» da el resultado y «while» indica a la vez.', 'Di qué hace la segunda idea con la primera.'),
    x('genero-o-cita', 'Which verb goes with it: **make** or **do**?', { doc: BAKERY, rot: ['make', 'do'],
      ...F(['a cake', 0, '¿Se fabrica algo?'], ['your homework', 1, '¿Es una tarea?'], ['a mistake', 0, '¿Con qué verbo se dice «cometer un error»?'], ['the shopping', 1, '¿Es una actividad?'], ['a decision', 0, '¿Con qué verbo se dice «tomar una decisión»?']), bien: 'Make a cake, do a task.' },
      '«Make» crea algo (cake, mistake, decision); «do» es para tareas (homework, shopping).', 'Piensa si se crea algo nuevo o se realiza una tarea.'),
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: BAKERY, nums: [1, 5], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['The bakery has no door.', 0, 'Búscala al comienzo.'], ['The neighbours care about Fermín.', 1, '¿Qué hicieron cuando se rompió la cuerda?'], ['The person with the coin felt bad.', 1, '¿Qué dice la nota?'], ['The rope was made in China.', 2, '¿Se dice de dónde es?']),
      luz: [[1, 'has no door'], [5, 'picked everything up'], [5, 'Sorry. I was hungry']], bien: 'A coin and a note say a lot.' },
      'La puerta está escrita; el cariño y la pena se deducen; el origen de la cuerda no.', 'Mira lo que hace la gente en el último párrafo.'),
    x('pista-tipo', 'Match each word with its opposite.', { doc: BAKERY, lineas: ['expensive', 'accept', 'warm', 'following'],
      ...T(['cheap', 0, '¿Cuál habla de precio?'], ['turn down', 1, '¿Cuál es decir sí?'], ['cold', 2, '¿Cuál habla de temperatura?'], ['previous', 3, '¿Cuál habla de lo que viene después?']), bien: 'Price, answer, heat and time.' },
      'Caro y barato, aceptar y rechazar, tibio y frío, siguiente y anterior.', 'Di primero de qué habla cada palabra de la lista.'),
    x('tira-referente', 'What do these words refer to?', { doc: BAKERY, texto: '|The supermarket| wanted |the rolls|, but it wanted them all the same size.',
      ...T(['«it»', 0, 'Put it in the sentence: who wanted?'], ['«them»', 1, 'Put it in the sentence: what was the same size?']), bien: 'One place, many things.' },
      '«It» es el supermercado, uno solo; «them», los panes, varios.', '«It» es para uno solo y «them» es para varios.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: BAKERY, nums: [1, 2, 4], pregunta: 'It is true', queda: 'The hospital buys his bread.',
      ...T(['People often steal the basket.', 4, 'Busca qué ha pasado en once años.'], ['The neighbours loved the idea from the beginning.', 8, 'Busca qué hicieron al comienzo.'], ['He makes two thousand rolls a day.', 13, 'Busca cuántos hace él.']), bien: 'One sentence says no.' },
      'Nadie la ha robado, al comienzo se rieron y él hace doscientos.', 'Busca la palabra clave de cada frase en el texto.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: BAKERY, lineas: ['A man sells bread with a basket on a rope.', 'He has an old radio.', 'He started after an accident.', 'He keeps his business small.', 'A nurse comes on Fridays.', 'His neighbours help him.'], ...S([1, 4], { 0: 'It is the main idea.', 2: 'It is how it started.', 3: 'It is his decision.', 5: 'It is the end.' }), bien: 'Idea, start, decision and end.' },
      'La radio y la enfermera son detalles; lo demás es la historia.', 'Deja lo que contarías de la historia en cuatro frases.'),
  ]);

  const RIVER = {
    id: 'icf-en-river', title: 'The beautiful art of being bored',
    ficha: { autor: 'Dr Marcos Lema', fuente: 'Science page for students', fecha: 'May 2026' },
    paras: [
      'When did you last feel bored? For many people the answer is surprising: they cannot remember. A bus is late, and we look at our phones. A film becomes slow, and we look at our phones. We have almost completely lost the ability to do nothing, and some scientists are worried about it.',
      'Boredom is unpleasant, of course. Nevertheless, it seems to be useful. In one study, people were asked to copy numbers from a telephone book for fifteen minutes, which is a terribly boring task. Afterwards they had to think of different uses for a plastic cup. They had more original ideas than another group, who had not copied anything.',
      'The explanation may be simple. When nothing interesting happens outside, the mind starts looking for something inside. It remembers, imagines and makes unexpected connections. In addition, boredom tells us that what we are doing is not meaningful enough, so it pushes us to change. Without it, we would probably stay in front of the same wall for ever.',
      'This does not mean that every kind of boredom is good. A person who is bored at work for years can become unhappy or even ill. Moreover, people who get bored easily sometimes look for dangerous ways of feeling alive. As with salt, the right amount makes the difference.',
      'So what can we do? I am not going to suggest that you throw your phone into the river. Instead, try a small experiment. The next time you are waiting for something, keep your hands in your pockets. At first you will feel uncomfortable. Then, if you are lucky, you will have an idea. And if you have no idea at all, at least you will have seen what the sky looks like on a Tuesday.',
    ],
  };
  const l2 = leccion('icf-en-vocabulario-2', 'Word families and connectors', guion(
    ['Familias', 'bore, bored, boring, boredom: el final dice qué clase de palabra es.'],
    ['Prefijos', 'un-, dis-, in- dan lo contrario: unpleasant, unexpected.'],
    ['Conectores', 'However y nevertheless contrastan; moreover agrega; therefore concluye.'],
    ['-ed y -ing', 'bored es cómo te sientes; boring es lo que lo causa.']), [
    x('genero-o-cita', 'Which one completes the idea: **bored** or **boring**?', { doc: RIVER, rot: ['bored', 'boring'],
      ...F(['I am ___ today.', 0, '¿Habla de cómo se siente alguien?'], ['This film is ___.', 1, '¿Habla de la cosa que lo causa?'], ['The children look ___.', 0, '¿Habla de cómo se siente alguien?'], ['What a ___ task!', 1, '¿Habla de la cosa que lo causa?']), bien: 'People are bored; things are boring.' },
      '«Bored» es cómo se siente alguien; «boring», lo que aburre.', 'Pregunta si la palabra habla de quien siente o de lo que causa.'),
    x('pinta-tipos', 'Paint each word with its type.', { doc: RIVER, plumas: ['noun', 'adjective', 'adverb'],
      ...P(['boredom', 0, 'Look at the end of the word.'], ['useful', 1, 'Look at the end of the word.'], ['completely', 2, 'Look at the end of the word.'], ['explanation', 0, 'Look at the end of the word.'], ['dangerous', 1, 'Look at the end of the word.']), bien: '-dom, -tion; -ful, -ous; -ly.' },
      '«-dom» y «-tion» forman sustantivos, «-ful» y «-ous» adjetivos y «-ly» adverbios.', 'Compara las terminaciones: algunas se repiten.'),
    x('bisagras', 'Put the connector. Sobran dos.', { doc: RIVER, pares: [['Boredom is unpleasant.', 'it seems to be useful.'], ['It helps the mind.', 'it pushes us to change.'], ['I had nothing to do,', 'I looked at the sky.']],
      ...F(['Nevertheless,', 0, 'One idea is bad and the other one is good.'], ['In addition,', 1, 'It adds another good thing.'], ['so', 2, 'The second idea is the result.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, addition and result.' },
      '«Nevertheless» contrasta, «in addition» agrega y «so» da el resultado.', 'Di si la segunda idea se opone, se suma o resulta.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: RIVER, frases: [[1, 'lost the ', 'ability', ' to do nothing'], [3, 'makes ', 'unexpected', ' connections'], [2, '', 'Afterwards', ' they had to think']],
      ...F(['power', 0, 'It is something that we can do.'], ['surprising', 1, 'The prefix «un-» says «not».'], ['Later', 2, 'When did they do the second task?'], ['usual', null, 'It is the opposite of one of them.'], ['Before', null, 'It is the opposite of one of them.']), bien: 'Context and prefixes help.' },
      '«Ability» es la capacidad, «unexpected» lo que sorprende y «afterwards» después.', 'Mira el prefijo de la palabra o la oración completa.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: RIVER, filas: [{ antes: 'Boredom', topes: ['is useless', 'is always good', 'seems to be useful'], va: 2 }, { antes: 'The writer wants you to', topes: ['sell your phone', 'try an experiment', 'stop working'], va: 1 }, { antes: 'The bored group had', topes: ['more original ideas', 'no ideas', 'the same ideas'], va: 0 }], mira: ['Busca la palabra que suaviza la idea.', 'Relee el párrafo 5.', 'Relee el resultado del estudio.'], luz: [[2, 'it seems to be useful'], [5, 'try a small experiment'], [2, 'more original ideas']], bien: 'Seems, try and more.' },
      'Parece útil, propone un experimento y el grupo aburrido tuvo más ideas.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('mapa-margen', 'What does each paragraph do? Sobra una nota.', { doc: RIVER,
      ...F(['presents the problem', 0, 'Look for what we have lost.'], ['describes a study', 1, 'Look for a telephone book.'], ['gives an explanation', 2, 'Look for the mind.'], ['shows the other side', 3, 'Look for salt.'], ['suggests something to do', 4, 'Look for pockets.'], ['sells a phone', null, 'Nobody sells anything.']),
      luz: [[1, 'lost the ability'], [2, 'In one study'], [3, 'The explanation'], [4, 'This does not mean'], [5, 'try a small experiment']], bien: 'Problem, study, why, but, so.' },
      'Presenta el problema, un estudio, la explicación, un límite y una sugerencia.', 'Lee el comienzo de cada párrafo y dile un nombre.'),
    x('talla-idea', 'Put each idea of paragraph 4 in its size.', { doc: RIVER, p: 4, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['Salt is in the text.', 0, 'It is true, but what does it compare?'], ['Some boredom helps, but too much can be bad.', 1, 'Compare it with the last sentence.'], ['Boredom always makes people ill.', 2, 'Does the text say «always»?']),
      luz: [[4, 'the right amount'], [4, 'This does not mean']], bien: 'The right amount.' },
      'La sal es una comparación, «always» dice de más y la idea justa es la cantidad adecuada.', 'Mira la palabra «every» y la última oración.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: RIVER, lineas: ['We have forgotten how to be bored.', 'The cup is plastic.', 'A little boredom can help us to have ideas.', 'Too much boredom can be bad.', 'It was a telephone book.', 'The writer suggests waiting without a phone.'], ...S([1, 4], { 0: 'It is the problem.', 2: 'It is the main idea.', 3: 'It is the limit.', 5: 'It is the suggestion.' }), bien: 'Problem, idea, limit and suggestion.' },
      'El vaso y el directorio son detalles del estudio; lo demás es el argumento.', 'Deja lo que usarías para explicarle el texto a alguien.'),
  ]);

  const LIGHT = {
    id: 'icf-en-light', title: 'The lighthouse keeper\'s cat',
    paras: [
      'Sergio Paz had lived alone in the lighthouse for nine years when a cat arrived. Nobody knows how it crossed the water. It was thin, wet and extremely angry, and it immediately chose the only comfortable chair.',
      'At first, Sergio was not pleased. He was used to silence, and the cat complained about everything: the food, the wind and, above all, the radio. However, he soon noticed something strange. Every time that the cat hid under the bed, a storm came within two hours. The official weather service was often wrong. The cat was not.',
      'Sergio began to write it down. He also told the fishermen, who laughed at him until one of them decided not to go out one morning because the cat was hiding. That day three boats were damaged. Since then, the fishermen have called the lighthouse before every trip. They do not ask for the weather forecast. They ask: "Where is she?"',
      'A scientist who visited the island last year was careful. Cats, she explained, may feel changes in air pressure, so there is probably no magic in it. Nevertheless, before she left, she asked Sergio to phone her if the cat went under the bed.',
      'Sergio has been offered a modern station with sensors and a screen. He has accepted it, although he keeps it in the kitchen, next to the fish. "The machine tells me what is happening," he says. "She tells me whether I should worry."',
    ],
  };
  const Q = preg(LIGHT, 'ingles');
  return mundo('icf-en-vocabulario', 'Palabras en Contexto', 'ingles', [l1, l2], [
    ['icf-en-vocabulario-1', 'Mira lo que hace el personaje para entender la palabra.', Q('«At first, Sergio was not pleased» means that he was:', ['Unhappy about the cat', 'Asleep', 'Very tired of fishing', 'Glad to have a cat'], 0, '«Pleased» es contento; con «not», no le gustó.', 'Mira lo que hacía el gato y cómo vivía Sergio.')],
    ['icf-en-vocabulario-1', '«Be used to» es estar acostumbrado.', Q('«He was used to silence» means that silence was:', ['Something he hated', 'Something new for him', 'Something normal for him', 'Something he needed to buy'], 2, 'Después de nueve años solo, el silencio era lo normal.', 'Piensa cuántos años había vivido solo.')],
    ['icf-en-vocabulario-1', 'Escoge la palabra que encaja en sentido y gramática.', Q('Which word could replace «damaged» in paragraph 3?', ['Painted', 'Sold', 'Broken', 'Built'], 2, 'Después de una tormenta, las barcas quedaron dañadas.', 'Piensa qué hace una tormenta con una barca.')],
    ['icf-en-vocabulario-2', 'Nevertheless contrasta.', Q('In paragraph 4, «Nevertheless» shows that the scientist:', ['Believed in magic', 'Was angry', 'Didn\'t like cats', 'Trusted the cat a little, although she had an explanation'], 3, 'Explica que no es magia y, aun así, pide que la llamen.', 'Compara lo que explicó con lo que pidió.')],
    ['icf-en-vocabulario-2', '-ly forma adverbios: cómo o cuándo ocurre algo.', Q('In «it immediately chose the only comfortable chair», «immediately» tells us:', ['When it chose the chair', 'Which chair it was', 'Why it chose the chair', 'Whose chair it was'], 0, '«Immediately» es de inmediato: dice cuándo.', 'Pregunta qué información agrega la palabra.')],
    ['icf-en-vocabulario-2', 'Although: aunque.', Q('What does Sergio mean in the last paragraph?', ['The machine is useless', 'The cat should use the machine', 'He will sell the cat', 'Both help him, but in different ways'], 3, 'La máquina informa y la gata le dice si preocuparse.', 'Compara lo que dice de la máquina con lo que dice de ella.')],
  ]);
})());
;
//#archivo js/courses/preicfes-en-inferencia.js
// Preicfes · Inglés · mundo 7 «Inferir y Opinar» (spec 2026-11-25-preicfes-estructura): textos de nivel B1, escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const LETTER = {
    id: 'icf-en-postman', title: 'The postman\'s last street',
    ficha: { autor: 'Short story by Omar Díaz', fuente: 'Magazine «Small Towns»', fecha: 'March 2026' },
    paras: [
      'On his last working day, Mr Beltrán polished his shoes twice. He had carried letters along the same eleven streets for thirty-eight years, and he knew which dogs were only pretending. There were just nine envelopes in his bag. When he started, there used to be two hundred.',
      'At number four, Mrs Pinto was waiting behind the curtain, as usual. She always opened the door before he could ring. "Anything for me?" she asked. There was nothing; there had been nothing since her son stopped writing. Mr Beltrán put his hand in the bag, took out a supermarket leaflet and gave it to her with great care, as if it were made of glass. She thanked him and said she would read it after lunch.',
      'The baker gave him a warm roll without saying a word. He had never done that before. The children of the corner house had drawn a stamp on the pavement with chalk, so big that three of them could lie inside it. Mr Beltrán walked around it, even though it was raining and his shoes were already wet.',
      'In the last street lived a man who had not spoken to him since 1997, because of a parcel that arrived broken. Mr Beltrán had a letter for him. He could have left it in the box. Instead, he rang the bell. The man opened the door, looked at the letter, looked at the shoes, and then, for some reason, looked at his own hands. "You had better come in," he said. "The coffee is on."',
      'The next morning, at exactly eight, Mrs Pinto looked through the curtain. A young woman with a yellow helmet was riding past on a motorbike, and she did not stop. Mrs Pinto waited a little longer. Then she heard somebody whistling. Mr Beltrán was coming up the street, in old shoes, without a bag. He had a leaflet in his hand.',
    ],
  };
  const l1 = leccion('icf-en-inferencia-1', 'Reading between the lines', guion(
    ['Inferir', 'Unir dos datos del texto para entender algo que no está escrito.'],
    ['Gestos', 'Lo que un personaje hace dice lo que siente.'],
    ['Pistas, no imaginación', 'Debes poder señalar el dato que te hace pensarlo.'],
    ['Must, might, can’t', 'must be: seguro; might be: quizá; can’t be: imposible.']), [
    x('dice-deduce', 'Does it say it, can you deduce it, or is it not there?', { doc: LETTER, nums: [1, 2], rot: ['it says so', 'you can deduce it', 'it does not say'],
      ...F(['There were nine envelopes in the bag.', 0, 'Busca el número de sobres.'], ['People write fewer letters now.', 1, 'Compara nueve con doscientos.'], ['Mrs Pinto misses her son.', 1, '¿Qué pregunta siempre y quién dejó de escribir?'], ['Her son lives in Spain.', 2, '¿Se dice dónde vive?']),
      luz: [[1, 'nine envelopes'], [1, 'two hundred'], [2, 'her son stopped writing']], bien: 'Two facts make one idea.' },
      'Nueve está escrito; que hoy se escribe menos y que ella extraña a su hijo se deducen; España no.', 'Une dos datos: si no puedes señalarlos, no está.'),
    x('pista-tipo', 'Match each action with the feeling it shows.', { doc: LETTER, lineas: ['He polished his shoes twice.', 'He gave the leaflet with great care.', 'He walked around the drawing.', 'The man looked at his own hands.'],
      ...T(['it is a special day for him', 0, '¿Cuál es de su último día?'], ['kindness to a lonely person', 1, '¿A quién le dio algo sin importancia?'], ['respect for what children made', 2, '¿Qué evitó pisar?'], ['he feels ashamed', 3, '¿Quién llevaba años sin hablar?']), bien: 'Actions speak.' },
      'Lustrar es por el día especial, el cuidado por bondad, rodear el dibujo por respeto y mirarse las manos por vergüenza.', 'Pregunta por qué una persona haría ese gesto.'),
    x('genero-o-cita', 'From the clues: **it must be true** or **it might be true**?', { doc: LETTER, rot: ['must be true', 'might be true'],
      ...F(['He worked for more than thirty years', 0, '¿Hay un dato que lo asegura?'], ['The letter was from the man\'s family', 1, '¿Se dice de quién era?'], ['The new post person uses a motorbike', 0, '¿Hay un dato que lo asegura?'], ['The baker felt sad', 1, '¿Es seguro o solo posible?']), bien: 'Must needs proof; might is possible.' },
      'Los 38 años y la moto están seguros; la familia y la tristeza son posibles.', '«Must» pide una prueba; «might» solo una posibilidad.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: LETTER, nums: [2, 4, 5], pregunta: 'It is true', queda: 'Mr Beltrán visits Mrs Pinto the next day.',
      ...T(['Mrs Pinto got a letter that day.', 3, 'Busca lo que había para ella.'], ['Mr Beltrán left the letter in the box.', 9, 'Busca qué hizo en su lugar.'], ['The woman on the motorbike stopped.', 14, 'Busca qué hizo al pasar.']), bien: 'One sentence says no.' },
      'No había nada para ella, él tocó el timbre y la moto no paró.', 'Busca en el texto la palabra clave de cada frase.'),
    x('linea-vida', 'Put each fact in its moment.', { doc: LETTER, rot: ['years before', 'the last day', 'the next morning'],
      ...F(['A parcel arrived broken', 0, 'Busca el año 1997.'], ['The baker gave him a roll', 1, 'Busca al panadero.'], ['He came with old shoes', 2, 'Busca cómo venía vestido al final.'], ['He had two hundred letters', 0, 'Busca «used to be».']), luz: [[4, 'since 1997'], [3, 'a warm roll'], [5, 'in old shoes']], bien: 'Used to, that day, next morning.' },
      'El paquete y las doscientas cartas son de antes, el pan del último día y los zapatos viejos del siguiente.', 'Busca la expresión de tiempo de cada hecho.'),
    x('cambia-palabra', 'Put the words that mean the same. Sobran dos.', { doc: LETTER, frases: [[1, 'which dogs were only ', 'pretending', ''], [4, 'You ', 'had better', ' come in'], [3, '', 'even though', ' it was raining']],
      ...F(['acting', 0, 'Were those dogs really dangerous?'], ['should', 1, 'Is it an order, a wish or advice?'], ['although', 2, 'Does the rain agree with what he did?'], ['because', null, 'The rain is not the reason.'], ['can\'t', null, 'The man opened the door.']), bien: 'Context gives the meaning.' },
      '«Pretending» es fingir, «had better» es deberías y «even though» es aunque.', 'Lee toda la oración y piensa qué ocurre de verdad.'),
    x('talla-idea', 'Why did he come back? Put each idea in its size.', { doc: LETTER, p: 5, rot: ['only a detail', 'just right', 'says too much'],
      ...F(['He was whistling.', 0, 'It is true, but why did he come?'], ['He knows that Mrs Pinto waits for someone every day.', 1, 'Join paragraph 2 and paragraph 5.'], ['He is going to live with Mrs Pinto.', 2, 'Does the text say that?']),
      luz: [[5, 'Mrs Pinto looked through the curtain'], [5, 'He had a leaflet in his hand']], bien: 'He keeps the visit, not the job.' },
      'Silbar es un detalle, vivir con ella dice de más; vuelve porque sabe que lo esperan.', 'Une el folleto del párrafo 2 con el del final.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: LETTER, lineas: ['A postman works for the last time.', 'The helmet is yellow.', 'He is kind to a lonely woman.', 'He makes peace with an old enemy.', 'It is raining.', 'The next day he visits the woman again.'], ...S([1, 4], { 0: 'It is the situation.', 2: 'It is what we learn about him.', 3: 'It is an important change.', 5: 'It is the end of the story.' }), bien: 'Situation, kindness, peace and end.' },
      'El casco y la lluvia son detalles; lo demás es la historia.', 'Deja lo que muestra quién es él y qué cambia.'),
  ]);

  const ZOO = {
    id: 'icf-en-zoo', title: 'Should our zoo close?',
    ficha: { autor: 'Two letters to the editor', fuente: 'City newspaper', fecha: 'April 2026' },
    paras: [
      'FIRST LETTER, from Paula Henao. I went to the zoo last Sunday for the first time in twenty years. The same bear was walking the same eight steps, forwards and backwards, next to the same wall. I counted. My daughter asked me what he had done wrong. I could not answer her. I believe that the zoo should close.',
      'I know that zoos say they protect animals. Some really do. According to its own website, however, our zoo has 340 animals, and only six of them belong to species that are in danger. Nor has it returned a single one to nature since 2010. A place that locks up 334 animals so that we can eat ice cream in front of them is not a hospital. It is a shop window.',
      'SECOND LETTER, from Julián Marín, vet. Ms Henao is right about the bear, and I have said so for years. But she is wrong about the solution. Most of our animals were taken from people who kept them illegally: a monkey that lived in a bathroom, parrots without feathers. They cannot survive in the forest. If we close the zoo, where will they go?',
      'In my opinion, what we need is a different kind of zoo: no new animals, more space and fewer visitors. Last year 80,000 children came. Perhaps many of them only remember the ice cream. But one of them might become the person who protects the forest, and nobody protects what they have never seen.',
      'A week later the newspaper published a note from Ms Henao. "I visited Dr Marín. I still think that nobody needs to see a bear in order to love one. But I met the monkey from the bathroom, and I have changed my mind about closing. I would now say: stop buying, stop selling tickets at weekends, and move the bear first." Dr Marín\'s answer was even shorter: "The bear moves on Monday. Bring your daughter."',
    ],
  };
  const l2 = leccion('icf-en-inferencia-2', 'Opinions and facts', guion(
    ['Fact', 'Se puede comprobar: 340 animals.'],
    ['Opinion', 'I believe, in my opinion, should: alguien puede no estar de acuerdo.'],
    ['Reason', 'Una opinión vale más con razones y datos.'],
    ['Change of mind', 'Un buen argumento puede hacer cambiar de idea.']), [
    x('genero-o-cita', 'Is it a **fact** or an **opinion**?', { doc: ZOO, rot: ['fact', 'opinion'],
      ...F(['The zoo has 340 animals', 0, '¿Se puede contar?'], ['The zoo should close', 1, '¿Alguien puede no estar de acuerdo?'], ['80,000 children came last year', 0, '¿Se puede contar?'], ['It is a shop window', 1, '¿Es un dato o una comparación de quien opina?']), bien: 'Count it or discuss it.' },
      'Los animales y los niños se cuentan; cerrar y la vitrina son opiniones.', 'Pregunta si podrías comprobarlo con números.'),
    x('pinta-voces', 'Paint each idea with its writer.', { doc: ZOO, plumas: ['Paula Henao', 'Julián Marín'],
      ...P(['It is not a hospital.', 0, 'Busca la primera carta.'], ['They cannot survive in the forest.', 1, 'Busca quién es veterinario.'], ['No new animals and more space.', 1, 'Busca quién propone otra clase de zoo.'], ['Nobody needs to see a bear to love one.', 0, 'Busca quién escribió la nota final.']), bien: 'Two voices, two ideas.' },
      'Paula critica la vitrina y escribe la nota; Julián explica y propone otro zoo.', 'Busca la firma o el nombre antes de cada carta.'),
    x('balanza-tesis', 'Opinion: "our zoo does not protect animals". What does each fact do?', { doc: ZOO, tesis: 'Our zoo does not protect animals',
      ...F(['Only six animals are in danger.', 0, '¿La apoya o la debilita?'], ['Most animals were taken from illegal owners.', 1, '¿Los protegió de algo?'], ['It has not returned any animal to nature.', 0, '¿La apoya o la debilita?'], ['The ice cream is good.', 2, '¿Habla de proteger?']), bien: 'For, against, or nothing.' },
      'Seis en peligro y ninguno devuelto la apoyan; haberlos rescatado la debilita; el helado no pesa.', 'Pregunta si el dato muestra que protege o que no.'),
    x('pilares', 'What supports Dr Marín\'s idea: "We should not close the zoo"?', { doc: ZOO, idea: 'We should not close the zoo',
      ...F(['The animals cannot survive in the forest.', 0, '¿Explica por qué no cerrar?'], ['Children may learn to protect nature.', 0, '¿Explica por qué no cerrar?'], ['The bear walks eight steps.', 1, '¿Es una razón para no cerrar?'], ['The note was published a week later.', 1, '¿Es una razón para no cerrar?']), bien: 'Reasons answer why.' },
      'Que no sobrevivan y que los niños aprendan son razones; los pasos y la fecha no.', 'Une la idea y la frase con «because» y mira si tiene sentido.'),
    x('bisagras', 'Put the word that joins. Sobran dos.', { doc: ZOO, pares: [['Ms Henao is right about the bear.', 'she is wrong about the solution.'], ['They can\'t survive in the forest,', 'the zoo can\'t close.'], ['We need a different zoo', 'the animals have nowhere to go.']],
      ...F(['However,', 0, 'One idea agrees and the other one does not.'], ['so', 1, 'The second idea is the result.'], ['because', 2, 'The second idea gives the reason.'], ['For example,', null, 'No pair gives an example.'], ['unless', null, 'No pair has a condition.']), bien: 'Contrast, result and reason.' },
      '«However» contrasta, «so» da el resultado y «because» la razón.', 'Di qué hace la segunda idea con la primera.'),
    x('descarta-prueba', 'These sentences are false. Ata cada una a la oración que la desmiente.', { doc: ZOO, nums: [2, 3, 5], pregunta: 'It is true', queda: 'Ms Henao changed her mind.',
      ...T(['Most animals in the zoo are in danger.', 2, 'Busca cuántos están en peligro.'], ['Dr Marín thinks that the bear is fine.', 7, 'Busca en qué le da la razón.'], ['Ms Henao still wants to close the zoo.', 15, 'Busca en qué cambió de idea.']), bien: 'One sentence says no.' },
      'Solo seis están en peligro, él le da la razón sobre el oso y ella cambió de idea.', 'Busca en el texto la palabra clave de cada frase.'),
    x('ajusta-alcance', 'Move each knob until it says the same as the text.', { doc: ZOO, filas: [{ antes: 'The zoo has returned to nature', topes: ['many animals', 'six animals', 'no animals since 2010'], va: 2 }, { antes: 'One child', topes: ['will certainly', 'might', 'cannot'], va: 1 }, { antes: 'At the end they', topes: ['agree on some things', 'agree on nothing', 'never meet'], va: 0 }], mira: ['Busca lo que dice desde 2010.', 'Busca la palabra de posibilidad.', 'Relee la nota final.'], luz: [[2, 'Nor has it returned a single one'], [4, 'might become'], [5, 'I have changed my mind']], bien: 'None, might and some.' },
      'Ninguno desde 2010, «might» es posibilidad y al final coinciden en parte.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('tacha-resumen', 'Cross out the **two** sentences that are only details.', { doc: ZOO, lineas: ['Two people write about closing a zoo.', 'The bear takes eight steps.', 'One says that it does not protect animals.', 'The other says that the animals have nowhere to go.', 'There are parrots.', 'They meet and find a middle way.'], ...S([1, 4], { 0: 'It is the topic.', 2: 'It is one opinion.', 3: 'It is the other opinion.', 5: 'It is the end.' }), bien: 'Topic, two opinions and end.' },
      'Los pasos y los loros son detalles; lo demás es la discusión.', 'Deja lo que explica en qué piensan distinto.'),
  ]);

  const TRAIN = {
    id: 'icf-en-shoes', title: 'The shoe museum',
    paras: [
      'There is a museum in our town with only one room and no famous object in it. It belongs to Alba Ríos, who used to repair shoes. For forty years, people left shoes in her shop and some of them never came back. She did not sell them. "Somebody might need to remember," she says.',
      'Each pair has a card. "Size 37, red. She said she would dance in them on Saturday. She never collected them, and that was the year of the flood." "Boots, very old. He came every month for twelve years to ask if they were ready. They were ready. He liked to talk."',
      'The council wanted to move the museum to a bigger building, with lights and a café. Alba thanked them and said no. A shoe, she explained, is the only thing that keeps the shape of a person, and shapes need quiet. Some people think that she is being difficult. I think she is right, although I would have liked the coffee.',
      'Last month a woman of about seventy came in, walked slowly along the wall and stopped in front of the red shoes. She did not say anything. She took off her own shoes, which were grey and comfortable, and she tried the red ones on. They still fitted. Alba turned up the radio.',
      'There is now an empty space on the wall. Alba has not taken away the card, but she has written one more line on it. I will not tell you what it says. You should go and read it.',
    ],
  };
  const Q = preg(TRAIN, 'ingles');
  return mundo('icf-en-inferencia', 'Inferir y Opinar', 'ingles', [l1, l2], [
    ['icf-en-inferencia-1', 'Une dos datos para deducir.', Q('What can we deduce about the woman of about seventy?', ['She wanted to steal the shoes', 'She worked in the museum', 'She was probably the owner of the red shoes', 'She had never seen them before'], 2, 'Se detiene ante ellos, se los prueba y todavía le quedan.', 'Une lo que hizo con que todavía le quedaban.')],
    ['icf-en-inferencia-1', 'Un gesto dice lo que no se dice.', Q('Why does Alba turn up the radio?', ['So that the woman can dance', 'Because she cannot hear', 'To make the woman leave', 'Because it is late'], 0, 'La tarjeta decía que iba a bailar con esos zapatos.', 'Recuerda lo que decía la tarjeta de los zapatos rojos.')],
    ['icf-en-inferencia-1', 'Los gestos muestran intenciones.', Q('Why did the man with the boots come every month?', ['They were never ready', 'He wanted his money', 'He had forgotten the shop', 'He enjoyed talking with Alba'], 3, '«They were ready. He liked to talk».', 'Lee las dos últimas frases de su tarjeta.')],
    ['icf-en-inferencia-2', 'Opinion: alguien puede no estar de acuerdo.', Q('Which sentence is an opinion of the writer?', ['The museum has one room', 'I think she is right', 'Each pair has a card', 'The council wanted to move it'], 1, '«I think» anuncia una opinión.', 'Busca la frase que alguien podría discutir.')],
    ['icf-en-inferencia-2', 'Una razón responde por qué.', Q('Why doesn\'t Alba want a bigger building?', ['It is too expensive', 'She doesn\'t like coffee', 'She thinks that the shoes need a quiet place', 'She wants to sell the shoes'], 2, '«Shapes need quiet»: necesitan silencio.', 'Lee lo que explica sobre los zapatos.')],
    ['icf-en-inferencia-2', 'El final puede invitar al lector.', Q('What does the writer want the reader to do?', ['Visit the museum', 'Buy red shoes', 'Write a card', 'Open a café'], 0, '«You should go and read it» invita a visitarlo.', 'Lee la última oración.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-base.js
// Curso de Geometría Euclidiana (spec 2026-11-26-curso-euclidiana): sigue los ocho capítulos de «Geometría Euclidiana» de
// J. R. Londoño (Ude@). Cada mundo vive en js/courses/euclidiana-<mundo>.js y hace EUC_MUNDOS.push(EUC.mundo(…));
// js/courses/euclidiana.js (después de data.js) arma el curso en el orden del temario. Va después de preicfes-base.js: los
// ejercicios se escriben con los mismos ayudantes (x, sol, err, opc, guion, leccion). EUC_HECHOS lista los mundos terminados.
const EUC_MUNDOS = [];
const EUC_HECHOS = [];
// Temario: [mundo, título, [lecciones], capítulo del libro]. Lo que no esté en EUC_MUNDOS sale como «En preparación».
const EUC_TEMARIO = [
  ['euc-demostrar', 'Lógica de la Demostración', ['Hipótesis, tesis y razones', 'Demostración directa e indirecta', 'Condicionales y contraejemplos'], 1],
  ['euc-elementos', 'Puntos, Rectas y Ángulos', ['Puntos, rectas y segmentos', 'Ángulos y su medida', 'Polígonos'], 2],
  ['euc-triangulo', 'Triángulos Congruentes', ['El triángulo y sus elementos', 'Criterios L-A-L, A-L-A y L-L-L', 'Desigualdades en el triángulo', 'L-A-A y triángulos rectángulos'], 3],
  ['euc-cuadrilateros', 'Paralelas y Cuadriláteros', ['Paralelas y perpendiculares', 'Ángulos entre paralelas y en polígonos', 'Paralelogramos y trapecios', 'Rectas y puntos notables'], 4],
  ['euc-circunferencia', 'La Circunferencia', ['Cuerdas, tangentes y posiciones relativas', 'Ángulo central e inscrito', 'Ángulos interiores, exteriores y semiinscritos'], 5],
  ['euc-metricas', 'Semejanza y Métricas', ['Segmentos proporcionales y Tales', 'Semejanza de triángulos', 'Pitágoras y el triángulo rectángulo', 'Potencia de un punto y polígonos regulares'], 6],
  ['euc-areas', 'Áreas de Figuras Planas', ['Áreas básicas', 'Relaciones entre áreas', 'Áreas sombreadas'], 7],
  ['euc-construcciones', 'Regla y Compás', ['Construcciones elementales', 'Lugares geométricos y construcción de triángulos'], 8],
];
const EUC = (() => {
  const KIND = 'Geometría';
  // Mundo con su evaluación: items = [[lección, nota de repaso, ejercicio]]; 1.5 minutos por pregunta.
  const mundo = (world, lessons, items) => {
    const fila = EUC_TEMARIO.find(t => t[0] === world), order = lessons.map(l => l.id);
    const exam = { id: `exam-${world}`, title: `Evaluación · ${fila[1]}`, minutes: 0, items: items.map(([lesson, review, ex]) => ({ lesson, review,
      ex: { ...ex, kind: ex.kind || KIND, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } })) };
    exam.items.sort((a, b) => order.indexOf(a.lesson) - order.indexOf(b.lesson));
    exam.minutes = Math.max(8, Math.ceil(exam.items.length * 1.5));
    EUC_HECHOS.push(world);
    return { world, title: fila[1], lessons, exam };
  };
  // Los mundos del temario que aún no están escritos.
  const pendientes = hechos => EUC_TEMARIO.filter(([w]) => !hechos.some(u => u.world === w)).map(([world, title, lessons]) => ({ world, title, lessons }));
  return { ...ICF, mundo, pendientes, KIND };
})();
;
//#archivo js/courses/euclidiana-demostrar.js
// Geometría Euclidiana · mundo 1 «euc-demostrar» (spec 2026-11-26-curso-euclidiana). Enunciados, números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;
  const TESIS = 'Esa es la tesis: no se marca como dato, es lo que hay que demostrar.';

  const l1 = leccion('euc-demostrar-1', 'Hipótesis, tesis y razones', guion(
    ['Medir o demostrar', 'Medir muchos casos solo deja sospechar. La geometría deductiva razona una vez y vale para todos los casos.'],
    ['Los ladrillos', 'Punto, recta y plano no se definen. Con ellos se escriben las definiciones; los postulados se aceptan sin demostrar.'],
    ['Teorema', 'Un teorema se demuestra con definiciones, postulados y teoremas anteriores. Un corolario sale enseguida de un teorema.'],
    ['Hipótesis y tesis', 'En «si…, entonces…», lo que se da es la hipótesis y lo que hay que demostrar es la tesis.'],
    ['Afirmación y razón', 'Cada afirmación de una demostración lleva su razón al lado. «Se ve en el dibujo» no es una razón.']), [
    x('toca-hipotesis', 'Teorema: «Si OB es bisectriz del $\\angle AOC$ y el $\\angle AOC$ es recto, entonces el $\\angle AOB$ mide $45^\\circ$». Toca **todo** lo que es **hipótesis**.',
      { fig: { t: 'rayos', r: [['A', 0], ['B', 45], ['C', 90]], ig: [[0, 1, 'fa'], [1, 2, 'fg']] }, casos: [{ t: 'OB es bisectriz del ∠AOC', si: true }, { t: '∠AOB mide 45°', no: 'Esa es la tesis: lo que hay que demostrar, no lo que se da.' }, { t: '∠AOC es recto', si: true }, { t: 'OA y OC miden lo mismo', no: 'Eso no lo dice el enunciado: el dibujo no es un dato.' }],
        falta: 'Falta otro dato: la hipótesis es todo lo que va entre el «si» y el «entonces».', ok: 'La hipótesis es lo que se da; la tesis, lo que hay que demostrar.' },
      'Lo que va entre «si» y «entonces» es la hipótesis: la bisectriz y el ángulo recto. Los $45^\\circ$ son la tesis.', 'Parte la frase en dos: lo que va después de «si» y lo que va después de «entonces».'),
    x('marca-dato', 'Hipótesis: $AB \\cong CD$. Tesis: $AC \\cong BD$. Toca en la figura **solo** los segmentos que la hipótesis da como congruentes.',
      { t: 'seg', n: 'ABCD', pos: [0, 5, 9, 14], si: [0, 2], no: { 1: 'BC no aparece en la hipótesis: nadie dijo con quién es congruente.', 3: TESIS, 4: TESIS }, falta: 'Falta uno: la hipótesis nombra dos segmentos.', ok: 'En la figura se marca lo que se da, nunca lo que se quiere probar.', texto: 'AB y CD' },
      'La hipótesis solo habla de AB y CD. Que AC y BD sean congruentes es la tesis: todavía no se sabe.', 'Lee la hipótesis letra por letra: ¿cuáles dos segmentos nombra?'),
    x('clasifica-enunciado', 'Cada renglón es un ladrillo de la geometría. Ponle a cada uno su **nombre**.',
      { et: ['«Recta»: todos saben qué es,|nadie la define', 'Bisectriz: rayo que parte un|ángulo en dos congruentes', 'Por dos puntos distintos|pasa una sola recta', 'Los ángulos opuestos por el|vértice son congruentes'], metas: ['primitivo', 'definición', 'postulado', 'teorema'], fichas: ['primitivo', 'definición', 'postulado', 'teorema', 'corolario', 'hipótesis'],
        mira: ['No se define: es un punto de partida que todos entienden.', 'Dice qué significa una palabra nueva usando otras ya conocidas.', 'Se acepta sin demostración: es una regla del juego.', 'Se demuestra a partir de postulados y definiciones.'],
        trampas: { '2:teorema': 'Un teorema se demuestra; esto se acepta sin demostración.', '3:postulado': 'Esto sí se demuestra, con el par lineal: no hace falta aceptarlo sin más.', '1:postulado': 'No afirma un hecho: explica qué quiere decir «bisectriz».' }, ok: 'Primitivos y definiciones dan las palabras; postulados y teoremas, las verdades.' },
      'Recta es término primitivo; la bisectriz se define; que por dos puntos pase una sola recta se acepta; lo de los opuestos por el vértice se demuestra.', 'Pregúntate: ¿explica una palabra, se acepta sin más o hay que demostrarlo?'),
    x('arma-hipotesis', 'Arma la figura de esta hipótesis: «**M** es el punto medio de AB y **N** es el punto medio de AM». El segmento AB mide 12.',
      { L: 12, m: 6, n: 3, mira: ['M debe partir a AB en dos partes iguales: cuenta las rayitas a cada lado.', 'M quedó bien. Ahora N debe partir a AM, no a AB ni a MB, en dos partes iguales.'], ok: 'AM = MB = 6 y AN = NM = 3: la figura dice lo mismo que la hipótesis.' },
      'El punto medio parte en dos congruentes: $AM = 12 \\div 2 = 6$ y $AN = 6 \\div 2 = 3$.', 'Primero ubica M contando rayitas; después mira solo el trozo AM.'),
    x('razon-de-paso', 'Demostración de «si M es el punto medio de AB, entonces $AB = 2 \\cdot AM$». Pon la **razón** de cada afirmación.',
      { fig: { t: 'recta', L: 10, pts: [['A', 0], ['M', 5], ['B', 10]], ig: [[0, 1], [1, 2]] }, et: ['1. M es punto medio de AB', '2. AM = MB', '3. AM + MB = AB', '4. AM + AM = AB'], metas: ['hipótesis', 'def. punto medio', 'suma de segmentos', 'sustitución'], fichas: ['hipótesis', 'def. punto medio', 'suma de segmentos', 'sustitución', 'tesis', 'se ve en la figura'],
        mira: ['Es lo que el enunciado da: se copia tal cual.', 'Sale de lo que significa «punto medio».', 'Los dos trozos juntos arman el segmento entero.', 'En el paso 3 se cambió MB por su igual, AM.'],
        trampas: { '0:tesis': 'La tesis es lo que se quiere probar: va al final, no al comienzo.', '1:se ve en la figura': 'El dibujo no es una razón: di qué definición lo garantiza.', '3:suma de segmentos': 'La suma ya se usó en el paso 3; aquí solo se cambió MB por AM.' }, ok: 'Cada afirmación con su razón: dato, definición, postulado y propiedad.' },
      'Dato, definición de punto medio, suma de segmentos y sustitución: así $AM + AM = AB$, es decir, $AB = 2 \\cdot AM$.', 'Pregúntate de dónde sale cada renglón: ¿me lo dieron, lo dice una definición o cambié algo por su igual?'),
    x('razon-vale', 'Dos rectas se cortan y en una demostración escribes «$\\angle 1 \\cong \\angle 3$». Toca **todas** las razones que **sí** valen para ponerle al lado.',
      { fig: { t: 'cruce', a: 60 }, casos: [{ t: 'Teorema: opuestos por el vértice', si: true }, { t: 'En el dibujo se ven iguales', no: 'Un dibujo puede engañar: lo que «se ve» no es una razón.' }, { t: 'Lo medí con el transportador', no: 'Medir es geometría experimental: sirve para sospechar, no para demostrar.' }, { t: 'La hipótesis lo dice', si: true }, { t: 'Es lo que quiero demostrar', no: 'Usar la tesis como razón es dar vueltas en círculo.' }],
        falta: 'Falta una: lo que se da y lo ya demostrado también son razones.', ok: 'Valen los datos, las definiciones, los postulados y los teoremas ya demostrados.' },
      'Una razón es un dato, una definición, un postulado o un teorema ya demostrado. Ver, medir o repetir la tesis no demuestra nada.', 'Piensa si esa razón convencería a alguien que no puede ver tu dibujo ni tu transportador.'),
    x('cinta-deduce', 'Deduce el largo que falta y lanza la cinta desde el primer punto. Puedes fallar **una** vez.', { tiros: [
      { q: '**M** es el punto medio de AB y $AB = 26$. ¿Cuánto mide **AM**?', pts: [['A', 0], ['M', 13], ['B', 26]], ig: [[0, 1], [1, 2]], da: [[0, 2, '26', 1]], x: [0, 1, 0], r: 13, c: '26 \\div 2', e: { 26: 'Ese es todo AB: el punto medio lo parte en dos.' } },
      { q: 'B está entre A y C, $AC = 27$ y $BC = 12$. ¿Cuánto mide **AB**?', pts: [['A', 0], ['B', 15], ['C', 27]], da: [[1, 2, '12', 0], [0, 2, '27', 1]], x: [0, 1, 0], r: 15, c: '27 - 12', e: { 39: 'Sumaste: AB es una parte de AC, no puede ser más largo.' } },
      { q: '$AB \\cong CD$, $AB = 8$ y $BC = 6$. ¿Cuánto mide **AD**?', pts: [['A', 0], ['B', 8], ['C', 14], ['D', 22]], ig: [[0, 1], [2, 3]], da: [[0, 1, '8', 0], [1, 2, '6', 0]], x: [0, 3, 1], r: 22, c: '8 + 6 + 8', e: { 14: 'Falta CD: es congruente con AB, también mide 8.', 16: 'Dejaste por fuera a BC.' } }] },
      '$26 \\div 2 = 13$ (definición de punto medio); $27 - 12 = 15$ (suma de segmentos); $8 + 6 + 8 = 22$ (segmentos congruentes miden igual).', 'Antes de lanzar, di qué definición o postulado te deja hacer la cuenta.'),
    sol('En la figura, B está entre A y C, $AB = 9$ y $AC = 21$. Completa la demostración de que $BC = 12$, con la razón de cada paso.',
      ['$AB + BC = AC$, por la [[suma de segmentos]]', '$AB = 9$ y $AC = 21$, por [[hipótesis]]', '$9 + BC = 21$, por [[sustitución]]', '$BC = 21 - 9 =$ [[12]]'], ['tesis', '30', 'se ve en la figura'],
      'B entre A y C da $AB + BC = AC$; con los datos, $9 + BC = 21$ y $BC = 12$.', 'Cada renglón necesita su porqué: ¿es un dato, un postulado o un cambio de iguales por iguales?'),
    err('Se quiere demostrar: «si OB es bisectriz del $\\angle AOC$, entonces el $\\angle AOC$ mide el doble del $\\angle AOB$». Una de las razones está mal.',
      ['OB es bisectriz del $\\angle AOC$ (hipótesis)', '$\\angle AOB \\cong \\angle BOC$ (se ve en la figura)', '$\\angle AOB + \\angle BOC = \\angle AOC$ (suma de ángulos)', '$\\angle AOC = 2 \\cdot \\angle AOB$ (sustitución)'], 1,
      ['$\\angle AOB \\cong \\angle BOC$ (definición de bisectriz)', '$\\angle AOB \\cong \\angle BOC$ (es la tesis)', '$\\angle AOB \\cong \\angle BOC$ (lo medí con transportador)'],
      'La bisectriz, por definición, parte el ángulo en dos congruentes. «Se ve en la figura» no es una razón.', 'Busca la razón que no es ni dato, ni definición, ni postulado, ni teorema.'),
    opc('En el teorema «si dos ángulos son opuestos por el vértice, entonces son congruentes», la tesis es:', ['que los ángulos son opuestos por el vértice', 'que las rectas se cortan', 'que los ángulos son congruentes', 'que los ángulos suman $180^\\circ$'], 2,
      'La tesis es lo que va después del «entonces»: lo que hay que demostrar.', 'La hipótesis va después del «si»; la tesis, después del «entonces».'),
  ]);

  const l2 = leccion('euc-demostrar-2', 'Demostración directa e indirecta', guion(
    ['Razones de la igualdad', 'Reflexiva: a = a. Simétrica: se lee al revés. Transitiva: se encadena. Aditiva: se suma lo mismo. Sustitución: se cambia por su igual.'],
    ['Reglas de inferencia', 'Modus ponens: de «si p, entonces q» y p sale q. Modus tollens: si q falla, p también. Silogismo: las flechas se encadenan.'],
    ['Lo que no vale', 'De «si p, entonces q» y q no se saca p: un rectángulo tiene cuatro ángulos rectos y no es cuadrado.'],
    ['Directa', 'Se parte de la hipótesis y, paso a paso, cada uno con su razón, se llega a la tesis.'],
    ['Indirecta', 'Se supone lo contrario de la tesis, se llega a una contradicción y por eso la tesis es cierta: reducción al absurdo.']), [
    x('propiedad-igualdad', 'A, B, C y D están en una recta. ¿Qué **propiedad de la igualdad** justifica cada renglón?',
      { fig: { t: 'recta', L: 13, pts: [['A', 0], ['B', 4], ['C', 9], ['D', 13]] }, et: ['BC = BC', 'Si AB = CD,|entonces CD = AB', 'Si AB = CD y CD = 4,|entonces AB = 4', 'Si AB = CD, entonces|AB + BC = CD + BC'], metas: ['reflexiva', 'simétrica', 'transitiva', 'aditiva'], fichas: ['reflexiva', 'simétrica', 'transitiva', 'aditiva', 'hipótesis', 'definición'],
        mira: ['Una medida comparada consigo misma.', 'La misma igualdad, leída al revés.', 'Dos igualdades con un término en común se encadenan.', 'A los dos lados se les sumó el mismo trozo.'],
        trampas: { '1:reflexiva': 'Reflexiva es una cosa igual a sí misma; aquí la igualdad se volteó.', '2:simétrica': 'No se volteó nada: se encadenaron dos igualdades.', '3:transitiva': 'No se encadenó nada: se sumó BC a los dos lados.' }, ok: 'Reflexiva, simétrica, transitiva y aditiva: las razones de las cuentas.' },
      'Igual a sí mismo: reflexiva. Leída al revés: simétrica. Encadenada con otra: transitiva. Sumando lo mismo a los dos lados: aditiva.', 'Mira qué le pasó a la igualdad: ¿se volteó, se encadenó con otra o se le sumó algo?'),
    x('afirmacion-de-paso', 'Dos rectas se cortan. Demuestra que $\\angle 1 \\cong \\angle 3$: las razones ya están; pon la **afirmación** de cada paso.',
      { fig: { t: 'cruce', a: 55 }, et: ['1. ∠1 y ∠2: par lineal', '2. ∠3 y ∠2: par lineal', '3. transitiva (1 y 2)', '4. se resta ∠2'], metas: ['∠1 + ∠2 = 180°', '∠3 + ∠2 = 180°', '∠1 + ∠2 = ∠3 + ∠2', '∠1 = ∠3'], fichas: ['∠1 + ∠2 = 180°', '∠3 + ∠2 = 180°', '∠1 + ∠2 = ∠3 + ∠2', '∠1 = ∠3', '∠1 + ∠3 = 180°', '∠1 = ∠2'],
        mira: ['Un par lineal suma 180°: escribe la suma de ∠1 y ∠2.', 'El otro par lineal: ∠3 con ∠2.', 'Las dos sumas valen 180°: iguálalas.', 'Al quitar ∠2 de los dos lados queda la tesis.'],
        trampas: { '0:∠1 + ∠3 = 180°': '∠1 y ∠3 no son vecinos: no forman par lineal.', '1:∠1 + ∠3 = 180°': '∠1 y ∠3 no son vecinos: no forman par lineal.', '3:∠1 = ∠2': 'Eso solo pasa si las rectas son perpendiculares. La tesis habla de ∠1 y ∠3.', '2:∠1 = ∠3': 'Esa es la tesis: va al final, después de igualar las dos sumas.' }, ok: 'De la hipótesis a la tesis, cada paso con su razón: demostración directa.' },
      'Los dos pares lineales suman $180^\\circ$; por transitiva las sumas son iguales, y al restar $\\angle 2$ queda $\\angle 1 = \\angle 3$.', 'Lee cada razón y escribe lo que esa razón permite afirmar, ni más ni menos.'),
    x('conclusion-valida', 'Se sabe: «**si un cuadrilátero es un cuadrado, entonces tiene cuatro ángulos rectos**». Toca **todas** las conclusiones que salen **seguras**.',
      { cartas: [{ f: 'cuadrado', t: 'Es cuadrado: luego|tiene 4 ángulos rectos', si: true }, { f: 'rect', t: 'Tiene 4 rectos:|luego es cuadrado', no: 'Que se cumpla la segunda parte no devuelve la primera: este rectángulo tiene 4 rectos y no es cuadrado.' }, { f: 'rombo', t: 'No tiene 4 rectos:|luego no es cuadrado', si: true }, { f: 'rectAlto', t: 'No es cuadrado: luego|no tiene 4 rectos', no: 'Negar la primera parte no niega la segunda: esta figura no es cuadrado y sí tiene 4 rectos.' }],
        falta: 'Falta una: hay dos reglas seguras, el modus ponens y el modus tollens.', ok: 'Modus ponens: se da p y sale q. Modus tollens: falla q y cae p.', texto: 'la del cuadrado (modus ponens) y la del rombo (modus tollens)' },
      'Si se cumple la primera parte, sale la segunda (ponens); si falla la segunda, falla la primera (tollens). Las otras dos son falacias.', 'Para cada tarjeta busca si podría existir una figura que la contradiga.'),
    x('regla-usada', 'Los tres razonamientos son correctos. Ponle a cada uno su regla: modus **ponens**, modus **tollens** o **silogismo**.',
      { et: ['Si es cuadrado, es rombo.|Es cuadrado; luego es rombo.', 'Si es cuadrado, es rombo.|No es rombo; no es cuadrado.', 'Si es cuadrado, es rombo.|Si es rombo, tiene 4 lados iguales.|Luego: cuadrado, 4 lados iguales.'], metas: ['ponens', 'tollens', 'silogismo'], fichas: ['ponens', 'tollens', 'silogismo', 'recíproco', 'simétrica'],
        mira: ['Se afirma la primera parte y sale la segunda.', 'Se niega la segunda parte y cae la primera.', 'Dos condicionales se encadenan en uno solo.'],
        trampas: { '0:tollens': 'Aquí nada se niega: se afirma la primera parte.', '1:ponens': 'Aquí se niega la segunda parte: es la regla que quita.', '2:recíproco': 'No se volteó ninguna frase: se encadenaron dos.' }, ok: 'Ponens afirma, tollens niega y el silogismo encadena.' },
      'Afirmar la primera parte es modus ponens; negar la segunda, modus tollens; encadenar dos condicionales, silogismo.', 'Fíjate en el segundo renglón: ¿afirma algo, niega algo o es otro «si… entonces…»?'),
    x('absurdo-pasos', 'Demuestra por **reducción al absurdo**: «si $\\angle 1$ y $\\angle 2$ forman par lineal y $\\angle 1$ es agudo, entonces $\\angle 2$ es obtuso».',
      { fig: { t: 'par', a: 50 }, et: ['Supongo:', 'Entonces:', 'Pero:', 'Luego:'], metas: ['∠2 no es obtuso', '∠1 + ∠2 es menor que 180°', 'un par lineal suma 180°', '∠2 es obtuso'], fichas: ['∠2 no es obtuso', '∠1 + ∠2 es menor que 180°', 'un par lineal suma 180°', '∠2 es obtuso', '∠1 no es agudo', '∠1 + ∠2 es mayor que 180°'],
        mira: ['Se empieza negando la tesis, no la hipótesis.', 'Un agudo más otro que no pasa de 90° no llegan a 180°.', 'La contradicción choca con algo que ya se sabía: el par lineal.', 'Lo supuesto era imposible: queda la tesis.'],
        trampas: { '0:∠1 no es agudo': 'Eso niega la hipótesis. En el absurdo se niega la tesis.', '0:∠2 es obtuso': 'Esa es la tesis: en el absurdo se supone lo contrario.', '1:∠1 + ∠2 es mayor que 180°': 'Menos de 90° más 90° o menos: la suma queda por debajo de 180°.' }, ok: 'Negar la tesis, llegar a un absurdo y concluir la tesis.' },
      'Si $\\angle 2$ no fuera obtuso, mediría $90^\\circ$ o menos; con $\\angle 1$ agudo no llegarían a $180^\\circ$, y un par lineal suma $180^\\circ$: absurdo.', 'El primer paso de una demostración indirecta siempre es el mismo: suponer que la tesis es falsa.'),
    x('cadena-flechas', 'Demuestra que «si ABCD es un cuadrado, entonces sus ángulos suman $360^\\circ$»: ordena la cadena para que cada afirmación salga de la de arriba.',
      { metas: ['ABCD es un cuadrado', 'ABCD es un rectángulo', 'tiene 4 ángulos rectos', 'sus ángulos suman 360°'], fichas: ['ABCD es un cuadrado', 'ABCD es un rectángulo', 'tiene 4 ángulos rectos', 'sus ángulos suman 360°', 'ABCD es un rombo'],
        mira: ['Arriba va la hipótesis: ser cuadrado.', 'De ser cuadrado sale ser rectángulo, y no al revés.', 'Ser rectángulo es tener los cuatro ángulos rectos.', 'Cuatro rectos suman 360°: esa es la tesis, al final.'],
        trampas: { '1:ABCD es un rombo': 'Un cuadrado sí es rombo, pero de «rombo» no sale «rectángulo»: la cadena se rompe.', '0:sus ángulos suman 360°': 'Eso es lo último que se deduce: la cadena está al revés.' }, ok: 'Cada flecha es un «si… entonces…»: encadenadas llevan de la hipótesis a la tesis.' },
      'Cuadrado, luego rectángulo, luego cuatro rectos, luego $4 \\cdot 90^\\circ = 360^\\circ$: tres condicionales encadenados por silogismo.', 'Empieza por la hipótesis y pregúntate qué se puede afirmar enseguida a partir de ella.'),
    x('vecinos-razon', '$\\angle 1$ y $\\angle 2$ forman par lineal, y la hipótesis dice que el de la derecha mide **5 veces** el dorado. Gira el rayo hasta que la figura cumpla las dos cosas.', { k: 5 },
      'Par lineal: $x + 5x = 180^\\circ$, por sustitución. Entonces $x = 30^\\circ$ y el otro mide $150^\\circ$.', 'Escribe la suma del par lineal y cambia un ángulo por «5 veces el otro».'),
    x('lanza-angulo', 'Deduce cada ángulo por pasos y lánzalo. Puedes fallar **una** vez.', { tiros: [
      { q: '$\\angle 1$ y $\\angle 2$ forman par lineal; $\\angle 2$ y $\\angle 3$ son opuestos por el vértice. Si $\\angle 1 = 125^\\circ$, lanza $\\angle 3$', r: 55, c: '180^\\circ - 125^\\circ', e: { 125: 'El 3 es opuesto al 2, no al 1: primero halla el 2 con el par lineal.' } },
      { q: '$\\angle A$ y $\\angle B$ son complementarios, y $\\angle B \\cong \\angle C$. Si $\\angle C = 25^\\circ$, lanza $\\angle A$', r: 65, c: '90^\\circ - 25^\\circ', e: { 155: 'Complementarios suman 90°, no 180°.', 25: 'Ese es el ángulo B, por sustitución. Falta su complemento.' } },
      { q: 'OB es bisectriz del $\\angle AOC$, y el $\\angle AOC$ forma par lineal con un ángulo de $40^\\circ$. Lanza $\\angle AOB$', r: 70, c: '(180^\\circ - 40^\\circ) \\div 2', e: { 140: 'Ese es todo el ángulo AOC: la bisectriz lo parte en dos.', 20: 'La bisectriz parte al ángulo AOC, no al de 40°.' } }] },
      '$180 - 125 = 55$ y su opuesto mide igual; $90 - 25 = 65$; $(180 - 40) \\div 2 = 70$.', 'Ve de a un paso: nombra la razón (par lineal, opuestos, definición) antes de hacer la cuenta.'),
    sol('Completa la demostración directa: «si $\\angle 1$ y $\\angle 2$ son complementarios, y $\\angle 3$ y $\\angle 2$ también, entonces $\\angle 1 \\cong \\angle 3$».',
      ['$\\angle 1 + \\angle 2 = 90^\\circ$, por definición de [[complementarios]]', '$\\angle 3 + \\angle 2 = 90^\\circ$, por la misma [[definición]]', '$\\angle 1 + \\angle 2 = \\angle 3 + \\angle 2$, por la propiedad [[transitiva]]', 'Se resta $\\angle 2$ a los dos lados y queda $\\angle 1 =$ [[∠3]]'], ['suplementarios', 'reflexiva', '∠2'],
      'Las dos sumas valen $90^\\circ$, así que son iguales entre sí; al quitar $\\angle 2$ queda $\\angle 1 = \\angle 3$.', 'Dos cosas iguales a una tercera son iguales entre sí: ¿cómo se llama esa propiedad?'),
    err('Regla: «si un punto es el punto medio de AB, entonces está entre A y B». Se sabe que P está entre A y B. ¿Dónde falla este razonamiento?',
      ['Regla: si es el punto medio de AB, entonces está entre A y B', 'Dato: P está entre A y B', 'Conclusión: P es el punto medio de AB'], 2,
      ['Conclusión: no se puede asegurar que P sea el punto medio', 'Conclusión: P no es el punto medio de AB', 'Conclusión: P no está entre A y B'],
      'Que se cumpla la segunda parte no devuelve la primera: hay muchos puntos entre A y B que no son el punto medio.', 'El modus ponens necesita que se cumpla la primera parte de la regla, no la segunda.'),
    opc('Para demostrar por reducción al absurdo que «si M es el punto medio de AB, entonces AM es menor que AB», el primer paso es suponer que:', ['AM es mayor o igual que AB', 'M no es el punto medio de AB', 'AM es menor que AB', 'M no está en la recta AB'], 0,
      'En el absurdo se niega la tesis (AM menor que AB) y se conserva la hipótesis.', 'Se supone lo contrario de lo que va después del «entonces».'),
  ]);

  const l3 = leccion('euc-demostrar-3', 'Condicionales y contraejemplos', guion(
    ['Suficiente', 'En «si p, entonces q», p es condición suficiente para q: con p basta.'],
    ['Necesaria', 'Y q es condición necesaria para p: sin q, p no puede darse. Necesaria no quiere decir suficiente.'],
    ['Recíproco y contrario', 'El recíproco voltea la frase; el contrario niega sus dos partes. Ninguno de los dos queda garantizado por la frase original.'],
    ['Contrarrecíproco', 'Voltear y negar a la vez da el contrarrecíproco, que siempre vale lo mismo que la frase original.'],
    ['Contraejemplo', 'Para refutar «si p, entonces q» basta un caso que cumpla p y no cumpla q.']), [
    x('suficiente-necesaria', 'En cada renglón, ¿la primera condición es **suficiente**, **necesaria** o **las dos** cosas para la segunda?',
      { et: ['Ser el punto medio de AB,|para estar entre A y B', 'Tener 4 lados iguales,|para ser un cuadrado', 'Medir 90°,|para ser un ángulo recto', 'Ser opuestos por el vértice,|para ser congruentes'], metas: ['suficiente', 'necesaria', 'las dos', 'suficiente'], fichas: ['suficiente', 'suficiente', 'necesaria', 'las dos', 'necesaria', 'ninguna'],
        mira: ['Todo punto medio está entre A y B, pero hay otros puntos entre A y B.', 'Sin 4 lados iguales no hay cuadrado; con ellos puede ser solo un rombo.', 'Es la definición: vale en los dos sentidos.', 'Ser opuestos por el vértice garantiza ser congruentes; hay congruentes que no son opuestos.'],
        trampas: { '1:suficiente': 'No basta: un rombo tiene 4 lados iguales y no es cuadrado.', '0:necesaria': 'No hace falta ser el punto medio para estar entre A y B.', '3:las dos': 'Dos ángulos de 30° en figuras distintas son congruentes y no son opuestos por el vértice.' }, ok: 'Suficiente: con eso basta. Necesaria: sin eso no se puede.' },
      'Punto medio y opuestos por el vértice bastan (suficientes); los 4 lados iguales hacen falta pero no bastan (necesaria); medir $90^\\circ$ es la definición de recto (las dos).', 'Hazte dos preguntas: ¿con eso basta? ¿Sin eso se puede?'),
    x('voltea-niega', 'Arma el **contrarrecíproco** de «si dos ángulos forman par lineal, entonces son suplementarios».',
      { frase: '«si forman par lineal, son suplementarios»', metas: ['no son suplementarios', 'no forman par lineal'], fichas: ['no son suplementarios', 'no forman par lineal', 'son suplementarios', 'forman par lineal'], mira: ['El contrarrecíproco empieza negando la segunda parte.', 'Y termina negando la primera parte.'],
        trampas: { '0:no forman par lineal': 'Ese es el contrario: negaste, pero falta voltear.', '0:son suplementarios': 'Ese es el recíproco: volteaste, pero falta negar.', '1:forman par lineal': 'Falta negar la primera parte.' }, ok: 'Voltear y negar: dice lo mismo que la frase original.' },
      'Se voltea y se niega: «si no son suplementarios, entonces no forman par lineal». Vale lo mismo que la frase original.', 'Haz dos cosas a la vez: cambia de lugar las dos partes y ponles «no».'),
    x('mismo-condicional', '«**Si dos ángulos son opuestos por el vértice, entonces son congruentes**». Toca **todas** las frases que dicen **lo mismo**.',
      { casos: [{ t: 'si no son congruentes, no son opuestos', si: true }, { t: 'si son congruentes, son opuestos', no: 'Ese es el recíproco, y es falso: hay ángulos congruentes en figuras distintas.' }, { t: 'ser opuestos basta para ser congruentes', si: true }, { t: 'si no son opuestos, no son congruentes', no: 'Ese es el contrario: equivale al recíproco, no a la frase original.' }, { t: 'sin ser congruentes no pueden ser opuestos', si: true }],
        falta: 'Falta otra: el contrarrecíproco y las formas de decir «basta» o «hace falta» dicen lo mismo.', ok: 'El contrarrecíproco equivale; el recíproco y el contrario, no.' },
      'Dicen lo mismo el contrarrecíproco, «basta ser opuestos» (suficiente) y «sin ser congruentes no se puede» (necesaria). El recíproco y el contrario dicen otra cosa.', 'Para cada frase busca un par de ángulos que la cumpla o la rompa sin romper la original.'),
    x('caza-contraejemplo', '«**Si un cuadrilátero tiene cuatro ángulos rectos, entonces es un cuadrado**». Toca **todas** las figuras que son **contraejemplo**.',
      { cartas: [{ f: 'cuadrado', n: 'cuadrado', no: 'El cuadrado cumple la hipótesis y también la conclusión: confirma la frase, no la tumba.' }, { f: 'rect', n: 'rectángulo ancho', si: true }, { f: 'rombo', n: 'rombo', no: 'El rombo no tiene ángulos rectos: no cumple la hipótesis, la frase no habla de él.' }, { f: 'trapRect', n: 'trapecio con dos ángulos rectos', no: 'Solo tiene dos ángulos rectos: no cumple la hipótesis.' }, { f: 'rectAlto', n: 'rectángulo alto', si: true }, { f: 'romboide', n: 'paralelogramo inclinado', no: 'No tiene ángulos rectos: no cumple la hipótesis.' }],
        falta: 'Falta otro: todo rectángulo que no sea cuadrado sirve.', ok: 'Cuatro ángulos rectos y lados distintos: cumplen la hipótesis y fallan la conclusión.', texto: 'los dos rectángulos que no son cuadrados' },
      'Un contraejemplo cumple la hipótesis (cuatro ángulos rectos) y falla la conclusión (no es cuadrado): los dos rectángulos alargados.', 'Descarta primero las figuras que no cumplen lo que va después del «si».'),
    x('rombo-no-cuadrado', 'Refuta: «**si un cuadrilátero tiene sus cuatro lados iguales, entonces es un cuadrado**». El lado AB mide 5. Mueve D hasta fabricar un **contraejemplo**.', { L: 5 },
      'Con $AD = 5$ los cuatro lados son iguales (hipótesis cumplida); con el ángulo distinto de $90^\\circ$ no es cuadrado (conclusión fallida): es un rombo.', 'Un contraejemplo cumple todo lo que va después del «si» y falla lo que va después del «entonces».'),
    x('equidista-fuera', 'Refuta: «**si $AM = MB$, entonces M es el punto medio del segmento AB**». Mueve M hasta fabricar un **contraejemplo**.', { d: 3 },
      'Un punto justo encima del centro de AB está a la misma distancia de A y de B, pero no está en el segmento: no es su punto medio.', 'Busca un punto que quede igual de lejos de A y de B sin estar sobre el segmento.'),
    x('abanico-refuta', 'Lanza el ángulo que sirve de **contraejemplo** de cada frase. Puedes fallar **una** vez.', { tiros: [
      { q: '«Si un ángulo es agudo, entonces **no** es congruente con su complemento»', base: 90, r: 45, c: '45^\\circ = 90^\\circ - 45^\\circ', e: { 30: 'El complemento de 30° mide 60°: son distintos, así que 30° cumple la frase.', 60: 'El complemento de 60° mide 30°: son distintos, así que 60° cumple la frase.' } },
      { q: '«Si un ángulo mide el doble de su complemento, entonces es obtuso»', base: 90, r: 60, c: '60^\\circ = 2 \\cdot 30^\\circ \\text{ y no es obtuso}', e: { 30: 'Al revés: 30° es la mitad de su complemento, no el doble.', 45: 'Uno de 45° es igual a su complemento: no cumple la hipótesis.' } },
      { q: '«Si un ángulo mide el triple de su suplemento, entonces es recto»', base: 180, r: 135, c: '135^\\circ = 3 \\cdot 45^\\circ \\text{ y no es recto}', e: { 45: 'Al revés: 45° es la tercera parte de su suplemento.', 90: 'Un recto es igual a su suplemento, no su triple: no cumple la hipótesis.' } }] },
      '$45^\\circ$ es agudo e igual a su complemento; $60^\\circ = 2 \\cdot 30^\\circ$ y no es obtuso; $135^\\circ = 3 \\cdot 45^\\circ$ y no es recto.', 'Busca primero el ángulo que cumple la hipótesis; después mira si la conclusión le falla.'),
    sol('Frase: «si un triángulo es equilátero, entonces es isósceles». Completa con el nombre de cada pariente y con la figura que refuta al recíproco.',
      ['«Si es isósceles, entonces es equilátero» es el [[recíproco]]', '«Si no es isósceles, entonces no es equilátero» es el [[contrarrecíproco]]', '«Si no es equilátero, entonces no es isósceles» es el [[contrario]]', 'El recíproco se refuta con un triángulo isósceles que no sea [[equilátero]]'], ['negación', 'escaleno', 'corolario'],
      'Voltear da el recíproco; negar, el contrario; voltear y negar, el contrarrecíproco, que es el único equivalente a la frase.', 'Mira qué cambió: ¿el orden de las dos partes, los «no», o las dos cosas?'),
    err('Se quiere refutar: «si un cuadrilátero tiene cuatro lados iguales, entonces tiene cuatro ángulos rectos». Un paso está mal.',
      ['Un contraejemplo debe cumplir la hipótesis: cuatro lados iguales', 'Y debe fallar la conclusión: no tener cuatro ángulos rectos', 'Sirve un rectángulo de 3 por 5', 'Con un solo contraejemplo la frase queda refutada'], 2,
      ['Sirve un rombo con ángulos de $60^\\circ$ y $120^\\circ$', 'Sirve un cuadrado de lado 4', 'Sirve un triángulo equilátero'],
      'El rectángulo de 3 por 5 no cumple la hipótesis. El rombo sí: cuatro lados iguales y ningún ángulo recto.', 'Revisa si la figura propuesta cumple primero lo que va después del «si».'),
    opc('Que un cuadrilátero tenga sus cuatro ángulos rectos es, para que sea un cuadrado, una condición:', ['suficiente pero no necesaria', 'necesaria y suficiente', 'ni necesaria ni suficiente', 'necesaria pero no suficiente'], 3,
      'Sin cuatro ángulos rectos no hay cuadrado (necesaria), pero un rectángulo los tiene y no es cuadrado (no suficiente).', 'Pregunta dos cosas: ¿sin eso se puede? ¿Con eso basta?'),
  ]);

  return mundo('euc-demostrar', [l1, l2, l3], [
    ['euc-demostrar-1', 'En la figura se marca lo que da la hipótesis, nunca la tesis.', x('marca-dato', 'Hipótesis: $\\angle 1 \\cong \\angle 3$. Tesis: $\\angle AOC \\cong \\angle BOD$. Toca **solo** lo que la hipótesis da como congruente.',
      { t: 'ang', n: 'ABCD', g: [0, 40, 100, 140], si: [0, 2], no: { 1: 'El ángulo 2 no aparece en la hipótesis.', 3: TESIS, 4: TESIS }, falta: 'Falta uno: la hipótesis nombra dos ángulos.', ok: 'Se marca lo que se da: los ángulos 1 y 3.', texto: '∠1 y ∠3' },
      'La hipótesis solo nombra a los ángulos 1 y 3; lo de AOC y BOD es la tesis.', 'Lee la hipótesis: ¿cuáles dos ángulos nombra?')],
    ['euc-demostrar-1', 'Cada afirmación lleva su razón: dato, definición, postulado o teorema.', x('razon-de-paso', 'Demostración de «si $\\angle 1$ es complemento de $\\angle 2$ y $\\angle 2 \\cong \\angle 3$, entonces $\\angle 1$ es complemento de $\\angle 3$». Pon la **razón** de cada afirmación.',
      { et: ['1. ∠1 complemento de ∠2', '2. ∠1 + ∠2 = 90°', '3. ∠2 = ∠3', '4. ∠1 + ∠3 = 90°'], metas: ['hipótesis', 'definición', 'hipótesis', 'sustitución'], fichas: ['hipótesis', 'hipótesis', 'definición', 'sustitución', 'tesis', 'postulado'],
        mira: ['Es uno de los datos del enunciado.', 'Es lo que significa «complemento».', 'Es el otro dato del enunciado.', 'En el paso 2 se cambió ∠2 por su igual, ∠3.'], trampas: { '3:tesis': '«Tesis» no es una razón: di qué propiedad permite escribir ese renglón.' }, ok: 'Dos datos, una definición y una sustitución.' },
      'Los pasos 1 y 3 son datos; el 2 es la definición de complemento; en el 4 se sustituye ∠2 por ∠3.', 'Mira si el renglón está en el enunciado o si sale de un renglón anterior.')],
    ['euc-demostrar-1', 'Postulado: se acepta. Teorema: se demuestra. Definición: explica una palabra.', opc('Una afirmación que se acepta sin demostración y sirve de punto de partida para demostrar otras se llama:', ['teorema', 'postulado', 'corolario', 'definición'], 1,
      'El postulado se acepta sin demostrar; el teorema y el corolario se demuestran.', 'Piensa cuál de los cuatro no necesita demostración y afirma un hecho.')],
    ['euc-demostrar-2', 'Reducción al absurdo: negar la tesis y llegar a una contradicción.', x('absurdo-pasos', 'Demuestra por **reducción al absurdo**: «dos rectas distintas se cortan, a lo más, en un punto».',
      { et: ['Supongo:', 'Entonces:', 'Pero:', 'Luego:'], metas: ['se cortan en dos puntos', 'por P y Q pasan dos rectas', 'por dos puntos pasa una sola', 'se cortan a lo más en uno'], fichas: ['se cortan en dos puntos', 'por P y Q pasan dos rectas', 'por dos puntos pasa una sola', 'se cortan a lo más en uno', 'no se cortan', 'son paralelas'],
        mira: ['Se empieza negando la tesis: más de un punto de corte.', 'Con dos puntos de corte, P y Q, las dos rectas pasan por ambos.', 'La contradicción choca con un postulado.', 'Lo supuesto era imposible: queda la tesis.'], trampas: { '0:no se cortan': 'Eso no niega la tesis: «a lo más uno» incluye no cortarse.' }, ok: 'Negar la tesis, chocar con un postulado y concluir.' },
      'Si se cortaran en P y Q, por esos dos puntos pasarían dos rectas distintas: contradice el postulado.', 'Lo contrario de «a lo más un punto» es «dos puntos o más».')],
    ['euc-demostrar-2', 'Directa: de la hipótesis a la tesis, cada paso sale del anterior.', x('cadena-flechas', 'Demuestra que «si M es el punto medio de AB y AB mide 18, entonces AM mide 9»: ordena la cadena para que cada afirmación salga de la de arriba.',
      { fig: { t: 'recta', L: 18, pts: [['A', 0], ['M', 9], ['B', 18]] }, metas: ['M es el punto medio de AB', 'AM = MB', 'AM + AM = 18', 'AM = 9'], fichas: ['M es el punto medio de AB', 'AM = MB', 'AM + AM = 18', 'AM = 9', 'AM = 18'],
        mira: ['Arriba va la hipótesis.', 'De la definición de punto medio salen dos trozos iguales.', 'Los dos trozos arman el segmento de 18.', 'La tesis va al final.'], trampas: { '3:AM = 18': 'Todo AB mide 18; AM es la mitad.' }, ok: 'Hipótesis, definición, suma y tesis.' },
      'Punto medio, luego AM = MB, luego dos veces AM es 18, luego AM = 9.', 'Empieza por lo que el enunciado da y termina en lo que pide.')],
    ['euc-demostrar-2', 'Modus tollens: si falla la segunda parte, falla la primera.', opc('Se sabe que «si un triángulo es equilátero, entonces es isósceles» y que el triángulo T no es isósceles. Se concluye con seguridad que T:', ['es equilátero', 'tiene dos lados iguales', 'puede ser equilátero o no', 'no es equilátero'], 3,
      'Modus tollens: falla la segunda parte, así que falla la primera.', 'Si fuera equilátero, tendría que ser isósceles.')],
    ['euc-demostrar-3', 'Contraejemplo: cumple la hipótesis y falla la conclusión.', x('equidista-fuera', 'Refuta: «**si un punto M está a la misma distancia de A y de B, entonces M está en el segmento AB**». Mueve M hasta fabricar un **contraejemplo**.', { d: 2 },
      'Un punto encima del centro de AB está igual de lejos de A y de B, y no está en el segmento.', 'Busca un punto igual de lejos de los dos extremos, pero fuera del segmento.')],
    ['euc-demostrar-3', 'Un caso que no cumple la hipótesis no refuta nada.', x('caza-contraejemplo', '«**Si un triángulo tiene dos lados iguales, entonces tiene un ángulo recto**». Toca **todas** las figuras que son **contraejemplo**.',
      { cartas: [{ f: 'isoRect', n: 'isósceles con ángulo recto', no: 'Tiene dos lados iguales y un ángulo recto: cumple la frase, no la tumba.' }, { f: 'isosceles', n: 'isósceles alto', si: true }, { f: 'triRect', n: 'rectángulo de lados distintos', no: 'No tiene dos lados iguales: no cumple la hipótesis.' }, { f: 'isoAncho', n: 'isósceles ancho', si: true }, { f: 'escaleno', n: 'escaleno', no: 'No tiene dos lados iguales: la frase no habla de él.' }],
        falta: 'Falta otro triángulo con dos lados iguales y sin ángulo recto.', ok: 'Dos lados iguales y ningún ángulo recto.', texto: 'los dos isósceles sin ángulo recto' },
      'Sirven los que tienen dos lados iguales (hipótesis) y ningún ángulo recto (falla la conclusión).', 'Descarta primero los que no tienen dos lados iguales.')],
    ['euc-demostrar-3', 'El contrarrecíproco voltea y niega, y vale lo mismo que la frase.', opc('El contrarrecíproco de «si un punto es el punto medio de AB, entonces está entre A y B» es:', ['si un punto no está entre A y B, entonces no es el punto medio de AB', 'si un punto está entre A y B, entonces es el punto medio de AB', 'si un punto no es el punto medio de AB, entonces no está entre A y B', 'si un punto no está entre A y B, entonces es el punto medio de AB'], 0,
      'Se voltean las dos partes y se niegan las dos.', 'Cambia de lugar las dos partes y ponles «no» a ambas.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-elementos.js
// Geometría Euclidiana · mundo 2 «Puntos, Rectas y Ángulos» (spec 2026-11-26-curso-euclidiana). Enunciados, números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  const l1 = leccion('euc-elementos-1', 'Puntos, rectas y segmentos', guion(
    ['Dos puntos, una recta', 'Dos puntos diferentes determinan una recta, y tres puntos que no son colineales determinan un plano.'],
    ['Estar entre', 'De tres puntos de una recta, uno y solo uno está entre los otros dos. Con esa idea se definen el segmento, el rayo y la semirrecta.'],
    ['Medir y sumar', 'Si B está entre A y C, entonces AB + BC = AC. Para hallar un pedazo, se resta.'],
    ['Punto medio y congruencia', 'El punto medio parte al segmento en dos segmentos congruentes. Congruentes: de igual medida. Iguales: el mismo segmento.'],
    ['Contar rectas', 'Con n puntos, sin tres colineales, se determinan n(n − 1)/2 rectas.']), [
    x('nombra-figuras', 'Arrastra a cada dibujo su **nombre**. Fíjate en los extremos y en las flechas.', { filas: ['rayo', 'segmento', 'recta', 'semirrecta'], fichas: ['rayo', 'segmento', 'recta', 'semirrecta', 'semiplano', 'rayos opuestos'] },
      'El segmento tiene dos extremos; el rayo, un origen y sigue sin fin; la semirrecta es el rayo sin su origen, y la recta sigue hacia los dos lados.', 'Mira cuántos puntos sirven de extremo y si el punto del borde está relleno o hueco.'),
    x('orden-afirma', 'En una recta están A, B y C, con **B entre A y C**, $AB = 5$ y $BC = 8$. Toca **todas** las afirmaciones verdaderas.', { casos: [
      { t: 'A, B y C son colineales', si: true },
      { t: 'C está entre A y B', no: 'De tres puntos de una recta, solo uno está entre los otros dos, y aquí es B.' },
      { t: 'AC = 13', si: true },
      { t: 'AB ≅ BC', no: 'AB mide 5 y BC mide 8: no tienen la misma medida, así que no son congruentes.' },
      { t: 'El rayo BA y el rayo BC son opuestos', si: true },
      { t: 'B es el punto medio de AC', no: 'Para ser el punto medio, AB y BC tendrían que medir lo mismo.' }],
    falta: 'Falta alguna que también es verdadera.', ok: 'Colineales, AB + BC = AC y, desde B, dos rayos opuestos.' },
      'Estar entre exige estar en la misma recta; por la adición de segmentos, $AC = 5 + 8 = 13$, y desde B salen dos rayos opuestos, uno hacia A y otro hacia C.', 'Dibuja los tres puntos en orden sobre una recta y revisa cada frase contra el dibujo y las medidas.'),
    x('segmento-reparte', 'A, B y C son colineales, con B entre A y C, y $AC = 18$. Ubica B de modo que **BC mida el doble de AB**.', { ac: 18, k: 2 },
      'Como $AB + BC = AC$ y BC es el doble de AB, son tres partes iguales de 6: $AB = 6$ y $BC = 12$.', 'Si BC es el doble de AB, ¿en cuántas partes iguales queda repartido todo AC?'),
    x('tramos-suma', 'Los puntos A, B, C y D están en una recta, en ese orden, y $AD = 20$. Pon las medidas que faltan.', { tr: [7, null, 4], tot: 20, letras: 'ABCD', et: ['BC', 'AC', 'BD'], metas: ['9', '16', '13'], fichas: ['9', '16', '13', '11', '31', '20'],
      mira: ['A todo AD quítale AB y CD.', 'AC es AB más BC.', 'BD es BC más CD.'], trampas: { '0:11': 'Sumaste AB y CD: eso es lo que hay que quitarle a AD.', '0:31': 'BC es un pedazo de AD: no puede medir más que 20.', '1:20': 'Ese es AD: a AC le falta el tramo CD.' }, ok: 'Se resta para hallar un pedazo y se suma para juntar dos.' },
      'Sustracción: $BC = 20 - 7 - 4 = 9$. Adición: $AC = 7 + 9 = 16$ y $BD = 9 + 4 = 13$.', 'Empieza por el tramo desconocido: es lo que le queda a AD al quitar los otros dos.'),
    x('mitad-segmento', 'En la recta numérica, A está en $-5$ y B en $7$. Lleva M al **punto medio** de AB.', { a: -5, b: 7, min: -8, max: 8 },
      'AB mide $7 - (-5) = 12$ y su mitad es 6. A 6 de A está el 1: $AM = MB = 6$.', 'Halla primero cuánto mide AB restando las coordenadas; el punto medio queda a la mitad de esa medida de cada extremo.'),
    x('rectas-por-puntos', 'Entre estos puntos no hay tres colineales. ¿Cuántos puntos hacen falta para que determinen exactamente **28 rectas**?', { total: 28, max: 12 },
      'Con 8 puntos, de cada uno salen 7 rectas; como cada recta se cuenta desde sus dos puntos, son $\\tfrac{8 \\cdot 7}{2} = 28$.', 'Cada par de puntos determina una recta: cuenta las que salen de un punto y cuida de no contar la misma dos veces.'),
    x('sube-distancia', 'Sube el ascensor a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'B está entre A y C, $AB = 14$ y $AC = 41$. ¿Cuánto mide BC?', r: 27, c: '41 - 14', e: { 55: 'B está entre A y C: BC es un pedazo de AC, así que se resta.' } },
      { q: 'M es el punto medio de PQ y $PM = 19$. ¿Cuánto mide PQ?', r: 38, c: '2 \\cdot 19', e: { 19: 'Ese es PM: a PQ lo forman dos pedazos congruentes.' } },
      { q: '¿Cuántas rectas determinan **7** puntos si no hay tres colineales?', r: 21, c: '\\tfrac{7 \\cdot 6}{2}', e: { 42: 'Cada recta quedó contada dos veces.', 7: 'De cada punto salen 6 rectas, no una.' } }] },
      '$41 - 14 = 27$; $2 \\cdot 19 = 38$; $\\tfrac{7 \\cdot 6}{2} = 21$.', 'Un pedazo se halla restando; el punto medio deja dos partes congruentes; las rectas se cuentan por parejas de puntos.'),
    sol('A, B, C y D son colineales, en ese orden. B es el punto medio de AC, $AB = 9$ y $CD = 5$. ¿Cuánto mide AD?', ['B es punto medio de AC: $BC = AB =$ [[9]]', 'Adición de segmentos: $AC = 9 + 9 =$ [[18]]', 'Otra vez la adición: $AD = AC + CD =$ [[23]]'], ['14', '4', '45'],
      'El punto medio deja $BC = 9$; entonces $AC = 18$ y $AD = 18 + 5 = 23$.', 'El punto medio te da un segmento congruente con AB; después solo hay que sumar tramos.'),
    err('M es el punto medio de AB y N es el punto medio de MB. Si $AB = 24$, ¿cuánto mide AN?', ['$AM = MB = 12$, porque M es el punto medio de AB', '$MN = NB = 6$, porque N es el punto medio de MB', '$AN = AM - MN = 6$, porque N está entre A y M'], 2,
      ['$AN = AM + MN = 18$, porque M está entre A y N', '$AN = AB + NB = 30$, porque B está entre A y N', '$AN = AM = 12$, porque N coincide con M'],
      'N está en MB, así que el orden es A, M, N, B: M está entre A y N, y $AN = 12 + 6 = 18$.', 'Ubica los cuatro puntos en orden sobre la recta antes de decidir si se suma o se resta.'),
    opc('Dos segmentos AB y CD, dibujados en lugares distintos del plano, miden ambos 6 cm. Lo correcto es decir que:', ['son iguales, porque miden lo mismo', 'son congruentes, pero no iguales', 'no son congruentes ni iguales', 'son iguales, pero no congruentes'], 1,
      'Congruentes: tienen la misma medida. Iguales: coinciden en todos sus puntos, es decir, son el mismo segmento. Aquí son dos figuras distintas de igual medida.', 'Piensa en dos lápices del mismo largo: ¿son el mismo lápiz?'),
  ]);

  const l2 = leccion('euc-elementos-2', 'Ángulos y su medida', guion(
    ['Ángulo', 'Dos rayos con el mismo origen forman un ángulo: los rayos son sus lados y el origen, su vértice. Su medida va de 0° a 180°.'],
    ['Sumar y partir', 'Si P está en el interior del ángulo AOB, entonces ∠AOP + ∠POB = ∠AOB. La bisectriz lo parte en dos ángulos congruentes.'],
    ['Clases', 'Agudo: menos de 90°. Recto: 90°. Obtuso: entre 90° y 180°. Llano: 180°.'],
    ['Parejas', 'Complementarios suman 90° y suplementarios, 180°. Un par lineal es adyacente y suplementario. Los opuestos por el vértice son congruentes.'],
    ['Perpendiculares', 'Dos rectas perpendiculares forman cuatro ángulos rectos. La mediatriz de un segmento es la perpendicular por su punto medio.']), [
    x('clase-angulo', 'Sin dibujarlos, di de qué **clase** es cada ángulo.', { et: ['el complemento de 25°', 'el suplemento de 25°', 'la mitad de un llano', 'el doble de un recto'], metas: ['agudo', 'obtuso', 'recto', 'llano'], fichas: ['agudo', 'obtuso', 'recto', 'llano', 'agudo', 'obtuso'],
      mira: ['El complemento de 25° mide 65°: menos de 90°.', 'El suplemento de 25° mide 155°: está entre 90° y 180°.', 'La mitad de 180° es 90°.', 'Dos rectos son 180°: los lados quedan en línea.'], trampas: { '1:agudo': 'Ese sería el complemento. El suplemento completa 180°: mide 155°.' }, ok: '65° es agudo, 155° obtuso, 90° recto y 180° llano.' },
      'El complemento de $25^\\circ$ mide $65^\\circ$, agudo; el suplemento, $155^\\circ$, obtuso; la mitad de $180^\\circ$ es un recto y dos rectos hacen un llano.', 'Halla primero la medida de cada uno y compárala con 90° y con 180°.'),
    x('bisectriz-traza', 'El ángulo AOB mide $132^\\circ$. Mueve el rayo OP hasta que sea su **bisectriz**.', { a: 132, rot: 10 },
      'La bisectriz deja dos ángulos congruentes: $132^\\circ \\div 2 = 66^\\circ$ cada uno.', 'La bisectriz no deja un lado más abierto que el otro: las dos partes miden lo mismo.'),
    x('parte-angulo', 'El ángulo AOB mide $110^\\circ$ y P está en su interior. Mueve OP hasta que $\\angle AOP$ mida $30^\\circ$ **más** que $\\angle POB$.', { a: 110, dif: 30 },
      'Por la adición de ángulos las dos partes suman $110^\\circ$: quitando los $30^\\circ$ de ventaja quedan $80^\\circ$, 40 para cada una. Miden $70^\\circ$ y $40^\\circ$.', 'Las dos partes juntas dan el ángulo entero: quítale la ventaja y reparte lo que queda por igual.'),
    x('vecinos-razon', 'Un rayo forma con una recta un **par lineal**. Gíralo hasta que el ángulo de la derecha sea **5 veces** el dorado.', { k: 5 },
      'Un par lineal suma $180^\\circ$: son seis partes iguales de $30^\\circ$, una para el dorado y cinco, $150^\\circ$, para el otro.', 'Los dos ángulos de un par lineal son suplementarios: cuenta en cuántas partes iguales se reparte el llano.'),
    x('tres-parientes', 'Un ángulo mide $37^\\circ$. Pon su complemento, su suplemento y su opuesto por el vértice.', { a: 37, fichas: ['53°', '143°', '37°', '127°', '63°'] },
      'Complemento: $90^\\circ - 37^\\circ = 53^\\circ$. Suplemento: $180^\\circ - 37^\\circ = 143^\\circ$. El opuesto por el vértice es congruente: $37^\\circ$.', 'Uno completa un ángulo recto, otro completa un llano y el tercero no cambia de medida.'),
    x('angulos-toca', 'Cinco rayos salen del mismo punto. Toca **todos** los ángulos que forman un **par lineal** con el dorado.', { rayos: [0, 50, 180, 230, 300], de: 0, pide: 'par', falta: 'Hay uno que sí forma par lineal: comparte un lado y juntos hacen un llano.', ok: 'Lado común y los otros dos lados en rayos opuestos: juntos miden 180°.' },
      'Solo el ángulo 2: comparte un lado con el dorado y sus otros lados son rayos opuestos. El 5 también es adyacente, pero con el dorado no completa $180^\\circ$.', 'Busca un ángulo que comparta un lado con el dorado y cuyo otro lado siga en línea recta al otro lado del dorado.'),
    x('mediatriz-pasa', 'El segmento AB mide 10. Coloca la recta de modo que sea su **mediatriz**.', { a: 2, b: 12, max: 14 },
      'La mediatriz es perpendicular a AB y pasa por su punto medio: queda a 5 de A y a 5 de B, formando $90^\\circ$.', 'La mediatriz cumple dos condiciones a la vez: una sobre el punto por donde pasa y otra sobre el ángulo que forma.'),
    x('lanza-angulo', 'El faro gira desde la derecha. Dale el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'El suplemento de un ángulo de $65^\\circ$', r: 115, c: '180^\\circ - 65^\\circ', e: { 25: 'Ese es el complemento: lo que le falta para 90°.', 65: 'Ese es el dato: falta lo que completa 180°.' } },
      { q: 'Cada ángulo que deja la bisectriz de uno de $150^\\circ$', r: 75, c: '150^\\circ \\div 2', e: { 150: 'Ese es el ángulo entero: la bisectriz lo parte en dos congruentes.', 30: 'Ese es su suplemento; la bisectriz lo parte por la mitad.' } },
      { q: 'P es interior a $\\angle AOB$, que mide $140^\\circ$, y $\\angle AOP$ mide $85^\\circ$. Lanza $\\angle POB$', r: 55, c: '140^\\circ - 85^\\circ', e: { 95: 'Ese es el suplemento de 85°: aquí se le quita a 140°.' } }] },
      '$180^\\circ - 65^\\circ = 115^\\circ$; $150^\\circ \\div 2 = 75^\\circ$; $140^\\circ - 85^\\circ = 55^\\circ$.', 'Suplemento: lo que falta para un llano. Bisectriz: dos partes congruentes. Ángulo interior: se resta del total.'),
    sol('Dos rectas se cortan y forman, en orden, los ángulos 1, 2, 3 y 4. Completa la demostración de que $\\angle 1 \\cong \\angle 3$.', ['$\\angle 1$ y $\\angle 2$ forman un [[par lineal]]: son suplementarios', '$\\angle 2$ y $\\angle 3$ también: sus medidas suman [[180°]]', 'Así, $\\angle 1$ y $\\angle 3$ son suplementos del mismo ángulo, el [[∠2]]', 'Los suplementos de ángulos congruentes son [[congruentes]]'], ['90°', 'complementarios', 'rectos'],
      'Los dos ángulos son suplementos de $\\angle 2$, y los suplementos de un mismo ángulo son congruentes: por eso los opuestos por el vértice lo son.', 'Cada ángulo forma con su vecino un par lineal: aprovecha que los dos comparten el mismo vecino.'),
    err('Un ángulo mide el doble de su complemento. ¿Cuánto mide?', ['Si el complemento mide $x$, el ángulo mide $2x$', 'Complementarios: suman $180^\\circ$, así que $3x = 180^\\circ$', 'Se despeja $x$ y el ángulo es el doble, $2x$'], 1,
      ['Complementarios: suman $90^\\circ$, así que $3x = 90^\\circ$', 'Complementarios: suman $360^\\circ$, así que $3x = 360^\\circ$', 'Complementarios: se restan, así que $2x - x = 90^\\circ$'],
      'Los complementarios suman $90^\\circ$: $3x = 90^\\circ$, $x = 30^\\circ$ y el ángulo mide $60^\\circ$. Un ángulo que tiene complemento no puede ser obtuso.', '¿Puede tener complemento un ángulo de más de 90°? Revisa cuánto suman dos complementarios.'),
    opc('Dos rectas se cortan. Uno de los cuatro ángulos mide $3x + 10^\\circ$ y su opuesto por el vértice mide $x + 50^\\circ$. Cada uno de los otros dos ángulos mide:', ['$20^\\circ$', '$70^\\circ$', '$90^\\circ$', '$110^\\circ$'], 3,
      'Los opuestos por el vértice son congruentes: $3x + 10 = x + 50$, $x = 20$ y miden $70^\\circ$. Los otros dos forman par lineal con ellos: $110^\\circ$.', 'Iguala los opuestos por el vértice para hallar x, y no olvides qué ángulos pide la pregunta.'),
  ]);

  const l3 = leccion('euc-elementos-3', 'Polígonos', guion(
    ['Línea poligonal', 'Una línea quebrada cerrada y convexa es una línea poligonal; la porción de plano que limita es un polígono.'],
    ['Elementos', 'Lados, vértices, ángulos interiores y diagonales: una diagonal une dos vértices no consecutivos.'],
    ['Nombres y regulares', 'Los polígonos se nombran por su número de lados. Es regular el que es equilátero y equiángulo a la vez.'],
    ['Diagonales', 'De cada vértice salen n − 3 diagonales; en total son n(n − 3)/2.'],
    ['Circunferencia y círculo', 'La circunferencia es la línea de puntos a igual distancia del centro; el círculo la incluye con su interior. Radio, cuerda, diámetro y arco son sus elementos.']), [
    x('poligonos-toca', 'Toca **todas** las figuras que son **polígonos convexos**.', { figs: [
      { p: [[1, 1], [9, 2], [4, 9]], si: true },
      { p: [[1, 2], [4, 8], [6, 3], [9, 8]], ab: true, no: 'La figura 2 es una línea quebrada abierta: no encierra ninguna porción del plano.' },
      { p: [[1, 1], [5, 4], [9, 1], [5, 9]], no: 'La figura 3 tiene una entrada: hay rectas que la cortan en cuatro puntos. No es convexa.' },
      { r: 4.4, no: 'La figura 4 es una línea curva: un polígono está limitado por segmentos.' },
      { p: [[2, 1], [8, 1], [10, 5], [5, 9], [0, 5]], si: true },
      { p: [[1, 2], [9, 2], [7, 8], [3, 8]], si: true }],
    falta: 'Falta alguna: un polígono convexo puede tener cualquier número de lados.', ok: 'Líneas quebradas cerradas que ninguna recta corta en más de dos puntos.' },
      'Las figuras 1, 5 y 6 son líneas quebradas cerradas y convexas. La 2 es abierta, la 3 no es convexa y la 4 es una línea curva.', 'Revisa tres cosas: que esté hecha de segmentos, que cierre y que ninguna recta la corte en más de dos puntos.'),
    x('nombre-poligono', 'Pon a cada descripción el **nombre** del polígono.', { et: ['7 lados', 'no tiene diagonales', '2 diagonales', '12 vértices'], metas: ['heptágono', 'triángulo', 'cuadrilátero', 'dodecágono'], fichas: ['heptágono', 'triángulo', 'cuadrilátero', 'dodecágono', 'hexágono', 'decágono', 'pentágono'],
      mira: ['Hepta quiere decir siete.', 'Si todos los vértices son vecinos entre sí, no hay a quién trazarle una diagonal.', 'De cada vértice sale una sola diagonal, y son dos en total.', 'Tiene tantos lados como vértices: doce.'], trampas: { '3:decágono': 'Deca es diez; doce es dodeca.', '2:pentágono': 'El pentágono tiene 5 diagonales: de cada vértice salen dos.', '0:hexágono': 'Hexa es seis; siete es hepta.' }, ok: 'Hepta, siete; dodeca, doce. Y el triángulo no tiene diagonales.' },
      'Siete lados: heptágono. En el triángulo todos los vértices son consecutivos. El cuadrilátero tiene $\\tfrac{4 \\cdot 1}{2} = 2$ diagonales, y doce vértices son doce lados: dodecágono.', 'Un polígono tiene tantos vértices como lados, y de cada vértice salen tres diagonales menos que el número de lados.'),
    x('poligono-cuenta', 'Este polígono es un **eneágono**. Pon cuántos lados tiene, cuántas diagonales salen de **un** vértice y cuántas tiene en total.', { n: 9, et: ['lados', 'desde un vértice', 'diagonales'], metas: ['9', '6', '27'], fichas: ['9', '6', '27', '54', '7', '18'],
      mira: ['Cuenta los vértices: tiene tantos lados como vértices.', 'Un vértice no se une con él mismo ni con sus dos vecinos.', 'Multiplica los vértices por las que salen de cada uno, y recuerda que cada diagonal tiene dos extremos.'], trampas: { '2:54': 'Contaste cada diagonal desde sus dos extremos: falta partir entre 2.', '1:7': 'Quita también al otro vecino: son 9 − 3.', '1:9': 'A sí mismo y a sus dos vecinos no les traza diagonal.' }, ok: 'De cada vértice salen 6, y 9 · 6 / 2 = 27.' },
      'Nueve lados. De cada vértice salen $9 - 3 = 6$ diagonales, y en total son $\\tfrac{9 \\cdot 6}{2} = 27$, porque cada una se cuenta desde sus dos extremos.', 'Desde un vértice no hay diagonal hacia él mismo ni hacia sus dos vecinos; al juntar las de todos, cada una aparece dos veces.'),
    x('lados-diagonales', '¿Cuántos lados debe tener un polígono para que tenga exactamente **35 diagonales**?', { total: 35, max: 12 },
      'Con 10 lados, de cada vértice salen 7 diagonales: $\\tfrac{10 \\cdot 7}{2} = 35$. Es un decágono.', 'El doble de las diagonales es el número de lados por tres menos que ese número: prueba hasta que coincida.'),
    x('regular-arma', 'Este cuadrilátero tiene dos lados de 5. Arrastra sus vértices hasta que sea un polígono **regular**.', { lado: 5 },
      'Regular quiere decir equilátero y equiángulo a la vez: los cuatro lados de 5 y los cuatro ángulos de $90^\\circ$. Es un cuadrado.', 'No basta con igualar los lados ni con igualar los ángulos: un polígono regular cumple las dos condiciones.'),
    x('circulo-partes', 'Cada número señala un elemento de la circunferencia de centro O. Pon su **nombre**.', { partes: ['radio', 'diámetro', 'arco', 'cuerda'], fichas: ['radio', 'diámetro', 'arco', 'cuerda', 'tangente', 'secante'] },
      'El radio va del centro a la circunferencia; la cuerda une dos de sus puntos; el diámetro es la cuerda que pasa por el centro, y el arco es un pedazo de la circunferencia.', 'Mira por dónde pasa cada trazo: si sale del centro, si lo atraviesa o si es parte de la curva.'),
    x('lanza-diagonales', 'Estira hasta la cantidad que se pide y suelta. Puedes fallar **una** vez.', { tiros: [
      { q: '¿Cuántas diagonales salen de **un** vértice de un dodecágono?', modo: 'vert', n: 12, r: 9, c: '12 - 3', e: { 11: 'A sus dos vecinos lo unen lados, no diagonales.', 12: 'No se une con él mismo ni con sus dos vecinos.' } },
      { q: '¿Cuántas diagonales tiene en total un hexágono?', modo: 'diag', n: 6, r: 9, c: '\\tfrac{6 \\cdot 3}{2}', e: { 18: 'Cada diagonal quedó contada desde sus dos extremos.', 3: 'Esas son las que salen de un solo vértice.' } },
      { q: 'Un polígono tiene **65** diagonales. ¿Cuántos lados tiene?', modo: 'lados', r: 13, c: '\\tfrac{13 \\cdot 10}{2} = 65 \\;\\Rightarrow\\; n', e: { 10: 'Con 10 lados salen 35 diagonales: 10 es lo que sale de cada vértice.' } }] },
      '$12 - 3 = 9$; $\\tfrac{6 \\cdot 3}{2} = 9$; y $\\tfrac{13 \\cdot 10}{2} = 65$, así que tiene 13 lados.', 'De cada vértice salen tres menos que el número de lados, y cada diagonal se comparte entre dos vértices.'),
    sol('Quince personas se sientan alrededor de una mesa redonda. Cada una le da la mano a todas las que NO tiene al lado. ¿Cuántos apretones hay?', ['Cada persona saluda a $15 - 3 =$ [[12]] personas', 'Contando persona por persona salen $15 \\cdot 12 =$ [[180]]', 'Cada apretón se contó dos veces: son [[90]]'], ['14', '210', '105'],
      'Es contar las diagonales de un polígono de 15 lados: $\\tfrac{15 \\cdot 12}{2} = 90$.', 'Pon a las personas en los vértices de un polígono: ¿qué segmento une a dos que no son vecinas?'),
    err('Un rombo tiene sus cuatro lados de 7 cm. ¿Es un polígono regular?', ['Tiene cuatro lados congruentes: es equilátero', 'Un polígono regular es equilátero y equiángulo', 'Como es equilátero, el rombo es regular'], 2,
      ['Sus ángulos pueden no ser congruentes: no siempre es regular', 'Como tiene cuatro lados, el rombo es regular', 'Como tiene dos diagonales, el rombo es regular'],
      'Para ser regular faltaría que fuera equiángulo. Un rombo solo es regular cuando sus cuatro ángulos son rectos, es decir, cuando es un cuadrado.', 'La definición de regular pide dos condiciones: revisa si la conclusión comprobó las dos.'),
    opc('Un polígono tiene 44 diagonales. ¿Cuántos lados tiene?', ['11', '8', '22', '44'], 0,
      'Con 11 lados salen 8 diagonales de cada vértice: $\\tfrac{11 \\cdot 8}{2} = 44$.', 'Prueba cada opción en la cuenta de las diagonales: lados por tres menos que los lados, y la mitad.'),
  ]);

  return mundo('euc-elementos', [l1, l2, l3], [
    ['euc-elementos-1', 'Si B está entre A y C, entonces AB + BC = AC.', x('segmento-reparte', 'A, B y C son colineales, con B entre A y C, y $AC = 20$. Ubica B de modo que BC mida **6 más** que AB.', { ac: 20, dif: 6 },
      'Quitando los 6 de más quedan 14, 7 para cada uno: $AB = 7$ y $BC = 13$.', 'Quítale a AC lo que BC tiene de más y reparte el resto.')],
    ['euc-elementos-1', 'El punto medio deja dos segmentos congruentes.', x('mitad-segmento', 'En la recta numérica, A está en $-7$ y **M, el punto medio de AB**, está en $-1$. Lleva B a su lugar.', { a: -7, b: -1, min: -8, max: 8, modo: 'extremo', ini: 0 },
      '$AM = 6$, así que B queda 6 más allá de M: en el 5.', 'M debe quedar a la misma distancia de A y de B.')],
    ['euc-elementos-1', 'Dos puntos determinan una recta; los colineales comparten una sola.', opc('Cuatro puntos están en un plano y exactamente tres de ellos son colineales. ¿Cuántas rectas distintas determinan?', ['6', '3', '4', '1'], 2,
      'Los tres colineales dan una sola recta, y el cuarto punto determina una con cada uno de ellos: $1 + 3 = 4$.', 'Cuenta aparte la recta de los tres colineales.')],
    ['euc-elementos-2', 'La bisectriz parte al ángulo en dos ángulos congruentes.', x('bisectriz-traza', 'El ángulo AOB mide $76^\\circ$. Mueve el rayo OP hasta que sea su **bisectriz**.', { a: 76, rot: 30 },
      'Dos ángulos congruentes: $76^\\circ \\div 2 = 38^\\circ$ cada uno.', 'Las dos partes deben medir lo mismo.')],
    ['euc-elementos-2', 'Los ángulos de un par lineal son suplementarios.', x('vecinos-razon', 'Un rayo forma con una recta un par lineal. Gíralo hasta que el ángulo de la derecha sea **9 veces** el dorado.', { k: 9 },
      'Diez partes iguales en $180^\\circ$: el dorado mide $18^\\circ$ y el otro, $162^\\circ$.', 'Los dos juntos forman un llano: cuenta las partes.')],
    ['euc-elementos-2', 'Complementarios suman 90° y suplementarios, 180°.', opc('El suplemento de un ángulo mide el triple de su complemento. El ángulo mide:', ['$45^\\circ$', '$30^\\circ$', '$60^\\circ$', '$22.5^\\circ$'], 0,
      '$180 - x = 3(90 - x)$ da $2x = 90$: el ángulo mide $45^\\circ$.', 'Escribe el suplemento y el complemento con la misma letra.')],
    ['euc-elementos-3', 'Un polígono de n lados tiene n(n − 3)/2 diagonales.', x('lados-diagonales', '¿Cuántos lados tiene un polígono con exactamente **54 diagonales**?', { total: 54, max: 14 },
      'Con 12 lados salen 9 de cada vértice: $\\tfrac{12 \\cdot 9}{2} = 54$.', 'El doble de las diagonales es lados por tres menos que los lados.')],
    ['euc-elementos-3', 'De cada vértice salen n − 3 diagonales.', x('poligono-cuenta', 'Este polígono es un **hexágono**. Pon sus lados, las diagonales que salen de **un** vértice y las que tiene en total.', { n: 6, et: ['lados', 'desde un vértice', 'diagonales'], metas: ['6', '3', '9'], fichas: ['6', '3', '9', '18', '4', '12'],
      mira: ['Tiene tantos lados como vértices.', 'Un vértice no se une con él mismo ni con sus dos vecinos.', 'Cada diagonal tiene dos extremos: no la cuentes dos veces.'], trampas: { '2:18': 'Contaste cada diagonal desde sus dos extremos.' }, ok: 'De cada vértice salen 3, y 6 · 3 / 2 = 9.' },
      'Seis lados, $6 - 3 = 3$ por vértice y $\\tfrac{6 \\cdot 3}{2} = 9$ en total.', 'Desde un vértice no hay diagonal a sus vecinos.')],
    ['euc-elementos-3', 'Regular: equilátero y equiángulo a la vez.', opc('Un polígono es equiángulo pero NO es equilátero. Puede ser:', ['un cuadrado', 'un rombo que no es cuadrado', 'un rectángulo que no es cuadrado', 'un triángulo equilátero'], 2,
      'El rectángulo tiene sus cuatro ángulos rectos, pero sus lados no son todos congruentes.', 'Equiángulo habla de los ángulos; equilátero, de los lados.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-triangulo.js
// Geometría Euclidiana · mundo 3 «Triángulos Congruentes» (spec 2026-11-26-curso-euclidiana). Enunciados, números y contextos propios.
// Aquí todavía no se sabe cuánto suman los ángulos de un triángulo ni se han visto paralelas: ningún ejercicio se apoya en eso.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;
  const TIPOS = ['escaleno', 'isósceles', 'equilátero', 'acutángulo', 'rectángulo', 'obtusángulo'];
  const RANGO = ['mayor', 'mediano', 'menor', 'igual'];

  const l1 = leccion('euc-triangulo-1', 'El triángulo y sus elementos', guion(
    ['Tres y tres', 'Un triángulo tiene tres vértices, tres lados y tres ángulos. Se nombra con sus vértices: triángulo ABC.'],
    ['Por sus lados', 'Escaleno: tres lados distintos. Isósceles: dos lados congruentes. Equilátero: los tres congruentes.'],
    ['Por sus ángulos', 'Acutángulo: tres ángulos agudos. Rectángulo: uno recto. Obtusángulo: uno obtuso.'],
    ['Segmentos notables', 'La altura cae a escuadra; la mediana llega al punto medio; la bisectriz parte el ángulo en dos congruentes.'],
    ['Opuesto y comprendido', 'Frente a cada ángulo está su lado opuesto. El ángulo comprendido entre dos lados es el que ellos forman.']), [
    x('clasifica-triangulos', 'Cada triángulo trae las medidas de sus lados. Toca **todos** los que son **isósceles**.', { por: 'lados', pide: 'isósceles', tris: [[5, 5, 8], [4, 6, 7], [6, 9, 6], [3, 7, 8], [8, 5, 8], [9, 6, 5]] },
      'Son isósceles los que repiten una medida: 5, 5, 8; 6, 9, 6 y 8, 5, 8. Los otros tres tienen sus lados distintos: son escalenos.', 'No mires la forma: compara las tres medidas de cada triángulo y busca dónde se repite una.'),
    x('dos-apellidos', 'Las rayitas iguales marcan lados congruentes. Ponle al triángulo su nombre **por los lados** y su nombre **por los ángulos**.', { pts: [[0, 0], [8, 0], [4, 3]], fichas: TIPOS },
      'Dos lados llevan la misma marca: es isósceles. Y el ángulo de arriba abre más que un recto: es obtusángulo.', 'Un nombre sale de contar cuántos lados llevan la misma marca; el otro, de mirar el ángulo más abierto.'),
    x('vertice-tipo', 'Arrastra el vértice C hasta que el triángulo ABC sea **isósceles** y **rectángulo** al mismo tiempo.', { A: 2, B: 10, pide: ['isósceles', 'rectángulo'], sol: [6, 4], ini: [3, 2] },
      'Con C sobre la mitad de AB los lados AC y BC miden lo mismo; a 4 cuadros de altura las dos diagonales de cuadro forman un ángulo recto en C.', 'Para que dos lados midan lo mismo, C debe quedar igual de lejos de A y de B. Luego busca la altura donde la punta hace escuadra.'),
    x('nombra-segmentos', 'Desde cada vértice sale un segmento con sus marcas. Ponle a cada uno su nombre.', { de: ['mediana', 'altura', 'bisectriz'], fichas: ['altura', 'mediana', 'bisectriz', 'mediatriz', 'lado'] },
      'Desde A llega al punto medio (dos trozos con la misma rayita): mediana. Desde B cae a escuadra: altura. Desde C parte el ángulo en dos congruentes: bisectriz.', 'Mira la marca de cada uno: una esquina recta, dos trozos con la misma rayita o dos arcos iguales en el vértice.'),
    x('pie-notable', 'El lado BC mide **28**. Mueve el pie P hasta que el segmento AP sea la **mediana** del triángulo.', { A: [10, 24], c: 28, pide: 'mediana', ini: 3 },
      'La mediana une el vértice con el punto medio del lado opuesto: $28 \\div 2 = 14$, así que $BP = PC = 14$.', 'La escena te da tres medidas: los trozos de BC, el ángulo en P y los dos ángulos en A. ¿Cuál de ellas define a la mediana?'),
    x('opuesto-comprendido', 'En el triángulo PQR toca el **lado opuesto** al ángulo Q y el **ángulo comprendido** entre los lados PQ y PR.', { n: 'PQR', sol: ['PR', 'P'], no: { PQ: 'PQ toca al vértice Q: el lado opuesto es el que no lo toca.', QR: 'QR toca al vértice Q: el lado opuesto es el que no lo toca.', Q: 'PQ y PR se encuentran en P, no en Q.', R: 'PQ no llega a R: el ángulo comprendido está donde se juntan los dos lados.' }, mira: 'Opuesto: el que queda enfrente. Comprendido: el que forman los dos lados.', falta: 'Falta uno: son un lado y un ángulo.', ok: 'Frente a Q está PR, y PQ con PR se juntan en P.' },
      'El lado opuesto a Q es el que no pasa por Q: PR. Los lados PQ y PR comparten el vértice P: allí está el ángulo que comprenden.', 'El lado opuesto a un vértice es el único que no lo toca. Dos lados comprenden el ángulo del vértice que tienen en común.'),
    x('sube-distancia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un triángulo **isósceles** tiene dos lados de 9 y la base de 5. Su perímetro', r: 23, c: '9 + 9 + 5', e: { 19: 'Los lados congruentes son los de 9: se suman dos de 9 y uno de 5.', 14: 'Falta un lado: son tres.' } },
      { q: 'Un triángulo **equilátero** tiene perímetro 42. Cada lado', r: 14, c: '42 \\div 3', e: { 21: 'Son tres lados congruentes, no dos.' } },
      { q: 'La **mediana** desde A llega al lado BC, que mide 26. Cada trozo de BC', r: 13, c: '26 \\div 2', e: { 26: 'La mediana llega al punto medio: parte el lado en dos.' } }] },
      '$9 + 9 + 5 = 23$; $42 \\div 3 = 14$; y la mediana parte el lado de 26 en dos trozos de 13.', 'Isósceles: dos lados congruentes. Equilátero: tres. La mediana llega al punto medio del lado opuesto.'),
    sol('En el triángulo ABC el segmento AD llega al lado BC. Se sabe que $BD = DC$ y que AD forma un ángulo recto con BC. ¿Qué nombres recibe AD?', ['Como D es punto medio de BC, AD es una [[mediana]]', 'Como AD es perpendicular a BC, AD es una [[altura]]', 'La recta AD es perpendicular a BC por su punto medio: es la [[mediatriz]] de BC'], ['bisectriz', 'hipotenusa', 'base'],
      'Punto medio: mediana. Perpendicular al lado opuesto: altura. Perpendicular por el punto medio de un lado: mediatriz.', 'Cada dato del enunciado es la definición de uno de los segmentos notables: léelos uno por uno.'),
    err('Un triángulo tiene lados de 7 cm, 7 cm y 10 cm, y uno de sus ángulos es obtuso. ¿Cómo se clasifica?', ['Tiene dos lados congruentes, los de 7 cm', 'Por sus lados es isósceles', 'Tiene un ángulo obtuso', 'Por sus ángulos es acutángulo'], 3, ['Por sus ángulos es obtusángulo', 'Por sus ángulos es rectángulo', 'Por sus ángulos es equilátero'],
      'Con un ángulo obtuso el triángulo es obtusángulo. Acutángulo es el que tiene sus tres ángulos agudos.', 'Repasa qué pide cada nombre: ¿cuántos ángulos agudos necesita un triángulo acutángulo?'),
    opc('En el triángulo MNP, el segmento que sale de N y divide al ángulo N en dos ángulos congruentes se llama:', ['altura', 'mediana', 'bisectriz', 'mediatriz'], 2, 'Partir el ángulo del vértice en dos ángulos congruentes es lo que define a la bisectriz.', 'Piensa cuál de los segmentos notables se define con ángulos y no con el lado opuesto.'),
  ]);

  const l2 = leccion('euc-triangulo-2', 'Criterios L-A-L, A-L-A y L-L-L', guion(
    ['Congruentes', 'Dos triángulos son congruentes si uno encaja sobre el otro: cada vértice tiene su pareja y las partes correspondientes son congruentes.'],
    ['L-A-L', 'Dos lados y el ángulo comprendido entre ellos respectivamente congruentes: los triángulos son congruentes.'],
    ['A-L-A y L-L-L', 'También basta un lado con los dos ángulos pegados a él, o los tres lados.'],
    ['Isósceles', 'Si dos lados de un triángulo son congruentes, los ángulos opuestos a ellos también; y al revés.'],
    ['L-L-A no', 'Dos lados y un ángulo que no está entre ellos pueden dar dos triángulos distintos.']), [
    x('partes-correspondientes', 'Los dos triángulos son congruentes y llevan las **mismas marcas**. Pon la parte del segundo que corresponde a cada una.', { corr: 'EFD', pide: ['∠A', 'AB', 'BC'], fichas: ['∠D', '∠E', '∠F', 'DE', 'EF', 'DF'] },
      'Las marcas dicen que A va con E, B con F y C con D: $\\triangle ABC \\cong \\triangle EFD$. Entonces ∠A ≅ ∠E, AB ≅ EF y BC ≅ FD.', 'No te guíes por la posición: el segundo triángulo está girado. Sigue el color de cada arco y el número de rayitas.'),
    x('pares-marcados', 'En cada par solo se sabe lo que está **marcado**. Toca los pares en los que eso basta para asegurar que los triángulos son congruentes.', { casos: [{ l: [1, 2], a: [0] }, { l: [0, 2], a: [0] }, { l: [2], a: [0, 1] }, { a: [0, 1, 2] }] },
      'El par 1 tiene dos lados y el ángulo que forman (L-A-L) y el par 3, un lado con sus dos ángulos (A-L-A). En el 2 el ángulo no está entre los lados, y en el 4 solo hay ángulos.', 'En cada par mira si el ángulo marcado queda entre los dos lados marcados, o si el lado marcado une los dos ángulos.'),
    x('arma-lal', 'Arma el triángulo DEF **congruente** con ABC usando L-A-L. El lado DE ya mide lo mismo que AB: abre el ángulo en D y dale su largo a DF.', { c: 8, b: 5, g: 60, a: 7 },
      'L-A-L usa los dos lados que forman el ángulo: AB y AC. Entonces $\\angle D = 60^\\circ$ y $DF = AC = 5$; el tercer lado sale solo y mide 7.', 'El ángulo de 60° está en A. ¿Cuáles dos lados de ABC se juntan en A? Esos son los que debes copiar.'),
    x('abre-ala', 'Arma DEF congruente con ABC usando A-L-A: el lado DE ya mide lo mismo que AB, con D en el lugar de A y E en el de B. Abre los ángulos en D y en E.', { A: 40, B: 65, C: 75 },
      'A-L-A usa el lado AB y los dos ángulos pegados a él: $\\angle D = \\angle A = 40^\\circ$ y $\\angle E = \\angle B = 65^\\circ$. El de 75° no toca a AB.', 'El triángulo ABC está dibujado con B a la izquierda. Fíjate qué ángulos tocan al lado AB y cuál vértice corresponde a D.'),
    x('marca-que-falta', 'Ya se sabe que $AB \\cong DE$ y que $\\angle A \\cong \\angle D$. Toca la congruencia que falta para poder aplicar **L-A-L**.', { l: [2], a: [0], cr: 'L-A-L' },
      'El ángulo A debe quedar entre los dos lados: falta el otro lado que sale de A, es decir $AC \\cong DF$.', 'En L-A-L el ángulo va en medio. ¿Qué otro lado, además de AB, forma el ángulo A?'),
    x('base-iguales', 'Sin medir lados: gira el lado AC hasta que el triángulo quede **isósceles**, con $AB = AC$.', { B: 55 },
      'Si los ángulos de la base son congruentes, los lados opuestos a ellos también: con $\\angle C = \\angle B = 55^\\circ$ queda $AB = AC$.', 'En un triángulo isósceles, ¿qué se sabe de los ángulos que están frente a los lados congruentes?'),
    x('razones-paso', 'Los segmentos AB y CD se cortan en M, punto medio de los dos. Pon la **razón** de cada paso para demostrar que $AC \\cong BD$.', { fig: 'cruce', et: ['AM ≅ MB y CM ≅ MD', '∠AMC ≅ ∠BMD', '△AMC ≅ △BMD', 'AC ≅ BD'], metas: ['dato', 'op. por el vértice', 'L-A-L', 'partes corresp.'], fichas: ['dato', 'op. por el vértice', 'L-A-L', 'partes corresp.', 'L-L-L', 'A-L-A', 'lado común'],
      mira: ['M es punto medio de AB y de CD: eso lo dice el enunciado.', 'Esos dos ángulos se forman al cruzarse dos rectas, uno frente al otro.', 'Hay dos lados y el ángulo que forman.', 'AC y BD ocupan el mismo lugar en dos triángulos congruentes.'], trampas: { '2:L-L-L': 'Solo se conocen dos pares de lados; el tercero es lo que se quiere demostrar.', '2:A-L-A': 'Solo se conoce un par de ángulos, y está entre los dos lados.' }, ok: 'Dato, opuestos por el vértice, L-A-L y partes correspondientes.' },
      'Los medios dan dos pares de lados; los ángulos en M son opuestos por el vértice; con eso hay L-A-L, y AC y BD son partes correspondientes.', 'Pregunta en cada renglón: ¿eso me lo dieron, lo veo en la figura o sale de un paso anterior?'),
    x('lanza-angulo', 'El faro gira desde la derecha. Dale el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: '$\\triangle ABC \\cong \\triangle DEF$, con $\\angle A = 35^\\circ$ y $\\angle B = 80^\\circ$. ¿Cuánto mide $\\angle E$?', r: 80, c: '\\angle E = \\angle B', e: { 35: 'Ese es el ángulo D: E es la pareja de B.' } },
      { q: 'En $\\triangle PQR$, $PQ = PR$ y $\\angle Q = 70^\\circ$. ¿Cuánto mide $\\angle R$?', r: 70, c: '\\angle R = \\angle Q', e: { 110: 'No se resta: los ángulos frente a los lados congruentes miden lo mismo.' } },
      { q: 'En un triángulo isósceles, la bisectriz del ángulo del vértice llega a la base. ¿Qué ángulo forma con ella?', r: 90, c: '180^\\circ \\div 2', e: { 45: 'Esa bisectriz también es altura: cae a escuadra.' } }] },
      'Partes correspondientes: $\\angle E = \\angle B = 80^\\circ$. Ángulos de la base: $70^\\circ$. Y la bisectriz del vértice es también altura: $90^\\circ$.', 'El orden de las letras dice quién va con quién; en el isósceles, mira los ángulos frente a los lados congruentes.'),
    sol('En el triángulo isósceles ABC, con $AB \\cong AC$, se traza la bisectriz AD del ángulo A. Demuestra que $\\angle B \\cong \\angle C$.', ['$AB \\cong AC$, porque es un [[dato]]', '$\\angle BAD \\cong \\angle CAD$, porque AD es [[bisectriz]]', '$AD \\cong AD$, porque es un [[lado común]]', '$\\triangle ABD \\cong \\triangle ACD$ por [[L-A-L]]', '$\\angle B \\cong \\angle C$, por ser [[partes correspondientes]]'], ['L-L-L', 'A-L-A', 'mediana'],
      'Dos lados (AB con AC y AD común) y el ángulo que forman, partido por la bisectriz: L-A-L. Los ángulos B y C se corresponden.', 'El ángulo partido por la bisectriz queda entre AB y AD en un triángulo, y entre AC y AD en el otro.'),
    err('De dos triángulos se sabe que $AB \\cong DE$, $BC \\cong EF$ y $\\angle A \\cong \\angle D$. ¿Se puede asegurar que son congruentes?', ['Hay dos pares de lados congruentes: AB con DE y BC con EF', 'Hay un par de ángulos congruentes: A con D', 'El ángulo A está comprendido entre AB y BC', 'Con esos datos se busca el criterio que aplica'], 2, ['El ángulo A no está entre AB y BC: es L-L-A y no se puede asegurar', 'El ángulo A está comprendido entre BC y AC', 'El ángulo A es opuesto al lado AB'],
      'AB y BC se juntan en B, no en A. Con el ángulo fuera de los dos lados queda L-L-A, que no es un criterio.', 'Busca el vértice que comparten los lados AB y BC: ahí está el ángulo comprendido.'),
    opc('Si $\\triangle RST \\cong \\triangle XYZ$, ¿cuál de estas afirmaciones es necesariamente verdadera?', ['$ST \\cong YZ$', '$RS \\cong YZ$', '$\\angle R \\cong \\angle Z$', '$RT \\cong XY$'], 0, 'El orden de las letras da la correspondencia: S con Y y T con Z, así que $ST \\cong YZ$.', 'Escribe una letra debajo de la otra: cada vértice va con el que ocupa su misma posición.'),
  ]);

  const l3 = leccion('euc-triangulo-3', 'Desigualdades en el triángulo', guion(
    ['Ángulo exterior', 'Un ángulo exterior de un triángulo es mayor que cada uno de los dos interiores no adyacentes.'],
    ['Lado y ángulo', 'A mayor lado se opone mayor ángulo, y a mayor ángulo se opone mayor lado.'],
    ['¿Cierra?', 'Cada lado es menor que la suma de los otros dos y mayor que su diferencia.'],
    ['La bisagra', 'Con dos lados fijos, a mayor ángulo entre ellos, mayor el tercer lado.']), [
    x('exterior-cabe', 'El ángulo exterior en C mide **110°**. Toca **todas** las medidas que podría tener el ángulo A.', { ext: 110, ops: [40, 95, 110, 125, 70] },
      'A es un interior no adyacente al exterior: debe medir menos de 110°. Pueden ser 40°, 95° y 70°; ni 110° ni 125°.', 'El ángulo exterior le gana a cada uno de los dos interiores que no lo tocan. ¿Puede haber empate?'),
    x('angulos-por-lados', 'Los lados miden **9**, **6** y **11** (la figura no está a escala). Di cuál ángulo es el mayor, cuál el mediano y cuál el menor.', { l: [9, 6, 11], fichas: RANGO },
      'Frente al lado de 11 (AB) está C: el mayor. Frente al de 9 (BC) está A: el mediano. Frente al de 6 (AC) está B: el menor.', 'Cada ángulo «mira» a un lado: el que no lo toca. Ordena los lados y pasa ese orden a los ángulos de enfrente.'),
    x('lados-por-angulos', 'Los ángulos miden **48°**, **95°** y **37°** (la figura no está a escala). Di cuál lado es el mayor, cuál el mediano y cuál el menor.', { g: [48, 95, 37], fichas: RANGO },
      'Frente al ángulo de 95° (B) está AC: el mayor. Frente al de 48° (A) está BC: el mediano. Frente al de 37° (C) está AB: el menor.', 'El lado más largo queda frente al ángulo más abierto. Busca primero qué lado está enfrente de cada ángulo.'),
    x('tercer-lado', 'Dos varillas miden **9** y **4**. ¿Entre qué números enteros puede medir la tercera para que el triángulo **cierre**?', { a: 9, b: 4, max: 14 },
      'Debe ser mayor que la diferencia, $9 - 4 = 5$, y menor que la suma, $9 + 4 = 13$: de 6 a 12.', 'Si es muy corta no alcanza a unir las puntas; si es muy larga, las otras dos no llegan a tocarse.'),
    x('cierran-o-no', 'Toca **todas** las ternas de medidas con las que se puede formar un triángulo.', { casos: [{ t: '4, 7 y 10', si: true }, { t: '3, 5 y 9', no: 'En 3, 5 y 9 las dos cortas suman 8: no alcanzan a la de 9.' }, { t: '6, 6 y 11', si: true }, { t: '5, 8 y 13', no: 'En 5, 8 y 13 las dos cortas apenas igualan a la larga: queda un segmento.' }, { t: '12, 5 y 9', si: true }], no: 'Alguna de las marcadas no cierra.', falta: 'Falta alguna que sí cierra: compara el lado mayor con la suma de los otros dos.', ok: 'En todas, el lado mayor es menor que la suma de los otros dos.' },
      '$4 + 7 > 10$, $6 + 6 > 11$ y $5 + 9 > 12$ cierran. En 3, 5, 9 la suma no alcanza y en 5, 8, 13 apenas iguala.', 'Basta comparar el lado mayor con la suma de los otros dos: tiene que ser estrictamente menor.'),
    x('compas-bisagra', 'Los dos compases tienen las mismas patas, de 8 y 10. El de la izquierda está abierto 50°. Abre el de la derecha **lo menos posible** para que sus puntas queden **más separadas** que las del otro.', { a: 8, b: 10, g: 50 },
      'Con los mismos dos lados, a mayor ángulo se opone mayor lado: basta pasar de 50° a 60° para que la separación crezca.', 'Con la misma abertura los triángulos serían congruentes. ¿Hacia dónde hay que mover el ángulo para que el lado de enfrente crezca?'),
    x('lanza-escala', 'Manda el dron al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos lados miden 8 y 15. El **mayor** entero que puede medir el tercero', r: 22, c: '8 + 15 - 1', e: { 23: 'Con 23 los otros dos apenas lo igualan: queda un segmento.' } },
      { q: 'Dos lados miden 8 y 15. El **menor** entero que puede medir el tercero', r: 8, c: '15 - 8 + 1', e: { 7: 'Con 7, el de 7 y el de 8 apenas igualan al de 15.' } },
      { q: 'Un triángulo isósceles tiene dos lados de 6. La **mayor** base entera', r: 11, c: '6 + 6 - 1', e: { 12: 'Con 12 los dos lados quedan acostados sobre la base.' } }] },
      'El tercero es menor que la suma y mayor que la diferencia: $8 + 15 = 23$ y $15 - 8 = 7$ quedan por fuera; $6 + 6 = 12$ también.', 'Halla la suma y la diferencia de los dos lados: el tercero queda entre ellas, sin tocarlas.'),
    sol('En el triángulo ABC, $AB = 7$, $BC = 10$ y $AC = 12$. Ordena sus ángulos de menor a mayor.', ['El lado menor es AB: su ángulo opuesto es [[C]]', 'El lado mayor es AC: su ángulo opuesto es [[B]]', 'A mayor lado se opone [[mayor]] ángulo', 'De menor a mayor: C, [[A]], B'], ['menor', 'D', 'igual'],
      'Frente a AB = 7 está C (el menor), frente a BC = 10 está A y frente a AC = 12 está B (el mayor).', 'El ángulo opuesto a un lado es el del vértice que no aparece en el nombre del lado.'),
    err('En el triángulo DEF el ángulo exterior en F mide 118°. ¿Qué se puede decir de los ángulos D y E?', ['El exterior en F es adyacente al interior F', 'D y E son los interiores no adyacentes a ese exterior', 'El exterior es menor que cada interior no adyacente', 'Entonces D y E miden menos de 118°'], 2, ['El exterior es mayor que cada interior no adyacente', 'El exterior es congruente con cada interior no adyacente', 'El exterior es mayor que el interior adyacente'],
      'El teorema del ángulo exterior dice que el exterior es mayor que cada interior no adyacente: así sí se concluye que D y E miden menos de 118°.', 'Mira la conclusión del último paso: ¿con cuál relación entre el exterior y los interiores lejanos se llega a ella?'),
    opc('En el triángulo PQR, $\\angle P = 62^\\circ$, $\\angle Q = 75^\\circ$ y $\\angle R = 43^\\circ$. El lado más largo es:', ['PQ', 'QR', 'los tres miden lo mismo', 'PR'], 3, 'El ángulo mayor es Q, de 75°, y su lado opuesto es PR: a mayor ángulo se opone mayor lado.', 'Busca el ángulo mayor y luego el lado que no toca a ese vértice.'),
  ]);

  const l4 = leccion('euc-triangulo-4', 'L-A-A y triángulos rectángulos', guion(
    ['L-A-A', 'Dos ángulos y un lado opuesto a uno de ellos, respectivamente congruentes, también garantizan triángulos congruentes.'],
    ['Con ángulo recto', 'En triángulos rectángulos bastan dos datos más: cateto y cateto, cateto y ángulo agudo, hipotenusa y ángulo agudo, o hipotenusa y cateto.'],
    ['H-C', 'Hipotenusa y cateto parece L-L-A, pero con el ángulo recto sí es un criterio.'],
    ['Mediatriz', 'Todo punto de la mediatriz de un segmento equidista de sus extremos.'],
    ['Bisectriz', 'Todo punto de la bisectriz de un ángulo equidista de sus lados.']), [
    x('pares-rectangulos', 'Todos son triángulos **rectángulos** y solo se sabe lo marcado. Toca los pares que con eso quedan congruentes.', { casos: [{ r: 1, l: [0, 1] }, { r: 1, l: [2], a: [0] }, { r: 1, a: [0, 1] }, { r: 1, l: [2, 0] }] },
      'El par 1 tiene los dos catetos (C-C), el 2 la hipotenusa y un ángulo agudo (H-A) y el 4 la hipotenusa y un cateto (H-C). En el 3 solo hay ángulos.', 'El ángulo recto ya cuenta como un dato. Mira si además hay dos datos más y si alguno de ellos es un lado.'),
    x('marca-que-falta', 'Los dos triángulos son rectángulos en C y en F, y ya se sabe que $BC \\cong EF$. Toca la congruencia que falta para aplicar **H-C**.', { r: 1, l: [0], a: [], cr: 'H-C' },
      'H-C pide la hipotenusa y un cateto. El cateto BC ya está: falta la hipotenusa, $AB \\cong DE$.', 'Ubica el ángulo recto: la hipotenusa es el lado que queda enfrente de él.'),
    x('punto-equidista', 'Arrastra P hasta un punto que esté a **igual distancia** de A y de B y que **no** sea el punto medio de AB.', { A: [2, 1], B: [8, 5], ini: [6, 6], sol: [3, 6] },
      'Los puntos que equidistan de A y B forman la mediatriz: pasa por el punto medio y es perpendicular a AB. Desde el medio, 2 a la izquierda y 3 arriba.', 'Ubica el punto medio de AB. De A a B se avanza 6 y se sube 4: una perpendicular cambia esos pasos de lugar y de sentido.'),
    x('rayo-equidista', 'El ángulo mide **70°**. Gira el rayo hasta que el punto P quede a la **misma distancia** de los dos lados.', { g: 70 },
      'Los puntos que equidistan de los lados de un ángulo están en su bisectriz: el rayo debe dejar $35^\\circ$ a cada lado.', 'Las dos distancias son las perpendiculares punteadas. ¿Sobre qué rayo especial del ángulo quedan iguales?'),
    x('razones-paso', 'P está en la bisectriz del ángulo O, y PM y PN son perpendiculares a los lados. Los dos triángulos comparten OP. Pon la razón de cada paso para demostrar que $PM \\cong PN$.', { fig: 'equidista', et: ['∠MOP ≅ ∠NOP', '∠M ≅ ∠N', '△OMP ≅ △ONP', 'PM ≅ PN'], metas: ['bisectriz', 'ángulos rectos', 'H-A', 'partes corresp.'], fichas: ['bisectriz', 'ángulos rectos', 'H-A', 'partes corresp.', 'C-C', 'mediatriz', 'L-L-L'],
      mira: ['OP parte el ángulo O en dos congruentes: eso hace una bisectriz.', 'PM y PN son perpendiculares a los lados.', 'OP es hipotenusa de los dos triángulos, y hay un ángulo agudo congruente.', 'PM y PN ocupan el mismo lugar en dos triángulos congruentes.'], trampas: { '2:C-C': 'No se conoce ningún par de catetos congruentes: eso es lo que se quiere demostrar.', '0:mediatriz': 'La mediatriz es de un segmento; aquí se parte un ángulo.' }, ok: 'Bisectriz, ángulos rectos, hipotenusa-ángulo y partes correspondientes.' },
      'La bisectriz da un ángulo agudo congruente, las perpendiculares dan los rectos y OP es hipotenusa común: H-A. Luego PM y PN se corresponden.', 'El lado OP queda frente al ángulo recto en los dos triángulos. ¿Qué nombre tiene ese lado?'),
    x('nombra-criterio', 'Los tres pares son de triángulos **rectángulos**. Pon el criterio que asegura la congruencia de cada par, o «ninguno».', { casos: [{ r: 1, l: [2, 1] }, { r: 1, l: [0], a: [1] }, { r: 1, a: [0, 1] }], fichas: ['H-C', 'C-A', 'ninguno', 'H-A', 'C-C', 'L-L-L'] },
      'Par 1: hipotenusa y un cateto, H-C. Par 2: un cateto y un ángulo agudo, C-A. Par 3: solo ángulos, que no fijan el tamaño: ninguno.', 'Nombra lo marcado: H para la hipotenusa (frente al ángulo recto), C para un cateto y A para un ángulo agudo.'),
    x('sube-movimiento', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'P está en la **mediatriz** de AB y $PA = 18$. ¿Cuánto mide PB?', r: 18, c: 'PB = PA', e: { 36: 'No se duplica: P está igual de lejos de A que de B.', 10: 'La mediatriz parte a AB, no a PA.' } },
      { q: 'Q está en la **bisectriz** de un ángulo, a 14 de uno de sus lados. ¿A cuánto está del otro lado?', r: 14, c: 'd_1 = d_2', e: { 28: 'No se suman: está a la misma distancia de los dos lados.' } },
      { q: 'Dos triángulos rectángulos son congruentes por **H-C**: hipotenusas de 26 y un cateto de 10 en cada uno. El otro cateto de uno mide 24. ¿Y el del otro?', r: 24, c: 'DF = AC', e: { 26: 'Esa es la hipotenusa.', 10: 'Ese es el cateto que ya se conocía.' } }] },
      'Un punto de la mediatriz equidista de los extremos (18); uno de la bisectriz, de los lados (14); y en triángulos congruentes las partes correspondientes miden lo mismo (24).', 'Mediatriz: misma distancia a los extremos. Bisectriz: misma distancia a los lados. Congruentes: todo se repite.'),
    sol('P es un punto de la mediatriz del segmento AB, y M es el punto medio de AB. Demuestra que $PA \\cong PB$.', ['$AM \\cong MB$, porque M es [[punto medio]]', '$\\angle PMA \\cong \\angle PMB$, porque son [[ángulos rectos]]', '$PM \\cong PM$, porque es un [[lado común]]', '$\\triangle PMA \\cong \\triangle PMB$ por [[C-C]]', '$PA \\cong PB$, por ser [[partes correspondientes]]'], ['H-A', 'bisectriz', 'L-L-L'],
      'Los dos triángulos son rectángulos en M y tienen sus dos catetos congruentes (AM con MB y PM común): cateto-cateto. PA y PB son sus hipotenusas.', 'La mediatriz es perpendicular a AB en su punto medio: de ahí salen el ángulo recto y los dos trozos congruentes.'),
    err('De los triángulos ABC y DEF se sabe que $\\angle A \\cong \\angle D$, $\\angle B \\cong \\angle E$ y $BC \\cong EF$. ¿Son congruentes?', ['Hay dos pares de ángulos congruentes', 'Hay un par de lados congruentes: BC con EF', 'El lado BC está comprendido entre los ángulos A y B', 'Con esos datos se busca el criterio que aplica'], 2, ['El lado BC es opuesto al ángulo A: se aplica L-A-A', 'El lado BC está comprendido entre los ángulos A y C', 'El lado BC es opuesto al ángulo B: se aplica L-L-A'],
      'BC no toca al vértice A: es su lado opuesto. Dos ángulos y un lado opuesto a uno de ellos es L-A-A, y los triángulos sí son congruentes.', 'El lado comprendido entre A y B es AB. ¿Dónde queda BC respecto al ángulo A?'),
    opc('Dos triángulos rectángulos tienen las hipotenusas congruentes y un cateto del primero congruente con un cateto del segundo. Entonces:', ['no se puede asegurar que sean congruentes, porque es L-L-A', 'son congruentes por H-C', 'son congruentes por C-C', 'son congruentes por A-A-A'], 1, 'Hipotenusa y cateto es un criterio para triángulos rectángulos: el ángulo recto hace que L-L-A sí funcione.', 'Recuerda la lista de criterios propios de los triángulos rectángulos: uno de ellos usa la hipotenusa y un cateto.'),
  ]);

  return mundo('euc-triangulo', [l1, l2, l3, l4], [
    ['euc-triangulo-1', 'La bisectriz parte el ángulo del vértice en dos ángulos congruentes.', x('pie-notable', 'El lado BC mide **28**. Mueve el pie P hasta que AP sea la **bisectriz** del ángulo A.', { A: [18, 24], c: 28, pide: 'bisectriz', ini: 3 },
      'La bisectriz deja dos ángulos congruentes en A: eso pasa con P a 15 de B.', 'De las medidas que ves, usa la que habla de los ángulos en A.')],
    ['euc-triangulo-1', 'Cada triángulo tiene un nombre por sus lados y otro por sus ángulos.', x('dos-apellidos', 'Ponle al triángulo su nombre por los lados y su nombre por los ángulos.', { pts: [[0, 0], [6, 0], [0, 4]], fichas: TIPOS },
      'Tres marcas distintas: escaleno. Una esquina recta: rectángulo.', 'Cuenta las rayitas de cada lado y busca la esquina marcada.')],
    ['euc-triangulo-1', 'La altura es perpendicular al lado opuesto o a su prolongación.', opc('En el triángulo ABC, el segmento AH llega al lado BC formando con él un ángulo recto. AH es:', ['una mediana', 'una bisectriz', 'un lado', 'una altura'], 3, 'Caer a escuadra sobre el lado opuesto es lo que define a la altura.', 'Piensa cuál segmento notable se define con una perpendicular.')],
    ['euc-triangulo-2', 'L-A-L: dos lados y el ángulo comprendido entre ellos.', x('arma-lal', 'Arma DEF congruente con ABC usando L-A-L. El lado DE ya mide lo mismo que AB.', { c: 8, b: 3, g: 60, a: 7 },
      'Se copian el ángulo en A, de 60°, y el lado AC, de 3.', 'Copia los dos lados que forman el ángulo conocido.')],
    ['euc-triangulo-2', 'En triángulos congruentes, las partes correspondientes son congruentes.', x('partes-correspondientes', 'Los triángulos son congruentes y llevan las mismas marcas. Pon la parte que corresponde a cada una.', { corr: 'FDE', pide: ['∠B', 'AC', 'AB'], fichas: ['∠D', '∠E', '∠F', 'DE', 'EF', 'DF'], esp: true, gira: 40 },
      'A va con F, B con D y C con E: ∠B ≅ ∠D, AC ≅ FE y AB ≅ FD.', 'Sigue el color de los arcos y el número de rayitas.')],
    ['euc-triangulo-2', 'A-L-A: un lado y los dos ángulos adyacentes a él.', opc('De dos triángulos se sabe que $\\angle A \\cong \\angle D$, $AB \\cong DE$ y $\\angle B \\cong \\angle E$. Son congruentes por:', ['L-A-L', 'A-L-A', 'L-L-L', 'no se puede asegurar'], 1, 'El lado AB une los vértices A y B: está entre los dos ángulos. Es A-L-A.', 'Mira si el lado conocido une los dos ángulos conocidos.')],
    ['euc-triangulo-3', 'Cada lado es menor que la suma y mayor que la diferencia de los otros dos.', x('tercer-lado', 'Dos varillas miden **10** y **6**. ¿Entre qué enteros puede medir la tercera para que el triángulo cierre?', { a: 10, b: 6, max: 16 },
      'Más que $10 - 6 = 4$ y menos que $10 + 6 = 16$: de 5 a 15.', 'Halla la diferencia y la suma: la tercera queda entre ellas.')],
    ['euc-triangulo-3', 'A mayor lado se opone mayor ángulo, y viceversa.', x('angulos-por-lados', 'Los lados miden 7, 12 y 8 (la figura no está a escala). Ordena los ángulos.', { l: [7, 12, 8], fichas: RANGO },
      'Frente a 12 (AC) está B, el mayor; frente a 8 está C; frente a 7 está A, el menor.', 'Cada ángulo mira al lado que no lo toca.')],
    ['euc-triangulo-3', 'El ángulo exterior es mayor que cada interior no adyacente.', opc('Un ángulo exterior de un triángulo mide 100°. Uno de los ángulos interiores no adyacentes a él podría medir:', ['64°', '100°', '115°', '180°'], 0, 'Tiene que ser menor que 100°: de las opciones, solo 64°.', 'El exterior le gana a cada interior no adyacente.')],
    ['euc-triangulo-4', 'Todo punto de la mediatriz equidista de los extremos del segmento.', x('punto-equidista', 'Arrastra P hasta un punto a igual distancia de A y de B que no sea el punto medio.', { A: [3, 6], B: [9, 2], ini: [2, 2], sol: [4, 1] },
      'La mediatriz pasa por el punto medio y es perpendicular a AB.', 'Desde el punto medio, cambia de lugar los pasos de A a B.')],
    ['euc-triangulo-4', 'L-A-A, C-C, C-A, H-A y H-C; L-L-A y A-A-A no son criterios.', x('nombra-criterio', 'Pon el criterio que asegura la congruencia de cada par, o «ninguno». Solo el par 2 es de triángulos rectángulos.', { casos: [{ l: [0], a: [0, 1] }, { r: 1, l: [0, 1] }, { l: [0, 2], a: [0] }], fichas: ['L-A-A', 'C-C', 'ninguno', 'A-L-A', 'H-C', 'L-A-L'] },
      'Par 1: lado fuera de los dos ángulos, L-A-A. Par 2: dos catetos. Par 3: L-L-A, ninguno.', 'Mira si el lado está entre los ángulos, o el ángulo entre los lados.')],
    ['euc-triangulo-4', 'Todo punto de la bisectriz equidista de los lados del ángulo.', opc('Un punto T está en la bisectriz del ángulo XOY, a 9 cm del lado OX. Su distancia al lado OY es:', ['4.5 cm', '18 cm', '9 cm', 'no se puede saber'], 2, 'Los puntos de la bisectriz equidistan de los dos lados: 9 cm.', 'Recuerda qué propiedad tienen los puntos de la bisectriz.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-cuadrilateros.js
// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (spec 2026-11-26-curso-euclidiana). Números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  // ------------------------------------------------------------------------------------------- 1 · paralelas y perpendiculares
  const l1 = leccion('euc-cuadrilateros-1', 'Paralelas y perpendiculares', guion(
    ['Una sola perpendicular', 'Por un punto pasa una y solo una recta perpendicular a una recta dada.'],
    ['La distancia', 'La distancia de un punto a una recta es el segmento perpendicular: es más corto que cualquier oblicua.'],
    ['Paralelas', 'Dos rectas de un plano que no se cortan son paralelas. Por un punto exterior a una recta pasa una sola paralela a ella.'],
    ['Perpendiculares a la misma recta', 'Dos rectas perpendiculares a una misma recta son paralelas entre sí.'],
    ['Paralelas a una tercera', 'Dos rectas paralelas a una tercera son paralelas entre sí; y una perpendicular a una de dos paralelas lo es a la otra.']), [
    x('pie-perpendicular', 'Desde el punto **P** se tiende un cable hasta la recta **r**. Corre el pie **F** hasta que el cable sea el **más corto** posible.', { o: [0, 1], d: [1, 0.5], n: 12, P: [4, 8], t0: 1 },
      'El segmento más corto de un punto a una recta es el de la perpendicular: cae a escuadra sobre r y mide $\\sqrt{20} \\approx 4.5$ cuadros. Cualquier oblicua mide más.', 'Mira los dos ángulos que el cable forma con la recta, a un lado y al otro del pie: ¿en qué posición quedan iguales?'),
    x('traza-paralela', 'La recta **r** pasa por los dos puntos marcados. Arrastra **D** para que la recta que pasa por **P** y por D sea **paralela** a r.', { A: [1, 1], B: [4, 2], P: [3, 5], ini: [8, 4] },
      'La recta r sube 1 cuadro por cada 3 que avanza. La paralela por P repite ese paso: de (3, 5) llega a (6, 6). Por P no pasa ninguna otra paralela a r.', 'Cuenta cuánto avanza y cuánto sube la recta r entre sus dos puntos, y repite ese mismo paso saliendo de P.'),
    x('traza-perpendicular', 'La recta dorada **r** es perpendicular a **t**. Sin copiar a r, arrastra **D** para trazar por **P** otra perpendicular a t.', { A: [1, 2], B: [5, 4], Q: [3, 3], P: [7, 5], ini: [10, 6] },
      'La recta t sube 1 por cada 2; la perpendicular gira ese paso un cuarto de vuelta: avanza 1 y baja 2, de (7, 5) a (8, 3) (o retrocede 1 y sube 2). Como las dos son perpendiculares a t, quedan paralelas.', 'Un cuarto de vuelta intercambia lo que se avanza con lo que se sube. Cuenta el paso de t y gíralo.'),
    x('paralelas-seguro', 'En un plano hay tres rectas distintas: **r**, **s** y **t**. Toca **todas** las condiciones que garantizan que r y s son **paralelas**.', { casos: [
      { t: 'r ⊥ t  y  s ⊥ t', si: true },
      { t: 'r corta a t  y  s corta a t', no: 'Cortar a la misma recta no basta: r y s pueden cortarse entre sí.' },
      { t: 'r ∥ t  y  s ∥ t', si: true },
      { t: 'r ⊥ t  y  s ∥ t', no: 'Si s es paralela a t y r es perpendicular a t, entonces r también es perpendicular a s.' },
      { t: 'r y s no tienen ningún punto común', si: true }],
    falta: 'Falta alguna condición que sí lo garantiza.', ok: 'Perpendiculares a una misma recta, paralelas a una tercera, o sin puntos comunes.' },
      'Dos perpendiculares a una misma recta son paralelas; dos paralelas a una tercera también; y no tener puntos comunes es la definición de paralelas en un plano.', 'Imagina cada caso con tres lápices sobre la mesa y pregúntate si r y s podrían llegar a cortarse.'),
    x('cuantas-rectas', 'En un plano, **r** es una recta y **P** un punto. Pon **cuántas** rectas hay de cada clase.', {
      et: ['Perpendiculares a r por P', 'Paralelas a r por P, exterior a r', 'Rectas por P que cortan a r', 'Perpendiculares a r, en total'],
      metas: ['una', 'una', 'infinitas', 'infinitas'], fichas: ['una', 'una', 'infinitas', 'infinitas', 'ninguna', 'dos'],
      mira: ['Por un punto pasa una sola perpendicular a una recta dada.', 'Postulado de las paralelas: por un punto exterior pasa una sola.', 'Cada punto de r, unido con P, da una recta distinta.', 'Por cada punto de r se levanta una perpendicular distinta.'],
      trampas: { '1:infinitas': 'Si la paralela se gira un poco, termina cortando a r: solo sirve una posición.', '1:ninguna': 'Siempre existe una paralela por un punto exterior, y es única.', '0:dos': 'Si hubiera dos perpendiculares por P, formarían un triángulo con dos ángulos rectos.' },
      ok: 'Una perpendicular y una paralela por cada punto; secantes, las que se quiera.' },
      'Por P pasa una sola perpendicular y, si P es exterior, una sola paralela. En cambio hay infinitas secantes por P, e infinitas perpendiculares a r (una por cada punto).', 'Fíjate en si la pregunta amarra la recta a un punto fijo o la deja libre.'),
    x('relacion-rectas', 'De cinco rectas de un plano solo se sabe lo que dice la tarjeta. Deduce la relación de cada pareja: **∥** o **⊥**.', {
      da: ['a ⊥ t', 'b ⊥ t', 'c ∥ b', 'd ⊥ c'], et: ['a y b', 'a y c', 'c y t', 'd y t'], metas: ['∥', '∥', '⊥', '∥'], fichas: ['∥', '∥', '∥', '⊥', '⊥', '∥'],
      lin: [[14, 104, 314, 104, 't'], [70, 124, 70, 14, 'a', 'la gr'], [150, 124, 150, 14, 'b', 'la gr'], [230, 124, 230, 14, 'c', 'lg gr'], [196, 44, 300, 44, 'd', 'lf gr']], esc: [[70, 104], [150, 104], [230, 104], [230, 44]],
      mira: ['Las dos son perpendiculares a t: dos perpendiculares a una misma recta son paralelas.', 'c es paralela a b, y b es paralela a la recta a: paralelas a una tercera.', 't es perpendicular a b; entonces también lo es a su paralela c.', 'd y t son perpendiculares a la misma recta, c.'],
      trampas: {}, ok: 'Todo sale de dos ideas: perpendiculares a una misma recta y paralelas a una tercera.' },
      'a ∥ b (perpendiculares a t); a ∥ c (paralelas a b); c ⊥ t (t es perpendicular a una de dos paralelas); d ∥ t (las dos perpendiculares a c).', 'Haz un dibujo aparte: empieza por t y ve agregando una recta por cada dato.'),
    x('sube-distancia', 'Sube a la distancia que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'De **P** salen hacia una recta tres segmentos, de 17, 15 y 19. Solo el de 15 llega a escuadra. ¿Cuál es la distancia de P a la recta?', r: 15, c: 'd(P, r)', e: { 17: 'Ese es una oblicua: mide más que la perpendicular.', 19: 'Ese es una oblicua: mide más que la perpendicular.' } },
      { q: 'Tres rectas paralelas: de **r** a **s** hay 8 y de **s** a **t** hay 13, con s en medio. ¿Qué distancia hay de r a t?', r: 21, c: '8 + 13', e: { 5: 'Con s en medio, las dos distancias se suman.' } },
      { q: 'Dos paralelas están a 34 de distancia. Un punto **entre** ellas queda a 9 de una. ¿A cuánto queda de la otra?', r: 25, c: '34 - 9', e: { 43: 'El punto está entre las dos: se resta.' } }] },
      'La distancia es el segmento perpendicular: 15. Entre paralelas la distancia es la misma en todas partes: $8 + 13 = 21$ y $34 - 9 = 25$.', 'La distancia siempre se mide a escuadra. Dibuja las paralelas y marca cada dato sobre una misma perpendicular.'),
    sol('En un plano, las rectas distintas r y s son perpendiculares a la recta t. Demuestra que r y s son paralelas.', [
      'Supongamos lo contrario, que r y s se cortan en un punto P: es el método [[indirecto]]',
      'Entonces por P pasarían [[dos]] rectas perpendiculares a t',
      'Pero por un punto pasa [[una sola]] perpendicular a una recta dada',
      'La suposición lleva a una contradicción: r y s son [[paralelas]]'], ['directo', 'infinitas', 'perpendiculares'],
      'Si se cortaran en P, por P habría dos perpendiculares a t, lo que contradice la unicidad de la perpendicular. Luego no se cortan.', 'Supón que sí se cortan y busca qué teorema conocido quedaría contradicho.'),
    err('Desde un punto P se mide hasta una pared recta en tres direcciones: 5 m, 4 m y 4.2 m. Solo la medida de 4 m forma ángulo recto con la pared. ¿Cuál es la distancia de P a la pared?', [
      'La distancia de un punto a una recta se mide sobre la perpendicular', 'El segmento perpendicular es el de 4 m', 'Las otras dos medidas son de segmentos oblicuos', 'Como hay tres medidas, la distancia es su promedio: 4.4 m'], 3,
      ['La distancia es 4 m: el segmento perpendicular es el más corto', 'La distancia es 5 m: se toma la medida mayor', 'La distancia es 4.2 m: se toma la medida del medio'],
      'La distancia es la medida del segmento perpendicular, 4 m; las oblicuas siempre miden más y no entran en la cuenta.', '¿Cuál de las tres medidas corresponde a la definición de distancia de un punto a una recta?'),
    opc('En un plano, la recta m es perpendicular a la recta k, y la recta n es paralela a m. Entonces las rectas n y k:', ['son paralelas', 'son perpendiculares', 'forman un ángulo de 45°', 'no se cortan'], 1,
      'Si una recta es perpendicular a una de dos paralelas, también es perpendicular a la otra: k ⊥ m y m ∥ n dan k ⊥ n.', 'Dibuja primero las dos paralelas y luego la recta que cae a escuadra sobre una de ellas.'),
  ]);

  // ------------------------------------------------------------------------------------------- 2 · ángulos entre paralelas y en polígonos
  const l2 = leccion('euc-cuadrilateros-2', 'Ángulos entre paralelas y en polígonos', guion(
    ['Los pares de ángulos', 'Una transversal que corta dos rectas forma ángulos alternos internos, alternos externos, correspondientes y colaterales.'],
    ['Si son paralelas', 'Entre paralelas, los alternos y los correspondientes son congruentes, y los colaterales son suplementarios.'],
    ['Y al revés', 'Si un par de alternos o de correspondientes es congruente, o los colaterales son suplementarios, las rectas son paralelas.'],
    ['El triángulo', 'Los ángulos interiores de un triángulo suman 180°, y un exterior mide la suma de los dos interiores no adyacentes.'],
    ['Polígonos', 'Los ángulos interiores de un polígono de n lados suman (n − 2) · 180°; los exteriores, uno por vértice, suman 360°.']), [
    x('cruce-ocho', 'Las dos rectas horizontales son **paralelas**. Con el ángulo que se da, pon los cuatro que faltan.', { a: 68, fichas: ['68°', '68°', '68°', '112°', '112°', '22°'] },
      'Correspondientes, alternos internos y opuestos por el vértice son congruentes: 68°. El colateral interior es su suplemento: $180^\\circ - 68^\\circ = 112^\\circ$.', 'Nombra cada pareja antes de poner la ficha: ¿es de las que son congruentes o de las que son suplementarias?'),
    x('nombra-pares', 'Una transversal corta dos rectas y forma ocho ángulos. Pon el **nombre** de cada pareja.', { pares: [[3, 6], [1, 5], [4, 6], [2, 7]], fichas: ['alternos internos', 'correspondientes', 'colaterales', 'alternos externos', 'op. por el vértice', 'correspondientes'] },
      '3 y 6 están adentro y a lados distintos: alternos internos. 1 y 5 ocupan la misma esquina: correspondientes. 4 y 6, adentro y del mismo lado: colaterales. 2 y 7, afuera y a lados distintos: alternos externos.', 'Para cada pareja responde dos cosas: ¿están entre las rectas o fuera?, ¿del mismo lado de la transversal o a lados distintos?'),
    x('endereza-paralela', 'El ángulo de arriba mide $100^\\circ$ y el de abajo es su **colateral interior**. Gira la recta ℓ₂ hasta que se pueda asegurar que ℓ₁ y ℓ₂ son **paralelas**.', { t: 80, modo: 'col', b0: 10 },
      'Si los colaterales interiores son suplementarios, las rectas son paralelas: el de abajo debe medir $180^\\circ - 100^\\circ = 80^\\circ$.', 'Los colaterales interiores no se comparan como los alternos. ¿Qué deben cumplir juntos los dos ángulos?'),
    x('tercer-angulo', 'Una cercha tiene forma de triángulo con los dos ángulos de la base **congruentes**, y el de arriba debe medir $96^\\circ$. Ajústala.', { top: 96 },
      'Los tres suman 180°: para los dos de la base quedan $180^\\circ - 96^\\circ = 84^\\circ$, es decir, 42° cada uno.', 'Quita el ángulo de arriba de la suma de los tres y reparte lo que queda.'),
    x('exterior-alcanza', 'Corre el vértice de la derecha hasta que el ángulo **exterior** mida $120^\\circ$.', { a: 65, ext: 120 },
      'El exterior mide la suma de los dos interiores no adyacentes: $65^\\circ + 55^\\circ = 120^\\circ$.', 'El exterior se arma con los dos ángulos interiores que no lo tocan.'),
    x('poligono-regular', 'El marco de un reloj es un polígono **regular** con ángulos interiores de $144^\\circ$. Elige cuántos lados tiene.', { ang: 144 },
      'Cada exterior mide $180^\\circ - 144^\\circ = 36^\\circ$ y todos suman 360°: $360 \\div 36 = 10$ lados. También $(10 - 2) \\cdot 180^\\circ \\div 10 = 144^\\circ$.', 'Piensa en el ángulo exterior de cada vértice: todos juntos completan una vuelta.'),
    x('lanza-angulo', 'El faro gira desde la derecha. Dale el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'Entre dos paralelas, un ángulo mide $55^\\circ$. Su **colateral interior**', r: 125, c: '180^\\circ - 55^\\circ', e: { 55: 'Los colaterales no son congruentes: son suplementarios.' } },
      { q: 'Cada ángulo **exterior** de un polígono regular de 18 lados', r: 20, c: '360^\\circ \\div 18', e: { 160: 'Ese es el interior: el exterior es lo que le falta para 180°.' } },
      { q: 'Un exterior de un triángulo mide $150^\\circ$ y un interior no adyacente, $85^\\circ$. El **otro** no adyacente', r: 65, c: '150^\\circ - 85^\\circ', e: { 30: 'Ese es el interior adyacente al exterior.' } }] },
      '$180 - 55 = 125$; $360 \\div 12 = 30$; $150 - 85 = 65$.', 'Colaterales: suplementarios. Exteriores de un polígono: suman 360°. Exterior de un triángulo: suma de los dos no adyacentes.'),
    sol('Demuestra que los ángulos interiores del triángulo ABC suman $180^\\circ$. Por C se traza la recta m paralela a AB; sobre m, a los lados del ángulo C, quedan los ángulos 1 y 2.', [
      'Por C pasa una sola paralela a AB: postulado de las [[paralelas]]',
      '$\\angle 1 \\cong \\angle A$ por ser [[alternos internos]] entre paralelas',
      '$\\angle 2 \\cong \\angle B$ por la misma razón',
      '$\\angle 1 + \\angle C + \\angle 2 =$ [[180°]] porque forman un ángulo [[llano]]',
      'Al sustituir: $\\angle A + \\angle C + \\angle B = 180^\\circ$'], ['correspondientes', 'recto', '360°', 'colaterales'],
      'La paralela por C copia los ángulos A y B como alternos internos; los tres juntos llenan un ángulo llano.', 'Los ángulos 1 y A quedan entre las paralelas, a lados distintos de la transversal AC.'),
    err('Se quiere hallar la suma de los ángulos interiores de un octágono partiéndolo en triángulos.', [
      'Desde un vértice se trazan todas las diagonales', 'Se forman tantos triángulos como lados: 8', 'Cada triángulo aporta $180^\\circ$ a la suma'], 1,
      ['Se forman dos triángulos menos que lados: 6', 'Se forman tantos triángulos como diagonales: 5', 'Se forma un triángulo más que lados: 9'],
      'Desde un vértice salen $n - 3$ diagonales y quedan $n - 2$ triángulos: $6 \\cdot 180^\\circ = 1\\,080^\\circ$.', 'Dibuja un cuadrilátero y un pentágono y cuenta los triángulos que salen desde un vértice.'),
    opc('Una transversal corta dos rectas y forma ángulos colaterales interiores de 72° y 108°. De las dos rectas se puede asegurar que:', ['son perpendiculares', 'se cortan del lado de esos ángulos', 'son paralelas', 'coinciden'], 2,
      '$72^\\circ + 108^\\circ = 180^\\circ$: si los colaterales interiores son suplementarios, las rectas son paralelas.', 'Suma los dos ángulos y recuerda el recíproco del teorema de los colaterales.'),
  ]);

  // ------------------------------------------------------------------------------------------- 3 · paralelogramos y trapecios
  const l3 = leccion('euc-cuadrilateros-3', 'Paralelogramos y trapecios', guion(
    ['Paralelogramo', 'Tiene los lados opuestos paralelos. Por eso sus lados y ángulos opuestos son congruentes, los consecutivos son suplementarios y las diagonales se bisecan.'],
    ['Cómo reconocerlo', 'Basta una de estas: lados opuestos congruentes, ángulos opuestos congruentes, diagonales que se bisecan, o un par de lados paralelos y congruentes.'],
    ['Rectángulo y rombo', 'En el rectángulo las diagonales son congruentes; en el rombo son perpendiculares y bisectrices de sus ángulos.'],
    ['Cuadrado', 'Es rectángulo y rombo a la vez: sus diagonales son congruentes, perpendiculares y se bisecan.'],
    ['Trapecio', 'Tiene un solo par de lados paralelos. En el isósceles, los lados no paralelos, los ángulos de cada base y las diagonales son congruentes.']), [
    x('cuarto-vertice', 'A, B y C son tres vértices seguidos de un **paralelogramo**. Arrastra el cuarto vértice, **D**, a su lugar.', { A: [-4, -1], B: [1, -3], C: [3, 2] },
      'Los lados opuestos son paralelos y congruentes: de B a A se retrocede 5 y se sube 2; lo mismo desde C lleva a D = (−2, 4).', 'El lado CD debe ser una copia del lado BA: mismo largo y misma inclinación.'),
    x('paralelogramo-especial', 'ABCD es un paralelogramo con la base AB fija, de 5 cuadros. Arrastra **C** hasta que sea un **rombo** sin ángulos rectos.', { A: [1, 1], B: [6, 1], ini: [8, 3], tipo: 'rombo' },
      'En el rombo los cuatro lados son congruentes: BC debe medir 5. Con 3 cuadros a la derecha y 4 hacia arriba, $\\sqrt{9 + 16} = 5$.', 'El lado BC debe medir lo mismo que AB. ¿Qué triángulo rectángulo de lados enteros tiene hipotenusa 5?'),
    x('diagonales-cruce', 'AC y BD son las diagonales de un cuadrilátero. Mueve el cruce **M** y desliza la diagonal BD hasta que ABCD sea un **paralelogramo**.', { n: 10, m: 8, g: 60, t0: 3, s0: 6 },
      'Si las diagonales se cortan en sus puntos medios, el cuadrilátero es un paralelogramo: $AM = MC = 5$ y $BM = MD = 4$.', 'En un paralelogramo, ¿en qué punto de cada diagonal queda el cruce? Cuenta las marcas a cada lado.'),
    x('angulos-paralelogramo', 'En el paralelogramo ABCD, el ángulo A mide $64^\\circ$. Pon la medida de los otros tres.', { a: 64, fichas: ['64°', '116°', '116°', '26°', '64°', '126°'] },
      'El opuesto es congruente: C = 64°. Los consecutivos son suplementarios: B = D = $180^\\circ - 64^\\circ = 116^\\circ$.', 'Los lados AD y BC son paralelos y AB es una transversal: ¿qué pareja de ángulos forman A y B?'),
    x('trapecio-isosceles', 'AB es la base mayor y D ya está puesto. Arrastra **C** para que ABCD sea un **trapecio isósceles**.', { A: [1, 1], B: [11, 1], D: [3, 6], ini: [7, 4] },
      'DC debe ser paralela a AB (a la misma altura que D) y BC congruente con AD: D está 2 cuadros adentro desde A, así que C queda 2 adentro desde B, en (9, 6).', 'Dos condiciones: una base paralela a la otra y los lados no paralelos congruentes. El trapecio isósceles tiene un eje de simetría.'),
    x('siempre-paralelogramo', 'De un cuadrilátero solo se sabe lo que dice cada tarjeta. Toca **todas** las que garantizan que es un **paralelogramo**.', { casos: [
      { t: 'Los lados opuestos son congruentes', si: true },
      { t: 'Las diagonales son congruentes', no: 'Un trapecio isósceles tiene las diagonales congruentes y no es un paralelogramo.' },
      { t: 'Las diagonales se bisecan', si: true },
      { t: 'Un par de lados paralelos y congruentes', si: true },
      { t: 'Un par paralelo y el otro congruente', no: 'Eso también lo cumple un trapecio isósceles: bases paralelas y lados congruentes.' },
      { t: 'Los ángulos opuestos son congruentes', si: true }],
    falta: 'Falta alguna condición que sí lo garantiza.', ok: 'Son los cuatro recíprocos que caracterizan al paralelogramo.' },
      'Lados opuestos congruentes, ángulos opuestos congruentes, diagonales que se bisecan, o un par de lados paralelos y congruentes: cada una basta. Las otras dos las cumple un trapecio isósceles.', 'Para descartar una tarjeta basta un contraejemplo: prueba con un trapecio isósceles.'),
    x('que-cuadrilatero', 'Cada renglón describe un cuadrilátero por sus lados o sus diagonales. Pon el nombre **más preciso**.', {
      et: ['Paralelogramo, diagonales ≅', 'Paralelogramo, diagonales ⊥', 'Un solo par de lados paralelos', 'Diagonales ≅, ⊥ y se bisecan'],
      metas: ['rectángulo', 'rombo', 'trapecio', 'cuadrado'], fichas: ['rectángulo', 'rombo', 'trapecio', 'cuadrado', 'paralelogramo', 'trapezoide'],
      mira: ['Un paralelogramo con diagonales congruentes es un rectángulo.', 'Un paralelogramo con diagonales perpendiculares es un rombo.', 'Con un solo par de lados paralelos es un trapecio.', 'Si se bisecan es paralelogramo; congruentes y perpendiculares: cuadrado.'],
      trampas: { '0:rombo': 'En el rombo las diagonales son perpendiculares; las congruentes son las del rectángulo.', '1:rectángulo': 'En el rectángulo las diagonales son congruentes; las perpendiculares son las del rombo.', '3:rombo': 'Además de perpendiculares son congruentes: es más que un rombo.', '3:rectángulo': 'Además de congruentes son perpendiculares: es más que un rectángulo.' },
      ok: 'Las diagonales delatan al cuadrilátero.' },
      'Diagonales congruentes en un paralelogramo: rectángulo. Perpendiculares: rombo. Las dos cosas: cuadrado. Un solo par de lados paralelos: trapecio.', 'Piensa en las diagonales de cada figura: ¿cuáles miden lo mismo?, ¿cuáles se cortan a escuadra?'),
    x('abre-marco', 'El marco articulado se abre con el ángulo que le des. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un ángulo de un paralelogramo mide $115^\\circ$. Abre el marco con el ángulo **consecutivo**.', r: 65, c: '180^\\circ - 115^\\circ', e: { 115: 'Ese es el opuesto: el consecutivo es su suplemento.' } },
      { q: 'En un rombo, un ángulo mide $50^\\circ$. Abre el marco con el ángulo que forma la **diagonal** con un lado en ese vértice.', r: 25, c: '50^\\circ \\div 2', e: { 50: 'La diagonal del rombo es bisectriz: parte ese ángulo en dos.' } },
      { q: 'En un trapecio isósceles, un ángulo de la base mayor mide $70^\\circ$. Abre el marco con un ángulo de la **base menor**.', r: 110, c: '180^\\circ - 70^\\circ', e: { 70: 'Ese es el otro ángulo de la misma base: los de bases distintas son suplementarios.' } }] },
      '$180 - 115 = 65$; la diagonal del rombo biseca: $50 \\div 2 = 25$; entre las bases paralelas, colaterales: $180 - 70 = 110$.', 'Busca en cada figura las paralelas y la transversal: los ángulos consecutivos son colaterales interiores.'),
    sol('En el paralelogramo ABCD se traza la diagonal AC. Demuestra que los lados opuestos AB y CD son congruentes.', [
      '$\\angle BAC \\cong \\angle DCA$ por ser [[alternos internos]] entre $AB \\parallel CD$',
      '$\\angle BCA \\cong \\angle DAC$ por la misma razón, entre $BC \\parallel AD$',
      'AC es lado [[común]] de los triángulos ABC y CDA',
      '$\\triangle ABC \\cong \\triangle CDA$ por el criterio [[A-L-A]]',
      '$AB \\cong CD$ por ser lados [[correspondientes]] de triángulos congruentes'], ['L-L-L', 'colaterales', 'opuestos por el vértice'],
      'La diagonal es transversal de los dos pares de paralelas: da dos pares de alternos internos con el lado común entre ellos, que es A-L-A.', 'La diagonal parte al paralelogramo en dos triángulos: busca qué ángulos y qué lado comparten.'),
    err('Las dos diagonales de un cuadrilátero miden 10 cm. ¿Se puede asegurar que el cuadrilátero es un rectángulo?', [
      'En todo rectángulo las diagonales son congruentes', 'Este cuadrilátero tiene las diagonales congruentes', 'Por lo tanto, el cuadrilátero es un rectángulo'], 2,
      ['No se puede asegurar: falta saber que es un paralelogramo', 'Por lo tanto, el cuadrilátero es un rombo', 'Por lo tanto, el cuadrilátero es un cuadrado'],
      'El recíproco pide que sea un paralelogramo: un trapecio isósceles también tiene diagonales congruentes y no es rectángulo.', 'Se está usando un teorema al revés. ¿Con qué hipótesis vale su recíproco?'),
    opc('Las diagonales de un rombo miden 16 cm y 12 cm. Como se cortan perpendicularmente en sus puntos medios, cada lado del rombo mide:', ['14 cm', '20 cm', '28 cm', '10 cm'], 3,
      'Las mitades de las diagonales, 8 y 6, son catetos de un triángulo rectángulo cuya hipotenusa es el lado: $\\sqrt{64 + 36} = 10$.', 'Las diagonales parten al rombo en cuatro triángulos rectángulos congruentes.'),
  ]);

  // ------------------------------------------------------------------------------------------- 4 · rectas y puntos notables
  const l4 = leccion('euc-cuadrilateros-4', 'Rectas y puntos notables', guion(
    ['Paralela media', 'El segmento que une los puntos medios de dos lados de un triángulo es paralelo al tercer lado y mide la mitad.'],
    ['En el triángulo rectángulo', 'La mediana sobre la hipotenusa mide la mitad de ella; y si un ángulo mide 30°, el cateto opuesto es la mitad de la hipotenusa.'],
    ['Mediana del trapecio', 'Une los puntos medios de los lados no paralelos: es paralela a las bases y mide su semisuma.'],
    ['Baricentro', 'Las tres medianas se cortan en un punto situado a dos tercios de cada una, contando desde el vértice.'],
    ['Circuncentro, incentro y ortocentro', 'Las mediatrices se cortan en el punto que equidista de los vértices; las bisectrices, en el que equidista de los lados; las alturas, en el ortocentro.']), [
    x('paralela-media', 'En el triángulo ABC, **M** es el punto medio de AC y el lado AB mide **26**. Desliza **N** por CB hasta que MN sea **paralela** a AB.', { c: 26, n: 12, s0: 3 },
      'La paralela a un lado trazada por el punto medio de otro pasa por el punto medio del tercero: N parte a CB en 6 y 6, y MN mide $26 \\div 2 = 13$.', 'M parte su lado en dos partes iguales. ¿Cómo debe partir N al suyo para que MN no se incline?'),
    x('baricentro-desliza', 'La mediana **AM** mide **12**. Desliza **G** por ella hasta el **baricentro** del triángulo.', { n: 12, s0: 3 },
      'El baricentro está a dos tercios de la mediana desde el vértice: $AG = \\tfrac23 \\cdot 12 = 8$ y $GM = 4$.', 'El baricentro parte cada mediana en dos tramos, uno el doble del otro. ¿Cuál queda junto al vértice?'),
    x('centro-equidista', 'Tres antenas están en los vértices del triángulo. Arrastra la central hasta el punto que queda a **igual distancia de los tres vértices**.', { V: [[2, 2], [10, 2], [4, 8]], tipo: 'vertices', ini: [5, 5] },
      'Es el circuncentro, donde se cortan las mediatrices: la de AB es la vertical por (6, 2), y sobre ella el punto (6, 4) queda a $\\sqrt{20}$ de A, de B y de C.', 'Los puntos que equidistan de A y de B están en la mediatriz de AB. Empieza por ahí y luego compara con C.'),
    x('treinta-sesenta', 'Una rampa de **16** m se apoya en el piso. Sube o baja su punta hasta que forme $30^\\circ$ con el piso.', { c: 16, h0: 12 },
      'En el triángulo 30°-60°-90°, el cateto opuesto a 30° mide la mitad de la hipotenusa: $16 \\div 2 = 8$.', 'Ese triángulo es la mitad de uno equilátero: compara la altura de la punta con el largo de la rampa.'),
    x('medios-miden', 'Tres segmentos dorados: la mediana sobre la hipotenusa, una paralela media y la mediana de un trapecio. Pon cuánto mide cada uno.', {
      h: 34, b: 22, B: 15, b2: 9, et: ['mediana', 'paralela media', 'base media'], metas: ['17', '11', '12'], fichas: ['17', '11', '12', '24', '44', '6', '68'],
      mira: ['La mediana sobre la hipotenusa mide la mitad de la hipotenusa.', 'La paralela media mide la mitad del tercer lado.', 'La mediana del trapecio es la semisuma de las bases.'],
      trampas: { '2:24': 'Esa es la suma de las bases: falta partirla en dos.', '2:6': 'Esa es la diferencia de las bases: la mediana es la semisuma.', '0:68': 'Es la mitad de la hipotenusa, no el doble.', '1:44': 'Es la mitad del tercer lado, no el doble.' },
      ok: 'Dos mitades y un promedio.' },
      '$34 \\div 2 = 17$; $22 \\div 2 = 11$; $(15 + 9) \\div 2 = 12$.', 'En los dos triángulos el segmento dorado es una mitad; en el trapecio, un promedio.'),
    x('punto-de-que', 'Cada renglón describe un punto notable del triángulo. Pon su **nombre**.', {
      et: ['Corte de las medianas', 'Equidista de los vértices', 'Equidista de los lados', 'Corte de las alturas'],
      metas: ['baricentro', 'circuncentro', 'incentro', 'ortocentro'], fichas: ['baricentro', 'circuncentro', 'incentro', 'ortocentro', 'punto medio'],
      mira: ['Las medianas se cortan en el baricentro.', 'Está en las tres mediatrices: es el circuncentro.', 'Está en las tres bisectrices: es el incentro.', 'Las alturas se cortan en el ortocentro.'],
      trampas: { '1:incentro': 'El incentro equidista de los lados; de los vértices equidista el circuncentro.', '2:circuncentro': 'El circuncentro equidista de los vértices; de los lados equidista el incentro.', '0:ortocentro': 'El ortocentro es el corte de las alturas, no de las medianas.' },
      ok: 'Medianas, mediatrices, bisectrices y alturas: cada terna tiene su punto.' },
      'Medianas: baricentro. Mediatrices: circuncentro, que equidista de los vértices. Bisectrices: incentro, que equidista de los lados. Alturas: ortocentro.', 'La mediatriz reúne los puntos que equidistan de dos vértices; la bisectriz, los que equidistan de dos lados.'),
    x('trapecio-base', 'La base menor de un trapecio mide **7** y su mediana debe medir **12**. Estira la base mayor.', { b: 7, m: 12, B0: 9 },
      'La mediana es la semisuma de las bases: $\\tfrac{B + 7}{2} = 12$, así que $B = 24 - 7 = 17$.', 'La mediana es el promedio de las dos bases: si una está 5 por debajo de 12, ¿dónde debe estar la otra?'),
    x('lanza-escala', 'Manda el dron al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'La hipotenusa de un triángulo rectángulo mide 26. ¿Cuánto mide la **mediana** que llega a ella?', r: 13, c: '26 \\div 2', e: { 26: 'La mediana sobre la hipotenusa mide la mitad de ella.' } },
      { q: 'Una mediana de un triángulo mide 27. ¿A qué distancia del **vértice** está el baricentro?', r: 18, c: '\\tfrac23 \\cdot 27', e: { 9: 'Ese es el tramo que va del baricentro al lado.' } },
      { q: 'En un triángulo 30°-60°-90°, el cateto opuesto a $30^\\circ$ mide 14. ¿Cuánto mide la **hipotenusa**?', r: 28, c: '2 \\cdot 14', e: { 7: 'Al revés: la hipotenusa es el doble de ese cateto.' } }] },
      '$26 \\div 2 = 13$; $\\tfrac23 \\cdot 27 = 18$; $2 \\cdot 14 = 28$.', 'Mitad de la hipotenusa, dos tercios de la mediana y el doble del cateto opuesto a 30°.'),
    sol('En el triángulo ABC, M y N son los puntos medios de AB y AC, y BC mide 38 cm. La mediana AD mide 24 cm y G es el baricentro. Halla MN, AG y GD.', [
      'MN une dos puntos medios: es la [[paralela media]] y es paralela a BC',
      'Mide la mitad de BC: $38 \\div 2 =$ [[19]] cm',
      'G está a dos tercios desde el vértice: $AG = \\tfrac23 \\cdot 24 =$ [[16]] cm',
      'El resto de la mediana: $GD = 24 - 16 =$ [[8]] cm'], ['mediatriz', '76', '12'],
      'Paralela media: mitad del tercer lado, 19. Baricentro: 16 desde el vértice y 8 hasta el lado.', 'Una medida es una mitad; la otra, dos tercios contados desde el vértice.'),
    err('Las bases de un trapecio miden 10 cm y 18 cm. ¿Cuánto mide su mediana, el segmento que une los puntos medios de los lados no paralelos?', [
      'La mediana del trapecio es paralela a las bases', 'Su medida es la semidiferencia de las bases', 'Se reemplazan las dos bases en esa regla'], 1,
      ['Su medida es la semisuma de las bases: $\\tfrac{10 + 18}{2} = 14$ cm', 'Su medida es la suma de las bases: 28 cm', 'Su medida es la de la base mayor: 18 cm'],
      'La mediana mide la semisuma, 14 cm. La semidiferencia, 4 cm, es el segmento que une los puntos medios de las diagonales.', 'La mediana queda entre las dos bases: ¿puede medir menos que la base menor?'),
    opc('El punto de un triángulo que está a la misma distancia de sus tres lados es el:', ['incentro', 'circuncentro', 'baricentro', 'ortocentro'], 0,
      'Los puntos de una bisectriz equidistan de los lados del ángulo; el corte de las tres bisectrices, el incentro, equidista de los tres lados.', '¿Qué recta reúne a los puntos que equidistan de los dos lados de un ángulo?'),
  ]);

  return mundo('euc-cuadrilateros', [l1, l2, l3, l4], [
    ['euc-cuadrilateros-1', 'La distancia de un punto a una recta se mide sobre la perpendicular.', x('pie-perpendicular', 'Corre el pie **F** hasta que el segmento PF mida la **distancia** de P a la recta r.', { o: [0, 7], d: [1, -0.5], n: 12, P: [3, 3], t0: 10 },
      'La distancia es el segmento perpendicular: cae a escuadra sobre r y mide $\\sqrt5 \\approx 2.2$.', 'El segmento más corto forma ángulos iguales con la recta a ambos lados del pie.')],
    ['euc-cuadrilateros-1', 'Por un punto exterior a una recta pasa una sola paralela.', x('traza-paralela', 'Arrastra **D** para que la recta que pasa por **P** y por D sea **paralela** a r.', { A: [2, 7], B: [6, 5], P: [5, 2], ini: [9, 3] },
      'La recta r baja 1 por cada 2 que avanza; la paralela por P hace lo mismo: de (5, 2) a (7, 1).', 'Copia el paso de r, lo que avanza y lo que baja, saliendo desde P.')],
    ['euc-cuadrilateros-1', 'El segmento perpendicular es más corto que cualquier oblicua.', opc('Desde un punto exterior a una recta se trazan el segmento perpendicular, de 12 cm, y un segmento oblicuo. El oblicuo puede medir:', ['13 cm', '12 cm', '11 cm', '6 cm'], 0,
      'Toda oblicua mide más que la perpendicular: solo 13 cm supera a 12 cm.', 'Compara cada opción con la medida del segmento perpendicular.')],
    ['euc-cuadrilateros-2', 'Entre paralelas, los colaterales interiores son suplementarios.', x('conjugados-justos', 'Las rectas son paralelas. Inclina la transversal hasta que el colateral interior de arriba mida **30° más** que el de abajo.', { dif: 30 },
      '$x + (x + 30^\\circ) = 180^\\circ$: miden 75° y 105°.', 'Los dos colaterales suman 180°: reparte esa suma con 30° de diferencia.')],
    ['euc-cuadrilateros-2', 'Alternos internos congruentes obligan a que las rectas sean paralelas.', x('endereza-paralela', 'Los dos ángulos marcados son **alternos internos**. Gira la recta ℓ₂ hasta que se pueda asegurar que ℓ₁ y ℓ₂ son paralelas.', { t: 65, modo: 'alt', rot: -8, b0: -15 },
      'Si los alternos internos son congruentes, las rectas son paralelas: el de abajo debe medir 65°.', 'Compara las dos medidas: ¿qué deben cumplir los alternos internos?')],
    ['euc-cuadrilateros-2', 'Los ángulos interiores de un polígono suman (n − 2) · 180°.', opc('La suma de los ángulos interiores de un polígono es 1 980°. El polígono tiene:', ['11 lados', '13 lados', '12 lados', '15 lados'], 1,
      '$(n - 2) \\cdot 180^\\circ = 1\\,980^\\circ$ da $n - 2 = 11$: 13 lados.', 'Divide la suma entre 180° para saber cuántos triángulos hay.')],
    ['euc-cuadrilateros-3', 'Un paralelogramo con un ángulo recto es un rectángulo.', x('paralelogramo-especial', 'ABCD es un paralelogramo con el lado AB fijo. Arrastra **C** hasta que sea un **rectángulo**.', { A: [2, 1], B: [6, 3], ini: [7, 6], tipo: 'rectangulo' },
      'AB avanza 2 y sube 1; BC debe caer a escuadra: retrocede 1 y sube 2, hasta (5, 5).', 'Gira un cuarto de vuelta el paso de AB para trazar BC.')],
    ['euc-cuadrilateros-3', 'Si las diagonales se bisecan, el cuadrilátero es un paralelogramo.', x('diagonales-cruce', 'Mueve el cruce **M** y desliza la diagonal BD hasta que ABCD sea un **paralelogramo**.', { n: 12, m: 6, g: 110, t0: 9, s0: 2 },
      'El cruce debe ser punto medio de las dos: $AM = MC = 6$ y $BM = MD = 3$.', 'Cuenta las marcas a cada lado del cruce, en las dos diagonales.')],
    ['euc-cuadrilateros-3', 'El cuadrado reúne las propiedades del rectángulo y del rombo.', opc('Un paralelogramo cuyas diagonales son congruentes y además perpendiculares es un:', ['trapecio isósceles', 'rombo que no es cuadrado', 'cuadrado', 'rectángulo que no es cuadrado'], 2,
      'Diagonales congruentes: rectángulo. Perpendiculares: rombo. Las dos cosas a la vez: cuadrado.', 'Mira qué figura cumple cada propiedad por separado.')],
    ['euc-cuadrilateros-4', 'El incentro equidista de los tres lados del triángulo.', x('centro-equidista', 'Arrastra el punto hasta el lugar que queda a **igual distancia de los tres lados** del triángulo.', { V: [[2, 1], [10, 1], [2, 7]], tipo: 'lados', ini: [6, 2] },
      'Es el incentro: en (4, 3) queda a 2 cuadros de cada cateto y también a 2 de la hipotenusa.', 'Empieza por quedar a la misma distancia de los dos catetos y avanza por esa bisectriz.')],
    ['euc-cuadrilateros-4', 'El baricentro está a dos tercios de la mediana desde el vértice.', x('baricentro-desliza', 'La mediana **AM** mide **15**. Desliza **G** hasta el **baricentro**.', { n: 15, s0: 4 },
      '$AG = \\tfrac23 \\cdot 15 = 10$ y $GM = 5$.', 'El tramo junto al vértice es el doble del otro.')],
    ['euc-cuadrilateros-4', 'La mediana sobre la hipotenusa mide la mitad de la hipotenusa.', opc('Los catetos de un triángulo rectángulo miden 18 y 24. La mediana relativa a la hipotenusa mide:', ['21', '30', '12', '15'], 3,
      'La hipotenusa mide $\\sqrt{324 + 576} = 30$ y su mediana, la mitad: 15.', 'Halla primero la hipotenusa.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-circunferencia.js
// Geometría Euclidiana · mundo 5 «euc-circunferencia» (spec 2026-11-26-curso-euclidiana). Números y contextos propios.
// Juegos en js/games/euc-escena-5.js; explicaciones en js/explora-euc-5.js.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  const l1 = leccion('euc-circunferencia-1', 'Cuerdas, tangentes y posiciones relativas', guion(
    ['Radio, cuerda y diámetro', 'La circunferencia reúne los puntos a una misma distancia del centro: el radio. Una cuerda une dos de sus puntos, y la mayor de las cuerdas es el diámetro.'],
    ['Arcos', 'Un arco mide lo mismo que el ángulo central que lo interseca. Dos arcos seguidos se suman, y el arco mayor es lo que falta para 360°.'],
    ['La cuerda y el centro', 'El radio perpendicular a una cuerda la biseca, y biseca su arco. Cuerdas congruentes equidistan del centro.'],
    ['Tangente', 'Una recta es exterior, tangente o secante según su distancia al centro. La tangente es perpendicular al radio en el punto de tangencia, y los dos segmentos tangentes desde un punto exterior son congruentes.'],
    ['Dos circunferencias', 'Se comparan la distancia entre los centros con la suma y la resta de los radios: exteriores, tangentes, secantes, interiores o concéntricas.']), [
    x('nombra-circunferencia', 'En la figura hay cinco trazos numerados. Pon a cada número su **nombre**.', { pide: ['radio', 'diametro', 'cuerda', 'secante', 'tangente'], fichas: ['radio', 'diámetro', 'cuerda', 'secante', 'tangente', 'arco', 'apotema'] },
      'El radio sale del centro; la cuerda une dos puntos de la circunferencia y el diámetro es la que pasa por el centro; la secante corta en dos puntos y la tangente toca en uno solo.', 'Fíjate en cuántos puntos de la circunferencia toca cada trazo y en si pasa por el centro.'),
    x('arcos-suman', 'Los ángulos centrales $\\angle AOB$ y $\\angle BOC$ miden **75°** y **60°**. Pon la medida de cada arco.', { a: 75, b: 60, et: ['arco AB', 'arco BC', 'arco ABC', 'el resto'], ops: ['+', '=', ''], metas: ['75°', '60°', '135°', '225°'], fichas: ['75°', '60°', '135°', '225°', '150°', '285°', '15°'],
      mira: ['Un arco mide lo mismo que su ángulo central.', 'El arco BC mide lo que el ángulo BOC.', 'Dos arcos seguidos se suman.', 'El arco mayor es lo que le falta al menor para 360°.'], trampas: { '2:15°': 'Los arcos seguidos se suman, no se restan.', '3:285°': 'Quita de 360° el arco ABC completo, no solo un trozo.' }, ok: 'Cada arco mide lo que su ángulo central, y los arcos se suman.' },
      'Cada arco mide lo que su ángulo central: 75° y 60°. Juntos, $75^\\circ + 60^\\circ = 135^\\circ$, y el resto de la circunferencia mide $360^\\circ - 135^\\circ = 225^\\circ$.', 'El arco y su ángulo central tienen la misma medida; la circunferencia entera son 360°.'),
    x('cuerda-distancia', 'La circunferencia tiene radio **10**. Baja la cuerda hasta que mida **16**.', { r: 10, cuerda: 16 },
      'El radio perpendicular biseca la cuerda: media cuerda mide 8. Con el radio 10 de hipotenusa, la distancia es $\\sqrt{10^2 - 8^2} = 6$.', 'Traza el radio hasta un extremo de la cuerda: aparece un triángulo rectángulo con media cuerda.'),
    x('acerca-circulo', 'Un aro de radio **5** está fijo. Arrastra el centro de otro aro, de radio **3**, hasta donde los dos quedarían **tangentes interiores**.', { R: 5, r: 3, pos: 'ti' },
      'Tocarse por dentro exige que los centros estén a la resta de los radios: $5 - 3 = 2$. El punto de tangencia queda alineado con los dos centros.', 'El punto donde se tocan está en la misma recta que los dos centros: mide desde ahí cada radio.'),
    x('posicion-centros', 'Dos circunferencias tienen radios **7** y **4**. Según la distancia entre sus centros, pon cómo quedan.', { et: ['centros a 14', 'centros a 11', 'centros a 6', 'centros a 3', 'centros a 1'], metas: ['exteriores', 'tangentes ext.', 'secantes', 'tangentes int.', 'interiores'], fichas: ['exteriores', 'tangentes ext.', 'secantes', 'tangentes int.', 'interiores', 'concéntricas'],
      mira: ['14 es más que la suma de los radios, 11: ni se tocan.', '11 es justo la suma de los radios: se tocan por fuera.', '6 está entre la resta, 3, y la suma, 11: se cortan en dos puntos.', '3 es justo la resta de los radios: se tocan por dentro.', '1 es menos que la resta, 3: una queda dentro de la otra sin tocarla.'],
      trampas: { '4:concéntricas': 'Concéntricas solo si los centros coinciden: distancia 0.', '3:secantes': 'A distancia 3, que es 7 − 4, se tocan en un solo punto.' }, ok: 'Todo se decide comparando con la suma, 11, y la resta, 3.' },
      'La suma de los radios es 11 y la resta 3. Más de 11: exteriores; 11: tangentes exteriores; entre 3 y 11: secantes; 3: tangentes interiores; menos de 3: interiores.', 'Calcula primero la suma y la resta de los radios, y compara cada distancia con esos dos números.'),
    x('tangente-desde', 'El radio mide **5**. Aleja el punto P hasta que el segmento tangente PT mida **12**.', { r: 5, t: 12 },
      'La tangente es perpendicular al radio en T: el triángulo OTP es rectángulo y $OP = \\sqrt{5^2 + 12^2} = 13$.', 'El radio y la tangente forman un ángulo recto en T: OP es el lado que queda enfrente.'),
    x('tangentes-gemelas', 'La circunferencia toca los lados del triángulo en D, E y F. Se sabe que $AD = 4$, $BE = 6$ y $CF = 3$. Pon lo que falta.', { x: 4, y: 6, z: 3, et: ['AF', 'BD', 'CE', 'perímetro'], metas: ['4', '6', '3', '26'], fichas: ['4', '6', '3', '26', '13', '7', '10'],
      mira: ['AF y AD son los dos segmentos tangentes que salen de A: son congruentes.', 'BD y BE salen los dos de B: son congruentes.', 'CE y CF salen los dos de C: son congruentes.', 'Cada medida aparece dos veces en el borde del triángulo.'], trampas: { '3:13': 'Eso es la mitad: cada segmento tangente aparece dos veces.' }, ok: 'De cada vértice salen dos segmentos tangentes congruentes.' },
      'Los segmentos tangentes desde un mismo punto son congruentes: $AF = 4$, $BD = 6$, $CE = 3$. El perímetro es $2 \\cdot (4 + 6 + 3) = 26$.', 'Mira cada vértice como un punto exterior del que salen dos tangentes a la circunferencia.'),
    x('sube-distancia', 'Sube a la medida que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Radio **25**; una cuerda está a **7** del centro. ¿Cuánto mide la cuerda?', r: 48, c: '2\\sqrt{25^2 - 7^2}', e: { 24: 'Esa es media cuerda: el radio perpendicular la parte en dos mitades.', 18: 'Restaste: radio, media cuerda y distancia forman un triángulo rectángulo.' } },
      { q: 'P está a **17** del centro de una circunferencia de radio **8**. ¿Cuánto mide el segmento tangente desde P?', r: 15, c: '\\sqrt{17^2 - 8^2}', e: { 9: 'Restaste: la tangente y el radio son catetos, va Pitágoras.', 25: 'Sumaste: la distancia al centro es la hipotenusa.' } },
      { q: 'Dos circunferencias de radios **9** y **4** son tangentes interiores. ¿A qué distancia están sus centros?', r: 5, c: '9 - 4', e: { 13: 'Esa distancia es para las tangentes exteriores.' } }] },
      '$625 - 49 = 576 = 24^2$, y la cuerda es el doble: 48. $289 - 64 = 225 = 15^2$. Y por dentro, la resta de los radios: 5.', 'En los dos primeros hay un triángulo rectángulo con el radio; en el tercero, piensa en la recta de los centros.'),
    sol('Desde un punto exterior P se trazan los segmentos tangentes PA y PB a una circunferencia de centro O. Demuestra que $PA \\cong PB$.',
      ['$OA \\cong OB$, porque los dos son [[radios]]', 'Los ángulos $\\angle OAP$ y $\\angle OBP$ son [[rectos]]: la tangente es perpendicular al radio en el punto de tangencia', 'El lado $OP$ es [[común]] a los triángulos $OAP$ y $OBP$', 'Los triángulos rectángulos son congruentes por [[H-C]], y por eso $PA \\cong PB$'],
      ['cuerdas', 'agudos', 'L-L-L'], 'Dos triángulos rectángulos con la hipotenusa OP común y un cateto congruente (el radio) son congruentes por hipotenusa-cateto: los otros catetos, PA y PB, también lo son.', 'Une O con A, con B y con P: salen dos triángulos. Busca qué tienen congruente.'),
    err('Una cuerda de 30 cm está en una circunferencia de 17 cm de radio. ¿A qué distancia del centro queda?',
      ['El radio perpendicular a la cuerda la biseca: cada mitad mide 15 cm', 'Radio, media cuerda y distancia forman un triángulo rectángulo de hipotenusa 17', 'Distancia: $17 - 15 = 2$ cm'], 2,
      ['Distancia: $\\sqrt{17^2 - 15^2} = 8$ cm', 'Distancia: $\\sqrt{17^2 + 15^2} \\approx 22.7$ cm', 'Distancia: $\\sqrt{30^2 - 17^2} \\approx 24.7$ cm'], 'En un triángulo rectángulo los lados no se restan: $289 - 225 = 64$, y la distancia es 8 cm.', 'Si es un triángulo rectángulo, ¿qué relación cumplen sus tres lados?'),
    opc('Una circunferencia tiene 12 cm de diámetro. Una recta pasa a 6 cm de su centro. Respecto a la circunferencia, la recta es:', ['secante', 'exterior', 'tangente', 'un diámetro'], 2,
      'El radio mide 6 cm. Una recta cuya distancia al centro es igual al radio toca la circunferencia en un solo punto: es tangente.', 'Compara la distancia de la recta al centro con el radio, no con el diámetro.'),
  ]);

  const l2 = leccion('euc-circunferencia-2', 'Ángulo central e inscrito', guion(
    ['Ángulo central', 'Tiene el vértice en el centro y mide lo mismo que el arco que interseca.'],
    ['Ángulo inscrito', 'Tiene el vértice sobre la circunferencia y sus lados son cuerdas. Mide la mitad del arco que interseca.'],
    ['El mismo arco', 'Todos los ángulos inscritos que intersecan el mismo arco son congruentes.'],
    ['Semicircunferencia', 'Un ángulo inscrito en una semicircunferencia es recto: interseca un arco de 180°.'],
    ['Cuadrilátero inscrito', 'Sus ángulos opuestos son suplementarios, porque entre los dos abarcan toda la circunferencia.']), [
    x('tres-miradas', 'El arco AB mide **100°**. Pon cuánto mide el ángulo $\\angle AOB$ (O es el centro), el $\\angle APB$ y el $\\angle AQB$.', { arco: 100, et: ['en O', 'en P', 'en Q'], metas: ['100°', '50°', '130°'], fichas: ['100°', '50°', '130°', '200°', '260°', '80°'],
      mira: ['O es el centro: el ángulo central mide lo que su arco.', 'P está en la circunferencia y abarca el arco AB: mide la mitad.', 'Q abarca el otro arco, el de 260°: mide su mitad.'], trampas: { '2:50°': 'Q no abarca el arco de 100°, sino el resto de la circunferencia.', '1:100°': 'Ese es el central. El inscrito mide la mitad.', '2:260°': 'Ese es el arco que abarca Q: falta la mitad.' }, ok: 'Central: el arco. Inscrito: la mitad del arco que abarca.' },
      'El central mide el arco: 100°. El inscrito en P, la mitad: 50°. Y Q abarca el arco restante, $360^\\circ - 100^\\circ = 260^\\circ$: mide 130°.', 'Para cada vértice, pregúntate dónde está y qué arco queda dentro del ángulo.'),
    x('inscrito-mitad', 'Mueve B hasta que el ángulo inscrito $\\angle APB$ mida **70°**.', { ang: 70 },
      'El inscrito mide la mitad del arco que interseca: para 70° hace falta un arco, y un central, de $2 \\cdot 70^\\circ = 140^\\circ$.', 'Lo que ves cambiar es el ángulo central, que mide lo mismo que el arco AB.'),
    x('mismo-arco', 'El ángulo dorado es inscrito y abarca el arco AB. Toca **todos** los vértices desde los que el arco AB se ve con ese mismo ángulo.', { A: 205, B: 335, P: 95, pts: [{ g: 40, si: true }, { c: true, no: 'R es el centro: ahí el ángulo es central y mide el arco entero, el doble.' }, { g: 152, si: true }, { g: 270, no: 'T está sobre el propio arco AB: desde ahí se abarca el otro arco, y el ángulo cambia.' }, { d: [0.32, -0.46], no: 'U no está sobre la circunferencia: ese ángulo no es inscrito, y abre más.' }],
      falta: 'Falta alguno: todo vértice sobre la circunferencia, del mismo lado de la cuerda AB, ve el arco igual.', ok: 'Los inscritos que abarcan el mismo arco son congruentes.' },
      'Los ángulos inscritos que intersecan el mismo arco son congruentes: sirven los vértices sobre la circunferencia, del lado opuesto al arco. El centro ve el doble.', 'Para medir la mitad del arco AB, el vértice debe estar sobre la circunferencia y fuera de ese arco.'),
    x('semicirculo-recto', 'Mueve B por la circunferencia hasta que el ángulo $\\angle APB$ sea **recto**.', { A: 210, P: 75 },
      'Un inscrito es recto cuando interseca un arco de 180°: la cuerda AB tiene que ser un diámetro, así que B queda opuesto a A.', 'Un ángulo de 90° es la mitad de 180°: ¿qué cuerda deja media circunferencia a cada lado?'),
    x('triangulo-arcos', 'Los vértices del triángulo parten la circunferencia en arcos de **100°**, **140°** y **120°**. Pon cada ángulo del triángulo.', { arcos: [100, 140, 120], fichas: ['70°', '60°', '50°', '100°', '140°', '120°'] },
      'Cada ángulo es inscrito y abarca el arco de enfrente: $\\angle A = 140^\\circ \\div 2 = 70^\\circ$, $\\angle B = 60^\\circ$ y $\\angle C = 50^\\circ$. Suman 180°.', 'El arco que abarca un ángulo es el que queda entre sus lados, lejos del vértice.'),
    x('cuadrilatero-inscrito', 'El cuadrilátero ABCD está inscrito en la circunferencia. Pon los dos ángulos que faltan.', { arcos: [90, 70, 80, 120], fichas: ['105°', '80°', '75°', '100°', '95°', '90°'] },
      'Los opuestos son suplementarios: $\\angle C = 180^\\circ - 75^\\circ = 105^\\circ$ y $\\angle D = 180^\\circ - 100^\\circ = 80^\\circ$.', 'Un ángulo y su opuesto abarcan, entre los dos, la circunferencia completa.'),
    x('razones-inscrito', 'PA es un diámetro. Pon la **razón** de cada paso para probar que $\\angle AOB = 2\\,\\angle P$.', { et: ['OP = OB', '∠P = ∠B', '∠AOB = ∠P + ∠B', '∠AOB = 2∠P'], metas: ['radios', 'triáng. isósceles', 'ángulo exterior', 'sustitución'], fichas: ['radios', 'triáng. isósceles', 'ángulo exterior', 'sustitución', 'alternos internos', 'L-A-L'],
      mira: ['OP y OB van del centro a la circunferencia.', 'En el triángulo POB dos lados son congruentes: a ellos se oponen ángulos congruentes.', '∠AOB es exterior al triángulo POB: vale la suma de los dos interiores no adyacentes.', 'Como ∠B mide lo mismo que ∠P, se reemplaza uno por otro.'], trampas: { '1:radios': 'Los radios son los lados; la igualdad de los ángulos sale de que el triángulo es isósceles.' }, ok: 'Radios, triángulo isósceles y ángulo exterior: el central es el doble del inscrito.' },
      'OP y OB son radios, así que el triángulo POB es isósceles y $\\angle P = \\angle B$. El ángulo AOB es exterior a ese triángulo: $\\angle P + \\angle B = 2\\,\\angle P$.', 'Mira el triángulo POB: ¿qué lados tiene congruentes y qué ángulo queda por fuera de él?'),
    x('lanza-angulo', 'Dale al faro el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un ángulo inscrito que interseca un arco de $150^\\circ$', r: 75, c: '150^\\circ \\div 2', e: { 150: 'Ese es el arco: el inscrito mide la mitad.' } },
      { q: 'El arco que interseca un ángulo inscrito de $55^\\circ$', r: 110, c: '2 \\cdot 55^\\circ', e: { 55: 'Ese es el ángulo: el arco es el doble.' } },
      { q: 'En un cuadrilátero inscrito, el ángulo opuesto a uno de $115^\\circ$', r: 65, c: '180^\\circ - 115^\\circ', e: { 115: 'Los opuestos no son iguales: son suplementarios.' } }] },
      '$150^\\circ \\div 2 = 75^\\circ$; $2 \\cdot 55^\\circ = 110^\\circ$; $180^\\circ - 115^\\circ = 65^\\circ$.', 'Inscrito: la mitad del arco. Arco: el doble del inscrito. Opuestos de un cuadrilátero inscrito: suman 180°.'),
    sol('AB es un diámetro de una circunferencia y C es otro de sus puntos. Si $\\angle ABC = 35^\\circ$, ¿cuánto mide el arco BC?',
      ['El ángulo $\\angle ACB$ está inscrito en una semicircunferencia: mide [[90]]°', 'En el triángulo ABC: $\\angle BAC = 180^\\circ - 90^\\circ - 35^\\circ =$ [[55]]°', 'El ángulo $\\angle BAC$ es inscrito e interseca el arco BC, que mide [[110]]°'],
      ['70', '27.5', '145'], 'El triángulo es rectángulo en C, así que $\\angle BAC = 55^\\circ$, y el arco que interseca es el doble: 110°.', 'Empieza por el ángulo en C: sus lados llegan a los extremos de un diámetro.'),
    err('Un ángulo central y un ángulo inscrito intersecan el mismo arco. El central mide 84°. ¿Cuánto mide el inscrito?',
      ['El central mide lo mismo que su arco: el arco es de 84°', 'El inscrito interseca ese mismo arco de 84°', 'Inscrito: $84^\\circ \\cdot 2 = 168^\\circ$'], 2,
      ['Inscrito: $84^\\circ \\div 2 = 42^\\circ$', 'Inscrito: $180^\\circ - 84^\\circ = 96^\\circ$', 'Inscrito: $84^\\circ$, igual que el central'], 'El inscrito mide la mitad del arco: 42°. El que es el doble es el central respecto al inscrito.', 'El vértice del inscrito está más lejos del arco que el centro: ¿abre más o abre menos?'),
    opc('En un cuadrilátero inscrito en una circunferencia, tres ángulos consecutivos miden 70°, 95° y 110°. El cuarto ángulo mide:', ['85°', '95°', '75°', '105°'], 0,
      'El cuarto ángulo es opuesto al de 95°, y los opuestos son suplementarios: $180^\\circ - 95^\\circ = 85^\\circ$.', 'Ubica cuál de los tres ángulos queda enfrente del que falta.'),
  ]);

  const l3 = leccion('euc-circunferencia-3', 'Ángulos interiores, exteriores y semiinscritos', guion(
    ['Semiinscrito', 'Lo forman una tangente y una cuerda que sale del punto de tangencia. Mide la mitad del arco que interseca.'],
    ['Ángulo interior', 'Lo forman dos cuerdas que se cortan dentro del círculo. Mide la semisuma de los arcos que intersecan él y su opuesto por el vértice.'],
    ['Ángulo exterior', 'Tiene el vértice fuera del círculo: dos secantes, una secante y una tangente, o dos tangentes. Mide la semidiferencia de los arcos intersecados.'],
    ['Dónde está el vértice', 'En el centro: el arco. Sobre la circunferencia: la mitad. Adentro: semisuma. Afuera: semidiferencia.']), [
    x('donde-vertice', 'Según dónde esté el vértice, el ángulo se calcula distinto con los arcos que interseca. Pon cada regla.', { et: ['en el centro', 'sobre la circunferencia', 'dentro del círculo', 'fuera del círculo'], metas: ['el arco', 'mitad del arco', 'semisuma', 'semidiferencia'], fichas: ['el arco', 'mitad del arco', 'semisuma', 'semidiferencia', 'doble del arco', 'suma de arcos'],
      mira: ['Con el vértice en el centro, el ángulo es central: mide lo que su arco.', 'Inscritos y semiinscritos tienen el vértice en la circunferencia: miden la mitad del arco.', 'Dos cuerdas que se cortan adentro: se promedian los dos arcos.', 'Con el vértice afuera, al arco lejano se le resta el cercano, y se saca la mitad.'], trampas: { '2:semidiferencia': 'Adentro los arcos se promedian; la resta es para el vértice de afuera.', '3:semisuma': 'Afuera se restan los arcos; la suma es para el vértice de adentro.' }, ok: 'Cuanto más lejos del arco está el vértice, menos abre el ángulo.' },
      'Central: el arco. Inscrito o semiinscrito: la mitad del arco. Interior: la semisuma de los dos arcos. Exterior: la semidiferencia.', 'Imagina que el vértice se aleja del arco: el ángulo se va cerrando.'),
    x('semiinscrito-abre', 'La recta es **tangente** en A. Mueve B hasta que el ángulo semiinscrito, entre la tangente y la cuerda AB, mida **80°**.', { ang: 80 },
      'El semiinscrito mide la mitad del arco que interseca: el arco AB debe medir $2 \\cdot 80^\\circ = 160^\\circ$.', 'El arco que cuenta es el que queda dentro del ángulo, entre la tangente y la cuerda.'),
    x('cuerdas-cruzan', 'Las cuerdas AC y BD se cortan dentro del círculo. El arco AB mide **50°**. Mueve D hasta que el ángulo que mira al arco AB mida **65°**.', { ab: 50, ang: 65 },
      'El ángulo interior es la semisuma: $\\tfrac{50^\\circ + x}{2} = 65^\\circ$, así que el arco CD mide $130^\\circ - 50^\\circ = 80^\\circ$.', 'Los dos arcos juntos deben sumar el doble del ángulo pedido.'),
    x('interior-o-exterior', 'En las dos figuras los arcos miden **100°** y **40°**. Pon el ángulo que forman las cuerdas (vértice adentro) y el que forman las secantes (vértice afuera).', { m: 100, n: 40, et: ['interior', 'exterior'], metas: ['70°', '30°'], fichas: ['70°', '30°', '140°', '60°', '50°'],
      mira: ['Adentro se promedian los arcos: suma y mitad.', 'Afuera se restan los arcos y se saca la mitad.'], trampas: { '0:140°': 'Sumaste los arcos, pero falta sacar la mitad.', '1:60°': 'Restaste los arcos, pero falta sacar la mitad.', '0:30°': 'Con el vértice adentro los arcos se suman: semisuma.', '1:70°': 'Con el vértice afuera los arcos se restan: semidiferencia.', '0:50°': 'Esa es la mitad de un solo arco: adentro cuentan los dos.' }, ok: 'Adentro, semisuma; afuera, semidiferencia.' },
      'Interior: $\\tfrac{100^\\circ + 40^\\circ}{2} = 70^\\circ$. Exterior: $\\tfrac{100^\\circ - 40^\\circ}{2} = 30^\\circ$.', 'Con los mismos arcos, el vértice de afuera está más lejos: su ángulo es el más cerrado.'),
    x('secantes-abren', 'Desde P salen dos secantes. El arco cercano mide **40°**. Ábrelas hasta que el ángulo en P mida **50°**.', { n: 40, ang: 50 },
      'El exterior es la semidiferencia: $\\tfrac{x - 40^\\circ}{2} = 50^\\circ$, así que el arco lejano mide $100^\\circ + 40^\\circ = 140^\\circ$.', 'La resta de los dos arcos debe ser el doble del ángulo pedido.'),
    x('tangentes-abren', 'Desde P salen dos tangentes. Mueve P hasta que el ángulo entre ellas mida **70°**.', { ang: 70 },
      'Los arcos suman 360° y su semidiferencia debe ser 70°: miden 250° y 110°, porque $\\tfrac{250^\\circ - 110^\\circ}{2} = 70^\\circ$.', 'Los dos arcos completan la circunferencia: busca la pareja cuya resta sea el doble del ángulo.'),
    x('gira-arco', 'Haz girar el punto hasta completar el arco que se pide. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un ángulo semiinscrito mide $75^\\circ$. ¿Qué arco interseca?', r: 150, c: '2 \\cdot 75^\\circ', e: { 75: 'Ese es el ángulo: el arco es el doble.' } },
      { q: 'Dos cuerdas se cortan formando $80^\\circ$; uno de los arcos mide $60^\\circ$. ¿Y el otro?', r: 100, c: '2 \\cdot 80^\\circ - 60^\\circ', e: { 20: 'Restaste sin duplicar: el ángulo es la mitad de la suma.', 140: 'Sumaste: los dos arcos juntos hacen el doble del ángulo, 160°.' } },
      { q: 'Dos secantes forman $35^\\circ$ y el arco cercano mide $50^\\circ$. ¿Cuánto mide el lejano?', r: 120, c: '2 \\cdot 35^\\circ + 50^\\circ', e: { 85: 'Sumaste sin duplicar: el ángulo es la mitad de la resta.', 20: 'El arco lejano es el mayor de los dos.' } }] },
      '$2 \\cdot 75^\\circ = 150^\\circ$; $160^\\circ - 60^\\circ = 100^\\circ$; $70^\\circ + 50^\\circ = 120^\\circ$.', 'Duplica primero el ángulo: ese número es el arco, la suma de los arcos o su resta, según dónde esté el vértice.'),
    sol('Desde un punto exterior P se trazan dos tangentes a una circunferencia. El arco menor entre los puntos de tangencia mide 130°. ¿Cuánto mide el ángulo en P?',
      ['El arco mayor mide $360^\\circ - 130^\\circ =$ [[230]]°', 'El vértice está fuera del círculo: el ángulo es la [[semidiferencia]] de los arcos', 'Ángulo en P: $(230^\\circ - 130^\\circ) \\div 2 =$ [[50]]°'],
      ['semisuma', '100', '180'], 'Los arcos miden 230° y 130°; su semidiferencia es 50°. (También: el ángulo y el arco menor son suplementarios.)', 'Halla primero el otro arco: entre los dos completan la circunferencia.'),
    err('Dos cuerdas se cortan dentro de un círculo. El ángulo que forman y su opuesto por el vértice intersecan arcos de 110° y 50°. ¿Cuánto mide ese ángulo?',
      ['El vértice está dentro del círculo: es un ángulo interior', 'Interseca, con su opuesto por el vértice, los arcos de 110° y 50°', 'Ángulo: $(110^\\circ - 50^\\circ) \\div 2 = 30^\\circ$'], 2,
      ['Ángulo: $(110^\\circ + 50^\\circ) \\div 2 = 80^\\circ$', 'Ángulo: $110^\\circ + 50^\\circ = 160^\\circ$', 'Ángulo: $110^\\circ \\div 2 = 55^\\circ$'], 'Con el vértice adentro va la semisuma: 80°. La semidiferencia es para el vértice de afuera.', 'Compara con un ángulo inscrito: el vértice de adentro está más cerca del arco, así que abre más.'),
    opc('Una recta es tangente a una circunferencia en A, y AB es una cuerda. El arco AB que queda dentro del ángulo entre la tangente y la cuerda mide 136°. Ese ángulo mide:', ['136°', '44°', '272°', '68°'], 3,
      'Es un ángulo semiinscrito: mide la mitad del arco que interseca, $136^\\circ \\div 2 = 68^\\circ$.', 'El vértice está sobre la circunferencia, como en un ángulo inscrito.'),
  ]);

  return mundo('euc-circunferencia', [l1, l2, l3], [
    ['euc-circunferencia-1', 'El radio perpendicular a una cuerda la biseca: radio, media cuerda y distancia forman un triángulo rectángulo.',
      x('cuerda-distancia', 'La circunferencia tiene radio **13**. Baja la cuerda hasta que mida **10**.', { r: 13, cuerda: 10 }, 'Media cuerda mide 5: la distancia es $\\sqrt{13^2 - 5^2} = 12$.', 'Media cuerda, distancia y radio forman un triángulo rectángulo.')],
    ['euc-circunferencia-1', 'La tangente es perpendicular al radio en el punto de tangencia: la distancia al centro es una hipotenusa.',
      x('tangente-desde', 'El radio mide **8**. Aleja el punto P hasta que el segmento tangente PT mida **15**.', { r: 8, t: 15 }, 'Radio y tangente son catetos: $OP = \\sqrt{8^2 + 15^2} = 17$.', 'En el punto de tangencia hay un ángulo recto.')],
    ['euc-circunferencia-1', 'Dos circunferencias: compara la distancia entre los centros con la suma y la resta de los radios.',
      opc('Dos circunferencias de radios 8 cm y 3 cm tienen sus centros a 5 cm de distancia. Las circunferencias son:', ['tangentes interiores', 'secantes', 'tangentes exteriores', 'concéntricas'], 0, 'La distancia, 5, es justo la resta de los radios, $8 - 3$: se tocan por dentro.', 'Calcula la suma y la resta de los radios y compara.')],
    ['euc-circunferencia-2', 'El ángulo inscrito mide la mitad del arco que interseca; el central, el arco entero.',
      x('inscrito-mitad', 'Mueve B hasta que el ángulo inscrito $\\angle APB$ mida **50°**.', { ang: 50 }, 'El arco, y el central, deben medir $2 \\cdot 50^\\circ = 100^\\circ$.', 'El central que ves mide lo mismo que el arco AB.')],
    ['euc-circunferencia-2', 'En un cuadrilátero inscrito, los ángulos opuestos son suplementarios.',
      x('cuadrilatero-inscrito', 'El cuadrilátero ABCD está inscrito en la circunferencia. Pon los dos ángulos que faltan.', { arcos: [100, 60, 110, 90], fichas: ['95°', '80°', '85°', '100°', '90°', '105°'] }, '$\\angle C = 180^\\circ - 85^\\circ = 95^\\circ$ y $\\angle D = 180^\\circ - 100^\\circ = 80^\\circ$.', 'Cada ángulo y su opuesto suman 180°.')],
    ['euc-circunferencia-2', 'Un ángulo inscrito en una semicircunferencia es recto.',
      opc('AB es un diámetro de una circunferencia y C es otro de sus puntos, con $\\angle CAB = 28^\\circ$. El ángulo $\\angle CBA$ mide:', ['28°', '56°', '152°', '62°'], 3, 'El ángulo en C es recto, así que los otros dos suman 90°: $90^\\circ - 28^\\circ = 62^\\circ$.', 'Mira primero el ángulo en C: está inscrito en una semicircunferencia.')],
    ['euc-circunferencia-3', 'Ángulo interior (dos cuerdas que se cortan): semisuma de los arcos intersecados.',
      x('cuerdas-cruzan', 'Las cuerdas AC y BD se cortan dentro del círculo. El arco AB mide **70°**. Mueve D hasta que el ángulo que mira al arco AB mida **80°**.', { ab: 70, ang: 80 }, 'Los arcos deben sumar 160°: el arco CD mide $160^\\circ - 70^\\circ = 90^\\circ$.', 'La suma de los dos arcos es el doble del ángulo.')],
    ['euc-circunferencia-3', 'Ángulo exterior (secantes o tangentes): semidiferencia de los arcos intersecados.',
      x('tangentes-abren', 'Desde P salen dos tangentes. Mueve P hasta que el ángulo entre ellas mida **50°**.', { ang: 50 }, 'Los arcos miden 230° y 130°: $\\tfrac{230^\\circ - 130^\\circ}{2} = 50^\\circ$.', 'Los arcos completan 360° y su resta es el doble del ángulo.')],
    ['euc-circunferencia-3', 'Con el vértice afuera, los arcos se restan y se saca la mitad.',
      opc('Dos secantes trazadas desde un punto exterior intersecan en una circunferencia arcos de 124° y 38°. El ángulo que forman mide:', ['81°', '43°', '86°', '162°'], 1, 'Semidiferencia: $(124^\\circ - 38^\\circ) \\div 2 = 43^\\circ$.', 'El vértice está fuera del círculo: los arcos se restan.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-metricas.js
// Geometría Euclidiana · mundo 6 «euc-metricas» Semejanza y Relaciones Métricas (spec 2026-11-26-curso-euclidiana). Números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  const l1 = leccion('euc-metricas-1', 'Segmentos proporcionales y Tales', guion(
    ['Razón y proporción', 'La razón entre dos segmentos es el cociente de sus medidas. Una proporción es la igualdad de dos razones.'],
    ['Extremos y medios', 'En toda proporción el producto de los extremos es igual al de los medios. Si los medios son iguales, ese valor es la media proporcional.'],
    ['Paralela a un lado', 'Una paralela a un lado de un triángulo divide los otros dos en segmentos proporcionales. Y si una recta los divide así, es paralela.'],
    ['Tales', 'Tres o más paralelas determinan segmentos proporcionales en dos transversales.'],
    ['Bisectriz', 'La bisectriz de un ángulo de un triángulo divide el lado opuesto en la razón de los lados adyacentes.']), [
    x('forman-proporcion', 'Cuatro segmentos forman una proporción cuando las dos razones son iguales. Toca **todas** las parejas que la forman.', { casos: [
      { t: '6 y 9 con 10 y 15', si: true },
      { t: '4 y 6 con 6 y 8', no: 'Entre 4 y 6 la razón es dos tercios; entre 6 y 8, tres cuartos. Sumar 2 no conserva la razón.' },
      { t: '8 y 12 con 14 y 21', si: true },
      { t: '5 y 10 con 9 y 20', no: '5 es la mitad de 10, pero 9 no es la mitad de 20.' },
      { t: '12 y 9 con 20 y 15', si: true }], falta: 'Falta alguna: simplifica cada razón y compara.', ok: 'En todas, las dos razones se simplifican a la misma fracción.' },
      '$\\tfrac69 = \\tfrac{10}{15} = \\tfrac23$, $\\tfrac{8}{12} = \\tfrac{14}{21} = \\tfrac23$ y $\\tfrac{12}{9} = \\tfrac{20}{15} = \\tfrac43$. En las otras dos, los productos en cruz no coinciden.',
      'Multiplica en cruz: en una proporción, extremos y medios dan el mismo producto.'),
    x('proporcion-propiedades', 'Se sabe que $\\tfrac{a}{b} = \\tfrac{c}{d}$. Completa cada igualdad que se deduce de ella.', { da: 'a/b = c/d',
      et: ['a·d =', 'a/c =', 'b/a =', '(a+b)/b ='], metas: ['b·c', 'b/d', 'd/c', '(c+d)/d'], fichas: ['b·c', 'b/d', 'd/c', '(c+d)/d', 'a·c', 'd/b', '(c+d)/c', 'c/d'],
      mira: ['El producto de los extremos es igual al de los medios.', 'Se pueden intercambiar los medios: lo de arriba sigue arriba.', 'Se pueden invertir las dos razones a la vez.', 'Si a un antecedente se le suma su consecuente, al otro también.'],
      trampas: { '0:a·c': 'Los extremos son a y d; los medios, b y c.', '1:d/b': 'Al intercambiar los medios queda a sobre c igual a b sobre d: nada se voltea.', '3:(c+d)/c': 'Abajo quedó b, que es un consecuente: en la otra razón va d.' },
      ok: 'De una proporción salen otras: productos en cruz, alternar, invertir y componer.' },
      'Productos en cruz: $a \\cdot d = b \\cdot c$. Alternando los medios, $\\tfrac{a}{c} = \\tfrac{b}{d}$; invirtiendo, $\\tfrac{b}{a} = \\tfrac{d}{c}$; componiendo, $\\tfrac{a+b}{b} = \\tfrac{c+d}{d}$.',
      'Prueba con números: 2/3 = 4/6. Mira cuáles de las igualdades siguen siendo ciertas con ellos.'),
    x('media-segmento', 'Ajusta **x** para que sea **media proporcional** entre los segmentos de 2 y 18: 2 es a x como x es a 18.', { a: 2, b: 18, max: 18 },
      'Los medios son iguales: $x \\cdot x = 2 \\cdot 18 = 36$, así que $x = 6$. Se comprueba: $\\tfrac26 = \\tfrac{6}{18}$.',
      'En una proporción, el producto de los medios es igual al de los extremos. Aquí los dos medios son x.'),
    x('paralela-lado', 'En el triángulo, D parte el lado AB en **6** y **4**, y el lado AC mide **15**. Lleva E hasta que DE quede **paralela** a BC.', { ad: 6, db: 4, ac: 15 },
      'La paralela conserva la razón: $\\tfrac{AD}{DB} = \\tfrac{AE}{EC} = \\tfrac64$. De 10 partes, 6 quedan arriba: $AE = \\tfrac{6}{10} \\cdot 15 = 9$ y $EC = 6$.',
      'Una paralela a un lado parte los otros dos en la misma razón. ¿En cuántas partes iguales queda cada lado?'),
    x('tales-corte', 'Tres paralelas cortan una transversal en trozos de **10** y **15**; en la otra, el primer trozo mide **6**. Pon el punto por donde pasa la **tercera** paralela.', { a: 10, b: 15, c: 6 },
      'Por Tales, $\\tfrac{10}{15} = \\tfrac{6}{x}$: $x = \\tfrac{15 \\cdot 6}{10} = 9$.',
      'La razón entre los dos trozos es la misma en las dos transversales, aunque los trozos no midan igual.'),
    x('bisectriz-corta', 'AB mide **6**, AC mide **9** y BC mide **10**. Lleva D al punto donde la **bisectriz** del ángulo A corta al lado BC.', { ab: 6, ac: 9, bc: 10 },
      '$\\tfrac{BD}{DC} = \\tfrac{AB}{AC} = \\tfrac69 = \\tfrac23$: de 5 partes, 2 son de BD. $BD = \\tfrac25 \\cdot 10 = 4$ y $DC = 6$.',
      'La bisectriz no llega al punto medio: reparte el lado opuesto según los dos lados que forman el ángulo.'),
    x('sube-distancia', 'Sube a la medida que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Halla la cuarta proporcional: $\\tfrac{4}{10} = \\tfrac{14}{x}$.', r: 35, c: '\\tfrac{10 \\cdot 14}{4}', e: { 20: 'Sumaste 6 a cada término: en una proporción se multiplica.' } },
      { q: 'Una paralela a la base de un triángulo deja en un lado **8** arriba y **12** abajo; en el otro lado quedan **14** arriba. ¿Cuánto queda abajo?', r: 21, c: '\\tfrac{12 \\cdot 14}{8}', e: { 18: 'Sumaste 4: los trozos guardan la razón, no la diferencia.' } },
      { q: 'Dos lados de un triángulo miden **12** y **18**, y el tercero, **25**. La bisectriz del ángulo que forman lo corta. ¿Cuánto mide el trozo junto al lado de 18?', r: 15, c: '\\tfrac{18}{30} \\cdot 25', e: { 10: 'Ese es el trozo junto al lado de 12.' } }] },
      '$140 \\div 4 = 35$; $168 \\div 8 = 21$; el tercer lado queda en 30 partes y 18 son del trozo junto al lado de 18: 15.',
      'En los tres casos hay una proporción: escribe las dos razones y multiplica en cruz.'),
    sol('En el triángulo $ABC$, D está en AB, E está en AC y $DE \\parallel BC$. Si $AD = 9$, $DB = 6$ y $EC = 8$, ¿cuánto mide AC?',
      ['Como $DE \\parallel BC$, vale el teorema [[fundamental]] de la proporcionalidad: $\\tfrac{AD}{DB} = \\tfrac{AE}{EC}$', 'Entonces $\\tfrac{9}{6} = \\tfrac{AE}{8}$, y $AE =$ [[12]]', 'Por tanto $AC = AE + EC =$ [[20]]'], ['de la bisectriz', '11', '17'],
      '$AE = \\tfrac{9 \\cdot 8}{6} = 12$ y $AC = 12 + 8 = 20$.', 'La paralela a un lado divide los otros dos en segmentos proporcionales: arma la proporción con los cuatro trozos.'),
    err('En el triángulo $PQR$, la bisectriz del ángulo P corta a QR en S. Si $PQ = 8$, $PR = 12$ y $QR = 15$, halla QS.',
      ['Por el teorema de la bisectriz, $\\tfrac{QS}{SR} = \\tfrac{PQ}{PR} = \\tfrac{8}{12}$', 'La razón se simplifica: $\\tfrac{QS}{SR} = \\tfrac23$', 'Entonces QS son 2 de las 3 partes de QR: $QS = \\tfrac23 \\cdot 15 = 10$'], 2,
      ['QR queda en $2 + 3 = 5$ partes: $QS = \\tfrac25 \\cdot 15 = 6$', 'Entonces $QS = 15 - 12 = 3$', 'S es el punto medio de QR: $QS = 7.5$'],
      'La razón 2 a 3 compara los dos trozos entre sí, no un trozo con el lado entero: son 5 partes, $QS = 6$ y $SR = 9$.', 'Si dos trozos están en razón 2 a 3, ¿en cuántas partes iguales queda dividido el lado completo?'),
    opc('Tres calles paralelas cortan dos avenidas. En la primera avenida, los tramos entre calles miden 60 m y 90 m. En la segunda, el tramo que corresponde al de 60 m mide 80 m. El otro tramo de la segunda avenida mide:', ['110 m', '120 m', '53.3 m', '135 m'], 1,
      '$\\tfrac{60}{90} = \\tfrac{80}{x}$: $x = \\tfrac{90 \\cdot 80}{60} = 120$ m.', 'Por Tales, la razón entre los dos tramos es la misma en las dos avenidas.'),
  ]);

  const l2 = leccion('euc-metricas-2', 'Semejanza de triángulos', guion(
    ['Misma forma', 'Dos polígonos son semejantes si sus ángulos correspondientes son congruentes y sus lados correspondientes son proporcionales.'],
    ['Razón de semejanza', 'Es el cociente entre dos lados homólogos: el número por el que se multiplica cada lado.'],
    ['Criterio A-A', 'Dos triángulos con dos ángulos respectivamente congruentes son semejantes.'],
    ['L-A-L y L-L-L', 'También lo son si tienen un ángulo congruente comprendido entre lados proporcionales, o los tres lados proporcionales.'],
    ['Lo que hereda la razón', 'Alturas, medianas y perímetros homólogos guardan la misma razón que los lados.']), [
    x('foto-fiel', 'Un rectángulo mide 4 de ancho por 3 de alto. Estira la copia hasta que mida **7.5 de alto** y siga siendo **semejante** al original.', { w0: 4, h0: 3, h: 7.5 },
      'La razón de semejanza es $7.5 \\div 3 = 2.5$: el ancho debe medir $4 \\cdot 2.5 = 10$.',
      'En polígonos semejantes todos los lados se multiplican por el mismo número. Hállalo con los dos altos.'),
    x('criterio-semejanza', 'Con los datos marcados, ¿qué criterio asegura que cada pareja de triángulos es **semejante**? Los dibujos no están a escala.', {
      pares: [{ a: { g: ['50°', '60°'] }, b: { g: ['50°', '', '70°'] } }, { a: { l: ['4', '', '6'], g: ['40°'] }, b: { l: ['6', '', '9'], g: ['40°'] } }, { a: { l: ['4', '5', '6'] }, b: { l: ['10', '12.5', '15'] } }],
      metas: ['A-A', 'L-A-L', 'L-L-L'], fichas: ['A-A', 'L-A-L', 'L-L-L', 'ninguno', 'L-L-A'],
      mira: ['Calcula el tercer ángulo de cada triángulo: resultan los mismos tres.', 'El ángulo de 40° está entre los dos lados dados, y esos lados son proporcionales.', 'No hay ángulos marcados: compara las tres razones entre lados.'],
      trampas: { '0:ninguno': 'Sí lo son: al primero le falta 70° y al segundo, 60°. Tienen los mismos ángulos.', '1:L-L-A': 'Ese no es un criterio. Aquí el ángulo queda entre los dos lados: lado, ángulo, lado.' },
      ok: 'Dos ángulos; un ángulo entre lados proporcionales; o los tres lados proporcionales.' },
      'En la primera los ángulos son 50°, 60° y 70° en ambos (A-A). En la segunda, $\\tfrac46 = \\tfrac69$ con el mismo ángulo comprendido (L-A-L). En la tercera, $\\tfrac{10}{4} = \\tfrac{12.5}{5} = \\tfrac{15}{6}$ (L-L-L).',
      'Mira qué se conoce de cada pareja: solo ángulos, solo lados o dos lados con el ángulo que forman.'),
    x('siempre-semejantes', 'Toca **todas** las parejas de figuras que son semejantes **siempre**, sin necesidad de más datos.', { casos: [
      { t: 'Dos triángulos equiláteros', si: true },
      { t: 'Dos triángulos isósceles', no: 'Un isósceles puede ser puntiagudo y otro achatado: falta un ángulo congruente.' },
      { t: 'Dos triángulos rectángulos con 35°', si: true },
      { t: 'Dos rectángulos', no: 'Tienen los mismos ángulos, pero sus lados pueden no ser proporcionales.' },
      { t: 'Dos cuadrados', si: true },
      { t: 'Dos rombos', no: 'Sus lados son proporcionales, pero sus ángulos pueden ser distintos.' }], falta: 'Falta alguna: busca las que tienen los ángulos fijos y los lados proporcionales.', ok: 'Ángulos congruentes y lados proporcionales: las dos condiciones a la vez.' },
      'Los equiláteros siempre tienen tres ángulos de 60°; los rectángulos con 35° comparten dos ángulos (A-A); los cuadrados tienen ángulos rectos y lados iguales. A las demás parejas les puede fallar una de las dos condiciones.',
      'Semejantes: ángulos correspondientes congruentes y lados correspondientes proporcionales. Busca un contraejemplo para cada pareja.'),
    x('arma-semejante', 'El triángulo pequeño tiene lados **4**, **5** y **6**. La base del grande mide **9** y es homóloga a la de 6. Ajusta los otros dos lados hasta que sea **semejante**.', { t: [4, 5, 6], c1: 9, min: 3, max: 10, v: [5, 5] },
      'La razón de semejanza es $9 \\div 6 = 1.5$: los otros lados miden $4 \\cdot 1.5 = 6$ y $5 \\cdot 1.5 = 7.5$. Con los tres lados proporcionales, los ángulos coinciden (L-L-L).',
      'Compara las dos bases para hallar la razón de semejanza; después aplícala a cada lado.'),
    x('sombra-poste', 'Una vara de **2 m** proyecta una sombra de **3 m**. A la misma hora, la sombra de un poste mide **9 m**. Dale al poste su altura.', { h0: 2, s0: 3, s: 9 },
      'Los rayos del sol son paralelos: los dos triángulos rectángulos tienen los mismos ángulos (A-A). $\\tfrac{h}{9} = \\tfrac{2}{3}$, así que $h = 6$ m.',
      'Vara y poste forman con sus sombras triángulos semejantes: compara lados homólogos.'),
    x('semejantes-partes', 'Los dos triángulos son **semejantes** y sus bases homólogas miden **10** y **15**. Del pequeño se conocen la altura, la mediana y el perímetro. Pon los del grande.', { l0: 10, l1: 15, h0: 4.8, m0: 5, p0: 24, fichas: ['7.2', '7.5', '36', '9.8', '10', '29', '54'] },
      'La razón de semejanza es $\\tfrac{15}{10} = 1.5$: altura $4.8 \\cdot 1.5 = 7.2$, mediana $5 \\cdot 1.5 = 7.5$ y perímetro $24 \\cdot 1.5 = 36$.',
      'En triángulos semejantes, las alturas, las medianas y los perímetros guardan la misma razón que los lados.'),
    x('lanza-escala', 'Manda el dron al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos triángulos semejantes tienen lados homólogos de **6** y **15**. Otro lado del pequeño mide 8: ¿cuánto mide su homólogo?', r: 20, c: '8 \\cdot \\tfrac{15}{6}', e: { 17: 'Sumaste 9: los lados homólogos se multiplican por la razón.' } },
      { q: 'La razón de semejanza es $\\tfrac32$ y el perímetro del triángulo pequeño es **18**. ¿Cuál es el perímetro del grande?', r: 27, c: '18 \\cdot \\tfrac32', e: { 12: 'Ese sería más pequeño: el grande sale de multiplicar por tres medios.' } },
      { q: 'Las alturas homólogas de dos triángulos semejantes miden **4** y **10**. La mediana del pequeño mide 6: ¿y la del grande?', r: 15, c: '6 \\cdot \\tfrac{10}{4}', e: { 12: 'Sumaste 6: la mediana va en la misma razón que las alturas.' } }] },
      '$8 \\cdot 2.5 = 20$; $18 \\cdot 1.5 = 27$; $6 \\cdot 2.5 = 15$.',
      'Halla primero la razón de semejanza con el par de medidas homólogas que conoces.'),
    sol('En el triángulo $ABC$ se traza $DE \\parallel BC$, con D en AB y E en AC. Demuestra que $\\triangle ADE \\sim \\triangle ABC$ y halla DE si $AD = 4$, $AB = 10$ y $BC = 15$.',
      ['El ángulo A es [[común]] a los dos triángulos', '$\\angle ADE \\cong \\angle ABC$ por ser [[correspondientes]] entre paralelas', 'Entonces los triángulos son semejantes por el criterio [[A-A]]', 'Lados homólogos: $\\tfrac{DE}{BC} = \\tfrac{AD}{AB}$, así que $DE = \\tfrac{4}{10} \\cdot 15 =$ [[6]]'], ['alternos internos', 'L-L-L', '9', 'recto'],
      'Con un ángulo común y un par de correspondientes congruentes basta (A-A). La razón es $\\tfrac{4}{10}$, y $DE = 6$.', 'Para la semejanza bastan dos ángulos. Busca uno que compartan y otro que repitan las paralelas.'),
    err('Un triángulo tiene lados 6, 8 y 12; otro, lados 9, 12 y 16. ¿Son semejantes?',
      ['Se comparan los lados homólogos, de menor a mayor', '$\\tfrac{9}{6} = 1.5$ y $\\tfrac{12}{8} = 1.5$', '$\\tfrac{16}{12} = 1.5$, así que son semejantes por L-L-L'], 2,
      ['$\\tfrac{16}{12} \\approx 1.33$: la tercera razón es distinta, así que no son semejantes', '$\\tfrac{16}{12} = 1.5$, así que son semejantes por L-A-L', '$\\tfrac{12}{16} = 0.75$, así que son semejantes por A-A'],
      'Para L-L-L las tres razones deben coincidir, y $16 \\div 12$ no da 1.5: no son semejantes.', 'Dos razones iguales no bastan cuando solo se conocen lados: revisa la tercera división.'),
    opc('Un triángulo tiene lados 5, 7 y 9. Otro triángulo, semejante a él, tiene perímetro 63. El lado mayor del segundo triángulo mide:', ['21', '15', '27', '51'], 2,
      'El primero tiene perímetro 21 y $63 \\div 21 = 3$: el lado mayor mide $9 \\cdot 3 = 27$.', 'Los perímetros guardan la misma razón que los lados homólogos.'),
  ]);

  const l3 = leccion('euc-metricas-3', 'Pitágoras y el triángulo rectángulo', guion(
    ['Proyecciones', 'La altura sobre la hipotenusa la divide en dos segmentos: las proyecciones de los catetos.'],
    ['La altura', 'La altura sobre la hipotenusa es media proporcional entre las dos proyecciones.'],
    ['Cada cateto', 'Cada cateto es media proporcional entre la hipotenusa y su proyección sobre ella.'],
    ['Pitágoras', 'El cuadrado de la hipotenusa es la suma de los cuadrados de los catetos; y si tres lados lo cumplen, el triángulo es rectángulo.'],
    ['Dos triángulos notables', 'En el de 45°-45°-90° la hipotenusa es el cateto por raíz de 2; en el de 30°-60°-90° los lados son x, x por raíz de 3 y 2x.']), [
    x('altura-hipotenusa', 'La hipotenusa mide **13**. Mueve el vértice del ángulo recto hasta que la altura sobre la hipotenusa mida **6**, con la proyección menor a la izquierda.', { c: 13, h: 6 },
      '$h^2 = m \\cdot n$: se buscan dos números que sumen 13 y cuyo producto sea 36. Son 4 y 9.',
      'El cuadrado de la altura es el producto de las dos proyecciones, y las dos juntas completan la hipotenusa.'),
    x('cateto-proyeccion', 'La hipotenusa mide **25**. Mueve el vértice del ángulo recto hasta que el cateto de la izquierda mida **15**.', { c: 25, a: 15 },
      '$a^2 = c \\cdot m$: $225 = 25 \\cdot m$, así que su proyección mide 9. La otra mide 16 y el otro cateto, 20, porque $20^2 = 25 \\cdot 16$.',
      'El cuadrado de un cateto es la hipotenusa por la proyección de ese cateto sobre ella.'),
    x('cuadrado-catetos', 'El cuadrado construido sobre la hipotenusa debe valer **89**, y los dos catetos deben ser mayores que 2. Mueve las puntas de los catetos.', { c2: 89, mas: 2 },
      '$5^2 + 8^2 = 25 + 64 = 89$: los cuadrados de los catetos llenan el de la hipotenusa.',
      'Haz la lista de los cuadrados perfectos y busca dos que sumen lo pedido.'),
    x('cateto-falta', 'Un cable de **29 m** baja tenso desde la punta de un mástil hasta un punto del suelo a **20 m** del pie. Dale al mástil su altura.', { c: 29, b: 20 },
      'El cable es la hipotenusa: $29^2 - 20^2 = 841 - 400 = 441 = 21^2$. El mástil mide 21 m.',
      'El cable es el lado opuesto al ángulo recto: para hallar un cateto se restan los cuadrados.'),
    x('que-triangulo-es', 'Con solo los tres lados se sabe qué clase de triángulo es. Pon a cada terna su nombre.', {
      et: ['lados 9, 12 y 15', 'lados 5, 6 y 7', 'lados 4, 7 y 9', 'lados 8, 15 y 17'], metas: ['rectángulo', 'acutángulo', 'obtusángulo', 'rectángulo'], fichas: ['rectángulo', 'rectángulo', 'acutángulo', 'obtusángulo', 'acutángulo', 'no cierra'],
      mira: ['81 + 144 da justo 225: se cumple Pitágoras.', '25 + 36 es 61, más que 49: el ángulo mayor no alcanza a ser recto.', '16 + 49 es 65, menos que 81: el ángulo mayor se pasa de recto.', '64 + 225 da justo 289: se cumple Pitágoras.'],
      trampas: { '2:no cierra': 'Sí cierra: 4 + 7 es más que 9.', '1:no cierra': 'Sí cierra: 5 + 6 es más que 7.' },
      ok: 'El cuadrado del lado mayor: si iguala la suma, rectángulo; si es menor, acutángulo; si es mayor, obtusángulo.' },
      '$15^2 = 81 + 144$ y $17^2 = 64 + 225$: rectángulos, por el recíproco de Pitágoras. $7^2 = 49 < 61$: acutángulo. $9^2 = 81 > 65$: obtusángulo.',
      'Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos.'),
    x('equilatero-partes', 'Un triángulo equilátero de perímetro **48** se parte por una altura: queda un triángulo de 30°, 60° y 90°. Pon el lado, la media base y la altura.', { per: 48, fichas: ['16', '8', '8√3', '16√3', '8√2', '24'] },
      'El lado mide $48 \\div 3 = 16$; la media base, 8; y la altura, $\\sqrt{16^2 - 8^2} = \\sqrt{192} = 8\\sqrt3$.',
      'El cateto menor es la mitad de la hipotenusa; el otro cateto sale de Pitágoras.'),
    x('diagonal-cuadrado', 'Una baldosa cuadrada mide **7** de lado. Corta la cinta que va de una esquina a la **opuesta**, lo más justa que puedas.', { lado: 7 },
      'La diagonal forma dos triángulos de 45°-45°-90°: mide $7\\sqrt2 \\approx 9.9$.',
      'La diagonal es la hipotenusa de un triángulo rectángulo con los dos catetos iguales.'),
    x('lanza-cuerda', 'Lanza la cuerda con el largo justo del lado que falta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Catetos 10 y 24: lanza la hipotenusa', a: 10, b: 24, r: 26 }, { q: 'Hipotenusa 41 y cateto 40: lanza el otro cateto', h: 41, b: 40, r: 9 }, { q: 'Hipotenusa 35 y cateto 28: lanza el otro cateto', h: 35, b: 28, r: 21 }] },
      '$100 + 576 = 26^2$; $1681 - 1600 = 9^2$; $1225 - 784 = 21^2$.',
      'Para la hipotenusa se suman los cuadrados de los catetos; para un cateto, se restan.'),
    sol('En un triángulo rectángulo, la altura sobre la hipotenusa la divide en segmentos de 18 cm y 32 cm. Halla la altura y los dos catetos.',
      ['La hipotenusa mide $18 + 32 =$ [[50]] cm', 'Altura: $h^2 = 18 \\cdot 32 = 576$, así que $h =$ [[24]] cm', 'Cateto menor: $a^2 = 50 \\cdot 18 = 900$, así que $a =$ [[30]] cm', 'Cateto mayor: $b^2 = 50 \\cdot 32 = 1600$, así que $b =$ [[40]] cm'], ['25', '14', '576'],
      'La altura es media proporcional entre las proyecciones; cada cateto, entre la hipotenusa y su proyección. Se comprueba: $30^2 + 40^2 = 50^2$.', 'Hay tres relaciones: una para la altura y una para cada cateto. Todas son productos.'),
    err('Los lados de un triángulo miden 7, 24 y 26 cm. ¿Es rectángulo?',
      ['El lado mayor, 26, tendría que ser la hipotenusa', '$7^2 + 24^2 = 49 + 576 = 625$', 'Como $26^2 = 625$, por el recíproco de Pitágoras es rectángulo'], 2,
      ['Como $26^2 = 676$ es mayor que 625, no es rectángulo: es obtusángulo', 'Como $26^2 = 676$ es mayor que 625, es acutángulo', 'Como $26^2 = 52$, no es rectángulo'],
      '$26^2 = 676$, no 625 (ese es $25^2$). El cuadrado del lado mayor supera la suma de los otros dos: el triángulo es obtusángulo.', 'Vuelve a calcular el cuadrado del lado mayor antes de comparar.'),
    opc('En un triángulo rectángulo con ángulos agudos de 30° y 60°, el cateto opuesto al ángulo de 30° mide 7 cm. La hipotenusa y el otro cateto miden, en ese orden:', ['$7\\sqrt2$ cm y 7 cm', '14 cm y $7\\sqrt2$ cm', '$7\\sqrt3$ cm y 14 cm', '14 cm y $7\\sqrt3$ cm'], 3,
      'Es medio triángulo equilátero: la hipotenusa es el doble del cateto menor, 14, y el otro cateto mide $7\\sqrt3$.', 'El cateto opuesto a 30° es la mitad de la hipotenusa.'),
  ]);

  const l4 = leccion('euc-metricas-4', 'Potencia de un punto y polígonos regulares', guion(
    ['Dos cuerdas', 'Si dos cuerdas se cortan dentro de la circunferencia, el producto de los segmentos de una es igual al producto de los segmentos de la otra.'],
    ['Dos secantes', 'Desde un punto exterior, cada secante multiplicada por su segmento exterior da el mismo producto: la potencia del punto.'],
    ['Tangente y secante', 'El segmento tangente es media proporcional entre la secante y su segmento exterior.'],
    ['Polígonos regulares inscritos', 'Sus vértices reparten la circunferencia en arcos iguales: el ángulo central mide 360° entre el número de lados.'],
    ['Lado y apotema', 'El lado del hexágono es el radio; el del cuadrado, el radio por raíz de 2; el del triángulo equilátero, el radio por raíz de 3. La apotema va del centro al punto medio de un lado.']), [
    x('potencia-cuerdas', 'Dos cuerdas se cortan en P. En una, $PA = 6$ y $PB = 8$; en la otra, $PC = 4$. La circunferencia está oculta: lleva D al punto donde la segunda cuerda termina.', { pa: 6, pb: 8, pc: 4, max: 14 },
      '$PA \\cdot PB = PC \\cdot PD$: $6 \\cdot 8 = 4 \\cdot PD$, así que $PD = 12$.',
      'Los dos trozos de una cuerda, multiplicados, dan lo mismo que los dos trozos de la otra.'),
    x('potencia-secantes', 'Desde P salen dos secantes. En una, $PA = 6$ y $PB = 10$, medidos desde P; en la otra, $PC = 4$. La circunferencia está oculta: lleva D al punto lejano de la segunda secante.', { pa: 6, pb: 10, pc: 4, max: 16 },
      '$PA \\cdot PB = PC \\cdot PD$: $6 \\cdot 10 = 4 \\cdot PD$, así que $PD = 15$.',
      'Cada secante entera por su segmento exterior, los dos medidos desde P, da el mismo producto.'),
    x('tangente-media', 'Desde P, una secante corta a la circunferencia en A y B: $PA = 4$ y $PB = 16$. La circunferencia está oculta: lleva T al punto donde la otra recta es **tangente**.', { pa: 4, pb: 16, max: 14 },
      '$PT^2 = PA \\cdot PB = 4 \\cdot 16 = 64$, así que $PT = 8$.',
      'La tangente es una secante cuyos dos puntos se juntaron: en el producto, PT aparece dos veces.'),
    x('inscribe-regular', 'Inscribe en la circunferencia un polígono regular cuyo **ángulo central** mida $40^\\circ$.', { meta: 9, ver: 'central' },
      'Los ángulos centrales se reparten la vuelta por igual: $360^\\circ \\div 40^\\circ = 9$ lados.',
      'Todos los ángulos centrales de un polígono regular son iguales y juntos completan una vuelta.'),
    x('lados-inscritos', 'Un triángulo equilátero, un cuadrado y un hexágono regular están inscritos en circunferencias de radio **10**. Pon el lado de cada uno.', { r: 10, fichas: ['10√3', '10√2', '10', '20', '5√3', '5√2'] },
      '$l_3 = r\\sqrt3 = 10\\sqrt3$, $l_4 = r\\sqrt2 = 10\\sqrt2$ y $l_6 = r = 10$.',
      'Empieza por el hexágono: dos radios y un lado forman un triángulo con un ángulo de 60° en el centro.'),
    x('apotema-lado', 'Un hexágono regular está inscrito en una circunferencia de radio **8**. Pon su ángulo central, su lado y su apotema.', { n: 6, r: 8, fichas: ['60°', '8', '4√3', '4', '120°', '8√3', '4√2'] },
      '$360^\\circ \\div 6 = 60^\\circ$. Dos radios y un lado forman un triángulo equilátero: el lado mide 8, y la apotema, que es su altura, $4\\sqrt3$.',
      'La apotema parte el triángulo de dos radios y un lado en dos triángulos rectángulos.'),
    x('tiro-al-circulo', 'El punto sale de P por la recta punteada y debe caer justo en la circunferencia. Dale la distancia PD y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos cuerdas se cortan en P: $PA = 3$, $PB = 12$ y $PC = 4$. Lanza hasta D.', pa: 3, pb: 12, pc: 4, r: 9, c: '\\tfrac{3 \\cdot 12}{4}', e: { 11: 'Sumaste y restaste: los trozos de las cuerdas se multiplican.' } },
      { q: 'P es exterior: $PA = 5$, $PB = 12$ y $PC = 6$, medidos desde P. Lanza hasta el punto lejano D.', ext: true, pa: 5, pb: 12, pc: 6, r: 10, c: '\\tfrac{5 \\cdot 12}{6}', e: { 11: 'Sumaste y restaste: se multiplica cada secante por su parte exterior.', 6: 'Ahí está C: D es el otro punto de la secante.' } },
      { q: 'Dos cuerdas se cortan en P: $PA = 8$, $PB = 9$ y $PC = 6$. Lanza hasta D.', pa: 8, pb: 9, pc: 6, r: 12, c: '\\tfrac{8 \\cdot 9}{6}', e: { 11: 'Sumaste y restaste: aquí se multiplica.' } }] },
      '$36 \\div 4 = 9$; $60 \\div 6 = 10$; $72 \\div 6 = 12$.',
      'En los tres, el producto de las dos distancias desde P por una recta es igual al producto por la otra.'),
    sol('Desde un punto P exterior a una circunferencia se trazan una tangente PT y una secante que la corta en A y B, con $PA = 5$ cm y $AB = 15$ cm. Halla PT.',
      ['La secante entera mide $PB = 5 + 15 =$ [[20]] cm', 'Por la potencia del punto, $PT^2 = PA \\cdot PB =$ [[100]]', 'Entonces $PT =$ [[10]] cm'], ['75', '15', '8.7'],
      'Se multiplica el segmento exterior por la secante entera, no por la cuerda: $5 \\cdot 20 = 100$ y $PT = 10$.', 'Las dos medidas de la secante se toman desde P: hasta el punto cercano y hasta el lejano.'),
    err('Un cuadrado está inscrito en una circunferencia de radio 6 cm. Halla su lado y su apotema.',
      ['El ángulo central mide $360^\\circ \\div 4 = 90^\\circ$', 'Dos radios y un lado forman un triángulo rectángulo: $l^2 = 6^2 + 6^2 = 72$', 'El lado mide $l = 6\\sqrt2$ cm', 'La apotema mide lo mismo que el radio: 6 cm'], 3,
      ['La apotema es la mitad del lado: $3\\sqrt2$ cm', 'La apotema es la mitad del radio: 3 cm', 'La apotema mide $6\\sqrt3$ cm'],
      'La apotema llega al punto medio del lado, no al vértice: en el cuadrado es medio lado, $3\\sqrt2 \\approx 4.2$ cm, menos que el radio.', 'El radio llega a un vértice; la apotema, al punto medio de un lado. ¿Cuál de los dos es más corto?'),
    opc('Dos cuerdas AB y CD de una circunferencia se cortan en el punto P. Si $PA = 4$ cm, $PB = 9$ cm y P es el punto medio de CD, la cuerda CD mide:', ['12 cm', '6 cm', '13 cm', '6.5 cm'], 0,
      '$PC \\cdot PD = 4 \\cdot 9 = 36$ con $PC = PD$: cada mitad mide 6 y la cuerda, 12 cm.', 'Los productos de los segmentos de las dos cuerdas son iguales; en CD los dos segmentos miden lo mismo.'),
  ]);

  return mundo('euc-metricas', [l1, l2, l3, l4], [
    ['euc-metricas-1', 'Tales: varias paralelas determinan segmentos proporcionales en dos transversales.', x('tales-corte', 'Tres paralelas cortan una transversal en trozos de **9** y **12**; en la otra, el primer trozo mide **6**. Pon el punto por donde pasa la **tercera** paralela.', { a: 9, b: 12, c: 6 },
      '$\\tfrac{9}{12} = \\tfrac{6}{x}$: $x = \\tfrac{12 \\cdot 6}{9} = 8$.', 'La razón entre los trozos es igual en las dos transversales.')],
    ['euc-metricas-1', 'La bisectriz divide el lado opuesto en la razón de los lados adyacentes.', x('bisectriz-corta', 'AB mide **12**, AC mide **8** y BC mide **10**. Lleva D al punto donde la **bisectriz** del ángulo A corta al lado BC.', { ab: 12, ac: 8, bc: 10 },
      '$\\tfrac{BD}{DC} = \\tfrac{12}{8} = \\tfrac32$: de 5 partes, 3 son de BD. $BD = 6$ y $DC = 4$.', 'El trozo mayor queda junto al lado mayor.')],
    ['euc-metricas-1', 'Una paralela a un lado divide los otros dos en segmentos proporcionales.', opc('En el triángulo $ABC$, una paralela a BC corta a AB en D y a AC en E. Si $AD = 6$, $DB = 9$ y $AE = 8$, entonces EC mide:', ['11', '5.3', '14', '12'], 3,
      '$\\tfrac{6}{9} = \\tfrac{8}{EC}$: $EC = \\tfrac{9 \\cdot 8}{6} = 12$.', 'Arma la proporción con los cuatro trozos.')],
    ['euc-metricas-2', 'A-A: triángulos con dos ángulos congruentes tienen lados proporcionales.', x('sombra-poste', 'Una vara de **2.5 m** proyecta una sombra de **2 m**. A la misma hora, la sombra de un poste mide **6 m**. Dale al poste su altura.', { h0: 2.5, s0: 2, s: 6 },
      'La sombra del poste es 3 veces la de la vara: $2.5 \\cdot 3 = 7.5$ m.', 'A la misma hora, vara y poste forman triángulos semejantes.')],
    ['euc-metricas-2', 'L-L-L: tres lados proporcionales, y la razón sale de un par de homólogos.', x('arma-semejante', 'El triángulo de la izquierda tiene lados **6**, **8** y **10**. La base del otro mide **5** y es homóloga a la de 10. Ajusta sus otros dos lados hasta que sea **semejante**.', { t: [6, 8, 10], c1: 5, min: 2, max: 9, v: [6, 6] },
      'La razón es $5 \\div 10 = 0.5$: los otros lados miden 3 y 4.', 'Halla la razón con las dos bases y aplícala a cada lado.')],
    ['euc-metricas-2', 'Los perímetros guardan la razón de semejanza.', opc('Los lados de un triángulo miden 4, 6 y 8. En un triángulo semejante, el lado menor mide 10. El perímetro de este último es:', ['45', '36', '30', '112.5'], 0,
      'La razón es $10 \\div 4 = 2.5$ y $18 \\cdot 2.5 = 45$.', 'El perímetro crece por la misma razón que cada lado.')],
    ['euc-metricas-3', 'La altura sobre la hipotenusa es media proporcional entre las proyecciones.', x('altura-hipotenusa', 'La hipotenusa mide **20**. Mueve el vértice del ángulo recto hasta que la altura sobre la hipotenusa mida **8**, con la proyección menor a la izquierda.', { c: 20, h: 8 },
      'Dos números que suman 20 y cuyo producto es 64: 4 y 16.', 'El cuadrado de la altura es el producto de las proyecciones.')],
    ['euc-metricas-3', 'Pitágoras: para un cateto se restan los cuadrados.', x('cateto-falta', 'Un cable de **25 m** baja tenso desde la punta de un mástil hasta un punto del suelo a **7 m** del pie. Dale al mástil su altura.', { c: 25, b: 7 },
      '$25^2 - 7^2 = 625 - 49 = 576 = 24^2$.', 'El cable es la hipotenusa del triángulo.')],
    ['euc-metricas-3', 'Con las proyecciones se hallan la altura y la hipotenusa.', opc('La altura sobre la hipotenusa de un triángulo rectángulo determina en ella segmentos de 4 cm y 9 cm. El área del triángulo es:', ['36 cm²', '39 cm²', '78 cm²', '18 cm²'], 1,
      '$h^2 = 4 \\cdot 9$, así que $h = 6$; la hipotenusa mide 13 y el área, $\\tfrac{13 \\cdot 6}{2} = 39$ cm².', 'Halla primero la altura con las dos proyecciones.')],
    ['euc-metricas-4', 'Cuerdas que se cortan: los productos de sus segmentos son iguales.', x('potencia-cuerdas', 'Dos cuerdas se cortan en P. En una, $PA = 5$ y $PB = 12$; en la otra, $PC = 6$. La circunferencia está oculta: lleva D al punto donde la segunda cuerda termina.', { pa: 5, pb: 12, pc: 6, max: 14 },
      '$5 \\cdot 12 = 6 \\cdot PD$, así que $PD = 10$.', 'Multiplica los dos trozos de la cuerda que conoces completa.')],
    ['euc-metricas-4', 'El lado del hexágono regular inscrito mide lo mismo que el radio.', x('inscribe-regular', 'Inscribe en la circunferencia un polígono regular cuyo **lado** mida lo mismo que el **radio**.', { meta: 6, ver: 'lado' },
      'Con seis lados, dos radios y un lado forman un triángulo equilátero.', 'Si el lado es igual al radio, ¿qué triángulo forman dos radios y un lado?')],
    ['euc-metricas-4', 'Tangente y secante: el cuadrado de la tangente es la secante por su parte exterior.', opc('Desde un punto exterior P se trazan a una circunferencia una tangente PT y una secante que la corta en A y B. Si $PA = 3$ cm y $AB = 9$ cm, PT mide:', ['$3\\sqrt3$ cm', '7.5 cm', '6 cm', '27 cm'], 2,
      '$PB = 12$ y $PT^2 = 3 \\cdot 12 = 36$: $PT = 6$ cm.', 'La secante entera se mide desde P hasta el punto lejano.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-areas.js
// Geometría Euclidiana · mundo 7 «euc-areas» (spec 2026-11-26-curso-euclidiana): áreas básicas, relaciones entre áreas y áreas
// sombreadas. Juegos propios en js/games/euc-escena-7.js; los demás, del catálogo de geometría con datos nuevos.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  // ------------------------------------------------------------------------------------------------------- 1 · Áreas básicas
  const l1 = leccion('euc-areas-1', 'Áreas básicas', guion(
    ['Medir un área', 'Medir un área es contar cuántos cuadrados unidad caben en la figura. Dos figuras con la misma área se llaman **equivalentes**, aunque no tengan la misma forma.'],
    ['De base por altura', 'El rectángulo y el paralelogramo valen base por altura; el triángulo, la mitad. Si solo se conocen los tres lados, la fórmula de Herón usa el semiperímetro $p$: $\\sqrt{p(p-a)(p-b)(p-c)}$.'],
    ['Rombo y trapecio', 'El rombo vale el semiproducto de sus diagonales, $\\tfrac{D \\cdot d}{2}$, y el trapecio la semisuma de las bases por la altura, $\\tfrac{(B + b) \\cdot h}{2}$.'],
    ['Polígono regular', 'Un polígono regular se parte en triángulos iguales desde el centro, con la apotema por altura: su área es el semiperímetro por la apotema. El triángulo equilátero de lado $l$ vale $\\tfrac{l^2\\sqrt3}{4}$.'],
    ['Círculo y sus partes', 'El círculo vale $\\pi r^2$. Al sector circular le toca la misma parte del área que su ángulo de la vuelta; el segmento circular es el sector menos el triángulo, y la corona, el círculo grande menos el chico.'],
  ), [
    x('misma-area', 'El rectángulo dorado mide **9 por 4**. Sube el vértice del triángulo de base **12** hasta que las dos figuras sean **equivalentes**.', { w: 9, H: 4, b: 12 },
      'El rectángulo vale $9 \\cdot 4 = 36$. El triángulo vale la mitad de base por altura: $\\tfrac{12 \\cdot h}{2} = 36$ da $h = 6$.', 'Equivalentes quiere decir con la misma área. Recuerda que el triángulo es la mitad de un paralelogramo.'),
    x('inclina-marco', 'Un marco articulado tiene base **11** y lados de **13**. Inclínalo hasta que el paralelogramo tenga área **132**.', { b: 11, l: 13, area: 132 },
      'El área es base por altura: $132 \\div 11 = 12$ de altura. Con el lado de 13, el corrimiento es $\\sqrt{13^2 - 12^2} = 5$.', 'Al inclinarlo los lados no cambian, pero la altura sí. Busca primero qué altura hace falta.'),
    x('trapecio-gemelo', 'El trapecio tiene bases **17** y **9**. Estira el rectángulo, de la misma altura, hasta que sean **equivalentes**.', { B: 17, b: 9 },
      'El trapecio vale la semisuma de las bases por la altura: $\\tfrac{17 + 9}{2} = 13$. Un rectángulo de base 13 y la misma altura tiene su misma área.', 'Lo que al trapecio le sobra abajo puede llenar lo que le falta arriba. ¿Qué base queda en el medio?'),
    x('rombo-diagonales', 'Una diagonal del rombo mide **10**. Estira la otra hasta que el área sea **65**.', { d: 10, area: 65 },
      'El rombo vale el semiproducto de sus diagonales: $\\tfrac{10 \\cdot D}{2} = 65$ da $D = 13$.', 'El rombo ocupa la mitad de la caja que forman sus dos diagonales. Piensa cuánto vale esa caja.'),
    x('heron-raiz', 'De un lote triangular solo se conocen los lados: **21**, **20** y **13**. Completa la fórmula de **Herón**: el semiperímetro $p$, las tres diferencias y el área.', {
      t: [21, 20, 13], et: ['p', 'p − 21', 'p − 20', 'p − 13', 'área'], metas: ['27', '6', '7', '14', '126'], fichas: ['27', '6', '7', '14', '126', '54', '252', '8'],
      mira: ['El semiperímetro es la mitad de la suma de los tres lados.', 'A p quítale el lado de 21.', 'A p quítale el lado de 20.', 'A p quítale el lado de 13.', 'El área es la raíz del producto de las cuatro casillas anteriores.'],
      trampas: { '0:54': 'Ese es el perímetro entero: p es la mitad.', '4:252': 'Eso es base por altura sin partir entre 2: el triángulo vale la mitad.' }, ok: 'La raíz de 27 · 6 · 7 · 14 es 126.' },
      'Semiperímetro: $p = \\tfrac{21 + 20 + 13}{2} = 27$. Área: $\\sqrt{27 \\cdot 6 \\cdot 7 \\cdot 14} = \\sqrt{15\\,876} = 126$.', 'Empieza por el semiperímetro, que es la mitad del perímetro. Las diferencias salen restándole cada lado.'),
    x('regular-apotema', 'Un hexágono regular tiene lado **8**. Pon su **semiperímetro**, su **apotema** y su **área**.', { l: 8, fichas: ['24', '4√3', '96√3', '48', '192√3', '8√3', '96'] },
      'Semiperímetro: $\\tfrac{6 \\cdot 8}{2} = 24$. La apotema es la altura de un equilátero de lado 8: $4\\sqrt3$. Área: $24 \\cdot 4\\sqrt3 = 96\\sqrt3$.', 'El hexágono regular está hecho de seis triángulos equiláteros. La apotema es la altura de uno de ellos.'),
    x('sector-area', 'En un círculo de radio **6**, abre el sector circular hasta que su área sea $8\\pi$.', { r: 6, area: 8 },
      'El círculo entero vale $36\\pi$. El sector es $\\tfrac{8}{36} = \\tfrac{2}{9}$ del círculo, y esa parte de la vuelta es $\\tfrac{2}{9} \\cdot 360^\\circ = 80^\\circ$.', 'Compara el área pedida con la del círculo entero: al sector le toca esa misma parte de los 360°.'),
    x('sube-distancia', 'Sube a la cantidad que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un trapecio tiene bases **9** y **5** y altura **6**. ¿Cuál es su área?', r: 42, c: '\\tfrac{(9 + 5) \\cdot 6}{2}', e: { 54: 'Multiplicaste la base mayor por la altura: va la semisuma de las dos bases.', 28: 'Sumaste las bases y las doblaste, pero falta la altura.' } },
      { q: 'Una corona circular tiene radios **8** y **5**. Su área es $k\\pi$: sube a $k$.', r: 39, c: '8^2 - 5^2', e: { 9: 'Restaste los radios y elevaste: se restan las áreas de los dos círculos.', 3: 'Esa es la diferencia de los radios, el ancho de la corona.' } },
      { q: 'Un sector circular de radio **12** abre $90^\\circ$. Su área es $k\\pi$: sube a $k$.', r: 36, c: '\\tfrac{90}{360} \\cdot 12^2', e: { 6: 'Con 6π mediste el arco. El área usa el radio por el radio.', 24: '24π es toda la circunferencia, 2πr; se pide un cuarto del área.' } },
    ] }, 'Trapecio: $\\tfrac{(9 + 5) \\cdot 6}{2} = 42$. Corona: $64\\pi - 25\\pi = 39\\pi$. Sector: un cuarto de $144\\pi$, es decir, $36\\pi$.', 'En el trapecio usa la semisuma de las bases; en la corona resta áreas; en el sector toma la parte de la vuelta.'),
    sol('Un mosaico tiene forma de hexágono regular de lado 4 cm. ¿Cuál es su área?', [
      'El hexágono regular se parte, desde su centro, en [[6]] triángulos equiláteros de lado 4 cm',
      'Cada equilátero vale $\\tfrac{l^2\\sqrt3}{4} = \\tfrac{16\\sqrt3}{4} =$ [[4√3]] cm²',
      'El hexágono vale $6 \\cdot 4\\sqrt3 =$ [[24√3]] cm²',
    ], ['16√3', '8√3', '4'], 'Seis equiláteros de lado 4: cada uno vale $\\tfrac{16\\sqrt3}{4} = 4\\sqrt3$ y entre todos $24\\sqrt3$ cm². Es lo mismo que semiperímetro por apotema: $12 \\cdot 2\\sqrt3$.', 'El radio de un hexágono regular mide lo mismo que su lado: por eso los seis triángulos son equiláteros.'),
    err('En un círculo de radio 6 cm, una cuerda subtiende un ángulo central de $90^\\circ$. ¿Cuál es el área del segmento circular menor que determina la cuerda?', [
      'El sector de $90^\\circ$ es un cuarto del círculo: $\\tfrac14 \\cdot 36\\pi = 9\\pi$ cm²',
      'Los dos radios y la cuerda forman un triángulo rectángulo: $\\tfrac{6 \\cdot 6}{2} = 18$ cm²',
      'El segmento es el sector más el triángulo: $9\\pi + 18$ cm²',
    ], 2, ['El segmento es el sector menos el triángulo: $9\\pi - 18$ cm²', 'El segmento es el triángulo menos el sector: $18 - 9\\pi$ cm²', 'El segmento es el círculo menos el triángulo: $36\\pi - 18$ cm²'],
    'El segmento circular es lo que queda entre la cuerda y el arco: al sector se le quita el triángulo de los dos radios. $9\\pi - 18$ cm².', 'Dibuja el sector y dentro de él el triángulo: ¿qué parte queda entre la cuerda y el arco?'),
    opc('Las diagonales de un rombo miden 16 cm y 12 cm. Su área y su perímetro son, en ese orden:', ['96 cm² y 40 cm', '192 cm² y 40 cm', '96 cm² y 56 cm', '192 cm² y 28 cm'], 0,
      'Área: $\\tfrac{16 \\cdot 12}{2} = 96$ cm². Las diagonales se cortan perpendicularmente en su punto medio: el lado es $\\sqrt{8^2 + 6^2} = 10$ y el perímetro, 40 cm.', 'El área sale del semiproducto de las diagonales; para el lado, mira el triángulo rectángulo que forman las medias diagonales.'),
  ]);

  // --------------------------------------------------------------------------------------------- 2 · Relaciones entre áreas
  const l2 = leccion('euc-areas-2', 'Relaciones entre áreas', guion(
    ['Misma altura, misma base', 'Dos triángulos con la misma altura tienen áreas proporcionales a sus bases; con la misma base, proporcionales a sus alturas.'],
    ['Entre paralelas', 'Si dos triángulos tienen la misma base y sus vértices opuestos están sobre una paralela a esa base, tienen la misma altura: son equivalentes.'],
    ['Las medianas', 'Una mediana parte el triángulo en dos triángulos equivalentes. Las tres medianas, que se cortan en el baricentro, lo parten en seis triángulos equivalentes.'],
    ['Figuras semejantes', 'Si dos figuras son semejantes con razón $k$, sus áreas están en razón $k^2$: lados al triple, área nueve veces mayor.'],
    ['Un ángulo congruente', 'Si dos triángulos tienen un ángulo congruente, sus áreas son entre sí como los productos de los lados que forman ese ángulo.'],
  ), [
    x('parte-base', 'La base BC mide **10**. Mueve D sobre ella hasta que el área de △ABD sea a la de △ADC como **3 es a 2**.', { L: 10, m: 3, n: 2, ap: 4 },
      'Los dos triángulos tienen la misma altura desde A, así que sus áreas son como sus bases: $BD : DC = 3 : 2$. De 10 unidades, $BD = \\tfrac{3}{5} \\cdot 10 = 6$.', 'Los dos triángulos comparten la altura que baja desde A. Entonces, ¿de qué depende cuál tiene más área?'),
    x('desliza-paralela', 'El triángulo dorado tiene base AB. Arrastra P hasta que △ABP sea **equivalente** al dorado y además **isósceles**, con $PA = PB$.', { a: 2, b: 8, c: [3, 5], tipo: 'iso' },
      'Para conservar el área sobre la misma base, P debe quedar a la misma altura, 5: sobre la paralela a AB por el vértice dorado. Y para que $PA = PB$, encima del punto medio de AB.', 'Si la base no cambia, lo único que decide el área es la altura. ¿Por dónde puede moverse P sin cambiarla?'),
    x('mediana-seis', 'El triángulo ABC tiene área **54**. Se trazan sus tres medianas, que se cortan en G. Pon el área de cada triángulo.', { area: 54, fichas: ['27', '9', '18', '6', '36', '13.5'] },
      'La mediana AM deja dos mitades: $54 \\div 2 = 27$. Las tres medianas forman seis triángulos equivalentes: $54 \\div 6 = 9$. Y △BGC son dos de ellos: 18.', 'Una mediana parte la base en dos trozos congruentes con la misma altura. Las tres juntas dejan seis partes equivalentes.'),
    x('equivalentes-o-no', 'Toca **todas** las afirmaciones que son verdaderas.', { casos: [
      { t: 'Una mediana parte el área en dos mitades', si: true },
      { t: 'Lados al doble: área al doble', no: 'Con los lados al doble el área se multiplica por 4: la razón de las áreas es k².' },
      { t: 'Igual altura: áreas como las bases', si: true },
      { t: 'Igual perímetro: igual área', no: 'Un rectángulo de 1 por 5 y un cuadrado de lado 3 tienen perímetro 12, pero áreas 5 y 9.' },
      { t: 'Misma base entre paralelas: equivalentes', si: true },
    ], falta: 'Falta alguna verdadera: piensa en base y altura.', ok: 'Base y altura deciden; la semejanza eleva al cuadrado.' },
    'Son verdaderas la de la mediana, la de igual altura y la de las paralelas. Con lados al doble el área se cuadruplica, y el perímetro no decide el área.', 'Para cada afirmación piensa en la base y la altura de los triángulos, o busca un ejemplo con números pequeños.'),
    x('papel-factor', 'Un cuadrado se amplía a otro semejante cuya área es **49 veces** mayor. ¿Por cuánto se multiplicó cada lado?', { veces: 49 },
      'En figuras semejantes la razón de las áreas es el cuadrado de la razón de los lados: $k^2 = 49$, así que $k = 7$.', 'Si el lado se multiplica por k, caben k filas de k copias. ¿Qué número por sí mismo da las veces pedidas?'),
    x('semejantes-area', 'Dos triángulos **semejantes** tienen lados correspondientes de **6** y **15**. El chico tiene área **8**. Pon la razón de los lados, la de las áreas y el área del grande.', {
      t: { a: 6, b: 15, s: 8 }, et: ['razón de lados', 'razón de áreas', 'área grande'], metas: ['5/2', '25/4', '50'], fichas: ['5/2', '25/4', '50', '20', '5/4', '25/2'],
      mira: ['Divide el lado grande entre su correspondiente: 15 entre 6, simplificado.', 'La razón de las áreas es el cuadrado de la razón de los lados.', 'Multiplica el área chica por la razón de las áreas.'],
      trampas: { '2:20': 'Multiplicaste por la razón de los lados: las áreas crecen con su cuadrado.', '1:5/2': 'Esa es la razón de los lados: la de las áreas es su cuadrado.', '1:25/2': 'Se eleva al cuadrado arriba y abajo: 5² sobre 2².' }, ok: 'Lados por 5/2, área por 25/4.' },
      'Razón de los lados: $\\tfrac{15}{6} = \\tfrac{5}{2}$. Razón de las áreas: $\\left(\\tfrac{5}{2}\\right)^2 = \\tfrac{25}{4}$. Área del grande: $8 \\cdot \\tfrac{25}{4} = 50$.', 'Primero compara los lados correspondientes. Las áreas no crecen igual que los lados: crecen con el cuadrado.'),
    x('angulo-compartido', 'En △ABC, $AB = 12$ y $AC = 10$; D está en AB con $AD = 6$. Mueve E sobre AC hasta que el área de △ADE sea $\\tfrac{3}{10}$ de la de △ABC.', { c: 12, b: 10, d: 6, m: 3, n: 10 },
      'Los dos triángulos comparten el ángulo A: $\\tfrac{AD \\cdot AE}{AB \\cdot AC} = \\tfrac{6 \\cdot AE}{120} = \\tfrac{3}{10}$ da $AE = 6$.', 'Con un ángulo común, compara el producto de los dos lados que lo forman en cada triángulo.'),
    x('lanza-escala', 'Lanza el número que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos triángulos tienen la **misma altura**; sus bases miden 6 y 15. El primero tiene área 12: ¿y el segundo?', r: 30, c: '12 \\cdot \\tfrac{15}{6}', e: { 21: 'Sumaste la diferencia de las bases: las áreas son proporcionales a ellas.' } },
      { q: 'Las tres medianas parten un triángulo de área 84 en seis triángulos. ¿Cuánto vale cada uno?', r: 14, c: '84 \\div 6', e: { 28: 'Son seis triángulos equivalentes, no tres.' } },
      { q: 'Dos triángulos **semejantes** tienen lados correspondientes 4 y 6. El chico tiene área 12: ¿y el grande?', r: 27, c: '12 \\cdot \\left(\\tfrac{6}{4}\\right)^2', e: { 18: 'Multiplicaste por la razón de los lados; las áreas van con su cuadrado.' } },
    ] }, 'Misma altura: $12 \\cdot \\tfrac{15}{6} = 30$. Medianas: $84 \\div 6 = 14$. Semejantes: $12 \\cdot \\tfrac{9}{4} = 27$.', 'Misma altura: las áreas van como las bases. Semejantes: van como el cuadrado de la razón de los lados.'),
    sol('En el triángulo ABC, M es el punto medio del lado BC. Demuestra que los triángulos ABM y AMC son equivalentes.', [
      '$BM = MC$, porque M es [[punto medio]] de BC',
      'La altura $h$ trazada desde A a la recta BC es la [[misma]] para los dos triángulos',
      'Área de △ABM $= \\tfrac{BM \\cdot h}{2}$ y área de △AMC $= \\tfrac{MC \\cdot h}{2}$: bases [[congruentes]] y la misma altura',
      'Luego las dos áreas son [[iguales]]: la mediana parte el triángulo en dos equivalentes',
    ], ['bisectriz', 'semejantes', 'distinta'], 'M parte la base en dos segmentos congruentes y la altura desde A es común: las dos áreas, $\\tfrac{BM \\cdot h}{2}$ y $\\tfrac{MC \\cdot h}{2}$, son iguales.', 'Para comparar áreas de triángulos compara sus bases y sus alturas: aquí una de las dos es compartida.'),
    err('Dos terrenos triangulares semejantes tienen lados correspondientes de 20 m y 30 m. El menor tiene 180 m² de área. ¿Cuál es el área del mayor?', [
      'La razón de semejanza es $k = \\tfrac{30}{20} = \\tfrac32$',
      'La razón de las áreas también es $\\tfrac32$',
      'El área del mayor es la del menor por esa razón',
    ], 1, ['La razón de las áreas es $k^2 = \\tfrac94$: el mayor mide $180 \\cdot \\tfrac94 = 405$ m²', 'La razón de las áreas es $2k = 3$: el mayor mide $540$ m²', 'La razón de las áreas es $\\tfrac{1}{k} = \\tfrac23$: el mayor mide $120$ m²'],
    'En figuras semejantes las áreas están en razón $k^2$: $\\left(\\tfrac32\\right)^2 = \\tfrac94$ y $180 \\cdot \\tfrac94 = 405$ m².', 'Si cada lado crece una vez y media, ¿crece igual el área? Piensa en un cuadrado al que se le duplica el lado.'),
    opc('En el triángulo ABC, D está en AB y E en AC, con AD = 4, AB = 10, AE = 5 y AC = 8. La razón entre el área de △ADE y la de △ABC es:', ['1/2', '5/8', '1/4', '2/5'], 2,
      'Comparten el ángulo A: la razón de las áreas es $\\tfrac{AD \\cdot AE}{AB \\cdot AC} = \\tfrac{4 \\cdot 5}{10 \\cdot 8} = \\tfrac{20}{80} = \\tfrac14$.', 'Los dos triángulos tienen el ángulo A en común: compara los productos de los lados que lo forman.'),
  ]);

  // ------------------------------------------------------------------------------------------------- 3 · Áreas sombreadas
  const l3 = leccion('euc-areas-3', 'Áreas sombreadas', guion(
    ['Sumar y restar', 'Una región sombreada casi nunca tiene fórmula propia: se arma sumando y restando áreas conocidas. Lo de afuera menos lo de adentro.'],
    ['Cuadrado y círculo', 'El círculo inscrito en un cuadrado tiene por radio medio lado. Si el cuadrado es el inscrito, su diagonal es el diámetro del círculo.'],
    ['Cuartos de círculo', 'Un cuarto de círculo menos el triángulo de sus dos radios es un segmento circular. Dos segmentos iguales forman un pétalo.'],
    ['Simetría y piezas que se mueven', 'Si una pieza que sobra es congruente con una que falta, se traslada y la figura queda más sencilla. Las figuras simétricas se calculan por mitades.'],
    ['En función de π', 'Las respuestas se dejan exactas: $100 - 25\\pi$, $18\\pi - 36$. No se reemplaza π por 3.14.'],
  ), [
    x('marco-hueco', 'A una lámina de **13 por 9** se le recorta un hueco cuadrado en el centro. Ajusta el hueco para que queden **68** cuadros de lámina.', { w: 13, h: 9, area: 68 },
      'La lámina entera vale $13 \\cdot 9 = 117$. Para que queden 68 hay que quitar $117 - 68 = 49$: un cuadrado de lado 7.', 'Lo sombreado es la lámina entera menos el hueco. ¿Cuánta área hay que quitar?'),
    x('cuadrado-circulo', 'Un cuadrado de lado **10** tiene su círculo **inscrito**. Pon el área del cuadrado, la del círculo y la de la región sombreada.', { modo: 'inscrito', l: 10, fichas: ['100', '25π', '100 − 25π', '100π', '10π', '25π − 100', '100 − 10π'] },
      'Cuadrado: $10^2 = 100$. El radio del círculo inscrito es medio lado: $\\pi \\cdot 5^2 = 25\\pi$. Sombreada: $100 - 25\\pi$.', 'El círculo inscrito toca los cuatro lados del cuadrado. ¿Cuánto mide entonces su diámetro?'),
    x('corona-borde', 'El hueco de una arandela tiene radio **3**. Agranda el borde de afuera, con el mismo centro, hasta que la **corona** mida $16\\pi$.', { r: 3, area: 16 },
      'El hueco vale $9\\pi$. El círculo de afuera debe valer $16\\pi + 9\\pi = 25\\pi$: su radio es 5.', 'La corona es el círculo grande menos el chico. Se restan las áreas, no los radios.'),
    x('esquinas-cuarto', 'A una baldosa cuadrada de lado **10** se le quitan cuatro cuartos de círculo iguales, uno en cada esquina. Ábrelos hasta que lo sombreado mida $100 - 9\\pi$.', { l: 10, k: 9 },
      'Los cuatro cuartos juntos hacen un círculo entero de radio $r$: se quita $\\pi r^2 = 9\\pi$, así que $r = 3$.', 'Junta mentalmente las cuatro esquinas que se quitan. ¿Qué figura completa forman?'),
    x('petalo-cuartos', 'En un cuadrado de lado **6** se trazan dos cuartos de círculo de radio 6, con centros en vértices opuestos. Pon el área de cada parte hasta llegar al **pétalo**.', { l: 6, fichas: ['9π', '18', '9π − 18', '18π − 36', '36π', '36', '18π − 18', '9π − 36'] },
      'Cuarto de círculo: $\\tfrac14 \\cdot 36\\pi = 9\\pi$. Triángulo: medio cuadrado, 18. Segmento: $9\\pi - 18$. El pétalo son dos segmentos: $18\\pi - 36$.', 'La diagonal del cuadrado parte el pétalo en dos segmentos circulares iguales. Empieza por uno solo.'),
    x('bandera-onda', 'A una bandera de **14 por 6** le sobra medio círculo a un lado y le falta uno igual al otro. Estira el rectángulo hasta que tenga su **misma área**.', { w: 14, h: 6 },
      'La pieza que sobra es congruente con la que falta: al trasladarla queda el rectángulo de $14 \\cdot 6 = 84$. No hace falta π.', 'Compara la pieza que sobresale con el hueco del otro lado. ¿Qué pasa si la mueves hasta allá?'),
    x('pi-lanza', 'Lanza las partes de π de cada figura. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un cuadrado de lado **12** con su círculo inscrito: lo sombreado mide $144 - k\\pi$. Lanza $k$.', f: { t: 'cc', l: 12 }, r: 36, c: '144 - \\pi \\cdot 6^2 = 144 - 36\\pi', e: { 12: 'Con 12π mediste el borde del círculo: el área es el radio por el radio, por π.', 6: 'Ese es el radio: falta elevarlo al cuadrado.' } },
      { q: 'Un sector de radio **9** y ángulo $120^\\circ$: su área es $k\\pi$. Lanza $k$.', f: { t: 'sector', r: 9, g: 120 }, r: 27, c: '\\tfrac{120}{360} \\cdot 81\\pi = 27\\pi', e: { 6: 'Con 6π mediste el arco. El área usa el radio por el radio.' } },
      { q: 'A un rectángulo de **12 por 6** se le quita medio círculo de radio 6: queda $72 - k\\pi$. Lanza $k$.', f: { t: 'medio', r: 6 }, r: 18, c: '72 - \\tfrac12 \\cdot 36\\pi = 72 - 18\\pi', e: { 36: 'Quitaste el círculo entero: es solo la mitad.' } },
    ] }, 'Círculo inscrito: radio 6, $36\\pi$. Sector: un tercio de $81\\pi$, $27\\pi$. Medio círculo: la mitad de $36\\pi$, $18\\pi$.', 'En cada figura busca el radio, calcula el círculo entero y toma solo la parte que aparece.'),
    sol('Un hexágono regular está inscrito en un círculo de radio 6 cm. Halla el área de la región del círculo que queda fuera del hexágono.', [
      'Círculo: $\\pi \\cdot 6^2 =$ [[36π]] cm²',
      'El lado del hexágono regular inscrito mide lo mismo que el radio: [[6]] cm',
      'Hexágono: seis triángulos equiláteros de $\\tfrac{36\\sqrt3}{4} = 9\\sqrt3$ cm², en total [[54√3]] cm²',
      'Región sombreada: [[36π − 54√3]] cm²',
    ], ['12π', '9√3', '54√3 − 36π', '12'], 'Círculo menos polígono inscrito: $36\\pi - 6 \\cdot 9\\sqrt3 = 36\\pi - 54\\sqrt3$ cm².', 'Lo de afuera menos lo de adentro. El hexágono regular inscrito se parte en seis equiláteros de lado igual al radio.'),
    err('En un cuadrado de lado 8 cm se dibujan, hacia adentro, dos semicírculos cuyos diámetros son dos lados opuestos. ¿Cuál es el área del cuadrado que queda fuera de los semicírculos?', [
      'Cada semicírculo tiene por diámetro un lado: su radio es 4 cm',
      'Los dos semicírculos juntos valen $2 \\cdot \\pi \\cdot 4^2 = 32\\pi$ cm²',
      'Área pedida: la del cuadrado, 64 cm², menos la de los semicírculos',
    ], 1, ['Los dos semicírculos juntos forman un círculo: $\\pi \\cdot 4^2 = 16\\pi$ cm², y quedan $64 - 16\\pi$ cm²', 'Los dos semicírculos juntos valen $\\pi \\cdot 8^2 = 64\\pi$ cm², y quedan $64 - 64\\pi$ cm²', 'Los dos semicírculos juntos valen $2 \\cdot \\pi \\cdot 4 = 8\\pi$ cm², y quedan $64 - 8\\pi$ cm²'],
    'Dos semicírculos de radio 4 hacen un círculo entero: $16\\pi$. Queda $64 - 16\\pi$ cm². Además, $64 - 32\\pi$ sería negativo: una señal de error.', 'Dos mitades iguales hacen un entero. Revisa también si la respuesta final puede ser un área.'),
    opc('En un cuadrado de lado 4 cm se traza un cuarto de círculo con centro en un vértice y radio 4 cm. El área de la parte del cuadrado que queda fuera del cuarto de círculo, en cm², es:', ['16 − 8π', '16 − 4π', '4π − 16', '16 − 16π'], 1,
      'Cuadrado: 16. Cuarto de círculo: $\\tfrac14 \\cdot \\pi \\cdot 4^2 = 4\\pi$. Queda $16 - 4\\pi$ cm².', 'Calcula el cuadrado y el cuarto de círculo por separado, y resta lo de adentro a lo de afuera.'),
  ]);

  return mundo('euc-areas', [l1, l2, l3], [
    ['euc-areas-1', 'Círculo: del área πr² se despeja el radio.', x('radio-area', 'Una fuente circular ocupa $81\\pi$ m². Arrastra el borde hasta el radio que le corresponde.', { area: 81 },
      'El área del círculo es $\\pi r^2 = 81\\pi$: $r^2 = 81$ y $r = 9$.', 'El área usa el radio por el radio.')],
    ['euc-areas-1', 'Trapecio: semisuma de las bases por la altura.', x('trapecio-gemelo', 'El trapecio tiene bases **15** y **7**. Estira el rectángulo de igual altura hasta que sean **equivalentes**.', { B: 15, b: 7 },
      'La semisuma de las bases es $\\tfrac{15 + 7}{2} = 11$: esa es la base del rectángulo equivalente.', 'Busca la base que queda a medio camino.')],
    ['euc-areas-1', 'Fórmula de Herón: empieza por el semiperímetro.', opc('Los lados de un triángulo miden 13 cm, 14 cm y 15 cm. Su área, en cm², es:', ['42', '168', '91', '84'], 3,
      'Semiperímetro: $p = 21$. Herón: $\\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.', 'Usa el semiperímetro y las tres diferencias.')],
    ['euc-areas-2', 'Con la misma altura, las áreas son como las bases.', x('parte-base', 'La base BC mide **12**. Mueve D hasta que el área de △ABD sea a la de △ADC como **1 es a 2**.', { L: 12, m: 1, n: 2, ap: 7, d0: 6 },
      'Misma altura desde A: $BD : DC = 1 : 2$. De 12 unidades, $BD = \\tfrac13 \\cdot 12 = 4$.', 'Reparte la base como se reparten las áreas.')],
    ['euc-areas-2', 'Figuras semejantes: las áreas están en razón k².', x('achica-area', 'Un cartel de **9 por 6** se copia a escala con la **novena parte** del área. Arrastra la esquina de la copia.', { w: 9, h: 6, div: 9 },
      'Área entre 9 quiere decir lados entre 3: la copia mide 3 por 2.', '¿Qué número al cuadrado da la reducción del área?')],
    ['euc-areas-2', 'Las tres medianas dejan seis triángulos equivalentes.', opc('Las tres medianas de un triángulo de 72 cm² se cortan en G. El área del triángulo que forman G y dos de los vértices es:', ['12 cm²', '24 cm²', '36 cm²', '18 cm²'], 1,
      'Cada uno de los seis triángulos vale 12 cm²; el que forman G y dos vértices tiene dos de ellos: 24 cm².', 'Cuenta cuántos de los seis triangulitos lo forman.')],
    ['euc-areas-3', 'Cuadrado inscrito: su diagonal es el diámetro.', x('cuadrado-circulo', 'Un cuadrado está **inscrito** en un círculo de radio **4**. Pon el área del círculo, la del cuadrado y la de la región sombreada.', { modo: 'circunscrito', r: 4, fichas: ['16π', '32', '16π − 32', '64', '16', '32 − 16π', '16π − 64'] },
      'Círculo: $16\\pi$. El cuadrado es un rombo de diagonales 8 y 8: $\\tfrac{8 \\cdot 8}{2} = 32$. Sombreada: $16\\pi - 32$.', 'Las diagonales del cuadrado son diámetros.')],
    ['euc-areas-3', 'Restar: la figura de afuera menos la de adentro.', x('esquinas-cuarto', 'A un cuadrado de lado **12** se le quitan cuatro cuartos de círculo iguales en las esquinas. Ábrelos hasta que lo sombreado mida $144 - 16\\pi$.', { l: 12, k: 16 },
      'Los cuatro cuartos hacen un círculo de radio $r$: $\\pi r^2 = 16\\pi$ da $r = 4$.', 'Las cuatro esquinas juntas forman un círculo.')],
    ['euc-areas-3', 'Corona circular: se restan las áreas, no los radios.', opc('Dos circunferencias concéntricas tienen radios 9 cm y 6 cm. El área de la corona circular que determinan es:', ['9π cm²', '15π cm²', '45π cm²', '117π cm²'], 2,
      'Se restan las áreas: $81\\pi - 36\\pi = 45\\pi$ cm².', 'Calcula cada círculo y resta el chico al grande.')],
  ]);
})());
;
//#archivo js/courses/euclidiana-construcciones.js
// Geometría Euclidiana · mundo 8 «euc-construcciones» Regla y Compás (spec 2026-11-26-curso-euclidiana). Números y contextos propios.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  const l1 = leccion('euc-construcciones-1', 'Construcciones elementales', guion(
    ['Dos instrumentos', 'La regla no tiene marcas: solo une dos puntos. El compás traza arcos y lleva una distancia de un lugar a otro.'],
    ['Mediatriz', 'Dos arcos del mismo radio desde A y desde B, con radio mayor que la mitad de AB, se cortan en dos puntos: la recta que los une es la mediatriz.'],
    ['Bisectriz', 'Un arco desde el vértice marca D y E; dos arcos iguales desde D y E se cortan en F. El rayo que va del vértice a F parte el ángulo en dos congruentes.'],
    ['Por qué funciona', 'Cada construcción arma dos triángulos con tres pares de lados iguales: son congruentes por L-L-L.'],
    ['Copiar y repartir', 'Copiando un ángulo se traza una paralela; con marcas iguales en una auxiliar y paralelas, un segmento queda en partes iguales.']), [
    x('compas-mediatriz', 'El segmento AB mide **6**. Abre el compás para que los dos arcos del mismo radio, uno desde A y otro desde B, se corten en **M** y **N**, a **4** del segmento.', { L: 6, h: 4 },
      'La mitad de AB es 3 y la altura es 4: el radio es la hipotenusa, $\\sqrt{3^2 + 4^2} = 5$. Con el mismo radio, M y N equidistan de A y de B.', 'De A al cruce M hay un triángulo rectángulo: un cateto es la mitad de AB y el otro, la altura que se pide.'),
    x('radios-sin-cruce', 'Para trazar la mediatriz de AB se hacen dos arcos del **mismo radio**, uno desde A y otro desde B. Toca **todos** los radios con los que NO salen dos puntos de cruce.', { L: 10, radios: [3, 5, 6, 8, 4] },
      'La mitad de AB es 5. Con 3 y con 4 los arcos no se alcanzan, y con 5 apenas se tocan en un punto: hace falta un radio mayor que la mitad.', 'Imagina los dos arcos acercándose desde los extremos: ¿hasta dónde tiene que llegar cada uno para pasar por encima del otro?'),
    x('razon-del-paso', 'Con el mismo radio se trazaron arcos desde A y desde B, que se cortan en M y N. Pon la **razón** de cada afirmación.', {
      et: ['AM = BM', 'AN = BN', 'MN = MN', '△AMN ≅ △BMN'], metas: ['mismo radio', 'mismo radio', 'lado común', 'L-L-L'], fichas: ['mismo radio', 'mismo radio', 'lado común', 'L-L-L', 'L-A-L', 'ángulo recto'],
      mira: ['Los dos arcos que se cortan en M se trazaron con la misma abertura.', 'También N salió del cruce de dos arcos de igual radio.', 'Ese segmento es el mismo en los dos triángulos.', 'Ya hay tres pares de lados congruentes y ningún ángulo conocido.'],
      trampas: { '3:L-A-L': 'Todavía no se conoce ningún ángulo: solo hay tres pares de lados.', '2:mismo radio': 'MN no se trazó con el compás: es un lado que comparten los dos triángulos.', '3:ángulo recto': 'El ángulo recto es lo que se quiere probar: no se puede usar como razón.' },
      ok: 'Tres pares de lados: congruentes por L-L-L. Por eso MN parte a AB en dos mitades y en ángulo recto.' },
      'AM = BM y AN = BN porque el radio es el mismo; MN es común. Por L-L-L los triángulos AMN y BMN son congruentes, y de ahí sale que MN es la mediatriz.', 'Mira de dónde salió cada segmento: unos los trazó el compás con la misma abertura y otro está en los dos triángulos.'),
    x('bisectriz-cruce', 'Un arco de centro B y radio **5** marcó D y E en los lados del ángulo. Con ese mismo radio se trazan un arco desde D y otro desde E. Lleva **F** al punto donde se cortan.', { B: [2, 1], d: [3, 4], ini: [9, 3] },
      'F queda a 5 de D y a 5 de E. Como BD = BE, DF = EF y BF es común, los triángulos BDF y BEF son congruentes por L-L-L: el rayo BF parte el ángulo en dos iguales.', 'Busca un punto de la cuadrícula que esté a 5 de D y también a 5 de E: piensa en la familia 3-4-5. El vértice B no cuenta.'),
    x('pasos-construccion', 'Para trazar la **bisectriz** del ángulo B solo hay regla sin marcas y compás. Pon los pasos en orden.', {
      fig: 'bisectriz', metas: ['arco desde B', 'arcos desde D y E', 'marcar el cruce F', 'trazar el rayo BF'], fichas: ['arco desde B', 'arcos desde D y E', 'marcar el cruce F', 'trazar el rayo BF', 'medir el ángulo', 'unir D con E'],
      mira: ['Lo primero es marcar D y E en los lados, a la misma distancia de B.', 'Con D y E ya marcados se trazan dos arcos del mismo radio.', 'Los dos arcos se cortan en un punto: ese es F.', 'Al final la regla une B con F: ese rayo es la bisectriz.'],
      trampas: { '0:medir el ángulo': 'Ni la regla ni el compás miden ángulos: se empieza con un arco desde el vértice.', '1:unir D con E': 'Unir D con E no da ningún punto nuevo: hacen falta dos arcos que se corten.', '1:medir el ángulo': 'Ni la regla ni el compás miden ángulos: aquí van dos arcos iguales.' },
      ok: 'Un arco, dos arcos iguales, su cruce y el rayo.' },
      'El arco desde B deja D y E a igual distancia; los arcos iguales desde D y E se cortan en F, y el rayo BF es la bisectriz.', 'Cada paso usa puntos que ya existen: D y E no aparecen hasta que se traza el arco con centro en el vértice.'),
    x('divide-tales', 'AB mide **10** y se quiere partir en **4** partes iguales. En una semirrecta auxiliar se llevaron 4 marcas iguales con el compás y la última se unió con B. Pon **X** donde cae la paralela que sale de la marca **3**.', { L: 10, n: 4, k: 3 },
      'Las paralelas cortan segmentos proporcionales: como las marcas son iguales, AB queda en 4 partes de 2.5, y la tercera cae a $3 \\cdot 2.5 = 7.5$ de A.', 'Las marcas de la auxiliar son iguales entre sí, así que las partes de AB también lo son: ¿cuánto mide cada una?'),
    x('lanza-compas', 'El compás traza un arco desde A y otro igual desde B. Dale el radio que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'AB mide **12**. El **menor** radio entero con el que los arcos se cortan en dos puntos', L: 12, r: 7, c: '\\tfrac{12}{2} + 1', e: { 6: 'Con 6 los arcos apenas se tocan en el punto medio: hay que pasar de la mitad.' } },
      { q: 'AB mide **16**. Los arcos deben cortarse a **6** del segmento', L: 16, h: 6, r: 10, c: '\\sqrt{8^2 + 6^2}', e: { 6: 'Con radio 6 los arcos no llegan a la mitad de AB, que es 8.', 14: 'Sumaste 8 y 6: el radio va en diagonal, es una hipotenusa.' } },
      { q: 'AB mide **10**. Los arcos deben cortarse a **12** del segmento', L: 10, h: 12, r: 13, c: '\\sqrt{5^2 + 12^2}', e: { 12: 'El radio no es la altura: es la hipotenusa de catetos 5 y 12.' } }] },
      'Más que la mitad: $6 + 1 = 7$. Después, hipotenusas: $\\sqrt{64 + 36} = 10$ y $\\sqrt{25 + 144} = 13$.', 'El radio siempre debe pasar de la mitad de AB; si se pide una altura, el radio es la hipotenusa de la mitad y esa altura.'),
    sol('Por un punto P exterior a una recta m se trazó una transversal que corta a m en Q. Con el compás se copió en P el ángulo que la transversal forma con m, en la misma posición. ¿Por qué la recta que resulta es paralela a m?',
      ['El ángulo en P se copió con el compás: es [[congruente]] con el ángulo en Q', 'Los dos quedan del mismo lado de la transversal y en la misma posición: son [[correspondientes]]', 'Dos rectas que forman con una transversal ángulos correspondientes congruentes son [[paralelas]]'], ['suplementario', 'perpendiculares', 'opuestos por el vértice'],
      'Copiar el ángulo deja dos correspondientes congruentes, y eso obliga a que las rectas sean paralelas.', 'Piensa en qué pareja de ángulos forman una transversal y dos rectas cuando los ángulos quedan en la misma esquina.'),
    err('Se quiere levantar la perpendicular a una recta por un punto P que está sobre ella.',
      ['Con centro en P y un mismo radio se marcan R y S sobre la recta, a lado y lado de P', 'Con centro en R y en S se trazan dos arcos de radio igual a PR, que se cortan en M', 'Se traza la recta PM, que es perpendicular a la recta dada'], 1,
      ['Con centro en R y en S se trazan dos arcos de un mismo radio mayor que PR, que se cortan en M', 'Con centro en P se traza otro arco de radio mayor, que corta a la recta en M', 'Con centro en R se traza un solo arco de radio PR y se toma en él un punto M cualquiera'],
      'P es el punto medio de RS: con radio PR los arcos solo se tocan en P. Con un radio mayor se cortan en M, y PM es la mediatriz de RS.', 'PM debe ser la mediatriz de RS: recuerda qué radio hace falta para que los dos arcos se corten fuera del segmento.'),
    opc('En las construcciones, la regla no tiene marcas y el compás traza arcos y conserva su abertura. ¿Cuál de estas tareas NO se puede hacer directamente con esos instrumentos?',
      ['Unir dos puntos con una recta', 'Trazar una circunferencia con centro y radio dados', 'Marcar un segmento de 5 cm leyendo la regla', 'Llevar la longitud de un segmento a otra recta'], 2,
      'La regla solo une puntos: no mide. Las longitudes se llevan con la abertura del compás.', 'Piensa en lo único que hace cada instrumento: uno traza rectas por dos puntos y el otro, arcos con un centro y una abertura.'),
  ]);

  const l2 = leccion('euc-construcciones-2', 'Lugares geométricos y construcción de triángulos', guion(
    ['Lugar geométrico', 'Es el conjunto de todos los puntos que cumplen una condición: a una distancia fija de un punto, una circunferencia; equidistantes de dos puntos, la mediatriz.'],
    ['Más lugares', 'A una distancia fija de una recta: dos paralelas. Equidistantes de dos rectas que se cortan: las bisectrices. Los puntos que ven un segmento bajo el mismo ángulo: el arco capaz.'],
    ['Cruzar lugares', 'Un punto que debe cumplir dos condiciones está donde se cortan los dos lugares.'],
    ['Triángulos', 'Con tres lados se cruzan dos arcos (si cada lado es menor que la suma de los otros); también basta con dos lados y el ángulo comprendido, o un lado y sus dos ángulos.'],
    ['Dos circunferencias', 'Las mediatrices se cortan en el circuncentro, centro de la que pasa por los vértices; las bisectrices, en el incentro, centro de la inscrita.']), [
    x('lugar-distancias', 'Lleva **P** a un punto que esté a **5** de A y a **3** de la recta r.', { pts: { A: [5, 7] }, recta: 1, conds: [['d', 'A', 5], ['r', 3]], ini: [7, 2],
      txt: 'sobre la paralela a 3 de $r$, donde la corta la circunferencia de centro $A$ y radio 5', ok: 'Está en la circunferencia de centro A y radio 5 y en la paralela a 3 de r.' },
      'Los puntos a 3 de r forman una paralela; los que están a 5 de A, una circunferencia. Se cortan donde A queda 3 arriba y 4 a un lado: $\\sqrt{3^2 + 4^2} = 5$.', 'Primero ubica todos los puntos que están a 3 de la recta: forman una línea. Sobre ella busca el que queda a 5 de A.'),
    x('lugar-equidista', 'La circunferencia tiene centro O y radio 5. Lleva **P** a un punto de ella que **equidiste** de A y de B.', { pts: { O: [7, 5], A: [6, 8], B: [9, 5] }, conds: [['d', 'O', 5, true], ['eq', 'A', 'B']], ini: [12, 5],
      txt: 'donde la mediatriz de $AB$ corta a la circunferencia', ok: 'Está sobre la circunferencia y sobre la mediatriz de AB.' },
      'Los puntos que equidistan de A y B forman la mediatriz de AB. Esa recta corta a la circunferencia en dos puntos, y cualquiera de los dos cumple las dos condiciones.', 'Equidistar de A y de B es estar en la mediatriz de AB: pasa por su punto medio y es perpendicular a él. Síguela hasta la circunferencia.'),
    x('tercer-lado', 'Se va a construir un triángulo con dos lados de **9** y **5**. ¿Entre qué enteros puede medir el tercero para que los dos arcos se corten?', { a: 9, b: 5, max: 15 },
      'Más que la resta, 4, y menos que la suma, 14: de 5 a 13. Con 4 o con 14 los arcos apenas se tocan y queda una línea.', 'Traza la base de 9 y piensa en el arco de radio 5 desde un extremo: ¿qué radios del otro arco alcanzan a cortarlo?'),
    x('datos-determinan', 'Toca **todos** los datos con los que se puede construir un triángulo, y solo uno (sin contar su posición).', { casos: [
      { t: 'Lados de 4, 6 y 9', si: true },
      { t: 'Lados de 3, 5 y 9', no: 'Con 3, 5 y 9 los arcos no se cortan: 3 + 5 no alcanza a 9.' },
      { t: 'Lados de 5 y 7 con 40° entre ellos', si: true },
      { t: 'Ángulos de 50°, 60° y 70°', no: 'Con solo los ángulos salen triángulos de muchos tamaños: semejantes, no uno solo.' },
      { t: 'Un lado de 6 con 50° y 60° en sus extremos', si: true },
      { t: 'Un lado de 6 con 100° y 90° en sus extremos', no: 'Dos ángulos que suman 190° no dejan que los otros dos lados se encuentren.' }],
      falta: 'Falta alguno: tres lados que cierran, L-A-L y A-L-A fijan un solo triángulo.', ok: 'L-L-L (si cierra), L-A-L y A-L-A: los mismos criterios de congruencia.' },
      'Tres lados que cumplen la desigualdad triangular, dos lados con el ángulo comprendido, o un lado con sus dos ángulos (que sumen menos de 180°) dan un único triángulo.', 'Para cada dato imagina la construcción: ¿los trazos se encuentran en un punto, y en uno solo a cada lado de la base?'),
    x('triangulo-tres-lados', 'La base AB mide **14**. Lleva **C** al cruce de los dos arcos para que AC mida **13** y BC mida **15**.', { A: 0, ab: 14, ac: 13, bc: 15, ini: [7, 4] },
      'Con altura 12: $5^2 + 12^2 = 13^2$ desde A y $9^2 + 12^2 = 15^2$ desde B, y $5 + 9 = 14$. C queda 5 a la derecha de A y 12 arriba.', 'El arco de centro A y radio 13 pasa por pocos puntos de la cuadrícula (familia 5-12-13). Busca el que además queda a 15 de B.'),
    x('pasos-construccion', 'Se quiere trazar la circunferencia que pasa por los **tres vértices** del triángulo ABC. Pon los pasos en orden.', {
      fig: 'circun', metas: ['dos mediatrices', 'marcar el cruce O', 'abrir de O hasta A', 'girar el compás'], fichas: ['dos mediatrices', 'marcar el cruce O', 'abrir de O hasta A', 'girar el compás', 'dos bisectrices', 'abrir de A hasta B'],
      mira: ['El centro equidista de los vértices: se empieza por las mediatrices de dos lados.', 'Donde se cortan las dos mediatrices está el centro O.', 'El radio va del centro O a un vértice.', 'Con esa abertura y centro en O se traza la circunferencia.'],
      trampas: { '0:dos bisectrices': 'Las bisectrices dan el centro de la inscrita; para pasar por los vértices van las mediatrices.', '2:abrir de A hasta B': 'El radio va del centro a un vértice, no de un vértice a otro.' },
      ok: 'El circuncentro equidista de A, B y C.' },
      'Las mediatrices de dos lados se cortan en O, que equidista de los tres vértices; con radio OA la circunferencia pasa por A, B y C.', 'El centro debe estar a la misma distancia de A, de B y de C: ¿qué lugar geométrico equidista de dos puntos?'),
    x('centro-inscrita', 'El triángulo tiene catetos de 8 y 6. Lleva **I** al centro de la circunferencia **inscrita**: el punto que está a la misma distancia de los **tres lados**.', { Q: [3, 1], a: 8, b: 6, ini: [8, 2] },
      'Equidistar de dos lados es estar en la bisectriz de su ángulo. Sobre la bisectriz del ángulo recto, el punto que está a 2 de los catetos también queda a 2 de la hipotenusa: es el incentro.', 'Empieza por la bisectriz del ángulo recto: ahí cada punto está a lo mismo de los dos catetos. Avanza por ella hasta igualar la distancia a la hipotenusa.'),
    x('cuenta-cruces', 'Se trazan los dos lugares geométricos. ¿Cuántos puntos cumplen las **dos** condiciones a la vez? Puedes fallar **una** vez.', { tiros: [
      { q: 'A está a **2** de la recta r. Puntos a **5** de A y a **3** de r', k: 'cp', a: 2, R: 5, d: 3, r: 3, c: '2 + 1 = 3', e: { 4: 'La paralela de abajo queda justo a 5 de A: la circunferencia solo la toca.', 2: 'Hay dos paralelas a 3 de r, una a cada lado, y la de abajo también cuenta.' } },
      { q: 'A y B están a **10**. Puntos a **6** de A y a **8** de B', k: 'cc', D: 10, r1: 6, r2: 8, r: 2, c: '8 - 6 < 10 < 8 + 6 \\Rightarrow 2', e: { 1: 'Las circunferencias se cortan a los dos lados de AB: uno arriba y otro abajo.' } },
      { q: 'A y B están a **12**. Puntos a **5** de A y a **7** de B', k: 'cc', D: 12, r1: 5, r2: 7, r: 1, c: '5 + 7 = 12 \\Rightarrow 1', e: { 2: 'Como 5 + 7 = 12, las circunferencias apenas se tocan sobre AB: ahí no hay triángulo.' } }] },
      'La paralela de arriba corta dos veces y la de abajo es tangente: 3. Con $2 < 10 < 14$ hay 2 cruces. Con $5 + 7 = 12$ las circunferencias se tocan en 1.', 'Dibuja cada lugar: una circunferencia, dos paralelas o dos circunferencias, y mira si se cortan, se tocan o no se alcanzan.'),
    sol('Tres veredas A, B y C no están en línea recta. ¿Dónde se instala una antena que quede a la misma distancia de las tres?',
      ['Los puntos que equidistan de A y de B forman la [[mediatriz]] de AB', 'Los que equidistan de B y de C forman la mediatriz de [[BC]]', 'La antena va donde se cortan: es el [[circuncentro]] del triángulo ABC'], ['bisectriz', 'incentro', 'AC'],
      'Cada mediatriz reúne los puntos que equidistan de dos veredas; su cruce equidista de las tres: el circuncentro.', 'Cada condición «a la misma distancia de dos puntos» es un lugar geométrico: nombra cuál y cruza dos de ellos.'),
    err('Se pide construir el triángulo ABC con AB = 7, el ángulo A de 50° y AC = 4.',
      ['Se traza el segmento AB de 7', 'En A se copia el ángulo de 50°, con un lado sobre AB', 'Con centro en B y radio 4 se marca C sobre el otro lado del ángulo', 'Se une C con B'], 2,
      ['Con centro en A y radio 4 se marca C sobre el otro lado del ángulo', 'Con centro en B y radio 7 se marca C sobre el otro lado del ángulo', 'Con centro en A y radio 7 se marca C sobre el segmento AB'],
      'AC sale de A: el compás se apoya en A con abertura 4. Así el ángulo de 50° queda comprendido entre los lados de 7 y 4 (L-A-L).', '¿Desde cuál extremo se mide el lado AC? Ahí va la punta fija del compás.'),
    opc('Se quiere construir un triángulo con dos lados de 4 cm y 5 cm. ¿Con cuál de estas medidas del tercer lado NO se puede construir?',
      ['9 cm', '8 cm', '2 cm', '6 cm'], 0,
      'Como $4 + 5 = 9$, con 9 cm los dos arcos apenas se tocan sobre la base: queda una línea, no un triángulo.', 'Cada lado debe ser menor que la suma de los otros dos y mayor que su diferencia.'),
  ]);

  return mundo('euc-construcciones', [l1, l2], [
    ['euc-construcciones-1', 'Mediatriz: dos arcos del mismo radio, mayor que la mitad del segmento.', x('compas-mediatriz', 'AB mide **8**. Abre el compás para que los arcos del mismo radio desde A y desde B se corten a **3** del segmento.', { L: 8, h: 3 },
      'La mitad de AB es 4 y la altura 3: el radio es $\\sqrt{4^2 + 3^2} = 5$.', 'El radio es una hipotenusa: un cateto es la mitad de AB y el otro, la altura.')],
    ['euc-construcciones-1', 'Marcas iguales en una auxiliar y paralelas: partes iguales.', x('divide-tales', 'AB mide **12** y se parte en **8** partes iguales con marcas en una semirrecta auxiliar. Pon **X** donde cae la paralela que sale de la marca **3**.', { L: 12, n: 8, k: 3 },
      'Cada parte mide $12 \\div 8 = 1.5$, y la tercera paralela cae a $3 \\cdot 1.5 = 4.5$ de A.', 'Las partes de AB son iguales entre sí: halla primero cuánto mide una.')],
    ['euc-construcciones-1', 'Perpendicular por un punto: es la mediatriz de un segmento auxiliar.', opc('Para bajar la perpendicular a una recta desde un punto P exterior, un arco de centro P corta a la recta en R y S; luego dos arcos iguales desde R y S se cortan en M. La recta PM es perpendicular porque:',
      ['P y M están a la misma distancia de la recta', 'P y M equidistan de R y de S: PM es la mediatriz de RS', 'El triángulo PRS siempre es equilátero', 'Los arcos desde R y S tienen el mismo radio que el de centro P'], 1,
      'P equidista de R y S (mismo arco) y M también (arcos iguales): los dos están en la mediatriz de RS.', '¿Qué recta reúne a todos los puntos que equidistan de R y de S?')],
    ['euc-construcciones-2', 'Tres lados: el tercer vértice es el cruce de dos arcos.', x('triangulo-tres-lados', 'La base AB mide **4**. Lleva **C** al cruce de los dos arcos para que AC mida **15** y BC mida **13**.', { A: 0, ab: 4, ac: 15, bc: 13, ini: [6, 5] },
      'Con altura 12: $9^2 + 12^2 = 15^2$ y $5^2 + 12^2 = 13^2$, con $9 - 5 = 4$. C queda más allá de B: el triángulo es obtusángulo.', 'Busca una altura común a las familias 9-12-15 y 5-12-13; los pies no tienen que caer entre A y B.')],
    ['euc-construcciones-2', 'Circuncentro: cruce de las mediatrices, equidista de los vértices.', x('centro-tres-puntos', 'Lleva **P** al centro de la circunferencia que pasa por A, B y C: el punto que **equidista** de los tres.', { pts: { A: [3, 2], B: [11, 2], C: [10, 9] }, conds: [['eq', 'A', 'B'], ['eq', 'B', 'C']], circ: 'A', ini: [5, 6],
      txt: 'el circuncentro: donde se cortan las mediatrices de $AB$ y de $BC$', ok: 'Equidista de A, B y C: es el circuncentro.' },
      'La mediatriz de AB es vertical y pasa por su punto medio; sobre ella, el punto que queda a 5 de B y de C es el circuncentro.', 'Empieza por la mediatriz de AB: todos sus puntos equidistan de A y de B. Sobre ella iguala la distancia a C.')],
    ['euc-construcciones-2', 'Incentro: cruce de las bisectrices, centro de la inscrita.', opc('El punto donde se cortan las bisectrices de los tres ángulos de un triángulo es el centro de:',
      ['la circunferencia que pasa por los tres vértices', 'la mediatriz del lado mayor', 'el arco capaz del lado mayor', 'la circunferencia tangente a los tres lados'], 3,
      'Cada bisectriz reúne los puntos que equidistan de dos lados: su cruce equidista de los tres y es el centro de la inscrita.', 'Los puntos de una bisectriz están a la misma distancia de los dos lados del ángulo.')],
  ]);
})());
