// Preuniversitario · mundo 11 «Operadores definidos»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const STAR = (a, b) => 2 * a - b;
  const TAB4 = [[1, 2, 3, 4], [2, 4, 1, 3], [3, 1, 4, 2], [4, 3, 2, 1]];
  const ABC = [['a', 'c', 'b'], ['a', 'b', 'c'], ['c', 'a', 'b']];
  setLesson('pu-op-1', [
    play('maquina-operador', 'La máquina de dos entradas', { rounds: [
      { sym: '\\star', tex: '2a - b', f: STAR, target: 9, lo: -5, hi: 10, fix: { a: 6 } },
      { sym: '\\triangle', tex: 'a^2 - 3b', f: (a, b) => a * a - 3 * b, target: 4, lo: 0, hi: 10, fix: { b: 4 } },
      { sym: '\\diamond', tex: 'a + 2b', f: (a, b) => a + 2 * b, target: 11, lo: 0, hi: 10 },
    ] }, 'Se reemplaza $a$ por el primer número y $b$ por el segundo: $2 \\cdot 6 - 3 = 9$; $4^2 - 3 \\cdot 4 = 4$; y $a + 2b = 11$ tiene varias parejas, como $(1, 5)$ o $(5, 3)$.',
      { hint: 'Escribe la regla con los números puestos y mira cuánto falta para el resultado.' }),
    play('cruce-tabla', 'La operación por tabla', { rounds: [{ set: [1, 2, 3, 4], tab: TAB4, chain: [3, 4] }, { set: ['a', 'b', 'c'], tab: ABC, chain: ['b', 'a'] }] },
      'Fila del primero, columna del segundo: $3 \\circ 4 = 2$. En la segunda tabla $b \\circ a = a$, pero $a \\circ b = c$: el orden importa.',
      { hint: 'El primer elemento manda la fila; el segundo, la columna.' }),
    play('neutro-buscador', 'El que no cambia nada', { rounds: [
      { sym: '\\circ', tex: 'a + b - 3', f: (a, b) => a + b - 3, lo: -5, hi: 8, as: [1, 2, 4, 6] },
      { sym: '\\odot', tex: 'a + b + a \\cdot b', f: (a, b) => a + b + a * b, lo: -5, hi: 8, as: [1, 2, 3, 5] },
      { sym: '\\#', tex: 'a \\cdot b \\div 2', f: (a, b) => a * b / 2, lo: -5, hi: 8, as: [2, 4, 6, 8] },
    ] }, '$a + 3 - 3 = a$: $e = 3$. $a + 0 + a \\cdot 0 = a$: $e = 0$. $a \\cdot 2 \\div 2 = a$: $e = 2$.',
      { hint: 'Escribe $a \\circ e = a$ con la regla y despeja $e$; tiene que servir para todos los $a$.' }),
    play('adivina-operador', '¿Cuál es la regla?', { rounds: [
      { sym: '\\star', ex: [[3, 1, 8], [2, 5, 1], [4, 4, 8]], rules: [{ tex: 'a + b + 4', f: (a, b) => a + b + 4 }, { tex: '2a + b', f: (a, b) => 2 * a + b }, { tex: '3a - b', f: (a, b) => 3 * a - b }, { tex: 'a \\cdot b + 5', f: (a, b) => a * b + 5 }], ok: 2 },
      { sym: '\\diamond', ex: [[2, 3, 10], [1, 4, 9], [5, 0, 25]], rules: [{ tex: 'a + b + 5', f: (a, b) => a + b + 5 }, { tex: 'a^2 + 2b', f: (a, b) => a * a + 2 * b }, { tex: '2ab - 2', f: (a, b) => 2 * a * b - 2 }, { tex: '2(a + b)', f: (a, b) => 2 * (a + b) }], ok: 1 },
    ] }, 'La regla tiene que dar todos los ejemplos: $3a - b$ da 8, 1 y 8. En la segunda, el primer ejemplo lo cumplen las cuatro reglas; solo $a^2 + 2b$ cumple también los otros dos.',
      { hint: 'Que una regla sirva para un ejemplo no basta: pruébala con todos.' }),
    play('contraejemplo', '¿Importa el orden?', { rounds: [{ claim: 'Con a ★ b = 2a − b, cambiar el orden da lo mismo en cada pareja (a, b)', items: ['(3, 3)', '(5, 5)', '(2, 6)', '(0, 0)'], bad: x => { const [a, b] = x.slice(1, -1).split(', ').map(Number); return 2 * a - b !== 2 * b - a; } }] },
      'Con $(2, 6)$: $2 \\star 6 = -2$ pero $6 \\star 2 = 10$. Con números iguales no se nota; basta una pareja distinta para ver que no es conmutativa.',
      { hint: 'Calcula $a \\star b$ y $b \\star a$ con cada pareja.' }),
    play('capas-operacion', 'Reemplaza y calcula por capas', { rounds: [{ title: 'Después de reemplazar', items: [{ expr: '4 ^ 2 - 3 * 5' }, { expr: '2 * 7 - 3 * 2' }] }] },
      'Con $a \\triangle b = a^2 - 3b$: $4 \\triangle 5 = 4^2 - 3 \\cdot 5 = 16 - 15 = 1$. Con $a \\otimes b = 2a - 3b$: $7 \\otimes 2 = 14 - 6 = 8$. Primero potencias, luego productos, luego restas.',
      { hint: 'Al reemplazar aparecen potencias y productos: resuélvelos antes de restar.' }),
    play('vuela-precios', 'Vuela al resultado del operador', { rounds: [{ title: 'Operadores', items: [
      { ask: 'a ★ b = 2a − b: 4 ★ 1', options: ['7', '2', '9'], answer: 0 },
      { ask: 'a ∘ b = a + b − 3: el neutro', options: ['3', '0', '−3'], answer: 0 },
      { ask: 'a # b = a·b − b: 3 # 2', options: ['4', '5', '6'], answer: 0 },
    ] }] }, '$2 \\cdot 4 - 1 = 7$. El neutro deja $a + e - 3 = a$: $e = 3$. $3 \\cdot 2 - 2 = 4$.',
      { hint: 'Reemplaza con cuidado: el primer número va en $a$.' }),
  ]);

  setLesson('pu-op-2', [
    play('anida-operador', 'De adentro hacia afuera', { rounds: [
      { sym: '\\star', tex: '2a - b', f: STAR, expr: [[4, 3], 2] },
      { sym: '\\#', tex: 'a + 2b', f: (a, b) => a + 2 * b, expr: [2, [1, 3]] },
      { sym: '\\circ', tex: 'a \\cdot b - 1', f: (a, b) => a * b - 1, expr: [[2, 3], [1, 4]] },
    ] }, '$4 \\star 3 = 5$ y $5 \\star 2 = 8$. $1 \\# 3 = 7$ y $2 \\# 7 = 16$. $2 \\circ 3 = 5$, $1 \\circ 4 = 3$ y $5 \\circ 3 = 14$.',
      { hint: 'Solo se puede calcular una caja que ya no tenga cajas adentro.' }),
    play('busca-x-operador', 'La x dentro del operador', { rounds: [
      { sym: '\\oplus', tex: '3a + b', f: (a, b) => 3 * a + b, k: 5, side: 'left', target: 26, lo: -5, hi: 10 },
      { sym: '\\star', tex: '2a - b', f: STAR, k: 3, side: 'right', target: -4, lo: -5, hi: 15 },
      { sym: '\\triangle', tex: 'a^2 - b', f: (a, b) => a * a - b, k: 4, side: 'left', target: 21, lo: 0, hi: 10 },
    ] }, '$3x + 5 = 26$ da $x = 7$. $3 \\star x = 6 - x = -4$ da $x = 10$ (aquí $x$ es el segundo). $x^2 - 4 = 21$ da $x = 5$.',
      { hint: 'Fíjate si la x está en el lugar de $a$ o en el de $b$ antes de reemplazar.' }),
    play('cruce-tabla', 'Cadenas en la tabla', { rounds: [
      { set: [0, 1, 2, 3], tab: [[0, 1, 2, 3], [1, 2, 3, 0], [2, 3, 0, 1], [3, 0, 1, 2]], chain: [2, 3, 3] },
      { set: ['a', 'b', 'c'], tab: ABC, chain: ['c', 'b', 'a'] },
    ] }, 'Primero el paréntesis: $2 \\circ 3 = 1$ y luego $1 \\circ 3 = 0$. En la otra, $c \\circ b = a$ y $a \\circ a = a$.',
      { hint: 'Lo que sale del primer cruce es la fila del segundo.' }),
    play('maquina-operador', 'Encuentra la entrada', { rounds: [{ sym: '\\star', tex: 'a^2 - 2b', f: (a, b) => a * a - 2 * b, target: 3, lo: 0, hi: 8, fix: { a: 3 } }] },
      '$9 - 2b = 3$: $2b = 6$ y $b = 3$.',
      { hint: 'Con $a$ fija, la regla se vuelve una ecuación en $b$.' }),
    play('capas-operacion', 'El anidado, reemplazado', { rounds: [{ title: '(4 ★ 2) ★ 3', items: [{ expr: '2 * ( 2 * 4 - 2 ) - 3' }] }] },
      'Con $a \\star b = 2a - b$, $(4 \\star 2) \\star 3 = 2(2 \\cdot 4 - 2) - 3 = 2 \\cdot 6 - 3 = 9$: el paréntesis es la operación de adentro.',
      { hint: 'Lo de adentro del paréntesis es la primera operación.' }),
    play('arma-negacion', 'Escribe el reemplazo', { rounds: [
      { ask: 'Con a ★ b = 2a − b, escribe la regla', show: '$5 \\star x$', tray: ['$2 \\cdot 5$', '$2x$', '$-$', '$+$', '$x$', '$5$'], need: [0, 2, 4] },
      { ask: 'Con a ⊕ b = 3a + b, escribe la regla', show: '$x \\oplus 7$', tray: ['$3x$', '$3 \\cdot 7$', '$+$', '$-$', '$7$', '$x$'], need: [0, 2, 4], alt: [[4, 2, 0]] },
    ] }, '$5 \\star x = 2 \\cdot 5 - x$: el 5 va en $a$ y la $x$ en $b$. $x \\oplus 7 = 3x + 7$.',
      { hint: 'Copia la regla y cambia $a$ por lo de la izquierda y $b$ por lo de la derecha.' }),
    play('balanza-cajas', 'Despeja lo que queda', { rounds: [{ title: 'Ecuaciones del operador', items: [{ a: 3, b: 2, c: 0, d: 17 }, { a: 4, b: 3, c: 1, d: 12 }] }] },
      'Con $x \\oplus 2 = 17$ y $\\oplus$ como $3a + b$: $3x + 2 = 17$, $x = 5$. Y $4x + 3 = x + 12$ da $3x = 9$, $x = 3$.',
      { hint: 'Quita lo mismo de los dos platillos hasta dejar cajas solas contra baldosas.' }),
  ]);

  setExam('pu-operadores', 'Operadores definidos', [
    ['pu-op-1', 'En un operador, el primer número reemplaza a $a$ y el segundo a $b$.',
      play('maquina-operador', 'Máquina', { rounds: [{ sym: '\\star', tex: '3a - b', f: (a, b) => 3 * a - b, target: 10, lo: 0, hi: 10, fix: { a: 4 } }] }, '$12 - b = 10$: $b = 2$.', { hint: 'Reemplaza.' })],
    ['pu-op-1', 'Por tabla: fila del primero, columna del segundo.',
      play('cruce-tabla', 'Tabla', { rounds: [{ set: [1, 2, 3, 4], tab: TAB4, chain: [4, 2] }] }, '$4 \\circ 2 = 3$.', { hint: 'Fila 4.' })],
    ['pu-op-1', 'El neutro cumple $a \\circ e = a$ para todo $a$.',
      play('neutro-buscador', 'Neutro', { rounds: [{ sym: '\\circ', tex: 'a + b + 5', f: (a, b) => a + b + 5, lo: -8, hi: 5, as: [1, 3, 5, 7] }] }, '$e = -5$.', { hint: 'Despeja.' })],
    ['pu-op-2', 'Los anidados se resuelven de adentro hacia afuera.',
      play('anida-operador', 'Anidado', { rounds: [{ sym: '\\star', tex: 'a + 3b', f: (a, b) => a + 3 * b, expr: [[1, 2], 1] }] }, '$1 \\star 2 = 7$ y $7 \\star 1 = 10$.', { hint: 'Adentro.' })],
    ['pu-op-2', 'Con el operador en una ecuación, se reemplaza y se despeja.',
      play('busca-x-operador', 'Ecuación', { rounds: [{ sym: '\\oplus', tex: '2a + 3b', f: (a, b) => 2 * a + 3 * b, k: 2, side: 'left', target: 14, lo: -5, hi: 10 }] }, '$2x + 6 = 14$: $x = 4$.', { hint: 'Reemplaza.' })],
  ]);
});

