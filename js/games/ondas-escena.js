// Ejercicios de «Ondas, Luz y Sonido» (Preicfes, icf-cn-ondas; spec 2026-11-25-preicfes-estructura). Armazones en figura-kit, conteo-escena y
// proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100;
  const onda = (K, y, A, n, cls = 'la gr', x0 = 24, x1 = 316) => K.pl(Array.from({ length: 121 }, (_, i) => [x0 + (x1 - x0) * i / 120, y - A * Math.sin(2 * Math.PI * n * i / 120)]), cls);
  // Longitud de onda para una rapidez y una frecuencia.  params { v, f, max, u }
  XG.figura('largo-onda', {
    ini: () => ({ l: 1 }), alto: () => 176, ms: 1000, pie: 'Mueve la longitud de onda.', manijas: p => [{ k: 'l', min: 1, max: p.max, paso: 1, et: `longitud de onda (${p.u})` }],
    ok: (v, p) => v.l * p.f === p.v, sol: p => ({ l: p.v / p.f }), texto: p => `${p.v / p.f} ${p.u}`,
    dib(v, K, p, f) { return K.l(24, 60, 316, 60, 'lm') + onda(K, 60, 26, p.max / v.l) + K.f(f, K.t(170, 118, `${N(v.l)} · ${p.f} = ${N(v.l * p.f)} ${p.u}/s`, 'b')); },
    aviso: (v, p) => (v.l * p.f < p.v ? 'Con esa longitud viajaría más despacio.' : 'Con esa longitud viajaría más rápido.'), bien: (v, p) => `${v.l} por ${p.f}: ${p.v}.`,
  });
  // Frecuencia: vibraciones en cierto tiempo.  params { n, t, max }
  XG.figura('cuenta-vibraciones', {
    ini: () => ({ f: 0 }), alto: () => 176, ms: 1000, pie: 'Mueve la frecuencia.', manijas: p => [{ k: 'f', min: 0, max: p.max, paso: 1, et: 'frecuencia (Hz)' }],
    ok: (v, p) => v.f * p.t === p.n, sol: p => ({ f: p.n / p.t }), texto: p => `${p.n / p.t} Hz`,
    dib(v, K, p, f) { const q = Array.from({ length: p.t + 1 }, (_, i) => 24 + 292 * i / p.t); return onda(K, 56, 24, p.n) + K.t(316, 100, `${p.t} s`, 's tm', 'end') + K.f(f, q.map(x => K.l(x, 24, x, 88, 'lg d')).join('')); },
    aviso: (v, p) => `Con ${v.f} por segundo, en ${p.t} s habría ${v.f * p.t}.`, bien: (v, p) => `${p.n} en ${p.t} s: ${v.f} cada segundo.`,
  });
  // Espejo: ángulo de salida medido desde la normal.  params { g }
  XG.figura('refleja-angulo', {
    ini: () => ({ a: 0 }), alto: () => 206, ms: 1000, pie: 'Mueve el rayo que sale.', manijas: () => [{ k: 'a', min: 0, max: 80, paso: 5, et: 'ángulo desde la normal (°)' }],
    ok: (v, p) => v.a === p.g, sol: p => ({ a: p.g }), texto: p => `${p.g}°`,
    dib(v, K, p, f) { const c = [170, 130], a = K.at(...c, 104, 90 + p.g), b = K.at(...c, 104, 90 - v.a); return K.l(40, 130, 300, 130, 'gr') + K.l(170, 20, 170, 130, 'lm d') + K.l(...a, ...c, 'la gr') + K.l(...c, ...b, 'lg gr') + K.t(46, 22, `${p.con ? `con el espejo: ${90 - p.g}°` : `con la normal: ${p.g}°`}`, 's tm', 'start') + K.f(f, K.arc(...c, 40, 90, 90 + p.g, 'la') + K.arc(...c, 40, 90 - p.g, 90, 'lo')); },
    aviso: (v, p) => (p.con && v.a === 90 - p.g ? 'Ese es el ángulo con el espejo: se mide desde la normal.' : v.a < p.g ? 'Sale demasiado pegado a la normal.' : 'Sale demasiado inclinado.'), bien: (v, p) => `Llega a ${p.g}° de la normal y sale a ${p.g}°.`,
  });
  // Eco.  params { v (m/s), t (s), max, paso }
  XG.figura('eco-distancia', {
    ini: () => ({ d: 0 }), alto: () => 180, ms: 1100, pie: 'Mueve la distancia a la pared.', manijas: p => [{ k: 'd', min: 0, max: p.max, paso: p.paso, et: 'distancia (m)' }],
    ok: (v, p) => 2 * v.d === p.v * p.t, sol: p => ({ d: p.v * p.t / 2 }), texto: p => `${p.v * p.t / 2} m`,
    dib(v, K, p, f) { const x = 40 + 250 * v.d / p.max; return K.c(30, 64, 10, 'fa') + K.r(x + 4, 24, 12, 80, 'fk', 2) + K.l(42, 56, x, 56, 'la') + K.l(42, 74, x, 74, 'lg') + K.t(60, 46, 'ida', 's ta', 'start') + K.t(60, 92, 'vuelta', 's tg', 'start') + K.f(f, K.t(170, 122, `2 · ${N(v.d)} = ${N(2 * v.d)} m`, 'b')); },
    aviso: (v, p) => (v.d === p.v * p.t ? 'Eso es lo que recorrió en ida y vuelta.' : 2 * v.d < p.v * p.t ? 'El eco volvería antes.' : 'El eco tardaría más.'), bien: (v, p) => `Ida y vuelta: ${p.v * p.t} m.`,
  });
  XG.renglones('se-acerca-normal', { w: 118, x: 268 });
  XG.renglones('tono-o-volumen', { w: 96, x: 278 });
  XG.ascensor('sube-rapidez', 100, 2, neutro);
})();
