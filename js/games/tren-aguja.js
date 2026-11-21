// Tren y aguja (juego en movimiento por preguntas; spec 2026-11-20-preuda-movimiento). Una vía sale de la izquierda y en el
// cambio se abre en un ramal por opción, cada uno hasta su estación. Primero se gira la aguja (la flecha del cambio) hacia
// un ramal; luego se empuja el tren con el dedo por la vía: avanza solo mientras se arrastra y sigue el ramal que marca
// la aguja. Pasado el cambio la aguja ya no se mueve. Al llegar a una estación se califica esa opción.
// params = { rounds: [{ title, items: [{ ask, options, answer }] }], miss? }      s = { lever: ramal, d: distancia recorrida }
GAMES['tren-aguja'] = (() => {
  // Vías para un lienzo de W × [top, bottom] y n ramales: el tramo común y, por ramal, la curva hasta la estación.
  function tracks(W, top, bottom, n) {
    const y0 = top + 8, y1 = bottom - 8, lane = (y1 - y0) / n, mid = (y0 + y1) / 2, st = Math.min(140, Math.round(W * 0.4));
    const xj = Math.round(W * 0.3), xs = W - 12 - st, start = { x: 22, y: mid };
    const stations = Array.from({ length: n }, (_, k) => ({ x: xs, y: y0 + (k + 0.5) * lane, w: st, h: Math.min(40, lane * 0.66) }));
    const paths = stations.map(s => {
      const pts = [];
      for (let i = 0; i <= 12; i++) pts.push({ x: start.x + (xj - start.x) * i / 12, y: mid });
      for (let i = 1; i <= 32; i++) {
        const u = i / 32, a = 1 - u, c1 = { x: xj + 50, y: mid }, c2 = { x: xs - 50, y: s.y }, e = { x: xs - 4, y: s.y };
        pts.push({ x: a * a * a * xj + 3 * a * a * u * c1.x + 3 * a * u * u * c2.x + u * u * u * e.x, y: a * a * a * mid + 3 * a * a * u * c1.y + 3 * a * u * u * c2.y + u * u * u * e.y });
      }
      let L = 0; const len = [0];
      for (let i = 1; i < pts.length; i++) len.push(L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
      return { pts, len, total: L };
    });
    const knobs = stations.map(s => { const an = Math.atan2(s.y - mid, xs - xj); return { x: xj + 34 * Math.cos(an), y: mid + 34 * Math.sin(an), an }; });
    return { y0, y1, mid, xj, xs, start, stations, paths, knobs, joint: xj - start.x };
  }
  // Punto del camino a la distancia d (y su dirección).
  function at(path, d) {
    const { pts, len } = path; d = MV.clamp(d, 0, path.total);
    let i = 1; while (i < len.length - 1 && len[i] < d) i++;
    const f = (d - len[i - 1]) / (len[i] - len[i - 1] || 1), a = pts[i - 1], b = pts[i];
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, an: Math.atan2(b.y - a.y, b.x - a.x) };
  }
  // Distancia del camino más cercana al dedo, sin saltar más de `reach` desde donde está el tren (pura).
  function follow(path, d, finger, reach = 60) {
    let best = d, bd = Infinity;
    for (let i = 0; i < path.pts.length; i++) {
      if (Math.abs(path.len[i] - d) > reach) continue;
      const e = Math.hypot(path.pts[i].x - finger.x, path.pts[i].y - finger.y);
      if (e < bd) { bd = e; best = path.len[i]; }
    }
    return best;
  }
  // Ramal más cercano a la dirección del dedo vista desde el cambio.
  const leverOf = (t, x, y) => { const an = Math.atan2(y - t.mid, Math.max(8, x - t.xj)); let k = 0; t.knobs.forEach((kb, i) => { if (Math.abs(kb.an - an) < Math.abs(t.knobs[k].an - an)) k = i; }); return k; };
  const geo = G => (G._tr ||= tracks(G.W, G.top, G.bottom, G.item.options.length));
  const game = questGame(MV.quiz({
    init: (it, r, G) => { G._tr = null; G.hold = null; return { lever: Math.floor((it.options.length - 1) / 2), d: 0 }; },
    layout(G) { G._tr = null; },
    foot: (it, s, G) => (s.d > geo(G).joint ? 'Empuja el tren hasta la estación' : 'Gira la aguja y luego empuja el tren'),
    draw(G) {
      const { p, C, s, item: it } = G, t = geo(G), path = t.paths[s.lever];
      if (s.pick < 0 && !G.solved && s.d >= path.total - 3) { G.hold = null; MV.choose(G, s.lever); }
      // Estaciones con su rótulo.
      t.stations.forEach((st, k) => {
        p.noStroke(); p.fill(C.creamD); p.rect(st.x, st.y - st.h / 2 - 5, st.w, st.h + 10, 5);
        MV.tag(p, C, it.options[s.order[k]], st.x + st.w / 2 + 3, st.y, st.w - 14, st.h, MV.toneOf(G, k));
      });
      // Vías: los ramales apagados finos; el que marca la aguja, con durmientes.
      t.paths.forEach((pa, k) => {
        const on = k === s.lever;
        if (on) { p.stroke(C.creamD); p.strokeWeight(1.5); for (let d = 8; d < pa.total; d += 13) { const q = at(pa, d), nx = -Math.sin(q.an) * 7, ny = Math.cos(q.an) * 7; p.line(q.x - nx, q.y - ny, q.x + nx, q.y + ny); } }
        p.noFill(); p.stroke(on ? C.ink : C.line); p.strokeWeight(on ? 3 : 2);
        p.beginShape(); for (const q of pa.pts) p.vertex(q.x, q.y); p.endShape();
      });
      // La aguja: flecha en el cambio con su perilla.
      const kb = t.knobs[s.lever], locked = s.d > t.joint - 6;
      p.stroke(locked ? C.mute : C.brand); p.strokeWeight(3); p.line(t.xj, t.mid, kb.x, kb.y);
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(locked ? C.creamD : G.hold === 'lever' ? C.brand : C.coral); p.circle(kb.x, kb.y, 18);
      // El tren.
      const q = at(path, s.d);
      p.push(); p.translate(q.x, q.y); p.rotate(q.an);
      p.stroke(C.night ?? C.ink); p.strokeWeight(1.5); p.fill(C.sun); p.rect(-20, -10, 30, 20, 4); p.fill(C.cream); p.rect(-14, -6, 10, 12, 2);
      p.fill(C.coral); p.triangle(10, -10, 20, 0, 10, 10);
      p.pop();
      if (G.hold === 'train') { p.noFill(); p.stroke(C.brand); p.strokeWeight(2); p.circle(q.x, q.y, 50); }
    },
    press(G, x, y) {
      const t = geo(G), s = G.s, kb = t.knobs[s.lever], q = at(t.paths[s.lever], s.d);
      if (s.pick >= 0) return false;
      if (s.d <= t.joint - 6 && Math.hypot(x - kb.x, y - kb.y) < 26) { G.hold = 'lever'; return true; }
      if (Math.hypot(x - q.x, y - q.y) < 40) { G.hold = 'train'; return true; }
      return false;
    },
    drag(G, x, y) {
      const t = geo(G), s = G.s;
      if (G.hold === 'lever') { if (s.d <= t.joint - 6) s.lever = leverOf(t, x, y); return true; }
      if (G.hold === 'train') { s.d = follow(t.paths[s.lever], s.d, { x, y }); return true; }
      return false;
    },
    release(G) { G.hold = null; },
    cancel(G) { G.hold = null; },
    demo(G) {
      const t = geo(G), s = G.s;
      if (s.d < 4) { const kb = t.knobs[s.lever], o = t.knobs[(s.lever + 1) % t.knobs.length]; return { from: kb, to: o, text: 'Gira la aguja hacia un ramal', ty: t.y1 - 12 }; }
      const q = at(t.paths[s.lever], s.d), e = at(t.paths[s.lever], s.d + 90); return { from: q, to: e, text: 'Empuja el tren por la vía', ty: t.y1 - 12 };
    },
    peek(G) {
      const t = geo(G), s = G.s, k = s.order.indexOf(G.item.answer), w = s.order.findIndex(i => i !== G.item.answer);
      const stroke = j => {
        if (s.lever !== j && s.d <= t.joint - 6) { const kb = t.knobs[s.lever], to = t.knobs[j]; return [MV.pt(kb.x, kb.y), MV.pt(to.x, to.y)]; }
        const pa = t.paths[s.lever], out = []; for (let d = s.d; d < pa.total + 20; d += 18) { const q = at(pa, d); out.push(MV.pt(q.x, q.y)); }
        const e = pa.pts.at(-1); out.push(MV.pt(e.x + 2, e.y));
        return out;
      };
      return { solve: stroke(k), wrongPath: stroke(w), lever: s.lever, d: s.d };
    },
  }));
  return Object.assign(game, { tracks, at, follow, leverOf });
})();
