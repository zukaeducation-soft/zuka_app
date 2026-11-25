// Ejercicios de «Funciones Lineales» (Preicfes, icf-ma-lineal; spec 2026-11-25-preicfes-estructura) con el plano y las barras de la
// explicación. Armazones en figura-kit y conteo-escena. La escena no dice el resultado mientras se responde.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const neutro = ['Se pasó. Comprueba ese número en el enunciado.', 'Le faltó. Comprueba ese número en el enunciado.'];
  // Plano: x de 0 a p.xm y y de 0 a p.ym, con rayas cada p.sx y p.sy.
  const PX = (p, x) => 52 + x / p.xm * 256, PY = (p, y) => 180 - y / p.ym * 150;
  const plano = (K, p) => {
    let h = '';
    for (let x = 0; x <= p.xm + 1e-9; x += p.sx || 1) h += K.l(PX(p, x), 30, PX(p, x), 180, x ? 'lr' : 'lm') + K.t(PX(p, x), 196, N(x), 's tm');
    for (let y = 0; y <= p.ym + 1e-9; y += p.sy || 1) h += K.l(52, PY(p, y), 308, PY(p, y), y ? 'lr' : 'lm') + (y && Math.round(y / (p.sy || 1)) % (p.ym / (p.sy || 1) > 8 ? 2 : 1) === 0 ? K.t(45, PY(p, y) + 4, N(y), 's tm', 'end') : '');
    return h + K.t(308, 212, p.ex || 'x', 's tm', 'end') + K.t(40, 16, p.ey || 'y', 's tm', 'start');
  };
  const linea = (K, p, pts, cls) => K.pl(pts.map(([x, y]) => [PX(p, x), PY(p, y)]), cls);

  // Un punto fijo A y otro que se arrastra: la recta entre los dos debe cambiar m por cada 1.
  const llega = p => { for (let x = p.xm; x > p.a[0]; x--) { const y = p.a[1] + p.m * (x - p.a[0]); if (y >= 0 && y <= p.ym && Number.isInteger(y)) return { x, y }; } return null; };
  XG.figura('pendiente-escalon', {
    ini: p => ({ x: p.xm, y: p.a[1] }), alto: () => 218, ms: 900, pie: 'Arrastra el punto.',
    manijas: p => [{ k: ['x', 'y'], min: [p.a[0] + 1, 0], max: [p.xm, p.ym], paso: 1, r: 10, en: v => [PX(p, v.x), PY(p, v.y)], de: (x, y) => [(x - 52) / 256 * p.xm, (180 - y) / 150 * p.ym] }],
    ok: (v, p) => Math.abs((v.y - p.a[1]) - p.m * (v.x - p.a[0])) < 1e-9,
    sol: llega, texto: p => `por ejemplo, (${llega(p).x}, ${llega(p).y})`,
    dib: (v, K, p, f) => plano(K, p) + linea(K, p, [p.a, [v.x, v.y]], 'la gr') + K.f(f, linea(K, p, [p.a, [v.x, p.a[1]], [v.x, v.y]], 'lg d')) + K.c(PX(p, p.a[0]), PY(p, p.a[1]), 6, 'fG') + K.t(PX(p, p.a[0]) - 12, PY(p, p.a[1]) - 8, 'A', 'b tg') + (f ? K.c(PX(p, v.x), PY(p, v.y), 7, 'fA') : ''),
    aviso: (v, p) => `De A a tu punto avanza ${v.x - p.a[0]} y ${v.y < p.a[1] ? 'baja' : 'sube'} ${Math.abs(v.y - p.a[1])}: compara con lo que se pide por cada 1.`, bien: (v, p) => `Cambia ${N(v.y - p.a[1])} en ${v.x - p.a[0]}: ${N(p.m)} por cada 1.`,
  });
  // Se arma la recta con lo que vale en 0 y lo que vale en xm.
  XG.figura('tarifa-recta', {
    ini: () => ({ b: 0, e: 0 }), alto: () => 218, ms: 900, pie: 'Arrastra los dos extremos de la recta.',
    manijas: p => [{ k: 'b', min: 0, max: p.ym, paso: p.sy, r: 10, en: v => [PX(p, 0), PY(p, v.b)], de: (x, y) => (180 - y) / 150 * p.ym }, { k: 'e', min: 0, max: p.ym, paso: p.sy, r: 10, en: v => [PX(p, p.xm), PY(p, v.e)], de: (x, y) => (180 - y) / 150 * p.ym }],
    ok: (v, p) => v.b === p.b && v.e === p.b + p.m * p.xm, sol: p => ({ b: p.b, e: p.b + p.m * p.xm }), texto: p => `empieza en ${N(p.b)} y llega a ${N(p.b + p.m * p.xm)}`,
    dib: (v, K, p, f) => plano(K, p) + linea(K, p, [[0, v.b], [p.xm, v.e]], 'la gr') + (f ? K.c(PX(p, 0), PY(p, v.b), 7, 'fA') + K.c(PX(p, p.xm), PY(p, v.e), 7, 'fA') : ''),
    aviso: (v, p) => (v.b !== p.b ? `Tu recta empieza en ${N(v.b)}: mira cuánto hay antes de avanzar.` : `Tu recta cambia ${N((v.e - v.b) / p.xm)} por cada 1.`), bien: (v, p) => `Empieza en ${N(p.b)} y cambia ${N(p.m)} por cada 1.`,
  });
  // Barras: lo fijo y x veces m. La escena solo muestra los datos hasta comprobar.
  const barra = (K, y, fijo, m, n, u, f) => K.r(30, y, fijo * u, 28, 'fg', 0) + (f ? Array.from({ length: n }, (_, i) => K.f(Math.min(1, Math.max(0, f * n - i)), K.r(30 + (fijo + i * m) * u, y, m * u, 28, 'fa', 0))).join('') : '');
  XG.figura('llega-presupuesto', {
    ini: () => ({ x: 0 }), alto: () => 176, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.b + p.m * v.x === p.total, sol: p => ({ x: (p.total - p.b) / p.m }), texto: p => `${(p.total - p.b) / p.m}`,
    dib: (v, K, p, f) => { const u = 270 / Math.max(p.total, f ? p.b + p.m * v.x : 0); return K.t(30, 24, `fijo ${N(p.b)} · ${N(p.m)} por cada ${p.uno}`, 's tm', 'start') + K.r(30, 34, p.total * u, 18, 'fn', 0) + K.t(Math.max(250, 30 + p.total * u), 24, N(p.total), 's', 'end') + barra(K, 62, p.b, p.m, v.x, u, f); },
    aviso: (v, p) => `Con ${v.x} se llega a ${N(p.b + p.m * v.x)}.`, bien: (v, p) => `${N(p.b)} + ${N(p.m)} · ${v.x} = ${N(p.total)}.`,
  });
  XG.figura('vacia-tanque', {
    ini: () => ({ x: 0 }), alto: () => 206, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'minutos' }], ok: (v, p) => p.b - p.m * v.x === p.q, sol: p => ({ x: (p.b - p.q) / p.m }), texto: p => `${(p.b - p.q) / p.m} minutos`,
    dib: (v, K, p, f) => { const alt = Math.max(0, p.b - p.m * v.x * f) / p.b * 110; return K.r(110, 14, 120, 116, 'fn', 4) + K.r(112, 128 - alt, 116, alt, 'fa', 2) + K.t(240, 24, `${N(p.b)} L`, 's tm', 'start') + K.t(240, 124, `−${N(p.m)} L/min`, 's tm', 'start') + K.f(f, K.l(104, 128 - p.q / p.b * 110, 236, 128 - p.q / p.b * 110, 'lf d')); },
    aviso: (v, p) => (p.b - p.m * v.x < 0 ? 'A esa hora ya no quedaba agua.' : `En ${v.x} minutos quedan ${N(p.b - p.m * v.x)}.`), bien: (v, p) => `${N(p.b)} − ${N(p.m)} · ${v.x} = ${N(p.q)}.`,
  });
  const cruce = p => (p.c[0] - p.a[0]) / (p.a[1] - p.c[1]);
  XG.figura('cruce-planes', {
    ini: () => ({ x: 0 }), alto: () => 206, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.a[0] + p.a[1] * v.x === p.c[0] + p.c[1] * v.x, sol: p => ({ x: cruce(p) }), texto: p => `${cruce(p)}`,
    dib: (v, K, p, f) => { const u = 280 / Math.max(p.a[0] + p.a[1] * p.max, p.c[0] + p.c[1] * p.max); return [[p.a, 'A', 30], [p.c, 'B', 92]].map(([t, n, y]) => K.t(30, y - 6, `${n}: fijo ${N(t[0])} · ${N(t[1])} por cada ${p.uno}`, 's tm', 'start') + barra(K, y, t[0], t[1], v.x, u, f)).join(''); },
    aviso: (v, p) => { const a = p.a[0] + p.a[1] * v.x, c = p.c[0] + p.c[1] * v.x; return `Con ${v.x}, A vale ${N(a)} y B, ${N(c)}: se llevan ${N(Math.abs(a - c))}.`; }, bien: (v, p) => `Los dos valen ${N(p.a[0] + p.a[1] * v.x)}.`,
  });
  // Desde dónde y hacia dónde conviene un plan.
  const ZX = (p, x) => 34 + x / p.max * 272;
  XG.figura('zona-conviene', {
    ini: () => ({ x: 0, d: 1 }), alto: () => 190, ms: 900, pie: 'Mueve el borde y cambia el lado.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, r: 12, en: v => [ZX(p, v.x), 46], de: x => (x - 34) / 272 * p.max }, { k: 'd', min: -1, max: 1, paso: 2, et: 'el lado', rot: v => (v.d > 0 ? '→' : '←') }],
    ok: (v, p) => v.x === p.x && v.d === p.d, sol: p => ({ x: p.x, d: p.d }), texto: p => `${p.d > 0 ? 'más' : 'menos'} de ${p.x}`,
    dib: (v, K, p, f) => { let h = K.l(34, 80, 306, 80, 'lm'); for (let i = 0; i <= p.max; i += p.st || 1) h += K.l(ZX(p, i), 76, ZX(p, i), 84, 'lm') + K.t(ZX(p, i), 100, i, 's tm'); return h + K.l(ZX(p, v.x), 46, ZX(p, v.x), 80, 'lg') + (v.d > 0 ? K.r(ZX(p, v.x), 68, 306 - ZX(p, v.x), 12, 'fa', 0) : K.r(34, 68, ZX(p, v.x) - 34, 12, 'fa', 0)) + K.t(170, 22, p.et, 's tm') + (f ? K.c(ZX(p, v.x), 46, 8, 'fG') : ''); },
    aviso: (v, p) => (v.x === p.x ? 'El borde está bien: prueba con un número de ese lado.' : `Con ${v.x}, ¿los dos planes cuestan lo mismo?`), bien: (v, p) => p.ok,
  });
  // Se ponen medidas bajo una gráfica de puntos unidos, o bajo una tabla.
  XG.cuenta('lee-pendiente', 222, (K, p) => plano(K, p) + linea(K, p, p.q, 'la gr') + (p.marca || p.q).map(([x, y]) => K.c(PX(p, x), PY(p, y), 5, 'fG')).join(''));
  XG.cuenta('historia-grafica', 222, (K, p) => plano(K, p) + linea(K, p, p.q, 'la gr') + p.q.slice(1).map(([x, y], i) => K.t((PX(p, x) + PX(p, p.q[i][0])) / 2, (PY(p, y) + PY(p, p.q[i][1])) / 2 - 9, 'ABCD'[i], 'b tg')).join(''));
  XG.cuenta('tabla-lineal', 92, (K, p) => { const n = p.t.length, w = 232 / n; return K.t(16, 34, p.ex, 's tm', 'start') + K.t(16, 72, p.ey, 's tm', 'start') + p.t.map(([x, y], i) => K.r(96 + i * w, 12, w - 4, 34, 'fc', 4) + K.r(96 + i * w, 50, w - 4, 34, 'fc', 4) + K.t(94 + (i + 0.5) * w, 34, N(x), 's') + K.t(94 + (i + 0.5) * w, 72, y == null ? '?' : N(y), y == null ? 'b tf' : 's')).join(''); });
  XG.ascensor('sube-tarifa', 60, 1, neutro);
})();
