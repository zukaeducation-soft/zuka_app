// Robot de los ejercicios de lectura sobre la hoja (spec 2026-11-24-lectura-explora). Se carga en la página (fetch + eval):
//   __hoja.abre('pu-el-1', 0)   abre solo ese ejercicio     await __hoja.juega(true | false)   lo resuelve (bien o con un error)
//   await __hoja.todos('pu-el-1')   los recorre mal y bien y devuelve qué calificó la app y qué se sale de la pantalla
(() => {
  const C = COURSES.find(c => c.id === 'preuda'), L = id => C.units.flatMap(u => u.lessons).find(l => l.id === id);
  const esp = ms => new Promise(r => setTimeout(r, ms)), $ = q => document.querySelector(`.xg ${q}`);
  let e = null;
  const ev = (el, t, x, y) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, cancelable: true, pointerId: 5, pointerType: 'mouse', clientX: x, clientY: y, isPrimary: true }));
  const cen = el => { const r = (el.getClientRects()[0] || el.getBoundingClientRect()); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const veo = async el => { el.scrollIntoView({ block: 'center' }); await esp(60); };
  async function arrastra(a, b) {
    await veo(b);
    const p = cen(a), q = cen(b);
    ev(a, 'pointerdown', ...p);
    for (let k = 1; k <= 5; k++) { ev(a, 'pointermove', p[0] + (q[0] - p[0]) * k / 5, p[1] + (q[1] - p[1]) * k / 5); await esp(6); }
    ev(a, 'pointerup', ...q); await esp(90);
  }
  async function abre(id, i) {
    window.XS && (XS.voz = () => null);
    const l = L(id); e = l.ex[i];
    document.getElementById('landing')?.remove?.();
    document.querySelectorAll('.guide-ov, .exq-ghost').forEach(x => x.remove());
    S.guides = { ...S.guides, [e.game]: 1 }; S.unlockAll = true;
    startLesson(C, { ...l, clip: { scenes: l.clip.scenes }, ex: [e], more: [] });
    await esp(500); document.querySelector('.clip-skip')?.click(); await esp(900); document.getElementById('overlay').inert = false;
    return e.game;
  }
  // `toque`: ficha y luego sitio, en vez de arrastrar.
  async function juega(bien = true, toque = false) {
    const g = GAMES[e.game], p = e.params, s = g.solve(p);
    if (g.tipo === 'zonas') {
      const en = [...s.en]; if (!bien) { const a = en.findIndex(x => x >= 0), b = en.findIndex((x, i) => i !== a && x >= 0 && x !== en[a]); [en[a], en[b]] = [en[b], en[a]]; }
      for (let f = 0; f < en.length; f++) if (en[f] >= 0) {
        const z = () => $(`[data-drop="${en[f]}"] > .hj-dentro`);
        if (toque) { $(`[data-f="${f}"]`).click(); await esp(40); $(`[data-drop="${en[f]}"]`).click(); await esp(60); } else await arrastra($(`[data-f="${f}"]`), z());
      }
    } else if (g.tipo === 'hilos') {
      const a = s.a.map((x, i) => (!bien && i === 0 ? (x + 1) % g.destinos(p) : x));
      for (let k = 0; k < a.length; k++) { if (toque) { $(`[data-o="${k}"]`).click(); await esp(30); $(`[data-t="${a[k]}"]`).click(); await esp(60); } else await arrastra($(`[data-o="${k}"]`), $(`[data-t="${a[k]}"]`)); }
    } else if (g.tipo === 'toca') {
      const m = [...s.m]; if (!bien) m[0] = [...g.claves(p)].find(k => !m.includes(k));
      for (const k of m) { $(`.hj-t[data-k="${k}"]`).click(); await esp(60); }
    } else if (g.tipo === 'pinta') {
      const c = s.c.map((k, i) => (!bien && !i ? (k + 1) % p.plumas.length : k));
      for (let i = 0; i < c.length; i++) { if (toque) { $(`[data-f="${c[i]}"]`).click(); await esp(30); $(`[data-l="${i}"]`).click(); await esp(50); } else await arrastra($(`[data-f="${c[i]}"]`), $(`[data-l="${i}"]`)); }
    } else if (g.tipo === 'ordena') {
      for (let n = p.fija || 0; n < p.ini.length; n++) {
        const i = !bien && n >= p.ini.length - 2 ? 2 * p.ini.length - 3 - n : n, li = $(`.hj-tira[data-i="${i}"] .hj-asa`);
        for (let k = 0; k < 9 && [...document.querySelectorAll('.hj-tira')].findIndex(x => +x.dataset.i === i) > n; k++) { li.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true })); await esp(20); }
      }
    } else {   // perillas
      const v = bien ? s : { ...s, q: 16 }, campos = g.campos(p), svgs = [...document.querySelectorAll('.xg-per svg')];
      campos.forEach((c, i) => { for (let k = c.ini; k < v[c.k]; k++) svgs[i].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })); });
    }
    await esp(150);
    const b = document.querySelector('.lesson-foot .btn.main'), listo = !b.disabled;
    b.click(); await esp(500);
    const f = document.querySelector('.feedback.show');
    return `${listo ? '' : 'NO LISTO '}${f ? (f.classList.contains('ok') ? 'ok' : 'mal') : 'sin aviso'}`;
  }
  function fuera() {   // lo que se sale a los lados o no se lee
    const out = [], W = innerWidth;
    document.querySelectorAll('.xg *').forEach(x => { const r = x.getBoundingClientRect(); if (r.width && (r.left < -1 || r.right > W + 1) && !x.closest('.hj-band') && !x.closest('svg')) out.push(x.className || x.tagName); });
    document.querySelectorAll('.xg .hj-f, .xg .hj-o, .xg .hj-portada, .xg .hj-techo').forEach(x => { if (x.scrollWidth > x.clientWidth + 2) out.push(`corta ${x.textContent.slice(0, 20)}`); });
    return [...new Set(out)].join(',');
  }
  async function todos(id, toque) {
    const log = [];
    for (let i = 0; i < L(id).ex.length; i++) for (const bien of [false, true]) {
      const g = await abre(id, i), antes = fuera(), alto = document.querySelector('.lesson-body').scrollHeight - document.querySelector('.lesson-body').clientHeight;
      const r = await juega(bien, toque);
      log.push(`${i} ${g} ${bien ? 'bien' : 'mal'} → ${r}${r === (bien ? 'ok' : 'mal') ? '' : '  <<<<'}${antes ? ` FUERA ${antes}` : ''}${bien ? '' : ` rueda ${alto}`}`);
    }
    return log;
  }
  window.__hoja = { abre, juega, todos, fuera };
})();
