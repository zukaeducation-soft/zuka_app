// Preicfes · Sociales y Ciudadanas · mundo 3 «Perspectivas e Intereses» (spec 2026-11-25-preicfes-estructura). Casos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const PLAYA = {
    id: 'icf-mangle', title: 'El manglar de Boca Grande',
    ficha: { autor: 'Grupo de sociales de grado once', fuente: 'Estudio de caso escolar', fecha: 'Marzo de 2026' },
    paras: [
      'Boca Grande es un pueblo de pescadores rodeado de manglar. Hace dos años, una empresa propuso construir un muelle turístico en la zona donde los mangles son más viejos. El proyecto prometía doscientos empleos, y la autoridad ambiental debía decidir si lo autorizaba. El pueblo se dividió, pero no en dos bandos, como suele contarse, sino en muchos más.',
      'Los pescadores se opusieron. Entre las raíces del mangle crecen los peces y los camarones de los que viven; sin ellas, la pesca bajaría en pocos años. Las piangüeras, mujeres que recogen conchas en el barro, compartían el temor, aunque agregaban otro: el muelle pasaría justo por donde trabajan, y nadie les había preguntado.',
      'Los jóvenes estaban repartidos. Muchos querían el muelle, porque estaban cansados de tener que irse a la ciudad para conseguir un sueldo. Otros respondían que los empleos serían para gente de afuera, con estudios de hotelería que allí nadie ofrece. Los dueños de las dos tiendas apoyaban el proyecto, pues esperaban más clientes.',
      'La empresa aseguraba que sembraría diez mangles por cada uno que cortara. La alcaldía, interesada en los impuestos que recibiría, pedía una decisión rápida. Una bióloga explicó que un mangle tarda unos veinte años en cumplir la función de los viejos y que, mientras tanto, la costa quedaría más expuesta al oleaje.',
      'En la reunión pública, una piangüera hizo la pregunta que cambió la discusión: «¿Por qué el muelle tiene que ir ahí?». Nadie había pensado en otra respuesta. Dos kilómetros al sur había una playa sin mangle. La empresa la había descartado porque costaba más llegar; los jóvenes, en cambio, vieron que el camino también daría trabajo.',
      'La autoridad negó el primer sitio y aceptó estudiar el segundo. No todos quedaron contentos: los tenderos lamentaron que los turistas no pasarían por el centro. Pero casi todos reconocieron algo. Cuando solo se pregunta «sí o no», cada quien defiende su posición; cuando se pregunta «para qué», aparecen los intereses, y a veces caben juntos.',
    ],
  };
  const l1 = leccion('icf-sc-perspectivas-1', 'Actores de un conflicto', guion(
    ['Actores', 'En un conflicto hay varios actores: personas, grupos, empresas, autoridades.'],
    ['Posición e interés', 'La posición es lo que piden; el interés, para qué lo piden.'],
    ['Coincidir por razones distintas', 'Dos actores pueden pedir lo mismo por motivos diferentes.'],
    ['Dentro de un grupo', 'No todos los jóvenes ni todos los comerciantes piensan igual.']), [
    x('voz-de-la-fuente', 'Ata cada interés al actor que lo tiene.', { ayuda: 'Tira un hilo desde cada interés hasta su actor.', doc: PLAYA, portadas: [['Los pescadores', 'actor'], ['La alcaldía', 'actor'], ['Los tenderos', 'actor'], ['Jóvenes a favor', 'actor']],
      ...T(['Que siga habiendo peces', 0, '¿Quién vive de lo que crece en las raíces?'], ['Recibir impuestos', 1, '¿Quién cobra por lo que se construye?'], ['Tener más clientes', 2, '¿Quién vende en el centro?'], ['Trabajar sin irse del pueblo', 3, '¿Quién está cansado de irse?']), bien: 'Cada quien, con su para qué.' },
      'Los peces son de los pescadores, los impuestos de la alcaldía, los clientes de los tenderos y el empleo cercano, de los jóvenes.', 'Busca en el texto por qué cada actor apoya o rechaza.'),
    x('genero-o-cita', '¿Es una **posición** (lo que piden) o un **interés** (para qué)?', { doc: PLAYA, rot: ['posición', 'interés'],
      ...F(['No al muelle', 0, '¿Dice qué quieren o para qué?'], ['Conservar el lugar donde trabajan', 1, '¿Dice qué quieren o para qué?'], ['Que se autorice ya', 0, '¿Dice qué quieren o para qué?'], ['Conseguir un sueldo en el pueblo', 1, '¿Dice qué quieren o para qué?']), bien: 'La posición se grita; el interés se pregunta.' },
      '«No al muelle» y «que se autorice» son posiciones; el trabajo y el sueldo son los intereses de fondo.', 'Pregunta «¿para qué?»: si ya lo responde, es un interés.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: PLAYA,
      ...F(['¿Qué temían las mujeres que recogen conchas?', 1, 'Busca el comienzo que habla de oponerse.'], ['¿Qué prometía la empresa sobre los árboles?', 3, 'Busca el comienzo que la nombra.'], ['¿Qué pregunta cambió la discusión?', 4, 'Busca el comienzo de la reunión.']),
      luz: [[2, 'nadie les había preguntado'], [4, 'sembraría diez mangles'], [5, '¿Por qué el muelle tiene que ir ahí?']], bien: 'Opositores, empresa y reunión.' },
      'La oposición abre el 2, la empresa el 4 y la reunión el 5.', 'Busca en los comienzos quién o qué momento se nombra.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: PLAYA, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los jóvenes no piensan todos igual.', 1, 'No está con esas palabras: ¿qué querían unos y qué respondían otros?'], ['Los tenderos esperaban más clientes.', 0, 'Léela junto al final del párrafo 3.'], ['Sembrar diez no repone enseguida lo perdido.', 1, '¿Cuánto tarda un mangle en cumplir su función?'], ['La empresa es extranjera.', 2, '¿Alguna oración dice de dónde es?']),
      luz: [[3, 'esperaban más clientes'], [4, 'unos veinte años']], bien: 'Dentro de un grupo también hay diferencias.' },
      'Los clientes están escritos; la división de los jóvenes y la demora se deducen; el origen de la empresa no está.', 'Junta dos oraciones antes de decidir que algo no está.'),
    x('pinta-voces', 'Pinta cada razón con quien la da.', { doc: PLAYA, plumas: ['a favor del primer sitio', 'en contra'],
      ...P(['Daría empleos en el pueblo.', 0, '¿Con esa razón se acepta o se rechaza?'], ['Bajaría la pesca.', 1, '¿Con esa razón se acepta o se rechaza?'], ['Se recibirían impuestos.', 0, '¿Con esa razón se acepta o se rechaza?'], ['La costa quedaría expuesta al oleaje.', 1, '¿Con esa razón se acepta o se rechaza?'], ['Los empleos serían para gente de afuera.', 1, '¿Con esa razón se acepta o se rechaza?']), bien: 'Razones de dinero, de ambiente y de justicia.' },
      'Empleos e impuestos apoyan; la pesca, el oleaje y los empleos para otros van en contra.', 'Imagina que esa razón es cierta: ¿aceptarías el muelle ahí?'),
    x('balanza-tesis', 'Tesis: el segundo sitio reúne más intereses. ¿Qué hace cada dato?', { doc: PLAYA, tesis: 'El segundo sitio reúne más intereses',
      ...F(['Allí no hay mangle.', 0, '¿Protege lo que pedían los pescadores?'], ['El camino también daría trabajo.', 0, '¿Atiende lo que pedían los jóvenes?'], ['Los turistas no pasarían por el centro.', 1, '¿A quién deja por fuera?'], ['El pueblo se llama Boca Grande.', 2, '¿Cambia los intereses de alguien?']), bien: 'Reúne más, aunque no todos.' },
      'Sin mangle y con trabajo atiende a pescadores y jóvenes; deja por fuera a los tenderos; el nombre no pesa.', 'Mira a qué actor ayuda o perjudica cada dato.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 6 la oración que dice la **enseñanza** del caso.', { doc: PLAYA, nums: [6], apuesta: 'Preguntar «para qué» ayuda a encontrar salidas.', ...S(['6.3'], { '6.0': 'Cuenta qué decidió la autoridad.', '6.1': 'Cuenta quién quedó inconforme.', '6.2': 'Anuncia que hay algo que reconocer, sin decirlo.' }), bien: 'De las posiciones a los intereses.' },
      'La última oración opone «sí o no» a «para qué» y explica por qué a veces los intereses caben juntos.', 'Busca la oración que valdría para cualquier otro conflicto.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PLAYA, lineas: ['Un muelle dividió a un pueblo en muchos actores.', 'El pueblo tiene dos tiendas.', 'Cada actor tenía su interés.', 'Una pregunta abrió otra salida.', 'El otro sitio queda al sur.', 'Los intereses a veces caben juntos.'], ...S([1, 4], { 0: 'Es el conflicto.', 2: 'Es lo que explica las posturas.', 3: 'Es lo que cambió la discusión.', 5: 'Es la enseñanza.' }), bien: 'Conflicto, intereses, pregunta y enseñanza.' },
      'El número de tiendas y el punto cardinal son detalles del caso.', 'Deja lo que serviría para entender otro conflicto.'),
  ]);

  const MARCHA = {
    id: 'icf-vecinos', title: 'La casa de los recién llegados',
    ficha: { autor: 'Laura Benavides, antropóloga', fuente: 'Revista de divulgación social', fecha: 'Abril de 2026' },
    paras: [
      'En el barrio La Esperanza, la junta alquiló una casa vacía para alojar a doce familias que llegaron de otro país. Al mes, alguien pintó en la pared una frase que pedía que se fueran. Yo hacía allí un trabajo de campo y decidí preguntar, casa por casa y sin prisa, qué pensaban los vecinos.',
      'Don Elías me dijo que desde que llegaron hay más robos. Le pregunté si le habían robado. Respondió que no, pero que «esa gente es así». Busqué los datos de la inspección de policía: en los seis meses anteriores hubo catorce denuncias; en los seis siguientes, trece. La afirmación de don Elías no se apoyaba en un hecho. Era un prejuicio: un juicio hecho antes de conocer y aplicado a todo un grupo.',
      'Su vecina, Teresa, pensaba distinto. Ella misma llegó al barrio hace treinta años, desplazada por la violencia, y recuerda que entonces a su familia también la miraban mal. Su experiencia no prueba que los nuevos sean buenos o malos, pero le permite ponerse en su lugar.',
      'El pastor de la iglesia había organizado una colecta. Para él, ayudar es un mandato: en su manera de ver el mundo, el forastero es un enviado. Un comerciante colaboró por otro motivo; calculaba que doce familias son doce clientes. Ambos hicieron lo mismo, movidos por ideas muy diferentes de lo que está bien.',
      'También hablé con Génesis, una de las recién llegadas. Creía que los vecinos no saludaban porque la odiaban. Al contarle que en ese barrio casi nadie saluda antes de las diez, porque todos salen corriendo a trabajar, se rió. También ella había juzgado antes de conocer.',
      'Nadie ve el mundo desde ninguna parte. La edad, la fe, el oficio y lo que cada quien ha vivido forman una cosmovisión, un lente con el que se miran las cosas. El lente no es un defecto: todos lo llevamos. El problema empieza cuando se olvida que está ahí y se confunde con el paisaje.',
    ],
  };
  const l2 = leccion('icf-sc-perspectivas-2', 'Cosmovisiones y prejuicios', guion(
    ['Cosmovisión', 'Es la manera de ver el mundo: fe, oficio, edad, experiencia.'],
    ['Prejuicio', 'Un juicio hecho antes de conocer y aplicado a todo un grupo.'],
    ['Misma acción, otra razón', 'Dos personas pueden ayudar por motivos muy distintos.'],
    ['Comprobar', 'Un prejuicio se detecta al pedir el hecho que lo sostiene.']), [
    x('genero-o-cita', '¿Es un **prejuicio** o una afirmación que se puede **comprobar**?', { doc: MARCHA, rot: ['prejuicio', 'se puede comprobar'],
      ...F(['Esa gente es así', 0, '¿Habla de un hecho o de todo un grupo sin conocerlo?'], ['Hubo trece denuncias en seis meses', 1, '¿Habría un registro para verlo?'], ['Los jóvenes no respetan nada', 0, '¿Habla de un hecho o de todo un grupo?'], ['Llegaron doce familias', 1, '¿Se podría contar?'], ['Los ricos son tacaños', 0, '¿Habla de un hecho o de todo un grupo?']), bien: 'Todo un grupo, sin conocerlo.' },
      'Los prejuicios juzgan a un grupo entero; las denuncias y las familias se pueden contar.', 'Pregunta qué registro o conteo permitiría saber si es cierto.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: MARCHA,
      ...F(['presenta el caso', 0, 'Busca qué pasó en el barrio.'], ['muestra un prejuicio y lo contrasta con datos', 1, 'Busca las denuncias.'], ['muestra a quien se pone en el lugar del otro', 2, 'Busca a la vecina desplazada.'], ['compara dos motivos para ayudar', 3, 'Busca al pastor.'], ['muestra un prejuicio de quien llega', 4, 'Busca a Génesis.'], ['define y concluye', 5, 'Busca «cosmovisión».'], ['narra un robo', null, 'Ningún párrafo cuenta un robo.']),
      luz: [[1, 'doce familias'], [2, 'catorce denuncias'], [3, 'ponerse en su lugar'], [4, 'movidos por ideas muy diferentes'], [5, 'juzgado antes de conocer'], [6, 'una cosmovisión']], bien: 'Caso, prejuicio, empatía, motivos, otro prejuicio y concepto.' },
      'La autora va de persona en persona y al final nombra el concepto que las une.', 'Busca a quién se entrevista en cada párrafo.'),
    x('voz-de-la-fuente', 'Ata cada razón para actuar a quien la tiene.', { ayuda: 'Tira un hilo desde cada razón hasta su dueño.', doc: MARCHA, portadas: [['El pastor', 'vecino'], ['El comerciante', 'vecino'], ['Teresa', 'vecina'], ['Don Elías', 'vecino']],
      ...T(['Ayudar es un deber de fe', 0, '¿Quién ve al forastero como un enviado?'], ['Más familias, más ventas', 1, '¿Quién piensa en clientes?'], ['A mí también me pasó', 2, '¿Quién llegó hace treinta años?'], ['Los de afuera traen problemas', 3, '¿Quién habló de robos sin datos?']), bien: 'Fe, negocio, memoria y temor.' },
      'La fe es del pastor, el cálculo del comerciante, el recuerdo de Teresa y el temor de don Elías.', 'Busca qué experiencia o idea mueve a cada persona.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: MARCHA, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Todos miran con algún lente.',
      ...T(['A don Elías lo habían robado.', 2, 'Busca qué respondió a la pregunta.'], ['El pastor y el comerciante ayudaron por lo mismo.', 9, 'Busca qué los movía.'], ['Solo los vecinos juzgaron antes de conocer.', 13, 'Busca qué se dice de Génesis al final.']), bien: 'Cada opción, su oración.' },
      'A don Elías no lo habían robado, los motivos eran diferentes y Génesis también había juzgado.', 'Lee la oración completa donde aparece cada persona.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: MARCHA, filas: [{ antes: 'Después de la llegada, las denuncias', topes: ['se duplicaron', 'casi no cambiaron', 'desaparecieron'], va: 1 }, { antes: 'Tener una cosmovisión es', topes: ['un defecto', 'un delito', 'algo de todos'], va: 2 }, { antes: 'Un prejuicio se forma', topes: ['antes de conocer', 'después de medir', 'por ley'], va: 0 }], mira: ['Compara catorce y trece.', 'Relee la última parte del párrafo 6.', 'Relee cómo se define en el párrafo 2.'], luz: [[2, 'catorce denuncias; en los seis siguientes, trece'], [6, 'todos lo llevamos'], [2, 'un juicio hecho antes de conocer']], bien: 'Dato, lente y definición.' },
      'De 14 a 13 casi no cambia; todos tienen un lente; el prejuicio es anterior a conocer.', 'Cada perilla tiene su frase exacta en el texto.'),
    x('balanza-tesis', 'Afirmación de don Elías: «desde que llegaron hay más robos». ¿Qué hace cada dato?', { doc: MARCHA, tesis: 'Desde que llegaron hay más robos',
      ...F(['Las denuncias pasaron de 14 a 13.', 1, '¿Hay más o menos?'], ['Se descubrió que muchos robos nuevos no se denunciaron.', 0, '¿Podría haber más de los que se ven?'], ['En todo el municipio bajaron los robos.', 1, '¿Apoya que haya más?'], ['La casa estaba vacía.', 2, '¿Dice algo de los robos?']), bien: 'Un dato nuevo puede obligar a revisar.' },
      'Menos denuncias y menos robos debilitan; robos sin denunciar podrían apoyarla; la casa vacía no pesa.', 'Olvida quién lo dijo: mira si el dato la hace más o menos creíble.'),
    x('tira-referente', 'Ata cada palabra a aquello a lo que apunta.', { doc: MARCHA, texto: '|El lente| no es |un defecto|: |todos| lo llevamos. El problema empieza cuando se olvida que está ahí y se confunde con |el paisaje|.',
      ...T(['el «lo» de «lo llevamos»', 0, 'Pon en su lugar lo que ataste: ¿qué se lleva puesto?'], ['lo que «se olvida que está ahí»', 0, 'Pon en su lugar lo que ataste: ¿qué se olvida?']), bien: 'El lente, las dos veces.' },
      'Lo que todos llevamos y lo que se olvida es lo mismo: el lente con el que se mira.', 'Comprueba si lo que ataste se puede llevar y olvidar.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: MARCHA, lineas: ['Una autora entrevista a un barrio dividido.', 'La frase estaba en la pared.', 'Un prejuicio no se apoya en hechos.', 'La misma acción puede tener motivos distintos.', 'Nadie saluda antes de las diez.', 'Todos miran con un lente y conviene recordarlo.'], ...S([1, 4], { 0: 'Es lo que hace la autora.', 2: 'Es el primer concepto.', 3: 'Es la comparación entre vecinos.', 5: 'Es la conclusión.' }), bien: 'Caso, conceptos y conclusión.' },
      'La pared y la hora del saludo son detalles; lo demás explica prejuicio y cosmovisión.', 'Deja los conceptos y el hilo del caso; quita los detalles.'),
  ]);

  const AGUA = {
    id: 'icf-represa', title: 'El turno del agua',
    ficha: { autor: 'Comité de riego de una vereda', fuente: 'Memoria comunitaria', fecha: 'Mayo de 2026' },
    paras: [
      'Cuando la quebrada baja poca agua, en la vereda El Cedro todos la necesitan al mismo tiempo. Las familias de arriba cultivan fresas; las de abajo crían ganado; en la mitad está la escuela. Durante una sequía, los de arriba cerraron la compuerta para llenar sus tanques, y a los de abajo no les llegó nada en once días.',
      'La primera solución fue de la alcaldía: multar a quien cerrara la compuerta. Nadie la aceptó, ni siquiera quienes la habían pedido. Los de arriba la sintieron como un castigo por cuidar su cosecha; los de abajo dijeron que una multa no da de beber. Además, no había quién vigilara de noche.',
      'La segunda la propuso un ingeniero: construir un reservorio. Resolvía el problema de fondo, pero costaba más de lo que la vereda reúne en diez años y tardaría dos en estar listo. A los de abajo les pareció bien; a los de arriba, también, siempre que no fuera en sus tierras.',
      'La tercera salió de la escuela. Los estudiantes midieron el caudal durante una semana y dibujaron un horario: de noche, los tanques de arriba; al amanecer, la escuela; de día, los bebederos de abajo. No daba a nadie todo lo que pedía. Daba a cada uno lo que necesitaba en la hora en que lo necesitaba, porque las fresas pueden regarse de noche y las vacas no beben a oscuras.',
      'Aceptaron probarlo quince días. Hubo reclamos: una familia de arriba trabajaba en la ciudad y no podía abrir la llave a las diez. Se cambió con un vecino y todo siguió. El comité, formado por dos personas de cada sector, anotaba los incumplimientos en un cuaderno que cualquiera podía leer.',
      'El reservorio sigue siendo necesario, y la vereda ahorra para él. Pero el turno mostró que una solución no se acepta por ser la mejor en el papel, sino porque quienes deben cumplirla ayudaron a hacerla, ven que es justa y pueden comprobar que los demás también la cumplen.',
    ],
  };
  const l3 = leccion('icf-sc-perspectivas-3', 'Soluciones y quién las acepta', guion(
    ['¿A quién ayuda?', 'Cada solución atiende unos intereses y deja otros por fuera.'],
    ['¿Se puede hacer?', 'Una buena idea puede fallar por costo, por tiempo o porque nadie la vigila.'],
    ['¿La aceptan?', 'Se cumple más lo que se construyó entre todos.'],
    ['Corto y largo plazo', 'Un turno ayuda hoy; un reservorio, dentro de dos años.']), [
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: AGUA,
      ...F(['plantea el conflicto', 0, 'Busca lo que pasó en la sequía.'], ['muestra una solución que nadie aceptó', 1, 'Busca la multa.'], ['muestra una buena pero costosa', 2, 'Busca el reservorio.'], ['muestra la que repartió horas', 3, 'Busca a los estudiantes.'], ['cuenta cómo se ajustó', 4, 'Busca los reclamos.'], ['saca la enseñanza', 5, 'Busca por qué se acepta una solución.'], ['describe el sabor de las fresas', null, 'Nadie habla del sabor.']),
      luz: [[1, 'cerraron la compuerta'], [2, 'Nadie la aceptó'], [3, 'costaba más'], [4, 'dibujaron un horario'], [5, 'Hubo reclamos'], [6, 'ayudaron a hacerla']], bien: 'Conflicto, tres soluciones, ajuste y enseñanza.' },
      'El texto presenta el conflicto, prueba tres salidas, cuenta el ajuste y explica por qué una funcionó.', 'Busca «primera», «segunda» y «tercera» en los comienzos.'),
    x('genero-o-cita', '¿La solución se queda corta por **viabilidad** o por **falta de acuerdo**?', { doc: AGUA, rot: ['no es viable aún', 'no hay acuerdo'],
      ...F(['Cuesta lo de diez años', 0, '¿Falta dinero o falta que la acepten?'], ['La sienten como un castigo', 1, '¿Falta dinero o falta que la acepten?'], ['Tardaría dos años', 0, '¿Falta tiempo o falta que la acepten?'], ['No quieren que sea en sus tierras', 1, '¿Falta tiempo o falta que la acepten?']), bien: 'Poder hacerla y querer cumplirla.' },
      'El costo y la demora son de viabilidad; el castigo y las tierras, de acuerdo.', 'Pregunta si con más dinero o tiempo se resolvería.'),
    x('pinta-tipos', 'Pinta cada efecto con la dimensión que toca.', { doc: AGUA, plumas: ['económica', 'ambiental', 'social'],
      ...P(['Se pierde la cosecha de fresas.', 0, '¿Toca el dinero, la naturaleza o la convivencia?'], ['La quebrada se seca aguas abajo.', 1, '¿Toca el dinero, la naturaleza o la convivencia?'], ['Dos sectores dejan de hablarse.', 2, '¿Toca el dinero, la naturaleza o la convivencia?'], ['Construir vale lo de diez años.', 0, '¿Toca el dinero, la naturaleza o la convivencia?'], ['El comité reúne a los dos lados.', 2, '¿Toca el dinero, la naturaleza o la convivencia?']), bien: 'Un conflicto tiene varias dimensiones.' },
      'La cosecha y el costo son económicos, la quebrada es ambiental y el trato entre sectores, social.', 'Di qué se gana o se pierde: plata, naturaleza o relaciones.'),
    x('pasos-del-proceso', 'Ordena lo que pasó en El Cedro. El primer paso está en su puesto.', { que: 'lo que pasó', de: 'Del cierre al turno', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Cerraron la compuerta.', 'La alcaldía propuso multas.', 'Un ingeniero propuso un reservorio.', 'Los estudiantes propusieron turnos.', 'Se ajustaron los turnos tras los reclamos.'], mira: ['', 'Fue la reacción inicial de la autoridad.', 'Llegó después de una idea que nadie aceptó.', 'Salió de la escuela, después de otras dos.', 'Se ajusta lo que ya se está probando.'], bien: 'Cierre, multa, reservorio, turnos y ajuste.' },
      'Tras el cierre vienen tres propuestas en orden y, al probar la última, sus ajustes.', 'Guíate por «primera», «segunda» y «tercera».'),
    x('balanza-tesis', 'Tesis: el horario fue una solución justa. ¿Qué hace cada dato?', { doc: AGUA, tesis: 'El horario fue una solución justa',
      ...F(['Cada sector recibe en la hora que necesita.', 0, '¿Atiende las necesidades de todos?'], ['El cuaderno lo puede leer cualquiera.', 0, '¿Permite comprobar que todos cumplen?'], ['El comité lo formaban solo los de arriba.', 1, 'Si fuera cierto, ¿estarían todos representados?'], ['Se midió durante una semana.', 2, '¿Medir un tiempo lo hace más o menos justo?']), bien: 'Necesidad, control y representación.' },
      'Atender necesidades y poder comprobar apoyan; un comité de un solo lado debilitaría; la semana no decide la justicia.', 'Piensa en lo que haría que un grupo se sintiera excluido.'),
    x('sella-parrafo', '«El horario funcionó por todo esto, **EXCEPTO**:» Ata cada opción.', { doc: AGUA,
      ...T(['Las fresas pueden regarse de noche', 3, 'Busca por qué servía esa hora.'], ['Se permitió cambiar turnos', 4, 'Busca qué hizo la familia de la ciudad.'], ['Quienes lo cumplían ayudaron a hacerlo', 5, 'Busca por qué se acepta una solución.'], ['Había multas altas', 6, 'Las multas se nombran: ¿se aplicaron en el horario?']),
      luz: [[4, 'las fresas pueden regarse de noche'], [5, 'Se cambió con un vecino'], [6, 'ayudaron a hacerla']], bien: 'Las multas fueron de otra propuesta.' },
      'Las multas se propusieron y nadie las aceptó; las otras tres razones están en los párrafos 4, 5 y 6.', 'Mira de qué propuesta habla el texto cuando nombra cada cosa.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: AGUA, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El reservorio tardaría dos años.', 0, 'Léela junto al párrafo 3.'], ['El turno no reemplaza del todo al reservorio.', 1, '¿Por qué la vereda sigue ahorrando?'], ['Cada quien quería la obra lejos de lo suyo.', 2, '¿Eso se dice de todos o solo de los de arriba?'], ['El reservorio sigue siendo necesario.', 0, 'Léela junto al comienzo del párrafo 6.']),
      luz: [[3, 'tardaría dos'], [6, 'sigue siendo necesario']], bien: 'De un sector no se concluye sobre todos.' },
      'Los dos años y la necesidad están escritos; que el turno no baste se deduce; «cada quien» generaliza lo de un sector.', 'Cuidado con palabras como «cada quien» y «todos».'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: AGUA, lineas: ['Una sequía enfrentó a dos sectores.', 'La escuela está en la mitad.', 'La multa no se aceptó y el reservorio costaba mucho.', 'Un horario repartió el agua según la necesidad.', 'Faltó agua once días.', 'Se cumple lo que se construye entre todos.'], ...S([1, 4], { 0: 'Es el conflicto.', 2: 'Son las soluciones que no bastaron.', 3: 'Es la que funcionó.', 5: 'Es la enseñanza.' }), bien: 'Conflicto, intentos, solución y enseñanza.' },
      'La ubicación y los días son detalles; lo demás explica por qué una solución se acepta.', 'Deja lo que ayudaría a resolver otro conflicto.'),
  ]);

  const MERCADO = {
    id: 'icf-plazuela', title: 'La plazuela de las ventas',
    paras: [
      'En la plazuela San Roque trabajan unos noventa vendedores informales. La alcaldía quiere recuperar el espacio para instalar juegos y árboles, y les ofrece trasladarse a un centro comercial popular a ocho cuadras. El anuncio abrió una discusión que ya lleva cuatro meses.',
      'Los vendedores más antiguos rechazan el traslado. Dicen que sus clientes son los pasajeros del paradero y que nadie camina ocho cuadras por un jugo. Los más jóvenes están dispuestos a irse si les garantizan seis meses de arriendo gratis. Las madres del sector quieren los juegos, pero compran a diario en los puestos y temen que los precios suban.',
      'Los comerciantes con local apoyan la recuperación. Argumentan que pagan impuestos y que compiten con quien no los paga. Una líder de los vendedores les respondió que pagar no los hace dueños de la calle y que la informalidad no se escoge por gusto: se cae en ella cuando no hay otro empleo.',
      'Un concejal afirmó en la radio que «los vendedores son los culpables de los atracos». La Policía aclaró que las denuncias han bajado desde que el paradero tiene luz, hace un año, y que no hay registro de vendedores capturados por robo en el sector.',
      'La universidad presentó un estudio con tres alternativas. Trasladar a todos en un mes cuesta menos, pero en otras dos ciudades la mitad volvió a la calle antes del año. Dejar a la mitad, con puestos ordenados y horarios, libera espacio para los juegos. No hacer nada aplaza el problema y aumenta el desorden.',
      'La alcaldía citó una mesa con todos los sectores. La primera sesión terminó en gritos. En la segunda, una moderadora pidió que nadie dijera qué quería, sino para qué lo quería. Escribieron las respuestas en un tablero: trabajar, jugar sin peligro, caminar, vender lo mismo, respetar las reglas. Alguien notó que ninguna era contraria a las otras.',
    ],
  };
  const Q = preg(MERCADO, 'sociales');
  return mundo('icf-sc-perspectivas', 'Perspectivas e Intereses', 'sociales', [l1, l2, l3], [
    ['icf-sc-perspectivas-1', 'Dentro de un mismo grupo puede haber intereses distintos.', Q('Sobre los vendedores, del texto se concluye que:', ['Todos rechazan el traslado', 'Todos quieren irse ya', 'No tienen una sola postura frente al traslado', 'Prefieren pagar impuestos'], 2, 'Los antiguos lo rechazan y los jóvenes lo aceptarían con condiciones.', 'Compara a los antiguos con los jóvenes.')],
    ['icf-sc-perspectivas-1', 'La posición es lo que se pide; el interés, para qué.', Q('La moderadora logró avanzar porque pidió hablar de:', ['Los intereses, en lugar de las posiciones', 'Los precios, en lugar de los juegos', 'La ley, en lugar de la convivencia', 'El pasado, en lugar del futuro'], 0, 'Pidió decir «para qué», no «qué»: los intereses podían convivir.', 'Distingue entre qué se quiere y para qué.')],
    ['icf-sc-perspectivas-2', 'Un prejuicio se detecta al pedir el hecho que lo sostiene.', Q('La frase del concejal expresa un prejuicio porque:', ['La dijo en la radio', 'Culpa a todo un grupo sin un hecho que lo respalde', 'Habla de la plazuela', 'Contradice al alcalde'], 1, 'Generaliza a todos los vendedores, y la Policía no tiene registro que lo apoye.', 'Busca qué datos aclaró la Policía.')],
    ['icf-sc-perspectivas-2', 'La experiencia y el oficio influyen en lo que cada quien considera justo.', Q('Los comerciantes con local y la líder de los vendedores discrepan principalmente sobre:', ['El color de los juegos', 'La cantidad de pasajeros', 'La luz del paradero', 'Qué es justo en el uso de la calle y por qué existe la informalidad'], 3, 'Unos apelan a los impuestos; la otra, a que la calle es de todos y a la falta de empleo.', 'Lee las razones que da cada uno en el párrafo 3.')],
    ['icf-sc-perspectivas-3', 'Una solución se evalúa por sus efectos, no solo por su costo.', Q('Según el estudio, el principal riesgo de trasladar a todos en un mes es que:', ['Cueste más que las otras', 'Muchos vuelvan a la calle', 'No haya árboles', 'Aumente la luz'], 1, 'Cuesta menos, pero en otras ciudades la mitad regresó antes del año.', 'Busca el «pero» del párrafo 5.')],
    ['icf-sc-perspectivas-3', 'Una solución que reúne intereses tiene más probabilidad de aceptarse.', Q('La alternativa que atiende más intereses a la vez es:', ['Trasladar a todos', 'No hacer nada', 'Dejar a la mitad con orden y horarios, y abrir espacio para juegos', 'Cerrar el paradero'], 2, 'Permite vender, jugar y caminar; las otras dejan por fuera a un grupo o aplazan el problema.', 'Compara cada alternativa con la lista del tablero.')],
  ]);
})());
