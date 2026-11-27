// Geometría Euclidiana · mundo 7 «euc-areas» (spec 2026-11-26-curso-euclidiana): áreas básicas, relaciones entre áreas y áreas
// sombreadas. Juegos propios en js/games/euc-escena-7.js; los demás, del catálogo de geometría con datos nuevos.
EUC_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = EUC;

  // ------------------------------------------------------------------------------------------------------- 1 · Áreas básicas
  const l1 = leccion('euc-areas-1', 'Áreas básicas', guion(
    ['Medir un área', 'Medir un área es contar cuántos cuadrados unidad caben en la figura. Dos figuras con la misma área se llaman **equivalentes**, aunque no tengan la misma forma.'],
    ['De base por altura', 'El rectángulo y el paralelogramo valen base por altura; el triángulo, la mitad. Si solo se conocen los tres lados, la fórmula de Herón usa el semiperímetro $p$: $\\sqrt{p(p-a)(p-b)(p-c)}$.'],
    ['Rombo y trapecio', 'El rombo vale el semiproducto de sus diagonales, $\\tfrac{D \\cdot d}{2}$, y el trapecio la semisuma de las bases por la altura, $\\tfrac{(B + b) \\cdot h}{2}$.'],
    ['Polígono regular', 'Un polígono regular se parte en triángulos iguales desde el centro, con la apotema por altura: su área es el semiperímetro por la apotema. El triángulo equilátero de lado $l$ vale $\\tfrac{l^2\\sqrt3}{4}$.'],
    ['Círculo y sus partes', 'El círculo vale $\\pi r^2$. Al sector circular le toca la misma parte del área que su ángulo de la vuelta; el segmento circular es el sector menos el triángulo, y la corona, el círculo grande menos el chico.'],
  ), [
    x('misma-area', 'El rectángulo dorado mide **9 por 4**. Sube el vértice del triángulo de base **12** hasta que las dos figuras sean **equivalentes**.', { w: 9, H: 4, b: 12 },
      'El rectángulo vale $9 \\cdot 4 = 36$. El triángulo vale la mitad de base por altura: $\\tfrac{12 \\cdot h}{2} = 36$ da $h = 6$.', 'Equivalentes quiere decir con la misma área. Recuerda que el triángulo es la mitad de un paralelogramo.'),
    x('inclina-marco', 'Un marco articulado tiene base **11** y lados de **13**. Inclínalo hasta que el paralelogramo tenga área **132**.', { b: 11, l: 13, area: 132 },
      'El área es base por altura: $132 \\div 11 = 12$ de altura. Con el lado de 13, el corrimiento es $\\sqrt{13^2 - 12^2} = 5$.', 'Al inclinarlo los lados no cambian, pero la altura sí. Busca primero qué altura hace falta.'),
    x('trapecio-gemelo', 'El trapecio tiene bases **17** y **9**. Estira el rectángulo, de la misma altura, hasta que sean **equivalentes**.', { B: 17, b: 9 },
      'El trapecio vale la semisuma de las bases por la altura: $\\tfrac{17 + 9}{2} = 13$. Un rectángulo de base 13 y la misma altura tiene su misma área.', 'Lo que al trapecio le sobra abajo puede llenar lo que le falta arriba. ¿Qué base queda en el medio?'),
    x('rombo-diagonales', 'Una diagonal del rombo mide **10**. Estira la otra hasta que el área sea **65**.', { d: 10, area: 65 },
      'El rombo vale el semiproducto de sus diagonales: $\\tfrac{10 \\cdot D}{2} = 65$ da $D = 13$.', 'El rombo ocupa la mitad de la caja que forman sus dos diagonales. Piensa cuánto vale esa caja.'),
    x('heron-raiz', 'De un lote triangular solo se conocen los lados: **21**, **20** y **13**. Completa la fórmula de **Herón**: el semiperímetro $p$, las tres diferencias y el área.', {
      t: [21, 20, 13], et: ['p', 'p − 21', 'p − 20', 'p − 13', 'área'], metas: ['27', '6', '7', '14', '126'], fichas: ['27', '6', '7', '14', '126', '54', '252', '8'],
      mira: ['El semiperímetro es la mitad de la suma de los tres lados.', 'A p quítale el lado de 21.', 'A p quítale el lado de 20.', 'A p quítale el lado de 13.', 'El área es la raíz del producto de las cuatro casillas anteriores.'],
      trampas: { '0:54': 'Ese es el perímetro entero: p es la mitad.', '4:252': 'Eso es base por altura sin partir entre 2: el triángulo vale la mitad.' }, ok: 'La raíz de 27 · 6 · 7 · 14 es 126.' },
      'Semiperímetro: $p = \\tfrac{21 + 20 + 13}{2} = 27$. Área: $\\sqrt{27 \\cdot 6 \\cdot 7 \\cdot 14} = \\sqrt{15\\,876} = 126$.', 'Empieza por el semiperímetro, que es la mitad del perímetro. Las diferencias salen restándole cada lado.'),
    x('regular-apotema', 'Un hexágono regular tiene lado **8**. Pon su **semiperímetro**, su **apotema** y su **área**.', { l: 8, fichas: ['24', '4√3', '96√3', '48', '192√3', '8√3', '96'] },
      'Semiperímetro: $\\tfrac{6 \\cdot 8}{2} = 24$. La apotema es la altura de un equilátero de lado 8: $4\\sqrt3$. Área: $24 \\cdot 4\\sqrt3 = 96\\sqrt3$.', 'El hexágono regular está hecho de seis triángulos equiláteros. La apotema es la altura de uno de ellos.'),
    x('sector-area', 'En un círculo de radio **6**, abre el sector circular hasta que su área sea $8\\pi$.', { r: 6, area: 8 },
      'El círculo entero vale $36\\pi$. El sector es $\\tfrac{8}{36} = \\tfrac{2}{9}$ del círculo, y esa parte de la vuelta es $\\tfrac{2}{9} \\cdot 360^\\circ = 80^\\circ$.', 'Compara el área pedida con la del círculo entero: al sector le toca esa misma parte de los 360°.'),
    x('sube-distancia', 'Sube a la cantidad que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un trapecio tiene bases **9** y **5** y altura **6**. ¿Cuál es su área?', r: 42, c: '\\tfrac{(9 + 5) \\cdot 6}{2}', e: { 54: 'Multiplicaste la base mayor por la altura: va la semisuma de las dos bases.', 28: 'Sumaste las bases y las doblaste, pero falta la altura.' } },
      { q: 'Una corona circular tiene radios **8** y **5**. Su área es $k\\pi$: sube a $k$.', r: 39, c: '8^2 - 5^2', e: { 9: 'Restaste los radios y elevaste: se restan las áreas de los dos círculos.', 3: 'Esa es la diferencia de los radios, el ancho de la corona.' } },
      { q: 'Un sector circular de radio **12** abre $90^\\circ$. Su área es $k\\pi$: sube a $k$.', r: 36, c: '\\tfrac{90}{360} \\cdot 12^2', e: { 6: 'Con 6π mediste el arco. El área usa el radio por el radio.', 24: '24π es toda la circunferencia, 2πr; se pide un cuarto del área.' } },
    ] }, 'Trapecio: $\\tfrac{(9 + 5) \\cdot 6}{2} = 42$. Corona: $64\\pi - 25\\pi = 39\\pi$. Sector: un cuarto de $144\\pi$, es decir, $36\\pi$.', 'En el trapecio usa la semisuma de las bases; en la corona resta áreas; en el sector toma la parte de la vuelta.'),
    sol('Un mosaico tiene forma de hexágono regular de lado 4 cm. ¿Cuál es su área?', [
      'El hexágono regular se parte, desde su centro, en [[6]] triángulos equiláteros de lado 4 cm',
      'Cada equilátero vale $\\tfrac{l^2\\sqrt3}{4} = \\tfrac{16\\sqrt3}{4} =$ [[4√3]] cm²',
      'El hexágono vale $6 \\cdot 4\\sqrt3 =$ [[24√3]] cm²',
    ], ['16√3', '8√3', '4'], 'Seis equiláteros de lado 4: cada uno vale $\\tfrac{16\\sqrt3}{4} = 4\\sqrt3$ y entre todos $24\\sqrt3$ cm². Es lo mismo que semiperímetro por apotema: $12 \\cdot 2\\sqrt3$.', 'El radio de un hexágono regular mide lo mismo que su lado: por eso los seis triángulos son equiláteros.'),
    err('En un círculo de radio 6 cm, una cuerda subtiende un ángulo central de $90^\\circ$. ¿Cuál es el área del segmento circular menor que determina la cuerda?', [
      'El sector de $90^\\circ$ es un cuarto del círculo: $\\tfrac14 \\cdot 36\\pi = 9\\pi$ cm²',
      'Los dos radios y la cuerda forman un triángulo rectángulo: $\\tfrac{6 \\cdot 6}{2} = 18$ cm²',
      'El segmento es el sector más el triángulo: $9\\pi + 18$ cm²',
    ], 2, ['El segmento es el sector menos el triángulo: $9\\pi - 18$ cm²', 'El segmento es el triángulo menos el sector: $18 - 9\\pi$ cm²', 'El segmento es el círculo menos el triángulo: $36\\pi - 18$ cm²'],
    'El segmento circular es lo que queda entre la cuerda y el arco: al sector se le quita el triángulo de los dos radios. $9\\pi - 18$ cm².', 'Dibuja el sector y dentro de él el triángulo: ¿qué parte queda entre la cuerda y el arco?'),
    opc('Las diagonales de un rombo miden 16 cm y 12 cm. Su área y su perímetro son, en ese orden:', ['96 cm² y 40 cm', '192 cm² y 40 cm', '96 cm² y 56 cm', '192 cm² y 28 cm'], 0,
      'Área: $\\tfrac{16 \\cdot 12}{2} = 96$ cm². Las diagonales se cortan perpendicularmente en su punto medio: el lado es $\\sqrt{8^2 + 6^2} = 10$ y el perímetro, 40 cm.', 'El área sale del semiproducto de las diagonales; para el lado, mira el triángulo rectángulo que forman las medias diagonales.'),
  ]);

  // --------------------------------------------------------------------------------------------- 2 · Relaciones entre áreas
  const l2 = leccion('euc-areas-2', 'Relaciones entre áreas', guion(
    ['Misma altura, misma base', 'Dos triángulos con la misma altura tienen áreas proporcionales a sus bases; con la misma base, proporcionales a sus alturas.'],
    ['Entre paralelas', 'Si dos triángulos tienen la misma base y sus vértices opuestos están sobre una paralela a esa base, tienen la misma altura: son equivalentes.'],
    ['Las medianas', 'Una mediana parte el triángulo en dos triángulos equivalentes. Las tres medianas, que se cortan en el baricentro, lo parten en seis triángulos equivalentes.'],
    ['Figuras semejantes', 'Si dos figuras son semejantes con razón $k$, sus áreas están en razón $k^2$: lados al triple, área nueve veces mayor.'],
    ['Un ángulo congruente', 'Si dos triángulos tienen un ángulo congruente, sus áreas son entre sí como los productos de los lados que forman ese ángulo.'],
  ), [
    x('parte-base', 'La base BC mide **10**. Mueve D sobre ella hasta que el área de △ABD sea a la de △ADC como **3 es a 2**.', { L: 10, m: 3, n: 2, ap: 4 },
      'Los dos triángulos tienen la misma altura desde A, así que sus áreas son como sus bases: $BD : DC = 3 : 2$. De 10 unidades, $BD = \\tfrac{3}{5} \\cdot 10 = 6$.', 'Los dos triángulos comparten la altura que baja desde A. Entonces, ¿de qué depende cuál tiene más área?'),
    x('desliza-paralela', 'El triángulo dorado tiene base AB. Arrastra P hasta que △ABP sea **equivalente** al dorado y además **isósceles**, con $PA = PB$.', { a: 2, b: 8, c: [3, 5], tipo: 'iso' },
      'Para conservar el área sobre la misma base, P debe quedar a la misma altura, 5: sobre la paralela a AB por el vértice dorado. Y para que $PA = PB$, encima del punto medio de AB.', 'Si la base no cambia, lo único que decide el área es la altura. ¿Por dónde puede moverse P sin cambiarla?'),
    x('mediana-seis', 'El triángulo ABC tiene área **54**. Se trazan sus tres medianas, que se cortan en G. Pon el área de cada triángulo.', { area: 54, fichas: ['27', '9', '18', '6', '36', '13.5'] },
      'La mediana AM deja dos mitades: $54 \\div 2 = 27$. Las tres medianas forman seis triángulos equivalentes: $54 \\div 6 = 9$. Y △BGC son dos de ellos: 18.', 'Una mediana parte la base en dos trozos congruentes con la misma altura. Las tres juntas dejan seis partes equivalentes.'),
    x('equivalentes-o-no', 'Toca **todas** las afirmaciones que son verdaderas.', { casos: [
      { t: 'Una mediana parte el área en dos mitades', si: true },
      { t: 'Lados al doble: área al doble', no: 'Con los lados al doble el área se multiplica por 4: la razón de las áreas es k².' },
      { t: 'Igual altura: áreas como las bases', si: true },
      { t: 'Igual perímetro: igual área', no: 'Un rectángulo de 1 por 5 y un cuadrado de lado 3 tienen perímetro 12, pero áreas 5 y 9.' },
      { t: 'Misma base entre paralelas: equivalentes', si: true },
    ], falta: 'Falta alguna verdadera: piensa en base y altura.', ok: 'Base y altura deciden; la semejanza eleva al cuadrado.' },
    'Son verdaderas la de la mediana, la de igual altura y la de las paralelas. Con lados al doble el área se cuadruplica, y el perímetro no decide el área.', 'Para cada afirmación piensa en la base y la altura de los triángulos, o busca un ejemplo con números pequeños.'),
    x('papel-factor', 'Un cuadrado se amplía a otro semejante cuya área es **49 veces** mayor. ¿Por cuánto se multiplicó cada lado?', { veces: 49 },
      'En figuras semejantes la razón de las áreas es el cuadrado de la razón de los lados: $k^2 = 49$, así que $k = 7$.', 'Si el lado se multiplica por k, caben k filas de k copias. ¿Qué número por sí mismo da las veces pedidas?'),
    x('semejantes-area', 'Dos triángulos **semejantes** tienen lados correspondientes de **6** y **15**. El chico tiene área **8**. Pon la razón de los lados, la de las áreas y el área del grande.', {
      t: { a: 6, b: 15, s: 8 }, et: ['razón de lados', 'razón de áreas', 'área grande'], metas: ['5/2', '25/4', '50'], fichas: ['5/2', '25/4', '50', '20', '5/4', '25/2'],
      mira: ['Divide el lado grande entre su correspondiente: 15 entre 6, simplificado.', 'La razón de las áreas es el cuadrado de la razón de los lados.', 'Multiplica el área chica por la razón de las áreas.'],
      trampas: { '2:20': 'Multiplicaste por la razón de los lados: las áreas crecen con su cuadrado.', '1:5/2': 'Esa es la razón de los lados: la de las áreas es su cuadrado.', '1:25/2': 'Se eleva al cuadrado arriba y abajo: 5² sobre 2².' }, ok: 'Lados por 5/2, área por 25/4.' },
      'Razón de los lados: $\\tfrac{15}{6} = \\tfrac{5}{2}$. Razón de las áreas: $\\left(\\tfrac{5}{2}\\right)^2 = \\tfrac{25}{4}$. Área del grande: $8 \\cdot \\tfrac{25}{4} = 50$.', 'Primero compara los lados correspondientes. Las áreas no crecen igual que los lados: crecen con el cuadrado.'),
    x('angulo-compartido', 'En △ABC, $AB = 12$ y $AC = 10$; D está en AB con $AD = 6$. Mueve E sobre AC hasta que el área de △ADE sea $\\tfrac{3}{10}$ de la de △ABC.', { c: 12, b: 10, d: 6, m: 3, n: 10 },
      'Los dos triángulos comparten el ángulo A: $\\tfrac{AD \\cdot AE}{AB \\cdot AC} = \\tfrac{6 \\cdot AE}{120} = \\tfrac{3}{10}$ da $AE = 6$.', 'Con un ángulo común, compara el producto de los dos lados que lo forman en cada triángulo.'),
    x('lanza-escala', 'Lanza el número que responde cada pregunta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos triángulos tienen la **misma altura**; sus bases miden 6 y 15. El primero tiene área 12: ¿y el segundo?', r: 30, c: '12 \\cdot \\tfrac{15}{6}', e: { 21: 'Sumaste la diferencia de las bases: las áreas son proporcionales a ellas.' } },
      { q: 'Las tres medianas parten un triángulo de área 84 en seis triángulos. ¿Cuánto vale cada uno?', r: 14, c: '84 \\div 6', e: { 28: 'Son seis triángulos equivalentes, no tres.' } },
      { q: 'Dos triángulos **semejantes** tienen lados correspondientes 4 y 6. El chico tiene área 12: ¿y el grande?', r: 27, c: '12 \\cdot \\left(\\tfrac{6}{4}\\right)^2', e: { 18: 'Multiplicaste por la razón de los lados; las áreas van con su cuadrado.' } },
    ] }, 'Misma altura: $12 \\cdot \\tfrac{15}{6} = 30$. Medianas: $84 \\div 6 = 14$. Semejantes: $12 \\cdot \\tfrac{9}{4} = 27$.', 'Misma altura: las áreas van como las bases. Semejantes: van como el cuadrado de la razón de los lados.'),
    sol('En el triángulo ABC, M es el punto medio del lado BC. Demuestra que los triángulos ABM y AMC son equivalentes.', [
      '$BM = MC$, porque M es [[punto medio]] de BC',
      'La altura $h$ trazada desde A a la recta BC es la [[misma]] para los dos triángulos',
      'Área de △ABM $= \\tfrac{BM \\cdot h}{2}$ y área de △AMC $= \\tfrac{MC \\cdot h}{2}$: bases [[congruentes]] y la misma altura',
      'Luego las dos áreas son [[iguales]]: la mediana parte el triángulo en dos equivalentes',
    ], ['bisectriz', 'semejantes', 'distinta'], 'M parte la base en dos segmentos congruentes y la altura desde A es común: las dos áreas, $\\tfrac{BM \\cdot h}{2}$ y $\\tfrac{MC \\cdot h}{2}$, son iguales.', 'Para comparar áreas de triángulos compara sus bases y sus alturas: aquí una de las dos es compartida.'),
    err('Dos terrenos triangulares semejantes tienen lados correspondientes de 20 m y 30 m. El menor tiene 180 m² de área. ¿Cuál es el área del mayor?', [
      'La razón de semejanza es $k = \\tfrac{30}{20} = \\tfrac32$',
      'La razón de las áreas también es $\\tfrac32$',
      'El área del mayor es la del menor por esa razón',
    ], 1, ['La razón de las áreas es $k^2 = \\tfrac94$: el mayor mide $180 \\cdot \\tfrac94 = 405$ m²', 'La razón de las áreas es $2k = 3$: el mayor mide $540$ m²', 'La razón de las áreas es $\\tfrac{1}{k} = \\tfrac23$: el mayor mide $120$ m²'],
    'En figuras semejantes las áreas están en razón $k^2$: $\\left(\\tfrac32\\right)^2 = \\tfrac94$ y $180 \\cdot \\tfrac94 = 405$ m².', 'Si cada lado crece una vez y media, ¿crece igual el área? Piensa en un cuadrado al que se le duplica el lado.'),
    opc('En el triángulo ABC, D está en AB y E en AC, con AD = 4, AB = 10, AE = 5 y AC = 8. La razón entre el área de △ADE y la de △ABC es:', ['1/2', '5/8', '1/4', '2/5'], 2,
      'Comparten el ángulo A: la razón de las áreas es $\\tfrac{AD \\cdot AE}{AB \\cdot AC} = \\tfrac{4 \\cdot 5}{10 \\cdot 8} = \\tfrac{20}{80} = \\tfrac14$.', 'Los dos triángulos tienen el ángulo A en común: compara los productos de los lados que lo forman.'),
  ]);

  // ------------------------------------------------------------------------------------------------- 3 · Áreas sombreadas
  const l3 = leccion('euc-areas-3', 'Áreas sombreadas', guion(
    ['Sumar y restar', 'Una región sombreada casi nunca tiene fórmula propia: se arma sumando y restando áreas conocidas. Lo de afuera menos lo de adentro.'],
    ['Cuadrado y círculo', 'El círculo inscrito en un cuadrado tiene por radio medio lado. Si el cuadrado es el inscrito, su diagonal es el diámetro del círculo.'],
    ['Cuartos de círculo', 'Un cuarto de círculo menos el triángulo de sus dos radios es un segmento circular. Dos segmentos iguales forman un pétalo.'],
    ['Simetría y piezas que se mueven', 'Si una pieza que sobra es congruente con una que falta, se traslada y la figura queda más sencilla. Las figuras simétricas se calculan por mitades.'],
    ['En función de π', 'Las respuestas se dejan exactas: $100 - 25\\pi$, $18\\pi - 36$. No se reemplaza π por 3.14.'],
  ), [
    x('marco-hueco', 'A una lámina de **13 por 9** se le recorta un hueco cuadrado en el centro. Ajusta el hueco para que queden **68** cuadros de lámina.', { w: 13, h: 9, area: 68 },
      'La lámina entera vale $13 \\cdot 9 = 117$. Para que queden 68 hay que quitar $117 - 68 = 49$: un cuadrado de lado 7.', 'Lo sombreado es la lámina entera menos el hueco. ¿Cuánta área hay que quitar?'),
    x('cuadrado-circulo', 'Un cuadrado de lado **10** tiene su círculo **inscrito**. Pon el área del cuadrado, la del círculo y la de la región sombreada.', { modo: 'inscrito', l: 10, fichas: ['100', '25π', '100 − 25π', '100π', '10π', '25π − 100', '100 − 10π'] },
      'Cuadrado: $10^2 = 100$. El radio del círculo inscrito es medio lado: $\\pi \\cdot 5^2 = 25\\pi$. Sombreada: $100 - 25\\pi$.', 'El círculo inscrito toca los cuatro lados del cuadrado. ¿Cuánto mide entonces su diámetro?'),
    x('corona-borde', 'El hueco de una arandela tiene radio **3**. Agranda el borde de afuera, con el mismo centro, hasta que la **corona** mida $16\\pi$.', { r: 3, area: 16 },
      'El hueco vale $9\\pi$. El círculo de afuera debe valer $16\\pi + 9\\pi = 25\\pi$: su radio es 5.', 'La corona es el círculo grande menos el chico. Se restan las áreas, no los radios.'),
    x('esquinas-cuarto', 'A una baldosa cuadrada de lado **10** se le quitan cuatro cuartos de círculo iguales, uno en cada esquina. Ábrelos hasta que lo sombreado mida $100 - 9\\pi$.', { l: 10, k: 9 },
      'Los cuatro cuartos juntos hacen un círculo entero de radio $r$: se quita $\\pi r^2 = 9\\pi$, así que $r = 3$.', 'Junta mentalmente las cuatro esquinas que se quitan. ¿Qué figura completa forman?'),
    x('petalo-cuartos', 'En un cuadrado de lado **6** se trazan dos cuartos de círculo de radio 6, con centros en vértices opuestos. Pon el área de cada parte hasta llegar al **pétalo**.', { l: 6, fichas: ['9π', '18', '9π − 18', '18π − 36', '36π', '36', '18π − 18', '9π − 36'] },
      'Cuarto de círculo: $\\tfrac14 \\cdot 36\\pi = 9\\pi$. Triángulo: medio cuadrado, 18. Segmento: $9\\pi - 18$. El pétalo son dos segmentos: $18\\pi - 36$.', 'La diagonal del cuadrado parte el pétalo en dos segmentos circulares iguales. Empieza por uno solo.'),
    x('bandera-onda', 'A una bandera de **14 por 6** le sobra medio círculo a un lado y le falta uno igual al otro. Estira el rectángulo hasta que tenga su **misma área**.', { w: 14, h: 6 },
      'La pieza que sobra es congruente con la que falta: al trasladarla queda el rectángulo de $14 \\cdot 6 = 84$. No hace falta π.', 'Compara la pieza que sobresale con el hueco del otro lado. ¿Qué pasa si la mueves hasta allá?'),
    x('pi-lanza', 'Lanza las partes de π de cada figura. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un cuadrado de lado **12** con su círculo inscrito: lo sombreado mide $144 - k\\pi$. Lanza $k$.', f: { t: 'cc', l: 12 }, r: 36, c: '144 - \\pi \\cdot 6^2 = 144 - 36\\pi', e: { 12: 'Con 12π mediste el borde del círculo: el área es el radio por el radio, por π.', 6: 'Ese es el radio: falta elevarlo al cuadrado.' } },
      { q: 'Un sector de radio **9** y ángulo $120^\\circ$: su área es $k\\pi$. Lanza $k$.', f: { t: 'sector', r: 9, g: 120 }, r: 27, c: '\\tfrac{120}{360} \\cdot 81\\pi = 27\\pi', e: { 6: 'Con 6π mediste el arco. El área usa el radio por el radio.' } },
      { q: 'A un rectángulo de **12 por 6** se le quita medio círculo de radio 6: queda $72 - k\\pi$. Lanza $k$.', f: { t: 'medio', r: 6 }, r: 18, c: '72 - \\tfrac12 \\cdot 36\\pi = 72 - 18\\pi', e: { 36: 'Quitaste el círculo entero: es solo la mitad.' } },
    ] }, 'Círculo inscrito: radio 6, $36\\pi$. Sector: un tercio de $81\\pi$, $27\\pi$. Medio círculo: la mitad de $36\\pi$, $18\\pi$.', 'En cada figura busca el radio, calcula el círculo entero y toma solo la parte que aparece.'),
    sol('Un hexágono regular está inscrito en un círculo de radio 6 cm. Halla el área de la región del círculo que queda fuera del hexágono.', [
      'Círculo: $\\pi \\cdot 6^2 =$ [[36π]] cm²',
      'El lado del hexágono regular inscrito mide lo mismo que el radio: [[6]] cm',
      'Hexágono: seis triángulos equiláteros de $\\tfrac{36\\sqrt3}{4} = 9\\sqrt3$ cm², en total [[54√3]] cm²',
      'Región sombreada: [[36π − 54√3]] cm²',
    ], ['12π', '9√3', '54√3 − 36π', '12'], 'Círculo menos polígono inscrito: $36\\pi - 6 \\cdot 9\\sqrt3 = 36\\pi - 54\\sqrt3$ cm².', 'Lo de afuera menos lo de adentro. El hexágono regular inscrito se parte en seis equiláteros de lado igual al radio.'),
    err('En un cuadrado de lado 8 cm se dibujan, hacia adentro, dos semicírculos cuyos diámetros son dos lados opuestos. ¿Cuál es el área del cuadrado que queda fuera de los semicírculos?', [
      'Cada semicírculo tiene por diámetro un lado: su radio es 4 cm',
      'Los dos semicírculos juntos valen $2 \\cdot \\pi \\cdot 4^2 = 32\\pi$ cm²',
      'Área pedida: la del cuadrado, 64 cm², menos la de los semicírculos',
    ], 1, ['Los dos semicírculos juntos forman un círculo: $\\pi \\cdot 4^2 = 16\\pi$ cm², y quedan $64 - 16\\pi$ cm²', 'Los dos semicírculos juntos valen $\\pi \\cdot 8^2 = 64\\pi$ cm², y quedan $64 - 64\\pi$ cm²', 'Los dos semicírculos juntos valen $2 \\cdot \\pi \\cdot 4 = 8\\pi$ cm², y quedan $64 - 8\\pi$ cm²'],
    'Dos semicírculos de radio 4 hacen un círculo entero: $16\\pi$. Queda $64 - 16\\pi$ cm². Además, $64 - 32\\pi$ sería negativo: una señal de error.', 'Dos mitades iguales hacen un entero. Revisa también si la respuesta final puede ser un área.'),
    opc('En un cuadrado de lado 4 cm se traza un cuarto de círculo con centro en un vértice y radio 4 cm. El área de la parte del cuadrado que queda fuera del cuarto de círculo, en cm², es:', ['16 − 8π', '16 − 4π', '4π − 16', '16 − 16π'], 1,
      'Cuadrado: 16. Cuarto de círculo: $\\tfrac14 \\cdot \\pi \\cdot 4^2 = 4\\pi$. Queda $16 - 4\\pi$ cm².', 'Calcula el cuadrado y el cuarto de círculo por separado, y resta lo de adentro a lo de afuera.'),
  ]);

  return mundo('euc-areas', [l1, l2, l3], [
    ['euc-areas-1', 'Círculo: del área πr² se despeja el radio.', x('radio-area', 'Una fuente circular ocupa $81\\pi$ m². Arrastra el borde hasta el radio que le corresponde.', { area: 81 },
      'El área del círculo es $\\pi r^2 = 81\\pi$: $r^2 = 81$ y $r = 9$.', 'El área usa el radio por el radio.')],
    ['euc-areas-1', 'Trapecio: semisuma de las bases por la altura.', x('trapecio-gemelo', 'El trapecio tiene bases **15** y **7**. Estira el rectángulo de igual altura hasta que sean **equivalentes**.', { B: 15, b: 7 },
      'La semisuma de las bases es $\\tfrac{15 + 7}{2} = 11$: esa es la base del rectángulo equivalente.', 'Busca la base que queda a medio camino.')],
    ['euc-areas-1', 'Fórmula de Herón: empieza por el semiperímetro.', opc('Los lados de un triángulo miden 13 cm, 14 cm y 15 cm. Su área, en cm², es:', ['42', '168', '91', '84'], 3,
      'Semiperímetro: $p = 21$. Herón: $\\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84$.', 'Usa el semiperímetro y las tres diferencias.')],
    ['euc-areas-2', 'Con la misma altura, las áreas son como las bases.', x('parte-base', 'La base BC mide **12**. Mueve D hasta que el área de △ABD sea a la de △ADC como **1 es a 2**.', { L: 12, m: 1, n: 2, ap: 7, d0: 6 },
      'Misma altura desde A: $BD : DC = 1 : 2$. De 12 unidades, $BD = \\tfrac13 \\cdot 12 = 4$.', 'Reparte la base como se reparten las áreas.')],
    ['euc-areas-2', 'Figuras semejantes: las áreas están en razón k².', x('achica-area', 'Un cartel de **9 por 6** se copia a escala con la **novena parte** del área. Arrastra la esquina de la copia.', { w: 9, h: 6, div: 9 },
      'Área entre 9 quiere decir lados entre 3: la copia mide 3 por 2.', '¿Qué número al cuadrado da la reducción del área?')],
    ['euc-areas-2', 'Las tres medianas dejan seis triángulos equivalentes.', opc('Las tres medianas de un triángulo de 72 cm² se cortan en G. El área del triángulo que forman G y dos de los vértices es:', ['12 cm²', '24 cm²', '36 cm²', '18 cm²'], 1,
      'Cada uno de los seis triángulos vale 12 cm²; el que forman G y dos vértices tiene dos de ellos: 24 cm².', 'Cuenta cuántos de los seis triangulitos lo forman.')],
    ['euc-areas-3', 'Cuadrado inscrito: su diagonal es el diámetro.', x('cuadrado-circulo', 'Un cuadrado está **inscrito** en un círculo de radio **4**. Pon el área del círculo, la del cuadrado y la de la región sombreada.', { modo: 'circunscrito', r: 4, fichas: ['16π', '32', '16π − 32', '64', '16', '32 − 16π', '16π − 64'] },
      'Círculo: $16\\pi$. El cuadrado es un rombo de diagonales 8 y 8: $\\tfrac{8 \\cdot 8}{2} = 32$. Sombreada: $16\\pi - 32$.', 'Las diagonales del cuadrado son diámetros.')],
    ['euc-areas-3', 'Restar: la figura de afuera menos la de adentro.', x('esquinas-cuarto', 'A un cuadrado de lado **12** se le quitan cuatro cuartos de círculo iguales en las esquinas. Ábrelos hasta que lo sombreado mida $144 - 16\\pi$.', { l: 12, k: 16 },
      'Los cuatro cuartos hacen un círculo de radio $r$: $\\pi r^2 = 16\\pi$ da $r = 4$.', 'Las cuatro esquinas juntas forman un círculo.')],
    ['euc-areas-3', 'Corona circular: se restan las áreas, no los radios.', opc('Dos circunferencias concéntricas tienen radios 9 cm y 6 cm. El área de la corona circular que determinan es:', ['9π cm²', '15π cm²', '45π cm²', '117π cm²'], 2,
      'Se restan las áreas: $81\\pi - 36\\pi = 45\\pi$ cm².', 'Calcula cada círculo y resta el chico al grande.')],
  ]);
})());
