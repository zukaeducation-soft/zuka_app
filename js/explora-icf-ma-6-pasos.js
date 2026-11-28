// Preicfes · Matemáticas, mundo 6 «Triángulos y Semejanza», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es un
// ángulo, el cuadrado y la raíz, los nombres del triángulo rectángulo, la misma forma con otro tamaño y dividir dos lados, hasta las
// trampas que más salen (paralelas, Pitágoras escondido, el trozo en lugar del lado, k frente a k², la razón mal escogida).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const nombre = g => (g < 89.5 ? 'agudo' : g < 90.5 ? 'recto' : g < 179.5 ? 'obtuso' : 'llano');
  // Ángulo de g grados con vértice en (170, 150).
  const angulo = (v, K) => {
    const [x, y] = K.at(170, 150, 120, v.g);
    return K.l(170, 150, 300, 150, 'lm gr') + K.sec(170, 150, 40, 0, v.g, 'fa') + K.l(170, 150, x, y, 'la gr') + K.c(170, 150, 4, 'fk') +
      K.t(310, 40, `${Math.round(v.g)}°`, 'b', 'end') + K.t(310, 62, v.n ? nombre(v.g) : '', 'ta', 'end') + K.t(170, 182, v.t || '', 's tm');
  };
  // Dos paralelas cortadas por una recta a 65°: k = 1 un ángulo, 2 su copia abajo, 3 los opuestos, 4 los vecinos.
  const PA = [150, 60], PB = [150 - 70 / Math.tan(65 * Math.PI / 180), 130];
  const paralelas = (v, K) => {
    const [x1, y1] = K.at(PA[0], PA[1], 50, 65), [x2, y2] = K.at(PB[0], PB[1], 50, 245);
    let h = K.l(30, 60, 310, 60, 'lm gr') + K.l(30, 130, 310, 130, 'lm gr') + K.l(x1, y1, x2, y2, 'la gr');
    for (const [P, on] of [[PA, v.k >= 1], [PB, v.k >= 2]]) {
      if (on) h += K.sec(P[0], P[1], 20, 0, 65, 'fg');
      if (v.k >= 3 && P === PA) h += K.sec(P[0], P[1], 20, 180, 245, 'fg');
      if (v.k >= 3 && P === PB) h += K.sec(P[0], P[1], 20, 180, 245, 'fg');
      if (v.k >= 4) h += K.sec(P[0], P[1], 20, 65, 180, 'ff') + K.sec(P[0], P[1], 20, 245, 360, 'ff');
    }
    return h + K.t(170, 178, v.t || '', 'ta') + (v.k >= 1 ? K.t(310, 24, '65°', 's tg', 'end') : '') + (v.k >= 4 ? K.t(310, 44, '115°', 's tf', 'end') : '');
  };
  // Cuadrado de k × k baldosas.
  const cuadro = (v, K) => {
    const n = Math.round(v.k), u = 22; let s = '';
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += K.r(120 - n * u / 2 + i * u, 20 + j * u, u - 2, u - 2, 'fa', 2);
    return s + K.t(250, 80, v.t || '', 'ta', 'start');
  };
  // Triángulo rectángulo: catetos 160 × 90, ángulo recto abajo a la derecha.
  const rectangulo = (v, K) => {
    const A = [70, 150], B = [230, 150], C = [230, 60];
    return K.p([A, B, C], 'fn') + K.r(218, 138, 12, 12, 'fn', 0) +
      (v.c ? K.l(A[0], A[1], B[0], B[1], 'lg gr') + K.l(B[0], B[1], C[0], C[1], 'lg gr') + K.t(150, 170, 'cateto', 's tg') + K.t(240, 110, 'cateto', 's tg', 'start') : '') +
      (v.h ? K.l(A[0], A[1], C[0], C[1], 'lf gr') + K.t(134, 92, 'hipotenusa', 's tf', 'end') : '') + K.t(170, 28, v.t || '', 'ta');
  };
  // Techo isósceles de lados 10 y base 12 (u = 12), con la altura.
  const techo = (v, K) => {
    const u = 12, A = [170 - 6 * u, 160], B = [170 + 6 * u, 160], C = [170, 160 - 8 * u];
    return K.p([A, B, C], 'fa') + K.t(130, 104, '10', 's', 'end') + K.t(210, 104, '10', 's', 'start') +
      (v.a ? K.l(170, 160, 170, C[1], 'lg gr') + K.r(170, 148, 12, 12, 'fn', 0) + K.t(134, 178, '6', 's tm') + K.t(206, 178, '6', 's tm') : K.t(170, 178, '12', 's tm')) +
      (v.hh ? K.t(178, 120, v.hh, 's tg', 'start') : '') + K.t(296, 40, v.t || '', 'ta', 'end');
  };
  // Dos fotos: la de 2 × 3 y otra de w × h (u = 20), con una cara adentro.
  const foto = (v, K) => {
    const u = 20, cara = (x, y, w, h) => `<ellipse class="xf fg" cx="${K.n(x + w / 2)}" cy="${K.n(y + h * 0.45)}" rx="${K.n(w * 0.28)}" ry="${K.n(h * 0.28)}"/>`;
    const fw = v.w * u, fh = v.h * u;
    return K.r(30, 190 - 3 * u, 2 * u, 3 * u, 'fc', 2) + cara(30, 190 - 3 * u, 2 * u, 3 * u) + K.t(50, 204, '2 × 3', 's tm') +
      K.r(120, 190 - fh, fw, fh, 'fc', 2) + cara(120, 190 - fh, fw, fh) + K.t(120 + fw / 2, 204, `${String(Math.round(v.w * 10) / 10)} × ${String(Math.round(v.h * 10) / 10)}`, 's tm') + K.t(320, 24, v.t || '', 'ta', 'end');
  };
  // Triángulo con una paralela a la base que corta un tercio desde la punta.
  const encaje = (v, K) => {
    const A = [170, 20], B = [50, 170], C = [290, 170], D = [A[0] + (B[0] - A[0]) / 3, A[1] + 50], E = [A[0] + (C[0] - A[0]) / 3, A[1] + 50];
    return K.p([A, B, C], 'fn') + K.f(v.p, K.p([A, D, E], 'fa')) + K.l(D[0], D[1], E[0], E[1], 'lg gr') +
      (v.l ? K.t(D[0] - 10, (A[1] + D[1]) / 2 + 6, '4', 's tg', 'end') + K.t((D[0] + B[0]) / 2 - 10, (D[1] + B[1]) / 2, v.l > 1 ? '8' : '', 's tf', 'end') + K.t(72, 110, v.l > 1 ? '' : '12', 's tm', 'end') : '') +
      K.t(170, 188, '15', 's tm') + (v.b ? K.t(170, D[1] - 6, v.b, 's tg') : '') + K.t(330, 30, v.t || '', 'ta', 'end');
  };
  // Rampa: sube e y avanza 4e (u = 28).
  const rampa = (v, K) => {
    const u = 28, x0 = 50, y0 = 160, b = 4 * v.e * u, h = v.e * u;
    return K.p([[x0, y0], [x0 + b, y0], [x0 + b, y0 - h]], 'fa') + K.r(x0 + b - 10, y0 - 10, 10, 10, 'fn', 0) + K.ang([x0, y0], [x0 + b, y0], [x0 + b, y0 - h], 34, '', 'fg') +
      K.t(x0 + b / 2, y0 + 18, `avanza ${Math.round(4 * v.e)}`, 's tm') + K.t(x0 + b + 6, y0 - h / 2 + 4, `sube ${Math.round(v.e)}`, 's tm', 'start') + K.t(170, 30, v.t || '', 'ta');
  };
  // Notables: m = 0 equilátero de lado 2, 1 partido en dos (30°-60°-90°), 2 cuadrado con su diagonal (45°).
  const notables = (v, K) => {
    const m = Math.round(v.m);
    if (m === 2) return K.r(120, 50, 100, 100, 'fn', 0) + K.l(120, 150, 220, 50, 'la gr') + K.ang([120, 150], [220, 150], [220, 50], 30, '45°', 'fg') + K.t(170, 168, '1', 's tm') + K.t(230, 104, '1', 's tm', 'start') + K.t(170, 30, v.t || '', 'ta');
    const A = [110, 170], B = [230, 170], C = [170, 170 - 103.92];
    let h = K.p([A, B, C], m ? "fn" : "fa") + K.t(132, 112, '2', 's', 'end') + K.t(208, 112, '2', 's', 'start');
    if (m === 1) h += K.p([C, [170, 170], B], 'fa') + K.l(170, 170, C[0], C[1], 'lg gr') + K.t(200, 186, '1', 's tg') + K.t(164, 128, '√3', 's tg', 'end') + K.ang(C, [170, 170], B, 22, '30°', 'fg');
    else h += K.t(170, 186, '2', 's tm');
    return h + K.t(170, 30, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-forma-1', {
    conecta: 'icf-ma-medida-2',
    desde: [
      ['Desde cero: qué es un ángulo',
        xpMira('dibujo', 'Un **ángulo** es cuánto se abre un rayo respecto a otro. Se mide en **grados**, y la vuelta completa tiene 360.', { dib: angulo, v: { g: 0, n: 0, t: '' }, alto: 196 }, [
          ['En la lección de círculos viste que un sector es una fracción de la vuelta de 360°.', {}],
          ['Un ángulo es la abertura entre dos rayos que salen del mismo punto: el vértice.', { g: 50, t: 'vértice' }],
          ['Media vuelta forma una recta y mide 180°.', { g: 180, n: 1, t: '' }],
          ['Un cuarto de vuelta mide 90°: el ángulo recto, como la esquina de un cuaderno.', { g: 90, n: 1 }],
          ['Un ángulo de menos de 90° se llama agudo.', { g: 40, n: 1 }],
          ['Uno de más de 90° y menos de 180° se llama obtuso.', { g: 130, n: 1 }],
        ], 'Vuelta 360°, recta 180°, recto 90°; menos de 90° agudo, más, obtuso.'),
        xpHaz('dibujo', 'Abre el ángulo hasta **135°**: un recto y medio recto más.', { dib: angulo, v: { g: 30, n: 1 }, metas: { g: 135 }, alto: 240, manijas: [{ k: 'g', min: 0, max: 180, paso: 15, et: 'grados' }],
          lee: v => `$${v.g}^\\circ$`, dice: () => 'Medio recto son 45°.' }, '$90^\\circ + 45^\\circ = 135^\\circ$: un ángulo obtuso.')],
    ],
    despues: [
      ['Más difícil: ángulos entre paralelas',
        xpMira('dibujo', 'Cuando una recta corta dos **paralelas** aparecen ocho ángulos. Parecen muchos, pero solo hay **dos** medidas.', { dib: paralelas, v: { k: 0, t: '' }, alto: 190 }, [
          ['Dos rectas paralelas nunca se cruzan, como los rieles de un tren.', {}],
          ['Una tercera recta las corta y forma cuatro ángulos en cada cruce: ocho en total.', { t: 'ocho ángulos' }],
          ['Este ángulo mide 65°.', { k: 1, t: '65°' }],
          ['Los dos cruces son copias: abajo, en la misma posición, también mide 65°.', { k: 2, t: 'copia' }],
          ['El de enfrente, opuesto por el vértice, es igual: otro 65° en cada cruce.', { k: 3, t: 'opuestos' }],
          ['Los vecinos sobre una recta suman 180°: los que faltan miden 115°.', { k: 4, t: '65° y 115°' }, '$180 - 65 = 115$'],
        ], 'Entre paralelas solo hay dos medidas, y entre las dos suman 180°.'),
        xpHaz('fichas', 'Una recta corta dos paralelas y uno de los ángulos mide 70°. Pon las dos medidas que aparecen en los ocho ángulos.', { slots: fila('iguales a él', 'los otros'), fichas: ['70°', '110°', '20°', '90°', '140°'], meta: ['70°', '110°'], alto: 96, pista: 'Los vecinos sobre una recta completan media vuelta.' }, 'Cuatro miden 70° y cuatro, $180 - 70 = 110^\\circ$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pablo tiene palitos de 4 cm, 6 cm y 11 cm y dice que con ellos arma un triángulo. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 4 + 6 + 11 = 21, que es un número grande.'], ['Sí, porque 11 − 6 = 5 y 4 es menor que 5.'], ['No, porque 4 + 6 = 10, que no alcanza a 11.'], ['No, porque los tres lados deben ser iguales.']] }, [
        ['Prueba clave: los dos lados cortos juntos deben pasar al largo.', {}],
        ['4 + 6 = 10, menos que 11: los cortos no alcanzan. Es No.', {}, '$4 + 6 = 10 < 11$'],
        ['A suma los tres: ese número no decide nada.', { luz: [0], nota: { 0: 'no decide' } }],
        ['B hace una resta cierta, pero que 4 sea menor que 5 dice justo que no cierra.', { luz: [1], nota: { 1: 'concluye mal' } }],
        ['D exige lados iguales: eso es solo el triángulo equilátero.', { luz: [3], nota: { 3: 'falso' } }],
        ['C compara los cortos con el largo. Es la correcta.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Haz la prueba con los dos lados cortos antes de leer los porqués.'),
      xpHaz('hoja', 'Un triángulo tiene ángulos de 50° y 75°. Marta dice que el tercero es obtuso. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 50 + 75 = 125, que pasa de 90.'], ['No, porque el tercero mide 55°, menos de 90.'], ['Sí, porque todo triángulo tiene un ángulo obtuso.'], ['No, porque el tercero mide 125°.']], pista: 'Halla primero el tercer ángulo: los tres suman 180°.' }, '$180 - 125 = 55^\\circ$: es agudo.')],
    cierre: 'Vuelta 360°, recta 180°; entre paralelas, dos medidas; y los lados cortos deben pasar al largo.',
  });

  xpAmplia('icf-ma-forma-2', {
    conecta: 'icf-ma-forma-1',
    desde: [
      ['Desde cero: el cuadrado y la raíz',
        xpMira('dibujo', 'Para Pitágoras hacen falta dos operaciones: **elevar al cuadrado** y su contraria, **sacar la raíz cuadrada**.', { dib: cuadro, v: { k: 1, t: '' }, alto: 170 }, [
          ['En la lección de ángulos viste que un ángulo recto mide 90°, como una esquina.', {}],
          ['Elevar al cuadrado es multiplicar un número por sí mismo: 3² es 3 por 3.', { k: 3, t: '3² = 3 · 3' }],
          ['Se llama así porque es el área de un cuadrado de ese lado: 9 baldosas.', { t: '3² = 9' }],
          ['Un cuadrado de lado 5 tiene 25 baldosas: 5² = 25.', { k: 5, t: '5² = 25' }],
          ['La raíz cuadrada va al revés: un cuadrado de 25 baldosas tiene lado 5.', { t: '√25 = 5' }],
          ['Con números grandes es igual: la raíz de 144 es 12, porque 12 por 12 da 144.', {}, '$\\sqrt{144} = 12$'],
        ], 'Cuadrado: el número por sí mismo. Raíz: el lado del cuadrado que da ese número.'),
        xpHaz('fichas', 'Pon el valor de $7^2$ y de $\\sqrt{81}$.', { slots: fila('7²', '√81'), fichas: ['49', '9', '14', '40.5', '3'], meta: ['49', '9'], alto: 96, pista: 'Al cuadrado no es por 2. La raíz busca el número que, por sí mismo, da 81.' }, '$7 \\cdot 7 = 49$ y $9 \\cdot 9 = 81$.')],
      ['Desde cero: los nombres del triángulo rectángulo',
        xpMira('dibujo', 'Pitágoras solo vale en el **triángulo rectángulo**, y usa los nombres de sus lados.', { dib: rectangulo, v: { c: 0, h: 0, t: '' }, alto: 186 }, [
          ['Un triángulo rectángulo tiene un ángulo recto, marcado con un cuadradito.', { t: 'ángulo recto' }],
          ['Los dos lados que forman el ángulo recto se llaman catetos.', { c: 1, t: 'catetos' }],
          ['El lado de enfrente del ángulo recto se llama hipotenusa.', { h: 1, t: 'hipotenusa' }],
          ['La hipotenusa es siempre el lado más largo.', { t: 'la más larga' }],
          ['Si el triángulo no tiene ángulo recto, Pitágoras no sirve.', { t: '' }],
        ], 'Catetos: los del ángulo recto. Hipotenusa: la de enfrente, la más larga.'),
        xpHaz('hoja', 'Un triángulo rectángulo tiene lados de 9, 12 y 15. Subraya la **hipotenusa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['9'], ['12'], ['15']], pista: 'La hipotenusa está enfrente del ángulo recto. ¿Cómo es comparada con los otros?' }, 'La hipotenusa es la más larga: 15.')],
    ],
    despues: [
      ['Más difícil: Pitágoras escondido',
        xpMira('dibujo', 'Muchas veces el triángulo rectángulo **no está a la vista**: hay que trazarlo, por ejemplo con una altura.', { dib: techo, v: { a: 0, hh: '', t: '' }, alto: 196 }, [
          ['Un techo es un triángulo con dos lados de 10 m y una base de 12 m. ¿Qué tan alto es?', {}],
          ['La altura baja derecho desde la punta y parte la base en dos: 6 y 6.', { a: 1 }],
          ['Aparecen dos triángulos rectángulos, cada uno con hipotenusa 10 y cateto 6.', { a: 1, t: '10 y 6' }],
          ['La altura es el otro cateto: 100 menos 36 da 64, y la raíz es 8.', { a: 1, hh: '8', t: 'altura 8' }, '$\\sqrt{100 - 36} = 8$'],
          ['Con la altura sale el área del techo: 12 por 8 entre 2, son 48 m².', { a: 1, hh: '8', t: 'área 48' }, '$\\tfrac{12 \\cdot 8}{2} = 48$'],
        ], 'Traza la altura o la diagonal: ahí aparece el triángulo rectángulo.'),
        xpHaz('fichas', 'Un triángulo tiene dos lados de 17 y una base de 16. Pon la mitad de la base y la altura.', { slots: fila('mitad de la base', 'altura'), fichas: ['8', '15', '16', '9', '25'], meta: ['8', '15'], alto: 96, pista: 'La altura parte la base en dos. Después, hipotenusa 17 y un cateto conocido.' }, '$\\sqrt{289 - 64} = \\sqrt{225} = 15$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tabla de 25 dm se apoya en un muro, con el pie a 7 dm. Juan halla la altura: 1) 25² + 7² = 674; 2) √674 ≈ 26; 3) llega a 26 dm. ¿Dónde está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['En el paso 1: la tabla es la hipotenusa, así que se resta: 625 − 49 = 576.'], ['En el paso 2: la raíz de 674 no se acerca a 26.'], ['En el paso 3: debió dar la respuesta en metros.'], ['No hay error.']] }, [
        ['Antes de los pasos: ¿puede la altura ser mayor que la tabla misma?', {}],
        ['No: la tabla es la hipotenusa, el lado más largo. 26 dm no puede ser.', { luz: [3], nota: { 3: 'no cuadra' } }],
        ['B revisa la raíz, pero la de 674 sí es casi 26: esa cuenta está bien.', { luz: [1], nota: { 1: 'cuenta bien' } }],
        ['C cambia la unidad, y eso no arregla el error.', { luz: [2], nota: { 2: 'no arregla' } }],
        ['El error está en el paso 1: para un cateto se resta. Da 24 dm.', { luz: [0], nota: { 0: 'correcta' } }, '$\\sqrt{625 - 49} = \\sqrt{576} = 24$'],
      ], 'Antes de seguir los pasos, revisa que la hipotenusa quede como el lado más largo.'),
      xpHaz('hoja', 'Una pantalla mide 24 de ancho y 10 de alto. Ana halla la diagonal: 1) 24 + 10 = 34; 2) 34² = 1 156; 3) la diagonal es 34. ¿Dónde está el error?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['En el paso 1: se suman los cuadrados, 576 + 100 = 676, y la diagonal es 26.'], ['En el paso 2: 34² no es 1 156.'], ['En el paso 3: la diagonal es 1 156.'], ['No hay error.']], pista: 'Recuerda qué se suma en Pitágoras: ¿los lados o sus cuadrados?' }, '$\\sqrt{576 + 100} = \\sqrt{676} = 26$.')],
    cierre: 'Busca el ángulo recto: hipotenusa al cuadrado es la suma; un cateto, la resta.',
  });

  xpAmplia('icf-ma-forma-3', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: misma forma, otro tamaño',
        xpMira('dibujo', 'Dos figuras son **semejantes** si tienen la misma forma, aunque una sea más grande. Piensa en ampliar una foto.', { dib: foto, v: { w: 2, h: 3, t: '' }, alto: 214 }, [
          ['En la lección de escalas viste que una escala multiplica todas las medidas por el mismo número.', {}],
          ['Dos figuras son semejantes si tienen la misma forma, aunque cambie el tamaño.', { t: 'copia igual' }],
          ['Esta foto mide 2 por 3. Ampliada al doble mide 4 por 6: misma forma.', { w: 4, h: 6, t: 'por 2' }],
          ['Si solo estiras el ancho, 4 por 3, la cara se deforma: no es semejante.', { w: 4, h: 3, t: 'deformada' }],
          ['El número por el que se multiplica se llama factor, o razón de semejanza.', { w: 4, h: 6, t: 'factor 2' }],
          ['En las semejantes los ángulos no cambian, y todos los lados crecen por el mismo factor.', {}],
        ], 'Semejantes: misma forma, mismos ángulos, todos los lados por el mismo factor.'),
        xpHaz('dibujo', 'Amplía la foto de 2 por 3 sin deformarla: el ancho ya es **5**. Lleva el alto hasta donde le toca.', { dib: foto, v: { w: 5, h: 4 }, metas: { h: 7.5 }, alto: 250, manijas: [{ k: 'h', min: 1, max: 9, paso: 0.5, et: 'alto' }],
          lee: v => `$5 \\div 2 = 2.5 \\quad ${v.h} \\div 3 = ${Math.round(v.h / 3 * 100) / 100}$`, dice: () => 'Los dos lados deben crecer por el mismo factor.' }, 'Factor 2.5: el alto es $3 \\cdot 2.5 = 7.5$.')],
    ],
    despues: [
      ['Más difícil: el triángulo dentro del triángulo',
        xpMira('dibujo', 'Una paralela a la base corta un triángulo y deja otro pequeño arriba. Son semejantes, pero hay una **trampa**.', { dib: encaje, v: { p: 0, l: 0, b: '', t: '' }, alto: 200 }, [
          ['Una recta paralela a la base corta el triángulo y deja otro pequeño arriba.', {}],
          ['El pequeño y el grande son semejantes: tienen los mismos ángulos.', { p: 1 }],
          ['El lado del grande mide 12 y el del pequeño, 4: el factor es un tercio.', { p: 1, l: 1, t: '4 de 12' }],
          ['La base grande mide 15, así que la pequeña mide 15 entre 3: 5.', { p: 1, l: 1, b: '5', t: 'base 5' }, '$15 \\cdot \\tfrac{4}{12} = 5$'],
          ['Trampa: comparar con el trozo de abajo, que mide 8. Eso da 7.5 y está mal.', { p: 1, l: 2, b: '¿7.5?', t: 'trampa' }],
          ['Se compara lado completo con lado completo, siempre desde el vértice.', { p: 1, l: 1, b: '5', t: '' }],
        ], 'Compara el lado completo del pequeño con el lado completo del grande.'),
        xpHaz('fichas', 'Un lado de un triángulo mide 20 y una paralela a la base lo corta a 5 de la punta. La base mide 16. Pon el factor y la base del triángulo pequeño.', { slots: fila('factor', 'base pequeña'), fichas: ['1/4', '4', '1/3', '5.3', '12'], meta: ['1/4', '4'], alto: 96, pista: 'Compara 5 con el lado completo, no con el trozo que queda abajo.' }, '$\\tfrac{5}{20} = \\tfrac14$ y $16 \\cdot \\tfrac14 = 4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos terrenos tienen la misma forma y el lado del grande es el triple. El pequeño mide 40 m². ¿Cuánto mide el grande?', { letras: ['A', 'B', 'C', 'D'], paras: [['120 m², porque el lado es el triple.'], ['360 m², porque el área crece por 3².'], ['43 m², porque 40 + 3.'], ['1 080 m², porque 40 · 27.']] }, [
        ['Piden un área: el factor de los lados no sirve tal cual.', {}],
        ['Si los lados se triplican, el área crece por 3 por 3: nueve veces.', {}, '$3^2 = 9$'],
        ['A usa el factor de los lados: multiplica solo una vez.', { luz: [0], nota: { 0: 'k, no k²' } }],
        ['C suma el factor, y en semejanza se multiplica.', { luz: [2], nota: { 2: 'suma' } }],
        ['D usa 3 al cubo: eso sería un volumen, no un área.', { luz: [3], nota: { 3: 'volumen' } }],
        ['B: 40 por 9, 360 m². Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$40 \\cdot 9 = 360$'],
      ], 'Largo por k, área por k², volumen por k³.'),
      xpHaz('hoja', 'Dos tanques tienen la misma forma y el grande mide el doble de alto. El pequeño guarda 50 litros. Subraya lo que guarda el grande.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['100 litros'], ['200 litros'], ['400 litros'], ['52 litros']], pista: 'Litros son volumen. ¿Cuántas veces se multiplica el factor 2 en un volumen?' }, 'El volumen crece por $2^3 = 8$: $50 \\cdot 8 = 400$.')],
    cierre: 'Misma forma, mismo factor: lados por k, área por k², volumen por k³, lado completo con lado completo.',
  });

  xpAmplia('icf-ma-forma-4', {
    conecta: 'icf-ma-forma-3',
    desde: [
      ['Desde cero: dividir dos lados',
        xpMira('dibujo', 'La trigonometría empieza con algo sencillo: **dividir** dos lados de un triángulo rectángulo. Piensa en una **rampa**.', { dib: rampa, v: { e: 1, t: '' }, alto: 186 }, [
          ['En la lección de semejanza viste que al agrandar un triángulo, todos sus lados crecen igual.', {}],
          ['Piensa en una rampa que sube 1 metro por cada 4 que avanza.', { t: '1 de 4' }],
          ['Una rampa más larga pero igual de inclinada sube 2 por cada 8.', { e: 2, t: '2 de 8' }],
          ['Al dividir lo que sube entre lo que avanza, da lo mismo en las dos: 0.25.', { t: '0.25' }, '$\\tfrac14 = \\tfrac28 = 0.25$'],
          ['Esa división no depende del tamaño: depende solo de la inclinación, del ángulo.', {}],
          ['Dividir lados de un triángulo rectángulo es justo lo que hace la trigonometría.', {}],
        ], 'Si el ángulo no cambia, la división entre dos lados tampoco cambia.'),
        xpHaz('fichas', 'Una rampa sube 3 m mientras avanza 12 m. Otra, igual de inclinada, avanza 20 m. Pon la división de la primera y lo que sube la segunda.', { slots: fila('sube ÷ avanza', 'sube la otra'), fichas: ['0.25', '5', '4', '0.15', '8'], meta: ['0.25', '5'], alto: 96, pista: 'Igual de inclinada quiere decir la misma división.' }, '$3 \\div 12 = 0.25$ y $20 \\cdot 0.25 = 5$.')],
    ],
    despues: [
      ['Más difícil: los ángulos notables',
        xpMira('dibujo', 'Los ángulos de **30°**, **45°** y **60°** salen tanto que conviene saber sus razones. Se sacan de figuras conocidas.', { dib: notables, v: { m: 0, t: '' }, alto: 196 }, [
          ['Hay ángulos que salen tanto que conviene saber sus razones de memoria.', { t: 'equilátero de lado 2' }],
          ['Parte el triángulo equilátero por la mitad: queda uno de 30°, 60° y 90°.', { m: 1, t: '30°, 60° y 90°' }],
          ['El lado frente a 30° mide 1, la mitad de la hipotenusa: sen 30° = 1/2.', { m: 1, t: 'sen 30° = 1/2' }],
          ['La altura mide raíz de 3, por Pitágoras: 4 menos 1 es 3.', { m: 1, t: 'altura √3' }, '$\\sqrt{2^2 - 1^2} = \\sqrt3$'],
          ['Ahora parte un cuadrado por su diagonal: quedan dos ángulos de 45°.', { m: 2, t: 'medio cuadrado' }],
          ['Los dos catetos son iguales, así que tan 45° = 1.', { m: 2, t: 'tan 45° = 1' }],
        ], 'Medio equilátero: sen 30° = 1/2. Medio cuadrado: tan 45° = 1.'),
        xpHaz('fichas', 'Un triángulo de 30°, 60° y 90° tiene hipotenusa 10. Pon el cateto opuesto a 30° y el seno de 30° en decimal.', { slots: fila('opuesto a 30°', 'sen 30°'), fichas: ['5', '0.5', '10', '0.3', '8.66'], meta: ['5', '0.5'], alto: 96, pista: 'Frente a 30° está la mitad de la hipotenusa.' }, 'La mitad de 10 es 5, y $\\tfrac{5}{10} = 0.5$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'A 30 m de un árbol, su punta se ve con un ángulo de 35° sobre el suelo. ¿Cuál expresión da la altura h del árbol?', { letras: ['A', 'B', 'C', 'D'], paras: [['h = 30 · tan 35°'], ['h = 30 · sen 35°'], ['h = 30 ÷ tan 35°'], ['h = tan 35° ÷ 30']] }, [
        ['Ubica lo que tienes desde el ángulo: los 30 m son el cateto adyacente.', {}],
        ['Lo que buscas, la altura, está enfrente del ángulo: es el opuesto.', {}],
        ['La razón que une opuesto y adyacente es la tangente.', {}, '$\\tan 35^\\circ = \\tfrac{h}{30}$'],
        ['B usa el seno, que necesita la hipotenusa, y no la tienes.', { luz: [1], nota: { 1: 'sin hipotenusa' } }],
        ['C y D despejan mal: si h entre 30 da la tangente, h queda multiplicando.', { luz: [2, 3], nota: { 2: 'despeje', 3: 'despeje' } }],
        ['A multiplica 30 por la tangente. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Nombra los lados desde el ángulo y escoge la razón que une lo que tienes con lo que buscas.'),
      xpHaz('hoja', 'Una cuerda de 50 m va de la punta de una antena al suelo y forma 60° con el suelo. Subraya la expresión de la altura h de la antena.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['h = 50 · tan 60°'], ['h = 50 · cos 60°'], ['h = 50 · sen 60°'], ['h = 50 ÷ sen 60°']], pista: 'La cuerda es la hipotenusa. ¿La altura está enfrente del ángulo o junto a él?' }, 'Opuesto entre hipotenusa es el seno: $h = 50 \\cdot \\operatorname{sen} 60^\\circ$.')],
    cierre: 'Dividir lados da razones que solo dependen del ángulo; nombra desde θ y escoge la que une lo que tienes.',
  });
}
