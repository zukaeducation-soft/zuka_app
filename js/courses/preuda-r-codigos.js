// Preuniversitario · mundo 8 «Codificación»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const KEY = [['R', '#'], ['A', '*'], ['M', '%'], ['O', '@'], ['T', '&'], ['S', '=']];
  setLesson('pu-cd-1', [
    play('rueda-cesar', 'La rueda de César', { rounds: [{ pair: ['A', 'E'], msg: 'QIWE' }, { pair: ['B', 'D'], msg: 'RGTTQ' }] },
      'Si A se cifra E, cada letra avanza 4: para descifrar se retrocede 4 y QIWE dice MESA. Si B se cifra D, la clave es +2 y RGTTQ dice PERRO.',
      { hint: 'Alinea la letra original con su cifrada: el mismo giro sirve para todas las letras.' }),
    play('clave-simbolos', 'Clave de símbolos', { rounds: [{ key: KEY, word: 'RAMO', mode: 'code' }, { key: KEY, word: 'ROSA', mode: 'decode' }] },
      'Con la tabla, cada letra tiene siempre su símbolo: RAMO es # * % @, y # @ = * se lee ROSA.',
      { hint: 'Busca cada letra (o cada símbolo) en la tabla, uno por uno, sin saltarte ninguno.' }),
    play('altura-letras', 'Lo que vale una palabra', { rounds: [{ word: 'PAN' }, { word: 'DEDO' }] },
      'Cada letra vale su lugar: $P + A + N = 16 + 1 + 14 = 31$ y $D + E + D + O = 4 + 5 + 4 + 15 = 28$.',
      { hint: 'Sin la Ñ, la K es la 11: cuenta desde la regla de la izquierda.' }),
    play('binario-luces', 'El código de los bombillos', { rounds: [{ n: 13, bits: 5 }, { n: 22, bits: 5 }, { n: 7, bits: 4 }] },
      'Cada bombillo vale el doble del de su derecha: $13 = 8 + 4 + 1$ (01101), $22 = 16 + 4 + 2$ (10110) y $7 = 4 + 2 + 1$ (0111).',
      { hint: 'Empieza por el bombillo más grande que quepa en el número y sigue con lo que falta.' }),
    play('cuadro-polibio', 'Letras con coordenadas', { rounds: [{ word: 'FLOR', mode: 'code' }, { word: 'VELA', mode: 'code' }] },
      'Cada letra es su fila y su columna: F = 21, L = 32, O = 35, R = 43; V = 52, E = 15, L = 32, A = 11.',
      { hint: 'Primero la fila (número de la izquierda) y después la columna (número de arriba).' }),
    play('espejo-palabra', 'El código espejo', { rounds: [{ word: 'PAZ' }, { word: 'RISA' }] },
      'En el espejo la palabra se lee al revés: PAZ se ve ZAP y RISA se ve ASIR, cada letra volteada.',
      { hint: 'La última letra de la palabra es la primera que se ve en el espejo.' }),
    play('vuela-precios', 'Vuela al código correcto', { rounds: [{ title: 'Códigos', items: [
      { ask: 'César +3: ¿cómo se cifra ASA?', options: ['DVD', 'BTB', 'CUC'], answer: 0 },
      { ask: 'A = 1, …, Z = 26: ¿cuánto vale OSO?', options: ['49', '47', '51'], answer: 0 },
      { ask: 'En binario, 10010 es…', options: ['18', '20', '9'], answer: 0 },
    ] }] }, 'A + 3 = D y S + 3 = V: DVD. $15 + 19 + 15 = 49$. $10010 = 16 + 2 = 18$.',
      { hint: 'Haz cada cuenta con la regla del código antes de volar.' }),
  ]);

  setLesson('pu-cd-2', [
    play('maquina-regla', 'La máquina de la regla', { rounds: [
      { ex: [[34, 7], [52, 7], [18, 9]], ask: 46, op: 'dsum' },
      { ex: [[3, 11], [5, 13], [10, 18]], ask: 21, op: 'add', k: 8 },
      { ex: [[23, 6], [45, 20], [17, 7]], ask: 38, op: 'dmul' },
    ] }, 'La regla tiene que servir con todos los ejemplos: $3 + 4 = 7$, $5 + 2 = 7$, $1 + 8 = 9$ (suma de cifras, $46 \\to 10$); sumar 8 ($21 \\to 29$); y multiplicar las cifras ($38 \\to 24$).',
      { hint: 'Prueba una regla y mira si la máquina marca todos los ejemplos; si falla uno, no es la regla.' }),
    play('permuta-codigo', 'El código que reordena', { rounds: [
      { ex: [['PERA', 'REPA'], ['LIMO', 'MILO']], word: 'NUBE' },
      { ex: [['FRESA', 'RFSEA'], ['PLUMA', 'LPMUA']], word: 'CIELO' },
    ] }, 'En la primera, la primera y la tercera letra cambian de lugar: NUBE → BUNE. En la segunda se cambian las letras de dos en dos y la última se queda: CIELO → ICLEO.',
      { hint: 'Fíjate a qué lugar fue a parar la primera letra de cada ejemplo, luego la segunda…' }),
    play('rueda-cesar', 'Descubre la clave con una palabra', { rounds: [{ pair: ['NUBE', 'QXEH'], msg: 'IUXWD' }] },
      'N → Q, U → X, B → E, E → H: todas avanzan 3. Retrocediendo 3, IUXWD dice FRUTA.',
      { hint: 'Mira cuánto avanzó la primera letra y comprueba con las demás.' }),
    play('clave-simbolos', 'La clave escondida en los ejemplos', { rounds: [{ key: [['C', '#'], ['A', '*'], ['S', '%'], ['O', '@'], ['L', '&']], ex: [['CASO', '# * % @'], ['SOL', '% @ &']], word: 'LOCA', mode: 'decode' }] },
      'Comparando posición por posición: C = #, A = *, S = %, O = @ y, con SOL, L = &. Entonces & @ # * dice LOCA.',
      { hint: 'Pon cada letra encima de su símbolo en los ejemplos.' }),
    play('letras-salto', 'La regla de las letras', { rounds: [{ seq: ['D', 'H', 'L', 'P'], need: 'T' }, { seq: ['Y', 'V', 'S', 'P'], need: 'M' }] },
      'D, H, L, P son 4, 8, 12, 16: sigue 20, T. Y, V, S, P son 25, 22, 19, 16: sigue 13, M.',
      { hint: 'Pasa las letras a números y busca el salto.' }),
    play('cuadro-polibio', 'Descifra las coordenadas', { rounds: [{ word: 'NIDO', mode: 'decode' }] },
      'Fila y columna: 34 es N, 24 es I, 14 es D y 35 es O: NIDO.',
      { hint: 'La primera cifra es la fila; la segunda, la columna.' }),
    play('rompe-cambios', 'Manda la pelota a lo que sigue la regla', { miss: 'comprueba la regla con todos los ejemplos', rounds: [{ title: 'Reglas', items: [
      { ask: 'Si PISO se escribe OSIP, ¿cómo se escribe RAMO?', options: ['OMAR', 'AMOR', 'MORA'], answer: 0 },
      { ask: '12 → 3, 41 → 5, 70 → 7. ¿27 → ?', options: ['9', '14', '5'], answer: 0 },
      { ask: 'Si CAMA se cifra DBNB, ¿qué dice TPM?', options: ['SOL', 'UQN', 'TOM'], answer: 0 },
    ] }] }, 'PISO al revés es OSIP: RAMO al revés, OMAR. Se suman las cifras: $2 + 7 = 9$. Cada letra avanzó 1: retrocediendo, TPM dice SOL.',
      { hint: 'Descubre la regla con el ejemplo y aplícala tal cual.' }),
  ]);

  setExam('pu-codigos', 'Codificación', [
    ['pu-cd-1', 'En la clave César todas las letras se corren lo mismo.',
      play('rueda-cesar', 'César', { rounds: [{ pair: ['C', 'F'], msg: 'GLD' }] }, 'Clave +3: GLD dice DIA.', { hint: 'Retrocede.' })],
    ['pu-cd-1', 'Con A = 1, …, Z = 26 (sin Ñ), una palabra vale la suma de sus letras.',
      play('altura-letras', 'Valor', { rounds: [{ word: 'MAR' }] }, '$13 + 1 + 18 = 32$.', { hint: 'Suma lugares.' })],
    ['pu-cd-1', 'En binario cada lugar vale el doble del de su derecha.',
      play('binario-luces', 'Binario', { rounds: [{ n: 25, bits: 5 }] }, '$25 = 16 + 8 + 1$: 11001.', { hint: 'Del más grande.' })],
    ['pu-cd-2', 'La regla tiene que servir para todos los ejemplos.',
      play('maquina-regla', 'Regla', { rounds: [{ ex: [[4, 12], [7, 21], [10, 30]], ask: 9, op: 'mul', k: 3 }] }, 'Multiplicar por 3: $9 \\to 27$.', { hint: 'Todos.' })],
    ['pu-cd-2', 'Si las letras no cambian, el código solo las reordena.',
      play('permuta-codigo', 'Orden', { rounds: [{ ex: [['TECLA', 'ALCET']], word: 'PIANO' }] }, 'Se escribe al revés: ONAIP.', { hint: 'La primera.' })],
    ['pu-cd-2', 'Una clave se saca comparando los ejemplos posición por posición.',
      play('clave-simbolos', 'Clave', { rounds: [{ key: [['P', '#'], ['A', '*'], ['L', '%'], ['O', '@']], ex: [['PALO', '# * % @']], word: 'POLO', mode: 'decode' }] }, '# @ % @ dice POLO.', { hint: 'Compara.' })],
  ]);
});

