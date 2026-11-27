// Gimnasio de Geometría Vectorial y Analítica, mundo 2 «Inversión y Determinante» (spec 2026-11-27-curso-geometria-vectorial): dos
// retos de Fuerza y dos de Élite, con los juegos de escena de js/games/gva-escena-5.js a -8.js y datos nuevos. Va después de gimnasio.js.
{
  // Un paso: [título, entrenador, juego, enunciado, datos, explicación, [ayuda, ayuda], nota].
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-gva-${id}`, after, level,
    title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });

  // ------------------------------------------------------------------------------------------- Fuerza
  reto('inversa-2', ['geo-5'], 2, 'La planta de concentrados', 'Clave válida, inversa comprobada y pedidos',
    'Tres concentrados X, Y y Z aportan proteína, fibra y grasa según una matriz A con una entrada c por fijar. Primero hay que descartar la c que deja A sin inversa; con c = 5 se completa A⁻¹ y se atienden varios pedidos sin volver a resolver nada.', [
      ['La c prohibida', 'Escalona con c como letra: si la última fila de la izquierda puede volverse de ceros, esa c no sirve.', 'gj-fila-de-ceros',
        'La matriz de los concentrados (columnas X, Y, Z) es $A = \\begin{pmatrix} 1 & 1 & 2 \\\\ 2 & 3 & 5 \\\\ 1 & 3 & c \\end{pmatrix}$. Desliza **c** hasta el valor con el que, al reducir $[A \\mid I]$, aparece una **fila de ceros** a la izquierda.',
        { A: [[1, 1, 2], [2, 3, 5], [1, 3, null]], min: -3, max: 9, ini: 0, ok: 'Con c = 4 la fila 3 se vuelve (0, 0, 0): con esa c la planta no podría deshacer la mezcla.' },
        '$R_2 - 2R_1 = (0, 1, 1)$ y $R_3 - R_1 = (0, 2, c - 2)$; luego $R_3 - 2R_2 = (0, 0, c - 4)$. La fila es de ceros justo con $c = 4$; con cualquier otra c, A tiene inversa.',
        ['Haz ceros debajo del primer pivote y luego debajo del segundo, sin darle valor a c.', 'Al final la fila 3 queda $(0, 0, c - 4)$: ¿qué c la anula?'], 'c = 4 deja una fila de ceros'],
      ['La entrada que falta', 'Con la c del enunciado la planta ya tiene llave de vuelta. Para comprobar una inversa basta multiplicar: A·B debe ser I.', 'gj-comprueba-identidad',
        'Con $c = 5$, $A = \\begin{pmatrix} 1 & 1 & 2 \\\\ 2 & 3 & 5 \\\\ 1 & 3 & 5 \\end{pmatrix}$. Su inversa B salió de Gauss-Jordan, pero se borró la entrada **t** (fila 2, columna 1). Ajusta t para que $AB = I$.',
        { A: [[1, 1, 2], [2, 3, 5], [1, 3, 5]], pos: [1, 0], min: -6, max: 6, ok: 'Con t = −5, A·B = I: B = [0 1 −1; −5 3 −1; 3 −2 1] es la inversa.' },
        'La columna 1 de $AB$ es $A(0, t, 3) = (t + 6,\\ 3t + 15,\\ 3t + 15)$ y debe ser $(1, 0, 0)$: $t = -5$. Así $A^{-1} = \\begin{pmatrix} 0 & 1 & -1 \\\\ -5 & 3 & -1 \\\\ 3 & -2 & 1 \\end{pmatrix}$.',
        ['t solo cambia la columna 1 de $AB$: multiplica cada fila de A por esa columna de B.', 'La primera fila da $t + 6$, y en la identidad ahí va un 1.'], 't = −5 completa A⁻¹'],
      ['Tres pedidos, una inversa', 'Cada pedido b se resuelve con x = A⁻¹b: la fila i de la inversa da los bultos del concentrado i.', 'gj-dosifica-mezclas',
        'Con $A^{-1} = \\begin{pmatrix} 0 & 1 & -1 \\\\ -5 & 3 & -1 \\\\ 3 & -2 & 1 \\end{pmatrix}$, atiende cada pedido $\\vec b$ (proteína, fibra, grasa). Puedes fallar **una** vez.',
        { Ainv: [[0, 1, -1], [-5, 3, -1], [3, -2, 1]], et: ['X', 'Y', 'Z'], tiros: [
          { q: 'Pedido $\\vec b = (7, 18, 16)$. ¿Cuántos bultos de **X**?', b: [7, 18, 16], i: 0, r: 2, k: 'x_1 = 18 - 16 = 2', e: { 3: 'Esos son los bultos de Y: usaste la fila 2 de A⁻¹.', 1: 'Esos son los bultos de Z: usaste la fila 3 de A⁻¹.' } },
          { q: 'Pedido $\\vec b = (9, 22, 19)$. ¿Cuántos bultos de **Y**?', b: [9, 22, 19], i: 1, r: 2, k: 'x_2 = -45 + 66 - 19 = 2', e: { 3: 'Esos son los bultos de X: Y sale de la fila 2 de A⁻¹.', 4: 'Revisa los signos de la fila 2: −5·9 + 3·22 − 19.' } },
          { q: 'Pedido $\\vec b = (8, 18, 13)$. ¿Cuántos bultos de **X**?', b: [8, 18, 13], i: 0, r: 5, k: 'x_1 = 18 - 13 = 5', e: { 1: 'Ese número es el de Y o el de Z: X es la fila 1 de A⁻¹ por b.', 10: 'La fila 1 es (0, 1, −1): la proteína no cuenta y la grasa se resta.' } }] },
        '$\\vec x = A^{-1}\\vec b$: $(7, 18, 16) \\to (2, 3, 1)$, $(9, 22, 19) \\to (3, 2, 2)$ y $(8, 18, 13) \\to (5, 1, 1)$. Comprobación del primero: $2 + 3 + 2 = 7$, $4 + 9 + 5 = 18$, $2 + 9 + 5 = 16$.',
        ['La fila i de $A^{-1}$ por $\\vec b$, pareja por pareja, da los bultos del concentrado i.', 'X usa la fila (0, 1, −1), Y la fila (−5, 3, −1) y Z la fila (3, −2, 1).'], 'una inversa sirve para todos los pedidos'],
    ], 'Se prohíbe c = 4; con c = 5, A⁻¹ = [0 1 −1; −5 3 −1; 3 −2 1], y los pedidos piden 2 de X, 2 de Y y 5 de X.', 'Una fila de ceros dice que no hay inversa; si la hay, se calcula una vez y resuelve cualquier pedido.');

  reto('area-2', ['geo-6'], 2, 'El terreno en el plano', 'Área por coordenadas y factor |det|',
    'Un terreno tiene esquinas A = (0, 0), B = (4, 0), C = (4, 3) y una cuarta D por ubicar, y debe medir 9 unidades². Luego un programa de planos lo transforma con varias matrices: hay que diseñar una que lo agrande 3 veces y lo voltee, y predecir el área de cada imagen.', [
      ['La esquina que falta', 'Con A en el origen, el área es la mitad de la suma de los determinantes de esquinas vecinas.', 'lote-por-coordenadas',
        'Esquinas $A = (0, 0)$, $B = (4, 0)$, $C = (4, 3)$ y D (recorridas contra las agujas). Arrastra D para que el terreno mida **9**, con área $\\tfrac{1}{2}\\sum \\det(P_i, P_{i+1})$.',
        { P: [[0, 0], [4, 0], [4, 3]], meta: 9, ini: [1, 5], ok: 'D = (2, 3): ½(0 + 12 + 6 + 0) = 9.' },
        'Con $D = (x, y)$: $\\tfrac{1}{2}[0 + \\det(B, C) + \\det(C, D) + 0] = \\tfrac{1}{2}(12 + 4y - 3x)$. Vale 9 si $4y - 3x = 6$: con $D = (2, 3)$ queda un trapecio de bases 4 y 2 y altura 3.',
        ['$\\det(B, C) = 4 \\cdot 3 - 0 \\cdot 4 = 12$; falta $\\det(C, D) = 4y - 3x$.', 'La suma tiene que dar el doble del área: 18.'], 'D = (2, 3)'],
      ['La matriz que voltea', 'Las columnas de T son u y w; det T = u₁w₂ − u₂w₁ mide cuánto crece el área y su signo dice si voltea.', 'area-signo-columnas',
        'El programa usa $T = [\\vec u\\ \\vec w]$ con $\\vec u = (3, 1)$. Para que el terreno de 9 u² pase a **27** u² y quede **volteado**, se necesita $\\det T = -3$. Arrastra la punta de $\\vec w$.',
        { u: [3, 1], meta: -3, ini: [1, 2], ok: '3w₂ − w₁ = −3: el área se triplica y el giro de u a w va al revés.' },
        'Se pide $3w_2 - w_1 = -3$; sirven $\\vec w = (3, 0)$, $(0, -1)$ o $(-3, -2)$, entre otros. El área de la imagen es $|-3| \\cdot 9 = 27$ y el signo menos dice que la figura sale volteada.',
        ['Triplicar el área pide que $|\\det T|$ sea el factor de área; voltear pide el signo menos.', 'w tiene que quedar girando a la derecha de u, con $3w_2 - w_1 = -3$.'], 'det T = −3'],
      ['Predecir cada imagen', 'Toda área se multiplica por |det T|: el signo solo dice si voltea.', 'sello-escala-area',
        'El terreno de 9 u² pasa por tres matrices distintas. Fija el área de cada imagen y suelta. Puedes fallar **una** vez.',
        { tiros: [
          { q: 'Con $T = \\begin{pmatrix} 3 & 1 \\\\ 1 & 1 \\end{pmatrix}$, ¿cuánto mide la imagen?', M: [[3, 1], [1, 1]], fig: [[0, 0], [4, 0], [4, 3], [2, 3]], area: 9, r: 18,
            k: '|\\det T| \\cdot 9 = |3 - 1| \\cdot 9 = 18', e: { 2: 'Ese es det T: falta multiplicarlo por el área del terreno, 9.', 9: 'Ese es el área del terreno: la imagen la multiplica por |det T|.', 36: 'Sumaste: det T es ad − bc = 3 − 1.' } },
          { q: 'Con $T = \\begin{pmatrix} 3 & -3 \\\\ 1 & -2 \\end{pmatrix}$, que lo voltea, ¿cuánto mide la imagen?', M: [[3, -3], [1, -2]], fig: [[0, 0], [4, 0], [4, 3], [2, 3]], area: 9, r: 27,
            k: '|\\det T| \\cdot 9 = |-6 + 3| \\cdot 9 = 27', e: { 3: 'Ese es |det T|: falta multiplicarlo por 9.', 0: 'Voltear no borra el área: se usa el valor absoluto del determinante.' } },
          { q: 'Con $T = 2I = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$, ¿cuánto mide la imagen?', M: [[2, 0], [0, 2]], fig: [[0, 0], [4, 0], [4, 3], [2, 3]], area: 9, r: 36,
            k: '|\\det(2I)| \\cdot 9 = 4 \\cdot 9 = 36', e: { 18: '2I estira por 2 el ancho y también el alto: el área se multiplica por 2 · 2 = 4.', 4: 'Ese es det(2I): falta multiplicarlo por 9.' } }] },
        'Imagen $= |\\det T| \\cdot 9$: $2 \\cdot 9 = 18$, $|-3| \\cdot 9 = 27$ y $\\det(2I) = 4$, así que $4 \\cdot 9 = 36$.',
        ['Calcula $ad - bc$ de cada T, quítale el signo y multiplícalo por 9.', 'Con $2I$ se duplican las dos direcciones: el área no se duplica, se cuadruplica.'], '18, 27 y 36 u²'],
    ], 'D = (2, 3); una w con 3w₂ − w₁ = −3; las imágenes miden 18, 27 y 36 u².', 'El área de un polígono sale de determinantes, y toda transformación la multiplica por |det T|.');

  // -------------------------------------------------------------------------------------------- Élite
  reto('det-2', ['geo-6', 'geo-7'], 3, 'La cadena de operaciones', 'Triangula, sigue el factor y multiplica',
    'Una matriz A de 3 × 3 se lleva a triangular para hallar det A. Después, con tres operaciones de fila, se arma B; se escala a kB y, por último, cuadrados de área 1 pasan por A, B y una máquina desconocida. ¿Cuánto valen det A, det B, el k pedido y los determinantes de los productos?', [
      ['det A por la triangular', 'Cada operación deja su factor; al final det U es det A multiplicado por esos factores.', 'diagonal-y-factor',
        'Para hallar $\\det A$ con $A = \\begin{pmatrix} 0 & 1 & 2 \\\\ 1 & 2 & 1 \\\\ 2 & 4 & -1 \\end{pmatrix}$ se lleva A a la triangular U. Pon el factor de cada operación, el producto de la diagonal de U y $\\det A$.',
        { A: [[0, 1, 2], [1, 2, 1], [2, 4, -1]], ops: ['R₁ ↔ R₂', 'R₃ − 2R₁'], M: [[1, 2, 1], [0, 1, 2], [2, 4, -1]], U: [[1, 2, 1], [0, 1, 2], [0, 0, -3]],
          metas: ['−1', '1', '−3', '3'], extra: ['−2', '0', '9'],
          mira: ['Intercambiar R₁ y R₂ multiplica el determinante por −1.', 'Restarle a R₃ dos veces R₁ no cambia el determinante: factor 1.', 'La diagonal de U es 1, 1 y −3: se multiplican.', 'det U = −3 y el factor fue −1: det A = −3 ÷ (−1).'],
          trampas: { '1:−2': 'El −2 multiplica a R₁ antes de sumarla; la fila 3 no se multiplicó. Esa operación no cambia el determinante.', '1:0': 'Sumar un múltiplo deja el determinante igual: el factor es 1.', '3:−3': 'Ese es det U. El intercambio cambió el signo: hay que deshacerlo.' },
          ok: 'det U = 1 · 1 · (−3) = −3 = (−1) · det A, así que det A = 3.' },
        'Factores $-1$ (intercambio) y $1$ ($R_3 - 2R_1$). La diagonal de U da $1 \\cdot 1 \\cdot (-3) = -3$ y $\\det U = (-1)\\det A$, así que $\\det A = 3$.',
        ['Anota el factor de cada flecha: un intercambio vale −1 y sumar un múltiplo de otra fila vale 1.', 'Al final divide det U entre el producto de los factores.'], 'det A = 3'],
      ['De A a B', 'Ahora sin matriz a la vista: solo el factor de cada operación.', 'rastro-determinante',
        'Con $\\det A = 3$, B sale de A con tres operaciones de fila, una tras otra. Pon al lado de cada una el determinante que queda.',
        { d0: 3, ops: ['R₁ ↔ R₃', 'R₂ → −2R₂', 'R₃ → R₃ + 5R₁'], metas: ['−3', '6', '6'], extra: ['3', '−6', '30'],
          mira: ['Intercambiar dos filas cambia el signo: 3 pasa a −3.', 'Multiplicar una fila por −2 multiplica el determinante por −2, con su signo.', 'Sumar a una fila un múltiplo de otra no cambia el determinante.'],
          trampas: { '0:3': 'Intercambiar dos filas sí cambia algo: el signo.', '1:−6': 'El factor es −2, no 2: (−2)(−3) = 6.', '2:30': 'Sumar 5 veces otra fila no multiplica por 5: esa operación no cambia el determinante.' },
          ok: 'Factores −1, −2 y 1: det B = (−1)(−2)(1) · 3 = 6.' },
        'Intercambio $\\times(-1)$: $3 \\to -3$; $R_2 \\to -2R_2$ $\\times(-2)$: $-3 \\to 6$; $R_3 + 5R_1$ $\\times 1$: queda $6$. Así $\\det B = 6$.',
        ['Intercambiar cambia el signo, multiplicar una fila por k multiplica por k y sumar un múltiplo de otra fila no cambia nada.', 'Con k negativo el signo también entra: −3 por −2.'], 'det B = 6'],
      ['El escalado', 'kB multiplica las tres filas por k: el determinante gana k tres veces.', 'escala-todo-volumen',
        'B es de 3 × 3 y $\\det B = 6$. Desliza **k** hasta que $\\det(kB) = -48$.',
        { d0: 6, meta: -48, min: -4, max: 5, nom: 'B', ok: 'Con k = −2: (−2)³ · 6 = −48. El volumen se multiplicó por 8 y la orientación se volteó.' },
        '$\\det(kB) = k^3 \\det B = 6k^3 = -48$ da $k^3 = -8$ y $k = -2$. Con $k = -8$ se habría multiplicado una sola fila.',
        ['kB no multiplica una sola fila por k: multiplica las tres.', 'Busca un k con $k^3 = -8$: el signo de $k^3$ es el de k.'], 'k = −2'],
      ['Máquinas en serie', 'El determinante de un producto es el producto de los determinantes, en el orden que sea.', 'maquinas-en-serie',
        'Un cuadrado de área 1 pasa por máquinas con $\\det A = 3$ y $\\det B = 6$. Cada una multiplica su área con signo por su determinante. Fija el valor que falta y suelta. Puedes fallar **una** vez.',
        { tiros: [
          { q: 'Primero A y luego B. ¿Cuánto vale $\\det(BA)$?', pide: 'det(BA)', maq: [['A', 3], ['B', 6]], fin: null, r: 18, k: '\\det(BA) = \\det B \\cdot \\det A = 6 \\cdot 3 = 18', e: { 9: 'Sumaste: los determinantes se multiplican.', 2: 'Dividiste: cada máquina multiplica el área.' } },
          { q: 'Primero B, luego una máquina X y luego A; el cuadrado llega con $-36$. ¿Cuánto vale $\\det X$?', pide: 'det X', maq: [['B', 6], ['X', null], ['A', 3]], fin: -36, r: -2, k: '\\det X = \\dfrac{-36}{6 \\cdot 3} = -2', e: { 2: 'Con 2 el cuadrado llega en 36, sin voltear: X tiene que voltearlo.', '-27': 'Restaste: los determinantes se multiplican, así que aquí se divide.' } },
          { q: 'A pasa dos veces seguidas. ¿Cuánto vale $\\det(A^2)$?', pide: 'det(A²)', maq: [['A', 3], ['A', 3]], fin: null, r: 9, k: '\\det(A^2) = 3 \\cdot 3 = 9', e: { 6: 'Sumaste: la segunda pasada vuelve a multiplicar por 3.', 3: 'A pasa dos veces: su determinante cuenta dos veces.' } }] },
        '$\\det(BA) = 6 \\cdot 3 = 18$; $6 \\cdot \\det X \\cdot 3 = -36$ da $\\det X = -2$; y $\\det(A^2) = 3^2 = 9$.',
        ['Cada máquina multiplica el área con signo por su determinante.', 'Si falta una máquina, divide la llegada entre el producto de las otras.'], '18, −2 y 9'],
    ], 'det A = 3, det B = 6, k = −2, det(BA) = 18, det X = −2 y det(A²) = 9.', 'Cada operación de fila deja un factor; kA gana kⁿ; y el determinante de un producto es el producto.');

  reto('cramer-2', ['geo-8'], 3, 'La fundición', 'Determinante distinto de cero, luego Cramer',
    'Una fundición funde barras de las aleaciones P y Q para cumplir pedidos de cobre y zinc; la barra Q lleva k kg de cobre. Hay que hallar la k con la que el pedido no tiene solución única, resolver pedidos con otras k y, al añadir una tercera aleación R, ver cuándo sirve y cuántas barras de cada una se funden.', [
      ['La k que falla', 'Sin solución única pasa justo cuando det A = 0: las dos rectas quedan paralelas o son la misma.', 'rectas-paralelas-k',
        'Con x barras de P e y de Q: cobre $3x + ky = 18$ y zinc $x + 2y = 8$. Desliza **k** hasta el valor con el que el pedido **no** tiene solución única.',
        { A0: [[3, 0], [1, 2]], Ak: [[0, 1], [0, 0]], b: [18, 8], min: -2, max: 9, ini: 2, ok: 'Con k = 6 las rectas quedan paralelas: ningún número de barras cumple los dos pedidos a la vez.' },
        '$\\det A = 3 \\cdot 2 - k \\cdot 1 = 6 - k$, que se anula con $k = 6$. Entonces $3x + 6y = 18$ es $x + 2y = 6$, que choca con $x + 2y = 8$: rectas paralelas, sin solución.',
        ['Escribe $\\det A$ en términos de k e iguálalo a cero.', 'Con ese k, divide la primera ecuación entre 3 y compárala con la segunda.'], 'k = 6: ninguna solución'],
      ['Pedidos con otras k', 'Con det A ≠ 0 hay una sola solución, y Cramer la da: cambia por b la columna de la incógnita.', 'cramer-lanza-incognita',
        'El mismo pedido, cobre 18 y zinc 8, con barras Q de distinta k. Halla con Cramer la incógnita que se pide y lánzala. Puedes fallar **una** vez.',
        { tiros: [
          { q: 'Con $k = 4$: $3x + 4y = 18$, $x + 2y = 8$. ¿Cuántas barras de **Q**?', A: [[3, 4], [1, 2]], b: [18, 8], et: ['barras de P', 'barras de Q'], i: 1, r: 3 },
          { q: 'Con $k = 3$: $3x + 3y = 18$, $x + 2y = 8$. ¿Cuántas barras de **P**?', A: [[3, 3], [1, 2]], b: [18, 8], et: ['barras de P', 'barras de Q'], i: 0, r: 4 },
          { q: 'Con $k = 0$ (Q sin cobre): $3x = 18$, $x + 2y = 8$. ¿Cuántas barras de **P**?', A: [[3, 0], [1, 2]], b: [18, 8], et: ['barras de P', 'barras de Q'], i: 0, r: 6 }] },
        'Con $k = 4$: $\\det A = 2$ e $y = \\tfrac{3 \\cdot 8 - 18 \\cdot 1}{2} = 3$. Con $k = 3$: $\\det A = 3$ y $x = \\tfrac{18 \\cdot 2 - 3 \\cdot 8}{3} = 4$. Con $k = 0$: $\\det A = 6$ y $x = \\tfrac{36}{6} = 6$.',
        ['Primero escribe $\\det A$ en función de $k$; después cambia por (18, 8) la columna de la incógnita y divide.', 'Para y se cambia la segunda columna; para x, la primera.'], '3, 4 y 6 barras'],
      ['La tercera aleación', 'Si la columna de R está en el plano de P y Q, R no aporta nada nuevo: det A = 0.', 'caja-aplastada-k',
        'Con estaño en la cuenta, las barras son columnas (cobre, zinc, estaño): $P = (3, 1, 1)$, $Q = (4, 2, 0)$ y $R = (k, 2, 1)$. Desliza **k** hasta el valor con el que R es una mezcla de P y Q y la caja se aplasta.',
        { c1: [3, 1, 1], c2: [4, 2, 0], c3: ['k', 2, 1], min: 0, max: 8, ini: 2, ok: 'Con k = 5, R = P + ½Q: queda en el plano de P y Q y A no tiene inversa.' },
        '$\\det A = 3(2 - 0) - 4(1 - 2) + k(0 - 2) = 10 - 2k$, que se anula con $k = 5$. Entonces $R = (5, 2, 1) = P + \\tfrac{1}{2}Q$: no sirve como tercera aleación.',
        ['Desarrolla $\\det A$ por la primera fila, con k como letra.', 'Comprueba con el valor hallado que R es P más media Q.'], 'k = 5 aplasta'],
      ['Tres aleaciones, un pedido', 'Con R = (2, 2, 1), det A = 6 ≠ 0: cada incógnita es el det de su matriz entre det A.', 'cramer-tres-incognitas',
        'Con $R = (2, 2, 1)$ se pide 16 kg de cobre, 10 de zinc y 5 de estaño: $A\\vec x = \\vec b$ con columnas P, Q, R. Las matrices P, Q y R de la escena tienen $\\vec b$ en una columna cada una. Fija x, y, z.',
        { A: [[3, 4, 2], [1, 2, 2], [1, 0, 1]], b: [16, 10, 5], orden: [1, 2, 0], et: ['barras de P', 'barras de Q', 'barras de R'], max: 6, ok: '2, 1 y 3 barras: 6 + 4 + 6 = 16, 2 + 2 + 6 = 10 y 2 + 0 + 3 = 5.' },
        '$\\det A = 6$. La matriz con $\\vec b$ en la columna 1 tiene det 12: $x = 2$; en la columna 2, det 6: $y = 1$; en la columna 3, det 18: $z = 3$.',
        ['Cada incógnita usa la matriz con $\\vec b$ en **su** columna: mira cuál está resaltada en P, Q y R.', 'Divide cada determinante entre $\\det A = 6$ y comprueba con el estaño: $x + z = 5$.'], 'x = 2, y = 1, z = 3'],
    ], 'Falla con k = 6; con k = 4, 3 y 0 salen 3, 4 y 6 barras; R sirve si k ≠ 5, y con R = (2, 2, 1) se funden 2, 1 y 3 barras.', 'Solución única si y solo si det A ≠ 0; entonces Cramer la da incógnita por incógnita.');
}
