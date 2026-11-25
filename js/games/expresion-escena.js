// Ejercicios de expresiones algebraicas (Preicfes, icf-ma-ecuaciones; spec 2026-11-25-preicfes-estructura): áreas con letras, términos
// semejantes y factor común. Armazones en figura-kit y conteo-escena. La escena no dice el resultado mientras se responde.
(() => {
  // Rectángulo de lados x + a y x + b partido en cuatro.
  XG.cuenta('area-letras', 150, (K, p) => { const x = 96, y = 24, u = 84, a = 50, b = 36; return K.r(x, y, u, u, 'fa', 0) + K.r(x + u, y, a, u, 'fg', 0) + K.r(x, y + u, u, b, 'fg', 0) + K.r(x + u, y + u, a, b, 'ff', 0) + K.t(x + u / 2, 16, 'x', 's tm') + K.t(x + u + a / 2, 16, p.a, 's tm') + K.t(x - 10, y + u / 2 + 4, 'x', 's tm', 'end') + K.t(x - 10, y + u + b / 2 + 4, p.b, 's tm', 'end'); });
  // Términos en fila: los de la misma clase llevan el mismo color.
  XG.cuenta('junta-terminos', 70, (K, p) => p.t.map((s, i) => { const w = 300 / p.t.length; return K.r(20 + i * w, 14, w - 6, 40, ['fa', 'fg', 'ff'][p.c[i]], 6) + K.t(20 + (i + 0.5) * w - 3, 39, s, 's'); }).join(''));
  // Dos rectángulos pegados: cuál es el alto común más grande.
  XG.figura('factor-comun', {
    ini: () => ({ k: 1 }), alto: () => 190, ms: 1000, pie: 'Mueve el alto.',
    manijas: p => [{ k: 'k', min: 1, max: p.max, paso: 1, et: 'alto común' }], ok: (v, p) => v.k === p.k, sol: p => ({ k: p.k }), texto: p => `${p.k}(${p.a / p.k}${p.x} + ${p.b / p.k})`,
    dib(v, K, p, f) { const k = Math.max(1, Math.round(v.k)), h = 24 + k * 5; return K.r(50, 20, 150, h, 'fa', 0) + K.r(200, 20, 90, h, 'fg', 0) + K.t(125, 26 + h / 2, `${p.a}${p.x}`, 'b') + K.t(245, 26 + h / 2, p.b, 'b') + K.t(42, 24 + h / 2, k, 's tm', 'end') + K.f(f, K.t(125, 38 + h, p.a % k ? 'no cabe justo' : `${p.a / k}${p.x}`, 's tm') + K.t(245, 38 + h, p.b % k ? 'no cabe justo' : p.b / k, 's tm')); },
    aviso: (v, p) => (p.a % v.k || p.b % v.k ? `${v.k} no divide a los dos.` : `${v.k} divide a los dos, pero todavía se puede sacar más.`), bien: (v, p) => `${p.a}${p.x} + ${p.b} = ${p.k}(${p.a / p.k}${p.x} + ${p.b / p.k}).`,
  });
  // x² y dos tiras de a·x: cuántos cuadritos faltan en la esquina.
  XG.figura('cuadrado-falta', {
    ini: () => ({ c: 0 }), alto: () => 214, ms: 1000, pie: 'Mueve los cuadritos.',
    manijas: p => [{ k: 'c', min: 0, max: p.max, paso: 1, et: 'cuadritos de la esquina' }], ok: (v, p) => v.c === p.a * p.a, sol: p => ({ c: p.a * p.a }), texto: p => `${p.a * p.a}: (x + ${p.a})²`,
    dib(v, K, p, f) {
      const u = 13, L = 84, x = 110, y = 16; let h = K.r(x, y, L, L, 'fa', 0) + K.t(x + L / 2, y + L / 2 + 5, 'x²', 'b');
      for (let i = 0; i < p.a; i++) h += K.r(x + L + i * u, y, u - 1, L, 'fg', 0) + K.r(x, y + L + i * u, L, u - 1, 'fg', 0);
      if (f) for (let i = 0; i < Math.round(v.c); i++) { const r = Math.floor(i / p.a), c = i % p.a; h += K.f(Math.min(1, f * 2), K.r(x + L + c * u, y + L + r * u, u - 1, u - 1, r < p.a ? 'ff' : 'fF', 0)); }
      return h + K.t(x - 12, y + L / 2 + 5, 'x', 's tm', 'end') + K.t(x - 12, y + L + p.a * u / 2 + 4, p.a, 's tm', 'end');
    },
    aviso: (v, p) => (v.c < p.a * p.a ? 'Queda un hueco en la esquina.' : 'Sobran cuadritos: se salen del cuadrado.'), bien: (v, p) => `x² + ${2 * p.a}x + ${p.a * p.a} = (x + ${p.a})².`,
  });
  XG.frases('equivalen-no');
})();
