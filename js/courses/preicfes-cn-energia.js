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
