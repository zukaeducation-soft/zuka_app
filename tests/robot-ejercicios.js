// Robot de los ejercicios con escenas (spec 2026-11-24-ejercicios-explora). Se carga en la página (fetch + eval) y resuelve con
// el dedo el ejercicio `i` de pu-cm-1 (o de otra lección: __ej.leccion('pu-cm-2')):  await __ej.abre(i); await __ej.juega(i, bien = true); await __ej.comprueba()
// `await __ej.todos()` los recorre (mal y bien) y devuelve qué calificó la app.
(() => {
  const C = COURSES.find(c => c.id === 'preuda'), busca = id => C.units.flatMap(u => u.lessons).find(l => l.id === id);
  let L = busca('pu-cm-1');
  const esp = ms => new Promise(r => setTimeout(r, ms));
  const $$ = q => document.querySelector('.xg ' + q);
  const ev = (el, t, x, y) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, cancelable: true, pointerId: 7, clientX: x, clientY: y, isPrimary: true }));
  const cen = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  async function arrastra(el, x, y) {
    const [a, b] = cen(el);
    ev(el, 'pointerdown', a, b);
    for (let k = 1; k <= 8; k++) { ev(el, 'pointermove', a + (x - a) * k / 8, b + (y - b) * k / 8); await esp(8); }
    ev(el, 'pointerup', x, y); await esp(80);
  }
  const enRecta = (svg, v, p) => { const r = svg.getBoundingClientRect(); return [r.left + (24 + (v - p.min) / (p.max - p.min) * 292) * r.width / 340, r.top + r.height * 0.7]; };
  const enRiel = (svg, v, lo, hi) => { const r = svg.getBoundingClientRect(); return [r.left + (34 + (v - lo) / (hi - lo) * 272) * r.width / 340, r.top + r.height * 34 / 60]; };
  const M = {
    async 'recta-muda'(p, s) { for (let i = 0; i < p.fichas.length; i++) { await arrastra($$(`[data-i="${i}"]`), ...enRecta($$('.xg-lona svg'), s.en[i] + 1, p)); await arrastra($$(`[data-i="${i}"]`), ...enRecta($$('.xg-lona svg'), s.en[i], p)); } },
    async 'dos-radares'(p, s) { const g = $$('.xg-lona svg'); await arrastra(g, ...enRecta(g, s.v, p)); },
    async 'arma-viaje'(p, s) { for (let k = 0; k < 2; k++) await arrastra($$(`.xp-chip[data-i="${s.en[k]}"]`), ...cen($$(`.xp-slot[data-k="${k}"]`))); },
    async 'taller-saltos'(p, s) { const [a, b] = document.querySelectorAll('.xg-per svg'); await arrastra(a, ...enRiel(a, s.a, -p.tope, p.tope)); await arrastra(b, ...enRiel(b, s.b, -p.tope, p.tope)); },
    async 'signos-condiciones'(p, s) { s.neg.forEach((n, i) => n && $$(`.xp-f[data-i="${i}"]`).click()); },
    async 'potencia-signo'(p, s) { if (s.fuera) $$('[data-k="fuera"]').click(); $$('[data-k="dentro"]').click(); const g = $$('.xg-per svg'); await arrastra(g, ...enRiel(g, s.e, 1, p.max)); },
    async 'parentesis-justo'(p, s) {
      const ex = $$('.xg-sel'), [x, y] = cen($$(`[data-n="${s.a}"]`));
      ev(ex, 'pointerdown', x, y); await esp(30);
      const [u, v] = cen($$(`[data-n="${s.b}"]`)); ev(ex, 'pointermove', u, v); await esp(30); ev(ex, 'pointerup', u, v);
    },
    async 'lanza-ficha'(p, s) {
      for (const k of s.tiros) { const g = $$('.xg-per svg'); await arrastra(g, ...enRiel(g, k, -p.tope, p.tope)); await esp(5200); }
    },
  };
  const perillas = async (xs) => { const g = [...document.querySelectorAll('.xg-per svg')]; for (let k = 0; k < xs.length; k++) await arrastra(g[k], ...enRiel(g[k], ...xs[k])); };
  const enSvg = (svg, x, y) => { const r = svg.getBoundingClientRect(), v = svg.viewBox.baseVal; return [r.left + x * r.width / v.width, r.top + y * r.height / v.height]; };
  const dedoSvg = async (svg, a, b) => { ev(svg, 'pointerdown', ...a); for (let k = 1; k <= 6; k++) { ev(svg, 'pointermove', a[0] + (b[0] - a[0]) * k / 6, a[1] + (b[1] - a[1]) * k / 6); await esp(8); } ev(svg, 'pointerup', ...b); await esp(40); };
  const ND = async (p, s) => perillas([[s.n, 0, p.max], [s.d, 1, p.max]]);
  Object.assign(M, {
    async 'corta-iguales'(p, s) {
      const svg = $$('.xg-lona svg'), X = v => 20 + v / p.ticks * 300;
      for (let vuelta = 0; vuelta < 2; vuelta++) for (let i = s.c.length - 1; i >= 0; i--) { const v = +svg.querySelector(`[data-c="${i}"]`).getAttribute('aria-valuenow'); await dedoSvg(svg, enSvg(svg, X(v), 26), enSvg(svg, X(s.c[i]), 26)); }
      for (let i = 0; i < p.n; i++) if (s.t[i]) { const e = svg.querySelector(`[data-p="${i}"]`); ev(e, 'pointerdown', ...cen(e)); ev(e, 'pointerup', ...cen(e)); }
    },
    'fraccion-gemela': ND, 'entre-fracciones': ND, 'resta-falta': ND,
    async 'piezas-exactas'(p, s) { for (let k = 0; k < p.k; k++) await arrastra($$(`.xp-chip[data-i="${s.en[k]}"]`), ...cen($$(`.xp-slot[data-k="${k}"]`))); },
    async 'parte-de-parte'(p, s) { const svg = $$('.xg-lona svg'), x0 = (340 - p.cols * 40) / 2; await dedoSvg(svg, enSvg(svg, x0 + 30, 30), enSvg(svg, x0 + s.w * 40, 6 + s.h * 40)); },
    async 'total-escondido'(p, s) { await perillas([[s.parte, 1, 12], [s.n, 1, 10]]); },
    'lanza-fraccion': (p, s) => M['lanza-ficha'](p, s),
  });
  const MAL = {
    'corta-iguales': { c: [3, 5, 11, 16], t: [true, true, true, false, false] }, 'fraccion-gemela': { n: 9, d: 12 }, 'entre-fracciones': { n: 3, d: 4 }, 'piezas-exactas': { en: [0, 1, 2] },
    'resta-falta': { n: 6, d: 6 }, 'parte-de-parte': { w: 4, h: 2 }, 'total-escondido': { parte: 7, n: 3 }, 'lanza-fraccion': { tiros: [-3, -2] },
    'recta-muda': { en: [7, 5, -4, -3] }, 'dos-radares': { v: -7 }, 'arma-viaje': { en: [0, 4] }, 'taller-saltos': { a: 3, b: -5 },
    'signos-condiciones': { neg: [false, true, true, false] }, 'potencia-signo': { fuera: false, e: 4 }, 'parentesis-justo': { a: 0, b: 1 }, 'lanza-ficha': { tiros: [-9, -9] },
  };
  const api = {
    leccion(id) { L = busca(id); },
    async abre(i) { startLesson(C, { ...L, ex: [L.ex[i]], more: [] }); document.querySelector('.clip-skip')?.click(); await esp(900); },
    async juega(i, bien = true) {
      const e = L.ex[i], p = e.params;
      await M[e.game](p, !bien ? MAL[e.game] : e.game.startsWith('lanza-') ? { tiros: p.tiros.map(t => t.d) } : GAMES[e.game].solve(p));
      await esp(150);
      return !document.querySelector('.lesson-foot .btn').disabled;
    },
    async comprueba() { document.querySelector('.lesson-foot .btn').click(); await esp(200); return document.querySelector('.feedback').className.includes(' ok'); },
    async todos(ancho) {
      const out = [];
      for (let i = 0; i < 8; i++) for (const bien of [false, true]) {
        await api.abre(i);
        const cuerpo = document.querySelector('.lesson-body'), sobra = cuerpo.scrollHeight - cuerpo.clientHeight;
        const listo = await api.juega(i, bien), ok = listo && await api.comprueba();
        out.push(`${L.ex[i].game} ${bien ? 'bien' : 'mal'}: listo ${listo}, ok ${ok}${ok === bien && listo ? '' : ' ← MAL'}${sobra > 0 ? ` · sobra ${sobra}px` : ''}`);
        await esp(300);
      }
      return out;
    },
  };
  window.__ej = api;
})();
