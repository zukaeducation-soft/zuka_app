// Geometría Euclidiana · mundo 5 «euc-circunferencia»: juegos propios (spec 2026-11-26-curso-euclidiana). Armazones en figura-kit.js y logica-kit.js.
// Una circunferencia con puntos que se arrastran por ella: cuerdas, tangentes, posiciones relativas y los ángulos que se miden con arcos
// (central, inscrito, semiinscrito, interior y exterior). Los ángulos van en grados, contra las agujas del reloj.
(() => {
  const R = Math.round, rad = g => g * Math.PI / 180, gr = n => `${R(n)}°`, n1 = x => String(R(x * 10) / 10);
  const at = (c, r, g) => [c[0] + r * Math.cos(rad(g)), c[1] - r * Math.sin(rad(g))];
  const gra = (c, x, y) => (Math.atan2(c[1] - y, x - c[0]) * 180 / Math.PI + 360) % 360;
  const vuelta = a => { const b = (a % 360 + 360) % 360; return b > 280 ? b - 360 : b; };   // lo que queda justo antes del inicio no salta al final
  const seg = (K, a, b, cls = '') => K.l(a[0], a[1], b[0], b[1], cls);
  const aro = (K, c, r, cls = '') => K.arc(c[0], c[1], r, 0, 360, cls);
  const arco = (K, c, r, a, b, cls = '') => K.arc(c[0], c[1], r, a, b, cls);
  const uni = (a, b) => { const m = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / m, (b[1] - a[1]) / m]; };
  const medio = (a, b, t = 0.5) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  // Punto con su letra, empujada hacia afuera del centro c.
  const pt = (K, q, t, c, d = 13) => { const u = uni(c, q); return K.c(q[0], q[1], 3.5, 'fk') + (t ? K.t(q[0] + u[0] * d, q[1] + u[1] * d + 4, t, 's') : ''); };
  const tx = (K, q, s, cls = '', a = 'middle') => K.t(q[0], q[1] + 4, s, cls, a);
  // Marca de ángulo recto en T, entre las direcciones hacia a y hacia b.
  const recto = (K, T, a, b, s = 8) => { const u = uni(T, a), w = uni(T, b); return K.pl([[T[0] + u[0] * s, T[1] + u[1] * s], [T[0] + (u[0] + w[0]) * s, T[1] + (u[1] + w[1]) * s], [T[0] + w[0] * s, T[1] + w[1] * s]], 'lm'); };
  const corta = (P, Q, U, V) => { const d = (Q[0] - P[0]) * (V[1] - U[1]) - (Q[1] - P[1]) * (V[0] - U[0]), t = ((U[0] - P[0]) * (V[1] - U[1]) - (U[1] - P[1]) * (V[0] - U[0])) / (d || 1e-9); return medio(P, Q, t); };
  const abre = (P, A, B) => { const d = Math.abs(Math.atan2(A[1] - P[1], A[0] - P[0]) - Math.atan2(B[1] - P[1], B[0] - P[0])) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
  const primero = (q, p, metas) => metas.findIndex((m, k) => q[k][0] !== m);

  // ============================================================================ lección 1 · cuerdas, tangentes y posiciones
  // Los trazos de la circunferencia, numerados: a cada número su nombre.  params { pide: [claves], fichas }
  const NOM = { radio: 'radio', diametro: 'diámetro', cuerda: 'cuerda', secante: 'secante', tangente: 'tangente', arco: 'arco' };
  const QUE = { radio: 'El radio va del centro a un punto de la circunferencia.', diametro: 'El diámetro es la cuerda que pasa por el centro.', cuerda: 'La cuerda une dos puntos de la circunferencia y no pasa de ahí.',
    secante: 'La secante corta la circunferencia en dos puntos y sigue de largo.', tangente: 'La tangente toca la circunferencia en un solo punto.', arco: 'El arco es un trozo de la circunferencia misma.' };
  const NC = [104, 122], NR = 66, NT = { radio: [76, 148], diametro: [130, 110], cuerda: [136, 154], secante: [78, 58], tangente: [184, 62], arco: [36, 172] };
  const chapa = (K, x, y, n) => K.c(x, y, 9, 'fc') + K.t(x, y + 4, n, 's');
  XG.rotula('nombra-circunferencia', {
    slots: p => p.pide.map((_, i) => ({ x: 286, y: 30 + i * 44, w: 92, h: 38 })),
    fichas: p => p.fichas, metas: p => p.pide.map(k => NOM[k]),
    texto: p => p.pide.map((k, i) => `${i + 1}: ${NOM[k]}`).join('; '),
    alto: p => 30 + p.pide.length * 44 - 14,
    fondo(K, p) {
      const P = g => at(NC, NR, g), s1 = P(150), s2 = P(75), u = uni(s1, s2);
      return aro(K, NC, NR) + arco(K, NC, NR, 195, 240, 'lg gr') + seg(K, P(180), P(0), 'lf') + seg(K, NC, P(250), 'la') + seg(K, P(290), P(345), 'lo')
        + K.l(s1[0] - u[0] * 26, s1[1] - u[1] * 26, s2[0] + u[0] * 30, s2[1] + u[1] * 30) + K.l(NC[0] + NR, 44, NC[0] + NR, 204, 'lm')
        + K.c(NC[0], NC[1], 3.5, 'fk') + K.t(114, 138, 'O', 's tm') + [P(180), P(0), P(250), P(290), P(345), s1, s2].map(q => K.c(q[0], q[1], 2.5, 'fk')).join('')
        + p.pide.map((k, i) => chapa(K, NT[k][0], NT[k][1], i + 1) + chapa(K, 226, 30 + i * 44, i + 1)).join('');
    },
    aviso(q, p) { const m = p.pide.map(k => NOM[k]); return QUE[p.pide[primero(q, p, m)]]; },
    bien: () => 'Cada trazo tiene su nombre según cómo toca a la circunferencia.',
  });

  // Dos ángulos centrales seguidos y sus arcos: cada arco mide lo que su ángulo, y los arcos se suman.  params { a, b, et, ops, metas, fichas, mira, ok }
  XG.cuenta('arcos-suman', 172, (K, p, f) => {
    const C = [170, 90], r = 68, g = [10, 10 + p.a, 10 + p.a + p.b], A = at(C, r, g[0]), B = at(C, r, g[1]), D = at(C, r, g[2]);
    return aro(K, C, r) + K.sec(C[0], C[1], 28, g[0], g[1], 'fa') + K.sec(C[0], C[1], 28, g[1], g[2], 'fg') + tx(K, at(C, 44, (g[0] + g[1]) / 2), gr(p.a), 's ta') + tx(K, at(C, 44, (g[1] + g[2]) / 2), gr(p.b), 's tg')
      + K.f(f, arco(K, C, r, g[0], g[1], 'la gr') + arco(K, C, r, g[1], g[2], 'lg gr') + arco(K, C, r, g[2], g[0] + 360, 'lf gr'))
      + seg(K, C, A) + seg(K, C, B) + seg(K, C, D) + pt(K, A, 'A', C) + pt(K, B, 'B', C) + pt(K, D, 'C', C) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0] - 4, C[1] + 17, 'O', 's tm');
  });

  // Una cuerda que baja: radio, media cuerda y distancia al centro forman un triángulo rectángulo.  params { r, cuerda }   v { d }
  const CC = [170, 100], CR = 78, mc = (p, d) => Math.sqrt(Math.max(0, p.r * p.r - d * d));
  XG.figura('cuerda-distancia', {
    ini: () => ({ d: 0 }),
    manijas: p => [{ k: 'd', min: 0, max: p.r - 1, paso: 1, en: v => [170, 100 + v.d * CR / p.r], de: (x, y) => (y - 100) * p.r / CR }],
    ok: (v, p) => 4 * (p.r * p.r - v.d * v.d) === p.cuerda * p.cuerda,
    sol: p => ({ d: Math.sqrt(p.r * p.r - p.cuerda * p.cuerda / 4) }),
    texto: p => `$\\sqrt{${p.r}^2 - ${p.cuerda / 2}^2} = ${Math.sqrt(p.r * p.r - p.cuerda * p.cuerda / 4)}$`,
    alto: () => 200, pie: 'Arrastra la cuerda: sube y baja.',
    dib(v, K, p, f) {
      const u = CR / p.r, y = 100 + v.d * u, h = mc(p, v.d) * u, E = [170 + h, y], m = medio(CC, E);
      return aro(K, CC, CR) + K.t(10, 20, f > 0.5 ? `cuerda: ${n1(2 * mc(p, v.d))}` : 'cuerda: ?', 'ta', 'start') + K.t(330, 20, `radio: ${p.r}`, 's tg', 'end')
        + seg(K, CC, E, 'lg') + K.t(m[0] + 8, m[1] - 6, p.r, 's tg', 'start')
        + (v.d > 0.2 ? K.l(170, 100, 170, y, 'lf d') + K.t(162, 100 + v.d * u / 2 + 4, n1(v.d), 's tf', 'end') + recto(K, [170, y], CC, E, 7) : '')
        + K.f(f, K.l(170 - h, y + 9, 170, y + 9, 'lo') + K.l(170, y + 9, 170 + h, y + 9, 'lo d')) + K.l(170 - h, y, 170 + h, y, 'la gr') + K.c(170, 100, 3.5, 'fk');
    },
    lee: (v, p) => { const c = 2 * mc(p, v.d); return `$2\\sqrt{${p.r}^2 - ${n1(v.d)}^2} ${Number.isInteger(c) ? '=' : '\\approx'} ${n1(c)}$`; },
    aviso(v, p) {
      const c = 2 * mc(p, v.d);
      return v.d === p.r - p.cuerda / 2 ? 'Restaste el radio y media cuerda, pero forman un triángulo rectángulo: va Pitágoras.' : v.d === p.cuerda / 2 ? 'Esa es media cuerda, no la distancia al centro.'
        : c > p.cuerda ? `La cuerda quedó de ${n1(c)}: está muy cerca del centro.` : `La cuerda quedó de ${n1(c)}: está muy lejos del centro.`;
    },
    bien: (v, p) => `Radio ${p.r}, media cuerda ${p.cuerda / 2} y distancia ${v.d}: un triángulo rectángulo.`,
  });

  // Dos aros: se arrastra el centro del pequeño (que no se ve) hasta donde quedarían tangentes.  params { R, r, pos: 'te' | 'ti' }   v { d }
  const AU = p => Math.min(16, 328 / (2 * p.R + 2 * p.r + 3), 78 / p.R), AX = p => 6 + p.R * AU(p), AY = 106;
  const posicion = (p, d) => (d > p.R + p.r ? 'exteriores' : d === p.R + p.r ? 'tangentes exteriores' : d > p.R - p.r ? 'secantes' : d === p.R - p.r ? 'tangentes interiores' : d > 0 ? 'interiores' : 'concéntricas');
  XG.figura('acerca-circulo', {
    ini: p => ({ d: p.R + p.r + 3 }),
    manijas: p => [{ k: 'd', min: 0, max: p.R + p.r + 3, paso: 1, en: v => [AX(p) + v.d * AU(p), AY], de: x => (x - AX(p)) / AU(p) }],
    ok: (v, p) => v.d === (p.pos === 'ti' ? p.R - p.r : p.R + p.r),
    sol: p => ({ d: p.pos === 'ti' ? p.R - p.r : p.R + p.r }),
    texto: p => (p.pos === 'ti' ? `$d = ${p.R} - ${p.r} = ${p.R - p.r}$` : `$d = ${p.R} + ${p.r} = ${p.R + p.r}$`),
    alto: () => 206, pie: 'Arrastra el centro del aro pequeño. El aro aparece al comprobar.',
    dib(v, K, p, f) {
      const u = AU(p), O = [AX(p), AY], Q = [O[0] + v.d * u, AY];
      return K.t(8, 16, `aro fijo: radio ${p.R}`, 's tm', 'start') + K.t(332, 16, `aro que mueves: radio ${p.r}`, 's ta', 'end') + aro(K, O, p.R * u) + K.f(f, aro(K, Q, p.r * u, 'la gr'))
        + seg(K, O, Q, 'lm d') + (v.d > 0.6 ? K.t((O[0] + Q[0]) / 2, AY - 8, n1(v.d), 's tf') : '') + K.c(O[0], O[1], 3.5, 'fk') + K.f(f * 2 - 1, K.t(170, 200, posicion(p, v.d), 'ta'));
    },
    lee: (v, p) => `$d = ${n1(v.d)}$; $\\;${p.R} + ${p.r} = ${p.R + p.r}$; $\\;${p.R} - ${p.r} = ${p.R - p.r}$`,
    aviso(v, p) {
      const ti = p.pos === 'ti';
      return v.d === (ti ? p.R + p.r : p.R - p.r) ? `Así se tocan por ${ti ? 'fuera' : 'dentro'}. Por ${ti ? 'dentro' : 'fuera'}, la distancia entre los centros es la ${ti ? 'resta' : 'suma'} de los radios.`
        : `Con los centros a ${v.d} quedan ${posicion(p, v.d)}. Se tocan por ${ti ? 'dentro' : 'fuera'} cuando la distancia es la ${ti ? 'resta' : 'suma'} de los radios.`;
    },
    bien: (v, p) => `Centros a ${v.d}: la ${p.pos === 'ti' ? 'resta' : 'suma'} de los radios. Se tocan en un solo punto.`,
  });

  // Según la distancia entre los centros, cómo quedan dos circunferencias.  params { et, metas, fichas, mira, trampas?, ok }
  XG.renglones('posicion-centros', { w: 132, x: 262 });

  // Desde un punto exterior: la tangente es perpendicular al radio, así que la distancia al centro es una hipotenusa.  params { r, t }   v { d }
  const TC = [76, 100], TR = 66;
  XG.figura('tangente-desde', {
    ini: p => ({ d: p.r + 1 }),
    manijas: p => [{ k: 'd', min: p.r + 1, max: 3 * p.r + 3, paso: 1, en: v => [76 + v.d * TR / p.r, 100], de: x => (x - 76) * p.r / TR }],
    ok: (v, p) => v.d * v.d === p.r * p.r + p.t * p.t,
    sol: p => ({ d: Math.sqrt(p.r * p.r + p.t * p.t) }),
    texto: p => `$\\sqrt{${p.r}^2 + ${p.t}^2} = ${Math.sqrt(p.r * p.r + p.t * p.t)}$`,
    alto: () => 200, pie: 'Arrastra el punto P: se aleja o se acerca.',
    dib(v, K, p, f) {
      const P = [76 + v.d * TR / p.r, 100], fi = Math.acos(Math.min(1, p.r / v.d)) * 180 / Math.PI, T = at(TC, TR, fi), T2 = at(TC, TR, -fi), m = medio(TC, T), n = medio(P, T);
      return aro(K, TC, TR) + seg(K, TC, P, 'lm d') + seg(K, P, T2, 'lm') + seg(K, TC, T, 'lg') + recto(K, T, TC, P) + seg(K, P, T, 'la gr')
        + K.t(m[0] - 7, m[1] + 2, p.r, 's tg', 'end') + K.t((76 + P[0]) / 2, 117, n1(v.d), 's tf') + K.t(n[0] + 6, n[1] - 8, f > 0.5 ? n1(Math.sqrt(Math.max(0, v.d * v.d - p.r * p.r))) : '?', 'ta', 'start')
        + pt(K, T, 'T', TC) + K.c(76, 100, 3.5, 'fk') + K.t(66, 96, 'O', 's tm') + K.t(Math.min(326, P[0] + 4), 84, 'P', 's');
    },
    lee: (v, p) => { const t = Math.sqrt(Math.max(0, v.d * v.d - p.r * p.r)); return `$\\sqrt{${n1(v.d)}^2 - ${p.r}^2} ${Number.isInteger(t) ? '=' : '\\approx'} ${n1(t)}$`; },
    aviso(v, p) {
      const t = Math.sqrt(v.d * v.d - p.r * p.r);
      return v.d === p.r + p.t ? 'Sumaste radio y tangente, pero forman un ángulo recto: la distancia al centro es la hipotenusa.' : v.d === p.t ? 'Esa es la medida de la tangente. La distancia al centro es la hipotenusa: más larga.'
        : `La tangente quedó de ${n1(t)}: ${t > p.t ? 'P está demasiado lejos' : 'P está demasiado cerca'}.`;
    },
    bien: (v, p) => `Radio ${p.r} y tangente ${p.t}, perpendiculares: la hipotenusa OP mide ${v.d}.`,
  });

  // Triángulo circunscrito: los dos segmentos tangentes que salen de cada vértice son congruentes.  params { x, y, z, et, metas, fichas, mira, ok }
  const TG = p => {
    const c = p.x + p.y, a = p.y + p.z, b = p.z + p.x, cx = (b * b + c * c - a * a) / (2 * c), cy = Math.sqrt(b * b - cx * cx), s = Math.min(290 / c, 112 / cy), x0 = 170 - c * s / 2, y0 = 142;
    const A = [x0, y0], B = [x0 + c * s, y0], C = [x0 + cx * s, y0 - cy * s], I = [(a * A[0] + b * B[0] + c * C[0]) / (a + b + c), (a * A[1] + b * B[1] + c * C[1]) / (a + b + c)];
    return { A, B, C, I, r: y0 - I[1], D: medio(A, B, p.x / c), E: medio(B, C, p.y / a), F: medio(A, C, p.x / b) };
  };
  XG.cuenta('tangentes-gemelas', 168, (K, p, f) => {
    const { A, B, C, I, r, D, E, F } = TG(p), dato = (P, Q, n) => { const m = medio(P, Q), u = uni(I, m); return K.t(m[0] + u[0] * 13, m[1] + u[1] * 13 + 4, n, 's ta'); };
    return K.p([A, B, C], 'fn') + aro(K, I, r, 'lm') + K.f(f, seg(K, A, D, 'la gr') + seg(K, A, F, 'la gr') + seg(K, B, D, 'lg gr') + seg(K, B, E, 'lg gr') + seg(K, C, E, 'lf gr') + seg(K, C, F, 'lf gr'))
      + dato(A, D, p.x) + dato(B, E, p.y) + dato(C, F, p.z) + pt(K, A, 'A', I) + pt(K, B, 'B', I) + pt(K, C, 'C', I) + pt(K, D, 'D', I) + pt(K, E, 'E', I) + pt(K, F, 'F', I);
  });

  // ============================================================================ lección 2 · ángulo central e inscrito
  // Se mueve B: se ve el central (lo que mide el arco) y hay que dejar el inscrito en lo pedido.  params { ang }   v { a }
  const IC = [170, 108], IR = 82, IA = 160, IP = 255;
  XG.figura('inscrito-mitad', {
    ini: () => ({ a: 60 }),
    manijas: () => [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(IC, IR, IA - v.a), de: (x, y) => vuelta(IA - gra(IC, x, y)) }],
    ok: (v, p) => v.a === 2 * p.ang,
    sol: p => ({ a: 2 * p.ang }),
    texto: p => `el arco mide $2 \\cdot ${p.ang}^\\circ = ${2 * p.ang}^\\circ$`,
    alto: () => 210, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const A = at(IC, IR, IA), B = at(IC, IR, IA - v.a), P = at(IC, IR, IP);
      return aro(K, IC, IR) + K.sec(IC[0], IC[1], 22, IA - v.a, IA, 'fg') + tx(K, at(IC, 38, IA - v.a / 2), gr(v.a), 's tg') + arco(K, IC, IR, IA - v.a, IA, 'lg gr') + seg(K, IC, A, 'lg') + seg(K, IC, B, 'lg')
        + K.ang(P, A, B, 26, f > 0.5 ? gr(v.a / 2) : '?', 'fa', 'ta') + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr') + pt(K, A, 'A', IC) + pt(K, P, 'P', IC) + K.c(IC[0], IC[1], 3.5, 'fk') + K.t(B[0] + uni(IC, B)[0] * 20, B[1] + uni(IC, B)[1] * 20 + 4, 'B', 's');
    },
    lee: v => `$${R(v.a)}^\\circ \\div 2 = ${n1(v.a / 2)}^\\circ$`,
    aviso: (v, p) => (v.a === p.ang ? 'Abriste el central igual a lo pedido, pero el inscrito es solo la mitad.' : v.a * 2 === p.ang ? 'Al revés: el arco es el doble del inscrito, no la mitad.' : `El inscrito quedó en ${v.a / 2}°: la mitad del arco de ${v.a}°.`),
    bien: v => `Arco de ${v.a}°, inscrito de ${v.a / 2}°: la mitad.`,
  });

  // Vértices desde los que se ve el arco AB con el mismo ángulo que el dorado.  params { A, B, P, pts: [{ g | c | d, si | no }], falta, ok }
  const MC = [170, 108], MR = 84, LET = 'QRSTUV';
  const donde = (p, i) => { const q = p.pts[i]; return q.c ? MC : q.d ? [MC[0] + q.d[0] * MR, MC[1] + q.d[1] * MR] : at(MC, MR, q.g); };
  XG.marca('mismo-arco', {
    sitios: p => p.pts.map((_, i) => { const [x, y] = donde(p, i); return { x: R(x), y: R(y), w: 38, h: 38, red: true }; }),
    cara(K, p, i, on) {
      const q = donde(p, i), u = p.pts[i].g == null ? [0.75, 0.75] : uni(MC, q);
      return (on ? seg(K, q, at(MC, MR, p.A), 'la') + seg(K, q, at(MC, MR, p.B), 'la') : '') + K.c(q[0], q[1], 4.5, on ? 'fA' : 'fk') + K.t(q[0] - u[0] * 12, q[1] - u[1] * 12 + 4, LET[i], 's');
    },
    fondo(K, p) {
      const A = at(MC, MR, p.A), B = at(MC, MR, p.B), P = at(MC, MR, p.P);
      return aro(K, MC, MR) + arco(K, MC, MR, p.A, p.B, 'lg gr') + K.ang(P, A, B, 24, '', 'fg') + seg(K, P, A, 'lg') + seg(K, P, B, 'lg') + pt(K, A, 'A', MC) + pt(K, B, 'B', MC) + pt(K, P, '', MC);
    },
    alto: () => 222, nombre: (p, i) => `vértice ${LET[i]}`,
    sol: p => p.pts.map((_, i) => i).filter(i => p.pts[i].si),
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.pts[k].si); return i >= 0 ? p.pts[i].no : p.falta; },
    bien: p => p.ok, texto: p => p.pts.map((q, i) => (q.si ? LET[i] : '')).filter(Boolean).join(' y '), pie: 'Toca cada vértice que cumple: se trazan sus lados.',
  });

  // Inscrito en una semicircunferencia: se mueve B hasta que el ángulo en P sea recto (AB tiene que ser un diámetro).  params { A, P }   v { b }
  const SC = [170, 106], SR = 80;
  const enP = (v, p) => R(abre(at(SC, SR, p.P), at(SC, SR, p.A), at(SC, SR, v.b)));
  XG.figura('semicirculo-recto', {
    ini: p => ({ b: p.A + 90 }),
    manijas: p => [{ k: 'b', min: p.A + 30, max: p.A + 210, paso: 15, en: v => at(SC, SR, v.b), de: (x, y) => { let g = gra(SC, x, y); while (g < p.A - 60) g += 360; return g; } }],
    ok: (v, p) => v.b === p.A + 180,
    sol: p => ({ b: p.A + 180 }),
    texto: () => 'AB debe ser un diámetro: el arco de $180^\\circ$ da un inscrito de $90^\\circ$',
    alto: () => 216, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const A = at(SC, SR, p.A), B = at(SC, SR, v.b), P = at(SC, SR, p.P), bien = Math.abs(v.b - p.A - 180) < 0.01;
      return aro(K, SC, SR) + seg(K, A, B, 'lg') + K.ang(P, A, B, 24, f > 0.5 ? gr(enP(v, p)) : '?', 'fa', 'ta') + K.f(bien ? f : 0, recto(K, P, A, B, 10)) + seg(K, P, A, 'la gr') + seg(K, P, B, 'la gr')
        + pt(K, A, 'A', SC) + pt(K, P, 'P', SC) + K.c(SC[0], SC[1], 3.5, 'fk') + K.t(SC[0], SC[1] + 17, 'O', 's tm') + K.t(B[0] + uni(SC, B)[0] * 20, B[1] + uni(SC, B)[1] * 20 + 4, 'B', 's');
    },
    lee: (v, p) => `$${2 * enP(v, p)}^\\circ \\div 2 = ${enP(v, p)}^\\circ$`,
    aviso: (v, p) => `Quedó en ${enP(v, p)}°: la cuerda AB no pasa por el centro, así que el arco no es media circunferencia.`,
    bien: () => 'AB es un diámetro: el arco mide 180° y el inscrito, su mitad, es recto.',
  });

  // Cuadrilátero inscrito: los opuestos son suplementarios.  params { arcos: [AB, BC, CD, DA], fichas }
  const QC = [112, 110], QR = 84;
  const qv = p => { const [ab, bc, cd] = p.arcos; return [140, 140 - ab, 140 - ab - bc, 140 - ab - bc - cd].map(g => at(QC, QR, g)); };
  const qa = p => { const [ab, bc, cd, da] = p.arcos; return [(bc + cd) / 2, (cd + da) / 2, (da + ab) / 2, (ab + bc) / 2]; };
  XG.rotula('cuadrilatero-inscrito', {
    slots: () => [{ x: 298, y: 78, w: 62, h: 38 }, { x: 298, y: 146, w: 62, h: 38 }],
    fichas: p => p.fichas, metas: p => [gr(qa(p)[2]), gr(qa(p)[3])],
    texto: p => { const a = qa(p); return `$\\angle C = 180^\\circ - ${a[0]}^\\circ = ${a[2]}^\\circ$ y $\\angle D = 180^\\circ - ${a[1]}^\\circ = ${a[3]}^\\circ$`; },
    alto: () => 220,
    fondo(K, p) {
      const [A, B, C, D] = qv(p), a = qa(p);
      return aro(K, QC, QR) + K.ang(A, D, B, 22, gr(a[0]), 'fa', 'ta') + K.ang(B, A, C, 22, gr(a[1]), 'fg', 'tg') + K.ang(C, B, D, 18, '', 'ff') + K.ang(D, C, A, 18, '', 'fo') + K.p([A, B, C, D], 'fn')
        + pt(K, A, 'A', QC) + pt(K, B, 'B', QC) + pt(K, C, 'C', QC) + pt(K, D, 'D', QC) + K.t(258, 83, '∠C', 'tf', 'end') + K.t(258, 151, '∠D', 'to', 'end');
    },
    aviso(q, p) {
      const a = qa(p);
      return q[0][0] === gr(a[0]) || q[1][0] === gr(a[1]) ? 'Los opuestos no son iguales: son suplementarios, suman 180°.' : q[0][0] === gr(a[3]) || q[1][0] === gr(a[2]) ? 'Van al revés: C está frente a A, y D frente a B.' : 'Un ángulo y su opuesto abarcan entre los dos toda la circunferencia: suman 180°.';
    },
    bien: () => 'En un cuadrilátero inscrito, los ángulos opuestos son suplementarios.',
  });

  // El mismo arco visto desde el centro, desde la circunferencia y desde el otro lado.  params { arco, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('tres-miradas', 176, (K, p) => {
    const C = [170, 92], r = 74, A = at(C, r, 270 - p.arco / 2), B = at(C, r, 270 + p.arco / 2), P = at(C, r, 118), Q = at(C, r, 270);
    return K.t(8, 18, `arco AB: ${p.arco}°`, 's tg', 'start') + aro(K, C, r) + arco(K, C, r, 270 - p.arco / 2, 270 + p.arco / 2, 'lg gr') + K.sec(C[0], C[1], 18, 270 - p.arco / 2, 270 + p.arco / 2, 'fg') + K.ang(P, A, B, 22, '', 'fa') + K.ang(Q, A, B, 16, '', 'ff')
      + seg(K, C, A, 'lg') + seg(K, C, B, 'lg') + seg(K, P, A, 'la') + seg(K, P, B, 'la') + seg(K, Q, A, 'lf') + seg(K, Q, B, 'lf')
      + pt(K, A, 'A', C) + pt(K, B, 'B', C) + pt(K, P, 'P', C) + pt(K, Q, 'Q', C, 11) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0], C[1] - 9, 'O', 's tm');
  });

  // Triángulo inscrito: cada ángulo es la mitad del arco de enfrente.  params { arcos: [AB, BC, CA], fichas }
  const TA = [116, 112], TQ = 76;
  const ta = p => [p.arcos[1] / 2, p.arcos[2] / 2, p.arcos[0] / 2];
  XG.rotula('triangulo-arcos', {
    slots: () => [0, 1, 2].map(i => ({ x: 298, y: 52 + i * 60, w: 62, h: 38 })),
    fichas: p => p.fichas, metas: p => ta(p).map(gr),
    texto: p => ta(p).map((x, i) => `$\\angle ${'ABC'[i]} = ${x}^\\circ$`).join(', '),
    alto: () => 224,
    fondo(K, p) {
      const [ab, bc, ca] = p.arcos, g = [215, 215 - ab, 215 - ab - bc], [A, B, C] = g.map(x => at(TA, TQ, x));
      return aro(K, TA, TQ) + K.ang(A, B, C, 18, '', 'fa') + K.ang(B, C, A, 18, '', 'fg') + K.ang(C, A, B, 18, '', 'ff') + K.p([A, B, C], 'fn')
        + tx(K, at(TA, TQ + 17, g[0] - ab / 2), gr(ab), 's tm') + tx(K, at(TA, TQ + 17, g[1] - bc / 2), gr(bc), 's tm') + tx(K, at(TA, TQ + 17, g[2] - ca / 2), gr(ca), 's tm')
        + pt(K, A, 'A', TA) + pt(K, B, 'B', TA) + pt(K, C, 'C', TA) + K.t(258, 57, '∠A', 'ta', 'end') + K.t(258, 117, '∠B', 'tg', 'end') + K.t(258, 177, '∠C', 'tf', 'end');
    },
    aviso(q, p) {
      const m = ta(p).map(gr), v = q.map(l => l[0]);
      return v.some(x => p.arcos.map(gr).includes(x)) ? 'Pusiste un arco entero: el ángulo inscrito mide la mitad.' : [...v].sort().join() === [...m].sort().join() ? 'Cada ángulo es la mitad del arco de enfrente, el que no toca su vértice.' : 'Cada ángulo inscrito mide la mitad del arco que abarca.';
    },
    bien: () => 'Cada ángulo del triángulo inscrito es la mitad del arco de enfrente.',
  });

  // Demostración afirmación–razón: el central es el doble del inscrito cuando un lado pasa por el centro.  params { et, metas, fichas, mira, ok }
  XG.renglones('razones-inscrito', { w: 156, x: 254, y0: 132, fondo(K) {
    const C = [170, 58], r = 44, P = at(C, r, 180), A = at(C, r, 0), B = at(C, r, 60);
    return aro(K, C, r) + K.ang(C, A, B, 16, '', 'fg') + K.ang(P, A, B, 20, '', 'fa') + seg(K, P, A) + seg(K, P, B, 'la') + seg(K, C, B, 'lg') + pt(K, P, 'P', C) + pt(K, A, 'A', C) + pt(K, B, 'B', C) + K.c(C[0], C[1], 3.5, 'fk') + K.t(C[0], C[1] + 17, 'O', 's tm');
  } });

  // ============================================================================ lección 3 · semiinscritos, interiores y exteriores
  // Según dónde está el vértice, la regla con los arcos.  params { et, metas, fichas, mira, ok }
  XG.renglones('donde-vertice', { w: 132, x: 262 });

  // Tangente y cuerda: se mueve B, se ve el arco y hay que dejar el semiinscrito en lo pedido.  params { ang }   v { a }
  const EC = [170, 100], ER = 76, EA = [170, 176];
  XG.figura('semiinscrito-abre', {
    ini: () => ({ a: 60 }),
    manijas: () => [{ k: 'a', min: 20, max: 200, paso: 10, en: v => at(EC, ER, 270 + v.a), de: (x, y) => vuelta(gra(EC, x, y) - 270) }],
    ok: (v, p) => v.a === 2 * p.ang,
    sol: p => ({ a: 2 * p.ang }),
    texto: p => `el arco mide $2 \\cdot ${p.ang}^\\circ = ${2 * p.ang}^\\circ$`,
    alto: () => 206, pie: 'Arrastra el punto B por la circunferencia.',
    dib(v, K, p, f) {
      const B = at(EC, ER, 270 + v.a);
      return aro(K, EC, ER) + K.l(24, 176, 316, 176) + arco(K, EC, ER, 270, 270 + v.a, 'lg gr') + tx(K, at(EC, ER + 17, 270 + v.a / 2), gr(v.a), 's tg')
        + K.ang(EA, [240, 176], B, 28, f > 0.5 ? gr(v.a / 2) : '?', 'fa', 'ta') + seg(K, EA, B, 'la gr') + K.c(170, 176, 3.5, 'fk') + K.t(156, 193, 'A', 's') + K.c(EC[0], EC[1], 3, 'fk') + K.t(B[0] - uni(EC, B)[0] * 18, B[1] - uni(EC, B)[1] * 18 + 4, 'B', 's');
    },
    lee: v => `$${R(v.a)}^\\circ \\div 2 = ${n1(v.a / 2)}^\\circ$`,
    aviso: (v, p) => (v.a === p.ang ? 'Dejaste el arco igual a lo pedido, pero el semiinscrito es solo la mitad del arco.' : v.a * 2 === p.ang ? 'Al revés: el arco es el doble del ángulo, no la mitad.' : `El semiinscrito quedó en ${v.a / 2}°: la mitad del arco de ${v.a}°.`),
    bien: v => `Arco de ${v.a}° entre la tangente y la cuerda: el ángulo mide ${v.a / 2}°.`,
  });

  // Dos cuerdas que se cortan: el ángulo interior es la semisuma de los arcos.  params { ab, ang }   v { cd }
  const XC = [170, 106], XR = 80;
  const cru = (p, cd) => { const A = at(XC, XR, 90 + p.ab / 2), B = at(XC, XR, 90 - p.ab / 2), C = at(XC, XR, 300), D = at(XC, XR, 300 - cd); return { A, B, C, D, X: corta(A, C, B, D) }; };
  XG.figura('cuerdas-cruzan', {
    ini: () => ({ cd: 40 }),
    manijas: () => [{ k: 'cd', min: 20, max: 160, paso: 10, en: v => at(XC, XR, 300 - v.cd), de: (x, y) => vuelta(300 - gra(XC, x, y)) }],
    ok: (v, p) => p.ab + v.cd === 2 * p.ang,
    sol: p => ({ cd: 2 * p.ang - p.ab }),
    texto: p => `$\\tfrac{${p.ab}^\\circ + ${2 * p.ang - p.ab}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 214, pie: 'Arrastra el punto D por la circunferencia.',
    dib(v, K, p, f) {
      const { A, B, C, D, X } = cru(p, v.cd);
      return aro(K, XC, XR) + arco(K, XC, XR, 90 - p.ab / 2, 90 + p.ab / 2, 'lg gr') + arco(K, XC, XR, 300 - v.cd, 300, 'lf gr') + tx(K, at(XC, XR + 15, 90), gr(p.ab), 's tg') + tx(K, at(XC, XR + 17, 300 - v.cd / 2), gr(v.cd), 's tf')
        + K.ang(X, A, B, 20, '', 'fa') + K.t(10, 20, `ángulo: ${f > 0.5 ? gr((p.ab + v.cd) / 2) : '?'}`, 'ta', 'start') + seg(K, A, C, 'la') + seg(K, B, D, 'la') + pt(K, A, 'A', XC) + pt(K, B, 'B', XC) + pt(K, C, 'C', XC) + K.c(X[0], X[1], 3, 'fk') + K.t(D[0] - uni(XC, D)[0] * 18, D[1] - uni(XC, D)[1] * 18 + 4, 'D', 's');
    },
    lee: (v, p) => `$\\tfrac{${p.ab}^\\circ + ${R(v.cd)}^\\circ}{2} = ${n1((p.ab + v.cd) / 2)}^\\circ$`,
    aviso: (v, p) => (v.cd === 2 * p.ang ? 'Olvidaste el arco de arriba: el ángulo interior promedia los dos arcos.' : v.cd === p.ang ? 'El ángulo no es igual a uno de sus arcos: es el promedio de los dos.' : `El ángulo quedó en ${(p.ab + v.cd) / 2}°: la semisuma de ${p.ab}° y ${v.cd}°.`),
    bien: (v, p) => `Semisuma: ${p.ab}° más ${v.cd}°, entre 2, da ${(p.ab + v.cd) / 2}°.`,
  });

  // Dos secantes desde un punto exterior: semidiferencia de los arcos.  params { n, ang }   v { m }
  const PC = [100, 104], PR = 72, pmin = p => p.n + (p.n <= 40 ? 40 : 60);
  const sec2 = (c, r, m, n) => ({ N1: at(c, r, n / 2), N2: at(c, r, -n / 2), F1: at(c, r, 180 - m / 2), F2: at(c, r, 180 + m / 2), P: [c[0] + r * Math.cos(rad(n / 2)) + r * Math.sin(rad(n / 2)) / Math.tan(rad(Math.max(4, m - n) / 4)), c[1]] });
  XG.figura('secantes-abren', {
    ini: p => ({ m: pmin(p) }),
    manijas: p => [{ k: 'm', min: pmin(p), max: 240, paso: 10, en: v => at(PC, PR, 180 + v.m / 2), de: (x, y) => 2 * (gra(PC, x, y) - 180) }],
    ok: (v, p) => v.m - p.n === 2 * p.ang,
    sol: p => ({ m: 2 * p.ang + p.n }),
    texto: p => `$\\tfrac{${2 * p.ang + p.n}^\\circ - ${p.n}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 208, pie: 'Arrastra el punto de abajo: las dos secantes se abren a la vez.',
    dib(v, K, p, f) {
      const { N1, N2, F1, F2, P } = sec2(PC, PR, v.m, p.n);
      return aro(K, PC, PR) + arco(K, PC, PR, 180 - v.m / 2, 180 + v.m / 2, 'lf gr') + arco(K, PC, PR, -p.n / 2, p.n / 2, 'lg gr') + tx(K, at(PC, PR - 22, 180), gr(v.m), 's tf') + tx(K, at(PC, PR - 18, 0), gr(p.n), 's tg')
        + K.ang(P, F1, F2, 30, '', 'fa') + seg(K, F1, P, 'la') + seg(K, F2, P, 'la') + [N1, N2, F1].map(q => K.c(q[0], q[1], 3, 'fk')).join('') + K.c(P[0], P[1], 3.5, 'fk') + K.t(Math.min(322, P[0] + 2), 84, f > 0.5 ? gr((v.m - p.n) / 2) : '?', 'ta') + K.t(Math.min(326, P[0] + 4), 124, 'P', 's');
    },
    lee: (v, p) => `$\\tfrac{${R(v.m)}^\\circ - ${p.n}^\\circ}{2} = ${n1((v.m - p.n) / 2)}^\\circ$`,
    aviso: (v, p) => (v.m + p.n === 2 * p.ang ? 'Promediaste los arcos: eso es para un vértice interior. Con el vértice afuera, los arcos se restan.' : v.m - p.n === p.ang ? 'Restaste los arcos, pero falta sacar la mitad.' : `El ángulo quedó en ${(v.m - p.n) / 2}°: la semidiferencia de ${v.m}° y ${p.n}°.`),
    bien: (v, p) => `Semidiferencia: ${v.m}° menos ${p.n}°, entre 2, da ${(v.m - p.n) / 2}°.`,
  });

  // Dos tangentes desde un punto exterior: el ángulo es la semidiferencia del arco mayor y el menor.  params { ang }   v { a }
  const GC = [92, 104], GR = 52;
  XG.figura('tangentes-abren', {
    ini: () => ({ a: 30 }),
    manijas: () => [{ k: 'a', min: 30, max: 130, paso: 10, en: v => [GC[0] + GR / Math.sin(rad(v.a / 2)), 104], de: x => (x - GC[0] <= GR ? 180 : 2 * Math.asin(GR / (x - GC[0])) * 180 / Math.PI) }],
    ok: (v, p) => v.a === p.ang,
    sol: p => ({ a: p.ang }),
    texto: p => `$\\tfrac{${180 + p.ang}^\\circ - ${180 - p.ang}^\\circ}{2} = ${p.ang}^\\circ$`,
    alto: () => 208, pie: 'Arrastra el punto P: se aleja o se acerca.',
    dib(v, K, p, f) {
      const h = 90 - v.a / 2, P = [GC[0] + GR / Math.sin(rad(v.a / 2)), 104], T1 = at(GC, GR, h), T2 = at(GC, GR, -h);
      return aro(K, GC, GR) + arco(K, GC, GR, -h, h, 'lg gr') + arco(K, GC, GR, h, 360 - h, 'lf gr') + K.t(GC[0] + GR - 20, 108, gr(180 - v.a), 's tg') + K.t(GC[0] - GR - 5, 108, gr(180 + v.a), 's tf', 'end')
        + seg(K, GC, T1, 'lm') + seg(K, GC, T2, 'lm') + recto(K, T1, GC, P, 7) + recto(K, T2, GC, P, 7) + K.ang(P, T1, T2, 26, '', 'fa') + seg(K, P, T1, 'la gr') + seg(K, P, T2, 'la gr')
        + K.c(T1[0], T1[1], 3, 'fk') + K.c(T2[0], T2[1], 3, 'fk') + K.c(GC[0], GC[1], 3, 'fk') + K.t(330, 20, `ángulo en P: ${f > 0.5 ? gr(v.a) : '?'}`, 'ta', 'end') + K.t(Math.min(326, P[0]), 128, 'P', 's');
    },
    lee: v => `$\\tfrac{${R(180 + v.a)}^\\circ - ${R(180 - v.a)}^\\circ}{2} = ${n1(v.a)}^\\circ$`,
    aviso: (v, p) => (180 - v.a === p.ang ? 'Dejaste el arco menor en lo pedido. El ángulo y el arco menor son suplementarios, no iguales.' : `El ángulo quedó en ${v.a}°: la mitad de ${180 + v.a}° menos ${180 - v.a}°.`),
    bien: v => `Semidiferencia: ${180 + v.a}° menos ${180 - v.a}°, entre 2, da ${v.a}°.`,
  });

  // Los mismos dos arcos, con el vértice adentro (cuerdas) y afuera (secantes).  params { m, n, et, metas, fichas, mira, trampas, ok }
  XG.cuenta('interior-o-exterior', 150, (K, p, f) => {
    const L = [78, 76], r = 50, D = [236, 76], s = 40, a = sec2(L, r, p.m, p.n), b = sec2(D, s, p.m, p.n), X = corta(a.F1, a.N2, a.F2, a.N1);
    const arcos = (c, q) => arco(K, c, q, 180 - p.m / 2, 180 + p.m / 2, 'lf gr') + arco(K, c, q, -p.n / 2, p.n / 2, 'lg gr');
    return aro(K, L, r) + arcos(L, r) + K.t(L[0] - r - 13, 80, gr(p.m), 's tf') + K.t(L[0] + r + 15, 80, gr(p.n), 's tg') + K.ang(X, a.F1, a.F2, 14, '', 'fa') + seg(K, a.F1, a.N2, 'la') + seg(K, a.F2, a.N1, 'la') + K.c(X[0], X[1], 3, 'fk')
      + aro(K, D, s) + arcos(D, s) + K.t(D[0] - s - 15, 80, gr(p.m), 's tf') + K.t(D[0] + s - 15, 80, gr(p.n), 's tg') + K.ang(b.P, b.F1, b.F2, 20, '', 'fa') + seg(K, b.F1, b.P, 'la') + seg(K, b.F2, b.P, 'la') + K.c(b.P[0], b.P[1], 3, 'fk')
      + K.f(f, K.t(L[0], 146, 'semisuma', 's ta') + K.t(D[0] + 20, 146, 'semidiferencia', 's ta'));
  });

  // En movimiento: un punto recorre la circunferencia y marca el arco que se le da (de 5 en 5, hasta la vuelta entera).
  XG.tiros('gira-arco', {
    perilla: () => ({ et: 'Arco', min: 0, max: 72, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 196, ms: 1600,
    dib(t, v, K, p, f) {
      const C = [170, 98], r = 76;
      let h = aro(K, C, r, 'lm');
      for (let g = 0; g < 360; g += 15) h += seg(K, at(C, g % 90 ? r - 5 : r - 10, g), at(C, r, g), 'lm');
      h += seg(K, C, at(C, r, 0), 'lm') + K.c(C[0], C[1], 3.5, 'fk');
      if (v == null) return h + K.c(C[0] + r, C[1], 6, 'fA');
      const a = v * 5 * Math.min(1, f * 1.25), q = at(C, r, a), fin = f * 5 - 4;
      return h + K.sec(C[0], C[1], 24, 0, a, 'fa') + arco(K, C, r, 0, a, 'la gr') + seg(K, C, q, 'la') + K.c(q[0], q[1], 6, 'fA') + K.f(fin, (v * 5 === t.r ? K.c(q[0], q[1], 11, 'fo') : '') + K.t(C[0], C[1] - 34, `${v * 5}°`, 'b ta'));
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Se pasó: el arco es más corto.' : 'Le faltó: el arco es más largo.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el arco y suelta: el punto gira.',
  });
})();
