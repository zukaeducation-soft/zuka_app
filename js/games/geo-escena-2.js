// Ejercicios de «Triángulos y Pitágoras» (pu-ge-2) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100);
  // Catetos sobre cuadrícula: el cuadrado de la hipotenusa debe valer c2, con los dos catetos mayores que `mas`.  v { a, b }
  const U = 7.4, OX = 100, OY = 150, P = (x, y) => [OX + x * U, OY - y * U];
  const cuadrado = p => { for (let a = p.mas + 1; a < 11; a++) for (let b = a; b < 11; b++) if (a * a + b * b === p.c2) return { a, b }; return null; };
  XG.figura('cuadrado-catetos', {
    ini: () => ({ a: 4, b: 4 }),
    manijas: () => [{ k: 'a', min: 1, max: 10, paso: 1, r: 9, en: v => P(0, v.a), de: (x, y) => (OY - y) / U }, { k: 'b', min: 1, max: 10, paso: 1, r: 9, en: v => P(v.b, 0), de: x => (x - OX) / U }],
    ok: (v, p) => v.a ** 2 + v.b ** 2 === p.c2 && Math.min(v.a, v.b) > p.mas,
    sol: cuadrado,
    texto(p) { const s = cuadrado(p); return `$${s.a}^2 + ${s.b}^2 = ${s.a ** 2} + ${s.b ** 2} = ${p.c2}$`; },
    alto: () => 245, pie: 'Arrastra las puntas de los dos catetos.',
    dib(v, K, p, f) {
      const { a, b } = v, A = Math.round(a), B = Math.round(b), ent = a === A && b === B;
      const rej = (x0, y0, n) => { let h = ''; for (let i = 1; i < n; i++) h += K.l(...P(x0 + i, y0), ...P(x0 + i, y0 + n), 'lr') + K.l(...P(x0, y0 + i), ...P(x0 + n, y0 + i), 'lr'); return h; };
      return K.p([P(0, 0), P(b, 0), P(b, -b), P(0, -b)], 'fa') + K.p([P(0, 0), P(0, a), P(-a, a), P(-a, 0)], 'fg') + (ent ? rej(0, -B, B) + rej(-A, 0, A) : '')
        + K.f(f, K.p([P(b, 0), P(0, a), P(a * f, a + b * f), P(b + a * f, b * f)], 'ff')) + K.f(f * 2 - 1, K.t(...P((a + b) / 2, (a + b) / 2 - 0.7), N(a * a + b * b), 'tf'))
        + K.p([P(0, 0), P(b, 0), P(0, a)], 'fc') + K.pl([P(0, 1), P(1, 1), P(1, 0)], 'lm');
    },
    lee: v => `$${Math.round(v.a)}^2 + ${Math.round(v.b)}^2 = ${Math.round(v.a) ** 2 + Math.round(v.b) ** 2}$`,
    aviso: (v, p) => (v.a ** 2 + v.b ** 2 === p.c2 ? `Suma bien, pero un cateto no es mayor que ${p.mas}.` : v.a ** 2 + v.b ** 2 > p.c2 ? 'El cuadrado de la hipotenusa quedó más grande.' : 'El cuadrado de la hipotenusa quedó más chico.'),
    bien: () => 'Los dos cuadrados de los catetos llenan el de la hipotenusa.',
  });

  // Cable tenso de largo c con el pie a b del mástil: cuánto mide el mástil.  v { h }
  const u2 = 6.8, M0 = [130, 206];
  XG.figura('cateto-falta', {
    ini: () => ({ h: 8 }),
    manijas: () => [{ k: 'h', min: 4, max: 28, paso: 1, en: v => [M0[0], M0[1] - v.h * u2], de: (x, y) => (M0[1] - y) / u2 }],
    ok: (v, p) => v.h ** 2 + p.b ** 2 === p.c ** 2,
    sol: p => ({ h: Math.sqrt(p.c ** 2 - p.b ** 2) }),
    texto: p => `$\\sqrt{${p.c}^2 - ${p.b}^2} = \\sqrt{${p.c ** 2 - p.b ** 2}} = ${Math.sqrt(p.c ** 2 - p.b ** 2)}$`,
    alto: () => 234, pie: 'Arrastra la punta del mástil.',
    dib(v, K, p, f) {
      const E = [M0[0] + p.b * u2, M0[1]], top = [M0[0], M0[1] - v.h * u2], k = p.c / Math.hypot(v.h, p.b) * f;
      return K.l(30, M0[1], 310, M0[1], 'lm') + K.l(...M0, ...top, 'gr') + K.t(M0[0] - 14, (M0[1] + top[1]) / 2 + 5, N(v.h), 'ta', 'end') + K.cota(M0[0], 212, E[0], 212, `${p.b}`)
        + (f ? K.l(...E, E[0] + (top[0] - E[0]) * k, E[1] + (top[1] - E[1]) * k, 'lf gr') : K.l(232, 60, 310, 60, 'lf gr')) + K.t(271, 46, `cable: ${p.c}`, 'tf') + K.c(...E, 4, 'fk') + K.pl([[M0[0], M0[1] - 10], [M0[0] + 10, M0[1] - 10], [M0[0] + 10, M0[1]]], 'lm');
    },
    lee: (v, p) => `$${Math.round(v.h)}^2 + ${p.b}^2 = ${Math.round(v.h) ** 2 + p.b ** 2} \\qquad ${p.c}^2 = ${p.c ** 2}$`,
    aviso: (v, p) => (v.h === p.c - p.b ? 'Restaste los lados. Se restan sus cuadrados.' : v.h ** 2 + p.b ** 2 > p.c ** 2 ? 'El cable no alcanza a llegar a la punta.' : 'Sobra cable: no queda tenso.'),
    bien: () => 'El cable llega justo: su cuadrado es la suma de los otros dos.',
  });

  // Tres triángulos de la misma familia, cada uno con un lado por hallar. tri: [{ a, b }, { a, h }, …]
  const falta = t => Math.sqrt(t.h ? t.h ** 2 - t.a ** 2 : t.a ** 2 + t.b ** 2);
  XG.rotula('lados-familia', {
    slots: p => p.tri.map((t, i) => (t.h ? { x: 71 + i * 109, y: 172, w: 54, h: 36 } : { x: 88 + i * 109, y: 60, w: 50, h: 36 })),
    fichas: p => p.fichas, metas: p => p.tri.map(t => String(falta(t))),
    texto: p => p.tri.map(t => (t.h ? `$${t.h}^2 - ${t.a}^2 = ${falta(t)}^2$` : `$${t.a}^2 + ${t.b}^2 = ${falta(t)}^2$`)).join(', '),
    alto: () => 200,
    fondo: (K, p) => p.tri.map((t, i) => {
      const x = 36 + i * 109, y = 140;
      return K.p([[x, y], [x + 70, y], [x, y - 53]], ['fa', 'fg', 'ff'][i]) + K.pl([[x, y - 9], [x + 9, y - 9], [x + 9, y]], 'lm') + K.t(x - 6, y - 22, t.a, '', 'end') + (t.h ? K.t(x + 44, y - 36, t.h, '', 'start') : K.t(x + 35, y + 18, t.b) + K.l(x + 40, y - 32, x + 52, y - 58, 'lm d'));
    }).join(''),
    aviso(q, p) { const t = p.tri.find((t, i) => !t.h && q[i][0] === String(t.a + t.b)); return t ? `${t.a} + ${t.b} es ir por el borde: la hipotenusa es más corta.` : 'Todos son 3-4-5 agrandados: busca por cuánto se multiplicó cada uno.'; },
    bien: () => 'Los tres son un 3-4-5 agrandado.',
  });

  // La cinta que mide la diagonal de un cuadrado: se corta acostada y al comprobar gira 45°.  v { c }
  const u3 = 11, Q = [60, 186];
  XG.figura('diagonal-cuadrado', {
    ini: p => ({ c: p.lado }),
    manijas: p => [{ k: 'c', min: p.lado, max: 2 * p.lado, paso: 0.5, en: v => [Q[0] + v.c * u3, Q[1]], de: x => (x - Q[0]) / u3 }],
    ok: (v, p) => Math.abs(v.c - p.lado * Math.SQRT2) <= 0.25,
    sol: p => ({ c: Math.round(2 * p.lado * Math.SQRT2) / 2 }),
    texto: p => `$${p.lado}\\sqrt{2} \\approx ${Math.round(p.lado * Math.SQRT2 * 10) / 10}$`,
    alto: () => 216, pie: 'Arrastra la punta de la cinta.',
    dib(v, K, p, f) {
      const S = p.lado * u3;
      return K.r(Q[0], Q[1] - S, S, S, 'fc') + K.t(Q[0] - 10, Q[1] - S / 2 + 5, p.lado, 'tm', 'end') + K.l(...Q, ...K.at(...Q, v.c * u3, 45 * f), 'lf gr') + K.c(Q[0] + S, Q[1] - S, 5, f < 1 ? 'fM' : Math.abs(v.c - p.lado * Math.SQRT2) <= 0.25 ? 'fo' : 'ff') + K.t(Q[0] + 10, Q[1] + 24, `cinta: ${N(v.c)}`, 'tf', 'start');
    },
    lee: (v, p) => `$${p.lado}^2 + ${p.lado}^2 = ${2 * p.lado ** 2} \\qquad ${N(v.c)}^2 = ${N(v.c * v.c)}$`,
    aviso: (v, p) => (v.c === 2 * p.lado ? 'Eso es ir por dos lados del borde.' : v.c > p.lado * Math.SQRT2 ? 'La cinta se pasa de la esquina.' : 'La cinta no llega a la esquina.'),
    bien: () => 'La diagonal es el lado por raíz de 2, casi una vez y media.',
  });

  // Medio triángulo equilátero: lado, mitad de la base y altura.
  const eqMetas = p => [`${p.per / 3}`, `${p.per / 6}`, `${p.per / 6}√3`];
  XG.rotula('equilatero-partes', {
    slots: () => [{ x: 64, y: 92, w: 62, h: 36 }, { x: 130, y: 206, w: 62, h: 36 }, { x: 282, y: 128, w: 62, h: 36 }],
    fichas: p => p.fichas, metas: eqMetas,
    texto: p => `lado $${p.per / 3}$, media base $${p.per / 6}$ y altura $${p.per / 6}\\sqrt3$`,
    alto: () => 230,
    fondo(K, p) {
      const A = [90, 178], B = [250, 178], C = [170, 39.4], M = [170, 178];
      return K.p([A, B, C], 'fc') + K.p([A, M, C], 'fa') + K.l(...C, ...M, 'lf gr') + K.ang(A, M, C, 26, '60°', 'fg', 's') + K.pl([[170, 168], [160, 168], [160, 178]], 'lm') + K.l(174, 124, 248, 128, 'lf d') + K.t(170, 22, `perímetro del triángulo grande: ${p.per}`, 's tm');
    },
    aviso(q, p) { const m = eqMetas(p); return q[0][0] !== m[0] ? 'Los tres lados son iguales: reparte el perímetro entre tres.' : q[1][0] !== m[1] ? 'La altura cae en la mitad de la base.' : 'Con 30°, 60° y 90° los lados son x, x√3 y 2x.'; },
    bien: () => 'Medio equilátero: x, x√3 y 2x.',
  });

  // Un punto de la cuadrícula a distancia d de A, en diagonal.  v { x, y }
  const G = 24, GP = (x, y) => [26 + x * G, 232 - y * G];
  const lejos = p => { for (let x = p.A[0] + 1; x <= 12; x++) for (let y = p.A[1] + 1; y <= 9; y++) if ((x - p.A[0]) ** 2 + (y - p.A[1]) ** 2 === p.d ** 2) return { x, y }; return null; };
  XG.figura('a-diez-pasos', {
    ini: () => ({ x: 4, y: 3 }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [12, 9], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 26) / G, (232 - y) / G] }],
    ok: (v, p) => (v.x - p.A[0]) ** 2 + (v.y - p.A[1]) ** 2 === p.d ** 2 && v.x !== p.A[0] && v.y !== p.A[1],
    sol: lejos,
    texto(p) { const s = lejos(p); return `$${s.x - p.A[0]}^2 + ${s.y - p.A[1]}^2 = ${p.d}^2$`; },
    alto: () => 250, pie: 'Arrastra el punto por la cuadrícula.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 9), 'ls');
      for (let j = 0; j <= 9; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
      const A = GP(...p.A), B = GP(v.x, v.y), C = GP(v.x, p.A[1]);
      if (f) {
        h += K.f(f, Array.from({ length: 31 }, (_, k) => K.at(...A, p.d * G, 3 * k)).filter(q => q[0] < 315 && q[1] > 15).map(q => K.c(...q, 2, 'fo')).join(''))
          + K.f(f, K.p([A, C, B], 'fa') + K.t((A[0] + C[0]) / 2, A[1] + 15, Math.abs(Math.round(v.x - p.A[0])), 's ta') + K.t(C[0] + (v.x > 10 ? -10 : 12), (C[1] + B[1]) / 2 + 5, Math.abs(Math.round(v.y - p.A[1])), 's ta')) + K.l(...A, A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 'lf gr');
      }
      return h + K.c(...A, 6, 'fk') + K.t(A[0] - 10, A[1] - 8, 'A');
    },
    lee: (v, p) => { const a = Math.abs(Math.round(v.x) - p.A[0]), b = Math.abs(Math.round(v.y) - p.A[1]); return `$${a}^2 + ${b}^2 = ${a * a + b * b} \\qquad ${p.d}^2 = ${p.d ** 2}$`; },
    aviso: (v, p) => (v.x === p.A[0] || v.y === p.A[1] ? 'Debe quedar en diagonal.' : Math.abs(v.x - p.A[0]) + Math.abs(v.y - p.A[1]) === p.d ? 'Contaste el camino por la cuadrícula; en línea recta es menos.' : (v.x - p.A[0]) ** 2 + (v.y - p.A[1]) ** 2 > p.d ** 2 ? 'Quedó más lejos.' : 'Quedó más cerca.'),
    bien: () => 'La distancia es la hipotenusa del triángulo de la cuadrícula.',
  });

  // Dos triángulos que comparten la altura: del primero sale la altura y con ella el segundo cable.  v { c }
  const u4 = 6, F = [132, 186], alt = p => Math.sqrt(p.c1 ** 2 - p.b1 ** 2);
  XG.figura('dos-pasos', {
    ini: () => ({ c: 12 }),
    manijas: p => [{ k: 'c', min: 8, max: 40, paso: 1, inv: true, en: v => [F[0] + p.b2 * u4 - v.c * u4, F[1]], de: x => (F[0] + p.b2 * u4 - x) / u4 }],
    ok: (v, p) => v.c ** 2 === alt(p) ** 2 + p.b2 ** 2,
    sol: p => ({ c: Math.hypot(alt(p), p.b2) }),
    texto: p => `altura $\\sqrt{${p.c1}^2 - ${p.b1}^2} = ${alt(p)}$ y cable $\\sqrt{${alt(p)}^2 + ${p.b2}^2} = ${Math.hypot(alt(p), p.b2)}$`,
    alto: () => 222, pie: 'Arrastra la punta del cable que está en el suelo.',
    dib(v, K, p, f) {
      const h = alt(p), top = [F[0], F[1] - h * u4], B = [F[0] + p.b2 * u4, F[1]], g = Math.atan2(h, p.b2) * 180 / Math.PI;
      return K.l(6, F[1], 330, F[1], 'lm') + K.l(...F, ...top, 'gr') + K.l(F[0] - p.b1 * u4, F[1], ...top, 'la gr') + K.t(F[0] - p.b1 * u4 / 2 - 14, F[1] - h * u4 / 2, p.c1, 'ta', 'end') + K.cota(F[0] - p.b1 * u4, 196, F[0], 196, p.b1) + K.cota(F[0], 196, B[0], 196, p.b2)
        + K.l(...B, ...K.at(...B, v.c * u4, 180 - g * f), 'lf gr') + K.t(B[0] + 30, 60, `cable: ${N(v.c)}`, 'tf', 'end') + K.f(f, K.t(F[0] + 8, F[1] - h * u4 / 2 + 22, h, 'tm', 'start')) + K.c(...top, 5, f < 1 ? 'fM' : Math.abs(v.c - Math.hypot(h, p.b2)) < 0.1 ? 'fo' : 'ff');
    },
    lee: (v, p) => `$${alt(p)}^2 + ${p.b2}^2 = ${alt(p) ** 2 + p.b2 ** 2} \\qquad ${Math.round(v.c)}^2 = ${Math.round(v.c) ** 2}$`,
    aviso: (v, p) => (v.c === alt(p) + p.b2 ? 'Sumaste los lados; se suman los cuadrados.' : v.c === p.c1 ? 'Ese es el otro cable: este tiene el pie más lejos.' : v.c > Math.hypot(alt(p), p.b2) ? 'Sobra cable.' : 'El cable no llega a la punta.'),
    bien: () => 'Primero la altura, que comparten los dos; después el otro cable.',
  });

  // En movimiento: una cuerda sale y debe medir justo el lado que falta. tiro: { a, b, r } (hipotenusa) o { h, b, r } (cateto)
  XG.tiros('lanza-cuerda', {
    perilla: () => ({ et: 'Cuerda', min: 0, max: 50, lee: v => `${v} m` }),
    meta: t => t.r, alto: 196, ms: 1500,
    dib(t, v, K, p, f) {
      const hip = t.a != null, a = hip ? t.a : t.r, b = t.b, u = Math.min(128 / a, 190 / b), A = [80, 168], B = [80 + b * u, 168], C = [80, 168 - a * u], [D, E] = hip ? [B, C] : [A, C], k = v == null ? 0 : v * f / t.r;
      return K.l(20, 168, 330, 168, 'lm') + K.pl([[80, 158], [90, 158], [90, 168]], 'lm') + (hip ? K.l(...A, ...C, 'gr') + K.t(68, (A[1] + C[1]) / 2 + 5, a, 'ta', 'end') : K.l(...B, ...C, 'gr') + K.t((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2 - 6, t.h, 'ta', 'start')) + K.t((A[0] + B[0]) / 2, 188, b, 'ta') + K.l(...A, ...B, 'gr')
        + (v == null ? K.l(...D, ...E, 'lm d') : K.l(...D, D[0] + (E[0] - D[0]) * k, D[1] + (E[1] - D[1]) * k, 'lf gr')) + K.c(...E, 7, f >= 1 ? (v === t.r ? 'fo' : 'ff') : 'fM') + K.c(...D, 4, 'fk');
    },
    falla: (t, v) => (t.a != null ? (v === t.a + t.b ? 'Sumaste los lados; se suman los cuadrados.' : v > t.r ? 'Se pasó de largo.' : 'No llegó.') : v === t.h - t.b ? 'Restaste los lados; se restan los cuadrados.' : v > t.r ? 'Se pasó de largo.' : 'No llegó.'),
    cuenta: t => (t.a != null ? `$\\sqrt{${t.a}^2 + ${t.b}^2} = ${t.r}$` : `$\\sqrt{${t.h}^2 - ${t.b}^2} = ${t.r}$`), pie: 'Estira la cuerda y suelta: sale hacia el punto.',
  });
})();
