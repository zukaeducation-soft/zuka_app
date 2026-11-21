// Robot para probar en el navegador los juegos del kit LEC (Comprensión lectora). No es una prueba de Node: se carga en la página
// con fetch + eval. Monta un ejercicio de una lección a pantalla completa y lo juega arrastrando con eventos de puntero, como un
// dedo (no toca el estado por dentro).
//   __lec.mount(lección, juego, tema)   → monta el ejercicio (tema 'light' o 'dark')
//   await __lec.drag(ficha, zona)       → arrastra una ficha a una zona
//   await __lec.solve()                 → pone cada ficha en su zona de la clave, ronda por ronda; { ready, ok }
//   __lec.check()                       → califica y bloquea (verde o rojo), como «Comprobar»
(() => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const host = () => document.getElementById('bot-host');
  window.__lec = {
    find(lid, game) {
      const l = COURSES.find(c => c.id === 'preuda').units.flatMap(u => u.lessons).find(x => x.id === lid);
      return l.ex.find(e => e.game === game);
    },
    mount(lid, game, theme = 'dark') {
      S.tourDone = true; S.theme = theme; applyTheme(); setGameCourse('preuda');
      window.__inst?.destroy(); host()?.remove();
      const h = document.createElement('div');
      h.id = 'bot-host'; h.className = 'play';
      h.style.cssText = 'position:fixed;inset:0;overflow:auto;z-index:99999;background:var(--bg)';
      document.body.appendChild(h);
      this.ex = this.find(lid, game); this.game = game; this.st = { ready: false };
      window.__inst = GAMES[game].create(h, this.ex.params, { ready: v => { this.st.ready = v; }, sfx: {}, palette: PALETTE });
      return this.ex.q;
    },
    async drag(c, zi) {
      const h = host();
      const ch = h.querySelector(`.lec-pool .lec-chip[data-c="${c}"]`) || h.querySelector(`.lec-chip[data-c="${c}"]`);
      ch.scrollIntoView({ block: 'center' }); await wait(30);
      const a = ch.getBoundingClientRect(), x0 = a.left + Math.min(20, a.width / 2), y0 = a.top + Math.min(12, a.height / 2);
      const P = (t, x, y) => ch.dispatchEvent(new PointerEvent(t, { clientX: x, clientY: y, bubbles: true, pointerId: 7, button: 0, isPrimary: true }));
      P('pointerdown', x0, y0);
      P('pointermove', x0 + 10, y0 + 10);
      const z = h.querySelector(`.lec-zone[data-zi="${zi}"]`);
      const r0 = z.getBoundingClientRect();
      if (r0.top < 0 || r0.bottom > innerHeight) { z.scrollIntoView({ block: 'center' }); await wait(30); }
      const zr = z.getClientRects()[0], x1 = zr.left + Math.min(30, zr.width / 2), y1 = zr.top + Math.min(12, zr.height / 2);
      for (let k = 1; k <= 6; k++) P('pointermove', x0 + (x1 - x0) * k / 6, y0 + (y1 - y0) * k / 6);
      P('pointerup', x1, y1);
      await wait(30);
      return __inst.getState();
    },
    async solve() {
      const pk = __inst.peek();
      for (let r = 0; r < pk.solve.length; r++) {
        if (r > 0) host().querySelector(`.lec-tab[data-tab="${r}"]`).click();
        for (let c = 0; c < pk.solve[r].length; c++) if (pk.solve[r][c] >= 0) await this.drag(c, pk.solve[r][c]);
      }
      return { ready: this.st.ready, ok: GAMES[this.game].grade(__inst.getState(), this.ex.params).ok };
    },
    check() {
      const g = GAMES[this.game].grade(__inst.getState(), this.ex.params);
      __inst.lock(g.ok);
      return g;
    },
  };
})();
