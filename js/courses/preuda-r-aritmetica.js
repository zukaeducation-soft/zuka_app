// Preuniversitario · mundo 12 «Aritmética y promedios»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const N = (v, w) => [...w].reduce((a, c) => a * 10 + v[c], 0);
  const X = n => Math.floor(n / 10), Y = n => n % 10, REV = n => 10 * Y(n) + X(n);

  setLesson('pu-ar-1', [
    play('corta-lo-que-queda', 'Gastar de lo que queda', { rounds: [
      { total: 90000, steps: [[1, 3, 'total'], [2, 3, 'resto']] },
      { total: 80000, steps: [[1, 4, 'total'], [1, 2, 'resto'], [1, 3, 'resto']] },
    ] }, 'Con 90 000: $\\tfrac13$ son 30 000 y quedan 60 000; $\\tfrac23$ de eso son 40 000 y quedan 20 000. Con 80 000: quedan 60 000, luego 30 000 y al final 20 000. Cada fila parte lo que había antes de esa compra.',
      { hint: 'La barra de cada fila es lo que quedaba, no el total: pártela en las partes que dice la fracción.' }),
    play('area-queda', 'Multiplicar lo que queda', { rounds: [{ a: [1, 4], b: [2, 3] }, { a: [2, 5], b: [1, 2] }] },
      'Si se gasta $\\tfrac14$, queda $\\tfrac34$; luego se gasta $\\tfrac23$ de eso y queda $\\tfrac13$ de eso: $\\tfrac34 \\cdot \\tfrac13 = \\tfrac14$. En la otra, $\\tfrac35 \\cdot \\tfrac12 = \\tfrac{3}{10}$.',
      { hint: 'Pinta lo que QUEDA, no lo que se gasta: si se gasta $\\tfrac14$, quedan tres de las cuatro columnas.' }),
    play('total-original', '¿Cuánto había al principio?', { rounds: [
      { steps: [[1, 3, 'total'], [1, 2, 'resto']], left: 40000, step: 10000, max: 200000 },
      { steps: [[2, 5, 'total'], [1, 3, 'resto']], left: 24000, step: 5000, max: 100000 },
    ] }, 'Queda $\\tfrac23 \\cdot \\tfrac12 = \\tfrac13$ del total: si eso es 40 000, el total es 120 000. En la otra queda $\\tfrac35 \\cdot \\tfrac23 = \\tfrac25$: 24 000 son $\\tfrac25$ de 60 000.',
      { hint: 'Calcula qué fracción del total queda al final y piensa de qué número es esa fracción.' }),
    play('rueda-porcentaje', 'La fracción como parte de un todo', { rounds: [{ part: 30, whole: 120 }, { part: 54, whole: 90 }], tol: 1 },
      '30 de 120 es $\\tfrac14$, el 25 %. 54 de 90 es $\\tfrac35$, el 60 %.',
      { hint: 'Simplifica la fracción parte / todo antes de pasarla a porcentaje.' }),
    play('pinta-personas', 'Fracciones de un grupo', { rounds: [{ total: 24, pct: 75, what: 'llegaron temprano' }, { total: 30, pct: 40, what: 'trajeron almuerzo' }] },
      'El 75 % es $\\tfrac34$: $\\tfrac34$ de 24 son 18. El 40 % es $\\tfrac25$: $\\tfrac25$ de 30 son 12.',
      { hint: 'Pasa el porcentaje a fracción y parte el grupo en partes iguales.' }),
    play('cruz-porcentaje', 'Porcentaje con regla de tres', { problems: [
      { text: 'Gastó el 25 % de 80 000. ¿Cuánto gastó?', chips: [{ label: '25', cell: 'p' }, { label: '80 000', cell: 'C' }, { label: '?', cell: 'B' }, { label: '60 000', cell: null }] },
      { text: '12 000 es qué porcentaje de 48 000', chips: [{ label: '?', cell: 'p' }, { label: '48 000', cell: 'C' }, { label: '12 000', cell: 'B' }, { label: '36 000', cell: null }] },
    ] }, 'El total va con el 100 %: el 25 % de 80 000 es 20 000, y 12 000 de 48 000 es el 25 %.',
      { hint: 'El total va enfrente del 100 %.' }),
    play('vuela-precios', 'Vuela a lo que queda', { rounds: [{ title: 'Fracciones', items: [
      { ask: 'Gasta 1/2 y luego 1/2 de lo que queda: queda…', options: ['1/4', '0', '1/2'], answer: 0 },
      { ask: 'Gasta 1/5 y luego 1/4 de lo que queda: queda…', options: ['3/5', '11/20', '1/20'], answer: 0 },
      { ask: 'Si queda 1/3 y son 50 000, había…', options: ['150 000', '100 000', '16 667'], answer: 0 },
    ] }] }, '$\\tfrac12 \\cdot \\tfrac12 = \\tfrac14$. $\\tfrac45 \\cdot \\tfrac34 = \\tfrac35$. $3 \\cdot 50\\,000 = 150\\,000$.',
      { hint: 'Multiplica lo que va quedando, no restes fracciones del total.' }),
  ]);

  setLesson('pu-ar-2', [
    play('nivela-datos', 'Promedio = nivelar', { rounds: [{ data: [6, 2, 9, 7], hi: 10, step: 2 }, { data: [8, 3, 5, 10, 4], hi: 12, step: 2 }] },
      '$\\tfrac{24}{4} = 6$ y $\\tfrac{30}{5} = 6$: lo que sobra arriba llena lo que falta abajo.',
      { hint: 'Suma todo y divide entre la cantidad de datos.' }),
    play('dato-faltante', 'Agregar un dato', { rounds: [{ data: [70, 85, null, 90], mean: 80, hi: 100, step: 5 }, { data: [4, 6, 8, null], mean: 7, hi: 12, step: 1 }] },
      'Promedio por cantidad da la suma: $80 \\cdot 4 = 320$ y faltan $320 - 245 = 75$. $7 \\cdot 4 = 28$ y faltan 10.',
      { hint: 'La llave: promedio × cantidad = suma total.' }),
    play('balanza-promedio', 'Dos grupos juntos', { rounds: [{ groups: [{ lab: 'mujeres', n: 3, mean: 8 }, { lab: 'hombres', n: 5, mean: 4 }], lo: 0, hi: 10 }] },
      '$\\tfrac{3 \\cdot 8 + 5 \\cdot 4}{8} = \\tfrac{44}{8} = 5.5$, más cerca de 4 porque los hombres son más.',
      { hint: 'Cada grupo pesa según cuántas personas tiene.' }),
    play('nota-ponderada', 'La nota que falta', { rounds: [
      { items: [['parcial 1', 30, 3.0], ['parcial 2', 30, 4.0], ['final', 40, null]], target: 3.9 },
      { items: [['quices', 20, 4.5], ['taller', 30, 3.0], ['examen', 50, null]], target: 3.5 },
    ] }, 'Lo que ya tiene: $0.3 \\cdot 3 + 0.3 \\cdot 4 = 2.1$; faltan 1.8, y $1.8 \\div 0.4 = 4.5$. En la otra: $0.9 + 0.9 = 1.8$; faltan 1.7, y $1.7 \\div 0.5 = 3.4$.',
      { hint: 'Calcula cuánto aportan las notas que ya tiene y reparte lo que falta entre el peso de la última.' }),
    play('tres-centros', 'Media, mediana y moda', { rounds: [{ data: [2, 2, 2, 3, 5, 6, 8], lo: 0, hi: 8 }] },
      'Media $\\tfrac{28}{7} = 4$, mediana 3 (el del medio) y moda 2 (el que más se repite).',
      { hint: 'Cada medida responde una pregunta distinta.' }),
    play('ordena-mediana', 'La mediana', { rounds: [{ data: [15, 9, 12, 9, 20, 11] }] },
      'Ordenados: 9, 9, 11, 12, 15, 20. Hay dos en el medio: $\\tfrac{11 + 12}{2} = 11.5$.',
      { hint: 'Con una cantidad par de datos se promedian los dos del medio.' }),
    play('rompe-cambios', 'Manda la pelota al promedio', { miss: 'promedio × cantidad = suma', rounds: [{ title: 'Promedios', items: [
      { ask: 'Promedio de 5 datos es 6. La suma es…', options: ['30', '11', '6'], answer: 0 },
      { ask: 'Notas 3 y 4 con pesos 50 % y 50 %', options: ['3.5', '7', '3.4'], answer: 0 },
      { ask: 'Tres datos promedian 4; se agrega un 8. Nuevo promedio', options: ['5', '6', '4'], answer: 0 },
    ] }] }, '$5 \\cdot 6 = 30$. $\\tfrac{3 + 4}{2} = 3.5$. $\\tfrac{12 + 8}{4} = 5$.',
      { hint: 'Siempre pasa por la suma total.' }),
  ]);

  setLesson('pu-ar-3', [
    play('cripto-letras', 'Letras por cifras', { rounds: [
      { letters: 'AB', show: 'A + A + A = BA', f: v => 3 * v.A === N(v, 'BA'), lead: 'AB' },
      { letters: 'ABC', show: 'AB + BA = CAC', f: v => N(v, 'AB') + N(v, 'BA') === N(v, 'CAC'), lead: 'ABC' },
      { letters: 'ABC', show: 'AA + BB = CBC', f: v => N(v, 'AA') + N(v, 'BB') === N(v, 'CBC'), lead: 'ABC' },
      { letters: 'ABC', show: 'AB × A = CBB', f: v => N(v, 'AB') * v.A === N(v, 'CBB'), lead: 'ABC' },
    ] }, '$5 + 5 + 5 = 15$. $29 + 92 = 121$. $99 + 22 = 121$. $95 \\cdot 9 = 855$. En las sumas de tres cifras la primera tiene que ser 1: dos números de dos cifras no llegan a 200.',
      { hint: 'Empieza por la cifra que se lleva: una suma de dos números de dos cifras nunca pasa de 198.' }),
    play('tablero-cifras', 'El número escondido', { rounds: [
      { conds: [{ say: 'sus cifras suman 9', f: n => X(n) + Y(n) === 9 }, { say: 'al invertir sus cifras baja 45', f: n => n - REV(n) === 45 }] },
      { conds: [{ say: 'es múltiplo de 7', f: n => n % 7 === 0 }, { say: 'las decenas son el doble de las unidades', f: n => X(n) === 2 * Y(n) }, { say: 'es impar', f: n => n % 2 === 1 }, { say: 'es mayor que 50', f: n => n > 50 }] },
    ] }, 'Invertir XY cambia el número en $9(X - Y)$: baja 45 si $X - Y = 5$, y con $X + Y = 9$ queda 72. En la otra, de 21, 42, 63 y 84 solo 63 es impar y mayor que 50.',
      { hint: 'Toca un número y mira qué condición falla: eso te dice hacia dónde moverte.' }),
    play('maquina-regla', 'Reglas con las cifras', { rounds: [{ ex: [[37, 10], [52, 7], [81, 9]], ask: 64, op: 'dsum' }, { ex: [[23, 32], [58, 85], [71, 17]], ask: 40, op: 'rev' }] },
      '$3 + 7 = 10$, $5 + 2 = 7$, $8 + 1 = 9$: se suman las cifras ($64 \\to 10$). En la otra se invierten: $40 \\to 4$.',
      { hint: 'Mira qué pasa con cada cifra por separado.' }),
    play('ultima-cifra', 'La cifra de las unidades', { rounds: [{ a: 7, n: 23 }, { a: 8, n: 14 }] },
      'Las unidades de $7^n$ giran 7, 9, 3, 1: $23$ deja residuo 3, termina en 3. Las de $8^n$ giran 8, 4, 2, 6: $14$ deja residuo 2, termina en 4.',
      { hint: 'Solo importa la cifra de las unidades: mira cada cuánto se repite.' }),
    play('arma-negacion', 'El valor de un número de dos cifras', { rounds: [
      { ask: 'Escribe el valor de AB', show: '$\\overline{AB}$', tray: ['$10A$', '$10B$', '$A$', '$B$', '$+$', '$\\cdot$'], need: [0, 4, 3], alt: [[3, 4, 0]] },
      { ask: 'Escribe AB + BA', show: '$\\overline{AB} + \\overline{BA}$', tray: ['$11$', '$10$', '$(A + B)$', '$(A - B)$', '$\\cdot$', '$+$'], need: [0, 4, 2], alt: [[2, 4, 0]] },
    ] }, 'La cifra de las decenas vale 10 veces: $\\overline{AB} = 10A + B$. Y $\\overline{AB} + \\overline{BA} = 11A + 11B = 11(A + B)$.',
      { hint: 'Escribe cada número como decenas por 10 más unidades.' }),
    play('binario-luces', 'Valor posicional en base 2', { rounds: [{ n: 19, bits: 5 }, { n: 26, bits: 5 }] },
      'Cada lugar vale el doble del de su derecha, como en base 10 vale diez veces: $19 = 16 + 2 + 1$ y $26 = 16 + 8 + 2$.',
      { hint: 'Empieza por el lugar más grande que quepa.' }),
    play('vuela-precios', 'Vuela a la cifra', { rounds: [{ title: 'Cifras', items: [
      { ask: 'AB + BA es siempre múltiplo de…', options: ['11', '10', '9'], answer: 0 },
      { ask: 'AB − BA es siempre múltiplo de…', options: ['9', '11', '2'], answer: 0 },
      { ask: 'A + A = 1B con A = 7, B es…', options: ['4', '7', '1'], answer: 0 },
    ] }] }, '$\\overline{AB} + \\overline{BA} = 11(A + B)$ y $\\overline{AB} - \\overline{BA} = 9(A - B)$. $7 + 7 = 14$.',
      { hint: 'Escribe AB como 10A + B.' }),
  ]);

  setLesson('pu-ar-4', [
    play('peor-caso-bolsa', 'Para estar seguros', { rounds: [
      { bag: [['coral', 5], ['sky', 5], ['mint', 5]], kind: 'iguales', k: 2 },
      { bag: [['coral', 4], ['sky', 6], ['sun', 3]], kind: 'color', k: 2, color: 'coral' },
      { bag: [['coral', 3], ['sky', 3], ['mint', 3], ['sun', 3]], kind: 'iguales', k: 3 },
    ] }, 'Con 3 colores, en el peor caso salen tres distintas: con 4 seguro hay dos iguales. Para dos rojas, lo peor es sacar antes las 9 de otros colores y una roja: 11. Para tres iguales de cuatro colores: $2 \\cdot 4 + 1 = 9$.',
      { hint: 'Piensa en la peor suerte: ¿cuántas puedes sacar SIN que se cumpla? Una más asegura.' }),
    play('rectangulo-max', 'La cerca más rendidora', { rounds: [{ P: 24, step: 1 }, { P: 30, step: 0.5 }] },
      'Con perímetro fijo el área crece al acercarse al cuadrado: $6 \\cdot 6 = 36$ con 24 m y $7.5 \\cdot 7.5 = 56.25$ con 30 m.',
      { hint: 'Prueba rectángulos largos y otros casi cuadrados, y compara sus áreas.' }),
    play('reparto-extremo', 'Repartos con extremos', { rounds: [{ n: 4, total: 20, ask: 'max' }, { n: 4, total: 15, ask: 'minmax' }] },
      'Para que uno reciba lo máximo, los otros tres reciben lo mínimo distinto: 1, 2 y 3, y le quedan 14. Para el menor máximo, lo más parejo: con 6 como máximo alcanza (6, 5, 3, 1); con 5 no, porque $5 + 4 + 3 + 2 = 14 < 15$.',
      { hint: 'Los demás tienen que ser distintos: ¿cuál es lo menos que pueden recibir?' }),
    play('contraejemplo', '¿Seguro? Busca la peor sacada', { rounds: [{ claim: 'Si saco 3 bolas de una bolsa con rojas, azules y verdes, seguro hay dos del mismo color', items: ['roja, roja, azul', 'roja, azul, verde', 'azul, azul, verde', 'verde, verde, roja'], bad: x => new Set(x.split(', ')).size === 3 }] },
      'Una sacada con los tres colores distintos tumba la frase: con 3 bolas no es seguro; con 4 sí.',
      { hint: 'Busca la sacada con peor suerte.' }),
    play('dato-faltante', 'Lo mínimo para el promedio', { rounds: [{ data: [5, 5, 5, null], mean: 4, hi: 5, step: 1 }] },
      'Para que el promedio sea 4, la suma es 16. Si los otros tres sacaron lo máximo (5), el cuarto necesita lo mínimo: $16 - 15 = 1$.',
      { hint: 'Para el mínimo de uno, los demás van al máximo.' }),
    play('mayor-subida', 'El mayor cambio', { rounds: [{ pts: [['L', 12], ['M', 15], ['X', 9], ['J', 20], ['V', 22]], hi: 25, step: 5, q: 'up' }, { pts: [['L', 12], ['M', 15], ['X', 9], ['J', 20], ['V', 22]], hi: 25, step: 5, q: 'down' }] },
      'La mayor subida es de 9 a 20 (+11); la mayor bajada, de 15 a 9 (−6).',
      { hint: 'Compara todos los tramos, no solo los de las puntas.' }),
    play('rompe-cambios', 'Manda la pelota al extremo', { miss: 'piensa en la peor suerte posible', rounds: [{ title: 'Extremos', items: [
      { ask: 'Medias de 4 colores: ¿cuántas sacar para un par?', options: ['5', '4', '8'], answer: 0 },
      { ask: 'Dos números suman 10: el mayor producto es…', options: ['25', '24', '100'], answer: 0 },
      { ask: '12 dulces, 3 niños, distintos y al menos 1: lo máximo de uno', options: ['9', '10', '6'], answer: 0 },
    ] }] }, 'Con 4 colores, la quinta media asegura el par. $5 \\cdot 5 = 25$. Los otros reciben 1 y 2: quedan 9.',
      { hint: 'Peor caso más uno; para máximos, los demás al mínimo.' }),
  ]);

  setExam('pu-aritmetica', 'Aritmética y promedios', [
    ['pu-ar-1', 'Cada fracción se toma de lo que quedaba antes de esa compra.',
      play('corta-lo-que-queda', 'De lo que queda', { rounds: [{ total: 60000, steps: [[1, 2, 'total'], [1, 3, 'resto']] }] }, 'Quedan 30 000 y luego 20 000.', { hint: 'Lo que queda.' })],
    ['pu-ar-1', 'Lo que queda al final es el producto de lo que va quedando.',
      play('total-original', 'Original', { rounds: [{ steps: [[1, 4, 'total'], [1, 3, 'resto']], left: 30000, step: 5000, max: 100000 }] }, 'Queda la mitad: había 60 000.', { hint: 'Fracción que queda.' })],
    ['pu-ar-2', 'En un promedio ponderado cada nota pesa su porcentaje.',
      play('nota-ponderada', 'Ponderado', { rounds: [{ items: [['parcial', 40, 3.5], ['final', 60, null]], target: 3.8 }] }, '$1.4 + 0.6x = 3.8$: $x = 4$.', { hint: 'Pesos.' })],
    ['pu-ar-2', 'Promedio × cantidad = suma total.',
      play('dato-faltante', 'Falta', { rounds: [{ data: [12, null, 9], mean: 10, hi: 15, step: 1 }] }, '$30 - 21 = 9$.', { hint: 'Suma.' })],
    ['pu-ar-3', 'Letras distintas son cifras distintas, y ningún número empieza en 0.',
      play('cripto-letras', 'Cripto', { rounds: [{ letters: 'AB', show: 'AB − BA = 27 y A + B = 11', f: v => N(v, 'AB') - N(v, 'BA') === 27 && v.A + v.B === 11, lead: 'AB' }] }, '$74 - 47 = 27$.', { hint: '9(A − B).' })],
    ['pu-ar-3', 'Un número de dos cifras XY vale 10X + Y.',
      play('tablero-cifras', 'Tablero', { rounds: [{ conds: [{ say: 'sus cifras suman 12', f: n => X(n) + Y(n) === 12 }, { say: 'al invertirlo sube 18', f: n => REV(n) - n === 18 }] }] }, 'Y − X = 2 y X + Y = 12: 57.', { hint: 'Invertir.' })],
    ['pu-ar-4', 'Para asegurar algo se piensa en el peor caso.',
      play('peor-caso-bolsa', 'Peor caso', { rounds: [{ bag: [['coral', 4], ['sky', 4]], kind: 'iguales', k: 3 }] }, '2 de cada color y una más: 5.', { hint: 'Peor suerte.' })],
    ['pu-ar-4', 'Para el máximo de uno, los demás van al mínimo.',
      play('reparto-extremo', 'Reparto', { rounds: [{ n: 3, total: 18, ask: 'max' }] }, '1 y 2 a los otros: 15.', { hint: 'Mínimo a los demás.' })],
  ]);
});

