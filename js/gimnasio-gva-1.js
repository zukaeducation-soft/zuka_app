// Gimnasio de Geometría Vectorial y Analítica, mundo 1 «Álgebra Matricial» (spec 2026-11-27-curso-geometria-vectorial): dos retos
// de Fuerza y dos de Élite, con los juegos de escena de js/games/gva-escena-1.js a -4.js y datos nuevos. Va después de gimnasio.js.
{
  // Un paso: [título, entrenador, juego, enunciado, datos, explicación, [ayuda, ayuda], nota].
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-gva-${id}`, after, level,
    title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });

  // ------------------------------------------------------------------------------------------- Fuerza
  reto('sistemas-1', ['geo-1'], 2, 'Los dos fertilizantes', 'Dibuja y luego elimina',
    'Cada paquete del fertilizante 1 lleva 3 kg del compuesto A y 1 kg del B; cada paquete del 2, 2 kg de A y 4 kg de B. Hay 24 kg de A y 18 kg de B, y se quiere gastar todo. ¿Cuántos paquetes de cada uno?', [
      ['El cruce de las condiciones', 'Cada compuesto da una recta: los puntos que lo gastan justo. Busca el que está en las dos.', 'cruce-de-rectas',
        'Con $x$ paquetes del fertilizante 1 e $y$ del 2 se gastan $3x + 2y$ kg de A y $x + 4y$ kg de B. Hay **24** kg de A y **18** de B. Arrastra el punto a la **solución**.',
        { E: [[3, 2, 24], [1, 4, 18]], et: ['compuesto A', 'compuesto B'], sol: [6, 3], ini: [1, 1],
          mira: ['Ese punto gasta justo el compuesto A, pero no el B: síguelo por la recta de A.', 'Ese punto gasta justo el compuesto B, pero no el A: síguelo por la recta de B.', 'Ese punto no gasta justo ninguno de los dos: llévalo a una recta y recórrela.'],
          ok: 'El cruce gasta todo a la vez: 6 paquetes del fertilizante 1 y 3 del 2.' },
        'El cruce es $(6, 3)$: $3 \\cdot 6 + 2 \\cdot 3 = 24$ kg de A y $6 + 4 \\cdot 3 = 18$ kg de B. Cumple las dos ecuaciones a la vez.',
        ['Un punto sobre una sola recta gasta justo un solo compuesto. El que sirve está en las dos rectas.', 'Recorre la recta de B y mira en cuál de sus puntos la de A da 24.'], 'el punto común (6, 3)'],
      ['La cuenta que lo confirma', 'Ahora sin dibujo: un múltiplo de una ecuación borra la x de la otra.', 'multiplo-elimina',
        'El mismo sistema: $3x + 2y = 24$ ($E_1$) y $x + 4y = 18$ ($E_2$). Elige el múltiplo $k$ de $E_2$ que, sumado a $E_1$, hace **desaparecer la x**.',
        { E: [[3, 2, 24], [1, 4, 18]], s: 1, elim: 'x', P: [6, 3], k0: 0, mira: 'La x todavía no desaparece: el múltiplo tiene que cancelar su coeficiente.',
          trampa: 'Así desapareció la y, no la x.', ok: 'Sin la x queda $-10y = -30$: la recta nueva es horizontal, $y = 3$, y pasa por el mismo punto.' },
        'Con $k = -3$: $3x + 2y - 3(x + 4y) = 24 - 54$, es decir $-10y = -30$ e $y = 3$; en $E_2$, $x = 18 - 12 = 6$.',
        ['La x tiene 3 en $E_1$ y 1 en $E_2$. ¿Cuántas veces $E_2$ cancelan esos 3?', 'El múltiplo es negativo: hay que restar tres veces $E_2$.'], 'k = −3 deja −10y = −30'],
    ], '6 paquetes del fertilizante 1 y 3 del fertilizante 2.', 'Cada condición es una recta; el cruce es la solución, y la eliminación lo confirma sin dibujar.');

  reto('matrices-1', ['geo-2'], 2, 'El pedido de la carpintería', 'Primero las tallas, después las casillas',
    'Dos tiendas piden mesas y sillas (matriz P), cada mueble gasta madera y horas de trabajo (matriz Q) y cada recurso tiene un costo (matriz C). ¿Qué producto tiene sentido y qué gasta cada tienda?', [
      ['Qué se puede multiplicar', 'Dos matrices encajan si las columnas de la primera son tantas como las filas de la segunda.', 'domino-dimensiones',
        'P es $2 \\times 3$ (tiendas por muebles), Q es $3 \\times 2$ (muebles por recursos) y C es $2 \\times 1$ (costo por recurso). Ponlas en el **único orden** en que el producto existe y di su tamaño.',
        { piezas: [['Q', 3, 2], ['P', 2, 3], ['C', 2, 1]], orden: [1, 0, 2], extra: ['3×3', '2×2'] },
        '$P$ $(2 \\times 3)$ por $Q$ $(3 \\times 2)$ da $2 \\times 2$, y por $C$ $(2 \\times 1)$ da $2 \\times 1$: el costo total de cada tienda. Ningún otro orden encaja.',
        ['Mira las medidas de adentro: deben coincidir en cada unión.', 'Empieza por la matriz cuyas filas son las tiendas: el resultado es por tienda.'], 'P·Q·C mide 2 × 1'],
      ['El pedido de una tienda', 'Un pedido por una matriz es una combinación de sus columnas: cada mueble pesa lo que se pide de él.', 'columnas-del-pedido',
        'Una mesa gasta 4 m de madera y 6 h de trabajo; una silla, 2 m y 3 h. La tienda 1 pide **3** mesas y **5** sillas. Pon los pesos de cada columna y lo que gasta.',
        { A: [[4, 2], [6, 3]], x: [3, 5], filas: ['madera', 'horas'], cols: ['mesa', 'silla'], extra: ['42', '21'] },
        '$3\\,(4, 6) + 5\\,(2, 3) = (12 + 10,\\; 18 + 15) = (22, 33)$: 22 m de madera y 33 horas.',
        ['La columna de la mesa va multiplicada por las mesas pedidas; la de la silla, por las sillas.', 'Suma renglón por renglón lo que aporta cada columna.'], '3·(4, 6) + 5·(2, 3) = (22, 33)'],
      ['Las dos tiendas a la vez', 'El producto PQ pone cada tienda (fila) contra cada recurso (columna).', 'fila-por-columna',
        'Pedidos $P$: la tienda 1 pide 3 mesas y 5 sillas; la tienda 2, 2 mesas y 4 sillas. Recursos $Q$: mesa 4 m y 6 h; silla 2 m y 3 h. Llena $PQ$.',
        { P: [[3, 5], [2, 4]], Q: [[4, 6], [2, 3]], fp: ['tienda 1', 'tienda 2'], mid: ['mesa', 'silla'], cq: ['madera', 'horas'], extra: ['12', '44', '30'] },
        '$PQ = \\begin{pmatrix} 3 \\cdot 4 + 5 \\cdot 2 & 3 \\cdot 6 + 5 \\cdot 3 \\\\ 2 \\cdot 4 + 4 \\cdot 2 & 2 \\cdot 6 + 4 \\cdot 3 \\end{pmatrix} = \\begin{pmatrix} 22 & 33 \\\\ 16 & 24 \\end{pmatrix}$.',
        ['La casilla de una tienda y un recurso usa la fila de esa tienda en P y la columna de ese recurso en Q.', 'Pareja por pareja y se suma: mesas por lo de la mesa más sillas por lo de la silla.'], 'la primera fila repite (22, 33)'],
    ], 'P·Q·C es 2 × 1; la tienda 1 gasta 22 m y 33 h, la tienda 2, 16 m y 24 h.', 'Las tallas dicen qué se puede multiplicar; cada casilla es una fila por una columna.');

  // -------------------------------------------------------------------------------------------- Élite
  reto('sistemas-2', ['geo-1', 'geo-3'], 3, 'El tráfico del centro', 'Escalona, mira qué queda libre y acota',
    'Cuatro calles de una vía forman un cuadrado con esquinas A, B, C y D. En A salen 40 carros por hora, en B entran 60, en C salen 30 y en D entran 10. ¿Cuántas soluciones hay y cuál es el menor flujo posible en la calle x₄?', [
      ['Lo que deja la escalera', 'Cada esquina da una ecuación (lo que entra es lo que sale). Escalonada, la cuarta se vuelve 0 = 0.', 'pivote-o-libre',
        'Las ecuaciones de las esquinas, escalonadas, quedan así (la cuarta fila se volvió $0 = 0$). Rotula cada columna como **pivote** o **libre** y di cuántas soluciones hay.',
        { M: [[1, 0, 0, -1, -40], [0, 1, 0, -1, 20], [0, 0, 1, -1, -10]], extra: ['única', 'ninguna'] },
        'Hay pivote en $x_1$, $x_2$ y $x_3$; $x_4$ no tiene pivote y queda libre. Nada dice $0 = c$ con $c \\neq 0$: infinitas soluciones, $x_1 = t - 40$, $x_2 = t + 20$, $x_3 = t - 10$, $x_4 = t$.',
        ['Un pivote es el primer número distinto de cero de una fila.', 'Si alguna incógnita se queda sin pivote y nada es imposible, hay infinitas soluciones.'], 'x₄ = t libre: infinitas'],
      ['El menor flujo', 'Matemáticamente t puede ser cualquier número, pero un carro no anda en contra: todas las calles deben quedar ≥ 0.', 'red-de-flujo',
        'Con $x_4 = t$: $x_1 = t - 40$, $x_2 = t + 20$, $x_3 = t - 10$. Elige el **menor** $t$ con el que ninguna calle lleva carros en contra.',
        { e: [-40, 60, -30, 10] },
        'Se necesita $t - 40 \\geq 0$, $t + 20 \\geq 0$ y $t - 10 \\geq 0$ a la vez: la más exigente es $t \\geq 40$. Con $t = 40$: $x_1 = 0$, $x_2 = 60$, $x_3 = 30$, $x_4 = 40$.',
        ['Cada calle pone una condición sobre t; la que manda es la más exigente.', 'Mira cuál de las expresiones resta más: esa es la primera en volverse negativa.'], 't ≥ 40: el menor es 40'],
    ], 'Infinitas soluciones con x₄ = t libre; el menor flujo en x₄ es 40 carros por hora.', 'Una variable libre da infinitas soluciones; el contexto decide cuáles sirven.');

  reto('inversa-1', ['geo-2', 'geo-4'], 3, 'La clave del mensaje', 'Clave invertible, inversa y descifrado',
    'Un mensaje se cifra por parejas de letras con c = A·m, donde A = [[3, 1], [c, 2]]. Primero hay que elegir una c que deje A invertible; con c = 5 se halla A⁻¹ y se leen las letras de dos parejas cifradas.', [
      ['La clave que no sirve', 'Si las columnas de A quedan en la misma recta, el plano se aplasta y el mensaje no se puede recuperar.', 'aplasta-paralelogramo',
        'La clave es $A = \\begin{pmatrix} 3 & 1 \\\\ c & 2 \\end{pmatrix}$. Desliza $c$ hasta el **único** valor con el que $A$ **no tiene inversa**: esa clave está prohibida.',
        { a: 3, b: 1, d: 2, min: -3, max: 6, ini: 0, ok: 'Con c = 6 las columnas (3, 6) y (1, 2) quedan en la misma recta: ad − bc = 0 y nadie podría descifrar.' },
        'Sin inversa cuando $ad - bc = 3 \\cdot 2 - 1 \\cdot c = 0$, es decir $c = 6$. Cualquier otra $c$ sirve; con $c = 5$, $ad - bc = 1$.',
        ['El número que decide es $ad - bc$: iguálalo a cero con c como letra.', 'Con $c = 6$ la primera columna es el triple de la segunda.'], 'c = 6 aplasta; se usa c = 5'],
      ['La llave de vuelta', 'Para 2 × 2: se intercambian a y d, se les cambia el signo a b y a c, y se divide entre ad − bc.', 'formula-inversa',
        'Con $c = 5$ la clave es $A = \\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}$. Arma $A^{-1}$ con la fórmula.',
        { A: [[3, 1], [5, 2]], extra: ['1/11', '5', '−3'],
          mira: ['Afuera va 1 dividido entre ad − bc, con ad − bc = 3·2 − 1·5.', 'Arriba a la izquierda va d: a y d cambian de lugar.', 'La b se queda en su sitio, pero con el signo cambiado.', 'La c se queda en su sitio, pero con el signo cambiado.', 'Abajo a la derecha va a: a y d cambian de lugar.'],
          trampas: { '0:1/11': 'Sumaste: el número es ad − bc = 6 − 5, no ad + bc.', '3:5': 'Falta cambiarle el signo a c.', '4:−3': 'La a cambia de lugar, pero no de signo.', '1:3': 'Dejaste la a en su sitio: a y d se intercambian.' },
          ok: 'A⁻¹ = [2 −1; −5 3], y A·A⁻¹ = I: la clave tiene llave de vuelta.' },
        '$ad - bc = 6 - 5 = 1$, así que $A^{-1} = \\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$. Comprobación: $3 \\cdot 2 + 1 \\cdot (-5) = 1$ y $3 \\cdot (-1) + 1 \\cdot 3 = 0$.',
        ['Primero el número $ad - bc$; después intercambia a y d y cambia los signos de b y c.', 'Comprueba multiplicando: A por tu matriz debe dar la identidad.'], 'A⁻¹ = [2 −1; −5 3]'],
      ['Leer el mensaje', 'Cada letra sale de una fila de A⁻¹ por el par cifrado (A = 1, B = 2, …, Z = 26).', 'descifra-pares',
        'Descifra con $m = A^{-1} c$, letra por letra. Puedes fallar **una** vez.',
        { A: [[3, 1], [5, 2]], tiros: [
          { q: 'Par cifrado $c = (75, 132)$. ¿Cuál es su **primera** letra?', c: [75, 132], i: 0, r: 18, k: 'm_1 = 2 \\cdot 75 - 132 = 18 \\to \\text{R}', e: { 21: 'Esa es la segunda letra del par: usaste la otra fila de A⁻¹.' } },
          { q: 'El mismo par $c = (75, 132)$. ¿Cuál es su **segunda** letra?', c: [75, 132], i: 1, r: 21, k: 'm_2 = -5 \\cdot 75 + 3 \\cdot 132 = 21 \\to \\text{U}', e: { 18: 'Esa es la primera letra del par: usa la segunda fila de A⁻¹.' } },
          { q: 'Otro par: $c = (61, 102)$. ¿Cuál es su **primera** letra?', c: [61, 102], i: 0, r: 20, k: 'm_1 = 2 \\cdot 61 - 102 = 20 \\to \\text{T}', e: { 1: 'Esa es la segunda letra del par: usaste la otra fila de A⁻¹.' } }] },
        'Con $A^{-1} = \\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$: $(75, 132) \\to (18, 21)$, R y U; $(61, 102) \\to (20, 1)$, T y A. El mensaje empieza «RUTA».',
        ['La primera letra usa la primera fila de A⁻¹, (2, −1); la segunda, la fila (−5, 3).', 'Multiplica la fila por el par, pareja por pareja, y suma.'], 'R, U, T: el mensaje es RUTA'],
    ], 'Se prohíbe c = 6; con c = 5, A⁻¹ = [2 −1; −5 3] y el mensaje dice RUTA.', 'Una clave sirve si ad − bc ≠ 0; descifrar es multiplicar por la inversa.');
}
