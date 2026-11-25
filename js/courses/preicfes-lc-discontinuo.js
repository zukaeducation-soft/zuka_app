// Preicfes · Lectura Crítica · mundo 6 «Textos Discontinuos» (spec 2026-11-25-preicfes-estructura). Infografías, cómics y mezclas originales.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const AGUA = {
    id: 'icf-ducha', title: 'Infografía: ¿En qué se va el agua de tu casa?',
    ficha: { autor: 'Acueducto de Monteclaro', fuente: 'Afiche para las estaciones de bus', fecha: 'Marzo de 2026' },
    paras: [
      'RECUADRO CENTRAL. Dibujo de una casa partida por la mitad. Dentro de cada cuarto hay una gota; mientras más grande la gota, más agua se gasta allí. La del baño ocupa casi todo el cuarto. Debajo se lee: «Una persona de Monteclaro usa, en promedio, 140 litros al día. Con 50 se puede vivir bien».',
      'TABLA A LA DERECHA, «Litros por persona al día». Ducha: 56. Sanitario: 42. Lavar ropa: 21. Cocina y platos: 14. Otros: 7. Nota al pie de la tabla: «Datos de 300 casas con contador, estratos 1 a 6, medidos durante dos meses. No incluye fincas ni industrias».',
      'FLECHA DESDE LA DUCHA. «Una ducha de ocho minutos gasta 56 litros. Si la cierras mientras te enjabonas, gasta 28». Al lado hay un reloj de arena y una cara sonriente. La flecha es azul y gruesa, y termina en un balde con la frase: «Lo que ahorras en un mes llena 84 baldes de diez litros».',
      'RECUADRO INFERIOR, fondo rojo. «¿Sabías que una llave que gotea pierde hasta 30 litros al día?». Dibujo de una llave con una gota colgando y, junto a ella, un calendario en el que todos los días están tachados. En letra más grande: «Llámanos: la reparación es gratis para los estratos 1 y 2».',
      'ETIQUETA EN LA ESQUINA. Copia de la etiqueta de un sanitario: «Consumo: 4.8 litros por descarga. Los modelos anteriores a 1995 gastan entre 12 y 20. Categoría A, la de mayor ahorro». Una lupa señala la palabra «descarga».',
      'PIE DEL AFICHE. Logotipo del acueducto, número de teléfono y una frase en letra pequeña: «El 35 % del agua que sale de nuestra planta se pierde en tuberías viejas antes de llegar a las casas. Plan de cambio de redes: 2026 a 2034». Va en letra gris y no lleva color ni recuadro.',
      'CÓDIGO QR junto al teléfono, con la invitación: «Mide tu consumo y compárate con tu cuadra». Al abrirlo, la página pide la dirección, el número de personas y las lecturas de dos meses seguidos. Con esos datos dibuja dos barras, la tuya y la del promedio de tus vecinos, sin mostrar el nombre de nadie.',
    ],
  };
  const l1 = leccion('icf-lc-discontinuo-1', 'Infografías, tablas y etiquetas', guion(
    ['No se lee en fila', 'Primero el título y la imagen grande; después las partes.'],
    ['Cada parte hace algo', 'La tabla da datos, la flecha explica, el recuadro avisa.'],
    ['Tamaño y color', 'Lo grande y lo rojo quieren atención; la letra pequeña también dice cosas.'],
    ['Nota al pie', 'Dice de dónde salen los datos y qué dejan por fuera.']), [
    x('antes-de-leer', 'El texto está tapado. Con sus bordes, completa la apuesta. Sobran fichas.', { doc: AGUA, frase: 'Es [0] que hace [1] para [2].', rot: ['¿qué tipo de texto?', '¿quién lo hace?', '¿para qué?'],
      ...F(['una infografía', 0, 'Lee la primera palabra del título.'], ['un acueducto', 1, 'Mira quién aparece en la ficha.'], ['informar del consumo', 2, 'Vuelve a la pregunta del título.'], ['un cuento', null, 'El título dice qué es.'], ['una fábrica de duchas', null, 'La ficha dice quién lo hizo.'], ['vender una casa', null, 'La pregunta del título es otra.']),
      luz: [[1, 'mientras más grande la gota'], [2, 'Litros por persona al día']], bien: 'Título y ficha bastan para la apuesta.' },
      'El título dice «infografía» y pregunta por el agua; la ficha dice quién la hizo.', 'Lee por separado la primera palabra, la ficha y la pregunta.'),
    x('donde-mirar', 'Lleva cada pregunta a la parte del afiche donde la buscarías.', { doc: AGUA,
      ...F(['¿De cuántas casas salen los datos?', 1, 'Busca la parte que trae números en filas.'], ['¿A qué teléfono se llama?', 5, 'Busca la parte de abajo del todo.'], ['¿Cuánto gasta cada descarga?', 4, 'Busca la parte copiada de un aparato.'], ['¿Cómo me comparo con mis vecinos?', 6, 'Busca la parte que se abre con el celular.']),
      luz: [[2, '300 casas'], [6, 'número de teléfono'], [5, '4.8 litros por descarga'], [7, 'compárate con tu cuadra']], bien: 'Tabla, pie, etiqueta y código.' },
      'Las casas están en la nota de la tabla; el teléfono, en el pie; la descarga, en la etiqueta; la comparación, en el código.', 'Lee solo las mayúsculas con que empieza cada parte.'),
    x('pista-tipo', 'Ata cada función a su parte del afiche.', { doc: AGUA, lineas: ['la tabla', 'la flecha', 'el recuadro rojo', 'la nota al pie de la tabla'],
      ...T(['da las cantidades', 0, '¿Cuál ordena números?'], ['muestra cómo ahorrar y cuánto', 1, '¿Cuál une la ducha con un balde?'], ['alerta y ofrece ayuda', 2, '¿Cuál usa un color de aviso?'], ['dice de dónde salen los datos', 3, '¿Cuál habla de casas con contador?']), bien: 'Cantidades, ahorro, alerta y origen.' },
      'La tabla cuantifica, la flecha muestra el ahorro, el rojo alerta y la nota da el origen.', 'Pregunta para qué está cada parte y no solo qué dice.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: AGUA, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La ducha gasta 56 litros por persona al día.', 0, 'Búscala en la tabla.'], ['En la ducha se va el 40 % del agua de una persona.', 1, 'Compara 56 con el total del día.'], ['La frase de los 84 baldes supone una ducha diaria.', 1, 'Reparte los litros de un mes entre los días.'], ['Las industrias gastan más que las casas.', 2, '¿La tabla incluye industrias?']),
      luz: [[2, 'Ducha: 56'], [3, '84 baldes'], [2, 'No incluye fincas ni industrias']], bien: 'Los números también se deducen.' },
      '56 está en la tabla; 56 de 140 es 40 %; ahorrar 28 por 30 días son 840 litros, 84 baldes; de industrias no hay datos.', 'Usa el total del recuadro central y el ahorro de la flecha.'),
    x('voz-de-la-fuente', 'Ata cada recurso a lo que logra.', { ayuda: 'Tira un hilo desde cada efecto hasta su recurso.', doc: AGUA, portadas: [['Gotas de distinto tamaño', 'recurso'], ['Fondo rojo', 'recurso'], ['Letra pequeña sin dibujo', 'recurso'], ['Lupa sobre una palabra', 'recurso']],
      ...T(['comparar de un vistazo', 0, '¿Qué cambia de un cuarto a otro?'], ['que parezca urgente', 1, '¿Qué color suele avisar?'], ['que pase casi sin verse', 2, '¿Qué llama menos la atención?'], ['que te fijes en el detalle', 3, '¿Qué señala algo exacto?']), bien: 'La forma también dice.' },
      'El tamaño compara, el rojo urge, la letra pequeña esconde y la lupa señala.', 'Piensa qué mirarías primero y qué último.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: AGUA, nums: [1, 2, 6], pregunta: 'Queda en pie', queda: 'El acueducto también pierde agua.',
      ...T(['Se necesitan 140 litros para vivir bien.', 5, 'Busca con cuánto se puede vivir bien.'], ['Los datos incluyen las industrias.', 13, 'Busca lo que la tabla deja por fuera.'], ['Toda el agua de la planta llega a las casas.', 15, 'Busca qué pasa en las tuberías.']), bien: 'Números y letra pequeña.' },
      'Con 50 se vive bien, la tabla no incluye industrias y el 35 % se pierde antes de llegar.', 'Busca la palabra clave: vivir, industrias, planta.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que permite el afiche.', { doc: AGUA, filas: [{ antes: 'Los datos sirven para', topes: ['todo el país', 'las casas medidas de Monteclaro', 'las fincas'], va: 1 }, { antes: 'Una llave que gotea pierde', topes: ['siempre 30 litros', 'más de 30 litros', 'hasta 30 litros'], va: 2 }, { antes: 'La reparación es gratis para', topes: ['los estratos 1 y 2', 'todos', 'nadie'], va: 0 }], mira: ['Relee la nota de la tabla.', 'Fíjate en la palabra que va antes del número.', 'Relee la letra grande del recuadro rojo.'], luz: [[2, '300 casas con contador'], [4, 'hasta 30 litros'], [4, 'gratis para los estratos 1 y 2']], bien: 'Cada dato con su alcance.' },
      'Los datos son de las casas medidas, «hasta» pone un tope y la reparación es para dos estratos.', 'Busca en el afiche la palabra que limita cada frase.'),
    x('balanza-tesis', 'Crítica: «el afiche carga la culpa en las personas». ¿Qué hace cada dato?', { doc: AGUA, tesis: 'El afiche carga la culpa en las personas',
      ...F(['La pérdida de tuberías va en letra pequeña y sin dibujo.', 0, '¿Qué tanto se destaca la parte del acueducto?'], ['Casi todos los dibujos muestran gastos de la casa.', 0, '¿A quién señalan los dibujos?'], ['Otro afiche igual de grande habla solo de las tuberías.', 1, '¿Seguiría cargando la culpa en las personas?'], ['La flecha es azul.', 2, '¿Cambia a quién se culpa?']), bien: 'El diseño también argumenta.' },
      'La letra pequeña y los dibujos apoyan la crítica; otro afiche la debilitaría; el color no pesa.', 'Mira qué se destaca en el afiche y qué se esconde.'),
  ]);

  const COMIC = {
    id: 'icf-robot', title: 'Cómic: El robot que quería ayudar',
    ficha: { autor: 'Guion y dibujo: Samuel Ospina', fuente: 'Revista «Viñeta Sur»', fecha: 'Abril de 2026' },
    paras: [
      'VIÑETA 1. Plano general de una cocina. Una abuela, doña Rosa, amasa arepas. En la puerta, su nieto sostiene una caja enorme con un moño. Globo del nieto: «¡Feliz día, abuela! Le traje un robot para que no trabaje más». La abuela mira las arepas, no la caja. En la pared hay un reloj: las seis de la mañana.',
      'VIÑETA 2. Primer plano del robot, con ojos redondos y una sonrisa pintada. Globo con bordes cuadrados: «BUENOS DÍAS, ROSA. DETECTO UNA TAREA REPETITIVA». Detrás, muy pequeña, la mano de la abuela levanta el rodillo como si fuera a defenderse. Onomatopeya sobre el rodillo: «¡ejem!».',
      'VIÑETA 3. El robot amasa a toda velocidad; líneas de movimiento llenan el cuadro. Onomatopeya gigante: «¡PAM, PAM, PAM!». A la derecha, una torre de arepas idénticas toca el techo. La abuela está sentada en un butaco, con las manos quietas sobre el delantal. Cartela: «Cuarenta segundos después…».',
      'VIÑETA 4. Sin globos. La abuela mira por la ventana. Afuera, tres vecinas con canastos hacen fila, como todos los días. Una levanta la mano para saludar. El reloj marca las seis y un minuto. Es la única viñeta en blanco y negro, y ocupa el ancho de toda la página.',
      'VIÑETA 5. Las vecinas frente a la puerta. El robot les entrega las arepas sin mirarlas. Globo del robot: «TRANSACCIÓN COMPLETA. SIGUIENTE». Globo de pensamiento de una vecina: un corazón partido y, dentro, el dibujo de dos tazas de café. La fila avanza tan rápido que las figuras salen borrosas.',
      'VIÑETA 6. Noche. La abuela, con unas gafas en la punta de la nariz, tiene un destornillador en la mano y el robot abierto sobre la mesa. Globo: «A ver, mijo, dónde es que se le pone la conversa». El nieto, en la sombra, se tapa la boca para no reírse.',
      'VIÑETA 7. Seis de la mañana otra vez, a todo color. La abuela amasa. A su lado, el robot sostiene una taza y le dice a una vecina, con un globo de bordes redondos: «¿Y cómo sigue la rodilla, doña Nelly?». La torre de arepas es pequeña y cada arepa tiene una forma distinta. Cartela final: «Cuarenta minutos después…».',
    ],
  };
  const l2 = leccion('icf-lc-discontinuo-2', 'Cómics y caricaturas', guion(
    ['Viñetas y cartelas', 'La viñeta es el cuadro; la cartela, la voz que narra.'],
    ['Globos', 'El borde dice cómo suena: cuadrado, de máquina; nube, pensamiento.'],
    ['Plano y color', 'Un primer plano acerca; un cambio de color cambia el ánimo.'],
    ['Entre viñetas', 'Lo que no se dibuja lo completa el lector.']), [
    x('pasos-del-proceso', 'Ordena la historia. La primera parte está en su puesto.', { doc: COMIC, que: 'la historia', de: 'La abuela y el robot', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['El nieto trae el regalo.', 'El robot amasa solo.', 'La abuela queda sin oficio.', 'Ella lo abre de noche.', 'El robot aprende a conversar.'], mira: ['', 'Ocurre apenas se enciende.', 'La muestra la viñeta sin globos.', 'Ocurre con un destornillador.', 'Es el final del cómic.'], bien: 'Regalo, velocidad, vacío, arreglo y conversa.' },
      'Llega el robot, amasa, la abuela queda sin nada que hacer, lo abre y lo cambia.', 'Sigue el reloj y la luz que hay en cada viñeta.'),
    x('voz-de-la-fuente', 'Ata cada efecto al recurso del cómic.', { ayuda: 'Tira un hilo desde cada efecto hasta su recurso.', doc: COMIC, portadas: [['Globo de bordes cuadrados', 'viñeta 2'], ['Líneas de movimiento', 'viñeta 3'], ['Blanco y negro, sin globos', 'viñeta 4'], ['Globo de bordes redondos', 'viñeta 7']],
      ...T(['voz de máquina', 0, '¿Cómo suena un robot al llegar?'], ['velocidad', 1, '¿Qué llena el cuadro al amasar?'], ['tristeza y silencio', 2, '¿Qué cambia cuando ella mira por la ventana?'], ['voz más humana', 3, '¿Cómo suena el robot al final?']), bien: 'El borde, la línea y el color hablan.' },
      'El borde cuadrado suena a máquina, las líneas aceleran, el blanco y negro entristece y el redondo humaniza.', 'Compara cómo está hecha cada viñeta con la anterior.'),
    x('genero-o-cita', '¿Se **dice** con palabras o se **muestra** con el dibujo?', { doc: COMIC, rot: ['con palabras', 'con el dibujo'],
      ...F(['Que es un regalo del nieto', 0, '¿Está en un globo?'], ['Que la abuela se siente sin oficio', 1, '¿Está en un globo?'], ['Que el robot pregunta por la rodilla', 0, '¿Está en un globo?'], ['Que la vecina extraña el café', 1, '¿Qué se ve en su pensamiento?']), bien: 'Lo más triste no lleva palabras.' },
      'El regalo y la rodilla están en globos; las manos quietas y las tazas se dibujan.', 'Busca si hay un globo con texto o solo una imagen.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: COMIC, nums: [4, 5, 7], rot: ['se ve o se lee', 'se deduce', 'ni se ve ni se deduce'],
      ...F(['Las vecinas hacen fila como todos los días.', 0, 'Búscala en la viñeta 4.'], ['A las vecinas les importaba más conversar que comprar rápido.', 1, '¿Qué piensa la vecina de la viñeta 5?'], ['La abuela cambió cómo funciona el robot.', 1, 'Compara cómo habla antes y después.'], ['El nieto devolvió el robot a la tienda.', 2, '¿Aparece alguna tienda?']),
      luz: [[4, 'como todos los días'], [5, 'dos tazas de café'], [7, 'una taza']], bien: 'El lector completa entre viñetas.' },
      'La fila se lee; la conversa y el cambio se deducen; la tienda no aparece.', 'Compara cómo atiende el robot en la viñeta 5 y en la 7.'),
    x('talla-idea', 'Tres mensajes del cómic: pon cada uno en su talla.', { doc: COMIC, p: 7, rot: ['se queda en un detalle', 'justo', 'dice de más'],
      ...F(['Las arepas tienen formas distintas.', 0, 'Es cierto, pero ¿qué quiere decir?'], ['La tecnología ayuda cuando respeta lo que nos une.', 1, 'Compárala con lo que cambia del robot.'], ['Los robots deberían prohibirse.', 2, '¿El robot desaparece al final?']),
      luz: [[7, '¿Y cómo sigue la rodilla'], [7, 'La abuela amasa']], bien: 'El robot se queda, pero conversa.' },
      'Las formas son un detalle, no se prohíbe nada y el final une al robot con la conversa.', 'Mira qué se queda y qué cambia en la última viñeta.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: COMIC, frases: [[3, 'una torre de arepas ', 'idénticas', ' toca el techo'], [5, '«TRANSACCIÓN ', 'COMPLETA', '. SIGUIENTE»'], [6, 'dónde es que se le pone ', 'la conversa', '»']],
      ...F(['todas iguales', 0, '¿Cómo salen de una máquina?'], ['terminada', 1, '¿Cómo queda la venta para el robot?'], ['el hablar con la gente', 2, '¿Qué le falta al robot, según ella?'], ['muy ricas', null, 'Nadie las prueba en esa viñeta.'], ['la batería', null, 'El robot ya funciona.']), bien: 'El contexto las explica.' },
      'Idénticas son iguales, completa es terminada y la conversa es hablar con la gente.', 'Mira qué pasa en la viñeta de cada palabra.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: COMIC, texto: '|La abuela| abrió |el robot| de noche. Él no conversaba, y ella lo arregló.',
      ...T(['«Él»', 1, 'Pon en su lugar lo que ataste: ¿quién no conversaba?'], ['«ella»', 0, 'Pon en su lugar lo que ataste: ¿quién lo arregló?']), bien: 'El robot y la abuela.' },
      'Quien no conversaba es el robot; quien lo arregla, la abuela.', 'Comprueba género y sentido en la oración.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: COMIC, lineas: ['Un nieto regala un robot para que la abuela descanse.', 'La caja tiene un moño.', 'El robot es rápido, pero acaba con la conversa.', 'La abuela lo abre y lo cambia.', 'La puerta está en la cocina.', 'Al final trabajan y conversan juntos.'], ...S([1, 4], { 0: 'Es el comienzo.', 2: 'Es el problema.', 3: 'Es lo que hace ella.', 5: 'Es el final de la historia.' }), bien: 'Regalo, problema, arreglo y final.' },
      'El moño y la puerta son detalles del dibujo; lo demás es la historia.', 'Deja lo que contarías sin mostrar los dibujos.'),
  ]);

  const MIXTO = {
    id: 'icf-mercado', title: 'Los domingos sin carro',
    ficha: { autor: 'Redacción de «El Pedal»', fuente: 'Página doble de un periódico local', fecha: 'Mayo de 2026' },
    paras: [
      'TITULAR: «La calle es de todos, al menos seis horas». Desde hace un año, la carrera décima de Villaluz se cierra a los carros los domingos de siete a una. Se puede caminar, montar en bicicleta o sentarse en la mitad. Muchos comerciantes se opusieron: sin carros, decían, no habría clientes. Esta página intenta responder si tenían razón, con datos, voces y un mapa que cada lector puede comparar por su cuenta.',
      'GRÁFICA DE BARRAS, «Ventas de los domingos en 40 locales de la décima (en millones)». Antes del cierre: 60. Primer mes: 45. Sexto mes: 66. Un año: 78. La barra del primer mes es roja; las demás, verdes. Nota: «Datos entregados por los comerciantes. Doce locales no respondieron».',
      'RECUADRO DE OPINIÓN, con foto. «Yo fui la primera en pelear contra esto», cuenta Amparo Nieto, dueña de una panadería. «El primer mes casi cierro. Después puse dos mesas afuera. Ahora el domingo es mi mejor día y contraté a dos muchachos del barrio para que me ayuden a atender». Debajo de la foto se lee: «A los de repuestos no les fue igual».',
      'CARTA DE UN LECTOR. «Vendo llantas desde hace veinte años. Mi local no está en la gráfica, porque cerré. Un cliente no compra una llanta en bicicleta. No digo que abran la calle; digo que alguien debió sentarse con los que vendemos para carros, y digo que la página de ustedes no me cuenta». Firma: Hernando Pabón.',
      'MAPA. Una línea verde muestra la calle cerrada; dos rojas, las paralelas por donde pasan los carros ese día. Sobre las rojas, una nube gris y el dato: «Ruido: 78 decibeles, seis más que antes». Sobre la verde, un árbol: «58 decibeles, quince menos».',
      'CONCLUSIÓN DE LA REDACCIÓN. «El cierre le sirvió a la mayoría de los locales que respondieron, a quienes pasean y a los pulmones de la décima. No les sirvió a todos, y parte del ruido se mudó a las cuadras vecinas. Antes de extenderlo, convendría preguntarles a ellas. Y a Hernando».',
    ],
  };
  const l3 = leccion('icf-lc-discontinuo-3', 'Textos que mezclan formatos', guion(
    ['Varias piezas, un tema', 'Titular, gráfica, foto, carta y mapa hablan de lo mismo.'],
    ['Se completan o se contradicen', 'Una carta puede mostrar lo que una gráfica deja fuera.'],
    ['¿Quién no respondió?', 'Mira quién falta en los datos.'],
    ['La conclusión', 'Debe tener en cuenta todas las piezas.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada pieza. Sobra una nota.', { doc: MIXTO,
      ...F(['plantea la pregunta', 0, 'Busca lo que la página intenta responder.'], ['da las ventas en números', 1, 'Busca las barras.'], ['trae una voz que cambió de idea', 2, 'Busca a quien peleaba antes.'], ['trae una voz que falta en los datos', 3, 'Busca a quien cerró.'], ['ubica el efecto en la ciudad', 4, 'Busca las líneas de colores.'], ['junta todo con sus límites', 5, 'Busca la opinión de la redacción.'], ['vende bicicletas', null, 'Ninguna pieza vende.']),
      luz: [[1, 'intenta responder'], [2, 'Ventas de los domingos'], [3, 'la primera en pelear'], [4, 'no está en la gráfica'], [5, 'Una línea verde'], [6, 'No les sirvió a todos']], bien: 'Pregunta, números, voces, lugar y conclusión.' },
      'El titular pregunta, la gráfica cuantifica, dos voces opinan, el mapa ubica y la redacción concluye.', 'Mira qué aporta cada pieza que las otras no tienen.'),
    x('genero-o-cita', '¿Es un **dato** medido o una **opinión**?', { doc: MIXTO, rot: ['dato', 'opinión'],
      ...F(['El ruido subió seis decibeles', 0, '¿Se midió o se piensa?'], ['La calle es de todos', 1, '¿Se midió o se piensa?'], ['Doce locales no respondieron', 0, '¿Se contó o se piensa?'], ['La página no me cuenta', 1, '¿Se midió o es lo que alguien siente?']), bien: 'Medir y opinar conviven.' },
      'Los decibeles y los locales se cuentan; el titular y el reclamo opinan.', 'Pregunta si alguien podría no estar de acuerdo.'),
    x('voz-de-la-fuente', 'Ata cada cosa a la pieza que la muestra.', { ayuda: 'Tira un hilo desde cada cosa hasta su pieza.', doc: MIXTO, portadas: [['La gráfica', 'pieza'], ['La carta', 'pieza'], ['El mapa', 'pieza'], ['El recuadro con foto', 'pieza']],
      ...T(['las ventas cayeron y luego subieron', 0, '¿Cuál tiene barras?'], ['un negocio que no entró en los datos', 1, '¿Quién cerró?'], ['el ruido se corrió a otras calles', 2, '¿Cuál tiene líneas rojas?'], ['cómo se adaptó una comerciante', 3, '¿Quién puso mesas?']), bien: 'Cada pieza, lo suyo.' },
      'La gráfica muestra el recorrido, la carta la ausencia, el mapa el ruido y el recuadro la adaptación.', 'Di qué se sabría si solo tuvieras esa pieza.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: MIXTO, nums: [2, 4, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Al año se vendieron 78 millones los domingos.', 0, 'Búscala en la gráfica.'], ['La gráfica puede verse mejor de lo que fue para todos.', 1, '¿Quiénes no están en ella?'], ['El ruido total de la zona no desapareció.', 1, '¿Adónde se fue una parte?'], ['Los carros contaminan menos en las paralelas.', 2, '¿Se midió la contaminación de las paralelas?']),
      luz: [[2, 'Un año: 78'], [4, 'porque cerré'], [5, 'seis más que antes']], bien: 'Lo que falta también informa.' },
      'Las ventas están escritas; el sesgo y el ruido mudado se deducen; la contaminación no se midió.', 'Junta la nota de la gráfica con la carta.'),
    x('balanza-tesis', 'Afirmación: «el cierre benefició a todos los comerciantes». ¿Qué hace cada pieza?', { doc: MIXTO, tesis: 'El cierre benefició a todos los comerciantes',
      ...F(['Las ventas pasaron de 60 a 78.', 0, '¿Apoya, al menos en parte?'], ['Hernando cerró su local.', 1, '¿Benefició a todos?'], ['A los de repuestos no les fue igual.', 1, '¿Benefició a todos?'], ['El árbol del mapa es verde.', 2, '¿Habla de comerciantes?']), bien: 'Un «todos» cae con un solo caso.' },
      'La subida la apoya; Hernando y los repuestos la debilitan; el árbol no pesa.', 'Fíjate en la palabra «todos» de la afirmación.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que **reconoce los límites** del cierre.', { doc: MIXTO, nums: [6], apuesta: 'No sirvió a todos y el ruido se mudó.', ...S(['6.2'], { '6.0': 'Es el rótulo de la pieza.', '6.1': 'Dice a quiénes sirvió.', '6.3': 'Dice qué convendría hacer antes.', '6.4': 'Añade a quién más preguntarle.' }), bien: 'Reconocer límites da confianza.' },
      'Después de decir a quién sirvió, la siguiente aclara a quién no.', 'Busca la oración con una negación y un efecto sobre los vecinos.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que permite la página.', { doc: MIXTO, filas: [{ antes: 'El primer mes, las ventas', topes: ['subieron', 'bajaron', 'no cambiaron'], va: 1 }, { antes: 'Los datos de ventas son de', topes: ['todos los locales', 'los que cerraron', 'quienes respondieron'], va: 2 }, { antes: 'Sobre extender el cierre, recomienda', topes: ['preguntar antes', 'hacerlo ya', 'no hacerlo nunca'], va: 0 }], mira: ['Compara 60 con 45.', 'Relee la nota de la gráfica.', 'Relee la conclusión.'], luz: [[2, 'Primer mes: 45'], [2, 'Doce locales no respondieron'], [6, 'convendría preguntarles']], bien: 'Bajaron, respondieron y preguntar.' },
      'El primer mes bajaron, los datos son de quienes respondieron y recomienda preguntar.', 'Busca el dato exacto en la pieza que corresponde.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MIXTO, lineas: ['Una calle se cierra a los carros los domingos.', 'La foto está arriba de una frase.', 'Las ventas cayeron al comienzo y luego subieron.', 'A algunos negocios no les sirvió.', 'La nube es gris.', 'Antes de ampliarlo conviene oír a los afectados.'], ...S([1, 4], { 0: 'Es el tema de la página.', 2: 'Es el dato principal.', 3: 'Es el límite.', 5: 'Es la conclusión.' }), bien: 'Tema, dato, límite y conclusión.' },
      'La posición de la foto y el color de la nube son detalles; lo demás responde la pregunta.', 'Deja lo que ayuda a contestar si tenían razón.'),
  ]);

  const BIBLIO = {
    id: 'icf-cartel', title: 'Campaña «Devuélvelo»',
    paras: [
      'CARTEL EN LA PUERTA DE LA BIBLIOTECA. Dibujo de un libro con piernas y una maleta, parado bajo la lluvia. Globo: «¿Ya puedo volver a casa?». Abajo, en letras amarillas: «1 240 libros están perdidos. Uno puede estar debajo de tu cama. Devuélvelo en mayo: sin multa y sin preguntas».',
      'TABLA PEGADA AL LADO, «Libros sin devolver por tipo». Novelas: 520. Cómics: 310. Cocina: 180. Escolares: 160. Poesía: 70. Nota: «Total de la colección: 31 000. La biblioteca tiene 9 000 novelas y 1 000 cómics».',
      'CARTA DE UNA USUARIA, en el tablero de corcho. «Me da pena entrar. Saqué un libro de cocina hace muchos años, cuando mi mamá estaba enferma, y aprendí sus recetas. Después ella murió y no fui capaz de soltarlo. Está manchado de salsa. ¿Todavía lo reciben?». Sin firma.',
      'RESPUESTA DE LA BIBLIOTECARIA, en un papel azul, pegada debajo. «Claro que sí. Y si quiere, cópienos una receta en la última página antes de entregarlo. Un libro manchado es un libro que sirvió. Si prefiere quedárselo, tráiganos otro a cambio: también vale. Aquí nadie le va a preguntar por qué se demoró».',
      'GRÁFICA, puesta en junio sobre el cartel. Línea de devoluciones por semana en mayo: primera, 30; segunda, 45; tercera, 210; cuarta, 380. Una flecha señala el comienzo de la tercera semana y dice: «Aquí se pegó la carta». Al pie: «Total: 665. Gracias».',
      'ÚLTIMO PAPEL, escrito a mano, sin fecha. «Devolví seis. Uno no era de aquí, pero llovía y me dio pesar dejarlo afuera». Alguien dibujó al lado el mismo libro con piernas, ahora sin maleta, sentado junto a una ventana. Debajo, en letra de niño: «¿Y el que está debajo de mi cama?». La bibliotecaria contestó con una flecha que apunta hacia la puerta y una sola palabra: «Tráelo». Al día siguiente la flecha tenía un corazón.',
    ],
  };
  const Q = preg(BIBLIO, 'lectura');
  return mundo('icf-lc-discontinuo', 'Textos Discontinuos', 'lectura', [l1, l2, l3], [
    ['icf-lc-discontinuo-1', 'En una tabla, mira también la nota al pie.', Q('Según la tabla y su nota, el tipo con mayor **proporción** de libros sin devolver, entre novelas y cómics, es:', ['Las novelas, porque son 520', 'Los cómics: 310 de 1 000', 'Son iguales', 'No se puede saber'], 1, '520 de 9 000 es menos del 6 %; 310 de 1 000 es 31 %.', 'Compara cada número con el total de su tipo.')],
    ['icf-lc-discontinuo-1', 'La forma también comunica.', Q('La frase «Uno puede estar debajo de tu cama» busca:', ['Acusar de robo', 'Enseñar a ordenar el cuarto', 'Que el lector se sienta parte del problema sin regañarlo', 'Vender libros'], 2, 'Habla de «tu cama» con humor y ofrece volver sin multa ni preguntas.', 'Mira a quién le habla y qué ofrece después.')],
    ['icf-lc-discontinuo-2', 'En un dibujo, dar vida a un objeto crea cercanía.', Q('El libro con piernas, maleta y lluvia sirve para:', ['Informar cuántos libros hay', 'Despertar ternura por los libros perdidos', 'Anunciar el clima', 'Mostrar un viaje real'], 1, 'Darle rasgos de persona y pena mueve a devolverlo.', 'Pregunta qué sentimiento produce el dibujo.')],
    ['icf-lc-discontinuo-2', 'Compara el dibujo del comienzo con el del final.', Q('Que al final el libro aparezca sin maleta y junto a una ventana sugiere que:', ['Se perdió otra vez', 'Está de viaje', 'Fue vendido', 'Ya volvió a casa'], 3, 'Sin maleta y bajo techo: llegó.', 'Recuerda qué preguntaba en el primer cartel.')],
    ['icf-lc-discontinuo-3', 'Una pieza puede explicar a otra.', Q('La flecha de la gráfica sugiere que el aumento de devoluciones se debió a:', ['La lluvia', 'La carta y su respuesta', 'El final del año', 'Las multas'], 1, 'La flecha señala el comienzo de la tercera semana, cuando se pegó la carta.', 'Lee lo que dice la flecha y qué pasa después.')],
    ['icf-lc-discontinuo-3', 'Que algo ocurra después no prueba que sea la causa.', Q('Alguien podría cuestionar la conclusión de la gráfica diciendo que:', ['La línea es azul', 'Había libros de poesía', 'La carta no tiene firma', 'En la última parte del mes la gente también se apura por el plazo'], 3, 'El plazo vencía en mayo: el final del plazo es otra explicación posible.', 'Busca otra causa para el aumento al final del mes.')],
  ]);
})());
