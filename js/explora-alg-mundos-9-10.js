// Álgebra · mundos 9 (Fracciones Algebraicas) y 10 (Crecimiento Exponencial), Explora. Ejemplos propios.
{
  const P = XM.pasos;
  // ---------------------------------------------------------------------------------------------------------- alg-25a
  const rio = (v, K) => { const p = XM.plano(K, -5, 5, -6, 6, { H: 200, g: 1, gy: 2 }); return p.s + K.l(p.X(v.q), 8, p.X(v.q), 192, 'lf d') + XM.curva(K, p, x => (Math.abs(x - v.q) < 0.06 ? NaN : 2 / (x - v.q))); };
  xpLec('alg-25a', [
    ['Lo que no se puede', xpMira('dibujo', 'Empecemos por la idea: una fracción **no existe** donde el denominador vale 0.', { dib: rio, v: { q: 1 }, alto: 210 }, [
      ['Dos entre x − 1. En 1, el denominador se anula.', {}, '$\\tfrac{2}{x - 1}, \\ x \\neq 1$'],
      ['Cerca de 1 el resultado crece sin parar.', {}, '$\\tfrac{2}{0.01} = 200$'],
      ['La recta punteada es una **asíntota**: la curva se acerca y no la toca.', {}, '$x = 1$'],
      ['Con x + 3, el prohibido es −3.', { q: -3 }, '$\\tfrac{2}{x + 3}, \\ x \\neq -3$'],
      ['El dominio son todos los demás.', {}, '$\\mathbb{R} - \\{-3\\}$'],
    ], 'Iguala a 0 el denominador: esos valores quedan fuera.'),
    xpFila('En $\\tfrac{x + 1}{x^2 - 2x - 8}$, pon los valores prohibidos, el menor primero.', ['menor', 'mayor'], ['−2', '4'], ['2', '−4', '−1'], 'Factoriza: dos que sumen −2 y multipliquen −8.', '$(x - 4)(x + 2) = 0$.')],
    ['Cancelar factores', xpMira('dibujo', 'Segunda idea: se cancelan **factores**, nunca términos.', { dib: (v, K) => P(K, v, ['(x² − 9) / (x² + 3x)', '(x + 3)(x − 3) / x(x + 3)', '(x − 3) / x'], 44, 40), v: { n: 1 }, alto: 150 }, [
      ['Parecen no tener nada en común.', {}, '$\\tfrac{x^2 - 9}{x^2 + 3x}$'],
      ['Factorizamos arriba y abajo.', { n: 2 }, '$\\tfrac{(x+3)(x-3)}{x(x+3)}$'],
      ['El factor x + 3 se repite: se cancela.', { n: 3 }, '$\\tfrac{x - 3}{x}$'],
      ['El −3 sigue prohibido: la original no existía ahí.', {}, '$x \\neq 0, \\ x \\neq -3$'],
      ['No se tacha la x de x − 3: no es factor.', {}, '$\\tfrac{x - 3}{x} \\neq -3$'],
    ], 'Factoriza primero; cancela factores; recuerda lo prohibido.'),
    xpFila('$\\tfrac{x^2 + 5x}{x^2 - 25}$: pon lo que queda arriba y abajo.', ['arriba', 'abajo'], ['x', 'x − 5'], ['x + 5', '5x', '−5'], 'Arriba x(x + 5); abajo, diferencia de cuadrados.', '$\\tfrac{x}{x - 5}$.')],
    ['Hueco o río', xpMira('dibujo', 'Tercera idea: si el factor se cancela queda un **hueco**; si no, un **río**.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -3, 5, { H: 190 }); return p.s + K.f(1 - v.r, XM.curva(K, p, x => x + 1) + K.c(p.X(1), p.Y(2), 6, 'fop') + K.c(p.X(1), p.Y(2), 6, 'fn')) + K.f(v.r, K.l(p.X(1), 8, p.X(1), 182, 'lf d') + XM.curva(K, p, x => (Math.abs(x - 1) < 0.06 ? NaN : 1 / (x - 1) + 1))); }, v: { r: 0 }, alto: 200 }, [
      ['x² − 1 entre x − 1 es la recta x + 1.', {}, '$\\tfrac{(x-1)(x+1)}{x-1}$'],
      ['Pero en 1 no existe: le falta un punto. Es un hueco.', {}, '$x \\neq 1$'],
      ['En x entre x − 1 nada se cancela.', { r: 1 }, '$\\tfrac{x}{x - 1}$'],
      ['Ahí hay un río: la curva se parte en dos orillas.', {}, '$x = 1$'],
    ], 'Factor cancelado: hueco. Factor que queda abajo: asíntota.'),
    xpFila('$\\tfrac{(x - 2)(x + 4)}{(x - 2)(x - 5)}$: di qué hay en cada prohibido.', ['en 2', 'en 5'], ['hueco', 'río'], ['nada'], '¿Cuál factor se cancela?', 'El de 2 se cancela; el de 5 queda abajo.')],
    ['Ahora sí, un problema', xpMueve('Un sensor falla donde su fórmula, $\\tfrac{2}{x + 2}$, no existe. Mueve el río de $\\tfrac{2}{x - q}$ hasta ese valor.', 270, { q: 1 }, [xpRegla('q', -4, 4, 'valor prohibido')], { q: -2 }, rio, '$x + 2 = 0$ en $x = -2$.', { lee: v => `$x \\neq ${v.q}$` })],
  ], 'Factoriza, mira lo prohibido y cancela solo factores.');

  // ---------------------------------------------------------------------------------------------------------- alg-25b
  xpLec('alg-25b', [
    ['El mismo denominador', xpMira('dibujo', 'Empecemos por la idea: para sumar, las partes deben ser **del mismo tamaño**.', { dib: (v, K) => P(K, v, ['2/x + 3/(x + 1)', '2(x+1)/x(x+1) + 3x/x(x+1)', '(2x + 2 + 3x) / x(x+1)', '(5x + 2) / x(x+1)'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Los denominadores son x y x + 1: distintos.', {}, '$\\text{común: } x(x+1)$'],
      ['A cada fracción se le multiplica lo que le falta, arriba y abajo.', { n: 2 }, '$\\tfrac{x+1}{x+1} = 1$'],
      ['Se suman los de arriba.', { n: 3 }, '$2x + 2 + 3x$'],
      ['El de abajo no se suma: es el tamaño.', { n: 4 }, '$\\tfrac{5x + 2}{x(x+1)}$'],
    ], 'Común denominador: lo que le falta a cada una, arriba y abajo.'),
    xpFila('$\\tfrac{4}{x} + \\tfrac{1}{x + 2}$ sobre $x(x + 2)$: arriba queda $\\square x + \\square$.', ['de x', 'número'], ['5', '8'], ['4', '6', '2'], '4(x + 2) + x.', '$5x + 8$.')],
    ['Restar con cuidado', xpMira('dibujo', 'Segunda idea: la raya es un **paréntesis**: el menos entra a todo.', { dib: (v, K) => P(K, v, ['5x/(x−1) − (2x + 3)/(x−1)', '(5x − (2x + 3)) / (x−1)', '(5x − 2x − 3) / (x−1)', '3(x − 1)/(x−1) = 3'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Mismo denominador: se restan los de arriba.', { n: 2 }, '$5x - (2x + 3)$'],
      ['El menos cambia el 2x y también el 3.', { n: 3 }, '$5x - 2x - 3$'],
      ['Queda 3x − 3, que es 3 por x − 1.', { n: 4 }, '$3(x - 1)$'],
      ['Se cancela y da 3, para x distinto de 1.', {}, '$3$'],
    ], 'Pon paréntesis al numerador que se resta.'),
    xpFila('$\\tfrac{7x + 2}{x + 4} - \\tfrac{3x - 5}{x + 4}$: arriba queda $\\square x + \\square$.', ['de x', 'número'], ['4', '7'], ['−3', '10', '3'], '2 menos −5.', '$4x + 7$.')],
    ['Multiplicar y dividir', xpMira('dibujo', 'Tercera idea: multiplicar es **de frente**; dividir, por la volteada.', { dib: (v, K) => P(K, v, ['x/6 ÷ x²/9', 'x/6 · 9/x²', '9x / 6x²', '3 / 2x'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Dividir entre una fracción es multiplicar por su recíproca.', { n: 2 }, '$\\tfrac{x}{6} \\cdot \\tfrac{9}{x^2}$'],
      ['De frente: arriba con arriba, abajo con abajo.', { n: 3 }, '$\\tfrac{9x}{6x^2}$'],
      ['Se cancelan 3 y x.', { n: 4 }, '$\\tfrac{3}{2x}$'],
      ['Mejor cancelar antes de multiplicar.', {}, '$\\tfrac{x}{6} \\cdot \\tfrac{9}{x \\cdot x}$'],
    ], 'Voltea la segunda y cancela antes de multiplicar.'),
    xpFila('$\\tfrac{x^2}{10} \\div \\tfrac{x}{15}$: pon el resultado simplificado.', ['arriba', 'abajo'], ['3x', '2'], ['x', '5', '150'], '$\\tfrac{x^2}{10} \\cdot \\tfrac{15}{x}$.', '$\\tfrac{3x}{2}$.')],
    ['Ahora sí, un problema', xpFila('Una bomba llena en x horas y otra en $x + 5$. Juntas, en una hora: $\\tfrac1x + \\tfrac{1}{x+5}$. Arriba queda $\\square x + \\square$.', ['de x', 'número'], ['2', '5'], ['1', '10', '6'], 'x + 5 más x.', '$\\tfrac{2x + 5}{x(x + 5)}$.')],
  ], 'Mismo tamaño para sumar; de frente para multiplicar.');

  // ---------------------------------------------------------------------------------------------------------- alg-101
  const dos = (v, K) => { const p = XM.plano(K, -1, 7, -1, 7, { H: 200 }); return p.s + XM.curva(K, p, x => v.m * x + v.b) + XM.curva(K, p, x => 6 - x, 'lf gr') + (v.px != null ? K.c(p.X(v.px), p.Y(v.py), 6, 'fA') : ''); };
  xpLec('alg-101', [
    ['Cumplir las dos', xpMira('dibujo', 'Empecemos por la idea: la solución es el punto que está **en las dos rectas**.', { dib: dos, v: { m: 1, b: 2, px: 5, py: 1 }, alto: 210 }, [
      ['La roja: los pares que suman 6.', {}, '$x + y = 6$'],
      ['El punto (5, 1) suma 6, pero no está en la otra.', {}, '$5 + 1 = 6$'],
      ['En el cruce se cumplen las dos.', { px: 2, py: 4 }, '$(2, 4)$'],
      ['Se comprueba en ambas ecuaciones.', {}, '$y = x + 2: \\ 4 = 2 + 2$'],
      ['Paralelas: ninguna. La misma recta: infinitas.', { m: -1, b: 3, px: null, py: null }, '$0 = 3 \\ \\text{no}$'],
    ], 'Una solución de un sistema cumple todas las ecuaciones.'),
    xpMueve('La roja es $x + y = 6$ y la otra, $y = x - 2$. Lleva el punto al cruce.', 300, { m: 1, b: -2, px: 1, py: 1 }, [xpRegla('px', 0, 6, 'x'), xpRegla('py', 0, 6, 'y')], { px: 4, py: 2 }, dos, '$4 + 2 = 6$ y $2 = 4 - 2$.', { lee: v => `$(${v.px}, ${v.py})$` })],
    ['Eliminar', xpMira('dibujo', 'Segunda idea: sumando las ecuaciones se **elimina** una letra.', { dib: (v, K) => P(K, v, ['3x + 2y = 16', '5x − 2y = 8', '8x = 24', 'x = 3,  y = 3.5'], 34, 34), v: { n: 2 }, alto: 160 }, [
      ['Los de y son opuestos: 2y y −2y.', {}, '$2y - 2y = 0$'],
      ['Se suman las dos ecuaciones.', { n: 3 }, '$8x = 24$'],
      ['x vale 3; se pone en cualquiera y sale y.', { n: 4 }, '$9 + 2y = 16$'],
      ['Si no son opuestos, se multiplica antes una ecuación entera.', {}, '$-2 \\cdot (\\ldots)$'],
    ], 'Haz opuestos los coeficientes de una letra y suma.'),
    xpFila('$2x + y = 11$ y $x - y = 1$. Pon 3x, x, y.', ['3x =', 'x', 'y'], ['12', '4', '3'], ['10', '5', '2'], 'Suma: la y se va.', '$3x = 12$; $4 - y = 1$.')],
    ['Sustituir', xpMira('dibujo', 'Tercera idea: si una letra ya está despejada, se **reemplaza** en la otra.', { dib: (v, K) => P(K, v, ['y = 2x − 1', '3x + y = 14', '3x + (2x − 1) = 14', 'x = 3,  y = 5'], 34, 34), v: { n: 2 }, alto: 160 }, [
      ['La primera dice cuánto vale y.', {}, '$y = 2x - 1$'],
      ['Se pone ese paquete en la segunda, con paréntesis.', { n: 3 }, '$3x + (2x - 1) = 14$'],
      ['Ahora hay una sola letra.', {}, '$5x = 15$'],
      ['x es 3 y, al volver, y es 5.', { n: 4 }, '$y = 2 \\cdot 3 - 1$'],
    ], 'Reemplaza el paquete completo y vuelve por la otra letra.'),
    xpFila('$x = y + 3$ y $2x + y = 18$. Pon 3y, y, x.', ['3y =', 'y', 'x'], ['12', '4', '7'], ['15', '5', '21'], '$2(y + 3) + y = 18$.', '$3y = 12$.')],
    ['Ahora sí, un problema', xpFila('3 jugos y 2 tortas valen 25 mil; 1 jugo y 2 tortas, 15 mil. Pon cada precio (miles).', ['jugo', 'torta'], ['5', '5'], ['10', '4', '7.5'], 'Resta las dos compras.', '2 jugos valen 10; luego $2t = 10$.')],
  ], 'El cruce: se halla eliminando o sustituyendo.');

  // ---------------------------------------------------------------------------------------------------------- alg-102
  const cor = (v, K) => { const p = XM.plano(K, -4, 4, -2, 10, { H: 200, gy: 2 }), d = Math.max(0, v.b + 1 / 4); return p.s + XM.curva(K, p, x => x * x) + XM.curva(K, p, x => x + v.b, 'lf gr') + (v.b > -0.25 ? [1, -1].map(s => { const x = 0.5 + s * Math.sqrt(d); return K.c(p.X(x), p.Y(x * x), 6, 'fA'); }).join('') : ''); };
  xpLec('alg-102', [
    ['Curvas que se cruzan', xpMira('dibujo', 'Empecemos por la idea: una recta y una parábola se cruzan **0, 1 o 2 veces**.', { dib: cor, v: { b: 2 }, alto: 210 }, [
      ['y = x² con y = x + 2: dos cruces.', {}, '$x^2 = x + 2$'],
      ['Se iguala y sale una cuadrática.', {}, '$x^2 - x - 2 = 0$'],
      ['x es 2 o −1: los puntos (2, 4) y (−1, 1).', {}, '$(x - 2)(x + 1) = 0$'],
      ['Si la recta baja, los cruces se juntan y desaparecen.', { b: -1.5 }, '$\\text{discriminante} < 0$'],
    ], 'Iguala, resuelve y vuelve por la otra coordenada.'),
    xpMueve('Sube la recta $y = x + b$ hasta que uno de los cruces sea el punto $(-2, 4)$.', 270, { b: 0 }, [xpRegla('b', -1, 6, 'b')], { b: 6 }, cor, '$4 = -2 + 6$; el otro cruce es $(3, 9)$.', { lee: v => `$y = x + ${v.b}$` })],
    ['Desarmar una fracción', xpMira('dibujo', 'Segunda idea: una fracción grande es **suma de fracciones simples**.', { dib: (v, K) => P(K, v, ['(5x + 1) / (x − 1)(x + 2)', 'A/(x − 1) + B/(x + 2)', '5x + 1 = A(x + 2) + B(x − 1)', 'x = 1: 6 = 3A → A = 2', 'x = −2: −9 = −3B → B = 3'], 28, 30, ''), v: { n: 1 }, alto: 170 }, [
      ['Dos factores abajo: dos fracciones simples.', { n: 2 }, '$\\tfrac{A}{x-1} + \\tfrac{B}{x+2}$'],
      ['Después se quitan denominadores.', { n: 3 }, '$5x + 1 = A(x+2) + B(x-1)$'],
      ['Con x = 1 se apaga B y queda A.', { n: 4 }, '$A = 2$'],
      ['Con x = −2 se apaga A y queda B.', { n: 5 }, '$B = 3$'],
      ['Al sumarlas vuelve la original.', {}, '$\\tfrac{2}{x-1} + \\tfrac{3}{x+2}$'],
    ], 'Escoge x que apague una letra y halla la otra.'),
    xpFila('$\\tfrac{7x - 2}{x(x - 1)} = \\tfrac{A}{x} + \\tfrac{B}{x - 1}$. Pon A y B.', ['A', 'B'], ['2', '5'], ['−2', '7', '3'], 'Con x = 0: −2 = −A. Con x = 1: 5 = B.', '$\\tfrac2x + \\tfrac{5}{x-1}$.')],
    ['Cuando se repite', xpMira('dibujo', 'Tercera idea: un factor **repetido** pide una fracción por cada potencia.', { dib: (v, K) => P(K, v, ['(3x + 1) / (x − 2)²', 'A/(x − 2) + B/(x − 2)²', '3x + 1 = A(x − 2) + B', 'x = 2: B = 7;  A = 3'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['El factor x − 2 está al cuadrado.', { n: 2 }, '$\\tfrac{A}{x-2} + \\tfrac{B}{(x-2)^2}$'],
      ['Después se quitan denominadores.', { n: 3 }, '$3x + 1 = A(x-2) + B$'],
      ['En 2 queda B: siete.', { n: 4 }, '$B = 7$'],
      ['Y comparando los de x, A es 3.', {}, '$A = 3$'],
      ['Un cuadrático que no se factoriza lleva Bx + C.', {}, '$\\tfrac{Bx + C}{x^2 + 1}$'],
    ], 'Repetido: una por potencia. Cuadrático irreducible: $Bx + C$.'),
    xpFila('$\\tfrac{4x + 9}{(x + 1)^2} = \\tfrac{A}{x+1} + \\tfrac{B}{(x+1)^2}$. Pon A y B.', ['A', 'B'], ['4', '5'], ['9', '13', '−4'], 'Los de x dan A; en x = −1 queda B.', '$4(x + 1) + 5$.')],
    ['Ahora sí, un problema', xpFila('Dos números suman 11 y sus cuadrados, 73. Ponlos, el menor primero.', ['menor', 'mayor'], ['3', '8'], ['5', '6', '4'], '$x^2 + (11 - x)^2 = 73$.', '$9 + 64 = 73$.')],
  ], 'Iguala para cruzar; apaga letras para desarmar.');

  // ---------------------------------------------------------------------------------------------------------- alg-71
  const ex = (v, K) => { const p = XM.plano(K, -4, 4, -1, 9, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => v.a * v.b ** x + v.k) + K.l(18, p.Y(v.k), 322, p.Y(v.k), 'lf d') + K.c(p.X(0), p.Y(v.a + v.k), 6, 'fA'); };
  xpLec('alg-71', [
    ['Multiplicar cada paso', xpMira('dibujo', 'Empecemos por la idea: en la exponencial cada paso **multiplica** por lo mismo.', { dib: ex, v: { a: 1, b: 2, k: 0 }, alto: 210 }, [
      ['Dos a la x: 1, 2, 4, 8… cada paso duplica.', {}, '$y = 2^x$'],
      ['Hacia la izquierda se parte a la mitad, sin llegar a 0.', {}, '$2^{-3} = \\tfrac18$'],
      ['En x = 0 siempre vale 1.', {}, '$b^0 = 1$'],
      ['Con base menor que 1, baja.', { b: 0.5 }, '$y = (\\tfrac12)^x$'],
      ['La base es positiva y distinta de 1.', {}, '$b > 0, \\ b \\neq 1$'],
    ], '$y = b^x$: crece si $b > 1$ y decrece si $0 < b < 1$.'),
    xpMueve('La curva $y = a \\cdot 2^x$ corta el eje y en **3**. Mueve a.', 270, { a: 1, b: 2, k: 0 }, [xpRegla('a', 1, 5, 'a')], { a: 3 }, ex, 'En 0 vale $a \\cdot 1 = 3$.', { lee: v => `$${v.a} \\cdot 2^0 = ${v.a}$` })],
    ['El piso', xpMira('dibujo', 'Segunda idea: la **asíntota** es el piso al que se acerca.', { dib: ex, v: { a: 1, b: 2, k: 0 }, alto: 210 }, [
      ['Sin sumar nada, el piso es 0.', {}, '$y = 0$'],
      ['Si se suma 3, todo sube: el piso también.', { k: 3 }, '$y = 2^x + 3$'],
      ['Un café se enfría hacia la temperatura del cuarto: ese es su piso.', { a: 5, b: 0.6, k: 2 }, '$y = 5 \\cdot 0.6^x + 2$'],
      ['Se acerca siempre y no lo cruza.', {}, '$y > 2$'],
    ], '$y = a \\cdot b^x + k$: asíntota $y = k$.'),
    xpMueve('Mueve k hasta que el piso sea **4** y mira por dónde corta el eje.', 270, { a: 1, b: 2, k: 0 }, [xpRegla('k', 0, 5, 'k')], { k: 4 }, ex, '$y = 2^x + 4$ corta en 5.', { lee: v => `$y = 2^x + ${v.k}$` })],
    ['El número e', xpMira('dibujo', 'Tercera idea: si el crecimiento se reparte en **muchos pedacitos**, aparece e.', { dib: (v, K) => [2, 2.25, 2.44, 2.61, 2.71].map((x, i) => K.f(v.n - i, K.r(30 + i * 58, 150 - x * 40, 46, x * 40, 'fa') + K.t(53 + i * 58, 142 - x * 40, x, 's') + K.t(53 + i * 58, 168, ['1', '2', '4', '12', '365'][i], 's tm'))).join(''), v: { n: 0 }, alto: 180 }, [
      ['Un peso al 100 % anual, pagado una vez: queda 2.', { n: 1 }, '$(1 + 1)^1$'],
      ['En dos mitades: 1.5 por 1.5.', { n: 2 }, '$(1 + \\tfrac12)^2 = 2.25$'],
      ['En doce meses sube a 2.61.', { n: 4 }, '$(1 + \\tfrac{1}{12})^{12}$'],
      ['Con 365 días, 2.71. Y ya casi no sube más.', { n: 5 }, '$e \\approx 2.718$'],
    ], '$(1 + \\tfrac1n)^n$ se acerca a $e \\approx 2.718$.'),
    xpFila('Pon los valores de $y = 3 \\cdot 2^x$.', ['x = 0', 'x = 2', 'x = −1'], ['3', '12', '1.5'], ['36', '0', '6'], 'Primero la potencia, luego por 3.', '$3$, $3 \\cdot 4$ y $3 \\div 2$.')],
    ['Ahora sí, un problema', xpFila('Un cultivo de 50 células se triplica cada día. Pon las que hay el día 1 y el día 3.', ['día 1', 'día 3'], ['150', '1350'], ['450', '600', '200'], '$50 \\cdot 3^x$.', '$50 \\cdot 27 = 1350$.')],
  ], 'Cada paso multiplica; k es el piso.');

  // ---------------------------------------------------------------------------------------------------------- alg-13b
  const ahorro = (v, K) => Array.from({ length: Math.round(v.n) + 1 }, (_, i) => { const s = 100 + v.r * i, c = 100 * (1 + v.r / 100) ** i, u = 0.5; return K.r(20 + i * 52, 170 - s * u, 20, s * u, 'fa') + K.f(v.c, K.r(42 + i * 52, 170 - c * u, 20, c * u, 'fg')); }).join('');
  xpLec('alg-13b', [
    ['Interés simple', xpMira('dibujo', 'Empecemos por la idea: en el **simple** se gana siempre sobre lo mismo.', { dib: ahorro, v: { n: 0, r: 20, c: 0 }, alto: 180 }, [
      ['Se guardan 100 al 20 % anual simple.', {}, '$C = 100$'],
      ['Cada año se ganan 20, siempre sobre los 100.', { n: 2 }, '$I = C \\cdot i \\cdot t$'],
      ['A los 5 años se han ganado 100.', { n: 5 }, '$100 \\cdot 0.2 \\cdot 5 = 100$'],
      ['Crece en línea recta, como una escalera.', {}, '$M = C(1 + it)$'],
    ], 'Simple: $M = C(1 + it)$.'),
    xpFila('300 mil al 4 % anual simple, 5 años. Pon lo que gana por año, en total y el monto (miles).', ['por año', 'en total', 'monto'], ['12', '60', '360'], ['20', '320', '1200'], 'El 4 % de 300.', '$12 \\cdot 5 = 60$.')],
    ['Interés compuesto', xpMira('dibujo', 'Segunda idea: en el **compuesto** también ganan los intereses.', { dib: ahorro, v: { n: 1, r: 20, c: 1 }, alto: 180 }, [
      ['El primer año son iguales.', {}, '$100 \\cdot 1.2 = 120$'],
      ['El segundo, el 20 % se toma de 120: ya gana más.', { n: 2 }, '$120 \\cdot 1.2 = 144$'],
      ['Cada año multiplica por 1.2.', { n: 5 }, '$100 \\cdot 1.2^5 \\approx 249$'],
      ['Crece como una exponencial.', {}, '$M = C(1 + i)^t$'],
    ], 'Compuesto: $M = C(1 + i)^t$.'),
    xpFila('500 mil al 10 % anual compuesto. Pon el monto tras 1 y tras 2 años (miles).', ['1 año', '2 años'], ['550', '605'], ['600', '510', '1000'], 'El segundo 10 % es de 550.', '$550 \\cdot 1.1 = 605$.')],
    ['La tasa del período', xpMira('dibujo', 'Tercera idea: si capitaliza cada mes, la tasa **se reparte** y los períodos se multiplican.', { dib: (v, K) => P(K, v, ['12 % anual, cada mes', '1 % por mes', '2 años = 24 meses', 'M = C · 1.01²⁴'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Nominal 12 % anual, capitaliza mensual.', {}, '$j = 12\\,\\%, \\ m = 12$'],
      ['Cada mes paga la doceava parte: 1 %.', { n: 2 }, '$\\tfrac{12\\,\\%}{12}$'],
      ['En dos años hay 24 períodos.', { n: 3 }, '$2 \\cdot 12 = 24$'],
      ['Y se multiplica 24 veces.', { n: 4 }, '$M = C(1 + \\tfrac{j}{m})^{mt}$'],
    ], 'Tasa por período y número de períodos.'),
    xpFila('8 % anual, capitaliza **trimestral**, 3 años. Pon la tasa del trimestre y los períodos.', ['tasa', 'períodos'], ['2 %', '12'], ['4 %', '3', '24 %'], 'Cuatro trimestres por año.', '$8 \\div 4$ y $4 \\cdot 3$.')],
    ['Ahora sí, un problema', xpFila('1000 (miles) al 10 % compuesto 2 años, o al 11 % simple 2 años. Pon los dos montos y el mejor.', ['compuesto', 'simple', 'mejor'], ['1210', '1220', 'simple'], ['compuesto', '1200', '1110'], '1000 · 1.21; 1000 + 220.', 'En solo dos años gana el simple.')],
  ], 'Simple suma; compuesto multiplica.');

  // ---------------------------------------------------------------------------------------------------------- alg-72
  const lg = (v, K) => { const p = XM.plano(K, -3, 9, -3, 4, { H: 200 }); return p.s + K.f(v.e, XM.curva(K, p, x => 2 ** x, 'lg gr') + XM.curva(K, p, x => x, 'lm d')) + XM.curva(K, p, x => (x > 0.02 ? Math.log2(x) : NaN)) + (v.x > 0 ? K.c(p.X(v.x), p.Y(Math.log2(v.x)), 6, 'fF') : ''); };
  xpLec('alg-72', [
    ['La pregunta del exponente', xpMira('dibujo', 'Empecemos por la idea: el logaritmo pregunta **¿a qué exponente?**', { dib: lg, v: { e: 0, x: 1 }, alto: 210 }, [
      ['¿A qué exponente va el 2 para dar 8? A 3.', { x: 8 }, '$\\log_2 8 = 3$'],
      ['Para dar 4, a 2. Para dar 1, a 0.', { x: 1 }, '$\\log_2 1 = 0$'],
      ['Para dar un medio, a −1.', { x: 0.5 }, '$\\log_2 \\tfrac12 = -1$'],
      ['De 0 o de negativos no hay: ninguna potencia de 2 los da.', {}, '$x > 0$'],
      ['Es el espejo de la exponencial.', { e: 1 }, '$\\log_b x = y \\Leftrightarrow b^y = x$'],
    ], '$\\log_b x = y$ significa $b^y = x$, con $x > 0$.'),
    xpFila('Pon cada logaritmo.', ['log₃ 81', 'log₅ 1/25', 'log₁₀ 1000'], ['4', '−2', '3'], ['27', '2', '100'], '¿A qué exponente?', '$3^4$, $5^{-2}$ y $10^3$.')],
    ['Cuentas con exponentes', xpMira('dibujo', 'Segunda idea: los logaritmos **suman** donde había producto.', { dib: (v, K) => XM.barra(K, 30, [[2, 'log₂ 4 = 2', 'fa'], [3, 'log₂ 8 = 3', 'fg']], { T: 6 }) + K.f(v.n, XM.barra(K, 80, [[5, 'log₂ 32 = 5', 'ff']], { T: 6 })) + K.t(170, 140, v.p, 'ta'), v: { n: 0, p: '' }, alto: 160 }, [
      ['4 por 8 es 32. Sus exponentes: 2 y 3.', {}, '$4 \\cdot 8 = 2^2 \\cdot 2^3$'],
      ['El del producto es la suma: 5.', { n: 1 }, '$\\log (xy) = \\log x + \\log y$'],
      ['El del cociente, la resta.', { p: 'log x/y = log x − log y' }, '$\\log \\tfrac{x}{y}$'],
      ['Y el exponente baja a multiplicar.', { p: 'log xⁿ = n log x' }, '$\\log x^n = n \\log x$'],
      ['La suma no se reparte.', {}, '$\\log(x + y) \\neq \\log x + \\log y$'],
    ], 'Producto: suma. Cociente: resta. Potencia: multiplica.'),
    xpFila('Si $\\log 2 = a$ y $\\log 3 = b$, pon cada uno.', ['log 6', 'log 8', 'log 3/2'], ['a + b', '3a', 'b − a'], ['ab', 'a³', 'a − b'], '6 = 2 · 3; 8 = 2³.', 'Suma, múltiplo y resta.')],
    ['Cambiar de base', xpMira('dibujo', 'Tercera idea: con una sola base se calculan **todas**.', { dib: (v, K) => P(K, v, ['y = log₈ 32', '8ʸ = 32', '2³ʸ = 2⁵', 'y = 5/3'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['¿8 a la qué da 32? No es entero.', { n: 2 }, '$8^y = 32$'],
      ['Los dos son potencias de 2.', { n: 3 }, '$2^{3y} = 2^5$'],
      ['La respuesta es cinco tercios.', { n: 4 }, '$y = \\tfrac53$'],
      ['Es un cociente de logaritmos en base 2.', {}, '$\\log_8 32 = \\tfrac{\\log_2 32}{\\log_2 8}$'],
    ], '$\\log_b x = \\tfrac{\\log_c x}{\\log_c b}$.'),
    xpFila('$\\log_{9} 27$ en base 3: pon arriba, abajo y el resultado.', ['log₃ 27', 'log₃ 9', 'resultado'], ['3', '2', '3/2'], ['2/3', '9', '1/3'], '¿A qué exponente va el 3?', '$\\tfrac32$.')],
    ['Ahora sí, un problema', xpFila('En una escala, $L = \\log_{10} I$. Pon L para $I = 10^4$ y cuántas veces crece I si L sube 2.', ['L', 'veces'], ['4', '100'], ['40', '2', '20'], 'Cada unidad de L es por 10.', '$10^2 = 100$ veces.')],
  ], 'El logaritmo es un exponente: por eso suma.');

  // ---------------------------------------------------------------------------------------------------------- alg-73
  xpLec('alg-73', [
    ['La misma base', xpMira('dibujo', 'Empecemos por la idea: con la misma base, los **exponentes** son iguales.', { dib: (v, K) => P(K, v, ['4ˣ⁺¹ = 32', '2²ˣ⁺² = 2⁵', '2x + 2 = 5', 'x = 1.5'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['4 y 32 son potencias de 2.', {}, '$4 = 2^2, \\ 32 = 2^5$'],
      ['Se escriben en esa base.', { n: 2 }, '$2^{2(x+1)} = 2^5$'],
      ['Base igual: exponentes iguales.', { n: 3 }, '$2x + 2 = 5$'],
      ['Y se despeja la x.', { n: 4 }, '$x = \\tfrac32$'],
    ], 'Misma base: iguala exponentes.'),
    xpFila('$9^{x} = 27$: pon el exponente de 3 a cada lado y x.', ['izquierda', 'derecha', 'x'], ['2x', '3', '3/2'], ['x²', '9', '3'], '9 es 3² y 27 es 3³.', '$2x = 3$.')],
    ['Bajar con logaritmo', xpMira('dibujo', 'Segunda idea: si no hay base común, el **logaritmo baja** el exponente.', { dib: (v, K) => P(K, v, ['3ˣ = 20', 'x · log 3 = log 20', 'x = log 20 / log 3', 'x ≈ 2.73'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['20 no es potencia de 3: está entre 9 y 27.', {}, '$2 < x < 3$'],
      ['Logaritmo a los dos lados.', { n: 2 }, '$x \\log 3 = \\log 20$'],
      ['Se divide: es un cociente de logaritmos.', { n: 3 }, '$x = \\tfrac{\\log 20}{\\log 3}$'],
      ['No es el logaritmo del cociente.', { n: 4 }, '$\\tfrac{\\log 20}{\\log 3} \\neq \\log\\tfrac{20}{3}$'],
    ], '$b^x = c \\Rightarrow x = \\tfrac{\\log c}{\\log b}$.'),
    xpFila('$5^x = 60$: ¿entre qué enteros está x? Ponlos.', ['más que', 'menos que'], ['2', '3'], ['12', '4', '1'], '$5^2 = 25$ y $5^3 = 125$.', '$25 < 60 < 125$.')],
    ['Ecuaciones con logaritmo', xpMira('dibujo', 'Tercera idea: se **junta en un solo logaritmo** y se sube al exponente; luego se revisa.', { dib: (v, K) => P(K, v, ['log₂ x + log₂ (x − 2) = 3', 'log₂ x(x − 2) = 3', 'x² − 2x = 8', 'x = 4  (−2 no sirve)'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Suma de logaritmos: producto adentro.', { n: 2 }, '$\\log_2 x(x - 2) = 3$'],
      ['Se sube: 2 al cubo.', { n: 3 }, '$x(x - 2) = 2^3$'],
      ['De ahí salen 4 y −2.', {}, '$(x - 4)(x + 2) = 0$'],
      ['El −2 no sirve: no hay logaritmo de un negativo.', { n: 4 }, '$x > 2$'],
    ], 'Junta, sube y descarta lo que no exista.'),
    xpFila('$\\log_3 (x + 6) = 2$: pon a cuánto es igual $x + 6$ y x.', ['x + 6 =', 'x'], ['9', '3'], ['6', '8', '0'], '3 al cuadrado.', '$x = 9 - 6$.')],
    ['Ahora sí, un problema', xpFila('Un medicamento se reduce a la mitad cada 6 horas. De 80 mg, ¿cuántas mitades hasta 10 mg y cuántas horas?', ['mitades', 'horas'], ['3', '18'], ['8', '6', '24'], '80, 40, 20, 10.', '$80 \\cdot (\\tfrac12)^3 = 10$.')],
  ], 'Misma base, bajar con logaritmo o subir al exponente.');
}
