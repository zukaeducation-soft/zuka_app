// Recta muda (spec 2026-11-24-ejercicios-explora): una recta que solo trae dos números escritos. Se cuelga cada expresión
// donde vive. params = { min, max, rotulos, fichas: [{ t: TeX, v }] }   state = { en: [posición | null] }
XG.juego('recta-muda', {
  ini: p => ({ en: p.fichas.map(() => null) }),
  listo: s => s.en.every(v => v != null),
  ok: (s, p) => p.fichas.every((f, i) => s.en[i] === f.v),
  sol: p => ({ en: p.fichas.map(f => f.v) }),
  texto: p => [...p.fichas].sort((a, b) => a.v - b.v).map(f => `$${f.t} = ${f.v}$`).join(', '),
  monta(stage, p, ui) {
    const W = 340, H = 258, Y = 214;
    stage.innerHTML = '<div class="xg-muda" data-drop><div class="xg-lona"></div></div><div class="xp-tray" data-drop data-tray></div>';
    const lona = stage.querySelector('.xg-lona'), muda = stage.firstChild, tray = stage.lastChild;
    const R = XG.recta(lona, { min: p.min, max: p.max, rotulos: p.rotulos, alto: H, y: Y });
    let estado = null;   // al comprobar: 'bien' o 'mal' por ficha
    const chip = i => {
      const v = ui.s.en[i], cls = estado ? ` ${estado[i]}` : '';
      return `<button type="button" class="xp-chip xg-col${cls}" data-i="${i}" ${v != null ? `aria-describedby="" title="en ${XG.menos(v)}"` : ''}>${tex(`$${p.fichas[i].t}$`)}</button>`;
    };
    // Cuatro alturas para que las fichas cercanas no se encimen.
    const niveles = () => {
      const orden = p.fichas.map((_, i) => i).filter(i => ui.s.en[i] != null).sort((a, b) => ui.s.en[a] - ui.s.en[b]), out = {}, fin = [-999, -999, -999, -999], sep = 80 * W / (lona.clientWidth || 300);
      for (const i of orden) {
        let n = fin.findIndex(x => R.X(ui.s.en[i]) - x > sep);
        if (n < 0) n = fin.indexOf(Math.min(...fin));
        out[i] = n; fin[n] = R.X(ui.s.en[i]);
      }
      return out;
    };
    function draw() {
      const nv = niveles();
      tray.innerHTML = p.fichas.map((_, i) => i).filter(i => ui.s.en[i] == null).map(chip).join('');
      tray.hidden = !tray.children.length && ui.locked;
      muda.querySelectorAll('.xg-col').forEach(e => e.remove());
      let h = '';
      for (const i in nv) {
        const x = R.X(ui.s.en[i]), top = 26 + 50 * (3 - nv[i]);
        const cls = estado ? (estado[i] === 'bien' ? ' good' : ' bad') : '';
        h += `<line class="xg-hilo${cls}" x1="${x}" y1="${top}" x2="${x}" y2="${Y}"/><circle class="xp-anc xg-pin${cls}" cx="${x}" cy="${Y}" r="5"/>`;
        if (ui.locked) h += `<text class="xp-lb-on" x="${x}" y="${Y + 24}">${XG.menos(ui.s.en[i])}</text>`;
        muda.insertAdjacentHTML('beforeend', chip(+i));
        const b = muda.lastElementChild;
        b.style.left = `${XG.clamp(x, 44, W - 44) / W * 100}%`; b.style.top = `${top / H * 100}%`;
      }
      R.din.innerHTML = h;
    }
    const pon = (i, v) => {
      const en = [...ui.s.en], otro = en.indexOf(v);
      if (v != null && otro >= 0 && otro !== i) en[otro] = null;   // en un lugar solo cabe una
      en[i] = v; ui.set({ en }); XS.pop(); xpTick(); draw();
      stage.querySelector(`[data-i="${i}"]`)?.focus({ preventScroll: true });
    };
    let x = 0;
    ui.limpia((f => { window.addEventListener('pointermove', f); window.addEventListener('pointerup', f); return () => { window.removeEventListener('pointermove', f); window.removeEventListener('pointerup', f); }; })(e => {
      x = e.clientX;
      // Mientras se arrastra, se enciende la marca donde caería.
      const r = muda.getBoundingClientRect(), v = XG.clamp(Math.round(R.at(e)), p.min, p.max);
      const va = e.type === 'pointermove' && !ui.locked && stage.querySelector('.lift') && e.clientY > r.top && e.clientY < r.bottom;
      R.bajo.innerHTML = va ? `<line class="xg-hilo" x1="${R.X(v)}" y1="16" x2="${R.X(v)}" y2="${Y}"/><circle class="xp-ring" cx="${R.X(v)}" cy="${Y}" r="11"/>` : '';
    }));
    XG.arrastra(ui, stage, '.xg-col', {
      onDrop(el, over) {
        if (over === tray) return pon(+el.dataset.i, null);
        pon(+el.dataset.i, XG.clamp(Math.round(R.at({ clientX: x, clientY: 0 })), p.min, p.max));
      },
      onTap(el) {
        const i = +el.dataset.i;
        if (ui.s.en[i] != null) return pon(i, null);
        const libre = [0, 1, -1, 2, -2, 3].find(v => !ui.s.en.includes(v));
        pon(i, libre);
      },
    });
    stage.onkeydown = e => {
      const b = e.target.closest('.xg-col'), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!b || !k || ui.locked) return;
      e.preventDefault(); e.stopPropagation();
      const i = +b.dataset.i;
      let v = ui.s.en[i] == null ? 0 : ui.s.en[i] + k;
      while (ui.s.en.some((y, j) => j !== i && y === v)) v += k;
      if (v >= p.min && v <= p.max) pon(i, v);
    };
    draw(); ui.nota('Cada marca es un número entero.');
    return ok => {
      estado = p.fichas.map((f, i) => (ui.s.en[i] === f.v ? 'bien' : 'mal'));
      draw();
      ui.nota(ok ? 'Cada una en su lugar.' : 'Las rojas se van a su lugar.');
      if (!ok) ui.espera(1100, () => { ui.muestra({ en: p.fichas.map(f => f.v) }); estado = estado.map(() => 'bien'); XS.merge(); draw(); });
    };
  },
});
