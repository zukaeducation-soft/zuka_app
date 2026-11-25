// Ejercicios de «Teoría de números» (pu-nu-1 a pu-nu-3) con las escenas de la explicación: el árbol de primos, los criterios, los saltos que
// coinciden, las baldosas y los residuos. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f), cifras = n => [...String(n)].reduce((a, c) => a + +c, 0);
  const divisor = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return 0; }, primo = n => n > 1 && !divisor(n);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a hacer la cuenta.', 'Le faltó. Vuelve a hacer la cuenta.'];
  const G3 = i => [62 + (i % 3) * 108, 34 + Math.floor(i / 3) * 60], G5 = i => [38 + (i % 5) * 66, 34 + Math.floor(i / 5) * 60];

  // ------------------------------------------------------------------------------------------------- pu-nu-1 · primos y divisibilidad
  XG.marca('toca-primos', {
    sitios: p => p.nums.map((_, i) => ({ x: G3(i)[0], y: G3(i)[1], w: 92, h: 48 })), cara: (K, p, i) => K.t(G3(i)[0], G3(i)[1] + 7, p.nums[i], 'b'), alto: () => 128, sol: p => idx(p.nums.length, i => primo(p.nums[i])),
    aviso(on, p) { const i = on.findIndex((x, k) => x && !primo(p.nums[k])), n = p.nums[i]; return i < 0 ? 'Falta otro que solo se acomoda en una fila.' : n === 1 ? 'El 1 tiene un solo divisor: no es primo.' : `El ${n} se acomoda en filas: ${divisor(n)} · ${n / divisor(n)}.`; }, bien: p => p.ok, texto: p => p.nums.filter(primo).join(', '), pie: 'Toca todos los primos.',
  });
  XG.rotula('arbol-primos', {
    slots: () => [[84, 58], [178, 58], [132, 108], [226, 108], [180, 158], [274, 158]].map(([x, y]) => ({ x, y, w: 48, h: 36 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.filter((_, i) => i !== 1 && i !== 3).join(' · '), alto: () => 180, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(131, 26, p.n, 'B ta') + [[131, 30, 58], [178, 76, 108], [226, 126, 158]].map(([x, a, y]) => K.l(x - 8, a, x - 38, y - 20, 'lm') + K.l(x + 8, a, x + 38, y - 20, 'lm')).join(''),
  });
  XG.cuenta('opciones-divisor', 56, (K, p) => K.t(170, 38, p.s, 'B ta'));
  XG.marca('cifra-que-falta', {
    sitios: () => Array.from({ length: 10 }, (_, i) => ({ x: G5(i)[0], y: G5(i)[1] + 40, w: 56, h: 44 })), cara: (K, p, i) => K.t(G5(i)[0], G5(i)[1] + 46, i, 'b'), alto: () => 162, fondo: (K, p) => K.t(170, 30, `${p.a} _`, 'B ta'), nombre: (p, i) => `cifra ${i}`,
    sol: p => idx(10, d => (p.a.replace(/\D/g, '') * 10 + d) % p.by === 0), aviso(on, p) { const n = d => p.a.replace(/\D/g, '') * 10 + d, i = on.findIndex((x, d) => x && n(d) % p.by); return i < 0 ? 'Falta otra cifra que también sirve.' : i % 2 ? `Con ${i} queda impar.` : `Con ${i} las cifras suman ${cifras(n(i))}, que no es múltiplo de 3.`; }, bien: p => p.ok, texto: p => idx(10, d => (p.a.replace(/\D/g, '') * 10 + d) % p.by === 0).join(' y '), pie: 'Toca todas las cifras que sirven.',
  });
  const CX = j => 130 + j * 56, CY = i => 60 + i * 50;
  XG.marca('tabla-criterios', {
    sitios: p => p.f.flatMap((_, i) => p.c.map((_, j) => ({ x: CX(j), y: CY(i), w: 48, h: 42 }))), cara: (K, p, k, on) => K.t(CX(k % p.c.length), CY(Math.floor(k / p.c.length)) + 6, on ? '✓' : '·', 'b'), alto: p => CY(p.f.length - 1) + 28, nombre: (p, k) => `${p.f[Math.floor(k / p.c.length)]} entre ${p.c[k % p.c.length]}`,
    fondo: (K, p) => K.t(50, 22, 'entre', 's tm') + p.c.map((c, j) => K.t(CX(j), 24, c, 'b ta')).join('') + p.f.map((n, i) => K.t(84, CY(i) + 6, n, 'b', 'end')).join(''),
    sol: p => idx(p.f.length * p.c.length, k => p.f[Math.floor(k / p.c.length)] % p.c[k % p.c.length] === 0), aviso(on, p) { const m = p.c.length, k = on.findIndex((x, k) => x !== (p.f[Math.floor(k / m)] % p.c[k % m] === 0)), n = p.f[Math.floor(k / m)], d = p.c[k % m]; return d === 3 || d === 9 ? `Las cifras de ${n} suman ${cifras(n)}: ¿es múltiplo de ${d}?` : d === 4 ? `Las dos últimas cifras de ${n} son ${String(n % 100).padStart(2, '0')}: ¿es múltiplo de 4?` : `Mira en qué termina ${n}.`; }, bien: p => p.ok, texto: p => p.f.map(n => `${n} entre ${p.c.filter(d => n % d === 0).join(', ')}`).join('; '), pie: 'Toca las casillas en las que la división es exacta.',
  });
  XG.frases('siempre-multiplo'); XG.frases('basta-con');
  XG.ascensor('sube-divisores', 40, 1, neutro);

  // ------------------------------------------------------------------------------------------------------------- pu-nu-2 · MCM y MCD
  XG.figura('saltos-cada-una', {
    ini: () => ({ x: 1, y: 1 }), manijas: p => [{ k: 'x', min: 1, max: p.max, paso: 1, et: `saltos de la que avanza ${p.a}` }, { k: 'y', min: 1, max: p.max, paso: 1, et: `saltos de la que avanza ${p.b}` }], ok: (v, p) => { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return v.x * p.a === t && v.y * p.b === t; }, sol(p) { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return { x: t / p.a, y: t / p.b }; }, texto(p) { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return `${t / p.a} y ${t / p.b} saltos, en el ${t}`; }, alto: () => 206, ms: 1100, pie: 'Mueve los saltos de cada rana.',
    dib(v, K, p, f) { const M = Math.max(p.a, p.b) * p.max, X = t => 20 + t * 300 / M; return [[p.a, v.x, 40, 'la', 'fA', 'ta'], [p.b, v.y, 86, 'lg', 'fG', 'tg']].map(([m, n, y, l, c, tc]) => { let h = K.l(X(0), y, X(M), y, 'lm') + K.c(X(0), y, 5, c) + K.t(X(M), y - 24, `de ${m} en ${m}`, `s ${tc}`, 'end'), k = f * n; for (let i = 0; i < Math.floor(k + 1e-6); i++) h += `<path class="xl ${l}" d="M${K.n(X(i * m))} ${y} Q${K.n(X((i + 0.5) * m))} ${y - 20} ${K.n(X((i + 1) * m))} ${y}"/>`; return h + (f >= 1 ? K.c(X(R(n) * m), y, 5, c) + K.t(X(R(n) * m), y + 18, R(n) * m, 's') : ''); }).join(''); },
    aviso: (v, p) => (v.x * p.a === v.y * p.b ? `Coinciden en el ${v.x * p.a}, pero ya habían coincidido antes.` : `Una llega al ${v.x * p.a} y la otra al ${v.y * p.b}: no es el mismo lugar.`), bien: (v, p) => `Las dos llegan al ${v.x * p.a}, y antes no coinciden.`,
  });
  XG.cuenta('paquetes-iguales', 56, K => Array.from({ length: 9 }, (_, i) => K.r(30 + i * 32, 4, 24, 18, 'fa', 5) + K.c(42 + i * 32, 38, 9, 'fg')).join(''));
  XG.rotula('exponentes-mcd', {
    slots: () => [[150, 118], [214, 118], [150, 178], [214, 178]].map(([x, y]) => ({ x, y: y - 14, w: 36, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 192, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(170, 28, p.n[0], 'b ta') + K.t(170, 60, p.n[1], 'b tg') + [['MCD =', 122, ''], ['MCM =', 182, p.r]].map(([t, y, r]) => K.t(96, y, t, 'b', 'end') + K.t(122, y, '2', 'b') + K.t(176, y, '·', 'b') + K.t(189, y, '3', 'b') + K.t(240, y, r, 'b', 'start')).join(''),
  });
  XG.renglones('cual-de-los-dos', { w: 60, x: 306 });
  XG.figura('baldosa-mayor', {
    ini: () => ({ s: 1 }), manijas: p => [{ k: 's', min: 1, max: p.max, paso: 1, et: 'lado de la baldosa' }], ok: (v, p) => p.a % v.s === 0 && p.b % v.s === 0 && !idx(p.a + 1, d => d > v.s && p.a % d === 0 && p.b % d === 0).length, sol(p) { let m = 1; for (let d = 1; d <= p.a; d++) if (p.a % d === 0 && p.b % d === 0) m = d; return { s: m }; }, texto(p) { let m = 1; for (let d = 1; d <= p.a; d++) if (p.a % d === 0 && p.b % d === 0) m = d; return `lado ${m}`; }, alto: () => 192, ms: 1200, pie: 'Mueve el lado.',
    dib(v, K, p, f) { const u = Math.min(260 / p.b, 112 / p.a), x0 = 170 - p.b * u / 2, y0 = 12, s = R(v.s), nx = Math.floor(p.b / s), ny = Math.floor(p.a / s); let h = K.r(x0, y0, p.b * u, p.a * u, f >= 1 && (p.a % s || p.b % s) ? 'ff' : 'fc', 0); const n = f ? Math.ceil(f * nx * ny) : 1; for (let i = 0; i < n; i++) h += K.r(x0 + (i % nx) * s * u, y0 + Math.floor(i / nx) * s * u, s * u, s * u, 'fa', 0); return h + K.t(x0 - 8, y0 + p.a * u / 2 + 5, p.a, 's', 'end') + K.t(170, y0 + p.a * u + 16, p.b, 's'); },
    aviso: (v, p) => (p.b % v.s ? `A lo largo sobran ${p.b % v.s}.` : p.a % v.s ? `A lo ancho sobran ${p.a % v.s}.` : 'Cabe exacta, pero hay otra más grande que también.'), bien: (v, p) => `${p.b / v.s} por ${p.a / v.s} baldosas, sin cortar ninguna.`,
  });
  XG.cuenta('producto-mcd', 56, (K, p) => K.t(170, 36, p.s, 'b ta'));
  XG.cuenta('hora-del-cruce', 60, (K, p) => [[110, p.a, 'fa'], [230, p.b, 'fg']].map(([x, t, c]) => K.r(x - 46, 10, 92, 34, c, 8) + K.c(x - 24, 46, 7, 'fk') + K.c(x + 24, 46, 7, 'fk') + K.t(x, 32, t, 's')).join(''));
  XG.ascensor('sube-mcm', 120, 2, neutro);

  // -------------------------------------------------------------------------------------- pu-nu-3 · paridad, residuos y última cifra
  XG.frases('siempre-par');
  XG.figura('dos-residuos', {
    ini: p => ({ n: p.min }), manijas: p => [{ k: 'n', min: p.min, max: p.max, paso: 1, et: 'número' }], ok: (v, p) => p.c.every(([d, r]) => v.n % d === r), sol(p) { for (let n = p.min; n <= p.max; n++) if (p.c.every(([d, r]) => n % d === r)) return { n }; return null; }, texto(p) { for (let n = p.min; n <= p.max; n++) if (p.c.every(([d, r]) => n % d === r)) return `${n}`; return ''; }, alto: () => 182, ms: 900, pie: 'Mueve el número.',
    dib(v, K, p, f) { const n = R(v.n); return p.c.map(([d, r], k) => { const y = 14 + k * 58, q = Math.floor(n / d), g = Math.min(8, 300 / (n + q + 2)); let h = K.t(20, y, `en grupos de ${d}`, 's tm', 'start'), x = 24; for (let i = 0; i < n; i++) { if (f && i && i % d === 0) x += g * 0.9 * Math.min(1, f); h += K.c(x, y + 18, g * 0.4, f >= 1 && i >= q * d ? 'fF' : 'fA'); x += g; } return h + (f >= 1 ? K.t(320, y + 38, `sobran ${n % d}`, n % d === r ? 's to' : 's tf', 'end') : ''); }).join(''); },
    aviso: (v, p) => `El ${v.n} deja ${v.n % p.c[0][0]} entre ${p.c[0][0]} y ${v.n % p.c[1][0]} entre ${p.c[1][0]}.`, bien: (v, p) => `${v.n} cumple las dos condiciones.`,
  });
  XG.cuenta('opera-residuos', 50, (K, p) => K.t(170, 34, p.s, 'B ta'));
  XG.rotula('ciclo-ultima', {
    slots: p => p.metas.map((_, i) => ({ x: 84 + i * 56, y: 78, w: 48, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 112, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.et.map((t, i) => K.t(28 + i * 56, 36, t, 'b ta')).join('') + K.t(28, 84, p.a, 'b') + K.l(6, 48, 336, 48, 'lm'),
  });
  const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], ang = k => 90 - k * 360 / 7;
  XG.figura('rueda-semana', {
    ini: p => ({ k: p.hoy }), manijas: () => [{ k: 'k', min: 0, max: 6, paso: 1, r: 12, en: v => { const a = ang(v.k) * Math.PI / 180; return [170 + 46 * Math.cos(a), 104 - 46 * Math.sin(a)]; }, de: (x, y) => { const g = Math.atan2(104 - y, x - 170) * 180 / Math.PI; return Math.round(((90 - g + 360) % 360) / (360 / 7)) % 7; } }], ok: (v, p) => v.k === (p.hoy + p.n) % 7, sol: p => ({ k: (p.hoy + p.n) % 7 }), texto: p => DIAS[(p.hoy + p.n) % 7], alto: () => 208, ms: 1300, pie: 'Gira la aguja hasta el día.',
    dib(v, K, p, f) { const k = R(v.k); return K.c(170, 104, 94, 'fc') + DIAS.map((d, i) => { const [x, y] = K.at(170, 104, 74, ang(i)); return K.c(x, y, 19, i === p.hoy ? 'fg' : f >= 1 && i === k ? (k === (p.hoy + p.n) % 7 ? 'fo' : 'ff') : 'fn') + K.t(x, y + 4, d, 's'); }).join('') + K.l(170, 104, ...K.at(170, 104, 46, ang(v.k)), 'la gr') + K.c(170, 104, 6, 'fA') + K.t(20, 20, 'hoy', 's tg', 'start') + K.c(12, 16, 5, 'fG'); },
    aviso: (v, p) => `De ${DIAS[p.hoy]} a ${DIAS[v.k]} se avanzan ${(v.k - p.hoy + 7) % 7} días, además de las semanas completas.`, bien: p => 'Las semanas completas no cambian el día: solo cuenta lo que sobra.',
  });
  XG.cuenta('ultima-por-partes', 50, (K, p) => K.t(170, 34, p.s, 'B ta'));
  XG.cuenta('arma-dividendo', 50, (K, p) => K.t(170, 34, p.s, 'b ta'));
  XG.ascensor('sube-sobrante', 30, 1, neutro);
})();