// Mundo 12 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-ar-1', [
    ['corta-lo-que-queda', 0, 'Lina recibe 90 000 pesos: gasta un tercio en transporte y dos tercios de lo que queda en libros. Corta la barra', 'Gasta 30 000 y quedan 60 000. Después gasta $\\tfrac23$ de 60 000, que son 40 000: le quedan 20 000.'],
    ['area-queda', 0, 'De un terreno se vende $\\tfrac14$ y después se siembran $\\tfrac23$ de lo que queda. Halla lo que sobra', 'Después de la venta quedan $\\tfrac34$; de eso sobra un tercio: $\\tfrac34 \\cdot \\tfrac13 = \\tfrac14$ del terreno.'],
    ['total-original', 1, 'Después de gastar $\\tfrac25$ de su sueldo y $\\tfrac13$ de lo que le quedaba, a Óscar le sobran 24 000. Halla el sueldo', 'Sobra $\\tfrac35 \\cdot \\tfrac23 = \\tfrac25$ del sueldo, que son 24 000: el sueldo era 60 000.'],
    ['rueda-porcentaje', 1, 'De 90 invitados llegaron 54. Gira la aguja hasta esa parte del todo', '$54 \\div 90 = \\tfrac35$: el 60 %.'],
    ['pinta-personas', 0, 'Tres cuartas partes de un grupo de 24 llegaron temprano. Píntalos', '$\\tfrac34$ de 24: un cuarto son 6, tres cuartos son 18.'],
    ['cruz-porcentaje', { problems: [{ text: 'Gastó el 25 % de 80 000. ¿Cuánto gastó?', chips: [{ label: '25', cell: 'p' }, { label: '80 000', cell: 'C' }, { label: '?', cell: 'B' }] }] }, 'Una fracción también es un porcentaje. Arma la cruz', 'El 25 % es la cuarta parte: gastó 20 000.'],
    ['vuela-precios', 0, 'Vuela a lo que queda', 'Mitad y mitad de lo que queda: sobra $\\tfrac14$. Un quinto y luego un cuarto del resto: $\\tfrac45 \\cdot \\tfrac34 = \\tfrac35$. Si $\\tfrac13$ son 50 000, había 150 000.'],
  ], [
    sol('Camilo leyó un libro así: el lunes leyó la cuarta parte del libro; el martes, la tercera parte de lo que le faltaba; el miércoles leyó 60 páginas y terminó el libro. ¿Cuántas páginas tiene el libro?',
      ['Después del lunes le falta [[$\\tfrac34$]] del libro', 'El martes lee $\\tfrac13$ de $\\tfrac34$, que es [[$\\tfrac14$]] del libro', 'Le queda $\\tfrac34 - \\tfrac14 =$ [[$\\tfrac12$]] del libro, que son las 60 páginas', 'El libro tiene $60 \\cdot 2 =$ [[120]] páginas'],
      ['$\\tfrac{5}{12}$', '144', '$\\tfrac13$'],
      'La tercera parte del martes es de lo que faltaba ($\\tfrac34$), no del libro entero. Las 60 páginas del miércoles son la mitad del libro.',
      'Lleva la cuenta de lo que falta por leer después de cada día, siempre como fracción del libro completo.'),
    err('De un tanque lleno de agua se sacaron primero las dos quintas partes de su contenido y luego 10 litros más. Después de esto, el tanque quedó exactamente hasta la mitad. ¿Cuál es la capacidad del tanque?',
      ['Después de sacar $\\tfrac25$ queda $\\tfrac35$ del tanque', 'Al final queda $\\tfrac12$: los 10 litros son la diferencia, $\\tfrac35 - \\tfrac12 = \\tfrac{1}{10}$ del tanque', 'Si $\\tfrac{1}{10}$ del tanque son 10 litros, la capacidad es $10 \\div 10 = 1$ litro'], 2,
      ['Si $\\tfrac{1}{10}$ del tanque son 10 litros, la capacidad es $10 \\cdot 10 = 100$ litros', 'Si $\\tfrac{1}{10}$ del tanque son 10 litros, la capacidad es $10 + 10 = 20$ litros', 'Si $\\tfrac{1}{10}$ del tanque son 10 litros, la capacidad es $10 \\cdot 5 = 50$ litros'],
      'Si una décima parte son 10 litros, el tanque completo son diez de esas partes: 100 litros. Un tanque de 1 litro no deja sacar 10.',
      'Compara la respuesta con el enunciado: ¿se pueden sacar 10 litros de ese tanque?'),
    opc('Tres amigos se comen una pizza así: el primero come la cuarta parte de la pizza; el segundo, la tercera parte de lo que quedó, y el tercero, la mitad de lo que quedaba. La fracción de la pizza que sobra es:',
      ['$\\tfrac14$', '$\\tfrac{1}{12}$', '$\\tfrac{1}{24}$', '$\\tfrac13$'], 0,
      'Quedan $\\tfrac34$; el segundo deja $\\tfrac23$ de eso, $\\tfrac12$; el tercero deja la mitad: $\\tfrac14$.',
      'Sigue lo que queda después de cada uno: cada fracción se toma de lo que queda, no de la pizza entera.'),
  ]);

  diezLesson('pu-ar-2', [
    ['nivela-datos', 1, 'Cinco cajas pesan 8, 3, 5, 10 y 4 kilos. Nivela las barras para hallar el promedio', 'Entre todas pesan 30 kilos: repartidos por igual, 6 kilos cada una.'],
    ['dato-faltante', 0, 'Marta quiere promediar 80 en cuatro pruebas y lleva 70, 85 y 90. Halla la nota que falta', 'Para promediar 80 debe sumar 320. Lleva 245: le faltan 75.'],
    ['balanza-promedio', 0, 'Tres mujeres promedian 8 y cinco hombres promedian 4. Ubica el promedio de todo el grupo', '$\\tfrac{3 \\cdot 8 + 5 \\cdot 4}{8} = \\tfrac{44}{8} = 5.5$: queda más cerca del promedio del grupo más grande.'],
    ['nota-ponderada', 0, 'Dos parciales del 30 % con notas 3 y 4, y un final del 40 %. Halla la nota del final para una definitiva de 3.9', 'Los parciales aportan $0.9 + 1.2 = 2.1$. Faltan 1.8, y el final pesa 0.4: $1.8 \\div 0.4 = 4.5$.'],
    ['tres-centros', 0, 'Los puntajes de siete jugadores: ubica la media, la mediana y la moda', 'Moda 2 (sale tres veces), mediana 3 (el del centro) y media $28 \\div 7 = 4$.'],
    ['ordena-mediana', 0, 'Seis tiempos de carrera: ordénalos y halla la mediana', 'Ordenados: 9, 9, 11, 12, 15, 20. La mediana es el promedio de los dos del centro: 11.5.'],
    ['rompe-cambios', 0, 'Manda la pelota al promedio', 'Promedio 6 con 5 datos: la suma es 30. Con pesos iguales, 3 y 4 dan 3.5. Tres datos que promedian 4 suman 12; con un 8 más, $20 \\div 4 = 5$.'],
  ], [
    sol('El promedio de las edades de los 6 jugadores de un equipo es 20 años. Si se retira un jugador de 25 años, ¿cuál es el promedio de las edades de los que quedan?',
      ['Suma de las 6 edades: $6 \\cdot 20 =$ [[120]]', 'Sin el jugador que se retira: $120 - 25 =$ [[95]]', 'Quedan [[5]] jugadores', 'Nuevo promedio: $95 \\div 5 =$ [[19]] años'],
      ['15', '22.5', '20'],
      'El promedio no se resta ni se promedia otra vez: se convierte en suma, se ajusta la suma y se divide entre la nueva cantidad.',
      'Todo promedio esconde una suma. ¿Cuánto suman las seis edades?'),
    err('Un estudiante lleva un promedio de 3.5 en 4 exámenes. ¿Qué nota debe sacar en el quinto examen para que su promedio suba a 3.8?',
      ['Suma de los 4 exámenes: $4 \\cdot 3.5 = 14$', 'Para promediar 3.8 en 5 exámenes necesita sumar $5 \\cdot 3.8 = 19$', 'En el quinto examen necesita $3.8 + 0.3 = 4.1$'], 2,
      ['En el quinto examen necesita $19 - 14 = 5.0$', 'En el quinto examen necesita $19 \\div 5 = 3.8$', 'En el quinto examen necesita $(3.5 + 3.8) \\div 2 = 3.65$'],
      'La nota nueva tiene que subir el promedio de los cinco exámenes, no solo superar el anterior: le toca cubrir la suma que falta, $19 - 14 = 5.0$.',
      'Los dos primeros pasos ya dieron la suma que lleva y la suma que necesita. ¿Qué falta?'),
    opc('El promedio de cinco números es 12. Cuatro de ellos son 8, 10, 13 y 15. El quinto número es:',
      ['12', '11.5', '14', '46'], 2,
      'Los cinco suman $5 \\cdot 12 = 60$ y los cuatro conocidos suman 46: el quinto es 14.',
      'Convierte el promedio en la suma de los cinco números.'),
  ]);

  diezLesson('pu-ar-3', [
    ['cripto-letras', 0, 'Cada letra es una cifra: $A + A + A = \\overline{BA}$. Descúbrelas', '$3A$ debe terminar en A: solo pasa con $A = 5$, porque $15$ termina en 5. Entonces $B = 1$.'],
    ['tablero-cifras', 0, 'Un número de dos cifras: sus cifras suman 9 y al invertirlas baja 45. Encuéntralo en el tablero', 'Al invertir, el número cambia en 9 veces la diferencia de sus cifras: $45 \\div 9 = 5$. Cifras que suman 9 y difieren en 5: 7 y 2. Es el 72.'],
    ['maquina-regla', 1, 'Una máquina cambia 23 por 32, 58 por 85 y 71 por 17. ¿Qué entrega con el 40?', 'La máquina invierte las cifras: con 40 entrega 04, que es el 4.'],
    ['ultima-cifra', 1, '¿En qué cifra termina $8^{14}$?', 'Las últimas cifras del 8 se repiten: 8, 4, 2, 6. Como $14 = 4 \\cdot 3 + 2$, es la segunda: 4.'],
    ['arma-negacion', 0, 'Escribe con fichas cuánto vale el número de dos cifras $\\overline{AB}$', 'La cifra de las decenas vale diez veces: $\\overline{AB} = 10A + B$.'],
    ['binario-luces', 0, 'El valor de cada puesto en base 2: enciende los bombillos que forman el 19', '$19 = 16 + 2 + 1$: en binario, 10011.'],
    ['vuela-precios', 0, 'Vuela a la cifra', '$\\overline{AB} + \\overline{BA} = 11(A + B)$: múltiplo de 11. $\\overline{AB} - \\overline{BA} = 9(A - B)$: múltiplo de 9. Y $7 + 7 = 14$: B es 4.'],
  ], [
    sol('La suma de las cifras de un número de dos cifras es 11. Si se invierte el orden de sus cifras, el número aumenta en 27. ¿Cuál es el número?',
      ['Al invertir las cifras, el número cambia en 9 veces su diferencia: aquí $27 \\div 9 =$ [[3]]', 'Las cifras suman 11 y se diferencian en 3: son [[4]] y [[7]]', 'El número aumenta al invertirlo, así que la cifra menor va en las decenas: es el [[47]]'],
      ['74', '38', '9'],
      '$(10b + a) - (10a + b) = 9(b - a)$. Con suma 11 y diferencia 3, las cifras son 4 y 7. El 47 pasa a 74, que es 27 más.',
      'Escribe el número como $10a + b$ y el invertido como $10b + a$, y resta.'),
    err('En la suma $\\overline{AB} + \\overline{BA} = 132$, A y B son cifras distintas de cero. ¿Cuánto vale $A + B$?',
      ['$\\overline{AB} = 10A + B$ y $\\overline{BA} = 10B + A$', 'La suma es $11A + 11B = 11(A + B)$', 'Entonces $A + B = 132 - 11 = 121$'], 2,
      ['Entonces $A + B = 132 \\div 11 = 12$', 'Entonces $A + B = 132 \\div 2 = 66$', 'Entonces $A + B = 132 \\div 10 = 13.2$'],
      'El 11 está multiplicando: para despejar se divide. $A + B = 12$, por ejemplo 75 + 57. La suma de dos cifras no puede pasar de 18.',
      'Dos cifras son números del 0 al 9. ¿Cuánto pueden sumar como máximo?'),
    opc('En la resta $\\overline{A7} - \\overline{4B} = 28$, las letras A y B representan cifras. El valor de $A + B$ es:',
      ['14', '15', '13', '16'], 3,
      '$10A + 7 - 40 - B = 28$ da $10A - B = 61$: solo sirve $A = 7$ y $B = 9$. En efecto, $77 - 49 = 28$, y $A + B = 16$.',
      'Mira primero las unidades: ¿qué cifra B hace que $7 - B$ termine en 8 (prestando una decena)?'),
  ]);

  diezLesson('pu-ar-4', [
    ['peor-caso-bolsa', 2, 'En una bolsa hay 3 bolas de cada uno de 4 colores. ¿Cuántas hay que sacar para tener, con seguridad, 3 del mismo color?', 'La peor suerte: 2 de cada color, 8 bolas, sin completar ningún trío. La novena completa uno con seguridad.'],
    ['rectangulo-max', 0, 'Con 24 m de cerca se quiere el corral rectangular de mayor área. Ajusta sus lados', 'Con el mismo perímetro, el rectángulo de mayor área es el cuadrado: lado 6 y área 36.'],
    ['reparto-extremo', 0, 'Se reparten 20 dulces entre 4 niños, todos con cantidades distintas y al menos uno. ¿Cuánto puede recibir, como máximo, uno de ellos?', 'Para que uno reciba lo máximo, los otros tres reciben lo mínimo posible y distinto: 1, 2 y 3. Le quedan $20 - 6 = 14$.'],
    ['contraejemplo', 0, 'Alguien afirma que con 3 bolas sacadas ya es seguro que hay dos del mismo color. Busca la sacada que lo desmiente', 'Con mala suerte salen una roja, una azul y una verde: tres bolas y ningún color repetido.'],
    ['dato-faltante', 0, 'Un estudiante sacó 5, 5 y 5. ¿Cuál es la nota más baja que puede sacar en la cuarta para promediar 4?', 'Para promediar 4 en cuatro notas necesita sumar 16. Ya tiene 15: le basta un 1.'],
    ['mayor-subida', 1, 'La gráfica muestra las ventas de una semana. Señala la mayor caída', 'La única bajada es de 15 a 9: cae 6. Los demás tramos suben.'],
    ['rompe-cambios', 0, 'Manda la pelota al extremo'],
  ], [
    sol('Se reparten 50 fichas entre 7 niños, sin importar cómo. ¿Cuál es la mayor cantidad de fichas que, con seguridad, recibe por lo menos uno de ellos?',
      ['Si el reparto es lo más parejo posible, cada niño recibe [[7]] fichas y sobra [[1]]', 'La ficha que sobra le toca a alguno, que queda con [[8]]', 'En cualquier otro reparto alguien recibe todavía más: se puede asegurar que al menos uno recibe [[8]] fichas'],
      ['50', '6', '43'],
      'El reparto parejo es el peor caso para el que quiere asegurar algo: $50 = 7 \\cdot 7 + 1$. Si nadie tuviera 8 o más, habría como mucho 49 fichas.',
      'Intenta repartir de modo que nadie reciba muchas: lo más parejo que puedas. ¿Qué pasa con lo que sobra?'),
    err('En un cajón hay 10 medias negras, 8 azules y 6 grises, todas revueltas. ¿Cuántas medias hay que sacar sin mirar, como mínimo, para estar seguros de tener dos del mismo color?',
      ['Hay tres colores de medias', 'En el peor caso, las tres primeras medias salen de colores distintos: una negra, una azul y una gris', 'Para asegurar el par hay que sacar todas las de un color y una más: $10 + 1 = 11$'], 2,
      ['La media siguiente repite algún color: basta sacar $3 + 1 = 4$', 'Basta sacar 3: una de cada color', 'Hay que sacar todas las grises y una más: $6 + 1 = 7$'],
      'Después de una media de cada color, la cuarta tiene que repetir alguno. Las cantidades de cada color no importan aquí: solo cuántos colores hay.',
      'Imagina la peor suerte posible y pregúntate: ¿de qué color puede ser la media que sigue?'),
    opc('Con 40 m de malla se quiere cercar un corral rectangular. La mayor área que puede tener el corral es:',
      ['96 m²', '100 m²', '400 m²', '80 m²'], 1,
      'Largo más ancho suman 20. El producto es máximo cuando los dos son iguales: $10 \\cdot 10 = 100$ m².',
      'Prueba varios rectángulos con ese perímetro: 12 por 8, 11 por 9… ¿Cuál tiene más área?'),
  ]);

  addExam('pu-aritmetica', [
    ['pu-ar-1', 'Una fracción «de lo que queda» se multiplica por lo que queda.',
      opc('Ana gasta la mitad de su dinero en un regalo y la tercera parte de lo que le queda en transporte. La fracción de su dinero que le sobra es:', ['$\\tfrac16$', '$\\tfrac13$', '$\\tfrac12$', '$\\tfrac23$'], 1,
        'Le queda $\\tfrac12$ y de eso conserva $\\tfrac23$: $\\tfrac12 \\cdot \\tfrac23 = \\tfrac13$.', 'El segundo gasto es una parte de lo que quedó, no del total.')],
    ['pu-ar-2', 'Promedio por cantidad de datos es la suma.',
      opc('El promedio de tres números es 10. Si dos de ellos son 7 y 9, el tercero es:', ['10', '8', '16', '14'], 3,
        'Los tres suman 30 y los dos conocidos suman 16: el tercero es 14.', 'Convierte el promedio en una suma.')],
    ['pu-ar-3', 'Un número de dos cifras vale 10 veces sus decenas más sus unidades.',
      opc('Un número de dos cifras se suma con el número que resulta de invertir sus cifras. El resultado siempre es múltiplo de:', ['11', '9', '10', '2'], 0,
        '$(10a + b) + (10b + a) = 11(a + b)$.', 'Escribe los dos números con las letras a y b y súmalos.')],
    ['pu-ar-4', 'Para estar seguros hay que pensar en la peor suerte posible.',
      opc('En una bolsa hay 5 bolas rojas, 5 verdes y 5 azules. La cantidad mínima de bolas que hay que sacar sin mirar para estar seguros de tener dos del mismo color es:', ['2', '3', '4', '6'], 2,
        'Con la peor suerte salen tres de colores distintos; la cuarta repite color.', 'Imagina que cada bola sale de un color distinto mientras se pueda.')],
  ]);
});
