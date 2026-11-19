// Preuniversitario · Comprensión lectora · mundo 3 «Información explícita» con textos de verdad (spec
// 2026-11-19-preuda-lectura-textos): un inventario de un bosque lleno de cifras (ubicar datos), un texto sobre el sueño adolescente
// lleno de matices de alcance (paráfrasis), una criadora de abejas sin aguijón con datos que suenan ciertos pero el texto no dice
// (lo que dice y lo que no) y una calle peatonal con varias voces y fechas (quién dice qué). La evaluación usa una cooperativa de
// recicladoras. Textos escritos para Zuka.
PU_LEC_JUEGOS.push(({ setLesson, setExam }) => {
  const BOSQUE = {
    id: 'lec-contar-bosque', title: 'Contar un bosque, árbol por árbol',
    ficha: { autor: 'Sección de ciencia', fuente: 'Boletín de una universidad pública', fecha: 'Junio de 2024' },
    paras: [
      'En marzo de 2024, un grupo de nueve estudiantes de ingeniería forestal y dos guías de la vereda El Roble subió al bosque de niebla que corona el municipio para hacer algo que nadie había hecho allí: contarlo. No se trataba de calcular a ojo cuántos árboles había, sino de medirlos uno por uno dentro de parcelas marcadas con cuerdas y estacas de colores.',
      'El método es más sencillo de lo que parece. Se escogen al azar puntos del bosque y en cada uno se marca un cuadrado de veinte metros por lado. Dentro de ese cuadrado se mide todo árbol cuyo tronco, a un metro con treinta centímetros del suelo, tenga más de diez centímetros de diámetro. Esa altura no es caprichosa: es la que usan los forestales de casi todo el mundo, de modo que los datos de El Roble se pueden comparar con los de cualquier otro bosque.',
      'En total se marcaron catorce parcelas. Los estudiantes registraron 1.186 árboles de 63 especies distintas. La más abundante fue el roble andino, con 212 ejemplares, seguido del encenillo, con 158. Pero el dato que más sorprendió al equipo fue otro: 19 de las especies aparecieron una sola vez, en una sola parcela. «Si hubiéramos marcado diez parcelas en vez de catorce, varias de ellas no existirían en nuestra lista», explicó Lucía Arango, la profesora que dirigió el trabajo.',
      'Los guías aportaron algo que ningún instrumento mide. Don Efraín Cardona, que ha caminado esas lomas desde niño, reconoció por la corteza y el olor de las hojas especies que los estudiantes solo pudieron identificar después, con ayuda de un herbario. También señaló los lugares donde, hace treinta años, se sacaba madera para cercas, y donde hoy los árboles son más delgados y más jóvenes.',
      'El inventario tardó once días de trabajo de campo y casi dos meses de organizar datos. El resultado es un mapa que muestra dónde está el bosque más viejo y dónde se está recuperando. Con él, la junta de acción comunal pidió a la alcaldía declarar protegidas las 140 hectáreas de la parte alta, la que surte de agua a dos acueductos veredales.',
      'Contar un bosque, al final, no sirve solo para saber cuántos árboles tiene. Sirve para que nadie pueda decir después que allí no había nada que cuidar.',
    ],
  };

  const SUENO = {
    id: 'lec-sueno-adolescente', title: '¿Pereza o biología?',
    ficha: { autor: 'Sección de salud', fuente: 'Revista de divulgación para familias', fecha: 'Febrero de 2025' },
    paras: [
      'A muchos padres les desespera que sus hijos adolescentes se queden despiertos hasta la medianoche y que por la mañana no haya quién los levante. La explicación más común es la pereza o el celular. Las dos influyen, pero no cuentan toda la historia.',
      'Durante la adolescencia, el reloj interno del cuerpo suele correrse hacia más tarde. La melatonina, la sustancia que el cerebro libera cuando se acerca la hora de dormir, empieza a aparecer más tarde en la noche que en la infancia. Por eso a muchos jóvenes de quince años no les da sueño a las nueve, aunque se acuesten a esa hora. No es que no quieran dormir: es que su cuerpo todavía no está listo.',
      'Las pantallas pueden empeorar el problema. La luz del celular, sobre todo si se usa a pocos centímetros de la cara, retrasa un poco más la llegada del sueño. Y lo que se ve en ella —un chat que no termina, un video que lleva a otro— mantiene la mente despierta. Sin embargo, apagar el celular no adelanta el reloj por completo: reduce el retraso, no lo elimina.',
      'El choque llega por la mañana. Si un joven se duerme a la medianoche y debe levantarse a las cinco y media para llegar al colegio, duerme cinco horas y media, cuando los especialistas recomiendan entre ocho y diez a esa edad. Una noche así no es grave; meses así sí lo son. La falta de sueño acumulada se ha relacionado con peor memoria, más irritabilidad y más accidentes.',
      'Algunos colegios han probado empezar las clases una hora más tarde. En varios de ellos, los estudiantes durmieron más, faltaron menos y, en algunos casos, mejoraron sus notas. No en todos los colegios funcionó igual, y cambiar el horario implica reorganizar el transporte y el trabajo de los padres. Pero la experiencia sugiere que parte de lo que llamamos pereza es, en realidad, biología.',
      'Mientras tanto, hay medidas que sí están en manos de cada familia: luz tenue en la noche, el celular fuera del cuarto y una hora de levantarse parecida también los fines de semana. Ninguna convierte a un adolescente en madrugador, pero todas le ayudan a dormir un poco más.',
    ],
  };

  const ABEJAS = {
    id: 'lec-abejas-sin-aguijon', title: 'Las abejas que no pican',
    ficha: { autor: 'Crónica de una periodista de Santander', fuente: 'Suplemento rural de un periódico regional', fecha: 'Octubre de 2025' },
    paras: [
      'Cuando Marina Rueda le cuenta a alguien que cría abejas en el patio de su casa, en las afueras de San Gil, la respuesta suele ser un paso atrás. Luego ella abre una caja de madera del tamaño de un libro grande y deja que las abejas le caminen por los dedos. No pasa nada. Son angelitas, una de las muchas especies de abejas sin aguijón que viven en Colombia.',
      'Que no piquen no quiere decir que no se defiendan. Cuando algo amenaza la colmena, las angelitas se enredan en el pelo del intruso o le pegan resina en las alas. La entrada de la caja es un tubito de cera por donde apenas cabe una abeja, y de día siempre hay varias guardianas paradas en él, «como porteras», dice Marina.',
      'Una colmena de angelitas produce poca miel: alrededor de un litro al año, mientras que una de abejas comunes puede dar decenas. Pero es una miel distinta, más líquida y un poco ácida, que Marina vende por goteros y no por frascos. Sus clientes la usan sobre todo para los ojos y la garganta, como hacían sus abuelas. Ella misma advierte que esos usos vienen de la tradición y que no reemplazan la consulta médica.',
      'Lo que más le interesa a Marina, sin embargo, no es la miel. Las abejas sin aguijón visitan flores pequeñas que otros insectos ignoran, y en las fincas vecinas los cultivos de aguacate y de café han empezado a recibir esas visitas. Dos de sus vecinos le pidieron cajas para ponerlas cerca de sus árboles. Ninguno ha medido todavía si la cosecha mejoró, pero los dos dicen que piensan seguir.',
      'Criar estas abejas tiene sus reglas. No se pueden sacar colmenas del monte sin permiso, porque cada nido que se arranca de un árbol viejo es un nido menos en el bosque. Marina empezó con una colmena que le regaló un vecino y la dividió con paciencia; hoy tiene veintiséis cajas. Dividir una colmena, explica, es como trasplantar una mata: si se hace con afán, se pierden las dos partes.',
      'En el último año, catorce personas del municipio han tomado su curso de los sábados. Al final de cada clase, Marina repite la misma frase: «Una abeja que no pica no necesita que uno le tenga miedo. Necesita que uno le tenga respeto».',
    ],
  };

  const CALLE = {
    id: 'lec-calle-peatonal', title: 'La calle que se quedó sin carros',
    ficha: { autor: 'Columna de un periodista local', fuente: 'Periódico de un municipio de Antioquia', fecha: 'Junio de 2024' },
    paras: [
      'Durante cuarenta años, la calle Bolívar de Santa Rosa fue un embudo: buses, motos y carretas compartían seis metros de ancho con la gente que iba al mercado. En febrero de 2023 el concejo aprobó cerrarla a los carros entre el parque y la iglesia. Las obras empezaron en junio, se suspendieron en septiembre por las lluvias y terminaron en marzo del año siguiente.',
      'Gerardo Montoya, dueño de una ferretería en la esquina, se opuso desde el principio. «Mis clientes vienen en carro a llevar cemento y varillas. Si no pueden parquear, se van a otro lado», dijo en la audiencia pública. Un año después reconoce que las ventas de cemento bajaron, pero que las de herramientas pequeñas subieron, porque ahora pasa más gente a pie frente a su vitrina. Lo que no esperaba, cuenta, era ver la calle llena de familias los domingos, comprando un helado y mirando vitrinas que antes nadie miraba.',
      'Natalia Restrepo, la urbanista que diseñó el proyecto, sostiene que el cambio no se mide solo en ventas. Según ella, la calle tenía el aire más contaminado del pueblo y el mayor número de atropellos. «Una calle no es un parqueadero alargado», afirma. Reconoce, eso sí, que faltó prever un lugar de cargue para negocios como el de Gerardo.',
      'La alcaldesa, Patricia Lozano, anunció en mayo que habilitó una zona de cargue en la calle de atrás, con horario de seis a nueve de la mañana. Según la alcaldía, desde que se cerró la vía no ha habido ningún atropello en ese tramo. Los vendedores ambulantes, que antes se apretaban contra las paredes, ahora ocupan el centro de la calle los domingos.',
      'A mi modo de ver, la discusión se planteó mal desde el comienzo, como si hubiera que escoger entre comerciantes y peatones. Lo que la calle Bolívar muestra es que los dos pueden ganar, siempre que alguien escuche a tiempo a quienes van a perder algo. La zona de cargue llegó tarde, pero llegó. Ojalá la próxima obra del pueblo empiece por esa escucha, en vez de terminar en ella.',
    ],
  };

  // ---------------- Lección 1 · Ubicar datos ----------------
  setLesson('pu-ie-1', [
    play('anticipa-texto', 'Antes de leer: ¿qué trae este texto?', { doc: BOSQUE, slots: [
      ['Tema', ['cómo se midió un bosque', 'cómo se tala un bosque', 'la vida de un leñador'], 0],
      ['Lo que traerá', ['cifras y un método', 'diálogos de personajes inventados', 'versos con rima'], 0],
      ['Propósito', ['informar sobre un trabajo y para qué sirve', 'vender madera', 'contar una leyenda'], 0],
    ] }, 'El título habla de contar árboles uno por uno y la fuente es el boletín de una universidad, en la sección de ciencia: se espera un texto que informa con cifras y explica un método.',
      { hint: 'Lee el título, la sección y la fuente. ¿Quién publica algo así y para qué?' }),
    play('donde-buscar', 'Cada dato tiene su párrafo', { doc: BOSQUE, cards: [
      ['¿Cuándo subió el grupo al bosque?', [1]], ['¿A qué altura se mide el tronco?', [2]], ['¿Cuántas parcelas se marcaron?', [3]],
      ['¿Quién reconocía especies por el olor?', [4]], ['¿Cuántas hectáreas se pidió proteger?', [5]],
    ] }, 'Fecha y grupo (1), método (2), resultados en cifras (3), el saber de los guías (4) y lo que se hizo con el mapa (5). Saber qué hace cada párrafo permite ir directo al dato.',
      { hint: 'Toma la palabra clave de cada pregunta (cuándo, altura, parcelas, olor, hectáreas) y búscala en el texto.' }),
    play('lupa-evidencia', 'Datos que están y datos que no', { doc: BOSQUE, cards: [
      ['Se registraron 63 especies de árboles.', 0],
      ['El roble andino fue la especie con más ejemplares.', 0],
      ['Organizar los datos tomó más tiempo que el trabajo de campo.', 1],
      ['Don Efraín reconocía algunas especies sin necesidad de instrumentos.', 1],
      ['La alcaldía ya declaró protegida la parte alta.', 2],
      ['El encenillo es el árbol más alto del bosque.', 2],
    ] }, 'Las 63 especies y el roble andino están escritos. Que organizar datos tardó más se saca al juntar dos datos: once días frente a casi dos meses. Lo de don Efraín se deduce de que los estudiantes reconocieron después, con un herbario, lo que él identificaba en el monte. La junta solo pidió la protección, y el texto no habla de la altura del encenillo.',
      { hint: 'Cuidado con «pidió» frente a «declaró». Y a veces la respuesta sale de juntar dos datos de frases distintas.' }),
    play('intruso-excepto', 'Pregunta EXCEPTO', { doc: BOSQUE, ask: 'Según el texto, el equipo hizo todo lo siguiente, EXCEPTO:', cards: [
      ['Marcar cuadrados de veinte metros por lado', [2]],
      ['Medir troncos de más de diez centímetros', [2]],
      ['Identificar especies con ayuda de un herbario', [4]],
      ['Cortar una muestra de madera de cada árbol', null],
    ] }, 'Los cuadrados y la medida de los troncos están en el párrafo 2; el herbario, en el 4. Nadie cortó madera: se medía cada tronco, no se cortaba.',
      { hint: 'Lleva cada opción al párrafo donde aparece. La que no encuentre lugar es la respuesta.' }),
    play('palabra-a-la-medida', 'Palabras del método', { doc: BOSQUE, rounds: [
      { p: 2, before: 'Esa altura no es ', word: 'caprichosa', after: ': es la que usan', options: ['arbitraria', 'peligrosa', 'exacta', 'elegante'], answer: 0 },
      { p: 4, before: 'Los guías ', word: 'aportaron', after: ' algo que ningún instrumento mide.', options: ['contribuyeron con', 'cobraron', 'escondieron', 'compraron'], answer: 0 },
    ] }, 'Una altura «no caprichosa» no es arbitraria: la eligen todos para poder comparar. Y los guías contribuyeron con su saber al trabajo.',
      { hint: 'Lee lo que sigue a cada palabra: los dos puntos del párrafo 2 explican por qué esa altura y no otra.' }),
    play('hilo-referente', '¿A qué se refiere?', { doc: BOSQUE, rounds: [
      { p: 3, text: 'La más abundante fue |el roble andino|, con 212 ejemplares, seguido del |encenillo|, con 158. Pero el dato que más sorprendió al equipo fue otro: |19 de las especies| aparecieron una sola vez, en una sola parcela. «Si hubiéramos marcado diez parcelas en vez de catorce, |varias de ellas|', from: 7, answer: 5 },
      { p: 5, text: 'pidió a |la alcaldía| declarar protegidas |las 140 hectáreas| de |la parte alta|, |la| que surte de agua a dos acueductos', from: 7, answer: 5 },
    ] }, '«Varias de ellas» son algunas de las 19 especies que aparecieron una sola vez: con menos parcelas no se habrían encontrado. Y «la que surte de agua» es la parte alta: «la» va en singular, y las hectáreas son plurales.',
      { hint: 'Fíjate en el número y el género: «ellas» pide algo en plural femenino; «la», algo en singular femenino que pueda surtir de agua a un acueducto.' }),
    play('mapa-del-texto', 'El recorrido del texto', { doc: BOSQUE, labels: ['presenta quiénes, cuándo y qué hicieron', 'explica el método', 'da los resultados en cifras', 'suma el saber de los guías', 'cuenta para qué sirvió el trabajo', 'cierra con la idea central', 'critica a la alcaldía'], key: [0, 1, 2, 3, 4, 5] },
      'El texto avanza como un informe: quién y cuándo, cómo se hizo, qué se encontró, qué aportaron los guías, para qué sirvió y una frase final con la idea. No critica a nadie.',
      { hint: 'Nombra con dos o tres palabras lo que hace cada párrafo y busca la etiqueta que más se le parece.' }),
  ]);

  // ---------------- Lección 2 · Paráfrasis ----------------
  setLesson('pu-ie-2', [
    play('resume-parrafo', 'Lo mismo, con otras palabras', { doc: SUENO, paras: [2, 3, 4, 5], options: [
      'El reloj del cuerpo se atrasa en la adolescencia y por eso el sueño llega más tarde.',
      'Las pantallas aumentan el retraso del sueño, pero no son su única causa.',
      'Levantarse muy temprano deja a muchos jóvenes con menos horas de sueño de las recomendadas.',
      'Entrar más tarde al colegio dio buenos resultados en varios casos, aunque no en todos.',
      'Los adolescentes no duermen porque usan demasiado el celular.',
      'Entrar más tarde al colegio mejora siempre las notas.',
    ], key: [0, 1, 2, 3] }, 'Cada resumen fiel dice lo mismo que el párrafo sin agrandarlo. Los dos que sobran cambian el alcance: el celular no es la única causa, y las notas mejoraron «en algunos casos», no siempre.',
      { hint: 'Desconfía de las frases que dicen «siempre», «todos» o que dan una sola causa: compara su alcance con el del párrafo.' }),
    play('lupa-evidencia', 'Cuidado con el alcance', { doc: SUENO, cards: [
      ['La luz del celular retrasa el sueño.', 0],
      ['Apagar el celular reduce el retraso del sueño.', 0],
      ['Acostar más temprano a un adolescente no garantiza que se duerma antes.', 1],
      ['Apagar el celular elimina el retraso del sueño.', 2],
      ['Todos los colegios que cambiaron el horario mejoraron sus notas.', 2],
      ['Los adolescentes duermen menos que los adultos.', 2],
    ] }, 'Las dos primeras están escritas. La tercera se deduce de que a los quince años no da sueño a las nueve «aunque se acuesten a esa hora». «Elimina» y «todos» cambian el alcance de lo dicho («reduce», «en algunos casos»), y el texto no compara con los adultos.',
      { hint: 'Compara verbo por verbo: «reduce» no es «elimina», y «en varios» no es «en todos».' }),
    play('palabra-a-la-medida', 'El verbo justo', { doc: SUENO, rounds: [
      { p: 3, before: 'Las pantallas pueden ', word: 'empeorar', after: ' el problema.', options: ['agravar', 'provocar', 'resolver', 'explicar'], answer: 0 },
      { p: 4, before: 'La falta de sueño ', word: 'acumulada', after: ' se ha relacionado', options: ['que se va sumando', 'repentina', 'que se recupera', 'de una sola noche'], answer: 0 },
    ] }, 'Empeorar es agravar algo que ya existe; «provocar» diría que las pantallas lo causan, y el texto dice que el problema viene del reloj del cuerpo. La falta de sueño acumulada es la que se suma noche tras noche: «meses así».',
      { hint: 'Ten en cuenta lo que dice el resto del texto: ¿el problema ya existía antes de las pantallas? ¿Se habla de una noche o de meses?' }),
    play('conector-bisagra', 'Cómo se unen las ideas', { doc: SUENO, rounds: [
      { a: 'A los quince años la melatonina aparece más tarde en la noche.', b: 'a muchos jóvenes no les da sueño a las nueve.', options: ['Por eso,', 'Aunque', 'En cambio,', 'Por ejemplo,'], answer: 0 },
      { a: 'Las pantallas pueden empeorar el problema.', b: 'apagar el celular no adelanta el reloj por completo.', options: ['Sin embargo,', 'Por lo tanto,', 'Es decir,', 'Además,'], answer: 0 },
      { a: 'En varios colegios los estudiantes durmieron más y faltaron menos.', b: 'cambiar el horario implica reorganizar el transporte.', options: ['No obstante,', 'Así que', 'O sea,', 'Por ejemplo,'], answer: 0 },
    ] }, 'La melatonina tardía explica que no dé sueño (consecuencia). Que las pantallas empeoren el problema no significa que apagarlas lo resuelva (contraste). Y los buenos resultados tienen un costo (contraste).',
      { hint: 'Pregúntate si la segunda idea resulta de la primera o le pone un límite.' }),
    play('balanza-argumento', '¿Pereza o biología?', { doc: SUENO, thesis: 'Parte de lo que llamamos pereza en los adolescentes es, en realidad, biología.', cards: [
      ['La melatonina aparece más tarde en la noche durante la adolescencia.', 0],
      ['En colegios que empezaron más tarde, los estudiantes durmieron más.', 0],
      ['Un estudio halla que los adolescentes sin celular se duermen tan temprano como los niños.', 1],
      ['Los jóvenes de quince años que se acuestan a las nueve se duermen enseguida.', 1],
      ['Cambiar el horario implica reorganizar el transporte.', null],
    ] }, 'La melatonina tardía y el efecto de entrar más tarde respaldan la tesis. Si sin celular se durmieran temprano, o si a las nueve se durmieran enseguida, el problema no sería biológico. El transporte es un costo de la medida, no una razón a favor ni en contra de la tesis.',
      { hint: 'Imagina que cada oración es verdad: ¿haría más creíble o menos creíble que el sueño tardío sea biológico?' }),
    play('donde-buscar', 'Vuelve al párrafo', { doc: SUENO, cards: [
      ['¿Qué sustancia anuncia la hora de dormir?', [2]], ['¿Por qué la luz del celular afecta el sueño?', [3]],
      ['¿Cuántas horas se recomienda dormir a esa edad?', [4]], ['¿Qué pasó en los colegios que empezaron más tarde?', [5]],
      ['¿Qué puede hacer cada familia?', [6]],
    ] }, 'Biología (2), pantallas (3), horas de sueño (4), colegios (5) y medidas en casa (6): el texto va de la causa a las soluciones.',
      { hint: 'El texto avanza de la causa al problema y de ahí a las soluciones. Ubica en qué parte de ese recorrido cae cada pregunta.' }),
    play('signos-que-hablan', 'Lo que hacen los signos', { doc: SUENO, rounds: [
      { p: 3, text: 'Y lo que se ve en ella |—|un chat que no termina', options: ['abre un inciso con ejemplos', 'marca el turno de un diálogo', 'cita a un experto', 'anuncia una conclusión'], answer: 0 },
      { p: 2, text: 'No es que no quieran dormir|:| es que su cuerpo todavía no está listo.', options: ['anuncia la verdadera razón', 'introduce una cita textual', 'abre una lista de ejemplos', 'cierra una pregunta'], answer: 0 },
    ] }, 'La raya abre un paréntesis con ejemplos de lo que se ve en la pantalla. Los dos puntos anuncian la explicación de verdad, después de descartar la falsa.',
      { hint: 'Mira qué viene después de cada signo: ¿ejemplos, una cita o una explicación?' }),
  ]);

  // ---------------- Lección 3 · Lo que dice y lo que no ----------------
  setLesson('pu-ie-3', [
    play('lupa-evidencia', '¿Dónde lo dice?', { doc: ABEJAS, cards: [
      ['Las angelitas no tienen aguijón.', 0],
      ['Una colmena de angelitas produce cerca de un litro de miel al año.', 0],
      ['La miel de angelita se usa en cantidades pequeñas.', 1],
      ['Las guardianas de la entrada protegen la colmena.', 1],
      ['La miel de angelita cura las infecciones de los ojos.', 2],
      ['Las abejas sin aguijón aumentan la cosecha de café.', 2],
      ['Las abejas comunes están desapareciendo.', 2],
    ] }, 'Dos datos están escritos. Que la miel se usa en cantidades pequeñas (se vende por goteros, para los ojos) y que las guardianas protegen se deduce con pistas del texto. Lo demás puede sonar a verdad, pero no está: Marina dice que los usos medicinales son tradición, nadie ha medido la cosecha y el texto no habla de la suerte de las abejas comunes.',
      { hint: 'Antes de aceptar una afirmación, señala la frase que la respalda. Si solo la apoya lo que tú sabes, el texto no la dice.' }),
    play('intruso-excepto', 'La defensa de la colmena', { doc: ABEJAS, ask: 'Según el texto, las angelitas defienden la colmena de todas estas formas, EXCEPTO:', cards: [
      ['Enredándose en el pelo del intruso', [2]],
      ['Pegándole resina en las alas', [2]],
      ['Vigilando la entrada con guardianas', [2]],
      ['Soltando un olor que espanta a otros insectos', null],
    ] }, 'Las tres primeras están en el párrafo 2. El olor que espanta suena posible, pero el texto no lo menciona.',
      { hint: 'No elijas la opción que te suene rara: busca cada una en el texto y quédate con la que no aparece.' }),
    play('donde-buscar', 'Cada dato en su lugar', { doc: ABEJAS, cards: [
      ['¿Qué tamaño tiene la caja?', [1]], ['¿Cómo vende Marina la miel?', [3]], ['¿Qué le pidieron los vecinos?', [4]],
      ['¿Cuántas cajas tiene hoy?', [5]], ['¿Cuántas personas han hecho su curso?', [6]],
    ] }, 'Presentación con la caja (1), la miel (3), los vecinos y los cultivos (4), la cría y sus reglas (5) y el curso (6).',
      { hint: 'Ubica la palabra clave de cada pregunta: caja, miel, vecinos, cajas de hoy, curso.' }),
    play('palabra-a-la-medida', 'Palabras de Marina', { doc: ABEJAS, rounds: [
      { p: 5, before: 'si se hace con ', word: 'afán', after: ', se pierden las dos partes.', options: ['prisa', 'cuidado', 'tristeza', 'dinero'], answer: 0 },
      { p: 3, before: 'Ella misma ', word: 'advierte', after: ' que esos usos vienen de la tradición', options: ['avisa', 'niega', 'olvida', 'descubre'], answer: 0 },
    ] }, 'En Colombia, hacer algo «con afán» es hacerlo de prisa: lo contrario de la paciencia con que Marina divide las colmenas. Y advertir es avisar de algo para prevenir un error.',
      { hint: 'En el párrafo 5, Marina divide la colmena «con paciencia». ¿Qué sería lo contrario?' }),
    play('hilo-referente', '¿De qué se habla?', { doc: ABEJAS, rounds: [
      { p: 2, text: 'La entrada de la caja es |un tubito de cera| por donde apenas cabe |una abeja|, y de día siempre hay |varias guardianas| paradas en |él|', from: 7, answer: 1 },
      { p: 4, text: 'Dos de |sus vecinos| le pidieron |cajas| para ponerlas cerca de sus árboles. |Ninguno| ha medido', from: 5, answer: 1 },
    ] }, 'Las guardianas están paradas en el tubito de cera, la entrada. Y «ninguno» es ninguno de los dos vecinos que pidieron cajas.',
      { hint: 'Pregúntate dónde se puede estar parado y quién podría medir una cosecha.' }),
    play('termometro-tono', 'El tono de Marina', { doc: ABEJAS, rounds: [
      { frag: 'Ella misma advierte que esos usos vienen de la tradición y que no reemplazan la consulta médica.', scale: ['prudente', 'entusiasta', 'burlón', 'alarmado'], answer: 0 },
      { frag: '«Una abeja que no pica no necesita que uno le tenga miedo. Necesita que uno le tenga respeto».', scale: ['respetuoso', 'temeroso', 'irónico', 'indiferente'], answer: 0 },
    ] }, 'Marina no exagera las virtudes de su miel: es prudente. Y su frase final pide respeto por las abejas.',
      { hint: 'Fíjate si quien habla exagera, se burla, se asusta o cuida lo que afirma.' }),
    play('mapa-del-texto', 'El orden de la crónica', { doc: ABEJAS, labels: ['presenta a Marina y sus abejas', 'explica cómo se defienden', 'describe la miel y sus usos', 'cuenta su visita a los cultivos vecinos', 'explica las reglas de la cría', 'cierra con su enseñanza', 'compara precios de la miel'], key: [0, 1, 2, 3, 4, 5] },
      'Cada párrafo trata un aspecto: quién es Marina, la defensa, la miel, los cultivos, las reglas y la frase con que cierra sus clases. No hay precios.',
      { hint: 'Busca de qué habla cada párrafo en su primera oración.' }),
  ]);

  // ---------------- Lección 4 · Quién dice qué ----------------
  setLesson('pu-ie-4', [
    play('quien-lo-dice', 'Cuatro voces en una columna', { doc: CALLE, voices: ['Gerardo Montoya', 'Natalia Restrepo', 'La alcaldía', 'El autor'], cards: [
      ['Si los clientes no pueden parquear, se van a otro lado.', 0],
      ['Las ventas de herramientas pequeñas subieron.', 0],
      ['Una calle no es un parqueadero alargado.', 1],
      ['Faltó prever un lugar de cargue.', 1],
      ['No ha habido atropellos en el tramo cerrado.', 2],
      ['La discusión se planteó mal desde el comienzo.', 3],
      ['Comerciantes y peatones pueden ganar los dos.', 3],
    ] }, 'Las marcas lo dicen: «dijo», «reconoce», «sostiene», «afirma», «según la alcaldía» y, para el autor, «a mi modo de ver».',
      { hint: 'Busca el verbo o la marca que acompaña cada idea: «dijo», «según ella», «según la alcaldía», «a mi modo de ver».' }),
    play('lupa-evidencia', 'La trampa de la voz', { doc: CALLE, cards: [
      ['Gerardo admite que bajaron sus ventas de cemento.', 0],
      ['Según la urbanista, la calle tenía el aire más contaminado del pueblo.', 0],
      ['Las obras tardaron más de seis meses.', 1],
      ['La zona de cargue responde a un reclamo como el de Gerardo.', 1],
      ['El autor afirma que la calle tenía el aire más contaminado del pueblo.', 2],
      ['Gerardo ahora apoya la calle peatonal.', 2],
    ] }, 'Las dos primeras están dichas. Que las obras tardaron más de seis meses sale de las fechas (junio a marzo); y la zona de cargue responde a lo que faltó para negocios «como el de Gerardo». Lo del aire lo dice la urbanista, no el autor, y Gerardo reconoce un cambio en sus ventas, no que apoye la medida.',
      { hint: 'Una idea puede estar en el texto y aun así la opción ser falsa, si la pone en boca de otro.' }),
    play('intruso-excepto', 'La secuencia de los hechos', { doc: CALLE, ask: 'Según el texto, ocurrió todo lo siguiente, EXCEPTO:', cards: [
      ['El concejo aprobó cerrar la calle', [1]],
      ['Las obras se suspendieron por las lluvias', [1]],
      ['La alcaldesa anunció una zona de cargue', [4]],
      ['Los comerciantes bloquearon la calle en protesta', null],
    ] }, 'La aprobación y la suspensión están en el párrafo 1; el anuncio, en el 4. Gerardo se opuso en la audiencia pública, pero nadie bloqueó la calle.',
      { hint: 'Ubica cada hecho con su fecha o su protagonista. Oponerse en una audiencia no es lo mismo que bloquear una calle.' }),
    play('balanza-argumento', '¿Fue buena idea?', { doc: CALLE, thesis: 'Cerrar la calle Bolívar a los carros fue una buena decisión para el pueblo.', cards: [
      ['No ha habido atropellos desde el cierre.', 0],
      ['Las ventas de herramientas pequeñas subieron.', 0],
      ['Las ventas de cemento bajaron.', 1],
      ['Faltó un lugar de cargue para los negocios.', 1],
      ['Las obras se suspendieron por las lluvias.', null],
    ] }, 'Menos atropellos y más ventas pequeñas favorecen el cierre; menos cemento y la falta de cargue son sus costos. La lluvia retrasó la obra, pero no dice si la decisión fue buena o mala.',
      { hint: 'Pregúntate si cada hecho es un beneficio del cierre, un costo, o algo que no tiene que ver con el resultado.' }),
    play('signos-que-hablan', 'Signos y voces', { doc: CALLE, rounds: [
      { p: 3, text: '|«|Una calle no es un parqueadero alargado», afirma.', options: ['abre las palabras exactas de la urbanista', 'marca ironía', 'abre el título de una obra', 'encierra una palabra extranjera'], answer: 0 },
      { p: 1, text: 'la calle Bolívar de Santa Rosa fue un embudo|:| buses, motos y carretas', options: ['anuncia en qué consistía el embudo', 'abre una cita', 'marca una pregunta', 'indica un cambio de tema'], answer: 0 },
    ] }, 'Las comillas, con «afirma», marcan una cita directa: las palabras exactas de Natalia. Los dos puntos anuncian la explicación de por qué la calle era un embudo.',
      { hint: 'Fíjate en el verbo que acompaña las comillas y en lo que viene después de los dos puntos.' }),
    play('palabra-a-la-medida', 'Palabras de la columna', { doc: CALLE, rounds: [
      { p: 1, before: 'la calle Bolívar de Santa Rosa fue un ', word: 'embudo', after: ':', options: ['lugar donde todo se atascaba', 'calle muy ancha', 'sitio peligroso de noche', 'mercado al aire libre'], answer: 0 },
      { p: 3, before: 'la urbanista que diseñó el proyecto, ', word: 'sostiene', after: ' que el cambio', options: ['afirma', 'duda', 'niega', 'teme'], answer: 0 },
    ] }, 'Un embudo es ancho arriba y estrecho abajo: todo se atasca al pasar, como buses, motos y gente en seis metros. Y sostener una idea es afirmarla y defenderla.',
      { hint: 'Lee lo que viene después de «embudo»: ¿cuántas cosas pasaban por seis metros de ancho?' }),
    play('hilo-referente', '¿Quiénes son «los dos»?', { doc: CALLE, rounds: [
      { p: 5, text: 'A mi modo de ver, |la discusión| se planteó mal desde el comienzo, como si hubiera que escoger entre |comerciantes y peatones|. Lo que |la calle Bolívar| muestra es que |los dos| pueden ganar', from: 7, answer: 3 },
    ] }, '«Los dos» que pueden ganar son los comerciantes y los peatones, entre quienes la discusión parecía obligar a escoger.',
      { hint: 'Busca antes de «los dos» dos cosas que el autor nombre juntas.' }),
  ]);

  // ---------------- Evaluación: formato real, texto nuevo ----------------
  const RECICLA = {
    id: 'lec-recicladoras', title: 'Las recicladoras de la ladera',
    paras: [
      'Antes de las seis de la mañana, cuando los camiones de la basura todavía no han pasado, las once socias de la cooperativa Manos Verdes ya están recorriendo el barrio. Empujan carretas de llantas grandes y separan, bolsa por bolsa, el cartón, el vidrio y el plástico que otros botaron. La cooperativa nació en 2016, cuando cinco de ellas decidieron dejar de vender por separado a los intermediarios y juntar el material para venderlo directamente a las empresas.',
      'El cambio se notó en el precio. Un kilo de cartón que el intermediario les pagaba a 250 pesos, la empresa se lo compra hoy a 400. «No es que trabajemos menos», aclara Luz Dary Pérez, la presidenta, «es que ahora nos pagan lo que vale». Con la diferencia compraron una báscula y una prensa para compactar el cartón, que así ocupa menos espacio y se transporta en menos viajes.',
      'Su mayor problema no es el precio sino la mezcla. Una bolsa en la que alguien botó restos de comida con papel echa a perder el papel, que ya no se puede vender. Por eso, desde 2021, las socias dan charlas en los colegios del barrio. Explican que separar en la casa no es un favor que se les hace a ellas: es lo que permite que el material vuelva a usarse.',
      'El ingeniero ambiental Julián Ochoa, que asesora a la cooperativa, calcula que el barrio podría recuperar el doble de material si la mitad de las familias separara sus residuos. Según él, la meta no es imposible: en un barrio vecino, una campaña de seis meses logró que casi cuatro de cada diez hogares separaran.',
      'Las socias no piden caridad. Piden dos cosas concretas: que la gente separe y que la alcaldía les pague por la ruta que recorren, como les paga a las empresas de aseo por recoger la basura. Al fin y al cabo, dicen, ellas hacen la parte del trabajo que nadie ve.',
    ],
  };
  const Q = (q, options, answer, explain, hint) => play('pregunta-examen', 'Pregunta del examen', { doc: RECICLA, q, options, answer }, explain, { hint, kind: 'Comprensión lectora' });
  setExam('pu-explicita', 'Evaluación · Información explícita', [
    ['pu-ie-1', 'Un dato explícito se busca con una palabra clave de la pregunta: una fecha, un nombre, una cifra.',
      Q('Según el texto, la cooperativa Manos Verdes nació en:', ['2021', '2016', '2019', '2010'], 1,
        'El párrafo 1 dice que la cooperativa «nació en 2016». En 2021 empezaron las charlas en los colegios.',
        'Hay dos años en el texto. Busca cuál acompaña al nacimiento de la cooperativa.')],
    ['pu-ie-1', 'A veces la respuesta exige juntar dos datos del mismo párrafo.',
      Q('De acuerdo con el párrafo 2, por cada kilo de cartón las socias reciben hoy, frente a lo que les pagaba el intermediario:', ['150 pesos más', '250 pesos más', '400 pesos más', 'lo mismo'], 0,
        'El intermediario pagaba 250 pesos y la empresa paga 400: la diferencia es de 150 pesos.',
        'El texto da dos precios. La pregunta pide la diferencia entre ellos.')],
    ['pu-ie-2', 'Parafrasear es decir lo mismo con otras palabras, sin agregar ni quitar.',
      Q('La frase de Luz Dary «es que ahora nos pagan lo que vale» puede expresarse como:', ['Ahora trabajan menos horas', 'Ahora reciben un precio justo por el material', 'Ahora venden más material que antes', 'Ahora ya no necesitan a las empresas'], 1,
        'Que les paguen «lo que vale» es recibir un precio justo. Ella misma aclara que no trabajan menos, y la frase no habla de cantidades ni de dejar a las empresas.',
        'Lee la frase completa de Luz Dary: empieza aclarando lo que no cambió.')],
    ['pu-ie-2', 'Una paráfrasis fiel conserva la condición: «si pasa A, entonces B».',
      Q('Según el ingeniero Ochoa, si la mitad de las familias separara sus residuos:', ['todas las familias acabarían separando', 'la cooperativa no necesitaría a la alcaldía', 'el precio del cartón subiría', 'el barrio recuperaría el doble de material'], 3,
        'Ochoa calcula que el barrio «podría recuperar el doble de material» con esa condición. Las demás opciones no aparecen.',
        'Busca la frase de Ochoa que empieza con un cálculo y termina con una condición.')],
    ['pu-ie-3', 'La respuesta correcta está escrita en el texto; lo que solo parece razonable no cuenta.',
      Q('De acuerdo con el texto, es correcto afirmar que:', ['Las socias ganan más que las empresas de aseo', 'Reciclar vidrio es más rentable que reciclar cartón', 'El papel mezclado con restos de comida ya no se puede vender', 'La alcaldía ya les paga por su ruta'], 2,
        'El párrafo 3 lo dice: la comida «echa a perder el papel, que ya no se puede vender». Las ganancias y la rentabilidad no se comparan, y el pago de la alcaldía es algo que las socias piden, no que tengan.',
        'Para cada opción, busca la frase que la respalde. Ojo con lo que se pide frente a lo que ya se tiene.')],
    ['pu-ie-3', 'En una pregunta EXCEPTO, cada opción se verifica contra el texto; la que no está es la respuesta.',
      Q('Según el párrafo 2, gracias a la diferencia de precio las socias lograron todo lo siguiente, EXCEPTO:', ['Comprar una báscula', 'Comprar una prensa', 'Transportar el cartón en menos viajes', 'Contratar a un conductor'], 3,
        'La báscula, la prensa y los menos viajes están en el párrafo 2. Nadie habla de un conductor.',
        'Vuelve al final del párrafo 2 y marca lo que compraron y para qué sirvió.')],
    ['pu-ie-4', 'Antes de responder, se identifica de quién es cada idea: verbos como «calcula», «según él», «aclara».',
      Q('La idea de que el barrio podría recuperar el doble de material es de:', ['Luz Dary Pérez', 'El autor del texto', 'Julián Ochoa', 'Las once socias'], 2,
        'El párrafo 4 dice que el ingeniero Julián Ochoa «calcula» que el barrio podría recuperar el doble.',
        'Busca el verbo que introduce ese cálculo y a quién acompaña.')],
    ['pu-ie-4', 'Las ideas de un grupo también son una voz: «explican», «dicen», «piden».',
      Q('En el texto, quienes sostienen que separar en la casa no es un favor para las recicladoras son:', ['El ingeniero ambiental y la alcaldía', 'Las socias, en sus charlas en los colegios', 'Los intermediarios', 'Las empresas que compran el cartón'], 1,
        'En el párrafo 3, las socias dan charlas en los colegios y «explican» que separar no es un favor que se les hace a ellas.',
        'Ubica la frase «no es un favor» y mira quién la explica y dónde.')],
  ]);
});
