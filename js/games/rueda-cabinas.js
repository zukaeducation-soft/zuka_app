// Rueda de cabinas (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Una rueda de feria con una
// cabina por opción y un andén abajo. Se gira la rueda arrastrando el dedo alrededor del centro; al soltar sigue un poco
// por su impulso, frena sola y se acomoda con la cabina más cercana en el andén. La cabina que queda en el andén es la
// respuesta (si la rueda se giró de verdad: un toque sin girar no cuenta).
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }      s = { th: giro, om: velocidad, turned }
GAMES['rueda-cabinas'] = (() => {
  const TAU = Math.PI * 2, DOWN = Math.PI / 2, FRICTION = 2.4;
  const wrap = a => ((a + Math.PI) % TAU + TAU) % TAU - Math.PI;
  const cabinAngle = (th, k, n) => th + TAU * k / n;
  // Cabina más cercana al andén y cuánto falta para que llegue (puras).
  const nearestCabin = (th, n) => { let best = 0; for (let k = 1; k < n; k++) if (Math.abs(wrap(cabinAngle(th, k, n) - DOWN)) < Math.abs(wrap(cabinAngle(th, best, n) - DOWN))) best = k; return best; };
  const snapOf = (th, n) => th - wrap(cabinAngle(th, nearestCabin(th, n), n) - DOWN);
  const startOf = n => DOWN + Math.PI / n;
  const geo = G => { const R = Math.min(G.W * 0.3, (G.bottom - G.top - 92) / 2); return { R, cx: G.W / 2, cy: G.top + 12 + R, cw: Math.min(112, G.W * 0.34), ch: 34 }; };
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G.hold = false; return { th: startOf(it.options.length), om: 0, turned: 0, spin: false }; },
    foot: (it, s) => (s.spin ? 'La rueda frena sola y se acomoda' : 'Gira la rueda hasta dejar una cabina en el andén'),
    draw(G) {
      const { p, C, s, item: it } = G, b = geo(G), n = it.options.length, dt = G.dt || 0;
      if (G.hold) s.om *= Math.exp(-8 * dt);
      else if (s.spin && s.pick < 0 && !G.solved) {
        if (Math.abs(s.om) > 0.5 && !reducedMotion()) { s.th += s.om * dt; s.om *= Math.exp(-FRICTION * dt); }
        else {
          const to = snapOf(s.th, n), d = to - s.th;
          s.th = Math.abs(d) < 0.004 || !dt || reducedMotion() ? to : s.th + d * Math.min(1, dt * 7);
          if (s.th === to) { s.spin = false; s.om = 0; if (s.turned > 0.35) MV.choose(G, nearestCabin(s.th, n)); }
        }
      }
      // Andén.
      const ay = b.cy + b.R + 24 + b.ch / 2 + 4;
      p.noStroke(); p.fill(C.creamD); p.rect(b.cx - b.cw / 2 - 18, ay, b.cw + 36, 8, 3);
      p.stroke(C.line); p.strokeWeight(1); p.line(b.cx - b.cw / 2 - 18, ay + 12, b.cx + b.cw / 2 + 18, ay + 12);
      // Soportes, rueda y radios.
      p.stroke(C.line); p.strokeWeight(3); p.line(b.cx, b.cy, b.cx - b.R * 0.55, ay); p.line(b.cx, b.cy, b.cx + b.R * 0.55, ay);
      p.noFill(); p.stroke(G.hold ? C.brand : C.mute); p.strokeWeight(G.hold ? 3 : 2); p.circle(b.cx, b.cy, b.R * 2); p.strokeWeight(1); p.circle(b.cx, b.cy, b.R * 1.6);
      for (let i = 0; i < 2 * n; i++) { const a = s.th + TAU * i / (2 * n); p.stroke(C.line); p.strokeWeight(1.2); p.line(b.cx, b.cy, b.cx + b.R * Math.cos(a), b.cy + b.R * Math.sin(a)); }
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.coral); p.circle(b.cx, b.cy, 14);
      // Cabinas colgadas: siempre derechas.
      for (let k = 0; k < n; k++) {
        const a = cabinAngle(s.th, k, n), rx = b.cx + b.R * Math.cos(a), ry = b.cy + b.R * Math.sin(a);
        p.stroke(C.ink); p.strokeWeight(1.5); p.line(rx, ry, rx, ry + 24 - b.ch / 2);
        p.noStroke(); p.fill(C.sun); p.circle(rx, ry, 8);
        MV.tag(p, C, it.options[s.order[k]], rx, ry + 24, b.cw, b.ch, MV.toneOf(G, k));
      }
    },
    press(G, x, y) {
      const b = geo(G), s = G.s, d = Math.hypot(x - b.cx, y - b.cy);
      if (s.pick >= 0 || d > b.R + 46 || d < 16) return false;
      G.hold = true; s.spin = false; s.turned = 0; s.om = 0; G.grab = Math.atan2(y - b.cy, x - b.cx); G.grabT = G.t; return true;
    },
    drag(G, x, y) {
      if (!G.hold) return false;
      const b = geo(G), s = G.s, a = Math.atan2(y - b.cy, x - b.cx), da = wrap(a - G.grab), dt = Math.max(0.016, G.t - G.grabT);
      s.th += da; s.turned += Math.abs(da); s.om = 0.6 * s.om + 0.4 * MV.clamp(da / dt, -4, 4); G.grab = a; G.grabT = G.t;
      return true;
    },
    release(G) { if (!G.hold) return; G.hold = false; G.s.spin = true; },
    cancel(G) { G.hold = false; G.s.spin = true; },
    demo(G) { const b = geo(G), a0 = -Math.PI * 0.2, a1 = Math.PI * 0.25, r = b.R + 6; return { from: { x: b.cx + r * Math.cos(a0), y: b.cy + r * Math.sin(a0) }, path: [0, 1, 2, 3, 4].map(i => { const a = a0 + (a1 - a0) * i / 4; return { x: b.cx + r * Math.cos(a), y: b.cy + r * Math.sin(a) }; }), text: 'Gira la rueda con el dedo y suelta', ty: G.bottom - 4 }; },
    peek(G) {
      const b = geo(G), s = G.s, n = G.item.options.length, k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      const path = j => {
        const a0 = cabinAngle(s.th, j, n), need = wrap(DOWN - a0), steps = Math.max(2, Math.ceil(Math.abs(need) / 0.2)), out = [];
        for (let i = 0; i <= steps; i++) { const a = a0 + need * i / steps; out.push(MV.pt(b.cx + b.R * Math.cos(a), b.cy + b.R * Math.sin(a))); }
        return out;
      };
      return { solve: path(k), wrongPath: path(w), spinning: s.spin };
    },
  }));
  return Object.assign(game, { nearestCabin, snapOf, startOf, wrap });
})();
