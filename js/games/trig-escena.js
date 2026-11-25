// Ejercicios de Trigonometría con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria): la rueda, la ola,
// el triángulo, el sector, el plano y la flor. Va después de conteo-escena.js. Tres armazones:
//   rueda(nombre, n)   n puntos que se arrastran por la rueda.   params { metas: [grados…], ini?, paso?, radio?, mira, ok }
//   mueve(nombre, d)   perillas que mueven una escena.           params { ks: [[clave, min, max, rótulo, paso?]…], v, meta, …, mira, ok }
//   XG.cuenta          fichas que arman la cuenta junto a una escena.
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round;
  const XC = 170, YC = 116, RR = 84;
  // Con lo que se esconde mientras se responde: las proyecciones salen al comprobar.
  const disco = (K, f) => K.l(XC - RR - 16, YC, XC + RR + 16, YC, 'lm') + K.l(XC, YC - RR - 16, XC, YC + RR + 16, 'lm') + K.arc(XC, YC, RR, 0, 360, 'lm') + Array.from({ length: 24 }, (_, i) => { const a = K.at(XC, YC, RR - 4, i * 15), b = K.at(XC, YC, RR + 4, i * 15); return K.l(...a, ...b, 'ls'); }).join('');
  const radio = (K, g, cls, f, proy) => { const [x, y] = K.at(XC, YC, RR, g); return K.l(XC, YC, x, y, `${cls} gr`) + (proy ? K.f(f, K.l(x, y, x, YC, 'lf gr') + K.l(XC, YC, x, YC, 'lg gr')) : '') + K.f(f, K.t(...K.at(XC, YC, RR + 24, g).map((z, i) => z + (i ? 5 : 0)), `${R(g)}°`, 's')); };
  function rueda(name, n) {
    const ks = Array.from({ length: n }, (_, i) => `g${i}`), ord = v => ks.map(k => ((R(v[k]) % 360) + 360) % 360).sort((a, b) => a - b).join();
    XG.figura(name, {
      ini: p => Object.fromEntries(ks.map((k, i) => [k, p.ini?.[i] ?? 45 + 180 * i])),
      manijas: p => ks.map(k => ({ k, min: 0, max: 345, paso: p.paso || 15, en: v => { const a = rad(v[k]); return [XC + RR * Math.cos(a), YC - RR * Math.sin(a)]; }, de: (x, y) => { const a = Math.atan2(YC - y, x - XC) * 180 / Math.PI, g = (a + 360) % 360; return g > 352.5 ? 0 : g; } })),
      ok: (v, p) => ord(v) === [...p.metas].sort((a, b) => a - b).join(),
      sol: p => Object.fromEntries(ks.map((k, i) => [k, p.metas[i]])),
      texto: p => p.metas.map(g => `${g}°`).join(', '), alto: () => 232, ms: 1000, pie: n > 1 ? 'Arrastra los puntos por la rueda.' : 'Arrastra el punto por la rueda.',
      dib: (v, K, p, f) => disco(K, f) + (p.linea ? (p.linea[0] === 'y' ? K.l(XC - RR - 10, YC - RR * p.linea[1], XC + RR + 10, YC - RR * p.linea[1], 'lg d') : K.l(XC + RR * p.linea[1], YC - RR - 10, XC + RR * p.linea[1], YC + RR + 10, 'lg d')) : '') + ks.map((k, i) => radio(K, v[k], i ? 'lf' : 'la', f, n === 1)).join(''),
      aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
    });
  }
  const man = p => p.ks.map(([k, min, max, et, paso]) => ({ k, min, max, et, paso: paso || 1 }));
  function mueve(name, alto, dib, lee) {
    XG.figura(name, {
      ini: p => ({ ...p.v }), manijas: man, ok: (v, p) => p.ks.every(([k]) => Math.abs(v[k] - p.meta[k]) < 1e-6), sol: p => ({ ...p.v, ...p.meta }),
      texto: p => p.ks.map(([k, , , et]) => `${et}: ${p.meta[k]}`).join('; '), alto: p => alto + 44 * p.ks.length, ms: 1100, pie: 'Mueve las perillas. Al comprobar la escena responde.',
      dib: (v, K, p, f) => dib(v, K, p, f), lee: (v, p) => (lee ? lee(v, p) : ''), aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
    });
  }
  Object.assign(XG, { mueve });
  // ----------------------------------------------------------------------------------------------- escenas
  const ola = (v, K, p, f, al = 180) => {
    const P = XM.plano(K, 0, 4 * Math.PI, -4, 4, { H: al, g: Math.PI / 2, gy: 1 }), w = { A: 1, k: 0, w: 1, f: 0, ...v }, m = { A: 1, k: 0, w: 1, f: 0, ...p.v, ...p.meta };
    const fun = q => x => q.A * Math.sin(q.w * (x - q.f)) + q.k;
    return P.s + (p.franja ? K.l(18, P.Y(p.franja[0]), 322, P.Y(p.franja[0]), 'lg d') + K.l(18, P.Y(p.franja[1]), 322, P.Y(p.franja[1]), 'lg d') : '') + (p.sombra ? XM.curva(K, P, fun(m), 'lm d') : '') + XM.curva(K, P, fun(w)) + ((f || 0) > 0.5 ? K.l(18, P.Y(w.k), 322, P.Y(w.k), 'lf d') : '');
  };
  const tri = (K, o = {}) => { const b = o.b || 150, h = o.h || 96, x = 70, y = 124; return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fc') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.r(x + b - 10, y - 10, 10, 10, 'fn') + K.ang([x, y], [x + b, y], [x + b, y - h], 26, o.a ?? 'θ', 'fa') + K.t(x + b / 2, y + 17, o.ca ?? '', 's tg') + K.t(x + b + 8, y - h / 2 + 5, o.co ?? '', 's tf', 'start') + K.t(x + b / 2 - 12, y - h / 2 - 10, o.hi ?? '', 's ta', 'end'); };
  const libre = (K, p) => K.p([[50, 120], [270, 120], [150, 26]], 'fc') + K.t(40, 130, 'A', 's') + K.t(282, 130, 'B', 's') + K.t(150, 18, 'C', 's') + K.t(160, 138, p.c || '', 's ta') + K.t(224, 68, p.a || '', 's ta', 'start') + K.t(88, 68, p.b || '', 's ta', 'end');
  const sector = (v, K, p, f) => K.arc(XC, 100, 76, 0, 360, 'lm') + K.sec(XC, 100, 76, 0, v.g, 'fa') + K.arc(XC, 100, 76, 0, v.g, 'lf gr');
  const plano = (v, K, p, f) => { const P = XM.plano(K, -7.6, 7.6, -5, 5, { H: 210 }), q = (r, g) => [P.X(r * Math.cos(rad(g))), P.Y(r * Math.sin(rad(g)))]; return P.s + (p.z ? K.ar(P.X(0), P.Y(0), ...q(...p.z), 'lg gr') + K.t(14, 22, 'z en amarillo', 's tg', 'start') : '') + (p.pto ? K.c(P.X(p.pto[0]), P.Y(p.pto[1]), 6, 'fG') : '') + K.ar(P.X(0), P.Y(0), ...q(v.r, v.g), 'la gr') + K.f(f, K.c(...q(v.r, v.g), 6, 'fA')); };
  const rotulo = (K, p) => K.r(20, 10, 300, 54, 'fc', 10) + K.t(170, 43, p.cap || '', 'b');

  // ----------------------------------------------------------------------------------------------- juegos
  // Cada lección usa los suyos: ningún nombre se repite en el curso.
  ['coterminal-rueda', 'radianes-rueda', 'punto-unidad', 'cuadrante-referencia', 'arco-inverso', 'negativo-espejo', 'doble-vuelta', 'argumento-plano', 'vuelta-arco', 'raiz-primera', 'demoivre-rueda'].forEach(n => rueda(n, 1));
  ['gemelos-seno', 'gemelos-coseno', 'pareja-ecuacion', 'raices-opuestas', 'notables-rueda'].forEach(n => rueda(n, 2));
  mueve('sector-fraccion', 190, sector, v => `$${v.g}^\\circ$`);
  mueve('ola-amplitud', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-centro', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-periodo', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-desfase', 190, (v, K, p, f) => ola(v, K, p, f));
  mueve('catetos-razon', 170, (v, K, p, f) => { const u = 13; return tri(K, { b: v.x * u, h: v.y * u, ca: '', co: '' }); }, v => `$\\tfrac{${v.y}}{${v.x}}$`);
  mueve('escalera-apoya', 190, (v, K, p, f) => { const x = 60 + 130 * Math.cos(rad(v.g)), y = 160 - 130 * Math.sin(rad(v.g)); return K.l(40, 160, 300, 160, 'gr') + K.l(60, 160, x, y, 'la gr') + K.l(x, y, x, 160, 'lf d') + K.ang([60, 160], [200, 160], [x, y], 28, '', 'fa') + K.f(f, K.t(x + 14, (y + 160) / 2, `altura ${Math.round(Math.sin(rad(v.g)) * 100) / 100} · L`, 's tf', 'start')); }, v => `$${v.g}^\\circ$`);
  mueve('mirador', 200, (v, K, p, f) => { const b = 200, h = Math.min(170, b * Math.tan(rad(v.g))); return tri(K, { b: 190, h: Math.min(110, 190 * Math.tan(rad(v.g))), a: '', ca: `${p.d} m`, co: '' }) + K.f(f, K.t(170, 168, `${p.d} · tan ${v.g}°`, 'b ta')); }, v => `$${v.g}^\\circ$`);
  mueve('pitagoras-uno', 150, (v, K, p, f) => XM.barra(K, 30, [[v.s, 'sen²', 'ff'], [100 - v.s, '', 'fc']], { T: 100, h: 40 }) + XM.barra(K, 88, [[p.cs, 'cos² (dado)', 'fg'], [100 - p.cs, '', 'fc']], { T: 100, h: 40 }) + K.f(f, K.t(170, 148, `${v.s} + ${p.cs} = ${v.s + p.cs} centésimas`, 's')), v => `$${v.s / 100}$`);
  mueve('secante-barra', 150, (v, K, p, f) => XM.barra(K, 30, [[p.t, 'tan²', 'fa'], [1, '1', 'fg']], { T: 10, h: 36 }) + XM.barra(K, 84, [[v.s, 'sec²', 'ff']], { T: 10, h: 36 }), v => `$\\sec^2 = ${v.s}$`);
  mueve('suma-angulos', 190, (v, K, p, f) => { const [ax, ay] = K.at(90, 170, 140, p.a), [bx, by] = K.at(90, 170, 140, p.a + v.b); return K.l(40, 170, 320, 170, 'lm') + K.sec(90, 170, 56, 0, p.a, 'fa') + K.sec(90, 170, 56, p.a, p.a + v.b, 'fg') + K.l(90, 170, ax, ay, 'la gr') + K.l(90, 170, bx, by, 'lf gr') + K.f(f, K.t(300, 30, `${p.a}° + ${v.b}° = ${p.a + v.b}°`, 's', 'end')); }, v => `$${v.b}^\\circ$`);
  mueve('resta-angulos', 190, (v, K, p, f) => { const [ax, ay] = K.at(90, 170, 140, p.a), [bx, by] = K.at(90, 170, 140, p.a - v.b); return K.l(40, 170, 320, 170, 'lm') + K.sec(90, 170, 56, 0, p.a, 'fa') + K.l(90, 170, ax, ay, 'la gr') + K.l(90, 170, bx, by, 'lf gr') + K.f(f, K.t(300, 30, `${p.a}° − ${v.b}° = ${p.a - v.b}°`, 's', 'end')); }, v => `$${v.b}^\\circ$`);
  mueve('mitad-angulo', 220, (v, K, p, f) => disco(K, f) + radio(K, p.g, 'lg', 1) + radio(K, v.m, 'la', f), v => `$${v.m}^\\circ$`);
  mueve('corta-ola', 190, (v, K, p, f) => { const P = XM.plano(K, 0, 4 * Math.PI, -1.6, 1.6, { H: 180, g: Math.PI / 2, gy: 0.5 }), a = Math.asin(Math.max(-1, Math.min(1, v.h))); return P.s + XM.curva(K, P, Math.sin) + K.l(18, P.Y(v.h), 322, P.Y(v.h), 'lf gr') + (Math.abs(v.h) <= 1 && f > 0.4 ? [a, Math.PI - a, a + 2 * Math.PI, 3 * Math.PI - a, a + 4 * Math.PI].filter(x => x > -0.01 && x < 12.58).map(x => K.c(P.X(x), P.Y(v.h), 5, 'fF')).join('') : ''); }, v => `$\\operatorname{sen}x = ${v.h}$`);
  mueve('cuelga-lado', 190, (v, K, p, f) => { const A = [50, 160], C = [50 + p.b * 10 * Math.cos(rad(30)), 160 - p.b * 5], d = Math.sqrt(Math.max(0, v.a * v.a - p.b * p.b / 4)) * 10; return K.l(30, 160, 330, 160, 'lm') + K.l(...A, ...C, 'la gr') + K.t(...A.map((z, i) => z + (i ? 18 : -4)), '30°', 's') + (v.a < p.b / 2 ? K.l(C[0], C[1], C[0], C[1] + v.a * 10, 'lf gr') : f > 0.3 ? [-d, d].filter((q, i) => C[0] + q > A[0] + 2 && (i || d > 0.1)).map(q => K.l(C[0], C[1], C[0] + q, 160, 'lf gr')).join('') : K.l(C[0], C[1], C[0] + d, 160, 'lf gr')); }, v => `$a = ${v.a}$`);
  mueve('angulo-tercero', 170, (v, K, p, f) => XM.barra(K, 50, [[p.A, `A ${p.A}°`, 'fa'], [p.B, `B ${p.B}°`, 'fg'], [v.C, 'C', 'ff']], { T: 180, h: 44 }) + K.r(20, 50, 300, 44, 'fn') + K.t(320, 40, '180°', 's tm', 'end'), v => `$C = ${v.C}^\\circ$`);
  mueve('abre-bisagra', 190, (v, K, p, f) => { const [x, y] = K.at(140, 160, p.a * 14, v.g), X2 = 140 + p.b * 14; return K.l(140, 160, X2, 160, 'lg gr') + K.l(140, 160, x, y, 'la gr') + K.l(x, y, X2, 160, 'lf gr d') + K.t(140 + p.b * 7, 178, p.b, 's tg') + K.t((140 + x) / 2 - 8, (160 + y) / 2, p.a, 's ta', 'end'); }, v => `$${v.g}^\\circ$`);
  mueve('area-bisagra', 190, (v, K, p, f) => { const [x, y] = K.at(140, 160, p.a * 14, v.g), X2 = 140 + p.b * 14; return K.p([[140, 160], [X2, 160], [x, y]], 'fa') + K.l(x, y, x, 160, 'lf d') + K.t(140 + p.b * 7, 178, p.b, 's tg'); }, v => `$${v.g}^\\circ$`);
  mueve('polar-flecha', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`); mueve('producto-polar', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`); mueve('cociente-polar', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`);
  mueve('petalos', 220, (v, K, p, f) => K.c(XC, YC, RR, 'fn') + Array.from({ length: R(v.n) }, (_, k) => { const [x, y] = K.at(XC, YC, RR, v.a + 360 * k / R(v.n)); return K.l(XC, YC, x, y, 'la') + K.c(x, y, 7, k ? 'fG' : 'fF'); }).join('') + K.l(60, YC, 280, YC, 'lm'), v => `$n = ${v.n}$`);
  // Fichas junto a una escena.
  const T = (n, o) => XG.cuenta(n, 148, (K, p) => tri(K, { ...o, ...(p.t || {}) }));
  ['lados-nombra', 'razones-tres', 'recta-notables', 'recta-mitad', 'seis-razones', 'de-una-todas', 'triangulo-inversa', 'componentes-polar', 'depresion-faro'].forEach(n => T(n, {}));
  ['senos-ley', 'cosenos-ley', 'cosenos-angulo', 'senos-pareja', 'area-senos'].forEach(n => XG.cuenta(n, 148, libre));
  ['arco-cuenta', 'velocidad-cuenta', 'grados-radianes', 'vueltas-sobran-trig'].forEach(n => XG.cuenta(n, 150, (K, p) => K.arc(XC, 76, 64, 0, 360, 'lm') + K.sec(XC, 76, 64, 0, p.g, 'fa') + K.t(XC + 76, 40, p.cap || '', 's ta', 'start')));
  ['valores-eje', 'signo-valor', 'referencia-valor', 'par-impar'].forEach(n => XG.cuenta(n, 216, (K, p) => disco(K, 0) + (p.gs || []).map((g, i) => radio(K, g, ['la', 'lf', 'lg'][i % 3], 1)).join('')));
  ['lee-ola', 'ficha-ola', 'lee-periodo', 'ficha-desfase'].forEach(n => XG.cuenta(n, 186, (K, p) => ola(p.o, K, { v: p.o, meta: {} }, 0, 176)));
  ['rango-inversa', 'deshace-inversa', 'simplifica-senos', 'demuestra-pasos', 'conjugado-trig', 'reemplaza-identidad', 'suma-formula', 'suma-tangente', 'doble-cuenta', 'mitad-cuenta', 'despeja-trig', 'factoriza-trig', 'modulo-argumento', 'potencia-polar', 'raices-ordenadas'].forEach(n => XG.cuenta(n, 72, rotulo));
})();
