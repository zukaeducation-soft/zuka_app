// Preuniversitario · mundo 16 «Probabilidad»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const COIN = [['C', 1, 2], ['S', 1, 2]];
  setLesson('pu-pb-1', [
    play('tabla-dados', 'Los 36 resultados de dos dados', { rounds: [
      { say: 'la suma es 8', f: (a, b) => a + b === 8 },
      { say: 'salen dobles', f: (a, b) => a === b },
      { say: 'el producto es par', f: (a, b) => (a * b) % 2 === 0 },
    ] }, 'Suma 8: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2), así que $\\tfrac{5}{36}$. Dobles: 6 de 36, $\\tfrac16$. Producto par: basta un dado par, 27 de 36, $\\tfrac34$.',
      { hint: 'Recorre la tabla fila por fila: cada casilla es un resultado igual de probable.' }),
    play('urna-fraccion', 'Arma la urna', { rounds: [{ color: 'coral', others: [['sky', 4]], target: [1, 3] }, { color: 'mint', others: [['sky', 3], ['sun', 3]], target: [2, 5] }] },
      'Con 2 rojas y 4 azules, $P(\\text{roja}) = \\tfrac26 = \\tfrac13$. Con 4 verdes y 6 de otros colores, $\\tfrac{4}{10} = \\tfrac25$.',
      { hint: 'Cada bola que echas suma a los favorables y también a los posibles.' }),
    play('ruleta-sectores', 'Pinta la ruleta', { rounds: [{ n: 8, target: [3, 8] }, { n: 12, target: [1, 4] }] },
      'Con 8 sectores iguales, $\\tfrac38$ son 3 sectores. Con 12, un cuarto son 3.',
      { hint: 'Convierte la fracción a una con el número de sectores abajo.' }),
    play('arbol-opciones', 'El espacio muestral', { rounds: [{ levels: [{ name: 'resultados de la moneda', n: 2 }, { name: 'resultados del dado', n: 6 }], miss: 1, total: 12 }] },
      'Una moneda y un dado: $2 \\cdot 6 = 12$ resultados posibles, todos igual de probables.',
      { hint: 'Cada resultado de la moneda se combina con cada uno del dado.' }),
    play('rueda-porcentaje', 'La probabilidad como parte del todo', { rounds: [{ part: 9, whole: 36 }, { part: 12, whole: 48 }], tol: 1 },
      '9 de 36 resultados son $\\tfrac14$, el 25 %. 12 de 48 también.',
      { hint: 'Favorables entre posibles.' }),
    play('cubo-pintado', 'Un cubito al azar', { rounds: [{ n: 3 }] },
      'De los 27 cubitos, 8 tienen tres caras pintadas: $P = \\tfrac{8}{27}$; solo 1 no tiene ninguna: $\\tfrac{1}{27}$.',
      { hint: 'Cuenta cuántos hay de cada tipo; la probabilidad es ese conteo entre 27.' }),
    play('vuela-precios', 'Vuela a la probabilidad', { rounds: [{ title: 'Laplace', items: [
      { ask: 'Un dado: P(sale un primo)', options: ['1/2', '1/3', '2/3'], answer: 0 },
      { ask: 'Moneda y dado: resultados posibles', options: ['12', '8', '36'], answer: 0 },
      { ask: '3 rojas y 5 azules: P(roja)', options: ['3/8', '3/5', '5/8'], answer: 0 },
    ] }] }, 'Primos del dado: 2, 3 y 5: $\\tfrac36$. $2 \\cdot 6 = 12$. 3 de 8 bolas.',
      { hint: 'Favorables sobre posibles.' }),
  ]);

  setLesson('pu-pb-2', [
    play('arbol-caminos', 'El árbol de probabilidades', { rounds: [
      { steps: [COIN, COIN, COIN], say: 'sale al menos una cara', f: pa => pa.some(i => i === 0) },
      { steps: [[['R', 2, 5], ['A', 3, 5]], [['R', 2, 5], ['A', 3, 5]]], say: 'las dos son del mismo color', f: pa => pa[0] === pa[1] },
    ] }, 'Al menos una cara son 7 de los 8 caminos: $1 - \\tfrac18 = \\tfrac78$. Mismo color: $\\tfrac{4}{25} + \\tfrac{9}{25} = \\tfrac{13}{25}$.',
      { hint: 'Cada camino multiplica sus ramas; los caminos que sirven se suman.' }),
    play('area-probabilidad', 'Independientes: el área', { rounds: [{ a: [1, 2], b: null, both: [1, 6], grid: 6 }, { a: null, b: [3, 4], both: [3, 8], grid: 8 }] },
      '$\\tfrac12 \\cdot P(B) = \\tfrac16$ da $P(B) = \\tfrac13$. $P(A) \\cdot \\tfrac34 = \\tfrac38$ da $P(A) = \\tfrac12$.',
      { hint: 'El área del rectángulo es ancho por alto.' }),
    play('tabla-dados', 'Al menos un 6', { rounds: [{ say: 'sale al menos un 6', f: (a, b) => a === 6 || b === 6 }, { say: 'NO salen dobles', f: (a, b) => a !== b }] },
      'Al menos un 6: 11 casillas (no 12: el (6, 6) se cuenta una vez). Es $1 - \\tfrac{25}{36}$. No dobles: $1 - \\tfrac16 = \\tfrac56$.',
      { hint: 'Fíjate en la casilla que está en la fila y en la columna a la vez.' }),
    play('complemento-conteo', 'Al menos una cara', { rounds: [{ ask: 'Resultados de 3 monedas con al menos una cara', slots: ['moneda 1', 'moneda 2', 'moneda 3'], all: [2, 2, 2], none: [1, 1, 1], tray: [2, 1, 3, 0] }] },
      'Todos: $2^3 = 8$; ninguna cara: 1 (SSS). Al menos una: $8 - 1 = 7$, la probabilidad $\\tfrac78$.',
      { hint: 'Cuenta los que NO sirven y réstalos.' }),
    play('solapa-barras', 'Cuando se puede sumar y cuando no', { rounds: [{ labels: ['ven fútbol', 'ven tenis'], total: 40, a: 24, b: 18, none: 6 }] },
      'No se puede sumar 24 + 18: los que ven los dos quedan contados dos veces. La unión es 34, así que 8 ven los dos.',
      { hint: 'Si los dos sucesos pueden pasar a la vez, hay que restar la parte común.' }),
    play('ruleta-sectores', 'El complemento en la ruleta', { rounds: [{ n: 10, target: [3, 10], not: true }] },
      'Para que NO caer tenga $\\tfrac{3}{10}$, caer debe tener $\\tfrac{7}{10}$: 7 sectores pintados.',
      { hint: '$P(\\text{no}) = 1 - P$.' }),
    play('rompe-cambios', 'Manda la pelota a la probabilidad', { miss: 'complemento: 1 − P', rounds: [{ title: 'Probabilidades', items: [
      { ask: 'P(lluvia) = 0.3: P(no lluvia)', options: ['0.7', '0.3', '1.3'], answer: 0 },
      { ask: 'Dos caras seguidas', options: ['1/4', '1/2', '1'], answer: 0 },
      { ask: 'Al menos un 6 en dos dados', options: ['11/36', '12/36', '1/6'], answer: 0 },
    ] }] }, '$1 - 0.3 = 0.7$. $\\tfrac12 \\cdot \\tfrac12 = \\tfrac14$. $1 - \\tfrac{25}{36} = \\tfrac{11}{36}$.',
      { hint: 'Complemento y producto.' }),
  ]);

  setExam('pu-probabilidad', 'Probabilidad', [
    ['pu-pb-1', 'Con resultados igual de probables, P = favorables / posibles.',
      play('tabla-dados', 'Dados', { rounds: [{ say: 'la suma es 10', f: (a, b) => a + b === 10 }] }, '(4, 6), (5, 5), (6, 4): $\\tfrac{3}{36} = \\tfrac{1}{12}$.', { hint: 'Cuenta.' })],
    ['pu-pb-1', 'Cada bola cuenta en los posibles.',
      play('urna-fraccion', 'Urna', { rounds: [{ color: 'sun', others: [['coral', 6]], target: [1, 4] }] }, '2 amarillas y 6 rojas: $\\tfrac28$.', { hint: 'Posibles.' })],
    ['pu-pb-2', 'Para independientes se multiplica a lo largo del camino.',
      play('arbol-caminos', 'Árbol', { rounds: [{ steps: [COIN, COIN], say: 'salen dos sellos', f: pa => pa[0] === 1 && pa[1] === 1 }] }, '$\\tfrac12 \\cdot \\tfrac12 = \\tfrac14$.', { hint: 'Producto.' })],
    ['pu-pb-2', 'P(A y B) = P(A) · P(B) si son independientes.',
      play('area-probabilidad', 'Área', { rounds: [{ a: [2, 3], b: null, both: [1, 3], grid: 6 }] }, '$\\tfrac23 \\cdot P(B) = \\tfrac13$: $P(B) = \\tfrac12$.', { hint: 'Área.' })],
  ]);
});

