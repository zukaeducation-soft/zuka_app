// Geometría Euclidiana · mundo 4 «Paralelas y Cuadriláteros» (spec 2026-11-26-curso-euclidiana): juegos con escena de
// perpendiculares y paralelas, ángulos entre paralelas, paralelogramos y trapecios, y rectas y puntos notables.
// Armazones en figura-kit.js, conteo-escena.js (XG.cuenta) y proposiciones-escena.js (XG.frases, XG.renglones).
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round, gr = n => `${R(n)}°`;
  const num = x => `${R(x * 10) / 10}`, tx = x => (Math.abs(x - R(x)) < 1e-9 ? `= ${R(x)}` : `\\approx ${num(x)}`);
  const at = (x, y, r, g) => [x + r * Math.cos(rad(g)), y - r * Math.sin(rad(g))];
  const mid = (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], hip = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  // Cuadrícula de 12 × 8 (24 px por cuadro, y hacia arriba).
  const U = 24, GP = (x, y) => [26 + x * U, 212 - y * U], PG = (x, y) => [(x - 26) / U, (212 - y) / U];
  const red = K => { let h = ''; for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 8), 'ls'); for (let j = 0; j <= 8; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls'); return h; };
  const libre = { k: ['x', 'y'], min: [0, 0], max: [12, 8], paso: 1, r: 10, en: v => GP(v.x, v.y), de: (x, y) => PG(x, y) };
  // Recta por Q con dirección d, recortada a la cuadrícula.
  const recta = (K, Q, d, cls) => {
    if (!d[0] && !d[1]) return '';
    let a = -1e9, b = 1e9;
    [[Q[0], d[0], 12], [Q[1], d[1], 8]].forEach(([q, k, m]) => { if (k) { const t1 = -q / k, t2 = (m - q) / k; a = Math.max(a, Math.min(t1, t2)); b = Math.min(b, Math.max(t1, t2)); } });
    return a < b ? K.l(...GP(Q[0] + a * d[0], Q[1] + a * d[1]), ...GP(Q[0] + b * d[0], Q[1] + b * d[1]), cls) : '';
  };
  // Marca de ángulo recto en V, entre los rayos a P y a Q (en píxeles).
  const escuadra = (K, V, P, Q, s = 9) => {
    const a = hip(V, P), b = hip(V, Q); if (a < 1 || b < 1) return '';
    const u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s];
    return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm');
  };
  const pend = d => { let [x, y] = d; if (x < 0 || (!x && y < 0)) { x = -x; y = -y; } const g = mcd(x, y) || 1; return !x ? 'es vertical' : !y ? 'es horizontal' : `${y > 0 ? 'sube' : 'baja'} ${Math.abs(y) / g} por cada ${x / g}`; };
  const rot = (K, P, t, dx = 10, dy = -8) => K.t(P[0] + dx, P[1] + dy, t, 's');

  // ============================================================================================ 1 · paralelas y perpendiculares
  // El pie del segmento que baja de P a la recta r: el más corto cae a escuadra.  params { o, d, n, P, t0 }  v { t }
  const L = (p, t) => [p.o[0] + t * p.d[0], p.o[1] + t * p.d[1]];
  const pieT = p => ((p.P[0] - p.o[0]) * p.d[0] + (p.P[1] - p.o[1]) * p.d[1]) / (p.d[0] ** 2 + p.d[1] ** 2);
  const largo = (p, t) => hip(p.P, L(p, t));
  XG.figura('pie-perpendicular', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: 0, max: p.n, paso: 1, en: v => GP(...L(p, v.t)), de(x, y) { const [a, b] = PG(x, y); return ((a - p.o[0]) * p.d[0] + (b - p.o[1]) * p.d[1]) / (p.d[0] ** 2 + p.d[1] ** 2); } }],
    ok: (v, p) => Math.abs(v.t - pieT(p)) < 1e-9,
    sol: p => ({ t: R(pieT(p)) }),
    texto: p => `el pie de la perpendicular: la distancia de P a r es $PF ${tx(largo(p, pieT(p)))}$`,
    alto: () => 232, pie: 'Arrastra el pie F por la recta.',
    dib(v, K, p, f) {
      const T = pieT(p), P = GP(...p.P), F = GP(...L(p, v.t)), B = GP(...L(p, T)), fin = GP(...L(p, p.n)), m = mid(P, F);
      let h = red(K) + K.l(...GP(...L(p, 0)), ...fin, 'gr') + K.t(fin[0] - 6, fin[1] - 10, 'r', 'tm');
      if (f) h += K.f(f, (Math.abs(v.t - T) > 0.01 ? K.l(...P, ...B, 'lo d') : '') + escuadra(K, B, P, GP(...L(p, T + (T < p.n ? 1 : -1)))))
        + K.f(f * 2 - 1, K.t(m[0] + 10, m[1] + 4, num(largo(p, v.t)), 's ta', 'start') + (Math.abs(v.t - T) > 0.01 ? K.t(...mid(P, B).map((z, i) => z + (i ? 4 : -10)), num(largo(p, T)), 's to', 'end') : ''));
      return h + K.l(...P, ...F, 'la gr') + K.c(...P, 5, 'fk') + rot(K, P, 'P') + rot(K, F, 'F', 8, 18);
    },
    lee: (v, p) => `$PF ${tx(largo(p, R(v.t)))}$`,
    aviso: (v, p) => `Ese segmento mide ${num(largo(p, v.t))}; el que cae a escuadra mide ${num(largo(p, pieT(p)))}: es el más corto.`,
    bien: (v, p) => `Cae a escuadra sobre r: mide ${num(largo(p, v.t))}, y cualquier otro segmento desde P es más largo.`,
  });

  // Por P, la paralela a r (o la perpendicular a t): se arrastra un segundo punto D.  params { A, B, P, Q?, ini }  v { x, y }
  const traza = (name, perp) => {
    const dir = p => [p.B[0] - p.A[0], p.B[1] - p.A[1]], va = (v, p) => [v.x - p.P[0], v.y - p.P[1]];
    const vale = (v, p) => { const d = dir(p), e = va(v, p); return !!(e[0] || e[1]) && (perp ? d[0] * e[0] + d[1] * e[1] : d[0] * e[1] - d[1] * e[0]) === 0; };
    const busca = p => { let m = null; for (let x = 0; x <= 12; x++) for (let y = 0; y <= 8; y++) { const v = { x, y }; if (vale(v, p) && !(x === p.ini[0] && y === p.ini[1]) && (!m || hip([x, y], p.P) <= hip([m.x, m.y], p.P) + 1e-9)) m = v; } return m; };
    const ang = (v, p) => { const d = dir(p), e = va(v, p); return R(Math.acos(Math.min(1, Math.abs(d[0] * e[0] + d[1] * e[1]) / (Math.hypot(...d) * Math.hypot(...e)))) * 180 / Math.PI); };
    XG.figura(name, {
      ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre], ok: vale, sol: busca,
      texto: p => (perp ? `la perpendicular a t por P ${pend([-dir(p)[1], dir(p)[0]])}` : `la paralela por P ${pend(dir(p))}, igual que r`),
      alto: () => 232, pie: 'Arrastra el punto D por la cuadrícula.',
      dib(v, K, p, f) {
        const d = dir(p), e = va(v, p), A = GP(...p.A), B = GP(...p.B), P = GP(...p.P), D = GP(v.x, v.y), cero = !e[0] && !e[1];
        let h = red(K) + recta(K, p.A, d, 'gr') + K.c(...A, 3.5, 'fk') + K.c(...B, 3.5, 'fk') + K.t(B[0] + 14, B[1] + 16, perp ? 't' : 'r', 'tm');
        if (perp && p.Q) h += recta(K, p.Q, [-d[1], d[0]], 'lg gr') + escuadra(K, GP(...p.Q), GP(p.Q[0] + d[0], p.Q[1] + d[1]), GP(p.Q[0] - d[1], p.Q[1] + d[0])) + K.t(GP(...p.Q)[0] - 12, GP(...p.Q)[1] - 30, 'r', 'tg');
        h += recta(K, p.P, e, 'la gr');
        if (f && !cero) h += perp
          ? K.f(f, (vale(v, p) ? escuadra(K, P, D, GP(p.P[0] + d[0], p.P[1] + d[1])) : '') + K.t(170, 14, `ángulo con t: ${ang(v, p)}°`, vale(v, p) ? 's to' : 's tf'))
          : K.f(f, K.pl([A, [B[0], A[1]], B], 'lg d') + K.pl([P, [D[0], P[1]], D], 'lf d') + K.t(170, 14, `r ${pend(d)} · la tuya ${pend(e)}`, vale(v, p) ? 's to' : 's tf'));
        return h + K.c(...P, 5, 'fk') + rot(K, P, 'P', -10);
      },
      aviso: (v, p) => (!va(v, p)[0] && !va(v, p)[1] ? 'Aleja el punto de P: con dos puntos queda trazada la recta.'
        : perp ? `Forma ${ang(v, p)}° con t, no 90°. Un cuarto de vuelta cambia el paso (a, b) por (−b, a).` : `Tu recta ${pend(va(v, p))} y r ${pend(dir(p))}: con otra inclinación, se cortan.`),
      bien: (v, p) => (!perp ? 'Misma inclinación: nunca se cortan. Por P no pasa ninguna otra paralela a r.' : p.Q ? 'Las dos son perpendiculares a t: por eso son paralelas entre sí.' : 'Cae a escuadra sobre t: por P solo pasa esa perpendicular.'),
    });
  };
  traza('traza-paralela', false); traza('traza-perpendicular', true);

  XG.frases('paralelas-seguro');
  XG.renglones('cuantas-rectas', { w: 100, x: 284 });
  // Se dan relaciones entre rectas y se deducen otras; al comprobar aparece el dibujo.  params { da, lin: [[x1, y1, x2, y2, nombre, cls?]], esc?: [[x, y]], et, metas… }
  XG.cuenta('relacion-rectas', 132, (K, p, f = 0) => K.f(1 - f, K.t(170, 20, 'Se sabe que:', 's tm') + p.da.map((t, i) => K.t(170, 46 + i * 24, t, 'b')).join(''))
    + K.f(f, p.lin.map(([a, b, c, d, n, cls]) => K.l(a, b, c, d, cls || 'gr') + K.t(c + (c > a ? 8 : 0), d + (d < b ? -4 : 14), n, 's ta')).join('') + (p.esc || []).map(([x, y]) => K.pl([[x + 8, y], [x + 8, y - 8], [x, y - 8]], 'lm')).join('')));

  // ============================================================================================ 2 · ángulos entre paralelas
  // Ocho ángulos numerados: 1-4 en el cruce de arriba y 5-8 en el de abajo (izquierda-derecha, arriba-abajo).
  const NP = { P: [104, 60], Q: [72, 128] };
  const tipoPar = (a, b) => {
    if (a > b) [a, b] = [b, a];
    const arr = n => n <= 4, izq = n => n % 2 === 1, int = n => [3, 4, 5, 6].includes(n);
    if (arr(a) === arr(b)) return a + b === (arr(a) ? 5 : 13) ? 'op. por el vértice' : 'adyacentes';
    if (b - a === 4) return 'correspondientes';
    if (int(a) && int(b)) return izq(a) === izq(b) ? 'colaterales' : 'alternos internos';
    if (!int(a) && !int(b)) return izq(a) === izq(b) ? 'colaterales ext.' : 'alternos externos';
    return 'ninguno';
  };
  const PISTA = { 'alternos internos': 'entre las paralelas y a lados distintos de la transversal: forman una Z.', correspondientes: 'en la misma esquina de cada cruce: forman una F.',
    'alternos externos': 'fuera de las paralelas y a lados distintos de la transversal.', colaterales: 'entre las paralelas y del mismo lado de la transversal: forman una C.', 'op. por el vértice': 'en el mismo cruce, uno frente al otro.' };
  XG.rotula('nombra-pares', {
    slots: p => p.pares.map((_, i) => ({ x: 252, y: 44 + i * 46, w: 164, h: 30 })), fichas: p => p.fichas, metas: p => p.pares.map(([a, b]) => tipoPar(a, b)),
    texto: p => p.pares.map(([a, b]) => `${a} y ${b}: ${tipoPar(a, b)}`).join('; '), alto: p => 22 + p.pares.length * 46,
    fondo(K, p) {
      const { P, Q } = NP, o = [[-24, -10], [22, -10], [-30, 22], [14, 22]], dx = (P[0] - Q[0]) / (Q[1] - P[1]);
      return K.l(8, P[1], 162, P[1]) + K.l(8, Q[1], 162, Q[1]) + K.l(P[0] + dx * 44, P[1] - 44, Q[0] - dx * 44, Q[1] + 44, 'la gr')
        + [P, Q].map((X, k) => o.map(([a, b], i) => K.t(X[0] + a, X[1] + b, k * 4 + i + 1, 's ta')).join('')).join('')
        + p.pares.map(([a, b], i) => K.t(252, 23 + i * 46, `∠${a} y ∠${b}`, 's tm')).join('');
    },
    aviso(q, p) { const i = p.pares.findIndex(([a, b], k) => q[k][0] !== tipoPar(a, b)), [a, b] = p.pares[i]; return `∠${a} y ∠${b} están ${PISTA[tipoPar(a, b)]}`; },
    bien: () => 'Cada pareja se nombra por su lugar: adentro o afuera, del mismo lado o a lados distintos.',
  });

  // Recíprocos: se gira la recta de abajo hasta que el par de ángulos obligue a que sean paralelas.  params { t, modo, rot?, b0 }  v { b }
  const epG = p => { const r = p.rot || 0, C = [165, 112]; return { r, P: at(...C, 48, p.t + r), Q: at(...C, -48, p.t + r) }; };
  const EPN = { alt: 'alternos internos', corr: 'correspondientes', col: 'colaterales' };
  XG.figura('endereza-paralela', {
    ini: p => ({ b: p.b0 }),
    manijas: p => { const { r, Q } = epG(p); return [{ k: 'b', min: -25, max: 25, paso: 5, en: v => at(...Q, 120, r + v.b), de: (x, y) => Math.atan2(Q[1] - y, x - Q[0]) * 180 / Math.PI - r }]; },
    ok: v => v.b === 0, sol: () => ({ b: 0 }),
    texto: p => (p.modo === 'col' ? `colaterales suplementarios: $${180 - p.t}^\\circ + ${p.t}^\\circ = 180^\\circ$` : `${EPN[p.modo]} congruentes: los dos miden $${p.t}^\\circ$`),
    alto: () => 236, pie: 'Arrastra la punta de la recta de abajo.',
    dib(v, K, p, f) {
      const { r, P, Q } = epG(p), T = p.t, e1 = g => at(...P, 125, r + g), e2 = g => at(...Q, 125, r + v.b + g), up = at(...P, 40, T + r), dn = at(...Q, -40, T + r);
      const arriba = p.modo === 'alt' ? K.ang(P, e1(180), Q, 24, gr(T), 'fa', 'ta') : p.modo === 'corr' ? K.ang(P, e1(0), up, 24, gr(T), 'fa', 'ta') : K.ang(P, e1(0), Q, 24, gr(180 - T), 'fa', 'ta');
      return arriba + K.ang(Q, e2(0), P, 24, gr(T - v.b), 'fg', 'tg') + K.l(...e1(180), ...e1(0)) + K.l(...e2(180), ...e2(0), 'la gr') + K.l(...up, ...dn)
        + K.t(e1(180)[0] + 8, e1(180)[1] - 8, 'ℓ₁', 's tm') + K.t(e2(180)[0] + 8, e2(180)[1] + 18, 'ℓ₂', 's tm')
        + K.f(f, K.t(170, 16, Math.abs(v.b) < 0.5 ? 'ℓ₁ ∥ ℓ₂' : `se cortan a la ${v.b > 0 ? 'derecha' : 'izquierda'}`, Math.abs(v.b) < 0.5 ? 'to' : 'tf'));
    },
    lee: (v, p) => (p.modo === 'col' ? `$${180 - p.t}^\\circ + ${R(p.t - v.b)}^\\circ = ${R(180 - v.b)}^\\circ$` : `$${p.t}^\\circ$ y $${R(p.t - v.b)}^\\circ$`),
    aviso: (v, p) => (p.modo === 'col' && p.t - v.b === 180 - p.t ? 'Los colaterales no tienen que ser congruentes: deben ser suplementarios.'
      : p.modo === 'col' ? `Los colaterales suman ${180 - v.b}°, no 180°: las rectas se cortan a la ${v.b > 0 ? 'derecha' : 'izquierda'}.` : `Los ${EPN[p.modo]} miden ${p.t}° y ${p.t - v.b}°: no son congruentes y las rectas se cortan.`),
    bien: (v, p) => (p.modo === 'col' ? 'Colaterales suplementarios: las rectas son paralelas.' : `Los ${EPN[p.modo]} son congruentes: las rectas son paralelas.`),
  });

  // ============================================================================================ 3 · paralelogramos y trapecios
  // Paralelogramo ABCD con la base AB fija: se arrastra C (D lo sigue) hasta que sea rombo, rectángulo o cuadrado.  params { A, B, ini, tipo }
  const pe = (v, p) => { const ab = [p.B[0] - p.A[0], p.B[1] - p.A[1]], bc = [v.x - p.B[0], v.y - p.B[1]]; return { ab, bc, D: [v.x - ab[0], v.y - ab[1]], cr: ab[0] * bc[1] - ab[1] * bc[0], dot: ab[0] * bc[0] + ab[1] * bc[1], l1: ab[0] ** 2 + ab[1] ** 2, l2: bc[0] ** 2 + bc[1] ** 2 }; };
  const peOk = (v, p) => { const g = pe(v, p); return !!g.cr && (p.tipo === 'rombo' ? g.l1 === g.l2 && g.dot !== 0 : p.tipo === 'rectangulo' ? g.dot === 0 : g.dot === 0 && g.l1 === g.l2); };
  const peR = p => { const ab = pe({ x: 0, y: 0 }, p).ab; return { min: [Math.max(0, ab[0]), Math.max(0, ab[1])], max: [12 + Math.min(0, ab[0]), 8 + Math.min(0, ab[1])] }; };
  XG.figura('paralelogramo-especial', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: p => [{ ...libre, ...peR(p) }],
    ok: peOk,
    sol(p) { const r = peR(p); let m = null; for (let x = r.min[0]; x <= r.max[0]; x++) for (let y = r.min[1]; y <= r.max[1]; y++) if (peOk({ x, y }, p) && (!m || hip([x, y], p.ini) < hip([m.x, m.y], p.ini))) m = { x, y }; return m; },
    texto(p) { const s = this.sol(p), g = pe(s, p); return p.tipo === 'rombo' ? `$BC = AB ${tx(Math.sqrt(g.l1))}$, con C en (${s.x}, ${s.y})` : `BC a escuadra sobre AB, con C en (${s.x}, ${s.y})`; },
    alto: () => 232, pie: 'Arrastra el vértice C: D lo sigue.',
    dib(v, K, p, f) {
      const g = pe(v, p), V = [p.A, p.B, [v.x, v.y], g.D].map(q => GP(...q)), c = mid(V[0], V[2]);
      const nom = V.map((q, i) => { const d = hip(q, c) || 1; return K.t(q[0] + (q[0] - c[0]) / d * 13, q[1] + (q[1] - c[1]) / d * 13 + 4, 'ABCD'[i], 's'); }).join('');
      return red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'la gr') + nom
        + K.f(f, K.l(...V[0], ...V[2], 'lg d') + K.l(...V[1], ...V[3], 'lf d') + (g.cr && g.l1 === g.l2 ? escuadra(K, c, V[2], V[1], 7) : '')
          + K.t(170, 14, `diagonales: ${num(hip(p.A, [v.x, v.y]))} y ${num(hip(p.B, g.D))} · lados: ${num(Math.sqrt(g.l1))} y ${num(Math.sqrt(g.l2))}`, 's'));
    },
    lee: (v, p) => { const g = pe(v, p); return `$AB ${tx(Math.sqrt(g.l1))}$ y $BC ${tx(Math.sqrt(g.l2))}$`; },
    aviso(v, p) {
      const g = pe(v, p);
      if (!g.cr) return 'Los cuatro vértices quedaron en línea: así no hay cuadrilátero.';
      if (p.tipo === 'rombo') return g.l1 === g.l2 ? 'Es un cuadrado: tiene los lados congruentes, pero se pidió sin ángulos rectos.' : `AB mide ${num(Math.sqrt(g.l1))} y BC mide ${num(Math.sqrt(g.l2))}: en el rombo los cuatro lados son congruentes.`;
      return g.dot ? 'El ángulo en B no es recto: BC debe caer a escuadra sobre AB.' : 'Es un rectángulo, pero BC no mide lo mismo que AB.';
    },
    bien: (v, p) => (p.tipo === 'rombo' ? 'Cuatro lados congruentes: las diagonales se cortan a escuadra y bisecan los ángulos.' : p.tipo === 'rectangulo' ? 'Cuatro ángulos rectos: por eso las diagonales son congruentes.' : 'Rectángulo y rombo a la vez: es un cuadrado.'),
  });

  // Dos diagonales: se mueve el cruce M por AC y se desliza BD por él, hasta que se bisequen.  params { n, m, g, t0, s0 }  v { t, s }
  const dcG = (v, p) => { const u = 220 / p.n, M = [50 + v.t * u, 132]; return { u, M, A: [50, 132], C: [270, 132], B: at(...M, v.s * 18, p.g), D: at(...M, -(p.m - v.s) * 18, p.g) }; };
  XG.figura('diagonales-cruce', {
    ini: p => ({ t: p.t0, s: p.s0 }),
    manijas: p => [{ k: 't', min: 1, max: p.n - 1, paso: 1, r: 9, en: v => dcG(v, p).M, de: x => (x - 50) / (220 / p.n) },
      { k: 's', min: 1, max: p.m - 1, paso: 1, r: 9, en: v => dcG(v, p).B, de: (x, y, v) => { const M = dcG(v, p).M; return ((x - M[0]) * Math.cos(rad(p.g)) + (M[1] - y) * Math.sin(rad(p.g))) / 18; } }],
    ok: (v, p) => 2 * v.t === p.n && 2 * v.s === p.m, sol: p => ({ t: p.n / 2, s: p.m / 2 }),
    texto: p => `las diagonales se bisecan: $AM = MC = ${p.n / 2}$ y $BM = MD = ${p.m / 2}$`,
    alto: () => 252, pie: 'Mueve el cruce M y desliza la diagonal BD.',
    dib(v, K, p, f) {
      const { u, M, A, B, C, D } = dcG(v, p), bien = Math.abs(2 * v.t - p.n) < 0.01 && Math.abs(2 * v.s - p.m) < 0.01;
      let h = K.p([A, B, C, D], 'fn') + K.pl([A, B, C, D, A], f > 0.5 && bien ? 'lo gr' : 'lm') + K.l(...A, ...C, 'gr') + K.l(...B, ...D, 'la gr');
      for (let i = 0; i <= p.n; i++) h += K.l(50 + i * u, 128, 50 + i * u, 136, 'lm');
      for (let j = 0; j <= p.m; j++) h += K.c(...at(...D, j * 18, p.g), 2, 'fk');
      return h + K.t(A[0] - 10, A[1] + 5, 'A', 's') + K.t(C[0] + 10, C[1] + 5, 'C', 's') + K.t(B[0] + 14, B[1] - 6, 'B', 's') + K.t(D[0] - 12, D[1] + 14, 'D', 's')
        + K.f(f, K.t(170, 246, `AM ${R(v.t)} · MC ${R(p.n - v.t)} · BM ${R(v.s)} · MD ${R(p.m - v.s)}`, bien ? 's to' : 's tf'));
    },
    lee: (v, p) => `$AM = ${R(v.t)}$, $MC = ${R(p.n - v.t)}$, $BM = ${R(v.s)}$, $MD = ${R(p.m - v.s)}$`,
    aviso: (v, p) => (2 * v.t !== p.n ? 'El cruce no parte a AC por la mitad: en un paralelogramo las diagonales se bisecan.' : 'BD no quedó partida por la mitad: el cruce debe ser punto medio de las dos diagonales.'),
    bien: () => 'El cruce es punto medio de las dos diagonales: por eso ABCD es un paralelogramo.',
  });

  // Los otros tres ángulos de un paralelogramo.  params { a, fichas }
  const apM = p => [180 - p.a, p.a, 180 - p.a].map(gr);
  XG.rotula('angulos-paralelogramo', {
    slots: () => [{ x: 296, y: 200, w: 58, h: 34 }, { x: 294, y: 30, w: 58, h: 34 }, { x: 66, y: 30, w: 58, h: 34 }], fichas: p => p.fichas, metas: apM,
    texto: p => `el opuesto mide $${p.a}^\\circ$ y los consecutivos, $180^\\circ - ${p.a}^\\circ = ${180 - p.a}^\\circ$`, alto: () => 222,
    fondo(K, p) {
      const A = [64, 176], B = [236, 176], D = at(...A, 104, p.a), C = at(...B, 104, p.a);
      return K.p([A, B, C, D], 'fn') + K.ang(A, B, D, 30, gr(p.a), 'fa', 'ta') + K.ang(B, A, C, 22, '', 'fg') + K.ang(C, B, D, 22, '', 'ff') + K.ang(D, A, C, 22, '', 'fo') + K.pl([A, B, C, D, A], 'gr')
        + K.l(B[0] + 8, B[1] + 4, 268, 192, 'lg d') + K.l(C[0] + 2, C[1] - 8, 286, 48, 'lf d') + K.l(D[0] - 4, D[1] - 8, 78, 48, 'lo d')
        + K.t(A[0] - 12, A[1] + 6, 'A', 's') + K.t(B[0] + 4, B[1] + 20, 'B', 's') + K.t(C[0] + 14, C[1] + 6, 'C', 's') + K.t(D[0] - 14, D[1] + 8, 'D', 's');
    },
    aviso(q, p) { const a = gr(p.a); return q[1][0] !== a ? 'El ángulo opuesto al dato es congruente con él.' : q[0][0] === a || q[2][0] === a ? 'Dos consecutivos no son congruentes: son suplementarios.' : 'Cada consecutivo completa 180° con el dato.'; },
    bien: () => 'Opuestos congruentes y consecutivos suplementarios.',
  });

  // Trapecio isósceles: AB y D fijos, se arrastra C.  params { A, B, D, ini }
  const tiC = p => ({ x: p.A[0] + p.B[0] - p.D[0], y: p.D[1] });
  XG.figura('trapecio-isosceles', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre],
    ok: (v, p) => v.x === tiC(p).x && v.y === tiC(p).y, sol: tiC,
    texto: p => `C en (${tiC(p).x}, ${tiC(p).y}): $DC \\parallel AB$ y $BC = AD ${tx(hip(p.A, p.D))}$`,
    alto: () => 232, pie: 'Arrastra el vértice C.',
    dib(v, K, p, f) {
      const V = [p.A, p.B, [v.x, v.y], p.D].map(q => GP(...q));
      return red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'la gr') + K.t(V[0][0] - 10, V[0][1] + 16, 'A', 's') + K.t(V[1][0] + 10, V[1][1] + 16, 'B', 's') + K.t(V[2][0] + 12, V[2][1] - 8, 'C', 's') + K.t(V[3][0] - 10, V[3][1] - 8, 'D', 's')
        + K.f(f, K.l(...V[0], ...V[2], 'lg d') + K.l(...V[1], ...V[3], 'lf d') + K.t(170, 14, `AD ${num(hip(p.A, p.D))} · BC ${num(hip(p.B, [v.x, v.y]))} · diagonales ${num(hip(p.A, [v.x, v.y]))} y ${num(hip(p.B, p.D))}`, 's'));
    },
    lee: (v, p) => `$AD ${tx(hip(p.A, p.D))}$ y $BC ${tx(hip(p.B, [R(v.x), R(v.y)]))}$`,
    aviso: (v, p) => (v.y !== p.D[1] ? 'DC no quedó paralela a AB: sin un par de lados paralelos no hay trapecio.'
      : v.x - p.D[0] === p.B[0] - p.A[0] ? 'AD y BC son congruentes, pero también paralelos: quedó un paralelogramo, no un trapecio.'
        : `AD mide ${num(hip(p.A, p.D))} y BC mide ${num(hip(p.B, [v.x, v.y]))}: en el isósceles los lados no paralelos son congruentes.`),
    bien: () => 'Lados no paralelos congruentes: también lo son los ángulos de cada base y las diagonales.',
  });

  XG.frases('siempre-paralelogramo');
  XG.renglones('que-cuadrilatero', { w: 124, x: 270 });

  // En movimiento: el marco articulado se abre con el ángulo que se le da (de 5 en 5).
  XG.tiros('abre-marco', {
    perilla: () => ({ et: 'Ángulo', min: 0, max: 35, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 176, ms: 1500,
    dib(t, v, K, p, f) {
      const A = [100, 150], B = [240, 150], a = v == null ? 90 : Math.max(2, v * 5 * Math.min(1, f * 1.5)), D = at(...A, 84, a), C = at(...B, 84, a);
      let h = K.l(20, 150, 320, 150, 'lm');
      if (v == null) return h + K.pl([A, D, C, B], 'lm d') + K.l(...A, ...B, 'gr') + K.t(...mid(A, D).map((z, i) => z + (i ? 0 : -14)), '?', 'ta');
      return h + K.p([A, B, C, D], 'fn') + K.sec(...A, 30, 0, a, 'fa') + K.pl([A, B, C, D, A], 'la gr')
        + K.f(f * 3 - 2, K.t(...at(A[0], A[1] + 5, 50, Math.max(14, Math.min(166, a / 2))), `${v * 5}°`, 'ta') + (v * 5 === t.r ? K.c(...D, 6, 'fo') + K.c(...C, 6, 'fo') : ''));
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Abrió demasiado.' : 'Le faltó abrir.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el ángulo y suelta: el marco se abre.',
  });

  // ============================================================================================ 4 · rectas y puntos notables
  // Paralela media: M es punto medio de AC; N se desliza por CB.  params { c, n, s0, C? }  v { s }
  const pmG = (v, p) => { const A = [36, 190], B = [304, 190], C = p.C || [124, 26]; return { A, B, C, M: mid(A, C), N: [C[0] + (B[0] - C[0]) * v.s / p.n, C[1] + (B[1] - C[1]) * v.s / p.n] }; };
  XG.figura('paralela-media', {
    ini: p => ({ s: p.s0 }),
    manijas: p => [{ k: 's', min: 1, max: p.n - 1, paso: 1, en: v => pmG(v, p).N, de(x, y) { const { B, C } = pmG({ s: 0 }, p), d = [B[0] - C[0], B[1] - C[1]]; return p.n * ((x - C[0]) * d[0] + (y - C[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2); } }],
    ok: (v, p) => 2 * v.s === p.n, sol: p => ({ s: p.n / 2 }),
    texto: p => `N es el punto medio de CB: $MN \\parallel AB$ y $MN = ${p.c} \\div 2 = ${p.c / 2}$`,
    alto: () => 216, pie: 'Desliza N por el lado CB.',
    dib(v, K, p, f) {
      const { A, B, C, M, N } = pmG(v, p), bien = Math.abs(2 * v.s - p.n) < 0.01, q = mid(M, N);
      let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr');
      for (let i = 1; i < p.n; i++) h += K.c(C[0] + (B[0] - C[0]) * i / p.n, C[1] + (B[1] - C[1]) * i / p.n, 2, 'fk');
      const pal = (P, Q) => { const m = mid(P, Q); return K.l(m[0] - 6, m[1] - 3, m[0] + 6, m[1] + 3, 'lg'); };
      return h + pal(A, M) + pal(M, C) + K.c(...M, 4, 'fk') + K.t(M[0] - 14, M[1] + 4, 'M', 's') + K.t(A[0] - 2, A[1] + 18, 'A', 's') + K.t(B[0] + 2, B[1] + 18, 'B', 's') + K.t(C[0], C[1] - 8, 'C', 's')
        + K.t(170, 208, `${p.c}`, 's tm') + K.l(...M, ...N, 'la gr') + K.t(N[0] + 16, N[1] + 4, 'N', 's')
        + K.f(f, K.t(q[0], q[1] - 8, bien ? `${p.c / 2}` : 'no es paralela', bien ? 's to' : 's tf'));
    },
    lee: (v, p) => `$CN = ${R(v.s)}$ y $NB = ${R(p.n - v.s)}$`,
    aviso: (v, p) => `N quedó más cerca de ${2 * v.s < p.n ? 'C' : 'B'}: MN se inclina. La paralela a AB por M pasa por el punto medio de CB.`,
    bien: (v, p) => `N es punto medio de CB: MN es paralela a AB y mide ${p.c / 2}, la mitad.`,
  });

  // Baricentro: G se desliza por la mediana AM, de medida n.  params { n, s0 }  v { s } (distancia desde el vértice)
  const BA = { A: [118, 22], B: [28, 204], C: [312, 204], M: [170, 204] };
  XG.figura('baricentro-desliza', {
    ini: p => ({ s: p.s0 }),
    manijas: p => [{ k: 's', min: 1, max: p.n - 1, paso: 1, r: 9, en: v => [BA.A[0] + 52 * v.s / p.n, BA.A[1] + 182 * v.s / p.n], de: (x, y) => p.n * ((x - BA.A[0]) * 52 + (y - BA.A[1]) * 182) / (52 * 52 + 182 * 182) }],
    ok: (v, p) => 3 * v.s === 2 * p.n, sol: p => ({ s: 2 * p.n / 3 }),
    texto: p => `$\\tfrac{2}{3} \\cdot ${p.n} = ${2 * p.n / 3}$ desde el vértice`,
    alto: () => 224, pie: 'Desliza G por la mediana.',
    dib(v, K, p, f) {
      const { A, B, C, M } = BA;
      let h = K.p([A, B, C], 'fn') + K.pl([A, B, C, A], 'gr') + K.l(...A, ...M, 'la gr');
      for (let i = 0; i <= p.n; i++) h += K.l(A[0] + 52 * i / p.n - 4, A[1] + 182 * i / p.n + 1, A[0] + 52 * i / p.n + 4, A[1] + 182 * i / p.n - 1, 'lm');
      return h + K.t(A[0] - 12, A[1] + 6, 'A', 's') + K.t(M[0], M[1] + 16, 'M', 's') + K.t(B[0], B[1] + 16, 'B', 's') + K.t(C[0], C[1] + 16, 'C', 's') + K.t(250, 60, `mediana AM: ${p.n}`, 's tm')
        + K.f(f, K.l(...B, ...mid(A, C), 'lg d') + K.l(...C, ...mid(A, B), 'lf d') + K.t(250, 82, `AG ${R(v.s)} · GM ${R(p.n - v.s)}`, 3 * R(v.s) === 2 * p.n ? 's to' : 's tf'));
    },
    lee: (v, p) => `$AG = ${R(v.s)}$ y $GM = ${R(p.n - v.s)}$`,
    aviso: (v, p) => (2 * v.s === p.n ? 'Ese es el punto medio de la mediana: el baricentro queda más cerca del lado.' : 3 * v.s === p.n ? 'Quedó a un tercio del vértice: los dos tercios se cuentan desde el vértice.'
      : `AG mide ${v.s} y GM mide ${p.n - v.s}: AG debe ser el doble de GM.`),
    bien: (v, p) => `AG = ${v.s} y GM = ${p.n - v.s}: el baricentro está a dos tercios del vértice.`,
  });

  // Un punto que equidista de los tres vértices (circuncentro) o de los tres lados (incentro).  params { V, tipo, ini }  v { x, y }
  const ceD = (v, p) => {
    if (p.tipo === 'vertices') return p.V.map(q => hip(q, [v.x, v.y]));
    const or = Math.sign((p.V[1][0] - p.V[0][0]) * (p.V[2][1] - p.V[0][1]) - (p.V[1][1] - p.V[0][1]) * (p.V[2][0] - p.V[0][0]));
    return p.V.map((a, i) => { const b = p.V[(i + 1) % 3]; return or * ((b[0] - a[0]) * (v.y - a[1]) - (b[1] - a[1]) * (v.x - a[0])) / hip(a, b); });
  };
  const ceOk = (v, p) => { const d = ceD(v, p); return d.every(x => x > 1e-9) && Math.abs(d[0] - d[1]) < 1e-9 && Math.abs(d[1] - d[2]) < 1e-9; };
  const ceS = p => { for (let x = 0; x <= 12; x++) for (let y = 0; y <= 8; y++) if (ceOk({ x, y }, p)) return { x, y }; return null; };
  XG.figura('centro-equidista', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [libre], ok: ceOk, sol: ceS,
    texto(p) { const s = ceS(p); return `el punto (${s.x}, ${s.y}): queda a $d ${tx(ceD(s, p)[0])}$ de ${p.tipo === 'vertices' ? 'cada vértice' : 'cada lado'}`; },
    alto: () => 232, pie: 'Arrastra el punto por la cuadrícula.',
    dib(v, K, p, f) {
      const V = p.V.map(q => GP(...q)), O = GP(v.x, v.y), d = ceD(v, p), bien = ceOk(v, p), c = mid(mid(V[0], V[1]), V[2]);
      let h = red(K) + K.p(V, 'fn') + K.pl([...V, V[0]], 'gr') + V.map((q, i) => { const r = hip(q, c) || 1; return K.t(q[0] + (q[0] - c[0]) / r * 13, q[1] + (q[1] - c[1]) / r * 13 + 4, 'ABC'[i], 's'); }).join('');
      if (!f) return h;
      const pies = p.tipo === 'vertices' ? V : p.V.map((a, i) => { const b = p.V[(i + 1) % 3], k = ((v.x - a[0]) * (b[0] - a[0]) + (v.y - a[1]) * (b[1] - a[1])) / hip(a, b) ** 2; return GP(a[0] + k * (b[0] - a[0]), a[1] + k * (b[1] - a[1])); });
      return h + K.f(f, pies.map((q, i) => K.l(...O, ...q, ['lg d', 'lf d', 'lo d'][i]) + K.t(...mid(O, q).map((z, j) => z + (j ? -4 : 6)), num(Math.abs(d[i])), 's', 'start')).join('')
        + K.arc(O[0], O[1], Math.abs(d[0]) * U * Math.min(1, f), 0, 360, bien ? 'lo gr' : 'lm d'));
    },
    aviso(v, p) {
      const d = ceD(v, p).map(x => num(Math.abs(x)));
      if (p.tipo === 'vertices') return `Está a ${d[0]} de A, a ${d[1]} de B y a ${d[2]} de C: el circuncentro equidista de los tres vértices.`;
      return ceD(v, p).some(x => x <= 1e-9) ? 'Quedó fuera o sobre el borde: el incentro siempre está dentro del triángulo.' : `Está a ${d[0]}, ${d[1]} y ${d[2]} de los lados: el incentro equidista de los tres.`;
    },
    bien: (v, p) => (p.tipo === 'vertices' ? `Está a ${num(ceD(v, p)[0])} de los tres vértices: es el circuncentro, y la circunferencia pasa por los tres.` : `Está a ${num(ceD(v, p)[0])} de los tres lados: es el incentro, centro de la circunferencia inscrita.`),
  });

  // 30°-60°-90°: se sube la punta de una hipotenusa de medida c hasta que el ángulo sea de 30°.  params { c, h0 }  v { h }
  const tsT = (v, p) => { const u = 190 / p.c; return [60 + u * Math.sqrt(Math.max(0, p.c * p.c - v.h * v.h)), 200 - u * v.h]; };
  const tsA = (v, p) => Math.asin(Math.min(1, v.h / p.c)) * 180 / Math.PI;
  XG.figura('treinta-sesenta', {
    ini: p => ({ h: p.h0 }),
    manijas: p => [{ k: 'h', min: 2, max: p.c - 2, paso: 1, en: v => tsT(v, p), de: (x, y) => (200 - y) / (190 / p.c) }],
    ok: (v, p) => 2 * v.h === p.c, sol: p => ({ h: p.c / 2 }),
    texto: p => `el cateto opuesto a $30^\\circ$ es la mitad de la hipotenusa: $${p.c} \\div 2 = ${p.c / 2}$`,
    alto: () => 216, pie: 'Sube o baja la punta.',
    dib(v, K, p, f) {
      const A = [60, 200], T = tsT(v, p), F = [T[0], 200], m = mid(A, T);
      return K.l(30, 200, 320, 200, 'lm') + K.p([A, F, T], 'fn') + K.ang(A, F, T, 32, f > 0.5 ? `${num(tsA(v, p))}°` : '?', 'fa', 'ta') + escuadra(K, F, A, T)
        + K.l(...A, ...T, 'la gr') + K.l(...T, ...F, 'lf gr') + K.t(m[0] - 12, m[1] - 8, `${p.c}`, 's ta', 'end') + K.t(T[0] + 12, (T[1] + 200) / 2 + 4, num(v.h), 's tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${R(v.h)}}{${p.c}}$ de la hipotenusa`,
    aviso: (v, p) => `Con el cateto en ${v.h}, el ángulo mide ${num(tsA(v, p))}°: ${2 * v.h > p.c ? 'más' : 'menos'} de 30°.`,
    bien: (v, p) => `El cateto opuesto mide ${v.h}, la mitad de la hipotenusa: el ángulo es de 30°.`,
  });

  // Tres mitades: mediana sobre la hipotenusa, paralela media y mediana del trapecio.  params { h, b, B, b2, et, metas, fichas, mira, ok }
  XG.cuenta('medios-miden', 142, (K, p) => {
    const R1 = [20, 118], X = [100, 118], Y = [20, 40], P = [125, 118], Q = [215, 118], T = [160, 40], Z = [[240, 118], [330, 118], [310, 48], [262, 48]];
    return K.p([R1, X, Y], 'fn') + K.pl([R1, X, Y, R1], 'gr') + K.pl([[30, 118], [30, 108], [20, 108]], 'lm') + K.l(...R1, ...mid(X, Y), 'la gr') + K.t(72, 72, `${p.h}`, 's', 'start')
      + K.p([P, Q, T], 'fn') + K.pl([P, Q, T, P], 'gr') + K.l(...mid(P, T), ...mid(Q, T), 'la gr') + K.t(170, 134, `${p.b}`, 's')
      + K.p(Z, 'fn') + K.pl([...Z, Z[0]], 'gr') + K.l(...mid(Z[0], Z[3]), ...mid(Z[1], Z[2]), 'la gr') + K.t(285, 134, `${p.B}`, 's') + K.t(286, 42, `${p.b2}`, 's');
  });
  XG.renglones('punto-de-que', { w: 120, x: 272 });

  // Mediana del trapecio: se estira la base mayor hasta que la mediana mida m.  params { b, m, B0 }  v { B }
  XG.figura('trapecio-base', {
    ini: p => ({ B: p.B0 }),
    manijas: p => [{ k: 'B', min: p.b + 1, max: 22, paso: 1, en: v => [50 + v.B * 12, 176], de: x => (x - 50) / 12 }],
    ok: (v, p) => v.B + p.b === 2 * p.m, sol: p => ({ B: 2 * p.m - p.b }),
    texto: p => `$2 \\cdot ${p.m} - ${p.b} = ${2 * p.m - p.b}$, porque $\\tfrac{${2 * p.m - p.b} + ${p.b}}{2} = ${p.m}$`,
    alto: () => 202, pie: 'Estira la base de abajo.',
    dib(v, K, p, f) {
      const TL = [92, 56], TR = [92 + p.b * 12, 56], BL = [50, 176], BR = [50 + v.B * 12, 176], a = mid(TL, BL), b = mid(TR, BR);
      return K.p([BL, BR, TR, TL], 'fn') + K.pl([BL, BR, TR, TL, BL], 'gr') + K.l(...a, ...b, 'la gr') + K.t((TL[0] + TR[0]) / 2, 46, `${p.b}`, 's') + K.t((BL[0] + BR[0]) / 2, 194, num(v.B), 's')
        + K.t((a[0] + b[0]) / 2, a[1] - 8, f > 0.5 ? num((v.B + p.b) / 2) : '?', 's ta');
    },
    lee: (v, p) => `$\\tfrac{${R(v.B)} + ${p.b}}{2}$`,
    aviso: (v, p) => (v.B === p.m ? 'Esa es la medida de la mediana, no la de la base.' : v.B === 2 * p.m ? 'Falta descontar la otra base: la mediana es la semisuma de las dos.' : `Con esa base la mediana mide ${num((v.B + p.b) / 2)}, no ${p.m}.`),
    bien: (v, p) => `(${v.B} + ${p.b}) ÷ 2 = ${p.m}: la mediana es la semisuma de las bases.`,
  });
})();
