// Robot de los ejercicios con escenas (spec 2026-11-24-ejercicios-explora). Se carga en la página (fetch + eval) y resuelve con
// el dedo el ejercicio `i` de pu-cm-1:  await __ej.abre(i); await __ej.juega(i, bien = true); await __ej.comprueba()
// `await __ej.todos()` los recorre (mal y bien) y devuelve qué calificó la app.
(() => {
  const C = COURSES.find(c => c.id === 'preuda'), L = C.units.flatMap(u => u.lessons).find(l => l.id === 'pu-cm-1');
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
  const MAL = {
    'recta-muda': { en: [7, 5, -4, -3] }, 'dos-radares': { v: -7 }, 'arma-viaje': { en: [0, 4] }, 'taller-saltos': { a: 3, b: -5 },
    'signos-condiciones': { neg: [false, true, true, false] }, 'potencia-signo': { fuera: false, e: 4 }, 'parentesis-justo': { a: 0, b: 1 }, 'lanza-ficha': { tiros: [-9, -9] },
  };
  const api = {
    async abre(i) { startLesson(C, { ...L, ex: [L.ex[i]], more: [] }); document.querySelector('.clip-skip')?.click(); await esp(900); },
    async juega(i, bien = true) {
      const e = L.ex[i], p = e.params;
      await M[e.game](p, !bien ? MAL[e.game] : e.game === 'lanza-ficha' ? { tiros: p.tiros.map(t => t.d) } : GAMES[e.game].solve(p));
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
