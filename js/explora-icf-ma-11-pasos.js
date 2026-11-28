// Preicfes · Matemáticas, mundo 11 «Movimientos y Vistas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde ubicar un
// punto, contar caras y medir con restas hasta los movimientos, vistas y distancias que pide el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const sg = n => String(n).replace('-', '−');
  // Cuadrícula de −4 a 4 con un punto (px, py) y sus guías.
  const U = 20, X = x => 170 + x * U, Y = y => 100 - y * U;
  const red = K => { let h = ''; for (let i = -4; i <= 4; i++) h += K.l(X(i), Y(-4), X(i), Y(4), i ? 'lr' : 'lm') + K.l(X(-4), Y(i), X(4), Y(i), i ? 'lr' : 'lm'); return h; };
  const punto = (v, K) => red(K) + K.l(X(v.px), Y(0), X(v.px), Y(v.py), 'lg d') + K.l(X(0), Y(v.py), X(v.px), Y(v.py), 'lg d') +
    K.c(X(v.px), Y(v.py), 6, 'fF') + K.t(170, 198, v.t || '', 'ta');
  // Cubo grande con una cara (c), una arista (a) y un vértice (p) resaltados.
  const cubo = (v, K) => {
    const o = [150, 160], u = 64, I = (x, y, z) => K.iso(o, u, x, y, z);
    return K.caja(o, u, 1, 1, 1, 'fa', false) + K.f(v.c, K.p([I(0, 0, 1), I(1, 0, 1), I(1, 1, 1), I(0, 1, 1)], 'fg')) +
      K.f(v.a, K.l(...I(0, 0, 0), ...I(0, 0, 1), 'lo gr')) + K.f(v.p, K.c(...I(0, 0, 1), 7, 'fF')) + K.t(170, 196, v.t || '', 'ta');
  };
  // Dos moldes de seis cuadrados: la cruz (a) y la fila (b); x tacha la fila.
  const moldes = (v, K) => {
    const q = (x, y, cls) => K.r(x, y, 22, 22, cls, 2);
    let h = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]].map(([c, f]) => q(30 + c * 24, 30 + f * 24, v.a ? 'fg' : 'fc')).join('');
    h += Array.from({ length: 6 }, (_, i) => q(182 + i * 24, 54, v.b ? 'fa' : 'fc')).join('');
    return h + K.f(v.a, K.t(78, 122, 'cierra', 's tg')) + K.f(v.b, K.t(254, 122, 'no cierra', 's ta')) +
      K.f(v.x, K.l(178, 50, 330, 80, 'lo gr') + K.l(178, 80, 330, 50, 'lo gr')) + K.t(170, 150, v.t || '', 'ta');
  };
  // Torre de cubos (columnas de 3, 1 y 1) y cuatro vistas posibles; n: rótulo de cada vista.
  const VI = [[3, 1, 1], [1, 1, 1], [1, 1, 3], [5]];
  const vistas = (v, K) => {
    let h = '';
    [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2]].forEach(([c, z]) => { h += K.caja(K.iso([40, 140], 22, c, 0, z), 22, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); });
    VI.forEach((cols, i) => {
      const ox = 146 + (i % 2) * 98, oy = 8 + Math.floor(i / 2) * 92;
      h += K.r(ox, oy, 92, 86, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.t(ox + 14, oy + 22, 'ABCD'[i], 'b') + K.t(ox + 86, oy + 18, (v.n || [])[i] || '', 's tm', 'end');
      cols.forEach((n, c) => { for (let z = 0; z < n; z++) h += K.r(ox + 26 + c * 14, oy + 70 - z * 11, 13, 10, 'fa', 1); });
    });
    return h + K.t(70, 178, v.t || '', 's ta');
  };
  // Cuadrícula de 0 a 8: de (1, 1) a (3, 5) en escalera (h, vv) y en línea recta (d).
  const G = x => 90 + x * 20, H = y => 180 - y * 20;
  const escalera = (v, K) => {
    let h = '';
    for (let i = 0; i <= 8; i++) h += K.l(G(i), H(0), G(i), H(8), i ? 'lr' : 'lm') + K.l(G(0), H(i), G(8), H(i), i ? 'lr' : 'lm');
    return h + K.c(G(1), H(1), 6, 'fa') + K.c(G(3), H(5), 6, 'fa') + K.t(G(1) - 8, H(1) + 16, '(1, 1)', 's', 'end') + K.t(G(3) + 10, H(5) - 6, '(3, 5)', 's', 'start') +
      K.f(v.h, K.l(G(1), H(1), G(3), H(1), 'lo gr') + K.t(G(2), H(1) + 16, '2', 'b')) +
      K.f(v.vv, K.l(G(3), H(1), G(3), H(5), 'lg gr') + K.t(G(3) + 10, H(3), '4', 'b', 'start')) +
      K.f(v.d, K.l(G(1), H(1), G(3), H(5), 'la gr') + K.t(G(1) - 6, H(3), '√20', 'b ta', 'end'));
  };
  // Polar: 10 m a g grados desde (50, 170), 12 px por metro; x e y encienden las proyecciones.
  const dron = (v, K) => {
    const q = K.at(50, 170, 120, v.g);
    return K.l(30, 170, 320, 170, 'lm') + K.l(50, 20, 50, 186, 'lm') + K.arc(50, 170, 28, 0, Math.max(0.3, v.g), 'lo gr') + K.t(88, 160, `${Math.round(v.g)}°`, 's') +
      K.l(50, 170, q[0], q[1], 'la gr') + K.c(q[0], q[1], 7, 'fF') + K.t(q[0] + 10, q[1] - 6, '10 m', 's', 'start') +
      K.f(v.y, K.l(q[0], q[1], q[0], 170, 'lg d') + K.t(q[0] + 8, (q[1] + 170) / 2, 'altura 5', 's tg', 'start')) +
      K.f(v.x, K.l(50, 178, q[0], 178, 'lo gr') + K.t((50 + q[0]) / 2, 196, 'a la derecha 8.7', 's'));
  };

  xpAmplia('icf-ma-espacio-1', {
    conecta: 'icf-ma-forma-3',
    desde: [
      ['Desde cero: ubicar un punto',
        xpMira('dibujo', 'Para mover figuras hay que saber **ubicar** puntos: cada uno tiene dos números, primero x y después y.', { dib: punto, v: { px: 0, py: 0, t: '(0, 0): el centro' }, alto: 206 }, [
          ['En «Tales y semejanza» viste figuras con la misma forma y distinto tamaño.', {}],
          ['El punto (2, 3) está dos a la derecha y tres arriba del centro.', { px: 2, py: 3, t: '(2, 3)' }],
          ['Los negativos van a la izquierda o hacia abajo.', { px: -3, py: -1, t: '(−3, −1)' }],
          ['El primer número siempre es el de los lados; el segundo, el de altura.', { px: 1, py: -2, t: '(1, −2)' }],
          ['Mover una figura es cambiar los números de sus puntos.', { px: 3, py: -2, t: '(1, −2) → (3, −2)' }],
        ], 'Primero x (lados) y después y (altura); los negativos van a la izquierda o abajo.'),
        xpHaz('dibujo', 'Arrastra el punto hasta $(-2, 3)$.', { dib: punto, v: { px: 1, py: -1, t: '' }, alto: 206, metas: { px: -2, py: 3 },
          manijas: [{ k: ['px', 'py'], min: -4, max: 4, paso: 1, en: v => [X(v.px), Y(v.py)], de: (x, y) => [(x - 170) / U, (100 - y) / U] }],
          dice: v => `Está en (${sg(v.px)}, ${sg(v.py)}).`, pista: 'Dos a la izquierda y tres arriba.' }, '$(-2, 3)$: dos a la izquierda, tres arriba.')],
    ],
    despues: [
      ['Más difícil: el orden de los movimientos',
        xpMira('fichas', 'Con **dos** movimientos seguidos, el **orden** puede cambiar el resultado. Punto (2, 1).', { slots: fila('orden 1', 'orden 2'), fichas: ['(1, 1)', '(−5, 1)'], alto: 96 }, [
          ['Orden 1: reflejar en el eje y y luego correr 3 a la derecha.', {}],
          ['Reflejar da (−2, 1); correr tres da (1, 1).', { pon: { 0: '(1, 1)' } }, '$-2 + 3 = 1$'],
          ['Orden 2: primero correr 3 a la derecha da (5, 1).', {}],
          ['Y reflejar (5, 1) da (−5, 1): otro lugar.', { pon: { 1: '(−5, 1)' } }],
          ['Haz los movimientos uno a la vez y en el orden que dicen.', { marca: [0, 1] }],
        ], 'Un movimiento a la vez y en el orden del enunciado.'),
        xpHaz('fichas', 'El punto (3, 2) gira 180° con centro en el origen y luego baja 4. Pon el punto tras el giro y el final.', { slots: fila('tras el giro', 'final'), fichas: ['(−3, −2)', '(−3, −6)', '(3, −2)', '(−3, 2)', '(−7, −2)'], meta: ['(−3, −2)', '(−3, −6)'], alto: 96, pista: 'Media vuelta cambia los dos signos; bajar cambia la y.' }, '$(3, 2) \\to (-3, -2) \\to (-3, -6)$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un triángulo con vértices (1, 1), (4, 1) y (1, 3) pasa a (−1, 1), (−4, 1) y (−1, 3). ¿Qué movimiento se hizo?', { letras: ['A', 'B', 'C', 'D'], paras: [['Traslación de 2 a la izquierda.'], ['Reflexión en el eje y.'], ['Rotación de 180°.'], ['Reflexión en el eje x.']] }, [
        ['Compara punto por punto: la x cambia de signo y la y se queda.', {}],
        ['Correr dos a la izquierda sirve para el primer punto, pero no para (4, 1).', { luz: [0], nota: { 0: 'un solo punto' } }, '$4 - 2 = 2$'],
        ['La media vuelta también cambiaría el signo de la y.', { luz: [2], nota: { 2: 'cambia y' } }],
        ['El reflejo en el eje x cambiaría la y, no la x.', { luz: [3], nota: { 3: 'cambia y' } }],
        ['Cambia solo el signo de x: es el reflejo en el eje y.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Revisa todos los vértices, no solo uno.'),
      xpHaz('hoja', 'Un cuadrado de lado 2 con un vértice en (1, 1) pasa a tener lado 6 y ese vértice en (3, 3). Subraya el movimiento.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Traslación de 2 a la derecha y 2 arriba.'], ['Homotecia de factor 3 con centro en el origen.'], ['Rotación de 90°.'], ['Homotecia de factor 2 con centro en el origen.']], pista: 'Mira qué pasó con el tamaño, no solo con un vértice.' }, 'El lado pasa de 2 a 6 y $(1, 1) \\to (3, 3)$: factor 3.')],
    cierre: 'Cada movimiento cambia los números de los puntos; hazlos en orden y revisa todos los vértices.',
  });

  xpAmplia('icf-ma-espacio-2', {
    conecta: 'icf-ma-medida-3',
    desde: [
      ['Desde cero: caras, aristas y vértices',
        xpMira('dibujo', 'Un cuerpo sólido tiene **caras** (las partes planas), **aristas** (los bordes) y **vértices** (las esquinas).', { dib: cubo, v: { c: 0, a: 0, p: 0, t: '' }, alto: 204 }, [
          ['En «Volumen y capacidad» contaste cubitos para medir lo que cabe en una caja.', {}],
          ['Las caras son los cuadrados planos: un cubo tiene seis.', { c: 1, t: '6 caras' }],
          ['Donde se juntan dos caras hay una arista: tiene doce.', { a: 1, t: '12 aristas' }],
          ['Donde se juntan tres aristas hay un vértice: tiene ocho.', { p: 1, t: '8 vértices' }],
          ['Desde un solo lado se ven, como máximo, tres caras.', { t: 'se ven 3 de 6' }],
        ], 'Caras planas, aristas en los bordes y vértices en las esquinas.'),
        xpHaz('fichas', 'Una caja de zapatos es un prisma rectangular. Pon cuántas caras y cuántas aristas tiene.', { slots: fila('caras', 'aristas'), fichas: ['6', '12', '8', '4', '24'], meta: ['6', '12'], alto: 96, pista: 'Tiene la misma forma que un cubo, aunque sus lados sean distintos.' }, 'Como el cubo: 6 caras y 12 aristas.')],
    ],
    despues: [
      ['Más difícil: el molde que no cierra',
        xpMira('dibujo', 'No toda figura de seis cuadrados se dobla en un cubo. Compara una **cruz** con una **fila**.', { dib: moldes, v: { a: 0, b: 0, x: 0, t: '' }, alto: 160 }, [
          ['La cruz sí cierra: cuatro dan la vuelta y dos tapan.', { a: 1 }],
          ['Seis en fila no: al dar la vuelta, la quinta cae sobre la primera.', { b: 1, x: 1 }],
          ['Regla útil: más de cuatro en una fila nunca cierra.', { t: 'más de 4 en fila: no' }],
          ['Y las dos tapas deben quedar a lados distintos de la tira.', { t: 'una tapa arriba, otra abajo' }],
        ], 'Cuatro en fila como máximo y una tapa a cada lado.'),
        xpHaz('hoja', 'Subraya el molde que **sí** se dobla en un cubo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fila de 4, con una tapa arriba y otra abajo del segundo cuadrado.'], ['Fila de 5, con una tapa arriba.'], ['Fila de 4, con dos tapas arriba, una junto a la otra.']], pista: 'Más de cuatro en fila no cierra, y dos tapas del mismo lado chocan.' }, 'Es la cruz: cuatro dan la vuelta y las tapas quedan opuestas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Una fila de 3 cubos tiene 2 cubos más encima del de la izquierda. ¿Qué se ve **de frente**?', { dib: vistas, v: { n: ['', '', '', ''], t: '' }, alto: 196 }, [
        ['De frente se ve, en cada columna, la torre más alta.', { t: 'columnas: 3, 1 y 1' }],
        ['Esta es la vista desde arriba: tres cuadrados en fila.', { n: ['', 'arriba', '', ''] }],
        ['Esta está al revés: así se vería desde atrás.', { n: ['', 'arriba', 'atrás', ''] }],
        ['Esta apila todos los cubos: suma en vez de mirar.', { n: ['', 'arriba', 'atrás', 'suma'] }],
        ['Columna de tres a la izquierda y dos sueltos: sirve.', { n: ['sirve', 'arriba', 'atrás', 'suma'] }],
      ], 'Cada vista muestra la torre más alta de cada columna, desde su lado.'),
      xpHaz('hoja', 'Una fila de 4 cubos tiene 1 cubo más encima del **segundo** desde la izquierda. Subraya las alturas que se ven de frente, de izquierda a derecha.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['1, 2, 1, 1'], ['1, 1, 2, 1'], ['2, 1, 1, 1'], ['5']], pista: 'Cuenta columna por columna, de izquierda a derecha.' }, 'Solo la segunda columna tiene dos cubos.')],
    cierre: 'Caras, aristas y vértices; cada vista muestra la torre más alta, y no todo molde se dobla en cubo.',
  });

  xpAmplia('icf-ma-espacio-3', {
    conecta: 'icf-ma-espacio-1',
    desde: [
      ['Desde cero: medir con restas',
        xpMira('dibujo', 'Para medir entre dos puntos se camina en **escalera** y después se usa **Pitágoras**.', { dib: escalera, v: { h: 0, vv: 0, d: 0 }, alto: 196 }, [
          ['En la lección de movimientos ubicaste puntos con dos números en el plano.', {}],
          ['A la derecha se camina dos: tres menos uno.', { h: 1 }, '$3 - 1 = 2$'],
          ['Hacia arriba se camina cuatro: cinco menos uno.', { vv: 1 }, '$5 - 1 = 4$'],
          ['La línea recta es la hipotenusa de ese triángulo.', { d: 1 }, '$\\sqrt{2^2 + 4^2} = \\sqrt{20}$'],
          ['Mide un poco menos de cinco: la raíz no siempre es exacta.', {}, '$\\sqrt{20} \\approx 4.47$'],
        ], 'Restas para los lados y Pitágoras para la recta.'),
        xpHaz('fichas', 'De (1, 2) a (6, 14). Pon cuánto se camina hacia arriba y la distancia en línea recta.', { slots: fila('arriba', 'distancia'), fichas: ['12', '13', '5', '17', '169'], meta: ['12', '13'], alto: 96, pista: 'Resta las y; después usa Pitágoras con 5 y 12.' }, '$\\sqrt{25 + 144} = \\sqrt{169} = 13$.')],
    ],
    despues: [
      ['Más difícil: de polar a cartesiano',
        xpMira('dibujo', 'La cuerda de una cometa mide **10 m** y forma **30°** con el piso. ¿Qué tan alta está y cuánto se alejó?', { dib: dron, v: { g: 0, x: 0, y: 0 }, alto: 200 }, [
          ['El ángulo se mide desde la derecha, contra el reloj.', { g: 30 }],
          ['Su altura es la distancia por el seno: cinco metros.', { y: 1 }, '$10 \\cdot \\tfrac{1}{2} = 5$'],
          ['Lo que avanza a la derecha es la distancia por el coseno.', { x: 1 }, '$10 \\cdot 0.87 \\approx 8.7$'],
          ['Trampa: un rumbo de brújula se mide desde el norte, no desde la derecha.', {}],
          ['Lee siempre desde dónde y hacia dónde se mide el ángulo.', {}],
        ], 'Altura: distancia por seno. Avance: distancia por coseno.'),
        xpHaz('fichas', 'Un punto está a 6 pasos a 150°. Pon su altura y hacia qué lado queda.', { slots: [{ x: 110, y: 46, w: 84, et: 'altura' }, { x: 230, y: 46, w: 104, et: 'lado' }], fichas: ['3', 'izquierda', 'derecha', '5.2', '6'], meta: ['3', 'izquierda'], alto: 96, pista: 'El seno de 150° es igual al de 30°; pasado 90° se está a la izquierda.' }, '$6 \\cdot 0.5 = 3$, a la izquierda del centro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En una bodega la esquina es (0, 0, 0). Una caja está en (3, 4, 12), en metros. ¿A qué distancia está de la esquina?', { letras: ['A', 'B', 'C', 'D'], paras: [['19 m'], ['5 m'], ['13 m'], ['169 m']] }, [
        ['En el espacio se suman tres cuadrados, uno por cada dirección.', {}, '$9 + 16 + 144 = 169$'],
        ['Esta suma las coordenadas: camina por las aristas, no en línea recta.', { luz: [0], nota: { 0: 'por las aristas' } }],
        ['Esta solo mira el piso: olvida la altura.', { luz: [1], nota: { 1: 'sin altura' } }, '$\\sqrt{9 + 16} = 5$'],
        ['Esta se quedó sin sacar la raíz.', { luz: [3], nota: { 3: 'sin raíz' } }],
        ['La raíz de 169 es trece: sirve.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Tres cuadrados, se suman y se saca la raíz.'),
      xpHaz('hoja', 'Un cable va de la esquina (0, 0, 0) de un cuarto a un gancho en (6, 2, 3), en metros. Subraya el largo del cable tenso.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['11 m'], ['7 m'], ['49 m'], ['√40 m']], pista: 'Eleva al cuadrado las tres coordenadas, suma y saca la raíz.' }, '$\\sqrt{36 + 4 + 9} = \\sqrt{49} = 7$.')],
    cierre: 'Restas para los lados y Pitágoras para la distancia; en polares, desde la derecha; en 3D, tres cuadrados.',
  });
}
