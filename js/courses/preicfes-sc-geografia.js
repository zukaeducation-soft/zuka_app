// Preicfes · Sociales y Ciudadanas · mundo 8 «Territorio y Ambiente» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REGIONES = {
    id: 'icf-regiones', title: 'Un país en seis pedazos que se tocan',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Febrero de 2026' },
    paras: [
      'Colombia suele dividirse en seis regiones naturales: Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular. La división mira el relieve, el clima y la vegetación. No es una reja: hay municipios con un pie en cada lado, y la gente, los ríos y las mercancías las cruzan todos los días.',
      'La cordillera de los Andes entra por el sur y se abre en tres ramales. Por eso, cerca de la línea del ecuador, el clima depende sobre todo de la altura: cada mil metros que se suben, la temperatura baja unos seis grados. En un viaje de dos horas se pasa del plátano al frailejón. En la Andina vive la mayor parte de la población, aunque ocupa cerca de la cuarta parte del territorio.',
      'La Amazonía y la Orinoquía, juntas, son más de la mitad del país y tienen menos de una décima parte de sus habitantes. El Pacífico es uno de los lugares más lluviosos del mundo; La Guajira, en el Caribe, es casi un desierto. La densidad de población, que es el número de habitantes por kilómetro cuadrado, cambia muchísimo de un lugar a otro.',
      'Un mapa no muestra todo: escoge. El mapa político muestra límites; el físico, montañas y ríos; el temático, un solo asunto, como las lluvias o el desempleo. La escala dice cuánto se redujo la realidad. En un mapa 1 : 1 000 000, un centímetro son diez kilómetros. Con una escala más grande, por ejemplo 1 : 10 000, cabe menos territorio y se ven más detalles.',
      'La población también se mueve. A mediados del siglo XX, la mayoría de los colombianos vivía en el campo; hoy, unas tres de cada cuatro personas viven en ciudades. Unos migraron buscando trabajo o estudio; muchos otros huyeron de la violencia. Las ciudades crecieron rápido y sin plan, y en sus bordes surgieron barrios levantados por sus propios habitantes.',
      'Además, la población envejece. Las familias tienen menos hijos y la gente vive más años. En las pirámides de población, la base se encoge y la parte alta se ensancha. Eso obliga a pensar en más cuidados y pensiones, y en menos salones de primaria. Un dibujo de barras puede anunciar, con veinte años de ventaja, lo que una sociedad va a necesitar.',
    ],
  };
  const l1 = leccion('icf-sc-geografia-1', 'Regiones, mapas y población', guion(
    ['Seis regiones', 'Caribe, Pacífica, Andina, Orinoquía, Amazonía e Insular.'],
    ['Altura y clima', 'Cerca del ecuador, la temperatura depende de la altura.'],
    ['Mapas', 'Político, físico, temático; y la escala.'],
    ['Población', 'Densidad, migración del campo a la ciudad y envejecimiento.']), [
    x('pinta-tipos', 'Pinta cada dato con su región.', { doc: REGIONES, plumas: ['Andina', 'Caribe', 'Pacífica'],
      ...P(['Vive la mayor parte de la población.', 0, 'Busca qué región concentra la gente.'], ['Tiene un lugar casi desértico.', 1, 'Busca dónde está La Guajira.'], ['Es de los lugares más lluviosos.', 2, 'Busca el que casi siempre se moja.'], ['La cruzan tres ramales de cordillera.', 0, 'Busca dónde se abren los Andes.']), bien: 'Gente, desierto y lluvia.' },
      'La Andina concentra gente y cordilleras, el Caribe tiene La Guajira y el Pacífico, la lluvia.', 'Busca el nombre de la región junto a cada dato.'),
    x('pista-tipo', 'Ata cada necesidad al mapa que la resuelve.', { doc: REGIONES, lineas: ['mapa político', 'mapa físico', 'mapa temático', 'mapa a escala 1 : 10 000'],
      ...T(['ver los límites de un departamento', 0, '¿Cuál muestra límites?'], ['ver montañas y ríos', 1, '¿Cuál muestra el relieve?'], ['ver dónde llueve más', 2, '¿Cuál muestra un solo asunto?'], ['ver las calles de un barrio', 3, '¿Cuál deja ver más detalles?']), bien: 'Cada mapa escoge.' },
      'Límites en el político, relieve en el físico, lluvias en el temático y detalle en la escala grande.', 'Piensa qué elige mostrar cada uno de esos mapas.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: REGIONES, filas: [{ antes: 'Al subir mil metros, la temperatura', topes: ['sube seis grados', 'no cambia', 'baja unos seis grados'], va: 2 }, { antes: 'En 1 : 1 000 000, un centímetro son', topes: ['un kilómetro', 'diez kilómetros', 'mil kilómetros'], va: 1 }, { antes: 'Hoy viven en ciudades', topes: ['tres de cada cuatro', 'uno de cada cuatro', 'todos'], va: 0 }], mira: ['Relee lo que pasa con la altura.', 'Relee el ejemplo de la escala.', 'Relee cómo se movió la población.'], luz: [[2, 'baja unos seis grados'], [4, 'diez kilómetros'], [5, 'tres de cada cuatro']], bien: 'Baja, diez y tres de cuatro.' },
      'Baja unos seis grados, un centímetro son diez kilómetros y tres de cada cuatro viven en ciudades.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REGIONES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Andina ocupa cerca de la cuarta parte del territorio.', 0, 'Léela junto al párrafo 2.'], ['La densidad de la Amazonía es baja.', 1, 'Compara su tamaño con sus habitantes.'], ['A 2 000 metros hace unos doce grados menos que al nivel del mar.', 1, 'Multiplica lo que baja por cada mil metros.'], ['En la Amazonía no hay ciudades.', 2, '¿Tener poca gente es no tener ciudades?']),
      luz: [[2, 'la cuarta parte'], [3, 'menos de una décima parte'], [2, 'unos seis grados']], bien: 'Comparar y multiplicar.' },
      'La cuarta parte está escrita; la densidad y los doce grados se deducen; lo de las ciudades no.', 'Haz la comparación o la cuenta con los datos.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REGIONES, nums: [1, 4, 6], pregunta: 'Queda en pie', queda: 'La población del país envejece.',
      ...T(['Las regiones son fronteras que nadie cruza.', 2, 'Busca qué dice que no es.'], ['Un buen mapa muestra todo.', 3, 'Busca qué hace un mapa.'], ['Las familias tienen cada vez más hijos.', [9, 10], 'Busca qué pasa con los hijos.']), bien: 'No es reja, escoge y menos hijos.' },
      'La división no es una reja, un mapa escoge y las familias tienen menos hijos.', 'Saca la palabra clave: fronteras, todo, hijos.'),
    x('genero-o-cita', '¿Es una migración **por decisión** o **forzada**?', { doc: REGIONES, rot: ['por decisión', 'forzada'],
      ...F(['Se fue a estudiar a Cali', 0, '¿Podía quedarse?'], ['Huyó de un grupo armado', 1, '¿Podía quedarse?'], ['Buscó un mejor empleo', 0, '¿Podía quedarse?'], ['Una amenaza la sacó de su finca', 1, '¿Podía quedarse?']), bien: 'Elegir o huir.' },
      'Estudio y empleo son decisiones; el grupo armado y la amenaza obligan.', 'Pregunta si la persona podía quedarse sin peligro.'),
    x('balanza-tesis', 'Idea: «esta ciudad necesitará más cuidado para mayores». ¿Qué hace cada dato?', { doc: REGIONES, tesis: 'Necesitará más cuidado para mayores',
      ...F(['La parte alta de su pirámide se ensancha.', 0, '¿Qué edades están arriba?'], ['Llegan miles de familias jóvenes con bebés.', 1, '¿Hacia qué edades crece?'], ['Su escudo tiene un cóndor.', 2, '¿Habla de edades?']), bien: 'La pirámide anuncia.' },
      'Ensancharse arriba la apoya; familias jóvenes la debilitan; el escudo no pesa.', 'Piensa qué edades de la población crecen con cada dato.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REGIONES, lineas: ['El país se divide en seis regiones que se cruzan.', 'El frailejón crece arriba.', 'La altura y la lluvia cambian mucho entre lugares.', 'Los mapas escogen qué mostrar.', 'Hay barrios en los bordes.', 'La población se concentra, se mueve y envejece.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es el contraste natural.', 3: 'Es la idea sobre los mapas.', 5: 'Es la idea sobre la población.' }), bien: 'Regiones, contrastes, mapas y población.' },
      'El frailejón y los bordes son detalles; lo demás resume.', 'Deja lo que sirve para explicar el país en general.'),
  ]);

  const PARAMO = {
    id: 'icf-paramo-agua', title: 'El agua que nace en la neblina',
    ficha: { autor: 'Cuaderno de geografía', fuente: 'Colección «Territorios»', fecha: 'Marzo de 2026' },
    paras: [
      'Los recursos naturales se dividen en renovables, como el agua, el bosque o el viento, que pueden recuperarse si se usan con medida, y no renovables, como el petróleo o el carbón, que tardan millones de años en formarse. Que algo sea renovable no quiere decir que sea infinito: un bosque talado más rápido de lo que crece se acaba igual.',
      'Los páramos son un buen ejemplo. Están por encima de los tres mil metros, más o menos, y casi la mitad de los que hay en el mundo está en Colombia. Sus plantas atrapan la neblina y sus suelos la guardan como una esponja. De allí viene buena parte del agua que toman las ciudades. Un frailejón crece alrededor de un centímetro al año: si se arranca uno de dos metros, se arrancan dos siglos.',
      'En los páramos también vive gente, muchas veces desde antes de que existieran las leyes que los protegen. Siembran papa, tienen vacas, abren caminos. Prohibirles todo de un día para otro los deja sin sustento; permitirles todo seca el agua de millones. Por eso la ley habla de reconversión: ayudarlos a cambiar, poco a poco, a actividades que no dañen el suelo.',
      'El desarrollo sostenible busca satisfacer las necesidades de hoy sin quitarles a las generaciones futuras la posibilidad de satisfacer las suyas. Tiene tres patas: la económica, la social y la ambiental. Si una falla, la mesa se cae. Una mina que da empleo y envenena un río cojea; una reserva que protege un río y expulsa a sus habitantes, también.',
      'El cambio climático lo complica todo. La quema de combustibles y la tala aumentan los gases que retienen calor en la atmósfera. Colombia emite una parte pequeña del total mundial, pero es muy vulnerable: hay glaciares que se derriten, costas que se inundan, sequías y lluvias más fuertes. En el país, la mayor fuente de esas emisiones no son las fábricas: es la deforestación y el uso de la tierra.',
      'Las decisiones sobre el territorio nunca son solo técnicas. Alguien gana y alguien pierde, y no siempre quien pierde está sentado a la mesa. La consulta previa, las audiencias públicas y los planes de ordenamiento existen para que se oiga a los que viven allí. Un mapa con todos los recursos marcados y ninguna casa dibujada es un mapa peligroso.',
    ],
  };
  const l2 = leccion('icf-sc-geografia-2', 'Recursos, ambiente y desarrollo', guion(
    ['Renovables y no', 'Renovable no es infinito: depende de la velocidad a la que se use.'],
    ['Páramos', 'Fábricas de agua donde también vive gente.'],
    ['Sostenible', 'Tres patas: económica, social y ambiental.'],
    ['Clima y decisiones', 'Emitimos poco, somos vulnerables y la deforestación pesa mucho.']), [
    x('genero-o-cita', '¿Es un recurso **renovable** o **no renovable**?', { doc: PARAMO, rot: ['renovable', 'no renovable'],
      ...F(['El viento', 0, '¿Se recupera pronto?'], ['El carbón', 1, '¿Se recupera pronto?'], ['Un bosque', 0, '¿Se recupera pronto?'], ['El petróleo', 1, '¿Se recupera pronto?'], ['El agua', 0, '¿Se recupera pronto?']), bien: 'Años o millones de años.' },
      'Viento, bosque y agua se recuperan; carbón y petróleo tardan millones de años.', 'Pregunta cuánto tarda en volver a formarse.'),
    x('pinta-tipos', 'Pinta cada efecto con la pata del desarrollo que toca.', { doc: PARAMO, plumas: ['económica', 'social', 'ambiental'],
      ...P(['Se crean empleos.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se envenena un río.', 2, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se expulsa a una comunidad.', 1, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Aumentan las ventas.', 0, '¿Habla de dinero, de la gente o de la naturaleza?'], ['Se recupera el suelo.', 2, '¿Habla de dinero, de la gente o de la naturaleza?']), bien: 'Dinero, gente y naturaleza.' },
      'Empleos y ventas son económicos; la comunidad, social; río y suelo, ambientales.', 'Di quién o qué gana o pierde con cada efecto.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PARAMO, nums: [1, 3, 5], pregunta: 'Queda en pie', queda: 'El páramo se puede proteger sin expulsar a su gente.',
      ...T(['Lo renovable nunca se acaba.', 1, 'Busca qué pasa si se usa muy rápido.'], ['En los páramos no vive nadie.', 2, 'Busca quién vive allí.'], ['Lo que más emite el país son las fábricas.', 9, 'Busca la mayor fuente.']), bien: 'Se acaba, vive gente y deforestación.' },
      'Un bosque talado muy rápido se acaba, en los páramos vive gente y la mayor fuente es la deforestación.', 'Saca la palabra clave: nunca, nadie, fábricas.'),
    x('voz-de-la-fuente', 'Ata cada preocupación a quien la tendría.', { ayuda: 'Tira un hilo desde cada preocupación hasta quien la tendría.', doc: PARAMO, portadas: [['Campesina del páramo', 'actor'], ['Acueducto de la ciudad', 'actor'], ['Empresa minera', 'actor'], ['Comunidad consultada', 'actor']],
      ...T(['perder su siembra de papa', 0, '¿Quién vive de la tierra?'], ['que disminuya el agua', 1, '¿Quién la lleva a las casas?'], ['no poder extraer', 2, '¿Quién busca minerales?'], ['que no se oiga su voz', 3, '¿Para quién existe la consulta?']), bien: 'Cada actor, su interés.' },
      'La campesina teme por su siembra, el acueducto por el agua, la empresa por extraer y la comunidad por ser oída.', 'Piensa qué perdería cada uno si se decide sin él.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: PARAMO, frases: [[3, 'la ley habla de ', 'reconversión', ''], [5, 'es muy ', 'vulnerable', ''], [4, 'envenena un río ', 'cojea', '']],
      ...F(['cambio gradual de actividad', 0, '¿Qué busca la ley con los campesinos?'], ['fácil de afectar', 1, '¿Qué le pasa al país con el clima?'], ['está incompleta', 2, '¿Qué le falta a esa mesa?'], ['expulsión', null, 'Es lo contrario de lo que busca la ley.'], ['muy fuerte', null, 'Es lo contrario de lo que le pasa.']), bien: 'El contexto las explica.' },
      'Reconversión es cambiar poco a poco, vulnerable es fácil de afectar y cojear es estar incompleta.', 'Lee el ejemplo que da el texto alrededor.'),
    x('balanza-tesis', 'Propuesta: «prohibir toda siembra en el páramo desde mañana». ¿Qué hace cada dato?', { doc: PARAMO, tesis: 'Prohibir toda siembra desde mañana',
      ...F(['El ganado y la siembra secan el suelo que guarda agua.', 0, '¿Es una razón a favor?'], ['Trescientas familias viven solo de esa siembra.', 1, '¿A quién deja sin sustento?'], ['Donde se ayudó a cambiar, el agua se recuperó sin expulsar a nadie.', 1, '¿Hacía falta prohibir de golpe?'], ['Las papas son amarillas.', 2, '¿Cambia la decisión?']), bien: 'Proteger sí, ¿de golpe?' },
      'El suelo la apoya; las familias y el cambio gradual la debilitan; el color no pesa.', 'Pregunta si el dato hace más o menos conveniente prohibir ya.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 4 la oración que **define** el desarrollo sostenible.', { doc: PARAMO, nums: [4], apuesta: 'Hoy sí, sin quitarle a mañana.', ...S(['4.0'], { '4.1': 'Dice cuáles son sus partes.', '4.2': 'Dice qué pasa si falta una.', '4.3': 'Da ejemplos que cojean.' }), bien: 'Necesidades de hoy y de mañana.' },
      'La primera oración lo define: satisfacer lo de hoy sin quitarles a las generaciones futuras.', 'Busca la oración que dice qué es lo que busca.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: PARAMO, lineas: ['Renovable no significa infinito.', 'La neblina es blanca.', 'Los páramos dan agua y allí vive gente.', 'Lo sostenible cuida economía, sociedad y ambiente.', 'Hay vacas.', 'Las decisiones deben oír a quienes viven en el territorio.'], ...S([1, 4], { 0: 'Es la primera idea.', 2: 'Es el ejemplo central.', 3: 'Es el concepto.', 5: 'Es el cierre.' }), bien: 'Recursos, páramo, sostenible y voces.' },
      'La neblina blanca y las vacas son detalles; lo demás resume.', 'Deja lo que usarías para evaluar otro proyecto.'),
  ]);

  const PUERTO = {
    id: 'icf-puerto', title: 'El puerto de Bahía Mangle',
    paras: [
      'Bahía Mangle es un municipio de ocho mil habitantes en una costa de manglares. Dos de cada tres adultos viven de la pesca o de sacar piangua, un molusco que crece entre las raíces. Un mapa físico muestra allí una entrada honda y tranquila, ideal para barcos grandes. Un mapa de biodiversidad muestra, en el mismo punto, el criadero de peces más importante de la zona.',
      'En 2023 una empresa propuso construir un puerto. Ofreció seiscientos empleos durante la obra y noventa después. El gobierno nacional apoyó la idea: las mercancías del interior ahorrarían once horas de camino. El alcalde también, porque los impuestos alcanzarían para el hospital que el pueblo pide desde hace veinte años.',
      'El consejo comunitario pidió la consulta previa a la que tiene derecho. En las reuniones, los jóvenes se dividieron. «Yo no quiero sacar piangua toda la vida», dijo uno. «Y yo no quiero pedirle permiso a una empresa para entrar a mi playa», contestó otra. Las mujeres piangueras llevaron un mapa hecho por ellas, con los sitios donde trabajan, los caminos de agua y los nombres que les dieron sus abuelas. Ninguno aparecía en los planos de la empresa.',
      'Los estudios ambientales calcularon que se perdería un tercio del manglar. La empresa ofreció sembrar el doble en otra bahía, a sesenta kilómetros. Una bióloga advirtió que un manglar tarda unos quince años en volver a ser criadero y que, además, frena las olas en las tormentas, cada vez más fuertes.',
      'Después de un año acordaron un muelle más pequeño, en una punta sin manglar, aunque menos honda. Entrarán barcos medianos. Serán menos empleos, pero con cupos y formación para gente del municipio. El mapa de las piangueras quedó pegado al acuerdo como documento oficial: es el primero de la región en el que los lugares llevan los nombres que usa quien los camina.',
    ],
  };
  const Q = preg(PUERTO, 'sociales');
  return mundo('icf-sc-geografia', 'Territorio y Ambiente', 'sociales', [l1, l2], [
    ['icf-sc-geografia-1', 'Un mapa temático muestra un solo asunto.', Q('El mapa de biodiversidad y el físico muestran cosas distintas del mismo punto porque:', ['Uno está equivocado', 'Cada mapa escoge qué representar', 'Son de países distintos', 'Tienen el mismo tema'], 1, 'Uno muestra la profundidad y otro, el criadero: cada uno escoge.', 'Relee qué se ve en cada mapa en el párrafo 1.')],
    ['icf-sc-geografia-1', 'Un mapa puede dejar por fuera a la gente.', Q('El mapa de las piangueras es importante porque:', ['Es más bonito', 'Está a una escala menor', 'Muestra usos y nombres que los planos de la empresa no incluían', 'Fue hecho por el gobierno'], 2, 'Ninguno de esos sitios aparecía en los planos de la empresa.', 'Relee el final del párrafo 3 del texto.')],
    ['icf-sc-geografia-1', 'La población y su trabajo dependen del territorio.', Q('El dato de que dos de cada tres adultos viven de la pesca o la piangua permite deducir que:', ['El puerto afectaría el sustento de la mayoría', 'Nadie quiere el puerto', 'El municipio es muy rico', 'Todos son pescadores'], 0, 'Si el manglar se pierde, se afecta la actividad de la mayoría.', 'Une ese dato con lo que pasaría con el manglar.')],
    ['icf-sc-geografia-2', 'Sostenible: tres patas.', Q('El acuerdo final se acerca al desarrollo sostenible porque:', ['Elimina el puerto', 'Da el máximo de empleos', 'Busca equilibrar empleo, comunidad y manglar', 'Siembra en otra bahía'], 2, 'Menos empleos pero con formación, sin talar el manglar y con la comunidad.', 'Revisa qué pasa con cada pata.')],
    ['icf-sc-geografia-2', 'Compensar en otro lugar puede no reemplazar.', Q('La advertencia de la bióloga cuestiona la compensación porque:', ['Sembrar es ilegal', 'La otra bahía es más grande', 'Los manglares no existen', 'El daño es aquí y ahora; la recuperación, lejos y en quince años'], 3, 'El manglar nuevo estaría a sesenta kilómetros y tardaría años.', 'Compara dónde y cuándo se pierde y dónde y cuándo se recupera.')],
    ['icf-sc-geografia-2', 'La consulta previa busca oír a quienes viven en el territorio.', Q('La consulta previa permitió en este caso:', ['Que el gobierno decidiera solo', 'Que se prohibiera pescar', 'Que la empresa se fuera del país', 'Que la comunidad aportara información y cambiara el proyecto'], 3, 'Las piangueras llevaron su mapa y el proyecto cambió.', 'Compara el proyecto del comienzo con el acuerdo.')],
  ]);
})());
