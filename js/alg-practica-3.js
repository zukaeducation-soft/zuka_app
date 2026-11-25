// Ejercicios de Álgebra, mundos 7 (Parábolas y Complejos), 8 (Raíces de Polinomios), 9 (Fracciones Algebraicas) y 10 (Crecimiento
// Exponencial). Ver alg-practica.js.
{
  const { M, F, T, S, V, leccion } = AP;
  // ============================================================================================= 7 · Parábolas y complejos
  leccion('alg-23c', 'arco', [
    M('Lleva la flecha morada a $(3 + i) + (2 + 3i)$.', 'complejo', [['x', -8, 8, 'real'], ['y', -5, 5, 'imaginaria']], { x: 0, y: 1 }, { x: 5, y: 4 }, 'Real con real e imaginaria con imaginaria.', 'Suma por separado las dos partes.', { z: [3, 1] }),
    F('Pon cada potencia de i.', 'texto', ['i⁹', 'i¹⁴', 'i⁴⁰'], ['i', '−1', '1'], ['−i', '0'], 'Se repiten cada cuatro: residuos 1, 2 y 0.', 'Divide el exponente entre 4 y mira el residuo.', { cap: 'i, −1, −i, 1, …' }),
    M('La flecha amarilla es $4 - 2i$. Lleva la otra a su **conjugado**.', 'complejo', [['x', -8, 8, 'real'], ['y', -5, 5, 'imaginaria']], { x: 1, y: 1 }, { x: 4, y: 2 }, 'El conjugado refleja sobre el eje real.', 'Cambia solo el signo de la parte imaginaria.', { z: [4, -2] }),
    F('$(2 + 3i)(1 - 2i)$: pon la parte real y la imaginaria.', 'texto', ['real', 'imaginaria'], ['8', '−1'], ['2', '−6', '−4'], '$2 - 4i + 3i - 6i^2 = 8 - i$.', 'Multiplica todos con todos y cambia i² por −1.', { cap: 'i² = −1' }),
    T('¿Cuáles tienen módulo **5**?', [['3 + 4i', 1], ['5i', 1], ['2 + 3i', 0], ['−4 + 3i', 1], ['5 + 5i', 0]], 'Pitágoras con las dos partes.', 'Suma los cuadrados: debe dar 25.'),
    S('¿Cuáles son ciertas sobre los complejos?', [['z por su conjugado es real', 1], ['i³ = i', 0], ['todo real es complejo', 1], ['√−9 = 3i', 1]], '$z\\bar z = a^2 + b^2$.', 'Escribe z = a + bi y calcula.'),
    V('Lanza el balón con el número.', -12, 30, [['$|6 + 8i|$', 10, '\\sqrt{36 + 64} = 10'], ['$(5 + 2i)(5 - 2i)$', 29, '25 + 4 = 29'], ['parte real de $(1 + 3i)^2$', -8, '1 - 9 = -8']], 'Pitágoras y $i^2 = -1$.', 'Desarrolla con calma y cambia i² por −1.'),
  ]);
  leccion('alg-1', 'arco', [
    F('La balanza muestra $3x + 2 = x + 10$. Pon lo que queda en cada paso.', 'balanza', ['2x =', 'x ='], ['8', '4'], ['12', '6', '3'], 'Se quitan una caja y dos bolitas de cada lado.', 'Quita lo mismo de los dos lados.', { x: 3, u: 2, y: 1, w: 10 }),
    M('Prueba valores hasta equilibrar $4x - 5 = 2x + 9$.', 'balanzaX', [['n', 0, 10, 'x']], { n: 1 }, { n: 7 }, '$28 - 5 = 23 = 14 + 9$.', 'Quita 2x de los dos lados y después suma 5.', { x: 4, u: -5, y: 2, w: 9, izq: '4x − 5', der: '2x + 9' }),
    F('$\\tfrac{x}{3} + \\tfrac{x}{5} = 16$: pon el mcm, las x juntas y x.', 'texto', ['mcm', '? · x = 240', 'x'], ['15', '8', '30'], ['5', '2', '20'], '$5x + 3x = 240$.', 'Multiplica todos los términos por el mcm de 3 y 5.', { cap: 'por el mcm' }),
    T('¿Cuáles tienen solución **x = 2**?', [['3x = 6', 1], ['x + 5 = 8', 0], ['2(x − 1) = 2', 1], ['4x = 10', 0], ['7 − x = 5', 1]], 'Al poner 2 se cumple la igualdad.', 'Reemplaza x por 2 en cada una.'),
    F('¿Cuántas soluciones tiene cada ecuación?', 'texto', ['5x = 5x + 1', '3(x+2) = 3x+6', '2x = x'], ['ninguna', 'todas', 'una'], ['dos'], 'Queda 0 = 1; 6 = 6; y x = 0.', 'Quita las x iguales y mira lo que queda.', { cap: '¿una, ninguna o todas?' }),
    S('¿Cuáles pasos **no cambian las soluciones** de una ecuación?', [['restar 4 a los dos lados', 1], ['multiplicar un solo lado por 2', 0], ['dividir los dos entre 3', 1], ['multiplicar los dos por 0', 0]], 'Por cero se borraría todo.', 'Piensa si del resultado se puede volver.'),
    V('Lanza con el valor de x.', -10, 20, [['$2x + 7 = 31$', 12, '2x = 24'], ['$5 - x = 11$', -6, 'x = 5 - 11'], ['tres seguidos suman 45: el menor', 14, '14 + 15 + 16 = 45']], 'Deja sola la x.', 'Deshaz la última operación primero.'),
  ]);
  leccion('alg-4a', 'arco', [
    M('Lleva la parábola sobre la punteada.', 'parab', [['h', -4, 4, 'h'], ['k', -4, 5, 'k']], { h: 0, k: 0 }, { h: -2, k: -3 }, '$y = (x + 2)^2 - 3$.', 'Mira dónde está el vértice de la punteada.', { sombra: [1, -2, -3] }),
    M('Cambia **a** hasta cubrir la punteada.', 'parab', [['a', -2, 2, 'a', 0.5]], { a: 1 }, { a: -0.5 }, 'Está volteada y más abierta: $a = -\\tfrac12$.', 'Si abre hacia abajo, a es negativa. Más abierta: menor que 1.', { b0: { h: 1, k: 5 }, sombra: [-0.5, 1, 5] }),
    F('$y = x^2 + 10x + 18$: pon h y k.', 'texto', ['h', 'k'], ['−5', '−7'], ['5', '18', '7'], '$(x + 5)^2 - 7$.', 'La mitad de 10, con signo contrario; luego evalúa.', { cap: 'h = −b / 2a' }),
    T('¿Cuáles parábolas tienen **máximo**?', [['y = −x² + 3', 1], ['y = 2x² − 5', 0], ['y = 4x − x²', 1], ['y = (x − 1)²', 0], ['y = −3(x + 2)²', 1]], 'Las que abren hacia abajo.', 'Mira el signo del término con x².'),
    F('Lee la parábola: pon las raíces y el eje. (Cada cuadro vale 1.)', 'curva', ['menor', 'mayor', 'eje x ='], ['−1', '3', '1'], ['−3', '2', '−4'], 'El eje está en la mitad de las raíces.', 'Mira dónde corta el eje horizontal y toma la mitad.', { fx: x => x * x - 2 * x - 3, ej: [-5, 5, -5, 5] }),
    S('Para $y = (x - 4)^2 + 1$, ¿cuáles son ciertas?', [['el vértice es (4, 1)', 1], ['corta el eje x dos veces', 0], ['el mínimo es 1', 1], ['es simétrica respecto a x = −4', 0]], 'Está por encima del eje: no lo corta.', 'Dibuja el vértice y mira hacia dónde abre.'),
    V('Lanza con el valor pedido.', -10, 30, [['eje de $y = x^2 - 12x$', 6, '\\tfrac{12}{2} = 6'], ['máximo de $x(6 - x)$', 9, '3 \\cdot 3 = 9'], ['mínimo de $(x + 3)^2 - 8$', -8, 'k = -8']], 'El vértice manda.', 'El eje es la mitad de las raíces.'),
  ]);
  leccion('alg-4', 'arco', [
    M('Lleva los cortes a las soluciones de $x^2 + 2x - 8 = 0$ (la menor primero).', 'raices', [['r', -5, 0, 'menor'], ['s', 0, 5, 'mayor']], { r: -1, s: 1 }, { r: -4, s: 2 }, '$(x + 4)(x - 2) = 0$.', 'Dos números que multipliquen −8 y sumen 2; las raíces llevan el signo contrario.', { ej: [-6, 6, -10, 8] }),
    F('$x^2 - 6x + 7 = 0$: pon el discriminante y cuántas reales hay.', 'texto', ['b² − 4ac', 'reales'], ['8', '2'], ['64', '1', '−8'], '$36 - 28 = 8 > 0$.', 'Calcula y mira el signo.', { cap: 'b² − 4ac' }),
    T('¿Cuáles tienen **dos** soluciones reales?', [['x² = 9', 1], ['x² + 4 = 0', 0], ['x² − 10x + 25 = 0', 0], ['x² = 5x', 1], ['x² + x − 1 = 0', 1]], 'El discriminante es positivo.', 'Factoriza o calcula el discriminante.'),
    F('$3x^2 + 5x - 2 = 0$: pon el discriminante y las raíces, la menor primero.', 'texto', ['b² − 4ac', 'menor', 'mayor'], ['49', '−2', '1/3'], ['1', '2', '−1/3'], '$x = \\tfrac{-5 \\pm 7}{6}$.', 'Cuidado: −4 por 3 por −2 es positivo.', { cap: '3x² + 5x − 2 = 0' }),
    F('Las raíces de $x^2 - 9x + 14$: pon su suma, su producto y la mayor.', 'curva', ['suma', 'producto', 'mayor'], ['9', '14', '7'], ['−9', '2', '5'], 'Suma 9 y producto 14: 2 y 7.', 'La suma es el opuesto del de x; el producto, el número.', { fx: x => x * x - 9 * x + 14, ej: [0, 10, -8, 8] }),
    S('¿Cuáles son ciertas sobre cuadráticas?', [['si una raíz es 0, c = 0', 1], ['toda cuadrática tiene dos reales', 0], ['x² = 16 da solo x = 4', 0], ['b² = 4ac da una sola raíz', 1]], '$x^2 = 16$ también da −4.', 'Piensa en dónde corta la parábola el eje.'),
    V('Lanza con la solución **positiva**.', 0, 20, [['$x^2 - 3x = 40$', 8, '64 - 24 = 40'], ['$x(x + 4) = 60$', 6, '6 \\cdot 10 = 60'], ['$x^2 = 121$', 11, '11^2 = 121']], 'Factoriza y descarta la negativa.', 'Busca dos números con ese producto.'),
  ]);

  // ============================================================================================= 8 · Raíces de polinomios
  leccion('alg-23b', 'bola', [
    F('$x^2 + 8x + 17$ entre $x + 3$: el cociente es $x + \\square$. Pon el número y el residuo.', 'texto', ['x + ?', 'residuo'], ['5', '2'], ['8', '11', '14'], '$(x + 3)(x + 5) + 2$.', 'Quita 3x de 8x; luego 3 por lo que pusiste.', { cap: 'divisor · cociente + residuo' }),
    F('Se divide un polinomio de grado **9** entre uno de grado **4**. Pon el grado del cociente y el mayor grado posible del residuo.', 'texto', ['cociente', 'residuo'], ['5', '3'], ['13', '4', '36'], '$9 - 4 = 5$ y el residuo tiene grado menor que 4.', 'Resta los grados; el residuo queda por debajo del divisor.', { cap: 'se restan los grados' }),
    T('¿Cuáles divisiones son **exactas**?', [['(x² − 9) ÷ (x + 3)', 1], ['(x² + 9) ÷ (x + 3)', 0], ['(x² + 5x) ÷ x', 1], ['(x² + 1) ÷ x', 0], ['(x³ − 1) ÷ (x − 1)', 1]], 'No sobra residuo.', 'Evalúa en el número que anula al divisor.'),
    F('$(x + 4)(x + k) = x^2 + 11x + m$. Pon k y m.', 'area4', ['k', 'm'], ['7', '28'], ['15', '44', '11'], '$4 + k = 11$ y $m = 4 \\cdot 7$.', 'Compara el coeficiente de x y después el número.', { t: ['x²', 'kx', '4x', 'm'], lados: ['x', 'x', 'k', '4'] }),
    F('$ax^2 + bx + 8 = 5x^2 - 3x + c$ para toda x. Pon a, b y c.', 'texto', ['a', 'b', 'c'], ['5', '−3', '8'], ['3', '−5', '0'], 'Coeficiente a coeficiente.', 'Los de x² con los de x², y así cada uno.', { cap: 'los mismos coeficientes' }),
    S('En la división $P = D \\cdot Q + R$, ¿cuáles son ciertas?', [['R tiene menos grado que D', 1], ['si R = 0, D es factor de P', 1], ['el grado de Q es grado P − grado D', 1], ['R siempre es un número', 0]], 'El residuo es número solo si el divisor es de grado uno.', 'Piensa en un divisor de grado dos.'),
    V('Echa la bola con el número.', -10, 20, [['$x^2 + 6x + 8$ entre $x + 2$: $x + \\square$', 4, '2 \\cdot 4 = 8'], ['residuo de $x^2 + 5$ entre $x - 1$', 6, '1 + 5 = 6'], ['residuo de $2x + 1$ entre $x + 3$', -5, '-6 + 1 = -5']], 'El residuo es el valor en el número que anula al divisor.', 'Reemplaza x por ese número.'),
  ]);
  const p92 = x => x ** 3 - x * x - 10 * x - 8;
  leccion('alg-92', 'bola', [
    M('$P(x) = x^3 - x^2 - 10x - 8$. Mueve la sonda a la raíz **positiva**.', 'sonda', [['x', -4, 5, 'x']], { x: 0 }, { x: 4 }, '$64 - 16 - 40 - 8 = 0$.', 'Prueba los divisores positivos de 8.', { fx: p92, ej: [-5, 6, -20, 20], gy: 5 }),
    F('$P(x) = x^3 - 5x + 1$. Pon el residuo de dividir entre cada uno.', 'texto', ['x − 2', 'x + 1', 'x'], ['−1', '5', '1'], ['3', '−3', '0'], 'Se evalúa en 2, en −1 y en 0.', 'Usa el número que anula al divisor.', { cap: 'residuo = P(c)' }),
    F('Divide $x^3 - 6x^2 + 11x - 6$ entre $x - 1$: completa la fila de abajo.', 'texto', ['1.º', '2.º', '3.º', 'residuo'], ['1', '−5', '6', '0'], ['−7', '5', '−6'], '$x^2 - 5x + 6$, exacto.', 'Baja, multiplica por 1 y suma.', { cap: '1, −6, 11, −6' }),
    T('¿Cuáles son **factores** de $x^3 - 4x$?', [['x', 1], ['x − 2', 1], ['x + 2', 1], ['x − 4', 0], ['x + 1', 0]], '$x(x - 2)(x + 2)$.', 'Reemplaza el número que anula a cada uno.'),
    F('$x - 3$ es factor de $x^2 + kx - 12$. Pon $9 - 12$ y k.', 'texto', ['sin k', 'k'], ['−3', '1'], ['3', '−1', '4'], '$9 + 3k - 12 = 0$.', 'Reemplaza x por 3 e iguala a cero.', { cap: 'P(3) = 0' }),
    S('¿Cuáles son ciertas sobre residuos y factores?', [['si P(5) = 0, x − 5 es factor', 1], ['para x + 2 se evalúa en 2', 0], ['si falta una potencia se pone 0', 1], ['el residuo entre x es el término suelto', 1]], 'Para $x + 2$ se usa −2.', 'Mira qué número anula al divisor.'),
    V('Echa la bola con el residuo.', -20, 20, [['$x^2 - 3x$ entre $x - 5$', 10, '25 - 15 = 10'], ['$x^3 + 1$ entre $x + 2$', -7, '-8 + 1 = -7'], ['$2x^2 - 8$ entre $x - 2$', 0, '8 - 8 = 0']], 'Evalúa el polinomio.', 'Reemplaza x por el número que anula al divisor.'),
  ]);
  leccion('alg-93', 'bola', [
    F('Lee las raíces de la curva, de menor a mayor. (Cada columna vale 1.)', 'cubica', ['1.ª', '2.ª', '3.ª'], ['−3', '1', '2'], ['−1', '0', '3'], 'Cruza el eje en −3, 1 y 2.', 'El eje vertical es el 0: cuenta columnas desde ahí.', { fx: x => (x + 3) * (x - 1) * (x - 2), ej: [-5, 5, -16, 16] }),
    F('$x^2(x - 2)^3(x + 6)^2$: pon el grado y qué hace en 0 y en 2.', 'texto', ['grado', 'en 0', 'en 2'], ['7', 'rebota', 'cruza'], ['12', 'nada'], 'Impar cruza y par rebota.', 'Suma los exponentes y mira si cada uno es par.', { cap: 'x² (x − 2)³ (x + 6)²' }),
    T('¿Cuáles son **candidatas** a raíz entera de $x^3 + x - 10$?', [['2', 1], ['3', 0], ['−5', 1], ['10', 1], ['4', 0], ['−1', 1]], 'Los divisores de 10, con los dos signos.', 'Una raíz entera divide al término suelto.'),
    F('$x^3 - 7x + 6$ tiene la raíz 1. Al bajar de grado queda $x^2 + x - 6$. Pon las otras dos, la menor primero.', 'texto', ['menor', 'mayor'], ['−3', '2'], ['3', '−2', '6'], '$(x + 3)(x - 2)$.', 'Factoriza la cuadrática que quedó.', { cap: 'x² + x − 6 = 0' }),
    F('Un polinomio real de grado 4 tiene raíces 2, $-1$ y $4 + 3i$. Pon la que falta y el producto de las complejas.', 'texto', ['falta', 'producto'], ['4 − 3i', '25'], ['−4 − 3i', '7', '1'], '$16 + 9 = 25$.', 'Las complejas vienen en pareja con su conjugada.', { cap: 'coeficientes reales' }),
    S('¿Cuáles son ciertas sobre raíces?', [['grado 5 real tiene al menos una real', 1], ['grado 4 siempre tiene una real', 0], ['las complejas vienen en parejas', 1], ['en una raíz doble la curva rebota', 1]], '$x^4 + 1$ no tiene raíces reales.', 'Piensa en los extremos de la gráfica.'),
    V('Echa la bola con la raíz **entera positiva**.', 0, 12, [['$x^3 - 27$', 3, '3^3 = 27'], ['$x^3 - 5x^2$', 5, 'x^2(x - 5)'], ['$(x + 1)(x^2 - 8x + 16)$', 4, '(x - 4)^2']], 'Factoriza o prueba divisores.', 'Iguala a cero y busca el número que cumple.'),
  ]);

  // ============================================================================================= 9 · Fracciones algebraicas
  leccion('alg-25a', 'bote', [
    M('Mueve el río hasta el valor prohibido de $\\tfrac{2}{x + 4}$.', 'rio', [['q', -5, 5, 'prohibido']], { q: 0 }, { q: -4 }, '$x + 4 = 0$ en $x = -4$.', 'Iguala el denominador a cero.'),
    F('Prohibidos de $\\tfrac{x}{x^2 - 7x + 10}$, el menor primero.', 'texto', ['menor', 'mayor'], ['2', '5'], ['−2', '−5', '10'], '$(x - 2)(x - 5) = 0$.', 'Factoriza el denominador.', { cap: 'denominador = 0' }),
    F('$\\tfrac{x^2 - 36}{x + 6}$ simplificada, y su prohibido.', 'texto', ['queda', 'x ≠'], ['x − 6', '−6'], ['x + 6', '6', 'x'], 'Se cancela $x + 6$, pero −6 sigue prohibido.', 'Arriba hay una diferencia de cuadrados.', { cap: '(x² − 36) / (x + 6)' }),
    T('¿En cuáles se puede **cancelar** la x?', [['5x / 2x', 1], ['(x + 3) / x', 0], ['x² / x', 1], ['(x − 1) / (x + 1)', 0], ['x(x + 2) / 4x', 1]], 'Solo si es factor de todo arriba y de todo abajo.', 'Pregunta si la x multiplica a todo.'),
    F('$\\tfrac{(x + 1)(x - 3)}{(x - 3)(x + 8)}$: di qué hay en cada prohibido.', 'texto', ['en 3', 'en −8'], ['hueco', 'río'], ['nada'], 'El factor de 3 se cancela; el de −8 queda.', 'Mira cuál factor del denominador desaparece.', { cap: 'hueco o río' }),
    S('¿Cuáles son ciertas sobre fracciones algebraicas?', [['x/x = 1 para x ≠ 0', 1], ['(x + 2)/2 = x', 0], ['(3 − x)/(x − 3) = −1', 1], ['1/(x² + 1) no tiene prohibidos', 1]], '$x^2 + 1$ nunca es cero.', 'Prueba cada una con un número.'),
    V('Rema hasta el valor prohibido (el mayor si hay dos).', -10, 12, [['$\\tfrac{1}{2x - 14}$', 7, '2x = 14'], ['$\\tfrac{x}{x^2 - 16}$', 4, 'x = \\pm4'], ['$\\tfrac{3}{x + 9}$', -9, 'x = -9']], 'Donde el denominador es cero.', 'Iguala a cero y despeja.'),
  ]);
  leccion('alg-25b', 'bote', [
    F('$\\tfrac{3}{x} + \\tfrac{4}{x + 1}$ sobre $x(x + 1)$: arriba queda $\\square x + \\square$.', 'texto', ['de x', 'número'], ['7', '3'], ['4', '12', '1'], '$3(x + 1) + 4x$.', 'A cada una le falta el denominador de la otra.', { cap: '3/x + 4/(x + 1)' }),
    F('$\\tfrac{9x + 1}{x - 2} - \\tfrac{4x - 6}{x - 2}$: arriba queda $\\square x + \\square$.', 'texto', ['de x', 'número'], ['5', '7'], ['−5', '13', '−7'], '$9x + 1 - 4x + 6$.', 'El menos entra a los dos términos.', { cap: 'la raya es un paréntesis' }),
    F('$\\tfrac{x}{8} \\div \\tfrac{x^3}{12}$: pon arriba y abajo, simplificado.', 'texto', ['arriba', 'abajo'], ['3', '2x²'], ['x', '3x²', '2'], '$\\tfrac{12x}{8x^3}$.', 'Voltea la segunda y cancela.', { cap: 'voltea y multiplica' }),
    T('¿Cuáles son **denominador común** de $\\tfrac1x$ y $\\tfrac1{x-5}$?', [['x(x − 5)', 1], ['x − 5', 0], ['2x(x − 5)', 1], ['2x − 5', 0], ['x²(x − 5)', 1]], 'Los que se dividen entre los dos; el primero es el menor.', 'Tiene que ser múltiplo de x y de x − 5.'),
    F('$\\dfrac{1 + \\tfrac1x}{\\tfrac1x}$ por $\\tfrac{x}{x}$: pon arriba y abajo.', 'texto', ['arriba', 'abajo'], ['x + 1', '1'], ['x', '1 + x²', '0'], 'Cada término se multiplica por x.', 'Multiplica arriba y abajo por x para borrar las fracciones.', { cap: 'por x/x' }),
    S('¿Cuáles operaciones están bien?', [['a/b · c/d = ac/bd', 1], ['a/b + c/b = (a + c)/2b', 0], ['a/b ÷ c = a/(bc)', 1], ['1/a + 1/b = 2/(a + b)', 0]], 'El tamaño de las partes no se suma.', 'Prueba con 1, 2, 3 y 4.'),
    V('Rema hasta el número que falta.', -10, 20, [['$\\tfrac2x + \\tfrac5x = \\tfrac{\\square}{x}$', 7, '2 + 5 = 7'], ['$\\tfrac{x}{4} \\cdot \\tfrac{12}{x} = \\square$', 3, '\\tfrac{12}{4} = 3'], ['$\\tfrac{1}{x} - \\tfrac{4}{x} = \\tfrac{\\square}{x}$', -3, '1 - 4 = -3']], 'Mismo tamaño: se suman los de arriba.', 'Cancela antes de multiplicar.'),
  ]);
  leccion('alg-101', 'bote', [
    M('Lleva el punto al cruce de $y = x + 1$ y $y = -2x + 10$.', 'cruce', [['x', 0, 8, 'x'], ['y', 0, 8, 'y']], { x: 1, y: 1 }, { x: 3, y: 4 }, '$x + 1 = -2x + 10$.', 'Debe cumplir las dos ecuaciones.', { l: [[1, 1], [-2, 10]] }),
    F('$4x + y = 22$ y $x - y = 3$. Pon 5x, x, y.', 'texto', ['5x =', 'x', 'y'], ['25', '5', '2'], ['19', '4', '8'], 'Al sumar se va la y.', 'Suma las ecuaciones y vuelve con x.', { cap: 'suma las dos' }),
    F('$y = 3x - 4$ y $2x + y = 16$. Pon 5x, x, y.', 'texto', ['5x =', 'x', 'y'], ['20', '4', '8'], ['12', '6', '16'], '$2x + (3x - 4) = 16$.', 'Reemplaza y por su paquete.', { cap: 'reemplaza el paquete' }),
    T('¿Cuáles puntos cumplen **las dos**: x + y = 7 y x − y = 1?', [['(4, 3)', 1], ['(5, 2)', 0], ['(3, 4)', 0], ['(6, 1)', 0]], 'Solo uno está en las dos rectas.', 'Prueba cada punto en las dos ecuaciones.'),
    M('Mueve la pendiente para que el sistema con la roja **no tenga** solución.', 'linea2', [['m', -2, 2, 'pendiente', 0.5]], { m: -1 }, { m: 0.5 }, 'Paralelas: la misma pendiente y distinta altura.', 'Dos rectas no se cruzan si tienen la misma inclinación.', { b: 3, o: [0.5, -1], ej: [-5, 5, -5, 6] }),
    S('¿Cuáles son ciertas sobre sistemas?', [['si al eliminar queda 0 = 5, no hay solución', 1], ['si queda 0 = 0, hay infinitas', 1], ['dos rectas se cortan en dos puntos', 0], ['se puede multiplicar una ecuación por 3', 1]], 'Dos rectas distintas se cortan a lo más una vez.', 'Piensa en dos rectas dibujadas.'),
    V('Rema hasta el valor de x.', -10, 20, [['$x + y = 20$, $x - y = 4$', 12, '2x = 24'], ['$y = 2x$, $x + y = 18$', 6, '3x = 18'], ['$3x + y = 1$, $y = 10$', -3, '3x = -9']], 'Elimina o sustituye.', 'Suma las ecuaciones o reemplaza y.'),
  ]);
  leccion('alg-102', 'bote', [
    M('Sube la recta $y = 2x + b$ hasta que uno de sus cruces con $y = x^2$ sea **(3, 9)**.', 'corta', [['b', -2, 5, 'b']], { b: -1 }, { b: 3 }, '$9 = 6 + 3$.', 'El punto debe cumplir la ecuación de la recta.', { fx: x => x * x, m: 2, ej: [-4, 5, -3, 12], gy: 2 }),
    F('$y = x^2$ con $y = x + 12$: pon las x de los cruces, la menor primero.', 'curva', ['menor', 'mayor'], ['−3', '4'], ['3', '−4', '12'], '$x^2 - x - 12 = 0$.', 'Iguala las dos y factoriza.', { fx: x => x * x, ej: [-5, 5, -2, 18], gy: 2 }),
    F('$\\tfrac{9x + 3}{x(x + 3)} = \\tfrac{A}{x} + \\tfrac{B}{x + 3}$. Pon A y B.', 'texto', ['A', 'B'], ['1', '8'], ['3', '9', '−8'], 'En 0: $3 = 3A$. En −3: $-24 = -3B$.', 'Escoge el valor que apaga una letra.', { cap: 'A/x + B/(x + 3)' }),
    T('¿Cuáles puntos están en la circunferencia **x² + y² = 25**?', [['(3, 4)', 1], ['(5, 5)', 0], ['(0, −5)', 1], ['(−4, 3)', 1], ['(2, 3)', 0]], 'Los cuadrados suman 25.', 'Eleva cada coordenada y suma.'),
    F('$\\tfrac{6x + 5}{(x - 1)^2} = \\tfrac{A}{x - 1} + \\tfrac{B}{(x - 1)^2}$. Pon A y B.', 'texto', ['A', 'B'], ['6', '11'], ['5', '1', '−6'], '$6(x - 1) + 11$.', 'A sale de los de x; B, evaluando en 1.', { cap: 'una por cada potencia' }),
    S('¿Cuáles son ciertas sobre cruces y fracciones parciales?', [['recta y parábola: a lo más 2 cruces', 1], ['(x − 2)² pide una sola fracción', 0], ['x² + 1 abajo pide Bx + C arriba', 1], ['dos circunferencias: hasta 2 cruces', 1]], 'Un factor repetido pide una por cada potencia.', 'Imagina las curvas dibujadas.'),
    V('Rema hasta el número pedido.', -10, 15, [['números con suma 13 y producto 40: el mayor', 8, '8 \\cdot 5 = 40'], ['$y = x^2$, $y = 4x$: la x que no es 0', 4, 'x^2 = 4x'], ['$\\tfrac{5x}{x(x+2)}$: A de $\\tfrac{A}{x+2}$', 5, '\\tfrac{5}{x + 2}']], 'Iguala y resuelve, o cancela.', 'Convierte cada caso en una ecuación.'),
  ]);

  // ============================================================================================= 10 · Exponenciales
  leccion('alg-71', 'planta', [
    M('Mueve **a** hasta cubrir la punteada $y = a \\cdot 2^x$.', 'expo', [['a', 1, 8, 'a']], { a: 1 }, { a: 5 }, 'En 0 la curva vale a: 5.', 'Mira dónde corta la punteada el eje vertical.', { base: 2, sombra: [5, 0] }),
    M('Mueve el **piso** hasta cubrir la punteada $y = 2^x + k$.', 'expo', [['k', -1, 5, 'k']], { k: 0 }, { k: 2 }, 'El piso está en 2.', '¿A qué altura se acerca la punteada por la izquierda?', { base: 2, sombra: [1, 2] }),
    F('$y = 4 \\cdot 3^x$: pon cada valor.', 'texto', ['x = 0', 'x = 2', 'x = −1'], ['4', '36', '4/3'], ['12', '144', '0'], 'Primero la potencia y después por 4.', 'Calcula la potencia antes de multiplicar.', { cap: 'y = 4 · 3ˣ' }),
    T('¿Cuáles funciones **crecen**?', [['3ˣ', 1], ['(1/4)ˣ', 0], ['2⁻ˣ', 0], ['1.02ˣ', 1], ['(5/3)ˣ', 1], ['0.9ˣ', 0]], 'Las de base mayor que 1.', 'Escribe $2^{-x}$ como $(\\tfrac12)^x$.'),
    F('Un café se enfría según $T = 60 \\cdot 0.5^t + 20$ (°C). Pon T en 0, en 1 y el piso.', 'texto', ['t = 0', 't = 1', 'piso'], ['80', '50', '20'], ['60', '40', '0'], '$60 \\cdot 0.5 + 20 = 50$.', 'Reemplaza t; el piso es lo que se suma.', { cap: 'T = 60 · 0.5ᵗ + 20' }),
    S('Sobre $y = b^x$, ¿cuáles son ciertas?', [['pasa por (0, 1)', 1], ['corta el eje x', 0], ['b puede ser negativa', 0], ['bˣ⁺¹ = b · bˣ', 1]], 'Nunca vale cero y la base es positiva.', 'Piensa en la gráfica de $2^x$.'),
    V('Haz crecer la planta con el valor.', 0, 100, [['$2 \\cdot 3^3$', 54, '2 \\cdot 27 = 54'], ['$96 \\cdot (\\tfrac12)^4$', 6, '96 \\div 16 = 6'], ['$5 \\cdot 2^4$', 80, '5 \\cdot 16 = 80']], 'Potencia primero.', 'Multiplica o parte un paso a la vez.', 1),
  ]);
  leccion('alg-13b', 'planta', [
    F('**200** mil al **6 %** anual **simple**. Pon lo que gana por año y el monto a los 5 años (miles).', 'ahorro', ['por año', '5 años'], ['12', '260'], ['6', '268', '230'], '$12 \\cdot 5 = 60$.', 'Cada año gana la misma cantidad.', { C: 200, i: 0.06 }),
    F('**800** mil al **5 %** anual **compuesto**. Pon el monto tras 1 y tras 2 años (miles).', 'ahorro', ['1 año', '2 años'], ['840', '882'], ['880', '805', '900'], '$840 \\cdot 1.05 = 882$.', 'El segundo año gana sobre 840.', { C: 800, i: 0.05 }),
    F('**18 %** nominal anual, capitaliza **mensual**, 3 años. Pon la tasa del mes y los períodos.', 'texto', ['tasa', 'períodos'], ['1.5 %', '36'], ['6 %', '3', '54 %'], '$18 \\div 12$ y $3 \\cdot 12$.', 'Reparte la tasa y cuenta los meses.', { cap: 'por mes' }),
    T('¿Cuáles son interés **compuesto**?', [['100, 110, 121', 1], ['100, 110, 120', 0], ['50, 100, 200', 1], ['80, 100, 120', 0]], 'Se multiplica siempre por lo mismo.', 'Divide cada monto entre el anterior.'),
    M('Con interés simple, un ahorro de **20** sube **3** por año. ¿En cuántos años llega a **41**?', 'recta', [['x', 0, 10, 'años']], { x: 0 }, { x: 7 }, '$21 \\div 3 = 7$.', '¿Cuánto le falta? ¿Cuántas veces cabe el 3?', { r: [0, 10], paso: 1 }),
    S('¿Cuáles son ciertas sobre intereses?', [['el primer año simple y compuesto son iguales', 1], ['a largo plazo gana el compuesto', 1], ['al 10 % compuesto se duplica en 10 años justos', 0], ['M = C(1 + i)ᵗ es compuesto', 1]], 'Al 10 % se duplica en poco más de 7 años.', 'Compara los primeros años.'),
    V('Haz crecer hasta el monto (en miles).', 0, 100, [['50 al 10 % simple, 4 años', 70, '50 + 20 = 70'], ['40 al 50 % compuesto, 2 años', 90, '40 \\cdot 2.25 = 90'], ['interés de 60 al 20 % en 1 año', 12, '60 \\cdot 0.2 = 12']], 'Simple suma, compuesto multiplica.', 'Escribe el factor o lo que gana por año.', 1),
  ]);
  leccion('alg-72', 'planta', [
    M('Lleva el punto a la altura de $\\log_2 16$.', 'logv', [['y', -3, 5, 'log']], { y: 0 }, { y: 4 }, '$2^4 = 16$.', '¿A qué exponente va el 2?', { base: 2, x: 16 }),
    F('Pon el valor de cada logaritmo.', 'texto', ['log₃ 27', 'log₂ 1/8', 'log₇ 1'], ['3', '−3', '0'], ['9', '−4', '1'], '$3^3$, $2^{-3}$ y $7^0$.', 'Pregunta siempre por el exponente.', { cap: '¿a qué exponente?' }),
    F('Si $\\log 2 = a$ y $\\log 5 = b$, pon cada uno.', 'texto', ['log 10', 'log 25', 'log 2/5'], ['a + b', '2b', 'a − b'], ['ab', 'b²', 'b − a'], 'Producto suma, potencia multiplica, cociente resta.', 'Escribe cada número con 2 y 5.', { cap: 'log 2 = a ; log 5 = b' }),
    T('¿Cuáles **existen**?', [['log₂ 5', 1], ['log₃ 0', 0], ['log₂ (−4)', 0], ['log₅ 0.2', 1], ['log₁₀ 1', 1]], 'Solo hay logaritmos de números positivos.', 'Mira si el de adentro es positivo.'),
    F('$\\log_4 32$ en base 2: pon arriba, abajo y el resultado.', 'texto', ['log₂ 32', 'log₂ 4', 'resultado'], ['5', '2', '5/2'], ['8', '3', '16'], '$4^{5/2} = 2^5$.', 'Escribe 32 y 4 como potencias de 2.', { cap: 'cambio de base' }),
    S('¿Cuáles reglas de logaritmos son ciertas?', [['log x² = 2 log x (x > 0)', 1], ['log (x + y) = log x + log y', 0], ['log (xy) = log x + log y', 1], ['log x / log y = log (x/y)', 0]], 'La suma es del producto, no de la suma.', 'Prueba con x = 10 y y = 100.'),
    V('Haz crecer hasta el valor.', -5, 12, [['$\\log_2 64$', 6, '2^6 = 64'], ['$\\log_{10} 0.001$', -3, '10^{-3}'], ['$\\log_2 8 + \\log_2 32$', 8, '3 + 5 = 8']], 'El logaritmo es un exponente.', 'Suma exponentes cuando hay producto.'),
  ]);
  leccion('alg-73', 'planta', [
    F('$8^{x} = 32$: pon el exponente de 2 a cada lado y x.', 'texto', ['izquierda', 'derecha', 'x'], ['3x', '5', '5/3'], ['x³', '4', '3/5'], '$2^{3x} = 2^5$.', 'Escribe 8 y 32 como potencias de 2.', { cap: 'misma base' }),
    M('Mueve x hasta que $3^x$ llegue a **27**.', 'torre', [['e', 0, 4, 'x']], { e: 0 }, { e: 3 }, '$3^3 = 27$.', 'Multiplica por tres contando.', { b: 3 }),
    F('$2^x = 50$: ¿entre qué enteros seguidos está x?', 'texto', ['más que', 'menos que'], ['5', '6'], ['25', '4', '7'], '$32 < 50 < 64$.', 'Escribe las potencias de 2 hasta pasar de 50.', { cap: '2ˣ = 50' }),
    T('¿Cuáles ecuaciones tienen solución **3**?', [['2ˣ = 8', 1], ['5ˣ = 15', 0], ['log₃ x = 1', 1], ['4ˣ⁻¹ = 16', 1], ['log₂ x = 3', 0]], 'Al poner 3 se cumple.', 'Reemplaza x por 3 en cada una.'),
    F('$\\log_6 x + \\log_6 (x - 5) = 2$: pon $x(x - 5)$, x y la que se descarta.', 'texto', ['x(x−5)', 'x', 'se descarta'], ['36', '9', '−4'], ['12', '4', '−9'], '$x^2 - 5x - 36 = (x - 9)(x + 4)$.', 'Junta en un solo logaritmo; no acepta negativos.', { cap: 'log₆ x(x − 5) = 2' }),
    S('¿Cuáles pasos son válidos al resolver?', [['2ˣ = 2⁵ da x = 5', 1], ['log x = 2 da x = 100', 1], ['3ˣ = 12 da x = 4', 0], ['5ˣ = −5 no tiene solución', 1]], '3 a la x no es 3 por x.', 'Una potencia de base positiva nunca es negativa.'),
    V('Haz crecer la planta hasta x.', -5, 30, [['$2^{x-1} = 32$', 6, 'x - 1 = 5'], ['$\\log_5 x = 2$', 25, '5^2 = 25'], ['$9^x = \\tfrac{1}{81}$', -2, '9^{-2}']], 'Iguala exponentes o sube el logaritmo.', 'Busca primero una base común.'),
  ]);
}
