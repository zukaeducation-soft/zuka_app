// Ejercicios de «Dinero y Créditos» (Preicfes, icf-ma-finanzas; spec 2026-11-25-preicfes-estructura): interés simple y compuesto, cuotas,
// IVA y descuentos. Armazones en figura-kit, conteo-escena y proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], R = x => Math.round(x * 100) / 100;
  // ------------------------------------------------------------------------------------------- interés simple y compuesto
  // Cuántos periodos de interés simple: cada uno agrega un bloque igual.  params { C, i (interés de cada periodo), meta, max, et }
  XG.figura('plazo-simple', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el plazo.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => p.C + p.i * v.n === p.meta, sol: p => ({ n: (p.meta - p.C) / p.i }), texto: p => `${(p.meta - p.C) / p.i} ${p.et}`,
    dib(v, K, p, f) { const w = 210 / p.max, n = Math.round(v.n); return K.r(20, 30, 80, 48, 'fa', 4) + K.t(60, 60, p.C, 'b') + Array.from({ length: n }, (_, i) => K.r(100 + i * w, 30, Math.max(2, w - 1), 48, 'fg', 2)).join('') + K.f(f, K.t(170, 102, `${p.C} + ${n} · ${p.i} = ${p.C + n * p.i}`, 'b')); },
    aviso: (v, p) => (p.C + p.i * v.n < p.meta ? 'Todavía no llega a la meta.' : 'Se pasó de la meta.'), bien: (v, p) => `${v.n} veces ${p.i} y lo que había: ${p.meta}.`,
  });
  // Primer periodo en que el compuesto alcanza la meta.  params { C, r (%), meta, max }
  const saldo = (p, n) => p.C * (1 + p.r / 100) ** n, primero = p => { let n = 0; while (saldo(p, n) < p.meta) n++; return n; };
  XG.figura('plazo-compuesto', {
    ini: () => ({ n: 0 }), alto: () => 220, ms: 1200, pie: 'Mueve los años.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'años' }],
    ok: (v, p) => v.n === primero(p), sol: p => ({ n: primero(p) }), texto: p => `${primero(p)} años`,
    dib(v, K, p, f) {
      const n = Math.round(v.n), hi = Math.max(p.meta, saldo(p, n)) * 1.08, w = Math.min(34, 280 / (n + 1)), y = x => 136 - 110 * x / hi; let h = K.l(20, 136, 320, 136, 'lm');
      for (let i = 0; i <= n; i++) { const t = i ? f : 1, s = i ? saldo(p, i) : p.C; h += K.r(30 + i * w, 136 - (136 - y(s)) * (i ? Math.max(t, 0.06) : 1), w - 5, (136 - y(s)) * (i ? Math.max(t, 0.06) : 1), i ? 'fg' : 'fa', 2); }
      return h + K.f(f, K.l(20, y(p.meta), 320, y(p.meta), 'la d') + K.t(316, y(p.meta) - 6, p.meta, 's ta', 'end') + K.t(170, 20, `${p.C} · ${R(1 + p.r / 100)}^${n} = ${R(saldo(p, n))}`.replace(/\^(\d+)/, (_, d) => [...d].map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')), 'b')) + K.t(30 + w / 2, 152, 'hoy', 's tm');
    },
    aviso: (v, p) => (saldo(p, v.n) < p.meta ? 'Con esos años todavía no llega.' : 'Llega, pero había llegado antes.'), bien: (v, p) => `Ese es el primer año en que alcanza ${p.meta}.`,
  });
  XG.renglones('simple-o-compuesto', { w: 110, x: 274 });
  XG.renglones('tabla-ahorro', { w: 84, x: 266 });
  XG.renglones('traduce-tasa', { w: 76, x: 278 });
  XG.frases('da-el-saldo');
  XG.ascensor('sube-interes', 100, 2, neutro);

  // ---------------------------------------------------------------------------------------------- IVA, descuentos y cuotas
  // Precio antes del impuesto.  params { final, iva, min, max, paso }
  XG.figura('antes-del-iva', {
    ini: p => ({ x: p.min }), alto: () => 180, ms: 900, pie: 'Mueve el precio sin IVA.', manijas: p => [{ k: 'x', min: p.min, max: p.max, paso: p.paso, et: 'precio sin IVA' }],
    ok: (v, p) => Math.abs(v.x * (1 + p.iva / 100) - p.final) < 1e-6, sol: p => ({ x: R(p.final / (1 + p.iva / 100)) }), texto: p => `${R(p.final / (1 + p.iva / 100))}`,
    dib(v, K, p, f) { const u = 230 / (p.max * (1 + p.iva / 100)), w = v.x * u, t = w * p.iva / 100; return K.r(30, 24, w, 44, 'fa', 3) + K.t(30 + w / 2, 51, K.sig(v.x), 'b') + K.r(30 + w, 24, t, 44, 'ff', 3) + K.t(34 + w + t, 51, `+ ${p.iva} %`, 's tm', 'start') + K.f(f, K.t(170, 96, `${R(v.x)} + ${R(v.x * p.iva / 100)} = ${R(v.x * (1 + p.iva / 100))}`, 'b')); },
    aviso: (v, p) => (v.x * (1 + p.iva / 100) < p.final ? 'Con ese precio, el total queda por debajo.' : 'Con ese precio, el total se pasa.'), bien: (v, p) => `${v.x} por ${R(1 + p.iva / 100)} da ${p.final}.`,
  });
  // Un solo descuento que equivale a dos seguidos.  params { a, b, max }
  const unico = p => R(100 - (100 - p.a) * (100 - p.b) / 100);
  XG.figura('un-solo-descuento', {
    ini: () => ({ d: 0 }), alto: () => 210, ms: 1000, pie: 'Mueve el descuento único.', manijas: p => [{ k: 'd', min: 0, max: p.max, paso: 1, et: 'descuento único (%)' }],
    ok: (v, p) => v.d === unico(p), sol: p => ({ d: unico(p) }), texto: p => `${unico(p)} %`,
    dib(v, K, p, f) { const u = 2.4, x = 50, q1 = 100 - p.a, q2 = 100 - unico(p); return K.r(x, 20, 240, 36, 'fc', 3) + K.r(x, 20, (100 - v.d) * u, 36, 'fa', 3) + K.t(x, 14, 'uno solo', 's tm', 'start') + K.t(x, 78, `${p.a} % y después ${p.b} %`, 's tm', 'start') + K.r(x, 84, 240, 36, 'fc', 3) + K.f(f, K.r(x, 84, q1 * u, 36, 'ff', 3) + K.r(x, 84, q2 * u, 36, 'fg', 3) + K.t(x + q2 * u / 2, 107, `queda ${q2} %`, 's')); },
    aviso: (v, p) => (v.d === p.a + p.b ? 'El segundo descuento se hace sobre lo que quedó, no sobre el precio inicial.' : v.d < unico(p) ? 'Ese descuento deja pagando más que los dos.' : 'Ese descuento deja pagando menos que los dos.'), bien: (v, p) => `Queda el ${100 - v.d} %: ${R(1 - p.a / 100)} · ${R(1 - p.b / 100)}.`,
  });
  // Cuántas cuotas.  params { total, ini, cuota, max }
  XG.figura('cuotas-justas', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el número de cuotas.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'cuotas' }],
    ok: (v, p) => p.ini + v.n * p.cuota === p.total, sol: p => ({ n: (p.total - p.ini) / p.cuota }), texto: p => `${(p.total - p.ini) / p.cuota} cuotas`,
    dib(v, K, p, f) { const w = 220 / p.max, n = Math.round(v.n); return K.r(20, 30, 70, 48, 'ff', 4) + K.t(55, 60, p.ini, 'b') + Array.from({ length: n }, (_, i) => K.r(92 + i * w, 30, Math.max(2, w - 2), 48, 'fa', 2)).join('') + K.f(f, K.t(170, 102, `${p.ini} + ${n} · ${p.cuota} = ${p.ini + n * p.cuota}`, 'b')); },
    aviso: (v, p) => (p.ini + v.n * p.cuota < p.total ? 'Con esas cuotas falta por pagar.' : 'Con esas cuotas se paga de más.'), bien: (v, p) => `${p.ini} y ${v.n} de ${p.cuota} completan ${p.total}.`,
  });
  XG.renglones('recibo-pago', { w: 84, x: 266 });
  XG.renglones('cuota-partes', { w: 84, x: 266 });
  XG.frases('oferta-mejor');
  XG.ascensor('sube-cuota', 100, 2, neutro);
})();
