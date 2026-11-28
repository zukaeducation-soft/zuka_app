// Preicfes · Matemáticas, mundos 12 «Dispersión y Comparación» y 13 «Números y Sucesiones», paso a paso (spec
// 2026-11-28-preicfes-paso-a-paso): desde el promedio, la mediana, la fracción y el conjunto hasta lo que pregunta el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Ahorros de cuatro amigos (a, b, c, e, en miles); m enciende el promedio 5 y d las desviaciones.
  const ahorros = (v, K) => {
    const Y = q => 150 - q * 14;
    return [v.a, v.b, v.c, v.e].map((q, i) => {
      const x = 60 + i * 64;
      return K.r(x, Y(q), 36, q * 14, 'fa', 3) + K.t(x + 18, 168, String(Math.round(q)), 's tm') + K.f(v.d, K.l(x + 18, Y(q), x + 18, Y(5), 'lo gr'));
    }).join('') + K.l(40, 150, 320, 150, 'lm') + K.f(v.m, K.l(40, Y(5), 320, Y(5), 'lg d') + K.t(322, Y(5) + 4, '5', 's tg', 'start')) + K.t(170, 22, v.t || '', 'ta');
  };
  // Siete tiempos que se ordenan (o de 0 a 1); m resalta la mediana.
  const DES = [9, 3, 7, 1, 12, 5, 8], ORD = [...DES].sort((a, b) => a - b);
  const ordena = (v, K) => DES.map((n, i) => {
    const x = K.lerp(40 + i * 43, 40 + ORD.indexOf(n) * 43, v.o);
    return K.r(x - 16, 50, 32, 32, v.m && n === 7 ? 'fg' : 'fc', 4) + K.t(x, 72, n, 'b');
  }).join('') + K.f(v.m, K.t(169, 110, 'mediana: 7', 's tg')) + K.t(170, 128, v.t || '', 'ta');
  // Dos cajas sobre una recta de 0 a 12: A (2, 4, 6, 7, 10) y B (3, 5, 8, 11, 12).
  const cajas = (v, K) => {
    const X = x => 30 + x * 23, una = (q, y, cls) => K.l(X(q[0]), y + 12, X(q[4]), y + 12, 'gr') + K.r(X(q[1]), y, X(q[3]) - X(q[1]), 24, cls, 2) +
      K.f(v.m, K.l(X(q[2]), y, X(q[2]), y + 24, 'lo gr'));
    let h = K.l(30, 140, 310, 140, 'lm');
    for (let i = 0; i <= 12; i += 2) h += K.t(X(i), 158, i, 's tm');
    return h + una([2, 4, 6, 7, 10], 40, 'fa') + una([3, 5, 8, 11, 12], 90, 'fg') + K.t(16, 57, 'A', 'b ta') + K.t(16, 107, 'B', 'b tg') +
      K.f(v.q, K.l(X(8), 82, X(12), 82, 'lg gr') + K.t(X(10), 78, 'la mitad de B', 's tg')) + K.f(v.l, K.t(170, 22, 'caja más larga: más regados', 's')) + K.t(170, 176, v.t || '', 'ta');
  };
  // Horas de estudio y puntaje: aparecen n puntos; l guía de Ana; r tendencia; o un punto raro; e predicción lejana.
  const PT = [[1, 30], [2, 40], [3, 42], [4, 55], [5, 58], [6, 70]];
  const nube = (v, K) => {
    const X = x => 50 + x * 36, Y = y => 160 - y * 1.8;
    let h = K.l(40, 160, 320, 160, 'lm') + K.l(40, 20, 40, 160, 'lm') + K.t(318, 176, 'horas', 's tm', 'end') + K.t(46, 18, 'puntaje', 's tm', 'start');
    for (let i = 1; i <= 6; i++) h += K.t(X(i), 176, i, 's tm');
    h += K.f(v.r, K.l(X(0.6), Y(26.8), X(6.4), Y(73.2), 'lg d'));
    h += K.f(v.e, K.l(X(6.4), Y(73.2), X(7.4), Y(81.2), 'lo d') + K.t(X(7.4), Y(81.2) - 4, '¿?', 'b', 'end'));
    h += PT.slice(0, Math.round(v.n)).map(([x, y]) => K.c(X(x), Y(y), 5, 'fa')).join('');
    h += K.f(v.l, K.l(X(2), Y(40), X(2), 160, 'lg d') + K.l(40, Y(40), X(2), Y(40), 'lg d') + K.t(X(2) + 8, Y(40) - 6, 'Ana (2, 40)', 's', 'start'));
    return h + K.f(v.o, K.c(X(5.5), Y(22), 6, 'fF') + K.t(X(5.5) - 10, Y(22) + 4, 'raro', 's', 'end'));
  };
  // Barra partida en d pedazos iguales, con n pintados.
  const barra = (v, K) => {
    const d = Math.round(v.d), w = 260 / d;
    let h = '';
    for (let i = 0; i < d; i++) h += K.r(40 + i * w, 50, w - 3, 40, i < Math.round(v.n) ? 'fa' : 'fc', 3);
    return h + K.t(170, 124, v.t || '', 'ta');
  };
  // Un conjunto: e pone a martes y miércoles adentro; f pone el lunes afuera.
  const conjunto = (v, K) => K.r(16, 8, 308, 140, 'fn', 6) + K.c(130, 80, 62, 'fa') + K.t(312, 28, 'días de la semana', 's tm', 'end') + K.t(130, 32, 'empiezan por m', 's ta') +
    K.f(v.e, K.t(130, 76, 'martes', 'b') + K.t(130, 100, 'miércoles', 'b')) + K.f(v.f, K.t(260, 90, 'lunes', 'b')) + K.t(170, 170, v.t || '', 'ta');
  // Venn de fútbol (F) y baloncesto (B) en un grupo de 40.
  const venn = (v, K) => K.r(16, 8, 308, 130, 'fn', 6) + K.c(134, 73, 52, 'fa') + K.c(206, 73, 52, 'fg') + K.t(80, 28, 'F', 'b ta') + K.t(262, 28, 'B', 'b tg') +
    K.f(v.b, K.t(170, 78, '7', 'b')) + K.f(v.a, K.t(112, 78, '11', 'b')) + K.f(v.c, K.t(228, 78, '8', 'b')) + K.f(v.u, K.t(300, 128, '14', 'b')) + K.t(170, 160, v.t || '', 'ta');
  // Cuatro diagramas de teatro (T) y canto (C); n: rótulo de cada uno.
  const DG = [[[45, 40, 22], [115, 40, 22]], [[80, 44, 16], [80, 40, 34]], [[80, 40, 34], [80, 44, 16]], [[64, 40, 26], [100, 40, 26]]];
  const diagramas = (v, K) => DG.map((cs, i) => {
    const ox = 14 + (i % 2) * 166, oy = 8 + Math.floor(i / 2) * 92;
    const [t, c] = cs, nt = i === 2 ? 'C' : 'T';
    return K.r(ox, oy, 156, 84, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.t(ox + 14, oy + 22, 'ABCD'[i], 'b') + K.t(ox + 150, oy + 18, (v.n || [])[i] || '', 's tm', 'end') +
      (i === 1 ? K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg') + K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') : i === 2 ? K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') + K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg')
        : K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') + K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg')) +
      (i === 1 ? K.t(ox + 80, oy + 52, 'T', 's') + K.t(ox + 80, oy + 24, 'C', 's') : i === 2 ? K.t(ox + 80, oy + 52, 'C', 's') + K.t(ox + 80, oy + 24, 'T', 's')
        : K.t(ox + t[0] - (i === 3 ? 10 : 0), oy + 48, nt, 's') + K.t(ox + c[0] + (i === 3 ? 10 : 0), oy + 48, 'C', 's'));
  }).join('') + K.t(170, 196, v.t || '', 'ta');
  // n cuadrados hechos con palillos.
  const palillos = (v, K) => {
    const n = Math.round(v.n), x0 = 40, y0 = 40, s = 44;
    let h = '';
    for (let k = 0; k <= n; k++) h += K.l(x0 + k * s, y0, x0 + k * s, y0 + s, 'la gr');
    for (let k = 0; k < n; k++) h += K.l(x0 + k * s, y0, x0 + (k + 1) * s, y0, 'la gr') + K.l(x0 + k * s, y0 + s, x0 + (k + 1) * s, y0 + s, 'la gr');
    return h + K.t(170, 124, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-dispersion-1', {
    conecta: 'icf-ma-datos-2',
    desde: [
      ['Desde cero: qué tan lejos del promedio',
        xpMira('dibujo', 'Antes de la varianza: la **desviación** de un dato es cuánto se aleja del **promedio**.', { dib: ahorros, v: { a: 2, b: 4, c: 6, e: 8, m: 0, d: 0, t: '' }, alto: 180 }, [
          ['En «Promedio, mediana y moda» viste que el promedio reparte todo en partes iguales.', {}],
          ['Cuatro amigos ahorraron 2, 4, 6 y 8 mil.', { t: 'ahorros en miles' }],
          ['Si lo juntan y lo reparten igual, cada uno tendría cinco.', { m: 1, t: 'promedio: 5' }, '$20 \\div 4 = 5$'],
          ['La desviación de cada dato es lo que le falta o le sobra para llegar al promedio.', { d: 1 }],
          ['El de 2 queda a tres por debajo; el de 8, a tres por encima.', { t: 'se alejan 3, 1, 1 y 3' }],
          ['La dispersión dice qué tan lejos quedan, en general, del promedio.', {}],
        ], 'Desviación: distancia de un dato al promedio.'),
        xpHaz('fichas', 'Datos: 10, 12, 14 y 16. Pon el promedio y cuánto se aleja de él el 10.', { slots: fila('promedio', 'se aleja'), fichas: ['13', '3', '6', '12', '52'], meta: ['13', '3'], alto: 96, pista: 'Suma, reparte entre 4 y luego resta.' }, '$52 \\div 4 = 13$ y $13 - 10 = 3$.')],
    ],
    despues: [
      ['Más difícil: el rango engaña',
        xpMira('hoja', 'El **rango** solo mira los dos extremos. Dos grupos pueden tener el mismo rango y estar muy distinto de regados.', { paras: [['Grupo A: 2, 5, 5, 5, 8'], ['Grupo B: 2, 2, 5, 8, 8'], ['Mismo promedio: 5. Mismo rango: 6.'], ['B tiene más datos lejos: más dispersión.']] }, [
          ['Los dos grupos van de dos a ocho y su promedio es cinco.', { luz: [2] }, '$25 \\div 5 = 5$'],
          ['En A, tres datos están justo en el promedio.', { luz: [0], nota: { 0: 'apretado' } }],
          ['En B, cuatro datos están a tres de distancia.', { luz: [1], nota: { 1: 'regado' } }],
          ['B está más disperso aunque el rango sea igual.', { luz: [3] }],
          ['Por eso la desviación estándar mira a todos los datos.', {}],
        ], 'El rango mira dos datos; la desviación mira a todos.'),
        xpHaz('hoja', 'Los tres grupos tienen promedio 7. Subraya el de **mayor** desviación estándar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['7, 7, 7, 7'], ['4, 6, 8, 10'], ['1, 7, 7, 13']], pista: 'Mira qué tan lejos del 7 quedan los datos, y cuánto pesan los lejanos.' }, 'Se alejan 6, 0, 0 y 6: sus cuadrados suman 72.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos atletas tienen el mismo promedio, 12.0 s, en 100 m. La desviación de Juan es 0.2 s y la de Pedro, 0.9 s. ¿Qué conclusión es válida?', { letras: ['A', 'B', 'C', 'D'], paras: [['Juan es más rápido.'], ['Los tiempos de Juan son más parejos.'], ['Pedro corrió más carreras.'], ['Pedro siempre corre más lento.']] }, [
        ['La desviación dice qué tan parejos son, no quién gana.', {}],
        ['Con el mismo promedio, ninguno es más rápido en general.', { luz: [0], nota: { 0: 'no lo dice' } }],
        ['La desviación no cuenta cuántas carreras hubo.', { luz: [2], nota: { 2: 'no lo dice' } }],
        ['«Siempre» es un absoluto que los datos no permiten.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['Menor desviación: tiempos más parecidos entre sí. Sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Menor desviación es más parejo, no mejor ni más rápido.'),
      xpHaz('hoja', 'Dos panaderías venden en promedio 50 panes al día; la desviación de A es 4 y la de B, 15. Subraya la conclusión válida.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['A vende más panes.'], ['B nunca vende 50 panes.'], ['Las ventas de A cambian menos de un día a otro.'], ['B tiene más clientes.']], pista: 'La desviación mide cuánto cambian los datos, no cuánto se vende.' }, 'Desviación 4 frente a 15: A es más estable.')],
    cierre: 'La dispersión mide qué tan lejos del promedio quedan los datos; menor desviación es más parejo, no mejor.',
  });

  xpAmplia('icf-ma-dispersion-2', {
    conecta: 'icf-ma-datos-2',
    desde: [
      ['Desde cero: ordenar y el del medio',
        xpMira('dibujo', 'Percentiles y cajas se construyen con una sola idea: **ordenar** los datos y buscar el **del medio**.', { dib: ordena, v: { o: 0, m: 0, t: '' }, alto: 140 }, [
          ['En «Promedio, mediana y moda» viste que la mediana es el dato del medio.', {}],
          ['Siete tiempos de llegada, en minutos, en desorden.', { t: 'en desorden' }],
          ['Primero se ordenan de menor a mayor.', { o: 1, t: 'en orden' }],
          ['El del medio deja tres a cada lado: es siete.', { m: 1, t: 'tres a cada lado' }],
          ['Con un número par de datos, se promedian los dos del centro.', { t: 'par: promedio de los dos centrales' }],
        ], 'Ordena; la mediana deja la misma cantidad de datos a cada lado.'),
        xpHaz('fichas', 'Datos: 6, 2, 9, 4, 11, 7. Pon los dos del centro y la mediana.', { slots: fila('centro 1', 'centro 2', 'mediana'), fichas: ['6', '7', '6.5', '4', '9'], meta: ['6', '7', '6.5'], alto: 96, pista: 'Ordena primero; con seis datos, el medio queda entre el tercero y el cuarto.' }, '2, 4, 6, 7, 9, 11: la mediana es $\\tfrac{6 + 7}{2} = 6.5$.')],
    ],
    despues: [
      ['Más difícil: comparar dos cajas',
        xpMira('dibujo', 'El examen pone **dos cajas** juntas y pide comparar. Cada caja tiene un cuarto de los datos en cada tramo.', { dib: cajas, v: { m: 0, q: 0, l: 0, t: '' }, alto: 184 }, [
          ['La línea de adentro es la mediana: seis en A y ocho en B.', { m: 1 }],
          ['La mediana no es el promedio: el promedio puede ser otro.', { t: 'mediana no es promedio' }],
          ['En B, la mitad de los datos pasa de ocho; en A, menos de la cuarta parte.', { q: 1 }],
          ['Una caja más larga indica datos más regados, no más datos.', { l: 1 }],
          ['Las dos pueden tener la misma cantidad de datos.', { t: 'mismo número de datos' }],
        ], 'La caja muestra dónde está cada cuarto, no cuántos datos hay.'),
        xpHaz('hoja', 'Una caja tiene mínimo 10, cuartiles 20, 25 y 30, y máximo 50. Subraya qué parte de los datos está entre 20 y 30.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['25 %'], ['50 %'], ['75 %']], pista: 'Entre el primer y el tercer cuartil está la caja.' }, 'La caja guarda la mitad central: dos cuartos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En una prueba de 400 estudiantes, Sara quedó en el percentil 90. ¿Qué afirmación es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sara sacó 90 puntos.'], ['Sara respondió bien el 90 % de las preguntas.'], ['Unos 360 estudiantes sacaron menos que Sara.'], ['Solo 10 estudiantes sacaron más que Sara.']] }, [
        ['El percentil es un lugar en la fila, no una nota.', {}],
        ['Esta toma el 90 como puntaje.', { luz: [0], nota: { 0: 'no es nota' } }],
        ['Esta lo toma como el porcentaje de preguntas buenas.', { luz: [1], nota: { 1: 'no es aciertos' } }],
        ['Esta confunde el 10 % con 10 personas: serían cuarenta.', { luz: [3], nota: { 3: '10 % no es 10' } }, '$0.10 \\cdot 400 = 40$'],
        ['El 90 % de 400 son 360 por debajo: sirve.', { luz: [2], nota: { 2: 'sirve' } }, '$0.9 \\cdot 400 = 360$'],
      ], 'Percentil p: el p % de los datos queda por debajo.'),
      xpHaz('hoja', 'De 250 aspirantes, Tomás quedó en el percentil 60. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Tomás sacó 60 puntos.'], ['Unos 150 aspirantes sacaron menos que Tomás.'], ['60 aspirantes sacaron más que él.'], ['Tomás acertó el 60 % de la prueba.']], pista: 'El percentil dice qué parte de los aspirantes quedó por debajo.' }, '$0.6 \\cdot 250 = 150$ por debajo.')],
    cierre: 'Ordena y busca el medio; la caja parte en cuartos y el percentil es un lugar en la fila, no una nota.',
  });

  xpAmplia('icf-ma-dispersion-3', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: un punto por persona',
        xpMira('dibujo', 'Un **diagrama de dispersión** pone un punto por cada caso, con **dos** datos: uno en cada eje.', { dib: nube, v: { n: 0, l: 0, r: 0, o: 0, e: 0 }, alto: 184 }, [
          ['En «Pendiente como razón de cambio» viste que una recta que sube tiene pendiente positiva.', {}],
          ['Aquí cada punto es una persona: horas de estudio y puntaje.', { n: 1 }],
          ['Ana estudió dos horas y sacó 40: su punto va en (2, 40).', { n: 2, l: 1 }],
          ['Con más personas aparece una nube de puntos.', { n: 6, l: 0 }],
          ['Si la nube sube, a más horas suele haber más puntaje.', { r: 1 }],
        ], 'Cada punto es un caso con dos datos; la nube muestra cómo van juntos.'),
        xpHaz('hoja', 'Cada punto es un día: temperatura y helados vendidos. La nube sube. Subraya lo que se puede leer.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los días más calientes suelen venderse más helados.'], ['Cada grado más vende exactamente 10 helados más.'], ['El calor no tiene relación con los helados.']], pista: 'Una nube que sube dice «suele», no «exactamente».' }, 'Una nube que sube: correlación positiva.')],
    ],
    despues: [
      ['Más difícil: el punto raro y predecir lejos',
        xpMira('dibujo', 'Dos trampas: un **punto raro** que cambia la lectura y **predecir** muy lejos de los datos medidos.', { dib: nube, v: { n: 6, l: 0, r: 1, o: 0, e: 0 }, alto: 184 }, [
          ['Esta nube sube con claridad.', {}],
          ['Aparece un punto raro: mucho estudio y poco puntaje.', { o: 1 }],
          ['Debilita la correlación, pero no la vuelve negativa.', {}],
          ['Otra trampa: alargar la línea muy lejos de los datos.', { e: 1 }],
          ['Con datos de 1 a 6 horas, predecir para 20 horas no es confiable.', {}],
        ], 'Un punto raro debilita; predecir fuera de los datos no es confiable.'),
        xpHaz('hoja', 'Con niños de 2 a 10 años, la línea es estatura = 6 · edad + 80, en cm. Subraya la predicción **menos** confiable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['A los 5 años: 110 cm'], ['A los 8 años: 128 cm'], ['A los 40 años: 320 cm']], pista: 'Busca la edad que queda fuera de los datos medidos.' }, 'Los 40 años están lejos de los datos: nadie mide 3.2 m.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En 30 ciudades, donde hay más bibliotecas hay menos delitos (r = −0.7). ¿Qué conclusión se apoya en los datos?', { letras: ['A', 'B', 'C', 'D'], paras: [['Construir bibliotecas baja los delitos.'], ['Hay una relación negativa y bastante fuerte entre las dos.'], ['No hay relación porque r es negativo.'], ['Toda ciudad con muchas bibliotecas tiene pocos delitos.']] }, [
        ['Los datos muestran que van juntas, no que una cause la otra.', {}],
        ['Esta afirma una causa: haría falta un experimento.', { luz: [0], nota: { 0: 'causa' } }],
        ['Esta lee el signo como si no hubiera relación.', { luz: [2], nota: { 2: 'signo' } }],
        ['Esta generaliza a todas: una correlación admite excepciones.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['Negativa y bastante fuerte, sin hablar de causa: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Correlación dice sentido y fuerza; nunca causa ni «todos».'),
      xpHaz('hoja', 'En 50 familias, las que tienen más carros gastan más en comida (r = 0.6). Subraya la conclusión que se apoya en los datos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Comprar un carro hace gastar más en comida.'], ['Las familias con más carros suelen gastar más en comida.'], ['No hay relación: 0.6 está lejos de 1.'], ['Toda familia con dos carros gasta más que una con uno.']], pista: 'Descarta las que hablan de causa, de siempre o de ninguna relación.' }, 'Positiva y moderada: «suelen», sin causa.')],
    cierre: 'Cada punto es un caso; la nube dice si van juntas y qué tan fuerte, pero ir juntas no es causar.',
  });

  xpAmplia('icf-ma-numeros-1', {
    conecta: 'icf-ma-proporcion-2',
    desde: [
      ['Desde cero: qué es una fracción',
        xpMira('dibujo', 'Una **fracción** parte un entero en pedazos iguales y toma algunos.', { dib: barra, v: { d: 5, n: 0, t: '' }, alto: 136 }, [
          ['En «Porcentajes y cambios» viste que el 25 % es la cuarta parte.', {}],
          ['El de abajo, el denominador, dice en cuántos pedazos iguales se parte.', { t: 'denominador: 5 pedazos' }],
          ['El de arriba, el numerador, dice cuántos pedazos se toman.', { n: 3, t: '3/5' }],
          ['La raya es una división: tres entre cinco da 0.6.', { t: '3/5 = 0.6' }, '$3 \\div 5 = 0.6$'],
          ['Y 0.6 es lo mismo que 60 de cada 100: el 60 %.', { t: '3/5 = 0.6 = 60 %' }],
        ], 'Abajo, en cuántas partes; arriba, cuántas se toman.'),
        xpHaz('fichas', 'Una barra está partida en 8 pedazos iguales y se pintan 2. Pon la fracción simplificada y su decimal.', { slots: fila('fracción', 'decimal'), fichas: ['1/4', '0.25', '1/8', '0.28', '4/2'], meta: ['1/4', '0.25'], alto: 96, pista: 'Dos de ocho es lo mismo que una de cuatro.' }, '$\\tfrac{2}{8} = \\tfrac{1}{4} = 0.25$.')],
    ],
    despues: [
      ['Más difícil: comparar formas distintas',
        xpMira('hoja', 'Para comparar números escritos de distinta forma, se pasan **todos a decimal**. ¿Cuál es mayor: 3/8, 0.4 o 35 %?', { paras: [['3/8 = 0.375'], ['0.4 = 0.400'], ['35 % = 0.350'], ['Orden: 35 % < 3/8 < 0.4']] }, [
          ['Tres octavos es tres entre ocho.', { luz: [0] }, '$3 \\div 8 = 0.375$'],
          ['Al decimal se le agregan ceros para comparar cifra por cifra.', { luz: [1] }],
          ['El porcentaje se divide entre cien.', { luz: [2] }],
          ['Ya en decimales, se ordenan sin problema.', { luz: [3] }],
          ['Trampa: creer que 3/8 es grande porque el ocho es grande.', { luz: [0], nota: { 0: 'no es el mayor' } }],
        ], 'Todo a decimal, con las mismas cifras, y después se compara.'),
        xpHaz('fichas', 'Pon el **mayor** y el **menor** de: 2/3, 0.6 y 65 %.', { slots: fila('mayor', 'menor'), fichas: ['2/3', '0.6', '65 %'], meta: ['2/3', '0.6'], alto: 96, pista: 'Pasa todos a decimal: 2 entre 3 da 0.666…' }, '0.666…, 0.6 y 0.65.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una célula mide $2 \\cdot 10^{-5}$ m y un grano de arena, $5 \\cdot 10^{-4}$ m. ¿Cuántas veces más grande es el grano?', { letras: ['A', 'B', 'C', 'D'], paras: [['2.5 veces'], ['25 veces'], ['250 veces'], ['0.04 veces']] }, [
        ['Cuántas veces más grande: se divide el grande entre el pequeño.', {}, '$\\tfrac{5 \\cdot 10^{-4}}{2 \\cdot 10^{-5}}$'],
        ['Los números de adelante: cinco entre dos es 2.5.', {}],
        ['Las potencias se restan: menos cuatro menos menos cinco es uno.', {}, '$10^{-4 - (-5)} = 10^1$'],
        ['Esta olvidó la potencia de diez.', { luz: [0], nota: { 0: 'sin la potencia' } }],
        ['Esta dividió al revés: daría menos de uno.', { luz: [3], nota: { 3: 'al revés' } }],
        ['2.5 por 10 da 25: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Divide los números de adelante y resta los exponentes.'),
      xpHaz('hoja', 'Un glóbulo rojo mide $8 \\cdot 10^{-6}$ m y una hormiga, $4 \\cdot 10^{-3}$ m. Subraya cuántas veces más larga es la hormiga.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['50 veces'], ['500 veces'], ['5 000 veces'], ['0.002 veces']], pista: 'Divide los números de adelante y resta los exponentes; 4 entre 8 da 0.5.' }, '$0.5 \\cdot 10^{3} = 500$.')],
    cierre: 'Fracción, decimal y porcentaje son el mismo número; para comparar, a decimal; en potencias, resta exponentes.',
  });

  xpAmplia('icf-ma-numeros-2', {
    conecta: 'icf-ma-azar-4',
    desde: [
      ['Desde cero: qué es un conjunto',
        xpMira('dibujo', 'Un **conjunto** es una colección bien definida: se sabe con seguridad quién está y quién no.', { dib: conjunto, v: { e: 0, f: 0, t: '' }, alto: 180 }, [
          ['En «Tablas y eventos dependientes» contaste casos en una tabla de dos entradas.', {}],
          ['Ejemplo: los días de la semana que empiezan por m.', { t: 'el rectángulo es el universo' }],
          ['Martes y miércoles cumplen: son sus elementos y van adentro.', { e: 1, t: 'elementos: adentro' }],
          ['El lunes no empieza por m: queda afuera, pero en el universo.', { f: 1, t: 'el resto: afuera' }],
          ['«Los días bonitos» no sería un conjunto: depende del gusto.', { t: 'bien definido: sin gustos' }],
        ], 'Conjunto: se sabe quién está; el rectángulo es el universo.'),
        xpHaz('hoja', 'Subraya la colección que **sí** es un conjunto bien definido.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las canciones bonitas'], ['Los números pares menores que 10'], ['Las personas altas del barrio']], pista: 'Busca la que no depende del gusto de cada quien.' }, '{2, 4, 6, 8}: no hay duda de quién está.')],
    ],
    despues: [
      ['Más difícil: «juega fútbol» no es «solo fútbol»',
        xpMira('dibujo', 'De 40 estudiantes, 18 juegan fútbol, 15 baloncesto y 7 los dos. Las palabras **solo** y **ninguno** mandan.', { dib: venn, v: { a: 0, b: 0, c: 0, u: 0, t: '' }, alto: 172 }, [
          ['«Juegan fútbol» incluye a los que también juegan baloncesto.', { t: '18 incluye a los 7' }],
          ['Siete juegan los dos: van al centro.', { b: 1, t: 'centro: 7' }],
          ['Solo fútbol: dieciocho menos siete, once.', { a: 1, t: 'solo F: 11' }, '$18 - 7 = 11$'],
          ['Solo baloncesto: quince menos siete, ocho.', { c: 1, t: 'solo B: 8' }, '$15 - 7 = 8$'],
          ['Ninguno: cuarenta menos los que están adentro.', { u: 1, t: 'ninguno: 14' }, '$40 - 26 = 14$'],
          ['Trampa: restar 18 y 15 de 40 sin quitar el cruce.', {}, '$40 - 33 = 7$'],
        ], 'Llena el centro primero; «solo» resta el cruce.'),
        xpHaz('fichas', 'De 50 personas, 30 leen noticias en el celular, 25 en papel y 12 de las dos formas. Pon solo papel y ninguna.', { slots: fila('solo papel', 'ninguna'), fichas: ['13', '7', '25', '12', '5'], meta: ['13', '7'], alto: 96, pista: 'Empieza por el centro, 12, y después cuenta los de adentro.' }, '$25 - 12 = 13$; adentro hay 43 y $50 - 43 = 7$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Todos los que hacen teatro (T) también cantan (C), pero algunos que cantan no hacen teatro. ¿Qué diagrama lo representa?', { dib: diagramas, v: { n: ['', '', '', ''], t: '' }, alto: 200 }, [
        ['«Todos los de teatro cantan»: nadie de teatro queda fuera de canto.', { t: 'T no se sale de C' }],
        ['Separados diría que nadie hace las dos cosas.', { n: ['nadie ambas', '', '', ''] }],
        ['Aquí canto está dentro de teatro: está invertido.', { n: ['nadie ambas', '', 'invertido', ''] }],
        ['Al cruzarse, queda gente de teatro que no canta.', { n: ['nadie ambas', '', 'invertido', 'T sobra'] }],
        ['Teatro dentro de canto, y canto con gente de sobra: sirve.', { n: ['nadie ambas', 'sirve', 'invertido', 'T sobra'] }],
      ], '«Todos los A son B»: el círculo de A va dentro del de B.'),
      xpHaz('hoja', 'Todas las aves tienen plumas y ningún reptil tiene plumas. Subraya cómo quedan los conjuntos de reptiles (R) y aves (A).', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['R y A se cruzan.'], ['R queda dentro de A.'], ['R y A quedan separados.'], ['A queda dentro de R.']], pista: 'Si un reptil no tiene plumas, ¿puede ser ave?' }, 'Ningún reptil es ave: no se tocan.')],
    cierre: 'Un conjunto deja claro quién está; llena el diagrama del centro hacia afuera y lee bien «todos» y «solo».',
  });

  xpAmplia('icf-ma-numeros-3', {
    conecta: 'icf-ma-curvas-2',
    desde: [
      ['Desde cero: una lista con lugares',
        xpMira('dibujo', 'Una **sucesión** es una lista en orden: primero, segundo, tercero… Cada lugar tiene su número.', { dib: palillos, v: { n: 0, t: '' }, alto: 136 }, [
          ['En «Exponenciales y logarítmicas» viste cantidades que se multiplican paso a paso.', {}],
          ['Con palillos, un cuadrado usa cuatro.', { n: 1, t: 'lugar 1: 4 palillos' }],
          ['Dos cuadrados pegados usan siete: el lado del medio se comparte.', { n: 2, t: '4, 7' }],
          ['Tres usan diez: cada cuadrado nuevo suma tres.', { n: 3, t: '4, 7, 10' }],
          ['Para el lugar n: uno más tres por n.', { n: 4, t: 'lugar n: 1 + 3n' }, '$1 + 3 \\cdot 4 = 13$'],
        ], 'La regla del lugar n permite saltar a cualquier término.'),
        xpHaz('fichas', 'Con la regla 1 + 3n, pon cuántos palillos usan 10 cuadrados y cuántos cuadrados se hacen con 61 palillos.', { slots: fila('10 cuadrados', 'con 61'), fichas: ['31', '20', '30', '21', '40'], meta: ['31', '20'], alto: 96, pista: 'Reemplaza n = 10; para 61, quita uno y divide entre tres.' }, '$1 + 30 = 31$ y $(61 - 1) \\div 3 = 20$.')],
    ],
    despues: [
      ['Más difícil: término o suma',
        xpMira('fichas', 'El examen distingue **el término** de un lugar y **la suma** de varios. Sucesión 3, 5, 7…', { slots: fila('término 10', 'suma de 10'), fichas: ['21', '120'], alto: 96 }, [
          ['La sucesión 3, 5, 7… suma dos cada vez.', {}],
          ['El término diez está a nueve saltos del tres.', { pon: { 0: '21' } }, '$3 + 9 \\cdot 2 = 21$'],
          ['La suma de los diez primeros junta todos los términos.', {}],
          ['Se emparejan primero y último: cinco parejas de 24.', { pon: { 1: '120' } }, '$5 \\cdot 24 = 120$'],
          ['Trampa: responder 21 cuando piden la suma.', { marca: [0] }],
        ], 'Término: un lugar. Suma: todos hasta ese lugar.'),
        xpHaz('fichas', '2, 6, 10, 14… Pon el término 8 y la suma de los 8 primeros.', { slots: fila('término 8', 'suma de 8'), fichas: ['30', '128', '32', '34', '256'], meta: ['30', '128'], alto: 96, pista: 'Siete saltos de 4; luego empareja el primero con el último.' }, '$2 + 7 \\cdot 4 = 30$ y $4 \\cdot 32 = 128$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tira de papel de 2 m se dobla por la mitad una y otra vez. ¿Qué afirmación sobre su largo es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Tras el tercer doblez mide 0.5 m.'], ['Su largo se acerca a 0.'], ['Pierde 0.5 m en cada doblez.'], ['Tras 4 dobleces mide 0.']] }, [
        ['Cada doblez multiplica el largo por un medio: 1, 0.5, 0.25…', {}, '$2 \\cdot \\tfrac{1}{2} = 1$'],
        ['Esta cuenta un doblez de menos: 0.5 m es tras el segundo.', { luz: [0], nota: { 0: 'un paso menos' } }],
        ['Esta resta siempre lo mismo: sería aritmética.', { luz: [2], nota: { 2: 'resta' } }],
        ['Esta dice que llega a cero: solo se acerca.', { luz: [3], nota: { 3: 'no llega' } }],
        ['El largo se achica sin fin hacia cero: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Multiplicar por menos de 1 acerca a cero sin llegar.'),
      xpHaz('hoja', 'Un tanque pierde la mitad de su agua cada semana; hoy tiene 80 litros. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En 2 semanas tiene 40 litros.'], ['Cada semana pierde 40 litros.'], ['El agua se acerca a 0 sin llegar a 0.'], ['En 4 semanas queda vacío.']], pista: 'Escribe 80, 40, 20, 10… y mira qué hace la lista.' }, '80, 40, 20, 10, 5… cada vez la mitad.')],
    cierre: 'Una sucesión es una lista con lugares: halla la regla, separa término de suma y mira a qué se acerca.',
  });
}
