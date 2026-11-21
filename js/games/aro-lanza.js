// Lanza el aro (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Una cancha vista desde arriba con
// una estaca por opción. Se agarra el aro y se desliza el dedo hacia donde se quiere lanzar: mientras el dedo está abajo
// se ve, punteado, dónde caerá (el aro llega más lejos que el dedo: K veces el deslizamiento). Al soltar, el aro vuela y
// cae ahí. Si ensarta una estaca se califica esa opción; si cae en el pasto, vuelve sin costar vida.
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }      s = { aim: punto de caída | null, fly }
GAMES['aro-lanza'] = (() => {
  const K = 2.4, RING = 14, PEG = 20, FLY = 0.75;
  function court(W, top, bottom, n) {
    const x0 = 12, x1 = W - 12, y0 = top + 4, y1 = bottom - 4, col = (x1 - x0) / n;
    const pegs = Array.from({ length: n }, (_, k) => ({ x: x0 + (k + 0.5) * col, y: top + 76 }));
    return { x0, x1, y0, y1, col, pegs, ring: { x: W / 2, y: bottom - 38 } };
  }
  // Dónde cae el aro si el dedo va de `ring` a `finger` (pura). Nunca sale de la cancha.
  const landOf = (c, finger) => ({ x: MV.clamp(c.ring.x + (finger.x - c.ring.x) * K, c.x0 + RING, c.x1 - RING), y: MV.clamp(c.ring.y + (finger.y - c.ring.y) * K, c.y0 + RING, c.ring.y) });
  // Estaca ensartada por un aro que cae en `pt` (−1 si ninguna).
  const pegAt = (c, pt) => c.pegs.findIndex(g => Math.hypot(pt.x - g.x, pt.y - g.y) <= PEG);
  const geo = G => (G._court ||= court(G.W, G.top, G.bottom, G.item.options.length));
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G._court = null; G.hold = false; return { aim: null, fly: null }; },
    layout(G) { G._court = null; },
    foot: (it, s) => (s.aim ? 'Suelta cuando el aro punteado esté sobre la estaca' : 'El aro llega más lejos que tu dedo'),
    draw(G) {
      const { p, C, s, item: it } = G, c = geo(G);
      // Cancha: pasto y la raya de lanzamiento.
      p.noStroke(); p.fill(MV.alpha(p, C.mint, 34)); p.rect(c.x0, c.y0, c.x1 - c.x0, c.y1 - c.y0, 12);
      p.stroke(C.line); p.strokeWeight(1.5); p.drawingContext.setLineDash([6, 6]); p.line(c.x0 + 10, c.ring.y - 30, c.x1 - 10, c.ring.y - 30); p.drawingContext.setLineDash([]);
      // Estacas y sus rótulos.
      c.pegs.forEach((g, k) => {
        const tone = MV.toneOf(G, k);
        MV.tag(p, C, it.options[s.order[k]], g.x, G.top + 28, c.col - 8, 36, tone);
        p.noFill(); p.stroke(tone ?? C.line); p.strokeWeight(1.2); p.circle(g.x, g.y, PEG * 2);
        p.noStroke(); p.fill(MV.alpha(p, C.night ?? C.ink, 70)); p.ellipse(g.x + 3, g.y + 4, 14, 8);
        p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.creamD); p.circle(g.x, g.y, 11);
      });
      // El aro: quieto, apuntando (con la caída punteada) o en el aire.
      let at = c.ring, scale = 1;
      if (s.fly) {
        const u = !G.dt || reducedMotion() ? 1 : Math.min(1, (G.t - s.fly.t0) / FLY);
        at = { x: c.ring.x + (s.fly.to.x - c.ring.x) * u, y: c.ring.y + (s.fly.to.y - c.ring.y) * u }; scale = 1 + 0.7 * Math.sin(Math.PI * u);
        if (u >= 1 && s.pick < 0 && !G.solved) {
          const k = pegAt(c, s.fly.to);
          if (k >= 0) { s.landed = s.fly.to; MV.choose(G, k); }
          else { G.a.say('Cayó en el pasto: prueba otra vez', C.mute); s.fly = null; s.aim = null; }
        }
        if (s.landed) at = s.landed;
      } else if (s.aim) {
        p.stroke(C.brand); p.strokeWeight(2); p.drawingContext.setLineDash([5, 6]); p.line(c.ring.x, c.ring.y, s.aim.x, s.aim.y); p.noFill(); p.circle(s.aim.x, s.aim.y, RING * 2); p.drawingContext.setLineDash([]);
      }
      if (s.fly && scale > 1.05) { p.noStroke(); p.fill(MV.alpha(p, C.night ?? C.ink, 60)); p.ellipse(at.x + 4, at.y + 6, RING * 2, RING); }
      p.noFill(); p.stroke(C.night ?? C.ink); p.strokeWeight(7 * scale); p.circle(at.x, at.y, RING * 2 * scale);
      p.stroke(C.coral); p.strokeWeight(4.5 * scale); p.circle(at.x, at.y, RING * 2 * scale);
    },
    press(G, x, y) { const c = geo(G); if (G.s.fly || Math.hypot(x - c.ring.x, y - c.ring.y) > 44) return false; G.hold = true; G.s.aim = null; return true; },
    drag(G, x, y) { if (!G.hold) return false; const c = geo(G); G.s.aim = Math.hypot(x - c.ring.x, y - c.ring.y) > 10 ? landOf(c, { x, y }) : null; return true; },
    release(G) {
      if (!G.hold) return; G.hold = false;
      const s = G.s; if (!s.aim || s.fly) return;
      s.fly = { t0: G.t, to: s.aim }; s.aim = null; G.api.sfx?.tap?.();
    },
    cancel(G) { G.hold = false; G.s.aim = null; },
    demo(G) { const c = geo(G), g = c.pegs[1] ?? c.pegs[0]; return { from: c.ring, to: { x: c.ring.x + (g.x - c.ring.x) / K, y: c.ring.y + (g.y - c.ring.y) / K }, text: 'Desliza desde el aro hacia una estaca y suelta', ty: c.ring.y - 52 }; },
    peek(G) {
      const c = geo(G), s = G.s, path = k => [MV.pt(c.ring.x, c.ring.y), MV.pt(c.ring.x + (c.pegs[k].x - c.ring.x) / K, c.ring.y + (c.pegs[k].y - c.ring.y) / K)];
      const k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      return { solve: path(k), wrongPath: path(w), flying: !!s.fly };
    },
  }));
  return Object.assign(game, { court, landOf, pegAt, K });
})();
