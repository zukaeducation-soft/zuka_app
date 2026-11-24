// Ejercicios de «Tablas y gráficas» (pu-gr-1 a pu-gr-3) con las escenas de la explicación: barras con eje, tortas, barras que se nivelan,
// balanza de grupos y grupos de personas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100), neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Barras con eje desde `lo` hasta `hi`, con una línea cada `st`.
  const Y0 = 140, H = 116, YB = (x, hi, lo = 0) => Y0 - Math.max(0, x - lo) / (hi - lo) * H;
  const eje = (K, hi, st, lo = 0) => { let h = ''; for (let k = lo; k <= hi; k += st) h += K.l(60, YB(k, hi, lo), 320, YB(k, hi, lo), 'ls') + K.t(52, YB(k, hi, lo) + 4, k, 's tm', 'end'); return h; };
  const barras = (K, vals, rot, hi, lo = 0) => vals.map((x, i) => { const w = 250 / vals.length, y = YB(x, hi, lo); return K.r(66 + i * w + 10, y, w - 20, Y0 - y, ['fa', 'fg'][i % 2], 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, rot[i], 's'); }).join('');
  const frases = (nombre, pie) => { const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i].si); XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 330, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6, sol: si,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.casos[k].si); return i >= 0 ? p.casos[i].no : p.falta; }, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie,
  }); };
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };

  // ----------------------------------------------------------------------------------------------- pu-gr-1 · leer gráficas
  XG.cuenta('lee-escala', 160, (K, p) => eje(K, p.hi, p.st) + barras(K, p.vals, p.rot, p.hi));
  XG.figura('pasa-tabla', {
    ini: p => ({ a: p.st, b: p.st, c: p.st }), manijas: p => ['a', 'b', 'c'].map((k, i) => ({ k, min: 0, max: p.hi, paso: p.paso, r: 10, en: v => [66 + (i + 0.5) * 250 / 3, YB(v[k], p.hi)], de: (x, y) => (Y0 - y) / H * p.hi })), ok: (v, p) => v.a === p.vals[0] && v.b === p.vals[1] && v.c === p.vals[2], sol: p => ({ a: p.vals[0], b: p.vals[1], c: p.vals[2] }), texto: p => p.rot.map((r, i) => `${r}: ${p.vals[i]}`).join('; '), alto: () => 164, pie: 'Arrastra la punta de cada barra.',
    dib: (v, K, p, f) => eje(K, p.hi, p.st) + barras(K, [v.a, v.b, v.c], p.rot, p.hi) + K.f(f, [v.a, v.b, v.c].map((x, i) => K.t(66 + (i + 0.5) * 250 / 3, YB(x, p.hi) - 14, R(x), 's ta')).join('')),
    aviso(v, p) { const i = [v.a, v.b, v.c].findIndex((x, k) => x !== p.vals[k]), x = [v.a, v.b, v.c][i]; return `La barra de ${p.rot[i]} quedó en ${x} y debía llegar a ${p.vals[i]}: cada línea vale ${p.st}.`; }, bien: (v, p) => `Cada línea vale ${p.st}; la mitad de una línea son ${p.st / 2}.`,
  });
  // Qué tramo crece más en porcentaje.  params { v: [números] }
  const pct = (v, i) => (v[i + 1] - v[i]) / v[i];
  const mejorT = p => p.v.slice(1).map((_, i) => i).reduce((a, i) => (pct(p.v, i) > pct(p.v, a) ? i : a), 0);
  XG.marca('mayor-tramo', {
    sitios: p => p.v.slice(1).map((_, i) => ({ x: 62 + i * 108, y: 172, w: 98, h: 42 })), cara: (K, p, i) => K.t(62 + i * 108, 178, `${p.v[i]} → ${p.v[i + 1]}`), alto: () => 198, sol: p => [mejorT(p)],
    fondo: (K, p) => { const x = i => 40 + i * 260 / (p.v.length - 1), y = n => 136 - n * 2.8; return K.l(30, 136, 320, 136, 'lm') + K.pl(p.v.map((n, i) => [x(i), y(n)]), 'la gr') + p.v.map((n, i) => K.c(x(i), y(n), 5, 'fA') + K.t(x(i), y(n) - 12, n, 's')).join(''); },
    aviso(on, p) { const n = on.filter(Boolean).length, i = on.indexOf(true), u = p.v.slice(1).map((_, k) => p.v[k + 1] - p.v[k]); return n > 1 ? 'Es un solo tramo.' : u[i] === Math.max(...u) ? 'Ese sube más unidades; en porcentaje hay que dividir entre lo de antes.' : `De ${p.v[i]} a ${p.v[i + 1]} sube ${u[i]} sobre ${p.v[i]}; otro tramo sube más en porcentaje.`; }, bien: () => 'El cambio se divide entre el valor de antes.', texto: p => `${p.v[mejorT(p)]} → ${p.v[mejorT(p) + 1]}: ${N(pct(p.v, mejorT(p)) * 100)} %`, pie: 'Toca el tramo.',
  });
  XG.figura('barra-baja', {
    ini: p => ({ b: p.a }), manijas: p => [{ k: 'b', min: 10, max: p.max, paso: 2, r: 11, en: v => [235, 178 - v.b * 1.6], de: (x, y) => (178 - y) / 1.6 }], ok: (v, p) => v.b * 100 === p.a * (100 - p.pc), sol: p => ({ b: p.a * (100 - p.pc) / 100 }), texto: p => `${p.a} − ${p.a * p.pc / 100} = ${p.a * (100 - p.pc) / 100}`, alto: () => 208, pie: 'Arrastra la punta de la barra de ahora.',
    dib: (v, K, p, f) => K.l(40, 178, 300, 178, 'lm') + K.r(70, 178 - p.a * 1.6, 70, p.a * 1.6, 'fa') + K.r(200, 178 - v.b * 1.6, 70, v.b * 1.6, 'fg') + K.l(70, 178 - p.a * 1.6, 290, 178 - p.a * 1.6, 'lm d') + K.t(105, 198, `antes ${p.a}`, 's') + K.t(235, 198, `ahora ${R(v.b)}`, 's') + K.f(f, K.t(170, 20, `${N((v.b - p.a) / p.a * 100)} %`, 'tf')),
    lee: (v, p) => `$\\tfrac{${N(v.b)} - ${p.a}}{${p.a}} = ${N((v.b - p.a) / p.a * 100)}\\,\\%$`, aviso: (v, p) => (v.b === p.a - p.pc ? `Quitaste ${p.pc} unidades; había que quitar el ${p.pc} % de ${p.a}.` : v.b === p.a * p.pc / 100 ? 'Eso es lo que bajó; la barra muestra lo que quedó.' : v.b > p.a ? 'Así las ventas suben.' : v.b * 100 > p.a * (100 - p.pc) ? 'Bajó menos de lo que se pide.' : 'Bajó más de lo que se pide.'), bien: (v, p) => `El ${p.pc} % de ${p.a} es ${p.a * p.pc / 100}.`,
  });
  XG.cuenta('ida-vuelta-porciento', 128, (K, p) => K.r(46, 106 - p.a * 1.6, 40, p.a * 1.6, 'fa', 3) + K.r(120, 106 - p.b * 1.6, 40, p.b * 1.6, 'fg', 3) + K.r(206, 106 - p.b * 1.6, 40, p.b * 1.6, 'fg', 3) + K.r(280, 106 - p.a * 1.6, 40, p.a * 1.6, 'fa', 3) + K.l(30, 106, 330, 106, 'lm') + [[66, p.a], [140, p.b], [226, p.b], [300, p.a]].map(([x, n]) => K.t(x, 123, n, 's')).join('') + K.ar(90, 94, 116, 94, 'lg') + K.ar(250, 94, 276, 94, 'lg'));
  const torta = (K, g, r = '', t = '', q = 84) => K.c(150, q + 20, q, 'fc') + (g > 0 ? K.sec(150, q + 20, q, 90 - g, 90, 'fa') : '') + (r ? K.t(...K.at(150, q + 22, q * 0.6, 90 - g / 2), r, 's') : '') + K.t(250, 34, t, 's tm', 'start');
  XG.figura('abre-sector', {
    ini: () => ({ g: 18 }), manijas: () => [{ k: 'g', min: 9, max: 342, paso: 9, r: 10, en: v => XPK.at(150, 104, 84, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(104 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 9) : g; } }], ok: (v, p) => v.g * p.total === p.parte * 360, sol: p => ({ g: p.parte * 360 / p.total }), texto: p => `$${N(p.parte * 100 / p.total)}\\,\\%$, $${p.parte * 360 / p.total}^\\circ$`, alto: () => 208, pie: 'Arrastra el borde del sector.',
    dib: (v, K, p, f) => torta(K, v.g, '', `${R(v.g)}°`) + K.f(f, K.t(250, 66, `${N(v.g / 3.6)} %`, 'ta', 'start') + K.t(250, 98, `${N(v.g / 360 * p.total)} de`, 's tm', 'start') + K.t(250, 118, `${p.total}`, 's tm', 'start')),
    lee: (v, p) => `$${N(v.g / 3.6)}\\,\\% \\text{ de } ${p.total} = ${N(v.g / 360 * p.total)}$`, aviso: (v, p) => (v.g === p.parte ? 'No es un grado por persona: la vuelta completa, 360°, son todos.' : v.g === p.parte * 100 / p.total ? `Ese es el porcentaje; en grados, cada 1 % son 3.6°.` : `Así el sector muestra ${N(v.g / 360 * p.total)} personas.`), bien: p => 'El sector es la misma fracción de la vuelta que la parte es del total.',
  });
  XG.cuenta('sector-cantidad', 164, (K, p) => torta(K, p.g, `${p.g}°`, `${p.total} en total`, 64));
  XG.ascensor('sube-grafica', 100, 5, neutro);

  // --------------------------------------------------------------------------------------- pu-gr-2 · promedio, mediana y moda
  const U = 11, prom = d => d.reduce((a, b) => a + b, 0) / d.length;
  const nivel = (K, d, t) => { const w = 230 / d.length, m = prom(d); return K.l(40, 178, 300, 178, 'lm') + d.map((x, i) => { const y = x + (m - x) * t; return K.r(50 + i * w + 5, 178 - y * U, w - 10, y * U, 'fa', 3) + K.t(50 + (i + 0.5) * w, 196, x, 's'); }).join(''); };
  XG.figura('nivela-linea', {
    ini: p => ({ y: Math.max(...p.d) }), manijas: () => [{ k: 'y', min: 0, max: 14, paso: 0.5, r: 16, rot: v => N(v.y), en: v => [312, 178 - v.y * U], de: (x, y) => (178 - y) / U }], ok: (v, p) => v.y === prom(p.d), sol: p => ({ y: prom(p.d) }), texto: p => `$${p.d.reduce((a, b) => a + b, 0)} \\div ${p.d.length} = ${N(prom(p.d))}$`, alto: () => 206, pie: 'Arrastra la línea hasta el promedio.',
    dib: (v, K, p, f) => nivel(K, p.d, f) + K.l(44, 178 - v.y * U, 296, 178 - v.y * U, 'lg d'), lee: (v, p) => `$\\tfrac{${p.d.join(' + ')}}{${p.d.length}} = ${N(prom(p.d))}$`, aviso: (v, p) => (v.y === [...p.d].sort((a, b) => a - b)[(p.d.length - 1) / 2] ? 'Ese es el dato del medio: al repartir por igual queda otro nivel.' : v.y > prom(p.d) ? 'La línea quedó alta: no alcanza para llenar hasta ahí.' : 'La línea quedó baja: sobraría.'), bien: () => 'Lo que sobra en unas llena lo que falta en otras.',
  });
  XG.figura('dato-para-promedio', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 0, max: 14, paso: 1, r: 10, en: v => [50 + (p.d.length + 0.5) * 230 / (p.d.length + 1), 178 - v.x * U], de: (x, y) => (178 - y) / U }], ok: (v, p) => v.x === p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0), sol: p => ({ x: p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0) }), texto: p => `$${p.m * (p.d.length + 1)} - ${p.d.reduce((a, b) => a + b, 0)} = ${p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0)}$`, alto: () => 206, pie: 'Sube o baja la última barra.',
    dib: (v, K, p, f) => nivel(K, [...p.d, v.x].map(x => R(x * 10) / 10), f) + K.l(44, 178 - p.m * U, 296, 178 - p.m * U, 'lg d') + K.t(302, 183 - p.m * U, p.m, 'tg', 'start'), lee: (v, p) => `$\\tfrac{${p.d.join(' + ')} + ${N(v.x)}}{${p.d.length + 1}} = ${N(prom([...p.d, v.x]))}$`, aviso: (v, p) => (v.x === p.m ? 'Con el mismo promedio no alcanza: los otros tienen que quedar compensados.' : `Así el promedio es ${N(prom([...p.d, v.x]))}.`), bien: (v, p) => `Los ${p.d.length + 1} datos deben sumar ${p.m * (p.d.length + 1)}.`,
  });
  XG.rotula('ordena-centro', {
    slots: p => p.metas.map((_, i) => (i < p.d.length ? { x: R(170 + (i - (p.d.length - 1) / 2) * 47), y: 76, w: 42, h: 40 } : { x: 170, y: 138, w: 64, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => `${p.metas.slice(0, -1).join(', ')}: mediana ${p.metas.at(-1)}`, alto: () => 182, fondo: (K, p) => K.t(170, 34, p.d.join(' · '), 'b ta') + K.t(170, 176, 'mediana', 's tm'), aviso: avisa, bien: p => p.ok,
  });
  XG.cuenta('centros-par', 60, (K, p) => K.t(170, 38, p.d.join(' · '), 'b ta'));
  const fichas = (nombre, d) => { const si = p => p.fichas.map((_, i) => i).filter(i => d.vale(p.fichas[i], p)); XG.marca(nombre, {
    sitios: p => p.fichas.map((_, i) => ({ x: (p.cols === 2 ? [92, 248] : [62, 170, 278])[i % p.cols], y: d.y + Math.floor(i / p.cols) * 56, w: p.cols === 2 ? 148 : 100, h: 46 })), cara: (K, p, i) => K.t((p.cols === 2 ? [92, 248] : [62, 170, 278])[i % p.cols], d.y + 6 + Math.floor(i / p.cols) * 56, p.fichas[i]), alto: p => d.y + Math.ceil(p.fichas.length / p.cols) * 56 - 26, fondo: d.fondo, sol: si, aviso: d.aviso, bien: d.bien, texto: p => si(p).map(i => p.fichas[i]).join(', '), pie: d.pie,
  }); };
  const CEN = { promedio: prom, suma: d => d.reduce((a, b) => a + b, 0), mediana: d => [...d].sort((a, b) => a - b)[(d.length - 1) / 2], moda: d => [...d].sort((a, b) => d.filter(x => x === b).length - d.filter(x => x === a).length || a - b)[0] };
  const cambia = (t, p) => CEN[t](p.d) !== CEN[t](p.e);
  fichas('dato-exagerado', { y: 106, vale: cambia, pie: 'Toca todos los que cambian.', fondo: (K, p) => K.t(170, 28, p.d.join(' · '), 'b') + K.ar(170, 36, 170, 54, 'lm') + K.t(170, 74, p.e.join(' · '), 'b ta'), aviso(on, p) { const i = on.findIndex((x, k) => x && !cambia(p.fichas[k], p)); return i >= 0 ? `La ${p.fichas[i]} sigue igual: era ${CEN[p.fichas[i]](p.d)} y es ${CEN[p.fichas[i]](p.e)}.` : 'Falta otro que también cambia.'; }, bien: () => 'Un dato exagerado jala el promedio, no el del medio.' });
  const peso = p => p.g.reduce((a, [n, x]) => a + n * x, 0) / p.g.reduce((a, [n]) => a + n, 0);
  XG.figura('apoyo-grupos', {
    ini: () => ({ x: 5 }), manijas: () => [{ k: 'x', min: 0, max: 10, paso: 0.5, r: 11, en: v => [30 + v.x * 28, 182], de: x => (x - 30) / 28 }], ok: (v, p) => v.x === peso(p), sol: p => ({ x: peso(p) }), texto: p => `${N(peso(p))}`, alto: () => 208, pie: 'Arrastra el apoyo.',
    dib(v, K, p, f) { const X = x => 30 + x * 28, y = 140, g = Math.max(-9, Math.min(9, (peso(p) - v.x) * 4)) * f; let h = ''; for (let k = 0; k <= 10; k++) h += K.l(X(k), y, X(k), y + 5, 'lm') + K.t(X(k), y + 20, k, 's tm'); h += K.l(X(0), y, X(10), y, 'gr'); p.g.forEach(([n, x], j) => { for (let i = 0; i < n; i++) h += K.c(X(x), y - 10 - i * 17, 8, j ? 'fG' : 'fA'); }); return `<g transform="rotate(${N(g)} ${N(X(v.x))} ${y})">${h}</g>` + K.p([[X(v.x), y + 26], [X(v.x) - 14, y + 48], [X(v.x) + 14, y + 48]], 'fF'); },
    lee: (v, p) => `$\\tfrac{${p.g.map(([n, x]) => `${n} \\cdot ${x}`).join(' + ')}}{${p.g.reduce((a, [n]) => a + n, 0)}} = ${N(peso(p))}$`, aviso: (v, p) => (v.x === prom(p.g.map(([, x]) => x)) ? 'Ese es el centro de los dos valores, como si los grupos fueran iguales.' : v.x < peso(p) ? 'La tabla se inclina a la derecha.' : 'La tabla se inclina a la izquierda.'), bien: () => 'El grupo grande jala más.',
  });
  XG.cuenta('meses-mas', 60, (K, p) => Array.from({ length: p.n + p.mas }, (_, i) => K.c(170 + (i - (p.n + p.mas - 1) / 2) * 36, 30, 13, i < p.n ? 'fa' : 'fg')).join(''));
  XG.ascensor('sube-centro', 30, 1, neutro);

  // ------------------------------------------------------------------------------------------- pu-gr-3 · qué se puede concluir
  XG.figura('sube-piso', {
    ini: () => ({ f: 0 }), manijas: p => [{ k: 'f', min: 0, max: p.a - 2, paso: 1, et: 'el eje empieza en' }], ok: (v, p) => (p.b - v.f) === p.veces * (p.a - v.f), sol: p => ({ f: (p.veces * p.a - p.b) / (p.veces - 1) }), texto: p => `el eje empieza en ${(p.veces * p.a - p.b) / (p.veces - 1)}`, alto: () => 254, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => { const lo = v.f * f, Y = x => 170 - Math.max(0, (x - lo) / (p.b - lo)) * 130; return K.l(60, 170, 310, 170, 'lm') + K.t(52, 174, R(lo), 's tm', 'end') + K.r(90, Y(p.a), 70, 170 - Y(p.a), 'fa') + K.r(210, Y(p.b), 70, 170 - Y(p.b), 'fg') + K.t(125, 188, `A: ${p.a}`, 's') + K.t(245, 188, `B: ${p.b}`, 's'); },
    lee: (v, p) => `$\\tfrac{${p.b} - ${N(v.f)}}{${p.a} - ${N(v.f)}} = ${N((p.b - v.f) / (p.a - v.f))}$`, aviso: (v, p) => `Con el piso en ${v.f}, las barras miden ${p.a - v.f} y ${p.b - v.f}: B se ve ${N((p.b - v.f) / (p.a - v.f))} veces tan alta como A.`, bien: (v, p) => `Miden ${p.a - v.f} y ${p.b - v.f}, aunque los datos son ${p.a} y ${p.b}.`,
  });
  XG.cuenta('diferencia-real', 160, (K, p) => eje(K, p.hi, p.st, p.lo) + barras(K, p.vals, p.rot, p.hi, p.lo));
  const par = t => t.split(' de ').map(Number);
  fichas('pasan-porciento', { y: 30, vale: (t, p) => par(t)[0] * 100 >= p.min * par(t)[1], pie: 'Toca todos los que cumplen.', aviso(on, p) { const i = on.findIndex((x, k) => x && par(p.fichas[k])[0] * 100 < p.min * par(p.fichas[k])[1]); return i >= 0 ? `${p.fichas[i]} es el ${N(R(par(p.fichas[i])[0] / par(p.fichas[i])[1] * 1000) / 10)} %.` : 'Falta un grupo: divide cada cantidad entre su total.'; }, bien: () => 'La proporción no depende de cuántos sean, sino de cuántos de cada cien.' });
  const gente = (K, x, n, k, cls) => Array.from({ length: n }, (_, i) => K.c(x + (i % 8) * 17, 46 + Math.floor(i / 8) * 17, 6.5, i < k ? cls : 'fc')).join('');
  XG.figura('misma-proporcion', {
    ini: () => ({ k: 1 }), manijas: p => [{ k: 'k', min: 0, max: p.tb, paso: 1, et: 'en el grupo B' }], ok: (v, p) => v.k * p.ta === p.ka * p.tb, sol: p => ({ k: p.ka * p.tb / p.ta }), texto: p => `${p.ka * p.tb / p.ta} de ${p.tb}`, alto: () => 208, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => K.t(86, 24, `A: ${p.ka} de ${p.ta}`, 's ta') + K.t(254, 24, `B: ${R(v.k)} de ${p.tb}`, 's tg') + gente(K, 26, p.ta, p.ka, 'fA') + gente(K, 194, p.tb, R(v.k), 'fG') + K.f(f, K.t(86, 144, `${N(p.ka / p.ta * 100)} %`, 'b ta') + K.t(254, 144, `${N(v.k / p.tb * 100)} %`, 'b tg')),
    lee: (v, p) => `$\\tfrac{${p.ka}}{${p.ta}} = ${N(p.ka / p.ta * 100)}\\,\\% \\qquad \\tfrac{${R(v.k)}}{${p.tb}} = ${N(v.k / p.tb * 100)}\\,\\%$`, aviso: (v, p) => (v.k === p.ka ? 'Es la misma cantidad, pero el grupo B es más grande.' : v.k === p.ka + p.tb - p.ta ? 'Sumaste la diferencia entre los grupos; la proporción se multiplica.' : v.k * p.ta > p.ka * p.tb ? 'En B la proporción quedó mayor.' : 'En B la proporción quedó menor.'), bien: (v, p) => `Los dos son el ${N(p.ka / p.ta * 100)} %.`,
  });
  XG.cuenta('muestra-parecida', 90, (K, p) => { const T = p.tot.reduce((a, b) => a + b, 0); let x = 20; return p.tot.map((n, i) => { const w = n / T * 300, h = K.r(x, 24, w, 40, ['fa', 'fg', 'ff'][i], 4) + K.t(x + w / 2, 50, n) + K.t(x + w / 2, 80, p.et[i], 's tm'); x += w; return h; }).join('') + K.t(170, 14, `${T} en total`, 's tm'); });
  frases('muestras-sirven', 'Toca todas las que sirven.'); frases('se-concluye', 'Toca todo lo que se concluye.');
  XG.ascensor('sube-dato-real', 100, 5, neutro);
})();
