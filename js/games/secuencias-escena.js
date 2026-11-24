// Ejercicios de «Secuencias y patrones» (pu-se-1 a pu-se-3) con las escenas de la explicación: fichas con saltos, alfabeto, figuras que
// crecen y ruedas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, mod = (a, n) => ((a % n) + n) % n, neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Fila de fichas; `saltos` dibuja arcos con su rótulo.
  const fila = (K, T, y, o = {}) => { const n = T.length, w = Math.min(54, 324 / n), X = i => 170 + (i - (n - 1) / 2) * w; return T.map((t, i) => (t === '' ? '' : K.r(X(i) - w / 2 + 3, y, w - 6, 36, o.cls ? o.cls(i) : 'fa', 9) + K.t(X(i), y + 24, t))).join('') + (o.saltos || []).map((t, i) => (t ? `<path class="xl la" d="M${R(X(i)) + 4} ${y - 3} Q${R((X(i) + X(i + 1)) / 2)} ${y - 30} ${R(X(i + 1)) - 4} ${y - 3}"/>` + K.t((X(i) + X(i + 1)) / 2, y - 24, t, 's ta') : '')).join(''); };
  const xs = (n, i) => 170 + (i - (n - 1) / 2) * Math.min(54, 324 / n);

  // ----------------------------------------------------------------------------------------- pu-se-1 · sucesiones numéricas
  // Qué lugar ocupa un número.  v { n }
  XG.figura('que-lugar', {
    ini: () => ({ n: 6 }), manijas: p => [{ k: 'n', min: 6, max: p.max, paso: 1, et: 'lugar' }], ok: (v, p) => p.a + (v.n - 1) * p.d === p.meta, sol: p => ({ n: (p.meta - p.a) / p.d + 1 }), texto: p => `$(${p.meta} - ${p.a}) \\div ${p.d} = ${(p.meta - p.a) / p.d}$ saltos: lugar ${(p.meta - p.a) / p.d + 1}`, alto: () => 186, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => fila(K, [p.a, p.a + p.d, p.a + 2 * p.d, '…', f > 0.6 ? p.a + (R(v.n) - 1) * p.d : '?'], 62, { cls: i => (i === 4 ? 'fg' : 'fa'), saltos: f ? [`+${p.d}`, `+${p.d}`] : [] }) + [0, 1, 2].map(i => K.t(xs(5, i), 116, i + 1, 's tm')).join('') + K.t(xs(5, 4), 116, R(v.n), 's tg') + K.f(f, K.t(xs(5, 4), 22, `${R(v.n) - 1} saltos`, 's ta')),
    lee: (v, p) => `$${p.a} + ${R(v.n) - 1} \\cdot ${p.d} = ${p.a + (R(v.n) - 1) * p.d}$`, aviso: (v, p) => (p.a + v.n * p.d === p.meta ? 'Esos son los saltos: el lugar es uno más.' : p.a + (v.n - 1) * p.d > p.meta ? 'En ese lugar el número ya es mayor.' : 'En ese lugar el número todavía es menor.'), bien: v => `${v.n - 1} saltos llevan al lugar ${v.n}.`,
  });
  // Huecos en una fila: params { t: [números, con null en los huecos], arriba?: [rótulos, con null], fichas, … }
  const huecos = (nombre, d) => XG.rotula(nombre, {
    slots: p => [...(p.arriba || []).map((t, i) => (t === null ? { x: R((xs(p.t.length, i) + xs(p.t.length, i + 1)) / 2), y: 34, w: 46, h: 34 } : null)), ...p.t.map((t, i) => (t === null ? { x: R(xs(p.t.length, i)), y: p.arriba ? 96 : 58, w: Math.min(46, R(324 / p.t.length) - 3), h: 38 } : null))].filter(Boolean),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: p => (p.arriba ? 124 : 92),
    fondo: (K, p) => fila(K, p.t.map(t => t ?? ''), p.arriba ? 78 : 40) + (p.arriba || []).map((t, i) => { const a = xs(p.t.length, i), b = xs(p.t.length, i + 1); return `<path class="xl la" d="M${R(a) + 4} 75 Q${R((a + b) / 2)} 52 ${R(b) - 4} 75"/>` + (t === null ? '' : K.t((a + b) / 2, 40, t, 's ta')); }).join(''),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok, ...d,
  });
  huecos('saltos-crecen'); huecos('mezcladas-siguen'); huecos('suma-dos');
  XG.cuenta('termino-lejano', 92, (K, p) => fila(K, [...p.t, '…'], 46, { saltos: p.t.slice(1).map(() => `+${p.t[1] - p.t[0]}`) }));
  // Dos filas con un término que rompe la regla en cada una.
  XG.marca('rompe-fila', {
    sitios: p => p.filas.flatMap((f, r) => f.map((_, i) => ({ x: R(170 + (i - (f.length - 1) / 2) * 54), y: 36 + r * 64, w: 48, h: 44 }))), cara: (K, p, i) => { const n = p.filas[0].length; return K.t(170 + (i % n - (n - 1) / 2) * 54, 42 + Math.floor(i / n) * 64, p.filas[Math.floor(i / n)][i % n]); }, alto: p => p.filas.length * 64 + 8,
    sol: p => p.malos.map((m, r) => r * p.filas[0].length + m), aviso(on, p) { const n = p.filas[0].length, q = p.filas.map((_, r) => on.slice(r * n, r * n + n).map((x, i) => (x ? i : -1)).filter(i => i >= 0)), r = q.findIndex((l, k) => l.length !== 1 || l[0] !== p.malos[k]), l = q[r]; return l.length > 1 ? `En la fila ${r + 1} hay un solo equivocado.` : l.length ? `El ${p.filas[r][l[0]]} no es: el equivocado daña el paso que llega a él y el que sale.` : `Falta el de la fila ${r + 1}.`; }, bien: p => p.ok, texto: p => p.malos.map((m, r) => `el ${p.filas[r][m]} debía ser ${p.buenos[r]}`).join('; '), pie: 'Toca, en cada fila, el término que rompe la regla.',
  });
  XG.rotula('cada-regla', {
    slots: p => p.filas.map((_, i) => ({ x: 270, y: 32 + i * 54, w: 118, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => p.filas.length * 54 + 12, fondo: (K, p) => p.filas.map((f, i) => K.t(196, 38 + i * 54, f.join(', '), '', 'end')).join(''),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: () => 'Una regla sirve solo si funciona en todos los pasos.',
  });
  XG.ascensor('sube-termino', 50, 1, neutro);

  // -------------------------------------------------------------------------------------------- pu-se-2 · letras y figuras
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = i => 22 + (i % 13) * 24.6, LY = i => (i < 13 ? 64 : 126);
  XG.figura('letra-sigue', {
    ini: () => ({ i: 24 }), manijas: () => [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[R(v.i)], en: v => [LX(R(v.i)), LY(R(v.i))], de: (x, y) => Math.max(0, Math.min(12, R((x - 22) / 24.6))) + (y > 95 ? 13 : 0) }], ok: (v, p) => ABC[v.i] === p.meta, sol: p => ({ i: ABC.indexOf(p.meta) }), texto: p => `sigue la ${p.meta}, la letra ${ABC.indexOf(p.meta) + 1}`, alto: () => 166, pie: 'Arrastra el señalador por el alfabeto.',
    dib: (v, K, p, f) => [...ABC].map((l, i) => { const on = p.seq.includes(l), m = f && l === ABC[R(v.i)]; return K.c(LX(i), LY(i), 11.5, m ? (l === p.meta ? 'fo' : 'ff') : on ? 'fA' : 'fc') + K.t(LX(i), LY(i) + 5, l, on && !m ? 'tc s' : 's') + K.t(LX(i), LY(i) + 27, i + 1, 's tm'); }).join('') + K.t(170, 28, `${[...p.seq].join(' · ')} · ?`, 'b ta'),
    lee: (v, p) => `$${[...p.seq].map(l => ABC.indexOf(l) + 1).join(', \\; ')}, \\; ${R(v.i) + 1}$`, aviso(v, p) { const n = [...p.seq].map(l => ABC.indexOf(l)), u = n.at(-1), d = u - n.at(-2); return v.i === u + d ? 'Repetiste el último salto; los saltos también cambian.' : `De la ${p.seq.at(-1)} a la ${ABC[v.i]} el salto es de ${Math.abs(v.i - u)}${v.i < u ? ', hacia atrás' : ''}: no sigue la regla.`; }, bien: () => 'Con números se ve la regla de los saltos.',
  });
  huecos('letras-atras');
  // Figuras de puntos.  dib según p.n
  const te = (K, n, cx, cy, u) => { let h = K.c(cx, cy, u * 0.42, 'fA'); for (let k = 1; k <= n; k++) for (let a = 0; a < 5; a++) h += K.c(...K.at(cx, cy, k * u, 90 + a * 72), u * 0.42, 'fA'); return h; };
  XG.figura('brazos-estrella', {
    ini: () => ({ n: 3 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'figura' }], ok: (v, p) => 5 * v.n + 1 === p.total, sol: p => ({ n: (p.total - 1) / 5 }), texto: p => `$5n + 1 = ${p.total}$: figura ${(p.total - 1) / 5}`, alto: () => 226, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), u = Math.min(16, 76 / n); return f ? te(K, n, 170, 88, u) + K.f(f, K.t(332, 150, `${5 * n + 1} puntos`, 'ta', 'end')) : [1, 2, 3].map(k => te(K, k, 62 + (k - 1) * 108, 64, 15) + K.t(62 + (k - 1) * 108, 134, `figura ${k}`, 's tm')).join(''); },
    lee: v => `$5 \\cdot ${R(v.n)} + 1 = ${5 * R(v.n) + 1}$`, aviso: (v, p) => (6 + 5 * v.n === p.total ? 'Contaste los saltos: la figura 1 ya tenía sus 6 puntos.' : 5 * v.n + 1 > p.total ? 'Tiene más puntos.' : 'Tiene menos puntos.'), bien: v => `Uno fijo en el centro y cinco brazos de ${v.n}.`,
  });
  XG.cuenta('fijo-y-crece', 96, (K, p, f) => p.t.map((n, k) => Array.from({ length: n }, (_, i) => K.r(18 + k * 112 + (i % 6) * 15, 8 + Math.floor(i / 6) * 15, 13, 13, f && i < p.fijo ? 'fG' : 'fa', 2)).join('') + K.t(62 + k * 112, 88, `figura ${k + 1}: ${n}`, 's tm')).join(''));
  const escal = (n, r, c) => r + c < n;   // r desde abajo
  XG.marca('escalera-cuatro', {
    sitios: p => Array.from({ length: p.lado * p.lado }, (_, i) => ({ x: 196 + (i % p.lado) * 30, y: 34 + Math.floor(i / p.lado) * 30, w: 27, h: 27 })), cara: () => '', alto: p => p.lado * 30 + 30, nombre: (p, i) => `fila ${Math.floor(i / p.lado) + 1}, columna ${i % p.lado + 1}`,
    fondo: (K, p) => [1, 2, 3].map(n => { let h = ''; for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (escal(n, r, c)) h += K.r([12, 44, 100][n - 1] + c * 20, 140 - r * 20, 19, 19, 'fg', 2); return h + K.t([12, 44, 100][n - 1] + n * 10, 176, n, 's tm'); }).join('') + K.t(256, 14, `figura ${p.n}`, 's tm'),
    sol: p => Array.from({ length: p.lado * p.lado }, (_, i) => i).filter(i => escal(p.n, p.lado - 1 - Math.floor(i / p.lado), i % p.lado)), aviso: (on, p) => { const k = on.filter(Boolean).length, t = p.n * (p.n + 1) / 2; return k === t ? 'La cantidad está bien; la forma debe ser como las anteriores, pegada a la izquierda y al piso.' : k < t ? 'Faltan cuadros: cada figura agrega una diagonal completa.' : 'Sobran cuadros.'; }, bien: p => `Agrega ${p.n} a la anterior: ${p.n * (p.n + 1) / 2} en total.`, texto: p => `${p.n * (p.n + 1) / 2} cuadros, en escalera`, pie: 'Arma la figura en la cuadrícula.',
  });
  XG.rotula('dos-reglas', {
    slots: () => [{ x: 256, y: 64, w: 56, h: 44 }, { x: 312, y: 64, w: 50, h: 44 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 100, fondo: (K, p) => p.t.map(([l, n], i) => K.r(8 + i * 56, 42, 50, 44, 'fc', 9) + K.t(22 + i * 56, 70, l, 'b ta') + K.t(42 + i * 56, 69, n, String(n).length > 1 ? 's tg' : 'tg')).join('') + K.t(256, 30, 'letra', 's tm') + K.t(312, 30, 'número', 's tm'),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: () => 'Dos reglas aparte, y después se juntan.',
  });
  XG.figura('mesas-hexagono', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'mesas' }], ok: (v, p) => 4 * v.n + 2 === p.total, sol: p => ({ n: (p.total - 2) / 4 }), texto: p => `$4n + 2 = ${p.total}$: ${(p.total - 2) / 4} mesas`, alto: () => 178, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), r = Math.min(26, 290 / (n * 1.75)), w = r * 1.732, x0 = 170 - (n - 1) * w / 2; let h = ''; for (let i = 0; i < n; i++) { const cx = x0 + i * w; h += K.p([0, 1, 2, 3, 4, 5].map(k => K.at(cx, 64, r, 30 + k * 60)), 'fg'); if (f || n <= 2) h += K.f(f || 1, [60, 120, 240, 300].map(g => K.c(...K.at(cx, 64, r * 1.12, g), r * 0.16, 'fA')).join('') + (i === 0 ? K.c(...K.at(cx, 64, r * 1.12, 180), r * 0.16, 'fA') : '') + (i === n - 1 ? K.c(...K.at(cx, 64, r * 1.12, 0), r * 0.16, 'fA') : '')); } return h; },
    lee: v => `$4 \\cdot ${R(v.n)} + 2 = ${4 * R(v.n) + 2}$`, aviso: (v, p) => (6 * v.n > p.total && 6 * (v.n - 1) < p.total ? 'Al pegar dos mesas se pierden los lados que se tocan: no son 6 por mesa.' : 4 * v.n + 2 > p.total ? 'Caben más personas.' : 'Caben menos personas.'), bien: () => 'Cada mesa pone 4 y las dos puntas siempre están.',
  });
  XG.ascensor('sube-patron', 45, 1, neutro);

  // --------------------------------------------------------------------------------------------- pu-se-3 · patrones cíclicos
  // Rueda con rótulos: se parte de `de` (índice) y se avanzan `pasos` (negativos hacia atrás).  v { k }
  const CL = ['fF', 'fG', 'fA', 'fM', 'fc'];
  const rueda = (nombre, d) => XG.figura(nombre, {
    ini: p => ({ k: mod(p.de + 1 + (mod(p.de + p.pasos, p.r.length) === mod(p.de + 1, p.r.length) ? 1 : 0), p.r.length) }),
    manijas: p => [{ k: 'k', min: 0, max: p.r.length - 1, paso: 1, r: 11, en: v => XPK.at(170, 112, 54, 90 - v.k * 360 / p.r.length), de: (x, y) => R(mod(90 - Math.atan2(112 - y, x - 170) * 180 / Math.PI, 360) / 360 * p.r.length) % p.r.length }],
    ok: (v, p) => v.k === mod(p.de + p.pasos, p.r.length), sol: p => ({ k: mod(p.de + p.pasos, p.r.length) }), texto: p => `sobran ${mod(Math.abs(p.pasos), p.r.length)}: ${p.r[mod(p.de + p.pasos, p.r.length)]}`, alto: () => 226, ms: 2400, pie: 'Arrastra la flecha hasta tu respuesta.',
    dib(v, K, p, f) { const n = p.r.length, c = f ? mod(p.de + R(p.pasos * f), n) : -1; return K.c(170, 112, 86, 'fn') + p.r.map((t, i) => { const [x, y] = K.at(170, 112, 86, 90 - i * 360 / n); const fin = f >= 1 && i === mod(p.de + p.pasos, n); return (p.color && i === c && f < 1 ? K.c(x, y, 24, 'fn') : '') + (fin && p.color ? K.c(x, y, 25, 'fop') + K.c(x, y, 25, 'fo') : '') + K.c(x, y, 19, 'fop') + K.c(x, y, 19, fin && !p.color ? 'fo' : i === c && !p.color ? 'fg' : p.color ? CL[i % CL.length] : i === p.de && !p.sinDe ? 'fa' : 'fc') + K.t(x, y + 5, t, p.color && i % 5 < 4 ? 'tc s' : 's'); }).join('') + K.ar(170, 112, ...K.at(170, 112, 54, 90 - v.k * 360 / n), 'la gr') + (f ? K.c(170, 112, 24, 'fop') + K.t(170, 117, R(Math.abs(p.pasos) * f), 'b ta') : ''); },
    lee: (v, p) => { const n = p.r.length, a = Math.abs(p.pasos); return `$${a} = ${Math.floor(a / n)} \\cdot ${n} + ${a % n}$`; },
    aviso(v, p) { const n = p.r.length, m = mod(p.de + p.pasos, n); return v.k === p.de ? 'Ahí quedaría si no sobrara nada.' : !p.color && v.k === mod(p.de - p.pasos, n) ? 'Contaste hacia el otro lado.' : mod(v.k - m, n) === 1 || mod(m - v.k, n) === 1 ? 'Por uno: revisa desde dónde se empieza a contar.' : 'Las vueltas completas no cambian nada: solo cuenta lo que sobra.'; }, bien: () => 'Las vueltas completas sobran; manda el residuo.', ...d,
  });
  rueda('pieza-ciclo'); rueda('dia-semana'); rueda('retrocede-ruleta');
  XG.cuenta('vueltas-sobran', 74, (K, p) => [...(p.palabra + p.palabra + p.palabra.slice(0, 2))].map((l, i, a) => K.r(170 + (i - a.length / 2) * 25 + 1, 20, 23, 32, i < p.palabra.length ? 'fa' : 'fc', 4) + K.t(170 + (i - a.length / 2 + 0.5) * 25, 42, l)).join('') + K.t(330, 42, '…', 'tm'));
  XG.cuenta('ultima-ciclo', 92, (K, p) => fila(K, [1, 2, 3, 4, 5].map(k => `${p.base ** k}`), 38) + [1, 2, 3, 4, 5].map(k => K.t(xs(5, k - 1), 24, `${p.base}${'⁰¹²³⁴⁵'[k]}`, 's ta')).join(''));
  XG.figura('coinciden-otra', {
    ini: () => ({ t: 1 }), manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: p.et }], ok: (v, p) => { let m = p.a; while (m % p.b) m += p.a; return v.t === m; }, sol: p => { let m = p.a; while (m % p.b) m += p.a; return { t: m }; }, texto(p) { let m = p.a; while (m % p.b) m += p.a; return `$\\text{mcm}(${p.a}, ${p.b}) = ${m}$`; }, alto: () => 176, ms: 2000, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const X = t => 20 + t * 300 / p.max; return [[p.a, 46, 'fF', 'tf', p.na], [p.b, 92, 'fG', 'tg', p.nb]].map(([m, y, cl, tc, s]) => { let h = K.l(X(0), y, X(p.max), y, 'lm') + K.t(20, y - 14, s, `s ${tc}`, 'start') + K.c(X(0), y, 5, cl); if (f) for (let t = m; t <= p.max * f + 1e-9; t += m) h += K.c(X(t), y, 5, cl); return h; }).join('') + K.f(f, K.l(X(v.t), 34, X(v.t), 104, 'la')); },
    lee: (v, p) => `$${R(v.t)} = ${Math.floor(R(v.t) / p.a)} \\cdot ${p.a} + ${R(v.t) % p.a} \\qquad ${R(v.t)} = ${Math.floor(R(v.t) / p.b)} \\cdot ${p.b} + ${R(v.t) % p.b}$`, aviso: (v, p) => (v.t === p.a * p.b ? 'Ahí coinciden, pero ya habían coincidido antes.' : v.t === p.a + p.b ? 'Los tiempos no se suman: busca un múltiplo de los dos.' : v.t % p.a === 0 || v.t % p.b === 0 ? 'Ahí solo le toca a uno de los dos.' : 'Ahí no le toca a ninguno.'), bien: () => 'Es el primer múltiplo de los dos.',
  });
  XG.marca('mismo-residuo', {
    sitios: p => p.nums.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 90 + Math.floor(i / 4) * 56, w: 68, h: 46 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 96 + Math.floor(i / 4) * 56, p.nums[i], 'b'), alto: p => 66 + Math.ceil(p.nums.length / 4) * 56, fondo: (K, p) => Array.from({ length: p.c }, (_, i) => K.c(170 + (i - (p.c - 1) / 2) * 36, 32, 14, mod(p.de - 1, p.c) === i ? 'fA' : 'fc') + K.t(170 + (i - (p.c - 1) / 2) * 36, 37, i + 1, mod(p.de - 1, p.c) === i ? 'tc s' : 's')).join(''),
    sol: p => p.nums.map((_, i) => i).filter(i => mod(p.nums[i] - p.de, p.c) === 0), aviso(on, p) { const i = on.findIndex((x, k) => x && mod(p.nums[k] - p.de, p.c)); return i >= 0 ? `El ${p.nums[i]} deja residuo ${p.nums[i] % p.c}, no ${p.de % p.c}.` : `Falta alguno con residuo ${p.de % p.c}.`; }, bien: p => `Todos dejan residuo ${p.de % p.c} al dividir entre ${p.c}.`, texto: p => p.nums.filter(n => mod(n - p.de, p.c) === 0).join(', '), pie: 'Toca todos los que caen en el mismo lugar.',
  });
  XG.ascensor('sube-residuo', 40, 1, neutro);
})();
