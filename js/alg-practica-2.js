// Ejercicios de Álgebra, mundos 4 (Exponentes y Radicales), 5 (Sucesiones y Series) y 6 (Álgebra de Polinomios). Ver alg-practica.js.
{
  const { M, F, T, S, V, leccion } = AP;
  // ============================================================================================= 4 · Potencias y raíces
  leccion('alg-21a', 'cohete', [
    M('¿Qué exponente hace que la torre de **4** llegue a **64**?', 'torre', [['e', 0, 4, 'exponente']], { e: 0 }, { e: 3 }, '$4 \\cdot 4 \\cdot 4 = 64$.', 'Multiplica por cuatro una y otra vez.', { b: 4 }),
    F('Pon el resultado de cada potencia.', 'factores', ['5³', '(−6)²', '−6²'], ['125', '36', '−36'], ['15', '−12', '12'], 'El paréntesis mete el signo en la potencia.', 'Escribe los factores uno por uno.', { l: ['5', '5', '5'] }),
    T('¿Cuáles potencias son **negativas**?', [['(−2)⁵', 1], ['(−7)²', 0], ['−3⁴', 1], ['(−1)¹⁰', 0], ['(−4)³', 1], ['5⁻²', 0]], 'Impar con base negativa, o el menos afuera.', 'Cuenta los factores negativos; el exponente negativo no cambia el signo.'),
    F('Pon cada potencia como fracción o entero.', 'texto', ['3⁻²', '8⁰', '(2/5)⁻¹'], ['1/9', '1', '5/2'], ['−9', '0', '2/5'], 'El exponente negativo invierte; el cero da 1.', 'Voltea la base cuando el exponente es negativo.', { cap: 'a⁻ⁿ = 1/aⁿ' }),
    M('Una bacteria se duplica cada hora. Desde **1**, ¿en cuántas horas hay **32**?', 'torre', [['e', 0, 6, 'horas']], { e: 1 }, { e: 5 }, 'Cinco duplicaciones: $2^5 = 32$.', 'Duplica contando las horas.', { b: 2 }),
    S('¿Cuáles igualdades con potencias son ciertas?', [['2⁴ = 4²', 1], ['3² = 2³', 0], ['10⁻³ = 0.001', 1], ['(−6)⁰ = −1', 0], ['1⁵⁰ = 50', 0]], '$2^4 = 16 = 4^2$.', 'Calcula los dos lados de cada una.'),
    V('Lanza el cohete con el **exponente** que falta.', -4, 8, [['$2^{\\square} = 128$', 7, '2^7 = 128'], ['$4^{\\square} = \\tfrac{1}{16}$', -2, '4^{-2} = \\tfrac{1}{16}'], ['$7^{\\square} = 1$', 0, '7^0 = 1']], 'El exponente cuenta factores; si divide, es negativo.', 'Pregunta cuántas veces se multiplica la base.'),
  ]);
  leccion('alg-21b', 'cohete', [
    F('Pon el exponente que queda.', 'factores', ['x⁵ · x²', 'x¹¹ ÷ x⁴', '(x⁵)²'], ['7', '7', '10'], ['25', '15', '3'], 'Juntar suma, quitar resta y repetir multiplica.', 'Escribe los factores y cuéntalos.', { l: ['x', 'x', 'x', 'x', 'x', 'x', 'x'], k: 5 }),
    F('$(3x^2y)^3$: pon el número y los exponentes.', 'factores', ['número', 'x a la', 'y a la'], ['27', '6', '3'], ['9', '5', '1'], 'El 3 entra a cada factor.', 'Repite el paquete tres veces y cuenta.', { l: ['3', 'x²', 'y'] }),
    T('¿Cuáles son iguales a $x^6$?', [['x² · x³', 0], ['(x³)²', 1], ['x⁹ ÷ x³', 1], ['x³ + x³', 0], ['x⁻² · x⁸', 1], ['(x²)⁴', 0]], 'Se comparan los exponentes: suma, producto o resta.', 'Suma al juntar, multiplica al repetir.'),
    F('Escribe cada número en notación científica: pon el exponente del 10.', 'texto', ['48 000', '0.0009', '3.1 millones'], ['4', '−4', '6'], ['5', '−3', '3'], '$4.8 \\cdot 10^4$, $9 \\cdot 10^{-4}$ y $3.1 \\cdot 10^6$.', 'Cuenta los puestos que corre la coma.', { cap: 'a · 10 a la …' }),
    M('Un cubo de arista $2^2$. ¿A qué potencia de 2 equivale su **volumen**?', 'torre', [['e', 0, 7, 'exponente']], { e: 2 }, { e: 6 }, '$(2^2)^3 = 2^6$.', 'La arista se multiplica tres veces.', { b: 2 }),
    S('¿Cuáles leyes están bien aplicadas?', [['(a + b)² = a² + b²', 0], ['(ab)³ = a³b³', 1], ['a² · b² = (ab)⁴', 0], ['a⁵/a⁵ = 1', 1], ['(a/b)² = a²/b²', 1]], 'El exponente entra a productos y cocientes, no a sumas.', 'Prueba con a = 2 y b = 3.'),
    V('Lanza con el exponente que falta.', -6, 12, [['$x^8 \\cdot x^{\\square} = x^3$', -5, '8 - 5 = 3'], ['$(x^{\\square})^4 = x^{12}$', 3, '3 \\cdot 4 = 12'], ['$\\tfrac{x^2}{x^{-5}} = x^{\\square}$', 7, '2 + 5 = 7']], 'Plantea la suma, la resta o el producto de exponentes.', 'Restar un exponente negativo es sumar.'),
  ]);
  leccion('alg-22a', 'cohete', [
    M('Un tablero cuadrado tiene **64** casillas. Mueve el lado.', 'cuadrado', [['s', 1, 10, 'lado']], { s: 1 }, { s: 8 }, '$8 \\cdot 8 = 64$.', 'Busca el número que por sí mismo da 64.'),
    F('Pon el valor de cada raíz.', 'texto', ['√144', '∜16', '³√−64'], ['12', '2', '−4'], ['72', '4', '8'], '$12^2$, $2^4$ y $(-4)^3$.', 'Pregunta qué número elevado al índice da el de adentro.', { cap: '¿qué número elevado?' }),
    F('Pon el resultado de cada exponente fraccionario.', 'texto', ['25^½', '64^⅔', '32^⅖'], ['5', '16', '4'], ['12.5', '8', '64'], 'Abajo va el índice y arriba la potencia.', 'Saca primero la raíz y después eleva.', { cap: 'raíz y luego potencia' }),
    T('¿Cuáles **no existen** en los reales?', [['√−9', 1], ['³√−27', 0], ['√0', 0], ['∜−16', 1], ['−√9', 0]], 'Índice par con número negativo adentro.', 'Mira el índice y el signo de adentro.'),
    S('¿Cuáles igualdades con raíces son ciertas?', [['√(9 · 49) = 3 · 7', 1], ['√(25 + 144) = 5 + 12', 0], ['√(x²) = |x|', 1], ['√(25/4) = 5/2', 1]], 'La raíz se reparte en productos y cocientes, no en sumas.', 'Calcula los dos lados por separado.'),
    M('Un cubo tiene volumen **216**. La escena dibuja una de sus caras: mueve la arista.', 'cuadrado', [['s', 1, 9, 'arista']], { s: 2 }, { s: 6 }, '$6^3 = 216$.', 'Busca el número que tres veces como factor da 216.'),
    V('Lanza con el resultado.', -6, 20, [['$\\sqrt{9 \\cdot 16}$', 12, '3 \\cdot 4 = 12'], ['$\\sqrt{25 - 9}$', 4, '\\sqrt{16} = 4'], ['$\\sqrt[3]{-125}$', -5, '(-5)^3 = -125']], 'Con sumas o restas, primero lo de adentro.', 'Solo los productos se pueden separar.'),
  ]);
  leccion('alg-22b', 'cohete', [
    F('$\\sqrt{75}$ simplificada al máximo: pon lo de afuera y lo de adentro.', 'factores', ['afuera', 'adentro'], ['5', '3'], ['25', '15'], '$\\sqrt{25 \\cdot 3} = 5\\sqrt3$.', 'De cada pareja de factores iguales sale uno.', { l: ['3', '5', '5'] }),
    F('$\\sqrt{45} + \\sqrt{20}$: simplifica cada una y suma.', 'texto', ['√45', '√20', 'suma'], ['3√5', '2√5', '5√5'], ['√65', '9√5', '5√10'], 'Tres y dos de $\\sqrt5$.', 'Busca el cuadrado que divide a cada número.', { cap: 'las mismas por dentro' }),
    T('¿Cuáles ya están **simplificadas**?', [['√15', 1], ['√28', 0], ['2√7', 1], ['√49', 0], ['3√8', 0], ['√30', 1]], 'Sin parejas de factores adentro.', 'Descompón cada una: ¿hay algún factor repetido?'),
    F('Racionaliza $\\tfrac{10}{\\sqrt5}$: pon el denominador que queda al multiplicar y el resultado.', 'texto', ['abajo', 'resultado'], ['5', '2√5'], ['25', '10√5', '√2'], '$\\tfrac{10\\sqrt5}{5} = 2\\sqrt5$.', 'Multiplica arriba y abajo por la misma raíz.', { cap: '10/√5 · √5/√5' }),
    F('Racionaliza $\\tfrac{6}{\\sqrt7 - 1}$: pon el conjugado, el denominador y el resultado.', 'texto', ['conjugado', 'abajo', 'resultado'], ['√7 + 1', '6', '√7 + 1'], ['√7 − 1', '8', '√8'], '$(\\sqrt7)^2 - 1^2 = 6$.', 'El conjugado cambia el signo de en medio.', { cap: 'diferencia de cuadrados' }),
    S('¿Cuáles pasos con radicales son válidos?', [['2√3 + 4√3 = 6√3', 1], ['√2 + √5 = √7', 0], ['√6 · √6 = 6', 1], ['4√3 = √48', 1]], 'Se suman iguales; los productos se juntan.', 'Para meter un número a la raíz, elévalo al cuadrado.'),
    V('Lanza con el número que falta.', 0, 20, [['$\\sqrt{18} = \\square\\sqrt2$', 3, '\\sqrt{9 \\cdot 2} = 3\\sqrt2'], ['$7\\sqrt3 - 2\\sqrt3 = \\square\\sqrt3$', 5, '7 - 2 = 5'], ['$(\\sqrt{10} + 1)(\\sqrt{10} - 1)$', 9, '10 - 1 = 9']], 'Saca parejas, resta iguales y usa el conjugado.', 'Busca el cuadrado escondido en cada raíz.'),
  ]);

  // ============================================================================================= 5 · Sucesiones
  leccion('alg-14', 'puente', [
    M('El primero es **2** y suma siempre lo mismo. Mueve la diferencia para que el **sexto** sea **27**.', 'escalera', [['d', 1, 8, 'diferencia']], { d: 1 }, { d: 5 }, '$2 + 5 \\cdot 5 = 27$.', 'De la primera a la sexta hay cinco saltos.', { a: 2, n: 6, top: 42 }),
    F('En 8, 14, 20, 26… pon la diferencia y el término **15**.', 'escalera', ['diferencia', 'término 15'], ['6', '92'], ['98', '90', '14'], '$8 + 14 \\cdot 6 = 92$.', 'Un salto menos que el puesto.', { a: 8, d: 6, n: 4, ver: [0, 1, 2, 3] }),
    T('¿Cuáles son **aritméticas**?', [['3, 7, 11, 15', 1], ['2, 4, 8, 16', 0], ['9, 5, 1, −3', 1], ['1, 4, 9, 16', 0], ['½, 1, 1½, 2', 1]], 'Entre vecinos se suma siempre lo mismo.', 'Resta cada término del que sigue.'),
    F('El tercero es 10 y el séptimo, 34. Pon los saltos, la diferencia y el primero.', 'recta', ['saltos', 'd', 'primero'], ['4', '6', '−2'], ['24', '7', '2'], '$24 \\div 4 = 6$ y $10 - 12 = -2$.', 'Del tercero al séptimo; luego dos saltos hacia atrás.', { r: [1, 9], paso: 1, pts: [3, 7] }),
    F('¿En qué puesto está el **60** en 4, 11, 18, …? Pon los saltos y el puesto.', 'escalera', ['saltos', 'puesto'], ['8', '9'], ['7', '56', '10'], 'Faltan 56, de a siete.', 'Cuenta los saltos y recuerda el primero.', { a: 4, d: 7, n: 4, ver: [0, 1, 2] }),
    S('Para $a_n = 5n - 2$, ¿cuáles son ciertas?', [['a₁ = 3', 1], ['la diferencia es −2', 0], ['a₁₀ = 48', 1], ['el 20 está en la lista', 0]], 'La diferencia es 5; $5n - 2 = 20$ no da entero.', 'Cambia n por cada puesto.'),
    V('Extiende el puente con la respuesta.', -10, 50, [['$a_1 = 3$, $d = 4$: ¿$a_{10}$?', 39, '3 + 9 \\cdot 4 = 39'], ['20, 17, 14, …: ¿$a_{9}$?', -4, '20 - 8 \\cdot 3 = -4'], ['$a_5 = 22$, $d = 3$: ¿$a_1$?', 10, '22 - 12 = 10']], 'Primero más los saltos.', 'Cuenta saltos, no términos.'),
  ]);
  leccion('alg-14b', 'puente', [
    F('$4 + 9 + 14 + \\cdots + 49$ tiene 10 términos. Pon primero más último y la suma.', 'escalera', ['1.º + último', 'suma'], ['53', '265'], ['530', '45', '490'], '$\\tfrac{10 \\cdot 53}{2} = 265$.', 'Diez columnas de ese alto, y la mitad.', { a: 4, d: 5, n: 6, ver: [0, 1, 2] }),
    F('$12 + 15 + \\cdots + 60$. Pon los saltos, los términos y la suma.', 'texto', ['saltos', 'términos', 'suma'], ['16', '17', '612'], ['15', '576', '48'], '$\\tfrac{17 \\cdot 72}{2} = 612$.', 'De 12 a 60 de a tres; hay un término más que saltos.', { cap: '12, 15, 18, …, 60' }),
    M('Siete términos en progresión aritmética van de **3** a **27**. Mueve la diferencia.', 'escalera', [['d', 1, 8, 'diferencia']], { d: 1 }, { d: 4 }, '$24 \\div 6 = 4$; y suman $7 \\cdot 15 = 105$.', 'Siete términos tienen seis saltos.', { a: 3, n: 7, top: 51 }),
    T('¿Cuáles sumas dan **más de 100**?', [['1 + 2 + … + 14', 1], ['2 + 4 + … + 18', 0], ['10 con promedio 11', 1], ['1 + 3 + … + 19', 0]], 'La primera es 105; la tercera, 110.', 'Multiplica la cantidad por el promedio.'),
    F('Los primeros **n** impares suman $n^2$. Pon cada suma.', 'cuadrado', ['1+3+5+7', 'primeros 9'], ['16', '81'], ['18', '17', '90'], '$4^2$ y $9^2$.', 'Cuenta cuántos impares son y eleva al cuadrado.', { s: 3 }),
    S('¿Cuáles son ciertas sobre sumas aritméticas?', [['1 + 2 + … + 100 = 5050', 1], ['suma = promedio · cantidad', 1], ['de 5 a 25 de 5 en 5 hay 4 términos', 0], ['si d = 0, la suma es n · a₁', 1]], 'De 5 a 25 de cinco en cinco hay cinco.', 'Cuenta los términos con cuidado.'),
    V('Extiende con la suma.', 0, 100, [['$1 + 2 + \\cdots + 12$', 78, '\\tfrac{12 \\cdot 13}{2} = 78'], ['$5 + 10 + 15 + 20 + 25$', 75, '5 \\cdot 15 = 75'], ['8 términos, de 2 a 16', 72, '\\tfrac{8 \\cdot 18}{2} = 72']], 'Cantidad por la suma de las puntas, a la mitad.', 'Suma el primero y el último.', 1),
  ]);
  leccion('alg-14c', 'puente', [
    M('Empieza en **4** y el **tercero** es **100**. Mueve la razón.', 'escalera', [['d', 1, 6, 'razón']], { d: 1 }, { d: 5 }, '$4 \\cdot 5^2 = 100$.', 'Divide 100 entre 4: es la razón al cuadrado.', { geo: 1, a: 4, n: 3, top: 110 }),
    F('En 3, 12, 48… pon la razón y el quinto término.', 'escalera', ['razón', 'quinto'], ['4', '768'], ['9', '192', '84'], '$3 \\cdot 4^4 = 768$.', 'Cuatro saltos hasta el quinto.', { geo: 1, a: 3, d: 4, n: 3, ver: [0, 1, 2] }),
    T('¿Cuáles son **geométricas**?', [['5, 10, 20, 40', 1], ['5, 10, 15, 20', 0], ['81, 27, 9, 3', 1], ['2, −6, 18, −54', 1], ['1, 4, 9, 16', 0]], 'El cociente entre vecinos no cambia.', 'Divide cada término entre el anterior.'),
    F('El segundo es 15 y el quinto, 405. Pon $r^3$, r y el primero.', 'recta', ['r³', 'r', 'primero'], ['27', '3', '5'], ['390', '9', '45'], '$405 \\div 15 = 27$.', 'Tres saltos multiplicando.', { r: [1, 6], paso: 1, pts: [2, 5] }),
    F('Pon dos términos entre **7** y **56** para que la lista sea geométrica.', 'escalera', ['segundo', 'tercero'], ['14', '28'], ['21', '23', '39'], '$r^3 = 8$: razón 2.', 'De 7 a 56 se multiplica tres veces por lo mismo.', { geo: 1, a: 7, d: 2, n: 4, top: 60, ver: [0, 3] }),
    S('¿Cuáles son ciertas en una geométrica?', [['con r = 1 todos son iguales', 1], ['con r negativa alternan de signo', 1], ['con 0 < r < 1 crecen', 0], ['aₙ = a₁ · rⁿ', 0]], 'El exponente es $n - 1$ y entre 0 y 1 se encogen.', 'Prueba con 8 y razón un medio.'),
    V('Extiende con la respuesta.', -30, 70, [['$a_1 = 1$, $r = 4$: ¿$a_4$?', 64, '4^3 = 64'], ['$a_1 = 48$, $r = \\tfrac12$: ¿$a_5$?', 3, '48 \\div 16 = 3'], ['$a_1 = -3$, $r = -2$: ¿$a_4$?', 24, '-3 \\cdot (-8) = 24']], 'El primero por la razón a los saltos.', 'Multiplica un salto a la vez.'),
  ]);
  leccion('alg-14d', 'puente', [
    F('$S = 5 + 10 + 20 + 40$. Multiplica por 2 y resta: pon el que sobra y S.', 'escalera', ['sobra', 'S'], ['80', '75'], ['40', '70', '150'], '$2S - S = 80 - 5$.', 'El siguiente sería 80; quita el primero.', { geo: 1, a: 5, d: 2, n: 4, ver: [0, 1, 2, 3] }),
    F('$20 + 10 + 5 + \\cdots$ infinita. Pon r, $1 - r$ y la suma.', 'cinta', ['r', '1 − r', 'suma'], ['1/2', '1/2', '40'], ['2', '35', '30'], '$20 \\div \\tfrac12 = 40$.', 'El primero entre lo que le falta a r para 1.', { r: 0.5 }),
    T('¿Cuáles series infinitas **tienen suma**?', [['9 + 3 + 1 + …', 1], ['1 + 2 + 4 + …', 0], ['8 − 4 + 2 − …', 1], ['5 + 5 + 5 + …', 0], ['1 + 0.1 + 0.01 + …', 1]], 'Cuando la razón está entre −1 y 1.', 'Halla la razón de cada una.'),
    F('Pon cada decimal como fracción simplificada.', 'texto', ['0.777…', '0.1515…'], ['7/9', '5/33'], ['7/10', '15/100', '1/9'], '$\\tfrac{15}{99} = \\tfrac{5}{33}$.', 'El período sobre tantos nueves como cifras.', { cap: 'tantos nueves como cifras' }),
    M('La suma infinita $a_1 + \\tfrac{a_1}{3} + \\cdots$ es **18**. Mueve el primero.', 'escalera', [['a', 1, 18, 'primero']], { a: 1 }, { a: 12 }, '$12 \\div \\tfrac23 = 18$.', 'La suma es el primero entre lo que le falta a la razón para llegar a 1.', { geo: 1, d: 1 / 3, n: 5, top: 18, ver: [] }),
    S('¿Cuáles son ciertas sobre sumas geométricas?', [['1 + 2 + 4 + 8 = 15', 1], ['0.999… = 1', 1], ['si r = 1 la suma infinita es 1', 0], ['1/3 + 1/9 + 1/27 + … = 1/2', 1]], 'Con $r = 1$ los términos no se encogen: no hay suma.', 'En las infinitas, divide el primero entre 1 menos la razón.'),
    V('Extiende con la suma.', 0, 64, [['$1 + 3 + 9 + 27$', 40, '\\tfrac{81 - 1}{2} = 40'], ['$12 + 6 + 3 + \\cdots$', 24, '12 \\div \\tfrac12 = 24'], ['$1 + 2 + 4 + \\cdots + 32$', 63, '64 - 1 = 63']], 'Multiplica y resta, o divide entre $1 - r$.', 'Piensa cuál sería el siguiente término.'),
  ]);
  leccion('alg-15', 'puente', [
    F('$\\sum_{k=1}^{3}(5k - 2)$: pon los términos y la suma.', 'texto', ['k = 1', 'k = 2', 'k = 3', 'suma'], ['3', '8', '13', '24'], ['5', '30', '10'], '$3 + 8 + 13 = 24$.', 'Cambia k por cada número y suma.', { cap: 'Σ (5k − 2),  k de 1 a 3' }),
    F('$\\sum_{k=1}^{20}(2k + 3)$. La suma de 1 a 20 es 210. Pon cada parte y el total.', 'texto', ['2 Σ k', 'Σ 3', 'total'], ['420', '60', '480'], ['210', '3', '423'], '$2 \\cdot 210 + 20 \\cdot 3$.', 'El 3 se suma veinte veces.', { cap: '2 Σ k + Σ 3' }),
    T('¿Cuáles valen lo mismo que **2 + 4 + 6 + 8**?', [['Σ 2k, k de 1 a 4', 1], ['2 Σ k, k de 1 a 4', 1], ['Σ 2k, k de 0 a 4', 1], ['Σ k, k de 2 a 8', 0], ['Σ 2k, k de 1 a 8', 0]], 'Empezar en 0 solo agrega un cero.', 'Escribe los términos de cada una.'),
    F('$\\sum_{k=1}^{6}\\left(\\tfrac1k - \\tfrac1{k+1}\\right)$: pon el que queda al principio, lo que se resta y la suma.', 'texto', ['queda', 'se resta', 'suma'], ['1', '1/7', '6/7'], ['1/6', '5/6', '0'], 'Los de en medio se cancelan.', 'Escribe los primeros términos y mira qué se cancela.', { cap: 'telescópica' }),
    F('Pon cada factorial o producto.', 'texto', ['4!', '6!/5!', 'Π 2, 5 veces'], ['24', '6', '32'], ['10', '30', '120'], '$6! = 6 \\cdot 5!$ y $2^5 = 32$.', 'El factorial multiplica de 1 hasta el número.', { cap: 'Π multiplica' }),
    S('¿Cuáles reglas de la sumatoria son ciertas?', [['Σ (aₖ + bₖ) = Σ aₖ + Σ bₖ', 1], ['Σ 5, k de 1 a 10, es 5', 0], ['Σ 3aₖ = 3 Σ aₖ', 1], ['Σ aₖbₖ = Σ aₖ · Σ bₖ', 0]], 'La suma se parte y el número sale; el producto no se parte.', 'Prueba con dos términos.'),
    V('Extiende con el resultado.', 0, 60, [['$\\sum_{k=1}^{5} k$', 15, '\\tfrac{5 \\cdot 6}{2} = 15'], ['$\\sum_{k=1}^{4} k^2$', 30, '1 + 4 + 9 + 16 = 30'], ['$\\sum_{k=1}^{7} 8$', 56, '7 \\cdot 8 = 56']], 'Escribe los términos y suma.', 'Una constante se suma tantas veces como términos haya.'),
  ]);

  // ============================================================================================= 6 · Polinomios
  leccion('alg-23a', 'tren', [
    M('Arma $(2x^2 + x) + (x^2 + 4x)$ con baldosas.', 'tiles', [['a', 0, 5, 'cuadrados'], ['b', 0, 8, 'barras']], { a: 1, b: 1 }, { a: 3, b: 5 }, '$3x^2 + 5x$.', 'Cuadrados con cuadrados y barras con barras.'),
    F('$(6x^2 - 2x + 5) - (2x^2 + 3x - 4)$: pon los coeficientes.', 'texto', ['x²', 'x', 'número'], ['4', '−5', '9'], ['8', '1', '−9'], 'El menos cambia los tres signos.', 'Cambia todos los signos del segundo y junta.', { cap: 'el menos entra a todos' }),
    T('¿Cuáles son **semejantes** a $5x^2$?', [['−x²', 1], ['5x', 0], ['2x³', 0], ['x²/3', 1], ['7x²', 1], ['5', 0]], 'La misma letra con el mismo exponente.', 'El número de adelante no importa.'),
    F('$(x + 5)(x + 7)$: pon lo que falta en el área.', 'area4', ['de x', 'número'], ['12', '35'], ['2', '57', '24'], '$x^2 + 12x + 35$.', 'Junta las dos barras; la esquina es un producto.', { t: ['x²', '', '', ''], lados: ['x', 'x', '7', '5'] }),
    F('$(2x - 3)(x + 4)$: pon los tres coeficientes.', 'texto', ['x²', 'x', 'número'], ['2', '5', '−12'], ['−5', '1', '12'], '$2x^2 + 8x - 3x - 12$.', 'Todos con todos, con sus signos.', { cap: 'todos con todos' }),
    S('¿Cuáles son ciertas sobre el grado?', [['x³ · x⁴ tiene grado 7', 1], ['x³ + x⁴ tiene grado 7', 0], ['el grado de 5 es 0', 1], ['(x² + 1)³ tiene grado 6', 1]], 'Al multiplicar se suman; al sumar, queda el mayor.', 'Busca el exponente más grande después de operar.'),
    V('Engancha el tren con el número que falta.', -15, 30, [['$(x + 3)(x + 8)$: número', 24, '3 \\cdot 8 = 24'], ['$(x - 6)(x + 2)$: de x', -4, '2 - 6 = -4'], ['si $P(x) = x^2 - 3x$, $P(5)$', 10, '25 - 15 = 10']], 'Suma para la x, producto para el número.', 'Llena el rectángulo o reemplaza con cuidado.'),
  ]);
  leccion('alg-3', 'tren', [
    F('$(x + 7)^2$: pon lo que falta.', 'area4', ['de x', 'número'], ['14', '49'], ['7', '28', '77'], '$x^2 + 14x + 49$.', 'Hay dos rectángulos iguales y una esquina.', { t: ['x²', '', '', ''], lados: ['x', 'x', '7', '7'] }),
    F('$(3x - 2)^2$: pon los tres coeficientes.', 'texto', ['x²', 'x', 'número'], ['9', '−12', '4'], ['3', '−6', '−4'], '$9x^2 - 12x + 4$.', 'El 3 también se eleva; los rectángulos se quitan.', { cap: '(a − b)² = a² − 2ab + b²' }),
    F('Calcula con diferencia de cuadrados: $41 \\cdot 39$.', 'texto', ['40²', '1²', 'resultado'], ['1600', '1', '1599'], ['1601', '80', '1560'], '$(40 + 1)(40 - 1)$.', 'Eleva al cuadrado el número del medio y réstale el cuadrado de lo que se alejan.', { cap: '(40 + 1)(40 − 1)' }),
    T('¿Cuáles son **cuadrados perfectos**?', [['x² + 6x + 9', 1], ['x² + 5x + 25', 0], ['x² − 8x + 16', 1], ['x² + 36', 0], ['4x² + 4x + 1', 1]], 'El término de la mitad es el doble del producto.', 'Saca las raíces de las puntas y duplica su producto.'),
    F('$(x + 2)^3$: pon los coeficientes que siguen a $x^3$.', 'texto', ['x²', 'x', 'número'], ['6', '12', '8'], ['2', '4', '3'], '$3 \\cdot 2$, $3 \\cdot 4$ y $2^3$.', 'Uno, tres, tres, uno con potencias de 2.', { cap: '1, 3, 3, 1' }),
    S('¿Cuáles identidades son ciertas?', [['(a − b)(a + b) = a² − b²', 1], ['(a + b)² = a² + b²', 0], ['(a − b)² = (b − a)²', 1], ['(x + 1)³ = x³ + 1', 0]], 'El cuadrado borra el signo, pero no los rectángulos.', 'Prueba con números pequeños.'),
    V('Engancha con el número que falta.', -40, 40, [['$(x - 5)^2$: de x', -10, '-2 \\cdot 5 = -10'], ['$(x + 6)(x - 6)$: número', -36, '-6^2 = -36'], ['$(x + \\square)^2 = x^2 + 16x + 64$', 8, '2 \\cdot 8 = 16']], 'Doble producto y cuadrados.', 'Mira si es cuadrado de suma, de resta o diferencia.'),
  ]);
  leccion('alg-24c', 'tren', [
    F('La fila 6 es 1, 6, 15, 20, 15, 6, 1. Pon los tres primeros de la fila **7**.', 'pascal', ['1.º', '2.º', '3.º'], ['1', '7', '21'], ['6', '15', '35'], 'Cada uno es suma de los dos de arriba: $1 + 6$ y $6 + 15$.', 'Empieza en 1; después suma vecinos de la fila 6.', { f: 5 }),
    F('Pon cada combinación.', 'pascal', ['C(3, 1)', 'C(4, 3)', 'C(4, 4)'], ['3', '4', '1'], ['6', '2', '12'], 'Están en las dos últimas filas dibujadas.', 'La punta es la fila 0, y en cada fila el puesto también se cuenta desde 0.', { f: 5 }),
    F('En $(x + 5)^3$, pon las maneras y el coeficiente de x.', 'texto', ['maneras', 'coeficiente'], ['3', '75'], ['15', '25', '125'], '$3 \\cdot 5^2 = 75$.', 'Para quedar una x, el 5 se escoge dos veces.', { cap: '(x + 5)³' }),
    T('¿Cuáles son iguales a **C(9, 2)**?', [['36', 1], ['18', 0], ['C(9, 7)', 1], ['72', 0], ['9 · 8 / 2', 1]], 'Escoger dos es dejar siete.', 'Multiplica dos números y divide entre dos.'),
    F('Escoge comités: de **10** personas, ¿cuántos de 2 y cuántos de 3?', 'texto', ['de 2', 'de 3'], ['45', '120'], ['90', '20', '720'], '$\\tfrac{10 \\cdot 9}{2}$ y $\\tfrac{10 \\cdot 9 \\cdot 8}{6}$.', 'Sin orden: divide por las maneras de ordenar el grupo.', { cap: 'sin importar el orden' }),
    S('¿Cuáles son ciertas sobre $(a + b)^n$?', [['tiene n + 1 términos', 1], ['los coeficientes suman 2ⁿ', 1], ['los exponentes de cada término suman n', 1], ['el coeficiente del medio es n', 0]], 'En a = b = 1 se suman los coeficientes.', 'Míralo en las filas de Pascal.'),
    V('Engancha con el coeficiente.', -30, 60, [['$(x + 1)^6$: de $x^5$', 6, '\\binom61 = 6'], ['$(x + 3)^4$: de $x^3$', 12, '4 \\cdot 3 = 12'], ['$(x - 2)^4$: de $x^2$', 24, '6 \\cdot 4 = 24']], 'Maneras por la potencia del número.', 'El signo de −2 al cuadrado se borra.'),
  ]);
  leccion('alg-24b', 'tren', [
    M('Factoriza $x^2 + 9x + 20$ repartiendo las barras (más al lado).', 'rect', [['p', 1, 8, 'al lado'], ['q', 1, 4, 'abajo']], { p: 1, q: 1 }, { p: 5, q: 4 }, '$(x + 5)(x + 4)$.', 'Dos números que sumen 9 y multipliquen 20.'),
    F('$12x^2 - 18x = \\square(\\square x - \\square)$: saca el mayor factor común y pon las piezas.', 'texto', ['afuera', 'de x', 'número'], ['6x', '2', '3'], ['6', '12', '18'], '$6x(2x - 3)$.', 'Busca el mayor número y la mayor potencia que comparten.', { cap: '12x² − 18x' }),
    T('¿Cuáles tienen a **(x − 4)** como factor?', [['x² − 16', 1], ['x² + 16', 0], ['x² − 4x', 1], ['x² − 8x + 16', 1], ['x² + 4x', 0]], 'En 4 valen cero.', 'Factoriza o reemplaza x por 4.'),
    F('$x^2 - 3x - 10$: pon los dos números, el mayor primero.', 'texto', ['mayor', 'menor'], ['2', '−5'], ['5', '−2', '10'], '$(x + 2)(x - 5)$.', 'Multiplican −10 y suman −3: signos distintos.', { cap: '(x + □)(x + □)' }),
    F('$x^3 + 3x^2 + 4x + 12$ por agrupación: pon los dos factores.', 'texto', ['grado 1', 'grado 2'], ['x + 3', 'x² + 4'], ['x + 4', 'x² + 3'], '$x^2(x + 3) + 4(x + 3)$.', 'Agrupa de a dos y saca lo que se repite.', { cap: 'agrupa de a dos' }),
    S('¿Cuáles factorizaciones son correctas?', [['x² + 2x = x(x + 2)', 1], ['x² + 9 = (x + 3)²', 0], ['2x² − 8 = 2(x − 2)(x + 2)', 1], ['x² − x − 6 = (x − 3)(x + 2)', 1]], 'Se comprueba multiplicando de vuelta.', 'Multiplica los factores y compara.'),
    V('Engancha con el número que falta.', -15, 15, [['$x^2 + 7x + 12 = (x + 3)(x + \\square)$', 4, '3 \\cdot 4 = 12'], ['$x^2 - 81 = (x + 9)(x + \\square)$', -9, '9 \\cdot (-9) = -81'], ['$x^2 - 11x = x(x + \\square)$', -11, 'x(x - 11) = x^2 - 11x']], 'Suma y producto.', 'Multiplica de vuelta para comprobar.'),
  ]);
}