// Mundo 11 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-op-1', [
    ['maquina-operador', 0, 'La máquina aplica $a \\star b = 2a - b$. Ya entró el 6: elige la otra entrada para que salga 9', '$2 \\cdot 6 - b = 9$: la segunda entrada es 3.'],
    ['cruce-tabla', 0, 'Esta operación no tiene fórmula: está en una tabla. Halla $3 \\ast 4$', 'El resultado está en el cruce de la fila del primer número con la columna del segundo: fila 3, columna 4, da 2.'],
    ['neutro-buscador', 0, 'Con $a \\circ b = a + b - 3$, busca el número que no cambia a los demás', 'Para que $a \\circ e = a$ hace falta $a + e - 3 = a$: el neutro es 3.'],
    ['adivina-operador', 0, 'Tres ejemplos de una operación secreta: $3 \\star 1 = 8$, $2 \\star 5 = 1$ y $4 \\star 4 = 8$. ¿Cuál es la regla?', 'La única regla que cumple los tres ejemplos es $3a - b$: $9 - 1 = 8$, $6 - 5 = 1$ y $12 - 4 = 8$.'],
    ['contraejemplo', 0, 'Alguien afirma que en $a \\star b = 2a - b$ el orden no importa. Busca la pareja que lo desmiente', 'Con $(2, 6)$: $2 \\star 6 = -2$, pero $6 \\star 2 = 10$. Las parejas de números iguales no sirven para probar nada.'],
    ['capas-operacion', 0, 'Después de reemplazar en el operador queda una cuenta corriente. Resuélvela por capas', 'Primero la potencia y los productos, después la resta: $16 - 15 = 1$ y $14 - 6 = 8$.'],
    ['vuela-precios', 0, 'Vuela al resultado del operador', '$4 \\star 1 = 2 \\cdot 4 - 1 = 7$. El neutro de $a + b - 3$ es 3. Y $3 \\,\\#\\, 2 = 3 \\cdot 2 - 2 = 4$.'],
  ], [
    sol('En los números enteros se define la operación $a \\diamond b = 3a - 2b$. Calcula $5 \\diamond 4$ y $4 \\diamond 5$. ¿La operación es conmutativa?',
      ['En $5 \\diamond 4$ el primero es 5 y el segundo es 4: $3 \\cdot 5 - 2 \\cdot 4 =$ [[7]]', 'En $4 \\diamond 5$ el primero es 4: $3 \\cdot 4 - 2 \\cdot 5 =$ [[2]]', 'Los resultados son [[distintos]]: la operación [[no es]] conmutativa'],
      ['iguales', 'es', '−2'],
      'Un operador definido es una receta con dos puestos: lo que se hace con el primer número no es lo mismo que con el segundo. Por eso el orden puede cambiar el resultado.',
      'Marca cuál número ocupa el lugar de a y cuál el de b antes de reemplazar.'),
    err('Se define la operación $a \\circ b = a^2 - b$. ¿Cuánto vale $(-3) \\circ 4$?',
      ['El primer número es $-3$ y el segundo es 4', 'Se eleva el primero al cuadrado: $(-3)^2 = -9$', 'Se resta el segundo: $-9 - 4 = -13$'], 1,
      ['Se eleva el primero al cuadrado: $(-3)^2 = 9$', 'Se eleva el primero al cuadrado: $(-3)^2 = -6$', 'Se eleva el primero al cuadrado: $(-3)^2 = 6$'],
      'Al reemplazar un número negativo va con su paréntesis: $(-3)^2 = 9$. El resultado es $9 - 4 = 5$.',
      'Reemplaza la letra por el número completo, con su signo y entre paréntesis.'),
    opc('En los números reales se define la operación $a \\star b = a \\cdot b - a$. El valor de $3 \\star 5$ menos el valor de $5 \\star 3$ es:',
      ['0', '2', '$-2$', '4'], 1,
      '$3 \\star 5 = 15 - 3 = 12$ y $5 \\star 3 = 15 - 5 = 10$. La diferencia es 2.',
      'Calcula cada uno por separado: en cada caso, el número que se resta es el primero.'),
  ]);

  diezLesson('pu-op-2', [
    ['anida-operador', 0, 'Con $a \\star b = 2a - b$, calcula $(4 \\star 3) \\star 2$ de adentro hacia afuera', 'Primero el paréntesis: $4 \\star 3 = 8 - 3 = 5$. Después $5 \\star 2 = 10 - 2 = 8$.'],
    ['busca-x-operador', 0, 'Con $a \\oplus b = 3a + b$, halla la $x$ que cumple $x \\oplus 5 = 26$', 'Al reemplazar queda $3x + 5 = 26$: $3x = 21$ y $x = 7$.'],
    ['cruce-tabla', 0, 'Una cadena de operaciones en la tabla: $(2 \\ast 3) \\ast 3$', 'Se opera de a dos: $2 \\ast 3 = 1$ y luego $1 \\ast 3 = 0$. Esta tabla suma y se queda con el residuo al dividir entre 4.'],
    ['maquina-operador', 0, 'La máquina aplica $a \\star b = a^2 - 2b$. Ya entró el 3: elige la otra entrada para que salga 3', '$3^2 - 2b = 3$ da $2b = 6$: la segunda entrada es 3.'],
    ['capas-operacion', 0, 'El anidado $(4 \\star 2) \\star 3$, ya reemplazado. Resuélvelo por capas', 'El paréntesis vale $2 \\cdot 4 - 2 = 6$; después $2 \\cdot 6 - 3 = 9$.'],
    ['arma-negacion', 0, 'Con $a \\star b = 2a - b$, escribe con fichas qué significa $5 \\star x$', 'El 5 ocupa el lugar de a y la x el de b: $2 \\cdot 5 - x$.'],
    ['balanza-cajas', 0, 'Después de reemplazar queda una ecuación. Despeja lo que hay en la caja'],
  ], [
    sol('En los números enteros se define la operación $a \\ast b = a \\cdot b - (a + b)$. ¿Cuánto vale $(4 \\ast 3) \\ast 2$?',
      ['Primero el paréntesis: $4 \\ast 3 = 12 - 7 =$ [[5]]', 'Ese resultado ocupa el lugar del paréntesis: queda $5 \\ast 2$, con producto [[10]] y suma [[7]]', '$5 \\ast 2 = 10 - 7 =$ [[3]]'],
      ['8', '24', '−3'],
      'Un anidado se resuelve de adentro hacia afuera: el resultado del paréntesis pasa a ser un número más de la operación siguiente. Y en cada paso se usa la misma regla: el producto menos la suma.',
      'Lee primero la regla de esta operación. Después olvida por un momento el 2 de afuera y resuelve solo el paréntesis.'),
    err('Otra operación, con otra regla: se define $a \\odot b = 4a - 3b$. ¿Para qué valor de $x$ se cumple $2 \\odot x = -7$?',
      ['Se reemplaza: el 2 ocupa el lugar de a y la x el de b, así que $2 \\odot x = 4 \\cdot 2 - 3x$', 'Se simplifica: $8 - 3x$', 'Se plantea $8 - 3x = -7$, así que $-3x = 1$', 'Entonces $x = -\\tfrac13$'], 2,
      ['Se plantea $8 - 3x = -7$, así que $-3x = -15$', 'Se plantea $8 - 3x = -7$, así que $3x = -15$', 'Se plantea $8 - 3x = -7$, así que $-3x = -7$'],
      'Al pasar el 8 al otro lado se resta: $-7 - 8 = -15$. Entonces $x = 5$, y se comprueba: $4 \\cdot 2 - 3 \\cdot 5 = 8 - 15 = -7$. Cada problema trae su propia regla: antes de reemplazar, lee qué hace la operación con a y con b. Aquí es $4a - 3b$, no el producto menos la suma del ejercicio anterior.',
      'Lee bien la regla de esta operación y mira qué número va en el lugar de a y cuál en el de b. Al final, comprueba tu x reemplazándola.'),
    opc('Para números reales se define $a \\,\\#\\, b = 2a + b$. El valor de $x$ que cumple $x \\,\\#\\, 3 = 3 \\,\\#\\, x$ es:',
      ['0', '1', '6', '3'], 3,
      '$x \\,\\#\\, 3 = 2x + 3$ y $3 \\,\\#\\, x = 6 + x$. Igualando: $2x + 3 = 6 + x$, así que $x = 3$.',
      'Reemplaza en los dos lados con cuidado: la x ocupa un puesto distinto en cada uno.'),
  ]);

  addExam('pu-operadores', [
    ['pu-op-1', 'Un operador definido es una receta: cada letra se reemplaza por el número que ocupa su lugar.',
      opc('Se define la operación $a \\triangle b = a^2 + b$. El valor de $3 \\triangle 4$ es:', ['10', '19', '13', '7'], 2,
        '$3^2 + 4 = 9 + 4 = 13$.', 'El cuadrado es solo para el primer número.')],
    ['pu-op-2', 'Los operadores anidados se resuelven de adentro hacia afuera.',
      opc('Se define la operación $a \\star b = 2a - b$. El valor de $(5 \\star 4) \\star 3$ es:', ['9', '3', '6', '15'], 0,
        '$5 \\star 4 = 10 - 4 = 6$ y $6 \\star 3 = 12 - 3 = 9$.', 'Resuelve primero el paréntesis.')],
  ]);
});
