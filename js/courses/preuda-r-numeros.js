// Preuniversitario · mundo 15 «Teoría de números»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const X = n => Math.floor(n / 10), Y = n => n % 10;
  const pairs = (x, sep) => x.split(sep).map(Number);

  setLesson('pu-nu-1', [
    play('criba-primos', 'La criba de Eratóstenes', { rounds: [{ N: 40 }] },
      'Basta cribar con 2, 3 y 5: como $7 \\cdot 7 = 49$ pasa de 40, todo compuesto hasta 40 ya cayó con un primo menor. Quedan 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 y 37.',
      { hint: 'Toca el número libre más pequeño: es primo. Sus múltiplos caen.' }),
    play('arbol-factores', 'El árbol de factores', { rounds: [{ n: 84 }, { n: 150 }] },
      '$84 = 2^2 \\cdot 3 \\cdot 7$ y $150 = 2 \\cdot 3 \\cdot 5^2$: sin importar por dónde empieces, las hojas son las mismas.',
      { hint: 'Prueba primero con 2; cuando ya no se pueda, con 3, luego con 5…' }),
    play('tabla-divisores', 'Contar divisores', { rounds: [{ p: [2, 3], e: [2, 2] }, { p: [3, 5], e: [1, 2] }] },
      'Cada divisor elige cuántos de cada primo lleva: $36 = 2^2 \\cdot 3^2$ tiene $3 \\cdot 3 = 9$ divisores y $75 = 3 \\cdot 5^2$ tiene $2 \\cdot 3 = 6$.',
      { hint: 'El exponente 0 también cuenta: con $5^3$ habría cuatro opciones, $5^0$, $5^1$, $5^2$ y $5^3$.' }),
    play('cifra-faltante', 'La cifra que falta', { rounds: [{ tpl: '4_72', by: 9 }, { tpl: '31_6', by: 4 }, { tpl: '7_83', by: 11 }] },
      'Por 9: $4 + x + 7 + 2 = 13 + x$ debe ser múltiplo de 9, $x = 5$. Por 4: el final $\\_6$ debe ser múltiplo de 4 (16, 36, 56…). Por 11: $7 - x + 8 - 3 = 12 - x$, $x = 1$.',
      { hint: 'Usa el criterio que pide el divisor y mira qué cifra lo cumple.' }),
    play('tablero-cifras', 'El primo escondido', { rounds: [{ conds: [{ say: 'es primo', f: isP }, { say: 'sus cifras suman 10', f: n => X(n) + Y(n) === 10 }, { say: 'es mayor que 50', f: n => n > 50 }] }] },
      'Los de cifras que suman 10 son 19, 28, 37, 46, 55, 64, 73, 82 y 91; primos: 19, 37 y 73 (91 = 7 · 13). Mayor que 50: 73.',
      { hint: 'Prueba los que suman 10 y descarta los pares y los múltiplos de 7.' }),
    play('contraejemplo', '¿Por 2 y por 4 es por 8?', { rounds: [{ claim: 'Si un número es divisible por 2 y por 4, es divisible por 8', items: [8, 16, 24, 12, 40], bad: x => x % 4 === 0 && x % 8 !== 0 }] },
      '12 es divisible por 2 y por 4, pero no por 8: 4 ya contiene al 2, no se multiplican.',
      { hint: 'Busca un múltiplo de 4 que no sea múltiplo de 8.' }),
    play('vuela-precios', 'Vuela al divisor', { rounds: [{ title: 'Primos', items: [
      { ask: '¿Cuántos divisores tiene 2⁴?', options: ['5', '4', '8'], answer: 0 },
      { ask: '¿2 346 es divisible por 3?', options: ['sí', 'no', 'no se sabe'], answer: 0 },
      { ask: 'El único primo par', options: ['2', '1', '4'], answer: 0 },
    ] }] }, '$2^4$: exponentes 0 a 4, cinco divisores. $2 + 3 + 4 + 6 = 15$, múltiplo de 3. El 2.',
      { hint: 'Exponente + 1; suma de cifras; el 1 no es primo.' }),
  ]);

  setLesson('pu-nu-2', [
    play('ritmos-mcm', 'Cuándo vuelven a coincidir', { rounds: [{ a: 6, b: 8, max: 30, labels: ['luz roja', 'luz verde'] }, { a: 10, b: 15, max: 40, labels: ['bus A', 'bus B'] }] },
      'Las marcas de 6 y de 8 coinciden en 24 por primera vez: es el MCM. Las de 10 y 15, en 30.',
      { hint: 'Ve marca por marca de la fila más espaciada y mira si la otra fila también tiene.' }),
    play('corta-mcd', 'La baldosa más grande', { rounds: [{ a: 12, b: 18 }, { a: 20, b: 15 }] },
      'La baldosa tiene que caber justo en los dos lados: su lado divide a 12 y a 18. La más grande es 6. En $20 \\times 15$, es 5.',
      { hint: 'Prueba tamaños que dividan a los dos lados y quédate con el mayor.' }),
    play('pares-primos', 'Los primos comunes', { rounds: [{ a: 60, b: 84 }, { a: 45, b: 75 }] },
      '$60 = 2 \\cdot 2 \\cdot 3 \\cdot 5$ y $84 = 2 \\cdot 2 \\cdot 3 \\cdot 7$: comunes $2 \\cdot 2 \\cdot 3 = 12$ (MCD); con todos, $12 \\cdot 5 \\cdot 7 = 420$ (MCM). $45$ y $75$: MCD 15, MCM 225.',
      { hint: 'Cada ficha solo puede tener una pareja.' }),
    play('arbol-factores', 'Factoriza para el MCM', { rounds: [{ n: 96 }] },
      '$96 = 2^5 \\cdot 3$: el 2 se repite cinco veces. Con las dos descomposiciones a la vista se arman el MCM y el MCD.',
      { hint: 'Divide entre 2 mientras se pueda; lo que quede, pruébalo con 3.' }),
    play('tablero-cifras', 'Múltiplo de dos a la vez', { rounds: [{ conds: [{ say: 'es múltiplo de 6', f: n => n % 6 === 0 }, { say: 'es múltiplo de 15', f: n => n % 15 === 0 }, { say: 'es mayor que 70', f: n => n > 70 }] }] },
      'Múltiplo de 6 y de 15 es múltiplo de su MCM, 30: 30, 60, 90. Mayor que 70: 90.',
      { hint: 'Ser múltiplo de los dos es ser múltiplo del MCM.' }),
    play('bolsas-residuo', 'Repartir sin que sobre', { rounds: [{ N: 84, d: 12 }, { N: 60, d: 9 }] },
      '84 en bolsas de 12 son 7 sin sobrar: 12 divide a 84. 60 en bolsas de 9: 6 bolsas y sobran 6.',
      { hint: 'El residuo es 0 justo cuando el divisor divide al número.' }),
    play('rompe-cambios', 'Manda la pelota al MCM o al MCD', { miss: 'MCM: coincidir; MCD: partir igual', rounds: [{ title: 'MCM y MCD', items: [
      { ask: 'MCM de 4 y 6', options: ['12', '24', '2'], answer: 0 },
      { ask: 'MCD de 18 y 24', options: ['6', '3', '72'], answer: 0 },
      { ask: 'Alarmas cada 9 y 12 minutos: coinciden cada', options: ['36', '108', '3'], answer: 0 },
    ] }] }, 'Los múltiplos de 4 y 6 se encuentran en 12. 18 y 24 comparten $2 \\cdot 3$. MCM de 9 y 12: 36.',
      { hint: 'El MCM es múltiplo de los dos; el MCD, divisor de los dos.' }),
  ]);

  setLesson('pu-nu-3', [
    play('ultima-cifra', 'El ciclo de la última cifra', { rounds: [{ a: 2, n: 35 }, { a: 4, n: 20 }] },
      'Las de $2^n$ giran 2, 4, 8, 6: $35$ deja residuo 3, termina en 8. Las de $4^n$ alternan 4 y 6: exponente par, 6.',
      { hint: 'Encuentra el ciclo y usa el residuo del exponente.' }),
    play('bolsas-residuo', 'El residuo', { rounds: [{ N: 100, d: 7 }, { N: 53, d: 4 }] },
      '$100 = 7 \\cdot 14 + 2$ y $53 = 4 \\cdot 13 + 1$.',
      { hint: 'El residuo siempre es menor que el divisor.' }),
    play('ciclo-colores', 'El residuo en un collar', { rounds: [{ cyc: ['sun', 'coral', 'sky', 'mint', 'brand'], N: 88 }] },
      '$88 = 5 \\cdot 17 + 3$: es la tercera del grupo.',
      { hint: 'Divide entre el largo del grupo.' }),
    play('ciclo-reloj', 'El residuo de los días', { rounds: [{ start: 3, n: 250 }] },
      '$250 = 7 \\cdot 35 + 5$: jueves más 5 días es martes.',
      { hint: 'Solo cuentan los días que sobran de semanas completas.' }),
    play('contraejemplo', 'Paridad: busca el que falla', { rounds: [
      { claim: 'La suma de dos impares es impar', items: ['2 + 4', '6 + 1', '3 + 5', '8 + 2'], bad: x => { const [a, b] = pairs(x, ' + '); return a % 2 && b % 2 && (a + b) % 2 === 0; } },
      { claim: 'Si un producto es par, los dos factores son pares', items: ['2 · 4', '6 · 8', '3 · 4', '10 · 2'], bad: x => { const [a, b] = pairs(x, ' · '); return (a * b) % 2 === 0 && (a % 2 || b % 2); } },
    ] }, '$3 + 5 = 8$: impar + impar da par. $3 \\cdot 4 = 12$ es par con un factor impar: basta un factor par.',
      { hint: 'Revisa la paridad de cada ejemplo.' }),
    play('tablero-cifras', 'Dos residuos a la vez', { rounds: [{ conds: [{ say: 'entre 5 deja residuo 3', f: n => n % 5 === 3 }, { say: 'entre 4 deja residuo 1', f: n => n % 4 === 1 }, { say: 'es menor que 30', f: n => n < 30 }] }] },
      'Los que dejan 3 entre 5: 13, 18, 23, 28; de esos, solo 13 deja 1 entre 4.',
      { hint: 'Lista los que cumplen una condición y prueba la otra.' }),
    play('vuela-precios', 'Vuela al residuo', { rounds: [{ title: 'Residuos', items: [
      { ask: 'impar · impar es…', options: ['impar', 'par', 'depende'], answer: 0 },
      { ask: 'Residuo de 17 · 23 entre 5', options: ['1', '2', '3'], answer: 0 },
      { ask: 'Última cifra de 3²⁰', options: ['1', '3', '9'], answer: 0 },
    ] }] }, 'Impar por impar es impar. Residuos 2 y 3: $2 \\cdot 3 = 6$, residuo 1. Las de $3^n$ giran 3, 9, 7, 1: exponente múltiplo de 4, 1.',
      { hint: 'Trabaja con los residuos, no con los números grandes.' }),
  ]);

  setExam('pu-numeros', 'Teoría de números', [
    ['pu-nu-1', 'Todo número se escribe como producto de primos.',
      play('arbol-factores', 'Factores', { rounds: [{ n: 72 }] }, '$72 = 2^3 \\cdot 3^2$.', { hint: 'Divide por 2.' })],
    ['pu-nu-1', 'Por 3 o por 9: la suma de las cifras.',
      play('cifra-faltante', 'Cifra', { rounds: [{ tpl: '5_4', by: 3 }] }, '$9 + x$ múltiplo de 3: 0, 3, 6 o 9.', { hint: 'Suma.' })],
    ['pu-nu-2', 'El MCM es cuándo vuelven a coincidir.',
      play('ritmos-mcm', 'MCM', { rounds: [{ a: 4, b: 10, max: 30 }] }, 'En 20.', { hint: 'Coinciden.' })],
    ['pu-nu-2', 'El MCD es el trozo más grande que reparte sin sobrar.',
      play('corta-mcd', 'MCD', { rounds: [{ a: 24, b: 16 }] }, 'Baldosas de 8.', { hint: 'Divide a los dos.' })],
    ['pu-nu-3', 'La última cifra de las potencias se repite.',
      play('ultima-cifra', 'Última cifra', { rounds: [{ a: 8, n: 17 }] }, 'Ciclo 8, 4, 2, 6; residuo 1: 8.', { hint: 'Ciclo.' })],
    ['pu-nu-3', 'Lo que cae en la posición n depende del residuo.',
      play('ciclo-colores', 'Collar', { rounds: [{ cyc: ['coral', 'sky', 'mint', 'sun'], N: 50 }] }, '$50 = 4 \\cdot 12 + 2$: la segunda.', { hint: 'Residuo.' })],
  ]);
});

