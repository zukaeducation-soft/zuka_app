// Preicfes · Matemáticas, mundo 10 «Funciones que Curvan» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const curva = (K, f, X, Y, a, b, cls = 'la gr') => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Y(f(x))]; }), cls);
  // Parábola y = −(x − 2)(x − 10)/4 con eje e y vértice v; c enciende los ceros.
  const para = (v, K) => { const X = x => 30 + x * 23, Y = y => 140 - y * 26; return K.l(24, 140, 320, 140, 'lm') + curva(K, x => -(x - 2) * (x - 10) / 4, X, Y, 2, 10) + K.f(v.c, K.c(X(2), 140, 5, 'fF') + K.c(X(10), 140, 5, 'fF') + K.t(X(2), 158, 2, 's') + K.t(X(10), 158, 10, 's')) + K.f(v.e, K.l(X(6), 20, X(6), 140, 'lg d') + K.t(X(6), 158, 6, 's')) + K.f(v.v, K.c(X(6), Y(4), 6, 'fg') + K.t(X(6) + 14, Y(4) - 6, '4', 's', 'start')); };
  // Barras que multiplican por k.
  const expo = (v, K) => { let h = K.l(20, 150, 320, 150, 'lm'); for (let i = 0; i <= 5; i++) { const q = v.k > 1 ? 4 * v.k ** i : 128 * v.k ** i; h += K.f(v.n - i + 1, K.r(34 + i * 48, 150 - Math.min(132, q), 34, Math.min(132, q), 'fa', 2) + K.t(51 + i * 48, 166, i, 's tm')); } return h + K.t(170, 16, v.t, 'ta'); };
  // Onda con media m y amplitud a; q enciende el periodo.
  const onda = (v, K) => { const X = x => 24 + x * 24, Y = y => 140 - y * 10; return K.l(24, 140, 320, 140, 'lm') + curva(K, x => 6 + 4 * Math.sin(x * Math.PI / 3), X, Y, 0, 12) + K.f(v.m, K.l(24, Y(6), 320, Y(6), 'lg d') + K.t(330, Y(6) + 4, 6, 's tg')) + K.f(v.a, K.l(X(1.5), Y(6), X(1.5), Y(10), 'lo gr') + K.t(X(1.5) + 8, Y(8) + 4, 4, 's', 'start')) + K.f(v.q, K.l(X(1.5), 24, X(7.5), 24, 'la') + K.t(X(4.5), 18, 'periodo 6', 's ta')) + K.t(170, 162, v.t, 's tm'); };
  // Máquina: entra x, sale y.
  const maq = (v, K) => K.r(120, 40, 100, 60, 'fa', 8) + K.t(170, 76, v.r, 'b') + K.l(40, 70, 112, 70, 'gr') + K.l(228, 70, 300, 70, 'gr') + K.t(70, 60, Math.round(v.x), 'b') + K.f(v.s, K.t(268, 60, Math.round(v.y), 'b')) + K.t(170, 130, v.t, 'ta');

  xpLec('icf-ma-curvas-1', [
    ['Simetría',
      xpMira('dibujo', 'Empecemos por la idea: la parábola es **simétrica** y su vértice está en el medio.', { dib: para, v: { c: 0, e: 0, v: 0 }, alto: 168 }, [
        ['Un chorro sube y baja dibujando esta curva.', {}],
        ['Sale en dos y cae en diez.', { c: 1 }],
        ['El eje está a mitad de camino.', { e: 1 }, '$\\tfrac{2 + 10}{2} = 6$'],
        ['Ahí está el punto más alto.', { v: 1 }],
        ['En el eje está dónde; en la altura, cuánto.', {}],
      ], 'El eje está entre dos puntos de igual altura.'),
      xpHaz('fichas', 'Un salto empieza en 1 m y cae en 7 m. Pon el eje y cuánto hay del eje a la caída.', { slots: fila('eje', 'hasta caer'), fichas: ['4', '3', '8', '6', '7'], meta: ['4', '3'], alto: 96, pista: 'Busca la mitad entre 1 y 7.' }, '$\\tfrac{1 + 7}{2} = 4$ y $7 - 4 = 3$.')],
    ['Los ceros',
      xpMira('hoja', 'Segunda idea: los **ceros** salen de escribirla como **producto**.', { paras: [['y = x² − 7x + 12'], ['= (x − 3)(x − 4)'], ['vale 0 si x = 3'], ['o si x = 4']] }, [
        ['Se busca dónde la altura es cero.', { luz: [0] }],
        ['Multiplicados dan doce; sumados, siete.', { luz: [1] }],
        ['Un producto es cero si un factor es cero.', { luz: [2] }],
        ['Por eso hay dos cortes.', { luz: [2, 3] }],
        ['Cuidado con el signo: x menos tres da tres.', {}],
      ], 'Producto igual a 0: alguno de los dos es 0.'),
      xpHaz('fichas', 'y = (x − 2)(x + 5). Pon los dos ceros, de menor a mayor.', { slots: fila('menor', 'mayor'), fichas: ['−5', '2', '−2', '5', '0'], meta: ['−5', '2'], alto: 96, pista: 'Mira qué x hace 0 cada paréntesis.' }, '$x + 5 = 0$ da $-5$; $x - 2 = 0$ da 2.')],
    ['Máximo o mínimo',
      xpMira('hoja', 'Tercera idea: el **signo** de x² dice hacia dónde **abre**.', { paras: [['y = 2x² …'], ['y = −2x² …'], ['ingreso = p(40 − p)'], ['máximo en p = 20']] }, [
        ['Positivo: abre hacia arriba, hay mínimo.', { luz: [0], nota: { 0: 'mínimo' } }],
        ['Negativo: abre hacia abajo, hay máximo.', { luz: [1], nota: { 1: 'máximo' } }],
        ['Aquí, al multiplicar, queda menos p al cuadrado.', { luz: [2] }],
        ['Sus ceros son cero y cuarenta.', { luz: [2, 3] }, '$\\tfrac{0 + 40}{2} = 20$'],
        ['El máximo se halla reemplazando.', { luz: [3] }, '$20 \\cdot 20 = 400$'],
      ], 'Ceros, mitad y reemplazo.'),
      xpHaz('hoja', 'Subraya la que tiene **máximo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['y = x² − 9'], ['y = 9 − x²'], ['y = (x + 9)²']], pista: 'Busca el x² negativo.' }, 'Con $-x^2$ abre hacia abajo.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Altura: h = −5t² + 30t. Pon el instante más alto y el instante en que cae.', { slots: fila('más alto (s)', 'cae (s)'), fichas: ['3', '6', '30', '5', '45'], meta: ['3', '6'], alto: 96, pista: 'Vale 0 al salir y al caer.' }, '$-5t(t - 6) = 0$: cae en 6 y el eje es 3.')],
  ], 'Simetría, ceros y signo.');

  xpLec('icf-ma-curvas-2', [
    ['Por lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: en una exponencial cada paso **multiplica** por lo mismo.', { dib: expo, v: { n: 0, k: 2, t: 'por 2' }, alto: 176 }, [
        ['Se empieza con cuatro.', {}],
        ['Cada paso duplica lo que hay.', { n: 2 }],
        ['Al principio parece poco.', { n: 3 }],
        ['Después se dispara hacia arriba.', { n: 5 }, '$4 \\cdot 2^5 = 128$'],
        ['Eso no lo hace una recta.', {}],
      ], 'Inicio por base a la x.'),
      xpHaz('fichas', 'y = 5 · 3ˣ. Pon el valor en x = 0 y en x = 2.', { slots: fila('x = 0', 'x = 2'), fichas: ['5', '45', '0', '30', '15'], meta: ['5', '45'], alto: 96, pista: 'Todo número no cero a la cero es 1.' }, '$5 \\cdot 1 = 5$ y $5 \\cdot 9 = 45$.')],
    ['También baja',
      xpMira('dibujo', 'Segunda idea: con base entre **0 y 1** baja, sin llegar a **0**.', { dib: expo, v: { n: 0, k: 0.5, t: 'por 0.5' }, alto: 176 }, [
        ['Hay ciento veintiocho gramos.', {}],
        ['Cada hora queda la mitad.', { n: 1 }],
        ['Y la mitad de la mitad.', { n: 2 }, '$128 \\cdot 0.5^2 = 32$'],
        ['Cada vez baja menos.', { n: 4 }],
        ['Se acerca a cero y no llega.', { n: 5 }],
      ], 'Perder 20 % es quedar con 0.8.'),
      xpHaz('fichas', 'Cada año se pierde el 25 %. Pon por cuánto se multiplica y lo que queda de 80 en un año.', { slots: fila('por', 'queda'), fichas: ['0.75', '60', '0.25', '20', '55'], meta: ['0.75', '60'], alto: 96, pista: 'Piensa en la parte que queda.' }, '$80 \\cdot 0.75 = 60$.')],
    ['El logaritmo',
      xpMira('hoja', 'Tercera idea: el **logaritmo** pregunta por el **exponente**.', { paras: [['2³ = 8 → log₂ 8 = 3'], ['10⁴ = 10 000 → log₁₀ 10 000 = 4'], ['log₂ 8 + log₂ 4 = 3 + 2'], ['8 · 4 = 32 = 2⁵']] }, [
        ['A qué exponente se eleva dos para dar ocho.', { luz: [0] }],
        ['En base diez cuenta los ceros.', { luz: [1] }],
        ['Al multiplicar, los exponentes se suman.', { luz: [2] }],
        ['Es la misma cuenta, vista de otro modo.', { luz: [3] }],
        ['Por eso sirve para números enormes.', {}],
      ], 'El logaritmo es el exponente que falta.'),
      xpHaz('fichas', 'Pon log₂ 64 y log₁₀ 100.', { slots: fila('log₂ 64', 'log₁₀ 100'), fichas: ['6', '2', '32', '10', '8'], meta: ['6', '2'], alto: 96, pista: 'Pregunta por el exponente.' }, '$2^6 = 64$ y $10^2 = 100$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un video tiene 100 vistas y se triplica cada día. Subraya el día en que pasa de 2 500.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Día 2'], ['Día 3'], ['Día 8']], pista: 'Multiplica por 3 día tras día.' }, '300, 900, 2 700.')],
  ], 'Multiplicar, bajar sin llegar y buscar el exponente.');

  xpLec('icf-ma-curvas-3', [
    ['Se repite',
      xpMira('dibujo', 'Empecemos por la idea: el **periodo** es lo que tarda en **repetirse**.', { dib: onda, v: { m: 0, a: 0, q: 0, t: '' }, alto: 170 }, [
        ['Este nivel sube y baja.', {}],
        ['De una cresta a la siguiente hay un periodo.', { q: 1 }],
        ['Pasado ese tiempo hace lo mismo.', { t: 'se repite cada 6' }],
        ['De cresta a valle hay medio periodo.', {}],
        ['Con el periodo se sabe lo que pasará.', {}],
      ], 'De cresta a cresta: un periodo.'),
      xpHaz('fichas', 'Un péndulo hace 10 idas y vueltas en 40 s. Pon el periodo y el tiempo de cresta a valle.', { slots: fila('periodo', 'medio'), fichas: ['4', '2', '10', '40', '8'], meta: ['4', '2'], alto: 96, pista: 'Divide el tiempo entre las repeticiones.' }, '$40 \\div 10 = 4$ y la mitad, 2.')],
    ['Centro y amplitud',
      xpMira('dibujo', 'Segunda idea: la **amplitud** se mide desde la **línea media**.', { dib: onda, v: { m: 0, a: 0, q: 0, t: 'de 2 a 10' }, alto: 170 }, [
        ['Va de dos a diez.', {}],
        ['La línea media está en seis.', { m: 1 }, '$\\tfrac{2 + 10}{2} = 6$'],
        ['De ahí al máximo hay cuatro.', { a: 1 }, '$10 - 6 = 4$'],
        ['De mínimo a máximo hay dos amplitudes.', {}],
        ['Se escribe seis más cuatro por el seno.', { t: 'y = 6 + 4 sen(…)' }],
      ], 'Centro más y menos amplitud.'),
      xpHaz('fichas', 'Una onda va de 5 a 25. Pon la línea media y la amplitud.', { slots: fila('media', 'amplitud'), fichas: ['15', '10', '20', '30', '5'], meta: ['15', '10'], alto: 96, pista: 'Busca el centro primero.' }, '$\\tfrac{5 + 25}{2} = 15$ y $25 - 15 = 10$.')],
    ['El seno',
      xpMira('hoja', 'Tercera idea: el **seno** es la **altura** de un punto que gira: de **−1 a 1**.', { paras: [['0°: altura 0'], ['30°: la mitad, 0.5'], ['90°: lo más alto, 1'], ['270°: lo más bajo, −1']] }, [
        ['Empieza a la derecha, sin altura.', { luz: [0] }],
        ['A los treinta grados sube la mitad.', { luz: [1] }],
        ['En lo más alto vale uno.', { luz: [2] }],
        ['Abajo vale menos uno.', { luz: [3] }],
        ['Nunca pasa de ahí.', {}],
      ], 'El seno va de −1 a 1.'),
      xpHaz('hoja', 'Subraya el valor que el seno **no** puede tener.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['0.3'], ['−1'], ['1.2']], pista: 'Va de −1 a 1.' }, '1.2 se sale.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un resorte: y = 8 + 3 sen(…). Pon el máximo y el mínimo.', { slots: fila('máximo', 'mínimo'), fichas: ['11', '5', '8', '3', '24'], meta: ['11', '5'], alto: 96, pista: 'El seno llega a 1 y a −1.' }, '$8 + 3$ y $8 - 3$.')],
  ], 'Periodo, centro con amplitud y seno.');

  xpLec('icf-ma-curvas-4', [
    ['Una sola salida',
      xpMira('dibujo', 'Empecemos por la idea: en una **función** cada entrada tiene **una sola** salida.', { dib: maq, v: { r: '2x + 1', x: 3, y: 7, s: 0, t: '' }, alto: 146 }, [
        ['A la máquina entra un tres.', {}],
        ['Sale un siete, siempre.', { s: 1 }, '$2 \\cdot 3 + 1 = 7$'],
        ['Dos entradas pueden dar la misma salida.', { r: 'x²', x: -3, y: 9, t: '3 y −3 dan 9' }],
        ['Pero una entrada no puede dar dos.', { t: 'una entrada, una salida' }],
        ['Si da dos, no es función.', {}],
      ], 'Una entrada, una salida.'),
      xpHaz('hoja', 'Subraya la que **no** es función.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['(1, 5), (2, 5)'], ['(3, 1), (3, 2)'], ['(0, 0), (4, 8)']], pista: 'Busca una entrada repetida.' }, 'El 3 tiene dos salidas.')],
    ['Dominio y rango',
      xpMira('hoja', 'Segunda idea: **dominio**, lo que puede entrar; **rango**, lo que puede salir.', { paras: [['1 ÷ (x − 7): no entra 7'], ['√(x − 1): entra desde 1'], ['x²: sale desde 0'], ['boletas: 0, 1, 2…']] }, [
        ['No se puede dividir entre cero.', { luz: [0], nota: { 0: 'dominio' } }],
        ['Ni sacar raíz cuadrada de un negativo.', { luz: [1], nota: { 1: 'dominio' } }],
        ['Un cuadrado nunca es negativo.', { luz: [2], nota: { 2: 'rango' } }],
        ['El contexto también pone límites.', { luz: [3] }],
        ['No hay media boleta ni menos dos.', {}],
      ], 'Entra: dominio. Sale: rango.'),
      xpHaz('hoja', 'Subraya el valor que **no** puede entrar en 8 ÷ (x + 2).', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['−2'], ['0'], ['2']], pista: 'Busca cuál hace 0 el denominador.' }, '$-2 + 2 = 0$.')],
    ['Cortes',
      xpMira('fichas', 'Tercera idea: sobre un eje, la **otra** coordenada es **0**.', { slots: fila('eje y', 'eje x'), fichas: ['−10', '5'], alto: 96 }, [
        ['Tomemos y igual a dos x menos diez.', {}],
        ['En el eje y, la x es cero.', { pon: { 0: '−10' } }, '$2 \\cdot 0 - 10 = -10$'],
        ['En el eje x, la y es cero.', {}, '$0 = 2x - 10$'],
        ['Se despeja: x es cinco.', { pon: { 1: '5' } }],
        ['Son dos cuentas distintas, una por eje.', {}],
      ], 'Eje y: x = 0. Eje x: y = 0.'),
      xpHaz('fichas', 'y = 3x + 12. Pon el corte con el eje y y con el eje x.', { slots: fila('eje y', 'eje x'), fichas: ['12', '−4', '4', '3', '−12'], meta: ['12', '−4'], alto: 96, pista: 'Cambia por 0 la x y después la y.' }, 'Con $x = 0$, 12; con $y = 0$, $-4$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un taxi cobra 5 + 2k (miles) por k kilómetros, hasta 30 km. Subraya el **rango**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['De 0 a 30'], ['De 0 a 65'], ['De 5 a 65']], pista: 'Halla el menor y el mayor cobro.' }, 'Con 0 km, 5; con 30, 65.')],
  ], 'Una salida, lo que entra y sale, y los cortes.');
}
