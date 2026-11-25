// Preicfes · Matemáticas · mundo 11 «Movimientos y Vistas» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-espacio-1', 'Traslación, rotación, reflexión y homotecia', guion(
    ['Trasladar', 'Todos los puntos se mueven lo mismo.'],
    ['Reflejar', 'La imagen queda igual de lejos de la línea, al otro lado.'],
    ['Rotar', 'Cada punto gira sin cambiar su distancia al centro.'],
    ['Homotecia', 'Las distancias al centro se multiplican por el factor.']), [
    x('traslada-punto', 'La figura se traslada **5 a la derecha** y **3 hacia abajo**. Arrastra el punto a donde queda **A**.', { A: [-3, 2], otros: [[-1, 2], [-3, 5]], v: [5, -3] },
      'A $(-3, 2)$ pasa a $(-3 + 5, 2 - 3) = (2, -1)$.', 'Suma el movimiento de lado a la x y el de arriba o abajo a la y.'),
    x('refleja-punto', 'La figura se refleja en el **eje y**, la línea resaltada. Arrastra el punto a donde queda **A**.', { A: [4, 3], otros: [[1, 3], [4, -1]], eje: 'y' },
      'Queda a la misma altura y a 4 del eje, del otro lado: $(-4, 3)$.', 'Cuenta cuántos cuadros separan a A de la línea.'),
    x('rota-punto', 'La figura gira **90° contra el reloj** alrededor del punto resaltado. Arrastra el punto a donde queda **A**.', { A: [4, 1], otros: [[2, 1], [4, 4]], g: 90 },
      'Al girar un cuarto de vuelta, $(4, 1)$ pasa a $(-1, 4)$.', 'Lo que estaba a la derecha pasa arriba; lo de arriba, a la izquierda.'),
    x('homotecia-punto', 'Homotecia con centro en el punto resaltado y **factor 3**. Arrastra el punto a donde queda **A**.', { A: [2, -1], otros: [[1, -1], [1, 1]], k: 3 },
      'Las coordenadas se multiplican por 3: $(6, -3)$.', 'La imagen está en la misma recta que pasa por el centro y por A.'),
    x('que-movimiento', '¿Qué **movimiento** lleva el primer punto al segundo? Los giros y la homotecia son alrededor del origen.', { et: ['(3, 1) → (−3, 1)', '(3, 1) → (5, 4)', '(3, 1) → (−3, −1)', '(3, 1) → (6, 2)'], metas: ['reflexión', 'traslación', 'media vuelta', 'homotecia'], fichas: ['reflexión', 'traslación', 'media vuelta', 'homotecia', 'cuarto de vuelta'], mira: ['Solo cambió el signo de una coordenada.', 'A cada coordenada se le sumó algo.', 'Cambiaron los dos signos y sigue a igual distancia.', 'Las dos se multiplicaron por lo mismo.'], trampas: { '0:media vuelta': 'En una media vuelta cambian los dos signos.', '2:reflexión': 'En una reflexión en un eje cambia un solo signo.' }, ok: 'Cambiar un signo, sumar, cambiar dos y multiplicar.' },
      'Un signo: reflexión; sumar: traslación; los dos signos: media vuelta; por 2: homotecia.', 'Compara cada coordenada antes y después del movimiento.'),
    x('que-se-conserva', 'Toca **todo** lo que **siempre** se conserva en una homotecia de factor 2.', { casos: [{ t: 'los ángulos', si: true }, { t: 'el área', no: 'El área se multiplica por 4.' }, { t: 'la forma', si: true }, { t: 'la longitud de los lados', no: 'Los lados se duplican.' }, { t: 'que los lados paralelos sigan paralelos', si: true }], falta: 'Falta otra: cambia el tamaño, no la forma.', ok: 'Cambia el tamaño, no la forma.' },
      'Ángulos, forma y paralelismo se conservan; lados y área cambian.', 'Piensa en una foto ampliada: ¿qué cambia y qué no?'),
    x('sube-movimiento', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Homotecia de factor **3** a una figura de área **8**. ¿Cuál es el **área** nueva?', r: 72, c: '8 \\cdot 9', e: { 24: 'El área se multiplica por el factor al cuadrado.' } },
      { q: 'Una figura tiene lados **6**, **8** y **10**. Se gira 130°. ¿Cuál es su **perímetro**?', r: 24, c: '6 + 8 + 10', e: { 0: 'Girar no cambia los lados.' } },
      { q: 'Un lado de **35** queda de **14** con una homotecia. ¿Cuánto mide el que era de **50**?', r: 20, c: '50 \\cdot \\tfrac{14}{35}', e: { 28: 'No se restan 22: se multiplica por el factor.' } }] },
      '$8 \\cdot 3^2 = 72$; girar no cambia el perímetro, 24; y el factor es $\\tfrac{2}{5}$: 20.', 'Mira si se pide una longitud o un área y usa el factor.'),
    sol('A $(2, 5)$ se refleja en el eje x y después se traslada 3 a la izquierda.', ['Al reflejar, la y cambia de signo: $(2,$ [[−5]]$)$', 'Al trasladar, $x = 2 - 3 =$ [[−1]]', 'Queda en el cuadrante [[tercero]]'], ['5', '1', 'segundo'], 'Queda en $(-1, -5)$: x y y negativas.', 'Haz un movimiento a la vez.'),
    err('Se aplica una homotecia de centro en el origen y factor 2 a $(3, -4)$.', ['Se multiplica cada coordenada por 2', 'Queda $(6, -8)$', 'La distancia al origen pasa de 5 a 7'], 2, ['La distancia al origen pasa de 5 a 10', 'La distancia al origen sigue en 5', 'La distancia al origen pasa de 5 a 25'], 'Todas las distancias al centro se multiplican por 2.', '¿Qué les hace la homotecia a las distancias?'),
    opc('Al girar 180° alrededor del origen el punto $(-5, 2)$, queda en:', ['$(5, 2)$', '$(5, -2)$', '$(-5, -2)$', '$(2, -5)$'], 1, 'En una media vuelta cambian los dos signos.', 'Media vuelta: pasa al lado opuesto del origen.'),
  ]);

  const l2 = leccion('icf-ma-espacio-2', 'Vistas y desarrollos planos', guion(
    ['Vistas', 'De frente se ve la torre más alta de cada columna; de lado, la de cada fila.'],
    ['Contar', 'Se suman las alturas, incluso lo que queda oculto.'],
    ['Desarrollo', 'El molde plano que al doblarse arma el cuerpo.'],
    ['Opuestas', 'En fila, dos caras separadas por una quedan opuestas.']), [
    x('vista-frente', 'Este es el plano desde arriba, con la altura de cada torre. Toca los cuadros que se ven **de frente**.', { h: [[2, 1, 1], [1, 1, 3]], alto: 4 },
      'En cada columna se ve la torre más alta: 2, 1 y 3.', 'Recorre cada columna de adelante hacia atrás y quédate con la mayor.'),
    x('vista-izquierda', 'Toca los cuadros que se ven **desde la izquierda**; la fila de atrás queda a la izquierda del dibujo.', { h: [[1, 3, 1], [2, 1, 2], [4, 1, 1]], alto: 4 },
      'De atrás hacia adelante, las filas muestran 4, 2 y 3.', 'En cada fila se ve solamente su torre más alta.'),
    x('torres-suma', 'Los números dicen la altura de cada torre. Cuenta los cubos de cada fila y el total.', { h: [[1, 2, 1], [2, 1, 4], [3, 3, 2]], et: ['adelante', 'en medio', 'atrás', 'total'], ops: ['+', '+', '='], metas: ['4', '7', '8', '19'], fichas: ['4', '7', '8', '19', '3', '9', '15'], mira: ['Suma la fila de adelante: 1, 2 y 1.', 'Suma 2, 1 y 4.', 'Suma 3, 3 y 2.', 'Suma las tres filas.'], trampas: {}, ok: 'También cuentan los que no se ven.' },
      '$4 + 7 + 8 = 19$ cubos, incluidos los que quedan tapados.', 'La altura de una torre ya cuenta los cubos de abajo.'),
    x('plano-maximo', 'De frente se ven columnas de **3** y **5**; desde la izquierda, **4** atrás y **3** adelante. Pon las alturas con la **mayor** cantidad de cubos.', { cols: [3, 5], filas: [4, 3], fichas: ['3', '4', '3', '3', '5', '2'] },
      'Cada torre sube hasta la menor de sus dos alturas.', 'Compara la altura de su columna con la de su fila y usa la menor.'),
    x('cierra-cubo', 'Toca **todos** los moldes que, al doblarse, **cierran** un cubo.', { moldes: [
      [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]], [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]]] },
      'Cierran la cruz, la escalera y la tira de cuatro con una tapa a cada lado.', 'Cuatro en fila dan la vuelta; las otras dos deben quedar de tapas a lados distintos.'),
    x('opuestas-molde', 'Este molde se dobla y arma un cubo. Pon la cara **opuesta** de cada una.', { cel: [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [3, 2]], letras: 'ABCDEF', pide: ['A', 'B', 'E'], fichas: ['C', 'D', 'F', 'B', 'E'] },
      'En la tira, A con C y B con D; las tapas E y F quedan opuestas.', 'En una fila, salta una cara: la siguiente es la opuesta.'),
    x('vecinas-cara', 'Con este molde armado, toca **todas** las caras que se **tocan** con la **T**.', { cel: [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [2, 3]], letras: 'RSTUVW', de: 'T' },
      'T se toca con todas menos con su opuesta, que es R.', 'Busca primero la opuesta de T: es la única que no toca.'),
    x('dado-escondidas', 'En un dado corriente, las caras opuestas suman 7. Se ven **6** arriba, **2** al frente y **4** a la derecha. Pon las escondidas.', { ve: [6, 2, 4], et: ['abajo', 'atrás', 'izquierda'], metas: ['1', '5', '3'], fichas: ['1', '5', '3', '2', '4', '6'], mira: ['Abajo está frente a la de arriba.', 'Atrás está frente a la del frente.', 'Izquierda está frente a la de la derecha.'], trampas: {}, ok: 'Cada pareja suma 7.' },
      'Cada pareja suma 7: $7 - 6 = 1$, $7 - 2 = 5$ y $7 - 4 = 3$.', 'Resta de 7 la cara que está al otro lado.'),
    sol('Un prisma recto tiene base triangular. ¿Qué piezas lleva su desarrollo plano?', ['Lleva [[2]] triángulos', 'Lleva [[3]] rectángulos', 'En total, [[5]] caras'], ['4', '6', '1'], 'Dos bases y una cara por cada lado de la base.', 'Cuenta las bases y los lados de la base.'),
    err('Alguien dibuja el desarrollo de un cilindro.', ['Lleva dos círculos, que son las tapas', 'La cara curva se abre en un rectángulo', 'El rectángulo mide de largo el diámetro del círculo'], 2, ['El rectángulo mide de largo la circunferencia del círculo', 'El rectángulo mide de largo el radio del círculo', 'El rectángulo mide de largo la altura'], 'La cara curva da toda la vuelta al borde de la tapa.', '¿Qué recorre el borde del rectángulo al enrollarse?'),
    opc('Un sólido visto de frente es un triángulo y visto desde arriba es un círculo. El sólido puede ser:', ['Una esfera', 'Un cilindro', 'Un cubo', 'Un cono'], 3, 'El cono se ve como triángulo de frente y como círculo desde arriba.', 'Descarta los que de frente no se ven como un triángulo.'),
  ]);

  const l3 = leccion('icf-ma-espacio-3', 'Coordenadas cartesianas, polares y en 3D', guion(
    ['Cartesianas', 'Cuánto de lado y cuánto de alto.'],
    ['Polares', 'Cuánto girar desde la derecha y cuántos pasos dar.'],
    ['En el espacio', 'Tres números: x, y y la altura z.'],
    ['Distancia', 'Con Pitágoras, sobre las diferencias.']), [
    x('cuarto-vertice', 'A, B y C son vértices **seguidos** de un paralelogramo. Arrastra el punto al vértice **D**.', { A: [-4, -2], B: [-2, 3], C: [4, 3] },
      'De B a A se baja 5 y se va 2 a la izquierda; desde C, lo mismo: $(2, -2)$.', 'D está junto a A y a C: mira cuánto hay de B a A.'),
    x('punto-medio', 'Arrastra el punto al **medio** del segmento **AB**.', { A: [-5, 4], B: [3, -2] },
      'Se promedian: $\\tfrac{-5 + 3}{2} = -1$ y $\\tfrac{4 - 2}{2} = 1$.', 'Promedia las x de los extremos y después sus y.'),
    x('polar-gira', 'Pon el **giro** (desde la derecha, contra el reloj) y los **pasos** para llegar del origen al punto.', { P: [0, -4], r: 4, g: 270 },
      'El punto está abajo: tres cuartos de vuelta, 270°, y 4 pasos.', 'Cuenta los cuartos de vuelta desde la derecha.'),
    x('polar-a-cartesiana', 'Pasa cada punto polar (pasos; giro) a **cartesianas**.', { et: ['(5; 0°)', '(3; 90°)', '(2; 180°)', '(6; 30°)'], metas: ['(5, 0)', '(0, 3)', '(−2, 0)', '(5.2, 3)'], fichas: ['(5, 0)', '(0, 3)', '(−2, 0)', '(5.2, 3)', '(0, 5)', '(3, 5.2)', '(2, 0)'], mira: ['Sin girar, queda a la derecha.', 'Un cuarto de vuelta: arriba.', 'Media vuelta: a la izquierda.', 'A 30°, la altura es la mitad de los pasos.'], trampas: { '2:(2, 0)': 'Media vuelta lo deja a la izquierda.', '3:(3, 5.2)': 'A 30° está más a la derecha que arriba.', '0:(0, 5)': 'Sin girar no sube.' }, ok: 'Girar y caminar.' },
      'A 30° la altura es $6 \\cdot 0.5 = 3$ y el avance, cerca de 5.2.', 'Imagina hacia dónde mira al girar y luego camina.'),
    x('mismo-polar', 'Toca **todas** las instrucciones que llevan al mismo punto que **4 pasos a 60°**.', { casos: [{ t: '4 pasos a 420°', si: true }, { t: '4 pasos a 120°', no: 'A 120° mira hacia la izquierda.' }, { t: '4 pasos a −300°', si: true }, { t: '60 pasos a 4°', no: 'Cambiaste los pasos por el giro.' }, { t: '4 pasos a 780°', si: true }], falta: 'Falta otra: quita o suma vueltas completas.', ok: 'Vueltas completas de 360°.' },
      '$420 - 360 = 60$, $-300 + 360 = 60$ y $780 - 720 = 60$.', 'Una vuelta completa, 360°, no cambia hacia dónde se mira.'),
    x('caja-coordenadas', 'La caja mide **3** en x, **2** en y y **4** en z, con una esquina en el origen. Pon las coordenadas de cada vértice.', { d: [3, 2, 4], ver: [['P', [3, 0, 4]], ['Q', [0, 2, 0]], ['R', [3, 2, 4]]], metas: ['(3, 0, 4)', '(0, 2, 0)', '(3, 2, 4)'], fichas: ['(3, 0, 4)', '(0, 2, 0)', '(3, 2, 4)', '(0, 2, 4)', '(3, 2, 0)'], mira: ['Está arriba, sobre el eje x: no avanza en y.', 'Está en el piso, sobre el eje y.', 'Está en la esquina opuesta al origen.'], trampas: { '1:(0, 2, 4)': 'Q está en el piso: su altura es 0.', '2:(3, 2, 0)': 'R está arriba.' }, ok: 'Lado, fondo y altura.' },
      'P no avanza en y, Q está en el piso y R es la esquina opuesta al origen.', 'Pregunta cuánto avanza en x, en y y en z para llegar.'),
    x('sube-distancia', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Distancia entre $(1, 2)$ y $(9, 17)$.', r: 17, c: '\\sqrt{8^2 + 15^2}', e: { 23: 'Sumaste los catetos: falta Pitágoras.' } },
      { q: 'Diagonal interior de una caja de **2**, **3** y **6**.', r: 7, c: '\\sqrt{4 + 9 + 36}', e: { 11: 'Sumaste los lados: se suman sus cuadrados.' } },
      { q: 'Área del rectángulo con vértices $(-2, 1)$, $(6, 1)$, $(6, 6)$ y $(-2, 6)$.', r: 40, c: '8 \\cdot 5', e: { 26: 'Ese es el perímetro.' } }] },
      '$\\sqrt{64 + 225} = 17$; $\\sqrt{49} = 7$; y $8 \\cdot 5 = 40$.', 'Resta las coordenadas para hallar los lados.'),
    sol('Un dron sale de $(0, 0, 0)$ y llega a $(4, 4, 7)$. ¿Cuánto vuela en línea recta?', ['Los cuadrados son 16, 16 y [[49]]', 'Suman [[81]]', 'Vuela [[9]]'], ['14', '65', '15'], '$\\sqrt{16 + 16 + 49} = 9$.', 'Suma los cuadrados de los tres avances.'),
    err('Alguien pasa $(-3, 0)$ a polares.', ['Está a 3 pasos del origen', 'Está a la izquierda', 'Es 3 pasos a 90°'], 2, ['Es 3 pasos a 180°', 'Es 3 pasos a 0°', 'Es 3 pasos a 270°'], 'A la izquierda se mira tras media vuelta: 180°.', '¿Cuánto hay que girar desde la derecha?'),
    opc('Un punto está a 10 pasos del origen, a 90°. Sus coordenadas cartesianas son:', ['$(0, 10)$', '$(10, 0)$', '$(10, 90)$', '$(0, -10)$'], 0, 'Un cuarto de vuelta deja mirando hacia arriba: $(0, 10)$.', 'Piensa hacia dónde se mira tras un cuarto de vuelta.'),
  ]);

  return mundo('icf-ma-espacio', 'Movimientos y Vistas', 'matematicas', [l1, l2, l3], [
    ['icf-ma-espacio-1', 'Reflejar: igual de lejos, al otro lado.', play('espejo-figura', 'Pinta el reflejo de la figura', { rounds: [{ n: 6, axis: 'v', cells: [[0, 1], [1, 1], [2, 2], [1, 3]] }] }, 'Cada cuadro queda igual de lejos de la línea, en el mismo renglón.', { hint: 'Cuenta cuántos cuadros hay hasta la línea.' })],
    ['icf-ma-espacio-1', 'Girar conserva la forma.', play('gira-figura', 'Gira la figura hasta que quede como la pedida', { rounds: [{ cells: [[0, 0], [0, 1], [0, 2], [1, 2], [1, 0]], k: 3 }] }, 'Tres cuartos de vuelta.', { hint: 'Fíjate en hacia dónde apunta la parte abierta.' })],
    ['icf-ma-espacio-1', 'En una homotecia el área va por el cuadrado.', opc('Se amplía una figura con factor 4. Su área queda multiplicada por:', ['4', '8', '16', '2'], 2, 'El área se multiplica por el factor al cuadrado: 16.', 'Piensa en un cuadrado de lado 1.')],
    ['icf-ma-espacio-2', 'Se cuentan también los que no se ven.', play('cubos-ocultos', '¿Cuántos cubos hay en la pila?', { rounds: [{ h: [[1, 1], [2, 3], [3, 4]] }] }, 'Las alturas suman 14.', { hint: 'Suma la altura de cada torre.' })],
    ['icf-ma-espacio-2', 'La menor de las dos vistas limita la torre.', play('torres-vistas', 'Pon alturas que cumplan las dos vistas', { rounds: [{ front: [2, 4], side: [4, 2] }] }, 'Cada torre no pasa de la menor de sus dos vistas.', { hint: 'Empieza por la torre más alta.' })],
    ['icf-ma-espacio-2', 'Un molde debe cerrar.', opc('El desarrollo plano de una pirámide de base cuadrada lleva:', ['Cuatro triángulos', 'Un cuadrado y cuatro triángulos', 'Dos cuadrados y cuatro rectángulos', 'Cinco triángulos'], 1, 'Una base y una cara triangular por cada lado.', 'Cuenta la base y las caras que llegan a la punta.')],
    ['icf-ma-espacio-3', 'Polares: giro y pasos.', play('mapa-tesoro', 'Programa el **rumbo** y los **pasos** hasta la X', { rounds: [{ a: -2, b: 2, label: 'X' }] }, 'Está a $\\sqrt{8}$ pasos, a 135°.', { hint: 'Está a igual distancia de los dos ejes, arriba a la izquierda.' })],
    ['icf-ma-espacio-3', 'La distancia sale de Pitágoras.', play('punto-distancia', 'Lleva el punto a las distancias pedidas', { rounds: [{ w: 10, h: 8, A: [1, 1], B: [7, 1], dA: 5, dB: 5, names: ['A', 'B'] }] }, 'En $(4, 5)$ está a 5 de los dos: 3 de lado y 4 de alto.', { hint: 'Si está a igual distancia de los dos, ¿en qué vertical queda?' })],
    ['icf-ma-espacio-3', 'Tres coordenadas en el espacio.', opc('Una caja va de $(0, 0, 0)$ a $(5, 3, 2)$. El vértice que está en el piso, opuesto al origen, es:', ['$(5, 3, 2)$', '$(0, 3, 2)$', '$(5, 0, 2)$', '$(5, 3, 0)$'], 3, 'En el piso la altura es 0 y los otros dos avances son completos.', 'En el piso, ¿cuánto vale z?')],
  ]);
})());
