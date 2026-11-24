// Preuniversitario · pu-or-4 «Condiciones: tiene que, podría, no puede» (Explora, escenas «rejilla» y «fichas»).
// Los ejemplos no son los de los ejercicios.
{
  // Cuatro casos de dos personas; cada fila es un caso.
  const casos = (a, b, o = {}) => ({ f: 4, c: 1, filas: [`${a} y ${b}`, `solo ${a}`, `solo ${b}`, 'ninguno'], izq: 120, cw: 120, ch: 38, estados: 2, rot: ['', 'se puede', 'choca'], ...o });
  // Equipos posibles: filas = equipos, columnas = personas.
  const eq = ['PQ', 'PR', 'PS', 'QR', 'QS', 'RS'], G = 'PQRS';
  const equipos = { f: 6, c: 4, cols: [...G], filas: eq.map(e => [...e].join(' y ')), izq: 78, cw: 50, ch: 30, estados: 3, celda: (i, r, c) => (eq[r].includes(G[c]) ? '●' : '') };
  const fila = r => [0, 1, 2, 3].map(c => r * 4 + c);
  const zonas = (y = 128) => ['tiene que', 'podría', 'no puede'].map((et, i) => ({ x: 60 + i * 110, y, w: 108, h: 92, n: 3, et, ey: -54 }));

  xpLec('pu-or-4', [
    ['Leer bien un «si…»',
      xpMira('rejilla', 'Empecemos por la idea: «si va A, va B» solo **obliga** cuando A va.', casos('A', 'B', { estados: 3, rot: ['', 'se puede', 'choca'] }), [
        ['La regla: «si va A, entonces va B». Hay cuatro casos. Los revisamos uno por uno.', {}],
        ['Van los dos: A está y B también. Cumple.', { on: [0] }],
        ['Va solo A: la regla pedía a B y no está. Choca.', { x: [1] }],
        ['Va solo B: A no está, así que la regla no pide nada. Se puede.', { on: [2] }],
        ['No va ninguno: tampoco pide nada. Se puede.', { on: [3] }],
        ['Por eso, saber que va B no dice nada de A: puede ir o no.', { luz: [0, 2] }],
      ], '«Si A, entonces B» solo prohíbe un caso: que esté A sin B.'),
      xpHaz('rejilla', 'La regla es «si va M, entonces NO va N». Toca todos los casos que se pueden.', casos('M', 'N', { meta: [1, 2, 3], dice: c => `Marcaste ${c.filter(x => x).length} de los cuatro casos.` }), 'Solo choca que vayan los dos: con M presente, N no puede estar.')],
    ['«Solo si» y la vuelta',
      xpMira('rejilla', 'Segunda idea: «C va **solo si** va D» quiere decir que C necesita a D.', casos('C', 'D', { estados: 3, rot: ['', 'se puede', 'choca'] }), [
        ['«C va solo si va D»: D es el permiso de C. Es igual a decir «si va C, va D».', {}],
        ['Los dos juntos: C tiene su permiso. Se puede.', { on: [0] }],
        ['Solo C, sin permiso: choca.', { x: [1] }],
        ['Solo D: tener permiso no obliga a ir. Se puede.', { on: [2] }],
        ['Y ninguno: se puede.', { on: [3] }],
        ['Mira al revés: si D no va, C tampoco. Esa vuelta siempre vale.', { luz: [3] }, '$\\text{sin D} \\Rightarrow \\text{sin C}$'],
      ], '«C solo si D» es «si C, entonces D». Y dado vuelta: sin D no hay C.'),
      xpHaz('rejilla', 'La regla es «E va solo si va F», y además F **no** va. Toca lo único que se puede.', casos('E', 'F', { meta: [3], dice: c => `Marcaste ${c.filter(x => x).length}. Recuerda: F no va.` }), 'Sin F no hay E: no va ninguno.')],
    ['Tiene que, podría, no puede',
      xpMira('rejilla', 'Tercera idea: se hace la **lista** de casos y se mira qué pasa en ella.', equipos, [
        ['Se eligen dos de P, Q, R y S. Hay seis parejas. Estas son todas.', {}],
        ['Regla 1: «si va P, va R». Chocan P con Q y P con S.', { x: [...fila(0), ...fila(2)] }],
        ['Regla 2: «Q y S no van juntos». Choca esa pareja.', { x: fila(4) }],
        ['Quedan tres casos. R está en los tres: R **tiene que** ir.', { luz: [6, 14, 22], on: [6, 14, 22] }],
        ['P está en uno de los tres: **podría** ir, pero no es seguro.', { luz: [4] }],
        ['Y P con Q no aparece en ninguno: **no puede** pasar.', { luz: fila(0) }],
      ], 'Tiene que: en todos los casos. Podría: en alguno. No puede: en ninguno.'),
      xpHaz('fichas', 'Los únicos equipos posibles son L-M-N, M-N-O y M-O-P. Lleva cada afirmación a su zona.', { slots: zonas(), fichas: ['va M', 'va N', 'van L y P', 'va O'], meta: ['va M', ['va N', 'va O'], 'van L y P'], alto: 182,
        fondo: K => K.t(170, 24, 'L-M-N', 'ta') + K.t(70, 24, 'equipos:', 's tm') + K.t(240, 24, 'M-N-O', 'ta') + K.t(170, 46, 'M-O-P', 'ta'), pista: 'Cuenta en cuántos de los tres equipos se cumple cada una.' }, 'M está en los tres; N y O, en dos; y L con P, en ninguno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se llevan exactamente 3 de 4: mapa, radio, carpa y farol. Si va la radio, va el mapa. Carpa y farol no van juntos. Clasifica (carpa-farol: los dos).', { slots: zonas(100), fichas: ['mapa', 'radio', 'carpa', 'carpa-farol'], meta: [['mapa', 'radio'], 'carpa', 'carpa-farol'], alto: 156,
        pista: 'Lista los equipajes: se deja por fuera la carpa o el farol.' }, 'Solo hay dos equipajes: mapa, radio y carpa, o mapa, radio y farol.')],
  ], 'Un «si» prohíbe un solo caso, «solo si» pide permiso, y la lista de casos dice qué es seguro.');
}
