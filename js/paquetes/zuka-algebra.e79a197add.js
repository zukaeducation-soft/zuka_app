// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/ubica-en-recta.js
// Ubica en la recta (lección 1.1): soltar cada número sobre la recta real en su lugar.
// params = { min, max, tol, points: [{ label, tex, value }] }   state = { values: [número | null] }

GAMES['ubica-en-recta'] = (() => {
  function grade(state, params) {
    const ok = params.points.every((pt, i) => state.values[i] !== null && Math.abs(state.values[i] - pt.value) < params.tol);
    if (ok) return { ok: true, solution: 'Todos los puntos están en su lugar.' };
    return { ok: false, solution: params.points.map(pt => `$${pt.tex} \\approx ${pt.value.toFixed(2)}$`).join(', ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const values = params.points.map(() => null);
    let locked = false, chips = [], map = null, lineY = 0, drag = -1, grab = { x: 0, y: 0 }, W = 0;
    const CH = 34;

    function layout(w, h) {
      W = w;
      lineY = h * 0.56;
      map = lineMap(params.min, params.max, 26, w - 26);
      const cw = Math.min(70, (w - 24) / params.points.length - 8);
      chips = params.points.map((pt, i) => {
        const hx = 12 + i * (cw + 8) + ((w - 24) - params.points.length * (cw + 8) + 8) / 2, hy = 16;
        return { ...pt, i, w: cw, h: CH, hx, hy, x: hx, y: hy };
      });
      arrange();
    }
    // Las fichas colocadas cuelgan sobre su punto de la recta; de izquierda a derecha, cada una
    // toma el nivel más bajo donde no choca con la anterior de ese nivel (hasta 3 niveles).
    function arrange() {
      const ends = [-Infinity, -Infinity, -Infinity];
      chips.forEach(c => { if (values[c.i] === null) { c.tx = c.hx; c.ty = c.hy; } });
      chips.filter(c => values[c.i] !== null).sort((a, b) => values[a.i] - values[b.i]).forEach(c => {
        c.tx = map.toPx(values[c.i]) - c.w / 2;
        let lv = ends.findIndex(e => c.tx > e + 4);
        if (lv < 0) lv = ends.indexOf(Math.min(...ends));
        ends[lv] = c.tx + c.w;
        c.ty = lineY - 30 - lv * (CH + 6) - CH;
      });
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => { layout(size.w, size.h); chips.forEach(c => { c.x = c.tx; c.y = c.ty; }); };

      function axis(y, mp, from, to, step, labels) {
        p.stroke(C.ink); p.strokeWeight(3); p.line(mp.toPx(from) - 6, y, mp.toPx(to) + 6, y);
        p.textAlign(p.CENTER, p.TOP); p.textSize(14); p.textStyle(p.BOLD);
        for (let k = Math.ceil(from / step - 1e-9); k * step <= to + 1e-9; k++) {
          const v = k * step, x = mp.toPx(v), whole = Math.abs(v - Math.round(v)) < 1e-9;
          // Marcas y números con el color del signo: negativos coral, el cero sol, positivos tinta.
          const zero = Math.abs(v) < 1e-9;
          p.stroke(zero ? C.sun : C.ink); p.strokeWeight(whole ? 2 : 1); p.line(x, y - (whole ? 8 : 4), x, y + (whole ? 8 : 4));
          if (labels && whole) { p.noStroke(); p.fill(zero ? C.N : v < 0 ? C.I : C.ink); p.text(String(Math.round(v)).replace('-', '−'), x, y + 12); }
        }
      }

      // Lupa: amplía ±0.5 alrededor del valor exacto y muestra dónde quedó la ficha.
      function lens(cx, cy, r, pt, v) {
        p.push();
        p.fill(C.card); p.stroke(C.brand); p.strokeWeight(3); p.circle(cx, cy, r * 2);
        p.drawingContext.save(); p.drawingContext.beginPath(); p.drawingContext.arc(cx, cy, r - 2, 0, Math.PI * 2); p.drawingContext.clip();
        const mp = lineMap(pt.value - 0.5, pt.value + 0.5, cx - r, cx + r);
        axis(cy, mp, pt.value - 0.5, pt.value + 0.5, 0.1, false);
        p.noStroke(); p.fill(C.ok); p.circle(mp.toPx(pt.value), cy, 12);
        if (v !== null) { p.fill(Math.abs(v - pt.value) < params.tol && !VELO.on ? C.ok + '99' : C.bad); p.circle(mp.toPx(v), cy, 10); }
        p.drawingContext.restore();
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.TOP); p.textSize(13); p.textStyle(p.BOLD);
        p.text(`${pt.label} ≈ ${pt.value.toFixed(2).replace('-', '−')}`, cx, cy + r + 4);
        p.pop();
      }

      p.draw = () => {
        p.background(C.bg);
        axis(lineY, map, params.min, params.max, 1, true);
        if (locked) params.points.forEach(pt => { p.noStroke(); p.fill(C.ok); p.circle(map.toPx(pt.value), lineY, 9); });
        chips.forEach(c => {
          if (c.i !== drag) { c.x = p.lerp(c.x, c.tx, 0.25); c.y = p.lerp(c.y, c.ty, 0.25); }
          const v = values[c.i], good = v !== null && Math.abs(v - c.value) < params.tol;
          const color = locked ? (good ? C.ok : C.bad) : (c.i === drag ? C.brand : v !== null ? C.brand : C.line);
          if (v !== null && c.i !== drag) {
            // Palito desde la ficha hasta su punto en la recta.
            const x = map.toPx(v);
            p.stroke(color); p.strokeWeight(2); p.line(c.x + c.w / 2, c.y + c.h, x, lineY - 6);
            p.noStroke(); p.fill(color); p.triangle(x - 6, lineY - 12, x + 6, lineY - 12, x, lineY - 1);
          }
          drawTile(p, C, c, c.label, { size: Math.min(18, c.w / 3), fill: v !== null && !locked ? C.sun : C.cream, lift: c.i === drag ? 5 : 3, ring: locked ? color : null });
        });
        if (drag >= 0) {
          // Lectura en vivo: el valor donde caería la ficha y una guía hasta la recta.
          const c = chips[drag], x = Math.max(map.toPx(params.min), Math.min(map.toPx(params.max), c.x + c.w / 2)), v = map.toVal(x);
          p.stroke(C.brand); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 4]); p.line(x, c.y + c.h, x, lineY); p.drawingContext.setLineDash([]);
          drawPill(p, C, `≈ ${v.toFixed(2).replace('-', '−')}`, x, c.y + c.h + 20, C.brand, 13);
        }
        if (locked) {
          // Hasta tres lupas, empezando por las fichas peor ubicadas.
          const worst = params.points.map((pt, i) => ({ pt, v: values[i], d: values[i] === null ? 99 : Math.abs(values[i] - pt.value) }))
            .sort((a, b) => b.d - a.d).slice(0, 3);
          const r = Math.min(46, (W - 40) / 6);
          worst.forEach((o, k) => lens(W / 2 + (k - (worst.length - 1) / 2) * (r * 2 + 16), lineY + 40 + r, r, o.pt, o.v));
        }
      };

      p.mousePressed = () => {
        if (locked) return;
        for (let k = chips.length - 1; k >= 0; k--) {
          const c = chips[k];
          if (p.mouseX >= c.x && p.mouseX <= c.x + c.w && p.mouseY >= c.y && p.mouseY <= c.y + c.h) {
            drag = c.i; grab = { x: p.mouseX - c.x, y: p.mouseY - c.y }; api.sfx?.tap?.();
            return false;
          }
        }
      };
      p.mouseDragged = () => {
        if (drag < 0) return;
        const c = chips[drag];
        c.x = p.constrain(p.mouseX - grab.x, 0, size.w - c.w);
        c.y = p.constrain(p.mouseY - grab.y, 0, size.h - c.h);
        return false;
      };
      p.mouseReleased = () => {
        if (drag < 0) return;
        const c = chips[drag], cx = c.x + c.w / 2, cy = c.y + c.h;
        // Vale soltar la ficha sobre la recta o justo encima de ella; si no, vuelve arriba.
        const onLine = cy > lineY - 110 && cy < lineY + 40 && cx >= map.toPx(params.min) - 10 && cx <= map.toPx(params.max) + 10;
        values[c.i] = onLine ? Math.min(params.max, Math.max(params.min, map.toVal(cx))) : null;
        drag = -1;
        arrange();
        api.ready(values.every(v => v !== null));
        return false;
      };
    }, 1.1);

    return {
      loaded: m.ready,
      getState: () => ({ values: [...values] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/reparto.js
// Reparto proporcional (lección 1.2): una barra representa el total; dos separadores arrastrables
// la parten en tres montos que se ven en vivo. Correcto si cada parte queda en la razón pedida.
// params = { total, parts: [p1, p2, p3], tol }   state = { cuts: [fracción, fracción] } (0–1, en cualquier orden)

GAMES['reparto'] = (() => {
  const fmt = n => Math.round(n).toLocaleString('es-CO');
  const shares = params => { const s = params.parts.reduce((a, b) => a + b, 0); return params.parts.map(p => p / s); };
  const amounts = (cuts, total) => { const [a, b] = [...cuts].sort((x, y) => x - y); return [a * total, (b - a) * total, (1 - b) * total]; };

  function grade(state, params) {
    const want = shares(params).map(s => s * params.total), got = amounts(state.cuts, params.total);
    const ok = got.every((g, i) => Math.abs(g - want[i]) <= params.tol * params.total);
    return { ok, solution: `${params.parts.join(' + ')} = ${params.parts.reduce((a, b) => a + b, 0)} partes; cada parte vale ${fmt(params.total / params.parts.reduce((a, b) => a + b, 0))}: ${want.map(fmt).join(' / ')}` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { cuts: [1 / 3, 2 / 3] };
    let locked = false, W = 0, H = 0, bar = null, drag = -1;
    const COLS = [C.Q, C.N, C.R];

    function layout(w, h) { W = w; H = h; bar = { x: 16, y: h * 0.42, w: w - 32, h: 44 }; }
    const cx = f => bar.x + f * bar.w;

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const cuts = [...st.cuts].sort((a, b) => a - b), got = amounts(st.cuts, params.total);
        const want = shares(params);
        p.noStroke(); p.fill(C.mute); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(13);
        drawKicker(p, C, `Reparte ${fmt(params.total)} en la razón ${params.parts.join(' : ')}`, W / 2, 16, { center: true });
        p.noStroke(); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD);
        p.fill(C.ink); p.textSize(12); p.text('Arrastra los separadores', W / 2, 30);
        // Barra en tres tramos.
        const edges = [0, ...cuts, 1];
        for (let i = 0; i < 3; i++) {
          const x0 = cx(edges[i]), x1 = cx(edges[i + 1]);
          const good = Math.abs(got[i] - want[i] * params.total) <= params.tol * params.total;
          p.noStroke(); p.fill(COLS[i]); p.rect(x0, bar.y, x1 - x0, bar.h, i === 0 ? 10 : 0, i === 2 ? 10 : 0, i === 2 ? 10 : 0, i === 0 ? 10 : 0);
          // Monto y porcentaje de cada tramo, debajo (alternando alturas si el tramo es angosto).
          p.fill(locked ? (good ? C.ok : C.bad) : C.ink); p.textAlign(p.CENTER, p.TOP); p.textSize(13);
          const ty = bar.y + bar.h + 10 + (i % 2) * 34;
          p.text(fmt(got[i]), (x0 + x1) / 2, ty);
          p.fill(C.mute); p.textSize(11); p.text(`${Math.round((edges[i + 1] - edges[i]) * 100)} %`, (x0 + x1) / 2, ty + 16);
        }
        if (locked) {
          // Cortes correctos marcados en verde.
          let acc = 0; want.slice(0, 2).forEach(s => { acc += s; p.stroke(C.ok); p.strokeWeight(3); p.line(cx(acc), bar.y - 14, cx(acc), bar.y + bar.h + 6); });
        }
        // Separadores.
        st.cuts.forEach((f, i) => {
          const x = cx(f);
          p.stroke(i === drag ? C.ink : C.brand); p.strokeWeight(4); p.line(x, bar.y - 8, x, bar.y + bar.h + 8);
          p.noStroke(); p.fill(i === drag ? C.ink : C.brand); p.circle(x, bar.y - 16, 22);
          p.fill(C.bg); p.textAlign(p.CENTER, p.CENTER); p.textSize(12); p.text('⇔', x, bar.y - 15);
        });
        // Marcas de referencia en la barra: décimos.
        p.stroke(C.bg); p.strokeWeight(1);
        for (let k = 1; k < 10; k++) p.line(cx(k / 10), bar.y + bar.h - 6, cx(k / 10), bar.y + bar.h);
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textAlign(p.CENTER, p.TOP);
        p.text(`Partes: ${params.parts.join(' + ')} = ${params.parts.reduce((a, b) => a + b, 0)} · ¿cuánto vale una parte?`, W / 2, H - 22);
      };

      p.mousePressed = () => {
        if (locked) return;
        if (Math.abs(p.mouseY - (bar.y + bar.h / 2)) > 40) return;
        drag = st.cuts.map((f, i) => [Math.abs(p.mouseX - cx(f)), i]).sort((a, b) => a[0] - b[0])[0][1];
        api.sfx?.tap?.();
        return false;
      };
      p.mouseDragged = () => {
        if (drag < 0) return;
        // Ajuste fino al 0.5 % para que los montos salgan redondos.
        st.cuts[drag] = Math.round(p.constrain((p.mouseX - bar.x) / bar.w, 0, 1) * 200) / 200;
        return false;
      };
      p.mouseReleased = () => { if (drag >= 0) { drag = -1; api.ready(true); return false; } };
    }, 0.72);

    return {
      loaded: m.ready,
      getState: () => ({ cuts: [...st.cuts] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/balanza-exponencial.js
// Balanza exponencial (ecuaciones exponenciales y logarítmicas): cada lado de la ecuación cuelga de un
// platillo. Con − / + o arrastrando el cursor se cambia x; cada platillo muestra su valor y el brazo se
// inclina hacia el lado mayor hasta nivelarse en la solución. Si un lado no existe para ese x (un
// logaritmo de un número ≤ 0), el platillo dice «no existe» y el brazo se pone rojo: así se ve por qué
// una solución extraña no sirve.
// params = { rounds: [{ tex, txt, L, R, x, min?, max?, step?, extra? }] }  (L, R: funciones de x;
//   extra: la solución extraña que aparece al resolver, si la hay)   state = { xs: [x] }

GAMES['balanza-exponencial'] = (() => {
  const MAXT = 0.35;
  // Ángulo del brazo (positivo: baja el platillo izquierdo); null si algún lado no existe.
  function tilt(l, r) {
    if (!Number.isFinite(l) || !Number.isFinite(r)) return null;
    if (Math.abs(l - r) <= 1e-9 * Math.max(1, Math.abs(l))) return 0;
    return MAXT * (l - r) / (Math.abs(l) + Math.abs(r));
  }
  const fmt = v => {
    if (!Number.isFinite(v)) return 'no existe';
    const s = Math.abs(v) >= 1e5 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(2) : String(+v.toPrecision(4));
    return s.replace('-', '−');
  };
  const range = r => ({ min: r.min ?? -4, max: r.max ?? 6, step: r.step ?? 0.5 });

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.xs[i] != null && Math.abs(state.xs[i] - r.x) < 1e-9);
    return { ok, solution: params.rounds.map(r => `$${r.tex}$: $x = ${r.x}$`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const xs = params.rounds.map(r => r.start ?? range(r).min), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], minus = null, plus = null, track = null, shown = 0;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      minus = { x: 12, y: h - 58, w: 44, h: 40 };
      plus = { x: w - 56, y: h - 58, w: 44, h: 40 };
      track = { x: 72, y: h - 58, w: w - 144, h: 40 };
    }
    const ready = () => api.ready(touched.every(Boolean));
    const setX = (i, x) => {
      const { min, max, step } = range(params.rounds[i]);
      const v = +(Math.round((Math.max(min, Math.min(max, x)) - min) / step) * step + min).toFixed(6);
      if (v !== xs[i]) api.sfx?.tap?.();
      xs[i] = v; touched[i] = true; ready();
    };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);
      function fit(s, x, y, sz, maxW) {
        p.textSize(sz);
        while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); }
        p.text(s, x, y);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], x = xs[cur], { min, max } = range(r);
        const l = r.L(x), rr = r.R(x), t = tilt(l, rr), good = t === 0 && !VELO.on;
        tabs.forEach((tb, i) => {
          const ok = Math.abs(xs[i] - params.rounds[i].x) < 1e-9;
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fit(r.txt || r.tex, W / 2, 62, 20, W - 24);

        // Balanza: el brazo gira suave hacia su ángulo; rojo si un lado no existe.
        shown += ((t ?? 0) - shown) * 0.2;
        const cx = W / 2, cy = 112, arm = Math.min(W * 0.36, 150), dx = arm * Math.cos(shown), dy = arm * Math.sin(shown);
        const beamCol = t === null ? C.bad : locked ? (good ? C.ok : C.bad) : good ? C.ok : C.mute;
        p.noStroke(); p.fill(C.line); p.triangle(cx, cy, cx - 26, cy + 150, cx + 26, cy + 150); p.rect(cx - 50, cy + 148, 100, 8, 4);
        p.stroke(beamCol); p.strokeWeight(6); p.line(cx - dx, cy + dy, cx + dx, cy - dy);
        p.noStroke(); p.fill(beamCol); p.circle(cx, cy, 14);
        const pan = (px, py, val, col, label) => {
          p.stroke(C.mute); p.strokeWeight(1.5); p.line(px, py, px - 30, py + 56); p.line(px, py, px + 30, py + 56);
          p.noStroke(); p.fill(Number.isFinite(val) ? col : C.bad); p.arc(px, py + 56, 76, 34, 0, Math.PI, p.CHORD);
          p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.CENTER, p.TOP); p.text(label, px, py + 78);
          p.fill(Number.isFinite(val) ? C.ink : C.bad); fit(fmt(val), px, py + 98, 15, W / 2 - 20);
        };
        pan(cx - dx, cy + dy, l, C.Z, 'izquierda');
        pan(cx + dx, cy - dy, rr, C.I, 'derecha');
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13);
        if (t === null) { p.fill(C.bad); p.text('para este x un lado no existe', W / 2, cy + 172); }
        else if (good) { p.fill(C.ok); p.text('¡equilibrio!', W / 2, cy + 172); }

        // x: − / + y cursor.
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(20); p.textAlign(p.CENTER, p.CENTER); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
        const ty = track.y + 28, kx = track.x + 8 + (x - min) / (max - min) * (track.w - 16);
        p.stroke(C.line); p.strokeWeight(4); p.line(track.x + 8, ty, track.x + track.w - 8, ty);
        p.noStroke(); p.fill(locked ? C.mute : C.brand); p.circle(kx, ty, 18);
        p.fill(C.ink); p.textSize(15); p.textStyle(p.BOLD); p.text(`x = ${String(x).replace('-', '−')}`, W / 2, track.y + 6);
        if (locked && !(Math.abs(x - r.x) < 1e-9)) { p.fill(C.ok); p.textSize(12); p.text(`era x = ${String(r.x).replace('-', '−')}`, W / 2, H - 8); }
      };

      let dragging = false;
      const fromTrack = () => { const { min, max } = range(params.rounds[cur]); setX(cur, min + (p.mouseX - track.x - 8) / (track.w - 16) * (max - min)); };
      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const { step } = range(params.rounds[cur]);
        if (inside(minus, p.mouseX, p.mouseY)) { setX(cur, xs[cur] - step); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { setX(cur, xs[cur] + step); return false; }
        if (inside(track, p.mouseX, p.mouseY)) { dragging = true; fromTrack(); return false; }
      };
      p.mouseDragged = () => { if (dragging && !locked) { fromTrack(); return false; } };
      p.mouseReleased = () => { dragging = false; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ xs: xs.slice() }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, tilt };
})();
;
//#archivo js/games/compas-raiz.js
// El compás de la raíz (Álgebra 1.1, irracionales en la recta): sobre la recta hay una banderita en √n. Con
// − / + se eligen los catetos a (sobre la recta) y b (hacia arriba) de un rectángulo con esquina en el 0;
// su diagonal mide √(a² + b²). Al tocar «Girar», el compás clavado en el 0 acuesta la diagonal sobre la recta:
// cae justo en la banderita cuando a² + b² = n. Así se construye un irracional exacto con regla y compás.
// params = { rounds: [{ n }], max }   state = { legs: [[a, b] | null] }

GAMES['compas-raiz'] = (() => {
  let fits = (lg, n) => !!lg && lg[0] >= 1 && lg[1] >= 1 && lg[0] * lg[0] + lg[1] * lg[1] === n;
  function legsFor(n, max) {
    for (let a = 1; a <= max; a++) for (let b = a; b <= max; b++) if (a * a + b * b === n) return [a, b];
    return null;
  }
  fits = velo(fits);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.legs?.[i], r.n));
    const solution = params.rounds.map(r => { const l = legsFor(r.n, params.max); return l ? `√${r.n}: ${l[0]}² + ${l[1]}² = ${r.n}` : ''; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds, max = params.max;
    const st = { legs: R.map(() => [1, 1]) };
    const swung = R.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], go = null, ang = 0, view = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      const top = 70, bottom = h - 120;
      const unit = Math.min((w - 40) / Math.ceil(Math.sqrt(2) * max + 0.6), (bottom - top) / (max + 0.6));
      view = { x0: 22, y0: bottom, u: unit };
      // Dos pares − valor + que ocupan cada uno media fila, con margen entre ellos.
      const bw = 38, y = h - 96, half = (w - 28 - 12) / 2;
      btns = [
        { k: 0, d: -1, x: 14, y, w: bw, h: 34 }, { k: 0, d: 1, x: 14 + half - bw, y, w: bw, h: 34 },
        { k: 1, d: -1, x: 26 + half, y, w: bw, h: 34 }, { k: 1, d: 1, x: w - 14 - bw, y, w: bw, h: 34 },
      ];
      go = { x: 14, y: h - 52, w: w - 28, h: 38 };
    }
    const X = v => view.x0 + v * view.u, Y = v => view.y0 - v * view.u;

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], [a, b] = st.legs[cur], d = Math.hypot(a, b), good = fits(st.legs[cur], r.n);
        const full = Math.atan2(b, a);
        ang = swung[cur] ? Math.max(0, ang - 0.05) : full;
        drawTabs(p, C, tabs, cur, i => (locked ? (fits(st.legs[i], R[i].n) ? C.ok : C.bad) : i === cur ? C.brand : swung[i] ? (fits(st.legs[i], R[i].n) ? C.Q : C.Z) : C.line));
        drawKicker(p, C, 'Haz caer el compás en la banderita', 14, 56);

        // Cuadrícula y recta
        const nMax = Math.floor((W - 30 - view.x0) / view.u);
        p.stroke(C.line); p.strokeWeight(0.7);
        for (let x = 0; x <= nMax; x++) p.line(X(x), Y(0), X(x), Y(max));
        for (let y = 0; y <= max; y++) p.line(X(0), Y(y), X(nMax), Y(y));
        p.stroke(C.ink); p.strokeWeight(2.5); p.line(X(0) - 8, Y(0), W - 12, Y(0));
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textAlign(p.CENTER, p.TOP);
        for (let x = 0; x <= nMax; x++) p.text(x, X(x), Y(0) + 6);
        // Banderita en √n
        const fx = X(Math.sqrt(r.n));
        p.stroke(C.I); p.strokeWeight(2); p.line(fx, Y(0), fx, Y(0) - 34);
        p.noStroke(); p.fill(C.I); p.triangle(fx, Y(0) - 34, fx + 18, Y(0) - 28, fx, Y(0) - 22);
        drawPill(p, C, `√${r.n}`, fx, Y(0) - 48, C.coral, 13);
        // Rectángulo a × b y su diagonal (girando con el compás)
        const tint = p.color(C.sky); tint.setAlpha(90); p.stroke(C.sky); p.strokeWeight(2.5); p.fill(tint);
        p.rect(X(0), Y(b), a * view.u, b * view.u);
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.2); p.drawingContext.setLineDash([4, 4]);
        p.arc(X(0), Y(0), 2 * d * view.u, 2 * d * view.u, -full, 0); p.drawingContext.setLineDash([]);
        const ex = X(0) + d * view.u * Math.cos(ang), ey = Y(0) - d * view.u * Math.sin(ang);
        p.stroke(good && ang === 0 && !VELO.on ? C.ok : C.sun); p.strokeWeight(5); p.line(X(0), Y(0), ex, ey);
        p.noStroke(); p.fill(C.ink); p.circle(X(0), Y(0), 9);
        drawDot(p, C, ex, ey, 9, good && ang === 0 && !VELO.on ? C.ok : C.sun);
        if (swung[cur] && ang === 0) {
          drawPill(p, C, good ? '¡Justo en la banderita!' : `Cayó en √${a * a + b * b}`, W / 2, 78, good ? C.ok : C.bad, 13);
        }
        // Controles
        p.textAlign(p.CENTER, p.CENTER);
        [['a', a, 0], ['b', b, 2]].forEach(([nm, v, k]) => {
          const b1 = btns[k], b2 = btns[k + 1];
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(16); p.text(`${nm} = ${v}`, (b1.x + b1.w + b2.x) / 2, b1.y + b1.h / 2);
          [[b1, '−'], [b2, '+']].forEach(([bt, s]) => drawTile(p, C, bt, s, { fill: locked ? C.card : C.sky, ink: locked ? C.mute : undefined, r: 8, lift: 2, size: 18 }));
        });
        drawTile(p, C, go, '', { fill: locked ? C.card : C.sun });
        p.noStroke(); p.fill(locked ? C.ink : inkOn(C.sun, C.ink)); p.textSize(14); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const sol = locked && !good ? legsFor(r.n, max) : null;
        fitText(p, sol ? `Con a = ${sol[0]} y b = ${sol[1]}: ${sol[0]}² + ${sol[1]}² = ${r.n}` : `Girar el compás  (${a}² + ${b}² = ${a * a + b * b})`, W / 2, go.y + go.h / 2, go.w - 16, 14);
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; ang = swung[t] ? 0 : Math.atan2(st.legs[t][1], st.legs[t][0]); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const lg = st.legs[cur];
        const bi = btns.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (bi >= 0) { const bt = btns[bi]; lg[bt.k] = Math.min(max, Math.max(1, lg[bt.k] + bt.d)); swung[cur] = false; api.ready(swung.every(Boolean)); api.sfx?.tap?.(); return false; }
        if (hitBox(go, p.mouseX, p.mouseY)) { swung[cur] = true; api.ready(swung.every(Boolean)); api.sfx?.tap?.(); return false; }
      };
    }, 1.25);

    return {
      loaded: m.ready,
      getState: () => ({ legs: st.legs.map((l, i) => (swung[i] ? [...l] : null)) }),
      lock() { locked = true; swung.fill(true); },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, legsFor };
})();
;
//#archivo js/games/duplica-magnitud.js
// Duplica y mira (Álgebra 1.2, magnitudes directa e inversamente proporcionales): cada ronda cuenta una
// situación con dos magnitudes. «Antes» muestra sus barras; en «Después» la primera ya cambió (×2, ×3…) y
// hay que subir o bajar la barra de la segunda hasta su valor (arrastre o − / +). La flecha dice por cuánto
// se multiplicó cada una. Al comprobar se revela el tipo: directa (y/x fijo), inversa (x·y fijo) o ninguna.
// params = { rounds: [{ text, nx, ny, ux, uy, x0, y0, x1, y1, step, ymax }] }   state = { ys: [y | null] }

GAMES['duplica-magnitud'] = (() => {
  const EPS = 1e-9;
  function kindOf(x0, y0, x1, y1) {
    if (Math.abs(y1 / y0 - x1 / x0) < EPS) return 'directa';
    if (Math.abs(x1 * y1 - x0 * y0) < EPS) return 'inversa';
    return 'ninguna';
  }
  const near = (y, r) => y != null && Math.abs(y - r.y1) <= r.step / 2 + EPS;
  const fmt = v => { const r = +v.toFixed(2); return Number.isInteger(r) ? String(r).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(r); };
  const times = (a, b) => { const k = b / a; return k >= 1 ? `×${fmt(k)}` : `÷${fmt(1 / k)}`; };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => near(state.ys?.[i], r));
    const solution = params.rounds.map(r => `${fmt(r.y1)} ${r.uy || ''} (${kindOf(r.x0, r.y0, r.x1, r.y1)})`.replace('  ', ' ')).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { ys: R.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], area = null, bars = [], minus = null, plus = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      area = { y0: 166, y1: h - 100 };
      const bw = Math.min(46, (w - 60) / 6), cx = [w * 0.27, w * 0.73];
      bars = [cx[0] - bw - 6, cx[0] + 6, cx[1] - bw - 6, cx[1] + 6].map(x => ({ x, w: bw }));
      minus = { x: 14, y: h - 52, w: 64, h: 38 }; plus = { x: w - 78, y: h - 52, w: 64, h: 38 };
    }
    const scaleX = r => Math.max(r.x0, r.x1) * 1.15;
    const py = (v, top) => area.y1 - (v / top) * (area.y1 - area.y0);
    function setY(my) {
      const r = R[cur], v = (area.y1 - my) / (area.y1 - area.y0) * r.ymax;
      st.ys[cur] = Math.min(r.ymax, Math.max(0, Math.round(v / r.step) * r.step));
      api.ready(st.ys.every(y => y != null));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function bar(b, v, top, col, label, live) {
        const y = py(v, top);
        p.noStroke(); p.fill(C.card); p.rect(b.x, area.y0, b.w, area.y1 - area.y0, 8);
        p.fill(col); p.rect(b.x, y, b.w, area.y1 - y, 8);
        if (live) { p.stroke(C.ink); p.strokeWeight(2); p.line(b.x - 4, y, b.x + b.w + 4, y); }
        p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM);
        fitText(p, label, b.x + b.w / 2, y - 4, b.w + 30, 13);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], y1 = st.ys[cur], good = near(y1, r), xt = scaleX(r);
        drawTabs(p, C, tabs, cur, i => (locked ? (near(st.ys[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.ys[i] != null ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textStyle(p.NORMAL); p.textSize(13); p.textAlign(p.LEFT, p.TOP);
        p.text(r.text, 14, 48, W - 28, 60);
        // Encabezados de las columnas y leyenda de colores
        p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.fill(C.mute);
        p.text('Antes', W * 0.27, 118); p.text('Después', W * 0.73, 118);
        p.textSize(11); p.textStyle(p.NORMAL);
        p.fill(C.N); p.text(`■ ${r.nx}`, W * 0.27, 136); p.fill(C.Z); p.text(`■ ${r.ny}`, W * 0.73, 136);
        bar(bars[0], r.x0, xt, C.sun, `${fmt(r.x0)}`, false);
        bar(bars[1], r.y0, r.ymax, C.sky, `${fmt(r.y0)}`, false);
        bar(bars[2], r.x1, xt, C.sun, `${fmt(r.x1)}`, false);
        if (y1 != null) bar(bars[3], y1, r.ymax, good && locked ? C.ok : C.sky, `${fmt(y1)}`, !locked);
        else { p.noStroke(); p.fill(C.card); p.rect(bars[3].x, area.y0, bars[3].w, area.y1 - area.y0, 8); p.fill(C.mute); p.textSize(22); p.textStyle(p.BOLD); p.text('?', bars[3].x + bars[3].w / 2, (area.y0 + area.y1) / 2); }
        // Cuánto se multiplicó cada una (debajo de las barras)
        p.noStroke(); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const yy = area.y1 + 16;
        p.fill(C.N); fitText(p, `${r.nx} ${times(r.x0, r.x1)}`, W * 0.3, yy, W * 0.42, 12);
        if (y1) { p.fill(C.Z); fitText(p, `${r.ny} ${times(r.y0, y1)}`, W * 0.72, yy, W * 0.42, 12); }
        // Botones y pie
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => {
          drawTile(p, C, b, s, { fill: locked ? C.card : C.sky, ink: locked ? C.mute : undefined, r: 8, lift: 2, size: 20 });
        });
        p.noStroke(); p.textSize(12); p.textAlign(p.CENTER, p.CENTER);
        if (locked) {
          const k = kindOf(r.x0, r.y0, r.x1, r.y1);
          p.fill(good ? C.ok : C.bad); p.textStyle(p.BOLD);
          fitText(p, `${fmt(r.y1)} ${r.uy || ''}`, W / 2, minus.y + 10, W - 170, 13); fitText(p, `relación ${k}`, W / 2, minus.y + 28, W - 170, 13);
        } else { p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, `Arrastra la barra azul de «Después»`, W / 2, minus.y + minus.h / 2, W - 170, 12); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = R[cur];
        if (hitBox(minus, p.mouseX, p.mouseY) || hitBox(plus, p.mouseX, p.mouseY)) {
          const d = hitBox(plus, p.mouseX, p.mouseY) ? 1 : -1, y = st.ys[cur] ?? r.y0;
          st.ys[cur] = Math.min(r.ymax, Math.max(0, +(y + d * r.step).toFixed(6)));
          api.ready(st.ys.every(y => y != null)); api.sfx?.tap?.(); return false;
        }
        const b = bars[3];
        if (p.mouseX > b.x - 24 && p.mouseX < b.x + b.w + 24 && p.mouseY > area.y0 - 20 && p.mouseY < area.y1 + 10) { drag = true; setY(p.mouseY); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { setY(p.mouseY); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ ys: [...st.ys] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, kindOf };
})();
;
//#archivo js/games/estira-barra.js
// La barra elástica (Álgebra 1.3, porcentajes): la barra punteada es el 100 % de una cantidad. Hay que
// estirarla o encogerla (arrastre del tirador o − / +, de 1 % en 1 %) hasta lo que pide la ronda: «el 60 %
// más» es estirarla al 160 %, «el 15 % menos» es dejarla en el 85 %, «la quinta parte» es el 20 %. Encima
// se ve el porcentaje y debajo cuánto vale la barra.
// params = { rounds: [{ base, text, pct }], max }   state = { pcts: [p | null] }

GAMES['estira-barra'] = (() => {
  const valueAt = (base, pct) => +(base * pct / 100).toFixed(6);
  const fmt = v => { const r = +v.toFixed(2); return Number.isInteger(r) ? String(r).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(r); };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.pcts?.[i] === r.pct);
    const solution = params.rounds.map(r => `${r.pct} % de ${fmt(r.base)} = ${fmt(valueAt(r.base, r.pct))}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds, max = params.max ?? 200;
    const st = { pcts: R.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], bar = null, minus = null, plus = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      bar = { x0: 20, x1: w - 20, y: h * 0.48, h: 46 };
      minus = { x: 14, y: h - 52, w: 64, h: 38 }; plus = { x: w - 78, y: h - 52, w: 64, h: 38 };
    }
    const X = pct => bar.x0 + (pct / max) * (bar.x1 - bar.x0);
    function setPct(mx) {
      const v = Math.round((mx - bar.x0) / (bar.x1 - bar.x0) * max);
      st.pcts[cur] = Math.min(max, Math.max(0, v));
      api.ready(st.pcts.every(x => x != null));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], pc = st.pcts[cur] ?? 100, good = st.pcts[cur] === r.pct;
        drawTabs(p, C, tabs, cur, i => (locked ? (st.pcts[i] === R[i].pct ? C.ok : C.bad) : i === cur ? C.brand : st.pcts[i] != null ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(17); p.textAlign(p.LEFT, p.TOP);
        p.text(r.text, 14, 50, W - 28, 50);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12);
        p.text(`La barra punteada es el 100 % = ${fmt(r.base)}`, 14, 104);

        // Regla de porcentajes
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = 0; k <= max; k += 10) {
          const big = k % 50 === 0, x = X(k);
          p.line(x, bar.y - bar.h / 2 - (big ? 14 : 7), x, bar.y - bar.h / 2 - 2);
          if (big) { p.noStroke(); p.fill(C.mute); p.textSize(10); p.textAlign(p.CENTER, p.BOTTOM); p.text(`${k}%`, x, bar.y - bar.h / 2 - 15); p.stroke(C.line); }
        }
        // El 100 % de referencia y la barra elástica
        const col = locked ? (good ? C.ok : C.bad) : pc > 100 ? C.mint : pc < 100 ? C.coral : C.sky;
        p.noStroke(); p.fill(col); p.rect(bar.x0, bar.y - bar.h / 2, Math.max(0, X(pc) - bar.x0), bar.h, 10);
        p.noFill(); p.stroke(C.ink); p.strokeWeight(2); p.drawingContext.setLineDash([6, 5]);
        p.rect(bar.x0, bar.y - bar.h / 2 - 6, X(100) - bar.x0, bar.h + 12, 12); p.drawingContext.setLineDash([]);
        // Tirador
        p.stroke(C.creamD); p.strokeWeight(2); p.fill(C.cream); p.rect(X(pc) - 9, bar.y - 30, 18, 60, 8);
        p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(pc) - 3, bar.y - 10, X(pc) - 3, bar.y + 10); p.line(X(pc) + 3, bar.y - 10, X(pc) + 3, bar.y + 10);
        // Lecturas
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER);
        drawPill(p, C, `${pc} %`, W / 2, bar.y + 62, col, 24);
        p.fill(C.ink); p.textSize(16); p.text(`vale ${fmt(valueAt(r.base, pc))}`, W / 2, bar.y + 94);
        const diff = pc - 100;
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12);
        p.text(diff === 0 ? 'igual que el original' : diff > 0 ? `el original y ${diff} % más` : `el original menos el ${-diff} %`, W / 2, bar.y + 120);
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => {
          drawTile(p, C, b, s, { fill: locked ? C.card : C.sky, ink: locked ? C.mute : undefined, r: 8, lift: 2, size: 20 });
        });
        if (locked && !good) { p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(12); fitText(p, `Era el ${r.pct} %: ${fmt(valueAt(r.base, r.pct))}`, W / 2, minus.y + 19, W - 170, 12); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const d = hitBox(plus, p.mouseX, p.mouseY) ? 1 : hitBox(minus, p.mouseX, p.mouseY) ? -1 : 0;
        if (d) { st.pcts[cur] = Math.min(max, Math.max(0, (st.pcts[cur] ?? 100) + d)); api.ready(st.pcts.every(x => x != null)); api.sfx?.tap?.(); return false; }
        if (Math.abs(p.mouseY - bar.y) < 50 && p.mouseX > bar.x0 - 10 && p.mouseX < bar.x1 + 10) { drag = true; setPct(p.mouseX); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { setPct(p.mouseX); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.15);

    return {
      loaded: m.ready,
      getState: () => ({ pcts: [...st.pcts] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, valueAt };
})();
;
//#archivo js/games/crece-planta.js
// El semillero del interés (Álgebra 1.4, interés simple y compuesto): cuatro macetas, una por mes (0 a 3).
// Las plantas de los meses 0 y 1 ya crecieron con el dinero de la cuenta; la etiqueta dice si el interés es
// simple o compuesto. Hay que hacer crecer las de los meses 2 y 3 (arrastre o −10, −1, +1, +10): con
// interés simple la planta crece lo mismo cada mes; con compuesto crece cada vez más, porque el interés
// también gana interés.
// params = { rounds: [{ kind: 'simple' | 'compuesto', C, M1, step }] }   state = { hs: [[m2, m3]] }

GAMES['crece-planta'] = (() => {
  function targets(r) {
    if (r.kind === 'simple') { const d = r.M1 - r.C; return [r.M1 + d, r.M1 + 2 * d]; }
    const f = r.M1 / r.C;
    return [+(r.M1 * f).toFixed(2), +(r.M1 * f * f).toFixed(2)];
  }
  const near = (h, r) => { const t = targets(r); return !!h && h.every((v, k) => v != null && Math.abs(v - t[k]) <= (r.step ?? 1) / 2 + 1e-9); };
  const fmt = v => { const r = +v.toFixed(2); return Number.isInteger(r) ? String(r).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(r); };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => near(state.hs?.[i], r));
    const solution = params.rounds.map(r => { const t = targets(r); return `${r.kind}: ${fmt(r.C)}, ${fmt(r.M1)}, ${fmt(t[0])}, ${fmt(t[1])}`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { hs: R.map(() => [null, null]) };
    let locked = false, W = 0, H = 0, cur = 0, sel = 0, tabs = [], pots = [], soil = 0, top = 0, btns = [], drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      top = 96; soil = h - 118;
      const pw = (w - 28) / 4;
      pots = [0, 1, 2, 3].map(k => ({ cx: 14 + pw * (k + 0.5), w: pw }));
      const labels = ['−10', '−1', '+1', '+10'], bw = (w - 28 - 3 * 8) / 4;
      btns = labels.map((t, k) => ({ t, d: [-10, -1, 1, 10][k], x: 14 + k * (bw + 8), y: h - 50, w: bw, h: 36 }));
    }
    const hmax = r => Math.max(...targets(r), r.M1) * 1.25;
    // La escala arranca un poco por debajo del capital para que se note cuánto crece cada mes.
    const hmin = r => r.C * 0.8;
    const Y = (v, r) => soil - Math.max(0, (v - hmin(r)) / (hmax(r) - hmin(r))) * (soil - top);
    const fromY = (y, r) => hmin(r) + (soil - y) / (soil - top) * (hmax(r) - hmin(r));
    const ready = () => api.ready(st.hs.every(h => h.every(v => v != null)));
    function setH(k, v) {
      const r = R[cur], s = r.step ?? 1;
      st.hs[cur][k] = Math.min(Math.floor(hmax(r)), Math.max(Math.ceil(hmin(r)), Math.round(v / s) * s)); ready();
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function plant(cx, v, r, col, active) {
        const y = Y(v, r);
        p.stroke(col); p.strokeWeight(4); p.line(cx, soil, cx, y);
        const leaves = Math.max(1, Math.floor((soil - y) / 26));
        for (let k = 1; k <= leaves; k++) {
          const ly = soil - k * (soil - y) / (leaves + 0.5), dir = k % 2 ? 1 : -1;
          p.noStroke(); p.fill(col); p.ellipse(cx + dir * 9, ly, 16, 8);
        }
        p.noStroke(); p.fill(C.N); p.circle(cx, y, active ? 18 : 14);
        p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM); fitText(p, fmt(v), cx, y - 11, 80, 12);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], hs = st.hs[cur], ok = near(hs, r), t = targets(r);
        drawTabs(p, C, tabs, cur, i => (locked ? (near(st.hs[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.hs[i].every(v => v != null) ? C.Z : C.line));
        p.noStroke(); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(14);
        p.fill(r.kind === 'simple' ? C.Z : C.R); p.text(`Interés ${r.kind}`, 14, 56);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); if (!(locked && !ok)) p.text('Haz crecer las plantas de los meses 2 y 3', 14, 76);
        // Macetas
        pots.forEach((pt, k) => {
          const v = k === 0 ? r.C : k === 1 ? r.M1 : hs[k - 2];
          const active = k >= 2 && sel === k - 2 && !locked;
          if (k >= 2 && active) { p.noStroke(); p.fill(C.card); p.rect(pt.cx - pt.w / 2 + 4, top - 10, pt.w - 8, soil - top + 14, 10); }
          if (v != null) {
            const col = k < 2 ? C.Q : locked ? (Math.abs(v - t[k - 2]) <= (r.step ?? 1) / 2 + 1e-9 ? C.ok : C.bad) : C.Q;
            plant(pt.cx, v, r, col, active);
          } else { p.noStroke(); p.fill(C.mute); p.textSize(22); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.text('?', pt.cx, (top + soil) / 2); }
          p.noStroke(); p.fill(C.N); p.rect(pt.cx - 22, soil, 44, 26, 0, 0, 8, 8);
          p.fill(C.ink); p.textStyle(p.NORMAL); p.textSize(11); p.textAlign(p.CENTER, p.TOP); p.text(`mes ${k}`, pt.cx, soil + 30);
        });
        // Cuánto creció cada mes
        p.textSize(11); p.textAlign(p.CENTER, p.CENTER);
        const vals = [r.C, r.M1, hs[0], hs[1]];
        for (let k = 1; k < 4; k++) if (vals[k] != null && vals[k - 1] != null) {
          const d = vals[k] - vals[k - 1];
          p.fill(C.mute); p.text(`${d >= 0 ? '+' : '−'}${fmt(Math.abs(d))}`, (pots[k - 1].cx + pots[k].cx) / 2, soil + 46);
        }
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.brand); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 8);
          p.noStroke(); p.fill(locked ? C.mute : C.brand); p.textStyle(p.BOLD); p.textSize(14); p.textAlign(p.CENTER, p.CENTER); p.text(b.t, b.x + b.w / 2, b.y + b.h / 2);
        });
        if (locked && !ok) { p.noStroke(); p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.LEFT, p.CENTER); p.text(`Meses 2 y 3: ${fmt(t[0])} y ${fmt(t[1])}`, 14, 76); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; sel = 0; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (b) { const r = R[cur], v = st.hs[cur][sel] ?? (sel ? st.hs[cur][0] ?? r.M1 : r.M1); setH(sel, v + b.d * (r.step ?? 1)); api.sfx?.tap?.(); return false; }
        const k = pots.findIndex((pt, k) => k >= 2 && Math.abs(p.mouseX - pt.cx) < pt.w / 2 && p.mouseY > top - 20 && p.mouseY < soil + 10);
        if (k >= 2) {
          sel = k - 2;
          // Tocar la maceta (abajo) solo la elige para afinar con los botones; tocar arriba la hace crecer.
          if (p.mouseY < soil - 6) { drag = true; setH(sel, fromY(p.mouseY, R[cur])); }
          api.sfx?.tap?.(); return false;
        }
      };
      p.mouseDragged = () => { if (drag && !locked) { setH(sel, fromY(p.mouseY, R[cur])); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ hs: st.hs.map(h => [...h]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, targets };
})();
;
//#archivo js/games/tamiz-rango.js
// El tamiz (Álgebra 0, alg-0a; spec 2026-11-18-algebra-revision): de la comprensión a la extensión, con palabras. Una
// tira ordenada (los días de la semana, los meses, las letras) y dos corchetes que se arrastran por los huecos: lo que
// queda adentro se enciende y abajo se escribe el conjunto por extensión con su cardinal. Hay que dejar adentro justo lo
// que cumple la regla («desde», «hasta», «después de», «antes de»). Si los corchetes se juntan no queda nada: el vacío.
// Esta unidad aún no usa números ni desigualdades (spec 2026-11-11-conjuntos-desde-cero).
// params = { rounds: [{ text, name, labels: [..], lo, hi }] }   (cumplen labels[lo..hi]; lo > hi = vacío)
// state = { rounds: [{ L, R }] }   (corchetes en medios: quedan adentro las posiciones k con L < k < R)
GAMES['tamiz-rango'] = (() => {
  const inside = s => { const o = []; for (let k = Math.ceil(s.L); k < s.R; k++) if (k > s.L) o.push(k); return o; };
  const want = r => { const o = []; for (let k = r.lo; k <= r.hi; k++) o.push(k); return o; };
  const answer = r => ({ L: r.lo - 0.5, R: Math.max(r.lo, r.hi + 1) - 0.5 });
  const tset = (r, ks) => (ks.length ? `\\{${ks.map(k => `\\text{${r.labels[k]}}`).join(', ')}\\}` : '\\varnothing');
  const last = r => r.labels.length - 1;
  const game = roundsGame({
    aspect: 1.1,
    init: r => ({ L: -0.5, R: last(r) + 0.5 }),
    ok: (s, r) => inside(s).join() === want(r).join(),
    solution: r => `${r.name} = ${want(r).length ? `{${want(r).map(k => r.labels[k]).join(', ')}}` : '∅'}`,
    prompt: r => `${r.name}: ${r.text}`,
    foot: () => 'Arrastra los corchetes por los huecos de la tira',
    layout(G) { game.layoutFor(G); },
    enter(G) { G.grab = null; game.layoutFor(G); },
    draw(G) {
      game.layoutFor(G);
      const { p, C, r } = G, ok = game.isOk(G), s = G.locked && !ok ? answer(r) : G.s, inn = inside(s), A = SK.sets(C)[0];
      const X = v => G.x0 + (v + 0.5) * G.u;
      // La banda del conjunto, entre los dos corchetes.
      p.noStroke(); p.fill(SK.al(p, A.line, 40)); p.rect(X(s.L), G.y - 26, X(s.R) - X(s.L), 52, 8);
      r.labels.forEach((lab, k) => {
        const on = inn.includes(k), w = Math.min(44, G.u - 4);
        SK.chip(p, C, { x: X(k) - w / 2, y: G.y - 15, w, h: 30 }, lab, { state: on ? (G.locked ? 'ok' : 'on') : 'idle', size: 12, r: 8 });
      });
      // Los corchetes con su manija.
      [['L', '['], ['R', ']']].forEach(([key, ch]) => {
        const x = X(s[key]), c = G.grab === key ? C.brand : A.line;
        p.stroke(c); p.strokeWeight(3); p.noFill();
        const d = key === 'L' ? 7 : -7; p.line(x + d, G.y - 34, x, G.y - 34); p.line(x, G.y - 34, x, G.y + 34); p.line(x, G.y + 34, x + d, G.y + 34);
        p.stroke(c); p.fill(C.card); p.circle(x, G.y + 52, 22); p.noStroke(); p.fill(c); p.textAlign(p.CENTER, p.CENTER); p.textSize(13); p.text(ch, x, G.y + 52);
      });
      SK.formal(p, C, G.fb, `$${r.name} = ${tset(r, inn)}\\qquad n(${r.name}) = ${inn.length}$`, { kicker: 'Por extensión', col: G.locked ? C.ok : A.line, size: 16 });
    },
    press(G, x, y) {
      if (y < G.y - 50 || y > G.y + 70) return false;
      const X = v => G.x0 + (v + 0.5) * G.u, dl = Math.abs(x - X(G.s.L)), dr = Math.abs(x - X(G.s.R));
      G.grab = dl < dr || (dl === dr && x < X(G.s.L)) ? 'L' : 'R'; game.move(G, x); return true;
    },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo(G) { const X = v => G.x0 + (v + 0.5) * G.u; return { from: { x: X(G.s.L), y: G.y + 52 }, to: { x: X(G.s.L + 2), y: G.y + 52 }, text: 'Arrastra cada corchete', ty: G.y - 62 }; },
    peek: G => ({ y: G.y, u: G.u, x0: G.x0, want: want(G.r) }),
  });
  game.layoutFor = G => { G.u = (G.W - 28) / G.r.labels.length; G.x0 = 14; G.y = G.H * 0.44; G.fb = { x: 12, y: G.H - 92, w: G.W - 24, h: 58 }; };
  game.isOk = G => inside(G.s).join() === want(G.r).join();
  // El dedo lleva el corchete al hueco más cercano; los dos corchetes no se cruzan.
  game.move = (G, x) => {
    const v = Math.max(-0.5, Math.min(last(G.r) + 0.5, Math.round((x - G.x0) / G.u) - 0.5)), s = G.s, nv = G.grab === 'L' ? Math.min(v, s.R) : Math.max(v, s.L);
    if (nv !== s[G.grab] || !G.touched[G.cur]) { s[G.grab] = nv; G.touch(); }
  };
  return Object.assign(game, { inside, want, answer });
})();
;
//#archivo js/games/cajas-anidadas.js
// Cajas dentro de cajas (Álgebra 0, alg-0a; spec 2026-11-18-algebra-revision): un conjunto puede tener conjuntos como
// elementos. Arriba está la caja A (una membrana) y abajo una bandeja con números sueltos y bolsas: {2, 3} es una bolsa
// con dos fichas, ∅ es una bolsa vacía y {∅} es una bolsa que guarda una bolsa vacía. Se arrastran a A las piezas que
// pide la notación, y A cuenta sus elementos: una bolsa cuenta como uno solo, tenga lo que tenga adentro.
// params = { rounds: [{ name, target: [etiquetas], tray: [etiquetas] }] }   (etiquetas: '1', '{2, 3}', '∅', '{∅}')
// state = { rounds: [{ in: [índices de la bandeja] }] }
GAMES['cajas-anidadas'] = (() => {
  const kids = l => (l === '∅' ? [] : l.startsWith('{') ? l.slice(1, -1).split(', ') : null);   // null = ficha suelta
  const tex = l => (l === '∅' ? '\\varnothing' : l.startsWith('{') ? `\\{${kids(l).map(tex).join(', ')}\\}` : l);
  let same = (s, r) => s.in.map(i => r.tray[i]).sort().join('|') === [...r.target].sort().join('|');
  const sizeOf = l => { const k = kids(l); return k === null ? { w: 40, h: 30 } : { w: Math.max(44, 18 + k.length * 30), h: 38 }; };
  // Dibuja una pieza centrada en (x, y): ficha o bolsa con lo que tiene adentro.
  function piece(p, C, l, x, y, st, col) {
    const k = kids(l), { w, h } = sizeOf(l);
    if (k === null) return SK.chip(p, C, { x: x - w / 2, y: y - h / 2, w, h }, l, { state: st, col, size: 14, r: 9 });
    SK.membrane(p, C, x, y, w / 2, h / 2, st === 'bad' ? C.bad : st === 'ok' ? C.ok : col, { fill: st === 'idle' ? 14 : 40, w: 1.6 });
    k.forEach((c, j) => {
      const cx = x - (k.length - 1) * 15 + j * 30;
      if (c === '∅') SK.membrane(p, C, cx, y, 11, 8, col, { fill: 10, w: 1.2 });
      else SK.chip(p, C, { x: cx - 12, y: y - 10, w: 24, h: 20 }, c, { state: 'idle', size: 11, r: 7 });
    });
  }
  same = velo(same);
  const game = roundsGame({
    aspect: 1.4,
    init: () => ({ in: [] }),
    ok: same,
    answered: s => s.in.length > 0,
    solution: r => `${r.name} = {${r.target.join(', ')}}: ${r.target.length} elemento${r.target.length === 1 ? '' : 's'}`,
    prompt: r => `Arma $${r.name} = \\{${r.target.map(tex).join(', ')}\\}$`,
    foot: () => 'Arrastra a la membrana las piezas que pide la notación',
    layout(G) { const W = G.W, H = G.H; G.box = { x: W / 2, y: H * 0.36, rx: W / 2 - 22, ry: H * 0.13 }; G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 }; G.trayY = H * 0.6; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, box } = G, A = SK.sets(C)[0], good = same(G.s, r);
      const s = G.locked && !good ? { in: r.target.map(t => r.tray.indexOf(t)) } : G.s;
      SK.membrane(p, C, box.x, box.y, box.rx, box.ry, A.line, { fill: 24 });
      SK.tag(p, C, r.name, box.x - box.rx + 2, box.y, A);
      // Lo que está adentro, en fila.
      G.spots = {};
      // Si lo de adentro no cabe en una fila, va en dos.
      const ws = s.in.map(i => sizeOf(r.tray[i]).w), tot = ws.reduce((a, b) => a + b + 10, -10), two = tot > 2 * box.rx - 40, half = two ? Math.ceil(s.in.length / 2) : s.in.length;
      const rowW = (j0, j1) => ws.slice(j0, j1).reduce((a, b) => a + b + 10, -10);
      let x = box.x - rowW(0, half) / 2;
      s.in.forEach((i, j) => { if (j === half) x = box.x - rowW(half) / 2; const cx = x + ws[j] / 2, cy = two ? box.y + (j < half ? -21 : 21) : box.y; x += ws[j] + 10; if (G.drag?.i === i) return; G.spots[i] = { x: cx, y: cy }; piece(p, C, r.tray[i], cx, cy, G.locked ? 'ok' : 'on', A.line); });
      // La bandeja: dos filas.
      const rest = r.tray.map((_, i) => i).filter(i => !s.in.includes(i)), rows = [rest.slice(0, Math.ceil(rest.length / 2)), rest.slice(Math.ceil(rest.length / 2))];
      rows.forEach((row, ri) => {
        const ws2 = row.map(i => sizeOf(r.tray[i]).w), t2 = ws2.reduce((a, b) => a + b + 12, -12); let xx = G.W / 2 - t2 / 2;
        row.forEach((i, j) => { const cx = xx + ws2[j] / 2; xx += ws2[j] + 12; if (G.drag?.i === i) return; G.spots[i] = { x: cx, y: G.trayY + ri * 46 }; piece(p, C, r.tray[i], cx, G.trayY + ri * 46, 'idle', A.line); });
      });
      if (G.drag) piece(p, C, r.tray[G.drag.i], G.drag.x, G.drag.y, 'on', C.brand);
      const els = s.in.map(i => tex(r.tray[i]));
      SK.formal(p, C, G.fb, `$${r.name} = ${els.length ? `\\{${els.join(', ')}\\}` : '\\varnothing'}\\qquad n(${r.name}) = ${els.length}$`, { kicker: 'Lo que hay adentro', col: G.locked ? C.ok : A.line });
    },
    press(G, x, y) {
      const hit = Object.entries(G.spots || {}).find(([i, q]) => { const { w, h } = sizeOf(G.r.tray[i]); return Math.abs(x - q.x) < w / 2 + 4 && Math.abs(y - q.y) < h / 2 + 4; });
      if (!hit) return false;
      G.drag = { i: +hit[0], x, y }; return true;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      if (!G.drag) return;
      const i = G.drag.i, b = G.box, inBox = ((x - b.x) / b.rx) ** 2 + ((y - b.y) / b.ry) ** 2 < 1.1, s = G.s, k = s.in.indexOf(i);
      if (inBox && k < 0) s.in.push(i); else if (!inBox && k >= 0) s.in.splice(k, 1);
      G.drag = null; G.touch();
    },
    demo(G) { const i = G.r.tray.findIndex((t, j) => !G.s.in.includes(j) && G.r.target.includes(t)), q = G.spots?.[i]; return q ? { from: q, to: { x: G.box.x, y: G.box.y }, text: 'Arrastra cada pieza a la membrana', ty: G.H - 104 } : null; },
    peek: G => ({ spots: G.spots, box: G.box }),
  });
  return Object.assign(game, { tex, kids });
})();
;
//#archivo js/games/gemelos.js
// Gemelos (Álgebra 0, alg-0a; spec 2026-11-18-algebra-revision): igualdad e inclusión de conjuntos. A y B son dos
// membranas con sus elementos, escritos en otro orden y a veces repetidos. Un hilo une cada elemento con su gemelo del
// otro lado. Cada ronda pide una relación (A = B, A ⊆ B o A ∩ B = ∅) y se logra sacando a la papelera lo que estorba,
// sin sacar nada de más. Los repetidos no estorban: un conjunto no cambia por escribir dos veces el mismo elemento.
// params = { rounds: [{ A: [..], B: [..], goal: '=' | 'sub' | 'disj' }] }   state = { rounds: [{ outA: [índices], outB: [índices] }] }
GAMES['gemelos'] = (() => {
  // Lo que hay que sacar de cada lado, lo mínimo.
  function need(r) {
    const inA = v => r.A.includes(v), inB = v => r.B.includes(v), idx = (L, f) => L.map((v, i) => (f(v) ? i : -1)).filter(i => i >= 0);
    if (r.goal === '=') return { A: idx(r.A, v => !inB(v)), B: idx(r.B, v => !inA(v)) };
    if (r.goal === 'sub') return { A: idx(r.A, v => !inB(v)), B: [] };
    return { A: [], B: idx(r.B, inA) };
  }
  const sorted = a => [...a].sort((x, y) => x - y).join();
  let ok = (s, r) => { const n = need(r); return sorted(s.outA) === n.A.join() && sorted(s.outB) === n.B.join(); };
  const GOAL = { '=': ['Haz que A = B', 'A = B'], sub: ['Haz que A ⊆ B', 'A ⊆ B'], disj: ['Haz que A y B sean disjuntos: saca solo de B', 'A ∩ B = ∅'] };
  const tset = xs => (xs.length ? `\\{${[...new Set(xs)].join(', ')}\\}` : '\\varnothing');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.45,
    init: () => ({ outA: [], outB: [] }),
    ok,
    answered: s => s.outA.length + s.outB.length > 0,
    solution: r => { const n = need(r); return `sacar ${[...n.A.map(i => r.A[i]), ...n.B.map(i => r.B[i])].join(', ')}`; },
    prompt: r => GOAL[r.goal][0],
    foot: () => 'Arrastra a la papelera lo que estorba; los hilos unen elementos iguales',
    layout(G) { const W = G.W, H = G.H; const cy = (112 + H - 162) / 2; G.cA = { x: W * 0.27, y: cy }; G.cB = { x: W * 0.73, y: cy }; G.rx = W * 0.2; G.ry = (H - 274) / 2; G.bin = { x: W / 2 - 50, y: H - 150, w: 100, h: 44 }; G.fb = { x: 12, y: H - 92, w: W - 24, h: 54 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, [SA, SB] = SK.sets(C), good = ok(G.s, r), n = need(r);
      const s = G.locked && !good ? { outA: n.A, outB: n.B } : G.s;
      const pos = (side, i) => { const L = r[side], c = side === 'A' ? G.cA : G.cB, gap = Math.min(36, (2 * G.ry - 30) / L.length); return { x: c.x, y: c.y - (L.length - 1) * gap / 2 + i * gap }; };
      G.pos = pos;
      SK.membrane(p, C, G.cA.x, G.cA.y, G.rx, G.ry, SA.line, { fill: 20 }); SK.membrane(p, C, G.cB.x, G.cB.y, G.rx, G.ry, SB.line, { fill: 20 });
      SK.tag(p, C, 'A', G.cA.x, G.cA.y - G.ry - 2, SA); SK.tag(p, C, 'B', G.cB.x, G.cB.y - G.ry - 2, SB);
      // Hilos entre gemelos que siguen adentro.
      r.A.forEach((v, i) => { if (s.outA.includes(i)) return; r.B.forEach((w, j) => { if (w !== v || s.outB.includes(j)) return; const a = pos('A', i), b = pos('B', j); p.noFill(); p.stroke(SK.al(p, C.brand, 170)); p.strokeWeight(1.6); p.bezier(a.x + 22, a.y, a.x + 70, a.y, b.x - 70, b.y, b.x - 22, b.y); }); });
      // La papelera.
      p.stroke(C.line); p.strokeWeight(1.2); p.fill(SK.al(p, C.card, 200)); p.rect(G.bin.x, G.bin.y, G.bin.w, G.bin.h, 10);
      TK.label(p, C, 'papelera', G.bin.x + G.bin.w / 2, G.bin.y - 9, C.mute, 10, 90);
      const gone = [...s.outA.map(i => ['A', i]), ...s.outB.map(i => ['B', i])];
      G.spots = [];
      ['A', 'B'].forEach(side => r[side].forEach((v, i) => {
        const out = (side === 'A' ? s.outA : s.outB).includes(i);
        if (out) return;
        const q = pos(side, i); G.spots.push({ side, i, x: q.x, y: q.y });
        if (G.drag?.side === side && G.drag.i === i) return;
        SK.chip(p, C, { x: q.x - 20, y: q.y - 14, w: 40, h: 28 }, v, { state: 'on', col: side === 'A' ? SA.line : SB.line, size: 14, r: 9 });
      }));
      gone.forEach(([side, i], k) => { const x = G.bin.x + 18 + (k % 4) * 22, y = G.bin.y + 14 + Math.floor(k / 4) * 18; G.spots.push({ side, i, x, y, out: true }); if (!(G.drag?.side === side && G.drag.i === i)) SK.chip(p, C, { x: x - 10, y: y - 9, w: 20, h: 18 }, r[side][i], { state: G.locked ? 'ok' : 'idle', size: 10, r: 6 }); });
      if (G.drag) SK.chip(p, C, { x: G.drag.x - 20, y: G.drag.y - 14, w: 40, h: 28 }, r[G.drag.side][G.drag.i], { state: 'on', col: C.brand, size: 14, r: 9 });
      const keep = side => r[side].filter((_, i) => !(side === 'A' ? s.outA : s.outB).includes(i));
      SK.formal(p, C, G.fb, `$A = ${tset(keep('A'))}\\quad B = ${tset(keep('B'))}$`, { raw: true, kicker: `Meta: ${GOAL[r.goal][1]}`, col: G.locked ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const q = (G.spots || []).find(q => Math.abs(x - q.x) < (q.out ? 12 : 22) && Math.abs(y - q.y) < (q.out ? 10 : 15));
      if (!q) return false;
      G.drag = { side: q.side, i: q.i, out: !!q.out, x, y }; return true;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const L = d.side === 'A' ? G.s.outA : G.s.outB, b = G.bin, inBin = x > b.x - 10 && x < b.x + b.w + 10 && y > b.y - 16 && y < b.y + b.h + 10;
      if (!d.out && inBin) { L.push(d.i); G.touch(); } else if (d.out && !inBin) { L.splice(L.indexOf(d.i), 1); G.touch(); }
    },
    demo(G) { const n = need(G.r), q = n.A.length ? G.pos?.('A', n.A[0]) : n.B.length ? G.pos?.('B', n.B[0]) : null; return q ? { from: q, to: { x: G.bin.x + G.bin.w / 2, y: G.bin.y + 20 }, text: 'Arrastra a la papelera lo que estorba', ty: 108 } : null; },
    peek: G => ({ spots: G.spots, bin: G.bin, need: need(G.r) }),
  });
  return Object.assign(game, { need });
})();
;
//#archivo js/games/escalera-inclusion.js
// Muñecas de conjuntos (Álgebra 0, alg-0b; spec 2026-11-18-algebra-revision): la inclusión como muñecas rusas. Abajo
// hay varios conjuntos sueltos; se arrastran al centro uno por uno y cada nuevo envuelve al anterior, pero solo entra si
// lo contiene (si no, rebota y dice qué le falta). Hay que armar la cadena más larga ⊆ ⊆ ⊆. El vacío cabe dentro de
// cualquiera: por eso una cadena larga empieza por él.
// params = { rounds: [{ sets: [[elementos]] }] }   state = { rounds: [{ tower: [índices, del más pequeño al más grande] }] }
GAMES['escalera-inclusion'] = (() => {
  const sub = (X, Y) => X.every(v => Y.includes(v)) && X.length < Y.length;
  const valid = (t, r) => t.every((k, j) => j === 0 || sub(r.sets[t[j - 1]], r.sets[k]));
  // Largo de la cadena más larga (los conjuntos son pocos: se prueba desde cada uno).
  function longest(r) {
    const memo = {}, from = i => (memo[i] ??= 1 + Math.max(0, ...r.sets.map((Y, j) => (sub(r.sets[i], Y) ? from(j) : 0))));
    return Math.max(...r.sets.map((_, i) => from(i)));
  }
  function chain(r) {   // una cadena más larga (para la solución)
    const L = longest(r), go = t => { if (t.length === L) return t; for (let j = 0; j < r.sets.length; j++) if (!t.includes(j) && (!t.length || sub(r.sets[t.at(-1)], r.sets[j]))) { const o = go([...t, j]); if (o) return o; } return null; };
    return go([]);
  }
  const txt = X => (X.length ? `{${X.join(', ')}}` : '∅');
  const tex = X => (X.length ? `\\{${X.join(', ')}\\}` : '\\varnothing');
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ tower: [] }),
    ok: (s, r) => valid(s.tower, r) && s.tower.length === longest(r),
    answered: s => s.tower.length > 0,
    solution: r => chain(r).map(i => txt(r.sets[i])).join(' ⊆ '),
    prompt: () => 'Arma la cadena más larga: cada uno debe contener al de adentro',
    foot: (r, s) => (s.tower.length ? 'Para sacar el último, arrástralo afuera' : 'Arrastra al centro el que va más adentro'),
    layout(G) { const W = G.W, H = G.H; G.c = { x: W / 2, y: H * 0.42 }; G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 }; G.cardY = H * 0.6; },
    enter(G) { G.drag = null; G.msg = null; },
    draw(G) {
      const { p, C, r } = G, good = game.okOf(G.s, r), s = G.locked && !good ? { tower: chain(r) } : G.s, A = SK.sets(C)[0];
      // Las muñecas: cada conjunto de la torre envuelve al anterior.
      const n = s.tower.length;
      for (let j = n - 1; j >= 0; j--) {
        const k = j + 1, rx = 26 + k * (G.W * 0.38 - 26) / Math.max(n, 3), ry = rx * 0.6;
        SK.membrane(p, C, G.c.x, G.c.y, rx, ry, G.locked ? C.ok : A.line, { fill: 14, w: j === n - 1 ? 2 : 1.4 });
        TK.label(p, C, txt(r.sets[s.tower[j]]), G.c.x, G.c.y - ry + 8, A.ink, 11, rx * 1.6);
      }
      if (!n) { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 4]); p.ellipse(G.c.x, G.c.y, 120, 66); p.drawingContext.setLineDash([]); TK.label(p, C, 'centro', G.c.x, G.c.y, C.mute, 11, 80); }
      // Las tarjetas sueltas.
      const rest = r.sets.map((_, i) => i).filter(i => !s.tower.includes(i)), w = Math.min(96, (G.W - 24) / Math.ceil(rest.length / 2) - 8);
      G.cards = {};
      rest.forEach((i, j) => {
        const row = j % 2, col = Math.floor(j / 2), cols = Math.ceil(rest.length / 2), x = G.W / 2 - (cols * (w + 8) - 8) / 2 + col * (w + 8), y = G.cardY + row * 40;
        G.cards[i] = { x, y, w, h: 32 };
        if (G.drag?.i !== i) SK.chip(p, C, G.cards[i], txt(r.sets[i]), { state: 'idle', size: 13, r: 10 });
      });
      if (G.drag) SK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 16, w, h: 32 }, txt(r.sets[G.drag.i]), { state: 'on', col: C.brand, size: 13, r: 10 });
      if (G.msg && G.t - G.msg.t < 2.4) TK.label(p, C, G.msg.text, G.W / 2, G.cardY - 22, C.bad, 12, G.W - 30);
      SK.formal(p, C, G.fb, `$${s.tower.length ? s.tower.map(i => tex(r.sets[i])).join(' \\subseteq ') : '\\text{(vacía)}'}$`, { kicker: `Cadena · ${s.tower.length} de ${r.sets.length}`, col: G.locked ? C.ok : A.line, size: 16 });
    },
    press(G, x, y) {
      const hit = Object.entries(G.cards || {}).find(([, b]) => hitBox(b, x, y));
      if (hit) { G.drag = { i: +hit[0], x, y, from: 'tray' }; return true; }
      const t = G.s.tower, top = t.at(-1);
      if (top != null && Math.hypot(x - G.c.x, y - G.c.y) < G.W * 0.42) { G.drag = { i: top, x, y, from: 'tower' }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const t = G.s.tower, inCenter = Math.abs(x - G.c.x) < G.W * 0.42 && Math.abs(y - G.c.y) < G.H * 0.2;
      if (d.from === 'tower') { if (!inCenter) { t.pop(); G.touch(); } return; }
      if (!inCenter) return;
      const X = G.r.sets[d.i], top = t.at(-1);
      if (top != null && !sub(G.r.sets[top], X)) { const miss = G.r.sets[top].filter(v => !X.includes(v)); G.msg = { t: G.t, text: miss.length ? `${txt(X)} no contiene a ${miss.join(', ')}` : `${txt(X)} no es más grande que ${txt(G.r.sets[top])}` }; return; }
      t.push(d.i); G.msg = null; G.touch();
    },
    demo(G) { const b = Object.values(G.cards || {})[0]; return b ? { from: { x: b.x + b.w / 2, y: b.y + 16 }, to: G.c, text: 'Arrastra al centro', ty: G.c.y + 70 } : null; },
    peek: G => ({ cards: G.cards, c: G.c, chain: chain(G.r) }),
  });
  game.okOf = (s, r) => valid(s.tower, r) && s.tower.length === longest(r);
  return Object.assign(game, { longest, chain, sub });
})();
;
//#archivo js/games/arbol-partes.js
// El árbol de las partes (Álgebra 0, alg-0b; spec 2026-11-18-algebra-revision): por qué un conjunto de n elementos
// tiene 2ⁿ subconjuntos. Cada elemento que se arrastra al árbol agrega un piso: cada rama se parte en dos, «sin» y «con»
// ese elemento, y las hojas (los subconjuntos) se duplican. Sacar el último elemento quita su piso. Hay que dejar el
// árbol con las hojas que pide la ronda; con ningún elemento queda una sola hoja: el vacío.
// params = { rounds: [{ target, pool: [etiquetas] }] }   state = { rounds: [{ n }] }   (n: elementos en el árbol)
GAMES['arbol-partes'] = (() => {
  const need = r => Math.round(Math.log2(r.target));
  const leaves = (pool, n) => { let L = [[]]; for (let k = 0; k < n; k++) L = L.flatMap(x => [x, [...x, pool[k]]]); return L; };
  const txt = X => (X.length ? `{${X.join(',')}}` : '∅');
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ n: 1 }),
    ok: (s, r) => 2 ** s.n === r.target,
    solution: r => `${need(r)} elemento${need(r) === 1 ? '' : 's'}: 2^${need(r)} = ${r.target} subconjuntos`,
    prompt: r => (r.target === 1 ? 'Haz el árbol de A = ∅: ¿cuántos subconjuntos tiene?' : `Haz crecer el árbol hasta tener ${r.target} subconjuntos`),
    foot: () => 'Arrastra un elemento al árbol para agregar un piso; sácalo para quitarlo',
    layout(G) { const W = G.W, H = G.H; G.top = 104; G.bot = H * 0.56; G.trayY = H - 124; G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, good = !VELO.on && 2 ** G.s.n === r.target, n = G.locked && !good ? need(r) : G.s.n, A = SK.sets(C)[0];
      const levels = Math.max(n, 1), dy = (G.bot - G.top) / levels, xAt = (lev, k) => 16 + (k + 0.5) * (G.W - 32) / 2 ** lev;
      // Las ramas: a la izquierda «sin», a la derecha «con».
      for (let lev = 0; lev < n; lev++) for (let k = 0; k < 2 ** lev; k++) {
        const x = xAt(lev, k), y = G.top + lev * dy;
        p.strokeWeight(lev < 3 ? 2 : 1.2); p.stroke(C.line); p.line(x, y, xAt(lev + 1, 2 * k), y + dy); p.stroke(A.line); p.line(x, y, xAt(lev + 1, 2 * k + 1), y + dy);
      }
      for (let lev = 0; lev < n; lev++) TK.label(p, C, r.pool[lev], 12, G.top + (lev + 0.5) * dy, A.ink, 12, 20);
      // Las hojas.
      const L = leaves(r.pool, n), y = G.top + n * dy;
      L.forEach((X, k) => {
        const x = xAt(n, k);
        if (n <= 3) SK.chip(p, C, { x: x - 18 * (n > 2 ? 0.9 : 1.3), y: y + 4, w: 36 * (n > 2 ? 0.9 : 1.3), h: 22 }, txt(X), { state: G.locked ? 'ok' : 'on', size: 10, r: 7 });
        else { p.noStroke(); p.fill(G.locked ? C.ok : A.line); p.circle(x, y + 8, n > 4 ? 6 : 9); }
      });
      if (!n) SK.chip(p, C, { x: G.W / 2 - 22, y: G.top - 4, w: 44, h: 26 }, '∅', { state: 'on', size: 13 });
      else { p.noStroke(); p.fill(C.ink); p.circle(xAt(0, 0), G.top, 8); }
      // La bandeja de elementos que aún no están en el árbol.
      G.tok = {};
      r.pool.forEach((v, k) => { if (k < n) return; const x = G.W / 2 - (r.pool.length - n - 1) * 22 + (k - n) * 44; G.tok[k] = { x, y: G.trayY }; if (G.drag?.k !== k) SK.chip(p, C, { x: x - 18, y: G.trayY - 14, w: 36, h: 28 }, v, { state: 'idle', size: 14 }); });
      if (G.drag) SK.chip(p, C, { x: G.drag.x - 18, y: G.drag.y - 14, w: 36, h: 28 }, r.pool[G.drag.k], { state: 'on', col: C.brand, size: 14 });
      SK.formal(p, C, G.fb, `$n(A) = ${n}\\qquad n(P(A)) = 2^{${n}} = ${2 ** n}$`, { kicker: 'Subconjuntos de A', col: G.locked ? C.ok : A.line, size: 17 });
    },
    press(G, x, y) {
      const hit = Object.entries(G.tok || {}).find(([, q]) => Math.abs(x - q.x) < 22 && Math.abs(y - q.y) < 18);
      if (hit && +hit[0] === G.s.n) { G.drag = { k: +hit[0], x, y, from: 'tray' }; return true; }
      if (hit) { G.drag = { k: G.s.n, x, y, from: 'tray' }; return true; }
      if (G.s.n > 0 && y > G.top - 20 && y < G.bot + 30) { G.drag = { k: G.s.n - 1, x, y, from: 'tree' }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const onTree = y < G.bot + 30 && y > G.top - 30;
      if (d.from === 'tray' && onTree && G.s.n < G.r.pool.length) { G.s.n++; G.touch(); }
      else if (d.from === 'tree' && !onTree) { G.s.n--; G.touch(); }
    },
    demo(G) { const q = G.tok?.[G.s.n]; return q ? { from: q, to: { x: G.W / 2, y: (G.top + G.bot) / 2 }, text: 'Arrastra un elemento al árbol', ty: G.bot + 12 } : null; },
    peek: G => ({ tok: G.tok, top: G.top, bot: G.bot, need: need(G.r) }),
  });
  return Object.assign(game, { need, leaves });
})();
;
//#archivo js/games/goma-diferencia.js
// La goma (Álgebra 0, alg-0c; spec 2026-11-18-algebra-revision): diferencia, complemento y diferencia simétrica se
// hacen borrando. Arriba está el diagrama de A y B con sus elementos; abajo, el punto de partida de la operación
// (A para A − B, U para el complemento, A ∪ B para la diferencia simétrica). Se arrastran a la goma los elementos que
// hay que quitar, y la escritura formal muestra lo que queda. Lo borrado se puede devolver.
// params = { rounds: [{ op: 'A-B' | 'B-A' | 'Ac' | 'AdB', U, A, B }] }   state = { rounds: [{ gone: [etiquetas] }] }
GAMES['goma-diferencia'] = (() => {
  const uni = (X, Y) => [...X, ...Y.filter(v => !X.includes(v))];
  const start = r => (r.op === 'A-B' ? r.A : r.op === 'B-A' ? r.B : r.op === 'Ac' ? r.U : uni(r.A, r.B));
  const target = r => start(r).filter(v => (r.op === 'A-B' ? !r.B.includes(v) : r.op === 'B-A' ? !r.A.includes(v) : r.op === 'Ac' ? !r.A.includes(v) : !(r.A.includes(v) && r.B.includes(v))));
  const left = (s, r) => start(r).filter(v => !s.gone.includes(v));
  let ok = (s, r) => left(s, r).join() === target(r).join();
  const OP = { 'A-B': ['A - B', 'Parte de A y borra lo que también está en B'], 'B-A': ['B - A', 'Parte de B y borra lo que también está en A'], Ac: ['A^c', 'Parte de U y borra lo que está en A'], AdB: ['A \\,\\triangle\\, B', 'Parte de A ∪ B y borra lo que está en los dos'] };
  const tset = xs => (xs.length ? `\\{${xs.join(', ')}\\}` : '\\varnothing');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.45,
    init: () => ({ gone: [] }),
    ok,
    answered: s => s.gone.length > 0,
    solution: r => `${OP[r.op][0].replace(/\\,|\\triangle|\^c/g, m => (m === '^c' ? 'ᶜ' : m === '\\triangle' ? 'Δ' : ''))} = {${target(r).join(', ')}}`,
    prompt: r => OP[r.op][1],
    foot: () => 'Arrastra a la goma lo que hay que quitar',
    layout(G) {
      const W = G.W, H = G.H; G.box = { x: 12, y: 96, w: W - 24, h: H * 0.34 }; G.cs = SK.venn2(G.box, 0.55, 4);
      G.trayY = G.box.y + G.box.h + 30; G.eraser = { x: W - 86, y: G.trayY + 46, w: 74, h: 40 }; G.fb = { x: 12, y: H - 86, w: W - 24, h: 52 };
    },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, box, cs } = G, [SA, SB] = SK.sets(C), good = ok(G.s, r), s = G.locked && !good ? { gone: start(r).filter(v => !target(r).includes(v)) } : G.s;
      SK.panel(p, C, box, { u: true });
      SK.membrane(p, C, cs[0].x, cs[0].y, cs[0].r, cs[0].r, SA.line, { fill: 22 }); SK.membrane(p, C, cs[1].x, cs[1].y, cs[1].r, cs[1].r, SB.line, { fill: 22 });
      SK.tag(p, C, 'A', cs[0].x - cs[0].r * 0.7, cs[0].y - cs[0].r * 0.75, SA); SK.tag(p, C, 'B', cs[1].x + cs[1].r * 0.7, cs[1].y - cs[1].r * 0.75, SB);
      // Elementos en su zona del diagrama.
      const zone = v => (r.A.includes(v) ? (r.B.includes(v) ? 'AB' : 'A') : r.B.includes(v) ? 'B' : 'U'), cnt = {}, tot = {};
      r.U.forEach(v => { tot[zone(v)] = (tot[zone(v)] || 0) + 1; });
      r.U.forEach(v => {
        const z = zone(v), i = (cnt[z] = (cnt[z] || 0) + 1) - 1, n = tot[z];
        // Los de afuera de A y de B van en columnas junto al borde derecho del universo.
        const pos = z === 'U' ? { x: box.x + box.w - 16 - Math.floor(i / 4) * 20, y: box.y + 30 + (i % 4) * 22 }
          : { x: z === 'A' ? cs[0].x - cs[0].r * 0.45 : z === 'B' ? cs[1].x + cs[1].r * 0.45 : (cs[0].x + cs[1].x) / 2, y: cs[0].y + (i - (n - 1) / 2) * 22 };
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textSize(13); p.text(v, pos.x, pos.y);
      });
      // La bandeja con lo que queda y la goma con lo borrado.
      const rest = start(r).filter(v => !s.gone.includes(v)), w = 36;
      G.spots = [];
      rest.forEach((v, i) => { const x = 18 + (i % 6) * (w + 6), y = G.trayY + Math.floor(i / 6) * 36; G.spots.push({ v, x, y, out: false }); if (G.drag?.v !== v) SK.chip(p, C, { x, y, w, h: 28 }, v, { state: G.locked ? 'ok' : 'on', col: SA.line, size: 13, r: 9 }); });
      const e = G.eraser;
      p.stroke(C.coral); p.strokeWeight(1.6); p.fill(SK.al(p, C.coral, 40)); p.rect(e.x, e.y, e.w, e.h, 10);
      TK.label(p, C, 'goma', e.x + e.w / 2, e.y - 9, C.mute, 10, 60);
      s.gone.forEach((v, i) => { const x = e.x + 3 + (i % 4) * 17.5, y = e.y + 3 + Math.floor(i / 4) * 18; G.spots.push({ v, x, y, out: true }); if (G.drag?.v !== v) SK.chip(p, C, { x, y, w: 16, h: 16 }, v, { state: 'idle', size: 9, r: 5 }); });
      if (G.drag) SK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 14, w, h: 28 }, G.drag.v, { state: 'on', col: C.brand, size: 13, r: 9 });
      SK.formal(p, C, G.fb, `$${OP[r.op][0]} = ${tset(rest)}$`, { kicker: 'Lo que queda', col: G.locked ? C.ok : SA.line, size: 17 });
    },
    press(G, x, y) {
      const q = (G.spots || []).find(q => x > q.x - 4 && x < q.x + (q.out ? 18 : 40) && y > q.y - 4 && y < q.y + (q.out ? 18 : 30));
      if (!q) return false; G.drag = { v: q.v, out: q.out, x, y }; return true;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const e = G.eraser, inE = x > e.x - 14 && x < e.x + e.w + 14 && y > e.y - 18 && y < e.y + e.h + 14, g = G.s.gone;
      if (!d.out && inE) { g.push(d.v); G.touch(); } else if (d.out && !inE) { g.splice(g.indexOf(d.v), 1); G.touch(); }
    },
    demo(G) { const t = target(G.r), q = G.spots?.find(q => !q.out && !t.includes(q.v)); return q ? { from: { x: q.x + 18, y: q.y + 14 }, to: { x: G.eraser.x + 36, y: G.eraser.y + 20 }, text: 'Arrastra a la goma', ty: G.trayY - 14 } : null; },
    peek: G => ({ spots: G.spots, eraser: G.eraser, target: target(G.r) }),
  });
  return Object.assign(game, { target, start });
})();
;
//#archivo js/games/busca-b.js
// ¿Quién es B? (Álgebra 0, alg-0c; spec 2026-11-18-algebra-revision): las operaciones al revés. A está fijo; B empieza
// vacío. Se arrastran elementos del universo a B (si también están en A caen en la zona común) hasta que se cumplan las
// dos pistas de la ronda, por ejemplo A ∪ B = … y A ∩ B = …. Cada pista se pone verde cuando se cumple.
// params = { rounds: [{ U, A, conds: [['union' | 'inter' | 'BmA' | 'AmB', [..]], …] }] }   state = { rounds: [{ B: [..] }] }
GAMES['busca-b'] = (() => {
  const val = (k, A, B) => (k === 'union' ? [...A, ...B.filter(v => !A.includes(v))] : k === 'inter' ? A.filter(v => B.includes(v)) : k === 'BmA' ? B.filter(v => !A.includes(v)) : A.filter(v => !B.includes(v)));
  const eq = (X, Y) => X.length === Y.length && X.every(v => Y.includes(v));
  const holds = (B, r) => r.conds.map(([k, X]) => eq(val(k, r.A, B), X));
  let ok = (s, r) => holds(s.B, r).every(Boolean);
  // La B que pide la ronda (se prueban todos los subconjuntos de U: son pocos).
  const answer = r => { for (let m = 0; m < 2 ** r.U.length; m++) { const B = r.U.filter((_, i) => m & (1 << i)); if (holds(B, r).every(Boolean)) return B; } return null; };
  const NAME = { union: 'A \\cup B', inter: 'A \\cap B', BmA: 'B - A', AmB: 'A - B' };
  const tset = xs => (xs.length ? `\\{${xs.join(', ')}\\}` : '\\varnothing');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ B: [] }),
    ok,
    answered: s => s.B.length > 0,
    solution: r => `B = {${answer(r).join(', ')}}`,
    prompt: r => `$A = ${tset(r.A)}$. ¿Quién es $B$?`,
    foot: () => 'Arrastra elementos del universo a B (o sácalos) hasta cumplir las dos pistas',
    layout(G) {
      const W = G.W, H = G.H; G.box = { x: 12, y: 92, w: W - 24, h: H * 0.34 }; G.cs = SK.venn2(G.box, 0.5, 2);
      G.trayY = G.box.y + G.box.h + 14; G.cy = G.trayY + 50;
    },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, box, cs } = G, [SA, SB] = SK.sets(C), good = ok(G.s, r), B = G.locked && !good ? answer(r) : G.s.B;
      SK.panel(p, C, box, { u: true });
      SK.membrane(p, C, cs[0].x, cs[0].y, cs[0].r, cs[0].r, SA.line, { fill: 22 }); SK.membrane(p, C, cs[1].x, cs[1].y, cs[1].r, cs[1].r, SB.line, { fill: 22, dash: !B.length });
      SK.tag(p, C, 'A', cs[0].x - cs[0].r * 0.7, cs[0].y - cs[0].r * 0.75, SA); SK.tag(p, C, 'B', cs[1].x + cs[1].r * 0.7, cs[1].y - cs[1].r * 0.75, SB);
      // A solo (fijos), la zona común y B solo.
      G.spots = [];
      const col = (list, x, kind) => list.forEach((v, i) => { const y = cs[0].y + (i - (list.length - 1) / 2) * 24; if (kind !== 'A') G.spots.push({ v, x: x - 15, y: y - 11, w: 30, h: 22 }); if (G.drag?.v === v) return; SK.chip(p, C, { x: x - 15, y: y - 11, w: 30, h: 22 }, v, { state: kind === 'A' ? 'idle' : G.locked ? 'ok' : 'on', col: kind === 'A' ? SA.line : SB.line, size: 12, r: 7 }); });
      col(r.A.filter(v => !B.includes(v)), cs[0].x - cs[0].r * 0.5, 'A');
      col(r.A.filter(v => B.includes(v)), (cs[0].x + cs[1].x) / 2, 'AB');
      col(B.filter(v => !r.A.includes(v)), cs[1].x + cs[1].r * 0.5, 'B');
      // El universo: lo que no está en B.
      const rest = r.U.filter(v => !B.includes(v)), w = Math.min(34, (G.W - 24) / Math.max(rest.length, 1) - 4);
      TK.label(p, C, 'universo', 40, G.trayY - 4, C.mute, 10, 70);
      rest.forEach((v, i) => { const x = 14 + i * (w + 4); G.spots.push({ v, x, y: G.trayY + 4, w, h: 28, tray: true }); if (G.drag?.v !== v) SK.chip(p, C, { x, y: G.trayY + 4, w, h: 28 }, v, { state: 'idle', size: 13, r: 9 }); });
      if (G.drag) SK.chip(p, C, { x: G.drag.x - 16, y: G.drag.y - 13, w: 32, h: 26 }, G.drag.v, { state: 'on', col: C.brand, size: 13, r: 9 });
      // Las dos pistas, cada una con su valor actual.
      const h = holds(B, r);
      r.conds.forEach(([k, X], j) => {
        const b = { x: 12, y: G.cy + j * 50, w: G.W - 24, h: 44 };
        SK.formal(p, C, b, `$${NAME[k]} = ${tset(X)}$`, { raw: true, kicker: `ahora: ${tset(val(k, r.A, B)).replace(/\\\{|\\\}/g, m => (m === '\\{' ? '{' : '}')).replace('\\varnothing', '∅')}`, col: h[j] && !VELO.on ? C.ok : SB.line, size: 15 });
      });
    },
    press(G, x, y) { const q = (G.spots || []).find(q => hitBox(q, x, y)); if (!q) return false; G.drag = { v: q.v, tray: !!q.tray, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const c = G.cs[1], inB = Math.hypot(x - c.x, y - c.y) < c.r + 10, B = G.s.B;
      if (d.tray && inB && !B.includes(d.v)) { B.push(d.v); G.touch(); } else if (!d.tray && !inB) { B.splice(B.indexOf(d.v), 1); G.touch(); }
    },
    demo(G) { const want = answer(G.r) || [], q = G.spots?.find(q => q.tray && want.includes(q.v)); return q ? { from: { x: q.x + q.w / 2, y: q.y + 14 }, to: { x: G.cs[1].x + G.cs[1].r * 0.4, y: G.cs[1].y }, text: 'Arrastra a B', ty: G.box.y + 18 } : null; },
    peek: G => ({ spots: G.spots, cs: G.cs, answer: answer(G.r) }),
  });
  return Object.assign(game, { answer, holds });
})();
;
//#archivo js/games/pares-cero.js
// Pares cero (Álgebra, alg-11; spec 2026-11-18-algebra-revision): sumar y restar enteros con fichas. Cada ficha + vale 1
// y cada ficha − vale −1; una + sobre una − se anulan (un par cero). Para restar se QUITAN fichas; si no hay de las que
// hay que quitar, se agregan pares cero (no cambian el valor) y luego se quitan. Así se ve por qué 3 − (−4) = 7.
// params = { rounds: [{ op: '+' | '-', a, b }] }   state = { rounds: [{ P, N, rem }] }   (fichas + y − en la mesa; quitadas)
GAMES['pares-cero'] = (() => {
  const start = r => (r.op === '+' ? { P: Math.max(r.a, 0) + Math.max(r.b, 0), N: Math.max(-r.a, 0) + Math.max(-r.b, 0), rem: 0 } : { P: Math.max(r.a, 0), N: Math.max(-r.a, 0), rem: 0 });
  const res = r => (r.op === '+' ? r.a + r.b : r.a - r.b);
  let ok = (s, r) => Math.min(s.P, s.N) === 0 && (r.op === '+' || s.rem === Math.abs(r.b)) && s.P - s.N === res(r);
  // Una manera de llegar (para la solución y las pruebas).
  function answer(r) {
    const s = start(r);
    if (r.op === '-') { const need = Math.abs(r.b), have = r.b > 0 ? s.P : s.N; if (have < need) { s.P += need - have; s.N += need - have; } if (r.b > 0) s.P -= need; else s.N -= need; s.rem = need; }
    const m = Math.min(s.P, s.N); s.P -= m; s.N -= m; return s;
  }
  const expr = r => `${RK.num(r.a)} ${r.op} ${RK.par(r.b)}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: start,
    ok,
    solution: r => `${expr(r).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/g, '$1/$2')} = ${res(r)}`,
    prompt: r => `Calcula $${expr(r)}$ con fichas`,
    foot: r => (r.op === '-' ? 'Restar es quitar. Si no hay qué quitar, agrega pares cero' : 'Arrastra una ficha sobre una de signo contrario: se anulan'),
    layout(G) {
      const W = G.W, H = G.H; G.mat = { x: 12, y: 96, w: W - 24, h: H * 0.42 };
      G.pair = { x: 16, y: G.mat.y + G.mat.h + 14, w: 70, h: 40 }; G.bin = { x: W - 96, y: G.pair.y, w: 80, h: 40 }; G.fb = { x: 12, y: H - 86, w: W - 24, h: 52 };
    },
    enter(G) { G.drag = null; G.msg = null; },
    draw(G) {
      const { p, C, r, mat } = G, good = ok(G.s, r), s = G.locked && !good ? answer(r) : G.s;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(mat.x, mat.y, mat.w, mat.h, 14);
      // Fichas: arriba las +, abajo las −.
      const t = 24, gap = 5, per = Math.floor((mat.w - 16) / (t + gap));
      G.tiles = [];
      const row = (n, sign, y0) => { for (let i = 0; i < n; i++) { const x = mat.x + 10 + (i % per) * (t + gap), y = y0 + Math.floor(i / per) * (t + gap); G.tiles.push({ sign, x, y }); } };
      row(s.P, 1, mat.y + 12); row(s.N, -1, mat.y + mat.h / 2 + 6);
      G.tiles.forEach((q, i) => { if (G.drag?.i === i) return; game.tile(p, C, q.x, q.y, t, q.sign); });
      // Par cero para agregar y papelera para quitar (solo al restar).
      p.stroke(C.line); p.strokeWeight(1); p.fill(C.card); p.rect(G.pair.x, G.pair.y, G.pair.w, G.pair.h, 10);
      game.tile(p, C, G.pair.x + 8, G.pair.y + 8, t, 1); game.tile(p, C, G.pair.x + 38, G.pair.y + 8, t, -1);
      TK.label(p, C, 'par cero', G.pair.x + G.pair.w / 2, G.pair.y + G.pair.h + 10, C.mute, 10, 80);
      if (r.op === '-') { p.stroke(C.coral); p.strokeWeight(1.4); p.fill(RK.al(p, C.coral, 30)); p.rect(G.bin.x, G.bin.y, G.bin.w, G.bin.h, 10); TK.label(p, C, `quitar · ${s.rem} de ${Math.abs(r.b)}`, G.bin.x + G.bin.w / 2, G.bin.y + G.bin.h / 2, C.ink, 11, 76); }
      if (G.drag) game.tile(p, C, G.drag.x - t / 2, G.drag.y - t / 2, t, G.drag.sign, true);
      if (G.msg && G.t - G.msg.t < 2.4) TK.label(p, C, G.msg.text, G.W / 2, G.pair.y + G.pair.h + 26, C.bad, 11, G.W - 30);
      RK.strip(p, C, G.fb, `$${expr(r)}\\quad\\to\\quad ${s.P} - ${s.N} = ${s.P - s.N}$`, { kicker: 'En la mesa', col: G.locked ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const i = (G.tiles || []).findIndex(q => x > q.x - 3 && x < q.x + 27 && y > q.y - 3 && y < q.y + 27);
      if (i >= 0) { G.drag = { i, sign: G.tiles[i].sign, x, y }; return true; }
      if (hitBox(G.pair, x, y)) { G.drag = { i: -1, sign: 0, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const s = G.s, r = G.r, inMat = hitBox(G.mat, x, y), say = text => { G.msg = { t: G.t, text }; };
      if (d.i === -1) { if (inMat) { s.P++; s.N++; G.touch(); } return; }
      if (r.op === '-' && hitBox(G.bin, x, y)) {
        if (Math.sign(r.b) !== d.sign) return say(`Hay que quitar fichas ${r.b > 0 ? '+' : '−'}`);
        if (s.rem >= Math.abs(r.b)) return say('Ya quitaste todas las que resta la cuenta');
        if (d.sign > 0) s.P--; else s.N--; s.rem++; G.touch(); return;
      }
      const other = G.tiles.find((q, k) => k !== d.i && q.sign === -d.sign && x > q.x - 6 && x < q.x + 30 && y > q.y - 6 && y < q.y + 30);
      if (other) { s.P--; s.N--; G.touch(); }
    },
    demo(G) { const a = G.tiles?.find(q => q.sign > 0), b = G.tiles?.find(q => q.sign < 0); return a && b ? { from: { x: a.x + 12, y: a.y + 12 }, to: { x: b.x + 12, y: b.y + 12 }, text: 'Una + sobre una −: se anulan', ty: G.mat.y + G.mat.h - 14 } : { from: { x: G.pair.x + 35, y: G.pair.y + 20 }, to: { x: G.mat.x + G.mat.w / 2, y: G.mat.y + 40 }, text: 'Agrega un par cero', ty: G.mat.y + G.mat.h - 14 }; },
    peek: G => ({ tiles: G.tiles, mat: G.mat, pair: G.pair, bin: G.bin }),
  });
  game.tile = (p, C, x, y, t, sign, lift) => {
    const col = sign > 0 ? C.sky : C.coral;
    p.stroke(col); p.strokeWeight(lift ? 2.4 : 1.6); p.fill(RK.al(p, col, lift ? 120 : 70)); p.rect(x, y, t, t, 6);
    p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(15); p.text(sign > 0 ? '+' : '−', x + t / 2, y + t / 2 + 1);
  };
  return Object.assign(game, { answer, res, start });
})();
;
//#archivo js/games/flecha-resta.js
// La flecha del cambio (Álgebra, alg-11; spec 2026-11-18-algebra-revision): restar mide un cambio. Se arrastran la cola
// de una flecha al valor de antes y la punta al valor de después; la flecha dice cuánto cambió, con su signo:
// después − antes. Si va a la izquierda el cambio es negativo, aunque los dos números sean positivos.
// params = { min, max, rounds: [{ text, from, to }] }   state = { rounds: [{ t, h }] }   (cola y punta, enteros)
GAMES['flecha-resta'] = (() => {
  let ok = (s, r) => s.t === r.from && s.h === r.to;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 0.95,
    init: () => ({ t: 0, h: 1 }),
    ok,
    solution: r => `${r.to} − (${r.from}) = ${r.to - r.from}`,
    prompt: r => r.text,
    foot: () => 'La cola va en el valor de antes y la punta en el de después',
    layout(G) { G.L = { x0: 22, x1: G.W - 22, y: G.H * 0.5, min: G.params.min ?? -9, max: G.params.max ?? 9 }; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r, L } = G, good = ok(G.s, r), s = G.locked && !good ? { t: r.from, h: r.to } : G.s;
      const X = drawNumLine(p, C, L, { step: 1, every: 3 }), d = s.h - s.t, col = d > 0 ? C.mint : d < 0 ? C.coral : C.mute;
      G.X = X;
      if (d) RK.arrow(p, X(s.t), X(s.h), L.y - 34, col, 5);
      TK.label(p, C, `${d > 0 ? '+' : d < 0 ? '−' : ''}${Math.abs(d)}`, (X(s.t) + X(s.h)) / 2, L.y - 54, col, 15, 60);
      p.stroke(col); p.strokeWeight(1.4); p.drawingContext.setLineDash([3, 4]); p.line(X(s.t), L.y - 34, X(s.t), L.y); p.line(X(s.h), L.y - 34, X(s.h), L.y); p.drawingContext.setLineDash([]);
      p.noFill(); p.stroke(C.ink); p.strokeWeight(3); p.circle(X(s.t), L.y + 40, 20);
      RK.knob(p, C, X(s.h), L.y + 40, col);
      TK.label(p, C, 'antes', X(s.t), L.y + 62, C.mute, 10, 60); TK.label(p, C, 'después', X(s.h), L.y + 62, C.mute, 10, 60);
      RK.strip(p, C, G.fb, `$${RK.num(s.h)} - ${RK.par(s.t)} = ${RK.num(d)}$`, { kicker: 'Cambio = después − antes', col: G.locked ? C.ok : col, size: 18 });
    },
    press(G, x, y) {
      if (Math.abs(y - (G.L.y + 40)) > 34) return false;
      G.grab = Math.abs(x - G.X(G.s.h)) <= Math.abs(x - G.X(G.s.t)) ? 'h' : 't'; game.move(G, x); return true;
    },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X(G.s.h), y: G.L.y + 40 }, to: { x: G.X(G.s.h + 4), y: G.L.y + 40 }, text: 'Arrastra la cola y la punta', ty: G.L.y + 86 }),
    peek: G => ({ L: G.L }),
  });
  game.move = (G, x) => {
    const L = G.L, v = Math.max(L.min, Math.min(L.max, Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min))));
    if (v !== G.s[G.grab] || !G.touched[G.cur]) { G.s[G.grab] = v; G.touch(); }
  };
  return game;
})();
;
//#archivo js/games/agrupa-fraccion.js
// Agrupa la barra (Álgebra, alg-11b; spec 2026-11-18-algebra-revision): simplificar es agrupar partes. Una barra partida
// en `den` partes iguales con `num` pintadas. Se arrastra la manija para juntar las partes de a k: si k no reparte
// justo la barra o corta un pedazo pintado, el grupo sale en rojo. La fracción más simple sale con el grupo más grande
// que sirve (el máximo común divisor).
// params = { rounds: [{ num, den }] }   state = { rounds: [{ k }] }
GAMES['agrupa-fraccion'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const fits = (k, r) => r.den % k === 0 && r.num % k === 0;
  const game = roundsGame({
    aspect: 0.95,
    init: () => ({ k: 1 }),
    ok: (s, r) => s.k === gcd(r.num, r.den),
    solution: r => { const g = gcd(r.num, r.den); return `de a ${g}: ${r.num}/${r.den} = ${r.num / g}/${r.den / g}`; },
    prompt: r => `Simplifica $\\tfrac{${r.num}}{${r.den}}$ agrupando partes`,
    foot: (r, s) => (fits(s.k, r) ? 'Busca el grupo más grande que sirva' : `De a ${s.k} no sirve: algún grupo queda cortado`),
    layout(G) { G.bar = { x: 16, y: G.H * 0.36, w: G.W - 32, h: 54 }; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r, bar } = G, g = gcd(r.num, r.den), k = G.locked && G.s.k !== g ? g : G.s.k, u = bar.w / r.den, good = fits(k, r);
      for (let i = 0; i < r.den; i++) {
        const on = i < r.num;
        p.stroke(C.line); p.strokeWeight(1); p.fill(on ? C.sky : C.card); p.rect(bar.x + i * u, bar.y, u, bar.h);
      }
      // Los grupos de a k, con su borde grueso.
      for (let j = 0; j * k < r.den; j++) {
        const x = bar.x + j * k * u, w = Math.min(k, r.den - j * k) * u, cut = (j * k < r.num && (j + 1) * k > r.num) || w < k * u - 0.5;
        p.noFill(); p.stroke(G.locked ? C.ok : cut ? C.bad : C.ink); p.strokeWeight(3); p.rect(x + 1.5, bar.y - 6, w - 3, bar.h + 12, 6);
      }
      const hx = bar.x + k * u;
      RK.knob(p, C, hx, bar.y + bar.h + 30, good ? C.brand : C.bad);
      TK.label(p, C, `de a ${k}`, hx, bar.y + bar.h + 54, C.mute, 11, 60);
      G.hx = hx;
      const tex = good ? `$\\tfrac{${r.num}}{${r.den}} = \\tfrac{${r.num / k}}{${r.den / k}}$` : `$\\text{de a } ${k}\\text{: no se puede}$`;
      RK.strip(p, C, G.fb, tex, { kicker: good ? `Grupos de ${k} partes` : 'Algún grupo queda cortado', col: G.locked ? C.ok : good ? C.mint : C.bad, size: 20 });
    },
    press(G, x, y) { if (Math.abs(y - (G.bar.y + G.bar.h + 30)) > 30 && !(y > G.bar.y && y < G.bar.y + G.bar.h)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.hx, y: G.bar.y + G.bar.h + 30 }, to: { x: G.hx + 2 * G.bar.w / G.r.den, y: G.bar.y + G.bar.h + 30 }, text: 'Arrastra para agrupar', ty: G.bar.y - 26 }),
    peek: G => ({ bar: G.bar }),
  });
  game.move = (G, x) => { const r = G.r, k = Math.max(1, Math.min(r.den, Math.round((x - G.bar.x) / (G.bar.w / r.den)))); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { gcd });
})();
;
//#archivo js/games/espiral-teodoro.js
// La espiral de raíces (Álgebra, alg-11c; spec 2026-11-18-algebra-revision): la espiral de Teodoro. Cada triángulo
// rectángulo nuevo tiene un cateto de 1 y como otro cateto la hipotenusa anterior, así que sus hipotenusas miden √2, √3,
// √4, √5… Se arrastra la punta alrededor para agregar o quitar triángulos hasta la raíz pedida; el compás lleva esa
// hipotenusa a la recta, entre dos enteros, porque casi ninguna es entera.
// params = { rounds: [{ n }] }   state = { rounds: [{ k }] }   (k triángulos: la última hipotenusa mide √(k + 1))
GAMES['espiral-teodoro'] = (() => {
  const MAXK = 12;
  // Puntas de la espiral: la j-ésima está a distancia √(j + 1) del centro.
  const tips = () => { const o = [[1, 0]]; for (let j = 1; j <= MAXK; j++) { const [x, y] = o[j - 1], d = Math.hypot(x, y); o.push([x - y / d, y + x / d]); } return o; };
  const T = tips(), ang = T.map(([x, y]) => { let a = Math.atan2(y, x); return a < 0 ? a + 2 * Math.PI : a; });
  const game = roundsGame({
    aspect: 1.45,
    init: () => ({ k: 1 }),
    ok: (s, r) => s.k + 1 === r.n,
    solution: r => `${r.n - 1} triángulos: √${r.n} ≈ ${Math.sqrt(r.n).toFixed(3)}`,
    prompt: r => `Arma la espiral hasta la hipotenusa $\\sqrt{${r.n}}$`,
    foot: () => 'Arrastra la punta alrededor del centro: cada triángulo suma uno bajo la raíz',
    layout(G) { G.u = Math.min((G.W - 40) / 7.6, (G.H * 0.5) / 7.2); G.o = { x: G.W / 2, y: 96 + G.u * 3.7 }; G.L = { x0: 26, x1: G.W - 26, y: G.H - 108, min: 0, max: 4 }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r, u, o } = G, k = G.locked && G.s.k + 1 !== r.n ? r.n - 1 : G.s.k, P = j => [o.x + T[j][0] * u, o.y - T[j][1] * u];
      for (let j = 1; j <= k; j++) {
        const [ax, ay] = P(j - 1), [bx, by] = P(j), last = j === k;
        p.fill(RK.al(p, j % 2 ? C.sky : C.mint, last ? 80 : 36)); p.stroke(C.line); p.strokeWeight(1); p.triangle(o.x, o.y, ax, ay, bx, by);
        p.stroke(C.ink); p.strokeWeight(2); p.line(ax, ay, bx, by);
      }
      const [hx, hy] = P(k);
      p.stroke(C.brand); p.strokeWeight(3.5); p.line(o.x, o.y, hx, hy);
      TK.label(p, C, `√${k + 1}`, (o.x + hx) / 2 + 10, (o.y + hy) / 2 - 10, C.brand, 14, 50);
      RK.knob(p, C, hx, hy, C.brand); G.tip = { x: hx, y: hy };
      // El compás lleva la hipotenusa a la recta.
      const X = drawNumLine(p, C, G.L, { step: 1 }), v = Math.sqrt(k + 1);
      p.noFill(); p.stroke(RK.al(p, C.brand, 150)); p.strokeWeight(1.4); p.drawingContext.setLineDash([4, 4]); p.line(X(0), G.L.y - 22, X(v), G.L.y - 22); p.drawingContext.setLineDash([]);
      drawDot(p, C, X(v), G.L.y, 12, C.brand);
      RK.strip(p, C, G.fb, `$\\sqrt{${k + 1}} \\approx ${v.toFixed(3)}$`, { col: G.locked ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.hypot(x - G.tip.x, y - G.tip.y) > 34 && Math.hypot(x - G.o.x, y - G.o.y) > G.u * 3.8) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => { const [x, y] = T[Math.min(MAXK, G.s.k + 2)]; return { from: G.tip, to: { x: G.o.x + x * G.u, y: G.o.y - y * G.u }, text: 'Gira la punta', ty: 104 }; },
    peek: G => ({ o: G.o, u: G.u, tips: T }),
  });
  // El ángulo del dedo elige la punta más cercana.
  game.move = (G, x, y) => {
    let a = Math.atan2(G.o.y - y, x - G.o.x); if (a < 0) a += 2 * Math.PI;
    let best = 1; for (let j = 1; j <= MAXK; j++) if (Math.abs(ang[j] - a) < Math.abs(ang[best] - a)) best = j;
    if (best !== G.s.k || !G.touched[G.cur]) { G.s.k = best; G.touch(); }
  };
  return Object.assign(game, { tips: T, ang });
})();
;
//#archivo js/games/agrupa-amigos.js
// Números amigos (Álgebra, alg-12b; spec 2026-11-18-algebra-revision): la conmutativa y la asociativa dejan sumar en el
// orden y con los paréntesis que se quiera. Cuatro números sueltos y dos platos: se arrastran de a dos a cada plato y
// cada plato muestra su suma. Hay que formar parejas que den cifras redondas (centenas), para que la cuenta salga fácil.
// params = { rounds: [{ nums: [4 números], unit }] }   state = { rounds: [{ plates: [[i, j], [k, l]] }] }
GAMES['agrupa-amigos'] = (() => {
  const sum = (r, P) => P.reduce((a, i) => a + r.nums[i], 0);
  let ok = (s, r) => s.plates.every(P => P.length === 2 && sum(r, P) % r.unit === 0);
  // Las parejas buenas (para la solución y las pruebas).
  function answer(r) { const n = r.nums; for (let j = 1; j < 4; j++) { const a = [0, j], b = [1, 2, 3].filter(k => k !== j); if ((n[0] + n[j]) % r.unit === 0 && (n[b[0]] + n[b[1]]) % r.unit === 0) return { plates: [a, b] }; } return null; }
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ plates: [[], []] }),
    ok,
    answered: s => s.plates.some(P => P.length),
    solution: r => { const a = answer(r); return a.plates.map(P => `(${P.map(i => r.nums[i]).join(' + ')})`).join(' + ') + ` = ${r.nums.reduce((x, y) => x + y, 0)}`; },
    prompt: r => `Suma $${r.nums.join(' + ')}$ en parejas redondas`,
    foot: () => 'El orden y los paréntesis no cambian una suma: arrastra de a dos a cada plato',
    layout(G) { const W = G.W, H = G.H; G.trayY = 104; G.pl = [0, 1].map(k => ({ x: 14 + k * (W - 28) / 2 + 4, y: H * 0.42, w: (W - 28) / 2 - 8, h: 92 })); G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, good = ok(G.s, r), s = G.locked && !good ? answer(r) : G.s, w = 58, h = 36;
      G.spots = [];
      const free = r.nums.map((_, i) => i).filter(i => !s.plates.some(P => P.includes(i)));
      free.forEach((i, j) => { const x = G.W / 2 - (free.length * (w + 8) - 8) / 2 + j * (w + 8); G.spots.push({ i, x, y: G.trayY, w, h }); });
      s.plates.forEach((P, k) => {
        const b = G.pl[k], full = P.length === 2, round = !VELO.on && full && sum(r, P) % r.unit === 0;
        p.stroke(G.locked ? C.ok : round ? C.ok : C.line); p.strokeWeight(round ? 2 : 1.2); p.fill(RK.al(p, C.card, 220)); p.rect(b.x, b.y, b.w, b.h, 14);
        P.forEach((i, j) => G.spots.push({ i, x: b.x + 8 + j * (b.w - 16 - w) , y: b.y + 10, w, h }));
        TK.label(p, C, P.length ? `= ${sum(r, P)}` : 'plato', b.x + b.w / 2, b.y + b.h - 18, round ? C.ok : C.mute, 15, b.w - 10);
      });
      G.spots.forEach(q => { if (G.drag?.i !== q.i) RK.chip(p, C, q, r.nums[q.i], { on: s.plates.some(P => P.includes(q.i)), col: C.mint, size: 16 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - h / 2, w, h }, r.nums[G.drag.i], { on: true, size: 16 });
      const tex = s.plates.map(P => (P.length ? `(${P.map(i => r.nums[i]).join(' + ')})` : '\\square')).join(' + ');
      RK.strip(p, C, G.fb, `$${tex}${ok(s, r) ? ` = ${r.nums.reduce((x, y) => x + y, 0)}` : ''}$`, { kicker: 'Reagrupada', col: G.locked ? C.ok : C.mint, size: 17 });
    },
    press(G, x, y) { const q = (G.spots || []).find(q => hitBox(q, x, y)); if (!q) return false; G.drag = { i: q.i, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const s = G.s, k = G.pl.findIndex(b => hitBox({ x: b.x - 6, y: b.y - 10, w: b.w + 12, h: b.h + 20 }, x, y));
      s.plates.forEach(P => { const j = P.indexOf(d.i); if (j >= 0) P.splice(j, 1); });
      if (k >= 0 && s.plates[k].length < 2) s.plates[k].push(d.i);
      G.touch();
    },
    demo(G) { const q = G.spots?.[0]; return q ? { from: { x: q.x + q.w / 2, y: q.y + q.h / 2 }, to: { x: G.pl[0].x + G.pl[0].w / 2, y: G.pl[0].y + 30 }, text: 'Arrastra a un plato', ty: G.pl[0].y + G.pl[0].h + 18 } : null; },
    peek: G => ({ spots: G.spots, pl: G.pl }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/deshaz-camino.js
// Deshaz el camino (Álgebra, alg-12b; spec 2026-11-18-algebra-revision): los inversos. Un número pasa por dos puertas
// (sumar, multiplicar) y sale cambiado. Para volver al número de partida se ponen en las puertas de regreso las tarjetas
// que deshacen cada paso: el opuesto deshace una suma y el recíproco deshace un producto, y se deshace en orden
// contrario: lo último que se hizo es lo primero que se deshace. El valor se ve en cada tramo.
// params = { rounds: [{ x, ops: [[op, v], [op, v]], cards: [[op, v], …] }] }   (op '+' o '×'; v número)
// state = { rounds: [{ slots: [índice de tarjeta | null, …] }] }
GAMES['deshaz-camino'] = (() => {
  const apply = (x, [op, v]) => (op === '+' ? x + v : x * v);
  const inv = ([op, v]) => (op === '+' ? ['+', -v] : ['×', 1 / v]);
  const same = (a, b) => a[0] === b[0] && Math.abs(a[1] - b[1]) < 1e-9;
  let ok = (s, r) => s.slots.every((c, i) => c != null && same(r.cards[c], inv(r.ops[r.ops.length - 1 - i])));
  const lab = ([op, v]) => (op === '+' ? `+\\,${RK.par(v)}` : `\\times\\,${RK.par(v)}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ slots: r.ops.map(() => null) }),
    ok,
    answered: s => s.slots.some(c => c != null),
    solution: r => `deshacer con ${[...r.ops].reverse().map(o => { const [op, v] = inv(o); return op === '+' ? `+ (${v})` : `× ${RK.num(v).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2')}`; }).join(', luego ')}`,
    prompt: r => `Regresa al ${r.x} deshaciendo los pasos`,
    foot: () => 'Arrastra a las puertas de regreso las tarjetas que deshacen cada paso',
    layout(G) {
      const W = G.W, H = G.H, n = 2, gw = (W - 40) / 5;
      G.go = { y: 112 }; G.back = { y: H * 0.42 };
      G.gx = i => 20 + gw * (0.5 + 2 * i + 1) - gw / 2; G.gw = gw; G.cardY = H * 0.6; G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 };
      G.slot = i => ({ x: 20 + gw * (2 * i + 1), y: G.back.y - 18, w: gw, h: 36 });
    },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, good = ok(G.s, r), s = G.locked && !good ? { slots: [...r.ops].reverse().map(o => r.cards.findIndex(c => same(c, inv(o)))) } : G.s, gw = G.gw;
      // Ida: x → puerta 1 → puerta 2 → y.
      const vals = [r.x]; r.ops.forEach(o => vals.push(apply(vals.at(-1), o)));
      const box = (i, y, v, col) => RK.chip(p, C, { x: 20 + gw * 2 * i, y: y - 16, w: gw, h: 32 }, `$${RK.num(v)}$`, { on: true, col, size: 15 });
      TK.label(p, C, 'ida', 30, G.go.y - 26, C.mute, 10, 40);
      vals.forEach((v, i) => box(i, G.go.y, v, C.sky));
      r.ops.forEach((o, i) => { const x = 20 + gw * (2 * i + 1); RK.arrow(p, x + 4, x + gw - 6, G.go.y, C.line, 2); TK.label(p, C, `$${lab(o)}$`, x + gw / 2, G.go.y - 16, C.ink, 13, gw + 10); });
      // Regreso: y → puerta → puerta → ¿x?
      TK.label(p, C, 'regreso', 36, G.back.y - 30, C.mute, 10, 60);
      const back = [vals.at(-1)]; s.slots.forEach(c => back.push(c == null || back.at(-1) == null ? null : apply(back.at(-1), r.cards[c])));
      back.forEach((v, i) => { if (v == null) { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 4]); p.rect(20 + gw * 2 * i, G.back.y - 16, gw, 32, 9); p.drawingContext.setLineDash([]); } else box(i, G.back.y, v, i === back.length - 1 ? (Math.abs(v - r.x) < 1e-9 && !VELO.on ? C.ok : VELO.on ? C.sky : C.coral) : C.sky); });
      G.spots = [];
      s.slots.forEach((c, i) => { const b = G.slot(i); p.stroke(C.brand); p.strokeWeight(1.4); p.fill(RK.al(p, C.brand, 24)); p.rect(b.x + 4, b.y, b.w - 8, b.h, 9); if (c != null) { G.spots.push({ c, from: i, ...b }); if (G.drag?.c !== c) TK.label(p, C, `$${lab(r.cards[c])}$`, b.x + b.w / 2, b.y + b.h / 2, C.ink, 13, b.w); } });
      // Tarjetas.
      const free = r.cards.map((_, i) => i).filter(i => !s.slots.includes(i)), cw = Math.min(70, (G.W - 24) / free.length - 6);
      free.forEach((c, j) => { const b = { x: G.W / 2 - (free.length * (cw + 6) - 6) / 2 + j * (cw + 6), y: G.cardY, w: cw, h: 36, c, from: -1 }; G.spots.push(b); if (G.drag?.c !== c) RK.chip(p, C, b, `$${lab(r.cards[c])}$`, { size: 13 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - cw / 2, y: G.drag.y - 18, w: cw, h: 36 }, `$${lab(r.cards[G.drag.c])}$`, { on: true, size: 13 });
      const end = back.at(-1);
      RK.strip(p, C, G.fb, end == null ? `$\\text{faltan puertas}$` : `$${RK.num(vals.at(-1))} \\to ${RK.num(end)}$`, { kicker: end != null && Math.abs(end - r.x) < 1e-9 ? 'De vuelta al inicio' : `Meta: volver al ${r.x}`, col: G.locked ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const q = (G.spots || []).find(q => hitBox(q, x, y)); if (!q) return false; G.drag = { c: q.c, from: q.from, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const s = G.s, k = s.slots.findIndex((_, i) => hitBox({ ...G.slot(i), y: G.slot(i).y - 14, h: 64 }, x, y));
      if (d.from >= 0) s.slots[d.from] = null;
      if (k >= 0) { const prev = s.slots[k]; s.slots[k] = d.c; if (prev != null && d.from >= 0) s.slots[d.from] = prev; }
      G.touch();
    },
    demo(G) { const q = G.spots?.find(q => q.from < 0), b = G.slot(0); return q ? { from: { x: q.x + q.w / 2, y: q.y + 18 }, to: { x: b.x + b.w / 2, y: b.y + 18 }, text: 'Arrastra a la puerta de regreso', ty: G.cardY + 56 } : null; },
    peek: G => ({ spots: G.spots, slot: [0, 1].map(i => G.slot(i)) }),
  });
  return Object.assign(game, { inv, apply });
})();
;
//#archivo js/games/resta-opuesto.js
// Restar es sumar el opuesto (Álgebra, alg-12c; spec 2026-11-18-algebra-revision): a − b se hace con flechas. La flecha
// de a sale del 0. La de b está abajo: primero se voltea (se arrastra su punta al otro lado de su cola: queda −b) y
// luego se pega su cola a la punta de a. Donde termina es a + (−b) = a − b. Pegarla sin voltear sería sumar b.
// params = { min, max, rounds: [{ a, b }] }   state = { rounds: [{ flip, att }] }
GAMES['resta-opuesto'] = (() => {
  let ok = s => s.flip && s.att;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ flip: false, att: false }),
    ok,
    answered: s => s.flip || s.att,
    solution: r => `${r.a} − (${r.b}) = ${r.a} + (${-r.b}) = ${r.a - r.b}`,
    prompt: r => `Calcula $${RK.num(r.a)} - ${RK.par(r.b)}$ sumando el opuesto`,
    foot: (r, s) => (!s.flip ? 'Voltea la flecha de abajo: arrastra su punta al otro lado' : !s.att ? 'Ahora arrastra la flecha y pega su cola a la punta de arriba' : 'Donde termina está el resultado'),
    layout(G) { G.L = { x0: 22, x1: G.W - 22, y: G.H * 0.36, min: G.params.min ?? -12, max: G.params.max ?? 12 }; G.yb = G.H * 0.62; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, L } = G, s = G.locked && !ok(G.s) ? { flip: true, att: true } : G.s;
      const X = drawNumLine(p, C, L, { step: 1, every: 3 }), bv = s.flip ? -r.b : r.b;
      G.X = X;
      RK.arrow(p, X(0), X(r.a), L.y - 26, C.sky, 5); TK.label(p, C, `$${RK.num(r.a)}$`, (X(0) + X(r.a)) / 2, L.y - 44, C.sky, 13, 40);
      // La flecha de b: abajo, o pegada en la punta de a.
      const t0 = s.att ? r.a : 0, y = s.att ? L.y - 26 : G.yb, col = s.flip ? C.mint : C.coral;
      if (G.drag?.what === 'move') { const dx = G.drag.x - G.drag.x0; RK.arrow(p, X(0) + dx, X(bv) + dx, G.drag.y, col, 5); }
      else RK.arrow(p, X(t0), X(t0 + bv), y, col, 5);
      if (!s.att) { drawDot(p, C, X(0), G.yb, 10, C.ink); RK.knob(p, C, X(bv), G.yb + 26, col); TK.label(p, C, `$${s.flip ? '-' : ''}${RK.par(r.b)}$`, (X(0) + X(bv)) / 2, G.yb - 18, col, 13, 60); }
      if (s.att) { p.stroke(C.brand); p.strokeWeight(1.4); p.drawingContext.setLineDash([3, 4]); p.line(X(r.a + bv), L.y - 26, X(r.a + bv), L.y); p.drawingContext.setLineDash([]); drawDot(p, C, X(r.a + bv), L.y, 13, C.brand); }
      G.bt = { x: X(bv), y: G.yb + 26 }; G.bbody = { x: Math.min(X(0), X(bv)), y: G.yb - 14, w: Math.abs(X(bv) - X(0)) + 1, h: 28 };
      const tex = s.att ? `${RK.num(r.a)} + ${RK.par(bv)} = ${RK.num(r.a + bv)}` : `${RK.num(r.a)} - ${RK.par(r.b)} = ${RK.num(r.a)} + ${s.flip ? RK.par(-r.b) : '\\square'}`;
      RK.strip(p, C, G.fb, `$${tex}$`, { kicker: s.flip ? 'Con el opuesto' : 'Primero el opuesto', col: G.locked ? C.ok : col, size: 17 });
    },
    press(G, x, y) {
      if (G.s.att) { if (Math.abs(y - (G.L.y - 26)) < 22) { G.s.att = false; G.touch(); return true; } return false; }
      if (Math.hypot(x - G.bt.x, y - G.bt.y) < 26) { G.drag = { what: 'flip', x, y }; return true; }
      if (hitBox(G.bbody, x, y)) { G.drag = { what: 'move', x, y, x0: x }; return true; }
      return false;
    },
    drag(G, x, y) {
      const d = G.drag; if (!d) return false; d.x = x; d.y = y;
      if (d.what === 'flip') { const f = Math.sign(x - G.X(0)) !== Math.sign(G.r.b); if (f !== G.s.flip) { G.s.flip = f; G.touch(); } }
      return true;
    },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d || d.what !== 'move') return;
      const tail = G.X(0) + (x - d.x0);
      if (Math.abs(tail - G.X(G.r.a)) < 24 && Math.abs(y - (G.L.y - 26)) < 50) { G.s.att = true; G.touch(); }
    },
    demo(G) { return !G.s.flip ? { from: G.bt, to: { x: 2 * G.X(0) - G.bt.x, y: G.bt.y }, text: 'Voltea la flecha', ty: G.yb + 60 } : { from: { x: G.X(0) + 10, y: G.yb }, to: { x: G.X(G.r.a) + 10, y: G.L.y - 26 }, text: 'Pégala en la punta', ty: G.yb + 60 }; },
    peek: G => ({ L: G.L, yb: G.yb }),
  });
  return game;
})();
;
//#archivo js/games/parte-flecha.js
// Parte la flecha (Álgebra, alg-12c; spec 2026-11-18-algebra-revision): dividir es multiplicar por el recíproco. La
// flecha de a se parte en |b| pedazos iguales arrastrando la tijera (una marca de corte que se puede correr) y un pedazo
// es a · (1/|b|). Si b es negativo, además se voltea el pedazo (se arrastra su punta al otro lado del 0). Así salen la
// división y su signo: (−12) ÷ 3 = −4 y 15 ÷ (−5) = −3.
// params = { min, max, rounds: [{ a, b }] }   state = { rounds: [{ n, flip }] }
GAMES['parte-flecha'] = (() => {
  let ok = (s, r) => s.n === Math.abs(r.b) && s.flip === r.b < 0;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ n: 1, flip: false }),
    ok,
    solution: r => `${r.a} ÷ (${r.b}) = ${r.a} · (1/${r.b}) = ${r.a / r.b}`,
    prompt: r => `Calcula $${RK.num(r.a)} \\div ${RK.par(r.b)}$ partiendo la flecha`,
    foot: (r, s) => (s.n !== Math.abs(r.b) ? 'Corre la tijera: la flecha se parte en pedazos iguales' : 'Si el divisor es negativo, voltea el pedazo'),
    layout(G) { G.L = { x0: 22, x1: G.W - 22, y: G.H * 0.45, min: G.params.min ?? -18, max: G.params.max ?? 18 }; G.yb = G.H * 0.66; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r, L } = G, s = G.locked && !ok(G.s, r) ? { n: Math.abs(r.b), flip: r.b < 0 } : G.s;
      const X = drawNumLine(p, C, L, { step: 1, every: 3 }), piece = r.a / s.n, pv = s.flip ? -piece : piece;
      G.X = X;
      RK.arrow(p, X(0), X(r.a), L.y - 26, C.sky, 5);
      for (let i = 1; i < s.n; i++) { const x = X(piece * i); p.stroke(C.ink); p.strokeWeight(2); p.line(x, L.y - 36, x, L.y - 16); }
      G.cut = { x: X(piece), y: L.y - 52 };
      p.noStroke(); p.fill(C.brand); p.triangle(G.cut.x, L.y - 38, G.cut.x - 8, L.y - 54, G.cut.x + 8, L.y - 54); RK.knob(p, C, G.cut.x, L.y - 64, C.brand);
      TK.label(p, C, `${s.n} pedazo${s.n === 1 ? '' : 's'}`, G.W / 2, L.y + 44, C.mute, 11, 120);
      // El pedazo, abajo: se puede voltear.
      const col = s.flip ? C.mint : C.coral;
      RK.arrow(p, X(0), X(pv), G.yb, col, 5); drawDot(p, C, X(0), G.yb, 10, C.ink); RK.knob(p, C, X(pv), G.yb + 26, col);
      G.tip = { x: X(pv), y: G.yb + 26 };
      RK.strip(p, C, G.fb, `$${RK.num(r.a)} \\cdot \\tfrac{1}{${s.flip ? '-' : ''}${s.n}} = ${RK.num(pv)}$`, { kicker: 'Dividir = multiplicar por el recíproco', col: G.locked ? C.ok : col, size: 18 });
    },
    press(G, x, y) {
      if (Math.hypot(x - G.cut.x, y - (G.L.y - 64)) < 30 || (Math.abs(y - (G.L.y - 26)) < 22)) { G.grab = 'cut'; game.cut(G, x); return true; }
      if (Math.hypot(x - G.tip.x, y - G.tip.y) < 28) { G.grab = 'flip'; return true; }
      return false;
    },
    drag(G, x) {
      if (G.grab === 'cut') { game.cut(G, x); return true; }
      if (G.grab === 'flip') { const f = Math.sign(x - G.X(0)) !== Math.sign(G.r.a); if (f !== G.s.flip) { G.s.flip = f; G.touch(); } return true; }
      return false;
    },
    release(G) { G.grab = null; },
    demo(G) { return { from: { x: G.cut.x, y: G.L.y - 64 }, to: { x: G.X(G.r.a / 3), y: G.L.y - 64 }, text: 'Corre la tijera', ty: G.yb + 60 }; },
    peek: G => ({ L: G.L, yb: G.yb }),
  });
  // La tijera marca el largo de un pedazo; el número de pedazos es el que más se le acerca (de 1 a 9).
  game.cut = (G, x) => {
    const a = G.r.a, v = G.L.min + (x - G.L.x0) / (G.L.x1 - G.L.x0) * (G.L.max - G.L.min);
    let best = 1; for (let n = 1; n <= 9; n++) if (Math.abs(a / n - v) < Math.abs(a / best - v)) best = n;
    if (best !== G.s.n || !G.touched[G.cur]) { G.s.n = best; G.touch(); }
  };
  return game;
})();
;
//#archivo js/games/espejo-desigualdad.js
// El orden en el espejo (Álgebra, alg-12d; spec 2026-11-18-algebra-revision): sumar conserva el orden, multiplicar por
// un positivo también y por un negativo lo voltea. Arriba, a < b en la recta. Se arrastra el número que se suma o el
// factor; abajo aparecen las imágenes y el signo entre ellas se escribe solo (< o >). Hay que llevar la imagen de a al
// punto marcado, y mirar qué le pasa al orden.
// params = { rounds: [{ op: '+' | '×', a, b, target }] }   state = { rounds: [{ k }] }
GAMES['espejo-desigualdad'] = (() => {
  const KS = { '+': [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6], '×': [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3] };
  const app = (r, v, k) => (r.op === '+' ? v + k : v * k);
  const need = r => KS[r.op].find(k => app(r, r.a, k) === r.target);
  let ok = (s, r) => app(r, r.a, s.k) === r.target;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ k: r.op === '+' ? 0 : 1 }),
    ok,
    solution: r => { const k = need(r), A = app(r, r.a, k), B = app(r, r.b, k); return `${r.op === '+' ? 'sumar' : 'multiplicar por'} ${k}: ${A} ${A < B ? '<' : '>'} ${B}`; },
    prompt: r => `Lleva a a la bandera ${r.op === '+' ? 'sumando' : 'multiplicando'}`,
    foot: (r, s) => (r.op === '×' && s.k < 0 ? 'Por un negativo, el orden se voltea' : 'Arrastra el control de abajo'),
    layout(G) { const W = G.W, H = G.H; G.L1 = { x0: 22, x1: W - 22, y: 132, min: -9, max: 9 }; G.L2 = { x0: 22, x1: W - 22, y: H * 0.5, min: -9, max: 9 }; G.trackY = H * 0.68; G.fb = { x: 12, y: H - 84, w: W - 24, h: 52 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: need(r) } : G.s, K = KS[r.op];
      const X1 = drawNumLine(p, C, G.L1, { step: 1, every: 3 }), X2 = drawNumLine(p, C, G.L2, { step: 1, every: 3 }), A = app(r, r.a, s.k), B = app(r, r.b, s.k);
      drawDot(p, C, X1(r.a), G.L1.y, 13, C.sky); drawDot(p, C, X1(r.b), G.L1.y, 13, C.coral);
      TK.label(p, C, 'a', X1(r.a), G.L1.y - 18, C.sky, 13, 20); TK.label(p, C, 'b', X1(r.b), G.L1.y - 18, C.coral, 13, 20);
      p.stroke(C.ok); p.strokeWeight(2); p.line(X2(r.target), G.L2.y - 6, X2(r.target), G.L2.y - 40); p.noStroke(); p.fill(C.ok); p.triangle(X2(r.target), G.L2.y - 40, X2(r.target) + 13, G.L2.y - 34, X2(r.target), G.L2.y - 28);
      p.stroke(RK.al(p, C.line, 200)); p.strokeWeight(1); p.drawingContext.setLineDash([3, 4]); p.line(X1(r.a), G.L1.y, X2(Math.max(-9, Math.min(9, A))), G.L2.y); p.line(X1(r.b), G.L1.y, X2(Math.max(-9, Math.min(9, B))), G.L2.y); p.drawingContext.setLineDash([]);
      drawDot(p, C, X2(A), G.L2.y, 13, C.sky); drawDot(p, C, X2(B), G.L2.y, 13, C.coral);
      const kx = i => 26 + i * (G.W - 52) / (K.length - 1), ki = K.indexOf(s.k);
      p.stroke(C.line); p.strokeWeight(2); p.line(kx(0), G.trackY, kx(K.length - 1), G.trackY);
      K.forEach((k, i) => { if (i % (r.op === '+' ? 2 : 2) === 0 || k === s.k) TK.label(p, C, `${k}`.replace('-', '−'), kx(i), G.trackY + 22, k === s.k ? C.brand : C.mute, 10, 28); });
      RK.knob(p, C, kx(ki), G.trackY, C.brand); G.kx = kx; G.knob = { x: kx(ki), y: G.trackY };
      TK.label(p, C, r.op === '+' ? `sumar ${s.k}`.replace('-', '−') : `multiplicar por ${s.k}`.replace('-', '−'), G.W / 2, G.trackY - 22, C.ink, 13, 200);
      const sg = A < B ? '<' : A > B ? '>' : '=';
      RK.strip(p, C, G.fb, `$${RK.num(r.a)} < ${RK.num(r.b)} \\;\\Rightarrow\\; ${RK.num(A)} ${sg} ${RK.num(B)}$`, { kicker: sg === '>' ? 'El orden se volteó' : 'El orden se conserva', col: G.locked ? C.ok : sg === '>' ? C.coral : C.mint, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.trackY) > 34) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: G.knob, to: { x: G.knob.x - 60, y: G.knob.y }, text: 'Arrastra el control', ty: G.trackY + 50 }),
    peek: G => ({ trackY: G.trackY, kx: KS[G.r.op].map((_, i) => G.kx(i)), need: need(G.r) }),
  });
  game.move = (G, x) => { const K = KS[G.r.op]; let b = 0; for (let i = 1; i < K.length; i++) if (Math.abs(G.kx(i) - x) < Math.abs(G.kx(b) - x)) b = i; if (K[b] !== G.s.k || !G.touched[G.cur]) { G.s.k = K[b]; G.touch(); } };
  return Object.assign(game, { need, KS });
})();
;
//#archivo js/games/rejilla-razon.js
// Pinta la razón (Álgebra, alg-12; spec 2026-11-18-algebra-revision): razones equivalentes. Una rejilla de baldosas; se
// pinta pasando el dedo (si se empieza sobre una pintada, se despinta). Abajo se escribe pintadas : blancas y su forma
// simple. Hay que pintar en la razón pedida, y en una rejilla de 15 la razón 2 : 3 obliga a pintar 6, no 2.
// params = { rounds: [{ rows, cols, p, q }] }   state = { rounds: [{ on: [índices] }] }
GAMES['rejilla-razon'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  let ok = (s, r) => { const x = s.on.length, y = r.rows * r.cols - x; return x > 0 && x * r.q === y * r.p; };
  const need = r => (r.rows * r.cols * r.p) / (r.p + r.q);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ on: [] }),
    ok,
    answered: s => s.on.length > 0,
    solution: r => `${need(r)} pintadas y ${r.rows * r.cols - need(r)} blancas`,
    prompt: r => `Pinta: pintadas a blancas como ${r.p} : ${r.q}`,
    foot: () => 'Pasa el dedo por las baldosas para pintarlas',
    layout(G) { const r = G.r; G.cs = Math.min((G.W - 40) / r.cols, (G.H * 0.5) / r.rows); G.gx = (G.W - G.cs * r.cols) / 2; G.gy = 100; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.mode = null; game.lay(G); },
    draw(G) {
      game.lay(G);
      const { p, C, r } = G, n = r.rows * r.cols, s = G.locked && !ok(G.s, r) ? { on: [...Array(need(r)).keys()] } : G.s;
      for (let i = 0; i < n; i++) { const x = G.gx + (i % r.cols) * G.cs, y = G.gy + Math.floor(i / r.cols) * G.cs; p.stroke(C.line); p.strokeWeight(1); p.fill(s.on.includes(i) ? C.mint : C.card); p.rect(x + 2, y + 2, G.cs - 4, G.cs - 4, 5); }
      const x = s.on.length, y = n - x, g = gcd(x, y) || 1;
      RK.strip(p, C, G.fb, `$${x} : ${y}${x && y ? ` = ${x / g} : ${y / g}` : ''}$`, { kicker: `Pintadas : blancas · meta ${r.p} : ${r.q}`, col: G.locked || ok(G.s, r) ? C.ok : C.mint, size: 20 });
    },
    press(G, x, y) { const i = game.cell(G, x, y); if (i < 0) return false; G.mode = !G.s.on.includes(i); game.set(G, i); return true; },
    drag(G, x, y) { if (G.mode == null) return false; const i = game.cell(G, x, y); if (i >= 0) game.set(G, i); return true; },
    release(G) { G.mode = null; },
    demo: G => ({ from: { x: G.gx + G.cs / 2, y: G.gy + G.cs / 2 }, to: { x: G.gx + G.cs * 2.5, y: G.gy + G.cs / 2 }, text: 'Pasa el dedo para pintar', ty: G.gy + G.cs * G.r.rows + 20 }),
    peek: G => ({ gx: G.gx, gy: G.gy, cs: G.cs, need: need(G.r) }),
  });
  game.lay = G => { const r = G.r; G.cs = Math.min((G.W - 40) / r.cols, (G.H * 0.5) / r.rows); G.gx = (G.W - G.cs * r.cols) / 2; G.gy = 100; };
  game.cell = (G, x, y) => { const c = Math.floor((x - G.gx) / G.cs), w = Math.floor((y - G.gy) / G.cs); return c >= 0 && c < G.r.cols && w >= 0 && w < G.r.rows ? w * G.r.cols + c : -1; };
  game.set = (G, i) => { const on = G.s.on, k = on.indexOf(i); if (G.mode && k < 0) { on.push(i); G.touch(); } else if (!G.mode && k >= 0) { on.splice(k, 1); G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/receta-escala.js
// La receta (Álgebra, alg-12; spec 2026-11-18-algebra-revision): al cambiar las porciones, cada ingrediente cambia en la
// misma razón. Una receta para `base` porciones con sus barras de ingredientes; se arrastra la manija de las porciones y
// todas las barras crecen o se encogen juntas. Hay que llegar a las porciones donde el ingrediente marcado da la meta.
// params = { rounds: [{ base, items: [[nombre, cantidad, unidad]], goal: [índice, cantidad] }] }   state = { rounds: [{ n }] }
GAMES['receta-escala'] = (() => {
  const need = r => (r.goal[1] * r.base) / r.items[r.goal[0]][1];
  let ok = (s, r) => s.n === need(r);
  const MAX = 12;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ n: r.base }),
    ok,
    solution: r => `${need(r)} porciones`,
    prompt: r => { const [name, , u] = r.items[r.goal[0]]; return `¿Para cuántas porciones se usan ${r.goal[1]} ${u} de ${name}?`; },
    foot: r => `La receta es para ${r.base} porciones`,
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, k = n / r.base;
      r.items.forEach(([name, q, u], i) => {
        const y = 108 + i * 46, max = q * MAX / r.base, w = (G.W - 130) * (q * k) / max, mark = i === r.goal[0];
        TK.label(p, C, name, 44, y + 12, C.ink, 12, 76);
        p.noStroke(); p.fill(mark ? C.coral : C.sky); p.rect(86, y, Math.max(2, w), 24, 5);
        TK.label(p, C, `${+(q * k).toFixed(1)} ${u}`, Math.min(G.W - 34, 86 + w + 30), y + 12, mark ? C.coral : C.mute, 11, 56);
        if (mark) { const gx = 86 + (G.W - 130) * r.goal[1] / max; p.stroke(C.ok); p.strokeWeight(2); p.line(gx, y - 6, gx, y + 30); }
      });
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, MAX, n - 1, i => ((i + 1) % 2 === 0 || i === 0 ? String(i + 1) : null));
      TK.label(p, C, `${n} porciones`, G.W / 2, G.tY - 22, C.ink, 13, 120);
      RK.strip(p, C, G.fb, `$\\times\\,\\tfrac{${n}}{${r.base}}$ en cada ingrediente`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 2), y: G.tY }, text: 'Arrastra las porciones', ty: G.tY - 46 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/factor-cambio.js
// El factor del cambio (Álgebra, alg-13c; spec 2026-11-18-algebra-revision): cambiar un r % es multiplicar por un factor,
// y el cambio se mide sobre el valor de antes. Se arrastra el factor en una regla (de 0.50 a 1.50) y la barra de antes se
// estira o se encoge; hay que dejarla igual a la de después. El cambio porcentual se escribe solo: de 40 a 50 es +25 %,
// pero de 50 a 40 es −20 %.
// params = { rounds: [{ from, to }] }   state = { rounds: [{ k }] }   (k: índice del factor, de 0.50 a 1.50 de 0.05 en 0.05)
GAMES['factor-cambio'] = (() => {
  const F = Array.from({ length: 21 }, (_, i) => +(0.5 + i * 0.05).toFixed(2));
  const need = r => F.findIndex(f => Math.abs(f * r.from - r.to) < 1e-9);
  let ok = (s, r) => s.k === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ k: 10 }),
    ok,
    solution: r => { const f = F[need(r)]; return `× ${f}: ${f > 1 ? '+' : '−'}${Math.round(Math.abs(f - 1) * 100)} %`; },
    prompt: r => `Pasó de ${r.from} a ${r.to}. ¿Por cuánto se multiplicó?`,
    foot: () => 'Arrastra el factor hasta que las dos barras queden iguales',
    layout(G) { G.y1 = 124; G.y2 = 184; G.tY = G.H - 120; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? need(r) : G.s.k, f = F[k], u = (G.W - 70) / (Math.max(r.from, r.to) * 1.5);
      TK.label(p, C, 'antes', 30, G.y1 - 16, C.mute, 10, 50); TK.label(p, C, 'después', 34, G.y2 - 16, C.mute, 10, 60);
      p.noStroke(); p.fill(RK.al(p, C.sky, 90)); p.rect(20, G.y1, r.from * u, 24, 5); p.fill(C.sky); p.rect(20, G.y1, r.from * f * u, 24, 5);
      TK.label(p, C, `${r.from} × ${f} = ${+(r.from * f).toFixed(2)}`, Math.min(G.W - 70, 20 + r.from * f * u + 60), G.y1 + 12, C.ink, 11, 120);
      p.fill(C.coral); p.rect(20, G.y2, r.to * u, 24, 5); TK.label(p, C, String(r.to), 20 + r.to * u + 20, G.y2 + 12, C.ink, 12, 40);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, F.length, k, i => (i % 4 === 0 ? F[i].toFixed(1) : null));
      const pc = Math.round((f - 1) * 100);
      RK.strip(p, C, G.fb, `$\\times\\,${f}\\;\\Rightarrow\\;${pc >= 0 ? '+' : '-'}${Math.abs(pc)}\\,\\%$`, { kicker: 'Cambio sobre el valor de antes', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k), y: G.tY }, to: { x: G.X(G.s.k + 4), y: G.tY }, text: 'Arrastra el factor', ty: G.tY - 36 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 24, G.W - 24, F.length); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { need, F });
})();
;
//#archivo js/games/semanas-rebaja.js
// Semana a semana (Álgebra, alg-13d; spec 2026-11-18-algebra-revision): un cambio porcentual repetido es una potencia del
// factor. Cada semana el precio cambia el mismo r %; se arrastra el número de semanas y aparecen las barras de cada
// semana. Hay que encontrar la primera semana en que el precio cruza la línea marcada (la mitad, el 30 %…).
// params = { rounds: [{ r, line }] }   (r en %, negativo = rebaja; line: % del precio inicial)   state = { rounds: [{ n }] }
GAMES['semanas-rebaja'] = (() => {
  const MAX = 12;
  const val = (r, n) => 100 * (1 + r.r / 100) ** n;
  const need = r => { for (let n = 1; n <= MAX; n++) if (r.r < 0 ? val(r, n) < r.line : val(r, n) > r.line) return n; return -1; };
  let ok = (s, r) => s.n === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `semana ${need(r)}: 100 × ${1 + r.r / 100}^${need(r)} ≈ ${val(r, need(r)).toFixed(1)}`,
    prompt: r => `Cada semana ${r.r < 0 ? 'baja' : 'sube'} el ${Math.abs(r.r)} %. ¿Cuándo ${r.r < 0 ? 'baja de' : 'pasa de'} ${r.line}?`,
    foot: () => 'Arrastra las semanas: busca la primera que cruza la línea',
    layout(G) { G.base = G.H - 150; G.top = 104; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, top = Math.max(100, val(r, MAX), r.line) * 1.05, Y = v => G.base - (G.base - G.top) * v / top, w = (G.W - 40) / (MAX + 1);
      for (let k = 0; k <= n; k++) { const v = val(r, k), cross = r.r < 0 ? v < r.line : v > r.line; p.noStroke(); p.fill(k === 0 ? C.line : cross ? C.coral : C.sky); p.rect(20 + k * w + 2, Y(v), w - 4, G.base - Y(v), 3); }
      p.stroke(C.ok); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.line(16, Y(r.line), G.W - 16, Y(r.line)); p.drawingContext.setLineDash([]); TK.label(p, C, String(r.line), G.W - 22, Y(r.line) - 10, C.ok, 11, 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, MAX, n - 1, i => ((i + 1) % 2 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$100 \\times ${1 + r.r / 100}^{${n}} \\approx ${val(r, n).toFixed(1)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 3), y: G.tY }, text: 'Arrastra las semanas', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need, val });
})();
;
//#archivo js/games/sube-y-baja.js
// Sube y baja (Álgebra, alg-13d; spec 2026-11-18-algebra-revision): subir un x % y luego bajar el mismo x % no devuelve
// al precio de antes: queda 100 · (1 + x)(1 − x) = 100(1 − x²). Se arrastra el porcentaje y se ven las tres barras: antes,
// después de subir y después de bajar. Hay que encontrar el porcentaje que deja el precio final pedido.
// params = { rounds: [{ end }] }   (precio final partiendo de 100)   state = { rounds: [{ x }] }   (x de 5 en 5, de 5 a 60)
GAMES['sube-y-baja'] = (() => {
  const end = x => 100 * (1 + x / 100) * (1 - x / 100);
  const need = r => { for (let x = 5; x <= 60; x += 5) if (Math.abs(end(x) - r.end) < 1e-9) return x; return -1; };
  let ok = (s, r) => s.x === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ x: 5 }),
    ok,
    solution: r => `${need(r)} %: 100 × ${1 + need(r) / 100} × ${1 - need(r) / 100} = ${r.end}`,
    prompt: r => `Sube un x % y baja el mismo x %: queda en ${r.end}. ¿Cuánto es x?`,
    foot: () => 'Arrastra el porcentaje',
    layout(G) { G.base = G.H - 160; G.tY = G.H - 112; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? need(r) : G.s.x, vals = [100, 100 * (1 + x / 100), end(x)], Y = v => G.base - (G.base - 104) * v / 165, w = (G.W - 60) / 3;
      vals.forEach((v, i) => { p.noStroke(); p.fill([C.line, C.mint, C.coral][i]); p.rect(30 + i * w + 8, Y(v), w - 16, G.base - Y(v), 4); TK.label(p, C, `${+v.toFixed(2)}`, 30 + i * w + w / 2, Y(v) - 12, C.ink, 12, w); TK.label(p, C, ['antes', `+${x} %`, `−${x} %`][i], 30 + i * w + w / 2, G.base + 12, C.mute, 10, w); });
      p.stroke(C.ok); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.line(24, Y(r.end), G.W - 24, Y(r.end)); p.drawingContext.setLineDash([]);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 12, x / 5 - 1, i => ((i + 1) % 2 === 0 ? `${(i + 1) * 5}` : null));
      RK.strip(p, C, G.fb, `$100 \\times ${1 + x / 100} \\times ${1 - x / 100} = ${+end(x).toFixed(2)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.x / 5 - 1), y: G.tY }, to: { x: G.X(G.s.x / 5 + 3), y: G.tY }, text: 'Arrastra el porcentaje', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = (RK.pick(x, 30, G.W - 30, 12) + 1) * 5; if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { need, end });
})();
;
//#archivo js/games/escalera-potencias.js
// La escalera de potencias (Álgebra, alg-21a; spec 2026-11-18-algebra-revision): subir un escalón es multiplicar por la
// base y bajar uno es dividir. Se arrastra la marca por la escalera; cada escalón por el que pasa muestra su valor, así
// se ve que b⁰ = 1 y que los exponentes negativos son fracciones. Hay que llegar al exponente que da el valor pedido.
// params = { rounds: [{ base, num, den }] }   (valor pedido num/den)   state = { rounds: [{ e }] }   (de −4 a 4)
GAMES['escalera-potencias'] = (() => {
  const val = (b, e) => b ** e;
  const need = r => { for (let e = -4; e <= 4; e++) if (Math.abs(val(r.base, e) - r.num / r.den) < 1e-12) return e; return null; };
  let ok = (s, r) => s.e === need(r);
  const frac = (b, e) => (e >= 0 ? `${b ** e}` : `\\tfrac{1}{${b ** -e}}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ e: 1 }),
    ok,
    solution: r => `${r.base}^${need(r)} = ${r.den === 1 ? r.num : `${r.num}/${r.den}`}`,
    prompt: r => `¿Qué exponente de ${r.base} da $${r.den === 1 ? r.num : `\\tfrac{${r.num}}{${r.den}}`}$?`,
    foot: (r) => `Subir es × ${r.base}; bajar es ÷ ${r.base}`,
    layout(G) { G.y0 = 104; G.y1 = G.H - 96; G.x = G.W * 0.42; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; G.seen = new Set([0, 1]); },
    draw(G) {
      const { p, C, r } = G, e = G.locked && !ok(G.s, r) ? need(r) : G.s.e, Y = k => G.y1 - (k + 4) * (G.y1 - G.y0) / 8;
      if (!G.seen) G.seen = new Set([0, 1]);
      for (let k = Math.min(1, e); k <= Math.max(1, e); k++) G.seen.add(k);
      p.stroke(C.line); p.strokeWeight(3); p.line(G.x - 40, Y(-4) + 10, G.x - 40, Y(4) - 10); p.line(G.x + 40, Y(-4) + 10, G.x + 40, Y(4) - 10);
      for (let k = -4; k <= 4; k++) {
        p.stroke(k === 0 ? C.sun : C.line); p.strokeWeight(k === 0 ? 3 : 2); p.line(G.x - 40, Y(k), G.x + 40, Y(k));
        TK.label(p, C, `$${r.base}^{${k}}$`, G.x - 70, Y(k), C.mute, 12, 50);
        if (G.seen.has(k) || G.locked) TK.label(p, C, `$${frac(r.base, k)}$`, G.x + 82, Y(k), k === e ? C.brand : C.ink, 13, 70);
      }
      RK.knob(p, C, G.x, Y(e), C.brand); G.ky = Y(e); G.Y = Y;
      RK.strip(p, C, G.fb, `$${r.base}^{${e}} = ${frac(r.base, e)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { if (Math.abs(x - G.x) > 70) return false; G.grab = true; game.move(G, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.x, y: G.ky }, to: { x: G.x, y: G.Y(-1) }, text: 'Arrastra la marca por la escalera', ty: G.y0 - 8 }),
    peek: G => ({ x: G.x, y0: G.y0, y1: G.y1 }),
  });
  game.move = (G, y) => { const e = Math.max(-4, Math.min(4, Math.round(-4 + ((G.y1 - y) / (G.y1 - G.y0)) * 8))); if (e !== G.s.e || !G.touched[G.cur]) { G.s.e = e; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/cancela-pisos.js
// Cancela factores (Álgebra, alg-21b; spec 2026-11-18-algebra-revision): dividir potencias de la misma base es cancelar
// por parejas. Arriba hay a copias de x y abajo b copias; se arrastra una de arriba sobre una de abajo y las dos se van
// (x/x = 1). Lo que queda dice el exponente: arriba si a > b, abajo (exponente negativo) si b > a, y 1 si son iguales.
// params = { rounds: [{ a, b, v }] }   (v: la letra)   state = { rounds: [{ k }] }   (parejas canceladas)
GAMES['cancela-pisos'] = (() => {
  let ok = (s, r) => s.k === Math.min(r.a, r.b);
  const res = r => r.a - r.b;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ k: 0 }),
    ok,
    answered: s => s.k > 0,
    solution: r => `${r.v}^${r.a} / ${r.v}^${r.b} = ${r.v}^${res(r)}`,
    prompt: r => `Simplifica $\\dfrac{${r.v}^{${r.a}}}{${r.v}^{${r.b}}}$ cancelando por parejas`,
    foot: () => 'Arrastra una ficha de arriba sobre una de abajo',
    layout(G) { G.yt = G.H * 0.36; G.yb = G.H * 0.56; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? Math.min(r.a, r.b) : G.s.k, w = Math.min(34, (G.W - 30) / Math.max(r.a, r.b) - 4);
      p.stroke(C.ink); p.strokeWeight(2.5); p.line(20, (G.yt + G.yb) / 2 + 8, G.W - 20, (G.yt + G.yb) / 2 + 8);
      G.top = []; G.bot = [];
      const row = (n, y, list) => { const x0 = G.W / 2 - (n * (w + 4) - 4) / 2; for (let i = 0; i < n; i++) { const b = { x: x0 + i * (w + 4), y: y - 16, w, h: 32, gone: i < k }; list.push(b); if (b.gone) { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([3, 3]); p.rect(b.x, b.y, w, 32, 8); p.drawingContext.setLineDash([]); } else if (!(G.drag && list === G.top && G.drag.i === i)) RK.chip(p, C, b, `$${r.v}$`, { on: true, col: list === G.top ? C.sky : C.coral, size: 15 }); } };
      row(r.a, G.yt, G.top); row(r.b, G.yb + 16, G.bot);
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 16, w, h: 32 }, `$${r.v}$`, { on: true, col: C.brand, size: 15 });
      const ra = r.a - k, rb = r.b - k;
      const tex = `\\dfrac{${r.v}^{${r.a}}}{${r.v}^{${r.b}}} = ${ra && rb ? `\\dfrac{${r.v}^{${ra}}}{${r.v}^{${rb}}}` : ra ? `${r.v}^{${ra}}` : rb ? `\\dfrac{1}{${r.v}^{${rb}}} = ${r.v}^{${-rb}}` : '1'}`;
      RK.strip(p, C, G.fb, `$${tex}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const i = G.top.findIndex(b => !b.gone && hitBox(b, x, y)); if (i < 0) return false; G.drag = { i, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; if (G.bot.some(b => !b.gone && hitBox({ x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 }, x, y)) && G.s.k < Math.min(G.r.a, G.r.b)) { G.s.k++; G.touch(); } },
    demo(G) { const a = G.top.find(b => !b.gone), b = G.bot.find(b => !b.gone); return a && b ? { from: { x: a.x + a.w / 2, y: a.y + 16 }, to: { x: b.x + b.w / 2, y: b.y + 16 }, text: 'Arrastra sobre una de abajo', ty: G.yb + 60 } : null; },
    peek: G => ({ top: G.top, bot: G.bot }),
  });
  return game;
})();
;
//#archivo js/games/copias-potencia.js
// Copias de una potencia (Álgebra, alg-21b; spec 2026-11-18-algebra-revision): potencia de una potencia. Una caja con la
// potencia de adentro (a factores) se copia arrastrando la manija: cada copia es una vez más el exponente de afuera. Los
// factores se cuentan solos: (xᵃ)ᵇ tiene a · b factores. Hay que llegar a la potencia pedida.
// params = { rounds: [{ a, total, v }] }   state = { rounds: [{ b }] }   (copias, de 1 a 6)
GAMES['copias-potencia'] = (() => {
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ b: 1 }),
    ok: (s, r) => s.b * r.a === r.total,
    solution: r => `(${r.v}^${r.a})^${r.total / r.a} = ${r.v}^${r.total}`,
    prompt: r => `Escribe $${r.v}^{${r.total}}$ como $(${r.v}^{${r.a}})^{?}$`,
    foot: () => 'Arrastra la manija para hacer copias de la caja',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, b = G.locked && G.s.b * r.a !== r.total ? r.total / r.a : G.s.b, cw = Math.min(22, (G.W - 60) / r.a - 2), h = 26;
      for (let j = 0; j < b; j++) {
        const y = 104 + j * (h + 8), x0 = G.W / 2 - (r.a * (cw + 2) + 8) / 2;
        p.stroke(C.brand); p.strokeWeight(1.5); p.noFill(); p.rect(x0 - 4, y - 3, r.a * (cw + 2) + 6, h + 6, 7);
        for (let i = 0; i < r.a; i++) RK.chip(p, C, { x: x0 + i * (cw + 2), y, w: cw, h }, r.v, { on: true, col: C.sky, size: 11, r: 5 });
      }
      G.X = RK.track(p, C, 40, G.W - 40, G.tY, 6, b - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$(${r.v}^{${r.a}})^{${b}} = ${r.v}^{${r.a} \\cdot ${b}} = ${r.v}^{${r.a * b}}$`, { col: G.locked || b * r.a === r.total && !VELO.on ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.b - 1), y: G.tY }, to: { x: G.X(G.s.b + 1), y: G.tY }, text: 'Arrastra para copiar', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const b = RK.pick(x, 40, G.W - 40, 6) + 1; if (b !== G.s.b || !G.touched[G.cur]) { G.s.b = b; G.touch(); } };
  return game;
})();
;
//#archivo js/games/fraccion-exponente.js
// El exponente fraccionario (Álgebra, alg-22a; spec 2026-11-18-algebra-revision): a^(m/n) es sacar la raíz n-ésima y
// elevar a la m. Se arrastran dos reglas: el índice de la raíz (abajo de la fracción) y la potencia (arriba). El número
// pasa primero por la raíz y luego por la potencia, y se ve cada paso. Hay que llevar la base al valor pedido.
// params = { rounds: [{ a, target }] }   state = { rounds: [{ n, m }] }   (n de 1 a 4; m de 1 a 4)
GAMES['fraccion-exponente'] = (() => {
  const val = (a, n, m) => Math.round((a ** (1 / n)) ** m * 1e6) / 1e6;
  let ok = (s, r) => Math.abs(val(r.a, s.n, s.m) - r.target) < 1e-6;
  const answer = r => { for (let n = 1; n <= 4; n++) for (let m = 1; m <= 4; m++) if (ok({ n, m }, r)) return { n, m }; return null; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ n: 1, m: 1 }),
    ok,
    solution: r => { const a = answer(r); return `${r.a}^(${a.m}/${a.n}) = ${r.target}`; },
    prompt: r => `¿Qué exponente fraccionario lleva ${r.a} a ${r.target}?`,
    foot: () => 'Conviene sacar la raíz primero: el número se achica',
    layout(G) { G.t1 = G.H - 150; G.t2 = G.H - 104; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, root = Math.round(r.a ** (1 / s.n) * 1e6) / 1e6, v = val(r.a, s.n, s.m);
      const box = (x, txt, col) => RK.chip(p, C, { x: x - 40, y: 124, w: 80, h: 44 }, txt, { on: true, col, size: 17 });
      box(G.W * 0.17, `$${r.a}$`, C.sky); RK.arrow(p, G.W * 0.17 + 42, G.W * 0.5 - 44, 146, C.line, 2);
      TK.label(p, C, `$\\sqrt[${s.n}]{\\;}$`, G.W * 0.34, 128, C.ink, 14, 50);
      box(G.W * 0.5, `$${+root.toFixed(3)}$`, C.mint); RK.arrow(p, G.W * 0.5 + 42, G.W * 0.83 - 44, 146, C.line, 2);
      TK.label(p, C, `$(\\;)^{${s.m}}$`, G.W * 0.67, 128, C.ink, 14, 50);
      box(G.W * 0.83, `$${+v.toFixed(3)}$`, Math.abs(v - r.target) < 1e-6 && !VELO.on ? C.ok : VELO.on ? C.sky : C.coral);
      RK.track(p, C, 70, G.W - 30, G.t1, 4, s.n - 1, i => String(i + 1)); TK.label(p, C, 'raíz', 34, G.t1, C.mute, 11, 40);
      RK.track(p, C, 70, G.W - 30, G.t2, 4, s.m - 1, i => String(i + 1)); TK.label(p, C, 'potencia', 34, G.t2, C.mute, 11, 56);
      RK.strip(p, C, G.fb, `$${r.a}^{${s.m}/${s.n}} = (\\sqrt[${s.n}]{${r.a}})^{${s.m}} = ${+v.toFixed(3)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const k = Math.abs(y - G.t1) < 20 ? 'n' : Math.abs(y - G.t2) < 20 ? 'm' : null; if (!k) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: 70, y: G.t1 }, to: { x: 70 + (G.W - 100) / 3 * 2, y: G.t1 }, text: 'Arrastra la raíz y la potencia', ty: G.t1 - 30 }),
    peek: G => ({ t1: G.t1, t2: G.t2 }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 70, G.W - 30, 4) + 1; if (v !== G.s[G.grab] || !G.touched[G.cur]) { G.s[G.grab] = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/suma-raices.js
// La raíz no se reparte (Álgebra, alg-22a; spec 2026-11-18-algebra-revision): √(a + b) no es √a + √b. Dos cuadrados de
// áreas a y b; se arrastra el lado de un tercer cuadrado hasta que su área sea a + b. Al lado se ve la tira √a + √b,
// que es más larga: la raíz de una suma no se reparte.
// params = { rounds: [{ a, b }] }   (a + b es un cuadrado perfecto)   state = { rounds: [{ s }] }   (lado, de 1 a 12)
GAMES['suma-raices'] = (() => {
  const need = r => Math.round(Math.sqrt(r.a + r.b));
  let ok = (s, r) => s.s * s.s === r.a + r.b;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ s: 1 }),
    ok,
    solution: r => `lado ${need(r)}: √${r.a + r.b} = ${need(r)}, no √${r.a} + √${r.b} = ${+(Math.sqrt(r.a) + Math.sqrt(r.b)).toFixed(2)}`,
    prompt: r => `Arma un cuadrado con el área de los dos: ${r.a} + ${r.b}`,
    foot: () => 'Arrastra el lado del cuadrado nuevo',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, sd = G.locked && !ok(G.s, r) ? need(r) : G.s.s, sa = Math.sqrt(r.a), sb = Math.sqrt(r.b), u = Math.min(14, (G.W - 60) / (sa + sb + need(r) + 2));
      const sq = (x, side, col, txt) => { p.stroke(col); p.strokeWeight(2); p.fill(RK.al(p, col, 60)); p.rect(x, 200 - side * u, side * u, side * u, 2); TK.label(p, C, txt, x + side * u / 2, 200 + 12, C.ink, 11, 70); };
      sq(16, sa, C.sky, `${r.a}`); sq(24 + sa * u, sb, C.mint, `${r.b}`); sq(G.W - 16 - sd * u, sd, ok(G.s, r) || G.locked ? C.ok : C.coral, `${sd}² = ${sd * sd}`);
      // La tira √a + √b frente al lado nuevo.
      const y = 236; p.noStroke(); p.fill(C.sky); p.rect(16, y, sa * u, 8); p.fill(C.mint); p.rect(16 + sa * u, y, sb * u, 8); p.fill(C.coral); p.rect(16, y + 14, sd * u, 8);
      TK.label(p, C, `√${r.a} + √${r.b} ≈ ${(sa + sb).toFixed(2)}`, 16 + (sa + sb) * u + 60, y + 4, C.mute, 10, 120);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 12, sd - 1, i => ((i + 1) % 2 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$\\sqrt{${r.a} + ${r.b}} = \\sqrt{${r.a + r.b}}${ok({ s: sd }, r) ? ` = ${sd}` : ''} \\ne \\sqrt{${r.a}} + \\sqrt{${r.b}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.s - 1), y: G.tY }, to: { x: G.X(G.s.s + 3), y: G.tY }, text: 'Arrastra el lado', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 12) + 1; if (v !== G.s.s || !G.touched[G.cur]) { G.s.s = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/racionaliza-uno.js
// El uno disfrazado (Álgebra, alg-22b; spec 2026-11-18-algebra-revision): racionalizar es multiplicar por 1 escrito como
// √n/√n. La fracción tiene una raíz abajo; abajo hay tarjetas que valen 1 (√2/√2, √3/√3, 2/2…). Se arrastra una sobre la
// fracción y se multiplica: solo la que tiene la misma raíz deja el denominador sin raíz. La fracción vale lo mismo.
// params = { rounds: [{ k, n, cards: [m, …] }] }   (k/√n; cada tarjeta es √m/√m, o m/m si m es negativo)   state = { rounds: [{ c }] }
GAMES['racionaliza-uno'] = (() => {
  let ok = (s, r) => s.c != null && r.cards[s.c] === r.n;
  const cardTex = m => (m > 0 ? `\\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}}` : `\\dfrac{${-m}}{${-m}}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ c: null }),
    ok,
    answered: s => s.c != null,
    solution: r => `× √${r.n}/√${r.n}: ${r.k}√${r.n}/${r.n}`,
    prompt: r => `Quita la raíz de abajo en $\\dfrac{${r.k}}{\\sqrt{${r.n}}}$`,
    foot: () => 'Arrastra una tarjeta que valga 1 sobre la fracción',
    layout(G) { G.f = { x: G.W / 2 - 70, y: 104, w: 140, h: 76 }; G.cy = G.H * 0.56; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { c: r.cards.indexOf(r.n) } : G.s, m = s.c == null ? null : r.cards[s.c];
      p.stroke(C.brand); p.strokeWeight(1.5); p.fill(RK.al(p, C.brand, 22)); p.rect(G.f.x, G.f.y, G.f.w, G.f.h, 12);
      TK.label(p, C, m == null ? `$\\dfrac{${r.k}}{\\sqrt{${r.n}}}$` : `$\\dfrac{${r.k}}{\\sqrt{${r.n}}}\\cdot${cardTex(m)}$`, G.f.x + G.f.w / 2, G.f.y + G.f.h / 2, C.ink, 18, G.f.w - 10);
      const w = Math.min(70, (G.W - 30) / r.cards.length - 8);
      G.cards = r.cards.map((mm, i) => ({ i, x: G.W / 2 - (r.cards.length * (w + 8) - 8) / 2 + i * (w + 8), y: G.cy, w, h: 58 }));
      G.cards.forEach(b => { if (G.drag?.i !== b.i) RK.chip(p, C, b, `$${cardTex(r.cards[b.i])}$`, { on: s.c === b.i, size: 15 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 29, w, h: 58 }, `$${cardTex(r.cards[G.drag.i])}$`, { on: true, size: 15 });
      let tex = `\\dfrac{${r.k}}{\\sqrt{${r.n}}}`;
      if (m != null) tex = m > 0 ? (m === r.n ? `\\dfrac{${r.k}\\sqrt{${r.n}}}{${r.n}}` : `\\dfrac{${r.k}\\sqrt{${m}}}{\\sqrt{${r.n * m}}}`) : `\\dfrac{${r.k * -m}}{${-m}\\sqrt{${r.n}}}`;
      RK.strip(p, C, G.fb, `$${tex}$`, { kicker: m == null ? 'Elige un uno disfrazado' : m === r.n ? 'Abajo ya no hay raíz' : 'Abajo sigue habiendo raíz', col: G.locked || ok(G.s, r) ? C.ok : C.coral, size: 18 });
    },
    press(G, x, y) { const b = (G.cards || []).find(b => hitBox(b, x, y)); if (!b) return false; G.drag = { i: b.i, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; if (hitBox({ x: G.f.x - 20, y: G.f.y - 20, w: G.f.w + 40, h: G.f.h + 40 }, x, y)) { G.s.c = d.i; G.touch(); } },
    demo(G) { const b = G.cards?.[0]; return b ? { from: { x: b.x + b.w / 2, y: b.y + 29 }, to: { x: G.f.x + G.f.w / 2, y: G.f.y + G.f.h / 2 }, text: 'Arrastra una tarjeta a la fracción', ty: G.cy + 80 } : null; },
    peek: G => ({ cards: G.cards, f: G.f }),
  });
  return game;
})();
;
//#archivo js/games/copias-raiz.js
// Copias de una raíz (Álgebra, alg-22b; spec 2026-11-18-algebra-revision): meter el coeficiente al radical. k√n son k
// segmentos de largo √n puestos en fila. Debajo hay un solo segmento √m; se arrastra m hasta que mida lo mismo que la
// fila. Así se ve que k√n = √(k²·n), y comparar dos radicales es fácil cuando los dos están adentro.
// params = { rounds: [{ k, n }] }   state = { rounds: [{ m }] }   (de 1 a 100)
GAMES['copias-raiz'] = (() => {
  const need = r => r.k * r.k * r.n;
  let ok = (s, r) => s.m === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ m: 10 }),
    ok,
    solution: r => `${r.k}√${r.n} = √${need(r)}`,
    prompt: r => `Escribe $${r.k}\\sqrt{${r.n}}$ como una sola raíz`,
    foot: () => 'Arrastra hasta que el segmento de abajo mida lo mismo que la fila',
    layout(G) { G.tY = G.H - 110; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, m = G.locked && !ok(G.s, r) ? need(r) : G.s.m, u = (G.W - 40) / Math.sqrt(100), y1 = 140, y2 = 196;
      for (let i = 0; i < r.k; i++) { const x = 20 + i * Math.sqrt(r.n) * u; p.stroke(i % 2 ? C.sky : C.mint); p.strokeWeight(8); p.line(x + 1, y1, x + Math.sqrt(r.n) * u - 1, y1); TK.label(p, C, `√${r.n}`, x + Math.sqrt(r.n) * u / 2, y1 - 16, C.mute, 10, 40); }
      const L = Math.sqrt(m) * u, good = ok({ m }, r);
      p.stroke(good || G.locked ? C.ok : C.coral); p.strokeWeight(8); p.line(20, y2, 20 + L, y2); TK.label(p, C, `√${m} ≈ ${Math.sqrt(m).toFixed(2)}`, Math.min(G.W - 60, 20 + L + 50), y2 + 18, C.ink, 11, 100);
      p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([3, 4]); p.line(20 + r.k * Math.sqrt(r.n) * u, y1 - 10, 20 + r.k * Math.sqrt(r.n) * u, y2 + 10); p.drawingContext.setLineDash([]);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, 100, m - 1, i => ((i + 1) % 20 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$${r.k}\\sqrt{${r.n}} = \\sqrt{${r.k}^2 \\cdot ${r.n}} \\;\\;?\\;\\; \\sqrt{${m}}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.m - 1), y: G.tY }, to: { x: G.X(G.s.m + 20), y: G.tY }, text: 'Arrastra m', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const m = RK.pick(x, 24, G.W - 24, 100) + 1; if (m !== G.s.m || !G.touched[G.cur]) { G.s.m = m; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/goteo-tanque.js
// El tanque que gotea (Álgebra, alg-14; spec 2026-11-18-algebra-revision): una progresión aritmética que baja. El tanque
// empieza con a₁ litros y cada hora pierde lo mismo (la diferencia es negativa). Se arrastran las horas y aparece una
// barra por hora; hay que encontrar la hora en que el nivel llega a la marca: aₙ = a₁ + (n − 1)·d.
// params = { rounds: [{ a1, d, target }] }   (d < 0)   state = { rounds: [{ n }] }   (n de 1 a 12: la n-ésima medición)
GAMES['goteo-tanque'] = (() => {
  const MAX = 12;
  const term = (r, n) => r.a1 + (n - 1) * r.d;
  const need = r => (r.target - r.a1) / r.d + 1;
  let ok = (s, r) => term(r, s.n) === r.target;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `medición ${need(r)}: ${r.a1} + ${need(r) - 1} · (${r.d}) = ${r.target}`,
    prompt: r => `Empieza con ${r.a1} L y pierde ${-r.d} L por hora. ¿En qué medición marca ${r.target}?`,
    foot: () => 'La primera medición es al empezar: entre la 1 y la n hay n − 1 horas',
    layout(G) { G.base = G.H - 150; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, w = (G.W - 40) / MAX, Y = v => G.base - (G.base - 110) * v / r.a1;
      for (let k = 1; k <= n; k++) { const v = term(r, k); p.noStroke(); p.fill(v === r.target && k === n && !VELO.on ? C.ok : C.sky); p.rect(20 + (k - 1) * w + 2, Y(Math.max(0, v)), w - 4, G.base - Y(Math.max(0, v)), 3); if (w > 18) TK.label(p, C, String(v), 20 + (k - 0.5) * w, Y(Math.max(0, v)) - 9, C.mute, 9, w); }
      p.stroke(C.ok); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.line(16, Y(r.target), G.W - 16, Y(r.target)); p.drawingContext.setLineDash([]);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, MAX, n - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$a_{${n}} = ${r.a1} + ${n - 1}\\cdot(${r.d}) = ${term(r, n)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 3), y: G.tY }, text: 'Arrastra las mediciones', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/poste-cerca.js
// Los postes de la cerca (Álgebra, alg-14; spec 2026-11-18-algebra-revision): términos y saltos no son lo mismo. Una
// cerca de L metros con un poste cada d metros: se arrastra cuántos postes poner y se ven los tramos. Entre el primero y
// el último hay n − 1 tramos, así que hacen falta L/d + 1 postes (los de las puntas también cuentan).
// params = { rounds: [{ L, d }] }   state = { rounds: [{ n }] }   (postes, de 2 a 13)
GAMES['poste-cerca'] = (() => {
  const MAX = 13;
  const need = r => r.L / r.d + 1;
  let ok = (s, r) => s.n === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 0.95,
    init: () => ({ n: 2 }),
    ok,
    solution: r => `${need(r)} postes: ${need(r) - 1} tramos de ${r.d} m = ${r.L} m`,
    prompt: r => `Una cerca de ${r.L} m con un poste cada ${r.d} m. ¿Cuántos postes?`,
    foot: () => 'Arrastra cuántos postes poner',
    layout(G) { G.y = G.H * 0.42; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, x0 = 24, x1 = G.W - 24, len = (n - 1) * r.d, X = m => x0 + (x1 - x0) * m / r.L;
      p.stroke(C.line); p.strokeWeight(2); p.drawingContext.setLineDash([4, 4]); p.line(x0, G.y + 30, x1, G.y + 30); p.drawingContext.setLineDash([]);
      TK.label(p, C, `${r.L} m`, G.W / 2, G.y + 46, C.mute, 11, 60);
      for (let k = 0; k < n; k++) { const x = X(Math.min(k * r.d, r.L * 1.08)); if (k) { p.stroke(C.sun); p.strokeWeight(3); p.line(X((k - 1) * r.d), G.y - 10, x, G.y - 10); p.line(X((k - 1) * r.d), G.y + 6, x, G.y + 6); } p.stroke(C.ink); p.strokeWeight(5); p.line(x, G.y - 26, x, G.y + 22); }
      TK.label(p, C, `${n - 1} tramos · ${len} m`, G.W / 2, G.y - 44, len === r.L && !VELO.on ? C.ok : C.ink, 13, 160);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, MAX - 1, n - 2, i => ((i + 2) % 2 === 0 ? String(i + 2) : null));
      RK.strip(p, C, G.fb, `$${n}\\text{ postes} \\to ${n - 1}\\text{ tramos} \\cdot ${r.d} = ${len}\\text{ m}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 2), y: G.tY }, to: { x: G.X(G.s.n + 1), y: G.tY }, text: 'Arrastra los postes', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, MAX - 1) + 2; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/nivela-barras.js
// Nivela las barras (Álgebra, alg-14b; spec 2026-11-18-algebra-revision): la suma de una progresión aritmética es el
// número de términos por el promedio de los extremos. Las barras de los términos están en fila; se arrastra una línea de
// nivel: lo que sobra arriba de la línea llena lo que falta abajo. Cuando todo queda parejo, la línea está en el
// promedio (a₁ + aₙ)/2 y la suma es n por esa altura.
// params = { rounds: [{ a1, d, n }] }   state = { rounds: [{ h }] }   (altura de la línea, de medio en medio)
GAMES['nivela-barras'] = (() => {
  const terms = r => Array.from({ length: r.n }, (_, i) => r.a1 + i * r.d);
  const avg = r => (2 * r.a1 + (r.n - 1) * r.d) / 2;
  let ok = (s, r) => Math.abs(s.h - avg(r)) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ h: r.a1 }),
    ok,
    solution: r => `nivel ${avg(r)}: suma = ${r.n} · ${avg(r)} = ${r.n * avg(r)}`,
    prompt: r => `Nivela las barras de $${terms(r).join(' + ')}$`,
    foot: () => 'Arrastra la línea hasta que lo que sobra arriba llene lo que falta abajo',
    layout(G) { G.base = G.H - 110; G.fb = { x: 12, y: G.H - 74, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, h = G.locked && !ok(G.s, r) ? avg(r) : G.s.h, T = terms(r), top = Math.max(...T) * 1.15, Y = v => G.base - (G.base - 110) * v / top, w = (G.W - 40) / r.n;
      let over = 0, under = 0;
      T.forEach((v, i) => { const x = 20 + i * w + 3; p.noStroke(); p.fill(C.sky); p.rect(x, Y(v), w - 6, G.base - Y(v), 3); if (v > h) { p.fill(RK.al(p, C.coral, 150)); p.rect(x, Y(v), w - 6, Y(h) - Y(v)); over += v - h; } else if (v < h) { p.noFill(); p.stroke(C.mint); p.strokeWeight(1.5); p.drawingContext.setLineDash([3, 3]); p.rect(x, Y(h), w - 6, Y(v) - Y(h)); p.drawingContext.setLineDash([]); under += h - v; } });
      p.stroke(C.brand); p.strokeWeight(3); p.line(14, Y(h), G.W - 14, Y(h)); RK.knob(p, C, G.W - 22, Y(h), C.brand); G.ky = Y(h); G.Y = Y; G.top = top;
      TK.label(p, C, `sobra ${over}  ·  falta ${under}`, G.W / 2, 104, over === under && !VELO.on ? C.ok : C.mute, 12, G.W - 30);
      RK.strip(p, C, G.fb, `$S = ${r.n} \\cdot ${h} = ${r.n * h}$`, { kicker: 'n · nivel', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.ky) > 40) return false; G.grab = true; game.move(G, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.W - 22, y: G.ky }, to: { x: G.W - 22, y: G.ky - 50 }, text: 'Arrastra la línea', ty: G.base + 22 }),
    peek: G => ({ base: G.base }),
  });
  game.move = (G, y) => { const v = Math.max(0, Math.round(((G.base - y) / (G.base - 110)) * G.top * 2) / 2); if (v !== G.s.h || !G.touched[G.cur]) { G.s.h = v; G.touch(); } };
  return Object.assign(game, { avg });
})();
;
//#archivo js/games/alcancia-semanas.js
// La alcancía (Álgebra, alg-14b; spec 2026-11-18-algebra-revision): ahorrar cada semana un poco más que la anterior es
// sumar una progresión aritmética. Se arrastran las semanas; cada semana aparece su aporte y el total de la alcancía.
// Hay que encontrar la semana en que el total llega justo a la meta.
// params = { rounds: [{ a1, d, goal }] }   state = { rounds: [{ n }] }
GAMES['alcancia-semanas'] = (() => {
  const MAX = 12;
  const sum = (r, n) => (n * (2 * r.a1 + (n - 1) * r.d)) / 2;
  const need = r => { for (let n = 1; n <= MAX; n++) if (sum(r, n) === r.goal) return n; return -1; };
  let ok = (s, r) => sum(r, s.n) === r.goal;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `semana ${need(r)}: ${need(r)} · (${r.a1} + ${r.a1 + (need(r) - 1) * r.d}) / 2 = ${r.goal}`,
    prompt: r => `Ahorra ${r.a1} mil la 1.ª semana y ${r.d} mil más cada semana. ¿Cuándo junta ${r.goal} mil?`,
    foot: () => 'Arrastra las semanas',
    layout(G) { G.base = G.H - 150; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, w = (G.W - 110) / MAX, top = r.a1 + (MAX - 1) * r.d, Y = v => G.base - (G.base - 110) * v / top;
      for (let k = 1; k <= n; k++) { const v = r.a1 + (k - 1) * r.d; p.noStroke(); p.fill(C.mint); p.rect(20 + (k - 1) * w + 2, Y(v), w - 4, G.base - Y(v), 3); }
      // La alcancía con el total.
      const tot = sum(r, n), hb = 90, f = Math.min(1, tot / (r.goal * 1.3));
      p.stroke(C.ink); p.strokeWeight(2); p.fill(C.card); p.rect(G.W - 74, G.base - hb, 54, hb, 10);
      p.noStroke(); p.fill(tot === r.goal && !VELO.on ? C.ok : C.sun); p.rect(G.W - 72, G.base - hb * f, 50, hb * f - 2, 8);
      p.stroke(C.ok); p.strokeWeight(2); p.line(G.W - 80, G.base - hb / 1.3, G.W - 14, G.base - hb / 1.3);
      TK.label(p, C, `${tot}`, G.W - 47, G.base - hb - 14, C.ink, 13, 60);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, MAX, n - 1, i => ((i + 1) % 2 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$S_{${n}} = \\tfrac{${n}\\,(${r.a1} + ${r.a1 + (n - 1) * r.d})}{2} = ${tot}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 3), y: G.tY }, text: 'Arrastra las semanas', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need, sum });
})();
;
//#archivo js/games/razon-terminos.js
// La razón escondida (Álgebra, alg-14c; spec 2026-11-18-algebra-revision): con dos términos de una progresión geométrica
// se halla la razón. Se ven aᵢ y aⱼ en su puesto; se arrastra la razón r y los términos de en medio se llenan
// multiplicando: hay que caer justo en el segundo término. Entre ellos hay j − i multiplicaciones: rʲ⁻ⁱ = aⱼ / aᵢ.
// params = { rounds: [{ i, ai, j, aj }] }   state = { rounds: [{ k }] }   (índice de la razón en R)
GAMES['razon-terminos'] = (() => {
  const R = [-3, -2, -1.5, -0.5, 0.5, 1.5, 2, 3, 4, 5];
  const need = r => R.findIndex(x => Math.abs(r.ai * x ** (r.j - r.i) - r.aj) < 1e-9);
  let ok = (s, r) => Math.abs(r.ai * R[s.k] ** (r.j - r.i) - r.aj) < 1e-9;   // vale cualquier razón que funcione (±3 si el salto es par)
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ k: 5 }),
    ok,
    solution: r => `r = ${R[need(r)]}: ${r.ai} · (${R[need(r)]})^${r.j - r.i} = ${r.aj}`,
    prompt: r => `$a_{${r.i}} = ${RK.num(r.ai)}$ y $a_{${r.j}} = ${RK.num(r.aj)}$. Halla la razón`,
    foot: () => 'Arrastra la razón: los términos de en medio se llenan solos',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? need(r) : G.s.k, x = R[k], n = r.j - r.i + 1, w = Math.min(64, (G.W - 24) / n - 6);
      for (let t = 0; t < n; t++) {
        const v = r.ai * x ** t, b = { x: G.W / 2 - (n * (w + 6) - 6) / 2 + t * (w + 6), y: 150, w, h: 42 }, last = t === n - 1;
        RK.chip(p, C, b, `$${RK.num(+v.toFixed(4))}$`, { on: t === 0 || last, col: last ? (Math.abs(v - r.aj) < 1e-9 && !VELO.on ? C.ok : VELO.on ? C.sky : C.coral) : C.sky, size: 14 });
        TK.label(p, C, `$a_{${r.i + t}}$`, b.x + w / 2, b.y - 14, C.mute, 11, w);
        if (t) TK.label(p, C, `×${RK.num(x).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2')}`, b.x - 3, b.y + 58, C.mute, 10, 40);
      }
      TK.label(p, C, `meta: ${RK.num(r.aj).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2')}`, G.W / 2, 228, C.ok, 12, 120);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, R.length, k, i => RK.num(R[i]).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2'));
      RK.strip(p, C, G.fb, `$r^{${r.j - r.i}} = \\tfrac{a_{${r.j}}}{a_{${r.i}}}\\qquad r = ${RK.num(x)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k), y: G.tY }, to: { x: G.X(G.s.k + 2), y: G.tY }, text: 'Arrastra la razón', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 24, G.W - 24, R.length); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { need, R });
})();
;
//#archivo js/games/cultivo-celulas.js
// El cultivo (Álgebra, alg-14c; spec 2026-11-18-algebra-revision): una colonia que se multiplica por r en cada
// generación. Se arrastra la generación; las células se dibujan (de a una mientras caben, luego en bloques de 10) y se
// escribe aₙ = a₁ · rⁿ⁻¹. Hay que encontrar la generación con la cantidad pedida.
// params = { rounds: [{ a1, r, target }] }   state = { rounds: [{ n }] }   (generación, de 1 a 8)
GAMES['cultivo-celulas'] = (() => {
  const MAX = 8;
  const val = (q, n) => q.a1 * q.r ** (n - 1);
  const need = q => { for (let n = 1; n <= MAX; n++) if (val(q, n) === q.target) return n; return -1; };
  let ok = (s, q) => val(q, s.n) === q.target;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ n: 1 }),
    ok,
    solution: q => `generación ${need(q)}: ${q.a1} · ${q.r}^${need(q) - 1} = ${q.target}`,
    prompt: q => `Empieza con ${q.a1} y se multiplica por ${q.r}. ¿Qué generación tiene ${q.target}?`,
    foot: () => 'Arrastra las generaciones',
    layout(G) { G.box = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.46 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r: q, box } = G, n = G.locked && !ok(G.s, q) ? need(q) : G.s.n, v = val(q, n);
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(box.x, box.y, box.w, box.h, 14);
      const big = v > 120, units = big ? Math.ceil(v / 10) : v, cols = Math.ceil(Math.sqrt(units * box.w / box.h)), cs = Math.min(18, box.w / cols - 2);
      for (let i = 0; i < Math.min(units, 400); i++) { const x = box.x + 10 + (i % cols) * (cs + 2), y = box.y + 10 + Math.floor(i / cols) * (cs + 2); if (y + cs > box.y + box.h - 6) break; p.noStroke(); p.fill(big ? C.coral : C.mint); p.circle(x + cs / 2, y + cs / 2, cs); }
      if (big) TK.label(p, C, 'cada punto = 10 células', box.x + box.w / 2, box.y + box.h - 12, C.mute, 10, 160);
      G.X = RK.track(p, C, 34, G.W - 34, G.tY, MAX, n - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$a_{${n}} = ${q.a1}\\cdot ${q.r}^{${n - 1}} = ${v}$`, { col: G.locked || ok(G.s, q) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 2), y: G.tY }, text: 'Arrastra las generaciones', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 34, G.W - 34, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/torre-geometrica.js
// La torre geométrica (Álgebra, alg-14d; spec 2026-11-18-algebra-revision): la suma de los n primeros términos de una
// progresión geométrica. Cada término es un bloque que se apila; se arrastra cuántos términos sumar y la altura de la
// torre se escribe con la fórmula Sₙ = a(rⁿ − 1)/(r − 1). Hay que llegar justo a la altura pedida.
// params = { rounds: [{ a, r, target }] }   state = { rounds: [{ n }] }
GAMES['torre-geometrica'] = (() => {
  const MAX = 8;
  const S = (q, n) => (q.a * (q.r ** n - 1)) / (q.r - 1);
  const need = q => { for (let n = 1; n <= MAX; n++) if (Math.abs(S(q, n) - q.target) < 1e-9) return n; return -1; };
  let ok = (s, q) => s.n === need(q);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ n: 1 }),
    ok,
    solution: q => `${need(q)} términos: S = ${q.target}`,
    prompt: q => `Apila ${q.a}, ${q.a * q.r}, ${q.a * q.r * q.r}, … hasta llegar a ${q.target}`,
    foot: () => 'Arrastra cuántos términos apilar',
    layout(G) { G.base = G.H - 142; G.tY = G.H - 100; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r: q } = G, n = G.locked && !ok(G.s, q) ? need(q) : G.s.n, top = Math.max(q.target * 1.25, S(q, n)), u = (G.base - 104) / top;
      let y = G.base;
      for (let k = 0; k < n; k++) { const v = q.a * q.r ** k, h = v * u; p.stroke(C.bg); p.strokeWeight(1); p.fill(k % 2 ? C.sky : C.mint); p.rect(G.W / 2 - 50, y - h, 100, h, 2); if (h > 14) TK.label(p, C, String(v), G.W / 2, y - h / 2, C.ink, 11, 90); y -= h; }
      const ty = G.base - q.target * u; p.stroke(C.ok); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.line(30, ty, G.W - 30, ty); p.drawingContext.setLineDash([]); TK.label(p, C, String(q.target), 40, ty - 10, C.ok, 11, 40);
      G.X = RK.track(p, C, 34, G.W - 34, G.tY, MAX, n - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$S_{${n}} = \\tfrac{${q.a}\\,(${q.r}^{${n}} - 1)}{${q.r} - 1} = ${S(q, n)}$`, { col: G.locked || ok(G.s, q) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 2), y: G.tY }, text: 'Arrastra los términos', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 34, G.W - 34, MAX) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/ajusta-razon.js
// La razón de la serie (Álgebra, alg-14d; spec 2026-11-18-algebra-revision): con |r| < 1 la suma infinita es a/(1 − r).
// El primer término está fijo; se arrastra la razón y las sumas parciales se dibujan como puntos que se acercan a una
// línea. Hay que elegir la razón que hace que se acerquen a la meta. Con |r| ≥ 1 los puntos se escapan.
// params = { rounds: [{ a, S }] }   state = { rounds: [{ k }] }   (índice en R)
GAMES['ajusta-razon'] = (() => {
  const R = [-0.5, -0.25, 0.25, 0.5, 0.6, 0.75, 0.8, 0.9, 1, 1.5];
  const need = q => R.findIndex(r => Math.abs(r) < 1 && Math.abs(q.a / (1 - r) - q.S) < 1e-9);
  let ok = (s, q) => s.k === need(q);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ k: 8 }),
    ok,
    solution: q => `r = ${R[need(q)]}: ${q.a} / (1 − ${R[need(q)]}) = ${q.S}`,
    prompt: q => `El primer término es ${q.a}. ¿Qué razón hace que la suma infinita sea ${q.S}?`,
    foot: () => 'Arrastra la razón y mira hacia dónde van las sumas',
    layout(G) { G.base = G.H - 150; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r: q } = G, k = G.locked && !ok(G.s, q) ? need(q) : G.s.k, r = R[k], top = q.S * 1.6, Y = v => G.base - (G.base - 108) * Math.max(-0.2 * top, Math.min(v, top)) / top, N = 12, w = (G.W - 40) / N;
      p.stroke(C.ok); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.line(16, Y(q.S), G.W - 16, Y(q.S)); p.drawingContext.setLineDash([]); TK.label(p, C, `meta ${q.S}`, G.W - 40, Y(q.S) - 10, C.ok, 10, 60);
      if (Math.abs(r) < 1) { p.stroke(C.coral); p.strokeWeight(1.4); p.line(16, Y(q.a / (1 - r)), G.W - 16, Y(q.a / (1 - r))); }
      let s = 0; for (let n = 0; n < N; n++) { s += q.a * r ** n; drawDot(p, C, 20 + (n + 0.5) * w, Y(s), 9, Math.abs(r) < 1 ? C.sky : C.coral); }
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, R.length, k, i => String(R[i]));
      RK.strip(p, C, G.fb, Math.abs(r) < 1 ? `$S = \\tfrac{${q.a}}{1 - (${r})} = ${+(q.a / (1 - r)).toFixed(3)}$` : `$|r| \\ge 1:\\ \\text{no se acerca a nada}$`, { col: G.locked || ok(G.s, q) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k), y: G.tY }, to: { x: G.X(G.s.k + 3), y: G.tY }, text: 'Arrastra la razón', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 24, G.W - 24, R.length); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { need, R });
})();
;
//#archivo js/games/sigma-indices.js
// Los límites de la sigma (Álgebra, alg-15; spec 2026-11-18-algebra-revision): en Σ el índice recorre de un límite a otro.
// Se ve la suma escrita término a término y una fila de índices k; se arrastran los dos topes (desde y hasta) y la
// sigma se desarrolla sola. Hay que dejar justo los términos de la suma pedida.
// params = { rounds: [{ f: 'texto de f(k)', vals: [f(1), …, f(10)], lo, hi }] }   state = { rounds: [{ a, b }] }
GAMES['sigma-indices'] = (() => {
  let ok = (s, q) => s.a === q.lo && s.b === q.hi;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ a: 1, b: 10 }),
    ok,
    solution: q => `k de ${q.lo} a ${q.hi}`,
    prompt: q => `Escribe $${q.vals.slice(q.lo - 1, q.hi).join(' + ')}$ con una sigma`,
    foot: () => 'Arrastra los topes: desde dónde y hasta dónde va k',
    layout(G) { G.y = G.H * 0.42; G.x0 = 20; G.u = (G.W - 40) / 10; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r: q } = G, s = G.locked && !ok(G.s, q) ? { a: q.lo, b: q.hi } : G.s;
      for (let k = 1; k <= 10; k++) {
        const x = G.x0 + (k - 0.5) * G.u, on = k >= s.a && k <= s.b;
        RK.chip(p, C, { x: x - G.u / 2 + 2, y: G.y - 18, w: G.u - 4, h: 36 }, String(q.vals[k - 1]), { on, col: C.mint, size: 12 });
        TK.label(p, C, `k=${k}`, x, G.y + 30, C.mute, 9, G.u);
      }
      [['a', s.a - 0.5], ['b', s.b + 0.5]].forEach(([key, v]) => { const x = G.x0 + v * G.u - G.u / 2; RK.knob(p, C, x, G.y - 40, G.grab === key ? C.brand : C.coral); p.stroke(C.coral); p.strokeWeight(2); p.line(x, G.y - 28, x, G.y + 22); });
      const terms = q.vals.slice(s.a - 1, s.b);
      RK.strip(p, C, G.fb, `$\\sum_{k=${s.a}}^{${s.b}} ${q.f} = ${terms.length > 4 ? `${terms.slice(0, 2).join(' + ')} + \\cdots + ${terms.at(-1)}` : terms.join(' + ')}$`, { col: G.locked || ok(G.s, q) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      if (Math.abs(y - (G.y - 40)) > 30 && Math.abs(y - G.y) > 24) return false;
      const xa = G.x0 + (G.s.a - 1) * G.u, xb = G.x0 + G.s.b * G.u;
      G.grab = Math.abs(x - xa) <= Math.abs(x - xb) ? 'a' : 'b'; game.move(G, x); return true;
    },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.x0, y: G.y - 40 }, to: { x: G.x0 + 2 * G.u, y: G.y - 40 }, text: 'Arrastra los topes', ty: G.y + 56 }),
    peek: G => ({ y: G.y, x0: G.x0, u: G.u }),
  });
  game.move = (G, x) => {
    const s = G.s, k = Math.round((x - G.x0) / G.u);   // un tope está en el hueco k (entre k y k + 1)
    if (G.grab === 'a') s.a = Math.max(1, Math.min(s.b, k + 1)); else s.b = Math.max(s.a, Math.min(10, k));
    G.touch();
  };
  return game;
})();
;
//#archivo js/games/resta-voltea.js
// Restar polinomios (Álgebra, alg-23a; spec 2026-11-18-algebra-revision): restar Q es sumar su opuesto, que es Q con
// todos los bloques volteados. En la mesa está P; abajo están los bloques de Q. Cada bloque se arrastra primero al
// volteador (cambia de color: de positivo a negativo o al revés) y luego a la mesa. Si se suma sin voltear, la cuenta da
// P + Q. Hay que dejar en la mesa P − Q.
// params = { rounds: [{ P, Q }] }   (coeficientes [x², x, 1])   state = { rounds: [{ c: [..], used: [índices], flip: [índices] }] }
GAMES['resta-voltea'] = (() => {
  const pieces = r => { const o = []; r.Q.forEach((v, i) => { for (let j = 0; j < Math.abs(v); j++) o.push({ k: 2 - i, neg: v < 0 }); }); return o; };
  const goal = r => r.P.map((v, i) => v - r.Q[i]);
  let ok = (s, r) => s.used.length === pieces(r).length && s.c.join() === goal(r).join();
  const poly = c => GAMES['bloques-polinomio'].poly(c);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ c: [...r.P], used: [], flip: [] }),
    ok,
    answered: s => s.used.length > 0,
    solution: r => poly(goal(r)),
    prompt: r => `Resta: $(${poly(r.P)}) - (${poly(r.Q)})$`,
    foot: () => 'Pasa cada bloque de Q por el volteador antes de llevarlo a la mesa',
    layout(G) { G.mat = { x: 12, y: 96, w: G.W - 24, h: G.H * 0.34 }; G.qY = G.mat.y + G.mat.h + 20; G.flipB = { x: G.W - 92, y: G.qY + 56, w: 80, h: 44 }; G.u = 36; G.s = 13; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, mat, u, s } = G, done = G.locked && !ok(G.s, r), c = done ? goal(r) : G.s.c, Q = pieces(r);
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(mat.x, mat.y, mat.w, mat.h, 14);
      let x = mat.x + 10, y = mat.y + 10, rowH = 0;
      [2, 1, 0].forEach(k => { const n = Math.abs(c[2 - k]); for (let i = 0; i < n; i++) { const [w, h] = RK.tileSize(k, u, s); if (x + w > mat.x + mat.w - 8) { x = mat.x + 10; y += rowH + 6; rowH = 0; } RK.tile(p, C, k, x, y, u, s, c[2 - k] < 0); x += w + 5; rowH = Math.max(rowH, h); } });
      p.stroke(C.brand); p.strokeWeight(1.5); p.fill(RK.al(p, C.brand, 30)); p.rect(G.flipB.x, G.flipB.y, G.flipB.w, G.flipB.h, 10); TK.label(p, C, 'volteador', G.flipB.x + G.flipB.w / 2, G.flipB.y + G.flipB.h / 2, C.ink, 11, 76);
      TK.label(p, C, 'Q', 22, G.qY - 6, C.mute, 11, 20);
      G.qs = []; let qx = 34;
      Q.forEach((q, i) => { if (G.s.used.includes(i) || done) return; const [w, h] = RK.tileSize(q.k, u, s), neg = q.neg !== G.s.flip.includes(i); const b = { i, k: q.k, neg, x: qx, y: G.qY, w, h }; G.qs.push(b); if (G.drag?.i !== i) RK.tile(p, C, q.k, qx, G.qY, u, s, neg); qx += w + 5; });
      if (G.drag) RK.tile(p, C, G.drag.k, G.drag.x - 10, G.drag.y - 10, u, s, G.drag.neg, { lift: true });
      RK.strip(p, C, G.fb, `$${poly(c)}$`, { kicker: 'En la mesa', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { const q = (G.qs || []).find(q => hitBox({ x: q.x - 3, y: q.y - 3, w: q.w + 6, h: q.h + 6 }, x, y)); if (!q) return false; G.drag = { ...q, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const s = G.s;
      if (hitBox(G.flipB, x, y)) { const k = s.flip.indexOf(d.i); if (k >= 0) s.flip.splice(k, 1); else s.flip.push(d.i); G.touch(); return; }
      if (hitBox(G.mat, x, y)) { s.c[2 - d.k] += d.neg ? -1 : 1; s.used.push(d.i); G.touch(); }
    },
    demo(G) { const q = G.qs?.[0]; return q ? { from: { x: q.x + 8, y: q.y + 12 }, to: { x: G.flipB.x + 40, y: G.flipB.y + 22 }, text: 'Primero al volteador', ty: G.flipB.y + 64 } : null; },
    peek: G => ({ qs: G.qs, mat: G.mat, flipB: G.flipB }),
  });
  return Object.assign(game, { goal, pieces });
})();
;
//#archivo js/games/diferencia-cuadrados.js
// La esquina que se mueve (Álgebra, alg-3; spec 2026-11-18-algebra-revision): (a + b)(a − b) = a² − b². Un cuadrado de
// lado a al que se le quita una esquina b × b; la tira que sobra se pasa abajo y queda un rectángulo (a + b) por (a − b).
// Se arrastran a y b hasta que el rectángulo sea el producto pedido: así 32 · 28 = 30² − 2².
// params = { rounds: [{ p, q }] }   (p > q, p + q par)   state = { rounds: [{ a, b }] }   (a de 10 a 60, b de 1 a 9)
GAMES['diferencia-cuadrados'] = (() => {
  const need = r => ({ a: (r.p + r.q) / 2, b: (r.p - r.q) / 2 });
  let ok = (s, r) => s.a + s.b === r.p && s.a - s.b === r.q;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ a: 20, b: 1 }),
    ok,
    solution: r => { const { a, b } = need(r); return `${r.p} · ${r.q} = ${a}² − ${b}² = ${a * a - b * b}`; },
    prompt: r => `Calcula $${r.p}\\cdot${r.q}$ como diferencia de cuadrados`,
    foot: () => 'Arrastra a (arriba) y b (abajo): el rectángulo mide (a + b) por (a − b)',
    layout(G) { G.t1 = G.H - 150; G.t2 = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? need(r) : G.s, k = Math.min(3.2, (G.W - 60) / (s.a + s.b) / 1, 150 / s.a), ox = 30, oy = 104;
      p.stroke(C.bg); p.strokeWeight(1.5); p.fill(C.mint); p.rect(ox, oy, (s.a - s.b) * k, s.a * k); p.fill(C.sky); p.rect(ox + (s.a - s.b) * k, oy, s.b * k, (s.a - s.b) * k);
      p.noFill(); p.stroke(C.coral); p.strokeWeight(1.5); p.drawingContext.setLineDash([3, 3]); p.rect(ox + (s.a - s.b) * k, oy + (s.a - s.b) * k, s.b * k, s.b * k); p.drawingContext.setLineDash([]);
      TK.label(p, C, `a = ${s.a}`, ox + s.a * k / 2, oy - 10, C.mute, 11, 60);
      // El rectángulo armado, a la derecha si cabe.
      const rx = ox + s.a * k + 16, rw = Math.min(G.W - rx - 12, (s.a + s.b) * k * 0.6), rh = (s.a - s.b) * k * 0.6;
      if (rw > 30) { p.stroke(C.ink); p.strokeWeight(1.5); p.fill(RK.al(p, C.brand, 60)); p.rect(rx, oy, rw, rh); TK.label(p, C, `${s.a + s.b} × ${s.a - s.b}`, rx + rw / 2, oy + rh / 2, C.ink, 11, rw); }
      G.X1 = RK.track(p, C, 70, G.W - 24, G.t1, 51, s.a - 10, i => ((i + 10) % 10 === 0 ? String(i + 10) : null)); TK.label(p, C, 'a', 40, G.t1, C.mute, 12, 20);
      G.X2 = RK.track(p, C, 70, G.W - 24, G.t2, 9, s.b - 1, i => String(i + 1)); TK.label(p, C, 'b', 40, G.t2, C.mute, 12, 20);
      RK.strip(p, C, G.fb, `$(${s.a} + ${s.b})(${s.a} - ${s.b}) = ${s.a}^2 - ${s.b}^2 = ${s.a * s.a - s.b * s.b}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const k = Math.abs(y - G.t1) < 20 ? 'a' : Math.abs(y - G.t2) < 20 ? 'b' : null; if (!k) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X1(G.s.a - 10), y: G.t1 }, to: { x: G.X1(G.s.a), y: G.t1 }, text: 'Arrastra a y b', ty: G.t1 - 26 }),
    peek: G => ({ t1: G.t1, t2: G.t2 }),
  });
  game.move = (G, x) => { const s = G.s; if (G.grab === 'a') s.a = RK.pick(x, 70, G.W - 24, 51) + 10; else s.b = RK.pick(x, 70, G.W - 24, 9) + 1; G.touch(); };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/binomios-comun.js
// Dos binomios con x (Álgebra, alg-3; spec 2026-11-18-algebra-revision): (x + a)(x + b) = x² + (a + b)x + ab. Se
// arrastran a y b y el rectángulo se arma con un cuadrado, a + b barras y ab cuadritos. Hay que armar el trinomio pedido:
// las barras dicen la suma y los cuadritos el producto.
// params = { rounds: [{ s, p }] }   (x² + s x + p)   state = { rounds: [{ a, b }] }   (de 1 a 9)
GAMES['binomios-comun'] = (() => {
  let ok = (st, r) => st.a + st.b === r.s && st.a * st.b === r.p;
  const answer = r => { for (let a = 1; a <= 9; a++) for (let b = a; b <= 9; b++) if (a + b === r.s && a * b === r.p) return { a, b }; return null; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ a: 1, b: 1 }),
    ok,
    solution: r => { const { a, b } = answer(r); return `(x + ${a})(x + ${b})`; },
    prompt: r => `Arma $x^2 + ${r.s}x + ${r.p}$ como $(x + a)(x + b)$`,
    foot: () => 'Arrastra a y b: mira cuántas barras y cuántos cuadritos salen',
    layout(G) { G.t1 = G.H - 150; G.t2 = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, u = 64, sz = 12, ox = 40, oy = 108;
      RK.tile(p, C, 2, ox, oy, u, sz, false);
      for (let i = 0; i < s.b; i++) RK.tile(p, C, 1, ox + u + i * sz, oy, u, sz, false, { label: false });
      for (let i = 0; i < s.a; i++) { p.stroke(C.line); p.fill(RK.al(p, C.sky, 170)); p.rect(ox, oy + u + i * sz, u, sz, 3); }
      for (let i = 0; i < s.a * s.b; i++) RK.tile(p, C, 0, ox + u + (i % s.b) * sz, oy + u + Math.floor(i / s.b) * sz, u, sz, false, { label: false });
      TK.label(p, C, `${s.a + s.b} barras · ${s.a * s.b} cuadritos`, G.W - 80, oy + 30, C.ink, 12, 140);
      G.X1 = RK.track(p, C, 70, G.W - 24, G.t1, 9, s.a - 1, i => String(i + 1)); TK.label(p, C, 'a', 40, G.t1, C.mute, 12, 20);
      G.X2 = RK.track(p, C, 70, G.W - 24, G.t2, 9, s.b - 1, i => String(i + 1)); TK.label(p, C, 'b', 40, G.t2, C.mute, 12, 20);
      RK.strip(p, C, G.fb, `$(x + ${s.a})(x + ${s.b}) = x^2 + ${s.a + s.b}x + ${s.a * s.b}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const k = Math.abs(y - G.t1) < 20 ? 'a' : Math.abs(y - G.t2) < 20 ? 'b' : null; if (!k) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X1(G.s.a - 1), y: G.t1 }, to: { x: G.X1(G.s.a + 2), y: G.t1 }, text: 'Arrastra a y b', ty: G.t1 - 26 }),
    peek: G => ({ t1: G.t1, t2: G.t2 }),
  });
  game.move = (G, x) => { G.s[G.grab] = RK.pick(x, 70, G.W - 24, 9) + 1; G.touch(); };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/triangulo-pascal.js
// Completa el triángulo (Álgebra, alg-24c; spec 2026-11-18-algebra-revision): en el triángulo de Pascal cada número es la
// suma de los dos de arriba. Se ven las filas hasta la n − 1 y la fila n tiene casillas vacías (las puntas son 1); se
// arrastran fichas de la bandeja a las casillas. Esa fila son los coeficientes de (a + b)ⁿ.
// params = { rounds: [{ n, extra: [números de más] }] }   state = { rounds: [{ cells: [índice de ficha | null] }] }
GAMES['triangulo-pascal'] = (() => {
  const row = n => { let r = [1]; for (let i = 0; i < n; i++) r = [1, ...r.slice(1).map((v, j) => v + r[j]), 1]; return r; };
  const inner = n => row(n).slice(1, -1);
  const chips = r => [...inner(r.n), ...r.extra].sort((a, b) => a - b);
  let ok = (s, r) => s.cells.every((c, i) => c != null && chips(r)[c] === inner(r.n)[i]);
  const answer = r => { const ch = chips(r), used = new Set(); return { cells: inner(r.n).map(v => { const i = ch.findIndex((x, k) => x === v && !used.has(k)); used.add(i); return i; }) }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ cells: inner(r.n).map(() => null) }),
    ok,
    answered: s => s.cells.some(c => c != null),
    solution: r => row(r.n).join(' '),
    prompt: r => `Completa la fila ${r.n}: cada número suma los dos de arriba`,
    foot: () => 'Arrastra fichas a las casillas vacías',
    layout(G) { G.cw = Math.min(40, (G.W - 20) / (G.r.n + 1)); G.top = 104; G.rh = 30; G.trayY = G.H - 132; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.drag = null; G.cw = Math.min(40, (G.W - 20) / (G.r.n + 1)); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, ch = chips(r), cw = G.cw = Math.min(40, (G.W - 20) / (r.n + 1));
      G.slots = [];
      for (let k = 0; k <= r.n; k++) {
        const R = row(k), y = G.top + k * G.rh;
        R.forEach((v, i) => {
          const x = G.W / 2 + (i - k / 2) * cw - cw / 2 + 2, b = { x, y, w: cw - 4, h: G.rh - 4 };
          if (k < r.n || i === 0 || i === k) RK.chip(p, C, b, String(v), { on: k === r.n, col: C.sky, size: 11, r: 6 });
          else { const c = s.cells[i - 1]; G.slots.push({ ...b, i: i - 1 }); if (c == null || G.drag?.from === i - 1) { p.noFill(); p.stroke(C.brand); p.drawingContext.setLineDash([3, 3]); p.rect(b.x, b.y, b.w, b.h, 6); p.drawingContext.setLineDash([]); } else RK.chip(p, C, b, String(ch[c]), { on: true, col: C.mint, size: 11, r: 6 }); }
        });
      }
      const free = ch.map((_, i) => i).filter(i => !s.cells.includes(i)), w = Math.min(40, (G.W - 20) / free.length - 4);
      G.tray = free.map((i, j) => ({ i, x: G.W / 2 - (free.length * (w + 4) - 4) / 2 + j * (w + 4), y: G.trayY, w, h: 30 }));
      G.tray.forEach(b => { if (!(G.drag?.c === b.i && G.drag.from == null)) RK.chip(p, C, b, String(ch[b.i]), { size: 12 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 18, y: G.drag.y - 15, w: 36, h: 30 }, String(ch[G.drag.c]), { on: true, size: 12 });
      RK.strip(p, C, G.fb, `$(a + b)^{${r.n}}:\\ ${row(r.n).map((v, i) => (i === 0 || i === r.n ? v : s.cells[i - 1] != null ? ch[s.cells[i - 1]] : '\\square')).join(',\\ ')}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const t = (G.tray || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { c: t.i, from: null, x, y }; return true; }
      const sl = (G.slots || []).find(b => hitBox(b, x, y) && G.s.cells[b.i] != null); if (sl) { G.drag = { c: G.s.cells[sl.i], from: sl.i, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const sl = (G.slots || []).find(b => hitBox({ x: b.x - 4, y: b.y - 6, w: b.w + 8, h: b.h + 12 }, x, y));
      if (d.from != null) G.s.cells[d.from] = null;
      if (sl) G.s.cells[sl.i] = d.c;
      G.touch();
    },
    demo(G) { const t = G.tray?.[0], sl = G.slots?.[0]; return t && sl ? { from: { x: t.x + t.w / 2, y: t.y + 15 }, to: { x: sl.x + sl.w / 2, y: sl.y + 13 }, text: 'Arrastra a una casilla', ty: G.trayY - 18 } : null; },
    peek: G => ({ tray: G.tray, slots: G.slots }),
  });
  return Object.assign(game, { row, answer });
})();
;
//#archivo js/games/exponentes-binomio.js
// El término buscado (Álgebra, alg-24c; spec 2026-11-18-algebra-revision): en (x + c)ⁿ los exponentes de x bajan de n a 0
// mientras los de c suben. Se arrastra el número de término k (de 0 a n) y se ve el término C(n, k)·xⁿ⁻ᵏ·cᵏ con su
// coeficiente calculado. Hay que llegar al término que tiene la potencia de x pedida.
// params = { rounds: [{ n, c, p }] }   state = { rounds: [{ k }] }
GAMES['exponentes-binomio'] = (() => {
  const C_ = (n, k) => (k === 0 || k === n ? 1 : C_(n - 1, k - 1) + C_(n - 1, k));
  let ok = (s, r) => r.n - s.k === r.p;
  const coef = (r, k) => C_(r.n, k) * r.c ** k;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ k: 0 }),
    ok,
    solution: r => `k = ${r.n - r.p}: ${coef(r, r.n - r.p)}x^${r.p}`,
    prompt: r => `En $(x + ${r.c})^{${r.n}}$, busca el término con $x^{${r.p}}$`,
    foot: () => 'Arrastra el término: los exponentes de x bajan y los del número suben',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? r.n - r.p : G.s.k, w = Math.min(54, (G.W - 20) / (r.n + 1) - 4);
      for (let j = 0; j <= r.n; j++) { const b = { x: G.W / 2 - ((r.n + 1) * (w + 4) - 4) / 2 + j * (w + 4), y: 118, w, h: 44 }; RK.chip(p, C, b, `$x^{${r.n - j}}${r.c}^{${j}}$`, { on: j === k, col: j === k ? C.brand : C.sky, size: 11 }); }
      TK.label(p, C, `$C(${r.n}, ${k})\\, x^{${r.n - k}}\\cdot ${r.c}^{${k}} = ${coef(r, k)}\\,x^{${r.n - k}}$`, G.W / 2, 196, C.ink, 17, G.W - 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, r.n + 1, k, i => String(i));
      RK.strip(p, C, G.fb, `$\\text{término } k = ${k}:\\ ${coef(r, k)}\\,x^{${r.n - k}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k), y: G.tY }, to: { x: G.X(Math.min(G.r.n, G.s.k + 2)), y: G.tY }, text: 'Arrastra el término', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 30, G.W - 30, G.r.n + 1); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { coef });
})();
;
//#archivo js/games/diferencia-esquina.js
// La esquina que falta (Álgebra, alg-24b; spec 2026-11-18-algebra-revision): factorizar x² − c cuando c es un cuadrado.
// Al cuadrado de lado x se le quita una esquina de b por b; se arrastra b hasta que la esquina valga c. Entonces la tira
// se pasa abajo y queda el rectángulo (x + b)(x − b).
// params = { rounds: [{ c }] }   state = { rounds: [{ b }] }   (de 1 a 7)
GAMES['diferencia-esquina'] = (() => {
  let ok = (s, r) => s.b * s.b === r.c;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ b: 1 }),
    ok,
    solution: r => `x² − ${r.c} = (x + ${Math.sqrt(r.c)})(x − ${Math.sqrt(r.c)})`,
    prompt: r => `Factoriza $x^2 - ${r.c}$ quitando una esquina`,
    foot: () => 'Arrastra el lado de la esquina',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, b = G.locked && !ok(G.s, r) ? Math.sqrt(r.c) : G.s.b, X = 150, k = X / 10, ox = 24, oy = 108, good = !VELO.on && b * b === r.c;
      p.stroke(C.bg); p.strokeWeight(1.5); p.fill(C.mint); p.rect(ox, oy, X - b * k, X); p.fill(C.sky); p.rect(ox + X - b * k, oy, b * k, X - b * k);
      p.noFill(); p.stroke(C.coral); p.drawingContext.setLineDash([3, 3]); p.rect(ox + X - b * k, oy + X - b * k, b * k, b * k); p.drawingContext.setLineDash([]);
      TK.label(p, C, `${b}²`, ox + X - b * k / 2, oy + X - b * k / 2, C.coral, 11, 30); TK.label(p, C, 'x', ox + X / 2, oy - 10, C.mute, 11, 20);
      if (good) { const rx = ox + X + 18, rw = Math.min(G.W - rx - 10, (X + b * k) * 0.55), rh = (X - b * k) * 0.55; p.stroke(C.ink); p.fill(RK.al(p, C.ok, 60)); p.rect(rx, oy, rw, rh); TK.label(p, C, `(x + ${b})(x − ${b})`, rx + rw / 2, oy + rh / 2, C.ink, 11, rw); }
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 7, b - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, good ? `$x^2 - ${r.c} = (x + ${b})(x - ${b})$` : `$\\text{esquina } ${b}^2 = ${b * b}$`, { kicker: `Meta: esquina de ${r.c}`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.b - 1), y: G.tY }, to: { x: G.X(G.s.b + 2), y: G.tY }, text: 'Arrastra la esquina', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const b = RK.pick(x, 30, G.W - 30, 7) + 1; if (b !== G.s.b || !G.touched[G.cur]) { G.s.b = b; G.touch(); } };
  return game;
})();
;
//#archivo js/games/suma-producto.js
// Suma y producto (Álgebra, alg-24b; spec 2026-11-18-algebra-revision): x² + sx + p = (x + m)(x + n) si m + n = s y
// m·n = p. Dos fichas en la recta de los enteros; se arrastran y arriba se ven su suma y su producto. Hay que dejar la
// pareja que da la suma y el producto del trinomio (con signos: si p es negativo, una ficha va a cada lado del 0).
// params = { rounds: [{ s, p }] }   state = { rounds: [{ m, n }] }   (de −10 a 10)
GAMES['suma-producto'] = (() => {
  let ok = (st, r) => st.m + st.n === r.s && st.m * st.n === r.p;
  const answer = r => { for (let m = -10; m <= 10; m++) for (let n = m; n <= 10; n++) if (m + n === r.s && m * n === r.p) return { m, n }; return null; };
  const t = (v, x = 'x') => (v === 0 ? '' : `${v < 0 ? '-' : '+'} ${Math.abs(v) === 1 && x ? '' : Math.abs(v)}${x}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ m: 1, n: 2 }),
    ok,
    solution: r => { const { m, n } = answer(r); return `(x ${m < 0 ? '−' : '+'} ${Math.abs(m)})(x ${n < 0 ? '−' : '+'} ${Math.abs(n)})`; },
    prompt: r => `Factoriza $x^2 ${t(r.s)} ${t(r.p, '')}$`,
    foot: () => 'Arrastra las dos fichas: busca la suma y el producto',
    layout(G) { G.L = { x0: 22, x1: G.W - 22, y: G.H * 0.55, min: -10, max: 10 }; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r, L } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, X = drawNumLine(p, C, L, { step: 1, every: 5 });
      G.X = X;
      RK.knob(p, C, X(s.m), L.y - 24, C.sky); RK.knob(p, C, X(s.n), L.y + 24 + 4, C.coral);
      TK.label(p, C, `suma ${s.m + s.n} · meta ${r.s}`, G.W / 2, 116, s.m + s.n === r.s && !VELO.on ? C.ok : C.ink, 14, G.W - 30);
      TK.label(p, C, `producto ${s.m * s.n} · meta ${r.p}`, G.W / 2, 142, s.m * s.n === r.p && !VELO.on ? C.ok : C.ink, 14, G.W - 30);
      const f = v => `(x ${v < 0 ? '-' : '+'} ${Math.abs(v)})`;
      RK.strip(p, C, G.fb, `$${f(s.m)}${f(s.n)} = x^2 ${t(s.m + s.n)} ${t(s.m * s.n, '')}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.L.y) > 50) return false; G.grab = y < G.L.y ? 'm' : 'n'; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X(G.s.m), y: G.L.y - 24 }, to: { x: G.X(G.s.m + 3), y: G.L.y - 24 }, text: 'Arrastra las fichas', ty: G.L.y + 70 }),
    peek: G => ({ L: G.L }),
  });
  game.move = (G, x) => { const L = G.L, v = Math.max(L.min, Math.min(L.max, Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min)))); G.s[G.grab] = v; G.touch(); };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/plano-complejo.js
// El plano de los complejos (Álgebra, alg-23c; spec 2026-11-18-algebra-revision): a + bi es el punto que está a de ancho
// y b de alto. Se arrastra el punto (salta a enteros) y se escribe el número que representa. Hay que ubicar el complejo
// pedido; los reales viven en el eje horizontal y los imaginarios puros en el vertical.
// params = { rounds: [{ a, b }] }   state = { rounds: [{ a, b }] }
GAMES['plano-complejo'] = (() => {
  const V = { x0: -6, x1: 6, y0: -6, y1: 6 };
  const ok = (s, r) => s.a === r.a && s.b === r.b;
  const z = (a, b) => (b === 0 ? `${a}` : `${a === 0 ? '' : a}${b < 0 ? '-' : a === 0 ? '' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}i`);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ a: 1, b: 1 }),
    ok,
    solution: r => z(r.a, r.b),
    prompt: r => `Ubica $${z(r.a, r.b)}$ en el plano complejo`,
    foot: () => 'Arrastra el punto: el ancho es la parte real y el alto la imaginaria',
    layout(G) { const s = Math.min(G.W - 32, G.H - 190); G.b = { x: (G.W - s) / 2, y: 96, w: s, h: s }; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? r : G.s, M = G.M = RK.plane(p, C, G.b, V, { lx: 'Re', ly: 'Im' });
      p.stroke(RK.al(p, C.brand, 120)); p.strokeWeight(1.4); p.drawingContext.setLineDash([4, 4]); p.line(M.X(s.a), M.Y(0), M.X(s.a), M.Y(s.b)); p.line(M.X(0), M.Y(s.b), M.X(s.a), M.Y(s.b)); p.drawingContext.setLineDash([]);
      RK.knob(p, C, M.X(s.a), M.Y(s.b), C.brand);
      RK.strip(p, C, G.fb, `$${z(s.a, s.b)}$`, { kicker: `parte real ${s.a} · parte imaginaria ${s.b}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 20 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.a), y: G.M.Y(G.s.b) }, to: { x: G.M.X(G.s.a - 3), y: G.M.Y(G.s.b + 2) }, text: 'Arrastra el punto', ty: G.b.y + G.b.h + 14 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x, y) => { const a = Math.max(V.x0, Math.min(V.x1, Math.round(G.M.iX(x)))), b = Math.max(V.y0, Math.min(V.y1, Math.round(G.M.iY(y)))); if (a !== G.s.a || b !== G.s.b || !G.touched[G.cur]) { G.s.a = a; G.s.b = b; G.touch(); } };
  return Object.assign(game, { z });
})();
;
//#archivo js/games/suma-complejos.js
// Suma de complejos (Álgebra, alg-23c; spec 2026-11-18-algebra-revision): sumar complejos es poner una flecha después de
// la otra: real con real e imaginaria con imaginaria. La flecha de z₁ está fija; se arrastra la punta de z₂ (que sale de
// la punta de z₁) hasta que la suma caiga en la estrella.
// params = { rounds: [{ z1: [a, b], target: [a, b] }] }   state = { rounds: [{ a, b }] }   (z₂)
GAMES['suma-complejos'] = (() => {
  const V = { x0: -7, x1: 7, y0: -7, y1: 7 };
  const need = r => ({ a: r.target[0] - r.z1[0], b: r.target[1] - r.z1[1] });
  let ok = (s, r) => s.a === need(r).a && s.b === need(r).b;
  const z = (a, b) => GAMES['plano-complejo'].z(a, b);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ a: 1, b: 0 }),
    ok,
    solution: r => { const n = need(r); return `z₂ = ${z(n.a, n.b)}`; },
    prompt: r => `$z_1 = ${z(...r.z1)}$. ¿Qué $z_2$ suma $${z(...r.target)}$?`,
    foot: () => 'Arrastra la punta de z₂: sale de la punta de z₁',
    layout(G) { const s = Math.min(G.W - 32, G.H - 190); G.b = { x: (G.W - s) / 2, y: 96, w: s, h: s }; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? need(r) : G.s, M = G.M = RK.plane(p, C, G.b, V, { lx: 'Re', ly: 'Im' });
      const [a1, b1] = r.z1, ax = a1 + s.a, by = b1 + s.b;
      p.noStroke(); p.fill(C.ok); p.circle(M.X(r.target[0]), M.Y(r.target[1]), 14);
      p.stroke(C.sky); p.strokeWeight(3.5); p.line(M.X(0), M.Y(0), M.X(a1), M.Y(b1));
      p.stroke(C.coral); p.line(M.X(a1), M.Y(b1), M.X(ax), M.Y(by));
      p.stroke(RK.al(p, C.brand, 160)); p.strokeWeight(1.4); p.drawingContext.setLineDash([4, 4]); p.line(M.X(0), M.Y(0), M.X(ax), M.Y(by)); p.drawingContext.setLineDash([]);
      RK.knob(p, C, M.X(ax), M.Y(by), C.coral);
      RK.strip(p, C, G.fb, `$(${z(a1, b1)}) + (${z(s.a, s.b)}) = ${z(ax, by)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.r.z1[0] + G.s.a), y: G.M.Y(G.r.z1[1] + G.s.b) }, to: { x: G.M.X(G.r.z1[0] + G.s.a + 2), y: G.M.Y(G.r.z1[1] + G.s.b + 2) }, text: 'Arrastra la punta de z₂', ty: G.b.y + G.b.h + 14 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x, y) => { const r = G.r, A = Math.max(V.x0, Math.min(V.x1, Math.round(G.M.iX(x)))), B = Math.max(V.y0, Math.min(V.y1, Math.round(G.M.iY(y)))); G.s.a = A - r.z1[0]; G.s.b = B - r.z1[1]; G.touch(); };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/modulo-circulo.js
// El módulo es una distancia (Álgebra, alg-23c; spec 2026-11-18-algebra-revision): |a + bi| = √(a² + b²) es la distancia
// del punto al origen. Se arrastra el radio de un círculo con centro en el origen hasta que pase por z; el triángulo de
// catetos a y b muestra el teorema de Pitágoras.
// params = { rounds: [{ a, b }] }   (a² + b² es un cuadrado)   state = { rounds: [{ R }] }   (de 1 a 15)
GAMES['modulo-circulo'] = (() => {
  const need = r => Math.round(Math.hypot(r.a, r.b));
  let ok = (s, r) => s.R === need(r);
  const z = (a, b) => GAMES['plano-complejo'].z(a, b);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ R: 1 }),
    ok,
    solution: r => `|${z(r.a, r.b)}| = √(${r.a * r.a} + ${r.b * r.b}) = ${need(r)}`,
    prompt: r => `Abre el círculo hasta $${z(r.a, r.b)}$: ¿cuál es su módulo?`,
    foot: () => 'Arrastra el borde del círculo',
    layout(G) { const s = Math.min(G.W - 32, G.H - 190); G.b = { x: (G.W - s) / 2, y: 96, w: s, h: s }; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, R = G.locked && !ok(G.s, r) ? need(r) : G.s.R, m = Math.max(need(r), 5) + 2, V = { x0: -m, x1: m, y0: -m, y1: m }, M = G.M = RK.plane(p, C, G.b, V, { step: m > 10 ? 2 : 1, lx: 'Re', ly: 'Im' });
      p.stroke(RK.al(p, C.sky, 160)); p.strokeWeight(1.6); p.line(M.X(0), M.Y(0), M.X(r.a), M.Y(0)); p.line(M.X(r.a), M.Y(0), M.X(r.a), M.Y(r.b));
      p.stroke(C.sky); p.strokeWeight(2.6); p.line(M.X(0), M.Y(0), M.X(r.a), M.Y(r.b)); drawDot(p, C, M.X(r.a), M.Y(r.b), 12, C.sky);
      p.noFill(); p.stroke(ok({ R }, r) || G.locked ? C.ok : C.coral); p.strokeWeight(2.4); p.circle(M.X(0), M.Y(0), 2 * (M.X(R) - M.X(0)));
      G.kx = M.X(R); RK.knob(p, C, G.kx, M.Y(0), C.coral); G.m = m;
      RK.strip(p, C, G.fb, `$\\text{radio } ${R}\\qquad |z| = \\sqrt{${r.a}^2 + ${r.b}^2}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.kx, y: G.M.Y(0) }, to: { x: G.kx + 50, y: G.M.Y(0) }, text: 'Arrastra el borde', ty: G.b.y + G.b.h + 14 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x, y) => { const R = Math.max(1, Math.min(15, Math.round(Math.hypot(G.M.iX(x), G.M.iY(y))))); if (R !== G.s.R || !G.touched[G.cur]) { G.s.R = R; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/simetria-parabola.js
// El eje de la parábola (Álgebra, alg-4a; spec 2026-11-18-algebra-revision): la parábola es simétrica respecto a la recta
// vertical x = h que pasa por el vértice. Hay dos puntos de la parábola a la misma altura; se arrastra la recta de simetría
// y el reflejo de uno aparece del otro lado: el eje está justo en el punto medio.
// params = { rounds: [{ a, h, k, x1 }] }   (puntos en x1 y 2h − x1)   state = { rounds: [{ e }] }   (de medio en medio)
GAMES['simetria-parabola'] = (() => {
  const V = { x0: -6, x1: 6, y0: -8, y1: 10 };
  const f = (r, x) => r.a * (x - r.h) ** 2 + r.k;
  let ok = (s, r) => Math.abs(s.e - r.h) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ e: r.h === 0 ? 1 : 0 }),
    ok,
    solution: r => `x = ${r.h}: el punto medio de ${r.x1} y ${2 * r.h - r.x1}`,
    prompt: r => `Los puntos en x = ${r.x1} y x = ${2 * r.h - r.x1} están a la misma altura. ¿Dónde está el eje?`,
    foot: () => 'Arrastra la recta de simetría: el reflejo debe caer en el otro punto',
    layout(G) { G.b = { x: 16, y: 104, w: G.W - 32, h: G.H * 0.56 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, e = G.locked && !ok(G.s, r) ? r.h : G.s.e, M = G.M = RK.plane(p, C, G.b, V, { step: 1 }), x2 = 2 * r.h - r.x1, y = f(r, r.x1);
      RK.curve(p, G.b, M, V, x => f(r, x), C.sky, 2.6);
      drawDot(p, C, M.X(r.x1), M.Y(y), 12, C.coral); drawDot(p, C, M.X(x2), M.Y(y), 12, C.coral);
      const refl = 2 * e - r.x1; p.noFill(); p.stroke(ok({ e }, r) ? C.ok : C.brand); p.strokeWeight(2); p.circle(M.X(refl), M.Y(y), 18);
      p.stroke(C.brand); p.strokeWeight(2); p.drawingContext.setLineDash([6, 4]); p.line(M.X(e), G.b.y, M.X(e), G.b.y + G.b.h); p.drawingContext.setLineDash([]);
      RK.knob(p, C, M.X(e), G.b.y + G.b.h - 14, C.brand);
      RK.strip(p, C, G.fb, `$x = ${RK.num(e)}$`, { kicker: `Punto medio de ${r.x1} y ${x2}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.e), y: G.b.y + G.b.h - 14 }, to: { x: G.M.X(G.s.e + 2), y: G.b.y + G.b.h - 14 }, text: 'Arrastra el eje', ty: G.b.y + 14 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x) => { const e = Math.max(V.x0, Math.min(V.x1, Math.round(G.M.iX(x) * 2) / 2)); if (e !== G.s.e || !G.touched[G.cur]) { G.s.e = e; G.touch(); } };
  return game;
})();
;
//#archivo js/games/forma-canonica.js
// De la forma general a la canónica (Álgebra, alg-4a; spec 2026-11-18-algebra-revision): y = x² + bx + c es una
// parábola cuyo vértice (h, k) se lee en y = (x − h)² + k. Se arrastran h y k y la parábola de trazos (la canónica) se
// mueve sobre la dada; cuando coinciden, h = −b/2 y k = c − h².
// params = { rounds: [{ b, c }] }   (b par)   state = { rounds: [{ h, k }] }   (h de −5 a 5; k de −8 a 8)
GAMES['forma-canonica'] = (() => {
  const V = { x0: -7, x1: 7, y0: -9, y1: 12 };
  const need = r => ({ h: -r.b / 2, k: r.c - (r.b / 2) ** 2 });
  let ok = (s, r) => s.h === need(r).h && s.k === need(r).k;
  const sg = v => (v < 0 ? `- ${Math.abs(v)}` : `+ ${v}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ h: 0, k: 0 }),
    ok,
    solution: r => { const { h, k } = need(r); return `y = (x ${sg(-h)})² ${sg(k)}`; },
    prompt: r => `Lleva $y = x^2 ${sg(r.b)}x ${sg(r.c)}$ a la forma $(x - h)^2 + k$`,
    foot: () => 'Arrastra h (arriba) y k (abajo) hasta que la parábola de trazos se monte encima',
    layout(G) { G.b = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.44 }; G.t1 = G.H - 150; G.t2 = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? need(r) : G.s, M = RK.plane(p, C, G.b, V, { step: 2 });
      RK.curve(p, G.b, M, V, x => x * x + r.b * x + r.c, C.sky, 4);
      p.drawingContext.setLineDash([6, 5]); RK.curve(p, G.b, M, V, x => (x - s.h) ** 2 + s.k, ok(s, r) ? C.ok : C.coral, 2); p.drawingContext.setLineDash([]);
      drawDot(p, C, M.X(s.h), M.Y(s.k), 11, C.coral);
      G.X1 = RK.track(p, C, 50, G.W - 24, G.t1, 11, s.h + 5, i => (i % 2 === 0 ? String(i - 5) : null)); TK.label(p, C, 'h', 26, G.t1, C.mute, 12, 20);
      G.X2 = RK.track(p, C, 50, G.W - 24, G.t2, 17, s.k + 8, i => (i % 4 === 0 ? String(i - 8) : null)); TK.label(p, C, 'k', 26, G.t2, C.mute, 12, 20);
      RK.strip(p, C, G.fb, `$y = (x ${sg(-s.h)})^2 ${sg(s.k)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const k = Math.abs(y - G.t1) < 20 ? 'h' : Math.abs(y - G.t2) < 20 ? 'k' : null; if (!k) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X1(G.s.h + 5), y: G.t1 }, to: { x: G.X1(G.s.h + 3), y: G.t1 }, text: 'Arrastra h y k', ty: G.t1 - 26 }),
    peek: G => ({ t1: G.t1, t2: G.t2 }),
  });
  game.move = (G, x) => { if (G.grab === 'h') G.s.h = RK.pick(x, 50, G.W - 24, 11) - 5; else G.s.k = RK.pick(x, 50, G.W - 24, 17) - 8; G.touch(); };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/producto-cero.js
// El producto cero (Álgebra, alg-4; spec 2026-11-18-algebra-revision): si (x − p)(x − q) = 0, algún factor es cero. Dos
// barras muestran el valor de cada factor y una tercera su producto; se arrastran dos marcas por la recta y hay que
// dejarlas en los dos valores de x que anulan el producto.
// params = { rounds: [{ p, q, a? }] }   (a(x − p)(x − q) = 0)   state = { rounds: [{ m, n }] }   (de −6 a 6)
GAMES['producto-cero'] = (() => {
  let ok = (s, r) => [s.m, s.n].sort((x, y) => x - y).join() === [r.p, r.q].sort((x, y) => x - y).join();
  const f = (v, k) => `(x ${k < 0 ? '+' : '-'} ${Math.abs(k)})`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ m: 0, n: 1 }),
    ok,
    solution: r => `x = ${r.p} o x = ${r.q}`,
    prompt: r => `Resuelve $${r.a && r.a !== 1 ? r.a : ''}${f(0, r.p)}${f(0, r.q)} = 0$`,
    foot: () => 'Arrastra las dos marcas: busca dónde se anula algún factor',
    layout(G) { G.L = { x0: 22, x1: G.W - 22, y: G.H - 120, min: -6, max: 6 }; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r, L } = G, s = G.locked && !ok(G.s, r) ? { m: r.p, n: r.q } : G.s, X = drawNumLine(p, C, L, { step: 1, every: 2 });
      G.X = X;
      [s.m, s.n].forEach((v, j) => {
        const f1 = v - r.p, f2 = v - r.q, pr = (r.a || 1) * f1 * f2, bx = j === 0 ? 20 : G.W / 2 + 6, w = G.W / 2 - 26;
        TK.label(p, C, `x = ${v}`, bx + w / 2, 104, C.ink, 13, w);
        [[f1, `x ${r.p < 0 ? '+' : '-'} ${Math.abs(r.p)}`], [f2, `x ${r.q < 0 ? '+' : '-'} ${Math.abs(r.q)}`], [pr, 'producto']].forEach(([val, t], k) => { const y = 124 + k * 26; p.noStroke(); p.fill(val === 0 && !VELO.on ? C.ok : val < 0 ? C.coral : C.sky); p.rect(bx + w / 2, y, Math.max(-w / 2, Math.min(w / 2, val * 4)), 16, 3); TK.label(p, C, `${t}: ${val}`, bx + w / 2, y + 8, C.ink, 10, w); });
      });
      RK.knob(p, C, X(s.m), L.y - 22, C.sky); RK.knob(p, C, X(s.n), L.y + 26, C.coral);
      RK.strip(p, C, G.fb, `$x = ${s.m}\\quad\\text{y}\\quad x = ${s.n}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.L.y) > 46) return false; G.grab = y < G.L.y ? 'm' : 'n'; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X(G.s.m), y: G.L.y - 22 }, to: { x: G.X(G.s.m - 2), y: G.L.y - 22 }, text: 'Arrastra las marcas', ty: G.L.y + 56 }),
    peek: G => ({ L: G.L }),
  });
  game.move = (G, x) => { const L = G.L; G.s[G.grab] = Math.max(L.min, Math.min(L.max, Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min)))); G.touch(); };
  return game;
})();
;
//#archivo js/games/discriminante-traslada.js
// ¿Cuántas veces corta? (Álgebra, alg-4; spec 2026-11-18-algebra-revision): subir o bajar la parábola cambia su
// discriminante. y = x² + bx + c: se arrastra c y la parábola sube o baja; se ven sus cortes con el eje x y Δ = b² − 4c.
// Cada ronda pide un caso: dos cortes, uno (toca) o ninguno.
// params = { rounds: [{ b, want: 2 | 1 | 0 }] }   state = { rounds: [{ c }] }   (de −8 a 12)
GAMES['discriminante-traslada'] = (() => {
  const V = { x0: -7, x1: 7, y0: -8, y1: 12 };
  const D = (r, c) => r.b * r.b - 4 * c;
  const n = d => (d > 0 ? 2 : d === 0 ? 1 : 0);
  let ok = (s, r) => n(D(r, s.c)) === r.want;
  const answer = r => { for (let c = -8; c <= 12; c++) if (n(D(r, c)) === r.want) return { c }; return null; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ c: r.want === 1 ? (r.b * r.b) / 4 + 1 : r.want === 0 ? -1 : 12 }),
    ok,
    solution: r => `c = ${answer(r).c}`,
    prompt: r => `Mueve $y = x^2 ${r.b < 0 ? '-' : '+'} ${Math.abs(r.b)}x + c$ para que corte el eje ${r.want === 2 ? 'dos veces' : r.want === 1 ? 'una sola vez' : 'ninguna vez'}`,
    foot: () => 'Arrastra c: la parábola sube o baja',
    layout(G) { G.b = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.5 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, c = G.locked && !ok(G.s, r) ? answer(r).c : G.s.c, d = D(r, c), M = RK.plane(p, C, G.b, V, { step: 2 });
      RK.curve(p, G.b, M, V, x => x * x + r.b * x + c, ok({ c }, r) ? C.ok : C.sky, 2.6);
      if (d >= 0) [(-r.b - Math.sqrt(d)) / 2, (-r.b + Math.sqrt(d)) / 2].forEach(x => drawDot(p, C, M.X(x), M.Y(0), 11, C.coral));
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, 21, c + 8, i => (i % 4 === 0 ? String(i - 8) : null));
      RK.strip(p, C, G.fb, `$\\Delta = ${r.b}^2 - 4\\cdot${c} = ${d}$`, { kicker: d > 0 ? 'positivo: dos cortes' : d === 0 ? 'cero: toca una vez' : 'negativo: ningún corte', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.c + 8), y: G.tY }, to: { x: G.X(G.s.c + 4), y: G.tY }, text: 'Arrastra c', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const c = RK.pick(x, 24, G.W - 24, 21) - 8; if (c !== G.s.c || !G.touched[G.cur]) { G.s.c = c; G.touch(); } };
  return Object.assign(game, { answer, D });
})();
;
//#archivo js/games/bolsas-residuo.js
// Bolsas y sobrantes (Álgebra, alg-23b; spec 2026-11-18-algebra-revision): dividir es empacar. N objetos en bolsas de d:
// se arrastra cuántas bolsas llenar; lo que queda suelto es el residuo, y solo vale si es menor que una bolsa. Así se lee
// dividendo = divisor · cociente + residuo, la misma igualdad de la división de polinomios.
// params = { rounds: [{ N, d }] }   state = { rounds: [{ q }] }   (de 0 a 15)
GAMES['bolsas-residuo'] = (() => {
  let ok = (s, r) => s.q === Math.floor(r.N / r.d);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ q: 1 }),
    ok,
    solution: r => `${r.N} = ${r.d} · ${Math.floor(r.N / r.d)} + ${r.N % r.d}`,
    prompt: r => `Empaca ${r.N} en bolsas de ${r.d}: ¿cociente y residuo?`,
    foot: (r, s) => { const res = r.N - r.d * s.q; return res < 0 ? 'No alcanzan para tantas bolsas' : res >= r.d ? 'Sobra para otra bolsa: el residuo debe ser menor que el divisor' : 'El residuo es menor que una bolsa'; },
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, q = G.locked && !ok(G.s, r) ? Math.floor(r.N / r.d) : G.s.q, res = r.N - r.d * q, cols = 5, bw = (G.W - 40) / cols;
      for (let b = 0; b < Math.min(q, 15); b++) { const x = 20 + (b % cols) * bw, y = 104 + Math.floor(b / cols) * 40; p.stroke(res < 0 && b >= Math.floor(r.N / r.d) ? C.bad : C.line); p.strokeWeight(1.4); p.fill(RK.al(p, C.sky, 70)); p.rect(x + 3, y, bw - 6, 34, 8); TK.label(p, C, String(r.d), x + bw / 2, y + 17, C.ink, 12, bw); }
      const loose = Math.max(0, res);
      for (let i = 0; i < Math.min(loose, 40); i++) { p.noStroke(); p.fill(res >= r.d ? C.coral : C.sun); p.circle(28 + (i % 16) * 17, 238 + Math.floor(i / 16) * 16, 11); }
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 16, q, i => (i % 3 === 0 ? String(i) : null));
      RK.strip(p, C, G.fb, `$${r.N} = ${r.d}\\cdot${q} + ${res}$`, { kicker: `cociente ${q} · residuo ${res}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.q), y: G.tY }, to: { x: G.X(G.s.q + 4), y: G.tY }, text: 'Arrastra las bolsas', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const q = RK.pick(x, 30, G.W - 30, 16); if (q !== G.s.q || !G.touched[G.cur]) { G.s.q = q; G.touch(); } };
  return game;
})();
;
//#archivo js/games/iguala-coeficientes.js
// Iguala los coeficientes (Álgebra, alg-23b; spec 2026-11-18-algebra-revision): dos polinomios son iguales si tienen los
// mismos coeficientes. Se busca (x − c)(x² + ax + b) igual a un cúbico dado: se arrastran a y b y se ve el producto
// desarrollado junto al cúbico, coeficiente por coeficiente; cada uno que coincide se pone verde.
// params = { rounds: [{ c, P: [1, p2, p1, p0] }] }   state = { rounds: [{ a, b }] }   (de −8 a 8)
GAMES['iguala-coeficientes'] = (() => {
  const prod = (c, a, b) => [1, a - c, b - c * a, -c * b];
  const answer = r => ({ a: r.P[1] + r.c, b: r.P[2] + r.c * (r.P[1] + r.c) });
  let ok = (s, r) => prod(r.c, s.a, s.b).join() === r.P.join();
  const poly3 = P => { const t = []; [[P[0], 'x^3'], [P[1], 'x^2'], [P[2], 'x'], [P[3], '']].forEach(([v, x]) => { if (!v) return; const a = Math.abs(v); t.push((v < 0 ? '-' : t.length ? '+' : '') + (x ? (a === 1 ? x : a + x) : a)); }); return t.join(' ') || '0'; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ a: 0, b: 0 }),
    ok,
    solution: r => { const { a, b } = answer(r); return `(x ${r.c < 0 ? '+' : '−'} ${Math.abs(r.c)})(x² ${a < 0 ? '−' : '+'} ${Math.abs(a)}x ${b < 0 ? '−' : '+'} ${Math.abs(b)})`; },
    prompt: r => `Escribe $${poly3(r.P)}$ como $(x ${r.c < 0 ? '+' : '-'} ${Math.abs(r.c)})(x^2 + ax + b)$`,
    foot: () => 'Arrastra a y b: compara coeficiente por coeficiente',
    layout(G) { G.t1 = G.H - 150; G.t2 = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, Q = prod(r.c, s.a, s.b), w = (G.W - 40) / 4;
      ['x³', 'x²', 'x', '1'].forEach((n, i) => {
        const x = 20 + i * w;
        TK.label(p, C, n, x + w / 2, 110, C.mute, 11, w);
        RK.chip(p, C, { x: x + 4, y: 122, w: w - 8, h: 32 }, String(r.P[i]), { on: true, col: C.sky, size: 14 });
        RK.chip(p, C, { x: x + 4, y: 164, w: w - 8, h: 32 }, String(Q[i]), { on: true, col: Q[i] === r.P[i] && !VELO.on ? C.ok : VELO.on ? C.sky : C.coral, size: 14 });
      });
      TK.label(p, C, 'meta', 14, 138, C.mute, 9, 30); TK.label(p, C, 'tuyo', 14, 180, C.mute, 9, 30);
      G.X1 = RK.track(p, C, 50, G.W - 24, G.t1, 17, s.a + 8, i => (i % 4 === 0 ? String(i - 8) : null)); TK.label(p, C, 'a', 28, G.t1, C.mute, 12, 20);
      G.X2 = RK.track(p, C, 50, G.W - 24, G.t2, 17, s.b + 8, i => (i % 4 === 0 ? String(i - 8) : null)); TK.label(p, C, 'b', 28, G.t2, C.mute, 12, 20);
      RK.strip(p, C, G.fb, `$(x ${r.c < 0 ? '+' : '-'} ${Math.abs(r.c)})(x^2 ${s.a < 0 ? '-' : '+'} ${Math.abs(s.a)}x ${s.b < 0 ? '-' : '+'} ${Math.abs(s.b)}) = ${poly3(Q)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 14 });
    },
    press(G, x, y) { const k = Math.abs(y - G.t1) < 20 ? 'a' : Math.abs(y - G.t2) < 20 ? 'b' : null; if (!k) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.X1(G.s.a + 8), y: G.t1 }, to: { x: G.X1(G.s.a + 10), y: G.t1 }, text: 'Arrastra a y b', ty: G.t1 - 26 }),
    peek: G => ({ t1: G.t1, t2: G.t2 }),
  });
  game.move = (G, x) => { G.s[G.grab] = RK.pick(x, 50, G.W - 24, 17) - 8; G.touch(); };
  return Object.assign(game, { answer, poly3 });
})();
;
//#archivo js/games/llena-sintetica.js
// Llena la tabla sintética (Álgebra, alg-92; spec 2026-11-18-algebra-revision): la división sintética entre x − c. Arriba
// van los coeficientes; se baja el primero y en cada columna se multiplica por c el último de abajo y se suma. Las
// casillas de abajo están vacías; se arrastran fichas de la bandeja a cada una. La última es el residuo.
// params = { rounds: [{ coef: [..], c, extra: [números de más] }] }   state = { rounds: [{ cells: [índice de ficha | null] }] }
GAMES['llena-sintetica'] = (() => {
  const bottom = r => { const o = [r.coef[0]]; for (let i = 1; i < r.coef.length; i++) o.push(r.coef[i] + r.c * o[i - 1]); return o; };
  const chips = r => [...bottom(r), ...r.extra].sort((a, b) => a - b);
  let ok = (s, r) => s.cells.every((c, i) => c != null && chips(r)[c] === bottom(r)[i]);
  const answer = r => { const ch = chips(r), used = new Set(); return { cells: bottom(r).map(v => { const i = ch.findIndex((x, k) => x === v && !used.has(k)); used.add(i); return i; }) }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ cells: r.coef.map(() => null) }),
    ok,
    answered: s => s.cells.some(c => c != null),
    solution: r => `abajo: ${bottom(r).join(', ')}; residuo ${bottom(r).at(-1)}`,
    prompt: r => `Divide entre $x ${r.c < 0 ? '+' : '-'} ${Math.abs(r.c)}$: llena la fila de abajo`,
    foot: () => 'Baja el primero; luego multiplica por c el de abajo y súmalo a la columna siguiente',
    layout(G) { const n = G.r.coef.length; G.cw = Math.min(56, (G.W - 70) / n); G.x0 = 60; G.y1 = 120; G.y2 = 160; G.y3 = 206; G.trayY = G.H - 134; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.drag = null; const n = G.r.coef.length; G.cw = Math.min(56, (G.W - 70) / n); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, ch = chips(r), B = bottom(r), n = r.coef.length, cw = G.cw = Math.min(56, (G.W - 70) / n);
      TK.label(p, C, String(r.c), 30, G.y1 + 14, C.brand, 16, 30);
      p.stroke(C.ink); p.strokeWeight(2); p.line(48, G.y1 - 6, 48, G.y3 + 30); p.line(48, G.y3 - 6, G.x0 + n * cw, G.y3 - 6);
      G.slots = [];
      r.coef.forEach((k, i) => {
        const x = G.x0 + i * cw;
        TK.label(p, C, String(k), x + cw / 2, G.y1 + 14, C.ink, 14, cw);
        if (i > 0) { const prev = s.cells[i - 1] != null ? ch[s.cells[i - 1]] : null; TK.label(p, C, prev == null ? '·' : String(prev * r.c), x + cw / 2, G.y2 + 10, C.mute, 12, cw); }
        const b = { x: x + 3, y: G.y3, w: cw - 6, h: 32, i };
        G.slots.push(b);
        if (s.cells[i] == null || G.drag?.from === i) { p.noFill(); p.stroke(i === n - 1 ? C.coral : C.brand); p.drawingContext.setLineDash([3, 3]); p.rect(b.x, b.y, b.w, b.h, 6); p.drawingContext.setLineDash([]); }
        else RK.chip(p, C, b, String(ch[s.cells[i]]), { on: true, col: i === n - 1 ? C.coral : C.mint, size: 13 });
      });
      TK.label(p, C, 'residuo', G.x0 + (n - 0.5) * cw, G.y3 + 46, C.coral, 10, 60);
      const free = ch.map((_, i) => i).filter(i => !s.cells.includes(i)), w = Math.min(44, (G.W - 20) / Math.max(1, free.length) - 4);
      G.tray = free.map((i, j) => ({ i, x: G.W / 2 - (free.length * (w + 4) - 4) / 2 + j * (w + 4), y: G.trayY, w, h: 30 }));
      G.tray.forEach(b => { if (!(G.drag?.c === b.i && G.drag.from == null)) RK.chip(p, C, b, String(ch[b.i]), { size: 12 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 20, y: G.drag.y - 15, w: 40, h: 30 }, String(ch[G.drag.c]), { on: true, size: 12 });
      const filled = s.cells.every(c => c != null);
      RK.strip(p, C, G.fb, filled ? `$\\text{cociente: } ${s.cells.slice(0, -1).map(c => ch[c]).join(',\\ ')}\\quad R = ${ch[s.cells.at(-1)]}$` : '$\\text{llena la fila de abajo}$', { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const t = (G.tray || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { c: t.i, from: null, x, y }; return true; }
      const sl = (G.slots || []).find(b => hitBox(b, x, y) && G.s.cells[b.i] != null); if (sl) { G.drag = { c: G.s.cells[sl.i], from: sl.i, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const sl = (G.slots || []).find(b => hitBox({ x: b.x - 4, y: b.y - 8, w: b.w + 8, h: b.h + 16 }, x, y));
      if (d.from != null) G.s.cells[d.from] = null;
      if (sl) G.s.cells[sl.i] = d.c;
      G.touch();
    },
    demo(G) { const t = G.tray?.[0], sl = G.slots?.[0]; return t && sl ? { from: { x: t.x + t.w / 2, y: t.y + 15 }, to: { x: sl.x + sl.w / 2, y: sl.y + 16 }, text: 'Arrastra a la fila de abajo', ty: G.trayY - 18 } : null; },
    peek: G => ({ tray: G.tray, slots: G.slots }),
  });
  return Object.assign(game, { bottom, answer });
})();
;
//#archivo js/games/factor-k.js
// El factor que falta (Álgebra, alg-92; spec 2026-11-18-algebra-revision): por el teorema del factor, x − c es factor de P
// si y solo si P(c) = 0. P tiene un coeficiente desconocido k; se arrastra k y se ve P(c), que es el residuo. Hay que
// dejar el residuo en cero, y la gráfica pasa entonces por (c, 0).
// params = { rounds: [{ P: [coef. con null en el lugar de k], c }] }   state = { rounds: [{ k }] }   (de −12 a 12)
GAMES['factor-k'] = (() => {
  const fill = (r, k) => r.P.map(v => (v == null ? k : v));
  const val = (P, x) => P.reduce((a, q) => a * x + q, 0);
  const need = r => { for (let k = -12; k <= 12; k++) if (val(fill(r, k), r.c) === 0) return k; return null; };
  let ok = (s, r) => val(fill(r, s.k), r.c) === 0;
  const tex = r => { const n = r.P.length - 1; return r.P.map((v, i) => { const e = n - i, x = e === 0 ? '' : e === 1 ? 'x' : `x^${e}`; const co = v == null ? 'k' : v; if (co === 0) return ''; return `${i && (co === 'k' || co > 0) ? '+' : ''}${co === 1 && x ? '' : co === -1 && x ? '-' : co}${x}`; }).join(''); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ k: 0 }),
    ok,
    solution: r => `k = ${need(r)}`,
    prompt: r => `¿Qué k hace que $x ${r.c < 0 ? '+' : '-'} ${Math.abs(r.c)}$ sea factor de $${tex(r)}$?`,
    foot: () => 'Arrastra k: el residuo es P(c)',
    layout(G) { G.b = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.44 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? need(r) : G.s.k, P = fill(r, k), V = { x0: -5, x1: 5, y0: -20, y1: 20 }, M = RK.plane(p, C, G.b, V, { step: 5 });
      RK.curve(p, G.b, M, V, x => val(P, x), C.sky, 2.4);
      const y = val(P, r.c); drawDot(p, C, M.X(r.c), M.Y(Math.max(-20, Math.min(20, y))), 12, y === 0 && !VELO.on ? C.ok : C.coral);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, 25, k + 12, i => (i % 4 === 0 ? String(i - 12) : null));
      RK.strip(p, C, G.fb, `$P(${r.c}) = ${y}$`, { kicker: `k = ${k}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k + 12), y: G.tY }, to: { x: G.X(G.s.k + 16), y: G.tY }, text: 'Arrastra k', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 24, G.W - 24, 25) - 12; if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/tramo-signo.js
// El signo en cada tramo (Álgebra, alg-93; spec 2026-11-18-algebra-revision): entre dos ceros seguidos un polinomio no
// cambia de signo. Se arrastra una ficha de prueba por la recta; arriba se ve el signo de cada factor y el del producto.
// Hay que dejar la ficha en un tramo donde el polinomio tenga el signo pedido.
// params = { rounds: [{ zeros: [..], want: 1 | -1, a?: 1 | -1 }] }   state = { rounds: [{ x }] }   (de −5.5 a 5.5 de medio en medio)
GAMES['tramo-signo'] = (() => {
  const sg = (r, x) => Math.sign((r.a || 1) * r.zeros.reduce((a, c) => a * (x - c), 1));
  let ok = (s, r) => sg(r, s.x) === r.want && !r.zeros.includes(s.x);
  const answer = r => { for (let x = -5.5; x <= 5.5; x += 0.5) if (ok({ x }, r)) return { x }; return null; };
  const fac = c => (c === 0 ? 'x' : `x ${c < 0 ? '+' : '-'} ${Math.abs(c)}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ x: r.zeros[0] }),
    ok,
    solution: r => `por ejemplo x = ${answer(r).x}`,
    prompt: r => `¿Dónde es ${r.want > 0 ? 'positivo' : 'negativo'} $${r.a === -1 ? '-' : ''}${r.zeros.map(c => `(${fac(c)})`).join('')}$?`,
    foot: () => 'Arrastra la ficha de prueba por los tramos',
    layout(G) { G.L = { x0: 24, x1: G.W - 24, y: G.H - 112, min: -6, max: 6 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? answer(r).x : G.s.x, w = (G.W - 40) / (r.zeros.length + 1);
      r.zeros.forEach((c, i) => { const v = Math.sign(x - c); RK.chip(p, C, { x: 20 + i * w + 4, y: 110, w: w - 8, h: 40 }, `${fac(c)}: ${v > 0 ? '+' : v < 0 ? '−' : '0'}`, { on: true, col: v > 0 ? C.sky : v < 0 ? C.coral : C.line, size: 11 }); });
      const t = sg(r, x); RK.chip(p, C, { x: 20 + r.zeros.length * w + 4, y: 110, w: w - 8, h: 40 }, `P: ${t > 0 ? '+' : t < 0 ? '−' : '0'}`, { on: true, col: t === r.want && !VELO.on ? C.ok : C.coral, size: 13 });
      const X = drawNumLine(p, C, G.L, { step: 1 }); G.X = X;
      r.zeros.forEach(c => drawDot(p, C, X(c), G.L.y, 10, C.ink));
      RK.knob(p, C, X(x), G.L.y - 24, C.brand);
      RK.strip(p, C, G.fb, `$x = ${x}:\\ P ${t > 0 ? '> 0' : t < 0 ? '< 0' : '= 0'}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.L.y) > 46) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.x), y: G.L.y - 24 }, to: { x: G.X(G.s.x + 2), y: G.L.y - 24 }, text: 'Arrastra la ficha', ty: G.L.y - 60 }),
    peek: G => ({ L: G.L }),
  });
  game.move = (G, x) => { const L = G.L, v = Math.max(-5.5, Math.min(5.5, Math.round((L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min)) * 2) / 2)); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/prueba-candidatos.js
// Los candidatos racionales (Álgebra, alg-93; spec 2026-11-18-algebra-revision): con coeficientes enteros y el primero 1,
// un cero entero tiene que dividir al término independiente. Las fichas son los divisores con su signo; se arrastra cada
// una al probador, que calcula P(c). Hay que llevar a la caja de los ceros todos los que dan 0, y solo esos.
// params = { rounds: [{ P: [coef.], cands: [..] }] }   state = { rounds: [{ zeros: [índices], tried: [índices] }] }
GAMES['prueba-candidatos'] = (() => {
  const val = (P, x) => P.reduce((a, q) => a * x + q, 0);
  const goods = r => r.cands.map((c, i) => (val(r.P, c) === 0 ? i : -1)).filter(i => i >= 0);
  let ok = (s, r) => [...s.zeros].sort().join() === goods(r).join();
  const poly = P => GAMES['iguala-coeficientes'].poly3([...Array(4 - P.length).fill(0), ...P]);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ zeros: [], tried: [] }),
    ok,
    answered: s => s.zeros.length > 0,
    solution: r => `ceros: ${goods(r).map(i => r.cands[i]).join(', ')}`,
    prompt: r => `Encuentra los ceros enteros de $${poly(r.P)}$`,
    foot: () => 'Arrastra un candidato al probador; si da 0, llévalo a los ceros',
    layout(G) { G.tester = { x: 16, y: 104, w: G.W / 2 - 24, h: 70 }; G.box = { x: G.W / 2 + 8, y: 104, w: G.W / 2 - 24, h: 70 }; G.cy = 210; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; G.last = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { zeros: goods(r), tried: goods(r) } : G.s;
      p.stroke(C.brand); p.strokeWeight(1.4); p.fill(RK.al(p, C.brand, 18)); p.rect(G.tester.x, G.tester.y, G.tester.w, G.tester.h, 12);
      TK.label(p, C, 'probador', G.tester.x + G.tester.w / 2, G.tester.y - 10, C.mute, 10, 80);
      if (G.last != null) TK.label(p, C, `P(${r.cands[G.last]}) = ${val(r.P, r.cands[G.last])}`, G.tester.x + G.tester.w / 2, G.tester.y + G.tester.h / 2, val(r.P, r.cands[G.last]) === 0 && !VELO.on ? C.ok : C.ink, 14, G.tester.w - 8);
      p.stroke(C.ok); p.fill(RK.al(p, C.ok, 18)); p.rect(G.box.x, G.box.y, G.box.w, G.box.h, 12); TK.label(p, C, 'ceros', G.box.x + G.box.w / 2, G.box.y - 10, C.mute, 10, 60);
      G.spots = [];
      s.zeros.forEach((i, j) => G.spots.push({ i, x: G.box.x + 8 + j * 40, y: G.box.y + 18, w: 36, h: 32, z: true }));
      const free = r.cands.map((_, i) => i).filter(i => !s.zeros.includes(i)), w = Math.min(42, (G.W - 20) / Math.ceil(free.length / 2) - 4);
      free.forEach((i, j) => G.spots.push({ i, x: 16 + (j % Math.ceil(free.length / 2)) * (w + 4), y: G.cy + Math.floor(j / Math.ceil(free.length / 2)) * 40, w, h: 32 }));
      G.spots.forEach(q => { if (G.drag?.i !== q.i) RK.chip(p, C, q, String(r.cands[q.i]), { on: q.z || s.tried.includes(q.i), col: q.z ? C.ok : val(r.P, r.cands[q.i]) === 0 && !VELO.on ? C.ok : C.coral, size: 12 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 20, y: G.drag.y - 16, w: 40, h: 32 }, String(r.cands[G.drag.i]), { on: true, size: 12 });
      RK.strip(p, C, G.fb, `$\\text{ceros: } ${s.zeros.map(i => r.cands[i]).join(',\\ ') || '\\varnothing'}$`, { kicker: 'Candidatos: divisores del último coeficiente', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const q = (G.spots || []).find(q => hitBox(q, x, y)); if (!q) return false; G.drag = { i: q.i, z: !!q.z, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const s = G.s;
      if (hitBox(G.tester, x, y)) { G.last = d.i; if (!s.tried.includes(d.i)) s.tried.push(d.i); if (d.z) s.zeros.splice(s.zeros.indexOf(d.i), 1); G.touch(); return; }
      if (hitBox(G.box, x, y) && !d.z) { s.zeros.push(d.i); G.touch(); return; }
      if (d.z && !hitBox(G.box, x, y)) { s.zeros.splice(s.zeros.indexOf(d.i), 1); G.touch(); }
    },
    demo(G) { const q = G.spots?.find(q => !q.z); return q ? { from: { x: q.x + q.w / 2, y: q.y + 16 }, to: { x: G.tester.x + G.tester.w / 2, y: G.tester.y + 35 }, text: 'Arrastra al probador', ty: G.cy + 90 } : null; },
    peek: G => ({ spots: G.spots, tester: G.tester, box: G.box }),
  });
  return Object.assign(game, { goods });
})();
;
//#archivo js/games/prohibidos.js
// Los valores prohibidos (Álgebra, alg-25a; spec 2026-11-18-algebra-revision): una fracción algebraica no existe donde su
// denominador vale cero. Se arrastran cruces a la recta, a los valores que anulan el denominador (factorizado o no). Hay
// que tachar todos los prohibidos y ninguno más: el dominio es lo que queda.
// params = { rounds: [{ tex, bad: [..] }] }   state = { rounds: [{ marks: [..] }] }   (enteros de −6 a 6)
GAMES['prohibidos'] = (() => {
  const L = { min: -6, max: 6 };
  let ok = (s, r) => [...s.marks].sort((a, b) => a - b).join() === [...r.bad].sort((a, b) => a - b).join();
  ok = velo(ok);
  const game = roundsGame({
    aspect: 0.95,
    init: () => ({ marks: [] }),
    ok,
    answered: s => s.marks.length > 0,
    solution: r => `x ≠ ${r.bad.join(', ')}`,
    prompt: r => `Tacha los valores prohibidos de $${r.tex}$`,
    foot: () => 'Arrastra cruces a la recta; arrástralas afuera para quitarlas',
    layout(G) { G.L = { x0: 24, x1: G.W - 24, y: G.H * 0.5, ...L }; G.src = { x: G.W / 2 - 22, y: G.L.y + 46, w: 44, h: 32 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { marks: r.bad } : G.s, X = drawNumLine(p, C, G.L, { step: 1, every: 2 });
      G.X = X;
      s.marks.forEach(v => { const x = X(v), y = G.L.y - 24; p.stroke(C.bad); p.strokeWeight(3); p.line(x - 8, y - 8, x + 8, y + 8); p.line(x - 8, y + 8, x + 8, y - 8); });
      RK.chip(p, C, G.src, '✕', { on: true, col: C.bad, size: 16 });
      if (G.drag) { p.stroke(C.brand); p.strokeWeight(3); p.line(G.drag.x - 8, G.drag.y - 8, G.drag.x + 8, G.drag.y + 8); p.line(G.drag.x - 8, G.drag.y + 8, G.drag.x + 8, G.drag.y - 8); }
      RK.strip(p, C, G.fb, s.marks.length ? `$x \\ne ${[...s.marks].sort((a, b) => a - b).join(',\\ ')}$` : '$\\text{sin tachar}$', { kicker: 'Dominio: todos los reales menos estos', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) {
      if (hitBox(G.src, x, y)) { G.drag = { from: null, x, y }; return true; }
      const L = G.L, v = Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min));
      if (Math.abs(y - (L.y - 24)) < 26 && G.s.marks.includes(v)) { G.drag = { from: v, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const L = G.L, v = Math.max(L.min, Math.min(L.max, Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min)))), m = G.s.marks;
      if (d.from != null) m.splice(m.indexOf(d.from), 1);
      if (Math.abs(y - L.y) < 46 && !m.includes(v)) m.push(v);
      G.touch();
    },
    demo: G => ({ from: { x: G.src.x + 22, y: G.src.y + 16 }, to: { x: G.X([5, -5, 6].find(v => !G.r.bad.includes(v))), y: G.L.y - 20 }, text: 'Arrastra la cruz a la recta', ty: G.src.y + 50 }),
    peek: G => ({ L: G.L, src: G.src }),
  });
  return game;
})();
;
//#archivo js/games/evalua-racional.js
// Evalúa la fracción (Álgebra, alg-25a; spec 2026-11-18-algebra-revision): el valor de una fracción algebraica es el
// numerador entre el denominador. Se arrastra x y dos barras muestran el numerador y el denominador; abajo, el cociente
// (o «no existe» si el denominador es 0). Hay que encontrar el x donde la fracción vale la meta.
// params = { rounds: [{ n: [a, b], d: [c, e], target }] }   (f = (ax + b)/(cx + e))   state = { rounds: [{ x }] }   (de −6 a 6)
GAMES['evalua-racional'] = (() => {
  const N = (r, x) => r.n[0] * x + r.n[1], D = (r, x) => r.d[0] * x + r.d[1];
  let ok = (s, r) => D(r, s.x) !== 0 && N(r, s.x) === r.target * D(r, s.x);
  const answer = r => { for (let x = -6; x <= 6; x++) if (ok({ x }, r)) return { x }; return null; };
  const lin = ([a, b]) => `${a === 1 ? '' : a === -1 ? '-' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: r => ({ x: -r.d[1] / r.d[0] }),
    ok,
    solution: r => `x = ${answer(r).x}`,
    prompt: r => `¿Para qué x vale ${r.target} la fracción $\\dfrac{${lin(r.n)}}{${lin(r.d)}}$?`,
    foot: () => 'Arrastra x; donde el denominador es 0 la fracción no existe',
    layout(G) { G.L = { x0: 24, x1: G.W - 24, y: G.H - 112, min: -6, max: 6 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? answer(r).x : G.s.x, n = N(r, x), d = D(r, x);
      [[n, 'numerador', C.sky], [d, 'denominador', d === 0 ? C.bad : C.coral]].forEach(([v, t, col], i) => { const y = 112 + i * 40, cx = G.W / 2; p.noStroke(); p.fill(col); p.rect(cx, y, Math.max(-G.W / 2 + 30, Math.min(G.W / 2 - 30, v * 6)), 22, 3); TK.label(p, C, `${t}: ${v}`, cx, y + 32, C.mute, 10, 120); });
      TK.label(p, C, d === 0 ? 'no existe: divide entre 0' : `f(${x}) = ${+(n / d).toFixed(3)}`, G.W / 2, 210, d === 0 ? C.bad : ok({ x }, r) ? C.ok : C.ink, 16, G.W - 30);
      const X = drawNumLine(p, C, G.L, { step: 1, every: 2 }); RK.knob(p, C, X(x), G.L.y, C.brand); G.X = X;
      RK.strip(p, C, G.fb, d === 0 ? `$f(${x})\\ \\text{no existe}$` : `$f(${x}) = \\dfrac{${n}}{${d}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.L.y) > 34) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.x), y: G.L.y }, to: { x: G.X(G.s.x + 2), y: G.L.y }, text: 'Arrastra x', ty: G.L.y - 40 }),
    peek: G => ({ L: G.L }),
  });
  game.move = (G, x) => { const L = G.L, v = Math.max(L.min, Math.min(L.max, Math.round(L.min + (x - L.x0) / (L.x1 - L.x0) * (L.max - L.min)))); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/resta-fracciones.js
// El signo menos de la resta (Álgebra, alg-25b; spec 2026-11-18-algebra-revision): al restar una fracción, el menos afecta
// a TODO su numerador; la que se suma no cambia. Sobre el común denominador están A − (B) + (C); se arrastra el signo menos
// sobre los términos que deben cambiar de signo. Un término que ya cambió sale de su paréntesis con el signo nuevo.
// params = { rounds: [{ A: [términos], B: [términos], C?: [términos], den }] }   (términos con signo: '3x', '-2')
// state = { rounds: [{ flip: ['b0', 'c1', …] }] }
GAMES['resta-fracciones'] = (() => {
  let ok = (s, r) => s.flip.length === r.B.length && r.B.every((_, i) => s.flip.includes(`b${i}`));
  const neg = t => (t.startsWith('-') ? `+${t.slice(1)}` : `-${t.replace(/^\+/, '')}`);
  const join = ts => ts.map((t, i) => (i === 0 ? t.replace(/^\+/, '') : t.startsWith('-') ? ` - ${t.slice(1)}` : ` + ${t.replace(/^\+/, '')}`)).join('');
  const result = (r, s) => [...r.A, ...r.B.map((t, i) => (s.flip.includes(`b${i}`) ? neg(t) : t)), ...(r.C || []).map((t, i) => (s.flip.includes(`c${i}`) ? neg(t) : t))];
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ flip: [] }),
    ok,
    answered: s => s.flip.length > 0,
    solution: r => `(${join(result(r, { flip: r.B.map((_, i) => `b${i}`) }))}) / (${r.den})`,
    prompt: r => `Opera: $\\dfrac{${join(r.A)}}{${r.den}} - \\dfrac{${join(r.B)}}{${r.den}}${r.C ? ` + \\dfrac{${join(r.C)}}{${r.den}}` : ''}$`,
    foot: () => 'Arrastra el signo menos sobre los términos que cambian de signo',
    layout(G) { G.ty = 150; G.src = { x: 20, y: 214, w: 44, h: 36 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { flip: r.B.map((_, i) => `b${i}`) } : G.s, Cs = r.C || [], n = r.A.length + r.B.length + Cs.length, w = Math.min(58, (G.W - 40 - 44 * (Cs.length ? 2 : 1)) / n - 4);
      let x = 16; G.bt = [];
      const put = (id, tex, col) => { const b = { id, x, y: G.ty, w, h: 36 }; if (id) G.bt.push(b); RK.chip(p, C, b, `$${tex}$`, { on: true, col, size: 12 }); x += w + 4; };
      r.A.forEach(t => put(null, t, C.sky));
      const group = (key, list, sign, col) => {
        list.forEach((t, i) => { if (s.flip.includes(`${key}${i}`)) put(`${key}${i}`, neg(t), C.mint); });
        const rest = list.map((_, i) => i).filter(i => !s.flip.includes(`${key}${i}`));
        if (!rest.length) return;
        TK.label(p, C, `${sign}(`, x + 9, G.ty + 18, C.ink, 15, 26); x += 22;
        rest.forEach(i => put(`${key}${i}`, list[i], col));
        TK.label(p, C, ')', x + 2, G.ty + 18, C.ink, 15, 16); x += 12;
      };
      group('b', r.B, '−', C.coral); group('c', Cs, '+', C.sky);
      TK.label(p, C, `sobre ${r.den}`, G.W / 2, G.ty + 54, C.mute, 11, 120);
      RK.chip(p, C, G.src, '−', { on: true, col: C.brand, size: 20 });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 18, y: G.drag.y - 18, w: 36, h: 36 }, '−', { on: true, col: C.brand, size: 20 });
      RK.strip(p, C, G.fb, `$\\dfrac{${join(result(r, s))}}{${r.den}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (hitBox(G.src, x, y)) { G.drag = { x, y }; return true; } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; const b = (G.bt || []).find(b => hitBox({ x: b.x - 3, y: b.y - 8, w: b.w + 6, h: b.h + 16 }, x, y)); if (b) { const f = G.s.flip, k = f.indexOf(b.id); if (k >= 0) f.splice(k, 1); else f.push(b.id); G.touch(); } },
    demo(G) { const b = G.bt?.[G.bt.length - 1]; return b ? { from: { x: G.src.x + 22, y: G.src.y + 18 }, to: { x: b.x + b.w / 2, y: b.y + 18 }, text: 'Arrastra el menos', ty: G.src.y + 54 } : null; },
    peek: G => ({ bt: G.bt, src: G.src }),
  });
  return game;
})();
;
//#archivo js/games/elimina-variable.js
// Eliminar una incógnita (Álgebra, alg-101; spec 2026-11-18-algebra-revision): si a una ecuación se le suma otra
// multiplicada por un número, la solución no cambia; con el número justo una incógnita desaparece. Se arrastra el
// multiplicador k de la segunda ecuación y abajo se ve la suma fila 1 + k · fila 2: barras para los coeficientes de x y de
// y. Cuando la barra de y se apaga, queda una ecuación con una sola incógnita y el juego la resuelve.
// params = { rounds: [{ e1: [a, b, c], e2: [a, b, c] }] }   state = { rounds: [{ k }] }   (k entero de −4 a 4)
GAMES['elimina-variable'] = (() => {
  const K = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  const sum = (r, k) => r.e1.map((v, i) => v + k * r.e2[i]);
  let ok = (s, r) => sum(r, s.k)[1] === 0;
  const answer = r => ({ k: K.find(k => ok({ k }, r)) });
  const eq = ([a, b, c]) => `${a === 1 ? '' : a === -1 ? '-' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ k: 0 }),
    ok,
    solution: r => { const k = answer(r).k, f = sum(r, k); return `k = ${k}: ${f[0]}x = ${f[2]}, x = ${f[2] / f[0]}`; },
    prompt: r => `Elimina la y: $${eq(r.e1)}$ y $${eq(r.e2)}$`,
    foot: () => 'Arrastra k: a la fila 1 se le suma k veces la fila 2',
    layout(G) { G.tY = G.H - 112; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, k = G.locked && !ok(G.s, r) ? answer(r).k : G.s.k, f = sum(r, k), cx = G.W / 2;
      TK.label(p, C, `fila 1: $${eq(r.e1)}$`, cx, 104, C.ink, 14, G.W - 30);
      TK.label(p, C, `fila 2: $${eq(r.e2)}$   × ${k}`, cx, 132, C.ink, 14, G.W - 30);
      [['x', f[0], C.sky], ['y', f[1], f[1] === 0 && !VELO.on ? C.ok : C.coral]].forEach(([n, v, col], i) => {
        const y = 176 + i * 44; TK.label(p, C, n, 26, y + 11, C.mute, 14, 24);
        p.stroke(C.line); p.strokeWeight(1); p.line(cx, y - 4, cx, y + 26);
        p.noStroke(); p.fill(col); p.rect(cx, y, Math.max(-cx + 50, Math.min(cx - 50, v * 12)), 22, 3);
        TK.label(p, C, String(v), v >= 0 ? cx - 18 : cx + 18, y + 11, C.ink, 12, 30);
      });
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, K.length, K.indexOf(k), i => String(K[i]));
      const t = f[1] === 0 && f[0] !== 0 ? `${f[0]}x = ${f[2]} \\Rightarrow x = ${RK.num(f[2] / f[0])}` : eq(f);
      RK.strip(p, C, G.fb, `$${t}$`, { kicker: 'Fila 1 + k · fila 2', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(4), y: G.tY }, to: { x: G.X([6, 2, 7].find(i => K[i] !== answer(G.r).k)), y: G.tY }, text: 'Arrastra k', ty: G.tY - 32 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = K[RK.pick(x, 30, G.W - 30, K.length)]; if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { answer, K });
})();
;
//#archivo js/games/dos-compras.js
// Dos recibos (Álgebra, alg-101; spec 2026-11-18-algebra-revision): un sistema de ecuaciones es un par de condiciones
// que se cumplen a la vez. Dos recibos de compras con los mismos artículos; se arrastran los precios de los dos artículos y
// cada recibo se arma como una barra de bloques (un bloque por artículo, de largo su precio) frente a su total. Los dos
// recibos deben cuadrar con los mismos precios.
// params = { rounds: [{ names: [a, b], e1: [n, m, total], e2: [n, m, total], max }] }   state = { rounds: [{ p: [pa, pb] }] }   (enteros de 1 a max)
GAMES['dos-compras'] = (() => {
  const tot = (e, p) => e[0] * p[0] + e[1] * p[1];
  const ok = (s, r) => tot(r.e1, s.p) === r.e1[2] && tot(r.e2, s.p) === r.e2[2];
  const answer = r => { for (let a = 1; a <= r.max; a++) for (let b = 1; b <= r.max; b++) if (ok({ p: [a, b] }, r)) return { p: [a, b] }; return null; };
  const game = roundsGame({
    aspect: 1.15,
    init: r => (ok({ p: [1, 1] }, r) ? { p: [2, 1] } : { p: [1, 1] }),
    ok,
    solution: r => { const a = answer(r).p; return `${r.names[0]}: ${a[0]} mil; ${r.names[1]}: ${a[1]} mil`; },
    prompt: r => `¿Cuánto vale un ${r.names[0]} y cuánto un ${r.names[1]}?`,
    foot: () => 'Arrastra los dos precios hasta que los dos recibos cuadren',
    layout(G) { G.tr = [0, 1].map(i => G.H - 150 + i * 44); G.fb = { x: 12, y: G.H - 64, w: G.W - 24, h: 42 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, maxT = Math.max(r.e1[2], r.e2[2], tot(r.e1, s.p), tot(r.e2, s.p)), u = (G.W - 70) / maxT, x0 = 20;
      [r.e1, r.e2].forEach((e, k) => {
        const y = 108 + k * 70; let x = x0;
        TK.label(p, C, `recibo ${k + 1}: ${e[0]} × ${r.names[0]} + ${e[1]} × ${r.names[1]} = ${e[2]} mil`, G.W / 2, y - 10, C.mute, 10, G.W - 30);
        [0, 1].forEach(j => { for (let n = 0; n < e[j]; n++) { p.stroke(C.bg); p.strokeWeight(1.5); p.fill(j ? C.coral : C.sky); p.rect(x, y, s.p[j] * u, 26, 4); x += s.p[j] * u; } });
        const tx = x0 + e[2] * u, good = tot(e, s.p) === e[2];
        p.stroke(good ? C.ok : C.ink); p.strokeWeight(2); p.drawingContext.setLineDash([4, 3]); p.line(tx, y - 6, tx, y + 32); p.drawingContext.setLineDash([]);
        TK.label(p, C, `${tot(e, s.p)} / ${e[2]}`, Math.min(G.W - 30, Math.max(tx, x) + 26), y + 13, good ? C.ok : C.ink, 11, 52);
      });
      G.X = [0, 1].map(j => { TK.label(p, C, r.names[j], 40, G.tr[j] - 16, j ? C.coral : C.sky, 11, 80); return RK.track(p, C, 30, G.W - 30, G.tr[j], r.max, s.p[j] - 1, i => (r.max <= 10 || i % 2 === 1 ? String(i + 1) : null), j ? C.coral : C.sky); });
      RK.strip(p, C, G.fb, `$${r.e1[0]}a + ${r.e1[1]}b = ${tot(r.e1, s.p)},\\ \\ ${r.e2[0]}a + ${r.e2[1]}b = ${tot(r.e2, s.p)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const j = G.tr.findIndex(t => Math.abs(y - t) < 20); if (j < 0) return false; G.grab = j; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => ({ from: { x: G.X[0](G.s.p[0] - 1), y: G.tr[0] }, to: { x: G.X[0](G.s.p[0] + 1), y: G.tr[0] }, text: 'Arrastra un precio', ty: G.tr[1] + 26 }),
    peek: G => ({ tr: G.tr }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, G.r.max) + 1, j = G.grab; if (v !== G.s.p[j] || !G.touched[G.cur]) { G.s.p[j] = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/parciales-tapar.js
// Fracciones parciales, coeficiente a coeficiente (Álgebra, alg-102; spec 2026-11-18-algebra-revision): al juntar
// A/(x − p) + B/(x − q) el numerador queda A(x − q) + B(x − p). Se arrastran A y B; dos barras comparan el coeficiente de x
// y el número suelto con los del numerador que hay que obtener. Las dos deben coincidir a la vez: es un sistema.
// params = { rounds: [{ p, q, c, d }] }   (numerador c·x + d)   state = { rounds: [{ A, B }] }   (enteros de −6 a 6)
GAMES['parciales-tapar'] = (() => {
  const R = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
  const num = (r, s) => [s.A + s.B, -s.A * r.q - s.B * r.p];
  let ok = (s, r) => { const [c, d] = num(r, s); return c === r.c && d === r.d; };
  const answer = r => { for (const A of R) for (const B of R) if (ok({ A, B }, r)) return { A, B }; return null; };
  const fac = v => `x ${v < 0 ? '+' : '-'} ${Math.abs(v)}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ A: 0, B: 0 }),
    ok,
    solution: r => { const a = answer(r); return `A = ${a.A}, B = ${a.B}`; },
    prompt: r => `Parte $\\dfrac{${r.c === 1 ? '' : r.c}x ${r.d < 0 ? '-' : '+'} ${Math.abs(r.d)}}{(${fac(r.p)})(${fac(r.q)})}$ en $\\dfrac{A}{${fac(r.p)}} + \\dfrac{B}{${fac(r.q)}}$`,
    foot: () => 'Arrastra A y B hasta que las dos barras coincidan con su meta',
    layout(G) { G.tr = [G.H - 158, G.H - 116]; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, [c, d] = num(r, s), cx = G.W / 2, u = Math.min(9, (cx - 50) / 12);
      TK.label(p, C, `$A(${fac(r.q)}) + B(${fac(r.p)}) = ${c}x ${d < 0 ? '-' : '+'} ${Math.abs(d)}$`, cx, 104, C.ink, 14, G.W - 24);
      [['x', c, r.c], ['número', d, r.d]].forEach(([n, v, t], i) => {
        const y = 134 + i * 46;
        TK.label(p, C, n, 34, y + 11, C.mute, 11, 56);
        p.stroke(C.line); p.strokeWeight(1); p.line(cx, y - 6, cx, y + 28);
        p.noStroke(); p.fill(v === t && !VELO.on ? C.ok : C.sky); p.rect(cx, y, Math.max(-cx + 70, Math.min(cx - 30, v * u)), 22, 3);
        p.stroke(C.ink); p.strokeWeight(2); p.drawingContext.setLineDash([4, 3]); p.line(cx + t * u, y - 6, cx + t * u, y + 28); p.drawingContext.setLineDash([]);
      });
      G.X = ['A', 'B'].map((k, j) => { TK.label(p, C, `${k} = ${s[k]}`, 40, G.tr[j] - 16, C.ink, 11, 70); return RK.track(p, C, 30, G.W - 30, G.tr[j], R.length, R.indexOf(s[k]), i => (i % 3 === 0 ? String(R[i]) : null), j ? C.coral : C.sky); });
      RK.strip(p, C, G.fb, `$\\dfrac{${s.A}}{${fac(r.p)}} + \\dfrac{${s.B}}{${fac(r.q)}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const j = G.tr.findIndex(t => Math.abs(y - t) < 20); if (j < 0) return false; G.grab = j; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => ({ from: { x: G.X[0](6), y: G.tr[0] }, to: { x: G.X[0]([8, 4, 9].find(i => R[i] !== answer(G.r).A)), y: G.tr[0] }, text: 'Arrastra A', ty: G.tr[0] - 34 }),
    peek: G => ({ tr: G.tr }),
  });
  game.move = (G, x) => { const v = R[RK.pick(x, 30, G.W - 30, R.length)], k = G.grab ? 'B' : 'A'; if (v !== G.s[k] || !G.touched[G.cur]) { G.s[k] = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/ajusta-exponencial.js
// La curva por dos puntos (Álgebra, alg-71; spec 2026-11-18-algebra-revision): en y = a·bˣ, a es la altura en x = 0 y b el
// factor por el que se multiplica la altura en cada paso a la derecha. Se arrastran a y b y la curva cambia en vivo; hay
// que hacerla pasar por los dos puntos marcados.
// params = { rounds: [{ a, b, pts: [[x, y], [x, y]] }] }   state = { rounds: [{ a, bi }] }   (a de 1 a 6; b de la lista B)
GAMES['ajusta-exponencial'] = (() => {
  const B = [1 / 4, 1 / 3, 1 / 2, 2, 3, 4], BT = ['\\tfrac14', '\\tfrac13', '\\tfrac12', '2', '3', '4'];
  let ok = (s, r) => s.a === r.a && Math.abs(B[s.bi] - r.b) < 1e-9;
  const answer = r => ({ a: r.a, bi: B.findIndex(b => Math.abs(b - r.b) < 1e-9) });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => (r.a === 1 && r.b === 2 ? { a: 2, bi: 3 } : { a: 1, bi: 3 }),
    ok,
    solution: r => { const s = answer(r); return `y = ${r.a}·${BT[s.bi].replace('\\tfrac', '').replace(/(\d)(\d)/, '$1/$2')}^x`; },
    prompt: () => 'Haz pasar $y = a \\cdot b^x$ por los dos puntos',
    foot: () => 'Arrastra a (la altura en x = 0) y b (el factor de cada paso)',
    layout(G) { G.b = { x: 16, y: 96, w: G.W - 32, h: G.H * 0.5 }; G.tr = [G.H - 146, G.H - 106]; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, top = Math.max(...r.pts.map(q => q[1])) * 1.35, V = { x0: -3, x1: 3, y0: 0, y1: Math.ceil(top) };
      const M = RK.plane(p, C, G.b, V, { step: 1 });
      RK.curve(p, G.b, M, V, x => s.a * B[s.bi] ** x, ok(s, r) ? C.ok : C.sky, 2.6);
      r.pts.forEach(([x, y]) => { const hit = Math.abs(s.a * B[s.bi] ** x - y) < 1e-9; drawDot(p, C, M.X(x), M.Y(y), 13, hit && !VELO.on ? C.ok : VELO.on ? C.sky : C.coral); });
      G.X = [RK.track(p, C, 40, G.W - 30, G.tr[0], 6, s.a - 1, i => String(i + 1), C.sky), RK.track(p, C, 40, G.W - 30, G.tr[1], B.length, s.bi, i => `$${BT[i]}$`, C.coral)];
      TK.label(p, C, 'a', 20, G.tr[0], C.mute, 13, 20); TK.label(p, C, 'b', 20, G.tr[1], C.mute, 13, 20);
      RK.strip(p, C, G.fb, `$y = ${s.a} \\cdot \\left(${BT[s.bi]}\\right)^x$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const j = G.tr.findIndex(t => Math.abs(y - t) < 20); if (j < 0) return false; G.grab = j; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => ({ from: { x: G.X[0](G.s.a - 1), y: G.tr[0] }, to: { x: G.X[0](G.s.a + 1), y: G.tr[0] }, text: 'Arrastra a', ty: G.tr[0] - 30 }),
    peek: G => ({ tr: G.tr }),
  });
  game.move = (G, x) => { const j = G.grab; if (j === 0) { const a = RK.pick(x, 40, G.W - 30, 6) + 1; if (a !== G.s.a || !G.touched[G.cur]) { G.s.a = a; G.touch(); } } else { const bi = RK.pick(x, 40, G.W - 30, B.length); if (bi !== G.s.bi || !G.touched[G.cur]) { G.s.bi = bi; G.touch(); } } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/mitad-espejo.js
// La base menor que 1 (Álgebra, alg-71; spec 2026-11-18-algebra-revision): (1/b)ˣ = b^(−x): la curva de base 1/b es el
// reflejo de bˣ en el eje y, y decrece. Se ven las dos curvas; se arrastra x y se lee la altura de (1/b)ˣ. Hay que llegar
// a la altura pedida, que solo se alcanza con x negativo cuando es mayor que 1.
// params = { rounds: [{ b, target }] }   state = { rounds: [{ x }] }   (entero de −5 a 5)
GAMES['mitad-espejo'] = (() => {
  const g = (r, x) => (1 / r.b) ** x;
  let ok = (s, r) => Math.abs(g(r, s.x) - r.target) < 1e-9;
  const answer = r => { for (let x = -5; x <= 5; x++) if (ok({ x }, r)) return { x }; return null; };
  const fr = v => (v >= 1 || v === 0 ? RK.num(v) : `\\tfrac{1}{${RK.num(1 / v)}}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ x: 0 }),
    ok,
    solution: r => `x = ${answer(r).x}`,
    prompt: r => `¿Para qué x vale ${r.target >= 1 ? r.target : `1/${1 / r.target}`} la curva $y = \\left(\\tfrac{1}{${r.b}}\\right)^x$?`,
    foot: () => 'Arrastra x; la curva clara es su reflejo, la de base mayor que 1',
    layout(G) { G.b = { x: 16, y: 96, w: G.W - 32, h: G.H * 0.56 }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? answer(r).x : G.s.x, V = { x0: -5, x1: 5, y0: 0, y1: Math.max(4, r.target * 1.3) }, M = G.M = RK.plane(p, C, G.b, V, { step: V.y1 > 20 ? 5 : 1 });
      RK.curve(p, G.b, M, V, t => r.b ** t, RK.al(p, C.mute, 160), 1.8);
      RK.curve(p, G.b, M, V, t => g(r, t), C.sky, 2.6);
      p.stroke(C.coral); p.strokeWeight(1.4); p.drawingContext.setLineDash([5, 4]); p.line(G.b.x, M.Y(r.target), G.b.x + G.b.w, M.Y(r.target)); p.drawingContext.setLineDash([]);
      const y = g(r, x); p.stroke(C.brand); p.strokeWeight(1.6); p.line(M.X(x), M.Y(0), M.X(x), M.Y(Math.min(V.y1, y)));
      if (y <= V.y1) drawDot(p, C, M.X(x), M.Y(y), 13, ok({ x }, r) ? C.ok : C.brand);
      RK.knob(p, C, M.X(x), M.Y(0), C.brand);
      RK.strip(p, C, G.fb, `$\\left(\\tfrac{1}{${r.b}}\\right)^{${x}} = ${r.b}^{${-x}} = ${fr(y)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.x), y: G.M.Y(0) }, to: { x: G.M.X([-2, 2, -1].map(d => G.s.x + d).find(v => v !== answer(G.r).x)), y: G.M.Y(0) }, text: 'Arrastra x', ty: G.b.y + 16 }),
    peek: G => ({ b: G.b, M: G.M }),
  });
  game.move = (G, x) => { const v = Math.max(-5, Math.min(5, Math.round(G.M.iX(x)))); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/exponente-buscado.js
// El logaritmo es un exponente (Álgebra, alg-72; spec 2026-11-18-algebra-revision): log_b N es cuántas veces hay que
// multiplicar por b (o dividir, si es negativo) para llegar a N desde 1. Se arrastra el exponente n y se ve la cadena de
// factores b y el resultado; hay que llegar justo a N.
// params = { rounds: [{ b, N }] }   state = { rounds: [{ n }] }   (entero de −4 a 8)
GAMES['exponente-buscado'] = (() => {
  const R = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  let ok = (s, r) => Math.abs(r.b ** s.n - r.N) < 1e-9 * Math.max(1, r.N);
  const answer = r => ({ n: R.find(n => ok({ n }, r)) });
  const nt = v => (v >= 1 ? RK.num(v) : `\\tfrac{1}{${RK.num(1 / v)}}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `log_${r.b} ${r.N} = ${answer(r).n}`,
    prompt: r => `Calcula $\\log_{${r.b}} ${nt(r.N)}$: ¿cuántas veces ${r.b}?`,
    foot: () => 'Arrastra el exponente; negativo es dividir',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? answer(r).n : G.s.n, k = Math.abs(n), w = Math.min(40, (G.W - 60) / Math.max(1, k) - 4), val = r.b ** n;
      TK.label(p, C, n === 0 ? 'ningún factor: queda 1' : n > 0 ? `1 multiplicado ${k} ${k === 1 ? 'vez' : 'veces'} por ${r.b}` : `1 dividido ${k} ${k === 1 ? 'vez' : 'veces'} entre ${r.b}`, G.W / 2, 108, C.mute, 12, G.W - 30);
      for (let i = 0; i < k; i++) RK.chip(p, C, { x: G.W / 2 - (k * (w + 4) - 4) / 2 + i * (w + 4), y: 128, w, h: 34 }, n > 0 ? `×${r.b}` : `÷${r.b}`, { on: true, col: n > 0 ? C.sky : C.coral, size: 11 });
      TK.label(p, C, `$= ${nt(val)}$`, G.W / 2, 196, ok({ n }, r) ? C.ok : C.ink, 20, G.W - 40);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, R.length, R.indexOf(n), i => (i % 2 === 0 ? String(R[i]) : null));
      RK.strip(p, C, G.fb, `$${r.b}^{${n}} = ${nt(val)}$`, { kicker: ok({ n }, r) ? `Logaritmo: ${n}` : `Meta: ${r.N >= 1 ? r.N : `1/${1 / r.N}`}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(5), y: G.tY }, to: { x: G.X(7), y: G.tY }, text: 'Arrastra el exponente', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = R[RK.pick(x, 24, G.W - 24, R.length)]; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/expande-log.js
// Abrir un logaritmo (Álgebra, alg-72; spec 2026-11-18-algebra-revision): el logaritmo convierte productos en sumas,
// cocientes en restas y exponentes en factores. El logaritmo se abre en un término por cada factor; se arrastra a cada
// término su coeficiente desde la bandeja (lo que multiplica, con signo).
// params = { rounds: [{ tex, base, parts: [[letra, coef]], tray: [números] }] }   state = { rounds: [{ c: [índice | null] }] }
GAMES['expande-log'] = (() => {
  const lay = G => { const n = G.r.parts.length, w = Math.min(110, (G.W - 30) / n - 8); G.slots = G.r.parts.map((_, i) => ({ i, x: G.W / 2 - (n * (w + 8) - 8) / 2 + i * (w + 8), y: 120, w, h: 54 })); G.ty = G.H * 0.56; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; };
  let ok = (s, r) => r.parts.every((q, i) => s.c[i] != null && Math.abs(r.tray[s.c[i]] - q[1]) < 1e-9);
  const answer = r => ({ c: r.parts.map(q => r.tray.findIndex(v => Math.abs(v - q[1]) < 1e-9)) });
  const ct = v => (v === 0.5 ? '\\tfrac12' : v === -0.5 ? '-\\tfrac12' : String(v));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ c: r.parts.map(() => null) }),
    ok,
    answered: s => s.c.some(v => v != null),
    solution: r => r.parts.map(q => `${q[1]}·log ${q[0]}`).join(' + '),
    prompt: r => `Abre $${r.tex}$ en una suma de logaritmos`,
    foot: () => 'Arrastra a cada término lo que lo multiplica (con su signo)',
    layout: G => lay(G),
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, lg = r.base ? `\\log_{${r.base}}` : '\\log';
      G.slots.forEach((b, i) => { const v = s.c[i], good = v != null && Math.abs(r.tray[v] - r.parts[i][1]) < 1e-9; RK.chip(p, C, b, `$${v == null ? '\\square' : ct(r.tray[v])}\\cdot ${lg} ${r.parts[i][0]}$`, { on: v != null, col: v == null ? C.line : G.locked ? (good ? C.ok : C.bad) : C.sky, size: 13 }); });
      const n = r.tray.length, w = Math.min(46, (G.W - 20) / n - 5);
      G.cards = r.tray.map((v, i) => ({ i, x: G.W / 2 - (n * (w + 5) - 5) / 2 + i * (w + 5), y: G.ty, w, h: 36 }));
      G.cards.forEach(b => RK.chip(p, C, b, `$${ct(r.tray[b.i])}$`, { size: 12 }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 18, w, h: 36 }, `$${ct(r.tray[G.drag.i])}$`, { on: true, size: 12 });
      const sum = r.parts.map((q, i) => { const v = s.c[i] == null ? null : r.tray[s.c[i]]; return v == null ? `\\square\\,${lg} ${q[0]}` : `${v < 0 ? '-' : '+'} ${ct(Math.abs(v))}\\,${lg} ${q[0]}`; }).join(' ').replace(/^\+ /, '');
      RK.strip(p, C, G.fb, `$${sum}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const b = (G.cards || []).find(b => hitBox(b, x, y)); if (b) { G.drag = { i: b.i, x, y }; return true; }
      const sl = G.slots.find(b => hitBox(b, x, y)); if (sl && G.s.c[sl.i] != null) { G.s.c[sl.i] = null; G.touch(); return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; const sl = G.slots.find(b => hitBox({ x: b.x - 6, y: b.y - 12, w: b.w + 12, h: b.h + 24 }, x, y)); if (sl) { G.s.c[sl.i] = d.i; G.touch(); } },
    demo(G) { const b = G.cards?.[0], sl = G.slots[0]; return b ? { from: { x: b.x + b.w / 2, y: b.y + 18 }, to: { x: sl.x + 18, y: sl.y + 27 }, text: 'Arrastra el coeficiente', ty: G.ty + 56 } : null; },
    peek: G => ({ cards: G.cards, slots: G.slots }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/baja-con-log.js
// Bajar el exponente con logaritmos (Álgebra, alg-73; spec 2026-11-18-algebra-revision): si en bˣ = N no se pueden igualar
// las bases, se toma logaritmo a los dos lados y el exponente baja: x·log b = log N, una ecuación lineal. Arriba, la curva
// bˣ y la altura N; abajo, dos barras: x·log b (crece con x, como una recta) y log N (fija). Se arrastra x hasta el cruce de
// la curva, que es justo donde las dos barras miden lo mismo.
// params = { rounds: [{ b, N, max }] }   state = { rounds: [{ x }] }   (x de 0 a max, de centésima en centésima)
GAMES['baja-con-log'] = (() => {
  const sol = r => Math.log(r.N) / Math.log(r.b);
  let ok = (s, r) => Math.abs(s.x - sol(r)) <= 0.03 * Math.max(1, r.max / 6);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ x: 0 }),
    ok,
    solution: r => `x = log ${r.N} ÷ log ${r.b} ≈ ${sol(r).toFixed(2)}`,
    prompt: r => `Resuelve $${r.b}^x = ${r.N}$`,
    foot: () => 'Arrastra x hasta que las dos barras midan lo mismo',
    layout(G) { G.b = { x: 16, y: 96, w: G.W - 32, h: G.H * 0.4 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? sol(r) : G.s.x, V = { x0: 0, x1: r.max, y0: 0, y1: r.N * 1.6 }, M = G.M = RK.plane(p, C, G.b, V, { step: r.max > 8 ? 2 : 1 }), good = ok({ x }, r);
      RK.curve(p, G.b, M, V, t => r.b ** t, C.sky, 2.4);
      p.stroke(C.coral); p.strokeWeight(1.4); p.drawingContext.setLineDash([5, 4]); p.line(G.b.x, M.Y(r.N), G.b.x + G.b.w, M.Y(r.N)); p.drawingContext.setLineDash([]);
      p.stroke(C.brand); p.strokeWeight(1.4); p.line(M.X(x), G.b.y, M.X(x), G.b.y + G.b.h); RK.knob(p, C, M.X(x), G.b.y + G.b.h - 12, C.brand);
      const L = x * Math.log10(r.b), R2 = Math.log10(r.N), u = (G.W - 130) / (R2 * 1.4), y0 = G.b.y + G.b.h + 18;
      [[`x · log ${r.b}`, L, C.sky], [`log ${r.N}`, R2, C.coral]].forEach(([t, v, col], i) => { TK.label(p, C, t, 56, y0 + i * 28 + 9, C.mute, 10, 100); p.noStroke(); p.fill(good ? C.ok : col); p.rect(112, y0 + i * 28, Math.min(G.W - 130, v * u), 18, 3); TK.label(p, C, v.toFixed(3), Math.min(G.W - 30, 112 + v * u + 26), y0 + i * 28 + 9, C.ink, 9, 44); });
      RK.strip(p, C, G.fb, `$x = ${x.toFixed(2)}:\\ ${r.b}^{x} \\approx ${(r.b ** x).toFixed(2)}$`, { kicker: 'x·log b = log N', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.x), y: G.b.y + G.b.h - 12 }, to: { x: G.M.X(G.s.x + G.r.max * 0.15), y: G.b.y + G.b.h - 12 }, text: 'Arrastra x', ty: G.b.y + 16 }),
    peek: G => ({ b: G.b, M: G.M }),
  });
  game.move = (G, x) => { const v = Math.max(0, Math.min(G.r.max, Math.round(G.M.iX(x) * 100) / 100)); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ x: Math.round(sol(r) * 100) / 100 }), sol });
})();
;
//#archivo js/games/sube-al-exponente.js
// Del logaritmo a la potencia (Álgebra, alg-73; spec 2026-11-18-algebra-revision): log_b(x + k) = c quiere decir
// x + k = bᶜ. Se ve la curva y = log_b(x + k), que solo existe a la derecha de x = −k (zona rayada), y la altura c; se
// arrastra x por el eje hasta que la curva alcance esa altura.
// params = { rounds: [{ b, k, c }] }   state = { rounds: [{ x }] }   (de −6 a 12, de media en media)
GAMES['sube-al-exponente'] = (() => {
  const V = { x0: -6, x1: 12, y0: -4, y1: 5 };
  const need = r => r.b ** r.c - r.k;
  let ok = (s, r) => Math.abs(s.x - need(r)) < 1e-9;
  const arg = r => (r.k === 0 ? 'x' : `x ${r.k < 0 ? '-' : '+'} ${Math.abs(r.k)}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ x: need(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => `x + ${r.k} = ${r.b}^${r.c}: x = ${RK.num(need(r))}`,
    prompt: r => `Resuelve $\\log_{${r.b}}(${arg(r)}) = ${r.c}$`,
    foot: () => 'Arrastra x por el eje; en la zona rayada el logaritmo no existe',
    layout(G) { G.b = { x: 16, y: 96, w: G.W - 32, h: G.H * 0.56 }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? need(r) : G.s.x, M = G.M = RK.plane(p, C, G.b, V, { step: 1 }), wall = M.X(-r.k);
      p.noStroke(); p.fill(RK.al(p, C.bad, 30)); p.rect(G.b.x, G.b.y, Math.max(0, wall - G.b.x), G.b.h);
      p.stroke(RK.al(p, C.bad, 120)); p.strokeWeight(1); for (let yy = G.b.y; yy < G.b.y + G.b.h; yy += 12) p.line(G.b.x, yy, Math.max(G.b.x, wall), yy + 0);
      RK.curve(p, G.b, M, V, t => (t + r.k > 0 ? Math.log(t + r.k) / Math.log(r.b) : NaN), C.sky, 2.6);
      p.stroke(C.coral); p.strokeWeight(1.4); p.drawingContext.setLineDash([5, 4]); p.line(G.b.x, M.Y(r.c), G.b.x + G.b.w, M.Y(r.c)); p.drawingContext.setLineDash([]);
      const a = x + r.k, y = a > 0 ? Math.log(a) / Math.log(r.b) : null;
      if (y != null && y >= V.y0 && y <= V.y1) { p.stroke(C.brand); p.strokeWeight(1.4); p.line(M.X(x), M.Y(0), M.X(x), M.Y(y)); drawDot(p, C, M.X(x), M.Y(y), 13, ok({ x }, r) ? C.ok : C.brand); }
      RK.knob(p, C, M.X(x), M.Y(0), C.brand);
      RK.strip(p, C, G.fb, a > 0 ? `$\\log_{${r.b}}(${RK.num(a)}) ${y != null && Math.abs(y - r.c) < 1e-9 ? '=' : '\\approx'} ${RK.num(Math.round(y * 100) / 100)}$` : `$${RK.num(a)} \\le 0:\\ \\text{no existe}$`, { kicker: `x = ${String(x).replace('-', '−')}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.x), y: G.M.Y(0) }, to: { x: G.M.X(G.s.x + 3), y: G.M.Y(0) }, text: 'Arrastra x', ty: G.b.y + 16 }),
    peek: G => ({ b: G.b, M: G.M }),
  });
  game.move = (G, x) => { const v = Math.max(V.x0, Math.min(V.x1, Math.round(G.M.iX(x) * 2) / 2)); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/edades-barras.js
// Problemas de edades (Álgebra, alg-1; spec 2026-11-18-algebra-revision): una ecuación lineal traduce dos condiciones. Hoy la
// madre tiene k₁ veces la edad del hijo; dentro de L años tendrá k₂ veces la de él. Se arrastra la edad del hijo hoy; las
// barras de hoy y de dentro de L años se ajustan (las dos crecen lo mismo). Hay que cumplir las dos condiciones.
// params = { rounds: [{ k1, L, k2 }] }   state = { rounds: [{ s }] }   (edad del hijo de 1 a 20)
GAMES['edades-barras'] = (() => {
  const need = r => r.L * (r.k2 - 1) / (r.k1 - r.k2);
  const ok = (st, r) => st.s === need(r);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ s: 1 }),
    ok,
    solution: r => `hijo ${need(r)}, madre ${r.k1 * need(r)}`,
    prompt: r => `La madre tiene ${r.k1} veces la edad de su hijo. En ${r.L} años tendrá ${r.k2} veces su edad.`,
    foot: () => 'Arrastra la edad del hijo hoy',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, st = G.locked && !ok(G.s, r) ? { s: need(r) } : G.s, h = st.s, m = r.k1 * h, u = (G.W - 110) / (r.k1 * 20 + r.L);
      [['hoy', h, m], [`en ${r.L} años`, h + r.L, m + r.L]].forEach(([t, a, b], i) => {
        const y = 112 + i * 76; TK.label(p, C, t, 40, y + 22, C.mute, 10, 70);
        p.noStroke(); p.fill(C.sky); p.rect(84, y, a * u, 18, 3); TK.label(p, C, `hijo ${a}`, 84 + a * u + 32, y + 9, C.ink, 10, 60);
        p.fill(C.coral); p.rect(84, y + 24, b * u, 18, 3); TK.label(p, C, `madre ${b}`, Math.min(G.W - 34, 84 + b * u + 36), y + 33, C.ink, 10, 66);
      });
      const later = (m + r.L) === r.k2 * (h + r.L);
      TK.label(p, C, `en ${r.L} años: ${m + r.L} ${later ? '=' : '≠'} ${r.k2} × ${h + r.L}`, G.W / 2, Math.min(272, G.tY - 34), later ? C.ok : C.mute, 11, G.W - 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 20, h - 1, i => (i % 3 === 2 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$${r.k1}x + ${r.L} = ${r.k2}(x + ${r.L})$`, { kicker: `x = ${h}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(1), y: G.tY }, text: 'Arrastra la edad', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 20) + 1; if (v !== G.s.s || !G.touched[G.cur]) { G.s.s = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/persecucion.js
// La persecución (Preuniversitario, pu-pr-3; spec 2026-11-18-preuda-razonamiento-completo): si uno sale con ventaja y el de
// atrás va más rápido, cada hora le descuenta la diferencia de velocidades: lo alcanza en ventaja ÷ (v₂ − v₁). Se arrastra
// el tiempo y los dos carros avanzan por la carretera; hay que dejarlos justo en el mismo punto.
// params = { rounds: [{ head, v1, v2 }] }   (head: km de ventaja del primero)   state = { rounds: [{ t }] }   (horas, de media en media hasta 8)
GAMES['persecucion'] = (() => {
  const need = r => r.head / (r.v2 - r.v1);
  const ok = (s, r) => Math.abs(s.t - need(r)) < 1e-9;
  const game = roundsGame({
    aspect: 1,
    init: () => ({ t: 0.5 }),
    ok,
    solution: r => `${RK.num(need(r))} h`,
    prompt: r => `Un carro sale con ${r.head} km de ventaja a ${r.v1} km/h; otro lo sigue a ${r.v2} km/h. ¿Cuándo lo alcanza?`,
    foot: () => 'Arrastra el tiempo',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { t: need(r) } : G.s, good = ok(s, r), x1 = r.head + r.v1 * s.t, x2 = r.v2 * s.t, L = r.head + r.v1 * 8, u = (G.W - 50) / L, y = 150;
      p.stroke(C.line); p.strokeWeight(14); p.line(25, y, G.W - 25, y); p.strokeWeight(1); p.stroke(C.bg); p.drawingContext.setLineDash([8, 6]); p.line(25, y, G.W - 25, y); p.drawingContext.setLineDash([]);
      const car = (x, col, dy) => { p.noStroke(); p.fill(col); p.rect(25 + x * u - 12, y + dy - 7, 24, 14, 4); };
      car(x1, good ? C.ok : C.sky, -14); car(x2, good ? C.ok : C.coral, 14);
      TK.label(p, C, `${RK.num(x1)} km`, 25 + x1 * u, y - 32, C.sky, 10, 60); TK.label(p, C, `${RK.num(x2)} km`, 25 + x2 * u, y + 34, C.coral, 10, 60);
      TK.label(p, C, `distancia entre ellos: ${RK.num(Math.abs(x1 - x2))} km`, G.W / 2, y + 64, good ? C.ok : C.ink, 11, G.W - 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 16, Math.round(s.t * 2) - 1, i => ((i + 1) % 2 === 0 ? String((i + 1) / 2) : null));
      RK.strip(p, C, G.fb, `$${r.head} - (${r.v2} - ${r.v1}) \\cdot ${RK.num(s.t)} = ${RK.num(r.head - (r.v2 - r.v1) * s.t)}$`, { kicker: 'Cada hora descuenta la diferencia', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(1), y: G.tY }, text: 'Arrastra el tiempo', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = (RK.pick(x, 30, G.W - 30, 16) + 1) / 2; if (v !== G.s.t || !G.touched[G.cur]) { G.s.t = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ t: need(r) }) });
})();
;
//#archivo js/games/resta-corrida.js
// La resta corrida (Álgebra, suma de una progresión geométrica; lección alg-14d): el truco para sumar
// S = a + ar + ar² + … es multiplicar toda la suma por la razón: sale la misma lista corrida un lugar. Arriba está
// r·S y abajo S, cada término en la columna de su valor. Se tocan las columnas con dos números iguales para tacharlos:
// al restar sobreviven solo el último de arriba y el primero de abajo, y el juego termina la cuenta.
// params = { rounds: [{ a1, r, n }] }   state = { rounds: [{ cut: [bool por pareja] }] }
// Spec 2026-11-15-escalera-de-sigma.

GAMES['resta-corrida'] = (() => {
  const term = (r, k) => r.a1 * r.r ** k;
  const sumOf = r => (term(r, r.n) - r.a1) / (r.r - 1);

  const game = roundsGame({
    aspect: 1.1,
    init: r => ({ cut: Array(r.n - 1).fill(false) }),
    ok: s => s.cut.every(Boolean),
    solution: r => `${r.r}S − S = ${term(r, r.n)} − ${r.a1}, así que S = ${term(r, r.n) - r.a1} ÷ ${r.r - 1} = ${sumOf(r)}`,
    prompt: r => `S = ${[0, 1, 2].map(k => term(r, k)).join(' + ')} + … (${r.n} términos). Tacha las parejas iguales de ${r.r}S y S`,
    foot: (r, s) => (s.cut.every(Boolean) ? 'Solo quedan el último de arriba y el primero de abajo' : 'Al multiplicar por la razón, la lista se corre un lugar'),
    draw(G) {
      const { p, C, W, s, r } = G, cols = r.n + 1, cw = (W - 56) / cols, x0 = 50, yT = 122, yB = 172, done = s.cut.every(Boolean);
      G.cols = [];
      p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(14); p.textAlign(p.RIGHT, p.CENTER);
      p.text(`${r.r}S =`, x0 - 6, yT + 16); p.text('S =', x0 - 6, yB + 16);
      for (let c = 0; c < cols; c++) {
        const x = x0 + c * cw, pair = c >= 1 && c <= r.n - 1, dead = pair && s.cut[c - 1], v = term(r, c);
        G.cols.push({ x, y: yT - 4, w: cw, h: yB + 40 - yT, pair });
        const tile = (y, col) => {
          drawTile(p, C, { x: x + 2, y, w: cw - 4, h: 30 }, v, { fill: dead ? C.card : col, ink: dead ? C.mute : undefined, size: 14, r: 7, lift: dead ? 0 : 2 });
          if (dead) { p.stroke(C.bad); p.strokeWeight(2); p.line(x + 6, y + 26, x + cw - 6, y + 4); }
        };
        if (c >= 1) tile(yT, c === r.n ? C.sun : C.sky);         // r·S ocupa las columnas 1 … n
        if (c <= r.n - 1) tile(yB, c === 0 ? C.sun : C.mint);    // S ocupa las columnas 0 … n − 1
      }
      p.stroke(C.ink); p.strokeWeight(2); p.line(x0 - 34, yB + 44, W - 8, yB + 44);
      p.noStroke(); p.fill(done ? C.ink : C.mute); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      const left = s.cut.filter(c => !c).length;
      fitText(p, done ? `${r.r}S − S = ${term(r, r.n)} − ${r.a1} = ${term(r, r.n) - r.a1}` : `Faltan ${left} ${left === 1 ? 'pareja' : 'parejas'} por tachar`, W / 2, yB + 66, W - 20, 16);
      if (done) {
        if (r.r - 1 > 1) { p.fill(C.ink); fitText(p, `${r.r - 1}S = ${term(r, r.n) - r.a1}`, W / 2, yB + 92, W - 20, 16); }
        p.fill(C.N); fitText(p, `S = ${sumOf(r)}`, W / 2, yB + 120, W - 20, 20);
      }
    },
    press(G, x, y) {
      const c = (G.cols || []).findIndex(b => hitBox(b, x, y));
      if (c < 0) return false;
      if (G.cols[c].pair) { G.s.cut[c - 1] = !G.s.cut[c - 1]; G.touch(); }
      return true;
    },
    peek: G => ({ cols: G.cols }),
  });
  return { ...game, term, sumOf };
})();
;
//#archivo js/games/parte-sigma.js
// Parte la sigma (Álgebra, propiedades de la sumatoria; lección alg-15): la suma Σ (c·k + d) se dibuja columna por
// columna: en la columna k hay c·k piezas azules y d piezas amarillas. Las azules de todas las columnas son c veces
// Σk; las amarillas se repiten una vez por cada k, así que suman d·n (y no d: esa es la trampa). Se escribe la suma
// como «a · Σk + b» eligiendo a y b con − y +.
// params = { rounds: [{ c, d, hi }] }   (k va de 1 a hi)   state = { rounds: [{ a, b }] }
// Spec 2026-11-15-escalera-de-sigma.

GAMES['parte-sigma'] = (() => {
  const termTxt = r => (r.c === 0 ? `${r.d}` : `${r.c === 1 ? '' : r.c}k${r.d ? ` + ${r.d}` : ''}`);
  const gauss = n => (n * (n + 1)) / 2;
  const totalOf = r => r.c * gauss(r.hi) + r.d * r.hi;

  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ a: 0, b: 0 }),
    ok: (s, r) => s.a === r.c && s.b === r.d * r.hi,
    solution: r => `Σ (${termTxt(r)}) = ${r.c}·Σk + ${r.d * r.hi} = ${r.c}·${gauss(r.hi)} + ${r.d * r.hi} = ${totalOf(r)}`,
    prompt: r => `Σ (${termTxt(r)}), con k de 1 a ${r.hi}: sepárala en azules y amarillas`,
    foot: () => 'Las amarillas se repiten una vez por cada valor de k',
    layout(G) { const w = (G.W - 36) / 2; G.box = [{ x: 12, y: G.H - 64, w, h: 32 }, { x: 24 + w, y: G.H - 64, w, h: 32 }]; },
    draw(G) {
      const { p, C, W, H, s, r } = G, n = r.hi, base = H - 150, top = 100, tall = r.c * n + r.d, u = Math.min(16, (base - top) / tall), cw = Math.min(46, (W - 40) / n), x0 = W / 2 - (n * cw) / 2;
      for (let k = 1; k <= n; k++) {
        const x = x0 + (k - 1) * cw + 4, w = cw - 8;
        for (let i = 0; i < r.c * k; i++) { p.noStroke(); p.fill(C.sky); p.rect(x, base - (i + 1) * u + 1, w, u - 2, 3); }
        for (let i = 0; i < r.d; i++) { p.noStroke(); p.fill(C.sun); p.rect(x, base - (r.c * k + i + 1) * u + 1, w, u - 2, 3); }
        p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.CENTER, p.CENTER); p.text(`k = ${k}`, x + w / 2, base + 12);
      }
      p.stroke(C.ink); p.strokeWeight(2); p.line(x0 - 6, base, x0 + n * cw + 6, base);
      p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      fitText(p, `Σ (${termTxt(r)}) = ${s.a} · Σk + ${s.b} = ${s.a} · ${gauss(n)} + ${s.b} = ${s.a * gauss(n) + s.b}`, W / 2, base + 38, W - 20, 15);
      drawStepper(p, C, G.box[0], s.a, 'veces Σk (azules)', C.sky);
      drawStepper(p, C, G.box[1], s.b, 'amarillas en total', C.N);
    },
    press(G, x, y) {
      const a = stepHit(G.box[0], x, y), b = stepHit(G.box[1], x, y);
      if (!a && !b) return false;
      G.s.a = Math.max(0, Math.min(9, G.s.a + a)); G.s.b = Math.max(0, Math.min(60, G.s.b + b)); G.touch();
      return true;
    },
    peek: G => ({ box: G.box, want: [G.r.c, G.r.d * G.r.hi] }),
  });
  return { ...game, termTxt, totalOf };
})();
;
//#archivo js/games/laberinto-valor.js
// Laberinto de valores (evaluaciones). Una cuadrícula de casillas con números o afirmaciones; se traza un
// camino de la entrada (verde) a la salida (bandera) pisando solo las casillas que cumplen la regla del
// enunciado. Se avanza tocando o arrastrando por casillas vecinas (arriba, abajo, izquierda, derecha); tocar
// la última casilla del camino la quita, y tocar una anterior recorta el camino hasta ahí (al soltar el dedo,
// si no se movió a otra casilla: arrastrar desde la punta alarga el camino).
// params = { rule, rounds: [{ cols, cells: [{ t, ok }], start, end }] }   state = { paths: [[índice, …] por ronda] }

GAMES['laberinto-valor'] = (() => {
  const adj = (a, b, cols) => {
    const ra = Math.floor(a / cols), ca = a % cols, rb = Math.floor(b / cols), cb = b % cols;
    return Math.abs(ra - rb) + Math.abs(ca - cb) === 1;
  };
  const valid = (path, r) => Array.isArray(path) && path.length > 1 && path[0] === r.start && path[path.length - 1] === r.end
    && new Set(path).size === path.length && path.every(k => r.cells[k]?.ok)
    && path.every((k, i) => i === 0 || adj(path[i - 1], k, r.cols));

  // Camino más corto por casillas válidas (BFS), o null.
  function shortest(r) {
    const prev = new Map([[r.start, -1]]), q = [r.start];
    if (!r.cells[r.start]?.ok) return null;
    while (q.length) {
      const k = q.shift();
      if (k === r.end) { const p = []; for (let x = k; x !== -1; x = prev.get(x)) p.unshift(x); return p; }
      const row = Math.floor(k / r.cols), col = k % r.cols, rows = Math.ceil(r.cells.length / r.cols);
      [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([a, b]) => {
        if (a < 0 || b < 0 || a >= rows || b >= r.cols) return;
        const n = a * r.cols + b;
        if (r.cells[n]?.ok && !prev.has(n)) { prev.set(n, k); q.push(n); }
      });
    }
    return null;
  }

  function solve(params) {
    const paths = params.rounds.map(shortest);
    return paths.every(Boolean) ? { paths } : null;
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => valid(state.paths?.[i], r));
    const solution = params.rounds.map(r => (shortest(r) || []).map(k => r.cells[k].t).join(' → ')).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const P = R.map(r => [r.start]);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], dragging = false;
    // Casilla ya recorrida que se tocó: quitarla o recortar el camino se hace al soltar, y solo si el dedo no
    // salió de ella. Así arrastrar desde la punta alarga el camino, y un toque que se cancela no borra nada.
    let pending = -1;

    function layout(w, h) { W = w; H = h; tabs = R.length > 1 ? roundTabs(R.length, w) : []; }
    const geo = () => {
      const r = R[cur], rows = Math.ceil(r.cells.length / r.cols), top = R.length > 1 ? 84 : 52;
      const s = Math.min((W - 20) / r.cols, (H - top - 12) / rows);
      return { r, rows, s, x0: (W - s * r.cols) / 2, y0: top };
    };
    const cellAt = (x, y) => {
      const g = geo(), c = Math.floor((x - g.x0) / g.s), rr = Math.floor((y - g.y0) / g.s);
      return c >= 0 && rr >= 0 && c < g.r.cols && rr < g.rows ? rr * g.r.cols + c : -1;
    };
    const update = () => api.ready(P.every((p, i) => p[p.length - 1] === R[i].end));

    // Toque en una casilla: quitar la última, recortar o avanzar a una vecina libre.
    function touch(k, fromDrag) {
      const p = P[cur], r = R[cur];
      if (k < 0 || !r.cells[k]) return;
      const at = p.indexOf(k);
      if (at >= 0) {
        if (fromDrag) { if (at === p.length - 2) p.pop(); }
        else if (at === p.length - 1 && p.length > 1) p.pop();
        else p.length = at + 1;
      } else if (adj(p[p.length - 1], k, r.cols) && p[p.length - 1] !== r.end) {
        p.push(k); api.sfx?.tap?.();
      } else return;
      update();
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const g = geo(), r = g.r, path = P[cur], good = valid(path, r);
        if (tabs.length) drawTabs(p, C, tabs, cur, i => (locked ? (valid(P[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : P[i].length > 1 ? C.R : C.line));
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, params.rule, W / 2, g.y0 - 22, W - 24, 15);
        const show = locked && !good ? shortest(r) || [] : path;
        const pathCol = locked ? C.ok : C.brand;
        r.cells.forEach((cell, k) => {
          const x = g.x0 + (k % r.cols) * g.s, y = g.y0 + Math.floor(k / r.cols) * g.s, pad = 3;
          const on = show.includes(k), wrongStep = locked && !good && path.includes(k) && !cell.ok;
          p.stroke(wrongStep ? C.bad : on ? pathCol : C.line); p.strokeWeight(on || wrongStep ? 3 : 1.5);
          p.fill(on ? p.color(...hexA(pathCol, 0.18)) : C.card);
          p.rect(x + pad, y + pad, g.s - 2 * pad, g.s - 2 * pad, 10);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
          const cy = y + g.s / 2 + (k === r.start || k === r.end ? g.s * 0.1 : 0), maxW = g.s - 12, fs = Math.min(17, g.s * 0.3);
          p.textSize(11);
          // Corte en el espacio más cercano al centro que no quede dentro de |…|.
          const sp = [...cell.t].reduce((best, ch, i) => (ch === ' ' && (cell.t.slice(0, i).split('|').length % 2 === 1)
            && (best < 0 || Math.abs(i - cell.t.length / 2) < Math.abs(best - cell.t.length / 2)) ? i : best), -1);
          if (p.textWidth(cell.t) > maxW && sp > 0) {   // texto largo en casilla angosta: dos líneas
            fitText(p, cell.t.slice(0, sp), x + g.s / 2, cy - 8, maxW, Math.min(fs, 14));
            fitText(p, cell.t.slice(sp + 1), x + g.s / 2, cy + 8, maxW, Math.min(fs, 14));
          } else fitText(p, cell.t, x + g.s / 2, cy, maxW, fs);
          if (k === r.start || k === r.end) {
            p.fill(k === r.start ? C.ok : C.N); p.textSize(Math.min(10, g.s * 0.15)); p.textStyle(p.BOLD);
            p.text(k === r.start ? 'ENTRADA' : 'SALIDA ⚑', x + g.s / 2, y + 3 + g.s * 0.12);
          }
        });
        // Puentes entre casillas seguidas del camino (en el borde, sin tapar el texto)
        p.stroke(pathCol); p.strokeWeight(6); p.strokeCap(p.ROUND);
        const ctr = k => [g.x0 + (k % r.cols + 0.5) * g.s, g.y0 + (Math.floor(k / r.cols) + 0.5) * g.s];
        show.forEach((k, i) => {
          if (!i) return;
          const [ax, ay] = ctr(show[i - 1]), [bx, by] = ctr(k), mx = (ax + bx) / 2, my = (ay + by) / 2;
          const dx = Math.sign(bx - ax) * 9, dy = Math.sign(by - ay) * 9;
          p.line(mx - dx, my - dy, mx + dx, my + dy);
        });
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const k = cellAt(x, y);
        if (k < 0) return;
        dragging = true;
        if (P[cur].includes(k)) pending = k; else touch(k, false);
        return false;
      };
      p.mouseDragged = () => {
        if (!dragging || locked) return;
        const k = cellAt(p.mouseX, p.mouseY);
        if (k !== pending) pending = -1;
        if (k >= 0 && k !== P[cur][P[cur].length - 1]) touch(k, true);
        return false;
      };
      p.mouseReleased = () => {
        if (pending >= 0 && dragging && !locked) touch(pending, false);
        pending = -1; dragging = false;
      };
    }, (() => {   // alto para que las casillas salgan cuadradas con el ancho disponible (también a 260 px)
      const w = Math.max(240, Math.floor(host.clientWidth || 320)), top = R.length > 1 ? 84 : 52;
      return Math.max(...R.map(r => (top + Math.ceil(r.cells.length / r.cols) * ((w - 20) / r.cols) + 12) / w));
    })());

    // Color con transparencia a partir de un hex de la paleta.
    function hexA(hex, a) {
      const n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255, Math.round(a * 255)];
    }

    return {
      loaded: m.ready,
      getState: () => ({ paths: P.map(p => [...p]) }),
      lock() { locked = true; dragging = false; pending = -1; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, solve };
})();
;
//#archivo js/games/domino-equivalencias.js
// Dominó de equivalencias (evaluaciones). Arriba está la cara de salida y abajo la de llegada; en la bandeja,
// fichas de dominó con dos caras. Se tocan fichas para ponerlas en la cadena: la cara izquierda de cada
// ficha debe valer lo mismo que la cara derecha de la anterior (escrita de otra forma: 0.25 y 1/4), y la
// última debe llegar a la cara final. Sobran fichas trampa. Tocar una ficha de la cadena la devuelve a la
// bandeja junto con las que van después.
// params = { rounds: [{ start: { t, v }, end: { t, v }, need, tiles: [{ a, av, b, bv }] }] }
// state = { chains: [[índice de ficha, …] por ronda] }

GAMES['domino-equivalencias'] = (() => {
  const same = (x, y) => (typeof x === 'number' && typeof y === 'number' ? Math.abs(x - y) < 1e-9 : String(x) === String(y));
  const valid = (c, r) => Array.isArray(c) && c.length === r.need && new Set(c).size === c.length && c.every(k => r.tiles[k])
    && same(r.start.v, r.tiles[c[0]].av) && c.every((k, i) => i === 0 || same(r.tiles[c[i - 1]].bv, r.tiles[k].av))
    && same(r.tiles[c[c.length - 1]].bv, r.end.v);

  function chainOf(r) {
    const walk = (c, last) => {
      if (c.length === r.need) return same(last, r.end.v) ? c : null;
      for (let k = 0; k < r.tiles.length; k++) {
        if (c.includes(k) || !same(r.tiles[k].av, last)) continue;
        const got = walk([...c, k], r.tiles[k].bv);
        if (got) return got;
      }
      return null;
    };
    return walk([], r.start.v);
  }

  function solve(params) {
    const chains = params.rounds.map(chainOf);
    return chains.every(Boolean) ? { chains } : null;
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => valid(state.chains?.[i], r));
    const solution = params.rounds.map(r => [r.start.t, ...(chainOf(r) || []).map(k => `[${r.tiles[k].a} | ${r.tiles[k].b}]`), r.end.t].join(' → ')).join(' · ');
    return { ok, solution };
  }

  // Alto del lienzo según el contenido (no según el ancho): así cabe igual en un celular de 300 px.
  const aspectFor = (host, px) => Math.max(1, px / Math.max(240, Math.floor(host.clientWidth || 320)));

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const CH = R.map(() => []);
    // Columnas de la bandeja: se deciden una vez, con el ancho inicial, igual que el alto del lienzo.
    const cols = Math.floor(host.clientWidth || 320) < 340 ? 1 : 2;
    const TRAY = R.map((r, i) => shuffledOrder(r.tiles.length, `dom${i}${r.tiles.map(t => t.a).join()}`));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], hits = [];

    function layout(w, h) { W = w; H = h; tabs = R.length > 1 ? roundTabs(R.length, w) : []; }

    // Cara con texto: si no cabe a 12 px y tiene espacios, va en dos líneas (corte cerca del centro).
    function faceText(p, t, cx, cy, maxW) {
      p.textSize(12);
      const sp = [...t].reduce((best, ch, i) => (ch === ' ' && (best < 0 || Math.abs(i - t.length / 2) < Math.abs(best - t.length / 2)) ? i : best), -1);
      if (p.textWidth(t) > maxW && sp > 0) { fitText(p, t.slice(0, sp), cx, cy - 7, maxW, 13); fitText(p, t.slice(sp + 1), cx, cy + 8, maxW, 13); }
      else fitText(p, t, cx, cy, maxW, 16);
    }
    function tile(p, x, y, w, h, a, b, col, fillCol) {
      p.stroke(col); p.strokeWeight(2.5); p.fill(fillCol || C.card); p.rect(x, y, w, h, 9);
      p.strokeWeight(1.5); p.line(x + w / 2, y + 6, x + w / 2, y + h - 6);
      p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
      faceText(p, a, x + w / 4, y + h / 2, w / 2 - 10); faceText(p, b, x + 3 * w / 4, y + h / 2, w / 2 - 10);
    }
    function face(p, x, y, w, h, t, col, dashed) {
      p.stroke(col); p.strokeWeight(2.5); p.fill(C.card);
      if (dashed) p.drawingContext.setLineDash([6, 5]);
      p.rect(x, y, w, h, 9); p.drawingContext.setLineDash([]);
      p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); faceText(p, t, x + w / 2, y + h / 2, w - 12);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg); hits = [];
        const r = R[cur], chain = locked && !valid(CH[cur], r) ? (chainOf(r) || []) : CH[cur], good = valid(CH[cur], r);
        if (tabs.length) drawTabs(p, C, tabs, cur, i => (locked ? (valid(CH[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : CH[i].length ? C.R : C.line));
        const top = tabs.length ? 50 : 10, tw = Math.min(W - 40, 250), th = 38, hw = tw / 2, x0 = (W - tw) / 2;
        const col = locked ? C.ok : C.brand;
        p.textAlign(p.CENTER, p.CENTER);
        // Cara de salida: ocupa la mitad derecha, para que la primera ficha se enganche debajo por la izquierda.
        p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(10); p.text('SALIDA', x0 + hw / 2, top + th / 2);
        face(p, x0 + hw, top, hw, th, r.start.t, C.ok, false);
        // Cada unión va en diagonal de la cara derecha de arriba a la cara izquierda de abajo: esas son las que valen lo mismo.
        const link = (y1, y2) => { p.stroke(C.mute); p.strokeWeight(2); p.line(x0 + 3 * hw / 2, y1, x0 + hw / 2, y2); p.noStroke(); p.fill(C.mute); p.circle(x0 + hw / 2, y2, 5); };
        let y = top + th + 16;
        chain.forEach((k, i) => {
          const t = r.tiles[k];
          link(y - 16, y);
          tile(p, x0, y, tw, th, t.a, t.b, col);
          hits.push({ x: x0, y, w: tw, h: th, chain: i });
          y += th + 16;
        });
        // Cara de llegada
        const done = chain.length === r.need;
        if (done) link(y - 16, y);
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.BOLD); p.text('LLEGADA', x0 + 3 * hw / 2, y + th / 2);
        face(p, x0, y, hw, th, r.end.t, locked && done ? C.ok : C.N, !done);
        y += th + 18;
        // Bandeja
        p.stroke(C.line); p.strokeWeight(1); p.line(12, y - 8, W - 12, y - 8);
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12);
        p.text(locked ? (good ? '¡Cadena completa!' : 'Así se encadenaban') : 'Toca una ficha para ponerla en la cadena', W / 2, y + 2);
        y += 16;
        const free = TRAY[cur].filter(k => !CH[cur].includes(k)), bw = cols === 1 ? Math.min(W - 24, 260) : (W - 36) / 2;
        free.forEach((k, j) => {
          const x = cols === 1 ? (W - bw) / 2 : 12 + (j % 2) * (bw + 12), yy = y + Math.floor(j / cols) * (th + 10), t = r.tiles[k];
          tile(p, x, yy, bw, th, t.a, t.b, locked ? C.line : C.R);
          hits.push({ x, y: yy, w: bw, h: th, tray: k });
        });
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const h = hits.find(b => hitBox(b, x, y));
        if (!h) return;
        const c = CH[cur];
        if (h.tray != null) { if (c.length < R[cur].need) c.push(h.tray); else return api.sfx?.bad?.(), false; }
        else c.length = h.chain;
        api.sfx?.tap?.();
        api.ready(CH.every((ch, i) => ch.length === R[i].need));
        return false;
      };
    }, aspectFor(host, Math.max(...R.map(r => (R.length > 1 ? 50 : 10) + 54 * (r.need + 1) + 38 + 34 + 48 * Math.ceil(r.tiles.length / cols) + 6))));

    return {
      loaded: m.ready,
      getState: () => ({ chains: CH.map(c => [...c]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, solve };
})();
;
//#archivo js/games/piramide-numerica.js
// Pirámide numérica (evaluaciones). Cada bloque es la suma (o el producto) de los dos bloques que lo
// sostienen. Algunos bloques están vacíos: se arrastran fichas desde la bandeja (también se puede tocar
// una ficha y luego el bloque). Hay fichas trampa (el signo cambiado, el exponente equivocado…).
// Tocar un bloque lleno devuelve su ficha.
// params = { op: 'sum' | 'prod', rows: [[{ t, v } | null, …] desde la fila de abajo], tokens: [{ t, v }] }
// state = { fill: [[índice de ficha | null, …] por fila] }

GAMES['piramide-numerica'] = (() => {
  const apply = (op, a, b) => (op === 'prod' ? a * b : a + b);
  const near = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
  const blanks = params => params.rows.flatMap((row, r) => row.map((c, k) => (c === null ? [r, k] : null)).filter(Boolean));

  function consistent(params, fill) {
    const val = (r, k) => (params.rows[r][k] ? params.rows[r][k].v : params.tokens[fill?.[r]?.[k]]?.v);
    const used = blanks(params).map(([r, k]) => fill?.[r]?.[k]);
    if (used.some(u => u == null || !params.tokens[u]) || new Set(used).size !== used.length) return false;
    for (let r = 1; r < params.rows.length; r++) {
      for (let k = 0; k < params.rows[r].length; k++) if (!near(val(r, k), apply(params.op, val(r - 1, k), val(r - 1, k + 1)))) return false;
    }
    return true;
  }

  function solve(params) {
    const B = blanks(params), fill = params.rows.map(row => row.map(() => null));
    const go = i => {
      if (i === B.length) return consistent(params, fill);
      for (let t = 0; t < params.tokens.length; t++) {
        if (B.some(([r, k], j) => j < i && fill[r][k] === t)) continue;
        fill[B[i][0]][B[i][1]] = t;
        if (go(i + 1)) return true;
      }
      fill[B[i][0]][B[i][1]] = null;
      return false;
    };
    return go(0) ? { fill: fill.map(r => [...r]) } : null;
  }

  function grade(state, params) {
    const s = solve(params);
    const solution = s ? blanks(params).map(([r, k]) => params.tokens[s.fill[r][k]].t).join(', ') : '';
    return { ok: consistent(params, state.fill), solution: `Los bloques vacíos (de abajo hacia arriba): ${solution}` };
  }

  // Alto del lienzo según el contenido (no según el ancho): así cabe igual en un celular de 300 px.
  const aspectFor = (host, px) => Math.max(1, px / Math.max(240, Math.floor(host.clientWidth || 320)));

  function create(host, params, api) {
    const C = api.palette, rows = params.rows, toks = params.tokens;
    const fill = rows.map(row => row.map(() => null));
    const order = shuffledOrder(toks.length, `pir${toks.map(t => t.t).join()}`);
    let locked = false, W = 0, H = 0, drag = null, sel = null, sol = null;

    const geo = () => {
      const n = rows[0].length, bw = Math.min((W - 16) / n, 84), bh = 42, base = 66 + rows.length * (bh + 6);
      return { n, bw, bh, base, x: (r, k) => W / 2 + (k - (rows[r].length - 1) / 2) * bw - bw / 2, y: r => base - (r + 1) * (bh + 6) };
    };
    const trayGeo = () => {
      const per = Math.min(toks.length, 4), cw = Math.min(76, (W - 16 - (per - 1) * 8) / per), ch = 38, g = geo(), y0 = g.base + 40;
      return { per, cw, ch, pos: j => ({ x: (W - (per * cw + (per - 1) * 8)) / 2 + (j % per) * (cw + 8), y: y0 + Math.floor(j / per) * (ch + 10) }) };
    };
    const placed = t => fill.some(row => row.includes(t));
    const blankAt = (x, y) => {
      const g = geo();
      for (let r = 0; r < rows.length; r++) for (let k = 0; k < rows[r].length; k++) {
        if (rows[r][k] === null && hitBox({ x: g.x(r, k), y: g.y(r), w: g.bw, h: g.bh }, x, y)) return [r, k];
      }
      return null;
    };
    const tokenAt = (x, y) => {
      const tg = trayGeo();
      const j = order.findIndex((t, j) => !placed(t) && hitBox({ ...tg.pos(j), w: tg.cw, h: tg.ch }, x, y));
      return j >= 0 ? order[j] : null;
    };
    const update = () => api.ready(blanks(params).every(([r, k]) => fill[r][k] != null));
    const place = (t, [r, k]) => { fill[r][k] = t; api.sfx?.tap?.(); update(); };

    function block(p, x, y, w, h, txt, kind) {
      const col = { given: C.line, blank: C.brand, filled: C.R, ok: C.ok, bad: C.bad }[kind];
      p.stroke(col); p.strokeWeight(kind === 'given' ? 1.5 : 2.5); p.fill(kind === 'given' ? C.card : C.bg);
      if (kind === 'blank') p.drawingContext.setLineDash([5, 4]);
      p.rect(x + 2, y, w - 4, h, 8); p.drawingContext.setLineDash([]);
      p.noStroke(); p.fill(kind === 'given' ? C.mute : C.ink); p.textStyle(p.BOLD);
      if (txt) fitText(p, txt, x + w / 2, y + h / 2, w - 12, 17);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; };
      p.onResize = () => { W = size.w; H = size.h; };

      p.draw = () => {
        p.background(C.bg);
        const g = geo(), tg = trayGeo(), good = locked && consistent(params, fill);
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, params.op === 'prod' ? 'Bloque = producto de los dos de abajo' : 'Bloque = suma de los dos de abajo', W / 2, 18, W - 20, 14);
        p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, 'Arrastra fichas a los bloques vacíos', W / 2, 38, W - 20, 12);
        rows.forEach((row, r) => row.forEach((c, k) => {
          const x = g.x(r, k), y = g.y(r);
          if (c) return block(p, x, y, g.bw, g.bh, c.t, 'given');
          const showSol = locked && !good;
          const t = showSol ? sol?.fill[r][k] : fill[r][k];
          block(p, x, y, g.bw, g.bh, t != null ? toks[t].t : '', locked ? (good || showSol ? 'ok' : 'bad') : t != null ? 'filled' : 'blank');
        }));
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11);
        if (locked && !good) p.text('Así quedaba la pirámide', W / 2, g.base + 18);
        order.forEach((t, j) => {
          if (placed(t) || (drag && drag.t === t)) return;
          const q = tg.pos(j);
          p.stroke(sel === t ? C.brand : C.N); p.strokeWeight(sel === t ? 3 : 2); p.fill(C.card); p.rect(q.x, q.y, tg.cw, tg.ch, 19);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); fitText(p, toks[t].t, q.x + tg.cw / 2, q.y + tg.ch / 2, tg.cw - 10, 16);
        });
        if (drag) {
          p.stroke(C.brand); p.strokeWeight(3); p.fill(C.card); p.rect(drag.x - tg.cw / 2, drag.y - tg.ch / 2, tg.cw, tg.ch, 19);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); fitText(p, toks[drag.t].t, drag.x, drag.y, tg.cw - 10, 16);
        }
      };

      p.mousePressed = () => {
        if (locked) return;
        const x = p.mouseX, y = p.mouseY, t = tokenAt(x, y);
        if (t != null) { drag = { t, x, y, x0: x, y0: y }; return false; }
        const b = blankAt(x, y);
        if (!b) return;   // un toque en vacío (o un desplazamiento) no quita la ficha elegida
        if (sel != null) { place(sel, b); sel = null; } else if (fill[b[0]][b[1]] != null) { fill[b[0]][b[1]] = null; api.sfx?.tap?.(); update(); }
        return false;
      };
      p.mouseDragged = () => { if (drag) { drag.x = p.mouseX; drag.y = p.mouseY; return false; } };
      p.mouseReleased = () => {
        if (!drag) return;
        const d = drag; drag = null;
        if (Math.hypot(d.x - d.x0, d.y - d.y0) < 8) { sel = sel === d.t ? null : d.t; api.sfx?.tap?.(); return; }
        const b = blankAt(d.x, d.y);
        if (b) { place(d.t, b); sel = null; }
      };
    }, aspectFor(host, 66 + params.rows.length * 48 + 40 + 48 * Math.ceil(params.tokens.length / 4) + 24));

    return {
      loaded: m.ready,
      getState: () => ({ fill: fill.map(r => [...r]) }),
      lock() { locked = true; drag = null; sel = null; sol = solve(params); },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, solve };
})();
;
//#archivo js/games/detective-pasos.js
// Detective de pasos (evaluaciones). Una solución resuelta paso a paso tiene un error escondido. Se toca
// la línea donde está el error y luego, con ‹ ›, se elige cómo debía quedar ese paso. Las líneas que siguen
// al error lo arrastran (son coherentes con él): el error es el primer paso que no se justifica.
// params = { rounds: [{ title?, steps: [texto], wrong, fixes: [texto], fix }] }
// state = { picks: [{ line, fix } por ronda] }

GAMES['detective-pasos'] = (() => {
  const right = (pk, r) => !!pk && pk.line === r.wrong && pk.fix === r.fix;

  function solve(params) { return { picks: params.rounds.map(r => ({ line: r.wrong, fix: r.fix })) }; }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => right(state.picks?.[i], r));
    const solution = params.rounds.map(r => `El error está en el paso ${r.wrong + 1}: debía ser «${r.fixes[r.fix]}»`).join(' · ');
    return { ok, solution };
  }

  // Alto del lienzo según el contenido (no según el ancho): así cabe igual en un celular de 300 px.
  const aspectFor = (host, px) => Math.max(1, px / Math.max(240, Math.floor(host.clientWidth || 320)));

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const PK = R.map(() => ({ line: null, fix: null }));
    const ORD = R.map((r, i) => shuffledOrder(r.fixes.length, `det${i}${r.fixes.join()}`));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], hits = [];

    function layout(w, h) { W = w; H = h; tabs = R.length > 1 ? roundTabs(R.length, w) : []; }
    const update = () => api.ready(PK.every(pk => pk.line != null && pk.fix != null));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg); hits = [];
        const r = R[cur], pk = locked && !right(PK[cur], r) ? { line: r.wrong, fix: r.fix } : PK[cur], good = right(PK[cur], r);
        if (tabs.length) drawTabs(p, C, tabs, cur, i => (locked ? (right(PK[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : PK[i].line != null ? C.R : C.line));
        let y = tabs.length ? 52 : 12;
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, r.title || 'Toca el paso que tiene el error', W / 2, y + 8, W - 24, 15);
        y += 26;
        const lh = 40;
        r.steps.forEach((s, k) => {
          const sel = pk.line === k, x = 12, w = W - 24;
          const col = sel ? (locked ? C.ok : C.bad) : C.line;
          p.stroke(col); p.strokeWeight(sel ? 3 : 1.5); p.fill(sel ? C.bg : C.card); p.rect(x, y, w, lh, 9);
          p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(11); p.text(k + 1, x + 14, y + lh / 2);
          p.fill(C.ink); p.textStyle(sel ? p.BOLD : p.NORMAL);
          const txt = sel && pk.fix != null ? r.fixes[pk.fix] : s;
          if (sel && pk.fix != null) { p.fill(locked ? C.ok : C.brand); p.textStyle(p.BOLD); }
          fitText(p, txt, x + w / 2 + 8, y + lh / 2, w - 44, 16);
          hits.push({ x, y, w, h: lh, line: k });
          y += lh + 6;
        });
        // Selector de la corrección
        y += 8;
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL);
        if (pk.line == null) { fitText(p, 'Primero señala la línea equivocada', W / 2, y + 20, W - 24, 13); return; }
        fitText(p, locked ? (good ? '¡Bien visto!' : 'El error y su corrección') : `¿Cómo debía quedar el paso ${pk.line + 1}?`, W / 2, y + 8, W - 24, 13);
        y += 22;
        // La corrección ocupa todo el ancho (cabe a 260 px); las flechas van debajo.
        const bw = 52, bh = 40, mid = { x: 12, y, w: W - 24, h: bh }, ay = y + bh + 8;
        [['‹', W / 2 - bw - 34, -1], ['›', W / 2 + 34, 1]].forEach(([s, x, d]) => {
          p.stroke(locked ? C.line : C.brand); p.strokeWeight(2); p.fill(C.card); p.rect(x, ay, bw, bh, 9);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(22); p.text(s, x + bw / 2, ay + bh / 2 - 2);
          hits.push({ x, y: ay, w: bw, h: bh, step: d });
        });
        p.stroke(pk.fix != null ? (locked ? C.ok : C.brand) : C.line); p.strokeWeight(2); p.fill(C.card); p.rect(mid.x, mid.y, mid.w, mid.h, 9);
        p.noStroke(); p.fill(pk.fix != null ? C.ink : C.mute); p.textStyle(pk.fix != null ? p.BOLD : p.NORMAL);
        fitText(p, pk.fix != null ? r.fixes[pk.fix] : 'Usa ‹ › para elegir', mid.x + mid.w / 2, mid.y + mid.h / 2, mid.w - 12, 15);
        if (pk.fix != null) {
          const n = r.fixes.length, at = ORD[cur].indexOf(pk.fix);
          p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11); p.text(`${at + 1} de ${n}`, W / 2, ay + bh / 2);
        }
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const h = hits.find(b => hitBox(b, x, y));
        if (!h) return;
        const pk = PK[cur];
        if (h.line != null) { if (pk.line !== h.line) { pk.line = h.line; pk.fix = null; } }
        else {
          const o = ORD[cur], at = pk.fix == null ? (h.step > 0 ? -1 : 0) : o.indexOf(pk.fix);
          pk.fix = o[(at + h.step + o.length) % o.length];
        }
        api.sfx?.tap?.(); update();
        return false;
      };
    }, aspectFor(host, (R.length > 1 ? 52 : 12) + 26 + 46 * Math.max(...R.map(r => r.steps.length)) + 8 + 22 + 40 + 8 + 40 + 12));

    return {
      loaded: m.ready,
      getState: () => ({ picks: PK.map(pk => ({ ...pk })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, solve };
})();
;
//#archivo js/games/alg-escena.js
// Escenas de Álgebra para los retos del gimnasio (spec 2026-11-25-explora-algebra-trigonometria): una de fichas y una que se mueve
// por mundo. Va después de trig-escena.js (XG.mueve) y de conteo-escena.js (XG.cuenta). Se dibujan con XM (explora-mate.js).
(() => {
  const C = XG.cuenta, M = XG.mueve, N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const cap = (K, p, y = 26) => (p.cap ? K.t(170, y, p.cap, 'b ta') : '');
  // 1 · Conjuntos
  C('fichas-venn', 150, (K, p) => K.r(16, 6, 308, 138, 'fc', 10) + K.c(132, 76, 56, 'fa') + K.c(208, 76, 56, 'fg') + K.t(66, 30, p.na || 'A', 'ta') + K.t(274, 30, p.nb || 'B', 'tg') + (p.z || []).map((t, i) => K.t([104, 170, 236, 40][i], i < 3 ? 82 : 134, t, 'b')).join(''));
  M('solapa-conjuntos', 150, (v, K, p, f) => { const u = 280 / (p.a + p.b); return K.r(30, 40, p.a * u, 34, 'fa') + K.t(38, 62, `A: ${p.a}`, 's', 'start') + K.r(30 + (p.a - v.i) * u, 82, p.b * u, 34, 'fg') + K.t(38 + (p.a - v.i) * u, 104, `B: ${p.b}`, 's', 'start') + K.f(f, K.t(170, 142, `unión: ${p.a + p.b - v.i}`, 'b ta')); }, v => `$n(A \\cap B) = ${v.i}$`);
  // 2 · Recta real
  C('fichas-recta', 110, (K, p) => { const L = XM.linea(K, p.lim?.[0] ?? -8, p.lim?.[1] ?? 8, 62, { p: p.paso || 2 }); return cap(K, p) + L.s + (p.pts || []).map(x => K.c(L.X(x), 62, 6, 'fA')).join(''); });
  M('tramo-recta', 130, (v, K, p, f) => { const L = XM.linea(K, -10, 10, 80, { p: 2 }); return L.s + K.r(L.X(v.c - v.r), 74, L.X(v.c + v.r) - L.X(v.c - v.r), 12, 'fa') + K.c(L.X(v.c), 80, 5, 'fF') + K.f(f, K.t(170, 36, `de ${N(v.c - v.r)} a ${N(v.c + v.r)}`, 'b ta')); }, v => `$c = ${v.c}, \\ r = ${v.r}$`);
  // 3 · Escalas y proporciones
  C('fichas-barra', 100, (K, p) => cap(K, p) + XM.barra(K, 44, p.segs || [[1, '', 'fa']], { h: 38 }));
  M('barra-factor', 150, (v, K, p, f) => XM.barra(K, 36, [[p.base, `${p.rb || 'antes'} ${p.base}`, 'fa']], { T: p.T, h: 34 }) + XM.barra(K, 92, [[v.x, '', 'fg']], { T: p.T, h: 34 }) + K.f(f, K.t(170, 146, p.rb ? `${p.base} ÷ ${v.x} = ${N(p.base / v.x)}` : `${v.x} ÷ ${p.base} = ${N(v.x / p.base)}`, 's')), v => `$${v.x}$`);
  // 4 · Exponentes y radicales
  C('fichas-torre', 120, (K, p) => cap(K, p) + Array.from({ length: p.n || 4 }, (_, i) => K.r(170 - (p.n || 4) * 17 + i * 34, 50, 30, 30, 'fa', 5) + K.t(185 - (p.n || 4) * 17 + i * 34, 71, p.b || 'x', 's')).join(''));
  M('lado-area', 190, (v, K, p, f) => XM.reja(K, 170 - v.s * 9, 16, v.s, v.s, 18) + K.f(f, K.t(300, 30, `área ${v.s * v.s}`, 's', 'end')), v => `$\\text{lado } ${v.s}$`);
  // 5 · Sucesiones
  C('fichas-escalera', 130, (K, p) => cap(K, p, 18) + (p.xs || []).map((x, i) => { const h = x / Math.max(...p.xs) * 80; return K.r(50 + i * 42, 124 - h, 34, h, 'fa') + K.t(67 + i * 42, 118 - h, x, 's'); }).join(''));
  M('escalera-salto', 170, (v, K, p, f) => Array.from({ length: p.n }, (_, i) => { const x = p.geo ? p.a * v.d ** i : p.a + v.d * i, h = Math.min(130, x * 130 / p.top); return K.r(34 + i * 280 / p.n, 160 - h, 240 / p.n, h, 'fa') + (i === 0 || f ? K.t(34 + i * 280 / p.n + 120 / p.n, 152 - h, N(x), 's') : ''); }).join(''), v => `$${v.d}$`);
  // 6 · Polinomios
  C('fichas-area', 132, (K, p) => cap(K, p, 18) + K.r(90, 30, 90, 60, 'fa') + K.r(184, 30, 60, 60, 'fg') + K.r(90, 94, 90, 34, 'fg') + K.r(184, 94, 60, 34, 'ff') + (p.t || ['', '', '', '']).map((t, i) => K.t([135, 214, 135, 214][i], [66, 66, 116, 116][i], t, 's')).join(''));
  M('rectangulo-barras', 210, (v, K, p, f) => K.r(60, 20, 80, 80, 'fa') + K.t(100, 66, 'x²', 'b') + Array.from({ length: v.p }, (_, i) => K.r(140 + i * 18, 20, 18, 80, 'fg')).join('') + Array.from({ length: v.q }, (_, i) => K.r(60, 100 + i * 18, 80, 18, 'fg')).join('') + XM.reja(K, 140, 100, v.p, v.q, 18, 'ff') + K.f(f, K.t(330, 200, `${v.p + v.q} barras y ${v.p * v.q} unidades`, 's', 'end')), v => `$(x + ${v.p})(x + ${v.q})$`);
  // 7 · Parábolas y complejos
  C('fichas-parabola', 170, (K, p) => { const P = XM.plano(K, -6, 6, -5, 7, { H: 164 }); return P.s + XM.curva(K, P, x => p.f[0] * x * x + p.f[1] * x + p.f[2]); });
  M('vertice-mueve', 200, (v, K, p, f) => { const P = XM.plano(K, -6, 6, -5, 7, { H: 190 }); return P.s + XM.curva(K, P, x => p.a * (x - p.meta.h) ** 2 + p.meta.k, 'lm d') + XM.curva(K, P, x => p.a * (x - v.h) ** 2 + v.k) + K.c(P.X(v.h), P.Y(v.k), 5, 'fF'); }, v => `$(${v.h}, ${v.k})$`);
  // 8 · Raíces de polinomios
  C('fichas-cubica', 170, (K, p) => { const P = XM.plano(K, -4, 4, -12, 12, { H: 164, gy: 4 }); return P.s + XM.curva(K, P, x => (p.k || 1) * (x - p.r[0]) * (x - p.r[1]) * (x - p.r[2])); });
  M('toca-raiz', 200, (v, K, p, f) => { const P = XM.plano(K, -4, 4, -12, 12, { H: 190, gy: 4 }), F = x => p.c.reduce((s, a) => s * x + a, 0); const y = Math.max(-12, Math.min(12, F(v.x))); return P.s + K.l(P.X(v.x), 8, P.X(v.x), 182, 'lm d') + K.f(f, XM.curva(K, P, F) + K.c(P.X(v.x), P.Y(y), 6, 'fF') + K.t(14, 22, `P(${N(v.x)}) = ${N(F(v.x))}`, 'ta', 'start')); }, v => `$x = ${v.x}$`);
  // 9 · Fracciones algebraicas
  C('fichas-fraccion', 90, (K, p) => K.r(20, 10, 300, 70, 'fc', 10) + K.t(170, 52, p.cap || '', 'b'));
  M('cruce-rectas', 200, (v, K, p, f) => { const P = XM.plano(K, -1, 9, -1, 9, { H: 190 }); return P.s + XM.curva(K, P, x => p.m * x + p.b) + XM.curva(K, P, x => p.n * x + p.d, 'lf gr') + K.c(P.X(v.x), P.Y(v.y), 6, 'fG'); }, v => `$(${v.x}, ${v.y})$`);
  // 10 · Crecimiento exponencial
  C('fichas-crece', 130, (K, p) => cap(K, p, 18) + (p.xs || []).map((x, i) => { const h = x / Math.max(...p.xs) * 80; return K.r(50 + i * 42, 124 - h, 34, h, 'fg') + K.t(67 + i * 42, 118 - h, x, 's'); }).join(''));
  M('curva-crece', 200, (v, K, p, f) => { const P = XM.plano(K, -3, 4, -1, 12, { H: 190, gy: 2 }); return P.s + XM.curva(K, P, x => p.meta.a * p.b ** x + (p.meta.k || 0), 'lm d') + XM.curva(K, P, x => v.a * p.b ** x + (v.k || 0)) + (p.meta.k != null ? K.l(18, P.Y(v.k), 322, P.Y(v.k), 'lf d') : ''); }, v => `$a = ${v.a}$`);
})();
;
//#archivo js/games/bloques-area.js
// Bloques de área (Álgebra, productos notables y factorización; mundo Taller de los Bloques; spec 2026-11-19-mundos-altos):
// un producto (x + a)(x + b) es el área de un rectángulo de lados x + a y x + b, armado con un cuadrado x², barras de
// x por 1 y cuadritos de 1 por 1. El juego dibuja el rectángulo; el estudiante mueve los números con − y +.
//   mode 'factor': se da x² + s·x + p y se eligen a y b; el rectángulo cambia en vivo y cuenta sus barras y cuadritos.
//                  Gana cuando tiene justo s barras y p cuadritos (dos números que sumen s y multipliquen p).
//   mode 'expand': se da (x + a)(x + b) ya dibujado, sin contar; se dice cuántas barras x y cuántos cuadritos tiene.
// params = { rounds: [{ mode, a, b }] }   state = { rounds: [{ u, v }] }   (u, v: los dos números que se eligen)

GAMES['bloques-area'] = (() => {
  const M = t => (typeof mathStep === 'function' ? `$${plainToTex(t)}$` : t);
  const poly = (s, p) => `x² ${s < 0 ? '−' : '+'} ${Math.abs(s)}x ${p < 0 ? '−' : '+'} ${Math.abs(p)}`;
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ u: 0, v: 0 }),
    ok: (s, r) => (r.mode === 'factor' ? s.u + s.v === r.a + r.b && s.u * s.v === r.a * r.b : s.u === r.a + r.b && s.v === r.a * r.b),
    answered: s => s.u > 0 || s.v > 0,
    solution: r => `$(x + ${r.a})(x + ${r.b}) = x^2 + ${r.a + r.b}x + ${r.a * r.b}$`,
    prompt: r => (r.mode === 'factor' ? `Arma el rectángulo de área ${M(poly(r.a + r.b, r.a * r.b))}` : `Cuenta las piezas de ${M(`(x + ${r.a})(x + ${r.b})`)}`),
    foot: r => (r.mode === 'factor' ? 'Dos números que sumados den las barras y multiplicados den los cuadritos' : 'Las barras son a + b; los cuadritos llenan la esquina: a por b'),
    layout(G) { const w = (G.W - 36) / 2; G.box = [{ x: 12, y: G.H - 64, w, h: 32 }, { x: 24 + w, y: G.H - 64, w, h: 32 }]; },
    draw(G) {
      const { p, C, W, H, s, r } = G, fac = r.mode === 'factor', a = fac ? s.u : r.a, b = fac ? s.v : r.b;
      const top = 96, room = H - 64 - 44 - top, k = Math.min(15, (Math.min(W - 60, room) - 0) / (6 + Math.max(a, b, 4))), X = 6 * k, x0 = W / 2 - (X + a * k) / 2, y0 = top + (room - (X + b * k)) / 2;
      const cell = (x, y, w, h, col) => { p.noStroke(); p.fill(col); p.rect(x + 1, y + 1, w - 2, h - 2, 3); };
      cell(x0, y0, X, X, C.sky);
      for (let i = 0; i < a; i++) cell(x0 + X + i * k, y0, k, X, C.mint);
      for (let j = 0; j < b; j++) cell(x0, y0 + X + j * k, X, k, C.mint);
      for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) cell(x0 + X + i * k, y0 + X + j * k, k, k, C.sun);   // sol, no coral: en el kit y en los videos el coral es «negativo»
      p.noStroke(); p.fill(inkOn(C.sky, C.ink)); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fitText(p, '$x^2$', x0 + X / 2, y0 + X / 2, X - 8, 18);
      p.fill(C.mute); p.textSize(12);
      fitText(p, fac || G.locked ? M(`x + ${a}`) : M('x + a'), x0 + (X + a * k) / 2, y0 - 12, W - 40, 13);
      // Lo que el juego cuenta (en «expand» solo al comprobar: contar es el ejercicio).
      const bars = a + b, units = a * b;
      p.fill(C.ink); p.textStyle(p.BOLD);
      fitText(p, fac ? `${bars} ${bars === 1 ? 'barra' : 'barras'} x · ${units} ${units === 1 ? 'cuadrito' : 'cuadritos'}` : G.locked ? `${bars} barras x · ${units} cuadritos` : `tu respuesta: ${M(poly(s.u, s.v))}`, W / 2, H - 64 - 30, W - 24, 14);
      drawStepper(p, C, G.box[0], s.u, fac ? 'a' : 'barras x', C.Q);
      drawStepper(p, C, G.box[1], s.v, fac ? 'b' : 'cuadritos', fac ? C.Q : C.N);
    },
    press(G, x, y) {
      const d0 = stepHit(G.box[0], x, y), d1 = stepHit(G.box[1], x, y), fac = G.r.mode === 'factor';
      if (!d0 && !d1) return false;
      G.s.u = Math.max(0, Math.min(fac ? 9 : 18, G.s.u + d0)); G.s.v = Math.max(0, Math.min(fac ? 9 : 81, G.s.v + d1)); G.touch();
      return true;
    },
    peek: G => ({ box: G.box, want: G.r.mode === 'factor' ? [G.r.a, G.r.b] : [G.r.a + G.r.b, G.r.a * G.r.b] }),
  });
  return { ...game, poly };
})();
;
//#archivo js/games/division-sintetica.js
// La división sintética (Álgebra, teorema del residuo y del factor; mundo Cordillera Cúbica; spec 2026-11-19-mundos-altos):
// arriba van los coeficientes de P(x). Se elige el número r con − y + y, al tocar «Dividir», el juego hace la división
// entre (x − r) paso a paso: baja el primero, multiplica por r, suma, y así hasta el final. El último número es el
// residuo, que es P(r).
//   goal 'zero':  hallar un r que deje residuo 0 (entonces x − r es factor y r es una raíz). Vale cualquier raíz.
//   goal 'value': hallar el r cuyo residuo es `value`.
// Hay pocas divisiones por ronda (4 por defecto): no alcanza para probar todos los números, así que hay que pensar
// cuáles valen la pena: los divisores del término independiente y, sobre todo, el SIGNO de los residuos ya vistos (si
// P(1) es negativo y P(3) positivo, entre los dos hay una raíz). Las divisiones hechas quedan anotadas. La respuesta es
// el r que queda elegido al comprobar, se haya dividido con él o no (spec 2026-11-21-dinamicos-mundos-altos).
// params = { rounds: [{ coef: [a_n, …, a_0], goal, value?, min?, max?, probes? }] }   state = { rounds: [{ r, tried: [r…] }] }

GAMES['division-sintetica'] = (() => {
  // Fila de abajo de la división sintética de coef entre (x − r).
  const rowOf = (coef, r) => { const out = []; coef.forEach((c, i) => out.push(i ? c + out[i - 1] * r : c)); return out; };
  const remOf = (coef, r) => rowOf(coef, r)[coef.length - 1];
  const polyTex = coef => {
    const n = coef.length - 1;
    return coef.map((c, i) => {
      if (!c) return '';
      const e = n - i, a = Math.abs(c), v = e === 0 ? `${a}` : `${a === 1 ? '' : a}x${e > 1 ? `^{${e}}` : ''}`;
      return `${i === 0 ? (c < 0 ? '-' : '') : c < 0 ? ' - ' : ' + '}${v}`;
    }).join('');
  };
  const want = r => (r.goal === 'zero' ? 0 : r.value);
  const maxOf = r => r.probes ?? 4;
  const rootsOf = r => { const o = []; for (let v = r.min ?? -6; v <= (r.max ?? 6); v++) if (remOf(r.coef, v) === want(r)) o.push(v); return o; };
  const divisor = v => (v === 0 ? 'x' : `x ${v < 0 ? '+' : '-'} ${Math.abs(v)}`);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ r: 0, tried: [] }),
    ok: (s, r) => (s.tried?.length || s.moved) && remOf(r.coef, s.r) === want(r),
    answered: s => s.tried.length > 0,
    solution: r => { const v = rootsOf(r)[0]; return `$P(${v}) = ${remOf(r.coef, v)}$: divide entre $${divisor(v)}$`; },
    prompt: r => `$P(x) = ${polyTex(r.coef)}$`,
    foot: (r, s) => (s.tried.length >= maxOf(r) ? 'Ya no quedan divisiones: deja elegido el r que crees correcto' : r.goal === 'zero' ? 'Pocas divisiones: fíjate en el signo de cada residuo' : `Busca el r que deja residuo ${negTxt(r.value)}: mira si te pasas o te falta`),
    layout(G) { G.box = { x: 12, y: G.H - 66, w: 150, h: 32 }; G.btn = { x: G.W - 12 - 132, y: G.H - 68, w: 132, h: 36 }; },
    draw(G) {
      const { p, C, W, s, r } = G, n = r.coef.length, seen = G.locked || s.tried.includes(s.r), row = rowOf(r.coef, s.r), cw = Math.min(54, (W - 76) / n), x0 = W / 2 - (n * cw) / 2 + 22, y0 = 108, rh = 40, left = maxOf(r) - s.tried.length;
      const num = (v, x, y, col) => { p.noStroke(); p.fill(col); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fitText(p, seen || col === C.ink ? negTxt(v) : '?', x, y, cw - 6, 17); };
      // El número r, en su casilla de la izquierda.
      drawTile(p, C, { x: x0 - 50, y: y0 + rh - 16, w: 38, h: 32 }, negTxt(s.r), { fill: C.sky, size: 16, r: 8, lift: 2 });
      p.stroke(C.ink); p.strokeWeight(2); p.line(x0 - 6, y0 - 16, x0 - 6, y0 + 2 * rh + 14); p.line(x0 - 6, y0 + 2 * rh - 22, x0 + n * cw, y0 + 2 * rh - 22);
      for (let i = 0; i < n; i++) {
        const x = x0 + i * cw + cw / 2, last = i === n - 1, good = row[i] === want(r);
        num(r.coef[i], x, y0, C.ink);
        if (i) num(row[i - 1] * s.r, x, y0 + rh, C.mute);
        if (last) { p.fill(G.locked ? (good ? C.ok : C.bad) : C.card); p.stroke(G.locked ? (good ? C.ok : C.bad) : C.N); p.strokeWeight(2); p.rect(x - cw / 2 + 4, y0 + 2 * rh - 16, cw - 8, 32, 8); }
        num(row[i], x, y0 + 2 * rh, last ? (G.locked ? inkOn(good ? C.ok : C.bad, C.ink) : C.N) : C.Z);
      }
      p.noStroke(); p.textAlign(p.CENTER, p.CENTER);
      p.fill(C.ink); p.textStyle(p.BOLD);
      fitText(p, seen ? `$P(${s.r}) = ${row[n - 1]}$  ·  residuo al dividir entre $${divisor(s.r)}$` : `Toca «Dividir» para dividir entre $${divisor(s.r)}$`, W / 2, y0 + 3 * rh - 2, W - 20, 14);
      // Lo que ya se dividió, en orden de r: ahí se ve dónde cambia el signo del residuo.
      const hist = [...s.tried].sort((a, b) => a - b).map(v => `P(${negTxt(v)}) = ${negTxt(remOf(r.coef, v))}`).join('   ');
      p.fill(C.mute); p.textStyle(p.BOLD); fitText(p, hist || 'Aquí quedan anotadas tus divisiones', W / 2, y0 + 3 * rh + 22, W - 20, 12);
      drawStepper(p, C, G.box, negTxt(s.r), 'r', C.Z);
      if (!G.locked) {
        const can = left > 0 && !s.tried.includes(s.r);
        drawTile(p, C, G.btn, left > 0 ? `Dividir (${left})` : 'Sin divisiones', { fill: can ? C.coral : C.line, ink: can ? undefined : C.mute, size: 14, r: 12 });
      }
    },
    press(G, x, y) {
      const s = G.s, r = G.r, d = stepHit(G.box, x, y);
      if (d) { s.r = Math.max(r.min ?? -6, Math.min(r.max ?? 6, s.r + d)); G.touch(); return true; }
      if (hitBox(G.btn, x, y)) { if (s.tried.length < maxOf(r) && !s.tried.includes(s.r)) { s.tried.push(s.r); G.touch(); } return true; }
      return false;
    },
    peek: G => ({ box: G.box, btn: G.btn, want: rootsOf(G.r)[0], left: maxOf(G.r) - G.s.tried.length, rem: remOf(G.r.coef, G.s.r) }),
  });
  return { ...game, rowOf, remOf, polyTex, rootsOf, maxOf };
})();
;
//#archivo js/games/cancela-factores.js
// Cancela factores (Álgebra, simplificar expresiones racionales; mundo Río de Asíntotas; spec 2026-11-19-mundos-altos):
// una fracción con fichas arriba y abajo de la raya. Si las fichas están MULTIPLICANDO (factores), una de arriba se
// cancela con una igual de abajo: se puede arrastrar desde arriba. Si están SUMANDO (términos), nada se cancela: esa es la
// trampa de siempre, (x + 2)/x no es 2. Cuando ya no queda nada por cancelar se toca «Listo».
// Lo cancelado sigue contando para el dominio: el juego lo recuerda al comprobar.
// params = { rounds: [{ top: [etiquetas], bottom: [etiquetas], sumTop?: true, sumBottom?: true }] }
// state = { rounds: [{ pairs: [[i, j]], done }] }

GAMES['cancela-factores'] = (() => {
  const M = t => (typeof mathStep === 'function' ? `$${plainToTex(t)}$` : t);
  // Parejas que se pueden cancelar: solo entre factores (nunca si un piso es una suma).
  function bestPairs(r) {
    if (r.sumTop || r.sumBottom) return 0;
    const left = [...r.bottom]; let n = 0;
    for (const t of r.top) { const k = left.indexOf(t); if (k >= 0) { left.splice(k, 1); n++; } }
    return n;
  }
  const valid = (s, r) => (s.pairs || []).every(([i, j]) => !r.sumTop && !r.sumBottom && r.top[i] === r.bottom[j]);
  const restOf = (list, used, sum) => { const k = list.filter((_, i) => !used.includes(i)); return k.length ? k.map(t => (sum || k.length === 1 ? t : `(${t})`)).join(sum ? ' + ' : '') : '1'; };
  const resultTex = (s, r) => { const a = restOf(r.top, s.pairs.map(q => q[0]), r.sumTop), b = restOf(r.bottom, s.pairs.map(q => q[1]), r.sumBottom); return b === '1' ? plainToTex(a) : `\\frac{${plainToTex(a)}}{${plainToTex(b)}}`; };
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ pairs: [], done: false, pick: -1 }),
    ok: (s, r) => !!s.done && valid(s, r) && (s.pairs || []).length === bestPairs(r),
    answered: s => !!s.done,
    solution: r => { const n = bestPairs(r), top = [...r.top.keys()], pairs = []; const left = r.bottom.map((t, j) => [t, j]); if (n) for (const i of top) { const k = left.findIndex(q => q[0] === r.top[i]); if (k >= 0) { pairs.push([i, left[k][1]]); left.splice(k, 1); } } return n ? `Queda $${resultTex({ pairs }, r)}$` : 'No se cancela nada: son términos que se suman, no factores'; },
    // El mismo enunciado en todas las rondas: no delata cuáles son la trampa.
    prompt: () => 'Simplifica: cancela solo lo que multiplica a todo su piso',
    foot: () => 'Lleva un factor sobre su igual del otro piso',
    layout(G) {
      const { W, H } = G, mid = 96 + (H - 96 - 110) / 2;
      G.tile = (side, i, n) => { const w = Math.min(96, (W - 28 - (n - 1) * 18) / n), x0 = W / 2 - (n * w + (n - 1) * 18) / 2; return { x: x0 + i * (w + 18), y: side ? mid + 16 : mid - 56, w, h: 40 }; };
      G.mid = mid; G.btn = { x: W / 2 - 60, y: H - 78, w: 120, h: 36 };
    },
    draw(G) {
      const { p, C, W, s, r } = G;
      p.stroke(C.ink); p.strokeWeight(3); p.line(24, G.mid, W - 24, G.mid);
      [[r.top, 0, r.sumTop], [r.bottom, 1, r.sumBottom]].forEach(([list, side, sum]) => list.forEach((t, i) => {
        const b = G.tile(side, i, list.length), cut = s.pairs.some(q => q[side] === i), sel = !side && s.pick === i;
        drawTile(p, C, b, M(t), { fill: cut ? C.line : C.cream, ink: cut ? C.mute : undefined, size: 15, ring: sel ? C.brand : null });
        if (cut) { p.stroke(C.coral); p.strokeWeight(3); p.line(b.x + 6, b.y + b.h - 6, b.x + b.w - 6, b.y + 6); }
        if (i < list.length - 1) { p.noStroke(); p.fill(sum ? C.I : C.mute); p.textStyle(p.BOLD); p.textSize(16); p.textAlign(p.CENTER, p.CENTER); p.text(sum ? '+' : '·', b.x + b.w + 9, b.y + b.h / 2); }
      }));
      if (G.locked && !(r.sumTop || r.sumBottom) && bestPairs(r)) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER); fitText(p, 'Lo cancelado sigue fuera del dominio', W / 2, G.btn.y - 14, W - 24, 11); }
      if (G.follow) {
        const b = G.tile(0, s.pick, r.top.length), { x, y } = G.follow;
        p.stroke(C.brand); p.strokeWeight(2); p.line(b.x + b.w / 2, b.y + b.h / 2, x, y);
        drawTile(p, C, { x: x - b.w / 2, y: y - 19, w: b.w, h: 38 }, M(r.top[s.pick]), { size: 15 });
      }
      if (!G.locked) drawTile(p, C, G.btn, s.done ? '✓ Listo' : 'Listo', { fill: s.done ? C.mint : C.sky, size: 15, r: 12 });
    },
    press(G, x, y) {
      const s = G.s, r = G.r;
      if (hitBox(G.btn, x, y)) { s.done = !s.done; s.pick = -1; G.touch(); return true; }
      const ti = r.top.findIndex((_, i) => hitBox(G.tile(0, i, r.top.length), x, y)), bi = r.bottom.findIndex((_, j) => hitBox(G.tile(1, j, r.bottom.length), x, y));
      if (ti < 0 && bi < 0) return false;
      s.done = false;
      // Tocar una ficha ya tachada deshace su pareja.
      const k = s.pairs.findIndex(q => (ti >= 0 ? q[0] === ti : q[1] === bi));
      if (k >= 0) { s.pairs.splice(k, 1); s.pick = -1; }
      else if (ti >= 0) s.pick = s.pick === ti ? -1 : ti;
      else if (s.pick >= 0) { s.pairs.push([s.pick, bi]); s.pick = -1; }
      G.touch();
      return true;
    },
    drag(G, x, y) {
      if (G.s.pick < 0) return false;
      G.follow = { x, y };
      return true;
    },
    release(G, x, y) {
      if (!G.follow) return;
      G.follow = null;
      const { r, s } = G, j = r.bottom.findIndex((_, i) => hitBox(G.tile(1, i, r.bottom.length), x, y));
      if (j >= 0 && !s.pairs.some(q => q[1] === j)) {
        s.pairs.push([s.pick, j]); s.pick = -1; G.touch();
      }
    },
    cancel(G) { G.follow = null; },
    demo(G) {
      const { r } = G;
      const i = r.top.findIndex(t => r.bottom.includes(t)), j = r.bottom.indexOf(r.top[i]);
      const a = G.tile(0, Math.max(0, i), r.top.length), from = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
      if (i < 0 || r.sumTop || r.sumBottom) return { from, to: { x: from.x, y: G.mid }, text: 'Revisa los signos entre las piezas', ty: G.btn.y - 16 };
      const b = G.tile(1, j, r.bottom.length);
      return { from, to: { x: b.x + b.w / 2, y: b.y + b.h / 2 } };
    },
    peek: G => ({ top: G.r.top.map((_, i) => G.tile(0, i, G.r.top.length)), bottom: G.r.bottom.map((_, j) => G.tile(1, j, G.r.bottom.length)), btn: G.btn, best: bestPairs(G.r) }),
  });
  return { ...game, bestPairs, valid, resultTex };
})();
;
//#archivo js/explora-alg-mundos-9-10.js
// Álgebra · mundos 9 (Fracciones Algebraicas) y 10 (Crecimiento Exponencial), Explora. Ejemplos propios.
{
  const P = XM.pasos;
  // ---------------------------------------------------------------------------------------------------------- alg-25a
  const rio = (v, K) => { const p = XM.plano(K, -5, 5, -6, 6, { H: 200, g: 1, gy: 2 }); return p.s + K.l(p.X(v.q), 8, p.X(v.q), 192, 'lf d') + XM.curva(K, p, x => (Math.abs(x - v.q) < 0.06 ? NaN : 2 / (x - v.q))); };
  xpLec('alg-25a', [
    ['Lo que no se puede', xpMira('dibujo', 'Empecemos por la idea: una fracción **no existe** donde el denominador vale 0.', { dib: rio, v: { q: 1 }, alto: 210 }, [
      ['Dos entre x − 1. En 1, el denominador se anula.', {}, '$\\tfrac{2}{x - 1}, \\ x \\neq 1$'],
      ['Cerca de 1 el resultado crece sin parar.', {}, '$\\tfrac{2}{0.01} = 200$'],
      ['La recta punteada es una **asíntota**: la curva se acerca y no la toca.', {}, '$x = 1$'],
      ['Con x + 3, el prohibido es −3.', { q: -3 }, '$\\tfrac{2}{x + 3}, \\ x \\neq -3$'],
      ['El dominio son todos los demás.', {}, '$\\mathbb{R} - \\{-3\\}$'],
    ], 'Iguala a 0 el denominador: esos valores quedan fuera.'),
    xpFila('En $\\tfrac{x + 1}{x^2 - 2x - 8}$, pon los valores prohibidos, el menor primero.', ['menor', 'mayor'], ['−2', '4'], ['2', '−4', '−1'], 'Factoriza: dos que sumen −2 y multipliquen −8.', '$(x - 4)(x + 2) = 0$.')],
    ['Cancelar factores', xpMira('dibujo', 'Segunda idea: se cancelan **factores**, nunca términos.', { dib: (v, K) => P(K, v, ['(x² − 9) / (x² + 3x)', '(x + 3)(x − 3) / x(x + 3)', '(x − 3) / x'], 44, 40), v: { n: 1 }, alto: 150 }, [
      ['Parecen no tener nada en común.', {}, '$\\tfrac{x^2 - 9}{x^2 + 3x}$'],
      ['Factorizamos arriba y abajo.', { n: 2 }, '$\\tfrac{(x+3)(x-3)}{x(x+3)}$'],
      ['El factor x + 3 se repite: se cancela.', { n: 3 }, '$\\tfrac{x - 3}{x}$'],
      ['El −3 sigue prohibido: la original no existía ahí.', {}, '$x \\neq 0, \\ x \\neq -3$'],
      ['No se tacha la x de x − 3: no es factor.', {}, '$\\tfrac{x - 3}{x} \\neq -3$'],
    ], 'Factoriza primero; cancela factores; recuerda lo prohibido.'),
    xpFila('$\\tfrac{x^2 + 5x}{x^2 - 25}$: pon lo que queda arriba y abajo.', ['arriba', 'abajo'], ['x', 'x − 5'], ['x + 5', '5x', '−5'], 'Arriba x(x + 5); abajo, diferencia de cuadrados.', '$\\tfrac{x}{x - 5}$.')],
    ['Hueco o río', xpMira('dibujo', 'Tercera idea: si el factor se cancela queda un **hueco**; si no, un **río**.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -3, 5, { H: 190 }); return p.s + K.f(1 - v.r, XM.curva(K, p, x => x + 1) + K.c(p.X(1), p.Y(2), 6, 'fop') + K.c(p.X(1), p.Y(2), 6, 'fn')) + K.f(v.r, K.l(p.X(1), 8, p.X(1), 182, 'lf d') + XM.curva(K, p, x => (Math.abs(x - 1) < 0.06 ? NaN : 1 / (x - 1) + 1))); }, v: { r: 0 }, alto: 200 }, [
      ['x² − 1 entre x − 1 es la recta x + 1.', {}, '$\\tfrac{(x-1)(x+1)}{x-1}$'],
      ['Pero en 1 no existe: le falta un punto. Es un hueco.', {}, '$x \\neq 1$'],
      ['En x entre x − 1 nada se cancela.', { r: 1 }, '$\\tfrac{x}{x - 1}$'],
      ['Ahí hay un río: la curva se parte en dos orillas.', {}, '$x = 1$'],
    ], 'Factor cancelado: hueco. Factor que queda abajo: asíntota.'),
    xpFila('$\\tfrac{(x - 2)(x + 4)}{(x - 2)(x - 5)}$: di qué hay en cada prohibido.', ['en 2', 'en 5'], ['hueco', 'río'], ['nada'], '¿Cuál factor se cancela?', 'El de 2 se cancela; el de 5 queda abajo.')],
    ['Ahora sí, un problema', xpMueve('Un sensor falla donde su fórmula, $\\tfrac{2}{x + 2}$, no existe. Mueve el río de $\\tfrac{2}{x - q}$ hasta ese valor.', 270, { q: 1 }, [xpRegla('q', -4, 4, 'valor prohibido')], { q: -2 }, rio, '$x + 2 = 0$ en $x = -2$.', { lee: v => `$x \\neq ${v.q}$` })],
  ], 'Factoriza, mira lo prohibido y cancela solo factores.');

  // ---------------------------------------------------------------------------------------------------------- alg-25b
  xpLec('alg-25b', [
    ['El mismo denominador', xpMira('dibujo', 'Empecemos por la idea: para sumar, las partes deben ser **del mismo tamaño**.', { dib: (v, K) => P(K, v, ['2/x + 3/(x + 1)', '2(x+1)/x(x+1) + 3x/x(x+1)', '(2x + 2 + 3x) / x(x+1)', '(5x + 2) / x(x+1)'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Los denominadores son x y x + 1: distintos.', {}, '$\\text{común: } x(x+1)$'],
      ['A cada fracción se le multiplica lo que le falta, arriba y abajo.', { n: 2 }, '$\\tfrac{x+1}{x+1} = 1$'],
      ['Se suman los de arriba.', { n: 3 }, '$2x + 2 + 3x$'],
      ['El de abajo no se suma: es el tamaño.', { n: 4 }, '$\\tfrac{5x + 2}{x(x+1)}$'],
    ], 'Común denominador: lo que le falta a cada una, arriba y abajo.'),
    xpFila('$\\tfrac{4}{x} + \\tfrac{1}{x + 2}$ sobre $x(x + 2)$: arriba queda $\\square x + \\square$.', ['de x', 'número'], ['5', '8'], ['4', '6', '2'], '4(x + 2) + x.', '$5x + 8$.')],
    ['Restar con cuidado', xpMira('dibujo', 'Segunda idea: la raya es un **paréntesis**: el menos entra a todo.', { dib: (v, K) => P(K, v, ['5x/(x−1) − (2x + 3)/(x−1)', '(5x − (2x + 3)) / (x−1)', '(5x − 2x − 3) / (x−1)', '3(x − 1)/(x−1) = 3'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Mismo denominador: se restan los de arriba.', { n: 2 }, '$5x - (2x + 3)$'],
      ['El menos cambia el 2x y también el 3.', { n: 3 }, '$5x - 2x - 3$'],
      ['Queda 3x − 3, que es 3 por x − 1.', { n: 4 }, '$3(x - 1)$'],
      ['Se cancela y da 3, para x distinto de 1.', {}, '$3$'],
    ], 'Pon paréntesis al numerador que se resta.'),
    xpFila('$\\tfrac{7x + 2}{x + 4} - \\tfrac{3x - 5}{x + 4}$: arriba queda $\\square x + \\square$.', ['de x', 'número'], ['4', '7'], ['−3', '10', '3'], '2 menos −5.', '$4x + 7$.')],
    ['Multiplicar y dividir', xpMira('dibujo', 'Tercera idea: multiplicar es **de frente**; dividir, por la volteada.', { dib: (v, K) => P(K, v, ['x/6 ÷ x²/9', 'x/6 · 9/x²', '9x / 6x²', '3 / 2x'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Dividir entre una fracción es multiplicar por su recíproca.', { n: 2 }, '$\\tfrac{x}{6} \\cdot \\tfrac{9}{x^2}$'],
      ['De frente: arriba con arriba, abajo con abajo.', { n: 3 }, '$\\tfrac{9x}{6x^2}$'],
      ['Se cancelan 3 y x.', { n: 4 }, '$\\tfrac{3}{2x}$'],
      ['Mejor cancelar antes de multiplicar.', {}, '$\\tfrac{x}{6} \\cdot \\tfrac{9}{x \\cdot x}$'],
    ], 'Voltea la segunda y cancela antes de multiplicar.'),
    xpFila('$\\tfrac{x^2}{10} \\div \\tfrac{x}{15}$: pon el resultado simplificado.', ['arriba', 'abajo'], ['3x', '2'], ['x', '5', '150'], '$\\tfrac{x^2}{10} \\cdot \\tfrac{15}{x}$.', '$\\tfrac{3x}{2}$.')],
    ['Ahora sí, un problema', xpFila('Una bomba llena en x horas y otra en $x + 5$. Juntas, en una hora: $\\tfrac1x + \\tfrac{1}{x+5}$. Arriba queda $\\square x + \\square$.', ['de x', 'número'], ['2', '5'], ['1', '10', '6'], 'x + 5 más x.', '$\\tfrac{2x + 5}{x(x + 5)}$.')],
  ], 'Mismo tamaño para sumar; de frente para multiplicar.');

  // ---------------------------------------------------------------------------------------------------------- alg-101
  const dos = (v, K) => { const p = XM.plano(K, -1, 7, -1, 7, { H: 200 }); return p.s + XM.curva(K, p, x => v.m * x + v.b) + XM.curva(K, p, x => 6 - x, 'lf gr') + (v.px != null ? K.c(p.X(v.px), p.Y(v.py), 6, 'fA') : ''); };
  xpLec('alg-101', [
    ['Cumplir las dos', xpMira('dibujo', 'Empecemos por la idea: la solución es el punto que está **en las dos rectas**.', { dib: dos, v: { m: 1, b: 2, px: 5, py: 1 }, alto: 210 }, [
      ['La roja: los pares que suman 6.', {}, '$x + y = 6$'],
      ['El punto (5, 1) suma 6, pero no está en la otra.', {}, '$5 + 1 = 6$'],
      ['En el cruce se cumplen las dos.', { px: 2, py: 4 }, '$(2, 4)$'],
      ['Se comprueba en ambas ecuaciones.', {}, '$y = x + 2: \\ 4 = 2 + 2$'],
      ['Paralelas: ninguna. La misma recta: infinitas.', { m: -1, b: 3, px: null, py: null }, '$0 = 3 \\ \\text{no}$'],
    ], 'Una solución de un sistema cumple todas las ecuaciones.'),
    xpMueve('La roja es $x + y = 6$ y la otra, $y = x - 2$. Lleva el punto al cruce.', 300, { m: 1, b: -2, px: 1, py: 1 }, [xpRegla('px', 0, 6, 'x'), xpRegla('py', 0, 6, 'y')], { px: 4, py: 2 }, dos, '$4 + 2 = 6$ y $2 = 4 - 2$.', { lee: v => `$(${v.px}, ${v.py})$` })],
    ['Eliminar', xpMira('dibujo', 'Segunda idea: sumando las ecuaciones se **elimina** una letra.', { dib: (v, K) => P(K, v, ['3x + 2y = 16', '5x − 2y = 8', '8x = 24', 'x = 3,  y = 3.5'], 34, 34), v: { n: 2 }, alto: 160 }, [
      ['Los de y son opuestos: 2y y −2y.', {}, '$2y - 2y = 0$'],
      ['Se suman las dos ecuaciones.', { n: 3 }, '$8x = 24$'],
      ['x vale 3; se pone en cualquiera y sale y.', { n: 4 }, '$9 + 2y = 16$'],
      ['Si no son opuestos, se multiplica antes una ecuación entera.', {}, '$-2 \\cdot (\\ldots)$'],
    ], 'Haz opuestos los coeficientes de una letra y suma.'),
    xpFila('$2x + y = 11$ y $x - y = 1$. Pon 3x, x, y.', ['3x =', 'x', 'y'], ['12', '4', '3'], ['10', '5', '2'], 'Suma: la y se va.', '$3x = 12$; $4 - y = 1$.')],
    ['Sustituir', xpMira('dibujo', 'Tercera idea: si una letra ya está despejada, se **reemplaza** en la otra.', { dib: (v, K) => P(K, v, ['y = 2x − 1', '3x + y = 14', '3x + (2x − 1) = 14', 'x = 3,  y = 5'], 34, 34), v: { n: 2 }, alto: 160 }, [
      ['La primera dice cuánto vale y.', {}, '$y = 2x - 1$'],
      ['Se pone ese paquete en la segunda, con paréntesis.', { n: 3 }, '$3x + (2x - 1) = 14$'],
      ['Ahora hay una sola letra.', {}, '$5x = 15$'],
      ['x es 3 y, al volver, y es 5.', { n: 4 }, '$y = 2 \\cdot 3 - 1$'],
    ], 'Reemplaza el paquete completo y vuelve por la otra letra.'),
    xpFila('$x = y + 3$ y $2x + y = 18$. Pon 3y, y, x.', ['3y =', 'y', 'x'], ['12', '4', '7'], ['15', '5', '21'], '$2(y + 3) + y = 18$.', '$3y = 12$.')],
    ['Ahora sí, un problema', xpFila('3 jugos y 2 tortas valen 25 mil; 1 jugo y 2 tortas, 15 mil. Pon cada precio (miles).', ['jugo', 'torta'], ['5', '5'], ['10', '4', '7.5'], 'Resta las dos compras.', '2 jugos valen 10; luego $2t = 10$.')],
  ], 'El cruce: se halla eliminando o sustituyendo.');

  // ---------------------------------------------------------------------------------------------------------- alg-102
  const cor = (v, K) => { const p = XM.plano(K, -4, 4, -2, 10, { H: 200, gy: 2 }), d = Math.max(0, v.b + 1 / 4); return p.s + XM.curva(K, p, x => x * x) + XM.curva(K, p, x => x + v.b, 'lf gr') + (v.b > -0.25 ? [1, -1].map(s => { const x = 0.5 + s * Math.sqrt(d); return K.c(p.X(x), p.Y(x * x), 6, 'fA'); }).join('') : ''); };
  xpLec('alg-102', [
    ['Curvas que se cruzan', xpMira('dibujo', 'Empecemos por la idea: una recta y una parábola se cruzan **0, 1 o 2 veces**.', { dib: cor, v: { b: 2 }, alto: 210 }, [
      ['y = x² con y = x + 2: dos cruces.', {}, '$x^2 = x + 2$'],
      ['Se iguala y sale una cuadrática.', {}, '$x^2 - x - 2 = 0$'],
      ['x es 2 o −1: los puntos (2, 4) y (−1, 1).', {}, '$(x - 2)(x + 1) = 0$'],
      ['Si la recta baja, los cruces se juntan y desaparecen.', { b: -1.5 }, '$\\text{discriminante} < 0$'],
    ], 'Iguala, resuelve y vuelve por la otra coordenada.'),
    xpMueve('Sube la recta $y = x + b$ hasta que uno de los cruces sea el punto $(-2, 4)$.', 270, { b: 0 }, [xpRegla('b', -1, 6, 'b')], { b: 6 }, cor, '$4 = -2 + 6$; el otro cruce es $(3, 9)$.', { lee: v => `$y = x + ${v.b}$` })],
    ['Desarmar una fracción', xpMira('dibujo', 'Segunda idea: una fracción grande es **suma de fracciones simples**.', { dib: (v, K) => P(K, v, ['(5x + 1) / (x − 1)(x + 2)', 'A/(x − 1) + B/(x + 2)', '5x + 1 = A(x + 2) + B(x − 1)', 'x = 1: 6 = 3A → A = 2', 'x = −2: −9 = −3B → B = 3'], 28, 30, ''), v: { n: 1 }, alto: 170 }, [
      ['Dos factores abajo: dos fracciones simples.', { n: 2 }, '$\\tfrac{A}{x-1} + \\tfrac{B}{x+2}$'],
      ['Después se quitan denominadores.', { n: 3 }, '$5x + 1 = A(x+2) + B(x-1)$'],
      ['Con x = 1 se apaga B y queda A.', { n: 4 }, '$A = 2$'],
      ['Con x = −2 se apaga A y queda B.', { n: 5 }, '$B = 3$'],
      ['Al sumarlas vuelve la original.', {}, '$\\tfrac{2}{x-1} + \\tfrac{3}{x+2}$'],
    ], 'Escoge x que apague una letra y halla la otra.'),
    xpFila('$\\tfrac{7x - 2}{x(x - 1)} = \\tfrac{A}{x} + \\tfrac{B}{x - 1}$. Pon A y B.', ['A', 'B'], ['2', '5'], ['−2', '7', '3'], 'Con x = 0: −2 = −A. Con x = 1: 5 = B.', '$\\tfrac2x + \\tfrac{5}{x-1}$.')],
    ['Cuando se repite', xpMira('dibujo', 'Tercera idea: un factor **repetido** pide una fracción por cada potencia.', { dib: (v, K) => P(K, v, ['(3x + 1) / (x − 2)²', 'A/(x − 2) + B/(x − 2)²', '3x + 1 = A(x − 2) + B', 'x = 2: B = 7;  A = 3'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['El factor x − 2 está al cuadrado.', { n: 2 }, '$\\tfrac{A}{x-2} + \\tfrac{B}{(x-2)^2}$'],
      ['Después se quitan denominadores.', { n: 3 }, '$3x + 1 = A(x-2) + B$'],
      ['En 2 queda B: siete.', { n: 4 }, '$B = 7$'],
      ['Y comparando los de x, A es 3.', {}, '$A = 3$'],
      ['Un cuadrático que no se factoriza lleva Bx + C.', {}, '$\\tfrac{Bx + C}{x^2 + 1}$'],
    ], 'Repetido: una por potencia. Cuadrático irreducible: $Bx + C$.'),
    xpFila('$\\tfrac{4x + 9}{(x + 1)^2} = \\tfrac{A}{x+1} + \\tfrac{B}{(x+1)^2}$. Pon A y B.', ['A', 'B'], ['4', '5'], ['9', '13', '−4'], 'Los de x dan A; en x = −1 queda B.', '$4(x + 1) + 5$.')],
    ['Ahora sí, un problema', xpFila('Dos números suman 11 y sus cuadrados, 73. Ponlos, el menor primero.', ['menor', 'mayor'], ['3', '8'], ['5', '6', '4'], '$x^2 + (11 - x)^2 = 73$.', '$9 + 64 = 73$.')],
  ], 'Iguala para cruzar; apaga letras para desarmar.');

  // ---------------------------------------------------------------------------------------------------------- alg-71
  const ex = (v, K) => { const p = XM.plano(K, -4, 4, -1, 9, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => v.a * v.b ** x + v.k) + K.l(18, p.Y(v.k), 322, p.Y(v.k), 'lf d') + K.c(p.X(0), p.Y(v.a + v.k), 6, 'fA'); };
  xpLec('alg-71', [
    ['Multiplicar cada paso', xpMira('dibujo', 'Empecemos por la idea: en la exponencial cada paso **multiplica** por lo mismo.', { dib: ex, v: { a: 1, b: 2, k: 0 }, alto: 210 }, [
      ['Dos a la x: 1, 2, 4, 8… cada paso duplica.', {}, '$y = 2^x$'],
      ['Hacia la izquierda se parte a la mitad, sin llegar a 0.', {}, '$2^{-3} = \\tfrac18$'],
      ['En x = 0 siempre vale 1.', {}, '$b^0 = 1$'],
      ['Con base menor que 1, baja.', { b: 0.5 }, '$y = (\\tfrac12)^x$'],
      ['La base es positiva y distinta de 1.', {}, '$b > 0, \\ b \\neq 1$'],
    ], '$y = b^x$: crece si $b > 1$ y decrece si $0 < b < 1$.'),
    xpMueve('La curva $y = a \\cdot 2^x$ corta el eje y en **3**. Mueve a.', 270, { a: 1, b: 2, k: 0 }, [xpRegla('a', 1, 5, 'a')], { a: 3 }, ex, 'En 0 vale $a \\cdot 1 = 3$.', { lee: v => `$${v.a} \\cdot 2^0 = ${v.a}$` })],
    ['El piso', xpMira('dibujo', 'Segunda idea: la **asíntota** es el piso al que se acerca.', { dib: ex, v: { a: 1, b: 2, k: 0 }, alto: 210 }, [
      ['Sin sumar nada, el piso es 0.', {}, '$y = 0$'],
      ['Si se suma 3, todo sube: el piso también.', { k: 3 }, '$y = 2^x + 3$'],
      ['Un café se enfría hacia la temperatura del cuarto: ese es su piso.', { a: 5, b: 0.6, k: 2 }, '$y = 5 \\cdot 0.6^x + 2$'],
      ['Se acerca siempre y no lo cruza.', {}, '$y > 2$'],
    ], '$y = a \\cdot b^x + k$: asíntota $y = k$.'),
    xpMueve('Mueve k hasta que el piso sea **4** y mira por dónde corta el eje.', 270, { a: 1, b: 2, k: 0 }, [xpRegla('k', 0, 5, 'k')], { k: 4 }, ex, '$y = 2^x + 4$ corta en 5.', { lee: v => `$y = 2^x + ${v.k}$` })],
    ['El número e', xpMira('dibujo', 'Tercera idea: si el crecimiento se reparte en **muchos pedacitos**, aparece e.', { dib: (v, K) => [2, 2.25, 2.44, 2.61, 2.71].map((x, i) => K.f(v.n - i, K.r(30 + i * 58, 150 - x * 40, 46, x * 40, 'fa') + K.t(53 + i * 58, 142 - x * 40, x, 's') + K.t(53 + i * 58, 168, ['1', '2', '4', '12', '365'][i], 's tm'))).join(''), v: { n: 0 }, alto: 180 }, [
      ['Un peso al 100 % anual, pagado una vez: queda 2.', { n: 1 }, '$(1 + 1)^1$'],
      ['En dos mitades: 1.5 por 1.5.', { n: 2 }, '$(1 + \\tfrac12)^2 = 2.25$'],
      ['En doce meses sube a 2.61.', { n: 4 }, '$(1 + \\tfrac{1}{12})^{12}$'],
      ['Con 365 días, 2.71. Y ya casi no sube más.', { n: 5 }, '$e \\approx 2.718$'],
    ], '$(1 + \\tfrac1n)^n$ se acerca a $e \\approx 2.718$.'),
    xpFila('Pon los valores de $y = 3 \\cdot 2^x$.', ['x = 0', 'x = 2', 'x = −1'], ['3', '12', '1.5'], ['36', '0', '6'], 'Primero la potencia, luego por 3.', '$3$, $3 \\cdot 4$ y $3 \\div 2$.')],
    ['Ahora sí, un problema', xpFila('Un cultivo de 50 células se triplica cada día. Pon las que hay el día 1 y el día 3.', ['día 1', 'día 3'], ['150', '1350'], ['450', '600', '200'], '$50 \\cdot 3^x$.', '$50 \\cdot 27 = 1350$.')],
  ], 'Cada paso multiplica; k es el piso.');

  // ---------------------------------------------------------------------------------------------------------- alg-13b
  const ahorro = (v, K) => Array.from({ length: Math.round(v.n) + 1 }, (_, i) => { const s = 100 + v.r * i, c = 100 * (1 + v.r / 100) ** i, u = 0.5; return K.r(20 + i * 52, 170 - s * u, 20, s * u, 'fa') + K.f(v.c, K.r(42 + i * 52, 170 - c * u, 20, c * u, 'fg')); }).join('');
  xpLec('alg-13b', [
    ['Interés simple', xpMira('dibujo', 'Empecemos por la idea: en el **simple** se gana siempre sobre lo mismo.', { dib: ahorro, v: { n: 0, r: 20, c: 0 }, alto: 180 }, [
      ['Se guardan 100 al 20 % anual simple.', {}, '$C = 100$'],
      ['Cada año se ganan 20, siempre sobre los 100.', { n: 2 }, '$I = C \\cdot i \\cdot t$'],
      ['A los 5 años se han ganado 100.', { n: 5 }, '$100 \\cdot 0.2 \\cdot 5 = 100$'],
      ['Crece en línea recta, como una escalera.', {}, '$M = C(1 + it)$'],
    ], 'Simple: $M = C(1 + it)$.'),
    xpFila('300 mil al 4 % anual simple, 5 años. Pon lo que gana por año, en total y el monto (miles).', ['por año', 'en total', 'monto'], ['12', '60', '360'], ['20', '320', '1200'], 'El 4 % de 300.', '$12 \\cdot 5 = 60$.')],
    ['Interés compuesto', xpMira('dibujo', 'Segunda idea: en el **compuesto** también ganan los intereses.', { dib: ahorro, v: { n: 1, r: 20, c: 1 }, alto: 180 }, [
      ['El primer año son iguales.', {}, '$100 \\cdot 1.2 = 120$'],
      ['El segundo, el 20 % se toma de 120: ya gana más.', { n: 2 }, '$120 \\cdot 1.2 = 144$'],
      ['Cada año multiplica por 1.2.', { n: 5 }, '$100 \\cdot 1.2^5 \\approx 249$'],
      ['Crece como una exponencial.', {}, '$M = C(1 + i)^t$'],
    ], 'Compuesto: $M = C(1 + i)^t$.'),
    xpFila('500 mil al 10 % anual compuesto. Pon el monto tras 1 y tras 2 años (miles).', ['1 año', '2 años'], ['550', '605'], ['600', '510', '1000'], 'El segundo 10 % es de 550.', '$550 \\cdot 1.1 = 605$.')],
    ['La tasa del período', xpMira('dibujo', 'Tercera idea: si capitaliza cada mes, la tasa **se reparte** y los períodos se multiplican.', { dib: (v, K) => P(K, v, ['12 % anual, cada mes', '1 % por mes', '2 años = 24 meses', 'M = C · 1.01²⁴'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Nominal 12 % anual, capitaliza mensual.', {}, '$j = 12\\,\\%, \\ m = 12$'],
      ['Cada mes paga la doceava parte: 1 %.', { n: 2 }, '$\\tfrac{12\\,\\%}{12}$'],
      ['En dos años hay 24 períodos.', { n: 3 }, '$2 \\cdot 12 = 24$'],
      ['Y se multiplica 24 veces.', { n: 4 }, '$M = C(1 + \\tfrac{j}{m})^{mt}$'],
    ], 'Tasa por período y número de períodos.'),
    xpFila('8 % anual, capitaliza **trimestral**, 3 años. Pon la tasa del trimestre y los períodos.', ['tasa', 'períodos'], ['2 %', '12'], ['4 %', '3', '24 %'], 'Cuatro trimestres por año.', '$8 \\div 4$ y $4 \\cdot 3$.')],
    ['Ahora sí, un problema', xpFila('1000 (miles) al 10 % compuesto 2 años, o al 11 % simple 2 años. Pon los dos montos y el mejor.', ['compuesto', 'simple', 'mejor'], ['1210', '1220', 'simple'], ['compuesto', '1200', '1110'], '1000 · 1.21; 1000 + 220.', 'En solo dos años gana el simple.')],
  ], 'Simple suma; compuesto multiplica.');

  // ---------------------------------------------------------------------------------------------------------- alg-72
  const lg = (v, K) => { const p = XM.plano(K, -3, 9, -3, 4, { H: 200 }); return p.s + K.f(v.e, XM.curva(K, p, x => 2 ** x, 'lg gr') + XM.curva(K, p, x => x, 'lm d')) + XM.curva(K, p, x => (x > 0.02 ? Math.log2(x) : NaN)) + (v.x > 0 ? K.c(p.X(v.x), p.Y(Math.log2(v.x)), 6, 'fF') : ''); };
  xpLec('alg-72', [
    ['La pregunta del exponente', xpMira('dibujo', 'Empecemos por la idea: el logaritmo pregunta **¿a qué exponente?**', { dib: lg, v: { e: 0, x: 1 }, alto: 210 }, [
      ['¿A qué exponente va el 2 para dar 8? A 3.', { x: 8 }, '$\\log_2 8 = 3$'],
      ['Para dar 4, a 2. Para dar 1, a 0.', { x: 1 }, '$\\log_2 1 = 0$'],
      ['Para dar un medio, a −1.', { x: 0.5 }, '$\\log_2 \\tfrac12 = -1$'],
      ['De 0 o de negativos no hay: ninguna potencia de 2 los da.', {}, '$x > 0$'],
      ['Es el espejo de la exponencial.', { e: 1 }, '$\\log_b x = y \\Leftrightarrow b^y = x$'],
    ], '$\\log_b x = y$ significa $b^y = x$, con $x > 0$.'),
    xpFila('Pon cada logaritmo.', ['log₃ 81', 'log₅ 1/25', 'log₁₀ 1000'], ['4', '−2', '3'], ['27', '2', '100'], '¿A qué exponente?', '$3^4$, $5^{-2}$ y $10^3$.')],
    ['Cuentas con exponentes', xpMira('dibujo', 'Segunda idea: los logaritmos **suman** donde había producto.', { dib: (v, K) => XM.barra(K, 30, [[2, 'log₂ 4 = 2', 'fa'], [3, 'log₂ 8 = 3', 'fg']], { T: 6 }) + K.f(v.n, XM.barra(K, 80, [[5, 'log₂ 32 = 5', 'ff']], { T: 6 })) + K.t(170, 140, v.p, 'ta'), v: { n: 0, p: '' }, alto: 160 }, [
      ['4 por 8 es 32. Sus exponentes: 2 y 3.', {}, '$4 \\cdot 8 = 2^2 \\cdot 2^3$'],
      ['El del producto es la suma: 5.', { n: 1 }, '$\\log (xy) = \\log x + \\log y$'],
      ['El del cociente, la resta.', { p: 'log x/y = log x − log y' }, '$\\log \\tfrac{x}{y}$'],
      ['Y el exponente baja a multiplicar.', { p: 'log xⁿ = n log x' }, '$\\log x^n = n \\log x$'],
      ['La suma no se reparte.', {}, '$\\log(x + y) \\neq \\log x + \\log y$'],
    ], 'Producto: suma. Cociente: resta. Potencia: multiplica.'),
    xpFila('Si $\\log 2 = a$ y $\\log 3 = b$, pon cada uno.', ['log 6', 'log 8', 'log 3/2'], ['a + b', '3a', 'b − a'], ['ab', 'a³', 'a − b'], '6 = 2 · 3; 8 = 2³.', 'Suma, múltiplo y resta.')],
    ['Cambiar de base', xpMira('dibujo', 'Tercera idea: con una sola base se calculan **todas**.', { dib: (v, K) => P(K, v, ['y = log₈ 32', '8ʸ = 32', '2³ʸ = 2⁵', 'y = 5/3'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['¿8 a la qué da 32? No es entero.', { n: 2 }, '$8^y = 32$'],
      ['Los dos son potencias de 2.', { n: 3 }, '$2^{3y} = 2^5$'],
      ['La respuesta es cinco tercios.', { n: 4 }, '$y = \\tfrac53$'],
      ['Es un cociente de logaritmos en base 2.', {}, '$\\log_8 32 = \\tfrac{\\log_2 32}{\\log_2 8}$'],
    ], '$\\log_b x = \\tfrac{\\log_c x}{\\log_c b}$.'),
    xpFila('$\\log_{9} 27$ en base 3: pon arriba, abajo y el resultado.', ['log₃ 27', 'log₃ 9', 'resultado'], ['3', '2', '3/2'], ['2/3', '9', '1/3'], '¿A qué exponente va el 3?', '$\\tfrac32$.')],
    ['Ahora sí, un problema', xpFila('En una escala, $L = \\log_{10} I$. Pon L para $I = 10^4$ y cuántas veces crece I si L sube 2.', ['L', 'veces'], ['4', '100'], ['40', '2', '20'], 'Cada unidad de L es por 10.', '$10^2 = 100$ veces.')],
  ], 'El logaritmo es un exponente: por eso suma.');

  // ---------------------------------------------------------------------------------------------------------- alg-73
  xpLec('alg-73', [
    ['La misma base', xpMira('dibujo', 'Empecemos por la idea: con la misma base, los **exponentes** son iguales.', { dib: (v, K) => P(K, v, ['4ˣ⁺¹ = 32', '2²ˣ⁺² = 2⁵', '2x + 2 = 5', 'x = 1.5'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['4 y 32 son potencias de 2.', {}, '$4 = 2^2, \\ 32 = 2^5$'],
      ['Se escriben en esa base.', { n: 2 }, '$2^{2(x+1)} = 2^5$'],
      ['Base igual: exponentes iguales.', { n: 3 }, '$2x + 2 = 5$'],
      ['Y se despeja la x.', { n: 4 }, '$x = \\tfrac32$'],
    ], 'Misma base: iguala exponentes.'),
    xpFila('$9^{x} = 27$: pon el exponente de 3 a cada lado y x.', ['izquierda', 'derecha', 'x'], ['2x', '3', '3/2'], ['x²', '9', '3'], '9 es 3² y 27 es 3³.', '$2x = 3$.')],
    ['Bajar con logaritmo', xpMira('dibujo', 'Segunda idea: si no hay base común, el **logaritmo baja** el exponente.', { dib: (v, K) => P(K, v, ['3ˣ = 20', 'x · log 3 = log 20', 'x = log 20 / log 3', 'x ≈ 2.73'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['20 no es potencia de 3: está entre 9 y 27.', {}, '$2 < x < 3$'],
      ['Logaritmo a los dos lados.', { n: 2 }, '$x \\log 3 = \\log 20$'],
      ['Se divide: es un cociente de logaritmos.', { n: 3 }, '$x = \\tfrac{\\log 20}{\\log 3}$'],
      ['No es el logaritmo del cociente.', { n: 4 }, '$\\tfrac{\\log 20}{\\log 3} \\neq \\log\\tfrac{20}{3}$'],
    ], '$b^x = c \\Rightarrow x = \\tfrac{\\log c}{\\log b}$.'),
    xpFila('$5^x = 60$: ¿entre qué enteros está x? Ponlos.', ['más que', 'menos que'], ['2', '3'], ['12', '4', '1'], '$5^2 = 25$ y $5^3 = 125$.', '$25 < 60 < 125$.')],
    ['Ecuaciones con logaritmo', xpMira('dibujo', 'Tercera idea: se **junta en un solo logaritmo** y se sube al exponente; luego se revisa.', { dib: (v, K) => P(K, v, ['log₂ x + log₂ (x − 2) = 3', 'log₂ x(x − 2) = 3', 'x² − 2x = 8', 'x = 4  (−2 no sirve)'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Suma de logaritmos: producto adentro.', { n: 2 }, '$\\log_2 x(x - 2) = 3$'],
      ['Se sube: 2 al cubo.', { n: 3 }, '$x(x - 2) = 2^3$'],
      ['De ahí salen 4 y −2.', {}, '$(x - 4)(x + 2) = 0$'],
      ['El −2 no sirve: no hay logaritmo de un negativo.', { n: 4 }, '$x > 2$'],
    ], 'Junta, sube y descarta lo que no exista.'),
    xpFila('$\\log_3 (x + 6) = 2$: pon a cuánto es igual $x + 6$ y x.', ['x + 6 =', 'x'], ['9', '3'], ['6', '8', '0'], '3 al cuadrado.', '$x = 9 - 6$.')],
    ['Ahora sí, un problema', xpFila('Un medicamento se reduce a la mitad cada 6 horas. De 80 mg, ¿cuántas mitades hasta 10 mg y cuántas horas?', ['mitades', 'horas'], ['3', '18'], ['8', '6', '24'], '80, 40, 20, 10.', '$80 \\cdot (\\tfrac12)^3 = 10$.')],
  ], 'Misma base, bajar con logaritmo o subir al exponente.');
}
;
//#archivo js/explora-alg-mundos-6-8.js
// Álgebra · mundos 6 (Álgebra de Polinomios), 7 (Parábolas y Complejos) y 8 (Raíces de Polinomios), Explora. Ejemplos propios.
{
  const P = XM.pasos;
  // Baldosas algebraicas: a cuadrados x², b barras x y c unidades.
  const tiles = (K, a, b, c, x = 24, y = 24) => Array.from({ length: Math.round(a) }, (_, i) => K.r(x + i * 60, y, 54, 54, 'fa') + K.t(x + 27 + i * 60, y + 32, 'x²', 's')).join('')
    + Array.from({ length: Math.round(b) }, (_, i) => K.r(x + i * 22, y + 64, 18, 54, 'fg') + K.t(x + 9 + i * 22, y + 96, 'x', 's')).join('') + Array.from({ length: Math.round(c) }, (_, i) => K.r(x + i * 22, y + 128, 18, 18, 'ff')).join('');
  // ---------------------------------------------------------------------------------------------------------- alg-23a
  xpLec('alg-23a', [
    ['Piezas semejantes', xpMira('dibujo', 'Empecemos por la idea: solo se juntan las piezas **de la misma forma**.', { dib: (v, K) => tiles(K, v.a, v.b, v.c), v: { a: 2, b: 3, c: 1 }, alto: 180 }, [
      ['Dos cuadrados de lado x, tres barras y una unidad.', {}, '$2x^2 + 3x + 1$'],
      ['Llegan una barra y cuatro unidades.', { b: 4, c: 5 }, '$+\\ (x + 4)$'],
      ['Las barras se suman con barras; las unidades con unidades.', {}, '$2x^2 + 4x + 5$'],
      ['El cuadrado no se junta con la barra: son formas distintas.', {}, '$x^2 + x \\neq x^3$'],
      ['El **grado** es el mayor exponente: aquí, 2.', {}, '$\\text{grado } 2$'],
    ], 'Términos semejantes: la misma letra con el mismo exponente.'),
    xpMueve('Arma $(x^2 + 2x + 3) + (x^2 + 4x)$: mueve las piezas.', 300, { a: 1, b: 2, c: 3 }, [xpRegla('a', 0, 4, 'cuadrados'), xpRegla('b', 0, 8, 'barras')], { a: 2, b: 6 }, (v, K) => tiles(K, v.a, v.b, v.c), '$2x^2 + 6x + 3$.', { lee: v => `$${v.a}x^2 + ${v.b}x + 3$` })],
    ['Restar cambia todo', xpMira('dibujo', 'Segunda idea: el menos entra a **todos** los términos.', { dib: (v, K) => P(K, v, ['(5x² + 2x) − (3x² − 4x + 1)', '5x² + 2x − 3x² + 4x − 1', '2x² + 6x − 1'], 44, 38, ''), v: { n: 1 }, alto: 150 }, [
      ['Se quita un paréntesis entero.', {}, '$-(3x^2 - 4x + 1)$'],
      ['Cada signo de adentro cambia.', { n: 2 }, '$-3x^2 + 4x - 1$'],
      ['Se juntan los semejantes.', { n: 3 }, '$2x^2 + 6x - 1$'],
      ['El error común: cambiar solo el primero.', {}, '$-3x^2 - 4x + 1 \\ \\text{no}$'],
    ], 'Restar un polinomio es sumar su opuesto.'),
    xpFila('$(4x^2 - x + 6) - (x^2 - 3x + 2)$: pon los coeficientes.', ['x²', 'x', 'número'], ['3', '2', '4'], ['5', '−4', '8'], '$-x + 3x$ y $6 - 2$.', '$3x^2 + 2x + 4$.')],
    ['Multiplicar es llenar', xpMira('dibujo', 'Tercera idea: un producto es **un rectángulo**: cada término con cada término.', { dib: (v, K) => { const c = [['x²', '5x'], ['2x', '10']]; return c.map((f, i) => f.map((t, j) => K.f(v.n - (i * 2 + j), K.r(80 + (j ? 110 : 0), 40 + (i ? 80 : 0), j ? 70 : 110, i ? 44 : 80, ['fa', 'fg', 'fg', 'ff'][i * 2 + j]) + K.t(80 + (j ? 145 : 55), 46 + (i ? 100 : 40), t, 'b'))).join('')).join('') + K.t(135, 30, 'x', 's') + K.t(225, 30, '5', 's') + K.t(66, 84, 'x', 's') + K.t(66, 146, '2', 's'); }, v: { n: 0 }, alto: 180 }, [
      ['Un rectángulo de lados x + 5 y x + 2.', {}, '$(x + 5)(x + 2)$'],
      ['La primera parte es x por x.', { n: 1 }, '$x^2$'],
      ['x por 5 y 2 por x: son barras.', { n: 3 }, '$5x + 2x = 7x$'],
      ['Y 2 por 5, las unidades.', { n: 4 }, '$x^2 + 7x + 10$'],
      ['Los grados se suman: 1 más 1, grado 2.', {}, '$1 + 1 = 2$'],
    ], 'Multiplicar: todos con todos; el grado se suma.'),
    xpFila('$(x + 3)(x + 6)$: pon el coeficiente de x y el número.', ['de x', 'número'], ['9', '18'], ['3', '6', '36'], 'Dos barras: 6x y 3x.', '$x^2 + 9x + 18$.')],
    ['Ahora sí, un problema', xpFila('Un patio mide $x + 4$ por $x + 7$. Pon los coeficientes de su área.', ['x²', 'x', 'número'], ['1', '11', '28'], ['4', '7', '12'], 'Llena el rectángulo en cuatro partes.', '$x^2 + 11x + 28$.')],
  ], 'Se juntan semejantes; restar cambia todo; multiplicar llena un rectángulo.');

  // ---------------------------------------------------------------------------------------------------------- alg-3
  const cuadAB = (v, K) => { const a = v.a * 18, b = v.b * 18, g = 8 * v.s; return K.r(70, 14, a, a, 'fa') + K.r(70 + a + g, 14, b, a, 'fg') + K.r(70, 14 + a + g, a, b, 'fg') + K.r(70 + a + g, 14 + a + g, b, b, 'ff') + K.t(70 + a / 2, 18 + a / 2, 'a²', 'b') + K.t(70 + a + g + b / 2, 18 + a / 2, 'ab', 's') + K.t(70 + a / 2, 20 + a + g + b / 2, 'ab', 's') + K.t(70 + a + g + b / 2, 20 + a + g + b / 2, 'b²', 's'); };
  xpLec('alg-3', [
    ['El cuadrado de una suma', xpMira('dibujo', 'Empecemos por la idea: el cuadrado de una suma tiene **cuatro pedazos**.', { dib: cuadAB, v: { a: 5, b: 3, s: 0 }, alto: 190 }, [
      ['Un cuadrado de lado a más b.', {}, '$(a + b)^2$'],
      ['Se corta: un cuadrado a², uno b²…', { s: 1 }, '$a^2 + b^2$'],
      ['…y dos rectángulos iguales, ab.', { s: 2 }, '$2ab$'],
      ['Olvidar los rectángulos es el error más común.', {}, '$(a + b)^2 = a^2 + 2ab + b^2$'],
      ['Con resta, los rectángulos se quitan.', {}, '$(a - b)^2 = a^2 - 2ab + b^2$'],
    ], '$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$.'),
    xpFila('$(x + 9)^2$: pon el término de x y el número.', ['de x', 'número'], ['18', '81'], ['9', '36', '99'], 'Dos rectángulos de 9 por x.', '$x^2 + 18x + 81$.')],
    ['La diferencia de cuadrados', xpMira('dibujo', 'Segunda idea: suma por diferencia **cancela** lo de en medio.', { dib: (v, K) => { const A = 100, B = 40; return K.p([[40, 20], [40 + A, 20], [40 + A, 20 + A - B], [40 + A - B, 20 + A - B], [40 + A - B, 20 + A], [40, 20 + A]], 'fa') + K.r(40 + A - B, 20 + A - B, B, B, 'fc') + K.t(90, 62, 'a² − b²', 'b') + K.f(v.m, K.r(200, 16, 60, 140, 'fg') + K.t(230, 174, 'a − b', 's') + K.t(288, 90, 'a + b', 's', 'start')); }, v: { m: 0 }, alto: 180 }, [
      ['Un cuadrado de lado a, al que se le quita uno de lado b.', {}, '$a^2 - b^2$'],
      ['Se corta la L y se arma un rectángulo.', { m: 1 }, '$(a - b)(a + b)$'],
      ['Sus lados son a menos b y a más b.', {}, '$(a + b)(a - b) = a^2 - b^2$'],
      ['Sirve para cuentas: 103 por 97.', {}, '$100^2 - 3^2 = 9\\,991$'],
    ], '$(a + b)(a - b) = a^2 - b^2$.'),
    xpFila('$52 \\cdot 48$ como $(50 + 2)(50 - 2)$: pon los cuadrados y el resultado.', ['50²', '2²', 'resultado'], ['2500', '4', '2496'], ['2504', '100', '2400'], 'Resta los cuadrados.', '$2500 - 4$.')],
    ['El cubo', xpMira('dibujo', 'Tercera idea: el cubo de una suma tiene **ocho piezas** de cuatro clases.', { dib: (v, K) => P(K, v, ['(a + b)³', 'a³ : 1 cubo', '3a²b : 3 losas', '3ab² : 3 barras', 'b³ : 1 cubito'], 28, 30), v: { n: 1 }, alto: 170 }, [
      ['Un cubo de arista a más b se corta en ocho.', {}, '$(a + b)^3$'],
      ['Primero, el cubo grande, de arista a.', { n: 2 }, '$a^3$'],
      ['Tres losas de a por a por b.', { n: 3 }, '$3a^2b$'],
      ['Tres barras de a por b por b, y el cubito.', { n: 5 }, '$3ab^2$'],
      ['En orden: uno, tres, tres, uno.', {}, '$a^3 + 3a^2b + 3ab^2 + b^3$'],
    ], '$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.'),
    xpFila('$(x + 4)^3$: pon los coeficientes que siguen a $x^3$.', ['x²', 'x', 'número'], ['12', '48', '64'], ['4', '16', '24'], '3 · 4, 3 · 16 y 4 al cubo.', '$x^3 + 12x^2 + 48x + 64$.')],
    ['Ahora sí, un problema', xpFila('Un lote cuadrado pasa de lado x a lado x + 8. ¿Cuánto creció su área? Pon los coeficientes de lo que se agregó.', ['de x', 'número'], ['16', '64'], ['8', '32', '24'], '$(x + 8)^2 - x^2$.', 'Dos franjas de 8x y la esquina de 64.')],
  ], 'Los productos notables son áreas y volúmenes cortados.');

  // ---------------------------------------------------------------------------------------------------------- alg-24c
  const pascal = (v, K) => { let h = ''; for (let i = 0; i < Math.round(v.f); i++) { let c = 1; for (let j = 0; j <= i; j++) { h += K.c(170 + (j - i / 2) * 44, 24 + i * 32, 14, 'fa') + K.t(170 + (j - i / 2) * 44, 29 + i * 32, c, 's'); c = c * (i - j) / (j + 1); } } return h; };
  xpLec('alg-24c', [
    ['El triángulo', xpMira('dibujo', 'Empecemos por la idea: cada número es la **suma de los dos de arriba**.', { dib: pascal, v: { f: 1 }, alto: 205 }, [
      ['Arriba, en la punta, hay un 1.', { f: 1 }, '$(a + b)^0 = 1$'],
      ['Abajo, 1 y 1; luego 1, 2, 1.', { f: 3 }, '$(a + b)^2$'],
      ['1, 3, 3, 1: son los del cubo.', { f: 4 }, '$(a + b)^3$'],
      ['El 6 sale de 3 más 3.', { f: 5 }, '$1, 4, 6, 4, 1$'],
      ['Cada fila da los coeficientes de una potencia.', { f: 6 }, '$(a + b)^5$'],
    ], 'La fila n da los coeficientes de $(a + b)^n$.'),
    xpFila('La fila 5 es 1, 5, 10, 10, 5, 1. Pon los cuatro primeros de la fila 6.', ['1.º', '2.º', '3.º', '4.º'], ['1', '6', '15', '20'], ['10', '11', '5'], 'Suma vecinos: 1 + 5, 5 + 10, 10 + 10.', '1, 6, 15, 20.')],
    ['Por qué salen esos números', xpMira('dibujo', 'Segunda idea: cuentan **de cuántas maneras** se escogen los paréntesis.', { dib: (v, K) => [0, 1, 2, 3].map(i => K.r(24 + i * 76, 40, 66, 44, 'fc', 8) + K.t(57 + i * 76, 68, i < 2 ? `a + ${v.q > 0.5 ? 'b ✓' : 'b'}` : 'a + b', 's')).join('') + K.t(170, 126, v.p, 'b ta'), v: { q: 0, p: '' }, alto: 150 }, [
      ['Cuatro paréntesis iguales. De cada uno sale a o b.', {}, '$(a + b)^4$'],
      ['Para tener a²b² se escoge b en dos de los cuatro.', { q: 1, p: 'a²b²' }, '$\\binom42$'],
      ['Hay 6 maneras de escoger dos de cuatro.', { p: '6 a²b²' }, '$\\binom42 = \\tfrac{4 \\cdot 3}{2} = 6$'],
      ['Por eso el coeficiente es 6.', {}, '$6a^2b^2$'],
    ], 'El coeficiente de $a^{n-k}b^k$ es $\\binom{n}{k}$.'),
    xpFila('Pon cada combinación.', ['C(5, 2)', 'C(7, 1)', 'C(6, 3)'], ['10', '7', '20'], ['18', '30', '6'], '5·4/2; siete; 6·5·4/6.', '10, 7 y 20.')],
    ['Un término suelto', xpMira('dibujo', 'Tercera idea: no hace falta abrir todo para hallar **un término**.', { dib: (v, K) => P(K, v, ['(x + 2)⁵, término con x³', 'b aparece 2 veces', 'C(5, 2) · x³ · 2²', '10 · 4x³ = 40x³'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Queremos el de x al cubo.', {}, '$(x + 2)^5$'],
      ['Los exponentes suman 5: el 2 va dos veces.', { n: 2 }, '$3 + 2 = 5$'],
      ['Las maneras por los factores.', { n: 3 }, '$\\binom52 x^3 \\cdot 2^2$'],
      ['El coeficiente es 40, no 10: el 2 también cuenta.', { n: 4 }, '$40x^3$'],
    ], 'Término: $\\binom{n}{k}a^{n-k}b^k$; no olvides la potencia de b.'),
    xpFila('En $(x + 3)^4$, el término con $x^2$: pon las maneras, $3^2$ y el coeficiente.', ['maneras', '3²', 'coeficiente'], ['6', '9', '54'], ['4', '12', '36'], 'Dos de cuatro; y el 3 va dos veces.', '$6 \\cdot 9 = 54$.')],
    ['Ahora sí, un problema', xpFila('De 8 bailarines se eligen 2 para abrir el show. ¿Cuántas parejas hay? ¿Y si se eligen 6?', ['2 de 8', '6 de 8'], ['28', '28'], ['56', '16', '48'], 'Elegir 6 es dejar 2 por fuera.', '$\\binom82 = \\binom86 = 28$.')],
  ], 'Pascal cuenta maneras de escoger: esos son los coeficientes.');

  // ---------------------------------------------------------------------------------------------------------- alg-24b
  const rectF = (v, K) => { const p = Math.round(v.p), q = Math.round(v.q), u = 18, X = 80; return K.r(60, 30, X, X, 'fa') + K.t(100, 74, 'x²', 'b') + Array.from({ length: p }, (_, i) => K.r(60 + X + i * u, 30, u, X, 'fg')).join('') + Array.from({ length: q }, (_, i) => K.r(60, 30 + X + i * u, X, u, 'fg')).join('') + XM.reja(K, 60 + X, 30 + X, p, q, u, 'ff'); };
  xpLec('alg-24b', [
    ['Factor común', xpMira('dibujo', 'Empecemos por la idea: factorizar es hallar **los lados** del área.', { dib: (v, K) => K.r(40, 40, 120, 60, 'fa') + K.t(100, 76, '6x²', 'b') + K.r(160 + v.s * 20, 40, 80, 60, 'fg') + K.t(200 + v.s * 20, 76, '4x', 'b') + K.f(1 - v.s, K.t(26, 76, '2x', 's') + K.t(140, 126, '3x + 2', 'b ta')), v: { s: 1 }, alto: 140 }, [
      ['Dos áreas: 6x² y 4x.', {}, '$6x^2 + 4x$'],
      ['Comparten una altura: 2x es el mayor factor de las dos.', { s: 0 }, '$2x$'],
      ['Los largos son 3x y 2.', {}, '$6x^2 + 4x = 2x(3x + 2)$'],
      ['Se comprueba multiplicando de vuelta.', {}, '$2x \\cdot 3x + 2x \\cdot 2$'],
    ], 'Saca el mayor factor que tienen todos.'),
    xpFila('$15x^3 - 10x^2 = \\square(\\square x - \\square)$: pon las piezas.', ['afuera', 'de x', 'número'], ['5x²', '3', '2'], ['5x', '10', '15'], '¿Qué divide a los dos, en número y en x?', '$5x^2(3x - 2)$.')],
    ['Trinomio', xpMira('dibujo', 'Segunda idea: dos números que **sumen** las barras y **multipliquen** las unidades.', { dib: rectF, v: { p: 1, q: 5 }, alto: 220 }, [
      ['x² + 6x + 8. Con 1 y 5 barras salen cinco unidades: no.', {}, '$1 \\cdot 5 = 5$'],
      ['Con 2 y 4: ocho unidades. Cierra justo.', { p: 4, q: 2 }, '$4 \\cdot 2 = 8$'],
      ['Los lados son x + 4 y x + 2.', {}, '$(x + 4)(x + 2)$'],
      ['Suman 6 y multiplican 8.', {}, '$x^2 + 6x + 8$'],
      ['Con unidades negativas, los signos son distintos.', {}, '$x^2 + x - 6 = (x + 3)(x - 2)$'],
    ], '$x^2 + sx + m$: busca dos que sumen s y multipliquen m.'),
    xpMueve('Factoriza $x^2 + 8x + 15$: reparte las 8 barras hasta tener 15 unidades (la mayor al lado).', 300, { p: 1, q: 1 }, [xpRegla('p', 1, 7, 'barras al lado'), xpRegla('q', 1, 5, 'barras abajo')], { p: 5, q: 3 }, rectF, '$(x + 5)(x + 3)$.', { lee: v => `$x^2 + ${v.p + v.q}x + ${v.p * v.q}$` })],
    ['Reconocer patrones', xpMira('dibujo', 'Tercera idea: antes de buscar, mira si es un **notable** o si se puede **agrupar**.', { dib: (v, K) => P(K, v, ['x² − 49 = (x + 7)(x − 7)', 'x² − 14x + 49 = (x − 7)²', 'x³ + 2x² + 5x + 10', '= x²(x + 2) + 5(x + 2)', '= (x + 2)(x² + 5)'], 28, 30), v: { n: 0 }, alto: 170 }, [
      ['Dos cuadrados que se restan.', { n: 1 }, '$a^2 - b^2$'],
      ['Dos cuadrados y el doble producto: cuadrado perfecto.', { n: 2 }, '$(a - b)^2$'],
      ['Cuatro términos: de a dos.', { n: 4 }, '$x^2(x + 2) + 5(x + 2)$'],
      ['El paréntesis repetido sale.', { n: 5 }, '$(x + 2)(x^2 + 5)$'],
    ], 'Primero factor común; luego notables; luego trinomio o agrupar.'),
    xpFila('Pon cada factorización.', ['x² − 64', 'x² + 10x + 25'], ['(x+8)(x−8)', '(x+5)²'], ['(x−8)²', '(x+5)(x−5)'], '¿Hay término con x? ¿Es el doble producto?', 'Diferencia de cuadrados y cuadrado perfecto.')],
    ['Ahora sí, un problema', xpMueve('El área de un salón es $x^2 + 9x + 14$. Halla sus lados repartiendo las 9 barras.', 300, { p: 1, q: 1 }, [xpRegla('p', 1, 8, 'barras al lado'), xpRegla('q', 1, 5, 'barras abajo')], { p: 7, q: 2 }, rectF, '$(x + 7)(x + 2)$.', { lee: v => `$x^2 + ${v.p + v.q}x + ${v.p * v.q}$` })],
  ], 'Factorizar: del área a los lados.');

  // ---------------------------------------------------------------------------------------------------------- alg-23c
  const plano = (v, K) => { const p = XM.plano(K, -8.7, 8.7, -5, 5, { H: 190 }); return p.s + K.ar(p.X(0), p.Y(0), p.X(v.a), p.Y(v.b), 'la gr') + (v.c != null ? K.f(v.k ?? 1, K.ar(p.X(0), p.Y(0), p.X(v.c), p.Y(v.d), 'lf gr')) : '') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('alg-23c', [
    ['Un número que gira', xpMira('dibujo', 'Empecemos por la idea: multiplicar por **i** es girar un cuarto de vuelta.', { dib: plano, v: { a: 3, b: 0, p: '3' }, alto: 200 }, [
      ['El 3, sobre el eje real.', {}, '$3 = 3 + 0i$'],
      ['Por i: gira 90 grados y queda en 3i.', { a: 0, b: 3, p: '3i' }, '$3 \\cdot i = 3i$'],
      ['Otra vez por i: llega a −3.', { a: -3, b: 0, p: '−3' }, '$3i^2 = -3$'],
      ['Por eso i al cuadrado es −1.', {}, '$i^2 = -1$'],
      ['Un giro más, −3i; con el cuarto giro vuelve al 3.', { a: 0, b: -3, p: '−3i' }, '$i^3 = -i, \\ i^4 = 1$'],
    ], '$i^2 = -1$; las potencias de i se repiten de cuatro en cuatro.'),
    xpFila('Pon cada potencia.', ['i⁶', 'i¹¹', 'i²⁰'], ['−1', '−i', '1'], ['i', '0'], 'Mira el residuo entre 4: 2, 3 y 0.', '$i^2$, $i^3$ e $i^0$.')],
    ['Sumar y multiplicar', xpMira('dibujo', 'Segunda idea: se suma **por partes** y se multiplica **como binomios**.', { dib: (v, K) => P(K, v, ['(2 + 3i) + (4 − i) = 6 + 2i', '(2 + 3i)(4 − i)', '8 − 2i + 12i − 3i²', '8 + 10i + 3 = 11 + 10i'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Real con real e imaginaria con imaginaria.', {}, '$6 + 2i$'],
      ['El producto: todos con todos.', { n: 3 }, '$8 - 2i + 12i - 3i^2$'],
      ['Como i² es −1, el último se vuelve +3.', { n: 4 }, '$-3i^2 = 3$'],
      ['Por último se juntan las partes.', {}, '$11 + 10i$'],
    ], 'Multiplica normal y cambia $i^2$ por $-1$.'),
    xpFila('$(1 + 2i)(3 + i)$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['1', '7'], ['3', '5', '2'], '$3 + i + 6i + 2i^2$.', '$1 + 7i$.')],
    ['Conjugado y tamaño', xpMira('dibujo', 'Tercera idea: el **conjugado** es el reflejo; el **módulo**, el largo.', { dib: plano, v: { a: 4, b: 3, c: 4, d: 3, k: 0, p: '4 + 3i' }, alto: 200 }, [
      ['Aquí está el número 4 + 3i.', {}, '$z = 4 + 3i$'],
      ['Su reflejo sobre el eje real es el conjugado.', { d: -3, k: 1 }, '$\\bar z = 4 - 3i$'],
      ['El largo sale por Pitágoras.', {}, '$|z| = \\sqrt{16 + 9} = 5$'],
      ['Un número por su conjugado da el largo al cuadrado: real.', {}, '$z\\bar z = 25$'],
      ['Con eso se divide: se multiplica por el conjugado de abajo.', {}, '$\\tfrac1z = \\tfrac{\\bar z}{25}$'],
    ], '$z\\bar z = |z|^2$: así se quita i del denominador.'),
    xpFila('$z = 5 - 12i$. Pon la parte imaginaria del conjugado, $|z|^2$ y $|z|$.', ['imag.', '|z|²', '|z|'], ['12', '169', '13'], ['−12', '17', '119'], 'Refleja; luego 25 más 144.', '$\\bar z = 5 + 12i$ y $|z| = 13$.')],
    ['Ahora sí, un problema', xpMueve('Un dron mira hacia $2 + 4i$. Lo multiplican por i (gira 90°). Lleva la flecha roja a donde apunta.', 290, { a: 2, b: 4, c: 2, d: 4 }, [xpRegla('c', -5, 5, 'real'), xpRegla('d', -5, 5, 'imaginaria')], { c: -4, d: 2 }, plano, '$i(2 + 4i) = 2i + 4i^2 = -4 + 2i$.', { lee: v => `$${v.c} ${v.d < 0 ? '-' : '+'} ${Math.abs(v.d)}i$` })],
  ], 'Los complejos viven en un plano; i gira un cuarto de vuelta.');

  // ---------------------------------------------------------------------------------------------------------- alg-1
  const bal = (v, K) => K.l(40, 130, 300, 130, 'gr') + K.p([[170, 130], [150, 165], [190, 165]], 'fk') + XM.bolas(K, 60, 112, v.x, 'fa', 30, 13) + XM.bolas(K, 60, 84, v.u, 'fg', 20, 8) + XM.bolas(K, 200, 112, v.y, 'fa', 30, 13) + XM.bolas(K, 200, 84, Math.min(6, v.w), 'fg', 20, 8) + XM.bolas(K, 200, 62, Math.max(0, v.w - 6), 'fg', 20, 8) + K.t(170, 30, v.p, 'b ta');
  xpLec('alg-1', [
    ['La balanza', xpMira('dibujo', 'Empecemos por la idea: una ecuación es una **balanza en equilibrio**.', { dib: bal, v: { x: 3, u: 2, y: 1, w: 8, p: '3x + 2 = x + 8' }, alto: 175 }, [
      ['Tres cajas iguales y 2 bolitas pesan como una caja y 8 bolitas.', {}, '$3x + 2 = x + 8$'],
      ['Quitamos una caja de cada lado: sigue en equilibrio.', { x: 2, y: 0, p: '2x + 2 = 8' }, '$2x + 2 = 8$'],
      ['Quitamos 2 bolitas de cada lado.', { u: 0, w: 6, p: '2x = 6' }, '$2x = 6$'],
      ['Repartimos: cada caja pesa tres bolitas.', { x: 1, w: 3, p: 'x = 3' }, '$x = 3$'],
    ], 'Lo que se hace a un lado se hace al otro.'),
    xpFila('$5x + 4 = 2x + 19$: pon lo que queda en cada paso.', ['3x =', 'x ='], ['15', '5'], ['23', '7', '3'], 'Quita 2x de cada lado y después 4.', '$3x = 15$, $x = 5$.')],
    ['Paréntesis y fracciones', xpMira('dibujo', 'Segunda idea: primero se abren paréntesis y se **quitan denominadores**.', { dib: (v, K) => P(K, v, ['x/2 + x/3 = 10', '3x + 2x = 60', '5x = 60', 'x = 12'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Medios y tercios: el común es 6.', {}, '$\\text{mcm}(2, 3) = 6$'],
      ['Todo por 6, los dos lados completos.', { n: 2 }, '$3x + 2x = 60$'],
      ['Después se juntan las x.', { n: 3 }, '$5x = 60$'],
      ['Y se reparte: 12.', { n: 4 }, '$x = 12$'],
    ], 'Multiplica todos los términos por el mcm.'),
    xpFila('$\\tfrac{x}{4} + \\tfrac{x}{6} = 5$: pon el mcm, las x juntas y x.', ['mcm', '? · x = 60', 'x'], ['12', '5', '12'], ['24', '10', '6'], '3x más 2x.', '$5x = 60$.')],
    ['Una, ninguna o todas', xpMira('dibujo', 'Tercera idea: dos rectas se cruzan **una vez, nunca o siempre**.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -4, 6, { H: 180 }); return p.s + XM.curva(K, p, x => x + 1, 'la gr') + XM.curva(K, p, x => v.m * x + v.b, 'lf gr d'); }, v: { m: -1, b: 3 }, alto: 190 }, [
      ['Cada lado es una recta. Se cruzan en un punto: una solución.', {}, '$x + 1 = -x + 3$'],
      ['Paralelas: nunca se encuentran. Ninguna solución.', { m: 1, b: 4 }, '$x + 1 = x + 4$'],
      ['La misma recta: todos los números sirven.', { m: 1, b: 1 }, '$x + 1 = x + 1$'],
      ['Al despejar sale algo falso o algo siempre cierto.', {}, '$1 = 4 \\ \\text{o} \\ 1 = 1$'],
    ], 'Falso: ninguna. Siempre cierto: todas.'),
    xpFila('Pon cuántas soluciones tiene cada una.', ['2x + 3 = 2x', '4x = x + 9', '2(x+1) = 2x+2'], ['ninguna', 'una', 'todas'], ['dos'], 'Quita las x iguales y mira lo que queda.', 'Queda 3 = 0; 3x = 9; y 2 = 2.')],
    ['Ahora sí, un problema', xpFila('Tres cuerdas miden 96 m: la segunda es el doble de la primera y la tercera, 6 m más que la segunda. Halla las tres.', ['1.ª', '2.ª', '3.ª'], ['18', '36', '42'], ['24', '30', '32'], '$x + 2x + (2x + 6) = 96$.', '$5x = 90$, $x = 18$.')],
  ], 'Equilibrio: lo mismo a los dos lados hasta dejar sola la x.');

  // ---------------------------------------------------------------------------------------------------------- alg-4a
  const par = (v, K) => { const p = XM.plano(K, -6, 6, -5, 7, { H: 200 }); return p.s + XM.curva(K, p, x => v.a * (x - v.h) ** 2 + v.k) + K.c(p.X(v.h), p.Y(v.k), 6, 'fF') + K.l(p.X(v.h), 8, p.X(v.h), 192, 'lf d'); };
  xpLec('alg-4a', [
    ['Mover la parábola', xpMira('dibujo', 'Empecemos por la idea: toda parábola es **x² movida y estirada**.', { dib: par, v: { a: 1, h: 0, k: 0 }, alto: 210 }, [
      ['La más simple: vértice en el origen.', {}, '$y = x^2$'],
      ['Sube o baja con k.', { k: -3 }, '$y = x^2 - 3$'],
      ['Se corre con h: hacia el 2, aunque se escriba menos 2.', { h: 2 }, '$y = (x - 2)^2 - 3$'],
      ['Con a negativa se voltea.', { a: -0.5, k: 4 }, '$y = -\\tfrac12(x - 2)^2 + 4$'],
      ['El vértice siempre es (h, k) y el eje, x = h.', {}, '$V = (h, k)$'],
    ], '$y = a(x - h)^2 + k$: vértice $(h, k)$.'),
    xpMueve('Lleva el vértice a $(-3, 2)$ con a = 1.', 300, { a: 1, h: 0, k: 0 }, [xpRegla('h', -4, 4, 'h'), xpRegla('k', -4, 4, 'k')], { h: -3, k: 2 }, par, '$y = (x + 3)^2 + 2$.', { lee: v => `$y = (x ${v.h < 0 ? '+' : '-'} ${Math.abs(v.h)})^2 ${v.k < 0 ? '-' : '+'} ${Math.abs(v.k)}$` })],
    ['Completar el cuadrado', xpMira('dibujo', 'Segunda idea: de la forma general se llega al vértice **completando el cuadrado**.', { dib: (v, K) => { const u = 20; return K.r(60, 20, 80, 80, 'fa') + K.t(100, 64, 'x²', 'b') + [0, 1, 2].map(i => K.r(140 + i * u, 20, u, 80, 'fg') + K.r(60, 100 + i * u, 80, u, 'fg')).join('') + K.f(v.c, XM.reja(K, 140, 100, 3, 3, u, 'ff')); }, v: { c: 0 }, alto: 180 }, [
      ['x² + 6x: un cuadrado y seis barras, tres por lado.', {}, '$x^2 + 6x$'],
      ['Falta la esquina: 3 por 3.', { c: 1 }, '$+\\ 9$'],
      ['Con ella es un cuadrado de lado x + 3.', {}, '$x^2 + 6x + 9 = (x + 3)^2$'],
      ['Si se agregó 9, hay que quitarlo.', {}, '$x^2 + 6x + 5 = (x + 3)^2 - 4$'],
      ['El atajo: el vértice está en menos b sobre dos a.', {}, '$h = -\\tfrac{b}{2a}$'],
    ], 'La mitad de b, al cuadrado, completa; y $h = -\\tfrac{b}{2a}$.'),
    xpFila('$y = x^2 - 8x + 10$: pon h y k.', ['h', 'k'], ['4', '−6'], ['−4', '10', '26'], 'La mitad de 8; y evalúa ahí: 16 − 32 + 10.', '$(x - 4)^2 - 6$.')],
    ['Máximo o mínimo', xpMira('dibujo', 'Tercera idea: el vértice es el punto **más alto o más bajo**.', { dib: (v, K) => { const p = XM.plano(K, 0, 10, 0, 30, { H: 190, gy: 5 }); return p.s + XM.curva(K, p, x => x * (10 - x)) + K.c(p.X(v.x), p.Y(v.x * (10 - v.x)), 6, 'fA') + K.l(p.X(v.x), p.Y(0), p.X(v.x), p.Y(v.x * (10 - v.x)), 'la'); }, v: { x: 1 }, alto: 200 }, [
      ['Con 20 m de malla se cercan rectángulos: lados x y 10 − x.', {}, '$A = x(10 - x)$'],
      ['Con x = 1, área 9.', {}, '$1 \\cdot 9$'],
      ['Con 3, área 21.', { x: 3 }, '$3 \\cdot 7$'],
      ['En la mitad, la mayor: un cuadrado de 25.', { x: 5 }, '$5 \\cdot 5 = 25$'],
      ['Después baja igual: es simétrica.', { x: 8 }, '$8 \\cdot 2 = 16$'],
    ], 'Si a < 0, el vértice es el máximo; si a > 0, el mínimo.'),
    xpMueve('La ganancia es $x(8 - x)$. Lleva el punto a la ganancia **máxima**.', 260, { x: 1 }, [xpRegla('x', 0, 8, 'x')], { x: 4 }, (v, K) => { const p = XM.plano(K, 0, 8, 0, 18, { H: 190, gy: 3 }); return p.s + XM.curva(K, p, x => x * (8 - x)) + K.c(p.X(v.x), p.Y(v.x * (8 - v.x)), 6, 'fA'); }, 'En la mitad de 0 y 8.', { lee: v => `$${v.x} \\cdot ${8 - v.x} = ${v.x * (8 - v.x)}$` })],
    ['Ahora sí, un problema', xpFila('Una pelota va a altura $h = -5t^2 + 20t$. ¿En qué segundo llega más alto y a cuántos metros?', ['segundo', 'altura'], ['2', '20'], ['4', '10', '40'], '$t = -\\tfrac{20}{2(-5)}$.', '$-5 \\cdot 4 + 40 = 20$ m.')],
  ], 'Vértice y eje: con ellos se dibuja y se optimiza.');

  // ---------------------------------------------------------------------------------------------------------- alg-4
  const rz = (v, K) => { const p = XM.plano(K, -5, 5, -6, 8, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => (x - v.r) * (x - v.s)) + K.c(p.X(v.r), p.Y(0), 6, 'fA') + K.c(p.X(v.s), p.Y(0), 6, 'fA'); };
  const ck = (v, K) => { const p = XM.plano(K, -5, 5, -6, 8, { H: 200, gy: 2 }), d = 4 - v.c; return p.s + XM.curva(K, p, x => x * x - 4 + v.c) + (d > -0.01 ? [1, -1].map(s => K.c(p.X(s * Math.sqrt(Math.max(0, d))), p.Y(0), 6, 'fA')).join('') : ''); };
  xpLec('alg-4', [
    ['Donde toca el piso', xpMira('dibujo', 'Empecemos por la idea: resolver es hallar **dónde corta el eje x**.', { dib: rz, v: { r: -1, s: 3 }, alto: 210 }, [
      ['Esta parábola corta en −1 y en 3.', {}, '$x = -1, \\ x = 3$'],
      ['Sus factores dicen lo mismo.', {}, '$(x + 1)(x - 3) = 0$'],
      ['Un producto da 0 si algún factor es 0.', {}, '$x + 1 = 0 \\ \\text{o} \\ x - 3 = 0$'],
      ['Abierto: x² − 2x − 3 = 0.', {}, '$x^2 - 2x - 3 = 0$'],
    ], 'Factoriza e iguala cada factor a 0.'),
    xpMueve('Mueve los cortes a las soluciones de $x^2 - x - 6 = 0$ (la menor primero).', 300, { r: -1, s: 1 }, [xpRegla('r', -4, 0, 'menor'), xpRegla('s', 0, 4, 'mayor')], { r: -2, s: 3 }, rz, '$(x + 2)(x - 3)$.', { lee: v => `$x^2 ${-(v.r + v.s) < 0 ? '-' : '+'} ${Math.abs(v.r + v.s)}x ${v.r * v.s < 0 ? '-' : '+'} ${Math.abs(v.r * v.s)}$` })],
    ['Cuántas hay', xpMira('dibujo', 'Segunda idea: el **discriminante** cuenta los cortes.', { dib: ck, v: { c: 0 }, alto: 210 }, [
      ['x² − 4: corta dos veces.', {}, '$b^2 - 4ac = 16 > 0$'],
      ['Si sube, los cortes se acercan.', { c: 3 }, '$b^2 - 4ac = 4$'],
      ['Al tocar apenas, es una sola solución.', { c: 4 }, '$b^2 - 4ac = 0$'],
      ['Más arriba ya no toca: no hay reales.', { c: 6 }, '$b^2 - 4ac < 0$'],
    ], '$b^2 - 4ac$: positivo, dos; cero, una; negativo, ninguna real.'),
    xpMueve('Sube la parábola $x^2 - 4 + c$ hasta que tenga **una sola** solución.', 270, { c: 0 }, [xpRegla('c', 0, 8, 'c')], { c: 4 }, ck, 'Queda $x^2 = 0$.', { lee: v => `$b^2 - 4ac = ${16 - 4 * v.c}$` })],
    ['La fórmula', xpMira('dibujo', 'Tercera idea: completar el cuadrado **una vez para siempre** da la fórmula.', { dib: (v, K) => P(K, v, ['x² + 6x + 2 = 0', '(x + 3)² = 7', 'x + 3 = ±√7', 'x = −3 ± √7'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['No hay dos enteros que multipliquen 2 y sumen 6.', {}, '$x^2 + 6x + 2 = 0$'],
      ['Entonces se completa el cuadrado.', { n: 2 }, '$x^2 + 6x + 9 = 7$'],
      ['Dos raíces: con más y con menos.', { n: 3 }, '$\\pm\\sqrt7$'],
      ['Y se despeja la x.', { n: 4 }, '$x = -3 \\pm \\sqrt7$'],
      ['Con letras sale la fórmula general.', {}, '$x = \\tfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'],
    ], '$x = \\tfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.'),
    xpFila('$2x^2 - 7x + 3 = 0$: pon el discriminante y las raíces de menor a mayor.', ['b² − 4ac', 'menor', 'mayor'], ['25', '1/2', '3'], ['73', '−3', '2'], '$49 - 24$; y $\\tfrac{7 \\pm 5}{4}$.', '$x = \\tfrac12$ y $x = 3$.')],
    ['Ahora sí, un problema', xpFila('Un huerto mide 3 m más de largo que de ancho y tiene 40 m². Halla ancho y largo.', ['ancho', 'largo'], ['5', '8'], ['−8', '10', '4'], '$x(x + 3) = 40$; una raíz no sirve de medida.', '$(x - 5)(x + 8) = 0$.')],
  ], 'Las raíces son los cortes: factor, cuadrado o fórmula.');

  // ---------------------------------------------------------------------------------------------------------- alg-23b
  xpLec('alg-23b', [
    ['Repartir polinomios', xpMira('dibujo', 'Empecemos por la idea: dividir polinomios es **repartir** y mirar qué sobra.', { dib: (v, K) => P(K, v, ['x² + 5x + 8 entre x + 2', 'x · (x + 2) = x² + 2x', 'queda 3x + 8', '3 · (x + 2) = 3x + 6', 'sobra 2'], 28, 30), v: { n: 1 }, alto: 170 }, [
      ['¿Por cuánto va la x para dar x²? Por x.', { n: 2 }, '$x^2 \\div x = x$'],
      ['Se quita y queda 3x + 8.', { n: 3 }, '$5x - 2x = 3x$'],
      ['Ahora toca por 3.', { n: 4 }, '$3x \\div x = 3$'],
      ['Sobra 2, de grado menor que el divisor: se acaba.', { n: 5 }, '$r = 2$'],
      ['Como en los números: divisor por cociente más residuo.', {}, '$x^2 + 5x + 8 = (x + 2)(x + 3) + 2$'],
    ], 'Dividendo = divisor · cociente + residuo.'),
    xpFila('$x^2 + 7x + 15$ entre $x + 4$: pon el número del cociente $x + \\square$ y el residuo.', ['x + ?', 'residuo'], ['3', '3'], ['7', '11', '15'], '7x − 4x = 3x; y 15 − 12.', '$(x + 4)(x + 3) + 3$.')],
    ['El grado manda', xpMira('dibujo', 'Segunda idea: los **grados se restan** y el residuo es más pequeño que el divisor.', { dib: (v, K) => XM.barra(K, 30, [[v.d, 'divisor', 'fa'], [v.q, 'cociente', 'fg']], { T: 6 }) + XM.barra(K, 80, [[v.r, 'residuo', 'ff']], { T: 6 }) + K.t(170, 140, v.p, 'ta'), v: { d: 2, q: 3, r: 1, p: '' }, alto: 160 }, [
      ['Grado 5 entre grado 2.', {}, '$5 \\text{ entre } 2$'],
      ['El cociente tiene grado 3.', { p: '5 − 2 = 3' }, '$5 - 2 = 3$'],
      ['El residuo, menos de 2: a lo sumo grado 1.', {}, '$\\text{grado } r < 2$'],
      ['Si el dividendo es menor, el cociente es 0.', {}, '$x + 1 = (x^2)\\cdot 0 + (x + 1)$'],
    ], 'Grado del cociente = resta; residuo con menos grado que el divisor.'),
    xpFila('Grado 7 entre grado 3. Pon el grado del cociente y el mayor posible del residuo.', ['cociente', 'residuo'], ['4', '2'], ['10', '3', '7'], 'Resta; y el residuo queda por debajo del divisor.', '$7 - 3 = 4$; menos de 3.')],
    ['Polinomios iguales', xpMira('dibujo', 'Tercera idea: dos polinomios son iguales si lo son **coeficiente a coeficiente**.', { dib: (v, K) => P(K, v, ['ax² + bx + 6 = 3x² − 5x + c', 'a = 3', 'b = −5', 'c = 6'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Estos dos valen lo mismo para toda x.', {}, '$\\text{para toda } x$'],
      ['Entonces los de x² coinciden.', { n: 2 }, '$a = 3$'],
      ['Los de la x también.', { n: 3 }, '$b = -5$'],
      ['Y también los números sueltos.', { n: 4 }, '$c = 6$'],
    ], 'Iguales para toda x: los mismos coeficientes.'),
    xpFila('$(x + 2)(x + k) = x^2 + 9x + m$. Pon k y m.', ['k', 'm'], ['7', '14'], ['9', '11', '18'], 'Compara los de x: 2 + k = 9.', '$k = 7$ y $m = 2 \\cdot 7$.')],
    ['Ahora sí, un problema', xpFila('Un rectángulo tiene área $x^2 + 10x + 21$ y un lado $x + 3$. El otro es $x + \\square$. Pon el número y el residuo.', ['x + ?', 'residuo'], ['7', '0'], ['10', '3', '21'], 'Reparte el área entre el lado.', '$(x + 3)(x + 7)$, exacto.')],
  ], 'Dividir es repartir: divisor por cociente más residuo.');

  // ---------------------------------------------------------------------------------------------------------- alg-92
  const cub = (v, K, f) => { const p = XM.plano(K, -4, 4, -12, 12, { H: 200, gy: 4 }); return p.s + XM.curva(K, p, f) + K.c(p.X(v.x), p.Y(f(v.x)), 6, 'fF') + K.l(p.X(v.x), p.Y(0), p.X(v.x), p.Y(f(v.x)), 'lf'); };
  const F92 = x => x ** 3 - 2 * x * x - 5 * x + 6, G92 = x => x ** 3 - 7 * x + 6;
  const sint = (v, K, a, r, b, s) => a.map((t, i) => K.t(110 + i * 60, 40, t, 'b') + K.f(v.n - i, i ? K.t(110 + i * 60, 76, b[i], 'b tg') : '') + K.f(v.n - i, K.t(110 + i * 60, 124, s[i], 'b ta'))).join('') + K.t(44, 40, r, 'b tf') + K.l(80, 92, 320, 92) + K.l(70, 20, 70, 92);
  xpLec('alg-92', [
    ['El residuo sin dividir', xpMira('dibujo', 'Empecemos por la idea: el residuo entre x − c es **el valor en c**.', { dib: (v, K) => cub(v, K, F92), v: { x: -1 }, alto: 210 }, [
      ['P(x) = x³ − 2x² − 5x + 6. ¿Cuánto vale en −1?', {}, '$P(-1) = 8$'],
      ['Al dividir entre x + 1 sobra justo eso: 8.', {}, '$P(x) = (x + 1)Q(x) + 8$'],
      ['En 1 vale 0: no sobra nada.', { x: 1 }, '$P(1) = 0$'],
      ['Entonces x − 1 es un **factor**.', {}, '$P(x) = (x - 1)Q(x)$'],
      ['Y también lo es x − 3.', { x: 3 }, '$P(3) = 0$'],
    ], 'Residuo entre $x - c$: $P(c)$. Si es 0, $x - c$ es factor.'),
    xpMueve('$P(x) = x^3 - 7x + 6$. Mueve el punto a la raíz **negativa**.', 270, { x: 0 }, [xpRegla('x', -3, 3, 'x')], { x: -3 }, (v, K) => cub(v, K, G92), '$P(-3) = -27 + 21 + 6 = 0$.', { lee: v => `$P(${v.x}) = ${G92(v.x)}$` })],
    ['La división corta', xpMira('dibujo', 'Segunda idea: la **sintética** baja, multiplica y suma.', { dib: (v, K) => sint(v, K, [1, -4, 1, 6], 2, ['', 2, -4, -6], [1, -2, -3, 0]), v: { n: 0 }, alto: 140 }, [
      ['x³ − 4x² + x + 6 entre x − 2. Se escriben los coeficientes y el 2.', {}, '$c = 2$'],
      ['Primero baja el 1.', { n: 1 }, '$1$'],
      ['Por 2 y se suma: −4 + 2 = −2.', { n: 2 }, '$-2$'],
      ['Otra vez: por 2 y se suma.', { n: 3 }, '$1 + (-4) = -3$'],
      ['El último es el residuo: 0.', { n: 4 }, '$x^2 - 2x - 3$'],
    ], 'Si falta una potencia, se pone 0. El último es el residuo.'),
    xpFila('$x^3 + 2x^2 - 5x - 6$ entre $x - 2$ (coeficientes 1, 2, −5, −6). Completa la fila de abajo.', ['baja', '2.º', '3.º', 'residuo'], ['1', '4', '3', '0'], ['2', '−6', '−3'], 'Baja 1; 2 + 2; −5 + 8; −6 + 6.', '$x^2 + 4x + 3$, exacto.')],
    ['Hallar un coeficiente', xpMira('dibujo', 'Tercera idea: si x − c es factor, **P(c) = 0** da una ecuación.', { dib: (v, K) => P(K, v, ['P(x) = x³ + kx − 10', 'x − 2 es factor: P(2) = 0', '8 + 2k − 10 = 0', 'k = 1'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Falta la k, pero se sabe que x − 2 es factor.', { n: 2 }, '$P(2) = 0$'],
      ['Se cambia la x por 2.', { n: 3 }, '$8 + 2k - 10 = 0$'],
      ['Se despeja: k vale 1.', { n: 4 }, '$k = 1$'],
      ['Si el divisor es x + 3, se usa −3.', {}, '$x + 3 = x - (-3)$'],
    ], 'Factor $x - c$: pon c e iguala a 0.'),
    xpFila('$x + 1$ es factor de $x^3 + kx^2 + 4$. Pon $(-1)^3 + 4$ y k.', ['sin k', 'k'], ['3', '−3'], ['5', '−5', '1'], 'Se usa −1: −1 + k + 4 = 0.', '$k = -3$.')],
    ['Ahora sí, un problema', xpFila('Una caja tiene volumen $x^3 + 6x^2 + 11x + 6$ y altura $x + 1$. La base es $x^2 + \\square x + \\square$.', ['de x', 'número'], ['5', '6'], ['7', '4', '11'], 'Sintética con −1: 1, 6 − 1, 11 − 5.', '$x^2 + 5x + 6$.')],
  ], 'P(c) es el residuo: si da 0, hay factor.');

  // ---------------------------------------------------------------------------------------------------------- alg-93
  const cruz = (v, K) => { const p = XM.plano(K, -4, 4, -8, 8, { H: 200, gy: 2 }); return p.s + XM.curva(K, p, x => v.k * (x + 2) * (x - 1) ** 2 * 0.8 * (1 - v.z) + v.z * (x + 2) * (x - 1) * (x - 3) * 0.5); };
  xpLec('alg-93', [
    ['Cruzar o rebotar', xpMira('dibujo', 'Empecemos por la idea: la **multiplicidad** dice cómo toca el eje.', { dib: cruz, v: { k: 1, z: 1 }, alto: 210 }, [
      ['Tres raíces distintas: cruza tres veces.', {}, '$(x + 2)(x - 1)(x - 3)$'],
      ['Si una se repite dos veces…', { z: 0 }, '$(x + 2)(x - 1)^2$'],
      ['…en esa la curva rebota: no cambia de signo.', {}, '$(x - 1)^2 \\ge 0$'],
      ['Multiplicidad impar cruza; par rebota.', {}, '$\\text{par: rebota}$'],
      ['El grado cuenta las raíces con sus repeticiones.', {}, '$1 + 2 = 3$'],
    ], 'Impar cruza, par rebota; las multiplicidades suman el grado.'),
    xpFila('$(x - 4)^3(x + 1)^2 x$: pon el grado y qué hace en cada raíz.', ['grado', 'en 4', 'en −1'], ['6', 'cruza', 'rebota'], ['5', 'nada'], 'Suma 3, 2 y 1. Mira si es par.', 'Grado 6; cruza en 4 y rebota en −1.')],
    ['Candidatos', xpMira('dibujo', 'Segunda idea: las raíces enteras **dividen** al término suelto.', { dib: (v, K) => { const p = XM.plano(K, -4, 4, -12, 12, { H: 200, gy: 4 }), f = x => x ** 3 - x * x - 4 * x + 4; return p.s + XM.curva(K, p, f) + [-2, 1, 2].map((r, i) => K.f(v.n - i, K.c(p.X(r), p.Y(0), 6, 'fF'))).join(''); }, v: { n: 0 }, alto: 210 }, [
      ['x³ − x² − 4x + 4: el término suelto es 4.', {}, '$\\pm1, \\pm2, \\pm4$'],
      ['Se prueban los divisores: −2 da cero.', { n: 1 }, '$P(-2) = 0$'],
      ['El número 1 también.', { n: 2 }, '$P(1) = 0$'],
      ['Y el 2. Son tres: no hay más.', { n: 3 }, '$(x + 2)(x - 1)(x - 2)$'],
      ['Si hay coeficiente principal, también fracciones.', {}, '$\\tfrac{\\text{divisor de } a_0}{\\text{divisor de } a_n}$'],
    ], 'Raíz racional: divisor del último sobre divisor del primero.'),
    xpFila('En $2x^2 + \\cdots + 3$ los candidatos positivos son 1, 3 y dos fracciones. Ponlas, la menor primero.', ['menor', 'mayor'], ['1/2', '3/2'], ['2/3', '1/3', '2'], 'Arriba, divisores de 3; abajo, de 2.', '$\\tfrac12$ y $\\tfrac32$.')],
    ['Completar las raíces', xpMira('dibujo', 'Tercera idea: hallada una raíz, se **baja de grado**.', { dib: (v, K) => P(K, v, ['x³ − 4x² + 6x − 4 = 0', 'x = 2 es raíz', '(x − 2)(x² − 2x + 2)', 'x = 1 ± i'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Se prueba el 2: da cero.', { n: 2 }, '$8 - 16 + 12 - 4 = 0$'],
      ['Con la sintética queda una cuadrática.', { n: 3 }, '$x^2 - 2x + 2$'],
      ['Su discriminante es negativo: raíces complejas.', { n: 4 }, '$4 - 8 = -4$'],
      ['Con coeficientes reales, van en pareja con su conjugada.', {}, '$1 + i, \\ 1 - i$'],
      ['Grado 3: tres raíces contando las complejas.', {}, '$1 + 2 = 3$'],
    ], 'Grado n: n raíces complejas; las no reales vienen en parejas.'),
    xpFila('Un cúbico real tiene raíces 5 y $3 + 2i$. Pon la otra y el producto de las dos complejas.', ['la otra', 'producto'], ['3 − 2i', '13'], ['−3 − 2i', '5', '−5'], 'La conjugada; y 9 + 4.', '$(3 + 2i)(3 - 2i) = 13$.')],
    ['Ahora sí, un problema', xpFila('Un puente sigue $y = x^3 - 6x^2 + 11x - 6$. Cruza el nivel 0 en tres enteros: ponlos en orden.', ['1.º', '2.º', '3.º'], ['1', '2', '3'], ['6', '−1', '4'], 'Prueba los divisores de 6.', '$(x - 1)(x - 2)(x - 3)$.')],
  ], 'Candidatos, sintética y bajar de grado hasta tener todas.');
}
;
//#archivo js/explora-alg-mundos-3-5.js
// Álgebra · mundos 3 (Escalas y Proporciones), 4 (Exponentes y Radicales) y 5 (Sucesiones y Series), Explora. Ejemplos propios.
{
  // ---------------------------------------------------------------------------------------------------------- alg-12
  const dosB = (v, K) => XM.bolas(K, 40, 50, v.a, 'fa', 24, 10) + XM.bolas(K, 40, 90, v.b, 'fg', 24, 10) + (v.p ? K.t(170, 136, v.p, 'b ta') : '');
  const parte = (v, K) => XM.barra(K, 50, [...Array.from({ length: Math.round(v.a) }, () => [1, '', 'fa']), ...Array.from({ length: Math.round(v.b) }, () => [1, '', 'fg'])], { h: 44 }) + K.t(170, 34, `${Math.round(v.a)} : ${Math.round(v.b)}`, 'b ta');
  xpLec('alg-12', [
    ['Comparar dividiendo', xpMira('dibujo', 'Empecemos por la idea: una **razón** compara dividiendo.', { dib: dosB, v: { a: 8, b: 4, p: '' }, alto: 150 }, [
      ['Un arroz con 8 tazas de agua y 4 de arroz.', {}],
      ['Restando, hay 4 más de agua. Dividiendo, hay el doble.', { p: '8 : 4' }, '$\\tfrac84 = 2$'],
      ['Con 4 de agua y 2 de arroz sabe igual: la razón es la misma.', { a: 4, b: 2, p: '4 : 2 = 2 : 1' }, '$\\tfrac42 = 2$'],
      ['La resta cambió; la razón, no.', {}, '$8 : 4 = 4 : 2$'],
      ['El orden importa: agua a arroz no es arroz a agua.', { p: '2 : 1 ≠ 1 : 2' }, '$2 : 1 \\neq 1 : 2$'],
    ], 'La razón de a a b es $\\tfrac{a}{b}$; se conserva al agrandar las dos partes por igual.'),
    xpMueve('Con **9** tazas de agua, pon el arroz para conservar la razón 3 : 1.', 220, { a: 9, b: 1, p: '' }, [xpRegla('b', 1, 8, 'tazas de arroz')], { b: 3 }, dosB, '$9 : 3 = 3 : 1$.', { lee: v => `$9 : ${v.b}$` })],
    ['Parte y todo', xpMira('dibujo', 'Segunda idea: de una razón salen las **fracciones del todo**.', { dib: parte, v: { a: 2, b: 3 }, alto: 120 }, [
      ['Una pintura lleva 2 partes de rojo por 3 de blanco.', {}, '$2 : 3$'],
      ['Son 5 partes en total.', {}, '$2 + 3 = 5$'],
      ['El rojo es dos quintos del total, no dos tercios.', {}, '$\\tfrac25$'],
      ['Dos tercios compara rojo con blanco.', {}, '$\\tfrac23$'],
    ], 'Si la razón es a : b, la primera parte es $\\tfrac{a}{a+b}$ del todo.'),
    xpFila('La razón de gatos a perros es 3 : 5 y hay 40 animales. Completa.', ['una parte', 'gatos', 'perros'], ['5', '15', '25'], ['8', '24', '16'], 'Son ocho partes iguales.', '$40 \\div 8 = 5$: $15$ gatos y $25$ perros.')],
    ['Por cada uno', xpMira('dibujo', 'Tercera idea: la **tasa** dice cuánto por cada uno.', { dib: (v, K) => XM.barra(K, 50, Array.from({ length: Math.round(v.k) }, () => [1, v.t, 'fa']), { h: 44, T: 4 }) + K.t(170, 34, v.p, 'b ta'), v: { k: 4, t: '', p: '240 km en 4 h' }, alto: 120 }, [
      ['Un tren hace 240 km en 4 horas.', {}, '$\\tfrac{240}{4}$'],
      ['Se reparte en cuatro horas iguales: 60 por hora.', { t: '60' }, '$60 \\ \\tfrac{\\text{km}}{\\text{h}}$'],
      ['En una hora, 60.', { k: 1, p: '60 km en 1 h' }, '$60$'],
      ['En tres horas, tres veces eso.', { k: 3, p: '180 km en 3 h' }, '$3 \\cdot 60 = 180$'],
    ], 'La tasa por unidad permite comparar y calcular cualquier cantidad.'),
    xpFila('A: 6 libras por 24 mil. B: 4 libras por 18 mil. Pon el precio por libra (en miles) y la más barata.', ['A', 'B', 'barata'], ['4', '4.5', 'tienda A'], ['tienda B', '6'], 'Divide pesos entre libras en cada una.', '$24 \\div 6 = 4$ y $18 \\div 4 = 4.5$.')],
    ['Ahora sí, un problema', xpFila('Una mezcla lleva 3 partes de té por 1 de miel. Para 20 vasos, ¿cuántos de cada una?', ['té', 'miel'], ['15', '5'], ['60', '10', '4'], 'Son cuatro partes: ¿de cuántos vasos cada una?', '$20 \\div 4 = 5$: 15 y 5.')],
  ], 'Razón: comparar dividiendo. Se conserva al escalar y reparte el todo.');

  // ---------------------------------------------------------------------------------------------------------- alg-12e
  const rayo = (v, K) => { const P = XM.plano(K, 0, 6, 0, 12, { H: 170, gy: 2 }); return P.s + XM.curva(K, P, x => v.k * x) + K.c(P.X(v.x), P.Y(v.k * v.x), 6, 'fA') + K.t(P.X(v.x) - 10, P.Y(v.k * v.x) - 8, `(${K.sig(v.x)}, ${K.sig(v.k * v.x)})`, 's', 'end'); };
  const hip = (v, K) => { const P = XM.plano(K, 0, 12, 0, 12, { H: 190, g: 2 }); const y = 24 / v.x; return P.s + XM.curva(K, P, x => 24 / x) + `<rect class="xf fa" x="${P.X(0)}" y="${P.Y(y)}" width="${P.X(v.x) - P.X(0)}" height="${P.Y(0) - P.Y(y)}"/>` + K.c(P.X(v.x), P.Y(y), 6, 'fA') + K.t(Math.min(P.X(v.x) + 8, 236), Math.max(18, P.Y(y) - 8), `${K.sig(v.x)} · ${K.sig(y)} = 24`, 's', 'start'); };
  xpLec('alg-12e', [
    ['Dos razones iguales', xpMira('dibujo', 'Empecemos por la idea: una **proporción** son dos razones iguales.', { dib: (v, K) => XM.pasos(K, v, ['4/6 = 10/15', '4 · 15 = 6 · 10', '60 = 60'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Cuatro sextos y diez quinceavos: las dos valen dos tercios.', {}, '$\\tfrac46 = \\tfrac{10}{15}$'],
      ['En cruz: 4 por 15 y 6 por 10.', { n: 2 }, '$4 \\cdot 15 = 6 \\cdot 10$'],
      ['Dan lo mismo. Siempre pasa si las razones son iguales.', { n: 3 }, '$60 = 60$'],
      ['Con eso se halla el que falte.', {}, '$\\tfrac{a}{b} = \\tfrac{c}{d} \\Leftrightarrow ad = bc$'],
    ], '$\\tfrac{a}{b} = \\tfrac{c}{d}$ cuando $ad = bc$.'),
    xpFila('Completa: $\\tfrac{6}{9} = \\tfrac{14}{x}$.', ['9 · 14', 'x'], ['126', '21'], ['84', '17', '20'], 'Seis por x es lo mismo que nueve por catorce.', '$x = \\tfrac{126}{6} = 21$.')],
    ['Crecen juntas', xpMira('dibujo', 'Segunda idea: en la **directa**, el cociente no cambia y la gráfica es una recta por el origen.', { dib: rayo, v: { k: 2, x: 1 }, alto: 180 }, [
      ['Cada metro de cinta vale 2 mil: un metro, dos mil.', {}, '$\\tfrac21 = 2$'],
      ['Al doble de metros, el doble de pesos.', { x: 2 }, '$\\tfrac42 = 2$'],
      ['Con 5 metros, 10 mil. El cociente sigue en 2.', { x: 5 }, '$\\tfrac{10}{5} = 2$'],
      ['Todos los puntos caen en una recta que sale del cero.', {}, '$y = 2x$'],
    ], 'Directa: $\\tfrac{y}{x} = k$; si una se multiplica, la otra también.'),
    xpMueve('Mueve la constante hasta que con 4 metros se paguen **6** mil.', 260, { k: 2.5, x: 4 }, [xpRegla('k', 0.5, 2.5, 'miles por metro', 0.5)], { k: 1.5 }, rayo, '$\\tfrac64 = 1.5$.', { lee: v => `$4 \\cdot ${v.k} = ${4 * v.k}$` })],
    ['Una sube y la otra baja', xpMira('dibujo', 'Tercera idea: en la **inversa**, lo que no cambia es el **producto**.', { dib: hip, v: { x: 2 }, alto: 200 }, [
      ['2 pintores tardan 12 horas: 24 horas de trabajo.', {}, '$2 \\cdot 12 = 24$'],
      ['Con el doble de pintores, la mitad del tiempo.', { x: 4 }, '$4 \\cdot 6 = 24$'],
      ['Con 8, tres horas. El área del rectángulo no cambia.', { x: 8 }, '$8 \\cdot 3 = 24$'],
      ['La gráfica baja y nunca toca los ejes.', {}, '$y = \\tfrac{24}{x}$'],
    ], 'Inversa: $x \\cdot y = k$; si una se duplica, la otra queda en la mitad.'),
    xpMueve('El trabajo son 24 horas. ¿Cuántos pintores para terminar en **4** horas?', 280, { x: 2 }, [xpRegla('x', 2, 12, 'pintores')], { x: 6 }, hip, '$24 \\div 4 = 6$.', { lee: v => `$${v.x} \\cdot ${Math.round(2400 / v.x) / 100}$` })],
    ['Ahora sí, un problema', xpFila('Una reserva alcanza para 10 caballos durante 18 días. ¿Cuántas raciones hay y cuánto dura con 12 caballos?', ['raciones', 'días'], ['180', '15'], ['120', '21.6', '20'], 'Más caballos, menos días: se conserva el producto.', '$10 \\cdot 18 = 180$; $180 \\div 12 = 15$.')],
  ], 'Directa conserva el cociente; inversa conserva el producto.');

  // ---------------------------------------------------------------------------------------------------------- alg-12f
  const tabla = (f, v, K) => f.map((r, i) => r.map((t, j) => K.f(v.n - i, K.r(22 + j * 100, 24 + i * 42, 96, 36, i ? 'fc' : 'fa', 6) + K.t(70 + j * 100, 47 + i * 42, t, i ? 'b' : 's'))).join('')).join('');
  xpLec('alg-12f', [
    ['Pasar por uno', xpMira('dibujo', 'Empecemos por la idea: la **regla de tres** pasa por uno.', { dib: (v, K) => tabla([['frascos', 'gramos', ''], ['6', '270', ''], ['1', '45', '÷ 6'], ['10', '450', '· 10']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Seis frascos traen 270 gramos. ¿Cuánto traen diez?', { n: 2 }, '$6 \\to 270$'],
      ['Uno solo trae la sexta parte: 45.', { n: 3 }, '$270 \\div 6 = 45$'],
      ['Diez, diez veces eso.', { n: 4 }, '$10 \\cdot 45 = 450$'],
      ['Es lo mismo que la cruz: diez por 270 entre seis.', {}, '$x = \\tfrac{10 \\cdot 270}{6}$'],
    ], 'Primero cuánto toca a uno; luego, a los que pidan.'),
    xpFila('8 m de tela valen 56 mil. ¿Cuánto vale 1 m y cuánto 5 m (en miles)?', ['1 m', '5 m'], ['7', '35'], ['40', '8', '30'], 'Reparte 56 en ocho.', '$56 \\div 8 = 7$ y $7 \\cdot 5 = 35$.')],
    ['Primero, ¿directa o inversa?', xpMira('dibujo', 'Segunda idea: antes de la cuenta se pregunta **qué pasa con más**.', { dib: (v, K) => tabla([['grifos', 'minutos', ''], ['3', '20', '60'], ['1', '60', '· 3'], ['5', '12', '÷ 5']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Tres grifos llenan un tanque en 20 minutos. ¿Y cinco?', { n: 2 }, '$3 \\to 20$'],
      ['Más grifos, **menos** tiempo: es inversa.', {}, '$3 \\cdot 20 = 60$'],
      ['Uno solo tardaría el triple.', { n: 3 }, '$60$'],
      ['Entre cinco, la quinta parte.', { n: 4 }, '$60 \\div 5 = 12$'],
    ], 'Si más trae menos, se multiplica primero: es inversa.'),
    xpFila('4 tractores aran en 15 h. ¿Cuánto tarda 1 y cuánto tardan 6?', ['1 tractor', '6 tractores'], ['60', '10'], ['22.5', '90', '2.5'], 'Más tractores, menos horas.', '$4 \\cdot 15 = 60$; $60 \\div 6 = 10$.')],
    ['Más de dos cantidades', xpMira('dibujo', 'Tercera idea: en la **compuesta** se lleva todo a uno, paso a paso.', { dib: (v, K) => tabla([['obreros', 'días', 'metros'], ['4', '3', '60'], ['1', '1', '5'], ['6', '2', '60']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Cuatro obreros en 3 días hacen 60 m de muro.', { n: 2 }, '$4 \\cdot 3 = 12$'],
      ['Son doce días de obrero: cada uno vale 5 metros.', { n: 3 }, '$60 \\div 12 = 5$'],
      ['Seis obreros en 2 días son otra vez doce.', { n: 4 }, '$6 \\cdot 2 \\cdot 5 = 60$'],
      ['Cada cantidad se mira por aparte con lo que se pide.', {}, '$\\text{uno, en un día}$'],
    ], 'Compuesta: halla lo que hace uno en una unidad y vuelve a armar.'),
    xpFila('3 máquinas en 4 h llenan 240 frascos. ¿Cuántos llena una en 1 h? ¿Y 5 en 2 h?', ['una en 1 h', '5 en 2 h'], ['20', '200'], ['60', '80', '400'], 'Son doce horas de máquina.', '$240 \\div 12 = 20$ y $5 \\cdot 2 \\cdot 20 = 200$.')],
    ['Ahora sí, un problema', xpFila('6 personas comen 36 panes en 3 días. ¿Cuántos panes por persona y día? ¿Cuántos comen 5 en 4 días?', ['por día', 'total'], ['2', '40'], ['6', '30', '24'], 'Son 18 raciones.', '$36 \\div 18 = 2$; $5 \\cdot 4 \\cdot 2 = 40$.')],
  ], 'Directa o inversa primero; después, pasar por uno.');

  // ---------------------------------------------------------------------------------------------------------- alg-13
  const cien = (v, K) => { const n = Math.round(v.k); let h = ''; for (let i = 0; i < 100; i++) h += K.r(80 + (i % 10) * 18, 12 + Math.floor(i / 10) * 14, 16, 12, i < n ? 'fa' : 'fc', 2); return h + (v.p ? K.t(170, 174, v.p, 'ta') : ''); };
  const doble = (v, K) => XM.barra(K, 60, [[v.k, `${K.sig(v.k)} %`, 'fa'], [100 - v.k, '', 'fc']], { h: 40 }) + K.t(20, 48, '0', 's tm') + K.t(320, 48, v.T, 's tm') + K.t(20 + v.k * 3, 120, K.sig(v.k * v.T / 100), 'b ta');
  xpLec('alg-13', [
    ['De cada cien', xpMira('dibujo', 'Empecemos por la idea: **por ciento** es «de cada cien».', { dib: cien, v: { k: 0, p: '' }, alto: 185 }, [
      ['Cien semillas. Germinan 35.', { k: 35 }, '$35\\,\\%$'],
      ['Es la fracción 35 sobre 100.', {}, '$\\tfrac{35}{100} = 0.35$'],
      ['La mitad es 50 de cada cien.', { k: 50 }, '$50\\,\\% = \\tfrac12$'],
      ['El total completo, cien.', { k: 100 }, '$100\\,\\% = 1$'],
      ['Se puede pasar de 100: 150 % es una vez y media.', {}, '$150\\,\\% = 1.5$'],
    ], '$p\\,\\%$ es $\\tfrac{p}{100}$.'),
    xpMueve('Pinta el porcentaje que equivale a $\\tfrac{3}{20}$.', 250, { k: 50, p: '' }, [xpRegla('k', 0, 60, 'por ciento', 5)], { k: 15 }, cien, '$\\tfrac{3}{20} = \\tfrac{15}{100}$.', { lee: v => `$${v.k}\\,\\%$` })],
    ['El porcentaje de algo', xpMira('dibujo', 'Segunda idea: el **10 %** y la **mitad** sirven para casi todo.', { dib: doble, v: { k: 10, T: 80 }, alto: 140 }, [
      ['De 80 sillas, el 10 % son 8.', {}, '$80 \\div 10 = 8$'],
      ['El 30 %, tres veces eso.', { k: 30 }, '$3 \\cdot 8 = 24$'],
      ['El 5 %, la mitad del 10 %.', { k: 5 }, '$4$'],
      ['El 35 %: 30 más 5.', { k: 35 }, '$24 + 4 = 28$'],
      ['O de una: 0.35 por 80.', {}, '$0.35 \\cdot 80 = 28$'],
    ], '$p\\,\\%$ de T es $\\tfrac{p}{100} \\cdot T$; se arma con el 10 % y el 5 %.'),
    xpMueve('Mueve la barra hasta que la parte sea **33** de 60.', 210, { k: 10, T: 60 }, [xpRegla('k', 0, 100, 'por ciento', 5)], { k: 55 }, doble, '50 % son 30 y 5 % son 3.', { lee: v => `$${v.k}\\,\\% \\to ${v.k * 0.6}$` })],
    ['Qué porcentaje y cuál era el todo', xpMira('dibujo', 'Tercera idea: hay tres preguntas con la misma barra.', { dib: doble, v: { k: 20, T: 150 }, alto: 140 }, [
      ['Parte: el 20 % de 150 es 30.', {}, '$0.2 \\cdot 150 = 30$'],
      ['Porcentaje: 60 de 150. Se divide.', { k: 40 }, '$\\tfrac{60}{150} = 40\\,\\%$'],
      ['Todo: si 45 es el 30 %, el 10 % es 15…', { k: 30 }, '$45 \\div 3 = 15$'],
      ['…y el total, diez veces eso.', { k: 100 }, '$150$'],
    ], 'Parte = porcentaje · todo; las otras dos se despejan.'),
    xpFila('18 es el 24 % de un número. Pon el 1 % y el número.', ['1 %', 'el número'], ['0.75', '75'], ['4.32', '43', '0.24'], 'Reparte 18 en veinticuatro.', '$18 \\div 24 = 0.75$ y $100 \\cdot 0.75 = 75$.')],
    ['Ahora sí, un problema', xpFila('De 250 boletas, se vendió el 64 %. ¿Cuántas se vendieron y cuántas faltan?', ['vendidas', 'faltan'], ['160', '90'], ['64', '186', '100'], 'El 1 % son 2.5 boletas; o la mitad (125) más el 14 %.', '$0.64 \\cdot 250 = 160$.')],
  ], 'Un porcentaje es una razón sobre cien: siempre di de qué todo.');

  // ---------------------------------------------------------------------------------------------------------- alg-13c
  const sube = (v, K) => XM.barra(K, 40, [[100, 'antes: 100', 'fa']], { h: 34, W: 200, T: 100 }) + K.r(20, 96, 2 * v.f, 34, 'fg') + K.t(30, 118, `ahora: ${K.sig(v.f)}`, 's', 'start') + K.l(220, 30, 220, 140, 'lm d');
  xpLec('alg-13c', [
    ['Un solo factor', xpMira('dibujo', 'Empecemos por la idea: subir o bajar es **multiplicar** por un factor.', { dib: sube, v: { f: 100 }, alto: 150 }, [
      ['El precio de antes es el 100 %.', {}, '$100\\,\\%$'],
      ['Sube 30 %: queda el 130 %, o 1.3 veces.', { f: 130 }, '$1 + 0.3 = 1.3$'],
      ['Baja 30 %: queda el 70 %, o 0.7 veces.', { f: 70 }, '$1 - 0.3 = 0.7$'],
      ['Lo que se paga es lo que queda, no lo que se quita.', {}, '$0.7 \\cdot \\text{precio}$'],
    ], 'Subir p %: $\\cdot (1 + \\tfrac{p}{100})$. Bajar p %: $\\cdot (1 - \\tfrac{p}{100})$.'),
    xpMueve('Pon el nuevo valor de 100 después de **bajar 15 %**.', 230, { f: 100 }, [xpRegla('f', 50, 150, 'de cada 100', 5)], { f: 85 }, sube, 'Queda el 85 %: factor $0.85$.', { lee: v => `$\\cdot ${v.f / 100}$` })],
    ['Cuánto cambió', xpMira('dibujo', 'Segunda idea: el cambio se compara con lo **de antes**.', { dib: (v, K) => XM.barra(K, 40, [[v.a, K.sig(v.a), 'fa']], { h: 34, T: 100 }) + XM.barra(K, 90, [[v.b, K.sig(v.b), 'fg']], { h: 34, T: 100 }), v: { a: 50, b: 50 }, alto: 140 }, [
      ['Un club pasó de 50 socios…', {}],
      ['…a 70. Subió 20.', { b: 70 }, '$70 - 50 = 20$'],
      ['De los 50 que había, 20 es el 40 %.', {}, '$\\tfrac{20}{50} = 40\\,\\%$'],
      ['Si vuelve de 70 a 50, baja 20 de 70: menos del 29 %.', { a: 70, b: 50 }, '$\\tfrac{20}{70} \\approx 28.6\\,\\%$'],
    ], 'Cambio porcentual: $\\tfrac{\\text{nuevo} - \\text{viejo}}{\\text{viejo}}$.'),
    xpFila('De 80 a 92. Pon lo que subió y el porcentaje.', ['subió', 'por ciento'], ['12', '15 %'], ['12 %', '13 %', '172'], 'Compara con el 80.', '$\\tfrac{12}{80} = 0.15$.')],
    ['Volver al precio', xpMira('dibujo', 'Tercera idea: para volver atrás se **divide** entre el factor.', { dib: (v, K) => XM.pasos(K, v, ['antes · 0.8 = 48', 'antes = 48 ÷ 0.8', 'antes = 60'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Con 20 % de rebaja un libro quedó en 48 mil.', {}, '$x \\cdot 0.8 = 48$'],
      ['48 es el 80 %, no el 100 %.', { n: 2 }, '$x = 48 \\div 0.8$'],
      ['Antes del descuento valía 60.', { n: 3 }, '$60$'],
      ['Sumarle el 20 % a 48 da 57.6: no es lo mismo.', {}, '$48 \\cdot 1.2 = 57.6$'],
    ], 'El precio anterior es el nuevo dividido entre el factor.'),
    xpFila('Tras subir 25 %, un arriendo quedó en 900 mil. Pon el factor y el valor de antes.', ['factor', 'antes'], ['1.25', '720'], ['0.75', '675', '0.25'], '900 es el 125 %.', '$900 \\div 1.25 = 720$.')],
    ['Ahora sí, un problema', xpFila('Una silla de 160 mil baja 35 %. Pon el factor y lo que se paga.', ['factor', 'se paga'], ['0.65', '104'], ['0.35', '56', '125'], 'Queda el 65 %.', '$160 \\cdot 0.65 = 104$.')],
  ], 'Un cambio es un factor; volver es dividir; comparar, con lo de antes.');

  // ---------------------------------------------------------------------------------------------------------- alg-13d
  const casc = (v, K) => [100, 100 * v.f, 100 * v.f * v.g].map((x, i) => K.r(40 + i * 95, 160 - x * 0.75, 70, x * 0.75, ['fa', 'fg', 'ff'][i]) + K.t(75 + i * 95, 152 - x * 0.75, K.sig(Math.round(x * 10) / 10), 'b')).join('');
  xpLec('alg-13d', [
    ['Los factores se multiplican', xpMira('dibujo', 'Empecemos por la idea: cambios seguidos **se multiplican**, no se suman.', { dib: casc, v: { f: 1, g: 1 }, alto: 170 }, [
      ['El precio empieza en 100.', {}, '$100 \\text{ al principio}$'],
      ['Baja 20 %: quedan 80.', { f: 0.8 }, '$100 \\cdot 0.8 = 80$'],
      ['Baja otro 50 %, pero de 80: quedan 40.', { g: 0.5 }, '$80 \\cdot 0.5 = 40$'],
      ['En total bajó 60 %, no 70 %.', {}, '$0.8 \\cdot 0.5 = 0.4$'],
    ], 'Factor total = producto de los factores.'),
    xpMueve('El primero sube 20 % (120). Mueve el segundo hasta que termine en **90**.', 250, { f: 1.2, g: 1.5 }, [xpRegla('g', 0.5, 1.5, 'segundo factor', 0.25)], { g: 0.75 }, casc, '$1.2 \\cdot 0.75 = 0.9$.', { lee: v => `$1.2 \\cdot ${v.g} = ${Math.round(120 * v.g) / 100}$` })],
    ['Subir y bajar lo mismo', xpMira('dibujo', 'Segunda idea: subir p % y bajar p % **no** deja igual.', { dib: casc, v: { f: 1, g: 1 }, alto: 170 }, [
      ['Sube 30 %: de 100 a 130.', { f: 1.3 }, '$\\cdot 1.3$'],
      ['Baja 30 %, pero de 130: son 39.', { g: 0.7 }, '$\\cdot 0.7$'],
      ['Queda 91: se perdió 9 %.', {}, '$1.3 \\cdot 0.7 = 0.91$'],
      ['El orden no importa: multiplicar es conmutativo.', { f: 0.7, g: 1.3 }, '$0.7 \\cdot 1.3 = 0.91$'],
    ], '$(1 + r)(1 - r) = 1 - r^2$: siempre menos de 1.'),
    xpFila('Sube 10 % y luego baja 10 %. Pon el factor total y el cambio.', ['factor', 'cambio'], ['0.99', '−1 %'], ['1', '0 %', '1.01'], '$1.1 \\cdot 0.9$.', 'Se pierde el 1 %.')],
    ['Repetir el mismo cambio', xpMira('dibujo', 'Tercera idea: el mismo cambio muchas veces es una **potencia**.', { dib: (v, K) => Array.from({ length: Math.round(v.n) + 1 }, (_, i) => K.r(22 + i * 50, 170 - 20 * 1.5 ** i, 40, 20 * 1.5 ** i, 'fa') + K.t(42 + i * 50, 162 - 20 * 1.5 ** i, K.sig(Math.round(20 * 1.5 ** i)), 's')).join(''), v: { n: 0 }, alto: 180 }, [
      ['20 abejas; cada mes hay 50 % más.', {}, '$20 \\text{ abejas}$'],
      ['Un mes: por 1.5.', { n: 1 }, '$20 \\cdot 1.5$'],
      ['Dos meses: por 1.5 otra vez.', { n: 2 }, '$20 \\cdot 1.5^2$'],
      ['A los cuatro meses ya pasan de 100.', { n: 4 }, '$20 \\cdot 1.5^4 \\approx 101$'],
    ], 'n veces el factor f: $\\cdot f^n$.'),
    xpFila('Un valor baja a la mitad tres veces. Pon el factor total y la baja en por ciento.', ['factor', 'baja'], ['1/8', '87.5 %'], ['1/6', '150 %', '12.5 %'], 'Un medio por un medio por un medio.', '$\\tfrac18 = 12.5\\,\\%$ queda.')],
    ['Ahora sí, un problema', xpFila('«20 % de descuento más otro 25 %». De 100, ¿cuánto se paga y de cuánto fue el descuento?', ['se paga', 'descuento'], ['60', '40 %'], ['55', '45 %', '80'], '$0.8 \\cdot 0.75$.', 'No es 45 %: el segundo se toma sobre 80.')],
  ], 'Cambios en cadena: multiplica factores.');

  // ---------------------------------------------------------------------------------------------------------- alg-21a
  const torre = (v, K) => { const b = v.b, e = Math.round(v.e), N = Math.round(b ** e); const c = N > 32 ? 16 : Math.max(1, Math.round(Math.sqrt(N))), u = N > 32 ? 13 : 24; return Array.from({ length: Math.min(N, 130) }, (_, i) => K.r(170 - c * u / 2 + (i % c) * u, 40 + Math.floor(i / c) * u, u - 2, u - 2, 'fa', 2)).join('') + K.t(170, 26, `${b}${['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'][e]} = ${N}`, 'b ta'); };
  xpLec('alg-21a', [
    ['Multiplicar repetido', xpMira('dibujo', 'Empecemos por la idea: una **potencia** cuenta factores iguales.', { dib: torre, v: { b: 3, e: 1 }, alto: 190 }, [
      ['Empecemos con un solo factor: el 3.', {}, '$3^1 = 3$'],
      ['Dos factores de 3.', { e: 2 }, '$3^2 = 3 \\cdot 3 = 9$'],
      ['Tres factores: 27, no 9.', { e: 3 }, '$3^3 = 3 \\cdot 3 \\cdot 3 = 27$'],
      ['La base se repite; el exponente dice cuántas veces.', {}, '$a^n$'],
      ['Bajar un exponente divide entre 3. Por eso a la cero da 1.', { e: 0 }, '$3^0 = 1$'],
    ], '$a^n$: n factores iguales a a. Y $a^0 = 1$ si $a \\neq 0$.'),
    xpMueve('¿Qué exponente hace que 2 llegue a **64**?', 240, { b: 2, e: 1 }, [xpRegla('e', 0, 6, 'exponente')], { e: 6 }, torre, '$2^6 = 64$.', { lee: v => `$2^{${v.e}}$` })],
    ['El signo', xpMira('dibujo', 'Segunda idea: con base negativa manda la **cantidad** de factores.', { dib: (v, K) => { const e = Math.round(v.e); return Array.from({ length: e }, (_, i) => K.c(50 + i * 50, 60, 20, 'ff') + K.t(50 + i * 50, 66, v.q > 0.5 ? '2' : '−2', 'b')).join('') + K.t(170, 130, v.q > 0.5 ? '−(2 · 2 · 2 · 2) = −16' : e % 2 ? 'sobra uno: negativo' : 'en parejas: positivo', 'ta'); }, v: { e: 1, q: 0 }, alto: 150 }, [
      ['Un factor −2: negativo.', {}, '$(-2)^1 = -2$'],
      ['Dos: una pareja da positivo.', { e: 2 }, '$(-2)^2 = 4$'],
      ['Con tres factores sobra uno.', { e: 3 }, '$(-2)^3 = -8$'],
      ['Con cuatro hay dos parejas.', { e: 4 }, '$(-2)^4 = 16$'],
      ['Sin paréntesis, el menos no entra en la potencia.', { q: 1 }, '$-2^4 = -16$'],
    ], 'Exponente par: positivo; impar: negativo. Sin paréntesis el signo queda afuera.'),
    xpFila('Pon cada resultado.', ['(−3)²', '−3²', '(−1)⁷'], ['9', '−9', '−1'], ['1', '6', '−6'], '¿El menos está dentro del paréntesis? ¿Cuántos factores hay?', 'El paréntesis mete el signo.')],
    ['Exponentes negativos', xpMira('dibujo', 'Tercera idea: bajar más allá de cero **divide**.', { dib: (v, K) => XM.pasos(K, v, ['5² = 25', '5¹ = 5', '5⁰ = 1', '5⁻¹ = 1/5', '5⁻² = 1/25'], 30, 30), v: { n: 1 }, alto: 170 }, [
      ['Cada escalón divide entre 5.', { n: 2 }, '$25 \\div 5 = 5$'],
      ['El siguiente es 1.', { n: 3 }, '$5^0 = 1$'],
      ['Uno más: un quinto.', { n: 4 }, '$5^{-1} = \\tfrac15$'],
      ['Y otro: uno sobre 25.', { n: 5 }, '$5^{-2} = \\tfrac{1}{25}$'],
      ['El exponente negativo no hace negativo: invierte.', {}, '$a^{-n} = \\tfrac{1}{a^n}$'],
    ], '$a^{-n} = \\tfrac{1}{a^n}$: invierte, no cambia el signo.'),
    xpFila('Pon cada resultado.', ['2⁻³', '10⁻²', '(1/4)⁻¹'], ['1/8', '1/100', '4'], ['−8', '−4', '1/6'], 'El negativo voltea la fracción.', 'Invertir: $\\tfrac18$, $\\tfrac1{100}$ y 4.')],
    ['Ahora sí, un problema', xpMueve('Una hoja se corta en 3 y cada pedazo otra vez en 3. ¿Cuántas rondas para tener **81** pedazos?', 240, { b: 3, e: 0 }, [xpRegla('e', 0, 4, 'rondas')], { e: 4 }, torre, '$3^4 = 81$.', { lee: v => `$3^{${v.e}}$` })],
  ], 'El exponente cuenta factores; el cero da 1 y el negativo invierte.');

  // ---------------------------------------------------------------------------------------------------------- alg-21b
  const fac = (K, x, y, n, t, c) => Array.from({ length: Math.round(n) }, (_, i) => K.r(x + i * 30, y, 26, 26, c, 5) + K.t(x + 13 + i * 30, y + 19, t, 's')).join('');
  xpLec('alg-21b', [
    ['Juntar y quitar', xpMira('dibujo', 'Empecemos por la idea: las leyes solo **cuentan factores**.', { dib: (v, K) => fac(K, 40, 40, v.a, 'x', 'fa') + fac(K, 40 + v.a * 30 + 6 * v.s, 40, v.b, 'x', 'fg') + K.f(v.d, K.l(30, 80, 300, 80) + fac(K, 40, 90, v.c, 'x', 'ff')), v: { a: 3, b: 2, s: 5, d: 0, c: 2 }, alto: 130 }, [
      ['Tres factores de x y otros dos.', {}, '$x^3 \\cdot x^2$'],
      ['Juntos son cinco: los exponentes se suman.', { s: 0 }, '$x^{3+2} = x^5$'],
      ['Si abajo hay dos, se cancelan dos de arriba.', { d: 1 }, '$\\tfrac{x^5}{x^2}$'],
      ['Quedan tres: los exponentes se restan.', { b: 0, c: 0 }, '$x^{5-2} = x^3$'],
    ], '$x^m x^n = x^{m+n}$ y $\\tfrac{x^m}{x^n} = x^{m-n}$.'),
    xpFila('Pon cada exponente.', ['x⁴ · x³', 'x⁹ ÷ x²', 'x ÷ x⁴'], ['7', '7', '−3'], ['12', '4', '11'], 'Suma al multiplicar y resta al dividir. x es x a la 1.', '$4+3$, $9-2$ y $1-4$.')],
    ['Potencia de potencia', xpMira('dibujo', 'Segunda idea: repetir un paquete **multiplica** exponentes.', { dib: (v, K) => Array.from({ length: Math.round(v.k) }, (_, i) => K.r(60, 18 + i * 40, 220, 34, 'fc', 8) + fac(K, 110, 22 + i * 40, 4, 'x', 'fa')).join(''), v: { k: 1 }, alto: 150 }, [
      ['Un paquete de cuatro x.', {}, '$x^4 = x \\cdot x \\cdot x \\cdot x$'],
      ['El cubo son tres paquetes.', { k: 3 }, '$(x^4)^3$'],
      ['Tres por cuatro: doce factores.', {}, '$x^{4 \\cdot 3} = x^{12}$'],
      ['El exponente entra a cada factor de un producto.', {}, '$(ab)^n = a^n b^n$'],
      ['Pero no a una suma.', {}, '$(a + b)^2 \\neq a^2 + b^2$'],
    ], '$(x^m)^n = x^{mn}$ y $(ab)^n = a^n b^n$.'),
    xpFila('$(2x^3)^4$: pon el número y el exponente.', ['número', 'exponente'], ['16', '12'], ['8', '7', '2'], 'El 4 entra al 2 y a la x.', '$2^4 x^{12} = 16x^{12}$.')],
    ['Notación científica', xpMira('dibujo', 'Tercera idea: el 10 elevado **corre la coma**.', { dib: (v, K) => K.t(170, 60, v.a, 'B') + K.t(170, 110, v.b, 'b ta'), v: { a: '45 000', b: '' }, alto: 140 }, [
      ['Este es un número grande.', {}, '$45\\,000$'],
      ['La coma corre cuatro puestos a la izquierda.', { b: '4.5 · 10⁴' }, '$4.5 \\cdot 10^4$'],
      ['Uno pequeño la corre a la derecha: exponente negativo.', { a: '0.05', b: '5 · 10⁻²' }, '$5 \\cdot 10^{-2}$'],
      ['Al multiplicar, se suman los exponentes del 10.', { a: '(2·10³)(4·10⁵)', b: '8 · 10⁸' }, '$8 \\cdot 10^8$'],
    ], 'El exponente del 10 dice cuántos puestos corre la coma.'),
    xpFila('Pon el exponente del 10.', ['7 200 000', '0.00006', '(3·10⁴)(2·10⁻⁷)'], ['6', '−5', '−3'], ['5', '−4', '−28'], 'Cuenta los puestos hasta dejar una sola cifra antes de la coma.', '$7.2 \\cdot 10^6$, $6 \\cdot 10^{-5}$ y $6 \\cdot 10^{-3}$.')],
    ['Ahora sí, un problema', xpFila('Un cubo tiene arista $3a^2$. Su volumen es $(3a^2)^3$: pon el número y el exponente.', ['número', 'exponente'], ['27', '6'], ['9', '5', '8'], 'Tres veces el paquete.', '$27a^6$.')],
  ], 'Juntar suma, quitar resta, repetir multiplica.');

  // ---------------------------------------------------------------------------------------------------------- alg-22a
  const cuad = (v, K) => { const s = v.s * 20; return XM.reja(K, 90, 14, v.s, v.s, 20) + K.t(90 + s / 2, 30 + s, `lado ${K.sig(v.s)}`, 's') + K.t(300, 60, `área ${K.sig(v.s * v.s)}`, 'ta', 'end'); };
  xpLec('alg-22a', [
    ['Deshacer la potencia', xpMira('dibujo', 'Empecemos por la idea: la **raíz** pregunta por el lado.', { dib: cuad, v: { s: 2 }, alto: 190 }, [
      ['Un cuadrado de lado 2 tiene área 4.', {}, '$2^2 = 4$'],
      ['Con área 25, el lado es 5.', { s: 5 }, '$\\sqrt{25} = 5$'],
      ['La raíz cúbica pregunta por la arista de un cubo.', {}, '$\\sqrt[3]{27} = 3$'],
      ['El cuadrado borra el signo: raíz de x² es |x|.', {}, '$\\sqrt{x^2} = |x|$'],
      ['De un negativo no hay raíz cuadrada real; cúbica sí.', {}, '$\\sqrt[3]{-8} = -2$'],
    ], '$\\sqrt[n]{a} = b$ si $b^n = a$ (con índice par, $b \\ge 0$).'),
    xpMueve('Halla $\\sqrt{49}$: mueve el lado.', 250, { s: 3 }, [xpRegla('s', 1, 8, 'lado')], { s: 7 }, cuad, '$7^2 = 49$.', { lee: v => `$${v.s}^2 = ${v.s ** 2}$` })],
    ['El exponente fracción', xpMira('dibujo', 'Segunda idea: la raíz es un **exponente partido**.', { dib: (v, K) => XM.pasos(K, v, ['x^½ · x^½ = x¹', 'x^½ = √x', '8^⅔ = 2² = 4'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['¿Qué exponente, sumado consigo mismo, da 1? Un medio.', { n: 1 }, '$x^{1/2} \\cdot x^{1/2} = x$'],
      ['Por eso elevar a un medio es sacar raíz cuadrada.', { n: 2 }, '$x^{1/2} = \\sqrt{x}$'],
      ['Abajo va el índice; arriba, la potencia.', {}, '$x^{m/n} = \\sqrt[n]{x^m}$'],
      ['Ocho a los dos tercios: raíz cúbica y luego al cuadrado.', { n: 3 }, '$8^{2/3} = 2^2 = 4$'],
    ], '$x^{m/n} = \\sqrt[n]{x^m}$: abajo el índice.'),
    xpFila('Pon cada resultado.', ['81^½', '27^⅔', '16^¾'], ['9', '9', '8'], ['40', '18', '12'], 'Primero la raíz que dice abajo; luego la potencia.', '$9$, $3^2 = 9$ y $2^3 = 8$.')],
    ['La raíz de un producto', xpMira('dibujo', 'Tercera idea: la raíz **entra en productos**, no en sumas.', { dib: (v, K) => XM.pasos(K, v, ['√(4 · 25) = 2 · 5 = 10', '√(9 + 16) = √25 = 5', '√9 + √16 = 3 + 4 = 7'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['Raíz de 4 por 25: se puede separar.', { n: 1 }, '$\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$'],
      ['Con una suma, primero se suma.', { n: 2 }, '$\\sqrt{9 + 16} = 5$'],
      ['Separarla daría 7: no es igual.', { n: 3 }, '$\\sqrt{9} + \\sqrt{16} = 7$'],
      ['Lo mismo con cocientes: sí; con restas: no.', {}, '$\\sqrt{\\tfrac{a}{b}} = \\tfrac{\\sqrt a}{\\sqrt b}$'],
    ], 'La raíz se reparte en productos y cocientes, nunca en sumas.'),
    xpFila('Pon cada resultado.', ['√(36 · 4)', '√(100/25)', '√(64 + 36)'], ['12', '2', '10'], ['14', '4', '20'], 'Solo la última no se separa.', '$6 \\cdot 2$, $10 \\div 5$ y $\\sqrt{100}$.')],
    ['Ahora sí, un problema', xpMueve('Un mosaico cuadrado usa **36** baldosas. ¿Cuántas van en cada lado?', 250, { s: 2 }, [xpRegla('s', 1, 8, 'por lado')], { s: 6 }, cuad, '$\\sqrt{36} = 6$.', { lee: v => `$${v.s}^2 = ${v.s ** 2}$` })],
  ], 'La raíz deshace la potencia y es un exponente fraccionario.');

  // ---------------------------------------------------------------------------------------------------------- alg-22b
  const sacar = (v, K) => XM.pasos(K, v, v.l || [], 44, 38);
  xpLec('alg-22b', [
    ['Sacar del radical', xpMira('dibujo', 'Empecemos por la idea: de una raíz cuadrada sale **uno por cada pareja**.', { dib: (v, K) => XM.pasos(K, v, ['√50 = √(2 · 5 · 5)', 'pareja de 5: sale un 5', '√50 = 5√2'], 44, 38), v: { n: 0 }, alto: 150 }, [
      ['Se parte 50 en factores primos.', { n: 1 }, '$50 = 2 \\cdot 5 \\cdot 5$'],
      ['Los dos cincos hacen pareja: sale uno.', { n: 2 }, '$\\sqrt{5 \\cdot 5} = 5$'],
      ['El 2 no tiene pareja: se queda.', { n: 3 }, '$5\\sqrt2$'],
      ['En la raíz cúbica salen de a tríos.', {}, '$\\sqrt[3]{54} = 3\\sqrt[3]{2}$'],
    ], 'Índice n: sale uno por cada grupo de n factores iguales.'),
    xpFila('$\\sqrt{72}$ simplificada al máximo: pon lo que sale y lo que queda.', ['afuera', 'adentro'], ['6', '2'], ['3', '8', '9'], '72 es 36 por 2.', '$\\sqrt{72} = 6\\sqrt2$.')],
    ['Sumar raíces', xpMira('dibujo', 'Segunda idea: solo se suman raíces **iguales por dentro**.', { dib: (v, K) => XM.pasos(K, v, ['√12 + √27', '2√3 + 3√3', '5√3'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Parecen distintas. Simplifiquemos cada una.', {}, '$\\sqrt{12} + \\sqrt{27}$'],
      ['Las dos traen raíz de tres.', { n: 2 }, '$2\\sqrt3 + 3\\sqrt3$'],
      ['Dos y tres de lo mismo: cinco.', { n: 3 }, '$5\\sqrt3$'],
      ['Raíz de 2 más raíz de 3 no se junta.', {}, '$\\sqrt2 + \\sqrt3 \\neq \\sqrt5$'],
    ], 'Simplifica y suma los de la misma raíz.'),
    xpFila('$\\sqrt{8} + \\sqrt{18}$: simplifica cada una y suma.', ['√8', '√18', 'suma'], ['2√2', '3√2', '5√2'], ['√26', '6√2', '4√2'], '8 es 4 por 2; 18 es 9 por 2.', 'Cinco de $\\sqrt2$.')],
    ['Racionalizar', xpMira('dibujo', 'Tercera idea: se multiplica por **un uno bien escogido** para limpiar el denominador.', { dib: (v, K) => XM.pasos(K, v, ['6/√3 · √3/√3 = 2√3', '1/(√5 − 2) · (√5 + 2)/(√5 + 2)', '= (√5 + 2)/(5 − 4) = √5 + 2'], 44, 38, 'x'), v: { n: 0 }, alto: 150 }, [
      ['Con una sola raíz, por ella misma.', { n: 1 }, '$\\tfrac{6}{\\sqrt3} = 2\\sqrt3$'],
      ['Con una resta, por su conjugado: la misma con más.', { n: 2 }, '$(a - b)(a + b) = a^2 - b^2$'],
      ['Los cuadrados borran la raíz.', { n: 3 }, '$5 - 4 = 1$'],
      ['El valor no cambió: se multiplicó por 1.', {}, '$\\tfrac{\\sqrt5 + 2}{\\sqrt5 + 2} = 1$'],
    ], 'Una raíz: por ella. Suma o resta: por el conjugado.'),
    xpFila('$\\tfrac{4}{\\sqrt7 - \\sqrt3}$: pon el denominador que queda y el resultado.', ['abajo', 'resultado'], ['4', '√7 + √3'], ['10', '√7 − √3', '16'], 'Por el conjugado: $7 - 3$.', 'El 4 se cancela.')],
    ['Ahora sí, un problema', xpFila('Un lote cuadrado mide 80 m². Pon su lado simplificado y su perímetro.', ['lado', 'perímetro'], ['4√5', '16√5'], ['8√10', '20√5', '2√20'], '80 es 16 por 5.', '$\\sqrt{80} = 4\\sqrt5$; por cuatro lados, $16\\sqrt5$.')],
  ], 'Sacar grupos, sumar iguales y limpiar el denominador.');

  // ---------------------------------------------------------------------------------------------------------- alg-14
  const esc = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const x = v.a + v.d * i; return K.r(24 + i * 50, 170 - x * 6, 40, Math.max(2, x * 6), 'fa') + K.t(44 + i * 50, 162 - x * 6, K.sig(x), 'b'); }).join('');
  xpLec('alg-14', [
    ['La diferencia', xpMira('dibujo', 'Empecemos por la idea: en una **aritmética** se suma siempre lo mismo.', { dib: esc, v: { a: 4, d: 3, n: 1 }, alto: 180 }, [
      ['El primero es 4.', {}, '$a_1 = 4$'],
      ['Se suma 3: 7, 10, 13…', { n: 4 }, '$d = 3$'],
      ['Para llegar al sexto se dan cinco saltos.', { n: 6 }, '$a_6 = 4 + 5 \\cdot 3 = 19$'],
      ['Siempre un salto menos que el puesto.', {}, '$a_n = a_1 + (n - 1)d$'],
    ], '$a_n = a_1 + (n-1)d$.'),
    xpMueve('El primero es 5. Mueve la diferencia hasta que el **quinto** sea 21.', 250, { a: 5, d: 1, n: 5 }, [xpRegla('d', 1, 5, 'diferencia')], { d: 4 }, esc, '$5 + 4 \\cdot 4 = 21$.', { lee: v => `$5 + 4 \\cdot ${v.d} = ${5 + 4 * v.d}$` })],
    ['Con dos términos basta', xpMira('dibujo', 'Segunda idea: dos términos y los **saltos que los separan** dan la diferencia.', { dib: (v, K) => { const L = XM.linea(K, 3, 8, 110, {}); return L.s + K.t(L.X(3), 80, '11', 'b ta') + K.t(L.X(8), 80, '31', 'b ta') + Array.from({ length: Math.round(v.k) }, (_, i) => K.pl([[L.X(3 + i), 100], [L.X(3.5 + i), 86], [L.X(4 + i), 100]], 'la')).join(''); }, v: { k: 0 }, alto: 150 }, [
      ['El tercero es 11 y el octavo, 31.', {}, '$a_3 = 11, \\ a_8 = 31$'],
      ['Del 3 al 8 hay cinco saltos.', { k: 5 }, '$8 - 3 = 5$'],
      ['Subió 20 en cinco saltos: 4 cada uno.', {}, '$d = \\tfrac{20}{5} = 4$'],
      ['Hacia atrás dos saltos: el primero es 3.', {}, '$11 - 2 \\cdot 4 = 3$'],
    ], '$d = \\tfrac{a_m - a_k}{m - k}$.'),
    xpFila('$a_4 = 17$ y $a_{10} = 47$. Pon los saltos, d y $a_1$.', ['saltos', 'd', 'primero'], ['6', '5', '2'], ['30', '7', '10'], 'De 4 a 10; luego, tres saltos hacia atrás.', '$30 \\div 6 = 5$; $17 - 15 = 2$.')],
    ['¿Está en la lista?', xpMira('dibujo', 'Tercera idea: un número está si cae en un **salto entero**.', { dib: (v, K) => { const L = XM.linea(K, 0, 40, 100, { p: 5 }); return L.s + [0, 1, 2, 3, 4, 5].map(i => K.c(L.X(2 + 7 * i), 100, 6, 'fa')).join('') + K.c(L.X(v.x), 70, 7, 'fF'); }, v: { x: 30 }, alto: 140 }, [
      ['2, 9, 16, 23, 30, 37…: suma 7.', {}, '$a_n = 2 + 7(n-1)$'],
      ['¿El 30? Faltan 28: cuatro saltos justos.', {}, '$28 \\div 7 = 4$'],
      ['¿El 33? Faltan 31: no son saltos enteros.', { x: 33 }, '$31 \\div 7 = 4.4\\ldots$'],
      ['Entonces 33 no está en la lista.', {}],
    ], 'Está si $\\tfrac{x - a_1}{d}$ es un entero no negativo.'),
    xpFila('En 6, 11, 16, … ¿cuántos saltos hay hasta 91 y qué puesto ocupa?', ['saltos', 'puesto'], ['17', '18'], ['16', '91', '15'], 'Faltan 85, de a cinco.', '$85 \\div 5 = 17$; puesto 18.')],
    ['Ahora sí, un problema', xpMueve('Un sendero tiene 3 farolas en la primera cuadra y en cada una siguiente suma las mismas. En la **sexta** hay 18. ¿Cuántas suma?', 250, { a: 3, d: 1, n: 6 }, [xpRegla('d', 1, 4, 'suma')], { d: 3 }, esc, '$3 + 5 \\cdot 3 = 18$.', { lee: v => `$3 + 5 \\cdot ${v.d}$` })],
  ], 'Primero más los saltos: un salto menos que el puesto.');

  // ---------------------------------------------------------------------------------------------------------- alg-14b
  const par = (v, K) => { const n = 6; let h = ''; for (let i = 0; i < n; i++) { const a = 2 + i * 2, b = 2 + (n - 1 - i) * 2; h += K.r(50 + i * 42, 160 - a * 8, 34, a * 8, 'fa') + K.f(v.g, K.r(50 + i * 42, 160 - (a + b) * 8, 34, b * 8, 'fg')); } return h; };
  xpLec('alg-14b', [
    ['La escalera doble', xpMira('dibujo', 'Empecemos por la idea: dos escaleras iguales hacen **un rectángulo**.', { dib: par, v: { g: 0 }, alto: 175 }, [
      ['Sumar 2 + 4 + 6 + 8 + 10 + 12: una escalera.', {}, '$S$'],
      ['Se pone otra igual, volteada, encima.', { g: 1 }, '$2S$'],
      ['Todas las columnas miden lo mismo: 14.', {}, '$2 + 12 = 14$'],
      ['Seis columnas de 14 son dos escaleras.', {}, '$S = \\tfrac{6 \\cdot 14}{2} = 42$'],
      ['Cuántos, por primero más último, sobre dos.', {}, '$S_n = \\tfrac{n(a_1 + a_n)}{2}$'],
    ], '$S_n = \\tfrac{n(a_1 + a_n)}{2}$.'),
    xpFila('$5 + 8 + 11 + \\cdots + 32$ tiene 10 términos. Pon el primero más el último y la suma.', ['1.º + último', 'suma'], ['37', '185'], ['370', '27', '160'], 'Diez columnas de ese alto, la mitad.', '$\\tfrac{10 \\cdot 37}{2} = 185$.')],
    ['Contar los términos', xpMira('dibujo', 'Segunda idea: antes de sumar hay que saber **cuántos son**.', { dib: (v, K) => XM.pasos(K, v, ['7, 11, 15, …, 47', '(47 − 7) ÷ 4 = 10 saltos', '11 términos', '11 · 54 ÷ 2 = 297'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['De 7 a 47, de cuatro en cuatro.', {}, '$d = 4$'],
      ['Son 40 de diferencia: diez saltos.', { n: 2 }, '$40 \\div 4 = 10$'],
      ['Y un término más que saltos.', { n: 3 }, '$n = 11$'],
      ['Ahora sí, la suma.', { n: 4 }, '$\\tfrac{11 \\cdot 54}{2} = 297$'],
    ], 'Términos = saltos + 1.'),
    xpFila('$10 + 13 + \\cdots + 40$. Pon los saltos, los términos y la suma.', ['saltos', 'términos', 'suma'], ['10', '11', '275'], ['30', '250', '12'], 'De 10 a 40, de a tres.', '$\\tfrac{11 \\cdot 50}{2} = 275$.')],
    ['El promedio', xpMira('dibujo', 'Tercera idea: la suma es el **promedio** por cuántos hay.', { dib: (v, K) => [3, 5, 7, 9, 11].map((a, i) => { const y = K.lerp(a, 7, v.t); return K.r(60 + i * 46, 160 - y * 11, 38, y * 11, 'fa') + K.t(79 + i * 46, 152 - y * 11, K.sig(Math.round(y)), 's'); }).join(''), v: { t: 0 }, alto: 170 }, [
      ['3, 5, 7, 9, 11: cinco barras.', {}, '$n = 5$'],
      ['Se emparejan: lo que sobra a las altas cubre las bajas.', { t: 1 }, '$\\tfrac{3 + 11}{2} = 7$'],
      ['Quedan cinco de siete.', {}, '$5 \\cdot 7 = 35$'],
      ['El promedio es la mitad del primero y el último.', {}, '$\\tfrac{a_1 + a_n}{2}$'],
    ], 'Suma = promedio de los extremos · cantidad.'),
    xpFila('9 términos que van de 4 a 36 en aritmética. Pon el promedio y la suma.', ['promedio', 'suma'], ['20', '180'], ['40', '360', '16'], 'La mitad de 4 más 36.', '$9 \\cdot 20 = 180$.')],
    ['Ahora sí, un problema', xpFila('Un coro tiene 12 filas: la primera con 8 sillas y cada una suma 2. Pon la última fila y el total.', ['última', 'total'], ['30', '228'], ['32', '240', '456'], 'Once saltos de dos; luego, doce columnas.', '$8 + 22 = 30$; $\\tfrac{12 \\cdot 38}{2} = 228$.')],
  ], 'Dos escaleras hacen un rectángulo: $n$ por primero más último, la mitad.');

  // ---------------------------------------------------------------------------------------------------------- alg-14c
  const geo = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const x = v.a * v.r ** i, h = Math.min(140, x * v.u); return K.r(24 + i * 50, 170 - h, 40, h, 'fa') + K.t(44 + i * 50, 162 - h, K.sig(x), 's'); }).join('');
  xpLec('alg-14c', [
    ['La razón', xpMira('dibujo', 'Empecemos por la idea: en una **geométrica** se multiplica siempre por lo mismo.', { dib: geo, v: { a: 2, r: 3, n: 1, u: 0.8 }, alto: 180 }, [
      ['El primer término es 2.', {}, '$a_1 = 2 \\text{ primero}$'],
      ['Por 3 cada vez: 6, 18, 54…', { n: 4 }, '$r = 3$'],
      ['El quinto: cuatro veces por 3.', { n: 5 }, '$2 \\cdot 3^4 = 162$'],
      ['Un salto menos que el puesto, pero ahora en el exponente.', {}, '$a_n = a_1 r^{n-1}$'],
    ], '$a_n = a_1 \\cdot r^{\\,n-1}$.'),
    xpMueve('Empieza en 3. ¿Qué razón lleva al **cuarto** a 24?', 250, { a: 3, r: 1, n: 4, u: 1 }, [xpRegla('r', 1, 3, 'razón')], { r: 2 }, geo, '$3 \\cdot 2^3 = 24$.', { lee: v => `$3 \\cdot ${v.r}^3 = ${3 * v.r ** 3}$` })],
    ['Crecer, encoger y alternar', xpMira('dibujo', 'Segunda idea: la **razón** decide cómo se mueve.', { dib: (v, K) => { const P = XM.plano(K, 0, 6, -8, 8, { H: 180, gy: 4 }); return P.s + [0, 1, 2, 3, 4, 5].map(i => { const y = v.a * v.r ** i; return Math.abs(y) <= 8 ? K.c(P.X(i + 0.3), P.Y(y), 6, 'fA') + K.l(P.X(i + 0.3), P.Y(0), P.X(i + 0.3), P.Y(y), 'la') : ''; }).join(''); }, v: { a: 1, r: 1.5 }, alto: 190 }, [
      ['Razón mayor que 1: crece.', {}, '$r > 1$'],
      ['Entre 0 y 1: se encoge hacia cero.', { a: 8, r: 0.5 }, '$0 < r < 1$'],
      ['Negativa: salta de un lado a otro.', { a: 8, r: -0.75 }, '$r < 0$'],
      ['Igual a 1: no se mueve.', { a: 5, r: 1 }, '$r = 1$'],
    ], 'El tamaño de r dice si crece; su signo, si alterna.'),
    xpMueve('Mueve la razón para que, desde 8, los puntos **alternen y se encojan** a la cuarta parte.', 270, { a: 8, r: 1 }, [xpRegla('r', -1, 1, 'razón', 0.25)], { r: -0.25 }, (v, K) => { const P = XM.plano(K, 0, 6, -8, 8, { H: 180, gy: 4 }); return P.s + [0, 1, 2, 3, 4, 5].map(i => { const y = 8 * v.r ** i; return K.c(P.X(i + 0.3), P.Y(y), 6, 'fA') + K.l(P.X(i + 0.3), P.Y(0), P.X(i + 0.3), P.Y(y), 'la'); }).join(''); }, '$r = -\\tfrac14$.', { lee: v => `$r = ${v.r}$` })],
    ['Con dos términos', xpMira('dibujo', 'Tercera idea: entre dos términos se **divide** y se saca la raíz de los saltos.', { dib: (v, K) => XM.pasos(K, v, ['a₂ = 10,  a₅ = 80', '80 ÷ 10 = 8 = r³', 'r = 2', 'a₁ = 10 ÷ 2 = 5'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Del segundo al quinto hay tres saltos.', {}, '$5 - 2 = 3$'],
      ['Se multiplicó por 8 en tres saltos.', { n: 2 }, '$r^3 = 8$'],
      ['Cada salto es por 2.', { n: 3 }, '$r = \\sqrt[3]{8} = 2$'],
      ['Un salto atrás, el primero.', { n: 4 }, '$a_1 = 5$'],
    ], '$r^{\\,m-k} = \\tfrac{a_m}{a_k}$.'),
    xpFila('$a_2 = 12$ y $a_4 = 108$, con razón positiva. Pon $r^2$, r y $a_1$.', ['r²', 'r', 'primero'], ['9', '3', '4'], ['96', '48', '6'], 'Divide 108 entre 12.', '$r = 3$ y $12 \\div 3 = 4$.')],
    ['Ahora sí, un problema', xpMueve('Un rumor empieza con 4 personas y cada hora se multiplica igual. A las 2 horas lo saben **36** (tercer término). ¿Por cuánto?', 250, { a: 4, r: 1, n: 3, u: 1 }, [xpRegla('r', 1, 4, 'razón')], { r: 3 }, geo, '$4 \\cdot 3^2 = 36$.', { lee: v => `$4 \\cdot ${v.r}^2 = ${4 * v.r ** 2}$` })],
  ], 'Se multiplica por la razón en cada salto.');

  // ---------------------------------------------------------------------------------------------------------- alg-14d
  const cinta = (v, K) => { let x = 20, h = '', w = 150; for (let i = 0; i < Math.round(v.n); i++) { h += K.r(x, 60, w, 50, ['fa', 'fg', 'ff', 'fo'][i % 4]) + (w > 30 ? K.t(x + w / 2, 90, `1/${2 ** (i + 1)}`, 's') : ''); x += w; w /= 2; } return h + K.r(20, 60, 300, 50, 'fn') + K.t(170, 140, v.p, 'b ta'); };
  xpLec('alg-14d', [
    ['Multiplicar y restar', xpMira('dibujo', 'Empecemos por la idea: si se multiplica por r y se resta, **casi todo se cancela**.', { dib: (v, K) => XM.pasos(K, v, ['S = 2 + 6 + 18 + 54', '3S = 6 + 18 + 54 + 162', '3S − S = 162 − 2', 'S = 160 ÷ 2 = 80'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Una suma geométrica de razón 3.', {}, '$S$'],
      ['Por 3, cada término se corre un puesto.', { n: 2 }, '$3S$'],
      ['Al restar solo sobreviven los de las puntas.', { n: 3 }, '$2S = 162 - 2$'],
      ['Y de ahí se despeja.', { n: 4 }, '$S = 80$'],
      ['Con letras, la fórmula.', {}, '$S_n = a_1\\tfrac{r^n - 1}{r - 1}$'],
    ], '$S_n = a_1\\tfrac{r^n - 1}{r - 1}$, si $r \\neq 1$.'),
    xpFila('$S = 2 + 8 + 32 + 128$. Pon el término que sobra al hacer 4S, la resta y S.', ['sobra', '3S', 'S'], ['512', '510', '170'], ['128', '168', '126'], 'El siguiente sería 128 por 4; menos 2.', '$510 \\div 3 = 170$.')],
    ['Infinitos y una suma finita', xpMira('dibujo', 'Segunda idea: si cada pedazo se encoge, infinitos pedazos **caben**.', { dib: cinta, v: { n: 0, p: '' }, alto: 160 }, [
      ['Una cinta de largo 1. Se pinta la mitad.', { n: 1 }, '$\\tfrac12$'],
      ['Luego la mitad de lo que falta.', { n: 2 }, '$\\tfrac12 + \\tfrac14$'],
      ['Y así. Siempre falta, pero cada vez menos.', { n: 6 }, '$\\tfrac12 + \\tfrac14 + \\tfrac18 + \\cdots$'],
      ['El total al que se acerca es 1.', { n: 8, p: '→ 1' }, '$S = 1$'],
      ['Si la razón está entre −1 y 1, hay suma.', {}, '$S = \\tfrac{a_1}{1 - r}$'],
    ], 'Si $|r| < 1$: $S = \\tfrac{a_1}{1 - r}$.'),
    xpFila('$12 + 3 + \\tfrac34 + \\cdots$ Pon r, $1 - r$ y la suma.', ['r', '1 − r', 'suma'], ['1/4', '3/4', '16'], ['4', '9', '48'], 'Cada uno es un cuarto del anterior.', '$12 \\div \\tfrac34 = 16$.')],
    ['Decimales periódicos', xpMira('dibujo', 'Tercera idea: un decimal periódico es una **suma infinita**.', { dib: (v, K) => XM.pasos(K, v, ['0.27 27 27…', '27/100 + 27/10 000 + …', 'a = 27/100,  r = 1/100', '27/99 = 3/11'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Cero punto 27 que se repite.', {}, '$0.\\overline{27}$'],
      ['Es 27 centésimas, más 27 diezmilésimas…', { n: 2 }, '$\\tfrac{27}{100} + \\tfrac{27}{10\\,000} + \\cdots$'],
      ['Geométrica de razón un centésimo.', { n: 3 }, '$r = \\tfrac{1}{100}$'],
      ['La suma es 27 sobre 99.', { n: 4 }, '$\\tfrac{27}{99} = \\tfrac{3}{11}$'],
    ], 'El período sobre tantos nueves como cifras.'),
    xpFila('Pon cada fracción simplificada.', ['0.555…', '0.3636…'], ['5/9', '4/11'], ['55/100', '36/90', '5/10'], 'Cinco novenos y treinta y seis noventa y nueveavos.', '$\\tfrac59$ y $\\tfrac{36}{99} = \\tfrac{4}{11}$.')],
    ['Ahora sí, un problema', xpFila('Un péndulo recorre 20 cm y cada vez el 80 % del anterior. Pon $1 - r$ y el recorrido total (cm).', ['1 − r', 'total'], ['0.2', '100'], ['0.8', '25', '36'], 'La razón es 0.8.', '$20 \\div 0.2 = 100$ cm.')],
  ], 'Multiplicar y restar cancela; con $|r| < 1$ hay suma infinita.');

  // ---------------------------------------------------------------------------------------------------------- alg-15
  xpLec('alg-15', [
    ['Sumar con instrucciones', xpMira('dibujo', 'Empecemos por la idea: **sigma** es una orden de sumar.', { dib: (v, K) => [1, 2, 3, 4].map((k, i) => K.f(v.n - i, K.r(30 + i * 74, 70, 60, 46, 'fa', 8) + K.t(60 + i * 74, 98, `${3 * k - 1}`, 'b') + K.t(60 + i * 74, 60, `k = ${k}`, 's tm'))).join('') + K.t(170, 30, 'Σ (3k − 1),  k de 1 a 4', 'b ta'), v: { n: 0 }, alto: 135 }, [
      ['Abajo dice dónde empieza k; arriba, dónde acaba.', {}, '$\\sum_{k=1}^{4}(3k - 1)$'],
      ['k vale 1: el término es 2.', { n: 1 }, '$3 \\cdot 1 - 1 = 2$'],
      ['k vale 2, 3 y 4: 5, 8 y 11.', { n: 4 }, '$5, 8, 11$'],
      ['Al final se suman todos.', {}, '$2 + 5 + 8 + 11 = 26$'],
      ['La letra k no importa: puede ser cualquiera.', {}, '$\\sum_{j=1}^{4}(3j - 1)$'],
    ], 'Sigma: pon cada k en la receta y suma.'),
    xpFila('$\\sum_{k=2}^{4} k^2$: pon los términos y la suma.', ['k = 2', 'k = 3', 'k = 4', 'suma'], ['4', '9', '16', '29'], ['30', '6', '8'], 'Empieza en 2, no en 1.', '$4 + 9 + 16 = 29$.')],
    ['Partir y sacar', xpMira('dibujo', 'Segunda idea: la suma se **parte** y el número sale.', { dib: (v, K) => XM.pasos(K, v, ['Σ (2k + 5), 10 términos', '2 Σ k + Σ 5', '2 · 55 + 10 · 5', '160'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Diez términos, cada uno con un 2k y un 5.', {}, '$\\sum_{k=1}^{10}(2k + 5)$'],
      ['Se agrupan: el 2 sale y los cincos se suman aparte.', { n: 2 }, '$2\\sum k + \\sum 5$'],
      ['La suma de 1 a 10 es 55; diez cincos, 50.', { n: 3 }, '$\\sum_{k=1}^{n} k = \\tfrac{n(n+1)}{2}$'],
      ['En total son 160.', { n: 4 }, '$110 + 50$'],
      ['Un producto no se parte: solo sumas.', {}, '$\\sum ab \\neq \\sum a \\sum b$'],
    ], '$\\sum (ca_k + d) = c\\sum a_k + nd$.'),
    xpFila('$\\sum_{k=1}^{8}(3k + 2)$: pon $\\sum k$, la suma de los 2 y el total.', ['Σ k', 'los 2', 'total'], ['36', '16', '124'], ['52', '2', '110'], 'De 1 a 8; ocho veces 2; y tres por la primera.', '$3 \\cdot 36 + 16 = 124$.')],
    ['Telescopios y productos', xpMira('dibujo', 'Tercera idea: a veces los de en medio **se cancelan**; y con Π se multiplica.', { dib: (v, K) => XM.pasos(K, v, ['(1/1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4)', '= 1 − 1/4 = 3/4', 'Π k, de 1 a 5 = 5! = 120'], 44, 38, 'x'), v: { n: 1 }, alto: 150 }, [
      ['Cada pedazo quita lo que el siguiente pone.', {}, '$\\sum (\\tfrac1k - \\tfrac{1}{k+1})$'],
      ['Sobreviven el primero y el último.', { n: 2 }, '$1 - \\tfrac14$'],
      ['La letra pi mayúscula manda a multiplicar.', { n: 3 }, '$\\prod_{k=1}^{5} k = 5!$'],
      ['El factorial de 0 es 1, por acuerdo.', {}, '$0! = 1$'],
    ], 'Telescópica: quedan las puntas. $\\prod$ multiplica.'),
    xpFila('$\\sum_{k=1}^{9}(\\tfrac1k - \\tfrac{1}{k+1})$: pon el primero, lo que se resta al final y la suma.', ['queda', 'se resta', 'suma'], ['1', '1/10', '9/10'], ['1/9', '8/9', '0'], 'El último término lleva 1/(9 + 1).', '$1 - \\tfrac{1}{10}$.')],
    ['Ahora sí, un problema', xpFila('Un taller paga 4k + 1 miles el día k, durante 6 días. Pon $\\sum k$, la suma de los 1 y el pago total.', ['Σ k', 'los 1', 'total'], ['21', '6', '90'], ['25', '85', '24'], 'De 1 a 6 la suma es 21.', '$4 \\cdot 21 + 6 = 90$.')],
  ], 'Sigma ordena sumar: se parte, se saca el número y a veces se cancela.');
}
;
//#archivo js/explora-alg-0a.js
// Álgebra · alg-0a «¿Qué es un conjunto? Notación y pertenencia»: explicación interactiva que reemplaza el video
// (spec 2026-11-23-explora-leccion-interactiva; motor en js/explora.js, escena «conjunto»). Mismo formato que pu-cm-1:
// cada capítulo abre con una explicación que corre sola (`muestra`), sigue «tu turno» y el problema va al final.
// Los ejemplos (bandera, semáforo, vocales, dado, pares, COLOMBIA, TOMATE, heladería) no salen en los ejercicios.
EXPLORA['alg-0a'] = {
  caps: ['¿Qué es un conjunto?', 'Pertenecer', 'Dos formas de escribirlo', 'Sin repetidos ni orden', 'Ahora sí, un problema'],
  pasos: [
    // ---- ¿Qué es un conjunto? ----
    { cap: 0, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'B', items: ['verde', 'amarillo', 'negro', 'azul', 'blanco', 'rojo'] },
      texto: 'Empecemos por la idea más básica del álgebra: **qué es un conjunto**.',
      momentos: [
        { dice: 'Un conjunto es una colección de objetos. A cada objeto que está en él se le llama **elemento**.' },
        { pon: ['amarillo', 'azul', 'rojo'], cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: 'B: los colores de la bandera de Colombia. Entran el amarillo, el azul y el rojo.' },
        { marca: 'verde', cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: '¿Y el verde? No está en la bandera, así que se queda afuera. Nadie lo discute.' },
        { cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: 'Eso es estar **bien definido**: ante cualquier objeto se sabe, sin discutir, si entra o no.' },
        { cuenta: '$B = \\{\\text{amarillo}, \\text{azul}, \\text{rojo}\\}$',
          dice: '«Los colores más bonitos» no sería un conjunto: cada persona elegiría distinto.' },
      ],
      idea: 'Un conjunto es una colección **bien definida** de objetos; cada objeto es un **elemento**.' },
    { cap: 0, tipo: 'conjunto', nombre: 'S', items: ['azul', 'rojo', 'negro', 'verde', 'blanco', 'amarillo'], meta: ['rojo', 'amarillo', 'verde'],
      texto: '**Tu turno.** Arma S, el conjunto de las luces de un semáforo: arrastra adentro cada color que le corresponde.',
      idea: 'Una regla clara decide qué entra: $S = \\{\\text{rojo}, \\text{amarillo}, \\text{verde}\\}$.' },

    // ---- Pertenecer ----
    { cap: 1, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'V', items: ['m', 'a', 'e', 's', 'i', 'o', 'u', 'r'] },
      texto: 'Segunda idea: **pertenecer**. Para decir si algo está o no en un conjunto hay un símbolo.',
      momentos: [
        { pon: ['a', 'e', 'i', 'o', 'u'], cuenta: '$V = \\{a, e, i, o, u\\}$', dice: 'V es el conjunto de las vocales. Sus cinco elementos entran uno por uno.' },
        { marca: 'e', cuenta: '$e \\in V$', dice: 'La e está adentro. Se escribe e ∈ V y se lee «e pertenece a V».' },
        { marca: 'm', cuenta: '$m \\notin V$', dice: 'La m se queda afuera: m ∉ V, «m no pertenece a V». Es el mismo símbolo, tachado.' },
        { cuenta: '$e \\in V, \\quad m \\notin V$', dice: 'Costumbre: los conjuntos se nombran con mayúscula y sus elementos, casi siempre, con minúscula.' },
      ],
      idea: '$\\in$ se lee «pertenece a» y $\\notin$, «no pertenece a». Los conjuntos se nombran con mayúscula.' },
    { cap: 1, tipo: 'conjunto', nombre: 'D', items: ['1', '2', '3', '4', '5', '6'], meta: ['5', '6'],
      texto: '**Tu turno.** D es el conjunto de las caras de un dado mayores que 4. Arrastra adentro solo las que pertenecen.',
      idea: '$5 \\in D$ y $6 \\in D$, pero $4 \\notin D$.' },

    // ---- Dos formas de escribirlo ----
    { cap: 2, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'P', items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] },
      texto: 'Tercera idea: un conjunto se puede escribir **de dos formas**.',
      momentos: [
        { dice: 'La primera forma es la más directa: nombrar todos sus elementos, uno por uno.' },
        { pon: ['2', '4', '6', '8'], cuenta: '$P = \\{2, 4, 6, 8\\}$', dice: 'Por **extensión**: los elementos entre llaves y separados por comas.' },
        { cuenta: '$P = \\{x : x \\text{ es par},\\ 0 < x < 10\\}$', dice: 'Por **comprensión**: se escribe la regla que cumplen. Los dos puntos se leen «tal que».' },
        { marca: '6', cuenta: '$6 \\in P$', dice: 'Se lee: «los x tales que x es par y está entre 0 y 10». El 6 cumple: está adentro.' },
        { marca: '7', cuenta: '$7 \\notin P$', dice: 'El 7 no es par: no cumple la regla, así que se queda afuera.' },
        { cuenta: '$\\{x : x \\text{ es par}\\}$', dice: 'Si quitamos el tope de 10 es otro conjunto, con infinitos pares: solo se puede escribir por comprensión.' },
      ],
      idea: 'Por **extensión** se nombran los elementos; por **comprensión** se da la regla. «:» se lee «tal que».' },
    { cap: 2, tipo: 'conjunto', nombre: 'T', items: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], meta: ['3', '6', '9'],
      texto: '**Tu turno.** Escribe por extensión $T = \\{x : x \\text{ es múltiplo de } 3,\\ 0 < x < 10\\}$ arrastrando adentro sus elementos.',
      idea: 'Por extensión, $T = \\{3, 6, 9\\}$.' },

    // ---- Sin repetidos ni orden ----
    { cap: 3, tipo: 'muestra', escena: 'conjunto', en: { nombre: 'K', items: ['c', 'o', 'l', 'o', 'm', 'b', 'i', 'a'] },
      texto: 'Cuarta idea: en un conjunto **nada se repite** y **el orden no importa**.',
      momentos: [
        { dice: 'K es el conjunto de las letras de la palabra COLOMBIA. Metamos las letras una por una.' },
        { pon: ['c', 'o', 'l'], cuenta: '$K = \\{c, o, l\\}$', dice: 'Entran la c, la o y la l…' },
        { pon: ['o'], cuenta: '$K = \\{c, o, l\\}$', dice: '¡Otra o! Ya estaba adentro, así que se funde con la primera: en un conjunto nada se repite.' },
        { pon: ['m', 'b', 'i', 'a'], cuenta: '$K = \\{c, o, l, m, b, i, a\\}$', dice: 'Entran las demás. La palabra tiene ocho letras, pero el conjunto tiene siete elementos.' },
        { mezcla: true, cuenta: '$\\{c, o, l, m, b, i, a\\} = \\{a, b, c, i, l, m, o\\}$', dice: 'Si los ordenamos de otra forma, sigue siendo el mismo conjunto: el orden no importa.' },
        { cuenta: '$n(K) = 7$', dice: 'El número de elementos se llama **cardinal** y se escribe n(K). Aquí, n(K) = 7.' },
      ],
      idea: 'En un conjunto no hay repetidos ni importa el orden. El **cardinal** $n(A)$ es cuántos elementos tiene.' },
    { cap: 3, tipo: 'conjunto', nombre: 'R', items: ['t', 'o', 'u', 'm', 'a', 't', 'p', 'e'], meta: ['t', 'o', 'm', 'a', 'e'], cardinal: true,
      texto: '**Tu turno.** Arma R, el conjunto de las letras de TOMATE. Mete las dos t y mira qué pasa; deja afuera lo que no está en la palabra.',
      idea: '$R = \\{t, o, m, a, e\\}$ y $n(R) = 5$, aunque TOMATE tenga seis letras.' },
    { cap: 3, tipo: 'casillas', filas: [{ tex: '$n(\\{1, 1, 2\\})$', r: '2' }, { tex: '$n(\\{x, y, z, x\\})$', r: '3' }], fichas: ['3', '2', '4', '1'],
      pista: 'Cuenta los elementos distintos: lo repetido cuenta una sola vez.',
      texto: 'El cardinal no cuenta repetidos. Toca la ficha con el cardinal de cada conjunto.',
      idea: 'Lo repetido cuenta una sola vez: $n(\\{1, 1, 2\\}) = 2$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'conjunto', nombre: 'H', items: ['fresa', 'vainilla', 'coco', 'fresa', 'mora', 'vainilla', 'limón', 'fresa', 'mora'], meta: ['fresa', 'vainilla', 'mora'], cardinal: true,
      texto: 'Pedidos de hoy en una heladería: fresa, vainilla, fresa, mora, vainilla, fresa, mora. Arma H, el conjunto de sabores vendidos. ¿Cuántos son?',
      idea: 'Siete pedidos, pero $H = \\{\\text{fresa}, \\text{vainilla}, \\text{mora}\\}$ y $n(H) = 3$.' },
    { cap: 4, tipo: 'cierre', clave: 'alg-0a', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Conjunto y elemento, $\\in$ y $\\notin$, extensión y comprensión, sin repetidos ni orden, y el cardinal.' },
  ],
};
