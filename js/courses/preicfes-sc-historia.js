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
      'Los criollos tenían dinero y estudios, pero no el poder. Leían a los ilustrados franceses y conocían la independencia de Estados Unidos. En 1794, Antonio Nariño tradujo e imprimió los Derechos del Hombre; le costó la cárcel. Cuando en 1808 Napoleón invadió España y puso preso al rey, surgió una pregunta incómoda: si no hay rey, ¿quién manda?',
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
      ...F(['Nariño fue preso por imprimir los Derechos del Hombre.', 0, 'Léela junto a 1794.'], ['Al gobierno le inquietaban esas ideas.', 1, '¿Por qué castigaría una traducción?'], ['La independencia no mejoró de inmediato la vida de todos.', 1, '¿Quiénes siguieron igual?'], ['Nariño viajó con Napoleón.', 2, '¿El texto los une?']),
      luz: [[4, 'le costó la cárcel'], [6, 'La esclavitud duró']], bien: 'El castigo muestra el miedo.' },
      'La cárcel está escrita; la inquietud y la desigualdad que siguió se deducen; el viaje se inventa.', 'Pregunta por qué un gobierno castigaría eso.'),
    x('balanza-tesis', 'Tesis: «la independencia cambió quién gobernaba antes de cambiar cómo se vivía». ¿Qué hace cada dato?', { doc: COLONIA, tesis: 'Cambió quién gobernaba antes de cómo se vivía',
      ...F(['La esclavitud siguió más de treinta años.', 0, '¿Siguió algo de la vida de antes?'], ['Solo votaban hombres con propiedades o renta.', 0, '¿Cambió para la mayoría?'], ['En 1820 se repartió la tierra entre todos.', 1, 'Si fuera cierto, ¿qué diría de la tesis?'], ['El florero era de porcelana.', 2, '¿Habla de la vida o del gobierno?']), bien: 'Cambios y permanencias.' },
      'La esclavitud y el voto restringido la apoyan; un reparto general la debilitaría; el florero no pesa.', 'Supón cierto cada dato y pregunta si la vida cambió pronto.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: COLONIA, frases: [[1, 'legalmente, con la ', 'metrópoli', ''], [3, 'crearon ', 'monopolios', ' como el del tabaco'], [2, 'indígenas que ', 'pleitearon', ' por sus resguardos']],
      ...F(['España', 0, '¿Quién dominaba la colonia?'], ['negocios de un solo vendedor', 1, '¿Quién podía vender el tabaco?'], ['reclamaron ante la ley', 2, '¿Cómo defendieron sus tierras?'], ['ciudad grande', null, 'Aquí se habla de un imperio.'], ['bailaron', null, 'Se trata de defender tierras.']), bien: 'Cada palabra en su época.' },
      'La metrópoli es el país que domina, el monopolio es un solo vendedor y pleitear es reclamar ante la ley.', 'Lee la oración completa y piensa quién manda.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: COLONIA, lineas: ['La sociedad colonial estaba ordenada por origen.', 'El edicto era de papel.', 'Hubo resistencias y reformas que molestaron.', 'La crisis del rey abrió el camino a la independencia.', 'La batalla fue en agosto.', 'La república dejó muchas desigualdades.'], ...S([1, 4], { 0: 'Es el punto de partida.', 2: 'Son causas de fondo.', 3: 'Es el momento clave.', 5: 'Es lo que permaneció.' }), bien: 'Orden, resistencia, crisis y permanencias.' },
      'El papel y el mes son detalles; lo demás explica el proceso.', 'Deja lo que ayuda a entender por qué y qué cambió.'),
  ]);

  const SIGLO = {
    id: 'icf-siglo19', title: 'Un país que se escribía y se borraba',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'Pocos países estrenaron tantas constituciones en un siglo. Entre 1821 y 1886 hubo, por lo menos, ocho textos nacionales. Cada uno cambiaba el nombre del país y, sobre todo, la respuesta a tres preguntas: ¿cuánto poder tiene el gobierno central?, ¿qué lugar ocupa la Iglesia?, ¿quién puede votar?',
      'La primera república unió a la Nueva Granada, Venezuela y Ecuador. Los historiadores la llaman Gran Colombia. Era enorme y sus regiones estaban mal comunicadas; además, Bolívar y Santander tenían ideas distintas sobre cuánto debía mandar el centro. En 1830 se separaron Venezuela y Ecuador, y ese mismo año murió Bolívar en Santa Marta.',
      'A mitad de siglo aparecieron los dos partidos que marcarían la historia. Los conservadores defendían, en general, un Estado central fuerte y a la Iglesia católica como base del orden. Los liberales pedían más libertades, más poder para las regiones y separar a la Iglesia del Estado. Dentro de cada partido había ricos y pobres; muchas veces se era liberal o conservador por la familia o por el pueblo.',
      'Las reformas liberales de mitad de siglo abolieron la esclavitud, expropiaron tierras de la Iglesia y, en 1863, crearon con la Constitución de Rionegro un país federal, los Estados Unidos de Colombia, con nueve estados que tenían ejército propio. Hubo muchas libertades y también muchas guerras locales.',
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
      ...F(['En cada partido había ricos y pobres.', 0, 'Léela junto al párrafo 3.'], ['Dejar por fuera a un partido ayudó a que hubiera guerra.', 1, '¿Qué pasó después de que los liberales quedaran por fuera?'], ['No siempre se escogía partido por las ideas.', 1, '¿Por qué se era liberal o conservador muchas veces?'], ['Panamá se separó por una guerra de religión.', 2, '¿El texto da esa causa?']),
      luz: [[3, 'había ricos y pobres'], [5, 'casi por fuera del gobierno'], [3, 'por la familia o por el pueblo']], bien: 'La familia y el pueblo pesaban.' },
      'Ricos y pobres está escrito; la exclusión y la herencia del partido se deducen; la religión no.', 'Une lo que pasa antes con lo que pasa después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: SIGLO, filas: [{ antes: 'Los conservadores defendían el centro', topes: ['nunca', 'siempre y todos', 'en general'], va: 2 }, { antes: 'Con Rionegro hubo', topes: ['solo paz', 'libertades y guerras locales', 'solo guerra'], va: 1 }, { antes: 'La cifra de muertos de los Mil Días es', topes: ['un cálculo', 'exacta', 'falsa'], va: 0 }], mira: ['Busca las dos palabras que limitan la idea.', 'Relee el final del párrafo 4.', 'Busca «unos» y «según».'], luz: [[3, 'en general'], [4, 'muchas guerras locales'], [5, 'según los cálculos']], bien: 'En general, las dos cosas y un cálculo.' },
      'En general, libertades con guerras locales y una cifra calculada.', 'Busca en el texto la palabra que pone el límite.'),
    x('pasos-del-proceso', 'Ordena el siglo. El primer paso está en su puesto.', { doc: SIGLO, que: 'el siglo', de: 'De la Gran Colombia a Panamá', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Se une la Gran Colombia.', 'Venezuela y Ecuador se separan.', 'Se escribe la de Rionegro.', 'Llega la Regeneración.', 'Guerra de los Mil Días.'], mira: ['', 'Ocurre en 1830.', 'Ocurre en 1863.', 'Ocurre en 1886.', 'Cierra el siglo.'], bien: 'Unión, separación, federal, central y guerra.' },
      'Primero la unión, en 1830 la separación, luego 1863, 1886 y la guerra.', 'Busca los años en el texto y ponlos en fila.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que **contrasta** la política con la vida diaria.', { doc: SIGLO, nums: [6], apuesta: 'Una se escribía en leyes; la otra, en café.', ...S(['6.3'], { '6.0': 'Dice que las dos cosas pasaban a la vez.', '6.1': 'Da un dato de exportación.', '6.2': 'Dice qué llegó con el café.' }), bien: 'La imagen final resume la idea.' },
      'La última oración opone las constituciones a los recibos de café.', 'Busca la oración partida por un punto y coma.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO, lineas: ['El siglo discutió centro, Iglesia y voto.', 'Bolívar murió en Santa Marta.', 'Dos partidos nacieron a mitad de siglo.', 'Se pasó de un país federal a uno central.', 'Rionegro queda en Antioquia.', 'El café transformó la economía.'], ...S([1, 4], { 0: 'Es la idea que organiza el texto.', 2: 'Son los actores.', 3: 'Es el péndulo.', 5: 'Es el cambio económico.' }), bien: 'Preguntas, partidos, péndulo y café.' },
      'Los lugares son detalles; lo demás organiza el siglo.', 'Deja lo que explica los cambios del país.'),
  ]);

  const SIGLO20 = {
    id: 'icf-siglo20', title: 'La paz y sus intentos',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'El siglo XX empezó con ferrocarriles, café y la indemnización por Panamá. En las plantaciones y los pozos petroleros nacieron los sindicatos. En diciembre de 1928, en Ciénaga, el ejército disparó contra trabajadores en huelga de una bananera extranjera. Aún se discute cuántos murieron; nadie discute que marcó al país.',
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
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: SIGLO20, lineas: ['Las huelgas y las reformas abrieron el siglo.', 'Rojas era general.', 'La Violencia llevó a un pacto que excluyó a otros.', 'El conflicto armado golpeó sobre todo a civiles.', 'Ciénaga está en el Magdalena.', 'Hubo varios intentos de paz.'], ...S([1, 4], { 0: 'Es el comienzo.', 2: 'Es el puente entre dos guerras.', 3: 'Es el centro del texto.', 5: 'Es el cierre.' }), bien: 'Comienzo, pacto, conflicto y paz.' },
      'El grado y el lugar son detalles; lo demás es el hilo del siglo.', 'Deja lo que explica cómo se llegó hasta hoy.'),
  ]);

  const VOTO = {
    id: 'icf-voto', title: 'La cédula de doña Carmen',
    paras: [
      'El primero de diciembre de 1957, doña Carmen Arango, de cuarenta y seis años, hizo fila desde las cinco de la mañana. Nunca había votado. Ninguna colombiana lo había hecho en una elección nacional. Ese día se votaba un plebiscito: había que decir sí o no a las reglas del Frente Nacional, el pacto con que liberales y conservadores buscaban salir de la dictadura y de la guerra entre ellos.',
      'El derecho no cayó del cielo. Desde los años treinta, grupos de mujeres habían pedido poder manejar sus bienes, entrar a la universidad y votar. En 1932 una ley permitió a las casadas administrar su propio dinero. En 1954, la asamblea convocada por el gobierno de Rojas Pinilla aprobó el voto femenino, aunque no hubo elecciones en que usarlo mientras él gobernó. Hubo mujeres que lucharon en la prensa, en la radio y en las salas de sus casas; algunas eran liberales, otras conservadoras, otras de ningún partido.',
      'El plebiscito fue aprobado por una mayoría enorme. Votaron más de un millón ochocientas mil mujeres. Entre otras cosas, se confirmó que ellas tendrían los mismos derechos políticos que los hombres. El mismo texto, sin embargo, reservaba los cargos públicos a los dos partidos. Una puerta se abría y otra quedaba cerrada.',
      'Doña Carmen contaba que un hombre de la fila le preguntó por quién le había dicho su marido que votara. Ella le contestó que era viuda y que, además, sabía leer. Guardó la cédula toda la vida en una caja de galletas, junto a las escrituras de la casa.',
      'Su nieta, que hoy estudia historia, encontró la caja. Al lado de la cédula había un recorte de periódico con una caricatura: una señora entra a votar y, detrás, el marido carga al niño y la olla. El dibujante quiso burlarse. La abuela había escrito encima, con esfero azul: «Ojalá».',
    ],
  };
  const Q = preg(VOTO, 'sociales');
  return mundo('icf-sc-historia', 'Historia de Colombia', 'sociales', [l1, l2, l3], [
    ['icf-sc-historia-1', 'Cambiar la ley no siempre cambia de inmediato la vida.', Q('Que en 1954 se aprobara el voto femenino y que solo se usara en 1957 muestra que:', ['La ley fue falsa', 'Un derecho puede reconocerse antes de poder ejercerse', 'Las mujeres no querían votar', 'No existía la cédula'], 1, 'Se aprobó, pero no hubo elecciones en que usarlo hasta entonces.', 'Compara el año de la ley con el de la primera fila.')],
    ['icf-sc-historia-1', 'Los derechos suelen ser resultado de luchas largas.', Q('La expresión «El derecho no cayó del cielo» significa que:', ['Fue resultado de una lucha de años', 'Lo dio la Iglesia', 'Llegó por accidente', 'Nadie lo pidió'], 0, 'El párrafo cuenta lo que pidieron grupos de mujeres desde los años treinta.', 'Lee lo que viene después de esa frase.')],
    ['icf-sc-historia-2', 'Mira qué abre y qué cierra una reforma.', Q('«Una puerta se abría y otra quedaba cerrada» se refiere a que el plebiscito:', ['Abrió escuelas y cerró iglesias', 'Reconoció derechos a las mujeres, pero dejó los cargos a dos partidos', 'Abrió fronteras y cerró puertos', 'Permitió votar solo a los hombres'], 1, 'Confirmó los derechos políticos de ellas y reservó los cargos a liberales y conservadores.', 'Busca las dos cosas que hizo el mismo texto.')],
    ['icf-sc-historia-2', 'Un movimiento puede reunir gente de ideas distintas.', Q('Según el texto, las mujeres que lucharon por el voto:', ['Eran todas liberales', 'Eran todas conservadoras', 'No tenían estudios', 'Tenían posiciones políticas diversas'], 3, 'Unas eran liberales, otras conservadoras y otras de ningún partido.', 'Busca el final del párrafo 2.')],
    ['icf-sc-historia-3', 'El Frente Nacional: un pacto entre dos partidos.', Q('El Frente Nacional buscaba principalmente:', ['Salir de la dictadura y de la guerra entre los dos partidos', 'Separar a Panamá', 'Crear un país federal', 'Abolir la esclavitud'], 0, 'El primer párrafo lo dice: salir de la dictadura y de la guerra entre ellos.', 'Relee el final del primer párrafo.')],
    ['icf-sc-historia-3', 'Una caricatura también es una fuente de su época.', Q('La palabra «Ojalá», escrita sobre la caricatura, muestra que la abuela:', ['No entendió el dibujo', 'Admiraba al dibujante', 'Quería que nadie votara', 'Convirtió la burla en un deseo de mayor igualdad'], 3, 'El dibujante se burlaba de que el hombre cuidara; ella lo desea.', 'Compara lo que quería el dibujante con lo que escribe ella.')],
  ]);
})());
