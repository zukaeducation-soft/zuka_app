// Ejercicios de «Triángulos y Semejanza» (Preicfes, icf-ma-forma; spec 2026-11-25-preicfes-estructura) que no existían: la desigualdad
// triangular. Armazón en figura-kit; la escena no dice el resultado mientras se responde.
(() => {
  const lo = p => Math.abs(p.a - p.b) + 1, hi = p => p.a + p.b - 1;
  // Dos varillas fijas: entre qué enteros puede estar la tercera.
  XG.figura('tercer-lado', {
    ini: () => ({ m: 1, n: 1 }), alto: () => 250, ms: 1000, pie: 'Mueve las dos perillas.',
    manijas: p => [{ k: 'm', min: 1, max: p.max, paso: 1, et: 'la más corta que cierra' }, { k: 'n', min: 1, max: p.max, paso: 1, et: 'la más larga que cierra' }],
    ok: (v, p) => v.m === lo(p) && v.n === hi(p), sol: p => ({ m: lo(p), n: hi(p) }), texto: p => `de ${lo(p)} a ${hi(p)}`,
    dib(v, K, p, f) {
      const u = 250 / p.max, r = (y, n, cls, t) => K.r(45, y, n * u, 20, cls, 2) + K.t(38, y + 15, t, 's tm', 'end');
      return r(12, p.a, 'fa', p.a) + r(40, p.b, 'fg', p.b) + K.f(f, r(76, v.m, v.m === lo(p) ? 'fo' : 'ff', v.m) + r(104, v.n, v.n === hi(p) ? 'fo' : 'ff', v.n)) + (f ? '' : K.t(170, 104, 'la tercera varilla', 's tm'));
    },
    aviso: (v, p) => (v.m !== lo(p) ? (v.m > hi(p) ? `Con ${v.m}, las otras dos no la alcanzan.` : v.m < lo(p) ? `Con ${v.m}, la corta y la de ${Math.min(p.a, p.b)} no pasan a la de ${Math.max(p.a, p.b)}.` : `Una más corta que ${v.m} también cierra.`) : v.n < lo(p) ? `Con ${v.n} todavía no cierra.` : v.n === hi(p) + 1 ? `Con ${v.n}, las otras dos apenas la igualan: queda una línea.` : v.n > hi(p) ? `Con ${v.n}, las otras dos juntas no la alcanzan.` : `Una más larga que ${v.n} también cierra.`),
    bien: (v, p) => `La tercera va entre la resta (${Math.abs(p.a - p.b)}) y la suma (${p.a + p.b}), sin tocarlas.`,
  });
  // Cuáles ternas cierran: se tocan.
  XG.frases('cierran-o-no');
})();