// Mundo 15 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-nu-1', [
    ['criba-primos', 0, 'La criba de Eratóstenes: tacha los múltiplos y quédate con los primos hasta 40'],
    ['arbol-factores', 0, 'Descompón el 84 en factores primos con el árbol', '$84 = 2 \\cdot 42 = 2 \\cdot 2 \\cdot 21 = 2^2 \\cdot 3 \\cdot 7$. No importa por dónde se empiece: los primos del final son los mismos.'],
    ['tabla-divisores', 0, 'Cuenta los divisores de $2^2 \\cdot 3^2$ con la tabla', 'Cada divisor elige cuántos 2 lleva (0, 1 o 2) y cuántos 3 (0, 1 o 2): $3 \\cdot 3 = 9$ divisores.'],
    ['cifra-faltante', 0, 'El recibo número 4_72 es divisible por 9, pero se borró una cifra. Encuéntrala', 'Las cifras deben sumar un múltiplo de 9: $4 + 7 + 2 = 13$, y con un 5 llega a 18.'],
    ['tablero-cifras', 0, 'Un número primo de dos cifras, mayor que 50, cuyas cifras suman 10. Encuéntralo', 'Los que suman 10 y pasan de 50 son 55, 64, 73, 82 y 91. Solo el 73 es primo ($91 = 7 \\cdot 13$).'],
    ['contraejemplo', 0, 'Alguien afirma: «si un número es divisible por 2 y por 4, es divisible por 8». Busca el que lo tumba', 'El 12 es divisible por 2 y por 4, pero no por 8. Ser divisible por 4 ya incluye serlo por 2: no se gana nada.'],
    ['vuela-precios', 0, 'Vuela al divisor', '$2^4$ tiene 5 divisores: 1, 2, 4, 8 y 16. En 2 346 las cifras suman 15: es divisible por 3. El único primo par es el 2.'],
  ], [
    sol('¿Cuántos divisores positivos tiene el número 200?',
      ['$200 = 8 \\cdot 25 = 2^3 \\cdot 5^2$: el exponente del 2 es [[3]] y el del 5 es [[2]]', 'Un divisor puede llevar el 2 de [[4]] maneras (0, 1, 2 o 3 veces) y el 5 de 3 maneras', 'Divisores: $4 \\cdot 3 =$ [[12]]'],
      ['5', '6', '10'],
      'Los divisores se arman escogiendo cuántas veces va cada primo, desde ninguna hasta su exponente: por eso a cada exponente se le suma 1 y los resultados se multiplican.',
      'Descompón el número en primos. Un divisor es una parte de esa descomposición.'),
    err('El número de cuatro cifras $5\\,A\\,3\\,2$ es divisible por 3. ¿Cuántos valores distintos puede tomar la cifra A?',
      ['Un número es divisible por 3 si la suma de sus cifras lo es', 'Las cifras conocidas suman $5 + 3 + 2 = 10$', 'Hace falta que $10 + A$ sea múltiplo de 3: solo sirve $A = 2$', 'La cifra A puede tomar 1 valor'], 2,
      ['Hace falta que $10 + A$ sea múltiplo de 3: sirven $A = 2$, $A = 5$ y $A = 8$', 'Hace falta que $10 + A$ sea múltiplo de 3: sirven $A = 0$, $3$, $6$ y $9$', 'Hace falta que $10 + A$ sea múltiplo de 3: sirve cualquier A impar'],
      'Hay varios múltiplos de 3 al alcance: 12, 15 y 18. Las cifras que sirven son 2, 5 y 8: tres valores.',
      'Una cifra va de 0 a 9. ¿Hasta qué múltiplos de 3 puede llegar la suma?'),
    opc('El menor número primo mayor que 50 es:',
      ['51', '57', '53', '59'], 2,
      '$51 = 3 \\cdot 17$ no es primo. El 52 es par. El 53 no tiene divisores: basta probar con 2, 3, 5 y 7.',
      'Revisa los candidatos en orden y aplica las reglas de divisibilidad: las cifras de 51 suman 6.'),
  ]);

  diezLesson('pu-nu-2', [
    ['ritmos-mcm', 1, 'El bus A pasa cada 10 minutos y el bus B cada 15. Salen juntos: ¿cuándo vuelven a coincidir?', 'Coinciden en los múltiplos comunes de 10 y 15; el primero es el MCM: 30 minutos.'],
    ['corta-mcd', 0, 'Un piso de $12 \\times 18$ se quiere cubrir con baldosas cuadradas iguales, lo más grandes posible. Halla su lado', 'El lado debe dividir a 12 y a 18: el mayor divisor común es 6.'],
    ['pares-primos', 0, 'Empareja los primos comunes de 60 y 84 para hallar su MCD', '$60 = 2^2 \\cdot 3 \\cdot 5$ y $84 = 2^2 \\cdot 3 \\cdot 7$: comparten $2^2 \\cdot 3 = 12$.'],
    ['arbol-factores', 0, 'Para hallar un MCM primero se factoriza. Descompón el 96', '$96 = 2 \\cdot 48 = 2 \\cdot 2 \\cdot 24$, y así hasta $2^5 \\cdot 3$: cinco veces el 2 y una vez el 3.'],
    ['tablero-cifras', 0, 'Un número de dos cifras, mayor que 70, que es múltiplo de 6 y de 15 a la vez. Encuéntralo', 'Los múltiplos de 6 y de 15 a la vez son los múltiplos de su MCM, 30: 30, 60, 90. El único mayor que 70 es 90.'],
    ['bolsas-residuo', 0, 'Se reparten 84 dulces en bolsas de 12. Llena las bolsas', '$84 = 12 \\cdot 7$: salen 7 bolsas y no sobra nada. El 12 es divisor de 84.'],
    ['rompe-cambios', 0, 'Manda la pelota al MCM o al MCD', 'MCM de 4 y 6: 12. MCD de 18 y 24: 6. Alarmas cada 9 y cada 12 minutos coinciden cada 36.'],
  ], [
    sol('Tres corredores dan vueltas a una pista y tardan 4, 6 y 9 minutos por vuelta. Si salen juntos de la meta, ¿a los cuántos minutos vuelven a coincidir los tres en la meta? ¿Cuántas vueltas habrá dado cada uno?',
      ['$4 = 2^2$, $6 = 2 \\cdot 3$ y $9 = 3^2$. El MCM toma cada primo con su mayor exponente: $2^2 \\cdot 3^2 =$ [[36]]', 'Vuelven a coincidir a los [[36]] minutos', 'El más rápido habrá dado $36 \\div 4 =$ [[9]] vueltas; el más lento, [[4]]'],
      ['216', '18', '6'],
      'Los tres pasan por la meta en los múltiplos de su tiempo: coinciden en el primer múltiplo común, el MCM. Multiplicar $4 \\cdot 6 \\cdot 9$ da un múltiplo común, pero no el primero.',
      'Coincidir es un problema de múltiplos comunes: busca el más pequeño.'),
    err('Se quieren armar paquetes iguales con 48 lápices y 36 borradores, sin que sobre nada y con la mayor cantidad posible de paquetes. ¿Cuántos paquetes salen?',
      ['Las dos cantidades se reparten en partes iguales: el número de paquetes debe dividir a 48 y a 36', 'Para tener la mayor cantidad de paquetes se usa el mínimo común múltiplo: 144', 'Salen 144 paquetes'], 1,
      ['Para tener la mayor cantidad de paquetes se usa el máximo común divisor: 12', 'Para tener la mayor cantidad de paquetes se usa la suma: $48 + 36 = 84$', 'Para tener la mayor cantidad de paquetes se usa el menor divisor común: 2'],
      'Repartir sin que sobre es un problema de divisores, no de múltiplos: el mayor divisor común de 48 y 36 es 12. Cada paquete lleva 4 lápices y 3 borradores.',
      'Compara la respuesta con los datos: ¿se pueden armar más paquetes que lápices hay?'),
    opc('Dos alarmas suenan juntas en este instante. Una suena cada 8 segundos y la otra cada 20 segundos. Contando también este instante, el número de veces que suenan juntas en el minuto y medio que empieza ahora es:',
      ['3', '2', '4', '7'], 0,
      'Coinciden cada MCM(8, 20) = 40 segundos: en el segundo 0, en el 40 y en el 80; la siguiente, en el 120, ya se pasa de los 90. Contando el instante inicial son 3; si el enunciado dijera «sin contar el instante inicial», serían 2. Lee siempre si el comienzo cuenta.',
      'Halla cada cuánto coinciden y haz la lista de esos momentos desde el segundo 0. ¿El 0 entra en la cuenta?'),
  ]);

  diezLesson('pu-nu-3', [
    ['ultima-cifra', 0, '¿En qué cifra termina $2^{35}$?', 'Las últimas cifras del 2 se repiten: 2, 4, 8, 6. Como $35 = 4 \\cdot 8 + 3$, es la tercera del ciclo: 8.'],
    ['bolsas-residuo', 1, 'Se sientan 53 personas en mesas de 4. Llena las mesas y mira cuántas quedan sin mesa completa', '$53 = 4 \\cdot 13 + 1$: se llenan 13 mesas y sobra una persona.'],
    ['ciclo-colores', 0, 'Una guirnalda repite cinco colores. ¿De qué color es el bombillo 88?', '$88 = 5 \\cdot 17 + 3$: después de 17 vueltas completas, es el tercer color del ciclo.'],
    ['ciclo-reloj', 0, 'Gira la rueda de la semana: ¿qué día será dentro de 250 días?', '$250 = 7 \\cdot 35 + 5$: pasan 35 semanas completas y se avanzan 5 días.'],
    ['contraejemplo', 1, 'Alguien afirma: «si un producto es par, los dos factores son pares». Busca el que lo tumba', '$3 \\cdot 4 = 12$ es par y el 3 es impar: basta un factor par para que el producto sea par.'],
    ['tablero-cifras', 0, 'Un número menor que 30 que deja residuo 3 al dividirlo entre 5 y residuo 1 al dividirlo entre 4', 'Con residuo 3 entre 5: 3, 8, 13, 18, 23, 28. De esos, el que deja residuo 1 entre 4 es el 13.'],
    ['vuela-precios', 0, 'Vuela al residuo', 'Impar por impar es impar. $17 \\cdot 23$ se comporta como $2 \\cdot 3 = 6$: residuo 1 entre 5. Y $3^{20}$ termina en 1, porque 20 es múltiplo de 4.'],
  ], [
    sol('Un número entero deja residuo 3 cuando se divide entre 5. ¿Qué residuo deja su doble al dividirlo entre 5? ¿Y su cuadrado?',
      ['Para los residuos basta trabajar con el residuo: el número se comporta como un [[3]]', 'Su doble se comporta como 6, que al dividir entre 5 deja residuo [[1]]', 'Su cuadrado se comporta como [[9]], que al dividir entre 5 deja residuo [[4]]'],
      ['6', '0', '2'],
      'Se puede comprobar con el 8 o con el 13: sus dobles (16 y 26) dejan residuo 1, y sus cuadrados (64 y 169) dejan residuo 4. Los residuos se operan entre sí y se vuelven a reducir.',
      'Prueba con un número concreto que deje residuo 3, como el 8, y después con otro.'),
    err('¿Es posible que la suma de 7 números impares sea igual a 100?',
      ['La suma de dos impares es par', 'Seis de los impares forman tres parejas: su suma es par', 'Al sumar el séptimo impar, el total sigue siendo par', 'Como 100 es par, sí es posible'], 2,
      ['Al sumar el séptimo impar, par más impar da impar', 'Al sumar el séptimo impar, el total es divisible por 7', 'Al sumar el séptimo impar, el total deja de ser un número entero'],
      'Una cantidad impar de números impares suma impar. Como 100 es par, no es posible: la paridad lo decide sin hacer ninguna cuenta.',
      'Prueba con números pequeños: ¿qué paridad tiene la suma de tres impares?'),
    opc('Hoy es lunes. El día de la semana que será dentro de 500 días es:',
      ['martes', 'miércoles', 'viernes', 'jueves'], 3,
      '$500 = 7 \\cdot 71 + 3$: pasan 71 semanas completas y sobran 3 días. Lunes más 3 es jueves.',
      'Las semanas completas no cambian el día: solo importa el residuo al dividir entre 7.'),
  ]);

  addExam('pu-numeros', [
    ['pu-nu-1', 'Un número es primo si solo se deja dividir por 1 y por él mismo.',
      opc('De los siguientes números, el único que es primo es:', ['91', '97', '87', '93'], 1,
        '$91 = 7 \\cdot 13$, $87 = 3 \\cdot 29$ y $93 = 3 \\cdot 31$. El 97 no tiene divisores.', 'Prueba con 3 (suma de cifras) y con 7.')],
    ['pu-nu-2', 'El MCM es el primer múltiplo que comparten los dos números.',
      opc('El mínimo común múltiplo de 8 y 12 es:', ['4', '96', '48', '24'], 3,
        'Múltiplos de 12: 12, 24… El 24 también es múltiplo de 8.', 'Recorre los múltiplos del mayor hasta encontrar uno del menor.')],
    ['pu-nu-3', 'Dividendo = divisor · cociente + residuo.',
      opc('El residuo de dividir 1 000 entre 7 es:', ['6', '1', '3', '0'], 0,
        '$7 \\cdot 142 = 994$ y $1\\,000 - 994 = 6$.', 'Busca el múltiplo de 7 más cercano por debajo de 1 000.')],
  ]);
});
