// Preicfes · Lectura Crítica · mundo 1 «Lo que Dice el Texto» (spec 2026-11-20-curso-preicfes): la primera competencia de la
// prueba, identificar y entender los contenidos locales (datos, ideas de cada párrafo, palabras y referencias). Cada lección
// trabaja un texto original en 7 juegos LEC distintos y cierra con un juego en movimiento; la evaluación usa otro texto con
// preguntas A–D. Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg } = ICF;

  const AGUA = {
    id: 'icf-agua', title: 'El agua que se pierde antes de llegar',
    ficha: { autor: 'Redacción de medio ambiente', fuente: 'Periódico regional', fecha: 'Marzo de 2026' },
    paras: [
      'En muchas ciudades colombianas, de cada 100 litros de agua que una planta potabiliza, cerca de 40 nunca llegan a una casa. Se escapan por tubos rotos, conexiones ilegales y medidores que marcan menos de lo que pasa por ellos. Los ingenieros llaman a esa diferencia «agua no contabilizada», y es uno de los problemas más caros y menos visibles de los acueductos.',
      'La mayor parte de esa agua no se pierde en grandes rupturas, que se ven y se reparan rápido, sino en fugas pequeñas y constantes. Un tubo con una grieta del tamaño de una lenteja puede botar más de mil litros al día durante años, enterrado bajo el pavimento, sin que nadie lo note. Como el agua se filtra hacia el suelo, la calle sigue seca y la fuga sigue abierta.',
      'Encontrar esas fugas es un trabajo de oído. Por la noche, cuando casi nadie usa el agua y el tráfico disminuye, los técnicos recorren las calles con geófonos, unos audífonos conectados a un sensor que se apoya en el piso. El agua que escapa a presión produce un silbido característico. «Uno aprende a distinguir el sonido de una fuga del de un desagüe o un motor», cuenta Marcela Ortiz, técnica de un acueducto municipal que lleva doce años en ese oficio.',
      'Reparar no basta si el agua circula a una presión mayor de la necesaria. Por eso algunas empresas dividieron sus redes en sectores y les instalaron válvulas que bajan la presión en la madrugada. Con menos presión, las fugas pierden menos agua y los tubos se rompen con menos frecuencia. En un municipio del Valle del Cauca, esa medida redujo las pérdidas en una cuarta parte en tres años.',
      'El problema también tiene un lado social. Algunas familias que viven en barrios sin redes formales se conectan como pueden, con mangueras y uniones improvisadas que se rompen con facilidad. Para los acueductos, convertir esas conexiones en servicios legales, con medidor y tarifas diferenciales, recupera agua y, al mismo tiempo, garantiza un derecho.',
      'Cada litro recuperado es un litro que no hay que sacar de un río ni tratar de nuevo. En temporadas secas, cuando los embalses bajan, esa diferencia puede decidir si una ciudad raciona o no. Cerrar las fugas, concluyen los expertos, es la fuente de agua más barata que existe.',
    ],
  };

  const SUENO = {
    id: 'icf-sueno', title: 'Dormir tarde no siempre es pereza',
    ficha: { autor: 'Equipo de divulgación de una facultad de medicina', fuente: 'Revista para familias', fecha: 'Febrero de 2026' },
    paras: [
      'A las once de la noche, Daniela, de dieciséis años, no tiene sueño. Su mamá cree que es por el celular; sus profesores, que es desorden. Sin embargo, buena parte de la explicación está en su cuerpo: durante la adolescencia, el reloj interno que regula el sueño se corre más o menos dos horas hacia la noche.',
      'Ese reloj depende, entre otras cosas, de la melatonina, una hormona que el cerebro libera cuando oscurece y que prepara al cuerpo para dormir. En los niños aparece temprano, hacia las ocho o nueve de la noche; en los adolescentes, en cambio, llega cerca de las once. Por eso un joven que se acuesta a las nueve suele quedarse mirando el techo: su cuerpo todavía no da la señal.',
      'El problema es que el horario del colegio no se corre con él. Si la jornada empieza a las seis y media de la mañana, Daniela tiene que levantarse a las cinco, y con suerte habrá dormido seis horas, cuando los especialistas recomiendan entre ocho y diez a esa edad. La falta de sueño no se nota solo en los bostezos: afecta la memoria, el ánimo y la capacidad de concentrarse en clase.',
      'Algunos colegios de otros países hicieron un experimento sencillo: retrasaron la entrada una hora. Los estudiantes no se acostaron más tarde, como temían los rectores; durmieron más. Las faltas de asistencia bajaron y las notas de las primeras clases mejoraron. Aun así, el cambio no es fácil: mover el horario afecta el transporte escolar, el trabajo de los padres y las actividades de la tarde.',
      'Mientras tanto, hay hábitos que ayudan. La luz de las pantallas (sobre todo la azul) retrasa la melatonina todavía más, así que apagar el celular una hora antes de dormir sí sirve. También ayuda levantarse a la misma hora los fines de semana: dormir hasta el mediodía el domingo hace que el lunes se sienta como un viaje a otro país.',
      'Entender el reloj de los adolescentes no significa justificarlo todo. Significa dejar de llamar «pereza» a lo que en parte es biología, y buscar soluciones que trabajen con ese reloj y no contra él.',
    ],
  };

  const l1 = leccion('icf-lc-literal-1', 'Datos e ideas del texto', [
    sc(6, 'Casi la mitad de la prueba se responde volviendo al texto. La primera habilidad es saber **qué dice**: sus datos, quién habla y cuál es la idea de cada párrafo.', { title: 'Volver al texto' }),
    sc(7, 'Antes de leer, el título, el autor y la fuente anuncian el tema y el propósito. «Cómo funciona una vacuna», en una revista de ciencia, promete explicar; una columna de opinión promete defender una postura.', { title: 'La ficha avisa' }),
    sc(7, 'Cada párrafo hace algo: presenta un problema, explica una causa, da un ejemplo, cita a alguien o concluye. Ponerle una etiqueta a cada uno arma el **esqueleto** del texto.', { title: 'El esqueleto' }),
    sc(7, 'Ejemplo: «El café se cultiva entre 1 200 y 2 000 metros» es un dato que el texto **dice**. «En la costa no se cultiva café» **se deduce**. «El café colombiano es el mejor» **no lo dice**, aunque suene bien.', { title: 'Dice, se deduce, no lo dice' }),
    sc(6, 'En una pregunta EXCEPTO, se busca cada opción en el texto. La que no aparece, o la que lo contradice, es la respuesta.', { title: 'La trampa del EXCEPTO' }),
  ], [
    x('antes-de-leer', 'El texto está tapado. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: AGUA, frase: 'Va a hablar de [0], para [1]. Será [2].', rot: ['¿qué tema?', '¿para qué?', '¿qué clase de texto?'],
      ...F(['el agua que pierden los acueductos', 0, 'El título habla de agua que no alcanza a llegar a alguna parte.'], ['informar de un problema', 1, 'Una redacción de periódico, ¿para qué suele escribir?'], ['un artículo informativo', 2, 'Mira la fuente: un periódico regional.'], ['la historia de los ríos', null, 'El título habla de llegar, no de ríos antiguos.'], ['convencer de no pagar', null, 'Una redacción de periódico no firma campañas de ese tipo.'], ['un cuento', null, 'La fecha y la fuente no son de un libro de cuentos.']),
      luz: [[1, 'cerca de 40 nunca llegan a una casa'], [6, 'Cerrar las fugas']], bien: 'La apuesta se cumple: un problema, sus causas y sus soluciones.' },
      'El título nombra el agua que se pierde y lo firma una redacción de medio ambiente en un periódico: se espera un texto que informa.', 'Lee título, autor y fuente por separado: cada uno responde una parte distinta de la apuesta.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: AGUA,
      ...F(['presenta el problema con un dato', 0, 'Busca el párrafo que da una cantidad de cada 100.'], ['explica dónde se pierde más', 1, 'Busca el que compara rupturas grandes y fugas pequeñas.'], ['describe cómo se buscan', 2, 'Busca el de los aparatos y el oído.'], ['presenta una medida y su resultado', 3, 'Busca el que habla de la presión.'], ['muestra el lado social', 4, 'Busca el que habla de familias y conexiones.'], ['concluye', 5, 'Busca el que junta todo en una idea final.'], ['cuenta la vida de una técnica', null, 'La técnica solo aparece en una cita: ningún párrafo cuenta su vida.']),
      luz: [[1, 'cerca de 40 nunca llegan'], [3, 'geófonos'], [4, 'válvulas'], [5, 'lado social']], bien: 'Problema, causa, búsqueda, medida, lado social y conclusión.' },
      'El texto va del dato al problema de fondo, luego a cómo se busca, qué se hace, a quién afecta y qué se concluye.', 'Para cada párrafo no digas de qué habla, sino qué hace: ¿da un dato, explica, describe, propone o cierra?'),
    x('donde-mirar', 'De cada párrafo solo ves el comienzo. Lleva cada pregunta al párrafo donde la buscarías.', { doc: AGUA,
      ...F(['¿Qué instrumento se usa para oír fugas?', 2, 'Busca el comienzo que habla de oír.'], ['¿Para qué se instalaron válvulas?', 3, 'Busca el comienzo que nombra la presión.'], ['¿Quiénes se conectan con mangueras?', 4, 'Busca el comienzo que anuncia personas y no tubos.']),
      luz: [[3, 'geófonos'], [4, 'bajan la presión en la madrugada'], [5, 'barrios sin redes formales']], bien: 'El comienzo de un párrafo anuncia lo que trae.' },
      'El tercer párrafo empieza con «un trabajo de oído»; el cuarto, con la presión; el quinto, con «un lado social».', 'Subraya en cada pregunta su palabra clave y busca qué comienzo la promete.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón: ¿el texto la dice, se deduce o habría que inventarla?', { doc: AGUA, nums: [2, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La mayor parte del agua perdida se va en fugas pequeñas.', 0, 'Léela junto a la primera oración del párrafo 2.'], ['Una fuga sin charco tarda más en repararse.', 1, 'No está con esas palabras: ¿qué pasa si la calle sigue seca?'], ['Con menos fugas baja el riesgo de racionar.', 1, 'El párrafo 6 no lo afirma así: junta los embalses con el agua recuperada.'], ['La mitad de las fugas son ilegales.', 2, '¿En cuál de estas oraciones hay una cantidad de conexiones ilegales?'], ['Cerrar fugas es la fuente de agua más barata.', 0, 'Léela junto a la última oración del texto.']),
      luz: [[2, 'fugas pequeñas y constantes'], [2, 'la calle sigue seca y la fuga sigue abierta'], [6, 'la fuente de agua más barata que existe']], bien: 'Escrito, pensado con lo escrito o inventado.' },
      'Dos están casi con las mismas palabras; dos salen de juntar oraciones; la de la mitad no tiene de dónde salir.', 'Busca primero si está escrita. Si no, pregunta qué oraciones tendrías que juntar para llegar a ella.'),
    x('talla-idea', 'Tres resúmenes del párrafo 4: pon cada uno en su talla.', { doc: AGUA, p: 4, rot: ['se queda en un detalle', 'justa', 'dice de más'],
      ...F(['Hubo una medida en el Valle del Cauca.', 0, 'Es cierto, pero ¿cubre lo que dice todo el párrafo?'], ['Bajar la presión reduce pérdidas y roturas.', 1, 'Compárala con el principio y el final del párrafo.'], ['Bajando la presión se acaban las fugas.', 2, 'Compara el verbo con lo que el párrafo dice que pasó.']),
      luz: [[4, 'pierden menos agua y los tubos se rompen con menos frecuencia']], bien: 'La idea justa cubre todo el párrafo y no promete de más.' },
      'El Valle es solo el ejemplo; «se acaban» exagera, porque las pérdidas bajaron una cuarta parte.', 'Una idea justa vale para el comienzo y el final del párrafo. Desconfía de los verbos absolutos.'),
    x('sella-parrafo', '«El agua se pierde por todo lo siguiente, **EXCEPTO**:» Ata cada opción al párrafo que la prueba; la respuesta es la que no está.', { doc: AGUA,
      ...T(['Grietas del tamaño de una lenteja', 1, 'Busca la comparación con un grano.'], ['Uniones improvisadas que se rompen', 4, 'Busca el párrafo de las mangueras.'], ['Más presión de la necesaria', 3, 'Busca el párrafo que habla de la madrugada.'], ['Evaporación en los embalses', 6, 'Los embalses se nombran. ¿Dice el texto que ahí se pierda agua?']),
      luz: [[2, 'del tamaño de una lenteja'], [4, 'a una presión mayor de la necesaria'], [5, 'uniones improvisadas']], bien: 'La opción sin párrafo es la respuesta.' },
      'Las grietas están en el 2, la presión en el 4 y las uniones en el 5; los embalses aparecen, pero no como causa de pérdida.', 'Nombrar una palabra del texto no basta: la opción debe estar como causa de pérdida.'),
    x('pinta-voces', 'Pinta cada oración con el color de quien la sostiene.', { doc: AGUA, plumas: ['el autor', 'la técnica', 'los expertos'],
      ...P(['Se aprende a distinguir el sonido de una fuga.', 1, 'Busca las comillas y mira quién «cuenta».'], ['Cerrar las fugas es lo más barato.', 2, 'Busca el verbo que presenta de quién es esa conclusión.'], ['La mayor parte se pierde en fugas pequeñas.', 0, '¿Hay comillas o un «según» cerca de esa idea?'], ['El problema también es social.', 0, '¿Alguien más la firma en el párrafo 5?']), bien: 'Comillas y verbos de decir muestran quién habla.' },
      'Las comillas son de Marcela Ortiz, «concluyen los expertos» presenta la última idea y lo demás lo dice el autor.', 'Busca verbos como «cuenta» o «concluyen». Lo que no tiene dueño es de quien escribe.'),
    x('tacha-resumen', 'Este resumen salió muy largo. Tacha las dos oraciones que no hacen falta.', { doc: AGUA, lineas: ['De cada 100 litros tratados se pierden unos 40.', 'La técnica lleva doce años en el oficio.', 'Se pierden sobre todo en fugas pequeñas y ocultas.', 'Las fugas se oyen y la presión se puede bajar.', 'La grieta era como una lenteja.', 'Cerrar fugas es la fuente más barata.'], ...S([1, 4], { 0: 'Es el dato que plantea el problema.', 2: 'Es la causa principal del problema.', 3: 'Son las dos maneras de enfrentarlo.', 5: 'Es la conclusión del texto.' }), bien: 'Queda una idea por cada parte del mapa.' },
      'Los años de la técnica y la lenteja son detalles: sin ellos, el texto se entiende igual.', 'Quita cada oración y pregúntate si todavía se entiende el problema, la causa, la medida y la conclusión.'),
  ]);

  const l2 = leccion('icf-lc-literal-2', 'Palabras y referencias', [
    sc(6, 'Muchas preguntas piden el sentido de una palabra **en esa oración**. El diccionario da varias; el texto escoge una.', { title: 'La palabra en su lugar' }),
    sc(7, 'Ejemplo: «el río **arrastra** troncos» es llevar; «él **arrastra** una tristeza» es cargar con algo. Se prueba cada opción dentro de la oración y se queda la que no cambia el sentido.', { title: 'Probar en la oración' }),
    sc(7, 'Palabras como «este», «ella», «lo», «las primeras» o «él» **apuntan** a algo dicho antes. Para saber a qué, se busca hacia atrás lo que concuerda en género, número y sentido.', { title: 'Hilos hacia atrás' }),
    sc(7, 'Los conectores dicen cómo se unen dos ideas: «sin embargo» contrasta, «por eso» saca una consecuencia, «porque» da la causa y «por ejemplo» ilustra.', { title: 'Bisagras entre ideas' }),
    sc(6, 'Los signos también hablan: las comillas citan o presentan un nombre, los paréntesis aclaran y los dos puntos anuncian una explicación.', { title: 'Lo que hacen los signos' }),
  ], [
    x('cambia-palabra', 'Pon en cada hueco la palabra que dice lo mismo que la tachada. Sobran dos.', { doc: SUENO, frases: [[1, 'el reloj interno que ', 'regula', ' el sueño'], [2, 'una hormona que el cerebro ', 'libera', ' cuando oscurece'], [6, 'no significa ', 'justificarlo', ' todo']],
      ...F(['controla', 0, '¿Qué hace el reloj con el sueño: lo impide, lo acorta o lo maneja?'], ['suelta', 1, '¿Qué hace el cerebro con la hormona cuando llega la noche?'], ['darle la razón en', 2, '¿Qué se evita hacer con todo lo que hagan los adolescentes?'], ['prohíbe', null, 'El reloj no impide dormir: decide la hora.'], ['compra', null, 'En el cuerpo nadie paga por las hormonas.']), bien: 'La palabra cambia; lo que dice la oración, no.' },
      'Regular es controlar, liberar es soltar y justificar, dar la razón: cada una se prueba dentro de su oración.', 'Pon cada opción en la oración y léela completa: la buena no cambia el sentido.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: SUENO, texto: 'Conviene buscar |soluciones| que trabajen con |ese reloj| y no contra |los adolescentes|. Él no se apaga por orden de nadie; ellas, en cambio, sí se pueden escoger.',
      ...T(['«Él»', 1, 'Pon en su lugar lo que ataste: ¿qué es lo que no se apaga?'], ['«ellas»', 0, 'Pon en su lugar lo que ataste: ¿qué se puede escoger?']), bien: 'Género, número y sentido llevan al referente.' },
      '«Él» es masculino singular y no se apaga: el reloj. «Ellas» es femenino plural y se escogen: las soluciones.', 'Busca hacia atrás lo que concuerde en género y número y después prueba el sentido.'),
    x('bisagras', 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.', { doc: SUENO, pares: [['Su mamá cree que es por el celular.', 'buena parte de la explicación está en su cuerpo.'], ['La melatonina llega cerca de las once.', 'un joven que se acuesta a las nueve se queda mirando el techo.'], ['Apagar el celular una hora antes ayuda.', 'levantarse siempre a la misma hora.']],
      ...F(['Sin embargo,', 0, 'Opone: ¿dónde la segunda idea contradice a la primera?'], ['Por eso', 1, 'Concluye: ¿dónde la segunda idea es resultado de la primera?'], ['También ayuda', 2, 'Suma: ¿dónde la segunda idea va en la misma dirección?'], ['Porque', null, 'Daría la causa de lo anterior y ninguna segunda idea lo es.'], ['Por ejemplo,', null, 'Ninguna segunda idea es un caso de la primera.']), bien: 'Se oponen, se concluye y se suma.' },
      'La mamá y la biología se oponen, la hora de la melatonina trae la consecuencia y los hábitos se suman.', 'Antes de mirar las fichas, di qué hace la segunda idea: ¿choca, resulta o agrega?'),
    x('signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: SUENO, texto: 'La luz de las pantallas |(|sobre todo la azul) retrasa la melatonina todavía más|.| Significa dejar de llamar |«|pereza» a lo que en parte es biología.',
      ...T(['abre una aclaración', 0, 'Busca el signo que encierra cuál luz es.'], ['toma distancia de una palabra', 2, 'Busca la palabra que usan otros y el autor no acepta.']), bien: 'El paréntesis precisa; las comillas toman distancia.' },
      'El paréntesis precisa qué luz es; las comillas marcan la palabra «pereza», que el autor no comparte.', 'Mira qué queda dentro de cada signo y si el autor lo diría con su propia voz.'),
    x('pista-tipo', 'Cada pista está en una oración. Átala.', { doc: SUENO, lineas: ['A las once de la noche, Daniela no tiene sueño.', 'La melatonina prepara al cuerpo para dormir.', 'Las faltas bajaron cuando retrasaron la entrada.', 'Conviene apagar el celular una hora antes.'],
      ...T(['un caso concreto', 0, 'Busca la oración con una persona y una hora.'], ['para qué sirve algo', 1, 'Busca la que dice qué hace una sustancia.'], ['el resultado de un cambio', 2, 'Busca la que compara antes y después.'], ['un consejo', 3, 'Busca la que dice qué es bueno hacer.']), bien: 'Caso, explicación, resultado y consejo.' },
      'El texto abre con un caso, explica la hormona, muestra un resultado y termina con consejos.', 'Pregunta a cada oración qué hace: ¿presenta a alguien, explica, compara o recomienda?'),
    x('comprueba-apuesta', 'Alguien dijo: «Retrasar la entrada solo haría que se acostaran más tarde». Subraya la oración del párrafo 4 que lo desmiente.', { doc: SUENO, nums: [4], apuesta: 'Si entran más tarde, se acostarán más tarde.', ...S(['4.1'], { '4.0': 'Dice qué hicieron los colegios, no qué pasó con la hora de acostarse.', '4.2': 'Habla de faltas y de notas, no de la hora de acostarse.', '4.3': 'Cuenta las dificultades del cambio.' }), bien: 'No se acostaron más tarde: durmieron más.' },
      'La segunda oración del párrafo 4 dice que no se acostaron más tarde, como se temía, sino que durmieron más.', 'Busca la oración que habla justamente de a qué hora se acostaron.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a una oración que la desmiente.', { doc: SUENO, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'El reloj del sueño de un adolescente va más tarde que el de un niño.',
      ...T(['A un adolescente le bastan seis horas de sueño.', 4, 'Busca la oración que dice cuántas horas se recomiendan.'], ['La falta de sueño solo hace bostezar.', 5, 'Busca la oración que nombra la memoria y el ánimo.'], ['Entender el reloj es perdonarlo todo.', 6, 'Busca la oración que dice qué no significa entender.']), bien: 'Cada opción cae con una oración del texto.' },
      'Se recomiendan entre ocho y diez horas, la falta de sueño afecta la memoria y entender no es justificarlo todo.', 'Saca la palabra clave de cada opción y busca qué dice el texto justo sobre ella.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en este resumen.', { doc: SUENO, lineas: ['El reloj del sueño se corre en la adolescencia.', 'Daniela mira el techo.', 'El horario del colegio no se corre con él.', 'Retrasar la entrada ayudó, aunque es difícil.', 'El domingo parece un viaje a otro país.', 'Conviene trabajar con el reloj y no contra él.'], ...S([1, 4], { 0: 'Es la causa que explica todo el texto.', 2: 'Es el problema que trae ese corrimiento.', 3: 'Es la prueba de que hay una salida.', 5: 'Es la conclusión del autor.' }), bien: 'Quedan causa, problema, prueba y conclusión.' },
      'El techo y el viaje son imágenes que ilustran: las ideas quedan completas sin ellas.', 'Una imagen o una comparación se puede quitar; una causa o una conclusión, no.'),
  ]);

  const MURALES = {
    id: 'icf-murales', title: 'Las paredes que cuentan el barrio',
    paras: [
      'Hace diez años, la calle principal del barrio era una fila de muros grises con avisos de «se vende» y grafitis sin firma. Hoy, los buses turísticos se detienen allí para que los visitantes fotografíen más de cuarenta murales pintados por artistas del sector. Lo que empezó como una jornada de limpieza organizada por la junta de acción comunal se convirtió en uno de los recorridos más visitados de la ciudad.',
      'Los murales no son decoración al azar. Cada uno cuenta un episodio de la historia del barrio: la llegada de las primeras familias desplazadas del campo, la construcción del acueducto comunitario con trabajo de los propios vecinos, los partidos de fútbol en el potrero que hoy es una cancha. «Pintar es nuestra manera de que no se olvide lo que costó levantar esto», explica Yeison Mosquera, uno de los artistas.',
      'El recorrido trajo beneficios visibles. Abrieron cafeterías y tiendas de recuerdos, varios jóvenes trabajan como guías y algunos artistas reciben encargos de otras ciudades. La junta calcula que unas trescientas personas obtienen hoy algún ingreso relacionado con los visitantes, y que la calle es más segura porque siempre hay gente en ella.',
      'Sin embargo, no todos están contentos. Algunos vecinos se quejan del ruido, de la basura y de los visitantes que toman fotos de sus casas sin pedir permiso. Otros temen que el éxito haga subir los arriendos y que las familias de siempre terminen yéndose, como ha ocurrido en barrios de otras ciudades que se pusieron de moda.',
      'Para evitarlo, la junta propuso reglas: horarios para los recorridos, guías obligatorios del propio barrio y un aporte de cada visitante para mantener los murales y apoyar a las familias con arriendos más altos. La propuesta todavía se discute, pero deja clara una idea: un barrio puede abrir sus paredes al turismo sin dejar de pertenecer a quienes lo construyeron.',
    ],
  };
  const Q = preg(MURALES, 'lectura');
  return mundo('icf-lc-literal', 'Lo que Dice el Texto', 'lectura', [l1, l2], [
    ['icf-lc-literal-1', 'La idea central reúne lo que dicen todos los párrafos, sin quedarse en un detalle.',
      Q('¿Cuál de los siguientes enunciados resume mejor el texto?', ['Los murales atraen muchos turistas, pero la basura es el mayor problema del barrio', 'Un barrio convirtió sus muros en un recorrido turístico que trae beneficios y tensiones, y busca reglas para seguir siendo de sus vecinos', 'Los artistas del barrio reciben encargos de otras ciudades', 'Las juntas de acción comunal organizan jornadas de limpieza'], 1,
        'El texto recorre el origen de los murales, su sentido, sus beneficios, las quejas y la propuesta de reglas. Las demás opciones toman un solo detalle de un párrafo.',
        'El resumen tiene que valer para el principio y el final del texto, no solo para un párrafo.')],
    ['icf-lc-literal-1', 'Para saber la función de un párrafo, mira qué hace frente al anterior.',
      Q('El párrafo 4 cumple la función de:', ['Presentar las dificultades que trajo el éxito del recorrido', 'Explicar el significado de cada mural', 'Contar la historia de las primeras familias', 'Proponer las reglas para los recorridos'], 0,
        '«Sin embargo, no todos están contentos» anuncia el giro: el párrafo enumera el ruido, la basura, las fotos sin permiso y el miedo a los arriendos.',
        'Lee la primera oración del párrafo: indica qué viene después de los beneficios.')],
    ['icf-lc-literal-1', 'En una pregunta EXCEPTO, cada opción se busca en el texto; la que no está es la respuesta.',
      Q('Según el texto, son beneficios del recorrido, EXCEPTO:', ['Nuevas cafeterías y tiendas', 'Trabajo de guías para jóvenes', 'Encargos para los artistas', 'Arriendos más baratos para las familias'], 3,
        'Las tres primeras están en el párrafo 3. Los arriendos aparecen en el párrafo 4, pero como un temor de que suban, no como un beneficio.',
        'Vuelve al párrafo de los beneficios y marca cada opción que encuentres allí.')],
    ['icf-lc-literal-2', 'Una referencia se entiende buscando hacia atrás lo que concuerda con ella.',
      Q('En el párrafo 5, la expresión «para evitarlo» se refiere a evitar que:', ['Los buses turísticos dejen de llegar', 'Las familias de siempre tengan que irse del barrio', 'Los artistas pinten nuevos murales', 'La junta pierda el control de la cancha'], 1,
        'El párrafo anterior termina con el temor de que suban los arriendos y las familias se vayan; las reglas buscan evitar eso.',
        'Lee la última idea del párrafo 4: «lo» recoge lo que se acaba de decir.')],
    ['icf-lc-literal-2', 'El sentido de una palabra se prueba dentro de su oración.',
      Q('En el párrafo 2, la palabra «levantar» significa:', ['Construir con esfuerzo', 'Despertarse temprano', 'Subir un objeto pesado', 'Protestar contra algo'], 0,
        '«Lo que costó levantar esto» se refiere al barrio: construirlo con el trabajo de las familias, como el acueducto comunitario.',
        'Pregúntate qué es «esto» en la cita del artista y prueba cada opción en la oración.')],
    ['icf-lc-literal-2', 'Las comillas con un nombre al lado citan las palabras de una persona.',
      Q('En el párrafo 2, las comillas se usan para:', ['Destacar una palabra que el autor no acepta', 'Presentar el título de un mural', 'Reproducir lo que dice uno de los artistas', 'Indicar una frase en otro idioma'], 2,
        'Después de la cita viene «explica Yeison Mosquera, uno de los artistas»: las comillas reproducen sus palabras.',
        'Mira lo que viene justo después de las comillas: dice quién habla.')],
  ]);
})());
