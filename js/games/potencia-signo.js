// Potencia con signo (spec 2026-11-24-ejercicios-explora): se arma ±(±b)^e para que valga `meta` llevando un menos adentro del
// paréntesis. El valor no se ve hasta comprobar. params = { base, max, meta }   state = { fuera, dentro, e, tocado }
XG.juego('potencia-signo', {
  ini: () => ({ fuera: false, dentro: false, e: 1 }),
  valor: (s, p) => (s.fuera ? -1 : 1) * (s.dentro ? -p.base : p.base) ** s.e,
  listo: s => !!s.dentro,
  ok: (s, p) => !!s.dentro && (s.fuera ? -1 : 1) * (-p.base) ** s.e === p.meta,
  sol(p) { for (let e = 1; e <= p.max; e++) for (const fuera of [false, true]) if ((fuera ? -1 : 1) * (-p.base) ** e === p.meta) return { fuera, dentro: true, e }; return null; },
  texto(p) { const s = this.solve(p); return `$${s.fuera ? '-' : ''}(-${p.base})^{${s.e}} = ${p.meta}$`; },
  monta(stage, p, ui) {
    const G = GAMES['potencia-signo'];
    stage.innerHTML = '<div class="xg-pot"></div><div class="xg-cadena"></div><div class="xg-perillas"></div>';
    const [pot, cad, per] = stage.children;
    const draw = () => {
      const s = ui.s, sw = (k, on, et) => `<button type="button" class="xg-sw${on ? ' on' : ''}" data-k="${k}" aria-pressed="${on}" aria-label="${et}">−</button>`;
      pot.innerHTML = `${sw('fuera', s.fuera, 'menos afuera')}<span class="xp-par">(</span>${sw('dentro', s.dentro, 'menos adentro')}<span class="xp-n">${p.base}</span><span class="xp-par">)</span><sup>${s.e}</sup>`;
    };
    pot.onclick = e => {
      const b = e.target.closest('.xg-sw');
      if (!b || ui.locked) return;
      const k = b.dataset.k;
      ui.set({ ...ui.s, [k]: !ui.s[k] }); XS.flip(); xpTick(); draw();
      pot.querySelector(`[data-k="${k}"]`).focus({ preventScroll: true });
      ui.nota(ui.s.dentro ? '' : 'Falta el menos de adentro.');
    };
    const pe = XG.perilla(ui, per, { et: 'Exponente', min: 1, max: p.max, v: 1, lee: () => '', on: e => { ui.set({ ...ui.s, e }); draw(); } });
    draw(); ui.nota('Toca los menos para encenderlos y arrastra el exponente.');
    // Escribe los factores, los empareja de a dos y al final aplica el menos de afuera.
    function corre(s, fin) {
      const n = s.e, dentro = (-p.base) ** n;
      let k = 0;
      cad.innerHTML = '';
      (function factor() {
        if (k < n) {
          cad.insertAdjacentHTML('beforeend', `<span class="xg-fac${k % 2 || k + 1 < n ? ` par${(k >> 1) % 2}` : ' solo'}">${XG.menos(-p.base)}</span>`);
          k++; XS.hop(k); return ui.espera(300, factor);
        }
        ui.lee(`$(-${p.base})^{${n}} = ${dentro}$`);
        ui.nota(n % 2 ? 'Un menos queda sin pareja: adentro da negativo.' : 'Los menos se emparejan todos: adentro da positivo.');
        ui.espera(1300, () => {
          if (s.fuera) { XS.flip(); ui.lee(`$-(-${p.base})^{${n}} = -(${dentro}) = ${-dentro}$`); }
          ui.espera(900, () => fin(s.fuera ? -dentro : dentro));
        });
      })();
    }
    return ok => {
      corre(ui.s, v => {
        if (ok) return ui.nota('El menos de afuera se aplica al final.');
        ui.nota(`Vale ${XG.menos(v)}, no ${XG.menos(p.meta)}. Mira la que sí.`);
        ui.espera(1500, () => { const g = G.solve(p); ui.muestra(g); ui.lee(''); pe.set(g.e); draw(); corre(g, () => {}); });
      });
    };
  },
});
