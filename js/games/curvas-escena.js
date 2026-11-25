// Ejercicios de «Funciones que Curvan» (Preicfes, icf-ma-curvas; spec 2026-11-25-preicfes-estructura): parábolas, exponenciales, ondas,
// dominio y rango. Armazones en figura-kit, conteo-escena y proposiciones-escena. La curva aparece al comprobar.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], R = x => Math.round(x * 100) / 100;
  // Plano de [x0, x1] por [y0, y1] en un cuadro de 300 por alto.
  const plano = ([x0, x1, y0, y1], alto = 130) => { const X = x => 24 + (x - x0) / (x1 - x0) * 296, Y = y => 10 + (y1 - y) / (y1 - y0) * alto; return { X, Y, ejes: K => K.l(24, Y(0), 320, Y(0), 'lm') + K.l(X(0), 10, X(0), 10 + alto, 'lm'), curva: (K, f, cls = 'la gr', a = x0, b = x1) => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Math.max(4, Math.min(16 + alto, Y(f(x))))]; }), cls) }; };
  // ------------------------------------------------------------------------------------------------------ cuadráticas
  // El eje de una parábola que sale y vuelve al suelo.  params { r1, r2, h, max, et }
  XG.figura('vertice-parabola', {
    ini: () => ({ x: 0 }), alto: () => 206, ms: 1000, pie: 'Mueve el punto de mayor altura.', manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => v.x === (p.r1 + p.r2) / 2, sol: p => ({ x: (p.r1 + p.r2) / 2 }), texto: p => `${(p.r1 + p.r2) / 2}`,
    dib(v, K, p, f) { const g = plano([0, p.max, 0, p.h * 1.15]), m = (p.r1 + p.r2) / 2, d = (p.r2 - p.r1) / 2; return g.ejes(K) + K.c(g.X(p.r1), g.Y(0), 5, 'fa') + K.c(g.X(p.r2), g.Y(0), 5, 'fa') + K.t(g.X(p.r1), g.Y(0) + 16, p.r1 || '', 's') + K.t(g.X(p.r2), g.Y(0) + 16, p.r2, 's') + K.l(g.X(v.x), 12, g.X(v.x), g.Y(0), 'lg d') + K.f(f, g.curva(K, x => p.h * (1 - ((x - m) / d) ** 2), 'la gr', p.r1, p.r2)); },
    aviso: (v, p) => (v.x < (p.r1 + p.r2) / 2 ? 'Ahí todavía va subiendo.' : 'Ahí ya va bajando.'), bien: (v, p) => `A mitad de camino entre ${p.r1} y ${p.r2}.`,
  });
  // Corral con una cantidad fija de cerca: lado que da la mayor área.  params { total, muro (bool) }
  const otro = (p, x) => (p.muro ? p.total - 2 * x : p.total / 2 - x), mejor = p => p.total / 4;
  XG.figura('ancho-maximo', {
    ini: () => ({ x: 1 }), alto: () => 204, ms: 1000, pie: 'Mueve el lado.', manijas: p => [{ k: 'x', min: 1, max: p.total / 2 - 1, paso: 1, et: 'lado (m)' }],
    ok: (v, p) => v.x === mejor(p), sol: p => ({ x: mejor(p) }), texto: p => `${mejor(p)} m`,
    dib(v, K, p, f) { const u = Math.min(250 / (p.muro ? p.total : p.total / 2), 108 / (p.total / 2)), w = otro(p, v.x) * u, h = v.x * u, x = 170 - w / 2; return (p.muro ? K.r(30, 14, 280, 8, 'fk', 0) : '') + K.r(x, 24, w, h, 'fa', 0) + K.t(x - 8, 28 + h / 2, R(v.x), 's tm', 'end') + K.f(f, K.t(170, 30 + h / 2, `${R(v.x)} · ${R(otro(p, v.x))} = ${R(v.x * otro(p, v.x))}`, 'b')); },
    aviso: (v, p) => `Con ese lado el área no es la mayor: prueba con uno ${v.x < mejor(p) ? 'más grande' : 'más pequeño'}.`, bien: (v, p) => `${v.x} por ${otro(p, v.x)}: ${v.x * otro(p, v.x)}.`,
  });
  // Dos ceros de x² + bx + c.  params { b, c, r: [menor, mayor], lo, hi, eq }
  XG.figura('raices-parabola', {
    ini: p => ({ a: p.lo, b: p.hi }), alto: () => 232, ms: 1000, pie: 'Mueve los dos cortes.', manijas: p => [{ k: 'a', min: p.lo, max: p.hi, paso: 1, et: 'corte menor' }, { k: 'b', min: p.lo, max: p.hi, paso: 1, et: 'corte mayor' }],
    ok: (v, p) => v.a === p.r[0] && v.b === p.r[1], sol: p => ({ a: p.r[0], b: p.r[1] }), texto: p => p.r.join(' y '),
    dib(v, K, p, f) { const y0 = (p.c - p.b * p.b / 4), g = plano([p.lo - 1, p.hi + 1, Math.min(-2, y0 * 1.2), Math.max(6, -y0)], 104); return g.ejes(K) + K.c(g.X(v.a), g.Y(0), 6, 'fF') + K.c(g.X(v.b), g.Y(0), 6, 'fg') + K.f(f, g.curva(K, x => x * x + p.b * x + p.c)); },
    aviso(v, p) { const g = x => x * x + p.b * x + p.c, m = [v.a, v.b].find(x => g(x) !== 0); return m != null ? `En ${m} la expresión vale ${g(m)}, no 0.` : 'Falta el otro corte, o están cambiados.'; }, bien: (v, p) => `En ${p.r[0]} y en ${p.r[1]} vale 0.`,
  });
  XG.renglones('lee-parabola', { w: 72, x: 280 });
  XG.renglones('abre-arriba', { w: 110, x: 272 });
  XG.frases('punto-en-curva');
  XG.ascensor('sube-parabola', 100, 2, neutro);
  // ----------------------------------------------------------------------------------------- exponenciales y logaritmos
  // Cuántas veces se duplica (o se parte).  params { C, k, meta, max, et }
  XG.figura('veces-factor', {
    ini: () => ({ n: 0 }), alto: () => 160, ms: 1000, pie: 'Mueve cuántas veces.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => Math.abs(p.C * p.k ** v.n - p.meta) < 1e-9, sol: p => ({ n: Math.round(Math.log(p.meta / p.C) / Math.log(p.k)) }), texto: p => `${Math.round(Math.log(p.meta / p.C) / Math.log(p.k))}`,
    dib(v, K, p, f) { const n = Math.round(v.n), w = Math.min(44, 290 / (n + 1)); return Array.from({ length: n + 1 }, (_, i) => K.c(30 + i * w, 44, i ? 5 : 9, i ? 'fg' : 'fa') + (i ? K.l(30 + (i - 1) * w + 8, 44, 30 + i * w - 8, 44, 'lm') : '')).join('') + K.t(30, 24, p.C, 's') + K.f(f, K.t(170, 88, `${p.C} → ${R(p.C * p.k ** n)}`, 'b')); },
    aviso: (v, p) => `Con ese número llega a ${R(p.C * p.k ** v.n)}.`, bien: (v, p) => `${v.n} veces por ${R(p.k)}: ${R(p.meta)}.`,
  });
  XG.renglones('tabla-exponencial', { w: 72, x: 280 });
  XG.renglones('crece-como', { w: 112, x: 272 });
  XG.renglones('log-es', { w: 60, x: 284 });
  XG.renglones('sube-o-baja-base', { w: 100, x: 276 });
  XG.frases('igual-potencia');
  XG.ascensor('sube-logaritmo', 40, 1, neutro);
  // ----------------------------------------------------------------------------------------------------------- periódicas
  // Centro y amplitud de una onda que va de mín a máx.  params { min, max, hi }
  XG.figura('amplitud-onda', {
    ini: () => ({ m: 0, a: 0 }), alto: () => 236, ms: 1100, pie: 'Mueve la línea media y la amplitud.', manijas: p => [{ k: 'm', min: 0, max: p.hi, paso: 1, et: 'línea media' }, { k: 'a', min: 0, max: p.hi / 2, paso: 1, et: 'amplitud' }],
    ok: (v, p) => v.m === (p.max + p.min) / 2 && v.a === (p.max - p.min) / 2, sol: p => ({ m: (p.max + p.min) / 2, a: (p.max - p.min) / 2 }), texto: p => `media ${(p.max + p.min) / 2}, amplitud ${(p.max - p.min) / 2}`,
    dib(v, K, p, f) { const g = plano([0, 10, 0, p.hi], 108); return g.ejes(K) + K.l(24, g.Y(p.max), 320, g.Y(p.max), 'lm') + K.l(24, g.Y(p.min), 320, g.Y(p.min), 'lm') + K.t(330, g.Y(p.max) + 4, p.max, 's tm') + K.t(330, g.Y(p.min) + 4, p.min, 's tm') + K.l(24, g.Y(v.m), 320, g.Y(v.m), 'lg d') + K.f(f, g.curva(K, x => v.m + v.a * Math.sin(x * Math.PI / 2.5))); },
    aviso: (v, p) => (v.m !== (p.max + p.min) / 2 ? 'La línea media no queda a igual distancia del máximo y del mínimo.' : 'La amplitud va de la línea media al máximo.'), bien: (v, p) => `De ${p.min} a ${p.max}: media ${v.m} y amplitud ${v.a}.`,
  });
  // Periodo: cuánto tarda una vuelta.  params { n, total, max, u }
  XG.figura('periodo-onda', {
    ini: () => ({ t: 1 }), alto: () => 196, ms: 1100, pie: 'Mueve lo que dura una vuelta.', manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: `periodo (${p.u})` }],
    ok: (v, p) => v.t * p.n === p.total, sol: p => ({ t: p.total / p.n }), texto: p => `${p.total / p.n} ${p.u}`,
    dib(v, K, p, f) { const g = plano([0, p.total, -1.3, 1.3], 100); return K.l(24, g.Y(0), 320, g.Y(0), 'lm') + g.curva(K, x => Math.sin(2 * Math.PI * x * p.n / p.total) * (0.001 + f), 'la gr', 0, p.total) + K.f(f, K.r(24, g.Y(1.2), g.X(Math.min(p.total, v.t)) - 24, g.Y(-1.2) - g.Y(1.2), 'ff', 0)) + K.t(320, 124, `${p.total} ${p.u}`, 's tm', 'end'); },
    aviso: (v, p) => (v.t * p.n < p.total ? `${p.n} vueltas de ${v.t} no completan ${p.total}.` : `${p.n} vueltas de ${v.t} se pasan de ${p.total}.`), bien: (v, p) => `${p.n} vueltas de ${v.t}: ${p.total}.`,
  });
  XG.renglones('lee-onda', { w: 72, x: 280 });
  XG.renglones('en-que-momento', { w: 72, x: 280 });
  // Altura de una cabina en una rueda: ángulo desde la horizontal de la derecha.  params { r, c (altura del centro), y, g, max }
  XG.figura('altura-rueda', {
    ini: () => ({ g: 0 }), alto: () => 232, ms: 1000, pie: 'Gira la cabina.', manijas: p => [{ k: 'g', min: 0, max: p.max, paso: 15, et: 'ángulo (°)' }],
    ok: (v, p) => v.g === p.g, sol: p => ({ g: p.g }), texto: p => `${p.g}°`,
    dib(v, K, p, f) { const u = 62 / p.r, cx = 150, cy = 92, [x, y] = K.at(cx, cy, 62, v.g); return K.arc(cx, cy, 62, 0, 360, 'lm') + K.l(cx - 80, cy, cx + 80, cy, 'lm d') + K.l(cx, cy, x, y, 'la') + K.c(x, y, 8, 'fF') + K.l(40, cy + p.c * u, 300, cy + p.c * u, 'lm') + K.t(250, cy + 4, `centro a ${p.c} m`, 's tm', 'start').replace('start', 'middle') + K.f(f, K.l(x, y, x, cy + p.c * u, 'lg d') + K.t(x + 10, cy + 30, `${R(p.c + p.r * Math.sin(v.g * Math.PI / 180))} m`, 'b', 'start')); },
    aviso(v, p) { const h = R(p.c + p.r * Math.sin(v.g * Math.PI / 180)); return Math.abs(h - p.y) < 0.01 ? 'La altura es esa, pero no es la primera vez que pasa.' : `Ahí está a ${h} m.`; }, bien: (v, p) => `${p.c} del centro y ${R(p.y - p.c)} por el giro: ${p.y} m.`,
  });
  XG.frases('es-periodica');
  XG.ascensor('sube-onda', 60, 1, neutro);
  // ------------------------------------------------------------------------------------------------ dominio, rango y cortes
  // Rango leído en la gráfica.  params { f, dom: [a, b], win, lo, hi }
  XG.figura('rango-ventana', {
    ini: p => ({ a: p.win[2], b: p.win[3] }), alto: () => 236, ms: 1000, pie: 'Mueve el piso y el techo.', manijas: p => [{ k: 'a', min: p.win[2], max: p.win[3], paso: 1, et: 'valor menor' }, { k: 'b', min: p.win[2], max: p.win[3], paso: 1, et: 'valor mayor' }],
    ok: (v, p) => v.a === p.lo && v.b === p.hi, sol: p => ({ a: p.lo, b: p.hi }), texto: p => `de ${p.lo} a ${p.hi}`,
    dib(v, K, p, f) { const g = plano(p.win, 110), [a, b] = p.dom; let h = g.ejes(K) + g.curva(K, p.f, 'la gr', a, b) + K.c(g.X(a), g.Y(p.f(a)), 5, 'fa') + K.c(g.X(b), g.Y(p.f(b)), 5, 'fa'); for (let y = p.win[2]; y <= p.win[3]; y++) h += K.l(g.X(0) - 3, g.Y(y), g.X(0) + 3, g.Y(y), 'lm') + (y % 2 === 0 && y ? K.t(g.X(0) - 7, g.Y(y) + 4, y, 's tm', 'end') : ''); return h + K.f(f, K.l(24, g.Y(v.a), 320, g.Y(v.a), 'lg d') + K.l(24, g.Y(v.b), 320, g.Y(v.b), 'lg d')); },
    aviso: (v, p) => (v.a > p.lo || v.b < p.hi ? 'Parte de la curva queda por fuera.' : 'Hay alturas a las que la curva no llega.'), bien: (v, p) => `La curva va de ${p.lo} a ${p.hi}.`,
  });
  // Cortes de una recta ax + by = c con los ejes.  params { a, b, c, max }
  XG.figura('corte-ejes', {
    ini: () => ({ x: 0, y: 0 }), alto: () => 232, ms: 1000, pie: 'Mueve los dos cortes.', manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'corte con el eje x' }, { k: 'y', min: 0, max: p.max, paso: 1, et: 'corte con el eje y' }],
    ok: (v, p) => v.x * p.a === p.c && v.y * p.b === p.c, sol: p => ({ x: p.c / p.a, y: p.c / p.b }), texto: p => `(${p.c / p.a}, 0) y (0, ${p.c / p.b})`,
    dib(v, K, p, f) { const g = plano([-1, p.max + 1, -1, p.max + 1], 108); return g.ejes(K) + K.c(g.X(v.x), g.Y(0), 6, 'fF') + K.c(g.X(0), g.Y(v.y), 6, 'fg') + K.f(f, K.l(g.X(v.x), g.Y(0), g.X(0), g.Y(v.y), 'la gr')); },
    aviso: (v, p) => (v.x * p.a !== p.c ? `Con y = 0 y x = ${v.x} no da ${p.c}.` : `Con x = 0 y y = ${v.y} no da ${p.c}.`), bien: (v, p) => `(${v.x}, 0) y (0, ${v.y}).`,
  });
  XG.frases('dominio-valores');
  XG.frases('es-funcion');
  XG.renglones('lee-cortes', { w: 72, x: 280 });
  XG.renglones('contexto-dominio', { w: 120, x: 268 });
  XG.ascensor('sube-funcion', 60, 1, neutro);
})();
