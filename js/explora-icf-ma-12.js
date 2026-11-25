// Preicfes · Matemáticas, mundos 12 «Dispersión y Comparación» y 13 «Números y Sucesiones» (Explora). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const eje = (K, y) => { const X = x => 30 + x * 28; let h = K.l(30, y, 310, y, 'lm'); for (let i = 0; i <= 10; i++) h += K.t(X(i), y + 18, i, 's tm'); return [X, h]; };
  // Tres datos alrededor del 5, a distancia s; m enciende el promedio y c los cuadrados.
  const datos = (v, K) => { const [X, h] = eje(K, 110); return h + K.f(v.c, K.r(X(5), 110 - v.s * 22, v.s * 22, v.s * 22, 'fg', 0)) + [5 - v.s, 5, 5 + v.s].map(x => K.c(X(x), 98, 7, 'fa')).join('') + K.f(v.m, K.l(X(5), 40, X(5), 110, 'lo d') + K.t(X(5), 32, 'promedio', 's tm')) + K.t(170, 152, v.t, 'ta'); };
  // Caja 1-3-5-8-10: k tramos encendidos.
  const caja = (v, K) => { const [X, h] = eje(K, 110), Q = [1, 3, 5, 8, 10]; return h + K.l(X(1), 70, X(10), 70, 'gr') + K.r(X(3), 54, X(8) - X(3), 32, 'fa', 2) + K.l(X(5), 54, X(5), 86, 'lg gr') + [0, 1, 2, 3].map(i => K.f(v.k - i, K.l(X(Q[i]), 34, X(Q[i + 1]), 34, i % 2 ? 'lo gr' : 'la gr') + K.t((X(Q[i]) + X(Q[i + 1])) / 2, 26, '25 %', 's'))).join('') + K.t(170, 152, v.t, 'ta'); };
  // Nube con pendiente s (1, −1 o 0) y línea l.
  const R = [0.4, -0.5, 0.2, -0.3, 0.5, -0.2, 0.3, -0.4], nube = (v, K) => { const X = x => 50 + x * 27, Y = y => 130 - y * 13; return K.l(40, 130, 310, 130, 'lm') + K.l(40, 10, 40, 130, 'lm') + R.map((r, i) => K.c(X(i + 1), Y(4.5 + v.s * (i - 3.5) + r * (2 + 5 * v.d)), 5, 'fa')).join('') + K.f(v.l, K.l(X(0.5), Y(4.5 - v.s * 4), X(8.5), Y(4.5 + v.s * 4), 'lg d')) + K.t(170, 156, v.t, 'ta'); };
  // Dos círculos con zonas: n solo A, centro, solo B, fuera.
  const venn = (v, K) => K.r(16, 8, 308, 130, 'fn', 6) + K.c(134, 73, 52, 'fa') + K.c(206, 73, 52, 'fg') + K.t(84, 28, 'A', 'b ta') + K.t(256, 28, 'B', 'b tg') + K.f(v.b, K.t(170, 78, '4', 'b')) + K.f(v.a, K.t(112, 78, '6', 'b') + K.t(228, 78, '3', 'b')) + K.f(v.u, K.t(300, 128, '7', 'b')) + K.t(170, 162, v.t, 'ta');
  // Camino que recorre la mitad de lo que falta.
  const mitad = (v, K) => { const q = 1 - 0.5 ** v.n; return K.l(30, 80, 310, 80, 'lm') + K.r(30, 70, 280 * q, 20, 'fa', 2) + K.t(30, 108, '0', 's') + K.t(310, 108, '1', 's') + K.t(170, 140, v.t, 'ta'); };

  xpLec('icf-ma-dispersion-1', [
    ['Regados o juntos',
      xpMira('dibujo', 'Empecemos por la idea: con el **mismo promedio**, los datos pueden estar juntos o **regados**.', { dib: datos, v: { s: 1, m: 0, c: 0, t: '' }, alto: 162 }, [
        ['Tres datos: cuatro, cinco y seis.', { m: 1 }],
        ['Ahora tres, cinco y siete: igual promedio.', { s: 2 }],
        ['Y uno, cinco y nueve: más regados.', { s: 4, t: 'mismo promedio, más dispersión' }],
        ['El rango mira solo los extremos.', {}, '$9 - 1 = 8$'],
        ['Hace falta mirar a todos los datos.', {}],
      ], 'Rango: el mayor menos el menor.'),
      xpHaz('fichas', 'Datos 2, 6, 7 y 13. Pon el promedio y el rango.', { slots: fila('promedio', 'rango'), fichas: ['7', '11', '6.5', '13', '28'], meta: ['7', '11'], alto: 96, pista: 'Suma y reparte; resta los extremos.' }, '$28 \\div 4 = 7$ y $13 - 2 = 11$.')],
    ['Varianza',
      xpMira('dibujo', 'Segunda idea: la **varianza** promedia los **cuadrados** de las desviaciones.', { dib: datos, v: { s: 2, m: 1, c: 0, t: '' }, alto: 162 }, [
        ['Las desviaciones son menos dos, cero y dos.', {}],
        ['Suman cero: por eso no sirven solas.', {}, '$-2 + 0 + 2 = 0$'],
        ['Se elevan al cuadrado.', { c: 1 }, '$4 + 0 + 4 = 8$'],
        ['Y esos cuadrados se promedian.', { t: 'varianza: 8 entre 3' }, '$8 \\div 3 \\approx 2.67$'],
        ['Más lejos, cuadrados más grandes.', { s: 3, t: 'varianza: 18 entre 3' }],
      ], 'Restar, elevar, promediar.'),
      xpHaz('fichas', 'Datos 4 y 10. Pon la suma de los cuadrados de las desviaciones y la varianza.', { slots: fila('suma', 'varianza'), fichas: ['18', '9', '6', '3', '36'], meta: ['18', '9'], alto: 96, pista: 'El promedio es 7: se apartan 3.' }, '$9 + 9 = 18$ y $18 \\div 2 = 9$.')],
    ['Desviación estándar',
      xpMira('hoja', 'Tercera idea: la **desviación estándar** es la **raíz** de la varianza.', { paras: [['Varianza 25 → desviación 5'], ['Sumar 100 a todos: no cambia'], ['Multiplicar todos por 3: se triplica'], ['Menor desviación: más parejo']] }, [
        ['Vuelve a la unidad de los datos.', { luz: [0] }],
        ['Correr los datos no los separa.', { luz: [1] }],
        ['Multiplicar sí los separa.', { luz: [2] }],
        ['Sirve para saber quién es más regular.', { luz: [3] }],
        ['No dice quién es mejor, sino más parejo.', {}],
      ], 'Raíz de la varianza.'),
      xpHaz('hoja', 'Dos máquinas llenan botellas de 500 mL en promedio. Subraya la **más confiable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Desviación de 1 mL'], ['Desviación de 12 mL'], ['Da igual: mismo promedio']], pista: 'Busca la que varía menos.' }, 'Varía menos: casi todas quedan cerca de 500.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'La varianza de unos tiempos (en s) es 36. Pon la desviación, y la desviación si todos tardan 4 s más.', { slots: fila('desviación', 'con 4 s más'), fichas: ['6', '6', '10', '18', '40'], meta: ['6', '6'], alto: 96, pista: 'Correr los datos no los separa.' }, '$\\sqrt{36} = 6$, y no cambia.')],
  ], 'Rango, cuadrados y raíz.');

  xpLec('icf-ma-dispersion-2', [
    ['Percentil',
      xpMira('hoja', 'Empecemos por la idea: el **percentil** dice qué porcentaje queda **por debajo**.', { paras: [['200 personas'], ['150 por debajo de Ana'], ['150 ÷ 200 = 75 %'], ['Percentil 75']] }, [
        ['Doscientas personas hicieron una prueba.', { luz: [0] }],
        ['Ciento cincuenta sacaron menos que Ana.', { luz: [1] }],
        ['Se divide entre el total.', { luz: [2] }],
        ['Ana está en el percentil 75.', { luz: [3] }],
        ['No es su nota: es su lugar entre los demás.', {}],
      ], 'Los de abajo entre el total.'),
      xpHaz('fichas', 'De 80 personas, 60 están por debajo. Pon el percentil y cuántas no están por debajo.', { slots: fila('percentil', 'no están'), fichas: ['75', '20', '60', '80', '25'], meta: ['75', '20'], alto: 96, pista: 'Divide 60 entre 80.' }, '$60 \\div 80 = 75\\%$ y $80 - 60 = 20$.')],
    ['La caja',
      xpMira('dibujo', 'Segunda idea: la caja parte los datos en **cuatro** grupos **iguales**.', { dib: caja, v: { k: 0, t: '' }, alto: 162 }, [
        ['Bigotes en uno y diez; caja de tres a ocho.', {}],
        ['La cuarta parte está hasta el primer corte.', { k: 1 }],
        ['La línea de adentro es la mediana.', { k: 2, t: 'mediana 5' }],
        ['La caja guarda la mitad central.', { k: 3, t: 'de 3 a 8: la mitad' }],
        ['Cada tramo tiene igual cantidad de datos.', { k: 4, t: 'tramo largo: más regados' }],
      ], 'Cuatro tramos, un cuarto en cada uno.'),
      xpHaz('fichas', 'Cuartiles 8, 11 y 20. Pon el largo de la caja y el porcentaje de datos hasta 11.', { slots: fila('caja', '%'), fichas: ['12', '50', '9', '25', '75'], meta: ['12', '50'], alto: 96, pista: '11 es la mediana.' }, '$20 - 8 = 12$ y la mitad queda hasta 11.')],
    ['Hallar los cortes',
      xpMira('fichas', 'Tercera idea: se **ordena** y se busca el **medio** de cada mitad.', { slots: fila('Q1', 'mediana', 'Q3'), fichas: ['3', '6', '11'], alto: 96 }, [
        ['Datos en orden: 2, 3, 5, 6, 9, 11 y 14.', {}],
        ['El del medio es seis.', { pon: { 1: '6' } }],
        ['A la izquierda: 2, 3 y 5. Su medio es tres.', { pon: { 0: '3' } }],
        ['A la derecha: 9, 11 y 14. Su medio es once.', { pon: { 2: '11' } }],
        ['La caja mide ocho.', {}, '$11 - 3 = 8$'],
      ], 'Ordenar, el medio y el medio de cada mitad.'),
      xpHaz('fichas', 'Datos: 1, 4, 4, 7, 8, 10 y 13. Pon el primer cuartil y la mediana.', { slots: fila('Q1', 'mediana'), fichas: ['4', '7', '8', '10', '1'], meta: ['4', '7'], alto: 96, pista: 'El del medio y el medio de los tres primeros.' }, 'El cuarto es 7; el medio de 1, 4 y 4 es 4.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'La caja de M va de 30 a 34; la de N, de 20 a 45. Subraya lo que se puede asegurar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['N tiene más datos'], ['La mitad central de M es más pareja'], ['M tiene mayor promedio']], pista: 'Compara el largo de las cajas.' }, 'La caja de M es más corta; lo demás no se sabe.')],
  ], 'Por debajo, cuatro tramos y el medio de cada mitad.');

  xpLec('icf-ma-dispersion-3', [
    ['La nube',
      xpMira('dibujo', 'Empecemos por la idea: en la **nube**, cada punto es un caso con **dos** datos.', { dib: nube, v: { s: 0.9, d: 0, l: 0, t: '' }, alto: 166 }, [
        ['Estos puntos suben de izquierda a derecha.', { t: 'correlación positiva' }],
        ['La línea de tendencia pasa por la mitad.', { l: 1 }],
        ['Si bajan, la correlación es negativa.', { s: -0.9, t: 'correlación negativa' }],
        ['Si no hay rumbo, casi no hay relación.', { s: 0, d: 1, l: 0, t: 'casi ninguna' }],
        ['Con la línea se puede predecir.', { s: 0.9, d: 0, l: 1, t: 'predecir' }],
      ], 'Sube, baja o no tiene rumbo.'),
      xpHaz('hoja', 'Subraya el par con correlación **negativa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Estudio y nota'], ['Velocidad y tiempo de viaje'], ['Estatura y talla de zapato']], pista: 'Una sube y la otra baja.' }, 'Más rápido, menos tiempo.')],
    ['Qué tan fuerte',
      xpMira('dibujo', 'Segunda idea: el **coeficiente** va de **−1 a 1**; cerca de los extremos es **fuerte**.', { dib: nube, v: { s: 1, d: -0.4, l: 1, t: 'r = 1' }, alto: 166 }, [
        ['Todos en línea y subiendo: uno.', {}],
        ['Algo regados: cerca de 0.9.', { d: 0.2, t: 'r ≈ 0.9' }],
        ['Muy regados: cerca de 0.3.', { s: 0.4, d: 1.2, t: 'r ≈ 0.3' }],
        ['En línea y bajando: menos uno.', { s: -1, d: -0.4, t: 'r = −1' }],
        ['El signo da el sentido, no la fuerza.', {}],
      ], 'Signo: sentido. Cercanía a 1 o −1: fuerza.'),
      xpHaz('hoja', 'Subraya la correlación **más fuerte**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['0.6'], ['0.1'], ['−0.92']], pista: 'No mires el signo: mira qué tan lejos está de 0.' }, '−0.92 está más cerca de −1.')],
    ['No es causa',
      xpMira('hoja', 'Tercera idea: **ir juntas no es causar**.', { paras: [['Más paraguas, más choques'], ['¿Los paraguas chocan carros?'], ['La lluvia explica las dos'], ['Para hablar de causa: experimento']] }, [
        ['Los días con más paraguas hay más choques.', { luz: [0] }],
        ['Pero los paraguas no tienen la culpa.', { luz: [1], tacha: [1] }],
        ['Una tercera cosa mueve a las dos.', { luz: [2] }],
        ['Un experimento cambia una sola cosa.', { luz: [3] }],
        ['También puede ser pura casualidad.', {}],
      ], 'Busca la tercera cosa.'),
      xpHaz('hoja', 'Los pueblos con más cigüeñas tienen más bebés. Subraya la mejor explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los pueblos grandes tienen más techos y más familias'], ['Las cigüeñas traen bebés'], ['Los bebés atraen cigüeñas']], pista: '¿Qué hace aumentar las dos cosas?' }, 'El tamaño del pueblo explica las dos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'La tendencia es y = 2x + 15. Pon lo que predice para x = 10 y el x en que predice 25.', { slots: fila('x = 10', 'y = 25'), fichas: ['35', '5', '25', '10', '65'], meta: ['35', '5'], alto: 96, pista: 'Reemplaza y después despeja.' }, '$20 + 15 = 35$ y $(25 - 15) \\div 2 = 5$.')],
  ], 'Rumbo, fuerza y cuidado con la causa.');

  xpLec('icf-ma-numeros-1', [
    ['El mismo número',
      xpMira('hoja', 'Empecemos por la idea: una fracción, un decimal y un porcentaje pueden ser el **mismo** número.', { paras: [['2/5 = 4/10'], ['= 0.4'], ['= 40 %'], ['1/3 = 0.333…'], ['√3 = 1.7320508…']] }, [
        ['Dos quintos son cuatro décimos.', { luz: [0] }],
        ['Es decir, cero punto cuatro.', { luz: [1] }],
        ['O cuarenta de cada cien.', { luz: [2] }],
        ['Un tercio se repite: es racional.', { luz: [3], nota: { 3: 'racional' } }],
        ['Este ni termina ni se repite.', { luz: [4], nota: { 4: 'irracional' } }],
      ], 'La raya de la fracción es una división.'),
      xpHaz('fichas', 'Pon 9/20 como decimal y 0.08 como porcentaje.', { slots: fila('9/20', '0.08'), fichas: ['0.45', '8 %', '0.92', '80 %', '9.20'], meta: ['0.45', '8 %'], alto: 96, pista: 'Lleva 9/20 a denominador 100.' }, '$\\tfrac{45}{100}$ y $\\tfrac{8}{100}$.')],
    ['Sumar y multiplicar',
      xpMira('hoja', 'Segunda idea: para **sumar** hacen falta partes **iguales**; para **multiplicar**, no.', { paras: [['1/2 + 1/5'], ['5/10 + 2/10'], ['7/10'], ['2/3 de 3/5 = 6/15 = 2/5']] }, [
        ['Medios y quintos son de distinto tamaño.', { luz: [0] }],
        ['Se pasan todos a décimos.', { luz: [1] }],
        ['Y se suman: siete décimos.', { luz: [2] }],
        ['«De» se vuelve multiplicación.', { luz: [3] }],
        ['Se multiplica arriba y abajo.', { luz: [3] }],
      ], 'Sumar: igualar partes. De: multiplicar.'),
      xpHaz('fichas', 'Pon 1/4 + 1/6, y 3/4 de 2/3.', { slots: fila('suma', 'de'), fichas: ['5/12', '1/2', '2/10', '5/7', '1/12'], meta: ['5/12', '1/2'], alto: 96, pista: 'Usa doceavos en la suma.' }, '$\\tfrac{3 + 2}{12}$ y $\\tfrac{6}{12}$.')],
    ['Notación científica',
      xpMira('fichas', 'Tercera idea: un número **entre 1 y 10** por una **potencia de 10**.', { slots: fila('número', 'potencia'), fichas: ['7.2', '10⁶'], alto: 96 }, [
        ['Siete millones doscientos mil.', {}, '$7\\,200\\,000$'],
        ['El número queda entre uno y diez.', { pon: { 0: '7.2' } }],
        ['La coma corrió seis lugares.', { pon: { 1: '10⁶' } }, '$7.2 \\cdot 10^6$'],
        ['Los pequeños llevan exponente negativo.', {}, '$0.003 = 3 \\cdot 10^{-3}$'],
        ['Al multiplicar, los exponentes se suman.', {}, '$10^6 \\cdot 10^2 = 10^8$'],
      ], 'Grandes: positivo. Pequeños: negativo.'),
      xpHaz('fichas', 'Pon el exponente de 950 000 y el de 0.00095, con 9.5 adelante.', { slots: fila('950 000', '0.00095'), fichas: ['5', '−4', '4', '−5', '6'], meta: ['5', '−4'], alto: 96, pista: 'Cuenta los lugares que corre la coma.' }, '$9.5 \\cdot 10^5$ y $9.5 \\cdot 10^{-4}$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un libro de 2 · 10² hojas mide 2 · 10⁻² m de grueso. Subraya el grueso de cada hoja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['10⁴ m'], ['10⁻⁴ m'], ['4 · 10⁰ m']], pista: 'Divide y resta los exponentes.' }, '$\\tfrac{2}{2} = 1$ y $-2 - 2 = -4$.')],
  ], 'El mismo número, partes iguales y potencias.');

  xpLec('icf-ma-numeros-2', [
    ['Cuatro zonas',
      xpMira('dibujo', 'Empecemos por la idea: con **dos** grupos hay **cuatro** zonas.', { dib: venn, v: { a: 0, b: 0, u: 0, t: '' }, alto: 172 }, [
        ['Veinte personas; diez en A y siete en B.', { t: '20 en total' }],
        ['Cuatro están en los dos: al centro.', { b: 1 }],
        ['Quedan seis solo en A y tres solo en B.', { a: 1 }, '$10 - 4 \\; y \\; 7 - 4$'],
        ['Los demás quedan afuera.', { u: 1 }, '$20 - 13 = 7$'],
        ['Se llena del centro hacia afuera.', { t: 'del centro hacia afuera' }],
      ], 'Centro, lunas y afuera.'),
      xpHaz('fichas', 'De 30: 18 en A, 14 en B y 8 en los dos. Pon solo A y los de afuera.', { slots: fila('solo A', 'afuera'), fichas: ['10', '6', '18', '8', '2'], meta: ['10', '6'], alto: 96, pista: 'Empieza por el centro.' }, '$18 - 8 = 10$; $30 - 24 = 6$.')],
    ['Operaciones',
      xpMira('hoja', 'Segunda idea: **unión**, **intersección**, **diferencia** y **complemento**.', { paras: [['A = {1, 2, 3, 4}, B = {3, 4, 5}'], ['Unión: {1, 2, 3, 4, 5}'], ['Intersección: {3, 4}'], ['A − B: {1, 2}'], ['Complemento de A: lo que no está en A']] }, [
        ['Dos conjuntos con elementos comunes.', { luz: [0] }],
        ['En alguno de los dos, sin repetir.', { luz: [1] }],
        ['En los dos a la vez.', { luz: [2] }],
        ['En A, pero no en B.', { luz: [3] }],
        ['Todo lo demás del universo.', { luz: [4] }],
      ], 'Alguno, los dos, uno y no el otro, lo demás.'),
      xpHaz('hoja', 'P = {a, e, o} y Q = {e, i}. Subraya **P − Q**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['{e}'], ['{i}'], ['{a, o}']], pista: 'Quita de P lo que también está en Q.' }, 'La e está en los dos: quedan a y o.')],
    ['Contar la unión',
      xpMira('fichas', 'Tercera idea: al sumar, los **repetidos** se cuentan **dos** veces.', { slots: fila('A', 'B', 'en alguno'), fichas: ['12', '9', '16'], alto: 96 }, [
        ['Doce cantan y nueve bailan.', { pon: { 0: '12', 1: '9' } }],
        ['Cinco hacen las dos cosas.', {}],
        ['Al sumar se contaron dos veces.', {}, '$12 + 9 = 21$'],
        ['Se quitan una vez.', { pon: { 2: '16' } }, '$21 - 5 = 16$'],
        ['Con esa cuenta también se halla el cruce.', {}, '$12 + 9 - 16 = 5$'],
      ], 'Sumar y quitar una vez lo repetido.'),
      xpHaz('fichas', 'En alguno hay 40; A tiene 25 y B, 23. Pon los de los dos y los de solo B.', { slots: fila('los dos', 'solo B'), fichas: ['8', '15', '48', '17', '23'], meta: ['8', '15'], alto: 96, pista: 'Suma y resta lo que pasa de 40.' }, '$48 - 40 = 8$ y $23 - 8 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'De 100 hogares, 70 tienen internet y 50 televisión por cable; 15 no tienen nada. Subraya cuántos tienen las dos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['20'], ['35'], ['85']], pista: 'Quita primero los 15.' }, '$70 + 50 - 85 = 35$.')],
  ], 'Zonas, operaciones y repetidos.');

  xpLec('icf-ma-numeros-3', [
    ['Sumar lo mismo',
      xpMira('fichas', 'Empecemos por la idea: en la **aritmética** siempre se **suma** lo mismo.', { slots: fila('lugar 1', 'lugar 2', 'lugar 10'), fichas: ['4', '10', '58'], alto: 96 }, [
        ['Empieza en cuatro y suma seis.', { pon: { 0: '4' } }],
        ['El segundo es diez.', { pon: { 1: '10' } }],
        ['Al lugar diez se llega con nueve saltos.', {}, '$9 \\cdot 6 = 54$'],
        ['Cuatro más 54 son 58.', { pon: { 2: '58' } }],
        ['Siempre un salto menos que el lugar.', {}],
      ], 'Primero más (lugar − 1) saltos.'),
      xpHaz('fichas', '9, 13, 17… Pon el salto y el término del lugar 6.', { slots: fila('salto', 'lugar 6'), fichas: ['4', '29', '33', '24', '6'], meta: ['4', '29'], alto: 96, pista: 'Son cinco saltos.' }, '$9 + 5 \\cdot 4 = 29$.')],
    ['Multiplicar por lo mismo',
      xpMira('hoja', 'Segunda idea: en la **geométrica** siempre se **multiplica** por lo mismo.', { paras: [['5, 10, 20, 40: por 2'], ['81, 27, 9, 3: por 1/3'], ['Lugar 5 de la primera: 5 · 2⁴ = 80'], ['1, 4, 9, 16: ninguna de las dos']] }, [
        ['Se divide uno entre el anterior: dos.', { luz: [0] }],
        ['También puede ir bajando.', { luz: [1] }],
        ['Cuatro pasos para el lugar cinco.', { luz: [2] }],
        ['Los cuadrados no son ni una ni otra.', { luz: [3] }],
        ['Resta y divide para saber.', {}],
      ], 'Primero por razón a la (lugar − 1).'),
      xpHaz('fichas', '2, 10, 50… Pon la razón y el lugar 5.', { slots: fila('razón', 'lugar 5'), fichas: ['5', '1250', '250', '8', '6250'], meta: ['5', '1250'], alto: 96, pista: 'Multiplica por 5 cuatro veces.' }, '$2 \\cdot 5^4 = 1\\,250$.')],
    ['El límite',
      xpMira('dibujo', 'Tercera idea: algunas sucesiones se **acercan** a un número sin pasarlo.', { dib: mitad, v: { n: 0, t: '' }, alto: 150 }, [
        ['Cada paso recorre la mitad de lo que falta.', {}],
        ['Primero se recorre la mitad.', { n: 1, t: '1/2' }, '$\\tfrac12$'],
        ['Luego van tres cuartos del camino.', { n: 2, t: '3/4' }],
        ['Luego van siete octavos del camino.', { n: 3, t: '7/8' }],
        ['Se acerca a uno todo lo que se quiera.', { n: 8, t: 'se acerca a 1' }],
      ], 'El límite es a donde se acerca.'),
      xpHaz('hoja', 'Subraya a qué se acerca 7 − 1/n.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['7'], ['6'], ['0']], pista: 'Piensa en un n enorme.' }, 'La fracción casi desaparece.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un remedio: 20 mg hoy y cada día la mitad. Subraya a cuánto se acerca el total.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['30 mg'], ['40 mg'], ['Crece sin parar']], pista: 'Siempre falta lo último que se tomó.' }, '$20 + 10 + 5 + \\ldots$ se acerca a 40.')],
  ], 'Sumar, multiplicar y acercarse.');
}
