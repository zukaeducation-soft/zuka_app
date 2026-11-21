// Canica en el tablero (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Un tablero sobre un apoyo
// con un hueco por opción y una canica en la punta izquierda. Se agarra el tablero y se sube o se baja ese lado con el
// dedo: el tablero se inclina y la canica rueda hacia el lado bajo, más rápido cuanto más inclinado. Al soltar, el
// tablero vuelve a quedar plano y la canica se detiene. Si se detiene sobre un hueco, cae y se califica esa opción.
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }      s = { f: lugar de la canica (0 a 1), tilt }
GAMES['canica-tablero'] = (() => {
  const MAX = 14, VMAX = 0.5, HOLE = 0.045, BALL = 9;
  const holeF = (k, n) => (k + 0.75) / (n + 0.5);
  // Velocidad de la canica (fracción del tablero por segundo) con el tablero inclinado `tilt` grados (positivo: la
  // punta derecha arriba, la canica va a la izquierda). Pura.
  const speedOf = tilt => -MV.clamp(tilt, -MAX, MAX) / MAX * VMAX;
  const roll = (f, tilt, dt) => MV.clamp(f + speedOf(tilt) * dt, 0.03, 0.97);
  // Hueco sobre el que quedó la canica (−1 si ninguno).
  const holeAt = (f, n) => { for (let k = 0; k < n; k++) if (Math.abs(f - holeF(k, n)) <= HOLE) return k; return -1; };
  const geo = G => { const L = G.W - 44, cx = G.W / 2, cy = G.top + 96; return { L, cx, cy, tagY: cy + 92 }; };
  const along = (b, f, tilt, up = 0) => { const a = tilt * Math.PI / 180, d = (f - 0.5) * b.L; return { x: b.cx + d * Math.cos(a) - up * Math.sin(a), y: b.cy - d * Math.sin(a) - up * Math.cos(a) }; };
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G.hold = false; return { f: 0.03, tilt: 0, fell: -1 }; },
    foot: (it, s, G) => (G.hold ? 'Suelta encima del hueco: el tablero vuelve a quedar plano' : 'Agarra el tablero y sube o baja un lado'),
    draw(G) {
      const { p, C, s, item: it } = G, b = geo(G), n = it.options.length;
      if (s.fell < 0 && !G.solved) {
        if (G.hold) s.f = roll(s.f, s.tilt, G.dt || 0);
        else {
          s.tilt = TK.glide(G, 'tilt', 0, 8);
          if (Math.abs(s.tilt) < 0.4 && s.pick < 0) { const k = holeAt(s.f, n); if (k >= 0) { s.fell = k; s.f = holeF(k, n); MV.choose(G, k); } }
        }
      }
      if (G.hold) G._gl = { tilt: s.tilt };
      // Rótulos fijos debajo de cada hueco (con el tablero plano).
      for (let k = 0; k < n; k++) {
        const x = b.cx + (holeF(k, n) - 0.5) * b.L;
        MV.tag(p, C, it.options[s.order[k]], x, b.tagY, b.L / (n + 0.5) - 6, 40, MV.toneOf(G, k));
        p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([3, 4]); p.line(x, b.cy + 34, x, b.tagY - 22); p.drawingContext.setLineDash([]);
      }
      // Apoyo.
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.creamD); p.triangle(b.cx, b.cy + 4, b.cx - 18, b.cy + 34, b.cx + 18, b.cy + 34);
      // Tablero inclinado, con sus huecos y vasos.
      const a = along(b, 0, s.tilt), z = along(b, 1, s.tilt);
      p.stroke(G.hold ? C.brand : C.night ?? C.ink); p.strokeWeight(G.hold ? 2.5 : 1.5); p.fill(C.sun);
      p.push(); p.translate(b.cx, b.cy); p.rotate(-s.tilt * Math.PI / 180); p.rect(-b.L / 2, -4, b.L, 9, 3);
      for (let k = 0; k < n; k++) {
        const x = (holeF(k, n) - 0.5) * b.L, w = HOLE * b.L * 2;
        p.noStroke(); p.fill(C.bg); p.rect(x - w / 2, -5, w, 11);
        p.stroke(MV.toneOf(G, k) ?? C.night ?? C.ink); p.strokeWeight(1.5); p.noFill(); p.arc(x, 5, w, 26, 0, Math.PI);
      }
      p.pop();
      p.noStroke(); p.fill(C.mute); p.circle(a.x, a.y, 6); p.circle(z.x, z.y, 6);
      // La canica.
      const m = s.fell >= 0 ? along(b, s.f, s.tilt, -10) : along(b, s.f, s.tilt, BALL + 4);
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.sky); p.circle(m.x, m.y, BALL * 2);
      p.noStroke(); p.fill(C.cream); p.circle(m.x - 3, m.y - 3, 5);
    },
    press(G, x, y) {
      const b = geo(G);
      if (G.s.fell >= 0 || Math.abs(y - b.cy) > 60 || Math.abs(x - b.cx) > b.L / 2 + 14) return false;
      G.hold = true; G.grab = { x, y, tilt: G.s.tilt, side: x < b.cx - 24 ? -1 : 1 };
      return true;
    },
    drag(G, x, y) { if (!G.hold) return false; const g = G.grab; G.s.tilt = MV.clamp(g.tilt + (g.y - y) * 0.3 * g.side, -MAX, MAX); return true; },
    release(G) { G.hold = false; G._gl = { tilt: G.s.tilt }; },
    cancel(G) { G.hold = false; },
    demo(G) { const b = geo(G), x = b.cx + b.L * 0.38; return { from: { x, y: b.cy }, to: { x, y: b.cy + 34 }, text: 'Baja este lado: la canica rueda hacia acá', ty: b.cy - 52 }; },
    peek(G) {
      const b = geo(G), s = G.s, n = G.item.options.length, x = b.cx + b.L * 0.38;
      const k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      const path = j => [MV.pt(x, b.cy), MV.pt(x, b.cy + (holeF(j, n) > s.f ? 40 : -40))];
      // El robot suelta cuando la canica pasa por el hueco que busca.
      return { solve: path(k), wrongPath: path(w), until: j => Math.abs(G.s.f - holeF(j, n)) < HOLE * 0.5, target: k, wrongTarget: w, f: s.f };
    },
  }));
  return Object.assign(game, { speedOf, roll, holeAt, holeF });
})();
