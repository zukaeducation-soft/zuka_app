// Geometría Vectorial · explicación de geo-3 «Transpuesta, sistemas m×n y tipos de solución» (spec
// 2026-11-27-curso-geometria-vectorial). Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const R = Math.round;
  // Matriz con corchetes; txt(i, j, e) da el texto y cls(i, j) la clase. bar: columna tras la que va la raya.
  const mat = (K, x, y, M, o = {}) => {
    const cw = o.cw || 46, rh = o.rh || 34, w = M[0].length * cw + 8, h = M.length * rh;
    let s = K.pl([[x + 6, y], [x, y], [x, y + h], [x + 6, y + h]]) + K.pl([[x + w - 6, y], [x + w, y], [x + w, y + h], [x + w - 6, y + h]]);
    if (o.bar != null) s += K.l(x + 4 + cw * (o.bar + 1), y + 3, x + 4 + cw * (o.bar + 1), y + h - 3, 'lm');
    M.forEach((r, i) => r.forEach((e, j) => { s += K.t(x + 4 + cw * (j + 0.5), y + rh * (i + 0.5) + 5, typeof e === 'string' ? e : sg(e), o.cls ? o.cls(i, j) : ''); }));
    return s;
  };
  const cab = (K, x, cw, y, et) => et.map((t, j) => K.t(x + 4 + cw * (j + 0.5), y, t, 's tm')).join('');

  // --------------------------------------------------------------------------- 1. la transpuesta
  const A = [[3, 1, 7], [5, 0, 2]], S = [[2, 6, -1], [6, 5, 3], [-1, 3, 1]];
  const voltea = (v, K) => {
    const X = 113, Y = 40, u = 38;
    let h = K.f(v.d, K.l(X, Y, X + 3 * u, Y + 3 * u, 'lm d'));
    if (v.sym > 0.5) {
      h += mat(K, X - 4, Y, S, { cw: u, rh: u, cls: (i, j) => (i === j ? '' : i < j ? 'ta' : 'tg') });
      return h + K.t(170, 22, 'simétrica: Sᵀ = S', 'ta') + K.f(v.pr, K.t(170, 182, '(A + B)ᵀ = Aᵀ + Bᵀ      (AB)ᵀ = BᵀAᵀ', 's'));
    }
    const t = v.t, c = 3 + (2 - 3) * t, f = 2 + (3 - 2) * t;
    h += K.pl([[X + 6, Y], [X, Y], [X, Y + f * u], [X + 6, Y + f * u]]) + K.pl([[X + c * u - 6, Y], [X + c * u, Y], [X + c * u, Y + f * u], [X + c * u - 6, Y + f * u]]);
    A.forEach((r, i) => r.forEach((e, j) => {
      const x = X + u * ((j + 0.5) + ((i + 0.5) - (j + 0.5)) * t), y = Y + u * ((i + 0.5) + ((j + 0.5) - (i + 0.5)) * t);
      h += K.t(x, y + 5, sg(e), i ? 'tg' : 'ta');
    }));
    const tag = v.lab > 0.5 ? (t > 0.5 ? 'Aᵀ: 3 × 2' : 'A: 2 × 3, otra vez') : 'A: 2 × 3';
    return h + K.t(170, 22, tag, 'b') + K.f(v.lab, K.t(300, 120, '(i, j) → (j, i)', 's tm', 'end'));
  };
  // Simétrica con tres casillas por llenar.
  const SIM = [[2, 6, -1], ['', 5, 3], ['', '', 1]];
  const simFondo = K => K.l(90, 20, 258, 158, 'lm d') + mat(K, 86, 20, SIM, { cw: 56, rh: 46 });

  // --------------------------------------------------------------------------- 2. aumentada y operaciones
  const PASOS = [
    null,
    [[1, -1, 2, 5], [2, 1, 1, 7], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [0, 1, 5, 11]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 3, -3, -3]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 1, -1, -1]],
  ];
  const OPS = ['', 'la matriz aumentada', 'F₂ → F₂ − 2F₁', 'F₃ → F₃ + F₁', 'F₂ ↔ F₃', 'F₃ → ⅓F₃'];
  const CAMBIA = [[], [], [1], [2], [1, 2], [2]];
  const aumentada = (v, K) => {
    const k = R(v.k);
    if (!k) return ['x − y + 2z = 5', '2x + y + z = 7', '−x + 2y + 3z = 6'].map((t, i) => K.t(170, 66 + i * 34, t)).join('') + K.t(170, 22, 'tres ecuaciones, tres incógnitas', 's tm');
    let h = K.t(170, 22, OPS[k], k > 1 ? 'ta' : 'tm');
    CAMBIA[k].forEach(i => { h += K.r(70, 44 + i * 34, 184, 34, 'fn', 4); });
    return h + mat(K, 66, 44, PASOS[k], { bar: 2 }) + cab(K, 66, 46, 38, ['x', 'y', 'z', 'c']);
  };
  // Tu turno: F₂ + k·F₁ deja un 0 debajo del 3.
  const anula = (v, K) => {
    const F1 = [3, -1, 4], F2 = [-6, 5, 1], N = F2.map((e, j) => e + v.k * F1[j]);
    return K.c(96, 47, 15, 'fn') + K.c(96, 81, 15, N[0] === 0 ? 'fo' : 'ff') + mat(K, 70, 30, [F1, N], { cw: 52, bar: 1 })
      + K.t(240, 52, 'F₁', 's tm', 'start') + K.t(240, 86, `F₂ ${v.k < 0 ? '−' : '+'} ${Math.abs(v.k)}·F₁`, 's ta', 'start');
  };

  // --------------------------------------------------------------------------- 3. escalera de pivotes
  const ESC = [[2, 4, -2, 6], [0, 3, 6, -3], [0, 0, 0, 0]], RED = [[1, 0, -5, 5], [0, 1, 2, -1], [0, 0, 0, 0]];
  const escalera = (v, K) => {
    const k = R(v.k), X = 66, Y = 34, cw = 50, rh = 34, M = k >= 3 ? RED : ESC, c = (i, j) => [X + 4 + cw * (j + 0.5), Y + rh * (i + 0.5)];
    let h = cab(K, X, cw, 26, ['x', 'y', 'z', 'c']);
    if (k >= 1) h += K.c(...c(0, 0), 15, 'fo') + K.c(...c(1, 1), 15, 'fo') + K.pl([[X + 4, Y + rh], [X + 4 + cw, Y + rh], [X + 4 + cw, Y + 2 * rh], [X + 4 + 3 * cw, Y + 2 * rh]], 'la d');
    if (k === 2) h += K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4);
    if (k >= 4) h += K.r(X + 4 + 2 * cw + 4, Y + 2, cw - 8, 3 * rh - 4, 'fn', 6);
    h += mat(K, X, Y, M, { cw, rh, bar: 2 });
    const pie = ['', 'pivotes: 2 y 3', 'forma escalonada', 'forma escalonada reducida', 'z sin pivote: z = t, libre', 'x = 5 + 5t     y = −1 − 2t     z = t'][k];
    return h + K.t(170, 166, pie, k >= 4 ? 'ta' : 's tm');
  };
  const PL = [[2, -1, 3, 0, 1], [0, 0, 1, 4, 2], [0, 0, 0, 5, 5]], XC = [52, 114, 176, 238, 298];
  const plFondo = K => {
    let h = K.pl([[26, 22], [20, 22], [20, 106], [26, 106]]) + K.pl([[318, 22], [324, 22], [324, 106], [318, 106]]) + K.l(268, 25, 268, 103, 'lm');
    PL.forEach((r, i) => r.forEach((e, j) => { h += K.t(XC[j], 22 + 28 * (i + 0.5) + 5, sg(e)); }));
    return h + ['x₁', 'x₂', 'x₃', 'x₄'].map((t, j) => K.t(XC[j], 14, t, 's tm')).join('');
  };

  // --------------------------------------------------------------------------- 4. leer el tipo
  const TOP = [[1, 2, -1, 4], [0, 1, 3, 5]];
  const ULT = [[0, 0, 2, 6], [0, 0, 0, 4], [0, 0, 0, 0], [0, 0, 'k − 1', 'k + 2']];
  const DICE = [['2z = 6: z = 3, y luego y, x', 'solución única'], ['0 = 4: imposible', 'ninguna solución'], ['0 = 0: z queda libre, z = t', 'infinitas soluciones'], ['depende de k', '']];
  const tipo = (v, K) => {
    const c = R(v.c), X = 66, Y = 30, cw = 50, rh = 34;
    let h = K.r(X + 4, Y + 2 * rh, 4 * cw, rh, c === 1 ? 'ff' : c === 2 ? 'fn' : 'fo', 4);
    h += mat(K, X, Y, [...TOP, ULT[c]], { cw, rh, bar: 2 }) + cab(K, X, cw, 22, ['x', 'y', 'z', 'c']);
    const [a, b] = c === 3 && v.k > 0.5 ? ['k ≠ 1: única     k = 1: 0 = 3, ninguna', ''] : DICE[c];
    return h + K.t(170, 158, a, 's') + K.t(170, 180, b, 'ta');
  };
  const tipoK = (v, K) => {
    const X = 66, Y = 24, cw = 50, rh = 34, a = v.k + 3, b = v.k - 2;
    return K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4) + mat(K, X, Y, [[1, -2, 1, 0], [0, 1, 4, 2], [0, 0, a, b]], { cw, rh, bar: 2 }) + cab(K, X, cw, 16, ['x', 'y', 'z', 'c']);
  };

  // --------------------------------------------------------------------------- 5. el problema: una mezcla con un parámetro
  const mezcla = (v, K) => {
    const x = [8 - 2 * v.t, 2 + v.t, v.t], cls = ['fa', 'fg', 'fo'];
    return x.map((n, i) => K.t(30, 46 + i * 36, `x${'₁₂₃'[i]}`, 's', 'end') + K.r(40, 32 + i * 36, Math.max(0, n) * 26, 22, cls[i], 4) + K.t(Math.max(0, n) * 26 + 48, 48 + i * 36, `${n} bolsas`, 's', 'start')).join('')
      + K.t(170, 18, `t = ${v.t}`, 's tm');
  };

  xpLec('geo-3', [
    ['Voltear una matriz',
      xpMira('dibujo', 'Primera idea: la **transpuesta** voltea la matriz sobre su diagonal.', { dib: voltea, v: { t: 0, d: 0, lab: 0, sym: 0, pr: 0 }, alto: 196 }, [
        ['Esta tabla A tiene 2 filas y 3 columnas: es de 2 × 3. Cada fila, una tienda; cada columna, un día.', {}],
        ['Transponer es voltearla sobre su diagonal, la línea que baja desde la esquina de arriba a la izquierda.', { d: 1 }],
        ['La fila 1 cae como columna 1; la fila 2, como columna 2. La entrada (i, j) pasa al lugar (j, i).', { t: 1 }],
        ['Así nace la transpuesta Aᵀ, de 3 × 2. Si se voltea otra vez, vuelve A: (Aᵀ)ᵀ = A.', { lab: 1 }],
        ['Hay matrices que no cambian al voltearlas: las simétricas, con Sᵀ = S. Cada número copia a su reflejo.', { t: 0, sym: 1 }],
        ['Dos reglas más: (A + B)ᵀ = Aᵀ + Bᵀ. Y al voltear un producto, el orden se invierte: (AB)ᵀ = BᵀAᵀ.', { pr: 1 }],
      ], 'La transpuesta cambia filas por columnas; una simétrica es igual a su transpuesta, y (AB)ᵀ = BᵀAᵀ.'),
      xpHaz('fichas', 'Completa la matriz para que sea **simétrica**: cada casilla vacía copia a su reflejo en la diagonal.', {
        slots: [{ x: 118, y: 89, w: 46, h: 38 }, { x: 118, y: 135, w: 46, h: 38 }, { x: 174, y: 135, w: 46, h: 38 }], alto: 166, fondo: simFondo,
        fichas: ['3', '−6', '6', '1', '−1'], meta: ['6', '−1', '3'], pista: 'La casilla (2, 1) copia a la (1, 2); la (3, 1), a la (1, 3); la (3, 2), a la (2, 3).' },
      'En una simétrica, la casilla (i, j) vale lo mismo que la (j, i).')],
    ['Filas que se operan',
      xpMira('dibujo', 'Segunda idea: un sistema se guarda en una **matriz aumentada** y se trabaja por filas.', { dib: aumentada, v: { k: 0 }, alto: 158 }, [
        ['Tres ecuaciones con tres incógnitas. Para resolverlas, solo importan los números.', {}],
        ['En la matriz aumentada va una fila por ecuación y, tras la raya, las constantes.', { k: 1 }],
        ['Primera operación: sumar a una fila k veces otra. F₂ − 2F₁ deja un 0 debajo del primer 1.', { k: 2 }],
        ['Lo mismo abajo con F₃ + F₁. Es sumar dos ecuaciones: las soluciones no cambian.', { k: 3 }],
        ['Segunda: intercambiar dos filas. Es solo escribir las ecuaciones en otro orden.', { k: 4 }],
        ['Tercera: multiplicar una fila por k ≠ 0, aquí por ⅓. Con k = 0 se perdería una ecuación.', { k: 5 }],
      ], 'Intercambiar filas, multiplicar una por k ≠ 0 y sumarle k veces otra no cambian las soluciones.'),
      xpHaz('dibujo', 'Mueve k para que **F₂ + k·F₁** deje un 0 debajo del 3.', { dib: anula, v: { k: 0 }, metas: { k: 2 }, alto: 170,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$-6 + ${v.k < 0 ? `(${v.k})` : v.k} \\cdot 3 = ${-6 + 3 * v.k}$` },
      'Para anular −6 con el 3 de arriba hacen falta 2 veces: $-6 + 2 \\cdot 3 = 0$.')],
    ['La escalera de pivotes',
      xpMira('dibujo', 'Tercera idea: con esas operaciones la matriz queda en **escalera**.', { dib: escalera, v: { k: 0 }, alto: 180 }, [
        ['El pivote de una fila es su primer número distinto de cero.', {}],
        ['Aquí los pivotes son el 2 y el 3. Cada uno va más a la derecha que el de arriba; debajo, ceros.', { k: 1 }],
        ['La fila de ceros va al fondo. Así se ve la forma escalonada.', { k: 2 }],
        ['En la reducida cada pivote se vuelve 1 y también hay ceros encima de él.', { k: 3 }],
        ['La columna de z no tiene pivote: z es libre. Puede valer cualquier número; se le llama t.', { k: 4 }],
        ['Las demás se despejan con t. Cada valor de t da una solución distinta.', { k: 5 }],
      ], 'Pivote: primer número distinto de cero de su fila. Columna con pivote se despeja; sin pivote, queda libre.'),
      xpHaz('fichas', 'Rotula cada columna de esta escalonada: ¿tiene **pivote** o su variable queda **libre**?', {
        slots: XC.slice(0, 4).map(x => ({ x, y: 136, w: 60, h: 34 })), alto: 160, fondo: plFondo,
        fichas: ['pivote', 'libre', 'pivote', 'libre', 'pivote'], meta: ['pivote', 'libre', 'pivote', 'pivote'], pista: 'Fila por fila, busca el primer número distinto de cero: esa columna tiene pivote.' },
      'Los pivotes son el 2, el 1 y el 5: x₂ es la única libre.')],
    ['Una, ninguna o infinitas',
      xpMira('dibujo', 'Cuarta idea: la escalonada dice **cuántas soluciones** hay.', { dib: tipo, v: { c: 0, k: 0 }, alto: 192 }, [
        ['Si la última fila dice 2z = 6, sale z = 3 y, subiendo, y y x. Un pivote por incógnita: única.', {}],
        ['Si queda 0 0 0 | 4, esa fila dice 0 = 4. Ningún número lo cumple: el sistema no tiene solución.', { c: 1 }],
        ['Si queda una fila de puros ceros, dice 0 = 0: siempre se cumple. Pero z se queda sin pivote.', { c: 2 }],
        ['Con z = t libre hay una solución por cada t: infinitas.', {}],
        ['Si un número k está en la última fila, el tipo depende de k.', { c: 3 }],
        ['Con k ≠ 1 hay pivote: única. Con k = 1 queda 0 = 3: ninguna. Aquí infinitas no sale nunca.', { k: 1 }],
      ], 'Fila 0 … 0 | c con c ≠ 0: ninguna. Columna sin pivote y nada imposible: infinitas. Un pivote por incógnita: única.'),
      xpHaz('dibujo', 'Mueve k hasta que el sistema **no tenga solución**.', { dib: tipoK, v: { k: 0 }, metas: { k: -3 }, alto: 176,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$k = ${v.k}$` },
      'Con $k = -3$ la última fila es $0 \\ 0 \\ 0 \\mid -5$: dice $0 = -5$, imposible.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una mezcla de tres alimentos tiene infinitas soluciones: $x_1 = 8 - 2t$, $x_2 = 2 + t$, $x_3 = t$ bolsas. Busca la que lleva igual número de bolsas de $x_1$ y de $x_2$.', {
        dib: mezcla, v: { t: 0 }, metas: { t: 2 }, alto: 186, manijas: [{ k: 't', min: 0, max: 4, paso: 1, et: 'parámetro t' }],
        lee: v => `$x_1 = ${8 - 2 * v.t}$, $x_2 = ${2 + v.t}$, $x_3 = ${v.t}$` },
      'Con $t = 2$: $x_1 = 4$, $x_2 = 4$ y $x_3 = 2$. El parámetro recorre todas las soluciones; la condición escoge una.')],
  ], 'Aᵀ voltea filas y columnas; las operaciones de fila escalonan sin cambiar soluciones, y los pivotes dicen el tipo.');
}
