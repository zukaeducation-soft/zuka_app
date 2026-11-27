// Geometría Vectorial · juegos de la lección geo-12 «La recta» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(x).replace('-', '−');
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Fracción n/d reducida, en texto plano (−3/2) y en TeX (-\tfrac{3}{2}).
  const red = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
  const FR = (n, d = 1) => { const [a, b] = red(n, d); return b === 1 ? N(a) : `${a < 0 ? '−' : ''}${Math.abs(a)}/${b}`; };
  const FX = (n, d = 1) => { const [a, b] = red(n, d); return b === 1 ? String(a) : `${a < 0 ? '-' : ''}\\tfrac{${Math.abs(a)}}{${b}}`; };
  const pt = v => `(${v.map(N).join(', ')})`;
  const ptx = v => `(${v.join(', ')})`;
  const mas = (P, d, t) => P.map((x, i) => x + t * d[i]);
  // a + b·t en texto plano (6 − 2t) y en TeX (6 - 2t).
  const lin = (a, b, v = 't', tx = false) => {
    const m = tx ? '-' : '−', s = Math.abs(b) === 1 ? v : `${Math.abs(b)}${v}`;
    if (!b) return tx ? String(a) : N(a);
    if (!a) return b < 0 ? `${m}${s}` : s;
    return `${tx ? a : N(a)} ${b < 0 ? m : '+'} ${s}`;
  };
  // Rejilla del plano con el origen en O y u píxeles por unidad.
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  // Tramo de t que deja X = P + t·d dentro de la ventana [x0, x1, y0, y1].
  const ventana = (P, d, [x0, x1, y0, y1]) => {
    let lo = -1e9, hi = 1e9;
    [[x0, x1], [y0, y1]].forEach(([a, b], i) => {
      if (Math.abs(d[i]) < 1e-12) { if (P[i] < a || P[i] > b) { lo = 1; hi = 0; } return; }
      const t1 = (a - P[i]) / d[i], t2 = (b - P[i]) / d[i];
      lo = Math.max(lo, Math.min(t1, t2)); hi = Math.min(hi, Math.max(t1, t2));
    });
    return [lo, hi];
  };
  // Recta X = P + t·d recortada a la ventana.
  const recta = (K, Pp, P, d, win, cls) => { const [lo, hi] = ventana(P, d, win); return hi > lo ? K.l(...Pp(...mas(P, d, lo)), ...Pp(...mas(P, d, hi)), cls) : ''; };
  // Recta a x + b y = c recortada a la ventana.
  const general = (K, Pp, [a, b, c], win, cls) => {
    const P = b !== 0 ? [0, c / b] : [c / a, 0];
    return recta(K, Pp, P, [b, -a], win, cls);
  };

  // ------------------------------------------------------------ dron-por-dos-instantes · la recta por dos puntos, con t como tiempo
  // El dron está en A cuando t = 0 y en B cuando t = T. Se arrastra la punta de su velocidad v (lo que avanza en una unidad de tiempo).
  //   v { a, b }   params { A, B, T, min: [a, b], max: [a, b], ini: [a, b], uni, ok }
  const DO = [170, 110], DU = 22, DW = [-6, 6, -4, 4], DP = (x, y) => [DO[0] + x * DU, DO[1] - y * DU];
  const DS = p => ({ a: (p.B[0] - p.A[0]) / p.T, b: (p.B[1] - p.A[1]) / p.T });
  XG.figura('dron-por-dos-instantes', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: p.min, max: p.max, paso: 1, en: v => DP(p.A[0] + v.a, p.A[1] + v.b),
      de: (x, y) => [(x - DO[0]) / DU - p.A[0], (DO[1] - y) / DU - p.A[1]] }],
    ok: (v, p) => v.a * p.T === p.B[0] - p.A[0] && v.b * p.T === p.B[1] - p.A[1],
    sol: DS, texto: p => { const s = DS(p); return `$\\vec v = \\dfrac{B - A}{${p.T}} = (${s.a}, ${s.b})$, así que $X = ${ptx(p.A)} + t\\,(${s.a}, ${s.b})$`; },
    alto: () => 220, pie: 'Arrastra la punta de v: lo que avanza el dron en una hora.',
    dib(v, K, p, f) {
      const A = p.A, B = p.B, w = [v.a, v.b];
      let h = rej(K, DO, DU, DW);
      if (f > 0 && (v.a || v.b)) {
        h += K.f(f, recta(K, DP, A, w, DW, 'lm d'));
        for (let t = 1; t <= p.T; t++) {
          const X = mas(A, w, t), [x, y] = DP(...X);
          if (Math.abs(X[0]) <= 6 && Math.abs(X[1]) <= 4) h += K.f(f, K.c(x, y, 5, t === p.T ? (X[0] === B[0] && X[1] === B[1] ? 'fo' : 'ff') : 'fa') + K.t(x + 8, y + 16, `t = ${t}`, 's ta', 'start'));
        }
      }
      h += K.c(...DP(...A), 5, 'fg') + K.t(DP(...A)[0] - 6, DP(...A)[1] + 18, `A · t = 0`, 's tg', 'end');
      h += K.c(...DP(...B), 5, 'fg') + K.t(DP(...B)[0] + 8, DP(...B)[1] - 8, `B · t = ${p.T} h`, 's tg', 'start');
      h += K.ar(...DP(...A), ...DP(A[0] + v.a, A[1] + v.b), 'la gr');
      return h + K.t(14, 16, `v = ${pt(w)} ${p.uni} por hora`, 's ta', 'start');
    },
    lee: (v, p) => `$X(${p.T}) = A + ${p.T}\\vec v = ${ptx(mas(p.A, [v.a, v.b], p.T))}$`,
    aviso(v, p) {
      const D = [p.B[0] - p.A[0], p.B[1] - p.A[1]], X = mas(p.A, [v.a, v.b], p.T), cruz = v.a * D[1] - v.b * D[0], pr = v.a * D[0] + v.b * D[1];
      if (!v.a && !v.b) return 'Con v = (0, 0) el dron no se mueve: se queda siempre en A.';
      if (v.a === D[0] && v.b === D[1]) return `Con v = B − A el dron llega a B en 1 hora, no en ${p.T}: lo que avanza en una hora es (B − A)/${p.T}.`;
      if (!cruz && pr < 0) return 'Esa v apunta de B hacia A: el dron se aleja de B. La velocidad va de A hacia B.';
      if (!cruz) return `Va hacia B, pero a las ${p.T} h estaría en ${pt(X)}: ${pr > D[0] * D[0] + D[1] * D[1] ? 'se pasa' : 'no alcanza'}.`;
      return `A las ${p.T} h el dron estaría en A + ${p.T}v = ${pt(X)}, no en B: la flecha debe apuntar hacia B.`;
    },
    bien: p => p.ok || 'A + T·v = B: el dron llega a B justo a tiempo.',
  });

  // ------------------------------------------------------------ tramo-de-la-rampa · qué parte de la recta da cada intervalo de t
  // X = P + t·d. Se elige «desde» y «hasta» (−4 es −∞ y 4 es +∞); la escena pinta el tramo. Se marcan los puntos de `marcas`.
  //   v { a, b }   params { P, d, a, b, ini: [a, b], marcas: [[t, nombre]], win, ok }
  const TO = [140, 104], TU = 20, TP = (x, y) => [TO[0] + x * TU, TO[1] - y * TU];
  const INF = 4, Ta = a => (a === -INF ? '−∞' : N(a)), Tb = b => (b === INF ? '+∞' : N(b));
  const TI = (a, b, tx) => {
    const le = tx ? '\\le' : '≤', ge = tx ? '\\ge' : '≥', n = tx ? String : N;
    if (a === -INF && b === INF) return tx ? 't \\in \\mathbb{R}' : 't cualquiera';
    if (a === -INF) return `t ${le} ${n(b)}`;
    if (b === INF) return `t ${ge} ${n(a)}`;
    return `${n(a)} ${le} t ${le} ${n(b)}`;
  };
  XG.figura('tramo-de-la-rampa', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: 'a', min: -INF, max: 3, paso: 1, et: 'desde t =', rot: v => Ta(v.a) }, { k: 'b', min: -3, max: INF, paso: 1, et: 'hasta t =', rot: v => Tb(v.b) }],
    ok: (v, p) => v.a === p.a && v.b === p.b, sol: p => ({ a: p.a, b: p.b }),
    texto: p => `$${TI(p.a, p.b, true)}$`, alto: () => 262, pie: 'Desliza desde dónde y hasta dónde va t.',
    dib(v, K, p, f) {
      const W = p.win, [lo, hi] = ventana(p.P, p.d, W);
      let h = rej(K, TO, TU, W) + recta(K, TP, p.P, p.d, W, 'lm');
      if (v.a <= v.b) {
        const a = Math.max(v.a === -INF ? -99 : v.a, lo), b = Math.min(v.b === INF ? 99 : v.b, hi);
        if (b > a) {
          const A = TP(...mas(p.P, p.d, a)), B = TP(...mas(p.P, p.d, b));
          h += v.a === -INF ? K.ar(...B, ...A, 'la gr') : '';
          h += v.b === INF ? K.ar(...A, ...B, 'la gr') : '';
          if (v.a !== -INF && v.b !== INF) h += K.l(...A, ...B, 'la gr');
          if (v.a !== -INF) h += K.c(...A, 4, 'fa');
          if (v.b !== INF) h += K.c(...B, 4, 'fa');
        } else if (v.a === v.b) h += K.c(...TP(...mas(p.P, p.d, v.a)), 4, 'fa');
      }
      h += K.ar(...TP(...p.P), ...TP(...mas(p.P, p.d, 1)), 'lg gr') + K.c(...TP(...p.P), 4, 'fg') + K.t(TP(...p.P)[0] - 4, TP(...p.P)[1] + 16, 'P', 's tg', 'end');
      h += K.t(TP(...mas(p.P, p.d, 1))[0] + 4, TP(...mas(p.P, p.d, 1))[1] + 16, 'd', 's tg', 'start');
      p.marcas.forEach(([t, nom]) => { const [x, y] = TP(...mas(p.P, p.d, t)); h += K.c(x, y, 5, 'fk') + K.t(x - 6, y - 8, nom, 's', 'end'); });
      h += K.t(14, 18, `X = ${pt(p.P)} + t${pt(p.d)}`, 's tm', 'start') + K.t(14, 36, v.a > v.b ? 'ningún t' : TI(v.a, v.b), 's ta', 'start');
      if (f > 0) for (let t = Math.ceil(lo); t <= Math.floor(hi); t++) {
        if (t === 0 || t === 1) continue;
        const [x, y] = TP(...mas(p.P, p.d, t));
        h += K.f(f, K.c(x, y, 2.5, 'fn') + K.t(x + 6, y + 14, `t=${N(t)}`, 's tm', 'start'));
      }
      return h;
    },
    lee: v => (v.a > v.b ? 'Ningún $t$ cumple: el tramo está vacío.' : `$${TI(v.a, v.b, true)}$`),
    aviso(v, p) {
      const X = t => pt(mas(p.P, p.d, t));
      if (v.a > v.b) return `Con «desde ${Ta(v.a)}» y «hasta ${Tb(v.b)}» ningún t cumple: el tramo queda vacío.`;
      if ((v.a === -INF) !== (p.a === -INF) || (v.b === INF) !== (p.b === INF)) {
        if ((v.a === -INF && p.a !== -INF) || (v.b === INF && p.b !== INF)) return `Con ∞ el tramo no se acaba de ese lado: eso es un rayo. ${p.b === INF || p.a === -INF ? 'Mira cuál de los dos lados no tiene fin.' : 'Aquí los dos extremos tienen su t.'}`;
        return 'De ese lado el tramo no se detiene: t sigue sin fin, hasta ∞.';
      }
      if (v.a === 0 && v.b === 1) return 'De t = 0 a t = 1 se va de P a P + d. Aquí los extremos no son esos: busca el t de cada punto marcado.';
      if (v.a === -p.b && v.b === -p.a) return 'Ese tramo queda del otro lado de P: los t negativos van en contra de d.';
      const ex = [v.a === -INF ? 'sigue sin fin hacia atrás' : `con t = ${N(v.a)} estás en ${X(v.a)}`, v.b === INF ? 'sigue sin fin hacia adelante' : `con t = ${N(v.b)} estás en ${X(v.b)}`];
      return `El tramo ${ex[0]} y ${ex[1]}: busca qué t le toca a cada punto marcado.`;
    },
    bien: p => p.ok || 'Ese intervalo de t dibuja justo el tramo pedido.',
  });

  // ------------------------------------------------------------ inclinacion-del-director · ángulo de inclinación y pendiente
  // Se gira una recta que pasa por O; tiene que quedar con la dirección del director d. Al comprobar, d y m = d₂/d₁ = tan θ.
  //   v { g }   params { d, ini, et, ok }
  const IO = [170, 104];
  const IG = p => { let g = Math.atan2(p.d[1], p.d[0]) * 180 / Math.PI; g = ((g % 180) + 180) % 180; return Math.round(g); };
  const tg = g => Math.round(Math.tan(g * Math.PI / 180) * 100) / 100;
  const raya = (K, g, cls, L = 150) => { const c = Math.cos(g * Math.PI / 180), s = Math.sin(g * Math.PI / 180), t = Math.min(L, Math.abs(s) > 1e-9 ? 76 / Math.abs(s) : L, Math.abs(c) > 1e-9 ? 150 / Math.abs(c) : L); return K.l(IO[0] - c * t, IO[1] + s * t, IO[0] + c * t, IO[1] - s * t, cls); };
  XG.figura('inclinacion-del-director', {
    ini: p => ({ g: p.ini }),
    manijas: () => [{ k: 'g', min: 0, max: 165, paso: 15, et: 'θ, ángulo de inclinación', rot: v => `${v.g}°` }],
    ok: (v, p) => v.g === IG(p), sol: p => ({ g: IG(p) }),
    texto: p => { const g = IG(p); return g === 90 ? '$\\theta = 90^{\\circ}$: recta vertical, sin pendiente' : `$m = \\dfrac{d_2}{d_1} = ${FX(p.d[1], p.d[0])} = \\tan ${g}^{\\circ}$, así que $\\theta = ${g}^{\\circ}$`; },
    alto: () => 244, pie: 'Desliza θ para girar la recta.',
    dib(v, K, p, f) {
      let h = K.l(20, IO[1], 320, IO[1], 'lm') + K.l(IO[0], 14, IO[0], 194, 'lm') + K.t(318, IO[1] - 6, 'x', 's tm', 'end');
      h += raya(K, v.g, 'la gr') + K.arc(IO[0], IO[1], 30, 0, v.g, 'la') + K.t(...K.at(IO[0], IO[1] + 5, 46, Math.max(v.g / 2, 8)), 'θ', 's ta');
      h += K.c(...IO, 4, 'fg') + K.t(14, 20, `${p.et}: d = ${pt(p.d)}`, 's tg', 'start');
      if (f > 0) {
        const n = Math.hypot(...p.d), u = 56 / n, q = [IO[0] + p.d[0] * u, IO[1] - p.d[1] * u];
        h += K.f(f, raya(K, IG(p), 'lg d') + K.ar(...IO, ...q, 'lg gr') + K.t(q[0] + (p.d[0] < 0 ? -8 : 8), q[1] - 6, 'd', 's tg', p.d[0] < 0 ? 'end' : 'start'));
        h += K.f(f, K.r(196, 4, 140, 44, 'fc', 8) + K.t(330, 22, p.d[0] ? `m = d₂/d₁ = ${FR(p.d[1], p.d[0])}` : 'd₁ = 0: sin pendiente', 's ta', 'end')
          + K.t(330, 40, v.g === 90 ? 'θ = 90°: vertical' : `tan ${v.g}° ≈ ${N(tg(v.g))}`, 's tm', 'end'));
      }
      return h;
    },
    lee: v => (v.g === 90 ? '$\\theta = 90^{\\circ}$: recta vertical' : `$\\tan ${v.g}^{\\circ} \\approx ${tg(v.g)}$`),
    aviso(v, p) {
      const m = p.d[0] ? p.d[1] / p.d[0] : null;
      if (v.g === 90) return 'Vertical: así d₁ sería 0. Este director avanza en x, así que la recta tiene pendiente.';
      if (v.g === 0) return 'Horizontal: pendiente 0. Este director sube o baja, así que la recta está inclinada.';
      if (m != null && Math.abs(tg(v.g) + m) < 0.02) return `Esa recta tiene pendiente ${N(-m)}: el signo está al revés. Con m = ${FR(p.d[1], p.d[0])} la recta ${m < 0 ? 'baja' : 'sube'} hacia la derecha.`;
      if (m != null && Math.abs(tg(v.g) * m - 1) < 0.02) return `Con θ = ${v.g}°, tan θ ≈ ${N(tg(v.g))}: es d₁/d₂, al revés. La pendiente es lo que sube entre lo que avanza: d₂/d₁.`;
      return `Con θ = ${v.g}°, tan θ ≈ ${N(tg(v.g))}, pero el director pide m = d₂/d₁ = ${FR(p.d[1], p.d[0])}.`;
    },
    bien: p => p.ok || 'tan θ = d₂/d₁: la recta quedó con la dirección de d.',
  });

  // ------------------------------------------------------------ convierte-forma-recta · de la vectorial a las escalares
  // X = P + t·d. Se ponen la pendiente, el intercepto y la forma general a x + b y = c (a > 0, sin factor común).
  //   params { P, d, extra, trampas?, ok }
  const CS = [{ x: 196, y: 60, w: 66, h: 34 }, { x: 196, y: 118, w: 66, h: 34 }, { x: 40, y: 170, w: 50, h: 34 }, { x: 132, y: 170, w: 50, h: 34 }, { x: 232, y: 170, w: 56, h: 34 }];
  const CG = p => { let a = p.d[1], b = -p.d[0]; const g = gcd(a, b) || 1; a /= g; b /= g; if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; } return [a, b, a * p.P[0] + b * p.P[1]]; };
  const CM = p => { const [a, b, c] = CG(p); return [FR(p.d[1], p.d[0]), FR(p.P[1] * p.d[0] - p.d[1] * p.P[0], p.d[0]), N(a), N(b), N(c)]; };
  XG.rotula('convierte-forma-recta', {
    slots: () => CS, metas: CM, fichas: p => [...CM(p), ...p.extra], alto: () => 212,
    texto: p => { const [a, b, c] = CG(p); return `$m = ${FX(p.d[1], p.d[0])}$, $y = ${FX(p.d[1], p.d[0])}x + ${FX(p.P[1] * p.d[0] - p.d[1] * p.P[0], p.d[0])}$ y $${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}y = ${c}$`; },
    fondo(K, p, f) {
      const [a, b, c] = CG(p);
      let h = K.t(14, 24, `X = ${pt(p.P)} + t${pt(p.d)}`, 'ta', 'start');
      h += K.t(150, 65, 'pendiente: m =', 's', 'end') + K.t(14, 94, `despeja y en y − ${N(p.P[1])} = m(x − ${N(p.P[0])}):`, 's tm', 'start') + K.t(150, 123, 'y = mx +', 's', 'end');
      h += K.t(14, 148, 'general:', 's tm', 'start') + K.t(70, 175, 'x +', 's', 'start') + K.t(162, 175, 'y =', 's', 'start');
      return h + K.f(f, K.t(330, 64, `normal (${N(a)}, ${N(b)})`, 's ta', 'end') + K.t(330, 82, `⟂ d = ${pt(p.d)}`, 's tm', 'end')
        + K.t(330, 206, `en ${pt(p.P)}: ${N(a)}·${N(p.P[0])} + ${N(b)}·${N(p.P[1])} = ${N(c)}`, 's ta', 'end'));
    },
    aviso(q, p) {
      const ms = CM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'La pendiente es lo que sube el director entre lo que avanza: m = d₂/d₁.',
        'Despeja y: el intercepto es y₀ − m·x₀, con el punto (x₀, y₀) de la recta.',
        'En la general a x + b y = c, el par (a, b) es un normal: (d₂, −d₁) o un múltiplo, aquí con a positivo y sin factor común.',
        'b acompaña a y: con el normal (d₂, −d₁), b = −d₁ (o el mismo múltiplo que usaste para a).',
        'c sale de poner el punto P en a x + b y: c = a·x₀ + b·y₀.'][i];
    },
    bien: p => p.ok || 'Las tres formas describen la misma recta: el punto P las cumple todas.',
  });

  // ------------------------------------------------------------ paralelas-en-otra-forma · paralelas aunque estén escritas distinto
  // Ocho rectas en formas distintas; se tocan las paralelas a la de referencia (director proporcional).
  //   params { ref, md: director de la referencia, rs: [{ t, d }] × 8, por: [aviso de cada una que no es paralela], falta, ok }
  const PC = i => ({ x: 88 + 164 * (i % 2), y: 62 + 42 * Math.floor(i / 2), w: 158, h: 34 });
  const PS = p => p.rs.map((r, i) => (r.d[0] * p.md[1] - r.d[1] * p.md[0] === 0 ? i : -1)).filter(i => i >= 0);
  XG.marca('paralelas-en-otra-forma', {
    sitios: p => p.rs.map((_, i) => PC(i)),
    cara: (K, p, i, on) => { const c = PC(i); return K.t(c.x, c.y + 5, p.rs[i].t, on ? 's ta' : 's'); },
    fondo: (K, p) => K.t(170, 24, `L: ${p.ref}`, 'ta'),
    alto: () => 222, nombre: (p, i) => p.rs[i].t, pie: 'Toca las rectas paralelas a L.',
    sol: PS,
    aviso: (on, p) => { const s = PS(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => PS(p).map(i => p.rs[i].t).join('; '),
  });

  // ------------------------------------------------------------ muelle-perpendicular · perpendicular por un punto, con el normal
  // La costa es a x + b y = c. Desde el faro Q se arrastra la punta del director w del muelle, que debe ser perpendicular a la costa.
  //   v { a, b }   params { L: [a, b, c], Q, ini: [a, b], ok }
  const MO = [170, 100], MU = 20, MW = [-5, 5, -5, 4], MP = (x, y) => [MO[0] + x * MU, MO[1] - y * MU];
  const MS = p => { const [a, b] = p.L, g = gcd(a, b); return { a: a / g, b: b / g }; };
  XG.figura('muelle-perpendicular', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => [{ k: ['a', 'b'], min: -3, max: 3, paso: 1, en: v => MP(p.Q[0] + v.a, p.Q[1] + v.b), de: (x, y) => [(x - MO[0]) / MU - p.Q[0], (MO[1] - y) / MU - p.Q[1]] }],
    ok: (v, p) => (v.a !== 0 || v.b !== 0) && v.a * p.L[1] - v.b * p.L[0] === 0,
    sol: MS, texto: p => { const [a, b] = p.L; return `$\\vec w = (${a}, ${b})$, el normal de la costa (o un múltiplo): $m_1 m_2 = ${FX(-a, b)} \\cdot ${FX(b, a)} = -1$`; },
    alto: () => 214, pie: 'Arrastra la punta de w desde el faro.',
    dib(v, K, p, f) {
      const [a, b, c] = p.L, w = [v.a, v.b];
      let h = rej(K, MO, MU, MW) + general(K, MP, p.L, MW, 'lg gr') + K.t(330, 16, `costa: ${N(a)}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}y = ${N(c)}`, 's tg', 'end');
      if (v.a || v.b) h += recta(K, MP, p.Q, w, MW, 'la d');
      h += K.c(...MP(...p.Q), 5, 'fk') + K.t(MP(...p.Q)[0] - 8, MP(...p.Q)[1] + 18, 'faro', 's', 'end');
      h += K.ar(...MP(...p.Q), ...MP(p.Q[0] + v.a, p.Q[1] + v.b), 'la gr') + K.t(14, 16, `w = ${pt(w)}`, 's ta', 'start');
      if (f > 0) {
        const den = a * v.a + b * v.b;
        if (den !== 0) {
          const s = (c - a * p.Q[0] - b * p.Q[1]) / den, X = mas(p.Q, w, s), [x, y] = MP(...X), ok = v.a * b - v.b * a === 0;
          if (Math.abs(X[0]) <= 5 && X[1] >= -5 && X[1] <= 4) {
            h += K.f(f, K.c(x, y, 5, ok ? 'fo' : 'ff'));
            if (ok) { const n = Math.hypot(a, b), sg = Math.sign(a * p.Q[0] + b * p.Q[1] - c) || 1, e = [sg * a / n * 10, -sg * b / n * 10], g = [b / n * 10, a / n * 10]; h += K.f(f, K.pl([[x + e[0], y + e[1]], [x + e[0] + g[0], y + e[1] + g[1]], [x + g[0], y + g[1]]], 'lo')); }
          }
        }
        h += K.f(f, K.r(14, 176, 182, 32, 'fc', 8) + K.t(22, 196, b && v.a ? `m₁·m₂ = ${FR(-a, b)} · ${FR(v.b, v.a)} = ${FR(-a * v.b, b * v.a)}` : 'una de las dos es vertical', 's ta', 'start'));
      }
      return h;
    },
    lee: (v, p) => `$\\vec w = (${v.a}, ${v.b})$`,
    aviso(v, p) {
      const [a, b] = p.L;
      if (!v.a && !v.b) return 'Con w = (0, 0) no hay dirección: arrastra la punta lejos del faro.';
      if (a * v.a + b * v.b === 0) return `Ese muelle corre paralelo a la costa: w es un director de la costa. El perpendicular sigue al normal (${N(a)}, ${N(b)}).`;
      if (!v.a) return 'Muelle vertical: solo sería perpendicular a una costa horizontal, y esta no lo es.';
      const m1 = -a / b, m2 = v.b / v.a;
      if (b && Math.abs(m2 + m1) < 1e-9) return `Solo cambiaste el signo de la pendiente de la costa (${FR(-a, b)}): también hay que invertirla, para que el producto dé −1.`;
      if (b && Math.abs(m2 * m1 - 1) < 1e-9) return `Solo invertiste la pendiente de la costa (${FR(-a, b)}): falta cambiarle el signo, para que el producto dé −1.`;
      return b ? `Pendientes ${FR(-a, b)} y ${FR(v.b, v.a)}: su producto es ${FR(-a * v.b, b * v.a)}, no −1.` : 'La costa es vertical: el muelle tendría que ser horizontal.';
    },
    bien: p => p.ok || 'w es paralelo al normal de la costa: el muelle llega a ella en ángulo recto.',
  });

  // ------------------------------------------------------------ rutas-aereas-cruzadas · en el espacio: se cortan o se cruzan
  // L₁: P₁ + t·d₁ y L₂: P₂ + s·d₂, con la altura de P₂ igual a k. Las sombras en el piso siempre se cortan; las rutas, solo con un k.
  //   v { k }   params { P1, d1, P2: [x, y, 'k'], d2, min, max, ini, ok }
  const RS = p => {   // t y s donde se cortan las sombras (componentes x, y)
    const [a, b] = [p.d1[0], -p.d2[0]], [c, d] = [p.d1[1], -p.d2[1]], e = p.P2[0] - p.P1[0], g = p.P2[1] - p.P1[1], D = a * d - b * c;
    return [(e * d - b * g) / D, (a * g - e * c) / D];
  };
  const RK = p => { const [t, s] = RS(p); return Math.round(p.P1[2] + t * p.d1[2] - s * p.d2[2]); };
  const R2 = (p, k) => [p.P2[0], p.P2[1], k];
  const RV = (x, y, z) => [x - 0.5 * y, 0.25 * x + 0.35 * y - z];   // x a la derecha, y hacia quien mira, z hacia arriba
  const RF = p => {   // proyección que cabe en el lienzo para todos los k
    const [t, s] = RS(p), pts = [];
    for (let k = p.min; k <= p.max; k++) [-2.5, 2.5].forEach(e => { pts.push(mas(p.P1, p.d1, t + e), mas(R2(p, k), p.d2, s + e)); });
    pts.forEach(q => pts.push([q[0], q[1], 0]));
    const V = pts.map(q => RV(...q)), x0 = Math.min(...V.map(q => q[0])), x1 = Math.max(...V.map(q => q[0])), y0 = Math.min(...V.map(q => q[1])), y1 = Math.max(...V.map(q => q[1]));
    const u = Math.min(300 / (x1 - x0), 150 / (y1 - y0)), ox = 170 - (x0 + x1) / 2 * u, oy = 52 - y0 * u;
    return q => { const [a, b] = RV(...q); return [ox + a * u, oy + b * u]; };
  };
  XG.figura('rutas-aereas-cruzadas', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k: altura de P₂' }],
    ok: (v, p) => v.k === RK(p), sol: p => ({ k: RK(p) }),
    texto: p => { const [t, s] = RS(p); return `$k = ${RK(p)}$: con $t = ${t}$ y $s = ${s}$ las dos rutas pasan por $${ptx(mas(p.P1, p.d1, t))}$`; },
    alto: () => 290, pie: 'Desliza k: sube o baja la ruta L₂.',
    dib(v, K, p, f) {
      const C = RF(p), [t, s] = RS(p), P2 = R2(p, v.k), seg = (P, d, c, cls) => K.l(...C(mas(P, d, c - 2.5)), ...C(mas(P, d, c + 2.5)), cls), piso = q => [q[0], q[1], 0];
      let h = K.l(...C(piso(mas(p.P1, p.d1, t - 2.5))), ...C(piso(mas(p.P1, p.d1, t + 2.5))), 'lm d') + K.l(...C(piso(mas(P2, p.d2, s - 2.5))), ...C(piso(mas(P2, p.d2, s + 2.5))), 'lm d');
      h += K.c(...C(piso(mas(p.P1, p.d1, t))), 3, 'fn') + seg(p.P1, p.d1, t, 'la gr') + seg(P2, p.d2, s, 'lg gr');
      h += K.t(...C(mas(p.P1, p.d1, t + 2.5)).map((q, i) => q + [6, 4][i]), 'L₁', 's ta', 'start') + K.t(...C(mas(P2, p.d2, s + 2.5)).map((q, i) => q + [6, 4][i]), 'L₂', 's tg', 'start');
      h += K.t(14, 18, `L₁: X = ${pt(p.P1)} + t${pt(p.d1)}`, 's ta', 'start') + K.t(14, 36, `L₂: X = ${pt(P2)} + s${pt(p.d2)}`, 's tg', 'start');
      if (f > 0) {
        const A = mas(p.P1, p.d1, t), B = mas(P2, p.d2, s), sh = C(piso(A)), corta = Math.abs(A[2] - B[2]) < 1e-9;
        h += K.f(f, K.l(...sh, ...C(A), 'lf d') + K.l(...sh, ...C(B), 'lf d') + K.c(...C(A), 4, corta ? 'fo' : 'fa') + K.c(...C(B), 4, corta ? 'fo' : 'fg'));
        h += K.f(f, K.t(170, 220, `z₁ = ${N(A[2])}, z₂ = ${N(B[2])}: ${corta ? `se cortan en ${pt(A)}` : 'se cruzan sin tocarse'}`, `s ${corta ? 'to' : 'ta'}`));
      }
      return h;
    },
    lee: (v, p) => { const [t, s] = RS(p); return `$z_1 = ${mas(p.P1, p.d1, t)[2]}$, $z_2 = ${mas(R2(p, v.k), p.d2, s)[2]}$`; },
    aviso(v, p) {
      const [t, s] = RS(p), A = mas(p.P1, p.d1, t), B = mas(R2(p, v.k), p.d2, s);
      return `Con k = ${N(v.k)}: las sombras se cortan con t = ${N(t)} y s = ${N(s)}, pero allí L₁ va a altura ${N(A[2])} y L₂ a ${N(B[2])}. Las rutas se cruzan sin tocarse.`;
    },
    bien: p => p.ok || 'Con ese k las dos rutas pasan por el mismo punto: se cortan.',
  });

  // ------------------------------------------------------------ instante-del-cruce · en movimiento: el t en que se llega a una línea
  // Cada tiro: X = P + t·d (plano o espacio) y una condición «coordenada eje = valor». Se fija t y el móvil avanza hasta X(t).
  //   params { tiros: [{ q, P, d, eje, valor, ver: [dos ejes que se dibujan], linea, r, e? }] }
  const EJ = ['x', 'y', 'z'];
  const IF = t => {   // ventana del tiro
    const pts = []; for (let k = 0; k <= 8; k++) pts.push(mas(t.P, t.d, k));
    const X = pts.map(q => q[t.ver[0]]), Y = pts.map(q => q[t.ver[1]]);
    (t.eje === t.ver[0] ? X : Y).push(t.valor);
    const x0 = Math.min(...X), x1 = Math.max(...X), y0 = Math.min(...Y), y1 = Math.max(...Y), u = Math.min(276 / (x1 - x0 || 1), 112 / (y1 - y0 || 1));
    const ox = 170 - (x0 + x1) / 2 * u, oy = 126 + (y0 + y1) / 2 * u;
    return { C: q => [ox + q[t.ver[0]] * u, oy - q[t.ver[1]] * u], x0, x1, y0, y1, ox, oy, u };
  };
  XG.tiros('instante-del-cruce', {
    perilla: () => ({ et: 't', min: 0, max: 8, cara: v => (v ? String(v) : ''), lee: v => `t = ${v}` }), meta: t => t.r, alto: 200, ms: 1600,
    dib(t, v, K, p, f) {
      const W = IF(t), C = W.C;
      let h = K.l(...C(t.P), ...C(mas(t.P, t.d, 8)), 'lm d');
      for (let k = 0; k <= 8; k++) h += K.c(...C(mas(t.P, t.d, k)), 2.5, 'fn');
      if (t.eje === t.ver[0]) { const x = W.ox + t.valor * W.u; h += K.l(x, 60, x, 192, 'lg gr') + K.t(x + 6, 72, t.linea, 's tg', 'start'); }
      else { const y = W.oy - t.valor * W.u; h += K.l(16, y, 324, y, 'lg gr') + K.t(324, y - 6, t.linea, 's tg', 'end'); }
      h += K.t(...C(t.P).map((q, i) => q + [8, -8][i]), 't = 0', 's tm', 'start');
      h += K.t(14, 20, t.P.length === 3 ? `vista de lado: ejes ${EJ[t.ver[0]]} y ${EJ[t.ver[1]]}` : 'el plano xy', 's tm', 'start');
      if (v != null && v > 0) {
        const s = Math.min(1, f * 1.15), X = mas(t.P, t.d, v * s), [x, y] = C(X), bien = v === t.r;
        h += f >= 1 ? K.c(x, y, 8, bien ? 'fo' : 'ff') + K.t(x, y - 14, pt(mas(t.P, t.d, v)), 's') : K.c(x, y, 7, 'fa');
      } else h += K.c(...C(t.P), 7, 'fa');
      return h;
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      const X = mas(t.P, t.d, v), q = X[t.eje], q0 = t.P[t.eje], pasa = (q - t.valor) * (q0 - t.valor) < 0;
      return `A t = ${v} está en ${pt(X)}: ${pasa ? 'ya pasó la línea' : 'todavía no llega'}. Iguala ${EJ[t.eje]} = ${N(t.valor)} y despeja t.`;
    },
    cuenta: t => `$${lin(t.P[t.eje], t.d[t.eje], 't', true)} = ${t.valor} \\Rightarrow t = ${t.r}$`,
    pie: 'Estira hasta el instante y suelta.',
  });
})();
