// Preuniversitario · pu-lo-1 «Conectivos y tablas de verdad» (Explora). Los ejemplos no son los de los ejercicios.
{
  const VF = ['', 'V', 'F'];
  // Circuito: en serie (y), en paralelo (o) o con un inversor (no). p y q: 0 abierto, 1 cerrado.
  const llave = (K, x, y, on, t) => K.c(x, y, 4, 'fk') + K.c(x + 52, y, 4, 'fk') + K.l(x, y, x + 52 - (on > 0.5 ? 0 : 6), y - (1 - on) * 26, on > 0.5 ? 'la gr' : 'gr') + K.t(x + 26, y + 22, t, 's');
  const foco = (K, x, y, on) => K.c(x, y, 20, on ? 'fG' : 'fc') + K.t(x, y + 6, on ? 'V' : 'F', on ? 'tc' : 'tm');
  const circ = (v, K) => {
    const p = v.p > 0.5, q = v.q > 0.5;
    if (v.m < 0.5) return K.l(20, 90, 70, 90) + llave(K, 70, 90, v.p, 'p') + K.l(122, 90, 160, 90) + llave(K, 160, 90, v.q, 'q') + K.l(212, 90, 262, 90) + foco(K, 284, 90, p && q);
    if (v.m < 1.5) return K.l(20, 90, 80, 90) + K.pl([[130, 50], [80, 50], [80, 130], [130, 130]]) + llave(K, 130, 50, v.p, 'p') + llave(K, 130, 130, v.q, 'q') + K.pl([[182, 50], [232, 50], [232, 130], [182, 130]]) + K.l(232, 90, 262, 90) + foco(K, 284, 90, p || q);
    return K.l(20, 90, 70, 90) + llave(K, 70, 90, v.p, 'p') + K.l(122, 90, 150, 90) + K.p([[150, 66], [150, 114], [200, 90]], 'fg') + K.t(168, 95, '¬', 'b') + K.l(200, 90, 262, 90) + foco(K, 284, 90, !p);
  };
  // Tabla de dos letras: las dos primeras columnas están dadas.
  const D = { 0: 1, 1: 1, 3: 1, 4: 2, 6: 2, 7: 1, 9: 2, 10: 2 };
  const tabla = (cols, o = {}) => ({ f: 4, c: cols.length, cols, estados: 3, rot: VF, unoAUno: true, cw: 62, ch: 38, dados: cols.length === 3 ? D : undefined, ...o });

  xpLec('pu-lo-1', [
    ['Y, o, no: tres circuitos',
      xpMira('dibujo', 'Empecemos por la idea: los conectivos funcionan como **interruptores**.', { dib: circ, v: { m: 0, p: 0, q: 0 }, alto: 160 }, [
        ['«p **y** q»: dos interruptores uno tras otro. Si están abiertos, el bombillo no prende.', {}],
        ['Con uno solo cerrado, tampoco: la corriente se corta en el otro.', { p: 1 }],
        ['Con los dos cerrados, prende. La «y» pide que se cumplan **ambas**.', { q: 1 }, '$p \\wedge q$'],
        ['«p **o** q»: dos caminos. Con uno cerrado ya prende; con los dos, también.', { m: 1, q: 0 }, '$p \\vee q$'],
        ['Solo se apaga si ninguno está cerrado.', { p: 0 }],
        ['«**no** p»: un inversor. Si p es falsa, prende.', { m: 2 }, '$\\neg p$'],
      ], '«y»: verdadera solo con ambas. «o»: falsa solo con ninguna. «no»: lo contrario.'),
      xpHaz('fichas', 'p es verdadera y q es falsa. Pon V o F en cada una.', { slots: [{ x: 66, y: 60, w: 76, et: 'p y q' }, { x: 170, y: 60, w: 76, et: 'p o q' }, { x: 274, y: 60, w: 76, et: 'no q' }], fichas: ['V', 'F'], repite: true, meta: ['F', 'V', 'V'], alto: 108, pista: '«y» pide ambas; a «o» le basta una.' }, 'p y q: falta q, F. p o q: basta p, V. No q: q es F, así que V.')],
    ['La tabla de verdad',
      xpMira('rejilla', 'Segunda idea: la tabla escribe **todos** los casos, uno por fila.', tabla(['p', 'q', 'p ∧ q']), [
        ['Con dos letras hay cuatro casos: las dos V, una y una, y las dos F.', {}, '$2 \\cdot 2 = 4$'],
        ['La columna de «p y q» se llena fila por fila. Primera: V y V, da V.', { on: [2] }],
        ['En las otras tres falta alguna: todas dan F.', { x: [5, 8, 11] }],
        ['Una frase larga se arma por partes, con una columna para cada pedazo.', {}],
        ['Con tres letras serían ocho filas: cada letra duplica los casos.', {}, '$2^3 = 8$'],
      ], 'Una fila por caso: con n letras, $2^n$ filas. Se llena por partes.'),
      xpHaz('rejilla', 'Llena la columna de $\\neg p \\wedge q$: es verdadera solo si p es falsa **y** q es verdadera.', tabla(['p', 'q', '¬p ∧ q'], { meta: { 2: 2, 5: 2, 8: 1, 11: 2 }, dice: () => 'Un toque pone V, otro pone F. Mira cada fila por aparte.', lleno: c => [2, 5, 8, 11].every(i => c[i]), pista: 'Busca la fila donde p es F y q es V: solo esa da V.' }), 'Solo la fila de p falsa y q verdadera da V.')],
    ['El condicional: una promesa',
      xpMira('rejilla', 'Tercera idea: «si p, entonces q» es una **promesa**.', tabla(['p', 'q', 'p → q']), [
        ['«Si te quedas, te preparo café». p: te quedas. q: hay café.', {}],
        ['Te quedas y hay café: cumplió. V.', { on: [2] }],
        ['Te quedas y no hay café: rompió la promesa. F.', { x: [5] }],
        ['No te quedas: la promesa no te cubría. Con café o sin café, nadie mintió. V y V.', { on: [8, 11] }],
        ['Solo es falsa en un caso: p verdadera y q falsa.', { luz: [3, 4, 5] }],
      ], '$p \\to q$ solo es falsa cuando p es verdadera y q es falsa.'),
      xpHaz('rejilla', 'Ahora al revés: llena la columna de $q \\to p$. La promesa la hace q.', tabla(['p', 'q', 'q → p'], { meta: { 2: 1, 5: 1, 8: 2, 11: 1 }, dice: () => 'Se rompe cuando q es V y p es F.', lleno: c => [2, 5, 8, 11].every(i => c[i]), pista: 'Busca la fila donde q es V y p es F: solo esa da F.' }), 'Se rompe en la tercera fila: q verdadera y p falsa.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'p es V, q es F y r es V. Halla el valor de cada pedazo y el de la frase completa.', { slots: [{ x: 66, y: 60, w: 76, et: 'p ∧ r' }, { x: 170, y: 60, w: 76, et: 'q ∨ ¬r' }, { x: 274, y: 60, w: 84, et: '(p∧r) → (q∨¬r)' }], fichas: ['V', 'F'], repite: true, meta: ['V', 'F', 'F'], alto: 108, pista: 'Primero los pedazos. Una V que promete una F rompe la promesa.' }, 'p ∧ r es V; q ∨ ¬r es F o F, o sea F. De V a F, el condicional es falso.')],
  ], '«Y» pide ambas, «o» se conforma con una, y el condicional solo falla si promete y no cumple.');
}
