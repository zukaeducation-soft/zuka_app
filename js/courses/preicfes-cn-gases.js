// Preicfes · Ciencias Naturales · mundo 11 «Gases y Disoluciones» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, sol, err, opc, guion } = ICF;

  const JERINGA = {
    id: 'icf-jeringa', title: 'La jeringa tapada',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'Las partículas de un gas están muy separadas y se mueven sin parar. Al chocar con las paredes del recipiente empujan: eso es la presión. Si el gas se calienta, sus partículas se mueven más rápido y chocan con más fuerza. Si hay más partículas, o menos espacio, los choques son más frecuentes.',
      'Una jeringa tapada encierra una cantidad fija de aire. Al empujar el émbolo sin cambiar la temperatura, el aire cabe en menos espacio y las partículas chocan más seguido: la presión sube. Si el volumen se reduce a la mitad, la presión se duplica. El producto de la presión por el volumen no cambia; es la ley de Boyle.',
      'Un globo inflado y metido al congelador se encoge. La presión es casi la misma, la del aire de afuera, pero al bajar la temperatura el volumen baja. Es la ley de Charles: volumen y temperatura son proporcionales, siempre que la temperatura se mida en kelvin. Para pasar de grados Celsius a kelvin se suman 273.',
      '¿Por qué en kelvin? Porque su cero es el de verdad: no hay nada más frío. Pasar de 10 a 20 °C parece el doble, pero son 283 y 293 kelvin: apenas un 3.5 % más. Un globo no duplica su tamaño por eso.',
      'Si el recipiente es rígido, como una lata de aerosol, el volumen no puede cambiar. Al calentarla, lo que sube es la presión: por eso dice que no se arroje al fuego. Es la ley de Gay-Lussac.',
      'Al inflar una llanta entran más partículas, y con más partículas hay más choques. Presión, volumen, cantidad y temperatura están unidos en una sola ecuación, la del gas ideal: PV = nRT. Un gas real se parece a uno ideal cuando la presión no es muy alta y la temperatura no es muy baja. A gran altura hay menos presión, y en cada litro de aire hay menos partículas de oxígeno: por eso los montañistas se cansan.',
    ],
  };
  const l1 = leccion('icf-cn-gases-1', 'Leyes de los gases', guion(
    ['Presión', 'Los choques de las partículas contra las paredes.'],
    ['Boyle', 'Con temperatura fija, presión por volumen no cambia.'],
    ['Charles', 'Con presión fija, el volumen es proporcional a los kelvin.'],
    ['Gay-Lussac', 'Con volumen fijo, la presión es proporcional a los kelvin.']), [
    x('boyle-embolo', 'Un gas ocupa **6 L** a **2 atm**. Sin cambiar la temperatura, la presión sube a **3 atm**. Mueve el émbolo.', { P: 2, V: 6, P2: 3, max: 9, paso: 1 },
      'El producto es $2 \\cdot 6 = 12$ y $12 \\div 3 = 4$ L.', 'El producto de la presión por el volumen debe ser el mismo.'),
    x('charles-globo', 'Un globo tiene **6 L** a **300 K**. Con la misma presión se enfría a **250 K**. Mueve su volumen.', { V: 6, T: 300, T2: 250, max: 10, paso: 0.5 },
      'El volumen y los kelvin van en la misma proporción: $6 \\cdot \\tfrac{250}{300} = 5$ L.', 'Halla cuántos kelvin corresponden a cada litro.'),
    x('gas-sube-baja', '¿Qué le pasa a lo que se pregunta en cada caso?', { et: ['más presión, igual T: volumen', 'más calor, presión igual: volumen', 'lata al sol: presión', 'sale aire de la llanta: presión'], metas: ['baja', 'sube', 'sube', 'baja'], fichas: ['baja', 'sube', 'sube', 'baja', 'igual', 'igual'], mira: ['El producto no cambia: si una sube, la otra…', 'Con más kelvin, más volumen.', 'El volumen es fijo y las partículas van más rápido.', 'Hay menos partículas que chocan.'], trampas: { '2:igual': 'El volumen es el que no cambia.', '0:igual': 'Para que el producto no cambie, algo debe bajar.' }, ok: 'Boyle, Charles, Gay-Lussac y menos partículas.' },
      'Con Boyle baja, con Charles y Gay-Lussac sube y con menos partículas baja.', 'Mira qué se deja fijo en cada caso y qué se mueve.'),
    x('genero-o-cita', '¿En cada caso se mantiene **la presión** o **el volumen**?', { doc: JERINGA, rot: ['la presión', 'el volumen'],
      ...F(['Un globo en el congelador', 0, '¿Puede cambiar de tamaño?'], ['Una lata cerrada al sol', 1, '¿Puede cambiar de tamaño?'], ['Un globo que se infla al calentarse', 0, '¿Puede cambiar de tamaño?'], ['Una olla sellada que se calienta', 1, '¿Puede cambiar de tamaño?']), bien: 'Flexible o rígido.' },
      'Los globos cambian de tamaño y quedan con la presión de afuera; la lata y la olla son rígidas.', 'Pregunta si las paredes del recipiente pueden moverse.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: JERINGA, nums: [2, 3, 5], pregunta: 'Queda en pie', queda: 'La presión viene de los choques de las partículas.',
      ...T(['Si el volumen baja a la mitad, la presión también.', [1, 2], 'Busca qué le pasa a la presión con la mitad del volumen.'], ['En el congelador el globo crece.', [4, 5], 'Busca qué le pasa al globo.'], ['Al calentar una lata, su volumen crece.', 8, 'Busca qué no puede cambiar.']), bien: 'Se duplica, se encoge y no puede.' },
      'La presión se duplica, el globo se encoge y en la lata el volumen no puede cambiar.', 'Saca la palabra clave: mitad, congelador, lata.'),
    x('lee-escala', 'La gráfica muestra el volumen de un globo (en mL) a 280, 320 y 360 K. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [700, 800, 900], rot: ['280 K', '320 K', '360 K'], hi: 1000, st: 200, et: ['280 K', '320 K', '360 K', 'aumentó'], ops: ['', '', ''], metas: ['700', '800', '900', '200'], fichas: ['700', '800', '900', '200', '650', '850', '1600'],
      mira: ['Está a mitad de camino entre 600 y 800.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 800 y 1 000.', 'Resta el primero al último.'], trampas: { '0:650': 'Cada línea vale 200: la mitad son 100.', '2:850': 'Cada línea vale 200: la mitad son 100.', '3:1600': 'Eso es la suma.' }, ok: 'Cada 40 K, 100 mL más.' },
      'Las líneas van de 200 en 200: 700, 800 y 900. Aumentó 200 mL.', 'Mira cuánto vale cada línea antes de leer.'),
    x('sube-gas', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un gas a **5 atm** ocupa **8 L**. ¿Cuántos **litros** ocupa a **2 atm**, con la misma temperatura?', r: 20, c: '5 \\cdot 8 \\div 2', e: { 16: 'El producto 5 por 8 debe conservarse.' } },
      { q: 'Una lata está a **30** unidades de presión y **300 K**. ¿Cuál es su **presión** a **600 K**?', r: 60, c: '30 \\cdot 2', e: { 30: 'Al calentarse, la presión sube.' } },
      { q: '¿Cuántos **grados Celsius** son **353 K**?', r: 80, c: '353 - 273', e: {} }] },
      '$40 \\div 2 = 20$ L; el doble de kelvin es el doble de presión, 60; y $353 - 273 = 80$.', 'Mira qué queda fijo en cada caso antes de calcular.'),
    sol('Un gas ocupa 4 L a 27 °C. Con la misma presión se calienta a 177 °C. ¿Qué volumen ocupa?', ['27 °C son [[300]] K', '177 °C son [[450]] K', 'El volumen es $4 \\cdot 1.5 =$ [[6]] L'], ['327', '26', '8'], '$\\tfrac{450}{300} = 1.5$: el volumen crece a 6 L.', 'Pasa las temperaturas a kelvin antes de comparar.'),
    err('Un globo de 2 L pasa de 20 °C a 40 °C con la misma presión.', ['Con presión fija, al calentarse el globo crece', 'La temperatura se duplicó', 'El volumen crece en la misma proporción que los kelvin'], 1, ['En kelvin pasó de 293 a 313: un 7 % más', 'La temperatura no cambió', 'La temperatura se redujo a la mitad'], 'La proporción vale en kelvin: el globo crece un 7 %.', '¿En qué unidad se comparan las temperaturas?'),
    opc('Se tapa una jeringa con 20 mL de aire y se empuja hasta 5 mL, sin que cambie la temperatura. La presión del aire:', ['Se reduce a la cuarta parte', 'No cambia', 'Se duplica', 'Se hace cuatro veces mayor'], 3, 'El volumen es la cuarta parte: la presión, cuatro veces mayor.', 'El producto no cambia: compara los volúmenes.'),
  ]);

  const SUERO = {
    id: 'icf-suero', title: 'El suero de la abuela',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Abril de 2026' },
    paras: [
      'Una disolución tiene un soluto, lo que se disuelve, y un solvente, lo que disuelve. La concentración dice cuánto soluto hay en cierta cantidad de disolución. No es lo mismo tener mucho soluto que estar muy concentrada: una piscina tiene más sal que una cucharada de salmuera y, sin embargo, está menos salada.',
      'Hay varias formas de medirla. El porcentaje en masa compara los gramos de soluto con cien gramos de disolución; los gramos por litro, con un litro; la molaridad compara los moles de soluto con los litros de disolución. Para cantidades muy pequeñas se usan las partes por millón: un miligramo en un kilogramo. Una cifra sin su unidad no dice nada: cinco puede ser mucho o casi nada.',
      'La abuela de Tania prepara suero casero: un litro de agua hervida, seis cucharaditas rasas de azúcar y media de sal. «Con más sal es peligroso», advierte. Tiene razón: un suero muy concentrado saca agua de las células en vez de dársela.',
      'Diluir es agregar solvente. El soluto no cambia; se reparte en más volumen y la concentración baja. Si a un litro con 10 gramos se le agrega otro litro de agua, quedan 10 gramos en dos litros: cinco por litro. Por eso el producto de la concentración por el volumen es el mismo antes y después.',
      'También se puede concentrar: al evaporar agua, el soluto se queda y la concentración sube. Si se sacan unas gotas de la disolución, en cambio, la concentración no cambia: sale soluto y sale solvente en la misma proporción. Una cucharada de suero está tan salada como la jarra entera.',
      'El agua de los acueductos se trata con cloro: queda entre 0.3 y 2 partes por millón. Con menos, sobreviven microbios; con más, molesta y puede hacer daño. Por eso se mide varias veces al día, en la planta y en las casas. En la etiqueta de un remedio, un cero de más puede convertirlo en veneno.',
    ],
  };
  const l2 = leccion('icf-cn-gases-2', 'Concentración', guion(
    ['Concentración', 'Cuánto soluto hay en cierta cantidad de disolución.'],
    ['Unidades', 'Porcentaje, gramos por litro, molaridad y partes por millón.'],
    ['Diluir', 'Se agrega solvente: el soluto es el mismo.'],
    ['Sacar un poco', 'La concentración no cambia.']), [
    x('concentra-agua', 'Hay **30 g** de azúcar. Mueve el volumen de la disolución para que quede a **20 g por litro**.', { g: 30, meta: 20, max: 3, paso: 0.25 },
      'Los gramos entre la concentración: $30 \\div 20 = 1.5$ litros.', 'Cada litro debe llevar 20 gramos: ¿para cuánto alcanza?'),
    x('diluye-agua', 'Hay **2 L** a **15 g/L**. Mueve el agua que hay que **agregar** para que quede a **5 g/L**.', { V: 2, C: 15, C2: 5, max: 8, paso: 0.5 },
      'Hay 30 g: a 5 g/L llenan 6 L. Se agregan 4 L.', 'Halla cuántos gramos hay y cuántos litros deben ser al final.'),
    x('concentracion-tabla', 'Pon la concentración de cada disolución.', { et: ['12 g en 3 L', '5 g de sal en 50 g de disolución', '0.5 mol en 0.25 L', '4 mg en 2 kg'], metas: ['4 g/L', '10 %', '2 mol/L', '2 ppm'], fichas: ['4 g/L', '10 %', '2 mol/L', '2 ppm', '36 g/L', '5 %', '0.125 mol/L'], mira: ['Divide los gramos entre los litros.', 'Compara con cien gramos.', 'Divide los moles entre los litros.', 'Cada parte por millón es 1 mg por kg.'], trampas: { '0:36 g/L': 'Multiplicaste: se divide entre los litros.', '1:5 %': 'Son 5 de 50, no de 100.', '2:0.125 mol/L': 'Multiplicaste: se divide entre los litros.' }, ok: 'Soluto entre disolución.' },
      '$12 \\div 3 = 4$; $5 \\div 50 = 10\\%$; $0.5 \\div 0.25 = 2$; y 2 mg por kg.', 'Siempre se divide el soluto entre la disolución.'),
    x('mas-o-menos-concentrada', '¿Qué le pasa a la **concentración**?', { et: ['se agrega agua', 'se evapora agua', 'se saca la mitad del jugo', 'se agrega y disuelve azúcar'], metas: ['baja', 'sube', 'no cambia', 'sube'], fichas: ['baja', 'sube', 'no cambia', 'sube', 'baja', 'no cambia'], mira: ['El mismo soluto en más volumen.', 'El mismo soluto en menos volumen.', 'Sale soluto y sale solvente.', 'Más soluto en casi el mismo volumen.'], trampas: { '2:baja': 'Queda menos jugo, pero igual de dulce.' }, ok: 'Soluto y solvente.' },
      'Con agua baja, al evaporar o agregar soluto sube y al sacar un poco no cambia.', 'Pregunta qué pasó con el soluto y qué con el solvente.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: SUERO, nums: [1, 4, 5], pregunta: 'Queda en pie', queda: 'Al evaporar agua, la concentración sube.',
      ...T(['Lo que tiene más soluto siempre está más concentrado.', 2, 'Busca la piscina.'], ['Al diluir se pierde soluto.', [4, 5], 'Busca qué no cambia.'], ['Una cucharada de suero está menos salada que la jarra.', [8, 9], 'Busca la comparación con la jarra.']), bien: 'La piscina, no cambia y tan salada.' },
      'La piscina tiene más sal y está menos salada, el soluto no cambia y la cucharada está igual.', 'Saca la palabra clave: más soluto, diluir, cucharada.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: SUERO, nums: [3, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El suero lleva media cucharadita de sal por litro.', 0, 'Léela junto a la receta.'], ['Para dos litros hacen falta doce cucharaditas de azúcar.', 1, 'Usa la receta con el doble de agua.'], ['Un agua con 3 partes por millón de cloro tiene demasiado.', 1, 'Compara con el intervalo.'], ['La abuela vive en un pueblo con río.', 2, '¿Se dice dónde vive?']),
      luz: [[3, 'media de sal'], [3, 'seis cucharaditas rasas'], [6, 'entre 0.3 y 2 partes por millón']], bien: 'Proporción y comparación.' },
      'La sal está escrita; las doce y las 3 partes se deducen; el pueblo no aparece.', 'Usa la receta y el intervalo con otros números.'),
    x('balanza-tesis', 'Hipótesis: «la planta murió por un abono muy concentrado». ¿Qué hace cada dato?', { doc: SUERO, tesis: 'Murió por un abono muy concentrado',
      ...F(['Las plantas con el abono diluido siguen sanas.', 0, '¿Qué pasa al bajar la concentración?'], ['Las plantas sin abono también murieron.', 1, '¿Hizo falta el abono?'], ['La maceta es redonda.', 2, '¿Cambia la concentración?']), bien: 'Comparar con y sin.' },
      'Las diluidas la apoyan; las que no tenían abono la debilitan; la maceta no pesa.', 'Compara lo que pasa al quitar o bajar la causa.'),
    sol('Se mezclan 1 L de jugo con 40 g de azúcar y 3 L de agua. ¿Cómo queda?', ['El azúcar sigue siendo [[40]] g', 'El volumen es [[4]] L', 'La concentración es [[10]] g/L'], ['3', '13.3', '160'], '$40 \\div 4 = 10$ g/L.', 'El azúcar no cambia: cambia el volumen.'),
    err('Alguien prepara una disolución de sal al 10 % en masa.', ['Pesa 10 g de sal', 'Pesa 100 g de agua', 'Mezcla hasta que se disuelva'], 1, ['Pesa 90 g de agua, para 100 g de disolución', 'Pesa 10 g de agua', 'Pesa 1 000 g de agua'], 'Con 100 g de agua serían 110 g de disolución: 9.1 %.', '¿El porcentaje es del agua o de toda la disolución?'),
    opc('De una jarra con suero se sirve la mitad en un vaso. La concentración del suero del vaso:', ['Es la misma que la de la jarra', 'Es la mitad', 'Es el doble', 'No se puede comparar'], 0, 'Sale soluto y solvente en la misma proporción.', 'Piensa si el vaso queda más o menos salado.'),
  ]);

  const BUZO = {
    id: 'icf-buzo', title: 'El aire del buzo',
    paras: [
      'En la superficie, el aire nos aprieta con una atmósfera de presión. Bajo el agua, cada diez metros agregan otra: a diez metros hay dos; a veinte, tres.',
      'Un globo lleno de aire que baja se encoge. Si se llena a diez metros y se suelta, crece al subir y puede reventar. Por eso un buzo nunca debe contener la respiración mientras asciende.',
      'Con más presión, más gas se disuelve en la sangre. A gran profundidad, el nitrógeno del aire se disuelve en el cuerpo del buzo.',
      'Si sube muy rápido, la presión baja de golpe y ese nitrógeno deja de estar disuelto: forma burbujas, como al destapar una gaseosa. Es muy peligroso.',
      'La solución es subir despacio y hacer paradas, para que el gas salga poco a poco por los pulmones. Las tablas dicen cuánto esperar según la profundidad y el tiempo.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BUZO, ...p }, e, { hint: h });
  return mundo('icf-cn-gases', 'Gases y Disoluciones', 'ciencias', [l1, l2], [
    ['icf-cn-gases-1', 'A más presión, menos volumen.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Cuánta presión hay a veinte metros?', [1]], ['¿Por qué no contener la respiración?', [2]], ['¿Para qué se hacen paradas?', [5]]] }, 'La presión está en el 1, la respiración en el 2 y las paradas en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-gases-1', 'Cada diez metros, una atmósfera más.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['A diez metros hay dos atmósferas.', 0], ['A treinta metros hay cuatro atmósferas.', 1], ['El aire de los pulmones crece al subir.', 1], ['El mar estaba a 20 °C.', 2]] }, 'Las dos atmósferas están escritas; las cuatro y los pulmones se deducen; la temperatura no aparece.', 'Usa la regla de los diez metros y el ejemplo del globo.')],
    ['icf-cn-gases-1', 'Presión por volumen no cambia.', opc('Un globo tiene 6 L en la superficie. A 20 metros, con la misma temperatura, ocupa:', ['18 L', '6 L', '2 L', '3 L'], 2, 'A 20 m hay 3 atmósferas: $6 \\div 3 = 2$ L.', 'Halla cuántas atmósferas hay a esa profundidad.')],
    ['icf-cn-gases-2', 'Con más presión se disuelve más gas.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Al bajar la presión, el gas disuelto se escapa.', cards: [['La gaseosa que burbujea al destaparla', true], ['La champaña que suelta gas al abrirla', true], ['El agua que se congela', false], ['La sal que queda al evaporar', false]] }, 'Gaseosa y champaña sueltan gas al bajar la presión; las otras no.', 'Busca casos en que se abre algo que estaba a presión.')],
    ['icf-cn-gases-2', 'El gas disuelto sale poco a poco.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del buzo se dice todo esto, EXCEPTO:', cards: [['No debe contener la respiración al subir', [2]], ['Se le disuelve nitrógeno', [3]], ['Debe hacer paradas', [5]], ['Debe beber gaseosa', null]] }, 'Las tres primeras están en el 2, el 3 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-gases-2', 'Más tiempo y más hondo: más gas disuelto.', opc('Si la sangre de un buzo tiene 6 mg de nitrógeno por cada 0.3 L, su concentración es:', ['1.8 mg/L', '20 mg/L', '2 mg/L', '6.3 mg/L'], 1, 'Se dividen los miligramos entre los litros: $6 \\div 0.3 = 20$.', 'Divide el soluto entre el volumen.')],
  ]);
})());
