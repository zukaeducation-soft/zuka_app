// Grúa de carga (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Una grúa con el carro en una viga y
// una caja colgada del cable; abajo, un camión por opción. Se arrastra el carro por la viga: la caja se queda atrás y se
// mece como un péndulo (el balanceo se apaga solo). Al soltar, la grúa espera a que la caja quede quieta y la baja. Si cae
// en la plataforma de un camión se califica esa opción; si cae al suelo, sube otra vez sin costar vida.
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }
// s = { x: carro, v: su velocidad, phi / w: ángulo del cable y su velocidad, drop: largo extra del cable al bajar | null }
GAMES['grua-carga'] = (() => {
  const CABLE = 78, GRAV = 900, DAMP = 1.7, BOX = 30, SPEED = 320;
  function yard(W, top, bottom, n) {
    const x0 = 12, x1 = W - 12, beam = top + 12, ground = bottom - 6, col = (x1 - x0) / n;
    const trucks = Array.from({ length: n }, (_, k) => ({ x: x0 + (k + 0.5) * col, w: col - 16, bed: ground - 52 }));
    return { x0, x1, beam, ground, col, trucks, home: x0 + 16 };
  }
  // Un paso del péndulo: el carro acelera `acc` (px/s²); devuelve el ángulo y la velocidad nuevos (pura).
  function swing(phi, w, acc, dt, L = CABLE) {
    const n = Math.max(1, Math.ceil(dt / 0.008)), h = dt / n;
    for (let i = 0; i < n; i++) { const al = -(GRAV / L) * Math.sin(phi) - (acc / L) * Math.cos(phi) - DAMP * w; w += al * h; phi += w * h; }
    return { phi, w };
  }
  const still = s => Math.abs(s.phi) < 0.02 && Math.abs(s.w) < 0.06 && Math.abs(s.v) < 1;
  // Camión en cuya plataforma cae una caja centrada en x (−1 si en ninguno).
  const truckAt = (y, x) => y.trucks.findIndex(t => Math.abs(x - t.x) <= t.w / 2 - BOX / 2 + 6);
  const geo = G => (G._yd ||= yard(G.W, G.top, G.bottom, G.item.options.length));
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G._yd = null; G.hold = false; return { x: geo(G).home, v: 0, phi: 0, w: 0, drop: null, moved: 0, ready: false }; },
    layout(G) { G._yd = null; },
    foot: (it, s) => (s.drop != null ? 'Bajando la carga' : s.ready ? 'Esperando a que la caja quede quieta' : 'Arrastra el carro por la viga y suelta'),
    draw(G) {
      const { p, C, s, item: it } = G, y = geo(G), dt = G.dt || 0;
      // Física: el carro va hacia el dedo; el cable se mece; al soltar se espera la calma y se baja la caja.
      if (dt && s.pick < 0 && !G.solved) {
        const to = G.hold && G.to != null ? MV.clamp(G.to, y.x0 + 16, y.x1 - 16) : s.x, step = MV.clamp(to - s.x, -SPEED * dt, SPEED * dt);
        const v = step / dt, acc = (v - s.v) / dt;
        s.x += step; s.moved += Math.abs(step);
        const sw = reducedMotion() ? { phi: 0, w: 0 } : swing(s.phi, s.w, MV.clamp(acc, -4000, 4000), dt); s.phi = sw.phi; s.w = sw.w; s.v = v;
        if (s.ready && s.drop == null && still(s)) s.drop = 0;
        if (s.drop != null) {
          const far = y.trucks[0].bed - y.beam - CABLE - BOX;
          s.drop = Math.min(far, s.drop + 150 * dt);
          if (s.drop >= far) {
            const k = truckAt(y, s.x + CABLE * Math.sin(s.phi));
            if (k >= 0) MV.choose(G, k);
            else { G.a.say('La caja cayó al suelo: súbela y prueba otra vez', C.mute); s.drop = null; s.ready = false; }
          }
        }
      }
      const L = CABLE + (s.drop ?? 0), bx = s.x + L * Math.sin(s.phi), by = y.beam + L * Math.cos(s.phi);
      // Camiones con su rótulo.
      y.trucks.forEach((t, k) => {
        const tone = MV.toneOf(G, k);
        p.stroke(tone ?? C.line); p.strokeWeight(tone ? 2 : 1.2); p.noFill(); p.rect(t.x - t.w / 2, t.bed, t.w, 6, 2);
        p.noStroke(); p.fill(C.creamD); p.rect(t.x - t.w / 2, t.bed + 6, t.w, 8, 2);
        MV.tag(p, C, it.options[s.order[k]], t.x, t.bed + 40, t.w, 28, tone);
        p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.mute); p.circle(t.x - t.w / 3, t.bed + 18, 9); p.circle(t.x + t.w / 3, t.bed + 18, 9);
      });
      // La viga y el carro.
      p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(y.x0, y.beam - 7, y.x1 - y.x0, 10, 3);
      for (let x = y.x0 + 10; x < y.x1 - 6; x += 16) p.line(x, y.beam - 7, x + 8, y.beam + 3);
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(G.hold ? C.brand : C.coral); p.rect(s.x - 14, y.beam - 11, 28, 16, 4);
      // Cable y caja.
      p.stroke(C.ink); p.strokeWeight(1.5); p.line(s.x, y.beam + 5, bx, by);
      p.push(); p.translate(bx, by); p.rotate(-s.phi);
      p.stroke(C.night ?? C.ink); p.fill(C.sun); p.rect(-BOX / 2, 0, BOX, BOX, 4); p.line(-BOX / 2, 0, BOX / 2, BOX); p.line(BOX / 2, 0, -BOX / 2, BOX);
      p.pop();
      // Dónde caería la caja ahora: una línea tenue hasta los camiones.
      if (s.drop == null && !G.solved) { p.stroke(MV.alpha(p, C.brand, 120)); p.strokeWeight(1); p.drawingContext.setLineDash([3, 5]); p.line(bx, by + BOX + 2, bx, y.trucks[0].bed - 2); p.drawingContext.setLineDash([]); }
    },
    press(G, x, y) {
      const s = G.s, yd = geo(G);
      if (s.pick >= 0 || s.drop != null || Math.abs(x - s.x) > 46 || y > yd.beam + CABLE + BOX + 20 || y < yd.beam - 30) return false;
      G.hold = true; G.to = x; s.ready = false; return true;
    },
    drag(G, x) { if (!G.hold) return false; G.to = x; return true; },
    release(G) { if (!G.hold) return; G.hold = false; if (G.s.moved > 14) G.s.ready = true; },
    cancel(G) { G.hold = false; },
    demo(G) { const yd = geo(G), t = yd.trucks[1] ?? yd.trucks[0]; return { from: { x: G.s.x, y: yd.beam }, to: { x: t.x, y: yd.beam }, text: 'Arrastra el carro y suelta sobre un camión', ty: yd.beam + CABLE + BOX + 22 }; },
    peek(G) {
      const yd = geo(G), s = G.s, k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      const path = j => [MV.pt(s.x, yd.beam), MV.pt((s.x + yd.trucks[j].x) / 2, yd.beam), MV.pt(yd.trucks[j].x, yd.beam)];
      return { solve: path(k), wrongPath: path(w), dropping: s.drop != null || s.ready };
    },
  }));
  return Object.assign(game, { yard, swing, still, truckAt });
})();
