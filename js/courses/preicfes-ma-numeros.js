// Preicfes · Matemáticas · mundo 13 «Números y Sucesiones» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-numeros-1', 'Fracciones, decimales y notación científica', guion(
    ['Mismo número', 'Una fracción, un decimal y un porcentaje pueden ser el mismo número.'],
    ['Qué conjunto', 'Naturales, enteros, racionales e irracionales.'],
    ['Notación científica', 'Un número entre 1 y 10 por una potencia de 10.'],
    ['Operar', 'Se operan los números y se suman o restan los exponentes.']), [
    x('fraccion-recta', 'Cada unidad tiene **12** marcas. Mueve el punto a $\\tfrac{7}{4}$.', { n: 7, d: 4, partes: 12, hi: 2, et: '7/4' },
      'Cada cuarto son 3 marcas: $7 \\cdot 3 = 21$ marcas.', 'Halla cuántas marcas tiene un solo cuarto de unidad.'),
    x('coma-cientifica', 'Mueve el exponente para que sea el **mismo número**.', { m: '4.6', et: '0.00046', e: -4, lo: -8, hi: 8 },
      'La coma corre 4 lugares a la derecha: $4.6 \\cdot 10^{-4}$.', 'Cuenta cuántos lugares corre la coma y hacia qué lado.'),
    x('fraccion-decimal', 'Pon el decimal de cada número.', { et: ['3/8', '7/20', '12.5 %', '2/3'], metas: ['0.375', '0.35', '0.125', '0.666…'], fichas: ['0.375', '0.35', '0.125', '0.666…', '0.38', '1.25', '0.23'], mira: ['Divide 3 entre 8.', 'Amplifica a 100.', 'Divide entre 100.', 'Divide 2 entre 3: se repite.'], trampas: { '0:0.38': 'Una fracción no se lee pegando los números.', '2:1.25': 'Se corre la coma dos lugares.', '3:0.23': 'Una fracción no se lee pegando los números.' }, ok: 'Dividir o amplificar.' },
      '$3 \\div 8 = 0.375$; $\\tfrac{35}{100}$; $12.5 \\div 100$; y 2 entre 3 se repite.', 'La raya de la fracción es una división: hazla.'),
    x('opera-cientifica', 'Resuelve y deja en **notación científica**.', { et: ['(2·10³)·(4·10⁵)', '(9·10⁷) ÷ (3·10²)', '(5·10⁴)·(6·10³)', '3·10⁴ + 2·10³'], metas: ['8·10⁸', '3·10⁵', '3·10⁸', '3.2·10⁴'], fichas: ['8·10⁸', '3·10⁵', '3·10⁸', '3.2·10⁴', '8·10¹⁵', '30·10⁷', '5·10⁷'], mira: ['Multiplica los números y suma los exponentes.', 'Divide los números y resta los exponentes.', 'Da 30: ajústalo para que quede entre 1 y 10.', 'Escríbelos con la misma potencia antes de sumar.'], trampas: { '0:8·10¹⁵': 'Los exponentes se suman, no se multiplican.', '2:30·10⁷': 'Vale lo mismo, pero el número debe quedar entre 1 y 10.', '3:5·10⁷': 'Para sumar, las potencias deben ser iguales.' }, ok: 'Exponentes que se suman, se restan o se igualan.' },
      '$8 \\cdot 10^8$; $3 \\cdot 10^5$; $30 \\cdot 10^7 = 3 \\cdot 10^8$; y $30\\,000 + 2\\,000$.', 'Opera por aparte los números y las potencias de 10.'),
    x('entre-los-dos', 'Toca **todos** los números que están **entre** $\\tfrac12$ y $\\tfrac34$.', { casos: [{ t: '0.6', si: true }, { t: '5/6', no: '5/6 es 0.833…: pasa de 0.75.' }, { t: '5/8', si: true }, { t: '0.49', no: 'Es menor que 0.5.' }, { t: '70 %', si: true }], falta: 'Falta otro: pásalos todos a decimal.', ok: 'Entre 0.5 y 0.75.' },
      'En decimales, 0.6, 0.625 y 0.7 están entre 0.5 y 0.75.', 'Escríbelos todos de la misma manera y compáralos.'),
    x('a-que-conjunto', 'Pon el conjunto **más pequeño** al que pertenece cada número.', { et: ['−6', '0.25', '√2', '√49'], metas: ['enteros', 'racionales', 'irracionales', 'naturales'], fichas: ['enteros', 'racionales', 'irracionales', 'naturales', 'racionales'], mira: ['No es natural: es negativo.', 'Se escribe como fracción.', 'Su decimal no termina ni se repite.', 'Saca la raíz.'], trampas: { '3:irracionales': 'La raíz de 49 es 7.' }, ok: 'Mira primero cuánto vale.' },
      '$-6$ es entero, $0.25 = \\tfrac14$, $\\sqrt2$ es irracional y $\\sqrt{49} = 7$.', 'Calcula su valor antes de decidir el conjunto.'),
    x('sube-fraccion', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Los $\\tfrac{3}{5}$ de un número son **60**. ¿Cuál es el **número**?', r: 100, c: '60 \\div 3 \\cdot 5', e: { 36: 'Esos son los tres quintos de 60.' } },
      { q: '$\\tfrac{2}{3}$ de $\\tfrac{3}{4}$ de **100**.', r: 50, c: '\\tfrac{2}{3} \\cdot 75', e: { 66: 'Falta sacar primero los tres cuartos.' } },
      { q: '¿Cuántas veces cabe $2 \\cdot 10^3$ en $6.4 \\cdot 10^4$?', r: 32, c: '64\\,000 \\div 2\\,000', e: {} }] },
      '$60 \\div 3 = 20$ y $20 \\cdot 5 = 100$; $\\tfrac23$ de 75 son 50; y $64 \\div 2 = 32$.', 'Halla primero cuánto vale una sola parte.'),
    sol('La luz recorre $3 \\cdot 10^5$ km cada segundo. ¿Cuánto tarda en recorrer $1.5 \\cdot 10^8$ km?', ['Se divide: $1.5 \\div 3 =$ [[0.5]]', 'Los exponentes: $8 - 5 =$ [[3]]', 'Son $0.5 \\cdot 10^3 =$ [[500]] segundos'], ['13', '4.5', '50'], '$0.5 \\cdot 10^3 = 500$ s: algo más de 8 minutos.', 'Divide los números y resta los exponentes.'),
    err('Alguien suma $\\tfrac{1}{3} + \\tfrac{1}{4}$.', ['Se busca un denominador común: 12', '$\\tfrac{1}{3} = \\tfrac{4}{12}$ y $\\tfrac{1}{4} = \\tfrac{3}{12}$', 'La suma es $\\tfrac{7}{24}$'], 2, ['La suma es $\\tfrac{7}{12}$', 'La suma es $\\tfrac{2}{7}$', 'La suma es $\\tfrac{12}{7}$'], 'Las partes son doceavos: se suman y siguen siendo doceavos.', '¿De qué tamaño son las partes que se suman?'),
    opc('Una bacteria mide $2 \\cdot 10^{-6}$ m y un cabello tiene $8 \\cdot 10^{-5}$ m de grueso. El cabello es más grueso:', ['4 veces', '40 veces', '400 veces', '0.4 veces'], 1, '$\\tfrac{8}{2} = 4$ y $10^{-5+6} = 10$: 40 veces.', 'Divide los números y resta los exponentes.'),
  ]);

  const l2 = leccion('icf-ma-numeros-2', 'Conjuntos y diagramas', guion(
    ['Dos grupos', 'Solo A, solo B, los dos o ninguno.'],
    ['Unión e intersección', 'En alguno, o en los dos.'],
    ['Contar', 'Al sumar, los de los dos se cuentan dos veces: se restan una.'],
    ['Complemento y diferencia', 'Los que no están; los que están en uno y no en el otro.']), [
    x('cruce-grupos', 'De **50** personas, **28** hablan inglés, **20** francés y **9** ninguno. Mueve cuántas hablan **los dos**.', { a: 28, b: 20, total: 50, fuera: 9, A: 'inglés', B: 'francés' },
      'Hablan alguno $50 - 9 = 41$; $28 + 20 - 41 = 7$.', 'Quita primero a los que no hablan ninguno de los dos.'),
    x('llena-zonas', 'De **40** estudiantes, **22** juegan ajedrez, **15** pintan y **6** hacen las dos. Llena el diagrama.', { A: 'ajedrez', B: 'pintura', metas: ['16', '6', '9', '9'], fichas: ['16', '6', '9', '9', '22', '15', '3'], mira: ['Quita de los de ajedrez los que hacen las dos.', 'Es el dato que ya dan.', 'Quita de los de pintura los que hacen las dos.', 'Quita del total los que hacen algo.'], trampas: { '0:22': 'Entre los 22 están los que también pintan.', '2:15': 'Entre los 15 están los que también juegan.', '3:3': 'Los de las dos se restaron dos veces.' }, ok: 'Del centro hacia afuera.' },
      '$22 - 6 = 16$, $15 - 6 = 9$ y $40 - 31 = 9$ no hacen ninguna.', 'Empieza por el centro y ve llenando hacia afuera.'),
    x('pinta-zona', 'Toca las zonas de «**está en A o en B, pero no en los dos**».', { zonas: [0, 2], mira: ['Solo A cumple: está en uno.', 'El centro está en los dos: no cumple.', 'Solo B cumple: está en uno.', 'Los de afuera no están en ninguno.'], ok: 'Las dos lunas.' },
      'Cumplen las dos lunas: los de solo A y los de solo B.', 'Revisa cada zona y pregunta en cuántos grupos está.'),
    x('cuantos-conjunto', '**U** = números del 1 al 12; **A** = los pares; **B** = los múltiplos de 3. ¿Cuántos tiene cada uno?', { et: ['A', 'A y B a la vez', 'A o B', 'ni A ni B'], metas: ['6', '2', '8', '4'], fichas: ['6', '2', '8', '4', '10', '3'], mira: ['Cuenta los pares hasta 12.', 'Busca los múltiplos de 6.', 'Suma y quita los repetidos.', 'Quita del total los que están en alguno.'], trampas: { '2:10': 'Los de los dos se contaron dos veces.' }, ok: 'Contar sin repetir.' },
      'A tiene 6, los dos son 6 y 12, la unión $6 + 4 - 2 = 8$ y quedan 4.', 'Escribe las listas y busca los repetidos.'),
    x('verdad-conjuntos', 'A = {2, 4, 6, 8} y B = {4, 8}. Toca **todo** lo verdadero.', { casos: [{ t: 'B es subconjunto de A', si: true }, { t: 'A es subconjunto de B', no: 'El 2 está en A y no en B.' }, { t: 'A y B a la vez es B', si: true }, { t: '6 está en B', no: 'B solo tiene al 4 y al 8.' }, { t: 'A menos B es {2, 6}', si: true }], falta: 'Falta otra: revisa elemento por elemento.', ok: 'B está dentro de A.' },
      'Todo B está en A; lo común es B y al quitarlo quedan 2 y 6.', 'Revisa cada elemento en los dos conjuntos.'),
    x('sube-conjunto', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'A tiene **18**, B tiene **25** y en los dos hay **7**. ¿Cuántos están en **alguno**?', r: 36, c: '18 + 25 - 7', e: { 43: 'Los de los dos se contaron dos veces.' } },
      { q: 'De **60**, **35** tienen perro y **11** de ellos también gato. ¿Cuántos tienen **solo perro**?', r: 24, c: '35 - 11', e: { 49: 'Se quitan de los que tienen perro.' } },
      { q: 'Un conjunto tiene **4** elementos. ¿Cuántos **subconjuntos** tiene, con el vacío?', r: 16, c: '2^4', e: { 8: 'Cada elemento puede estar o no: se duplica por cada uno.', 4: 'También hay de dos, de tres, de ninguno…' } }] },
      '$18 + 25 - 7 = 36$; $35 - 11 = 24$; y $2^4 = 16$.', 'Al sumar dos grupos se quitan una vez los repetidos.'),
    sol('En una encuesta, el 60 % usa la red P, el 45 % la red Q y el 25 % las dos. ¿Qué porcentaje no usa ninguna?', ['Usan alguna: $60 + 45 - 25 =$ [[80]] %', 'No usan ninguna: [[20]] %', 'Usan solo P: [[35]] %'], ['105', '40', '60'], '$100 - 80 = 20$ y $60 - 25 = 35$.', 'Cuenta primero los que usan alguna.'),
    err('De 30 niños, 18 comen mango, 16 comen fresa y todos comen alguna.', ['Suman $18 + 16 = 34$', 'Hay 4 de más: son los que se contaron dos veces', 'Entonces 4 niños no comen fruta'], 2, ['Entonces 4 niños comen las dos', 'Entonces 34 niños comen las dos', 'Entonces 26 niños comen las dos'], 'Los que sobran en la suma son los que están en los dos grupos.', '¿Por qué la suma pasa de 30?'),
    opc('Todos los que bailan cantan, y algunos que cantan no bailan. El diagrama correcto muestra:', ['Dos círculos separados', 'El círculo de los que cantan dentro del de los que bailan', 'El círculo de los que bailan dentro del de los que cantan', 'Dos círculos iguales'], 2, 'Todo el que baila está entre los que cantan.', 'Pregunta qué grupo queda completo adentro del otro.'),
  ]);

  const l3 = leccion('icf-ma-numeros-3', 'Sucesiones y sus límites', guion(
    ['Aritmética', 'Siempre se suma lo mismo.'],
    ['Geométrica', 'Siempre se multiplica por lo mismo.'],
    ['El término n', 'Para llegar al lugar n se dan $n - 1$ pasos.'],
    ['El límite', 'El número al que se acerca cada vez más.']), [
    x('que-termino', 'La sucesión **5, 8, 11…** sigue igual. Mueve el lugar en que está el **44**.', { a: 5, d: 3, meta: 44, max: 20 },
      'Del 5 al 44 hay 39: 13 saltos de 3. Está en el lugar 14.', 'Cuenta los saltos: el lugar es uno más que los saltos.'),
    x('suma-o-multiplica', '¿Cada sucesión es **aritmética**, **geométrica** o **ninguna**?', { et: ['7, 4, 1, −2', '2, 6, 18, 54', '1, 4, 9, 16', '80, 40, 20, 10'], metas: ['aritmética', 'geométrica', 'ninguna', 'geométrica'], fichas: ['aritmética', 'geométrica', 'ninguna', 'geométrica', 'aritmética', 'ninguna'], mira: ['Resta los seguidos.', 'Divide los seguidos.', 'Prueba a restar y a dividir.', 'Divide los seguidos.'], ok: 'Diferencia fija o razón fija.' },
      'Se resta 3; se triplica; son cuadrados; y se parte en dos.', 'Resta términos seguidos y, si no sirve, divídelos.'),
    x('lugar-lejano', 'Pon el término que se pide.', { et: ['2, 7, 12…: lugar 10', '3, 6, 12…: lugar 6', '50, 46, 42…: lugar 8', '4n − 1: lugar 9'], metas: ['47', '96', '22', '35'], fichas: ['47', '96', '22', '35', '52', '192', '18'], mira: ['Son 9 saltos de 5.', 'Se duplica 5 veces.', 'Son 7 saltos hacia abajo.', 'Reemplaza n por 9.'], trampas: { '0:52': 'Al lugar 10 se llega con 9 saltos.', '1:192': 'Al lugar 6 se llega con 5 pasos.', '2:18': 'Al lugar 8 se llega con 7 saltos.' }, ok: 'Un salto menos que el lugar.' },
      '$2 + 9 \\cdot 5 = 47$; $3 \\cdot 2^5 = 96$; $50 - 7 \\cdot 4 = 22$; y $36 - 1 = 35$.', 'Para llegar al lugar n se dan $n - 1$ pasos.'),
    x('se-acerca-a', '¿A qué número se **acerca** cada sucesión?', { et: ['1, 1/2, 1/4, 1/8…', '0.9, 0.99, 0.999…', '3 + 1/n', '5, 5, 5, 5…'], metas: ['0', '1', '3', '5'], fichas: ['0', '1', '3', '5', '4', '1/8', '0.9'], mira: ['Cada uno es la mitad del anterior.', 'Cada vez le falta menos.', 'La fracción se hace diminuta.', 'No cambia.'], trampas: { '0:1/8': 'Sigue bajando: no se detiene ahí.', '2:4': 'Eso vale solo el primero.' }, ok: 'Acercarse, aunque no se llegue.' },
      'Las cuatro se acercan, en orden, a 0, a 1, a 3 y a 5.', 'Imagina un término muy lejano de cada sucesión.'),
    x('tiene-limite', 'Toca **todas** las sucesiones que se **acercan a un número**.', { casos: [{ t: '10, 1, 0.1, 0.01…', si: true }, { t: '2, 4, 6, 8…', no: 'Crece sin parar.' }, { t: '2 − 1/n', si: true }, { t: '1, −1, 1, −1…', no: 'Salta entre dos números y no se decide.' }, { t: '0.3, 0.33, 0.333…', si: true }], falta: 'Falta otra que se acerca cada vez más a un número.', ok: '0, 2 y un tercio.' },
      'Se acercan a 0, a 2 y a $\\tfrac13$; la otra crece y la última salta.', 'Pregunta si los términos lejanos quedan casi iguales.'),
    x('mitades-faltan', 'En cada paso se recorre la **mitad** de lo que falta. Mueve cuántos pasos hacen que falte **1/64** del camino.', { tope: 64, max: 10 },
      '$2^6 = 64$: después de 6 pasos falta $\\tfrac{1}{64}$.', 'Mira cuánto falta después de uno, dos y tres pasos.'),
    x('sube-sucesion', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Suma de **1 + 2 + 3 + … + 12**.', r: 78, c: '13 \\cdot 6', e: { 72: 'Cada pareja suma 13.' } },
      { q: 'El lugar **7** de una aritmética es **40** y el **10** es **58**. ¿Cuál es el **11**?', r: 64, c: '58 + 6', e: { 76: 'Los 18 se reparten en 3 saltos.' } },
      { q: 'A qué se acerca $16 + 8 + 4 + 2 + \\ldots$', r: 32, c: '16 \\cdot 2', e: { 30: 'Siguen sumándose mitades.' } }] },
      'Seis parejas de 13; saltos de 6; y cada vez falta la mitad para 32.', 'En la última, mira cuánto falta siempre para completar.'),
    sol('Un balón rebota a la mitad de la altura. Se suelta desde 8 m. ¿Cuánto sube en total en todos sus rebotes?', ['El primer rebote sube [[4]] m', 'El segundo sube [[2]] m', 'La suma de todos se acerca a [[8]] m'], ['16', '6', '1'], '$4 + 2 + 1 + \\ldots$: siempre falta lo último que se sumó para llegar a 8.', 'Suma los primeros y mira cuánto falta.'),
    err('Alguien halla el término 20 de 6, 10, 14…', ['Es aritmética: se suma 4', 'Para llegar al lugar 20 se dan 20 saltos', 'Al 6 se le suma lo que se avanzó en esos saltos'], 1, ['Para llegar al lugar 20 se dan 19 saltos', 'Para llegar al lugar 20 se dan 21 saltos', 'Para llegar al lugar 20 se dan 10 saltos'], 'Desde el primero hasta el 20 hay 19 saltos: $6 + 76 = 82$.', '¿Cuántos saltos hay del lugar 1 al 2?'),
    opc('La sucesión $\\dfrac{2n + 1}{n}$ da 3, 2.5, 2.33… Al crecer $n$ se acerca a:', ['0', '3', '1', '2'], 3, '$\\tfrac{2n + 1}{n} = 2 + \\tfrac1n$, y $\\tfrac1n$ se acerca a 0.', 'Prueba con un n muy grande.'),
  ]);

  return mundo('icf-ma-numeros', 'Números y Sucesiones', 'matematicas', [l1, l2, l3], [
    ['icf-ma-numeros-1', 'Cada lugar que corre la coma cambia el exponente.', play('salta-la-coma', 'Corre el **punto decimal** hasta dejarlo en notación científica', { rounds: [{ digits: '52700', point: 5, goal: 'sci' }] }, '$52\\,700 = 5.27 \\cdot 10^4$.', { hint: 'El número de adelante queda entre 1 y 10.' })],
    ['icf-ma-numeros-1', 'Para sumar, partes del mismo tamaño.', play('amplifica-fraccion', 'Completa cada fracción al común denominador', { rounds: [{ f1: ['1', ['2', '3']], f2: ['1', ['3', '5']], chips: ['5', '2', '3', '4'], sum: '\\dfrac{5 + 2}{30} = \\dfrac{7}{30}' }] }, 'A 6 le falta el 5 y a 15 le falta el 2 para ser 30.', { hint: 'Mira qué factor le falta a cada denominador.' })],
    ['icf-ma-numeros-1', 'Al dividir potencias se restan exponentes.', opc('El resultado de $(8 \\cdot 10^9) \\div (4 \\cdot 10^3)$ es:', ['$2 \\cdot 10^6$', '$2 \\cdot 10^3$', '$4 \\cdot 10^6$', '$2 \\cdot 10^{12}$'], 0, '$8 \\div 4 = 2$ y $9 - 3 = 6$.', 'Divide los números y resta los exponentes.')],
    ['icf-ma-numeros-2', 'Del centro hacia afuera.', play('encuesta-venn', 'Llena el diagrama de la encuesta', { rounds: [{ text: 'De 45 personas, 26 leen novelas, 18 leen poemas y 7 leen las dos cosas.', labels: ['Novelas', 'Poemas'], total: 45, a: 26, b: 18, both: 7 }] }, 'Solo novelas 19, las dos 7, solo poemas 11 y ninguna 8.', { hint: 'Empieza por los que leen las dos cosas.' })],
    ['icf-ma-numeros-2', 'La diferencia quita lo común.', play('pinta-venn', 'Pinta la operación en el diagrama', { rounds: [{ text: 'B − A', n: 2, f: (a, b) => b && !a }] }, 'Lo que está en B y no en A.', { hint: 'Revisa zona por zona si está en B y falta en A.' })],
    ['icf-ma-numeros-2', 'Los repetidos se restan una vez.', opc('En un grupo, 24 tienen bicicleta, 19 patines y 10 las dos cosas. ¿Cuántos tienen exactamente una?', ['43', '33', '23', '14'], 2, 'Solo bicicleta 14 y solo patines 9: son 23.', 'Quita los que tienen las dos a cada grupo.')],
    ['icf-ma-numeros-3', 'Dos términos bastan para hallar el salto.', play('pisa-huellas', 'Elige el primer paso y el salto para pisar las banderas', { rounds: [{ known: [[3, 14], [6, 26]], a1: 6, d: 4 }] }, 'De 14 a 26 hay 12 en 3 saltos: 4; y $14 - 8 = 6$.', { hint: 'Reparte la diferencia entre los saltos que hay.' })],
    ['icf-ma-numeros-3', 'Saltos que se achican tienen un límite.', play('rana-zenon', 'Toca el estanque para saltar y luego la **bandera** a la que se acerca', { rounds: [{ title: 'Saltos a la mitad', items: [{ a1: 6, r: [1, 2], flags: ['12', '9', '18'], answer: 0, max: 20 }] }] }, '$6 + 3 + 1.5 + \\ldots$ se acerca a 12.', { hint: 'Mira cuánto falta después de cada salto.' })],
    ['icf-ma-numeros-3', 'Al lugar n se llega con n − 1 pasos.', opc('El término 8 de la sucesión 3, 9, 15, 21… es:', ['48', '51', '54', '45'], 3, '$3 + 7 \\cdot 6 = 45$: siete saltos de 6.', 'Cuenta los saltos desde el primero.')],
  ]);
})());
