// Ejercicios de «Reacciones y Cantidades» (Preicfes, icf-cn-reacciones; spec 2026-11-25-preicfes-estructura): átomos que se conservan,
// reactivo límite y pH. Armazones en figura-kit, conteo-escena y proposiciones-escena. La escena no cuenta mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Balancear: un coeficiente por sustancia.  params { izq: [[fórmula, { átomo: n }]], der: […], sol: [coeficientes], max }
  const todas = p => [...p.izq, ...p.der], el = p => [...new Set(todas(p).flatMap(s => Object.keys(s[1])))];
  const cuenta = (v, p, lado, e) => todas(p).reduce((s, [, a], i) => s + ((i < p.izq.length) === (lado === 0) ? (a[e] || 0) * Math.round(v[`c${i}`]) : 0), 0);
  const cuadra = (v, p) => el(p).every(e => cuenta(v, p, 0, e) === cuenta(v, p, 1, e));
  const mcd = (a, b) => (b ? mcd(b, a % b) : a), comun = v => Object.values(v).reduce(mcd);
  XG.figura('balancea-atomos', {
    ini: p => Object.fromEntries(todas(p).map((_, i) => [`c${i}`, 1])), alto: p => 110 + todas(p).length * 44, ms: 1000, pie: 'Mueve cuántas moléculas hay de cada sustancia.',
    manijas: p => todas(p).map((s, i) => ({ k: `c${i}`, min: 1, max: p.max, paso: 1, et: s[0] })),
    ok: (v, p) => cuadra(v, p) && comun(v) === 1, sol: p => Object.fromEntries(p.sol.map((n, i) => [`c${i}`, n])), texto: p => `${p.izq.map((s, i) => (p.sol[i] > 1 ? p.sol[i] + ' ' : '') + s[0]).join(' + ')} → ${p.der.map((s, i) => { const n = p.sol[p.izq.length + i]; return (n > 1 ? n + ' ' : '') + s[0]; }).join(' + ')}`,
    dib(v, K, p, f) {
      const tx = (ss, o) => ss.map((s, i) => { const n = Math.round(v[`c${o + i}`]); return `${n > 1 ? n + ' ' : ''}${s[0]}`; }).join(' + '), E = el(p);
      return K.t(170, 24, `${tx(p.izq, 0)} → ${tx(p.der, p.izq.length)}`, 'b') + K.f(f, E.map((e, i) => { const a = cuenta(v, p, 0, e), b = cuenta(v, p, 1, e), x = 170 + (i - (E.length - 1) / 2) * 100; return K.r(x - 44, 36, 88, 30, a === b ? 'fa' : 'ff', 6) + K.t(x, 56, `${e}: ${a} y ${b}`, 's'); }).join(''));
    },
    aviso(v, p) { const e = el(p).find(x => cuenta(v, p, 0, x) !== cuenta(v, p, 1, x)); return e ? `No cuadra ${e}: hay ${cuenta(v, p, 0, e)} antes y ${cuenta(v, p, 1, e)} después.` : 'Cuadra, pero se puede simplificar.'; }, bien: () => 'Hay los mismos átomos antes y después.',
  });
  // Reactivo límite: cuántos conjuntos se arman.  params { hay: [[nombre, cantidad, pide]], que, max }
  const sale = p => Math.min(...p.hay.map(([, n, k]) => Math.floor(n / k)));
  XG.figura('paquetes-limite', {
    ini: () => ({ n: 0 }), alto: p => 96 + p.hay.length * 42, ms: 1000, pie: 'Mueve cuántos se forman.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.que }],
    ok: (v, p) => v.n === sale(p), sol: p => ({ n: sale(p) }), texto: p => `${sale(p)} ${p.que}`,
    dib(v, K, p, f) { return p.hay.map(([t, n, k], j) => { const u = Math.min(16, 230 / n), y = 26 + j * 42, usa = Math.round(v.n) * k * f; return K.t(14, y - 8, `${t} (${k} por cada uno)`, 's tm', 'start') + Array.from({ length: n }, (_, i) => K.c(22 + i * u, y + 8, u * 0.38, i < usa ? 'ff' : 'fa')).join('') + K.f(f, K.t(326, y + 13, n - Math.round(v.n) * k < 0 ? 'falta' : `sobran ${n - Math.round(v.n) * k}`, 's tm', 'end')); }).join(''); },
    aviso(v, p) { const r = p.hay.find(([, n, k]) => v.n * k > n); return r ? `No alcanza ${r[0]}.` : 'Alcanza, pero todavía se puede formar otro.'; }, bien(v, p) { const r = p.hay.find(([, n, k]) => Math.floor(n / k) === v.n); return `Se acaba primero ${r[0]}.`; },
  });
  // Escala de pH.  params { base, k (pasos con signo: negativo, más ácida), et }
  XG.figura('nivel-ph', {
    ini: p => ({ h: p.base }), alto: () => 180, ms: 900, pie: 'Mueve la muestra B.', manijas: () => [{ k: 'h', min: 0, max: 14, paso: 1, et: 'pH de B' }],
    ok: (v, p) => v.h === p.base + p.k, sol: p => ({ h: p.base + p.k }), texto: p => `pH ${p.base + p.k}`,
    dib(v, K, p, f) { const x = q => 30 + q * 20, h = v.h; return Array.from({ length: 15 }, (_, i) => K.r(x(i) - 9, 50, 18, 26, i < 7 ? 'ff' : i > 7 ? 'fg' : 'fc', 2) + K.t(x(i), 68, i, 's')).join('') + K.t(x(p.base), 24, 'A', 'b ta') + K.l(x(p.base), 30, x(p.base), 48, 'la') + K.c(x(h), 90, 6, 'fF') + K.f(f, K.t(170, 118, `${Math.abs(h - p.base)} pasos: ${h === p.base ? 'igual' : `10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[Math.min(9, Math.abs(Math.round(h - p.base)))]} veces más ${h < p.base ? 'ácida' : 'básica'}`}`, 'b')); },
    aviso: (v, p) => (Math.sign(v.h - p.base) !== Math.sign(p.k) ? 'Ese lado es el contrario: mira hacia dónde es más ácido.' : 'El lado es ese; cada paso de pH es por 10.'), bien: (v, p) => `${Math.abs(p.k)} pasos de pH: por 10 en cada paso.`,
  });
  XG.frases('conserva-atomos');
  XG.renglones('masa-cerrada', { w: 84, x: 270 });
  XG.renglones('relacion-moles', { w: 64, x: 280 });
  XG.ascensor('sube-moles', 100, 2, neutro);
})();