// Mundo 16 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-pb-1', [
    ['tabla-dados', 0, 'En un juego de mesa se lanzan dos dados. Marca los resultados en que la suma es 8', 'Suma 8: (2, 6), (3, 5), (4, 4), (5, 3) y (6, 2). Son 5 de 36 resultados: $\\tfrac{5}{36}$.'],
    ['urna-fraccion', 1, 'En la urna hay 3 bolas azules y 3 amarillas. Echa verdes hasta que la probabilidad de sacar verde sea $\\tfrac25$', 'Con 4 verdes hay 10 bolas: $\\tfrac{4}{10} = \\tfrac25$. Cada bola que se echa cuenta en los favorables y en los posibles.'],
    ['ruleta-sectores', 0, 'Una ruleta de feria tiene 8 sectores iguales. Pinta los premiados para que ganar tenga probabilidad $\\tfrac38$', 'Con 8 sectores igual de probables, $\\tfrac38$ son 3 sectores.'],
    ['arbol-opciones', 0, 'Se lanza una moneda y un dado. Completa el árbol del espacio muestral', 'Cada resultado de la moneda se combina con cada uno del dado: $2 \\cdot 6 = 12$ resultados igual de probables.'],
    ['rueda-porcentaje', 0, 'En 9 de los 36 resultados de dos dados gana Ana. Gira hasta esa parte', '$\\tfrac{9}{36} = \\tfrac14$: gana con probabilidad del 25 %.'],
    ['cubo-pintado', 0, 'Un cubo pintado se corta en 27 cubitos y se saca uno al azar. Clasifícalos para hallar las probabilidades', 'De 27 cubitos, 8 tienen tres caras pintadas ($\\tfrac{8}{27}$), 12 tienen dos, 6 tienen una y solo 1 no tiene ninguna.'],
    ['vuela-precios', 0, 'Vuela a la probabilidad', 'Primos del dado: 2, 3 y 5, $\\tfrac36 = \\tfrac12$. Moneda y dado: 12 resultados. Tres rojas de 8 bolas: $\\tfrac38$.'],
  ], [
    sol('Se lanzan dos dados corrientes. ¿Cuál es la probabilidad de que la suma de los dos resultados sea mayor que 9?',
      ['Con dos dados hay $6 \\cdot 6 =$ [[36]] resultados igual de probables', 'Suma 10: tres parejas. Suma 11: [[2]] parejas. Suma 12: una sola', 'Favorables: $3 + 2 + 1 =$ [[6]]', 'Probabilidad: $\\tfrac{6}{36}$, que simplificada es [[$\\tfrac16$]]'],
      ['$\\tfrac14$', '11', '3'],
      'Los 36 pares son igual de probables; las sumas no. Por eso se cuentan pares: (4, 6), (5, 5), (6, 4), (5, 6), (6, 5) y (6, 6).',
      'Haz la lista de las parejas, no de las sumas: (4, 6) y (6, 4) son resultados distintos.'),
    err('En una bolsa hay 4 bolas rojas, 6 azules y 5 verdes. Se saca una bola al azar. ¿Cuál es la probabilidad de que NO sea azul?',
      ['En total hay $4 + 6 + 5 = 15$ bolas', 'No son azules las rojas y las verdes: $4 + 5 = 9$', 'Probabilidad: $\\tfrac{9}{6} = \\tfrac32$'], 2,
      ['Probabilidad: $\\tfrac{9}{15} = \\tfrac35$', 'Probabilidad: $\\tfrac{6}{15} = \\tfrac25$', 'Probabilidad: $\\tfrac{9}{24} = \\tfrac38$'],
      'Los casos posibles son todas las bolas (15), no las azules. Además, una probabilidad nunca pasa de 1: $\\tfrac32$ avisa del error.',
      'Toda probabilidad está entre 0 y 1. ¿Lo cumple la respuesta?'),
    opc('Se tienen diez tarjetas numeradas del 1 al 10 y se saca una al azar. La probabilidad de que el número de la tarjeta sea múltiplo de 3 o mayor que 7 es:',
      ['$\\tfrac35$', '$\\tfrac12$', '$\\tfrac{3}{10}$', '$\\tfrac25$'], 1,
      'Múltiplos de 3: 3, 6 y 9. Mayores que 7: 8, 9 y 10. El 9 está en las dos listas: sirven 5 tarjetas de 10.',
      'Escribe los números que sirven en cada condición y no cuentes dos veces el que se repite.'),
  ]);

  diezLesson('pu-pb-2', [
    ['arbol-caminos', 1, 'De una caja con 2 fichas rojas y 3 azules se saca una, se devuelve y se saca otra. Marca los caminos en que salen del mismo color', 'Roja y roja: $\\tfrac25 \\cdot \\tfrac25 = \\tfrac{4}{25}$. Azul y azul: $\\tfrac35 \\cdot \\tfrac35 = \\tfrac{9}{25}$. Los dos caminos se suman: $\\tfrac{13}{25}$. Aquí la ficha se devuelve, por eso la segunda rama vuelve a valer $\\tfrac25$. Si NO se devolviera, la caja cambiaría: después de una roja quedarían 1 roja y 3 azules, y la segunda rama valdría $\\tfrac14$.'],
    ['area-probabilidad', 0, 'Dos sucesos independientes: $P(A) = \\tfrac12$ y $P(A \\text{ y } B) = \\tfrac16$. Halla $P(B)$ con el área', 'En independientes, $P(A \\text{ y } B) = P(A) \\cdot P(B)$: $\\tfrac12 \\cdot P(B) = \\tfrac16$ da $P(B) = \\tfrac13$.'],
    ['tabla-dados', 0, 'Con dos dados, marca los resultados en que sale al menos un 6', 'Son 11 resultados, no 12: el (6, 6) está en la fila y en la columna a la vez. También se ve como $36 - 25$.'],
    ['complemento-conteo', 0, 'Tres monedas: cuenta los resultados con al menos una cara', 'Todos: $2^3 = 8$. Sin ninguna cara: 1. Con al menos una: 7, y la probabilidad es $\\tfrac78$.'],
    ['solapa-barras', 0, 'De 40 personas, 24 ven fútbol, 18 ven tenis y 6 no ven ninguno. Solapa las barras', 'Ven algo 34 personas. Como $24 + 18 = 42$, hay 8 que ven los dos: por eso no se pueden sumar las dos probabilidades sin restar.'],
    ['ruleta-sectores', 0, 'En una ruleta de 10 sectores, NO ganar debe tener probabilidad $\\tfrac{3}{10}$. Pinta los que ganan', 'Si no ganar vale $\\tfrac{3}{10}$, ganar vale $1 - \\tfrac{3}{10} = \\tfrac{7}{10}$: 7 sectores.'],
    ['rompe-cambios', 0, 'Manda la pelota a la probabilidad', '$1 - 0.3 = 0.7$. Dos caras seguidas: $\\tfrac12 \\cdot \\tfrac12 = \\tfrac14$. Al menos un 6 con dos dados: $1 - \\tfrac{25}{36} = \\tfrac{11}{36}$.'],
  ], [
    sol('Una bodega tiene tres alarmas que funcionan cada una por su lado. Cada alarma suena ante un intruso con probabilidad 0.7. Si entra un intruso, ¿cuál es la probabilidad de que suene al menos una alarma?',
      ['Lo contrario de «al menos una suena» es «[[ninguna suena]]»', 'Cada alarma se queda callada con probabilidad $1 - 0.7 =$ [[0.3]]', 'Se quedan calladas las tres: $0.3 \\cdot 0.3 \\cdot 0.3 =$ [[0.027]]', 'Suena al menos una: $1 - 0.027 =$ [[0.973]]'],
      ['todas suenan', '0.09', '0.343', '2.1'],
      'Con tres intentos solo cambia el caso contrario: que fallen los tres, un factor por intento. En $0.3^3$ se multiplica $3 \\cdot 3 \\cdot 3 = 27$ y, como hay tres factores con una cifra decimal, el resultado lleva tres: $0.027$. Con dos factores ($0.09$) faltaría una alarma; $0.7^3 = 0.343$ es que suenen las tres, y sumar $0.7 + 0.7 + 0.7 = 2.1$ no puede ser una probabilidad.',
      '«Al menos una» reúne muchos casos. ¿Cuál es el único que queda por fuera? Multiplica una vez por cada alarma.'),
    err('En una bolsa hay 4 bolas rojas y 6 azules. Se sacan dos bolas, una después de la otra y sin devolver la primera. ¿Cuál es la probabilidad de que las dos sean rojas?',
      ['La primera es roja con probabilidad $\\tfrac{4}{10}$', 'La segunda es roja con probabilidad $\\tfrac{4}{10}$, porque la bolsa es la misma', 'Las dos cosas pasan a la vez: $\\tfrac{4}{10} \\cdot \\tfrac{4}{10} = \\tfrac{16}{100}$'], 1,
      ['Si la primera fue roja, quedan 3 rojas entre 9 bolas: la segunda es roja con probabilidad $\\tfrac{3}{9}$', 'Si la primera fue roja, quedan 3 rojas entre 10 bolas: $\\tfrac{3}{10}$', 'Si la primera fue roja, quedan 4 rojas entre 9 bolas: $\\tfrac{4}{9}$'],
      'Sacar sin devolver cambia la bolsa: hay una bola menos en total y una roja menos. La segunda probabilidad se calcula con lo que quedó: $\\tfrac{4}{10} \\cdot \\tfrac{3}{9} = \\tfrac{12}{90} = \\tfrac{2}{15}$. Solo si la bola se devuelve se repite $\\tfrac{4}{10}$ (y entonces el producto de dos sucesos independientes sí sería $\\tfrac{4}{10} \\cdot \\tfrac{4}{10}$).',
      'Imagina que ya sacaste una roja y la dejaste afuera. ¿Cuántas bolas hay ahora en la bolsa y cuántas son rojas?'),
    opc('En una caja hay 3 bombillos defectuosos y 7 buenos. Se sacan dos bombillos al azar, uno después del otro y sin devolver el primero. La probabilidad de que los dos sean buenos es:',
      ['$\\tfrac{49}{100}$', '$\\tfrac{7}{10}$', '$\\tfrac{7}{15}$', '$\\tfrac{21}{50}$'], 2,
      'El primero es bueno con probabilidad $\\tfrac{7}{10}$; para el segundo quedan 6 buenos de 9: $\\tfrac{7}{10} \\cdot \\tfrac{6}{9} = \\tfrac{42}{90} = \\tfrac{7}{15}$.',
      'Al no devolver el primer bombillo, la caja cambia: cuenta cuántos buenos y cuántos en total quedan.'),
  ]);

  addExam('pu-probabilidad', [
    ['pu-pb-1', 'Con resultados igual de probables, P = favorables / posibles.',
      opc('Se lanza un dado corriente. La probabilidad de obtener un número mayor que 4 es:', ['$\\tfrac12$', '$\\tfrac23$', '$\\tfrac16$', '$\\tfrac13$'], 3,
        'Sirven el 5 y el 6: $\\tfrac26 = \\tfrac13$.', 'Cuenta cuáles caras del dado sirven.')],
    ['pu-pb-2', 'P(no A) = 1 − P(A).',
      opc('La probabilidad de que llueva mañana es 0.35. La probabilidad de que no llueva es:', ['0.65', '0.35', '1.35', '0.5'], 0,
        '$1 - 0.35 = 0.65$.', 'Llover y no llover completan el total, que es 1.')],
  ]);
});
