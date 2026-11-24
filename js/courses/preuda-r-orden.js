// Preuniversitario · mundo 3 «Acertijos de orden y asignación»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
// Pistas de orden: orden-kit.js. Cada acertijo tiene una sola solución (lo comprueba tests/preuda-razonamiento.test.js).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const K = (t, a, b, say, x = {}) => ({ t, a, b, say, ...x });
  const at = (a, i, say) => ({ t: 'at', a, i, say }), notAt = (a, i, say) => ({ t: 'notAt', a, i, say });

  setExam('pu-orden', 'Acertijos de orden y asignación', [
    ['pu-or-1', 'En una fila se ubican primero las pistas firmes y luego las parejas.',
      play('fila-pistas', 'Acomoda la fila', { rounds: [{ names: ['Elio', 'Fina', 'Gabo', 'Hilda'], clues: [at('Gabo', 1, 'Gabo es el segundo'), K('justBefore', 'Hilda', 'Elio', 'Elio va justo después de Hilda'), notAt('Fina', 3, 'Fina no es la última')] }] }, 'Gabo 2.º; Hilda y Elio solo caben en 3.º y 4.º; Fina 1.ª.', { hint: 'Primero el puesto fijo.' })],
    ['pu-or-1', 'Tacha cada caso con la pista que lo contradice.',
      play('descarta-casos', 'Descarta', { rounds: [{ cands: [['A', 'B', 'C'], ['B', 'A', 'C'], ['C', 'A', 'B']], clues: [K('before', 'A', 'C', 'A va antes que C'), notAt('A', 0, 'A no es el primero')] }] }, 'Solo B, A, C cumple.', { hint: 'Una pista basta para tachar.' })],
    ['pu-or-2', 'En una mesa redonda se fija a uno y se ubica a los demás.',
      play('mesa-redonda', 'La mesa', { rounds: [{ names: ['Iris', 'Juan', 'Kira', 'Lalo'], clues: [K('right', 'Iris', 'Kira', 'Kira está justo a la derecha de Iris'), K('opp', 'Kira', 'Lalo', 'Lalo está frente a Kira')] }] }, 'Kira a la derecha de Iris, Lalo frente a Kira y Juan frente a Iris.', { hint: 'Con Iris fija.' })],
    ['pu-or-2', 'En la ronda se cuenta en un sentido y se saca a cada k-ésimo.',
      play('ronda-saltos', 'La ronda', { rounds: [{ n: 9, k: 2 }] }, 'Con 9 y de 2 en 2 queda el 3.', { hint: 'Tacha despacio.' })],
    ['pu-or-3', 'Un solo ✓ por fila y por columna.',
      play('tabla-cruces', 'La tabla', { rounds: [{ rows: ['Ana', 'Bea', 'Cami'], cols: ['bus', 'metro', 'bici'], clues: [{ t: 'not', a: 1, v: 0 }, { t: 'not', a: 1, v: 1 }, { t: 'not', a: 2, v: 0 }] }] }, 'Bea en bici, Cami en metro, Ana en bus.', { hint: 'La fila con un solo hueco.' })],
    ['pu-or-3', 'Las pistas que unen dos listas tachan en las dos.',
      play('casilleros', 'Casilleros', { rounds: [{ people: ['Leo', 'Mía', 'Nel'], names: ['flauta', 'violín', 'tambor'], clues: [at('tambor', 0, 'el tambor es de Leo'), notAt('flauta', 1, 'la flauta no es de Mía')] }] }, 'Leo tambor, Nel flauta, Mía violín.', { hint: 'Lo seguro primero.' })],
    ['pu-or-4', 'Necesario: en todos los casos; posible: en alguno.',
      play('tiene-podria', 'Tiene que o podría', { rounds: [{ names: ['P', 'Q', 'R'], k: 2, rules: [K('either', 'P', 'Q', 'va P o va Q')], claims: [{ t: 'in', a: 'R', say: 'R va' }, { t: 'both', a: 'P', b: 'Q', say: 'P y Q van' }] }] }, 'Casos PQ, PR, QR: R podría, P y Q juntos podrían.', { hint: 'Lista los tres casos.' })],
    ['pu-or-4', '«A solo si B»: si A está, B tiene que estar.',
      play('comite-reglas', 'Comité', { rounds: [{ names: ['U', 'V', 'W', 'X'], k: 2, need: ['U'], rules: [K('onlyIf', 'U', 'W', 'U va solo si W va')] }] }, 'Con U tiene que ir W.', { hint: 'Mira qué exige U.' })],
  ]);
});

