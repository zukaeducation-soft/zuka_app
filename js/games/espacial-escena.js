// Ejercicios de «Razonamiento espacial» (pu-es-1 a pu-es-4) con las escenas de la explicación: calles, torres de cubos, moldes, dados,
// espejos y dobleces. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100);
  // ---------------------------------------------------------------------------------------- pu-es-1 · rejillas y caminos
  const U = 32, X = i => 26 + i * U, Y = j => 178 - j * U, COL = 9, FIL = 5, DIR = { N: [0, 1], S: [0, -1], E: [1, 0], O: [-1, 0] };
  const calles = (K, c = COL, f = FIL) => { let h = ''; for (let i = 0; i <= c; i++) h += K.l(X(i), Y(0), X(i), Y(f), 'ls'); for (let j = 0; j <= f; j++) h += K.l(X(0), Y(j), X(c), Y(j), 'ls'); return h; };
  const pto = (K, [x, y], s, cls = 'fF') => K.c(X(x), Y(y), 6, cls) + K.t(X(x) + (x > 8 ? -13 : 13), Y(y) + (y > 4 ? 16 : -8), s);
  const mueve = (a, ms) => ms.reduce(([x, y], [d, n]) => [x + DIR[d][0] * n, y + DIR[d][1] * n], a);
  const ruta = (K, a, ms, p) => { const P = [[...a]]; let [x, y] = a; for (const [d, n] of ms) { const k = Math.min(n, Math.max(0, p)); x += DIR[d][0] * k; y += DIR[d][1] * k; p -= n; P.push([x, y]); } return K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr'); };
  const esquina = { k: ['x', 'y'], min: [0, 0], max: [COL, FIL], paso: [1, 1], r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 26) / U, (178 - y) / U] };
  const cuadras = (v, a) => Math.abs(v.x - a[0]) + Math.abs(v.y - a[1]);
  const ele = (K, v, a, cls) => K.pl([[X(a[0]), Y(a[1])], [X(v.x), Y(a[1])], [X(v.x), Y(v.y)]], cls);

  // Una esquina a tantas cuadras de A y tantas de B.  v { x, y }
  XG.figura('esquina-dos', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [esquina], ok: (v, p) => cuadras(v, p.A) === p.da && cuadras(v, p.B) === p.db,
    sol(p) { for (let x = 0; x <= COL; x++) for (let y = 0; y <= FIL; y++) if (cuadras({ x, y }, p.A) === p.da && cuadras({ x, y }, p.B) === p.db) return { x, y }; return null; },
    texto: p => `a lo ancho y a lo alto suman ${p.da} desde A y ${p.db} desde B`, alto: () => 194, pie: 'Arrastra el punto por las esquinas.',
    dib: (v, K, p, f) => calles(K) + K.f(f, ele(K, v, p.A, 'la gr') + ele(K, v, p.B, 'lg gr')) + pto(K, p.A, 'A') + pto(K, p.B, 'B', 'fG'),
    lee: (v, p) => `$A: ${R(cuadras(v, p.A))} \\qquad B: ${R(cuadras(v, p.B))}$`, aviso: (v, p) => (cuadras(v, p.A) === p.da ? 'A la distancia de A le va bien; la de B no.' : cuadras(v, p.B) === p.db ? 'A la distancia de B le va bien; la de A no.' : 'Cuenta por las calles: lo que separa a lo ancho más lo que separa a lo alto.'), bien: () => 'Las dos distancias se cumplen por las calles.',
  });
  XG.figura('termina-ruta', {
    ini: p => ({ x: p.a[0], y: p.a[1] }), manijas: () => [esquina], ok: (v, p) => mueve(p.a, p.ms).join() === [v.x, v.y].join(), sol: p => { const [x, y] = mueve(p.a, p.ms); return { x, y }; },
    texto(p) { const [x, y] = mueve(p.a, p.ms), dx = x - p.a[0], dy = y - p.a[1]; return `${Math.abs(dx)} al ${dx > 0 ? 'este' : 'oeste'} y ${Math.abs(dy)} al ${dy > 0 ? 'norte' : 'sur'} de A`; }, alto: () => 194, ms: 2000, pie: 'Arrastra el punto hasta donde termina.',
    dib: (v, K, p, f) => calles(K) + (f ? ruta(K, p.a, p.ms, f * p.ms.reduce((s, m) => s + m[1], 0)) : '') + pto(K, p.a, 'A') + (f >= 1 ? K.c(X(v.x), Y(v.y), 8, mueve(p.a, p.ms).join() === [v.x, v.y].join() ? 'fo' : 'ff') : '') + K.t(332, 14, 'N ↑', 's tm', 'end'),
    lee: (v, p) => `$\\text{ancho: } ${R(v.x) - p.a[0]} \\qquad \\text{alto: } ${R(v.y) - p.a[1]}$`, aviso(v, p) { const [x, y] = mueve(p.a, p.ms); return 2 * p.a[0] - x === v.x && y === v.y ? 'Cambiaste este por oeste.' : x === v.x && 2 * p.a[1] - y === v.y ? 'Cambiaste norte por sur.' : x === v.x ? 'A lo ancho está bien; revisa norte contra sur.' : y === v.y ? 'A lo alto está bien; revisa este contra oeste.' : 'Resta los contrarios: este contra oeste y norte contra sur.'; }, bien: () => 'Los contrarios se restan; lo que queda dice dónde termina.',
  });
  // Todas las esquinas a d cuadras de A.
  XG.marca('rombo-cuadras', {
    sitios: p => Array.from({ length: (p.c + 1) * (p.f + 1) }, (_, i) => ({ x: 170 + (i % (p.c + 1) - p.c / 2) * 44, y: 22 + Math.floor(i / (p.c + 1)) * 40, w: 28, h: 28, red: true })), cara: (K, p, i) => (i % (p.c + 1) === p.A[0] && Math.floor(i / (p.c + 1)) === p.A[1] ? K.t(170 + (p.A[0] - p.c / 2) * 44, 27 + p.A[1] * 40, 'A', 'tf') : ''),
    fondo(K, p) { let h = ''; for (let x = 0; x <= p.c; x++) h += K.l(170 + (x - p.c / 2) * 44, 22, 170 + (x - p.c / 2) * 44, 22 + p.f * 40, 'lm'); for (let y = 0; y <= p.f; y++) h += K.l(170 - p.c * 22, 22 + y * 40, 170 + p.c * 22, 22 + y * 40, 'lm'); return h; }, nombre: (p, i) => `columna ${i % (p.c + 1) + 1}, fila ${Math.floor(i / (p.c + 1)) + 1}`,
    alto: p => p.f * 40 + 44, sol: p => Array.from({ length: (p.c + 1) * (p.f + 1) }, (_, i) => i).filter(i => Math.abs(i % (p.c + 1) - p.A[0]) + Math.abs(Math.floor(i / (p.c + 1)) - p.A[1]) === p.d),
    aviso(on, p) { const d = on.map((x, i) => (x ? Math.abs(i % (p.c + 1) - p.A[0]) + Math.abs(Math.floor(i / (p.c + 1)) - p.A[1]) : p.d)); return d.some(x => x !== p.d) ? `Una de esas queda a ${d.find(x => x !== p.d)} ${d.find(x => x !== p.d) === 1 ? 'cuadra' : 'cuadras'}.` : 'Falta alguna: mira también al otro lado de A.'; }, bien: () => 'Forman un rombo: lo que gana a lo ancho lo pierde a lo alto.', texto: p => `son las esquinas que suman ${p.d} cuadras`, pie: 'Toca todas las esquinas que cumplen.',
  });
  // Recorrido a escala: mientras se responde solo se ve la salida y la lista de tramos.
  const cq = (K, p, f) => {
    let [x, y] = [0, 0]; const P = [[0, 0]];
    for (const [d, n] of p.ms) { x += DIR[d][0] * n; y += DIR[d][1] * n; P.push([x, y]); }
    const xs = P.map(q => q[0]), ys = P.map(q => q[1]), mx = Math.min(...xs), my = Math.max(...ys), u = Math.min(13, 88 / Math.max(1, my - Math.min(...ys)), 180 / Math.max(1, Math.max(...xs) - mx)), q = ([a, b]) => [56 + (a - mx) * u, 16 + (my - b) * u], A = q([0, 0]), Z = q([x, y]);
    return K.f(f, K.pl(P.map(q), 'la gr') + K.l(...A, ...Z, 'lg d') + K.c(...Z, 5, 'fG')) + K.c(...A, 5, 'fF') + K.t(A[0] - 10, A[1] + 5, 'A', '', 'end') + p.ms.map(([d, n], i) => K.t(332, 24 + i * 22, `${n} al ${{ N: 'norte', S: 'sur', E: 'este', O: 'oeste' }[d]}`, 's tm', 'end')).join('');
  };
  XG.cuenta('vuelve-corto', 120, cq);
  // Listas de movimientos que terminan en el mismo lugar.
  const fin = ms => mueve([0, 0], ms).join(), dice = ms => ms.map(([d, n]) => `${n}${d}`).join('  ');
  XG.marca('mismo-destino', {
    sitios: p => p.listas.map((_, i) => ({ x: 90 + (i % 2) * 160, y: 74 + Math.floor(i / 2) * 54, w: 150, h: 44 })), cara: (K, p, i) => K.t(90 + (i % 2) * 160, 79 + Math.floor(i / 2) * 54, dice(p.listas[i])), fondo: (K, p) => K.t(170, 20, 'modelo', 's tm') + K.t(170, 42, dice(p.modelo), 'b ta'), alto: p => 50 + Math.ceil(p.listas.length / 2) * 54,
    sol: p => p.listas.map((_, i) => i).filter(i => fin(p.listas[i]) === fin(p.modelo)), aviso: (on, p) => { const i = on.findIndex((x, k) => x && fin(p.listas[k]) !== fin(p.modelo)); return i >= 0 ? `«${dice(p.listas[i])}» termina en otro lado.` : 'Falta otra: resta los movimientos contrarios.'; }, bien: () => 'El orden y las vueltas no cambian dónde se termina.', texto: p => p.listas.filter(l => fin(l) === fin(p.modelo)).map(dice).join('; '), pie: 'Toca todas las que terminan en el mismo lugar.',
  });
  XG.figura('atajo-recto', {
    ini: () => ({ h: 3 }), manijas: p => [{ k: 'h', min: 1, max: 16, paso: 1, en: v => [100 + p.b * 10, 186 - v.h * 10], de: (x, y) => (186 - y) / 10 }], ok: (v, p) => v.h ** 2 + p.b ** 2 === p.c ** 2, sol: p => ({ h: Math.sqrt(p.c ** 2 - p.b ** 2) }), texto: p => `$\\sqrt{${p.c}^2 - ${p.b}^2} = ${Math.sqrt(p.c ** 2 - p.b ** 2)}$`, alto: () => 214, pie: 'Sube el punto B.',
    dib(v, K, p, f) { const A = [100, 186], E = [100 + p.b * 10, 186], B = [E[0], 186 - v.h * 10]; return K.pl([A, E, B], 'la gr') + K.t((A[0] + E[0]) / 2, 204, `${p.b} al este`, 's ta') + K.t(E[0] + 12, (E[1] + B[1]) / 2 + 5, `${N(v.h)} al norte`, 's ta', 'start') + K.c(...A, 5, 'fF') + K.t(A[0] - 12, 190, 'A') + K.f(f, K.l(...A, A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 'lg gr')) + K.t(8, 20, `recta: ${p.c}`, 'tg', 'start'); },
    lee: (v, p) => `$${p.b}^2 + ${R(v.h)}^2 = ${p.b ** 2 + R(v.h) ** 2} \\qquad ${p.c}^2 = ${p.c ** 2}$`, aviso: (v, p) => (v.h === p.c - p.b ? 'Eso es por las calles; la línea recta es la hipotenusa.' : v.h ** 2 + p.b ** 2 > p.c ** 2 ? 'En línea recta quedó más lejos.' : 'En línea recta quedó más cerca.'), bien: () => 'La línea recta es la hipotenusa del triángulo.',
  });
  XG.rotula('regresa-ya', {
    slots: () => [{ x: 104, y: 156, w: 120, h: 38 }, { x: 240, y: 156, w: 120, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' y '), alto: () => 198, fondo: (K, p, f) => cq(K, p, f) + K.t(172, 161, 'y', '') + K.t(104, 192, 'norte o sur', 's tm') + K.t(240, 192, 'este u oeste', 's tm'),
    aviso: (q, p) => (q.flat().some(t => p.mismo.includes(t)) ? 'Eso te aleja: para volver se camina al contrario de lo que quedó.' : 'Resta los contrarios y camina al revés de lo que quedó.'), bien: () => 'Lo que quedó, pero en sentido contrario.',
  });
  // En movimiento: el taxi anda las cuadras que se le den.
  XG.tiros('taxi-cuadras', {
    perilla: () => ({ et: 'Cuadras', min: 0, max: 32, lee: v => `${v} ${v === 1 ? 'cuadra' : 'cuadras'}` }), meta: t => t.r, alto: 124, ms: 1700,
    dib(t, v, K, p, f) { const k = v == null ? 0 : (v === t.r ? 1 : v < t.r ? 0.68 : 1.25) * f, L = [[40, 104], [190, 104], [190, 34], [300, 34]], T = [150, 70, 110]; let d = k * 220, x = 40, y = 104; if (d <= 150) x = 40 + d; else if (d <= 220) { x = 190; y = 104 - (d - 150); } else { x = 190 + (d - 220); y = 34; } return K.pl(L, 'lm') + K.l(190, 34, 190, 12, 'lm') + K.c(190, 34, 9, f >= 1 && v === t.r ? 'fo' : 'fg') + (v == null ? '' : K.t(40, 24, `${v}`, 'b', 'start')) + K.r(x - 12, y - 8, 24, 16, f >= 1 && v !== t.r ? 'ff' : 'fA', 5); },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Se pasó de la esquina.' : 'No llegó a la esquina.'), cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira las cuadras y suelta: el taxi sale.',
  });

  // -------------------------------------------------------------------------------------------- pu-es-2 · vistas y cubos
  // h[fila][columna], fila 0 = adelante.
  const pila = (K, o, u, h, num = 1) => { let s = ''; for (let r = h.length - 1; r >= 0; r--) for (let c = h[0].length - 1; c >= 0; c--) { for (let z = 0; z < h[r][c]; z++) s += K.caja(K.iso(o, u, c, r, z), u, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); if (num && h[r][c]) { const q = K.iso(o, u, c + 0.5, r + 0.5, h[r][c]); s += K.t(q[0], q[1] + 5, h[r][c], 's'); } } return s; };
  // Plano visto desde arriba: la fila de adelante abajo.
  const plano = (K, h, x, y, u) => h.map((fila, r) => fila.map((n, c) => K.r(x + c * u, y + (h.length - 1 - r) * u, u, u, 'fc', 2) + K.t(x + (c + 0.5) * u, y + (h.length - 0.5 - r) * u + 5, n)).join('')).join('') + K.t(x + h[0].length * u / 2, y + h.length * u + 16, 'adelante', 's tm');
  XG.cuenta('torres-suma', 150, (K, p) => pila(K, [150, 138], 24, p.h));
  const vista = { frente: h => h[0].map((_, c) => Math.max(...h.map(f => f[c]))), izquierda: h => [...h].reverse().map(f => Math.max(...f)) };
  // La fila pegada a quien mira desde la izquierda: se ven las filas, la de atrás a la izquierda del dibujo.
  for (const [nombre, cual] of [['vista-frente', 'frente'], ['vista-izquierda', 'izquierda']]) XG.marca(nombre, {
    sitios: p => { const n = vista[cual](p.h).length; return Array.from({ length: n * p.alto }, (_, i) => ({ x: 206 + (i % n) * 42, y: 42 + Math.floor(i / n) * 42, w: 38, h: 38 })); }, cara: () => '', alto: p => 42 + p.alto * 42,
    fondo: (K, p) => plano(K, p.h, 24, 26, 40) + K.t(24, 16, 'desde arriba', 's tm', 'start') + (cual === 'izquierda' ? K.ar(4, 70, 20, 70, 'lg') + K.t(206 + (p.h.length - 1) * 21, 12, 'atrás … adelante', 's tm') : K.t(206 + (p.h[0].length - 1) * 21, 12, 'de frente', 's tm')), nombre: (p, i) => { const n = vista[cual](p.h).length; return `columna ${i % n + 1}, altura ${p.alto - Math.floor(i / n)}`; },
    sol: p => { const v = vista[cual](p.h), n = v.length; return Array.from({ length: n * p.alto }, (_, i) => i).filter(i => p.alto - Math.floor(i / n) <= v[i % n]); },
    aviso(on, p) { const v = vista[cual](p.h), n = v.length, alt = v.map((_, c) => on.filter((x, i) => x && i % n === c).length); return on.some((x, i) => x && i + n < on.length && !on[i + n]) ? 'Ningún cubo flota: debajo de cada cuadro hay otro.' : alt.some((a, c) => a > v[c]) ? 'Una columna quedó más alta que su torre más alta.' : 'Una columna quedó baja: se ve la torre más alta, esté adelante o atrás.'; }, bien: () => 'Cada columna muestra la torre más alta que hay en esa dirección.', texto: p => `alturas ${vista[cual](p.h).join(', ')}`, pie: 'Toca los cuadros que se ven, de abajo hacia arriba.',
  });
  // Plano con la mayor cantidad de cubos para dos vistas.  params { cols, filas }  (filas de atrás hacia adelante)
  const tope = p => p.filas.flatMap(f => p.cols.map(c => String(Math.min(f, c))));
  XG.rotula('plano-maximo', {
    slots: p => p.filas.flatMap((_, r) => p.cols.map((_, c) => ({ x: 150 + c * 66, y: 62 + r * 50, w: 56, h: 40 }))), fichas: p => p.fichas, metas: tope, texto: p => `${p.filas.map((f, r) => p.cols.map(c => Math.min(f, c)).join(' y ')).join('; ')}: ${tope(p).reduce((a, b) => a + +b, 0)} cubos`, alto: p => 62 + p.filas.length * 50,
    fondo: (K, p) => p.cols.map((n, c) => K.t(150 + c * 66, 18, 'de frente', 's tm') + K.t(150 + c * 66, 36, n, 'ta')).join('') + p.filas.map((n, r) => K.t(96, 67 + r * 50, `izquierda: ${n}`, 's tg', 'end')).join('') + K.t(150 + (p.cols.length - 1) * 33, 54 + p.filas.length * 50, 'adelante', 's tm'),
    aviso(q, p) { const n = p.cols.length, v = q.map(l => +l[0]); return v.some((x, i) => x > Math.min(p.filas[Math.floor(i / n)], p.cols[i % n])) ? 'Una torre es más alta de lo que deja ver alguna de las vistas.' : 'Cumple sin pasarse, pero todavía caben más cubos o falta altura en una vista.'; }, bien: () => 'Cada torre sube hasta la menor de las dos alturas que la limitan.',
  });
  XG.cuenta('pintura-lugar', 108, (K, p) => K.caja([170, 102], 5, p.n, p.n, p.n, 'fa'));
  XG.marca('donde-pintura', {
    sitios: p => Array.from({ length: p.n * p.n }, (_, i) => ({ x: 170 + (i % p.n - (p.n - 1) / 2) * 34, y: 22 + Math.floor(i / p.n) * 34, w: 30, h: 30 })), cara: () => '', alto: p => p.n * 34 + 10, nombre: (p, i) => `fila ${Math.floor(i / p.n) + 1}, columna ${i % p.n + 1}`,
    sol: p => Array.from({ length: p.n * p.n }, (_, i) => i).filter(i => { const b = [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length; return b + 1 === p.caras; }),
    aviso(on, p) { const c = on.map((x, i) => (x ? 1 + [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length : p.caras)); const m = c.find(x => x !== p.caras); return m === 3 ? 'Los de la esquina tienen 3 caras pintadas.' : m === 1 ? 'Los de adentro de la cara solo tienen 1 cara pintada.' : 'Faltan: mira las cuatro aristas de la cara.'; }, bien: () => 'Están en las aristas, sin las esquinas.', texto: () => 'los del borde, sin las esquinas', pie: 'Es una cara del cubo, vista de frente. Toca los que cumplen.',
  });
  XG.figura('bloque-adentro', {
    ini: () => ({ c: 2 }), manijas: p => [{ k: 'c', min: 2, max: p.max, paso: 1, et: 'alto del bloque' }], ok: (v, p) => (p.a - 2) * (p.b - 2) * (v.c - 2) === p.sin, sol: p => ({ c: p.sin / ((p.a - 2) * (p.b - 2)) + 2 }), texto: p => `adentro $${p.a - 2} \\cdot ${p.b - 2} \\cdot ${p.sin / ((p.a - 2) * (p.b - 2))} = ${p.sin}$: alto $${p.sin / ((p.a - 2) * (p.b - 2)) + 2}$`, alto: () => 262, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => K.f(1 - f * 0.65, K.caja([170, 186], 13, p.a, p.b, R(v.c), 'fa')) + K.f(f, K.caja(K.iso([170, 186], 13, 1, 1, 1), 13, p.a - 2, p.b - 2, Math.max(0, R(v.c) - 2), 'ff')) + K.t(204, 200, p.a, 'tm', 'start') + K.t(136, 200, p.b, 'tm', 'end'),
    lee: (v, p) => `$${p.a - 2} \\cdot ${p.b - 2} \\cdot ${R(v.c) - 2} = ${(p.a - 2) * (p.b - 2) * (R(v.c) - 2)}$`, aviso: (v, p) => ((p.a - 2) * (p.b - 2) * v.c === p.sin ? 'Ese es el alto de adentro: falta la capa de arriba y la de abajo.' : (p.a - 2) * (p.b - 2) * (v.c - 2) > p.sin ? 'Quedan más cubitos sin pintar.' : 'Quedan menos cubitos sin pintar.'), bien: () => 'La pintura se lleva una capa por cada lado.',
  });
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  XG.ascensor('sube-cubos', 48, 1, neutro);

  // ------------------------------------------------------------------------------------------ pu-es-3 · moldes y dados
  // Dobla un molde: por cada celda, hacia dónde mira (y los ejes de su cara). null si dos caras caen en el mismo sitio.
  const neg = a => a.map(x => -x || 0);
  function dobla(cel) {
    const en = new Map(cel.map((c, i) => [c.join(), i])), out = Array(cel.length).fill(null);
    out[0] = { n: [0, 0, 1], r: [1, 0, 0], d: [0, -1, 0] };
    const q = [0];
    while (q.length) { const i = q.shift(), [c, f] = cel[i], { n, r, d } = out[i]; for (const [dx, dy, o] of [[1, 0, { n: r, r: neg(n), d }], [-1, 0, { n: neg(r), r: n, d }], [0, 1, { n: d, r, d: neg(n) }], [0, -1, { n: neg(d), r, d: n }]]) { const j = en.get([c + dx, f + dy].join()); if (j != null && !out[j]) { out[j] = o; q.push(j); } } }
    if (out.some(x => !x) || new Set(out.map(x => x.n.join())).size !== cel.length) return null;
    return out.map(x => x.n);
  }
  const opuesta = (cel, i) => { const n = dobla(cel); return n.findIndex(x => x.join() === neg(n[i]).join()); };
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const ladoDe = cel => [Math.max(...cel.map(c => c[0])) + 1, Math.max(...cel.map(c => c[1])) + 1];
  const molde = (K, cel, x, y, u, letras, on = []) => cel.map(([c, f], i) => K.r(x + c * u, y + f * u, u, u, on.includes(i) ? 'fa' : 'fc', 2) + (letras ? K.t(x + (c + 0.5) * u, y + (f + 0.5) * u + 6, letras[i], 'b') : '')).join('');
  const centro = (cel, u, cx) => cx - ladoDe(cel)[0] * u / 2;
  XG.rotula('opuestas-molde', {
    slots: p => p.pide.map((_, i) => ({ x: 66 + i * 104, y: 186, w: 70, h: 38 })), fichas: p => p.fichas, metas: p => p.pide.map(l => p.letras[opuesta(p.cel, p.letras.indexOf(l))]), texto: p => p.pide.map(l => `${l} con ${p.letras[opuesta(p.cel, p.letras.indexOf(l))]}`).join(', '), alto: () => 226,
    fondo: (K, p) => molde(K, p.cel, centro(p.cel, 38, 170), 8, 38, p.letras) + p.pide.map((l, i) => K.t(66 + i * 104, 222, `opuesta de ${l}`, 's tm')).join(''), aviso: (q, p) => (p.pide.some((l, i) => q[i][0] === l) ? 'Una cara no es opuesta de sí misma.' : p.pide.some((l, i) => { const a = p.cel[p.letras.indexOf(l)], b = p.cel[p.letras.indexOf(q[i][0])]; return b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1; }) ? 'Dos caras que se tocan en el molde nunca son opuestas.' : 'En una fila recta, la opuesta está saltando una.'), bien: () => 'Saltando una en la fila; las dos que sobran son las tapas.',
  });
  XG.marca('cierra-cubo', {
    sitios: p => p.moldes.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 60 + Math.floor(i / 3) * 112, w: 102, h: 106 })), cara: (K, p, i) => { const m = p.moldes[i], u = 19, [w, h] = ladoDe(m); return molde(K, m, 62 + (i % 3) * 108 - w * u / 2, 60 + Math.floor(i / 3) * 112 - h * u / 2, u); }, alto: p => Math.ceil(p.moldes.length / 3) * 112 + 6, nombre: (p, i) => `molde ${i + 1}`,
    sol: p => p.moldes.map((_, i) => i).filter(i => dobla(p.moldes[i])), aviso: (on, p) => (on.some((x, i) => x && !dobla(p.moldes[i])) ? 'En uno de esos dos caras caen en el mismo sitio y otro queda abierto.' : 'Falta uno que sí cierra.'), bien: () => 'Seis caras que caen en seis sitios distintos.', texto: p => `los moldes ${p.moldes.map((m, i) => (dobla(m) ? i + 1 : 0)).filter(Boolean).join(', ')}`, pie: 'Dobla cada uno en la mente. Toca todos los que cierran.',
  });
  XG.marca('vecinas-cara', {
    sitios: p => p.cel.map(([c, f]) => ({ x: centro(p.cel, 52, 170) + (c + 0.5) * 52, y: 12 + (f + 0.5) * 52, w: 46, h: 46 })), cara: (K, p, i) => K.t(centro(p.cel, 52, 170) + (p.cel[i][0] + 0.5) * 52, 19 + (p.cel[i][1] + 0.5) * 52, p.letras[i], p.letras[i] === p.de ? 'b tf' : 'b'), alto: p => ladoDe(p.cel)[1] * 52 + 24,
    sol: p => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return p.cel.map((_, k) => k).filter(k => k !== i && k !== o); }, aviso: (on, p) => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return on[o] ? `${p.letras[o]} queda frente a ${p.de}: no se tocan.` : on[i] ? `${p.de} es la misma cara.` : 'Falta alguna: una cara toca a las otras cuatro, menos a su opuesta.'; }, bien: () => 'Una cara toca a cuatro; a su opuesta, no.', texto: p => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return [...p.letras].filter((_, k) => k !== i && k !== o).join(', '); }, pie: 'Toca todas las caras que la tocan en el cubo armado.',
  });
  const dado = (K, cx, cy, u, a, f, d, s = 'b') => { const A = [[cx - u, cy - u * 0.5], [cx, cy - u], [cx + u, cy - u * 0.5], [cx, cy]], F = [[cx - u, cy - u * 0.5], [cx, cy], [cx, cy + u * 1.1], [cx - u, cy + u * 0.6]], D = [[cx, cy], [cx + u, cy - u * 0.5], [cx + u, cy + u * 0.6], [cx, cy + u * 1.1]]; return K.p(A, 'fa') + K.p(F, 'fc') + K.p(D, 'fg') + K.t(cx, cy - u * 0.5 + 6, a, s) + K.t(cx - u / 2, cy + u * 0.36, f, s) + K.t(cx + u / 2, cy + u * 0.36, d, s); };
  const rosa = (K, cx, cy, u) => K.t(cx, cy - u - 7, 'arriba', 's tm') + K.t(cx - u - 6, cy + u * 0.3, 'frente', 's tm', 'end') + K.t(cx + u + 6, cy + u * 0.3, 'derecha', 's tm', 'start');
  XG.cuenta('dado-escondidas', 128, (K, p) => dado(K, 170, 66, 46, ...p.ve) + rosa(K, 170, 66, 46));
  XG.cuenta('vuelca-dado', 128, (K, p) => dado(K, 130, 66, 46, ...p.ve) + rosa(K, 130, 66, 46) + K.ar(98, 106, 66, 122, 'la gr') + K.t(58, 127, p.hacia, 's ta', 'end'));
  XG.cuenta('rueda-dado', 128, (K, p) => dado(K, 66, 66, 42, ...p.ve) + K.ar(124, 104, 300, 104, 'la gr') + K.t(212, 94, 'rueda a la derecha', 's ta') + K.t(66, 14, 'arriba', 's tm'));
  XG.marca('dados-imposibles', {
    sitios: p => p.dados.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 172 + Math.floor(i / 3) * 92, w: 100, h: 86 })), cara: (K, p, i) => dado(K, 62 + (i % 3) * 108, 170 + Math.floor(i / 3) * 92, 30, ...p.dados[i], ''), fondo: (K, p) => molde(K, p.cel, centro(p.cel, 36, 170), 8, 36, p.letras), alto: p => 130 + Math.ceil(p.dados.length / 3) * 92, nombre: (p, i) => `arriba ${p.dados[i][0]}, frente ${p.dados[i][1]}, derecha ${p.dados[i][2]}`,
    sol: p => p.dados.map((_, i) => i).filter(i => p.dados[i].some((a, k) => p.dados[i].some((b, m) => k !== m && opuesta(p.cel, p.letras.indexOf(a)) === p.letras.indexOf(b)))), aviso(on, p) { const mal = i => p.dados[i].some((a, k) => p.dados[i].some((b, m) => k !== m && opuesta(p.cel, p.letras.indexOf(a)) === p.letras.indexOf(b))); return on.some((x, i) => x && !mal(i)) ? 'Uno de esos no muestra ninguna pareja de opuestas.' : 'Falta uno que muestra juntas dos caras opuestas.'; }, bien: () => 'Dos caras opuestas nunca se ven a la vez.', texto: () => 'los que muestran juntas dos caras opuestas', pie: 'Toca todos los imposibles.',
  });
  XG.ascensor('sube-dado', 48, 1, neutro);
  // Para las pruebas.
  XG.espacial = { dobla, opuesta, posible(cel, letras, [a, f, d]) { const n = dobla(cel), v = l => n[letras.indexOf(l)]; return cruz(v(d), v(a)).join() === v(f).join(); } };

  // ------------------------------------------------------------------------------------- pu-es-4 · giros, espejos, dobleces
  // Media cuadrícula dada; se pinta su reflejo al otro lado del espejo vertical.
  XG.marca('espejo-vertical', {
    sitios: p => Array.from({ length: p.f * p.c }, (_, i) => ({ x: 178 + (i % p.c + 0.5) * 36, y: 14 + (Math.floor(i / p.c) + 0.5) * 36, w: 32, h: 32 })), cara: () => '', alto: p => p.f * 36 + 24, nombre: (p, i) => `fila ${Math.floor(i / p.c) + 1}, a ${i % p.c + 1} del espejo`,
    fondo: (K, p) => Array.from({ length: p.f * p.c }, (_, i) => K.r(162 - (p.c - i % p.c) * 36, 14 + Math.floor(i / p.c) * 36 + 2, 32, 32, p.dada.includes(i) ? 'fa' : 'fc', 5)).join('') + K.l(168, 4, 168, p.f * 36 + 20, 'lg gr'), sol: p => p.dada.map(i => Math.floor(i / p.c) * p.c + p.c - 1 - i % p.c),
    aviso(on, p) { const s = p.dada.map(i => Math.floor(i / p.c) * p.c + p.c - 1 - i % p.c); return on.every((x, i) => x === p.dada.includes(i)) ? 'Copiaste la figura igual: el espejo la voltea.' : on.some((x, i) => x && !s.includes(i)) ? 'Un cuadro no está a la misma distancia del espejo.' : 'Falta algún cuadro.'; }, bien: () => 'Mismo renglón y misma distancia, del otro lado.', texto: () => 'lo que está cerca del espejo se refleja cerca', pie: 'Toca los cuadros del reflejo.',
  });
  XG.marca('letras-espejo', {
    sitios: p => p.letras.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 36 + Math.floor(i / 4) * 66, w: 70, h: 58 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 44 + Math.floor(i / 4) * 66, p.letras[i], 'B'), alto: p => Math.ceil(p.letras.length / 4) * 66 + 6, sol: p => p.letras.map((_, i) => i).filter(i => p.igual.includes(p.letras[i])),
    aviso: (on, p) => { const i = on.findIndex((x, k) => x && !p.igual.includes(p.letras[k])); return i >= 0 ? `La ${p.letras[i]} se ve volteada: su izquierda y su derecha son distintas.` : 'Falta otra cuya mitad izquierda es igual a la derecha.'; }, bien: () => 'Su mitad izquierda y su mitad derecha son iguales.', texto: p => p.letras.filter(l => p.igual.includes(l)).join(', '), pie: 'Toca todas las que se ven iguales.',
  });
  const ELE = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]];
  const pinta = (K, cel, cx, cy, u, g, cls, voltea) => { const a = g * Math.PI / 180, xs = cel.map(c => c[0]), ys = cel.map(c => c[1]), mx = (Math.max(...xs) + 1) / 2, my = (Math.max(...ys) + 1) / 2; return cel.map(([c, r]) => K.p([[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]].map(([x, y]) => { let X0 = (x - mx) * u * 0.96, Y0 = (y - my) * u * 0.96; if (voltea) X0 = -X0; return [cx + X0 * Math.cos(a) - Y0 * Math.sin(a), cy + X0 * Math.sin(a) + Y0 * Math.cos(a)]; }), cls)).join(''); };
  XG.figura('gira-ele', {
    ini: () => ({ g: 0 }), manijas: () => [{ k: 'g', min: 0, max: 270, paso: 90, r: 11, en: v => [170 + 88 * Math.sin(v.g * Math.PI / 180), 104 - 88 * Math.cos(v.g * Math.PI / 180)], de: (x, y) => (Math.atan2(x - 170, 104 - y) * 180 / Math.PI + 405) % 360 - 45 }], ok: (v, p) => v.g === ((p.g % 360) + 360) % 360, sol: p => ({ g: ((p.g % 360) + 360) % 360 }), texto: p => `queda igual que con $${((p.g % 360) + 360) % 360}^\\circ$ en el sentido del reloj`, alto: () => 210, pie: 'Arrastra el punto alrededor de la figura.',
    dib: (v, K, p, f) => K.c(170, 104, 88, 'fn d') + pinta(K, ELE, 170, 104, 32, 0, 'fc') + pinta(K, ELE, 170, 104, 32, v.g, 'fa') + K.f(f, K.l(170, 104, 170, 16, 'lm d')) + K.l(170, 104, 170 + 88 * Math.sin(v.g * Math.PI / 180), 104 - 88 * Math.cos(v.g * Math.PI / 180), 'la'),
    lee: v => `$${R(v.g)}^\\circ \\text{ en el sentido del reloj}$`, aviso: (v, p) => (v.g === ((-p.g % 360) + 360) % 360 && v.g ? 'La giraste para el otro lado.' : 'Quita las vueltas completas y mira hacia qué lado sobra.'), bien: () => 'Las vueltas completas no cambian nada.',
  });
  XG.marca('giro-o-espejo', {
    sitios: p => p.figs.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 152 + Math.floor(i / 3) * 96, w: 98, h: 88 })), cara: (K, p, i) => pinta(K, p.cel, 62 + (i % 3) * 108, 152 + Math.floor(i / 3) * 96, 19, p.figs[i][0], 'fg', p.figs[i][1]), fondo: (K, p) => K.t(170, 14, 'modelo', 's tm') + pinta(K, p.cel, 170, 62, 24, 0, 'fa'), alto: p => 106 + Math.ceil(p.figs.length / 3) * 96, nombre: (p, i) => `figura ${i + 1}`,
    sol: p => p.figs.map((_, i) => i).filter(i => !p.figs[i][1]), aviso: (on, p) => (on.some((x, i) => x && p.figs[i][1]) ? 'Una de esas está volteada: ningún giro la deja así.' : 'Falta una que sale de girar el modelo.'), bien: () => 'Girar da vueltas; las otras están en espejo.', texto: p => `las figuras ${p.figs.map((x, i) => (x[1] ? 0 : i + 1)).filter(Boolean).join(', ')}`, pie: 'Toca todas las que salen solo de girar.',
  });
  const reloj = (K, cx, cy, r, h, cls) => { let s = K.c(cx, cy, r, 'fc'); for (let i = 0; i < 12; i++) s += K.l(...K.at(cx, cy, r - 6, 90 - i * 30), ...K.at(cx, cy, r, 90 - i * 30), 'lm'); return s + K.l(cx, cy, ...K.at(cx, cy, r - 12, 90), 'lm') + K.l(cx, cy, ...K.at(cx, cy, r * 0.58, 90 - h * 30), `${cls} gr`) + K.c(cx, cy, 3, 'fk'); };
  XG.figura('hora-espejo', {
    ini: () => ({ h: 0 }), manijas: () => [{ k: 'h', min: 0, max: 11, paso: 1, r: 10, en: v => XPK.at(248, 96, 40, 90 - v.h * 30), de: (x, y) => R(((90 - Math.atan2(96 - y, x - 248) * 180 / Math.PI + 360) % 360) / 30) % 12 }], ok: (v, p) => (v.h + p.h) % 12 === 0, sol: p => ({ h: 12 - p.h }), texto: p => `$12 - ${p.h} = ${12 - p.h}$: son las ${12 - p.h}`, alto: () => 196, pie: 'Arrastra la aguja corta del reloj real.',
    dib: (v, K, p, f) => reloj(K, 92, 96, 66, p.h, 'lg') + reloj(K, 248, 96, 66, v.h, 'la') + K.l(170, 20, 170, 172, 'lm d') + K.t(92, 186, 'en el espejo', 's tg') + K.t(248, 186, 'real', 's ta') + K.f(f, K.l(...K.at(92, 96, 38, 90 - p.h * 30), ...K.at(248, 96, 38, 90 + p.h * 30), 'lo d')),
    lee: v => `$${R(v.h) || 12}\\!:\\!00$`, aviso: (v, p) => (v.h === p.h ? 'Esa es la que se ve en el espejo.' : (v.h + p.h) % 12 === 6 ? 'La volteaste de arriba abajo; el espejo cambia izquierda por derecha.' : 'La aguja real está igual de lejos del 12, al otro lado.'), bien: () => 'Igual de lejos del 12, al otro lado.',
  });
  XG.cuenta('dobla-y-cuenta', 96, (K, p) => { const c = 2 ** Math.ceil(p.d / 2), f = 2 ** Math.floor(p.d / 2), S = 84; return K.r(44, 6, S, S, 'fn d', 2) + K.r(44, 6, S / c, S / f, 'fa', 2) + K.t(150, 40, `${p.d} dobleces`, 'ta', 'start') + K.t(150, 64, `${p.np} perforaciones`, 'tf', 'start'); });
  XG.marca('papel-abierto', {
    sitios: () => Array.from({ length: 16 }, (_, i) => ({ x: 190 + (i % 4 + 0.5) * 36, y: 30 + (Math.floor(i / 4) + 0.5) * 36, w: 32, h: 32 })), cara: (K, p, i, on) => (on ? K.c(190 + (i % 4 + 0.5) * 36, 30 + (Math.floor(i / 4) + 0.5) * 36, 7, 'fF') : ''), alto: () => 184, nombre: (p, i) => `fila ${Math.floor(i / 4) + 1}, columna ${i % 4 + 1}`,
    fondo: (K, p) => K.t(92, 18, 'doblada dos veces', 's tm') + K.r(20, 30, 144, 144, 'fn d', 2) + K.r(20, 30, 72, 72, 'fa', 2) + K.l(92, 30, 92, 102, 'lg gr') + K.l(20, 102, 92, 102, 'lg gr') + K.c(20 + (p.c + 0.5) * 36, 30 + (p.f + 0.5) * 36, 7, 'fF') + K.t(262, 18, 'abierta', 's tm'),
    sol: p => [p.f, 3 - p.f].flatMap(f => [p.c, 3 - p.c].map(c => f * 4 + c)).sort((a, b) => a - b), aviso(on, p) { const s = [p.f, 3 - p.f].flatMap(f => [p.c, 3 - p.c].map(c => f * 4 + c)); return on.filter(Boolean).length < 4 && on.every((x, i) => !x || s.includes(i)) ? 'Son cuatro capas: faltan huecos.' : 'Los huecos quedan en espejo a cada lado de cada doblez.'; }, bien: () => 'Cada doblez refleja el hueco al otro lado.', texto: () => 'cuatro huecos, en espejo a cada lado de los dobleces', pie: 'Toca dónde quedan los huecos al abrirla.',
  });
  XG.ascensor('sube-dobleces', 40, 1, neutro);
})();
