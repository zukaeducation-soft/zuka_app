// Preicfes · Lectura Crítica · mundo 7 «Evaluar un Texto» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const TAREA = {
    id: 'icf-tareas', title: 'Por qué dejé de poner tareas',
    ficha: { autor: 'Columna de Hernán Cubillos, profesor', fuente: 'Revista «Aula abierta»', fecha: 'Marzo de 2026' },
    paras: [
      'Durante quince años puse tareas todos los días, como quien pone la mesa. Este año no puse ninguna. Nadie me lo pidió. Lo decidí una noche, mientras calificaba: de treinta cuadernos, veintiséis tenían exactamente el mismo error, en el mismo renglón. No había treinta tareas. Había una, copiada con mucho esmero.',
      'La tarea supone una casa tranquila, una mesa y alguien que ayude. En mi curso hay quien hace la comida de sus hermanos, quien trabaja en la tarde y quien no tiene luz después de las ocho. Para ellos, la tarea no es una oportunidad de aprender: es una manera de llegar al día siguiente en deuda.',
      'Reemplacé la tarea por la primera media hora de clase. Cada uno resuelve, en silencio, tres problemas. Yo camino entre las mesas. Ahora veo el error cuando nace y no cuando ya está seco. También descubrí algo que me avergüenza: en quince años nunca había visto a mis estudiantes pensar. Solo había visto lo que traían pensado.',
      'Un colega me dice que así no se forman hábitos. «La vida pone tareas», repite. Puede ser. Pero el hábito que yo veía formarse era el de copiar sin que se note, y ese la vida ya lo enseña gratis. Otro me recuerda que en otros países dejan muchas tareas y les va bien. También hay países donde dejan pocas y les va mejor. Con los países se puede probar casi cualquier cosa.',
      'No digo que la tarea sea mala. Digo que la mía lo era. Una tarea que nadie puede copiar, porque pregunta por la propia casa o la propia calle, me parece un regalo. El año entrante pondré tres o cuatro de esas, no más.',
      'Los resultados de fin de período subieron un poco. No voy a presumir: el curso también tuvo, por primera vez, textos para todos. No sé cuánto se debe a una cosa y cuánto a la otra. Lo que sí sé es que volví a dormir los domingos, y que ellos también.',
    ],
  };
  const l1 = leccion('icf-lc-evalua-1', 'Supuestos e intención', guion(
    ['Supuesto', 'Lo que el autor da por cierto sin decirlo, y que necesita para que su idea se sostenga.'],
    ['Intención', 'Qué busca en el lector: convencer, conmover, cuestionar, explicar.'],
    ['Recursos', 'Una anécdota, una cifra, una ironía: cada uno con su efecto.'],
    ['Honestidad', 'Un texto gana fuerza cuando reconoce sus límites.']), [
    x('pilares', 'El techo es una idea del autor. ¿Cuáles de estas la sostienen?', { doc: TAREA, idea: 'La tarea diaria no le estaba sirviendo a su curso',
      ...F(['Veintiséis cuadernos tenían el mismo error.', 0, '¿Muestra que la tarea no enseñaba?'], ['Algunos no tienen luz ni tiempo en casa.', 0, '¿Muestra que no todos podían hacerla?'], ['Decidió el cambio una noche.', 1, '¿Dice algo de si servía?'], ['Puso tareas durante quince años.', 1, '¿Dice algo de si servía?']), bien: 'Copia y condiciones, no fechas.' },
      'El error repetido y las condiciones la sostienen; la noche y los años solo ubican.', 'Pregunta si esa frase responde «¿por qué no servía?».'),
    x('genero-o-cita', '¿El autor lo **dice** o lo **supone** para que su idea funcione?', { doc: TAREA, rot: ['lo dice', 'lo supone'],
      ...F(['Hay quien trabaja en la tarde', 0, '¿Encuentras la oración?'], ['Si muchos tienen el mismo error, es porque copiaron', 1, '¿Lo demuestra o lo da por hecho?'], ['Tres problemas cada día, en silencio', 0, '¿Encuentras la oración?'], ['Ver el error mientras nace ayuda a corregirlo', 1, '¿Lo demuestra o lo da por hecho?']), bien: 'Lo supuesto no se escribe: se necesita.' },
      'El trabajo y los tres problemas están escritos; que el error igual sea copia y que verlo nacer ayude se dan por hechos.', 'Si puedes señalar la oración, lo dice; si hace falta para creerle, lo supone.'),
    x('voz-de-la-fuente', 'Ata cada efecto al recurso que lo logra.', { ayuda: 'Tira un hilo desde cada efecto hasta su recurso.', doc: TAREA, portadas: [['Los veintiséis cuadernos', 'párrafo 1'], ['«Ese la vida ya lo enseña gratis»', 'párrafo 4'], ['«Algo que me avergüenza»', 'párrafo 3'], ['«No sé cuánto se debe»', 'párrafo 6']],
      ...T(['mostrar el problema con un caso', 0, '¿Cuál es una anécdota?'], ['responder con ironía', 1, '¿Cuál se burla con elegancia?'], ['confesar para ganar confianza', 2, '¿Cuál admite una falta propia?'], ['reconocer un límite', 3, '¿Cuál dice que no se puede saber?']), bien: 'Caso, ironía, confesión y límite.' },
      'La anécdota muestra, la ironía responde, la confesión acerca y el «no sé» reconoce un límite.', 'Piensa qué siente el lector con cada frase.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que **aclara** qué es lo que critica.', { doc: TAREA, nums: [5], apuesta: 'Critica su tarea, no toda tarea.', ...S(['5.1'], { '5.0': 'Dice lo que no afirma; aún no aclara lo que sí.', '5.2': 'Da un ejemplo de tarea buena.', '5.3': 'Anuncia lo que hará.' }), bien: 'Aclarar evita exagerar.' },
      '«Digo que la mía lo era» precisa lo que critica.', 'Una oración dice lo que no afirma: busca la que dice lo que sí.'),
    x('talla-idea', 'Tres versiones de la intención del autor: pon cada una en su talla.', { doc: TAREA, p: 6, rot: ['se queda en un detalle', 'justa', 'dice de más'],
      ...F(['Contar que duerme los domingos.', 0, 'Es cierto, pero ¿para eso escribe?'], ['Invitar a revisar si las tareas que se ponen enseñan.', 1, 'Compárala con todo el texto.'], ['Lograr que se prohíban las tareas en el país.', 2, '¿Pide prohibir algo?']),
      luz: [[6, 'No voy a presumir'], [6, 'No sé cuánto']], bien: 'Invita a revisar, sin prohibir.' },
      'Dormir es un detalle; no pide prohibir: cuenta su cambio para que otros revisen el suyo.', 'Mira con qué cuidado habla de los resultados.'),
    x('balanza-tesis', 'Idea: «quitar la tarea mejoró los resultados». ¿Qué hace cada dato?', { doc: TAREA, tesis: 'Quitar la tarea mejoró los resultados',
      ...F(['Los resultados subieron ese período.', 0, '¿Va en la misma dirección?'], ['Ese año hubo textos para todos por primera vez.', 1, '¿Da otra explicación?'], ['En otro curso con textos y con tarea subieron igual.', 1, '¿Hizo falta quitarla?'], ['El profesor lleva quince años.', 2, '¿Dice algo de los resultados?']), bien: 'Otra causa posible debilita.' },
      'La subida la apoya; los textos y el otro curso dan otra explicación; los años no pesan.', 'Pregunta qué más cambió en el curso ese año.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: TAREA, frases: [[1, 'copiada con mucho ', 'esmero', ''], [2, 'llegar al día siguiente ', 'en deuda', ''], [6, 'No voy a ', 'presumir', '']],
      ...F(['cuidado', 0, '¿Cómo quedaron esas copias tan iguales?'], ['debiendo algo', 1, '¿Cómo llega quien no pudo hacerla?'], ['alardear', 2, '¿Qué evita hacer con los resultados?'], ['descuido', null, 'Es lo contrario de cómo copiaban.'], ['suponer', null, 'Aquí se trata de no lucirse.']), bien: 'El contexto las explica.' },
      'Esmero es cuidado, en deuda es debiendo y presumir es alardear.', 'Lee la oración completa y prueba la palabra.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: TAREA, lineas: ['Un profesor dejó de poner tareas diarias.', 'Calificaba de noche.', 'Vio que se copiaban y que no todos podían hacerlas.', 'Las cambió por problemas en clase.', 'Un colega repite una frase.', 'Los resultados subieron, sin que sepa del todo por qué.'], ...S([1, 4], { 0: 'Es la decisión.', 2: 'Son las razones.', 3: 'Es el cambio que hizo.', 5: 'Es el resultado con su límite.' }), bien: 'Decisión, razones, cambio y resultado.' },
      'La noche y la frase del colega son detalles; lo demás es el argumento.', 'Deja lo que te ayuda a decidir si le crees al autor.'),
  ]);

  const MIEL = {
    id: 'icf-miel', title: 'La miel que lo cura todo',
    ficha: { autor: 'Sección «Vida sana»', fuente: 'Página web de una tienda naturista', fecha: 'Abril de 2026' },
    paras: [
      '¿Cansado de los resfriados? La ciencia lo confirma: la miel de monte fortalece las defensas. Nueve de cada diez clientes nuestros aseguran que, desde que la toman, se enferman menos. Nuestros abuelos la usaban y vivían cien años. Si ellos lo sabían, ¿por qué seguimos dudando? Pruebe una cucharada en ayunas durante nueve días y después cuéntenos: así lo hicieron don Evelio, de Pasto, y su esposa, que según él no volvieron a toser. Cada semana sorteamos tres frascos entre quienes nos dejan un comentario con cinco estrellas.',
      'Un estudio de una universidad europea, hecho con cuarenta adultos que tenían tos, encontró que una cucharada de miel antes de dormir redujo el número de veces que tosían en la noche. Los investigadores advirtieron que el grupo era pequeño y que no compararon distintas clases de miel. El estudio no midió si se enfermaban menos.',
      'Algunos médicos dicen que no hay pruebas suficientes. Pero los médicos también se han equivocado antes. Además, las grandes farmacias no quieren que usted sepa esto, porque no ganan dinero con las abejas. Lo natural nunca hace daño. Cualquiera que haya visto trabajar una colmena entiende que allí hay una sabiduría que ningún laboratorio puede copiar.',
      'La doctora Pilar Ocampo, nutricionista, opina distinto: «La miel es un alimento agradable y, para una tos leve en mayores de un año, puede dar algo de alivio. No reemplaza una vacuna ni un antibiótico. Y nunca debe darse a bebés menores de un año: puede contener esporas peligrosas para ellos».',
      'Nuestra miel de monte se recoge a mano, en lunas crecientes, por familias que aman lo que hacen. Cada frasco es único. Precio de lanzamiento: 48 000 pesos, el doble de lo que vale en la plaza de mercado la miel corriente, pero con el certificado de origen que imprime y firma nuestra propia tienda. Quedan pocas unidades y no sabemos cuándo habrá otra cosecha.',
      'Al final de la página, en letra gris: «Este producto es un alimento, no un medicamento. Los testimonios fueron elegidos por la tienda. Resultados pueden variar».',
    ],
  };
  const l2 = leccion('icf-lc-evalua-2', 'Validez de un enunciado', guion(
    ['¿Se apoya en algo?', 'Una afirmación es válida si lo que la respalda alcanza para decir eso.'],
    ['Alcance', 'Una muestra pequeña no permite hablar de todos.'],
    ['Trampas', 'Atacar a quien duda, «siempre fue así», «lo natural no daña», el falso «todos lo saben».'],
    ['¿Quién habla?', 'Quien vende tiene un interés: revisa sus datos con más cuidado.']), [
    x('genero-o-cita', '¿El enunciado **se sostiene** con lo que trae la página o **dice de más**?', { doc: MIEL, rot: ['se sostiene', 'dice de más'],
      ...F(['La miel redujo la tos nocturna en ese grupo', 0, '¿El estudio lo midió?'], ['La miel fortalece las defensas', 1, '¿Alguien lo midió?'], ['No se debe dar a menores de un año', 0, '¿Quién lo dice y por qué?'], ['Lo natural nunca hace daño', 1, '¿Hay un caso que lo desmienta?']), bien: 'Medir una cosa no prueba otra.' },
      'La tos se midió y la advertencia se explica; las defensas no se midieron y los bebés desmienten el «nunca».', 'Busca en la página qué se midió exactamente.'),
    x('pista-tipo', 'Ata cada trampa a la frase que la usa.', { doc: MIEL, lineas: ['Los médicos también se han equivocado.', 'Nuestros abuelos la usaban.', 'Nueve de cada diez clientes nuestros.', 'Las farmacias no quieren que usted sepa.'],
      ...T(['desacreditar a quien duda', 0, '¿Cuál habla de los errores de otros?'], ['apelar a la costumbre', 1, '¿Cuál mira al pasado?'], ['muestra elegida a favor', 2, '¿Cuál cuenta solo a los suyos?'], ['sugerir un complot', 3, '¿Cuál habla de algo oculto?']), bien: 'Cuatro trampas con nombre.' },
      'Los errores ajenos, la costumbre, los clientes propios y el complot no prueban nada.', 'Pregunta qué tiene que ver cada frase con la miel.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MIEL, nums: [2, 4, 6], pregunta: 'Queda en pie', queda: 'La miel puede dar algo de alivio a una tos leve.',
      ...T(['El estudio probó que la miel previene enfermedades.', 2, 'Busca qué no midió.'], ['La miel es buena para todos, incluso bebés.', 5, 'Busca a quiénes nunca se debe dar.'], ['Los testimonios se tomaron al azar.', 7, 'Busca quién los escogió.']), bien: 'No midió, nunca y elegidos.' },
      'El estudio no midió si se enfermaban menos, nunca debe darse a bebés y la tienda eligió los testimonios.', 'Saca la palabra clave: previene, bebés, azar.'),
    x('voz-de-la-fuente', 'Ata cada dato a quien lo dice.', { ayuda: 'Tira un hilo desde cada dato hasta quien lo dice.', doc: MIEL, portadas: [['La tienda', 'vende'], ['Los investigadores', 'estudian'], ['La doctora Ocampo', 'atiende'], ['La letra gris', 'aclara']],
      ...T(['nunca hace daño', 0, '¿A quién le conviene decirlo?'], ['el grupo era pequeño', 1, '¿Quién advierte sobre su propio trabajo?'], ['no reemplaza una vacuna', 2, '¿Quién habla de tratamientos?'], ['no es un medicamento', 3, '¿Dónde se esconde?']), bien: 'Importa quién lo dice.' },
      'La tienda promete, los investigadores advierten, la doctora precisa y la letra gris aclara.', 'Piensa qué gana cada uno con lo que dice.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que de verdad se puede afirmar.', { doc: MIEL, filas: [{ antes: 'El estudio se hizo con', topes: ['miles de personas', 'cuarenta adultos con tos', 'bebés'], va: 1 }, { antes: 'Los clientes satisfechos son', topes: ['todos', 'una muestra al azar', 'los que eligió la tienda'], va: 2 }, { antes: 'Para una tos leve, la miel', topes: ['puede aliviar algo', 'cura siempre', 'no sirve'], va: 0 }], mira: ['Relee cómo fue el estudio.', 'Relee la letra gris.', 'Relee lo que dice la doctora.'], luz: [[2, 'cuarenta adultos que tenían tos'], [6, 'elegidos por la tienda'], [4, 'puede dar algo de alivio']], bien: 'Pocos, elegidos y algo.' },
      'Cuarenta adultos, testimonios elegidos y algo de alivio.', 'Busca en la página la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Afirmación: «esta miel fortalece las defensas». ¿Qué hace cada dato?', { doc: MIEL, tesis: 'Esta miel fortalece las defensas',
      ...F(['Un ensayo con mil personas halló menos gripas en quienes la tomaban.', 0, 'Si existiera, ¿la respaldaría?'], ['El mismo ensayo no halló diferencia con agua azucarada.', 1, '¿Hizo algo la miel?'], ['Se recoge en luna creciente.', 2, '¿Cambia las defensas?'], ['Cuesta 48 000 pesos.', 2, '¿Cambia las defensas?']), bien: 'Comparar con algo es lo que prueba.' },
      'Un ensayo grande la respaldaría, uno sin diferencia la debilita; luna y precio no pesan.', 'Pregunta si el dato compara a quienes la toman con quienes no.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 2 la oración que **más limita** lo que anuncia la tienda en el párrafo 1.', { doc: MIEL, nums: [2], apuesta: 'No se midió lo que promete.', ...S(['2.2'], { '2.0': 'Dice lo que encontró el estudio.', '2.1': 'Limita el estudio, pero no toca la promesa de enfermarse menos.' }), bien: 'Prometen algo que nadie midió.' },
      'La tienda dice que se enferman menos; la última oración aclara que eso no se midió.', 'Busca la oración que habla de enfermarse.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MIEL, lineas: ['Una tienda promete que su miel evita enfermedades.', 'El frasco es único.', 'El estudio que cita solo midió la tos nocturna.', 'Usa trampas: costumbre, complot y casos elegidos.', 'Hay luna creciente.', 'Una experta limita los beneficios y advierte un riesgo.'], ...S([1, 4], { 0: 'Es la promesa.', 2: 'Es lo que de verdad se midió.', 3: 'Es cómo convence.', 5: 'Es la otra voz.' }), bien: 'Promesa, medida, trampas y otra voz.' },
      'El frasco y la luna son adornos; lo demás sirve para evaluarla.', 'Deja lo que te ayuda a decidir si creerle.'),
  ]);

  const PLAZA2 = {
    id: 'icf-estatua', title: 'El lugar de la estatua',
    ficha: { autor: 'Dos columnas de un mismo periódico', fuente: 'Páginas de opinión', fecha: 'Mayo de 2026' },
    paras: [
      'PRIMERA COLUMNA, de Ignacio Laverde. La estatua del fundador lleva ciento veinte años en la plaza y alguien la pintó de rojo. Me dolió como si pintaran el retrato de mi abuelo. Una ciudad es lo que recuerda. Quien derriba lo que hicieron los mayores serrucha la rama en la que está sentado.',
      'Dicen que el fundador trajo también cadenas. No lo niego: era un hombre de su tiempo, y juzgarlo con las reglas del nuestro es como multar a una carreta por no llevar luces. Si empezamos a quitar estatuas de gente imperfecta, nos quedaremos con pedestales vacíos. Que pongan una placa, si quieren, y que limpien el bronce. Yo mismo llevaré el balde y el cepillo el sábado por la mañana.',
      'SEGUNDA COLUMNA, de Yadira Murillo. Mi bisabuela barría esa plaza y no podía sentarse en sus bancas. La estatua no me recuerda al fundador: me recuerda quién decidió qué se recuerda. No la pinté, pero entiendo la pintura. Hay gente a la que solo le dejaron el muro para escribir.',
      'Dicen que era un hombre de su tiempo. También lo eran los que él encadenó, y a ellos nadie les preguntó cuál era la costumbre. No propongo borrar la historia: propongo contarla completa. La plaza de un pueblo es el sitio donde decimos a quién admiramos. El museo es el sitio donde explicamos lo que pasó. Cada cosa en su lugar.',
      'Las dos columnas se publicaron el mismo día, una al lado de otra. En la mitad de la página, el periódico puso una foto: la estatua, todavía roja, y a sus pies una niña que les da de comer a las palomas sin mirarla. Debajo no había título ni explicación, solo el nombre del fotógrafo y la hora en que la tomó, que era la de la salida del colegio.',
      'En una carta posterior, una lectora escribió: «Laverde habla de gratitud y Murillo, de justicia. Los dos tienen razón en lo que aman. Pero solo uno de los dos tuvo siempre dónde sentarse».',
    ],
  };
  const l3 = leccion('icf-lc-evalua-3', 'Valores y visión del mundo', guion(
    ['Valores', 'Detrás de una postura hay algo que se considera valioso: gratitud, justicia, orden, libertad.'],
    ['Visión del mundo', 'La manera de entender el pasado, las personas o la naturaleza que se nota en lo que se dice.'],
    ['Imágenes que delatan', 'Comparar la ciudad con un árbol o con una banca dice cómo se la ve.'],
    ['Comparar', 'Dos autores pueden valorar cosas distintas sin mentir ninguno.']), [
    x('pinta-voces', 'Pinta cada idea con su voz.', { doc: PLAZA2, plumas: ['Laverde', 'Murillo', 'la lectora'],
      ...P(['Una ciudad es lo que recuerda.', 0, '¿Quién defiende dejar la estatua?'], ['La plaza dice a quién admiramos.', 1, '¿Quién distingue plaza y museo?'], ['Los dos tienen razón en lo que aman.', 2, '¿Quién habla de los dos?'], ['Que pongan una placa.', 0, '¿Quién propone conservarla?'], ['Contarla completa.', 1, '¿Quién quiere agregar voces?']), bien: 'Dos posturas y una lectora.' },
      'Laverde conserva, Murillo completa y la lectora compara.', 'Busca quién firma cada columna y quién escribe después.'),
    x('voz-de-la-fuente', 'Ata cada valor a quien lo pone primero.', { ayuda: 'Tira un hilo desde cada valor hasta quien lo defiende.', doc: PLAZA2, portadas: [['Laverde', 'primera columna'], ['Murillo', 'segunda columna'], ['La lectora', 'carta']],
      ...T(['respeto por los mayores', 0, '¿Quién habla de lo que hicieron los mayores?'], ['que se escuche a los excluidos', 1, '¿Quién habla de a quién no le preguntaron?'], ['ver desde dónde habla cada uno', 2, '¿Quién se fija en quién tuvo dónde sentarse?']), bien: 'Tradición, inclusión y posición.' },
      'Laverde valora la tradición, Murillo la inclusión y la lectora el lugar desde el que se habla.', 'Pregunta qué le duele o qué defiende cada uno.'),
    x('pista-tipo', 'Ata cada imagen a lo que revela.', { doc: PLAZA2, lineas: ['serrucha la rama en la que está sentado', 'multar a una carreta por no llevar luces', 'solo le dejaron el muro para escribir', 'dónde sentarse'],
      ...T(['sin pasado no hay sostén', 0, '¿Cuál habla de lo que nos sostiene?'], ['no se juzga con reglas de hoy', 1, '¿Cuál habla de exigir algo que no existía?'], ['protesta de quien no tiene voz', 2, '¿Cuál habla de una única salida?'], ['privilegio', 3, '¿Cuál habla de lo que otros no tenían?']), bien: 'La imagen delata la mirada.' },
      'La rama es el pasado, la carreta la época, el muro la protesta y la banca el privilegio.', 'Di en palabras simples qué critica o defiende cada imagen.'),
    x('genero-o-cita', '¿Es algo en lo que **coinciden** o en lo que **chocan** las dos columnas?', { doc: PLAZA2, rot: ['coinciden', 'chocan'],
      ...F(['El fundador participó en la esclavitud', 0, '¿Alguno lo niega?'], ['La estatua debe quedarse en la plaza', 1, '¿Los dos lo quieren?'], ['La historia importa', 0, '¿Alguno quiere olvidarla?'], ['«Era de su tiempo» basta como explicación', 1, '¿Los dos la aceptan?']), bien: 'El hecho los une; el lugar los separa.' },
      'Ninguno niega las cadenas ni desprecia la historia; discuten el lugar y la excusa de la época.', 'Busca si la otra columna lo niega o lo acepta.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PLAZA2, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Murillo no pintó la estatua.', 0, 'Búscala en su columna.'], ['La bisabuela de Murillo sufrió discriminación.', 1, '¿Qué podía y qué no podía hacer en la plaza?'], ['Para la niña de la foto la discusión no existe.', 1, '¿Hacia dónde mira?'], ['El periódico apoya a Laverde.', 2, '¿Dónde puso las dos columnas?']),
      luz: [[3, 'No la pinté'], [3, 'no podía sentarse'], [5, 'sin mirarla']], bien: 'Una foto también opina.' },
      'Que no la pintó está escrito; la discriminación y la indiferencia de la niña se deducen; el apoyo no.', 'Mira lo que hacen los personajes de cada párrafo.'),
    x('balanza-tesis', 'Idea: «juzgar al fundador con reglas de hoy es injusto». ¿Qué hace cada dato?', { doc: PLAZA2, tesis: 'Juzgarlo con reglas de hoy es injusto',
      ...F(['En su época nadie criticaba la esclavitud.', 0, 'Si fuera cierto, ¿cambiaría el juicio?'], ['En su época ya había quienes la condenaban.', 1, '¿Serían solo reglas de hoy?'], ['La estatua es de bronce.', 2, '¿Cambia el juicio?']), bien: 'También en su tiempo había otras voces.' },
      'Que nadie criticara la apoya; que ya hubiera críticos la debilita; el material no pesa.', 'Pregunta si esas reglas existían ya entonces.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que **responde** a la acusación de querer borrar.', { doc: PLAZA2, nums: [4], apuesta: 'No borrar: completar.', ...S(['4.2'], { '4.0': 'Recoge el argumento contrario.', '4.1': 'Responde a «era de su tiempo», no a lo de borrar.', '4.3': 'Dice para qué sirve la plaza.', '4.4': 'Dice para qué sirve el museo.', '4.5': 'Cierra la distinción.' }), bien: '«No… propongo…»' },
      '«No propongo borrar la historia: propongo contarla completa» responde a esa acusación.', 'Busca la oración con una negación y una propuesta.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PLAZA2, lineas: ['Dos columnas discuten qué hacer con una estatua.', 'La pintura era roja.', 'Una valora la tradición y pide juzgar según la época.', 'La otra pide contar la historia de los excluidos.', 'Hay palomas en la foto.', 'Una lectora señala desde dónde habla cada uno.'], ...S([1, 4], { 0: 'Es el tema de la página.', 2: 'Es la primera postura.', 3: 'Es la segunda postura.', 5: 'Es la mirada que las compara.' }), bien: 'Tema, dos posturas y comparación.' },
      'El color y las palomas son detalles; lo demás es la discusión.', 'Deja lo que explica en qué chocan las columnas.'),
  ]);

  const PERRO = {
    id: 'icf-horario', title: 'Que suene más tarde',
    paras: [
      'Propongo que las clases de bachillerato empiecen a las ocho y media. No es pereza: es biología. Durante la adolescencia, el cuerpo atrasa la hora del sueño. Pedirle a un muchacho de dieciséis años que piense a las seis y cuarto es como pedirle a un gallo que cante a medianoche: algo sale, pero no es canto.',
      'En una ciudad que movió la entrada cuarenta y cinco minutos, los estudiantes durmieron en promedio media hora más y hubo menos llegadas tarde. Las notas casi no cambiaron. Lo digo porque quienes defienden la idea suelen callar ese dato, y callarlo le hace daño a la idea.',
      'Me dirán que los padres entran a trabajar temprano y no tienen con quién dejar a los menores. Es la mejor objeción que conozco. Por eso la propuesta no es para primaria, y por eso los colegios tendrían que abrir sus puertas desde las seis, con biblioteca y desayuno. Cuesta plata. También cuesta tener cuarenta cuerpos presentes y cuarenta cabezas dormidas.',
      'Otros dirán que a ellos les tocó madrugar y salieron adelante. Los felicito. A mi abuelo le tocó estudiar con vela y también salió adelante; no por eso apagamos la luz. Que algo se haya soportado no demuestra que haya sido bueno.',
      'Un rector me confesó, en voz baja, que la hora actual no la decidió ningún pedagogo. Se fijó hace décadas para que cupieran dos jornadas en un mismo edificio. Es decir: madrugamos por falta de salones. Me parece una razón comprensible. Lo que no me parece es seguir llamándola disciplina.',
      'No espero que la propuesta se apruebe mañana. Me conformo con que, la próxima vez que un profesor diga que los jóvenes de ahora no tienen ganas de nada, alguien mire el reloj antes de responder. La hora dice más de nosotros que de ellos.',
    ],
  };
  const Q = preg(PERRO, 'lectura');
  return mundo('icf-lc-evalua', 'Evaluar un Texto', 'lectura', [l1, l2, l3], [
    ['icf-lc-evalua-1', 'Supuesto: lo que hace falta para que la idea funcione.', Q('La propuesta del autor supone que:', ['Los padres trabajan de noche', 'Si entran más tarde, los estudiantes aprovecharán para dormir', 'Los gallos cantan a medianoche', 'Los profesores llegan tarde'], 1, 'Si al entrar más tarde se acostaran más tarde, la propuesta perdería su efecto.', 'Pregunta qué tendría que pasar para que entrar más tarde sirviera.')],
    ['icf-lc-evalua-1', 'Reconocer un dato en contra da credibilidad.', Q('El autor menciona que las notas casi no cambiaron para:', ['Retirar su propuesta', 'Criticar a los estudiantes', 'Mostrar honestidad y hacer más confiable su argumento', 'Probar que dormir no importa'], 2, 'Dice que callarlo le hace daño a la idea: lo reconoce para ser creíble.', 'Lee lo que dice justo después de dar ese dato.')],
    ['icf-lc-evalua-2', '«A mí me tocó» no prueba que sea bueno.', Q('El ejemplo del abuelo y la vela muestra que el argumento «a nosotros nos tocó» es débil porque:', ['Soportar algo no demuestra que sea bueno', 'La vela es cara', 'El abuelo no salió adelante', 'Ya nadie estudia de noche'], 0, '«Que algo se haya soportado no demuestra que haya sido bueno».', 'Busca la oración que cierra ese párrafo.')],
    ['icf-lc-evalua-2', 'Un dato nuevo puede debilitar una propuesta.', Q('De los siguientes datos, el que más **debilitaría** la propuesta es:', ['Algunos estudiantes madrugan con gusto', 'El desayuno cuesta plata', 'En otras ciudades que hicieron el cambio se acostaron más tarde y durmieron igual', 'Las clases duran seis horas'], 2, 'Si no duermen más, se cae la razón principal.', 'Busca el que contradice lo que la propuesta busca lograr.')],
    ['icf-lc-evalua-3', 'Los valores se notan en lo que se defiende y en lo que se critica.', Q('Cuando dice que no le parece «seguir llamándola disciplina», el autor valora sobre todo:', ['La obediencia', 'Llamar a las cosas por su verdadera razón', 'El ahorro', 'La puntualidad'], 1, 'Acepta la razón (faltan salones), pero critica que se disfrace de disciplina.', 'Compara la razón que dio el rector con el nombre que se le da.')],
    ['icf-lc-evalua-3', 'La última frase suele mostrar la visión del autor.', Q('«La hora dice más de nosotros que de ellos» sugiere que:', ['Los relojes están dañados', 'Los jóvenes son perezosos', 'El cansancio de los jóvenes depende de decisiones de los adultos', 'Nadie mira el reloj'], 2, 'La hora la fijaron los adultos; por eso dice más de ellos.', 'Pregunta quién decidió la hora y a quién se refiere «nosotros».')],
  ]);
})());
