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
