// Preicfes · Matemáticas · mundo 4 «Áreas y Volúmenes» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-medida-1', 'Perímetro y área', guion(
    ['Borde y superficie', 'El perímetro es lo que mide el borde, en metros. El área es lo que se cubre, en metros cuadrados.'],
    ['Medio rectángulo', 'Un triángulo ocupa la mitad del rectángulo de su base y su altura.'],
    ['Promedio de bases', 'Un trapecio ocupa lo mismo que un rectángulo con el promedio de sus bases.'],
    ['Mismo borde, otra área', 'Un marco que se inclina conserva el perímetro y pierde área.']), [
    x('misma-area', 'Sube el vértice hasta que el triángulo ocupe **lo mismo** que el rectángulo.', { w: 9, H: 4, b: 12 },
      'El rectángulo vale $9 \\cdot 4 = 36$. El triángulo, $\\tfrac{12 \\cdot h}{2} = 36$: la altura es 6.', 'Halla el área del rectángulo; el triángulo es la mitad de base por altura.'),
    x('inclina-marco', 'Un marco de varillas de 8 y 5 se puede inclinar. Acuéstalo hasta que encierre un área de **32**.', { b: 8, l: 5, area: 32 },
      'Base por altura: $32 \\div 8 = 4$ de altura. La varilla de 5 es la hipotenusa: se corre 3, porque $3^2 + 4^2 = 5^2$.', 'La base no cambia: ¿qué altura debe quedar para esa área?'),
    x('trapecio-gemelo', 'Las dos figuras tienen la misma altura. Estira el rectángulo hasta que ocupe **lo mismo** que el trapecio.', { B: 13, b: 7 },
      'El trapecio vale el promedio de sus bases por la altura: $\\tfrac{13 + 7}{2} = 10$.', 'Busca el número que está a mitad de camino entre las dos bases.'),
    x('rombo-diagonales', 'Una cometa con forma de rombo tiene una diagonal de 6. Estira la otra hasta que el área sea **36**.', { d: 6, area: 36 },
      'El rombo es la mitad de la caja: $\\tfrac{6 \\cdot D}{2} = 36$ da $D = 12$.', 'El rombo ocupa la mitad del rectángulo que forman sus diagonales.'),
    x('vertice-lejos', 'La base está **parada** y mide 6. Mueve el vértice hasta que el triángulo tenga área **21**.', { base: 6, area: 21 },
      '$\\tfrac{6 \\cdot h}{2} = 21$ da $h = 7$: el vértice debe alejarse 7 cuadros de la base.', 'La altura es la distancia del vértice a la base, aunque la base esté parada.'),
    x('caja-torcida', 'El lote T está torcido. Pon el área de las tres esquinas que sobran en la caja y la de T.', { w: 8, h: 6, ya: 2, xc: 6, fichas: ['8', '6', '12', '22', '24', '16', '26'] },
      'La caja vale $8 \\cdot 6 = 48$ y las esquinas, $8 + 6 + 12 = 26$: quedan 22.', 'Cada esquina es un triángulo rectángulo. Réstalas de la caja.'),
    x('llena-lanza', 'Lanza la pintura justa para cubrir lo sombreado. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un cuadrado de lado 5 con un hueco de 2 por 3', f: { w: 5, h: 5, hueco: [2, 3] }, r: 19, c: '25 - 6', e: { 25: 'Falta quitar el hueco.' } },
      { q: 'Un triángulo de base 10 y altura 4 con un hueco de 2 por 1', f: { w: 10, h: 4, tri: true, hueco: [2, 1] }, r: 18, c: '20 - 2', e: { 20: 'Falta quitar el hueco.', 38: 'El triángulo vale la mitad de base por altura.' } },
      { q: 'Un rectángulo de 9 por 4 sin dos esquinas de catetos 3 y 4', f: { w: 9, h: 4, esq: 3 }, r: 24, c: '36 - 6 - 6', e: { 12: 'Cada esquina es medio rectángulo.', 30: 'Son dos esquinas.' } }] },
      '$25 - 6 = 19$; $\\tfrac{10 \\cdot 4}{2} - 2 = 18$; $36 - 2 \\cdot \\tfrac{3 \\cdot 4}{2} = 24$.', 'Halla la figura completa y quita lo que no se pinta.'),
    sol('Una huerta rectangular mide 15 m de largo y 8 m de ancho. Se cerca con tres vueltas de alambre y cada metro vale 2 mil pesos. ¿Cuánto cuesta, en miles?', ['El perímetro es $2 \\cdot (15 + 8) =$ [[46]] m', 'Tres vueltas son $3 \\cdot 46 =$ [[138]] m', 'Cuesta $138 \\cdot 2 =$ [[276]] mil'], ['120', '23', '69'], 'Cercar usa el borde, no el área: 46 m por vuelta, 138 m en total.', '¿Se cubre la huerta o se rodea?'),
    err('A un terreno cuadrado de 10 m de lado se le duplican los lados. ¿Qué pasa con su área?', ['El área era $10 \\cdot 10 = 100$', 'Los lados nuevos miden 20 m', 'El área se duplica: 200'], 2, ['El área se cuadruplica: 400', 'El área no cambia: 100', 'El área aumenta 20: 120'], '$20 \\cdot 20 = 400$, cuatro veces la de antes: al duplicar los lados, el área se multiplica por $2^2$.', 'Calcula el área con los lados nuevos.'),
    opc('Dos rectángulos tienen el mismo perímetro, 24 m. Uno mide 11 por 1 y el otro, 6 por 6. Es correcto afirmar que:', ['Tienen la misma área, porque el borde es igual', 'El primero tiene mayor área por ser más largo', 'No se pueden comparar', 'El segundo tiene mayor área: 36 contra 11'], 3, '$11 \\cdot 1 = 11$ y $6 \\cdot 6 = 36$: con el mismo borde, el cuadrado encierra más.', 'Calcula las dos áreas: el perímetro no las decide.'),
  ]);

  const l2 = leccion('icf-ma-medida-2', 'Figuras compuestas y círculos', guion(
    ['Cortar o quitar', 'Una figura rara se corta en piezas conocidas, o se completa y se quita lo que sobra.'],
    ['El círculo', 'Borde: $2\\pi r$. Área: $\\pi r^2$. Una vuelta de rueda avanza su borde.'],
    ['Partes del círculo', 'Un arco o un sector es la misma fracción que su ángulo de 360°.'],
    ['Anillos y andenes', 'Son lo de afuera menos lo de adentro.']), [
    x('radio-area', 'Una pista circular ocupa $49\\pi$ m². Arrastra el borde hasta su radio.', { area: 49 },
      '$\\pi r^2 = 49\\pi$ da $r^2 = 49$: el radio es 7.', 'El área es π por el radio al cuadrado: ¿qué número al cuadrado sirve?'),
    x('arco-justo', 'El radio mide 6. Abre el sector hasta que su **borde curvo** mida $4\\pi$.', { r: 6, arco: 4 },
      'El borde entero mide $12\\pi$; $4\\pi$ es un tercio de la vuelta: 120°.', 'Compara el arco con el borde completo del círculo.'),
    x('borde-mixto', 'Una ventana es un rectángulo de 4 por 9 con medio círculo encima. ¿Cuánto mide su **borde**?', { w: 4, h: 9, fichas: ['2π', '4π', '22', '26', '22 + 2π', '26 + 2π'] },
      'Por fuera hay dos lados de 9 y uno de 4: 22. La curva es media circunferencia de radio 2: $2\\pi$.', 'Recorre el borde con el dedo: la unión del rectángulo con el arco no se cuenta.'),
    x('marco-hueco', 'A una lámina de 10 por 8 se le abre un hueco **cuadrado**. Ajústalo hasta que queden **64** cuadros.', { w: 10, h: 8, area: 64 },
      'La lámina vale 80; se quitan 16, un cuadrado de lado 4.', 'Resta lo que debe quedar del total: eso mide el hueco.'),
    x('anillo-justo', 'A un disco de radio 6 se le abre un hueco redondo. Ajústalo hasta que el **área** del anillo sea $20\\pi$.', { R: 6, area: 20 },
      '$36\\pi - 20\\pi = 16\\pi$: el radio del hueco es 4.', 'El anillo es lo que queda al restar áreas: no restes los radios.'),
    x('techo-justo', 'La fachada, con techo y todo, debe medir **32** cuadros. Mueve la punta del techo.', { w: 8, h: 3, area: 32 },
      'La pared vale 24; al techo le tocan 8. $\\tfrac{8 \\cdot h}{2} = 8$ da $h = 2$.', 'Quita la pared del total y mira qué triángulo falta.'),
    x('anden-ancho', 'Una cancha de 5 por 4 lleva un andén parejo por todo el borde. Ensánchalo hasta que **el andén** mida **36**.', { w: 5, h: 4, area: 36 },
      'Andén y cancha suman 56, un rectángulo de 8 por 7: creció 1.5 por cada lado.', 'Suma el andén a la cancha y busca el rectángulo grande.'),
    x('rueda-lanza', 'Dale a la rueda las vueltas justas para parar en la bandera. Puedes fallar **una** vez.', { tiros: [
      { q: 'La rueda tiene **radio** 3 y debe avanzar $24\\pi$', d: 'radio 3', m: '24π', r: 4, c: '24\\pi \\div 6\\pi', e: { 8: 'Usaste el radio: una vuelta mide dos radios por π.' } },
      { q: 'La rueda tiene **diámetro** 4 y debe avanzar $20\\pi$', d: 'diámetro 4', m: '20π', r: 5, c: '20\\pi \\div 4\\pi' },
      { q: 'La rueda tiene **radio** 1 y debe avanzar $12\\pi$', d: 'radio 1', m: '12π', r: 6, c: '12\\pi \\div 2\\pi', e: { 12: 'Usaste el radio: una vuelta mide dos radios por π.' } }] },
      'Una vuelta avanza $2\\pi r$: $24 \\div 6 = 4$, $20 \\div 4 = 5$ y $12 \\div 2 = 6$.', 'Halla cuánto avanza en una vuelta y mira cuántas caben.'),
    sol('Una piscina rectangular de 6 m por 4 m tiene en un extremo medio círculo cuyo diámetro es el lado de 4 m. ¿Cuál es su área?', ['El rectángulo mide $6 \\cdot 4 =$ [[24]] m²', 'El radio del medio círculo es [[2]] m', 'Medio círculo mide $\\tfrac{4\\pi}{2} =$ [[2π]]', 'En total: [[24 + 2π]] m²'], ['4', '4π', '28'], 'El diámetro es 4, así que el radio es 2: medio círculo vale $2\\pi$.', 'El lado de 4 es el diámetro, no el radio.'),
    err('Una glorieta tiene radio 5 m y un jardín central de radio 3 m. ¿Cuánto mide la vía?', ['El círculo grande mide $25\\pi$', 'El jardín mide $9\\pi$', 'La vía mide $\\pi \\cdot (5 - 3)^2 = 4\\pi$'], 2, ['La vía mide $25\\pi - 9\\pi = 16\\pi$', 'La vía mide $25\\pi + 9\\pi = 34\\pi$', 'La vía mide $10\\pi - 6\\pi = 4\\pi$'], 'Se restan las áreas: $16\\pi$ m². Restar los radios y elevar al cuadrado no da lo mismo.', 'Ya están las dos áreas: ¿qué se hace con ellas?'),
    opc('Una pizza de 20 cm de radio se corta en 8 porciones iguales. El área de una porción, en cm², es:', ['$5\\pi$', '$50\\pi$', '$400\\pi$', '$40\\pi$'], 1, 'La pizza mide $400\\pi$; la octava parte, $50\\pi$.', 'Halla el área completa y repártela en 8.'),
  ]);

  const l3 = leccion('icf-ma-medida-3', 'Volumen y capacidad', guion(
    ['Capas', 'Un prisma o un cilindro es su base repetida: volumen = área de la base por altura.'],
    ['Un tercio', 'Un cono o una pirámide llenan la tercera parte del cilindro o prisma de igual base y altura.'],
    ['Piel', 'La superficie se suma cara por cara.'],
    ['Litros', 'Un metro cúbico son 1 000 litros; un decímetro cúbico, uno.']), [
    x('capas-caja', 'La base de la caja es de 3 por 5. Apila capas hasta tener **90** cubitos.', { a: 3, b: 5, vol: 90 },
      'Cada capa tiene 15 cubitos: $90 \\div 15 = 6$ capas.', 'Cuenta los cubitos de una sola capa y mira cuántas hacen falta.'),
    x('cilindro-altura', 'Un tarro cilíndrico de radio 3 debe contener $72\\pi$. Dale su altura.', { r: 3, vol: 72 },
      'La base vale $9\\pi$ y $72 \\div 9 = 8$: el tarro mide 8 de alto.', 'Halla el área de la base redonda y mira cuántas veces cabe.'),
    x('cono-agua', 'El **cono** lleno se vacía en el cilindro de igual base y altura. Marca hasta dónde sube el agua.', { conos: 1, h: 12 },
      'Un cono llena un tercio del cilindro: $12 \\div 3 = 4$.', 'Recuerda cuántos conos caben en el cilindro.'),
    x('piramide-altura', 'La base de la pirámide es un cuadrado de lado 3. Súbela hasta que su volumen sea **27**.', { a: 3, vol: 27 },
      '$\\tfrac13 \\cdot 9 \\cdot h = 3h = 27$ da $h = 9$.', 'La pirámide es la tercera parte del prisma de igual base y altura.'),
    x('caras-caja', 'Una caja de zapatos mide 5 por 4 de base y 2 de alto. Pon el área de cada cara y la de **toda** la piel.', { a: 5, b: 4, h: 2, fichas: ['20', '10', '8', '76', '38', '11'] },
      'Tapa 20, frente 10, costado 8; cada una dos veces: $2 \\cdot 38 = 76$.', 'Hay tres clases de cara y de cada una, dos.'),
    x('cubo-arista', 'Para forrar un cubo se usan **96** cm² de papel. Dale su arista.', { sup: 96 },
      'Son seis caras: $96 \\div 6 = 16$, y la arista es 4 cm.', 'Reparte el papel entre las caras y busca el lado del cuadrado.'),
    x('litros-nivel', 'Un tanque tiene fondo de 4 m por 2 m. Se le echan **12 000 litros**. ¿Hasta qué altura sube el agua?', { a: 4, b: 2, litros: 12000 },
      'Son 12 m³; el fondo mide 8 m²: $12 \\div 8 = 1.5$ m.', 'Pasa los litros a metros cúbicos: cada uno tiene mil.'),
    x('llena-tanque', 'Bombea el agua justa, contada en π, para llenar cada recipiente. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un **cilindro** de radio 3 y altura 4', t: 'cil', rad: 3, h: 4, r: 36, c: '9\\pi \\cdot 4', e: { 12: 'La base es r por r, no r.' } },
      { q: 'Un **cono** de radio 2 y altura 6', t: 'cono', rad: 2, h: 6, r: 8, c: '\\tfrac13 \\cdot 4\\pi \\cdot 6', e: { 24: 'Ese es el cilindro; el cono es la tercera parte.' } },
      { q: 'Una **esfera** que cabe justa en un cilindro de $36\\pi$', t: 'esf', cilindro: 36, r: 24, c: '\\tfrac23 \\cdot 36\\pi', e: { 12: 'Un tercio es el cono; la esfera es el doble.' } }] },
      '$9 \\cdot 4 = 36$; $\\tfrac13 \\cdot 24 = 8$; dos tercios de 36 son 24.', 'Cilindro: base por altura. Cono: un tercio. Esfera: dos tercios del cilindro justo.'),
    sol('Una pecera mide 50 cm de largo, 30 cm de ancho y 40 cm de alto. Se llena hasta las tres cuartas partes. ¿Cuántos litros tiene?', ['El volumen es $50 \\cdot 30 \\cdot 40 =$ [[60 000]] cm³', 'Tres cuartas partes son [[45 000]] cm³', 'Cada litro son 1 000 cm³: tiene [[45]] litros'], ['20 000', '15', '450'], '$45\\,000 \\div 1\\,000 = 45$ litros.', 'Halla el volumen, saca las tres cuartas partes y pasa a litros.'),
    err('Se duplica la arista de un cubo de 3 cm. ¿Qué pasa con su volumen?', ['El volumen era $3^3 = 27$', 'La arista nueva mide 6 cm', 'El volumen se duplica: 54'], 2, ['El volumen se multiplica por 8: 216', 'El volumen se multiplica por 4: 108', 'El volumen no cambia: 27'], '$6^3 = 216$, ocho veces 27: crecen las tres medidas.', 'Calcula el volumen con la arista nueva.'),
    opc('Un vaso cilíndrico y un cono tienen la misma base y la misma altura. Si el cono se llena y se vacía en el vaso, ¿cuántas veces hay que hacerlo para llenarlo?', ['2', '1', '4', '3'], 3, 'El cono es la tercera parte del cilindro: tres veces.', 'Recuerda qué parte del cilindro llena el cono.'),
  ]);

  return mundo('icf-ma-medida', 'Áreas y Volúmenes', 'matematicas', [l1, l2, l3], [
    ['icf-ma-medida-1', 'Un paralelogramo mide base por altura, no base por lado.', play('corta-paralelogramo', 'Dale al paralelogramo la base para que su área sea 24', { rounds: [{ h: 3, slant: 5, target: 24 }] }, '$24 \\div 3 = 8$: se usa la altura, no el lado inclinado.', { hint: 'Al cortar y mover una punta queda un rectángulo.' })],
    ['icf-ma-medida-1', 'Un triángulo es la mitad de base por altura.', play('triangulo-cuadricula', 'Con base 6, mueve el vértice para que el área sea 12', { rounds: [{ b: 6, target: 12 }] }, '$\\tfrac{6 \\cdot h}{2} = 12$ da $h = 4$.', { hint: 'La altura es la distancia del vértice a la base.' })],
    ['icf-ma-medida-1', 'Rodear usa el perímetro; cubrir, el área.', opc('Para embaldosar una sala de 6 m por 4 m con baldosas de medio metro de lado se necesitan:', ['24 baldosas', '48 baldosas', '96 baldosas', '20 baldosas'], 2, 'La sala mide 24 m² y cada baldosa 0.25 m²: $24 \\div 0.25 = 96$.', 'En cada metro cuadrado caben cuatro baldosas.')],
    ['icf-ma-medida-2', 'El área del círculo es π por el radio al cuadrado.', play('mide-circulo', 'Ajusta el radio para que el área sea 16π', { rounds: [{ ask: 'A', target: 16 }] }, '$r^2 = 16$: el radio es 4.', { hint: 'Busca un número que al cuadrado dé 16.' })],
    ['icf-ma-medida-2', 'Lo sombreado es lo de afuera menos lo de adentro.', play('sombreado-resta', 'Ajusta el cuadrado de adentro para que queden 33', { rounds: [{ s: 7, kind: 'sq', target: 33 }] }, '$49 - 33 = 16$: un cuadrado de lado 4.', { hint: 'Resta lo que debe quedar del cuadrado grande.' })],
    ['icf-ma-medida-2', 'Una vuelta de rueda avanza su borde.', opc('Una rueda de 50 cm de diámetro da 10 vueltas. La distancia que avanza, en cm, es:', ['$500\\pi$', '$250\\pi$', '$1\\,000\\pi$', '$50\\pi$'], 0, 'Cada vuelta avanza $50\\pi$; diez, $500\\pi$.', 'El borde es π por el diámetro.')],
    ['icf-ma-medida-3', 'Volumen: área de la base por altura.', play('prisma-capas', 'Apila capas en el cilindro de radio 2 hasta 20π', { rounds: [{ base: 'circ', dims: [2], target: 20 }] }, 'La base vale $4\\pi$: cinco capas.', { hint: 'Halla el área de la base redonda.' })],
    ['icf-ma-medida-3', 'Pirámide y cono: la tercera parte.', play('cono-tercio', 'La base es de 3 por 5. Dale altura para que el volumen sea 20', { rounds: [{ base: 'rect', dims: [3, 5], target: 20 }] }, '$\\tfrac{15 \\cdot h}{3} = 5h = 20$ da 4.', { hint: 'Es la tercera parte de la caja de igual base y altura.' })],
    ['icf-ma-medida-3', 'Un metro cúbico son mil litros.', opc('Una alberca cuyo piso mide 2 m por 1.5 m tiene agua hasta 0.5 m de altura. ¿Cuántos litros hay?', ['150', '15 000', '3 000', '1 500'], 3, '$2 \\cdot 1.5 \\cdot 0.5 = 1.5$ m³, que son 1 500 litros.', 'Halla los metros cúbicos y multiplica por mil.')],
  ]);
})());
