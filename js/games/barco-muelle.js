// Barco al muelle (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Una bahía vista desde arriba con
// un muelle por opción a la derecha y boyas que separan los carriles. Se arrastra el barco con el dedo: va detrás del
// dedo, no atraviesa las boyas y se queda quieto al soltarlo. Al atracar en un muelle se califica la respuesta de ese
// muelle; si no era, el barco vuelve al inicio y se pierde una vida.
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }      s = { x, y (en píxeles), pick, wrong, order }
GAMES['barco-muelle'] = (() => {
  const BOAT = 13, BUOY = 8, SPEED = 380;
  // Geometría de la bahía para un lienzo de W × [top, bottom] y n muelles.
  function bay(W, top, bottom, n) {
    const x0 = 12, x1 = W - 12, y0 = top + 4, y1 = bottom - 4, lane = (y1 - y0) / n, pier = Math.min(150, Math.round(W * 0.4));
    const docks = Array.from({ length: n }, (_, k) => ({ y: y0 + (k + 0.5) * lane, x: x1 - pier }));
    const buoys = [];
    for (let j = 1; j < n; j++) for (const f of [0.34, 0.5]) buoys.push({ x: x0 + (x1 - x0) * f, y: y0 + j * lane });
    return { x0, x1, y0, y1, lane, pier, docks, buoys, start: { x: x0 + 30, y: (y0 + y1) / 2 } };
  }
  // Un paso del barco hacia el dedo: avanza a lo sumo `step` píxeles, sale de las boyas y no se mete en los muelles
  // fuera de su carril. Devuelve la posición nueva (pura: se prueba en Node).
  function stepBoat(b, boat, to, step) {
    const dx = to.x - boat.x, dy = to.y - boat.y, d = Math.hypot(dx, dy), k = d > step ? step / d : 1;
    let x = boat.x + dx * k, y = boat.y + dy * k;
    for (const o of b.buoys) {
      const ex = x - o.x, ey = y - o.y, e = Math.hypot(ex, ey) || 1;
      if (e < BOAT + BUOY) { x = o.x + ex / e * (BOAT + BUOY); y = o.y + ey / e * (BOAT + BUOY); }
    }
    x = MV.clamp(x, b.x0 + BOAT, b.x1 - BOAT); y = MV.clamp(y, b.y0 + BOAT, b.y1 - BOAT);
    if (x + BOAT > b.docks[0].x && dockAt(b, { x: b.x1, y }) < 0) x = b.docks[0].x - BOAT;
    return { x, y };
  }
  // Muelle donde está atracado el barco (−1 si no está en ninguno).
  const dockAt = (b, boat) => (boat.x + BOAT < b.docks[0].x + 14 ? -1 : b.docks.findIndex(d => Math.abs(boat.y - d.y) < b.lane * 0.3));
  const geo = G => (G._bay ||= bay(G.W, G.top, G.bottom, G.item.options.length));
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G._bay = null; const s = geo(G).start; G.hold = false; return { x: s.x, y: s.y, hx: 0 }; },
    layout(G) { G._bay = null; if (G.s && G.item) { const b = geo(G); G.s.x = b.start.x; G.s.y = b.start.y; } },
    foot: () => 'Las boyas no se atraviesan: pasa entre ellas',
    draw(G) {
      const { p, C, s, item: it } = G, b = geo(G);
      // Movimiento: solo mientras el dedo arrastra.
      if (G.hold && G.to && s.pick < 0 && !G.solved) {
        const nb = stepBoat(b, s, G.to, SPEED * (G.dt || 0.016));
        if (Math.hypot(nb.x - s.x, nb.y - s.y) > 0.5) s.hx = Math.atan2(nb.y - s.y, nb.x - s.x);
        s.x = nb.x; s.y = nb.y;
        const k = dockAt(b, s);
        if (k >= 0) { G.hold = false; MV.choose(G, k); }
      }
      // Agua y olas quietas.
      p.noStroke(); p.fill(MV.alpha(p, C.sky, 46)); p.rect(b.x0, b.y0, b.x1 - b.x0, b.y1 - b.y0, 12);
      p.noFill(); p.stroke(MV.alpha(p, C.sky, 120)); p.strokeWeight(1.2);
      for (let i = 0; i < 7; i++) { const wx = b.x0 + 20 + ((i * 53) % (b.docks[0].x - b.x0 - 30)), wy = b.y0 + 18 + ((i * 71) % (b.y1 - b.y0 - 30)); p.arc(wx, wy + Math.sin(G.t * 1.5 + i) * 1.5, 14, 6, Math.PI, 2 * Math.PI); }
      // Muelles: tablones de madera con el rótulo de la opción.
      b.docks.forEach((d, k) => {
        const tone = MV.toneOf(G, k), h = Math.min(34, b.lane * 0.62);
        p.stroke(C.mute); p.strokeWeight(1); p.fill(C.creamD); p.rect(d.x, d.y - h / 2 - 4, b.pier, h + 8, 4);
        p.stroke(C.line); p.strokeWeight(1); for (let x = d.x + 10; x < b.x1 - 4; x += 12) p.line(x, d.y - h / 2 - 4, x, d.y + h / 2 + 4);
        p.noStroke(); p.fill(C.night ?? C.ink); p.circle(d.x + 3, d.y - h / 2 - 2, 6); p.circle(d.x + 3, d.y + h / 2 + 2, 6);
        MV.tag(p, C, it.options[s.order[k]], d.x + b.pier / 2 + 4, d.y, b.pier - 16, h, tone);
      });
      // Boyas.
      for (const o of b.buoys) { p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.coral); p.circle(o.x, o.y, BUOY * 2); p.noStroke(); p.fill(C.cream); p.rect(o.x - BUOY, o.y - 1.5, BUOY * 2, 3); }
      // El barco, apuntando hacia donde va.
      p.push(); p.translate(s.x, s.y); p.rotate(s.hx ?? 0);
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.sun);
      p.beginShape(); p.vertex(BOAT + 5, 0); p.vertex(BOAT - 5, -9); p.vertex(-BOAT, -8); p.vertex(-BOAT, 8); p.vertex(BOAT - 5, 9); p.endShape(p.CLOSE);
      p.fill(C.cream); p.rect(-7, -5, 10, 10, 2);
      p.pop();
      if (G.hold) { p.noFill(); p.stroke(C.brand); p.strokeWeight(2); p.circle(s.x, s.y, BOAT * 2 + 12); }
    },
    press(G, x, y) { if (G.s.pick >= 0 || Math.hypot(x - G.s.x, y - G.s.y) > 42) return false; G.hold = true; G.to = { x, y }; return true; },
    drag(G, x, y) { if (!G.hold) return false; G.to = { x, y }; return true; },
    release(G) { G.hold = false; },
    cancel(G) { G.hold = false; },
    demo(G) { const b = geo(G), s = G.s; return { from: { x: s.x, y: s.y }, to: { x: b.docks[0].x - 30, y: b.docks[0].y }, text: 'Arrastra el barco hasta un muelle', ty: G.bottom - 14 }; },
    peek(G) {
      const b = geo(G), s = G.s, path = k => [MV.pt(s.x, s.y), MV.pt(s.x, b.docks[k].y), MV.pt(b.docks[k].x + 30, b.docks[k].y)];
      const k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      return { solve: path(k), wrongPath: path(w), boat: { x: s.x, y: s.y } };
    },
  }));
  return Object.assign(game, { bay, stepBoat, dockAt });
})();
