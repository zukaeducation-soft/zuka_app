// Preuniversitario · pu-or-3 «Tablas de doble entrada» (Explora, escena «rejilla»). Los ejemplos no son los de los ejercicios.
{
  const rot = ['', '✓', '✗'], T = (filas, cols, o = {}) => ({ f: filas.length, c: cols.length, filas, cols, estados: 3, rot, unoAUno: true, cw: 60, ch: 44, izq: 62, ...o });
  const dice = n => c => { const k = c.filter(x => x === 1).length; return k ? `${k} de ${n} ✓. Un ✓ por fila y uno por columna.` : 'Un toque pone ✓, otro pone ✗ y otro borra.'; };
  const raya = (n) => (K, g) => K.l(g.x(n), g.y(0) - 18, g.x(n), g.y(3), 'lg');

  xpLec('pu-or-3', [
    ['Tachar y marcar',
      xpMira('rejilla', 'Empecemos por la idea: para emparejar, una **tabla** donde cada pista deja una marca.', T(['Luz', 'Paco', 'Rita'], ['bus', 'bici', 'metro']), [
        ['Luz, Paco y Rita usan transportes distintos. Personas en las filas, transportes en las columnas.', {}],
        ['«Luz no va en bus ni en metro»: dos tachones en su fila.', { x: [0, 2] }],
        ['En la fila de Luz queda un solo hueco: va en bici. Ahí va el ✓.', { on: [1] }],
        ['Si la bici es de Luz, no es de nadie más: se tacha el resto de su columna.', { x: [4, 7] }],
        ['«Paco no va en metro»: a Paco solo le queda el bus.', { x: [5], on: [3] }],
        ['Y a Rita, el metro. Cada fila y cada columna tiene un solo ✓.', { x: [6], on: [8] }],
      ], 'Cada «no» es una ✗. Cuando en una fila o columna queda un solo hueco, ese es el ✓.'),
      xpHaz('rejilla', 'Cada uno toca un instrumento distinto. Nora no toca violín ni arpa. Iván no toca arpa. Marca los ✓.', T(['Nora', 'Iván', 'Sara'], ['violín', 'tambor', 'arpa'], { meta: [1, 3, 8], dice: dice(3), lleno: c => c.filter(x => x === 1).length === 3, pista: 'Empieza por Nora: le queda un solo instrumento.' }), 'A Nora le queda el tambor; a Iván, el violín, porque no toca arpa; y el arpa es de Sara.')],
    ['Un ✓ que tacha a los demás',
      xpMira('rejilla', 'Segunda idea: un ✓ **tacha** toda su fila y toda su columna, y eso destapa otro.', T(['Ana', 'Beto', 'Cris', 'Dora'], ['mango', 'uva', 'kiwi', 'pera'], { cw: 62, ch: 40 }), [
        ['Cuatro amigos y cuatro frutas. La pista más fuerte es afirmativa: «Dora eligió kiwi».', { on: [14] }],
        ['Ese ✓ tacha el resto de la fila de Dora y de la columna del kiwi.', { x: [12, 13, 15, 2, 6, 10] }],
        ['«Ana no eligió mango ni pera.» Con el kiwi ya tachado, solo le queda la uva.', { x: [0, 3], on: [1] }],
        ['La uva ya tiene dueña: se tacha para Beto y Cris.', { x: [5, 9] }],
        ['«Beto no eligió mango»: entonces pera. Y el mango queda para Cris.', { x: [4], on: [7, 8] }],
      ], 'Empieza por las pistas que afirman: su ✓ tacha fila y columna y hace aparecer los demás.'),
      xpHaz('rejilla', 'Cuatro estudiantes, cuatro colores. Teo tiene el verde. Uma no tiene ni el rojo ni el gris. Vera no tiene el gris. Marca los ✓.', T(['Teo', 'Uma', 'Vera', 'Will'], ['rojo', 'azul', 'verde', 'gris'], { cw: 62, ch: 40, meta: [2, 5, 8, 15], dice: dice(4), lleno: c => c.filter(x => x === 1).length === 4, pista: 'Con el verde de Teo tachado, ¿qué le queda a Uma?' }), 'Teo verde; a Uma solo le queda azul; a Vera, rojo; y Will se queda con el gris.')],
    ['Dos tablas que se hablan',
      xpMira('rejilla', 'Tercera idea: con **dos datos** por persona, una tabla al lado de la otra.', T(['Lina', 'Mario', 'Nadia'], ['Cali', 'Tunja', 'Pasto', 'chef', 'piloto', 'juez'], { cw: 45, izq: 58, sobre: raya(3) }), [
        ['Cada persona vive en una ciudad y tiene un oficio. Las dos tablas comparten las filas.', {}],
        ['«Lina vive en Cali» y «Mario es juez»: dos ✓, con sus tachones.', { on: [0, 11], x: [1, 2, 6, 12, 9, 10, 5, 17] }],
        ['«El piloto vive en Tunja.» Mario es juez, no piloto: entonces no vive en Tunja.', { x: [7] }],
        ['A Mario le queda Pasto, y Tunja queda para Nadia.', { on: [8, 13], x: [14] }],
        ['Si Nadia vive en Tunja, es la piloto. Y Lina es la chef.', { on: [16, 3], x: [15, 4] }],
      ], 'Una pista que une dos datos («el piloto vive en Tunja») pasa las marcas de una tabla a la otra.'),
      xpHaz('rejilla', 'Cada uno cocina un día y un plato. Gil cocina el martes. Quien cocina el lunes hace pasta. Ema hace sopa.', T(['Ema', 'Gil', 'Hugo'], ['lun', 'mar', 'mié', 'sopa', 'arroz', 'pasta'], { cw: 45, izq: 58, sobre: raya(3), meta: [2, 3, 7, 10, 12, 17], dice: c => `${c.filter(x => x === 1).length} de 6 ✓. Tres en cada tabla.`, lleno: c => c.filter(x => x === 1).length === 6, pista: 'Ema hace sopa: entonces no cocina el lunes.' }), 'Ema no es la del lunes ni la del martes: miércoles. Hugo, lunes y pasta; Gil, martes y arroz.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Cumplen años en meses distintos. Olga, en julio. Ana no cumple en mayo ni en agosto. Luis no cumple en mayo. ¿Quién cumple cuándo?', T(['Ana', 'Luis', 'Olga', 'Raúl'], ['mayo', 'junio', 'julio', 'agosto'], { cw: 62, ch: 40, meta: [1, 7, 10, 12], dice: dice(4), lleno: c => c.filter(x => x === 1).length === 4, pista: 'Con julio de Olga, a Ana le queda un solo mes.' }), 'Olga julio, Ana junio; a Luis le queda agosto y a Raúl, mayo.')],
  ], 'Personas en filas, datos en columnas, ✗ por cada «no» y un solo ✓ por fila y por columna.');
}
