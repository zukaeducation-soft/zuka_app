// Preicfes · Sociales y Ciudadanas · mundo 4 «Fuentes y Argumentos» (spec 2026-11-25-preicfes-estructura). Fuentes inventadas para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const CARTA = {
    id: 'icf-carta-tren', title: 'Una carta, un mapa y un recibo',
    ficha: { autor: 'Taller de historia local', fuente: 'Cuaderno de una casa de la cultura', fecha: 'Marzo de 2026' },
    paras: [
      'En el desván de una casa de Puerto Sereno apareció una caja con tres papeles. El primero es una carta de 1926 en la que Clementina Rojas le cuenta a su hermana la llegada del tren: «Trajeron música y discursos. El gobernador dijo que desde hoy seremos ricos. Yo vi bajar a los peones por el lado donde no había música». El segundo es un mapa de la compañía del ferrocarril. El tercero, un recibo por la venta de un lote.',
      'Los tres son fuentes primarias: se hicieron en la época de los hechos, por gente que los vivió. Un libro escrito hoy sobre ese tren sería una fuente secundaria, porque estudia el pasado a partir de otras fuentes. Que una fuente sea primaria no la vuelve verdadera; la vuelve cercana. Clementina estuvo allí, pero miró desde un lugar.',
      'Para leerla hay que ponerla en su contexto. En aquellos años, el país recibió una indemnización por la pérdida de Panamá y muchos préstamos de bancos extranjeros. Con ese dinero se construyeron vías férreas y puertos para sacar el café. Los discursos de riqueza no eran una ocurrencia del gobernador: los repetían los periódicos de medio país.',
      'También hay que preguntar quién escribe, para quién y con qué fin. Clementina le escribe a su hermana, en privado; no tiene que quedar bien con nadie. El mapa, en cambio, lo hizo la compañía para atraer compradores: dibuja calles que nunca existieron. El recibo no opina. Solo dice que un campesino vendió por doce pesos un lote que, según otro papel, la compañía revendió por noventa al año siguiente.',
      'Ninguno de los tres cuenta la historia completa. La carta muestra que no todos celebraron; el mapa, lo que se prometía; el recibo, quién ganó. Juntos dicen más que cada uno por separado, y además se corrigen: lo que el mapa promete, el recibo lo desmiente.',
      'La caja no tiene la voz de los peones. No sabían escribir o nadie guardó lo que escribieron. Ese silencio también es un dato. Un buen lector de fuentes no solo pregunta qué dicen los papeles, sino quién falta en ellos.',
    ],
  };
  const l1 = leccion('icf-sc-fuentes-1', 'Leer una fuente en su contexto', guion(
    ['Primaria o secundaria', 'Primaria: de la época, de quien lo vivió. Secundaria: un estudio posterior.'],
    ['Quién, para quién, para qué', 'Una carta privada y un aviso comercial no se leen igual.'],
    ['El contexto', 'Qué pasaba entonces en la economía, la política o la cultura.'],
    ['El silencio', 'También importa quién no aparece.']), [
    x('genero-o-cita', '¿Es fuente **primaria** o **secundaria** sobre el tren de 1926?', { doc: CARTA, rot: ['primaria', 'secundaria'],
      ...F(['La carta de Clementina', 0, '¿Es de la época y de quien lo vivió?'], ['Un libro de historia escrito hoy', 1, '¿Es de la época o la estudia después?'], ['El mapa de la compañía', 0, '¿Es de la época?'], ['Un documental de este año', 1, '¿Es de la época o la estudia después?'], ['El recibo del lote', 0, '¿Es de la época?']), bien: 'De la época o sobre la época.' },
      'La carta, el mapa y el recibo son de entonces; el libro y el documental estudian ese pasado.', 'Pregunta cuándo se hizo y si quien la hizo estuvo allí.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: CARTA,
      ...F(['presenta los tres papeles', 0, 'Busca la caja.'], ['define los tipos de fuente', 1, 'Busca «primarias» y «secundaria».'], ['da el contexto de la época', 2, 'Busca los préstamos.'], ['pregunta quién y para qué', 3, 'Busca con qué fin se hicieron.'], ['compara lo que aporta cada una', 4, 'Busca «juntos dicen más».'], ['señala quién falta', 5, 'Busca el silencio.'], ['describe un viaje en tren', null, 'Nadie cuenta un viaje.']),
      luz: [[1, 'una caja con tres papeles'], [2, 'fuentes primarias'], [3, 'ponerla en su contexto'], [4, 'quién escribe'], [5, 'Juntos dicen más'], [6, 'Ese silencio']], bien: 'Papeles, tipos, contexto, propósito, comparación y silencio.' },
      'El texto enseña a leer una fuente paso a paso, con tres papeles de ejemplo.', 'Lee el comienzo de cada párrafo y di qué pregunta responde.'),
    x('voz-de-la-fuente', 'Ata cada propósito a su fuente.', { ayuda: 'Tira un hilo desde cada propósito hasta su fuente.', doc: CARTA, portadas: [['La carta', 'fuente'], ['El mapa', 'fuente'], ['El recibo', 'fuente'], ['Un libro actual', 'fuente']],
      ...T(['contarle algo a alguien querido', 0, '¿Cuál es privada?'], ['atraer compradores', 1, '¿Cuál dibuja calles que no existieron?'], ['dejar constancia de una venta', 2, '¿Cuál no opina?'], ['explicar el pasado con otras fuentes', 3, '¿Cuál se hace mucho después?']), bien: 'Contar, vender, constar y explicar.' },
      'La carta cuenta en privado, el mapa vende, el recibo deja constancia y el libro explica.', 'Pregunta qué ganaba cada autor con su documento.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CARTA, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Las fuentes se corrigen unas a otras.',
      ...T(['Toda fuente primaria es verdadera.', 2, 'Busca qué la vuelve ser primaria.'], ['El mapa muestra las calles reales.', 6, 'Busca qué dibuja la compañía.'], ['Con la carta basta para saberlo todo.', 9, 'Busca si alguno cuenta la historia completa.']), bien: 'Cercana no es verdadera.' },
      'Ser primaria la vuelve cercana, el mapa dibuja calles que no existieron y ninguno cuenta todo.', 'Saca la palabra clave: verdadera, calles, todo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CARTA, nums: [1, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El lote se vendió por doce pesos.', 0, 'Léela junto a lo que dice el recibo.'], ['La compañía ganó mucho con la reventa.', 1, 'Compara doce con noventa.'], ['Clementina desconfiaba de los discursos.', 1, '¿Qué vio ella mientras sonaba la música?'], ['Los peones hicieron una huelga.', 2, '¿Alguna oración la nombra?']),
      luz: [[4, 'vendió por doce pesos'], [1, 'por el lado donde no había música']], bien: 'Una imagen puede ser una crítica.' },
      'Los doce pesos están escritos; la ganancia y la desconfianza se deducen; la huelga no aparece.', 'Compara los números y piensa qué contrasta la carta.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica que esos discursos eran **propios de la época**, no solo del gobernador.', { doc: CARTA, nums: [3], apuesta: 'La idea de riqueza circulaba en todo el país.', ...S(['3.3'], { '3.0': 'Dice qué hay que hacer con la fuente.', '3.1': 'Da el origen del dinero.', '3.2': 'Dice en qué se gastó el dinero.' }), bien: 'Eso es poner una fuente en contexto.' },
      'La última oración dice que los repetían los periódicos de medio país.', 'Busca la oración que compara al gobernador con otros.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: CARTA, texto: '|La carta| se escribió en privado y |el mapa|, para vender. Este dibuja calles que no existieron; aquella no tiene que quedar bien con |nadie|.',
      ...T(['«Este»', 1, 'Pon en su lugar lo que ataste: ¿qué dibuja calles?'], ['«aquella»', 0, 'Pon en su lugar lo que ataste: ¿cuál es privada?']), bien: 'Este, el cercano; aquella, la lejana.' },
      'El que dibuja es el mapa; la que no tiene que quedar bien es la carta.', 'Comprueba con lo que cada documento hace.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CARTA, lineas: ['Una fuente primaria es cercana, no siempre verdadera.', 'La caja estaba en un desván.', 'Hay que preguntar quién, para quién y para qué.', 'El contexto ayuda a entenderla.', 'La hermana recibió la carta.', 'También importa quién no aparece.'], ...S([1, 4], { 0: 'Es la idea sobre el tipo de fuente.', 2: 'Es la pregunta por el propósito.', 3: 'Es el contexto.', 5: 'Es el silencio.' }), bien: 'Tipo, propósito, contexto y silencio.' },
      'El desván y la hermana son del caso; lo demás sirve para leer cualquier fuente.', 'Deja lo que usarías para leer otro documento.'),
  ]);

  const CIFRA = {
    id: 'icf-cifras-colegio', title: '¿Subió o bajó la violencia?',
    ficha: { autor: 'Equipo de periodismo de datos', fuente: 'Portal de verificación', fecha: 'Abril de 2026' },
    paras: [
      'Dos candidatos a la alcaldía de una misma ciudad publicaron, el mismo día, dos frases opuestas. «Los robos bajaron 20 %», dijo uno. «La inseguridad está peor que nunca», dijo la otra. Ambos citaron una fuente. Ninguno mintió en el dato que citó. ¿Cómo es posible?',
      'El primero usó las denuncias que recibe la Policía: pasaron de 5 000 a 4 000 en un año. Es una fuente oficial, completa y fácil de comparar. Pero solo cuenta lo que se denuncia. Ese año cerraron dos estaciones y denunciar por internet exigía llenar once páginas. Puede que hubiera menos robos; puede que hubiera menos denuncias. Con esa fuente sola es imposible distinguir una cosa de la otra.',
      'La segunda usó una encuesta: siete de cada diez personas dijeron sentirse inseguras. Las encuestas captan lo que no se denuncia, pero preguntan por una sensación, y la sensación cambia con las noticias. Además, esta se hizo por teléfono fijo, un aparato que ya casi solo conservan los mayores. Nadie preguntó a los jóvenes, que usan el transporte de noche, ni a quienes viven en arriendo.',
      'Una tercera fuente, menos citada, ayuda a decidir: las atenciones por heridas en robos en los hospitales. No dependen de que alguien quiera denunciar ni de cómo se sienta. Subieron 4 %. No sirven para contar robos sin heridos, que son la mayoría, pero indican que una caída del 20 % es poco probable.',
      'De esto no se concluye que las cifras no sirvan. Se concluye que cada fuente prueba unas cosas y no otras. Las denuncias prueban cuánto se denuncia; la encuesta, cómo se siente un grupo; los hospitales, los robos con heridos. Usar una para afirmar lo que no mide es un argumento débil, aunque el número sea exacto.',
      'Lo honesto habría sido decir: «Se denuncia menos, la gente se siente insegura y los robos con heridos subieron un poco; no sabemos si hubo más o menos robos». No cabe en un afiche. Pero gobernar no es hacer afiches, y votar bien exige preguntar de dónde sale cada número.',
    ],
  };
  const l2 = leccion('icf-sc-fuentes-2', 'Qué prueba y qué no una fuente', guion(
    ['Cada fuente mide algo', 'Las denuncias miden lo denunciado; una encuesta, lo que la gente dice.'],
    ['Límites', 'Toda fuente deja algo por fuera: hay que decirlo.'],
    ['Comparar', 'Dos fuentes independientes que coinciden pesan más.'],
    ['No decir de más', 'Un dato exacto puede sostener una conclusión equivocada.']), [
    x('voz-de-la-fuente', 'Ata cada cosa a la fuente que la puede probar.', { ayuda: 'Tira un hilo desde cada cosa hasta su fuente.', doc: CIFRA, portadas: [['Denuncias', 'fuente'], ['Encuesta', 'fuente'], ['Hospitales', 'fuente']],
      ...T(['Cuánta gente acudió a la Policía', 0, '¿Cuál cuenta lo que se reporta?'], ['Cuánta gente dice sentirse insegura', 1, '¿Cuál pregunta por una sensación?'], ['Cuántos robos dejaron heridos', 2, '¿Cuál atiende heridas?']), bien: 'Reportar, sentir y atender.' },
      'La Policía cuenta denuncias, la encuesta sensaciones y los hospitales, heridos.', 'Pregunta qué cosas se cuentan en cada lugar.'),
    x('genero-o-cita', '¿La conclusión **sale** de su fuente o **dice de más**?', { doc: CIFRA, rot: ['sale de la fuente', 'dice de más'],
      ...F(['Se recibieron 1 000 denuncias menos', 0, '¿Es justo lo que se contó?'], ['Hubo 20 % menos robos', 1, '¿Las denuncias cuentan todos los robos?'], ['Siete de cada diez encuestados se sienten inseguros', 0, '¿Es justo lo que se preguntó?'], ['La ciudad es más peligrosa que nunca', 1, '¿La encuesta compara con todos los años?']), bien: 'Contar no es lo mismo que concluir.' },
      'Las denuncias y las respuestas se contaron; los robos totales y el «nunca» van más allá.', 'Compara cada conclusión con lo que la fuente mide de verdad.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: CIFRA,
      ...F(['¿Por qué pudo bajar la cifra de denuncias?', 1, 'Busca el comienzo que nombra a la Policía.'], ['¿A quiénes se llamó en la encuesta?', 2, 'Busca el comienzo que nombra la encuesta.'], ['¿Qué habría sido honesto decir?', 5, 'Busca el comienzo que habla de honestidad.']),
      luz: [[2, 'cerraron dos estaciones'], [3, 'por teléfono fijo'], [6, 'Lo honesto habría sido']], bien: 'Policía, encuesta y honestidad.' },
      'Las denuncias están en el 2, la encuesta en el 3 y lo honesto en el 6.', 'Busca en los comienzos la fuente o la palabra clave.'),
    x('balanza-tesis', 'Tesis: «los robos bajaron 20 %». ¿Qué hace cada dato?', { doc: CIFRA, tesis: 'Los robos bajaron 20 %',
      ...F(['Las denuncias bajaron de 5 000 a 4 000.', 0, '¿La apoya o la pone en duda?'], ['Cerraron dos estaciones donde se denunciaba.', 1, '¿Podría explicar la baja de otra manera?'], ['Las heridas por robo subieron 4 %.', 1, '¿Va en la misma dirección que la tesis?'], ['El afiche era amarillo.', 2, '¿Eso mide cuántos robos hubo?']), bien: 'Otra explicación y otra fuente la debilitan.' },
      'Las denuncias la apoyan; el cierre ofrece otra causa y los hospitales van al contrario; el afiche no pesa.', 'Supón cierto cada dato: ¿creerías más o menos en la caída?'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CIFRA, filas: [{ antes: 'Los candidatos, en el dato que citaron,', topes: ['mintieron', 'no mintieron', 'copiaron mal'], va: 1 }, { antes: 'Los hospitales cuentan', topes: ['todos los robos', 'ningún robo', 'robos con heridos'], va: 2 }, { antes: 'De los robos totales', topes: ['no se sabe', 'bajaron', 'subieron'], va: 0 }], mira: ['Relee el final del párrafo 1.', 'Relee para qué no sirven en el párrafo 4.', 'Relee la frase honesta del párrafo 6.'], luz: [[1, 'Ninguno mintió'], [5, 'los robos con heridos'], [6, 'no sabemos si hubo más o menos robos']], bien: 'Dato exacto, conclusión dudosa.' },
      'Ninguno mintió en el dato, los hospitales cuentan robos con heridos y del total no se sabe.', 'Busca la oración exacta que pone el límite.'),
    x('pinta-tipos', 'Pinta cada límite con su fuente.', { doc: CIFRA, plumas: ['denuncias', 'encuesta', 'hospitales'],
      ...P(['Deja por fuera lo que nadie reporta.', 0, '¿A cuál le falta lo que no se cuenta a la Policía?'], ['Depende de cómo se siente la gente.', 1, '¿A cuál la mueven las noticias?'], ['No ve los robos sin golpes.', 2, '¿A cuál llegan solo los lastimados?'], ['Llamó casi solo a personas mayores.', 1, '¿Cuál usó teléfono fijo?'], ['Baja si denunciar se vuelve difícil.', 0, '¿Cuál depende de un trámite?']), bien: 'Toda fuente tiene su límite.' },
      'Lo no reportado y el trámite limitan las denuncias; la sensación y el teléfono, la encuesta; los golpes, los hospitales.', 'Pregunta qué casos se le escapan a cada fuente.'),
    x('bisagras', 'Pon en cada hueco la palabra que une. Sobran dos.', { doc: CIFRA, pares: [['Es una fuente oficial y completa.', 'solo cuenta lo que se denuncia.'], ['No dependen de que alguien denuncie;', 'sirven para comparar.'], ['La sensación cambia', 'las noticias la mueven.']],
      ...F(['Pero', 0, 'Limita: ¿dónde se reconoce algo y luego se le pone un tope?'], ['por eso', 1, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['porque', 2, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['Es decir,', null, 'Repetiría lo mismo: ninguna pareja repite.'], ['para que', null, 'Anunciaría un propósito: aquí nadie lo busca.']), bien: 'Tope, resultado y causa.' },
      'A la fuente se le pone un tope, su independencia trae una utilidad y las noticias explican la sensación.', 'Di qué hace la segunda idea: limita, resulta o explica.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: CIFRA, lineas: ['Dos candidatos usan datos ciertos para decir lo contrario.', 'Había once páginas.', 'Cada fuente mide una cosa y deja otra por fuera.', 'Comparar fuentes ayuda a decidir.', 'El teléfono era fijo.', 'Concluir más de lo que se mide es un argumento débil.'], ...S([1, 4], { 0: 'Es el problema.', 2: 'Es la idea central.', 3: 'Es lo que hace la tercera fuente.', 5: 'Es la conclusión.' }), bien: 'Problema, idea, comparación y conclusión.' },
      'Las páginas y el teléfono son detalles; lo demás sirve para evaluar cualquier cifra.', 'Deja lo que ayudaría a revisar otra noticia.'),
  ]);

  const DISCURSO = {
    id: 'icf-dibujo', title: 'El dibujo del balcón',
    ficha: { autor: 'Curso de medios y sociedad', fuente: 'Guía de lectura crítica de imágenes', fecha: 'Mayo de 2026' },
    paras: [
      'La caricatura apareció en un periódico regional el día en que el gobierno anunció que bajaría el precio de la gasolina. En ella, un funcionario sonriente lanza desde un balcón un billete diminuto atado a un globo. Abajo, una multitud salta para alcanzarlo. Detrás del balcón se ve una habitación llena de bolsas marcadas con la palabra «impuestos». Al pie dice: «¡Cójanlo entre todos!».',
      'Una caricatura es un argumento con dibujos. No busca informar, sino hacer ver. Para eso exagera: el billete no es pequeño, es ridículo; la multitud no es grande, es inmensa. Con esa desproporción, el dibujante opina que el alivio es mínimo frente a lo que la gente paga.',
      'También usa símbolos. El balcón es el poder, que está arriba y lejos. El globo recuerda las promesas, que se inflan y se van. La frase es irónica: suena generosa y dice lo contrario. Quien no conozca el anuncio sobre la gasolina verá una escena graciosa, pero no entenderá de qué se ríe: sin contexto no hay caricatura.',
      'Ese mismo día, el funcionario pronunció un discurso. Dijo: «Hoy empieza una nueva era. Los que nos critican son los de siempre, los que nunca han hecho nada por este país. El pueblo sabe quién está con él». El discurso también es un argumento, aunque no tenga dibujos. Promete una era, divide el mundo entre «los de siempre» y «el pueblo», y en lugar de responder a una crítica descalifica a quienes la hacen.',
      'Ni la caricatura ni el discurso son neutrales, y no tienen por qué serlo. La pregunta no es si opinan, sino cómo. El dibujante exagera un dato que se puede revisar: cuánto baja el precio y cuánto se paga en impuestos. El funcionario no da ninguno. Uno invita a comparar; el otro, a escoger un bando.',
      'Leer imágenes y discursos exige las mismas preguntas: ¿qué muestra?, ¿qué exagera?, ¿a quién deja mal parado?, ¿qué tendría que ser cierto para que tenga razón? Quien las hace no deja de reírse ni de emocionarse. Solo lo hace sabiendo por qué.',
    ],
  };
  const l3 = leccion('icf-sc-fuentes-3', 'Caricaturas y discursos', guion(
    ['Exagerar para opinar', 'Una caricatura agranda o encoge lo que quiere criticar.'],
    ['Símbolos', 'Un balcón puede ser el poder; un globo, una promesa.'],
    ['Ironía', 'Dice una cosa para que se entienda la contraria.'],
    ['Discursos', 'Mira qué promete, a quién divide y si responde con razones o ataca a la persona.']), [
    x('voz-de-la-fuente', 'Ata cada idea al elemento que la representa.', { ayuda: 'Tira un hilo desde cada idea hasta el elemento del dibujo.', doc: DISCURSO, portadas: [['El balcón', 'elemento'], ['El globo', 'elemento'], ['El billete diminuto', 'elemento'], ['Las bolsas', 'elemento']],
      ...T(['el poder, lejos de la gente', 0, '¿Qué está arriba?'], ['las promesas que se van', 1, '¿Qué se infla?'], ['un alivio mínimo', 2, '¿Qué es ridículamente pequeño?'], ['lo que la gente paga', 3, '¿Qué está detrás y marcado?']), bien: 'Cada objeto opina.' },
      'El balcón es el poder, el globo la promesa, el billete el alivio y las bolsas, los impuestos.', 'Pregunta qué tiene de particular cada objeto: su lugar, su tamaño o su rótulo.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: DISCURSO,
      ...F(['describe el dibujo', 0, 'Busca lo que se ve.'], ['explica la exageración', 1, 'Busca la desproporción.'], ['explica símbolos e ironía', 2, 'Busca el globo y la frase.'], ['analiza un discurso', 3, 'Busca lo que dijo el funcionario.'], ['compara los dos', 4, 'Busca «Ni… ni…».'], ['deja preguntas para leer', 5, 'Busca los signos de interrogación.'], ['cuenta la vida del dibujante', null, 'No se cuenta su vida.']),
      luz: [[1, 'un funcionario sonriente'], [2, 'exagera'], [3, 'usa símbolos'], [4, 'pronunció un discurso'], [5, 'Ni la caricatura ni el discurso'], [6, '¿qué exagera?']], bien: 'Describir, exagerar, simbolizar, analizar, comparar y preguntar.' },
      'El texto describe el dibujo, explica sus recursos, analiza el discurso, los compara y deja preguntas.', 'Di qué hace cada párrafo con el dibujo o el discurso.'),
    x('genero-o-cita', '¿El discurso **responde con razones** o **descalifica** a la persona?', { doc: DISCURSO, rot: ['da razones', 'descalifica'],
      ...F(['Los que critican son los de siempre', 1, '¿Responde a la crítica o habla de quien la hace?'], ['El precio baja doscientos pesos por galón', 0, '¿Da un dato o habla de alguien?'], ['Nunca han hecho nada por el país', 1, '¿Responde a la crítica o habla de quien la hace?'], ['El costo se cubrirá con otro ahorro', 0, '¿Explica algo o habla de alguien?']), bien: 'Contestar la idea o atacar a quien la dice.' },
      'El precio y el costo son razones; «los de siempre» y «nunca han hecho nada» atacan a las personas.', 'Pregunta si la frase habla del tema o de quien opina.'),
    x('pinta-tipos', 'Pinta cada parte con el recurso que usa.', { doc: DISCURSO, plumas: ['exageración', 'símbolo', 'ironía'],
      ...P(['Una multitud inmensa tras un billete.', 0, '¿Agranda, representa otra cosa o dice lo contrario?'], ['Un globo que se va por el aire.', 1, '¿Agranda, representa otra cosa o dice lo contrario?'], ['«¡Cójanlo entre todos!»', 2, '¿Agranda, representa otra cosa o dice lo contrario?'], ['Un balcón muy arriba.', 1, '¿Agranda, representa otra cosa o dice lo contrario?']), bien: 'Tamaño, objeto y frase.' },
      'La multitud exagera, el globo y el balcón simbolizan y la frase generosa es irónica.', 'Mira si cambia el tamaño, si el objeto significa algo más o si la frase se burla.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: DISCURSO, nums: [3, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Sin contexto no se entiende la caricatura.', 0, 'Léela junto al final del párrafo 3.'], ['El discurso busca que la gente tome partido.', 1, '¿A qué invita, según la comparación?'], ['El dibujante fue despedido.', 2, '¿Se dice qué pasó con él?'], ['La caricatura se apoya en algo comprobable.', 1, '¿Qué se puede revisar de ella?']),
      luz: [[3, 'sin contexto no hay caricatura'], [5, 'un dato que se puede revisar'], [5, 'a escoger un bando']], bien: 'Opinar con algo que se pueda revisar.' },
      'El contexto está escrito; que busque bandos y que sea comprobable se deducen; el despido se inventa.', 'Junta lo que se dice de cada uno en el párrafo 5.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 2 la oración que dice **qué opina** el dibujante.', { doc: DISCURSO, nums: [2], apuesta: 'El alivio es muy poco frente a lo que se paga.', ...S(['2.3'], { '2.0': 'Define qué es una caricatura.', '2.1': 'Dice qué busca una caricatura.', '2.2': 'Muestra cómo exagera.' }), bien: 'La desproporción opina.' },
      'La última oración une la desproporción con la opinión: el alivio es mínimo.', 'Busca la oración que pasa de lo que se ve a lo que piensa el autor.'),
    x('balanza-tesis', 'Lo que opina la caricatura: el alivio es mínimo. ¿Qué hace cada dato?', { doc: DISCURSO, tesis: 'El alivio es mínimo frente a lo que se paga',
      ...F(['La gasolina bajó 1 % y los impuestos son el 30 %.', 0, '¿Es poco o mucho?'], ['Con la baja, el pasaje de bus se redujo a la mitad.', 1, '¿El alivio fue pequeño?'], ['El dibujo es en blanco y negro.', 2, '¿Cambia el alivio?']), bien: 'Se revisa con datos.' },
      'Un 1 % apoya; que el pasaje bajara a la mitad debilita; el color no pesa.', 'Compara el tamaño del alivio con lo que se paga.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: DISCURSO, lineas: ['Una caricatura opina exagerando y con símbolos.', 'El periódico era regional.', 'La ironía dice lo contrario.', 'Un discurso puede descalificar en vez de responder.', 'El funcionario sonríe.', 'Conviene preguntar qué tendría que ser cierto.'], ...S([1, 4], { 0: 'Es la idea sobre la caricatura.', 2: 'Es otro recurso.', 3: 'Es la idea sobre el discurso.', 5: 'Es la pregunta para leerlos.' }), bien: 'Recursos, discurso y pregunta.' },
      'El periódico y la sonrisa son detalles; lo demás sirve para cualquier caricatura o discurso.', 'Deja lo que usarías para leer otra imagen.'),
  ]);

  const PLAZA = {
    id: 'icf-fuentes-mina', title: 'Tres voces sobre una mina',
    paras: [
      'En 1974 abrió una mina de carbón en el municipio de Las Lajas y en 2001 cerró. Un grupo de estudiantes reunió fuentes para contar qué cambió en el pueblo. La primera fue un folleto de la empresa, impreso en 1975: «Llegó el progreso. Cada familia tendrá empleo, escuela y hospital». Lo acompañan fotos a color de niños con uniforme nuevo.',
      'La segunda fue una entrevista a Hermelinda Ortiz, de ochenta y un años, hecha este año. Recuerda que hubo empleo para los hombres, que su marido murió de los pulmones a los cuarenta y cuatro y que el hospital «fue un consultorio con una cama». También dijo que nunca volvió a ver el pueblo tan alegre como en aquellos años.',
      'La tercera fue un libro publicado en 2010 por una economista. Con archivos de la alcaldía muestra que los ingresos del municipio se multiplicaron por seis, que la mitad de los obreros venía de otras regiones y que, dos años después del cierre, la población se había reducido a la tercera parte.',
      'Los estudiantes pegaron además una caricatura de 1980, sacada de un periódico sindical: un hombre gordo, con el casco de la empresa, sopla un pastel que dice «cinco años»; los invitados, de cara tiznada, tosen en lugar de cantar.',
      'En clase discutieron cuál fuente era «la verdadera». Una estudiante sostuvo que el libro, porque trae cifras. Otro, que la entrevista, porque la señora lo vivió. La profesora preguntó qué podía probar cada una y qué no. Hicieron una tabla. El folleto probaba lo que la empresa quería que se creyera; la entrevista, cómo lo vivió una mujer; el libro, cómo cambiaron las cuentas y la población; la caricatura, qué reclamaban los obreros.',
      'Al final escribieron un texto de una página. La última línea decía: «La mina trajo dinero y se llevó gente; según a quién se le pregunte, fue las dos cosas o solo una de ellas».',
    ],
  };
  const Q = preg(PLAZA, 'sociales');
  return mundo('icf-sc-fuentes', 'Fuentes y Argumentos', 'sociales', [l1, l2, l3], [
    ['icf-sc-fuentes-1', 'Secundaria: estudia el pasado a partir de otras fuentes.', Q('De las fuentes reunidas, es secundaria:', ['El folleto de 1975', 'La caricatura de 1980', 'El libro de 2010', 'Ninguna de ellas'], 2, 'El libro estudia lo ocurrido con archivos; el folleto y la caricatura son de la época.', '¿Cuál se hizo después, a partir de otros documentos?')],
    ['icf-sc-fuentes-1', 'Pregunta quién hizo la fuente y para qué.', Q('El folleto de la empresa debe leerse con cuidado principalmente porque:', ['Tiene fotos a color', 'Su propósito era mostrar el proyecto de forma favorable', 'Es muy antiguo', 'No habla de niños'], 1, 'La empresa quería que se creyera en el progreso que prometía.', 'Piensa qué ganaba la empresa con el folleto.')],
    ['icf-sc-fuentes-2', 'Cada fuente prueba unas cosas y no otras.', Q('El libro de la economista NO permite saber:', ['Cómo cambiaron los ingresos del municipio', 'De dónde venían los obreros', 'Cuánto se redujo la población', 'Cómo se sintió una familia al perder a alguien'], 3, 'El libro trabaja con cuentas y población; lo vivido por una familia lo da la entrevista.', 'Busca la opción que no se puede contar con archivos.')],
    ['icf-sc-fuentes-2', 'Un solo testimonio no permite generalizar.', Q('A partir de la entrevista, sería un error concluir que:', ['El marido de Hermelinda murió joven', 'Todas las familias del pueblo lo vivieron igual', 'Hermelinda recuerda alegría y pérdida', 'El hospital prometido fue pequeño, según ella'], 1, 'Es la voz de una persona: no prueba lo que vivieron todas.', 'Cuidado con la palabra «todas».')],
    ['icf-sc-fuentes-3', 'La caricatura opina con contraste y exageración.', Q('En la caricatura, que los invitados tosan en lugar de cantar critica:', ['La falta de música en las fiestas', 'El daño a la salud de los obreros mientras la empresa celebra', 'El precio de los pasteles', 'La edad de los invitados'], 1, 'Las caras tiznadas y la tos señalan el daño de la mina; la empresa celebra su aniversario.', 'Une la tos, las caras tiznadas y el pastel.')],
    ['icf-sc-fuentes-3', 'Un texto que reúne voces no las borra: las muestra.', Q('La última línea del texto de los estudiantes expresa que:', ['La mina fue mala para todos', 'La mina fue buena para todos', 'La valoración depende de la perspectiva de cada fuente', 'No se puede saber nada del pasado'], 2, '«Según a quién se le pregunte»: las fuentes miran desde lugares distintos.', 'Fíjate en la expresión «según a quién».')],
  ]);
})());
