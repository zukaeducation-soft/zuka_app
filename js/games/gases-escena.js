// Ejercicios de «Gases y Disoluciones» y «Electricidad y Magnetismo» (Preicfes; spec 2026-11-25-preicfes-estructura). Armazones en
// figura-kit, conteo-escena y proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100;
  const bolas = (K, x, y, w, h, n) => Array.from({ length: n }, (_, i) => K.c(x + 8 + ((i * 37) % 97) / 97 * (w - 16), y + 8 + ((i * 59) % 83) / 83 * (h - 16), 3.2, 'ff')).join('');
  // Émbolo: presión por volumen no cambia.  params { P, V, P2, max, paso }
  XG.figura('boyle-embolo', {
    ini: p => ({ v: p.V }), alto: () => 186, ms: 1000, pie: 'Mueve el émbolo.', manijas: p => [{ k: 'v', min: p.paso, max: p.max, paso: p.paso, et: 'volumen (L)' }],
    ok: (v, p) => v.v * p.P2 === p.P * p.V, sol: p => ({ v: p.P * p.V / p.P2 }), texto: p => `${N(p.P * p.V / p.P2)} L`,
    dib(v, K, p, f) { const w = 230 * v.v / p.max; return K.r(30, 24, 250, 70, 'fn', 4) + K.r(30, 24, w, 70, 'fa', 2) + bolas(K, 30, 24, Math.max(26, w), 70, 18) + K.r(30 + w, 20, 10, 78, 'fk', 2) + K.f(f, K.t(170, 122, `${p.P2} · ${N(v.v)} = ${N(p.P2 * v.v)}`, 'b')); },
    aviso: (v, p) => (v.v * p.P2 === p.P * p.V ? '' : v.v === p.V * p.P2 / p.P ? 'A más presión, menos volumen: van al contrario.' : v.v * p.P2 > p.P * p.V ? 'Con ese volumen el producto es mayor que antes.' : 'Con ese volumen el producto es menor que antes.'), bien: (v, p) => `${p.P} · ${p.V} = ${p.P2} · ${N(v.v)}.`,
  });
  // Globo: volumen proporcional a la temperatura en kelvin.  params { V, T, T2, max, paso }
  XG.figura('charles-globo', {
    ini: p => ({ v: p.V }), alto: () => 200, ms: 1000, pie: 'Mueve el volumen del globo.', manijas: p => [{ k: 'v', min: p.paso, max: p.max, paso: p.paso, et: 'volumen (L)' }],
    ok: (v, p) => v.v * p.T === p.V * p.T2, sol: p => ({ v: p.V * p.T2 / p.T }), texto: p => `${N(p.V * p.T2 / p.T)} L`,
    dib(v, K, p, f) { const r = x => 46 * Math.cbrt(x / p.max); return K.c(90, 66, r(p.V), 'fc') + K.t(90, 128, `${p.T} K: ${p.V} L`, 's tm') + K.c(240, 66, r(v.v), 'fa') + K.t(240, 128, `${p.T2} K`, 's tm') + K.f(f, K.t(170, 20, `${N(v.v)} ÷ ${p.T2} = ${N(v.v / p.T2 * 1000) / 1000}`, 'b')); },
    aviso: (v, p) => (Math.sign(v.v - p.V) !== Math.sign(p.T2 - p.T) ? 'Si sube la temperatura, el volumen sube; si baja, baja.' : 'La dirección es esa; volumen y kelvin cambian en la misma proporción.'), bien: (v, p) => `${p.V} es a ${p.T} como ${N(v.v)} es a ${p.T2}.`,
  });
  XG.renglones('gas-sube-baja', { w: 96, x: 278 });
  XG.ascensor('sube-gas', 100, 2, neutro);
  // ------------------------------------------------------------------------------------------------------- concentración
  const vaso = (K, x, y, w, h, q, cls) => K.r(x, y, w, h, 'fn', 3) + K.r(x, y + h * (1 - q), w, h * q, cls, 2);
  // Agua total para llegar a una concentración.  params { g, meta (g/L), max, paso }
  XG.figura('concentra-agua', {
    ini: p => ({ l: p.paso }), alto: () => 190, ms: 1000, pie: 'Mueve el volumen de la disolución.', manijas: p => [{ k: 'l', min: p.paso, max: p.max, paso: p.paso, et: 'disolución (L)' }],
    ok: (v, p) => N(v.l * p.meta) === p.g, sol: p => ({ l: N(p.g / p.meta) }), texto: p => `${N(p.g / p.meta)} L`,
    dib(v, K, p, f) { const q = v.l / p.max; return vaso(K, 110, 16, 120, 96, q, 'fa') + Array.from({ length: 16 }, (_, i) => K.c(122 + (i * 43 % 97), 112 - 4 - (i * 29 % 89) / 89 * Math.max(4, 96 * q - 8), 2.6, 'ff')).join('') + K.t(244, 66, `${p.g} g`, 's tm', 'start') + K.f(f, K.t(170, 132, `${p.g} ÷ ${N(v.l)} = ${N(p.g / v.l)} g/L`, 'b')); },
    aviso: (v, p) => (p.g / v.l > p.meta ? 'Así queda más concentrada.' : 'Así queda menos concentrada.'), bien: (v, p) => `${p.g} g en ${v.l} L: ${p.meta} g por litro.`,
  });
  // Agua que se agrega para bajar la concentración.  params { V, C, C2, max, paso }
  XG.figura('diluye-agua', {
    ini: () => ({ a: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve el agua que agregas.', manijas: p => [{ k: 'a', min: 0, max: p.max, paso: p.paso, et: 'agua agregada (L)' }],
    ok: (v, p) => N((p.V + v.a) * p.C2) === N(p.V * p.C), sol: p => ({ a: N(p.V * p.C / p.C2 - p.V) }), texto: p => `${N(p.V * p.C / p.C2 - p.V)} L`,
    dib(v, K, p, f) { const u = 96 / (p.V + p.max); return K.r(120, 14, 100, 96, 'fn', 3) + K.r(120, 110 - p.V * u, 100, p.V * u, 'ff', 0) + K.r(120, 110 - (p.V + v.a) * u, 100, v.a * u, 'fa', 0) + K.t(112, 114 - p.V * u / 2, `${p.V} L`, 's tm', 'end') + K.f(f, K.t(170, 132, `${N(p.V * p.C)} g ÷ ${N(p.V + v.a)} L = ${N(p.V * p.C / (p.V + v.a))} g/L`, 'b')); },
    aviso: (v, p) => (N(v.a) === N(p.V * p.C / p.C2) ? 'Ese es el volumen final: se pide el agua que se agrega.' : (p.V + v.a) * p.C2 < p.V * p.C ? 'Todavía queda muy concentrada.' : 'Quedó demasiado diluida.'), bien: (v, p) => `${N(p.V * p.C)} g en ${N(p.V + v.a)} L.`,
  });
  XG.renglones('concentracion-tabla', { w: 88, x: 276 });
  XG.renglones('mas-o-menos-concentrada', { w: 104, x: 276 });
  // ----------------------------------------------------------------------------------------------------------- circuitos
  const pila = (K, x, y, t) => K.l(x - 10, y, x + 10, y, 'gr') + K.l(x - 5, y + 8, x + 5, y + 8, 'gr') + K.t(x - 16, y + 9, t, 's tm', 'end');
  const res = (K, x, y, t, cls = 'fa') => K.r(x - 22, y - 9, 44, 18, cls, 3) + K.t(x, y + 4, t, 's');
  // Ley de Ohm.  params { V, R, max, paso }
  XG.figura('corriente-resistor', {
    ini: () => ({ i: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve la corriente.', manijas: p => [{ k: 'i', min: 0, max: p.max, paso: p.paso, et: 'corriente (A)' }],
    ok: (v, p) => N(v.i * p.R) === p.V, sol: p => ({ i: N(p.V / p.R) }), texto: p => `${N(p.V / p.R)} A`,
    dib: (v, K, p, f) => K.pl([[80, 56], [80, 20], [260, 20], [260, 100], [80, 100], [80, 64]], 'gr') + pila(K, 80, 56, `${p.V} V`) + res(K, 170, 20, `${p.R} Ω`) + Array.from({ length: 6 }, (_, j) => K.c(100 + j * 30, 100, 2 + 3 * v.i / p.max, 'fg')).join('') + K.f(f, K.t(170, 70, `${N(v.i)} · ${p.R} = ${N(v.i * p.R)} V`, 'b')),
    aviso: (v, p) => (v.i * p.R < p.V ? 'Con esa corriente sobraría voltaje.' : 'Para esa corriente haría falta más voltaje.'), bien: (v, p) => `${v.i} por ${p.R}: ${p.V} V.`,
  });
  // Dos resistencias en serie.  params { V, I, R1, max }
  XG.figura('serie-resistencia', {
    ini: () => ({ r: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve la otra resistencia.', manijas: p => [{ k: 'r', min: 0, max: p.max, paso: 1, et: 'resistencia (Ω)' }],
    ok: (v, p) => p.I * (p.R1 + v.r) === p.V, sol: p => ({ r: p.V / p.I - p.R1 }), texto: p => `${p.V / p.I - p.R1} Ω`,
    dib: (v, K, p, f) => K.pl([[80, 56], [80, 20], [260, 20], [260, 100], [80, 100], [80, 64]], 'gr') + pila(K, 80, 56, `${p.V} V`) + res(K, 132, 20, `${p.R1} Ω`) + res(K, 208, 20, '?', 'ff') + K.t(170, 92, `${p.I} A`, 's tm') + K.f(f, K.t(170, 64, `${p.I} · (${p.R1} + ${N(v.r)}) = ${N(p.I * (p.R1 + v.r))} V`, 's')),
    aviso: (v, p) => (v.r === p.V / p.I ? 'Esa es la resistencia total: falta quitar la que ya está.' : p.I * (p.R1 + v.r) < p.V ? 'Con esa resistencia pasaría más corriente.' : 'Con esa resistencia pasaría menos corriente.'), bien: (v, p) => `${p.R1} + ${v.r} = ${p.V / p.I} Ω en total.`,
  });
  XG.renglones('paralelo-ramas', { w: 84, x: 280 });
  XG.frases('que-prende');
  XG.ascensor('sube-vatios', 100, 2, neutro);
  XG.renglones('atrae-repele', { w: 104, x: 276 });
  XG.renglones('fuerza-cambia', { w: 96, x: 278 });
})();
