// Preicfes · Matemáticas, mundo 11 «Movimientos y Vistas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const U = 20, X = x => 170 + x * U, Y = y => 100 - y * U, red = K => { let h = ''; for (let i = -4; i <= 4; i++) h += K.l(X(i), Y(-4), X(i), Y(4), i ? 'lr' : 'lm') + K.l(X(-4), Y(i), X(4), Y(i), i ? 'lr' : 'lm'); return h; };
  const L = [[1, 1], [3, 1], [1, 3]], poli = (K, ps, c) => K.p(ps.map(([a, b]) => [X(a), Y(b)]), c);
  // Triángulo y su imagen: t traslada, e refleja en y, g gira, k amplía.
  const mov = (v, K) => { const q = v.g * Math.PI / 180, f = ([a, b]) => { let m = a * v.k + v.dx, n = b * v.k + v.dy; m *= v.e; return [m * Math.cos(q) - n * Math.sin(q), m * Math.sin(q) + n * Math.cos(q)]; }; return red(K) + poli(K, L, 'fa') + poli(K, L.map(f), 'fg') + K.t(170, 204, v.t, 'ta'); };
  // Torres vistas.
  const H = [[1, 2], [3, 1]];
  const torres = (v, K) => { let s = ''; for (let r = 1; r >= 0; r--) for (let c = 1; c >= 0; c--) for (let z = 0; z < H[r][c]; z++) s += K.caja(K.iso([96, 150], 26, c, r, z), 26, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); return s + K.f(v.f, [3, 2].map((n, c) => Array.from({ length: n }, (_, z) => K.r(232 + c * 32, 130 - z * 32, 30, 30, 'fa', 2)).join('')).join('') + K.t(263, 182, 'de frente', 's ta')) + K.t(170, 202, v.t, 'ta'); };
  // Tira de cuatro y dos tapas; d enciende las opuestas.
  const CE = [['1', 1, 1], ['2', 2, 1], ['3', 3, 1], ['4', 4, 1], ['5', 2, 0], ['6', 2, 2]], molde = (v, K) => CE.map(([t, c, f], i) => { const par = [0, 2].includes(i) ? v.a : [1, 3].includes(i) ? v.b : v.c; return K.r(40 + c * 46, 14 + f * 46, 44, 44, par > 0.5 ? (i < 2 || i === 4 || i > 0 ? ['fa', 'fg', 'fa', 'fg', 'ff', 'ff'][i] : 'fc') : 'fc', 3) + K.t(62 + c * 46, 42 + f * 46, t, 'b'); }).join('') + K.t(170, 176, v.t, 'ta');
  // Plano polar: giro g y pasos r.
  const polar = (v, K) => { const q = K.at(150, 100, v.r * 24, v.g); return [1, 2, 3].map(i => K.arc(150, 100, i * 24, 0, 360, 'lr')).join('') + K.l(70, 100, 260, 100, 'lm') + K.l(150, 20, 150, 180, 'lm') + K.arc(150, 100, 18, 0, Math.max(0.3, v.g), 'lo gr') + K.l(150, 100, ...q, 'la gr') + K.c(...q, 6, 'fF') + K.t(170, 202, v.t, 'ta'); };

  xpLec('icf-ma-espacio-1', [
    ['Trasladar y reflejar',
      xpMira('dibujo', 'Empecemos por la idea: **trasladar** mueve todo igual; **reflejar** pasa al otro lado.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['Este triángulo está arriba a la derecha.', {}],
        ['Se traslada: cada punto se mueve lo mismo.', { dx: -4, dy: -3, t: '4 a la izquierda, 3 abajo' }],
        ['A cada coordenada se le suma lo suyo.', {}, '$(1, 1) \\to (-3, -2)$'],
        ['Ahora se refleja en el eje vertical.', { dx: 0, dy: 0, e: -1, t: 'reflejo en el eje y' }],
        ['Queda igual de lejos: la x cambia de signo.', {}, '$(3, 1) \\to (-3, 1)$'],
      ], 'Trasladar suma; reflejar cambia un signo.'),
      xpHaz('fichas', 'Pon la imagen de (2, −1) al trasladarlo 3 arriba, y al reflejarlo en el eje x.', { slots: fila('trasladado', 'reflejado'), fichas: ['(2, 2)', '(2, 1)', '(5, −1)', '(−2, −1)'], meta: ['(2, 2)', '(2, 1)'], alto: 96, pista: 'Arriba cambia la y; el eje x cambia su signo.' }, '$-1 + 3 = 2$ y $-1$ pasa a 1.')],
    ['Rotar',
      xpMira('dibujo', 'Segunda idea: al **rotar**, cada punto gira sin cambiar su **distancia** al centro.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['El centro está en el origen.', {}],
        ['Un cuarto de vuelta contra el reloj.', { g: 90, t: '90°' }, '$(3, 1) \\to (-1, 3)$'],
        ['Media vuelta: cambian los dos signos.', { g: 180, t: '180°' }, '$(3, 1) \\to (-3, -1)$'],
        ['Tres cuartos de vuelta.', { g: 270, t: '270°' }],
        ['Los lados y los ángulos no cambiaron.', {}],
      ], 'Gira sin cambiar de tamaño ni de forma.'),
      xpHaz('fichas', 'Pon la imagen de (0, 5) con 90° contra el reloj y con 180°.', { slots: fila('90°', '180°'), fichas: ['(−5, 0)', '(0, −5)', '(5, 0)', '(0, 5)'], meta: ['(−5, 0)', '(0, −5)'], alto: 96, pista: 'Lo de arriba pasa a la izquierda.' }, 'Un cuarto: a la izquierda; media vuelta: abajo.')],
    ['Homotecia',
      xpMira('dibujo', 'Tercera idea: la **homotecia** multiplica las distancias al **centro**.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['Factor uno: queda igual.', { t: 'factor 1' }],
        ['Con la mitad, todo se encoge.', { k: 0.5, t: 'factor 0.5' }, '$(3, 1) \\to (1.5, 0.5)$'],
        ['Con 1.3, se agranda.', { k: 1.3, t: 'factor 1.3' }],
        ['Con factor negativo, pasa al otro lado.', { k: -1, t: 'factor −1' }],
        ['Los lados van por el factor; el área, por su cuadrado.', {}],
      ], 'Lados por k; área por k al cuadrado.'),
      xpHaz('fichas', 'Un cuadrado de lado 3 se amplía con factor 2. Pon el lado y el área nuevos.', { slots: fila('lado', 'área'), fichas: ['6', '36', '18', '9', '5'], meta: ['6', '36'], alto: 96, pista: 'Halla el lado y después el área.' }, '$3 \\cdot 2 = 6$ y $6 \\cdot 6 = 36$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un punto (4, 0) gira 90° contra el reloj y luego se traslada 2 a la derecha. Subraya dónde queda.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['(6, 4)'], ['(2, 4)'], ['(−2, 4)']], pista: 'Haz un movimiento a la vez.' }, '$(4, 0) \\to (0, 4) \\to (2, 4)$.')],
  ], 'Sumar, cambiar signos, girar y multiplicar.');

  xpLec('icf-ma-espacio-2', [
    ['Vistas',
      xpMira('dibujo', 'Empecemos por la idea: de cada lado solo se ve la torre **más alta**.', { dib: torres, v: { f: 0, t: '' }, alto: 210 }, [
        ['Hay cuatro torres: dos adelante y dos atrás.', {}],
        ['Adelante miden uno y dos.', { t: 'adelante: 1 y 2' }],
        ['Atrás miden tres y uno.', { t: 'atrás: 3 y 1' }],
        ['De frente se ven tres y dos.', { f: 1, t: 'la más alta de cada columna' }],
        ['En total hay siete cubos.', {}, '$1 + 2 + 3 + 1 = 7$'],
      ], 'La vista muestra la más alta; el total suma todas.'),
      xpHaz('fichas', 'Una columna tiene torres de 4, 2 y 1. Pon lo que se ve de frente y los cubos que tiene.', { slots: fila('se ve', 'tiene'), fichas: ['4', '7', '2', '1', '8'], meta: ['4', '7'], alto: 96, pista: 'La más alta y la suma.' }, 'Se ve la de 4; hay $4 + 2 + 1 = 7$.')],
    ['Desarrollos',
      xpMira('dibujo', 'Segunda idea: en un molde, **salta una** cara para hallar la **opuesta**.', { dib: molde, v: { a: 0, b: 0, c: 0, t: '' }, alto: 186 }, [
        ['Cuatro caras en fila dan la vuelta.', {}],
        ['La primera y la tercera quedan opuestas.', { a: 1, t: '1 frente a 3' }],
        ['La segunda y la cuarta también.', { b: 1, t: '2 frente a 4' }],
        ['Las tapas, una frente a la otra.', { c: 1, t: '5 frente a 6' }],
        ['Dos caras opuestas nunca se tocan.', {}],
      ], 'En fila, salta una.'),
      xpHaz('hoja', 'En una tira M-N-O-P de un cubo, subraya la opuesta de **N**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['M'], ['O'], ['P']], pista: 'Salta una cara.' }, 'N, se salta O, y sigue P.')],
    ['Otros cuerpos',
      xpMira('hoja', 'Tercera idea: cada cuerpo tiene su **molde**.', { paras: [['Prisma: dos bases y rectángulos'], ['Pirámide: una base y triángulos'], ['Cilindro: dos círculos y un rectángulo'], ['Cono: un círculo y un sector']] }, [
        ['Un rectángulo por cada lado de la base.', { luz: [0] }],
        ['Un triángulo por cada lado de la base.', { luz: [1] }],
        ['El rectángulo da la vuelta al círculo.', { luz: [2] }],
        ['El sector se cierra en punta.', { luz: [3] }],
        ['Al doblarlo no debe sobrar ni faltar cara.', {}],
      ], 'Cuenta bases y caras.'),
      xpHaz('fichas', 'Prisma de base hexagonal. Pon cuántos hexágonos y cuántos rectángulos lleva su molde.', { slots: fila('hexágonos', 'rectángulos'), fichas: ['2', '6', '1', '8', '4'], meta: ['2', '6'], alto: 96, pista: 'Dos bases y una cara por lado.' }, 'Dos bases y seis caras.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'De frente se ve un rectángulo y desde arriba un círculo. Subraya el cuerpo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cilindro'], ['Cono'], ['Esfera']], pista: 'Descarta por la vista de frente.' }, 'El cono se vería como triángulo y la esfera, como círculo.')],
  ], 'La más alta, salta una y cada cuerpo con su molde.');

  xpLec('icf-ma-espacio-3', [
    ['Cartesianas',
      xpMira('hoja', 'Empecemos por la idea: con **restas** se hallan lados y con **promedios**, el medio.', { paras: [['A (1, 2) y B (7, 10)'], ['lado 6 y alto 8'], ['distancia 10'], ['medio (4, 6)']] }, [
        ['Dos puntos en el plano.', { luz: [0] }],
        ['Se restan las x y se restan las y.', { luz: [1] }, '$7 - 1 = 6, \\; 10 - 2 = 8$'],
        ['Con Pitágoras sale la distancia.', { luz: [2] }, '$\\sqrt{36 + 64} = 10$'],
        ['Con promedios, el punto medio.', { luz: [3] }, '$\\tfrac{1 + 7}{2} = 4$'],
        ['Restar para medir, promediar para el medio.', {}],
      ], 'Restar para medir; promediar para el medio.'),
      xpHaz('fichas', 'De (2, 1) a (5, 5). Pon la distancia y la x del punto medio.', { slots: fila('distancia', 'x del medio'), fichas: ['5', '3.5', '7', '3', '4'], meta: ['5', '3.5'], alto: 96, pista: 'Los lados miden 3 y 4.' }, '$\\sqrt{9 + 16} = 5$ y $\\tfrac{2 + 5}{2} = 3.5$.')],
    ['Polares',
      xpMira('dibujo', 'Segunda idea: en **polares** se **gira** y se **camina**.', { dib: polar, v: { g: 0, r: 2, t: '' }, alto: 210 }, [
        ['Se empieza mirando a la derecha.', { t: '2 pasos a 0°' }],
        ['Un cuarto de vuelta: arriba.', { g: 90, t: '2 pasos a 90°' }],
        ['Media vuelta: a la izquierda.', { g: 180, r: 3, t: '3 pasos a 180°' }],
        ['Se gira contra el reloj.', { g: 225, t: '3 pasos a 225°' }],
        ['Una vuelta más no cambia nada.', {}, '$225 + 360 = 585$'],
      ], 'Giro desde la derecha y pasos.'),
      xpHaz('hoja', 'Subraya el punto polar de (0, 7).', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['7 pasos a 0°'], ['7 pasos a 90°'], ['90 pasos a 7°']], pista: '¿Hacia dónde está?' }, 'Está arriba: un cuarto de vuelta.')],
    ['En el espacio',
      xpMira('fichas', 'Tercera idea: en **3D** se agrega la **altura**, z.', { slots: fila('x', 'y', 'z'), fichas: ['4', '2', '5'], alto: 96 }, [
        ['Un bombillo está en una sala.', {}],
        ['Cuatro metros hacia la derecha.', { pon: { 0: '4' } }],
        ['Dos metros hacia el fondo.', { pon: { 1: '2' } }],
        ['Y cinco de altura.', { pon: { 2: '5' } }, '$(4, 2, 5)$'],
        ['La distancia suma tres cuadrados.', {}, '$\\sqrt{16 + 4 + 25}$'],
      ], 'Derecha, fondo y altura.'),
      xpHaz('fichas', 'De (0, 0, 0) a (2, 6, 9). Pon la suma de los cuadrados y la distancia.', { slots: fila('suma', 'distancia'), fichas: ['121', '11', '17', '81', '9'], meta: ['121', '11'], alto: 96, pista: 'Suma 4, 36 y 81.' }, '$\\sqrt{121} = 11$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un barco está a 8 pasos, a 270° del faro. Subraya dónde está.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Al norte (arriba)'], ['Al oeste (izquierda)'], ['Al sur (abajo)']], pista: 'Tres cuartos de vuelta desde la derecha.' }, 'Derecha, arriba, izquierda, abajo.')],
  ], 'Restar, girar y agregar la altura.');
}
