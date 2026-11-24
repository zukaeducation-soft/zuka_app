// Taller de saltos (spec 2026-11-24-ejercicios-explora): se fija cuánto mide el salto y cuántas veces se repite para caer en
// el aro con la cadena volteada (veces negativas). La cadena no se ve hasta comprobar.
// params = { min, max, cada, tope, meta }   state = { a, b }
XG.juego('taller-saltos', {
  ini: () => ({ a: 1, b: 0 }),
  listo: s => s.a !== 0 && s.b !== 0,
  ok: (s, p) => s.b < 0 && s.a * s.b === p.meta,
  sol(p) { for (let b = -2; b >= -p.tope; b--) if (p.meta % b === 0 && Math.abs(p.meta / b) <= p.tope) return { a: p.meta / b, b }; return null; },
  texto(p) { const { a, b } = this.solve(p); return `$${XG.par(a)} \\cdot ${XG.par(b)} = ${p.meta}$`; },
  monta(stage, p, ui) {
    stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
    const R = XG.recta(stage.firstChild, { min: p.min, max: p.max, cada: p.cada, alto: 146 });
    R.bajo.innerHTML = `<circle class="xp-goal" cx="${R.X(p.meta)}" cy="${R.y}" r="13"/>`;
    const salto = (a, k, dir) => XG.arco(R.X(a * k * dir), R.X(a * (k + 1) * dir), R.y, 9 + Math.abs(a), `xp-hop${dir < 0 ? ' flip' : ''}`) + `<circle class="xp-land${dir < 0 ? ' flip' : ''}" cx="${R.X(a * (k + 1) * dir)}" cy="${R.y}" r="3.2"/>`;
    const punto = (x, cls = '') => `<g class="xp-tok ${cls}"><circle cx="${R.X(x)}" cy="${R.y}" r="9"/></g>`;
    const draw = () => { R.din.innerHTML = (ui.s.a ? salto(ui.s.a, 0, 1) : '') + punto(0); };
    const pa = XG.perilla(ui, stage.lastChild, { et: 'Cada salto mide', min: -p.tope, max: p.tope, v: ui.s.a, lee: v => XG.menos(v), on: a => { ui.set({ ...ui.s, a }); draw(); } });
    const pb = XG.perilla(ui, stage.lastChild, { et: 'Veces que se repite', min: -p.tope, max: p.tope, v: ui.s.b, lee: v => `${XG.menos(v)} ${Math.abs(v) === 1 ? 'vez' : 'veces'}`, on: b => ui.set({ ...ui.s, b }) });
    draw(); ui.nota('Se ve un solo salto: imagina la cadena completa.');
    // Arma la cadena de |b| saltos y, si b es negativo, la voltea en el 0.
    function corre(a, b, fin) {
      const n = Math.abs(b), dentro = x => x >= p.min && x <= p.max;
      let k = 0, h = '';
      (function paso() {
        if (k < n && dentro(a * (k + 1))) { h += salto(a, k, 1); k++; R.din.innerHTML = h + punto(a * k); XS.hop(k); return ui.espera(330, paso); }
        if (k < n) { R.din.innerHTML = h + punto(a * k); ui.lee(`$${XG.par(a)} \\cdot ${XG.par(b)} = ${a * b}$`); return fin('La cadena se sale de la recta.'); }
        const cierra = () => { ui.lee(`$${XG.par(a)} \\cdot ${XG.par(b)} = ${a * b}$`); fin(''); };
        if (b > 0) return cierra();
        ui.nota('Veces negativas: la cadena da la vuelta en el 0.');
        ui.espera(450, () => {
          XS.flip();
          ui.tween(1, -1, 900, t => {   // gira alrededor del 0
            R.din.innerHTML = `<g transform="translate(${R.X(0)} 0) scale(${t || 0.001} 1) translate(${-R.X(0)} 0)">${t > 0 ? h : h.replace(/xp-hop|xp-land/g, '$& flip')}</g>` + punto(a * n * t, t < 0 ? 'flip' : '');
          }, cierra);
        });
      })();
    }
    return ok => {
      const { a, b } = ui.s;
      corre(a, b, aviso => {
        if (ok) return ui.nota('Saltos negativos, veces negativas: dos menos, y cae del lado positivo.');
        const g = GAMES['taller-saltos'].solve(p);
        ui.nota(aviso || (a * b === p.meta ? 'Cae en el aro, pero sin dar la vuelta. Mira una que sí la da.' : `Cae en ${XG.menos(a * b)}. Mira una que sí llega.`));
        ui.espera(1700, () => { pa.set(g.a); pb.set(g.b); ui.lee(''); corre(g.a, g.b, () => ui.nota('Saltos negativos, veces negativas: cae del lado positivo.')); });
      });
    };
  },
});
