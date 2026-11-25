// Álgebra · mundos 6 (Álgebra de Polinomios), 7 (Parábolas y Complejos) y 8 (Raíces de Polinomios), Explora. Ejemplos propios.
{
  const P = XM.pasos;
  // Baldosas algebraicas: a cuadrados x², b barras x y c unidades.
  const tiles = (K, a, b, c, x = 24, y = 24) => Array.from({ length: Math.round(a) }, (_, i) => K.r(x + i * 60, y, 54, 54, 'fa') + K.t(x + 27 + i * 60, y + 32, 'x²', 's')).join('')
    + Array.from({ length: Math.round(b) }, (_, i) => K.r(x + i * 22, y + 64, 18, 54, 'fg') + K.t(x + 9 + i * 22, y + 96, 'x', 's')).join('') + Array.from({ length: Math.round(c) }, (_, i) => K.r(x + i * 22, y + 128, 18, 18, 'ff')).join('');
  // ---------------------------------------------------------------------------------------------------------- alg-23a
  xpLec('alg-23a', [
    ['Piezas semejantes', xpMira('dibujo', 'Empecemos por la idea: solo se juntan las piezas **de la misma forma**.', { dib: (v, K) => tiles(K, v.a, v.b, v.c), v: { a: 2, b: 3, c: 1 }, alto: 180 }, [
      ['Dos cuadrados de lado x, tres barras y una unidad.', {}, '$2x^2 + 3x + 1$'],
      ['Llegan una barra y cuatro unidades.', { b: 4, c: 5 }, '$+\\ (x + 4)$'],
      ['Las barras se suman con barras; las unidades con unidades.', {}, '$2x^2 + 4x + 5$'],
      ['El cuadrado no se junta con la barra: son formas distintas.', {}, '$x^2 + x \\neq x^3$'],
      ['El **grado** es el mayor exponente: aquí, 2.', {}, '$\\text{grado } 2$'],
    ], 'Términos semejantes: la misma letra con el mismo exponente.'),
    xpMueve('Arma $(x^2 + 2x + 3) + (x^2 + 4x)$: mueve las piezas.', 300, { a: 1, b: 2, c: 3 }, [xpRegla('a', 0, 4, 'cuadrados'), xpRegla('b', 0, 8, 'barras')], { a: 2, b: 6 }, (v, K) => tiles(K, v.a, v.b, v.c), '$2x^2 + 6x + 3$.', { lee: v => `$${v.a}x^2 + ${v.b}x + 3$` })],
    ['Restar cambia todo', xpMira('dibujo', 'Segunda idea: el menos entra a **todos** los términos.', { dib: (v, K) => P(K, v, ['(5x² + 2x) − (3x² − 4x + 1)', '5x² + 2x − 3x² + 4x − 1', '2x² + 6x − 1'], 44, 38, ''), v: { n: 1 }, alto: 150 }, [
      ['Se quita un paréntesis entero.', {}, '$-(3x^2 - 4x + 1)$'],
      ['Cada signo de adentro cambia.', { n: 2 }, '$-3x^2 + 4x - 1$'],
      ['Se juntan los semejantes.', { n: 3 }, '$2x^2 + 6x - 1$'],
      ['El error común: cambiar solo el primero.', {}, '$-3x^2 - 4x + 1 \\ \\text{no}$'],
    ], 'Restar un polinomio es sumar su opuesto.'),
    xpFila('$(4x^2 - x + 6) - (x^2 - 3x + 2)$: pon los coeficientes.', ['x²', 'x', 'número'], ['3', '2', '4'], ['5', '−4', '8'], '$-x + 3x$ y $6 - 2$.', '$3x^2 + 2x + 4$.')],
    ['Multiplicar es llenar', xpMira('dibujo', 'Tercera idea: un producto es **un rectángulo**: cada término con cada término.', { dib: (v, K) => { const c = [['x²', '5x'], ['2x', '10']]; return c.map((f, i) => f.map((t, j) => K.f(v.n - (i * 2 + j), K.r(80 + (j ? 110 : 0), 40 + (i ? 80 : 0), j ? 70 : 110, i ? 44 : 80, ['fa', 'fg', 'fg', 'ff'][i * 2 + j]) + K.t(80 + (j ? 145 : 55), 46 + (i ? 100 : 40), t, 'b'))).join('')).join('') + K.t(135, 30, 'x', 's') + K.t(225, 30, '5', 's') + K.t(66, 84, 'x', 's') + K.t(66, 146, '2', 's'); }, v: { n: 0 }, alto: 180 }, [
      ['Un rectángulo de lados x + 5 y x + 2.', {}, '$(x + 5)(x + 2)$'],
      ['La primera parte es x por x.', { n: 1 }, '$x^2$'],
      ['x por 5 y 2 por x: son barras.', { n: 3 }, '$5x + 2x = 7x$'],
      ['Y 2 por 5, las unidades.', { n: 4 }, '$x^2 + 7x + 10$'],
      ['Los grados se suman: 1 más 1, grado 2.', {}, '$1 + 1 = 2$'],
    ], 'Multiplicar: todos con todos; el grado se suma.'),
    xpFila('$(x + 3)(x + 6)$: pon el coeficiente de x y el número.', ['de x', 'número'], ['9', '18'], ['3', '6', '36'], 'Dos barras: 6x y 3x.', '$x^2 + 9x + 18$.')],
    ['Ahora sí, un problema', xpFila('Un patio mide $x + 4$ por $x + 7$. Pon los coeficientes de su área.', ['x²', 'x', 'número'], ['1', '11', '28'], ['4', '7', '12'], 'Llena el rectángulo en cuatro partes.', '$x^2 + 11x + 28$.')],
  ], 'Se juntan semejantes; restar cambia todo; multiplicar llena un rectángulo.');

  // ---------------------------------------------------------------------------------------------------------- alg-3
  const cuadAB = (v, K) => { const a = v.a * 18, b = v.b * 18, g = 8 * v.s; return K.r(70, 14, a, a, 'fa') + K.r(70 + a + g, 14, b, a, 'fg') + K.r(70, 14 + a + g, a, b, 'fg') + K.r(70 + a + g, 14 + a + g, b, b, 'ff') + K.t(70 + a / 2, 18 + a / 2, 'a²', 'b') + K.t(70 + a + g + b / 2, 18 + a / 2, 'ab', 's') + K.t(70 + a / 2, 20 + a + g + b / 2, 'ab', 's') + K.t(70 + a + g + b / 2, 20 + a + g + b / 2, 'b²', 's'); };
  xpLec('alg-3', [
    ['El cuadrado de una suma', xpMira('dibujo', 'Empecemos por la idea: el cuadrado de una suma tiene **cuatro pedazos**.', { dib: cuadAB, v: { a: 5, b: 3, s: 0 }, alto: 190 }, [
      ['Un cuadrado de lado a más b.', {}, '$(a + b)^2$'],
      ['Se corta: un cuadrado a², uno b²…', { s: 1 }, '$a^2 + b^2$'],
      ['…y dos rectángulos iguales, ab.', { s: 2 }, '$2ab$'],
      ['Olvidar los rectángulos es el error más común.', {}, '$(a + b)^2 = a^2 + 2ab + b^2$'],
      ['Con resta, los rectángulos se quitan.', {}, '$(a - b)^2 = a^2 - 2ab + b^2$'],
    ], '$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$.'),
    xpFila('$(x + 9)^2$: pon el término de x y el número.', ['de x', 'número'], ['18', '81'], ['9', '36', '99'], 'Dos rectángulos de 9 por x.', '$x^2 + 18x + 81$.')],
    ['La diferencia de cuadrados', xpMira('dibujo', 'Segunda idea: suma por diferencia **cancela** lo de en medio.', { dib: (v, K) => { const A = 100, B = 40; return K.p([[40, 20], [40 + A, 20], [40 + A, 20 + A - B], [40 + A - B, 20 + A - B], [40 + A - B, 20 + A], [40, 20 + A]], 'fa') + K.r(40 + A - B, 20 + A - B, B, B, 'fc') + K.t(90, 62, 'a² − b²', 'b') + K.f(v.m, K.r(200, 16, 60, 140, 'fg') + K.t(230, 174, 'a − b', 's') + K.t(288, 90, 'a + b', 's', 'start')); }, v: { m: 0 }, alto: 180 }, [
      ['Un cuadrado de lado a, al que se le quita uno de lado b.', {}, '$a^2 - b^2$'],
      ['Se corta la L y se arma un rectángulo.', { m: 1 }, '$(a - b)(a + b)$'],
      ['Sus lados son a menos b y a más b.', {}, '$(a + b)(a - b) = a^2 - b^2$'],
      ['Sirve para cuentas: 103 por 97.', {}, '$100^2 - 3^2 = 9\\,991$'],
    ], '$(a + b)(a - b) = a^2 - b^2$.'),
    xpFila('$52 \\cdot 48$ como $(50 + 2)(50 - 2)$: pon los cuadrados y el resultado.', ['50²', '2²', 'resultado'], ['2500', '4', '2496'], ['2504', '100', '2400'], 'Resta los cuadrados.', '$2500 - 4$.')],
    ['El cubo', xpMira('dibujo', 'Tercera idea: el cubo de una suma tiene **ocho piezas** de cuatro clases.', { dib: (v, K) => P(K, v, ['(a + b)³', 'a³ : 1 cubo', '3a²b : 3 losas', '3ab² : 3 barras', 'b³ : 1 cubito'], 28, 30), v: { n: 1 }, alto: 170 }, [
      ['Un cubo de arista a más b se corta en ocho.', {}, '$(a + b)^3$'],
      ['Primero, el cubo grande, de arista a.', { n: 2 }, '$a^3$'],
      ['Tres losas de a por a por b.', { n: 3 }, '$3a^2b$'],
      ['Tres barras de a por b por b, y el cubito.', { n: 5 }, '$3ab^2$'],
      ['En orden: uno, tres, tres, uno.', {}, '$a^3 + 3a^2b + 3ab^2 + b^3$'],
    ], '$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.'),
    xpFila('$(x + 4)^3$: pon los coeficientes que siguen a $x^3$.', ['x²', 'x', 'número'], ['12', '48', '64'], ['4', '16', '24'], '3 · 4, 3 · 16 y 4 al cubo.', '$x^3 + 12x^2 + 48x + 64$.')],
    ['Ahora sí, un problema', xpFila('Un lote cuadrado pasa de lado x a lado x + 8. ¿Cuánto creció su área? Pon los coeficientes de lo que se agregó.', ['de x', 'número'], ['16', '64'], ['8', '32', '24'], '$(x + 8)^2 - x^2$.', 'Dos franjas de 8x y la esquina de 64.')],
  ], 'Los productos notables son áreas y volúmenes cortados.');

  // ---------------------------------------------------------------------------------------------------------- alg-24c
  const pascal = (v, K) => { let h = ''; for (let i = 0; i < Math.round(v.f); i++) { let c = 1; for (let j = 0; j <= i; j++) { h += K.c(170 + (j - i / 2) * 44, 24 + i * 32, 14, 'fa') + K.t(170 + (j - i / 2) * 44, 29 + i * 32, c, 's'); c = c * (i - j) / (j + 1); } } return h; };
  xpLec('alg-24c', [
    ['El triángulo', xpMira('dibujo', 'Empecemos por la idea: cada número es la **suma de los dos de arriba**.', { dib: pascal, v: { f: 1 }, alto: 205 }, [
      ['Arriba, en la punta, hay un 1.', { f: 1 }, '$(a + b)^0 = 1$'],
      ['Abajo, 1 y 1; luego 1, 2, 1.', { f: 3 }, '$(a + b)^2$'],
      ['1, 3, 3, 1: son los del cubo.', { f: 4 }, '$(a + b)^3$'],
      ['El 6 sale de 3 más 3.', { f: 5 }, '$1, 4, 6, 4, 1$'],
      ['Cada fila da los coeficientes de una potencia.', { f: 6 }, '$(a + b)^5$'],
    ], 'La fila n da los coeficientes de $(a + b)^n$.'),
    xpFila('La fila 5 es 1, 5, 10, 10, 5, 1. Pon los cuatro primeros de la fila 6.', ['1.º', '2.º', '3.º', '4.º'], ['1', '6', '15', '20'], ['10', '11', '5'], 'Suma vecinos: 1 + 5, 5 + 10, 10 + 10.', '1, 6, 15, 20.')],
    ['Por qué salen esos números', xpMira('dibujo', 'Segunda idea: cuentan **de cuántas maneras** se escogen los paréntesis.', { dib: (v, K) => [0, 1, 2, 3].map(i => K.r(24 + i * 76, 40, 66, 44, 'fc', 8) + K.t(57 + i * 76, 68, i < 2 ? `a + ${v.q > 0.5 ? 'b ✓' : 'b'}` : 'a + b', 's')).join('') + K.t(170, 126, v.p, 'b ta'), v: { q: 0, p: '' }, alto: 150 }, [
      ['Cuatro paréntesis iguales. De cada uno sale a o b.', {}, '$(a + b)^4$'],
      ['Para tener a²b² se escoge b en dos de los cuatro.', { q: 1, p: 'a²b²' }, '$\\binom42$'],
      ['Hay 6 maneras de escoger dos de cuatro.', { p: '6 a²b²' }, '$\\binom42 = \\tfrac{4 \\cdot 3}{2} = 6$'],
      ['Por eso el coeficiente es 6.', {}, '$6a^2b^2$'],
    ], 'El coeficiente de $a^{n-k}b^k$ es $\\binom{n}{k}$.'),
    xpFila('Pon cada combinación.', ['C(5, 2)', 'C(7, 1)', 'C(6, 3)'], ['10', '7', '20'], ['18', '30', '6'], '5·4/2; siete; 6·5·4/6.', '10, 7 y 20.')],
    ['Un término suelto', xpMira('dibujo', 'Tercera idea: no hace falta abrir todo para hallar **un término**.', { dib: (v, K) => P(K, v, ['(x + 2)⁵, término con x³', 'b aparece 2 veces', 'C(5, 2) · x³ · 2²', '10 · 4x³ = 40x³'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Queremos el de x al cubo.', {}, '$(x + 2)^5$'],
      ['Los exponentes suman 5: el 2 va dos veces.', { n: 2 }, '$3 + 2 = 5$'],
      ['Las maneras por los factores.', { n: 3 }, '$\\binom52 x^3 \\cdot 2^2$'],
      ['El coeficiente es 40, no 10: el 2 también cuenta.', { n: 4 }, '$40x^3$'],
    ], 'Término: $\\binom{n}{k}a^{n-k}b^k$; no olvides la potencia de b.'),
    xpFila('En $(x + 3)^4$, el término con $x^2$: pon las maneras, $3^2$ y el coeficiente.', ['maneras', '3²', 'coeficiente'], ['6', '9', '54'], ['4', '12', '36'], 'Dos de cuatro; y el 3 va dos veces.', '$6 \\cdot 9 = 54$.')],
    ['Ahora sí, un problema', xpFila('De 8 bailarines se eligen 2 para abrir el show. ¿Cuántas parejas hay? ¿Y si se eligen 6?', ['2 de 8', '6 de 8'], ['28', '28'], ['56', '16', '48'], 'Elegir 6 es dejar 2 por fuera.', '$\\binom82 = \\binom86 = 28$.')],
  ], 'Pascal cuenta maneras de escoger: esos son los coeficientes.');

  // ---------------------------------------------------------------------------------------------------------- alg-24b
  const rectF = (v, K) => { const p = Math.round(v.p), q = Math.round(v.q), u = 18, X = 80; return K.r(60, 30, X, X, 'fa') + K.t(100, 74, 'x²', 'b') + Array.from({ length: p }, (_, i) => K.r(60 + X + i * u, 30, u, X, 'fg')).join('') + Array.from({ length: q }, (_, i) => K.r(60, 30 + X + i * u, X, u, 'fg')).join('') + XM.reja(K, 60 + X, 30 + X, p, q, u, 'ff'); };
  xpLec('alg-24b', [
    ['Factor común', xpMira('dibujo', 'Empecemos por la idea: factorizar es hallar **los lados** del área.', { dib: (v, K) => K.r(40, 40, 120, 60, 'fa') + K.t(100, 76, '6x²', 'b') + K.r(160 + v.s * 20, 40, 80, 60, 'fg') + K.t(200 + v.s * 20, 76, '4x', 'b') + K.f(1 - v.s, K.t(26, 76, '2x', 's') + K.t(140, 126, '3x + 2', 'b ta')), v: { s: 1 }, alto: 140 }, [
      ['Dos áreas: 6x² y 4x.', {}, '$6x^2 + 4x$'],
      ['Comparten una altura: 2x es el mayor factor de las dos.', { s: 0 }, '$2x$'],
      ['Los largos son 3x y 2.', {}, '$6x^2 + 4x = 2x(3x + 2)$'],
      ['Se comprueba multiplicando de vuelta.', {}, '$2x \\cdot 3x + 2x \\cdot 2$'],
    ], 'Saca el mayor factor que tienen todos.'),
    xpFila('$15x^3 - 10x^2 = \\square(\\square x - \\square)$: pon las piezas.', ['afuera', 'de x', 'número'], ['5x²', '3', '2'], ['5x', '10', '15'], '¿Qué divide a los dos, en número y en x?', '$5x^2(3x - 2)$.')],
    ['Trinomio', xpMira('dibujo', 'Segunda idea: dos números que **sumen** las barras y **multipliquen** las unidades.', { dib: rectF, v: { p: 1, q: 5 }, alto: 220 }, [
      ['x² + 6x + 8. Con 1 y 5 barras salen cinco unidades: no.', {}, '$1 \\cdot 5 = 5$'],
      ['Con 2 y 4: ocho unidades. Cierra justo.', { p: 4, q: 2 }, '$4 \\cdot 2 = 8$'],
      ['Los lados son x + 4 y x + 2.', {}, '$(x + 4)(x + 2)$'],
      ['Suman 6 y multiplican 8.', {}, '$x^2 + 6x + 8$'],
      ['Con unidades negativas, los signos son distintos.', {}, '$x^2 + x - 6 = (x + 3)(x - 2)$'],
    ], '$x^2 + sx + m$: busca dos que sumen s y multipliquen m.'),
    xpMueve('Factoriza $x^2 + 8x + 15$: reparte las 8 barras hasta tener 15 unidades (la mayor al lado).', 300, { p: 1, q: 1 }, [xpRegla('p', 1, 7, 'barras al lado'), xpRegla('q', 1, 5, 'barras abajo')], { p: 5, q: 3 }, rectF, '$(x + 5)(x + 3)$.', { lee: v => `$x^2 + ${v.p + v.q}x + ${v.p * v.q}$` })],
    ['Reconocer patrones', xpMira('dibujo', 'Tercera idea: antes de buscar, mira si es un **notable** o si se puede **agrupar**.', { dib: (v, K) => P(K, v, ['x² − 49 = (x + 7)(x − 7)', 'x² − 14x + 49 = (x − 7)²', 'x³ + 2x² + 5x + 10', '= x²(x + 2) + 5(x + 2)', '= (x + 2)(x² + 5)'], 28, 30), v: { n: 0 }, alto: 170 }, [
      ['Dos cuadrados que se restan.', { n: 1 }, '$a^2 - b^2$'],
      ['Dos cuadrados y el doble producto: cuadrado perfecto.', { n: 2 }, '$(a - b)^2$'],
      ['Cuatro términos: de a dos.', { n: 4 }, '$x^2(x + 2) + 5(x + 2)$'],
      ['El paréntesis repetido sale.', { n: 5 }, '$(x + 2)(x^2 + 5)$'],
    ], 'Primero factor común; luego notables; luego trinomio o agrupar.'),
    xpFila('Pon cada factorización.', ['x² − 64', 'x² + 10x + 25'], ['(x+8)(x−8)', '(x+5)²'], ['(x−8)²', '(x+5)(x−5)'], '¿Hay término con x? ¿Es el doble producto?', 'Diferencia de cuadrados y cuadrado perfecto.')],
    ['Ahora sí, un problema', xpMueve('El área de un salón es $x^2 + 9x + 14$. Halla sus lados repartiendo las 9 barras.', 300, { p: 1, q: 1 }, [xpRegla('p', 1, 8, 'barras al lado'), xpRegla('q', 1, 5, 'barras abajo')], { p: 7, q: 2 }, rectF, '$(x + 7)(x + 2)$.', { lee: v => `$x^2 + ${v.p + v.q}x + ${v.p * v.q}$` })],
  ], 'Factorizar: del área a los lados.');

  // ---------------------------------------------------------------------------------------------------------- alg-23c
  const plano = (v, K) => { const p = XM.plano(K, -8.7, 8.7, -5, 5, { H: 190 }); return p.s + K.ar(p.X(0), p.Y(0), p.X(v.a), p.Y(v.b), 'la gr') + (v.c != null ? K.f(v.k ?? 1, K.ar(p.X(0), p.Y(0), p.X(v.c), p.Y(v.d), 'lf gr')) : '') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('alg-23c', [
    ['Un número que gira', xpMira('dibujo', 'Empecemos por la idea: multiplicar por **i** es girar un cuarto de vuelta.', { dib: plano, v: { a: 3, b: 0, p: '3' }, alto: 200 }, [
      ['El 3, sobre el eje real.', {}, '$3 = 3 + 0i$'],
      ['Por i: gira 90 grados y queda en 3i.', { a: 0, b: 3, p: '3i' }, '$3 \\cdot i = 3i$'],
      ['Otra vez por i: llega a −3.', { a: -3, b: 0, p: '−3' }, '$3i^2 = -3$'],
      ['Por eso i al cuadrado es −1.', {}, '$i^2 = -1$'],
      ['Un giro más, −3i; con el cuarto giro vuelve al 3.', { a: 0, b: -3, p: '−3i' }, '$i^3 = -i, \\ i^4 = 1$'],
    ], '$i^2 = -1$; las potencias de i se repiten de cuatro en cuatro.'),
    xpFila('Pon cada potencia.', ['i⁶', 'i¹¹', 'i²⁰'], ['−1', '−i', '1'], ['i', '0'], 'Mira el residuo entre 4: 2, 3 y 0.', '$i^2$, $i^3$ e $i^0$.')],
    ['Sumar y multiplicar', xpMira('dibujo', 'Segunda idea: se suma **por partes** y se multiplica **como binomios**.', { dib: (v, K) => P(K, v, ['(2 + 3i) + (4 − i) = 6 + 2i', '(2 + 3i)(4 − i)', '8 − 2i + 12i − 3i²', '8 + 10i + 3 = 11 + 10i'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Real con real e imaginaria con imaginaria.', {}, '$6 + 2i$'],
      ['El producto: todos con todos.', { n: 3 }, '$8 - 2i + 12i - 3i^2$'],
      ['Como i² es −1, el último se vuelve +3.', { n: 4 }, '$-3i^2 = 3$'],
      ['Por último se juntan las partes.', {}, '$11 + 10i$'],
    ], 'Multiplica normal y cambia $i^2$ por $-1$.'),
    xpFila('$(1 + 2i)(3 + i)$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['1', '7'], ['3', '5', '2'], '$3 + i + 6i + 2i^2$.', '$1 + 7i$.')],
    ['Conjugado y tamaño', xpMira('dibujo', 'Tercera idea: el **conjugado** es el reflejo; el **módulo**, el largo.', { dib: plano, v: { a: 4, b: 3, c: 4, d: 3, k: 0, p: '4 + 3i' }, alto: 200 }, [
      ['Aquí está el número 4 + 3i.', {}, '$z = 4 + 3i$'],
      ['Su reflejo sobre el eje real es el conjugado.', { d: -3, k: 1 }, '$\\bar z = 4 - 3i$'],
      ['El largo sale por Pitágoras.', {}, '$|z| = \\sqrt{16 + 9} = 5$'],
      ['Un número por su conjugado da el largo al cuadrado: real.', {}, '$z\\bar z = 25$'],
      ['Con eso se divide: se multiplica por el conjugado de abajo.', {}, '$\\tfrac1z = \\tfrac{\\bar z}{25}$'],
    ], '$z\\bar z = |z|^2$: así se quita i del denominador.'),
    xpFila('$z = 5 - 12i$. Pon la parte imaginaria del conjugado, $|z|^2$ y $|z|$.', ['imag.', '|z|²', '|z|'], ['12', '169', '13'], ['−12', '17', '119'], 'Refleja; luego 25 más 144.', '$\\bar z = 5 + 12i$ y $|z| = 13$.')],
    ['Ahora sí, un problema', xpMueve('Un dron mira hacia $2 + 4i$. Lo multiplican por i (gira 90°). Lleva la flecha roja a donde apunta.', 290, { a: 2, b: 4, c: 2, d: 4 }, [xpRegla('c', -5, 5, 'real'), xpRegla('d', -5, 5, 'imaginaria')], { c: -4, d: 2 }, plano, '$i(2 + 4i) = 2i + 4i^2 = -4 + 2i$.', { lee: v => `$${v.c} ${v.d < 0 ? '-' : '+'} ${Math.abs(v.d)}i$` })],
  ], 'Los complejos viven en un plano; i gira un cuarto de vuelta.');

  // ---------------------------------------------------------------------------------------------------------- alg-1
  const bal = (v, K) => K.l(40, 130, 300, 130, 'gr') + K.p([[170, 130], [150, 165], [190, 165]], 'fk') + XM.bolas(K, 60, 112, v.x, 'fa', 30, 13) + XM.bolas(K, 60, 84, v.u, 'fg', 20, 8) + XM.bolas(K, 200, 112, v.y, 'fa', 30, 13) + XM.bolas(K, 200, 84, Math.min(6, v.w), 'fg', 20, 8) + XM.bolas(K, 200, 62, Math.max(0, v.w - 6), 'fg', 20, 8) + K.t(170, 30, v.p, 'b ta');
  xpLec('alg-1', [
    ['La balanza', xpMira('dibujo', 'Empecemos por la idea: una ecuación es una **balanza en equilibrio**.', { dib: bal, v: { x: 3, u: 2, y: 1, w: 8, p: '3x + 2 = x + 8' }, alto: 175 }, [
      ['Tres cajas iguales y 2 bolitas pesan como una caja y 8 bolitas.', {}, '$3x + 2 = x + 8$'],
      ['Quitamos una caja de cada lado: sigue en equilibrio.', { x: 2, y: 0, p: '2x + 2 = 8' }, '$2x + 2 = 8$'],
      ['Quitamos 2 bolitas de cada lado.', { u: 0, w: 6, p: '2x = 6' }, '$2x = 6$'],
      ['Repartimos: cada caja pesa tres bolitas.', { x: 1, w: 3, p: 'x = 3' }, '$x = 3$'],
    ], 'Lo que se hace a un lado se hace al otro.'),
    xpFila('$5x + 4 = 2x + 19$: pon lo que queda en cada paso.', ['3x =', 'x ='], ['15', '5'], ['23', '7', '3'], 'Quita 2x de cada lado y después 4.', '$3x = 15$, $x = 5$.')],
    ['Paréntesis y fracciones', xpMira('dibujo', 'Segunda idea: primero se abren paréntesis y se **quitan denominadores**.', { dib: (v, K) => P(K, v, ['x/2 + x/3 = 10', '3x + 2x = 60', '5x = 60', 'x = 12'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Medios y tercios: el común es 6.', {}, '$\\text{mcm}(2, 3) = 6$'],
      ['Todo por 6, los dos lados completos.', { n: 2 }, '$3x + 2x = 60$'],
      ['Después se juntan las x.', { n: 3 }, '$5x = 60$'],
      ['Y se reparte: 12.', { n: 4 }, '$x = 12$'],
    ], 'Multiplica todos los términos por el mcm.'),
    xpFila('$\\tfrac{x}{4} + \\tfrac{x}{6} = 5$: pon el mcm, las x juntas y x.', ['mcm', '? · x = 60', 'x'], ['12', '5', '12'], ['24', '10', '6'], '3x más 2x.', '$5x = 60$.')],
    ['Una, ninguna o todas', xpMira('dibujo', 'Tercera idea: dos rectas se cruzan **una vez, nunca o siempre**.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -4, 6, { H: 180 }); return p.s + XM.curva(K, p, x => x + 1, 'la gr') + XM.curva(K, p, x => v.m * x + v.b, 'lf gr d'); }, v: { m: -1, b: 3 }, alto: 190 }, [
      ['Cada lado es una recta. Se cruzan en un punto: una solución.', {}, '$x + 1 = -x + 3$'],
      ['Paralelas: nunca se encuentran. Ninguna solución.', { m: 1, b: 4 }, '$x + 1 = x + 4$'],
      ['La misma recta: todos los números sirven.', { m: 1, b: 1 }, '$x + 1 = x + 1$'],
      ['Al despejar sale algo falso o algo siempre cierto.', {}, '$1 = 4 \\ \\text{o} \\ 1 = 1$'],
    ], 'Falso: ninguna. Siempre cierto: todas.'),
    xpFila('Pon cuántas soluciones tiene cada una.', ['2x + 3 = 2x', '4x = x + 9', '2(x+1) = 2x+2'], ['ninguna', 'una', 'todas'], ['dos'], 'Quita las x iguales y mira lo que queda.', 'Queda 3 = 0; 3x = 9; y 2 = 2.')],
    ['Ahora sí, un problema', xpFila('Tres cuerdas miden 96 m: la segunda es el doble de la primera y la tercera, 6 m más que la segunda. Halla las tres.', ['1.ª', '2.ª', '3.ª'], ['18', '36', '42'], ['24', '30', '32'], '$x + 2x + (2x + 6) = 96$.', '$5x = 90$, $x = 18$.')],
  ], 'Equilibrio: lo mismo a los dos lados hasta dejar sola la x.');

  // ---------------------------------------------------------------------------------------------------------- alg-4a
  const par = (v, K) => { const p = XM.plano(K, -6, 6, -5, 7, { H: 200 }); return p.s + XM.curva(K, p, x => v.a * (x - v.h) ** 2 + v.k) + K.c(p.X(v.h), p.Y(v.k), 6, 'fF') + K.l(p.X(v.h), 8, p.X(v.h), 192, 'lf d'); };
  xpLec('alg-4a', [
    ['Mover la parábola', xpMira('dibujo', 'Empecemos por la idea: toda parábola es **x² movida y estirada**.', { dib: par, v: { a: 1, h: 0, k: 0 }, alto: 210 }, [
      ['La más simple: vértice en el origen.', {}, '$y = x^2$'],
      ['Sube o baja con k.', { k: -3 }, '$y = x^2 - 3$'],
      ['Se corre con h: hacia el 2, aunque se escriba menos 2.', { h: 2 }, '$y = (x - 2)^2 - 3$'],
      ['Con a negativa se voltea.', { a: -0.5, k: 4 }, '$y = -\\tfrac12(x - 2)^2 + 4$'],
      ['El vértice siempre es (h, k) y el eje, x = h.', {}, '$V = (h, k)$'],
    ], '$y = a(x - h)^2 + k$: vértice $(h, k)$.'),
    xpMueve('Lleva el vértice a $(-3, 2)$ con a = 1.', 300, { a: 1, h: 0, k: 0 }, [xpRegla('h', -4, 4, 'h'), xpRegla('k', -4, 4, 'k')], { h: -3, k: 2 }, par, '$y = (x + 3)^2 + 2$.', { lee: v => `$y = (x ${v.h < 0 ? '+' : '-'} ${Math.abs(v.h)})^2 ${v.k < 0 ? '-' : '+'} ${Math.abs(v.k)}$` })],
    ['Completar el cuadrado', xpMira('dibujo', 'Segunda idea: de la forma general se llega al vértice **completando el cuadrado**.', { dib: (v, K) => { const u = 20; return K.r(60, 20, 80, 80, 'fa') + K.t(100, 64, 'x²', 'b') + [0, 1, 2].map(i => K.r(140 + i * u, 20, u, 80, 'fg') + K.r(60, 100 + i * u, 80, u, 'fg')).join('') + K.f(v.c, XM.reja(K, 140, 100, 3, 3, u, 'ff')); }, v: { c: 0 }, alto: 180 }, [
      ['x² + 6x: un cuadrado y seis barras, tres por lado.', {}, '$x^2 + 6x$'],
      ['Falta la esquina: 3 por 3.', { c: 1 }, '$+\\ 9$'],
      ['Con ella es un cuadrado de lado x + 3.', {}, '$x^2 + 6x + 9 = (x + 3)^2$'],
      ['Si se agregó 9, hay que quitarlo.', {}, '$x^2 + 6x + 5 = (x + 3)^2 - 4$'],
      ['El atajo: el vértice está en menos b sobre dos a.', {}, '$h = -\\tfrac{b}{2a}$'],
    ], 'La mitad de b, al cuadrado, completa; y $h = -\\tfrac{b}{2a}$.'),
    xpFila('$y = x^2 - 8x + 10$: pon h y k.', ['h', 'k'], ['4', '−6'], ['−4', '10', '26'], 'La mitad de 8; y evalúa ahí: 16 − 32 + 10.', '$(x - 4)^2 - 6$.')],
    ['Máximo o mínimo', xpMira('dibujo', 'Tercera idea: el vértice es el punto **más alto o más bajo**.', { dib: (v, K) => { const p = XM.plano(K, 0, 10, 0, 30, { H: 190, gy: 5 }); return p.s + XM.curva(K, p, x => x * (10 - x)) + K.c(p.X(v.x), p.Y(v.x * (10 - v.x)), 6, 'fA') + K.l(p.X(v.x), p.Y(0), p.X(v.x), p.Y(v.x * (10 - v.x)), 'la'); }, v: { x: 1 }, alto: 200 }, [
      ['Con 20 m de malla se cercan rectángulos: lados x y 10 − x.', {}, '$A = x(10 - x)$'],
      ['Con x = 1, área 9.', {}, '$1 \\cdot 9$'],
      ['Con 3, área 21.', { x: 3 }, '$3 \\cdot 7$'],
      ['En la mitad, la mayor: un cuadrado de 25.', { x: 5 }, '$5 \\cdot 5 = 25$'],
      ['Después baja igual: es simétrica.', { x: 8 }, '$8 \\cdot 2 = 16$'],
    ], 'Si a < 0, el vértice es el máximo; si a > 0, el mínimo.'),
    xpMueve('La ganancia es $x(8 - x)$. Lleva el punto a la ganancia **máxima**.', 260, { x: 1 }, [xpRegla('x', 0, 8, 'x')], { x: 4 }, (v, K) => { const p = XM.plano(K, 0, 8, 0, 18, { H: 190, gy: 3 }); return p.s + XM.curva(K, p, x => x * (8 - x)) + K.c(p.X(v.x), p.Y(v.x * (8 - v.x)), 6, 'fA'); }, 'En la mitad de 0 y 8.', { lee: v => `$${v.x} \\cdot ${8 - v.x} = ${v.x * (8 - v.x)}$` })],
    ['Ahora sí, un problema', xpFila('Una pelota va a altura $h = -5t^2 + 20t$. ¿En qué segundo llega más alto y a cuántos metros?', ['segundo', 'altura'], ['2', '20'], ['4', '10', '40'], '$t = -\\tfrac{20}{2(-5)}$.', '$-5 \\cdot 4 + 40 = 20$ m.')],
  ], 'Vértice y eje: con ellos se dibuja y se optimiza.');

  // ---------------------------------------------------------------------------------------------------------- alg-4
  const rz = (v, K) => { const p = XM.plano(K, -5, 5, -6, 8, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => (x - v.r) * (x - v.s)) + K.c(p.X(v.r), p.Y(0), 6, 'fA') + K.c(p.X(v.s), p.Y(0), 6, 'fA'); };
  const ck = (v, K) => { const p = XM.plano(K, -5, 5, -6, 8, { H: 200, gy: 2 }), d = 4 - v.c; return p.s + XM.curva(K, p, x => x * x - 4 + v.c) + (d > -0.01 ? [1, -1].map(s => K.c(p.X(s * Math.sqrt(Math.max(0, d))), p.Y(0), 6, 'fA')).join('') : ''); };
  xpLec('alg-4', [
    ['Donde toca el piso', xpMira('dibujo', 'Empecemos por la idea: resolver es hallar **dónde corta el eje x**.', { dib: rz, v: { r: -1, s: 3 }, alto: 210 }, [
      ['Esta parábola corta en −1 y en 3.', {}, '$x = -1, \\ x = 3$'],
      ['Sus factores dicen lo mismo.', {}, '$(x + 1)(x - 3) = 0$'],
      ['Un producto da 0 si algún factor es 0.', {}, '$x + 1 = 0 \\ \\text{o} \\ x - 3 = 0$'],
      ['Abierto: x² − 2x − 3 = 0.', {}, '$x^2 - 2x - 3 = 0$'],
    ], 'Factoriza e iguala cada factor a 0.'),
    xpMueve('Mueve los cortes a las soluciones de $x^2 - x - 6 = 0$ (la menor primero).', 300, { r: -1, s: 1 }, [xpRegla('r', -4, 0, 'menor'), xpRegla('s', 0, 4, 'mayor')], { r: -2, s: 3 }, rz, '$(x + 2)(x - 3)$.', { lee: v => `$x^2 ${-(v.r + v.s) < 0 ? '-' : '+'} ${Math.abs(v.r + v.s)}x ${v.r * v.s < 0 ? '-' : '+'} ${Math.abs(v.r * v.s)}$` })],
    ['Cuántas hay', xpMira('dibujo', 'Segunda idea: el **discriminante** cuenta los cortes.', { dib: ck, v: { c: 0 }, alto: 210 }, [
      ['x² − 4: corta dos veces.', {}, '$b^2 - 4ac = 16 > 0$'],
      ['Si sube, los cortes se acercan.', { c: 3 }, '$b^2 - 4ac = 4$'],
      ['Al tocar apenas, es una sola solución.', { c: 4 }, '$b^2 - 4ac = 0$'],
      ['Más arriba ya no toca: no hay reales.', { c: 6 }, '$b^2 - 4ac < 0$'],
    ], '$b^2 - 4ac$: positivo, dos; cero, una; negativo, ninguna real.'),
    xpMueve('Sube la parábola $x^2 - 4 + c$ hasta que tenga **una sola** solución.', 270, { c: 0 }, [xpRegla('c', 0, 8, 'c')], { c: 4 }, ck, 'Queda $x^2 = 0$.', { lee: v => `$b^2 - 4ac = ${16 - 4 * v.c}$` })],
    ['La fórmula', xpMira('dibujo', 'Tercera idea: completar el cuadrado **una vez para siempre** da la fórmula.', { dib: (v, K) => P(K, v, ['x² + 6x + 2 = 0', '(x + 3)² = 7', 'x + 3 = ±√7', 'x = −3 ± √7'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['No hay dos enteros que multipliquen 2 y sumen 6.', {}, '$x^2 + 6x + 2 = 0$'],
      ['Entonces se completa el cuadrado.', { n: 2 }, '$x^2 + 6x + 9 = 7$'],
      ['Dos raíces: con más y con menos.', { n: 3 }, '$\\pm\\sqrt7$'],
      ['Y se despeja la x.', { n: 4 }, '$x = -3 \\pm \\sqrt7$'],
      ['Con letras sale la fórmula general.', {}, '$x = \\tfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'],
    ], '$x = \\tfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.'),
    xpFila('$2x^2 - 7x + 3 = 0$: pon el discriminante y las raíces de menor a mayor.', ['b² − 4ac', 'menor', 'mayor'], ['25', '1/2', '3'], ['73', '−3', '2'], '$49 - 24$; y $\\tfrac{7 \\pm 5}{4}$.', '$x = \\tfrac12$ y $x = 3$.')],
    ['Ahora sí, un problema', xpFila('Un huerto mide 3 m más de largo que de ancho y tiene 40 m². Halla ancho y largo.', ['ancho', 'largo'], ['5', '8'], ['−8', '10', '4'], '$x(x + 3) = 40$; una raíz no sirve de medida.', '$(x - 5)(x + 8) = 0$.')],
  ], 'Las raíces son los cortes: factor, cuadrado o fórmula.');

  // ---------------------------------------------------------------------------------------------------------- alg-23b
  xpLec('alg-23b', [
    ['Repartir polinomios', xpMira('dibujo', 'Empecemos por la idea: dividir polinomios es **repartir** y mirar qué sobra.', { dib: (v, K) => P(K, v, ['x² + 5x + 8 entre x + 2', 'x · (x + 2) = x² + 2x', 'queda 3x + 8', '3 · (x + 2) = 3x + 6', 'sobra 2'], 28, 30), v: { n: 1 }, alto: 170 }, [
      ['¿Por cuánto va la x para dar x²? Por x.', { n: 2 }, '$x^2 \\div x = x$'],
      ['Se quita y queda 3x + 8.', { n: 3 }, '$5x - 2x = 3x$'],
      ['Ahora toca por 3.', { n: 4 }, '$3x \\div x = 3$'],
      ['Sobra 2, de grado menor que el divisor: se acaba.', { n: 5 }, '$r = 2$'],
      ['Como en los números: divisor por cociente más residuo.', {}, '$x^2 + 5x + 8 = (x + 2)(x + 3) + 2$'],
    ], 'Dividendo = divisor · cociente + residuo.'),
    xpFila('$x^2 + 7x + 15$ entre $x + 4$: pon el número del cociente $x + \\square$ y el residuo.', ['x + ?', 'residuo'], ['3', '3'], ['7', '11', '15'], '7x − 4x = 3x; y 15 − 12.', '$(x + 4)(x + 3) + 3$.')],
    ['El grado manda', xpMira('dibujo', 'Segunda idea: los **grados se restan** y el residuo es más pequeño que el divisor.', { dib: (v, K) => XM.barra(K, 30, [[v.d, 'divisor', 'fa'], [v.q, 'cociente', 'fg']], { T: 6 }) + XM.barra(K, 80, [[v.r, 'residuo', 'ff']], { T: 6 }) + K.t(170, 140, v.p, 'ta'), v: { d: 2, q: 3, r: 1, p: '' }, alto: 160 }, [
      ['Grado 5 entre grado 2.', {}, '$5 \\text{ entre } 2$'],
      ['El cociente tiene grado 3.', { p: '5 − 2 = 3' }, '$5 - 2 = 3$'],
      ['El residuo, menos de 2: a lo sumo grado 1.', {}, '$\\text{grado } r < 2$'],
      ['Si el dividendo es menor, el cociente es 0.', {}, '$x + 1 = (x^2)\\cdot 0 + (x + 1)$'],
    ], 'Grado del cociente = resta; residuo con menos grado que el divisor.'),
    xpFila('Grado 7 entre grado 3. Pon el grado del cociente y el mayor posible del residuo.', ['cociente', 'residuo'], ['4', '2'], ['10', '3', '7'], 'Resta; y el residuo queda por debajo del divisor.', '$7 - 3 = 4$; menos de 3.')],
    ['Polinomios iguales', xpMira('dibujo', 'Tercera idea: dos polinomios son iguales si lo son **coeficiente a coeficiente**.', { dib: (v, K) => P(K, v, ['ax² + bx + 6 = 3x² − 5x + c', 'a = 3', 'b = −5', 'c = 6'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Estos dos valen lo mismo para toda x.', {}, '$\\text{para toda } x$'],
      ['Entonces los de x² coinciden.', { n: 2 }, '$a = 3$'],
      ['Los de la x también.', { n: 3 }, '$b = -5$'],
      ['Y también los números sueltos.', { n: 4 }, '$c = 6$'],
    ], 'Iguales para toda x: los mismos coeficientes.'),
    xpFila('$(x + 2)(x + k) = x^2 + 9x + m$. Pon k y m.', ['k', 'm'], ['7', '14'], ['9', '11', '18'], 'Compara los de x: 2 + k = 9.', '$k = 7$ y $m = 2 \\cdot 7$.')],
    ['Ahora sí, un problema', xpFila('Un rectángulo tiene área $x^2 + 10x + 21$ y un lado $x + 3$. El otro es $x + \\square$. Pon el número y el residuo.', ['x + ?', 'residuo'], ['7', '0'], ['10', '3', '21'], 'Reparte el área entre el lado.', '$(x + 3)(x + 7)$, exacto.')],
  ], 'Dividir es repartir: divisor por cociente más residuo.');

  // ---------------------------------------------------------------------------------------------------------- alg-92
  const cub = (v, K, f) => { const p = XM.plano(K, -4, 4, -12, 12, { H: 200, gy: 4 }); return p.s + XM.curva(K, p, f) + K.c(p.X(v.x), p.Y(f(v.x)), 6, 'fF') + K.l(p.X(v.x), p.Y(0), p.X(v.x), p.Y(f(v.x)), 'lf'); };
  const F92 = x => x ** 3 - 2 * x * x - 5 * x + 6, G92 = x => x ** 3 - 7 * x + 6;
  const sint = (v, K, a, r, b, s) => a.map((t, i) => K.t(110 + i * 60, 40, t, 'b') + K.f(v.n - i, i ? K.t(110 + i * 60, 76, b[i], 'b tg') : '') + K.f(v.n - i, K.t(110 + i * 60, 124, s[i], 'b ta'))).join('') + K.t(44, 40, r, 'b tf') + K.l(80, 92, 320, 92) + K.l(70, 20, 70, 92);
  xpLec('alg-92', [
    ['El residuo sin dividir', xpMira('dibujo', 'Empecemos por la idea: el residuo entre x − c es **el valor en c**.', { dib: (v, K) => cub(v, K, F92), v: { x: -1 }, alto: 210 }, [
      ['P(x) = x³ − 2x² − 5x + 6. ¿Cuánto vale en −1?', {}, '$P(-1) = 8$'],
      ['Al dividir entre x + 1 sobra justo eso: 8.', {}, '$P(x) = (x + 1)Q(x) + 8$'],
      ['En 1 vale 0: no sobra nada.', { x: 1 }, '$P(1) = 0$'],
      ['Entonces x − 1 es un **factor**.', {}, '$P(x) = (x - 1)Q(x)$'],
      ['Y también lo es x − 3.', { x: 3 }, '$P(3) = 0$'],
    ], 'Residuo entre $x - c$: $P(c)$. Si es 0, $x - c$ es factor.'),
    xpMueve('$P(x) = x^3 - 7x + 6$. Mueve el punto a la raíz **negativa**.', 270, { x: 0 }, [xpRegla('x', -3, 3, 'x')], { x: -3 }, (v, K) => cub(v, K, G92), '$P(-3) = -27 + 21 + 6 = 0$.', { lee: v => `$P(${v.x}) = ${G92(v.x)}$` })],
    ['La división corta', xpMira('dibujo', 'Segunda idea: la **sintética** baja, multiplica y suma.', { dib: (v, K) => sint(v, K, [1, -4, 1, 6], 2, ['', 2, -4, -6], [1, -2, -3, 0]), v: { n: 0 }, alto: 140 }, [
      ['x³ − 4x² + x + 6 entre x − 2. Se escriben los coeficientes y el 2.', {}, '$c = 2$'],
      ['Primero baja el 1.', { n: 1 }, '$1$'],
      ['Por 2 y se suma: −4 + 2 = −2.', { n: 2 }, '$-2$'],
      ['Otra vez: por 2 y se suma.', { n: 3 }, '$1 + (-4) = -3$'],
      ['El último es el residuo: 0.', { n: 4 }, '$x^2 - 2x - 3$'],
    ], 'Si falta una potencia, se pone 0. El último es el residuo.'),
    xpFila('$x^3 + 2x^2 - 5x - 6$ entre $x - 2$ (coeficientes 1, 2, −5, −6). Completa la fila de abajo.', ['baja', '2.º', '3.º', 'residuo'], ['1', '4', '3', '0'], ['2', '−6', '−3'], 'Baja 1; 2 + 2; −5 + 8; −6 + 6.', '$x^2 + 4x + 3$, exacto.')],
    ['Hallar un coeficiente', xpMira('dibujo', 'Tercera idea: si x − c es factor, **P(c) = 0** da una ecuación.', { dib: (v, K) => P(K, v, ['P(x) = x³ + kx − 10', 'x − 2 es factor: P(2) = 0', '8 + 2k − 10 = 0', 'k = 1'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Falta la k, pero se sabe que x − 2 es factor.', { n: 2 }, '$P(2) = 0$'],
      ['Se cambia la x por 2.', { n: 3 }, '$8 + 2k - 10 = 0$'],
      ['Se despeja: k vale 1.', { n: 4 }, '$k = 1$'],
      ['Si el divisor es x + 3, se usa −3.', {}, '$x + 3 = x - (-3)$'],
    ], 'Factor $x - c$: pon c e iguala a 0.'),
    xpFila('$x + 1$ es factor de $x^3 + kx^2 + 4$. Pon $(-1)^3 + 4$ y k.', ['sin k', 'k'], ['3', '−3'], ['5', '−5', '1'], 'Se usa −1: −1 + k + 4 = 0.', '$k = -3$.')],
    ['Ahora sí, un problema', xpFila('Una caja tiene volumen $x^3 + 6x^2 + 11x + 6$ y altura $x + 1$. La base es $x^2 + \\square x + \\square$.', ['de x', 'número'], ['5', '6'], ['7', '4', '11'], 'Sintética con −1: 1, 6 − 1, 11 − 5.', '$x^2 + 5x + 6$.')],
  ], 'P(c) es el residuo: si da 0, hay factor.');

  // ---------------------------------------------------------------------------------------------------------- alg-93
  const cruz = (v, K) => { const p = XM.plano(K, -4, 4, -8, 8, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => v.k * (x + 2) * (x - 1) ** 2 * 0.8 * (1 - v.z) + v.z * (x + 2) * (x - 1) * (x - 3) * 0.5); };
  xpLec('alg-93', [
    ['Cruzar o rebotar', xpMira('dibujo', 'Empecemos por la idea: la **multiplicidad** dice cómo toca el eje.', { dib: cruz, v: { k: 1, z: 1 }, alto: 210 }, [
      ['Tres raíces distintas: cruza tres veces.', {}, '$(x + 2)(x - 1)(x - 3)$'],
      ['Si una se repite dos veces…', { z: 0 }, '$(x + 2)(x - 1)^2$'],
      ['…en esa la curva rebota: no cambia de signo.', {}, '$(x - 1)^2 \\ge 0$'],
      ['Multiplicidad impar cruza; par rebota.', {}, '$\\text{par: rebota}$'],
      ['El grado cuenta las raíces con sus repeticiones.', {}, '$1 + 2 = 3$'],
    ], 'Impar cruza, par rebota; las multiplicidades suman el grado.'),
    xpFila('$(x - 4)^3(x + 1)^2 x$: pon el grado y qué hace en cada raíz.', ['grado', 'en 4', 'en −1'], ['6', 'cruza', 'rebota'], ['5', 'nada'], 'Suma 3, 2 y 1. Mira si es par.', 'Grado 6; cruza en 4 y rebota en −1.')],
    ['Candidatos', xpMira('dibujo', 'Segunda idea: las raíces enteras **dividen** al término suelto.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -12, 12, { H: 200, gy: 4 }), f = x => x ** 3 - x * x - 4 * x + 4; return p.s + XM.curva(K, p, f) + [-2, 1, 2].map((r, i) => K.f(v.n - i, K.c(p.X(r), p.Y(0), 6, 'fF'))).join(''); }, v: { n: 0 }, alto: 210 }, [
      ['x³ − x² − 4x + 4: el término suelto es 4.', {}, '$\\pm1, \\pm2, \\pm4$'],
      ['Se prueban los divisores: −2 da cero.', { n: 1 }, '$P(-2) = 0$'],
      ['El número 1 también.', { n: 2 }, '$P(1) = 0$'],
      ['Y el 2. Son tres: no hay más.', { n: 3 }, '$(x + 2)(x - 1)(x - 2)$'],
      ['Si hay coeficiente principal, también fracciones.', {}, '$\\tfrac{\\text{divisor de } a_0}{\\text{divisor de } a_n}$'],
    ], 'Raíz racional: divisor del último sobre divisor del primero.'),
    xpFila('En $2x^2 + \\cdots + 3$ los candidatos positivos son 1, 3 y dos fracciones. Ponlas, la menor primero.', ['menor', 'mayor'], ['1/2', '3/2'], ['2/3', '1/3', '2'], 'Arriba, divisores de 3; abajo, de 2.', '$\\tfrac12$ y $\\tfrac32$.')],
    ['Completar las raíces', xpMira('dibujo', 'Tercera idea: hallada una raíz, se **baja de grado**.', { dib: (v, K) => P(K, v, ['x³ − 4x² + 6x − 4 = 0', 'x = 2 es raíz', '(x − 2)(x² − 2x + 2)', 'x = 1 ± i'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Se prueba el 2: da cero.', { n: 2 }, '$8 - 16 + 12 - 4 = 0$'],
      ['Con la sintética queda una cuadrática.', { n: 3 }, '$x^2 - 2x + 2$'],
      ['Su discriminante es negativo: raíces complejas.', { n: 4 }, '$4 - 8 = -4$'],
      ['Con coeficientes reales, van en pareja con su conjugada.', {}, '$1 + i, \\ 1 - i$'],
      ['Grado 3: tres raíces contando las complejas.', {}, '$1 + 2 = 3$'],
    ], 'Grado n: n raíces complejas; las no reales vienen en parejas.'),
    xpFila('Un cúbico real tiene raíces 5 y $3 + 2i$. Pon la otra y el producto de las dos complejas.', ['la otra', 'producto'], ['3 − 2i', '13'], ['−3 − 2i', '5', '−5'], 'La conjugada; y 9 + 4.', '$(3 + 2i)(3 - 2i) = 13$.')],
    ['Ahora sí, un problema', xpFila('Un puente sigue $y = x^3 - 6x^2 + 11x - 6$. Cruza el nivel 0 en tres enteros: ponlos en orden.', ['1.º', '2.º', '3.º'], ['1', '2', '3'], ['6', '−1', '4'], 'Prueba los divisores de 6.', '$(x - 1)(x - 2)(x - 3)$.')],
  ], 'Candidatos, sintética y bajar de grado hasta tener todas.');
}