// Mundo 3 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ setLesson, addExam, sol, err, opc }) => {
  // Ocho juegos con las escenas de la explicación (js/games/orden-escena.js, spec 2026-11-24-ejercicios-explora) y la zona de examen.
  setLesson('pu-or-1', [
    play('fila-cine', 'Cinco amigos hacen fila para entrar a cine. Pon a cada uno en su puesto.', { fichas: ['Abel', 'Cleo', 'Dina', 'Igor', 'Nuria'], pistas: [
      { t: 'Dina es la cuarta.', r: ['en', 'Dina', 3] }, { t: 'Igor está justo detrás de Abel.', r: ['sig', 'Abel', 'Igor'] }, { t: 'Cleo está antes que Abel.', r: ['antes', 'Cleo', 'Abel'] }] },
      'Con Dina en el 4, el bloque Abel-Igor solo cabe en 1-2 o en 2-3. Como Cleo va antes que Abel, es 2-3: Cleo, Abel, Igor, Dina y Nuria.',
      { hint: 'Empieza por la pista que dice un puesto exacto y busca dónde cabe entera la pareja que va pegada.' }),
    play('pisos-edificio', 'Cinco familias viven en un edificio, una por piso. Ubícalas.', { fichas: ['Cano', 'Díaz', 'Ossa', 'Pinto', 'Ruiz'], pistas: [
      { t: 'Los Ossa viven en el piso 2.', r: ['en', 'Ossa', 1] }, { t: 'Los Pinto viven justo encima de los Díaz.', r: ['sig', 'Díaz', 'Pinto'] }, { t: 'Los Ruiz viven más abajo que los Ossa.', r: ['antes', 'Ruiz', 'Ossa'] }, { t: 'Los Cano no viven en el piso 5.', r: ['noen', 'Cano', 4] }] },
      'Ossa en el 2 y Ruiz debajo, en el 1. El bloque Díaz-Pinto cabe en 3-4 o en 4-5; como Cano no está en el 5, es 4-5 y Cano queda en el 3.',
      { hint: 'El piso 1 está abajo: «encima» es un número mayor. Fija primero el piso 2.' }),
    play('puestos-posibles', 'Seis personas hacen fila: Kim, Nilo, Rosa y tres más. ¿En qué puestos **podría** estar Kim? Tócalos todos.', { names: ['Kim', 'Nilo', 'Rosa', 'X', 'Y', 'Z'], quien: 'Kim', pistas: [
      { t: 'Rosa es la tercera.', r: ['en', 'Rosa', 2] }, { t: 'Kim está justo detrás de Nilo.', r: ['sig', 'Nilo', 'Kim'] }, { t: 'Kim no es la última.', r: ['noen', 'Kim', 5] }] },
      'El bloque Nilo-Kim cabe en 1-2, en 4-5 y en 5-6; el último se borra porque Kim no es la última. Kim puede estar en el 2 o en el 5.',
      { hint: 'La pareja viaja junta. Prueba cada lugar donde quepa sin pisar a Rosa.' }),
    play('tacha-filas', 'Uri, Vito, Wanda y Zoe se forman para una foto. Tacha **todas** las filas imposibles.', { filas: [['Uri', 'Zoe', 'Vito', 'Wanda'], ['Wanda', 'Vito', 'Zoe', 'Uri'], ['Vito', 'Zoe', 'Uri', 'Wanda'], ['Uri', 'Vito', 'Wanda', 'Zoe'], ['Uri', 'Zoe', 'Wanda', 'Vito'], ['Uri', 'Wanda', 'Zoe', 'Vito']], pistas: [
      { t: 'Zoe no está en una punta.', r: ['noext', 'Zoe'] }, { t: 'Uri está antes que Wanda.', r: ['antes', 'Uri', 'Wanda'] }, { t: 'Vito y Zoe están uno al lado del otro.', r: ['junto', 'Vito', 'Zoe'] }] },
      'La segunda tiene a Wanda antes que Uri, la cuarta deja a Zoe en una punta y la quinta separa a Vito de Zoe. Las otras tres cumplen todo.',
      { hint: 'Toma una pista y recorre las seis filas; luego la siguiente. Basta romper una para tacharla.' }),
    play('un-cambio', 'Estos árboles quedaron mal plantados. Cámbialos de puesto hasta cumplir todas las pistas, leídas de izquierda a derecha.', { fichas: ['pino', 'olmo', 'roble', 'cedro', 'sauce'], ini: ['pino', 'olmo', 'roble', 'cedro', 'sauce'], izq: 'izquierda', der: 'derecha', pistas: [
      { t: 'El roble está en el centro.', r: ['en', 'roble', 2] }, { t: 'El olmo está justo antes del roble.', r: ['sig', 'olmo', 'roble'] }, { t: 'El cedro está antes que el olmo.', r: ['antes', 'cedro', 'olmo'] }, { t: 'El sauce está justo después del pino.', r: ['sig', 'pino', 'sauce'] }] },
      'El roble y el olmo ya estaban bien. El cedro debe ir antes que el olmo, en el 1, y el pino pasa al 4, pegado al sauce: basta intercambiar el pino y el cedro.',
      { hint: 'Mira primero qué pistas ya se cumplen y no las dañes. Busca quién está en el lugar de otro.' }),
    play('pistas-justas', 'Rita, Saúl y Tere hacen fila. Escoge **dos** pistas que dejen **una sola** fila posible.', { names: ['Rita', 'Saúl', 'Tere'], k: 2, cartas: [
      { t: 'Rita está antes que Saúl', r: ['antes', 'Rita', 'Saúl'] }, { t: 'Tere no es la última', r: ['noen', 'Tere', 2] }, { t: 'Saúl está justo detrás de Rita', r: ['sig', 'Rita', 'Saúl'] }, { t: 'Saúl no es el primero', r: ['noen', 'Saúl', 0] }, { t: 'Rita no está en el centro', r: ['noen', 'Rita', 1] }] },
      'Dos pistas bastan si juntas tachan cinco de las seis filas. Por ejemplo, «Saúl está justo detrás de Rita» deja dos filas, y «Tere no es la última» tacha una: queda Tere, Rita, Saúl.',
      { hint: 'Empieza por la pista que más filas tacha y busca otra que borre lo que quedó.' }),
    play('llegada-carrera', 'Una lista tiene cinco canciones. Ordénalas como suenan.', { fichas: ['Faro', 'Gris', 'Isla', 'Luna', 'Mar'], pistas: [
      { t: '«Gris» suena de tercera.', r: ['en', 'Gris', 2] }, { t: '«Luna» suena dos puestos antes que «Isla».', r: ['dist', 'Luna', 'Isla', 2] }, { t: '«Faro» suena justo después de «Isla».', r: ['sig', 'Isla', 'Faro'] }] },
      'Con Gris en el 3, Luna e Isla, a dos puestos, solo pueden ser 2 y 4 (en 1 y 3, o en 3 y 5, pisarían a Gris). Faro sigue a Isla, en el 5, y Mar queda primera.',
      { hint: 'Fija la tercera y prueba dónde caben Luna e Isla con un puesto entre las dos.' }),
    play('corre-puesto', 'Manda la ficha al puesto que se pide. Puedes fallar **una** vez.', { n: 8, tiros: [
      { q: 'Alba es la 3.ª y Cata está justo detrás. Dani está **dos puestos** detrás de Cata. ¿Puesto de Dani?', fijo: { 3: 'A' }, r: 6, c: 'Cata es la 4.ª y Dani, la 6.ª', e: { 5: 'Contaste desde Alba: los dos puestos salen de Cata.' } },
      { q: 'Beto es el último de 8. Ema está justo delante, y Leo, justo delante de Ema. ¿Puesto de Leo?', fijo: { 8: 'B' }, r: 6, c: 'Ema es la 7.ª y Leo, el 6.º', e: { 7: 'Ese es el puesto de Ema.' } },
      { q: 'Iris es la 2.ª y Teo, el 5.º. Sara está entre los dos, pero no al lado de Iris. ¿Puesto de Sara?', fijo: { 2: 'I', 5: 'T' }, r: 4, c: 'Entre 2 y 5 están el 3 y el 4; el 3 toca a Iris', e: { 3: 'Ese puesto está al lado de Iris.' } }] },
      'Dani: 3, 4 y dos más, 6. Leo: 8, 7, 6. Sara: entre el 2 y el 5 están el 3 y el 4, y el 3 toca a Iris.',
      { hint: 'Dibuja la fila y cuenta siempre desde la persona que nombra la pista.' }),
    sol('En una carrera de cinco atletas no hubo empates. Paula llegó de segunda. Lucía llegó justo después de Marta. Nora llegó dos puestos antes que Olga. ¿Quién ganó la carrera?',
      ['Paula ocupa el puesto [[2]]: quedan libres 1, 3, 4 y 5', 'Marta y Lucía van seguidas: solo caben en 3 y 4, o en 4 y 5', 'Nora y Olga quedan a dos puestos: tienen que ser 1 y [[3]]; entonces Marta y Lucía son [[4]] y [[5]]', 'La ganadora es [[Nora]]'],
      ['Olga', 'Marta', '1'],
      'Se empieza por el dato fijo (Paula, 2.ª). Si Marta y Lucía fueran 3.ª y 4.ª, a Nora y Olga les quedarían 1 y 5, que no están a dos puestos. El orden es Nora, Paula, Olga, Marta, Lucía.',
      'Dibuja cinco casillas, pon primero a quien tiene puesto seguro y prueba dónde cabe la pareja que va seguida.'),
    err('Cinco familias viven en un edificio de cinco pisos, una en cada piso. Los Vélez viven en el piso 1 y los García en el 5. Los López viven justo debajo de los Ríos. Los Mora viven más arriba que los Ríos. ¿En qué piso viven los López?',
      ['Vélez en el piso 1 y García en el 5: quedan los pisos 2, 3 y 4', 'López vive justo debajo de Ríos: ocupan dos pisos seguidos, López abajo', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 2', 'Entonces Ríos y López ocupan los pisos 4 y 3'], 2,
      ['Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 4', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 3', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 5'],
      '«Más arriba» es un piso de número mayor. Con López, Ríos y Mora en 2, 3 y 4, los Mora quedan en el 4, los Ríos en el 3 y los López en el 2.',
      'Vuelve a leer cada pista contra el paso que la usa: ¿el piso que le dieron a esa familia cumple lo que dice?'),
    opc('Sara, Tomás, Úrsula y Víctor hacen fila. Sara está antes que Tomás, Úrsula está antes que Sara y Víctor no es el último. De las siguientes afirmaciones, de la única que se tiene certeza es:',
      ['Úrsula es la primera', 'Víctor está antes que Sara', 'Tomás es el último', 'Sara es la segunda'], 2,
      'Úrsula, Sara y Tomás van en ese orden y Víctor puede ir en tres lugares, menos al final. En todos los casos el último es Tomás; las otras afirmaciones fallan en algún caso.',
      'Escribe todas las filas posibles. «Certeza» es lo que se cumple en todas, no en una sola.'),
  ]);

  // Ocho juegos con las escenas de la explicación (js/games/orden-escena.js, spec 2026-11-24-ejercicios-explora) y la zona de examen.
  setLesson('pu-or-2', [
    play('mesa-amigos', 'Olga ya está sentada. Sienta a los demás; «sigue» es en el sentido del reloj.', { fijas: { 0: 'Olga' }, fichas: ['Ciro', 'Elsa', 'Fito', 'Gina', 'Hilda'], pistas: [
      { t: 'Ciro sigue a Olga.', r: ['sigc', 'Olga', 'Ciro'] }, { t: 'Elsa está frente a Ciro.', r: ['frente', 'Elsa', 'Ciro'] }, { t: 'Fito está entre Elsa y Gina.', r: ['entre', 'Fito', 'Elsa', 'Gina'] }] },
      'Ciro va después de Olga y Elsa, a tres sillas de Ciro. Fito no puede ir al otro lado de Elsa, porque entonces Gina caería en la silla de Olga: va entre Elsa y Gina, y Hilda en la que queda.',
      { hint: 'Frente a alguien, en seis sillas, es avanzar tres. Para Fito prueba los dos lados de Elsa.' }),
    play('misma-mesa', 'Cinco personas se leen en el sentido del reloj. Toca **todas** las mesas que son la del modelo, girada.', { modelo: ['A', 'B', 'C', 'D', 'E'], mesas: [['C', 'D', 'E', 'A', 'B'], ['E', 'D', 'C', 'B', 'A'], ['A', 'C', 'B', 'D', 'E'], ['B', 'C', 'D', 'E', 'A']] },
      'Al girar, cada uno conserva a quién sigue. La segunda va al revés y la tercera cambia de lugar a B y C: no son la misma.',
      { hint: 'Busca a la A en cada mesa y lee desde ahí en el sentido del reloj.' }),
    play('frente-silla', 'En una mesa de 12 sillas, numeradas en el sentido del reloj, ¿qué silla queda frente a cada una?', { n: 12, de: [4, 8, 11], fichas: ['10', '2', '5', '8', '14', '1'] },
      'Media mesa son 6 sillas: $4 + 6 = 10$; $8 + 6 = 14$, que se pasa y es la 2; $11 + 6 = 17$, la 5.',
      { hint: 'Avanza la mitad de las sillas. Si te pasas de la última, resta las 12.' }),
    play('vuelta-silla', 'Hay 9 sillas en ronda. Desde la **4** se avanzan **25** pasos en el sentido del reloj. Lleva el señalador a la silla donde termina.', { n: 9, de: 4, pasos: 25 },
      '$4 + 25 = 29$. Se restan vueltas de 9: $29 - 27 = 2$. Termina en la silla 2.',
      { hint: 'Cada 9 pasos se vuelve al mismo lugar. Quita las vueltas completas y avanza solo lo que sobra.' }),
    play('dos-lados', 'Nico está a **3** sillas de Ana, que ocupa la 7. La mesa tiene 8 sillas. Toca **todas** las sillas donde podría estar.', { n: 8, de: 7, d: 3, quien: 'Ana' },
      'Hacia adelante: $7 + 3 = 10$, la 2. Hacia atrás: $7 - 3 = 4$. Son dos lugares posibles, la 2 y la 4.',
      { hint: 'La pista no dice hacia qué lado. Cuenta tres pasos en cada sentido.' }),
    play('collar-cerrado', 'El ámbar ya está en el collar, que se cierra. Ensarta las demás cuentas.', { fijas: { 0: 'ámbar' }, fichas: ['perla', 'jade', 'coral', 'ónix'], pistas: [
      { t: 'El jade sigue al ámbar, en el sentido del reloj.', r: ['sigc', 'ámbar', 'jade'] }, { t: 'El coral es vecino del ámbar.', r: ['juntoc', 'coral', 'ámbar'] }, { t: 'La perla no es vecina del jade.', r: ['nojuntoc', 'perla', 'jade'] }] },
      'El ámbar tiene dos vecinos: el jade y, del otro lado, el coral, porque el collar se cierra. La perla no toca al jade, así que va junto al coral, y el ónix junto al jade.',
      { hint: 'El collar no tiene puntas: el ámbar tiene un vecino a cada lado.' }),
    play('cambia-mesa', 'Ada no se mueve. Cambia de silla a las demás hasta que se cumplan las pistas.', { fijas: { 0: 'Ada' }, fichas: ['Bea', 'Cleo', 'Dora', 'Ema', 'Flor'], ini: ['Ada', 'Bea', 'Cleo', 'Dora', 'Ema', 'Flor'], pistas: [
      { t: 'Dora está frente a Ada.', r: ['frente', 'Dora', 'Ada'] }, { t: 'Bea sigue a Ada en el sentido del reloj.', r: ['sigc', 'Ada', 'Bea'] }, { t: 'Ema está entre Bea y Dora.', r: ['entre', 'Ema', 'Bea', 'Dora'] }, { t: 'Flor sigue a Cleo en el sentido del reloj.', r: ['sigc', 'Cleo', 'Flor'] }] },
      'Dora y Bea ya estaban bien. Entre ellas va Ema, no Cleo: se intercambian, y Flor queda justo después de Cleo.',
      { hint: 'Revisa qué pistas ya se cumplen. ¿Quién ocupa la silla que está entre Bea y Dora?' }),
    play('gira-ruleta', 'Da los pasos justos, en el sentido del reloj y sin vueltas de más. Puedes fallar **una** vez.', { tiros: [
      { q: 'Son 10 sillas. De la 8 a la que está **enfrente**', n: 10, de: 8, r: 5, c: 'La mitad de 10: 5 pasos, hasta la 3' },
      { q: 'Son 11 sillas. De la 9 a la 2', n: 11, de: 9, r: 4, c: '$9 + 4 = 13$, y $13 - 11 = 2$', e: { 7: 'Esos son los pasos hacia atrás.' } },
      { q: 'Son 8 sillas. De la 5 a la 3', n: 8, de: 5, r: 6, c: '$5 + 6 = 11$, y $11 - 8 = 3$', e: { 2: 'Esos son los pasos hacia atrás.' } }] },
      'Enfrente: la mitad, 5 pasos. De 9 a 2 en una ronda de 11: 10, 11, 1, 2, cuatro pasos. De 5 a 3 en una de 8: seis.',
      { hint: 'La ruleta no se devuelve: cuenta desde la silla siguiente y pasa por la última para volver a la 1.' }),
    sol('Seis amigos se sientan en una mesa redonda con sillas numeradas del 1 al 6 en el sentido del reloj. Andrés está en la silla 1. Beatriz está frente a Andrés. Carlos ocupa la silla siguiente a la de Beatriz. Daniela está frente a Carlos. Emilio no está junto a Andrés. ¿En qué silla está Felipe?',
      ['En una mesa de 6, la silla de enfrente está 3 puestos más allá: Beatriz está en la [[4]]', 'Carlos va en la siguiente, la [[5]], y Daniela frente a él, en la [[2]]', 'Quedan las sillas 3 y 6. Junto a Andrés están la 2 y la 6: Emilio va en la [[3]] y Felipe en la [[6]]'],
      ['1', '7', '8'],
      'Frente a la silla $n$ está la $n + 3$ (y se vuelve a empezar después de la 6). Las dos sillas libres se reparten con la última pista: Emilio no puede ir en la 6, que es vecina de la 1.',
      'Dibuja el círculo con las seis sillas y pon primero a quien tiene silla fija. «Frente a» es media vuelta.'),
    err('Ocho personas se sientan en una mesa redonda con sillas numeradas del 1 al 8. ¿Qué silla queda frente a la 3 y cuáles son las vecinas de la 8?',
      ['En una mesa de 8, la silla de enfrente está 4 puestos más allá', 'Frente a la silla 3 está la $3 + 4 = 7$', 'Las vecinas de la silla 8 son la 7 y la 9'], 2,
      ['Las vecinas de la silla 8 son la 7 y la 1', 'Las vecinas de la silla 8 son la 7 y la 4', 'Las vecinas de la silla 8 son la 6 y la 7'],
      'La mesa se cierra: después de la silla 8 viene la 1. No existe la silla 9.',
      'En un círculo no hay primero ni último: ¿qué silla sigue después de la más alta?'),
    opc('Cinco niños forman una ronda en este orden, en el sentido del reloj: Ana, Beto, Caro, Dany y Eli. Empezando por Ana cuentan «uno, dos, tres» y sale el niño al que le toca el tres; se sigue contando desde el siguiente. El último niño que queda en la ronda es:',
      ['Ana', 'Beto', 'Eli', 'Dany'], 3,
      'Sale Caro; contando desde Dany sale Ana; desde Beto sale Eli; desde Beto otra vez (Beto, Dany, Beto) sale Beto. Queda Dany.',
      'Hazlo paso a paso tachando nombres: después de cada salida la cuenta empieza en el siguiente.'),
  ]);

  // Ocho juegos con las escenas de la explicación (js/games/orden-escena.js, spec 2026-11-24-ejercicios-explora) y la zona de examen.
  setLesson('pu-or-3', [
    play('tacha-cruz', 'Cuatro amigos y cuatro planes, uno para cada uno. Ya se sabe que Gala va al cine. Toca **todas** las casillas que ese ✓ tacha.', { filas: ['Fede', 'Gala', 'Hana', 'Isa'], cols: ['mar', 'lago', 'cine', 'feria'], si: [1, 2] },
      'Gala ya no tiene otro plan: se tacha el resto de su fila. Y nadie más va al cine: se tacha el resto de la columna. Son 6 casillas.',
      { hint: 'Piensa en dos cosas: qué ya no puede hacer Gala y quién ya no puede ir al cine.' }),
    play('hueco-unico', 'Cuatro amigos y cuatro colores, uno distinto para cada uno. Con las ✗ que ya están, sin poner ninguna más, toca **todos** los ✓ que ya son seguros.', { filas: ['Ciro', 'Dana', 'Elio', 'Fina'], cols: ['rojo', 'azul', 'gris', 'lila'], x: [0, 1, 3, 7, 8, 11] },
      'En la fila de Ciro queda un solo hueco: gris. En la columna lila queda un solo hueco: Fina. En las demás todavía hay dos o más.',
      { hint: 'Busca filas con un solo hueco y también columnas con un solo hueco.' }),
    play('tabla-oficios', 'Cada uno practica un deporte distinto. Marca los ✓.', { filas: ['Abril', 'Darío', 'Fabia', 'Omar'], cols: ['yudo', 'remo', 'golf', 'polo'], pistas: [
      { t: 'Fabia practica remo.', r: ['es', 2, 1] }, { t: 'Abril no practica yudo.', r: ['no', 0, 0] }, { t: 'Abril tampoco practica polo.', r: ['no', 0, 3] }, { t: 'Omar no practica yudo.', r: ['no', 3, 0] }] },
      'El remo es de Fabia. A Abril, sin yudo ni polo, le queda golf. Omar no practica yudo: polo. Y Darío, yudo.',
      { hint: 'Empieza por la pista que afirma y tacha su fila y su columna. Después mira a Abril.' }),
    play('tabla-ajena', 'Alguien llenó esta tabla sin mirar las pistas. Toca **todos** los ✓ que rompen alguna.', { filas: ['Rita', 'Saúl', 'Tere', 'Uri'], cols: ['cuento', 'novela', 'poema', 'cómic'], si: [2, 0, 3, 1], pistas: [
      { t: 'Rita lee poema.', r: ['es', 0, 2] }, { t: 'Saúl no lee novela.', r: ['no', 1, 1] }, { t: 'Tere no lee cómic.', r: ['no', 2, 3] }, { t: 'Uri lee poema o cómic.', r: ['o', 3, 2, 3] }] },
      'Tere no podía tener el cómic, y Uri debía tener poema o cómic, no novela. Rita y Saúl cumplen.',
      { hint: 'Toma cada pista y busca la fila de esa persona: ¿su ✓ la cumple?' }),
    play('pista-falta', 'Lis, Moy y Nía tienen cada uno una prenda distinta, y la gorra no es de Lis. ¿Qué pista **basta** para saberlo todo?', { gente: ['Lis', 'Moy', 'Nía'], names: ['gorra', 'saco', 'reloj'], k: 1, dadas: [{ t: 'La gorra no es de Lis', r: ['noen', 'gorra', 0] }], cartas: [
      { t: 'La gorra es de Nía', r: ['en', 'gorra', 2] }, { t: 'El saco es de Moy', r: ['en', 'saco', 1] }, { t: 'El reloj no es de Nía', r: ['noen', 'reloj', 2] }, { t: 'El saco no es de Moy', r: ['noen', 'saco', 1] }] },
      'Si el saco es de Moy, la gorra, que no es de Lis, es de Nía, y a Lis le queda el reloj. Con las otras pistas quedan dos o más repartos.',
      { hint: 'Prueba cada pista: ¿cuántos de los repartos que siguen encendidos la cumplen?' }),
    play('tabla-dos-datos', 'Tres amigos, cada uno en un lugar distinto y con una mascota distinta. Marca los ✓ de las dos tablas.', { filas: ['Cira', 'Elio', 'Toni'], cols: ['norte', 'sur', 'río', 'gato', 'pez', 'loro'], pistas: [
      { t: 'Cira no vive en el norte.', r: ['no', 0, 0] }, { t: 'Cira no vive junto al río.', r: ['no', 0, 2] }, { t: 'Elio tiene el loro.', r: ['es', 1, 5] }, { t: 'Quien vive en el norte tiene el pez.', r: ['liga', 0, 4] }] },
      'Cira vive en el sur. Elio tiene el loro, no el pez, así que no vive en el norte: vive junto al río. Toni, en el norte, con el pez; y Cira tiene el gato.',
      { hint: 'La última pista une las dos tablas: si alguien no tiene el pez, tampoco vive en el norte.' }),
    play('casas-datos', 'Tres casas en fila, de izquierda a derecha. Pon arriba la pared de cada una (azul, roja o gris) y abajo lo que toman.', { ocultas: [['grupo', 'azul', 0, 2], ['grupo', 'roja', 0, 2], ['grupo', 'gris', 0, 2]], avisoOculto: 'Las paredes van arriba y las bebidas abajo.', fichas: ['azul', 'roja', 'gris', 'té', 'jugo', 'agua'], pistas: [
      { t: 'La casa azul es la del centro.', r: ['en', 'azul', 1] }, { t: 'En la casa roja toman té.', r: ['mismo', 'roja', 'té'] }, { t: 'Justo a la derecha de la azul toman agua.', r: ['rel', 'azul', 'agua', 1] }] },
      'Con la azul en el centro, el agua está en la 3. En la roja toman té, así que la roja no es la 3: es la 1, y la gris la 3. El jugo queda en el centro.',
      { hint: 'Une los datos que van en la misma casa: si en la 3 toman agua, ¿puede ser la roja?' }),
    play('cae-caja', 'Suelta la bola en la caja que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Cuatro músicos, un instrumento distinto cada uno. Noa no toca tuba ni bajo. Pía toca piano. ¿Qué toca **Noa**?', cajas: ['tuba', 'piano', 'flauta', 'bajo'], r: 3, c: 'Sin tuba, ni bajo, ni el piano de Pía: flauta', e: { 1: 'Noa no toca tuba.', 2: 'El piano ya es de Pía.', 4: 'Noa no toca bajo.' } },
      { q: 'Quien va en bus es médico. Raúl es juez. **Raúl** va en bus o en tren. ¿En cuál?', cajas: ['bus', 'tren', 'no se sabe'], r: 2, c: 'Raúl no es el médico: no va en bus', e: { 1: 'Quien va en bus es médico, y Raúl es juez.', 3: 'Sí se sabe: la pista une los dos datos.' } },
      { q: 'Ari, Bo y Cam se reparten rojo, azul y gris, uno cada uno. Ari no tiene el rojo. Bo no tiene el rojo. ¿Cuál tiene **Cam**?', cajas: ['rojo', 'azul', 'gris', 'no se sabe'], r: 1, c: 'En la columna del rojo solo queda Cam', e: { 4: 'Mira la columna del rojo: solo queda una persona.' } }] },
      'Noa: descartados tuba y bajo, y con el piano de Pía, flauta. Raúl no es médico, así que no va en bus. En la columna del rojo solo queda Cam.',
      { hint: 'Tacha lo que no puede ser. A veces el único hueco está en la columna y no en la fila.' }),
    sol('Laura, Mónica y Paola estudian Biología, Química y Música, una carrera cada una, y viven en Bello, Envigado e Itagüí, cada una en un municipio. Mónica vive en Itagüí. Laura no vive en Bello. La que vive en Envigado estudia Música. Mónica no estudia Química. ¿Qué estudia Paola?',
      ['Mónica vive en Itagüí y Laura no vive en Bello: Laura vive en [[Envigado]]', 'La de Envigado estudia Música: Laura estudia [[Música]]', 'A Paola le queda vivir en [[Bello]]', 'Mónica no estudia Química: estudia [[Biología]], y Paola estudia [[Química]]'],
      ['Itagüí', 'Derecho'],
      'En una tabla de doble entrada cada dato tacha casillas. Los municipios quedan primero, y con ellos se resuelve la carrera de Laura; las otras dos se reparten con la última pista.',
      'Haz dos tablas: una de personas y municipios y otra de personas y carreras. Empieza por el dato que da un ✓ directo.'),
    err('Andrés, Bárbara, César y David pidieron cada uno una bebida distinta: café, té, jugo y agua. Bárbara pidió té. David no pidió café ni jugo. Andrés no toma café ni té. ¿Qué pidió César?',
      ['Bárbara pidió té: nadie más lo pide', 'David no pidió café ni jugo, y el té ya está: David pidió agua', 'Andrés no toma café ni té, y el agua es de David: Andrés pidió jugo', 'A César le queda el agua'], 3,
      ['A César le queda el café', 'A César le queda el jugo', 'A César le queda el té'],
      'Cada bebida es de una sola persona: té de Bárbara, agua de David y jugo de Andrés. La única que queda es el café.',
      'Al final de la tabla debe haber un solo ✓ en cada fila y en cada columna. ¿Qué bebida quedó repetida?'),
    opc('Hugo, Iván y Julia practican cada uno un deporte distinto: natación, tenis y ajedrez. Hugo no practica natación. Julia no practica tenis ni natación. Entonces Iván practica:',
      ['natación', 'tenis', 'ajedrez', 'no se puede determinar'], 0,
      'Julia solo puede practicar ajedrez. A Hugo, que no nada, le queda el tenis. Iván practica natación.',
      'Empieza por la persona que tiene más casillas tachadas.'),
  ]);

  // Ocho juegos con las escenas de la explicación (js/games/orden-escena.js, spec 2026-11-24-ejercicios-explora) y la zona de examen.
  setLesson('pu-or-4', [
    play('casos-si', 'La regla dice: «si **no** va Quino, entonces va Rosa». Toca **todos** los casos que se pueden.', { a: 'Quino', b: 'Rosa', r: ['o', 'Quino', 'Rosa'] },
      'La regla solo pide algo cuando Quino no va: ahí debe ir Rosa. Choca que no vaya ninguno; si Quino va, Rosa puede ir o no.',
      { hint: 'Revisa los casos uno por uno y pregunta: ¿aquí falta Quino? Si no falta, la regla no pide nada.' }),
    play('misma-regla', '«Vera viaja **solo si** lleva pasaporte.» Toca **todas** las frases que dicen lo mismo.', { frases: [{ t: 'Si Vera viaja, lleva pasaporte', ok: true }, { t: 'Si Vera lleva pasaporte, viaja', ok: false }, { t: 'Si Vera no lleva pasaporte, no viaja', ok: true }, { t: 'Si Vera no viaja, no lleva pasaporte', ok: false }] },
      '«Solo si» señala el permiso: si viaja, lo lleva; y sin él no viaja. Llevarlo no la obliga a viajar.',
      { hint: 'El pasaporte es el permiso. Pregúntate si tener un permiso obliga a usarlo.' }),
    play('equipo-justo', 'Arma un equipo de **tres** que cumpla todas las reglas.', { gente: ['Ada', 'Bil', 'Cam', 'Dan', 'Eli', 'Fia'], cuantos: 3, pistas: [
      { t: 'Va Cam.', r: ['va', 'Cam'] }, { t: 'Cam va solo si va Eli.', r: ['si', 'Cam', 'Eli'] }, { t: 'Si va Ada, va Dan.', r: ['si', 'Ada', 'Dan'] }, { t: 'Va Ada o va Bil.', r: ['o', 'Ada', 'Bil'] }] },
      'Cam trae a Eli: queda un cupo. Con Ada harían falta dos, porque ella trae a Dan. El tercero es Bil.',
      { hint: 'Sigue la cadena: quien va obliga a otros. Cuenta los cupos antes de escoger al último.' }),
    play('quien-seguro', 'Se escogen **tres** de cinco. Toca a quien **tiene que** ir, sea cual sea el equipo.', { gente: ['Vito', 'Wil', 'Xime', 'Yan', 'Zoe'], son: 3, pistas: [
      { t: 'Si va Vito, va Wil.', r: ['si', 'Vito', 'Wil'] }, { t: 'Si va Xime, va Wil.', r: ['si', 'Xime', 'Wil'] }, { t: 'Zoe va solo si va Xime.', r: ['si', 'Zoe', 'Xime'] }] },
      'Sin Wil no van Vito ni Xime, y sin Xime no va Zoe: solo quedaría Yan. Por eso Wil está en todos los equipos; los demás faltan en alguno.',
      { hint: 'Prueba a dejar por fuera a cada persona: si sin ella no se completan tres, tiene que ir.' }),
    play('tres-zonas', 'Estos son **todos** los equipos posibles. Lleva cada afirmación a su zona.', { equipos: [['A', 'C', 'D'], ['A', 'B', 'D'], ['A', 'D', 'E']], dichos: [{ t: 'va B', van: ['B'] }, { t: 'van A y D', van: ['A', 'D'] }, { t: 'van B y C', van: ['B', 'C'] }, { t: 'van C y D', van: ['C', 'D'] }, { t: 'va E', van: ['E'] }] },
      'A y D están en los tres: tiene que. B, E y la pareja C-D aparecen en alguno: podría. B con C no aparece en ninguno: no puede.',
      { hint: 'Cuenta en cuántos equipos se cumple cada afirmación: en los tres, en alguno o en ninguno.' }),
    play('rompe-regla', 'Arma un grupo de **tres** que **rompa** la primera regla y cumpla las otras dos.', { gente: ['Iva', 'Jon', 'Kai', 'Lea', 'Moe'], cuantos: 3, pistas: [
      { t: 'Que se rompa: si va Iva, va Jon.', r: ['rompe', ['si', 'Iva', 'Jon']] }, { t: 'Kai va solo si va Lea.', r: ['si', 'Kai', 'Lea'] }, { t: 'Jon y Moe no van juntos.', r: ['nojuntos', 'Jon', 'Moe'] }] },
      'Un «si va Iva, va Jon» solo se rompe con Iva adentro y Jon afuera. Kai necesita a Lea: sirven Iva, Kai y Lea, o Iva, Lea y Moe.',
      { hint: 'Un «si…» prohíbe un solo caso. ¿Cuál es? Ese es el que hay que armar.' }),
    play('maximo-grupo', 'Cumpliendo todas las reglas, arma el grupo **más grande** que se pueda.', { gente: ['Alan', 'Bea', 'Cruz', 'Dora', 'Efra', 'Flor'], pistas: [
      { t: 'Alan y Bea no van juntos.', r: ['nojuntos', 'Alan', 'Bea'] }, { t: 'Cruz va solo si va Dora.', r: ['si', 'Cruz', 'Dora'] }, { t: 'Dora y Efra no van juntos.', r: ['nojuntos', 'Dora', 'Efra'] }, { t: 'Si va Flor, no va Alan.', r: ['nojuntos', 'Flor', 'Alan'] }] },
      'Alan impide a Bea y a Flor: conviene dejarlo. Efra impide a Dora, y sin Dora no va Cruz: también sale. Quedan Bea, Cruz, Dora y Flor.',
      { hint: 'Mira a quién deja por fuera cada uno. Conviene sacar al que impide a más personas.' }),
    play('cae-zona', 'Suelta la bola en lo que se puede afirmar. Puedes fallar **una** vez.', { tiros: [
      { q: 'Si llueve, se cancela. **Se canceló.** ¿Llovió?', cajas: ['tiene que', 'podría', 'no puede'], r: 2, c: 'Pudo cancelarse por otra cosa: podría', e: { 1: 'La regla no dice que solo se cancele por lluvia.', 3: 'Si llovió, también se cancela: es posible.' } },
      { q: 'Nía va solo si va Omar. **Omar no va.** ¿Va Nía?', cajas: ['tiene que', 'podría', 'no puede'], r: 3, c: 'Sin Omar no va Nía: no puede', e: { 1: 'Omar es el permiso de Nía, y no va.', 2: '«Solo si»: sin Omar no hay Nía.' } },
      { q: 'Van dos de tres: P, Q y R. P y Q no van juntos. ¿Va **R**?', cajas: ['tiene que', 'podría', 'no puede'], r: 1, c: 'P-R o Q-R: R tiene que ir', e: { 2: 'Haz la lista de parejas: ¿en cuál falta R?' } }] },
      'Un «si» no se puede leer al revés: podría. Sin el permiso no hay nada: no puede. Y en las dos parejas posibles está R: tiene que.',
      { hint: 'Haz la lista de casos que cumplen: en todos, en alguno o en ninguno.' }),
    sol('Para un torneo se deben escoger exactamente 3 jugadoras entre Ana, Bea, Clara, Dora y Eva. Eva tiene que ir. Si va Ana, no va Bea. Clara va solo si va Dora. ¿Cuántos equipos distintos se pueden armar y quién, además de Eva, está en todos?',
      ['Eva va siempre: faltan [[2]] jugadoras entre las otras cuatro', 'Ana y Bea no pueden ir juntas, y Clara necesita que vaya [[Dora]]', 'Las parejas que sirven son Ana y Dora, Bea y Dora, y Clara y Dora: [[3]] equipos', 'En todos los equipos está [[Dora]]: ella también tiene que ir'],
      ['Clara', '6', '4'],
      'De las 6 parejas posibles, las reglas tachan tres: Ana con Bea, Ana con Clara y Bea con Clara (en estas dos, Clara iría sin Dora). Lo que aparece en todas las soluciones «tiene que» pasar.',
      'Haz la lista de todas las parejas que acompañarían a Eva y tacha las que rompen alguna regla.'),
    err('En un comité hay una regla: «si va Mario, entonces va Nubia». Se sabe que Nubia va. ¿Qué se puede concluir sobre Mario?',
      ['La regla dice que Mario adentro obliga a Nubia adentro', 'La regla no dice nada sobre lo que pasa cuando Mario no va', 'Como Nubia va, Mario tiene que ir'], 2,
      ['Como Nubia va, Mario podría ir o no ir: no se sabe', 'Como Nubia va, Mario no puede ir', 'Como Nubia va, la regla quedó incumplida'],
      'La regla solo corre en un sentido. Nubia puede ir con Mario o sin él, y en los dos casos la regla se cumple: de que Nubia vaya no se deduce nada sobre Mario.',
      'Prueba los dos casos, Mario adentro y Mario afuera, y mira si alguno rompe la regla.'),
    opc('Para una exposición se eligen exactamente tres de cinco cuadros: P, Q, R, S y T. Si se elige P, no se elige Q. R se elige solo si se elige S. T no se elige. De las siguientes afirmaciones, la única que tiene que ser verdadera es:',
      ['Se elige P', 'Se eligen R y S', 'Se elige Q', 'No se elige R'], 1,
      'Sin T quedan P, Q, R y S, y hay que elegir tres. P y Q no van juntos, así que sale uno de ellos: las ternas posibles son P, R, S y Q, R, S. En las dos están R y S.',
      'Escribe todas las ternas que cumplen las reglas y busca lo que se repite en todas.'),
  ]);

  addExam('pu-orden', [
    ['pu-or-1', 'Un puesto contado desde adelante y desde atrás suma una persona de más.',
      opc('En una fila de 7 personas, Rosa es la tercera contando desde adelante. Contando desde atrás, Rosa es la:', ['cuarta', 'quinta', 'tercera', 'sexta'], 1,
        'Detrás de Rosa hay $7 - 3 = 4$ personas, así que desde atrás es la quinta.', 'Dibuja las siete casillas y cuenta desde el otro extremo.')],
    ['pu-or-2', 'En una mesa redonda de n sillas, enfrente queda la silla que está a n/2 puestos.',
      opc('En una mesa redonda hay 10 sillas numeradas en orden. La silla que queda frente a la 7 es la:', ['2', '3', '12', '5'], 0,
        'Enfrente está 5 puestos más allá: $7 + 5 = 12$, y después de la 10 se vuelve a empezar: la 2.', 'Media vuelta en una mesa de 10 son 5 puestos; después de la 10 sigue la 1.')],
    ['pu-or-3', 'En una tabla de doble entrada cada pista negativa tacha casillas hasta dejar un ✓ por fila.',
      opc('Marta, Nelly y Olga tienen un perro, un gato y un loro, una mascota cada una. Marta no tiene el perro. Olga no tiene el perro ni el gato. La mascota de Marta es:', ['el perro', 'el loro', 'no se puede saber', 'el gato'], 3,
        'Olga tiene el loro. A Marta, que no tiene el perro, le queda el gato, y a Nelly el perro.', 'Empieza por la persona con más casillas tachadas.')],
    ['pu-or-4', '«A solo si B»: sin B no puede estar A.',
      opc('Una regla dice: «Luis va al paseo solo si va Karen». Se sabe que Karen no va. Entonces:', ['Luis va al paseo', 'Luis podría ir o no ir', 'Luis no va al paseo', 'La regla no se cumple'], 2,
        'Karen es condición necesaria para Luis: sin Karen, Luis no puede ir.', '«Solo si» señala lo que hace falta para que lo otro pase.')],
  ]);
});
