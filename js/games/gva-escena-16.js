// Geometría Vectorial · juegos de la lección geo-16 «Producto escalar y geometría analítica» (spec 2026-11-27-curso-geometria-vectorial).
// El producto escalar describe rectas y planos: n · (X − P) = 0 es la recta (o el plano) perpendicular a n que pasa por P, y sus
// coeficientes son n. La distancia de un punto es la proyección sobre la normal; los ángulos entre rectas y planos salen de sus
// normales o directores, y el de una recta con un plano es el complemento del de la recta con la normal. Sin producto vectorial
// (geo-17 y geo-18). Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK.
(() => {
  const R = Math.PI / 180;
  const sg = n => String(n).replace('-', '−');
  const tn = n => (n < 0 ? `(${n})` : `${n}`);
  const pz = n => (n < 0 ? `(${sg(n)})` : `${n}`);
  const punto = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const largo = a => Math.sqrt(punto(a, a));
  const cl = (x, a, b) => Math.max(a, Math.min(b, x));
  // «3x − 2y + z» a partir de los coeficientes (texto plano o TeX).
  const lado = (n, tx = false, vars = 'xyz') => n.map((c, i) => {
    if (!c) return '';
    const m = Math.abs(c) === 1 ? '' : Math.abs(c), signo = c < 0 ? (tx ? '-' : '−') : '+';
    return `${i === 0 || !n.slice(0, i).some(Boolean) ? (c < 0 ? (tx ? '-' : '−') : '') : ` ${signo} `}${m}${vars[i]}`;
  }).join('') || '0';
  const ecu = (n, c, tx = false) => `${lado(n, tx)} = ${tx ? c : sg(c)}`;
  // √m simplificada en TeX: 5, 2\sqrt{3}, \sqrt{6}.
  const raiz = m => { let k = 1; for (let j = Math.floor(Math.sqrt(m)); j > 1; j--) if (m % (j * j) === 0) { k = j; break; } const r = m / (k * k); return r === 1 ? `${k}` : `${k > 1 ? k : ''}\\sqrt{${r}}`; };
  const raizP = m => raiz(m).replace(/\\sqrt\{(\d+)\}/, '√$1');
  // Papel cuadriculado de la ventana W = [x0, x1, y0, y1] con el origen en (ox, oy) y u píxeles por unidad.
  const plano = (W, ox, oy, u) => ({ W, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u, P: q => [ox + q[0] * u, oy - q[1] * u] });
  const papel = (K, P) => {
    const [x0, x1, y0, y1] = P.W;
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(P.X(x), P.Y(y0), P.X(x), P.Y(y1), x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(P.X(x0), P.Y(y), P.X(x1), P.Y(y), y ? 'ls' : 'lm');
    return h;
  };
  // Recta a x + b y = c recortada a la ventana.
  const recta = (K, P, [a, b, c], cls) => {
    const [x0, x1, y0, y1] = P.W, q = [];
    if (b) [x0, x1].forEach(x => { const y = (c - a * x) / b; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) q.push([x, y]); });
    if (a) [y0, y1].forEach(y => { const x = (c - b * y) / a; if (x >= x0 - 1e-9 && x <= x1 + 1e-9) q.push([x, y]); });
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    const A = P.P(q[0]), B = P.P(q[q.length - 1]);
    return K.l(A[0], A[1], B[0], B[1], cls);
  };
  // Escuadra (ángulo recto) en V entre las direcciones unitarias e1 y e2 (en píxeles).
  const escuadra = (K, V, e1, e2, s, cls) => K.pl([[V[0] + e1[0] * s, V[1] + e1[1] * s], [V[0] + (e1[0] + e2[0]) * s, V[1] + (e1[1] + e2[1]) * s], [V[0] + e2[0] * s, V[1] + e2[1] * s]], cls);
  const uni = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1; return [dx / L, dy / L]; };
  const sello = (K, ok, si, no) => K.t(332, 16, ok ? `${si} ✓` : `${no} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end');
  // Isométrica: x hacia el frente, y a la derecha, z arriba.
  const iso = (o, u) => (x, y, z) => [o[0] + u * y - 0.5 * u * x, o[1] + 0.45 * u * x - u * z];

  // ---------------------------------------------------------- la normal de una recta: n · (X − A) = 0 en el plano
  // La carretera pasa por A y B; se arrastra la punta del vector n que sale de A hasta que sea perpendicular a la carretera.
  //   v { a, b }   params { A, B, ini: [a, b], sol: [a, b], mira: { director, nulo, otro }, ok }
  const PN = plano([-3, 7, -3, 5], 122, 152, 24);
  const dirN = p => [p.B[0] - p.A[0], p.B[1] - p.A[1]];
  const normalOk = (v, p) => (v.a || v.b) && punto([v.a, v.b], dirN(p)) === 0;
  XG.figura('normal-de-la-carretera', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: [-3, -3], max: [3, 3], paso: 1, rot: () => 'n', en: v => PN.P([p.A[0] + v.a, p.A[1] + v.b]),
      de: (x, y) => [(x - PN.ox) / PN.u - p.A[0], (PN.oy - y) / PN.u - p.A[1]] }],
    ok: (v, p) => !!normalOk(v, p),
    sol: p => ({ a: p.sol[0], b: p.sol[1] }),
    texto: p => { const c = punto(p.sol, p.A); return `$\\vec n = (${p.sol.join(', ')})$ o un múltiplo: $${ecu(p.sol, c, true)}$`; },
    alto: () => 246, pie: 'Arrastra la punta de n, que sale de A.',
    dib(v, K, p, f) {
      const n = [v.a, v.b], d = dirN(p), c = punto(p.sol, p.A), A = PN.P(p.A), B = PN.P(p.B), T = PN.P([p.A[0] + v.a, p.A[1] + v.b]), ok = !!normalOk(v, p);
      let h = papel(K, PN) + recta(K, PN, [p.sol[0], p.sol[1], c], 'lg gr') + K.c(A[0], A[1], 5, 'fk') + K.c(B[0], B[1], 5, 'fk')
        + K.t(A[0] - 8, A[1] - 8, `A(${p.A.map(sg).join(', ')})`, 's', 'end') + K.t(B[0] + 8, B[1] + 16, `B(${p.B.map(sg).join(', ')})`, 's', 'start');
      if (v.a || v.b) h += K.ar(A[0], A[1], T[0], T[1], 'la gr');
      h += K.t(8, 16, `n = (${sg(v.a)}, ${sg(v.b)})`, 's ta', 'start');
      if (f > 0) {
        const e1 = uni(A, B), e2 = v.a || v.b ? uni(A, T) : e1, dot = punto(n, d);
        h += K.f(f * 2, ok ? escuadra(K, A, e1, e2, 11, 'lo') : (v.a || v.b ? K.arc(A[0], A[1], 18, Math.atan2(-e1[1], e1[0]) / R, Math.atan2(-e2[1], e2[0]) / R, 'lf') : ''))
          + K.f(f * 3 - 1, K.t(8, 34, `n · (B − A) = ${pz(v.a)}·${pz(d[0])} + ${pz(v.b)}·${pz(d[1])} = ${sg(dot)}`, `s ${ok ? 'to' : 'tf'}`, 'start'))
          + K.f(f * 3 - 2, sello(K, ok, ok ? ecu(n, punto(n, p.A)) : 'n ⊥ carretera', 'n no es perpendicular'));
      }
      return h;
    },
    lee: v => `$\\vec n = (${v.a}, ${v.b})$`,
    aviso: (v, p) => { const d = dirN(p); return !v.a && !v.b ? p.mira.nulo : v.a * d[1] - v.b * d[0] === 0 ? p.mira.director : p.mira.otro; },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- de la ecuación normal a la general, en el espacio
  // El techo pasa por P con normal n; se arman con fichas los cuatro números de a x + b y + c z = d.
  //   params { n, P, metas: [a, b, c, d], fichas, mira: [aviso de cada lugar], trampas: { 'i:ficha': aviso }, ok }
  const slotG = i => ({ x: 46 + 84 * i, y: 226, w: 52, h: 36 });
  XG.rotula('de-normal-a-general', {
    slots: p => p.metas.map((_, i) => slotG(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 256,
    texto: p => `$${ecu(p.n, punto(p.n, p.P), true)}$, porque $d = \\vec n \\cdot P = ${punto(p.n, p.P)}$`,
    fondo(K, p, f) {
      let h = K.p([[34, 160], [196, 160], [252, 96], [90, 96]], 'fn') + K.l(34, 160, 196, 160, 'lm') + K.l(196, 160, 252, 96, 'lm') + K.l(252, 96, 90, 96, 'lm') + K.l(90, 96, 34, 160, 'lm');
      const P = [143, 128], T = [143, 50];
      h += K.ar(P[0], P[1], T[0], T[1], 'la gr') + escuadra(K, P, [1, 0], [0, -1], 9, 'lm') + K.c(P[0], P[1], 4, 'fk')
        + K.t(P[0] - 8, P[1] + 18, `P(${p.P.map(sg).join(', ')})`, 's', 'end') + K.t(T[0] + 8, T[1] + 6, `n = (${p.n.map(sg).join(', ')})`, 's ta', 'start')
        + K.t(8, 18, 'techo: n · (X − P) = 0', 's tm', 'start') + K.t(332, 150, 'X(x, y, z)', 's tm', 'end');
      ['x +', 'y +', 'z ='].forEach((s, i) => { h += K.t((slotG(i).x + slotG(i + 1).x) / 2, 231, s, 's'); });
      h += K.t(8, 196, 'Ecuación general del techo:', 's tm', 'start');
      return h + K.f(f, K.t(332, 196, `d = n · P = ${p.n.map((c, i) => `${pz(c)}·${pz(p.P[i])}`).join(' + ')}`, 's tm', 'end'));
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------- distancia de un punto a una recta: el pie de la perpendicular
  // La casa está en Q y la carretera es a x + b y = c; se arrastra H por la carretera hasta el punto más cercano a la casa.
  //   v { t }: H = P0 + t·(b, −a)   params { abc, P0, Q, W, t0, tmin, tmax, paso, uni, mira: { vertical, horizontal, otro }, ok }
  const ventanaC = p => {
    const [x0, x1, y0, y1] = p.W, u = Math.min(28, 300 / (x1 - x0), 230 / (y1 - y0));
    return plano(p.W, 170 - (x0 + x1) / 2 * u, 34 + y1 * u, u);
  };
  const dirC = p => [p.abc[1], -p.abc[0]];
  const Hde = (p, t) => { const d = dirC(p); return [p.P0[0] + t * d[0], p.P0[1] + t * d[1]]; };
  const pieT = p => { const d = dirC(p); return punto([p.Q[0] - p.P0[0], p.Q[1] - p.P0[1]], d) / punto(d, d); };
  const distC = p => { const [a, b, c] = p.abc; return [Math.abs(a * p.Q[0] + b * p.Q[1] - c), a * a + b * b]; };
  const fracD = ([num, m], tx) => { const r = raiz(m); if (/sqrt/.test(r) && num % m === 0) { const k = num / m; return `${k === 1 ? '' : k}${tx ? `\\sqrt{${m}}` : `√${m}`}`; } if (/sqrt/.test(r)) return tx ? `\\tfrac{${num}}{${r}}` : `${num}/${raizP(m)}`; const v = num / +r; return Number.isInteger(v) ? `${v}` : tx ? `\\tfrac{${num}}{${r}}` : `${num}/${r}`; };
  const casa = (K, Q) => K.p([[Q[0] - 8, Q[1] + 7], [Q[0] + 8, Q[1] + 7], [Q[0] + 8, Q[1] - 3], [Q[0], Q[1] - 11], [Q[0] - 8, Q[1] - 3]], 'fk');
  XG.figura('casa-a-la-carretera', {
    ini: p => ({ t: p.t0 }),
    manijas: p => [{ k: 't', min: p.tmin, max: p.tmax, paso: p.paso, rot: () => 'H', en: v => ventanaC(p).P(Hde(p, v.t)),
      de: (x, y) => { const P = ventanaC(p), d = dirC(p), X = [(x - P.ox) / P.u - p.P0[0], (P.oy - y) / P.u - p.P0[1]]; return punto(X, d) / punto(d, d); } }],
    ok: (v, p) => Math.abs(v.t - pieT(p)) < 1e-9,
    sol: p => ({ t: pieT(p) }),
    texto: p => { const [a, b, c] = p.abc; return `pie $H = (${Hde(p, pieT(p)).join(', ')})$; distancia $\\tfrac{|${a} \\cdot ${tn(p.Q[0])} + ${b} \\cdot ${tn(p.Q[1])} - ${c}|}{\\sqrt{${a * a + b * b}}} = ${fracD(distC(p), true)}$ ${p.uni}`; },
    alto: p => { const P = ventanaC(p); return Math.round(P.Y(p.W[2]) + 14); },
    pie: 'Arrastra H por la carretera.',
    dib(v, K, p, f) {
      const P = ventanaC(p), Q = P.P(p.Q), H = P.P(Hde(p, v.t)), F = P.P(Hde(p, pieT(p))), ok = Math.abs(v.t - pieT(p)) < 1e-9;
      let h = papel(K, P) + recta(K, P, p.abc, 'lg gr') + casa(K, Q) + K.t(Q[0] + 12, Q[1] + 4, `Q(${p.Q.map(sg).join(', ')})`, 's', 'start')
        + K.l(Q[0], Q[1], H[0], H[1], 'la gr d') + K.t(8, 16, `carretera: ${ecu(p.abc.slice(0, 2), p.abc[2])}`, 's tg', 'start');
      if (f > 0) {
        const n = [p.abc[0], -p.abc[1]], L = Math.hypot(...n), e = [n[0] / L, n[1] / L], e2 = uni(F, P.P(Hde(p, pieT(p) + 1)));
        h += K.f(f * 2, K.l(Q[0], Q[1], F[0], F[1], 'lo gr') + escuadra(K, F, Math.sign(punto(e, [Q[0] - F[0], Q[1] - F[1]])) >= 0 ? e : [-e[0], -e[1]], e2, 9, 'lo') + K.c(F[0], F[1], 5, ok ? 'fo' : 'ff'))
          + K.f(f * 3 - 1, K.t(8, 34, `distancia = |${p.abc[0]}·${tn(p.Q[0])} + ${p.abc[1]}·${tn(p.Q[1])} − ${p.abc[2]}| / ${raizP(p.abc[0] ** 2 + p.abc[1] ** 2)} = ${fracD(distC(p))} ${p.uni}`, 's to', 'start'))
          + K.f(f * 3 - 2, sello(K, ok, 'H es el pie', 'H no es el más cercano'));
      }
      return h;
    },
    lee: (v, p) => { const H = Hde(p, v.t); return `$H = (${H.join(', ')})$`; },
    aviso: (v, p) => { const H = Hde(p, v.t); return Math.abs(H[0] - p.Q[0]) < 1e-9 ? p.mira.vertical : Math.abs(H[1] - p.Q[1]) < 1e-9 ? p.mira.horizontal : p.mira.otro; },
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- ángulo entre dos rectas: el de sus normales, el agudo
  // Dos avenidas a₁x + b₁y = c₁ y a₂x + b₂y = c₂ se cruzan; se elige el ángulo entre ellas. Al comprobar se abre el transportador.
  //   v { g }   params { L1, L2, th, g0, W, mira: { obtuso, recto, otro }, ok }
  const PA = plano([-1, 7, -1, 5], 50, 206, 30);
  const corte = p => { const [a, b, c] = p.L1, [d, e, g] = p.L2, D = a * e - b * d; return [(c * e - b * g) / D, (a * g - c * d) / D]; };
  const angRectas = p => { const n1 = p.L1.slice(0, 2), n2 = p.L2.slice(0, 2); return Math.round(Math.acos(Math.abs(punto(n1, n2)) / (largo(n1) * largo(n2))) / R); };
  XG.figura('angulo-entre-avenidas', {
    ini: p => ({ g: p.g0 }),
    manijas: () => [{ k: 'g', min: 0, max: 180, paso: 15, et: 'ángulo entre las avenidas, en grados' }],
    ok: (v, p) => v.g === p.th,
    sol: p => ({ g: p.th }),
    texto: p => { const n1 = p.L1.slice(0, 2), n2 = p.L2.slice(0, 2); return `$\\cos\\theta = \\tfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\,\\|\\vec n_2\\|} = \\tfrac{${Math.abs(punto(n1, n2))}}{\\sqrt{${punto(n1, n1)}}\\sqrt{${punto(n2, n2)}}}$, así que $\\theta = ${p.th}^{\\circ}$`; },
    alto: () => 290,
    dib(v, K, p, f) {
      const C = PA.P(corte(p)), ok = v.g === p.th;
      let h = papel(K, PA) + recta(K, PA, p.L1, 'lg gr') + recta(K, PA, p.L2, 'lf gr') + K.c(C[0], C[1], 4, 'fk')
        + K.t(8, 16, `avenida 1: ${ecu(p.L1.slice(0, 2), p.L1[2])}`, 's tg', 'start') + K.t(332, 16, `avenida 2: ${ecu(p.L2.slice(0, 2), p.L2[2])}`, 's tf', 'end')
;
      if (f > 0) {   // el transportador abre el ángulo elegido sobre la avenida 1 y marca el verdadero
        const d1 = [p.L1[1], -p.L1[0]], d2 = [p.L2[1], -p.L2[0]], a1 = Math.atan2(d1[1], d1[0]) / R;
        let a2 = Math.atan2(d2[1], d2[0]) / R, dd = ((a2 - a1) % 180 + 180) % 180;
        if (dd > 90) dd -= 180;
        const g = Math.min(1, f * 1.4), s = dd >= 0 ? 1 : -1;
        h += K.arc(C[0], C[1], 34, a1, a1 + s * v.g * g, `${ok ? 'lo' : 'lf'} gr`) + K.f(f * 2 - 0.6, K.sec(C[0], C[1], 24, a1, a1 + dd, 'fo'))
          + K.f(f * 3 - 1, K.t(8, 34, `|n₁ · n₂| / (‖n₁‖‖n₂‖) = cos ${p.th}°`, 's to', 'start'))
          + K.f(f * 3 - 2, K.t(332, 34, ok ? `${v.g}°: es el ángulo ✓` : `${v.g}°: no es el ángulo ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\theta = ${v.g}^{\\circ}$`,
    aviso: (v, p) => (v.g === 180 - p.th ? p.mira.obtuso : v.g === 90 ? p.mira.recto : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- rectas perpendiculares y paralelas por sus normales
  // Ocho senderos escritos como ecuaciones; se tocan todos los perpendiculares al sendero principal.
  //   params { L: [a, b, c], et, fl: [ecuación de cada sendero], sol: [índices], por: [aviso de cada uno], falta, ok }
  const cajaV = i => ({ x: 88 + 164 * (i % 2), y: 66 + 42 * Math.floor(i / 2), w: 156, h: 34 });
  XG.marca('veredas-perpendiculares', {
    sitios: p => p.fl.map((_, i) => cajaV(i)),
    cara: (K, p, i, on) => { const c = cajaV(i); return K.t(c.x, c.y + 5, p.fl[i], on ? 'ta' : ''); },
    fondo: (K, p) => K.t(170, 26, `${p.et}: ${ecu(p.L.slice(0, 2), p.L[2])}`, 'tg'),
    alto: () => 230, nombre: (p, i) => `sendero ${p.fl[i]}`, pie: 'Toca los senderos perpendiculares.',
    sol: p => p.sol,
    aviso: (on, p) => { const i = on.findIndex((o, k) => o && !p.sol.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => p.sol.map(i => `$${p.fl[i].replace(/−/g, '-')}$`).join(', '),
  });

  // ---------------------------------------------------------- ángulo entre planos: planos perpendiculares o paralelos
  // Un coeficiente del segundo plano es k; se ajusta k para que los planos sean perpendiculares (n₁ · n₂ = 0) o paralelos (n₂ = λ n₁).
  //   v { k }   params { n1, c1, n2: [con 'k' en un lugar], c2, modo: 'perp' | 'par', k, k0, min, max, trampas: { k: aviso }, otro, ok }
  const nK = (p, k) => p.n2.map(x => (x === 'k' ? k : x));
  const cruz0 = (a, b) => a[1] * b[2] - a[2] * b[1] === 0 && a[2] * b[0] - a[0] * b[2] === 0 && a[0] * b[1] - a[1] * b[0] === 0;
  const cumpleB = (p, k) => (p.modo === 'perp' ? punto(p.n1, nK(p, k)) === 0 : cruz0(p.n1, nK(p, k)));
  const angB = (a, b) => Math.acos(cl(Math.abs(punto(a, b)) / (largo(a) * largo(b) || 1), 0, 1)) / R;
  const isoB = p => { const m = Math.max(6, ...p.n1.map(Math.abs), ...[p.min, p.max].flatMap(k => nK(p, k).map(Math.abs))); return iso([100, 144], Math.min(11, 66 / m)); };
  const eqK = (p, k) => lado(nK(p, k));
  XG.figura('bisagra-entre-planos', {
    ini: p => ({ k: p.k0 }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k, el coeficiente que falta' }],
    ok: (v, p) => cumpleB(p, v.k),
    sol: p => ({ k: p.k }),
    texto: p => (p.modo === 'perp' ? `$k = ${p.k}$: $\\vec n_1 \\cdot \\vec n_2 = ${punto(p.n1, nK(p, p.k))}$, los planos son perpendiculares`
      : `$k = ${p.k}$: $\\vec n_2 = ${punto(nK(p, p.k), p.n1) / punto(p.n1, p.n1)}\\,\\vec n_1$, los planos son paralelos`),
    alto: () => 270,
    dib(v, K, p, f) {
      const ISB = isoB(p), n2 = nK(p, v.k), O = ISB(0, 0, 0), ok = cumpleB(p, v.k);
      let h = '';
      [[6, 0, 0, 'x'], [0, 6, 0, 'y'], [0, 0, 6, 'z']].forEach(([x, y, z, s]) => { const E = ISB(x, y, z); h += K.ar(O[0], O[1], E[0], E[1], 'lm') + K.t(E[0] + (s === 'x' ? -8 : 6), E[1] + 4, s, 's tm', s === 'x' ? 'end' : 'start'); });
      const T1 = ISB(...p.n1), T2 = ISB(...n2);
      h += K.ar(O[0], O[1], T1[0], T1[1], 'lg gr') + K.t(T1[0] + 6, T1[1] - 4, 'n₁', 's tg', 'start');
      if (largo(n2) > 0) h += K.ar(O[0], O[1], T2[0], T2[1], 'la gr') + K.t(T2[0] + 6, T2[1] + 12, 'n₂', 's ta', 'start');
      h += K.t(332, 22, `Π₁: ${ecu(p.n1, p.c1)}`, 's tg', 'end') + K.t(332, 42, `Π₂: ${eqK(p, v.k)} = ${sg(p.c2)}`, 's ta', 'end') + K.t(332, 62, `k = ${sg(v.k)}`, 's ta', 'end');
      if (f > 0) {   // la bisagra se abre al ángulo entre los planos
        const th = largo(n2) ? angB(p.n1, n2) : 0, g = Math.min(1, f * 1.3), V = [262, 190], a = 180 - th * g;
        const A = K.at(V[0], V[1], 64, 180), B = K.at(V[0], V[1], 64, a);
        h += K.l(V[0], V[1], A[0], A[1], 'lg gr') + K.l(V[0], V[1], B[0], B[1], 'la gr') + K.c(V[0], V[1], 4, 'fk')
          + K.f(f * 2 - 0.5, th > 0.5 ? K.arc(V[0], V[1], 22, a, 180, ok ? 'lo' : 'lf') + K.t(V[0] - 30, V[1] - 30, `${Math.round(th)}°`, `s ${ok ? 'to' : 'tf'}`, 'end') : K.t(V[0] - 36, V[1] - 10, 'paralelos', `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 1, K.t(332, 84, p.modo === 'perp' ? `n₁ · n₂ = ${sg(punto(p.n1, n2))}` : `n₂ ${cruz0(p.n1, n2) ? '=' : '≠'} λ n₁`, `s ${ok ? 'to' : 'tf'}`, 'end'))
          + K.f(f * 3 - 2, K.t(8, 16, ok ? (p.modo === 'perp' ? 'perpendiculares ✓' : 'paralelos ✓') : (p.modo === 'perp' ? 'no son perpendiculares ✗' : 'no son paralelos ✗'), `s ${ok ? 'to' : 'tf'}`, 'start'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec n_2 = (${nK(p, v.k).join(', ')})$`,
    aviso: (v, p) => p.trampas?.[v.k] || p.otro,
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- ángulo entre una recta y un plano: el complemento
  // Una antena con director d se apoya en un techo de normal n; se elige el ángulo entre la antena y el techo (sen φ = |d·n| / ‖d‖‖n‖).
  //   v { g }   params { n, c, d, phi, g0, mira: { normal, otro }, ok }
  const BA = [110, 160];
  XG.figura('antena-sobre-el-techo', {
    ini: p => ({ g: p.g0 }),
    manijas: () => [{ k: 'g', min: 0, max: 90, paso: 15, et: 'ángulo entre la antena y el techo, en grados' }],
    ok: (v, p) => v.g === p.phi,
    sol: p => ({ g: p.phi }),
    texto: p => `$\\operatorname{sen}\\varphi = \\tfrac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\,\\|\\vec n\\|} = \\tfrac{${Math.abs(punto(p.d, p.n))}}{\\sqrt{${punto(p.d, p.d)}}\\sqrt{${punto(p.n, p.n)}}}$, así que $\\varphi = ${p.phi}^{\\circ}$`,
    alto: () => 270,
    dib(v, K, p, f) {
      const inc = 12, A = K.at(BA[0], BA[1], 100, 180 + inc), B = K.at(BA[0], BA[1], 210, inc), N = K.at(BA[0], BA[1], 90, 90 + inc), ok = v.g === p.phi;
      let h = K.p([[A[0], A[1]], [B[0], B[1]], [B[0], B[1] + 14], [A[0], A[1] + 14]], 'fn') + K.l(A[0], A[1], B[0], B[1], 'lg gr')
        + K.ar(BA[0], BA[1], N[0], N[1], 'lm d') + K.t(N[0] - 6, N[1] + 4, 'n', 's tm', 'end') + K.c(BA[0], BA[1], 4, 'fk');
      const T = K.at(BA[0], BA[1], 110, inc + v.g);
      h += K.l(BA[0], BA[1], T[0], T[1], 'la gr') + K.c(T[0], T[1], 4, 'fA');
      h += K.t(8, 16, `techo: ${ecu(p.n, p.c)}`, 's tg', 'start') + K.t(8, 34, `antena: d = (${p.d.map(sg).join(', ')})`, 's ta', 'start') + K.t(332, 16, `φ = ${v.g}°`, 's ta', 'end');
      if (f > 0) {   // la antena de verdad aparece con su ángulo con el techo y con la normal
        const g = Math.min(1, f * 1.4), V = K.at(BA[0], BA[1], 110, inc + p.phi * g);
        h += K.l(BA[0], BA[1], V[0], V[1], `${ok ? 'lo' : 'lf'} gr d`) + K.f(f * 2 - 0.5, K.arc(BA[0], BA[1], 30, inc, inc + p.phi, 'lo') + K.arc(BA[0], BA[1], 44, inc + p.phi, 90 + inc, 'lm')
          + K.t(...K.at(BA[0] + 4, BA[1] + 4, 52, inc + p.phi / 2 - 4), `${p.phi}°`, 's to', 'start') + K.t(...K.at(BA[0], BA[1], 60, inc + (90 + p.phi) / 2), `${90 - p.phi}°`, 's tm', 'middle'))
          + K.f(f * 3 - 1, K.t(332, 34, `sen φ = ${Math.abs(punto(p.d, p.n))}/(${raizP(punto(p.d, p.d))}·${raizP(punto(p.n, p.n))})`, 's to', 'end'))
          + K.f(f * 3 - 2, K.t(332, 52, ok ? `${v.g}°: así se apoya ✓` : `${v.g}°: no es el ángulo ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: v => `$\\varphi = ${v.g}^{\\circ}$`,
    aviso: (v, p) => (v.g === 90 - p.phi ? p.mira.normal : p.mira.otro),
    bien: (v, p) => p.ok,
  });

  // ---------------------------------------------------------- en movimiento: bajar por la normal hasta la recta o el plano
  // Se fija la distancia y al soltar la sonda baja por la normal esa distancia; debe tocar justo la recta o el plano.
  //   tiro { q, de: rótulo de salida, a: rótulo de llegada, r, max, cuenta, trampas: { valor: aviso } }
  const SY = 176, SX = 170;
  XG.tiros('baja-por-la-normal', {
    perilla: t => ({ et: 'Distancia por la normal', min: 0, max: t.max, cara: v => v, lee: v => `${v} unidades` }),
    meta: t => t.r, alto: 212, ms: 1700, pie: 'Fija la distancia y suelta: la sonda baja por la normal.',
    dib(t, v, K, p, f) {
      const s = 136 / t.max, top = SY - t.r * s;
      let h = K.p([[20, SY], [320, SY], [300, SY + 22], [40, SY + 22]], 'fn') + K.l(20, SY, 320, SY, 'lg gr') + K.t(326, SY + 16, t.a, 's tg', 'end');
      for (let k = 1; k <= t.max; k++) h += K.l(SX + 44, SY - k * s, SX + 50, SY - k * s, 'lm');
      h += K.l(SX + 47, SY, SX + 47, SY - t.max * s, 'lm') + K.t(SX + 54, SY - t.max * s + 4, t.max, 's tm', 'start');
      h += K.l(SX, top, SX, SY, 'lm d') + escuadra(K, [SX, SY], [1, 0], [0, -1], 9, 'lm') + K.c(SX, top, 6, 'fk') + K.t(SX - 10, top + 4, t.de, 's', 'end');
      if (v == null) return h;
      const g = Math.min(1, f * 1.2), y = top + v * s * g, ok = v === t.r;
      h += K.l(SX, top, SX, y, 'la gr') + K.c(SX, y, 7, f >= 1 ? (ok ? 'fo' : 'ff') : 'fA');
      return h + K.f(f * 3 - 2, K.t(8, 18, ok ? `${v}: toca justo ✓` : `${v}: ${v > t.r ? 'atraviesa' : 'no llega'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'start'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} la sonda ${v > t.r ? 'se pasa' : 'se queda antes'}: reemplaza el punto en la ecuación y divide entre la norma de la normal.`,
    cuenta: t => t.cuenta,
  });
})();
