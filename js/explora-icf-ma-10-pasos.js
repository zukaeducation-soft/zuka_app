// Preicfes · Matemáticas, mundo 10 «Funciones que Curvan», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde el plano, las
// potencias y lo que se repite hasta las gráficas, tablas y expresiones que el examen pide reconocer.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const curva = (K, f, X, Y, a, b, cls = 'la gr') => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Y(f(x))]; }), cls);
  // Puntos de y = x²: aparecen n de la lista; c une la curva.
  const PX = [0, 1, 2, 3, -1, -2, -3];
  const cuadrado = (v, K) => {
    const X = x => 170 + x * 40, Y = y => 170 - y * 16;
    let h = K.l(40, Y(0), 300, Y(0), 'lm') + K.l(170, 16, 170, Y(0), 'lm');
    for (let i = -3; i <= 3; i++) if (i) h += K.t(X(i), Y(0) + 16, String(i).replace('-', '−'), 's tm');
    h += K.f(v.c, curva(K, x => x * x, X, Y, -3, 3));
    PX.slice(0, Math.round(v.n)).forEach(x => { h += K.c(X(x), Y(x * x), 5, 'fF') + K.t(X(x) + (x < 0 ? -9 : 9), Y(x * x) - 6, x * x, 's', x < 0 ? 'end' : 'start'); });
    return h;
  };
  // Balón h = −t² + 8t: c los ceros, e el eje, v el vértice.
  const balon = (v, K) => {
    const X = t => 40 + t * 30, Y = h => 160 - h * 8;
    return K.l(30, 160, 300, 160, 'lm') + curva(K, t => -t * t + 8 * t, X, Y, 0, 8) +
      K.f(v.c, K.c(X(0), 160, 5, 'fF') + K.c(X(8), 160, 5, 'fF') + K.t(X(0), 178, '0 s', 's') + K.t(X(8), 178, '8 s', 's')) +
      K.f(v.e, K.l(X(4), 26, X(4), 160, 'lg d') + K.t(X(4), 178, '4 s', 's tg')) +
      K.f(v.v, K.c(X(4), Y(16), 6, 'fg') + K.t(X(4) + 12, Y(16) + 4, '16 m', 'b', 'start'));
  };
  // Cuatro gráficas pequeñas (altura contra tiempo, en 0..1); n: rótulo de cada una.
  const GR = [t => 3.6 * t * (1 - t), t => 0.3 + 2.1 * t - 2.4 * t * t, t => 0.3 - t + 1.2 * t * t, t => 0.3 - 0.3 * t];
  const graficas = (v, K) => GR.map((f, i) => {
    const ox = 14 + (i % 2) * 166, oy = 10 + Math.floor(i / 2) * 92, X = t => ox + 20 + t * 126, Y = h => oy + 72 - h * 60;
    return K.r(ox, oy, 156, 84, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.l(ox + 20, oy + 72, ox + 150, oy + 72, 'lm') + K.l(ox + 20, oy + 8, ox + 20, oy + 72, 'lm') +
      curva(K, f, X, Y, 0, 1) + K.t(ox + 14, oy + 24, 'ABCD'[i], 'b') + K.t(ox + 148, oy + 20, (v.n || [])[i] || '', 's tm', 'end');
  }).join('') + K.t(170, 206, v.t || '', 'ta');
  // Rueda de radio 10 m (70 px): cabina en el ángulo g; h dibuja su altura sobre el centro.
  const rueda = (v, K) => {
    const q = K.at(110, 100, 70, v.g);
    return K.arc(110, 100, 70, 0, 360, 'lm') + K.l(30, 100, 290, 100, 'lr') + K.l(110, 100, q[0], q[1], 'la gr') + K.c(q[0], q[1], 8, 'fa') +
      K.f(v.h, K.l(q[0], q[1], q[0], 100, 'lg d')) + K.l(250, 100, 250, q[1], 'lo gr') + K.c(250, q[1], 5, 'fF') + K.t(262, q[1] + 4, v.r || '', 's', 'start') +
      K.t(110, 190, v.t || '', 'ta');
  };
  // Marea y = 3 + 2 sen(2πt/12), de 0 a 12 h: m línea media, a amplitud, h medio periodo, q periodo.
  const marea = (v, K) => {
    const X = t => 30 + t * 22, Y = y => 150 - y * 22;
    return K.l(30, 150, 300, 150, 'lm') + [0, 3, 6, 9, 12].map(t => K.t(X(t), 166, `${t} h`, 's tm')).join('') + curva(K, t => 3 + 2 * Math.sin(t * Math.PI / 6), X, Y, 0, 12) +
      K.f(v.m, K.l(30, Y(3), 300, Y(3), 'lg d') + K.t(306, Y(3) + 4, '3', 's tg', 'start')) +
      K.f(v.a, K.l(X(3), Y(3), X(3), Y(5), 'lo gr') + K.t(X(3) + 8, Y(4) + 4, '2', 's', 'start')) +
      K.f(v.h, K.l(X(3), 22, X(9), 22, 'lg') + K.t(X(6), 16, 'medio periodo: 6 h', 's tg')) +
      K.f(v.q, K.l(X(0), 34, X(12), 34, 'la') + K.t(X(6), 46, 'periodo: 12 h', 's ta'));
  };
  // Máquina: entra x, sale y con la regla r.
  const maq = (v, K) => K.r(120, 40, 100, 60, 'fa', 8) + K.t(170, 76, v.r || '', 'b') + K.ar(40, 70, 112, 70, 'gr') + K.ar(228, 70, 300, 70, 'gr') +
    K.t(70, 60, String(Math.round(v.x)), 'b') + K.f(v.s, K.t(268, 60, String(Math.round(v.y)), 'b')) + K.t(170, 132, v.t || '', 'ta');
  // Tanque V = 500 − 25t: e el inicio, c el final, d el dominio y el rango.
  const tanque = (v, K) => {
    const X = t => 50 + t * 12, Y = q => 160 - q * 0.26;
    return K.l(50, 160, 300, 160, 'lm') + K.l(50, 20, 50, 160, 'lm') + K.l(X(0), Y(500), X(20), Y(0), 'la gr') +
      K.f(v.e, K.c(X(0), Y(500), 6, 'fF') + K.t(34, Y(500) + 4, '500 L', 's tm', 'end')) +
      K.f(v.c, K.c(X(20), Y(0), 6, 'fF') + K.t(X(20), 178, '20 min', 's tm')) +
      K.f(v.d, K.l(X(0), 188, X(20), 188, 'lo gr') + K.t(X(10), 204, 'dominio: 0 a 20 min', 's') + K.l(42, Y(0), 42, Y(500), 'lg gr') + K.t(150, 40, 'rango: 0 a 500 L', 's tg'));
  };

  xpAmplia('icf-ma-curvas-1', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: el plano y el cuadrado',
        xpMira('dibujo', 'Antes de la parábola: cada punto del plano es una pareja (x, y), y **x²** es x por x.', { dib: cuadrado, v: { n: 0, c: 0 }, alto: 192 }, [
          ['En «Pendiente como razón de cambio» viste que en una recta y sube siempre lo mismo.', {}],
          ['Cada punto es una pareja: cuánto a la derecha y cuánto arriba.', { n: 1 }],
          ['Si y es x por x, con uno da uno y con dos da cuatro.', { n: 3 }, '$1^2 = 1, \\; 2^2 = 4$'],
          ['Los saltos crecen: uno, tres, cinco. No es una recta.', { n: 4 }, '$3^2 = 9$'],
          ['Con negativos da lo mismo: menos dos al cuadrado es cuatro.', { n: 7 }, '$(-2)^2 = 4$'],
          ['Al unir los puntos sale una parábola, simétrica, con su punto más bajo en el centro.', { n: 7, c: 1 }],
        ], 'En y = x² los saltos crecen y la curva es simétrica.'),
        xpHaz('fichas', 'Para $y = x^2$, pon el valor de y cuando $x = 4$ y cuando $x = -5$.', { slots: fila('x = 4', 'x = −5'), fichas: ['16', '25', '8', '−25', '10'], meta: ['16', '25'], alto: 96, pista: 'Multiplica el número por sí mismo; menos por menos da más.' }, '$4 \\cdot 4 = 16$ y $(-5)(-5) = 25$.')],
    ],
    despues: [
      ['Más difícil: tiempo o altura',
        xpMira('dibujo', 'De la misma curva se preguntan **tres** cosas distintas. Un balón: $h = -t^2 + 8t$, en metros y segundos.', { dib: balon, v: { c: 0, e: 0, v: 0 }, alto: 186 }, [
          ['El balón sale del suelo y vuelve a él a los ocho segundos.', { c: 1 }, '$-t(t - 8) = 0$'],
          ['Sube durante la mitad del tiempo: cuatro segundos.', { e: 1 }],
          ['La altura máxima se halla reemplazando ese tiempo.', { v: 1 }, '$-16 + 32 = 16$'],
          ['Trampa: dar el 4 cuando piden la altura, o el 16 cuando piden el tiempo.', {}],
          ['Mira siempre qué pide y en qué unidad: metros o segundos.', {}],
        ], 'Ceros: cuándo sale y cae. Mitad: cuándo está arriba. Reemplazo: qué tan alto.'),
        xpHaz('fichas', 'Una pelota: $h = -2t^2 + 12t$, en metros y segundos. Pon el tiempo de la altura máxima y esa altura.', { slots: fila('tiempo (s)', 'altura (m)'), fichas: ['3', '18', '6', '36', '12'], meta: ['3', '18'], alto: 96, pista: 'Busca los ceros, toma la mitad y reemplaza.' }, 'Ceros 0 y 6; en $t = 3$: $-18 + 36 = 18$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Una piedra se lanza hacia arriba desde un puente de 15 m y cae al río. ¿Qué gráfica de altura contra tiempo la representa?', { dib: graficas, v: { n: ['', '', '', ''], t: '' }, alto: 214 }, [
        ['La piedra sale de 15 m: la gráfica debe empezar arriba del suelo.', { t: 'empieza en 15 m' }],
        ['Esta sube y baja, pero empieza en cero: punto de partida malo.', { n: ['partida mala', '', '', ''] }],
        ['Esta abre hacia arriba: la piedra no baja primero.', { n: ['partida mala', '', 'forma mala', ''] }],
        ['Esta es una recta: la piedra no baja siempre igual.', { n: ['partida mala', '', 'forma mala', 'es recta'] }],
        ['Esta empieza en 15, sube, frena y cae: sirve.', { n: ['partida mala', 'sirve', 'forma mala', 'es recta'] }],
      ], 'En una gráfica mira el punto de partida, la forma y el final.'),
      xpHaz('hoja', 'Un dron despega de una terraza de 10 m, sube un rato y luego baja hasta el suelo. Subraya la descripción de su gráfica.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Empieza en 0, sube y vuelve a 0.'], ['Empieza en 10, sube y termina en 0.'], ['Empieza en 10 y baja siempre.'], ['Empieza en 10, baja y luego sube.']], pista: 'Revisa dónde empieza, qué hace primero y dónde termina.' }, 'Parte de 10, sube primero y termina en el suelo.')],
    cierre: 'x² da saltos que crecen y una curva simétrica; mira partida, forma y si piden tiempo o altura.',
  });

  xpAmplia('icf-ma-curvas-2', {
    conecta: 'icf-ma-finanzas-1',
    desde: [
      ['Desde cero: qué es una potencia',
        xpMira('fichas', 'Una **potencia** es una multiplicación repetida: la **base** se multiplica tantas veces como dice el **exponente**.', { slots: fila('hora 1', 'hora 2', 'hora 3'), fichas: ['2', '4', '8'], alto: 96 }, [
          ['En «Interés simple y compuesto» viste que el compuesto multiplica cada año.', {}],
          ['Una bacteria se parte en dos cada hora: a la hora uno hay dos.', { pon: { 0: '2' } }],
          ['A la hora dos, cada una se parte otra vez: cuatro.', { pon: { 1: '4' } }, '$2 \\cdot 2 = 4$'],
          ['A la hora tres hay ocho: dos multiplicado tres veces.', { pon: { 2: '8' } }, '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$'],
          ['La base es el dos; el exponente, las horas. Se escribe y = 2 a la t.', {}, '$y = 2^t$'],
        ], 'Base: lo que se multiplica. Exponente: cuántas veces.'),
        xpHaz('fichas', 'Pon el valor de $5^3$ y el de $2^6$.', { slots: fila('5³', '2⁶'), fichas: ['125', '64', '15', '12', '32'], meta: ['125', '64'], alto: 96, pista: 'Multiplica la base por sí misma tantas veces como diga el exponente.' }, '$5 \\cdot 5 \\cdot 5 = 125$ y $2^6 = 64$.')],
    ],
    despues: [
      ['Más difícil: ¿lineal o exponencial?',
        xpMira('hoja', 'Al comienzo una tabla lineal y una exponencial se parecen. Para distinguirlas, **resta** o **divide** datos seguidos.', { paras: [['Tabla A: 3, 6, 9, 12'], ['Tabla B: 3, 6, 12, 24'], ['A: suma 3 cada vez'], ['B: multiplica por 2 cada vez']] }, [
          ['Las dos empiezan en tres y siguen en seis.', { luz: [0, 1] }],
          ['En A las diferencias son siempre tres: es lineal.', { luz: [2], nota: { 0: 'lineal' } }],
          ['En B cada dato entre el anterior da siempre dos: es exponencial.', { luz: [3], nota: { 1: 'exponencial' } }],
          ['En el paso diez, A va en 30 y B ya pasa de 1 500.', {}, '$3 \\cdot 2^9 = 1\\,536$'],
          ['Diferencia constante: lineal. Cociente constante: exponencial.', {}],
        ], 'Resta: si da igual, es lineal. Divide: si da igual, es exponencial.'),
        xpHaz('hoja', 'Subraya la tabla que crece de forma **exponencial**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['5, 10, 15, 20'], ['5, 15, 45, 135'], ['5, 8, 11, 14']], pista: 'Divide cada número entre el anterior.' }, 'Cada dato es el anterior por 3.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un lago tiene 400 peces y cada año pierde el 25 % de los que hay. ¿Qué expresión da los peces después de t años?', { letras: ['A', 'B', 'C', 'D'], paras: [['400 · 0.25ᵗ'], ['400 − 0.25t'], ['400 · 0.75ᵗ'], ['0.75 · 400t']] }, [
        ['Pierde un cuarto cada año: queda el 75 % de lo que había.', {}, '$1 - 0.25 = 0.75$'],
        ['Esta multiplica por lo que se pierde, no por lo que queda.', { luz: [0], nota: { 0: 'tasa, no lo que queda' } }],
        ['Esta resta siempre lo mismo: sería una recta.', { luz: [1], nota: { 1: 'lineal' } }],
        ['Esta pone la t multiplicando: crecería en vez de bajar.', { luz: [3], nota: { 3: 'crece' } }],
        ['Esta multiplica cada año por 0.75: sirve.', { luz: [2], nota: { 2: 'sirve' } }, '$400 \\cdot 0.75 = 300$'],
      ], 'En la base va lo que queda: 1 menos la pérdida.'),
      xpHaz('hoja', 'Un carro de 60 millones pierde el 15 % de su valor cada año. Subraya su valor, en millones, después de t años.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['60 · 0.15ᵗ'], ['60 − 0.15t'], ['60 · 1.15ᵗ'], ['60 · 0.85ᵗ']], pista: 'Piensa en el porcentaje que queda, no en el que se pierde.' }, 'Queda el 85 % cada año: $60 \\cdot 0.85^t$.')],
    cierre: 'Exponencial multiplica por lo mismo: divide datos seguidos y pon en la base lo que queda.',
  });

  xpAmplia('icf-ma-curvas-3', {
    conecta: 'icf-ma-forma-4',
    desde: [
      ['Desde cero: lo que se repite',
        xpMira('dibujo', 'Algo es **periódico** si se repite igual cada cierto tiempo, como un semáforo o una rueda de chicago.', { dib: rueda, v: { g: 0, h: 0, r: '', t: '' }, alto: 200 }, [
          ['En «Razones trigonométricas» viste que el seno es el cateto opuesto sobre la hipotenusa.', {}],
          ['Una cabina da vueltas en una rueda de 10 m de radio.', { g: 90, r: '10 m', t: 'arriba: 10 m sobre el centro' }],
          ['Su altura sobre el centro es el radio por el seno del ángulo.', { g: 30, h: 1, r: '5 m', t: 'a 30°: 10 · sen 30°' }, '$10 \\cdot 0.5 = 5$'],
          ['Abajo del centro, la altura es negativa.', { g: 270, h: 0, r: '−10 m', t: 'abajo: −10 m' }],
          ['Al completar la vuelta todo se repite: eso es un periodo.', { g: 360, r: '0 m', t: 'una vuelta: un periodo' }],
        ], 'Lo periódico se repite; la altura en una rueda es radio por seno.'),
        xpHaz('fichas', 'Una rueda tiene radio 8 m. Pon la altura de la cabina sobre el centro a 90° y a 30°.', { slots: fila('a 90°', 'a 30°'), fichas: ['8', '4', '−8', '0', '16'], meta: ['8', '4'], alto: 96, pista: 'A 90° está en lo más alto; el seno de 30° es la mitad.' }, '$8 \\cdot 1 = 8$ y $8 \\cdot 0.5 = 4$.')],
    ],
    despues: [
      ['Más difícil: leer una marea',
        xpMira('dibujo', 'Una tabla de mareas da la altura del agua cada tres horas: 3, 5, 3, 1 y 3 m. De ahí salen centro, amplitud y periodo.', { dib: marea, v: { m: 0, a: 0, h: 0, q: 0 }, alto: 176 }, [
          ['Va de uno a cinco metros: la línea media es tres.', { m: 1 }, '$\\tfrac{1 + 5}{2} = 3$'],
          ['La amplitud es dos, no cuatro: se mide desde el medio.', { a: 1 }, '$5 - 3 = 2$'],
          ['De la marea alta a la baja pasan seis horas: es medio periodo.', { h: 1 }],
          ['El periodo completo es de doce horas.', { q: 1 }],
          ['Trampa: dar el seis como periodo o el cuatro como amplitud.', {}],
        ], 'Amplitud desde el centro; de alto a bajo es medio periodo.'),
        xpHaz('fichas', 'Una boya sube y baja entre 2 m y 8 m y tarda 5 s de lo más alto a lo más bajo. Pon la amplitud y el periodo.', { slots: fila('amplitud', 'periodo (s)'), fichas: ['3', '10', '6', '5', '2.5'], meta: ['3', '10'], alto: 96, pista: 'El centro es 5; de arriba a abajo es medio periodo.' }, '$8 - 5 = 3$ y $2 \\cdot 5 = 10$ s.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un cuarto frío oscila entre −4 °C y 6 °C y repite su ciclo cada 8 horas. ¿Qué expresión lo describe?', { letras: ['A', 'B', 'C', 'D'], paras: [['T = 1 + 5 · sen(…), periodo 8 h'], ['T = 1 + 10 · sen(…), periodo 8 h'], ['T = 2 + 4 · sen(…), periodo 8 h'], ['T = 1 + 5 · sen(…), periodo 4 h']] }, [
        ['Primero el centro: la mitad entre menos cuatro y seis es uno.', {}, '$\\tfrac{-4 + 6}{2} = 1$'],
        ['La amplitud va del centro al máximo: cinco.', {}, '$6 - 1 = 5$'],
        ['Esta usa todo el rango como amplitud: llegaría a once.', { luz: [1], nota: { 1: 'rango, no amplitud' } }],
        ['Esta tiene el centro mal: no baja hasta menos cuatro.', { luz: [2], nota: { 2: 'centro malo' } }, '$2 - 4 = -2$'],
        ['Esta tiene centro y amplitud bien, pero el periodo a la mitad.', { luz: [3], nota: { 3: 'medio periodo' } }],
        ['Esta cumple las tres cosas: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Revisa centro, amplitud y periodo, una cosa a la vez.'),
      xpHaz('hoja', 'El brillo de una luz va de 20 a 80 y se repite cada 2 s. Subraya la expresión que lo describe.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['B = 50 + 60 · sen(…), periodo 2 s'], ['B = 50 + 30 · sen(…), periodo 1 s'], ['B = 50 + 30 · sen(…), periodo 2 s'], ['B = 30 + 50 · sen(…), periodo 2 s']], pista: 'Halla el centro y luego la distancia del centro al máximo.' }, 'Centro 50, amplitud 30 y periodo 2 s.')],
    cierre: 'Lo periódico se repite: centro a la mitad, amplitud desde el centro y periodo de cresta a cresta.',
  });

  xpAmplia('icf-ma-curvas-4', {
    conecta: 'icf-ma-curvas-1',
    desde: [
      ['Desde cero: entrada y salida',
        xpMira('dibujo', 'Una **función** es una regla, como una máquina: le entra un número y le sale otro.', { dib: maq, v: { r: 'x + 3', x: 2, y: 5, s: 0, t: '' }, alto: 146 }, [
          ['En «Cuadráticas» hallaste alturas reemplazando el tiempo en una fórmula.', {}],
          ['La regla de esta máquina es sumar tres.', { t: 'regla: sumar 3' }],
          ['Si entra dos, sale cinco.', { s: 1, t: 'entra 2, sale 5' }, '$2 + 3 = 5$'],
          ['La entrada se llama x y la salida, y.', { t: 'x entra, y sale' }],
          ['Cada pareja es un punto del plano: aquí, el (2, 5).', { t: 'punto (2, 5)' }],
        ], 'Una función toma una entrada x y da una salida y.'),
        xpHaz('fichas', 'La regla es «el doble menos uno». Pon la salida cuando entra 4 y cuando entra 0.', { slots: fila('entra 4', 'entra 0'), fichas: ['7', '−1', '8', '1', '3'], meta: ['7', '−1'], alto: 96, pista: 'Primero el doble y después quita uno.' }, '$2 \\cdot 4 - 1 = 7$ y $2 \\cdot 0 - 1 = -1$.')],
    ],
    despues: [
      ['Más difícil: el contexto pone límites',
        xpMira('dibujo', 'En un problema real, la fórmula vale **solo mientras tenga sentido**. Un tanque: $V = 500 - 25t$.', { dib: tanque, v: { e: 0, c: 0, d: 0 }, alto: 212 }, [
          ['Un tanque de 500 litros pierde 25 litros por minuto.', {}],
          ['El tiempo no puede ser negativo: empieza en cero, con 500 litros.', { e: 1 }],
          ['Se vacía cuando V es cero: a los veinte minutos.', { c: 1 }, '$500 \\div 25 = 20$'],
          ['Dominio: de 0 a 20 minutos. Rango: de 0 a 500 litros.', { d: 1 }],
          ['Trampa: dar minutos cuando piden el rango, que va en litros.', {}],
        ], 'Dominio en la unidad de lo que entra; rango en la de lo que sale.'),
        xpHaz('fichas', 'Un celular tiene 80 % de batería y gasta 4 % por hora. Pon cuántas horas dura y el mayor valor del rango.', { slots: fila('horas', 'mayor %'), fichas: ['20', '80', '100', '4', '16'], meta: ['20', '80'], alto: 96, pista: 'Divide la batería entre lo que gasta en una hora.' }, '$80 \\div 4 = 20$ h; la batería va de 0 a 80 %.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Para $f(x) = (x - 1)(x - 5)$, ¿qué afirmación es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Corta el eje x en −1 y en −5.'], ['Corta el eje y en 5.'], ['Su valor mínimo es 5.'], ['Corta el eje x en 1 y en 5, y el eje y en −5.']] }, [
        ['Con y igual a cero salen los cortes con el eje x: uno y cinco.', {}, '$x - 1 = 0 \\; o \\; x - 5 = 0$'],
        ['Con x igual a cero sale el corte con el eje y.', {}, '$(-1)(-5) = 5$'],
        ['Esta cambia los signos de los ceros.', { luz: [0], nota: { 0: 'signos' } }],
        ['Esta confunde el corte con el eje y con el punto más bajo.', { luz: [2], nota: { 2: 'mínimo −4' } }, '$f(3) = 2 \\cdot (-2) = -4$'],
        ['Esta tiene los ceros bien y el corte con y mal: media verdad.', { luz: [3], nota: { 3: 'media verdad' } }],
        ['Corta el eje y en cinco: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Eje x: y = 0. Eje y: x = 0. Una opción a medias es falsa.'),
      xpHaz('hoja', '$g(x) = 2x - 8$, con x entre 0 y 10. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Corta el eje x en 8.'], ['Su rango va de −8 a 12.'], ['Su dominio va de −8 a 12.'], ['Corta el eje y en 4.']], pista: 'Calcula g en los bordes del dominio y donde vale cero.' }, '$g(0) = -8$ y $g(10) = 12$.')],
    cierre: 'Una salida por entrada; dominio lo que entra, rango lo que sale, y cada corte con su cero.',
  });
}
