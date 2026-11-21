// Robot para probar en el navegador los seis juegos en movimiento del kit MV (spec 2026-11-20-preuda-movimiento). No es una
// prueba de Node: se carga en la página con fetch + eval. A diferencia de robot-trig.js, estos juegos se juegan arrastrando:
// peek().solve es un trazo (lista de puntos) que el robot recorre con el botón apretado; si el reto pide dos trazos (la
// aguja y luego el tren), vuelve a mirar peek() y hace el siguiente. Primero falla a propósito (peek().wrongPath).
//   await __mov.run(tema, ancho)        → __mov.res = [{ id, game, solved, missed, ready, ok, notes }]
//   await __mov.shot(juego, tema, ancho, retos) → deja el juego a la vista con `retos` retos resueltos
(() => {
  const ch = new MessageChannel(); let q = [], last = 0, id = 0, waiters = [];
  ch.port1.onmessage = () => {
    const now = performance.now();
    if (q.length && now - last >= 12) { last = now; const f = q; q = []; f.forEach(g => { try { g.cb(now); } catch (e) { window.__err = String(e.stack || e); } }); }
    const w = waiters; waiters = []; w.forEach(x => (now >= x.t ? x.r() : waiters.push(x)));
    if (q.length || waiters.length) ch.port2.postMessage(0);
  };
  window.requestAnimationFrame = cb => { q.push({ cb, id: ++id }); ch.port2.postMessage(0); return id; };
  window.cancelAnimationFrame = i => { q = q.filter(x => x.id !== i); };
  const sleep = ms => new Promise(r => { waiters.push({ t: performance.now() + ms, r }); ch.port2.postMessage(0); });
  const NEW = ['barco-muelle', 'aro-lanza', 'canica-tablero', 'tren-aguja', 'grua-carga', 'rueda-cabinas'];
  const uses = () => COURSES.find(c => c.id === 'preuda').units.flatMap(u => u.lessons).flatMap(l => l.ex.filter(e => NEW.includes(e.game)).map(ex => ({ id: l.id, ex })));

  async function mount(ex, theme, width = 340) {
    window.__err = null;
    if (theme) { S.tourDone = true; S.theme = theme; applyTheme(); }
    setGameCourse('preuda');
    window.__inst?.destroy(); document.getElementById('bot-host')?.remove();
    const host = document.createElement('div');
    host.id = 'bot-host'; host.className = 'play';
    host.style.cssText = `position:fixed;left:0;top:0;width:${width}px;z-index:99999;background:var(--play-bg, #07080f)`;
    document.body.appendChild(host);
    const st = { ready: false }, inst = GAMES[ex.game].create(host, ex.params, { ready: v => { st.ready = v; }, sfx: {}, palette: PALETTE, tex: s => s });
    window.__inst = inst; await inst.loaded; await sleep(250);
    const cv = host.querySelector('canvas');
    const ev = (type, x, y) => { const r = cv.getBoundingClientRect(); window.dispatchEvent(new MouseEvent(type, { clientX: r.left + x, clientY: r.top + y, bubbles: true, button: 0, buttons: type === 'mouseup' ? 0 : 1 })); };
    const tap = async (x, y) => { ev('mousedown', x, y); await sleep(20); ev('mouseup', x, y); await sleep(20); };
    // Recorre un trazo con el botón apretado, de a pocos píxeles; `until(s)` decide cuándo soltar (la canica).
    const stroke = async (pts, until) => {
      ev('mousedown', pts[0].x, pts[0].y); await sleep(40);
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 6));
        for (let k = 1; k <= n; k++) { ev('mousemove', a.x + (b.x - a.x) * k / n, a.y + (b.y - a.y) * k / n); await sleep(18); }
      }
      const t0 = performance.now(), end = pts.at(-1);
      if (until) while (!until() && performance.now() - t0 < 8000) { ev('mousemove', end.x, end.y); await sleep(12); }
      else await sleep(160);
      ev('mouseup', end.x, end.y); await sleep(30);
    };
    return { inst, st, tap, stroke };
  }
  const key = s => `${s.cur}|${s.done.join()}|${s.lives}|${s.phase}`;
  // Espera a que el reto se califique (o a que no pase nada en 7 s: el aro cayó en el pasto, la caja al suelo).
  async function settle(inst, before) {
    const t0 = performance.now();
    while (performance.now() - t0 < 7000) { const s = inst.peek(); if (s.wait > 0 || key(s) !== before) return s; await sleep(50); }
    return inst.peek();
  }
  async function attempt(inst, stroke, wrong) {
    for (let n = 0; n < 4; n++) {
      const s = inst.peek();
      if (s.phase !== 'play' || s.wait > 0 || !s.solve) return;
      const before = key(s), pts = wrong ? s.wrongPath : s.solve, target = wrong ? s.wrongTarget : s.target;
      await stroke(pts, s.until ? () => s.until(target) : null);
      const a = await settle(inst, before);
      if (a.wait > 0 || key(a) !== before) return;
    }
  }
  async function play(ex, theme, width, stop = Infinity, fail = true) {
    const { inst, st, tap, stroke } = await mount(ex, theme, width), t0 = performance.now();
    let solved = 0, missed = 0, tried = !fail; const notes = [];
    while (!st.ready && solved < stop && performance.now() - t0 < 90000 && !window.__err) {
      const s = inst.peek();
      if (s.phase !== 'play') { await tap(s.W / 2, s.H / 2); await sleep(120); continue; }
      if (s.wait > 0 || !s.solve) { await sleep(60); continue; }
      if (!tried) { tried = true; const l = s.lives; await attempt(inst, stroke, true); if (inst.peek().lives === l - 1) missed++; else notes.push('el error no quitó vida'); await sleep(200); continue; }
      const before = s.done.join() + s.cur;
      await attempt(inst, stroke, false);
      const a = inst.peek();
      if (a.wait > 0 || a.done.join() + a.cur !== before || a.phase !== 'play') solved++; else { notes.push(`no resolvió (ronda ${s.cur}, reto ${s.done})`); break; }
      while (inst.peek().wait > 0) await sleep(60);
    }
    return { game: ex.game, solved, missed, ready: st.ready, ok: GAMES[ex.game].grade(inst.getState(), ex.params).ok, notes: notes.join('; '), err: window.__err };
  }
  window.__mov = {
    res: [], busy: false, uses, mount, play, sleep,
    async run(theme = 'dark', width = 340, only) {
      this.busy = true; this.res = [];
      for (const { id, ex } of uses().filter(u => !only || only.includes(u.ex.game))) { try { this.res.push({ id, ...(await play(ex, theme, width)) }); } catch (e) { this.res.push({ id, game: ex.game, thrown: String(e.stack || e) }); } }
      window.__inst?.destroy(); document.getElementById('bot-host')?.remove(); this.busy = false;
      return this.res;
    },
    async shot(game, theme, width = 340, stop = 0, nth = 0) {
      this.busy = true;
      try { const u = uses().filter(q => q.ex.game === game)[nth]; this.last = await play(u.ex, theme, width, stop, false); const s = window.__inst.peek(); if (s.phase !== 'play') { const cv = document.querySelector('#bot-host canvas'), r = cv.getBoundingClientRect(); for (const t of ['mousedown', 'mouseup']) window.dispatchEvent(new MouseEvent(t, { clientX: r.left + s.W / 2, clientY: r.top + s.H / 2, bubbles: true })); await sleep(300); } }
      catch (e) { this.last = { thrown: String(e.stack || e) }; }
      this.busy = false;
    },
  };
})();
