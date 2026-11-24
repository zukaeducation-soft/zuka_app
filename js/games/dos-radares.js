// Dos radares (spec 2026-11-24-ejercicios-explora): cada radar dice a qué distancia está el barco, pero no de qué lado.
// Se deja el barco donde los dos tienen razón. params = { min, max, desde, radares: [{ v, d }] }   state = { v, movido }
XG.juego('dos-radares', {
  ini: p => ({ v: p.desde, movido: false }),
  listo: s => !!s.movido,
  ok: (s, p) => p.radares.every(r => Math.abs(s.v - r.v) === r.d),
  sol(p) { for (let v = p.min; v <= p.max; v++) if (p.radares.every(r => Math.abs(v - r.v) === r.d)) return { v, movido: true }; return null; },
  texto(p) { const { v } = this.solve(p); return `$${v}$: ` + p.radares.map(r => `$|{${v}} - ${XG.par(r.v)}| = ${r.d}$`).join(' y '); },
  monta(stage, p, ui) {
    stage.innerHTML = `<div class="xg-tags">${p.radares.map((r, k) => `<span class="xg-tag r${k}"><i></i>Radar en ${XG.menos(r.v)}: a <b>${r.d}</b> pasos</span>`).join('')}</div><div class="xg-lona"></div>`;
    const R = XG.recta(stage.lastChild, { min: p.min, max: p.max, rotulos: [p.min, 0, p.max, ...p.radares.map(r => r.v)], alto: 190, y: 120 });
    let c = p.desde, tocado = false, dedo = null, stop = null;
    const radar = (r, k) => `<path class="xg-radar r${k}" d="M${R.X(r.v)} ${R.y - 4} l-9 -20 h18 z"/><circle class="xg-radar r${k}" cx="${R.X(r.v)}" cy="${R.y}" r="4.5"/>`;
    R.bajo.innerHTML = p.radares.map(radar).join('');
    R.svg.setAttribute('tabindex', '0'); R.svg.setAttribute('role', 'slider'); R.svg.setAttribute('aria-label', 'Posición del barco'); R.svg.setAttribute('aria-valuemin', p.min); R.svg.setAttribute('aria-valuemax', p.max);
    const barco = () => `${tocado || ui.locked ? '' : `<circle class="xp-halo" cx="${R.X(c)}" cy="${R.y}" r="15"/>`}<g class="xp-tok"><circle cx="${R.X(c)}" cy="${R.y}" r="15"/>`
      + `<path class="xg-vela" d="M${R.X(c) - 8} ${R.y + 3} h16 l-4 5 h-8 z M${R.X(c) - 1} ${R.y + 1} v-11 l8 10 z"/></g>`;
    let extra = '';
    const draw = () => { R.din.innerHTML = extra + barco(); R.svg.setAttribute('aria-valuenow', ui.s.v); };
    const pon = v => { v = XG.clamp(v, p.min, p.max); if (v !== ui.s.v) { XS.tick(v); xpTick(); } ui.set({ v, movido: true }); };
    const mueve = e => { c = XG.clamp(R.at(e), p.min, p.max); if (Math.round(c) !== ui.s.v) pon(Math.round(c)); draw(); };
    R.svg.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; tocado = true; stop?.(); try { R.svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } R.svg.classList.add('drag'); mueve(e); };
    R.svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) mueve(e); };
    R.svg.onpointerup = R.svg.onpointercancel = e => { if (e.pointerId !== dedo) return; dedo = null; R.svg.classList.remove('drag'); if (ui.locked) return; pon(Math.round(c)); stop = xpSpring(c, ui.s.v, x => { c = x; draw(); }); };
    R.svg.onkeydown = e => { const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k || ui.locked) return; e.preventDefault(); e.stopPropagation(); tocado = true; stop?.(); pon(ui.s.v + k); c = ui.s.v; draw(); };
    ui.limpia(() => stop?.());
    draw(); ui.nota('Arrastra el barco. Los radares no dicen de qué lado está.');
    return ok => {
      const { v } = GAMES['dos-radares'].solve(p);
      stop?.(); c = ui.s.v; ui.nota('Cada radar marca sus dos lugares.');
      const rama = (r, k, t) => [-1, 1].map(s => {
        const x1 = R.X(r.v), x2 = R.X(r.v + s * r.d * t);
        return XG.arco(x1, x2, R.y, 12 + 7 * k, `xp-arc xg-ar r${k}`) + (t >= 1 ? `<circle class="xp-ring xg-ar r${k}" cx="${x2}" cy="${R.y}" r="${18 - 3 * k}"/><text class="xp-lb-on" x="${x2}" y="${R.y + 40}">${XG.menos(r.v + s * r.d)}</text>` : '');
      }).join('');
      let fijo = '';
      (function radarK(k) {
        if (k >= p.radares.length) {
          extra = fijo + `<circle class="xp-ring good" cx="${R.X(v)}" cy="${R.y}" r="22"/>`;
          ui.nota(ok ? 'Un radar solo deja dos lugares; juntos, uno.' : `Solo el ${XG.menos(v)} está en las dos parejas.`);
          if (ok) return draw();
          return ui.tween(c, v, 900, x => { c = x; draw(); }, () => XS.merge());
        }
        XS.hop(k * 3);
        ui.tween(0, 1, 800, t => { extra = fijo + rama(p.radares[k], k, t); draw(); }, () => { fijo += rama(p.radares[k], k, 1); ui.espera(350, () => radarK(k + 1)); });
      })(0);
      ui.lee(p.radares.map(r => `$|{${ui.s.v}} - ${XG.par(r.v)}| = ${Math.abs(ui.s.v - r.v)}$`).join(' $\\;$ '));
    };
  },
});
