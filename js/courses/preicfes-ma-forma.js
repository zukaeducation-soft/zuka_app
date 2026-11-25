// Preicfes · Matemáticas · mundo 6 «Triángulos y Semejanza» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-forma-1', 'Ángulos y desigualdad triangular', guion(
    ['Media vuelta', 'Dos ángulos vecinos sobre una recta suman 180°. Los opuestos por el vértice son iguales.'],
    ['Paralelas', 'Una recta que cruza dos paralelas repite los mismos ángulos.'],
    ['Triángulo', 'Los tres ángulos suman 180°; el exterior vale los dos interiores lejanos.'],
    ['¿Cierra?', 'Cada lado debe ser menor que la suma de los otros dos.']), [
    x('vecinos-razon', 'Dos ángulos vecinos completan una recta. Gira el rayo hasta que el de la derecha sea **3 veces** el dorado.', { k: 3 },
      'Son cuatro partes iguales en 180°: cada una vale 45°, y tres son 135°.', 'Los dos juntos llenan media vuelta: cuenta en cuántas partes iguales queda.'),
    x('cruce-ocho', 'Las dos horizontales son paralelas. Pon los cuatro ángulos que faltan.', { a: 64, fichas: ['64°', '64°', '64°', '116°', '116°', '26°'] },
      'El mismo ángulo se repite en el otro cruce; su vecino mide $180^\\circ - 64^\\circ = 116^\\circ$.', 'En cada cruce solo hay dos medidas: el ángulo y su vecino.'),
    x('tercer-angulo', 'La punta de un tejado debe abrir $84^\\circ$ y tener los dos ángulos de abajo **iguales**. Ajústalo.', { top: 84 },
      '$180^\\circ - 84^\\circ = 96^\\circ$, repartidos en dos: 48° cada uno.', 'Quita el de arriba a 180° y reparte lo que queda.'),
    x('exterior-alcanza', 'Corre el vértice de la derecha hasta que el ángulo **exterior** mida $115^\\circ$.', { a: 60, ext: 115 },
      'El exterior vale los dos interiores lejanos: $60^\\circ + 55^\\circ = 115^\\circ$.', 'El exterior es la suma de los dos ángulos que no lo tocan.'),
    x('tercer-lado', 'Dos varillas miden **7** y **4**. ¿Entre qué números enteros puede medir la tercera para que el triángulo **cierre**?', { a: 7, b: 4, max: 14 },
      'Más que la resta, 3, y menos que la suma, 11: de 4 a 10.', 'Si es muy corta no alcanza; si es muy larga, las otras dos no llegan.'),
    x('cierran-o-no', 'Toca **todas** las ternas que forman un triángulo.', { casos: [{ t: '5, 6 y 10', si: true }, { t: '3, 4 y 8' }, { t: '7, 7 y 13', si: true }, { t: '2, 5 y 7' }, { t: '9, 4 y 6', si: true }], no: 'Alguna de las marcadas no cierra: compara el lado mayor con la suma de los otros.', falta: 'Falta alguna que sí cierra.', ok: 'En todas, el mayor es menor que la suma.' },
      '$5 + 6 > 10$, $7 + 7 > 13$ y $4 + 6 > 9$. En 2, 5 y 7 la suma apenas iguala: queda una línea.', 'Basta con comparar el lado mayor con la suma de los otros dos.'),
    x('lanza-angulo', 'El faro gira desde la derecha. Dale el ángulo que se pide y suéltalo. Puedes fallar **una** vez.', { tiros: [
      { q: 'El vecino de $140^\\circ$ sobre una recta', r: 40, c: '180^\\circ - 140^\\circ', e: { 140: 'Ese es el dato: falta lo que completa la recta.' } },
      { q: 'El tercer ángulo de un triángulo con $35^\\circ$ y $70^\\circ$', r: 75, c: '180^\\circ - 35^\\circ - 70^\\circ', e: { 105: 'Esa es la suma de los otros dos.' } },
      { q: 'El exterior de un triángulo cuyos interiores lejanos miden $50^\\circ$ y $60^\\circ$', r: 110, c: '50^\\circ + 60^\\circ', e: { 70: 'Ese es el tercer ángulo interior.' } }] },
      '$180 - 140 = 40$; $180 - 105 = 75$; $50 + 60 = 110$.', 'Recta y triángulo suman 180°; el exterior suma los dos lejanos.'),
    sol('En un triángulo isósceles, el ángulo desigual mide el doble de cada uno de los otros. ¿Cuánto miden?', ['Son $1 + 1 + 2 =$ [[4]] partes iguales', 'Cada parte mide [[45]]°', 'El desigual mide [[90]]°'], ['3', '60', '120'], 'Cuatro partes en 180°: 45, 45 y 90.', 'Cuenta en cuántas partes iguales se reparten los 180°.'),
    err('Con varillas de 3, 5 y 9 cm, ¿se arma un triángulo?', ['El lado mayor mide 9', 'Los otros dos suman $3 + 5 = 8$', 'Como 9 es mayor que 8, sí se arma'], 2, ['Como 9 es mayor que 8, no cierra', 'Como 9 es mayor que 3, sí se arma', 'Como 8 es mayor que 5, sí se arma'], 'Las dos cortas juntas no alcanzan a la larga.', '¿Las dos varillas cortas alcanzan a tocarse sobre la larga?'),
    opc('Dos caminos paralelos son cruzados por una carretera. Uno de los ángulos mide 125°. Los ángulos que NO miden 125° miden:', ['35°', '55°', '65°', '125°'], 1, '$180^\\circ - 125^\\circ = 55^\\circ$: son los vecinos.', 'En cada cruce hay dos medidas que suman media vuelta.'),
  ]);

  const l2 = leccion('icf-ma-forma-2', 'Pitágoras', guion(
    ['Cuadrados', 'En un triángulo rectángulo, el cuadrado de la hipotenusa vale los cuadrados de los catetos juntos.'],
    ['Falta un lado', 'Para la hipotenusa se suma; para un cateto se resta.'],
    ['Familias', '3-4-5, 5-12-13, 8-15-17 y sus múltiplos.'],
    ['En la vida', 'Diagonales, escaleras, atajos y alturas.']), [
    x('cuadrado-catetos', 'El cuadrado sobre la hipotenusa debe valer **65**, y los dos catetos tienen que ser mayores que 2.', { c2: 65, mas: 2 },
      '$4^2 + 7^2 = 16 + 49 = 65$. También $1 + 64$, pero 1 es muy corto.', 'Haz la lista de los cuadrados y busca dos que sumen lo pedido.'),
    x('cateto-falta', 'Un cable de **17 m** baja de la punta de una torre hasta una estaca a **8 m** del pie. Dale a la torre su altura.', { c: 17, b: 8 },
      '$17^2 - 8^2 = 289 - 64 = 225$: la torre mide 15 m.', 'El cable es la hipotenusa: aquí se resta.'),
    x('lados-familia', 'Cada triángulo es rectángulo y le falta un lado. Pon las medidas.', { tri: [{ a: 9, b: 12 }, { a: 10, h: 26 }, { a: 15, b: 20 }], fichas: ['15', '24', '25', '21', '16', '35'] },
      '$9, 12 \\to 15$ (por 3); $10, 24, 26$ (por 2); $15, 20 \\to 25$ (por 5).', 'Divide cada pareja por un número y reconoce la familia.'),
    x('a-diez-pasos', 'Pon la banderita exactamente a **5** cuadros de A en línea recta, pero en diagonal: ni en su fila ni en su columna.', { A: [2, 2], d: 5 },
      'Con 3 hacia un lado y 4 hacia otro, la diagonal mide 5.', 'Busca dos catetos enteros cuya hipotenusa sea la pedida.'),
    x('dos-pasos', 'De la punta de una antena bajan dos cables: uno de **13 m** hasta 5 m del pie. El otro llega a **16 m** del pie. ¿Cuánto mide?', { c1: 13, b1: 5, b2: 16 },
      'La antena mide $\\sqrt{169 - 25} = 12$ y el otro cable $\\sqrt{144 + 256} = 20$.', 'Primero halla la altura de la antena con el cable conocido.'),
    x('diagonal-cuadrado', 'Un potrero cuadrado mide 12 m de lado. Corta la cinta que va de una esquina a la **opuesta**, lo más justa que puedas.', { lado: 12 },
      'La diagonal es $12\\sqrt2 \\approx 16.97$: casi 17 m.', 'La diagonal es hipotenusa de dos lados iguales.'),
    x('lanza-cuerda', 'Lanza la cuerda con el largo justo del lado que falta. Puedes fallar **una** vez.', { tiros: [
      { q: 'Catetos 12 y 35: lanza la hipotenusa', a: 12, b: 35, r: 37 }, { q: 'Hipotenusa 25 y cateto 7: lanza el otro cateto', h: 25, b: 7, r: 24 }, { q: 'Hipotenusa 30 y cateto 18: lanza el otro cateto', h: 30, b: 18, r: 24 }] },
      '$144 + 1225 = 37^2$; $625 - 49 = 24^2$; $900 - 324 = 24^2$.', 'Hipotenusa: se suman los cuadrados. Cateto: se restan.'),
    sol('Ana camina 9 cuadras al norte y 12 al oriente. ¿Cuánto ahorra si va en línea recta?', ['Por las calles camina [[21]] cuadras', 'En línea recta son [[15]]', 'Ahorra [[6]] cuadras'], ['225', '3', '25'], '$81 + 144 = 225 = 15^2$; $21 - 15 = 6$.', 'El atajo es la hipotenusa de los dos recorridos.'),
    err('Una escalera de 10 m se apoya con el pie a 6 m de la pared. ¿A qué altura llega?', ['La escalera es la hipotenusa', 'La altura es un cateto', 'Altura: $\\sqrt{100 + 36} \\approx 11.7$ m'], 2, ['Altura: $\\sqrt{100 - 36} = 8$ m', 'Altura: $10 - 6 = 4$ m', 'Altura: $10 + 6 = 16$ m'], 'Para un cateto se restan los cuadrados: 8 m. No puede llegar más alto que su largo.', '¿Puede la altura ser mayor que la escalera?'),
    opc('Un televisor de 80 cm de ancho y 60 cm de alto tiene una diagonal de:', ['140 cm', '20 cm', '70 cm', '100 cm'], 3, '$6\\,400 + 3\\,600 = 10\\,000 = 100^2$.', 'Reconoce la familia 3-4-5.'),
  ]);

  const l3 = leccion('icf-ma-forma-3', 'Tales y semejanza', guion(
    ['Misma forma', 'Dos figuras son semejantes si tienen los mismos ángulos y sus lados crecen por el mismo número.'],
    ['Sombras', 'A la misma hora, altura y sombra forman triángulos semejantes.'],
    ['Paralelas que cortan', 'Parten dos rectas en trozos proporcionales.'],
    ['Al escalar', 'Los lados crecen por k; el área, por k²; el volumen, por k³.']), [
    x('foto-fiel', 'Amplía la foto de 6 por 4 hasta que mida **7 de alto**, sin deformarla.', { w0: 6, h0: 4, h: 7 },
      'El alto creció por 1.75: el ancho es $6 \\cdot 1.75 = 10.5$.', 'Halla por cuánto creció el alto y haz lo mismo con el ancho.'),
    x('sombra-poste', 'Un niño de 1 m da una sombra de 1.5 m. A la misma hora, un árbol da **12 m** de sombra. Dale su altura.', { h0: 1, s0: 1.5, s: 12 },
      'La sombra es 8 veces la del niño: el árbol mide 8 m.', 'Compara las dos sombras: ¿cuántas veces cabe una en otra?'),
    x('tales-corte', 'Tres paralelas parten una recta en trozos de 6 y 9; en la otra, el primer trozo mide 8. Pon el punto donde pasa la **tercera** paralela.', { a: 6, b: 9, c: 8 },
      'El segundo trozo es 1.5 veces el primero: $8 \\cdot 1.5 = 12$.', 'La razón entre los dos trozos es la misma en las dos rectas.'),
    x('papel-factor', 'Un afiche se agrandó y ahora gasta **25 veces** el papel de antes. ¿Por cuánto se multiplicó su lado?', { veces: 25 },
      'El papel crece con el cuadrado: $5^2 = 25$.', 'El papel es superficie: crece por el factor dos veces.'),
    x('tres-crecimientos', 'Un cubo se copia con la arista **4 veces** más larga. ¿Por cuánto se multiplica lo que gasta en cada material?', { k: 4, fichas: ['× 4', '× 16', '× 64', '× 8', '× 12'] },
      'Lo que se mide en largo, por 4; en superficie, por 16; en volumen, por 64.', 'Mira si el material se mide en metros, en cuadrados o en cubos.'),
    x('escala-plano', 'Dos torres están a **4.5 km**. Ubica la segunda en el mapa, a su medida en centímetros.', { den: 90000, km: 4.5 },
      'Cada centímetro son 900 m: $4\\,500 \\div 900 = 5$ cm.', 'Primero di cuántos metros vale cada centímetro del mapa.'),
    x('lanza-escala', 'Manda el dron al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Plano $1 : 200$. Un corredor mide 6 cm: ¿cuántos metros reales?', r: 12, c: '6 \\cdot 200 \\div 100', e: { 6: 'Un centímetro de este plano son 2 metros.' } },
      { q: 'Lados 4 y 7; en la copia semejante, el de 4 mide 12. ¿Cuánto mide el de 7?', r: 21, c: '7 \\cdot 3', e: { 15: 'Sumaste 8; los lados se multiplican.' } },
      { q: 'Un palo de 3 m da 2 m de sombra; un faro da 18 m. ¿Cuánto mide el faro?', r: 27, c: '3 \\cdot 9', e: { 19: 'Sumaste; las sombras guardan la razón.', 12: 'Al revés: este palo mide más que su sombra.' } }] },
      '$6 \\cdot 2 = 12$; $7 \\cdot 3 = 21$; $3 \\cdot 9 = 27$.', 'Halla primero por qué número se multiplica.'),
    sol('Un triángulo de lados 6, 8 y 10 es semejante a otro cuyo lado menor mide 15. ¿Cuánto mide su perímetro?', ['El factor es $15 \\div 6 =$ [[2.5]]', 'El perímetro del pequeño es [[24]]', 'El del grande es [[60]]'], ['9', '33', '150'], 'El perímetro también crece por 2.5: $24 \\cdot 2.5 = 60$.', 'El perímetro es un largo: crece por el mismo factor.'),
    err('Una maqueta $1 : 10$ de un tanque tiene 3 litros de capacidad. ¿Cuántos tiene el tanque real?', ['Los largos crecen por 10', 'La capacidad es un volumen', 'El tanque tiene $3 \\cdot 10 = 30$ litros'], 2, ['El tanque tiene $3 \\cdot 1\\,000 = 3\\,000$ litros', 'El tanque tiene $3 \\cdot 100 = 300$ litros', 'El tanque tiene $3 + 10 = 13$ litros'], 'El volumen crece por $10^3 = 1\\,000$.', '¿Cuántas medidas crecen cuando se trata de un volumen?'),
    opc('Dos rectángulos son semejantes. El primero mide 4 por 10 y el segundo tiene 6 de ancho (el lado menor). Su largo es:', ['12', '15', '24', '14'], 1, 'El factor es 1.5: $10 \\cdot 1.5 = 15$.', 'Divide los anchos para hallar el factor.'),
  ]);

  const tri = (o, t) => ({ ...o, trampas: {}, t });
  const l4 = leccion('icf-ma-forma-4', 'Razones trigonométricas', guion(
    ['Tres lados, un ángulo', 'Desde θ: el opuesto queda enfrente, el adyacente al lado y la hipotenusa frente al ángulo recto.'],
    ['Seno, coseno y tangente', 'sen = op/hip, cos = ady/hip, tan = op/ady.'],
    ['Solo importa el ángulo', 'En triángulos semejantes la razón es la misma.'],
    ['Medir sin llegar', 'Con un ángulo y una distancia se halla una altura.']), [
    x('lados-nombra', 'Triángulo de lados 8, 15 y 17. Desde θ, el opuesto es el **15**. Pon los otros.', tri({ et: ['adyacente', 'hipotenusa'], metas: ['8', '17'], fichas: ['8', '17', '15', '23'], mira: ['Es el cateto que toca a θ.', 'Es el lado frente al ángulo recto.'], ok: 'Al lado 8 y enfrente del recto 17.' }, { co: '15' }),
      'La hipotenusa es el mayor, 17; el otro cateto, 8, queda al lado de θ.', 'La hipotenusa siempre es el lado más largo.'),
    x('razones-tres', 'Opuesto 9, adyacente 40, hipotenusa 41. Pon cada razón de θ.', tri({ et: ['sen', 'cos', 'tan'], metas: ['9/41', '40/41', '9/40'], fichas: ['9/41', '40/41', '9/40', '41/9', '40/9'], mira: ['Opuesto sobre hipotenusa.', 'Adyacente sobre hipotenusa.', 'Opuesto sobre adyacente.'], ok: 'SOH, CAH y TOA.' }, { co: '9', ca: '40', hi: '41' }),
      'Seno 9/41, coseno 40/41 y tangente 9/40, cada una con sus dos lados.', 'Seno y coseno llevan abajo la hipotenusa; la tangente, no.'),
    x('catetos-razon', 'Mueve los catetos hasta que la **tangente** de θ sea $\\tfrac{5}{8}$.', { mira: 'La tangente es opuesto sobre adyacente, en ese orden.', ok: 'Opuesto 5 y adyacente 8.', ks: [['x', 2, 12, 'adyacente'], ['y', 2, 8, 'opuesto']], v: { x: 4, y: 4 }, meta: { x: 8, y: 5 } },
      'Tangente: opuesto entre adyacente, 5 entre 8.', 'Arriba va el cateto de enfrente y abajo, el de al lado.'),
    x('escalera-apoya', 'El pie de una escalera queda a la **mitad** de su largo desde la pared. Inclínala.', { mira: 'Distancia sobre escalera es el coseno: busca el ángulo notable.', ok: 'El coseno de 60° es un medio.', ks: [['g', 15, 75, 'ángulo con el piso', 15]], v: { g: 15 }, meta: { g: 60 } },
      '$\\cos 60^\\circ = \\tfrac12$: el pie queda a la mitad de la escalera.', 'La distancia al pie es el adyacente: ¿qué razón usa adyacente e hipotenusa?'),
    x('recta-notables', 'El triángulo de **30°** tiene opuesto 6. Pon el adyacente y la hipotenusa.', tri({ et: ['adyacente', 'hipotenusa'], metas: ['6√3', '12'], fichas: ['6√3', '12', '6√2', '12√3', '3'], mira: ['Es el lado corto por raíz de tres.', 'Es el doble del lado frente a 30°.'], ok: 'Corto 6, largo 6√3 e hipotenusa 12.' }, { a: '30°', co: '6' }),
      'Frente a 30° está la mitad de la hipotenusa: 12; el otro cateto es $6\\sqrt3$.', 'Es medio triángulo equilátero: el lado corto es la mitad de la hipotenusa.'),
    x('mirador', 'Desde **30 m**, la altura de una torre es $30\\sqrt3$ m. Inclina la mirada.', { mira: 'Altura sobre distancia da raíz de tres: es la tangente.', ok: 'La tangente de 60° es raíz de tres.', d: 30, ks: [['g', 15, 60, 'elevación', 15]], v: { g: 15 }, meta: { g: 60 } },
      'Altura entre distancia es $\\sqrt3$, y $\\tan 60^\\circ = \\sqrt3$.', 'La tangente compara la altura con la distancia.'),
    sol('Una cometa vuela con 40 m de cuerda tensa que forma 30° con el suelo. ¿A qué altura está? ($\\operatorname{sen}30^\\circ = 0.5$)', ['La altura es el lado [[opuesto]] a 30°', 'La cuerda es la [[hipotenusa]]', 'Altura: $40 \\cdot 0.5 =$ [[20]] m'], ['adyacente', '80', '35'], 'Seno: opuesto sobre hipotenusa; $40 \\cdot 0.5 = 20$.', 'Dibuja el triángulo y nombra los lados desde los 30°.'),
    err('A 50 m de un edificio se ve su techo con 40° de elevación. Halla la altura ($\\tan 40^\\circ \\approx 0.84$).', ['La distancia, 50, es el adyacente', 'La altura es el opuesto', 'Altura: $50 \\div 0.84 \\approx 59.5$ m'], 2, ['Altura: $50 \\cdot 0.84 = 42$ m', 'Altura: $50 + 0.84 = 50.84$ m', 'Altura: $0.84 \\div 50$ m'], 'Opuesto = adyacente por tangente: 42 m.', 'Tangente es opuesto sobre adyacente: despeja el opuesto.'),
    opc('Una rampa sube 1 m por cada 2 m de recorrido sobre ella. El ángulo con el piso cumple que su seno es:', ['$\\tfrac12$', '2', '$\\tfrac{\\sqrt3}{2}$', '$\\tfrac13$'], 0, 'Opuesto 1 sobre hipotenusa 2.', 'El recorrido sobre la rampa es la hipotenusa.'),
  ]);

  return mundo('icf-ma-forma', 'Triángulos y Semejanza', 'matematicas', [l1, l2, l3, l4], [
    ['icf-ma-forma-1', 'Vecinos: media vuelta. Opuestos: iguales.', play('tijera-angulos', 'Deduce el ángulo que se pide', { rounds: [{ kind: 'comp', given: 35 }] }, 'Dos que completan un ángulo recto suman 90: el otro mide 55°.', { hint: 'Los dos juntos llenan un ángulo recto.' })],
    ['icf-ma-forma-1', 'Los tres ángulos de un triángulo suman 180°.', play('apice-triangulo', 'El ángulo que falta en el triángulo', { rounds: [{ mode: 'falta', A: 60, C: 75 }] }, 'B = 180° − 135° = 45°.', { hint: 'Los tres ángulos llenan media vuelta.' })],
    ['icf-ma-forma-1', 'Cada lado, menor que la suma de los otros dos.', opc('Dos lados de un triángulo miden 6 y 10. El tercero NO puede medir:', ['5', '9', '16', '15'], 2, '$6 + 10 = 16$: con 16 queda una línea.', 'El tercero debe ser menor que la suma.')],
    ['icf-ma-forma-2', 'Pitágoras con escaleras: el largo es la hipotenusa.', play('escalera-pared', 'Apoya la escalera en la ventana', { rounds: [{ L: 13, h: 12 }] }, 'El pie queda a 5: 5-12-13.', { hint: 'Resta los cuadrados del largo y de la altura.' })],
    ['icf-ma-forma-2', 'Familias: 3-4-5 y 5-12-13.', play('arma-triangulo', 'Arma un triángulo rectángulo con la razón pedida', { max: 12, rounds: [{ fn: 'sen', num: 3, den: 5 }] }, 'Opuesto 3 y adyacente 4 dan hipotenusa 5.', { hint: 'Si opuesto e hipotenusa son 3 y 5, ¿cuánto es el otro cateto?' })],
    ['icf-ma-forma-2', 'La diagonal es la hipotenusa.', opc('La diagonal de un rectángulo mide 25 y su ancho 15. Su largo es:', ['10', '40', '20', '$\\sqrt{850}$'], 2, '$625 - 225 = 400 = 20^2$.', 'El largo es un cateto: se restan los cuadrados.')],
    ['icf-ma-forma-3', 'Paralelas: trozos proporcionales.', play('tales-rectas', 'Ubica el punto para que las rectas queden paralelas', { rounds: [{ a: 4, b: 6, c: 5 }] }, '$4/6 = 5/x$: $x = 7.5$.', { hint: 'La razón entre los trozos es la misma en las dos rectas.' })],
    ['icf-ma-forma-3', 'El volumen crece con el cubo del factor.', play('factor-area', 'Escala el cubo hasta el volumen pedido', { rounds: [{ kind: 'vol', side: 1, target: 27 }] }, 'De 1 a 27 cubitos: el factor es 3.', { hint: 'Busca un número que tres veces por sí mismo dé el volumen.' })],
    ['icf-ma-forma-3', 'Sombras a la misma hora: triángulos semejantes.', opc('Una persona de 1.8 m da 1.2 m de sombra. Un árbol da 6 m de sombra a la misma hora. El árbol mide:', ['4 m', '6.6 m', '9 m', '7.2 m'], 2, '$6 \\div 1.2 = 5$ y $1.8 \\cdot 5 = 9$.', 'Mira cuántas veces cabe una sombra en la otra.')],
    ['icf-ma-forma-4', 'Con un ángulo y una distancia se halla la altura.', play('mide-altura', 'Muévete hasta ver la cima con el ángulo pedido', { rounds: [{ kind: 'edificio', h: 25, angle: 45, maxD: 60 }] }, 'Con 45° la distancia es igual a la altura: 25 m.', { hint: 'La tangente de 45° vale uno.' })],
    ['icf-ma-forma-4', 'Seno: opuesto sobre hipotenusa.', play('toca-lados', 'Toca los lados que pide cada razón', { rounds: [{ items: [{ fn: 'sen', t: 2, len: [8, 15, 17] }, { fn: 'cos', t: 5, len: [20, 21, 29] }] }] }, 'Seno usa el opuesto y la hipotenusa.', { hint: 'Mira qué lado queda frente al ángulo.' })],
    ['icf-ma-forma-4', 'Coseno: adyacente sobre hipotenusa.', opc('En un triángulo rectángulo, desde θ: opuesto 12, adyacente 5. El coseno de θ es:', ['12/13', '5/12', '12/5', '5/13'], 3, 'La hipotenusa es 13: adyacente sobre hipotenusa, 5/13.', 'Primero halla la hipotenusa.')],
  ]);
})());
