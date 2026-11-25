// Preuniversitario · Comprensión lectora · mundo 6 «Aplicación y analogía» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): los senderos de deseo de los parques, una idea que sirve para mil casos (aplicar a un caso
// nuevo), y el sistema de defensa del cuerpo explicado como una ciudad con murallas y archivos (analogías). La evaluación usa un
// mecánico que pregunta antes de tocar el carro. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const SENDEROS = {
    id: 'lec-senderos-deseo', title: 'Los caminos que nadie diseñó',
    ficha: { autor: 'Columna de un urbanista', fuente: 'Revista de arquitectura y ciudad', fecha: 'Marzo de 2025' },
    paras: [
      'En casi todos los parques hay uno: un caminito de tierra pelada que cruza el pasto en diagonal, justo al lado del sendero de cemento que los arquitectos dibujaron con tanto cuidado. Nadie lo trazó en un plano. Lo hicieron los pies de cientos de personas que, día tras día, eligieron el camino más corto. Los urbanistas los llaman «senderos de deseo».',
      'Durante décadas, la respuesta de muchas administraciones fue la misma: poner una cerca, sembrar arbustos espinosos o clavar un letrero de «No pise el césped». Casi nunca funcionó. La gente saltaba la cerca, rodeaba los arbustos o simplemente ignoraba el letrero, y al cabo de unos meses el caminito volvía a aparecer, a veces un poco más allá.',
      'Algunos diseñadores decidieron hacer lo contrario. Cuando una universidad estrenaba un campus, por ejemplo, dejaban todo el terreno sembrado de pasto durante el primer año y esperaban. Al final del año, los estudiantes ya habían marcado con sus pasos por dónde querían caminar, y solo entonces se pavimentaban esos trazos. El resultado eran senderos que la gente sí usaba, porque eran los que ya usaba.',
      'La idea va mucho más allá de los parques. Detrás de cada sendero de deseo hay una lección incómoda para quien diseña: la gente no hace lo que uno espera, sino lo que le resulta más fácil o más útil. Se puede pelear contra eso con prohibiciones, o se puede observar primero y diseñar después. Lo segundo suele salir más barato y dura más.',
      'Eso no significa que todo atajo deba volverse camino. Hay senderos que cruzan zonas frágiles, como un humedal o el lugar donde anidan unas aves, y ahí sí hace falta proteger el terreno. Pero incluso en esos casos, quien observa por qué la gente toma el atajo puede ofrecerle otra ruta igual de corta, en vez de limitarse a prohibirle la que ya escogió.',
      'La próxima vez que vea un caminito de tierra en un parque, no lo mire como un daño. Mírelo como un mensaje: alguien, muchas veces, le está diciendo a la ciudad por dónde necesita pasar.',
    ],
  };

  const DEFENSA = {
    id: 'lec-ciudad-defensas', title: 'Una ciudad con murallas y archivos',
    ficha: { autor: 'Artículo de divulgación', fuente: 'Revista de ciencia para colegios', fecha: 'Agosto de 2024' },
    paras: [
      'Explicar cómo se defiende el cuerpo de una infección es difícil, porque intervienen miles de células y sustancias con nombres largos. Por eso muchos profesores recurren a una comparación: el cuerpo es como una ciudad antigua, con murallas, guardias, mensajeros y un archivo donde se guardan los retratos de los enemigos.',
      'La primera defensa es la muralla. La piel y las mucosas de la nariz y la garganta impiden que la mayoría de los microbios entre. Así como una muralla no distingue entre un ladrón y un comerciante, la piel tampoco elige: simplemente cierra el paso. Cuando hay una herida, se abre una brecha en la muralla, y por ahí pueden colarse los invasores.',
      'Detrás de la muralla patrullan los guardias: ciertos glóbulos blancos que recorren la sangre y los tejidos y atacan cualquier cosa que no reconocen como propia. Son rápidos pero poco precisos, como una patrulla que detiene a todo el que parezca sospechoso. Muchas veces el enrojecimiento y la hinchazón alrededor de una herida son la huella de esa pelea.',
      'Si la invasión continúa, entra en acción una defensa más lenta y más precisa. Algunas células fabrican anticuerpos, unas proteínas que encajan en una parte específica del invasor como una llave en su cerradura. Cada anticuerpo sirve para un solo tipo de enemigo, y por eso esta defensa tarda días en organizarse: primero hay que fabricar la llave adecuada.',
      'Lo más asombroso viene después. Cuando la infección termina, el cuerpo conserva células de memoria, una especie de archivo con los retratos de los enemigos ya vencidos. Si el mismo microbio vuelve, la respuesta es mucho más rápida, porque la llave ya existe. En esa memoria se apoyan las vacunas: le muestran al cuerpo el retrato de un enemigo, sin la enfermedad, para que lo archive antes de conocerlo.',
      'Toda comparación tiene límites, y esta también. Una ciudad no fabrica sus guardias según el enemigo que llega, y el cuerpo sí. Pero la imagen ayuda a recordar lo esencial: hay defensas que cierran el paso, otras que atacan sin preguntar y otras que aprenden.',
    ],
  };

  // ---------------- Lección 1 · Aplicar a un caso nuevo ----------------
  setLesson('pu-ap-1', [
    play('talla-idea', 'Del párrafo 4 se saca un **principio**. Pon cada versión en su talla.', { doc: SENDEROS, p: 4, rot: ['se queda en el caso', 'principio general', 'dice de más'], fichas: ['En los parques hay caminos de tierra.', 'Antes de diseñar, conviene observar lo que la gente ya hace.', 'Nunca hay que prohibirle nada a nadie.'], va: [0, 1, 2],
      mira: ['¿Serviría para algo que no sea un parque?', 'Mira «observar primero y diseñar después».', 'Compárala con el párrafo 5: ¿el autor diría «nunca»?'], luz: [[4, 'se puede observar primero y diseñar después']], bien: 'El principio sirve aunque cambie el tema.' },
      'El camino de tierra es el caso; «nunca» exagera, porque el párrafo 5 pone límites. El principio sirve para parques, tiendas o aplicaciones.',
      { hint: 'Un principio no nombra el caso: se puede llevar a otro tema. Prueba cada uno con una tienda.' }),
    play('genero-o-cita', '¿En qué casos se cumple el principio: observar lo que la gente hace y facilitarlo?', { rot: ['se cumple', 'no se cumple'], doc: SENDEROS, fichas: ['Ponen bancas en la escalera donde todos se reúnen.', 'Multan a quien cruza la zona verde.', 'Mueven el botón a donde la gente ya tocaba.', 'Cambian los precios sin avisar.', 'Ponen enchufes donde ya se sentaban a cargar el celular.'], va: [0, 1, 0, 1, 0],
      mira: ['¿Miraron primero qué hacía la gente?', '¿Alguien preguntó por qué la cruzan?', '¿Miraron primero dónde tocaba la gente?', '¿Se facilitó algo que la gente ya hacía?', '¿Miraron primero dónde se sentaban?'], bien: 'Cambia el tema, la estructura es la misma.' },
      'Las bancas, el botón y los enchufes llegaron donde la gente ya estaba. La multa prohíbe sin observar y los precios no tienen que ver.',
      { hint: 'Busca dos pasos: primero se observa, después se facilita. Si falta uno, no se cumple.' }),
    play('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: SENDEROS, fichas: ['presenta el fenómeno', 'cuenta lo que no funcionó', 'cuenta lo que sí funcionó', 'saca el principio general', 'le pone un límite', 'invita al lector', 'da cifras'], va: [0, 1, 2, 3, 4, 5, null],
      mira: ['Busca dónde se dice qué es.', 'Busca la cerca y el letrero.', 'Busca «hacer lo contrario».', 'Busca «va mucho más allá».', 'Busca «Eso no significa».', 'Busca a quién le habla el final.', 'No hay ningún número que comparar.'],
      luz: [[1, '«senderos de deseo»'], [2, 'Casi nunca funcionó'], [3, 'hacer lo contrario'], [4, 'La idea va mucho más allá'], [5, 'Eso no significa'], [6, 'no lo mire como un daño']], bien: 'Del caso al principio, y del principio a su límite.' },
      'Presenta los senderos, cuenta lo que falló y lo que funcionó, saca el principio, le pone un límite y le habla al lector.',
      { hint: 'Mira las primeras palabras: «Durante décadas», «lo contrario», «más allá», «Eso no significa».' }),
    play('balanza-tesis', 'Tesis: es mejor convertir los senderos en caminos que prohibirlos. ¿Qué hace cada dato?', { doc: SENDEROS, tesis: 'Es mejor convertirlos en caminos que prohibirlos', fichas: ['Las cercas casi nunca funcionaron.', 'Los senderos pavimentados sí se usaban.', 'Algunos cruzan un humedal.', 'Los urbanistas les pusieron un nombre.'], va: [0, 0, 1, 2],
      mira: ['Si prohibir no sirve, ¿la tesis gana o pierde?', 'Si se usan, ¿la tesis gana o pierde?', 'Si ahí no conviene un camino, ¿la tesis gana o pierde?', 'Un nombre, ¿le da o le quita razón?'], bien: 'Un dato curioso no pesa.' },
      'Que prohibir no funcione y que los pavimentados se usen apoyan la tesis; el humedal la limita; el nombre no pesa.',
      { hint: 'Supón que cada dato es cierto: ¿la tesis queda más fuerte, más débil o igual?' }),
    play('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a una oración que la desmiente.', { doc: SENDEROS, nums: [2, 3], pregunta: 'Queda en pie', queda: 'Los senderos hechos después de observar sí se usaban.', tarjetas: ['Los letreros acabaron con los atajos.', 'Pavimentaron antes de que llegaran los estudiantes.', 'Nadie usó los senderos nuevos del campus.'], va: [[1, 2], [4, 5], 6],
      mira: ['Busca si funcionó.', 'Busca cuándo se pavimentaban.', 'Busca el resultado.'], bien: 'Cada falsa cae con una oración.' },
      'Los letreros «casi nunca» funcionaron; se esperaba un año y «solo entonces» se pavimentaba; y eran senderos «que la gente sí usaba».',
      { hint: 'Busca la oración que habla de lo mismo y fíjate en el orden de los hechos.' }),
    play('sella-parrafo', '«Para frenar los senderos intentaron todo, **EXCEPTO**:» Ata cada opción a su párrafo.', { doc: SENDEROS, tarjetas: ['Una cerca', 'Arbustos con espinas', 'Un letrero', 'Multas'], va: [1, 1, 1, 6],
      mira: ['Busca la cerca.', 'Busca los arbustos.', 'Busca el césped.', 'Suena posible, pero búscala.'], luz: [[2, 'poner una cerca, sembrar arbustos espinosos o clavar un letrero']], bien: 'Las multas las puso la imaginación.' },
      'La cerca, los arbustos y el letrero están en el párrafo 2. Las multas no aparecen.',
      { hint: 'Tres opciones pueden estar en la misma oración. La que no, es la respuesta.' }),
    play('signo-oficio', 'Ata cada oficio al signo que lo hace.', { doc: SENDEROS, texto: 'Los urbanistas los llaman |«|senderos de deseo». Mírelo como un mensaje|:| alguien, muchas veces, le está diciendo a la ciudad por dónde necesita pasar|.|', tarjetas: ['presenta un nombre técnico', 'anuncia qué dice el mensaje'], va: [0, 1],
      mira: ['Busca el signo que va junto a un nombre especial.', 'Busca el signo después de «mensaje».'], bien: 'Las comillas no siempre citan a alguien.' },
      'Las comillas presentan el nombre que usan los urbanistas; los dos puntos anuncian qué dice el mensaje.',
      { hint: 'Mira qué viene después de cada signo: ¿un nombre o una explicación?' }),
    play('ordena-texto', 'Se desordenó la columna. La primera tira está en su puesto.', { doc: { title: SENDEROS.title, ficha: SENDEROS.ficha }, fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['En casi todos los parques hay uno: un caminito de tierra pelada que cruza el pasto en diagonal, justo al lado del sendero de cemento que los arquitectos dibujaron con tanto cuidado.', 'Durante décadas, la respuesta de muchas administraciones fue la misma: poner una cerca, sembrar arbustos espinosos o clavar un letrero de «No pise el césped».', 'Algunos diseñadores decidieron hacer lo contrario.', 'La idea va mucho más allá de los parques.', 'Eso no significa que todo atajo deba volverse camino.'],
      mira: ['', 'Cuenta una respuesta: ¿a qué?', '«Lo contrario» ¿de qué? Tiene que haberse contado.', '«La idea» ¿cuál? Falta contarla arriba.', '«Eso» le pone límite a algo que ya se dijo.'], bien: 'Fenómeno, error, acierto, idea y límite.' },
      'El fenómeno; la respuesta de prohibir; «lo contrario» de prohibir; la idea general; y «Eso no significa», que la limita.',
      { hint: 'Busca a qué se refieren «lo contrario», «la idea» y «eso».' }),
  ]);

  // ---------------- Lección 2 · Analogías ----------------
  setLesson('pu-ap-2', [
    play('cambia-tipo', 'Completa la analogía con las palabras del texto. Sobran fichas.', { de: 'misma relación: barrera que cierra el paso', antes: 'Piel es a cuerpo como…', frase: '[0] es a [1]', rot: ['¿qué?', '¿de qué?'], fichas: ['muralla', 'ciudad', 'guardia', 'herida', 'enemigo'], va: [0, 1, null, null, null],
      mira: ['Piel cierra el paso: ¿qué lo cierra en el otro lado?', 'La piel rodea al cuerpo: ¿qué rodea lo otro?', 'Ataca, no cierra el paso.', 'Es lo contrario: abre el paso.', 'No es lo protegido, sino de quien se protege.'], bien: 'La relación es la misma a los dos lados.' },
      'La piel cierra el paso al cuerpo como la muralla a la ciudad. El guardia ataca, la herida abre y el enemigo no es lo protegido.',
      { hint: 'Di la relación en voz alta («la piel protege al cuerpo cerrando el paso») y busca qué hace eso en el otro lado.' }),
    play('pista-tipo', 'Ata cada relación a la pareja que la tiene.', { lineas: ['página y libro', 'martillo y carpintero', 'nube y lluvia', 'semilla y árbol'], tarjetas: ['parte y todo', 'herramienta y quien la usa', 'causa y efecto', 'etapa y lo que llega a ser'], va: [0, 1, 2, 3],
      mira: ['¿Cuál pareja está una dentro de la otra?', '¿En cuál hay alguien que trabaja con algo?', '¿En cuál una trae a la otra?', '¿En cuál una se convierte en la otra?'], bien: 'Antes de comparar, di la relación.' },
      'La página es parte del libro; el carpintero usa el martillo; la nube trae la lluvia; la semilla llega a ser árbol.',
      { hint: 'Arma una oración corta con cada pareja («la página está en el libro») y mira qué relación dice.' }),
    play('genero-o-cita', 'Según el artículo, ¿qué analogías conservan la relación?', { rot: ['la conserva', 'la cambia'], doc: DEFENSA, fichas: ['Anticuerpo es a invasor como llave es a cerradura.', 'Herida es a piel como guardia es a ciudad.', 'Célula de memoria es a microbio como retrato es a enemigo.', 'Glóbulo blanco es a microbio como muralla es a ladrón.'], va: [0, 1, 0, 1],
      mira: ['Di qué hace una con otra en cada lado.', '¿Qué hace la herida en la piel? ¿Y el guardia en la ciudad?', 'Di para qué sirve cada una.', '¿Los dos atacan?'], luz: [[4, 'como una llave en su cerradura'], [5, 'una especie de archivo con los retratos de los enemigos'], [2, 'se abre una brecha en la muralla'], [3, 'atacan cualquier cosa']], bien: 'Parecerse no basta: la relación tiene que ser la misma.' },
      'La llave encaja como el anticuerpo y el retrato sirve para reconocer, como la memoria. La herida abre y el guardia cuida; el glóbulo ataca y la muralla solo cierra.',
      { hint: 'Di la relación del primer lado con un verbo y prueba ese mismo verbo en el otro.' }),
    play('ordena-texto', 'Se desordenó el artículo. La primera tira está en su puesto.', { doc: { title: DEFENSA.title, ficha: DEFENSA.ficha }, fija: 1, ini: [0, 4, 2, 1, 3], tiras: ['Por eso muchos profesores recurren a una comparación: el cuerpo es como una ciudad antigua, con murallas, guardias, mensajeros y un archivo donde se guardan los retratos de los enemigos.', 'La primera defensa es la muralla.', 'Detrás de la muralla patrullan los guardias: ciertos glóbulos blancos que recorren la sangre y los tejidos y atacan cualquier cosa que no reconocen como propia.', 'Si la invasión continúa, entra en acción una defensa más lenta y más precisa.', 'Lo más asombroso viene después.'],
      mira: ['', 'Es «la primera».', '«Detrás de la muralla»: ya se habló de ella.', '«Más lenta» que otra ya contada.', '«Después» de todo lo anterior.'], bien: 'De afuera hacia adentro y de rápido a lento.' },
      'La muralla, los guardias detrás, la defensa más lenta y, después, la memoria.',
      { hint: 'Sigue las pistas: «primera», «detrás de», «si continúa», «después».' }),
    play('pasos-del-proceso', 'Ordena lo que pasa en una herida.', { que: 'lo que cuentan los párrafos 2 y 3', de: 'De la herida a la hinchazón', fija: 0, ini: [2, 0, 3, 1], tiras: ['Se abre la piel.', 'Entran microbios.', 'Los glóbulos blancos atacan.', 'La zona se enrojece y se hincha.'],
      mira: ['Es lo que empieza todo.', 'Para entrar hace falta por dónde.', 'Atacan a algo que entró.', 'Es la huella de una pelea: ¿ya hubo pelea?'], bien: 'La hinchazón es la huella de la pelea.' },
      'Se abre la muralla, se cuelan invasores, los guardias pelean y queda la huella.',
      { hint: 'Piensa en la ciudad: brecha, invasores, guardias y huella de la pelea.' }),
    play('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que dice en qué **falla** la comparación.', { doc: DEFENSA, nums: [6], n: 1, apuesta: 'La comparación con la ciudad tiene un límite preciso.', va: ['6.1'],
      mira: { '6.0': 'Anuncia que hay límites, pero no dice cuál.', '6.2': 'Dice para qué sirve, no en qué falla.' }, bien: 'Anunciar un límite no es decirlo.' },
      'Una ciudad no fabrica sus guardias según el enemigo y el cuerpo sí: ese es el límite. La primera oración lo anuncia y la última dice para qué sirve.',
      { hint: 'Busca la oración que nombra una diferencia entre la ciudad y el cuerpo.' }),
    play('bisagras', 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.', { doc: DEFENSA, pares: [['Hay que fabricar una llave para cada enemigo;', 'la defensa tarda días.'], ['La ciudad no fabrica sus guardias;', 'la imagen ayuda a recordar.'], ['Así como la muralla cierra el paso,', 'la piel lo cierra.']], fichas: ['por eso,', 'sin embargo,', 'también', 'porque', 'por ejemplo,'], va: [0, 1, 2, null, null],
      mira: ['¿Dónde la demora resulta de algo?', '¿Dónde algo sirve aunque tenga un defecto?', '¿Dónde se dice que dos cosas hacen lo mismo?', 'Daría la causa de lo anterior.', 'Ninguna segunda parte es un caso.'], bien: '«Así como… también» arma la analogía.' },
      'La demora resulta («por eso»); la imagen sirve pese al límite («sin embargo»); y las dos hacen lo mismo («así como… también»).',
      { hint: 'Una pareja compara, otra trae una consecuencia y otra se opone a lo que se esperaba.' }),
    play('tacha-resumen', 'Tacha las tres oraciones que no hacen falta para entender el artículo.', { doc: DEFENSA, n: 3, lineas: ['El cuerpo se defiende como una ciudad.', 'La muralla no distingue a un comerciante.', 'Unas defensas cierran, otras atacan rápido y otras son lentas y precisas.', 'La llave encaja en la cerradura.', 'El cuerpo recuerda a los enemigos, y de eso se valen las vacunas.', 'Las sustancias tienen nombres largos.'], va: [1, 3, 5],
      mira: { 0: 'Es la comparación que organiza todo.', 2: 'Reúne los tres tipos de defensa.', 4: 'Es a donde llega el texto.' }, bien: 'La comparación, las defensas y la memoria.' },
      'El comerciante, la llave y los nombres largos ilustran. Quedan la comparación, los tipos de defensa y la memoria.',
      { hint: 'Las imágenes de un solo párrafo ayudan a entender, pero no resumen.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const MECANICO = {
    id: 'lec-mecanico', title: 'El que adivina cobra dos veces',
    paras: [
      'Don Ramiro, el mecánico de la esquina, tiene una costumbre que desespera a algunos clientes: antes de abrir el capó, les pide que le cuenten, con detalle, cuándo empezó el ruido, si suena en frío o en caliente, si se oye al frenar o al acelerar. Mientras escucha, no toca el carro. «El que adivina cobra dos veces», dice.',
      'Su método tiene una lógica sencilla. Un mismo síntoma puede tener muchas causas: un golpeteo puede venir del motor, de la suspensión o de algo suelto en el baúl. Si el mecánico cambia la primera pieza que se le ocurre, puede acertar, pero también puede gastar el dinero del cliente en una pieza que estaba buena. Preguntar primero reduce las posibilidades antes de gastar un peso.',
      'Los clientes apurados prefieren el taller de enfrente, donde le cambian a uno las pastillas de freno en veinte minutos sin muchas preguntas. Algunos vuelven a la semana con el mismo ruido. Don Ramiro no se alegra: solo saca otra vez su libreta y empieza de nuevo por las preguntas.',
      'Él dice que el oficio le enseñó algo que sirve para todo: el que escucha bien gasta menos. Lo repite cuando sus nietos se pelean, cuando un vecino le pide consejo y hasta cuando va al médico, al que le cuenta sus síntomas con el mismo orden con que le gustaría que le contaran los de un carro.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: MECANICO, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-aplicacion', 'Evaluación · Aplicación y analogía', [
    ['pu-ap-1', 'Aplicar es reconocer la misma estructura en un tema distinto.',
      Q('Una situación que aplica el método de don Ramiro es la de:', ['un técnico que cambia el computador completo apenas falla', 'un profesor que pone el examen sin explicar el tema', 'una médica que pregunta cuándo empezó el dolor antes de pedir exámenes', 'un vendedor que ofrece primero el producto más caro'], 2,
        'La médica, como don Ramiro, pregunta primero para reducir las posibilidades antes de gastar. El técnico hace lo contrario.',
        'Saca primero el principio del texto (preguntar antes de actuar) y busca el caso que lo cumple.')],
    ['pu-ap-1', 'Un caso nuevo puede aplicar la idea del texto o su contrario: hay que distinguirlos.',
      Q('Según la idea del texto, cambiar de inmediato la primera pieza que se le ocurre al mecánico se parece a:', ['tomar un remedio para el dolor de cabeza sin saber de dónde viene', 'leer el manual antes de usar una máquina', 'preguntarle al vecino qué pasó', 'revisar la cuenta antes de pagar'], 0,
        'Tomar un remedio sin saber la causa es actuar antes de averiguar, como cambiar una pieza al azar. Las otras opciones averiguan primero.',
        'Busca la opción que actúa antes de averiguar, igual que el taller de enfrente.')],
    ['pu-ap-1', 'Para predecir qué haría alguien en otra situación, se usa el principio que guía sus actos.',
      Q('Si don Ramiro fuera profesor, ante un estudiante que pierde matemáticas, probablemente:', ['le pondría más tareas de inmediato', 'lo cambiaría de curso', 'le diría que estudie más, sin preguntarle nada', 'le preguntaría en qué temas y desde cuándo se le dificulta'], 3,
        'Su principio es escuchar antes de actuar: primero averiguaría dónde está la dificultad.',
        'Recuerda lo que hace don Ramiro antes de abrir el capó.')],
    ['pu-ap-2', 'En una analogía se compara la relación entre las parejas, no las cosas sueltas.',
      Q('La relación entre «síntoma» y «causa» en el texto es la misma que hay entre:', ['llanta y carro', 'humo y fuego', 'mecánico y taller', 'freno y acelerador'], 1,
        'El síntoma es la señal que deja una causa escondida, como el humo es la señal de un fuego. Llanta y carro es parte y todo; mecánico y taller, persona y lugar; freno y acelerador, opuestos.',
        'Nombra la relación de la primera pareja (¿qué es el síntoma de la causa?) y pruébala en cada opción.')],
    ['pu-ap-2', 'Un refrán puede ser análogo a otro si enseñan lo mismo en oficios distintos.',
      Q('«El que adivina cobra dos veces» es a don Ramiro lo que, para un carpintero, sería el refrán:', ['«Mide dos veces y corta una»', '«Al que madruga, Dios le ayuda»', '«Más vale tarde que nunca»', '«En casa de herrero, cuchillo de palo»'], 0,
        'Los dos refranes enseñan que comprobar antes de actuar evita pagar dos veces por un error.',
        'Pregúntate qué enseña la frase de don Ramiro y busca el refrán que enseña lo mismo.')],
    ['pu-ap-2', 'Una analogía puede llevar la idea del texto a la manera de presentar el examen.',
      Q('Preguntarle al cliente antes de tocar el carro es a don Ramiro lo que, para un buen lector en el examen, es:', ['marcar la primera opción que suena bien', 'dejar en blanco las preguntas difíciles', 'volver al texto antes de marcar una opción', 'leer solo el título'], 2,
        'Volver al texto es reunir la información antes de decidir, como don Ramiro antes de cambiar una pieza. Marcar lo primero que suena bien es adivinar.',
        'Busca la opción en la que el lector averigua antes de decidir.')],
  ]);
});
