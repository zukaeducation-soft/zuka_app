// Preicfes · Matemáticas · mundo 10 «Funciones que Curvan» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-curvas-1', 'Cuadráticas: trayectorias y máximos', guion(
    ['La parábola', 'Una función con $x^2$ dibuja una curva simétrica.'],
    ['El vértice', 'Está a mitad de camino entre dos puntos de igual altura.'],
    ['Los ceros', 'Donde la curva toca el eje x: ahí la función vale 0.'],
    ['Máximos', 'Si abre hacia abajo, el vértice es el punto más alto.']), [
    x('vertice-parabola', 'Un balón sale del suelo en **2 m** y cae en **14 m**. Mueve hasta la distancia en que llega **más alto**.', { r1: 2, r2: 14, h: 9, max: 18, et: 'distancia (m)' },
      'La parábola es simétrica: el punto más alto está en $\\tfrac{2 + 14}{2} = 8$ m.', 'Sale y cae a la misma altura: busca el punto que está a igual distancia de los dos.'),
    x('ancho-maximo', 'Con **24 m** de cerca se hace un corral contra un muro, que sirve de cuarto lado. Mueve el lado **perpendicular al muro** que da la **mayor área**.', { total: 24, muro: true },
      'El área es $x(24 - 2x)$: vale 0 en 0 y en 12, y es mayor en $x = 6$ (72 m²).', 'Busca los lados que dan área 0 y piensa en la simetría.'),
    x('raices-parabola', 'Mueve los dos puntos donde $y = x^2 - 2x - 8$ corta el **eje x**.', { b: -2, c: -8, r: [-2, 4], lo: -6, hi: 6 },
      '$x^2 - 2x - 8 = (x - 4)(x + 2)$: vale 0 en $-2$ y en 4.', 'Busca dos números que multiplicados den $-8$ y sumados $-2$.'),
    x('lee-parabola', 'La altura de una pelota es $h = -5t^2 + 20t + 25$ (metros, segundos). Completa.', { et: ['altura al salir', 'instante más alto', 'altura máxima', 'instante en que cae'], metas: ['25 m', '2 s', '45 m', '5 s'], fichas: ['25 m', '2 s', '45 m', '5 s', '20 m', '4 s', '40 m'], mira: ['Reemplaza $t = 0$.', 'En 0 y en 4 tiene la misma altura: ¿qué está en medio?', 'Reemplaza el instante más alto.', 'Busca cuándo la altura es 0.'], trampas: { '1:4 s': 'A los 4 s vuelve a la altura de salida.', '2:20 m': 'Ese es el número que acompaña a t.' }, ok: 'Sale, sube, baja y cae.' },
      'En 0, 25 m; en $t = 2$, $-20 + 40 + 25 = 45$ m; y en $t = 5$ vale 0.', 'Reemplaza los instantes y usa la simetría.'),
    x('abre-arriba', '¿Cada parábola tiene **máximo** o **mínimo**?', { et: ['y = 3x² − 1', 'y = −x² + 8x', 'y = 5 − 2x²', 'y = (x − 4)²'], metas: ['mínimo', 'máximo', 'máximo', 'mínimo'], fichas: ['mínimo', 'máximo', 'máximo', 'mínimo', 'máximo', 'mínimo'], mira: ['Mira el signo del que acompaña a x².', 'Mira el signo del que acompaña a x².', 'El término con x² va de segundo: mira su signo.', 'Al desarrollar, x² queda positivo.'], ok: 'Positivo abre arriba; negativo, abajo.' },
      'Con $x^2$ positivo abre hacia arriba y tiene mínimo; con negativo, máximo.', 'Busca el número que multiplica a x² y mira su signo.'),
    x('punto-en-curva', 'Toca **todos** los puntos por los que pasa $y = x^2 - 3x$.', { casos: [{ t: '(3, 0)', si: true }, { t: '(2, 2)', no: 'Con 2 da 4 − 6 = −2.' }, { t: '(−1, 4)', si: true }, { t: '(−2, −2)', no: 'Con −2 da 4 + 6 = 10.' }, { t: '(5, 10)', si: true }], falta: 'Falta otro: reemplaza cada x y compara.', ok: 'Los tres cumplen la ecuación.' },
      '$9 - 9 = 0$, $1 + 3 = 4$ y $25 - 15 = 10$.', 'Reemplaza la primera coordenada y mira si sale la segunda.'),
    x('sube-parabola', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'La ganancia es $g = -x^2 + 16x$ (miles). ¿Cuál es la ganancia **máxima**?', r: 64, c: '8 \\cdot 8', e: { 8: 'Esa es la cantidad que la produce.', 16: 'Ahí la ganancia es 0.' } },
      { q: 'Dos números suman **14**. ¿Cuál es el **mayor** producto posible?', r: 48, c: '7 \\cdot 7 - 1', e: { 14: 'Esa es la suma.' } },
      { q: '¿Cuánto vale $y = 2x^2 - 6$ en $x = -4$?', r: 26, c: '2 \\cdot 16 - 6', e: { 38: 'Los 6 se restan.' } }] },
      'En $x = 8$ hay 64; $7 \\cdot 7 = 49$; y $32 - 6 = 26$.', 'El máximo está a mitad de camino entre los dos ceros.'),
    sol('Se venden entradas: con precio $p$ (miles) llegan $60 - 2p$ personas. ¿Con qué precio se recibe más?', ['El ingreso es $p(60 - 2p)$: vale 0 con $p = 0$ y con $p =$ [[30]]', 'El máximo está en la mitad: $p =$ [[15]] mil', 'Llegan [[30 personas]]'], ['60', '20', '45 personas'], '$15 \\cdot 30 = 450$ mil, el mayor ingreso.', 'Halla los precios con ingreso 0 y busca la mitad.'),
    err('Alguien busca el punto más alto de $y = -x^2 + 10x$.', ['Los ceros están en $x = 0$ y $x = 10$', 'El eje está en $x = 5$', 'La altura máxima es 5'], 2, ['La altura máxima es $-25 + 50 = 25$', 'La altura máxima es 10', 'La altura máxima es $0$'], '5 es dónde ocurre; la altura se halla reemplazando.', '¿Ese número es una x o una y?'),
    opc('La trayectoria de un chorro es $y = -x^2 + 6x$. El chorro alcanza su altura máxima en:', ['$x = 3$ y la altura es 9', '$x = 6$ y la altura es 0', '$x = 3$ y la altura es 6', '$x = 9$ y la altura es 3'], 0, 'Los ceros son 0 y 6: el eje es 3 y $-9 + 18 = 9$.', 'Busca la mitad entre los dos cortes.'),
  ]);

  const l2 = leccion('icf-ma-curvas-2', 'Exponenciales y logarítmicas', guion(
    ['Multiplicar siempre por lo mismo', '$y = C \\cdot k^x$: en cada paso se multiplica por $k$.'],
    ['Crece o baja', 'Con base mayor que 1 crece; entre 0 y 1, baja sin llegar a 0.'],
    ['El logaritmo', 'Pregunta a qué exponente hay que elevar.'],
    ['Escalas', 'En una escala logarítmica cada paso es multiplicar.']), [
    x('veces-factor', 'Un cultivo tiene **5** bacterias y se **duplica** cada hora. Mueve las horas hasta tener **160**.', { C: 5, k: 2, meta: 160, max: 10, et: 'horas' },
      'Debe multiplicarse por $160 \\div 5 = 32 = 2^5$: 5 horas.', 'Divide la meta entre lo que había y mira qué potencia de 2 es.'),
    x('tabla-exponencial', 'La función es $y = 3 \\cdot 2^x$. Completa la tabla.', { et: ['x = 0', 'x = 1', 'x = 3', 'x = −1'], metas: ['3', '6', '24', '1.5'], fichas: ['3', '6', '24', '1.5', '0', '18', '−6'], mira: ['Todo número (no cero) a la cero es 1.', 'Multiplica por 2 una vez.', 'Multiplica por 2 tres veces.', 'Un exponente negativo divide.'], trampas: { '0:0': '$2^0$ es 1, no 0.', '2:18': '$2^3$ es 8, no 6.', '3:−6': 'El exponente negativo no cambia el signo: divide.' }, ok: 'Por 2 en cada paso.' },
      '$3 \\cdot 1$, $3 \\cdot 2$, $3 \\cdot 8$ y $3 \\div 2$.', 'Halla primero la potencia de 2 y después multiplica por 3.'),
    x('crece-como', '¿Cada tabla crece de forma **lineal** o **exponencial**?', { et: ['4, 8, 12, 16', '4, 8, 16, 32', '100, 50, 25, 12.5', '100, 80, 60, 40'], metas: ['lineal', 'exponencial', 'exponencial', 'lineal'], fichas: ['lineal', 'exponencial', 'exponencial', 'lineal', 'lineal', 'exponencial'], mira: ['Resta los seguidos.', 'Divide los seguidos.', 'Cada uno es la mitad del anterior.', 'Cada uno es 20 menos que el anterior.'], ok: 'Sumar lo mismo o multiplicar por lo mismo.' },
      'Con diferencia fija es lineal; con razón fija, exponencial, aunque baje.', 'Prueba restando y dividiendo términos seguidos.'),
    x('log-es', 'Pon cada logaritmo.', { et: ['log₂ 8', 'log₁₀ 1 000 000', 'log₅ 25', 'log₃ 1'], metas: ['3', '6', '2', '0'], fichas: ['3', '6', '2', '0', '4', '5', '1'], mira: ['¿2 a qué potencia da 8?', 'Cuenta los ceros.', '¿5 a qué potencia da 25?', '¿3 a qué potencia da 1?'], trampas: { '0:4': '$2^4$ es 16.', '2:5': 'Dividiste: se busca el exponente.', '3:1': '$3^1$ es 3.' }, ok: 'El exponente que falta.' },
      '$2^3 = 8$, $10^6$, $5^2 = 25$ y $3^0 = 1$.', 'Pregunta a qué exponente hay que elevar la base.'),
    x('sube-o-baja-base', 'Al aumentar x, ¿cada función **crece** o **baja**?', { et: ['y = 1.04ˣ', 'y = 0.9ˣ', 'y = 5 · (1/2)ˣ', 'y = 2 · 3ˣ'], metas: ['crece', 'baja', 'baja', 'crece'], fichas: ['crece', 'baja', 'baja', 'crece', 'crece', 'baja'], mira: ['Compara la base con 1.', 'Compara la base con 1.', 'La base es un medio.', 'La base es 3.'], ok: 'Se compara la base con 1.' },
      'Con base mayor que 1 crece; con base entre 0 y 1 baja.', 'Mira el número que está elevado, no el que multiplica.'),
    x('igual-potencia', 'Toca **todas** las expresiones iguales a $2^6$.', { casos: [{ t: '4³', si: true }, { t: '2³ + 2³', no: 'Eso es 8 + 8 = 16.' }, { t: '2² · 2⁴', si: true }, { t: '2² · 2³', no: 'Los exponentes se suman: da 2⁵.' }, { t: '8²', si: true }], falta: 'Falta otra: escribe la base como potencia de 2.', ok: 'Todas valen 64.' },
      'Como $2^6 = 64$, sirven $4^3$, $2^2 \\cdot 2^4$ y $8^2$.', 'Calcula $2^6$ y compara con él cada expresión.'),
    x('sube-logaritmo', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un medicamento de **80 mg** baja a la **mitad** cada 4 horas. ¿Cuántas **horas** pasan hasta que quedan **5 mg**?', r: 16, c: '4 \\cdot 4', e: { 4: 'Son 4 mitades, de 4 horas cada una.' } },
      { q: '¿Cuánto vale $2^x$ si $x = \\log_2 13$?', r: 13, c: '2^{\\log_2 13}', e: {} },
      { q: 'Un sismo de magnitud **7** mueve el suelo $10^2$ veces lo que uno de **5**. ¿Cuánto vale $\\log_{10} 100 + \\log_{10} 1\\,000$?', r: 5, c: '2 + 3', e: { 6: 'Los exponentes se suman.' } }] },
      'Cuatro mitades de 4 horas: 16; el logaritmo deshace la potencia: 13; y $2 + 3 = 5$.', 'Cuenta cuántas veces se multiplica o se divide.'),
    sol('Un carro de 40 millones pierde cada año el 10 % de su valor. ¿Cuánto vale a los 2 años?', ['Cada año queda el [[90]] %', 'Al año 1 vale [[36]] millones', 'Al año 2 vale [[32.4]] millones'], ['10', '32', '30'], '$40 \\cdot 0.9^2 = 32.4$ millones.', 'El segundo 10 % se saca de lo que quedó.'),
    err('Alguien resuelve $3^x = 81$.', ['Se escribe 81 como potencia de 3', '$81 = 3^4$', 'Entonces $x = 81 \\div 3 = 27$'], 2, ['Entonces $x = 4$', 'Entonces $x = 3$', 'Entonces $x = 78$'], 'Si las bases son iguales, los exponentes son iguales: $x = 4$.', 'Compara los exponentes de las dos potencias.'),
    opc('Una población se triplica cada año y hoy hay 20. La expresión que da la población a los $t$ años es:', ['$20 + 3t$', '$20 \\cdot 3t$', '$3 \\cdot 20^t$', '$20 \\cdot 3^t$'], 3, 'Se empieza en 20 y se multiplica por 3 una vez cada año.', 'Prueba con $t = 1$ y $t = 2$.'),
  ]);

  const l3 = leccion('icf-ma-curvas-3', 'Trigonométricas y periódicas', guion(
    ['Periódica', 'Se repite igual cada cierto tiempo: ese tiempo es el periodo.'],
    ['Línea media', 'Está a mitad de camino entre el máximo y el mínimo.'],
    ['Amplitud', 'Es la distancia de la línea media al máximo.'],
    ['Seno y giro', 'El seno da la altura de un punto que gira.']), [
    x('amplitud-onda', 'La marea sube hasta **10 m** y baja hasta **2 m**. Mueve la **línea media** y la **amplitud**.', { min: 2, max: 10, hi: 12 },
      'La media es $\\tfrac{10 + 2}{2} = 6$ y la amplitud, $10 - 6 = 4$.', 'Primero busca el punto que está a igual distancia del máximo y del mínimo.'),
    x('periodo-onda', 'Una rueda da **6** vueltas en **72 s**. Mueve su **periodo**.', { n: 6, total: 72, max: 24, u: 's' },
      'Se reparten los segundos entre las vueltas: $72 \\div 6 = 12$ s.', 'El periodo es lo que tarda una sola vuelta.'),
    x('lee-onda', 'La temperatura es $T = 18 + 5\\operatorname{sen}(\\ldots)$, con periodo de 24 h. Completa.', { et: ['línea media', 'amplitud', 'temperatura máxima', 'temperatura mínima'], metas: ['18', '5', '23', '13'], fichas: ['18', '5', '23', '13', '24', '10', '0'], mira: ['Es el valor del centro.', 'Es lo que multiplica al seno.', 'El seno llega a 1.', 'El seno llega a −1.'], trampas: { '1:10': 'De mínimo a máximo hay 10: la amplitud es la mitad.', '2:24': 'Ese es el periodo.' }, ok: 'Centro, más y menos la amplitud.' },
      'El seno va de $-1$ a 1: de $18 - 5 = 13$ a $18 + 5 = 23$.', 'Recuerda entre qué valores se mueve el seno.'),
    x('en-que-momento', 'Un fenómeno con periodo de **8 h** tuvo un máximo a las **3**. Pon el momento de cada uno.', { et: ['próximo máximo', 'primer mínimo después de las 3', 'segundo máximo después', 'máximo anterior (la víspera)'], metas: ['11', '7', '19', '19 h ayer'], fichas: ['11', '7', '19', '19 h ayer', '8', '5', '24'], mira: ['Suma un periodo.', 'El mínimo está a medio periodo.', 'Suma dos periodos.', 'Resta un periodo a las 3.'], trampas: { '1:5': 'Medio periodo son 4 horas.', '0:8': 'Se suma el periodo a la hora del máximo.' }, ok: 'Periodos y medios periodos.' },
      '$3 + 8 = 11$, $3 + 4 = 7$, $3 + 16 = 19$ y $3 - 8$ son las 19 h de ayer.', 'Recuerda que de máximo a mínimo hay medio periodo.'),
    x('altura-rueda', 'La rueda tiene radio **10 m** y su centro está a **12 m**. Gira la cabina hasta que esté, por **primera** vez, a **17 m**.', { r: 10, c: 12, y: 17, g: 30, max: 180 },
      'Falta subir 5 de 10: $\\operatorname{sen}\\theta = 0.5$, es decir, 30°.', 'Compara lo que sube sobre el centro con el radio.'),
    x('es-periodica', 'Toca **todas** las situaciones **periódicas**.', { casos: [{ t: 'altura de una cabina de noria', si: true }, { t: 'altura de un niño al crecer', no: 'Crece, pero no vuelve a repetirse.' }, { t: 'hora del amanecer en un año y otro', si: true }, { t: 'dinero que se va gastando', no: 'Baja sin repetir su recorrido.' }, { t: 'posición de un péndulo', si: true }], falta: 'Falta otra que se repite igual.', ok: 'Se repiten cada cierto tiempo.' },
      'La noria, el amanecer de cada año y el péndulo se repiten.', 'Pregunta si, pasado un tiempo, vuelve a hacer lo mismo.'),
    x('sube-onda', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Una onda va de **7** a **31**. ¿Cuál es su **amplitud**?', r: 12, c: '24 \\div 2', e: { 24: 'Eso es del mínimo al máximo.', 19: 'Esa es la línea media.' } },
      { q: 'Un faro da **5** destellos en **60 s**. ¿Cuál es su **periodo** en segundos?', r: 12, c: '60 \\div 5', e: { 5: 'Esos son los destellos.' } },
      { q: '¿Cuál es el **máximo** de $y = 20 + 15\\cos x$?', r: 35, c: '20 + 15', e: { 20: 'Esa es la línea media.', 15: 'Esa es la amplitud.' } }] },
      '$24 \\div 2 = 12$; $60 \\div 5 = 12$; y $20 + 15 = 35$.', 'Recuerda que el coseno, como el seno, va de $-1$ a 1.'),
    sol('El nivel de un tanque va de 4 m a 16 m y se repite cada 6 h. Escribe sus medidas.', ['La línea media es [[10]] m', 'La amplitud es [[6]] m', 'En un día se repite [[4 veces]]'], ['12', '20', '3 veces'], '$\\tfrac{4 + 16}{2} = 10$, $16 - 10 = 6$ y $24 \\div 6 = 4$.', 'Busca primero el centro.'),
    err('Alguien lee una onda que va de 2 a 8 con periodo 5.', ['La línea media es 5', 'La amplitud es $8 - 2 = 6$', 'Un máximo se repite cada 5'], 1, ['La amplitud es $8 - 5 = 3$', 'La amplitud es 8', 'La amplitud es 5'], 'La amplitud va de la línea media al máximo: 3.', '¿Desde dónde se mide la amplitud?'),
    opc('El seno de un ángulo puede valer:', ['2', '0.8', '−1.5', '10'], 1, 'El seno va de $-1$ a 1: solo 0.8 está ahí.', 'Piensa en la altura de un punto en un círculo de radio 1.'),
  ]);

  const l4 = leccion('icf-ma-curvas-4', 'Dominio, rango y cortes', guion(
    ['Función', 'A cada entrada le toca una sola salida.'],
    ['Dominio', 'Las entradas que se pueden usar: no se divide entre 0 ni se saca raíz cuadrada de un negativo.'],
    ['Rango', 'Las salidas que sí aparecen.'],
    ['Cortes', 'Con el eje y, $x = 0$; con el eje x, $y = 0$.']), [
    x('rango-ventana', 'La curva va de un extremo al otro. Mueve el piso y el techo hasta su **rango**.', { f: t => t * t - 2, dom: [-1, 3], win: [-2, 4, -4, 8], lo: -2, hi: 7 },
      'El punto más bajo está en $-2$ (en el vértice) y el más alto, en 7.', 'Recorre la curva y busca el punto más bajo y el más alto, no solo los extremos.'),
    x('corte-ejes', 'Mueve los cortes de $2x + 3y = 24$ con los ejes.', { a: 2, b: 3, c: 24, max: 14 },
      'Con $y = 0$, $x = 12$; con $x = 0$, $y = 8$.', 'Piensa cuánto vale la otra coordenada sobre un eje.'),
    x('dominio-valores', 'Toca **todos** los valores que **no** se pueden usar en $\\dfrac{\\sqrt{x - 2}}{x - 5}$.', { casos: [{ t: 'x = 0', si: true }, { t: 'x = 2', no: 'La raíz de 0 es 0: sí se puede.' }, { t: 'x = 5', si: true }, { t: 'x = 6', no: 'Da raíz de 4 entre 1: sí se puede.' }, { t: 'x = −3', si: true }], falta: 'Falta otro: mira la raíz y también el denominador.', ok: 'Raíz de negativo o división entre 0.' },
      'Con 0 y $-3$ la raíz es de un negativo; con 5 se divide entre 0.', 'Reemplaza cada valor y mira la raíz y el denominador.'),
    x('es-funcion', 'Toca **todas** las listas de parejas (entrada, salida) que **sí** son una función.', { casos: [{ t: '(1, 4), (2, 4), (3, 4)', si: true }, { t: '(1, 2), (1, 3), (2, 5)', no: 'La entrada 1 tiene dos salidas.' }, { t: '(0, 7), (5, 1), (9, 0)', si: true }, { t: '(4, 2), (4, −2)', no: 'La entrada 4 tiene dos salidas.' }, { t: '(−1, 1), (1, 1)', si: true }], falta: 'Falta otra: dos entradas sí pueden dar la misma salida.', ok: 'Una sola salida por entrada.' },
      'Repetir salidas está permitido; repetir una entrada con salidas distintas, no.', 'Mira si alguna entrada aparece con dos salidas.'),
    x('lee-cortes', 'Para $y = x^2 - 9$, completa.', { et: ['corte con el eje y', 'corte izquierdo con x', 'corte derecho con x', 'menor valor de y'], metas: ['−9', '−3', '3', '−9'], fichas: ['−9', '−3', '3', '−9', '9', '0', '−6'], mira: ['Reemplaza $x = 0$.', 'Busca dónde vale 0.', 'Busca dónde vale 0.', 'El cuadrado es, por lo menos, 0.'], trampas: { '0:0': 'Ese es el valor de x.', '2:9': 'Con 9 da 72.' }, ok: 'Ejes y mínimo.' },
      'En $x = 0$ vale $-9$; vale 0 en $-3$ y 3; y su mínimo es $-9$.', 'Para cada corte, una de las coordenadas es 0.'),
    x('contexto-dominio', 'Pon el **dominio** que tiene sentido en cada caso.', { et: ['precio según personas', 'bus de 40 puestos', 'hora de un día', 'lado de un cuadrado'], metas: ['0, 1, 2, 3…', '0, 1, …, 40', 'de 0 a 24', 'más de 0'], fichas: ['0, 1, 2, 3…', '0, 1, …, 40', 'de 0 a 24', 'más de 0', 'todos', 'menos de 0'], mira: ['No hay media persona.', 'Hay un tope de puestos.', 'El tiempo no va a saltos.', 'Puede medir 2.5, pero no 0.'], trampas: { '0:todos': 'No hay menos tres personas.', '2:0, 1, …, 40': 'Un día tiene 24 horas.', '3:todos': 'Un lado no puede ser negativo.' }, ok: 'El contexto manda.' },
      'Las personas se cuentan, el bus tiene tope, el día va de 0 a 24 y el lado es positivo.', 'Piensa qué números tendrían sentido en la vida real.'),
    x('sube-funcion', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'La entrada **más pequeña** que se puede usar en $\\sqrt{3x - 36}$.', r: 12, c: '36 \\div 3', e: { 36: 'Con 36 la raíz es de 72: hay menores que sirven.' } },
      { q: 'Si $f(x) = x^2 + 5$, ¿cuánto vale $f(-6)$?', r: 41, c: '36 + 5', e: { 31: 'El cuadrado de −6 es positivo y se suma 5.' } },
      { q: '¿Con qué **número** se corta el eje y en $y = 4(x - 2)^2 + 7$?', r: 23, c: '4 \\cdot 4 + 7', e: { 7: 'Ese es el valor del vértice.' } }] },
      '$36 \\div 3 = 12$; $36 + 5 = 41$; y con $x = 0$, $16 + 7 = 23$.', 'En el eje y la x vale 0; dentro de la raíz no puede haber negativos.'),
    sol('Analiza $f(x) = \\dfrac{12}{x - 4}$.', ['No se puede usar $x =$ [[4]]', 'Corta el eje y en [[−3]]', 'Con el eje x: [[no corta]]'], ['0', '3', 'corta en 12'], '$12 \\div (-4) = -3$; y 12 entre algo nunca da 0.', 'Reemplaza 0 para el eje y; para el eje x pregunta si puede dar 0.'),
    err('Alguien busca el dominio de $\\sqrt{10 - x}$.', ['La raíz cuadrada necesita un número que no sea negativo', 'Entonces $10 - x \\geq 0$', 'Por eso $x \\geq 10$'], 2, ['Por eso $x \\leq 10$', 'Por eso $x = 10$', 'Por eso x puede ser cualquiera'], 'Con 11 la raíz sería de $-1$: sirven los números hasta 10.', 'Prueba con 11 y con 9.'),
    opc('El rango de $y = x^2 + 3$, con x cualquier número real, es:', ['Todos los reales', 'Los reales mayores que 0', 'Los reales mayores o iguales a 3', 'Los reales menores o iguales a 3'], 2, 'El cuadrado es por lo menos 0: y es por lo menos 3, y llega a 3 con $x = 0$.', '¿Cuál es el menor valor que puede tomar el cuadrado?'),
  ]);

  return mundo('icf-ma-curvas', 'Funciones que Curvan', 'matematicas', [l1, l2, l3, l4], [
    ['icf-ma-curvas-1', 'El vértice y la abertura dan la parábola.', play('mueve-parabola', 'Pon el **vértice** y la **abertura** de la ecuación', { rounds: [{ a: -1, b: 4, c: -1 }] }, 'El eje está en 2 y la altura es $-4 + 8 - 1 = 3$; abre hacia abajo.', { hint: 'Busca el eje y reemplaza para hallar la altura.' })],
    ['icf-ma-curvas-1', 'El vértice es donde da la vuelta.', play('apunta-chorro', 'Toca el punto donde el chorro **da la vuelta** y lánzalo', { rounds: [{ title: 'El chorro', items: [{ a: -1, h: 2, k: 5, std: true }] }] }, 'El eje está en 2 y ahí la altura es 5.', { hint: 'Halla el eje y reemplaza en la ecuación.' })],
    ['icf-ma-curvas-1', 'El máximo está a mitad de camino entre los ceros.', opc('El área de un rectángulo de perímetro 40 y lado $x$ es $x(20 - x)$. El área máxima es:', ['20', '400', '10', '100'], 3, 'Los ceros son 0 y 20; en 10 hay $10 \\cdot 10 = 100$.', 'Busca el lado que está entre los dos que dan área 0.')],
    ['icf-ma-curvas-2', 'Duplicar hacia adelante es partir hacia atrás.', play('lirios-laguna', 'Los lirios se duplican cada día. Retrocede hasta el día que te piden', { rounds: [{ title: 'La laguna', items: [{ full: 10, ask: 'eighth' }] }] }, 'Un octavo son tres mitades: 3 días antes, el 7.', { hint: 'Cada día hacia atrás es la mitad.' })],
    ['icf-ma-curvas-2', 'Multiplicar potencias es sumar exponentes.', play('regla-de-calculo', 'Multiplica **sumando distancias** en la regla', { rounds: [{ title: 'Potencias de 3', items: [{ base: 3, a: 9, b: 27 }] }] }, '$3^2 \\cdot 3^3 = 3^5 = 243$.', { hint: 'Escribe cada número como potencia de 3.' })],
    ['icf-ma-curvas-2', 'El logaritmo es un exponente.', opc('Si $\\log_2 x = 5$, entonces $x$ vale:', ['10', '32', '25', '7'], 1, '$2^5 = 32$.  El logaritmo es el exponente.', 'Escríbelo como potencia.')],
    ['icf-ma-curvas-3', 'Amplitud, repeticiones y línea media.', play('sintoniza-onda', 'Sintoniza tu onda con la onda fantasma', { rounds: [{ fn: 'sen', target: { a: 2, b: 2, cq: 0, d: 1 }, knobs: ['a', 'b', 'd'] }] }, 'Amplitud 2, dos repeticiones y línea media 1.', { hint: 'Empieza por la línea media y sigue con la altura.' })],
    ['icf-ma-curvas-3', 'El seno es la altura; el coseno, el avance.', play('noria', 'Gira la noria hasta un ángulo que cumpla la condición', { rounds: [{ prompt: 'Seno positivo y coseno negativo', sen: '+', cos: '-' }] }, 'Arriba y a la izquierda: entre 90° y 180°.', { hint: 'El seno es la altura y el coseno, qué tan a la derecha está.' })],
    ['icf-ma-curvas-3', 'De mínimo a máximo hay dos amplitudes.', opc('Una onda tiene línea media 30 y amplitud 12. Sus valores van:', ['De 18 a 42', 'De 12 a 30', 'De 0 a 42', 'De 24 a 36'], 0, '$30 - 12 = 18$ y $30 + 12 = 42$.', 'La amplitud se suma y se resta al centro.')],
    ['icf-ma-curvas-4', 'En el eje x la función vale 0.', play('donde-cae', 'Pon un balde donde **cae el agua** (solo adelante de la boquilla) y abre la llave', { rounds: [{ title: 'El corte', items: [{ eq: '-x^2 + 3x + 10 = 0', roots: [5, -2] }] }] }, '$-x^2 + 3x + 10 = -(x - 5)(x + 2)$: cae en 5.', { hint: 'Busca dos números con producto −10 y suma 3.' })],
    ['icf-ma-curvas-4', 'En un corte, las dos funciones valen lo mismo.', play('corte-parabola-recta', 'Arrastra la recta hasta que pase por el corte marcado', { rounds: [{ a: 1, m: 2, x0: 3 }] }, 'En $x = 3$ la parábola vale 9: $9 = 6 + n$ y $n = 3$.', { hint: 'En el corte, la recta y la parábola tienen la misma altura.' })],
    ['icf-ma-curvas-4', 'No se divide entre 0.', opc('El dominio de $f(x) = \\dfrac{x + 1}{x^2 - 16}$ son todos los reales, excepto:', ['$-1$', '16', '4 y $-4$', 'Solo 4'], 2, '$x^2 = 16$ con 4 y con $-4$: ahí se divide entre 0.', 'Busca todos los valores que hacen 0 el denominador.')],
  ]);
})());
