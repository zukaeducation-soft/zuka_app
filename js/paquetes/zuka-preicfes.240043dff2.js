// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/grafica-relacion.js
// Grafica la relación (lección 1.2): en una cuadrícula hay un punto dado fijo; se arrastran en
// vertical los puntos de otras x para que la relación sea directa (y = kx) o inversa (xy = k).
// Al bloquear se dibuja la recta o la hipérbola correcta.
// params = { kind: 'directa'|'inversa', k, given: [[x, y]], xs: number[], tol, xmax, ymax }
// state = { ys: [número | null] }  (altura del punto sobre cada x de xs)

GAMES['grafica-relacion'] = (() => {
  const f = (params, x) => (params.kind === 'directa' ? params.k * x : params.k / x);

  function grade(state, params) {
    const ok = params.xs.every((x, i) => state.ys?.[i] != null && Math.abs(state.ys[i] - f(params, x)) <= params.tol);
    const rule = params.kind === 'directa' ? `y = ${params.k}x` : `xy = ${params.k}`;
    return { ok, solution: `$${rule}$: ${params.xs.map(x => `$(${x}, ${+f(params, x).toFixed(2)})$`).join(', ')}` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ys = params.xs.map(() => null);
    let locked = false, W = 0, H = 0, mx = null, my = null, drag = -1;
    const STEP = 0.25;

    function layout(w, h) {
      W = w; H = h;
      mx = lineMap(0, params.xmax, 40, w - 16);
      my = lineMap(0, params.ymax, h - 34, 44);
    }
    const px = (x, y) => [mx.toPx(x), my.toPx(y)];
    // Un punto sin colocar descansa en el eje x; así se ve dónde falta.
    const yOf = i => (ys[i] === null ? 0 : ys[i]);

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        p.noStroke(); p.fill(C.mute); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(13);
        drawKicker(p, C, params.kind === 'directa' ? 'Mueve los puntos: que sea directa' : 'Mueve los puntos: que sea inversa', W / 2, 14, { center: true });
        p.noStroke(); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD);
        p.fill(C.ink); p.textSize(12);
        p.text(params.kind === 'directa' ? 'y/x constante · recta por el origen' : 'x·y constante · si x se duplica, y se reduce a la mitad', W / 2, 25);
        // Cuadrícula y ejes.
        for (let x = 0; x <= params.xmax; x++) { p.stroke(x ? C.line + '66' : C.mute); p.strokeWeight(x ? 1 : 2); p.line(...px(x, 0), ...px(x, params.ymax)); }
        for (let y = 0; y <= params.ymax; y++) { p.stroke(y ? C.line + '66' : C.mute); p.strokeWeight(y ? 1 : 2); p.line(...px(0, y), ...px(params.xmax, y)); }
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textAlign(p.CENTER, p.TOP);
        for (let x = 0; x <= params.xmax; x += 2) p.text(x, mx.toPx(x), my.toPx(0) + 5);
        p.textAlign(p.RIGHT, p.CENTER);
        for (let y = 0; y <= params.ymax; y += 2) p.text(y, mx.toPx(0) - 6, my.toPx(y));
        if (locked) {
          // Curva correcta.
          p.noFill(); p.stroke(C.ok); p.strokeWeight(2.5); p.beginShape();
          for (let x = params.kind === 'directa' ? 0 : params.k / params.ymax; x <= params.xmax; x += 0.05) { const y = f(params, x); if (y <= params.ymax) p.vertex(...px(x, y)); }
          p.endShape();
        }
        // Punto dado (fijo) y puntos movibles.
        params.given.forEach(([x, y]) => {
          drawDot(p, C, ...px(x, y), 14, C.sun);
          p.fill(C.ink); p.textSize(11); p.textAlign(p.LEFT, p.BOTTOM); p.text(`(${x}, ${y})`, mx.toPx(x) + 10, my.toPx(y) - 6);
        });
        params.xs.forEach((x, i) => {
          const [cx, cy] = px(x, yOf(i));
          const good = ys[i] !== null && Math.abs(ys[i] - f(params, x)) <= params.tol;
          const col = locked ? (good ? C.ok : C.bad) : (i === drag ? C.ink : ys[i] === null ? C.mute : C.brand);
          p.stroke(col); p.strokeWeight(1.5); p.line(cx, my.toPx(0), cx, cy);
          p.noStroke(); p.fill(col); p.circle(cx, cy, 18);
          p.fill(C.bg); p.textSize(10); p.textAlign(p.CENTER, p.CENTER); p.text(x, cx, cy + 1);
          if (ys[i] !== null) { p.fill(C.ink); p.textSize(11); p.textAlign(p.LEFT, p.BOTTOM); p.text(`(${x}, ${ys[i]})`, cx + 10, cy - 6); }
        });
      };

      p.mousePressed = () => {
        if (locked) return;
        drag = nearest(params.xs.map((x, i) => ({ x: mx.toPx(x), y: my.toPx(yOf(i)) })), p.mouseX, p.mouseY, 22);
        if (drag >= 0) { api.sfx?.tap?.(); return false; }
      };
      p.mouseDragged = () => {
        if (drag < 0) return;
        ys[drag] = Math.round(p.constrain(my.toVal(p.mouseY), 0, params.ymax) / STEP) * STEP;
        return false;
      };
      p.mouseReleased = () => {
        if (drag < 0) return;
        drag = -1;
        api.ready(ys.every(y => y !== null));
        return false;
      };
    }, 1.0);

    return {
      loaded: m.ready,
      getState: () => ({ ys: [...ys] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/mezcla.js
// El químico (lección 1.3): un vaso con 40 g de alcohol al que se le añade agua con un grifo
// (de 10 en 10 g); un medidor muestra el % de alcohol de la mezcla en vivo. Hay que dejar la
// mezcla con el porcentaje pedido (ejercicio 1.12 del texto guía).
// params = { solute, target, step, max }   state = { water }

GAMES['mezcla'] = (() => {
  const pctOf = (p, water) => (p.solute / (p.solute + water)) * 100;
  const answerOf = p => (100 * p.solute) / p.target - p.solute;

  function grade(state, params) {
    const ok = Math.abs(pctOf(params, state.water) - params.target) < 1e-9;
    const total = (100 * params.solute) / params.target;
    return { ok, solution: `$\\dfrac{100 \\cdot ${params.solute}}{${params.target}} = ${total}$ g de mezcla, así que ${answerOf(params)} g de agua` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { water: 0 };
    let locked = false, W = 0, H = 0, beaker = null, gauge = null, buttons = [], timer = null;
    const WATER = '#5FB8FF', ALCOHOL = C.R;

    function layout(w, h) {
      W = w; H = h;
      beaker = { x: w * 0.1, y: 56, w: w * 0.42, h: h * 0.56 };
      gauge = { x: w * 0.68, y: 56, w: 26, h: h * 0.56 };
      buttons = [
        { d: params.step, x: beaker.x, y: beaker.y + beaker.h + 42, w: beaker.w / 2 - 4, h: 36, t: `+ ${params.step} g` },
        { d: -params.step, x: beaker.x + beaker.w / 2 + 4, y: beaker.y + beaker.h + 42, w: beaker.w / 2 - 4, h: 36, t: `− ${params.step} g` },
      ];
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    function add(d) {
      st.water = Math.max(0, Math.min(params.max, st.water + d));
      api.ready(st.water > 0);
    }
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const pct = pctOf(params, st.water), good = Math.abs(pct - params.target) < 1e-9 && !VELO.on;
        const col = locked ? (good ? C.ok : C.bad) : good ? C.ok : C.brand;
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(14);
        p.text(`${params.solute} g de alcohol. Añade agua hasta que sea el ${params.target} % de la mezcla`, 12, 8, W - 24, 40);
        // Vaso: capa de alcohol y capa de agua (escala: max + solute = vaso lleno).
        const full = params.max + params.solute, unit = beaker.h / full;
        const hA = params.solute * unit, hW = st.water * unit, bottom = beaker.y + beaker.h;
        p.noStroke(); p.fill(ALCOHOL); p.rect(beaker.x, bottom - hA, beaker.w, hA);
        p.fill(WATER); p.rect(beaker.x, bottom - hA - hW, beaker.w, hW);
        p.stroke(C.ink); p.strokeWeight(3); p.noFill(); p.rect(beaker.x, beaker.y, beaker.w, beaker.h, 0, 0, 14, 14);
        for (let g = 100; g < full; g += 100) { const y = bottom - g * unit; p.strokeWeight(1); p.line(beaker.x, y, beaker.x + 10, y); }
        p.noStroke(); p.fill(C.ink); p.textSize(12); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD);
        p.text(`alcohol ${params.solute} g`, beaker.x + 14, bottom - hA / 2);
        if (st.water > 0) p.text(`agua ${st.water} g`, beaker.x + 14, bottom - hA - hW / 2);
        p.fill(C.mute); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.NORMAL); p.textSize(11);
        p.text(`mezcla: ${params.solute + st.water} g`, beaker.x + beaker.w / 2, bottom + 8);
        // Grifo sobre el vaso.
        p.stroke(C.mute); p.strokeWeight(6); p.line(beaker.x + beaker.w / 2, beaker.y - 22, beaker.x + beaker.w / 2, beaker.y - 6);
        if (timer) { p.stroke(WATER); p.strokeWeight(4); p.line(beaker.x + beaker.w / 2, beaker.y - 4, beaker.x + beaker.w / 2, bottom - hA - hW); }
        // Medidor de % de alcohol.
        p.stroke(C.line); p.strokeWeight(2); p.fill(C.card); p.rect(gauge.x, gauge.y, gauge.w, gauge.h, 8);
        const yOf = v => gauge.y + gauge.h - (v / 100) * gauge.h;
        p.noStroke(); p.fill(col); p.rect(gauge.x + 3, yOf(pct), gauge.w - 6, gauge.y + gauge.h - yOf(pct) - 3, 4);
        p.stroke(C.ok); p.strokeWeight(2); p.line(gauge.x - 8, yOf(params.target), gauge.x + gauge.w + 8, yOf(params.target));
        p.noStroke(); p.fill(C.ok); p.textSize(11); p.textAlign(p.LEFT, p.CENTER);
        // Si «meta 20 %» no cabe a la derecha del medidor, queda solo el número.
        const meta = `meta ${params.target} %`;
        p.text(gauge.x + gauge.w + 12 + p.textWidth(meta) > W - 4 ? `${params.target} %` : meta, gauge.x + gauge.w + 12, yOf(params.target));
        p.fill(col); p.textSize(20); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD);
        p.text(`${pct.toFixed(1)} %`, gauge.x + gauge.w / 2, gauge.y + gauge.h + 8);
        p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL); p.text('de alcohol', gauge.x + gauge.w / 2, gauge.y + gauge.h + 32);
        [0, 50, 100].forEach(v => { p.fill(C.mute); p.textSize(10); p.textAlign(p.RIGHT, p.CENTER); p.text(v, gauge.x - 4, yOf(v)); });
        buttons.forEach(b => {
          drawTile(p, C, b, b.t, { fill: locked ? C.card : C.sky, ink: locked ? C.mute : undefined, size: 14 });
        });
        p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.text(locked && !good ? `Hacían falta ${answerOf(params)} g de agua` : 'Toca o mantén el grifo para añadir agua', W / 2, H - 12);
      };

      p.mousePressed = () => {
        if (locked) return;
        const b = buttons.find(b => inside(b, p.mouseX, p.mouseY));
        if (!b) return;
        add(b.d); api.sfx?.tap?.();
        stop(); timer = setInterval(() => add(b.d), 140);
        return false;
      };
      p.mouseReleased = () => { if (!timer) return; stop(); return false; };
    }, 1.15);

    return {
      loaded: m.ready,
      getState: () => ({ ...st }),
      lock() { locked = true; stop(); },
      destroy: () => { stop(); m.remove(); },
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/cadena-cambios.js
// La cadena de sellos (Álgebra 1.3, cambios porcentuales sucesivos): una etiqueta de precio 100 recorre una
// banda con dos estaciones de sello. Se tocan dos sellos de la bandeja (+10 %, −50 %…) para ponerlos en las
// estaciones y la etiqueta muestra el precio tras cada uno. Meta: que el efecto total sea el pedido. Los
// cambios se multiplican: +10 % y +10 % suben 21 %, no 20 %; +50 % y −50 % dejan el 75 %.
// params = { stamps: [porcentajes], rounds: [{ goal: factor total, text }] }   state = { picks: [[i, j]] }

GAMES['cadena-cambios'] = (() => {
  const fac = s => 1 + s / 100;
  const factorOf = (stamps, pk) => pk.reduce((f, i) => f * fac(stamps[i]), 1);
  let good = (stamps, pk, r) => !!pk && pk.length === 2 && pk[0] !== pk[1] && Math.abs(factorOf(stamps, pk) - r.goal) < 1e-9;
  const pct = s => `${s > 0 ? '+' : '−'}${Math.abs(s)} %`;
  const num = v => String(+v.toFixed(2));
  function example(stamps, r) {
    for (let i = 0; i < stamps.length; i++) for (let j = 0; j < stamps.length; j++) if (good(stamps, [i, j], r)) return [i, j];
    return null;
  }

  good = velo(good);
  function grade(state, params) {
    const S = params.stamps;
    const ok = params.rounds.every((r, i) => good(S, state.picks?.[i], r));
    const solution = params.rounds.map(r => { const e = example(S, r); return e ? `${pct(S[e[0]])} y ${pct(S[e[1]])}: ×${num(fac(S[e[0]]))} · ×${num(fac(S[e[1]]))} = ×${num(r.goal)}` : ''; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds, S = params.stamps;
    const st = { picks: R.map(() => []) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], tray = [], stations = [], tagX = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      const sw = Math.min(90, (w - 60) / 3);
      stations = [0, 1].map(k => ({ x: w * (k ? 0.68 : 0.32) - sw / 2, y: 110, w: sw, h: 44 }));
      const cols = 4, tw = (w - 28 - (cols - 1) * 8) / cols, th = 40, rows = Math.ceil(S.length / cols), y0 = h - rows * (th + 8) - 26;
      tray = S.map((_, i) => ({ x: 14 + (i % cols) * (tw + 8), y: y0 + Math.floor(i / cols) * (th + 8), w: tw, h: th }));
    }
    const ready = () => api.ready(st.picks.every(pk => pk.length === 2));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function stamp(b, s, col) {
        // Sello relleno: menta si sube, coral si baja.
        drawTile(p, C, b, pct(s), { fill: s > 0 ? C.mint : C.coral, size: 17, ring: col === C.brand ? C.sun : null });
      }
      function tag(x, y, v, col) {
        p.stroke(col); p.strokeWeight(2.5); p.fill(C.cream);
        p.beginShape(); p.vertex(x - 30, y - 18); p.vertex(x + 22, y - 18); p.vertex(x + 34, y); p.vertex(x + 22, y + 18); p.vertex(x - 30, y + 18); p.endShape(p.CLOSE);
        p.noStroke(); p.fill(col); p.circle(x + 20, y, 5);
        p.fill(inkOn(C.cream, C.ink)); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fitText(p, num(v), x - 5, y + 1, 50, 15);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], pk = st.picks[cur], ok = good(S, pk, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (good(S, st.picks[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.picks[i].length === 2 ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(15); p.textAlign(p.LEFT, p.TOP);
        p.text(r.text, 14, 48, W - 28, 48);
        // Banda transportadora con las dos estaciones
        const beltY = 200;
        p.stroke(C.mute); p.strokeWeight(3); p.line(14, beltY + 22, W - 14, beltY + 22);
        for (let k = 0; k < 14; k++) { const x = 14 + ((k * 28 + (locked ? 0 : p.frameCount * 0.6)) % (W - 28)); p.strokeWeight(1.5); p.line(x, beltY + 26, x - 6, beltY + 34); }
        stations.forEach((b, k) => {
          p.stroke(C.mute); p.strokeWeight(2); p.line(b.x + b.w / 2, b.y + b.h, b.x + b.w / 2, beltY - 22);
          if (pk[k] != null) stamp(b, S[pk[k]], C.brand);
          else { p.noFill(); p.stroke(C.line); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 4]); p.rect(b.x, b.y, b.w, b.h, 10); p.drawingContext.setLineDash([]); p.noStroke(); p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER); p.text(`sello ${k + 1}`, b.x + b.w / 2, b.y + b.h / 2); }
        });
        // Etiquetas: al inicio, tras el sello 1 y tras el sello 2
        const v1 = pk[0] != null ? 100 * fac(S[pk[0]]) : null, v2 = pk.length === 2 ? v1 * fac(S[pk[1]]) : null;
        tag(44, beltY, 100, C.mute);
        if (v1 != null) tag(W / 2, beltY, v1, C.Z);
        if (v2 != null) tag(W - 50, beltY, v2, ok ? C.ok : C.N);
        // Efecto total
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER);
        if (v2 != null) {
          const d = +(v2 - 100).toFixed(2);
          p.fill(ok ? C.ok : C.ink); p.textStyle(p.BOLD); p.textSize(16);
          p.text(`total: ×${num(v2 / 100)}  (${d === 0 ? 'igual' : d > 0 ? `sube ${num(d)} %` : `baja ${num(-d)} %`})`, W / 2, beltY + 54);
        } else { p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.text('Toca dos sellos de la bandeja', W / 2, beltY + 54); }
        tray.forEach((b, i) => {
          if (pk.includes(i)) drawSlot(p, C, b);
          else stamp(b, S[i], locked ? C.line : C.mute);
        });
        p.noStroke(); p.textSize(11); p.textAlign(p.CENTER, p.CENTER);
        const e = locked && !ok ? example(S, r) : null;
        if (e) { p.fill(C.ok); p.textStyle(p.BOLD); p.text(`Por ejemplo: ${pct(S[e[0]])} y luego ${pct(S[e[1]])}`, W / 2, H - 12); }
        else { p.fill(C.mute); p.textStyle(p.NORMAL); p.text('Toca un sello puesto para quitarlo', W / 2, H - 12); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const pk = st.picks[cur];
        const s = stations.findIndex((b, k) => pk[k] != null && hitBox(b, p.mouseX, p.mouseY));
        if (s >= 0) { pk.splice(s, 1); api.sfx?.tap?.(); ready(); return false; }
        const i = tray.findIndex((b, i) => !pk.includes(i) && hitBox(b, p.mouseX, p.mouseY));
        if (i >= 0 && pk.length < 2) { pk.push(i); api.sfx?.tap?.(); ready(); return false; }
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ picks: st.picks.map(pk => [...pk]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, factorOf };
})();
;
//#archivo js/games/encuesta-venn.js
// La encuesta en Venn (Álgebra 0, cardinal de la unión): una encuesta dice cuántas personas hay en total, cuántas
// están en A, en B y en los dos. En cada zona del diagrama hay un contador con − / +: hay que poner cuántas
// personas quedan SOLO en A, en A ∩ B, SOLO en B y en ninguno. Debajo se ven en vivo las sumas de cada círculo y
// del total, para comparar con los datos. n(A ∪ B) = n(A) + n(B) − n(A ∩ B).
// params = { rounds: [{ text, labels: [A, B], total, a, b, both }] }   state = { counts: [[soloA, ambos, soloB, ninguno]] }

GAMES['encuesta-venn'] = (() => {
  const target = r => [r.a - r.both, r.both, r.b - r.both, r.total - r.a - r.b + r.both];
  const good = (c, r) => !!c && JSON.stringify(c) === JSON.stringify(target(r));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => good(state.counts?.[i], r));
    const solution = params.rounds.map(r => { const t = target(r), [la, lb] = r.labels || ['A', 'B']; return `solo ${la}: ${t[0]}, ambos: ${t[1]}, solo ${lb}: ${t[2]}, ninguno: ${t[3]}`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { counts: R.map(() => [0, 0, 0, 0]) };
    const touched = R.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], venn = null, ctrls = [], hold = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      const top = 112, vh = h - top - 132, rr = Math.min((w - 40) / 3.2, vh / 2.25);
      venn = { box: { x: 12, y: top, w: w - 24, h: vh }, r: rr, ca: { x: w / 2 - rr * 0.6, y: top + vh / 2 + 6 }, cb: { x: w / 2 + rr * 0.6, y: top + vh / 2 + 6 } };
      const { ca, cb, box } = venn, mid = (ca.x + cb.x) / 2;
      const spots = [{ x: ca.x - rr * 0.5, y: ca.y }, { x: mid, y: ca.y }, { x: cb.x + rr * 0.5, y: cb.y }, { x: w / 2 + 50, y: box.y + box.h + 22 }];
      ctrls = spots.map((s, i) => (i < 3
        ? { c: s, minus: { x: s.x - 31, y: s.y + 12, w: 29, h: 28 }, plus: { x: s.x + 2, y: s.y + 12, w: 29, h: 28 } }
        // «ninguno» va debajo del diagrama, en su propia fila: número entre − y +.
        : { c: { x: s.x, y: s.y + 6 }, minus: { x: s.x - 52, y: s.y - 14, w: 29, h: 28 }, plus: { x: s.x + 23, y: s.y - 14, w: 29, h: 28 } }));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        repeat();
        p.background(C.bg);
        const r = R[cur], cnt = st.counts[cur], t = target(r), [A, B] = SK.sets(C);
        drawTabs(p, C, tabs, cur, i => (locked ? (good(st.counts[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textStyle(p.NORMAL); p.textSize(13); p.textAlign(p.LEFT, p.TOP);
        p.text(r.text, 14, 46, W - 28, 62);
        const { box, ca, cb } = venn;
        SK.panel(p, C, box, { u: true });
        SK.membrane(p, C, ca.x, ca.y, venn.r, venn.r, A.line);
        SK.membrane(p, C, cb.x, cb.y, venn.r, venn.r, B.line);
        p.noStroke(); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        p.fill(A.ink); fitText(p, r.labels[0], ca.x - venn.r * 0.35, ca.y - venn.r * 1.1, venn.r * 1.3, 13);
        p.fill(B.ink); fitText(p, r.labels[1], cb.x + venn.r * 0.35, cb.y - venn.r * 1.1, venn.r * 1.3, 13);
        ctrls.forEach((k, i) => {
          const bad = locked && cnt[i] !== t[i];
          if (locked) drawPill(p, C, String(cnt[i]), k.c.x, k.c.y - 6, bad ? C.bad : C.ok, 17);   // al calificar, en píldora: se lee sobre cualquier círculo
          else SK.serif(p, String(cnt[i]), k.c.x, k.c.y - 7, 23, C.ink);
          if (i === 3) { p.fill(C.mute); p.textSize(12); p.textStyle(p.NORMAL); p.textAlign(p.RIGHT, p.CENTER); p.text('fuera de los dos:', k.minus.x - 8, k.c.y - 6); p.textAlign(p.CENTER, p.CENTER); }
          [[k.minus, '−'], [k.plus, '+']].forEach(([b, s]) => SK.chip(p, C, b, s, { size: 16, r: 8, ink: locked ? C.mute : C.ink }));
        });
        // Sumas en vivo: cada una se enciende cuando coincide con el dato de la encuesta.
        const sA = cnt[0] + cnt[1], sB = cnt[1] + cnt[2], tot = cnt.reduce((a, b) => a + b, 0), y0 = box.y + box.h + 44, cw = (W - 24 - 6) / 2;
        [[`${r.labels[0]}: ${sA} de ${r.a}`, sA === r.a, A.line], [`${r.labels[1]}: ${sB} de ${r.b}`, sB === r.b, B.line], [`total: ${tot} de ${r.total}`, tot === r.total, C.sky]].forEach(([txt, hit], j) =>
          SK.chip(p, C, j < 2 ? { x: 12 + j * (cw + 6), y: y0, w: cw, h: 24 } : { x: W / 2 - cw / 2, y: y0 + 29, w: cw, h: 24 }, txt, { state: hit && !VELO.on ? 'ok' : 'idle', size: 12, r: 9, ink: hit || VELO.on ? C.ink : C.mute }));
        p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.fill(locked && !good(cnt, r) ? C.ok : C.mute);
        fitText(p, locked && !good(cnt, r) ? `Era: ${t[0]}, ${t[1]}, ${t[2]} y ${t[3]} ninguno` : 'Cada zona cuenta a las personas una sola vez', W / 2, H - 12, W - 24, 11);
      };

      const bump = (i, d) => {
        const cnt = st.counts[cur];
        cnt[i] = Math.max(0, Math.min(R[cur].total, cnt[i] + d));
        touched[cur] = true; api.ready(touched.every(Boolean));
      };
      p.mousePressed = () => {
        const tb = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        for (let i = 0; i < 4; i++) {
          const d = hitBox(ctrls[i].plus, p.mouseX, p.mouseY) ? 1 : hitBox(ctrls[i].minus, p.mouseX, p.mouseY) ? -1 : 0;
          if (d) { bump(i, d); hold = { i, d, t: p.millis() + 450 }; api.sfx?.tap?.(); return false; }
        }
      };
      // Dejar presionado − o + repite el cambio (para no tocar 25 veces).
      p.mouseReleased = () => { hold = null; };
      const repeat = () => { if (hold && !locked && p.millis() > hold.t) { bump(hold.i, hold.d); hold.t = p.millis() + 90; } };
    }, 1.55);

    return {
      loaded: m.ready,
      getState: () => ({ counts: st.counts.map(c => [...c]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target };
})();
;
//#archivo js/games/une-rectangulos.js
// Une los rectángulos (Álgebra, alg-12b; spec 2026-11-18-algebra-revision): la distributiva al revés (factor común).
// Un rectángulo base y otros sueltos; cada producto es un rectángulo de alto × ancho. Arrastrar uno junto a la base solo
// pega si tienen el mismo alto: entonces forman un solo rectángulo y la suma se escribe como un solo producto,
// a·b + a·c = a·(b + c). Hay que juntar todos los que comparten el alto, y ninguno más.
// params = { rounds: [{ base: [alto, ancho], others: [[alto, ancho], …] }] }   state = { rounds: [{ on: [índices pegados] }] }
GAMES['une-rectangulos'] = (() => {
  const goods = r => r.others.map((o, i) => (o[0] === r.base[0] ? i : -1)).filter(i => i >= 0);
  let ok = (s, r) => [...s.on].sort().join() === goods(r).join();
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ on: [] }),
    ok,
    answered: s => s.on.length > 0,
    solution: r => { const g = goods(r), [h, w] = r.base; return `${h}·(${[w, ...g.map(i => r.others[i][1])].join(' + ')})`; },
    prompt: r => `Junta con la base $${r.base[0]}\\cdot ${r.base[1]}$ los que comparten su alto`,
    foot: () => 'Arrastra junto a la base los que tienen su mismo alto',
    layout(G) { G.top = 104; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.drag = null; G.msg = null; },
    draw(G) {
      const { p, C, r } = G, good = ok(G.s, r), s = G.locked && !good ? { on: goods(r) } : G.s;
      const maxH = Math.max(r.base[0], ...r.others.map(o => o[0])), totW = r.base[1] + r.others.reduce((a, o) => a + o[1], 0);
      const u = Math.min((G.W - 40) / totW, (G.H * 0.26) / maxH), [h0, w0] = r.base, x0 = 18, y0 = G.top + 8;
      const rect = (x, y, h, w, col, txt) => { p.stroke(col); p.strokeWeight(2); p.fill(RK.al(p, col, 60)); p.rect(x, y, w * u, h * u, 3); TK.label(p, C, txt, x + w * u / 2, y + h * u / 2, C.ink, 13, w * u - 4); };
      rect(x0, y0, h0, w0, C.mint, `${h0}·${w0}`);
      let x = x0 + w0 * u;
      s.on.forEach(i => { const [h, w] = r.others[i]; rect(x, y0, h, w, G.locked ? C.ok : C.mint, `${h}·${w}`); x += w * u; });
      p.stroke(C.ink); p.strokeWeight(1.5); p.line(x0 - 8, y0, x0 - 8, y0 + h0 * u); TK.label(p, C, String(h0), x0 - 2 - 8, y0 + h0 * u / 2, C.ink, 12, 20);
      G.dock = { x: x - 10, y: y0 - 10, w: 60, h: h0 * u + 20 };
      // Los sueltos, abajo.
      const rest = r.others.map((_, i) => i).filter(i => !s.on.includes(i)), by = G.H * 0.56;
      let bx = 18; G.spots = [];
      rest.forEach(i => { const [h, w] = r.others[i]; G.spots.push({ i, x: bx, y: by, w: w * u, h: h * u }); if (G.drag?.i !== i) rect(bx, by, h, w, C.sky, `${h}·${w}`); bx += w * u + 14; });
      if (G.drag) { const [h, w] = r.others[G.drag.i]; rect(G.drag.x - w * u / 2, G.drag.y - h * u / 2, h, w, C.brand, `${h}·${w}`); }
      if (G.msg && G.t - G.msg.t < 2.4) TK.label(p, C, G.msg.text, G.W / 2, by - 16, C.bad, 12, G.W - 30);
      const ws = [w0, ...s.on.map(i => r.others[i][1])], terms = [r.base, ...s.on.map(i => r.others[i])].map(([a, b]) => `${a}\\cdot ${b}`).join(' + ');
      RK.strip(p, C, G.fb, `$${terms} = ${h0}\\cdot(${ws.join(' + ')}) = ${h0 * ws.reduce((a, b) => a + b, 0)}$`, { kicker: 'Factor común', col: G.locked ? C.ok : C.mint, size: 16 });
    },
    press(G, x, y) {
      const q = (G.spots || []).find(q => hitBox({ x: q.x - 4, y: q.y - 4, w: q.w + 8, h: q.h + 8 }, x, y));
      if (q) { G.drag = { i: q.i, x, y, from: 'tray' }; return true; }
      if (G.s.on.length && hitBox({ x: 0, y: G.top, w: G.W, h: G.H * 0.3 }, x, y)) { G.drag = { i: G.s.on.at(-1), x, y, from: 'dock' }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; if (!d) return; G.drag = null;
      const s = G.s, near = y < G.H * 0.5 && y > G.top - 20;
      if (d.from === 'dock') { if (!near) { s.on.pop(); G.touch(); } return; }
      if (!near) return;
      if (G.r.others[d.i][0] !== G.r.base[0]) { G.msg = { t: G.t, text: `Alto ${G.r.others[d.i][0]} y alto ${G.r.base[0]}: no forman un rectángulo` }; return; }
      s.on.push(d.i); G.msg = null; G.touch();
    },
    demo(G) { const q = G.spots?.[0]; return q ? { from: { x: q.x + q.w / 2, y: q.y + q.h / 2 }, to: { x: G.dock.x + 20, y: G.dock.y + G.dock.h / 2 }, text: 'Arrastra junto a la base', ty: G.H * 0.5 } : null; },
    peek: G => ({ spots: G.spots, dock: G.dock }),
  });
  return Object.assign(game, { goods });
})();
;
//#archivo js/games/llena-rectangulo.js
// Llena el rectángulo (Álgebra, alg-23a; spec 2026-11-18-algebra-revision): multiplicar es llenar un rectángulo. El marco
// mide (x + a) por (x + b): una esquina grande x por x, franjas de x por 1 y una esquina de a por b. Se arrastran bloques
// de la bandeja al marco hasta llenarlo, y el producto queda escrito: x² + (a + b)x + ab.
// params = { rounds: [{ a, b }] }   state = { rounds: [{ n: [x², x, 1] }] }
GAMES['llena-rectangulo'] = (() => {
  const need = r => [1, r.a + r.b, r.a * r.b];
  let ok = (s, r) => s.n.join() === need(r).join();
  const poly = c => GAMES['bloques-polinomio'].poly(c);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ n: [0, 0, 0] }),
    ok,
    answered: s => s.n.some(Boolean),
    solution: r => poly(need(r)),
    prompt: r => `Llena el rectángulo de $(x + ${r.a})(x + ${r.b})$`,
    foot: () => 'Arrastra bloques al marco; cada uno va donde cabe',
    layout(G) { G.u = 70; G.s = 16; G.ox = 40; G.oy = 108; G.trayY = G.H - 140; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, u, s, ox, oy } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, W = u + r.b * s, H = u + r.a * s;
      // Marco y sus zonas.
      p.noFill(); p.stroke(C.ink); p.strokeWeight(2); p.rect(ox, oy, W, H);
      p.stroke(C.line); p.strokeWeight(1); p.line(ox + u, oy, ox + u, oy + H); p.line(ox, oy + u, ox + W, oy + u);
      TK.label(p, C, 'x', ox + u / 2, oy - 10, C.mute, 11, 20); TK.label(p, C, String(r.b), ox + u + r.b * s / 2, oy - 10, C.mute, 11, 20);
      TK.label(p, C, 'x', ox - 10, oy + u / 2, C.mute, 11, 20); TK.label(p, C, String(r.a), ox - 10, oy + u + r.a * s / 2, C.mute, 11, 20);
      if (n[0]) RK.tile(p, C, 2, ox, oy, u, s, false, { label: true });
      // Barras: primero las verticales de la derecha (b), luego las horizontales de abajo (a), dibujadas acostadas.
      for (let i = 0; i < n[1]; i++) { if (i < r.b) RK.tile(p, C, 1, ox + u + i * s, oy, u, s, false, { label: false }); else { const j = i - r.b; p.stroke(C.line); p.fill(RK.al(p, C.sky, 170)); p.rect(ox, oy + u + j * s, u, s, 3); } }
      for (let i = 0; i < n[2]; i++) RK.tile(p, C, 0, ox + u + (i % r.b) * s, oy + u + Math.floor(i / r.b) * s, u, s, false, { label: false });
      G.zone = { x: ox, y: oy, w: W, h: H };
      G.src = [2, 1, 0].map((k, i) => { const [w, h] = RK.tileSize(k, 40, 14), x = 30 + i * (G.W - 60) / 3; RK.tile(p, C, k, x, G.trayY, 40, 14, false); return { k, x, y: G.trayY, w, h }; });
      if (G.drag) RK.tile(p, C, G.drag.k, G.drag.x - 10, G.drag.y - 10, 40, 14, false, { lift: true });
      RK.strip(p, C, G.fb, `$(x + ${r.a})(x + ${r.b}) = ${poly(n)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const q = (G.src || []).find(q => hitBox({ x: q.x - 4, y: q.y - 4, w: q.w + 8, h: q.h + 8 }, x, y)); if (q) { G.drag = { k: q.k, x, y, from: 'tray' }; return true; } if (hitBox(G.zone, x, y)) { G.drag = { k: -1, x, y, from: 'zone' }; return true; } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d || d.from !== 'tray') return;
      if (!hitBox({ x: G.zone.x - 10, y: G.zone.y - 10, w: G.zone.w + 20, h: G.zone.h + 20 }, x, y)) return;
      const i = 2 - d.k, cap = need(G.r)[i];
      if (G.s.n[i] < cap) { G.s.n[i]++; G.touch(); }
    },
    demo(G) { const q = G.src?.[0]; return q ? { from: { x: q.x + 20, y: q.y + 20 }, to: { x: G.ox + 30, y: G.oy + 30 }, text: 'Arrastra al marco', ty: G.trayY - 16 } : null; },
    peek: G => ({ src: G.src, zone: G.zone }),
  });
  return Object.assign(game, { need });
})();
;
//#archivo js/games/encuentro-caminantes.js
// ¿Cuándo se encuentran? (Álgebra, alg-1; spec 2026-11-18-algebra-revision): dos caminantes en un mismo camino; uno sale
// adelante y el otro va más rápido. Su posición es lineal en el tiempo: a·t + b. Se arrastra el reloj y se mueven los
// dos; hay que parar el reloj cuando están en el mismo punto: a·t + b = c·t + d.
// params = { rounds: [{ A: [vel, inicio], B: [vel, inicio], max }] }   state = { rounds: [{ t }] }   (minutos enteros)
GAMES['encuentro-caminantes'] = (() => {
  const pos = (q, t) => q[0] * t + q[1];
  const need = r => (r.B[1] - r.A[1]) / (r.A[0] - r.B[0]);
  let ok = (s, r) => pos(r.A, s.t) === pos(r.B, s.t);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ t: 0 }),
    ok,
    solution: r => `t = ${need(r)}: ${r.A[0]}t + ${r.A[1]} = ${r.B[0]}t + ${r.B[1]}`,
    prompt: r => `Ana sale a ${r.A[1]} m y anda ${r.A[0]} m/min; Beto, a ${r.B[1]} m, ${r.B[0]} m/min. ¿Cuándo se juntan?`,
    foot: () => 'Arrastra el reloj',
    layout(G) { G.y1 = 150; G.y2 = 200; G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, t = G.locked && !ok(G.s, r) ? need(r) : G.s.t, D = Math.max(pos(r.A, r.max), pos(r.B, r.max)) * 1.05, X = v => 20 + (G.W - 40) * v / D;
      [[G.y1, r.A, C.sky, 'Ana'], [G.y2, r.B, C.coral, 'Beto']].forEach(([y, q, col, n]) => { p.stroke(C.line); p.strokeWeight(2); p.line(20, y + 12, G.W - 20, y + 12); const x = X(pos(q, t)); p.noStroke(); p.fill(col); p.circle(x, y, 18); TK.label(p, C, `${n}: ${pos(q, t)} m`, Math.min(G.W - 50, Math.max(50, x)), y - 18, col, 11, 90); });
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, r.max + 1, t, i => (i % 2 === 0 ? String(i) : null));
      TK.label(p, C, `t = ${t} min`, G.W / 2, G.tY - 22, C.ink, 13, 100);
      RK.strip(p, C, G.fb, `$${r.A[0]}\\cdot${t} + ${r.A[1]} = ${pos(r.A, t)} \\quad ${r.B[0]}\\cdot${t} + ${r.B[1]} = ${pos(r.B, t)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.t), y: G.tY }, to: { x: G.X(G.s.t + 4), y: G.tY }, text: 'Arrastra el reloj', ty: G.tY - 46 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const t = RK.pick(x, 30, G.W - 30, G.r.max + 1); if (t !== G.s.t || !G.touched[G.cur]) { G.s.t = t; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/amplifica-fraccion.js
// Completa cada fracción (Álgebra, alg-25b; spec 2026-11-18-algebra-revision): para llevar una fracción al común
// denominador se multiplica arriba y abajo por el factor que le falta. Ya está el común denominador; se arrastra a cada
// fracción el factor que le falta (arriba y abajo a la vez), y luego se suman los numeradores.
// params = { rounds: [{ f1: [num, [factores]], f2: [num, [factores]], chips: [..], sum }] }   state = { rounds: [{ m: [índice | null, índice | null] }] }
GAMES['amplifica-fraccion'] = (() => {
  const missing = (r, k) => { const L = GAMES['denominador-comun'].lcd({ d1: r.f1[1], d2: r.f2[1] }), own = [...(k ? r.f2 : r.f1)[1]]; return L.filter(f => { const i = own.indexOf(f); if (i >= 0) { own.splice(i, 1); return false; } return true; }); };
  let ok = (s, r) => [0, 1].every(k => { const need = missing(r, k); return need.length === 0 ? s.m[k] == null : s.m[k] != null && r.chips[s.m[k]] === need[0]; });
  const answer = r => ({ m: [0, 1].map(k => { const need = missing(r, k); return need.length ? r.chips.indexOf(need[0]) : null; }) });
  const mul = fs => GAMES['denominador-comun'].mul(fs);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ m: [null, null] }),
    ok,
    answered: s => s.m.some(v => v != null),
    solution: r => r.sum,
    prompt: r => `Suma $\\dfrac{${r.f1[0]}}{${mul(r.f1[1])}} + \\dfrac{${r.f2[0]}}{${mul(r.f2[1])}}$: completa cada fracción`,
    foot: () => 'Arrastra a cada fracción el factor que le falta',
    layout(G) { G.fr = [0, 1].map(k => ({ x: 16 + k * (G.W - 32) / 2 + 4, y: 108, w: (G.W - 32) / 2 - 8, h: 92 })); G.cy = G.H * 0.6; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s;
      [r.f1, r.f2].forEach((f, k) => {
        const b = G.fr[k], c = s.m[k] == null ? null : r.chips[s.m[k]];
        p.stroke(C.line); p.strokeWeight(1.2); p.fill(RK.al(p, C.card, 220)); p.rect(b.x, b.y, b.w, b.h, 12);
        const tex = c ? `\\dfrac{${f[0]}\\cdot ${c.length > 2 ? `(${c})` : c}}{${mul(f[1])}\\cdot ${c.length > 2 ? `(${c})` : c}}` : `\\dfrac{${f[0]}}{${mul(f[1])}}`;
        TK.label(p, C, `$${tex}$`, b.x + b.w / 2, b.y + b.h / 2, C.ink, 15, b.w - 8);
      });
      const w = Math.min(64, (G.W - 20) / r.chips.length - 6);
      G.cards = r.chips.map((_, i) => ({ i, x: G.W / 2 - (r.chips.length * (w + 6) - 6) / 2 + i * (w + 6), y: G.cy, w, h: 36 }));
      G.cards.forEach(b => { if (G.drag?.i !== b.i) RK.chip(p, C, b, `$${r.chips[b.i]}$`, { size: 13 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 18, w, h: 36 }, `$${r.chips[G.drag.i]}$`, { on: true, size: 13 });
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{elige un factor para cada una}$' : ok(s, r) ? `$${r.sum}$` : '$\\text{completa las dos fracciones}$', { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const b = (G.cards || []).find(b => hitBox(b, x, y)); if (b) { G.drag = { i: b.i, x, y }; return true; }
      const k = G.fr.findIndex(f => hitBox(f, x, y)); if (k >= 0 && G.s.m[k] != null) { G.s.m[k] = null; G.touch(); return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; const k = G.fr.findIndex(f => hitBox({ x: f.x - 6, y: f.y - 10, w: f.w + 12, h: f.h + 20 }, x, y)); if (k >= 0) { G.s.m[k] = d.i; G.touch(); } },
    demo(G) { const b = G.cards?.[0]; return b ? { from: { x: b.x + b.w / 2, y: b.y + 18 }, to: { x: G.fr[0].x + G.fr[0].w / 2, y: G.fr[0].y + 46 }, text: 'Arrastra a una fracción', ty: G.cy + 56 } : null; },
    peek: G => ({ cards: G.cards, fr: G.fr }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/media-vida.js
// La vida media (Álgebra, alg-73; spec 2026-11-18-algebra-revision): una sustancia que se reduce a la mitad cada T horas
// queda en A₀·(½)^(t/T). Se arrastra el tiempo (de media vida en media vida) por la curva de decaimiento; hay que llegar al
// momento en que queda la cantidad pedida. Al final el juego muestra la ecuación y su solución con logaritmos.
// params = { rounds: [{ A0, T, target, thing, unit }] }   state = { rounds: [{ i }] }   (t = i·T, i de 0 a 6)
GAMES['media-vida'] = (() => {
  const amt = (r, i) => r.A0 * 0.5 ** i;
  const need = r => Math.round(Math.log2(r.A0 / r.target));
  let ok = (s, r) => s.i === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ i: 0 }),
    ok,
    solution: r => `t = ${need(r) * r.T} h (${need(r)} medias vidas)`,
    prompt: r => `${r.A0} ${r.unit} de ${r.thing}, mitad cada ${r.T} h: ¿cuándo quedan ${r.target}?`,
    foot: () => 'Arrastra el tiempo por la curva',
    layout(G) { G.b = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.5 }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, i = G.locked && !ok(G.s, r) ? need(r) : G.s.i, V = { x0: 0, x1: 6 * r.T, y0: 0, y1: r.A0 * 1.1 }, M = G.M = RK.plane(p, C, G.b, V, { step: r.T });
      RK.curve(p, G.b, M, V, t => r.A0 * 0.5 ** (t / r.T), C.sky, 2.6);
      p.stroke(C.coral); p.strokeWeight(1.4); p.drawingContext.setLineDash([5, 4]); p.line(G.b.x, M.Y(r.target), G.b.x + G.b.w, M.Y(r.target)); p.drawingContext.setLineDash([]);
      for (let k = 0; k <= 6; k++) TK.label(p, C, `${k * r.T}`, M.X(k * r.T), G.b.y + G.b.h + 10, C.mute, 9, 30);
      const a = amt(r, i); drawDot(p, C, M.X(i * r.T), M.Y(a), 14, ok({ i }, r) ? C.ok : C.brand);
      TK.label(p, C, `$${+a.toFixed(3)}\\ \\text{${r.unit}}$`, Math.min(G.W - 50, M.X(i * r.T) + 40), M.Y(a) - 14, C.ink, 12, 80);
      RK.strip(p, C, G.fb, ok({ i }, r) ? `$${r.A0}\\left(\\tfrac12\\right)^{t/${r.T}} = ${r.target} \\Rightarrow t = ${r.T}\\log_2 \\tfrac{${r.A0}}{${r.target}} = ${i * r.T}$` : `$t = ${i * r.T}\\ \\text{h}:\\ ${+a.toFixed(3)}\\ \\text{${r.unit}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { if (!hitBox({ x: G.b.x, y: G.b.y, w: G.b.w, h: G.b.h + 24 }, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(0), y: G.M.Y(G.r.A0) }, to: { x: G.M.X(G.r.T), y: G.M.Y(G.r.A0 / 2) }, text: 'Arrastra el tiempo', ty: G.b.y + G.b.h + 30 }),
    peek: G => ({ b: G.b, M: G.M }),
  });
  game.move = (G, x) => { const i = Math.max(0, Math.min(6, Math.round(G.M.iX(x) / G.r.T))); if (i !== G.s.i || !G.touched[G.cur]) { G.s.i = i; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/puntos-o-porciento.js
// Puntos porcentuales o por ciento (Álgebra, alg-13d; spec 2026-11-18-algebra-revision): si una tasa pasa del 20 % al 25 %,
// subió 5 puntos, pero creció un 25 %: el cambio se mide sobre el valor de antes. Dos barras (antes y después) y la de la
// diferencia; se arrastra el cambio relativo hasta que la diferencia, comparada con la barra de antes, quede bien medida.
// params = { rounds: [{ what, from, to }] }   state = { rounds: [{ p }] }   (p de −50 a 100, de 5 en 5)
GAMES['puntos-o-porciento'] = (() => {
  const P = Array.from({ length: 31 }, (_, i) => -50 + i * 5);
  const need = r => (r.to - r.from) / r.from * 100;
  let ok = (s, r) => Math.abs(s.p - need(r)) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ p: 0 }),
    ok,
    solution: r => `${r.to - r.from > 0 ? '+' : '−'}${Math.abs(r.to - r.from)} puntos = ${need(r) > 0 ? '+' : ''}${need(r)} %`,
    prompt: r => `${r.what} pasó del ${r.from} % al ${r.to} %. ¿En qué porcentaje cambió?`,
    foot: () => 'Arrastra el cambio: se mide sobre el valor de antes',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, pc = G.locked && !ok(G.s, r) ? need(r) : G.s.p, x0 = 24, u = (G.W - 60) / Math.max(r.from, r.to, r.from * 2), y = 112;
      [['antes', r.from, C.sky], ['después', r.to, C.mint]].forEach(([t, v, col], i) => { p.noStroke(); p.fill(col); p.rect(x0, y + i * 36, v * u, 24, 4); TK.label(p, C, `${t}: ${v} %`, x0 + v * u + 46, y + i * 36 + 12, C.ink, 10, 86); });
      const pred = r.from * (1 + pc / 100), good = ok({ p: pc }, r);
      p.noStroke(); p.fill(RK.al(p, good ? C.ok : C.coral, 150)); p.rect(x0, y + 80, pred * u, 24, 4);
      TK.label(p, C, `${r.from} con ${pc > 0 ? '+' : ''}${pc} %: ${+pred.toFixed(2)}`, G.W / 2, y + 120, good ? C.ok : C.mute, 11, G.W - 30);
      G.X = RK.track(p, C, 24, G.W - 24, G.tY, P.length, P.indexOf(pc), i => (i % 5 === 0 ? `${P[i]}` : null));
      RK.strip(p, C, G.fb, `$\\dfrac{${r.to} - ${r.from}}{${r.from}} ${VELO.on ? '\\;?\\;' : good ? '=' : '\\ne'} ${pc}\\%$`, { kicker: `${Math.abs(r.to - r.from)} puntos de diferencia`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(10), y: G.tY }, to: { x: G.X(13), y: G.tY }, text: 'Arrastra el cambio', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = P[RK.pick(x, 24, G.W - 24, P.length)]; if (v !== G.s.p || !G.touched[G.cur]) { G.s.p = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/espejo-figura.js
// Reflejar una figura (Preuniversitario, pu-es-4; spec 2026-11-18-preuda-razonamiento-completo): en un espejo cada casilla queda
// a la misma distancia del eje, del otro lado; un espejo vertical cambia izquierda por derecha pero no arriba por abajo. Se
// pinta arrastrando el dedo por las casillas del otro lado del eje (arrastrar sobre una pintada la borra) hasta dibujar el reflejo.
// params = { rounds: [{ n, axis: 'v' | 'h', cells: [[col, fila]] }] }   (eje en la mitad de una cuadrícula de n × n)
// state = { rounds: [{ on: ['col,fila'] }] }
GAMES['espejo-figura'] = (() => {
  const mirror = (r, [x, y]) => (r.axis === 'v' ? [r.n - 1 - x, y] : [x, r.n - 1 - y]);
  const want = r => r.cells.map(c => mirror(r, c).join(',')).sort();
  let ok = (s, r) => [...s.on].sort().join('|') === want(r).join('|');
  const lay = G => { const r = G.r; G.u = Math.min(38, (G.W - 40) / r.n); G.o = { x: (G.W - r.n * G.u) / 2, y: 106 }; };
  const side = (r, x, y) => (r.axis === 'v' ? x >= r.n / 2 : y >= r.n / 2);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.45,
    init: () => ({ on: [] }),
    ok,
    answered: s => s.on.length > 0,
    solution: r => `${want(r).length} casillas reflejadas`,
    prompt: r => `Dibuja el reflejo en el espejo ${r.axis === 'v' ? 'vertical' : 'horizontal'}`,
    foot: () => 'Arrastra el dedo por las casillas del otro lado del espejo',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.paint = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { on: want(r) } : G.s, u = G.u, o = G.o, good = G.locked && ok(s, r);
      for (let x = 0; x < r.n; x++) for (let y = 0; y < r.n; y++) {
        const k = `${x},${y}`, fig = r.cells.some(c => c[0] === x && c[1] === y), on = s.on.includes(k);
        p.stroke(RK.al(p, C.line, 140)); p.strokeWeight(1); p.fill(fig ? C.sky : on ? (good ? C.ok : C.coral) : side(r, x, y) ? RK.al(p, C.card, 200) : RK.al(p, C.card, 90)); p.rect(o.x + x * u, o.y + y * u, u, u);
      }
      p.stroke(C.brand); p.strokeWeight(3); if (r.axis === 'v') p.line(o.x + r.n * u / 2, o.y - 6, o.x + r.n * u / 2, o.y + r.n * u + 6); else p.line(o.x - 6, o.y + r.n * u / 2, o.x + r.n * u + 6, o.y + r.n * u / 2);
      RK.strip(p, C, G.fb, good ? '$\\text{es su reflejo}$' : `$\\text{${s.on.length} casillas pintadas}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const c = [Math.floor((x - G.o.x) / G.u), Math.floor((y - G.o.y) / G.u)]; if (c[0] < 0 || c[1] < 0 || c[0] >= G.r.n || c[1] >= G.r.n || !side(G.r, ...c)) return false; const k = c.join(','); G.paint = !G.s.on.includes(k); game.apply(G, k); return true; },
    drag(G, x, y) { if (G.paint == null) return false; const c = [Math.floor((x - G.o.x) / G.u), Math.floor((y - G.o.y) / G.u)]; if (c[0] >= 0 && c[1] >= 0 && c[0] < G.r.n && c[1] < G.r.n && side(G.r, ...c)) game.apply(G, c.join(',')); return true; },
    release(G) { G.paint = null; },
    demo: G => { const r = G.r, a = r.axis === 'v' ? [r.n - 1, 0] : [0, r.n - 1], b = r.axis === 'v' ? [r.n - 1, 2] : [2, r.n - 1]; return { from: { x: G.o.x + (a[0] + 0.5) * G.u, y: G.o.y + (a[1] + 0.5) * G.u }, to: { x: G.o.x + (b[0] + 0.5) * G.u, y: G.o.y + (b[1] + 0.5) * G.u }, text: 'Pinta arrastrando', ty: G.o.y + r.n * G.u + 18 }; },
    peek: G => ({ o: G.o, u: G.u }),
  });
  game.apply = (G, k) => { const on = G.s.on, i = on.indexOf(k); if (G.paint && i < 0) { on.push(k); G.touch(); } else if (!G.paint && i >= 0) { on.splice(i, 1); G.touch(); } };
  return Object.assign(game, { answer: r => ({ on: want(r) }) });
})();
;
//#archivo js/games/gira-figura.js
// Girar una figura (Preuniversitario, pu-es-4; spec 2026-11-18-preuda-razonamiento-completo): girar no le cambia la «mano» a
// una figura; solo cambia hacia dónde mira. A la izquierda está la figura pedida; a la derecha, la misma figura en otra
// posición. Se arrastra alrededor de la de la derecha para girarla de cuarto en cuarto de vuelta hasta que coincidan.
// params = { rounds: [{ cells: [[x, y]], k }] }   (la figura pedida es la de la derecha girada k cuartos)   state = { rounds: [{ q }] }
GAMES['gira-figura'] = (() => {
  const rot = (cells, q) => { let c = cells.map(p => [...p]); for (let i = 0; i < ((q % 4) + 4) % 4; i++) c = c.map(([x, y]) => [-y, x]); const mx = Math.min(...c.map(p => p[0])), my = Math.min(...c.map(p => p[1])); return c.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let ok = (s, r) => same(rot(r.cells, s.q), rot(r.cells, r.k));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ q: same(rot(r.cells, 0), rot(r.cells, r.k)) ? 1 : 0 }),
    ok,
    solution: r => `${r.k} cuarto${r.k === 1 ? '' : 's'} de vuelta`,
    prompt: () => 'Gira la figura de la derecha hasta que quede como la otra',
    foot: () => 'Arrastra alrededor de la figura de la derecha para girarla',
    layout(G) { G.cL = { x: G.W * 0.27, y: 190 }; G.cR = { x: G.W * 0.73, y: 190 }; G.u = Math.min(22, G.W * 0.06); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { q: r.k } : G.s, good = G.locked && ok(s, r), u = G.u;
      const shape = (cells, c, col) => { const w = Math.max(...cells.map(q => q[0])) + 1, h = Math.max(...cells.map(q => q[1])) + 1; cells.forEach(([x, y]) => { p.stroke(C.bg); p.strokeWeight(1.5); p.fill(col); p.rect(c.x - w * u / 2 + x * u, c.y - h * u / 2 + y * u, u, u, 2); }); };
      shape(rot(r.cells, r.k), G.cL, C.sky);
      p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 4]); p.circle(G.cR.x, G.cR.y, 130); p.drawingContext.setLineDash([]);
      shape(rot(r.cells, s.q), G.cR, good ? C.ok : C.coral);
      TK.label(p, C, 'así', G.cL.x, G.cL.y + 80, C.mute, 10, 40); TK.label(p, C, '↻ gírala', G.cR.x, G.cR.y + 80, C.mute, 10, 60);
      RK.strip(p, C, G.fb, good ? '$\\text{coinciden}$' : `$\\text{girada ${((s.q % 4) + 4) % 4} cuartos}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.hypot(x - G.cR.x, y - G.cR.y) > 90) return false; G.grab = true; G.a0 = Math.atan2(y - G.cR.y, x - G.cR.x); G.q0 = G.s.q; return true; },
    drag(G, x, y) { if (!G.grab) return false; const a = Math.atan2(y - G.cR.y, x - G.cR.x), d = Math.round((a - G.a0) / (Math.PI / 2)), q = ((G.q0 + d) % 4 + 4) % 4; if (q !== G.s.q || !G.touched[G.cur]) { G.s.q = q; G.touch(); } return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.cR.x + 60, y: G.cR.y }, to: { x: G.cR.x, y: G.cR.y + 60 }, text: 'Gira la figura', ty: G.cR.y + 100 }),
    peek: G => ({ cR: G.cR }),
  });
  return Object.assign(game, { answer: r => ({ q: r.k }) });
})();
;
//#archivo js/games/ordena-mediana.js
// La mediana pide orden (Preuniversitario, pu-gr-2; spec 2026-11-18-preuda-razonamiento-completo): los datos llegan
// revueltos. Se arrastran fichas a las casillas para escribirlos de menor a mayor (cada dato tantas veces como aparezca); la
// casilla del medio (o las dos del medio) está marcada, y al quedar en orden el juego dice la mediana.
// params = { rounds: [{ data: [números] }] }   state = { rounds: [{ f: [ficha | −1] }] }
GAMES['ordena-mediana'] = (() => {
  const tray = r => [...new Set(r.data)];
  const sorted = r => r.data.slice().sort((a, b) => a - b);
  const med = r => { const s = sorted(r), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const mid = (r, i) => { const n = r.data.length; return n % 2 ? i === (n - 1) / 2 : i === n / 2 - 1 || i === n / 2; };
  return CODK.fillGame({
    aspect: 1.4,
    prompt: () => 'Ordena los datos de menor a mayor',
    foot: 'Arrastra los valores en orden; cada uno tantas veces como aparezca',
    tray,
    need: r => sorted(r).map(v => tray(r).indexOf(v)),
    over: (r, i) => (mid(r, i) ? 'medio' : ''),
    done: r => `la mediana es ${med(r)}`,
    col: C => C.mint,
    decor(G) {
      const { p, C, r } = G;
      TK.label(p, C, 'Datos:', G.W / 2, 100, C.mute, 10, 80);
      TK.label(p, C, r.data.join('   '), G.W / 2, 128, C.ink, 16, G.W - 30);
      TK.label(p, C, `${r.data.length} datos`, G.W / 2, 156, C.mute, 10, 120);
    },
  });
})();
;
//#archivo js/games/balanza-promedio.js
// La balanza del promedio (Preuniversitario, pu-gr-2; spec 2026-11-18-preuda-razonamiento-completo): cada grupo es una pila de
// bloques (uno por persona) puesta sobre su promedio en una regla. Se arrastra el apoyo por debajo de la regla: la regla se
// inclina hacia el lado que pesa más. Queda quieta justo en el promedio de todos, que se acerca al grupo más grande y no es el
// promedio de los promedios.
// params = { rounds: [{ groups: [{ lab, n, mean }], lo, hi }] }   state = { rounds: [{ f }] }   (apoyo, de medio en medio)
GAMES['balanza-promedio'] = (() => {
  const total = r => r.groups.reduce((a, g) => a + g.n, 0);
  const need = r => r.groups.reduce((a, g) => a + g.n * g.mean, 0) / total(r);
  let ok = (s, r) => s.f === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ f: r.lo === need(r) ? r.lo + 0.5 : r.lo }),
    ok,
    solution: r => `(${r.groups.map(g => `${g.n} · ${g.mean}`).join(' + ')}) ÷ ${total(r)} = ${need(r)}`,
    prompt: () => '¿Cuál es el promedio de todos juntos?',
    foot: () => 'Arrastra el apoyo hasta que la regla quede quieta',
    layout(G) { G.ax = { x0: 34, x1: G.W - 34, y: 220 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { f: need(r) } : G.s, good = ok(s, r), ax = G.ax, X = v => ax.x0 + (v - r.lo) / (r.hi - r.lo) * (ax.x1 - ax.x0);
      const torque = r.groups.reduce((a, g) => a + g.n * (g.mean - s.f), 0), ang = Math.max(-0.2, Math.min(0.2, torque / total(r) / (r.hi - r.lo) * 1.5));
      const fx = X(s.f), cols = [C.sky, C.coral, C.mint];
      p.push(); p.translate(fx, ax.y); p.rotate(ang);
      p.stroke(C.ink); p.strokeWeight(3); p.line(X(r.lo) - fx, 0, X(r.hi) - fx, 0);
      for (let v = r.lo; v <= r.hi; v++) { p.strokeWeight(1); p.line(X(v) - fx, -3, X(v) - fx, 3); TK.label(p, C, String(v), X(v) - fx, 12, C.mute, 8, 20); }
      r.groups.forEach((g, i) => {
        const x = X(g.mean) - fx, sz = 12, per = 3;
        for (let k = 0; k < g.n; k++) { p.noStroke(); p.fill(cols[i % 3]); p.rect(x - per * sz / 2 + (k % per) * sz, -4 - sz - Math.floor(k / per) * sz, sz - 1, sz - 1, 2); }
        TK.label(p, C, `${g.lab}: ${g.n} · prom. ${g.mean}`, x, -18 - Math.ceil(g.n / per) * sz - (i % 2) * 14, C.ink, 9, 120);
      });
      p.pop();
      p.noStroke(); p.fill(good ? C.ok : C.brand); p.triangle(fx, ax.y + 3, fx - 14, ax.y + 30, fx + 14, ax.y + 30);
      TK.label(p, C, String(s.f), fx, ax.y + 44, C.brand, 12, 50);
      RK.strip(p, C, G.fb, good ? `$\\text{promedio de todos} = ${need(r)}$` : `$\\text{apoyo en}\\ ${s.f}$`, { kicker: good ? 'la regla queda quieta' : torque > 0 ? 'se inclina a la derecha' : 'se inclina a la izquierda', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (y < G.ax.y - 10 || y > G.ax.y + 60) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => { const r = G.r, ax = G.ax, x = ax.x0 + (G.s.f - r.lo) / (r.hi - r.lo) * (ax.x1 - ax.x0); return { from: { x, y: ax.y + 20 }, to: { x: x + 70, y: ax.y + 20 }, text: 'Arrastra el apoyo', ty: ax.y + 70 }; },
    peek: G => ({ ax: G.ax }),
  });
  game.move = (G, x) => { const r = G.r, ax = G.ax, v = Math.max(r.lo, Math.min(r.hi, Math.round((r.lo + (x - ax.x0) / (ax.x1 - ax.x0) * (r.hi - r.lo)) * 2) / 2)); if (v !== G.s.f || !G.touched[G.cur]) { G.s.f = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ f: need(r) }) });
})();
;
//#archivo js/games/rana-zenon.js
// La rana que se achica (Álgebra, suma geométrica y suma infinita; juego dinámico de la lección alg-14d): una rana
// salta sobre una recta numérica y cada salto es el anterior por una misma razón (8, 4, 2, 1…). Cada toque en el estanque
// es un salto: se ve la suma que lleva. Hay tres banderas. En las preguntas cortas («da 3 saltos: ¿dónde cae?») se da
// la cantidad de saltos y se toca la bandera donde quedó; en las infinitas hay que saltar varias veces, ver que cada
// vez avanza menos y tocar la bandera a la que se acerca sin llegar nunca. No hay reloj: se salta las veces que haga falta. Tocar otra bandera quita una vida. Sin vidas, la ronda empieza
// otra vez.
// params = { rounds: [{ title, items: [{ a1, r: [num, den], n?, flags: [a, b, c], answer, max }] }], lives? }
// state = { done: [n] }      Spec 2026-11-13-juegos-dinamicos-progresiones.

GAMES['rana-zenon'] = (() => {
  const MIN_INF = 5;   // saltos que hay que dar antes de responder una suma infinita
  const ratio = it => it.r[0] / it.r[1];
  // Suma de los k primeros saltos.
  function partial(it, k) { let s = 0, t = it.a1; for (let i = 0; i < k; i++) { s += t; t *= ratio(it); } return +s.toFixed(9); }
  const limitOf = it => +(it.a1 / (1 - ratio(it))).toFixed(9);
  const answerOf = it => (it.n ? partial(it, it.n) : limitOf(it));
  const fmt = v => String(+v.toFixed(3));
  const rtxt = it => (it.r[1] === 1 ? `${it.r[0]} veces` : it.r[0] === 1 ? ({ 2: 'la mitad', 3: 'la tercera parte', 4: 'la cuarta parte', 5: 'la quinta parte' }[it.r[1]] || `1/${it.r[1]}`) : `${it.r[0]}/${it.r[1]}`);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => (state.done?.[i] ?? 0) >= r.items.length);
    const solution = params.rounds.map(r => r.items.map(it => (it.n ? `${it.n} saltos desde ${it.a1} (${rtxt(it)} cada vez): ${fmt(answerOf(it))}` : `saltos sin fin desde ${it.a1} (${rtxt(it)} cada vez): se acerca a ${fmt(answerOf(it))}`)).join(' · ')).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { done: R.map(() => 0) };
    let locked = false, W = 0, H = 0, lineY = 0, queue = [], perm = [0, 1, 2], jumps = 0, frog = 0, hop = 0, from = 0, pause = 0, result = null, n = 0;
    const a = makeArcade(R.length, params.lives ?? 3, api, {
      start(i) { st.done[i] = 0; queue = R[i].items.map((_, k) => k); load(); },
      lost(i) { st.done[i] = 0; },
    });
    const item = () => R[a.cur].items[queue[0] ?? 0];
    const X = v => 22 + (v / item().max) * (W - 44);
    const need = it => it.n || MIN_INF;

    function layout(w, h) { W = w; H = h; lineY = h * 0.6; }
    function load() { const it = item(); perm = shuffledOrder(3, `${it.a1}|${it.flags.join()}|${n++}`); jumps = 0; frog = 0; from = 0; hop = 0; pause = 0; result = null; }
    function answer(i) {
      const it = item(), good = perm[i] === it.answer;
      result = { pick: i, good }; pause = good ? 1.3 : 1.4;
      if (good) { st.done[a.cur]++; a.hit(); a.say(it.n ? `Después de ${it.n} saltos: ${it.flags[it.answer]}` : `Se acerca a ${it.flags[it.answer]} y nunca lo pasa`, C.ok); }
      else { a.say(it.n ? `No cae en ${it.flags[perm[i]]}` : `No se acerca a ${it.flags[perm[i]]}`, C.bad); a.miss(); }
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => { layout(size.w, size.h); if (a.stopped) p.redraw(); };

      function step(dt) {
        a.tick(dt);
        if (a.phase !== 'play') return;
        const it = item();
        if (hop > 0) hop = Math.max(0, hop - dt / 0.28);
        if (pause > 0) {
          pause -= dt;
          if (pause <= 0) { if (result.good) queue.shift(); else queue.push(queue.shift()); if (!queue.length) { a.win(); return; } load(); }
          return;
        }
      }

      p.draw = () => {
        p.background(C.bg);
        const dt = frameDt(p);
        if (!locked) step(dt * a.slow);
        const r = R[a.cur], it = item(), fx = X(from + (frog - from) * (1 - hop)), up = Math.sin((1 - hop) * Math.PI) * (hop > 0 ? 26 : 0);

        drawArcadeHead(p, C, a, R.length);
        p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.CENTER, p.CENTER);
        fitText(p, `${r.title} · primer salto ${it.a1}, luego ${rtxt(it)} cada vez`, W / 2, 40, W - 24, 11);
        if (a.phase === 'play') {
          drawPill(p, C, it.n ? `Da ${it.n} saltos: ¿dónde cae?` : 'Sin parar: ¿a cuál se acerca?', W / 2, 68, C.sun, 15);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.CENTER);
          p.text(jumps ? `saltos: ${jumps} · va en ${fmt(frog)}` : 'toca el estanque para saltar', W / 2, 96);
        }

        // El estanque, la recta y las banderas.
        const water = p.color(C.sky); water.setAlpha(60);
        p.noStroke(); p.fill(water); p.rect(8, lineY, W - 16, H - lineY - 36, 12);
        p.stroke(C.ink); p.strokeWeight(3); p.line(14, lineY, W - 14, lineY);
        const stepV = it.max > 12 ? 4 : 2;
        p.textStyle(p.BOLD); p.textSize(10); p.textAlign(p.CENTER, p.CENTER);
        for (let v = 0; v <= it.max; v += stepV) { p.stroke(C.ink); p.strokeWeight(1.5); p.line(X(v), lineY - 5, X(v), lineY + 5); p.noStroke(); p.fill(C.mute); p.text(v, X(v), lineY + 16); }
        if (a.phase !== 'idle' && !(locked || a.phase === 'all')) {
          perm.forEach((k, i) => {
            const x = X(+it.flags[k]), good = k === it.answer, col = result && result.pick === i ? (good ? C.ok : C.bad) : result && result.good && good ? C.ok : [C.coral, C.sky, C.mint][i];
            const top = lineY - 44 - i * 26;   // cada bandera a una altura distinta: no se tapan si quedan juntas
            p.stroke(C.ink); p.strokeWeight(2); p.line(x, lineY, x, top);
            drawPill(p, C, it.flags[k], x + 20 > W - 26 ? x - 20 : x + 20, top + 2, col, 13);
          });
          // Los saltos ya dados (arcos) y el marcador que salta.
          p.noFill(); p.stroke(C.mint); p.strokeWeight(2);
          for (let k = 0; k < jumps - (hop > 0 ? 1 : 0); k++) { const x0 = X(partial(it, k)), x1 = X(partial(it, k + 1)); p.arc((x0 + x1) / 2, lineY, x1 - x0, Math.min(40, (x1 - x0) * 0.8), Math.PI, 0); }
          const sh = p.color(C.mint); sh.setAlpha(60); p.noStroke(); p.fill(sh); p.ellipse(fx, lineY - 1, 18 - up * 0.2, 5);
          drawDot(p, C, fx, lineY - 9 - up, 13, C.mint);
        }

        arcadeToast(p, C, a, W / 2, H - 17, locked);
        const mid = lineY + (H - lineY - 36) / 2;
        if (locked || a.phase === 'all') drawArcadeSummary(p, C, R.map((rr, i) => ({ ok: st.done[i] >= rr.items.length, text: `${rr.title}: ${Math.min(st.done[i], rr.items.length)} de ${rr.items.length}` })), 170);
        else drawArcadeBanner(p, C, a, 170, { idle: 'Sin prisa: toca el estanque para saltar', lost: 'Demasiadas banderas equivocadas' });
        if (a.phase === 'play' && pause <= 0) {
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.CENTER);
          p.text(jumps < need(it) ? `Salta ${need(it) - jumps} ${need(it) - jumps === 1 ? 'vez' : 'veces'} más` : 'Ahora toca la bandera', W / 2, mid);
        }
        if (!a.toast || locked || a.phase === 'idle' || a.phase === 'all') {
          p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11); p.textAlign(p.CENTER, p.CENTER);
          p.text(locked || a.phase === 'all' ? '¡Suma completa! Ya puedes comprobar' : 'Estanque: saltar · bandera: responder', W / 2, H - 16);
        }
        arcadeStop(p, a, locked);
      };

      p.mousePressed = () => {
        if (!inCanvas(p)) return;
        const tp = a.tap(locked);
        if (tp === 'off') return;
        if (tp !== 'play' || pause > 0) return false;
        const it = item();
        // ¿Tocó una bandera? (su píldora o su asta); si no, es un salto.
        // Gana la píldora más cercana (están apiladas y pueden quedar casi una sobre otra); el asta solo si no hay píldora.
        const geo = perm.map((k, i) => { const x = X(+it.flags[k]), top = lineY - 44 - i * 26; return { x, top, px: x + 20 > W - 26 ? x - 20 : x + 20, py: top + 2 }; });
        let f = -1, bd = Infinity;
        geo.forEach((g, i) => { const dx = Math.abs(p.mouseX - g.px), dy = Math.abs(p.mouseY - g.py); if (dx <= 30 && dy <= 13 && dx + dy * 3 < bd) { bd = dx + dy * 3; f = i; } });
        if (f < 0) f = geo.findIndex(g => Math.abs(p.mouseX - g.x) < 12 && p.mouseY > g.top + 15 && p.mouseY < lineY - 12);
        if (f >= 0 && p.mouseY < lineY - 10) {
          if (jumps < need(it)) a.say(it.n ? `Primero da los ${it.n} saltos` : 'Salta más veces: mira cuánto avanza', C.sun);
          else answer(f);
          return false;
        }
        if (p.mouseY < lineY) return false;
        if (it.n && jumps >= it.n) { a.say(`Ya diste los ${it.n} saltos: toca la bandera`, C.sun); return false; }
        if (hop > 0 || jumps >= 14) return false;
        from = frog; jumps++; frog = partial(it, jumps); hop = 1; api.sfx?.tap?.();
        return false;
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ done: [...st.done] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
      // Para pruebas en el navegador: lo que hay en pantalla en este momento.
      peek: () => { const it = item(); return { phase: a.phase, cur: a.cur, lives: a.lives, W, H, jumps, need: need(it), pause, hopping: hop > 0, pondY: lineY + 50, flags: perm.map((k, i) => { const x = X(+it.flags[k]); return { x: x + 20 > W - 26 ? x - 20 : x + 20, y: lineY - 42 - i * 26, good: k === it.answer }; }) }; },
    };
  }

  return { grade, create, partial, limitOf, answerOf };
})();
;
//#archivo js/games/salta-la-coma.js
// Salta el punto (Álgebra, notación científica; lección alg-21b): los dígitos de un número con su punto decimal y,
// al lado, una potencia de 10. Con ◀ y ▶ se corre el punto un lugar: el número de adelante se hace diez veces más
// chico o más grande y el exponente de 10 lo compensa, así que el valor no cambia. Meta 'sci': dejar un solo dígito
// (no cero) antes del punto. Meta 'std': dejar 10⁰, o sea, escribir el número completo.
// params = { rounds: [{ digits, point, exp?, goal: 'sci' | 'std' }] }   digits: cadena; point: cuántos dígitos van antes del punto
// state = { rounds: [{ pt }] }      Spec 2026-11-15-torres-de-potencias.

GAMES['salta-la-coma'] = (() => {
  const expAt = (r, pt) => (r.exp ?? 0) + r.point - pt;
  const first = r => r.digits.search(/[1-9]/);
  // Dónde debe quedar el punto.
  const goalPt = r => (r.goal === 'sci' ? first(r) + 1 : r.point + (r.exp ?? 0));
  // El número de adelante, sin ceros de sobra: «003.840» → «3.84».
  function coefTxt(r, pt) {
    const a = r.digits.slice(0, pt).replace(/^0+(?=\d)/, '') || '0', b = r.digits.slice(pt).replace(/0+$/, '');
    return b ? `${a}.${b}` : a;
  }
  const numTxtOf = (r, pt) => `${coefTxt(r, pt)} × 10${sup(expAt(r, pt))}`;

  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ pt: r.point }),
    ok: (s, r) => s.pt === goalPt(r),
    solution: r => `${numTxtOf(r, r.point)} = ${r.goal === 'sci' ? numTxtOf(r, goalPt(r)) : coefTxt(r, goalPt(r))}`,
    prompt: r => (r.goal === 'sci' ? 'Corre el punto hasta dejar un solo dígito, que no sea cero, antes de él' : 'Corre el punto hasta que la potencia de 10 sea 10⁰: el número completo'),
    foot: (r, s) => `Cada salto cambia el exponente en 1 · saltos: ${Math.abs(s.pt - r.point)}`,
    layout(G) { G.btn = [{ x: G.W / 2 - 96, y: G.H - 76, w: 88, h: 38, d: -1 }, { x: G.W / 2 + 8, y: G.H - 76, w: 88, h: 38, d: 1 }]; },
    draw(G) {
      const { p, C, W, H, s, r } = G, n = r.digits.length, cw = Math.min(34, (W - 30) / n), x0 = W / 2 - (n * cw) / 2, y = 128;
      const a0 = Math.max(0, Math.min(s.pt - 1, first(r))), b1 = Math.max(s.pt, r.digits.replace(/0+$/, '').length);   // lo que de verdad se lee
      for (let i = 0; i < n; i++) {
        const live = i >= a0 && i < b1;
        drawTile(p, C, { x: x0 + i * cw + 2, y, w: cw - 4, h: 44 }, r.digits[i], { fill: live ? C.cream : C.card, ink: live ? undefined : C.mute, size: 22, r: 8, lift: live ? 3 : 0 });
      }
      const px = x0 + s.pt * cw;
      p.noStroke(); p.fill(C.coral); p.circle(px, y + 50, 13);
      if (s.pt !== r.point) {   // el camino del punto, salto a salto
        const dir = Math.sign(s.pt - r.point);
        p.noFill(); p.stroke(C.coral); p.strokeWeight(2);
        for (let k = r.point; k !== s.pt; k += dir) p.arc(x0 + (k + dir / 2) * cw, y + 58, cw, 20, 0, Math.PI);
      }
      const good = !VELO.on && s.pt === goalPt(r);
      p.noStroke(); p.fill(good ? C.ok : C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.textSize(24);
      fitText(p, numTxtOf(r, s.pt), W / 2, y + 108, W - 30, 24);
      p.fill(C.mute); p.textSize(12);
      p.text(r.goal === 'sci' ? 'entre 1 y 10, por una potencia de 10' : 'el mismo número, escrito de otra forma', W / 2, y + 128);
      G.btn.forEach(b => drawTile(p, C, b, b.d < 0 ? '◀ punto' : 'punto ▶', { fill: C.cream, size: 14, r: 10, lift: 2 }));
    },
    press(G, x, y) {
      const b = G.btn.find(q => hitBox(q, x, y));
      if (!b) return false;
      G.s.pt = Math.max(1, Math.min(G.r.digits.length, G.s.pt + b.d)); G.touch();
      return true;
    },
    peek: G => ({ btn: G.btn, goal: goalPt(G.r) }),
  });
  return { ...game, expAt, goalPt, coefTxt, numTxtOf };
})();
;
//#archivo js/games/pisa-huellas.js
// Pisa las huellas (Álgebra, progresiones aritméticas). Un caminante da pasos iguales sobre la recta: el paso 1 cae
// en a₁ y cada paso avanza d (o retrocede, si d es negativo). Dos banderas marcan dónde cayeron dos pasos conocidos.
// Con − / + se fijan a₁ y d; las huellas numeradas se mueven en vivo. Gana cuando las dos huellas pisan sus banderas:
// aₖ = a₁ + (k − 1)d.
// params = { rounds: [{ known: [[k, valor], [k, valor]], a1, d }] }   state = { ans: [[a1, d] | null por ronda] }

GAMES['pisa-huellas'] = (() => {
  const termAt = (a1, d, k) => a1 + (k - 1) * d;
  const okRound = (a, r) => Array.isArray(a) && r.known.every(([k, v]) => termAt(a[0], a[1], k) === v);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okRound(state.ans?.[i], r));
    return { ok, solution: params.rounds.map(r => `a₁ = ${r.a1}, d = ${r.d}`.replace(/-/g, '−')).join(' · ') };
  }

  const neg = v => String(v).replace('-', '−');

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const A = R.map(() => ({ a1: 0, d: 1, touched: false }));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], B = {}, hold = null;

    function layout(w, h) {
      W = w; H = h; tabs = roundTabs(R.length, w);
      const bw = 44, y1 = h - 92, y2 = h - 48;
      B = { aM: { x: w - 2 * bw - 22, y: y1, w: bw, h: 36 }, aP: { x: w - bw - 12, y: y1, w: bw, h: 36 },
        dM: { x: w - 2 * bw - 22, y: y2, w: bw, h: 36 }, dP: { x: w - bw - 12, y: y2, w: bw, h: 36 } };
    }
    function change(f) {
      if (locked) return;
      const a = A[cur]; f(a); a.touched = true;
      api.ready(A.every(x => x.touched)); api.sfx?.tap?.();
    }
    // Recta fija por ronda (las banderas no se mueven): abarca los pasos correctos con margen. Las huellas que caen
    // fuera no se amontonan: se cuentan con una flecha en el borde.
    function range(r) {
      const n = Math.max(...r.known.map(k => k[0])) + 1;
      const vals = Array.from({ length: n }, (_, k) => termAt(r.a1, r.d, k + 1));
      return { n, lo: Math.min(0, ...vals) - 3, hi: Math.max(...vals) + 3 };
    }
    // Cada botón: qué hace al tocarlo (mantenerlo pulsado repite el paso).
    const ACT = {
      aM: a => { a.a1 = Math.max(-30, a.a1 - 1); }, aP: a => { a.a1 = Math.min(40, a.a1 + 1); },
      dM: a => { a.d = Math.max(-10, a.d - 1); }, dP: a => { a.d = Math.min(10, a.d + 1); },
    };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function button(b, t) {
        drawTile(p, C, b, t, { fill: C.sky, r: 9, lift: 2, size: 20 });
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], a = locked && !okRound([A[cur].a1, A[cur].d], r) ? { a1: r.a1, d: r.d } : A[cur];
        const good = okRound([A[cur].a1, A[cur].d], r);
        drawTabs(p, C, tabs, cur, i => (locked ? (okRound([A[i].a1, A[i].d], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : A[i].touched ? C.Q : C.line));
        const [[k1, v1], [k2, v2]] = r.known;
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, `El paso ${k1} cayó en ${neg(v1)} y el paso ${k2} en ${neg(v2)}`, W / 2, 56, W - 24, 14);
        p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, 'Elige el primer paso y el salto', W / 2, 76, W - 24, 12);
        // Recta
        if (hold && p.mouseIsPressed && !locked && p.frameCount - hold.f > 18 && p.frameCount % 4 === 0) change(ACT[hold.k]);
        const { n, lo, hi } = range(r), x0 = 16, x1 = W - 16, ly = H * 0.47;
        const X = v => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
        p.stroke(C.ink); p.strokeWeight(3); p.line(x0, ly, x1, ly);
        const every = hi - lo > 60 ? 10 : hi - lo > 30 ? 5 : hi - lo > 14 ? 2 : 1;
        for (let v = Math.ceil(lo); v <= hi; v++) {
          if (v % every) continue;
          p.stroke(C.ink); p.strokeWeight(1.5); p.line(X(v), ly - 5, X(v), ly + 5);
          if (v % (every * 2) === 0 || every >= 5) { p.noStroke(); p.fill(C.mute); p.textSize(10); p.text(neg(v), X(v), ly + 34); }
        }
        // Banderas de los pasos conocidos
        for (const [k, v] of r.known) {
          const fx = X(v);
          p.stroke(C.ink); p.strokeWeight(1.5); p.line(fx, ly, fx, ly - 46);
          p.noStroke(); p.fill(C.coral); p.triangle(fx, ly - 46, fx + 13, ly - 41.5, fx, ly - 37);
          p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(10); p.text(`paso ${k}`, fx, ly - 54);
        }
        // Huellas: arriba y abajo de la recta, alternadas, para que no se tapen
        let left = 0, right = 0;
        for (let k = 1; k <= n; k++) {
          const v = termAt(a.a1, a.d, k);
          if (v < lo) { left++; continue; }
          if (v > hi) { right++; continue; }
          const x = X(v), up = k % 2 === 1, y = up ? ly - 16 : ly + 16;
          const hit = !VELO.on && r.known.some(([kk, vv]) => kk === k && vv === v);
          const fc = hit || locked ? C.ok : C.sky;   // huellas azules; verdes cuando pisan una bandera
          p.noStroke(); p.fill(fc); p.ellipse(x, y, 14, 18);
          p.fill(inkOn(fc, C.bg)); p.textStyle(p.BOLD); p.textSize(9); p.text(k, x, y + 1);
        }
        p.noStroke(); p.fill(C.brand); p.textStyle(p.BOLD); p.textSize(11);
        if (left) { p.triangle(x0 - 6, ly, x0 + 2, ly - 5, x0 + 2, ly + 5); p.textAlign(p.LEFT, p.CENTER); p.text(`${left} huellas`, x0, ly + 54); }
        if (right) { p.triangle(x1 + 6, ly, x1 - 2, ly - 5, x1 - 2, ly + 5); p.textAlign(p.RIGHT, p.CENTER); p.text(`${right} huellas`, x1, ly + 54); }
        p.textAlign(p.CENTER, p.CENTER);
        // Controles y lectura
        p.textAlign(p.LEFT, p.CENTER); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(15);
        p.text(`a₁ = ${neg(a.a1)}`, 16, B.aM.y + 18); p.text(`d = ${neg(a.d)}`, 16, B.dM.y + 18);
        p.textAlign(p.CENTER, p.CENTER);
        button(B.aM, '−'); button(B.aP, '+'); button(B.dM, '−'); button(B.dP, '+');
        const msg = locked ? (good ? '¡Las dos huellas pisan su bandera!' : `Era a₁ = ${neg(r.a1)} y d = ${neg(r.d)}`)
          : `paso ${k2}: ${neg(a.a1)} + ${k2 - 1} · ${a.d < 0 ? `(${neg(a.d)})` : a.d} = ${neg(termAt(a.a1, a.d, k2))}`;
        p.fill(locked ? C.ok : C.mute); p.textStyle(p.NORMAL); fitText(p, msg, W / 2, B.aM.y - 18, W - 24, 12);
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        for (const k of Object.keys(ACT)) if (hitBox(B[k], x, y)) { change(ACT[k]); hold = { k, f: p.frameCount }; return false; }
      };
      p.mouseReleased = () => { hold = null; };
    }, 1.25);

    return {
      loaded: m.ready,
      getState: () => ({ ans: A.map(a => (a.touched ? [a.a1, a.d] : null)) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, termAt };
})();
;
//#archivo js/games/porcentaje-cambio.js
// El porcentaje de cambio (Álgebra, aumentos y descuentos). Una cantidad pasa de un valor viejo a uno nuevo (dos barras).
// Con −10, −1, +1, +10 se fija cuánto cambió en porcentaje: (nuevo − viejo) / viejo · 100. Una regla marca cada 10 %
// de la cantidad vieja, que es el 100 %. Enseña que el cambio se mide sobre el valor de antes y que subir y bajar no son
// simétricos (de 40 a 50 es +25 %, pero de 50 a 40 es −20 %).
// params = { rounds: [{ from, to, unit }] }   state = { pcts: [número | null por ronda] }

GAMES['porcentaje-cambio'] = (() => {
  const changeOf = r => Math.round(((r.to - r.from) / r.from) * 100 * 1e6) / 1e6;
  const okRound = (v, r) => v === changeOf(r);
  const sign = v => (v > 0 ? `+${v}` : String(v).replace('-', '−'));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okRound(state.pcts?.[i], r));
    return { ok, solution: params.rounds.map(r => `${r.from} → ${r.to}: ${sign(changeOf(r))} %`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const V = R.map(() => 0), touched = R.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], B = [];

    function layout(w, h) {
      W = w; H = h; tabs = roundTabs(R.length, w);
      const bw = (w - 24 - 18) / 4;
      B = [-10, -1, 1, 10].map((d, k) => ({ d, x: 12 + k * (bw + 6), y: h - 48, w: bw, h: 36 }));
    }
    function step(d) {
      if (locked) return;
      V[cur] = Math.max(-100, Math.min(300, V[cur] + d)); touched[cur] = true;
      api.ready(touched.every(Boolean)); api.sfx?.tap?.();
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], good = okRound(V[cur], r), v = locked && !good ? changeOf(r) : V[cur];
        drawTabs(p, C, tabs, cur, i => (locked ? (okRound(V[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Q : C.line));
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, `Pasó de ${r.from} a ${r.to}${r.unit ? ' ' + r.unit : ''}`, W / 2, 56, W - 24, 15);
        p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, '¿En qué porcentaje cambió?', W / 2, 78, W - 24, 12);
        // Barras: antes (el 100 %) y después
        const base = H - 112, top = 100, mx = Math.max(r.from, r.to) * 1.08;
        const hh = val => ((base - top) * Math.max(0, val)) / mx, bw = Math.min(64, (W - 60) / 2);
        const xa = W / 2 - bw - 12, xb = W / 2 + 12;
        // Regla de porcentajes de «antes»: una raya cada 10 % (más marcada cada 50 %), para medir sin dar la respuesta.
        for (let k = 1; r.from * k / 10 <= mx; k++) {
          const y = base - hh(r.from * k / 10), big = k % 5 === 0;
          p.stroke(C.line); p.strokeWeight(big ? 1.5 : 0.8); p.line(xa - (big ? 10 : 5), y, xb + bw, y);
          if (big) { p.noStroke(); p.fill(C.mute); p.textSize(9); p.textAlign(p.RIGHT, p.CENTER); p.text(`${k * 10} %`, xa - 12, y); p.textAlign(p.CENTER, p.CENTER); }
        }
        p.noStroke(); p.fill(C.sky); p.rect(xa, base - hh(r.from), bw, hh(r.from), 6, 6, 0, 0);
        p.fill(C.sun); p.rect(xb, base - hh(r.to), bw, hh(r.to), 6, 6, 0, 0);
        if (locked && !good) {   // al fallar: lo elegido (rojo) y lo correcto (verde) aplicados a «antes»
          const mine = r.from * (1 + V[cur] / 100);
          p.drawingContext.setLineDash([5, 4]); p.noFill(); p.strokeWeight(2);
          p.stroke(C.bad); p.rect(xb - 4, base - hh(mine), bw + 8, hh(mine));
          p.stroke(C.ok); p.rect(xb - 7, base - hh(r.to), bw + 14, hh(r.to));
          p.drawingContext.setLineDash([]);
        }
        p.stroke(C.mute); p.strokeWeight(2); p.line(16, base, W - 16, base);
        // Los valores van dentro de las barras: arriba de ellas cruzaría la regla.
        p.noStroke(); p.fill(C.bg); p.textStyle(p.BOLD); p.textSize(13);
        p.fill(inkOn(C.sky, C.bg)); p.text(String(r.from), xa + bw / 2, base - hh(r.from) + 12); p.fill(inkOn(C.sun, C.bg)); p.text(String(r.to), xb + bw / 2, base - hh(r.to) + 12);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11);
        p.text('antes (100 %)', xa + bw / 2, base + 12); p.text('después', xb + bw / 2, base + 12);
        // Lectura del cambio elegido
        p.fill(locked ? C.ok : C.brand); p.textStyle(p.BOLD);
        drawPill(p, C, `cambio: ${sign(v)} %`, W / 2, base + 38, locked ? C.ok : C.sun, 16);
        for (const b of B) {
          drawTile(p, C, b, b.d > 0 ? `+${b.d}` : `−${-b.d}`, { fill: b.d > 0 ? C.mint : C.coral, r: 9, lift: 2, size: 15 });
        }
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        const b = B.find(b => hitBox(b, x, y));
        if (b) { step(b.d); return false; }
      };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ pcts: V.map((v, i) => (touched[i] ? v : null)) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, changeOf };
})();
;
//#archivo js/games/mapa-del-texto.js
// Mapa del texto (lectura, kit LEC): a cada párrafo se le arrastra la etiqueta de lo que hace (plantea, explica, da un ejemplo,
// objeta, concluye…). Abajo se va armando el esqueleto del texto, párrafo por párrafo. Entrena «el párrafo cumple la función de».
// params = { doc, labels: [etiquetas, pueden sobrar], key: [índice de la etiqueta de cada párrafo], ask? }
GAMES['mapa-del-texto'] = LEC.drop('mapa-del-texto', {
  norm: p => {
    const want = p.key.map(k => p.labels[k]);
    return [{
      ask: p.ask || 'Arrastra a cada párrafo lo que hace en el texto.',
      chips: p.labels,
      zones: p.doc.paras.map((_, i) => ({ label: `¶${i + 1}`, cap: 1 })),
      key: p.labels.map(t => { const zs = want.map((w, i) => w === t ? i : -1).filter(i => i >= 0); return zs.length ? zs : null; }),
    }];
  },
  render: (r, u) => {
    const rows = r.zones.map((_, zi) => u.zone(zi, { cls: 'lec-row', before: `<span class="lec-first">${u.esc(u.first(u.doc.paras[zi], 6))}</span>` })).join('');
    const esq = r.zones.map((_, zi) => { const c = u.placed(zi)[0]; return `<span class="lec-bone${c == null ? ' gap' : ''}">${zi + 1} ${c == null ? '…' : u.fmt(r.chips[c])}</span>`; }).join('<span class="lec-arrow">→</span>');
    return `<div class="lec-zones lec-rows">${rows}</div><div class="lec-esq" aria-label="Esqueleto del texto">${esq}</div>${u.pool()}`;
  },
});
;
//#archivo js/games/resume-parrafo.js
// Resume el párrafo (lectura, kit LEC): para cada párrafo se arrastra la frase que dice su idea central. Sobran resúmenes que se
// quedan en un detalle o que dicen más de lo que el párrafo dice. Entrena la idea central y el «propósito principal».
// params = { doc, paras: [números de párrafo], options: [resúmenes], key: [índice del resumen de cada párrafo listado], ask? }
GAMES['resume-parrafo'] = LEC.drop('resume-parrafo', {
  norm: p => [{
    ask: p.ask || 'Arrastra a cada párrafo la frase que resume su idea central.',
    chips: p.options,
    zones: p.paras.map(n => ({ label: `¶${n}`, cap: 1 })),
    key: p.options.map((_, c) => { const j = p.key.indexOf(c); return j >= 0 ? j : null; }),
  }],
  render: (r, u) => `<div class="lec-zones lec-rows">${r.zones.map((z, zi) => u.zone(zi, { cls: 'lec-row lec-wide', before: `<span class="lec-first">${u.esc(u.first(u.doc.paras[+z.label.slice(1) - 1], 6))}</span>` })).join('')}</div>${u.pool()}`,
});
;
//#archivo js/games/donde-buscar.js
// ¿Dónde lo busco? (lectura, kit LEC): cada pregunta del examen se arrastra al párrafo al que hay que volver para responderla.
// El examen casi siempre se gana volviendo al texto; esto entrena a ubicar rápido sin releerlo entero.
// params = { doc, cards: [[pregunta, [párrafos que sirven]]], ask? }
GAMES['donde-buscar'] = LEC.drop('donde-buscar', {
  norm: p => [{
    ask: p.ask || 'Lleva cada pregunta al párrafo donde está su respuesta.',
    chips: p.cards.map(c => c[0]),
    zones: p.doc.paras.map((_, i) => ({ label: `¶${i + 1}`, cap: 0 })),
    key: p.cards.map(c => c[1].map(n => n - 1)),
  }],
  render: (r, u) => `<div class="lec-zones lec-shelf">${r.zones.map((_, zi) => u.zone(zi, { cls: 'lec-shelf-z', before: `<span class="lec-first">${u.esc(u.first(u.doc.paras[zi], 4))}</span>` })).join('')}</div>${u.pool()}`,
});
;
//#archivo js/games/lupa-evidencia.js
// Lupa de evidencia (lectura, kit LEC): cada afirmación va a una de tres cajas: el texto lo dice (con otras palabras o tal cual),
// se deduce de lo que dice, o el texto no lo dice (aunque suene razonable). Las cajas se llenan a la vista. Entrena la diferencia
// entre información explícita, inferencia y lo que el lector añade, que es la trampa más común del examen.
// params = { doc, cards: [[afirmación, 0 lo dice | 1 se deduce | 2 no lo dice]], ask? }
GAMES['lupa-evidencia'] = LEC.drop('lupa-evidencia', {
  norm: p => [{
    ask: p.ask || 'Pon cada afirmación en su caja: ¿lo dice el texto, se deduce o no lo dice?',
    chips: p.cards.map(c => c[0]),
    zones: [{ label: 'Lo dice el texto', cap: 0 }, { label: 'Se deduce', cap: 0 }, { label: 'No lo dice', cap: 0 }],
    key: p.cards.map(c => c[1]),
  }],
  render: (r, u) => {
    const icon = ['<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5 L20 20"/>', '<path d="M4 7h14M4 12h10M4 17h6"/><path d="M15 15l3 3 4-6"/>', '<circle cx="12" cy="12" r="8"/><path d="M6 18 L18 6"/>'];
    const n = r.chips.length;
    return `<div class="lec-zones lec-bins">${r.zones.map((_, zi) => u.zone(zi, { cls: 'lec-bin', before: `<svg class="lec-ico" viewBox="0 0 24 24" aria-hidden="true">${icon[zi]}</svg><span class="lec-level" style="--lv:${Math.round(100 * u.count(zi) / n)}%"></span>` })).join('')}</div>${u.pool()}`;
  },
});
;
//#archivo js/games/intruso-excepto.js
// El intruso de la pregunta EXCEPTO (lectura, kit LEC): las cuatro opciones de una pregunta «EXCEPTO» se llevan al párrafo que las
// respalda. Tres encuentran casa; la que no la encuentra va a «No aparece» y es la respuesta. Enseña el método: verificar cada
// opción contra el texto en vez de elegir la que «suena rara».
// params = { doc, ask, cards: [[opción, [párrafos] | null si es la que no está]] }
GAMES['intruso-excepto'] = LEC.drop('intruso-excepto', {
  norm: p => {
    const zones = [...p.doc.paras.map((_, i) => ({ label: `¶${i + 1}`, cap: 0 })), { label: 'No aparece', cap: 1 }];
    return [{ ask: p.ask, chips: p.cards.map(c => c[0]), zones, key: p.cards.map(c => c[1] ? c[1].map(n => n - 1) : zones.length - 1) }];
  },
  render: (r, u) => {
    const last = r.zones.length - 1;
    return `<div class="lec-zones lec-shelf">${r.zones.slice(0, last).map((_, zi) => u.zone(zi, { cls: 'lec-shelf-z' })).join('')}</div>`
      + `<div class="lec-zones lec-none">${u.zone(last, { cls: 'lec-out' })}</div>${u.pool()}`;
  },
});
;
//#archivo js/games/caso-nuevo.js
// Un caso nuevo (lectura, kit LEC): arriba la idea del texto; abajo, situaciones que el texto no menciona. Cada una se lleva a
// «Aplica la idea» o a «No la aplica». Entrena las preguntas de aplicación y analogía («un caso semejante sería…»).
// params = { doc, principle, cards: [[situación, true si aplica la idea]], ask? }
GAMES['caso-nuevo'] = LEC.drop('caso-nuevo', {
  norm: p => [{
    ask: p.ask || '¿Cuáles situaciones repiten la idea del texto?',
    chips: p.cards.map(c => c[0]),
    zones: [{ label: 'Aplica la idea', cap: 0 }, { label: 'No la aplica', cap: 0 }],
    key: p.cards.map(c => c[1] ? 0 : 1),
    principle: p.principle,
  }],
  render: (r, u) => `<p class="lec-thesis"><span class="lec-zl">La idea del texto</span>${u.fmt(r.principle)}</p>`
    + `<div class="lec-zones lec-pans">${u.zone(0, { cls: 'lec-dock' })}${u.zone(1, { cls: 'lec-dock lec-dock-no' })}</div>${u.pool()}`,
});
;
//#archivo js/games/lineal-escena.js
// Ejercicios de «Funciones Lineales» (Preicfes, icf-ma-lineal; spec 2026-11-25-preicfes-estructura) con el plano y las barras de la
// explicación. Armazones en figura-kit y conteo-escena. La escena no dice el resultado mientras se responde.
(() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−');
  const neutro = ['Se pasó. Comprueba ese número en el enunciado.', 'Le faltó. Comprueba ese número en el enunciado.'];
  // Plano: x de 0 a p.xm y y de 0 a p.ym, con rayas cada p.sx y p.sy.
  const PX = (p, x) => 52 + x / p.xm * 256, PY = (p, y) => 180 - y / p.ym * 150;
  const plano = (K, p) => {
    let h = '';
    for (let x = 0; x <= p.xm + 1e-9; x += p.sx || 1) h += K.l(PX(p, x), 30, PX(p, x), 180, x ? 'lr' : 'lm') + K.t(PX(p, x), 196, N(x), 's tm');
    for (let y = 0; y <= p.ym + 1e-9; y += p.sy || 1) h += K.l(52, PY(p, y), 308, PY(p, y), y ? 'lr' : 'lm') + (y && Math.round(y / (p.sy || 1)) % (p.ym / (p.sy || 1) > 8 ? 2 : 1) === 0 ? K.t(45, PY(p, y) + 4, N(y), 's tm', 'end') : '');
    return h + K.t(308, 212, p.ex || 'x', 's tm', 'end') + K.t(40, 16, p.ey || 'y', 's tm', 'start');
  };
  const linea = (K, p, pts, cls) => K.pl(pts.map(([x, y]) => [PX(p, x), PY(p, y)]), cls);

  // Un punto fijo A y otro que se arrastra: la recta entre los dos debe cambiar m por cada 1.
  const llega = p => { for (let x = p.xm; x > p.a[0]; x--) { const y = p.a[1] + p.m * (x - p.a[0]); if (y >= 0 && y <= p.ym && Number.isInteger(y)) return { x, y }; } return null; };
  XG.figura('pendiente-escalon', {
    ini: p => ({ x: p.xm, y: p.a[1] }), alto: () => 218, ms: 900, pie: 'Arrastra el punto.',
    manijas: p => [{ k: ['x', 'y'], min: [p.a[0] + 1, 0], max: [p.xm, p.ym], paso: 1, r: 10, en: v => [PX(p, v.x), PY(p, v.y)], de: (x, y) => [(x - 52) / 256 * p.xm, (180 - y) / 150 * p.ym] }],
    ok: (v, p) => Math.abs((v.y - p.a[1]) - p.m * (v.x - p.a[0])) < 1e-9,
    sol: llega, texto: p => `por ejemplo, (${llega(p).x}, ${llega(p).y})`,
    dib: (v, K, p, f) => plano(K, p) + linea(K, p, [p.a, [v.x, v.y]], 'la gr') + K.f(f, linea(K, p, [p.a, [v.x, p.a[1]], [v.x, v.y]], 'lg d')) + K.c(PX(p, p.a[0]), PY(p, p.a[1]), 6, 'fG') + K.t(PX(p, p.a[0]) - 12, PY(p, p.a[1]) - 8, 'A', 'b tg') + (f ? K.c(PX(p, v.x), PY(p, v.y), 7, 'fA') : ''),
    aviso: (v, p) => `De A a tu punto avanza ${v.x - p.a[0]} y ${v.y < p.a[1] ? 'baja' : 'sube'} ${Math.abs(v.y - p.a[1])}: compara con lo que se pide por cada 1.`, bien: (v, p) => `Cambia ${N(v.y - p.a[1])} en ${v.x - p.a[0]}: ${N(p.m)} por cada 1.`,
  });
  // Se arma la recta con lo que vale en 0 y lo que vale en xm.
  XG.figura('tarifa-recta', {
    ini: () => ({ b: 0, e: 0 }), alto: () => 218, ms: 900, pie: 'Arrastra los dos extremos de la recta.',
    manijas: p => [{ k: 'b', min: 0, max: p.ym, paso: p.sy, r: 10, en: v => [PX(p, 0), PY(p, v.b)], de: (x, y) => (180 - y) / 150 * p.ym }, { k: 'e', min: 0, max: p.ym, paso: p.sy, r: 10, en: v => [PX(p, p.xm), PY(p, v.e)], de: (x, y) => (180 - y) / 150 * p.ym }],
    ok: (v, p) => v.b === p.b && v.e === p.b + p.m * p.xm, sol: p => ({ b: p.b, e: p.b + p.m * p.xm }), texto: p => `empieza en ${N(p.b)} y llega a ${N(p.b + p.m * p.xm)}`,
    dib: (v, K, p, f) => plano(K, p) + linea(K, p, [[0, v.b], [p.xm, v.e]], 'la gr') + (f ? K.c(PX(p, 0), PY(p, v.b), 7, 'fA') + K.c(PX(p, p.xm), PY(p, v.e), 7, 'fA') : ''),
    aviso: (v, p) => (v.b !== p.b ? `Tu recta empieza en ${N(v.b)}: mira cuánto hay antes de avanzar.` : `Tu recta cambia ${N((v.e - v.b) / p.xm)} por cada 1.`), bien: (v, p) => `Empieza en ${N(p.b)} y cambia ${N(p.m)} por cada 1.`,
  });
  // Barras: lo fijo y x veces m. La escena solo muestra los datos hasta comprobar.
  const barra = (K, y, fijo, m, n, u, f) => K.r(30, y, fijo * u, 28, 'fg', 0) + (f ? Array.from({ length: n }, (_, i) => K.f(Math.min(1, Math.max(0, f * n - i)), K.r(30 + (fijo + i * m) * u, y, m * u, 28, 'fa', 0))).join('') : '');
  XG.figura('llega-presupuesto', {
    ini: () => ({ x: 0 }), alto: () => 176, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.b + p.m * v.x === p.total, sol: p => ({ x: (p.total - p.b) / p.m }), texto: p => `${(p.total - p.b) / p.m}`,
    dib: (v, K, p, f) => { const u = 270 / Math.max(p.total, f ? p.b + p.m * v.x : 0); return K.t(30, 24, `fijo ${N(p.b)} · ${N(p.m)} por cada ${p.uno}`, 's tm', 'start') + K.r(30, 34, p.total * u, 18, 'fn', 0) + K.t(Math.max(250, 30 + p.total * u), 24, N(p.total), 's', 'end') + barra(K, 62, p.b, p.m, v.x, u, f); },
    aviso: (v, p) => `Con ${v.x} se llega a ${N(p.b + p.m * v.x)}.`, bien: (v, p) => `${N(p.b)} + ${N(p.m)} · ${v.x} = ${N(p.total)}.`,
  });
  XG.figura('vacia-tanque', {
    ini: () => ({ x: 0 }), alto: () => 206, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'minutos' }], ok: (v, p) => p.b - p.m * v.x === p.q, sol: p => ({ x: (p.b - p.q) / p.m }), texto: p => `${(p.b - p.q) / p.m} minutos`,
    dib: (v, K, p, f) => { const alt = Math.max(0, p.b - p.m * v.x * f) / p.b * 110; return K.r(110, 14, 120, 116, 'fn', 4) + K.r(112, 128 - alt, 116, alt, 'fa', 2) + K.t(240, 24, `${N(p.b)} L`, 's tm', 'start') + K.t(240, 124, `−${N(p.m)} L/min`, 's tm', 'start') + K.f(f, K.l(104, 128 - p.q / p.b * 110, 236, 128 - p.q / p.b * 110, 'lf d')); },
    aviso: (v, p) => (p.b - p.m * v.x < 0 ? 'A esa hora ya no quedaba agua.' : `En ${v.x} minutos quedan ${N(p.b - p.m * v.x)}.`), bien: (v, p) => `${N(p.b)} − ${N(p.m)} · ${v.x} = ${N(p.q)}.`,
  });
  const cruce = p => (p.c[0] - p.a[0]) / (p.a[1] - p.c[1]);
  XG.figura('cruce-planes', {
    ini: () => ({ x: 0 }), alto: () => 206, ms: 1200, pie: 'Mueve la perilla.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.a[0] + p.a[1] * v.x === p.c[0] + p.c[1] * v.x, sol: p => ({ x: cruce(p) }), texto: p => `${cruce(p)}`,
    dib: (v, K, p, f) => { const u = 280 / Math.max(p.a[0] + p.a[1] * p.max, p.c[0] + p.c[1] * p.max); return [[p.a, 'A', 30], [p.c, 'B', 92]].map(([t, n, y]) => K.t(30, y - 6, `${n}: fijo ${N(t[0])} · ${N(t[1])} por cada ${p.uno}`, 's tm', 'start') + barra(K, y, t[0], t[1], v.x, u, f)).join(''); },
    aviso: (v, p) => { const a = p.a[0] + p.a[1] * v.x, c = p.c[0] + p.c[1] * v.x; return `Con ${v.x}, A vale ${N(a)} y B, ${N(c)}: se llevan ${N(Math.abs(a - c))}.`; }, bien: (v, p) => `Los dos valen ${N(p.a[0] + p.a[1] * v.x)}.`,
  });
  // Desde dónde y hacia dónde conviene un plan.
  const ZX = (p, x) => 34 + x / p.max * 272;
  XG.figura('zona-conviene', {
    ini: () => ({ x: 0, d: 1 }), alto: () => 190, ms: 900, pie: 'Mueve el borde y cambia el lado.',
    manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, r: 12, en: v => [ZX(p, v.x), 46], de: x => (x - 34) / 272 * p.max }, { k: 'd', min: -1, max: 1, paso: 2, et: 'el lado', rot: v => (v.d > 0 ? '→' : '←') }],
    ok: (v, p) => v.x === p.x && v.d === p.d, sol: p => ({ x: p.x, d: p.d }), texto: p => `${p.d > 0 ? 'más' : 'menos'} de ${p.x}`,
    dib: (v, K, p, f) => { let h = K.l(34, 80, 306, 80, 'lm'); for (let i = 0; i <= p.max; i += p.st || 1) h += K.l(ZX(p, i), 76, ZX(p, i), 84, 'lm') + K.t(ZX(p, i), 100, i, 's tm'); return h + K.l(ZX(p, v.x), 46, ZX(p, v.x), 80, 'lg') + (v.d > 0 ? K.r(ZX(p, v.x), 68, 306 - ZX(p, v.x), 12, 'fa', 0) : K.r(34, 68, ZX(p, v.x) - 34, 12, 'fa', 0)) + K.t(170, 22, p.et, 's tm') + (f ? K.c(ZX(p, v.x), 46, 8, 'fG') : ''); },
    aviso: (v, p) => (v.x === p.x ? 'El borde está bien: prueba con un número de ese lado.' : `Con ${v.x}, ¿los dos planes cuestan lo mismo?`), bien: (v, p) => p.ok,
  });
  // Se ponen medidas bajo una gráfica de puntos unidos, o bajo una tabla.
  XG.cuenta('lee-pendiente', 222, (K, p) => plano(K, p) + linea(K, p, p.q, 'la gr') + (p.marca || p.q).map(([x, y]) => K.c(PX(p, x), PY(p, y), 5, 'fG')).join(''));
  XG.cuenta('historia-grafica', 222, (K, p) => plano(K, p) + linea(K, p, p.q, 'la gr') + p.q.slice(1).map(([x, y], i) => K.t((PX(p, x) + PX(p, p.q[i][0])) / 2, (PY(p, y) + PY(p, p.q[i][1])) / 2 - 9, 'ABCD'[i], 'b tg')).join(''));
  XG.cuenta('tabla-lineal', 92, (K, p) => { const n = p.t.length, w = 232 / n; return K.t(16, 34, p.ex, 's tm', 'start') + K.t(16, 72, p.ey, 's tm', 'start') + p.t.map(([x, y], i) => K.r(96 + i * w, 12, w - 4, 34, 'fc', 4) + K.r(96 + i * w, 50, w - 4, 34, 'fc', 4) + K.t(94 + (i + 0.5) * w, 34, N(x), 's') + K.t(94 + (i + 0.5) * w, 72, y == null ? '?' : N(y), y == null ? 'b tf' : 's')).join(''); });
  XG.ascensor('sube-tarifa', 60, 1, neutro);
})();
;
//#archivo js/games/forma-escena.js
// Ejercicios de «Triángulos y Semejanza» (Preicfes, icf-ma-forma; spec 2026-11-25-preicfes-estructura) que no existían: la desigualdad
// triangular. Armazón en figura-kit; la escena no dice el resultado mientras se responde.
(() => {
  const lo = p => Math.abs(p.a - p.b) + 1, hi = p => p.a + p.b - 1;
  // Dos varillas fijas: entre qué enteros puede estar la tercera.
  XG.figura('tercer-lado', {
    ini: () => ({ m: 1, n: 1 }), alto: () => 250, ms: 1000, pie: 'Mueve las dos perillas.',
    manijas: p => [{ k: 'm', min: 1, max: p.max, paso: 1, et: 'la más corta que cierra' }, { k: 'n', min: 1, max: p.max, paso: 1, et: 'la más larga que cierra' }],
    ok: (v, p) => v.m === lo(p) && v.n === hi(p), sol: p => ({ m: lo(p), n: hi(p) }), texto: p => `de ${lo(p)} a ${hi(p)}`,
    dib(v, K, p, f) {
      const u = 250 / p.max, r = (y, n, cls, t) => K.r(45, y, n * u, 20, cls, 2) + K.t(38, y + 15, t, 's tm', 'end');
      return r(12, p.a, 'fa', p.a) + r(40, p.b, 'fg', p.b) + K.f(f, r(76, v.m, v.m === lo(p) ? 'fo' : 'ff', v.m) + r(104, v.n, v.n === hi(p) ? 'fo' : 'ff', v.n)) + (f ? '' : K.t(170, 104, 'la tercera varilla', 's tm'));
    },
    aviso: (v, p) => (v.m !== lo(p) ? (v.m > hi(p) ? `Con ${v.m}, las otras dos no la alcanzan.` : v.m < lo(p) ? `Con ${v.m}, la corta y la de ${Math.min(p.a, p.b)} no pasan a la de ${Math.max(p.a, p.b)}.` : `Una más corta que ${v.m} también cierra.`) : v.n < lo(p) ? `Con ${v.n} todavía no cierra.` : v.n === hi(p) + 1 ? `Con ${v.n}, las otras dos apenas la igualan: queda una línea.` : v.n > hi(p) ? `Con ${v.n}, las otras dos juntas no la alcanzan.` : `Una más larga que ${v.n} también cierra.`),
    bien: (v, p) => `La tercera va entre la resta (${Math.abs(p.a - p.b)}) y la suma (${p.a + p.b}), sin tocarlas.`,
  });
  // Cuáles ternas cierran: se tocan.
  XG.frases('cierran-o-no');
})();
;
//#archivo js/games/expresion-escena.js
// Ejercicios de expresiones algebraicas (Preicfes, icf-ma-ecuaciones; spec 2026-11-25-preicfes-estructura): áreas con letras, términos
// semejantes y factor común. Armazones en figura-kit y conteo-escena. La escena no dice el resultado mientras se responde.
(() => {
  // Rectángulo de lados x + a y x + b partido en cuatro.
  XG.cuenta('area-letras', 150, (K, p) => { const x = 96, y = 24, u = 84, a = 50, b = 36; return K.r(x, y, u, u, 'fa', 0) + K.r(x + u, y, a, u, 'fg', 0) + K.r(x, y + u, u, b, 'fg', 0) + K.r(x + u, y + u, a, b, 'ff', 0) + K.t(x + u / 2, 16, 'x', 's tm') + K.t(x + u + a / 2, 16, p.a, 's tm') + K.t(x - 10, y + u / 2 + 4, 'x', 's tm', 'end') + K.t(x - 10, y + u + b / 2 + 4, p.b, 's tm', 'end'); });
  // Términos en fila: los de la misma clase llevan el mismo color.
  XG.cuenta('junta-terminos', 70, (K, p) => p.t.map((s, i) => { const w = 300 / p.t.length; return K.r(20 + i * w, 14, w - 6, 40, ['fa', 'fg', 'ff'][p.c[i]], 6) + K.t(20 + (i + 0.5) * w - 3, 39, s, 's'); }).join(''));
  // Dos rectángulos pegados: cuál es el alto común más grande.
  XG.figura('factor-comun', {
    ini: () => ({ k: 1 }), alto: () => 190, ms: 1000, pie: 'Mueve el alto.',
    manijas: p => [{ k: 'k', min: 1, max: p.max, paso: 1, et: 'alto común' }], ok: (v, p) => v.k === p.k, sol: p => ({ k: p.k }), texto: p => `${p.k}(${p.a / p.k}${p.x} + ${p.b / p.k})`,
    dib(v, K, p, f) { const k = Math.max(1, Math.round(v.k)), h = 24 + k * 5; return K.r(50, 20, 150, h, 'fa', 0) + K.r(200, 20, 90, h, 'fg', 0) + K.t(125, 26 + h / 2, `${p.a}${p.x}`, 'b') + K.t(245, 26 + h / 2, p.b, 'b') + K.t(42, 24 + h / 2, k, 's tm', 'end') + K.f(f, K.t(125, 38 + h, p.a % k ? 'no cabe justo' : `${p.a / k}${p.x}`, 's tm') + K.t(245, 38 + h, p.b % k ? 'no cabe justo' : p.b / k, 's tm')); },
    aviso: (v, p) => (p.a % v.k || p.b % v.k ? `${v.k} no divide a los dos.` : `${v.k} divide a los dos, pero todavía se puede sacar más.`), bien: (v, p) => `${p.a}${p.x} + ${p.b} = ${p.k}(${p.a / p.k}${p.x} + ${p.b / p.k}).`,
  });
  // x² y dos tiras de a·x: cuántos cuadritos faltan en la esquina.
  XG.figura('cuadrado-falta', {
    ini: () => ({ c: 0 }), alto: () => 214, ms: 1000, pie: 'Mueve los cuadritos.',
    manijas: p => [{ k: 'c', min: 0, max: p.max, paso: 1, et: 'cuadritos de la esquina' }], ok: (v, p) => v.c === p.a * p.a, sol: p => ({ c: p.a * p.a }), texto: p => `${p.a * p.a}: (x + ${p.a})²`,
    dib(v, K, p, f) {
      const u = 13, L = 84, x = 110, y = 16; let h = K.r(x, y, L, L, 'fa', 0) + K.t(x + L / 2, y + L / 2 + 5, 'x²', 'b');
      for (let i = 0; i < p.a; i++) h += K.r(x + L + i * u, y, u - 1, L, 'fg', 0) + K.r(x, y + L + i * u, L, u - 1, 'fg', 0);
      if (f) for (let i = 0; i < Math.round(v.c); i++) { const r = Math.floor(i / p.a), c = i % p.a; h += K.f(Math.min(1, f * 2), K.r(x + L + c * u, y + L + r * u, u - 1, u - 1, r < p.a ? 'ff' : 'fF', 0)); }
      return h + K.t(x - 12, y + L / 2 + 5, 'x', 's tm', 'end') + K.t(x - 12, y + L + p.a * u / 2 + 4, p.a, 's tm', 'end');
    },
    aviso: (v, p) => (v.c < p.a * p.a ? 'Queda un hueco en la esquina.' : 'Sobran cuadritos: se salen del cuadrado.'), bien: (v, p) => `x² + ${2 * p.a}x + ${p.a * p.a} = (x + ${p.a})².`,
  });
  XG.frases('equivalen-no');
})();
;
//#archivo js/games/validar-escena.js
// Ejercicios de «Validar Procedimientos» (Preicfes, icf-ma-argumenta; spec 2026-11-25-preicfes-estructura): si los datos alcanzan o sobran.
// Armazones en proposiciones-escena (renglones y frases).
(() => {
  XG.renglones('alcanza-o-no', { w: 104, x: 278 });   // cada renglón es un dato: con él, ¿alcanza o no alcanza?
  XG.frases('datos-que-sobran');                      // se tocan los datos que no hacen falta
  XG.frases('vale-o-no');                             // se tocan los procedimientos que sí valen
})();
;
//#archivo js/games/finanzas-escena.js
// Ejercicios de «Dinero y Créditos» (Preicfes, icf-ma-finanzas; spec 2026-11-25-preicfes-estructura): interés simple y compuesto, cuotas,
// IVA y descuentos. Armazones en figura-kit, conteo-escena y proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], R = x => Math.round(x * 100) / 100;
  // ------------------------------------------------------------------------------------------- interés simple y compuesto
  // Cuántos periodos de interés simple: cada uno agrega un bloque igual.  params { C, i (interés de cada periodo), meta, max, et }
  XG.figura('plazo-simple', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el plazo.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => p.C + p.i * v.n === p.meta, sol: p => ({ n: (p.meta - p.C) / p.i }), texto: p => `${(p.meta - p.C) / p.i} ${p.et}`,
    dib(v, K, p, f) { const w = 210 / p.max, n = Math.round(v.n); return K.r(20, 30, 80, 48, 'fa', 4) + K.t(60, 60, p.C, 'b') + Array.from({ length: n }, (_, i) => K.r(100 + i * w, 30, Math.max(2, w - 1), 48, 'fg', 2)).join('') + K.f(f, K.t(170, 102, `${p.C} + ${n} · ${p.i} = ${p.C + n * p.i}`, 'b')); },
    aviso: (v, p) => (p.C + p.i * v.n < p.meta ? 'Todavía no llega a la meta.' : 'Se pasó de la meta.'), bien: (v, p) => `${v.n} veces ${p.i} y lo que había: ${p.meta}.`,
  });
  // Primer periodo en que el compuesto alcanza la meta.  params { C, r (%), meta, max }
  const saldo = (p, n) => p.C * (1 + p.r / 100) ** n, primero = p => { let n = 0; while (saldo(p, n) < p.meta) n++; return n; };
  XG.figura('plazo-compuesto', {
    ini: () => ({ n: 0 }), alto: () => 220, ms: 1200, pie: 'Mueve los años.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'años' }],
    ok: (v, p) => v.n === primero(p), sol: p => ({ n: primero(p) }), texto: p => `${primero(p)} años`,
    dib(v, K, p, f) {
      const n = Math.round(v.n), hi = (p.meta + f * (Math.max(p.meta, saldo(p, n)) - p.meta)) * 1.08, w = Math.min(34, 280 / (n + 1)), y = x => 136 - 110 * x / hi; let h = K.l(20, 136, 320, 136, 'lm');
      for (let i = 0; i <= n; i++) { const a = 136 - y(i ? saldo(p, i) : p.C), q = i ? 4 + f * (a - 4) : a; h += K.r(30 + i * w, 136 - q, w - 5, q, i ? 'fg' : 'fa', 2); }
      return h + K.f(f, K.l(20, y(p.meta), 320, y(p.meta), 'la d') + K.t(316, y(p.meta) - 6, p.meta, 's ta', 'end') + K.t(170, 20, `${p.C} · ${R(1 + p.r / 100)}^${n} = ${R(saldo(p, n))}`.replace(/\^(\d+)/, (_, d) => [...d].map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).join('')), 'b')) + K.t(30 + w / 2, 152, 'hoy', 's tm');
    },
    aviso: (v, p) => (saldo(p, v.n) < p.meta ? 'Con esos años todavía no llega.' : 'Llega, pero había llegado antes.'), bien: (v, p) => `Ese es el primer año en que alcanza ${p.meta}.`,
  });
  XG.renglones('simple-o-compuesto', { w: 110, x: 274 });
  XG.renglones('tabla-ahorro', { w: 84, x: 266 });
  XG.renglones('traduce-tasa', { w: 76, x: 278 });
  XG.frases('da-el-saldo');
  XG.ascensor('sube-interes', 100, 2, neutro);

  // ---------------------------------------------------------------------------------------------- IVA, descuentos y cuotas
  // Precio antes del impuesto.  params { final, iva, min, max, paso }
  XG.figura('antes-del-iva', {
    ini: p => ({ x: p.min }), alto: () => 180, ms: 900, pie: 'Mueve el precio sin IVA.', manijas: p => [{ k: 'x', min: p.min, max: p.max, paso: p.paso, et: 'precio sin IVA' }],
    ok: (v, p) => Math.abs(v.x * (1 + p.iva / 100) - p.final) < 1e-6, sol: p => ({ x: R(p.final / (1 + p.iva / 100)) }), texto: p => `${R(p.final / (1 + p.iva / 100))}`,
    dib(v, K, p, f) { const u = 230 / (p.max * (1 + p.iva / 100)), w = v.x * u, t = w * p.iva / 100; return K.r(30, 24, w, 44, 'fa', 3) + K.t(30 + w / 2, 51, K.sig(v.x), 'b') + K.r(30 + w, 24, t, 44, 'ff', 3) + K.t(34 + w + t, 51, `+ ${p.iva} %`, 's tm', 'start') + K.f(f, K.t(170, 96, `${R(v.x)} + ${R(v.x * p.iva / 100)} = ${R(v.x * (1 + p.iva / 100))}`, 'b')); },
    aviso: (v, p) => (v.x * (1 + p.iva / 100) < p.final ? 'Con ese precio, el total queda por debajo.' : 'Con ese precio, el total se pasa.'), bien: (v, p) => `${v.x} por ${R(1 + p.iva / 100)} da ${p.final}.`,
  });
  // Un solo descuento que equivale a dos seguidos.  params { a, b, max }
  const unico = p => R(100 - (100 - p.a) * (100 - p.b) / 100);
  XG.figura('un-solo-descuento', {
    ini: () => ({ d: 0 }), alto: () => 210, ms: 1000, pie: 'Mueve el descuento único.', manijas: p => [{ k: 'd', min: 0, max: p.max, paso: 1, et: 'descuento único (%)' }],
    ok: (v, p) => v.d === unico(p), sol: p => ({ d: unico(p) }), texto: p => `${unico(p)} %`,
    dib(v, K, p, f) { const u = 2.4, x = 50, q1 = 100 - p.a, q2 = 100 - unico(p); return K.r(x, 20, 240, 36, 'fc', 3) + K.r(x, 20, (100 - v.d) * u, 36, 'fa', 3) + K.t(x, 14, 'uno solo', 's tm', 'start') + K.t(x, 78, `${p.a} % y después ${p.b} %`, 's tm', 'start') + K.r(x, 84, 240, 36, 'fc', 3) + K.f(f, K.r(x, 84, q1 * u, 36, 'ff', 3) + K.r(x, 84, q2 * u, 36, 'fg', 3) + K.t(x + q2 * u / 2, 107, `queda ${q2} %`, 's')); },
    aviso: (v, p) => (v.d === p.a + p.b ? 'El segundo descuento se hace sobre lo que quedó, no sobre el precio inicial.' : v.d < unico(p) ? 'Ese descuento deja pagando más que los dos.' : 'Ese descuento deja pagando menos que los dos.'), bien: (v, p) => `Queda el ${100 - v.d} %: ${R(1 - p.a / 100)} · ${R(1 - p.b / 100)}.`,
  });
  // Cuántas cuotas.  params { total, ini, cuota, max }
  XG.figura('cuotas-justas', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el número de cuotas.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'cuotas' }],
    ok: (v, p) => p.ini + v.n * p.cuota === p.total, sol: p => ({ n: (p.total - p.ini) / p.cuota }), texto: p => `${(p.total - p.ini) / p.cuota} cuotas`,
    dib(v, K, p, f) { const w = 220 / p.max, n = Math.round(v.n); return K.r(20, 30, 70, 48, 'ff', 4) + K.t(55, 60, p.ini, 'b') + Array.from({ length: n }, (_, i) => K.r(92 + i * w, 30, Math.max(2, w - 2), 48, 'fa', 2)).join('') + K.f(f, K.t(170, 102, `${p.ini} + ${n} · ${p.cuota} = ${p.ini + n * p.cuota}`, 'b')); },
    aviso: (v, p) => (p.ini + v.n * p.cuota < p.total ? 'Con esas cuotas falta por pagar.' : 'Con esas cuotas se paga de más.'), bien: (v, p) => `${p.ini} y ${v.n} de ${p.cuota} completan ${p.total}.`,
  });
  XG.renglones('recibo-pago', { w: 84, x: 266 });
  XG.renglones('cuota-partes', { w: 84, x: 266 });
  XG.frases('oferta-mejor');
  XG.ascensor('sube-cuota', 100, 2, neutro);
})();
;
//#archivo js/games/quimica-escena.js
// Ejercicios de «Reacciones y Cantidades» (Preicfes, icf-cn-reacciones; spec 2026-11-25-preicfes-estructura): átomos que se conservan,
// reactivo límite y pH. Armazones en figura-kit, conteo-escena y proposiciones-escena. La escena no cuenta mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Balancear: un coeficiente por sustancia.  params { izq: [[fórmula, { átomo: n }]], der: […], sol: [coeficientes], max }
  const todas = p => [...p.izq, ...p.der], el = p => [...new Set(todas(p).flatMap(s => Object.keys(s[1])))];
  const cuenta = (v, p, lado, e) => todas(p).reduce((s, [, a], i) => s + ((i < p.izq.length) === (lado === 0) ? (a[e] || 0) * Math.round(v[`c${i}`]) : 0), 0);
  const cuadra = (v, p) => el(p).every(e => cuenta(v, p, 0, e) === cuenta(v, p, 1, e));
  const mcd = (a, b) => (b ? mcd(b, a % b) : a), comun = v => Object.values(v).reduce(mcd);
  XG.figura('balancea-atomos', {
    ini: p => Object.fromEntries(todas(p).map((_, i) => [`c${i}`, 1])), alto: p => 110 + todas(p).length * 44, ms: 1000, pie: 'Mueve cuántas moléculas hay de cada sustancia.',
    manijas: p => todas(p).map((s, i) => ({ k: `c${i}`, min: 1, max: p.max, paso: 1, et: s[0] })),
    ok: (v, p) => cuadra(v, p) && comun(v) === 1, sol: p => Object.fromEntries(p.sol.map((n, i) => [`c${i}`, n])), texto: p => `${p.izq.map((s, i) => (p.sol[i] > 1 ? p.sol[i] + ' ' : '') + s[0]).join(' + ')} → ${p.der.map((s, i) => { const n = p.sol[p.izq.length + i]; return (n > 1 ? n + ' ' : '') + s[0]; }).join(' + ')}`,
    dib(v, K, p, f) {
      const tx = (ss, o) => ss.map((s, i) => { const n = Math.round(v[`c${o + i}`]); return `${n > 1 ? n + ' ' : ''}${s[0]}`; }).join(' + '), E = el(p);
      return K.t(170, 24, `${tx(p.izq, 0)} → ${tx(p.der, p.izq.length)}`, 'b') + K.f(f, E.map((e, i) => { const a = cuenta(v, p, 0, e), b = cuenta(v, p, 1, e), x = 170 + (i - (E.length - 1) / 2) * 100; return K.r(x - 44, 36, 88, 30, a === b ? 'fa' : 'ff', 6) + K.t(x, 56, `${e}: ${a} y ${b}`, 's'); }).join(''));
    },
    aviso(v, p) { const e = el(p).find(x => cuenta(v, p, 0, x) !== cuenta(v, p, 1, x)); return e ? `No cuadra ${e}: hay ${cuenta(v, p, 0, e)} antes y ${cuenta(v, p, 1, e)} después.` : 'Cuadra, pero se puede simplificar.'; }, bien: () => 'Hay los mismos átomos antes y después.',
  });
  // Reactivo límite: cuántos conjuntos se arman.  params { hay: [[nombre, cantidad, pide]], que, max }
  const sale = p => Math.min(...p.hay.map(([, n, k]) => Math.floor(n / k)));
  XG.figura('paquetes-limite', {
    ini: () => ({ n: 0 }), alto: p => 96 + p.hay.length * 42, ms: 1000, pie: 'Mueve cuántos se forman.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.que }],
    ok: (v, p) => v.n === sale(p), sol: p => ({ n: sale(p) }), texto: p => `${sale(p)} ${p.que}`,
    dib(v, K, p, f) { return p.hay.map(([t, n, k], j) => { const u = Math.min(16, 230 / n), y = 26 + j * 42, usa = Math.round(v.n) * k * f; return K.t(14, y - 8, `${t} (${k} por cada uno)`, 's tm', 'start') + Array.from({ length: n }, (_, i) => K.c(22 + i * u, y + 8, u * 0.38, i < usa ? 'ff' : 'fa')).join('') + K.f(f, K.t(326, y + 13, n - Math.round(v.n) * k < 0 ? 'falta' : `sobran ${n - Math.round(v.n) * k}`, 's tm', 'end')); }).join(''); },
    aviso(v, p) { const r = p.hay.find(([, n, k]) => v.n * k > n); return r ? `No alcanza ${r[0]}.` : 'Alcanza, pero todavía se puede formar otro.'; }, bien(v, p) { const r = p.hay.find(([, n, k]) => Math.floor(n / k) === v.n); return `Se acaba primero ${r[0]}.`; },
  });
  // Escala de pH.  params { base, k (pasos con signo: negativo, más ácida), et }
  XG.figura('nivel-ph', {
    ini: p => ({ h: p.base }), alto: () => 180, ms: 900, pie: 'Mueve la muestra B.', manijas: () => [{ k: 'h', min: 0, max: 14, paso: 1, et: 'pH de B' }],
    ok: (v, p) => v.h === p.base + p.k, sol: p => ({ h: p.base + p.k }), texto: p => `pH ${p.base + p.k}`,
    dib(v, K, p, f) { const x = q => 30 + q * 20, h = v.h; return Array.from({ length: 15 }, (_, i) => K.r(x(i) - 9, 50, 18, 26, i < 7 ? 'ff' : i > 7 ? 'fg' : 'fc', 2) + K.t(x(i), 68, i, 's')).join('') + K.t(x(p.base), 24, 'A', 'b ta') + K.l(x(p.base), 30, x(p.base), 48, 'la') + K.c(x(h), 90, 6, 'fF') + K.f(f, K.t(170, 118, `${Math.abs(h - p.base)} pasos: ${h === p.base ? 'igual' : `10${'⁰¹²³⁴⁵⁶⁷⁸⁹'[Math.min(9, Math.abs(Math.round(h - p.base)))]} veces más ${h < p.base ? 'ácida' : 'básica'}`}`, 'b')); },
    aviso: (v, p) => (Math.sign(v.h - p.base) !== Math.sign(p.k) ? 'Ese lado es el contrario: mira hacia dónde es más ácido.' : 'El lado es ese; cada paso de pH es por 10.'), bien: (v, p) => `${Math.abs(p.k)} pasos de pH: por 10 en cada paso.`,
  });
  XG.frases('conserva-atomos');
  XG.renglones('masa-cerrada', { w: 84, x: 270 });
  XG.renglones('relacion-moles', { w: 64, x: 280 });
  XG.ascensor('sube-moles', 100, 2, neutro);
})();
;
//#archivo js/games/curvas-escena.js
// Ejercicios de «Funciones que Curvan» (Preicfes, icf-ma-curvas; spec 2026-11-25-preicfes-estructura): parábolas, exponenciales, ondas,
// dominio y rango. Armazones en figura-kit, conteo-escena y proposiciones-escena. La curva aparece al comprobar.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], R = x => Math.round(x * 100) / 100;
  // Plano de [x0, x1] por [y0, y1] en un cuadro de 300 por alto.
  const plano = ([x0, x1, y0, y1], alto = 130) => { const X = x => 24 + (x - x0) / (x1 - x0) * 296, Y = y => 10 + (y1 - y) / (y1 - y0) * alto; return { X, Y, ejes: K => K.l(24, Y(0), 320, Y(0), 'lm') + K.l(X(0), 10, X(0), 10 + alto, 'lm'), curva: (K, f, cls = 'la gr', a = x0, b = x1) => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Math.max(4, Math.min(16 + alto, Y(f(x))))]; }), cls) }; };
  // ------------------------------------------------------------------------------------------------------ cuadráticas
  // El eje de una parábola que sale y vuelve al suelo.  params { r1, r2, h, max, et }
  XG.figura('vertice-parabola', {
    ini: () => ({ x: 0 }), alto: () => 222, ms: 1000, pie: 'Mueve el punto de mayor altura.', manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => v.x === (p.r1 + p.r2) / 2, sol: p => ({ x: (p.r1 + p.r2) / 2 }), texto: p => `${(p.r1 + p.r2) / 2}`,
    dib(v, K, p, f) { const g = plano([0, p.max, 0, p.h * 1.15]), m = (p.r1 + p.r2) / 2, d = (p.r2 - p.r1) / 2; return g.ejes(K) + K.c(g.X(p.r1), g.Y(0), 5, 'fa') + K.c(g.X(p.r2), g.Y(0), 5, 'fa') + K.t(g.X(p.r1), g.Y(0) + 16, p.r1 || '', 's') + K.t(g.X(p.r2), g.Y(0) + 16, p.r2, 's') + K.l(g.X(v.x), 12, g.X(v.x), g.Y(0), 'lg d') + K.f(f, g.curva(K, x => p.h * (1 - ((x - m) / d) ** 2), 'la gr', p.r1, p.r2)); },
    aviso: (v, p) => (v.x < (p.r1 + p.r2) / 2 ? 'Ahí todavía va subiendo.' : 'Ahí ya va bajando.'), bien: (v, p) => `A mitad de camino entre ${p.r1} y ${p.r2}.`,
  });
  // Corral con una cantidad fija de cerca: lado que da la mayor área.  params { total, muro (bool) }
  const otro = (p, x) => (p.muro ? p.total - 2 * x : p.total / 2 - x), mejor = p => p.total / 4;
  XG.figura('ancho-maximo', {
    ini: () => ({ x: 1 }), alto: () => 204, ms: 1000, pie: 'Mueve el lado.', manijas: p => [{ k: 'x', min: 1, max: p.total / 2 - 1, paso: 1, et: 'lado (m)' }],
    ok: (v, p) => v.x === mejor(p), sol: p => ({ x: mejor(p) }), texto: p => `${mejor(p)} m`,
    dib(v, K, p, f) { const u = Math.min(250 / (p.muro ? p.total : p.total / 2), 108 / (p.total / 2)), w = otro(p, v.x) * u, h = v.x * u, x = 170 - w / 2; return (p.muro ? K.r(30, 14, 280, 8, 'fk', 0) : '') + K.r(x, 24, w, h, 'fa', 0) + K.t(x - 8, 28 + h / 2, R(v.x), 's tm', 'end') + K.f(f, K.t(170, 30 + h / 2, `${R(v.x)} · ${R(otro(p, v.x))} = ${R(v.x * otro(p, v.x))}`, 'b')); },
    aviso: (v, p) => `Con ese lado el área no es la mayor: prueba con uno ${v.x < mejor(p) ? 'más grande' : 'más pequeño'}.`, bien: (v, p) => `${v.x} por ${otro(p, v.x)}: ${v.x * otro(p, v.x)}.`,
  });
  // Dos ceros de x² + bx + c.  params { b, c, r: [menor, mayor], lo, hi, eq }
  XG.figura('raices-parabola', {
    ini: p => ({ a: p.lo, b: p.hi }), alto: () => 232, ms: 1000, pie: 'Mueve los dos cortes.', manijas: p => [{ k: 'a', min: p.lo, max: p.hi, paso: 1, et: 'corte menor' }, { k: 'b', min: p.lo, max: p.hi, paso: 1, et: 'corte mayor' }],
    ok: (v, p) => v.a === p.r[0] && v.b === p.r[1], sol: p => ({ a: p.r[0], b: p.r[1] }), texto: p => p.r.join(' y '),
    dib(v, K, p, f) { const y0 = (p.c - p.b * p.b / 4), g = plano([p.lo - 1, p.hi + 1, Math.min(-2, y0 * 1.2), Math.max(6, -y0)], 104); return g.ejes(K) + K.c(g.X(v.a), g.Y(0), 6, 'fF') + K.c(g.X(v.b), g.Y(0), 6, 'fg') + K.f(f, g.curva(K, x => x * x + p.b * x + p.c)); },
    aviso(v, p) { const g = x => x * x + p.b * x + p.c, m = [v.a, v.b].find(x => g(x) !== 0); return m != null ? `En ${m} la expresión vale ${g(m)}, no 0.` : 'Falta el otro corte, o están cambiados.'; }, bien: (v, p) => `En ${p.r[0]} y en ${p.r[1]} vale 0.`,
  });
  XG.renglones('lee-parabola', { w: 72, x: 280 });
  XG.renglones('abre-arriba', { w: 110, x: 272 });
  XG.frases('punto-en-curva');
  XG.ascensor('sube-parabola', 100, 2, neutro);
  // ----------------------------------------------------------------------------------------- exponenciales y logaritmos
  // Cuántas veces se duplica (o se parte).  params { C, k, meta, max, et }
  XG.figura('veces-factor', {
    ini: () => ({ n: 0 }), alto: () => 160, ms: 1000, pie: 'Mueve cuántas veces.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }],
    ok: (v, p) => Math.abs(p.C * p.k ** v.n - p.meta) < 1e-9, sol: p => ({ n: Math.round(Math.log(p.meta / p.C) / Math.log(p.k)) }), texto: p => `${Math.round(Math.log(p.meta / p.C) / Math.log(p.k))}`,
    dib(v, K, p, f) { const n = Math.round(v.n), w = Math.min(44, 290 / (n + 1)); return Array.from({ length: n + 1 }, (_, i) => K.c(30 + i * w, 44, i ? 5 : 9, i ? 'fg' : 'fa') + (i ? K.l(30 + (i - 1) * w + 8, 44, 30 + i * w - 8, 44, 'lm') : '')).join('') + K.t(30, 24, p.C, 's') + K.f(f, K.t(170, 88, `${p.C} → ${R(p.C * p.k ** n)}`, 'b')); },
    aviso: (v, p) => `Con ese número llega a ${R(p.C * p.k ** v.n)}.`, bien: (v, p) => `${v.n} veces por ${R(p.k)}: ${R(p.meta)}.`,
  });
  XG.renglones('tabla-exponencial', { w: 72, x: 280 });
  XG.renglones('crece-como', { w: 112, x: 272 });
  XG.renglones('log-es', { w: 60, x: 284 });
  XG.renglones('sube-o-baja-base', { w: 100, x: 276 });
  XG.frases('igual-potencia');
  XG.ascensor('sube-logaritmo', 40, 1, neutro);
  // ----------------------------------------------------------------------------------------------------------- periódicas
  // Centro y amplitud de una onda que va de mín a máx.  params { min, max, hi }
  XG.figura('amplitud-onda', {
    ini: () => ({ m: 0, a: 0 }), alto: () => 236, ms: 1100, pie: 'Mueve la línea media y la amplitud.', manijas: p => [{ k: 'm', min: 0, max: p.hi, paso: 1, et: 'línea media' }, { k: 'a', min: 0, max: p.hi / 2, paso: 1, et: 'amplitud' }],
    ok: (v, p) => v.m === (p.max + p.min) / 2 && v.a === (p.max - p.min) / 2, sol: p => ({ m: (p.max + p.min) / 2, a: (p.max - p.min) / 2 }), texto: p => `media ${(p.max + p.min) / 2}, amplitud ${(p.max - p.min) / 2}`,
    dib(v, K, p, f) { const g = plano([0, 10, 0, p.hi], 108); return g.ejes(K) + K.l(24, g.Y(p.max), 320, g.Y(p.max), 'lm') + K.l(24, g.Y(p.min), 320, g.Y(p.min), 'lm') + K.t(330, g.Y(p.max) + 4, p.max, 's tm') + K.t(330, g.Y(p.min) + 4, p.min, 's tm') + K.l(24, g.Y(v.m), 320, g.Y(v.m), 'lg d') + K.f(f, g.curva(K, x => v.m + v.a * Math.sin(x * Math.PI / 2.5))); },
    aviso: (v, p) => (v.m !== (p.max + p.min) / 2 ? 'La línea media no queda a igual distancia del máximo y del mínimo.' : 'La amplitud va de la línea media al máximo.'), bien: (v, p) => `De ${p.min} a ${p.max}: media ${v.m} y amplitud ${v.a}.`,
  });
  // Periodo: cuánto tarda una vuelta.  params { n, total, max, u }
  XG.figura('periodo-onda', {
    ini: () => ({ t: 1 }), alto: () => 196, ms: 1100, pie: 'Mueve lo que dura una vuelta.', manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: `periodo (${p.u})` }],
    ok: (v, p) => v.t * p.n === p.total, sol: p => ({ t: p.total / p.n }), texto: p => `${p.total / p.n} ${p.u}`,
    dib(v, K, p, f) { const g = plano([0, p.total, -1.3, 1.3], 100); return K.l(24, g.Y(0), 320, g.Y(0), 'lm') + g.curva(K, x => Math.sin(2 * Math.PI * x * p.n / p.total) * (0.001 + f), 'la gr', 0, p.total) + K.f(f, K.r(24, g.Y(1.2), g.X(Math.min(p.total, v.t)) - 24, g.Y(-1.2) - g.Y(1.2), 'ff', 0)) + K.t(320, 124, `${p.total} ${p.u}`, 's tm', 'end'); },
    aviso: (v, p) => (v.t * p.n < p.total ? `${p.n} vueltas de ${v.t} no completan ${p.total}.` : `${p.n} vueltas de ${v.t} se pasan de ${p.total}.`), bien: (v, p) => `${p.n} vueltas de ${v.t}: ${p.total}.`,
  });
  XG.renglones('lee-onda', { w: 72, x: 280 });
  XG.renglones('en-que-momento', { w: 72, x: 280 });
  // Altura de una cabina en una rueda: ángulo desde la horizontal de la derecha.  params { r, c (altura del centro), y, g, max }
  XG.figura('altura-rueda', {
    ini: () => ({ g: 0 }), alto: () => 232, ms: 1000, pie: 'Gira la cabina.', manijas: p => [{ k: 'g', min: 0, max: p.max, paso: 15, et: 'ángulo (°)' }],
    ok: (v, p) => v.g === p.g, sol: p => ({ g: p.g }), texto: p => `${p.g}°`,
    dib(v, K, p, f) { const u = 62 / p.r, cx = 150, cy = 92, [x, y] = K.at(cx, cy, 62, v.g); return K.arc(cx, cy, 62, 0, 360, 'lm') + K.l(cx - 80, cy, cx + 80, cy, 'lm d') + K.l(cx, cy, x, y, 'la') + K.c(x, y, 8, 'fF') + K.l(40, cy + p.c * u, 300, cy + p.c * u, 'lm') + K.t(334, cy - 8, `centro a ${p.c} m`, 's tm', 'end') + K.f(f, K.l(x, y, x, cy + p.c * u, 'lg d') + K.t(x + 10, cy + 30, `${R(p.c + p.r * Math.sin(v.g * Math.PI / 180))} m`, 'b', 'start')); },
    aviso(v, p) { const h = R(p.c + p.r * Math.sin(v.g * Math.PI / 180)); return Math.abs(h - p.y) < 0.01 ? 'La altura es esa, pero no es la primera vez que pasa.' : `Ahí está a ${h} m.`; }, bien: (v, p) => `${p.c} del centro y ${R(p.y - p.c)} por el giro: ${p.y} m.`,
  });
  XG.frases('es-periodica');
  XG.ascensor('sube-onda', 60, 1, neutro);
  // ------------------------------------------------------------------------------------------------ dominio, rango y cortes
  // Rango leído en la gráfica.  params { f, dom: [a, b], win, lo, hi }
  XG.figura('rango-ventana', {
    ini: p => ({ a: p.win[2], b: p.win[3] }), alto: () => 236, ms: 1000, pie: 'Mueve el piso y el techo.', manijas: p => [{ k: 'a', min: p.win[2], max: p.win[3], paso: 1, et: 'valor menor' }, { k: 'b', min: p.win[2], max: p.win[3], paso: 1, et: 'valor mayor' }],
    ok: (v, p) => v.a === p.lo && v.b === p.hi, sol: p => ({ a: p.lo, b: p.hi }), texto: p => `de ${p.lo} a ${p.hi}`,
    dib(v, K, p, f) { const g = plano(p.win, 110), [a, b] = p.dom; let h = g.ejes(K) + g.curva(K, p.f, 'la gr', a, b) + K.c(g.X(a), g.Y(p.f(a)), 5, 'fa') + K.c(g.X(b), g.Y(p.f(b)), 5, 'fa'); for (let y = p.win[2]; y <= p.win[3]; y++) h += K.l(g.X(0) - 3, g.Y(y), g.X(0) + 3, g.Y(y), 'lm') + (y % 2 === 0 && y ? K.t(g.X(0) - 7, g.Y(y) + 4, y, 's tm', 'end') : ''); return h + K.f(f, K.l(24, g.Y(v.a), 320, g.Y(v.a), 'lg d') + K.l(24, g.Y(v.b), 320, g.Y(v.b), 'lg d')); },
    aviso: (v, p) => (v.a > p.lo || v.b < p.hi ? 'Parte de la curva queda por fuera.' : 'Hay alturas a las que la curva no llega.'), bien: (v, p) => `La curva va de ${p.lo} a ${p.hi}.`,
  });
  // Cortes de una recta ax + by = c con los ejes.  params { a, b, c, max }
  XG.figura('corte-ejes', {
    ini: () => ({ x: 0, y: 0 }), alto: () => 232, ms: 1000, pie: 'Mueve los dos cortes.', manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'corte con el eje x' }, { k: 'y', min: 0, max: p.max, paso: 1, et: 'corte con el eje y' }],
    ok: (v, p) => v.x * p.a === p.c && v.y * p.b === p.c, sol: p => ({ x: p.c / p.a, y: p.c / p.b }), texto: p => `(${p.c / p.a}, 0) y (0, ${p.c / p.b})`,
    dib(v, K, p, f) { const g = plano([-1, p.max + 1, -1, p.max + 1], 108); return g.ejes(K) + K.c(g.X(v.x), g.Y(0), 6, 'fF') + K.c(g.X(0), g.Y(v.y), 6, 'fg') + K.f(f, K.l(g.X(v.x), g.Y(0), g.X(0), g.Y(v.y), 'la gr')); },
    aviso: (v, p) => (v.x * p.a !== p.c ? `Con y = 0 y x = ${v.x} no da ${p.c}.` : `Con x = 0 y y = ${v.y} no da ${p.c}.`), bien: (v, p) => `(${v.x}, 0) y (0, ${v.y}).`,
  });
  XG.frases('dominio-valores');
  XG.frases('es-funcion');
  XG.renglones('lee-cortes', { w: 72, x: 280 });
  XG.renglones('contexto-dominio', { w: 120, x: 268 });
  XG.ascensor('sube-funcion', 60, 1, neutro);
})();
;
//#archivo js/games/ondas-escena.js
// Ejercicios de «Ondas, Luz y Sonido» (Preicfes, icf-cn-ondas; spec 2026-11-25-preicfes-estructura). Armazones en figura-kit, conteo-escena y
// proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100;
  const onda = (K, y, A, n, cls = 'la gr', x0 = 24, x1 = 316) => K.pl(Array.from({ length: 121 }, (_, i) => [x0 + (x1 - x0) * i / 120, y - A * Math.sin(2 * Math.PI * n * i / 120)]), cls);
  // Longitud de onda para una rapidez y una frecuencia.  params { v, f, max, u }
  XG.figura('largo-onda', {
    ini: () => ({ l: 1 }), alto: () => 176, ms: 1000, pie: 'Mueve la longitud de onda.', manijas: p => [{ k: 'l', min: 1, max: p.max, paso: 1, et: `longitud de onda (${p.u})` }],
    ok: (v, p) => v.l * p.f === p.v, sol: p => ({ l: p.v / p.f }), texto: p => `${p.v / p.f} ${p.u}`,
    dib(v, K, p, f) { return K.l(24, 60, 316, 60, 'lm') + onda(K, 60, 26, p.max / v.l) + K.f(f, K.t(170, 118, `${N(v.l)} · ${p.f} = ${N(v.l * p.f)} ${p.u}/s`, 'b')); },
    aviso: (v, p) => (v.l * p.f < p.v ? 'Con esa longitud viajaría más despacio.' : 'Con esa longitud viajaría más rápido.'), bien: (v, p) => `${v.l} por ${p.f}: ${p.v}.`,
  });
  // Frecuencia: vibraciones en cierto tiempo.  params { n, t, max }
  XG.figura('cuenta-vibraciones', {
    ini: () => ({ f: 0 }), alto: () => 176, ms: 1000, pie: 'Mueve la frecuencia.', manijas: p => [{ k: 'f', min: 0, max: p.max, paso: 1, et: 'frecuencia (Hz)' }],
    ok: (v, p) => v.f * p.t === p.n, sol: p => ({ f: p.n / p.t }), texto: p => `${p.n / p.t} Hz`,
    dib(v, K, p, f) { const q = Array.from({ length: p.t + 1 }, (_, i) => 24 + 292 * i / p.t); return onda(K, 56, 24, p.n) + K.t(316, 100, `${p.t} s`, 's tm', 'end') + K.f(f, q.map(x => K.l(x, 24, x, 88, 'lg d')).join('')); },
    aviso: (v, p) => `Con ${v.f} por segundo, en ${p.t} s habría ${v.f * p.t}.`, bien: (v, p) => `${p.n} en ${p.t} s: ${v.f} cada segundo.`,
  });
  // Espejo: ángulo de salida medido desde la normal.  params { g }
  XG.figura('refleja-angulo', {
    ini: () => ({ a: 0 }), alto: () => 206, ms: 1000, pie: 'Mueve el rayo que sale.', manijas: () => [{ k: 'a', min: 0, max: 80, paso: 5, et: 'ángulo desde la normal (°)' }],
    ok: (v, p) => v.a === p.g, sol: p => ({ a: p.g }), texto: p => `${p.g}°`,
    dib(v, K, p, f) { const c = [170, 130], a = K.at(...c, 104, 90 + p.g), b = K.at(...c, 104, 90 - v.a); return K.l(40, 130, 300, 130, 'gr') + K.l(170, 20, 170, 130, 'lm d') + K.l(...a, ...c, 'la gr') + K.l(...c, ...b, 'lg gr') + K.t(46, 22, `${p.con ? `con el espejo: ${90 - p.g}°` : `con la normal: ${p.g}°`}`, 's tm', 'start') + K.f(f, K.arc(...c, 40, 90, 90 + p.g, 'la') + K.arc(...c, 40, 90 - p.g, 90, 'lo')); },
    aviso: (v, p) => (p.con && v.a === 90 - p.g ? 'Ese es el ángulo con el espejo: se mide desde la normal.' : v.a < p.g ? 'Sale demasiado pegado a la normal.' : 'Sale demasiado inclinado.'), bien: (v, p) => `Llega a ${p.g}° de la normal y sale a ${p.g}°.`,
  });
  // Eco.  params { v (m/s), t (s), max, paso }
  XG.figura('eco-distancia', {
    ini: () => ({ d: 0 }), alto: () => 180, ms: 1100, pie: 'Mueve la distancia a la pared.', manijas: p => [{ k: 'd', min: 0, max: p.max, paso: p.paso, et: 'distancia (m)' }],
    ok: (v, p) => 2 * v.d === p.v * p.t, sol: p => ({ d: p.v * p.t / 2 }), texto: p => `${p.v * p.t / 2} m`,
    dib(v, K, p, f) { const x = 40 + 250 * v.d / p.max; return K.c(30, 64, 10, 'fa') + K.r(x + 4, 24, 12, 80, 'fk', 2) + K.l(42, 56, x, 56, 'la') + K.l(42, 74, x, 74, 'lg') + K.t(60, 46, 'ida', 's ta', 'start') + K.t(60, 92, 'vuelta', 's tg', 'start') + K.f(f, K.t(170, 122, `2 · ${N(v.d)} = ${N(2 * v.d)} m`, 'b')); },
    aviso: (v, p) => (v.d === p.v * p.t ? 'Eso es lo que recorrió en ida y vuelta.' : 2 * v.d < p.v * p.t ? 'El eco volvería antes.' : 'El eco tardaría más.'), bien: (v, p) => `Ida y vuelta: ${p.v * p.t} m.`,
  });
  XG.renglones('se-acerca-normal', { w: 118, x: 268 });
  XG.renglones('tono-o-volumen', { w: 96, x: 278 });
  XG.ascensor('sube-rapidez', 100, 2, neutro);
})();
;
//#archivo js/games/espacio-escena.js
// Ejercicios de «Movimientos y Vistas» (Preicfes, icf-ma-espacio; spec 2026-11-25-preicfes-estructura): movimientos en el plano y
// coordenadas. Armazones en figura-kit, conteo-escena y proposiciones-escena. La imagen completa aparece al comprobar.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], M = 6, U = 17, X = x => 170 + x * U, Y = y => 112 - y * U;
  const red = K => { let h = ''; for (let i = -M; i <= M; i++) h += K.l(X(i), Y(-M), X(i), Y(M), i ? 'lr' : 'lm') + K.l(X(-M), Y(i), X(M), Y(i), i ? 'lr' : 'lm'); for (const i of [-4, -2, 2, 4]) h += K.t(X(i), Y(0) + 14, i, 's tm') + K.t(X(0) - 6, Y(i) + 4, i, 's tm', 'end'); return h; };
  const poli = (K, ps, cls) => K.p(ps.map(([x, y]) => [X(x), Y(y)]), cls);
  // Un punto de la figura y su imagen: se arrastra la imagen de A.  T(q, p) lleva cada punto a su imagen.
  const imagen = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ x: 0, y: 0 }), alto: () => 224, ms: 1100, pie: 'Arrastra el punto a donde queda A.',
    manijas: () => [{ k: ['x', 'y'], min: [-M, -M], max: [M, M], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 170) / U, (112 - y) / U] }],
    ok(v, p) { const [x, y] = d.T(p.A, p); return v.x === x && v.y === y; }, sol(p) { const [x, y] = d.T(p.A, p); return { x, y }; }, texto: p => `(${d.T(p.A, p).join(', ')})`,
    dib: (v, K, p, f) => red(K) + (d.fondo?.(K, p) || '') + poli(K, [p.A, ...p.otros], 'fa') + K.t(X(p.A[0]), Y(p.A[1]) - 8, 'A', 'b ta') + K.f(f, poli(K, [p.A, ...p.otros].map(q => d.T(q, p)), 'fg')),
    aviso: (v, p) => d.aviso?.(v, p) || 'A no queda ahí.', bien: (v, p) => `A queda en (${d.T(p.A, p).join(', ')}).`,
  });
  imagen('traslada-punto', { T: ([x, y], p) => [x + p.v[0], y + p.v[1]], aviso: (v, p) => (v.x === p.A[0] + p.v[0] ? 'El movimiento de lado está bien: mira cuánto sube o baja.' : v.y === p.A[1] + p.v[1] ? 'La altura está bien: mira cuánto va de lado.' : 'Cuenta los cuadros desde A, no desde el origen.') });
  imagen('refleja-punto', { T: ([x, y], p) => (p.eje === 'y' ? [-x, y] : p.eje === 'x' ? [x, -y] : [y, x]), fondo: (K, p) => (p.eje === 'y' ? K.l(X(0), Y(-M), X(0), Y(M), 'lg gr') : p.eje === 'x' ? K.l(X(-M), Y(0), X(M), Y(0), 'lg gr') : K.l(X(-M), Y(-M), X(M), Y(M), 'lg gr')), aviso: () => 'La imagen queda igual de lejos de la línea, justo al frente.' });
  imagen('rota-punto', { T: ([x, y], p) => (p.g === 90 ? [-y || 0, x] : p.g === 180 ? [-x, -y] : [y, -x || 0]), fondo: K => K.c(X(0), Y(0), 5, 'fF'), aviso: (v, p) => (Math.abs(v.x ** 2 + v.y ** 2 - p.A[0] ** 2 - p.A[1] ** 2) < 1e-9 ? 'Está a la misma distancia del centro, pero no es ese giro.' : 'Al girar no cambia la distancia al centro.') });
  imagen('homotecia-punto', { T: ([x, y], p) => [x * p.k, y * p.k], fondo: K => K.c(X(0), Y(0), 5, 'fF'), aviso: (v, p) => (p.k < 0 && v.x === p.A[0] * -p.k && v.y === p.A[1] * -p.k ? 'Con factor negativo pasa al otro lado del centro.' : 'Multiplica la distancia desde el centro, en la misma recta.') });
  XG.renglones('que-movimiento', { w: 108, x: 274 });
  XG.frases('que-se-conserva');
  XG.ascensor('sube-movimiento', 100, 2, neutro);

  // ---------------------------------------------------------------------------------------------------------- coordenadas
  const libre = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ x: 0, y: 0 }), alto: () => 224, ms: 900, pie: d.pie, manijas: () => [{ k: ['x', 'y'], min: [-M, -M], max: [M, M], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 170) / U, (112 - y) / U] }],
    ok(v, p) { const [x, y] = d.meta(p); return v.x === x && v.y === y; }, sol(p) { const [x, y] = d.meta(p); return { x, y }; }, texto: p => `(${d.meta(p).join(', ')})`, dib: (v, K, p, f) => red(K) + d.dib(v, K, p, f), aviso: d.aviso, bien: d.bien,
  });
  // Cuarto vértice de un paralelogramo ABCD: D = A + C − B.
  const cuarto = p => [p.A[0] + p.C[0] - p.B[0], p.A[1] + p.C[1] - p.B[1]];
  libre('cuarto-vertice', { pie: 'Arrastra el vértice D.', meta: cuarto, dib: (v, K, p, f) => K.pl([p.A, p.B, p.C].map(([x, y]) => [X(x), Y(y)]), 'la gr') + [['A', p.A], ['B', p.B], ['C', p.C]].map(([t, [x, y]]) => K.c(X(x), Y(y), 4, 'fa') + K.t(X(x) + 9, Y(y) - 7, t, 'b ta')).join('') + K.f(f, K.pl([p.C, [v.x, v.y], p.A].map(([x, y]) => [X(x), Y(y)]), 'lg gr')),
    aviso: () => 'Los lados opuestos deben ir igual: lo que se camina de B a A, se camina de C a D.', bien: (v) => `D = (${v.x}, ${v.y}).` });
  // Punto del segmento AB que lo parte en dos.
  libre('punto-medio', { pie: 'Arrastra el punto medio.', meta: p => [(p.A[0] + p.B[0]) / 2, (p.A[1] + p.B[1]) / 2], dib: (v, K, p, f) => [['A', p.A], ['B', p.B]].map(([t, [x, y]]) => K.c(X(x), Y(y), 5, 'fa') + K.t(X(x) + 9, Y(y) - 7, t, 'b ta')).join('') + K.f(f, K.l(X(p.A[0]), Y(p.A[1]), X(p.B[0]), Y(p.B[1]), 'la gr')),
    aviso: (v, p) => (2 * v.x === p.A[0] + p.B[0] ? 'La x está bien; promedia las y.' : 2 * v.y === p.A[1] + p.B[1] ? 'La y está bien; promedia las x.' : 'Promedia las x y promedia las y.'), bien: v => `(${v.x}, ${v.y}) está a igual distancia de A y de B.` });
  // Coordenadas polares de un punto sobre un eje.  params { P: [x, y], r, g }
  XG.figura('polar-gira', {
    ini: () => ({ g: 0, r: 1 }), alto: () => 312, ms: 1000, pie: 'Mueve el giro y los pasos.', manijas: () => [{ k: 'g', min: 0, max: 345, paso: 15, et: 'giro (°)' }, { k: 'r', min: 1, max: 6, paso: 1, et: 'pasos' }],
    ok: (v, p) => v.g === p.g && v.r === p.r, sol: p => ({ g: p.g, r: p.r }), texto: p => `${p.r} pasos a ${p.g}°`,
    dib(v, K, p, f) { const q = K.at(X(0), Y(0), 70, v.g); return red(K) + K.c(X(p.P[0]), Y(p.P[1]), 6, 'fa') + K.l(X(0), Y(0), ...q, 'lg gr') + K.c(X(0), Y(0), 4, 'fF') + K.f(f, K.c(...K.at(X(0), Y(0), v.r * U, v.g), 8, 'fg')); },
    aviso: (v, p) => (v.g !== p.g ? 'No mira hacia el punto: el giro empieza a la derecha y va contra el reloj.' : 'Mira bien, pero camina otra distancia.'), bien: (v, p) => `(${p.P.join(', ')}) es ${p.r} pasos a ${p.g}°.`,
  });
  XG.renglones('polar-a-cartesiana', { w: 92, x: 274 });
  XG.frases('mismo-polar');
  XG.rotula('caja-coordenadas', {
    slots: p => p.metas.map((_, i) => ({ x: 262, y: 34 + i * 48, w: 112, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => Math.max(190, 34 + p.metas.length * 48 - 18),
    fondo(K, p) { const o = [84, 156], u = 22, c = (x, y, z) => K.iso(o, u, x, y, z), L = (a, b) => K.l(...c(...a), ...c(...b), 'gr'), [a, b, h] = p.d, V = [[0, 0, 0], [a, 0, 0], [0, b, 0], [0, 0, h], [a, b, 0], [a, 0, h], [0, b, h], [a, b, h]]; return [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 6], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7]].map(([i, j]) => L(V[i], V[j])).join('') + p.ver.map(([t, q], i) => { const [x, y] = c(...q); return K.c(x, y, 5, 'fF') + K.t(x + 8, y - 6, t, 'b ta', 'start'); }).join('') + K.t(c(a + 0.6, 0, 0)[0], c(a + 0.6, 0, 0)[1] + 10, 'x', 's tm') + K.t(c(0, b + 0.6, 0)[0], c(0, b + 0.6, 0)[1], 'y', 's tm') + K.t(c(0, 0, h + 0.5)[0], c(0, 0, h + 0.5)[1], 'z', 's tm') + p.ver.map(([t], i) => K.t(196, 39 + i * 48, t, 'b', 'end')).join(''); },
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,
  });
  XG.ascensor('sube-distancia', 60, 1, neutro);
})();
;
//#archivo js/games/gases-escena.js
// Ejercicios de «Gases y Disoluciones» y «Electricidad y Magnetismo» (Preicfes; spec 2026-11-25-preicfes-estructura). Armazones en
// figura-kit, conteo-escena y proposiciones-escena. La escena no dice el resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100;
  const bolas = (K, x, y, w, h, n) => Array.from({ length: n }, (_, i) => K.c(x + 8 + ((i * 37) % 97) / 97 * (w - 16), y + 8 + ((i * 59) % 83) / 83 * (h - 16), 3.2, 'ff')).join('');
  // Émbolo: presión por volumen no cambia.  params { P, V, P2, max, paso }
  XG.figura('boyle-embolo', {
    ini: p => ({ v: p.V }), alto: () => 186, ms: 1000, pie: 'Mueve el émbolo.', manijas: p => [{ k: 'v', min: p.paso, max: p.max, paso: p.paso, et: 'volumen (L)' }],
    ok: (v, p) => v.v * p.P2 === p.P * p.V, sol: p => ({ v: p.P * p.V / p.P2 }), texto: p => `${N(p.P * p.V / p.P2)} L`,
    dib(v, K, p, f) { const w = 230 * v.v / p.max; return K.r(30, 24, 250, 70, 'fn', 4) + K.r(30, 24, w, 70, 'fa', 2) + bolas(K, 30, 24, Math.max(26, w), 70, 18) + K.r(30 + w, 20, 10, 78, 'fk', 2) + K.f(f, K.t(170, 122, `${p.P2} · ${N(v.v)} = ${N(p.P2 * v.v)}`, 'b')); },
    aviso: (v, p) => (v.v * p.P2 === p.P * p.V ? '' : v.v === p.V * p.P2 / p.P ? 'A más presión, menos volumen: van al contrario.' : v.v * p.P2 > p.P * p.V ? 'Con ese volumen el producto es mayor que antes.' : 'Con ese volumen el producto es menor que antes.'), bien: (v, p) => `${p.P} · ${p.V} = ${p.P2} · ${N(v.v)}.`,
  });
  // Globo: volumen proporcional a la temperatura en kelvin.  params { V, T, T2, max, paso }
  XG.figura('charles-globo', {
    ini: p => ({ v: p.V }), alto: () => 200, ms: 1000, pie: 'Mueve el volumen del globo.', manijas: p => [{ k: 'v', min: p.paso, max: p.max, paso: p.paso, et: 'volumen (L)' }],
    ok: (v, p) => v.v * p.T === p.V * p.T2, sol: p => ({ v: p.V * p.T2 / p.T }), texto: p => `${N(p.V * p.T2 / p.T)} L`,
    dib(v, K, p, f) { const r = x => 46 * Math.cbrt(x / p.max); return K.c(90, 66, r(p.V), 'fc') + K.t(90, 128, `${p.T} K: ${p.V} L`, 's tm') + K.c(240, 66, r(v.v), 'fa') + K.t(240, 128, `${p.T2} K`, 's tm') + K.f(f, K.t(170, 20, `${N(v.v)} ÷ ${p.T2} = ${N(v.v / p.T2 * 1000) / 1000}`, 'b')); },
    aviso: (v, p) => (Math.sign(v.v - p.V) !== Math.sign(p.T2 - p.T) ? 'Si sube la temperatura, el volumen sube; si baja, baja.' : 'La dirección es esa; volumen y kelvin cambian en la misma proporción.'), bien: (v, p) => `${p.V} es a ${p.T} como ${N(v.v)} es a ${p.T2}.`,
  });
  XG.renglones('gas-sube-baja', { w: 96, x: 278 });
  XG.ascensor('sube-gas', 100, 2, neutro);
  // ------------------------------------------------------------------------------------------------------- concentración
  const vaso = (K, x, y, w, h, q, cls) => K.r(x, y, w, h, 'fn', 3) + K.r(x, y + h * (1 - q), w, h * q, cls, 2);
  // Agua total para llegar a una concentración.  params { g, meta (g/L), max, paso }
  XG.figura('concentra-agua', {
    ini: p => ({ l: p.paso }), alto: () => 190, ms: 1000, pie: 'Mueve el volumen de la disolución.', manijas: p => [{ k: 'l', min: p.paso, max: p.max, paso: p.paso, et: 'disolución (L)' }],
    ok: (v, p) => N(v.l * p.meta) === p.g, sol: p => ({ l: N(p.g / p.meta) }), texto: p => `${N(p.g / p.meta)} L`,
    dib(v, K, p, f) { const q = v.l / p.max; return vaso(K, 110, 16, 120, 96, q, 'fa') + Array.from({ length: 16 }, (_, i) => K.c(122 + (i * 43 % 97), 112 - 4 - (i * 29 % 89) / 89 * Math.max(4, 96 * q - 8), 2.6, 'ff')).join('') + K.t(244, 66, `${p.g} g`, 's tm', 'start') + K.f(f, K.t(170, 132, `${p.g} ÷ ${N(v.l)} = ${N(p.g / v.l)} g/L`, 'b')); },
    aviso: (v, p) => (p.g / v.l > p.meta ? 'Así queda más concentrada.' : 'Así queda menos concentrada.'), bien: (v, p) => `${p.g} g en ${v.l} L: ${p.meta} g por litro.`,
  });
  // Agua que se agrega para bajar la concentración.  params { V, C, C2, max, paso }
  XG.figura('diluye-agua', {
    ini: () => ({ a: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve el agua que agregas.', manijas: p => [{ k: 'a', min: 0, max: p.max, paso: p.paso, et: 'agua agregada (L)' }],
    ok: (v, p) => N((p.V + v.a) * p.C2) === N(p.V * p.C), sol: p => ({ a: N(p.V * p.C / p.C2 - p.V) }), texto: p => `${N(p.V * p.C / p.C2 - p.V)} L`,
    dib(v, K, p, f) { const u = 96 / (p.V + p.max); return K.r(120, 14, 100, 96, 'fn', 3) + K.r(120, 110 - p.V * u, 100, p.V * u, 'ff', 0) + K.r(120, 110 - (p.V + v.a) * u, 100, v.a * u, 'fa', 0) + K.t(112, 114 - p.V * u / 2, `${p.V} L`, 's tm', 'end') + K.f(f, K.t(170, 132, `${N(p.V * p.C)} g ÷ ${N(p.V + v.a)} L = ${N(p.V * p.C / (p.V + v.a))} g/L`, 'b')); },
    aviso: (v, p) => (N(v.a) === N(p.V * p.C / p.C2) ? 'Ese es el volumen final: se pide el agua que se agrega.' : (p.V + v.a) * p.C2 < p.V * p.C ? 'Todavía queda muy concentrada.' : 'Quedó demasiado diluida.'), bien: (v, p) => `${N(p.V * p.C)} g en ${N(p.V + v.a)} L.`,
  });
  XG.renglones('concentracion-tabla', { w: 88, x: 276 });
  XG.renglones('mas-o-menos-concentrada', { w: 104, x: 276 });
  // ----------------------------------------------------------------------------------------------------------- circuitos
  const pila = (K, x, y, t) => K.l(x - 10, y, x + 10, y, 'gr') + K.l(x - 5, y + 8, x + 5, y + 8, 'gr') + K.t(x - 16, y + 9, t, 's tm', 'end');
  const res = (K, x, y, t, cls = 'fa') => K.r(x - 22, y - 9, 44, 18, cls, 3) + K.t(x, y + 4, t, 's');
  // Ley de Ohm.  params { V, R, max, paso }
  XG.figura('corriente-resistor', {
    ini: () => ({ i: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve la corriente.', manijas: p => [{ k: 'i', min: 0, max: p.max, paso: p.paso, et: 'corriente (A)' }],
    ok: (v, p) => N(v.i * p.R) === p.V, sol: p => ({ i: N(p.V / p.R) }), texto: p => `${N(p.V / p.R)} A`,
    dib: (v, K, p, f) => K.pl([[80, 56], [80, 20], [260, 20], [260, 100], [80, 100], [80, 64]], 'gr') + pila(K, 80, 56, `${p.V} V`) + res(K, 170, 20, `${p.R} Ω`) + Array.from({ length: 6 }, (_, j) => K.c(100 + j * 30, 100, 2 + 3 * v.i / p.max, 'fg')).join('') + K.f(f, K.t(170, 70, `${N(v.i)} · ${p.R} = ${N(v.i * p.R)} V`, 'b')),
    aviso: (v, p) => (v.i * p.R < p.V ? 'Con esa corriente sobraría voltaje.' : 'Para esa corriente haría falta más voltaje.'), bien: (v, p) => `${v.i} por ${p.R}: ${p.V} V.`,
  });
  // Dos resistencias en serie.  params { V, I, R1, max }
  XG.figura('serie-resistencia', {
    ini: () => ({ r: 0 }), alto: () => 190, ms: 1000, pie: 'Mueve la otra resistencia.', manijas: p => [{ k: 'r', min: 0, max: p.max, paso: 1, et: 'resistencia (Ω)' }],
    ok: (v, p) => p.I * (p.R1 + v.r) === p.V, sol: p => ({ r: p.V / p.I - p.R1 }), texto: p => `${p.V / p.I - p.R1} Ω`,
    dib: (v, K, p, f) => K.pl([[80, 56], [80, 20], [260, 20], [260, 100], [80, 100], [80, 64]], 'gr') + pila(K, 80, 56, `${p.V} V`) + res(K, 132, 20, `${p.R1} Ω`) + res(K, 208, 20, '?', 'ff') + K.t(170, 92, `${p.I} A`, 's tm') + K.f(f, K.t(170, 64, `${p.I} · (${p.R1} + ${N(v.r)}) = ${N(p.I * (p.R1 + v.r))} V`, 's')),
    aviso: (v, p) => (v.r === p.V / p.I ? 'Esa es la resistencia total: falta quitar la que ya está.' : p.I * (p.R1 + v.r) < p.V ? 'Con esa resistencia pasaría más corriente.' : 'Con esa resistencia pasaría menos corriente.'), bien: (v, p) => `${p.R1} + ${v.r} = ${p.V / p.I} Ω en total.`,
  });
  XG.renglones('paralelo-ramas', { w: 84, x: 280 });
  XG.frases('que-prende');
  XG.ascensor('sube-vatios', 100, 2, neutro);
  XG.renglones('atrae-repele', { w: 104, x: 276 });
  XG.renglones('fuerza-cambia', { w: 96, x: 278 });
})();
;
//#archivo js/games/dispersion-escena.js
// Ejercicios de «Dispersión y Comparación», «Números y Sucesiones» y «Ciencia y Sociedad» (Preicfes; spec
// 2026-11-25-preicfes-estructura). Armazones en figura-kit, conteo-escena, logica-kit y proposiciones-escena. La escena no dice el
// resultado mientras se responde.
(() => {
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'], N = x => Math.round(x * 100) / 100, sum = d => d.reduce((a, b) => a + b, 0);
  const EJE = (K, hi, y, paso = 1, lo = 0) => { const X = x => 24 + (x - lo) / (hi - lo) * 292; let h = K.l(24, y, 316, y, 'lm'); for (let i = lo; i <= hi; i += paso) h += K.l(X(i), y - 4, X(i), y + 4, 'lm') + K.t(X(i), y + 18, i, 's tm'); return [X, h]; };
  const puntos = (K, d, X, y, cls = 'fa') => { const n = {}; return d.map(x => { n[x] = (n[x] || 0) + 1; return K.c(X(x), y - 4 - n[x] * 13, 6, cls); }).join(''); };
  // ---------------------------------------------------------------------------------------------- rango, varianza, desviación
  // Punto de equilibrio: las desviaciones suman 0.  params { d, hi }
  XG.figura('desvios-cero', {
    ini: () => ({ m: 0 }), alto: () => 210, ms: 1000, pie: 'Mueve el punto de apoyo.', manijas: p => [{ k: 'm', min: 0, max: p.hi, paso: 1, et: 'apoyo' }], ok: (v, p) => v.m * p.d.length === sum(p.d), sol: p => ({ m: sum(p.d) / p.d.length }), texto: p => `${sum(p.d) / p.d.length}`,
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 92, p.hi > 12 ? 2 : 1), s = sum(p.d.map(x => x - v.m)); return h + puntos(K, p.d, X, 92) + K.l(X(v.m), 92, X(v.m), 70, 'lg d') + K.p([[X(v.m), 115], [X(v.m) - 8, 129], [X(v.m) + 8, 129]], 'fg') + K.f(f, K.t(170, 148, `desviaciones: ${s > 0 ? '+' : ''}${N(s)}`, 'b')); },
    aviso: (v, p) => (v.m * p.d.length < sum(p.d) ? 'Las desviaciones de la derecha pesan más.' : 'Las desviaciones de la izquierda pesan más.'), bien: (v) => `Alrededor de ${v.m} las desviaciones suman 0: es el promedio.`,
  });
  // Cambia el dato mayor hasta un rango pedido.  params { d (sin el mayor), rango, hi }
  XG.figura('mueve-rango', {
    ini: p => ({ x: Math.max(...p.d) }), alto: () => 190, ms: 900, pie: 'Mueve el dato mayor.', manijas: p => [{ k: 'x', min: Math.max(...p.d), max: p.hi, paso: 1, et: 'dato mayor' }], ok: (v, p) => v.x - Math.min(...p.d) === p.rango, sol: p => ({ x: Math.min(...p.d) + p.rango }), texto: p => `${Math.min(...p.d) + p.rango}`,
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 92, p.hi > 12 ? 2 : 1); return h + puntos(K, p.d, X, 92) + K.c(X(v.x), 75, 6, 'ff') + K.f(f, K.l(X(Math.min(...p.d)), 120, X(v.x), 120, 'la gr') + K.t(170, 138, `${N(v.x)} − ${Math.min(...p.d)} = ${N(v.x - Math.min(...p.d))}`, 'b')); },
    aviso: (v, p) => (v.x === p.rango ? 'Ese es el rango: falta contarlo desde el dato menor.' : v.x - Math.min(...p.d) < p.rango ? 'Con ese dato el rango es menor.' : 'Con ese dato el rango es mayor.'), bien: (v, p) => `De ${Math.min(...p.d)} a ${v.x} hay ${p.rango}.`,
  });
  XG.renglones('varianza-pasos', { w: 80, x: 280 });
  XG.frases('mas-disperso');
  XG.renglones('suma-igual', { w: 84, x: 278 });
  XG.renglones('elige-regular', { w: 92, x: 276 });
  XG.ascensor('sube-varianza', 60, 1, neutro);
  // --------------------------------------------------------------------------------------------------- percentiles y cajas
  const mediana = d => (d.length % 2 ? d[(d.length - 1) / 2] : (d[d.length / 2 - 1] + d[d.length / 2]) / 2), cuart = d => { const m = Math.floor(d.length / 2); return [mediana(d.slice(0, m)), mediana(d), mediana(d.slice(-m))]; };
  // Arma la caja de unos datos ordenados.  params { d, hi }
  XG.figura('arma-caja', {
    ini: () => ({ a: 0, b: 0, c: 0 }), alto: () => 300, ms: 1000, pie: 'Mueve los tres cortes.', manijas: p => [['a', 'primer cuartil'], ['b', 'mediana'], ['c', 'tercer cuartil']].map(([k, et]) => ({ k, min: 0, max: p.hi, paso: 1, et })),
    ok(v, p) { const q = cuart(p.d); return v.a === q[0] && v.b === q[1] && v.c === q[2]; }, sol(p) { const [a, b, c] = cuart(p.d); return { a, b, c }; }, texto: p => cuart(p.d).join(', '),
    dib(v, K, p, f) { const [X, h] = EJE(K, p.hi, 84, p.hi > 12 ? 2 : 1), lo = Math.min(...p.d), hi = Math.max(...p.d); return h + puntos(K, p.d, X, 84) + K.f(f, K.l(X(lo), 124, X(hi), 124, 'gr') + K.r(X(Math.min(v.a, v.c)), 110, Math.abs(X(v.c) - X(v.a)), 28, 'fa', 2) + K.l(X(v.b), 110, X(v.b), 138, 'lg gr')); },
    aviso(v, p) { const q = cuart(p.d); return v.b !== q[1] ? 'La mediana deja la misma cantidad de datos a cada lado.' : v.a !== q[0] ? 'El primer cuartil es la mediana de la mitad de abajo.' : 'El tercer cuartil es la mediana de la mitad de arriba.'; }, bien: (v) => `Cuartiles ${v.a}, ${v.b} y ${v.c}.`,
  });
  const caja = (K, q, X, y, cls) => K.l(X(q[0]), y, X(q[4]), y, 'gr') + K.l(X(q[0]), y - 8, X(q[0]), y + 8, 'gr') + K.l(X(q[4]), y - 8, X(q[4]), y + 8, 'gr') + K.r(X(q[1]), y - 12, X(q[3]) - X(q[1]), 24, cls, 2) + K.l(X(q[2]), y - 12, X(q[2]), y + 12, 'lg gr');
  XG.renglones('lee-caja', { w: 72, x: 282, y0: 118, fondo(K, p) { const [X, h] = EJE(K, p.hi, 58, p.paso); return h + caja(K, p.q, X, 26, 'fa'); } });
  XG.renglones('compara-cajas', { w: 72, x: 282, y0: 148, fondo(K, p) { const [X, h] = EJE(K, p.hi, 92, p.paso); return h + caja(K, p.A, X, 20, 'fa') + caja(K, p.B, X, 60, 'ff') + K.t(10, 24, 'A', 'b ta', 'start') + K.t(10, 64, 'B', 'b tf', 'start'); } });
  // Cuántos quedan por debajo de un percentil.  params { n, pc, max }
  XG.figura('percentil-puesto', {
    ini: () => ({ k: 0 }), alto: () => 190, ms: 900, pie: 'Mueve cuántos quedan por debajo.', manijas: p => [{ k: 'k', min: 0, max: p.n, paso: p.paso || 1, et: 'por debajo' }], ok: (v, p) => v.k * 100 === p.n * p.pc, sol: p => ({ k: p.n * p.pc / 100 }), texto: p => `${p.n * p.pc / 100}`,
    dib(v, K, p, f) { const w = 292 * v.k / p.n; return K.r(24, 40, 292, 34, 'fc', 3) + K.r(24, 40, w, 34, 'fa', 3) + K.t(24, 30, '0', 's tm') + K.t(316, 30, `${p.n} personas`, 's tm', 'end') + K.f(f, K.t(170, 104, `${N(v.k)} de ${p.n}: ${N(v.k / p.n * 100)} %`, 'b')); },
    aviso: (v, p) => (v.k === p.pc ? 'El percentil es un porcentaje, no el número de personas.' : v.k * 100 < p.n * p.pc ? 'Son menos que ese porcentaje.' : 'Son más que ese porcentaje.'), bien: (v, p) => `${v.k} de ${p.n} es el ${p.pc} %.`,
  });
  XG.frases('dice-la-caja');
  XG.ascensor('sube-percentil', 100, 2, neutro);
  // ------------------------------------------------------------------------------------------------------------ correlación
  // Predice con la tendencia.  params { pts, m, b, x, tol, hx, hy }
  XG.figura('predice-nube', {
    ini: () => ({ y: 0 }), alto: () => 224, ms: 1000, pie: 'Mueve la predicción.', manijas: p => [{ k: 'y', min: 0, max: p.hy, paso: 1, et: 'predicción' }], ok: (v, p) => Math.abs(v.y - (p.m * p.x + p.b)) <= p.tol, sol: p => ({ y: p.m * p.x + p.b }), texto: p => `cerca de ${p.m * p.x + p.b}`,
    dib(v, K, p, f) { const X = x => 36 + x / p.hx * 280, Y = y => 140 - y / p.hy * 124; return K.l(36, 140, 320, 140, 'lm') + K.l(36, 10, 36, 140, 'lm') + p.pts.map(([x, y]) => K.c(X(x), Y(y), 5, 'fa')).join('') + K.l(X(p.x), 140, X(p.x), 12, 'lm d') + K.t(X(p.x), 156, p.x, 's tm') + K.c(X(p.x), Y(v.y), 7, 'ff') + [p.hy / 2, p.hy].map(y => K.t(30, Y(y) + 4, y, 's tm', 'end')).join('') + K.f(f, K.l(X(0), Y(p.b), X(p.hx), Y(p.m * p.hx + p.b), 'lg d')); },
    aviso: (v, p) => (v.y < p.m * p.x + p.b ? 'Queda por debajo de la tendencia.' : 'Queda por encima de la tendencia.'), bien: (v, p) => `La tendencia pasa cerca de ${p.m * p.x + p.b}.`,
  });
  // El punto que se sale de la tendencia.  params { pts: [[x, y]], raro, hx, hy }
  const PX = (p, q) => [40 + q[0] / p.hx * 264, 150 - q[1] / p.hy * 130];
  XG.marca('punto-raro', {
    sitios: p => p.pts.map(q => ({ x: PX(p, q)[0], y: PX(p, q)[1], w: 24, h: 24 })), cara: (K, p, i) => K.c(...PX(p, p.pts[i]), 5, 'fa'), alto: () => 176, nombre: (p, i) => `punto ${i + 1}`, fondo: K => K.l(30, 160, 320, 160, 'lm') + K.l(30, 8, 30, 160, 'lm'),
    sol: p => [p.raro], aviso: () => 'Ese sigue la tendencia de los demás, o falta uno: busca el que está lejos del grupo.', bien: p => p.ok, texto: p => `(${p.pts[p.raro].join(', ')})`, pie: 'Toca el punto que se sale.',
  });
  XG.renglones('signo-correlacion', { w: 92, x: 276 });
  XG.renglones('fuerza-r', { w: 116, x: 270 });
  XG.renglones('tercer-factor', { w: 130, x: 262 });
  XG.frases('causa-o-no');
  XG.ascensor('sube-nube', 60, 1, neutro);

  // ===================================================================================== Números y Sucesiones
  // Punto de una fracción en la recta.  params { n, d, hi }
  XG.figura('fraccion-recta', {
    ini: () => ({ k: 0 }), alto: () => 180, ms: 900, pie: 'Mueve el punto.', manijas: p => [{ k: 'k', min: 0, max: p.hi * p.partes, paso: 1, et: 'marcas' }], ok: (v, p) => v.k * p.d === p.n * p.partes, sol: p => ({ k: p.n * p.partes / p.d }), texto: p => `${p.n * p.partes / p.d} marcas`,
    dib(v, K, p, f) { const T = p.hi * p.partes, X = k => 30 + k / T * 280; let h = K.l(30, 60, 310, 60, 'gr'); for (let i = 0; i <= T; i++) h += K.l(X(i), i % p.partes ? 55 : 50, X(i), i % p.partes ? 65 : 70, 'lm') + (i % p.partes ? '' : K.t(X(i), 86, i / p.partes, 's')); return h + K.c(X(v.k), 60, 7, 'ff') + K.t(170, 24, p.et, 'b') + K.f(f, K.t(170, 110, `${N(v.k)} de ${p.partes}: ${N(v.k / p.partes)}`, 'b')); },
    aviso: (v, p) => (v.k * p.d < p.n * p.partes ? 'Ese punto vale menos.' : 'Ese punto vale más.'), bien: (v, p) => `${v.k} marcas de ${p.partes} por unidad.`,
  });
  // Exponente de una notación científica.  params { m, et, e, lo, hi }
  const SUP = n => [...String(n)].map(c => (c === '-' ? '⁻' : '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])).join('');
  XG.figura('coma-cientifica', {
    ini: () => ({ e: 0 }), alto: () => 170, ms: 900, pie: 'Mueve el exponente.', manijas: p => [{ k: 'e', min: p.lo, max: p.hi, paso: 1, et: 'exponente' }], ok: (v, p) => v.e === p.e, sol: p => ({ e: p.e }), texto: p => `${p.m} · 10${SUP(p.e)}`,
    dib(v, K, p, f) { const e = Math.round(v.e); return K.t(170, 40, p.et, 'B') + K.t(170, 84, `${p.m} · 10${SUP(e)}`, 'B ta') + K.f(f, K.t(170, 112, e === p.e ? 'son iguales' : 'no son iguales', 's tm')); },
    aviso: (v, p) => (Math.sign(v.e) !== Math.sign(p.e) ? 'Mira si el número es mayor que 10 o menor que 1.' : Math.abs(v.e) > Math.abs(p.e) ? 'Corriste la coma de más.' : 'A la coma le faltó correr.'), bien: (v, p) => `La coma corre ${Math.abs(p.e)} lugares.`,
  });
  XG.renglones('fraccion-decimal', { w: 76, x: 280 });
  XG.renglones('opera-cientifica', { w: 96, x: 272 });
  XG.frases('entre-los-dos');
  XG.renglones('a-que-conjunto', { w: 112, x: 270 });
  XG.ascensor('sube-fraccion', 100, 2, neutro);
  // Cuánto se cruzan dos grupos.  params { a, b, total, A, B, fuera }
  XG.figura('cruce-grupos', {
    ini: () => ({ k: 0 }), alto: () => 200, ms: 1000, pie: 'Mueve los que están en los dos.', manijas: p => [{ k: 'k', min: 0, max: Math.min(p.a, p.b), paso: 1, et: 'en los dos' }], ok: (v, p) => p.a + p.b - v.k + p.fuera === p.total, sol: p => ({ k: p.a + p.b + p.fuera - p.total }), texto: p => `${p.a + p.b + p.fuera - p.total}`,
    dib(v, K, p, f) { return K.r(20, 10, 300, 126, 'fn', 6) + K.c(130, 74, 50, 'fa') + K.c(210, 74, 50, 'fg') + K.t(28, 26, `${p.A}: ${p.a}`, 's ta', 'start') + K.t(312, 26, `${p.B}: ${p.b}`, 's tg', 'end') + K.t(170, 79, Math.round(v.k), 'b') + K.t(300, 128, p.fuera, 's tm') + K.f(f, K.t(112, 79, p.a - Math.round(v.k), 'b') + K.t(228, 79, p.b - Math.round(v.k), 'b')); },
    aviso(v, p) { const t = p.a + p.b - v.k + p.fuera; return t > p.total ? 'Así habría más personas que el total: se están contando dos veces.' : 'Así sobrarían personas sin ubicar.'; }, bien: (v, p) => `${p.a} + ${p.b} − ${v.k} + ${p.fuera} = ${p.total}.`,
  });
  // Zonas de dos conjuntos.  params { pide, zonas, mira: [por zona], ok }
  const ZN = [[104, 84, 'solo A'], [170, 84, 'A y B'], [236, 84, 'solo B'], [298, 146, 'fuera']];
  XG.marca('pinta-zona', {
    sitios: () => ZN.map(([x, y]) => ({ x, y, w: 44, h: 40 })), cara: (K, p, i, on) => K.t(ZN[i][0], ZN[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 176, nombre: (p, i) => ZN[i][2], fondo: K => K.r(12, 8, 316, 160, 'fn', 8) + K.c(134, 84, 62, 'fa') + K.c(206, 84, 62, 'fg') + K.t(70, 30, 'A', 'b ta') + K.t(270, 30, 'B', 'b tg'),
    sol: p => p.zonas, aviso(on, p) { const i = on.findIndex((x, k) => x !== p.zonas.includes(k)); return p.mira[i]; }, bien: p => p.ok, texto: p => p.zonas.map(i => ZN[i][2]).join('; '), pie: 'Toca todas las zonas que cumplen.',
  });
  XG.rotula('llena-zonas', {
    slots: () => [{ x: 102, y: 84, w: 50, h: 38 }, { x: 170, y: 84, w: 46, h: 38 }, { x: 238, y: 84, w: 50, h: 38 }, { x: 290, y: 146, w: 50, h: 34 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${ZN[i][2]}: ${m}`).join('; '), alto: () => 176, fondo: (K, p) => K.r(12, 8, 316, 160, 'fn', 8) + K.c(134, 84, 62, 'fa') + K.c(206, 84, 62, 'fg') + K.t(66, 28, p.A, 's ta') + K.t(274, 28, p.B, 's tg'),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,
  });
  XG.renglones('cuantos-conjunto', { w: 64, x: 284 });
  XG.frases('verdad-conjuntos');
  XG.ascensor('sube-conjunto', 60, 1, neutro);
  // Qué término vale lo pedido.  params { a, d (suma) | r (razón), meta, max }
  const term = (p, n) => (p.r ? p.a * p.r ** (n - 1) : p.a + p.d * (n - 1)), cual = p => { let n = 1; while (n < p.max && Math.abs(term(p, n) - p.meta) > 1e-9) n++; return n; };
  XG.figura('que-termino', {
    ini: () => ({ n: 1 }), alto: () => 176, ms: 900, pie: 'Mueve el lugar.', manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'lugar' }], ok: (v, p) => Math.abs(term(p, v.n) - p.meta) < 1e-9, sol: p => ({ n: cual(p) }), texto: p => `el lugar ${cual(p)}`,
    dib(v, K, p, f) { const n = Math.round(v.n); return [1, 2, 3].map(i => K.r(28 + (i - 1) * 62, 30, 54, 38, 'fa', 5) + K.t(55 + (i - 1) * 62, 55, N(term(p, i)), 'b')).join('') + K.t(224, 55, '…', 'b') + K.r(246, 30, 66, 38, 'ff', 5) + K.t(279, 55, p.meta, 'b') + K.t(279, 84, `lugar ${n}`, 's tm') + K.f(f, K.t(170, 110, `en el lugar ${n} está ${N(term(p, n))}`, 's')); },
    aviso(v, p) { return `En el lugar ${v.n} está ${N(term(p, v.n))}.`; }, bien: (v, p) => `En el lugar ${v.n} está ${p.meta}.`,
  });
  XG.renglones('suma-o-multiplica', { w: 108, x: 272 });
  XG.renglones('se-acerca-a', { w: 76, x: 280 });
  XG.renglones('lugar-lejano', { w: 76, x: 280 });
  XG.frases('tiene-limite');
  // Cuántas mitades hasta que falte a lo sumo 1/tope.  params { tope, max }
  XG.figura('mitades-faltan', {
    ini: () => ({ n: 0 }), alto: () => 176, ms: 1000, pie: 'Mueve cuántos pasos.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: 'pasos' }], ok: (v, p) => v.n === Math.ceil(Math.log2(p.tope)), sol: p => ({ n: Math.ceil(Math.log2(p.tope)) }), texto: p => `${Math.ceil(Math.log2(p.tope))} pasos`,
    dib(v, K, p, f) { const n = Math.round(v.n); return K.l(30, 60, 310, 60, 'lm') + K.t(30, 84, '0', 's') + K.t(310, 84, 'meta', 's') + [1, 2, 3].map(i => K.c(30 + 280 * (1 - 0.5 ** i), 60, 4, 'fa')).join('') + K.f(f, K.r(30, 54, 280 * (1 - 0.5 ** n), 12, 'fg', 2) + K.t(170, 110, n ? `falta 1/${2 ** n}` : 'falta todo', 'b')); },
    aviso: (v, p) => (2 ** v.n < p.tope ? `Con ${v.n} todavía falta ${v.n ? `1/${2 ** v.n}` : 'todo'}.` : 'Ya alcanzaba con menos pasos.'), bien: (v) => `Falta 1/${2 ** v.n}.`,
  });
  XG.ascensor('sube-sucesion', 100, 2, neutro);

  // ======================================================================================== Ciencia y Sociedad
  XG.renglones('riesgo-grupos', { w: 84, x: 278 });
  XG.renglones('solida-o-no', { w: 100, x: 276 });
  XG.frases('buena-evidencia');
  // Huella: cuántos para compensar.  params { gasta, cada, max, et, u }
  XG.figura('compensa-justo', {
    ini: () => ({ n: 0 }), alto: () => 170, ms: 900, pie: 'Mueve la cantidad.', manijas: p => [{ k: 'n', min: 0, max: p.max, paso: 1, et: p.et }], ok: (v, p) => v.n * p.cada === p.gasta, sol: p => ({ n: p.gasta / p.cada }), texto: p => `${p.gasta / p.cada} ${p.et}`,
    dib(v, K, p, f) { const u = 270 / (p.max * p.cada), n = Math.round(v.n), w = p.cada * u; return K.r(30, 22, p.gasta * u, 26, 'ff', 2) + K.t(34, 40, `${p.gasta} ${p.u}`, 's', 'start') + Array.from({ length: n }, (_, i) => K.r(30 + i * (f ? w : 5), 58, f ? Math.max(2, w - 1) : 4, 26, 'fa', 1)).join('') + K.f(f, K.t(170, 104, `${n} · ${p.cada} = ${n * p.cada} ${p.u}`, 'b')); },
    aviso: (v, p) => (v.n * p.cada < p.gasta ? 'No alcanza.' : 'Sobra: se puede con menos.'), bien: (v, p) => `${v.n} por ${p.cada}: ${p.gasta} ${p.u}.`,
  });
  XG.ascensor('sube-evidencia', 100, 2, neutro);
})();
;
//#archivo js/games/cuadrados-pitagoras.js
// Los cuadrados de Pitágoras (Preuniversitario UdeA, pu-ge-2; spec 2026-11-18-preuda-geometria): un triángulo
// rectángulo en una cuadrícula con sus catetos sueltos (se arrastran sus puntas, de 1 en 1). Sobre cada cateto crece
// su cuadrado entero (con sus casillas), y abajo una tira junta las casillas de los dos: esa es el área del cuadrado de la hipotenusa. Hay que
// lograr que esa área sea la pedida (25 → la hipotenusa mide 5). Así aparecen las ternas 3-4-5, 6-8-10 y 5-12-13.
// params = { rounds: [{ c2 }], max? }   state = { rounds: [{ a, b }] }   (a: cateto horizontal; b: vertical)
GAMES['cuadrados-pitagoras'] = (() => {
  const root = n => (Number.isInteger(Math.sqrt(n)) ? String(Math.sqrt(n)) : `√${n}`);
  const game = roundsGame({
    aspect: 1.42,
    init: () => ({ a: 2, b: 1 }),
    ok: (s, r) => s.a * s.a + s.b * s.b === r.c2,
    solution: (r, P) => { const m = game.size(r, P); for (let a = 1; a <= m; a++) for (let b = a; b <= m; b++) if (a * a + b * b === r.c2) return `${a}² + ${b}² = ${r.c2}: catetos ${a} y ${b}, hipotenusa ${root(r.c2)}`; return ''; },
    prompt: r => `Arma un triángulo rectángulo con hipotenusa ${root(r.c2)}`,
    foot: (r, s) => (s.a * s.a + s.b * s.b === r.c2 ? 'El cuadrado de la hipotenusa es la suma de los otros dos' : `El cuadrado de la hipotenusa debe tener ${r.c2} casillas`),
    // La cuadrícula se ajusta a la ronda: el triángulo va arriba a la derecha del ángulo recto y cada cuadrado crece
    // entero hacia afuera (el del cateto horizontal hacia abajo, el del vertical hacia la izquierda).
    layout(G) { G.oxy = () => { const m = game.size(G.r, G.params), top = 104, bot = G.H - 84, u = Math.min((G.W - 24) / (2 * m), (bot - top) / (2 * m)); return { m, u, ox: G.W / 2, oy: top + m * u + (bot - top - 2 * m * u) / 2 }; }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r, s } = G, { m, u, ox, oy } = G.oxy(), c2 = s.a * s.a + s.b * s.b, ok = !VELO.on && c2 === r.c2;
      G.u = u; G.ox = ox; G.oy = oy; G.m = m;
      // Cuadrícula tenue en la zona del triángulo.
      p.stroke(C.line); p.strokeWeight(1); for (let i = 0; i <= m; i++) { p.line(ox + i * u, oy, ox + i * u, oy - m * u); p.line(ox, oy - i * u, ox + m * u, oy - i * u); }
      // Los dos cuadrados, con sus casillas.
      const sq = (x, y, n, col, txt) => {
        const c = p.color(col); c.setAlpha(110); p.noStroke(); p.fill(c); p.rect(x, y, n * u, n * u);
        p.stroke(col); p.strokeWeight(1); for (let i = 0; i <= n; i++) { p.line(x + i * u, y, x + i * u, y + n * u); p.line(x, y + i * u, x + n * u, y + i * u); }
        p.strokeWeight(2.5); p.noFill(); p.rect(x, y, n * u, n * u);
        if (n * u >= 34) TK.label(p, C, txt, x + n * u / 2, y + n * u / 2, C.ink, 13, n * u - 4);
      };
      sq(ox, oy, s.a, C.sky, `${s.a * s.a}`); sq(ox - s.b * u, oy - s.b * u, s.b, C.coral, `${s.b * s.b}`);
      // El triángulo.
      const col = G.locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.ink, t = p.color(C.sun); t.setAlpha(70);
      p.fill(t); p.stroke(col); p.strokeWeight(3); p.triangle(ox, oy, ox + s.a * u, oy, ox, oy - s.b * u);
      p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(ox, oy - 8, 8, 8);
      TK.label(p, C, ok ? root(c2) : `√${c2}`, ox + s.a * u / 2 + 22, oy - s.b * u / 2 - 14, ok ? C.ok : C.N, 14, 70);
      G.ka = { x: ox + s.a * u, y: oy }; G.kb = { x: ox, y: oy - s.b * u };
      GEO.knob(p, C, G.ka.x, G.ka.y, C.sky); GEO.knob(p, C, G.kb.x, G.kb.y, C.coral);
      // La tira: las casillas de los dos cuadrados, juntas, frente a las que se piden.
      const y = G.H - 64, w = G.W - 40, k = w / Math.max(r.c2, c2, 1);
      p.noStroke(); p.fill(C.sky); p.rect(20, y, s.a * s.a * k, 16, 3); p.fill(C.coral); p.rect(20 + s.a * s.a * k, y, s.b * s.b * k, 16, 3);
      p.noFill(); p.stroke(ok ? C.ok : C.ink); p.strokeWeight(2); p.rect(20, y - 3, r.c2 * k, 22, 4);
      TK.label(p, C, `${s.a}² + ${s.b}² = ${s.a * s.a} + ${s.b * s.b} = ${c2}`, G.W / 2, y + 32, ok ? C.ok : C.mute, 13, w);
    },
    press(G, x, y) { const near = k => Math.hypot(x - k.x, y - k.y) < 26; G.grab = near(G.ka) ? 'a' : near(G.kb) ? 'b' : null; return !!G.grab; },
    drag(G, x, y) {
      if (!G.grab) return false;
      const m = G.m, v = Math.max(1, Math.min(m, Math.round(G.grab === 'a' ? (x - G.ox) / G.u : (G.oy - y) / G.u)));
      if (v !== G.s[G.grab]) { G.s[G.grab] = v; G.touch(); }
      return true;
    },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.ka.x, y: G.ka.y }, to: { x: G.ka.x + 3 * G.u, y: G.ka.y }, text: 'Arrastra las puntas de los catetos', ty: 106 }),
    peek: G => ({ ka: G.ka, kb: G.kb, u: G.u }),
  });
  // Lado de la cuadrícula de una ronda: lo justo para que quepan sus catetos (y uno más, para pasarse).
  game.size = (r, P) => Math.min(P.max || 12, Math.ceil(Math.sqrt(r.c2)) + 1);
  return game;
})();
;
//#archivo js/games/apunta-chorro.js
// Apunta el chorro (Álgebra, parábola y vértice; juego dinámico de alg-4a; spec 2026-11-21-dinamicos-mundos-altos):
// la fuente de Caro. Cada reto da la fórmula del chorro; hay que tocar en la cuadrícula el punto donde da la vuelta
// (el vértice) y luego «Lanzar»: el agua sale y, si el vértice está bien, pasa justo por la linterna. La fórmula puede
// venir armada, y = a(x − h)² + k, o sin armar (hay que completar el cuadrado o usar h = −b ÷ 2a).
// params = { rounds: [{ title, items: [{ a, h, k, std?: true }] }], lives? }   state = { done: [n] }
// La cuadrícula va de x = −5 a 5 y de y = −1 a 9.

GAMES['apunta-chorro'] = (() => {
  const sg = (v, first) => (v < 0 ? (first ? '-' : ' - ') : first ? '' : ' + ');
  const co = (c, first) => `${sg(c, first)}${Math.abs(c) === 1 ? '' : Math.abs(c)}`;
  const tex = it => {
    if (!it.std) return `y = ${it.a === 1 ? '' : it.a === -1 ? '-' : it.a}${it.h ? `(x ${it.h < 0 ? '+' : '-'} ${Math.abs(it.h)})^2` : 'x^2'}${it.k ? `${sg(it.k)}${Math.abs(it.k)}` : ''}`;
    const b = -2 * it.a * it.h, c = it.a * it.h * it.h + it.k;
    return `y = ${co(it.a, true)}x^2${b ? `${co(b)}x` : ''}${c ? `${sg(c)}${Math.abs(c)}` : ''}`;
  };
  return questGame({
    aspect: 1.4,
    init: () => ({ pt: null }),
    ok: (s, it) => !!s.pt && s.pt[0] === it.h && s.pt[1] === it.k,
    answer: it => ({ pt: [it.h, it.k] }),
    solution: it => `$${tex(it)}$: vértice $(${it.h}, ${it.k})$`,
    prompt: it => `$${tex(it)}$`,
    foot: (it, s) => (s.pt ? 'Toca «Lanzar» para soltar el agua' : 'Toca el punto donde el chorro da la vuelta'),
    no: (it, s) => (s.pt[0] !== it.h ? 'El chorro da la vuelta en otro x' : 'La altura del vértice es otra'),
    layout(G) {
      G.btn = { x: G.W / 2 - 60, y: G.bottom - 38, w: 120, h: 34 };
      const u = Math.min((G.W - 30) / 10, (G.btn.y - G.top - 16) / 10);
      G.grid = { u, x0: G.W / 2, y0: G.top + 8 + 9 * u };
      G.at = (x, y) => [G.grid.x0 + x * u, G.grid.y0 - y * u];
    },
    draw(G) {
      const { p, C, s, item: it } = G, { u } = G.grid;
      p.stroke(C.line); p.strokeWeight(1);
      for (let x = -5; x <= 5; x++) p.line(...G.at(x, -1), ...G.at(x, 9));
      for (let y = -1; y <= 9; y++) p.line(...G.at(-5, y), ...G.at(5, y));
      p.stroke(C.ink); p.strokeWeight(2); p.line(...G.at(-5, 0), ...G.at(5, 0)); p.line(...G.at(0, -1), ...G.at(0, 9));
      p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(9); p.textAlign(p.CENTER, p.CENTER);
      for (let x = -4; x <= 4; x += 2) if (x) p.text(negTxt(x), G.at(x, 0)[0], G.at(x, 0)[1] + 9);
      for (let y = 2; y <= 8; y += 2) p.text(y, G.at(0, y)[0] - 9, G.at(0, y)[1]);
      if (G.solved) {   // el chorro: la parábola, recortada a la cuadrícula
        p.noFill(); p.stroke(C.sky); p.strokeWeight(3.5); p.beginShape();
        for (let x = -5; x <= 5.001; x += 0.1) { const y = it.a * (x - it.h) ** 2 + it.k; if (y >= -1 && y <= 9) p.vertex(...G.at(x, y)); }
        p.endShape();
      }
      if (s.pt) { const [x, y] = G.at(...s.pt); drawDot(p, C, x, y, 12, G.solved ? C.ok : C.sun); drawPill(p, C, `(${negTxt(s.pt[0])}, ${negTxt(s.pt[1])})`, x, y - 18, G.solved ? C.ok : C.sun, 11); }
      drawBtn(p, C, G.btn, 'Lanzar', G.solved, G.solved ? C.ok : s.pt ? C.coral : C.line);
    },
    press(G, x, y) {
      if (hitBox(G.btn, x, y)) { if (G.s.pt) G.submit(); return true; }
      const { u, x0, y0 } = G.grid, gx = Math.round((x - x0) / u), gy = Math.round((y0 - y) / u);
      if (gx < -5 || gx > 5 || gy < -1 || gy > 9) return false;
      G.s.pt = [gx, gy]; G.api.sfx?.tap?.();
      return true;
    },
    peek: G => { const q = (x, y) => { const [a, b] = G.at(x, y); return { x: a - 2, y: b - 2, w: 4, h: 4 }; }; return { solve: [q(G.item.h, G.item.k), G.btn], wrongs: [q(G.item.h + 1, G.item.k), G.btn] }; },
  });
})();
;
//#archivo js/games/donde-cae.js
// ¿Dónde cae el agua? (Álgebra, ecuaciones cuadráticas; juego dinámico de alg-4; spec 2026-11-21-dinamicos-mundos-altos):
// la boquilla de la fuente está en x = 0 y el agua solo cae hacia adelante. El agua toca el suelo donde la altura vale
// cero: en las raíces de la ecuación. Se ponen baldes en las marcas del suelo donde va a caer y luego «Abrir el agua».
// Como en el video, a veces una raíz no sirve (queda detrás de la boquilla), a veces hay una sola (raíz doble) y a
// veces el agua no toca el suelo nunca (no hay raíces reales): entonces no se pone ningún balde.
// params = { rounds: [{ title, items: [{ eq (TeX), roots: [raíces reales] }] }], lives? }   state = { done: [n] }
// Las marcas van de 1 a 8.

GAMES['donde-cae'] = (() => {
  const valid = it => [...new Set(it.roots.filter(r => r > 0))].sort((a, b) => a - b);
  const picked = s => s.on.map((v, i) => (v ? i + 1 : 0)).filter(Boolean);
  return questGame({
    aspect: 1.15,
    init: () => ({ on: Array(8).fill(false) }),
    ok: (s, it) => picked(s).join() === valid(it).join(),
    answer: it => ({ on: Array.from({ length: 8 }, (_, i) => valid(it).includes(i + 1)) }),
    solution: it => `$${it.eq}$: ${valid(it).length ? `cae en ${valid(it).join(' y ')}` : 'no cae adelante'}`,
    prompt: it => `$${it.eq}$`,
    foot: () => 'Pon un balde donde cae el agua (adelante de la boquilla) y abre',
    no: (it, s) => { const v = valid(it), g = picked(s); return g.some(x => !v.includes(x)) ? (it.roots.length ? 'Ahí la altura no vale cero' : 'Esta ecuación no tiene raíces reales: el agua no toca el suelo') : it.roots.some(r => r <= 0) && !v.length ? 'La raíz queda detrás de la boquilla' : 'Falta un balde'; },
    layout(G) {
      G.btn = { x: G.W / 2 - 74, y: G.bottom - 40, w: 148, h: 34 };
      const y = G.btn.y - 54, step = (G.W - 60) / 8;
      G.gy = y; G.mark = i => ({ x: 30 + i * step - step / 2 + 4, y: y - 30, w: step - 8, h: 50 }); G.X = i => 30 + i * step;
    },
    draw(G) {
      const { p, C, W, s, item: it } = G, y = G.gy;
      p.stroke(C.ink); p.strokeWeight(3); p.line(14, y, W - 14, y);
      // La boquilla en 0.
      p.noStroke(); p.fill(C.mute); p.rect(G.X(0) - 7, y - 22, 14, 22, 3); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(10); p.textAlign(p.CENTER, p.CENTER); p.text('0', G.X(0), y + 12);
      for (let i = 1; i <= 8; i++) {
        const x = G.X(i), on = s.on[i - 1];
        p.stroke(C.ink); p.strokeWeight(2); p.line(x, y - 5, x, y + 5);
        p.noStroke(); p.fill(on ? C.N : C.mute); p.textStyle(p.BOLD); p.textSize(11); p.text(i, x, y + 14);
        if (on) { const good = G.solved; p.fill(good ? C.ok : C.sky); p.quad(x - 12, y - 22, x + 12, y - 22, x + 8, y - 3, x - 8, y - 3); }
      }
      if (G.solved) for (const r of valid(it)) {   // el chorro hasta cada balde
        p.noFill(); p.stroke(C.sky); p.strokeWeight(3); p.beginShape();
        for (let t = 0; t <= 1.001; t += 0.05) p.vertex(G.X(0) + (G.X(r) - G.X(0)) * t, y - 22 - Math.sin(Math.PI * t) * Math.min(120, G.gy - G.top - 30));
        p.endShape();
      }
      if (G.solved && !valid(it).length) { p.noStroke(); p.fill(C.ok); p.textStyle(p.BOLD); fitText(p, it.roots.length ? 'La raíz queda detrás: ningún balde' : 'Sin raíces reales: ningún balde', W / 2, G.top + 30, W - 20, 14); }
      drawBtn(p, C, G.btn, 'Abrir el agua', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      if (hitBox(G.btn, x, y)) { G.submit(); return true; }
      for (let i = 1; i <= 8; i++) if (hitBox(G.mark(i), x, y)) { G.s.on[i - 1] = !G.s.on[i - 1]; G.api.sfx?.tap?.(); return true; }
      return false;
    },
    peek: G => { const v = valid(G.item), off = G.s.on.map((on, i) => (on !== v.includes(i + 1) ? i + 1 : 0)).filter(Boolean); return { solve: [...off.map(i => G.mark(i)), G.btn], wrongs: [G.mark(v.includes(8) ? 7 : 8), G.btn] }; },
  });
})();
;
//#archivo js/games/lirios-laguna.js
// Los lirios de la laguna (Álgebra, función exponencial; juego dinámico de alg-71; spec
// 2026-11-21-dinamicos-mundos-altos): como en el video, los lirios se duplican cada día y un día dado cubren toda la
// laguna. La pregunta va hacia atrás: ¿qué día estaba medio llena, o a la cuarta parte, o con tantos lirios? Con
// «◀ día» y «día ▶» se mueve el calendario y la laguna se dibuja como estaba ese día; con «Este día» se responde.
// La sorpresa del video: la mitad no está a medio camino, sino un solo día antes.
// params = { rounds: [{ title, items: [{ full, ask: 'half' | 'quarter' | 'eighth' | número de lirios }] }], lives? }
// state = { done: [n] }      (el día `full` hay 2^full lirios y la laguna está llena)

GAMES['lirios-laguna'] = (() => {
  const back = { half: 1, quarter: 2, eighth: 3 };
  const dayOf = it => (typeof it.ask === 'number' ? Math.round(Math.log2(it.ask)) : it.full - back[it.ask]);
  const askTxt = it => (typeof it.ask === 'number' ? `tenía ${it.ask} lirios` : it.ask === 'half' ? 'estaba medio llena' : it.ask === 'quarter' ? 'estaba a la cuarta parte' : 'estaba a la octava parte');
  return questGame({
    aspect: 1.3,
    init: it => ({ day: it.full }),
    ok: (s, it) => s.day === dayOf(it),
    answer: it => ({ day: dayOf(it) }),
    solution: it => `Llena el día ${it.full}: ${askTxt(it)} el día ${dayOf(it)}`,
    prompt: it => `Se llena el día ${it.full}. ¿Qué día ${askTxt(it)}?`,
    foot: () => 'Cada día hacia atrás hay la mitad de lirios',
    no: (it, s) => (s.day < dayOf(it) ? 'Ese día había menos lirios' : 'Ese día había más lirios'),
    layout(G) {
      const w = (G.W - 24 - 2 * 8) / 3, y = G.bottom - 42; G.btn = [0, 1, 2].map(i => ({ x: 12 + i * (w + 8), y, w, h: 36 }));
      const side = Math.min(G.W - 60, y - G.top - 44); G.pond = { x: G.W / 2 - side / 2, y: G.top + 8, s: side };
    },
    draw(G) {
      const { p, C, W, s, item: it } = G, q = G.pond, cells = 64 * 2 ** (s.day - it.full), n = 8, cs = q.s / n;
      p.noStroke(); p.fill(shade(C.sky, 0.55)); p.rect(q.x, q.y, q.s, q.s, 14);
      // 64 casillas: se llenan por columnas (así la mitad y la cuarta parte se ven de un vistazo).
      for (let i = 0; i < 64; i++) {
        const c = Math.floor(i / n), r = i % n, f = Math.max(0, Math.min(1, cells - i));
        if (f <= 0) break;
        p.fill(G.solved ? C.ok : C.mint); p.circle(q.x + c * cs + cs / 2, q.y + r * cs + cs / 2, (cs - 4) * Math.sqrt(f));
      }
      p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      fitText(p, `Día ${s.day}`, W / 2, q.y + q.s + 14, W - 20, 16);
      drawBtn(p, C, G.btn[0], '◀ día', false, C.cream); drawBtn(p, C, G.btn[1], 'día ▶', false, C.cream); drawBtn(p, C, G.btn[2], 'Este día', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, i = G.btn.findIndex(b => hitBox(b, x, y));
      if (i < 0) return false;
      if (i === 2) { G.submit(); return true; }
      s.day = Math.max(0, Math.min(it.full, s.day + (i ? 1 : -1))); G.api.sfx?.tap?.();
      return true;
    },
    peek: G => { const n = dayOf(G.item) - G.s.day; return { solve: [...Array(Math.abs(n)).fill(G.btn[n > 0 ? 1 : 0]), G.btn[2]], wrong: n ? G.btn[2] : null }; },
  });
})();
;
//#archivo js/games/dos-bancos.js
// Los dos bancos (Álgebra, interés simple y compuesto; juego dinámico de alg-13b; spec
// 2026-11-21-dinamicos-mundos-altos): como Beto en el video, se quiere saber en qué año un ahorro llega a su meta
// (duplicarse, por ejemplo). Se dan el tipo de interés y la tasa, y cómo va el ahorro los tres primeros años. Se toca
// en el calendario el año en que se cree que llega y luego «Correr los años»: el juego hace crecer el ahorro año por
// año y se ve si la apuesta era el primer año en que alcanza la meta. Con interés simple cada año suma lo mismo; con
// compuesto, cada año multiplica.
// params = { rounds: [{ title, items: [{ kind: 'simple' | 'comp', rate (%), goal (factor, p. ej. 2) }] }], lives? }
// state = { done: [n] }

GAMES['dos-bancos'] = (() => {
  const amount = (it, n) => (it.kind === 'simple' ? 1 + (it.rate / 100) * n : (1 + it.rate / 100) ** n);
  const yearOf = it => { for (let n = 1; n <= 16; n++) if (amount(it, n) >= it.goal - 1e-9) return n; return 0; };
  const goalTxt = it => (it.goal === 2 ? 'se duplica' : it.goal === 3 ? 'se triplica' : `llega a ${it.goal} veces`);
  const fmt = v => String(+v.toFixed(2));
  return questGame({
    aspect: 1.3,
    init: () => ({ year: 0 }),
    ok: (s, it) => s.year === yearOf(it),
    answer: it => ({ year: yearOf(it) }),
    solution: it => `${it.kind === 'simple' ? 'Simple' : 'Compuesto'} al ${it.rate} %: ${goalTxt(it)} en el año ${yearOf(it)}`,
    prompt: it => `Interés ${it.kind === 'simple' ? 'simple' : 'compuesto'} del ${it.rate} % anual: ¿en qué año ${goalTxt(it)}?`,
    foot: it => (it.kind === 'simple' ? 'Simple: cada año suma lo mismo' : 'Compuesto: cada año multiplica lo que ya había'),
    no: (it, s) => (s.year < yearOf(it) ? 'Ese año todavía no alcanza la meta' : 'Ya había llegado un año antes'),
    layout(G) {
      G.btn = { x: G.W / 2 - 84, y: G.bottom - 40, w: 168, h: 34 };
      const w = (G.W - 24 - 7 * 6) / 8, y0 = G.btn.y - 92; G.cell = n => ({ x: 12 + ((n - 1) % 8) * (w + 6), y: y0 + Math.floor((n - 1) / 8) * 40, w, h: 34 });
      G.chart = { y: G.top + 8, h: y0 - G.top - 34 };
    },
    draw(G) {
      const { p, C, W, s, item: it } = G, ch = G.chart, shown = G.solved ? yearOf(it) : Math.max(3, s.ran || 0), bw = (W - 40) / 17, top = it.goal * 1.15, Y = v => ch.y + ch.h - (v / top) * ch.h;
      p.stroke(C.coral); p.strokeWeight(2); p.drawingContext.setLineDash([6, 5]); p.line(14, Y(it.goal), W - 14, Y(it.goal)); p.drawingContext.setLineDash([]);
      p.noStroke(); p.fill(C.I); p.textStyle(p.BOLD); p.textSize(10); p.textAlign(p.RIGHT, p.CENTER); p.text(`meta ×${it.goal}`, W - 14, Y(it.goal) - 8);
      for (let n = 0; n <= shown; n++) { const v = Math.min(top, amount(it, n)); p.noStroke(); p.fill(n === shown && G.solved ? C.ok : n ? C.sky : C.mute); p.rect(20 + n * bw, Y(v), bw - 4, ch.y + ch.h - Y(v), 3); }
      p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      fitText(p, `Por cada peso: ${[0, 1, 2, 3].map(n => fmt(amount(it, n))).join(' → ')} → …`, W / 2, ch.y + ch.h + 16, W - 20, 13);
      for (let n = 1; n <= 16; n++) drawTile(p, C, G.cell(n), n, { fill: s.year === n ? (G.solved ? C.ok : C.sun) : C.cream, size: 14, r: 8, lift: 2 });
      drawBtn(p, C, G.btn, 'Correr los años', G.solved, G.solved ? C.ok : s.year ? C.coral : C.line);
    },
    press(G, x, y) {
      if (hitBox(G.btn, x, y)) { if (G.s.year) { G.s.ran = G.s.year; G.submit(); } return true; }   // aun fallando, los años corren hasta la apuesta
      for (let n = 1; n <= 16; n++) if (hitBox(G.cell(n), x, y)) { G.s.year = n; G.api.sfx?.tap?.(); return true; }
      return false;
    },
    peek: G => { const n = yearOf(G.item); return { solve: [G.cell(n), G.btn], wrongs: [G.cell(n === 16 ? 15 : n + 1), G.btn] }; },
  });
})();
;
//#archivo js/games/regla-de-calculo.js
// La regla de cálculo (Álgebra, propiedades de los logaritmos; juego dinámico de alg-72; spec
// 2026-11-21-dinamicos-mundos-altos): dos reglas con las potencias de una base puestas a la misma distancia (cada
// paso es un exponente más). Así se multiplicó durante siglos: sumar distancias es multiplicar números, porque el
// logaritmo de un producto es la suma de los logaritmos. Para a × b se corre la regla de arriba con ◀ ▶ hasta que su 1
// quede sobre a, y se toca en la regla de abajo el número que queda debajo de b. Para dividir se hace al revés.
// params = { rounds: [{ title, items: [{ base, a, b, div?: true }] }], lives? }   (a y b potencias de la base)
// state = { done: [n] }      Las reglas muestran base⁰ … base⁶.

GAMES['regla-de-calculo'] = (() => {
  const lg = (it, v) => Math.round(Math.log(v) / Math.log(it.base));
  // Producto: el 1 de arriba sobre a, y se lee debajo de b. Cociente a ÷ b: b de arriba sobre a, y se lee debajo del 1.
  const shiftOf = it => (it.div ? lg(it, it.a) - lg(it, it.b) : lg(it, it.a));
  const pickOf = it => (it.div ? lg(it, it.a) - lg(it, it.b) : lg(it, it.a) + lg(it, it.b));
  return questGame({
    aspect: 1.15,
    init: () => ({ shift: 0, pick: -1 }),
    ok: (s, it) => s.pick === pickOf(it) && (s.shift === shiftOf(it) || (!it.div && s.shift === lg(it, it.b))),
    answer: it => ({ shift: shiftOf(it), pick: pickOf(it) }),
    solution: it => (it.div ? `$${it.a} \\div ${it.b} = ${it.base ** pickOf(it)}$: exponentes ${lg(it, it.a)} − ${lg(it, it.b)} = ${pickOf(it)}` : `$${it.a} \\times ${it.b} = ${it.base ** pickOf(it)}$: exponentes ${lg(it, it.a)} + ${lg(it, it.b)} = ${pickOf(it)}`),
    prompt: it => (it.div ? `Divide con la regla: $${it.a} \\div ${it.b}$` : `Multiplica con la regla: $${it.a} \\times ${it.b}$`),
    foot: it => (it.div ? `Pon el ${it.b} de arriba sobre el ${it.a} y lee debajo del 1` : `Pon el 1 de arriba sobre un factor y lee debajo del otro`),
    no: (it, s) => (s.shift !== shiftOf(it) && !(!it.div && s.shift === lg(it, it.b)) ? 'La regla de arriba no está en su lugar' : 'Lee el número que queda justo debajo'),
    retry: G => { G.s.pick = -1; },
    layout(G) {
      const y = G.bottom - 42; G.btn = [{ x: 12, y, w: 70, h: 36 }, { x: 90, y, w: 70, h: 36 }];
      const step = (G.W - 40) / 7; G.step = step; G.y0 = G.top + (y - G.top) / 2 - 8;
      G.low = k => ({ x: 20 + k * step, y: G.y0 + 4, w: step, h: 44 });
    },
    draw(G) {
      const { p, C, W, s, item: it } = G, st = G.step, y0 = G.y0;
      p.noStroke(); p.fill(C.card); p.stroke(C.line); p.strokeWeight(1.5); p.rect(14, y0 + 2, W - 28, 48, 8);
      for (let k = 0; k <= 6; k++) {
        const b = G.low(k), on = s.pick === k;
        if (on) { p.noStroke(); p.fill(G.solved ? C.ok : C.sun); p.rect(b.x + 2, b.y, b.w - 4, b.h - 2, 6); }
        p.stroke(C.ink); p.strokeWeight(2); p.line(b.x + b.w / 2, y0 + 2, b.x + b.w / 2, y0 + 12);
        p.noStroke(); p.fill(on ? inkOn(C.sun, C.ink) : C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fitText(p, String(it.base ** k), b.x + b.w / 2, y0 + 26, b.w - 4, 15);
        p.fill(C.mute); p.textSize(9); p.text(k, b.x + b.w / 2, y0 + 62);
      }
      p.fill(C.mute); p.textSize(9); p.textAlign(p.LEFT, p.CENTER); p.text('exponente', 16, y0 + 76);
      // La regla de arriba, corrida `shift` pasos.
      const ux = 14 + s.shift * st;
      p.fill(shade(C.sky, 0.9)); p.noStroke(); p.rect(ux, y0 - 46, W - 28, 46, 8);
      for (let k = 0; k <= 6; k++) {
        const x = ux + 6 + k * st + st / 2; if (x > W - 4) break;
        p.stroke(C.cream); p.strokeWeight(2); p.line(x, y0 - 10, x, y0);
        p.noStroke(); p.fill(C.cream); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fitText(p, String(it.base ** k), x, y0 - 26, st - 4, 15);
      }
      drawBtn(p, C, G.btn[0], '◀', false, C.cream); drawBtn(p, C, G.btn[1], '▶', false, C.cream);
      p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textAlign(p.LEFT, p.TOP); p.textSize(11); p.text('Corre la regla y toca el resultado abajo', 172, G.btn[0].y + 4, W - 180, 30);   // en caja: en celular angosto va en dos renglones, sin pisar el botón
    },
    press(G, x, y) {
      const s = G.s, i = G.btn.findIndex(b => hitBox(b, x, y));
      if (i >= 0) { s.shift = Math.max(0, Math.min(6, s.shift + (i ? 1 : -1))); s.pick = -1; G.api.sfx?.tap?.(); return true; }
      for (let k = 0; k <= 6; k++) if (hitBox(G.low(k), x, y)) { s.pick = k; G.submit(); return true; }
      return false;
    },
    peek: G => { const it = G.item, n = shiftOf(it) - G.s.shift, b = G.low(pickOf(it)), w = G.low((pickOf(it) + 1) % 7); return { solve: [...Array(Math.abs(n)).fill(G.btn[n > 0 ? 1 : 0]), { x: b.x + b.w / 2 - 2, y: b.y + 20, w: 4, h: 4 }], wrong: { x: w.x + w.w / 2 - 2, y: w.y + 20, w: 4, h: 4 } }; },
  });
})();
;
//#archivo js/explora-icf-ma-2.js
// Preicfes · Matemáticas, mundo 2 «Proporciones y Porcentajes» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos barras de puntos: a de un color y b de otro.
  const puntos = (v, K) => { const f = (n, y, cls) => Array.from({ length: Math.round(n) }, (_, i) => K.c(40 + (i % 10) * 28, y + Math.floor(i / 10) * 26, 10, cls)).join(''); return f(v.a, 44, 'fA') + f(v.b, 118, 'fG') + K.t(24, 22, `${Math.round(v.a)} ${v.ea || 'de jugo'}`, 's ta', 'start') + K.t(24, 96, `${Math.round(v.b)} ${v.eb || 'de agua'}`, 's tg', 'start'); };
  // Barra de total T partida en n partes; las primeras k en un color. `m` marca un valor.
  const barra = (v, K) => { const w = 300 / v.n; return Array.from({ length: v.n }, (_, i) => K.r(20 + i * w + 1, 60, w - 2, 42, i < v.k ? 'fA' : 'fa', 3)).join('') + K.f(v.u ?? 0, Array.from({ length: v.n }, (_, i) => K.t(20 + (i + 0.5) * w, 86, N(v.T / v.n), 's')).join('')) + K.t(170, 38, v.tit || '', 'tm') + K.t(170, 134, v.pie || '', 'ta'); };
  // Barra de precio: antes y ahora, a escala.
  const precio = (v, K) => [[v.a, 50, 'fa', 'antes'], [v.b, 110, 'fA', 'ahora']].map(([q, y, c, t]) => K.r(60, y, q * v.s, 36, c, 4) + K.t(54, y + 23, t, 's tm', 'end') + K.t(66 + q * v.s, y + 23, N(q), '', 'start')).join('') + K.t(170, 34, v.tit || '', 'ta');
  // Rectángulo a × b: el producto es el trabajo.
  const rect = (v, K) => { const u = 14; let h = K.r(60, 178 - v.b * u, v.a * u, v.b * u, 'fa', 2); for (let i = 1; i < v.a; i++) h += K.l(60 + i * u, 178 - v.b * u, 60 + i * u, 178, 'lr'); for (let j = 1; j < v.b; j++) h += K.l(60, 178 - j * u, 60 + v.a * u, 178 - j * u, 'lr'); return h + K.t(60 + v.a * u / 2, 196, `${N(v.a)} ${v.ea}`, 's') + K.t(52, 178 - v.b * u / 2 + 4, N(v.b), 's', 'end') + K.t(250, 30, v.tit || '', 'ta'); };
  // Camino con dos móviles.
  const via = (v, K) => K.l(30, 100, 310, 100, 'lm') + K.c(30 + v.x * 280, 100, 10, 'fA') + K.c(30 + v.y * 280, 100, 10, 'fG') + K.t(30, 130, v.i || '', 's tm', 'start') + K.t(310, 130, v.d || '', 's tm', 'end') + K.t(170, 50, v.tit || '', 'ta');

  xpLec('icf-ma-proporcion-1', [
    ['Comparar dividiendo',
      xpMira('dibujo', 'Empecemos por la idea: una **razón** compara cuántas veces, no cuánto más.', { dib: puntos, v: { a: 2, b: 3 }, alto: 170 }, [
        ['Dos de jugo por tres de agua.', {}, '$2 : 3$'],
        ['Si duplico las dos, sabe igual.', { a: 4, b: 6 }, '$4 : 6 = 2 : 3$'],
        ['Si triplico, también: cada 2 sigue teniendo sus 3.', { a: 6, b: 9 }, '$6 : 9 = 2 : 3$'],
        ['Pero si a 2 y 3 les sumo uno a cada lado…', { a: 3, b: 4 }, '$3 : 4 \\ne 2 : 3$'],
        ['…ya no sabe igual: la razón se conserva multiplicando.', {}],
      ], 'Una razón se conserva al multiplicar o dividir las dos cantidades.'),
      xpHaz('dibujo', 'Mueve el jugo hasta que sepa igual que $3 : 2$, con 8 de agua.', { dib: puntos, v: { a: 4, b: 8 }, metas: { a: 12 }, alto: 236, manijas: [{ k: 'a', min: 1, max: 20, paso: 1, et: 'de jugo' }], lee: v => `$${v.a} : 8$`, dice: v => `Por cada 2 de agua hay ${N(v.a / 4)} de jugo.` }, 'El agua es 4 veces 2; el jugo, 4 veces 3: 12.')],
    ['Partes iguales',
      xpMira('dibujo', 'Segunda idea: para repartir se cuentan **partes iguales**.', { dib: barra, v: { n: 8, k: 3, T: 56, u: 0, tit: 'repartir 56 en razón 3 : 5', pie: '' }, alto: 150 }, [
        ['Cincuenta y seis en razón 3 a 5.', {}],
        ['Son 8 partes iguales: 3 de uno y 5 del otro.', { pie: '3 + 5 = 8 partes' }],
        ['Cada parte vale 7.', { u: 1, pie: '56 ÷ 8 = 7' }, '$56 \\div 8 = 7$'],
        ['Tres partes son 21.', { pie: '3 · 7 = 21' }, '$3 \\cdot 7 = 21$'],
        ['Cinco partes son 35; juntas dan 56.', { pie: '5 · 7 = 35' }, '$21 + 35 = 56$'],
      ], 'Suma la razón, divide el total y multiplica por cada número.'),
      xpHaz('fichas', 'Reparte 60 en razón 1 : 4. Pon lo que vale una parte y las dos cantidades.', { slots: [{ x: 66, y: 46, w: 80, et: 'una parte' }, { x: 170, y: 46, w: 80, et: 'la menor' }, { x: 274, y: 46, w: 80, et: 'la mayor' }], fichas: ['12', '12', '48', '15', '45', '30'], meta: ['12', '12', '48'], alto: 96, pista: 'Son 5 partes iguales, no 4.' }, '$60 \\div 5 = 12$; una parte es 12 y cuatro, 48.')],
    ['La escala',
      xpMira('dibujo', 'Tercera idea: una **escala** dice cuánto agranda el mapa.', { dib: barra, v: { n: 4, k: 4, T: 4, u: 0, tit: 'escala 1 : 30 000', pie: '4 cm en el mapa' }, alto: 150 }, [
        ['Cada centímetro del mapa vale 30 000 de verdad.', {}],
        ['Treinta mil centímetros son 300 metros.', { pie: '1 cm → 300 m' }, '$30\\,000 \\div 100 = 300$'],
        ['Cuatro centímetros son 1 200 metros.', { pie: '4 cm → 1 200 m' }, '$4 \\cdot 300 = 1\\,200$'],
        ['Es decir, 1.2 kilómetros.', { pie: '1.2 km' }, '$1\\,200 \\div 1\\,000 = 1.2$'],
        ['Al revés, de la realidad al mapa, se divide.', { pie: '' }],
      ], 'Del mapa a la realidad se multiplica; de la realidad al mapa, se divide.'),
      xpHaz('fichas', 'Plano 1 : 50. Pon cuánto mide de verdad una mesa de 3 cm.', { slots: [{ x: 110, y: 46, w: 90, et: 'en cm' }, { x: 230, y: 46, w: 90, et: 'en m' }], fichas: ['150', '1.5', '53', '15', '0.15'], meta: ['150', '1.5'], alto: 96, pista: 'Multiplica por 50 y después divide entre 100.' }, '$3 \\cdot 50 = 150$ cm, que son 1.5 m.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Verde y blanco van en razón 2 : 7. Hay 21 de blanco. Pon el verde y el total.', { slots: [{ x: 110, y: 46, w: 90, et: 'verde' }, { x: 230, y: 46, w: 90, et: 'total' }], fichas: ['6', '27', '16', '37', '9'], meta: ['6', '27'], alto: 96, pista: '21 son 7 partes: halla cuánto vale una.' }, 'Cada parte vale 3: verde 6, total $9 \\cdot 3 = 27$.')],
  ], 'Razón: multiplica. Reparto: partes iguales. Escala: cuánto vale un centímetro.');

  xpLec('icf-ma-proporcion-2', [
    ['De cada cien',
      xpMira('dibujo', 'Empecemos por la idea: un **porcentaje** se arma con decenas.', { dib: barra, v: { n: 10, k: 0, T: 60, u: 0, tit: 'el 35 % de 60', pie: '' }, alto: 150 }, [
        ['La barra entera son 60, el 100 %.', {}],
        ['Partida en diez, cada parte es el 10 %: 6.', { u: 1, pie: '10 % = 6' }, '$60 \\div 10 = 6$'],
        ['Tres partes son el 30 %: 18.', { k: 3, pie: '30 % = 18' }, '$3 \\cdot 6 = 18$'],
        ['El 5 % es media parte: 3.', { pie: '5 % = 3' }, '$6 \\div 2 = 3$'],
        ['Juntas, el 35 % es 21.', { pie: '35 % = 21' }, '$18 + 3 = 21$'],
      ], 'Halla el 10 % y arma con él cualquier porcentaje.'),
      xpHaz('dibujo', 'Pinta las partes que forman el 70 % de 90.', { dib: (v, K) => barra({ n: 10, k: v.k, T: 90, u: 1, tit: '', pie: `${v.k * 9}` }, K), v: { k: 2 }, metas: { k: 7 }, alto: 200, manijas: [{ k: 'k', min: 0, max: 10, paso: 1, et: 'partes' }], lee: v => `$${v.k * 10}\\,\\% = ${v.k * 9}$`, dice: () => 'Cada parte es el 10 %.' }, 'Siete partes de 9 son 63.')],
    ['Del pedazo al total',
      xpMira('dibujo', 'Segunda idea: si conoces la **parte**, puedes hallar el todo.', { dib: barra, v: { n: 5, k: 1, T: 70, u: 0, tit: '14 son el 20 %', pie: '' }, alto: 150 }, [
        ['Catorce personas son el 20 % de un grupo.', {}],
        ['El 20 % es una de cinco partes iguales.', { pie: '20 % = una de cinco' }],
        ['Si una vale 14, las cinco valen 70.', { u: 1, k: 5, pie: '5 · 14 = 70' }, '$5 \\cdot 14 = 70$'],
        ['También: 14 dividido entre 0.20.', {}, '$14 \\div 0.2 = 70$'],
        ['Sacarle el 20 % a 14 sería ir al revés.', { k: 1 }],
      ], 'Parte ÷ porcentaje (en decimal) = total.'),
      xpHaz('fichas', 'Nueve son el 30 %. Pon cuánto es el 10 % y el total.', { slots: [{ x: 110, y: 46, w: 90, et: 'el 10 %' }, { x: 230, y: 46, w: 90, et: 'el total' }], fichas: ['3', '30', '2.7', '27', '39'], meta: ['3', '30'], alto: 96, pista: 'El 30 % son tres veces el 10 %.' }, 'El 10 % es 3 y el total, 30.')],
    ['Los cambios multiplican',
      xpMira('dibujo', 'Tercera idea: cada cambio es un **factor** y los factores se multiplican.', { dib: precio, v: { a: 100, b: 100, s: 1.5, tit: '' }, alto: 160 }, [
        ['Empecemos con algo que vale 100.', {}],
        ['Sube 20 %: se multiplica por 1.20.', { b: 120, tit: '× 1.20' }, '$100 \\cdot 1.2 = 120$'],
        ['Ahora baja 20 %: se multiplica por 0.80.', { a: 120, b: 96, tit: '× 0.80' }, '$120 \\cdot 0.8 = 96$'],
        ['No volvió a 100: el segundo 20 % es de 120.', { a: 100, b: 96, tit: '−4 %' }],
        ['Para deshacer un cambio se divide entre su factor.', { tit: '' }, '$120 \\div 1.2 = 100$'],
      ], 'Subir p %: por 1 + p. Bajar p %: por 1 − p. Para volver, divide.'),
      xpHaz('dibujo', 'Un precio de 80 **baja 25 %**. Lleva la barra de ahora.', { dib: (v, K) => precio({ a: 80, b: v.b, s: 2.4 }, K), v: { b: 80 }, metas: { b: 60 }, alto: 200, manijas: [{ k: 'b', min: 20, max: 100, paso: 5, et: 'ahora' }], lee: v => `$${v.b} \\div 80 = ${N(v.b / 80)}$`, dice: v => (v.b < 80 ? `Bajó ${80 - v.b} de 80.` : 'Todavía no baja.') }, '$80 \\cdot 0.75 = 60$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un artículo de 200 sube 10 % y luego baja 50 %. Pon los dos valores.', { slots: [{ x: 110, y: 46, w: 90, et: 'después de subir' }, { x: 230, y: 46, w: 90, et: 'al final' }], fichas: ['220', '110', '120', '210', '100'], meta: ['220', '110'], alto: 96, pista: 'El 50 % se quita del precio ya subido.' }, '$200 \\cdot 1.1 = 220$ y $220 \\cdot 0.5 = 110$.')],
  ], 'Decenas para armar, división para volver y factores para los cambios.');

  xpLec('icf-ma-proporcion-3', [
    ['Crecen juntas',
      xpMira('dibujo', 'Empecemos por la idea: en una **directa** lo que vale uno no cambia.', { dib: puntos, v: { a: 2, b: 6, ea: 'kilos', eb: 'mil pesos' }, alto: 190 }, [
        ['Dos kilos cuestan 6 mil.', {}],
        ['Un kilo vale 3 mil.', { a: 1, b: 3 }, '$6 \\div 2 = 3$'],
        ['Cuatro kilos: cuatro veces 3.', { a: 4, b: 12 }, '$4 \\cdot 3 = 12$'],
        ['Se duplicaron los kilos y se duplicó el precio.', { a: 5, b: 15 }],
        ['El cociente siempre es 3: directa.', {}, '$15 \\div 5 = 3$'],
      ], 'Directa: el cociente no cambia. Halla lo que vale uno.'),
      xpHaz('fichas', '3 boletas cuestan 24 mil. Pon lo que vale una y lo que valen 7.', { slots: [{ x: 110, y: 46, w: 90, et: 'una' }, { x: 230, y: 46, w: 90, et: 'siete' }], fichas: ['8', '56', '28', '21', '72'], meta: ['8', '56'], alto: 96, pista: 'Divide para hallar una y multiplica por 7.' }, '$24 \\div 3 = 8$ y $7 \\cdot 8 = 56$.')],
    ['Una sube y la otra baja',
      xpMira('dibujo', 'Segunda idea: en una **inversa** el producto no cambia.', { dib: rect, v: { a: 4, b: 6, ea: 'obreros', tit: '24 cuadros' }, alto: 205 }, [
        ['Cuatro obreros tardan seis días.', {}, '$4 \\cdot 6 = 24$'],
        ['Cada cuadro es el trabajo de uno en un día: 24.', {}],
        ['Con ocho obreros, el mismo trabajo queda más bajo.', { a: 8, b: 3 }, '$24 \\div 8 = 3$'],
        ['Con tres, más alto: ocho días.', { a: 3, b: 8 }, '$24 \\div 3 = 8$'],
        ['El área es la misma; por eso se multiplica y se divide.', {}],
      ], 'Inversa: el producto no cambia. Más obreros, menos días.'),
      xpHaz('dibujo', '6 obreros tardan 4 días. Mueve los días hasta que **3** obreros hagan el mismo trabajo.', { dib: (v, K) => rect({ a: 3, b: v.b, ea: 'obreros', tit: `${3 * v.b} cuadros` }, K), v: { b: 3 }, metas: { b: 8 }, alto: 260, manijas: [{ k: 'b', min: 1, max: 11, paso: 1, et: 'días' }], lee: v => `$3 \\cdot ${v.b} = ${3 * v.b}$`, dice: () => 'Deben quedar 24 cuadros.' }, '$24 \\div 3 = 8$ días.')],
    ['Lo que hace uno en una hora',
      xpMira('fichas', 'Tercera idea: con tres cantidades, baja a **una máquina en una hora**.', { slots: [{ x: 70, y: 50, w: 92, et: 'máquinas · horas' }, { x: 170, y: 50, w: 92, et: 'por máquina y hora' }, { x: 270, y: 50, w: 92, et: 'lo que se pide' }], fichas: ['6', '10', '80'], alto: 100 }, [
        ['Dos máquinas en tres horas hacen 60 piezas.', {}],
        ['Son 2 por 3: seis horas de máquina.', { pon: { 0: '6' } }, '$2 \\cdot 3 = 6$'],
        ['Cada hora de máquina da 10 piezas.', { pon: { 1: '10' } }, '$60 \\div 6 = 10$'],
        ['Cuatro máquinas en dos horas: ocho horas de máquina.', {}, '$4 \\cdot 2 = 8$'],
        ['A diez por hora, hacen 80 piezas.', { pon: { 2: '80' } }, '$8 \\cdot 10 = 80$'],
      ], 'Halla lo que hace una en una hora y multiplica por lo que tengas.'),
      xpHaz('fichas', '5 vacas en 2 días dan 100 litros. Pon lo de una vaca en un día y lo de 3 vacas en 4 días.', { slots: [{ x: 110, y: 46, w: 90, et: 'una, un día' }, { x: 230, y: 46, w: 90, et: '3 vacas, 4 días' }], fichas: ['10', '120', '20', '60', '40'], meta: ['10', '120'], alto: 96, pista: '100 litros entre 10 vacas·día.' }, '$100 \\div 10 = 10$ y $3 \\cdot 4 \\cdot 10 = 120$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '10 personas tienen agua para 9 días. Si son 15, pon las raciones y los días.', { slots: [{ x: 110, y: 46, w: 90, et: 'raciones' }, { x: 230, y: 46, w: 90, et: 'días' }], fichas: ['90', '6', '13.5', '150', '4'], meta: ['90', '6'], alto: 96, pista: 'Con más personas debe durar menos.' }, '$10 \\cdot 9 = 90$ y $90 \\div 15 = 6$.')],
  ], 'Directa: lo que vale uno. Inversa: el total que no cambia.');

  xpLec('icf-ma-proporcion-4', [
    ['Algo por cada uno',
      xpMira('fichas', 'Empecemos por la idea: una **tasa** es tanto por cada unidad.', { slots: [{ x: 110, y: 50, w: 120, et: 'paquete grande' }, { x: 240, y: 50, w: 120, et: 'paquete pequeño' }], fichas: ['20 por gramo', '24 por gramo'], alto: 100 }, [
        ['500 gramos cuestan 10 000 y 250 cuestan 6 000.', {}],
        ['El pequeño es más barato… ¿o no?', {}],
        ['El grande sale a 20 pesos por gramo.', { pon: { 0: '20 por gramo' } }, '$10\\,000 \\div 500 = 20$'],
        ['El pequeño, a 24.', { pon: { 1: '24 por gramo' } }, '$6\\,000 \\div 250 = 24$'],
        ['Se compara lo que vale una unidad.', { marca: [0] }],
      ], 'Para comparar, halla cuánto corresponde a una sola unidad.'),
      xpHaz('fichas', '40 dólares son 160 000 pesos. Pon cuánto vale un dólar y cuántos pesos son 15.', { slots: [{ x: 110, y: 46, w: 90, et: 'un dólar' }, { x: 230, y: 46, w: 90, et: '15 dólares' }], fichas: ['4 000', '60 000', '400', '6 000', '160 015'], meta: ['4 000', '60 000'], alto: 96, pista: 'Divide 160 000 entre 40.' }, '$160\\,000 \\div 40 = 4\\,000$ y $15 \\cdot 4\\,000 = 60\\,000$.')],
    ['Distancia, velocidad y tiempo',
      xpMira('dibujo', 'Segunda idea: la **velocidad** es kilómetros por cada hora.', { dib: via, v: { x: 0, y: 0, i: 'salida', d: '120 km', tit: '' }, alto: 150 }, [
        ['Un carro va a 60 kilómetros por hora.', { tit: '60 km/h' }],
        ['En una hora avanza 60: la mitad del camino.', { x: 0.5, tit: '1 h → 60 km' }],
        ['En dos horas, 120.', { x: 1, tit: '2 h → 120 km' }, '$60 \\cdot 2 = 120$'],
        ['Media hora es 0.5 de hora, no 0.30.', { x: 0.25, tit: '0.5 h → 30 km' }, '$60 \\cdot 0.5 = 30$'],
        ['Para el tiempo se divide: distancia entre velocidad.', {}, '$90 \\div 60 = 1.5$'],
      ], 'd = v · t; los minutos se pasan a fracción de hora.'),
      xpHaz('fichas', 'Un bus recorre 100 km a 80 km/h. Pon el tiempo en horas y los minutos de más.', { slots: [{ x: 110, y: 46, w: 90, et: 'horas' }, { x: 230, y: 46, w: 90, et: 'minutos de más' }], fichas: ['1.25', '15', '25', '0.8', '20'], meta: ['1.25', '15'], alto: 96, pista: 'La cuarta parte de una hora no son 25 minutos.' }, '$100 \\div 80 = 1.25$: una hora y 15 minutos.')],
    ['Juntos o detrás',
      xpMira('dibujo', 'Tercera idea: de frente las velocidades **se suman**; detrás, **se restan**.', { dib: via, v: { x: 0, y: 1, i: '50 km/h', d: '30 km/h', tit: '160 km los separan' }, alto: 150 }, [
        ['Dos carros salen uno hacia el otro.', {}],
        ['En una hora se acercan 80 kilómetros.', { x: 0.3125, y: 0.8125, tit: 'quedan 80 km' }, '$50 + 30 = 80$'],
        ['En dos horas se encuentran.', { x: 0.625, y: 0.625, tit: '160 ÷ 80 = 2 h' }, '$160 \\div 80 = 2$'],
        ['Si uno persigue al otro, solo cuenta la diferencia.', { x: 0, y: 0.25, i: '50 km/h', d: 'el otro va a 30 km/h', tit: '40 km de ventaja' }],
        ['Cada hora descuenta 20: lo alcanza en dos.', { x: 0.625, y: 0.625, tit: '40 ÷ 20 = 2 h' }, '$40 \\div 20 = 2$'],
      ], 'De frente: distancia ÷ suma. Detrás: ventaja ÷ diferencia.'),
      xpHaz('fichas', 'Uno va a 40 y otro lo sigue a 65; la ventaja es 75 km. Pon cuánto descuenta por hora y en cuántas lo alcanza.', { slots: [{ x: 110, y: 46, w: 90, et: 'por hora' }, { x: 230, y: 46, w: 90, et: 'horas' }], fichas: ['25', '3', '105', '2', '5'], meta: ['25', '3'], alto: 96, pista: 'Van en el mismo sentido: resta las velocidades.' }, '$65 - 40 = 25$ y $75 \\div 25 = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ida: 60 km a 20 km/h. Vuelta: 60 km a 60 km/h. Pon las horas en total y la velocidad media.', { slots: [{ x: 110, y: 46, w: 90, et: 'horas' }, { x: 230, y: 46, w: 90, et: 'media (km/h)' }], fichas: ['4', '30', '40', '3', '80'], meta: ['4', '30'], alto: 96, pista: 'Son 120 km; no promedies 20 y 60.' }, '$3 + 1 = 4$ horas y $120 \\div 4 = 30$ km/h.')],
  ], 'Una unidad para comparar, d = v · t y suma o resta según el sentido.');
}
;
//#archivo js/explora-icf-ma-3.js
// Preicfes · Matemáticas, mundo 3 «Conteo y Probabilidad» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  // Árbol de a ramas y, en cada una, b: se ve la primera o las dos partes.
  const arbol = (v, K) => {
    let h = ''; const a = Math.round(v.a), b = Math.round(v.b), n = a * b, Y = k => 24 + (k + 0.5) * 160 / n;
    for (let i = 0; i < a; i++) { const y = Y(i * b + (b - 1) / 2); h += K.l(40, 104, 140, y, 'lg gr') + K.c(140, y, 6, 'fA'); for (let j = 0; j < b; j++) h += K.f(v.f, K.l(140, y, 260, Y(i * b + j), 'lm') + K.c(260, Y(i * b + j), 5, 'fG')); }
    return h + K.c(40, 104, 7, 'fF') + K.f(v.f, K.t(300, 108, n, 'b tg')) + K.t(170, 204, v.t || '', 's ta');
  };
  // Dos círculos que se cruzan: solo a, los dos, solo b.
  const venn = (v, K) => K.c(140, 100, 70, 'fa') + K.c(210, 100, 70, 'fg') + K.t(105, 106, v.a, 'b') + K.t(245, 106, v.b, 'b') + K.f(v.f, K.t(175, 106, v.m, 'b tf')) + K.t(170, 196, v.t || '', 's ta');
  // Bolsa: k de un color entre n; las primeras se marcan.
  const bolsa = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => K.c(58 + (i % 8) * 32, 60 + Math.floor(i / 8) * 36, 12, i < Math.round(v.k) ? 'fA' : 'fG')).join('') + K.t(170, 160, v.t || '', 'ta');
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 80, et: e }));

  xpLec('icf-ma-azar-1', [
    ['Y multiplica',
      xpMira('dibujo', 'Empecemos por la idea: si haces una cosa **y además** otra, los casos se multiplican.', { dib: arbol, v: { a: 2, b: 3, f: 0, t: '' }, alto: 212 }, [
        ['Dos camisas: dos ramas.', {}],
        ['Con cada camisa van tres pantalones.', { f: 1 }],
        ['Son seis pintas: cada rama se abre en tres.', { t: '2 · 3 = 6' }, '$2 \\cdot 3 = 6$'],
        ['Con tres camisas habría nueve.', { a: 3, t: '3 · 3 = 9' }, '$3 \\cdot 3 = 9$'],
        ['No se suma: cada una va con cada una.', {}],
      ], 'Una cosa y además otra: se multiplica.'),
      xpHaz('dibujo', 'Hay 3 sopas. Mueve los jugos hasta que haya **15** almuerzos de sopa y jugo.', { dib: (v, K) => arbol({ a: 3, b: v.b, f: 1 }, K), v: { b: 2 }, metas: { b: 5 }, alto: 260, manijas: [{ k: 'b', min: 1, max: 7, paso: 1, et: 'jugos' }], lee: v => `$3 \\cdot ${v.b} = ${3 * v.b}$`, dice: () => 'Cada sopa va con cada jugo.' }, '$3 \\cdot 5 = 15$.')],
    ['O suma',
      xpMira('fichas', 'Segunda idea: si escoges **una sola** cosa, los casos se suman.', { slots: fila('y', 'o'), fichas: ['20', '9'], alto: 96 }, [
        ['Hay 4 buses y 5 trenes.', {}],
        ['Ir en bus y volver en tren: dos decisiones.', { pon: { 0: '20' } }, '$4 \\cdot 5 = 20$'],
        ['Ir en bus o en tren: una sola decisión.', { pon: { 1: '9' } }, '$4 + 5 = 9$'],
        ['Pregúntate si al final tienes una cosa o dos.', { marca: [0, 1] }],
        ['Y multiplica; o, escogiendo una sola, suma.', { marca: [] }],
      ], 'Dos decisiones se multiplican; una sola elección entre grupos se suma.'),
      xpHaz('fichas', '6 libros y 3 revistas. Pon cuántas maneras hay de llevar un libro **y** una revista, y de llevar **una sola** cosa.', { slots: fila('libro y revista', 'una sola'), fichas: ['18', '9', '63', '3', '36'], meta: ['18', '9'], alto: 96, pista: 'La primera son dos decisiones; la segunda, una.' }, '$6 \\cdot 3 = 18$ y $6 + 3 = 9$.')],
    ['Lo que se cuenta dos veces',
      xpMira('dibujo', 'Tercera idea: lo que está en **los dos** grupos se cuenta una sola vez.', { dib: venn, v: { a: 12, b: 8, m: 4, f: 0, t: '' }, alto: 204 }, [
        ['A nadar van 16 y a correr 12.', { t: '16 nadan · 12 corren' }],
        ['Pero 4 hacen las dos cosas: están en el centro.', { f: 1 }],
        ['Solo nadan 12 y solo corren 8.', {}, '$16 - 4 = 12 \\quad 12 - 4 = 8$'],
        ['Si sumas 16 y 12, los 4 entran dos veces.', { t: '16 + 12 = 28' }, '$16 + 12 = 28$'],
        ['Por eso se quitan una vez: son 24.', { t: '28 − 4 = 24' }, '$28 - 4 = 24$'],
      ], 'Alguno = suma de los dos grupos − los que están en ambos.'),
      xpHaz('fichas', '10 cantan, 7 bailan y 3 hacen las dos. Pon cuántos solo cantan y cuántos hacen alguna.', { slots: fila('solo cantan', 'alguna'), fichas: ['7', '14', '17', '13', '20'], meta: ['7', '14'], alto: 96, pista: 'Quita los 3 a los que cantan; y a la suma, una sola vez.' }, '$10 - 3 = 7$ y $10 + 7 - 3 = 14$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una clave lleva una vocal y luego dos dígitos que pueden repetirse. Pon las opciones de cada casilla y el total.', { slots: fila('vocal', 'dígito', 'dígito', 'total').map(s => ({ ...s, w: 62 })), fichas: ['5', '10', '10', '500', '9', '450', '25'], meta: ['5', '10', '10', '500'], alto: 96, pista: 'Los dígitos se pueden repetir: no se pierde ninguno.' }, '$5 \\cdot 10 \\cdot 10 = 500$.')],
  ], 'Y multiplica, o suma, y lo repetido se quita una vez.');

  xpLec('icf-ma-azar-2', [
    ['¿Importa el orden?',
      xpMira('hoja', 'Empecemos por la idea: cambia dos de lugar y mira si el resultado **es otro**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Oro y plata entre atletas'], ['Dos sabores en un vaso'], ['Una clave de tres cifras'], ['Un equipo de cuatro']] }, [
        ['Si cambias oro y plata, gana otro: importa.', { luz: [0], nota: { 0: 'con orden' } }],
        ['Mango y mora o mora y mango: el mismo vaso.', { luz: [1], nota: { 1: 'sin orden' } }],
        ['123 no abre lo que abre 321.', { luz: [2], nota: { 2: 'con orden' } }],
        ['El equipo es el mismo aunque los nombres estén al revés.', { luz: [3], nota: { 3: 'sin orden' } }],
        ['Con orden es permutación; sin orden, combinación.', {}],
      ], 'Cambia el orden: si sale otra cosa, importa.'),
      xpHaz('hoja', 'Subraya los **dos** casos en que el orden **no** importa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Escoger tres cartas para quedarse'], ['Presidenta y secretaria'], ['Dos amigos para ir al cine'], ['Las letras de una placa']], pista: 'En alguno, cambiar de lugar cambia el resultado.' }, 'Las cartas y los amigos son los mismos.')],
    ['Con orden',
      xpMira('fichas', 'Segunda idea: con orden, cada puesto **gasta** una opción.', { slots: fila('1.º', '2.º', '3.º', 'total').map(s => ({ ...s, w: 62 })), fichas: ['7', '6', '5', '210'], alto: 96 }, [
        ['Siete corredoras y tres medallas.', {}],
        ['Para el oro hay siete.', { pon: { 0: '7' } }],
        ['Para la plata quedan seis.', { pon: { 1: '6' } }],
        ['Para el bronce, cinco.', { pon: { 2: '5' } }],
        ['Se multiplican: 210 podios.', { pon: { 3: '210' } }, '$7 \\cdot 6 \\cdot 5 = 210$'],
      ], 'Con orden: n por (n − 1) por… tantas veces como puestos.'),
      xpHaz('fichas', '9 personas, capitán y portero. Pon las opciones de cada puesto y el total.', { slots: fila('capitán', 'portero', 'total'), fichas: ['9', '8', '72', '81', '36', '17'], meta: ['9', '8', '72'], alto: 96, pista: 'Quien es capitán ya no puede ser portero.' }, '$9 \\cdot 8 = 72$.')],
    ['Sin orden se divide',
      xpMira('hoja', 'Tercera idea: sin orden, cada grupo se contó **varias veces**.', { paras: [['ABC', 'ACB', 'BAC'], ['BCA', 'CAB', 'CBA']] }, [
        ['Escoge a Ana, Beto y Caro.', { luz: [0] }],
        ['Contando con orden aparecen seis veces.', { luz: [0, 1, 2, 3, 4, 5] }, '$3 \\cdot 2 \\cdot 1 = 6$'],
        ['Pero es el mismo grupo.', { nota: { 0: 'el mismo', 1: 'el mismo' } }],
        ['Con 7 personas: 210 con orden, entre 6.', {}, '$210 \\div 6 = 35$'],
        ['Y escoger 5 de 7 es lo mismo que dejar 2.', {}, '$\\tfrac{7 \\cdot 6}{2} = 21$'],
      ], 'Sin orden: cuenta con orden y divide entre los órdenes del grupo.'),
      xpHaz('fichas', 'De 6 personas se escogen 2 sin orden. Pon las parejas con orden y sin orden.', { slots: fila('con orden', 'sin orden'), fichas: ['30', '15', '12', '36', '60'], meta: ['30', '15'], alto: 96, pista: 'Cada pareja salió dos veces.' }, '$6 \\cdot 5 = 30$ y $30 \\div 2 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '4 médicas y 3 enfermeros; se escogen 2 médicas y 1 enfermero. Pon cada elección y el total.', { slots: fila('médicas', 'enfermero', 'total'), fichas: ['6', '3', '18', '12', '9', '35'], meta: ['6', '3', '18'], alto: 96, pista: 'Las médicas van sin orden: 4 por 3 entre 2.' }, '$6 \\cdot 3 = 18$.')],
  ], 'Orden, puestos y división: esas tres preguntas bastan.');

  xpLec('icf-ma-azar-3', [
    ['Favorables entre posibles',
      xpMira('dibujo', 'Empecemos por la idea: la probabilidad es **qué parte** de los casos sirve.', { dib: bolsa, v: { n: 8, k: 2, t: '' }, alto: 176 }, [
        ['Ocho bolas; dos de un color.', {}],
        ['Sirven dos de ocho: un cuarto.', { t: '2 de 8' }, '$\\tfrac28 = \\tfrac14$'],
        ['Con cuatro de ocho, la mitad.', { k: 4, t: '4 de 8' }, '$\\tfrac48 = \\tfrac12$'],
        ['Cuatro de dieciséis: otra vez un cuarto.', { n: 16, t: '4 de 16' }, '$\\tfrac{4}{16} = \\tfrac14$'],
        ['Más favorables no es más probable: mira el total.', {}],
      ], 'Favorables entre posibles; y se compara la parte, no la cantidad.'),
      xpHaz('dibujo', 'Hay 12 bolas. Mueve las del color hasta que su probabilidad sea $\\tfrac13$.', { dib: (v, K) => bolsa({ n: 12, k: v.k }, K), v: { k: 1 }, metas: { k: 4 }, alto: 220, manijas: [{ k: 'k', min: 0, max: 12, paso: 1, et: 'del color' }], lee: v => `$\\tfrac{${v.k}}{12}$`, dice: () => 'Un tercio de doce.' }, '$\\tfrac{4}{12} = \\tfrac13$.')],
    ['De 0 a 1',
      xpMira('fichas', 'Segunda idea: va de **0** (imposible) a **1** (seguro).', { slots: fila('un 7', 'un 3', 'par', 'menos de 7').map(s => ({ ...s, w: 64 })), fichas: ['0', '1/6', '1/2', '1'], alto: 96 }, [
        ['Un dado de seis caras.', {}],
        ['Que salga 7 es imposible.', { pon: { 0: '0' } }],
        ['Que salga 3: una de seis.', { pon: { 1: '1/6' } }],
        ['Que salga par: tres de seis.', { pon: { 2: '1/2' } }],
        ['Menor que 7: siempre.', { pon: { 3: '1' } }],
      ], 'Nunca es negativa ni pasa de 1.'),
      xpHaz('fichas', 'Una tarjeta del 1 al 5. Pon la probabilidad de que sea mayor que 3 y de que sea mayor que 5.', { slots: fila('mayor que 3', 'mayor que 5'), fichas: ['2/5', '0', '3/5', '1', '5/2'], meta: ['2/5', '0'], alto: 96, pista: 'Cuenta las que sirven: el 3 no es mayor que 3.' }, 'Sirven el 4 y el 5; mayor que 5 no hay.')],
    ['Lo contrario y dos dados',
      xpMira('hoja', 'Tercera idea: lo que pasa y lo que no **completan 1**; con dos dados se cuentan **parejas**.', { letras: ['1', '2', '3'], paras: [['Llueve: 30 %'], ['Suman 3: (1, 2) y (2, 1)'], ['Suman 2: (1, 1)']] }, [
        ['Si llueve con 30 %, no llueve con 70 %.', { luz: [0], nota: { 0: 'el resto: 70 %' } }],
        ['Dos dados: 36 parejas ordenadas.', {}, '$6 \\cdot 6 = 36$'],
        ['La suma 3 sale de dos parejas.', { luz: [1], nota: { 1: '2/36' } }],
        ['La suma 2, de una sola.', { luz: [2], nota: { 2: '1/36' } }],
        ['Por eso no todas las sumas son igual de fáciles.', { luz: [1, 2] }],
      ], 'Contrario: 1 menos. Dos dados: 36 parejas ordenadas.'),
      xpHaz('fichas', 'Pon en cuántas parejas la suma es 4 y la probabilidad de que **no** sea 4.', { slots: fila('parejas', 'no es 4'), fichas: ['3', '33/36', '2', '3/36', '1/11'], meta: ['3', '33/36'], alto: 96, pista: 'Busca las parejas ordenadas, como (1, 3), y réstalas de 36.' }, 'Tres parejas; las otras 33 no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Urna A: 3 rojas de 6. Urna B: 4 rojas de 10. Pon la probabilidad de roja en cada una.', { slots: fila('urna A', 'urna B'), fichas: ['1/2', '2/5', '3/4', '1/3', '4/6'], meta: ['1/2', '2/5'], alto: 96, pista: 'Divide entre todas las bolas de su urna.' }, 'B tiene más rojas, pero A es más probable.')],
  ], 'Parte del total, entre 0 y 1, y lo contrario completa.');

  xpLec('icf-ma-azar-4', [
    ['¿Sobre quiénes?',
      xpMira('hoja', 'Empecemos por la idea: la pregunta dice **entre quiénes** se escoge.', { paras: [['Mujeres: 10', 'con gafas 4'], ['Hombres: 10', 'con gafas 2'], ['Todos: 20', 'con gafas 6']] }, [
        ['Entre todos, la de una mujer es 10 de 20.', { luz: [0, 4] }, '$\\tfrac{10}{20}$'],
        ['Entre todos, con gafas: 6 de 20.', { luz: [4, 5] }, '$\\tfrac{6}{20}$'],
        ['Entre las mujeres, con gafas: 4 de 10.', { luz: [0, 1], nota: { 0: 'ahora son 10' } }, '$\\tfrac{4}{10}$'],
        ['Entre los de gafas, mujer: 4 de 6.', { luz: [1, 5], nota: { 2: 'ahora son 6' } }, '$\\tfrac46$'],
        ['El mismo 4, sobre totales distintos.', { luz: [1] }],
      ], 'Primero di entre quiénes se escoge: ese es el total.'),
      xpHaz('fichas', 'De 30 trabajan 12 de noche; de esos, 3 en moto. Pon la de moto **entre los de la noche** y la de noche **entre todos**.', { slots: fila('moto | noche', 'noche'), fichas: ['1/4', '2/5', '1/10', '3/30', '12/3'], meta: ['1/4', '2/5'], alto: 96, pista: 'La primera se divide entre 12.' }, '$\\tfrac{3}{12} = \\tfrac14$ y $\\tfrac{12}{30} = \\tfrac25$.')],
    ['Con o sin devolver',
      xpMira('dibujo', 'Segunda idea: si no se devuelve, la **segunda vez** cambia.', { dib: bolsa, v: { n: 5, k: 3, t: '' }, alto: 176 }, [
        ['Tres naranjas de cinco.', { t: '3/5' }],
        ['Saco una y la devuelvo: sigue igual.', { t: 'otra vez 3/5' }, '$\\tfrac35 \\cdot \\tfrac35$'],
        ['Saco una naranja y la guardo.', { n: 4, k: 2, t: 'quedan 2 de 4' }],
        ['Ahora la segunda es 2 de 4.', {}, '$\\tfrac35 \\cdot \\tfrac24$'],
        ['Cambian los dos números: las que sirven y el total.', {}],
      ], 'Sin devolver hay una menos en el total, y quizá una menos que sirve.'),
      xpHaz('fichas', '4 rojas y 4 blancas. Sale una roja y **no** se devuelve. Pon la probabilidad de otra roja y de blanca.', { slots: fila('otra roja', 'blanca'), fichas: ['3/7', '4/7', '4/8', '3/8', '1/2'], meta: ['3/7', '4/7'], alto: 96, pista: 'Quedan 7 bolas.' }, 'Quedan 3 rojas y 4 blancas de 7.')],
    ['Al menos uno',
      xpMira('fichas', 'Tercera idea: «al menos uno» es **todo menos ninguno**.', { slots: fila('falla 1.º', 'falla 2.º', 'ambos', 'alguno').map(s => ({ ...s, w: 66 })), fichas: ['1/2', '3/4', '3/8', '5/8'], alto: 96 }, [
        ['Uno acierta con un medio y otro con un cuarto.', {}],
        ['Fallan con un medio y tres cuartos.', { pon: { 0: '1/2', 1: '3/4' } }],
        ['Que fallen los dos: se multiplica.', { pon: { 2: '3/8' } }, '$\\tfrac12 \\cdot \\tfrac34 = \\tfrac38$'],
        ['Lo demás es que acierte alguno.', { pon: { 3: '5/8' } }, '$1 - \\tfrac38 = \\tfrac58$'],
        ['Sumar los aciertos contaría dos veces cuando aciertan ambos.', {}],
      ], 'Alguno = 1 − ninguno.'),
      xpHaz('fichas', 'Dos focos fallan con 1/3 cada uno, sin afectarse. Pon la de que fallen ambos y la de que alguno sirva.', { slots: fila('fallan ambos', 'alguno sirve'), fichas: ['1/9', '8/9', '2/3', '4/9', '1/6'], meta: ['1/9', '8/9'], alto: 96, pista: 'Multiplica los fallos y réstalo de 1.' }, '$\\tfrac13 \\cdot \\tfrac13 = \\tfrac19$ y $1 - \\tfrac19$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '2 verdes y 4 azules; se sacan dos **sin devolver**. Pon la de azul primero y la de dos azules.', { slots: fila('1.ª azul', 'dos azules'), fichas: ['2/3', '2/5', '4/9', '3/5', '7/6'], meta: ['2/3', '2/5'], alto: 96, pista: 'Después de una azul quedan cinco bolas: ¿cuántas son azules?' }, '$\\tfrac46 \\cdot \\tfrac35 = \\tfrac25$.')],
  ], 'Entre quiénes, qué queda y todo menos ninguno.');
}
;
//#archivo js/explora-icf-ma-4.js
// Preicfes · Matemáticas, mundo 4 «Áreas y Volúmenes» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rectángulo de b × h en cuadros de 20, con su triángulo (f) y la punta en x.
  const rect = (v, K) => { const u = 18, x0 = 60, y0 = 160, b = v.b * u, h = v.h * u; let s = K.r(x0, y0 - h, b, h, 'fn', 2);
    for (let i = 1; i < v.b - 0.01; i++) s += K.l(x0 + i * u, y0 - h, x0 + i * u, y0, 'ls'); for (let j = 1; j < v.h - 0.01; j++) s += K.l(x0, y0 - j * u, x0 + b, y0 - j * u, 'ls');
    return s + K.f(v.f, K.p([[x0, y0], [x0 + b, y0], [x0 + v.x * u, y0 - h]], 'fa')) + K.t(x0 + b / 2, 182, Math.round(v.b), 's tm') + K.t(x0 - 14, y0 - h / 2, Math.round(v.h), 's tm') + K.t(190, 16, v.t || '', 'ta'); };
  // Trapecio de bases B y b y el rectángulo del promedio (f).
  const trap = (v, K) => { const u = 16, c = 170, B = v.B * u / 2, b = v.k * u / 2, m = (v.B + v.k) * u / 4; return K.p([[c - B, 150], [c + B, 150], [c + b, 70], [c - b, 70]], 'fa') + K.f(v.f, K.r(c - m, 70, 2 * m, 80, 'fg', 0)) + K.t(c, 168, Math.round(v.B), 's tm') + K.t(c, 60, Math.round(v.k), 's tm') + K.t(c, 24, v.t || '', 'ta'); };
  // Círculo de radio r (u = 12) con sector a grados.
  const circ = (v, K) => K.c(170, 92, v.r * 12, 'fn') + K.sec(170, 92, v.r * 12, 0, v.a, 'fa') + K.c(170, 92, v.q * 12, 'fF') + K.l(170, 92, 170 + v.r * 12, 92, 'lg') + K.t(170 + v.r * 6, 84, `r = ${Math.round(v.r)}`, 's') + K.t(170, 186, v.t || '', 'ta');
  // Figura compuesta: casa.
  const casa = (v, K) => K.r(110, 90, 120, 70, 'fa', 0) + K.p([[110, 90], [230, 90], [170, 90 - v.t0]], 'fg') + K.f(v.f, K.r(110, 30, 120, 130, '', 0) + K.p([[110, 30], [170, 30], [110, 90]], 'fF') + K.p([[230, 30], [170, 30], [230, 90]], 'fF')) + K.t(170, 182, v.t || '', 'ta');
  const pila = (v, K) => K.caja([170, 170], 20, 4, 3, v.c, 'fa') + K.t(60, 40, v.t || '', 'ta', 'start');
  // Cilindro y cono de igual base; n: tercios llenos.
  const cono = (v, K) => K.p([[60, 40], [140, 40], [100, 160]], 'fg') + K.r(200, 40, 80, 120, 'fn', 4) + K.r(200, 160 - v.n * 40, 80, v.n * 40, 'fa', 2) + K.t(100, 180, 'cono', 's tm') + K.t(240, 180, 'cilindro', 's tm') + K.t(170, 20, v.t || '', 'ta');

  xpLec('icf-ma-medida-1', [
    ['Borde y superficie',
      xpMira('dibujo', 'Empecemos por la idea: **rodear** no es lo mismo que **cubrir**.', { dib: rect, v: { b: 8, h: 5, f: 0, x: 4, t: '' }, alto: 196 }, [
        ['Cubrir: ocho cuadros por fila, cinco filas.', { t: 'área: 40' }, '$8 \\cdot 5 = 40$'],
        ['Rodear: se suman los cuatro lados.', { t: 'perímetro: 26' }, '$2 \\cdot (8 + 5) = 26$'],
        ['Con el mismo borde, otro rectángulo: 10 por 3.', { b: 10, h: 3, t: 'perímetro: 26' }],
        ['Y su área es otra, aunque el borde no cambió.', { t: 'área: 30' }, '$10 \\cdot 3 = 30$'],
        ['El borde no decide la superficie.', {}],
      ], 'Perímetro: se rodea, en metros. Área: se cubre, en metros cuadrados.'),
      xpHaz('fichas', 'Una cancha mide 12 m por 7 m. Pon su borde y su superficie.', { slots: fila('borde (m)', 'superficie (m²)'), fichas: ['38', '84', '19', '48', '24'], meta: ['38', '84'], alto: 96, pista: 'El borde suma los cuatro lados; la superficie multiplica.' }, '$2 \\cdot 19 = 38$ y $12 \\cdot 7 = 84$.')],
    ['Medio rectángulo',
      xpMira('dibujo', 'Segunda idea: el triángulo es **la mitad** de su rectángulo.', { dib: rect, v: { b: 8, h: 6, f: 0, x: 3, t: '' }, alto: 196 }, [
        ['El rectángulo tiene 48 cuadros.', { t: '48' }],
        ['El triángulo ocupa la mitad: 24.', { f: 1, t: '24' }, '$\\tfrac{8 \\cdot 6}{2} = 24$'],
        ['Si la punta se corre a un lado, sigue valiendo 24.', { x: 7 }],
        ['Solo importan la base y la altura.', { x: 1 }],
        ['La altura va derecha, nunca por el lado inclinado.', {}],
      ], 'Triángulo: base por altura entre 2.'),
      xpHaz('dibujo', 'La base mide 10. Mueve la altura hasta que el triángulo tenga área **25**.', { dib: (v, K) => rect({ b: 10, h: v.h, f: 1, x: 4 }, K), v: { h: 2 }, metas: { h: 5 }, alto: 250, manijas: [{ k: 'h', min: 1, max: 7, paso: 1, et: 'altura' }], lee: v => `$10 \\cdot ${v.h} \\div 2 = ${5 * v.h}$`, dice: () => 'Es la mitad del rectángulo.' }, '$10 \\cdot 5 \\div 2 = 25$.')],
    ['El promedio de las bases',
      xpMira('dibujo', 'Tercera idea: un trapecio vale lo mismo que un rectángulo con el **promedio** de sus bases.', { dib: trap, v: { B: 14, k: 6, f: 0, t: '' }, alto: 180 }, [
        ['Una base mide 14 y la otra, 6.', {}],
        ['A mitad de camino está el 10.', { t: 'promedio: 10' }, '$(14 + 6) \\div 2 = 10$'],
        ['Las puntas que sobran llenan los huecos.', { f: 1 }],
        ['Con altura 5, el área es 50.', { t: 'área: 50' }, '$10 \\cdot 5 = 50$'],
        ['Y un rombo: la mitad del rectángulo de sus diagonales.', {}],
      ], 'Trapecio: promedio de bases por altura. Rombo: diagonales entre 2.'),
      xpHaz('fichas', 'Un trapecio tiene bases 11 y 5 y altura 4. Pon el promedio de las bases y el área.', { slots: fila('promedio', 'área'), fichas: ['8', '32', '16', '64', '220'], meta: ['8', '32'], alto: 96, pista: 'Suma las bases, parte en dos y multiplica por la altura.' }, '$(11 + 5) \\div 2 = 8$ y $8 \\cdot 4 = 32$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A un cuadrado de lado 3 se le triplican los lados. Pon por cuánto se multiplican su borde y su área.', { slots: fila('borde', 'área'), fichas: ['3', '9', '6', '27', '12'], meta: ['3', '9'], alto: 96, pista: 'Calcula el borde y el área antes y después.' }, 'Borde: 12 a 36, por 3. Área: 9 a 81, por 9.')],
  ], 'Rodear suma lados; cubrir cuenta cuadros; y si los lados crecen, el área crece más.');

  xpLec('icf-ma-medida-2', [
    ['El círculo',
      xpMira('dibujo', 'Empecemos por la idea: el borde mide $2\\pi r$ y la superficie, $\\pi r^2$.', { dib: circ, v: { r: 3, a: 0, q: 0, t: '' }, alto: 200 }, [
        ['Radio 3: el borde mide seis veces π.', { t: 'borde: 6π' }, '$2 \\cdot 3 = 6$'],
        ['La superficie mide nueve veces π.', { a: 360, t: 'área: 9π' }, '$3 \\cdot 3 = 9$'],
        ['Con radio 6, el borde se duplica.', { r: 6, t: 'borde: 12π' }, '$2 \\cdot 6 = 12$'],
        ['Pero la superficie se hace cuatro veces mayor.', { t: 'área: 36π' }, '$6 \\cdot 6 = 36$'],
        ['Una rueda que da una vuelta avanza su borde.', { t: '1 vuelta = 12π' }],
      ], 'Borde 2πr, superficie πr². Una vuelta avanza el borde.'),
      xpHaz('fichas', 'Un disco tiene **diámetro** 10. Pon su borde y su superficie, contados en π.', { slots: fila('borde', 'superficie'), fichas: ['10', '25', '20', '100', '5'], meta: ['10', '25'], alto: 96, pista: 'El radio es la mitad del diámetro.' }, 'Radio 5: borde $10\\pi$ y superficie $25\\pi$.')],
    ['Partes y anillos',
      xpMira('dibujo', 'Segunda idea: un sector es **una fracción**; un anillo, **una resta**.', { dib: circ, v: { r: 6, a: 90, q: 0, t: '' }, alto: 200 }, [
        ['Noventa grados son un cuarto de la vuelta.', { t: '90 de 360 = un cuarto' }, '$90 \\div 360 = \\tfrac14$'],
        ['Un cuarto de 36π son 9π.', { t: '9π' }, '$36 \\div 4 = 9$'],
        ['Con 180 grados es la mitad: 18π.', { a: 180, t: '18π' }],
        ['Ahora un anillo: se quita un círculo de radio 3.', { a: 360, q: 3, t: '36π − 9π' }, '$36 - 9 = 27$'],
        ['Se restan las superficies, nunca los radios.', { t: '27π' }],
      ], 'Sector: fracción del círculo. Anillo: afuera menos adentro.'),
      xpHaz('dibujo', 'El círculo mide $36\\pi$. Abre el sector hasta que mida **15π**.', { dib: (v, K) => circ({ r: 6, a: v.a, q: 0 }, K), v: { a: 60 }, metas: { a: 150 }, alto: 260, manijas: [{ k: 'a', min: 30, max: 330, paso: 30, et: 'grados' }], lee: v => `$36 \\cdot ${v.a} \\div 360 = ${v.a / 10}$`, dice: () => '¿Qué fracción del círculo es?' }, '15 de 36 son cinco de cada doce partes: 150°.')],
    ['Sumar piezas o quitar sobras',
      xpMira('dibujo', 'Tercera idea: una figura rara se **corta** en piezas o se **completa**.', { dib: casa, v: { t0: 60, f: 0, t: '' }, alto: 200 }, [
        ['La pared mide 12 por 7: son 84.', { t: 'pared: 84' }, '$12 \\cdot 7 = 84$'],
        ['El techo es un triángulo de base 12 y altura 6.', { t: 'techo: 36' }, '$\\tfrac{12 \\cdot 6}{2} = 36$'],
        ['Sumando las dos piezas: 120.', { t: '84 + 36 = 120' }],
        ['También: la caja completa mide 12 por 13.', { f: 1, t: 'caja: 156' }, '$12 \\cdot 13 = 156$'],
        ['Y sobran dos esquinas de 18: quedan 120.', { t: '156 − 36 = 120' }],
      ], 'Suma las piezas o quita lo que sobra: da igual.'),
      xpHaz('fichas', 'A una placa de 9 por 6 se le quita un cuadrado de lado 3 en una esquina. Pon lo que se quita y lo que queda.', { slots: fila('se quita', 'queda'), fichas: ['9', '45', '12', '42', '54'], meta: ['9', '45'], alto: 96, pista: 'El cuadrado mide lado por lado.' }, '$3 \\cdot 3 = 9$ y $54 - 9 = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un jardín redondo de radio 4 m lleva alrededor un camino de 1 m de ancho. Pon, en π, el área del jardín y la del camino.', { slots: fila('jardín', 'camino'), fichas: ['16', '9', '25', '1', '8'], meta: ['16', '9'], alto: 96, pista: 'El borde de afuera del camino tiene radio 5.' }, '$16\\pi$ y $25\\pi - 16\\pi = 9\\pi$.')],
  ], 'Borde, superficie, fracción de la vuelta y afuera menos adentro.');

  xpLec('icf-ma-medida-3', [
    ['Por capas',
      xpMira('dibujo', 'Empecemos por la idea: el volumen es **una capa repetida**.', { dib: pila, v: { c: 1, t: '' }, alto: 190 }, [
        ['Una capa de 4 por 3 tiene doce cubos.', { t: '12' }, '$4 \\cdot 3 = 12$'],
        ['Con tres capas ya hay treinta y seis.', { c: 3, t: '36' }, '$12 \\cdot 3 = 36$'],
        ['Con cinco capas hay sesenta cubos.', { c: 5, t: '60' }, '$12 \\cdot 5 = 60$'],
        ['Con un cilindro es igual: base redonda por altura.', {}, '$\\pi r^2 \\cdot h$'],
        ['Radio 2 y altura 5: veinte veces π.', {}, '$4 \\cdot 5 = 20$'],
      ], 'Prisma o cilindro: área de la base por altura.'),
      xpHaz('dibujo', 'Cada capa es de 4 por 3. Apila hasta tener **48** cubos.', { dib: pila, v: { c: 1 }, metas: { c: 4 }, alto: 250, manijas: [{ k: 'c', min: 1, max: 6, paso: 1, et: 'capas' }], lee: v => `$12 \\cdot ${v.c} = ${12 * v.c}$`, dice: () => 'Cada capa tiene doce.' }, '$48 \\div 12 = 4$.')],
    ['La tercera parte',
      xpMira('dibujo', 'Segunda idea: un cono llena **un tercio** del cilindro de igual base y altura.', { dib: cono, v: { n: 0, t: '' }, alto: 192 }, [
        ['Tienen la misma base y la misma altura.', {}],
        ['Se vacía un cono: un tercio del cilindro.', { n: 1, t: 'un tercio' }],
        ['Se vacía otro cono: ya van dos tercios.', { n: 2, t: 'dos tercios' }],
        ['Con el tercero el cilindro queda lleno.', { n: 3, t: 'lleno' }],
        ['Igual pasa con la pirámide y su prisma.', {}, '$\\tfrac13 \\cdot base \\cdot h$'],
        ['Y una esfera justa llena dos tercios de su cilindro.', { n: 2, t: 'esfera: dos tercios' }],
      ], 'Cono y pirámide: un tercio. Esfera: dos tercios de su cilindro.'),
      xpHaz('fichas', 'Un cilindro mide $30\\pi$. Pon, en π, el cono y la esfera justa de igual base y altura.', { slots: fila('cono', 'esfera'), fichas: ['10', '20', '15', '30', '60'], meta: ['10', '20'], alto: 96, pista: 'Un tercio y dos tercios.' }, '$30 \\div 3 = 10$ y el doble, 20.')],
    ['Piel y litros',
      xpMira('fichas', 'Tercera idea: la **piel** suma caras y la **capacidad** se pasa a litros.', { slots: fila('una cara', 'piel', 'litros'), fichas: ['4', '24', '8000'], alto: 96 }, [
        ['Un cubo de 2 metros: cada cara mide 4.', { pon: { 0: '4' } }, '$2 \\cdot 2 = 4$'],
        ['Tiene seis caras: su piel mide 24.', { pon: { 1: '24' } }, '$6 \\cdot 4 = 24$'],
        ['Su volumen es de ocho metros cúbicos.', {}, '$2 \\cdot 2 \\cdot 2 = 8$'],
        ['Cada metro cúbico tiene mil litros.', { pon: { 2: '8000' } }, '$8 \\cdot 1\\,000 = 8\\,000$'],
        ['Y un litro son mil centímetros cúbicos.', {}],
      ], 'Piel: suma de caras. 1 m³ = 1 000 L; 1 L = 1 000 cm³.'),
      xpHaz('fichas', 'Una caja mide 3 por 2 de base y 4 de alto, en metros. Pon su piel y los litros que caben.', { slots: fila('piel (m²)', 'litros'), fichas: ['52', '24000', '26', '2400', '24'], meta: ['52', '24000'], alto: 96, pista: 'Las caras son 6, 12 y 8, cada una dos veces.' }, '$2 \\cdot 26 = 52$ y $24 \\cdot 1\\,000 = 24\\,000$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A una caja de 2 por 3 por 5 se le duplican las tres medidas. Pon el volumen de antes y por cuánto se multiplica.', { slots: fila('antes', 'se multiplica por'), fichas: ['30', '8', '2', '6', '4'], meta: ['30', '8'], alto: 96, pista: 'Se duplica tres veces: largo, ancho y alto.' }, '$2 \\cdot 3 \\cdot 5 = 30$ y $2 \\cdot 2 \\cdot 2 = 8$.')],
  ], 'Capas, tercios, caras y litros: con eso se mide cualquier recipiente.');
}
;
//#archivo js/explora-icf-ma-5.js
// Preicfes · Matemáticas, mundo 5 «Funciones Lineales» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Plano de 0 a 8 y de 0 a 24 (o v.h): recta y = b + m x, con el escalón entre p y q.
  const X = x => 52 + x * 32, Y = (y, h) => 176 - y / h * 144;
  const ejes = (K, h) => { let s = ''; for (let i = 0; i <= 8; i += 2) s += K.l(X(i), 32, X(i), 176, i ? 'ls' : 'lm') + K.t(X(i), 192, i, 's tm'); for (let k = 0; k <= 4; k++) s += K.l(52, Y(k * h / 4, h), 308, Y(k * h / 4, h), k ? 'ls' : 'lm') + (k ? K.t(46, Y(k * h / 4, h) + 4, Math.round(k * h / 4), 's tm', 'end') : ''); return s; };
  const plano = (v, K) => { const h = 24, f = x => v.b + v.m * x, seg = (b, m, cls) => K.pl([[X(0), Y(b, h)], [X(8), Y(b + m * 8, h)]], cls); return ejes(K, h) + seg(v.b, v.m, 'la gr') + K.f(v.e, K.pl([[X(v.p), Y(f(v.p), h)], [X(v.q), Y(f(v.p), h)], [X(v.q), Y(f(v.q), h)]], 'lg gr') + K.c(X(v.p), Y(f(v.p), h), 5, 'fG') + K.c(X(v.q), Y(f(v.q), h), 5, 'fG')) + K.f(v.s, seg(v.b2, v.m2, 'lf gr')) + K.t(180, 20, v.t || '', 'ta'); };
  const D = { b: 4, m: 2, p: 1, q: 3, e: 0, s: 0, b2: 12, m2: 1, t: '' };
  // Barra de fijo más n pedazos.
  const barra = (v, K) => { const u = 7; return K.r(30, 60, v.b * u, 34, 'fg', 0) + Array.from({ length: Math.round(v.n) }, (_, i) => K.r(30 + (v.b + i * v.m) * u, 60, v.m * u, 34, 'fa', 0)).join('') + K.t(30, 48, 'fijo', 's tm', 'start') + K.t(170, 128, v.t || '', 'ta'); };

  xpLec('icf-ma-lineal-1', [
    ['Por cada uno',
      xpMira('dibujo', 'Empecemos por la idea: la **pendiente** es lo que sube entre lo que avanza.', { dib: plano, v: { ...D }, alto: 204 }, [
        ['Un tanque empieza con cuatro litros y se va llenando.', {}],
        ['Del minuto 1 al 3 avanza dos minutos.', { e: 1 }, '$3 - 1 = 2$'],
        ['Y sube de 6 a 10: cuatro litros.', {}, '$10 - 6 = 4$'],
        ['Cuatro litros en dos minutos: dos por minuto.', { t: '2 litros por minuto' }, '$4 \\div 2 = 2$'],
        ['En otro tramo, del 2 al 7, también da dos.', { p: 2, q: 7 }, '$10 \\div 5 = 2$'],
      ], 'Pendiente: lo que sube entre lo que avanza, igual en toda la recta.'),
      xpHaz('fichas', 'De la semana 2 a la 8 una planta pasa de 9 a 27 cm. Pon lo que avanza, lo que sube y la pendiente.', { slots: fila('avanza', 'sube', 'por semana'), fichas: ['6', '18', '3', '8', '27', '12'], meta: ['6', '18', '3'], alto: 96, pista: 'Resta las semanas, resta los centímetros y reparte.' }, '$18 \\div 6 = 3$ cm por semana.')],
    ['Sube, baja o nada',
      xpMira('dibujo', 'Segunda idea: el **signo** dice si crece o baja.', { dib: plano, v: { ...D, b: 4, m: 2 }, alto: 204 }, [
        ['Si sube hacia la derecha, es positiva.', { t: 'pendiente 2' }],
        ['Más empinada: cambia más rápido.', { b: 0, m: 3, t: 'pendiente 3' }],
        ['Horizontal: no cambia, la pendiente es cero.', { b: 12, m: 0, t: 'pendiente 0' }],
        ['Si baja hacia la derecha, es negativa.', { b: 20, m: -2, t: 'pendiente −2' }],
        ['Una batería que se gasta baja; un ahorro sube.', {}],
      ], 'Positiva sube, negativa baja, cero no cambia.'),
      xpHaz('dibujo', 'La recta empieza en 20. Mueve la pendiente hasta que en 8 llegue a **4**.', { dib: (v, K) => plano({ ...D, b: 20, m: v.m }, K), v: { m: 0 }, metas: { m: -2 }, alto: 250, manijas: [{ k: 'm', min: -2.5, max: 0.5, paso: 0.5, et: 'pendiente' }], lee: v => `$20 + 8 \\cdot (${v.m}) = ${20 + 8 * v.m}$`, dice: () => 'Mira cuánto tiene que bajar en ocho pasos.' }, 'Baja 16 en 8: pendiente −2.')],
    ['Con unidades',
      xpMira('fichas', 'Tercera idea: la pendiente lleva **dos unidades**.', { slots: fila('km por hora', '$ por kilo', 'mm por día'), fichas: ['60', '3', '4'], alto: 96 }, [
        ['180 kilómetros en 3 horas: se reparten.', { pon: { 0: '60' } }, '$180 \\div 3 = 60$'],
        ['De 2 a 6 kilos el precio sube 12.', { pon: { 1: '3' } }, '$12 \\div 4 = 3$'],
        ['Un hongo crece 20 milímetros en 5 días.', { pon: { 2: '4' } }, '$20 \\div 5 = 4$'],
        ['Primero se nombra lo que cambia.', {}],
        ['Después, por cada cuánto: kilómetros por hora.', {}],
      ], 'Lo que cambia por cada unidad de lo que avanza.'),
      xpHaz('fichas', 'Un camión gasta 45 galones en 360 km. Pon los km por galón y los galones para 80 km.', { slots: fila('km por galón', 'para 80 km'), fichas: ['8', '10', '0.125', '16', '40'], meta: ['8', '10'], alto: 96, pista: 'Reparte los kilómetros entre los galones.' }, '$360 \\div 45 = 8$ y $80 \\div 8 = 10$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una vela mide 22 cm a la 1 hora y 13 cm a las 4. Pon cuánto baja por hora, cuánto medía al encenderla y a qué hora se acaba, redondeada a la siguiente hora.', { slots: fila('por hora', 'al comienzo', 'se acaba'), fichas: ['3', '25', '9', '4', '22', '8'], meta: ['3', '25', '9'], alto: 96, pista: 'Baja 9 en 3 horas; al comienzo tenía una hora más de vela.' }, '$9 \\div 3 = 3$; $22 + 3 = 25$; $25 \\div 3$ pasa de 8.')],
  ], 'Sube entre avanza, con su signo y sus dos unidades.');

  xpLec('icf-ma-lineal-2', [
    ['Fijo más por cada uno',
      xpMira('dibujo', 'Empecemos por la idea: muchos cobros son **un fijo más algo por cada unidad**.', { dib: barra, v: { b: 10, m: 4, n: 0, t: '' }, alto: 148 }, [
        ['Entrar vale diez mil: se paga una sola vez.', { t: '10' }],
        ['Cada juego vale cuatro mil: uno.', { n: 1, t: '10 + 4 = 14' }],
        ['Con tres juegos se suman tres veces cuatro.', { n: 3, t: '10 + 4 · 3 = 22' }, '$10 + 4 \\cdot 3 = 22$'],
        ['Con x juegos: diez más cuatro equis.', { t: '10 + 4x' }, '$y = 10 + 4x$'],
        ['El fijo no se multiplica: se paga una vez.', {}],
      ], 'Total = fijo + cambio · cantidad.'),
      xpHaz('fichas', 'Una pizzería cobra 18 por la base y 3 por ingrediente. Pon lo fijo, el cambio y el precio con 4 ingredientes.', { slots: fila('fijo', 'cambio', 'con 4'), fichas: ['18', '3', '30', '21', '84', '12'], meta: ['18', '3', '30'], alto: 96, pista: 'La base se paga una vez; cada ingrediente suma.' }, '$18 + 3 \\cdot 4 = 30$.')],
    ['En el plano',
      xpMira('dibujo', 'Segunda idea: lo fijo es **donde empieza** la recta; el cambio, **su inclinación**.', { dib: plano, v: { ...D, b: 0, m: 2 }, alto: 204 }, [
        ['Sin fijo, la recta empieza en cero.', { t: 'y = 2x' }],
        ['Con un fijo de seis, empieza más arriba.', { b: 6, t: 'y = 6 + 2x' }],
        ['Si cada unidad vale menos, se inclina menos.', { m: 1, t: 'y = 6 + x' }],
        ['Si se gasta, baja: se resta.', { b: 20, m: -2, t: 'y = 20 − 2x' }],
        ['Leerla al revés: empieza en 20 y pierde 2 cada vez.', {}],
      ], 'Corta el eje en lo fijo y se inclina según el cambio.'),
      xpHaz('dibujo', 'Arma la recta de **8 fijos y 1.5 por cada uno**.', { dib: (v, K) => plano({ ...D, b: v.b, m: v.m }, K), v: { b: 0, m: 0 }, metas: { b: 8, m: 1.5 }, alto: 290, manijas: [{ k: 'b', min: 0, max: 12, paso: 2, et: 'fijo' }, { k: 'm', min: 0, max: 1.5, paso: 0.5, et: 'por cada uno' }], lee: v => `$y = ${v.b} + ${v.m}x$`, dice: () => 'Mira dónde empieza y cuánto sube por paso.' }, 'Empieza en 8 y sube 1.5 por paso.')],
    ['Devolverse',
      xpMira('fichas', 'Tercera idea: si se conoce el total, **se quita lo fijo y se reparte**.', { slots: fila('sin el fijo', 'cantidad'), fichas: ['35', '5'], alto: 96 }, [
        ['Pagué 50: quince fijos y siete por hora.', {}, '$15 + 7x = 50$'],
        ['Lo fijo se quita de los dos lados.', { pon: { 0: '35' } }, '$50 - 15 = 35$'],
        ['Lo que queda se reparte entre siete.', { pon: { 1: '5' } }, '$35 \\div 7 = 5$'],
        ['Se comprueba: quince más siete por cinco.', {}, '$15 + 35 = 50$'],
        ['Dividir antes de quitar el fijo es el error típico.', {}],
      ], 'Quita lo fijo, reparte y comprueba.'),
      xpHaz('fichas', 'Un celular tiene 96 fotos y toma 12 por día. Pon cuántas faltan para 180 y en cuántos días se llega.', { slots: fila('faltan', 'días'), fichas: ['84', '7', '15', '276', '8'], meta: ['84', '7'], alto: 96, pista: 'Quita las que ya tiene.' }, '$180 - 96 = 84$ y $84 \\div 12 = 7$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Por 3 clases se pagan 44 y por 8 clases, 84, con matrícula incluida. Pon lo de cada clase, la matrícula y lo de 10 clases.', { slots: fila('por clase', 'matrícula', '10 clases'), fichas: ['8', '20', '100', '10', '24', '80'], meta: ['8', '20', '100'], alto: 96, pista: 'De 3 a 8 clases sube 40 en cinco clases.' }, '$40 \\div 5 = 8$; $44 - 24 = 20$; $20 + 80 = 100$.')],
  ], 'Fijo más cambio por cantidad; y para devolverse, quita y reparte.');

  xpLec('icf-ma-lineal-3', [
    ['El cruce',
      xpMira('dibujo', 'Empecemos por la idea: dos planes empatan **en el cruce**.', { dib: plano, v: { ...D, b: 4, m: 2, s: 0, b2: 12, m2: 1 }, alto: 204 }, [
        ['El plan A empieza en 4 y sube 2 por cada uno.', { t: 'A: 4 + 2x' }],
        ['El plan B empieza en 12 y sube solo 1.', { s: 1, t: 'B: 12 + x' }],
        ['Al comienzo se llevan ocho.', {}, '$12 - 4 = 8$'],
        ['Con cada unidad A se acerca uno.', {}, '$2 - 1 = 1$'],
        ['Se alcanzan en ocho: los dos valen veinte.', { t: 'x = 8, los dos 20' }, '$8 \\div 1 = 8$'],
      ], 'Empate: lo que se llevan entre lo que se acercan.'),
      xpHaz('fichas', 'A: 3 fijos y 5 por día. B: 15 fijos y 2 por día. Pon cuánto se llevan al comienzo, cuánto se acercan por día y el día del empate.', { slots: fila('se llevan', 'se acercan', 'empate'), fichas: ['12', '3', '4', '18', '7', '6'], meta: ['12', '3', '4'], alto: 96, pista: 'Resta los fijos, resta los cambios y reparte.' }, '$12 \\div 3 = 4$ días: los dos valen 23.')],
    ['De cada lado',
      xpMira('dibujo', 'Segunda idea: **antes** del cruce gana el de menor fijo; **después**, el que sube menos.', { dib: plano, v: { ...D, b: 2, m: 2, s: 1, b2: 10, m2: 0 }, alto: 204 }, [
        ['B cobra diez fijos y ya no sube.', { t: 'empatan en 4' }],
        ['A empieza en dos y sube dos por cada uno.', {}],
        ['Con dos unidades A va en seis: gana A.', { t: 'antes: gana A' }, '$2 + 2 \\cdot 2 = 6$'],
        ['Con siete, A va en dieciséis: gana B.', { t: 'después: gana B' }, '$2 + 2 \\cdot 7 = 16$'],
        ['Prueba siempre un número de cada lado.', {}],
      ], 'Antes del cruce, menor fijo; después, menor pendiente.'),
      xpHaz('fichas', 'A: 6 por clase. B: 30 fijos y 1 por clase. Empatan en 6. Pon lo que cuesta cada uno con 10 clases.', { slots: fila('A', 'B'), fichas: ['60', '40', '36', '310', '31'], meta: ['60', '40'], alto: 96, pista: 'Usa diez clases en cada plan.' }, 'A 60 y B 40: después del empate gana B.')],
    ['Decidir',
      xpMira('fichas', 'Tercera idea: se decide con **lo que vas a usar**.', { slots: fila('A en 3', 'B en 3', 'A en 12', 'B en 12').map(s => ({ ...s, w: 62 })), fichas: ['13', '19', '40', '28'], alto: 96 }, [
        ['A: cuatro fijos y tres por viaje. B: dieciséis y uno.', {}],
        ['Con tres viajes, A cuesta trece.', { pon: { 0: '13' } }, '$4 + 9 = 13$'],
        ['Y B cuesta diecinueve: conviene A.', { pon: { 1: '19' } }, '$16 + 3 = 19$'],
        ['Con doce viajes, A cuesta cuarenta.', { pon: { 2: '40' } }, '$4 + 36 = 40$'],
        ['Y B, veintiocho: ahora conviene B.', { pon: { 3: '28' } }, '$16 + 12 = 28$'],
      ], 'No hay plan mejor: hay plan mejor para tu cantidad.'),
      xpHaz('fichas', 'A: 25 fijos y 2 por GB. B: 5 por GB. Usas 10 GB. Pon lo que cuesta cada uno.', { slots: fila('A', 'B'), fichas: ['45', '50', '27', '70', '15'], meta: ['45', '50'], alto: 96, pista: 'Calcula los dos con diez.' }, 'A 45 y B 50: para 10 GB conviene A.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Comprar una impresora cuesta 240 y cada hoja sale a 1. En la tienda cada hoja vale 4 y no hay fijo. Pon cuánto se ahorra por hoja y con cuántas hojas se recupera.', { slots: fila('ahorro', 'hojas'), fichas: ['3', '80', '60', '5', '240'], meta: ['3', '80'], alto: 96, pista: 'Resta lo de cada hoja y reparte lo fijo.' }, '$4 - 1 = 3$ y $240 \\div 3 = 80$.')],
  ], 'Halla el cruce, prueba cada lado y decide con tu cantidad.');
}
;
//#archivo js/explora-icf-ma-6.js
// Preicfes · Matemáticas, mundo 6 «Triángulos y Semejanza» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Recta con un rayo a g grados.
  const rayo = (v, K) => { const [x, y] = K.at(170, 150, 120, v.g); return K.l(30, 150, 310, 150, 'lm gr') + K.sec(170, 150, 50, 0, v.g, 'fa') + K.f(v.f, K.sec(170, 150, 40, v.g, 180, 'fg')) + K.l(170, 150, x, y, 'la gr') + K.t(170, 182, v.t || '', 'ta'); };
  // Triángulo con ángulos a y b en la base.
  const tri = (v, K) => { const L = 220, ta = Math.tan(v.a * Math.PI / 180), tb = Math.tan(v.b * Math.PI / 180), h = L / (1 / ta + 1 / tb), x = h / ta, A = [60, 160], B = [280, 160], C = [60 + x, 160 - h]; return K.p([A, B, C], 'fn') + K.ang(A, B, C, 26, `${Math.round(v.a)}°`, 'fa') + K.ang(B, A, C, 26, `${Math.round(v.b)}°`, 'fg') + K.f(v.f, K.ang(C, A, B, 22, `${Math.round(180 - v.a - v.b)}°`, 'ff')) + K.t(170, 192, v.t || '', 'ta'); };
  // Tres varillas.
  const vara = (v, K) => [[v.a, 'fa'], [v.b, 'fg'], [v.c, 'ff']].map(([n, c], i) => K.r(50, 30 + i * 40, n * 18, 24, c, 2) + K.t(42, 47 + i * 40, Math.round(n), 's tm', 'end')).join('') + K.t(170, 170, v.t || '', 'ta');
  // Cuadrados sobre los lados: 3, 4 y 5.
  const pit = (v, K) => { const u = v.u, x = 130, y = 130; return K.p([[x, y], [x + 4 * u, y], [x, y - 3 * u]], 'fn') + K.f(v.p, K.r(x - 3 * u, y - 3 * u, 3 * u, 3 * u, 'fa', 0) + K.t(x - 1.5 * u, y - 1.5 * u + 5, '9')) + K.f(v.q, K.r(x, y, 4 * u, 4 * u, 'fg', 0) + K.t(x + 2 * u, y + 2 * u + 5, '16')) + K.f(v.r, K.p([[x, y - 3 * u], [x + 4 * u, y], [x + 7 * u, y - 4 * u], [x + 3 * u, y - 7 * u]], 'ff') + K.t(x + 3.5 * u, y - 3.5 * u + 5, '25')) + K.t(170, 216, v.t || '', 'ta'); };
  // Dos triángulos semejantes: palo y árbol.
  const som = (v, K) => K.l(20, 160, 320, 160, 'lm') + K.p([[50, 160], [50 + 2 * 9, 160], [50, 160 - 9 * 5]], 'fa') + K.t(40, 144, '5', 's tm', 'end') + K.t(60, 178, '2', 's tm') + K.p([[150, 160], [150 + 2 * 9 * v.k, 160], [150, 160 - 9 * 5 * v.k]], 'fg') + K.t(150 + 9 * v.k, 178, Math.round(2 * v.k), 's tm') + K.f(v.f, K.t(144, 160 - 22 * v.k, Math.round(5 * v.k), 's tg', 'end')) + K.t(250, 24, v.t || '', 'ta');
  // Cuadrado k × k.
  const cuad = (v, K) => { const n = Math.round(v.k), u = 24; let s = ''; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += K.r(170 + (i - n / 2) * u, 24 + j * u, u - 1, u - 1, 'fa', 1); return s + K.t(170, 186, v.t || '', 'ta'); };
  // Triángulo rectángulo con θ a la izquierda.
  const rec = (v, K) => { const x = 70, y = 150, b = 40 * v.e, h = 30 * v.e; return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fn') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.t(x + 24, y - 6, 'θ', 's') + K.f(v.f, K.t(x + b / 2, y + 18, `ady ${4 * Math.round(v.e)}`, 's tg') + K.t(x + b + 8, y - h / 2, `op ${3 * Math.round(v.e)}`, 's tf', 'start') + K.t(x + b / 2 - 14, y - h / 2 - 8, `hip ${5 * Math.round(v.e)}`, 's ta', 'end')) + K.t(170, 190, v.t || '', 'ta'); };

  xpLec('icf-ma-forma-1', [
    ['Media vuelta',
      xpMira('dibujo', 'Empecemos por la idea: dos ángulos vecinos sobre una recta completan **180°**.', { dib: rayo, v: { g: 60, f: 0, t: '' }, alto: 194 }, [
        ['Un rayo sobre la recta abre sesenta grados.', { t: '60°' }],
        ['El que falta completa la media vuelta.', { f: 1, t: '60° + 120°' }, '$180 - 60 = 120$'],
        ['Si el rayo se abre, el vecino se cierra.', { g: 110, t: '110° + 70°' }, '$180 - 110 = 70$'],
        ['En la mitad, los dos miden noventa.', { g: 90, t: '90° + 90°' }],
        ['Al cruzarse dos rectas, los de enfrente son iguales.', {}],
      ], 'Vecinos: suman 180°. Opuestos: iguales.'),
      xpHaz('dibujo', 'Gira el rayo hasta que el vecino mida **45°**.', { dib: (v, K) => rayo({ g: v.g, f: 1 }, K), v: { g: 60 }, metas: { g: 135 }, alto: 250, manijas: [{ k: 'g', min: 15, max: 165, paso: 15, et: 'ángulo' }], lee: v => `$180 - ${v.g} = ${180 - v.g}$`, dice: () => 'Los dos llenan media vuelta.' }, '$180 - 45 = 135$.')],
    ['Tres ángulos',
      xpMira('dibujo', 'Segunda idea: los tres ángulos de un triángulo suman **180°**.', { dib: tri, v: { a: 60, b: 50, f: 0, t: '' }, alto: 200 }, [
        ['Uno mide sesenta y otro, cincuenta.', {}],
        ['El tercero completa media vuelta.', { f: 1, t: '60 + 50 + 70' }, '$180 - 110 = 70$'],
        ['Si cambia uno, los otros se acomodan.', { a: 40, t: '40 + 50 + 90' }, '$180 - 90 = 90$'],
        ['Nunca se pasa ni falta.', { a: 50, b: 50, t: '50 + 50 + 80' }],
        ['El exterior de una punta suma los otros dos.', {}],
      ], 'Interiores: 180°. Exterior: la suma de los dos lejanos.'),
      xpHaz('fichas', 'En un triángulo, dos ángulos miden 35° y 85°. Pon el tercero y el exterior que está junto a él.', { slots: fila('tercero', 'su exterior'), fichas: ['60', '120', '50', '95', '145'], meta: ['60', '120'], alto: 96, pista: 'El exterior es vecino del tercero, o la suma de los otros dos.' }, '$180 - 120 = 60$ y $35 + 85 = 120$.')],
    ['¿Cierra?',
      xpMira('dibujo', 'Tercera idea: un lado no puede ser tan largo como **los otros dos juntos**.', { dib: vara, v: { a: 5, b: 4, c: 6, t: '' }, alto: 182 }, [
        ['Cinco y cuatro juntas hacen nueve.', { t: '5 + 4 = 9' }],
        ['La de seis es menor que nueve: cierra.', { t: '6 < 9: cierra' }],
        ['Con diez, las otras no la alcanzan.', { c: 10, t: '10 > 9: no cierra' }],
        ['Con nueve queda una línea, sin triángulo.', { c: 9, t: '9 = 9: no cierra' }],
        ['Y con una muy corta la de cinco y la de cuatro no se juntan.', { c: 1, t: '4 + 1 = 5: no cierra' }],
      ], 'El tercer lado va entre la resta y la suma de los otros.'),
      xpHaz('fichas', 'Dos lados miden 8 y 3. Pon el entero más corto y el más largo que sirven.', { slots: fila('más corto', 'más largo'), fichas: ['6', '10', '5', '11', '3'], meta: ['6', '10'], alto: 96, pista: 'Más que la resta y menos que la suma.' }, 'Entre 5 y 11, sin tocarlos: de 6 a 10.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un triángulo isósceles tiene dos lados de 4 y 9. Pon el lado que se repite y el perímetro.', { slots: fila('se repite', 'perímetro'), fichas: ['9', '22', '4', '17', '13'], meta: ['9', '22'], alto: 96, pista: 'Prueba si 4, 4 y 9 cierra.' }, '4, 4 y 9 no cierra: es 9, 9 y 4, que suma 22.')],
  ], 'Media vuelta, tres ángulos y el largo que cierra.');

  xpLec('icf-ma-forma-2', [
    ['Cuadrados sobre los lados',
      xpMira('dibujo', 'Empecemos por la idea: en un triángulo **rectángulo**, dos cuadrados llenan el tercero.', { dib: pit, v: { u: 15, p: 0, q: 0, r: 0, t: '' }, alto: 224 }, [
        ['Los catetos miden tres y cuatro.', {}],
        ['El cuadrado sobre el de tres tiene nueve.', { p: 1 }, '$3^2 = 9$'],
        ['El cuadrado sobre el de cuatro, dieciséis.', { q: 1 }, '$4^2 = 16$'],
        ['Juntos llenan el de la hipotenusa: veinticinco.', { r: 1 }, '$9 + 16 = 25$'],
        ['Entonces la hipotenusa mide cinco.', { t: '3, 4 y 5' }, '$5^2 = 25$'],
      ], 'Hipotenusa al cuadrado = suma de los catetos al cuadrado.'),
      xpHaz('fichas', 'Los catetos miden 7 y 24. Pon la suma de sus cuadrados y la hipotenusa.', { slots: fila('suma', 'hipotenusa'), fichas: ['625', '25', '31', '527', '62'], meta: ['625', '25'], alto: 96, pista: 'Eleva cada uno, suma y busca qué número al cuadrado da eso.' }, '$49 + 576 = 625 = 25^2$.')],
    ['Falta un cateto',
      xpMira('fichas', 'Segunda idea: para un **cateto** se resta.', { slots: fila('hipotenusa²', 'cateto²', 'otro²', 'otro').map(s => ({ ...s, w: 66 })), fichas: ['400', '144', '256', '16'], alto: 96 }, [
        ['La hipotenusa mide veinte y un cateto, doce.', {}],
        ['El cuadrado grande tiene cuatrocientos.', { pon: { 0: '400' } }, '$20^2 = 400$'],
        ['El del cateto, ciento cuarenta y cuatro.', { pon: { 1: '144' } }, '$12^2 = 144$'],
        ['Lo que falta para llenar el grande.', { pon: { 2: '256' } }, '$400 - 144 = 256$'],
        ['Y el cateto mide dieciséis.', { pon: { 3: '16' } }, '$16^2 = 256$'],
      ], 'Hipotenusa: suma. Cateto: resta.'),
      xpHaz('fichas', 'Hipotenusa 15 y cateto 9. Pon la resta de los cuadrados y el otro cateto.', { slots: fila('resta', 'cateto'), fichas: ['144', '12', '6', '306', '17'], meta: ['144', '12'], alto: 96, pista: 'Quita el cuadrado del cateto al de la hipotenusa.' }, '$225 - 81 = 144 = 12^2$.')],
    ['Familias y atajos',
      xpMira('fichas', 'Tercera idea: los múltiplos de una **familia** también sirven.', { slots: fila('3·k', '4·k', '5·k'), fichas: ['30', '40', '50'], alto: 96 }, [
        ['Toma tres, cuatro y cinco.', {}],
        ['Multiplica por diez el primero.', { pon: { 0: '30' } }],
        ['Y los otros dos también.', { pon: { 1: '40', 2: '50' } }],
        ['Sigue siendo rectángulo: se agrandó parejo.', {}, '$900 + 1\\,600 = 2\\,500$'],
        ['Otras familias: 5, 12, 13 y 8, 15, 17.', {}],
      ], 'Reconoce 3-4-5, 5-12-13, 8-15-17 y sus múltiplos.'),
      xpHaz('fichas', 'Un parque mide 24 m por 32 m. Pon lo que mide la diagonal y cuánto ahorra cruzar por ella.', { slots: fila('diagonal', 'ahorro'), fichas: ['40', '16', '56', '8', '28'], meta: ['40', '16'], alto: 96, pista: 'Es la familia 3-4-5 por ocho.' }, '$8 \\cdot 5 = 40$ y $56 - 40 = 16$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un árbol se quiebra a 5 m del suelo y la punta cae a 12 m del pie. Pon la parte caída y la altura que tenía.', { slots: fila('parte caída', 'altura'), fichas: ['13', '18', '17', '12', '7'], meta: ['13', '18'], alto: 96, pista: 'La parte caída es la hipotenusa.' }, '$25 + 144 = 13^2$ y $5 + 13 = 18$.')],
  ], 'Dos cuadrados llenan el tercero: suma o resta.');

  xpLec('icf-ma-forma-3', [
    ['Misma forma',
      xpMira('dibujo', 'Empecemos por la idea: en figuras **semejantes** todo crece por el mismo número.', { dib: som, v: { k: 1, f: 0, t: '' }, alto: 190 }, [
        ['Un palo de 5 da una sombra de 2.', {}],
        ['Un poste da una sombra de 6: el triple.', { k: 3, t: 'sombra × 3' }, '$6 \\div 2 = 3$'],
        ['El Sol llega igual: los ángulos no cambian.', {}],
        ['Entonces la altura también es el triple.', { f: 1, t: 'altura × 3' }, '$5 \\cdot 3 = 15$'],
        ['No se suma: se multiplica.', {}],
      ], 'Halla por cuánto creció un lado y úsalo en los demás.'),
      xpHaz('fichas', 'Dos triángulos son semejantes: 5, 7 y 9; y 20, ?, ?. Pon los otros dos.', { slots: fila('el de 7', 'el de 9'), fichas: ['28', '36', '22', '24', '35'], meta: ['28', '36'], alto: 96, pista: 'Mira por cuánto se multiplicó el 5.' }, 'Por 4: $7 \\cdot 4 = 28$ y $9 \\cdot 4 = 36$.')],
    ['Paralelas',
      xpMira('fichas', 'Segunda idea: las **paralelas** parten dos rectas en la misma razón.', { slots: fila('4', '6', '10', '?').map((s, i) => ({ ...s, w: 64, et: ['trozo 1', 'trozo 2', 'otra, 1', 'otra, 2'][i] })), fichas: ['4', '6', '10', '15'], alto: 96 }, [
        ['En una recta los trozos miden 4 y 6.', { pon: { 0: '4', 1: '6' } }],
        ['El segundo es uno y medio veces el primero.', {}, '$6 \\div 4 = 1.5$'],
        ['En la otra recta, el primero mide 10.', { pon: { 2: '10' } }],
        ['El segundo guarda la razón.', { pon: { 3: '15' } }, '$10 \\cdot 1.5 = 15$'],
        ['A eso se le llama teorema de Tales.', {}],
      ], 'Tales: la razón entre los trozos es la misma.'),
      xpHaz('fichas', 'Los trozos de una recta miden 3 y 12; en la otra, el primero mide 5. Pon la razón y el segundo trozo.', { slots: fila('razón', 'segundo'), fichas: ['4', '20', '14', '9', '15'], meta: ['4', '20'], alto: 96, pista: 'Divide el segundo entre el primero.' }, '$12 \\div 3 = 4$ y $5 \\cdot 4 = 20$.')],
    ['Al escalar',
      xpMira('dibujo', 'Tercera idea: si los lados crecen por k, el **área** crece por k².', { dib: cuad, v: { k: 1, t: '' }, alto: 196 }, [
        ['Un cuadrado de lado uno: una baldosa.', { t: 'lado 1: 1' }],
        ['Con el lado doble, cuatro baldosas.', { k: 2, t: 'lado 2: 4' }, '$2^2 = 4$'],
        ['Con el triple, nueve.', { k: 3, t: 'lado 3: 9' }, '$3^2 = 9$'],
        ['Un cubo crece con el factor al cubo.', {}, '$3^3 = 27$'],
        ['El perímetro crece igual que el lado.', {}],
      ], 'Largo: k. Área: k². Volumen: k³.'),
      xpHaz('fichas', 'Una maqueta crece por 5. Pon por cuánto se multiplican su pintura y su volumen.', { slots: fila('pintura', 'volumen'), fichas: ['25', '125', '5', '10', '15'], meta: ['25', '125'], alto: 96, pista: 'La pintura cubre superficie.' }, '$5^2 = 25$ y $5^3 = 125$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un plano 1 : 50 una sala mide 8 cm por 6 cm. Pon su largo real en metros y su área real en m².', { slots: fila('largo (m)', 'área (m²)'), fichas: ['4', '12', '24', '3', '48'], meta: ['4', '12'], alto: 96, pista: 'Cada centímetro son 50 cm: medio metro.' }, '8 cm son 4 m y 6 cm son 3 m: $4 \\cdot 3 = 12$.')],
  ], 'Un mismo factor para los lados; su cuadrado para el área.');

  xpLec('icf-ma-forma-4', [
    ['Tres nombres',
      xpMira('dibujo', 'Empecemos por la idea: los lados se nombran **desde θ**.', { dib: rec, v: { e: 3, f: 0, t: '' }, alto: 198 }, [
        ['Este es el ángulo desde el que miramos.', {}],
        ['El cateto de enfrente es el opuesto; el que lo toca, el adyacente.', { f: 1 }],
        ['La hipotenusa está frente al ángulo recto.', {}],
        ['Seno: opuesto sobre hipotenusa.', { t: 'sen θ = 9/15' }, '$\\tfrac{9}{15} = 0.6$'],
        ['Coseno: adyacente sobre hipotenusa.', { t: 'cos θ = 12/15' }, '$\\tfrac{12}{15} = 0.8$'],
        ['Tangente: opuesto sobre adyacente.', { t: 'tan θ = 9/12' }, '$\\tfrac{9}{12} = 0.75$'],
      ], 'Seno op/hip, coseno ady/hip, tangente op/ady.'),
      xpHaz('fichas', 'Opuesto 8, adyacente 6, hipotenusa 10. Pon el seno y la tangente.', { slots: fila('sen', 'tan'), fichas: ['8/10', '8/6', '6/10', '6/8', '10/8'], meta: ['8/10', '8/6'], alto: 96, pista: 'El seno lleva abajo la hipotenusa; la tangente, el adyacente.' }, 'sen = 8/10 y tan = 8/6.')],
    ['Solo importa el ángulo',
      xpMira('dibujo', 'Segunda idea: al agrandar el triángulo la **razón** no cambia.', { dib: rec, v: { e: 1, f: 0, t: '' }, alto: 198 }, [
        ['Uno pequeño: opuesto 3 e hipotenusa 5.', { f: 1, t: '3/5 = 0.6' }],
        ['Al doble: seis y diez.', { e: 2, t: '6/10 = 0.6' }],
        ['Al triple: nueve y quince.', { e: 3, t: '9/15 = 0.6' }],
        ['Los lados cambian; el seno, no.', {}],
        ['Por eso basta saber el ángulo para saber la razón.', {}],
      ], 'Cada ángulo tiene su seno, su coseno y su tangente.'),
      xpHaz('fichas', 'La tangente de un ángulo es 3/4. Si el adyacente mide 20, pon el opuesto y la hipotenusa.', { slots: fila('opuesto', 'hipotenusa'), fichas: ['15', '25', '19', '35', '12'], meta: ['15', '25'], alto: 96, pista: 'Todo creció por cinco.' }, 'Por 5: 15, 20 y 25.')],
    ['Medir sin llegar',
      xpMira('fichas', 'Tercera idea: con un **ángulo** y un lado se halla otro.', { slots: fila('distancia', 'tan', 'altura'), fichas: ['60', '0.7', '42'], alto: 96 }, [
        ['Desde sesenta metros se mira la punta de un cerro.', { pon: { 0: '60' } }],
        ['La tangente de ese ángulo es 0.7.', { pon: { 1: '0.7' } }],
        ['Altura sobre distancia es la tangente.', {}, '$\\tfrac{h}{60} = 0.7$'],
        ['Entonces la altura es distancia por tangente.', { pon: { 2: '42' } }, '$60 \\cdot 0.7 = 42$'],
        ['Si tienes la hipotenusa, usa el seno.', {}],
      ], 'Escoge la razón que une lo que tienes con lo que buscas.'),
      xpHaz('fichas', 'Una rampa de 12 m forma 30° con el piso (seno 0.5). Pon la altura que sube y la de una de 20 m igual de inclinada.', { slots: fila('de 12 m', 'de 20 m'), fichas: ['6', '10', '24', '12', '15'], meta: ['6', '10'], alto: 96, pista: 'La rampa es la hipotenusa.' }, '$12 \\cdot 0.5 = 6$ y $20 \\cdot 0.5 = 10$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A 40 m de un edificio se ve el techo a 45° (tangente 1), con los ojos a 1.5 m del piso. Pon lo que sube desde los ojos y la altura total.', { slots: fila('desde los ojos', 'total'), fichas: ['40', '41.5', '38.5', '45', '60'], meta: ['40', '41.5'], alto: 96, pista: 'Falta sumar la altura de los ojos.' }, '$40 \\cdot 1 = 40$ y $40 + 1.5 = 41.5$.')],
  ], 'Nombra los lados desde θ y escoge la razón.');
}
;
//#archivo js/explora-icf-ma-7.js
// Preicfes · Matemáticas, mundo 7 «Ecuaciones en Contexto» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Balanza: a y c cajas x, b y d pesas a cada lado.
  const bal = (v, K) => { const cajas = (x, n, m) => Array.from({ length: Math.round(n) }, (_, i) => K.r(x + (i % 4) * 26, 92 - Math.floor(i / 4) * 26, 24, 24, 'fa', 3) + K.t(x + 12 + (i % 4) * 26, 108 - Math.floor(i / 4) * 26, 'x', 's')).join('') + (m > 0.5 ? K.t(x + 50, 136, `+ ${Math.round(m)}`, 'b tg') : ''); return K.l(30, 118, 310, 118, 'gr') + K.l(170, 118, 170, 160, 'lm') + K.l(140, 162, 200, 162, 'lm') + cajas(36, v.a, v.b) + cajas(196, v.c, v.d) + K.t(170, 30, v.t || '', 'ta'); };
  // Rectángulo (x + a)(x + b).
  const rec = (v, K) => { const x = 90, y = 30, u = 80; return K.r(x, y, u, u, 'fa', 0) + K.f(v.p, K.r(x + u, y, 60, u, 'fg', 0) + K.r(x, y + u, u, 40, 'fg', 0)) + K.f(v.q, K.r(x + u, y + u, 60, 40, 'ff', 0)) + K.t(x + u / 2, y - 8, 'x', 's tm') + K.t(x + u + 30, y - 8, '5', 's tm') + K.t(x - 8, y + u / 2, 'x', 's tm', 'end') + K.t(x - 8, y + u + 24, '2', 's tm', 'end') + K.t(x + u / 2, y + u / 2 + 5, 'x²', 'b') + K.f(v.p, K.t(x + u + 30, y + u / 2 + 5, '5x') + K.t(x + u / 2, y + u + 25, '2x')) + K.f(v.q, K.t(x + u + 30, y + u + 25, '10')) + K.t(170, 178, v.t || '', 'ta'); };
  // Recta numérica con un rayo desde b hacia d; lleno si e.
  const ray = (v, K) => { const X = n => 170 + n * 24; let s = K.l(20, 70, 320, 70, 'lm'); for (let i = -6; i <= 6; i++) s += K.l(X(i), 65, X(i), 75, 'lm') + K.t(X(i), 94, i, 's tm'); return s + (v.d > 0 ? K.r(X(v.b), 62, 320 - X(v.b), 16, 'fa', 0) : K.r(20, 62, X(v.b) - 20, 16, 'fa', 0)) + K.c(X(v.b), 70, 8, v.e > 0.5 ? 'fG' : 'fn') + K.t(170, 34, v.t || '', 'ta'); };
  // Recibos: filas de cuadros y círculos con total.
  const rbo = (v, K) => [[3, v.p, v.s], [3, v.q, v.r]].map(([a, b, t], k) => { const y = 34 + k * 56; return Array.from({ length: a }, (_, i) => K.r(30 + i * 32, y, 26, 26, 'fa', 3)).join('') + Array.from({ length: Math.round(b) }, (_, i) => K.c(142 + i * 30, y + 13, 12, 'fg')).join('') + K.t(316, y + 18, Math.round(t), 'b', 'end'); }).join('') + K.t(170, 168, v.t || '', 'ta');

  xpLec('icf-ma-ecuaciones-1', [
    ['La balanza',
      xpMira('dibujo', 'Empecemos por la idea: una ecuación es una **balanza derecha**.', { dib: bal, v: { a: 4, b: 3, c: 2, d: 13, t: '4x + 3 = 2x + 13' }, alto: 176 }, [
        ['Cuatro cajas y 3 pesan lo mismo que dos cajas y 13.', {}],
        ['Se quitan dos cajas de cada lado.', { a: 2, c: 0, t: '2x + 3 = 13' }],
        ['Se quitan tres de cada lado.', { b: 0, d: 10, t: '2x = 10' }],
        ['Y se reparte en dos: cada caja pesa cinco.', { a: 1, d: 5, t: 'x = 5' }],
        ['Siempre lo mismo en los dos lados.', {}],
      ], 'Lo que haces en un lado lo haces en el otro.'),
      xpHaz('fichas', '$6x + 2 = 4x + 14$. Pon lo que queda al quitar $4x$ y 2, y el valor de x.', { slots: fila('2x =', 'x ='), fichas: ['12', '6', '16', '8', '10'], meta: ['12', '6'], alto: 96, pista: 'Quita lo mismo de los dos lados.' }, '$2x = 12$ y $x = 6$.')],
    ['De la frase a la letra',
      xpMira('fichas', 'Segunda idea: se le pone **x** a lo que no se sabe y lo demás se escribe con ella.', { slots: fila('Ana', 'Beto', 'Caro'), fichas: ['x', 'x + 4', '2(x + 4)'], alto: 96 }, [
        ['No sabemos cuánto tiene Ana: le decimos equis.', { pon: { 0: 'x' } }],
        ['Beto tiene cuatro más que Ana.', { pon: { 1: 'x + 4' } }],
        ['Caro tiene el doble de Beto, con los cuatro incluidos.', { pon: { 2: '2(x + 4)' } }],
        ['Si juntos tienen 52, se suman las tres.', {}, '$4x + 12 = 52$'],
        ['Cuarenta en cuatro partes: Ana tiene diez.', {}, '$x = 10$'],
      ], 'Una sola letra, y todo escrito con ella.'),
      xpHaz('fichas', 'Iris tiene x años; su tío, el triple menos 5. Pon la edad del tío y la suma de las dos.', { slots: fila('tío', 'suma'), fichas: ['3x − 5', '4x − 5', '5 − 3x', '3x − 4', '4x + 5'], meta: ['3x − 5', '4x − 5'], alto: 96, pista: 'Al triple se le quitan 5; después suma x.' }, '$x + 3x - 5 = 4x - 5$.')],
    ['Comprobar',
      xpMira('fichas', 'Tercera idea: el valor se **lleva al enunciado**.', { slots: fila('menor', 'mayor', 'suma'), fichas: ['14', '23', '37'], alto: 96 }, [
        ['Dos números suman 37 y uno tiene 9 más.', {}, '$x + x + 9 = 37$'],
        ['Sin los nueve quedan 28: el menor es catorce.', { pon: { 0: '14' } }, '$28 \\div 2 = 14$'],
        ['El mayor tiene nueve más.', { pon: { 1: '23' } }],
        ['Se comprueba: suman lo que dice el enunciado.', { pon: { 2: '37' } }, '$14 + 23 = 37$'],
        ['Si no cuadra, se revisa la ecuación, no el enunciado.', {}],
      ], 'Responde lo que preguntan y comprueba.'),
      xpHaz('fichas', 'Tres números seguidos suman 63. Pon el menor y el mayor.', { slots: fila('menor', 'mayor'), fichas: ['20', '22', '21', '19', '23'], meta: ['20', '22'], alto: 96, pista: 'El del medio es el promedio.' }, '$63 \\div 3 = 21$: 20, 21 y 22.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un terreno es 8 m más largo que ancho y su cerca mide 76 m. Pon el ancho y el largo.', { slots: fila('ancho', 'largo'), fichas: ['15', '23', '30', '38', '19'], meta: ['15', '23'], alto: 96, pista: 'Medio borde es un ancho y un largo: 38.' }, '$2a + 8 = 38$: 15 y 23.')],
  ], 'Nombra, plantea, equilibra y comprueba.');

  xpLec('icf-ma-ecuaciones-2', [
    ['Lo semejante se junta',
      xpMira('fichas', 'Empecemos por la idea: se juntan los de la **misma clase**.', { slots: fila('x²', 'x', 'números'), fichas: ['3x²', '2x', '4'], alto: 96 }, [
        ['Tenemos $3x^2 + 5x + 7 - 3x - 3$.', {}],
        ['De equis cuadrado solo hay uno.', { pon: { 0: '3x²' } }],
        ['Cinco equis menos tres equis.', { pon: { 1: '2x' } }, '$5x - 3x = 2x$'],
        ['Y de números, siete menos tres.', { pon: { 2: '4' } }, '$7 - 3 = 4$'],
        ['Equis y equis cuadrado no se juntan.', {}],
      ], 'x con x, x² con x², números con números.'),
      xpHaz('fichas', 'Junta $9x + 4 - 6x + 2$.', { slots: fila('de x', 'números'), fichas: ['3x', '6', '15x', '2', '9x'], meta: ['3x', '6'], alto: 96, pista: 'El signo va con su término.' }, '$3x + 6$.')],
    ['Un producto es un rectángulo',
      xpMira('dibujo', 'Segunda idea: $(x + 5)(x + 2)$ es un **rectángulo** con cuatro pedazos.', { dib: rec, v: { p: 0, q: 0, t: '' }, alto: 186 }, [
        ['El cuadrado grande mide equis por equis.', {}],
        ['Una franja mide cinco por equis y otra, dos por equis.', { p: 1 }],
        ['La esquina mide cinco por dos.', { q: 1 }, '$5 \\cdot 2 = 10$'],
        ['Las franjas se juntan: siete equis.', { t: 'x² + 7x + 10' }, '$5x + 2x = 7x$'],
        ['Al revés: de la suma se vuelve al rectángulo.', {}],
      ], 'Cuatro pedazos; las dos franjas se juntan.'),
      xpHaz('fichas', '$(x + 3)(x + 8)$: pon las franjas juntas y la esquina.', { slots: fila('franjas', 'esquina'), fichas: ['11x', '24', '24x', '11', '5x'], meta: ['11x', '24'], alto: 96, pista: 'Las franjas se suman; la esquina se multiplica.' }, '$x^2 + 11x + 24$.')],
    ['Sacar lo común',
      xpMira('fichas', 'Tercera idea: el **factor común** es el alto que comparten.', { slots: fila('alto', 'ancho 1', 'ancho 2'), fichas: ['5', '2x', '3'], alto: 96 }, [
        ['Tenemos diez equis más quince.', {}, '$10x + 15$'],
        ['Cinco divide a los dos: es el alto.', { pon: { 0: '5' } }],
        ['Diez equis entre cinco.', { pon: { 1: '2x' } }, '$10x \\div 5 = 2x$'],
        ['Y quince repartido entre cinco.', { pon: { 2: '3' } }, '$15 \\div 5 = 3$'],
        ['Queda cinco por todo el paréntesis.', {}, '$5(2x + 3)$'],
      ], 'Saca lo que divide a todos y déjalo afuera.'),
      xpHaz('fichas', '$14x + 21$. Pon el factor común y lo que queda adentro.', { slots: fila('factor', 'adentro'), fichas: ['7', '2x + 3', '14', '2x + 21', '3x + 2'], meta: ['7', '2x + 3'], alto: 96, pista: 'Busca el número más grande que divide a los dos.' }, '$7(2x + 3)$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Si $a + b = 12$, pon el valor de $5a + 5b$ y el de $5a + 5b - 8$.', { slots: fila('5a + 5b', 'menos 8'), fichas: ['60', '52', '17', '9', '68'], meta: ['60', '52'], alto: 96, pista: 'Saca el 5 y usa la suma.' }, '$5 \\cdot 12 = 60$ y $60 - 8 = 52$.')],
  ], 'Junta, arma el rectángulo y saca lo común.');

  xpLec('icf-ma-ecuaciones-3', [
    ['Comparar recibos',
      xpMira('dibujo', 'Empecemos por la idea: al **restar**, lo igual desaparece.', { dib: rbo, v: { p: 2, q: 5, s: 19, r: 25, t: '' }, alto: 178 }, [
        ['Tres cuadros y dos círculos valen 19.', {}],
        ['Tres cuadros y cinco círculos, 25.', {}],
        ['Los cuadros son iguales: no cuentan en la diferencia.', { t: '5 − 2 = 3 círculos más' }],
        ['Tres círculos más valen seis más: dos cada uno.', { t: '25 − 19 = 6' }, '$6 \\div 3 = 2$'],
        ['Sin los círculos, tres cuadros valen quince.', { t: '19 − 4 = 15' }, '$15 \\div 3 = 5$'],
      ], 'Resta los recibos: solo queda lo distinto.'),
      xpHaz('fichas', 'Dos tintos y un pan valen 11; dos tintos y cuatro panes, 20. Pon un pan y un tinto.', { slots: fila('pan', 'tinto'), fichas: ['3', '4', '9', '5', '8'], meta: ['3', '4'], alto: 96, pista: 'Tres panes más valen 9 más.' }, '$9 \\div 3 = 3$ y $(11 - 3) \\div 2 = 4$.')],
    ['Suponer que todos son iguales',
      xpMira('fichas', 'Segunda idea: **supón** que todos son de una clase y corrige.', { slots: fila('todas gallinas', 'faltan', 'vacas').map(s => ({ ...s, w: 78 })), fichas: ['24', '10', '5'], alto: 96 }, [
        ['Doce animales, entre gallinas y vacas, con 34 patas.', {}],
        ['Si todas fueran gallinas habría 24 patas.', { pon: { 0: '24' } }, '$12 \\cdot 2 = 24$'],
        ['Faltan diez patas para completar.', { pon: { 1: '10' } }, '$34 - 24 = 10$'],
        ['Cambiar una gallina por una vaca suma dos.', {}, '$4 - 2 = 2$'],
        ['Hay cinco vacas y siete gallinas.', { pon: { 2: '5' } }, '$10 \\div 2 = 5$'],
      ], 'Supón, mira lo que falta y reparte entre lo que sube cada cambio.'),
      xpHaz('fichas', 'Hay 16 boletas de 3 y de 8 que suman 78. Pon lo que sumarían todas de 3 y cuántas son de 8.', { slots: fila('todas de 3', 'de 8'), fichas: ['48', '6', '10', '30', '128'], meta: ['48', '6'], alto: 96, pista: 'Faltan 30 y cada cambio sube 5.' }, '$16 \\cdot 3 = 48$; $30 \\div 5 = 6$.')],
    ['Suma y diferencia',
      xpMira('fichas', 'Tercera idea: con la **suma** y la **diferencia** se hallan los dos.', { slots: fila('sin ventaja', 'menor', 'mayor'), fichas: ['30', '15', '21'], alto: 96 }, [
        ['Dos números suman 36 y se llevan 6.', {}],
        ['Se quita la ventaja.', { pon: { 0: '30' } }, '$36 - 6 = 30$'],
        ['Quedan dos iguales: el menor.', { pon: { 1: '15' } }, '$30 \\div 2 = 15$'],
        ['El mayor tiene seis más.', { pon: { 2: '21' } }, '$15 + 6 = 21$'],
        ['En el plano es el punto donde se cruzan dos rectas.', {}],
      ], 'Quita la ventaja, reparte y devuélvela.'),
      xpHaz('fichas', 'Dos hermanos tienen juntos 47 años y se llevan 5. Pon la edad de cada uno.', { slots: fila('menor', 'mayor'), fichas: ['21', '26', '42', '24', '23'], meta: ['21', '26'], alto: 96, pista: 'Quita los 5 y parte en dos.' }, '$42 \\div 2 = 21$ y $21 + 5 = 26$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se mezclan 4 L de jugo puro con agua hasta que el jugo sea el 20 % de todo. Pon el total de litros y el agua agregada.', { slots: fila('total', 'agua'), fichas: ['20', '16', '8', '24', '5'], meta: ['20', '16'], alto: 96, pista: '4 L son la quinta parte del total.' }, '$4 \\cdot 5 = 20$ y $20 - 4 = 16$.')],
  ], 'Compara, supón o usa suma y diferencia.');

  xpLec('icf-ma-ecuaciones-4', [
    ['Muchas respuestas',
      xpMira('dibujo', 'Empecemos por la idea: una desigualdad la cumplen **muchos** números.', { dib: ray, v: { b: 2, d: 1, e: 0, t: 'x > 2' }, alto: 110 }, [
        ['Los mayores que dos se pintan hacia la derecha.', {}],
        ['El dos no entra: el círculo queda vacío.', {}],
        ['Con mayor o igual, sí entra: se llena.', { e: 1, t: 'x ≥ 2' }],
        ['Menores que tres: hacia la izquierda.', { b: 3, d: -1, e: 0, t: 'x < 3' }],
        ['Prueba un número pintado para comprobar.', { t: '1 < 3' }],
      ], 'Pinta hacia donde se cumple y decide si el borde entra.'),
      xpHaz('dibujo', 'Pinta $x \\le -1$: mueve el borde, el lado y si entra.', { dib: ray, v: { b: 0, d: 1, e: 0 }, metas: { b: -1, d: -1, e: 1 }, alto: 270, manijas: [{ k: 'b', min: -5, max: 5, paso: 1, et: 'borde' }, { k: 'd', min: -1, max: 1, paso: 2, et: 'lado' }, { k: 'e', min: 0, max: 1, paso: 1, et: 'entra' }], lee: v => `$x ${v.d > 0 ? (v.e ? '\\ge' : '>') : (v.e ? '\\le' : '<')} ${v.b}$`, dice: () => 'Menor o igual: hacia la izquierda y con el borde.' }, 'El borde −1 entra y se pinta a la izquierda.')],
    ['El signo que se voltea',
      xpMira('fichas', 'Segunda idea: multiplicar o dividir por un **negativo** voltea el signo.', { slots: fila('3 y 5', '+ 4', '· 2', '· (−1)').map(s => ({ ...s, w: 66 })), fichas: ['3 < 5', '7 < 9', '6 < 10', '−3 > −5'], alto: 96 }, [
        ['Tres es menor que cinco.', { pon: { 0: '3 < 5' } }],
        ['Si a los dos se les suma cuatro, sigue igual.', { pon: { 1: '7 < 9' } }],
        ['Si los dos se doblan, también.', { pon: { 2: '6 < 10' } }],
        ['Con menos uno quedan al otro lado del cero.', { pon: { 3: '−3 > −5' } }],
        ['El más grande pasó a ser el más pequeño.', { marca: [3] }],
      ], 'Solo un negativo que multiplica o divide lo voltea.'),
      xpHaz('fichas', 'Resuelve $-3x < 12$ y $2x - 1 \\ge 9$.', { slots: fila('primera', 'segunda'), fichas: ['x > −4', 'x ≥ 5', 'x < −4', 'x ≥ 4', 'x ≤ 5'], meta: ['x > −4', 'x ≥ 5'], alto: 96, pista: 'En la primera se divide entre un negativo.' }, '$x > -4$ y $2x \\ge 10$.')],
    ['Como máximo, al menos',
      xpMira('fichas', 'Tercera idea: las palabras dicen **qué signo** va.', { slots: fila('como máximo', 'al menos', 'menos de', 'más de').map(s => ({ ...s, w: 66 })), fichas: ['≤', '≥', '<', '>'], alto: 96 }, [
        ['«Como máximo 10» permite diez o menos.', { pon: { 0: '≤' } }],
        ['«Al menos 10» permite diez o más.', { pon: { 1: '≥' } }],
        ['«Menos de 10» no deja entrar al diez.', { pon: { 2: '<' } }],
        ['Y «más de 10» tampoco.', { pon: { 3: '>' } }],
        ['Si son personas o cajas, la respuesta es entera.', {}],
      ], 'Máximo ≤, al menos ≥; con «de» el borde no entra.'),
      xpHaz('fichas', 'Con 100 mil se pagan 28 de entrada y 9 por juego. Pon lo que queda para juegos y cuántos como máximo.', { slots: fila('queda', 'máximo'), fichas: ['72', '8', '11', '128', '9'], meta: ['72', '8'], alto: 96, pista: 'Quita la entrada y reparte.' }, '$100 - 28 = 72$ y $72 \\div 9 = 8$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un ascensor aguanta 500 kg. Suben 2 personas de 70 y cajas de 25. Pon los kilos libres y las cajas como máximo.', { slots: fila('libres', 'cajas'), fichas: ['360', '14', '15', '430', '20'], meta: ['360', '14'], alto: 96, pista: 'Las cajas no se parten.' }, '$500 - 140 = 360$; $360 \\div 25 = 14.4$: 14.')],
  ], 'Pinta, cuida el signo y lee bien las palabras.');
}
;
//#archivo js/explora-icf-ma-8.js
// Preicfes · Matemáticas, mundo 8 «Validar Procedimientos» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Dos conjuntos, uno dentro del otro; p es un punto que se mueve.
  const dentro = (v, K) => K.c(170, 96, 76, 'fa') + K.c(150, 104, 36, 'fg') + K.t(150, 108, v.a, 's') + K.t(206, 50, v.b, 's') + K.f(v.f, K.c(v.x, v.y, 7, 'fF')) + K.t(170, 194, v.t || '', 'ta');
  // Rectángulo de base b y altura h.
  const rec = (v, K) => K.r(170 - v.b * 8, 150 - v.h * 14, v.b * 16, v.h * 14, 'fa', 0) + K.t(170, 168, Math.round(v.b), 's tm') + K.t(162 - v.b * 8, 154 - v.h * 7, Math.round(v.h), 's tm', 'end') + K.t(170, 24, v.t || '', 'ta');

  xpLec('icf-ma-argumenta-1', [
    ['Si… entonces',
      xpMira('dibujo', 'Empecemos por la idea: «si es de 6, es par» pone un conjunto **dentro** de otro.', { dib: dentro, v: { a: 'de 6', b: 'pares', f: 0, x: 150, y: 120, t: '' }, alto: 202 }, [
        ['Todos los múltiplos de 6 están entre los pares.', {}],
        ['El 18 está adentro: es de 6 y es par.', { f: 1, t: '18' }],
        ['El 8 es par y no es de 6: la frase no va al revés.', { x: 214, y: 110, t: '8' }],
        ['El 7 no es par: tampoco puede ser de 6.', { x: 290, y: 60, t: '7' }],
        ['Si no es par, no es de 6: eso sí vale.', {}],
      ], 'Vale de ida; y de vuelta solo si se niegan las dos.'),
      xpHaz('hoja', '«Si llueve, el piso se moja». El piso está seco. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Llovió.'], ['No llovió.'], ['No se sabe.']], pista: 'Si hubiera llovido, ¿cómo estaría el piso?' }, 'Al negar lo segundo se niega lo primero.')],
    ['Basta o hace falta',
      xpMira('hoja', 'Segunda idea: una condición puede **bastar** o solo **hacer falta**.', { paras: [['Ser de 10 … para ser par'], ['Ser par … para ser de 10'], ['Tener 4 lados iguales … para ser cuadrado']] }, [
        ['Todo el que es de 10 es par: basta.', { luz: [0], nota: { 0: 'basta' } }],
        ['Sin ser par no se puede ser de 10.', { luz: [1] }],
        ['Pero el 6 es par y no es de 10: solo hace falta.', { luz: [1], nota: { 1: 'hace falta' } }],
        ['El rombo tiene 4 lados iguales y no es cuadrado.', { luz: [2], nota: { 2: 'hace falta' } }],
        ['Busca un caso que cumpla lo primero y falle lo segundo.', {}],
      ], 'Basta: con eso alcanza. Hace falta: sin eso no se puede.'),
      xpHaz('hoja', 'Pon al margen qué es, para que un triángulo sea **equilátero**.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['basta', 'hace falta'], meta: [1, 0], paras: [['Tener dos ángulos iguales'], ['Tener tres ángulos de 60°']], pista: 'Alguna no va ahí: ¿un isósceles siempre es equilátero?' }, 'Dos iguales no alcanzan; tres de 60°, sí.')],
    ['Paso a paso',
      xpMira('fichas', 'Tercera idea: un procedimiento vale si **cada paso** se justifica.', { slots: fila('paso 1', 'paso 2', 'paso 3'), fichas: ['50', '10', '60'], alto: 96 }, [
        ['Se quiere el 12 % de 500.', {}],
        ['El 10 % es la décima parte: cincuenta.', { pon: { 0: '50' } }, '$500 \\div 10 = 50$'],
        ['El 2 % son dos veces el 1 %: diez.', { pon: { 1: '10' } }, '$2 \\cdot 5 = 10$'],
        ['Al juntarlos se obtiene sesenta.', { pon: { 2: '60' } }, '$50 + 10 = 60$'],
        ['Otro camino también vale: 500 por 0.12.', {}, '$500 \\cdot 0.12 = 60$'],
      ], 'Dos caminos distintos valen si cada paso es cierto.'),
      xpHaz('hoja', 'Para hallar el 15 % de 80, subraya el procedimiento **equivocado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['80 por 0.15'], ['10 % más la mitad de ese 10 %'], ['80 entre 15']], pista: 'Calcula los tres: dos dan lo mismo.' }, 'Los dos primeros dan 12; el otro, 5.33.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Si un número es de 9, es de 3». Luis dice: «21 es de 3; entonces es de 9». Subraya el error.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['21 no es de 3.'], ['Usó la frase al revés.'], ['La frase es falsa.']], pista: 'Mira en qué dirección la usó.' }, 'Ser de 3 no basta para ser de 9.')],
  ], 'Dirección, condición y cada paso con su razón.');

  xpLec('icf-ma-argumenta-2', [
    ['Uno basta',
      xpMira('hoja', 'Empecemos por la idea: un «todos» cae con **un solo** caso.', { letras: ['frase', '3', '5', '9'], paras: [['Todos los impares son primos.'], ['3: impar y primo'], ['5: impar y primo'], ['9: impar y no primo']] }, [
        ['La frase habla de todos los impares.', { luz: [0] }],
        ['El tres la cumple.', { luz: [1], nota: { 1: 'cumple' } }],
        ['El cinco también la cumple.', { luz: [2], nota: { 2: 'cumple' } }],
        ['El nueve es 3 por 3: no es primo.', { luz: [3], nota: { 3: 'la tumba' } }],
        ['Con uno solo, la frase ya es falsa.', { tacha: [0], luz: [3] }],
      ], 'Mil a favor no la prueban; uno en contra la tumba.'),
      xpHaz('hoja', '«Todo múltiplo de 4 es múltiplo de 8». Subraya el que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['16'], ['20'], ['10']], pista: 'Debe ser de 4 y no ser de 8.' }, '20 es de 4 y no de 8; 10 ni siquiera es de 4.')],
    ['Cumplir y fallar',
      xpMira('hoja', 'Segunda idea: el contraejemplo **cumple** la condición y **falla** la conclusión.', { letras: ['frase', 'a', 'b', 'c'], paras: [['Si un número es mayor que 2, su cuadrado es mayor que 5.'], ['3: cuadrado 9'], ['1: cuadrado 1'], ['2.1: cuadrado 4.41']] }, [
        ['Condición: mayor que 2. Conclusión: cuadrado mayor que 5.', { luz: [0] }],
        ['El tres cumple las dos: no la tumba.', { luz: [1], tacha: [1] }],
        ['El uno no cumple la condición: no cuenta.', { luz: [2], tacha: [1, 2] }],
        ['El 2.1 cumple la condición y falla la conclusión.', { luz: [3], nota: { 3: 'la tumba' } }],
        ['Los decimales, el cero y los negativos suelen tumbar.', {}],
      ], 'Cumple la primera parte y falla la segunda.'),
      xpHaz('hoja', '«Si sumo dos números, el resultado es mayor que el primero». Subraya la pareja que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['2 y 9'], ['10 y 1'], ['4 y 0']], pista: 'Busca una suma que no pase del primero.' }, '$4 + 0 = 4$, que no es mayor que 4.')],
    ['Siempre o a veces',
      xpMira('hoja', 'Tercera idea: para decir **siempre** hace falta una razón general.', { paras: [['Par + par'], ['2a + 2b'], ['2(a + b): siempre par'], ['Impar · 3 es de 3: siempre'], ['Impar + 3 es de 4: a veces']] }, [
        ['Probar con dos pares no basta.', { luz: [0] }],
        ['Se escriben con letras: valen por todos.', { luz: [1] }],
        ['Es dos veces algo: siempre es par.', { luz: [2], nota: { 2: 'siempre' } }],
        ['Multiplicar por 3 siempre da de 3.', { luz: [3], nota: { 3: 'siempre' } }],
        ['Cinco más tres es ocho, pero siete más tres es diez.', { luz: [4], nota: { 4: 'a veces' } }],
      ], 'Razón general: siempre. Un caso que falla: a veces.'),
      xpHaz('hoja', 'Pon al margen si ocurre siempre o a veces, con n entero.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['a veces', 'siempre'], meta: [1, 0], paras: [['n + n es par'], ['n · n es par']], pista: 'Alguna no va ahí: prueba con 3.' }, '$2n$ siempre es par; $3 \\cdot 3 = 9$ no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Cuando el perímetro aumenta, el área aumenta». Subraya el cambio que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['De 4 por 4 a 5 por 5'], ['De 4 por 4 a 9 por 1'], ['De 2 por 3 a 2 por 6']], pista: 'Calcula perímetro y área antes y después.' }, 'El perímetro pasa de 16 a 20 y el área, de 16 a 9.')],
  ], 'Uno tumba, cumple y falla, y «siempre» pide razón.');

  xpLec('icf-ma-argumenta-3', [
    ['¿Una sola respuesta?',
      xpMira('dibujo', 'Empecemos por la idea: la información **alcanza** si solo hay una respuesta.', { dib: rec, v: { b: 6, h: 4, t: '' }, alto: 180 }, [
        ['Se sabe que el perímetro es 20. ¿Cuál es el área?', { t: 'perímetro 20' }],
        ['Puede ser 6 por 4: área 24.', { t: 'área 24' }, '$6 \\cdot 4 = 24$'],
        ['También 8 por 2: área 16.', { b: 8, h: 2, t: 'área 16' }, '$8 \\cdot 2 = 16$'],
        ['Dos respuestas: no alcanza.', { t: 'no alcanza' }],
        ['Si además es cuadrado, solo queda 5 por 5.', { b: 5, h: 5, t: 'área 25' }, '$20 \\div 4 = 5$'],
      ], 'Dos respuestas posibles: no alcanza.'),
      xpHaz('hoja', '¿Alcanza para saber el precio de un lápiz? Subraya el dato que **sí**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Dos lápices y un borrador valen 7'], ['Un lápiz vale menos que un borrador'], ['Cinco lápices valen 10']], pista: 'Busca el que deja un solo precio.' }, '$10 \\div 5 = 2$.')],
    ['Lo que sobra',
      xpMira('hoja', 'Segunda idea: un dato **sobra** si la respuesta no cambia al cambiarlo.', { letras: ['a', 'b', 'c', 'd'], paras: [['Tanque de 2 m por 3 m por 1 m'], ['Es verde'], ['Costó 900 mil'], ['¿Cuántos litros le caben?']] }, [
        ['Lo que se pide son los litros.', { luz: [3] }],
        ['Las medidas hacen falta.', { luz: [0], nota: { 0: 'hace falta' } }],
        ['Si fuera rojo le cabría lo mismo.', { luz: [1], tacha: [1] }],
        ['Y si costara el doble, también.', { luz: [2], tacha: [1, 2] }],
        ['Primero la pregunta, después los datos.', { luz: [3, 0] }],
      ], 'Cambia el dato: si la respuesta no cambia, sobra.'),
      xpHaz('hoja', 'Se pide la edad promedio de 3 hermanos. **Tacha** lo que sobra.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sus edades suman 45'], ['Viven en Pasto'], ['Son tres']], pista: 'Cambia cada dato y mira si cambia el promedio.' }, '$45 \\div 3 = 15$, vivan donde vivan.')],
    ['Solos o juntos',
      xpMira('hoja', 'Tercera idea: prueba cada dato **por separado** y luego **juntos**.', { letras: ['¿?', '1', '2'], paras: [['¿Cuánto vale n, entero positivo?'], ['Dato 1: n es menor que 8'], ['Dato 2: n es múltiplo de 5']] }, [
        ['Con el primero puede ser 1, 2, 3…', { luz: [1], nota: { 1: 'no alcanza' } }],
        ['Con el segundo, 5, 10, 15…', { luz: [2], nota: { 2: 'no alcanza' } }],
        ['Con los dos, solo el 5.', { luz: [1, 2] }],
        ['Juntos, los dos datos alcanzan.', { nota: { 1: 'juntos, sí', 2: 'juntos, sí' } }],
        ['No uses el dato 1 cuando pruebas el 2.', {}],
      ], 'Uno, el otro y los dos: en ese orden.'),
      xpHaz('hoja', '¿Es x mayor que y? Dato 1: x + 2 = y. Dato 2: x es par. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Basta el dato 1.'], ['Basta el dato 2.'], ['Hacen falta los dos.']], pista: 'Con el primero, ¿quién es mayor?' }, 'Si $y = x + 2$, y es mayor: se responde que no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Entre Ana y Beto recogieron 30 tapas; Ana recogió más». Subraya lo que se puede afirmar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ana recogió 20.'], ['Ana recogió más de 15.'], ['Beto recogió 14.']], pista: 'Busca lo que vale en todos los casos posibles.' }, 'Con 16 y 14 o con 29 y 1, Ana siempre pasa de 15.')],
  ], 'Una respuesta, lo que sobra y cada dato por separado.');
}
;
//#archivo js/explora-icf-ma-9.js
// Preicfes · Matemáticas, mundo 9 «Dinero y Créditos» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Columnas de saldo: s es simple, c compuesto (años mostrados n).
  const cols = (v, K) => { let h = K.l(20, 150, 320, 150, 'lm'); for (let i = 0; i <= 4; i++) { const a = 200 * (1 + 0.5 * i) / 12, b = 200 * 1.5 ** i / 12, x = 34 + i * 60; h += K.f(v.n - i + 1, K.r(x, 150 - a, 20, a, 'fa', 2) + K.f(v.c, K.r(x + 23, 150 - b, 20, b, 'fg', 2)) + K.t(x + 20, 166, i, 's tm')); } return h + K.t(170, 20, v.t, 'ta'); };
  // Barra de precio: q es el porcentaje que queda.
  const barra = (v, K) => K.r(50, 60, 240, 46, 'fc', 3) + K.r(50, 60, v.q * 2.4, 46, 'fa', 3) + K.t(50 + v.q * 1.2, 89, `${Math.round(v.q)} %`, 'b') + K.t(170, 30, v.t, 'ta');

  xpLec('icf-ma-finanzas-1', [
    ['Simple: suma lo mismo',
      xpMira('fichas', 'Empecemos por la idea: con interés **simple** cada periodo **suma lo mismo**.', { slots: fila('mes 1', 'mes 2', 'mes 3'), fichas: ['206', '212', '218'], alto: 96 }, [
        ['Se prestan 200 mil al 3 % mensual simple.', {}],
        ['El interés de un mes son seis mil.', {}, '$0.03 \\cdot 200 = 6$'],
        ['Al primer mes se deben 206 mil.', { pon: { 0: '206' } }],
        ['Al segundo se suman otros seis.', { pon: { 1: '212' } }],
        ['Y al tercero, los mismos seis.', { pon: { 2: '218' } }, '$200 + 3 \\cdot 6 = 218$'],
      ], 'Capital por tasa por tiempo: siempre lo mismo.'),
      xpHaz('fichas', 'Se prestan 150 mil al 4 % mensual simple. Pon el interés de un mes y el de cinco.', { slots: fila('un mes', 'cinco meses'), fichas: ['6', '30', '4', '20', '180'], meta: ['6', '30'], alto: 96, pista: 'Saca el 4 % de 150 y repítelo.' }, '$0.04 \\cdot 150 = 6$ y $5 \\cdot 6 = 30$.')],
    ['Compuesto: multiplica',
      xpMira('dibujo', 'Segunda idea: con interés **compuesto** cada periodo **multiplica** lo que hay.', { dib: cols, v: { n: 0, c: 0, t: '200 mil al 50 %' }, alto: 176 }, [
        ['Hoy hay 200 mil en los dos ahorros.', { n: 0, c: 1 }],
        ['Al año 1 dan lo mismo: 300 mil.', { n: 1 }, '$200 \\cdot 1.5 = 300$'],
        ['Al año 2 el compuesto ya va adelante.', { n: 2 }, '$300 \\cdot 1.5 = 450$'],
        ['El simple suma cien; el otro gana sobre lo ganado.', { n: 3 }],
        ['Cada año la distancia es mayor.', { n: 4, t: 'simple y compuesto' }],
      ], 'El interés también gana interés.'),
      xpHaz('fichas', 'Se ponen 1 000 al 10 % anual compuesto. Pon el saldo de los años 1 y 2.', { slots: fila('año 1', 'año 2'), fichas: ['1 100', '1 210', '1 200', '1 010', '1 300'], meta: ['1 100', '1 210'], alto: 96, pista: 'El segundo año se saca el 10 % de lo que ya había.' }, '$1\\,000 \\cdot 1.1 \\cdot 1.1 = 1\\,210$.')],
    ['El mismo periodo',
      xpMira('hoja', 'Tercera idea: la **tasa** y el **tiempo** deben hablar del mismo periodo.', { paras: [['2 % mensual, por 6 meses'], ['2 % mensual, por 1 año'], ['12 % anual, por 1 mes'], ['2 % · 1']] }, [
        ['Mes con mes: son seis veces.', { luz: [0], nota: { 0: '12 %' } }],
        ['Un año son doce meses: doce veces.', { luz: [1], nota: { 1: '24 %' } }],
        ['Con interés simple, un mes es la doceava parte.', { luz: [2], nota: { 2: '1 %' } }],
        ['Usar un uno cuando son meses es el error típico.', { luz: [3], tacha: [3] }],
        ['Primero se cuentan los periodos.', {}],
      ], 'Cuenta cuántos periodos de la tasa caben en el tiempo.'),
      xpHaz('hoja', '5 % trimestral simple durante un año. Subraya el total.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['5 %'], ['60 %'], ['20 %']], pista: '¿Cuántos trimestres tiene un año?' }, '$4 \\cdot 5 = 20$ %.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'A: 100 mil al 12 % anual simple. B: 100 mil al 11 % anual compuesto. Subraya quién tiene más a los **2 años**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A'], ['B'], ['Igual']], pista: 'Calcula los dos saldos del año 2.' }, 'A tiene 124; B, $100 \\cdot 1.11^2 = 123.21$.')],
  ], 'Sumar lo mismo, multiplicar por lo mismo y cuidar el periodo.');

  xpLec('icf-ma-finanzas-2', [
    ['El IVA',
      xpMira('fichas', 'Empecemos por la idea: con IVA del 19 % se multiplica por 1.19; para **volver** se **divide**.', { slots: fila('sin IVA', 'IVA', 'con IVA'), fichas: ['300', '57', '357'], alto: 96 }, [
        ['Sin IVA cuesta 300 mil.', { pon: { 0: '300' } }],
        ['El IVA son 57 mil.', { pon: { 1: '57' } }, '$0.19 \\cdot 300 = 57$'],
        ['Con IVA se pagan 357 mil.', { pon: { 2: '357' } }, '$300 \\cdot 1.19 = 357$'],
        ['Para volver, se divide entre 1.19.', {}, '$357 \\div 1.19 = 300$'],
        ['Quitar el 19 % de 357 no devuelve a 300.', {}],
      ], 'Ir: por 1.19. Volver: entre 1.19.'),
      xpHaz('fichas', 'Con un impuesto del 10 % se pagan 550 mil. Pon el precio sin impuesto y el impuesto.', { slots: fila('sin impuesto', 'impuesto'), fichas: ['500', '50', '495', '55', '540'], meta: ['500', '50'], alto: 96, pista: 'Divide entre 1.1.' }, '$550 \\div 1.1 = 500$: el impuesto son 50.')],
    ['Descuento sobre descuento',
      xpMira('dibujo', 'Segunda idea: el segundo descuento se hace sobre **lo que quedó**.', { dib: barra, v: { q: 100, t: 'precio completo' }, alto: 130 }, [
        ['El precio completo es el 100 %.', {}],
        ['Con 50 % queda la mitad.', { q: 50, t: '50 % menos' }],
        ['Otro 20 % se saca de esa mitad.', { q: 40, t: 'y 20 % de lo que quedó' }, '$0.5 \\cdot 0.8 = 0.4$'],
        ['Queda el 40 %: un descuento del 60 %.', { t: 'descuento total: 60 %' }],
        ['No es el 70 %: los porcentajes no se suman.', {}],
      ], 'Se multiplican las partes que quedan.'),
      xpHaz('fichas', '10 % de descuento y después otro 10 %. Pon el porcentaje que queda y el descuento total.', { slots: fila('queda', 'descuento'), fichas: ['81', '19', '80', '20', '90'], meta: ['81', '19'], alto: 96, pista: 'Multiplica 0.9 por 0.9.' }, '$0.9 \\cdot 0.9 = 0.81$: descuento del 19 %.')],
    ['La cuota',
      xpMira('fichas', 'Tercera idea: cada cuota paga **interés** y **abona** a la deuda.', { slots: fila('interés', 'abono', 'queda'), fichas: ['9', '50', '250'], alto: 96 }, [
        ['Se deben 300 mil al 3 % mensual.', {}],
        ['El interés del mes son nueve mil.', { pon: { 0: '9' } }, '$0.03 \\cdot 300 = 9$'],
        ['Además se abonan cincuenta a la deuda.', { pon: { 1: '50' } }, '$9 + 50 = 59$'],
        ['Solo el abono baja la deuda.', { pon: { 2: '250' } }, '$300 - 50 = 250$'],
        ['El mes siguiente el interés será menor.', {}, '$0.03 \\cdot 250 = 7.5$'],
      ], 'Interés de lo que se debe, más lo que se abona.'),
      xpHaz('hoja', 'Se deben 400 mil y se paga una cuota de 60, de los cuales 12 son interés. Subraya lo que queda debiendo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['340 mil'], ['352 mil'], ['388 mil']], pista: 'Separa el interés del abono.' }, 'Se abonan 48: $400 - 48 = 352$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una moto vale 4 000 mil. Subraya la forma de pago en que se **paga menos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['12 cuotas de 350'], ['5 % de descuento de contado'], ['1 000 ya y 10 cuotas de 290']], pista: 'Halla el total de cada una.' }, '4 200, 3 800 y 3 900: gana la de contado.')],
  ], 'Dividir para volver, multiplicar lo que queda y separar el interés.');
}
;
//#archivo js/explora-icf-ma-10.js
// Preicfes · Matemáticas, mundo 10 «Funciones que Curvan» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const curva = (K, f, X, Y, a, b, cls = 'la gr') => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Y(f(x))]; }), cls);
  // Parábola y = −(x − 2)(x − 10)/4 con eje e y vértice v; c enciende los ceros.
  const para = (v, K) => { const X = x => 30 + x * 23, Y = y => 140 - y * 26; return K.l(24, 140, 320, 140, 'lm') + curva(K, x => -(x - 2) * (x - 10) / 4, X, Y, 2, 10) + K.f(v.c, K.c(X(2), 140, 5, 'fF') + K.c(X(10), 140, 5, 'fF') + K.t(X(2), 158, 2, 's') + K.t(X(10), 158, 10, 's')) + K.f(v.e, K.l(X(6), 20, X(6), 140, 'lg d') + K.t(X(6), 158, 6, 's')) + K.f(v.v, K.c(X(6), Y(4), 6, 'fg') + K.t(X(6) + 14, Y(4) - 6, '4', 's', 'start')); };
  // Barras que multiplican por k.
  const expo = (v, K) => { let h = K.l(20, 150, 320, 150, 'lm'); for (let i = 0; i <= 5; i++) { const q = v.k > 1 ? 4 * v.k ** i : 128 * v.k ** i; h += K.f(v.n - i + 1, K.r(34 + i * 48, 150 - Math.min(132, q), 34, Math.min(132, q), 'fa', 2) + K.t(51 + i * 48, 166, i, 's tm')); } return h + K.t(170, 16, v.t, 'ta'); };
  // Onda con media m y amplitud a; q enciende el periodo.
  const onda = (v, K) => { const X = x => 24 + x * 24, Y = y => 140 - y * 10; return K.l(24, 140, 320, 140, 'lm') + curva(K, x => 6 + 4 * Math.sin(x * Math.PI / 3), X, Y, 0, 12) + K.f(v.m, K.l(24, Y(6), 320, Y(6), 'lg d') + K.t(330, Y(6) + 4, 6, 's tg')) + K.f(v.a, K.l(X(1.5), Y(6), X(1.5), Y(10), 'lo gr') + K.t(X(1.5) + 8, Y(8) + 4, 4, 's', 'start')) + K.f(v.q, K.l(X(1.5), 24, X(7.5), 24, 'la') + K.t(X(4.5), 18, 'periodo 6', 's ta')) + K.t(170, 162, v.t, 's tm'); };
  // Máquina: entra x, sale y.
  const maq = (v, K) => K.r(120, 40, 100, 60, 'fa', 8) + K.t(170, 76, v.r, 'b') + K.l(40, 70, 112, 70, 'gr') + K.l(228, 70, 300, 70, 'gr') + K.t(70, 60, Math.round(v.x), 'b') + K.f(v.s, K.t(268, 60, Math.round(v.y), 'b')) + K.t(170, 130, v.t, 'ta');

  xpLec('icf-ma-curvas-1', [
    ['Simetría',
      xpMira('dibujo', 'Empecemos por la idea: la parábola es **simétrica** y su vértice está en el medio.', { dib: para, v: { c: 0, e: 0, v: 0 }, alto: 168 }, [
        ['Un chorro sube y baja dibujando esta curva.', {}],
        ['Sale en dos y cae en diez.', { c: 1 }],
        ['El eje está a mitad de camino.', { e: 1 }, '$\\tfrac{2 + 10}{2} = 6$'],
        ['Ahí está el punto más alto.', { v: 1 }],
        ['En el eje está dónde; en la altura, cuánto.', {}],
      ], 'El eje está entre dos puntos de igual altura.'),
      xpHaz('fichas', 'Un salto empieza en 1 m y cae en 7 m. Pon el eje y cuánto hay del eje a la caída.', { slots: fila('eje', 'hasta caer'), fichas: ['4', '3', '8', '6', '7'], meta: ['4', '3'], alto: 96, pista: 'Busca la mitad entre 1 y 7.' }, '$\\tfrac{1 + 7}{2} = 4$ y $7 - 4 = 3$.')],
    ['Los ceros',
      xpMira('hoja', 'Segunda idea: los **ceros** salen de escribirla como **producto**.', { paras: [['y = x² − 7x + 12'], ['= (x − 3)(x − 4)'], ['vale 0 si x = 3'], ['o si x = 4']] }, [
        ['Se busca dónde la altura es cero.', { luz: [0] }],
        ['Multiplicados dan doce; sumados, siete.', { luz: [1] }],
        ['Un producto es cero si un factor es cero.', { luz: [2] }],
        ['Por eso hay dos cortes.', { luz: [2, 3] }],
        ['Cuidado con el signo: x menos tres da tres.', {}],
      ], 'Producto igual a 0: alguno de los dos es 0.'),
      xpHaz('fichas', 'y = (x − 2)(x + 5). Pon los dos ceros, de menor a mayor.', { slots: fila('menor', 'mayor'), fichas: ['−5', '2', '−2', '5', '0'], meta: ['−5', '2'], alto: 96, pista: 'Mira qué x hace 0 cada paréntesis.' }, '$x + 5 = 0$ da $-5$; $x - 2 = 0$ da 2.')],
    ['Máximo o mínimo',
      xpMira('hoja', 'Tercera idea: el **signo** de x² dice hacia dónde **abre**.', { paras: [['y = 2x² …'], ['y = −2x² …'], ['ingreso = p(40 − p)'], ['máximo en p = 20']] }, [
        ['Positivo: abre hacia arriba, hay mínimo.', { luz: [0], nota: { 0: 'mínimo' } }],
        ['Negativo: abre hacia abajo, hay máximo.', { luz: [1], nota: { 1: 'máximo' } }],
        ['Aquí, al multiplicar, queda menos p al cuadrado.', { luz: [2] }],
        ['Sus ceros son cero y cuarenta.', { luz: [2, 3] }, '$\\tfrac{0 + 40}{2} = 20$'],
        ['El máximo se halla reemplazando.', { luz: [3] }, '$20 \\cdot 20 = 400$'],
      ], 'Ceros, mitad y reemplazo.'),
      xpHaz('hoja', 'Subraya la que tiene **máximo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['y = x² − 9'], ['y = 9 − x²'], ['y = (x + 9)²']], pista: 'Busca el x² negativo.' }, 'Con $-x^2$ abre hacia abajo.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Altura: h = −5t² + 30t. Pon el instante más alto y el instante en que cae.', { slots: fila('más alto (s)', 'cae (s)'), fichas: ['3', '6', '30', '5', '45'], meta: ['3', '6'], alto: 96, pista: 'Vale 0 al salir y al caer.' }, '$-5t(t - 6) = 0$: cae en 6 y el eje es 3.')],
  ], 'Simetría, ceros y signo.');

  xpLec('icf-ma-curvas-2', [
    ['Por lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: en una exponencial cada paso **multiplica** por lo mismo.', { dib: expo, v: { n: 0, k: 2, t: 'por 2' }, alto: 176 }, [
        ['Se empieza con cuatro.', {}],
        ['Cada paso duplica lo que hay.', { n: 2 }],
        ['Al principio parece poco.', { n: 3 }],
        ['Después se dispara hacia arriba.', { n: 5 }, '$4 \\cdot 2^5 = 128$'],
        ['Eso no lo hace una recta.', {}],
      ], 'Inicio por base a la x.'),
      xpHaz('fichas', 'y = 5 · 3ˣ. Pon el valor en x = 0 y en x = 2.', { slots: fila('x = 0', 'x = 2'), fichas: ['5', '45', '0', '30', '15'], meta: ['5', '45'], alto: 96, pista: 'Todo número no cero a la cero es 1.' }, '$5 \\cdot 1 = 5$ y $5 \\cdot 9 = 45$.')],
    ['También baja',
      xpMira('dibujo', 'Segunda idea: con base entre **0 y 1** baja, sin llegar a **0**.', { dib: expo, v: { n: 0, k: 0.5, t: 'por 0.5' }, alto: 176 }, [
        ['Hay ciento veintiocho gramos.', {}],
        ['Cada hora queda la mitad.', { n: 1 }],
        ['Y la mitad de la mitad.', { n: 2 }, '$128 \\cdot 0.5^2 = 32$'],
        ['Cada vez baja menos.', { n: 4 }],
        ['Se acerca a cero y no llega.', { n: 5 }],
      ], 'Perder 20 % es quedar con 0.8.'),
      xpHaz('fichas', 'Cada año se pierde el 25 %. Pon por cuánto se multiplica y lo que queda de 80 en un año.', { slots: fila('por', 'queda'), fichas: ['0.75', '60', '0.25', '20', '55'], meta: ['0.75', '60'], alto: 96, pista: 'Piensa en la parte que queda.' }, '$80 \\cdot 0.75 = 60$.')],
    ['El logaritmo',
      xpMira('hoja', 'Tercera idea: el **logaritmo** pregunta por el **exponente**.', { paras: [['2³ = 8 → log₂ 8 = 3'], ['10⁴ = 10 000 → log₁₀ 10 000 = 4'], ['log₂ 8 + log₂ 4 = 3 + 2'], ['8 · 4 = 32 = 2⁵']] }, [
        ['A qué exponente se eleva dos para dar ocho.', { luz: [0] }],
        ['En base diez cuenta los ceros.', { luz: [1] }],
        ['Al multiplicar, los exponentes se suman.', { luz: [2] }],
        ['Es la misma cuenta, vista de otro modo.', { luz: [3] }],
        ['Por eso sirve para números enormes.', {}],
      ], 'El logaritmo es el exponente que falta.'),
      xpHaz('fichas', 'Pon log₂ 64 y log₁₀ 100.', { slots: fila('log₂ 64', 'log₁₀ 100'), fichas: ['6', '2', '32', '10', '8'], meta: ['6', '2'], alto: 96, pista: 'Pregunta por el exponente.' }, '$2^6 = 64$ y $10^2 = 100$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un video tiene 100 vistas y se triplica cada día. Subraya el día en que pasa de 2 500.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Día 2'], ['Día 3'], ['Día 8']], pista: 'Multiplica por 3 día tras día.' }, '300, 900, 2 700.')],
  ], 'Multiplicar, bajar sin llegar y buscar el exponente.');

  xpLec('icf-ma-curvas-3', [
    ['Se repite',
      xpMira('dibujo', 'Empecemos por la idea: el **periodo** es lo que tarda en **repetirse**.', { dib: onda, v: { m: 0, a: 0, q: 0, t: '' }, alto: 170 }, [
        ['Este nivel sube y baja.', {}],
        ['De una cresta a la siguiente hay un periodo.', { q: 1 }],
        ['Pasado ese tiempo hace lo mismo.', { t: 'se repite cada 6' }],
        ['De cresta a valle hay medio periodo.', {}],
        ['Con el periodo se sabe lo que pasará.', {}],
      ], 'De cresta a cresta: un periodo.'),
      xpHaz('fichas', 'Un péndulo hace 10 idas y vueltas en 40 s. Pon el periodo y el tiempo de cresta a valle.', { slots: fila('periodo', 'medio'), fichas: ['4', '2', '10', '40', '8'], meta: ['4', '2'], alto: 96, pista: 'Divide el tiempo entre las repeticiones.' }, '$40 \\div 10 = 4$ y la mitad, 2.')],
    ['Centro y amplitud',
      xpMira('dibujo', 'Segunda idea: la **amplitud** se mide desde la **línea media**.', { dib: onda, v: { m: 0, a: 0, q: 0, t: 'de 2 a 10' }, alto: 170 }, [
        ['Va de dos a diez.', {}],
        ['La línea media está en seis.', { m: 1 }, '$\\tfrac{2 + 10}{2} = 6$'],
        ['De ahí al máximo hay cuatro.', { a: 1 }, '$10 - 6 = 4$'],
        ['De mínimo a máximo hay dos amplitudes.', {}],
        ['Se escribe seis más cuatro por el seno.', { t: 'y = 6 + 4 sen(…)' }],
      ], 'Centro más y menos amplitud.'),
      xpHaz('fichas', 'Una onda va de 5 a 25. Pon la línea media y la amplitud.', { slots: fila('media', 'amplitud'), fichas: ['15', '10', '20', '30', '5'], meta: ['15', '10'], alto: 96, pista: 'Busca el centro primero.' }, '$\\tfrac{5 + 25}{2} = 15$ y $25 - 15 = 10$.')],
    ['El seno',
      xpMira('hoja', 'Tercera idea: el **seno** es la **altura** de un punto que gira: de **−1 a 1**.', { paras: [['0°: altura 0'], ['30°: la mitad, 0.5'], ['90°: lo más alto, 1'], ['270°: lo más bajo, −1']] }, [
        ['Empieza a la derecha, sin altura.', { luz: [0] }],
        ['A los treinta grados sube la mitad.', { luz: [1] }],
        ['En lo más alto vale uno.', { luz: [2] }],
        ['Abajo vale menos uno.', { luz: [3] }],
        ['Nunca pasa de ahí.', {}],
      ], 'El seno va de −1 a 1.'),
      xpHaz('hoja', 'Subraya el valor que el seno **no** puede tener.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['0.3'], ['−1'], ['1.2']], pista: 'Va de −1 a 1.' }, '1.2 se sale.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un resorte: y = 8 + 3 sen(…). Pon el máximo y el mínimo.', { slots: fila('máximo', 'mínimo'), fichas: ['11', '5', '8', '3', '24'], meta: ['11', '5'], alto: 96, pista: 'El seno llega a 1 y a −1.' }, '$8 + 3$ y $8 - 3$.')],
  ], 'Periodo, centro con amplitud y seno.');

  xpLec('icf-ma-curvas-4', [
    ['Una sola salida',
      xpMira('dibujo', 'Empecemos por la idea: en una **función** cada entrada tiene **una sola** salida.', { dib: maq, v: { r: '2x + 1', x: 3, y: 7, s: 0, t: '' }, alto: 146 }, [
        ['A la máquina entra un tres.', {}],
        ['Sale un siete, siempre.', { s: 1 }, '$2 \\cdot 3 + 1 = 7$'],
        ['Dos entradas pueden dar la misma salida.', { r: 'x²', x: -3, y: 9, t: '3 y −3 dan 9' }],
        ['Pero una entrada no puede dar dos.', { t: 'una entrada, una salida' }],
        ['Si da dos, no es función.', {}],
      ], 'Una entrada, una salida.'),
      xpHaz('hoja', 'Subraya la que **no** es función.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['(1, 5), (2, 5)'], ['(3, 1), (3, 2)'], ['(0, 0), (4, 8)']], pista: 'Busca una entrada repetida.' }, 'El 3 tiene dos salidas.')],
    ['Dominio y rango',
      xpMira('hoja', 'Segunda idea: **dominio**, lo que puede entrar; **rango**, lo que puede salir.', { paras: [['1 ÷ (x − 7): no entra 7'], ['√(x − 1): entra desde 1'], ['x²: sale desde 0'], ['boletas: 0, 1, 2…']] }, [
        ['No se puede dividir entre cero.', { luz: [0], nota: { 0: 'dominio' } }],
        ['Ni sacar raíz cuadrada de un negativo.', { luz: [1], nota: { 1: 'dominio' } }],
        ['Un cuadrado nunca es negativo.', { luz: [2], nota: { 2: 'rango' } }],
        ['El contexto también pone límites.', { luz: [3] }],
        ['No hay media boleta ni menos dos.', {}],
      ], 'Entra: dominio. Sale: rango.'),
      xpHaz('hoja', 'Subraya el valor que **no** puede entrar en 8 ÷ (x + 2).', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['−2'], ['0'], ['2']], pista: 'Busca cuál hace 0 el denominador.' }, '$-2 + 2 = 0$.')],
    ['Cortes',
      xpMira('fichas', 'Tercera idea: sobre un eje, la **otra** coordenada es **0**.', { slots: fila('eje y', 'eje x'), fichas: ['−10', '5'], alto: 96 }, [
        ['Tomemos y igual a dos x menos diez.', {}],
        ['En el eje y, la x es cero.', { pon: { 0: '−10' } }, '$2 \\cdot 0 - 10 = -10$'],
        ['En el eje x, la y es cero.', {}, '$0 = 2x - 10$'],
        ['Se despeja: x es cinco.', { pon: { 1: '5' } }],
        ['Son dos cuentas distintas, una por eje.', {}],
      ], 'Eje y: x = 0. Eje x: y = 0.'),
      xpHaz('fichas', 'y = 3x + 12. Pon el corte con el eje y y con el eje x.', { slots: fila('eje y', 'eje x'), fichas: ['12', '−4', '4', '3', '−12'], meta: ['12', '−4'], alto: 96, pista: 'Cambia por 0 la x y después la y.' }, 'Con $x = 0$, 12; con $y = 0$, $-4$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un taxi cobra 5 + 2k (miles) por k kilómetros, hasta 30 km. Subraya el **rango**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['De 0 a 30'], ['De 0 a 65'], ['De 5 a 65']], pista: 'Halla el menor y el mayor cobro.' }, 'Con 0 km, 5; con 30, 65.')],
  ], 'Una salida, lo que entra y sale, y los cortes.');
}
;
//#archivo js/explora-icf-ma-11.js
// Preicfes · Matemáticas, mundo 11 «Movimientos y Vistas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const U = 20, X = x => 170 + x * U, Y = y => 100 - y * U, red = K => { let h = ''; for (let i = -4; i <= 4; i++) h += K.l(X(i), Y(-4), X(i), Y(4), i ? 'lr' : 'lm') + K.l(X(-4), Y(i), X(4), Y(i), i ? 'lr' : 'lm'); return h; };
  const L = [[1, 1], [3, 1], [1, 3]], poli = (K, ps, c) => K.p(ps.map(([a, b]) => [X(a), Y(b)]), c);
  // Triángulo y su imagen: t traslada, e refleja en y, g gira, k amplía.
  const mov = (v, K) => { const q = v.g * Math.PI / 180, f = ([a, b]) => { let m = a * v.k + v.dx, n = b * v.k + v.dy; m *= v.e; return [m * Math.cos(q) - n * Math.sin(q), m * Math.sin(q) + n * Math.cos(q)]; }; return red(K) + poli(K, L, 'fa') + poli(K, L.map(f), 'fg') + K.t(170, 204, v.t, 'ta'); };
  // Torres vistas.
  const H = [[1, 2], [3, 1]];
  const torres = (v, K) => { let s = ''; for (let r = 1; r >= 0; r--) for (let c = 1; c >= 0; c--) for (let z = 0; z < H[r][c]; z++) s += K.caja(K.iso([96, 150], 26, c, r, z), 26, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); return s + K.f(v.f, [3, 2].map((n, c) => Array.from({ length: n }, (_, z) => K.r(232 + c * 32, 130 - z * 32, 30, 30, 'fa', 2)).join('')).join('') + K.t(263, 182, 'de frente', 's ta')) + K.t(170, 202, v.t, 'ta'); };
  // Tira de cuatro y dos tapas; d enciende las opuestas.
  const CE = [['1', 1, 1], ['2', 2, 1], ['3', 3, 1], ['4', 4, 1], ['5', 2, 0], ['6', 2, 2]], molde = (v, K) => CE.map(([t, c, f], i) => { const par = [0, 2].includes(i) ? v.a : [1, 3].includes(i) ? v.b : v.c; return K.r(40 + c * 46, 14 + f * 46, 44, 44, par > 0.5 ? (i < 2 || i === 4 || i > 0 ? ['fa', 'fg', 'fa', 'fg', 'ff', 'ff'][i] : 'fc') : 'fc', 3) + K.t(62 + c * 46, 42 + f * 46, t, 'b'); }).join('') + K.t(170, 176, v.t, 'ta');
  // Plano polar: giro g y pasos r.
  const polar = (v, K) => { const q = K.at(150, 100, v.r * 24, v.g); return [1, 2, 3].map(i => K.arc(150, 100, i * 24, 0, 360, 'lr')).join('') + K.l(70, 100, 260, 100, 'lm') + K.l(150, 20, 150, 180, 'lm') + K.arc(150, 100, 18, 0, Math.max(0.3, v.g), 'lo gr') + K.l(150, 100, ...q, 'la gr') + K.c(...q, 6, 'fF') + K.t(170, 202, v.t, 'ta'); };

  xpLec('icf-ma-espacio-1', [
    ['Trasladar y reflejar',
      xpMira('dibujo', 'Empecemos por la idea: **trasladar** mueve todo igual; **reflejar** pasa al otro lado.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['Este triángulo está arriba a la derecha.', {}],
        ['Se traslada: cada punto se mueve lo mismo.', { dx: -4, dy: -3, t: '4 a la izquierda, 3 abajo' }],
        ['A cada coordenada se le suma lo suyo.', {}, '$(1, 1) \\to (-3, -2)$'],
        ['Ahora se refleja en el eje vertical.', { dx: 0, dy: 0, e: -1, t: 'reflejo en el eje y' }],
        ['Queda igual de lejos: la x cambia de signo.', {}, '$(3, 1) \\to (-3, 1)$'],
      ], 'Trasladar suma; reflejar cambia un signo.'),
      xpHaz('fichas', 'Pon la imagen de (2, −1) al trasladarlo 3 arriba, y al reflejarlo en el eje x.', { slots: fila('trasladado', 'reflejado'), fichas: ['(2, 2)', '(2, 1)', '(5, −1)', '(−2, −1)'], meta: ['(2, 2)', '(2, 1)'], alto: 96, pista: 'Arriba cambia la y; el eje x cambia su signo.' }, '$-1 + 3 = 2$ y $-1$ pasa a 1.')],
    ['Rotar',
      xpMira('dibujo', 'Segunda idea: al **rotar**, cada punto gira sin cambiar su **distancia** al centro.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['El centro está en el origen.', {}],
        ['Un cuarto de vuelta contra el reloj.', { g: 90, t: '90°' }, '$(3, 1) \\to (-1, 3)$'],
        ['Media vuelta: cambian los dos signos.', { g: 180, t: '180°' }, '$(3, 1) \\to (-3, -1)$'],
        ['Tres cuartos de vuelta.', { g: 270, t: '270°' }],
        ['Los lados y los ángulos no cambiaron.', {}],
      ], 'Gira sin cambiar de tamaño ni de forma.'),
      xpHaz('fichas', 'Pon la imagen de (0, 5) con 90° contra el reloj y con 180°.', { slots: fila('90°', '180°'), fichas: ['(−5, 0)', '(0, −5)', '(5, 0)', '(0, 5)'], meta: ['(−5, 0)', '(0, −5)'], alto: 96, pista: 'Lo de arriba pasa a la izquierda.' }, 'Un cuarto: a la izquierda; media vuelta: abajo.')],
    ['Homotecia',
      xpMira('dibujo', 'Tercera idea: la **homotecia** multiplica las distancias al **centro**.', { dib: mov, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, alto: 212 }, [
        ['Factor uno: queda igual.', { t: 'factor 1' }],
        ['Con la mitad, todo se encoge.', { k: 0.5, t: 'factor 0.5' }, '$(3, 1) \\to (1.5, 0.5)$'],
        ['Con 1.3, se agranda.', { k: 1.3, t: 'factor 1.3' }],
        ['Con factor negativo, pasa al otro lado.', { k: -1, t: 'factor −1' }],
        ['Los lados van por el factor; el área, por su cuadrado.', {}],
      ], 'Lados por k; área por k al cuadrado.'),
      xpHaz('fichas', 'Un cuadrado de lado 3 se amplía con factor 2. Pon el lado y el área nuevos.', { slots: fila('lado', 'área'), fichas: ['6', '36', '18', '9', '5'], meta: ['6', '36'], alto: 96, pista: 'Halla el lado y después el área.' }, '$3 \\cdot 2 = 6$ y $6 \\cdot 6 = 36$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un punto (4, 0) gira 90° contra el reloj y luego se traslada 2 a la derecha. Subraya dónde queda.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['(6, 4)'], ['(2, 4)'], ['(−2, 4)']], pista: 'Haz un movimiento a la vez.' }, '$(4, 0) \\to (0, 4) \\to (2, 4)$.')],
  ], 'Sumar, cambiar signos, girar y multiplicar.');

  xpLec('icf-ma-espacio-2', [
    ['Vistas',
      xpMira('dibujo', 'Empecemos por la idea: de cada lado solo se ve la torre **más alta**.', { dib: torres, v: { f: 0, t: '' }, alto: 210 }, [
        ['Hay cuatro torres: dos adelante y dos atrás.', {}],
        ['Adelante miden uno y dos.', { t: 'adelante: 1 y 2' }],
        ['Atrás miden tres y uno.', { t: 'atrás: 3 y 1' }],
        ['De frente se ven tres y dos.', { f: 1, t: 'la más alta de cada columna' }],
        ['En total hay siete cubos.', {}, '$1 + 2 + 3 + 1 = 7$'],
      ], 'La vista muestra la más alta; el total suma todas.'),
      xpHaz('fichas', 'Una columna tiene torres de 4, 2 y 1. Pon lo que se ve de frente y los cubos que tiene.', { slots: fila('se ve', 'tiene'), fichas: ['4', '7', '2', '1', '8'], meta: ['4', '7'], alto: 96, pista: 'La más alta y la suma.' }, 'Se ve la de 4; hay $4 + 2 + 1 = 7$.')],
    ['Desarrollos',
      xpMira('dibujo', 'Segunda idea: en un molde, **salta una** cara para hallar la **opuesta**.', { dib: molde, v: { a: 0, b: 0, c: 0, t: '' }, alto: 186 }, [
        ['Cuatro caras en fila dan la vuelta.', {}],
        ['La primera y la tercera quedan opuestas.', { a: 1, t: '1 frente a 3' }],
        ['La segunda y la cuarta también.', { b: 1, t: '2 frente a 4' }],
        ['Las tapas, una frente a la otra.', { c: 1, t: '5 frente a 6' }],
        ['Dos caras opuestas nunca se tocan.', {}],
      ], 'En fila, salta una.'),
      xpHaz('hoja', 'En una tira M-N-O-P de un cubo, subraya la opuesta de **N**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['M'], ['O'], ['P']], pista: 'Salta una cara.' }, 'N, se salta O, y sigue P.')],
    ['Otros cuerpos',
      xpMira('hoja', 'Tercera idea: cada cuerpo tiene su **molde**.', { paras: [['Prisma: dos bases y rectángulos'], ['Pirámide: una base y triángulos'], ['Cilindro: dos círculos y un rectángulo'], ['Cono: un círculo y un sector']] }, [
        ['Un rectángulo por cada lado de la base.', { luz: [0] }],
        ['Un triángulo por cada lado de la base.', { luz: [1] }],
        ['El rectángulo da la vuelta al círculo.', { luz: [2] }],
        ['El sector se cierra en punta.', { luz: [3] }],
        ['Al doblarlo no debe sobrar ni faltar cara.', {}],
      ], 'Cuenta bases y caras.'),
      xpHaz('fichas', 'Prisma de base hexagonal. Pon cuántos hexágonos y cuántos rectángulos lleva su molde.', { slots: fila('hexágonos', 'rectángulos'), fichas: ['2', '6', '1', '8', '4'], meta: ['2', '6'], alto: 96, pista: 'Dos bases y una cara por lado.' }, 'Dos bases y seis caras.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'De frente se ve un rectángulo y desde arriba un círculo. Subraya el cuerpo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cilindro'], ['Cono'], ['Esfera']], pista: 'Descarta por la vista de frente.' }, 'El cono se vería como triángulo y la esfera, como círculo.')],
  ], 'La más alta, salta una y cada cuerpo con su molde.');

  xpLec('icf-ma-espacio-3', [
    ['Cartesianas',
      xpMira('hoja', 'Empecemos por la idea: con **restas** se hallan lados y con **promedios**, el medio.', { paras: [['A (1, 2) y B (7, 10)'], ['lado 6 y alto 8'], ['distancia 10'], ['medio (4, 6)']] }, [
        ['Dos puntos en el plano.', { luz: [0] }],
        ['Se restan las x y se restan las y.', { luz: [1] }, '$7 - 1 = 6, \\; 10 - 2 = 8$'],
        ['Con Pitágoras sale la distancia.', { luz: [2] }, '$\\sqrt{36 + 64} = 10$'],
        ['Con promedios, el punto medio.', { luz: [3] }, '$\\tfrac{1 + 7}{2} = 4$'],
        ['Restar para medir, promediar para el medio.', {}],
      ], 'Restar para medir; promediar para el medio.'),
      xpHaz('fichas', 'De (2, 1) a (5, 5). Pon la distancia y la x del punto medio.', { slots: fila('distancia', 'x del medio'), fichas: ['5', '3.5', '7', '3', '4'], meta: ['5', '3.5'], alto: 96, pista: 'Los lados miden 3 y 4.' }, '$\\sqrt{9 + 16} = 5$ y $\\tfrac{2 + 5}{2} = 3.5$.')],
    ['Polares',
      xpMira('dibujo', 'Segunda idea: en **polares** se **gira** y se **camina**.', { dib: polar, v: { g: 0, r: 2, t: '' }, alto: 210 }, [
        ['Se empieza mirando a la derecha.', { t: '2 pasos a 0°' }],
        ['Un cuarto de vuelta: arriba.', { g: 90, t: '2 pasos a 90°' }],
        ['Media vuelta: a la izquierda.', { g: 180, r: 3, t: '3 pasos a 180°' }],
        ['Se gira contra el reloj.', { g: 225, t: '3 pasos a 225°' }],
        ['Una vuelta más no cambia nada.', {}, '$225 + 360 = 585$'],
      ], 'Giro desde la derecha y pasos.'),
      xpHaz('hoja', 'Subraya el punto polar de (0, 7).', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['7 pasos a 0°'], ['7 pasos a 90°'], ['90 pasos a 7°']], pista: '¿Hacia dónde está?' }, 'Está arriba: un cuarto de vuelta.')],
    ['En el espacio',
      xpMira('fichas', 'Tercera idea: en **3D** se agrega la **altura**, z.', { slots: fila('x', 'y', 'z'), fichas: ['4', '2', '5'], alto: 96 }, [
        ['Un bombillo está en una sala.', {}],
        ['Cuatro metros hacia la derecha.', { pon: { 0: '4' } }],
        ['Dos metros hacia el fondo.', { pon: { 1: '2' } }],
        ['Y cinco de altura.', { pon: { 2: '5' } }, '$(4, 2, 5)$'],
        ['La distancia suma tres cuadrados.', {}, '$\\sqrt{16 + 4 + 25}$'],
      ], 'Derecha, fondo y altura.'),
      xpHaz('fichas', 'De (0, 0, 0) a (2, 6, 9). Pon la suma de los cuadrados y la distancia.', { slots: fila('suma', 'distancia'), fichas: ['121', '11', '17', '81', '9'], meta: ['121', '11'], alto: 96, pista: 'Suma 4, 36 y 81.' }, '$\\sqrt{121} = 11$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un barco está a 8 pasos, a 270° del faro. Subraya dónde está.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Al norte (arriba)'], ['Al oeste (izquierda)'], ['Al sur (abajo)']], pista: 'Tres cuartos de vuelta desde la derecha.' }, 'Derecha, arriba, izquierda, abajo.')],
  ], 'Restar, girar y agregar la altura.');
}
;
//#archivo js/explora-icf-ma-12.js
// Preicfes · Matemáticas, mundos 12 «Dispersión y Comparación» y 13 «Números y Sucesiones» (Explora). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const eje = (K, y) => { const X = x => 30 + x * 28; let h = K.l(30, y, 310, y, 'lm'); for (let i = 0; i <= 10; i++) h += K.t(X(i), y + 18, i, 's tm'); return [X, h]; };
  // Tres datos alrededor del 5, a distancia s; m enciende el promedio y c los cuadrados.
  const datos = (v, K) => { const [X, h] = eje(K, 110); return h + K.f(v.c, K.r(X(5), 110 - v.s * 28, v.s * 28, v.s * 28, 'fg', 0)) + [5 - v.s, 5, 5 + v.s].map(x => K.c(X(x), 98, 7, 'fa')).join('') + K.f(v.m, K.l(X(5), 40, X(5), 110, 'lo d') + K.t(X(5) - 8, 44, 'promedio', 's tm', 'end')) + K.t(170, 152, v.t, 'ta'); };
  // Caja 1-3-5-8-10: k tramos encendidos.
  const caja = (v, K) => { const [X, h] = eje(K, 110), Q = [1, 3, 5, 8, 10]; return h + K.l(X(1), 70, X(10), 70, 'gr') + K.r(X(3), 54, X(8) - X(3), 32, 'fa', 2) + K.l(X(5), 54, X(5), 86, 'lg gr') + [0, 1, 2, 3].map(i => K.f(v.k - i, K.l(X(Q[i]), 34, X(Q[i + 1]), 34, i % 2 ? 'lo gr' : 'la gr') + K.t((X(Q[i]) + X(Q[i + 1])) / 2, 26, '25 %', 's'))).join('') + K.t(170, 152, v.t, 'ta'); };
  // Nube con pendiente s (1, −1 o 0) y línea l.
  const R = [0.4, -0.5, 0.2, -0.3, 0.5, -0.2, 0.3, -0.4], nube = (v, K) => { const X = x => 50 + x * 27, Y = y => 130 - y * 13; return K.l(40, 130, 310, 130, 'lm') + K.l(40, 10, 40, 130, 'lm') + R.map((r, i) => K.c(X(i + 1), Y(4.5 + v.s * (i - 3.5) + r * (2 + 5 * v.d)), 5, 'fa')).join('') + K.f(v.l, K.l(X(0.5), Y(4.5 - v.s * 4), X(8.5), Y(4.5 + v.s * 4), 'lg d')) + K.t(170, 156, v.t, 'ta'); };
  // Dos círculos con zonas: n solo A, centro, solo B, fuera.
  const venn = (v, K) => K.r(16, 8, 308, 130, 'fn', 6) + K.c(134, 73, 52, 'fa') + K.c(206, 73, 52, 'fg') + K.t(84, 28, 'A', 'b ta') + K.t(256, 28, 'B', 'b tg') + K.f(v.b, K.t(170, 78, '4', 'b')) + K.f(v.a, K.t(112, 78, '6', 'b') + K.t(228, 78, '3', 'b')) + K.f(v.u, K.t(300, 128, '7', 'b')) + K.t(170, 162, v.t, 'ta');
  // Camino que recorre la mitad de lo que falta.
  const mitad = (v, K) => { const q = 1 - 0.5 ** v.n; return K.l(30, 80, 310, 80, 'lm') + K.r(30, 70, 280 * q, 20, 'fa', 2) + K.t(30, 108, '0', 's') + K.t(310, 108, '1', 's') + K.t(170, 140, v.t, 'ta'); };

  xpLec('icf-ma-dispersion-1', [
    ['Regados o juntos',
      xpMira('dibujo', 'Empecemos por la idea: con el **mismo promedio**, los datos pueden estar juntos o **regados**.', { dib: datos, v: { s: 1, m: 0, c: 0, t: '' }, alto: 162 }, [
        ['Tres datos: cuatro, cinco y seis.', { m: 1 }],
        ['Ahora tres, cinco y siete: igual promedio.', { s: 2 }],
        ['Y uno, cinco y nueve: más regados.', { s: 4, t: 'mismo promedio, más dispersión' }],
        ['El rango mira solo los extremos.', {}, '$9 - 1 = 8$'],
        ['Hace falta mirar a todos los datos.', {}],
      ], 'Rango: el mayor menos el menor.'),
      xpHaz('fichas', 'Datos 2, 6, 7 y 13. Pon el promedio y el rango.', { slots: fila('promedio', 'rango'), fichas: ['7', '11', '6.5', '13', '28'], meta: ['7', '11'], alto: 96, pista: 'Suma y reparte; resta los extremos.' }, '$28 \\div 4 = 7$ y $13 - 2 = 11$.')],
    ['Varianza',
      xpMira('dibujo', 'Segunda idea: la **varianza** promedia los **cuadrados** de las desviaciones.', { dib: datos, v: { s: 2, m: 1, c: 0, t: '' }, alto: 162 }, [
        ['Las desviaciones son menos dos, cero y dos.', {}],
        ['Suman cero: por eso no sirven solas.', {}, '$-2 + 0 + 2 = 0$'],
        ['Se elevan al cuadrado.', { c: 1 }, '$4 + 0 + 4 = 8$'],
        ['Y esos cuadrados se promedian.', { t: 'varianza: 8 entre 3' }, '$8 \\div 3 \\approx 2.67$'],
        ['Más lejos, cuadrados más grandes.', { s: 3, t: 'varianza: 18 entre 3' }],
      ], 'Restar, elevar, promediar.'),
      xpHaz('fichas', 'Datos 4 y 10. Pon la suma de los cuadrados de las desviaciones y la varianza.', { slots: fila('suma', 'varianza'), fichas: ['18', '9', '6', '3', '36'], meta: ['18', '9'], alto: 96, pista: 'El promedio es 7: se apartan 3.' }, '$9 + 9 = 18$ y $18 \\div 2 = 9$.')],
    ['Desviación estándar',
      xpMira('hoja', 'Tercera idea: la **desviación estándar** es la **raíz** de la varianza.', { paras: [['Varianza 25 → desviación 5'], ['Sumar 100 a todos: no cambia'], ['Multiplicar todos por 3: se triplica'], ['Menor desviación: más parejo']] }, [
        ['Vuelve a la unidad de los datos.', { luz: [0] }],
        ['Correr los datos no los separa.', { luz: [1] }],
        ['Multiplicar sí los separa.', { luz: [2] }],
        ['Sirve para saber quién es más regular.', { luz: [3] }],
        ['No dice quién es mejor, sino más parejo.', {}],
      ], 'Raíz de la varianza.'),
      xpHaz('hoja', 'Dos máquinas llenan botellas de 500 mL en promedio. Subraya la **más confiable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Desviación de 1 mL'], ['Desviación de 12 mL'], ['Da igual: mismo promedio']], pista: 'Busca la que varía menos.' }, 'Varía menos: casi todas quedan cerca de 500.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'La varianza de unos tiempos (en s) es 36. Pon la desviación, y la desviación si todos tardan 4 s más.', { slots: fila('desviación', 'con 4 s más'), fichas: ['6', '6', '10', '18', '40'], meta: ['6', '6'], alto: 96, pista: 'Correr los datos no los separa.' }, '$\\sqrt{36} = 6$, y no cambia.')],
  ], 'Rango, cuadrados y raíz.');

  xpLec('icf-ma-dispersion-2', [
    ['Percentil',
      xpMira('hoja', 'Empecemos por la idea: el **percentil** dice qué porcentaje queda **por debajo**.', { paras: [['200 personas'], ['150 por debajo de Ana'], ['150 ÷ 200 = 75 %'], ['Percentil 75']] }, [
        ['Doscientas personas hicieron una prueba.', { luz: [0] }],
        ['Ciento cincuenta sacaron menos que Ana.', { luz: [1] }],
        ['Se divide entre el total.', { luz: [2] }],
        ['Ana está en el percentil 75.', { luz: [3] }],
        ['No es su nota: es su lugar entre los demás.', {}],
      ], 'Los de abajo entre el total.'),
      xpHaz('fichas', 'De 80 personas, 60 están por debajo. Pon el percentil y cuántas no están por debajo.', { slots: fila('percentil', 'no están'), fichas: ['75', '20', '60', '80', '25'], meta: ['75', '20'], alto: 96, pista: 'Divide 60 entre 80.' }, '$60 \\div 80 = 75\\%$ y $80 - 60 = 20$.')],
    ['La caja',
      xpMira('dibujo', 'Segunda idea: la caja parte los datos en **cuatro** grupos **iguales**.', { dib: caja, v: { k: 0, t: '' }, alto: 162 }, [
        ['Bigotes en uno y diez; caja de tres a ocho.', {}],
        ['La cuarta parte está hasta el primer corte.', { k: 1 }],
        ['La línea de adentro es la mediana.', { k: 2, t: 'mediana 5' }],
        ['La caja guarda la mitad central.', { k: 3, t: 'de 3 a 8: la mitad' }],
        ['Cada tramo tiene igual cantidad de datos.', { k: 4, t: 'tramo largo: más regados' }],
      ], 'Cuatro tramos, un cuarto en cada uno.'),
      xpHaz('fichas', 'Cuartiles 8, 11 y 20. Pon el largo de la caja y el porcentaje de datos hasta 11.', { slots: fila('caja', '%'), fichas: ['12', '50', '9', '25', '75'], meta: ['12', '50'], alto: 96, pista: '11 es la mediana.' }, '$20 - 8 = 12$ y la mitad queda hasta 11.')],
    ['Hallar los cortes',
      xpMira('fichas', 'Tercera idea: se **ordena** y se busca el **medio** de cada mitad.', { slots: fila('Q1', 'mediana', 'Q3'), fichas: ['3', '6', '11'], alto: 96 }, [
        ['Datos en orden: 2, 3, 5, 6, 9, 11 y 14.', {}],
        ['El del medio es seis.', { pon: { 1: '6' } }],
        ['A la izquierda: 2, 3 y 5. Su medio es tres.', { pon: { 0: '3' } }],
        ['A la derecha: 9, 11 y 14. Su medio es once.', { pon: { 2: '11' } }],
        ['La caja mide ocho.', {}, '$11 - 3 = 8$'],
      ], 'Ordenar, el medio y el medio de cada mitad.'),
      xpHaz('fichas', 'Datos: 1, 4, 4, 7, 8, 10 y 13. Pon el primer cuartil y la mediana.', { slots: fila('Q1', 'mediana'), fichas: ['4', '7', '8', '10', '1'], meta: ['4', '7'], alto: 96, pista: 'El del medio y el medio de los tres primeros.' }, 'El cuarto es 7; el medio de 1, 4 y 4 es 4.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'La caja de M va de 30 a 34; la de N, de 20 a 45. Subraya lo que se puede asegurar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['N tiene más datos'], ['La mitad central de M es más pareja'], ['M tiene mayor promedio']], pista: 'Compara el largo de las cajas.' }, 'La caja de M es más corta; lo demás no se sabe.')],
  ], 'Por debajo, cuatro tramos y el medio de cada mitad.');

  xpLec('icf-ma-dispersion-3', [
    ['La nube',
      xpMira('dibujo', 'Empecemos por la idea: en la **nube**, cada punto es un caso con **dos** datos.', { dib: nube, v: { s: 0.9, d: 0, l: 0, t: '' }, alto: 166 }, [
        ['Estos puntos suben de izquierda a derecha.', { t: 'correlación positiva' }],
        ['La línea de tendencia pasa por la mitad.', { l: 1 }],
        ['Si bajan, la correlación es negativa.', { s: -0.9, t: 'correlación negativa' }],
        ['Si no hay rumbo, casi no hay relación.', { s: 0, d: 1, l: 0, t: 'casi ninguna' }],
        ['Con la línea se puede predecir.', { s: 0.9, d: 0, l: 1, t: 'predecir' }],
      ], 'Sube, baja o no tiene rumbo.'),
      xpHaz('hoja', 'Subraya el par con correlación **negativa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Estudio y nota'], ['Velocidad y tiempo de viaje'], ['Estatura y talla de zapato']], pista: 'Una sube y la otra baja.' }, 'Más rápido, menos tiempo.')],
    ['Qué tan fuerte',
      xpMira('dibujo', 'Segunda idea: el **coeficiente** va de **−1 a 1**; cerca de los extremos es **fuerte**.', { dib: nube, v: { s: 1, d: -0.4, l: 1, t: 'r = 1' }, alto: 166 }, [
        ['Todos en línea y subiendo: uno.', {}],
        ['Algo regados: cerca de 0.9.', { d: 0.2, t: 'r ≈ 0.9' }],
        ['Muy regados: mucho más débil.', { s: 0.4, d: 0.6, t: 'r ≈ 0.3' }],
        ['En línea y bajando: menos uno.', { s: -1, d: -0.4, t: 'r = −1' }],
        ['El signo da el sentido, no la fuerza.', {}],
      ], 'Signo: sentido. Cercanía a 1 o −1: fuerza.'),
      xpHaz('hoja', 'Subraya la correlación **más fuerte**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['0.6'], ['0.1'], ['−0.92']], pista: 'No mires el signo: mira qué tan lejos está de 0.' }, '−0.92 está más cerca de −1.')],
    ['No es causa',
      xpMira('hoja', 'Tercera idea: **ir juntas no es causar**.', { paras: [['Más paraguas, más choques'], ['¿Los paraguas chocan carros?'], ['La lluvia explica las dos'], ['Para hablar de causa: experimento']] }, [
        ['Los días con más paraguas hay más choques.', { luz: [0] }],
        ['Pero los paraguas no tienen la culpa.', { luz: [1], tacha: [1] }],
        ['Una tercera cosa mueve a las dos.', { luz: [2] }],
        ['Un experimento cambia una sola cosa.', { luz: [3] }],
        ['También puede ser pura casualidad.', {}],
      ], 'Busca la tercera cosa.'),
      xpHaz('hoja', 'Los pueblos con más cigüeñas tienen más bebés. Subraya la mejor explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los pueblos grandes tienen más techos y más familias'], ['Las cigüeñas traen bebés'], ['Los bebés atraen cigüeñas']], pista: '¿Qué hace aumentar las dos cosas?' }, 'El tamaño del pueblo explica las dos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'La tendencia es y = 2x + 15. Pon lo que predice para x = 10 y el x en que predice 25.', { slots: fila('x = 10', 'y = 25'), fichas: ['35', '5', '25', '10', '65'], meta: ['35', '5'], alto: 96, pista: 'Reemplaza y después despeja.' }, '$20 + 15 = 35$ y $(25 - 15) \\div 2 = 5$.')],
  ], 'Rumbo, fuerza y cuidado con la causa.');

  xpLec('icf-ma-numeros-1', [
    ['El mismo número',
      xpMira('hoja', 'Empecemos por la idea: una fracción, un decimal y un porcentaje pueden ser el **mismo** número.', { paras: [['2/5 = 4/10'], ['= 0.4'], ['= 40 %'], ['1/3 = 0.333…'], ['√3 = 1.7320508…']] }, [
        ['Dos quintos son cuatro décimos.', { luz: [0] }],
        ['Es decir, cero punto cuatro.', { luz: [1] }],
        ['O cuarenta de cada cien.', { luz: [2] }],
        ['Un tercio se repite: es racional.', { luz: [3], nota: { 3: 'racional' } }],
        ['Este ni termina ni se repite.', { luz: [4], nota: { 4: 'irracional' } }],
      ], 'La raya de la fracción es una división.'),
      xpHaz('fichas', 'Pon 9/20 como decimal y 0.08 como porcentaje.', { slots: fila('9/20', '0.08'), fichas: ['0.45', '8 %', '0.92', '80 %', '9.20'], meta: ['0.45', '8 %'], alto: 96, pista: 'Lleva 9/20 a denominador 100.' }, '$\\tfrac{45}{100}$ y $\\tfrac{8}{100}$.')],
    ['Sumar y multiplicar',
      xpMira('hoja', 'Segunda idea: para **sumar** hacen falta partes **iguales**; para **multiplicar**, no.', { paras: [['1/2 + 1/5'], ['5/10 + 2/10'], ['7/10'], ['2/3 de 3/5 = 6/15 = 2/5']] }, [
        ['Medios y quintos son de distinto tamaño.', { luz: [0] }],
        ['Se pasan todos a décimos.', { luz: [1] }],
        ['Y se suman: siete décimos.', { luz: [2] }],
        ['«De» se vuelve multiplicación.', { luz: [3] }],
        ['Se multiplica arriba y abajo.', { luz: [3] }],
      ], 'Sumar: igualar partes. De: multiplicar.'),
      xpHaz('fichas', 'Pon 1/4 + 1/6, y 3/4 de 2/3.', { slots: fila('suma', 'de'), fichas: ['5/12', '1/2', '2/10', '5/7', '1/12'], meta: ['5/12', '1/2'], alto: 96, pista: 'Usa doceavos en la suma.' }, '$\\tfrac{3 + 2}{12}$ y $\\tfrac{6}{12}$.')],
    ['Notación científica',
      xpMira('fichas', 'Tercera idea: un número **entre 1 y 10** por una **potencia de 10**.', { slots: fila('número', 'potencia'), fichas: ['7.2', '10⁶'], alto: 96 }, [
        ['Siete millones doscientos mil.', {}, '$7\\,200\\,000$'],
        ['El número queda entre uno y diez.', { pon: { 0: '7.2' } }],
        ['La coma corrió seis lugares.', { pon: { 1: '10⁶' } }, '$7.2 \\cdot 10^6$'],
        ['Los pequeños llevan exponente negativo.', {}, '$0.003 = 3 \\cdot 10^{-3}$'],
        ['Al multiplicar, los exponentes se suman.', {}, '$10^6 \\cdot 10^2 = 10^8$'],
      ], 'Grandes: positivo. Pequeños: negativo.'),
      xpHaz('fichas', 'Pon el exponente de 950 000 y el de 0.00095, con 9.5 adelante.', { slots: fila('950 000', '0.00095'), fichas: ['5', '−4', '4', '−5', '6'], meta: ['5', '−4'], alto: 96, pista: 'Cuenta los lugares que corre la coma.' }, '$9.5 \\cdot 10^5$ y $9.5 \\cdot 10^{-4}$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un libro de 2 · 10² hojas mide 2 · 10⁻² m de grueso. Subraya el grueso de cada hoja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['10⁴ m'], ['10⁻⁴ m'], ['4 · 10⁰ m']], pista: 'Divide y resta los exponentes.' }, '$\\tfrac{2}{2} = 1$ y $-2 - 2 = -4$.')],
  ], 'El mismo número, partes iguales y potencias.');

  xpLec('icf-ma-numeros-2', [
    ['Cuatro zonas',
      xpMira('dibujo', 'Empecemos por la idea: con **dos** grupos hay **cuatro** zonas.', { dib: venn, v: { a: 0, b: 0, u: 0, t: '' }, alto: 172 }, [
        ['Veinte personas; diez en A y siete en B.', { t: '20 en total' }],
        ['Cuatro están en los dos: al centro.', { b: 1 }],
        ['Quedan seis solo en A y tres solo en B.', { a: 1 }, '$10 - 4 \\; y \\; 7 - 4$'],
        ['Los demás quedan afuera.', { u: 1 }, '$20 - 13 = 7$'],
        ['Se llena del centro hacia afuera.', { t: 'del centro hacia afuera' }],
      ], 'Centro, lunas y afuera.'),
      xpHaz('fichas', 'De 30: 18 en A, 14 en B y 8 en los dos. Pon solo A y los de afuera.', { slots: fila('solo A', 'afuera'), fichas: ['10', '6', '18', '8', '2'], meta: ['10', '6'], alto: 96, pista: 'Empieza por el centro.' }, '$18 - 8 = 10$; $30 - 24 = 6$.')],
    ['Operaciones',
      xpMira('hoja', 'Segunda idea: **unión**, **intersección**, **diferencia** y **complemento**.', { paras: [['A = {1, 2, 3, 4}, B = {3, 4, 5}'], ['Unión: {1, 2, 3, 4, 5}'], ['Intersección: {3, 4}'], ['A − B: {1, 2}'], ['Complemento de A: lo que no está en A']] }, [
        ['Dos conjuntos con elementos comunes.', { luz: [0] }],
        ['En alguno de los dos, sin repetir.', { luz: [1] }],
        ['En los dos a la vez.', { luz: [2] }],
        ['En A, pero no en B.', { luz: [3] }],
        ['Todo lo demás del universo.', { luz: [4] }],
      ], 'Alguno, los dos, uno y no el otro, lo demás.'),
      xpHaz('hoja', 'P = {a, e, o} y Q = {e, i}. Subraya **P − Q**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['{e}'], ['{i}'], ['{a, o}']], pista: 'Quita de P lo que también está en Q.' }, 'La e está en los dos: quedan a y o.')],
    ['Contar la unión',
      xpMira('fichas', 'Tercera idea: al sumar, los **repetidos** se cuentan **dos** veces.', { slots: fila('A', 'B', 'en alguno'), fichas: ['12', '9', '16'], alto: 96 }, [
        ['Doce cantan y nueve bailan.', { pon: { 0: '12', 1: '9' } }],
        ['Cinco hacen las dos cosas.', {}],
        ['Al sumar se contaron dos veces.', {}, '$12 + 9 = 21$'],
        ['Se quitan una vez.', { pon: { 2: '16' } }, '$21 - 5 = 16$'],
        ['Con esa cuenta también se halla el cruce.', {}, '$12 + 9 - 16 = 5$'],
      ], 'Sumar y quitar una vez lo repetido.'),
      xpHaz('fichas', 'En alguno hay 40; A tiene 25 y B, 23. Pon los de los dos y los de solo B.', { slots: fila('los dos', 'solo B'), fichas: ['8', '15', '48', '17', '23'], meta: ['8', '15'], alto: 96, pista: 'Suma y resta lo que pasa de 40.' }, '$48 - 40 = 8$ y $23 - 8 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'De 100 hogares, 70 tienen internet y 50 televisión por cable; 15 no tienen nada. Subraya cuántos tienen las dos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['20'], ['35'], ['85']], pista: 'Quita primero los 15.' }, '$70 + 50 - 85 = 35$.')],
  ], 'Zonas, operaciones y repetidos.');

  xpLec('icf-ma-numeros-3', [
    ['Sumar lo mismo',
      xpMira('fichas', 'Empecemos por la idea: en la **aritmética** siempre se **suma** lo mismo.', { slots: fila('lugar 1', 'lugar 2', 'lugar 10'), fichas: ['4', '10', '58'], alto: 96 }, [
        ['Empieza en cuatro y suma seis.', { pon: { 0: '4' } }],
        ['El segundo es diez.', { pon: { 1: '10' } }],
        ['Al lugar diez se llega con nueve saltos.', {}, '$9 \\cdot 6 = 54$'],
        ['Cuatro más 54 son 58.', { pon: { 2: '58' } }],
        ['Siempre un salto menos que el lugar.', {}],
      ], 'Primero más (lugar − 1) saltos.'),
      xpHaz('fichas', '9, 13, 17… Pon el salto y el término del lugar 6.', { slots: fila('salto', 'lugar 6'), fichas: ['4', '29', '33', '24', '6'], meta: ['4', '29'], alto: 96, pista: 'Son cinco saltos.' }, '$9 + 5 \\cdot 4 = 29$.')],
    ['Multiplicar por lo mismo',
      xpMira('hoja', 'Segunda idea: en la **geométrica** siempre se **multiplica** por lo mismo.', { paras: [['5, 10, 20, 40: por 2'], ['81, 27, 9, 3: por 1/3'], ['Lugar 5 de la primera: 5 · 2⁴ = 80'], ['1, 3, 6, 10: ninguna de las dos']] }, [
        ['Se divide uno entre el anterior: dos.', { luz: [0] }],
        ['También puede ir bajando.', { luz: [1] }],
        ['Cuatro pasos para el lugar cinco.', { luz: [2] }],
        ['Los saltos crecen: no es ni una ni otra.', { luz: [3] }],
        ['Resta y divide para saber.', {}],
      ], 'Primero por razón a la (lugar − 1).'),
      xpHaz('fichas', '2, 10, 50… Pon la razón y el lugar 5.', { slots: fila('razón', 'lugar 5'), fichas: ['5', '1250', '250', '8', '6250'], meta: ['5', '1250'], alto: 96, pista: 'Multiplica por 5 cuatro veces.' }, '$2 \\cdot 5^4 = 1\\,250$.')],
    ['El límite',
      xpMira('dibujo', 'Tercera idea: algunas sucesiones se **acercan** a un número sin pasarlo.', { dib: mitad, v: { n: 0, t: '' }, alto: 150 }, [
        ['Cada paso recorre la mitad de lo que falta.', {}],
        ['Primero se recorre la mitad.', { n: 1, t: '1/2' }, '$\\tfrac12$'],
        ['Luego van tres cuartos del camino.', { n: 2, t: '3/4' }],
        ['Luego van siete octavos del camino.', { n: 3, t: '7/8' }],
        ['Se acerca a uno todo lo que se quiera.', { n: 8, t: 'se acerca a 1' }],
      ], 'El límite es a donde se acerca.'),
      xpHaz('hoja', 'Subraya a qué se acerca 7 − 1/n.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['7'], ['6'], ['0']], pista: 'Piensa en un n enorme.' }, 'La fracción casi desaparece.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un remedio: 20 mg hoy y cada día la mitad. Subraya a cuánto se acerca el total.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['30 mg'], ['40 mg'], ['Crece sin parar']], pista: 'Siempre falta lo último que se tomó.' }, '$20 + 10 + 5 + \\ldots$ se acerca a 40.')],
  ], 'Sumar, multiplicar y acercarse.');
}
;
//#archivo js/explora-icf-lc.js
// Preicfes · Lectura Crítica, mundo 1 «Lo que Dice el Texto» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-literal-1', [
  ['Volver al texto',
    xpMira('hoja', 'Empecemos por la idea: la respuesta casi siempre **está escrita**. Hay que volver a buscarla.', { paras: [['La feria abre los jueves.', 'Desde agosto, también los domingos.'], ['Los puestos de comida cierran a las seis.']] }, [
      ['Te preguntan: ¿qué días abre la feria?', {}],
      ['De memoria dirías «los jueves».', { luz: [0] }],
      ['Pero el texto agrega algo: también los domingos.', { luz: [1], sello: { 1: 'dato' } }],
      ['Con las dos oraciones la respuesta está completa.', { luz: [0, 1] }],
      ['Recordar no es lo mismo que leer: vuelve y señala.', {}],
    ], 'La respuesta se señala con el dedo en el texto, no se recuerda.'),
    xpHaz('hoja', 'Subraya la oración que dice **por qué** cerró la biblioteca.', { modo: 'toca', meta: [2], paras: [['La biblioteca cerró el lunes.', 'Tenía doce mil libros.'], ['Una gotera dañó el techo de la sala.', 'Volverá a abrir en marzo.']], pista: 'Esa no dice la causa del cierre.' }, 'El dato que responde «por qué» es la causa.')],
  ['Qué hace cada párrafo',
    xpMira('hoja', 'Segunda idea: cada párrafo tiene un **oficio** dentro del texto.', { paras: [['Cada año se botan toneladas de ropa.'], ['Pasa porque sale muy barata y dura poco.'], ['En un barrio abrieron un taller para remendar.'], ['Reparar es la mejor manera de no comprar.']] }, [
      ['El primero muestra un problema.', { luz: [0], nota: { 0: 'problema' } }],
      ['El segundo dice por qué pasa.', { luz: [1], nota: { 1: 'causa' } }],
      ['El tercero da un ejemplo de salida.', { luz: [2], nota: { 2: 'ejemplo' } }],
      ['El último recoge todo en una idea.', { luz: [3], nota: { 3: 'conclusión' } }],
      ['Con ese mapa sabes a qué párrafo volver.', {}],
    ], 'No preguntes de qué habla un párrafo: pregunta qué hace.'),
    xpHaz('hoja', 'Pon al margen qué hace cada párrafo.', { modo: 'margen', rotulos: ['propone', 'plantea el problema', 'da un ejemplo'], meta: [1, 2, 0], paras: [['El parque está oscuro de noche.'], ['El viernes, por ejemplo, un niño se cayó.'], ['La junta debería poner tres lámparas.']], pista: 'Alguno no va ahí. Busca «por ejemplo» y «debería».' }, 'Las palabras «por ejemplo» y «debería» delatan el oficio.')],
  ['Dice, se deduce o no está',
    xpMira('hoja', 'Tercera idea: una opción puede estar **escrita**, **deducirse** o ser **inventada**.', { letras: ['1', 'a', 'b', 'c'], paras: [['El tren salió a las ocho y llegó a las once.'], ['El tren salió a las ocho.'], ['El viaje duró tres horas.'], ['El tren iba lleno.']] }, [
      ['Arriba está todo lo que sabemos.', { luz: [0] }],
      ['Que salió a las ocho está escrito.', { luz: [0, 1], nota: { 1: 'lo dice' } }],
      ['Que duró tres horas sale de juntar las dos horas.', { luz: [0, 2], nota: { 2: 'se deduce' } }],
      ['Que iba lleno no sale de ninguna parte.', { luz: [3], nota: { 3: 'no está' } }],
      ['Sonar posible no basta: hay que poder señalar de dónde sale.', {}],
    ], 'Si no puedes señalar de dónde sale, la opción es inventada.'),
    xpHaz('hoja', 'Texto: «Nora riega el jardín cada noche desde que no llueve». **Tacha** las dos inventadas.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Nora riega de noche.'], ['Nora odia el verano.'], ['Cuando llovía no regaba todas las noches.'], ['El jardín es de su abuela.']], pista: 'Alguna de las tachadas sale de «desde que no llueve».' }, 'Lo del verano y la abuela suena posible, pero nadie lo escribió.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La rana vive en el páramo, canta al amanecer y come mosquitos». De la rana se dice todo, **EXCEPTO**… Subráyala.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Dónde vive'], ['Cuándo canta'], ['Cuánto mide'], ['Qué come']], pista: 'Esa sí está en la oración. Busca la que se queda sin lugar.' }, 'En un EXCEPTO, la respuesta es la que no encuentras.')],
], 'Vuelve al texto, usa el mapa de párrafos y pide siempre la prueba escrita.');

xpLec('icf-lc-literal-2', [
  ['La palabra en su lugar',
    xpMira('hoja', 'Empecemos por la idea: una palabra vale lo que vale **en esa oración**.', { letras: ['A', 'B', 'C'], paras: [['El río', 'corre', 'hacia el sur.'], ['Ana', 'corre', 'con los gastos.'], ['El rumor', 'corre', 'por el barrio.']] }, [
      ['Tres veces la misma palabra.', { luz: [1, 4, 7] }],
      ['El río corre: fluye.', { luz: [0, 1, 2], nota: { 0: 'fluye' } }],
      ['Ana corre con los gastos: los paga.', { luz: [3, 4, 5], nota: { 1: 'paga' } }],
      ['El rumor corre: se extiende.', { luz: [6, 7, 8], nota: { 2: 'se extiende' } }],
      ['La prueba: cambia la palabra y lee la oración completa.', {}],
    ], 'Prueba cada opción en la oración: se queda la que no cambia el sentido.'),
    xpHaz('hoja', 'Pon al margen lo que significa «levantar» en cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['construir', 'alzar', 'despertar'], meta: [1, 2, 0], paras: [['Levantar la caja del piso.'], ['Levantar al niño a las seis.'], ['Levantar una casa en un año.']], pista: 'Alguna no encaja: ponla en la oración y léela.' }, 'Caja, niño y casa dicen cuál es el sentido.')],
  ['Hilos hacia atrás',
    xpMira('hoja', 'Segunda idea: palabras como «ella», «lo» o «este» **apuntan** a algo ya dicho.', { paras: [['La jardinera', 'trasplantó', 'el rosal', 'en mayo.'], ['Ella', 'sabía que', 'este', 'no aguanta el sol.']] }, [
      ['Alguien sabía algo: «Ella». ¿Quién es?', { luz: [4] }],
      ['Femenino y sabe algo: es la jardinera.', { luz: [0, 4], sello: { 4: 'jardinera' } }],
      ['Y algo no aguanta el sol: «este». ¿Qué es?', { luz: [6] }],
      ['Masculino y es una planta: el rosal.', { luz: [2, 6], sello: { 6: 'rosal' } }],
      ['Género, número y sentido: las tres pruebas.', {}],
      ['Si al ponerlo en su lugar suena absurdo, no era ese.', {}],
    ], 'Busca hacia atrás lo que concuerda en género, número y sentido.'),
    xpHaz('hoja', 'Subraya a qué apunta **«las»** en «… y las guardó en el cajón».', { modo: 'toca', meta: [2], paras: [['Pedro abrió', 'el sobre,', 'contó las monedas', 'sobre la mesa', 'y las guardó en el cajón.']], pista: 'Debe ser femenino, plural y caber en un cajón.' }, '«Las» es femenino y plural: solo las monedas.')],
  ['Bisagras y signos',
    xpMira('hoja', 'Tercera idea: conectores y signos dicen **cómo se unen** las ideas.', { paras: [['Llovió toda la noche;', 'sin embargo,', 'el río no creció.'], ['Por eso', 'nadie evacuó.'], ['Hubo un solo «héroe»:', 'el que llegó tarde a todo.']] }, [
      ['«Sin embargo» opone: se esperaba que creciera.', { luz: [1], nota: { 0: 'contraste' } }],
      ['«Por eso» trae la consecuencia.', { luz: [3], nota: { 1: 'consecuencia' } }],
      ['Las comillas de «héroe» no citan: se burlan.', { luz: [5], nota: { 2: 'ironía' } }],
      ['Y los dos puntos anuncian la explicación.', { luz: [5, 6] }],
      ['Tapa el conector y di tú qué pasa entre las dos ideas.', {}],
    ], 'El conector dice si la idea choca, resulta o suma; el signo, cómo leerla.'),
    xpHaz('hoja', 'Subraya el conector que anuncia una **consecuencia**.', { modo: 'toca', meta: [3], paras: [['Aunque', 'el bus llegó tarde,', 'nadie protestó;'], ['así que', 'salimos tranquilos', 'y además', 'cantando.']], pista: 'Ese no presenta un resultado. Busca el conector que lo anuncia.' }, '«Así que» trae lo que resulta.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La ley buscaba frenar la tala; no obstante, esta aumentó». Subraya a qué apunta **«esta»**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['la ley'], ['la tala'], ['la búsqueda']], pista: 'Ponla en su lugar: ¿qué pudo aumentar, si la ley quería frenarlo?' }, '«Esta» recoge lo más cercano, y solo la tala aumenta.')],
], 'Prueba la palabra en su oración, tira el hilo hacia atrás y lee los conectores.');
;
//#archivo js/explora-icf-lc-2.js
// Preicfes · Lectura Crítica, mundo 2 «Cómo se Arma un Texto» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-estructura-1', [
  ['El oficio de un párrafo',
    xpMira('hoja', 'Empecemos por la idea: un párrafo se entiende por lo que **hace** frente al anterior.', { paras: [['El semáforo dura doce segundos.'], ['Una persona mayor necesita veinte para cruzar.'], ['Se podría alargar solo de día.'], ['Quienes manejan dirán que habrá trancón.'], ['Pero un trancón se espera; una vida, no.']] }, [
      ['El primero da un dato.', { luz: [0], nota: { 0: 'dato' } }],
      ['El segundo muestra por qué es un problema.', { luz: [1], nota: { 1: 'problema' } }],
      ['El tercero propone algo.', { luz: [2], nota: { 2: 'propuesta' } }],
      ['El cuarto deja hablar a quien no está de acuerdo.', { luz: [3], nota: { 3: 'objeción' } }],
      ['Y el último le responde.', { luz: [4], nota: { 4: 'respuesta' } }],
    ], 'Dato, problema, propuesta, objeción, respuesta: cada uno trabaja para el otro.'),
    xpHaz('hoja', 'Pon al margen el oficio de cada párrafo.', { modo: 'margen', rotulos: ['objeción', 'propuesta', 'problema'], meta: [2, 1, 0], paras: [['El patio se inunda cada mes.'], ['Conviene abrir un desagüe.'], ['Algunos creen que es muy costoso.']], pista: 'Alguno no va ahí: busca «conviene» y «algunos creen».' }, '«Conviene» propone y «algunos creen» objeta.')],
  ['Las primeras palabras',
    xpMira('hoja', 'Segunda idea: los **comienzos** anuncian lo que viene.', { paras: [['La primera causa', 'es el ruido.'], ['Por ejemplo,', 'un taladro a medianoche.'], ['En conclusión,', 'hay que fijar un horario.']] }, [
      ['«La primera causa»: espera otra más.', { luz: [0], nota: { 0: 'vendrá otra' } }],
      ['«Por ejemplo»: un caso de lo dicho.', { luz: [2], nota: { 1: 'ejemplo' } }],
      ['«En conclusión»: lo que resulta de todo.', { luz: [4], nota: { 2: 'cierre' } }],
      ['Con solo los comienzos ya tienes el mapa.', { luz: [0, 2, 4] }],
      ['Si un comienzo no encaja con el anterior, el orden está mal.', {}],
    ], 'Lee los comienzos: ahí está el mapa del texto.'),
    xpHaz('hoja', 'Subraya el comienzo que anuncia una **segunda** razón.', { modo: 'toca', meta: [2], paras: [['Hay que sembrar árboles.', 'Dan sombra.'], ['Además,', 'sus raíces detienen la lluvia.'], ['Por eso', 'la plaza los necesita.']], pista: 'Ese no suma otra razón. Busca la palabra que agrega.' }, '«Además» suma otra razón a la anterior.')],
  ['Sostener o adornar',
    xpMira('hoja', 'Tercera idea: no todo **sostiene** la idea; algo solo la adorna.', { letras: ['idea', 'a', 'b', 'c'], paras: [['La feria ayuda al barrio.'], ['Da trabajo a cuarenta familias.'], ['Las carpas son azules.'], ['Los arriendos se pagan con sus ventas.']] }, [
      ['Arriba está la idea.', { luz: [0] }],
      ['El trabajo la sostiene.', { luz: [1], nota: { 1: 'sostiene' } }],
      ['El color de las carpas no cambia nada.', { luz: [2], tacha: [2], nota: { 2: 'adorna' } }],
      ['Pagar arriendos también la sostiene.', { luz: [3], nota: { 3: 'sostiene' } }],
      ['La prueba: quítala y mira si la idea sigue igual de firme.', {}],
    ], 'Si al quitarla la idea no pierde fuerza, era un adorno.'),
    xpHaz('hoja', 'Idea: «La bicicleta ahorra dinero». **Tacha** las dos que no la sostienen.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['No usa gasolina.'], ['Es roja.'], ['Repararla cuesta poco.'], ['Se inventó hace dos siglos.']], pista: 'Alguna de las tachadas habla de gastar menos.' }, 'El color y la fecha no hablan de dinero.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Los peces mueren. Primero se pensó en un veneno. Sin embargo, el agua estaba limpia». Subraya la función de la última.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Da un ejemplo de veneno.'], ['Concluye que hubo veneno.'], ['Descarta lo que se pensó.']], pista: 'Mira qué hace «Sin embargo» con la idea anterior.' }, '«Sin embargo» tumba la explicación del veneno.')],
], 'Oficio, comienzos y sostén: así se arma un texto.');

xpLec('icf-lc-estructura-2', [
  ['Oponer y limitar',
    xpMira('hoja', 'Empecemos por la idea: hay conectores que **chocan** y otros que **ponen un tope**.', { paras: [['Estudió mucho;', 'sin embargo,', 'perdió.'], ['El carro es rápido;', 'ahora bien,', 'gasta demasiado.'], ['Aunque', 'llovía,', 'salimos.']] }, [
      ['«Sin embargo»: pasó lo contrario de lo esperado.', { luz: [1], nota: { 0: 'choca' } }],
      ['«Ahora bien»: no lo niega, le pone un tope.', { luz: [4], nota: { 1: 'limita' } }],
      ['«Aunque»: hay un obstáculo que no bastó.', { luz: [6], nota: { 2: 'no bastó' } }],
      ['También: pero, no obstante, en cambio.', {}],
      ['Tapa el conector: ¿las ideas van al mismo lado o no?', {}],
    ], 'Sin embargo opone, ahora bien limita y aunque reconoce un obstáculo.'),
    xpHaz('hoja', 'Subraya la oración en la que dos ideas **chocan**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Además, trajo pan.'], ['Prometió venir, pero no llegó.'], ['Llegó, así que comimos.']], pista: 'En esa las ideas se suman o una resulta de la otra.' }, '«Pero» opone la promesa y lo que pasó.')],
  ['Causa y consecuencia',
    xpMira('hoja', 'Segunda idea: mira si el conector trae la **causa** o el **resultado**.', { paras: [['El río creció', 'ya que', 'llovió tres días.'], ['Llovió tres días;', 'por lo tanto,', 'el río creció.']] }, [
      ['Los mismos dos hechos.', { luz: [0, 2] }],
      ['Después de «ya que» viene la causa.', { luz: [1, 2], nota: { 0: 'trae la causa' } }],
      ['Después de «por lo tanto», el resultado.', { luz: [4, 5], nota: { 1: 'trae el resultado' } }],
      ['Con la causa: porque, puesto que, debido a.', {}],
      ['Con el resultado: por eso, así que, de modo que.', {}],
    ], 'Ya que y porque: causa. Por lo tanto y por eso: resultado.'),
    xpHaz('hoja', 'Subraya la **causa**: «La tienda cerró puesto que nadie compraba».', { modo: 'toca', meta: [2], paras: [['La tienda cerró', 'puesto que', 'nadie compraba.']], pista: 'Pregunta por qué cerró. La respuesta es la causa.' }, 'Va después de «puesto que».')],
  ['Sumar, ejemplificar, recoger',
    xpMira('hoja', 'Tercera idea: otros conectores **agregan**, **muestran** o **resumen**.', { paras: [['Además,', 'da empleo.'], ['Por ejemplo,', 'a diez panaderos.'], ['Es decir,', 'mueve la economía.'], ['En resumen,', 'conviene cuidarlo.']] }, [
      ['«Además» agrega otra idea del mismo lado.', { luz: [0], nota: { 0: 'suma' } }],
      ['«Por ejemplo» muestra un caso.', { luz: [2], nota: { 1: 'caso' } }],
      ['«Es decir» lo dice de otra manera.', { luz: [4], nota: { 2: 'repite distinto' } }],
      ['«En resumen» recoge lo dicho.', { luz: [6], nota: { 3: 'recoge' } }],
      ['Si cambias uno por otro de su familia, el sentido sigue.', {}],
    ], 'Además suma, por ejemplo muestra, es decir aclara, en resumen recoge.'),
    xpHaz('hoja', 'Pon al margen lo que hace cada conector.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['aclara', 'suma', 'muestra un caso'], meta: [1, 2, 0], paras: [['Incluso, …'], ['Así, en mi barrio, …'], ['O sea, …']], pista: 'Alguno no va ahí: prueba con una frase tuya.' }, '«Incluso» suma, «en mi barrio» es un caso y «o sea» aclara.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La cosecha fue buena. ___, los precios bajaron y nadie ganó». Subraya el conector.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Por ejemplo'], ['Es decir'], ['No obstante'], ['Además de eso, por suerte']], pista: 'Con una buena cosecha se esperaba ganar. ¿Qué pasó?' }, 'Se esperaba lo contrario: hace falta oponer.')],
], 'Choca, limita, causa, resultado, suma o recoge: di qué hace y escoge.');

xpLec('icf-lc-estructura-3', [
  ['¿Quién habla?',
    xpMira('hoja', 'Empecemos por la idea: en un texto pueden sonar **varias voces**.', { paras: [['Llegué al muelle de noche.'], ['«Ese barco no vuelve»,', 'dijo el pescador.'], ['Según la capitanía,', 'había salido el martes.'], ['Pienso que', 'nadie quería preocuparse.']] }, [
      ['«Llegué»: habla el narrador.', { luz: [0], nota: { 0: 'narrador' } }],
      ['Las comillas traen la voz del pescador.', { luz: [1, 2], nota: { 1: 'pescador' } }],
      ['«Según» trae la voz de la capitanía.', { luz: [3], nota: { 2: 'capitanía' } }],
      ['«Pienso que» vuelve al narrador: es su opinión.', { luz: [5], nota: { 3: 'opina el narrador' } }],
      ['Una idea sin marca es de quien escribe.', {}],
    ], 'Comillas, «según» y «pienso» dicen de quién es cada idea.'),
    xpHaz('hoja', 'Subraya la oración que **no** es del narrador.', { modo: 'toca', meta: [1], paras: [['El parque estaba vacío.', '«Aquí espantan», advirtió la niña.', 'Yo me senté en la banca.']], pista: 'Esa la cuenta quien narra. Busca las comillas.' }, 'Las comillas son de la niña.')],
  ['Directa o indirecta',
    xpMira('hoja', 'Segunda idea: se puede **citar** con las palabras exactas o **contar** lo que otro dijo.', { paras: [['«No tengo miedo»,', 'dijo Ana.'], ['Ana dijo que', 'no tenía miedo.'], ['Ana negó', 'tener miedo.']] }, [
      ['Con comillas: sus palabras exactas.', { luz: [0], nota: { 0: 'directa' } }],
      ['Con «dijo que»: las cuenta otro.', { luz: [2], nota: { 1: 'indirecta' } }],
      ['El verbo cambia: «tengo» pasa a «tenía».', { luz: [0, 3] }],
      ['«Negó» ya interpreta lo que dijo.', { luz: [4], nota: { 2: 'interpreta' } }],
      ['El verbo de decir puede traer un juicio: confesó, insistió.', {}],
    ], 'Comillas: exacta. «Que»: contada. Y el verbo puede juzgar.'),
    xpHaz('hoja', 'Subraya la cita **indirecta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«Cierro a las ocho», avisó Leo.'], ['Leo avisó que cerraba a las ocho.'], ['Leo cierra a las ocho.']], pista: 'Esa trae las palabras exactas o no cita a nadie.' }, '«Avisó que» cuenta lo que Leo dijo.')],
  ['Voces que no coinciden',
    xpMira('hoja', 'Tercera idea: dos voces pueden contar **lo mismo** y sonar distinto.', { paras: [['El alcalde habla de una «reubicación».'], ['Los vendedores la llaman desalojo.'], ['El periódico dice que se movieron los puestos.']] }, [
      ['Los tres hablan del mismo hecho.', { luz: [0, 1, 2] }],
      ['El alcalde escoge una palabra suave.', { luz: [0], nota: { 0: 'la suaviza' } }],
      ['Los vendedores, una dura.', { luz: [1], nota: { 1: 'la denuncia' } }],
      ['El periódico intenta no juzgar.', { luz: [2], nota: { 2: 'neutral' } }],
      ['La palabra escogida muestra el interés de cada uno.', {}],
    ], 'Cada voz escoge sus palabras según lo que quiere mostrar.'),
    xpHaz('hoja', 'Pon al margen cómo cuenta cada voz la misma multa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['se queja', 'informa', 'la celebra'], meta: [1, 2, 0], paras: [['Le cobraron cien mil pesos.'], ['Por fin hicieron justicia.'], ['Me robaron cien mil pesos.']], pista: 'Alguno no va ahí: mira qué palabra juzga.' }, '«Por fin» celebra y «robaron» se queja.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Según la directora, el coro mejoró. A mí me sonó igual». Subraya quién cree que mejoró.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La directora'], ['Quien escribe'], ['El coro']], pista: 'Busca de quién es la idea que va después de «según».' }, '«Según» le da la idea a la directora.')],
], 'Marca de voz, manera de citar y palabra escogida.');
;
//#archivo js/explora-icf-lc-3.js
// Preicfes · Lectura Crítica, mundo 3 «Tesis y Argumentos» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-argumento-1', [
  ['Tema y tesis',
    xpMira('hoja', 'Empecemos por la idea: el **tema** es de qué se habla; la **tesis**, lo que se quiere que aceptes.', { letras: ['A', 'B', 'C', 'D'], paras: [['Los perros en los parques'], ['Hay doce perros en el parque.'], ['Los perros deberían ir con correa.'], ['¿Van con correa?']] }, [
      ['Esto es un tema: no afirma nada.', { luz: [0], nota: { 0: 'tema' } }],
      ['Esto es un dato: se cuenta.', { luz: [1], nota: { 1: 'dato' } }],
      ['Esto se puede discutir: es la tesis.', { luz: [2], nota: { 2: 'tesis' } }],
      ['Y esto pregunta, no defiende.', { luz: [3], nota: { 3: 'pregunta' } }],
      ['La prueba: ¿alguien podría decir que no está de acuerdo?', { luz: [2] }],
    ], 'Tesis: una afirmación que se defiende y se puede discutir.'),
    xpHaz('hoja', 'Subraya la **tesis**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Las tareas de vacaciones'], ['Duran tres semanas.'], ['¿Quién las revisa?'], ['Las tareas de vacaciones no enseñan.']], pista: 'Esa no se puede discutir: es un tema, un dato o una pregunta.' }, 'Con esa alguien podría no estar de acuerdo.')],
  ['Razones y adornos',
    xpMira('hoja', 'Segunda idea: una **razón** responde «¿por qué?».', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Hay que cerrar esa calle los domingos.'], ['Los niños no tienen dónde jugar.'], ['Es la calle novena.'], ['En otro barrio bajaron los accidentes.']] }, [
      ['La tesis: cerrar la calle.', { luz: [0] }],
      ['¿Por qué? No hay dónde jugar.', { luz: [1], nota: { 1: 'razón' } }],
      ['El número de la calle no responde por qué.', { luz: [2], tacha: [2], nota: { 2: 'adorno' } }],
      ['¿Por qué? Porque funcionó en otra parte.', { luz: [3], nota: { 3: 'razón con prueba' } }],
      ['Une la razón y la tesis con «porque»: si suena, sirve.', {}],
    ], 'Prueba: tesis + porque + razón. Si no une, no es una razón.'),
    xpHaz('hoja', 'Tesis: «El colegio debe abrir la biblioteca el sábado». **Tacha** las dos que no son razones.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Tiene puertas azules.'], ['Muchos no tienen dónde estudiar.'], ['El sábado va después del viernes.'], ['En semana está llena.']], pista: 'Alguna de las tachadas sí responde por qué.' }, 'Las puertas y el calendario no responden por qué.')],
  ['El otro lado',
    xpMira('hoja', 'Tercera idea: un buen argumento trae **lo que dirían otros** y lo contesta.', { paras: [['Propongo huertas en los techos.'], ['Se dirá que pesan mucho.'], ['Es cierto en techos de zinc.'], ['Pero en placas de cemento resisten.']] }, [
      ['Primero, lo que se propone: la tesis.', { luz: [0], nota: { 0: 'se propone algo' } }],
      ['«Se dirá» trae la objeción.', { luz: [1], nota: { 1: 'contraargumento' } }],
      ['«Es cierto» le reconoce una parte.', { luz: [2], nota: { 2: 'concesión' } }],
      ['Y «pero» responde a la objeción.', { luz: [3], nota: { 3: 'respuesta' } }],
      ['Nombrar una objeción no es estar de acuerdo con ella.', { luz: [1] }],
    ], '«Se dirá» objeta, «es cierto» concede y «pero» responde.'),
    xpHaz('hoja', 'Pon al margen el papel de cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['respuesta', 'tesis', 'contraargumento'], meta: [1, 2, 0], paras: [['Conviene reducir el uniforme.'], ['Algunos dirán que así habrá burlas por la ropa.'], ['Sin embargo, donde se hizo no aumentaron.']], pista: 'Alguna no va ahí: busca «conviene», «dirán» y «sin embargo».' }, 'Se propone, se objeta y se responde.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«El puente está viejo. Hay que cerrarlo: tiene grietas, aunque sea bonito». Subraya la **tesis**.', { modo: 'toca', meta: [1], paras: [['El puente está viejo.', 'Hay que cerrarlo:', 'tiene grietas,', 'aunque sea bonito.']], pista: 'Esa es un dato, una razón o una concesión.' }, '«Hay que» pide algo que otros pueden discutir.')],
], 'Tema no es tesis; la razón responde por qué; y la objeción se contesta.');

xpLec('icf-lc-argumento-2', [
  ['Más firme o más débil',
    xpMira('hoja', 'Empecemos por la idea: un dato nuevo **fortalece** o **debilita** si cambia lo que crees.', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Leer de noche ayuda a dormir.'], ['Quienes leyeron se durmieron antes.'], ['Quienes leyeron también apagaron el celular.'], ['Los libros eran de pasta dura.']] }, [
      ['Arriba está la tesis que se defiende.', { luz: [0] }],
      ['Se durmieron antes: la hace más creíble.', { luz: [1], nota: { 1: 'fortalece' } }],
      ['Apagaron el celular: quizá fue eso.', { luz: [2], nota: { 2: 'debilita' } }],
      ['La pasta no cambia nada.', { luz: [3], nota: { 3: 'no pesa' } }],
      ['Pregunta: con este dato, ¿creo más, menos o igual?', {}],
    ], 'Otra causa posible es una de las maneras más fuertes de debilitar.'),
    xpHaz('hoja', 'Tesis: «El nuevo semáforo redujo los choques». Subraya el dato que la **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hubo la mitad de choques.'], ['Ese mes cerraron la avenida por obras.'], ['El semáforo tiene tres luces.']], pista: 'Ese la apoya o no pesa. Busca otra causa posible.' }, 'Con la avenida cerrada habría menos choques de todos modos.')],
  ['De pocos a todos',
    xpMira('hoja', 'Segunda idea: de **pocos casos** no se concluye sobre **todos**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Tres vecinos míos madrugan y son alegres.'], ['Esos tres madrugan y son alegres.'], ['Todo el que madruga es alegre.'], ['Madrugar da alegría.']] }, [
      ['Esto es lo que se vio.', { luz: [0] }],
      ['Esta dice justo lo visto.', { luz: [1], nota: { 1: 'alcance justo' } }],
      ['Esta salta a todos.', { luz: [2], nota: { 2: 'generaliza' } }],
      ['Esta además inventa una causa.', { luz: [3], nota: { 3: 'inventa causa' } }],
      ['Cuidado con todos, siempre, nunca y porque.', {}],
    ], 'La conclusión no puede ser más grande que la prueba.'),
    xpHaz('hoja', 'En dos colegios visitados la huerta bajó la basura. **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['La huerta baja la basura en todos los colegios.'], ['En esos dos, bajó la basura.'], ['Sin huerta, la basura siempre sube.']], pista: 'Alguna de las tachadas dice justo lo que se vio.' }, '«Todos» y «siempre» van más allá de dos colegios.')],
  ['Dato, ejemplo o imagen',
    xpMira('hoja', 'Tercera idea: no todo lo que **convence** prueba.', { paras: [['De 50 casas, 30 ahorraron agua.'], ['Mi tía ahorró agua.'], ['El agua es como la paciencia: se acaba.'], ['Un experto lo recomienda.']] }, [
      ['Un conteo prueba bastante.', { luz: [0], nota: { 0: 'dato' } }],
      ['Un caso muestra, pero es uno solo.', { luz: [1], nota: { 1: 'ejemplo' } }],
      ['Una comparación hace ver, no prueba.', { luz: [2], nota: { 2: 'imagen' } }],
      ['Una autoridad pesa si sabe de eso.', { luz: [3], nota: { 3: 'autoridad' } }],
      ['Un texto los mezcla; tú debes separarlos.', {}],
    ], 'Dato, ejemplo, imagen y autoridad no pesan lo mismo.'),
    xpHaz('hoja', 'Pon al margen con qué convence cada una.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['imagen', 'dato', 'ejemplo'], meta: [1, 2, 0], paras: [['Ocho de cada diez lo usan.'], ['En mi cuadra, don Luis lo usa.'], ['Es un paraguas para el alma.']], pista: 'Alguna no va ahí: ¿cuenta, muestra un caso o compara?' }, 'Contar, mostrar un caso y comparar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Tesis: «Los grupos pequeños aprenden más». Subraya el dato que la **fortalece**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los salones son verdes.'], ['Un grupo grande sacó la mejor nota.'], ['Con los mismos profesores, los grupos pequeños subieron más.']], pista: 'Ese no pesa o va en contra.' }, 'Con todo lo demás igual, subieron más.')],
], 'Pesa cada dato, cuida el alcance y separa lo que prueba de lo que adorna.');
;
//#archivo js/explora-icf-lc-4.js
// Preicfes · Lectura Crítica, mundo 4 «Textos Literarios» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-literario-1', [
  ['¿Quién cuenta?',
    xpMira('hoja', 'Empecemos por la idea: el **narrador** es la voz que cuenta, no quien firma el libro.', { letras: ['A', 'B', 'C'], paras: [['Yo vi caer el árbol y corrí.'], ['Él vio caer el árbol y corrió.'], ['Ella temía, aunque nadie lo supo nunca.']] }, [
      ['«Yo vi»: quien cuenta está dentro de la historia.', { luz: [0], nota: { 0: 'primera persona' } }],
      ['«Él vio»: lo cuenta alguien desde afuera.', { luz: [1], nota: { 1: 'tercera persona' } }],
      ['Si sabe lo que nadie supo, lo sabe todo.', { luz: [2], nota: { 2: 'sabe todo' } }],
      ['Un narrador niño puede tener un autor de ochenta años.', {}],
      ['Por eso no digas «el autor» cuando habla el narrador.', {}],
    ], 'Yo: dentro. Él o ella: desde afuera. El autor inventa esa voz.'),
    xpHaz('hoja', 'Subraya la que cuenta alguien **de adentro** de la historia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Marta abrió la carta y lloró.'], ['El viejo pensaba en el mar.'], ['Mi hermana abrió la carta y no quiso leérmela.']], pista: 'Busca «mi», «me» o «yo».' }, '«Mi hermana» y «leérmela»: quien cuenta es un personaje.')],
  ['Por lo que hacen',
    xpMira('hoja', 'Segunda idea: un personaje se conoce por **sus actos**, más que por lo que le dicen.', { paras: [['Todos decían que Elías era tacaño.'], ['Cada mes dejaba pan en la puerta de la viuda.'], ['Golpeaba y se iba antes de que abriera.']] }, [
      ['Esto es lo que otros dicen de él.', { luz: [0], nota: { 0: 'lo que dicen' } }],
      ['Esto es lo que hace de verdad.', { luz: [1], nota: { 1: 'lo que hace' } }],
      ['Y lo hace sin que lo vean: no busca aplausos.', { luz: [2], nota: { 2: 'sin ser visto' } }],
      ['Conclusión: es generoso, aunque digan otra cosa.', { luz: [1, 2] }],
      ['El texto nunca usó esa palabra: la dedujiste.', {}],
    ], 'Mira lo que hace y di qué muestra: eso se deduce.'),
    xpHaz('hoja', '«Revisó tres veces la cerradura, se acostó y volvió a levantarse». Subraya lo que muestra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tiene mucho sueño.'], ['Está intranquilo.'], ['Es cerrajero.']], pista: '¿Por qué alguien revisa tantas veces lo mismo?' }, 'Revisar y levantarse otra vez muestran inquietud.')],
  ['Lo que cambia',
    xpMira('hoja', 'Tercera idea: un cuento vive de **un cambio**.', { paras: [['Iris le temía al perro de la esquina.'], ['Una noche de lluvia lo oyó llorar.'], ['Salió con una toalla.'], ['Hoy duerme a los pies de su cama.']] }, [
      ['Al comienzo hay una situación: le teme.', { luz: [0], nota: { 0: 'comienzo' } }],
      ['Algo la rompe: lo oye llorar.', { luz: [1], nota: { 1: 'conflicto' } }],
      ['El personaje decide y actúa.', { luz: [2], nota: { 2: 'decisión' } }],
      ['Al final, algo ya no es igual.', { luz: [3], nota: { 3: 'final' } }],
      ['Compara el principio con el final y tendrás el tema.', { luz: [0, 3] }],
    ], 'Comienzo, conflicto, decisión y final: el tema está en el cambio.'),
    xpHaz('hoja', 'Pon al margen qué es cada parte.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['final', 'comienzo', 'conflicto'], meta: [1, 2, 0], paras: [['Joel nunca cantaba en público.'], ['Un día enfermó el solista y nadie más sabía la letra.'], ['Ahora le piden otra.']], pista: 'Alguna no va ahí: busca «nunca», «un día» y «ahora».' }, '«Nunca» abre, «un día» rompe y «ahora» cierra.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Mi abuelo no sabía leer. Cada noche abría el periódico, pasaba las hojas despacio y me decía: “Hoy no hay nada”». Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Al abuelo le aburrían las noticias.'], ['Al abuelo le daba pena no saber leer.'], ['El periódico venía en blanco.']], pista: 'Junta que no sabía leer con lo que hacía cada noche.' }, 'Finge leer ante su nieto: le daba pena no saber.')],
], 'Di quién cuenta, mira lo que hacen y compara el comienzo con el final.');

xpLec('icf-lc-literario-2', [
  ['Como y es',
    xpMira('hoja', 'Empecemos por la idea: una **imagen** dice una cosa con otra.', { paras: [['Sus manos eran ásperas.'], ['Sus manos eran como corteza.'], ['Sus manos, dos raíces viejas.']] }, [
      ['Esto es literal: describe tal cual.', { luz: [0], nota: { 0: 'literal' } }],
      ['Con «como» se comparan dos cosas.', { luz: [1], nota: { 1: 'símil' } }],
      ['Sin «como», una cosa pasa a ser la otra.', { luz: [2], nota: { 2: 'metáfora' } }],
      ['Las tres hablan de manos gastadas por el trabajo.', { luz: [0, 1, 2] }],
      ['Pregunta siempre en qué se parecen las dos cosas.', {}],
    ], 'Símil: con «como». Metáfora: una cosa es la otra.'),
    xpHaz('hoja', 'Subraya la **metáfora**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La noche es un pozo.'], ['La noche es como un pozo.'], ['La noche es oscura.']], pista: 'Una compara con «como» y otra es literal.' }, 'Dice que la noche **es** un pozo, sin «como».')],
  ['Dar vida y exagerar',
    xpMira('hoja', 'Segunda idea: se puede **dar vida** a las cosas o **exagerar** para que se sienta.', { paras: [['La puerta se quejó al abrir.'], ['Esperé mil años en esa fila.'], ['Qué puntual: llegaste dos horas tarde.']] }, [
      ['Una puerta no se queja: le dieron rasgos de persona.', { luz: [0], nota: { 0: 'personificación' } }],
      ['Nadie espera mil años: es una exageración.', { luz: [1], nota: { 1: 'hipérbole' } }],
      ['Y aquí se dice lo contrario de lo que se piensa.', { luz: [2], nota: { 2: 'ironía' } }],
      ['Ninguna quiere engañar: quieren que sientas algo.', {}],
      ['Traduce: ¿qué pasó de verdad?', {}],
    ], 'Dar vida, exagerar o decir lo contrario: traduce a lo que pasó.'),
    xpHaz('hoja', 'Pon al margen la figura de cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['ironía', 'personificación', 'hipérbole'], meta: [1, 2, 0], paras: [['El viento leía los periódicos de la plaza.'], ['Tengo un millón de tareas.'], ['¡Qué silencio!, dijo en medio del ruido.']], pista: 'Alguna no va ahí: ¿da vida, exagera o dice lo contrario?' }, 'El viento lee, un millón exagera y el silencio es ironía.')],
  ['Objetos que cargan algo',
    xpMira('hoja', 'Tercera idea: un **símbolo** es un objeto que carga con algo más.', { paras: [['En la mesa siempre había un plato de más.'], ['Nadie lo usaba, nadie lo quitaba.'], ['El día que llegó la carta, mamá lo guardó.']] }, [
      ['Un plato de más no es solo loza.', { luz: [0], nota: { 0: 'objeto' } }],
      ['Que nadie lo quite muestra que alguien falta.', { luz: [1], nota: { 1: 'espera' } }],
      ['Guardarlo es dejar de esperar.', { luz: [2], nota: { 2: 'cambio' } }],
      ['El plato es la espera de esa familia.', { luz: [0, 2] }],
      ['Un símbolo se nota porque vuelve y porque algo le pasa.', {}],
    ], 'Símbolo: un objeto que vuelve y cambia con los personajes.'),
    xpHaz('hoja', 'Al comienzo la ventana está clausurada; al final ella la abre y entra el sol. Subraya lo que representa abrirla.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Que hace calor.'], ['Que la ventana es nueva.'], ['Que vuelve a vivir hacia afuera.']], pista: '¿Qué cambió en ella, además de la ventana?' }, 'Pasa de encerrada a abierta: la ventana es ella.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«El reloj de la sala se murió el mismo día que el abuelo, y nadie quiso darle cuerda». Subraya lo que sugiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El reloj era de mala calidad.'], ['La familia detuvo su vida por la pérdida.'], ['Nadie sabía darle cuerda.']], pista: 'Mira qué personifica y qué significa no querer darle cuerda.' }, 'El reloj detenido representa a la familia en duelo.')],
], 'Reconoce la figura, tradúcela y pregunta qué carga el objeto.');

xpLec('icf-lc-literario-3', [
  ['La voz del poema',
    xpMira('hoja', 'Empecemos por la idea: en un poema habla **una voz**, que no es el poeta.', { paras: [['Soy la silla del patio,'], ['guardo el peso de los que se fueron.'], ['Nadie me pregunta por mis piernas.']] }, [
      ['¿Quién habla? Una silla, no una persona.', { luz: [0], nota: { 0: 'la voz' } }],
      ['Nos cuenta lo que siente: guarda ausencias.', { luz: [1], nota: { 1: 'lo que siente' } }],
      ['Y se queja con un poco de humor.', { luz: [2], nota: { 2: 'el tono' } }],
      ['El poeta la inventó para decir algo suyo.', {}],
      ['Pregunta primero quién habla y a quién.', {}],
    ], 'La voz poética habla; el poeta la inventa.'),
    xpHaz('hoja', '«Río, llévame la pena / que no la quiero contar». Subraya a quién le habla la voz.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Al río'], ['A la pena'], ['A los lectores']], pista: '¿A quién nombra antes de pedir algo?' }, 'Nombra al río y le pide que se lleve la pena.')],
  ['Repetir y sonar',
    xpMira('hoja', 'Segunda idea: en un poema se **repite** para que algo pese.', { paras: [['Vuelvo a la casa,'], ['vuelvo a la puerta,'], ['vuelvo a tu nombre.'], ['Y no estás.']] }, [
      ['«Vuelvo» empieza tres versos: es una anáfora.', { luz: [0, 1, 2], nota: { 0: 'anáfora' } }],
      ['Cada vuelta lo acerca más a alguien.', { luz: [2] }],
      ['El cuarto verso rompe la repetición.', { luz: [3], nota: { 3: 'se rompe' } }],
      ['Ahí está el golpe: la persona no está.', { luz: [3] }],
      ['Donde se rompe el ritmo suele estar lo importante.', {}],
    ], 'La repetición pesa; donde se rompe, está el golpe.'),
    xpHaz('hoja', 'Subraya el verso que **rompe** la repetición.', { modo: 'toca', letras: ['1', '2', '3', '4'], meta: [3], paras: [['Nadie apagó la luz,'], ['nadie cerró la puerta,'], ['nadie lloró en la sala.'], ['Solo el perro lo supo.']], pista: 'Tres versos empiezan igual.' }, '«Solo el perro» rompe la serie de «nadie».')],
  ['Tema y tono',
    xpMira('hoja', 'Tercera idea: el **tema** es de qué habla en el fondo; el **tono**, con qué sentimiento.', { paras: [['Cosía mi abuela botones,'], ['cosía la tarde al mantel,'], ['y una noche, sin hilo,'], ['se nos descosió.']] }, [
      ['En la superficie, una abuela que cose.', { luz: [0], nota: { 0: 'superficie' } }],
      ['Coser la tarde: unía a la familia.', { luz: [1] }],
      ['Sin hilo y descosida: murió.', { luz: [2, 3], nota: { 3: 'lo que pasó' } }],
      ['Tema: la pérdida de quien une a una familia.', { luz: [1, 3] }],
      ['Tono: tierno y triste, sin gritar.', {}],
    ], 'Superficie, fondo y sentimiento: tema y tono.'),
    xpHaz('hoja', '«Mi escuela tiene goteras, / tiene un balde por pupitre, / y aun así me sé de memoria / el color de su campana». Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Furioso'], ['Cariñoso, a pesar de todo'], ['Indiferente']], pista: 'Mira qué viene después de «aun así».' }, '«Aun así» cambia la queja por cariño.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«El mar no tiene memoria, / por eso canta. / Yo, que sí tengo, / lo escucho». Subraya lo que sugiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El mar olvida a los pescadores.'], ['La voz sabe cantar mejor.'], ['Recordar le impide a la voz estar alegre.']], pista: 'Compara por qué canta uno y por qué el otro solo escucha.' }, 'Quien recuerda no canta: escucha. La memoria pesa.')],
], 'Quién habla, qué se repite, de qué trata y con qué sentimiento.');
;
//#archivo js/explora-icf-lc-5.js
// Preicfes · Lectura Crítica, mundo 5 «Textos Filosóficos» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-filosofico-1', [
  ['Una pregunta distinta',
    xpMira('hoja', 'Empecemos por la idea: una pregunta **filosófica** no se cierra con más datos.', { letras: ['A', 'B', 'C', 'D'], paras: [['¿Cuánto mide esta mesa?'], ['¿Qué hace que algo sea una mesa?'], ['¿Quién ganó el partido?'], ['¿Qué es ganar justamente?']] }, [
      ['Esta se contesta con un metro.', { luz: [0], nota: { 0: 'con datos' } }],
      ['Esta no: hay que pensar qué entendemos por mesa.', { luz: [1], nota: { 1: 'filosófica' } }],
      ['Esta se contesta mirando el marcador.', { luz: [2], nota: { 2: 'con datos' } }],
      ['Esta pregunta qué significa una idea.', { luz: [3], nota: { 3: 'filosófica' } }],
      ['La prueba: ¿un dato nuevo cerraría la discusión?', { luz: [1, 3] }],
    ], 'Si un dato la cierra, no es filosófica.'),
    xpHaz('hoja', 'Subraya la pregunta **filosófica**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['¿Cuántos años vive un perro?'], ['¿Dónde se inventó el ajedrez?'], ['¿Tienen derechos los animales?']], pista: 'Busca la que no se cierra averiguando un dato.' }, 'Hay que pensar qué es un derecho y quién lo tiene.')],
  ['Probar y objetar',
    xpMira('hoja', 'Segunda idea: el filósofo **prueba** una respuesta y le **busca problemas**.', { paras: [['¿Qué es un amigo?'], ['Alguien que siempre está de acuerdo conmigo.'], ['Pero entonces un adulador sería el mejor amigo.'], ['Un amigo es quien quiere mi bien, aunque me contradiga.']] }, [
      ['Primero, se hace la pregunta.', { luz: [0], nota: { 0: 'pregunta' } }],
      ['Después, una respuesta que suena bien.', { luz: [1], nota: { 1: 'se prueba' } }],
      ['Y un caso que la pone en problemas.', { luz: [2], nota: { 2: 'objeción' } }],
      ['Por eso la cambia por una mejor.', { luz: [3], tacha: [1], nota: { 3: 'nueva respuesta' } }],
      ['Lo que se descarta no es lo que el autor defiende.', { luz: [1], tacha: [1] }],
    ], 'Pregunta, intento, objeción y nueva respuesta.'),
    xpHaz('hoja', 'Pon al margen el papel de cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['objeción', 'lo que defiende', 'se prueba'], meta: [2, 0, 1], paras: [['Ser valiente sería no sentir miedo.'], ['Pero quien no conoce el peligro no es valiente: es imprudente.'], ['Ser valiente es actuar bien a pesar del miedo.']], pista: 'Alguna no va ahí: busca «sería», «pero» y la que queda al final.' }, 'Se prueba, se objeta y se defiende otra.')],
  ['Imaginar para pensar',
    xpMira('hoja', 'Tercera idea: un **experimento mental** imagina un caso para probar una idea.', { paras: [['Idea: ser feliz es sentir placer.'], ['Supongamos una máquina que da placer para siempre.'], ['Habría que vivir conectado, sin amigos ni proyectos.'], ['¿Aceptarías? Si no, la felicidad es más que placer.']] }, [
      ['Esta es la idea que se quiere probar.', { luz: [0], nota: { 0: 'idea' } }],
      ['«Supongamos» abre un caso imaginado.', { luz: [1], nota: { 1: 'caso imaginado' } }],
      ['El caso se lleva hasta el final.', { luz: [2] }],
      ['Y se pregunta si aceptamos el resultado.', { luz: [3], nota: { 3: 'prueba' } }],
      ['No importa si la máquina existe: prueba la idea.', { luz: [1] }],
    ], '«Supongamos que…»: un caso para poner a prueba una idea.'),
    xpHaz('hoja', '«Supongamos que un anillo te hace invisible. ¿Seguirías siendo honesto?». Subraya para qué sirve el caso.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Para pensar si somos honestos solo porque nos ven.'], ['Para probar que hay anillos mágicos.'], ['Para contar un cuento de fantasía.']], pista: 'Pregunta qué idea se pone a prueba.' }, 'Prueba si la honestidad depende de que nos vean.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Dicen que toda ley es justa. Pero hubo leyes que permitían esclavos. Sostengo que la justicia es la medida de la ley». Subraya lo que **defiende** el autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Que toda ley es justa.'], ['Que hubo esclavitud.'], ['Que las leyes se juzgan según la justicia.']], pista: 'Busca lo que viene después de «sostengo».' }, 'La primera se descarta, la segunda es el ejemplo y la tercera es la tesis.')],
], 'Reconoce la pregunta, sigue los intentos y encuentra lo que queda en pie.');

xpLec('icf-lc-filosofico-2', [
  ['Definir y distinguir',
    xpMira('hoja', 'Empecemos por la idea: el autor le pone **nombre** a una idea y la **separa** de otra.', { paras: [['Llamaré «información» a un dato suelto.'], ['Llamaré «saber» a un dato que sé usar.'], ['Tener mil datos no es saber.']] }, [
      ['«Llamaré» anuncia una definición.', { luz: [0], nota: { 0: 'definición' } }],
      ['Y otra: son dos ideas distintas.', { luz: [1], nota: { 1: 'definición' } }],
      ['La diferencia: una se usa y la otra no.', { luz: [0, 1] }],
      ['Con la distinción saca una consecuencia.', { luz: [2], nota: { 2: 'consecuencia' } }],
      ['Usa sus palabras como él las definió, no como siempre.', {}],
    ], 'Busca «llamaré», «entiendo por» y qué separa una idea de otra.'),
    xpHaz('hoja', 'Según esas definiciones, subraya un caso de **saber**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Recitar la fórmula sin entenderla'], ['Usar la fórmula para arreglar una bomba'], ['Guardar la fórmula en el celular']], pista: 'Saber, aquí, es poder usar el dato.' }, 'Usarla para algo es saber; tenerla, información.')],
  ['Ejemplo y analogía',
    xpMira('hoja', 'Segunda idea: un **ejemplo** es un caso; una **analogía** compara con otra cosa.', { paras: [['La costumbre nos vuelve ciegos.'], ['Por ejemplo, ya no oigo el tren que pasa por mi casa.'], ['Es como unas gafas: terminas por no verlas.']] }, [
      ['Esta es la idea general.', { luz: [0], nota: { 0: 'idea' } }],
      ['El tren es un caso de esa idea: ejemplo.', { luz: [1], nota: { 1: 'ejemplo' } }],
      ['Las gafas no son una costumbre: se comparan.', { luz: [2], nota: { 2: 'analogía' } }],
      ['El ejemplo muestra; la analogía ayuda a imaginar.', { luz: [1, 2] }],
      ['Pregunta en qué se parecen las dos cosas.', { luz: [0, 2] }],
    ], 'Ejemplo: un caso. Analogía: otra cosa que se le parece.'),
    xpHaz('hoja', 'Idea: «Una promesa nos ata». Pon al margen qué es cada oración.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['analogía', 'ejemplo'], meta: [1, 0], paras: [['Dije que iría y fui, aunque llovía.'], ['Es un nudo que uno mismo aprieta.']], pista: 'Mira cuál es un caso de prometer y cuál es otra cosa.' }, 'Ir aunque llueva es un caso; el nudo es una comparación.')],
  ['Objetar y precisar',
    xpMira('hoja', 'Tercera idea: una buena objeción **obliga a precisar**.', { paras: [['Mentir siempre está mal.'], ['Se objetará: ¿y una fiesta sorpresa?'], ['Es cierto.'], ['Preciso: está mal engañar para aprovecharse.']] }, [
      ['Esta es la primera versión: muy amplia.', { luz: [0], nota: { 0: 'primera versión' } }],
      ['La objeción trae un caso que no encaja.', { luz: [1], nota: { 1: 'objeción' } }],
      ['El autor la acepta: es honesto.', { luz: [2], nota: { 2: 'acepta' } }],
      ['Y ajusta su idea para que resista.', { luz: [3], nota: { 3: 'precisa' } }],
      ['Aceptar una objeción no es abandonar la idea.', { luz: [0, 3] }],
    ], 'Objeción, reconocimiento y una idea más precisa.'),
    xpHaz('hoja', '«Todo el que trabaja merece pago. Dirán: ¿y quien ayuda a su madre? Preciso: hablo del trabajo hecho para un desconocido». Subraya lo que cambió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Ya no cree que haya que pagar.'], ['Cree que la madre debe pagar.'], ['Redujo los casos a los que se aplica su idea.']], pista: 'Compara la idea antes y después de «preciso».' }, 'Sigue siendo su idea, pero para menos casos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un autor dice: «Respeto es tomar en serio al otro; miedo, evitarlo». Subraya el caso de **respeto**, según el autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Callar para que no se enoje'], ['Discutirle con razones lo que dijo'], ['Cruzar la calle para no verlo']], pista: 'Usa la definición del autor, no la de siempre.' }, 'Discutir con razones es tomarlo en serio; lo demás es evitarlo.')],
], 'Usa las palabras como el autor las define y sigue cómo las ajusta.');
;
//#archivo js/explora-icf-lc-6.js
// Preicfes · Lectura Crítica, mundo 6 «Textos Discontinuos» (Explora, escena «hoja»). Piezas cortas propias.
xpLec('icf-lc-discontinuo-1', [
  ['Cada parte hace algo',
    xpMira('hoja', 'Empecemos por la idea: una infografía no se lee en fila; **cada parte** hace algo.', { letras: ['título', 'tabla', 'flecha', 'nota'], paras: [['¿Cuánto duerme tu perro?'], ['Cachorro: 18 horas. Adulto: 13.'], ['Más juego → mejor sueño'], ['Datos de 60 perros de ciudad.']] }, [
      ['El título pregunta y dice el tema.', { luz: [0], nota: { 0: 'tema' } }],
      ['La tabla da las cantidades.', { luz: [1], nota: { 1: 'cuánto' } }],
      ['La flecha une dos cosas.', { luz: [2], nota: { 2: 'qué lleva a qué' } }],
      ['La nota dice de dónde salen los datos.', { luz: [3], nota: { 3: 'de dónde' } }],
      ['Con eso sabes dónde buscar cada respuesta.', {}],
    ], 'Título, tabla, flecha y nota: cada una responde algo distinto.'),
    xpHaz('hoja', '¿Dónde buscarías si los datos valen para perros de finca? Subráyalo.', { modo: 'toca', letras: ['título', 'tabla', 'flecha', 'nota'], meta: [3], paras: [['¿Cuánto duerme tu perro?'], ['Cachorro: 18 horas. Adulto: 13.'], ['Más juego → mejor sueño'], ['Datos de 60 perros de ciudad.']], pista: 'Busca la parte que dice a quiénes se midió.' }, 'La nota aclara que son perros de ciudad.')],
  ['Tamaño y color',
    xpMira('hoja', 'Segunda idea: la **forma** también habla.', { paras: [['LETRA ENORME: «¡Gratis!»'], ['Fondo rojo: «Solo hoy»'], ['letra pequeña: aplican condiciones']] }, [
      ['Lo enorme se ve primero.', { luz: [0], nota: { 0: 'se destaca' } }],
      ['El rojo hace sentir urgencia.', { luz: [1], nota: { 1: 'apura' } }],
      ['Lo pequeño se lee de último, o no se lee.', { luz: [2], nota: { 2: 'se esconde' } }],
      ['Y a veces es lo más importante.', { luz: [2] }],
      ['Pregunta qué se destaca y qué se esconde.', { luz: [0, 2] }],
    ], 'Grande y rojo atraen; lo pequeño también dice.'),
    xpHaz('hoja', 'Un yogur dice «0 % grasa» en grande y, en letra pequeña, «22 g de azúcar». Subraya lo que busca el diseño.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que se note el azúcar.'], ['Que parezca saludable.'], ['Que se lea todo por igual.']], pista: '¿Qué ves primero?' }, 'Destaca lo que conviene y disimula el azúcar.')],
  ['Números con nota',
    xpMira('hoja', 'Tercera idea: un número necesita su **total** y su **nota**.', { paras: [['Barrio A: 30 robos. Barrio B: 20.'], ['A: 60 000 personas. B: 10 000.'], ['A: 1 por cada 2 000. B: 1 por cada 500.']] }, [
      ['Parece que A está peor.', { luz: [0] }],
      ['Pero A tiene mucha más gente.', { luz: [1], nota: { 1: 'el total' } }],
      ['Por persona, B está peor.', { luz: [2], nota: { 2: 'comparado' } }],
      ['El mismo dato cambia con su total.', { luz: [0, 2] }],
      ['Antes de comparar, busca de cuántos se habla.', {}],
    ], 'Compara con el total: no solo cuenta cuántos, sino de cuántos.'),
    xpHaz('hoja', 'Curso A: 6 perdieron de 30. Curso B: 5 perdieron de 20. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Le fue peor a A, porque son 6.'], ['Les fue igual.'], ['Le fue peor a B: uno de cada cuatro.']], pista: 'Saca la parte de cada curso.' }, '6 de 30 es un quinto; 5 de 20, un cuarto.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Etiqueta: «Jugo de mora. Contenido de fruta: 8 %». Al lado, una foto enorme de moras. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La imagen sugiere más fruta de la que hay.'], ['Es casi todo mora.'], ['La etiqueta miente sobre el porcentaje.']], pista: 'Compara la foto con el número.' }, 'El dato está, pero la foto da otra idea.')],
], 'Mira qué hace cada parte, qué se destaca y con qué total se compara.');

xpLec('icf-lc-discontinuo-2', [
  ['Globos y cartelas',
    xpMira('hoja', 'Empecemos por la idea: en un cómic, el **borde** y el lugar del texto dicen quién habla y cómo.', { letras: ['1', '2', '3', '4'], paras: [['Globo liso: «Ya voy».'], ['Globo de nube: «Qué pereza».'], ['Globo con puntas: «¡YA VOY!»'], ['Cartela: «Dos horas después…»']] }, [
      ['Liso: lo dice en voz normal.', { luz: [0], nota: { 0: 'habla' } }],
      ['Nube: lo piensa y nadie lo oye.', { luz: [1], nota: { 1: 'piensa' } }],
      ['Con puntas: lo grita.', { luz: [2], nota: { 2: 'grita' } }],
      ['La cartela es la voz que narra.', { luz: [3], nota: { 3: 'narra' } }],
      ['Lo que dice y lo que piensa no coinciden: ahí está el chiste.', { luz: [0, 1] }],
    ], 'Liso habla, nube piensa, puntas grita, cartela narra.'),
    xpHaz('hoja', 'Pon al margen qué hace cada texto.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['grita', 'narra', 'piensa'], meta: [2, 0, 1], paras: [['Nube: «Ojalá no me vea».'], ['Puntas: «¡CUIDADO!»'], ['Recuadro: «Esa noche…»']], pista: 'Alguna no va ahí: mira el borde de cada uno.' }, 'La nube piensa, las puntas gritan y el recuadro narra.')],
  ['Planos y color',
    xpMira('hoja', 'Segunda idea: el **plano** y el **color** cambian lo que sientes.', { paras: [['Plano general: una niña diminuta en un patio enorme.'], ['Primer plano: sus ojos.'], ['Última viñeta, de repente a color: alguien le da la mano.']] }, [
      ['Verla diminuta la hace ver sola.', { luz: [0], nota: { 0: 'soledad' } }],
      ['Acercarse a los ojos muestra lo que siente.', { luz: [1], nota: { 1: 'emoción' } }],
      ['El color aparece con la compañía.', { luz: [2], nota: { 2: 'cambio' } }],
      ['Nadie dijo «estaba triste».', { luz: [0, 1] }],
      ['El dibujo lo dijo.', { luz: [2] }],
    ], 'Lejos empequeñece, cerca emociona, el color marca un cambio.'),
    xpHaz('hoja', 'Un jefe se dibuja visto desde abajo, gigante, ante un empleado pequeño. Subraya lo que sugiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El poder que tiene sobre el otro'], ['Que el empleado es un niño'], ['Que el edificio es alto']], pista: '¿Qué sientes al ver a alguien desde abajo?' }, 'El ángulo hace sentir el poder.')],
  ['Entre viñetas',
    xpMira('hoja', 'Tercera idea: lo que **no se dibuja** lo completas tú.', { paras: [['Viñeta 1: un jarrón en la mesa; un balón en el aire.'], ['Viñeta 2: un niño barre, con cara inocente.'], ['Viñeta 3: la mamá mira la mesa vacía.']] }, [
      ['Aquí el jarrón está entero.', { luz: [0] }],
      ['Aquí ya se está limpiando algo.', { luz: [1] }],
      ['¿Qué pasó en medio? El balón lo rompió.', { luz: [0, 1], nota: { 1: 'lo completas tú' } }],
      ['No se ve, pero se deduce.', {}],
      ['El humor está en lo que todos sabemos.', { luz: [2] }],
    ], 'Une una viñeta con la siguiente: lo que falta se deduce.'),
    xpHaz('hoja', 'Viñeta 1: un gato mira una pecera. Viñeta 2: el gato, mojado; el pez, en su sitio. Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El gato se comió el pez.'], ['Llovió en la sala.'], ['El gato intentó sacarlo y no pudo.']], pista: 'Une las dos viñetas.' }, 'Está mojado y el pez sigue: lo intentó sin éxito.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Viñeta: todos miran el celular en una mesa; el abuelo le sirve sopa a una silla vacía. Globo del abuelo: «Al menos usted me escucha». Subraya lo que critica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La comida del abuelo'], ['Que la familia está, pero no se atiende'], ['Que falta una persona en la mesa']], pista: 'Compara a quién le habla con quienes están presentes.' }, 'Prefiere una silla a quienes no lo oyen.')],
], 'Lee el borde, el plano, el color y lo que ocurre entre viñetas.');

xpLec('icf-lc-discontinuo-3', [
  ['Varias piezas, un tema',
    xpMira('hoja', 'Empecemos por la idea: una página puede mezclar **titular, dato, voz y foto** sobre lo mismo.', { letras: ['titular', 'dato', 'voz', 'foto'], paras: [['«El río volvió a tener peces»'], ['De 3 especies a 11 en cinco años'], ['«Yo no pescaba desde niño», dice Luis'], ['Pie de foto: la orilla, antes y ahora']] }, [
      ['El titular da la noticia.', { luz: [0], nota: { 0: 'qué pasó' } }],
      ['El dato dice cuánto.', { luz: [1], nota: { 1: 'cuánto' } }],
      ['La voz dice qué significó para alguien.', { luz: [2], nota: { 2: 'para quién' } }],
      ['La foto deja comparar.', { luz: [3], nota: { 3: 'cómo se ve' } }],
      ['Cada una aporta lo que las otras no tienen.', {}],
    ], 'Pregunta qué se sabría solo con cada pieza.'),
    xpHaz('hoja', 'Subraya la pieza que dice **cuánto** cambió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«Nos cambió la vida», cuenta Rosa.'], ['La basura bajó de 40 a 12 toneladas.'], ['Foto: una cuadra limpia.']], pista: 'Busca números.' }, 'La voz y la foto no dicen cuánto.')],
  ['Completan o contradicen',
    xpMira('hoja', 'Segunda idea: una pieza puede **completar** a otra o **contradecirla**.', { paras: [['Encuesta: 9 de cada 10 exalumnos que contestaron tienen empleo.'], ['Mensaje: «No contesté porque me dio pena no tener».'], ['Conclusión posible: casi todos tienen empleo.'], ['Conclusión justa: casi todos los que contestaron lo tienen.']] }, [
      ['La encuesta muestra una parte.', { luz: [0] }],
      ['El mensaje trae a quien falta.', { luz: [1], nota: { 1: 'falta en la encuesta' } }],
      ['Con ese mensaje, la primera ya no se sostiene.', { luz: [2], tacha: [2] }],
      ['Esta conclusión usa las dos piezas.', { luz: [3], nota: { 3: 'justa' } }],
      ['Busca siempre quién no respondió.', { luz: [1] }],
    ], 'Una pieza puede mostrar lo que otra deja por fuera.'),
    xpHaz('hoja', 'Encuesta en la página web: el 95 % usa internet a diario. Nota: «Se respondió por internet». Subraya lo que falta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Un dibujo más grande'], ['El color de la página'], ['Quienes no tienen internet']], pista: '¿Quién no pudo responder?' }, 'Sin ellos, el 95 % dice de más.')],
  ['Concluir con todo',
    xpMira('hoja', 'Tercera idea: la mejor conclusión **cabe en todas las piezas**.', { paras: [['Tabla: menos basura en el parque, más en el río.'], ['Voz: «Da gusto jugar aquí», dice un niño del parque.'], ['«La basura se acabó».'], ['«La basura bajó en el parque y subió en el río».']] }, [
      ['La tabla muestra los dos lugares.', { luz: [0] }],
      ['La voz habla de uno solo.', { luz: [1], nota: { 1: 'una parte' } }],
      ['Esta conclusión se olvida del río.', { luz: [2], tacha: [2] }],
      ['Esta cabe en la tabla y en la voz.', { luz: [3], nota: { 3: 'cabe en las dos' } }],
      ['Revisa tu conclusión con cada pieza.', {}],
    ], 'Si una pieza la contradice, la conclusión dice de más.'),
    xpHaz('hoja', 'Tabla: 8 de 10 pasaron. Voz: «A mí nadie me explicó». Subraya la conclusión que cabe en **las dos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La mayoría pasó, pero a alguien le faltó apoyo.'], ['A todos les fue bien.'], ['El curso fue un fracaso.']], pista: 'Prueba cada una con la tabla y con la voz.' }, 'Solo la primera respeta el dato y la voz.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Titular: «Ciudad feliz». Gráfica: 6 de cada 10 se sienten bien. Foto: un parque lleno. Subraya la crítica **justa** al titular.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Es mentira: nadie está bien.'], ['Generaliza: 4 de cada 10 no se sienten bien.'], ['La foto debería ser más grande.']], pista: 'Compara la palabra del titular con el dato.' }, 'El titular dice de toda la ciudad lo que vale para seis de diez.')],
], 'Qué aporta cada pieza, quién falta y qué conclusión cabe en todas.');
;
//#archivo js/explora-icf-lc-7.js
// Preicfes · Lectura Crítica, mundo 7 «Evaluar un Texto» (Explora, escena «hoja»). Textos cortos propios.
xpLec('icf-lc-evalua-1', [
  ['Lo que se da por hecho',
    xpMira('hoja', 'Empecemos por la idea: un **supuesto** no se escribe, pero la idea lo necesita.', { letras: ['idea', 'a', 'b', 'c'], paras: [['Hay que poner más buses para que la gente deje el carro.'], ['Si hay más buses, la gente los usará.'], ['Los buses son grandes.'], ['La gente deja el carro por gusto.']] }, [
      ['Esta es la idea escrita.', { luz: [0], nota: { 0: 'lo dice' } }],
      ['Si esto no fuera cierto, la idea se cae.', { luz: [1], nota: { 1: 'lo supone' } }],
      ['Esto es cierto, pero la idea no lo necesita.', { luz: [2], tacha: [2] }],
      ['Esto tampoco hace falta para que funcione.', { luz: [3], tacha: [3] }],
      ['La prueba: niégalo y mira si la idea aguanta.', { luz: [0, 1] }],
    ], 'Supuesto: si lo niegas, la idea se cae.'),
    xpHaz('hoja', '«Regalen libros y los niños leerán más». Subraya el **supuesto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los libros son de papel.'], ['Los niños no leen porque no tienen libros.'], ['Los niños son pequeños.']], pista: 'Niega cada uno y mira cuál tumba la idea.' }, 'Si no leyeran por otra razón, regalar no bastaría.')],
  ['Para qué escribe',
    xpMira('hoja', 'Segunda idea: la **intención** es lo que el autor busca en ti.', { paras: [['«Vuelva a mirar su plato antes de botarlo».'], ['«En 2020 se botaron mil toneladas».'], ['«Ese plato lo sembró alguien como su abuelo».']] }, [
      ['Aquí invita a hacer algo.', { luz: [0], nota: { 0: 'mover a actuar' } }],
      ['Aquí informa con un dato.', { luz: [1], nota: { 1: 'informar' } }],
      ['Aquí busca que sientas.', { luz: [2], nota: { 2: 'conmover' } }],
      ['Todo junto: que no desperdicies comida.', { luz: [0, 1, 2] }],
      ['La intención es del texto completo, no de una frase.', {}],
    ], 'Pregunta qué haría un lector convencido.'),
    xpHaz('hoja', 'Un texto cuenta tres accidentes y termina: «¿Y usted, se abrochó?». Subraya la intención.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Narrar historias tristes'], ['Vender carros'], ['Que el lector use el cinturón']], pista: 'Mira a quién va dirigida la última pregunta.' }, 'Los relatos sirven para mover al lector.')],
  ['Recursos y honestidad',
    xpMira('hoja', 'Tercera idea: mira **con qué** convence y si **reconoce límites**.', { paras: [['Una anécdota de su vecina'], ['Una ironía: «claro, la culpa es del perro»'], ['«No sé si fue por eso»']] }, [
      ['La anécdota muestra un caso, no prueba todos.', { luz: [0], nota: { 0: 'muestra' } }],
      ['La ironía critica diciendo lo contrario.', { luz: [1], nota: { 1: 'critica' } }],
      ['Reconocer una duda da confianza.', { luz: [2], nota: { 2: 'honesto' } }],
      ['Quien nunca duda merece más revisión.', {}],
      ['El recurso no hace verdadera la idea.', { luz: [0, 1] }],
    ], 'Caso, ironía, duda: cada recurso tiene su efecto.'),
    xpHaz('hoja', 'Subraya la frase que **reconoce un límite**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Está probado sin discusión.'], ['Puede que influyera también el clima.'], ['Todos lo saben.']], pista: 'Busca la que deja una duda.' }, '«Puede que» admite otra explicación.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Desde que cerramos la ventana nadie se resfrió. La ventana era la culpable». Subraya el supuesto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Nada más cambió en ese tiempo.'], ['La ventana era de vidrio.'], ['Hacía calor.']], pista: 'Si otra cosa hubiera cambiado, ¿seguiría siendo la ventana?' }, 'Si cambió algo más, la ventana podría no ser la causa.')],
], 'Busca lo que supone, para qué escribe y con qué convence.');

xpLec('icf-lc-evalua-2', [
  ['¿Alcanza para decir eso?',
    xpMira('hoja', 'Empecemos por la idea: un enunciado es válido si su **respaldo alcanza**.', { letras: ['dato', 'a', 'b'], paras: [['12 personas tomaron té y 9 durmieron mejor.'], ['El té hace dormir a todo el mundo.'], ['En ese grupo, la mayoría durmió mejor.']] }, [
      ['Este es el respaldo: doce personas.', { luz: [0] }],
      ['«Todo el mundo» va mucho más allá.', { luz: [1], tacha: [1], nota: { 1: 'dice de más' } }],
      ['Esto es justo lo que se vio.', { luz: [2], nota: { 2: 'alcanza' } }],
      ['Y falta comparar con quien no tomó té.', { luz: [0] }],
      ['Pregunta: ¿cuántos, quiénes y comparados con qué?', {}],
    ], 'Cuántos, quiénes y comparados con qué.'),
    xpHaz('hoja', 'Se probó un champú en 8 amigas del fabricante. Subraya lo que **sí** se puede decir.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Sirve para todas las mujeres.'], ['Es el mejor del mercado.'], ['Esas ocho personas dieron su opinión.']], pista: 'Busca lo que no va más allá de las ocho.' }, 'Pocas y elegidas: no alcanza para más.')],
  ['Trampas con nombre',
    xpMira('hoja', 'Segunda idea: hay **trampas** que parecen razones.', { paras: [['«Siempre se ha hecho así».'], ['«¿Qué va a saber ese muchacho?».'], ['«Si no es blanco, es negro».'], ['«Lo natural no daña».']] }, [
      ['La costumbre no prueba que sea bueno.', { luz: [0], nota: { 0: 'costumbre' } }],
      ['Atacar a quien habla no responde la idea.', { luz: [1], nota: { 1: 'ataque' } }],
      ['Hay más de dos opciones.', { luz: [2], nota: { 2: 'falsa elección' } }],
      ['El veneno de víbora es natural.', { luz: [3], nota: { 3: 'generaliza' } }],
      ['Con nombre se reconocen más rápido.', {}],
    ], 'Costumbre, ataque, falsa elección y generalización.'),
    xpHaz('hoja', 'Pon al margen la trampa de cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['ataque', 'costumbre', 'falsa elección'], meta: [1, 2, 0], paras: [['Mi abuelo lo hacía y vivió noventa.'], ['O compras este celular o te quedas atrás.'], ['Usted ni siquiera terminó el colegio.']], pista: 'Alguna no va ahí: ¿mira al pasado, deja dos salidas o ataca a alguien?' }, 'Pasado, dos salidas y ataque.')],
  ['¿Quién habla?',
    xpMira('hoja', 'Tercera idea: revisa más a quien **tiene un interés**.', { letras: ['1', '2', '3'], paras: [['Vendedor: «Nuestro colchón cura la espalda».'], ['Estudio: «Se probó en 30; no se comparó».'], ['Letra gris: «Resultados pueden variar».']] }, [
      ['Quien vende gana si le crees.', { luz: [0], nota: { 0: 'interés' } }],
      ['Quien investiga dice sus límites.', { luz: [1], nota: { 1: 'límites' } }],
      ['La letra gris confiesa lo que la grande calla.', { luz: [2], nota: { 2: 'confiesa' } }],
      ['Tener interés no es mentir, pero exige revisar.', { luz: [0] }],
      ['Busca otra voz sin ese interés.', {}],
    ], 'Interés, límites y letra pequeña.'),
    xpHaz('hoja', 'Subraya la fuente que conviene revisar con **más** cuidado sobre una bebida.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La empresa que la fabrica'], ['Una nutricionista sin relación con ella'], ['Un estudio con grupo de comparación']], pista: '¿Quién gana si le creen?' }, 'La empresa tiene interés en que se venda.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nadie ha probado que no funcione; entonces funciona». Subraya el error.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ataca a una persona.'], ['Que no se haya refutado no lo prueba.'], ['Usa la costumbre.']], pista: 'No tener prueba en contra no es tener prueba a favor.' }, 'La falta de prueba no es una prueba.')],
], 'Mide el respaldo, nombra la trampa y mira quién habla.');

xpLec('icf-lc-evalua-3', [
  ['Valores',
    xpMira('hoja', 'Empecemos por la idea: detrás de una postura hay un **valor**.', { letras: ['1', '2', '3'], paras: [['«Primero los que llegaron primero».'], ['«Primero los que más lo necesitan».'], ['«Que cada uno decida».']] }, [
      ['Aquí se valora el orden de llegada.', { luz: [0], nota: { 0: 'orden' } }],
      ['Aquí se valora la necesidad.', { luz: [1], nota: { 1: 'solidaridad' } }],
      ['Aquí, la libertad de cada quien.', { luz: [2], nota: { 2: 'libertad' } }],
      ['Nadie dijo la palabra: se nota en lo que pide.', {}],
      ['Dos personas pueden valorar cosas distintas sin mentir.', { luz: [0, 1] }],
    ], 'Mira qué pone primero: ese es su valor.'),
    xpHaz('hoja', '«Que paguen más los que más ganan». Subraya el valor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Libertad individual'], ['Justicia en el reparto'], ['Respeto a la tradición']], pista: '¿Qué quiere igualar?' }, 'Busca que la carga se reparta según lo que se tiene.')],
  ['Imágenes que delatan',
    xpMira('hoja', 'Segunda idea: una **comparación** muestra cómo se ve el mundo.', { paras: [['«La escuela es una fábrica».'], ['«La escuela es un jardín».'], ['«La escuela es una cancha».']] }, [
      ['Fábrica: produce cosas iguales.', { luz: [0], nota: { 0: 'resultados' } }],
      ['Jardín: cada uno crece a su paso.', { luz: [1], nota: { 1: 'cuidado' } }],
      ['Cancha: alguien gana y alguien pierde.', { luz: [2], nota: { 2: 'competencia' } }],
      ['La misma escuela, tres miradas.', { luz: [0, 1, 2] }],
      ['Pregunta qué destaca y qué esconde la imagen.', {}],
    ], 'La imagen destaca algo y esconde lo demás.'),
    xpHaz('hoja', '«El bosque es un banco de madera». Subraya lo que **esconde** esa imagen.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Que se puede vender'], ['Que tiene madera'], ['Que es hogar de seres vivos']], pista: 'Un banco guarda algo para gastar: ¿qué queda por fuera?' }, 'Lo muestra como dinero y calla la vida.')],
  ['Acuerdos y choques',
    xpMira('hoja', 'Tercera idea: dos textos pueden **coincidir** en un hecho y **chocar** en lo que proponen.', { paras: [['Uno: «Hubo injusticia. Pongan una placa».'], ['Otro: «Hubo injusticia. Quiten el busto».'], ['Coinciden en el hecho.'], ['Chocan en la salida.']] }, [
      ['El primero reconoce algo y propone.', { luz: [0] }],
      ['El segundo reconoce lo mismo.', { luz: [1] }],
      ['Ninguno niega el hecho.', { luz: [2], nota: { 2: 'acuerdo' } }],
      ['La diferencia está en qué hacer.', { luz: [3], nota: { 3: 'choque' } }],
      ['Antes de decir que se oponen, busca en qué están de acuerdo.', {}],
    ], 'Separa el hecho, el valor y la propuesta.'),
    xpHaz('hoja', 'Uno: «Hay ruido; multen». Otro: «Hay ruido; eduquen». Subraya en qué **coinciden**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['En que hay un problema'], ['En multar'], ['En educar']], pista: 'Mira la primera parte de cada frase.' }, 'Los dos ven el ruido; difieren en la salida.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Esos edificios viejos son arrugas: se ven mal, pero cuentan quién eres». Subraya lo que valora.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo nuevo'], ['La memoria de la ciudad'], ['El ahorro']], pista: '¿Qué dice que cuentan las arrugas?' }, 'Compara lo viejo con lo que cuenta la propia historia.')],
], 'Qué pone primero, qué imagen usa y en qué coincide con otros.');
;
//#archivo js/explora-icf-lc-8.js
// Preicfes · Lectura Crítica, mundo 8 «Comparar Textos» (Explora, escena «hoja»). Parejas cortas propias.
xpLec('icf-lc-comparar-1', [
  ['Lo que comparten',
    xpMira('hoja', 'Empecemos por la idea: primero busca qué **comparten** dos textos.', { letras: ['1', '2', 'sí', 'no'], paras: [['Las bicicletas reducen el ruido y el humo.'], ['Mi bicicleta cruje, pero me lleva.'], ['Los dos hablan de bicicletas.'], ['Los dos hablan del humo.']] }, [
      ['El primero informa un efecto.', { luz: [0] }],
      ['El segundo cuenta algo personal.', { luz: [1] }],
      ['El tema es común.', { luz: [0, 1, 2], nota: { 2: 'vale en los dos' } }],
      ['El humo solo está en uno.', { luz: [3], tacha: [3] }],
      ['Para decir «los dos», debe estar en los dos.', {}],
    ], '«Los dos» exige encontrarlo en cada uno.'),
    xpHaz('hoja', 'T1: «Leer en voz alta une a la familia». T2: «Mi papá leía y todos callábamos». Subraya lo que vale en **los dos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Leer es obligatorio.'], ['Leer en voz alta reúne a la gente.'], ['El papá lee mal.']], pista: 'Busca la idea que puedas señalar en ambos.' }, 'Uno lo afirma y el otro lo muestra.')],
  ['Propósito y tono',
    xpMira('hoja', 'Segunda idea: el mismo tema puede tener **otro propósito** y **otro tono**.', { paras: [['«Hierva el agua cinco minutos».'], ['«Esa agua, dice mi tía, tiene más bichos que el circo».'], ['«El 30 % de los pozos no es potable».']] }, [
      ['Aquí se dan instrucciones.', { luz: [0], nota: { 0: 'instruir' } }],
      ['Aquí, en cambio, se bromea.', { luz: [1], nota: { 1: 'humor' } }],
      ['Aquí se informa con un dato.', { luz: [2], nota: { 2: 'informar' } }],
      ['Las tres hablan del agua.', { luz: [0, 1, 2] }],
      ['Pregunta qué busca cada uno en ti.', {}],
    ], 'Instruir, informar, divertir, convencer, conmover.'),
    xpHaz('hoja', 'Pon al margen el propósito de cada texto sobre un volcán.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['advertir', 'informar', 'conmover'], meta: [1, 2, 0], paras: [['Mide 5 321 metros y está activo.'], ['Abuela, tu casa quedó debajo de la ceniza.'], ['Si oye la sirena, salga de inmediato.']], pista: 'Alguna no va ahí: ¿da datos, hace sentir o avisa?' }, 'Datos, emoción y aviso.')],
  ['Cómo se relacionan',
    xpMira('hoja', 'Tercera idea: un texto puede **ejemplificar**, **ampliar**, **matizar** o **contradecir** a otro.', { letras: ['T1', 'a', 'b', 'c'], paras: [['Caminar hace bien.'], ['Doña Inés camina y ya no usa bastón.'], ['Caminar hace bien, salvo con calor extremo.'], ['Caminar no sirve para nada.']] }, [
      ['Esta es la idea del primero.', { luz: [0] }],
      ['Un caso la muestra.', { luz: [1], nota: { 1: 'ejemplifica' } }],
      ['Una condición la limita.', { luz: [2], nota: { 2: 'matiza' } }],
      ['Y esta la niega.', { luz: [3], nota: { 3: 'contradice' } }],
      ['Matizar no es contradecir: pone un límite.', { luz: [2] }],
    ], 'Ejemplifica, amplía, matiza o contradice.'),
    xpHaz('hoja', 'T1: «Las redes informan rápido». T2: «Rápido no siempre es cierto: verifique». Subraya la relación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['T2 ejemplifica a T1.'], ['T2 matiza a T1.'], ['T2 repite a T1.']], pista: '¿Niega que informen rápido o le pone un límite?' }, 'No lo niega: agrega una condición.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'T1: «El mural cubre una pared rota». T2: «Pintar no arregla grietas». Subraya lo que T2 le **objetaría** a T1.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que taparla no resuelve el daño'], ['Que los murales son feos'], ['Que no hay paredes rotas']], pista: 'Usa la idea de T2 sobre lo que cuenta T1.' }, 'Cubrir no es reparar.')],
], 'Qué comparten, qué busca cada uno y cómo se relacionan.');

xpLec('icf-lc-comparar-2', [
  ['La tesis de cada uno',
    xpMira('hoja', 'Empecemos por la idea: di en una frase **qué propone** cada uno.', { letras: ['T1', 'T2', 'mal', 'bien'], paras: [['Cierren la pista: hace ruido.'], ['No la cierren: pónganle horario.'], ['T1 habla de ruido y T2 de horas.'], ['T1 pide cerrar; T2, regular.']] }, [
      ['El primero propone cerrar.', { luz: [0], nota: { 0: 'cerrar' } }],
      ['El segundo, poner horario.', { luz: [1], nota: { 1: 'regular' } }],
      ['Esto nombra temas, no tesis.', { luz: [2], tacha: [2] }],
      ['Esto sí compara lo que proponen.', { luz: [3], nota: { 3: 'compara tesis' } }],
      ['El ruido lo reconocen los dos.', { luz: [0, 1] }],
    ], 'Tesis contra tesis, no tema contra tema.'),
    xpHaz('hoja', 'T1: «Más tareas, más disciplina». T2: «Más juego, más curiosidad». Subraya la mejor comparación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los dos hablan de niños.'], ['T1 es largo y T2 corto.'], ['T1 valora la disciplina y T2, la curiosidad.']], pista: 'Busca la que dice qué defiende cada uno.' }, 'Compara lo que cada uno pone primero.')],
  ['Cómo responde',
    xpMira('hoja', 'Segunda idea: un texto puede **conceder**, **refutar** o **atacar**.', { paras: [['«Es cierto que cuesta».'], ['«Pero ahorra en dos años».'], ['«Usted qué va a saber».'], ['«Su propio dato dice seis años».']] }, [
      ['Reconoce algo del otro.', { luz: [0], nota: { 0: 'concede' } }],
      ['Y responde con una razón.', { luz: [1], nota: { 1: 'refuta' } }],
      ['Esto habla de la persona.', { luz: [2], tacha: [2], nota: { 2: 'ataca' } }],
      ['Esto usa el dato del otro.', { luz: [3], nota: { 3: 'usa su dato' } }],
      ['Usar el dato del otro suele ser lo más fuerte.', { luz: [3] }],
    ], 'Conceder, refutar, atacar o usar su propio dato.'),
    xpHaz('hoja', 'Pon al margen qué hace cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['refuta', 'ataca', 'concede'], meta: [2, 0, 1], paras: [['Tiene razón en que es lejos.'], ['Pero el bus llega en diez minutos.'], ['Usted siempre se queja.']], pista: 'Alguna no va ahí: ¿acepta, responde o habla de la persona?' }, 'Acepta, responde y habla de la persona.')],
  ['Lo que nadie contestó',
    xpMira('hoja', 'Tercera idea: mira qué argumento **quedó sin respuesta**.', { letras: ['A1', 'A2', 'B'], paras: [['A: la obra da empleo.'], ['A: y acorta el viaje.'], ['B: el viaje se acorta solo seis años.']] }, [
      ['A dio dos razones.', { luz: [0, 1] }],
      ['B respondió la del viaje.', { luz: [2, 1], nota: { 1: 'respondida' } }],
      ['La del empleo sigue en pie.', { luz: [0], nota: { 0: 'sin respuesta' } }],
      ['Eso no prueba que A tenga razón en todo.', {}],
      ['Pero señala qué le falta a B.', { luz: [0] }],
    ], 'Pon cada razón con su respuesta: mira cuál quedó sola.'),
    xpHaz('hoja', 'A: «El perro cuida y acompaña». B: «Una alarma cuida igual». Subraya lo que B **no** respondió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que cuida'], ['Que acompaña'], ['Que ladra']], pista: 'Empareja cada razón con su respuesta.' }, 'La alarma no acompaña: esa razón quedó en pie.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'T1: «El zoológico educa: vienen mil niños». T2: «Vienen, comen helado y se van». Subraya qué hace T2.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Acepta el dato y niega lo que T1 concluye.'], ['Niega que vengan niños.'], ['Apoya la conclusión de T1.']], pista: '¿Discute que vengan o que aprendan?' }, 'Reconoce que vienen, pero no que eso eduque.')],
], 'Tesis, respuesta y lo que quedó sin contestar.');
;
//#archivo js/explora-icf-sc.js
// Preicfes · Sociales y Ciudadanas, mundo 1 «Constitución y Estado» (Explora, escena «hoja»). Casos cortos propios.
xpLec('icf-sc-constitucion-1', [
  ['Estado social de derecho',
    xpMira('hoja', 'Empecemos por la idea: el artículo 1 dice que Colombia es un Estado **social** y **de derecho**.', { paras: [['Un gobernador quiere cerrar una emisora que lo critica.'], ['Ninguna ley se lo permite.'], ['En un pueblo no hay agua potable.'], ['El Estado tiene que buscar cómo llevarla.']] }, [
      ['El gobernador quiere hacer su voluntad.', { luz: [0] }],
      ['No puede: todos, también él, están bajo la ley.', { luz: [0, 1], nota: { 1: 'de derecho' } }],
      ['Ahora otro caso: falta algo básico para vivir.', { luz: [2] }],
      ['No basta con no estorbar: el Estado debe garantizarlo.', { luz: [2, 3], nota: { 3: 'social' } }],
      ['De derecho pone límites; social pone deberes.', {}],
    ], 'De derecho: todos bajo la ley. Social: el Estado garantiza vida digna.'),
    xpHaz('hoja', 'Pon al margen qué parte de la definición se ve en cada caso.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['social', 'de derecho'], meta: [1, 0], paras: [['Una ministra debe obedecer un fallo.'], ['Se crea un subsidio para ancianos pobres.']], pista: 'Pregunta si el caso pone un límite al poder o atiende una necesidad.' }, 'Obedecer el fallo es un límite; el subsidio, un deber social.')],
  ['Tres ramas',
    xpMira('hoja', 'Segunda idea: el poder se **divide** para que nadie lo tenga todo.', { paras: [['El Congreso aprueba una ley de bosques.'], ['El presidente la hace cumplir.'], ['Un juez resuelve la pelea por un bosque.']] }, [
      ['Hacer las leyes: rama legislativa.', { luz: [0], nota: { 0: 'legislativa' } }],
      ['Gobernar y hacerlas cumplir: rama ejecutiva.', { luz: [1], nota: { 1: 'ejecutiva' } }],
      ['Resolver conflictos según la ley: rama judicial.', { luz: [2], nota: { 2: 'judicial' } }],
      ['Gobernadores y alcaldes también son de la ejecutiva.', { luz: [1] }],
      ['Si uno hiciera las tres cosas, nadie podría frenarlo.', {}],
    ], 'Legislativa hace leyes, ejecutiva gobierna, judicial decide conflictos.'),
    xpHaz('hoja', 'Pon al margen la rama de cada uno.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['judicial', 'legislativa', 'ejecutiva'], meta: [2, 0, 1], paras: [['Una alcaldesa abre un centro de salud.'], ['Un magistrado niega una demanda.'], ['Una senadora propone una ley.']], pista: 'Mira el verbo: ¿gobierna, decide un conflicto o propone leyes?' }, 'El verbo de cada oración dice la rama.')],
  ['Los que vigilan',
    xpMira('hoja', 'Tercera idea: fuera de las ramas hay **órganos de control** que vigilan.', { paras: [['¿Se gastó bien el dinero público?'], ['¿Un funcionario incumplió su deber?'], ['¿Quién ayuda a un ciudadano a reclamar?']] }, [
      ['La Contraloría sigue el dinero público.', { luz: [0], nota: { 0: 'Contraloría' } }],
      ['La Procuraduría investiga la conducta de los funcionarios.', { luz: [1], nota: { 1: 'Procuraduría' } }],
      ['La Defensoría y las personerías acompañan al ciudadano.', { luz: [2], nota: { 2: 'Defensoría' } }],
      ['No hacen leyes ni gobiernan: vigilan a quienes lo hacen.', {}],
      ['Dinero, conducta y derechos: tres preguntas distintas.', { luz: [0, 1, 2] }],
    ], 'Contraloría: dinero. Procuraduría: conducta. Defensoría: derechos.'),
    xpHaz('hoja', 'Subraya el caso que le toca a la **Contraloría**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un inspector maltrata a una usuaria.'], ['Se pagó una cancha que no existe.'], ['Una vecina no sabe cómo pedir una cita.']], pista: 'Busca el caso donde se siguió mal el rastro del dinero.' }, 'El rastro del dinero público es de la Contraloría.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un alcalde quiere contratar una obra sin permiso del concejo. Subraya la **mejor** razón para impedirlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La obra es fea.'], ['El concejo es más popular.'], ['Nadie debe decidir solo sobre el dinero público.']], pista: 'Esa es un gusto o una comparación. Busca la razón que habla de repartir el poder.' }, 'La división del poder es lo que está en juego.')],
], 'Todos bajo la ley, con deberes sociales, poder dividido y alguien que vigile.');

xpLec('icf-sc-constitucion-2', [
  ['¿De quién es el derecho?',
    xpMira('hoja', 'Empecemos por la idea: antes de escoger la herramienta, mira **de quién** es el derecho.', { paras: [['A Luis no le entregan su medicina.'], ['Le niegan la matrícula por su religión.'], ['Una fábrica envenena el aire del barrio.'], ['Privatizan el andén de una calle.']] }, [
      ['La salud y la vida de una persona: derecho fundamental.', { luz: [0], nota: { 0: 'fundamental' } }],
      ['La igualdad y la educación también.', { luz: [1], nota: { 1: 'fundamental' } }],
      ['El aire es de todos a la vez: derecho colectivo.', { luz: [2], nota: { 2: 'colectivo' } }],
      ['El espacio público también es de todos.', { luz: [3], nota: { 3: 'colectivo' } }],
      ['Si al resolverlo ganan todos por igual, es colectivo.', {}],
    ], 'Fundamental: de cada persona. Colectivo: de todos a la vez.'),
    xpHaz('hoja', 'Subraya los **dos** casos de derechos colectivos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['Talan el único bosque del municipio.'], ['A Eva la despiden por enfermarse.'], ['Detienen a Iván sin orden.'], ['Cierran la plaza para un negocio.']], pista: 'Alguno le pasa a una sola persona. Busca lo que es de todos.' }, 'El bosque y la plaza son de todos.')],
  ['Las herramientas',
    xpMira('hoja', 'Segunda idea: cada problema tiene su **mecanismo**.', { paras: [['Pedir una respuesta a una autoridad.'], ['Proteger un derecho fundamental.'], ['Proteger un derecho colectivo.'], ['Exigir que se cumpla una norma.'], ['Defender la libertad de un detenido.']] }, [
      ['Para pedir respuesta: derecho de petición.', { luz: [0], nota: { 0: 'petición' } }],
      ['Para lo fundamental: acción de tutela.', { luz: [1], nota: { 1: 'tutela' } }],
      ['Para lo de todos: acción popular.', { luz: [2], nota: { 2: 'popular' } }],
      ['Si la norma existe y la ignoran: acción de cumplimiento.', { luz: [3], nota: { 3: 'cumplimiento' } }],
      ['Si alguien está preso ilegalmente: habeas corpus.', { luz: [4], nota: { 4: 'habeas corpus' } }],
    ], 'Respuesta, derecho fundamental, derecho de todos, norma o libertad.'),
    xpHaz('hoja', 'Pon al margen el mecanismo de cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['acción popular', 'derecho de petición', 'tutela'], meta: [2, 0, 1], paras: [['Le niegan una operación urgente.'], ['Botan escombros en la laguna.'], ['Quiere saber cuánto costó una obra.']], pista: 'Pregunta si es de una persona, de todos o si solo busca una respuesta.' }, 'Vida de alguien, laguna de todos y una pregunta.')],
  ['La tutela y su condición',
    xpMira('hoja', 'Tercera idea: la tutela es rápida, pero **no sirve para todo**.', { paras: [['La pone cualquier persona, sin abogado.'], ['El juez decide en diez días como máximo.'], ['Procede si no hay otro medio eficaz.'], ['O para evitar un daño que no se puede reparar.']] }, [
      ['La puede poner cualquiera: no necesita abogado.', { luz: [0], nota: { 0: 'quién' } }],
      ['Y el juez la decide en diez días, a lo sumo.', { luz: [1], nota: { 1: 'cuándo' } }],
      ['Pero solo si no hay otro camino eficaz.', { luz: [2], nota: { 2: 'condición' } }],
      ['O si el daño no da espera y hay que actuar ya.', { luz: [3] }],
      ['Cobrar una deuda, por ejemplo, tiene otro camino.', {}],
    ], 'Tutela: derecho fundamental en juego y ningún otro medio eficaz.'),
    xpHaz('hoja', '**Tacha** los dos casos en los que la tutela **no** es el camino.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['Le suspenden una quimioterapia.'], ['Un amigo no le paga un préstamo.'], ['El vecino le vendió un carro dañado.'], ['No dejan entrar a un niño al colegio por su pelo.']], pista: 'Alguna de las tachadas toca la vida, la salud o la igualdad.' }, 'Deudas y compras tienen otros jueces y otros caminos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una ley ordena publicar los contratos y la alcaldía no lo hace. Subraya el mecanismo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Habeas corpus'], ['Acción de tutela'], ['Acción de cumplimiento'], ['Derecho al voto']], pista: 'Ya hay una norma: lo que falta no es un derecho nuevo.' }, 'La norma existe; se exige que se cumpla.')],
], 'De quién es el derecho, qué se reclama y si hay otro camino: ahí sale la herramienta.');
;
//#archivo js/explora-icf-sc-2.js
// Preicfes · Sociales, mundo 2 «Participación y Control» (Explora, escena «hoja»). Casos cortos propios.
xpLec('icf-sc-participacion-1', [
  ['Elegir y decidir',
    xpMira('hoja', 'Empecemos por la idea: se puede **elegir a quien decide** o **decidir** directamente.', { paras: [['Votar por una gobernadora.'], ['Votar si se deroga una norma.'], ['El Congreso aprueba una ley.'], ['Firmar un proyecto ciudadano.']] }, [
      ['Elegir a alguien: democracia representativa.', { luz: [0], nota: { 0: 'representativa' } }],
      ['Decidir con el voto: participativa.', { luz: [1], nota: { 1: 'participativa' } }],
      ['Si deciden los elegidos, es representativa.', { luz: [2], nota: { 2: 'representativa' } }],
      ['Si actúan los ciudadanos, participativa.', { luz: [3], nota: { 3: 'participativa' } }],
      ['Colombia reconoce las dos desde 1991.', {}],
    ], 'Representativa: eligen y otros deciden. Participativa: deciden los ciudadanos.'),
    xpHaz('hoja', 'Subraya los **dos** casos de democracia participativa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['Elegir concejales.'], ['Responder una consulta popular.'], ['Votar un referendo.'], ['Un senador presenta un proyecto.']], pista: 'En alguna decide un elegido, no la gente.' }, 'En la consulta y el referendo decide la gente.')],
  ['Cada mecanismo, su uso',
    xpMira('hoja', 'Segunda idea: pregunta **qué se somete** a la gente.', { paras: [['¿Aprueba esta norma?'], ['¿Apoya esta decisión del presidente?'], ['¿Está de acuerdo con este proyecto del municipio?'], ['Hablemos del parque, sin votar.']] }, [
      ['Si se vota una norma, es un referendo.', { luz: [0], nota: { 0: 'referendo' } }],
      ['Una decisión del presidente: plebiscito.', { luz: [1], nota: { 1: 'plebiscito' } }],
      ['Un asunto de interés público: consulta popular.', { luz: [2], nota: { 2: 'consulta' } }],
      ['Conversar con el concejo: cabildo abierto.', { luz: [3], nota: { 3: 'cabildo' } }],
      ['Presentar una norma con firmas: iniciativa.', {}],
    ], 'Norma: referendo. Presidente: plebiscito. Asunto: consulta. Hablar: cabildo.'),
    xpHaz('hoja', 'Pon al margen el mecanismo.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['cabildo abierto', 'referendo', 'plebiscito'], meta: [1, 2, 0], paras: [['Votar para derogar una ley.'], ['El presidente pide apoyo a su política.'], ['Discutir con el concejo un problema.']], pista: 'Alguno no va ahí: ¿norma, decisión o conversación?' }, 'Ley, decisión presidencial y conversación.')],
  ['Retirar del cargo',
    xpMira('hoja', 'Tercera idea: la **revocatoria** tiene condiciones.', { letras: ['A', 'B', 'C', 'D'], paras: [['Alcaldesa con dos años que no cumple su programa.'], ['Presidente.'], ['Senador.'], ['Gobernador con tres meses.']] }, [
      ['A la alcaldesa sí se la puede revocar.', { luz: [0], nota: { 0: 'sí' } }],
      ['Al presidente no se le puede revocar.', { luz: [1], tacha: [1], nota: { 1: 'no' } }],
      ['A los congresistas tampoco.', { luz: [2], tacha: [2], nota: { 2: 'no' } }],
      ['El gobernador aún no: falta que pase un año.', { luz: [3], nota: { 3: 'todavía no' } }],
      ['Es por incumplir el programa de gobierno o por descontento ciudadano.', { luz: [0] }],
    ], 'Solo alcaldes y gobernadores, y después de un año.'),
    xpHaz('hoja', '**Tacha** a quienes **no** se les puede revocar el mandato.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['Una representante a la Cámara'], ['Un gobernador con dos años'], ['Una alcaldesa con quince meses'], ['La presidenta']], pista: 'Alguna de las tachadas es alcalde o gobernador con más de un año.' }, 'Ni congresistas ni presidentes.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un pueblo quiere proponer un acuerdo al concejo reuniendo firmas. Subraya el mecanismo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Plebiscito'], ['Revocatoria'], ['Iniciativa popular'], ['Tutela']], pista: 'No apoyan al presidente ni retiran a nadie: presentan una norma.' }, 'Presentar una norma con firmas es una iniciativa.')],
], 'Quién decide, qué se somete y a quién se aplica.');

xpLec('icf-sc-participacion-2', [
  ['Dinero, conducta, delito',
    xpMira('hoja', 'Empecemos por la idea: una misma falta abre **preguntas distintas**.', { paras: [['Pagaron un hospital que no se construyó.'], ['¿Cuánto dinero se perdió?'], ['¿El director incumplió su deber?'], ['¿Hubo un delito?']] }, [
      ['Arriba está la falta.', { luz: [0] }],
      ['Por el dinero pregunta la Contraloría.', { luz: [1], nota: { 1: 'Contraloría' } }],
      ['Por la conducta, la Procuraduría.', { luz: [2], nota: { 2: 'Procuraduría' } }],
      ['Por el delito, la Fiscalía.', { luz: [3], nota: { 3: 'Fiscalía' } }],
      ['Una respuesta no reemplaza a las otras.', {}],
    ], 'Contraloría: dinero. Procuraduría: conducta. Fiscalía: delito.'),
    xpHaz('hoja', 'Pon al margen quién pregunta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['Fiscalía', 'Contraloría', 'Procuraduría'], meta: [1, 2, 0], paras: [['¿Quién devuelve lo pagado de más?'], ['¿El inspector abusó de su cargo y debe ser sancionado?'], ['¿Hay que acusarlo ante un juez penal?']], pista: 'Busca dinero, sanción o acusación.' }, 'Devolver, sancionar y acusar.')],
  ['¿Dónde están?',
    xpMira('hoja', 'Segunda idea: no todos son **organismos de control**.', { paras: [['Contraloría'], ['Procuraduría'], ['Defensoría y personerías'], ['Fiscalía']] }, [
      ['La Contraloría es de control: el fiscal, del dinero.', { luz: [0], nota: { 0: 'control' } }],
      ['La Procuraduría dirige el Ministerio Público: control.', { luz: [1], nota: { 1: 'control' } }],
      ['La Defensoría y las personerías también son Ministerio Público.', { luz: [2], nota: { 2: 'control' } }],
      ['La Fiscalía no: es de la rama judicial.', { luz: [3], nota: { 3: 'rama judicial' } }],
      ['Investigar delitos no es lo mismo que vigilar el gasto.', {}],
    ], 'La Fiscalía investiga delitos, pero es de la rama judicial.'),
    xpHaz('hoja', '**Tacha** lo que **no** es un organismo de control.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Contraloría'], ['Fiscalía'], ['Procuraduría'], ['Congreso']], pista: 'Alguna de las tachadas vigila el dinero o la conducta.' }, 'La Fiscalía es judicial y el Congreso, legislativo.')],
  ['Los ojos de la gente',
    xpMira('hoja', 'Tercera idea: una **veeduría** vigila, pero no castiga.', { letras: ['A', 'B', 'C', 'D'], paras: [['Pedir copia del contrato.'], ['Visitar la obra.'], ['Multar al contratista.'], ['Denunciar ante la Contraloría.']] }, [
      ['Pedir información: sí puede.', { luz: [0], nota: { 0: 'sí' } }],
      ['Mirar y comparar: sí.', { luz: [1], nota: { 1: 'sí' } }],
      ['Multar: no, eso es del Estado.', { luz: [2], tacha: [2], nota: { 2: 'no' } }],
      ['Denunciar lo que encontró: sí.', { luz: [3], nota: { 3: 'sí' } }],
      ['Es control social: lo hacen los ciudadanos.', {}],
    ], 'La veeduría pide, mira y denuncia; sancionar es del Estado.'),
    xpHaz('hoja', 'Subraya lo que **sí** puede hacer una veeduría.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Encarcelar al alcalde'], ['Revisar lo que se pagó'], ['Firmar el contrato']], pista: 'Esa es tarea de jueces o de la alcaldía.' }, 'Revisar es vigilar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una funcionaria atiende solo a sus amigos, sin que se pierda dinero. Subraya quién la investiga.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Contraloría'], ['Congreso'], ['Procuraduría']], pista: 'No se perdió dinero: se discute su conducta.' }, 'La conducta de un funcionario es de la Procuraduría.')],
], 'Cada quien con su pregunta, y la gente con los ojos abiertos.');

xpLec('icf-sc-participacion-3', [
  ['La regla mayor',
    xpMira('hoja', 'Empecemos por la idea: las normas tienen **escalones**.', { paras: [['Constitución'], ['Ley del Congreso'], ['Acuerdo de un concejo'], ['Regla de un colegio']] }, [
      ['Arriba está la Constitución.', { luz: [0], nota: { 0: 'manda más' } }],
      ['Debajo, las leyes del Congreso.', { luz: [1] }],
      ['Debajo, lo que decide un concejo.', { luz: [2] }],
      ['Y las reglas de cada institución.', { luz: [3], nota: { 3: 'manda menos' } }],
      ['Si una de abajo contradice a la de arriba, no vale.', { luz: [0] }],
    ], 'Ninguna norma puede contradecir a la Constitución.'),
    xpHaz('hoja', 'La Constitución protege la libertad de cultos. Subraya la norma que **no** valdría.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Un acuerdo crea un parque.'], ['Una ley sube un impuesto.'], ['Un colegio público obliga a rezar.']], pista: 'Esa no choca con la libertad de cultos.' }, 'Obligar a rezar choca con la regla mayor.')],
  ['Tres caminos',
    xpMira('hoja', 'Segunda idea: para reformarla hay **tres caminos**.', { paras: [['El Congreso la discute en ocho debates.'], ['Los ciudadanos votan sí o no a un texto.'], ['El pueblo elige a quienes la van a reformar.']] }, [
      ['En el Congreso: acto legislativo.', { luz: [0], nota: { 0: 'acto legislativo' } }],
      ['Dos períodos seguidos: no es de un día para otro.', { luz: [0] }],
      ['Con el voto sobre un texto: referendo.', { luz: [1], nota: { 1: 'referendo' } }],
      ['Con miembros elegidos para eso: asamblea constituyente.', { luz: [2], nota: { 2: 'constituyente' } }],
      ['Los tres son más difíciles que hacer una ley.', {}],
    ], 'Acto legislativo, referendo o asamblea constituyente.'),
    xpHaz('hoja', 'Pon al margen el camino.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['referendo', 'acto legislativo', 'constituyente'], meta: [2, 0, 1], paras: [['Se eligen setenta miembros para redactarla.'], ['La gente vota un artículo nuevo.'], ['Senado y Cámara la debaten ocho veces.']], pista: 'Mira quién discute o quién vota.' }, 'Miembros elegidos, voto y Congreso.')],
  ['¿Por qué tan difícil?',
    xpMira('hoja', 'Tercera idea: la **lentitud** tiene un para qué.', { paras: [['Una mayoría de un día quiere quitarle el voto a un grupo.'], ['Con ocho debates el país alcanza a enterarse.'], ['La Corte revisa el trámite.'], ['Y mira que no la reemplacen por otra.']] }, [
      ['Las mayorías cambian; los derechos deben quedar.', { luz: [0], nota: { 0: 'riesgo' } }],
      ['El tiempo permite discutir.', { luz: [1], nota: { 1: 'freno' } }],
      ['La Corte Constitucional vigila el procedimiento.', { luz: [2], nota: { 2: 'vigila' } }],
      ['Reformar es cambiar partes; sustituir es cambiarla por otra.', { luz: [3], nota: { 3: 'límite' } }],
      ['Debe poder cambiarse, pero no por un impulso.', {}],
    ], 'La dificultad protege a quien hoy es minoría.'),
    xpHaz('hoja', 'Subraya la **mejor** razón para exigir varios debates.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Así el Congreso trabaja más.'], ['Así se discute antes de tocar derechos.'], ['Así nunca se cambia.']], pista: 'Esa no explica para qué sirve la demora.' }, 'Dar tiempo a la discusión protege derechos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un acuerdo municipal prohíbe un partido político. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Contradice la Constitución y no puede mantenerse.'], ['Reforma la Constitución en ese municipio.'], ['Vale si lo firma el alcalde.']], pista: 'Recuerda los escalones: ¿quién está arriba?' }, 'Una norma de abajo no cambia la de arriba.')],
], 'Arriba la Constitución, tres caminos para cambiarla y buenas razones para que cueste.');
;
//#archivo js/explora-icf-sc-3.js
// Preicfes · Sociales, mundo 3 «Perspectivas e Intereses» (Explora, escena «hoja»). Casos cortos propios.
xpLec('icf-sc-perspectivas-1', [
  ['Posición e interés',
    xpMira('hoja', 'Empecemos por la idea: una cosa es **lo que se pide** y otra, **para qué**.', { paras: [['«¡Que cierren la discoteca!»', 'Quieren dormir.'], ['«¡Que no la cierren!»', 'Necesitan el empleo.']] }, [
      ['Unos vecinos piden cerrarla: es su posición.', { luz: [0], nota: { 0: 'posición' } }],
      ['¿Para qué? Para dormir: es su interés.', { luz: [1] }],
      ['Los empleados piden lo contrario.', { luz: [2], nota: { 1: 'posición' } }],
      ['¿Para qué? Para conservar el trabajo.', { luz: [3] }],
      ['Las posiciones chocan; los intereses quizá no: bajar el volumen.', { luz: [1, 3] }],
    ], 'Posición: qué pide. Interés: para qué lo pide.'),
    xpHaz('hoja', 'Subraya el **interés** de fondo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['No al peaje.'], ['Poder llevar la cosecha sin perder plata.'], ['Que se vaya la empresa.']], pista: 'Esa dice qué se pide, no para qué.' }, 'Es la respuesta a «¿para qué?».')],
  ['Muchos actores',
    xpMira('hoja', 'Segunda idea: casi nunca hay **solo dos** lados.', { paras: [['Una mina quiere entrar a un pueblo.'], ['Los agricultores: temen por el agua.'], ['Los transportadores: esperan viajes.'], ['La alcaldía: quiere impuestos.'], ['Los que no han nacido: no pueden hablar.']] }, [
      ['De aquí nace el conflicto.', { luz: [0], nota: { 0: 'de aquí parte' } }],
      ['Unos temen perder algo.', { luz: [1], nota: { 1: 'agua' } }],
      ['Otros esperan ganar algo.', { luz: [2], nota: { 2: 'trabajo' } }],
      ['La autoridad también tiene su interés.', { luz: [3], nota: { 3: 'impuestos' } }],
      ['Y hay quienes no están en la mesa.', { luz: [4], nota: { 4: 'ausentes' } }],
    ], 'Pregunta quién gana, quién pierde, quién decide y quién falta.'),
    xpHaz('hoja', 'Van a mover el mercado. Pon al margen el interés de cada actor.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['comprar cerca', 'vender', 'espacio para buses'], meta: [1, 0, 2], paras: [['Los puestos'], ['Las familias del barrio'], ['La secretaría de transporte']], pista: 'Alguno no va ahí: ¿quién compra, quién vende, quién ordena el tránsito?' }, 'Cada actor quiere algo distinto del mismo lugar.')],
  ['Mismo lado, distinta razón',
    xpMira('hoja', 'Tercera idea: se puede **coincidir** por razones distintas, y **diferir** dentro de un grupo.', { paras: [['Una bióloga: no talen, hay aves.'], ['Un hotelero: no talen, vienen turistas.'], ['Un joven: talen, quiero empleo.'], ['Otra joven: no talen, allí crecí.']] }, [
      ['La bióloga se opone por las aves.', { luz: [0] }],
      ['El hotelero también, pero por negocio.', { luz: [0, 1], nota: { 1: 'coincide' } }],
      ['Un joven está a favor.', { luz: [2] }],
      ['Otra joven, en contra.', { luz: [2, 3], nota: { 3: 'mismo grupo, distinta' } }],
      ['No digas «los jóvenes quieren»: di cuáles.', {}],
    ], 'Coincidir no es pensar igual, y un grupo no es una sola voz.'),
    xpHaz('hoja', 'Subraya la frase que **generaliza** mal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Algunos comerciantes apoyan.'], ['La mayoría de los padres duda.'], ['Los campesinos se oponen a todo.']], pista: 'Esa dice «algunos» o «la mayoría».' }, '«Los campesinos» y «todo» borran las diferencias.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un colegio prohíbe el celular. La mamá: «lo necesito para saber de él». Subraya una salida que **atienda su interés**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un teléfono en la secretaría para avisar.'], ['Prohibirlo también en la casa.'], ['Que cambie de colegio.']], pista: 'Ella no pide el celular: pide poder saber de él.' }, 'Atiende el «para qué» sin el celular.')],
], 'Pregunta para qué, mira quiénes son y no los juntes a la fuerza.');

xpLec('icf-sc-perspectivas-2', [
  ['El lente',
    xpMira('hoja', 'Empecemos por la idea: cada quien mira con su **cosmovisión**.', { paras: [['Un cerro.'], ['El geólogo: hay oro.'], ['La comunidad indígena: es sagrado.'], ['El alpinista: es un reto.']] }, [
      ['Todos miran el mismo cerro.', { luz: [0], nota: { 0: 'el mismo lugar' } }],
      ['Para el geólogo es un recurso.', { luz: [1], nota: { 1: 'recurso' } }],
      ['Para la comunidad es un ser con el que se convive.', { luz: [2], nota: { 2: 'sagrado' } }],
      ['Para el alpinista, una meta.', { luz: [3], nota: { 3: 'reto' } }],
      ['La cosmovisión sale de la fe, el oficio, la edad y lo vivido.', {}],
    ], 'Cosmovisión: la manera de ver el mundo desde la que se actúa.'),
    xpHaz('hoja', 'Subraya la conducta que se explica por una **creencia religiosa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Vende barato al final del día.'], ['No trabaja los sábados, su día santo.'], ['Madruga para evitar el trancón.']], pista: 'Esa se explica por dinero o por tiempo.' }, '«Día santo» muestra la creencia.')],
  ['Prejuicio',
    xpMira('hoja', 'Segunda idea: un **prejuicio** juzga a un grupo **antes de conocer**.', { paras: [['Los de ese barrio son peligrosos.'], ['Juan, de ese barrio, robó.'], ['En ese barrio hubo dos robos este año.']] }, [
      ['Juzga a todos sin un hecho: prejuicio.', { luz: [0], nota: { 0: 'prejuicio' } }],
      ['Habla de una persona y un hecho.', { luz: [1], nota: { 1: 'un hecho' } }],
      ['Da un conteo que se puede revisar.', { luz: [2], nota: { 2: 'dato' } }],
      ['De Juan no se sigue nada sobre los demás.', { luz: [1] }],
      ['La pregunta: ¿qué dato lo sostiene y de cuántos?', { luz: [0] }],
    ], 'Todo un grupo, sin conocerlo y sin datos: prejuicio.'),
    xpHaz('hoja', 'Subraya los **dos** prejuicios.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['Las mujeres manejan mal.'], ['Ayer hubo un choque.'], ['En mayo hubo doce multas.'], ['Los viejos no entienden nada.']], pista: 'Alguna de las subrayadas es un hecho que se puede contar.' }, 'Juzgan a todo un grupo.')],
  ['La misma acción',
    xpMira('hoja', 'Tercera idea: una **misma acción** puede tener motivos distintos.', { paras: [['Siembra árboles.'], ['Porque ama el bosque.'], ['Porque le descuentan impuestos.'], ['Porque su abuelo lo hacía.']] }, [
      ['Tres personas hacen lo mismo.', { luz: [0] }],
      ['Una, por una convicción.', { luz: [1], nota: { 1: 'ambiental' } }],
      ['Otra, por un beneficio.', { luz: [2], nota: { 2: 'económico' } }],
      ['Y otra, por una tradición familiar.', { luz: [3], nota: { 3: 'cultural' } }],
      ['El examen pregunta por el motivo, no solo por la acción.', {}],
    ], 'Busca la razón que la persona da, no la que tú supondrías.'),
    xpHaz('hoja', 'Pon al margen el motivo de no comer carne.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['religioso', 'salud', 'cuidado animal'], meta: [1, 2, 0], paras: [['El médico se lo pidió.'], ['No quiere que sufran.'], ['Es época de ayuno en su fe.']], pista: 'Alguno no va ahí: busca médico, sufrir y fe.' }, 'La misma dieta, tres motivos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«No lo contrato: los jóvenes son irresponsables». Subraya la mejor **crítica**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los jóvenes son mejores que los viejos.'], ['Él debería vestirse distinto.'], ['Lo juzga por su edad, sin conocer cómo trabaja.']], pista: 'Esa cae en otro prejuicio o cambia de tema.' }, 'Señala el prejuicio sin crear otro.')],
], 'Todos llevamos lente; el prejuicio es no querer mirar.');

xpLec('icf-sc-perspectivas-3', [
  ['¿A quién deja por fuera?',
    xpMira('hoja', 'Empecemos por la idea: toda solución **atiende** unos intereses y deja otros.', { paras: [['Problema: mucho trancón.'], ['Peaje en el centro.'], ['Más buses.'], ['Horarios escalonados.']] }, [
      ['Un problema, varias salidas.', { luz: [0], nota: { 0: 'el problema' } }],
      ['El peaje reduce carros, pero pesa a quien gana poco.', { luz: [1], nota: { 1: '¿y el que gana poco?' } }],
      ['Más buses ayudan a muchos, pero cuestan.', { luz: [2], nota: { 2: '¿y el dinero?' } }],
      ['Los horarios son baratos, si las empresas aceptan.', { luz: [3], nota: { 3: '¿y las empresas?' } }],
      ['Para cada una: ¿quién gana y quién queda por fuera?', {}],
    ], 'No hay solución sin alguien que pierda algo: búscalo.'),
    xpHaz('hoja', 'Cierran una vía a los carros para dársela a las bicicletas. Subraya a quien **más** puede perjudicar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ciclistas'], ['Una ambulancia que usa esa vía'], ['Peatones']], pista: 'Ese gana espacio o seguridad.' }, 'La ambulancia perdería tiempo valioso.')],
  ['¿Se puede hacer?',
    xpMira('hoja', 'Segunda idea: una buena idea puede no ser **viable**.', { paras: [['Un hospital en cada vereda.'], ['Una lancha ambulancia.'], ['Un decreto: «prohibido enfermarse».']] }, [
      ['El hospital ayudaría, pero no alcanza el dinero.', { luz: [0], nota: { 0: 'costo' } }],
      ['La lancha cuesta menos y llega.', { luz: [1], nota: { 1: 'viable' } }],
      ['El decreto no se puede cumplir.', { luz: [2], tacha: [2], nota: { 2: 'imposible' } }],
      ['Mira costo, tiempo y quién la hace cumplir.', {}],
      ['Viable no es perfecta: es que se puede hacer.', { luz: [1] }],
    ], 'Viable: alcanza el dinero, el tiempo y hay quién la cumpla.'),
    xpHaz('hoja', 'Falta agua **hoy** en una escuela. Subraya la salida que sirve **ya**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un carrotanque.'], ['Un acueducto en tres años.'], ['Una campaña para ahorrar el próximo invierno.']], pista: 'Esa sirve, pero más adelante.' }, 'Hoy hace falta agua; lo demás es de largo plazo.')],
  ['¿La van a cumplir?',
    xpMira('hoja', 'Tercera idea: se cumple más lo que **se construyó entre todos**.', { paras: [['Una regla impuesta: nadie la cumple.'], ['Una regla acordada: cada quien propuso.'], ['Un registro que todos pueden ver.']] }, [
      ['Si llega desde arriba, se busca cómo evadirla.', { luz: [0], nota: { 0: 'impuesta' } }],
      ['Si ayudaste a hacerla, la cuidas.', { luz: [1], nota: { 1: 'acordada' } }],
      ['Y se cumple si se puede comprobar.', { luz: [2], nota: { 2: 'a la vista' } }],
      ['Justa, hecha entre todos y comprobable.', { luz: [1, 2] }],
      ['El examen pregunta quién la aceptaría y por qué.', {}],
    ], 'Acordada, justa y que se pueda comprobar.'),
    xpHaz('hoja', 'Hay basura en el parque. Subraya la salida con **más** probabilidad de cumplirse.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un aviso que dice «prohibido».'], ['Turnos que los vecinos acordaron y publican.'], ['Multas que nadie cobra.']], pista: 'Esa no la acordó nadie o no hay quién la haga cumplir.' }, 'Acordada y a la vista.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Pescadores y bañistas usan la misma playa. Subraya la salida que atiende **a los dos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Prohibir la pesca.'], ['Cerrar la playa.'], ['Pesca al amanecer y baño de día.']], pista: 'Esa deja por fuera a uno o a ambos.' }, 'Usan el mismo lugar a horas distintas.')],
], 'A quién atiende, si se puede y si la van a cumplir.');
;
//#archivo js/explora-icf-sc-4.js
// Preicfes · Sociales y Ciudadanas, mundo 4 «Fuentes y Argumentos» (Explora, escena «hoja»). Casos propios.
xpLec('icf-sc-fuentes-1', [
  ['Primaria o secundaria',
    xpMira('hoja', 'Empecemos por la idea: una fuente **primaria** es de la época; una **secundaria** la estudia después.', { letras: ['A', 'B', 'C', 'D'], paras: [['Un diario de 1948.'], ['Un libro de hoy sobre 1948.'], ['Una foto tomada ese día.'], ['Una película de este año.']] }, [
      ['El diario lo escribió alguien que estaba allí.', { luz: [0], nota: { 0: 'primaria' } }],
      ['El libro estudia esa época con otras fuentes.', { luz: [1], nota: { 1: 'secundaria' } }],
      ['La foto también es de ese momento.', { luz: [2], nota: { 2: 'primaria' } }],
      ['La película cuenta, pero se hizo mucho después.', { luz: [3], nota: { 3: 'secundaria' } }],
      ['Ser primaria la hace cercana, no verdadera.', { luz: [0, 2] }],
    ], 'Primaria: de la época. Secundaria: la estudia. Ninguna es verdad automática.'),
    xpHaz('hoja', 'Se estudia una epidemia de 1918. Subraya la fuente **primaria**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un documental de 2020'], ['El registro de un cementerio de 1918'], ['Un artículo de una historiadora actual']], pista: '¿Cuál se hizo mientras ocurría?' }, 'El registro se llenó en 1918.')],
  ['Quién, para quién, para qué',
    xpMira('hoja', 'Segunda idea: pregunta **quién** la hizo, **para quién** y **para qué**.', { paras: [['Aviso de 1930: «Compre tierra: aquí no llueve de más».'], ['Carta de 1930: «Otra vez se inundó la cosecha, hermana».'], ['Acta de 1930: «Se aprueban 300 pesos para un dique».']] }, [
      ['El aviso quiere vender tierra.', { luz: [0], nota: { 0: 'vender' } }],
      ['La carta le cuenta algo a una hermana.', { luz: [1], nota: { 1: 'contar' } }],
      ['El acta deja constancia de un gasto.', { luz: [2], nota: { 2: 'constar' } }],
      ['La carta y el acta desmienten el aviso.', { luz: [1, 2], tacha: [0] }],
      ['Dos fuentes con fines distintos que coinciden pesan más.', { luz: [1, 2] }],
    ], 'El propósito explica lo que una fuente muestra y lo que calla.'),
    xpHaz('hoja', 'Una empresa publica: «Nuestro humo es vapor». Subraya la **mejor razón** para revisarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A la empresa le conviene que se crea.'], ['El aviso tiene letra pequeña.'], ['Las empresas siempre mienten.']], pista: 'Piensa en el propósito, sin exagerar.' }, 'Tiene interés en que se crea: hay que comparar. «Siempre» dice de más.')],
  ['El contexto y el silencio',
    xpMira('hoja', 'Tercera idea: ponla en **su contexto** y mira **quién falta**.', { paras: [['1957: las colombianas votan por primera vez.'], ['Periódico de 1954: «La política no es para damas».'], ['Falta: la voz de ellas.']] }, [
      ['El dato de la época: aún no votaban.', { luz: [0], nota: { 0: 'contexto' } }],
      ['La frase se entiende en su época.', { luz: [1] }],
      ['Entenderla no es estar de acuerdo.', { luz: [1], nota: { 1: 'idea de su tiempo' } }],
      ['Y falta una voz: la de las mujeres.', { luz: [2], nota: { 2: 'silencio' } }],
      ['Busca una fuente que la traiga.', {}],
    ], 'Contexto para entender; silencio para saber qué más buscar.'),
    xpHaz('hoja', 'De una huelga solo se guardan el informe del patrón y el del alcalde. Subraya la voz que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La del patrón'], ['La del gobierno local'], ['La de los huelguistas']], pista: '¿Quién hizo la huelga?' }, 'Nadie guardó lo que dijeron los trabajadores.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un mapa de 1890 deja en blanco una selva donde vivían varios pueblos. Subraya lo que muestra ese blanco.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que allí no vivía nadie.'], ['Lo que sus autores no conocían o no tenían en cuenta.'], ['Que el mapa es falso en todo.']], pista: 'El blanco habla de quien dibuja.' }, 'El silencio del mapa dice algo de quienes lo hicieron.')],
], 'De cuándo es, para qué se hizo, qué pasaba entonces y quién falta.');

xpLec('icf-sc-fuentes-2', [
  ['Qué mide cada una',
    xpMira('hoja', 'Empecemos por la idea: cada fuente **mide una cosa**.', { letras: ['A', 'B', 'C'], paras: [['Quejas en la alcaldía: 40.'], ['Encuesta: 6 de cada 10 oyen ruido.'], ['Medidor: 72 decibeles de noche.']] }, [
      ['Las quejas cuentan a quienes se quejaron.', { luz: [0], nota: { 0: 'quejas' } }],
      ['La encuesta cuenta lo que la gente dice.', { luz: [1], nota: { 1: 'percepción' } }],
      ['El medidor cuenta el sonido en un lugar.', { luz: [2], nota: { 2: 'sonido' } }],
      ['Pocas quejas no prueban que haya silencio.', { luz: [0] }],
      ['Quizá quejarse sea difícil o inútil.', {}],
    ], 'Pregunta qué se contó exactamente: solo eso queda probado.'),
    xpHaz('hoja', '«Bajaron las quejas por basura». Subraya lo que queda **probado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La ciudad está más limpia.'], ['La gente está contenta.'], ['Se presentaron menos quejas.']], pista: '¿Qué se contó exactamente?' }, 'Se contaron quejas, no basura ni alegría.')],
  ['Los límites',
    xpMira('hoja', 'Segunda idea: toda fuente **deja algo por fuera**.', { paras: [['Encuesta por internet sobre el uso de internet.'], ['100 % dice que se conecta.'], ['Nadie sin conexión pudo responder.'], ['«Toda la ciudad tiene internet».']] }, [
      ['Mira cómo se hizo la encuesta.', { luz: [0], nota: { 0: 'por internet' } }],
      ['El resultado parece perfecto: cien por ciento.', { luz: [1] }],
      ['Pero quienes no tienen red no respondieron.', { luz: [2], nota: { 2: 'por fuera' } }],
      ['El dato es exacto; la conclusión, falsa.', { luz: [1], tacha: [3] }],
      ['Busca siempre a quién no se le preguntó.', {}],
    ], 'Busca a quién deja por fuera la fuente.'),
    xpHaz('hoja', 'Para saber cuánto lee la ciudad preguntaron a la salida de una librería. Subraya el **límite**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Allí hay más lectores que en el resto.'], ['La librería era pequeña.'], ['Preguntaron en la calle.']], pista: '¿Quiénes salen de una librería?' }, 'La muestra favorece a quienes ya leen.')],
  ['Comparar y medir las palabras',
    xpMira('hoja', 'Tercera idea: compara fuentes y **no digas de más**.', { paras: [['Fuente 1: bajaron las multas.'], ['Fuente 2: subieron los choques.'], ['«La gente maneja mejor».'], ['«Bajaron las multas y subieron los choques».']] }, [
      ['Una fuente apunta a un lado.', { luz: [0] }],
      ['La otra apunta al lado contrario.', { luz: [1] }],
      ['Esta conclusión solo mira la primera.', { luz: [2], tacha: [2], nota: { 2: 'dice de más' } }],
      ['Esta dice lo que se sabe.', { luz: [3], nota: { 3: 'justa' } }],
      ['Quizá bajaron las multas porque hay menos control.', {}],
    ], 'Compara, di lo que se sabe y busca otra explicación.'),
    xpHaz('hoja', 'Un hospital reporta más casos de una enfermedad tras comprar un equipo para detectarla. Subraya la lectura **prudente**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La enfermedad se disparó.'], ['Se detectan más casos, quizá por el equipo.'], ['El equipo causa la enfermedad.']], pista: '¿Qué más cambió además de los casos?' }, 'Detectar más no es lo mismo que haya más.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un colegio dice: «Nuestro plan sirvió: las notas subieron». Ese año también cambiaron los exámenes. Subraya lo que haría falta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Más fotos del plan.'], ['Notas de otro colegio con esos exámenes y sin el plan.'], ['Saber quién lo propuso.']], pista: 'Hay que separar el plan del cambio de exámenes.' }, 'Comparar con quien no tuvo plan separa las dos causas.')],
], 'Qué mide, a quién deja fuera y qué otra explicación cabe.');

xpLec('icf-sc-fuentes-3', [
  ['Leer una caricatura',
    xpMira('hoja', 'Empecemos por la idea: una caricatura **opina** exagerando y con símbolos.', { paras: [['Un puente gigante cortado por la mitad.'], ['Un alcalde corta la cinta, sonriente.'], ['La gente cruza en canoa.']] }, [
      ['Lo enorme llama la atención: la obra incompleta.', { luz: [0], nota: { 0: 'exageración' } }],
      ['La cinta es símbolo de inaugurar.', { luz: [1], nota: { 1: 'símbolo' } }],
      ['La canoa muestra que nada cambió.', { luz: [2], nota: { 2: 'contraste' } }],
      ['Opina que se inauguran obras sin terminar.', { luz: [1, 2] }],
      ['Para entenderla hay que saber de qué puente habla.', {}],
    ], 'Qué agranda, qué simboliza y qué contrasta: ahí está la opinión.'),
    xpHaz('hoja', 'Dibujo: un árbol pequeño con cien regaderas oficiales encima y la tierra seca. Subraya la opinión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Los árboles necesitan sombra.'], ['Hay que comprar regaderas.'], ['Hay muchos anuncios y poca acción.']], pista: 'Hay regaderas, pero ¿cae agua?' }, 'Cien regaderas y tierra seca: mucho anuncio, nada de agua.')],
  ['La ironía',
    xpMira('hoja', 'Segunda idea: la **ironía** dice una cosa para que se entienda otra.', { paras: [['Dibujo: una fila que da la vuelta a la manzana.'], ['Letrero: «Trámite exprés».'], ['Lo que se entiende: es lentísimo.']] }, [
      ['Esto es lo que se ve en el dibujo.', { luz: [0], nota: { 0: 'se ve' } }],
      ['Esto es lo que dice el letrero.', { luz: [1], nota: { 1: 'se dice' } }],
      ['No coinciden: ahí está la ironía.', { luz: [0, 1] }],
      ['El lector entiende lo contrario.', { luz: [2], nota: { 2: 'se entiende' } }],
      ['Busca el choque entre la frase y la escena.', {}],
    ], 'Ironía: la frase choca con la escena.'),
    xpHaz('hoja', 'Subraya la frase que sería **irónica** sobre un bus repleto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«El bus va lleno».'], ['«Viaje con toda comodidad».'], ['«Faltan buses».']], pista: 'Debe chocar con lo que se ve.' }, '«Comodidad» choca con un bus repleto.')],
  ['Leer un discurso',
    xpMira('hoja', 'Tercera idea: en un discurso, separa **razones** de **recursos**.', { paras: [['«Bajaremos la tarifa 5 %, con ahorro en energía».'], ['«Ellos odian esta ciudad».'], ['«O me apoyan, o se acaba todo».']] }, [
      ['Aquí hay un dato y cómo se paga: razón.', { luz: [0], nota: { 0: 'razón' } }],
      ['Aquí ataca a personas, no a ideas.', { luz: [1], nota: { 1: 'ataque' } }],
      ['Aquí finge que solo hay dos salidas.', { luz: [2], nota: { 2: 'falsa elección' } }],
      ['Quita los recursos: ¿qué queda?', { tacha: [1, 2] }],
      ['Lo que queda es lo que se puede revisar.', { luz: [0], tacha: [1, 2] }],
    ], 'Quita ataques y falsas elecciones: lo que queda se revisa.'),
    xpHaz('hoja', 'Pon al margen qué es cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['falsa elección', 'razón', 'ataque'], meta: [2, 0, 1], paras: [['«Ese señor no sabe ni hablar».'], ['«O construimos la vía, o el pueblo muere».'], ['«La vía reduce el viaje de tres horas a una».']], pista: 'Alguna no va ahí: ¿habla de la persona, deja solo dos salidas o da un dato?' }, 'Ataca, obliga a elegir y, al final, da una razón.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un cartel muestra un candado sobre una boca y dice: «Participa». Subraya lo que critica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que se invite a opinar sin dejar hablar.'], ['Que la gente hable demasiado.'], ['Que los candados sean caros.']], pista: 'Compara la imagen con la palabra.' }, 'La imagen calla y la palabra invita: ironía.')],
], 'Qué exagera, con qué choca y qué queda cuando quitas los recursos.');
;
//#archivo js/explora-icf-sc-5.js
// Preicfes · Sociales y Ciudadanas, mundo 5 «Problemas Complejos» (Explora, escena «hoja»). Casos propios.
xpLec('icf-sc-sistemico-1', [
  ['Detonante y fondo',
    xpMira('hoja', 'Empecemos por la idea: algo **dispara** el hecho y algo lo **venía preparando**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Un bombillo se fundió y hubo protesta.'], ['Llevaban un año sin alumbrado en la cuadra.'], ['Hubo tres robos ese mes.'], ['Nadie respondía las cartas.']] }, [
      ['El bombillo fue lo último: el detonante.', { luz: [0], nota: { 0: 'detonante' } }],
      ['Un año a oscuras lo venía preparando.', { luz: [1], nota: { 1: 'de fondo' } }],
      ['Los robos también pesaban.', { luz: [2], nota: { 2: 'de fondo' } }],
      ['Y que nadie respondiera.', { luz: [3], nota: { 3: 'de fondo' } }],
      ['Cambiar solo el bombillo no resuelve el fondo.', { luz: [0] }],
    ], 'El detonante dispara; las causas de fondo explican.'),
    xpHaz('hoja', 'Una fábrica estalló por una chispa. Subraya la causa **de fondo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La chispa'], ['Años sin revisar los tanques'], ['El ruido del estallido']], pista: 'Busca lo que venía de tiempo atrás.' }, 'La chispa dispara; la falta de revisión lo preparó.')],
  ['En cadena y en círculo',
    xpMira('hoja', 'Segunda idea: una consecuencia puede ser **causa** de otra, y volver al principio.', { paras: [['Baja la venta de una panadería.'], ['Despide a dos personas.'], ['Ellas compran menos en el barrio.'], ['Bajan más las ventas.']] }, [
      ['Primero baja la venta.', { luz: [0], nota: { 0: 'causa' } }],
      ['Por eso despide a dos personas.', { luz: [1], nota: { 1: 'consecuencia' } }],
      ['Y ese despido causa otra cosa.', { luz: [1, 2], nota: { 2: 'y otra más' } }],
      ['Que vuelve a bajar las ventas: un círculo.', { luz: [3, 0], nota: { 3: 'vuelve al inicio' } }],
      ['Para romperlo basta con cambiar un punto.', {}],
    ], 'Sigue las flechas: algunas vuelven al comienzo.'),
    xpHaz('hoja', 'Pon al margen el orden de la cadena.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['primero', 'segundo', 'tercero'], meta: [2, 0, 1], paras: [['Los niños faltan a clase.'], ['Se daña el puente.'], ['El bus deja de pasar.']], pista: 'Alguna no va ahí: ¿qué tuvo que pasar antes?' }, 'Se daña el puente, el bus no pasa y los niños faltan.')],
  ['Juntas no es por',
    xpMira('hoja', 'Tercera idea: que dos cosas pasen **juntas** no prueba que una **cause** la otra.', { paras: [['En enero llegó una familia nueva.'], ['En enero subió el precio del agua.'], ['«El agua subió por ellos».'], ['Ese mes subió en todo el país.']] }, [
      ['Dos hechos en el mismo mes.', { luz: [0, 1], nota: { 0: 'a la vez' } }],
      ['Alguien los une sin prueba.', { luz: [2], nota: { 2: 'sin prueba' } }],
      ['Otro dato muestra otra explicación.', { luz: [3], nota: { 3: 'otra causa' } }],
      ['Entonces se descarta la acusación.', { tacha: [2], luz: [3] }],
      ['Busca siempre qué más cambió.', {}],
    ], 'Antes de culpar, busca qué más cambió y compara casos.'),
    xpHaz('hoja', '«Desde que pintaron la escuela hay más gripa». Subraya la mejor pregunta para revisarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Subió también en escuelas sin pintar?'], ['¿De qué color la pintaron?'], ['¿Quién la pintó?']], pista: 'Compara con un lugar donde no se hizo.' }, 'Si subió en todas, la pintura no es la causa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Con la sequía bajó el río y hubo pelea por el agua entre dos veredas que llevaban años sin acuerdo de turnos. Subraya la causa **de fondo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La pelea'], ['La sequía de este año'], ['No tener acuerdo de turnos']], pista: 'La sequía disparó; ¿qué faltaba desde antes?' }, 'Sin acuerdo, cualquier sequía dispara la pelea.')],
], 'Separa lo que dispara, sigue la cadena y no confundas junto con por.');

xpLec('icf-sc-sistemico-2', [
  ['Las dimensiones',
    xpMira('hoja', 'Empecemos por la idea: un problema tiene varias **dimensiones** a la vez.', { letras: ['A', 'B', 'C', 'D'], paras: [['Da empleo a cien personas.'], ['Seca un humedal.'], ['Tapa un camino sagrado.'], ['Falta un permiso.']] }, [
      ['Empleo y dinero: económica.', { luz: [0], nota: { 0: 'económica' } }],
      ['Agua y animales: ambiental.', { luz: [1], nota: { 1: 'ambiental' } }],
      ['Creencias y costumbres: cultural.', { luz: [2], nota: { 2: 'cultural' } }],
      ['Permisos y normas: legal.', { luz: [3], nota: { 3: 'legal' } }],
      ['El mismo proyecto toca las cuatro.', { luz: [0, 1, 2, 3] }],
    ], 'Económica, ambiental, cultural, legal, política, social.'),
    xpHaz('hoja', 'Pon al margen la dimensión.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['cultural', 'económica', 'ambiental'], meta: [2, 0, 1], paras: [['El ruido espanta las aves.'], ['Se pierde la fiesta del patrono.'], ['Sube el precio del arriendo.']], pista: 'Alguna no va ahí: ¿naturaleza, costumbres o dinero?' }, 'Aves, fiesta y arriendo: ambiental, cultural y económica.')],
  ['Chocan',
    xpMira('hoja', 'Segunda idea: mejorar una dimensión puede **empeorar** otra.', { paras: [['Prohibir vender en la acera:'], ['se camina mejor,'], ['pero veinte familias pierden su ingreso.']] }, [
      ['La medida parece sencilla.', { luz: [0] }],
      ['Mejora el uso de la calle.', { luz: [1], nota: { 1: 'mejora lo urbano' } }],
      ['Y empeora lo económico.', { luz: [2], nota: { 2: 'empeora lo económico' } }],
      ['No hay un bueno y un malo: hay un choque.', { luz: [1, 2] }],
      ['Nombrarlo bien ayuda a buscar una salida.', {}],
    ], 'Di qué mejora y qué empeora: ese es el choque.'),
    xpHaz('hoja', 'Se cierra un parque de noche: hay menos robos, pero los jóvenes pierden su lugar. Subraya el choque.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Economía contra ambiente'], ['Seguridad contra vida social'], ['Cultura contra ley']], pista: 'Nombra lo que gana y lo que se pierde.' }, 'Gana la seguridad y pierde el encuentro de los jóvenes.')],
  ['Ceder en cada una',
    xpMira('hoja', 'Tercera idea: una buena salida **cede un poco** en cada dimensión.', { paras: [['Opción 1: se prohíbe todo.'], ['Opción 2: no se toca nada.'], ['Opción 3: puestos por turnos y una franja libre.']] }, [
      ['La primera solo cuida la calle.', { luz: [0], nota: { 0: 'solo una' } }],
      ['La segunda solo cuida el ingreso.', { luz: [1], nota: { 1: 'solo una' } }],
      ['La tercera cuida algo de las dos.', { luz: [2], nota: { 2: 'cede en ambas' } }],
      ['Nadie gana todo, pero se puede sostener.', { luz: [2] }],
      ['Pregunta quién aceptaría cada opción.', {}],
    ], 'La salida que atiende varias dimensiones dura más.'),
    xpHaz('hoja', 'Una fábrica contamina, pero da empleo. Subraya la salida que atiende **las dos** cosas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Cerrarla mañana'], ['Dejarla igual'], ['Darle un plazo para poner filtros']], pista: 'Busca la que cuida el aire y el trabajo.' }, 'El plazo protege el empleo y limpia el aire.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una vía rápida acorta el viaje, pero parte en dos una reserva y un pueblo. Subraya la propuesta que atiende **más** dimensiones.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Túneles para animales y un puente peatonal'], ['Doble ancho para ir más rápido'], ['Una estatua a la entrada']], pista: 'Cuenta a cuántos afectados ayuda cada una.' }, 'Los túneles cuidan la reserva y el puente, al pueblo.')],
], 'Nombra las dimensiones, di cuáles chocan y busca ceder en cada una.');

xpLec('icf-sc-sistemico-3', [
  ['Lo que no se busca',
    xpMira('hoja', 'Empecemos por la idea: la gente **se acomoda**, y aparecen efectos que nadie quería.', { paras: [['Se paga por cada rata muerta.'], ['Bajan las ratas.'], ['Alguien empieza a criarlas para cobrar.']] }, [
      ['La medida busca menos ratas.', { luz: [0], nota: { 0: 'medida' } }],
      ['Al comienzo funciona: efecto buscado.', { luz: [1], nota: { 1: 'buscado' } }],
      ['Pero alguien se acomoda a la regla.', { luz: [2], nota: { 2: 'no buscado' } }],
      ['Y el resultado es lo contrario.', { luz: [2] }],
      ['Pregunta qué hará la gente al día siguiente.', {}],
    ], 'Efecto no buscado: lo que produce la gente al acomodarse.'),
    xpHaz('hoja', 'Se regalan bolsas de tela y la gente las bota como si fueran de plástico. Subraya el efecto **no buscado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Menos bolsas plásticas'], ['Más basura de tela'], ['La gente recibe bolsas']], pista: '¿Para eso se regalaron?' }, 'Nadie quería más basura.')],
  ['Para quién',
    xpMira('hoja', 'Segunda idea: la misma regla **pesa distinto** según quién la cargue.', { paras: [['Regla: pagar 50 mil por una cita.'], ['Para Ana es lo de un café.'], ['Para Luis es lo de tres días.'], ['Promedio: «todos pueden pagar».']] }, [
      ['La regla es igual para los dos.', { luz: [0] }],
      ['A Ana casi no le pesa.', { luz: [1], nota: { 1: 'pesa poco' } }],
      ['A Luis le quita tres días de comida.', { luz: [2], nota: { 2: 'pesa mucho' } }],
      ['El promedio esconde esa diferencia.', { luz: [3], tacha: [3] }],
      ['Mira siempre los efectos por grupos.', { luz: [1, 2] }],
    ], 'Pregunta a quién le pesa más y qué esconde el promedio.'),
    xpHaz('hoja', 'Un trámite solo se puede hacer por internet. Subraya a quién le pesa **más**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['A quien tiene datos en el celular'], ['A quien trabaja con computador'], ['A quien vive en una vereda sin señal']], pista: '¿Quién no puede cumplirla?' }, 'La regla es igual, pero sin señal no se puede cumplir.')],
  ['Medir y corregir',
    xpMira('hoja', 'Tercera idea: una buena medida dice **qué va a medir** y se deja corregir.', { paras: [['Meta: menos accidentes.'], ['Se mide: número de multas.'], ['Se mide: heridos por mes.'], ['Si en un año no baja, se cambia.']] }, [
      ['La meta es tener menos accidentes.', { luz: [0], nota: { 0: 'meta' } }],
      ['Contar multas no mide accidentes.', { luz: [1], tacha: [1] }],
      ['Contar heridos sí se acerca.', { luz: [2], nota: { 2: 'mide la meta' } }],
      ['Y hay una regla para corregir.', { luz: [3], nota: { 3: 'se corrige' } }],
      ['Mide lo que importa, no lo más fácil.', {}],
    ], 'Mide la meta y decide antes cuándo corregir.'),
    xpHaz('hoja', 'Meta: que los niños lean mejor. Subraya lo que **mide** la meta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cuánto comprenden de un texto nuevo'], ['Cuántos libros se compraron'], ['Cuántas fotos se tomaron']], pista: 'Busca lo que habla de leer, no de comprar.' }, 'Comprar no es leer: se mide la comprensión.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Para bajar el ruido se multó a los bares. Ahora la fiesta se hace en las casas. Subraya lo que **faltó** pensar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['De qué color era la multa'], ['Qué haría la gente después de la multa'], ['Cuántos bares había antes']], pista: 'Piensa en cómo se acomoda la gente.' }, 'El ruido no desapareció: se mudó.')],
], 'Qué hará la gente, a quién le pesa y cómo sabremos si sirvió.');
;
//#archivo js/explora-icf-sc-6.js
// Preicfes · Sociales y Ciudadanas, mundo 6 «Historia de Colombia» (Explora, escena «hoja»).
xpLec('icf-sc-historia-1', [
  ['El orden colonial',
    xpMira('hoja', 'Empecemos por la idea: en la Colonia, el **origen** decidía casi todo.', { letras: ['1', '2', '3', '4'], paras: [['Peninsulares: los altos cargos'], ['Criollos: tierras y estudios, poco poder'], ['Indígenas: tributo y trabajo; mestizos: oficios y pocos derechos'], ['Africanos esclavizados: sin libertad']] }, [
      ['Arriba, los nacidos en España.', { luz: [0], nota: { 0: 'mandan' } }],
      ['Sus descendientes americanos tenían dinero, no mando.', { luz: [1] }],
      ['Abajo se trabajaba, y los indígenas pagaban tributo.', { luz: [2] }],
      ['Y en la base, personas tratadas como propiedad.', { luz: [3], nota: { 3: 'sin libertad' } }],
      ['El comercio también lo controlaba España.', {}],
    ], 'Cargos, comercio y vida según el origen.'),
    xpHaz('hoja', 'Subraya a quiénes molestaba tener dinero y **no** los cargos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los peninsulares'], ['Los criollos'], ['Los esclavizados']], pista: 'Tenían estudios y tierras.' }, 'Los criollos tenían riqueza y poco poder.')],
  ['Resistir',
    xpMira('hoja', 'Segunda idea: ese orden **nunca fue tranquilo**.', { paras: [['Huir y fundar un palenque'], ['Pleitear por el resguardo'], ['Marchar contra un impuesto'], ['Guardar una lengua']] }, [
      ['Los esclavizados que huían hicieron palenques.', { luz: [0] }],
      ['Los indígenas usaron la ley para defender tierra.', { luz: [1] }],
      ['En 1781 marcharon los comuneros.', { luz: [2], nota: { 2: 'comuneros' } }],
      ['Conservar la cultura también es resistir.', { luz: [3] }],
      ['No toda resistencia lleva armas.', { luz: [1, 3] }],
    ], 'Palenques, pleitos, marchas y memoria.'),
    xpHaz('hoja', 'Pon al margen cómo resistían.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['con la ley', 'con la cultura', 'con la protesta'], meta: [2, 0, 1], paras: [['Romper un edicto en la plaza'], ['Presentar un pleito'], ['Cantar en la lengua de los abuelos']], pista: 'Alguna no va ahí: ¿usa la plaza, un tribunal o la memoria?' }, 'Protesta, ley y cultura.')],
  ['Cambios y permanencias',
    xpMira('hoja', 'Tercera idea: una época nueva trae **cambios** y **permanencias**.', { paras: [['Ya no manda el rey.'], ['Hay ciudadanos, no súbditos.'], ['Sigue la esclavitud hasta 1851.'], ['Votan solo algunos hombres.']] }, [
      ['Esto cambió: la autoridad.', { luz: [0], nota: { 0: 'cambio' } }],
      ['Esto también: la palabra ciudadano.', { luz: [1], nota: { 1: 'cambio' } }],
      ['Esto duró más de treinta años todavía.', { luz: [2], nota: { 2: 'permanencia' } }],
      ['Y esto limitaba la ciudadanía.', { luz: [3], nota: { 3: 'permanencia' } }],
      ['Pregunta siempre: ¿cambió para quién?', { luz: [1, 3] }],
    ], 'Una fecha no cambia todo: mira qué siguió.'),
    xpHaz('hoja', 'Subraya la **permanencia** después de la independencia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Se forma una república.'], ['Se escribe una constitución.'], ['Las haciendas siguen con esclavizados.']], pista: 'Busca lo que no cambió.' }, 'La esclavitud siguió hasta 1851.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'En 1808 Napoleón apresó al rey de España. Subraya por qué eso importó tanto en América.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Dejó en duda quién tenía derecho a gobernar.'], ['Acabó con la esclavitud.'], ['Subió el precio del tabaco.']], pista: 'Si no hay rey, ¿en nombre de quién se manda?' }, 'Sin rey, varias ciudades formaron juntas.')],
], 'Mira el orden, la resistencia y lo que cambió y siguió.');

xpLec('icf-sc-historia-2', [
  ['Tres preguntas',
    xpMira('hoja', 'Empecemos por la idea: el siglo XIX discutió **tres preguntas**.', { letras: ['1', '2', '3'], paras: [['¿Manda el centro o las regiones?'], ['¿Qué lugar tiene la Iglesia?'], ['¿Quién puede votar?']] }, [
      ['La primera: centralismo o federalismo.', { luz: [0], nota: { 0: 'poder' } }],
      ['La segunda: la Iglesia en la educación y el Estado.', { luz: [1], nota: { 1: 'religión' } }],
      ['La tercera: quién es ciudadano.', { luz: [2], nota: { 2: 'ciudadanía' } }],
      ['Cada constitución respondía distinto.', { luz: [0, 1, 2] }],
      ['Por eso se escribieron tantas.', {}],
    ], 'Centro o regiones, Iglesia y voto.'),
    xpHaz('hoja', '«Cada estado tendrá su ejército». Subraya la pregunta que responde.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Centro o regiones'], ['Iglesia y Estado'], ['Quién vota']], pista: '¿Quién gana poder con esa regla?' }, 'Da poder a las regiones: federalismo.')],
  ['Dos partidos',
    xpMira('hoja', 'Segunda idea: a mitad de siglo nacen **dos partidos**, con ideas distintas en general.', { paras: [['Conservadores: centro fuerte'], ['Conservadores: Iglesia, base del orden'], ['Liberales: regiones y libertades'], ['Liberales: Iglesia separada del Estado']] }, [
      ['Unos querían un centro fuerte.', { luz: [0] }],
      ['Y a la Iglesia en el centro de la vida.', { luz: [1] }],
      ['Otros, más libertades y regiones.', { luz: [2] }],
      ['Y separar Iglesia y Estado.', { luz: [3] }],
      ['Muchos heredaban el partido de su familia.', {}],
    ], 'En general: centro e Iglesia; regiones y libertades.'),
    xpHaz('hoja', 'Pon al margen el partido que, en general, lo defendía.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['liberal', 'conservador'], meta: [1, 0], paras: [['La Iglesia dirige la educación'], ['Libertad de cultos']], pista: 'Alguna no va ahí: piensa en el lugar de la Iglesia.' }, 'Educación con la Iglesia, conservador; libertad de cultos, liberal.')],
  ['El péndulo',
    xpMira('hoja', 'Tercera idea: el país fue **de un extremo a otro**.', { paras: [['1863, Rionegro: federal'], ['Nueve estados con ejército'], ['1886, Regeneración: central'], ['Presidente fuerte e Iglesia en la educación'], ['Mientras tanto: el café crece']] }, [
      ['En 1863, las regiones mandan.', { luz: [0, 1], nota: { 0: 'liberal' } }],
      ['En 1886, vuelve el centro.', { luz: [2, 3], nota: { 2: 'conservadora' } }],
      ['Cada giro dejó por fuera a alguien.', { luz: [0, 2] }],
      ['El siglo acabó en guerra y sin Panamá.', {}],
      ['Y el café cambió la economía.', { luz: [4], nota: { 4: 'economía' } }],
    ], 'Rionegro federal, 1886 central, y el café al fondo.'),
    xpHaz('hoja', 'Subraya lo que es de la **Regeneración**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Estados soberanos con ejército'], ['Un presidente fuerte y un país unitario'], ['Separación total de Iglesia y Estado']], pista: 'Es la de 1886.' }, 'La Regeneración centralizó el poder.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una región cobraba sus propios impuestos y elegía sus leyes; veinte años después, todo se decide en Bogotá. Subraya el cambio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['De conservador a liberal'], ['De católico a laico'], ['De federalismo a centralismo']], pista: 'Mira dónde se decide antes y después.' }, 'El poder pasó de la región al centro.')],
], 'Tres preguntas, dos partidos y un péndulo.');

xpLec('icf-sc-historia-3', [
  ['De la huelga al 9 de abril',
    xpMira('hoja', 'Empecemos por la idea: el siglo XX abrió con **obreros, reformas y rechazo**.', { paras: [['1928: huelga de las bananeras'], ['Años treinta: reformas liberales'], ['Parte del país las teme'], ['1948: asesinan a Gaitán']] }, [
      ['Los obreros se organizan y los reprimen.', { luz: [0] }],
      ['Llegan el derecho a la huelga y más escuelas.', { luz: [1], nota: { 1: 'reformas' } }],
      ['No todos están de acuerdo.', { luz: [2] }],
      ['La muerte de Gaitán multiplica la violencia.', { luz: [3], nota: { 3: 'multiplica' } }],
      ['Ya venía: no empezó ese día.', { luz: [2, 3] }],
    ], 'La violencia venía de antes; el 9 de abril la multiplicó.'),
    xpHaz('hoja', 'Subraya lo que es **correcto** sobre el 9 de abril.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Creó de la nada la violencia.'], ['Agravó una violencia que ya existía.'], ['Terminó con la violencia.']], pista: 'Recuerda que ya había conflicto entre partidos.' }, 'Fue un agravante, no el origen.')],
  ['Un pacto con puerta cerrada',
    xpMira('hoja', 'Segunda idea: el **Frente Nacional** redujo una guerra y dejó otra por fuera.', { paras: [['Liberales y conservadores se turnan el poder.'], ['Baja la guerra entre ellos.'], ['Otros grupos casi no pueden participar.'], ['Nacen guerrillas, en plena Guerra Fría.']] }, [
      ['El pacto: turnarse dieciséis años.', { luz: [0], nota: { 0: 'pacto' } }],
      ['Lo buscado: menos guerra entre partidos.', { luz: [1], nota: { 1: 'buscado' } }],
      ['Lo no buscado: otros quedan por fuera.', { luz: [2], nota: { 2: 'no buscado' } }],
      ['Es una de las causas de lo que siguió.', { luz: [2, 3] }],
      ['El mundo también influyó.', { luz: [3] }],
    ], 'Menos guerra entre dos; menos espacio para los demás.'),
    xpHaz('hoja', 'Un líder campesino, sin partido, quería ser alcalde en 1960. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Lo nombran por sus ideas.'], ['Gana porque hay muchos partidos.'], ['No puede: los cargos son de los dos partidos.']], pista: 'Recuerda entre quiénes se repartía el poder.' }, 'El pacto repartía los cargos entre dos.')],
  ['Víctimas y paz',
    xpMira('hoja', 'Tercera idea: las víctimas fueron sobre todo **civiles**, y la paz se ha **intentado** varias veces.', { paras: [['Guerrillas, paramilitares, narcotráfico y agentes del Estado'], ['La mayoría de las víctimas: civiles'], ['1990: el M-19 deja las armas'], ['1991: nueva Constitución'], ['2016: acuerdo con las FARC']] }, [
      ['Varios actores cometieron crímenes.', { luz: [0] }],
      ['La población civil puso la mayoría.', { luz: [1], nota: { 1: 'víctimas' } }],
      ['Un grupo dejó las armas y entró a la política.', { luz: [2], nota: { 2: 'paz' } }],
      ['Una asamblea plural cambió las reglas.', { luz: [3], nota: { 3: 'paz' } }],
      ['Y hubo un acuerdo que aún se cumple a medias.', { luz: [4], nota: { 4: 'paz' } }],
    ], 'Reconocer a las víctimas y contar también los intentos de paz.'),
    xpHaz('hoja', 'Pon al margen de qué habla cada dato.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['intento de paz', 'víctimas', 'origen'], meta: [1, 2, 0], paras: [['Millones de desplazados'], ['Sin espacio político y con tierra mal repartida'], ['Un grupo entrega sus armas']], pista: 'Alguna no va ahí: ¿qué sufrieron, por qué empezó o cómo se buscó salir?' }, 'Víctimas, origen e intento de paz.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Alguien dice: «El conflicto tuvo una sola causa y un solo culpable». Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sí, fue la Guerra Fría.'], ['No: se cruzaron tierra, exclusión, contexto mundial y narcotráfico.'], ['No tuvo causas.']], pista: 'Cuidado con «una sola».' }, 'Fue un proceso con varias causas y varios responsables.')],
], 'Varias causas, varios actores, víctimas civiles e intentos de paz.');
;
//#archivo js/explora-icf-sc-7.js
// Preicfes · Sociales y Ciudadanas, mundo 7 «Historia del Mundo» (Explora, escena «hoja»).
xpLec('icf-sc-mundo-1', [
  ['Dos clases de revolución',
    xpMira('hoja', 'Empecemos por la idea: unas revoluciones cambian **quién manda**; otra cambió **cómo se produce**.', { letras: ['1', '2', '3', '4'], paras: [['1776: trece colonias se independizan'], ['1789: Francia contra el poder absoluto'], ['1791–1804: Haití'], ['Inglaterra: vapor y fábricas']] }, [
      ['Aquí se cambia de gobierno.', { luz: [0], nota: { 0: 'política' } }],
      ['Aquí cae el poder absoluto.', { luz: [1], nota: { 1: 'política' } }],
      ['Aquí se liberan los esclavizados.', { luz: [2], nota: { 2: 'política' } }],
      ['Aquí cambia el trabajo.', { luz: [3], nota: { 3: 'industrial' } }],
      ['Ocurrieron casi a la vez.', {}],
    ], 'Políticas: quién manda. Industrial: cómo se produce.'),
    xpHaz('hoja', 'Subraya la que cambió **cómo se produce**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La de Haití'], ['La francesa'], ['La del vapor en Inglaterra']], pista: 'Busca máquinas.' }, 'El vapor movió telares, trenes y barcos.')],
  ['¿Derechos para todos?',
    xpMira('hoja', 'Segunda idea: la palabra era **«todos»**; la práctica, no.', { paras: [['«Todos nacen iguales»'], ['Mujeres: sin voto'], ['Indígenas: sin tierra'], ['Esclavizados: sin libertad'], ['Haití: los esclavizados lo toman en serio']] }, [
      ['Así decían los papeles.', { luz: [0] }],
      ['La mitad de la gente quedaba por fuera.', { luz: [1], nota: { 1: 'por fuera' } }],
      ['Y otros pueblos también.', { luz: [2, 3], nota: { 2: 'por fuera', 3: 'por fuera' } }],
      ['En Haití hicieron cumplir la palabra.', { luz: [4], nota: { 4: 'la cumplen' } }],
      ['Pregunta siempre quién entra en «todos».', { luz: [0] }],
    ], 'Compara lo que se proclama con quién queda por fuera.'),
    xpHaz('hoja', 'Subraya por qué Haití preocupó a los dueños de esclavos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Porque vendía azúcar'], ['Porque mostró que los esclavizados podían vencer'], ['Porque era una isla']], pista: '¿Qué podría repetirse en otras partes?' }, 'Era un ejemplo posible para los demás.')],
  ['Fábricas y nuevas ideas',
    xpMira('hoja', 'Tercera idea: la fábrica trajo **riqueza**, **obreros** y **nuevas ideas**.', { paras: [['Más productos y ciudades grandes'], ['Jornadas de doce horas, niños obreros'], ['Sindicatos y leyes'], ['Liberalismo y socialismo']] }, [
      ['Se produce mucho más.', { luz: [0] }],
      ['Pero quienes trabajan viven mal.', { luz: [1], nota: { 1: 'conflicto' } }],
      ['Se organizan para pedir derechos.', { luz: [2], nota: { 2: 'respuesta' } }],
      ['Y se discute cómo repartir.', { luz: [3], nota: { 3: 'ideas' } }],
      ['El voto se amplía despacio.', {}],
    ], 'Del conflicto salen sindicatos, leyes e ideas.'),
    xpHaz('hoja', 'Pon al margen la idea de cada persona.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['liberalismo', 'socialismo'], meta: [1, 0], paras: [['Un obrero: «La fábrica debería ser de todos».'], ['Un dueño: «Que el gobierno no toque mi negocio».']], pista: 'Alguna no va ahí: ¿quién quiere compartir y quién, que no se metan?' }, 'El obrero, socialismo; el dueño, liberalismo.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'En 1789 un panadero francés paga impuestos y un conde no. Subraya qué cuestionó la revolución.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los privilegios de nacimiento'], ['El precio de los telares'], ['La esclavitud en Haití']], pista: '¿Por qué el conde no paga?' }, 'Los estamentos daban privilegios según el nacimiento.')],
], 'Qué cambió, para quién y qué lucha quedó abierta.');

xpLec('icf-sc-mundo-2', [
  ['La chispa y la pólvora',
    xpMira('hoja', 'Empecemos por la idea: en 1914 un disparo fue la **chispa**; la **pólvora** llevaba años.', { paras: [['Colonias y mercados en disputa'], ['Dos alianzas'], ['Nacionalismo y prestigio'], ['Sarajevo, 1914']] }, [
      ['Las potencias competían por el mundo.', { luz: [0], nota: { 0: 'de fondo' } }],
      ['Si una peleaba, arrastraba a las otras.', { luz: [1], nota: { 1: 'de fondo' } }],
      ['Y cada una quería ser la primera.', { luz: [2], nota: { 2: 'de fondo' } }],
      ['El atentado lo disparó todo.', { luz: [3], nota: { 3: 'detonante' } }],
      ['Sin alianzas quizá habría sido un conflicto local.', { luz: [1] }],
    ], 'Colonias, alianzas y nacionalismo; Sarajevo, la chispa.'),
    xpHaz('hoja', 'Subraya lo que convirtió un atentado en una guerra de **muchos países**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El arma usada'], ['El sistema de alianzas'], ['El mes de junio']], pista: '¿Qué obligaba a unos a entrar por otros?' }, 'Cada aliado arrastró a los demás.')],
  ['De una guerra a otra',
    xpMira('hoja', 'Segunda idea: la paz mal hecha y la **crisis** abonaron la segunda guerra.', { paras: [['1919: Versalles culpa a Alemania'], ['1929: crisis mundial'], ['1933: Hitler, por vías legales'], ['1939: invasión de Polonia'], ['Holocausto: unos seis millones de judíos']] }, [
      ['Vienen pagos y humillación.', { luz: [0] }],
      ['Después, desempleo y miedo.', { luz: [1] }],
      ['Alguien ofrece orden y culpables.', { luz: [2], nota: { 2: 'acaba la democracia' } }],
      ['Y empieza otra guerra.', { luz: [3] }],
      ['El racismo se volvió política de Estado.', { luz: [4], nota: { 4: 'genocidio' } }],
    ], 'Humillación, crisis, dictadura, guerra y genocidio.'),
    xpHaz('hoja', 'Subraya lo que es **correcto** sobre la llegada de Hitler al poder.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Fue un golpe militar.'], ['Ocurrió antes de Versalles.'], ['Llegó por vías legales y luego acabó la democracia.']], pista: 'Las democracias también se pueden perder desde adentro.' }, 'Usó la ley para llegar y después la destruyó.')],
  ['Una guerra fría… para ellas',
    xpMira('hoja', 'Tercera idea: dos **bloques** no se atacan de frente y pelean en otros países.', { paras: [['1945: ONU; 1948: Derechos Humanos'], ['Estados Unidos, capitalista'], ['Unión Soviética, comunista'], ['Corea, Vietnam, Angola, Centroamérica'], ['1989: cae el Muro']] }, [
      ['Después del horror, reglas para todos.', { luz: [0] }],
      ['Pero los vencedores se dividen.', { luz: [1, 2] }],
      ['Con bombas atómicas, pelear de frente sería el fin.', { luz: [1, 2], nota: { 1: 'no se atacan' } }],
      ['La guerra ocurre en otras tierras.', { luz: [3], nota: { 3: 'muy caliente' } }],
      ['El Muro cae y, dos años después, la Unión Soviética.', { luz: [4] }],
    ], 'Fría entre potencias, caliente en otros países.'),
    xpHaz('hoja', 'Subraya por qué las dos potencias **no** se atacaron directamente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Podían destruirse mutuamente.'], ['Eran aliadas.'], ['Quedaban muy cerca.']], pista: 'Piensa en las armas que tenían.' }, 'El miedo a la destrucción las frenó.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'En 1973 un militar derroca a un presidente elegido y dice: «Evité el comunismo». Subraya el contexto que lo explica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La Primera Guerra Mundial'], ['La Guerra Fría en América Latina'], ['La Revolución Industrial']], pista: 'Mira la fecha y la palabra que usa para justificarse.' }, 'El miedo al comunismo justificó golpes.')],
], 'Chispa y pólvora, crisis y dictadura, dos bloques.');

xpLec('icf-sc-mundo-3', [
  ['Dejar de ser colonia',
    xpMira('hoja', 'Empecemos por la idea: en treinta años casi todas las **colonias** fueron países.', { paras: [['Europa, débil tras la guerra'], ['Pueblos que no esperan más'], ['India, 1947: sin violencia'], ['Argelia, 1962: con guerra']] }, [
      ['Una causa: las potencias estaban débiles.', { luz: [0], nota: { 0: 'causa' } }],
      ['Otra, más importante: la gente se organizó.', { luz: [1], nota: { 1: 'causa' } }],
      ['Un camino: desobedecer sin violencia.', { luz: [2] }],
      ['Otro camino fue la guerra.', { luz: [3] }],
      ['Los dos tuvieron costos.', { luz: [2, 3] }],
    ], 'Dos causas y dos caminos.'),
    xpHaz('hoja', 'Subraya un ejemplo de **desobediencia civil** no violenta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Poner una bomba'], ['Fabricar sal aunque esté prohibido'], ['Cobrar un impuesto']], pista: 'Incumplir una norma injusta sin dañar a nadie.' }, 'Gandhi caminó hasta el mar para hacer sal.')],
  ['Rayas y leyes',
    xpMira('hoja', 'Segunda idea: quedaron **fronteras** ajenas y **leyes** que separaban.', { paras: [['Fronteras africanas trazadas en Europa'], ['Pueblos partidos, guerras después'], ['Sudáfrica: apartheid desde 1948'], ['1994: votan todos; Mandela, presidente']] }, [
      ['Se trazaron con regla y sin preguntar.', { luz: [0] }],
      ['Muchas guerras nacieron ahí.', { luz: [1], nota: { 1: 'herencia' } }],
      ['El color decidía dónde vivir.', { luz: [2], nota: { 2: 'segregación' } }],
      ['Se acabó tras una larga lucha.', { luz: [3], nota: { 3: 'cambio' } }],
      ['Tener bandera no borra lo heredado.', { luz: [0, 1] }],
    ], 'La independencia no borra las rayas ni las leyes.'),
    xpHaz('hoja', 'Subraya lo que era el **apartheid**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Una alianza militar'], ['Un impuesto a la sal'], ['La separación por color hecha ley']], pista: 'Decidía dónde podía estar cada persona.' }, 'Era segregación legal.')],
  ['Movimientos sociales',
    xpMira('hoja', 'Tercera idea: un **movimiento social** es gente organizada para cambiar algo injusto.', { paras: [['No es un partido'], ['No es un ejército'], ['Marcha, boicot, huelga, arte, ley'], ['Casi nunca gana todo; a veces cambia lo posible']] }, [
      ['No busca llegar a gobernar.', { luz: [0] }],
      ['Ni usa las armas.', { luz: [1] }],
      ['Estas son sus herramientas.', { luz: [2], nota: { 2: 'herramientas' } }],
      ['Y así cambia leyes y costumbres.', { luz: [3] }],
      ['Derechos civiles, mujeres, estudiantes, pueblos indígenas.', {}],
    ], 'Organizarse, fuera de las instituciones, para cambiar algo.'),
    xpHaz('hoja', 'Pon al margen la herramienta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['huelga', 'boicot', 'ley'], meta: [1, 2, 0], paras: [['Nadie compra ese producto'], ['Se presenta un proyecto al Congreso'], ['Los trabajadores paran']], pista: 'Alguna no va ahí: ¿dejar de comprar, de trabajar o ir al Congreso?' }, 'Boicot, ley y huelga.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Unos vecinos dejan de usar un bus que cobra más a los del cerro, hasta que cambian la tarifa. Subraya qué es.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un boicot de un movimiento social'], ['Un golpe de Estado'], ['Una descolonización']], pista: 'Dejan de usar algo para exigir un cambio.' }, 'Como el boicot de los buses de 1955.')],
], 'Caminos, herencias y gente que se organiza.');
;
//#archivo js/explora-icf-sc-8.js
// Preicfes · Sociales y Ciudadanas, mundo 8 «Territorio y Ambiente» (Explora, escena «hoja»).
xpLec('icf-sc-geografia-1', [
  ['Regiones y altura',
    xpMira('hoja', 'Empecemos por la idea: seis regiones y un clima que depende de la **altura**.', { letras: ['1', '2', '3', '4'], paras: [['Andina: montañas y mucha gente'], ['Caribe y Pacífica: costas; una seca, otra lluviosa'], ['Orinoquía y Amazonía: enormes y poco pobladas'], ['Insular: islas']] }, [
      ['En la Andina vive la mayoría.', { luz: [0] }],
      ['Dos costas muy distintas.', { luz: [1], nota: { 1: 'seca y lluviosa' } }],
      ['Más de la mitad del país, con poca gente.', { luz: [2], nota: { 2: 'baja densidad' } }],
      ['Y las islas, rodeadas de mar.', { luz: [3] }],
      ['Cada mil metros que se suben, unos seis grados menos.', {}, '$1\\,000 \\text{ m} \\to 6\\,^\\circ\\text{C menos}$'],
    ], 'Seis regiones; al subir mil metros, unos seis grados menos.'),
    xpHaz('hoja', 'Al nivel del mar hay 28 °C. Subraya la temperatura aproximada a 3 000 m.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['28 °C'], ['10 °C'], ['22 °C']], pista: 'Baja unos seis grados por cada mil metros.' }, '$28 - 18 = 10$.')],
  ['Mapas que escogen',
    xpMira('hoja', 'Segunda idea: un mapa **escoge** qué mostrar y a qué **escala**.', { paras: [['Político: límites'], ['Físico: relieve y ríos'], ['Temático: un asunto'], ['1 : 1 000 000 → 1 cm son 10 km'], ['1 : 10 000 → 1 cm son 100 m']] }, [
      ['Este mapa muestra las fronteras.', { luz: [0] }],
      ['Este, montañas y agua.', { luz: [1] }],
      ['Este, una sola cosa: lluvias, empleo…', { luz: [2] }],
      ['Con esta escala cabe un país.', { luz: [3], nota: { 3: 'poco detalle' } }],
      ['Con esta, un barrio y sus calles.', { luz: [4], nota: { 4: 'mucho detalle' } }],
    ], 'Qué muestra, qué deja fuera y cuánto redujo.'),
    xpHaz('hoja', 'En un mapa 1 : 50 000, dos pueblos están a 4 cm. Subraya la distancia real.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['50 km'], ['20 km'], ['2 km']], pista: 'Cada centímetro son 50 000 cm: 500 metros.' }, '$4 \\cdot 500 = 2\\,000$ m.')],
  ['La población se mueve',
    xpMira('hoja', 'Tercera idea: la población se **concentra**, se **mueve** y **envejece**.', { paras: [['Densidad: habitantes por km²'], ['Del campo a la ciudad'], ['Por decisión o a la fuerza'], ['Pirámide: base que se encoge, punta que crece']] }, [
      ['No importa solo cuántos: también en cuánto espacio.', { luz: [0] }],
      ['Hoy, tres de cada cuatro viven en ciudades.', { luz: [1], nota: { 1: 'migración' } }],
      ['Unos eligieron; otros huyeron.', { luz: [2] }],
      ['Nacen menos y se vive más.', { luz: [3], nota: { 3: 'envejece' } }],
      ['El dibujo anuncia qué hará falta.', { luz: [3] }],
    ], 'Densidad, migración y pirámide.'),
    xpHaz('hoja', 'A: 10 000 personas en 50 km². B: 12 000 en 120 km². Subraya el de **mayor densidad**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A'], ['B'], ['Igual']], pista: 'Divide personas entre kilómetros cuadrados.' }, 'A: 200 por km²; B: 100.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'La pirámide de un municipio tiene la base muy ancha. Subraya lo que más va a necesitar pronto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hogares para ancianos'], ['Cupos en jardines y primaria'], ['Menos maestros']], pista: '¿Qué edades están en la base?' }, 'En la base están los niños.')],
], 'Altura, mapas y gente que se mueve.');

xpLec('icf-sc-geografia-2', [
  ['Renovable no es infinito',
    xpMira('hoja', 'Empecemos por la idea: **renovable** se recupera, si se usa con medida.', { paras: [['Agua, bosque, viento'], ['Petróleo, carbón'], ['Bosque talado más rápido de lo que crece']] }, [
      ['Estos se recuperan con el tiempo.', { luz: [0], nota: { 0: 'renovables' } }],
      ['Estos tardan millones de años.', { luz: [1], nota: { 1: 'no renovables' } }],
      ['Pero este se acaba igual.', { luz: [2], tacha: [2] }],
      ['Importa la velocidad a la que se usa.', { luz: [2] }],
      ['Cuidar es no gastar más de lo que vuelve.', {}],
    ], 'Se recupera si se usa despacio.'),
    xpHaz('hoja', 'Un río recibe 100 litros por segundo y se sacan 130. Subraya lo que pasará.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Nada: el agua es renovable.'], ['El río irá bajando.'], ['El río crecerá.']], pista: 'Compara lo que entra con lo que sale.' }, 'Sale más de lo que entra.')],
  ['Tres patas',
    xpMira('hoja', 'Segunda idea: lo **sostenible** tiene tres patas: economía, sociedad y ambiente.', { paras: [['Da empleo'], ['No expulsa a nadie'], ['Cuida el agua'], ['Da empleo y envenena el río'], ['Cuida el río y expulsa a su gente']] }, [
      ['Esta es la pata económica.', { luz: [0], nota: { 0: 'económica' } }],
      ['Esta es la pata social.', { luz: [1], nota: { 1: 'social' } }],
      ['Y esta es la pata ambiental.', { luz: [2], nota: { 2: 'ambiental' } }],
      ['Aquí falta una: cojea.', { luz: [3], tacha: [3] }],
      ['Aquí falta otra: también cojea.', { luz: [4], tacha: [3, 4] }],
    ], 'Si falla una, no es sostenible.'),
    xpHaz('hoja', 'Subraya el proyecto **más sostenible**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Hotel que seca la laguna y da empleo'], ['Parque cerrado, sin los que vivían allí'], ['Ecoturismo manejado por la comunidad, con límite de visitas']], pista: 'Revisa las tres patas en cada uno.' }, 'Da ingreso, incluye a la gente y cuida el lugar.')],
  ['Quién está en la mesa',
    xpMira('hoja', 'Tercera idea: toda decisión sobre el territorio **reparte** ganancias y pérdidas.', { paras: [['Empresa: gana'], ['Ciudad: gana agua'], ['Campesino: pierde su siembra'], ['Consulta, audiencias, ordenamiento']] }, [
      ['Primero: alguien gana dinero.', { luz: [0] }],
      ['Alguien gana un servicio.', { luz: [1] }],
      ['Alguien pierde su sustento.', { luz: [2], nota: { 2: '¿está en la mesa?' } }],
      ['Estas reglas buscan que se le oiga.', { luz: [3], nota: { 3: 'que se oiga' } }],
      ['Un mapa sin casas es peligroso.', { luz: [2] }],
    ], 'Pregunta quién gana, quién pierde y quién decide.'),
    xpHaz('hoja', 'Se hará una represa y el plano no muestra viviendas. Subraya la mejor pregunta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Quién vive allí y qué dice?'], ['¿De qué color será?'], ['¿Quién dibujó el plano más bonito?']], pista: 'Piensa qué deja por fuera el plano.' }, 'Hay que oír a quienes viven en el lugar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'En un país poco industrial, la mayor emisión de gases viene de talar bosques. Subraya la medida que más ayudaría.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cerrar todas las fábricas'], ['Frenar la deforestación con alternativas para quienes viven de ella'], ['Pintar los techos de verde']], pista: 'Ataca la mayor fuente sin olvidar a la gente.' }, 'Va a la fuente principal y cuida la pata social.')],
], 'Usar con medida, tres patas y oír a todos.');
;
//#archivo js/explora-icf-sc-9.js
// Preicfes · Sociales y Ciudadanas, mundo 9 «Economía y Globalización» (Explora, escenas «dibujo» y «hoja»).
{
  // Oferta y demanda: o y d corren las curvas; e enciende el equilibrio.
  const curvas = (v, K) => { const x0 = 70, x1 = 270, X = (x0 + x1) / 2 + (v.o + v.d) / 2, Y = 96 + (v.o - v.d) / 2; return K.l(60, 20, 60, 176, 'lm') + K.l(60, 176, 290, 176, 'lm') + K.t(54, 18, 'precio', 's tm', 'start') + K.t(290, 190, 'cantidad', 's tm', 'end') + K.l(110 + v.o, 156, 230 + v.o, 36, 'la gr') + K.t(234 + v.o, 34, 'oferta', 's ta', 'start') + K.l(110 + v.d, 36, 230 + v.d, 156, 'lg gr') + K.t(234 + v.d, 166, 'demanda', 's tg', 'start') + K.f(v.e, K.l(60, Y, X, Y, 'lm') + K.c(X, Y, 6, 'fF')); };

  xpLec('icf-sc-economia-1', [
    ['Oferta y demanda',
      xpMira('dibujo', 'Empecemos por la idea: el precio sale del cruce entre **oferta** y **demanda**.', { dib: curvas, v: { o: 0, d: 0, e: 0 }, alto: 198 }, [
        ['Si sube el precio, se quiere comprar menos.', {}],
        ['Y se quiere vender más.', {}],
        ['Donde coinciden está el equilibrio.', { e: 1 }],
        ['Si se daña la cosecha, la oferta baja: sube el precio.', { o: -36 }],
        ['Si todos lo buscan, sube la demanda: también sube.', { o: 0, d: 36 }],
      ], 'Menos oferta o más demanda: sube el precio.'),
      xpHaz('hoja', 'Hubo tanta piña que se dañaba en los camiones. Subraya qué pasó con su precio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Aumentó lo que se ofrece o lo que se quiere?' }, 'Más oferta con la misma demanda: baja.')],
    ['Quién manda',
      xpMira('hoja', 'Segunda idea: importa **cuántos venden** y si **se ponen de acuerdo**.', { paras: [['Muchos puestos de jugo'], ['Una sola empresa de luz'], ['Cuatro fábricas pactan el precio'], ['El Estado vigila']] }, [
        ['Con muchos, ninguno manda.', { luz: [0], nota: { 0: 'competencia' } }],
        ['Con uno solo, no hay a dónde ir.', { luz: [1], nota: { 1: 'monopolio' } }],
        ['Este pacto secreto es ilegal.', { luz: [2], nota: { 2: 'cartel' } }],
        ['Por eso hay reglas y multas.', { luz: [3] }],
        ['También hay daños que pagan otros: externalidades.', {}],
      ], 'Competencia, monopolio y cartel.'),
      xpHaz('hoja', 'Pon al margen qué es cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['cartel', 'externalidad', 'monopolio'], meta: [2, 0, 1], paras: [['Un solo tren lleva a la isla.'], ['Dos cines acuerdan subir la boleta.'], ['El ruido de un bar no deja dormir al barrio.']], pista: 'Alguna no va ahí: ¿un vendedor, un pacto o un daño?' }, 'Uno solo, un pacto y un daño a terceros.')],
    ['Impuestos',
      xpMira('hoja', 'Tercera idea: pregunta **cuándo se paga** y **a quién le pesa más**.', { paras: [['Renta: según lo que se gana'], ['IVA: al comprar'], ['Cobra más proporción a quien más tiene'], ['Pesa más sobre quien menos tiene']] }, [
        ['Este depende de la persona.', { luz: [0], nota: { 0: 'directo' } }],
        ['Este lo paga cualquiera que compre.', { luz: [1], nota: { 1: 'indirecto' } }],
        ['Así, el que más tiene pone más.', { luz: [2], nota: { 2: 'progresivo' } }],
        ['Así, al que menos tiene le duele más.', { luz: [3], nota: { 3: 'regresivo' } }],
        ['Igual en pesos no es igual en peso.', {}],
      ], 'Directo o indirecto; progresivo o regresivo.'),
      xpHaz('hoja', 'Subraya el cobro **más progresivo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['50 mil por persona'], ['5 % a todos'], ['2 % al que gana poco y 20 % al que gana mucho']], pista: 'Busca el que cobra mayor proporción al que más gana.' }, 'La proporción aumenta con el ingreso.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se fija la libra de queso en la mitad de lo que cuesta producirla. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Escasez y venta a escondidas'], ['Más queso en las tiendas'], ['Mejor queso']], pista: '¿Qué harán los que venden?' }, 'Los vendedores ofrecen menos a ese precio.')],
  ], 'El cruce, cuántos venden y a quién le pesa.');

  xpLec('icf-sc-economia-2', [
    ['Inflación',
      xpMira('hoja', 'Empecemos por la idea: hay **inflación** cuando sube **casi todo**.', { letras: ['1', '2', '3', '4'], paras: [['Canasta de ayer: 200 mil'], ['Canasta de hoy: 216 mil'], ['Sueldo: sigue en un millón'], ['Alcanza para menos']] }, [
        ['La misma canasta, un año después.', { luz: [0, 1] }],
        ['Subió ocho de cada cien.', { luz: [1], nota: { 1: '+8 %' } }, '$16 \\div 200 = 0.08$'],
        ['El recibo dice lo mismo.', { luz: [2], nota: { 2: 'nominal' } }],
        ['Pero ahora compra menos cosas.', { luz: [3], nota: { 3: 'real' } }],
        ['Para quedar igual, debía subir 8 %.', {}],
      ], 'Nominal es en pesos; real, en compras.'),
      xpHaz('hoja', 'El sueldo subió 6 % y los precios 9 %. Subraya lo que pasó con el salario **real**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Qué subió más rápido?' }, 'Los precios corrieron más que el sueldo.')],
    ['Quién es desempleado',
      xpMira('hoja', 'Segunda idea: cuenta como **desempleado** quien **busca y no encuentra**.', { paras: [['Busca y no encuentra'], ['Trabaja sin contrato'], ['No trabaja ni busca'], ['Tasa = desempleados ÷ fuerza laboral']] }, [
        ['Este sí cuenta: es desempleado.', { luz: [0], nota: { 0: 'desempleado' } }],
        ['Este trabaja, pero es informal.', { luz: [1], nota: { 1: 'ocupado' } }],
        ['Este no entra en la cuenta.', { luz: [2], tacha: [2] }],
        ['La fuerza laboral son los dos primeros.', { luz: [0, 1, 3] }],
        ['Si muchos dejan de buscar, la tasa baja sin empleos.', {}],
      ], 'Buscar y no encontrar.'),
      xpHaz('hoja', 'En un pueblo, 90 trabajan, 10 buscan y 50 no buscan. Subraya la tasa de desempleo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['40 %'], ['10 %'], ['60 %']], pista: 'Los que no buscan no entran.' }, '$10 \\div 100 = 10$ %.')],
    ['Pobreza y reparto',
      xpMira('hoja', 'Tercera idea: **cuánto falta** y **cómo se reparte** son preguntas distintas.', { paras: [['¿Alcanza la canasta?'], ['¿Hay agua, escuela y salud?'], ['¿Cómo se reparte?'], ['Promedio: 10. Uno tiene 91 y nueve tienen 1']] }, [
        ['Esta mira solo el ingreso.', { luz: [0], nota: { 0: 'pobreza monetaria' } }],
        ['Mira las condiciones de vida.', { luz: [1], nota: { 1: 'multidimensional' } }],
        ['Y esta mira las diferencias.', { luz: [2], nota: { 2: 'desigualdad' } }],
        ['El promedio esconde el reparto.', { luz: [3] }, '$(91 + 9) \\div 10 = 10$'],
        ['El Gini va de 0, todos igual, a 1.', { luz: [2] }],
      ], 'Lo que falta y cómo se reparte.'),
      xpHaz('hoja', 'El Gini de A es 0.28 y el de B, 0.55. Subraya el país más **desigual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A'], ['B'], ['No se puede saber']], pista: 'Más cerca de 1, más desigual.' }, '0.55 está más lejos del reparto igual.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'El banco central baja la tasa de interés. Subraya el efecto más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Se gasta menos'], ['Los préstamos son más caros'], ['Se gasta más y los precios pueden subir']], pista: 'Piensa en los préstamos.' }, 'Créditos baratos: más gasto y más presión en los precios.')],
  ], 'Lo que alcanza, quién busca y cómo se reparte.');

  xpLec('icf-sc-economia-3', [
    ['Una red',
      xpMira('hoja', 'Empecemos por la idea: un objeto puede ser hecho por **muchos países**.', { paras: [['Metal de Chile'], ['Pantalla de Corea'], ['Programas de Irlanda'], ['Armado en México'], ['Vendido en Pasto']] }, [
        ['Un celular empieza en una mina.', { luz: [0] }],
        ['La pantalla llega de otro continente.', { luz: [1] }],
        ['Los programas viajan por internet.', { luz: [2] }],
        ['Lo arman en otro lugar.', { luz: [3] }],
        ['Y lo compra alguien en Nariño.', { luz: [4] }],
      ], 'Comercio, dinero, información y personas.'),
      xpHaz('hoja', 'Subraya lo que **más** aceleró esa red.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Transporte e internet más baratos'], ['Que nació el comercio'], ['Que hay menos países']], pista: 'El comercio es muy antiguo.' }, 'La velocidad es lo nuevo.')],
    ['Abrir la puerta',
      xpMira('hoja', 'Segunda idea: al bajar los **aranceles**, unos ganan y otros arriesgan.', { paras: [['Arancel: se cobra al entrar'], ['Vende afuera'], ['Compra más barato'], ['Compite con gigantes']] }, [
        ['Sin él, lo de afuera entra más barato.', { luz: [0] }],
        ['El exportador encuentra clientes.', { luz: [1], nota: { 1: 'gana' } }],
        ['El comprador ahorra un poco.', { luz: [2], nota: { 2: 'gana' } }],
        ['El pequeño productor puede quebrar.', { luz: [3], nota: { 3: 'arriesga' } }],
        ['La pregunta es quién lo prepara y lo apoya.', {}],
      ], 'La puerta se abre en los dos sentidos.'),
      xpHaz('hoja', 'Entran zapatos muy baratos sin arancel. Pon al margen quién gana y quién arriesga.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['arriesga', 'gana'], meta: [1, 0], paras: [['Quien compra zapatos'], ['El taller que los hace en el barrio']], pista: 'Alguna no va ahí: ¿le baja el precio o le llega competencia?' }, 'El comprador ahorra; el taller compite.')],
    ['También viajan',
      xpMira('hoja', 'Tercera idea: viajan **costumbres**, **reglas** y **problemas**.', { paras: [['Música y comidas'], ['Empresas en muchos países'], ['Crisis y virus'], ['ONU, FMI, OMC']] }, [
        ['Se mezclan: a eso le dicen glocal.', { luz: [0] }],
        ['Buscan mercado y costos bajos.', { luz: [1] }],
        ['Lo de allá golpea acá.', { luz: [2] }],
        ['Estos intentan coordinar respuestas.', { luz: [3] }],
        ['Y no todos los países pesan igual allí.', { luz: [3] }],
      ], 'Lo bueno y lo malo cruzan fronteras.'),
      xpHaz('hoja', 'Subraya el ejemplo de lo **glocal**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un carro importado'], ['Rap en lengua nasa'], ['Un arancel']], pista: 'Busca algo mundial mezclado con algo local.' }, 'Un género mundial en una lengua local.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un país baja sus reglas ambientales para atraer fábricas. Subraya el mejor argumento en **contra**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El daño lo pagan sus habitantes'], ['Llegan empleos'], ['Las fábricas son grandes']], pista: 'Piensa quién asume el costo.' }, 'Es una externalidad: otros pagan el daño.')],
  ], 'Red, puertas y cosas que cruzan.');
}
;
//#archivo js/explora-icf-sc-10.js
// Preicfes · Sociales y Ciudadanas, mundo 10 «Modelos para Decidir» (Explora, escena «hoja»).
xpLec('icf-sc-modelos-1', [
  ['Tres que se confunden',
    xpMira('hoja', 'Empecemos por la idea: **Estado**, **gobierno** y **nación** no son lo mismo.', { paras: [['Organización con leyes y territorio'], ['Personas que dirigen por un tiempo'], ['Grupo que se siente unido'], ['Una nación en dos Estados']] }, [
      ['Esta continúa con los años.', { luz: [0], nota: { 0: 'Estado' } }],
      ['Estas cambian en las elecciones.', { luz: [1], nota: { 1: 'gobierno' } }],
      ['Este comparte historia o lengua.', { luz: [2], nota: { 2: 'nación' } }],
      ['Por eso no siempre coinciden.', { luz: [3] }],
      ['Si nadie manda sobre el Estado, es soberano.', { luz: [0] }],
    ], 'Organización, personas y sentimiento de grupo.'),
    xpHaz('hoja', 'Pon al margen el concepto.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['nación', 'Estado', 'gobierno'], meta: [2, 0, 1], paras: [['El gabinete que termina en agosto'], ['El pueblo gitano, en muchos países'], ['El que sigue obligado por un tratado, gane quien gane']], pista: 'Alguna no va ahí: ¿cambia con las elecciones o se siente unida?' }, 'Cambia, se siente unido y continúa.')],
  ['Poder y legitimidad',
    xpMira('hoja', 'Segunda idea: se puede mandar por **fuerza** o con **legitimidad**.', { paras: [['Obedecen por miedo'], ['Obedecen porque lo reconocen'], ['Ley bien aprobada'], ['Ley que casi todos sienten injusta']] }, [
      ['Sin la amenaza, no obedecerían.', { luz: [0], nota: { 0: 'fuerza' } }],
      ['Aquí aceptan su derecho a mandar.', { luz: [1], nota: { 1: 'legitimidad' } }],
      ['Cumplir las reglas la hace legal.', { luz: [2], nota: { 2: 'legal' } }],
      ['Puede ser legal y no legítima.', { luz: [3], nota: { 3: 'poco legítima' } }],
      ['Una cosa es la norma; otra, que la acepten.', {}],
    ], 'Legal: según la norma. Legítimo: reconocido.'),
    xpHaz('hoja', 'Subraya el caso **legal pero poco legítimo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un robo'], ['Un impuesto aprobado que todo el pueblo rechaza'], ['Una elección limpia y aceptada']], pista: 'Debe cumplir la norma y no ser reconocido.' }, 'Se aprobó según la norma, pero casi nadie lo acepta.')],
  ['Mirar a la gente',
    xpMira('hoja', 'Tercera idea: **clase**, **etnia** y **género** son capas; la **cultura** se aprende.', { paras: [['Ingresos y trabajo'], ['Origen y cultura'], ['Lo que se espera de hombres y mujeres'], ['Juzgar con mi medida'], ['Entender sus razones']] }, [
      ['Esta es la clase social.', { luz: [0], nota: { 0: 'clase' } }],
      ['Esta es la etnia.', { luz: [1], nota: { 1: 'etnia' } }],
      ['Y este es el género.', { luz: [2], nota: { 2: 'género' } }],
      ['Frente a otra cultura, esto es etnocentrismo.', { luz: [3] }],
      ['Y esto es relativismo, con los derechos como límite.', { luz: [4] }],
    ], 'Capas que se cruzan y culturas que se entienden.'),
    xpHaz('hoja', 'Subraya la frase **etnocentrista**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«¿Por qué celebran así?»'], ['«Celebran de otra forma»'], ['«Celebran mal: lo correcto es como aquí»']], pista: 'Busca la que juzga con la medida propia.' }, 'Pone lo propio como la medida de todo.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una nieta de campesinos sin escuela llega a ser médica. Subraya el concepto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Movilidad social'], ['Soberanía'], ['Etnocentrismo']], pista: '¿Qué cambió en su familia?' }, 'Cambió de posición social.')],
], 'Tres que se confunden, dos modos de mandar y capas.');

xpLec('icf-sc-modelos-2', [
  ['Un modelo',
    xpMira('hoja', 'Empecemos por la idea: un **modelo** simplifica para **comparar**, como un mapa.', { paras: [['Quién decide'], ['Quién es dueño'], ['Quién paga'], ['Quién queda por fuera']] }, [
      ['Un mapa no es el territorio.', {}],
      ['Estas preguntas sirven para cualquier propuesta.', { luz: [0, 1] }],
      ['También sirven estas otras dos.', { luz: [2, 3] }],
      ['Se comparan respuestas, no nombres.', {}],
      ['La realidad casi siempre mezcla.', {}],
    ], 'Cuatro preguntas para comparar.'),
    xpHaz('hoja', 'Subraya la mejor razón para usar modelos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Dicen qué gobierno es el bueno'], ['Ayudan a comparar ideas complicadas'], ['Describen cada detalle de un país']], pista: 'Simplifican: ¿para qué?' }, 'Simplificar permite comparar.')],
  ['Cuatro lógicas',
    xpMira('hoja', 'Segunda idea: hay varias **lógicas** sobre lo que debe hacer el Estado.', { paras: [['Estado pequeño y mercado'], ['Mercado, impuestos y derechos para todos'], ['Empresas de todos'], ['Asamblea y vida en común']] }, [
      ['Esta pone primero la libertad.', { luz: [0], nota: { 0: 'liberal' } }],
      ['Esta reparte para igualar.', { luz: [1], nota: { 1: 'bienestar' } }],
      ['Esta prefiere la propiedad común.', { luz: [2], nota: { 2: 'socialista' } }],
      ['Esta, la comunidad y sus costumbres.', { luz: [3], nota: { 3: 'comunitaria' } }],
      ['Cada una recibe críticas serias.', {}],
    ], 'Libertad, igualdad, propiedad común y comunidad.'),
    xpHaz('hoja', 'Pon al margen la lógica de cada medida.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['bienestar', 'comunitaria', 'liberal'], meta: [2, 0, 1], paras: [['Vender los buses públicos a quien compita mejor'], ['Pensión para todos, pagada con impuestos'], ['El cabildo reparte las tierras según la costumbre']], pista: 'Alguna no va ahí: ¿mercado, reparto o asamblea?' }, 'Competir, repartir y decidir en comunidad.')],
  ['Evaluar una decisión',
    xpMira('hoja', 'Tercera idea: ante una decisión, mira **valor**, **beneficio** y **costo**.', { paras: [['«Cobrar por entrar al parque»'], ['Valor: quien lo usa lo paga'], ['Gana: el mantenimiento'], ['Pierde: quien no puede pagar']] }, [
      ['Esta es la decisión.', { luz: [0] }],
      ['Detrás hay un valor.', { luz: [1] }],
      ['Alguien se beneficia de ella.', { luz: [2] }],
      ['Y alguien queda por fuera.', { luz: [3] }],
      ['Se puede ajustar: gratis para algunos.', {}],
    ], 'Qué valor, quién gana y quién queda por fuera.'),
    xpHaz('hoja', 'Se propone educación privada con becas solo para los mejores. Subraya la mejor **crítica** desde la igualdad.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los colegios competirían'], ['Quedan por fuera quienes no pagan ni ganan beca'], ['Habría muchos uniformes']], pista: 'Desde la igualdad, ¿quién preocupa?' }, 'Deja por fuera a una parte.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un país tiene empresas privadas y salud pública gratuita. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Es un modelo puro'], ['No tiene modelo'], ['Mezcla lógicas']], pista: 'Casi ningún país usa uno solo.' }, 'Mercado y derechos: una mezcla.')],
], 'Simplificar, cuatro lógicas y evaluar.');
;
//#archivo js/explora-icf-cn.js
// Preicfes · Ciencias Naturales, mundo 1 «Indagación Científica» (Explora, escenas «hoja» y «dibujo»). Experimentos cortos propios.
{
  const n1 = x => String(Math.round(x * 10) / 10);
  // Dos vasos con hielo: lo que queda (0 a 1) en cada uno y lo que cambia entre ellos.
  const vasos = (v, K) => [[90, v.a, v.ra], [250, v.b, v.rb]].map(([x, h, r]) => K.pl([[x - 40, 40], [x - 34, 150], [x + 34, 150], [x + 40, 40]], 'lm') + K.r(x - 26, 146 - 90 * h, 52, 90 * h, 'fa', 6) + K.t(x, 172, r, 's')).join('') + K.f(v.f, K.t(170, 24, v.txt, 'ta'));
  // Puntos sobre ejes: datos [x, y], con X de 0 a 5 y Y de 0 a hi.
  const X = x => 52 + x * 52, Y = (y, hi) => 160 - y / hi * 130;
  const ejes = (K, hi, st, ex, ey) => { let h = K.l(52, 160, 322, 160, 'lm') + K.l(52, 160, 52, 22, 'lm') + K.t(187, 194, ex, 's tm') + K.t(56, 16, ey, 's tm', 'start'); for (let k = 0; k <= hi; k += st) h += K.l(52, Y(k, hi), 318, Y(k, hi), 'ls') + K.t(46, Y(k, hi) + 4, k, 's tm', 'end'); for (let k = 1; k <= 5; k++) h += K.t(X(k), 176, k, 's tm'); return h; };
  const puntos = (v, K) => ejes(K, 50, 10, 'cucharadas de sal', 'minutos') + [[1, 40], [2, 34], [3, 28], [4, 22]].map(([x, y], i) => K.f(v.n - i, K.c(X(x), Y(y, 50), 6, 'fA'))).join('') + K.f(v.l, K.l(X(0.6), Y(42.4, 50), X(4.3), Y(20.2, 50), 'lg')) + K.f(v.q, K.l(X(4.3), Y(20.2, 50), X(5), Y(16, 50), 'lg d') + K.t(X(5), Y(16, 50) - 10, '?', 'ta'));

  xpLec('icf-cn-indaga-1', [
    ['Cambiar una sola cosa',
      xpMira('dibujo', 'Empecemos por la idea: para saber si algo influye, se cambia **solo eso**.', { dib: vasos, v: { a: 1, b: 1, ra: 'con sal', rb: 'sin sal', f: 0, txt: '' }, alto: 186 }, [
        ['Dos vasos con el mismo hielo. A uno se le echa sal.', {}],
        ['A los diez minutos, el de sal se derritió más.', { a: 0.3, b: 0.7 }],
        ['Como solo cambió la sal, la diferencia es por la sal.', { f: 1, txt: 'solo cambió la sal' }],
        ['Pero si el de sal estuviera además al sol…', { f: 1, txt: '¿sal o sol?', ra: 'sal y sol', rb: 'sin sal, sombra' }],
        ['…no se sabría cuál de las dos cosas lo derritió.', {}],
      ], 'Si cambian dos cosas a la vez, no se sabe cuál fue.'),
      xpHaz('hoja', '¿El color del vaso influye en que se caliente el agua? Subraya la prueba que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Vaso negro al sol, blanco a la sombra.'], ['Vaso negro y blanco, iguales, los dos al sol.'], ['Vaso negro lleno, blanco a la mitad.']], pista: 'En esa cambian dos cosas. Busca la que solo cambia el color.' }, 'Solo debe ser distinto el color.')],
    ['Los nombres de las variables',
      xpMira('hoja', 'Segunda idea: en todo experimento hay tres papeles.', { paras: [['Se riegan tres plantas con', 'distinta cantidad de agua.'], ['Se mide', 'cuánto crecen.'], ['Todas tienen', 'la misma tierra y el mismo sol.']] }, [
        ['Lo que el investigador cambia a propósito: el agua.', { luz: [1], nota: { 0: 'independiente' } }],
        ['Lo que mide para ver el efecto: cuánto crecen.', { luz: [3], nota: { 1: 'dependiente' } }],
        ['Lo que deja igual para no confundirse.', { luz: [5], nota: { 2: 'controladas' } }],
        ['La dependiente «depende» de la que se cambió.', { luz: [1, 3] }],
        ['Y un grupo sin el cambio sirve de comparación: el control.', {}],
      ], 'Independiente: se cambia. Dependiente: se mide. Controlada: igual.'),
      xpHaz('hoja', 'Se prueban tres jabones en manchas iguales y se mide cuánto tardan en salir. Pon los papeles.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['dependiente', 'controlada', 'independiente'], meta: [2, 0, 1], paras: [['El jabón'], ['El tiempo'], ['La mancha']], pista: 'Pregunta qué se cambia, qué se mide y qué se deja igual.' }, 'El jabón se cambia, el tiempo se mide, la mancha es igual.')],
    ['Una hipótesis se puede tumbar',
      xpMira('hoja', 'Tercera idea: una **hipótesis** es una respuesta que los datos pueden desmentir.', { letras: ['A', 'B', 'C'], paras: [['Con más abono, la planta crece más.'], ['Las plantas son bonitas.'], ['¿Crecen con abono?']] }, [
        ['Esta dice qué pasará: se puede medir y fallar.', { luz: [0], nota: { 0: 'hipótesis' } }],
        ['Esta es un gusto: ninguna regla la mide.', { luz: [1], nota: { 1: 'opinión' } }],
        ['Esta pregunta, todavía no responde.', { luz: [2], nota: { 2: 'pregunta' } }],
        ['Si los datos la contradicen, se cambia la hipótesis.', { luz: [0] }],
        ['Los datos no se cambian para darle la razón.', {}],
      ], 'Una hipótesis dice algo que se puede medir y que puede resultar falso.'),
      xpHaz('hoja', 'Subraya la hipótesis que se puede poner a prueba.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El perro es el mejor animal.'], ['¿Duermen mucho los gatos?'], ['Un gato duerme más horas que un perro.'], ['Los gatos son misteriosos.']], pista: 'Esa pregunta u opina. Busca la que se puede medir con un reloj.' }, 'Horas de sueño: se miden y se comparan.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se quiere saber si el agua caliente disuelve más rápido el azúcar. **Tacha** las dos cosas que **no** deben cambiar.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Cuánta azúcar se echa'], ['La temperatura del agua'], ['Cuánta agua hay']], pista: 'Alguna de las tachadas es justo lo que se quiere estudiar.' }, 'Solo la temperatura cambia.')],
  ], 'Cambia una cosa, mide otra, deja lo demás igual y acepta lo que digan los datos.');

  xpLec('icf-cn-indaga-2', [
    ['Leer la tendencia',
      xpMira('dibujo', 'Empecemos por la idea: más que un dato suelto, importa **hacia dónde van** todos.', { dib: puntos, v: { n: 0, l: 0, q: 0 }, alto: 200 }, [
        ['Con una cucharada de sal, el hielo tarda 40 minutos.', { n: 1 }],
        ['Con dos, 34; con tres, 28; con cuatro, 22.', { n: 4 }],
        ['Todos bajan: a más sal, menos tiempo.', { l: 1 }],
        ['Y bajan parejo: 6 minutos por cucharada.', {}, '$40 - 34 = 6 \\qquad 28 - 22 = 6$'],
        ['Para cinco cucharadas se puede predecir, no asegurar.', { q: 1 }, '$22 - 6 = 16$'],
      ], 'Mira si sube, baja o sigue igual, y cuánto en cada paso.'),
      xpHaz('dibujo', 'Con 1, 2 y 3 cucharadas de levadura, una masa tarda 48, 40 y 32 minutos en crecer. Si sigue igual, lleva el punto a lo que tardaría con **4**.', { dib: (v, K) => ejes(K, 50, 10, 'cucharadas de levadura', 'minutos') + [[1, 48], [2, 40], [3, 32]].map(([x, y]) => K.c(X(x), Y(y, 50), 6, 'fA')).join('') + K.l(X(4), 160, X(4), Y(v.y, 50), 'lm d'), v: { y: 44 }, metas: { y: 24 }, alto: 200, manijas: [{ k: 'y', min: 0, max: 50, paso: 2, r: 10, en: v => [X(4), Y(v.y, 50)], de: (x, y) => (160 - y) / 130 * 50 }],
        lee: v => `$32 \\to ${n1(v.y)}$`, dice: v => `De 3 a 4 cucharadas cambiaría ${Math.abs(32 - v.y)} minutos.` }, 'Baja 8 en cada paso: $32 - 8 = 24$.')],
    ['Qué se puede concluir',
      xpMira('hoja', 'Segunda idea: una conclusión no puede decir **más** que los datos.', { letras: ['1', 'a', 'b', 'c'], paras: [['Se probaron 20 pilas de una marca: duraron 9 horas en promedio.'], ['Esas 20 pilas duraron 9 horas en promedio.'], ['Todas las marcas duran 9 horas.'], ['Duran 9 horas por su color.']] }, [
        ['Arriba están los datos.', { luz: [0] }],
        ['Esta dice justo lo que se midió.', { luz: [0, 1], nota: { 1: 'válida' } }],
        ['Esta habla de marcas que nadie probó.', { luz: [2], nota: { 2: 'dice de más' } }],
        ['Esta da una causa que nadie investigó.', { luz: [3], nota: { 3: 'inventa causa' } }],
        ['Cuidado con «todos», «siempre» y «porque».', {}],
      ], 'Si habla de algo que no se midió, dice de más.'),
      xpHaz('hoja', 'En 30 casas con huerta se gastó menos en mercado que en 30 sin huerta. **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['En todo el país pasa lo mismo.'], ['Esas 30 casas con huerta gastaron menos.'], ['La huerta cura enfermedades.']], pista: 'Alguna de las tachadas dice justo lo que se midió.' }, 'Ni el país ni las enfermedades se midieron.')],
    ['Repetir y medir bien',
      xpMira('hoja', 'Tercera idea: una medida puede fallar; **repetir** descubre el error.', { paras: [['Primera medida: 5.1 s.'], ['Segunda: 5.0 s.'], ['Tercera: 8.7 s.'], ['Cuarta: 4.9 s.']] }, [
        ['Cuatro veces el mismo experimento.', {}],
        ['Tres se parecen: alrededor de 5 segundos.', { luz: [0, 1, 3] }],
        ['Una se aparta: algo pasó al medir.', { luz: [2], nota: { 2: 'sospechosa' } }],
        ['Si solo se hubiera medido esa, el error no se vería.', { luz: [2] }],
        ['Con muchos datos se usa el promedio, revisando los raros.', {}],
      ], 'Una sola medida no muestra su error; varias, sí.'),
      xpHaz('hoja', 'Subraya la medida que habría que **repetir**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['21.2 °C'], ['12.1 °C'], ['21.0 °C'], ['21.3 °C']], pista: 'Esa se parece a las otras. Busca la que se aparta.' }, 'Parece que cambiaron las cifras de lugar.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Con 10, 20 y 30 g de abono la planta creció 4, 7 y 7 cm. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A más abono, siempre crece más.'], ['De 20 a 30 g no creció más.'], ['Con 40 g va a morir.']], pista: 'Esa no cuadra con los tres datos o habla de algo que no se probó.' }, 'De 20 a 30 g siguió en 7 cm: eso dicen los datos.')],
  ], 'Lee la tendencia, no concluyas de más y repite para ver el error.');
}
;
//#archivo js/explora-icf-cn-2.js
// Preicfes · Ciencias Naturales, mundo 2 «Célula y Organismos» (Explora, escenas «hoja» y «dibujo»). Ejemplos propios.
{
  // Célula con puntos de soluto adentro y afuera; r es su tamaño y f la flecha del agua (1 entra, −1 sale).
  const AD = [[150, 90], [175, 110], [195, 85], [165, 125], [185, 130], [150, 110]], AF = [[40, 50], [60, 140], [300, 60], [280, 145], [50, 95], [310, 105], [90, 40], [255, 35]];
  const celula = (v, K) => K.r(20, 20, 300, 160, 'fn', 8) + K.c(170, 105, v.r, 'fa') + AD.slice(0, Math.round(v.d)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + AF.slice(0, Math.round(v.a)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + (v.f > 0.5 ? K.ar(62, 105, 105, 105, 'lg gr') + K.ar(278, 105, 235, 105, 'lg gr') : v.f < -0.5 ? K.ar(105, 105, 62, 105, 'lg gr') + K.ar(235, 105, 278, 105, 'lg gr') : '') + K.t(170, 198, v.t || '', 's ta');
  // Curva: valores en cuatro horas, con un nivel normal punteado.
  const curva = (v, K) => { const X = i => 60 + i * 78, Y = q => 170 - q * 0.55; return K.l(50, 170, 320, 170, 'lm') + K.l(50, 20, 50, 170, 'lm') + K.l(50, Y(90), 320, Y(90), 'lg d') + K.t(318, Y(90) + 14, 'normal', 's tg', 'end') + K.pl(v.q.slice(0, v.n).map((q, i) => [X(i), Y(q)]), 'la gr') + v.q.slice(0, v.n).map((q, i) => K.c(X(i), Y(q), 5, 'fA') + K.t(X(i), Y(q) - 10, q, 's')).join('') + ['0 h', '1 h', '2 h', '3 h'].map((t, i) => K.t(X(i), 188, t, 's tm')).join(''); };

  xpLec('icf-cn-celula-1', [
    ['El agua busca lo salado',
      xpMira('dibujo', 'Empecemos por la idea: por la membrana pasa el **agua**, casi no la sal.', { dib: celula, v: { r: 52, d: 5, a: 2, f: 0, t: '' }, alto: 206 }, [
        ['Los puntos son sal disuelta: hay más adentro.', { t: 'más sal adentro' }],
        ['El agua va hacia donde hay más sal: entra.', { f: 1, t: 'el agua entra' }],
        ['La célula se hincha.', { r: 64, f: 0, t: '' }],
        ['Ahora hay más sal afuera.', { r: 52, a: 8, d: 3, t: 'más sal afuera' }],
        ['El agua sale y la célula se encoge: eso es la ósmosis.', { f: -1, r: 40, t: 'el agua sale' }],
      ], 'Ósmosis: el agua va hacia donde hay más sustancia disuelta.'),
      xpHaz('hoja', '¿Dónde **entra** agua a la célula? Subraya los dos casos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Fríjol seco en agua pura'], ['Pepino en sal'], ['Ciruela pasa en agua'], ['Carne salada']], pista: 'En alguna hay más sal afuera que adentro.' }, 'En agua pura hay más soluto dentro: entra.')],
    ['A favor o en contra',
      xpMira('hoja', 'Segunda idea: ir **a favor** no gasta energía; ir **en contra**, sí.', { paras: [['Oxígeno: de donde hay mucho a donde hay poco.'], ['Agua: hacia donde hay más sal.'], ['Una raíz mete un mineral que ya tiene en abundancia.'], ['Una célula saca sodio hacia donde hay más.']] }, [
        ['De mucho a poco: solo. Es difusión.', { luz: [0], nota: { 0: 'sin gasto' } }],
        ['La ósmosis tampoco gasta.', { luz: [1], nota: { 1: 'sin gasto' } }],
        ['De poco a mucho, en contra: cuesta.', { luz: [2], nota: { 2: 'con gasto' } }],
        ['Es como subir agua con una bomba: transporte activo.', { luz: [3], nota: { 3: 'con gasto' } }],
        ['Si la célula se queda sin energía, esto se detiene.', { luz: [2, 3] }],
      ], 'A favor es gratis; en contra hace falta energía.'),
      xpHaz('hoja', 'Subraya el caso que **gasta** energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Perfume que se riega por el cuarto'], ['Célula que mete yodo donde ya hay más'], ['Agua que entra a una pasa']], pista: 'Esa va de más a menos, o es ósmosis.' }, 'Meter donde ya hay más va en contra.')],
    ['Con pared o sin pared',
      xpMira('dibujo', 'Tercera idea: la **pared** de las plantas evita que la célula reviente.', { dib: (v, K) => K.f(v.p, K.r(100, 35, 140, 140, 'fc', 10)) + celula(v, K), v: { r: 48, d: 5, a: 1, f: 1, t: '', p: 0 }, alto: 206 }, [
        ['Un glóbulo rojo en agua destilada.', { t: 'glóbulo rojo' }],
        ['Entra agua y se hincha…', { r: 68, t: 'se hincha' }],
        ['…hasta que puede romperse: no tiene pared.', { r: 74, t: 'puede romperse' }],
        ['Una célula vegetal sí la tiene.', { r: 50, p: 1, t: 'célula vegetal' }],
        ['Se llena hasta donde la pared deja y queda rígida.', { r: 66, t: 'rígida' }],
      ], 'Con pared, la célula se pone rígida; sin ella, puede reventar.'),
      xpHaz('hoja', 'Pon al margen lo que le pasa a cada una en agua pura.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['puede romperse', 'queda rígida'], meta: [1, 0], paras: [['Célula de tomate'], ['Glóbulo rojo']], pista: '¿Cuál de las dos tiene pared?' }, 'El tomate tiene pared; el glóbulo, no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Riegan una planta con agua muy salada. Subraya lo que ocurre.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las raíces se llenan de agua.'], ['La pared desaparece.'], ['Sale agua de las raíces y se marchita.']], pista: '¿Dónde quedó más sal: en el suelo o en la raíz?' }, 'Hay más sal afuera: el agua sale.')],
  ], 'El agua va a lo salado, en contra cuesta energía y la pared protege.');

  xpLec('icf-cn-celula-2', [
    ['Volver al equilibrio',
      xpMira('dibujo', 'Empecemos por la idea: **homeostasis** es mantener el interior estable.', { dib: curva, v: { q: [90, 150, 110, 92], n: 1 }, alto: 200 }, [
        ['Azúcar en la sangre antes de comer: 90.', {}],
        ['Una hora después de comer sube.', { n: 2 }],
        ['El cuerpo responde y empieza a bajar.', { n: 3 }],
        ['A las tres horas volvió cerca del comienzo.', { n: 4 }],
        ['No importa que suba: importa que vuelva.', {}],
      ], 'Homeostasis: ante un cambio, el cuerpo vuelve a su valor.'),
      xpHaz('hoja', 'Temperatura de tres personas tras correr, al inicio y una hora después. Subraya a quien **no** recuperó el equilibrio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['36.5 → 37.8 → 36.6'], ['36.6 → 38.9 → 38.7'], ['36.4 → 37.5 → 36.5']], pista: 'Esa volvió a su valor del comienzo.' }, 'B sigue en 38.7: no volvió.')],
    ['El cuerpo se avisa',
      xpMira('hoja', 'Segunda idea: hay un **aviso**, una **respuesta** y un **efecto**.', { paras: [['Hace frío.'], ['La piel avisa al cerebro.'], ['Los músculos tiemblan.'], ['El cuerpo se calienta.']] }, [
        ['Primero ocurre un cambio: hace frío.', { luz: [0], nota: { 0: 'cambio' } }],
        ['Algo lo detecta y avisa.', { luz: [1], nota: { 1: 'aviso' } }],
        ['El cuerpo responde con un movimiento.', { luz: [2], nota: { 2: 'respuesta' } }],
        ['Y el efecto corrige el cambio.', { luz: [3], nota: { 3: 'efecto' } }],
        ['Con el azúcar es igual: páncreas, insulina y células.', {}],
      ], 'Cambio, aviso, respuesta y efecto que lo corrige.'),
      xpHaz('hoja', 'Hace mucho calor. Pon al margen cada parte.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['respuesta', 'efecto', 'aviso'], meta: [2, 0, 1], paras: [['La piel detecta el calor.'], ['Las glándulas sudan.'], ['El cuerpo se enfría.']], pista: 'Alguno no va ahí: ¿detecta, actúa o corrige?' }, 'Detectar, sudar y enfriarse.')],
    ['Nadie trabaja solo',
      xpMira('hoja', 'Tercera idea: los sistemas **dependen** unos de otros.', { paras: [['Digestivo: rompe el alimento.'], ['Circulatorio: lo reparte.'], ['Respiratorio: trae oxígeno y saca CO₂.'], ['Excretor: filtra desechos.']] }, [
        ['El digestivo deja la comida en moléculas pequeñas.', { luz: [0], nota: { 0: 'rompe' } }],
        ['Sin sangre que las lleve, no llegan a las células.', { luz: [1], nota: { 1: 'reparte' } }],
        ['Sin oxígeno, la célula no aprovecha bien la glucosa.', { luz: [2], nota: { 2: 'oxígeno' } }],
        ['Y los desechos salen por los riñones.', { luz: [3], nota: { 3: 'limpia' } }],
        ['Si uno falla, los demás lo sienten.', { luz: [0, 1, 2, 3] }],
      ], 'Romper, repartir, respirar y limpiar: un solo equipo.'),
      xpHaz('hoja', 'Subraya el sistema que **reparte** el oxígeno por el cuerpo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Respiratorio'], ['Circulatorio'], ['Excretor']], pista: 'Ese lo toma del aire o limpia: ¿quién lo lleva?' }, 'Uno lo toma del aire y el otro lo reparte.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Al subir una montaña alta hay menos oxígeno y el corazón se acelera. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Así llega más oxígeno por minuto a las células.'], ['El corazón fabrica oxígeno.'], ['Con el frío se contrae.']], pista: '¿Qué gana el cuerpo si la sangre pasa más veces?' }, 'Más vueltas de sangre compensan el poco oxígeno.')],
  ], 'Vuelve al equilibrio, se avisa y trabaja en equipo.');

  xpLec('icf-cn-celula-3', [
    ['Copiar la receta',
      xpMira('hoja', 'Empecemos por la idea: el ADN no sale del núcleo; sale una **copia**.', { letras: ['ADN', 'ARN'], paras: [['T', 'A', 'G', 'C'], ['A', 'U', 'C', 'G']] }, [
        ['Arriba, cuatro letras de ADN.', { luz: [0, 1, 2, 3] }],
        ['La T se copia como A.', { luz: [0, 4] }],
        ['La A se copia como U: el ARN no usa T.', { luz: [1, 5] }],
        ['La G se copia como C y la C como G.', { luz: [2, 3, 6, 7] }],
        ['La copia es el ARN mensajero: transcripción.', { luz: [4, 5, 6, 7], nota: { 1: 'copia' } }],
      ], 'Transcripción: A con U, T con A, G con C y C con G.'),
      xpHaz('fichas', 'ADN: A C T. Pon su ARN mensajero.', { slots: [0, 1, 2].map(i => ({ x: 90 + i * 80, y: 46, w: 56, et: ['A', 'C', 'T'][i] })), fichas: ['U', 'G', 'A', 'T', 'C'], meta: ['U', 'G', 'A'], alto: 96, pista: 'El ARN no tiene T.' }, 'A con U, C con G y T con A.')],
    ['Leer de tres en tres',
      xpMira('hoja', 'Segunda idea: el ribosoma lee **tripletas**, los codones.', { paras: [['AUG', 'GAA', 'GUA'], ['met', 'glu', 'val']] }, [
        ['Nueve letras de ARN son tres codones.', { luz: [0, 1, 2] }, '$9 \\div 3 = 3$'],
        ['Cada codón indica un aminoácido.', { luz: [0, 3] }],
        ['GAA indica ácido glutámico.', { luz: [1, 4] }],
        ['Y el codón GUA indica valina.', { luz: [2, 5] }],
        ['Unidos en fila forman la proteína: traducción.', { luz: [3, 4, 5], nota: { 1: 'proteína' } }],
      ], 'Tres letras, un codón; un codón, un aminoácido.'),
      xpHaz('fichas', 'Un ARN de 18 letras. Pon cuántos codones tiene y cuántos aminoácidos indica (sin contar señales de parada).', { slots: [{ x: 110, y: 46, w: 90, et: 'codones' }, { x: 230, y: 46, w: 90, et: 'aminoácidos' }], fichas: ['6', '6', '18', '9', '54'], meta: ['6', '6'], alto: 96, pista: 'Divide entre 3; hay un aminoácido por codón.' }, '$18 \\div 3 = 6$ y uno por cada codón.')],
    ['Cuando cambia una letra',
      xpMira('hoja', 'Tercera idea: una **mutación** puede no hacer nada o cambiarlo todo.', { paras: [['GAA → GAG', 'mismo aminoácido'], ['GAA → GUA', 'otro aminoácido'], ['UN SOL MÁS', 'UNS OLM ÁS']] }, [
        ['GAA y GAG indican lo mismo: la proteína no cambia.', { luz: [0, 1], nota: { 0: 'sin efecto' } }],
        ['GUA indica otro: puede cambiar.', { luz: [2, 3], nota: { 1: 'cambia uno' } }],
        ['Si se quita o agrega una letra, todo se corre.', { luz: [4], nota: { 2: 'se corre' } }],
        ['Como leer con los espacios mal puestos.', { luz: [5] }],
        ['Por eso quitar una suele ser peor que cambiar una.', {}],
      ], 'Cambiar una letra afecta un codón; quitar una, todos los que siguen.'),
      xpHaz('hoja', 'Subraya el cambio que **más** puede dañar la proteína.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cambiar GAA por GAG'], ['Quitar la segunda letra del gen'], ['Cambiar una letra del último codón']], pista: 'Ese afecta un solo codón.' }, 'Quitarla corre todos los grupos desde el comienzo.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'ADN: C T T. Pon su ARN y el aminoácido (GAA: glutámico, GUA: valina).', { slots: [{ x: 110, y: 46, w: 90, et: 'ARN' }, { x: 230, y: 46, w: 110, et: 'aminoácido' }], fichas: ['GAA', 'glutámico', 'GTT', 'valina', 'GUA'], meta: ['GAA', 'glutámico'], alto: 96, pista: 'C con G y T con A.' }, 'CTT se copia GAA, que indica ácido glutámico.')],
  ], 'Copiar, leer de a tres y cuidar las letras.');
}
;
//#archivo js/explora-icf-cn-3.js
// Preicfes · Ciencias Naturales, mundo 3 «Movimiento y Fuerzas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  // Gráfica posición contra tiempo: q son las posiciones de 0 a 4 s; n cuántas se ven.
  const X = t => 56 + t * 62, Y = q => 168 - q * 1.5;
  const pos = (v, K) => K.l(56, 168, 318, 168, 'lm') + K.l(56, 168, 56, 18, 'lm') + [0, 30, 60, 90].map(k => K.l(56, Y(k), 314, Y(k), 'ls') + K.t(48, Y(k) + 4, k, 's tm', 'end')).join('') + [0, 1, 2, 3, 4].map(t => K.t(X(t), 184, t, 's tm')).join('') + K.t(318, 200, 'segundos', 's tm', 'end') + K.t(60, 14, 'metros', 's tm', 'start') + K.pl(v.q.slice(0, v.n).map((q, t) => [X(t), Y(q)]), 'la gr') + v.q.slice(0, v.n).map((q, t) => K.c(X(t), Y(q), 5, 'fA')).join('') + K.t(190, 30, v.t || '', 'ta');
  // Caja con fuerzas hacia la derecha (d) y hacia la izquierda (i).
  const caja = (v, K) => K.l(20, 150, 320, 150, 'lm') + K.r(140, 100, 60, 50, 'fa', 4) + (v.d > 1 ? K.ar(200, 125, 200 + v.d, 125, 'lg gr') + K.t(204 + v.d / 2, 112, `${Math.round(v.d * 2)} N`, 's tg') : '') + (v.i > 1 ? K.ar(140, 125, 140 - v.i, 125, 'lf gr') + K.t(136 - v.i / 2, 112, `${Math.round(v.i * 2)} N`, 's tf') : '') + K.t(170, 40, v.t || '', 'ta') + K.t(170, 180, v.p || '', 's tm');
  // Torre: dos bolas que caen; y es la altura que han bajado (0 a 1).
  const torre = (v, K) => K.r(40, 30, 30, 140, 'fn', 2) + K.l(20, 172, 320, 172, 'lm') + K.c(120, 40 + v.y * 122, v.r1, 'fA') + K.c(210, 40 + v.z * 122, v.r2, 'fG') + K.t(120, 22, v.a || '', 's ta') + K.t(210, 22, v.b || '', 's tg') + K.t(170, 194, v.t || '', 's tm');

  xpLec('icf-cn-movimiento-1', [
    ['La gráfica cuenta un viaje',
      xpMira('dibujo', 'Empecemos por la idea: la gráfica muestra **dónde está** en cada momento.', { dib: pos, v: { q: [0, 20, 40, 60, 80], n: 1, t: '' }, alto: 206 }, [
        ['A los cero segundos está en cero.', {}],
        ['Cada segundo avanza 20 metros.', { n: 5 }, '$20 \\text{ m cada segundo}$'],
        ['Una recta: la velocidad no cambia.', { t: 'constante' }],
        ['Si se queda en 40, la línea es horizontal: está quieto.', { q: [0, 20, 40, 40, 40], t: 'quieto desde 2 s' }],
        ['Si baja, se devuelve.', { q: [0, 30, 60, 40, 20], t: 'se devuelve' }],
      ], 'Recta: velocidad constante. Horizontal: quieto. Baja: se devuelve.'),
      xpHaz('hoja', 'La posición fue 0, 10, 20, 20, 20 m. Subraya lo que pasó.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Avanzó todo el tiempo.'], ['Avanzó y luego se quedó quieto.'], ['Se devolvió.']], pista: 'Mira si los números cambian al final.' }, 'De 20 a 20 no cambia: quieto.')],
    ['Más rápido o más lento',
      xpMira('dibujo', 'Segunda idea: la **inclinación** es la velocidad.', { dib: pos, v: { q: [0, 10, 20, 30, 40], n: 5, t: '10 m/s' }, alto: 206 }, [
        ['Diez metros por segundo: poca inclinación.', {}],
        ['Veinte metros por segundo: más empinada.', { q: [0, 20, 40, 60, 80], t: '20 m/s' }],
        ['Si cada segundo avanza más, la línea se curva.', { q: [0, 5, 20, 45, 80], t: 'acelera' }],
        ['Avanza 5, 15, 25 y 35: gana 10 cada vez.', {}, '$15 - 5 = 25 - 15 = 10$'],
        ['Eso es acelerar: cambiar la velocidad.', {}],
      ], 'Velocidad: cuánto cambia la posición. Aceleración: cuánto cambia la velocidad.'),
      xpHaz('fichas', 'Un carro pasa de 12 a 20 m/s en 4 s. Pon cuánto cambió la velocidad y la aceleración.', { slots: [{ x: 110, y: 46, w: 90, et: 'cambio (m/s)' }, { x: 230, y: 46, w: 90, et: 'm/s cada s' }], fichas: ['8', '2', '32', '5', '3'], meta: ['8', '2'], alto: 96, pista: 'Resta las velocidades y reparte en 4 segundos.' }, '$20 - 12 = 8$ y $8 \\div 4 = 2$.')],
    ['Media y signo',
      xpMira('hoja', 'Tercera idea: la **media** mira todo el viaje y el **signo**, el sentido.', { paras: [['100 m en 20 s, parando dos veces.'], ['100 m en 20 s, sin parar.'], ['De 100 a 0 m en 20 s.']] }, [
        ['La media es toda la distancia entre todo el tiempo.', { luz: [0], nota: { 0: '5 m/s' } }, '$100 \\div 20 = 5$'],
        ['Sin parar da lo mismo.', { luz: [1], nota: { 1: '5 m/s' } }],
        ['Por eso la media no cuenta las paradas.', { luz: [0, 1] }],
        ['De regreso la velocidad es −5.', { luz: [2], nota: { 2: '−5 m/s' } }],
        ['El menos indica el sentido, no que vaya despacio.', {}],
      ], 'Media: total entre total. Signo: hacia dónde.'),
      xpHaz('fichas', 'Una ciclista hace 30 km en 2 horas, con una parada de media hora incluida. Pon su velocidad media y la que llevó mientras rodaba.', { slots: [{ x: 110, y: 46, w: 90, et: 'media (km/h)' }, { x: 230, y: 46, w: 90, et: 'rodando' }], fichas: ['15', '20', '12', '60', '17'], meta: ['15', '20'], alto: 96, pista: 'La media usa las 2 horas; rodando fue hora y media.' }, '$30 \\div 2 = 15$ y $30 \\div 1.5 = 20$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Dos gráficas de posición se cruzan a los 3 s. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A los 3 s están en el mismo lugar.'], ['A los 3 s van igual de rápido.'], ['Chocan y se detienen.']], pista: 'El eje vertical es la posición.' }, 'El cruce es la misma posición, no la misma velocidad.')],
  ], 'Lee el eje, mira la inclinación y separa media, signo y lugar.');

  xpLec('icf-cn-movimiento-2', [
    ['Juntar las fuerzas',
      xpMira('dibujo', 'Empecemos por la idea: importa la **fuerza neta**, la que resulta de juntar todas.', { dib: caja, v: { d: 30, i: 0, t: '', p: '' }, alto: 196 }, [
        ['Sesenta newtons hacia la derecha.', { t: 'neta: 60 N' }],
        ['El piso frena con veinte: se restan.', { i: 10, t: 'neta: 40 N' }, '$60 - 20 = 40$'],
        ['Si frena con sesenta, la neta es cero.', { i: 30, t: 'neta: 0 N' }, '$60 - 60 = 0$'],
        ['Con neta cero no cambia su movimiento.', { p: 'quieta sigue quieta; si iba, sigue igual' }],
        ['No quiere decir que no haya fuerzas.', {}],
      ], 'Mismo sentido se suma; contrario se resta. Neta cero: no cambia.'),
      xpHaz('dibujo', 'Empujan con 80 N a la derecha. Mueve el roce hasta que la neta sea **30 N**.', { dib: (v, K) => caja({ d: 40, i: v.r / 2, t: `neta: ${80 - v.r} N` }, K), v: { r: 10 }, metas: { r: 50 }, alto: 240, manijas: [{ k: 'r', min: 0, max: 80, paso: 10, et: 'roce (N)' }], lee: v => `$80 - ${v.r} = ${80 - v.r}$`, dice: () => 'El roce va en sentido contrario.' }, '$80 - 50 = 30$.')],
    ['Fuerza, masa y aceleración',
      xpMira('fichas', 'Segunda idea: la aceleración es la fuerza neta **repartida** en la masa.', { slots: [{ x: 70, y: 50, w: 90, et: '40 N, 10 kg' }, { x: 170, y: 50, w: 90, et: '80 N, 10 kg' }, { x: 270, y: 50, w: 90, et: '40 N, 20 kg' }], fichas: ['4', '8', '2'], alto: 100 }, [
        ['Cuarenta newtons sobre diez kilos.', { pon: { 0: '4' } }, '$40 \\div 10 = 4$'],
        ['El doble de fuerza: el doble de aceleración.', { pon: { 1: '8' } }, '$80 \\div 10 = 8$'],
        ['El doble de masa: la mitad.', { pon: { 2: '2' } }, '$40 \\div 20 = 2$'],
        ['Por eso un camión lleno arranca lento.', { marca: [2] }],
        ['Se escribe: fuerza neta igual a masa por aceleración.', { marca: [] }, '$F = m \\cdot a$'],
      ], 'Más fuerza, más aceleración; más masa, menos.'),
      xpHaz('fichas', 'Fuerza neta 90 N, masa 30 kg. Pon la aceleración, y la que habría con 60 kg.', { slots: [{ x: 110, y: 46, w: 90, et: 'con 30 kg' }, { x: 230, y: 46, w: 90, et: 'con 60 kg' }], fichas: ['3', '1.5', '6', '2 700', '60'], meta: ['3', '1.5'], alto: 96, pista: 'Divide la fuerza entre la masa.' }, '$90 \\div 30 = 3$ y $90 \\div 60 = 1.5$.')],
    ['Fuerzas por pares',
      xpMira('hoja', 'Tercera idea: si empujas algo, te **empuja** igual y al contrario.', { paras: [['El remo empuja el agua.', 'El agua empuja el bote.'], ['El pie empuja el suelo.', 'El suelo empuja el cuerpo.'], ['El cohete empuja el gas.', 'El gas empuja el cohete.']] }, [
        ['Empujas el agua y ella empuja el bote.', { luz: [0, 1], nota: { 0: 'par' } }],
        ['Caminar es que el suelo te empuje.', { luz: [2, 3], nota: { 1: 'par' } }],
        ['El cohete sube porque el gas lo empuja.', { luz: [4, 5], nota: { 2: 'par' } }],
        ['Son iguales y contrarias.', {}],
        ['No se anulan: actúan sobre objetos distintos.', { luz: [0, 1] }],
      ], 'Acción y reacción: iguales, contrarias y sobre cuerpos distintos.'),
      xpHaz('hoja', 'Pateas un balón. Subraya la **pareja** de esa fuerza.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El peso del balón'], ['El balón empuja tu pie'], ['El roce del pasto']], pista: 'Debe ser entre los mismos dos: pie y balón.' }, 'Pie y balón se empujan mutuamente.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un tren va recto a 70 km/h sin cambiar. Subraya lo cierto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['No actúa ninguna fuerza.'], ['La del motor es mayor que el roce.'], ['Las fuerzas se equilibran: la neta es cero.']], pista: 'Su movimiento no cambia. ¿Qué dice eso de la neta?' }, 'Velocidad constante: neta cero, aunque haya fuerzas.')],
  ], 'Junta las fuerzas, reparte en la masa y busca la pareja.');

  xpLec('icf-cn-movimiento-3', [
    ['Caer igual',
      xpMira('dibujo', 'Empecemos por la idea: sin aire, **todo cae igual**.', { dib: torre, v: { y: 0, z: 0, r1: 9, r2: 14, a: '1 kg', b: '3 kg', t: '' }, alto: 202 }, [
        ['Dos bolas de masa distinta.', {}],
        ['Se sueltan al tiempo…', { y: 0.5, z: 0.5 }],
        ['…y llegan al tiempo.', { y: 1, z: 1, t: 'llegan juntas' }],
        ['Cada segundo ganan unos 10 m/s.', { t: '10, 20, 30 m/s' }, '$10 \\to 20 \\to 30$'],
        ['En el aire una pluma se demora: el aire la frena.', { t: '' }],
      ], 'Sin aire, la masa no cambia la caída: unos 10 m/s más cada segundo.'),
      xpHaz('fichas', 'Se suelta una piedra. Pon su velocidad a los 2 y a los 5 segundos (10 m/s más cada segundo).', { slots: [{ x: 110, y: 46, w: 90, et: 'a los 2 s' }, { x: 230, y: 46, w: 90, et: 'a los 5 s' }], fichas: ['20', '50', '10', '12', '25'], meta: ['20', '50'], alto: 96, pista: 'Empieza en cero y gana 10 en cada segundo.' }, '$2 \\cdot 10$ y $5 \\cdot 10$.')],
    ['Masa y peso',
      xpMira('hoja', 'Segunda idea: la **masa** es materia; el **peso**, la fuerza con que te atraen.', { paras: [['Tierra: masa 60 kg', 'peso 600 N'], ['Luna: masa 60 kg', 'peso 100 N'], ['Lejos de todo: masa 60 kg', 'peso casi 0 N']] }, [
        ['En la Tierra, 60 kilos y 600 newtons.', { luz: [0, 1] }, '$60 \\cdot 10 = 600$'],
        ['En la Luna, la misma masa.', { luz: [2], nota: { 1: 'igual masa' } }],
        ['Pero pesa seis veces menos.', { luz: [3] }],
        ['Lejos de todo, la masa sigue ahí.', { luz: [4, 5], nota: { 2: 'igual masa' } }],
        ['Kilogramos para masa; newtons para peso.', {}],
      ], 'La masa no cambia de lugar a lugar; el peso, sí.'),
      xpHaz('fichas', 'Una roca de 12 kg pesa 120 N en la Tierra. En la Luna, pon su masa y su peso.', { slots: [{ x: 110, y: 46, w: 90, et: 'masa (kg)' }, { x: 230, y: 46, w: 90, et: 'peso (N)' }], fichas: ['12', '20', '2', '120', '720'], meta: ['12', '20'], alto: 96, pista: 'La masa no cambia; el peso es la sexta parte.' }, 'Masa 12 kg y peso $120 \\div 6 = 20$ N.')],
    ['Orbitar es caer',
      xpMira('hoja', 'Tercera idea: una **órbita** es caer mientras se avanza de lado.', { paras: [['Lanzas una bola: cae cerca.'], ['Más rápido: cae más lejos.'], ['Muy rápido: cae siguiendo la curva de la Tierra.'], ['Nunca llega al suelo.']] }, [
        ['Toda bola lanzada cae.', { luz: [0], nota: { 0: 'despacio' } }],
        ['Con más velocidad llega más lejos.', { luz: [1], nota: { 1: 'más rápido' } }],
        ['Si va muy rápido, el suelo se curva al mismo ritmo.', { luz: [2], nota: { 2: 'órbita' } }],
        ['Cae siempre, pero no llega.', { luz: [3] }],
        ['Por eso flotan los astronautas: caen con su nave.', {}],
      ], 'La Luna sí cae: cae alrededor de la Tierra.'),
      xpHaz('hoja', '¿Por qué flota una astronauta en la estación? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Allá no hay gravedad.'], ['No tiene masa.'], ['Cae junto con la estación.']], pista: 'La gravedad llega hasta allá y la masa no se pierde.' }, 'Ella y la estación caen a la vez.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se sueltan al tiempo, en el vacío, un tornillo y un papel. Subraya lo que ocurre.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Llegan al tiempo.'], ['Llega antes el tornillo.'], ['El papel flota.']], pista: 'En el vacío no hay aire que frene al papel.' }, 'Sin aire, caen igual.')],
  ], 'Caer igual, pesar distinto y orbitar cayendo.');
}
;
//#archivo js/explora-icf-cn-4.js
// Preicfes · Ciencias Naturales, mundo 4 «Materia y Mezclas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Doce partículas que se separan: s de 0 (sólido) a 1 (gas).
  const PX = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]], GX = [[78, 44], [150, 36], [224, 50], [262, 92], [84, 104], [140, 82], [196, 100], [250, 140], [74, 152], [124, 136], [178, 150], [222, 156]], LX = [[70, 160], [104, 158], [138, 161], [172, 158], [206, 160], [240, 159], [268, 150], [86, 136], [120, 132], [156, 135], [192, 133], [228, 136]];
  const part = (v, K) => K.r(56, 24, 228, 148, 'fn', 8) + PX.map(([i, j], k) => { const S = [119 + i * 34, 94 + j * 32], A = v.s <= 1 ? S : LX[k], B = v.s <= 1 ? LX[k] : GX[k], f = v.s <= 1 ? v.s : v.s - 1; return K.c(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 10, 'fA'); }).join('') + K.t(170, 194, v.t || '', 'ta');
  // Temperatura contra tiempo; n: tramos que se ven.
  const CUR = [[40, 150], [70, 128], [130, 128], [190, 56], [290, 56]];
  const curva = (v, K) => K.l(40, 166, 320, 166, 'lm') + K.l(40, 166, 40, 24, 'lm') + K.t(32, 132, '0', 's tm', 'end') + K.t(32, 60, '100', 's tm', 'end') + K.t(44, 16, '°C', 's tm', 'start') + K.t(318, 184, 'tiempo', 's tm', 'end') + K.pl(CUR.slice(0, Math.round(v.n) + 1), 'la gr') + K.t(190, 36, v.t || '', 'ta');
  // Vaso con soluto: d disueltos (puntos) y q en el fondo.
  const vaso = (v, K) => K.r(100, 40, 140, 120, 'fn', 6) + Array.from({ length: Math.round(v.d) }, (_, i) => K.c(116 + (i * 37) % 112, 54 + (i * 23) % 80, 4, 'fA')).join('') + Array.from({ length: Math.round(v.q) }, (_, i) => K.r(108 + i * 12, 148, 9, 9, 'fF', 1)).join('') + K.t(170, 186, v.t || '', 'ta') + K.t(170, 24, v.p || '', 's tm');

  xpLec('icf-cn-materia-1', [
    ['Partículas',
      xpMira('dibujo', 'Empecemos por la idea: los estados se distinguen por **cómo se mueven** las partículas.', { dib: part, v: { s: 0, t: '' }, alto: 204 }, [
        ['En un sólido vibran en su sitio, muy juntas.', { t: 'sólido' }],
        ['Al calentar se sueltan y se deslizan.', { s: 1, t: 'líquido' }],
        ['Con más energía se separan del todo.', { s: 2, t: 'gas' }],
        ['Son las mismas doce: ni crecen ni desaparecen.', {}],
        ['Al enfriar, vuelven a juntarse.', { s: 1, t: 'líquido' }],
      ], 'Cambia el movimiento y la distancia; no las partículas.'),
      xpHaz('hoja', 'El vapor toca una tapa fría y salen gotas. Subraya lo que les pasa a sus partículas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Encogen.'], ['Se vuelven otras.'], ['Se juntan y se deslizan.']], pista: 'Siguen siendo las mismas.' }, 'Al enfriar se juntan; siguen siendo agua.')],
    ['El tramo plano',
      xpMira('dibujo', 'Segunda idea: mientras **cambia de estado**, la temperatura no sube.', { dib: curva, v: { n: 0, t: '' }, alto: 192 }, [
        ['El hielo se calienta hasta llegar a 0 °C.', { n: 1, t: 'hielo' }],
        ['Se derrite: la línea queda plana.', { n: 2, t: 'hielo y agua: 0 °C' }],
        ['Ya todo es agua: sube otra vez.', { n: 3, t: 'agua' }],
        ['Hierve: otra vez plana, a nivel del mar a 100.', { n: 4, t: 'agua y vapor: 100 °C' }],
        ['Ahí la energía vence las fuerzas entre partículas, no calienta.', {}],
        ['En la montaña hierve antes: el aire presiona menos.', {}],
      ], 'Plano: cambio de estado. A menor presión, hierve a menos.'),
      xpHaz('hoja', 'En una mezcla de hielo y agua a 0 °C se enciende la llama. Subraya qué pasa primero.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sube a 10 °C.'], ['Sigue a 0 °C mientras haya hielo.'], ['Hierve.']], pista: 'Todavía hay hielo por derretir.' }, 'La energía derrite el hielo antes de calentar.')],
    ['Densidad',
      xpMira('fichas', 'Tercera idea: la **densidad** dice cuánta masa hay en cada unidad de volumen.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.5', 'flota', '4'], alto: 96 }, [
        ['Un corcho de 10 gramos ocupa 20 centímetros cúbicos.', {}],
        ['Se reparte la masa entre el volumen.', { pon: { 0: '0.5' } }, '$10 \\div 20 = 0.5$'],
        ['El agua tiene 1: el corcho es menos denso.', { pon: { 1: 'flota' } }],
        ['Pesar mucho no es hundirse: un tronco flota.', {}],
        ['Importa la masa comparada con el volumen.', {}],
      ], 'Densidad: masa entre volumen. Lo menos denso flota.'),
      xpHaz('fichas', 'Un bloque de 120 g ocupa 150 cm³. Pon su densidad y lo que hace en el agua.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.8', 'flota', '1.25', 'se hunde', '30'], meta: ['0.8', 'flota'], alto: 96, pista: 'Masa entre volumen, y compara con 1.' }, '$120 \\div 150 = 0.8$, menos que 1: flota.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En un páramo, unos fríjoles tardan más en ablandarse en olla abierta. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El agua hierve a menor temperatura.'], ['El agua no hierve.'], ['Los fríjoles son más densos.']], pista: 'Allá el aire presiona menos.' }, 'Hierve antes de llegar a 100: cocina más frío.')],
  ], 'Partículas, tramos planos, presión y densidad.');

  xpLec('icf-cn-materia-2', [
    ['Mezcla o compuesto',
      xpMira('hoja', 'Empecemos por la idea: en una **mezcla** cada sustancia sigue siendo ella.', { letras: ['A', 'B', 'C'], paras: [['Limonada: agua, limón y azúcar.'], ['Agua: hidrógeno y oxígeno unidos.'], ['Granola: avena, pasas y nueces.']] }, [
        ['En la limonada cada cosa conserva su sabor.', { luz: [0], nota: { 0: 'mezcla' } }],
        ['En el agua hay dos elementos unidos en algo nuevo.', { luz: [1], nota: { 1: 'compuesto' } }],
        ['En la granola hasta se ven las partes.', { luz: [2], nota: { 2: 'mezcla' } }],
        ['Si se ve pareja es homogénea; si no, heterogénea.', { luz: [0, 2] }],
        ['Un compuesto no se separa con un colador.', { luz: [1] }],
      ], 'Mezcla: juntas. Compuesto: unidas. Homogénea: pareja.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['heterogénea', 'compuesto', 'homogénea'], meta: [2, 0, 1], paras: [['Agua con azúcar disuelta'], ['Agua con piedras'], ['Óxido de hierro']], pista: 'Alguna no va ahí: ¿pareja, con partes o unida en algo nuevo?' }, 'Pareja, con partes y unida.')],
    ['Busca la diferencia',
      xpMira('hoja', 'Segunda idea: para separar, busca **en qué se diferencian**.', { paras: [['Clavos y arena'], ['Arroz y agua'], ['Aceite y vinagre'], ['Agua y sal']] }, [
        ['Los clavos se pegan al imán.', { luz: [0], nota: { 0: 'imán' } }],
        ['El arroz no pasa por el colador.', { luz: [1], nota: { 1: 'filtrar' } }],
        ['El aceite flota: se saca por arriba.', { luz: [2], nota: { 2: 'decantar' } }],
        ['La sal no se evapora: queda al hervir.', { luz: [3], nota: { 3: 'evaporar' } }],
        ['Si quieres el agua, enfría el vapor: destilar.', { luz: [3] }],
      ], 'Imán, filtro, decantar, evaporar o destilar: según la diferencia.'),
      xpHaz('hoja', 'Pon al margen el método.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['destilar', 'imán', 'filtrar'], meta: [2, 0, 1], paras: [['Hojas de té en agua'], ['Alcohol y agua'], ['Virutas de hierro y aserrín']], pista: 'Alguna no va ahí: ¿granos, hervor distinto o hierro?' }, 'Las hojas se filtran, los líquidos se destilan y el hierro se atrae.')],
    ['El orden y la masa',
      xpMira('fichas', 'Tercera idea: **la masa se conserva** y el porcentaje es sobre todo.', { slots: fila('mezcla (g)', 'sal (%)'), fichas: ['250', '20'], alto: 96 }, [
        ['Se juntan 200 gramos de agua y 50 de sal.', {}],
        ['La mezcla pesa la suma de las dos.', { pon: { 0: '250' } }, '$200 + 50 = 250$'],
        ['Cincuenta de doscientos cincuenta son un quinto.', { pon: { 1: '20' } }, '$50 \\div 250 = 0.2$'],
        ['No se divide entre el agua: se divide entre todo.', { marca: [0] }],
        ['Al separarlas vuelven a salir 200 y 50.', { marca: [] }],
      ], 'Nada se pierde; el porcentaje va sobre el total.'),
      xpHaz('fichas', 'Se mezclan 90 g de agua y 30 g de azúcar. Pon la masa y el porcentaje de azúcar.', { slots: fila('mezcla (g)', 'azúcar (%)'), fichas: ['120', '25', '33', '60', '30'], meta: ['120', '25'], alto: 96, pista: 'El total incluye el azúcar.' }, '$30 \\div 120 = 0.25$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Hay que separar hierro, azúcar y agua y recuperar las tres. Subraya el orden que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Imán y luego filtro'], ['Imán y luego destilar'], ['Filtro y luego filtro']], pista: 'El azúcar disuelta pasa por el filtro.' }, 'El imán saca el hierro; destilar separa el agua del azúcar.')],
  ], 'Distingue, busca la diferencia y cuida la masa.');

  xpLec('icf-cn-materia-3', [
    ['Hasta cuánto cabe',
      xpMira('dibujo', 'Empecemos por la idea: la **solubilidad** es lo máximo que cabe disuelto.', { dib: vaso, v: { d: 0, q: 0, t: '', p: 'caben 24 a 20 °C' }, alto: 200 }, [
        ['Con 12 gramos, se disuelve todo.', { d: 12, t: 'insaturada' }],
        ['Con 24 gramos está justo en el límite.', { d: 24, t: 'saturada' }],
        ['Con 30 gramos, 6 se quedan en el fondo.', { q: 6, t: 'saturada y sobran 6' }, '$30 - 24 = 6$'],
        ['Disolver no es derretir: el agua lo rodea y lo reparte.', {}],
        ['Y la masa es la del agua más la del soluto.', {}],
      ], 'Menos del límite: insaturada. En el límite: saturada. Lo demás, al fondo.'),
      xpHaz('fichas', 'En 100 g de agua caben 35 g. Se echan 50 g. Pon lo disuelto y lo que queda en el fondo.', { slots: fila('disuelto', 'en el fondo'), fichas: ['35', '15', '50', '85', '0'], meta: ['35', '15'], alto: 96, pista: 'Se disuelve hasta el límite.' }, '$50 - 35 = 15$.')],
    ['Más rápido o más',
      xpMira('dibujo', 'Segunda idea: agitar **apura**; calentar, en muchos sólidos, hace que **quepa más**.', { dib: vaso, v: { d: 24, q: 6, t: '', p: '20 °C' }, alto: 200 }, [
        ['Hay 6 gramos en el fondo.', { t: 'sobran 6' }],
        ['Se agita: se disuelve más rápido, pero no más.', { t: 'agitar: siguen sobrando 6' }],
        ['Se calienta a 60 grados: ahora caben más.', { d: 30, q: 0, t: 'se disolvió todo', p: '60 °C' }],
        ['También cabría más con más agua.', {}],
        ['Con la sal de cocina, calentar casi no ayuda.', {}],
      ], 'Agitar y moler apuran. Calentar o agregar agua: cabe más.'),
      xpHaz('hoja', 'Pon al margen qué logra cada acción con un sólido como el azúcar.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['cabe más', 'más rápido'], meta: [1, 0], paras: [['Moler los granos'], ['Duplicar el agua']], pista: 'Mira si al final se disuelve más.' }, 'Moler apura; con más agua cabe más.')],
    ['Gases y semejantes',
      xpMira('hoja', 'Tercera idea: con los **gases** es al revés, y no todo disuelve a todo.', { paras: [['Oxígeno en agua fría: 11 mg por litro'], ['Oxígeno en agua tibia: 7.5 mg por litro'], ['Aceite en agua: no se disuelve'], ['Grasa en gasolina: se disuelve']] }, [
        ['En agua fría cabe más oxígeno.', { luz: [0] }],
        ['En agua tibia cabe menos: el gas se escapa.', { luz: [1], nota: { 1: 'menos gas' } }],
        ['El agua no disuelve el aceite.', { luz: [2], nota: { 2: 'distintos' } }],
        ['La gasolina sí disuelve la grasa.', { luz: [3], nota: { 3: 'semejantes' } }],
        ['Lo semejante disuelve a lo semejante.', { luz: [3] }],
      ], 'Más calor, menos gas. Lo semejante disuelve a lo semejante.'),
      xpHaz('hoja', 'Una fábrica vierte agua caliente, sin químicos, a un río y los peces sufren. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El agua caliente tiene más oxígeno.'], ['El agua caliente disuelve a los peces.'], ['En agua más caliente cabe menos oxígeno.']], pista: 'Con los gases es al revés.' }, 'Al calentarse, el río pierde oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En 100 g de agua caben 40 g a 20 °C y 70 g a 60 °C. Se disuelven 70 g a 60 °C y se enfría con un cristal. Pon lo disuelto y lo que se cristaliza.', { slots: fila('disuelto', 'cristales'), fichas: ['40', '30', '70', '110', '20'], meta: ['40', '30'], alto: 96, pista: 'A 20 °C solo caben los de esa temperatura.' }, '$70 - 40 = 30$ se cristalizan.')],
  ], 'Hasta cuánto, qué apura, qué aumenta y qué pasa con los gases.');
}
;
//#archivo js/explora-icf-cn-5.js
// Preicfes · Ciencias Naturales, mundo 5 «Ecosistemas y Energía» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cadena de cuatro círculos con n flechas.
  const NOM = ['pasto', 'saltamontes', 'sapo', 'culebra'];
  const cadena = (v, K) => NOM.map((s, i) => K.c(50 + i * 80, 80, 24, ['fa', 'fg', 'ff', 'fF'][i]) + K.t(50 + i * 80, 126, s, 's') + (i < 3 ? K.f(v.n - i, K.ar(76 + i * 80, 80, 104 + i * 80, 80, 'lg gr')) : '')).join('') + K.t(170, 30, v.t || '', 'ta') + K.f(v.h, K.c(170, 170, 18, 'fn') + K.t(170, 202, 'hongos y bacterias', 's tm') + [0, 1, 2, 3].map(i => K.l(50 + i * 80, 132, 170 + (i - 1.5) * 12, 154, 'lm')).join(''));
  // Pirámide: niveles de ancho proporcional a la raíz para que se vean.
  const pir = (v, K) => [0, 1, 2, 3].map(i => K.f(v.n - i, K.r(170 - [150, 100, 60, 26][i], 140 - i * 34, 2 * [150, 100, 60, 26][i], 32, ['fa', 'fg', 'ff', 'fF'][i], 2) + K.t(170, 161 - i * 34, v.k[i], 's'))).join('') + K.t(170, 190, v.t || '', 'ta');
  // Dos curvas: presas y depredadores.
  const A = [30, 80, 120, 70, 30, 60, 115], B = [20, 25, 55, 80, 45, 20, 40];
  const olas = (v, K) => { const X = i => 46 + i * 44, Y = y => 150 - y; return K.l(46, 150, 318, 150, 'lm') + K.l(46, 150, 46, 20, 'lm') + K.pl(A.slice(0, Math.round(v.a) + 1).map((y, i) => [X(i), Y(y)]), 'la gr') + K.pl(B.slice(0, Math.round(v.b) + 1).map((y, i) => [X(i), Y(y)]), 'lf gr') + K.t(60, 14, 'presas', 's ta', 'start') + K.t(120, 14, 'depredadores', 's tf', 'start') + K.t(318, 168, 'años', 's tm', 'end') + K.t(182, 186, v.t || '', 's tm'); };

  xpLec('icf-cn-ecosistemas-1', [
    ['La cadena',
      xpMira('dibujo', 'Empecemos por la idea: la flecha va **hacia quien come**.', { dib: cadena, v: { n: 0, h: 0, t: '' }, alto: 214 }, [
        ['El pasto fabrica su alimento con luz: productor.', { t: 'productor' }],
        ['El saltamontes come pasto: consumidor primario.', { n: 1, t: 'primario' }],
        ['El sapo come saltamontes: secundario.', { n: 2, t: 'secundario' }],
        ['La culebra come sapos: terciaria.', { n: 3, t: 'terciaria' }],
        ['Los descomponedores reciben de todos.', { h: 1, t: '' }],
      ], 'Productor, primario, secundario, terciario; y descomponedores para todos.'),
      xpHaz('hoja', 'Maíz → gallina → zorro. Pon al margen el nivel.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['secundario', 'productor', 'primario'], meta: [2, 0, 1], paras: [['Gallina'], ['Zorro'], ['Maíz']], pista: 'Alguna no va ahí: empieza por quien usa la luz.' }, 'El maíz produce, la gallina es primaria y el zorro, secundario.')],
    ['La décima parte',
      xpMira('dibujo', 'Segunda idea: de un nivel al otro pasa **cerca de la décima parte** de la energía.', { dib: pir, v: { n: 1, k: ['20 000', '2 000', '200', '20'], t: '' }, alto: 200 }, [
        ['Las plantas guardan veinte mil.', { t: 'productores' }],
        ['A los primarios pasan dos mil.', { n: 2 }, '$20\\,000 \\div 10 = 2\\,000$'],
        ['A los secundarios, doscientos.', { n: 3 }, '$2\\,000 \\div 10 = 200$'],
        ['Y a los terciarios, solo veinte.', { n: 4 }, '$200 \\div 10 = 20$'],
        ['Lo demás se va como calor o no se come.', { t: 'por eso hay pocos arriba' }],
      ], 'Cada paso, cerca del 10 %: por eso arriba hay pocos.'),
      xpHaz('fichas', 'Los productores tienen 9 000. Pon lo que llega a primarios y a secundarios.', { slots: fila('primarios', 'secundarios'), fichas: ['900', '90', '4500', '9', '8100'], meta: ['900', '90'], alto: 96, pista: 'Saca la décima parte y otra vez la décima parte.' }, '$9\\,000 \\div 10 = 900$ y $900 \\div 10 = 90$.')],
    ['Mover un eslabón',
      xpMira('hoja', 'Tercera idea: si cambia un eslabón, **se mueve la red**.', { paras: [['pasto → saltamontes → sapo → culebra'], ['Se acaban los sapos.'], ['Suben los saltamontes.'], ['Baja el pasto y bajan las culebras.']] }, [
        ['Esta es la cadena de antes.', { luz: [0] }],
        ['Una enfermedad acaba con los sapos.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Sin quien los coma, suben los saltamontes.', { luz: [2], nota: { 2: 'suben' } }],
        ['Comen más pasto: el pasto baja.', { luz: [3] }],
        ['Y la culebra pierde su comida: también baja.', { luz: [3], nota: { 3: 'bajan' } }],
      ], 'Mira quién lo comía y a quién se comía.'),
      xpHaz('hoja', 'Algas → camarón → pez. Se pesca casi todo el pez. Subraya lo que pasa primero con el **camarón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumenta'], ['Disminuye'], ['Se vuelve productor']], pista: '¿Quién se lo comía?' }, 'Sin su depredador, aumenta.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A un consumidor secundario le llegan 60 kcal. Si en cada paso pasa la décima parte, pon las del primario y las de los productores.', { slots: fila('primario', 'productores'), fichas: ['600', '6000', '6', '0.6', '120'], meta: ['600', '6000'], alto: 96, pista: 'Ahora vas hacia abajo: multiplica por diez.' }, '$60 \\cdot 10 = 600$ y $600 \\cdot 10 = 6\\,000$.')],
  ], 'La flecha, la décima parte y la red que se mueve.');

  xpLec('icf-cn-ecosistemas-2', [
    ['El carbono',
      xpMira('hoja', 'Empecemos por la idea: el **carbono** va del aire a los seres vivos y vuelve.', { paras: [['Aire: dióxido de carbono'], ['Planta: lo toma y hace azúcar'], ['Animal: come azúcar y respira'], ['Fuego: quema leña o gasolina']] }, [
        ['El carbono está en el aire como gas.', { luz: [0] }],
        ['La fotosíntesis lo toma y hace azúcar.', { luz: [1], nota: { 1: 'lo toma' } }],
        ['Al respirar, los seres vivos lo devuelven.', { luz: [2], nota: { 2: 'lo devuelve' } }],
        ['Quemar también lo devuelve, y muy rápido.', { luz: [3], nota: { 3: 'lo devuelve rápido' } }],
        ['Las plantas también respiran, de día y de noche.', { luz: [1] }],
      ], 'Fotosíntesis toma; respirar, descomponer y quemar devuelven.'),
      xpHaz('hoja', 'Subraya lo que **saca** dióxido de carbono del aire.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Una vaca que respira'], ['Un bosque que crece'], ['Un incendio']], pista: '¿Cuál guarda carbono en madera y hojas?' }, 'El bosque que crece lo guarda.')],
    ['El nitrógeno',
      xpMira('hoja', 'Segunda idea: el **nitrógeno** necesita bacterias para servirle a la planta.', { paras: [['Aire: mucho nitrógeno, pero así no sirve.'], ['Bacterias en la raíz del fríjol: lo convierten.'], ['Suelo: queda disuelto.'], ['Planta: lo toma por la raíz.']] }, [
        ['En el aire hay de sobra, pero la planta no puede usarlo.', { luz: [0], tacha: [0] }],
        ['Unas bacterias lo convierten.', { luz: [1], nota: { 1: 'lo convierten' } }],
        ['Así queda disuelto en el suelo.', { luz: [2] }],
        ['Y la planta lo toma por la raíz.', { luz: [3], nota: { 3: 'lo toma' } }],
        ['Por eso sembrar fríjol ayuda al suelo.', { luz: [1] }],
      ], 'Aire, bacterias, suelo y raíz.'),
      xpHaz('hoja', 'Pon al margen qué hace cada uno con el nitrógeno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['lo convierte', 'lo toma ya convertido'], meta: [1, 0], paras: [['La raíz del maíz'], ['Las bacterias de la raíz del fríjol']], pista: '¿Quién hace el trabajo y quién lo aprovecha?' }, 'Las bacterias convierten; el maíz aprovecha.')],
    ['Demasiado',
      xpMira('fichas', 'Tercera idea: **demasiados** nutrientes en el agua quitan el oxígeno.', { slots: fila('1', '2', '3', '4').map(s => ({ ...s, w: 64 })), fichas: ['nitratos', 'algas', 'mueren', 'sin O₂'], alto: 96 }, [
        ['El abono que sobra llega al río.', { pon: { 0: 'nitratos' } }],
        ['Con tanto alimento, las algas se disparan.', { pon: { 1: 'algas' } }],
        ['Tapan la luz y muchas mueren.', { pon: { 2: 'mueren' } }],
        ['Las bacterias que las descomponen gastan el oxígeno.', { pon: { 3: 'sin O₂' } }],
        ['Los peces no mueren por el abono: les falta oxígeno.', { marca: [3] }],
      ], 'Nitratos, algas, descomposición y falta de oxígeno.'),
      xpHaz('hoja', 'Una laguna se puso verde y murieron los peces. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las algas se comieron los peces.'], ['El agua se calentó por el color.'], ['Al descomponerse las algas, se gastó el oxígeno.']], pista: 'Sigue la cadena hasta el oxígeno.' }, 'La descomposición consume el oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una pila de compost pasa de 50 a 30 kg. Pon los kilos que perdió y qué porcentaje de la masa es.', { slots: fila('kilos', 'porcentaje'), fichas: ['20', '40', '60', '30', '67'], meta: ['20', '40'], alto: 96, pista: 'Compara lo perdido con los 50 del comienzo.' }, '$20 \\div 50 = 0.4$: salió al aire, no se destruyó.')],
  ], 'La materia circula: sigue dónde está y quién la mueve.');

  xpLec('icf-cn-ecosistemas-3', [
    ['Quién gana y quién pierde',
      xpMira('hoja', 'Empecemos por la idea: pregunta qué le pasa **a cada uno**.', { paras: [['Pez payaso y anémona: se protegen.'], ['Ave que anida en un árbol.'], ['Pulga y gato.'], ['Dos plantas por la misma luz.']] }, [
        ['Ganan los dos: mutualismo.', { luz: [0], nota: { 0: 'mutualismo' } }],
        ['El ave gana y al árbol le da igual: comensalismo.', { luz: [1], nota: { 1: 'comensalismo' } }],
        ['La pulga gana y el gato pierde: parasitismo.', { luz: [2], nota: { 2: 'parasitismo' } }],
        ['Las dos gastan energía: competencia.', { luz: [3], nota: { 3: 'competencia' } }],
        ['Y si uno mata y come al otro: depredación.', {}],
      ], 'Gana-gana, gana-igual, gana-pierde y pierde-pierde.'),
      xpHaz('hoja', 'Pon al margen la relación.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['competencia', 'mutualismo', 'parasitismo'], meta: [2, 0, 1], paras: [['Un gusano vive en el intestino de un perro.'], ['Dos gallos se pelean por la comida.'], ['Las bacterias de la vaca le digieren el pasto y reciben alimento.']], pista: 'Alguna no va ahí: di qué le pasa a cada uno.' }, 'El perro pierde, los gallos gastan y la vaca y sus bacterias ganan.')],
    ['Suben y bajan',
      xpMira('dibujo', 'Segunda idea: los depredadores **siguen** a sus presas, con retraso.', { dib: olas, v: { a: 0, b: 0, t: '' }, alto: 196 }, [
        ['Primero suben las presas.', { a: 2, t: 'hay más comida' }],
        ['Después suben los depredadores.', { b: 3, t: 'crían más' }],
        ['Con tantos, las presas bajan.', { a: 4, t: 'las cazan más' }],
        ['Y sin comida, bajan los depredadores.', { b: 5, t: 'falta comida' }],
        ['Entonces las presas vuelven a subir.', { a: 6, b: 6, t: '' }],
      ], 'Primero las presas, después los depredadores.'),
      xpHaz('hoja', 'Un año hay muchísimos conejos. Subraya lo más probable para los zorros al año siguiente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumentan'], ['Desaparecen'], ['Comen pasto']], pista: 'Los depredadores siguen a la comida.' }, 'Con más comida crían más.')],
    ['El límite',
      xpMira('fichas', 'Tercera idea: cada lugar sostiene **hasta cierto número**.', { slots: fila('por hectárea', 'hectáreas', 'caben'), fichas: ['3', '20', '60'], alto: 96 }, [
        ['Un bosque sostiene tres monos por hectárea.', { pon: { 0: '3' } }],
        ['Y tiene veinte hectáreas.', { pon: { 1: '20' } }],
        ['Su capacidad de carga son sesenta monos.', { pon: { 2: '60' } }, '$3 \\cdot 20 = 60$'],
        ['Si hay ochenta, se agota la comida y bajan.', {}],
        ['Una invasora crece desplazando a las demás.', {}],
      ], 'Capacidad de carga: cuántos sostiene el lugar.'),
      xpHaz('fichas', 'Una ladera sostiene 5 cabras por hectárea y tiene 8 hectáreas. Hay 52. Pon las que caben y las que sobran.', { slots: fila('caben', 'sobran'), fichas: ['40', '12', '13', '47', '92'], meta: ['40', '12'], alto: 96, pista: 'Multiplica y compara con las que hay.' }, '$5 \\cdot 8 = 40$ y $52 - 40 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Llega un pez que come lo mismo que el pez local y nadie se lo come. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El local aumenta.'], ['El local disminuye por la competencia.'], ['Los dos se vuelven productores.']], pista: 'Comen lo mismo y al nuevo nadie lo caza.' }, 'Compiten, y el nuevo tiene ventaja.')],
  ], 'Di quién gana, sigue los números y respeta el límite.');
}
;
//#archivo js/explora-icf-cn-6.js
// Preicfes · Ciencias Naturales, mundo 6 «Energía y Calor» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rampa: h de 1 (arriba) a 0 (abajo); barras de potencial, cinética y calor (c).
  const rampa = (v, K) => { const x = 40 + (1 - v.h) * 120, y = 60 + (1 - v.h) * 84; const P = v.h * 100, Q = v.c * 100, C = Math.max(0, 100 - P - Q); return K.l(30, 60, 160, 150, 'lm') + K.l(160, 150, 200, 150, 'lm') + K.c(x + 4, y - 10, 9, 'fA') + [[P, 'pot', 'fa'], [C, 'cin', 'fg'], [Q, 'calor', 'ff']].map(([n, t, c], i) => K.r(222 + i * 34, 150 - n, 24, n, c, 2) + K.t(234 + i * 34, 168, t, 's tm')).join('') + K.t(120, 26, v.t || '', 'ta'); };
  // Dos bloques: temperaturas a y b, flecha de calor.
  const par = (v, K) => K.r(60, 60, 90, 70, v.a > v.b + 1 ? 'ff' : 'fg', 6) + K.r(190, 60, 90, 70, v.b > v.a + 1 ? 'ff' : 'fa', 6) + K.t(105, 100, `${Math.round(v.a)}°`, 'b') + K.t(235, 100, `${Math.round(v.b)}°`, 'b') + (v.a > v.b + 1 ? K.ar(153, 95, 187, 95, 'lf gr') : '') + K.t(170, 166, v.t || '', 'ta');
  const barras = (v, K) => [['agua', v.x, 'fa'], ['arena', v.y, 'fg']].map(([s, n, c], i) => K.r(90, 40 + i * 60, n * 2, 34, c, 3) + K.t(82, 62 + i * 60, s, 's tm', 'end') + K.t(98 + n * 2, 62 + i * 60, `${Math.round(n)}°`, 's', 'start')).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-energia-1', [
    ['Dos formas',
      xpMira('dibujo', 'Empecemos por la idea: en alto hay energía **potencial**; en movimiento, **cinética**.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arriba y quieta: toda es potencial.', { t: 'potencial 100' }],
        ['Al bajar, una parte se vuelve cinética.', { h: 0.5, t: '50 y 50' }],
        ['Abajo va más rápido: toda es cinética.', { h: 0, t: 'cinética 100' }],
        ['La suma no cambió en ningún momento.', {}],
        ['A esa suma se le llama energía mecánica.', { h: 0.7, t: '70 y 30' }],
      ], 'Sin roce, potencial más cinética siempre da lo mismo.'),
      xpHaz('fichas', 'Una bola tiene 60 J arriba, quieta. Sin roce, a cierta altura le quedan 45 de potencial. Pon la cinética ahí y la que tendrá abajo.', { slots: fila('ahí', 'abajo'), fichas: ['15', '60', '45', '105', '30'], meta: ['15', '60'], alto: 96, pista: 'Las dos deben sumar 60.' }, '$60 - 45 = 15$; abajo, toda: 60.')],
    ['Con roce',
      xpMira('dibujo', 'Segunda idea: con **roce**, una parte pasa a calor; nada desaparece.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arranca con cien, toda potencial.', {}],
        ['El roce calienta un poco la pista.', { h: 0.5, c: 0.1, t: '50 + 40 + 10' }],
        ['Abajo le queda menos cinética.', { h: 0, c: 0.2, t: '80 + 20' }, '$100 - 20 = 80$'],
        ['Si sube, no llega a la misma altura.', {}],
        ['La total sigue siendo cien: parte es calor.', { t: 'total 100' }],
      ], 'La energía total se conserva; la mecánica, solo sin roce.'),
      xpHaz('hoja', 'Un columpio se va frenando solo. Subraya adónde va su energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Desaparece.'], ['Pasa al aire y a las cadenas como calor.'], ['Se vuelve altura.']], pista: 'Nada se pierde: se transforma.' }, 'El roce la convierte en calor.')],
    ['El cuadrado',
      xpMira('fichas', 'Tercera idea: la cinética va con el **cuadrado** de la velocidad.', { slots: fila('v: 1', 'v: 2', 'v: 3'), fichas: ['1', '4', '9'], alto: 96 }, [
        ['A cierta velocidad tiene una unidad.', { pon: { 0: '1' } }],
        ['Al doble de velocidad, cuatro.', { pon: { 1: '4' } }, '$2^2 = 4$'],
        ['Al triple de velocidad, nueve.', { pon: { 2: '9' } }, '$3^2 = 9$'],
        ['Por eso frenar cuesta mucho más.', {}],
        ['En cambio, con la masa es parejo: doble masa, doble energía.', {}],
      ], 'Doble velocidad: cuatro veces. Doble masa: dos veces.'),
      xpHaz('fichas', 'Una moto va a 20 y pasa a 80 km/h. Pon por cuánto se multiplica su velocidad y por cuánto su energía cinética.', { slots: fila('velocidad', 'energía'), fichas: ['4', '16', '8', '2', '60'], meta: ['4', '16'], alto: 96, pista: 'La energía va con el cuadrado.' }, '$80 \\div 20 = 4$ y $4^2 = 16$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un bloque de 3 kg está a 4 m de altura (gravedad 10). Cae y llega con 90 J de cinética. Pon su potencial al comienzo y lo que pasó a calor.', { slots: fila('potencial', 'calor'), fichas: ['120', '30', '90', '12', '210'], meta: ['120', '30'], alto: 96, pista: 'Masa por gravedad por altura; después, resta.' }, '$3 \\cdot 10 \\cdot 4 = 120$ y $120 - 90 = 30$.')],
  ], 'Se transforma, se conserva y la velocidad pesa al cuadrado.');

  xpLec('icf-cn-energia-2', [
    ['No son lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: el **calor** pasa de lo más caliente a lo más frío hasta igualarse.', { dib: par, v: { a: 80, b: 20, t: '' }, alto: 178 }, [
        ['Dos bloques iguales: uno a 80 y otro a 20.', {}],
        ['El calor pasa del caliente al frío.', { a: 70, b: 30, t: 'pasa calor' }],
        ['Uno baja lo mismo que el otro sube.', { a: 60, b: 40 }],
        ['Cuando se igualan, deja de pasar.', { a: 50, b: 50, t: 'equilibrio' }, '$(80 + 20) \\div 2 = 50$'],
        ['Temperatura es lo que marcan; calor, lo que pasó.', {}],
      ], 'Temperatura se tiene; calor pasa, hasta el equilibrio.'),
      xpHaz('fichas', 'Se juntan dos bloques iguales, a 90 y a 30 grados, sin perder calor. Pon el equilibrio y cuánto baja el caliente.', { slots: fila('equilibrio', 'baja'), fichas: ['60', '30', '120', '45', '90'], meta: ['60', '30'], alto: 96, pista: 'Son iguales: el punto medio.' }, '$(90 + 30) \\div 2 = 60$ y $90 - 60 = 30$.')],
    ['Tres caminos',
      xpMira('hoja', 'Segunda idea: el calor viaja por **conducción**, **convección** o **radiación**.', { paras: [['Plancha que toca la camisa'], ['Agua de la olla que sube y baja'], ['Sol que calienta la acera'], ['Cobija con aire quieto']] }, [
        ['Por contacto, de partícula en partícula.', { luz: [0], nota: { 0: 'conducción' } }],
        ['Por un fluido que se mueve.', { luz: [1], nota: { 1: 'convección' } }],
        ['En ondas, aun en el vacío.', { luz: [2], nota: { 2: 'radiación' } }],
        ['El aire quieto casi no lo deja pasar.', { luz: [3], nota: { 3: 'aislante' } }],
        ['El metal, en cambio, lo conduce muy bien.', { luz: [0] }],
      ], 'Contacto, fluido u ondas; el aire quieto frena.'),
      xpHaz('hoja', 'Pon al margen el camino del calor.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['convección', 'radiación', 'conducción'], meta: [2, 0, 1], paras: [['Sartén sobre la hornilla, contacto directo'], ['Aire caliente que sube en una chimenea'], ['Calor de una bombilla sin tocarla, de lado']], pista: 'Alguna no va ahí: ¿contacto, fluido u ondas?' }, 'La sartén por contacto, el aire sube y la bombilla radia.')],
    ['Unos cuestan más',
      xpMira('dibujo', 'Tercera idea: el **calor específico** dice cuánto cuesta subir un grado.', { dib: barras, v: { x: 0, y: 0, t: '' }, alto: 186 }, [
        ['Un kilo de agua y uno de arena, con el mismo fuego.', {}],
        ['La arena sube rápido.', { x: 4, y: 21, t: 'mismo calor' }],
        ['El agua sube despacio: pide más calor por grado.', { x: 12, y: 63 }],
        ['Al enfriarse ocurre igual: la arena baja primero.', { x: 10, y: 30, t: 'de noche' }],
        ['Por eso el mar cambia poco de temperatura.', {}],
      ], 'Mayor calor específico: cambia más despacio.'),
      xpHaz('fichas', 'A 1 kg de agua se le dan 12 600 J. Si cada grado pide 4 200, pon cuánto sube y cuánto subirían 3 kg con el mismo calor.', { slots: fila('1 kg', '3 kg'), fichas: ['3', '1', '9', '6', '12'], meta: ['3', '1'], alto: 96, pista: 'Con el triple de agua, el calor se reparte en más.' }, '$12\\,600 \\div 4\\,200 = 3$; con el triple de masa, 1.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una banca de metal y una de madera llevan toda la noche afuera. La de metal se siente más fría. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El metal está a menor temperatura.'], ['La madera produce calor.'], ['El metal se lleva más rápido el calor del cuerpo.']], pista: 'Llevan horas en el mismo lugar.' }, 'Tienen igual temperatura; el metal conduce mejor.')],
  ], 'El calor pasa, por tres caminos, y unos se calientan más fácil.');
}
;
//#archivo js/explora-icf-cn-7.js
// Preicfes · Ciencias Naturales, mundo 7 «Átomo y Enlaces» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Átomo: p protones, n neutrones, e electrones repartidos en capas 2 y 8.
  const atomo = (v, K) => { const e = Math.round(v.e), cap = [Math.min(2, e), Math.max(0, e - 2)], nuc = Math.round(v.p) + Math.round(v.n); return K.c(170, 92, 78, 'fn') + K.c(170, 92, 48, 'fn') + Array.from({ length: nuc }, (_, i) => K.c(170 + 5 * Math.sqrt(i) * Math.cos(i * 2.4), 92 + 5 * Math.sqrt(i) * Math.sin(i * 2.4), 5, i < Math.round(v.p) ? 'fF' : 'fk')).join('') + cap.map((m, k) => Array.from({ length: m }, (_, i) => { const [x, y] = K.at(170, 92, [48, 78][k], 90 + 360 * i / m); return K.c(x, y, 5, 'fA'); }).join('')).join('') + K.t(170, 194, v.t || '', 'ta'); };
  // Dos átomos: electrón que pasa (t de 0 a 1), o se comparte (s).
  const par = (v, K) => K.c(110, 90, 44, 'fn') + K.c(230, 90, 44, 'fn') + K.t(110, 95, v.a, 'b') + K.t(230, 95, v.b, 'b') + (v.mar > 0.5 ? Array.from({ length: 10 }, (_, i) => K.c(60 + i * 24, i % 2 ? 60 : 120, 4, 'fA')).join('') : v.s > 0.01 ? K.c(170 + v.k, 82, 5, 'fA') + K.c(170 + v.k, 98, 5, 'fG') : K.c(154 + v.x * 32, 90, 6, 'fA')) + K.t(170, 168, v.t || '', 'ta');

  xpLec('icf-cn-atomo-1', [
    ['Tres partículas',
      xpMira('dibujo', 'Empecemos por la idea: el **núcleo** tiene protones y neutrones; alrededor, electrones.', { dib: atomo, v: { p: 6, n: 6, e: 6, t: '' }, alto: 202 }, [
        ['Seis protones en el centro: es carbono.', { t: '6 protones' }],
        ['Con los neutrones, la masa es doce.', { t: 'masa 12' }, '$6 + 6 = 12$'],
        ['Seis electrones: está neutro.', { t: 'neutro' }],
        ['Con siete protones ya sería nitrógeno.', { p: 7, e: 7, t: '7 protones' }],
        ['Los protones mandan: deciden el elemento.', {}],
      ], 'Protones: qué elemento es. Masa: protones más neutrones.'),
      xpHaz('fichas', 'Un átomo neutro tiene 9 protones y masa 19. Pon sus neutrones y sus electrones.', { slots: fila('neutrones', 'electrones'), fichas: ['10', '9', '19', '28', '8'], meta: ['10', '9'], alto: 96, pista: 'Resta los protones a la masa; neutro tiene iguales cargas.' }, '$19 - 9 = 10$; neutro: 9.')],
    ['Isótopos e iones',
      xpMira('dibujo', 'Segunda idea: cambian **neutrones**, isótopo; cambian **electrones**, ion.', { dib: atomo, v: { p: 3, n: 4, e: 3, t: 'litio' }, alto: 202 }, [
        ['Litio: tres protones, cuatro neutrones, tres electrones.', {}],
        ['Con un neutrón menos, es un isótopo.', { n: 3, t: 'litio 6' }],
        ['Sigue siendo litio: tiene tres protones.', {}],
        ['Si pierde un electrón, es un ion.', { n: 4, e: 2, t: 'carga +1' }, '$3 - 2 = +1$'],
        ['El núcleo no cambió.', {}],
      ], 'Isótopo: otros neutrones. Ion: otros electrones.'),
      xpHaz('hoja', 'Pon al margen qué es, comparado con oxígeno neutro (8 p, 8 n, 8 e).', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['ion', 'otro elemento', 'isótopo'], meta: [2, 0, 1], paras: [['8 p, 10 n, 8 e'], ['8 p, 8 n, 10 e'], ['9 p, 10 n, 9 e']], pista: 'Alguna no va ahí: mira qué número cambió.' }, 'Neutrones, electrones o protones.')],
    ['La tabla',
      xpMira('hoja', 'Tercera idea: la **tabla** ordena por protones y agrupa a los parecidos.', { paras: [['Grupo: columna, se parecen'], ['Periodo: fila'], ['Al bajar: más capas, más grande'], ['Al avanzar: más atracción, más pequeño'], ['Izquierda: metales. Derecha: no metales']] }, [
        ['Los de una columna tienen iguales electrones externos.', { luz: [0], nota: { 0: 'se parecen' } }],
        ['Cada fila es un periodo.', { luz: [1] }],
        ['Al bajar, el átomo crece.', { luz: [2], nota: { 2: 'crece' } }],
        ['Al avanzar, en general se encoge.', { luz: [3], nota: { 3: 'se encoge' } }],
        ['Unos pierden electrones y otros los ganan.', { luz: [4] }],
      ], 'Grupo: se parecen. Bajar: crece. Avanzar: se encoge.'),
      xpHaz('hoja', 'Litio, sodio y potasio están en la misma columna, de arriba abajo. Subraya el más **grande**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Litio'], ['Sodio'], ['Potasio']], pista: 'Al bajar hay más capas.' }, 'El de más abajo tiene más capas.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El ion de azufre tiene 16 protones y 18 electrones; su masa es 32. Pon la carga y los neutrones.', { slots: fila('carga', 'neutrones'), fichas: ['−2', '16', '+2', '14', '18'], meta: ['−2', '16'], alto: 96, pista: 'Compara protones con electrones; resta protones a la masa.' }, '$16 - 18 = -2$ y $32 - 16 = 16$.')],
  ], 'Protones identifican; neutrones y electrones varían; la tabla ordena.');

  xpLec('icf-cn-atomo-2', [
    ['Entregar',
      xpMira('dibujo', 'Empecemos por la idea: en el enlace **iónico** un metal entrega electrones.', { dib: par, v: { a: 'Na', b: 'Cl', x: 0, s: 0, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['El sodio tiene un electrón suelto.', {}],
        ['Se lo entrega al cloro.', { x: 1, t: 'pasa un electrón' }],
        ['Quedan con cargas opuestas y se atraen.', { a: 'Na⁺', b: 'Cl⁻', t: '+1 y −1' }],
        ['Forman una red dura que se funde muy caliente.', {}],
        ['Disuelta, sus iones se mueven y conduce.', { t: 'disuelta conduce' }],
      ], 'Iónico: metal con no metal, red dura, conduce disuelto.'),
      xpHaz('hoja', 'Subraya la sustancia con enlace **iónico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Oxígeno del aire (O₂)'], ['Bromuro de potasio (KBr)'], ['Cobre (Cu)']], pista: 'Busca un metal con un no metal.' }, 'El potasio es metal y el bromo, no metal.')],
    ['Compartir',
      xpMira('dibujo', 'Segunda idea: en el **covalente** dos no metales comparten.', { dib: par, v: { a: 'O', b: 'O', x: 0, s: 1, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['Los dos jalan igual: están en el medio.', { t: 'apolar' }],
        ['Si uno jala más, quedan más cerca de él.', { a: 'H', k: 22, t: 'polar' }],
        ['Un lado queda un poco negativo.', {}],
        ['Así es el agua: por eso disuelve la sal.', {}],
        ['Muchas covalentes se funden fácil y no conducen.', { t: 'no conduce' }],
      ], 'Covalente: comparten. Igual, apolar; desigual, polar.'),
      xpHaz('hoja', 'Pon al margen el enlace.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['polar', 'apolar'], meta: [1, 0], paras: [['Dos átomos iguales comparten'], ['Uno atrae más los electrones']], pista: 'Alguna no va ahí: ¿jalan igual?' }, 'Igual, apolar; desigual, polar.')],
    ['Un mar',
      xpMira('dibujo', 'Tercera idea: en el **metálico** los electrones se mueven por toda la pieza.', { dib: par, v: { a: 'Cu', b: 'Cu', x: 0, s: 0, k: 0, mar: 1, t: '' }, alto: 178 }, [
        ['Los electrones externos quedan sueltos.', { t: 'mar de electrones' }],
        ['Por eso conduce electricidad y calor.', {}],
        ['Y conduce aunque esté sólido.', { t: 'conduce sólido' }],
        ['Y se dobla: las capas se deslizan.', {}],
        ['La sal, en cambio, se parte.', {}],
      ], 'Metálico: conduce sólido y se dobla.'),
      xpHaz('hoja', 'Subraya la prueba que distingue un **metal** de una sal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Si conduce estando sólido'], ['Si es blanco o gris'], ['Si cabe en un frasco']], pista: 'La sal sólida no conduce.' }, 'Solo el metal conduce sólido.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El calcio pierde 2 electrones y el flúor gana 1. Pon la carga del calcio y cuántos flúor hacen falta.', { slots: fila('calcio', 'flúor'), fichas: ['+2', '2', '−2', '1', '+1'], meta: ['+2', '2'], alto: 96, pista: 'Las cargas deben sumar cero.' }, '$+2 - 1 - 1 = 0$: dos flúor.')],
  ], 'Entregar, compartir o soltar: se nota en las propiedades.');
}
;
//#archivo js/explora-icf-cn-8.js
// Preicfes · Ciencias Naturales, mundo 8 «Herencia y Evolución» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cuadro de cruces: padre p1 p2 arriba, madre m1 m2 a la izquierda; n casillas llenas.
  const cuadro = (v, K) => { const u = 56, x = 124, y = 44, P = v.p, M = v.m; let h = ''; for (let i = 0; i < 2; i++) { h += K.t(x + u * (i + 0.5), 34, P[i], 'b ta') + K.t(x - 14, y + u * (i + 0.5) + 5, M[i], 'b tg'); for (let j = 0; j < 2; j++) { const k = i * 2 + j, g = [P[j], M[i]].sort().join(''); h += K.r(x + u * j, y + u * i, u - 3, u - 3, v.n > k ? (/[A-Z]/.test(g) ? 'fa' : 'ff') : 'fn', 3) + K.f(v.n - k, K.t(x + u * (j + 0.5) - 2, y + u * (i + 0.5) + 4, g, 'b')); } } return h + K.t(170, 186, v.t || '', 'ta'); };
  // Población: k oscuros entre 20.
  const pob = (v, K) => Array.from({ length: 20 }, (_, i) => K.c(70 + (i % 5) * 50, 34 + Math.floor(i / 5) * 34, 11, i < Math.round(v.k) ? 'fF' : 'fA')).join('') + K.t(170, 184, v.t || '', 'ta');
  // División celular: n células con c cromosomas.
  const celulas = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const n = Math.round(v.n), x = 170 + (i - (n - 1) / 2) * 74; return K.c(x, 92, n > 2 ? 30 : 34, 'fn') + Array.from({ length: Math.round(v.c) }, (_, j) => K.l(x - 12 + j * 8, 80, x - 12 + j * 8, 104, j % 2 ? 'lg gr' : 'la gr')).join(''); }).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-herencia-1', [
    ['Dos alelos',
      xpMira('hoja', 'Empecemos por la idea: de cada gen recibes **dos alelos**, uno de cada progenitor.', { paras: [['A: dominante'], ['a: recesivo'], ['AA o Aa: se ve lo dominante'], ['aa: se ve lo recesivo']] }, [
        ['Con uno dominante basta.', { luz: [0] }],
        ['El recesivo necesita dos.', { luz: [1] }],
        ['Estos dos se ven iguales.', { luz: [2], nota: { 2: 'mismo fenotipo' } }],
        ['Solo este muestra lo recesivo.', { luz: [3] }],
        ['Genotipo son las letras; fenotipo, lo que se ve.', {}],
      ], 'Letras: genotipo. Lo que se ve: fenotipo.'),
      xpHaz('hoja', 'En la arveja, la semilla lisa (R) domina a la rugosa. Subraya el genotipo de una planta de semilla **rugosa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['RR'], ['Rr'], ['rr']], pista: 'Lo recesivo necesita dos iguales.' }, 'Sin ninguna R se ve lo recesivo.')],
    ['El cuadro',
      xpMira('dibujo', 'Segunda idea: el **cuadro** muestra las cuatro combinaciones.', { dib: cuadro, v: { p: ['B', 'b'], m: ['B', 'b'], n: 0, t: '' }, alto: 196 }, [
        ['El padre puede dar B o b; la madre también.', {}],
        ['Primera casilla: una B de cada uno.', { n: 1 }],
        ['Las otras tres se llenan igual.', { n: 4 }],
        ['Tres llevan alguna B: se ve lo dominante.', { t: '3 de 4' }],
        ['Solo una es bb: la cuarta parte.', { t: '1 de 4' }],
      ], 'Bb con Bb: tres a uno.'),
      xpHaz('fichas', 'Se cruza Rr con rr. Pon cuántas casillas de cuatro son Rr y cuántas rr.', { slots: fila('Rr', 'rr'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'Uno da R o r; el otro, solo r.' }, 'La mitad de cada una.')],
    ['Lo que se espera',
      xpMira('fichas', 'Tercera idea: la probabilidad vale en **muchos** nacimientos, no en cada camada.', { slots: fila('esperado', 'en 4', 'en 400'), fichas: ['1 de 4', '0 o 2', '98'], alto: 96 }, [
        ['Se espera uno recesivo de cada cuatro.', { pon: { 0: '1 de 4' } }],
        ['En una camada de cuatro puede salir otra cosa.', { pon: { 1: '0 o 2' } }],
        ['En cuatrocientas se acerca a cien.', { pon: { 2: '98' } }, '$400 \\div 4 = 100$'],
        ['También hay genes sin dominancia: flores rosadas.', {}],
        ['Y genes en el cromosoma X: más frecuentes en hombres.', {}],
      ], 'Mientras más nacimientos, más se acerca.'),
      xpHaz('fichas', 'Dos Aa tienen 240 hijos (son plantas). Pon los recesivos y los dominantes que se esperan.', { slots: fila('recesivos', 'dominantes'), fichas: ['60', '180', '120', '80', '240'], meta: ['60', '180'], alto: 96, pista: 'La cuarta parte y el resto.' }, '$240 \\div 4 = 60$ y $240 - 60 = 180$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Dos cobayos negros tienen una cría blanca. El negro domina. Subraya los genotipos de los padres.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['NN y NN'], ['Nn y Nn'], ['NN y nn']], pista: 'La cría es nn: recibió una n de cada uno.' }, 'Cada padre tiene una n escondida.')],
  ], 'Dos alelos, cuatro casillas y muchos nacimientos.');

  xpLec('icf-cn-herencia-2', [
    ['Uno o dos progenitores',
      xpMira('hoja', 'Empecemos por la idea: hay reproducción con **uno** o con **dos** progenitores.', { paras: [['Bacteria que se parte'], ['Papa sembrada por pedazos'], ['Polen que llega a otra flor'], ['Óvulo y espermatozoide']] }, [
        ['Aquí hay un solo progenitor.', { luz: [0], nota: { 0: 'asexual' } }],
        ['Aquí también: hijas iguales.', { luz: [1], nota: { 1: 'asexual' } }],
        ['Aquí hay dos progenitores.', { luz: [2], nota: { 2: 'sexual' } }],
        ['Y aquí: hijos variados.', { luz: [3], nota: { 3: 'sexual' } }],
        ['Una es rápida; la otra da variedad.', {}],
      ], 'Asexual: uno, iguales. Sexual: dos, variados.'),
      xpHaz('hoja', 'Subraya la ventaja de la reproducción **asexual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Es rápida y no necesita pareja.'], ['Da hijos muy distintos.'], ['Protege de enfermedades nuevas.']], pista: 'Las otras dos son de la sexual.' }, 'Rápida y sin pareja, pero sin variedad.')],
    ['Dos divisiones',
      xpMira('dibujo', 'Segunda idea: **mitosis** copia; **meiosis** reduce a la mitad.', { dib: celulas, v: { n: 1, c: 4, t: 'una célula, 4 cromosomas' }, alto: 186 }, [
        ['Una célula con cuatro cromosomas.', {}],
        ['Por mitosis: dos iguales, con cuatro.', { n: 2, t: 'mitosis: 2 células, 4 cada una' }],
        ['Sirve para crecer y reparar.', {}],
        ['Por meiosis: cuatro, con la mitad.', { n: 4, c: 2, t: 'meiosis: 4 células, 2 cada una' }],
        ['Sirve para formar gametos, y casi siempre son distintos.', {}],
      ], 'Mitosis: dos iguales. Meiosis: cuatro con la mitad.'),
      xpHaz('fichas', 'Una especie tiene 20 cromosomas. Pon los de sus gametos y los del cigoto.', { slots: fila('gameto', 'cigoto'), fichas: ['10', '20', '40', '5', '80'], meta: ['10', '20'], alto: 96, pista: 'El gameto lleva la mitad; dos gametos se juntan.' }, '$20 \\div 2 = 10$ y $10 + 10 = 20$.')],
    ['El seguro de la variedad',
      xpMira('hoja', 'Tercera idea: la **variedad** protege cuando algo cambia.', { paras: [['Todas iguales'], ['Llega una plaga'], ['Mueren casi todas'], ['Variadas: algunas resisten']] }, [
        ['Iguales: si nada cambia, van bien.', { luz: [0] }],
        ['Pero llega una plaga.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Si una cae, caen todas.', { luz: [2] }],
        ['Entre distintas, alguna aguanta.', { luz: [3], nota: { 3: 'sobreviven' } }],
        ['Por eso se guardan semillas viejas.', {}],
      ], 'Variedad: el seguro de vida de una especie.'),
      xpHaz('hoja', 'Subraya el cultivo con **menor** riesgo ante un hongo nuevo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Mil matas de un mismo esqueje'], ['Mil matas de semillas de muchas plantas'], ['Mil matas de estolones de una sola planta']], pista: '¿Dónde hay plantas distintas?' }, 'La variedad aumenta la opción de que alguna resista.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una mula nace de yegua (64 cromosomas) y burro (62). Subraya cuántos tiene.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['126'], ['64'], ['63']], pista: 'Cada gameto lleva la mitad.' }, '$32 + 31 = 63$.')],
  ], 'Uno o dos, copiar o reducir, y variar.');

  xpLec('icf-cn-herencia-3', [
    ['La población cambia',
      xpMira('dibujo', 'Empecemos por la idea: no cambia el individuo, cambia la **proporción**.', { dib: pob, v: { k: 2, t: '2 oscuros de 20' }, alto: 194 }, [
        ['Dos escarabajos de veinte son oscuros.', {}],
        ['Los pájaros ven mejor a los claros.', { t: 'cazan más claros' }],
        ['Los oscuros dejan más crías oscuras.', { k: 8, t: '8 de 20' }],
        ['Generación tras generación aumentan.', { k: 15, t: '15 de 20' }],
        ['Ninguno cambió de color.', {}],
      ], 'Variación, herencia, más nacen y unos se reproducen más.'),
      xpHaz('hoja', 'Subraya la explicación **correcta** de por qué hoy hay más ratones de pelo grueso en el frío.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Les creció porque lo necesitaban.'], ['Los de pelo grueso sobrevivieron y tuvieron más crías.'], ['El frío les cambió los genes a todos.']], pista: '¿Cambia el individuo o la población?' }, 'La variación ya existía y fue seleccionada.')],
    ['Al azar y escogido',
      xpMira('hoja', 'Segunda idea: la mutación es **al azar**; el ambiente **selecciona**.', { paras: [['Mutación: aparece sin propósito'], ['Ambiente: favorece a unos'], ['Otro ambiente: favorece a otros'], ['«Se adaptó porque quería»']] }, [
        ['La mutación no la pide nadie.', { luz: [0], nota: { 0: 'al azar' } }],
        ['Luego el lugar decide cuál conviene.', { luz: [1], nota: { 1: 'selecciona' } }],
        ['En otra parte conviene lo contrario.', { luz: [2] }],
        ['Este es el error típico.', { luz: [3], tacha: [3] }],
        ['Estar adaptado es estarlo a un lugar.', { luz: [1, 2] }],
      ], 'Primero la variación; después, la selección.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['selección', 'mutación'], meta: [1, 0], paras: [['Un cambio en el ADN de una cría'], ['Los peces rápidos escapan y se reproducen más']], pista: 'Alguna no va ahí: ¿aparece al azar o se favorece?' }, 'El ADN muta; los rápidos son seleccionados.')],
    ['Las pruebas',
      xpMira('hoja', 'Tercera idea: muchas **pruebas** apuntan a lo mismo.', { paras: [['Fósiles intermedios'], ['Mismos huesos en brazo, ala y aleta'], ['ADN parecido entre parientes'], ['Bacterias resistentes']] }, [
        ['La roca guarda formas de paso.', { luz: [0] }],
        ['Un mismo plan, acomodado distinto.', { luz: [1] }],
        ['Mientras más cercanos, más parecido.', { luz: [2] }],
        ['Y lo vemos ocurrir hoy.', { luz: [3], nota: { 3: 'ahora' } }],
        ['Por eso el antibiótico se toma completo.', { luz: [3] }],
      ], 'Roca, huesos, ADN y lo que pasa hoy.'),
      xpHaz('hoja', 'La aleta de la ballena y el ala del murciélago tienen los mismos huesos. Subraya lo que sugiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Tienen un antepasado común.'], ['Viven en el mismo lugar.'], ['Comen lo mismo.']], pista: 'Una nada y el otro vuela: ¿de dónde viene el plan?' }, 'Un mismo plan heredado, acomodado distinto.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 100 insectos, 5 resisten un veneno. Tras fumigar quedan 4 resistentes y 6 que no. Pon el porcentaje de resistentes antes y después.', { slots: fila('antes (%)', 'después (%)'), fichas: ['5', '40', '4', '10', '60'], meta: ['5', '40'], alto: 96, pista: 'Compara con el total de cada momento.' }, '5 de 100 y 4 de 10.')],
  ], 'Cambia la proporción, el ambiente escoge y hay pruebas.');
}
;
//#archivo js/explora-icf-cn-9.js
// Preicfes · Ciencias Naturales, mundo 9 «Reacciones y Cantidades» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // 2 CO + O2 → 2 CO2 con bolas: a moléculas de CO, b de O2, z de CO2.
  const C = (K, x, y) => K.c(x, y, 9, 'ff'), O = (K, x, y) => K.c(x, y, 9, 'fa');
  const bolas = (v, K) => Array.from({ length: 2 }, (_, i) => K.f(v.a - i, C(K, 40, 50 + i * 50) + O(K, 57, 50 + i * 50)) + K.f(v.z - i, O(K, 246, 50 + i * 50) + C(K, 263, 50 + i * 50) + O(K, 280, 50 + i * 50))).join('') + K.f(v.b, O(K, 118, 75) + O(K, 135, 75)) + K.l(164, 75, 206, 75, 'gr') + K.l(206, 75, 198, 69, 'gr') + K.l(206, 75, 198, 81, 'gr') + K.t(170, 150, v.t, 'ta');
  // Recetas: p de A (2 por receta), q de B (1 por receta), n recetas usadas.
  const receta = (v, K) => Array.from({ length: 8 }, (_, i) => K.c(50 + i * 32, 46, 11, i < v.n * 2 ? 'ff' : 'fa')).join('') + Array.from({ length: 5 }, (_, i) => K.r(40 + i * 32, 86, 20, 20, i < v.n ? 'ff' : 'fg', 3)).join('') + K.t(20, 22, 'A', 'b') + K.t(20, 101, 'B', 'b') + K.t(170, 150, v.t, 'ta');
  // Escala de pH con una marca.
  const escala = (v, K) => Array.from({ length: 15 }, (_, i) => K.r(21 + i * 20, 60, 18, 28, i < 7 ? 'ff' : i > 7 ? 'fg' : 'fc', 2) + K.t(30 + i * 20, 80, i, 's')).join('') + K.c(30 + v.h * 20, 44, 7, 'fF') + K.t(170, 124, v.t, 'ta');

  xpLec('icf-cn-reacciones-1', [
    ['Físico o químico',
      xpMira('hoja', 'Empecemos por la idea: en una **reacción** aparecen sustancias **nuevas**.', { paras: [['Se parte un vaso'], ['Se evapora alcohol'], ['Arde un fósforo'], ['Se pudre una fruta']] }, [
        ['El vaso roto sigue siendo vidrio.', { luz: [0], nota: { 0: 'físico' } }],
        ['El vapor sigue siendo alcohol.', { luz: [1], nota: { 1: 'físico' } }],
        ['Salen gases y ceniza: algo nuevo.', { luz: [2], nota: { 2: 'químico' } }],
        ['También aparecen sustancias nuevas.', { luz: [3], nota: { 3: 'químico' } }],
        ['Gas, color o calor son pistas, no pruebas.', {}],
      ], 'Misma sustancia: físico. Sustancia nueva: químico.'),
      xpHaz('hoja', 'Subraya el cambio **químico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Moler café'], ['Fermentar jugo de uva'], ['Congelar agua']], pista: '¿Dónde aparece algo que no estaba?' }, 'Al fermentar aparece alcohol.')],
    ['Los átomos se reacomodan',
      xpMira('dibujo', 'Segunda idea: los átomos **no se crean ni se destruyen**.', { dib: bolas, v: { a: 1, b: 1, z: 0, t: 'CO + O₂ → CO₂' }, alto: 164 }, [
        ['Un carbono con un oxígeno, y un par de oxígenos.', {}],
        ['Si sale una molécula, sobra un oxígeno.', { z: 1, t: 'antes 3 oxígenos, después 2' }],
        ['Se pone otra molécula a la izquierda.', { a: 2, t: '2CO + O₂ → ?' }],
        ['Ahora salen dos y todo cuadra.', { z: 2, t: '2CO + O₂ → 2CO₂' }],
        ['Dos carbonos y cuatro oxígenos en cada lado.', {}],
      ], 'Los mismos átomos antes y después.'),
      xpHaz('fichas', 'Balancea: ? Na + Cl₂ → ? NaCl. Pon los dos números.', { slots: fila('Na', 'NaCl'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'El par de cloros necesita dos sodios.' }, '$2Na + Cl_2 \\to 2NaCl$.')],
    ['La masa no cambia',
      xpMira('fichas', 'Tercera idea: en un recipiente **cerrado** la masa es la misma.', { slots: fila('reactivos', 'sólido', 'gas'), fichas: ['50', '28', '22'], alto: 96 }, [
        ['Se calientan 50 gramos de un mineral.', { pon: { 0: '50' } }],
        ['Queda un sólido de 28 gramos.', { pon: { 1: '28' } }],
        ['Lo que falta se fue como gas.', { pon: { 2: '22' } }, '$50 - 28 = 22$'],
        ['Con tapa, la balanza no cambia.', {}],
        ['Y si se une oxígeno del aire, pesa más.', {}],
      ], 'Entra lo mismo que sale.'),
      xpHaz('fichas', 'Se queman 12 g de carbono y salen 44 g de gas. Pon el oxígeno que se unió y el total de reactivos.', { slots: fila('oxígeno', 'reactivos'), fichas: ['32', '44', '56', '12', '28'], meta: ['32', '44'], alto: 96, pista: 'Los reactivos juntos pesan lo que el gas.' }, '$44 - 12 = 32$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una lana de acero se quema en una balanza al aire y pesa **más**. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El fuego pesa'], ['Se crearon átomos'], ['Se le unió oxígeno del aire']], pista: '¿De dónde pueden venir esos átomos?' }, 'El oxígeno que se unió ya estaba en el aire.')],
  ], 'Algo nuevo, los mismos átomos y la misma masa.');

  xpLec('icf-cn-reacciones-2', [
    ['El mol',
      xpMira('fichas', 'Empecemos por la idea: el **mol** es un paquete; su masa se **suma** con los átomos.', { slots: fila('C', 'O₂', 'CO₂'), fichas: ['12', '32', '44'], alto: 96 }, [
        ['Un mol de carbono pesa 12 gramos.', { pon: { 0: '12' } }],
        ['Dos oxígenos de 16 pesan 32.', { pon: { 1: '32' } }, '$2 \\cdot 16 = 32$'],
        ['Juntos, un mol pesa 44 gramos.', { pon: { 2: '44' } }, '$12 + 32 = 44$'],
        ['Con 88 gramos hay dos moles.', {}, '$88 \\div 44 = 2$'],
        ['Mismo número de partículas, distinta masa.', {}],
      ], 'Gramos entre masa molar: moles.'),
      xpHaz('fichas', 'Con H = 1, C = 12: pon la masa de un mol de CH₄ y los moles que hay en 48 g.', { slots: fila('un mol (g)', 'moles'), fichas: ['16', '3', '13', '4', '48'], meta: ['16', '3'], alto: 96, pista: 'Suma un carbono y cuatro hidrógenos.' }, '$12 + 4 = 16$ y $48 \\div 16 = 3$.')],
    ['La receta',
      xpMira('hoja', 'Segunda idea: los coeficientes son la **receta**, en moles.', { paras: [['2Al + 3Cl₂ → 2AlCl₃'], ['2 de Al piden 3 de Cl₂'], ['4 de Al piden 6 de Cl₂'], ['y dan 4 de AlCl₃'], ['«2 gramos piden 3 gramos»']] }, [
        ['Esta es la ecuación balanceada.', { luz: [0] }],
        ['Se lee como una receta.', { luz: [1] }],
        ['Con el doble, todo se duplica.', { luz: [2] }],
        ['También lo que sale.', { luz: [3] }],
        ['No se lee en gramos: son moles.', { luz: [4], tacha: [4] }],
      ], 'Cuántas veces se hace la receta.'),
      xpHaz('fichas', 'En 4Fe + 3O₂ → 2Fe₂O₃, con 8 moles de Fe, pon los de O₂ y los de Fe₂O₃.', { slots: fila('O₂', 'Fe₂O₃'), fichas: ['6', '4', '3', '2', '8'], meta: ['6', '4'], alto: 96, pista: '8 es el doble de 4.' }, 'Receta doble: 6 y 4.')],
    ['El que limita',
      xpMira('dibujo', 'Tercera idea: el que se **acaba primero** decide cuánto sale.', { dib: receta, v: { n: 0, t: 'cada receta: 2 de A y 1 de B' }, alto: 164 }, [
        ['Hay ocho de A y cinco de B.', {}],
        ['Cada receta gasta dos de A y uno de B.', { n: 1 }],
        ['Ya van tres recetas completas.', { n: 3 }],
        ['A la cuarta se acaba A.', { n: 4, t: 'A se acabó; sobra 1 de B' }],
        ['A limita, aunque había más de A que de B.', {}],
      ], 'Divide lo que hay entre lo que pide la receta.'),
      xpHaz('hoja', 'La receta pide 3 de P y 2 de Q. Hay 12 de P y 10 de Q. Subraya el que limita.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['P'], ['Q'], ['Ninguno']], pista: 'Cuenta cuántas recetas permite cada uno.' }, 'P permite 4 recetas; Q, 5.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se esperaban 60 g y se obtuvieron 45 g. Pon lo que faltó y el rendimiento en %.', { slots: fila('faltó (g)', 'rendimiento'), fichas: ['15', '75', '25', '45', '133'], meta: ['15', '75'], alto: 96, pista: 'Divide lo obtenido entre lo esperado.' }, '$45 \\div 60 = 0.75$.')],
  ], 'Paquetes, receta y el que se acaba.');

  xpLec('icf-cn-reacciones-3', [
    ['La escala',
      xpMira('dibujo', 'Empecemos por la idea: el **pH** dice qué tan ácida o básica es una disolución.', { dib: escala, v: { h: 7, t: 'neutra' }, alto: 136 }, [
        ['En la mitad está el 7: neutra.', {}],
        ['El vinagre tiene cerca de 3: ácido.', { h: 3, t: 'ácida' }],
        ['Un limpiador de hornos llega a 13: básico.', { h: 13, t: 'básica' }],
        ['A menor pH, más iones H⁺.', { h: 2, t: 'muchos H⁺' }],
        ['A mayor pH, menos.', { h: 11, t: 'pocos H⁺' }],
      ], 'Menos de 7 ácida; más de 7 básica.'),
      xpHaz('dibujo', 'Arrastra la marca a un pH **neutro**.', { dib: escala, v: { h: 4, t: '' }, metas: { h: 7 }, manijas: [{ k: 'h', min: 0, max: 14, paso: 1, et: 'pH' }], alto: 190, pista: 'Es el punto medio de la escala.' }, 'El 7 es neutro.')],
    ['Por diez',
      xpMira('hoja', 'Segunda idea: cada paso de pH es **por diez**.', { paras: [['pH 6: 1 parte de H⁺'], ['pH 5: 10 partes'], ['pH 4: 100 partes'], ['«pH 4 es dos más que pH 6»']] }, [
        ['Tomemos la de pH 6 como una parte.', { luz: [0] }],
        ['Un paso más ácida: diez veces.', { luz: [1] }],
        ['Dos pasos: cien veces.', { luz: [2] }, '$10 \\cdot 10 = 100$'],
        ['No se restan: se multiplican dieces.', { luz: [3], tacha: [3] }],
        ['Pequeños cambios de pH son grandes.', {}],
      ], 'Cuenta los pasos: un diez por cada uno.'),
      xpHaz('hoja', 'P tiene pH 8 y Q, pH 5. Subraya cuántas veces más H⁺ tiene Q.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3'], ['30'], ['1 000']], pista: 'Son tres pasos.' }, '$10 \\cdot 10 \\cdot 10$.')],
    ['Neutralizar y diluir',
      xpMira('hoja', 'Tercera idea: **neutralizar** no es lo mismo que **diluir**.', { paras: [['Ácido + base → agua + sal'], ['Ácido + agua → menos ácido'], ['Con base de más: básica'], ['Con agua de más: se acerca a 7']] }, [
        ['Los H⁺ y los OH⁻ forman agua.', { luz: [0], nota: { 0: 'neutralizar' } }],
        ['Aquí solo se reparten más.', { luz: [1], nota: { 1: 'diluir' } }],
        ['Si se pasa, cambia de lado.', { luz: [2] }],
        ['Con agua nunca cambia de lado.', { luz: [3] }],
        ['Ante un ácido fuerte, siempre con cuidado.', {}],
      ], 'Con base se puede pasar de 7; con agua, no.'),
      xpHaz('hoja', 'Pon al margen qué se hizo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['diluir', 'neutralizar'], meta: [1, 0], paras: [['Echar bicarbonato a un jugo ácido'], ['Echarle agua al jugo ácido']], pista: 'Alguna no va ahí: ¿se agregó una base o agua?' }, 'Con base se neutraliza; con agua se diluye.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un cultivo necesita pH entre 6 y 7; el suelo tiene 8.5. Subraya lo que conviene agregar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cal, que es básica'], ['Un abono ácido'], ['Jabón']], pista: '¿Hacia qué lado hay que moverlo?' }, 'Está básico: hay que bajarlo con algo ácido.')],
  ], 'La escala, por diez y neutralizar.');
}
;
//#archivo js/explora-icf-cn-10.js
// Preicfes · Ciencias Naturales, mundo 10 «Ondas, Luz y Sonido» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Onda con n vueltas, amplitud A y fase g; un corcho en x = 170.
  const onda = (v, K) => { const y = x => 80 - v.A * Math.sin(2 * Math.PI * (v.n * (x - 24) / 292 - v.g)); return K.l(24, 80, 316, 80, 'lm') + K.pl(Array.from({ length: 121 }, (_, i) => { const x = 24 + 292 * i / 120; return [x, y(x)]; }), 'la gr') + K.f(v.k, K.c(170, y(170), 8, 'ff')) + K.t(170, 160, v.t, 'ta'); };
  // Espejo: llega a g de la normal y sale a s.
  const espejo = (v, K) => { const c = [170, 140]; return K.l(40, 140, 300, 140, 'gr') + K.f(v.nn, K.l(170, 20, 170, 140, 'lm d') + K.t(178, 26, 'normal', 's tm', 'start')) + K.l(...K.at(...c, 110, 90 + v.g), ...c, 'la gr') + K.f(v.s, K.l(...c, ...K.at(...c, 110, 90 - v.g), 'lg gr')) + K.t(170, 170, v.t, 'ta'); };
  // Aire arriba, agua abajo: entra a g, sale a r.
  const agua = (v, K) => { const c = [170, 90]; return K.r(20, 90, 300, 86, 'fa', 0) + K.l(170, 14, 170, 172, 'lm d') + K.l(...K.at(...c, 84, 90 + v.g), ...c, 'gr') + K.f(v.s, K.l(...c, ...K.at(...c, 84, 270 + v.r), 'lg gr')) + K.t(30, 24, 'aire', 's tm', 'start') + K.t(30, 168, 'agua', 's tm', 'start') + K.t(170, 196, v.t, 'ta'); };

  xpLec('icf-cn-ondas-1', [
    ['Viaja la energía',
      xpMira('dibujo', 'Empecemos por la idea: la onda **viaja**; la materia **vibra** y se queda.', { dib: onda, v: { n: 3, A: 34, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['Una onda avanza por el agua.', { g: 1 }],
        ['Hay un corcho flotando.', { k: 1 }],
        ['Cuando pasa la cresta, sube.', { g: 1.25, t: 'sube y baja' }],
        ['Después baja, en el mismo sitio.', { g: 1.75 }],
        ['Lo que avanzó fue la energía.', { t: 'viaja la energía' }],
      ], 'Viaja la energía, no la materia.'),
      xpHaz('hoja', 'En un estadio, la gente hace «la ola» sin moverse de su puesto. Subraya lo que viaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las personas'], ['El movimiento que pasa de uno a otro'], ['Las sillas']], pista: '¿Alguien cambia de puesto?' }, 'La perturbación pasa; cada quien se queda.')],
    ['Medir una onda',
      xpMira('dibujo', 'Segunda idea: **amplitud**, **longitud** y **frecuencia** son medidas distintas.', { dib: onda, v: { n: 2, A: 20, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['De cresta a cresta: la longitud de onda.', { t: 'longitud: cresta a cresta' }],
        ['Si crece la altura, crece la amplitud.', { A: 46, t: 'más amplitud: más fuerte' }],
        ['Si hay más crestas, la longitud es menor.', { A: 30, n: 5, t: 'menos longitud' }],
        ['La frecuencia cuenta vibraciones por segundo.', { t: 'frecuencia en hertz' }],
        ['El periodo es lo que tarda una.', {}, '$T = \\tfrac{1}{f}$'],
      ], 'Altura, distancia y cuántas por segundo.'),
      xpHaz('fichas', 'Un punto vibra 30 veces en 6 s. Pon la frecuencia (Hz) y el periodo (s).', { slots: fila('frecuencia', 'periodo'), fichas: ['5', '0.2', '6', '30', '2'], meta: ['5', '0.2'], alto: 96, pista: 'Divide las vibraciones entre los segundos.' }, '$30 \\div 6 = 5$ Hz y $1 \\div 5 = 0.2$ s.')],
    ['La rapidez',
      xpMira('fichas', 'Tercera idea: **rapidez = longitud por frecuencia**, y la pone el **medio**.', { slots: fila('longitud', 'frecuencia', 'rapidez'), fichas: ['2 m', '170 Hz', '340 m/s'], alto: 96 }, [
        ['En el aire el sonido va a 340.', { pon: { 2: '340 m/s' } }],
        ['Con 170 vibraciones por segundo…', { pon: { 1: '170 Hz' } }],
        ['…cada onda mide dos metros.', { pon: { 0: '2 m' } }, '$2 \\cdot 170 = 340$'],
        ['Con el doble de frecuencia mediría uno.', {}, '$1 \\cdot 340 = 340$'],
        ['La rapidez no cambió: el medio es el mismo.', {}],
      ], 'Si una sube, la otra baja.'),
      xpHaz('fichas', 'Una ola viaja a 6 m/s con longitud de 3 m. Pon la frecuencia, y la longitud si la frecuencia sube a 6 Hz.', { slots: fila('frecuencia', 'nueva longitud'), fichas: ['2', '1', '18', '3', '6'], meta: ['2', '1'], alto: 96, pista: 'El producto debe dar 6.' }, '$3 \\cdot 2 = 6$ y $1 \\cdot 6 = 6$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En el mismo aire, un pito agudo y un tambor grave. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El pito llega primero'], ['El tambor llega primero'], ['Llegan a la vez, si suenan juntos y a igual distancia']], pista: '¿Quién pone la rapidez?' }, 'El medio pone la rapidez: es la misma.')],
  ], 'Energía, medidas y rapidez.');

  xpLec('icf-cn-ondas-2', [
    ['Rebotar',
      xpMira('dibujo', 'Empecemos por la idea: en la **reflexión** sale con el **mismo ángulo**.', { dib: espejo, v: { g: 30, nn: 0, s: 0, t: '' }, alto: 180 }, [
        ['Un rayo llega a un espejo.', {}],
        ['La normal es perpendicular al espejo.', { nn: 1 }],
        ['Sale al otro lado, con el mismo ángulo.', { s: 1, t: '30° y 30°' }],
        ['Si llega más inclinado, sale más inclinado.', { g: 60, t: '60° y 60°' }],
        ['Los ángulos se miden desde la normal.', {}],
      ], 'El ángulo que llega es igual al que sale.'),
      xpHaz('fichas', 'Un rayo llega a 25° de la normal. Pon el ángulo de salida y el que hay entre los dos rayos.', { slots: fila('sale', 'entre los dos'), fichas: ['25', '50', '65', '90', '130'], meta: ['25', '50'], alto: 96, pista: 'La normal está en medio de los dos.' }, '25° a cada lado: 50°.')],
    ['El eco',
      xpMira('fichas', 'Segunda idea: el **eco** recorre **ida y vuelta**.', { slots: fila('tiempo', 'recorrido', 'distancia'), fichas: ['1 s', '340 m', '170 m'], alto: 96 }, [
        ['El eco vuelve en un segundo.', { pon: { 0: '1 s' } }],
        ['El sonido recorrió 340 metros.', { pon: { 1: '340 m' } }],
        ['Pero fue y volvió.', {}],
        ['La pared está a la mitad.', { pon: { 2: '170 m' } }, '$340 \\div 2 = 170$'],
        ['Así miden los barcos y los murciélagos.', {}],
      ], 'Recorrido entre dos.'),
      xpHaz('fichas', 'En el agua (1 500 m/s) el eco vuelve en 2 s. Pon el recorrido y la profundidad, en metros.', { slots: fila('recorrido', 'profundidad'), fichas: ['3 000', '1 500', '750', '6 000', '2'], meta: ['3 000', '1 500'], alto: 96, pista: 'Multiplica y después parte en dos.' }, '$1\\,500 \\cdot 2 = 3\\,000$; la mitad, 1 500.')],
    ['Doblarse',
      xpMira('dibujo', 'Tercera idea: en la **refracción** cambia la rapidez y, si entra inclinada, la **dirección**.', { dib: agua, v: { g: 50, r: 35, s: 0, t: '' }, alto: 206 }, [
        ['Un rayo llega inclinado al agua.', {}],
        ['En el agua va más despacio.', { t: 'más despacio' }],
        ['Por eso se acerca a la normal.', { s: 1, t: 'se acerca a la normal' }],
        ['Si llega derecho, no se desvía.', { g: 0, r: 0, t: 'derecho: sin desvío' }],
        ['Al salir al aire ocurre lo contrario.', { g: 50, r: 35, t: 'al salir, se aleja' }],
      ], 'Más despacio, se acerca; más rápido, se aleja.'),
      xpHaz('hoja', 'La luz sale inclinada de un diamante al aire, donde va más rápido. Subraya lo que hace.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Se aleja de la normal'], ['Se acerca a la normal'], ['Cambia de color']], pista: '¿Va más rápido o más despacio al salir?' }, 'Al ir más rápido se aleja de la normal.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Pon al margen qué fenómeno hace posible cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['reflexión total', 'refracción', 'absorción'], meta: [1, 0, 2], paras: [['Una lupa que agranda'], ['La luz que viaja por una fibra óptica'], ['Un estudio de grabación con espumas, sin eco']], pista: 'Alguna no va ahí: ¿se dobla, rebota adentro o se queda?' }, 'Se dobla, rebota toda adentro y se queda en la espuma.')],
  ], 'Rebotar, volver y doblarse.');
}
;
//#archivo js/explora-icf-cn-11.js
// Preicfes · Ciencias Naturales, mundos 11 «Gases y Disoluciones» y 12 «Electricidad y Magnetismo» (Explora). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const puntos = (K, x, y, w, h, n) => Array.from({ length: n }, (_, i) => K.c(x + 8 + ((i * 37) % 97) / 97 * (w - 16), y + 8 + ((i * 59) % 83) / 83 * (h - 16), 3.2, 'ff')).join('');
  // Émbolo con volumen w (0 a 1).
  const emb = (v, K) => { const w = 230 * v.w; return K.r(40, 30, 250, 76, 'fn', 4) + K.r(40, 30, w, 76, 'fa', 2) + puntos(K, 40, 30, w, 76, 18) + K.r(40 + w, 26, 10, 84, 'fk', 2) + K.t(170, 140, v.t, 'ta'); };
  const globo = (v, K) => K.c(170, 76, v.r, 'fa') + K.l(170, 76 + v.r, 170, 148, 'lm') + K.t(170, 168, v.t, 'ta');
  // Vaso con nivel n y 16 granos de soluto.
  const vaso = (v, K) => K.r(120, 16, 100, 110, 'fn', 4) + K.r(120, 126 - 110 * v.n, 100, 110 * v.n, 'fa', 2) + Array.from({ length: 16 }, (_, i) => K.c(130 + (i * 43 % 83), 122 - (i * 29 % 89) / 89 * Math.max(6, 110 * v.n - 10), 2.8, 'ff')).join('') + K.t(170, 152, v.t, 'ta');
  const pila = (K, x, y) => K.l(x - 10, y, x + 10, y, 'gr') + K.l(x - 5, y + 8, x + 5, y + 8, 'gr'), bom = (K, x, y, on) => K.c(x, y, 13, on > 0.5 ? 'ff' : 'fc') + K.l(x - 6, y - 6, x + 6, y + 6, 'lm') + K.l(x - 6, y + 6, x + 6, y - 6, 'lm');
  // Serie (p = 0) o paralelo (p = 1) con dos bombillos; a y b prendidos.
  const circ = (v, K) => (v.p < 0.5 ? K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + bom(K, 130, 24, v.a) + bom(K, 210, 24, v.b) : K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + K.l(170, 24, 170, 120, 'gr') + bom(K, 170, 72, v.a) + bom(K, 270, 72, v.b)) + pila(K, 70, 70) + K.t(170, 154, v.t, 'ta');
  const cargas = (v, K) => { const x = v.d / 2; return K.c(170 - x, 70, 20, v.s > 0 ? 'ff' : 'fa') + K.t(170 - x, 76, v.s > 0 ? '+' : '−', 'b') + K.c(170 + x, 70, 20, 'fa') + K.t(170 + x, 76, '−', 'b') + K.l(170 - x, 110, 170 - x + (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.l(170 + x, 110, 170 + x - (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.t(170, 148, v.t, 'ta'); };

  xpLec('icf-cn-gases-1', [
    ['Boyle',
      xpMira('dibujo', 'Empecemos por la idea: con la **misma temperatura**, presión por volumen **no cambia**.', { dib: emb, v: { w: 1, t: '12 L a 1 atm' }, alto: 152 }, [
        ['El gas ocupa doce litros.', {}],
        ['Sus partículas chocan con las paredes.', {}],
        ['A la mitad, chocan el doble de seguido.', { w: 0.5, t: '6 L a 2 atm' }, '$12 \\cdot 1 = 6 \\cdot 2$'],
        ['A la cuarta parte, cuatro veces.', { w: 0.25, t: '3 L a 4 atm' }, '$3 \\cdot 4 = 12$'],
        ['El producto siempre es el mismo.', {}],
      ], 'Menos volumen, más presión.'),
      xpHaz('fichas', 'Un gas ocupa 10 L a 3 atm. Pon el producto y el volumen a 5 atm.', { slots: fila('producto', 'litros'), fichas: ['30', '6', '15', '50', '2'], meta: ['30', '6'], alto: 96, pista: 'Multiplica y después divide entre 5.' }, '$10 \\cdot 3 = 30$ y $30 \\div 5 = 6$.')],
    ['Charles',
      xpMira('dibujo', 'Segunda idea: con la **misma presión**, el volumen sigue a los **kelvin**.', { dib: globo, v: { r: 40, t: '200 K: 4 L' }, alto: 178 }, [
        ['Un globo a doscientos kelvin.', {}],
        ['Al calentarlo, sus partículas empujan más.', { r: 46, t: '300 K: 6 L' }, '$\\tfrac{4}{200} = \\tfrac{6}{300}$'],
        ['Con el doble de kelvin, el doble de volumen.', { r: 50, t: '400 K: 8 L' }],
        ['Para pasar de Celsius se suman 273.', {}, '$27 + 273 = 300$'],
        ['En Celsius la proporción no vale.', {}],
      ], 'Volumen y kelvin, en proporción.'),
      xpHaz('fichas', 'Pon 7 °C en kelvin, y el volumen de 5 L a 280 K si pasa a 560 K.', { slots: fila('kelvin', 'litros'), fichas: ['280', '10', '266', '2.5', '7'], meta: ['280', '10'], alto: 96, pista: 'Suma 273; los kelvin se duplican.' }, '$7 + 273 = 280$; el doble de 5 es 10.')],
    ['Recipiente rígido',
      xpMira('hoja', 'Tercera idea: si el **volumen** no cambia, la **presión** sigue a los kelvin.', { paras: [['Lata a 300 K: 2 atm'], ['Lata a 450 K: 3 atm'], ['Más partículas, más presión'], ['PV = nRT']] }, [
        ['La lata no puede crecer.', { luz: [0] }],
        ['Con 1.5 veces los kelvin, 1.5 veces la presión.', { luz: [1] }, '$2 \\cdot 1.5 = 3$'],
        ['Por eso no se arroja al fuego.', { luz: [1] }],
        ['Al inflar entran más partículas.', { luz: [2] }],
        ['Una sola ecuación lo reúne todo.', { luz: [3] }],
      ], 'Mira qué queda fijo.'),
      xpHaz('hoja', 'Pon al margen qué queda fijo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['el volumen', 'la temperatura'], meta: [1, 0], paras: [['Se empuja despacio una jeringa tapada'], ['Se calienta un tanque de acero cerrado']], pista: 'Alguna no va ahí: ¿cambia el tamaño o el calor?' }, 'Despacio, la temperatura no cambia; el acero no crece.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una llanta a 2 atm y 300 K se calienta a 330 K sin cambiar de tamaño. Subraya su presión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['1.8 atm'], ['2.2 atm'], ['32 atm']], pista: 'Los kelvin subieron un 10 %.' }, '$2 \\cdot 1.1 = 2.2$.')],
  ], 'Boyle, Charles y lo que queda fijo.');

  xpLec('icf-cn-gases-2', [
    ['Soluto y disolución',
      xpMira('dibujo', 'Empecemos por la idea: la concentración compara el **soluto** con la **disolución**.', { dib: vaso, v: { n: 0.4, t: '16 g en 2 L' }, alto: 162 }, [
        ['Los puntos son el soluto.', {}],
        ['Dieciséis gramos en dos litros.', {}, '$16 \\div 2 = 8$ g/L'],
        ['Si hay más agua, están más separados.', { n: 0.8, t: '16 g en 4 L' }, '$16 \\div 4 = 4$ g/L'],
        ['El soluto es el mismo.', {}],
        ['Mucho soluto no es lo mismo que concentrado.', {}],
      ], 'Soluto entre disolución.'),
      xpHaz('fichas', 'Pon la concentración de 18 g en 3 L, y el porcentaje de 4 g en 80 g de disolución.', { slots: fila('g/L', '%'), fichas: ['6', '5', '54', '4', '20'], meta: ['6', '5'], alto: 96, pista: 'Divide en los dos casos.' }, '$18 \\div 3 = 6$ y $4 \\div 80 = 5\\%$.')],
    ['Diluir',
      xpMira('fichas', 'Segunda idea: al **diluir**, concentración por volumen **no cambia**.', { slots: fila('antes', 'después', 'se agrega'), fichas: ['1 L', '3 L', '2 L'], alto: 96 }, [
        ['Un litro a doce gramos por litro.', { pon: { 0: '1 L' } }],
        ['Se quiere a cuatro gramos por litro.', {}],
        ['Los doce gramos llenan tres litros.', { pon: { 1: '3 L' } }, '$12 \\div 4 = 3$'],
        ['Se agregan dos, no tres.', { pon: { 2: '2 L' } }, '$3 - 1 = 2$'],
        ['Ojo: el volumen final no es lo agregado.', {}],
      ], 'Gramos iguales; resta lo que ya había.'),
      xpHaz('fichas', '3 L a 8 g/L se llevan a 2 g/L. Pon el volumen final y el agua que se agrega.', { slots: fila('final (L)', 'agua (L)'), fichas: ['12', '9', '24', '8', '3'], meta: ['12', '9'], alto: 96, pista: 'Hay 24 g.' }, '$24 \\div 2 = 12$ y $12 - 3 = 9$.')],
    ['Otras cosas que se hacen',
      xpMira('hoja', 'Tercera idea: **evaporar** concentra; **sacar** un poco no cambia nada.', { paras: [['Evaporar agua'], ['Agregar soluto'], ['Servir un vaso'], ['1 ppm = 1 mg por kg']] }, [
        ['Menos agua, mismo soluto.', { luz: [0], nota: { 0: 'sube' } }],
        ['Más soluto, casi el mismo volumen.', { luz: [1], nota: { 1: 'sube' } }],
        ['Sale soluto y sale agua por igual.', { luz: [2], nota: { 2: 'no cambia' } }],
        ['Para cantidades mínimas: partes por millón.', { luz: [3] }],
        ['En un remedio, un cero de más importa.', {}],
      ], 'Pregunta qué salió y qué entró.'),
      xpHaz('hoja', 'De 1 L a 6 g/L se evapora medio litro de agua. Subraya la nueva concentración.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3 g/L'], ['6 g/L'], ['12 g/L']], pista: 'Los 6 g quedan en medio litro.' }, '$6 \\div 0.5 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un agua tiene 5 mg de cloro en 4 kg; lo permitido es hasta 2 ppm. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cumple: 1.25 ppm'], ['No cumple: 5 ppm'], ['No cumple: 20 ppm']], pista: 'Divide los miligramos entre los kilogramos.' }, '$5 \\div 4 = 1.25$.')],
  ], 'Soluto entre disolución, diluir y lo que cambia.');

  xpLec('icf-cn-electrico-1', [
    ['Ohm',
      xpMira('fichas', 'Empecemos por la idea: **voltaje = corriente · resistencia**.', { slots: fila('voltaje', 'resistencia', 'corriente'), fichas: ['9 V', '3 Ω', '3 A'], alto: 96 }, [
        ['La pila empuja con nueve voltios.', { pon: { 0: '9 V' } }],
        ['La resistencia se opone: tres ohmios.', { pon: { 1: '3 Ω' } }],
        ['Entonces pasan tres amperios.', { pon: { 2: '3 A' } }, '$9 \\div 3 = 3$'],
        ['Con el doble de resistencia, la mitad.', {}, '$9 \\div 6 = 1.5$'],
        ['Sin camino cerrado no pasa nada.', {}],
      ], 'Corriente es voltaje entre resistencia.'),
      xpHaz('fichas', 'Pon la corriente de 20 V en 5 Ω, y el voltaje que hace pasar 3 A por 7 Ω.', { slots: fila('corriente', 'voltaje'), fichas: ['4 A', '21 V', '100 A', '10 V', '2 A'], meta: ['4 A', '21 V'], alto: 96, pista: 'Divide en la primera y multiplica en la segunda.' }, '$20 \\div 5 = 4$ y $3 \\cdot 7 = 21$.')],
    ['Serie y paralelo',
      xpMira('dibujo', 'Segunda idea: en **serie** hay un camino; en **paralelo**, varios.', { dib: circ, v: { p: 0, a: 1, b: 1, t: 'en serie' }, alto: 164 }, [
        ['Dos bombillos en el mismo camino.', {}],
        ['Si uno se quema, se corta el camino.', { a: 0, b: 0, t: 'se apagan los dos' }],
        ['Ahora cada uno tiene el suyo.', { p: 1, a: 1, b: 1, t: 'en paralelo' }],
        ['Si uno se quema, el otro sigue.', { a: 0, t: 'el otro sigue' }],
        ['En serie se suman las resistencias.', {}, '$4 + 6 = 10$ Ω'],
      ], 'Serie: un camino. Paralelo: varios.'),
      xpHaz('fichas', '6 V en paralelo a dos resistencias de 3 Ω. Pon la corriente de cada rama y la total.', { slots: fila('cada rama', 'total'), fichas: ['2 A', '4 A', '1 A', '6 A', '3 A'], meta: ['2 A', '4 A'], alto: 96, pista: 'Cada una recibe los 6 V.' }, '$6 \\div 3 = 2$ y $2 + 2 = 4$.')],
    ['Potencia',
      xpMira('hoja', 'Tercera idea: **potencia = voltaje · corriente**; la energía es potencia por **tiempo**.', { paras: [['120 V · 5 A = 600 W'], ['600 W · 2 h = 1 200 Wh'], ['1 000 Wh = 1 kWh'], ['Recibo: se cobran kWh']] }, [
        ['Un horno pequeño usa esto.', { luz: [0] }],
        ['En dos horas gasta esta energía.', { luz: [1] }],
        ['Mil vatios hora son un kilovatio hora.', { luz: [2] }],
        ['Eso se paga en el recibo.', { luz: [3] }],
        ['Poca potencia por mucho tiempo también suma.', {}],
      ], 'Vatios por horas.'),
      xpHaz('fichas', 'Un televisor de 80 W encendido 5 h. Pon los Wh y los kWh.', { slots: fila('Wh', 'kWh'), fichas: ['400', '0.4', '16', '4', '40'], meta: ['400', '0.4'], alto: 96, pista: 'Multiplica y después divide entre mil.' }, '$80 \\cdot 5 = 400$ Wh.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En serie, 12 V con 2 Ω y 4 Ω. Subraya el voltaje de la resistencia de **4 Ω**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['12 V'], ['8 V'], ['4 V']], pista: 'Halla primero la corriente.' }, '$12 \\div 6 = 2$ A y $2 \\cdot 4 = 8$ V.')],
  ], 'Ohm, caminos y vatios por horas.');

  xpLec('icf-cn-electrico-2', [
    ['Cargas',
      xpMira('dibujo', 'Empecemos por la idea: iguales se **repelen**, distintas se **atraen**; y la **distancia** importa mucho.', { dib: cargas, v: { d: 160, s: -1, f: 9, t: '' }, alto: 158 }, [
        ['Dos cargas negativas se repelen.', { t: 'iguales: se repelen' }],
        ['Una positiva y una negativa se atraen.', { s: 1, t: 'distintas: se atraen' }],
        ['Al acercarse, la fuerza crece.', { d: 80, f: 36, t: 'a la mitad: 4 veces más' }],
        ['Al alejarse, baja con el cuadrado.', { d: 200, f: 5.8, t: 'más lejos, menos' }],
        ['La carga no se crea: pasa de un cuerpo a otro.', {}],
      ], 'Al doble de lejos, la cuarta parte.'),
      xpHaz('fichas', 'Dos cargas se atraen con fuerza 100. Pon la fuerza al doble de distancia y con una carga tres veces mayor.', { slots: fila('doble distancia', 'carga · 3'), fichas: ['25', '300', '50', '900', '200'], meta: ['25', '300'], alto: 96, pista: 'La distancia, al cuadrado; la carga, no.' }, '$100 \\div 4 = 25$ y $100 \\cdot 3 = 300$.')],
    ['Imanes',
      xpMira('hoja', 'Segunda idea: todo imán tiene **dos polos**, aunque se parta.', { paras: [['N con S: se atraen'], ['N con N: se repelen'], ['Partido: N-S y N-S'], ['Atrae hierro, níquel y cobalto'], ['No atrae cobre ni aluminio']] }, [
        ['Los polos distintos se buscan.', { luz: [0] }],
        ['Polos iguales se rechazan.', { luz: [1] }],
        ['Al partirlo salen dos imanes completos.', { luz: [2] }],
        ['Atrae solo algunos metales.', { luz: [3] }],
        ['Y deja quietos a otros.', { luz: [4], tacha: [4] }],
      ], 'Dos polos, siempre.'),
      xpHaz('hoja', 'Subraya lo que un imán **sí** atrae.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Alambre de cobre'], ['Papel de aluminio'], ['Puntilla de hierro']], pista: 'No atrae todos los metales.' }, 'El hierro sí; cobre y aluminio, no.')],
    ['De ida y vuelta',
      xpMira('hoja', 'Tercera idea: la **corriente** produce magnetismo y el **imán que se mueve**, corriente.', { paras: [['Alambre + clavo + pila'], ['Más vueltas, más fuerza'], ['Imán que entra y sale de una bobina'], ['Generador de una represa']] }, [
        ['Con corriente, el clavo atrae.', { luz: [0], nota: { 0: 'electroimán' } }],
        ['Se puede apagar y hacer más fuerte.', { luz: [1] }],
        ['Al mover el imán aparece corriente.', { luz: [2], nota: { 2: 'inducción' } }],
        ['Si se queda quieto, no.', { luz: [2] }],
        ['Así se produce casi toda la electricidad.', { luz: [3] }],
      ], 'Ida: electroimán. Vuelta: inducción.'),
      xpHaz('hoja', 'Pon al margen qué ocurre.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['inducción', 'electroimán'], meta: [1, 0], paras: [['Una cerradura que se abre con un botón y corriente'], ['Una bicicleta cuya rueda mueve un imán y prende una luz']], pista: 'Alguna no va ahí: ¿entra corriente o sale corriente?' }, 'La cerradura recibe corriente; la bicicleta la produce.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un imán quieto dentro de una bobina no prende la luz. Subraya qué hay que hacer.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Mover el imán'], ['Enfriar la bobina'], ['Pintar el imán']], pista: 'La corriente aparece con un cambio.' }, 'Al moverlo aparece corriente.')],
  ], 'Cargas, polos, y de ida y vuelta.');
}
;
//#archivo js/explora-icf-cn-12.js
// Preicfes · Ciencias Naturales, mundo 13 «Ciencia y Sociedad» (Explora, escenas «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  xpLec('icf-cn-cts-1', [
    ['Prevenir y curar',
      xpMira('hoja', 'Empecemos por la idea: **vacuna** previene, **antibiótico** mata **bacterias**; contra virus, no.', { paras: [['Vacuna: enseña a las defensas'], ['Antibiótico: contra bacterias'], ['Antibiótico para la gripa'], ['Muchos vacunados protegen a otros']] }, [
        ['Deja memoria para reconocer al virus.', { luz: [0] }],
        ['Este solo sirve contra bacterias.', { luz: [1] }],
        ['La gripa es un virus: no sirve.', { luz: [2], tacha: [2] }],
        ['Y crea bacterias resistentes.', { luz: [1] }],
        ['Si casi todos están protegidos, no circula.', { luz: [3] }],
      ], 'Prevenir no es curar.'),
      xpHaz('hoja', 'Un niño tiene varicela, causada por un virus. Subraya lo que **no** sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Reposo y líquidos'], ['Un antibiótico contra el virus'], ['No contagiar a otros']], pista: '¿Contra qué actúa el antibiótico?' }, 'Los antibióticos no actúan contra virus.')],
    ['Comparar riesgos',
      xpMira('fichas', 'Segunda idea: los riesgos se comparan en **proporción**.', { slots: fila('con', 'sin'), fichas: ['1 %', '15 %'], alto: 96 }, [
        ['Con cinturón, 5 heridos de 500.', { pon: { 0: '1 %' } }, '$5 \\div 500$'],
        ['Sin cinturón, 3 heridos de 20.', { pon: { 1: '15 %' } }, '$3 \\div 20$'],
        ['Cinco es más que tres…', {}],
        ['…pero el riesgo fue quince veces menor.', {}, '$15 \\div 1 = 15$'],
        ['Los grupos no eran del mismo tamaño.', {}],
      ], 'Divide cada caso entre su grupo.'),
      xpHaz('fichas', 'Con vacuna enfermaron 6 de 300; sin ella, 9 de 90. Pon los dos riesgos.', { slots: fila('con', 'sin'), fichas: ['2 %', '10 %', '6 %', '9 %', '3 %'], meta: ['2 %', '10 %'], alto: 96, pista: 'Divide cada uno entre su grupo.' }, '$6 \\div 300$ y $9 \\div 90$.')],
    ['Ver por dentro',
      xpMira('hoja', 'Tercera idea: cada tecnología **ve** algo y tiene su **cuidado**.', { paras: [['Rayos X: huesos'], ['Ecografía: sonido'], ['Resonancia: imanes'], ['Rayos X: lo necesario']] }, [
        ['Atraviesan la carne y paran en el hueso.', { luz: [0] }],
        ['Sirve para ver a un bebé.', { luz: [1] }],
        ['Muestra tejidos blandos; sin metales.', { luz: [2] }],
        ['Su energía puede dañar el ADN.', { luz: [3] }],
        ['Se compara el beneficio con el riesgo.', {}],
      ], 'Beneficio frente a riesgo.'),
      xpHaz('hoja', 'Pon al margen la técnica más adecuada.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['ecografía', 'rayos X'], meta: [1, 0], paras: [['Ver si un brazo se quebró'], ['Ver el corazón de un bebé por nacer']], pista: 'Alguna no va ahí: ¿hueso o bebé?' }, 'El hueso detiene los rayos X; el sonido no daña el ADN.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Se enfermaron 40 vacunados y 30 sin vacunar». Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El color de la vacuna'], ['El nombre del médico'], ['Cuántos había en cada grupo']], pista: '¿Con qué se divide?' }, 'Sin el tamaño de los grupos no hay riesgo que comparar.')],
  ], 'Prevenir, comparar y ver por dentro.');

  xpLec('icf-cn-cts-2', [
    ['Energía',
      xpMira('hoja', 'Empecemos por la idea: toda fuente de energía tiene **ventajas** y **costos**.', { paras: [['Sol y viento: se reponen'], ['No soplan ni brillan siempre'], ['Carbón y petróleo: se acaban'], ['Todas cuestan al fabricarse']] }, [
        ['Estas fuentes son renovables.', { luz: [0], nota: { 0: 'renovables' } }],
        ['Por eso hacen falta baterías.', { luz: [1] }],
        ['Sueltan gases al quemarse.', { luz: [2], nota: { 2: 'no renovables' } }],
        ['Paneles y baterías exigen minerales.', { luz: [3] }],
        ['Se decide mirando todo el ciclo.', {}],
      ], 'Ventajas y costos de principio a fin.'),
      xpHaz('hoja', 'Subraya la **desventaja** de los paneles solares.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Se repone cada día'], ['De noche no producen'], ['No sueltan humo al funcionar']], pista: 'Las otras son ventajas.' }, 'De noche hace falta guardar energía.')],
    ['Efecto invernadero',
      xpMira('hoja', 'Segunda idea: el efecto invernadero es **necesario**; el problema es su **aumento**.', { paras: [['Entra la luz del sol'], ['La Tierra devuelve calor'], ['Los gases retienen una parte'], ['Más gases, más calor']] }, [
        ['La luz pasa y calienta el suelo.', { luz: [0] }],
        ['El suelo devuelve calor.', { luz: [1] }],
        ['Una parte no se escapa.', { luz: [2] }],
        ['Sin eso, el planeta sería helado.', { luz: [2] }],
        ['Al quemar y talar, los gases aumentan.', { luz: [3] }],
      ], 'Necesario, pero sin exceso.'),
      xpHaz('fichas', 'Un carro suelta 2 kg de CO₂ por cada 10 km. Pon los kg en 150 km y en un mes de 900 km.', { slots: fila('150 km', '900 km'), fichas: ['30', '180', '75', '300', '90'], meta: ['30', '180'], alto: 96, pista: 'Cuenta cuántos tramos de 10 km hay.' }, '$15 \\cdot 2 = 30$ y $90 \\cdot 2 = 180$.')],
    ['Residuos',
      xpMira('hoja', 'Tercera idea: primero **reducir**, después **reutilizar** y al final **reciclar**.', { paras: [['Reducir: no usar la bolsa'], ['Reutilizar: usarla otra vez'], ['Reciclar: fundirla'], ['Pilas: aparte']] }, [
        ['Lo que no se produce no contamina.', { luz: [0] }],
        ['Usar otra vez casi no gasta.', { luz: [1] }],
        ['Reciclar también gasta energía.', { luz: [2] }],
        ['Sus metales ensucian agua y suelo.', { luz: [3] }],
        ['Lo orgánico sirve de compost.', {}],
      ], 'En ese orden.'),
      xpHaz('hoja', 'Subraya la acción que es **reducir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Fundir botellas'], ['Sembrar en una lata vieja'], ['Llevar vaso propio y no pedir uno']], pista: 'Evita que el residuo aparezca.' }, 'No se produce el vaso desechable.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se quiere saber si una turbina afecta a los murciélagos. Subraya lo mejor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Contarlos antes y después, y en un lugar sin turbina'], ['Preguntar si les gustan'], ['Suponer que no']], pista: 'Mide y compara.' }, 'Comparar permite corregir.')],
  ], 'Costos, aumento y reducir primero.');

  xpLec('icf-cn-cts-3', [
    ['Testimonio y prueba',
      xpMira('hoja', 'Empecemos por la idea: un **testimonio** no es una **prueba**.', { paras: [['«A mí me sirvió»'], ['El dolor sube y baja solo'], ['Esperar mejorar ayuda: placebo'], ['Los que no mejoraron no aparecen']] }, [
        ['Un testimonio puede ser sincero.', { luz: [0] }],
        ['Pero quizá habría mejorado igual.', { luz: [1] }],
        ['O fue el efecto de esperarlo.', { luz: [2], nota: { 2: 'placebo' } }],
        ['Y solo se muestran los casos buenos.', { luz: [3] }],
        ['Por eso hace falta comparar.', {}],
      ], 'Sincero no es lo mismo que probado.'),
      xpHaz('hoja', 'Subraya la evidencia **más sólida** de que un jarabe sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Mil comentarios'], ['Lo toma una cantante'], ['Mejoró más que uno falso, al azar']], pista: 'Busca una comparación.' }, 'Hay grupo de control y azar.')],
    ['Un buen experimento',
      xpMira('hoja', 'Segunda idea: **azar**, **control** y **doble ciego** dejan **un solo** cambio.', { paras: [['Al azar: grupos parecidos'], ['Control: uno falso, igual'], ['Doble ciego: nadie sabe'], ['Lo único distinto: el remedio']] }, [
        ['Así no quedan los sanos a un lado.', { luz: [0] }],
        ['Todos creen recibir lo mismo.', { luz: [1] }],
        ['Ni el paciente ni quien mide lo sabe.', { luz: [2] }],
        ['Si hay diferencia, se sabe de qué es.', { luz: [3] }],
        ['Con pocos casos, puede ser el azar.', {}],
      ], 'Cambiar una sola cosa.'),
      xpHaz('hoja', 'Pon al margen qué regla se **incumplió**.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['control', 'azar'], meta: [1, 0], paras: [['Los jóvenes tomaron el remedio y los viejos, el falso'], ['Todos tomaron el remedio']], pista: 'Alguna no va ahí: ¿cómo se repartieron o con quién se comparó?' }, 'Se repartió por edad; y no hubo con quién comparar.')],
    ['Datos y valores',
      xpMira('hoja', 'Tercera idea: la ciencia **mide**; la sociedad **decide** con datos y valores.', { paras: [['¿Cuánto contamina?'], ['¿Se permite?'], ['¿Quién pagó el estudio?'], ['¿Lo repitieron otros?']] }, [
        ['Esta se responde midiendo.', { luz: [0], nota: { 0: 'datos' } }],
        ['Esta también mira lo que importa.', { luz: [1], nota: { 1: 'valores' } }],
        ['Si lo pagó el vendedor, con cuidado.', { luz: [2] }],
        ['Un estudio solo casi nunca basta.', { luz: [3] }],
        ['Decidir sin datos sale caro.', {}],
      ], 'Datos primero, y después valores.'),
      xpHaz('hoja', 'Subraya la pregunta que la ciencia **sola** puede responder.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Cuántos decibeles hay en la plaza?'], ['¿Debe cerrarse la discoteca?'], ['¿Es justo el cobro?']], pista: '¿Cuál basta con medir?' }, 'Los decibeles se miden; lo demás también se valora.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Con remedio mejoran 45 de 60; con placebo, 30 de 60. Pon los puntos de diferencia y cuántos de más mejoraron.', { slots: fila('puntos', 'de más'), fichas: ['25', '15', '75', '50', '45'], meta: ['25', '15'], alto: 96, pista: 'Pasa cada grupo a porcentaje.' }, '$75\\% - 50\\% = 25$ puntos y $45 - 30 = 15$.')],
  ], 'Comparar, un solo cambio y decidir.');
}
;
//#archivo js/explora-icf-en.js
// Preicfes · Inglés, mundo 1 «Avisos y Vocabulario» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-avisos-1', [
  ['¿Dónde está el aviso?',
    xpMira('hoja', 'Empecemos por la idea: un aviso tiene una palabra que **delata el lugar**.', { paras: [['Fasten your', 'seat belt.'], ['Do not feed the', 'animals.'], ['Try on', 'clothes', 'here.']] }, [
      ['Tres avisos sin lugar. ¿Dónde los verías?', {}],
      ['«Seat belt» es cinturón: un carro o un avión.', { luz: [1], nota: { 0: 'on a plane' } }],
      ['Y «animals» lleva a un zoológico.', { luz: [3], nota: { 1: 'at the zoo' } }],
      ['«Clothes» es ropa: una tienda para probarse.', { luz: [5], nota: { 2: 'in a shop' } }],
      ['No hace falta entender todo: basta la palabra clave.', { luz: [1, 3, 5] }],
    ], 'Busca la palabra que solo tiene sentido en un lugar.'),
    xpHaz('hoja', 'Pon al margen dónde se ve cada aviso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['in a hotel', 'at the beach', 'in a cinema'], meta: [2, 0, 1], paras: [['The film starts at 8.'], ['Leave your room key here.'], ['Do not swim after 5.']], pista: 'Alguno no va ahí: busca film, room y swim.' }, '«Film», «room» y «swim» delatan el lugar.')],
  ['¿Ordena o informa?',
    xpMira('hoja', 'Segunda idea: el verbo dice si el aviso **te pide algo** o solo **informa**.', { paras: [['You must wear a helmet.'], ['No smoking.'], ['Please wait here.'], ['The shop opens at nine.']] }, [
      ['«Must» obliga: hay que usar casco.', { luz: [0], nota: { 0: 'obliga' } }],
      ['«No» y un verbo en «-ing»: prohíbe.', { luz: [1], nota: { 1: 'prohíbe' } }],
      ['«Please» y un verbo: pide.', { luz: [2], nota: { 2: 'pide' } }],
      ['«Opens» solo cuenta a qué hora.', { luz: [3], nota: { 3: 'informa' } }],
      ['«Can» permite y «cannot» no deja.', {}],
    ], 'Must obliga, no -ing prohíbe, please pide; lo demás informa.'),
    xpHaz('hoja', 'Subraya los **dos** avisos que **prohíben**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Open until six.'], ['No parking.'], ['You can pay by card.'], ['You cannot take photos.']], pista: 'Alguno informa o permite. Busca «no -ing» o «cannot».' }, '«No parking» y «cannot» prohíben.')],
  ['Decirlo con otras palabras',
    xpMira('hoja', 'Tercera idea: la opción correcta casi nunca **repite** las palabras del aviso.', { letras: ['1', 'a', 'b', 'c'], paras: [['Children under five travel free.'], ['Children of five pay nothing.'], ['A child of three does not pay.'], ['Children cannot travel.']] }, [
      ['El aviso: los menores de cinco viajan gratis.', { luz: [0] }],
      ['La a repite «children» y «five», pero «under five» no incluye cinco.', { luz: [1], nota: { 1: 'falsa' } }],
      ['La b no repite casi nada y dice lo mismo: tres es menor que cinco.', { luz: [2], nota: { 2: 'igual' } }],
      ['La c cambia «free» por «cannot»: es otra cosa.', { luz: [3], nota: { 3: 'falsa' } }],
      ['Compara ideas, no palabras iguales.', {}],
    ], 'Desconfía de la opción que copia palabras: compara la idea.'),
    xpHaz('hoja', '«Cash only.» Subraya la opción que dice **lo mismo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['You can only buy cash.'], ['Only one person can pay.'], ['You cannot use a card.']], pista: 'Esa copia una palabra, pero cambia la idea.' }, 'Solo efectivo es lo mismo que no se puede usar tarjeta.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Keep this door closed. Baby sleeping.» Subraya dónde lo verías.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In a car park'], ['In a house'], ['In a football stadium']], pista: '¿Dónde hay una puerta y un bebé dormido?' }, '«Baby sleeping» delata el lugar.')],
], 'Palabra que delata, verbo que ordena o informa y la misma idea con otras palabras.');

xpLec('icf-en-avisos-2', [
  ['¿Persona, lugar o cosa?',
    xpMira('hoja', 'Empecemos por la idea: la descripción dice primero **qué clase** de palabra es.', { paras: [['This person', 'drives a bus.'], ['A place', 'where you see paintings.'], ['You use it', 'to cut bread.']] }, [
      ['«This person»: buscas una persona.', { luz: [0], nota: { 0: 'person' } }],
      ['Maneja un bus: «driver».', { luz: [1] }],
      ['«A place»: buscas un lugar. Pinturas: «museum».', { luz: [2, 3], nota: { 1: 'place' } }],
      ['«You use it»: buscas una cosa. Cortar pan: «knife».', { luz: [4, 5], nota: { 2: 'thing' } }],
      ['Con la clase ya descartas la mitad de las opciones.', {}],
    ], 'Primero la clase de palabra, después el significado.'),
    xpHaz('hoja', 'Pon al margen la palabra de cada descripción.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['kitchen', 'nurse', 'umbrella'], meta: [1, 2, 0], paras: [['This person helps sick people.'], ['You need it when it rains.'], ['You cook in this room.']], pista: 'Mira si pide persona, cosa o lugar.' }, '«Person», «it» y «room» ya dicen la clase.')],
  ['Las pistas del verbo',
    xpMira('hoja', 'Segunda idea: el verbo dice **cuándo** pasa algo.', { paras: [['She lived in Cali.'], ['She lives in Cali.'], ['She will live in Cali.'], ['She has lived here for years.']] }, [
      ['«Lived» termina en «-ed»: eso ya pasó.', { luz: [0], nota: { 0: 'past' } }],
      ['«Lives» está en presente: es así ahora.', { luz: [1], nota: { 1: 'present' } }],
      ['«Will live» habla del futuro: pasará.', { luz: [2], nota: { 2: 'future' } }],
      ['«Has lived… for years»: empezó antes y sigue.', { luz: [3], nota: { 3: 'until now' } }],
      ['«Ago» va con el pasado; «now», con el presente.', {}],
    ], '-ed ya pasó, will pasará, has… for sigue hasta hoy.'),
    xpHaz('hoja', 'Subraya la oración que dice que **todavía** enseña.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He taught here ten years ago.'], ['He has taught here for ten years.'], ['He will teach here in ten years.']], pista: 'Esa ya terminó o no ha empezado. Busca «has… for».' }, '«Has taught for ten years»: empezó y sigue.')],
  ['Palabras que apuntan',
    xpMira('hoja', 'Tercera idea: «he», «she», «it» y «they» **apuntan** a algo ya dicho.', { paras: [['Laura', 'gave', 'the keys', 'to', 'her brother.'], ['He', 'lost', 'them', 'that night.']] }, [
      ['«He» es un hombre: ¿quién?', { luz: [5] }],
      ['En la oración hay un hombre: su hermano, «her brother».', { luz: [4, 5], sello: { 5: 'brother' } }],
      ['«Them» son varias cosas: ¿cuáles?', { luz: [7] }],
      ['Varias cosas hay una sola vez: las llaves, «the keys».', { luz: [2, 7], sello: { 7: 'keys' } }],
      ['«It» es una sola cosa; «they» y «them», varias.', {}],
    ], 'He, she: personas. It: una cosa. They, them: varias.'),
    xpHaz('hoja', 'Subraya a qué apunta «it»: «She read it in one day».', { modo: 'toca', meta: [2], paras: [['Marta', 'took two pens', 'and a book', 'to her friends.', 'She read it in one day.']], pista: '«It» es una sola cosa y se puede leer.' }, 'Solo el libro es una cosa que se lee.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«You wear it on your head when it is sunny.» Subraya la palabra.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['sunglasses'], ['beach'], ['shoes'], ['hat']], pista: 'Debe ser una cosa y va en la cabeza, no en los ojos.' }, '«Wear it on your head»: una cosa para la cabeza.')],
], 'Clase de palabra, tiempo del verbo y a qué apunta cada pronombre.');
;
//#archivo js/explora-icf-en-2.js
// Preicfes · Inglés, mundo 2 «Conversaciones Cortas» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-dialogos-1', [
  ['La palabra que pregunta',
    xpMira('hoja', 'Empecemos por la idea: la palabra del comienzo dice **qué dato** se pide.', { paras: [['Where', 'is my bag?'], ['When', 'is the party?'], ['Who', 'is that man?'], ['How long', 'is the film?']] }, [
      ['«Where» pide un lugar: «under the table».', { luz: [0], nota: { 0: 'lugar' } }],
      ['«When» pide un momento: «on Friday».', { luz: [2], nota: { 1: 'momento' } }],
      ['«Who» pide una persona: «my uncle».', { luz: [4], nota: { 2: 'persona' } }],
      ['«How long» pide duración: «two hours».', { luz: [6], nota: { 3: 'duración' } }],
      ['Y «why» pide una razón: «because…».', {}],
    ], 'Where lugar, when momento, who persona, how long duración, why razón.'),
    xpHaz('hoja', '«Where did you buy it?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Yesterday morning.'], ['At the market.'], ['Because I like it.']], pista: 'Esa es un momento o una razón: se pide un lugar.' }, '«Where» pide un lugar.')],
  ['El auxiliar se repite',
    xpMira('hoja', 'Segunda idea: la respuesta corta usa el **mismo auxiliar** de la pregunta.', { paras: [['Do you like tea?', 'Yes, I do.'], ['Is she at home?', 'No, she isn\'t.'], ['Can they swim?', 'Yes, they can.'], ['Did he call?', 'No, he didn\'t.']] }, [
      ['«Do» se responde con «do».', { luz: [0, 1], nota: { 0: 'do' } }],
      ['«Is» se responde con «is».', { luz: [2, 3], nota: { 1: 'is' } }],
      ['Si pregunta con «can», se responde con «can».', { luz: [4, 5], nota: { 2: 'can' } }],
      ['Y si pregunta con «did», va «did».', { luz: [6, 7], nota: { 3: 'did' } }],
      ['Cuidado: «you» se responde con «I».', { luz: [0, 1] }],
    ], 'Do con do, is con is, can con can, did con did.'),
    xpHaz('hoja', '«Does your sister work here?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Yes, she is.'], ['Yes, I do.'], ['No, she doesn\'t.']], pista: 'Debe llevar «does» y hablar de ella.' }, '«Does» y «she» vuelven en la respuesta.')],
  ['La trampa de la palabra repetida',
    xpMira('hoja', 'Tercera idea: repetir una palabra **no es** responder.', { letras: ['?', 'a', 'b', 'c'], paras: [['How much is the ticket?'], ['The ticket is blue.'], ['Five dollars.'], ['I have a ticket.']] }, [
      ['«How much» pide un precio.', { luz: [0] }],
      ['La a repite «ticket», pero dice un color.', { luz: [1], nota: { 1: 'trampa' } }],
      ['La b no repite nada y sí responde.', { luz: [2], nota: { 2: 'responde' } }],
      ['La c repite y cuenta otra cosa.', { luz: [3], nota: { 3: 'trampa' } }],
      ['Primero piensa qué dato se pide; luego busca.', {}],
    ], 'Busca el dato que se pide, no la palabra que se repite.'),
    xpHaz('hoja', '«What time does the shop close?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The shop is closed.'], ['At nine.'], ['It is close to the park.']], pista: 'Esa repite una palabra, pero no da una hora.' }, 'Se pide una hora.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Why don\'t we go to the cinema?» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Good idea!'], ['Because it is dark.'], ['It is in the cinema.']], pista: 'No pregunta la razón: invita.' }, '«Why don’t we» invita; se acepta o se rechaza.')],
], 'Qué dato pide, qué auxiliar usa y sin caer en la palabra repetida.');

xpLec('icf-en-dialogos-2', [
  ['Pedir y ofrecer',
    xpMira('hoja', 'Empecemos por la idea: la cortesía tiene **fórmulas** fijas.', { paras: [['Could you help me?', 'Of course.'], ['Would you like some juice?', 'Yes, please.'], ['May I come in?', 'Sure, go ahead.']] }, [
      ['«Could you» pide un favor.', { luz: [0], nota: { 0: 'pide' } }],
      ['Se acepta con «of course» o «sure».', { luz: [1] }],
      ['«Would you like» ofrece: «yes, please» o «no, thanks».', { luz: [2, 3], nota: { 1: 'ofrece' } }],
      ['«May I» pide permiso.', { luz: [4], nota: { 2: 'permiso' } }],
      ['Y se da con «go ahead».', { luz: [5] }],
    ], 'Could you pide, would you like ofrece, may I pide permiso.'),
    xpHaz('hoja', '«Would you like some cake?» Subraya la respuesta cortés.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Yes, I would go.'], ['You\'re welcome.'], ['No, thanks. I\'m full.']], pista: 'Te ofrecen algo: se acepta o se agradece.' }, 'A una oferta: «yes, please» o «no, thanks».')],
  ['Do you mind?',
    xpMira('hoja', 'Segunda idea: «Do you mind…?» pregunta si **te molesta**.', { paras: [['Do you mind if I open the window?'], ['No, not at all.'], ['Yes, I do. It\'s cold.']] }, [
      ['Significa: ¿te molesta que la abra?', { luz: [0] }],
      ['«No, not at all»: no me molesta, ábrela.', { luz: [1], nota: { 1: 'da permiso' } }],
      ['«Yes, I do»: sí me molesta.', { luz: [2], nota: { 2: 'lo niega' } }],
      ['Es al revés de lo que parece.', { luz: [1, 2] }],
      ['También sirven «of course not» y «go ahead».', {}],
    ], 'Con «Do you mind», decir no es dar permiso.'),
    xpHaz('hoja', '«Do you mind if I sit here?» Subraya la respuesta que **da permiso**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Yes, I mind.'], ['Of course not.'], ['Yes, it\'s my seat.']], pista: 'Esa dice que sí molesta.' }, '«Of course not»: claro que no me molesta.')],
  ['Quejas, gracias y disculpas',
    xpMira('hoja', 'Tercera idea: escoge según lo que la otra persona **siente**.', { paras: [['My soup is cold.', 'I\'m sorry. I\'ll bring another.'], ['Thanks a lot!', 'You\'re welcome.'], ['Come to my house!', 'I\'d love to, but I can\'t.'], ['I\'m sorry I\'m late.', 'That\'s all right.']] }, [
      ['A una queja: disculpa y solución.', { luz: [0, 1], nota: { 0: 'queja' } }],
      ['A las gracias: «you’re welcome».', { luz: [2, 3], nota: { 1: 'gracias' } }],
      ['Para rechazar: «I’d love to, but…».', { luz: [4, 5], nota: { 2: 'rechazo amable' } }],
      ['A una disculpa: «that’s all right».', { luz: [6, 7], nota: { 3: 'disculpa' } }],
      ['Ponle nombre a la situación y la fórmula sale sola.', {}],
    ], 'Queja, gracias, invitación o disculpa: cada una con su fórmula.'),
    xpHaz('hoja', 'Pon al margen la respuesta de cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['That\'s all right', 'You\'re welcome', 'I\'m sorry'], meta: [1, 2, 0], paras: [['Thank you!'], ['This plate is dirty.'], ['Sorry, I broke your pen.']], pista: '¿Agradece, se queja o se disculpa?' }, 'Gracias, queja y disculpa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Could you turn down the music? I\'m studying.» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sure, I\'m sorry.'], ['Yes, please.'], ['No, I\'m not studying.']], pista: 'Pide un favor porque algo le molesta.' }, 'Se acepta el favor y se ofrece disculpa.')],
], 'Nombra la situación, usa su fórmula y cuidado con «Do you mind».');

xpLec('icf-en-dialogos-3', [
  ['Cómo se siente',
    xpMira('hoja', 'Empecemos por la idea: la reacción va con el **sentimiento**.', { paras: [['I failed the test.', 'Oh, I\'m sorry to hear that.'], ['I got a scholarship!', 'Congratulations!'], ['I\'m nervous about tomorrow.', 'Don\'t worry, you\'ll be fine.']] }, [
      ['Una mala noticia: se lamenta.', { luz: [0, 1], nota: { 0: 'triste' } }],
      ['Un logro: se felicita.', { luz: [2, 3], nota: { 1: 'logro' } }],
      ['Un susto: se anima.', { luz: [4, 5], nota: { 2: 'nervios' } }],
      ['«Sorry» no siempre es disculpa: también es lamento.', { luz: [1] }],
      ['Busca primero el sentimiento.', {}],
    ], 'Triste se lamenta, un logro se felicita, un susto se anima.'),
    xpHaz('hoja', '«My grandmother is in hospital.» Subraya la reacción.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Congratulations!'], ['You\'re welcome.'], ['I\'m sorry to hear that.']], pista: 'Es una noticia triste.' }, 'Se lamenta la noticia.')],
  ['Planes y promesas',
    xpMira('hoja', 'Segunda idea: «going to» es un plan; «will», una promesa o un cálculo.', { paras: [['I\'m going to visit my aunt.'], ['Don\'t worry, I will help you.'], ['It will rain tonight.'], ['What if we sell juice?']] }, [
      ['«Going to»: ya está decidido.', { luz: [0], nota: { 0: 'plan' } }],
      ['«Will»: promesa del momento.', { luz: [1], nota: { 1: 'promesa' } }],
      ['O lo que se calcula que pasará.', { luz: [2], nota: { 2: 'cálculo' } }],
      ['«What if» y «what about» sugieren.', { luz: [3], nota: { 3: 'sugerencia' } }],
      ['Una sugerencia se acepta: «sounds great».', {}],
    ], 'Going to: plan. Will: promesa o cálculo. What if: sugerencia.'),
    xpHaz('hoja', 'Pon al margen qué hace cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['promesa', 'sugerencia', 'plan'], meta: [1, 2, 0], paras: [['What about a pizza?'], ['We are going to paint the room.'], ['I will call you, I promise.']], pista: 'Mira «what about», «going to» y «will».' }, 'Sugerir, planear y prometer.')],
  ['¿De acuerdo?',
    xpMira('hoja', 'Tercera idea: aprende a ver si alguien **acepta** o **prefiere otra cosa**.', { paras: [['So do I.'], ['You\'re right.'], ['I don\'t think so.'], ['I\'d rather stay here.']] }, [
      ['«So do I»: yo también.', { luz: [0], nota: { 0: 'de acuerdo' } }],
      ['«You’re right»: tienes razón.', { luz: [1], nota: { 1: 'de acuerdo' } }],
      ['«I don’t think so»: no lo creo.', { luz: [2], nota: { 2: 'en desacuerdo' } }],
      ['«I’d rather»: prefiero otra cosa.', { luz: [3], nota: { 3: 'otra opción' } }],
      ['«Neither do I» es «yo tampoco»: también está de acuerdo.', {}],
    ], 'So do I y neither do I coinciden; I’d rather prefiere otra cosa.'),
    xpHaz('hoja', '«I don\'t like horror films.» Subraya a quien piensa **igual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['So do I.'], ['Neither do I.'], ['I\'d rather watch one.']], pista: 'La frase es negativa: yo tampoco.' }, 'A una negación se le responde «neither do I».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«I\'m exhausted. I worked twelve hours.» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['You should get some rest.'], ['Congratulations on your work!'], ['At twelve o\'clock.']], pista: '«Exhausted» es muy cansado: ¿qué le aconsejas?' }, 'A alguien agotado se le aconseja descansar.')],
], 'Sentimiento, plan y acuerdo: con eso se escoge la respuesta.');
;
//#archivo js/explora-icf-en-3.js
// Preicfes · Inglés, mundo 3 «Gramática en Contexto» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-gramatica-1', [
  ['¿Terminó o llega hasta hoy?',
    xpMira('hoja', 'Empecemos por la idea: la **palabra de tiempo** escoge el verbo.', { paras: [['I', 'moved', 'here', 'in 2015.'], ['I', 'have lived', 'here', 'since 2015.'], ['I', 'have lived', 'here', 'for ten years.']] }, [
      ['«In 2015» es una fecha cerrada: pasado simple.', { luz: [1, 3], nota: { 0: 'terminó' } }],
      ['«Since 2015» va desde entonces hasta hoy.', { luz: [5, 7], nota: { 1: 'hasta hoy' } }],
      ['Por eso lleva «have» y participio.', { luz: [5] }],
      ['«For ten years» dice cuánto tiempo.', { luz: [11], nota: { 2: 'cuánto' } }],
      ['Con «yesterday», «ago» o «last»: pasado simple.', {}],
    ], 'Yesterday, ago, in 2015: pasado. Since y for: have + participio.'),
    xpHaz('hoja', '«She ___ three books since January.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['wrote'], ['has written'], ['writes']], pista: '«Since» llega hasta hoy: busca «has».' }, '«Since January» pide «has written».')],
  ['Lo que estaba pasando',
    xpMira('hoja', 'Segunda idea: «was + -ing» es lo que **estaba pasando** cuando algo ocurrió.', { paras: [['I', 'was cooking', 'when', 'the phone', 'rang.'], ['While', 'they', 'were sleeping,', 'it', 'rained.']] }, [
      ['«Was cooking»: la acción larga.', { luz: [1], nota: { 0: 'la larga' } }],
      ['«Rang»: la corta que la interrumpe.', { luz: [4] }],
      ['«When» trae la corta.', { luz: [2, 4] }],
      ['«While» trae la larga.', { luz: [5, 7], nota: { 1: 'while + larga' } }],
      ['Con «they» es «were».', { luz: [6, 7] }],
    ], 'Larga: was o were + -ing. Corta: pasado simple.'),
    xpHaz('hoja', '«We ___ football when it started to rain.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['play'], ['was playing'], ['were playing']], pista: 'Es la acción larga y el sujeto es «we».' }, '«We» va con «were».')],
  ['Mañana',
    xpMira('hoja', 'Tercera idea: hay varias maneras de hablar del **futuro**.', { paras: [['I am seeing the doctor at four.'], ['I am going to study medicine.'], ['I think it will be easy.'], ['If it rains, I will stay.']] }, [
      ['Con hora fijada: «am seeing».', { luz: [0], nota: { 0: 'cita' } }],
      ['Un plan: «going to».', { luz: [1], nota: { 1: 'plan' } }],
      ['Lo que se cree: «will».', { luz: [2], nota: { 2: 'predicción' } }],
      ['Después de «if» va presente; en la otra parte, «will».', { luz: [3], nota: { 3: 'condición' } }],
      ['Nunca «if it will rain».', {}],
    ], 'Cita: am -ing. Plan: going to. Predicción: will. If + presente.'),
    xpHaz('hoja', '«If you ___ the red fruits, the coffee will taste good.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['pick'], ['will pick'], ['picked']], pista: 'Después de «if» no va «will».' }, '«If» con presente y «will» en la otra parte.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nobody ___ this door for years.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['opened'], ['has opened'], ['have opened']], pista: '«For years» llega hasta hoy y «nobody» va en singular.' }, '«Nobody» va con «has».')],
], 'Mira la palabra de tiempo, la acción larga y la condición.');

xpLec('icf-en-gramatica-2', [
  ['In, on, at',
    xpMira('hoja', 'Empecemos por la idea: de lo más **grande** a lo más **pequeño**: in, on, at.', { paras: [['in', 'July', 'in the garage'], ['on', 'Monday', 'on the table'], ['at', 'six o\'clock', 'at the door']] }, [
      ['«In»: un mes, un año, un lugar cerrado.', { luz: [0, 1, 2], nota: { 0: 'grande' } }],
      ['«On»: un día o una superficie.', { luz: [3, 4, 5], nota: { 1: 'mediano' } }],
      ['«At»: una hora o un punto.', { luz: [6, 7, 8], nota: { 2: 'pequeño' } }],
      ['«From… to» va de un punto a otro.', {}],
      ['«During» con un evento; «for» con una duración.', {}],
    ], 'In: mes o adentro. On: día o encima. At: hora o punto.'),
    xpHaz('hoja', 'Pon al margen la palabra que falta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['on', 'at', 'in'], meta: [2, 1, 0], paras: [['___ December'], ['___ half past nine'], ['___ Saturday']], pista: 'Alguna no va ahí: mes, hora o día.' }, 'Mes con in, hora con at y día con on.')],
  ['¿Se puede contar?',
    xpMira('hoja', 'Segunda idea: **many** y **a few** cuentan; **much** y **a little**, no.', { paras: [['three apples', 'many apples', 'a few apples'], ['some water', 'much water', 'a little water']] }, [
      ['Se puede decir tres manzanas: se cuentan.', { luz: [0] }],
      ['Muchas: «many». Unas pocas: «a few».', { luz: [1, 2], nota: { 0: 'se cuentan' } }],
      ['No se dice «three waters» al medir agua.', { luz: [3] }],
      ['Mucha: «much». Un poco: «a little».', { luz: [4, 5], nota: { 1: 'no se cuenta' } }],
      ['Money, time, space y work tampoco se cuentan.', {}],
    ], 'Cuenta: many, a few. No se cuenta: much, a little.'),
    xpHaz('hoja', '«There isn\'t ___ milk, but there are ___ eggs.» Subraya las **dos**, en la pareja correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['many / a little'], ['much / a few'], ['a few / much']], pista: 'La leche no se cuenta; los huevos, sí.' }, 'Leche con much y huevos con a few.')],
  ['Unir ideas',
    xpMira('hoja', 'Tercera idea: la palabra que une dice **cómo** se relacionan.', { paras: [['It rained,', 'so', 'we stayed.'], ['We stayed', 'because', 'it rained.'], ['Although', 'it rained,', 'we went.'], ['It rained,', 'but', 'we went.']] }, [
      ['«So» trae el resultado.', { luz: [1], nota: { 0: 'resultado' } }],
      ['«Because» trae la causa.', { luz: [4], nota: { 1: 'causa' } }],
      ['«Although»: pasó lo que no se esperaba.', { luz: [6], nota: { 2: 'a pesar de' } }],
      ['Y «but» contrasta las dos ideas.', { luz: [10], nota: { 3: 'contraste' } }],
      ['Al revés cambia todo: «so» no es «because».', { luz: [1, 4] }],
    ], 'So: resultado. Because: causa. Although y but: contraste.'),
    xpHaz('hoja', '«___ he was tired, he finished the race.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Although'], ['Because'], ['So']], pista: 'Estaba cansado y aun así terminó.' }, 'No se esperaba que terminara.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«I looked in the room, but there wasn\'t ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['nobody'], ['somebody'], ['anybody']], pista: '«Wasn\'t» ya niega: no se niega dos veces.' }, 'En negación va «anybody».')],
], 'Lugar y tiempo, lo que se cuenta y lo que une.');

xpLec('icf-en-gramatica-3', [
  ['Más que',
    xpMira('hoja', 'Empecemos por la idea: las palabras **cortas** llevan -er; las **largas**, more.', { paras: [['cold', 'colder than'], ['big', 'bigger than'], ['happy', 'happier than'], ['expensive', 'more expensive than']] }, [
      ['Corta: se agrega -er y «than».', { luz: [0, 1] }],
      ['A veces se dobla la última letra.', { luz: [2, 3] }],
      ['Si termina en -y, cambia a -ier.', { luz: [4, 5] }],
      ['Si es larga, va «more» adelante.', { luz: [6, 7], nota: { 3: 'larga' } }],
      ['Nunca las dos: «more colder» no existe.', {}],
    ], 'Corta: -er than. Larga: more… than. Nunca las dos juntas.'),
    xpHaz('hoja', '«This bag is ___ than mine.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['more heavy'], ['heavier'], ['heaviest']], pista: 'Termina en -y y compara dos.' }, '«Heavy» pasa a «heavier».')],
  ['Igual o menos',
    xpMira('hoja', 'Segunda idea: «as… as» es **tan como**; con «not», es **menos**.', { paras: [['Leo is as tall as Ana.'], ['Leo is not as tall as Ana.'], ['Leo is shorter than Ana.']] }, [
      ['Tan alto como: iguales.', { luz: [0], nota: { 0: 'iguales' } }],
      ['No tan alto como: es menos.', { luz: [1], nota: { 1: 'menos' } }],
      ['Dice lo mismo que esta.', { luz: [1, 2], nota: { 2: 'lo mismo' } }],
      ['«Less… than» también: less tired than.', {}],
      ['Entre «as» y «as» no va -er.', { luz: [0] }],
    ], 'As… as: igual. Not as… as: menos.'),
    xpHaz('hoja', '«The train isn\'t as fast as the plane.» Subraya lo que dice **lo mismo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['The train is faster.'], ['They are equally fast.'], ['The plane is faster.']], pista: '¿Cuál de los dos es menos rápido?' }, 'El tren es menos rápido: el avión es más.')],
  ['El más de todos',
    xpMira('hoja', 'Tercera idea: para el **primero de todos** va «the» con -est o most.', { paras: [['the coldest month'], ['the most expensive house'], ['the best friend'], ['the worst day']] }, [
      ['Corta: «the» y -est.', { luz: [0], nota: { 0: 'el más frío' } }],
      ['Si es larga, va «the most».', { luz: [1], nota: { 1: 'la más cara' } }],
      ['«Good» cambia: better, the best.', { luz: [2], nota: { 2: 'el mejor' } }],
      ['«Bad» también: worse, the worst.', { luz: [3], nota: { 3: 'el peor' } }],
      ['Pista: «in the world», «of all», «of my life».', {}],
    ], 'The + -est o the most. Good: best. Bad: worst.'),
    xpHaz('hoja', '«It was ___ film of the year.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['the best'], ['better'], ['the more good']], pista: '«Of the year» escoge entre todas.' }, 'Entre todas: «the best».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Ana is taller than Leo. Leo is as tall as Sam.» Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sam is the tallest.'], ['Ana is taller than Sam.'], ['Leo is taller than Sam.']], pista: 'Leo y Sam son iguales. ¿Y Ana?' }, 'Si Leo y Sam son iguales, Ana es más alta que los dos.')],
], 'Dos se comparan con than, iguales con as… as y el primero con the.');
;
//#archivo js/explora-icf-en-4.js
// Preicfes · Inglés, mundo 4 «Textos Cortos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-corto-1', [
  ['¿Quién le escribe a quién?',
    xpMira('hoja', 'Empecemos por la idea: mira el **saludo** y la **firma** antes de leer.', { paras: [['Dear Ms Gil,', 'thank you for the books.', 'Regards, Omar'], ['Hi Tina!', 'See you at six.', 'Love, Dad']] }, [
      ['«Dear Ms Gil»: se le escribe a ella, con respeto.', { luz: [0], nota: { 0: 'formal' } }],
      ['«Regards, Omar»: escribe Omar.', { luz: [2] }],
      ['«Hi Tina!» y «Love, Dad» son de familia.', { luz: [3, 5], nota: { 1: 'informal' } }],
      ['El del saludo recibe; el de la firma escribe.', { luz: [0, 2] }],
      ['Con eso ya sabes quién es «I» y quién es «you».', {}],
    ], 'Saludo: quien recibe. Firma: quien escribe.'),
    xpHaz('hoja', '«Dear Coach, I can\'t come tomorrow. Regards, Nina.» Subraya quién **no puede ir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The coach'], ['Nina'], ['Both']], pista: 'Quien firma es «I».' }, '«I» es Nina, que firma.')],
  ['¿Para qué?',
    xpMira('hoja', 'Segunda idea: un mensaje corto siempre **quiere algo**.', { paras: [['Could you bring a chair?'], ['The shop is closed today.'], ['Would you like to come?'], ['Thanks for the cake!']] }, [
      ['«Could you…?» pide un favor.', { luz: [0], nota: { 0: 'pide' } }],
      ['Decir que está cerrado es avisar.', { luz: [1], nota: { 1: 'avisa' } }],
      ['«Would you like…?» invita a alguien.', { luz: [2], nota: { 2: 'invita' } }],
      ['«Thanks for» agradece algo que ya pasó.', { luz: [3], nota: { 3: 'agradece' } }],
      ['Con el propósito claro, lo demás son detalles.', {}],
    ], 'Pide, avisa, invita o agradece.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['invita', 'avisa', 'pide'], meta: [2, 0, 1], paras: [['Can you feed the cat, please?'], ['Would you like to have dinner with us?'], ['The meeting is now at four.']], pista: 'Alguna no va ahí: busca «can you», «would you like» y un dato nuevo.' }, 'Pide, invita y avisa.')],
  ['Los datos y lo que se entiende',
    xpMira('hoja', 'Tercera idea: subraya **qué hacer y cuándo**, y une dos datos.', { paras: [['Grandma doesn\'t eat sugar.'], ['Please buy her cake', 'at the new bakery,', 'not at Luigi\'s.']] }, [
      ['Qué hay que comprar: un pastel.', { luz: [1] }],
      ['Dónde: en la panadería nueva.', { luz: [2], nota: { 1: 'dónde' } }],
      ['Y dónde no: «not at Luigi\'s».', { luz: [3] }],
      ['Une los datos: ella no come azúcar.', { luz: [0, 2] }],
      ['Se entiende que la nueva vende pastel sin azúcar.', {}],
    ], 'Qué, dónde, cuándo; y une dos datos para entender más.'),
    xpHaz('hoja', '«Wear your boots. It rained all night and we are walking to the farm.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The road is muddy.'], ['The farm is closed.'], ['They are going by car.']], pista: 'Une la lluvia, las botas y que van a pie.' }, 'Llovió, van a pie y piden botas: hay barro.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Hi Leo, the film starts at 7, not 8. Don\'t eat before: we are having pizza after. Ana». Subraya lo que Leo **debe hacer**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Eat at home'], ['Arrive at eight'], ['Arrive before seven']], pista: 'Cambió la hora y hay comida después.' }, 'La película empieza a las siete y comerán después.')],
], 'Quién, para qué, qué hacer y cuándo.');

xpLec('icf-en-corto-2', [
  ['La idea de todo el texto',
    xpMira('hoja', 'Empecemos por la idea: la **idea principal** sirve para todo el texto.', { letras: ['1', '2', '3'], paras: [['Rosa makes toys from old bottles.'], ['Children bring her the bottles on Fridays.'], ['Last year she made 300 toys.']] }, [
      ['El primer renglón presenta a Rosa y sus juguetes.', { luz: [0] }],
      ['El segundo dice de dónde salen las botellas.', { luz: [1], nota: { 1: 'detalle' } }],
      ['El tercero dice cuántos hizo.', { luz: [2], nota: { 2: 'detalle' } }],
      ['Lo común: una mujer convierte botellas en juguetes.', { luz: [0], nota: { 0: 'idea' } }],
      ['«300 toys» es cierto, pero no es la idea.', { luz: [2] }],
    ], 'La idea principal cubre todo; un detalle, solo una parte.'),
    xpHaz('hoja', '«The old cinema is a school now. Students paint where the seats were. The screen is a map.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The screen is a map.'], ['A cinema became a school.'], ['Students like painting.']], pista: 'Debe servir para las tres oraciones.' }, 'Todo el texto habla de un cine que hoy es escuela.')],
  ['Correct, wrong, doesn\'t say',
    xpMira('hoja', 'Segunda idea: **wrong** es que el texto dice lo contrario; **doesn\'t say**, que no lo menciona.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Tom has a small boat. He fishes every morning.'], ['Tom fishes every day.'], ['Tom\'s boat is big.'], ['Tom has a brother.']] }, [
      ['«Every morning» es todos los días: correcto.', { luz: [0, 1], nota: { 1: 'correct' } }],
      ['Dice «small» y aquí «big»: lo contrario.', { luz: [0, 2], nota: { 2: 'wrong' } }],
      ['Del hermano no dice nada.', { luz: [3], nota: { 3: 'doesn\'t say' } }],
      ['Aunque pueda ser verdad, no está en el texto.', { luz: [3] }],
      ['Señala la oración; si no puedes, no lo dice.', {}],
    ], 'Correct: está. Wrong: dice lo contrario. Doesn\'t say: no está.'),
    xpHaz('hoja', 'Texto: «Lia works at night and sleeps in the morning. She has two cats». Pon al margen.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['doesn\'t say', 'correct', 'wrong'], meta: [2, 0, 1], paras: [['Lia works in the morning.'], ['Lia is a nurse.'], ['Lia has pets.']], pista: 'Alguna no va ahí: busca la oración que lo dice o lo niega.' }, 'De día duerme, no dice el oficio y los gatos son mascotas.')],
  ['La palabra por el contexto',
    xpMira('hoja', 'Tercera idea: si no conoces una palabra, **mira lo que la rodea**.', { paras: [['The bag was so heavy', 'that two men', 'could not lift it.'], ['She was exhausted:', 'she slept for ten hours.']] }, [
      ['¿«Heavy»? Dos hombres no pudieron con la bolsa.', { luz: [0, 1] }],
      ['Entonces «heavy» es pesada.', { luz: [0], nota: { 0: 'pesada' } }],
      ['¿«Exhausted»? Durmió diez horas.', { luz: [3, 4] }],
      ['Entonces es muy cansada.', { luz: [3], nota: { 1: 'muy cansada' } }],
      ['Cambia la palabra por la tuya y mira si suena.', {}],
    ], 'Lee antes y después: el contexto la explica.'),
    xpHaz('hoja', '«The soup was tasteless, so he added salt and lemon.» Subraya lo que significa «tasteless».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['sin sabor'], ['muy caliente'], ['deliciosa']], pista: '¿Por qué alguien agrega sal y limón?' }, 'Le agrega sal y limón porque no sabe a nada.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«They thought few people would come, so they brought ten chairs. People sat on the floor.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Nobody came.'], ['More than ten people came.'], ['The chairs were broken.']], pista: '¿Por qué se sentarían en el piso?' }, 'Faltaron sillas: llegaron más de diez.')],
], 'La idea de todo, lo que se puede señalar y la palabra por su contexto.');
;
//#archivo js/explora-icf-en-5.js
// Preicfes · Inglés, mundo 5 «Textos Largos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-largo-1', [
  ['Primero, de qué trata',
    xpMira('hoja', 'Empecemos por la idea: no leas todo de una vez; mira **título y primeras oraciones**.', { letras: ['título', '1', '2', '3'], paras: [['The doctor who travels by canoe'], ['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']] }, [
      ['El título: una doctora que viaja en canoa.', { luz: [0] }],
      ['Párrafo 1: adónde va.', { luz: [1], nota: { 1: 'where' } }],
      ['Párrafo 2: con qué trabaja.', { luz: [2], nota: { 2: 'what with' } }],
      ['Párrafo 3: qué hizo después.', { luz: [3], nota: { 3: 'what next' } }],
      ['Ya tienes un mapa: sabes dónde buscar.', {}],
    ], 'Título y primeras oraciones: un mapa del texto.'),
    xpHaz('hoja', '«How does she talk to the villages?». Subraya dónde buscarías.', { modo: 'toca', letras: ['1', '2', '3'], meta: [2], paras: [['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']], pista: '¿Cuál habla de un aparato para comunicarse?' }, 'La radio sirve para hablar con las veredas.')],
  ['La misma idea, otras palabras',
    xpMira('hoja', 'Segunda idea: la pregunta usa **otras palabras** que el texto.', { paras: [['She used to live in Cali.'], ['In the past, her home was Cali.'], ['The bus no longer stops here.'], ['The bus doesn\'t stop here any more.']] }, [
      ['«Used to live»: antes vivía, ya no.', { luz: [0], nota: { 0: 'antes' } }],
      ['«In the past» dice lo mismo.', { luz: [1], nota: { 1: 'igual' } }],
      ['«No longer»: ya no.', { luz: [2], nota: { 2: 'ya no' } }],
      ['«Any more», con «doesn\'t», también es ya no.', { luz: [3], nota: { 3: 'igual' } }],
      ['Busca la idea, no la misma palabra.', {}],
    ], 'Used to: antes. No longer y not any more: ya no.'),
    xpHaz('hoja', '«Tim gave up coffee in May.» Subraya la que dice lo mismo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tim started to drink coffee in May.'], ['Tim stopped drinking coffee in May.'], ['Tim sold coffee in May.']], pista: '«Give up» es dejar de hacer algo.' }, '«Gave up» es dejó: «stopped».')],
  ['Detalle o idea',
    xpMira('hoja', 'Tercera idea: una opción puede ser **cierta** y no ser la **idea principal**.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Ema repairs toys. She mends forty a week and gives them to schools.'], ['Ema gives repaired toys to schools.'], ['Ema mends forty toys.'], ['Ema sells toys.']] }, [
      ['Esto cuenta el texto.', { luz: [0] }],
      ['Esta lo cubre todo: idea principal.', { luz: [0, 1], nota: { 1: 'main idea' } }],
      ['Esta es cierta, pero es una parte.', { luz: [2], nota: { 2: 'detail' } }],
      ['Esta cambia la verdad.', { luz: [3], tacha: [3], nota: { 3: 'wrong' } }],
      ['Cierta no es lo mismo que principal.', {}],
    ], 'La principal cubre todo; el detalle, una parte.'),
    xpHaz('hoja', '«The lake was dirty. Neighbours cleaned it in two years. Now there are fish.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['There are fish.'], ['It took two years.'], ['Neighbours brought a lake back to life.']], pista: 'Debe cubrir el antes, el cómo y el ahora.' }, 'Las otras dos son detalles ciertos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Few people finished the race, although hundreds had started.» Subraya lo que dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Most runners didn\'t finish.'], ['Everybody finished.'], ['Nobody started.']], pista: '«Few» es pocos; «although», aunque.' }, 'Empezaron cientos y terminaron pocos.')],
], 'Haz el mapa, busca la idea con otras palabras y separa lo principal.');

xpLec('icf-en-largo-2', [
  ['¿Para qué escribe?',
    xpMira('hoja', 'Empecemos por la idea: pregunta **qué quiere** quien escribe.', { letras: ['A', 'B', 'C', 'D'], paras: [['You should try it at home.'], ['The bus was late again. This can\'t continue.'], ['This is how the machine works.'], ['When I was six, I met a bear.']] }, [
      ['«You should» quiere convencer o aconsejar.', { luz: [0], nota: { 0: 'to advise' } }],
      ['«This can\'t continue»: se queja.', { luz: [1], nota: { 1: 'to complain' } }],
      ['«This is how» explica algo.', { luz: [2], nota: { 2: 'to explain' } }],
      ['«When I was six» cuenta una historia.', { luz: [3], nota: { 3: 'to tell a story' } }],
      ['El propósito está en todo el texto, no en una palabra.', {}],
    ], 'To advise, to complain, to explain, to tell.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['to complain', 'to thank', 'to explain'], meta: [2, 0, 1], paras: [['First, you open the box.'], ['The soup was cold and nobody apologised.'], ['You have helped us so much.']], pista: 'Alguna no va ahí: ¿enseña pasos, se queja o agradece?' }, 'Explica, se queja y agradece.')],
  ['Hecho u opinión',
    xpMira('hoja', 'Segunda idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The film lasts two hours.'], ['The film is too long.'], ['I think it needs music.'], ['It was made in Pasto.']] }, [
      ['Dos horas se miden: hecho.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Too long» depende de quien mira.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«I think» anuncia una opinión.', { luz: [2], nota: { 2: 'opinion' } }],
      ['El lugar se comprueba: hecho.', { luz: [3], nota: { 3: 'fact' } }],
      ['Adjetivos como «best» o «terrible» suelen opinar.', {}],
    ], 'Fact: se comprueba. Opinion: alguien puede no estar de acuerdo.'),
    xpHaz('hoja', 'Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['The museum opens at nine.'], ['Entrance is free on Sundays.'], ['Nobody should miss it.']], pista: 'Busca la que alguien podría discutir.' }, '«Nobody should miss it» es lo que piensa quien escribe.')],
  ['Aceptar y limitar',
    xpMira('hoja', 'Tercera idea: el autor puede **reconocer** algo y luego decir **lo suyo**.', { paras: [['I understand why people use phones.'], ['They are useful.'], ['However,', 'I don\'t want them at dinner.'], ['I am asking for one hour.']] }, [
      ['«I understand» reconoce al otro.', { luz: [0, 1], nota: { 0: 'reconoce' } }],
      ['«However» avisa un cambio.', { luz: [2] }],
      ['Lo que viene es su opinión.', { luz: [3], nota: { 2: 'su opinión' } }],
      ['Y al final, lo que pide.', { luz: [4], nota: { 3: 'lo que pide' } }],
      ['No está contra los teléfonos: pide una hora.', { luz: [0, 4] }],
    ], '«I understand… However… I am asking for…».'),
    xpHaz('hoja', '«I love dogs. However, the beach isn\'t a good place for them.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He hates dogs.'], ['He doesn\'t want dogs on the beach.'], ['He wants more dogs on the beach.']], pista: 'Lo suyo viene después de «however».' }, 'Le gustan, pero no en la playa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Thank you for your three letters. I have read them all, twice, and I still won\'t sell my house.» Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Polite but firm'], ['Afraid'], ['Very happy to sell']], pista: 'Agradece, pero ¿cambia de idea?' }, 'Es amable y no cede.')],
], 'Para qué escribe, qué opina y qué pide.');
;
//#archivo js/explora-icf-en-6.js
// Preicfes · Inglés, mundo 6 «Palabras en Contexto» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-vocabulario-1', [
  ['Mira alrededor',
    xpMira('hoja', 'Empecemos por la idea: la palabra que falta debe encajar **antes y después**.', { letras: ['texto', 'a', 'b', 'c'], paras: [['It was raining, so she took her ___.'], ['umbrella'], ['sunglasses'], ['sing']] }, [
      ['«It was raining»: la pista está antes.', { luz: [0] }],
      ['Con lluvia se lleva paraguas.', { luz: [1], nota: { 1: 'encaja' } }],
      ['Gafas de sol no tiene sentido.', { luz: [2], tacha: [2] }],
      ['«Sing» es un verbo: aquí va una cosa.', { luz: [3], tacha: [3] }],
      ['Comprueba sentido y también gramática.', { luz: [0, 1] }],
    ], 'La palabra debe encajar en sentido y en gramática.'),
    xpHaz('hoja', '«The soup is too hot. ___ for a minute.» Subraya lo que encaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Run'], ['Wait'], ['Spoon']], pista: 'Debe ser una acción que tenga sentido con una sopa caliente.' }, 'Está caliente: hay que esperar.')],
  ['Cada palabra y su compañía',
    xpMira('hoja', 'Segunda idea: algunas palabras tienen su **compañía**.', { paras: [['make', 'a cake, a mistake, a noise'], ['do', 'homework, the dishes, sport'], ['say', 'something, hello'], ['tell', 'a person, a story']] }, [
      ['«Make» sirve para crear algo.', { luz: [0, 1] }],
      ['«Do» es para tareas y actividades.', { luz: [2, 3] }],
      ['«Say» lleva lo que se dice.', { luz: [4, 5] }],
      ['«Tell» lleva a quién: tell me.', { luz: [6, 7], nota: { 3: 'a quién' } }],
      ['Apréndelas en pareja, no sueltas.', {}],
    ], 'Make crea, do realiza, say algo, tell a alguien.'),
    xpHaz('hoja', '«Can you ___ me the truth?» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['say'], ['speak'], ['tell']], pista: 'Después va la persona: «me».' }, '«Tell me»: tell lleva a quién.')],
  ['Verbos con partícula',
    xpMira('hoja', 'Tercera idea: un verbo con **partícula** cambia de sentido.', { paras: [['look', 'mirar'], ['look after', 'cuidar'], ['look for', 'buscar'], ['turn down', 'rechazar']] }, [
      ['«Look» solo es mirar.', { luz: [0, 1] }],
      ['Con «after» es cuidar.', { luz: [2, 3] }],
      ['Con «for» es buscar.', { luz: [4, 5] }],
      ['«Turn down» es decir que no.', { luz: [6, 7] }],
      ['No traduzcas por partes: mira el contexto.', {}],
    ], 'La partícula manda: after cuida, for busca, down rechaza.'),
    xpHaz('hoja', '«I can\'t find my keys. I\'m looking ___ them.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['for'], ['after'], ['down']], pista: 'No las encuentra: las está buscando.' }, '«Looking for» es buscar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«She was offered a job in Paris, but she turned it down because of her mother.» Subraya lo que pasó.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['She went to Paris.'], ['She didn\'t take the job.'], ['Her mother got the job.']], pista: '«Turn down» es rechazar.' }, 'Rechazó el empleo por su mamá.')],
], 'Antes y después, la compañía y la partícula.');

xpLec('icf-en-vocabulario-2', [
  ['Familias',
    xpMira('hoja', 'Empecemos por la idea: el **final** dice qué clase de palabra es.', { paras: [['help', 'helpful', 'helpfully'], ['danger', 'dangerous', 'dangerously'], ['act', 'action', 'active']] }, [
      ['«-ful» forma adjetivos: helpful, útil.', { luz: [1], nota: { 0: 'cómo es' } }],
      ['«-ly» forma adverbios: cómo se hace.', { luz: [2, 5] }],
      ['«-ous» también forma adjetivos.', { luz: [4] }],
      ['«-tion» o «-ion» forma sustantivos.', { luz: [7], nota: { 2: 'la cosa' } }],
      ['Después de «very» va adjetivo o adverbio.', { luz: [1, 4] }],
    ], '-ful y -ous: cómo es. -ly: cómo se hace. -tion: la cosa.'),
    xpHaz('hoja', '«He drives very ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['careful'], ['care'], ['carefully']], pista: 'Dice cómo maneja: un adverbio.' }, '«Carefully» dice cómo.')],
  ['Prefijos y -ed o -ing',
    xpMira('hoja', 'Segunda idea: «un-» y «dis-» dicen **lo contrario**; -ed siente, -ing causa.', { paras: [['happy', 'unhappy'], ['agree', 'disagree'], ['I am bored.'], ['The film is boring.']] }, [
      ['«Un-» le da la vuelta a happy.', { luz: [0, 1] }],
      ['«Dis-» le da la vuelta a agree.', { luz: [2, 3] }],
      ['«Bored»: así me siento.', { luz: [4], nota: { 2: 'siente' } }],
      ['«Boring»: así es la película.', { luz: [5], nota: { 3: 'causa' } }],
      ['Decir «I am boring» sería otra cosa.', { luz: [4, 5] }],
    ], 'Un- y dis-: contrario. -ed siente, -ing causa.'),
    xpHaz('hoja', '«The news was ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['surprised'], ['surprising'], ['surprise']], pista: 'La noticia causa la sorpresa.' }, 'Lo que causa lleva «-ing».')],
  ['Conectores',
    xpMira('hoja', 'Tercera idea: el **conector** dice qué hace la segunda idea.', { paras: [['It was late.', 'However,', 'we went out.'], ['It is cheap.', 'Moreover,', 'it is near.'], ['He was ill.', 'Therefore,', 'he stayed at home.']] }, [
      ['«However» contrasta: no se esperaba.', { luz: [1, 2], nota: { 0: 'contraste' } }],
      ['«Moreover» agrega algo del mismo lado.', { luz: [4, 5], nota: { 1: 'suma' } }],
      ['«Therefore» da el resultado.', { luz: [7, 8], nota: { 2: 'resultado' } }],
      ['«Although» también contrasta, pero une en una oración.', {}],
      ['Pregunta: ¿se opone, se suma o resulta?', {}],
    ], 'However contrasta, moreover suma, therefore resulta.'),
    xpHaz('hoja', '«The room was small. ___, it was very comfortable.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['However'], ['Therefore'], ['Moreover']], pista: 'Pequeño parece malo y cómodo, bueno.' }, 'Se oponen: «however».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Although it was ___, the soup was delicious.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['tasty'], ['taste'], ['cold']], pista: '«Although» pide algo que se oponga a «delicious».' }, 'Fría, y aun así deliciosa.')],
], 'El final, el prefijo y el conector te dicen qué va.');
;
//#archivo js/explora-icf-en-7.js
// Preicfes · Inglés, mundo 7 «Inferir y Opinar» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-inferencia-1', [
  ['Unir dos datos',
    xpMira('hoja', 'Empecemos por la idea: **inferir** es unir dos datos del texto.', { letras: ['1', '2', 'idea', 'no'], paras: [['Her umbrella is wet.'], ['She is taking off her coat.'], ['It is raining outside.'], ['She is late for work.']] }, [
      ['Primer dato: la sombrilla está mojada.', { luz: [0] }],
      ['Segundo: se quita el abrigo, acaba de llegar.', { luz: [1] }],
      ['Juntos dicen que afuera llueve.', { luz: [0, 1, 2], nota: { 2: 'se deduce' } }],
      ['Esto no tiene ningún dato.', { luz: [3], tacha: [3] }],
      ['Si no puedes señalar el dato, es imaginación.', {}],
    ], 'Dos datos señalados, una idea.'),
    xpHaz('hoja', '«Tom\'s plate is empty and he is asking for more.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['He cooked it.'], ['He is ill.'], ['He liked the food.']], pista: '¿Por qué pediría más?' }, 'Plato vacío y pedir más: le gustó.')],
  ['Los gestos',
    xpMira('hoja', 'Segunda idea: lo que alguien **hace** dice lo que siente.', { paras: [['She read the letter three times.'], ['He looked at the floor.'], ['They closed the door quietly.']] }, [
      ['Leerla tres veces: le importa mucho.', { luz: [0], nota: { 0: 'it matters' } }],
      ['Mirar al piso: siente pena o culpa.', { luz: [1], nota: { 1: 'ashamed' } }],
      ['Cerrar sin ruido: no quieren molestar.', { luz: [2], nota: { 2: 'careful' } }],
      ['Nadie escribió la emoción.', {}],
      ['Pregúntate por qué harías tú ese gesto.', { luz: [0, 1, 2] }],
    ], 'Gesto, razón, emoción.'),
    xpHaz('hoja', '«He kept looking at his watch.» Subraya lo que muestra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He loves his watch.'], ['He is impatient.'], ['He is asleep.']], pista: '¿Por qué alguien mira la hora muchas veces?' }, 'Mirar la hora muestra impaciencia.')],
  ['Must, might, can\'t',
    xpMira('hoja', 'Tercera idea: **must** es casi seguro, **might** es quizá, **can\'t** es imposible.', { paras: [['The lights are off and the car isn\'t there.'], ['They must be out.'], ['They might be at the cinema.'], ['They can\'t be at home.']] }, [
      ['Los datos: sin luz y sin carro.', { luz: [0] }],
      ['«Must be out»: casi seguro que salieron.', { luz: [1], nota: { 1: 'casi seguro' } }],
      ['«Might be at the cinema»: puede ser, no se sabe.', { luz: [2], nota: { 2: 'quizá' } }],
      ['«Can\'t be at home»: no puede ser.', { luz: [3], nota: { 3: 'imposible' } }],
      ['Escoge según la fuerza de la pista.', {}],
    ], 'Must: casi seguro. Might: quizá. Can\'t: imposible.'),
    xpHaz('hoja', '«He is eating a huge lunch. He ___ be hungry.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['must'], ['can\'t'], ['mustn\'t']], pista: 'La pista es fuerte: se come un almuerzo enorme.' }, 'Casi seguro: «must».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nina put the photo back in the drawer before her brother came in.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Her brother took the photo.'], ['She didn\'t want him to see it.'], ['The drawer was broken.']], pista: '¿Por qué la guardó antes de que entrara?' }, 'La guarda a tiempo: no quería que la viera.')],
], 'Señala los datos, mira los gestos y mide la fuerza.');

xpLec('icf-en-inferencia-2', [
  ['Fact or opinion',
    xpMira('hoja', 'Empecemos por la idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The park has 300 trees.'], ['The park should be bigger.'], ['In my opinion, it is dirty.'], ['It opens at six.']] }, [
      ['Los árboles se cuentan.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Should» dice lo que alguien cree mejor.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«In my opinion» lo anuncia.', { luz: [2], nota: { 2: 'opinion' } }],
      ['La hora se comprueba.', { luz: [3], nota: { 3: 'fact' } }],
      ['Busca should, I think, best, terrible.', {}],
    ], 'Contar o comprobar: fact. Should, I think: opinion.'),
    xpHaz('hoja', 'Subraya el **hecho**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The bridge is 90 metres long.'], ['The bridge is ugly.'], ['They should paint it.']], pista: '¿Cuál se puede medir?' }, 'La longitud se mide.')],
  ['Opinion + reason',
    xpMira('hoja', 'Segunda idea: una opinión vale más con **razones**.', { letras: ['opinion', 'a', 'b', 'c'], paras: [['The library should open on Sundays.'], ['Many people only have free time then.'], ['The door is blue.'], ['In the next town, it is full on Sundays.']] }, [
      ['Esto es lo que opina.', { luz: [0] }],
      ['Esto responde por qué.', { luz: [1], nota: { 1: 'reason' } }],
      ['Esto no responde nada.', { luz: [2], tacha: [2] }],
      ['Esto es un hecho que la apoya.', { luz: [3], nota: { 3: 'evidence' } }],
      ['Únelas con «because»: si suena, sirve.', { luz: [0, 1] }],
    ], 'Opinion + because + reason.'),
    xpHaz('hoja', 'Opinion: «We shouldn\'t use plastic bags». Subraya la **razón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['They are white.'], ['I have two bags.'], ['They stay in the sea for years.']], pista: 'Une con «because».' }, 'Solo esa responde por qué.')],
  ['Agree, disagree, change',
    xpMira('hoja', 'Tercera idea: alguien puede **aceptar** una parte y **cambiar** de idea.', { paras: [['You are right about the noise.'], ['But I don\'t agree with closing the bar.'], ['After the meeting, I changed my mind.']] }, [
      ['«You are right»: acepta una parte.', { luz: [0], nota: { 0: 'agrees' } }],
      ['«But I don\'t agree»: rechaza otra.', { luz: [1], nota: { 1: 'disagrees' } }],
      ['«Changed my mind»: ya piensa distinto.', { luz: [2], nota: { 2: 'change' } }],
      ['Aceptar algo no es aceptar todo.', { luz: [0, 1] }],
      ['Mira qué viene después de «but».', { luz: [1] }],
    ], 'You are right… but… changed my mind.'),
    xpHaz('hoja', '«I see your point, but I still think we need the road.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He doesn\'t want the road.'], ['He wants the road.'], ['He has no opinion.']], pista: '«Still» dice que sigue pensando lo mismo.' }, 'Entiende al otro, pero mantiene su idea.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«The film lasts three hours. I enjoyed every minute, although my brother fell asleep.» Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['It lasts three hours.'], ['It is enjoyable.'], ['Her brother fell asleep.']], pista: '¿En cuál podrían no estar de acuerdo?' }, 'La duración y el sueño son hechos.')],
], 'Comprueba hechos, pide razones y mira qué cambia.');
