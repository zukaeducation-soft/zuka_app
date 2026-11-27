// Geometría Vectorial · juegos de la lección geo-19 «Fuerzas coplanarias y concurrentes» (spec 2026-11-27-curso-geometria-vectorial).
// La fuerza como vector: resultante gráfica y por componentes, magnitud y dirección, equilibrio (polígono cerrado y equilibrante),
// tensiones en dos cables, el peso en una rampa y una fuerza en el espacio. La cinemática es de geo-20; el trabajo y el momento, de
// geo-21. Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const pt = v => `(${v.map(N).join(', ')})`;
  // Coseno y seno de un ángulo en grados; los de 0°, 30°, 37°, 45°, 53°, 60° y 90° quedan exactos (37° y 53° con el 3-4-5).
  const cs = g => {
    const r = g * Math.PI / 180, fix = x => { for (const k of [0, 0.5, 0.6, 0.8, 1]) if (Math.abs(Math.abs(x) - k) < 0.01) return Math.sign(x) * k; return x; };
    return [fix(Math.cos(r)), fix(Math.sin(r))];
  };
  const r2 = x => Math.round(x * 100) / 100;
  // Rejilla con el origen en O y u píxeles por unidad, en la ventana [x0, x1, y0, y1].
  const rej = (K, O, u, [x0, x1, y0, y1]) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const suma = fs => fs.reduce((s, f) => [s[0] + f[0], s[1] + f[1]], [0, 0]);

  // ------------------------------------------------------------ remolcadores-resultante · la resultante gráfica (paralelogramo)
  // Dos remolcadores tiran de una barcaza con F₁ y F₂ (cada cuadro vale u newtons). Se arrastra la punta de R.
  //   v { a, b }   params { F: [F₁, F₂], u, ini, ok }
  const RO = [60, 124], RU = 22, RW = [-2, 10, -4, 4], RP = (x, y) => [RO[0] + x * RU, RO[1] - y * RU];
  XG.figura('remolcadores-resultante', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: ['a', 'b'], min: [RW[0], RW[2]], max: [RW[1], RW[3]], paso: 1, en: v => RP(v.a, v.b), de: (x, y) => [(x - RO[0]) / RU, (RO[1] - y) / RU] }],
    ok: (v, p) => { const S = suma(p.F); return v.a === S[0] && v.b === S[1]; },
    sol: p => { const S = suma(p.F); return { a: S[0], b: S[1] }; },
    texto: p => { const S = suma(p.F), u = p.u; return `$\\vec R = \\vec F_1 + \\vec F_2 = (${S[0] * u}, ${S[1] * u})$ N, de magnitud $${Math.hypot(...S) * u}$ N`; },
    alto: () => 236, pie: 'Arrastra la punta de R desde la barcaza.',
    dib(v, K, p, f) {
      const [F1, F2] = p.F, S = suma(p.F), u = p.u;
      let h = rej(K, RO, RU, RW);
      if (f > 0) {
        h += K.f(f, K.l(...RP(...F1), ...RP(...S), 'lm d') + K.l(...RP(...F2), ...RP(...S), 'lm d') + K.c(...RP(...S), 5, 'fo'));
        h += K.f(f, K.t(330, 229, `R = ${pt([S[0] * u, S[1] * u])} N`, 's to', 'end'));
      }
      h += K.ar(...RO, ...RP(...F1), 'lg gr') + K.t(RP(...F1)[0] + 6, RP(...F1)[1] - 4, 'F₁', 's tg', 'start');
      h += K.ar(...RO, ...RP(...F2), 'lf gr') + K.t(RP(...F2)[0] + 6, RP(...F2)[1] + 12, 'F₂', 's tf', 'start');
      h += K.r(RO[0] - 14, RO[1] - 7, 28, 14, 'fk', 4) + K.ar(...RO, ...RP(v.a, v.b), 'la gr');
      h += K.t(14, 16, `F₁ = ${pt(F1.map(x => x * u))} N · F₂ = ${pt(F2.map(x => x * u))} N`, 's tm', 'start');
      return h + K.t(14, 229, `R = ${pt([v.a * u, v.b * u])} N`, 's ta', 'start');
    },
    lee: (v, p) => `$\\vec R = (${v.a * p.u}, ${v.b * p.u})$ N`,
    aviso(v, p) {
      const [F1, F2] = p.F, S = suma(p.F), es = q => v.a === q[0] && v.b === q[1];
      if (!v.a && !v.b) return 'Con R = 0 la barcaza no se movería: los dos remolcadores sí tiran.';
      if (es(F1) || es(F2)) return 'Esa es la fuerza de un solo remolcador: la resultante junta las dos.';
      if (es([F1[0] - F2[0], F1[1] - F2[1]]) || es([F2[0] - F1[0], F2[1] - F1[1]])) return 'Esa es una resta: la resultante es la suma, la diagonal del paralelogramo que forman F₁ y F₂.';
      if (v.a === S[0]) return `En x vas bien; en y, F₁ y F₂ aportan ${N(F1[1] * p.u)} y ${N(F2[1] * p.u)} N: súmalas con su signo.`;
      if (v.b === S[1]) return `En y vas bien; en x, F₁ y F₂ aportan ${N(F1[0] * p.u)} y ${N(F2[0] * p.u)} N: súmalas.`;
      return 'Pon F₂ a continuación de F₁ (punta con cola): la resultante va del origen hasta donde termina F₂.';
    },
    bien: p => p.ok || 'R es la diagonal del paralelogramo: la suma de las dos fuerzas.',
  });

  // ------------------------------------------------------------ trineo-por-componentes · F cos θ, F sen θ y la resultante
  // Dos cuerdas tiran de un trineo con fuerzas dadas por magnitud y ángulo; se ponen sus componentes y las de R.
  //   params { F: [[magnitud, ángulo], [magnitud, ángulo]], extra, trampas?, ok }
  const TS = [62, 106, 150].flatMap(y => [{ x: 232, y, w: 56, h: 32 }, { x: 298, y, w: 56, h: 32 }]);
  const TC = p => p.F.map(([m, g]) => cs(g).map(c => r2(m * c)));
  const TM = p => { const [a, b] = TC(p); return [...a, ...b, r2(a[0] + b[0]), r2(a[1] + b[1])].map(N); };
  const TO = [66, 112], TE = 0.75;
  XG.rotula('trineo-por-componentes', {
    slots: () => TS, metas: TM, fichas: p => [...TM(p), ...p.extra], alto: () => 176,
    texto: p => { const m = TM(p).map(s => s.replace('−', '-')); return `$\\vec F_1 = (${m[0]}, ${m[1]})$, $\\vec F_2 = (${m[2]}, ${m[3]})$ y $\\vec R = (${m[4]}, ${m[5]})$ N`; },
    fondo(K, p, f) {
      const [a, b] = TC(p), R = [a[0] + b[0], a[1] + b[1]], Q = q => [TO[0] + q[0] * TE, TO[1] - q[1] * TE];
      let h = K.l(14, TO[1], 168, TO[1], 'lm d') + K.r(TO[0] - 16, TO[1] - 8, 32, 16, 'fk', 4);
      p.F.forEach(([m, g], i) => {
        const q = Q(i ? b : a);
        h += K.ar(...TO, ...q, `${i ? 'lf' : 'lg'} gr`) + K.arc(...TO, 22 + i * 8, 0, g, i ? 'lf' : 'lg');
        h += K.t(q[0] + (i ? 4 : -2), q[1] + (i ? 14 : -6), `${m} N · ${N(g)}°`, `s ${i ? 'tf' : 'tg'}`, i ? 'start' : 'middle');
      });
      h += K.f(f, K.ar(...TO, ...Q(R), 'lo gr') + K.t(Q(R)[0] - 2, Q(R)[1] - 8, 'R', 's to', 'end'));
      h += K.t(232, 34, 'en x', 's tm') + K.t(298, 34, 'en y', 's tm');
      return h + ['F₁', 'F₂', 'R'].map((s, i) => K.t(196, 67 + 44 * i, s, i === 2 ? 'ta' : '', 'end')).join('');
    },
    aviso(q, p) {
      const ms = TM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'La componente en x es la magnitud por el coseno del ángulo con el eje x.',
        'La componente en y es la magnitud por el seno del ángulo con el eje x.',
        'En x: magnitud por coseno. Si el ángulo es negativo, el coseno sigue siendo positivo.',
        'En y: magnitud por seno. Un ángulo por debajo del eje x da una componente negativa.',
        'Rx es la suma de las componentes en x, cada una con su signo.',
        'Ry es la suma de las componentes en y, cada una con su signo.'][i];
    },
    bien: p => p.ok || 'Las componentes se suman por separado: así sale la resultante.',
  });

  // ------------------------------------------------------------ globo-magnitud-rumbo · magnitud y dirección de la resultante
  // Fuerzas sobre un globo (en N); se desliza la magnitud de R y su ángulo con el eje x positivo, de una lista de ángulos.
  //   v { m, i }   params { F: [[x, y, nombre]], angs, max, ini: [m, i], ok }
  const GO = [190, 172], GE = 1.4;
  const GR = p => { const S = suma(p.F); return { M: Math.round(Math.hypot(...S)), G: Math.round(((Math.atan2(S[1], S[0]) * 180 / Math.PI) + 360) % 360), S }; };
  XG.figura('globo-magnitud-rumbo', {
    ini: p => ({ m: p.ini[0], i: p.ini[1] }),
    manijas: p => [{ k: 'm', min: 0, max: p.max, paso: 10, et: 'magnitud de R (N)', rot: v => `${v.m}` }, { k: 'i', min: 0, max: p.angs.length - 1, paso: 1, et: 'dirección θ', rot: v => `${p.angs[v.i]}°` }],
    ok: (v, p) => { const r = GR(p); return v.m === r.M && p.angs[v.i] === r.G; },
    sol: p => { const r = GR(p); return { m: r.M, i: p.angs.indexOf(r.G) }; },
    texto: p => { const r = GR(p); return `$|\\vec R| = \\sqrt{${r.S.map(x => (x < 0 ? `(${x})` : x) + '^2').join(' + ')}} = ${r.M}$ N y $\\theta = ${r.G}^{\\circ}$`; },
    alto: () => 290, pie: 'Desliza la magnitud y la dirección de R.',
    dib(v, K, p, f) {
      const g = p.angs[v.i], [c, s] = cs(g), r = GR(p), Q = q => [GO[0] + q[0] * GE, GO[1] - q[1] * GE];
      let h = K.l(30, GO[1], 330, GO[1], 'lm') + K.l(GO[0], 20, GO[0], 192, 'lm') + K.t(326, GO[1] - 6, 'x', 's tm', 'end');
      p.F.forEach(([x, y, nom], i) => { const q = Q([x, y]); h += K.ar(...GO, ...q, `${i ? 'lf' : 'lg'} gr`) + K.t(q[0] + (x < 0 ? -4 : 6), q[1] - 8, nom, `s ${i ? 'tf' : 'tg'}`, x < 0 ? 'end' : 'start'); });
      if (f > 0) {
        const T = Q(r.S);
        h += K.f(f, K.l(...Q([r.S[0], 0]), ...T, 'lo d') + K.l(...Q([0, r.S[1]]), ...T, 'lo d') + K.ar(...GO, ...T, 'lo'));
        h += K.f(f, K.t(14, 36, `|R| = √(${N(r.S[0])}² + ${N(r.S[1])}²) = ${r.M} N`, 's to', 'start') + K.t(14, 54, `θ = ${r.G}°`, 's to', 'start'));
      }
      h += K.c(...GO, 9, 'fk') + K.arc(...GO, 24, 0, g, 'la') + K.ar(...GO, GO[0] + v.m * GE * c, GO[1] - v.m * GE * s, 'la gr');
      return h + K.t(14, 18, `R: ${v.m} N a ${g}°`, 's ta', 'start');
    },
    lee: (v, p) => `$|\\vec R| = ${v.m}$ N, $\\theta = ${p.angs[v.i]}^{\\circ}$`,
    aviso(v, p) {
      const r = GR(p), g = p.angs[v.i], sum = p.F.reduce((a, q) => a + Math.hypot(q[0], q[1]), 0);
      if (v.m === sum && v.m !== r.M) return `Sumaste las magnitudes (${p.F.map(q => N(Math.hypot(q[0], q[1]))).join(' + ')}): las fuerzas se suman como vectores, con Pitágoras sobre las componentes.`;
      if (v.m !== r.M) return `La magnitud sale de las componentes de R, (${N(r.S[0])}, ${N(r.S[1])}): √(Rx² + Ry²).`;
      if (g === 180 - r.G || g === (r.G + 180) % 360 || g === 360 - r.G) return 'Ese ángulo es el del triángulo, pero R está en otro cuadrante: mira los signos de Rx y Ry.';
      if (Math.abs(cs(g)[0] * r.M - r.S[1]) < 0.5 || Math.abs(cs(90 - g)[0] * r.M + r.S[0]) < 0.5) return 'Cambiaste el cateto: tan θ = Ry / Rx, lo vertical entre lo horizontal.';
      return `Con ${g}° la flecha no apunta como R: θ se mide desde el eje x positivo, contra las agujas del reloj.`;
    },
    bien: p => p.ok || 'Magnitud con Pitágoras y dirección con tan θ = Ry/Rx, en su cuadrante.',
  });

  // ------------------------------------------------------------ nudo-equilibrante · el polígono de fuerzas se cierra
  // Tres cuerdas tiran de un nudo; sus fuerzas van punta con cola. Se arrastra la punta de la cuarta, E, que debe cerrar el polígono.
  //   v { a, b }   params { F: [F₁, F₂, F₃], u, ini, ok }
  const NO = [110, 150], NU = 20, NW = [-4, 8, -3, 6], NP = (x, y) => [NO[0] + x * NU, NO[1] - y * NU];
  XG.figura('nudo-equilibrante', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: p => { const S = suma(p.F); return [{ k: ['a', 'b'], min: [-5, -6], max: [5, 3], paso: 1, en: v => NP(S[0] + v.a, S[1] + v.b), de: (x, y) => [(x - NO[0]) / NU - S[0], (NO[1] - y) / NU - S[1]] }]; },
    ok: (v, p) => { const S = suma(p.F); return v.a === -S[0] && v.b === -S[1]; },
    sol: p => { const S = suma(p.F); return { a: -S[0], b: -S[1] }; },
    texto: p => { const S = suma(p.F), u = p.u; return `$\\vec E = -(\\vec F_1 + \\vec F_2 + \\vec F_3) = (${-S[0] * u}, ${-S[1] * u})$ N: el polígono se cierra`; },
    alto: () => 230, pie: 'Arrastra la punta de E hasta cerrar el polígono.',
    dib(v, K, p, f) {
      const S = suma(p.F), u = p.u;
      let h = rej(K, NO, NU, NW), q = [0, 0];
      p.F.forEach((F, i) => {
        const n = [q[0] + F[0], q[1] + F[1]], a = NP(...q), b = NP(...n);
        h += K.ar(...a, ...b, `${['lg', 'lf', 'lm'][i]} gr`) + K.t((a[0] + b[0]) / 2 + (i === 2 ? -10 : 6), (a[1] + b[1]) / 2 + (i === 2 ? 12 : -6), `F${'₁₂₃'[i]}`, `s ${['tg', 'tf', 'tm'][i]}`, i === 2 ? 'end' : 'start');
        q = n;
      });
      const T = [S[0] + v.a, S[1] + v.b];
      h += K.c(...NO, 6, 'fk') + K.t(NO[0] - 10, NO[1] + 18, 'nudo', 's', 'end') + K.ar(...NP(...S), ...NP(...T), 'la gr');
      if (f > 0) {
        const cierra = !T[0] && !T[1];
        h += K.f(f, cierra ? K.c(...NO, 9, 'fo') : K.ar(...NP(...T), ...NO, 'lo d'));
        h += K.f(f, K.t(330, 222, cierra ? 'ΣF = 0: se cierra' : `falta ${pt([-T[0] * u, -T[1] * u])} N`, `s ${cierra ? 'to' : 'ta'}`, 'end'));
      }
      return h + K.t(14, 16, `E = ${pt([v.a * u, v.b * u])} N`, 's ta', 'start') + K.t(330, 16, `cada cuadro: ${u} N`, 's tm', 'end');
    },
    lee: (v, p) => `$\\vec E = (${v.a * p.u}, ${v.b * p.u})$ N`,
    aviso(v, p) {
      const S = suma(p.F);
      if (v.a === S[0] && v.b === S[1]) return 'Esa es la resultante: duplica el tirón. La equilibrante es su opuesta, del mismo tamaño y sentido contrario.';
      if (!v.a && !v.b) return 'Sin E el polígono queda abierto: las tres cuerdas solas mueven el nudo.';
      if (v.a === -S[0] || v.b === -S[1]) return `Una de las dos componentes ya cierra; la otra no: E debe terminar justo en el nudo.`;
      return 'La punta de E tiene que caer en el nudo, donde empezó F₁: así la suma da cero.';
    },
    bien: p => p.ok || 'La equilibrante cierra el polígono: la suma de todas las fuerzas es cero.',
  });

  // ------------------------------------------------------------ semaforo-dos-cables · tensiones de dos cables (sistema 2×2)
  // Un peso W cuelga de dos cables que forman a₁ (izquierda) y a₂ (derecha) con la horizontal. Se deslizan T₁ y T₂.
  //   v { T1, T2 }   params { W, a: [a₁, a₂], max, ok }
  const SK = [170, 120], SE = 0.5;
  const ST = p => { const [c1, s1] = cs(p.a[0]), [c2, s2] = cs(p.a[1]), D = s1 * c2 + c1 * s2; return { T1: r2(p.W * c2 / D), T2: r2(p.W * c1 / D) }; };
  const SR = (v, p) => { const [c1, s1] = cs(p.a[0]), [c2, s2] = cs(p.a[1]); return [r2(v.T2 * c2 - v.T1 * c1), r2(v.T1 * s1 + v.T2 * s2 - p.W)]; };
  XG.figura('semaforo-dos-cables', {
    ini: () => ({ T1: 0, T2: 0 }),
    manijas: p => [{ k: 'T1', min: 0, max: p.max, paso: 10, et: 'T₁, cable izquierdo (N)', rot: v => `${v.T1}` }, { k: 'T2', min: 0, max: p.max, paso: 10, et: 'T₂, cable derecho (N)', rot: v => `${v.T2}` }],
    ok: (v, p) => { const s = ST(p); return v.T1 === s.T1 && v.T2 === s.T2; },
    sol: ST,
    texto: p => { const s = ST(p), [a1, a2] = p.a; return `$T_1\\cos ${a1}^{\\circ} = T_2\\cos ${a2}^{\\circ}$ y $T_1\\sin ${a1}^{\\circ} + T_2\\sin ${a2}^{\\circ} = ${p.W}$: $T_1 = ${s.T1}$ N, $T_2 = ${s.T2}$ N`; },
    alto: () => 290, pie: 'Desliza las dos tensiones.',
    dib(v, K, p, f) {
      const [a1, a2] = p.a, [c1, s1] = cs(a1), [c2, s2] = cs(a2), L = [SK[0] - 96 * c1 / s1, 24], R = [SK[0] + 96 * c2 / s2, 24];
      let h = K.l(L[0], 24, L[0], 184, 'lm gr') + K.l(R[0], 24, R[0], 184, 'lm gr') + K.l(...L, ...SK, 'lm') + K.l(...R, ...SK, 'lm');
      h += K.arc(...SK, 26, 180 - a1, 180, 'lg') + K.t(SK[0] - 38, SK[1] - 6, `${a1}°`, 's tg', 'end') + K.arc(...SK, 26, 0, a2, 'lf') + K.t(SK[0] + 38, SK[1] - 6, `${a2}°`, 's tf', 'start');
      h += K.r(SK[0] - 9, SK[1] + 4, 18, 34, 'fk', 4) + K.ar(SK[0], SK[1], SK[0], SK[1] + p.W * SE, 'lm gr') + K.t(SK[0] - 14, SK[1] + p.W * SE - 2, `W = ${p.W} N`, 's', 'end');
      h += K.ar(...SK, SK[0] - v.T1 * SE * c1, SK[1] - v.T1 * SE * s1, 'la gr') + K.ar(...SK, SK[0] + v.T2 * SE * c2, SK[1] - v.T2 * SE * s2, 'la gr');
      h += K.t(14, 16, `T₁ = ${v.T1} N · T₂ = ${v.T2} N`, 's ta', 'start');
      if (f > 0) {
        const [x, y] = SR(v, p), ok = !x && !y;
        h += K.f(f, K.r(196, 140, 140, 48, 'fc', 8) + K.t(330, 160, `ΣFx = ${N(x)} N`, `s ${x ? 'ta' : 'to'}`, 'end') + K.t(330, 180, `ΣFy = ${N(y)} N`, `s ${y ? 'ta' : 'to'}`, 'end'));
        if (!ok) h += K.f(f, K.ar(...SK, SK[0] + x * SE, SK[1] - y * SE, 'lo d'));
        else h += K.f(f, K.c(...SK, 6, 'fo'));
      }
      return h;
    },
    lee: (v, p) => { const [x, y] = SR(v, p); return `$\\sum F_x = ${x}$ N, $\\sum F_y = ${y}$ N`; },
    aviso(v, p) {
      const s = ST(p), [x, y] = SR(v, p);
      if (v.T1 === s.T2 && v.T2 === s.T1) return 'Intercambiaste las tensiones: el cable más empinado (más vertical) carga más del peso.';
      if (!x) return `Las horizontales se anulan, pero las verticales no sostienen el peso: ΣFy = ${N(y)} N.`;
      if (!y) return `Sostienen el peso, pero las horizontales no se anulan (ΣFx = ${N(x)} N): el nudo se correría de lado.`;
      return 'Hay dos condiciones: en x, T₁ cos a₁ = T₂ cos a₂; en y, T₁ sen a₁ + T₂ sen a₂ = W.';
    },
    bien: p => p.ok || 'Las dos ecuaciones se cumplen: el nudo queda en equilibrio.',
  });

  // ------------------------------------------------------------ caja-en-la-rampa · el peso en su parte a lo largo y su parte normal
  // Una caja de peso W en una rampa de ángulo θ. Se deslizan la componente a lo largo (W sen θ) y la normal (W cos θ).
  //   v { P, Q }   params { W, g, ok }
  const CB = [60, 186], CL = 220, CE = 1.5;
  const CS = p => { const [c, s] = cs(p.g); return { P: r2(p.W * s), Q: r2(p.W * c) }; };
  XG.figura('caja-en-la-rampa', {
    ini: () => ({ P: 0, Q: 0 }),
    manijas: p => [{ k: 'P', min: 0, max: p.W, paso: 5, et: 'a lo largo de la rampa (N)', rot: v => `${v.P}` }, { k: 'Q', min: 0, max: p.W, paso: 5, et: 'normal a la rampa (N)', rot: v => `${v.Q}` }],
    ok: (v, p) => { const s = CS(p); return v.P === s.P && v.Q === s.Q; },
    sol: CS,
    texto: p => { const s = CS(p); return `A lo largo: $W\\sin ${p.g}^{\\circ} = ${s.P}$ N; normal: $W\\cos ${p.g}^{\\circ} = ${s.Q}$ N`; },
    alto: () => 290, pie: 'Desliza las dos partes del peso.',
    dib(v, K, p, f) {
      const [c, s] = cs(p.g), H = CL * s / c, T = [CB[0] + CL, CB[1] - H];
      const M = [CB[0] + CL * 0.5, CB[1] - H * 0.5], o = [-s, -c], C = [M[0] + o[0] * 16, M[1] + o[1] * 16], a = [c, -s], n = [s, c];
      const box = [[-14, 0], [14, 0], [14, 28], [-14, 28]].map(([x, y]) => [M[0] + a[0] * x + o[0] * y, M[1] + a[1] * x + o[1] * y]);
      let h = K.p([CB, [T[0], CB[1]], T], 'fn') + K.l(...CB, ...T, 'lm gr') + K.arc(...CB, 34, 0, p.g, 'la') + K.t(CB[0] + 44, CB[1] - 6, `θ = ${p.g}°`, 's ta', 'start');
      h += K.p(box, 'fk') + K.ar(...C, C[0], C[1] + p.W * CE, 'lm gr') + K.t(C[0] + 8, C[1] + p.W * CE, `W = ${p.W} N`, 's', 'start');
      if (f > 0) {
        const A = [C[0] - a[0] * v.P * CE, C[1] - a[1] * v.P * CE], B = [A[0] + n[0] * v.Q * CE, A[1] + n[1] * v.Q * CE], cierra = Math.hypot(B[0] - C[0], B[1] - C[1] - p.W * CE) < 1;
        h += K.f(f, K.ar(...C, ...A, 'lg gr') + K.ar(...A, ...B, 'lf gr') + K.t(A[0] - 6, A[1] - 6, `${v.P} N`, 's tg', 'end') + K.t((A[0] + B[0]) / 2 + 8, (A[1] + B[1]) / 2 + 2, `${v.Q} N`, 's tf', 'start'));
        h += K.f(f, K.t(14, 36, cierra ? 'las dos partes rehacen W' : 'las partes no rehacen W', `s ${cierra ? 'to' : 'ta'}`, 'start'));
      }
      return h + K.t(14, 16, `a lo largo ${v.P} N · normal ${v.Q} N`, 's ta', 'start');
    },
    lee: v => `a lo largo $${v.P}$ N, normal $${v.Q}$ N`,
    aviso(v, p) {
      const s = CS(p);
      if (v.P === s.Q && v.Q === s.P) return 'Están al revés: la parte que baja por la rampa es W sen θ; la que aprieta contra ella, W cos θ.';
      if (v.P + v.Q === p.W) return 'Las dos partes no suman W como números: son catetos de un triángulo cuya hipotenusa es W.';
      if (v.P === s.P) return 'A lo largo vas bien; la normal es la parte del peso perpendicular a la rampa: W cos θ.';
      if (v.Q === s.Q) return 'La normal vas bien; la parte a lo largo es W sen θ.';
      return 'El ángulo entre W y la normal es el mismo θ de la rampa: a lo largo W sen θ y normal W cos θ.';
    },
    bien: p => p.ok || 'Las dos partes son los catetos y W la hipotenusa: rehacen el peso.',
  });

  // ------------------------------------------------------------ tension-cable-antena · una fuerza en el espacio por componentes
  // Un cable va de la punta A de un mástil (0, 0, h) al anclaje B (x, y, 0) con tensión T. Se ponen |AB|, T/|AB| y las componentes.
  //   params { h, B, T, extra, trampas?, ok }
  const AS = [{ x: 296, y: 36, w: 56, h: 32 }, { x: 296, y: 82, w: 56, h: 32 }, { x: 200, y: 150, w: 54, h: 32 }, { x: 258, y: 150, w: 54, h: 32 }, { x: 314, y: 150, w: 44, h: 32 }];
  const AV = p => [p.B[0], p.B[1], -p.h];
  const AM = p => { const d = AV(p), L = Math.round(Math.hypot(...d)), k = p.T / L; return [L, k, ...d.map(x => x * k)].map(N); };
  XG.rotula('tension-cable-antena', {
    slots: () => AS, metas: AM, fichas: p => [...AM(p), ...p.extra], alto: () => 180,
    texto: p => { const m = AM(p).map(s => s.replace('−', '-')); return `$|\\vec{AB}| = ${m[0]}$, $\\vec T = ${m[1]}\\,\\vec{AB} = (${m[2]}, ${m[3]}, ${m[4]})$ N`; },
    fondo(K, p, f) {
      const o = [70, 168], u = 96 / Math.max(p.h, 8), I = (x, y, z) => K.iso(o, u, x, y, z), d = AV(p), A = I(0, 0, p.h), B = I(p.B[0], p.B[1], 0);
      let h = K.l(...I(0, 0, 0), ...I(6, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 6, 0), 'lm') + K.t(...I(6.4, 0, 0), 'x', 's tm', 'start') + K.t(...I(0, 6.6, 0), 'y', 's tm', 'end');
      h += K.l(...I(0, 0, 0), ...A, 'lm gr') + K.l(...A, ...B, 'lg') + K.l(...B, ...I(p.B[0], 0, 0), 'lr d') + K.l(...B, ...I(0, p.B[1], 0), 'lr d');
      h += K.c(...A, 4, 'fg') + K.t(A[0] - 8, A[1] + 4, `A(0, 0, ${p.h})`, 's tg', 'end') + K.c(...B, 4, 'fg') + (B[0] < 100 ? K.t(B[0] + 8, B[1] + 14, `B${pt([p.B[0], p.B[1], 0])}`, 's tg', 'start') : K.t(B[0] - 8, B[1] + 14, `B${pt([p.B[0], p.B[1], 0])}`, 's tg', 'end'));
      const k = p.T / Math.hypot(...d), q = I(...[0, 0, p.h].map((x, i) => x + d[i] * 0.55));
      h += K.f(f, K.ar(...A, ...q, 'lo gr') + K.t(q[0] + 6, q[1] - 4, `T = ${N(p.T)} N`, 's to', 'start') + K.t(14, 16, `T = ${N(k)}·AB`, 's to', 'start'));
      h += K.t(262, 41, '|AB| =', 's', 'end') + K.t(262, 87, 'T ÷ |AB| =', 's', 'end') + K.t(334, 120, 'T = (Tx, Ty, Tz), en N', 's tm', 'end');
      return h;
    },
    aviso(q, p) {
      const ms = AM(p), i = ms.findIndex((m, k) => q[k][0] !== m);
      return p.trampas?.[`${i}:${q[i][0]}`] || [
        'AB = B − A: resta las coordenadas y saca la raíz de la suma de sus cuadrados.',
        'La tensión va a lo largo del cable: es T veces el vector unitario, T·AB/|AB|.',
        'Tx = (T/|AB|) por la componente x de AB.',
        'Ty = (T/|AB|) por la componente y de AB, con su signo.',
        'Tz = (T/|AB|) por la componente z de AB: el cable tira de A hacia abajo.'][i];
    },
    bien: p => p.ok || 'La tensión es T por el vector unitario del cable.',
  });

  // ------------------------------------------------------------ suelta-en-equilibrio · en movimiento: ¿se queda quieto?
  // Cada tiro: fuerzas conocidas fs y una fuerza desconocida de magnitud v·u en las direcciones dirs. Al soltar, el cuerpo se mueve
  // en el sentido de la suma; si la suma es cero, se queda quieto.
  //   params { tiros: [{ q, esc: 'plano' | 'rampa' | 'colgada', fs: [[x, y, nombre]], dirs: [[x, y]], u, r, g?, c, e? }] }
  const QC = [170, 116], QS = t => 64 / Math.max(t.r * t.u, ...t.fs.map(f => Math.hypot(f[0], f[1])));
  const QR = (t, v) => { const S = suma(t.fs), D = suma(t.dirs), k = (v || 0) * t.u; return [r2(S[0] + D[0] * k), r2(S[1] + D[1] * k)]; };
  XG.tiros('suelta-en-equilibrio', {
    perilla: () => ({ et: 'F (N)', min: 0, max: 12, cara: v => (v ? String(v * 10) : ''), lee: v => `${v * 10} N` }), meta: t => t.r, alto: 200, ms: 1600,
    dib(t, v, K, p, f) {
      const R = v == null ? [0, 0] : QR(t, v), m = Math.hypot(...R), d = m < 1e-6 ? 0 : Math.min(70, 8 + m * 0.6) * Math.min(1, f * 1.2), o = m < 1e-6 ? [0, 0] : [R[0] / m * d, -R[1] / m * d];
      const C = [QC[0] + o[0], QC[1] + o[1]];
      let h = '';
      if (t.esc === 'rampa') {
        const [c, s] = cs(t.g), L = 170, a = [c, -s], o = [-s, -c], B = [QC[0] - o[0] * 14, QC[1] - o[1] * 14];
        h += K.l(B[0] - a[0] * L, B[1] - a[1] * L, B[0] + a[0] * L, B[1] + a[1] * L, 'lm gr') + K.t(24, 192, `${t.g}°`, 's tm', 'start');
        h += K.p([[-14, -14], [14, -14], [14, 14], [-14, 14]].map(([x, y]) => [C[0] + a[0] * x + o[0] * y, C[1] + a[1] * x + o[1] * y]), 'fk');
      } else if (t.esc === 'colgada') {
        h += K.l(10, 30, 330, 30, 'lm gr');
        t.dirs.forEach(([x, y]) => { const k = (QC[1] - 30) / y; h += K.l(...C, QC[0] + x * k, 30, 'lm'); });
        h += K.r(C[0] - 9, C[1], 18, 26, 'fk', 4);
      } else h += K.r(C[0] - 14, C[1] - 14, 28, 28, 'fk', 4);
      const QE = QS(t);
      t.fs.forEach(([x, y, nom]) => { const q = [C[0] + x * QE, C[1] - y * QE]; h += K.ar(...C, ...q, 'lg gr') + K.t(q[0] + (x < 0 ? -4 : 4), q[1] + (y < 0 ? 14 : -4), nom, 's tg', x < 0 ? 'end' : 'start'); });
      if (v) t.dirs.forEach(([x, y]) => { const k = v * t.u * QE; h += K.ar(...C, C[0] + x * k, C[1] - y * k, 'la gr'); });
      h += K.t(14, 18, v ? `F = ${v * t.u} N` : 'F = ?', 's ta', 'start');
      if (v != null && f >= 1) h += K.t(330, 18, m < 1e-6 ? 'quieto: ΣF = 0' : `se mueve: ΣF = ${pt(R)} N`, `s ${m < 1e-6 ? 'to' : 'ta'}`, 'end');
      return h;
    },
    falla(t, v) {
      if (t.e?.[v]) return t.e[v];
      const R = QR(t, v), D = suma(t.dirs), sobra = R[0] * D[0] + R[1] * D[1] > 0;
      return `Con ${v * t.u} N la suma da ${pt(R)} N: ${sobra ? 'sobra fuerza' : 'falta fuerza'} y el cuerpo se mueve.`;
    },
    cuenta: t => t.c,
    pie: 'Estira hasta la fuerza que lo deja quieto y suelta.',
  });
})();
