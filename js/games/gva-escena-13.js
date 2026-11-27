// Geometría Vectorial · juegos de la lección geo-13 «Lugares geométricos e intersecciones» (spec 2026-11-27-curso-geometria-vectorial).
// Un lugar geométrico es el conjunto de puntos que cumplen una condición: la mediatriz (igual distancia a A y a B), la circunferencia
// (‖X − C‖ = r), la circunferencia de diámetro AB, la bisectriz (igual distancia a dos rectas); y las intersecciones de lugares:
// recta con circunferencia (0, 1 o 2 puntos según el discriminante), dos circunferencias (la cuerda común) y el circuncentro.
// Armazones de figura-kit.js (XG.figura, XG.rotula, XG.tiros) y logica-kit.js (XG.marca), con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const pt = q => `(${sg(q[0])}, ${sg(q[1])})`;
  const ptx = q => `(${q[0]}, ${q[1]})`;
  const r1 = x => sg(Math.round(x * 10) / 10);
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  const igual = (a, b) => a[0] === b[0] && a[1] === b[1];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Ecuación a x + b y = c simplificada; en texto plano (−) o en TeX.
  const ecu = (a, b, c, tex = false) => {
    let g = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1;
    if (a < 0 || (a === 0 && b < 0)) g = -g;
    [a, b, c] = [a / g, b / g, c / g];
    const m = tex ? '-' : '−', s = [[a, 'x'], [b, 'y']].filter(([k]) => k !== 0).map(([k, n], i) => {
      const t = Math.abs(k) === 1 ? n : `${Math.abs(k)}${n}`;
      return i === 0 ? (k < 0 ? `${m}${t}` : t) : `${k < 0 ? ` ${m} ` : ' + '}${t}`;
    }).join('');
    return `${s} = ${tex ? c : sg(c)}`;
  };
  // (x − h)² en texto plano o en TeX.
  const cuad = (v, h, tex = false) => (h === 0 ? `${v}^2` : `(${v} ${h > 0 ? (tex ? '-' : '−') : '+'} ${Math.abs(h)})^2`);
  const cuadU = (v, h) => (h === 0 ? `${v}²` : `(${v} ${h > 0 ? '−' : '+'} ${Math.abs(h)})²`);
  // Papel con ejes: B = { x0, x1, y0, y1 } en unidades; el (0, 0) cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  const P2 = (P, q) => [P.X(q[0]), P.Y(q[1])];
  const papel = (K, P, ejes = true) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), ejes && x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), ejes && y === 0 ? 'lm' : 'ls');
    return h;
  };
  // La recta a x + b y = c recortada al papel.
  const recta = (K, P, a, b, c, cls) => {
    const q = [], e = 1e-9;
    if (b) for (const x of [P.x0, P.x1]) { const y = (c - a * x) / b; if (y >= P.y0 - e && y <= P.y1 + e) q.push([x, y]); }
    if (a) for (const y of [P.y0, P.y1]) { const x = (c - b * y) / a; if (x >= P.x0 - e && x <= P.x1 + e) q.push([x, y]); }
    if (q.length < 2) return '';
    q.sort((m, n) => m[0] - n[0] || m[1] - n[1]);
    return K.l(...P2(P, q[0]), ...P2(P, q.at(-1)), cls);
  };
  const punto = (K, P, q, s, cls = 'fk', dx = 8, dy = -8, a = 'start') => { const [x, y] = P2(P, q); return K.c(x, y, 4.5, cls) + (s ? K.t(x + dx, y + dy, s, 's', a) : ''); };
  const manijaPunto = (P, ks, et) => ({ k: ks, min: [P.x0, P.y0], max: [P.x1, P.y1], paso: 1, rot: () => et,
    en: v => [P.X(v[ks[0]]), P.Y(v[ks[1]])], de: (x, y) => [(x - P.ox) / P.u, (P.oy - y) / P.u] });
  // Mediatriz de AB: 2(B − A)·X = ‖B‖² − ‖A‖², como a x + b y = c.
  const mediatriz = (A, B) => [2 * (B[0] - A[0]), 2 * (B[1] - A[1]), B[0] ** 2 + B[1] ** 2 - A[0] ** 2 - A[1] ** 2];

  // ------------------------------------------------------------------ la mediatriz como lugar: el pozo de los dos pueblos
  // Se arrastra el pozo P; debe quedar sobre la carretera y = c y a igual distancia de A y de B. Al comprobar aparecen los dos
  // compases (PA y PB) y la mediatriz entera.   v { x, y }
  //   params { A, B, c, ini, et: [nombre de A, de B], mira: { carretera, medio, mediatriz, otro }, ok }
  const PE = plano({ x0: 0, x1: 10, y0: 0, y1: 7 }, 50, 212, 24);
  const pozo = p => { const [a, b, c] = mediatriz(p.A, p.B); return [(c - b * p.c) / a, p.c]; };
  XG.figura('pozo-equidistante', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [manijaPunto(PE, ['x', 'y'], 'P')],
    ok: (v, p) => v.y === p.c && d2([v.x, v.y], p.A) === d2([v.x, v.y], p.B),
    sol: p => { const q = pozo(p); return { x: q[0], y: q[1] }; },
    texto: p => { const q = pozo(p); return `el punto $${ptx(q)}$: está sobre la vía y en la mediatriz $${ecu(...mediatriz(p.A, p.B), true)}$`; },
    alto: () => 236, pie: 'Arrastra el pozo P.',
    dib(v, K, p, f) {
      const P = [v.x, v.y], ok = v.y === p.c && d2(P, p.A) === d2(P, p.B), Pp = P2(PE, P), A = P2(PE, p.A), B = P2(PE, p.B);
      let h = papel(K, PE) + K.l(PE.X(PE.x0), PE.Y(p.c), PE.X(PE.x1), PE.Y(p.c), 'lm gr') + K.t(PE.X(PE.x1), PE.Y(p.c) + 18, 'carretera', 's tm', 'end');
      h += K.l(Pp[0], Pp[1], A[0], A[1], 'lm d') + K.l(Pp[0], Pp[1], B[0], B[1], 'lm d');
      h += punto(K, PE, p.A, `${p.et[0]} ${pt(p.A)}`) + punto(K, PE, p.B, `${p.et[1]} ${pt(p.B)}`);
      if (f > 0) {   // los dos compases se abren desde A y desde B hasta P, y aparece la mediatriz
        const g = Math.min(1, f * 1.5), ra = Math.sqrt(d2(P, p.A)) * PE.u, rb = Math.sqrt(d2(P, p.B)) * PE.u;
        const aa = Math.atan2(A[1] - Pp[1], Pp[0] - A[0]) * 180 / Math.PI, ab = Math.atan2(B[1] - Pp[1], Pp[0] - B[0]) * 180 / Math.PI;
        h += K.arc(A[0], A[1], ra, aa - 12 * g, aa + 12 * g, 'lg gr') + K.arc(B[0], B[1], rb, ab - 12 * g, ab + 12 * g, 'lf gr');
        h += K.f(f * 2 - 1, recta(K, PE, ...mediatriz(p.A, p.B), 'la d'));
        h += K.f(f * 3 - 2, K.t(332, 16, `PA² = ${d2(P, p.A)}, PB² = ${d2(P, p.B)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `$PA^2 = ${d2([v.x, v.y], p.A)}$ y $PB^2 = ${d2([v.x, v.y], p.B)}$`,
    aviso(v, p) {
      const P = [v.x, v.y], eq = d2(P, p.A) === d2(P, p.B);
      if (v.y === p.c) return p.mira.carretera;
      if (eq) return igual([2 * v.x, 2 * v.y], [p.A[0] + p.B[0], p.A[1] + p.B[1]]) ? p.mira.medio : p.mira.mediatriz;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la ecuación de la mediatriz, con fichas
  // A y B en el papel; se arrastran el punto medio, el vector B − A y la ecuación. Al comprobar se dibujan M, la flecha AB y la recta.
  //   params { A, B, fichas, metas: [M, B − A, ecuación], mira: [3], trampas, ok }
  const PM = plano({ x0: -3, x1: 6, y0: 0, y1: 7 }, 16 + 3 * 20, 200, 20);
  const slotM = i => ({ x: 268, y: 60 + 62 * i, w: 120, h: 36 });
  const ROT_M = ['punto medio M', 'el vector B − A', 'la mediatriz'];
  XG.rotula('mediatriz-en-fichas', {
    slots: p => p.metas.map((_, i) => slotM(i)),
    fichas: p => p.fichas, metas: p => p.metas, alto: () => 216,
    texto: p => `$M = ${ptx([(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2])}$, $B - A = ${ptx([p.B[0] - p.A[0], p.B[1] - p.A[1]])}$ y la mediatriz $${ecu(...mediatriz(p.A, p.B), true)}$`,
    fondo(K, p, f) {
      const A = P2(PM, p.A), B = P2(PM, p.B), M = [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2], Mp = P2(PM, M);
      let h = papel(K, PM) + K.l(A[0], A[1], B[0], B[1], 'lm') + punto(K, PM, p.A, `A ${pt(p.A)}`, 'fk', 8, 16) + punto(K, PM, p.B, `B ${pt(p.B)}`, 'fk', -8, -8, 'end');
      ROT_M.forEach((s, i) => { const z = slotM(i); h += K.t(z.x - z.w / 2, z.y - z.h / 2 - 6, s, 's tm', 'start'); });
      if (f > 0) h += K.f(f * 2, K.ar(A[0], A[1], B[0], B[1], 'lg gr')) + K.f(f * 2 - 0.5, K.c(Mp[0], Mp[1], 5, 'fA'))
        + K.f(f * 2 - 1, recta(K, PM, ...mediatriz(p.A, p.B), 'la gr'));
      return h;
    },
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------ la circunferencia escondida en x² + y² + Dx + Ey + F = 0
  // Se arrastra el centro C y se fija el radio con la regla; la circunferencia del estudiante se ve. Al comprobar aparece la de la
  // ecuación, completada en cuadrados.   v { x, y, r }
  //   params { D, E, F, ini: { x, y, r }, rmax, et, mira: { signo, mitad, radio, otro }, trampas: { r: aviso }, ok }
  const PC = plano({ x0: -4, x1: 9, y0: -7, y1: 3 }, 30 + 4 * 18, 36 + 3 * 18, 18);
  const centro = p => [-p.D / 2, -p.E / 2];
  const radio2 = p => p.D * p.D / 4 + p.E * p.E / 4 - p.F;
  const general = p => { const t = (k, s) => (k === 0 ? '' : ` ${k < 0 ? '−' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}${s}`); return `x² + y²${t(p.D, 'x')}${t(p.E, 'y')}${t(p.F, '')} = 0`; };
  XG.figura('centro-y-radio-escondidos', {
    ini: p => ({ ...p.ini }),
    manijas: p => [manijaPunto(PC, ['x', 'y'], 'C'), { k: 'r', min: 1, max: p.rmax, paso: 1, et: `radio r, en ${p.uni}` }],
    ok: (v, p) => igual([v.x, v.y], centro(p)) && v.r * v.r === radio2(p),
    sol: p => { const c = centro(p); return { x: c[0], y: c[1], r: Math.sqrt(radio2(p)) }; },
    texto: p => { const [h, k] = centro(p); return `$${cuad('x', h, true)} + ${cuad('y', k, true)} = ${radio2(p)}$: centro $${ptx([h, k])}$ y radio $${Math.sqrt(radio2(p))}$`; },
    alto: () => 274, pie: 'Arrastra el centro C y fija el radio.',
    dib(v, K, p, f) {
      const [h, k] = centro(p), C = P2(PC, [v.x, v.y]), ok = igual([v.x, v.y], [h, k]) && v.r * v.r === radio2(p);
      let s = papel(K, PC) + K.t(8, 18, p.et, 's', 'start') + K.t(332, 18, general(p), 's ta', 'end');
      s += K.arc(C[0], C[1], v.r * PC.u, 0, 360, 'la gr');
      if (f > 0) {   // la circunferencia de la ecuación se dibuja desde su centro
        const Q = P2(PC, [h, k]), R = Math.sqrt(radio2(p)) * PC.u;
        s += K.arc(Q[0], Q[1], R, 90, 90 + 360 * Math.min(1, f * 1.3), `${ok ? 'lo' : 'lf'} gr d`) + K.c(Q[0], Q[1], 4, ok ? 'fo' : 'ff');
        s += K.f(f * 3 - 2, K.t(332, 36, `${cuadU('x', h)} + ${cuadU('y', k)} = ${radio2(p)} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return s;
    },
    lee: v => `Tu circunferencia: $${cuad('x', v.x, true)} + ${cuad('y', v.y, true)} = ${v.r * v.r}$`,
    aviso(v, p) {
      const [h, k] = centro(p);
      if (igual([v.x, v.y], [-h, -k])) return p.mira.signo;
      if (igual([v.x, v.y], [-p.D, -p.E])) return p.mira.mitad;
      if (igual([v.x, v.y], [h, k])) return p.trampas?.[v.r] || p.mira.radio;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ la circunferencia de diámetro AB: las bancas del borde
  // El sendero AB es un diámetro del parque redondo; se tocan las bancas que quedan justo en el borde.
  //   params { A, B, pts: [[x, y] × 8], por: [aviso de cada banca que no va], falta, ok }
  const PB = plano({ x0: 0, x1: 10, y0: 0, y1: 10 }, 64, 234, 21);
  const enBorde = (p, q) => 4 * d2(q, [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2]) === d2(p.A, p.B);
  const delBorde = p => p.pts.map((q, i) => (enBorde(p, q) ? i : -1)).filter(i => i >= 0);
  XG.marca('bancas-del-diametro', {
    sitios: p => p.pts.map(q => { const [x, y] = P2(PB, q); return { x, y, w: 24, h: 24, red: true }; }),
    cara: (K, p, i) => { const [x, y] = P2(PB, p.pts[i]); return K.t(x, y + 4, i + 1, 's'); },
    fondo: (K, p) => { const A = P2(PB, p.A), B = P2(PB, p.B); return papel(K, PB) + K.l(A[0], A[1], B[0], B[1], 'lm gr') + punto(K, PB, p.A, `A ${pt(p.A)}`, 'fk', 8, 16) + punto(K, PB, p.B, `B ${pt(p.B)}`, 'fk', -10, -6, 'end') + K.t(8, 16, 'sendero AB = diámetro', 's tm', 'start'); },
    alto: () => 246, nombre: (p, i) => `banca ${i + 1} en ${pt(p.pts[i])}`, pie: 'Toca las bancas que están en el borde del parque.',
    sol: p => delBorde(p),
    aviso: (on, p) => { const s = delBorde(p), i = on.findIndex((o, k) => o && !s.includes(k)); return i >= 0 ? p.por[i] : p.falta; },
    bien: p => p.ok,
    texto: p => { const M = [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2]; return `las bancas ${delBorde(p).map(i => i + 1).join(', ')}: a distancia $${Math.sqrt(d2(p.A, p.B)) / 2}$ de $M = ${ptx(M)}$`; },
  });

  // ------------------------------------------------------------------ la bisectriz como lugar: la lámpara entre dos muros
  // El piso y un muro inclinado salen de la esquina O con dirección w; se arrastra la lámpara P. Debe estar a la misma distancia de los
  // dos muros y a la altura pedida. Al comprobar se ven las dos distancias y la bisectriz.   v { x, y }
  //   params { W: dirección del muro, h, ini, mira: { suma, altura, cerca, lejos, otro }, ok }
  const PL = plano({ x0: 0, x1: 13, y0: 0, y1: 8 }, 32, 206, 20);
  const LW = p => Math.hypot(p.W[0], p.W[1]);
  const aMuro = (p, q) => Math.abs(p.W[1] * q[0] - p.W[0] * q[1]) / LW(p);
  const lampara = p => [p.h * (LW(p) + p.W[0]) / p.W[1], p.h];
  const muroFin = p => { const k = Math.min(PL.x1 / p.W[0], PL.y1 / p.W[1]); return [p.W[0] * k, p.W[1] * k]; };
  const pie = (p, q) => { const L2 = LW(p) ** 2, t = (q[0] * p.W[0] + q[1] * p.W[1]) / L2; return [t * p.W[0], t * p.W[1]]; };
  XG.figura('lampara-bisectriz', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [manijaPunto(PL, ['x', 'y'], 'P')],
    ok: (v, p) => igual([v.x, v.y], lampara(p)),
    sol: p => { const q = lampara(p); return { x: q[0], y: q[1] }; },
    texto: p => { const q = lampara(p); return `la lámpara en $${ptx(q)}$: a $${p.h}$ del piso y a $${p.h}$ del muro, sobre la bisectriz`; },
    alto: () => 228, pie: 'Arrastra la lámpara P.',
    dib(v, K, p, f) {
      const O = P2(PL, [0, 0]), E = P2(PL, muroFin(p)), Q = [v.x, v.y], Qp = P2(PL, Q), ok = igual(Q, lampara(p));
      let h = papel(K, PL, false) + K.l(O[0], O[1], PL.X(PL.x1), O[1], 'lm gr') + K.l(O[0], O[1], E[0], E[1], 'lm gr');
      h += K.t(PL.X(PL.x1), O[1] + 16, 'piso', 's tm', 'end') + K.t(E[0] + 8, E[1] + 12, 'muro', 's tm', 'start') + K.c(O[0], O[1], 4, 'fk') + K.t(O[0] - 6, O[1] + 16, 'O', 's', 'end');
      h += K.t(332, 16, `muro: dirección ${pt(p.W)}`, 's tm', 'end');
      if (f > 0) {   // las dos distancias bajan desde P y aparece la bisectriz
        const g = Math.min(1, f * 1.5), F1 = P2(PL, [v.x, 0]), F2 = P2(PL, pie(p, Q));
        const tr = (Z, c) => K.l(Qp[0], Qp[1], Qp[0] + (Z[0] - Qp[0]) * g, Qp[1] + (Z[1] - Qp[1]) * g, c);
        h += tr(F1, 'lg gr') + tr(F2, 'lf gr');
        const b = lampara(p), kb = Math.min(PL.x1 / b[0], PL.y1 / b[1]), Bf = P2(PL, [b[0] * kb, b[1] * kb]);
        h += K.f(f * 2 - 1, K.l(O[0], O[1], Bf[0], Bf[1], 'la d'));
        h += K.f(f * 3 - 2, K.t(332, 34, `al piso: ${r1(v.y)}, al muro: ${r1(aMuro(p, Q))} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => `Distancia al piso: $${v.y}$; al muro: $${r1(aMuro(p, [v.x, v.y])).replace('−', '-')}$`,
    aviso(v, p) {
      const Q = [v.x, v.y], dm = aMuro(p, Q), eq = Math.abs(dm - v.y) < 1e-9 && p.W[1] * v.x - p.W[0] * v.y >= 0;
      if (v.x > 0 && p.W[1] * v.x === (1 + p.W[0]) * v.y) return p.mira.suma;
      if (eq) return p.mira.altura;
      if (v.y === p.h) return dm < p.h ? p.mira.cerca : p.mira.lejos;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ recta con circunferencia: el roce de la carretera
  // La circunferencia x² + y² = R2 y la recta y = m x + b; se desliza b. Al comprobar, el discriminante y los cortes.   v { b }
  //   params { R2, m: [numerador, denominador], b, bmax, ini, et, mira: { dos, nada }, ok }
  const PR = plano({ x0: -7, x1: 7, y0: -5, y1: 9 }, 72 + 7 * 14, 46 + 9 * 14, 14);
  const pend = p => p.m[0] / p.m[1];
  // (1 + m²) x² + 2 m b x + b² − R2 = 0
  const cortes = (p, b) => {
    const m = pend(p), A = 1 + m * m, B = 2 * m * b, C = b * b - p.R2, D = B * B - 4 * A * C;
    if (D < -1e-9) return { D, xs: [] };
    if (Math.abs(D) < 1e-9) return { D: 0, xs: [-B / (2 * A)] };
    return { D, xs: [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)] };
  };
  const recM = p => { const a = p.m[0] === 1 ? 'x' : `${p.m[0]}x`; return `y = ${p.m[1] === 1 ? a : `${a}/${p.m[1]}`} + b`; };
  XG.figura('recta-toca-circulo', {
    ini: p => ({ b: p.ini }),
    manijas: p => [{ k: 'b', min: 0, max: p.bmax, paso: 1, et: 'b, la altura donde la carretera corta el eje y' }],
    ok: (v, p) => cortes(p, v.b).xs.length === 1,
    sol: p => ({ b: p.b }),
    texto: p => { const c = cortes(p, p.b), x = c.xs[0]; return `$b = ${p.b}$: el discriminante es 0 y la carretera toca en un solo punto, $${ptx([x, pend(p) * x + p.b])}$`; },
    alto: () => 300,
    dib(v, K, p, f) {
      const O = P2(PR, [0, 0]), m = pend(p), c = cortes(p, v.b), n = c.xs.length;
      let h = papel(K, PR) + K.arc(O[0], O[1], Math.sqrt(p.R2) * PR.u, 0, 360, 'lg gr') + K.c(O[0], O[1], 3.5, 'fk');
      h += K.t(8, 16, p.et, 's tg', 'start') + K.t(332, 16, recM(p), 's ta', 'end');
      h += recta(K, PR, -p.m[0], p.m[1], p.m[1] * v.b, 'la gr');
      if (f > 0) {   // los cortes aparecen y se dice cuántos son
        h += c.xs.map(x => { const q = P2(PR, [x, m * x + v.b]); return K.c(q[0], q[1], 5 * Math.min(1, f * 1.6), n === 1 ? 'fo' : 'ff'); }).join('');
        h += K.f(f * 3 - 2, K.t(332, 34, `Δ ${c.D > 1e-9 ? '>' : c.D < -1e-9 ? '<' : '='} 0: ${n === 1 ? 'un punto, tangente ✓' : n ? 'dos puntos ✗' : 'ningún punto ✗'}`, `s ${n === 1 ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => { const c = cortes(p, v.b); return `Con $b = ${v.b}$ el discriminante ${c.D > 1e-9 ? 'es positivo: dos cortes' : c.D < -1e-9 ? 'es negativo: ningún corte' : 'es cero: un solo punto'}`; },
    aviso: (v, p) => (cortes(p, v.b).xs.length === 2 ? p.mira.dos : p.mira.nada),
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ dos circunferencias: la cuerda común de dos antenas
  // Se ve la cobertura de la antena 1; la antena 2 está marcada con su radio. Se arrastran P y Q a los dos puntos que están en los
  // dos bordes. Al comprobar aparecen el borde de la antena 2 y la cuerda común (la recta que sale al restar las ecuaciones).
  //   v { px, py, qx, qy }   params { C1, r1, C2, r2, ini: [[x, y], [x, y]], et: [antena 1, antena 2], uni, mira: { uno, igual, primera, otro }, ok }
  const PD = plano({ x0: -6, x1: 10, y0: -6, y1: 6 }, 34 + 6 * 17, 44 + 6 * 17, 17);
  const enC = (q, C, r) => d2(q, C) === r * r;
  const cruces = p => { const out = []; for (let x = PD.x0; x <= PD.x1; x++) for (let y = PD.y0; y <= PD.y1; y++) if (enC([x, y], p.C1, p.r1) && enC([x, y], p.C2, p.r2)) out.push([x, y]); return out; };
  const comun = p => [2 * (p.C2[0] - p.C1[0]), 2 * (p.C2[1] - p.C1[1]), p.C2[0] ** 2 + p.C2[1] ** 2 - p.C1[0] ** 2 - p.C1[1] ** 2 + p.r1 * p.r1 - p.r2 * p.r2];
  const bueno = (p, q) => enC(q, p.C1, p.r1) && enC(q, p.C2, p.r2);
  XG.figura('cuerda-de-dos-antenas', {
    ini: p => ({ px: p.ini[0][0], py: p.ini[0][1], qx: p.ini[1][0], qy: p.ini[1][1] }),
    manijas: () => [manijaPunto(PD, ['px', 'py'], 'P'), manijaPunto(PD, ['qx', 'qy'], 'Q')],
    ok: (v, p) => { const P = [v.px, v.py], Q = [v.qx, v.qy]; return !igual(P, Q) && bueno(p, P) && bueno(p, Q); },
    sol: p => { const [a, b] = cruces(p); return { px: a[0], py: a[1], qx: b[0], qy: b[1] }; },
    texto: p => { const [a, b] = cruces(p); return `los cruces son $${ptx(a)}$ y $${ptx(b)}$, sobre la cuerda común $${ecu(...comun(p), true)}$`; },
    alto: () => 272, pie: 'Arrastra P y Q a los puntos que están en los dos bordes.',
    dib(v, K, p, f) {
      const C1 = P2(PD, p.C1), C2 = P2(PD, p.C2), P = [v.px, v.py], Q = [v.qx, v.qy], ok = !igual(P, Q) && bueno(p, P) && bueno(p, Q);
      let h = papel(K, PD) + K.arc(C1[0], C1[1], p.r1 * PD.u, 0, 360, 'lg gr');
      h += K.c(C1[0], C1[1], 4.5, 'fk') + K.t(C1[0] - 6, C1[1] + 16, p.et[0], 's tg', 'end') + K.c(C2[0], C2[1], 4.5, 'fk') + K.t(C2[0] + 6, C2[1] + 16, p.et[1], 's tf', 'start');
      h += K.t(8, 14, `${p.et[0]}: centro ${pt(p.C1)}, radio ${p.r1}`, 's tg', 'start') + K.t(8, 31, `${p.et[1]}: centro ${pt(p.C2)}, radio ${p.r2}`, 's tf', 'start');
      if (f > 0) {   // el borde de la antena 2 se traza y aparece la cuerda común
        h += K.arc(C2[0], C2[1], p.r2 * PD.u, 90, 90 + 360 * Math.min(1, f * 1.3), 'lf gr');
        h += K.f(f * 2 - 1, recta(K, PD, ...comun(p), 'la d'));
        h += K.f(f * 3 - 2, K.t(332, PD.Y(PD.y0) + 16, `cuerda común: ${ecu(...comun(p))} ${ok ? '✓' : '✗'}`, `s ${ok ? 'to' : 'tf'}`, 'end'));
      }
      return h;
    },
    lee: (v, p) => { const P = [v.px, v.py], Q = [v.qx, v.qy]; return `$P$: distancias al cuadrado $${d2(P, p.C1)}$ y $${d2(P, p.C2)}$; $Q$: $${d2(Q, p.C1)}$ y $${d2(Q, p.C2)}$`; },
    aviso(v, p) {
      const P = [v.px, v.py], Q = [v.qx, v.qy];
      if (igual(P, Q)) return p.mira.igual;
      if (bueno(p, P) !== bueno(p, Q)) return p.mira.uno;
      if (enC(P, p.C1, p.r1) && enC(Q, p.C1, p.r1)) return p.mira.primera;
      return p.mira.otro;
    },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------ en movimiento: el alcance de una antena
  // Se fija el radio y al soltar la señal se abre desde la antena; llega justo a las casas o se pasa.
  //   tiro { q, C: antena, casas: [[x, y, nombre]], r, max, sc: píxeles por unidad, eq?: texto, trampas, cuenta }
  const AC = [170, 112];
  XG.tiros('onda-de-antena', {
    perilla: t => ({ et: 'radio de la señal (km)', min: 0, max: t.max, cara: v => v, lee: v => `${v} km` }),
    meta: t => t.r, alto: 224, ms: 1700, pie: 'Fija el radio y suelta: la señal se abre.',
    dib(t, v, K, p, f) {
      const px = q => [AC[0] + (q[0] - t.C[0]) * t.sc, AC[1] - (q[1] - t.C[1]) * t.sc];
      let h = '';
      for (let k = 1; k <= 3; k++) h += K.arc(AC[0], AC[1], k * 34, 0, 360, 'ls');
      h += K.p([[AC[0], AC[1] - 12], [AC[0] - 7, AC[1] + 6], [AC[0] + 7, AC[1] + 6]], 'fk') + K.t(8, 214, `antena en ${pt(t.C)}`, 's tm', 'start');
      if (t.eq) h += K.t(8, 18, t.eq, 's ta', 'start');
      t.casas.forEach(([x, y, n]) => { const [a, b] = px([x, y]); h += K.r(a - 6, b - 6, 12, 12, 'fg', 2) + K.t(a + (a > AC[0] ? 10 : -10), b - 8, `${n} ${pt([x, y])}`, 's', a > AC[0] ? 'start' : 'end'); });
      if (v == null) return h;
      const ok = v === t.r, R = v * t.sc * Math.min(1, f * 1.2);
      h += K.arc(AC[0], AC[1], R, 0, 360, `${f >= 1 ? (ok ? 'lo' : 'lf') : 'la'} gr`);
      return h + K.f(f * 3 - 2, K.t(332, 214, ok ? `${v} km: llega justo ✓` : `${v} km: ${v > t.r ? 'se pasa' : 'no llega'} ✗`, `s ${ok ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => t.trampas?.[v] || `Con ${v} km la señal ${v > t.r ? 'se pasa de' : 'no alcanza'} lo pedido: calcula la distancia con la raíz de la suma de cuadrados.`,
    cuenta: t => t.cuenta,
  });
})();
