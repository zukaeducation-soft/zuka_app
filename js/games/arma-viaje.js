// Arma el viaje (spec 2026-11-24-ejercicios-explora): con dos cartas de sumar o restar se va de `desde` a `meta`. La ficha no
// se mueve hasta comprobar. params = { min, max, desde, meta, cartas: [{ t: '- (-8)', d: 8 }] }   state = { en: [carta | null, …] }
XG.juego('arma-viaje', {
  ini: () => ({ en: [null, null] }),
  listo: s => s.en.every(i => i != null),
  ok: (s, p) => s.en.every(i => i != null) && s.en[0] !== s.en[1] && p.desde + s.en.reduce((t, i) => t + p.cartas[i].d, 0) === p.meta,
  sol(p) {
    for (let i = 0; i < p.cartas.length; i++) for (let j = i + 1; j < p.cartas.length; j++) if (p.desde + p.cartas[i].d + p.cartas[j].d === p.meta) return { en: [i, j] };
    return null;
  },
  texto(p) { const [i, j] = this.solve(p).en; return `$${p.desde} ${p.cartas[i].t} ${p.cartas[j].t} = ${p.meta}$`; },
  monta(stage, p, ui) {
    stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
    const [lona, frase, tray] = stage.children;
    const R = XG.recta(lona, { min: p.min, max: p.max, alto: 142, y: 98 });
    const meta = `<circle class="xp-goal" cx="${R.X(p.meta)}" cy="${R.y}" r="18"/>`;
    R.bajo.innerHTML = meta; R.din.innerHTML = XG.ficha(R.X(p.desde), R.y, p.desde);
    const carta = i => `$${p.cartas[i].t}$`;
    function draw() {
      frase.innerHTML = `<b>${XG.menos(p.desde)}</b>` + ui.s.en.map((i, k) => `<button type="button" class="xp-slot${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? tex(carta(i)) : ''}</button>`).join('') + `<span>=</span><b class="xg-meta">${XG.menos(p.meta)}</b>`;
      tray.innerHTML = p.cartas.map((_, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${tex(carta(i))}</button>`)).join('');
    }
    const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
    XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
      onDrop(el, over) {
        const i = el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k];
        pon(i, over.dataset.k != null ? +over.dataset.k : null);
      },
      onTap(el) {
        if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null);
        const k = ui.s.en.indexOf(null);
        if (k >= 0) pon(+el.dataset.i, k);
      },
    });
    draw(); ui.nota('Elige dos cartas. La ficha caminará cuando compruebes.');
    return ok => {
      const corre = (en, despues) => {
        let t = `${p.desde}`;
        ui.lee(`$${t}$`);
        XG.camina(ui, R, p.desde, en.map(i => p.cartas[i]), { cada: (k, x) => { t += ` ${p.cartas[en[k - 1]].t}`; ui.lee(`$${t} = ${x}$`); }, fin: despues });
      };
      frase.hidden = tray.hidden = true;
      ui.nota('');
      corre(ui.s.en, (x, fuera) => {
        if (ok) return ui.nota('Llegó justo al aro.');
        ui.nota(fuera ? 'Con esas cartas se sale de la recta. Mira las que sí sirven.' : `Con esas cartas llega a ${XG.menos(x)}. Mira las que sí sirven.`);
        ui.espera(1500, () => corre(GAMES['arma-viaje'].solve(p).en, () => XS.merge()));
      });
    };
  },
});
