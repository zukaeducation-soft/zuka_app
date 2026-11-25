// Lo que pasa en los ejercicios de tocar al comprobar (spec 2026-11-24-ejercicios-explora, «Al comprobar, la escena se mueve»). Se carga
// después de las escenas y lo usa XG.marca (logica-kit.js):
//   XG.MUEVE[nombre](K, p, on, f, st)  dibujo encima de la escena que ejecuta lo marcado; f va de 0 a 1.   st: los sitios
//   XG.PRUEBA[nombre](p, i)            la cuenta de ese sitio, que aparece debajo de su dato al revisarlo.
// Las dos son puras. Sin ellas, cada sitio marcado salta o se sacude al revisarse.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−'), si = on => on.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
  const paso = (f, k, n) => Math.max(0, Math.min(1, f * n - k));      // el turno k de n
  const mezcla = (a, b, f) => a + (b - a) * f, div = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return n; };
  const onda = (K, p, on, f, st) => si(on).map((i, k, l) => { const q = paso(f, k * 0.25, l.length * 0.25 + 0.75); return q > 0 && q < 1 ? K.f(1 - q, K.c(st[i].x, st[i].y, 8 + q * 30, 'fn gr')) : ''; }).join('');
  onda.corta = true;   // no se repite con la respuesta buena
  // Una línea que crece por varios puntos.
  const crece = (K, P, f, cls) => { const L = P.slice(1).map((q, i) => Math.hypot(q[0] - P[i][0], q[1] - P[i][1])), T = L.reduce((a, b) => a + b, 0); let r = f * T; const out = [P[0]]; for (let i = 0; i < L.length && r > 0; i++) { const k = Math.min(1, r / (L[i] || 1)); out.push([mezcla(P[i][0], P[i + 1][0], k), mezcla(P[i][1], P[i + 1][1], k)]); r -= L[i]; } return out.length > 1 ? K.pl(out, cls) : ''; };
  const cae = (K, p, on, f, st) => si(on).map((i, k, l) => { const q = Math.min(1, paso(f, k * 0.6, l.length * 0.6 + 1)); return q > 0 && q < 1 ? K.f(q, K.r(st[i].x - st[i].w / 2, st[i].y - st[i].h / 2 - (1 - q) * 46, st[i].w, st[i].h, 'fa', 6)) : ''; }).join('');
  // Las seis caras de un molde: hacia dónde mira cada celda al doblar, y el orden en que se doblan.
  const neg = a => a.map(x => -x || 0);
  function dobla(cel) {
    const en = new Map(cel.map((c, i) => [c.join(), i])), out = Array(cel.length).fill(null), q = [0], orden = [];
    out[0] = { n: [0, 0, 1], r: [1, 0, 0], d: [0, -1, 0] };
    while (q.length) { const i = q.shift(), [c, g] = cel[i], { n, r, d } = out[i]; orden.push(i); for (const [dx, dy, o] of [[1, 0, { n: r, r: neg(n), d }], [-1, 0, { n: neg(r), r: n, d }], [0, 1, { n: d, r, d: neg(n) }], [0, -1, { n: neg(d), r, d: n }]]) { const j = en.get([c + dx, g + dy].join()); if (j != null && !out[j]) { out[j] = o; q.push(j); } } }
    return { n: out.map(x => x && x.n.join()), orden };
  }

  XG.MUEVE = {
    // La corriente avanza por lo que está cerrado; si llega, el bombillo prende.
    'prende-circuito'(K, p, on, f) {
      const rama = y => [[60, 86], [60, y], [178, y], [178, 86]], a = [on[0] && 46, on[1] && 126].filter(Boolean), pasa = a.length > 0;
      let h = crece(K, [[10, 86], [60, 86]], Math.min(1, f * 4), 'la gr');
      if (f > 0.25) for (const y of a) h += crece(K, rama(y), Math.min(1, (f - 0.25) * 2.5), 'la gr');
      if (pasa && f > 0.65) h += crece(K, [[178, 86], on[2] ? [284, 86] : [202, 86]], Math.min(1, (f - 0.65) * 4), 'la gr');
      const llega = pasa && on[2];
      return h + (f >= 0.9 ? (llega ? K.c(304, 86, 20, 'fop') + K.c(304, 86, 20, 'fo') + [0, 45, 90, 270, 315].map(g => K.l(...K.at(304, 86, 24, g), ...K.at(304, 86, 30, g), 'lo gr')).join('') : pasa ? K.t(212, 66, '✗', 'tf') : K.t(60, 70, '✗', 'tf')) : '');
    },
    // La aguja da dos vueltas y al final se lee cuántos favorables marcó.
    'ruleta-favorables': (K, p, on, f) => K.l(170, 104, ...K.at(170, 104, 48, 90 - f * 720), 'lf gr') + K.c(170, 104, f >= 1 ? 22 : 8, 'fc') + (f >= 1 ? K.t(170, 110, `${si(on).length}/${p.nums.length}`, 'b') : ''),
    'mayor-tramo'(K, p, on, f) { const x = i => 40 + i * 260 / (p.v.length - 1), y = n => 136 - n * 2.8; return si(on).map(i => crece(K, [[x(i), y(p.v[i])], [x(i + 1), y(p.v[i])], [x(i + 1), y(p.v[i + 1])]], f, 'lf gr d') + K.f(f, K.l(x(i), y(p.v[i]), x(i + 1), y(p.v[i + 1]), 'lf gr'))).join(''); },
    'prende-focos'(K, p, on, f) { const l = si(on), B = [16, 8, 4, 2, 1]; let s = 0; const h = l.map((i, k) => { const q = paso(f, k, l.length); s += q >= 1 ? B[i] : 0; return q > 0 ? [20, 60, 120, 160].map(g => K.l(...K.at(50 + i * 60, 60, 21, g), ...K.at(50 + i * 60, 60, 21 + 7 * q, g), 'lg')).join('') : ''; }).join(''); return h + K.t(330, 22, `van ${s}`, s === p.n ? 'b to' : 'b', 'end'); },
    'pinta-operacion': onda, 'pinta-negacion': onda, 'donde-alguien': onda, 'zonas-posibles': onda, 'pinta-tres': onda, 'cruce-sin-b': onda, 'rejilla-permitida': onda, 'ruletas-alguno': onda, 'cruce-numeros': onda, 'donde-pintura': onda,
    'vecinas-cara': (K, p, on, f, st) => { const a = st[p.letras.indexOf(p.de)]; return si(on).map(i => crece(K, [[a.x, a.y], [st[i].x, st[i].y]], f, 'lf d')).join(''); },
    'vista-frente': cae, 'vista-izquierda': cae, 'escalera-cuatro': cae,
    // La mitad dada se voltea sobre el espejo.
    'espejo-vertical': (K, p, on, f) => p.dada.map(i => { const c = i % p.c, r = Math.floor(i / p.c), x0 = 162 - (p.c - c) * 36 + 16, x1 = 178 + (p.c - 1 - c + 0.5) * 36, g = Math.cos(Math.PI * f), w = Math.max(1, 32 * Math.abs(g)), x = (x0 + x1) / 2 + (x0 - x1) / 2 * g; return K.r(x - w / 2, 14 + r * 36 + 2, w, 32, 'fn gr', 4); }).join(''),
    // La hoja se abre, primero hacia abajo y después hacia la derecha.
    'papel-abierto'(K, p, on, f) { const a = Math.min(1, f * 2), b = Math.max(0, f * 2 - 1), X = c => 190 + (c + 0.5) * 36, Y = c => 30 + (c + 0.5) * 36, y2 = mezcla(Y(p.f), Y(3 - p.f), a), x2 = mezcla(X(p.c), X(3 - p.c), b); return K.r(190, 30, 72 + 72 * b, 72 + 72 * a, 'fn gr', 2) + K.c(X(p.c), Y(p.f), 9, 'fn gr') + (a > 0.05 ? K.c(X(p.c), y2, 9, 'fn gr') : '') + (b > 0.05 ? K.c(x2, Y(p.f), 9, 'fn gr') + K.c(x2, Y(3 - p.f), 9, 'fn gr') : ''); },
    // Cada molde marcado se dobla cara por cara; si dos caen en el mismo sitio, se ve.
    'cierra-cubo': (K, p, on, f) => si(on).map(i => { const m = p.moldes[i], u = 19, w = Math.max(...m.map(c => c[0])) + 1, h = Math.max(...m.map(c => c[1])) + 1, x = 62 + (i % 3) * 108 - w * u / 2, y = 60 + Math.floor(i / 3) * 112 - h * u / 2, D = dobla(m), choca = k => D.n.some((z, j) => j !== k && z === D.n[k]), cierra = !D.n.some((_, k) => choca(k)); return D.orden.slice(0, Math.ceil(f * m.length)).map(k => K.r(x + m[k][0] * u, y + m[k][1] * u, u, u, f >= 1 ? (cierra ? 'fo' : choca(k) ? 'ff' : 'fa') : 'fa', 2)).join(''); }).join(''),
    // El modelo, girado hasta que coincide (o no) con cada mesa marcada.
    'misma-mesa': (K, p, on, f) => si(on).map(i => { const n = p.modelo.length, k = p.mesas[i].indexOf(p.modelo[0]), x = 90 + (i % 2) * 160, y = 170 + Math.floor(i / 2) * 106; return p.modelo.map((t, j) => { const [a, b] = K.at(x, y, 13, 90 - (j + k * f) * 360 / n); return K.t(a, b + 4, t, f >= 1 ? (p.mesas[i][(j + k) % n] === t ? 's to' : 's tf') : 's'); }).join(''); }).join(''),
    'giro-o-espejo': (K, p, on, f) => si(on).map(i => { const [g, v] = p.figs[i], u = 19, a = g * f * Math.PI / 180, cx = 62 + (i % 3) * 108, cy = 152 + Math.floor(i / 3) * 96, mx = (Math.max(...p.cel.map(c => c[0])) + 1) / 2, my = (Math.max(...p.cel.map(c => c[1])) + 1) / 2; return p.cel.map(([c, r]) => K.p([[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]].map(([x, y]) => { const X = (x - mx) * u * 0.96, Y = (y - my) * u * 0.96; return [cx + X * Math.cos(a) - Y * Math.sin(a), cy + X * Math.sin(a) + Y * Math.cos(a)]; }), f >= 1 ? (v ? 'ff' : 'fo') : 'fn gr')).join(''); }).join(''),
    // Los caminos que se marcaron, de a uno.
    'palabra-camino'(K, p, on, f) { const u = 30, x0 = 170 - p.e * u / 2, y0 = 92, l = si(on); return l.map((i, k) => { let x = x0, y = y0; const P = [[x, y]]; for (const c of p.fichas[i]) { if (c === 'E') x += u; else y -= u; P.push([x, y]); } const q = paso(f, k, l.length); return q > 0 ? crece(K, P, q, `${['la', 'lg', 'lf', 'lo'][k % 4]} gr`) + (q >= 1 ? K.c(x, y, 5, x === x0 + p.e * u && y === y0 - p.n * u ? 'fo' : 'ff') : '') : ''; }).join(''); },
    'rombo-cuadras': (K, p, on, f, st) => { const A = st[p.A[1] * (p.c + 1) + p.A[0]]; return si(on).map(i => crece(K, [[A.x, A.y], [st[i].x, A.y], [st[i].x, st[i].y]], f, 'la')).join(''); },
    'dos-lados': (K, p, on, f, st) => si(on).map((i, k) => { const a = p.de - 1, d = (i - a + p.n) % p.n, s = d <= p.n / 2 ? 1 : -1, m = Math.min(d, p.n - d); return m ? crece(K, Array.from({ length: m + 1 }, (_, j) => { const q = st[(a + s * j + p.n * 2) % p.n]; return [170 + (q.x - 170) * 0.68, 108 + (q.y - 108) * 0.68]; }), f, k ? 'lg gr' : 'la gr') : ''; }).join(''),
    'piezas-diez'(K, p, on, f) { const s = si(on).reduce((a, i) => a + p.piezas[i], 0), w = Math.min(290, 290 * s * f / p.total); return K.r(25, 22, w, 16, 'fa') + K.t(330, 16, N(s * f), 's', 'end') + (f >= 1 ? K.l(25 + 2.9 * p.pct, 18, 25 + 2.9 * p.pct, 42, 'lo gr') + K.t(25 + 2.9 * p.pct, 54, `${p.pct} %`, 's to') : ''); },
    'donde-cabe'(K, p, on, f, st) { const u = st[1].x - st[0].x, l = si(on), k = Math.min(l.length - 1, Math.floor(f * l.length)), i = l[k], c = i % p.cols, r = Math.floor(i / p.cols), cabe = c + p.s <= p.cols && r + p.s <= p.filas; return f >= 1 ? '' : K.r(st[i].x - u / 2, st[i].y - u / 2, p.s * u, p.s * u, cabe ? 'fo' : 'ff', 4); },
    'tacha-cruz': (K, p, on, f, st) => { const a = st[p.si[0] * p.cols.length + p.si[1]]; return si(on).map(i => crece(K, [[a.x, a.y], [st[i].x, st[i].y]], f, 'lf d')).join(''); },
    'hueco-unico': (K, p, on, f, st) => { const n = p.cols.length, m = p.filas.length; return si(on).map(i => { const r = Math.floor(i / n), c = i % n, s = st[i]; return [st[r * n], st[r * n + n - 1], st[c], st[(m - 1) * n + c]].map(q => crece(K, [[s.x, s.y], [q.x, q.y]], f, 'lg d')).join(''); }).join(''); },
    // Cada letra viaja a su reflejo en la diagonal.
    'tabla-desigual': (K, p, on, f, st) => { const n = p.letras.length; return si(on).map(k => { const i = Math.floor(k / n), j = k % n, a = st[k], b = st[j * n + i]; return i === j || f >= 1 ? '' : K.t(mezcla(a.x, b.x, f), mezcla(a.y, b.y, f) + 6, p.tab[i][j], 'b tf'); }).join(''); },
  };

  const orden = t => [...t].sort().join(''), CAR = { promedio: d => N(d.reduce((a, b) => a + b, 0) / d.length), mediana: d => N([...d].sort((a, b) => a - b)[(d.length - 1) / 2]), moda: d => N([...d].sort((a, b) => d.filter(x => x === b).length - d.filter(x => x === a).length)[0]), suma: d => N(d.reduce((a, b) => a + b, 0)) };
  const fin = ms => ms.reduce(([x, y], [d, n]) => [x + ({ E: n, O: -n }[d] || 0), y + ({ N: n, S: -n }[d] || 0)], [0, 0]);
  XG.PRUEBA = {
    'toca-primos': (p, i) => { const n = p.nums[i]; return n === 1 ? 'un divisor' : div(n) === n ? `1 · ${n}` : `${div(n)} · ${n / div(n)}`; },
    'siete-veces': (p, i) => { const n = p.nums[i], s = Math.floor(n / 10) + n % 10; return `${p.k} · ${s} = ${p.k * s}`; },
    'x-consigo': (p, i) => `da ${N(p.f(p.nums[i], p.nums[i]))}`,
    'tumba-todos': (p, i) => `${p.a}: ${p.nums[i] % p.a ? 'no' : 'sí'} · ${p.b}: ${p.nums[i] % p.b ? 'no' : 'sí'}`,
    'enteros-entre': (p, i) => `da ${N(p.g(p.nums[i]))}`,
    'precio-posible': (p, i) => { const n = p.nums[i], m = (p.a + p.b) / 2; return n <= p.a || n >= p.b ? 'no está entre' : n === m ? 'igual de los dos' : n < m ? 'más del barato' : 'más del caro'; },
    'cifra-que-falta': (p, i) => { const n = p.a.replace(/\D/g, '') * 10 + i; return n % p.by ? `sobra ${n % p.by}` : 'exacta'; },
    'tabla-criterios': (p, i) => { const m = p.c.length, n = p.f[Math.floor(i / m)], d = p.c[i % m]; return n % d ? `sobra ${n % d}` : `da ${n / d}`; },
    'tabla-desigual': (p, i) => { const n = p.letras.length, a = p.tab[Math.floor(i / n)][i % n], b = p.tab[i % n][Math.floor(i / n)]; return a === b ? `${a} = ${b}` : `${a} ≠ ${b}`; },
    'tabla-diferencia': (p, i) => String(Math.abs(Math.floor(i / 6) - i % 6)),
    'mismo-residuo': (p, i) => `deja ${((p.nums[i] % p.c) + p.c) % p.c}`,
    'regla-todos': (p, i) => p.e.map(([a]) => `${a} → ${N(p.casos[i].f(a))}`).join(' · '),
    'mismo-sabor': (p, i) => { const a = p.jarras[i][0] * p.modelo[1], b = p.jarras[i][1] * p.modelo[0]; return `${a} ${a === b ? '=' : '≠'} ${b}`; },
    'compara-porciento': (p, i) => `${N(p.grupos[i][0] / p.grupos[i][1] * 100)} %`,
    'pasan-porciento': (p, i) => { const [a, b] = p.fichas[i].match(/\d+/g); return `${N(a / b * 100)} %`; },
    'mismo-final': (p, i) => { const v = [100]; p.caminos[i].forEach(k => v.push(v.at(-1) * (1 + k / 100))); return v.map(N).join(' → '); },
    'mayor-tramo': (p, i) => { const c = (p.v[i + 1] - p.v[i]) / p.v[i] * 100; return `${c >= 0 ? '+' : ''}${N(R(c * 10) / 10)} %`; },
    'mismo-destino': (p, i) => { const [x, y] = fin(p.listas[i]), l = [x && `${Math.abs(x)}${x > 0 ? 'E' : 'O'}`, y && `${Math.abs(y)}${y > 0 ? 'N' : 'S'}`].filter(Boolean); return `queda en ${l.join(' y ') || 'A'}`; },
    'palabras-distintas': (p, i) => orden(p.fichas[i]), 'mismo-grupo': (p, i) => orden(p.fichas[i]),
    'dato-exagerado': (p, i) => `${CAR[p.fichas[i]](p.d)} → ${CAR[p.fichas[i]](p.e)}`,
    'donde-pintura': (p, i) => String(1 + [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length),
  };
})();
