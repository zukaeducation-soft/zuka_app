// Geometría Euclidiana · mundo 3 «euc-triangulo»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Triángulos con sus marcas (rayitas en los lados congruentes, arcos de color en los ángulos congruentes, esquina en el recto). La
// escena no dice el resultado mientras se responde: al comprobar (f → 1) cierra el triángulo, mide o nombra lo que se armó.
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round, r1 = x => Math.round(x * 10) / 10;
  const dist = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]), d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
  const mid = (P, Q, t = 0.5) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
  const cen = T => [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3];
  const fuera = (P, G, d) => { const L = dist(P, G) || 1; return [P[0] + (P[0] - G[0]) / L * d, P[1] + (P[1] - G[1]) / L * d]; };
  const rot = (K, P, G, t, cls = 's', d = 11) => { const [x, y] = fuera(P, G, d); return K.t(x, y + 4, t, cls); };
  // n rayitas que cruzan el segmento PQ por su mitad.
  const ray = (K, P, Q, n = 1, cls = '') => {
    const L = dist(P, Q) || 1, ux = (Q[0] - P[0]) / L, uy = (Q[1] - P[1]) / L, M = mid(P, Q); let h = '';
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 4, x = M[0] + ux * o, y = M[1] + uy * o; h += K.l(x - uy * 5, y + ux * 5, x + uy * 5, y - ux * 5, cls); }
    return h;
  };
  // Esquina recta en V, entre VP y VQ.
  const esc = (K, V, P, Q, s = 8) => { const a = dist(V, P) || 1, b = dist(V, Q) || 1, u = [(P[0] - V[0]) / a * s, (P[1] - V[1]) / a * s], w = [(Q[0] - V[0]) / b * s, (Q[1] - V[1]) / b * s]; return K.pl([[V[0] + u[0], V[1] + u[1]], [V[0] + u[0] + w[0], V[1] + u[1] + w[1]], [V[0] + w[0], V[1] + w[1]]], 'lm'); };
  const raiz = n => (Number.isInteger(Math.sqrt(n)) ? `${Math.sqrt(n)}` : `√${n}`);
  // Puntos (con y hacia arriba) llevados a una caja de w × h centrada en (cx, cy).
  const encaja = (pts, cx, cy, w, h) => {
    const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), s = Math.min(w / ((x1 - x0) || 1), h / ((y1 - y0) || 1));
    return pts.map(([x, y]) => [cx + (x - (x0 + x1) / 2) * s, cy - (y - (y0 + y1) / 2) * s]);
  };
  // Un segmento largo por M con dirección d, recortado a una caja.
  const corta = (M, d, x0, y0, x1, y1) => {
    let a = -1e9, b = 1e9;
    [[M[0], d[0], x0, x1], [M[1], d[1], y0, y1]].forEach(([m, k, lo, hi]) => { if (Math.abs(k) < 1e-9) return; const t1 = (lo - m) / k, t2 = (hi - m) / k; a = Math.max(a, Math.min(t1, t2)); b = Math.min(b, Math.max(t1, t2)); });
    return [M[0] + d[0] * a, M[1] + d[1] * a, M[0] + d[0] * b, M[1] + d[1] * b];
  };

  // ----------------------------------------------------------------------------------------- los dos apellidos de un triángulo
  // Por lados (con las medidas o con sus cuadrados) y por ángulos (con los cuadrados de los lados o con los grados).
  const LAD = ([a, b, c]) => (a === b && b === c ? 'equilátero' : a === b || b === c || a === c ? 'isósceles' : 'escaleno');
  const ANG2 = q => { const [x, y, z] = [...q].sort((m, n) => m - n); return z === x + y ? 'rectángulo' : z > x + y ? 'obtusángulo' : 'acutángulo'; };
  const ANGG = g => (g.some(x => x === 90) ? 'rectángulo' : g.some(x => x > 90) ? 'obtusángulo' : 'acutángulo');
  const POR = { escaleno: 'tiene sus tres lados distintos', 'isósceles': 'tiene dos lados congruentes', 'equilátero': 'tiene sus tres lados congruentes', 'acutángulo': 'tiene sus tres ángulos agudos', 'rectángulo': 'tiene un ángulo recto', 'obtusángulo': 'tiene un ángulo obtuso' };
  const DELADO = ['escaleno', 'isósceles', 'equilátero'];

  // Seis triángulos con sus medidas: se tocan los del tipo pedido.  params { por: 'lados' | 'angulos', tris: [[a, b, c] | [A, B, C]], pide }
  const tipoT = (p, t) => (p.por === 'angulos' ? ANGG(t) : LAD(t));
  const ptsT = (p, t) => {
    if (p.por === 'angulos') { const [A, B, C] = t.map(rad), b = Math.sin(B) / Math.sin(C); return [[0, 0], [1, 0], [b * Math.cos(A), b * Math.sin(A)]]; }
    const [a, b, c] = t, x = (b * b + c * c - a * a) / (2 * c); return [[0, 0], [c, 0], [x, Math.sqrt(Math.max(0, b * b - x * x))]];
  };
  const SIT = i => ({ x: 58 + (i % 3) * 112, y: 52 + Math.floor(i / 3) * 100, w: 106, h: 94 });
  const solT = p => p.tris.map((_, i) => i).filter(i => tipoT(p, p.tris[i]) === p.pide);
  XG.marca('clasifica-triangulos', {
    sitios: p => p.tris.map((_, i) => SIT(i)), alto: p => Math.ceil(p.tris.length / 3) * 100 + 4, nombre: (p, i) => `triángulo ${i + 1}: ${p.tris[i].join(', ')}`,
    cara(K, p, i) {
      const s = SIT(i), t = p.tris[i], T = encaja(ptsT(p, t), s.x, s.y, 56, 38), G = cen(T);
      if (p.por === 'angulos') return K.p(T, 'fn') + T.map((V, k) => (t[k] === 90 ? esc(K, V, T[(k + 1) % 3], T[(k + 2) % 3], 6) : '') + rot(K, V, G, `${t[k]}°`, 's', 13)).join('');
      return K.p(T, 'fn') + rot(K, mid(T[1], T[2]), G, t[0], 's', 10) + rot(K, mid(T[2], T[0]), G, t[1], 's', 10) + rot(K, mid(T[0], T[1]), G, t[2], 's', 10);
    },
    sol: solT,
    aviso(on, p) { const i = on.findIndex((x, k) => x && tipoT(p, p.tris[k]) !== p.pide); if (i < 0) return `Falta alguno: busca cada triángulo que ${POR[p.pide]}.`; const t = tipoT(p, p.tris[i]); return `El de ${p.tris[i].join(', ')} ${POR[t]}: es ${t}, no ${p.pide}.`; },
    bien: p => `Cada uno de esos ${POR[p.pide]}: es ${p.pide}.`,
    texto: p => solT(p).map(i => p.tris[i].map(x => `${x}${p.por === 'angulos' ? '°' : ''}`).join(', ')).join('; '), pie: 'Toca todos los que cumplen. Otro toque los quita.',
  });

  // Un triángulo con sus marcas: su nombre por lados y su nombre por ángulos.  params { pts: [[x, y] × 3] enteros, fichas }
  const cuad = p => [d2(p.pts[1], p.pts[2]), d2(p.pts[2], p.pts[0]), d2(p.pts[0], p.pts[1])];
  const metasAp = p => [LAD(cuad(p)), ANG2(cuad(p))];
  XG.rotula('dos-apellidos', {
    slots: () => [{ x: 92, y: 172, w: 124, h: 38 }, { x: 248, y: 172, w: 124, h: 38 }], fichas: p => p.fichas, metas: metasAp, alto: () => 198,
    texto: p => metasAp(p).join(' y '),
    fondo(K, p) {
      const T = encaja(p.pts, 170, 66, 210, 92), q = cuad(p), S = [[T[1], T[2]], [T[2], T[0]], [T[0], T[1]]], tl = LAD(q);
      const n = k => (tl === 'equilátero' ? 1 : tl === 'escaleno' ? k + 1 : q.filter(x => x === q[k]).length === 2 ? 1 : 2);
      const mayor = q.indexOf(Math.max(...q)), ta = ANG2(q), V = T[mayor], W = S[mayor];
      return K.p(T, 'fn') + S.map(([P, Q], k) => ray(K, P, Q, n(k))).join('') + (ta === 'rectángulo' ? esc(K, V, W[0], W[1], 10) : ta === 'obtusángulo' ? K.ang(V, W[0], W[1], 16, '', 'ff') : '')
        + K.t(92, 144, 'por sus lados', 's tm') + K.t(248, 144, 'por sus ángulos', 's tm');
    },
    aviso(q, p) {
      const m = metasAp(p);
      if (q[0][0] !== m[0]) return DELADO.includes(q[0][0]) ? `Cuenta las rayitas: ${POR[m[0]]}.` : 'Por sus lados solo puede ser escaleno, isósceles o equilátero.';
      return DELADO.includes(q[1][0]) ? 'Por sus ángulos solo puede ser acutángulo, rectángulo u obtusángulo.' : `Mira el ángulo más abierto: ${POR[m[1]]}.`;
    },
    bien: p => `Es ${metasAp(p).join(' y ')}: un nombre por los lados y otro por los ángulos.`,
  });

  // Se arrastra el vértice C por la cuadrícula hasta que el triángulo tenga los tipos pedidos.  params { A, B (x de la base), pide: [tipos], sol: [x, y], ini: [x, y] }
  const GX = x => 26 + x * 24, GY = y => 196 - y * 24;
  const cuadV = (v, p) => [d2([p.B, 0], [v.x, v.y]), d2([v.x, v.y], [p.A, 0]), (p.B - p.A) ** 2];
  const tiposV = (v, p) => [LAD(cuadV(v, p)), ANG2(cuadV(v, p))];
  const NOCUMPLE = { 'isósceles': 'ningún par de lados mide lo mismo', escaleno: 'tiene dos lados congruentes', 'equilátero': 'sus lados no miden lo mismo', 'rectángulo': 'ningún ángulo es recto', 'obtusángulo': 'ningún ángulo pasa de 90°', 'acutángulo': 'tiene un ángulo que no es agudo' };
  XG.figura('vertice-tipo', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 1], max: [12, 7], paso: 1, en: v => [GX(v.x), GY(v.y)], de: (x, y) => [(x - 26) / 24, (196 - y) / 24] }],
    ok: (v, p) => p.pide.every(t => tiposV(v, p).includes(t)),
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$C$ en $(${p.sol[0] - p.A},\\ ${p.sol[1]})$ desde $A$: ${p.pide.join(' y ')}`,
    alto: () => 216, pie: 'Arrastra el vértice C por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [GX(p.A), GY(0)], B = [GX(p.B), GY(0)], C = [GX(v.x), GY(v.y)], T = [A, B, C], G = cen(T), q = cuadV({ x: R(v.x), y: R(v.y) }, p), S = [[B, C], [C, A], [A, B]];
      let h = '';
      for (let x = 0; x <= 12; x++) for (let y = 0; y <= 7; y++) h += K.c(GX(x), GY(y), 1.3, 'fM');
      h += K.p(T, 'fn') + K.t(A[0], A[1] + 16, 'A', 's') + K.t(B[0], B[1] + 16, 'B', 's') + K.t(C[0], C[1] - 16, 'C', 's ta');
      const recto = [0, 1, 2].find(k => q[k] === q[(k + 1) % 3] + q[(k + 2) % 3]);
      return h + K.f(f, S.map(([P, Q], k) => rot(K, mid(P, Q), G, raiz(q[k]), 's ta', 12) + (q.filter(x => x === q[k]).length > 1 ? ray(K, P, Q, 1, 'la') : '')).join('') + (recto != null ? esc(K, T[recto], S[recto][0], S[recto][1], 9) : ''));
    },
    aviso(v, p) { const t = tiposV(v, p), falta = p.pide.find(x => !t.includes(x)); return `Quedó ${t.join(' y ')}: ${NOCUMPLE[falta]}.`; },
    bien: (v, p) => `Es ${tiposV(v, p).join(' y ')}: cumple lo pedido.`,
  });

  // --------------------------------------------------------------------------------------------- altura, mediana y bisectriz
  // Tres segmentos, uno desde cada vértice, con sus marcas: se nombra cada uno.  params { de: [desde A, desde B, desde C], fichas }
  const NS = [[150, 30], [62, 166], [286, 166]];
  const pieN = (k, tipo) => {
    const V = NS[k], P = NS[(k + 1) % 3], Q = NS[(k + 2) % 3];
    if (tipo === 'mediana') return mid(P, Q);
    if (tipo === 'bisectriz') return mid(P, Q, dist(V, P) / (dist(V, P) + dist(V, Q)));
    return mid(P, Q, ((V[0] - P[0]) * (Q[0] - P[0]) + (V[1] - P[1]) * (Q[1] - P[1])) / d2(P, Q));
  };
  const QUEES = { altura: 'Cae a escuadra sobre el lado opuesto: es una altura.', mediana: 'Llega al punto medio del lado opuesto: es una mediana.', bisectriz: 'Parte el ángulo en dos ángulos congruentes: es una bisectriz.' };
  const SLN = [{ x: 170, y: 196, w: 92, h: 34 }, { x: 290, y: 78, w: 92, h: 34 }, { x: 50, y: 78, w: 92, h: 34 }];
  XG.rotula('nombra-segmentos', {
    slots: () => SLN, fichas: p => p.fichas, metas: p => p.de, alto: () => 218,
    texto: p => p.de.map((t, k) => `desde ${'ABC'[k]}, la ${t}`).join('; '),
    fondo(K, p) {
      const G = cen(NS), C = ['la', 'lg', 'lf'], F = ['fa', 'fg', 'ff'];
      return K.p(NS, 'fn') + NS.map((V, k) => rot(K, V, G, 'ABC'[k], '', 13)).join('') + p.de.map((t, k) => {
        const V = NS[k], P = NS[(k + 1) % 3], Q = NS[(k + 2) % 3], D = pieN(k, t), s = SLN[k];
        return (t === 'bisectriz' ? K.ang(V, P, D, 26, '', F[k]) + K.ang(V, D, Q, 20, '', F[k]) : '') + K.l(...V, ...D, `${C[k]} gr`) + (t === 'altura' ? esc(K, D, V, Q, 8) : t === 'mediana' ? ray(K, P, D, 1, C[k]) + ray(K, D, Q, 1, C[k]) : '')
          + K.l(...D, s.x + (k === 1 ? -46 : k === 2 ? 46 : 0), s.y - (k ? 0 : 17), 'lm d');
      }).join('');
    },
    aviso(q, p) { const i = p.de.findIndex((m, k) => q[k][0] !== m); return q[i][0] === 'mediatriz' ? 'La mediatriz no tiene que salir de un vértice: es la perpendicular por el punto medio de un lado.' : `Desde ${'ABC'[i]}: mira su marca. ${QUEES[p.de[i]]}`; },
    bien: () => 'Altura: a escuadra. Mediana: al punto medio. Bisectriz: parte el ángulo.',
  });

  // El pie P corre por el lado BC hasta que AP sea el segmento pedido.  params { A: [x, alto], c (BC), pide, ini? }
  const PN = p => { const u = 252 / p.c, YB = 24 + p.A[1] * u; return { u, YB, A: [44 + p.A[0] * u, 24], B: [44, YB], C: [296, YB] }; };
  const pies = p => { const AB = Math.hypot(p.A[0], p.A[1]), AC = Math.hypot(p.c - p.A[0], p.A[1]); return { altura: p.A[0], mediana: p.c / 2, bisectriz: p.c * AB / (AB + AC) }; };
  const cual = (v, p) => Object.entries(pies(p)).find(([, x]) => Math.abs(x - v.t) < 1e-6)?.[0];
  const angsP = (v, p) => { const [a, h] = p.A, g = x => Math.atan(x / h) * 180 / Math.PI; return [g(a) + g(v.t - a), g(p.c - a) - g(v.t - a), Math.atan2(h, a - v.t) * 180 / Math.PI].map(R); };
  XG.figura('pie-notable', {
    ini: p => ({ t: p.ini ?? 3 }),
    manijas: p => [{ k: 't', min: 1, max: p.c - 1, paso: 1, en: v => [44 + v.t * PN(p).u, PN(p).YB], de: x => (x - 44) / PN(p).u }],
    ok: (v, p) => cual(v, p) === p.pide,
    sol: p => ({ t: R(pies(p)[p.pide] * 2) / 2 }),
    texto: p => `la ${p.pide} llega a $${r1(pies(p)[p.pide])}$ de $B$`,
    alto: p => PN(p).YB + 50, pie: 'Arrastra el pie P por el lado BC.',
    dib(v, K, p, f) {
      const g = PN(p), P = [44 + v.t * g.u, g.YB], q = cual({ t: r1(v.t) }, p), [x, y, z] = angsP(v, p);
      let h = K.p([g.A, g.B, g.C], 'fn');
      for (let k = 0; k <= p.c; k++) h += K.l(44 + k * g.u, g.YB, 44 + k * g.u, g.YB + (k % 5 ? 4 : 8), 'lm');
      return h + K.ang(g.A, g.B, P, 30, `${x}°`, 'fa', 's ta') + K.ang(g.A, P, g.C, 30, `${y}°`, 'fg', 's tg') + K.ang(P, g.C, g.A, 13, '', 'ff') + K.t(P[0] + (v.t > p.c - 5 ? -26 : 28), g.YB - 7, `${z}°`, 's tf')
        + K.l(...g.A, ...P, 'la gr') + K.t(g.A[0], 15, 'A', 's') + K.t(30, g.YB + 5, 'B', 's') + K.t(310, g.YB + 5, 'C', 's')
        + K.t((44 + P[0]) / 2, g.YB + 24, r1(v.t), 's') + K.t((P[0] + 296) / 2, g.YB + 24, r1(p.c - v.t), 's')
        + K.f(f, (q === 'altura' ? esc(K, P, g.C, g.A) : '') + (q === 'mediana' ? ray(K, g.B, P, 2, 'la') + ray(K, P, g.C, 2, 'la') : '') + K.t(170, g.YB + 44, q ? `AP es la ${q}.` : 'AP no es altura, mediana ni bisectriz.', q === p.pide ? 's to' : 's tf'));
    },
    lee: (v, p) => `$BP = ${r1(v.t)},\\ PC = ${r1(p.c - v.t)}$`,
    aviso(v, p) {
      const q = cual(v, p), [x, y, z] = angsP(v, p);
      if (q) return `Esa es la ${q}, y se pidió la ${p.pide}. ${QUEES[p.pide].replace(/: es una .*$/, '.')}`;
      return p.pide === 'mediana' ? `BP mide ${v.t} y PC mide ${p.c - v.t}: P no es el punto medio.` : p.pide === 'altura' ? `AP no cae a escuadra: el ángulo en P mide ${z}°.` : `Los dos ángulos en A quedaron de ${x}° y ${y}°: no son congruentes.`;
    },
    bien: (v, p) => QUEES[p.pide].replace('una', 'la'),
  });

  // Lados y ángulos de un triángulo que se tocan: el opuesto, el comprendido…  params { n: 'PQR', sol: [nombres], no: { nombre: aviso }, mira, falta, ok }
  const OC = [[170, 52], [72, 156], [268, 156]];
  const elsOC = p => { const n = p.n || 'ABC'; return [n[0], n[1], n[2], n[1] + n[2], n[0] + n[2], n[0] + n[1]]; };
  const sitOC = [{ x: 170, y: 28, w: 42, h: 42, red: true }, { x: 46, y: 172, w: 42, h: 42, red: true }, { x: 294, y: 172, w: 42, h: 42, red: true }, { x: 170, y: 172, w: 58, h: 32 }, { x: 240, y: 98, w: 58, h: 32 }, { x: 100, y: 98, w: 58, h: 32 }];
  XG.marca('opuesto-comprendido', {
    sitios: () => sitOC, alto: () => 200, nombre: (p, i) => `${i < 3 ? 'ángulo' : 'lado'} ${elsOC(p)[i]}`,
    cara: (K, p, i) => K.t(sitOC[i].x, sitOC[i].y + 5, elsOC(p)[i], i < 3 ? 'b' : 's'),
    fondo: K => K.ang(OC[0], OC[1], OC[2], 20, '', 'fa') + K.ang(OC[1], OC[2], OC[0], 20, '', 'fg') + K.ang(OC[2], OC[0], OC[1], 20, '', 'ff') + K.p(OC, 'fn'),
    sol: p => p.sol.map(x => elsOC(p).indexOf(x)),
    aviso(on, p) { const e = elsOC(p), i = on.findIndex((x, k) => x && !p.sol.includes(e[k])); return i < 0 ? p.falta : p.no?.[e[i]] || p.mira; },
    bien: p => p.ok, texto: p => p.sol.map(x => (x.length === 1 ? `∠${x}` : x)).join(' y '), pie: 'Toca lados (las fichas) o ángulos (los círculos).',
  });

  // ------------------------------------------------------------------------------------------------- congruencia y criterios
  // Dos triángulos congruentes con las mismas marcas: se pone la parte que corresponde.  params { corr: 'EFD', pide: ['∠A', 'AB', 'BC'], fichas, gira?, esp? }
  const T0 = [[-34, 18], [36, 18], [14, -34]];
  const copia = p => { const g = rad(p.gira ?? 150), c = Math.cos(g), s = Math.sin(g); return T0.map(([x, y]) => { const m = p.esp ? -x : x; return [252 + m * c - y * s, 84 + m * s + y * c]; }); };
  const marcado = (K, T, n) => { const G = cen(T); return K.ang(T[0], T[1], T[2], 14, '', 'fa') + K.ang(T[1], T[2], T[0], 14, '', 'fg') + K.ang(T[2], T[0], T[1], 14, '', 'ff') + K.p(T, 'fn') + ray(K, T[0], T[1], 1) + ray(K, T[1], T[2], 2) + ray(K, T[2], T[0], 3) + T.map((V, k) => rot(K, V, G, n[k], '', 14)).join(''); };
  const corrDe = (p, s) => (s[0] === '∠' ? `∠${p.corr['ABC'.indexOf(s[1])]}` : [...s].map(ch => p.corr['ABC'.indexOf(ch)]).sort().join(''));
  const metasPC = p => p.pide.map(s => corrDe(p, s));
  const SPC = [62, 170, 278];
  XG.rotula('partes-correspondientes', {
    slots: p => p.pide.map((_, i) => ({ x: SPC[i], y: 190, w: 84, h: 36 })), fichas: p => p.fichas, metas: metasPC, alto: () => 214,
    texto: p => p.pide.map((s, i) => `${s} ≅ ${metasPC(p)[i]}`).join('; '),
    fondo: (K, p) => marcado(K, T0.map(([x, y]) => [88 + x, 84 + y]), 'ABC') + marcado(K, copia(p), p.corr) + p.pide.map((s, i) => K.t(SPC[i], 162, `${s} ≅`, 's')).join(''),
    aviso(q, p) {
      const m = metasPC(p), i = m.findIndex((x, k) => q[k][0] !== x), s = p.pide[i];
      if (s[0] === '∠') return `El arco de ∠${s[1]} tiene un color: busca en el otro triángulo el ángulo con ese mismo color.`;
      const n = { C: 'una rayita', A: 'dos rayitas', B: 'tres rayitas' }['ABC'.replace(s[0], '').replace(s[1], '')];
      return `El lado ${s} lleva ${n}: su pareja es el lado con ${n} en el otro triángulo.`;
    },
    bien: p => `△ABC ≅ △${p.corr}: cada parte con la que ocupa su mismo lugar.`,
  });

  // Qué garantizan las marcas de un par.  S: lados marcados (0 = BC, 1 = CA, 2 = AB); A: ángulos marcados (0 = A, 1 = B, 2 = C); r: C es recto.
  function criterio(S, A, r) {
    const s = S.length, a = A.length;
    if (r) { const hip = S.includes(2), cat = S.filter(i => i !== 2).length; return cat === 2 ? 'C-C' : hip && cat ? 'H-C' : hip && a ? 'H-A' : cat && a ? 'C-A' : a >= 2 ? 'A-A-A' : 'ninguno'; }
    if (s === 3) return 'L-L-L';
    if (s === 2) { const k = [0, 1, 2].find(i => !S.includes(i)); return A.includes(k) ? 'L-A-L' : a >= 2 ? 'L-A-A' : a ? 'L-L-A' : 'ninguno'; }
    if (s === 1) return a >= 2 ? (A.includes(S[0]) && a < 3 ? 'L-A-A' : 'A-L-A') : 'ninguno';
    return a >= 3 ? 'A-A-A' : 'ninguno';
  }
  const crit = c => criterio(c.l || [], c.a || [], c.r), VALE = c => !['L-L-A', 'A-A-A', 'ninguno'].includes(c);
  const TIENE = { 'L-L-L': 'los tres lados', 'L-A-L': 'dos lados y el ángulo que forman', 'A-L-A': 'dos ángulos y el lado que los une', 'L-A-A': 'dos ángulos y un lado que no está entre ellos', 'C-C': 'los dos catetos', 'C-A': 'un cateto y un ángulo agudo', 'H-A': 'la hipotenusa y un ángulo agudo', 'H-C': 'la hipotenusa y un cateto',
    'L-L-A': 'dos lados y un ángulo que no está entre ellos: pueden salir dos triángulos distintos', 'A-A-A': 'solo ángulos: la misma forma, pero el tamaño puede cambiar', ninguno: 'muy pocas marcas: faltan datos' };
  const VT = r => (r ? [[-24, -20], [26, 18], [-24, 18]] : [[-28, 20], [28, 20], [10, -22]]);
  // Un par de triángulos (el segundo, en espejo) con las marcas del caso.
  function par(K, cx, cy, c, s = 1, dx = 38, nom = null) {
    const uno = (m, n) => {
      const V = VT(c.r).map(([x, y]) => [cx + m * dx + m * x * s * (c.r ? 1 : 1), cy + y * s]), G = cen(V), S = [[V[1], V[2]], [V[2], V[0]], [V[0], V[1]]];
      return (c.a || []).map((j, k) => K.ang(V[j], V[(j + 1) % 3], V[(j + 2) % 3], 12 * s, '', ['fa', 'fg', 'ff'][k])).join('') + (c.r ? esc(K, V[2], V[0], V[1], 7 * s) : '') + K.p(V, 'fn')
        + (c.l || []).map((i, k) => K.l(...S[i][0], ...S[i][1], 'gr') + ray(K, S[i][0], S[i][1], k + 1, 'gr')).join('') + (n ? V.map((P, k) => rot(K, P, G, n[k], '', 13)).join('') : '');
    };
    return uno(-1, nom?.[0]) + uno(1, nom?.[1]);
  }
  const SPM = i => ({ x: 88 + (i % 2) * 164, y: 54 + Math.floor(i / 2) * 106, w: 158, h: 100 });
  const solPM = p => p.casos.map((_, i) => i).filter(i => (p.cr ? crit(p.casos[i]) === p.cr : VALE(crit(p.casos[i]))));
  // Pares de triángulos con marcas: se tocan los que quedan congruentes (o los de un criterio).  params { casos: [{ l, a, r? }], cr? }
  const pares = nombre => XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => SPM(i)), alto: p => Math.ceil(p.casos.length / 2) * 106 + 4, nombre: (p, i) => `par ${i + 1}: ${TIENE[crit(p.casos[i])].split(':')[0]}`,
    cara: (K, p, i) => K.t(SPM(i).x - 68, SPM(i).y - 34, i + 1, 's tm') + par(K, SPM(i).x, SPM(i).y + 4, p.casos[i]),
    sol: solPM,
    aviso(on, p) {
      const i = on.findIndex((x, k) => x && !solPM(p).includes(k)); if (i < 0) return 'Falta algún par: revisa qué lados y qué ángulos están marcados en cada uno.';
      const c = crit(p.casos[i]); return VALE(c) ? `El par ${i + 1} sí es congruente, pero por ${c}, no por ${p.cr}.` : `El par ${i + 1} tiene ${TIENE[c]}.`;
    },
    bien: p => `En esos pares las marcas forman un criterio: ${[...new Set(solPM(p).map(i => crit(p.casos[i])))].join(', ')}.`,
    texto: p => solPM(p).map(i => `par ${i + 1} (${crit(p.casos[i])})`).join('; '), pie: 'Toca cada par que cumple. Otro toque lo quita.',
  });
  pares('pares-marcados'); pares('pares-rectangulos');

  // Tres pares con marcas: a cada uno, el nombre de su criterio.  params { casos: [{ l, a, r? }] × 3, fichas }
  const metasNC = p => p.casos.map(c => (VALE(crit(c)) ? crit(c) : 'ninguno'));
  XG.rotula('nombra-criterio', {
    slots: p => p.casos.map((_, i) => ({ x: 264, y: 40 + i * 66, w: 112, h: 38 })), fichas: p => p.fichas, metas: metasNC, alto: p => p.casos.length * 66 + 8,
    texto: p => metasNC(p).join('; '),
    fondo: (K, p) => p.casos.map((c, i) => K.t(12, 44 + i * 66, i + 1, 's tm') + par(K, 104, 42 + i * 66, c, 0.95, 42)).join(''),
    aviso(q, p) { const m = metasNC(p), i = m.findIndex((x, k) => q[k][0] !== x); return `En el par ${i + 1} hay ${TIENE[crit(p.casos[i])]}.`; },
    bien: () => 'Cada par se nombra por lo que tiene marcado, en su orden.',
  });

  // A un par le falta una marca para completar el criterio pedido: se toca cuál.  params { l, a, r?, cr }
  const LN = [['BC', 'EF'], ['AC', 'DF'], ['AB', 'DE']];
  const opsMF = p => [...[0, 1, 2].filter(i => !(p.l || []).includes(i)).map(i => ['l', i]), ...[0, 1, 2].filter(j => !(p.a || []).includes(j) && !(p.r && j === 2)).map(j => ['a', j])];
  const conMF = (p, o) => criterio(o[0] === 'l' ? [...(p.l || []), o[1]] : p.l || [], o[0] === 'a' ? [...(p.a || []), o[1]] : p.a || [], p.r);
  const txtMF = o => (o[0] === 'l' ? `${LN[o[1]][0]} ≅ ${LN[o[1]][1]}` : `∠${'ABC'[o[1]]} ≅ ∠${'DEF'[o[1]]}`);
  const sitMF = (p, k) => ({ x: 90 + (k % 2) * 160, y: 162 + Math.floor(k / 2) * 44, w: 150, h: 36 });
  const solMF = p => opsMF(p).map((_, k) => k).filter(k => conMF(p, opsMF(p)[k]) === p.cr);
  XG.marca('marca-que-falta', {
    sitios: p => opsMF(p).map((_, k) => sitMF(p, k)), alto: p => 144 + Math.ceil(opsMF(p).length / 2) * 44, nombre: (p, k) => txtMF(opsMF(p)[k]),
    cara: (K, p, k) => K.t(sitMF(p, k).x, sitMF(p, k).y + 5, txtMF(opsMF(p)[k]), 's'),
    fondo: (K, p) => par(K, 170, 68, p, 1.5, 72, ['ABC', 'DEF']),
    sol: solMF,
    aviso(on, p) {
      const k = on.findIndex((x, i) => x && !solMF(p).includes(i)); if (k < 0) return `Falta la marca que completa ${p.cr}.`;
      const c = conMF(p, opsMF(p)[k]); return VALE(c) ? `Con esa marca queda ${c}: también sirve, pero se pidió ${p.cr}.` : c === 'ninguno' ? 'Con esa marca todavía no se completa ningún criterio.' : `Con esa marca queda ${c}: ${TIENE[c].split(':')[0]}. No es un criterio.`;
    },
    bien: p => `Con esa marca hay ${TIENE[p.cr]}: ${p.cr}.`, texto: p => solMF(p).map(k => txtMF(opsMF(p)[k])).join('; '), pie: 'Toca la congruencia que hace falta.',
  });

  // L-A-L: se abre el ángulo en D y se da el largo de DF.  params { b (AC), c (AB), g (ángulo A), a (BC), ini? }  v { g, l }
  const U = 11, RA = [40, 140], RD = [200, 140];
  XG.figura('arma-lal', {
    ini: p => ({ g: p.ini?.[0] ?? 90, l: p.ini?.[1] ?? 2 }),
    manijas: () => [{ k: 'g', min: 20, max: 150, paso: 10, en: v => XPK.at(...RD, v.l * U, v.g), de: (x, y) => Math.atan2(RD[1] - y, x - RD[0]) * 180 / Math.PI }, { k: 'l', min: 2, max: 9, paso: 1, et: 'largo de DF' }],
    ok: (v, p) => v.g === p.g && v.l === p.b,
    sol: p => ({ g: p.g, l: p.b }),
    texto: p => `$\\angle D = ${p.g}^\\circ$ y $DF = ${p.b}$`,
    alto: () => 214, pie: 'Arrastra la punta F para abrir el ángulo; con la perilla, el largo de DF.',
    dib(v, K, p, f) {
      const B = [RA[0] + p.c * U, 140], C = K.at(...RA, p.b * U, p.g), E = [RD[0] + p.c * U, 140], F = K.at(...RD, v.l * U, v.g), G = cen([RA, B, C]), bien = Math.abs(v.g - p.g) < 0.01 && Math.abs(v.l - p.b) < 0.01;
      const ef = Math.sqrt(p.c ** 2 + v.l ** 2 - 2 * p.c * v.l * Math.cos(rad(v.g))), nF = fuera(F, mid(RD, E), 13), nL = fuera(mid(RD, F), E, 11), nE = fuera(mid(E, F), RD, 13);
      return K.ang(RA, B, C, 20, `${p.g}°`, 'fa', 's ta') + K.p([RA, B, C], 'fn') + ray(K, RA, B) + K.t((RA[0] + B[0]) / 2, 157, p.c, 's') + rot(K, mid(RA, C), B, p.b, 's', 11) + rot(K, mid(B, C), RA, p.a, 's', 11)
        + K.t(RA[0] - 10, 153, 'A', 's tm') + K.t(B[0] + 9, 153, 'B', 's tm') + rot(K, C, G, 'C', 's tm', 11)
        + K.ang(RD, E, F, 20, `${R(v.g)}°`, 'fg', 's tg') + K.l(...RD, ...E, 'gr') + ray(K, RD, E) + K.t((RD[0] + E[0]) / 2, 157, p.c, 's') + K.l(...RD, ...F, 'la gr') + K.t(nL[0], nL[1] + 4, r1(v.l), 's ta')
        + K.t(RD[0] - 10, 153, 'D', 's tm') + K.t(E[0] + 9, 153, 'E', 's tm') + K.t(nF[0], nF[1] + 4, 'F', 's tm')
        + K.f(f, K.l(...E, ...F, bien ? 'lo gr' : 'lf gr') + K.t(nE[0], nE[1] + 4, r1(ef), bien ? 's to' : 's tf'));
    },
    lee: v => `$\\angle D = ${R(v.g)}^\\circ,\\ DF = ${r1(v.l)}$`,
    aviso: (v, p) => (v.g === p.g && v.l === p.a ? 'Ese es el lado de enfrente del ángulo. L-A-L pide los dos lados que forman el ángulo: AB y AC.' : v.l === p.b ? `Los lados coinciden, pero el ángulo entre ellos quedó en ${v.g}° y no en ${p.g}°.` : v.g === p.g ? `El ángulo coincide, pero DF mide ${v.l} y debía medir lo mismo que AC.` : 'Ni el ángulo en D ni el lado DF coinciden con los de ABC.'),
    bien: (v, p) => `Dos lados y el ángulo comprendido: el tercer lado sale solo y mide ${p.a}.`,
  });

  // A-L-A: sobre el lado DE se abren los ángulos en D y en E.  params { A, B, C (grados de ABC), ini? }  v { a, b }
  const AD = [190, 185], AE = [300, 185];
  const TA = v => { const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 110 * tb / (ta + tb); return [AD[0] + x, AD[1] - x * ta]; };
  XG.figura('abre-ala', {
    ini: p => ({ a: p.ini?.[0] ?? 45, b: p.ini?.[1] ?? 45 }),
    manijas: () => [{ k: 'a', min: 30, max: 70, paso: 5, r: 9, en: v => mid(AD, TA(v), 0.68), de: (x, y) => Math.atan2(AD[1] - y, x - AD[0]) * 180 / Math.PI },
      { k: 'b', min: 30, max: 70, paso: 5, r: 9, en: v => mid(AE, TA(v), 0.68), de: (x, y) => Math.atan2(AE[1] - y, AE[0] - x) * 180 / Math.PI }],
    ok: (v, p) => v.a === p.A && v.b === p.B,
    sol: p => ({ a: p.A, b: p.B }),
    texto: p => `$\\angle D = ${p.A}^\\circ$ y $\\angle E = ${p.B}^\\circ$`,
    alto: () => 214, pie: 'Arrastra los dos lados para abrir los ángulos en D y en E.',
    dib(v, K, p, f) {
      const Bp = [30, 150], Ap = [110, 150], ta = Math.tan(rad(p.A)), tb = Math.tan(rad(p.B)), x = 80 * ta / (ta + tb), Cp = [30 + x, 150 - x * tb], F = TA(v), bien = Math.abs(v.a - p.A) < 0.01 && Math.abs(v.b - p.B) < 0.01;
      return K.ang(Ap, Bp, Cp, 16, '', 'fa') + K.ang(Bp, Cp, Ap, 16, '', 'fg') + K.ang(Cp, Ap, Bp, 13, '', 'ff') + K.p([Ap, Bp, Cp], 'fn') + ray(K, Ap, Bp) + K.t(112, 168, `A ${p.A}°`, 's ta') + K.t(34, 168, `B ${p.B}°`, 's tg') + K.t(Cp[0], Cp[1] - 8, `C ${p.C}°`, 's tf')
        + K.ang(AD, AE, F, 18, '', 'fa') + K.ang(AE, F, AD, 18, '', 'fg') + K.l(...AD, ...AE, 'gr') + ray(K, AD, AE) + K.l(...AD, ...F, 'la') + K.l(...AE, ...F, 'lg') + K.t(186, 203, `D ${R(v.a)}°`, 's ta') + K.t(304, 203, `E ${R(v.b)}°`, 's tg')
        + K.f(f, K.p([AD, AE, F], bien ? 'fo' : 'fn') + K.t(F[0], Math.max(14, F[1] - 8), `F ${R(180 - v.a - v.b)}°`, bien ? 's to' : 's tf'));
    },
    lee: v => `$\\angle D = ${R(v.a)}^\\circ,\\ \\angle E = ${R(v.b)}^\\circ$`,
    aviso: (v, p) => (v.a === p.B && v.b === p.A && p.A !== p.B ? 'Quedaron cambiados: D corresponde a A y E corresponde a B.' : v.a === p.C || v.b === p.C ? 'Usaste el ángulo C, que no toca al lado AB. A-L-A pide los dos ángulos pegados al lado.' : `En D quedaron ${v.a}° y en E ${v.b}°: debían ser los de A y B.`),
    bien: () => 'Un lado y los dos ángulos pegados a él: los otros dos lados se cortan en un único punto.',
  });

  // Isósceles por sus ángulos: se gira el lado AC hasta que ∠C sea congruente con ∠B.  params { B, ini? }  v { c }
  const IB = [110, 190], IC = [230, 190];
  const IA = (v, p) => { const tb = Math.tan(rad(p.B)), tc = Math.tan(rad(v.c)), x = 120 * tc / (tb + tc); return [IB[0] + x, IB[1] - x * tb]; };
  const ladosI = (v, p) => { const s = Math.sin(rad(p.B + v.c)); return [12 * Math.sin(rad(v.c)) / s, 12 * Math.sin(rad(p.B)) / s].map(r1); };
  XG.figura('base-iguales', {
    ini: p => ({ c: p.ini ?? 30 }),
    manijas: p => [{ k: 'c', min: 30, max: 70, paso: 5, r: 9, en: v => mid(IC, IA(v, p), 0.68), de: (x, y) => Math.atan2(IC[1] - y, IC[0] - x) * 180 / Math.PI }],
    ok: (v, p) => v.c === p.B,
    sol: p => ({ c: p.B }),
    texto: p => `$\\angle C = \\angle B = ${p.B}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el lado AC para abrir el ángulo C.',
    dib(v, K, p, f) {
      const A = IA(v, p), [ab, ac] = ladosI(v, p), eq = Math.abs(v.c - p.B) < 0.01;
      return K.ang(IB, IC, A, 22, `${p.B}°`, 'fa', 's ta') + K.ang(IC, A, IB, 22, `${R(v.c)}°`, 'fg', 's tg') + K.p([IB, IC, A], 'fn') + K.t(100, 206, 'B', 's tm') + K.t(240, 206, 'C', 's tm') + K.t(A[0], Math.max(14, A[1] - 8), 'A', 's tm') + K.t(170, 206, '12', 's')
        + K.f(f, rot(K, mid(IB, A), IC, ab, eq ? 's to' : 's tf', 16) + rot(K, mid(IC, A), IB, ac, eq ? 's to' : 's tf', 16) + (eq ? ray(K, IB, A, 1, 'lo') + ray(K, IC, A, 1, 'lo') : ''));
    },
    lee: (v, p) => `$\\angle B = ${p.B}^\\circ,\\ \\angle C = ${R(v.c)}^\\circ$`,
    aviso: (v, p) => (v.c > p.B ? `El ángulo C quedó mayor que B: por eso AB (${ladosI(v, p)[0]}) salió más largo que AC (${ladosI(v, p)[1]}).` : `El ángulo C quedó menor que B: por eso AB (${ladosI(v, p)[0]}) salió más corto que AC (${ladosI(v, p)[1]}).`),
    bien: () => 'Ángulos de la base congruentes: los lados opuestos a ellos también lo son.',
  });

  // Demostración en dos columnas: la figura arriba, cada afirmación con su razón.  params { fig, et, metas, fichas, mira, trampas?, ok }
  const FIG = {
    cometa(K) { const A = [60, 58], B = [150, 12], C = [280, 58], D = [150, 104]; return K.p([A, B, C, D], 'fn') + K.l(...A, ...C, 'la') + ray(K, A, B) + ray(K, A, D) + ray(K, C, B, 2) + ray(K, C, D, 2) + K.t(48, 63, 'A', 's') + K.t(150, 9, 'B', 's') + K.t(292, 63, 'C', 's') + K.t(150, 119, 'D', 's'); },
    cruce(K) { const A = [50, 16], B = [290, 100], C = [50, 100], D = [290, 16], M = [170, 58]; return K.ang(M, A, C, 18, '', 'fa') + K.ang(M, B, D, 18, '', 'fa') + K.l(...A, ...B) + K.l(...C, ...D) + K.l(...A, ...C, 'la') + K.l(...B, ...D, 'la') + ray(K, A, M) + ray(K, M, B) + ray(K, C, M, 2) + ray(K, M, D, 2) + K.t(38, 20, 'A', 's') + K.t(302, 104, 'B', 's') + K.t(38, 104, 'C', 's') + K.t(302, 20, 'D', 's') + K.t(170, 46, 'M', 's'); },
    bisectriz(K) { const A = [170, 10], B = [86, 104], C = [254, 104], D = [170, 104]; return K.ang(A, B, D, 26, '', 'fa') + K.ang(A, D, C, 20, '', 'fa') + K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la') + ray(K, A, B) + ray(K, A, C) + K.t(170, 8, '', 's') + K.t(184, 16, 'A', 's') + K.t(74, 108, 'B', 's') + K.t(266, 108, 'C', 's') + K.t(170, 119, 'D', 's'); },
    altura(K) { const A = [170, 10], B = [86, 104], C = [254, 104], D = [170, 104]; return K.p([A, B, C], 'fn') + K.l(...A, ...D, 'la') + esc(K, D, A, C) + esc(K, D, A, B) + ray(K, A, B) + ray(K, A, C) + K.t(184, 16, 'A', 's') + K.t(74, 108, 'B', 's') + K.t(266, 108, 'C', 's') + K.t(170, 119, 'D', 's'); },
    equidista(K) { const O = [40, 100], g = 22, P = K.at(...O, 200, g), M = [P[0], 100], N = K.at(...O, 200 * Math.cos(rad(g)), 2 * g); return K.ang(O, M, P, 44, '', 'fa') + K.ang(O, P, N, 36, '', 'fa') + K.l(...O, 310, 100) + K.l(...O, ...K.at(...O, 270, 2 * g)) + K.l(...O, ...P, 'la') + K.l(...P, ...M, 'lf') + K.l(...P, ...N, 'lf') + esc(K, M, O, P) + esc(K, N, O, P) + K.t(28, 104, 'O', 's') + K.t(P[0] + 12, P[1] + 4, 'P', 's') + K.t(M[0], 116, 'M', 's') + K.t(N[0] - 6, N[1] - 8, 'N', 's'); },
    mediatriz(K) { const A = [70, 96], B = [270, 96], M = [170, 96], P = [170, 20]; return K.l(...A, ...B) + K.l(170, 8, 170, 108, 'lm d') + K.l(...P, ...A, 'la') + K.l(...P, ...B, 'la') + esc(K, M, B, P) + ray(K, A, M) + ray(K, M, B) + K.t(58, 100, 'A', 's') + K.t(282, 100, 'B', 's') + K.t(182, 24, 'P', 's') + K.t(170, 119, 'M', 's'); },
    hipotenusas(K) { const A = [60, 100], B = [280, 100], C = [130, 22], D = [210, 22]; return K.l(...A, ...B) + K.l(...A, ...D, 'la') + K.l(...B, ...C, 'la') + K.l(...A, ...C) + K.l(...B, ...D) + esc(K, C, A, B, 7) + esc(K, D, B, A, 7) + ray(K, A, C) + ray(K, B, D) + K.t(48, 104, 'A', 's') + K.t(292, 104, 'B', 's') + K.t(126, 16, 'C', 's') + K.t(214, 16, 'D', 's'); },
  };
  XG.renglones('razones-paso', { w: 170, x: 250, y0: 146, fondo: (K, p) => FIG[p.fig](K) });

  // ------------------------------------------------------------------------------------------------------- desigualdades
  // Un ángulo exterior y varias medidas: se tocan las que puede tener un interior no adyacente.  params { ext, ops: [grados] }
  const sitEX = (p, i) => ({ x: 170 + (i - (p.ops.length - 1) / 2) * 64, y: 178, w: 58, h: 40 });
  const solEX = p => p.ops.map((_, i) => i).filter(i => p.ops[i] < p.ext);
  XG.marca('exterior-cabe', {
    sitios: p => p.ops.map((_, i) => sitEX(p, i)), alto: () => 204, nombre: (p, i) => `${p.ops[i]} grados`,
    cara: (K, p, i) => K.t(sitEX(p, i).x, 184, `${p.ops[i]}°`, 'b'),
    fondo(K, p) {
      const B = [44, 128], C = [206, 128], A = K.at(...C, 104, p.ext), D = [322, 128];
      return K.ang(C, D, A, 24, `${p.ext}°`, 'fo', 's to') + K.ang(A, B, C, 18, '?', 'fa', 'ta') + K.p([A, B, C], 'fn') + K.l(...C, ...D, 'lm') + K.t(A[0] - 12, A[1] - 2, 'A', 's') + K.t(34, 142, 'B', 's') + K.t(206, 144, 'C', 's');
    },
    sol: solEX,
    aviso(on, p) { const i = on.findIndex((x, k) => x && p.ops[k] >= p.ext); return i < 0 ? 'Falta alguna: toda medida menor que el ángulo exterior puede ser.' : p.ops[i] === p.ext ? `${p.ops[i]}° no puede ser: el interior no adyacente es menor que el exterior, no igual.` : `${p.ops[i]}° no puede ser: pasaría del ángulo exterior, que mide ${p.ext}°.`; },
    bien: p => `El ángulo A es interior no adyacente: tiene que medir menos de ${p.ext}°.`,
    texto: p => solEX(p).map(i => `${p.ops[i]}°`).join(', '), pie: 'Toca todas las medidas posibles.',
  });

  // A mayor lado, mayor ángulo (y al revés): se ordenan los ángulos según los lados, o los lados según los ángulos. La figura no está a escala.
  //   params { l: [BC, CA, AB] }  o  { g: [A, B, C] };  fichas
  const OV = [[170, 62], [86, 160], [254, 160]];
  const rango = q => q.map(x => (x === Math.max(...q) ? 'mayor' : x === Math.min(...q) ? 'menor' : 'mediano'));
  const orden = (nombre, lados) => XG.rotula(nombre, {
    slots: () => (lados ? [{ x: 170, y: 188, w: 80, h: 34 }, { x: 292, y: 100, w: 80, h: 34 }, { x: 48, y: 100, w: 80, h: 34 }] : [{ x: 170, y: 24, w: 80, h: 34 }, { x: 46, y: 188, w: 80, h: 34 }, { x: 294, y: 188, w: 80, h: 34 }]),
    fichas: p => p.fichas, metas: p => rango(lados ? p.g : p.l), alto: () => 212,
    texto: p => rango(lados ? p.g : p.l).map((m, k) => `${lados ? ['BC', 'AC', 'AB'][k] : `∠${'ABC'[k]}`}: ${m}`).join('; '),
    fondo(K, p) {
      const G = cen(OV), S = [[OV[1], OV[2]], [OV[2], OV[0]], [OV[0], OV[1]]];
      return K.p(OV, 'fn') + (lados ? OV.map((V, k) => K.ang(V, OV[(k + 1) % 3], OV[(k + 2) % 3], 16, `${p.g[k]}°`, ['fa', 'fg', 'ff'][k], 's')).join('') + K.t(170, 52, 'A', 's tm') + K.t(74, 166, 'B', 's tm') + K.t(266, 166, 'C', 's tm')
        : S.map(([P, Q], k) => { const [x, y] = fuera(mid(P, Q), G, k ? 14 : 12); return K.t(x, y + 4, p.l[k], 's ta'); }).join('') + K.t(170, 80, 'A', 's tm') + K.t(104, 154, 'B', 's tm') + K.t(236, 154, 'C', 's tm'))
        + K.t(170, lados ? 14 : 206, 'la figura no está a escala', 's tm');
    },
    aviso(q, p) {
      const d = lados ? p.g : p.l, m = rango(d), i = m.findIndex((x, k) => q[k][0] !== x);
      if (q[i][0] === 'igual') return lados ? 'No hay dos ángulos congruentes, así que no hay dos lados congruentes.' : 'No hay dos lados congruentes, así que no hay dos ángulos congruentes.';
      return lados ? `El lado ${['BC', 'AC', 'AB'][i]} está frente al ángulo ${'ABC'[i]}, de ${d[i]}°: el ${m[i]} de los tres ángulos.` : `El ángulo ${'ABC'[i]} mira al lado ${['BC', 'AC', 'AB'][i]}, de ${d[i]}: el ${m[i]} de los tres lados.`;
    },
    bien: () => (lados ? 'A mayor ángulo se opone mayor lado.' : 'A mayor lado se opone mayor ángulo.'),
  });
  orden('angulos-por-lados', false); orden('lados-por-angulos', true);

  // Teorema de la bisagra: dos compases de patas iguales; el de la derecha se abre lo justo para ganarle (o perder) por un paso.
  //   params { a, b (patas), g (abertura del de la izquierda), menos?, ini? }  v { g }
  const O1 = [28, 166], O2 = [190, 166];
  const tercer = (p, g) => r1(Math.sqrt(p.a ** 2 + p.b ** 2 - 2 * p.a * p.b * Math.cos(rad(g))));
  const metaB = p => p.g + (p.menos ? -10 : 10);
  XG.figura('compas-bisagra', {
    ini: p => ({ g: p.ini ?? 20 }),
    manijas: p => [{ k: 'g', min: 20, max: 140, paso: 10, en: v => XPK.at(...O2, p.a * 10, v.g), de: (x, y) => Math.atan2(O2[1] - y, x - O2[0]) * 180 / Math.PI }],
    ok: (v, p) => v.g === metaB(p),
    sol: p => ({ g: metaB(p) }),
    texto: p => `$${metaB(p)}^\\circ$: el lado opuesto pasa de $${tercer(p, p.g)}$ a $${tercer(p, metaB(p))}$`,
    alto: () => 198, pie: 'Arrastra la punta del compás de la derecha.',
    dib(v, K, p, f) {
      const uno = (O, g, vivo) => {
        const Q = [O[0] + p.b * 10, O[1]], T = K.at(...O, p.a * 10, g), n = fuera(mid(Q, T), O, 13), lado = fuera(mid(O, T), Q, 10);
        return K.ang(O, Q, T, 22, `${R(g)}°`, vivo ? 'fg' : 'fa', vivo ? 's tg' : 's ta') + K.l(...O, ...Q, 'gr') + K.l(...O, ...T, vivo ? 'la gr' : 'gr') + K.l(...Q, ...T, 'lm d') + K.t((O[0] + Q[0]) / 2, O[1] + 17, p.b, 's') + K.t(lado[0], lado[1] + 4, p.a, 's')
          + K.f(f, K.l(...Q, ...T, vivo ? 'lf gr' : 'lo gr') + K.t(n[0], n[1] + 4, tercer(p, g), vivo ? 's tf' : 's to'));
      };
      return uno(O1, p.g, false) + uno(O2, v.g, true);
    },
    lee: (v, p) => `$${p.g}^\\circ \\text{ y } ${R(v.g)}^\\circ$`,
    aviso(v, p) {
      const mas = p.menos ? v.g < p.g : v.g > p.g;
      return v.g === p.g ? 'Con la misma abertura los triángulos son congruentes por L-A-L: las puntas quedan igual de separadas.' : !mas ? (p.menos ? 'Al abrir más, las puntas se alejan: quedaron más separadas, no más juntas.' : 'Al cerrar la bisagra las puntas se acercan: quedaron más juntas, no más separadas.') : `Sí quedan más ${p.menos ? 'juntas' : 'separadas'}, pero la abertura podía cambiar menos: va de 10° en 10°.`;
    },
    bien: (v, p) => `Mismas patas y ángulo ${p.menos ? 'menor' : 'mayor'}: el lado opuesto pasa de ${tercer(p, p.g)} a ${tercer(p, v.g)}.`,
  });

  // -------------------------------------------------------------------------------------------- mediatriz y bisectriz: equidistar
  // Un punto de la cuadrícula a igual distancia de A y de B, que no sea el punto medio.  params { A, B, ini, sol }
  const QX = x => 26 + x * 24, QY = y => 196 - y * 24;
  const esMedio = (v, p) => 2 * v.x === p.A[0] + p.B[0] && 2 * v.y === p.A[1] + p.B[1];
  XG.figura('punto-equidista', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [12, 7], paso: 1, en: v => [QX(v.x), QY(v.y)], de: (x, y) => [(x - 26) / 24, (196 - y) / 24] }],
    ok: (v, p) => d2([v.x, v.y], p.A) === d2([v.x, v.y], p.B) && !esMedio(v, p),
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$P$ en la mediatriz: $PA = PB = ${raiz(d2(p.sol, p.A)).replace('√', '\\sqrt{')}${Number.isInteger(Math.sqrt(d2(p.sol, p.A))) ? '' : '}'}$`,
    alto: () => 216, pie: 'Arrastra el punto P por la cuadrícula.',
    dib(v, K, p, f) {
      const A = [QX(p.A[0]), QY(p.A[1])], B = [QX(p.B[0]), QY(p.B[1])], P = [QX(v.x), QY(v.y)], M = mid(A, B), w = { x: R(v.x), y: R(v.y) }, a = d2([w.x, w.y], p.A), b = d2([w.x, w.y], p.B);
      let h = '';
      for (let x = 0; x <= 12; x++) for (let y = 0; y <= 7; y++) h += K.c(QX(x), QY(y), 1.3, 'fM');
      const na = fuera(mid(P, A), B, 12), nb = fuera(mid(P, B), A, 12);
      return h + K.l(...A, ...B, 'gr') + K.l(...P, ...A, 'la d') + K.l(...P, ...B, 'lg d') + K.c(...A, 4, 'fk') + K.c(...B, 4, 'fk') + rot(K, A, B, 'A', '', 13) + rot(K, B, A, 'B', '', 13)
        + K.f(f, K.l(...corta(M, [B[1] - A[1], A[0] - B[0]], 8, 8, 332, 208), 'lo d') + ray(K, A, M, 1, 'lo') + ray(K, M, B, 1, 'lo') + (a || b ? K.t(na[0], na[1] + 4, raiz(a), 's ta') + K.t(nb[0], nb[1] + 4, raiz(b), 's tg') : ''));
    },
    aviso(v, p) { const a = d2([v.x, v.y], p.A), b = d2([v.x, v.y], p.B); return esMedio(v, p) ? 'Ese es el punto medio de AB: equidista, pero se pidió otro punto.' : `PA mide ${raiz(a)} y PB mide ${raiz(b)}: P no está en la mediatriz de AB.`; },
    bien: (v, p) => `PA = PB = ${raiz(d2([v.x, v.y], p.A))}: P está en la mediatriz de AB.`,
  });

  // Un rayo gira dentro de un ángulo: su punto P debe quedar a igual distancia de los dos lados.  params { g, ini? }  v { t }
  const EO = [36, 184];
  const distE = (v, p) => [13 * Math.sin(rad(v.t)), 13 * Math.sin(rad(p.g - v.t))].map(r1);
  XG.figura('rayo-equidista', {
    ini: p => ({ t: p.ini ?? 10 }),
    manijas: p => [{ k: 't', min: 5, max: p.g - 5, paso: 5, en: v => XPK.at(...EO, 130, v.t), de: (x, y) => Math.atan2(EO[1] - y, x - EO[0]) * 180 / Math.PI }],
    ok: (v, p) => v.t * 2 === p.g,
    sol: p => ({ t: p.g / 2 }),
    texto: p => `la bisectriz: $${p.g}^\\circ \\div 2 = ${p.g / 2}^\\circ$ a cada lado`,
    alto: () => 204, pie: 'Arrastra el punto P para girar el rayo.',
    dib(v, K, p, f) {
      const P = K.at(...EO, 130, v.t), M = [P[0], EO[1]], N = K.at(...EO, 130 * Math.cos(rad(p.g - v.t)), p.g), L1 = [316, EO[1]], L2 = K.at(...EO, 172, p.g), [d1, dd] = distE(v, p), eq = Math.abs(v.t * 2 - p.g) < 0.01;
      const n1 = fuera(mid(P, M), EO, 14), n2 = fuera(mid(P, N), EO, 14);
      return K.ang(EO, L1, P, 40, `${R(v.t)}°`, 'fa', 's ta') + K.ang(EO, P, L2, 30, `${R(p.g - v.t)}°`, 'fg', 's tg') + K.l(...EO, ...L1) + K.l(...EO, ...L2) + K.l(...EO, ...P, 'la gr') + K.l(...P, ...M, 'lm d') + K.l(...P, ...N, 'lm d') + esc(K, M, EO, P, 7) + esc(K, N, EO, P, 7)
        + K.f(f, K.l(...P, ...M, eq ? 'lo gr' : 'lf gr') + K.l(...P, ...N, eq ? 'lo gr' : 'lf gr') + K.t(n1[0], n1[1] + 4, d1, eq ? 's to' : 's tf') + K.t(n2[0], n2[1] + 4, dd, eq ? 's to' : 's tf'));
    },
    lee: (v, p) => `$${R(v.t)}^\\circ + ${R(p.g - v.t)}^\\circ = ${p.g}^\\circ$`,
    aviso(v, p) { const [a, b] = distE(v, p); return `P quedó a ${a} de un lado y a ${b} del otro: el rayo no parte el ángulo en dos congruentes.`; },
    bien: (v, p) => `El rayo es la bisectriz: P queda a ${distE(v, p)[0]} de cada lado.`,
  });
})();
