// Geometría Vectorial · explicación de geo-5 «Gauss-Jordan para la inversa» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const conK = q => (q < 0 ? `− ${r1(-q)}` : `+ ${r1(q)}`);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  // Matriz con corchetes centrada en (cx, cy); bar: columna tras la que va la raya; cls: clase o función (i, j) → clase.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20, bar = null) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    if (bar != null) s += K.l(x0 + dx * (bar + 1), y0, x0 + dx * (bar + 1), y0 + h, 'lm');
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, typeof cls === 'function' ? cls(i, j) : cls); }));
    return s;
  }

  // Capítulo 1: [A | I] → [I | A⁻¹] con A = [[1, 2], [3, 5]].  v { k }
  const PASOS1 = [
    ['', [[1, 2, 1, 0], [3, 5, 0, 1]], ['A', 'I']],
    ['R₂ → R₂ − 3R₁', [[1, 2, 1, 0], [0, -1, -3, 1]], ['', '']],
    ['R₂ → −R₂', [[1, 2, 1, 0], [0, 1, 3, -1]], ['', '']],
    ['R₁ → R₁ − 2R₂', [[1, 0, -5, 2], [0, 1, 3, -1]], ['I', '']],
    ['', [[1, 0, -5, 2], [0, 1, 3, -1]], ['I', 'A⁻¹']],
  ];
  const ampliada = (v, K) => {
    const q = k(v), [op, M, et] = PASOS1[Math.min(q, 4)];
    let h = (op ? K.t(170, 26, op, 's ta') : '') + mat(K, 170, 70, M, (i, j) => (q >= 4 && j >= 2 ? 'ta' : ''), 40, 28, 1);
    h += K.t(130, 120, et[0], 's tm') + K.t(210, 120, et[1], `s ${q >= 4 ? 'ta' : 'tm'}`);
    if (q >= 5) h += K.t(170, 160, 'A · A⁻¹ = I', 'ta') + K.t(170, 184, 'fila 1 por columna 1: 1·(−5) + 2·3 = 1', 's tm');
    return h;
  };
  // Capítulo 1, tu turno: R₂ → R₂ + k·R₁ en [[2, 1 | 1, 0], [6, 4 | 0, 1]].  v { k }
  const primerCero = (v, K) => {
    const M = [[2, 1, 1, 0], [6 + 2 * v.k, 4 + v.k, v.k, 1]];
    return K.c(110, 84, 13, M[1][0] === 0 ? 'fo' : 'fn') + mat(K, 170, 70, M, '', 40, 28, 1) + K.t(170, 118, `R₂ → R₂ ${conK(v.k)}·R₁`, 's ta');
  };

  // Capítulo 2: las operaciones son elementales y su producto es A⁻¹.  v { k }
  const ES = [['E₁: R₂ − 3R₁', [[1, 0], [-3, 1]]], ['E₂: −R₂', [[1, 0], [0, -1]]], ['E₃: R₁ − 2R₂', [[1, -2], [0, 1]]]];
  const porque = (v, K) => {
    const q = k(v);
    if (q === 0) return mat(K, 90, 70, ES[0][1]) + K.t(46, 74, 'E₁ =', 's', 'end') + K.t(236, 74, 'es I con R₂ → R₂ − 3R₁', 's ta') + K.t(170, 140, 'E₁·A le hace a A esa operación', 's tm');
    if (q <= 2) {
      let h = ES.map(([t, M], i) => K.t(60 + i * 110, 24, t, 's tm') + mat(K, 60 + i * 110, 62, M, 's')).join('');
      h += K.t(170, 124, 'E₃ E₂ E₁ A = I', 'ta');
      if (q === 2) h += K.t(170, 158, 'entonces E₃ E₂ E₁ = A⁻¹', 'ta');
      return h;
    }
    if (q === 3) return K.t(170, 50, '[ A | I ]', '') + K.ar(170, 60, 170, 80, 'lm') + K.t(170, 100, '[ E₃E₂E₁·A | E₃E₂E₁·I ]', 's') + K.ar(170, 110, 170, 130, 'lm') + K.t(170, 152, '[ I | A⁻¹ ]', 'ta');
    return K.t(250, 34, 'e₁', 's ta') + K.t(290, 34, 'e₂', 's ta') + mat(K, 210, 70, [[1, 2, 1, 0], [3, 5, 0, 1]], (i, j) => (j >= 2 ? 'ta' : ''), 40, 28, 1)
      + K.t(170, 130, 'A·x = e₁ y A·x = e₂, a la vez', 's') + K.t(170, 154, 'sus soluciones son las columnas de A⁻¹', 's tm');
  };

  // Capítulo 3: una fila de ceros a la izquierda.  v { k }
  const FILAS3 = [[[1, 2, 3], [2, 5, 7], [1, 3, 4]], [[1, 2, 3], [0, 1, 1], [0, 1, 1]], [[1, 2, 3], [0, 1, 1], [0, 0, 0]]];
  const sinInversa = (v, K) => {
    const q = k(v), M = FILAS3[q >= 4 ? 0 : Math.min(q, 2)];
    let h = '';
    if (q === 2 || q === 3 || q === 5) h += K.r(56, 96, 108, 26, 'ff', 8);
    h += mat(K, 110, 80, q === 5 ? FILAS3[2] : M, '', 34, 28);
    const lado = ['¿tiene inversa?', 'R₂ − 2R₁, R₃ − R₁', 'R₃ − R₂', 'la columna 3 no tiene pivote', 'fila 3 = fila 2 − fila 1', 'fila de ceros: sin inversa'][q];
    h += K.t(254, 84, lado, `s ${q === 5 ? 'tf' : 'ta'}`);
    if (q === 3) h += K.t(254, 106, 'la izquierda no llega a I', 's tm');
    if (q === 4) h += K.t(254, 106, 'no trae nada nuevo', 's tm');
    return h;
  };
  // Capítulo 3, tu turno: A = [[1, 1, 2], [1, 2, 3], [2, 1, c]].  v { c }
  const buscaC = (v, K) => {
    const R = [[1, 1, 2], [0, 1, 1], [0, 0, v.c - 3]], z = v.c === 3;
    return K.t(30, 74, 'A =', 's', 'end') + mat(K, 80, 70, [[1, 1, 2], [1, 2, 3], [2, 1, v.c]], (i, j) => (i === 2 && j === 2 ? 'ta' : ''), 28, 26)
      + K.ar(132, 70, 166, 70, 'lm') + mat(K, 252, 70, R, (i) => (i === 2 ? 'ta' : ''), 28, 26)
      + K.t(170, 136, z ? 'fila de ceros: sin inversa' : 'pivote ≠ 0: hay inversa', `s ${z ? 'tf' : 'tm'}`);
  };

  // Capítulo 4: x = A⁻¹ b.  v { k }
  const IV = [[0, 1, -1], [-2, 2, -1], [1, -1, 1]];
  const resuelve = (v, K) => {
    const q = k(v);
    if (q === 0) return ['x₁ + x₃ = 3', 'x₁ + x₂ + 2x₃ = 7', 'x₂ + 2x₃ = 6'].map((t, i) => K.t(30, 54 + i * 28, t, '', 'start')).join('') + K.t(270, 82, 'A·x = b', 'ta');
    if (q === 1) return K.t(170, 70, 'A⁻¹A·x = A⁻¹b', '') + K.t(170, 110, 'x = A⁻¹b', 'ta') + K.t(170, 146, 'porque A⁻¹A = I', 's tm');
    let h = K.t(62, 84, 'A⁻¹ =', 's', 'end') + mat(K, 112, 80, IV, (i) => (q === 3 && i === 0 ? 'ta' : ''), 30, 24) + K.t(204, 84, 'b =', 's', 'end') + mat(K, 230, 80, [[3], [7], [6]], 's', 30, 24);
    if (q === 3) h += K.t(170, 160, 'x₁ = 0·3 + 1·7 − 1·6 = 1', 's ta');
    if (q === 4) h += K.t(170, 156, 'x = (1, 2, 2)', 'ta') + K.t(170, 180, 'comprueba: A·(1, 2, 2) = (3, 7, 6)', 's tm');
    if (q === 5) h += K.t(170, 160, 'otro b: la misma A⁻¹, sin reducir otra vez', 's tm');
    return h;
  };
  // Capítulo 4, tu turno: x₃ con b = (4, 9, 8).  v { z }
  const terceraX = (v, K) => K.t(62, 68, 'A⁻¹ =', 's', 'end') + mat(K, 112, 64, IV, (i) => (i === 2 ? 'ta' : ''), 30, 22) + K.t(204, 68, 'b =', 's', 'end') + mat(K, 230, 64, [[4], [9], [8]], 's', 30, 22)
    + K.t(170, 132, `x₃ = ${r1(v.z)}`, 'ta');

  // Problema: panes P, Q y R.  v { x, y, z }
  const PI = [[3, -2, 1], [-2, 2, -1], [1, -1, 1]];
  const panes = (v, K) => {
    const g = [v.x + v.y, v.x + 2 * v.y + v.z, v.y + 2 * v.z], b = [5, 9, 7], n = ['harina', 'leche', 'mantequilla'];
    return K.t(32, 64, 'A⁻¹ =', 's', 'end') + mat(K, 78, 60, PI, 's', 28, 22) + K.t(148, 64, 'b =', 's', 'end') + mat(K, 170, 60, b.map(x => [x]), 's', 26, 22)
      + g.map((x, i) => K.t(208, 42 + i * 22, `${n[i]}: ${r1(x)} de ${b[i]}`, `s ${x === b[i] ? 'to' : 'tm'}`, 'start')).join('')
      + K.t(170, 132, `tandas: P = ${r1(v.x)}, Q = ${r1(v.y)}, R = ${r1(v.z)}`, 's ta');
  };

  xpLec('geo-5', [
    ['La identidad al lado',
      xpMira('dibujo', 'La inversa se halla poniendo la **identidad al lado** y reduciendo.', { dib: ampliada, v: { k: 0 }, alto: 200 }, [
        ['Se escribe A y, a su derecha, la identidad: [A | I]. Una raya separa los dos bloques.', {}],
        ['Cada operación va en la fila entera. R₂ − 3R₁ deja un cero bajo el pivote y cambia también la derecha.', { k: 1 }],
        ['Ahora el pivote de la fila 2 vale −1. Se multiplica esa fila por −1 para que valga 1.', { k: 2 }],
        ['Falta el cero encima del pivote: R₁ − 2R₂. La izquierda ya es la identidad.', { k: 3 }],
        ['Lo que quedó a la derecha es la inversa: [A | I] se volvió [I | A⁻¹].', { k: 4 }, '$[A \\mid I] \\to [I \\mid A^{-1}]$'],
        ['Se comprueba multiplicando: A·A⁻¹ debe dar la identidad. Si no la da, hubo un error de cuentas.', { k: 5 }],
      ], 'Se reduce $[A \\mid I]$ con operaciones en la fila entera; cuando la izquierda es $I$, la derecha es $A^{-1}$.'),
      xpHaz('dibujo', 'Elige k en R₂ → R₂ + k·R₁ para dejar un cero debajo del pivote 2. Mira cómo cambia también el bloque derecho.', {
        dib: primerCero, v: { k: 0 }, metas: { k: -3 }, alto: 180, manijas: [{ k: 'k', min: -5, max: 5, paso: 1, et: 'k' }],
        lee: v => `$6 + 2 \\cdot ${v.k < 0 ? `(${v.k})` : v.k} = ${6 + 2 * v.k}$`, pista: 'Cuántas veces cabe el 2 en el 6, y con qué signo, para que 6 + 2k dé 0.' },
      'Con $k = -3$: $6 + 2k = 0$, y a la derecha la fila 2 queda $(-3, 1)$.')],
    ['Por qué funciona',
      xpMira('dibujo', 'Cada operación de fila es una **matriz**: eso explica el truco.', { dib: porque, v: { k: 0 }, alto: 190 }, [
        ['Cada operación de fila es una matriz elemental E: hacer la operación es multiplicar por E a la izquierda.', {}],
        ['Las tres operaciones de antes son E₁, E₂ y E₃. Juntas llevan A hasta I: E₃E₂E₁A = I.', { k: 1 }],
        ['Si ese producto deshace a A, entonces es su inversa: E₃E₂E₁ = A⁻¹.', { k: 2 }, '$E_3E_2E_1 = A^{-1}$'],
        ['A la derecha empezó I. Las mismas operaciones la volvieron E₃E₂E₁·I, que es A⁻¹.', { k: 3 }],
        ['Otra mirada: la columna j de A⁻¹ resuelve A·x = eⱼ. La raya junta los sistemas y se resuelven a la vez.', { k: 4 }],
      ], 'Las operaciones son elementales: su producto lleva A a I, así que es $A^{-1}$, y es lo que queda a la derecha.'),
      xpHaz('fichas', 'Tres operaciones F₁, F₂ y F₃, en ese orden, llevaron B hasta I. Arma B⁻¹ como producto de ellas.', {
        slots: [{ x: 150, y: 56, w: 52, h: 38 }, { x: 210, y: 56, w: 52, h: 38 }, { x: 270, y: 56, w: 52, h: 38 }], alto: 100,
        fondo: K => K.t(114, 61, 'B⁻¹ =', '', 'end') + K.t(170, 20, 'primero F₁, luego F₂ y al final F₃', 's tm'),
        fichas: ['F₁', 'F₂', 'F₃', 'B'], meta: ['F₃', 'F₂', 'F₁'], pista: 'Cada operación nueva multiplica por la izquierda: la primera queda pegada a B, a la derecha.' },
      '$B^{-1} = F_3F_2F_1$: la primera operación queda a la derecha.')],
    ['Cuando no hay inversa',
      xpMira('dibujo', 'A veces la izquierda **no** llega a I. Hay una señal clara.', { dib: sinInversa, v: { k: 0 }, alto: 190 }, [
        ['Se reduce esta A como siempre: lo que importa es la izquierda.', {}],
        ['R₂ − 2R₁ y R₃ − R₁ dejan ceros debajo del primer pivote.', { k: 1 }],
        ['R₃ − R₂ hace el cero de la columna 2, pero se lleva toda la fila: queda (0, 0, 0).', { k: 2 }],
        ['La columna 3 se quedó sin pivote. Ninguna operación de fila vuelve a crear ahí un 1: no se llega a I.', { k: 3 }],
        ['La razón: la fila 3 era la fila 2 menos la fila 1. No traía información nueva.', { k: 4 }],
        ['Regla: si a la izquierda aparece una fila de ceros, se para. A no tiene inversa.', { k: 5 }],
      ], 'Si al reducir aparece una fila de ceros en el bloque izquierdo, no se llega a $I$: A no tiene inversa.'),
      xpHaz('dibujo', 'Desliza c hasta que, al escalonar, la última fila de la izquierda quede de ceros.', {
        dib: buscaC, v: { c: 0 }, metas: { c: 3 }, alto: 200, manijas: [{ k: 'c', min: -2, max: 7, paso: 1, et: 'c' }],
        lee: v => `$\\text{última fila: } (0,\\ 0,\\ ${v.c - 3})$`, pista: 'La última entrada queda c − 3: busca el c que la anula.' },
      'Con $c = 3$ la fila 3 queda $(0, 0, 0)$ y A no tiene inversa.')],
    ['Resolver con la inversa',
      xpMira('dibujo', 'Con la inversa, un sistema se resuelve **multiplicando**.', { dib: resuelve, v: { k: 0 }, alto: 200 }, [
        ['Un sistema de tres ecuaciones es A·x = b: A guarda los números, x las incógnitas y b los resultados.', {}],
        ['Si A tiene inversa, se multiplica por A⁻¹ a los dos lados. Como A⁻¹A = I, queda x = A⁻¹b.', { k: 1 }, '$\\vec x = A^{-1}\\vec b$'],
        ['Esta es la inversa de esa A, hallada con Gauss-Jordan, y b es la columna de resultados.', { k: 2 }],
        ['Cada fila de A⁻¹ por b da una incógnita: la fila 1 da x₁ = 1.', { k: 3 }],
        ['Las tres filas dan x = (1, 2, 2). Se comprueba metiéndolo en el sistema.', { k: 4 }],
        ['Si cambia b, no hay que reducir otra vez: la misma A⁻¹ sirve para cualquier b.', { k: 5 }],
      ], 'Si A es invertible, $A\\vec x = \\vec b$ tiene la solución $\\vec x = A^{-1}\\vec b$, para cualquier $\\vec b$.'),
      xpHaz('dibujo', 'Con la misma A⁻¹ y un nuevo b = (4, 9, 8), desliza x₃ hasta su valor.', {
        dib: terceraX, v: { z: 0 }, metas: { z: 3 }, alto: 190, manijas: [{ k: 'z', min: 0, max: 8, paso: 1, et: 'x₃' }],
        lee: v => `$x_3 = ${v.z}$`, pista: 'Usa la fila 3 de A⁻¹: 1·4 − 1·9 + 1·8.' },
      '$x_3 = 4 - 9 + 8 = 3$: la fila 3 de $A^{-1}$ por $\\vec b$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una panadería hace panes P, Q y R con harina, leche y mantequilla. Se gastaron 5, 9 y 7 unidades. Con A⁻¹ a la vista, ajusta las tandas de cada pan.', {
        dib: panes, v: { x: 0, y: 0, z: 0 }, metas: { x: 4, y: 1, z: 3 }, alto: 300,
        manijas: [{ k: 'x', min: 0, max: 6, paso: 1, et: 'tandas de P' }, { k: 'y', min: 0, max: 6, paso: 1, et: 'tandas de Q' }, { k: 'z', min: 0, max: 6, paso: 1, et: 'tandas de R' }],
        lee: v => `$A ${pm([[v.x], [v.y], [v.z]])} = ${pm([[v.x + v.y], [v.x + 2 * v.y + v.z], [v.y + 2 * v.z]])}$`, pista: 'Multiplica A⁻¹ por (5, 9, 7), fila por columna: la fila 1 da las tandas de P.' },
      '$A^{-1}\\vec b = (15 - 18 + 7,\\ -10 + 18 - 7,\\ 5 - 9 + 7) = (4, 1, 3)$: 4 tandas de P, 1 de Q y 3 de R.')],
  ], 'Se reduce $[A \\mid I]$ hasta $[I \\mid A^{-1}]$; una fila de ceros dice que no hay inversa; con ella, $\\vec x = A^{-1}\\vec b$.');
}