// Mundo 8 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-cd-1', [
    ['rueda-cesar', 0, 'Un mensaje secreto dice QIWE y se sabe que la A se escribe E. Gira la rueda y descífralo', 'De la A a la E la rueda avanza 4 letras. Para descifrar se retroceden 4: QIWE es MESA.'],
    ['clave-simbolos', 1, 'Un candado usa símbolos en lugar de letras. Descifra la palabra con la tabla', 'Cada símbolo vale siempre la misma letra: se cambia uno por uno, mirando la tabla.'],
    ['altura-letras', 0, 'Si A vale 1, B vale 2 y así hasta la Z, ¿cuánto vale la palabra PAN?', 'P es la letra 16, A la 1 y N la 14: $16 + 1 + 14 = 31$.'],
    ['binario-luces', 1, 'Un tablero de 5 bombillos muestra números. Enciende los que forman el 22', 'Los bombillos valen 16, 8, 4, 2 y 1: $22 = 16 + 4 + 2$. En binario, 10110.'],
    ['cuadro-polibio', 0, 'En esta clave, cada letra es su fila y su columna en el cuadro. Cifra la palabra FLOR', 'Cada letra se cambia por dos números: primero la fila y después la columna en que está.'],
    ['espejo-palabra', 1, 'Un mensaje se escribe al revés para esconderlo. Escribe RISA en código espejo', 'Se invierte el orden de las letras: RISA queda ASIR.'],
    ['vuela-precios', 0, 'Vuela al código correcto', 'César +3: A pasa a D y S a V, ASA es DVD. OSO vale $15 + 19 + 15 = 49$. Y 10010 es $16 + 2 = 18$.'],
  ], [
    sol('En una clave, cada letra se reemplaza por la que está 3 puestos después en el alfabeto (de 26 letras, sin Ñ); después de la Z se vuelve a empezar por la A. ¿Cómo se cifra la palabra ZONA?',
      ['La Z está al final: al avanzar 3 se da la vuelta y queda [[C]]', 'La O avanza 3 puestos: [[R]]', 'La N pasa a [[Q]] y la A pasa a [[D]]', 'ZONA se cifra como [[CRQD]]'],
      ['W', 'CRQC', 'X'],
      'El alfabeto se trata como una rueda: después de la Z siguen A, B, C. Cada letra avanza lo mismo, sin importar dónde esté.',
      'Escribe el final del alfabeto, …X, Y, Z, y continúa con el comienzo, como si fuera un círculo.'),
    err('En un tablero de 5 bombillos, cada bombillo vale, de izquierda a derecha, 16, 8, 4, 2 y 1. Un bombillo encendido se escribe 1 y uno apagado, 0. ¿Qué número representa el tablero 1 0 1 0 1?',
      ['Están encendidos el primero, el tercero y el quinto bombillo', 'Sus valores son 16, 4 y 1', 'El número es $16 \\cdot 4 \\cdot 1 = 64$'], 2,
      ['El número es $16 + 4 + 1 = 21$', 'El número es $1 + 3 + 5 = 9$', 'El número es diez mil ciento uno'],
      'Los valores de los bombillos encendidos se suman: $16 + 4 + 1 = 21$. Así se escriben los números en binario.',
      'Cada bombillo encendido aporta su valor al total. ¿Los aportes se juntan sumando o multiplicando?'),
    opc('Si A = 1, B = 2, C = 3 y así sucesivamente hasta Z = 26 (alfabeto sin Ñ), el valor de la palabra CASA, que se obtiene sumando los valores de sus letras, es:',
      ['23', '24', '25', '22'], 1,
      'C vale 3, A vale 1 y S vale 19: $3 + 1 + 19 + 1 = 24$.',
      'Cuenta con cuidado el puesto de la S: es la letra que más pesa.'),
  ]);

  diezLesson('pu-cd-2', [
    ['maquina-regla', 0, 'Una máquina transforma números: 34 → 7, 52 → 7 y 18 → 9. ¿Qué entrega con el 46?', 'La máquina suma las cifras: $3 + 4 = 7$, $5 + 2 = 7$, $1 + 8 = 9$. Con 46 entrega $4 + 6 = 10$.'],
    ['permuta-codigo', 0, 'Este código no cambia las letras: las cambia de puesto. Cifra NUBE', 'PERA pasa a REPA y LIMO a MILO: la primera letra y la tercera cambian de lugar. NUBE queda BUNE.'],
    ['rueda-cesar', 0, 'Se sabe que NUBE se cifra QXEH. Descubre la clave y descifra el mensaje', 'De N a Q hay 3 puestos, y lo mismo en las demás letras. Retrocediendo 3, IUXWD es FRUTA.'],
    ['clave-simbolos', 0, 'La clave está escondida en los ejemplos. Descifra la palabra', 'De CASO y SOL salen los símbolos de C, A, S, O y L. Con ellos se lee LOCA.'],
    ['letras-salto', 1, 'La regla de las letras: halla la que sigue en Y, V, S, P', 'Los puestos bajan de 3 en 3: 25, 22, 19, 16. Sigue el 13, la M.'],
    ['cuadro-polibio', 0, 'Un mensaje llega en coordenadas. Descífralo con el cuadro', 'Cada pareja de números señala una fila y una columna del cuadro: ahí está la letra.'],
    ['rompe-cambios', 0, 'Manda la pelota a lo que sigue la regla', 'PISO al revés es OSIP: RAMO es OMAR. $12 \\to 3$ suma las cifras: $27 \\to 9$. Y CAMA → DBNB avanza una letra: TPM, retrocediendo, es SOL.'],
  ], [
    sol('En cierto código, la palabra GATO se escribe HBUP y la palabra LUNA se escribe MVOB. ¿Cómo se escribe PERA en ese código? ¿Qué palabra se cifró como DJOF?',
      ['G pasa a H y A pasa a B: cada letra avanza [[1]] puesto', 'PERA se escribe [[QFSB]]', 'Para leer un mensaje cifrado se hace lo contrario: se [[retrocede]] un puesto', 'DJOF es la palabra [[CINE]]'],
      ['avanza', 'EKPG', 'OFSB'],
      'La regla se descubre comparando letra por letra un ejemplo y se comprueba con el otro. Cifrar y descifrar son operaciones contrarias.',
      'Compara la primera letra de GATO con la primera de HBUP. ¿Pasa lo mismo con todas?'),
    err('Una máquina transforma números así: $3 \\to 10$, $5 \\to 16$ y $8 \\to 25$. ¿Qué número entrega si entra el 12?',
      ['Con $3 \\to 10$ se propone la regla «sumar 7»', 'Se comprueba con otro ejemplo: $5 + 7 = 12$, que no es 16. Esa regla no sirve', 'Se prueba «multiplicar por 3 y sumar 1»: $3 \\cdot 3 + 1 = 10$, $3 \\cdot 5 + 1 = 16$ y $3 \\cdot 8 + 1 = 25$', 'Entonces $12 \\to 12 + 7 = 19$'], 3,
      ['Entonces $12 \\to 3 \\cdot 12 + 1 = 37$', 'Entonces $12 \\to 3 \\cdot 12 = 36$', 'Entonces $12 \\to 2 \\cdot 12 + 1 = 25$'],
      'La regla que pasó todas las pruebas es «multiplicar por 3 y sumar 1»: con 12 da 37. El último paso usó la regla que ya se había descartado.',
      'Una regla solo sirve si funciona con todos los ejemplos. ¿Cuál fue la que funcionó?'),
    opc('En un código numérico, $21 \\to 3$, $45 \\to 9$, $63 \\to 9$ y $80 \\to 8$. Siguiendo la misma regla, el 76 se transforma en:',
      ['42', '1', '13', '67'], 2,
      'La regla suma las cifras: $2 + 1 = 3$, $4 + 5 = 9$, $6 + 3 = 9$, $8 + 0 = 8$. Con 76: $7 + 6 = 13$.',
      'Prueba una regla con el primer ejemplo y compruébala con todos los demás antes de usarla.'),
  ]);

  addExam('pu-codigos', [
    ['pu-cd-1', 'Para descifrar se hace el movimiento contrario al de cifrar.',
      opc('En una clave, cada letra se cambia por la anterior en el alfabeto. La palabra que se cifra como RNK es:', ['QMJ', 'TPM', 'SOL', 'SAL'], 2,
        'Para descifrar se avanza una letra: R → S, N → O, K → L.', 'Si cifrar es retroceder una letra, descifrar es avanzarla.')],
    ['pu-cd-2', 'La regla se saca de un ejemplo y se comprueba con los demás.',
      opc('En un código, CASA se escribe ASAC y PERA se escribe AREP. Con la misma regla, LIMA se escribe:', ['MILA', 'ALIM', 'LAMI', 'AMIL'], 3,
        'La palabra se escribe al revés: LIMA queda AMIL.', 'Compara la primera letra de cada palabra con la última de su código.')],
  ]);
});
