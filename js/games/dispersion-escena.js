// Ejercicios de «Dispersión y Comparación», «Números y Sucesiones» y «Ciencia y Sociedad» (Preicfes; spec
// 2026-11-25-preicfes-estructura). Armazones en figura-kit, conteo-escena, logica-kit y proposiciones-escena. La escena no dice el
// resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100, sum = d => d.reduce((a, b) => a + b, 0);
  const EJE = (K, hi, y, paso = 1, lo = 0) => { const X = x => 24 + (x - lo) / (hi - lo) * 292; let h = K.l(24, y, 316, y, 'lm'); for (let i = lo; i <= hi; i += paso) h += K.l(X(i), y - 4, X(i), y + 4, 'lm') + K.t(X(i), y + 18, i, 's tm'); return [X, h]; };
  const puntos = (K, d, X, y, cls = 'fa') => { const n = {}; return d.map(x => { n[x] = (n[x] || 0) + 1; return K.c(X(x), y - 4 - n[x] * 13, 6, cls); }).join(''); };
  // ---------------------------------------------------------------------------------------------- rango, varianza, desviación
  // Punto de equilibrio: las desviaciones suman 0.  params { d, hi }
  XG.figura('desvios-cero', {
    ini: () => ({ m: 0 }), alto: () => 210, ms: 1000, pie: 'Mueve el punto de apoyo.', manijas: p => [{ k: 'm', min: 0, max: p.hi, paso: 1, et: 'apoyo' }], ok: (v, p) => v.m * p.d.length === sum(p.d), sol: p => ({ m: sum(p.d) / p.d.length }), texto: p => `${sum(p.d) / p.d.length}`,
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 92, p.hi > 12 ? 2 : 1), s = sum(p.d.map(x => x - v.m)); return h + puntos(K, p.d, X, 92) + K.l(X(v.m), 92, X(v.m), 70, 'lg d') + K.p([[X(v.m), 115], [X(v.m) - 8, 129], [X(v.m) + 8, 129]], 'fg') + K.f(f, K.t(170, 148, `desviaciones: ${s > 0 ? '+' : ''}${N(s)}`, 'b')); },
    aviso: (v, p) => (v.m * p.d.length < sum(p.d) ? 'Las desviaciones de la derecha pesan más.' : 'Las desviaciones de la izquierda pesan más.'), bien: (v) => `Alrededor de ${v.m} las desviaciones suman 0: es el promedio.`,
  });
  // Cambia el dato mayor hasta un rango pedido.  params { d (sin el mayor), rango, hi }
  XG.figura('mueve-rango', {
    ini: p => ({ x: Math.max(...p.d) }), alto: () => 190, ms: 900, pie: 'Mueve el dato mayor.', manijas: p => [{ k: 'x', min: Math.max(...p.d), max: p.hi, paso: 1, et: 'dato mayor' }], ok: (v, p) => v.x - Math.min(...p.d) === p.rango, sol: p => ({ x: Math.min(...p.d) + p.rango }), texto: p => `${Math.min(...p.d) + p.rango}`,
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 92, p.hi > 12 ? 2 : 1); return h + puntos(K, p.d, X, 92) + K.c(X(v.x), 75, 6, 'ff') + K.f(f, K.l(X(Math.min(...p.d)), 120, X(v.x), 120, 'la gr') + K.t(170, 138, `${N(v.x)} − ${Math.min(...p.d)} = ${N(v.x - Math.min(...p.d))}`, 'b')); },
    aviso: (v, p) => (v.x === p.rango ? 'Ese es el rango: falta contarlo desde el dato menor.' : v.x - Math.min(...p.d) < p.rango ? 'Con ese dato el rango es menor.' : 'Con ese dato el rango es mayor.'), bien: (v, p) => `De ${Math.min(...p.d)} a ${v.x} hay ${p.rango}.`,
  });
  XG.renglones('varianza-pasos', { w: 80, x: 280 });
  XG.frases('mas-disperso');
  XG.renglones('suma-igual', { w: 84, x: 278 });
  XG.renglones('elige-regular', { w: 92, x: 276 });
  XG.ascensor('sube-varianza', 60, 1, neutro);
  // --------------------------------------------------------------------------------------------------- percentiles y cajas
  const mediana = d => (d.length % 2 ? d[(d.length - 1) / 2] : (d[d.length / 2 - 1] + d[d.length / 2]) / 2), cuart = d => { const m = Math.floor(d.length / 2); return [mediana(d.slice(0, m)), mediana(d), mediana(d.slice(-m))]; };
  // Arma la caja de unos datos ordenados.  params { d, hi }
  XG.figura('arma-caja', {
    ini: () => ({ a: 0, b: 0, c: 0 }), alto: () => 300, ms: 1000, pie: 'Mueve los tres cortes.', manijas: p => [['a', 'primer cuartil'], ['b', 'mediana'], ['c', 'tercer cuartil']].map(([k, et]) => ({ k, min: 0, max: p.hi, paso: 1, et })),
    ok(v, p) { const q = cuart(p.d); return v.a === q[0] && v.b === q[1] && v.c === q[2]; }, sol(p) { const [a, b, c] = cuart(p.d); return { a, b, c }; }, texto: p => cuart(p.d).join(', '),
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 84, p.hi > 12 ? 2 : 1), lo = Math.min(...p.d), hi = Math.max(...p.d); return h + puntos(K, p.d, X, 84) + K.f(f, K.l(X(lo), 124, X(hi), 124, 'gr') + K.r(X(Math.min(v.a, v.c)), 110, Math.abs(X(v.c) - X(v.a)), 28, 'fa', 2) + K.l(X(v.b), 110, X(v.b), 138, 'lg gr')); },
    aviso(v, p) { const q = cuart(p.d); return v.b !== q[1] ? 'La mediana deja la misma cantidad de datos a cada lado.' : v.a !== q[0] ? 'El primer cuartil es la mediana de la mitad de abajo.' : 'El tercer cuartil es la mediana de la mitad de arriba.'; }, bien: (v) => `Cuartiles ${v.a}, ${v.b} y ${v.c}.`,
  });
  const caja = (K, q, X, y, cls) => K.l(X(q[0]), y, X(q[4]), y, 'gr') + K.l(X(q[0]), y - 8, X(q[0]), y + 8, 'gr') + K.l(X(q[4]), y - 8, X(q[4]), y + 8, 'gr') + K.r(X(q[1]), y - 12, X(q[3]) - X(q[1]), 24, cls, 2) + K.l(X(q[2]), y - 12, X(q[2]), y + 12, 'lg gr');
  XG.renglones('lee-caja', { w: 72, x: 282, y0: 118, fondo(K, p) { const [X, h] = EJE(K, p.hi, 58, p.paso); return h + caja(K, p.q, X, 26, 'fa'); } });
  XG.renglones('compara-cajas', { w: 72, x: 282, y0: 148, fondo(K, p) { const [X, h] = EJE(K, p.hi, 92, p.paso); return h + caja(K, p.A, X, 20, 'fa') + caja(K, p.B, X, 60, 'ff') + K.t(10, 24, 'A', 'b ta', 'start') + K.t(10, 64, 'B', 'b tf', 'start'); } });
  // Cuántos quedan por debajo de un percentil.  params { n, pc, max }
  XG.figura('percentil-puesto', {
    ini: () => ({ k: 0 }), alto: () => 190, ms: 900, pie: 'Mueve cuántos quedan por debajo.', manijas: p => [{ k: 'k', min: 0, max: p.n, paso: p.paso || 1, et: 'por debajo' }], ok: (v, p) => v.k * 100 === p.n * p.pc, sol: p => ({ k: p.n * p.pc / 100 }), texto: p => `${p.n * p.pc / 100}`,
    dib(v, K, p, f) { const w = 292 * v.k / p.n; return K.r(24, 40, 292, 34, 'fc', 3) + K.r(24, 40, w, 34, 'fa', 3) + K.t(24, 30, '0', 's tm') + K.t(316, 30, `${p.n} personas`, 's tm', 'end') + K.f(f, K.t(170, 104, `${N(v.k)} de ${p.n}: ${N(v.k / p.n * 100)} %`, 'b')); },
    aviso: (v, p) => (v.k === p.pc ? 'El percentil es un porcentaje, no el número de personas.' : v.k * 100 < p.n * p.pc ? 'Son menos que ese porcentaje.' : 'Son más que ese porcentaje.'), bien: (v, p) => `${v.k} de ${p.n} es el ${p.pc} %.`,
  });
  XG.frases('dice-la-caja');
  XG.ascensor('sube-percentil', 100, 2, neutro);
  // ------------------------------------------------------------------------------------------------------------ correlación
  // Predice con la tendencia.  params { pts, m, b, x, tol, hx, hy }
  XG.figura('predice-nube', {
    ini: () => ({ y: 0 }), alto: () => 224, ms: 1000, pie: 'Mueve la predicción.', manijas: p => [{ k: 'y', min: 0, max: p.hy, paso: 1, et: 'predicción' }], ok: (v, p) => Math.abs(v.y - (p.m * p.x + p.b)) <= p.tol, sol: p => ({ y: p.m * p.x + p.b }), texto: p => `cerca de ${p.m * p.x + p.b}`,
    dib(v, K, p, f) { const X = x => 36 + x / p.hx * 280, Y = y => 140 - y / p.hy * 124; return K.l(36, 140, 320, 140, 'lm') + K.l(36, 10, 36, 140, 'lm') + p.pts.map(([x, y]) => K.c(X(x), Y(y), 5, 'fa')).join('') + K.l(X(p.x), 140, X(p.x), 12, 'lm d') + K.t(X(p.x), 156, p.x, 's tm') + K.c(X(p.x), Y(v.y), 7, 'ff') + [p.hy / 2, p.hy].map(y => K.t(30, Y(y) + 4, y, 's tm', 'end')).join('') + K.f(f, K.l(X(0), Y(p.b), X(p.hx), Y(p.m * p.hx + p.b), 'lg d')); },
    aviso: (v, p) => (v.y < p.m * p.x + p.b ? 'Queda por debajo de la tendencia.' : 'Queda por encima de la tendencia.'), bien: (v, p) => `La tendencia pasa cerca de ${p.m * p.x + p.b}.`,
  });
  // El punto que se sale de la tendencia.  params { pts: [[x, y]], raro, hx, hy }
  const PX = (p, q) => [40 + q[0] / p.hx * 264, 150 - q[1] / p.hy * 130];
  XG.marca('punto-raro', {
    sitios: p => p.pts.map(q => ({ x: PX(p, q)[0], y: PX(p, q)[1], w: 24, h: 24 })), cara: (K, p, i) => K.c(...PX(p, p.pts[i]), 5, 'fa'), alto: () => 176, nombre: (p, i) => `punto ${i + 1}`, fondo: K => K.l(30, 160, 320, 160, 'lm') + K.l(30, 8, 30, 160, 'lm'),
    sol: p => [p.raro], aviso: () => 'Ese sigue la tendencia de los demás, o falta uno: busca el que está lejos del grupo.', bien: p => p.ok, texto: p => `(${p.pts[p.raro].join(', ')})`, pie: 'Toca el punto que se sale.',
  });
  XG.renglones('signo-correlacion', { w: 92, x: 276 });
  XG.renglones('fuerza-r', { w: 116, x: 270 });
  XG.renglones('tercer-factor', { w: 130, x: 262 });
  XG.frases('causa-o-no');
  XG.ascensor('sube-nube', 60, 1, neutro);

  // ===================================================================================== Números y Sucesiones
  // Punto de una fracción en la recta.  params { n, d, hi }
  XG.figura('fraccion-recta', {
    ini: () => ({ k: 0 }), alto: () => 180, ms: 900, pie: 'Mueve el punto.', manijas: p => [{ k: 'k', min: 0, max: p.hi * p.partes, paso: 1, et: 'marcas' }], ok: (v, p) => v.k * p.d === p.n * p.partes, sol: p => ({ k: p.n * p.partes / p.d }), texto: p => `${p.n * p.partes / p.d} marcas`,
    dib(v, K, p, f) { const T = p.hi * p.partes, X = k => 30 + k / T * 280; let h = K.l(30, 60, 310, 60, 'gr'); for (let i = 0; i <= T; i++) h += K.l(X(i), i % p.partes ? 55 : 50, X(i), i % p.partes ? 65 : 70, 'lm') + (i % p.partes ? '' : K.t(X(i), 86, i / p.partes, 's')); return h + K.c(X(v.k), 60, 7, 'ff') + K.t(170, 24, p.et, 'b') + K.f(f, K.t(170, 110, `${N(v.k)} de ${p.partes}: ${N(v.k / p.partes)}`, 'b')); },
    aviso: (v, p) => (v.k * p.d < p.n * p.partes ? 'Ese punto vale menos.' : 'Ese punto vale más.'), bien: (v, p) => `${v.k} marcas de ${p.partes} por unidad.`,
  });
  // Exponente de una notación científica.  params { m, et, e, lo, hi }
  const SUP = n => [...String(n)].map(c => (c === '-' ? '⁻' : '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])).join('');
  XG.figura('coma-cientifica', {
    ini: () => ({ e: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el exponente.', manijas: p => [{ k: 'e', min: p.lo, max: p.hi, paso: 1, et: 'exponente' }], ok: (v, p) => v.e === p.e, sol: p => ({ e: p.e }), texto: p => `${p.m} · 10${SUP(p.e)}`,
    dib(v, K, p, f) { const e = Math.round(v.e); return K.t(170, 40, p.et, 'B') + K.t(170, 84, `${p.m} · 10${SUP(e)}`, 'B ta') + K.f(f, K.t(170, 112, e === p.e ? 'son iguales' : 'no son iguales', 's tm')); },
    aviso: (v, p) => (Math.sign(v.e) !== Math.sign(p.e) ? 'Mira si el número es mayor que 10 o menor que 1.' : Math.abs(v.e) > Math.abs(p.e) ? 'Corriste la coma de más.' : 'A la coma le faltó correr.'), bien: (v, p) => `La coma corre ${Math.abs(p.e)} lugares.`,
  });
  XG.renglones('fraccion-decimal', { w: 76, x: 280 });
  XG.renglones('opera-cientifica', { w: 96, x: 272 });
  XG.frases('entre-los-dos');
  XG.renglones('a-que-conjunto', { w: 112, x: 270 });
  XG.ascensor('sube-fraccion', 100, 2, neutro);
  // Cuánto se cruzan dos grupos.  params { a, b, total, A, B, fuera }
  XG.figura('cruce-grupos', {
    ini: () => ({ k: 0 }), alto: () => 200, ms: 1000, pie: 'Mueve los que están en los dos.', manijas: p => [{ k: 'k', min: 0, max: Math.min(p.a, p.b), paso: 1, et: 'en los dos' }], ok: (v, p) => p.a + p.b - v.k + p.fuera === p.total, sol: p => ({ k: p.a + p.b + p.fuera - p.total }), texto: p => `${p.a + p.b + p.fuera - p.total}`,
    dib(v, K, p, f) { return K.r(20, 10, 300, 126, 'fn', 6) + K.c(130, 74, 50, 'fa') + K.c(210, 74, 50, 'fg') + K.t(28, 26, `${p.A}: ${p.a}`, 's ta', 'start') + K.t(312, 26, `${p.B}: ${p.b}`, 's tg', 'end') + K.t(170, 79, Math.round(v.k), 'b') + K.t(300, 128, p.fuera, 's tm') + K.f(f, K.t(112, 79, p.a - Math.round(v.k), 'b') + K.t(228, 79, p.b - Math.round(v.k), 'b')); },
    aviso(v, p) { const t = p.a + p.b - v.k + p.fuera; return t > p.total ? 'Así habría más personas que el total: se están contando dos veces.' : 'Así sobrarían personas sin ubicar.'; }, bien: (v, p) => `${p.a} + ${p.b} − ${v.k} + ${p.fuera} = ${p.total}.`,
  });
  // Zonas de dos conjuntos.  params { pide, zonas, mira: [por zona], ok }
  const ZN = [[104, 84, 'solo A'], [170, 84, 'A y B'], [236, 84, 'solo B'], [298, 146, 'fuera']];
  XG.marca('pinta-zona', {
    sitios: () => ZN.map(([x, y]) => ({ x, y, w: 44, h: 40 })), cara: (K, p, i, on) => K.t(ZN[i][0], ZN[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 176, nombre: (p, i) => ZN[i][2], fondo: K => K.r(12, 8, 316, 160, 'fn', 8) + K.c(134, 84, 62, 'fa') + K.c(206, 84, 62, 'fg') + K.t(70, 30, 'A', 'b ta') + K.t(270, 30, 'B', 'b tg'),
    sol: p => p.zonas, aviso(on, p) { const i = on.findIndex((x, k) => x !== p.zonas.includes(k)); return p.mira[i]; }, bien: p => p.ok, texto: p => p.zonas.map(i => ZN[i][2]).join('; '), pie: 'Toca todas las zonas que cumplen.',
  });
  XG.rotula('llena-zonas', {
    slots: () => [{ x: 102, y: 84, w: 50, h: 38 }, { x: 170, y: 84, w: 46, h: 38 }, { x: 238, y: 84, w: 50, h: 38 }, { x: 290, y: 146, w: 50, h: 34 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${ZN[i][2]}: ${m}`).join('; '), alto: () => 176, fondo: (K, p) => K.r(12, 8, 316, 160, 'fn', 8) + K.c(134, 84, 62, 'fa') + K.c(206, 84, 62, 'fg') + K.t(66, 28, p.A, 's ta') + K.t(274, 28, p.B, 's tg'),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,
  });
  XG.renglones('cuantos-conjunto', { w: 64, x: 284 });
  XG.frases('verdad-conjuntos');
  XG.ascensor('sube-conjunto', 60, 1, neutro);
  // Qué término vale lo pedido.  params { a, d (suma) | r (razón), meta, max }
  const term = (p, n) => (p.r ? p.a * p.r ** (n - 1) : p.a + p.d * (n - 1)), cual = p => { let n = 1; while (n < p.max && Math.abs(term(p, n) - p.meta) > 1e-9) n++; return n; };
  XG.figura('que-termino', {
    ini: () => ({ n: 1 }), alto: () => 176, ms: 900, pie: 'Mueve el lugar.', manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'lugar' }], ok: (v, p) => Math.abs(term(p, v.n) - p.meta) < 1e-9, sol: p => ({ n: cual(p) }), texto: p => `el lugar ${cual(p)}`,
    dib(v, K, p, f) { const n = Math.round(v.n); return [1, 2, 3].map(i => K.r(28 + (i - 1) * 62, 30, 54, 38, 'fa', 5) + K.t(55 + (i - 1) * 62, 55, N(term(p, i)), 'b')).join('') + K.t(224, 55, '…', 'b') + K.r(246, 30, 66, 38, 'ff', 5) + K.t(279, 55, p.meta, 'b') + K.t(279, 84, `lugar ${n}`, 's tm') + K.f(f, K.t(170, 110, `en el lugar ${n} está ${N(term(p, n))}`, 's')); },
    aviso(v, p) { return `En el lugar ${v.n} está ${N(term(p, v.n))}.`; }, bien: (v, p) => `En el lugar ${v.n} está ${p.meta}.`,
  });
  XG.renglones('suma-o-multiplica', { w: 108, x: 272 });
  XG.renglones('se-acerca-a', { w: 76, x: 280 });
  XG.renglones('lugar-lejano', { w: 76, x: 280 });
  XG.frases('tiene-limite');
  // Cuántas mitades hasta que falte a lo sumo 1/tope.  params { tope, max }
  XG.figura('mitades-faltan', {
    ini: () => ({ n: 0 }), alto: () => 176, ms: 1000, pie: 'Mueve cuántos pasos.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'pasos' }], ok: (v, p) => v.n === Math.ceil(Math.log2(p.tope)), sol: p => ({ n: Math.ceil(Math.log2(p.tope)) }), texto: p => `${Math.ceil(Math.log2(p.tope))} pasos`,
    dib(v, K, p, f) { const n = Math.round(v.n); return K.l(30, 60, 310, 60, 'lm') + K.t(30, 84, '0', 's') + K.t(310, 84, 'meta', 's') + [1, 2, 3].map(i => K.c(30 + 280 * (1 - 0.5 ** i), 60, 4, 'fa')).join('') + K.f(f, K.r(30, 54, 280 * (1 - 0.5 ** n), 12, 'fg', 2) + K.t(170, 110, n ? `falta 1/${2 ** n}` : 'falta todo', 'b')); },
    aviso: (v, p) => (2 ** v.n < p.tope ? `Con ${v.n} todavía falta ${v.n ? `1/${2 ** v.n}` : 'todo'}.` : 'Ya alcanzaba con menos pasos.'), bien: (v) => `Falta 1/${2 ** v.n}.`,
  });
  XG.ascensor('sube-sucesion', 100, 2, neutro);

  // ======================================================================================== Ciencia y Sociedad
  XG.renglones('riesgo-grupos', { w: 84, x: 278 });
  XG.renglones('solida-o-no', { w: 100, x: 276 });
  XG.frases('buena-evidencia');
  // Huella: cuántos para compensar.  params { gasta, cada, max, et, u }
  XG.figura('compensa-justo', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve la cantidad.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => v.n * p.cada === p.gasta, sol: p => ({ n: p.gasta / p.cada }), texto: p => `${p.gasta / p.cada} ${p.et}`,
    dib(v, K, p, f) { const u = 270 / (p.max * p.cada), n = Math.round(v.n), w = p.cada * u; return K.r(30, 22, p.gasta * u, 26, 'ff', 2) + K.t(34, 40, `${p.gasta} ${p.u}`, 's', 'start') + Array.from({ length: n }, (_, i) => K.r(30 + i * (f ? w : 5), 58, f ? Math.max(2, w - 1) : 4, 26, 'fa', 1)).join('') + K.f(f, K.t(170, 104, `${n} · ${p.cada} = ${n * p.cada} ${p.u}`, 'b')); },
    aviso: (v, p) => (v.n * p.cada < p.gasta ? 'No alcanza.' : 'Sobra: se puede con menos.'), bien: (v, p) => `${v.n} por ${p.cada}: ${p.gasta} ${p.u}.`,
  });
  XG.ascensor('sube-evidencia', 100, 2, neutro);
})();
