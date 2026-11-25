// Ejercicios de «Movimientos y Vistas» (Preicfes, icf-ma-espacio; spec 2026-11-25-preicfes-estructura): movimientos en el plano y
// coordenadas. Armazones en figura-kit, conteo-escena y proposiciones-escena. La imagen completa aparece al comprobar.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], M = 6, U = 17, X = x => 170 + x * U, Y = y => 112 - y * U;
  const red = K => { let h = ''; for (let i = -M; i <= M; i++) h += K.l(X(i), Y(-M), X(i), Y(M), i ? 'lr' : 'lm') + K.l(X(-M), Y(i), X(M), Y(i), i ? 'lr' : 'lm'); for (const i of [-4, -2, 2, 4]) h += K.t(X(i), Y(0) + 14, i, 's tm') + K.t(X(0) - 6, Y(i) + 4, i, 's tm', 'end'); return h; };
  const poli = (K, ps, cls) => K.p(ps.map(([x, y]) => [X(x), Y(y)]), cls);
  // Un punto de la figura y su imagen: se arrastra la imagen de A.  T(q, p) lleva cada punto a su imagen.
  const imagen = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ x: 0, y: 0 }), alto: () => 224, ms: 1100, pie: 'Arrastra el punto a donde queda A.',
    manijas: () => [{ k: ['x', 'y'], min: [-M, -M], max: [M, M], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 170) / U, (112 - y) / U] }],
    ok(v, p) { const [x, y] = d.T(p.A, p); return v.x === x && v.y === y; }, sol(p) { const [x, y] = d.T(p.A, p); return { x, y }; }, texto: p => `(${d.T(p.A, p).join(', ')})`,
    dib: (v, K, p, f) => red(K) + (d.fondo?.(K, p) || '') + poli(K, [p.A, ...p.otros], 'fa') + K.t(X(p.A[0]), Y(p.A[1]) - 8, 'A', 'b ta') + K.f(f, poli(K, [p.A, ...p.otros].map(q => d.T(q, p)), 'fg')),
    aviso: (v, p) => d.aviso?.(v, p) || 'A no queda ahí.', bien: (v, p) => `A queda en (${d.T(p.A, p).join(', ')}).`,
  });
  imagen('traslada-punto', { T: ([x, y], p) => [x + p.v[0], y + p.v[1]], aviso: (v, p) => (v.x === p.A[0] + p.v[0] ? 'El movimiento de lado está bien: mira cuánto sube o baja.' : v.y === p.A[1] + p.v[1] ? 'La altura está bien: mira cuánto va de lado.' : 'Cuenta los cuadros desde A, no desde el origen.') });
  imagen('refleja-punto', { T: ([x, y], p) => (p.eje === 'y' ? [-x, y] : p.eje === 'x' ? [x, -y] : [y, x]), fondo: (K, p) => (p.eje === 'y' ? K.l(X(0), Y(-M), X(0), Y(M), 'lg gr') : p.eje === 'x' ? K.l(X(-M), Y(0), X(M), Y(0), 'lg gr') : K.l(X(-M), Y(-M), X(M), Y(M), 'lg gr')), aviso: () => 'La imagen queda igual de lejos de la línea, justo al frente.' });
  imagen('rota-punto', { T: ([x, y], p) => (p.g === 90 ? [-y || 0, x] : p.g === 180 ? [-x, -y] : [y, -x || 0]), fondo: K => K.c(X(0), Y(0), 5, 'fF'), aviso: (v, p) => (Math.abs(v.x ** 2 + v.y ** 2 - p.A[0] ** 2 - p.A[1] ** 2) < 1e-9 ? 'Está a la misma distancia del centro, pero no es ese giro.' : 'Al girar no cambia la distancia al centro.') });
  imagen('homotecia-punto', { T: ([x, y], p) => [x * p.k, y * p.k], fondo: K => K.c(X(0), Y(0), 5, 'fF'), aviso: (v, p) => (p.k < 0 && v.x === p.A[0] * -p.k && v.y === p.A[1] * -p.k ? 'Con factor negativo pasa al otro lado del centro.' : 'Multiplica la distancia desde el centro, en la misma recta.') });
  XG.renglones('que-movimiento', { w: 108, x: 274 });
  XG.frases('que-se-conserva');
  XG.ascensor('sube-movimiento', 100, 2, neutro);

  // ---------------------------------------------------------------------------------------------------------- coordenadas
  const libre = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ x: 0, y: 0 }), alto: () => 224, ms: 900, pie: d.pie, manijas: () => [{ k: ['x', 'y'], min: [-M, -M], max: [M, M], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 170) / U, (112 - y) / U] }],
    ok(v, p) { const [x, y] = d.meta(p); return v.x === x && v.y === y; }, sol(p) { const [x, y] = d.meta(p); return { x, y }; }, texto: p => `(${d.meta(p).join(', ')})`, dib: (v, K, p, f) => red(K) + d.dib(v, K, p, f), aviso: d.aviso, bien: d.bien,
  });
  // Cuarto vértice de un paralelogramo ABCD: D = A + C − B.
  const cuarto = p => [p.A[0] + p.C[0] - p.B[0], p.A[1] + p.C[1] - p.B[1]];
  libre('cuarto-vertice', { pie: 'Arrastra el vértice D.', meta: cuarto, dib: (v, K, p, f) => K.pl([p.A, p.B, p.C].map(([x, y]) => [X(x), Y(y)]), 'la gr') + [['A', p.A], ['B', p.B], ['C', p.C]].map(([t, [x, y]]) => K.c(X(x), Y(y), 4, 'fa') + K.t(X(x) + 9, Y(y) - 7, t, 'b ta')).join('') + K.f(f, K.pl([p.C, [v.x, v.y], p.A].map(([x, y]) => [X(x), Y(y)]), 'lg gr')),
    aviso: () => 'Los lados opuestos deben ir igual: lo que se camina de B a A, se camina de C a D.', bien: (v) => `D = (${v.x}, ${v.y}).` });
  // Punto del segmento AB que lo parte en dos.
  libre('punto-medio', { pie: 'Arrastra el punto medio.', meta: p => [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2], dib: (v, K, p, f) => [['A', p.A], ['B', p.B]].map(([t, [x, y]]) => K.c(X(x), Y(y), 5, 'fa') + K.t(X(x) + 9, Y(y) - 7, t, 'b ta')).join('') + K.f(f, K.l(X(p.A[0]), Y(p.A[1]), X(p.B[0]), Y(p.B[1]), 'la gr')),
    aviso: (v, p) => (2 * v.x === p.A[0] + p.B[0] ? 'La x está bien; promedia las y.' : 2 * v.y === p.A[1] + p.B[1] ? 'La y está bien; promedia las x.' : 'Promedia las x y promedia las y.'), bien: v => `(${v.x}, ${v.y}) está a igual distancia de A y de B.` });
  // Coordenadas polares de un punto sobre un eje.  params { P: [x, y], r, g }
  XG.figura('polar-gira', {
    ini: () => ({ g: 0, r: 1 }), alto: () => 312, ms: 1000, pie: 'Mueve el giro y los pasos.', manijas: () => [{ k: 'g', min: 0, max: 345, paso: 15, et: 'giro (°)' }, { k: 'r', min: 1, max: 6, paso: 1, et: 'pasos' }],
    ok: (v, p) => v.g === p.g && v.r === p.r, sol: p => ({ g: p.g, r: p.r }), texto: p => `${p.r} pasos a ${p.g}°`,
    dib(v, K, p, f) { const q = K.at(X(0), Y(0), 70, v.g); return red(K) + K.c(X(p.P[0]), Y(p.P[1]), 6, 'fa') + K.l(X(0), Y(0), ...q, 'lg gr') + K.c(X(0), Y(0), 4, 'fF') + K.f(f, K.c(...K.at(X(0), Y(0), v.r * U, v.g), 8, 'fg')); },
    aviso: (v, p) => (v.g !== p.g ? 'No mira hacia el punto: el giro empieza a la derecha y va contra el reloj.' : 'Mira bien, pero camina otra distancia.'), bien: (v, p) => `(${p.P.join(', ')}) es ${p.r} pasos a ${p.g}°.`,
  });
  XG.renglones('polar-a-cartesiana', { w: 92, x: 274 });
  XG.frases('mismo-polar');
  XG.rotula('caja-coordenadas', {
    slots: p => p.metas.map((_, i) => ({ x: 262, y: 34 + i * 48, w: 112, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => Math.max(190, 34 + p.metas.length * 48 - 18),
    fondo(K, p) { const o = [84, 156], u = 22, c = (x, y, z) => K.iso(o, u, x, y, z), L = (a, b) => K.l(...c(...a), ...c(...b), 'gr'), [a, b, h] = p.d, V = [[0, 0, 0], [a, 0, 0], [0, b, 0], [0, 0, h], [a, b, 0], [a, 0, h], [0, b, h], [a, b, h]]; return [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 6], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7]].map(([i, j]) => L(V[i], V[j])).join('') + p.ver.map(([t, q], i) => { const [x, y] = c(...q); return K.c(x, y, 5, 'fF') + K.t(x + 8, y - 6, t, 'b ta', 'start'); }).join('') + K.t(c(a + 0.6, 0, 0)[0], c(a + 0.6, 0, 0)[1] + 10, 'x', 's tm') + K.t(c(0, b + 0.6, 0)[0], c(0, b + 0.6, 0)[1], 'y', 's tm') + K.t(c(0, 0, h + 0.5)[0], c(0, 0, h + 0.5)[1], 'z', 's tm') + p.ver.map(([t], i) => K.t(196, 39 + i * 48, t, 'b', 'end')).join(''); },
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,
  });
  XG.ascensor('sube-distancia', 60, 1, neutro);
})();
