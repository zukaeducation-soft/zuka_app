// Preicfes · Ciencias Naturales · mundo 8 «Herencia y Evolución» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const CONEJOS = {
    id: 'icf-conejos', title: 'Los conejos de la profesora',
    ficha: { autor: 'Colegio agrícola', fuente: 'Cuaderno de cruces', fecha: 'Febrero de 2026' },
    paras: [
      'Un gen es un tramo de ADN con información para una característica. Cada gen puede tener versiones distintas, llamadas alelos. Una coneja recibe dos alelos de cada gen: uno de la madre y otro del padre. Al conjunto de alelos se le llama genotipo; a lo que se ve, fenotipo.',
      'En los conejos del colegio, el pelo corto es dominante y el largo, recesivo. El alelo dominante se escribe con mayúscula, A; el recesivo, con minúscula, a. Un conejo AA o Aa tiene pelo corto; solo el aa lo tiene largo. El que tiene dos alelos iguales es homocigoto; el que los tiene distintos, heterocigoto.',
      'La profesora cruzó un macho AA con una hembra aa. Todos los hijos recibieron una A del padre y una a de la madre: los doce fueron Aa, de pelo corto. Después cruzó dos de esos hijos. Cada uno puede dar A o a. Las combinaciones son cuatro: AA, Aa, aA y aa. Se esperan tres de pelo corto por cada uno de pelo largo.',
      'Nacieron ocho conejos: cinco cortos y tres largos. Un estudiante dijo que la regla había fallado. No había fallado: la probabilidad dice lo que se espera en muchos nacimientos, no lo que ocurre en cada camada. En los registros de cinco años, con 412 nacimientos de esa clase de cruce, 305 fueron cortos y 107 largos.',
      'No todo se hereda tan sencillo. En algunas flores, ni el rojo ni el blanco dominan y el heterocigoto es rosado. En los grupos sanguíneos, A y B se notan los dos: el hijo puede ser AB. La estatura depende de muchos genes y también de la alimentación.',
      'Además, hay genes en los cromosomas sexuales. El daltonismo más común está en el cromosoma X y es recesivo. Una mujer, XX, necesita dos copias para tenerlo; un hombre, XY, con una le basta. Por eso es más frecuente en ellos. Una mujer con una sola copia no lo tiene, pero puede transmitirlo: es portadora.',
    ],
  };
  const l1 = leccion('icf-cn-herencia-1', 'Genes y cruces', guion(
    ['Dos alelos', 'Uno de la madre y otro del padre. Genotipo: los alelos. Fenotipo: lo que se ve.'],
    ['Dominante y recesivo', 'Con uno dominante basta; el recesivo necesita dos.'],
    ['El cuadro', 'Cuatro casillas con las combinaciones posibles.'],
    ['Probabilidad', 'Dice lo que se espera en muchos, no en cada camada.']), [
    x('genero-o-cita', '¿Es **genotipo** o **fenotipo**?', { doc: CONEJOS, rot: ['genotipo', 'fenotipo'],
      ...F(['Aa', 0, '¿Son letras de alelos o algo que se ve?'], ['Pelo largo', 1, '¿Son letras de alelos o algo que se ve?'], ['Tener dos alelos iguales', 0, '¿Habla de los alelos o de lo que se ve?'], ['Flor rosada', 1, '¿Habla de los alelos o de lo que se ve?']), bien: 'Lo que se tiene y lo que se ve.' },
      'Aa y los alelos iguales son genotipo; el pelo y el color se ven: fenotipo.', 'Pregunta si lo puedes ver o si está en los genes.'),
    x('pista-tipo', 'Ata cada nombre a su genotipo.', { doc: CONEJOS, lineas: ['AA', 'Aa', 'aa'],
      ...T(['homocigoto de pelo corto', 0, '¿Cuál tiene dos iguales y dominantes?'], ['heterocigoto', 1, '¿Cuál tiene dos distintos?'], ['pelo largo', 2, '¿Cuál no tiene ninguna A?']), bien: 'Iguales, distintos y sin A.' },
      'AA es homocigoto corto, Aa heterocigoto y aa de pelo largo.', 'Mira si las letras son iguales y si hay mayúscula.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: CONEJOS, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un hijo recibe un alelo de cada padre.',
      ...T(['Un conejo Aa tiene el pelo largo.', 2, 'Busca qué pelo tiene el que lleva una A.'], ['Como nacieron tres largos de ocho, la regla falló.', 6, 'Busca qué dice la probabilidad.'], ['La estatura depende de un solo gen.', 11, 'Busca de qué depende.']), bien: 'Corto, no falló y muchos genes.' },
      'El Aa tiene pelo corto, la probabilidad vale en muchos nacimientos y la estatura depende de muchos genes.', 'Saca la palabra clave: Aa, regla, estatura.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CONEJOS, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Los doce primeros hijos fueron de pelo corto.', 0, 'Léela junto al primer cruce.'], ['Un hijo daltónico recibió el alelo de su madre.', 1, '¿De quién recibe un hombre su X?'], ['Dos padres de pelo corto pueden tener hijos de pelo largo.', 1, '¿Qué pasó al cruzar dos Aa?'], ['Los conejos de pelo largo viven más.', 2, '¿Se habla de cuánto viven?']),
      luz: [[3, 'los doce fueron Aa'], [6, 'un hombre, XY'], [3, 'cada uno de pelo largo']], bien: 'El Y viene del padre, la X de la madre.' },
      'Los doce están escritos; la X de la madre y los hijos largos se deducen; la edad no aparece.', 'Piensa de quién viene cada cromosoma o alelo.'),
    x('lee-escala', 'La gráfica muestra los nacimientos de otro registro. Pon cada valor y cuántos cortos hay **más** que largos.', { vals: [150, 50, 200], rot: ['cortos', 'largos', 'total'], hi: 200, st: 40, et: ['cortos', 'largos', 'total', 'más'], ops: ['', '', ''], metas: ['150', '50', '200', '100'], fichas: ['150', '50', '200', '100', '123', '42', '250'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a un cuarto del camino entre 40 y 80.', 'Mira en qué línea termina.', 'Resta los largos a los cortos.'], trampas: { '0:123': 'Cada línea vale 40: tres cuartos son 30.', '1:42': 'Cada línea vale 40: un cuarto son 10.' }, ok: 'Tres a uno.' },
      'Las líneas van de 40 en 40: 150, 50 y 200. La diferencia es 100.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: CONEJOS, filas: [{ antes: 'Al cruzar Aa con Aa se esperan largos', topes: ['la mitad', 'ninguno', 'uno de cada cuatro'], va: 2 }, { antes: 'Una mujer portadora', topes: ['es daltónica', 'no es daltónica, pero puede transmitirlo', 'no lo transmite'], va: 1 }, { antes: 'En las flores rosadas', topes: ['ninguno domina', 'domina el rojo', 'domina el blanco'], va: 0 }], mira: ['Relee las cuatro combinaciones.', 'Relee la última oración.', 'Relee lo de las flores.'], luz: [[3, 'tres de pelo corto por cada uno'], [6, 'es portadora'], [5, 'ni el rojo ni el blanco dominan']], bien: 'Uno de cuatro, transmite y ninguno.' },
      'Uno de cada cuatro, la portadora transmite y en las flores ninguno domina.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('En una planta, la flor morada (M) domina a la blanca (m). Se cruza Mm con mm. ¿Qué se espera?', ['El padre Mm puede dar M o m; la madre, solo [[m]]', 'Los hijos serán Mm o [[mm]]', 'Se espera que sean blancas el [[50]] %'], ['M', 'MM', '25'], 'Mitad Mm (moradas) y mitad mm (blancas).', 'Escribe lo que puede dar cada uno y combínalo.'),
    err('Alguien cruza dos conejos Aa y explica lo que espera.', ['Cada uno da A o a', 'Las combinaciones son AA, Aa, aA y aa', 'Se espera que la mitad sea de pelo largo'], 2, ['Se espera que la cuarta parte sea de pelo largo', 'Se espera que todos sean de pelo largo', 'Se espera que ninguno sea de pelo largo'], 'Solo aa tiene pelo largo: una de cuatro.', 'Cuenta en cuántas combinaciones no hay mayúscula.'),
    opc('Una pareja sin daltonismo tiene un hijo daltónico. Lo más probable es que:', ['El padre sea portador', 'La madre sea portadora', 'Los dos sean daltónicos', 'El hijo no sea de ellos'], 1, 'El hijo recibe su X de la madre; el padre sin daltonismo no tiene el alelo.', 'Pregunta de quién recibe la X un hombre.'),
  ]);

  const REPRO = {
    id: 'icf-fresas', title: 'Las fresas y las abejas',
    ficha: { autor: 'Vivero comunitario', fuente: 'Guía de siembra', fecha: 'Marzo de 2026' },
    paras: [
      'Una mata de fresa puede tener hijas de dos maneras. Con un estolón, un tallo que se arrastra y echa raíces, produce otra mata sin ayuda de nadie: es reproducción asexual. Con la flor, cuando un grano de polen llega al pistilo de otra y se forma una semilla, la reproducción es sexual.',
      'En la asexual hay un solo progenitor y los hijos son genéticamente iguales a él, salvo que ocurra una mutación. Es rápida y no necesita pareja. Así se multiplican las bacterias, que se parten en dos; las levaduras, que forman yemas; y las papas, que se siembran por pedazos.',
      'En la sexual se unen dos células especiales, los gametos: el óvulo y el espermatozoide, o el polen en las plantas. Cada gameto tiene la mitad de los cromosomas. Al unirse, el cigoto recupera el número completo. Los gametos humanos tienen 23 cromosomas; las demás células del cuerpo, 46.',
      'Hay dos divisiones celulares que no conviene confundir. La mitosis produce dos células iguales a la original y sirve para crecer y reparar. La meiosis produce cuatro células con la mitad de cromosomas y sirve para formar gametos. En la meiosis los cromosomas intercambian pedazos y se reparten al azar: por eso dos hermanos no son iguales.',
      'En el vivero hicieron una prueba. Cubrieron treinta flores con una malla que no dejaba entrar insectos; dejaron otras treinta abiertas. Las cubiertas dieron 11 fresas, casi todas deformes; las abiertas, 27. La malla dejaba pasar el sol, el aire y la lluvia.',
      'El año siguiente apareció un hongo. En la parcela sembrada con estolones de una sola mata murieron casi todas; en la que venía de semillas, murió una de cada cuatro. Ser iguales ahorra tiempo mientras nada cambia. Cuando algo cambia, la variedad es el seguro de vida de una especie.',
    ],
  };
  const l2 = leccion('icf-cn-herencia-2', 'Reproducción', guion(
    ['Asexual', 'Un progenitor, hijos iguales, rápida.'],
    ['Sexual', 'Dos gametos con la mitad de cromosomas: hijos variados.'],
    ['Mitosis y meiosis', 'Dos iguales para crecer; cuatro con la mitad para gametos.'],
    ['Variedad', 'Protege cuando el ambiente cambia.']), [
    x('pinta-tipos', 'Pinta cada caso con su tipo de reproducción.', { doc: REPRO, plumas: ['asexual', 'sexual'],
      ...P(['Una bacteria se parte en dos.', 0, '¿Hay uno o dos progenitores?'], ['El polen llega a otra flor.', 1, '¿Hay uno o dos progenitores?'], ['Un estolón echa raíces.', 0, '¿Hay uno o dos progenitores?'], ['Un óvulo se une a un espermatozoide.', 1, '¿Hay uno o dos progenitores?'], ['Se siembra un pedazo de papa.', 0, '¿Hay uno o dos progenitores?']), bien: 'Uno o dos progenitores.' },
      'Bacteria, estolón y papa tienen un progenitor; polen y óvulo unen dos gametos.', 'Cuenta cuántos progenitores aportan en cada caso.'),
    x('genero-o-cita', '¿Es **mitosis** o **meiosis**?', { doc: REPRO, rot: ['mitosis', 'meiosis'],
      ...F(['Cierra una herida', 0, '¿Repara o forma gametos?'], ['Forma óvulos', 1, '¿Repara o forma gametos?'], ['Da dos células iguales', 0, '¿Cuántas y cómo quedan?'], ['Reduce a la mitad los cromosomas', 1, '¿Cuál divide el número?']), bien: 'Crecer o formar gametos.' },
      'Reparar y dar dos iguales es mitosis; formar óvulos con la mitad, meiosis.', 'Pregunta para qué sirve y cuántos cromosomas quedan.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba de la malla.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: REPRO, portadas: [['Flores abiertas', 'experimento'], ['Malla', 'experimento'], ['Número de fresas', 'experimento'], ['Sol, aire y lluvia', 'experimento']],
      ...T(['el control', 0, '¿Con cuáles se compara?'], ['lo que se cambió', 1, '¿Qué impedía entrar a los insectos?'], ['lo que se midió', 2, '¿Qué contaron?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron todas?']), bien: 'Control, cambio, medida e igual.' },
      'Las abiertas son el control, la malla lo que se cambió, las fresas lo medido y sol, aire y lluvia lo igual.', 'Relee cómo se hizo la prueba con las flores.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: REPRO, nums: [5, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las flores abiertas dieron 27 fresas.', 0, 'Léela junto a la prueba.'], ['Los insectos ayudan a que se formen buenas fresas.', 1, 'Compara cubiertas y abiertas.'], ['Entre las matas de semilla había algunas resistentes al hongo.', 1, '¿Por qué no murieron todas?'], ['El hongo llegó en las abejas.', 2, '¿Se dice cómo llegó?']),
      luz: [[5, '27'], [5, '11 fresas'], [6, 'una de cada cuatro']], bien: 'Comparar grupos permite deducir.' },
      'Las 27 están escritas; los insectos y la resistencia se deducen; cómo llegó el hongo no.', 'Compara qué pasó en cada grupo de plantas.'),
    x('mayor-tramo', 'La gráfica muestra cuántas bacterias (en miles) hay cada hora. Toca el tramo que más creció **en porcentaje**.', { v: [8, 14, 24, 36] },
      'De 8 a 14 crece 75 %; de 14 a 24, 71 %; de 24 a 36, 50 %. El último suma más, pero en porcentaje crece menos.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Idea: «la variedad genética protegió a las fresas de semilla». ¿Qué hace cada dato?', { doc: REPRO, tesis: 'La variedad protegió a las de semilla',
      ...F(['Las iguales murieron casi todas.', 0, '¿Qué pasó donde no había variedad?'], ['Las de semilla estaban en otra parcela, con menos humedad para el hongo.', 1, '¿Hay otra explicación?'], ['Se repitió en la misma parcela con igual resultado.', 0, '¿Descarta otra explicación?'], ['Las fresas son rojas.', 2, '¿Habla de la variedad?']), bien: 'Otra explicación posible debilita.' },
      'Las iguales y la repetición la apoyan; la humedad distinta la debilita; el color no pesa.', 'Pregunta qué más pudo ser distinto entre las parcelas.'),
    sol('Una célula del cuerpo de un perro tiene 78 cromosomas. ¿Cuántos tienen sus gametos y el cigoto?', ['El gameto tiene la mitad: [[39]]', 'El cigoto junta dos gametos: [[78]]', 'El gameto se forma por [[meiosis]]'], ['156', 'mitosis', '40'], '$78 \\div 2 = 39$ y dos gametos suman 78.', 'Los gametos llevan la mitad.'),
    err('Alguien explica por qué dos hermanos no son iguales.', ['Cada gameto se forma por meiosis', 'En la meiosis los cromosomas se reparten al azar', 'Por eso todos los gametos de una persona son iguales'], 2, ['Por eso los gametos de una persona son distintos entre sí', 'Por eso los hermanos tienen distinto número de cromosomas', 'Por eso los hermanos son genéticamente iguales'], 'El reparto al azar hace distintos a los gametos.', '¿Qué produce un reparto al azar?'),
    opc('Un cultivo de banano se multiplica siempre por hijuelos de la misma planta. Su mayor riesgo es que:', ['Crezca muy despacio', 'Una sola enfermedad afecte a todas las plantas', 'Las plantas sean muy distintas', 'No tenga cromosomas'], 1, 'Son genéticamente iguales: si una es vulnerable, todas lo son.', 'Recuerda qué pasó con las fresas de estolones.'),
  ]);

  const EVO = {
    id: 'icf-lagartijas', title: 'Las lagartijas de la isla Parda',
    ficha: { autor: 'Grupo de campo', fuente: 'Diario de observación', fecha: 'Abril de 2026' },
    paras: [
      'En la isla Parda, las rocas son oscuras. Hace ochenta años, un naturalista contó lagartijas: nueve de cada diez eran verdes y una era parda. Hoy, de cada diez, ocho son pardas. Nadie las pintó y ninguna lagartija verde se volvió parda. Lo que cambió fue la población.',
      'La selección natural lo explica con cuatro pasos. Uno: los individuos de una población no son iguales; hay variación. Dos: parte de esa variación se hereda. Tres: nacen más de los que pueden sobrevivir. Cuatro: los que tienen características favorables en ese ambiente sobreviven y se reproducen más, y dejan más hijos parecidos.',
      'Sobre roca oscura, los halcones ven mejor a las verdes. Las pardas llegaban más a menudo a tener crías, que también eran pardas. Generación tras generación, la proporción cambió. La variación apareció antes, por mutaciones al azar; el ambiente no la fabricó, la seleccionó.',
      'Conviene evitar dos errores. El primero es pensar que los individuos se adaptan porque lo necesitan: una lagartija no se oscurece por esforzarse. El segundo es creer que lo favorable lo es siempre: en la isla vecina, de arena clara, las pardas casi no existen. Estar adaptado es estarlo a un lugar y a un momento.',
      'Las pruebas de la evolución vienen de muchas partes. Los fósiles muestran formas intermedias. Los huesos del brazo humano, la aleta de la ballena y el ala del murciélago son los mismos, acomodados de otra manera. El ADN de especies emparentadas se parece más que el de especies lejanas.',
      'También la vemos mientras ocurre. Si se toma un antibiótico y se abandona antes de tiempo, mueren primero las bacterias sensibles y quedan las pocas resistentes. Esas se multiplican. La siguiente infección ya no responde. No es que la bacteria «se acostumbre»: es que las otras murieron.',
    ],
  };
  const l3 = leccion('icf-cn-herencia-3', 'Selección natural', guion(
    ['Cuatro pasos', 'Variación, herencia, más nacimientos que sobrevivientes y reproducción diferente.'],
    ['La población cambia', 'El individuo no se transforma: cambia la proporción.'],
    ['Al azar y seleccionada', 'La mutación es al azar; el ambiente selecciona.'],
    ['Pruebas', 'Fósiles, huesos parecidos, ADN y bacterias resistentes.']), [
    x('pasos-del-proceso', 'Ordena lo que pasó con las lagartijas. El primer paso está en su puesto.', { doc: EVO, que: 'el cambio', de: 'De verdes a pardas', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Hay verdes y unas pocas pardas.', 'Los halcones cazan más verdes.', 'Las pardas tienen más crías.', 'Las crías heredan el color.', 'La mayoría es parda.'], mira: ['', 'Es lo que hace el ambiente.', 'Es lo que logran las que sobreviven.', 'Es lo que les pasa a sus hijas.', 'Es el resultado.'], bien: 'Variar, cazar, criar, heredar y cambiar.' },
      'Había variación, los halcones cazan verdes, las pardas crían, heredan el color y la población cambia.', 'Sigue los cuatro pasos que explica el párrafo 2.'),
    x('genero-o-cita', '¿La explicación es **correcta** o tiene el **error** típico?', { doc: EVO, rot: ['correcta', 'error típico'],
      ...F(['Se oscureció porque lo necesitaba', 1, '¿El individuo cambia por esfuerzo?'], ['Las pardas dejaron más crías', 0, '¿Habla de reproducción?'], ['La bacteria se acostumbró al remedio', 1, '¿El individuo cambia por esfuerzo?'], ['Quedaron las que ya eran resistentes', 0, '¿La variación estaba antes?']), bien: 'No se esfuerzan: se seleccionan.' },
      'Necesitar y acostumbrarse son el error; dejar crías y quedar las resistentes es la selección.', 'Pregunta si cambia el individuo o la población.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: EVO, nums: [1, 3, 4], pregunta: 'Queda en pie', queda: 'Lo favorable depende del lugar.',
      ...T(['Cada lagartija verde se volvió parda.', 3, 'Busca qué no hizo ninguna.'], ['El ambiente fabricó el color pardo.', 8, 'Busca qué hizo el ambiente.'], ['Ser parda es ventaja en cualquier isla.', [11, 12], 'Busca la isla vecina.']), bien: 'Ninguna, seleccionó y otra isla.' },
      'Ninguna se volvió parda, el ambiente seleccionó y en la arena clara casi no hay pardas.', 'Saca la palabra clave: cada, fabricó, cualquier.'),
    x('pista-tipo', 'Ata cada clase de prueba a su ejemplo.', { doc: EVO, lineas: ['formas intermedias en la roca', 'brazo, aleta y ala con los mismos huesos', 'secuencias parecidas', 'bacterias resistentes'],
      ...T(['fósiles', 0, '¿Cuál se halla en la roca?'], ['anatomía comparada', 1, '¿Cuál habla de huesos?'], ['ADN', 2, '¿Cuál compara secuencias?'], ['evolución observada hoy', 3, '¿Cuál ocurre ante nosotros?']), bien: 'Muchas pruebas, una idea.' },
      'Los fósiles, los huesos, el ADN y las bacterias apuntan a lo mismo.', 'Mira de dónde sale cada una de las pruebas.'),
    x('lee-escala', 'La gráfica muestra las pardas de cada cien en tres conteos. Pon cada valor y cuánto **subió** del primero al último.', { vals: [10, 45, 80], rot: ['hace 80 años', 'hace 40', 'hoy'], hi: 80, st: 20, et: ['primero', 'segundo', 'hoy', 'subió'], ops: ['', '', ''], metas: ['10', '45', '80', '70'], fichas: ['10', '45', '80', '70', '5', '41', '90'],
      mira: ['Está a mitad de camino de la primera línea.', 'Está a un cuarto del camino entre 40 y 60.', 'Mira en qué línea termina.', 'Resta el primero al último.'], trampas: { '0:5': 'Cada línea vale 20: la mitad son 10.', '1:41': 'Cada línea vale 20: un cuarto son 5.', '3:90': 'Eso es la suma.' }, ok: 'De 10 a 80.' },
      'Las líneas van de 20 en 20: 10, 45 y 80. Subió $80 - 10 = 70$.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('balanza-tesis', 'Hipótesis: «los halcones causaron el cambio». ¿Qué hace cada dato?', { doc: EVO, tesis: 'Los halcones causaron el cambio',
      ...F(['En un islote oscuro sin halcones, siguen siendo verdes.', 0, '¿Qué pasa al quitar los halcones?'], ['En un islote oscuro sin halcones, también son pardas.', 1, '¿Hicieron falta los halcones?'], ['Los halcones anidan en marzo.', 2, '¿Explica el color?']), bien: 'Quitar una causa la pone a prueba.' },
      'Sin halcones y verdes la apoya; sin halcones y pardas la debilita; el mes no pesa.', 'Compara lugares con halcones y lugares sin ellos.'),
    sol('En una población de 200 polillas, 20 son oscuras. Tras un incendio sobreviven 18 oscuras y 42 claras. ¿Qué porcentaje es oscuro antes y después?', ['Antes eran oscuras el [[10]] %', 'Sobrevivieron en total [[60]]', 'Ahora son oscuras el [[30]] %'], ['18', '20', '43'], '$20 \\div 200 = 10\\%$; $18 \\div 60 = 30\\%$.', 'Compara siempre con el total de ese momento.'),
    err('Alguien explica el cuello largo de las jirafas.', ['Había jirafas de cuello más largo y más corto', 'Las de cuello largo alcanzaban más comida', 'Al estirarse, el cuello les creció y lo heredaron'], 2, ['Dejaron más crías, que heredaron el cuello largo', 'Las de cuello corto se estiraron hasta alcanzar', 'El cuello creció porque lo necesitaban'], 'Lo que se gana por estirarse no se hereda: se seleccionó la variación que ya había.', '¿Se hereda lo que se estira en la vida?'),
    opc('Un paciente suspende el antibiótico al sentirse mejor. Esto favorece la resistencia porque:', ['Las bacterias aprenden a defenderse', 'El antibiótico crea bacterias nuevas', 'Sobreviven y se multiplican las más resistentes', 'El cuerpo rechaza el remedio'], 2, 'Mueren las sensibles y quedan las resistentes, que se multiplican.', 'Piensa cuáles quedan vivas.'),
  ]);

  const MAIZ = {
    id: 'icf-maiz', title: 'De dónde salió el maíz',
    paras: [
      'Hace unos nueve mil años, en lo que hoy es México, la gente recogía los granos de una hierba llamada teocinte. Su mazorca medía lo que un dedo y tenía una docena de granos duros.',
      'Cada año guardaban para sembrar las semillas de las plantas con granos más grandes o más blandos. Es selección artificial: escoge la gente y no el ambiente.',
      'Cuando los científicos compararon el ADN del maíz y del teocinte, hallaron que la diferencia de forma depende, en gran parte, de unos pocos genes. Todavía se pueden cruzar y dar hijos fértiles.',
      'El maíz moderno ya no puede vivir solo: sus granos no se sueltan y, si la mazorca cae entera, los brotes se ahogan entre sí. Necesita quien lo desgrane.',
      'Hay cientos de variedades: de colores, de clima frío o caliente. Cuando un hongo atacó los cultivos de un país que sembraba casi una sola, se perdió una parte enorme de la cosecha. La solución vino de una variedad vieja que nadie sembraba.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: MAIZ, ...p }, e, { hint: h });
  return mundo('icf-cn-herencia', 'Herencia y Evolución', 'ciencias', [l1, l2, l3], [
    ['icf-cn-herencia-1', 'Unos pocos genes pueden cambiar mucho la forma.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué se halló al comparar el ADN?', [3]], ['¿Cómo era el teocinte?', [1]], ['¿Por qué no puede vivir solo el maíz?', [4]]] }, 'El ADN está en el 3, el teocinte en el 1 y la dependencia en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-herencia-1', 'Lo que se hereda pasa en las semillas.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El teocinte tenía una docena de granos.', 0], ['El tamaño del grano se hereda.', 1], ['Maíz y teocinte son parientes cercanos.', 1], ['El teocinte era amarillo.', 2]] }, 'La docena está escrita; que se hereda y el parentesco se deducen; el color no.', 'Piensa por qué sirvió guardar esas semillas.')],
    ['icf-cn-herencia-1', 'El fenotipo depende del genotipo.', opc('Guardar las semillas de las plantas con granos grandes sirvió porque:', ['Las semillas grandes no necesitan agua', 'Los hijos heredan los alelos de sus padres', 'El grano crece por desearlo', 'El teocinte no tiene genes'], 1, 'Al reproducir esas plantas, sus alelos se hicieron más comunes.', 'Pregunta qué reciben las plantas hijas.')],
    ['icf-cn-herencia-2', 'La variedad protege.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Sembrar una sola variedad es un riesgo.', cards: [['Un cultivo de papas iguales arrasado por una plaga', true], ['Un bosque con un solo tipo de pino, enfermo', true], ['Una huerta con veinte especies', false], ['Una vaca que da más leche', false]] }, 'Papas iguales y pinos iguales muestran el riesgo; la huerta variada es lo contrario.', 'Busca casos en que todo es igual y algo lo ataca.')],
    ['icf-cn-herencia-2', 'Hijos fértiles: parentesco cercano.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del maíz moderno se dice todo esto, EXCEPTO:', cards: [['Necesita quien lo desgrane', [4]], ['Puede cruzarse con el teocinte', [3]], ['Tiene cientos de variedades', [5]], ['Crece bajo el agua', null]] }, 'Las tres primeras están en el 4, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-herencia-2', 'Reproducción sexual: variedad.', opc('Conservar variedades viejas de maíz es útil porque:', ['Pueden tener alelos que sirvan ante una enfermedad', 'Son más bonitas', 'No se reproducen', 'Todas son iguales'], 0, 'La solución al hongo vino de una variedad que nadie sembraba.', 'Relee cómo se resolvió la pérdida de la cosecha.')],
    ['icf-cn-herencia-3', 'Selección artificial: escoge la gente.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [2, 4], options: ['La gente escogió qué semillas sembrar.', 'El maíz depende de las personas.', 'El ambiente escogió las semillas.', 'El maíz se siembra solo.'], key: [0, 1] }, 'El 2 habla de escoger semillas; el 4, de su dependencia; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-herencia-3', 'Las mismas reglas: variación, herencia y selección.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al antepasado', 'explica la selección', 'da la prueba del ADN', 'muestra una consecuencia', 'cuenta un riesgo y su salida', 'enseña a cocinar'], key: [0, 1, 2, 3, 4] }, 'Antepasado, selección, prueba, consecuencia y riesgo; no hay receta.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-herencia-3', 'Natural o artificial: quién selecciona.', opc('La diferencia entre la selección del maíz y la de las lagartijas es:', ['En el maíz no hubo herencia', 'En las lagartijas no hubo variación', 'En el maíz escogió la gente y en las lagartijas, el ambiente', 'Ninguna de las dos es selección'], 2, 'Las dos tienen variación y herencia; cambia quién selecciona.', 'Pregunta quién decidía cuáles se reproducían.')],
  ]);
})());
