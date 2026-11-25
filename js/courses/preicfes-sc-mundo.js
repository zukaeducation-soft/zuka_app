// Preicfes · Sociales y Ciudadanas · mundo 7 «Historia del Mundo» (spec 2026-11-25-preicfes-estructura). Textos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, preg, guion } = ICF;

  const REVO = {
    id: 'icf-revoluciones', title: 'Cuando el mundo cambió de máquinas y de dueño',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Febrero de 2026' },
    paras: [
      'A finales del siglo XVIII ocurrieron, casi a la vez, dos clases de revolución. Unas cambiaron quién mandaba; otra cambió cómo se producía. Ninguna fue cosa de un día, y entre todas fabricaron buena parte del mundo en que vivimos.',
      'En 1776, trece colonias inglesas de América del Norte declararon su independencia. Su argumento era nuevo: todos los hombres nacen iguales, los gobiernos existen para proteger derechos y obtienen su poder del consentimiento de los gobernados. En la práctica, ese «todos» no incluía a las mujeres, a los pueblos indígenas ni a las personas esclavizadas.',
      'En Francia, el rey gobernaba con poder absoluto y la sociedad estaba dividida en estamentos. El clero y la nobleza casi no pagaban impuestos; el resto, la inmensa mayoría, sí. En 1789, con las cuentas en quiebra y el pan cada vez más caro, los representantes del pueblo se declararon Asamblea Nacional. En agosto proclamaron los Derechos del Hombre y del Ciudadano. Después vinieron la república, el Terror y, en 1799, Napoleón.',
      'La revolución que más lejos llevó la palabra «libertad» ocurrió en Haití. Allí, en 1791, se rebelaron miles de personas esclavizadas en las plantaciones de azúcar. En 1804 fundaron un país sin esclavos. Francia les cobró después una enorme suma por reconocerlo. Muchas historias olvidan mencionarlo; los dueños de esclavos de toda América, en cambio, no lo olvidaron un solo día.',
      'Mientras tanto, en Inglaterra, la máquina de vapor movía telares y, pronto, trenes y barcos. La Revolución Industrial multiplicó lo que se producía y llenó las ciudades de obreros, entre ellos niños, con jornadas de doce o más horas. Surgieron dos grupos con intereses opuestos: quienes tenían las fábricas y quienes solo tenían su trabajo.',
      'Del choque nacieron los sindicatos, las leyes laborales y nuevas ideas. El liberalismo defendía la propiedad y las libertades individuales; el socialismo, que la riqueza se repartiera. El voto se fue ampliando, despacio: primero algunos propietarios, luego los hombres, mucho más tarde las mujeres. La democracia no fue un regalo de las revoluciones, sino una pelea que ellas dejaron abierta.',
    ],
  };
  const l1 = leccion('icf-sc-mundo-1', 'Revoluciones y democracia', guion(
    ['Dos clases', 'Políticas: quién manda. Industrial: cómo se produce.'],
    ['Derechos para ¿todos?', 'La palabra era universal; la práctica, no.'],
    ['Haití', 'La revolución hecha por personas esclavizadas.'],
    ['Después', 'Sindicatos, leyes, liberalismo, socialismo y un voto que se amplía despacio.']), [
    x('linea-vida', 'Lleva cada hecho a su revolución.', { doc: REVO, rot: ['Estados Unidos', 'Francia', 'Haití'],
      ...F(['Trece colonias se independizan', 0, 'Busca el año 1776.'], ['Se proclaman los Derechos del Hombre', 1, 'Busca el año 1789.'], ['Se funda un país sin esclavos', 2, 'Busca el año 1804.'], ['Gobierna Napoleón', 1, 'Busca el año 1799.']), luz: [[2, 'trece colonias'], [3, 'En agosto proclamaron'], [4, 'un país sin esclavos']], bien: '1776, 1789 y 1804.' },
      'Las colonias en 1776; Derechos y Napoleón en Francia; un país sin esclavos en Haití.', 'Busca en qué párrafo del texto aparece cada hecho.'),
    x('genero-o-cita', '¿Es un cambio **político** o **de la producción**?', { doc: REVO, rot: ['político', 'de la producción'],
      ...F(['El pueblo se declara Asamblea Nacional', 0, '¿Cambia quién manda o cómo se produce?'], ['La máquina de vapor mueve telares', 1, '¿Cambia quién manda o cómo se produce?'], ['Se reconocen derechos del ciudadano', 0, '¿Cambia quién manda o cómo se produce?'], ['Las ciudades se llenan de obreros', 1, '¿Cambia quién manda o cómo se produce?']), bien: 'Mandar y producir.' },
      'La asamblea y los derechos cambian el poder; el vapor y los obreros, la producción.', 'Pregunta si habla de gobierno o de fábricas.'),
    x('pista-tipo', 'Ata cada idea a quien la defendía o la vivía.', { doc: REVO, lineas: ['El gobierno nace del consentimiento.', 'Libertades individuales y propiedad.', 'Que la riqueza se reparta.', 'Un país fundado sin esclavos.'],
      ...T(['colonias de América del Norte', 0, '¿Quién explicó para qué existen los gobiernos?'], ['liberalismo', 1, '¿Cuál defiende al individuo?'], ['socialismo', 2, '¿Cuál defiende repartir?'], ['revolución haitiana', 3, '¿Quiénes eran antes esclavizados?']), bien: 'Cada idea, su origen.' },
      'Consentimiento en Norteamérica, libertades en el liberalismo, reparto en el socialismo y Haití sin esclavos.', 'Relee los párrafos 2, 4 y 6: ahí está cada idea.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REVO, nums: [2, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las colonias se independizaron en 1776.', 0, 'Léela junto al párrafo 2.'], ['Haití asustó a los dueños de esclavos.', 1, '¿Por qué no lo olvidaron un solo día?'], ['La declaración prometía más de lo que cumplió.', 1, '¿A quiénes dejaba por fuera?'], ['Haití le declaró la guerra a Inglaterra.', 2, '¿El texto las une?']),
      luz: [[2, 'En 1776'], [4, 'no lo olvidaron'], [2, 'no incluía']], bien: 'No olvidar puede ser temer.' },
      'El año está escrito; el temor y la promesa incumplida se deducen; la guerra no aparece.', 'Piensa por qué a alguien le importaría tanto Haití.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: REVO, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'El voto se amplió poco a poco.',
      ...T(['En Francia todos pagaban impuestos por igual.', 1, 'Busca quiénes casi no pagaban.'], ['En las fábricas no había niños.', 6, 'Busca quiénes llenaron las ciudades.'], ['La democracia llegó completa con las revoluciones.', [10, 11], 'Busca qué dejaron las revoluciones.']), bien: 'Casi no, entre ellos, pelea abierta.' },
      'El clero y la nobleza casi no pagaban, había niños y la democracia quedó como pelea abierta.', 'Saca la palabra clave: impuestos, niños, completa.'),
    x('balanza-tesis', 'Tesis: «la Revolución francesa tuvo causas económicas». ¿Qué hace cada dato?', { doc: REVO, tesis: 'Tuvo causas económicas',
      ...F(['Las cuentas estaban en quiebra.', 0, '¿Habla de dinero?'], ['El pan estaba cada vez más caro.', 0, '¿Habla de dinero?'], ['Ese año la cosecha fue abundante y barata.', 1, 'Si fuera cierto, ¿quedaría la causa del pan?'], ['El rey usaba peluca.', 2, '¿Cambia la economía?']), bien: 'Quiebra y pan.' },
      'La quiebra y el pan la apoyan; una cosecha barata la debilitaría; la peluca no pesa.', 'Pregunta si el dato tiene que ver con precios o cuentas.'),
    x('bisagras', 'Pon en cada hueco la palabra que une. Sobran dos.', { doc: REVO, pares: [['La palabra era «todos»,', 'muchos quedaban por fuera.'], ['Las jornadas eran larguísimas;', 'nacieron los sindicatos.'], ['El pueblo protestó', 'el pan era muy caro.']],
      ...F(['pero', 0, 'Contrasta: ¿dónde lo segundo no es lo prometido?'], ['por eso', 1, 'Trae el resultado: ¿dónde lo segundo sale de lo primero?'], ['porque', 2, 'Trae la causa: ¿dónde lo segundo explica lo primero?'], ['es decir,', null, 'Repetiría lo mismo: ninguna pareja repite.'], ['para que', null, 'Anunciaría un propósito: aquí nadie lo busca.']), bien: 'Contraste, resultado y causa.' },
      'La promesa contrasta, las jornadas traen sindicatos y el pan explica la protesta.', 'Di qué hace la segunda idea con la primera.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: REVO, lineas: ['Hubo revoluciones políticas y una de la producción.', 'Las colonias eran trece.', 'Proclamaron derechos que no alcanzaban a todos.', 'Haití fundó un país sin esclavos.', 'Los Derechos se proclamaron en agosto.', 'El voto y las leyes laborales llegaron por luchas.'], ...S([1, 4], { 0: 'Es la idea del comienzo.', 2: 'Es la tensión central.', 3: 'Es el caso más radical.', 5: 'Es el cierre.' }), bien: 'Dos clases, límites, Haití y luchas.' },
      'El número y el mes son detalles; lo demás es el hilo.', 'Deja lo que explica qué cambió y para quién.'),
  ]);

  const GUERRA = {
    id: 'icf-guerras', title: 'Treinta años de guerra y cuarenta de miedo',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Marzo de 2026' },
    paras: [
      'A comienzos del siglo XX las potencias europeas competían por colonias, mercados y prestigio, y se habían repartido en dos alianzas. El 28 de junio de 1914 un nacionalista mató en Sarajevo al heredero de Austria-Hungría. En pocas semanas, por el juego de las alianzas, media Europa estaba en guerra. El disparo fue la chispa; la pólvora llevaba años guardada.',
      'La Primera Guerra Mundial duró hasta 1918 y dejó alrededor de diez millones de soldados muertos. En plena guerra, en 1917, una revolución llevó al poder en Rusia a los bolcheviques, que se proponían construir el socialismo. El Tratado de Versalles, en 1919, culpó a Alemania y le impuso pagos enormes. Muchos alemanes lo vivieron como una humillación.',
      'En 1929 quebró la bolsa de Nueva York y la crisis se regó por el mundo. Sin trabajo y con miedo, mucha gente escuchó a quienes ofrecían orden y culpables. En Italia ya gobernaba el fascismo; en 1933 Hitler llegó al poder en Alemania por vías legales y acabó con la democracia. El nazismo convirtió el racismo en política de Estado.',
      'La Segunda Guerra Mundial comenzó en 1939 con la invasión de Polonia. Murieron entre sesenta y ochenta millones de personas, la mayoría civiles. En el Holocausto, el régimen nazi asesinó a unos seis millones de judíos, y también a gitanos, personas con discapacidad, opositores y otros grupos. La guerra terminó en 1945, después de que Estados Unidos lanzara bombas atómicas sobre Hiroshima y Nagasaki.',
      'Ese mismo año se fundó la Organización de las Naciones Unidas y, en 1948, se proclamó la Declaración Universal de los Derechos Humanos. Pero los vencedores se separaron. Estados Unidos, capitalista, y la Unión Soviética, comunista, armaron bloques rivales. Como las dos tenían bombas capaces de destruirlo todo, no se atacaron de frente: fue una guerra «fría».',
      'Fría para ellas. En Corea, Vietnam, Angola o Centroamérica, los bloques apoyaron a bandos distintos y la guerra fue muy caliente. En América Latina, el miedo al comunismo sirvió para justificar golpes militares. El Muro de Berlín, levantado en 1961 para que nadie se fuera del lado oriental, cayó en 1989; dos años después dejó de existir la Unión Soviética.',
    ],
  };
  const l2 = leccion('icf-sc-mundo-2', 'Guerras y Guerra Fría', guion(
    ['1914', 'Alianzas, colonias y nacionalismo: un disparo fue la chispa.'],
    ['Entre guerras', 'Versalles, la crisis del 29, fascismo y nazismo.'],
    ['1939–1945', 'La mayoría de las víctimas, civiles; el Holocausto; las bombas atómicas.'],
    ['Guerra Fría', 'Dos bloques que no se atacan de frente y pelean en otros países.']), [
    x('pasos-del-proceso', 'Ordena los hechos. El primero está en su puesto.', { doc: GUERRA, que: 'los hechos', de: 'De Sarajevo al Muro', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Atentado de Sarajevo.', 'Tratado de Versalles.', 'Crisis de la bolsa.', 'Invasión de Polonia.', 'Cae el Muro de Berlín.'], mira: ['', 'Se firma un año después de la guerra.', 'Ocurre en 1929.', 'Empieza la segunda guerra.', 'Ocurre en 1989.'], bien: '1914, 1919, 1929, 1939 y 1989.' },
      'Sarajevo 1914, Versalles 1919, crisis 1929, Polonia 1939 y el Muro 1989.', 'Busca el año de cada uno y ponlos en fila.'),
    x('genero-o-cita', 'De la Primera Guerra, ¿es **causa de fondo** o **detonante**?', { doc: GUERRA, rot: ['de fondo', 'detonante'],
      ...F(['La competencia por colonias', 0, '¿Venía de años?'], ['El atentado de Sarajevo', 1, '¿Fue lo que disparó todo?'], ['Las dos alianzas', 0, '¿Venía de años?'], ['El afán de prestigio de las potencias', 0, '¿Venía de años?']), bien: 'La pólvora y la chispa.' },
      'Colonias, alianzas y prestigio venían de años; el atentado la disparó.', 'Pregunta si ocurrió ese día o se venía guardando.'),
    x('pista-tipo', 'Ata cada hecho a su consecuencia en el texto.', { doc: GUERRA, lineas: ['El Tratado de Versalles', 'La crisis de 1929', 'La Segunda Guerra', 'El miedo al comunismo'],
      ...T(['humillación en Alemania', 0, '¿Cuál le impuso pagos?'], ['gente que busca orden y culpables', 1, '¿Cuál dejó sin trabajo?'], ['fundación de la ONU', 2, '¿Cuál terminó en 1945?'], ['golpes militares justificados', 3, '¿Cuál se usó en América Latina?']), bien: 'Cada hecho, su efecto.' },
      'Versalles humilló, la crisis dio miedo, la guerra llevó a la ONU y el miedo justificó golpes.', 'Busca qué cuenta el texto justo después de cada hecho.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: GUERRA, nums: [3, 4, 6], pregunta: 'Queda en pie', queda: 'La Guerra Fría fue violenta en varios países.',
      ...T(['Hitler llegó al poder con un golpe militar.', 2, 'Busca por qué vías llegó.'], ['La mayoría de los muertos fueron soldados.', 5, 'Busca quiénes fueron la mayoría.'], ['El Muro se hizo para que no entraran extranjeros.', 11, 'Busca para qué se levantó.']), bien: 'Legales, civiles y salir.' },
      'Llegó por vías legales, la mayoría fueron civiles y el Muro evitaba que se fueran.', 'Saca la palabra clave: Hitler, muertos, Muro.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: GUERRA, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La Declaración Universal es de 1948.', 0, 'Léela junto al párrafo 5.'], ['Las armas atómicas no impidieron otras guerras.', 1, '¿Dónde fue caliente la guerra?'], ['Los derechos humanos fueron en parte una respuesta a la guerra.', 1, '¿Qué había pasado justo antes?'], ['La ONU fue idea de Rusia.', 2, '¿Se dice de quién fue la idea?']),
      luz: [[5, 'en 1948'], [6, 'muy caliente'], [5, 'Ese mismo año']], bien: 'El orden de los hechos ayuda a deducir.' },
      'El año está escrito; las otras guerras y la respuesta al horror se deducen; el autor de la idea no.', 'Une lo que pasó antes con lo que pasó después.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: GUERRA, filas: [{ antes: 'La Guerra Fría fue «fría»', topes: ['en todo el mundo', 'en ninguna parte', 'entre las dos potencias'], va: 2 }, { antes: 'El Holocausto asesinó a', topes: ['solo judíos', 'judíos y también otros grupos', 'solo opositores'], va: 1 }, { antes: 'La Unión Soviética dejó de existir', topes: ['en 1991', 'en 1989', 'en 1961'], va: 0 }], mira: ['Relee dónde fue caliente.', 'Relee a quiénes asesinó.', 'Suma dos años a la caída del Muro.'], luz: [[6, 'Fría para ellas'], [4, 'y también a gitanos'], [6, 'dos años después']], bien: 'Ellas, varios y 1991.' },
      'Fría entre potencias, víctimas de varios grupos y fin en 1991.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('balanza-tesis', 'Tesis: «la crisis económica ayudó al ascenso del nazismo». ¿Qué hace cada dato?', { doc: GUERRA, tesis: 'La crisis ayudó al nazismo',
      ...F(['El voto nazi creció cuando creció el desempleo.', 0, '¿Crecieron a la vez?'], ['El voto nazi ya era mayoría antes de la crisis.', 1, 'Si fuera cierto, ¿habría ayudado la crisis?'], ['Hitler había nacido en Austria.', 2, '¿Habla de la crisis?']), bien: 'El orden en el tiempo importa.' },
      'Crecer con el desempleo la apoya; ser mayoría antes la debilitaría; el lugar de nacimiento no pesa.', 'Pregunta qué ocurrió primero y qué vino después.'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: GUERRA, lineas: ['Las alianzas convirtieron un atentado en guerra mundial.', 'El atentado fue en junio.', 'Versalles y la crisis abonaron el nazismo.', 'La segunda guerra mató sobre todo a civiles.', 'La bolsa estaba en Nueva York.', 'Dos bloques se enfrentaron sin atacarse de frente.'], ...S([4, 1], { 0: 'Es el comienzo.', 2: 'Es el puente entre guerras.', 3: 'Es el centro del texto.', 5: 'Es la Guerra Fría.' }), bien: 'Alianzas, nazismo, civiles y bloques.' },
      'El mes y la ciudad son detalles; lo demás une los hechos.', 'Deja lo que explica por qué pasó lo siguiente.'),
  ]);

  const LIBRES = {
    id: 'icf-descolonizacion', title: 'Los que no esperaron permiso',
    ficha: { autor: 'Cuaderno de historia', fuente: 'Colección «Pasado presente»', fecha: 'Abril de 2026' },
    paras: [
      'En 1945, cerca de un tercio de la población del mundo vivía en territorios gobernados por otro país. Treinta años después, casi todas esas colonias eran Estados independientes. A ese proceso se le llama descolonización. Las potencias europeas habían quedado debilitadas por la guerra, pero eso no basta para explicarlo: había, sobre todo, millones de personas que no pensaban seguir esperando.',
      'La India mostró un camino. Mohandas Gandhi propuso la desobediencia civil no violenta: no pagar impuestos injustos, no comprar telas inglesas, caminar cientos de kilómetros para fabricar sal, cosa que estaba prohibida. En 1947 se logró la independencia. El país nació partido en dos, la India, de mayoría hindú, y Pakistán, de mayoría musulmana; en la partición murieron cientos de miles de personas.',
      'Otros caminos fueron armados. Argelia peleó casi ocho años contra Francia, hasta 1962. En muchos lugares de África, las fronteras que heredaron los nuevos países habían sido trazadas en Europa, con regla, sin preguntar quién vivía a cada lado. Parte de las guerras que vinieron después nació en esas rayas.',
      'En Sudáfrica el problema era otro: una minoría blanca gobernaba el país y, desde 1948, había convertido la segregación en ley. El apartheid decía dónde podía vivir, estudiar o sentarse cada persona según su color. Nelson Mandela pasó veintisiete años preso. En 1994, en las primeras elecciones en que todos pudieron votar, fue elegido presidente.',
      'También dentro de países independientes hubo quienes exigieron que la palabra «todos» se cumpliera. En 1955, en Estados Unidos, Rosa Parks se negó a ceder su puesto en un bus; el boicot que siguió dio a conocer a Martin Luther King. En 1964 y 1965 se aprobaron leyes contra la segregación y a favor del voto. Las mujeres, los estudiantes, los pueblos indígenas y, más tarde, las personas LGBT organizaron sus propios movimientos.',
      'Un movimiento social no es un partido ni un ejército: es gente que se organiza, fuera de las instituciones, para cambiar algo que considera injusto. Sus herramientas son la marcha, el boicot, la huelga, el arte, la ley. Casi nunca gana todo lo que pide. Pero, cuando gana algo, lo que antes parecía imposible empieza a parecer de sentido común.',
    ],
  };
  const l3 = leccion('icf-sc-mundo-3', 'Descolonización y movimientos sociales', guion(
    ['Descolonización', 'En treinta años casi todas las colonias fueron Estados.'],
    ['Dos caminos', 'La no violencia de la India y la guerra de Argelia.'],
    ['Fronteras y apartheid', 'Rayas trazadas en Europa y segregación hecha ley.'],
    ['Movimientos sociales', 'Gente organizada, fuera de las instituciones, para cambiar algo injusto.']), [
    x('pinta-tipos', 'Pinta cada hecho con su lugar.', { doc: LIBRES, plumas: ['India', 'Sudáfrica', 'Estados Unidos'],
      ...P(['Caminar para fabricar sal.', 0, 'Busca quién propuso la no violencia.'], ['Apartheid desde 1948.', 1, 'Busca dónde la segregación fue ley así.'], ['Rosa Parks no cede su puesto.', 2, 'Busca el boicot del bus.'], ['No comprar telas inglesas.', 0, 'Busca quién propuso la no violencia.'], ['Mandela, presidente en 1994.', 1, 'Busca las primeras elecciones de todos.']), bien: 'Sal, apartheid y bus.' },
      'La sal y las telas son de la India; apartheid y Mandela, de Sudáfrica; Parks, de Estados Unidos.', 'Busca el nombre propio que aparece en cada párrafo.'),
    x('genero-o-cita', '¿Es una acción **no violenta** o **armada**?', { doc: LIBRES, rot: ['no violenta', 'armada'],
      ...F(['Boicot a los buses', 0, '¿Se usan armas ahí?'], ['La guerra de Argelia', 1, '¿Se usan armas ahí?'], ['No pagar impuestos injustos', 0, '¿Se usan armas ahí?'], ['Negarse a ceder un puesto', 0, '¿Se usan armas ahí?']), bien: 'Desobedecer también es luchar.' },
      'Boicot, impuestos y el puesto son desobediencia; Argelia fue una guerra.', 'Pregunta si alguien usa la fuerza contra otros.'),
    x('mapa-margen', 'Lleva al margen qué hace cada párrafo. Sobra una nota.', { doc: LIBRES,
      ...F(['define la descolonización', 0, 'Busca «se le llama».'], ['un camino sin violencia y su costo', 1, 'Busca a Gandhi.'], ['caminos armados y fronteras', 2, 'Busca la regla.'], ['segregación hecha ley', 3, 'Busca el apartheid.'], ['luchas dentro de países independientes', 4, 'Busca el bus.'], ['define movimiento social', 5, 'Busca «no es un partido».'], ['la vida de un rey', null, 'No aparece ningún rey.']),
      luz: [[1, 'se le llama descolonización'], [2, 'no violenta'], [3, 'con regla'], [4, 'El apartheid'], [5, 'Rosa Parks'], [6, 'Un movimiento social']], bien: 'Definir, dos caminos, apartheid, luchas y definir.' },
      'Abre con una definición, recorre casos y cierra con otra definición.', 'Mira de qué caso o idea habla cada párrafo.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: LIBRES, nums: [2, 3], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La India se independizó en 1947.', 0, 'Léela junto al párrafo 2.'], ['Una independencia sin guerra puede traer violencia.', 1, '¿Qué pasó en la partición?'], ['Algunas fronteras separaron a un mismo pueblo.', 1, '¿A quién no se le preguntó?'], ['Francia ganó la guerra de Argelia.', 2, '¿Hasta cuándo peleó Argelia y qué logró?']),
      luz: [[2, 'En 1947'], [2, 'en la partición'], [3, 'sin preguntar']], bien: 'Una raya puede partir un pueblo.' },
      'El año está escrito; la violencia de la partición y los pueblos divididos se deducen; que ganara Francia no.', 'Une lo que hicieron con lo que pasó después.'),
    x('cambia-palabra', 'Pon en cada hueco lo que dice lo mismo. Sobran dos.', { doc: LIBRES, frases: [[2, 'propuso la ', 'desobediencia civil', ' no violenta'], [4, 'había convertido la ', 'segregación', ' en ley'], [5, 'el ', 'boicot', ' que siguió']],
      ...F(['negativa a cumplir normas injustas', 0, '¿Qué hacían con los impuestos y la sal?'], ['separación por el color', 1, '¿Qué decidía dónde vivir o sentarse?'], ['acuerdo de no usar el servicio', 2, '¿Qué hizo la gente con los buses?'], ['unión de todos', null, 'Es lo contrario de una de ellas.'], ['desfile militar', null, 'Aquí no hay ejércitos.']), bien: 'Palabras de la ciudadanía.' },
      'Desobedecer es no cumplir lo injusto, segregar es separar y boicotear es dejar de usar.', 'Mira los ejemplos que da el texto alrededor.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 1 la oración que dice que **una causa no basta**.', { doc: LIBRES, nums: [1], apuesta: 'Europa débil no explica todo.', ...S(['1.3'], { '1.0': 'Da la situación del comienzo.', '1.1': 'Da la situación treinta años después.', '1.2': 'Le pone nombre al proceso.' }), bien: '«Pero eso no basta» suma otra causa.' },
      'La última oración reconoce la debilidad de Europa y dice que no basta para explicarlo.', 'Busca la oración que reconoce una causa y agrega otra.'),
    x('balanza-tesis', 'Tesis: «un movimiento social puede cambiar las leyes». ¿Qué hace cada dato?', { doc: LIBRES, tesis: 'Un movimiento social puede cambiar las leyes',
      ...F(['Después del boicot y las marchas se aprobaron leyes.', 0, '¿Hubo un cambio legal?'], ['Las leyes ya estaban aprobadas antes de las marchas.', 1, 'Si fuera cierto, ¿habrían cambiado por ellas?'], ['El bus era amarillo.', 2, '¿Habla de leyes?']), bien: 'El orden de los hechos decide.' },
      'Leyes después de las marchas la apoyan; si fueran de antes, la debilitarían; el color no pesa.', 'Mira en cada dato qué pasó primero: ¿las marchas o las leyes?'),
    x('tacha-resumen', 'Tacha las dos oraciones que sobran en el resumen.', { doc: LIBRES, lineas: ['En treinta años casi todas las colonias se independizaron.', 'Fabricar sal estaba prohibido.', 'Hubo caminos pacíficos y armados, con costos.', 'Se luchó también contra la segregación.', 'Mandela estuvo veintisiete años preso.', 'Los movimientos cambian lo que parece posible.'], ...S([1, 4], { 0: 'Es el proceso.', 2: 'Son los caminos.', 3: 'Es la otra lucha.', 5: 'Es la conclusión.' }), bien: 'Proceso, caminos, segregación y conclusión.' },
      'La sal y los años de cárcel son detalles; lo demás es el hilo.', 'Deja lo que explica el proceso, no un solo caso.'),
  ]);

  const SOPA = {
    id: 'icf-carta-berlin', title: 'La mesa de los abuelos',
    paras: [
      'En una residencia para mayores de una ciudad europea, cuatro personas comparten la mesa del almuerzo. La directora les pidió que contaran, para un libro, qué día cambió su vida. Estas son sus respuestas.',
      'Greta, de noventa y un años, habló de su padre. «En 1932 era obrero y se quedó sin trabajo. Tenía hambre y vergüenza. Un partido le ofreció un plato de sopa, un uniforme y alguien a quien culpar. Nunca le perdoné el uniforme. La sopa, sí. Cuando oigo hoy que todo se arreglaría si se fueran los de afuera, vuelvo a oler esa sopa».',
      'Samuel, de ochenta y ocho, nació en una colonia africana. «El mapa de mi país lo dibujaron en una oficina, a cinco mil kilómetros. La raya pasaba por el patio de mi abuela: la cocina quedó de un lado y la letrina del otro. En 1960 nos dieron bandera. La raya la dejaron. He vivido dos guerras y en las dos se peleaba por el patio de mi abuela».',
      'Irina, de ochenta y cuatro, vivía en Berlín oriental. «Una mañana de agosto de 1961 amaneció el alambre. Mi novio trabajaba al otro lado. Nos hacíamos señas desde una ventana con un espejo. Cuando cayó el muro, veintiocho años después, fui a buscarlo. Tenía nietos. Me mostró un cajón: adentro estaba el espejo».',
      'Marie, de ochenta y seis, nació en Haití. «En la escuela, el primer día, nos hacían decir una fecha: 1804. Mi abuela contaba que una mujer de la familia cortó caña encadenada y murió siendo dueña de un pedazo de tierra y de su nombre. También contaba que la libertad nos la cobraron: Francia exigió una fortuna por perder a sus esclavos y el país pagó durante más de un siglo».',
      'La directora publicó las cuatro historias sin cambiar una palabra. En el prólogo escribió: «Los libros de historia cuentan que hubo una revolución, una crisis, un reparto y un muro. Aquí se ve qué se siente cuando la historia entra a la casa sin tocar la puerta».',
      'Un lector le escribió para quejarse: cuatro recuerdos, dijo, no son pruebas de nada. Ella le contestó que tenía razón: no prueban lo que pasó en el mundo. Prueban que pasó en alguien, y que todavía duele cuando se sirve la sopa.',
    ],
  };
  const Q = preg(SOPA, 'sociales');
  return mundo('icf-sc-mundo', 'Historia del Mundo', 'sociales', [l1, l2, l3], [
    ['icf-sc-mundo-1', 'Haití: la revolución de los esclavizados, en 1804.', Q('La fecha que Marie repetía en la escuela recuerda:', ['La caída de Napoleón', 'La fundación de un país por quienes habían sido esclavizados', 'La llegada de los españoles', 'El fin de la Guerra Fría'], 1, 'En 1804 nació Haití, fundado por personas que habían sido esclavizadas.', 'Recuerda qué pasó en Haití ese año.')],
    ['icf-sc-mundo-1', 'La palabra «libertad» y su costo.', Q('«La libertad nos la cobraron» muestra una contradicción con los ideales de 1789 porque:', ['Francia proclamó la libertad y exigió dinero por la de otros', 'Haití no quería ser libre', 'Los ideales eran solo económicos', 'Haití era más rico que Francia'], 0, 'El país que proclamó los Derechos del Hombre cobró por perder a sus esclavos.', 'Une lo que Francia proclamó con lo que exigió.')],
    ['icf-sc-mundo-2', 'Las condiciones económicas influyen en la política.', Q('La historia del padre de Greta ayuda a entender por qué algunas personas apoyaron un régimen autoritario:', ['Por amor a la democracia', 'Por el desempleo, el hambre y un culpable que les ofrecieron', 'Porque odiaban la sopa', 'Por orden de un juez'], 1, 'Sin trabajo y con vergüenza, le ofrecieron comida, uniforme y alguien a quien culpar.', 'Mira qué le faltaba y qué le ofrecieron.')],
    ['icf-sc-mundo-2', 'Culpar a un grupo simplifica un problema.', Q('Cuando Greta dice «vuelvo a oler esa sopa», advierte que:', ['La comida de hoy es mala', 'Extraña a su padre', 'El discurso que culpa a los de afuera se parece al de entonces', 'Le gusta cocinar'], 2, 'Compara el discurso actual con el que sedujo a su padre.', 'Lee la frase que va justo antes de la sopa.')],
    ['icf-sc-mundo-2', 'El Muro dividió Berlín desde 1961 hasta 1989.', Q('El relato de Irina ilustra una consecuencia de la Guerra Fría:', ['La división de familias y personas por la separación en bloques', 'El reparto de África', 'La crisis de la bolsa', 'La Revolución Industrial'], 0, 'El muro separó a quienes vivían a cada lado.', 'Piensa qué separó a Irina de su novio.')],
    ['icf-sc-mundo-2', 'Un testimonio prueba lo vivido, no lo general.', Q('La respuesta de la directora al lector reconoce que los testimonios:', ['Son falsos', 'Sirven para conocer cómo se vivió, no para probar lo general', 'Reemplazan los libros de historia', 'No sirven para nada'], 1, 'No prueban lo que pasó en el mundo; prueban que pasó en alguien.', 'Compara lo que dice que no prueban y lo que sí.')],
    ['icf-sc-mundo-3', 'Muchas fronteras africanas se trazaron en Europa.', Q('La imagen de la raya en el patio de la abuela muestra que:', ['La casa era muy grande', 'La abuela construyó mal', 'Las fronteras coloniales ignoraron a quienes vivían allí', 'El mapa era pequeño'], 2, 'El mapa se dibujó lejos, sin tener en cuenta a la gente.', 'Mira dónde dibujaron el mapa.')],
    ['icf-sc-mundo-3', 'La independencia no siempre cambió las fronteras.', Q('La frase «nos dieron bandera. La raya la dejaron» sugiere que la independencia:', ['No ocurrió', 'Resolvió todos los problemas', 'Fue pagada con dinero', 'Dejó sin resolver problemas heredados de la Colonia'], 3, 'Hubo país nuevo, pero con la frontera que causó guerras.', 'Compara lo que cambió con lo que quedó igual.')],
  ]);
})());
