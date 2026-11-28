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
//#archivo js/explora-lab.js
// Explora · ilustraciones realistas para Ciencias, Sociales e Inglés (spec 2026-11-28-preicfes-paso-a-paso). Piezas SVG con luz,
// sombra y volumen (vidrio, líquidos, madera, papel viejo, metal) para dibujar experimentos y escenas «como en una foto» dentro de la
// escena `dibujo` (ancho 340). Todo va dentro de un marco con su propio fondo (`XLAB.foto`), como una fotografía: por eso sus colores
// son fijos y se ven igual en tema claro y oscuro; los rótulos sobre la foto van en placas (`XLAB.rot`).
//   dib: (v, K) => XLAB.foto(XLAB.vaso(110, 160, 60, 80, v.n, 'agua') + XLAB.rot(110, 186, 'con sal'), 200, 'lab')
// Va después de explora-escenas.js.
const XLAB = (() => {
  const n = x => Math.round(x * 100) / 100;
  const LIQ = { agua: ['#9fd8f5', '#4aa3d8'], te: ['#e0a560', '#9a5a1e'], leche: ['#ffffff', '#e4e0d6'], rojo: ['#f4877d', '#c0392b'],
    azul: ['#7aa7ff', '#2949b8'], verde: ['#9be08a', '#3e9b35'], morado: ['#c79bf0', '#6c3aa8'], aceite: ['#ffe27a', '#d6a419'],
    turbio: ['#c9b48c', '#8a7350'], cafe: ['#a0703f', '#4b2b12'] };
  const id = 'xlb';
  const DEFS = `<defs>
    <linearGradient id="${id}-vidrio" x1="0" x2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".18" stop-color="#e8f4fb" stop-opacity=".18"/><stop offset=".75" stop-color="#e8f4fb" stop-opacity=".1"/><stop offset="1" stop-color="#ffffff" stop-opacity=".45"/></linearGradient>
    <linearGradient id="${id}-pared" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe6ea"/><stop offset="1" stop-color="#b9c4cb"/></linearGradient>
    <linearGradient id="${id}-mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5764a"/><stop offset=".12" stop-color="#8a5a30"/><stop offset="1" stop-color="#5e3a1c"/></linearGradient>
    <linearGradient id="${id}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8e6"/><stop offset="1" stop-color="#d6ecf7"/></linearGradient>
    <linearGradient id="${id}-pasto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fae4a"/><stop offset="1" stop-color="#4b7a2a"/></linearGradient>
    <linearGradient id="${id}-papel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3e6c4"/><stop offset=".6" stop-color="#e8d5a6"/><stop offset="1" stop-color="#cfb27a"/></linearGradient>
    <linearGradient id="${id}-metal" x1="0" x2="1"><stop offset="0" stop-color="#8d969c"/><stop offset=".45" stop-color="#e9eef0"/><stop offset="1" stop-color="#6f787e"/></linearGradient>
    <linearGradient id="${id}-llama" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f6bff"/><stop offset=".35" stop-color="#ffd23f"/><stop offset="1" stop-color="#ff6a1a" stop-opacity=".2"/></linearGradient>
    <linearGradient id="${id}-hoja" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fd16a"/><stop offset="1" stop-color="#2f7d2a"/></linearGradient>
    <linearGradient id="${id}-seca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3c35a"/><stop offset="1" stop-color="#9c7a22"/></linearGradient>
    <linearGradient id="${id}-barro" x1="0" x2="1"><stop offset="0" stop-color="#b4552e"/><stop offset=".5" stop-color="#d9754a"/><stop offset="1" stop-color="#8f3f1f"/></linearGradient>
    <linearGradient id="${id}-ladrillo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e2d4"/><stop offset="1" stop-color="#c8bca6"/></linearGradient>
    <radialGradient id="${id}-sol"><stop offset="0" stop-color="#fff7c2"/><stop offset=".55" stop-color="#ffd84a"/><stop offset="1" stop-color="#ffb020" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-luz"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffe680" stop-opacity=".8"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-celula" cx=".4" cy=".35"><stop offset="0" stop-color="#fbe7f0"/><stop offset="1" stop-color="#e7a9c4"/></radialGradient>
    <radialGradient id="${id}-cel-v" cx=".4" cy=".35"><stop offset="0" stop-color="#e6f7d6"/><stop offset="1" stop-color="#a9d98a"/></radialGradient>
    <radialGradient id="${id}-nucleo" cx=".35" cy=".35"><stop offset="0" stop-color="#b98be0"/><stop offset="1" stop-color="#6a3c9a"/></radialGradient>
    <radialGradient id="${id}-piel" cx=".4" cy=".35"><stop offset="0" stop-color="#e9b48c"/><stop offset="1" stop-color="#a86b45"/></radialGradient>
    <filter id="${id}-sombra" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter>
  </defs>`;
  const g = (s, extra = '') => `<g ${extra}>${s}</g>`;
  const sombra = (x, y, w) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(w / 2)}" ry="${n(Math.max(2, w / 12))}" fill="#000" opacity=".28" filter="url(#${id}-sombra)"/>`;
  const L = (x1, y1, x2, y2, c = '#333', w = 1.2, extra = '') => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${c}" stroke-width="${w}" ${extra}/>`;
  const T = (x, y, s, c = '#1d2328', tam = 11, a = 'middle', peso = 600) => `<text x="${n(x)}" y="${n(y)}" fill="${c}" font-size="${tam}" font-weight="${peso}" style="text-anchor:${a};font-family:Jost,system-ui,sans-serif">${s}</text>`;
  const liq = k => LIQ[k] || LIQ.agua;
  const lg = (k, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => { const [a, b] = liq(k); return `<linearGradient id="${id}-l-${k}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`; };
  const LDEFS = `<defs>${Object.keys(LIQ).map(k => lg(k)).join('')}</defs>`;

  const X = {
    LIQ: Object.keys(LIQ),
    // Marco de foto: fondo 'lab' (pared y mesa), 'campo', 'ciudad', 'papel', 'mesa', 'noche' o 'agua'. H = alto del dibujo.
    foto(cuerpo, H = 200, fondo = 'lab', yMesa = H - 34) {
      let f = '';
      if (fondo === 'lab' || fondo === 'mesa') {
        f = `<rect x="0" y="0" width="340" height="${H}" fill="url(#${id}-pared)"/>`;
        if (fondo === 'lab') for (let y = 18; y < yMesa - 10; y += 22) f += L(0, y, 340, y, '#ffffff', 0.6, 'opacity=".35"') + L(0, y + 1, 340, y + 1, '#8e9aa2', 0.5, 'opacity=".25"');
        f += `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="url(#${id}-mesa)"/>` + L(0, yMesa, 340, yMesa, '#c79a6a', 1.5);
        for (let k = 0; k < 6; k++) f += `<path d="M0 ${n(yMesa + 8 + k * 5)} Q170 ${n(yMesa + 5 + k * 6)} 340 ${n(yMesa + 9 + k * 5)}" stroke="#4a2c12" stroke-width=".5" fill="none" opacity=".35"/>`;
      } else if (fondo === 'campo') {
        f = `<rect width="340" height="${H}" fill="url(#${id}-cielo)"/><path d="M0 ${n(yMesa - 30)} Q60 ${n(yMesa - 70)} 130 ${n(yMesa - 40)} T260 ${n(yMesa - 50)} T340 ${n(yMesa - 34)} V${H} H0Z" fill="#8fae9a" opacity=".7"/>` +
          `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="url(#${id}-pasto)"/>`;
      } else if (fondo === 'ciudad') {
        f = `<rect width="340" height="${H}" fill="url(#${id}-cielo)"/>`;
        [[0, 60, 70], [52, 40, 100], [86, 54, 58], [150, 46, 90], [204, 70, 64], [262, 40, 110], [300, 50, 76]].forEach(([x, w, h]) => {
          f += `<rect x="${x}" y="${n(yMesa - h)}" width="${w}" height="${h}" fill="#8796a3"/>`;
          for (let yy = yMesa - h + 8; yy < yMesa - 8; yy += 12) for (let xx = x + 6; xx < x + w - 6; xx += 10) f += `<rect x="${xx}" y="${n(yy)}" width="5" height="6" fill="#d9e4ec" opacity=".75"/>`;
        });
        f += `<rect x="0" y="${n(yMesa)}" width="340" height="${n(H - yMesa)}" fill="#6f7479"/>` + L(0, yMesa + (H - yMesa) / 2, 340, yMesa + (H - yMesa) / 2, '#f2f2f2', 2, 'stroke-dasharray="14 10"');
      } else if (fondo === 'papel') {
        f = `<rect width="340" height="${H}" fill="#5b4a36"/>`;
      } else if (fondo === 'noche') {
        f = `<rect width="340" height="${H}" fill="#121a2b"/>` + [[30, 20], [90, 44], [150, 16], [220, 36], [290, 22], [318, 60], [60, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff" opacity=".8"/>`).join('');
      } else if (fondo === 'agua') {
        f = `<rect width="340" height="${H}" fill="#2a6f97"/><rect width="340" height="${n(H * 0.25)}" fill="#5fa8d3" opacity=".6"/>`;
      }
      return `<g class="xlab">${DEFS}${LDEFS}<clipPath id="${id}-marco-${H}"><rect x="1" y="1" width="338" height="${H - 2}" rx="10"/></clipPath>` +
        `<g clip-path="url(#${id}-marco-${H})">${f}${cuerpo}</g><rect x="1" y="1" width="338" height="${H - 2}" rx="10" fill="none" stroke="#000" stroke-opacity=".25"/></g>`;
    },
    // Placa con texto (rótulo sobre la foto).
    rot(x, y, s, tono = 'claro') {
      const w = Math.max(26, String(s).replace(/<[^>]+>/g, '').length * 6.4 + 14), osc = tono === 'oscuro';
      return `<rect x="${n(x - w / 2)}" y="${n(y - 12)}" width="${n(w)}" height="17" rx="8.5" fill="${osc ? '#1d2328' : '#ffffff'}" fill-opacity=".92" stroke="#000" stroke-opacity=".15"/>` + T(x, y + 1, s, osc ? '#ffffff' : '#1d2328', 11);
    },
    // Flecha sobre la foto.
    flecha(x1, y1, x2, y2, c = '#ffffff') {
      const a = Math.atan2(y2 - y1, x2 - x1), q = d => `${n(x2 - 9 * Math.cos(a + d))} ${n(y2 - 9 * Math.sin(a + d))}`;
      return L(x1, y1, x2, y2, '#000', 3.6, 'opacity=".35" stroke-linecap="round"') + L(x1, y1, x2, y2, c, 2, 'stroke-linecap="round"') + `<path d="M${q(0.45)} L${n(x2)} ${n(y2)} L${q(-0.45)}" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    },
    // Vaso de precipitado: base en (x, y), ancho w, alto h, nivel 0 a 1. o: { hielo, burbujas, marcas, solido (0 a 1, al fondo) }.
    vaso(x, y, w, h, nivel = 0.5, k = 'agua', o = {}) {
      const x0 = x - w / 2, top = y - h, ly = y - 3 - (h - 10) * Math.max(0, Math.min(1, nivel));
      let s = sombra(x, y + 1, w * 1.05);
      if (nivel > 0.01) s += `<path d="M${n(x0 + 3)} ${n(ly)} H${n(x0 + w - 3)} V${n(y - 4)} Q${n(x0 + w - 3)} ${n(y - 1)} ${n(x0 + w - 6)} ${n(y - 1)} H${n(x0 + 6)} Q${n(x0 + 3)} ${n(y - 1)} ${n(x0 + 3)} ${n(y - 4)}Z" fill="url(#${id}-l-${k})" opacity=".88"/>` +
        `<ellipse cx="${n(x)}" cy="${n(ly)}" rx="${n(w / 2 - 3)}" ry="2.4" fill="#ffffff" opacity=".45"/>`;
      if (o.solido) s += `<path d="M${n(x0 + 4)} ${n(y - 2)} Q${n(x)} ${n(y - 2 - 14 * o.solido)} ${n(x0 + w - 4)} ${n(y - 2)}Z" fill="#f4f1ea" stroke="#bdb6a6" stroke-width=".6"/>`;
      for (let i = 0; i < (o.hielo || 0); i++) s += X.hielo(x0 + 12 + (i % 3) * (w - 24) / 2, ly - 2 + Math.floor(i / 3) * 9, 13, (i * 23) % 30 - 15);
      for (let i = 0; i < (o.burbujas || 0); i++) s += `<circle cx="${n(x0 + 8 + ((i * 37) % (w - 16)))}" cy="${n(y - 8 - ((i * 53) % Math.max(4, y - ly - 10)))}" r="${1.4 + (i % 3) * 0.7}" fill="none" stroke="#ffffff" stroke-width=".9" opacity=".85"/>`;
      s += `<path d="M${n(x0 - 3)} ${n(top)} Q${n(x0)} ${n(top)} ${n(x0)} ${n(top + 4)} V${n(y - 4)} Q${n(x0)} ${n(y)} ${n(x0 + 4)} ${n(y)} H${n(x0 + w - 4)} Q${n(x0 + w)} ${n(y)} ${n(x0 + w)} ${n(y - 4)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.3" stroke-opacity=".8"/>`;
      if (o.marcas !== false) for (let k = 1; k <= 4; k++) { const yy = y - 3 - (h - 10) * k / 5; s += L(x0 + w - 13, yy, x0 + w - 3, yy, '#ffffff', 1, 'opacity=".8"'); }
      s += L(x0 + 4, top + 8, x0 + 4, y - 8, '#ffffff', 2.2, 'opacity=".6" stroke-linecap="round"');
      return g(s);
    },
    // Tubo de ensayo vertical en (x, y = fondo), alto h.
    tubo(x, y, h = 70, nivel = 0.4, k = 'agua', o = {}) {
      const r = o.r || 8, top = y - h, ly = y - (h - r) * nivel;
      let s = '';
      if (nivel > 0.01) s += `<path d="M${n(x - r + 1.5)} ${n(ly)} V${n(y - r)} A${r - 1.5} ${r - 1.5} 0 0 0 ${n(x + r - 1.5)} ${n(y - r)} V${n(ly)}Z" fill="url(#${id}-l-${k})" opacity=".9"/>`;
      s += `<path d="M${n(x - r)} ${n(top)} V${n(y - r)} A${r} ${r} 0 0 0 ${n(x + r)} ${n(y - r)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.2"/>` +
        `<rect x="${n(x - r - 2)}" y="${n(top - 3)}" width="${n(2 * r + 4)}" height="4" rx="2" fill="#dfe9ef" stroke="#5d7684" stroke-width=".8"/>` + L(x - r + 2.5, top + 6, x - r + 2.5, y - r - 2, '#fff', 1.6, 'opacity=".6"');
      for (let i = 0; i < (o.burbujas || 0); i++) s += `<circle cx="${n(x - 3 + (i * 5) % 7)}" cy="${n(y - 8 - i * 7)}" r="1.5" fill="none" stroke="#fff" stroke-width=".8"/>`;
      return g(s);
    },
    // Gradilla con tubos: lista de [nivel, líquido].
    gradilla(x, y, tubos) {
      const w = tubos.length * 26 + 16;
      let s = sombra(x, y + 1, w);
      tubos.forEach(([nv, k], i) => { s += X.tubo(x - w / 2 + 21 + i * 26, y - 6, 62, nv, k); });
      s += `<rect x="${n(x - w / 2)}" y="${n(y - 34)}" width="${n(w)}" height="7" rx="2" fill="#c9965f" stroke="#7a5229" stroke-width=".8"/><rect x="${n(x - w / 2)}" y="${n(y - 7)}" width="${n(w)}" height="7" rx="2" fill="#b07d48" stroke="#7a5229" stroke-width=".8"/>`;
      return g(s);
    },
    // Probeta graduada en (x, y = base).
    probeta(x, y, h = 120, nivel = 0.5, k = 'agua', et = '') {
      const w = 22, top = y - h, ly = y - 8 - (h - 16) * nivel;
      let s = sombra(x, y + 1, 40) + `<path d="M${n(x - 20)} ${n(y)} H${n(x + 20)} L${n(x + 14)} ${n(y - 6)} H${n(x - 14)}Z" fill="#dfe9ef" stroke="#5d7684"/>`;
      if (nivel > 0.01) s += `<path d="M${n(x - w / 2 + 2)} ${n(ly + 2)} Q${n(x)} ${n(ly + 5)} ${n(x + w / 2 - 2)} ${n(ly + 2)} V${n(y - 7)} H${n(x - w / 2 + 2)}Z" fill="url(#${id}-l-${k})" opacity=".9"/>`;
      s += `<rect x="${n(x - w / 2)}" y="${n(top)}" width="${w}" height="${n(h - 6)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.2"/>`;
      for (let i = 1; i < 10; i++) { const yy = y - 8 - (h - 16) * i / 10; s += L(x - w / 2, yy, x - w / 2 + (i % 5 ? 5 : 9), yy, '#33424b', 0.8); }
      if (et) s += X.rot(x + 34, ly + 4, et);
      return g(s);
    },
    // Erlenmeyer en (x, y = base), tamaño s (≈ 1).
    matraz(x, y, s = 1, nivel = 0.4, k = 'agua', o = {}) {
      const w = 70 * s, h = 86 * s, cu = 12 * s, top = y - h, hb = h * 0.62, ly = y - 3 - hb * nivel;
      const ancho = yy => (yy > y - hb ? cu / 2 + (w / 2 - cu / 2) * (1 - (y - yy) / hb) : cu / 2);
      let q = sombra(x, y + 1, w);
      if (nivel > 0.01) q += `<path d="M${n(x - ancho(ly) + 2)} ${n(ly)} H${n(x + ancho(ly) - 2)} L${n(x + w / 2 - 3)} ${n(y - 3)} H${n(x - w / 2 + 3)}Z" fill="url(#${id}-l-${k})" opacity=".88"/>`;
      for (let i = 0; i < (o.burbujas || 0); i++) q += `<circle cx="${n(x - w / 4 + (i * 13) % (w / 2))}" cy="${n(y - 6 - (i * 9) % Math.max(4, y - ly - 8))}" r="1.6" fill="none" stroke="#fff" stroke-width=".9"/>`;
      q += `<path d="M${n(x - cu / 2)} ${n(top)} V${n(y - hb)} L${n(x - w / 2)} ${n(y - 3)} Q${n(x - w / 2)} ${n(y)} ${n(x - w / 2 + 4)} ${n(y)} H${n(x + w / 2 - 4)} Q${n(x + w / 2)} ${n(y)} ${n(x + w / 2)} ${n(y - 3)} L${n(x + cu / 2)} ${n(y - hb)} V${n(top)}" fill="url(#${id}-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
        `<rect x="${n(x - cu / 2 - 2)}" y="${n(top - 3)}" width="${n(cu + 4)}" height="4" rx="2" fill="#dfe9ef" stroke="#5d7684" stroke-width=".8"/>`;
      if (o.tapon) q += `<rect x="${n(x - cu / 2 - 1)}" y="${n(top - 10)}" width="${n(cu + 2)}" height="12" rx="2" fill="#7b4f2a"/>`;
      if (o.globo) q += `<path d="M${n(x - cu / 2)} ${n(top + 2)} C${n(x - 26 * o.globo - 6)} ${n(top - 40 * o.globo)} ${n(x + 26 * o.globo + 6)} ${n(top - 40 * o.globo)} ${n(x + cu / 2)} ${n(top + 2)}Z" fill="#e8434f" stroke="#a51f2a" stroke-width=".8"/>`;
      return g(q);
    },
    // Mechero con llama 0 a 1.
    mechero(x, y, llama = 1) {
      let s = sombra(x, y + 1, 46) + `<path d="M${n(x - 20)} ${n(y)} H${n(x + 20)} L${n(x + 14)} ${n(y - 8)} H${n(x - 14)}Z" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width=".8"/>` +
        `<rect x="${n(x - 5)}" y="${n(y - 44)}" width="10" height="37" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width=".8"/>`;
      if (llama > 0.01) s += `<path d="M${n(x)} ${n(y - 44 - 34 * llama)} C${n(x + 9)} ${n(y - 58)} ${n(x + 7)} ${n(y - 46)} ${n(x)} ${n(y - 44)} C${n(x - 7)} ${n(y - 46)} ${n(x - 9)} ${n(y - 58)} ${n(x)} ${n(y - 44 - 34 * llama)}Z" fill="url(#${id}-llama)"/>` +
        `<circle cx="${n(x)}" cy="${n(y - 56)}" r="${n(22 * llama)}" fill="url(#${id}-luz)" opacity=".5"/>`;
      return g(s);
    },
    // Soporte universal con aro a la altura ya (lo que se apoya va encima).
    soporte(x, y, h = 140, ya = 80) {
      return g(sombra(x + 20, y + 1, 70) + `<rect x="${n(x - 16)}" y="${n(y - 6)}" width="72" height="6" rx="2" fill="#3e464c"/>` + `<rect x="${n(x - 3)}" y="${n(y - h)}" width="5" height="${n(h - 6)}" fill="url(#${id}-metal)"/>` +
        L(x, y - ya, x + 36, y - ya, '#59626a', 3) + `<ellipse cx="${n(x + 52)}" cy="${n(y - ya)}" rx="18" ry="4" fill="none" stroke="#59626a" stroke-width="3"/>`);
    },
    // Termómetro vertical: valor 0 a 1 y texto de la lectura.
    termometro(x, y, h = 110, val = 0.5, et = '') {
      const top = y - h, ly = y - 12 - (h - 22) * val;
      let s = `<rect x="${n(x - 6)}" y="${n(top)}" width="12" height="${n(h - 8)}" rx="6" fill="#f6f8f9" stroke="#7d8b93"/>` + `<circle cx="${n(x)}" cy="${n(y - 6)}" r="9" fill="#d7263d" stroke="#8b1222"/>` +
        `<rect x="${n(x - 2.2)}" y="${n(ly)}" width="4.4" height="${n(y - 8 - ly)}" fill="#d7263d"/>`;
      for (let i = 1; i < 10; i++) { const yy = y - 12 - (h - 22) * i / 10; s += L(x + 6, yy, x + (i % 5 ? 9 : 12), yy, '#56646c', 0.8); }
      if (et) s += X.rot(x + 30, ly + 4, et);
      return g(s);
    },
    // Balanza digital con su pantalla.
    balanza(x, y, lectura = '0.0 g') {
      return g(sombra(x, y + 1, 104) + `<path d="M${n(x - 50)} ${n(y)} H${n(x + 50)} L${n(x + 44)} ${n(y - 22)} H${n(x - 44)}Z" fill="#e9edef" stroke="#7a868d"/>` +
        `<rect x="${n(x - 42)}" y="${n(y - 30)}" width="84" height="8" rx="2" fill="url(#${id}-metal)" stroke="#6b757b"/>` +
        `<rect x="${n(x - 26)}" y="${n(y - 18)}" width="52" height="13" rx="2" fill="#1f2b22"/>` + T(x, y - 8, lectura, '#9cff8a', 10, 'middle', 600));
    },
    // Cubo de hielo.
    hielo(x, y, s = 14, rot = 0) {
      return `<g transform="rotate(${rot} ${n(x)} ${n(y)})"><rect x="${n(x - s / 2)}" y="${n(y - s / 2)}" width="${n(s)}" height="${n(s)}" rx="3" fill="#eaf7ff" fill-opacity=".85" stroke="#9cc7de"/>` +
        L(x - s / 2 + 3, y - s / 2 + 3, x - s / 2 + s * 0.6, y - s / 2 + 3, '#ffffff', 1.4) + `</g>`;
    },
    // Planta en maceta: alto h, salud 0 (seca) a 1 (verde), o: { hojas, flor }.
    planta(x, y, h = 60, salud = 1, o = {}) {
      const hj = o.hojas ?? 6, col = salud > 0.5 ? `${id}-hoja` : `${id}-seca`, inc = (1 - salud) * 18;
      let s = sombra(x, y + 1, 50) + `<path d="M${n(x - 20)} ${n(y - 34)} H${n(x + 20)} L${n(x + 15)} ${n(y)} H${n(x - 15)}Z" fill="url(#${id}-barro)"/>` +
        `<rect x="${n(x - 23)}" y="${n(y - 38)}" width="46" height="7" rx="2" fill="#c4643a"/><ellipse cx="${n(x)}" cy="${n(y - 37)}" rx="19" ry="3" fill="#4a3120"/>`;
      const top = y - 38 - h;
      s += `<path d="M${n(x)} ${n(y - 37)} Q${n(x + 4 + inc / 2)} ${n((y - 37 + top) / 2)} ${n(x + inc)} ${n(top)}" stroke="#3d7a2c" stroke-width="3" fill="none"/>`;
      for (let i = 0; i < hj; i++) {
        const t = (i + 1) / (hj + 1), yy = y - 37 - h * t, xx = x + inc * t * t, lado = i % 2 ? 1 : -1, cai = (1 - salud) * 30;
        s += `<path d="M${n(xx)} ${n(yy)} q${n(lado * 12)} ${n(-10 + cai / 3)} ${n(lado * 24)} ${n(-2 + cai)} q${n(-lado * 12)} ${n(6)} ${n(-lado * 24)} ${n(2 - cai)}Z" fill="url(#${col})" stroke="#2a5a1e" stroke-width=".6"/>`;
      }
      if (o.flor) s += `<g>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${n(x + inc + 7 * Math.cos(a * Math.PI / 180))}" cy="${n(top - 4 + 7 * Math.sin(a * Math.PI / 180))}" rx="6" ry="4" transform="rotate(${a} ${n(x + inc + 7 * Math.cos(a * Math.PI / 180))} ${n(top - 4 + 7 * Math.sin(a * Math.PI / 180))})" fill="#f5a3c7"/>`).join('')}<circle cx="${n(x + inc)}" cy="${n(top - 4)}" r="4" fill="#ffd23f"/></g>`;
      return g(s);
    },
    sol: (x, y, r = 22) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 2)}" fill="url(#${id}-sol)"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r * 0.7)}" fill="#ffe25a"/>`,
    // Lámpara de escritorio apuntando abajo; on 0 a 1.
    lampara(x, y, on = 1) {
      return g(`<rect x="${n(x - 18)}" y="${n(y - 5)}" width="36" height="5" rx="2" fill="#2f3539"/>` + L(x, y - 5, x - 10, y - 70, '#3b4247', 3) + L(x - 10, y - 70, x + 30, y - 96, '#3b4247', 3) +
        `<path d="M${n(x + 22)} ${n(y - 104)} L${n(x + 50)} ${n(y - 90)} L${n(x + 40)} ${n(y - 76)}Z" fill="#2f6f8f"/>` + (on > 0.01 ? `<path d="M${n(x + 45)} ${n(y - 83)} L${n(x + 95)} ${n(y)} L${n(x + 5)} ${n(y)}Z" fill="#fff3a8" opacity="${n(0.35 * on)}"/>` : ''));
    },
    // Resorte colgado de (x, y) con largo largo y una pesa abajo con su texto.
    resorte(x, y, largo = 60, pesa = '') {
      let d = `M${n(x)} ${n(y)} v6`, k = 10, paso = (largo - 12) / k;
      for (let i = 0; i < k; i++) d += ` l${i % 2 ? -9 : 9} ${n(paso / 2)} l${i % 2 ? 9 : -9} ${n(paso / 2)}`;
      d += ' v6';
      let s = `<rect x="${n(x - 40)}" y="${n(y - 8)}" width="80" height="8" fill="url(#${id}-metal)"/>` + `<path d="${d}" stroke="#6e7b83" stroke-width="2" fill="none"/>`;
      if (pesa) s += `<rect x="${n(x - 16)}" y="${n(y + largo)}" width="32" height="26" rx="3" fill="url(#${id}-metal)" stroke="#4d565c"/>` + T(x, y + largo + 17, pesa, '#1d2328', 10);
      return g(s);
    },
    // Imán de barra con N (rojo) y S (azul), ancho w, girado rot grados.
    iman(x, y, w = 90, rot = 0) {
      return `<g transform="rotate(${rot} ${n(x)} ${n(y)})">${sombra(x, y + 13, w)}<rect x="${n(x - w / 2)}" y="${n(y - 10)}" width="${n(w / 2)}" height="20" fill="#d63a3a"/><rect x="${n(x)}" y="${n(y - 10)}" width="${n(w / 2)}" height="20" fill="#3a5fd6"/>` +
        L(x - w / 2 + 2, y - 7, x + w / 2 - 2, y - 7, '#fff', 1.4, 'opacity=".45"') + T(x - w / 4, y + 4, 'N', '#fff', 12) + T(x + w / 4, y + 4, 'S', '#fff', 12) + `</g>`;
    },
    // Pila con + y −.
    pila(x, y, et = '1.5 V') {
      return g(sombra(x, y + 14, 60) + `<rect x="${n(x - 28)}" y="${n(y - 11)}" width="56" height="22" rx="4" fill="#2b2f33"/><rect x="${n(x + 6)}" y="${n(y - 11)}" width="22" height="22" rx="0" fill="#d9a400"/>` +
        `<rect x="${n(x + 28)}" y="${n(y - 4)}" width="5" height="8" fill="url(#${id}-metal)"/>` + L(x - 26, y - 8, x + 26, y - 8, '#fff', 1.2, 'opacity=".4"') + T(x - 10, y + 4, et, '#fff', 9) + T(x + 17, y + 4, '+', '#2b2f33', 12));
    },
    // Bombillo encendido de 0 a 1.
    bombillo(x, y, on = 1) {
      return g((on > 0.01 ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(36 * on)}" fill="url(#${id}-luz)"/>` : '') +
        `<path d="M${n(x - 9)} ${n(y + 12)} C${n(x - 22)} ${n(y)} ${n(x - 14)} ${n(y - 20)} ${n(x)} ${n(y - 20)} C${n(x + 14)} ${n(y - 20)} ${n(x + 22)} ${n(y)} ${n(x + 9)} ${n(y + 12)}Z" fill="${on > 0.3 ? '#fff6b8' : '#eef3f5'}" fill-opacity=".9" stroke="#8a969c"/>` +
        `<path d="M${n(x - 4)} ${n(y + 10)} L${n(x - 3)} ${n(y - 4)} L${n(x + 3)} ${n(y - 4)} L${n(x + 4)} ${n(y + 10)}" stroke="${on > 0.3 ? '#ff9b1a' : '#7d878c'}" stroke-width="1.2" fill="none"/>` +
        `<rect x="${n(x - 9)}" y="${n(y + 12)}" width="18" height="12" rx="2" fill="url(#${id}-metal)" stroke="#5b646a"/>`);
    },
    // Cable por una lista de puntos.
    cable: (pts, c = '#c0392b') => `<polyline points="${pts.map(q => q.map(n).join(',')).join(' ')}" stroke="#000" stroke-opacity=".3" stroke-width="4" fill="none" stroke-linejoin="round"/><polyline points="${pts.map(q => q.map(n).join(',')).join(' ')}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`,
    // Microscopio de perfil, tamaño s.
    microscopio(x, y, s = 1) {
      const P = (a, b) => `${n(x + a * s)} ${n(y + b * s)}`;
      return g(sombra(x, y + 1, 80 * s) + `<path d="M${P(-36, 0)} H${n(x + 36 * s)} L${P(30, -10)} H${n(x - 30 * s)}Z" fill="#2f3539"/>` +
        `<path d="M${P(14, -10)} C${P(30, -40)} ${P(30, -90)} ${P(8, -110)}" stroke="#3b4247" stroke-width="${n(12 * s)}" fill="none" stroke-linecap="round"/>` +
        `<rect x="${n(x - 26 * s)}" y="${n(y - 52 * s)}" width="${n(44 * s)}" height="${n(5 * s)}" fill="#4a5258"/>` +
        `<path d="M${P(-6, -112)} L${P(2, -66)} L${P(-10, -64)} L${P(-18, -110)}Z" fill="url(#${id}-metal)" stroke="#4d565c"/>` +
        `<rect x="${n(x - 22 * s)}" y="${n(y - 126 * s)}" width="${n(14 * s)}" height="${n(18 * s)}" rx="2" transform="rotate(-12 ${P(-15, -117).replace(' ', ' ')})" fill="#2f3539"/>` +
        `<circle cx="${n(x - 4 * s)}" cy="${n(y - 30 * s)}" r="${n(6 * s)}" fill="#fff3a8" stroke="#8a969c"/>`);
    },
    // Célula vista al microscopio: tipo 'animal' o 'vegetal'.
    celula(x, y, r = 50, tipo = 'animal') {
      let s = '';
      if (tipo === 'vegetal') {
        s += `<rect x="${n(x - r)}" y="${n(y - r * 0.8)}" width="${n(2 * r)}" height="${n(1.6 * r)}" rx="8" fill="url(#${id}-cel-v)" stroke="#4f8a2e" stroke-width="4"/>` +
          `<rect x="${n(x - r * 0.55)}" y="${n(y - r * 0.45)}" width="${n(r * 0.9)}" height="${n(r * 0.8)}" rx="14" fill="#d7efe9" opacity=".8"/>`;
        for (let i = 0; i < 7; i++) s += `<ellipse cx="${n(x - r * 0.8 + ((i * 41) % (r * 1.6)))}" cy="${n(y - r * 0.6 + ((i * 29) % (r * 1.2)))}" rx="7" ry="4" fill="#3e9b35" stroke="#256b20" stroke-width=".6"/>`;
        s += `<circle cx="${n(x + r * 0.55)}" cy="${n(y + r * 0.3)}" r="${n(r * 0.22)}" fill="url(#${id}-nucleo)"/>`;
      } else {
        s += `<path d="M${n(x - r)} ${n(y)} C${n(x - r)} ${n(y - r * 0.9)} ${n(x + r * 0.7)} ${n(y - r)} ${n(x + r)} ${n(y - r * 0.2)} C${n(x + r * 1.1)} ${n(y + r * 0.7)} ${n(x - r * 0.3)} ${n(y + r)} ${n(x - r)} ${n(y)}Z" fill="url(#${id}-celula)" stroke="#b5527d" stroke-width="1.6"/>`;
        for (let i = 0; i < 6; i++) s += `<ellipse cx="${n(x - r * 0.6 + ((i * 37) % (r * 1.3)))}" cy="${n(y - r * 0.4 + ((i * 23) % (r * 0.9)))}" rx="6" ry="3" fill="#f08a4b" opacity=".8"/>`;
        s += `<circle cx="${n(x + r * 0.05)}" cy="${n(y + r * 0.05)}" r="${n(r * 0.26)}" fill="url(#${id}-nucleo)"/>`;
      }
      return g(s);
    },
    // Lupa: aro en (x, y) de radio r, mango hacia abajo a la derecha.
    lupa(x, y, r = 26) {
      return g(L(x + r * 0.7, y + r * 0.7, x + r * 1.6, y + r * 1.6, '#3b2a1c', 7, 'stroke-linecap="round"') + `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#dff3ff" fill-opacity=".35" stroke="#3b4247" stroke-width="4"/>` +
        `<path d="M${n(x - r * 0.6)} ${n(y - r * 0.2)} A${n(r * 0.7)} ${n(r * 0.7)} 0 0 1 ${n(x - r * 0.1)} ${n(y - r * 0.65)}" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`);
    },
    // Cronómetro con su texto.
    cronometro(x, y, r = 22, et = '00:10') {
      return g(sombra(x, y + r + 2, r * 2) + `<rect x="${n(x - 4)}" y="${n(y - r - 8)}" width="8" height="7" fill="#5b646a"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="url(#${id}-metal)" stroke="#4d565c" stroke-width="1.5"/>` +
        `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r - 5)}" fill="#f7f9fa"/>` + T(x, y + 4, et, '#1d2328', 10));
    },
    // Regla de madera: largo en px y marcas cada `cada` px.
    regla(x, y, largo = 200, cada = 20) {
      let s = `<rect x="${n(x)}" y="${n(y)}" width="${n(largo)}" height="16" rx="2" fill="#f0d08a" stroke="#a37a2c"/>`;
      for (let k = 0; k * cada <= largo; k++) s += L(x + k * cada, y, x + k * cada, y + (k % 5 ? 5 : 9), '#5a4214', 0.8);
      return g(s);
    },
    gota: (x, y, s = 10, k = 'agua') => `<path d="M${n(x)} ${n(y - s)} C${n(x + s * 0.8)} ${n(y)} ${n(x + s * 0.7)} ${n(y + s * 0.8)} ${n(x)} ${n(y + s * 0.8)} C${n(x - s * 0.7)} ${n(y + s * 0.8)} ${n(x - s * 0.8)} ${n(y)} ${n(x)} ${n(y - s)}Z" fill="url(#${id}-l-${k})" stroke="#2c6f99" stroke-width=".6"/>`,
    // Árbol de copa redonda.
    arbol(x, y, s = 1, salud = 1) {
      const c = salud > 0.5 ? ['#5c9e3c', '#3a7424'] : ['#c9a441', '#8a6d1f'];
      return g(sombra(x, y + 1, 50 * s) + `<path d="M${n(x - 4 * s)} ${n(y)} L${n(x - 3 * s)} ${n(y - 34 * s)} L${n(x + 3 * s)} ${n(y - 34 * s)} L${n(x + 4 * s)} ${n(y)}Z" fill="#6b4423"/>` +
        [[0, -52, 22], [-14, -40, 16], [14, -42, 17], [0, -36, 15]].map(([a, b, r], i) => `<circle cx="${n(x + a * s)}" cy="${n(y + b * s)}" r="${n(r * s)}" fill="${c[i % 2]}"/>`).join('') +
        `<circle cx="${n(x - 6 * s)}" cy="${n(y - 58 * s)}" r="${n(6 * s)}" fill="#fff" opacity=".15"/>`);
    },
    // Pez de lado, mirando a la derecha.
    pez(x, y, s = 1, c = '#f39c32') {
      return g(`<path d="M${n(x - 22 * s)} ${n(y)} C${n(x - 10 * s)} ${n(y - 14 * s)} ${n(x + 14 * s)} ${n(y - 12 * s)} ${n(x + 22 * s)} ${n(y)} C${n(x + 14 * s)} ${n(y + 12 * s)} ${n(x - 10 * s)} ${n(y + 14 * s)} ${n(x - 22 * s)} ${n(y)}Z" fill="${c}"/>` +
        `<path d="M${n(x - 20 * s)} ${n(y)} L${n(x - 32 * s)} ${n(y - 10 * s)} L${n(x - 30 * s)} ${n(y + 10 * s)}Z" fill="${c}"/><circle cx="${n(x + 13 * s)}" cy="${n(y - 3 * s)}" r="${n(2.2 * s)}" fill="#1d2328"/>` +
        `<path d="M${n(x - 4 * s)} ${n(y - 9 * s)} Q${n(x + 2 * s)} ${n(y)} ${n(x - 4 * s)} ${n(y + 9 * s)}" stroke="#fff" stroke-opacity=".4" fill="none"/>`);
    },
    // ---------------------------------------------------------------------------------------------------- sociales e inglés
    // Documento antiguo con renglones de texto (lista de cadenas cortas) y sello.
    documento(x, y, w = 150, h = 120, lineas = [], o = {}) {
      let s = sombra(x + w / 2, y + h + 2, w) + `<path d="M${n(x)} ${n(y + 4)} Q${n(x + w / 2)} ${n(y - 3)} ${n(x + w)} ${n(y + 2)} L${n(x + w - 2)} ${n(y + h)} Q${n(x + w / 2)} ${n(y + h + 4)} ${n(x + 2)} ${n(y + h - 2)}Z" fill="url(#${id}-papel)" stroke="#9c7b45" stroke-width=".8"/>`;
      if (o.titulo) s += T(x + w / 2, y + 20, o.titulo, '#3b2a12', 12, 'middle', 600);
      lineas.forEach((t, i) => { s += T(x + 12, y + (o.titulo ? 38 : 22) + i * 15, t, '#3b2a12', 10, 'start', 500); });
      if (o.sello) s += `<circle cx="${n(x + w - 26)}" cy="${n(y + h - 24)}" r="14" fill="#a3242a"/><circle cx="${n(x + w - 26)}" cy="${n(y + h - 24)}" r="9" fill="none" stroke="#e7a2a2" stroke-width="1"/>` + T(x + w - 26, y + h - 20, o.sello, '#f3d3d3', 8);
      if (o.fecha) s += T(x + 12, y + h - 10, o.fecha, '#6b4f22', 9, 'start', 500);
      return g(s);
    },
    // Hoja de periódico con titular y columnas.
    periodico(x, y, w = 150, h = 110, titular = '', o = {}) {
      let s = sombra(x + w / 2, y + h + 2, w) + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="#f2f0ea" stroke="#9a978e"/>` +
        T(x + w / 2, y + 14, o.nombre || 'EL DIARIO', '#1d2328', 11, 'middle', 600) + L(x + 6, y + 19, x + w - 6, y + 19, '#1d2328', 1.2) + T(x + 8, y + 34, titular, '#1d2328', 11, 'start', 600);
      const cols = 3, cw = (w - 16 - (cols - 1) * 6) / cols;
      for (let c = 0; c < cols; c++) for (let r = 0; r < Math.floor((h - 50) / 7); r++) s += L(x + 8 + c * (cw + 6), y + 46 + r * 7, x + 8 + c * (cw + 6) + cw * (r % 4 === 3 ? 0.6 : 1), y + 46 + r * 7, '#8d8a82', 1.6);
      if (o.foto) s += `<rect x="${n(x + 8)}" y="${n(y + 44)}" width="${n(cw)}" height="30" fill="#b8c3c9"/>`;
      return g(s);
    },
    // Urna de votación con un voto entrando (entra 0 a 1).
    urna(x, y, s = 1, entra = 0.5) {
      const w = 70 * s, h = 60 * s;
      return g(sombra(x, y + 1, w * 1.1) + `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" rx="3" fill="#e9f1f7" fill-opacity=".75" stroke="#6d8696" stroke-width="1.4"/>` +
        `<rect x="${n(x - w / 2 - 3)}" y="${n(y - h - 6)}" width="${n(w + 6)}" height="7" rx="2" fill="#3f5d73"/><rect x="${n(x - 14 * s)}" y="${n(y - h - 4)}" width="${n(28 * s)}" height="3" fill="#0e1b24"/>` +
        `<rect x="${n(x - 11 * s)}" y="${n(y - h - 4 - 26 * s * (1 - entra))}" width="${n(22 * s)}" height="${n(28 * s)}" fill="#fffdf6" stroke="#9a978e" transform="rotate(-4 ${n(x)} ${n(y - h)})"/>` +
        T(x, y - h / 2 + 4, 'VOTO', '#3f5d73', 11) + `<rect x="${n(x - w / 2 + 4)}" y="${n(y - h + 3)}" width="5" height="${n(h - 8)}" fill="#fff" opacity=".5"/>`);
    },
    // Edificio: 'capitolio', 'fabrica', 'casa', 'colegio', 'hospital'. Base en (x, y), ancho w.
    edificio(x, y, w = 110, tipo = 'casa', o = {}) {
      let s = sombra(x, y + 1, w * 1.05);
      if (tipo === 'capitolio') {
        const h = w * 0.55;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - 8)}" width="${n(w)}" height="8" fill="#cfc6b4"/><rect x="${n(x - w / 2 + 6)}" y="${n(y - h)}" width="${n(w - 12)}" height="${n(h - 8)}" fill="url(#${id}-ladrillo)"/>`;
        for (let k = 0; k < 8; k++) s += `<rect x="${n(x - w / 2 + 12 + k * (w - 30) / 7)}" y="${n(y - h + 8)}" width="6" height="${n(h - 18)}" fill="#f7f3ea" stroke="#b5ab96" stroke-width=".6"/>`;
        s += `<path d="M${n(x - w / 2)} ${n(y - h)} L${n(x)} ${n(y - h - w * 0.2)} L${n(x + w / 2)} ${n(y - h)}Z" fill="#e3dccd" stroke="#b5ab96"/>`;
        if (o.bandera !== false) s += L(x, y - h - w * 0.2, x, y - h - w * 0.2 - 26, '#555', 1.4) + `<rect x="${n(x)}" y="${n(y - h - w * 0.2 - 26)}" width="18" height="5" fill="#fcd116"/><rect x="${n(x)}" y="${n(y - h - w * 0.2 - 21)}" width="18" height="2.5" fill="#003893"/><rect x="${n(x)}" y="${n(y - h - w * 0.2 - 18.5)}" width="18" height="2.5" fill="#ce1126"/>`;
      } else if (tipo === 'fabrica') {
        const h = w * 0.4;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="#9a6b52"/>` + [0, 1, 2].map(k => `<path d="M${n(x - w / 2 + k * w / 3)} ${n(y - h)} l${n(w / 3)} ${n(-h * 0.4)} v${n(h * 0.4)}Z" fill="#7d533e"/>`).join('') +
          `<rect x="${n(x + w / 2 - 24)}" y="${n(y - h - 50)}" width="14" height="50" fill="#8a5c45"/>`;
        for (let k = 0; k < 4; k++) s += `<rect x="${n(x - w / 2 + 10 + k * (w - 20) / 4)}" y="${n(y - h / 2)}" width="12" height="10" fill="#e8d9a8"/>`;
        if (o.humo !== 0) for (let k = 0; k < 4; k++) s += `<circle cx="${n(x + w / 2 - 17 + k * 9)}" cy="${n(y - h - 58 - k * 12)}" r="${8 + k * 3}" fill="#7d7f82" opacity="${n((o.humo ?? 1) * (0.55 - k * 0.1))}"/>`;
      } else if (tipo === 'colegio' || tipo === 'hospital') {
        const h = w * 0.5;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="${tipo === 'hospital' ? '#eef3f6' : '#f0d9a8'}" stroke="#9aa3a8"/>`;
        for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) s += `<rect x="${n(x - w / 2 + 8 + k * (w - 16) / 5)}" y="${n(y - h + 8 + r * h * 0.42)}" width="${n((w - 16) / 5 - 6)}" height="${n(h * 0.28)}" fill="#a9c7da"/>`;
        s += tipo === 'hospital' ? `<rect x="${n(x - 4)}" y="${n(y - h - 22)}" width="8" height="20" fill="#d7263d"/><rect x="${n(x - 10)}" y="${n(y - h - 16)}" width="20" height="8" fill="#d7263d"/>` : `<path d="M${n(x - w / 2 - 4)} ${n(y - h)} L${n(x)} ${n(y - h - 20)} L${n(x + w / 2 + 4)} ${n(y - h)}Z" fill="#b24a30"/>`;
      } else {
        const h = w * 0.5;
        s += `<rect x="${n(x - w / 2)}" y="${n(y - h)}" width="${n(w)}" height="${n(h)}" fill="#f2e6cf" stroke="#b3a27f"/><path d="M${n(x - w / 2 - 6)} ${n(y - h)} L${n(x)} ${n(y - h - w * 0.32)} L${n(x + w / 2 + 6)} ${n(y - h)}Z" fill="#b5492b"/>` +
          `<rect x="${n(x - 9)}" y="${n(y - h * 0.55)}" width="18" height="${n(h * 0.55)}" fill="#7a4b26"/><rect x="${n(x - w / 2 + 10)}" y="${n(y - h * 0.7)}" width="18" height="14" fill="#a9c7da"/><rect x="${n(x + w / 2 - 28)}" y="${n(y - h * 0.7)}" width="18" height="14" fill="#a9c7da"/>`;
      }
      return g(s);
    },
    // Persona de pie, tamaño s, color de la ropa, o: { cartel: 'texto' }.
    persona(x, y, s = 1, ropa = '#3f6fb5', o = {}) {
      const P = (a, b) => `${n(x + a * s)} ${n(y + b * s)}`;
      let q = sombra(x, y + 1, 26 * s) + `<path d="M${P(-5, 0)} L${P(-4, -26)} L${P(4, -26)} L${P(5, 0)}" stroke="#2b3440" stroke-width="${n(5 * s)}" fill="none"/>` +
        `<path d="M${P(-10, -24)} Q${P(-11, -50)} ${P(0, -52)} Q${P(11, -50)} ${P(10, -24)}Z" fill="${ropa}"/>` +
        `<circle cx="${n(x)}" cy="${n(y - 60 * s)}" r="${n(8 * s)}" fill="url(#${id}-piel)"/><path d="M${P(-8, -62)} Q${P(0, -73)} ${P(8, -62)}" fill="#2a1c12"/>`;
      if (o.cartel) q += L(x + 12 * s, y - 30 * s, x + 12 * s, y - 86 * s, '#6b4423', 2) + `<rect x="${n(x + 12 * s - 26)}" y="${n(y - 108 * s)}" width="52" height="24" rx="2" fill="#fffdf6" stroke="#9a978e"/>` + T(x + 12 * s, y - 92 * s, o.cartel, '#1d2328', 9);
      return g(q);
    },
    // Moneda y billete.
    moneda: (x, y, r = 14, et = '$') => g(`<circle cx="${n(x)}" cy="${n(y + 2)}" r="${n(r)}" fill="#8a6d1f"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#e2b93b" stroke="#9c7a22"/><circle cx="${n(x)}" cy="${n(y)}" r="${n(r - 4)}" fill="none" stroke="#b8901f"/>` + T(x, y + 4, et, '#6b4f12', 10)),
    billete: (x, y, w = 90, et = '$ 50 000') => g(sombra(x + w / 2, y + w * 0.45 + 2, w) + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(w * 0.45)}" rx="3" fill="#bfe0c8" stroke="#4d8a5c"/><circle cx="${n(x + w * 0.25)}" cy="${n(y + w * 0.22)}" r="${n(w * 0.13)}" fill="#8cc29c"/>` + T(x + w * 0.66, y + w * 0.28, et, '#24543a', 10)),
    // Río sinuoso de izquierda a derecha a la altura y.
    rio: (y, ancho = 16) => `<path d="M0 ${n(y)} C90 ${n(y - 20)} 150 ${n(y + 24)} 230 ${n(y)} S320 ${n(y - 10)} 340 ${n(y + 4)}" stroke="#4f97c9" stroke-width="${ancho}" fill="none"/><path d="M0 ${n(y - 3)} C90 ${n(y - 23)} 150 ${n(y + 21)} 230 ${n(y - 3)}" stroke="#bfe3f7" stroke-width="1.4" fill="none" opacity=".7"/>`,
    // Aviso realista (para Inglés): tipo 'metal' (gris con tornillos), 'verde', 'peligro' (amarillo), 'papel' (nota pegada), 'rojo'.
    aviso(x, y, w = 170, h = 80, lineas = [], tipo = 'metal', o = {}) {
      const C = { metal: ['#e9eef0', '#56646c', '#1d2328'], verde: ['#1f7a4a', '#0f4d2d', '#ffffff'], peligro: ['#ffd23f', '#1d2328', '#1d2328'], papel: ['#fff7b8', '#c9b85a', '#2b2b2b'], rojo: ['#c62828', '#7f1515', '#ffffff'], azul: ['#1f5fae', '#0f3a6e', '#ffffff'] }[tipo] || ['#e9eef0', '#56646c', '#1d2328'];
      let s = '';
      if (o.poste) s += `<rect x="${n(x + w / 2 - 4)}" y="${n(y + h)}" width="8" height="${n(o.poste)}" fill="url(#${id}-metal)"/>`;
      s += sombra(x + w / 2, y + h + 3, w) + (tipo === 'papel' ? `<path d="M${n(x)} ${n(y)} H${n(x + w)} V${n(y + h - 8)} L${n(x + w - 10)} ${n(y + h)} H${n(x)}Z" fill="${C[0]}" stroke="${C[1]}"/><rect x="${n(x + w / 2 - 18)}" y="${n(y - 6)}" width="36" height="11" fill="#e9eef0" fill-opacity=".7"/>`
        : `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="6" fill="${C[0]}" stroke="${C[1]}" stroke-width="2"/><rect x="${n(x + 5)}" y="${n(y + 5)}" width="${n(w - 10)}" height="${n(h - 10)}" rx="4" fill="none" stroke="${C[2]}" stroke-opacity=".5"/>`);
      if (tipo === 'peligro') s += `<path d="M${n(x + 22)} ${n(y + 14)} L${n(x + 36)} ${n(y + 38)} H${n(x + 8)}Z" fill="#1d2328"/>` + T(x + 22, y + 35, '!', '#ffd23f', 14);
      if (tipo === 'metal' || tipo === 'verde' || tipo === 'azul' || tipo === 'rojo') [[8, 8], [w - 8, 8], [8, h - 8], [w - 8, h - 8]].forEach(([a, b]) => { s += `<circle cx="${n(x + a)}" cy="${n(y + b)}" r="2" fill="url(#${id}-metal)" stroke="#555" stroke-width=".4"/>`; });
      const x0 = tipo === 'peligro' ? x + 44 + (w - 44) / 2 : x + w / 2, dy = h / (lineas.length + 1);
      lineas.forEach((t, i) => { s += T(x0, y + dy * (i + 1) + 4, t, C[2], i === 0 ? 12 : 10, 'middle', i === 0 ? 600 : 500); });
      return g(s);
    },
  };
  return X;
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
//#archivo js/explora-icf-ma-2-pasos.js
// Preicfes · Matemáticas, mundo 2 «Proporciones y Porcentajes», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde
// comparar restando o dividiendo, las unidades de medida, el porcentaje como razón con 100, lo que vale uno y las horas en
// decimales, hasta las trampas que más salen (parte frente a total, porcentaje de un porcentaje, directa o inversa, unidades).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Dos filas de puntos: a de un color, b de otro.
  const filas = (v, K) => {
    const f = (n, y, cls) => Array.from({ length: Math.round(n) }, (_, i) => K.c(40 + (i % 12) * 23, y + Math.floor(i / 12) * 22, 9, cls)).join('');
    return f(v.a, 46, 'fA') + f(v.b, 118, 'fG') + K.t(24, 24, `${Math.round(v.a)} ${v.ea}`, 's ta', 'start') + K.t(24, 96, `${Math.round(v.b)} ${v.eb}`, 's tg', 'start') + K.t(316, 24, v.t || '', 's tm', 'end');
  };
  // Cuadrícula de 100.
  const cien = (v, K) => {
    let h = '';
    for (let i = 0; i < 100; i++) h += K.r(96 + (i % 10) * 14, 8 + Math.floor(i / 10) * 14, 12, 12, i < Math.round(v.k) ? 'fA' : 'fc', 2);
    return h + K.t(252, 74, `${Math.round(v.k)} %`, 'b ta', 'start') + K.t(252, 96, v.t || '', 's tm', 'start');
  };
  // Reloj: el minutero en m minutos y la parte de la hora pintada.
  const reloj = (v, K) => {
    const g = 90 - v.m * 6, [x, y] = K.at(150, 92, 64, g);
    let h = K.c(150, 92, 74, 'fc') + (v.m >= 60 ? K.c(150, 92, 70, 'fa') : K.sec(150, 92, 70, g, 90, 'fa'));
    for (let k = 0; k < 12; k++) { const [a, b] = K.at(150, 92, 66, 90 - k * 30), [c, d] = K.at(150, 92, 74, 90 - k * 30); h += K.l(a, b, c, d, 'lm'); }
    return h + K.l(150, 92, x, y, 'la gr') + K.c(150, 92, 4, 'fk') + K.t(246, 80, `${Math.round(v.m)} min`, 'b', 'start') + K.t(246, 104, `${String(Math.round(v.m / 60 * 100) / 100)} h`, 'ta', 'start');
  };

  xpAmplia('icf-ma-proporcion-1', {
    conecta: 'icf-ma-datos-3',
    desde: [
      ['Desde cero: comparar restando o dividiendo',
        xpMira('dibujo', 'Hay dos maneras de comparar dos cantidades: **restando** (cuánto más) y **dividiendo** (cuántas veces).', { dib: filas, v: { a: 6, b: 2, ea: 'canicas de Juan', eb: 'canicas de Leo', t: '' }, alto: 150 }, [
          ['En la lección de muestras viste que para comparar grupos se divide entre su total.', {}],
          ['Juan tiene 6 canicas y Leo tiene 2. Restando, Juan tiene 4 más.', { t: '6 − 2 = 4' }, '$6 - 2 = 4$'],
          ['Dividiendo, Juan tiene 3 veces las de Leo. Esa comparación es una razón.', { t: '6 ÷ 2 = 3' }, '$6 \\div 2 = 3$'],
          ['Se escribe 6 : 2 y se lee «6 a 2». Vale lo mismo que 3 : 1.', { t: '6 : 2 = 3 : 1' }, '$6 : 2 = 3 : 1$'],
          ['El orden importa: Leo frente a Juan es 2 : 6, o sea 1 : 3.', { t: '2 : 6 = 1 : 3' }],
        ], 'Una razón compara dividiendo: cuántas veces cabe una cantidad en la otra.'),
        xpHaz('fichas', 'En un salón hay 12 niñas y 8 niños. Pon cuántas niñas **más** hay y la **razón** de niñas a niños, simplificada.', { slots: fila('cuántas más', 'razón'), fichas: ['4', '3 : 2', '2 : 3', '12 : 20', '20'], meta: ['4', '3 : 2'], alto: 96, pista: 'La primera se resta. La segunda se divide y se simplifica, con las niñas primero.' }, '$12 - 8 = 4$ y $12 : 8 = 3 : 2$.')],
      ['Desde cero: unidades de medida',
        xpMira('fichas', 'Las escalas mezclan **centímetros**, **metros** y **kilómetros**. Antes de usarlas hay que saber pasar de una a otra.', { slots: fila('cm en 1 m', 'm en 1 km', 'cm en 1 km'), fichas: ['100', '1 000', '100 000'], alto: 96 }, [
          ['Para usar un mapa hay que pasar de una unidad de medida a otra.', {}],
          ['Un metro, más o menos un paso largo, tiene 100 centímetros.', { pon: { 0: '100' } }],
          ['Un kilómetro, unas diez cuadras, tiene 1 000 metros.', { pon: { 1: '1 000' } }],
          ['Entonces un kilómetro tiene 1 000 veces 100 centímetros.', { pon: { 2: '100 000' } }, '$1\\,000 \\cdot 100 = 100\\,000$'],
          ['De una unidad grande a una pequeña se multiplica; de pequeña a grande, se divide.', { marca: [2] }],
        ], '1 m = 100 cm y 1 km = 1 000 m: de grande a pequeña se multiplica.'),
        xpHaz('fichas', 'Pasa **3.5 m** a centímetros y **2 500 m** a kilómetros.', { slots: fila('3.5 m en cm', '2 500 m en km'), fichas: ['350', '2.5', '35', '25', '0.35'], meta: ['350', '2.5'], alto: 96, pista: 'Metros a centímetros: la unidad se achica. Metros a kilómetros: la unidad crece.' }, '$3.5 \\cdot 100 = 350$ y $2\\,500 \\div 1\\,000 = 2.5$.')],
    ],
    despues: [
      ['Más difícil: la parte y el total',
        xpMira('dibujo', 'Una razón 2 : 3 compara **parte con parte**. Para saber qué fracción del **total** es cada una, hay que sumar.', { dib: filas, v: { a: 2, b: 3, ea: 'de azul', eb: 'de blanco', t: '' }, alto: 150 }, [
          ['Una pintura lleva azul y blanco en razón 2 : 3: dos de azul por cada tres de blanco.', {}],
          ['Un grupo completo tiene 2 más 3: cinco tarros.', { t: 'grupo de 5' }, '$2 + 3 = 5$'],
          ['El azul es 2 de cada 5, no 2 de cada 3.', { t: 'azul: 2 de 5' }, '$\\tfrac{2}{5} = 40\\,\\%$'],
          ['Con 20 tarros hay 4 grupos: 8 de azul y 12 de blanco.', { a: 8, b: 12, t: '4 grupos' }, '$4 \\cdot 2 = 8 \\quad 4 \\cdot 3 = 12$'],
          ['Parte a parte es 2 : 3; parte al total es 2 de 5. No las cruces.', {}],
        ], 'Para la parte del total, suma los números de la razón.'),
        xpHaz('hoja', 'En un barrio, los perros y los gatos están en razón **3 : 1**. Subraya qué parte de **todas** las mascotas son gatos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un tercio.'], ['Un cuarto.'], ['Tres cuartos.']], pista: 'Un grupo completo tiene los perros y los gatos juntos. ¿Cuántas mascotas son?' }, 'Cada grupo tiene 4 mascotas y 1 es gato: un cuarto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un mapa está a escala 1 : 20 000 y dos parques quedan a 6 cm en el mapa. ¿Cuál procedimiento da bien la distancia real?', { letras: ['A', 'B', 'C', 'D'], paras: [['6 · 20 000 = 120 000 cm, que son 12 km.'], ['6 · 20 000 = 120 000 cm, que son 1.2 km.'], ['20 000 ÷ 6 ≈ 3 333 cm.'], ['6 + 20 000 = 20 006 cm.']] }, [
        ['La escala dice: 1 cm del mapa son 20 000 cm de verdad.', {}],
        ['Del mapa a la realidad se multiplica. C divide: va al revés.', { luz: [2], nota: { 2: 'al revés' } }],
        ['D suma. Una escala nunca se suma: es una razón.', { luz: [3], nota: { 3: 'suma' } }],
        ['A multiplica bien, pero se equivoca al pasar a kilómetros. Unidades mezcladas.', { luz: [0], nota: { 0: 'unidades' } }],
        ['120 000 cm son 1 200 m, o sea 1.2 km. B es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$120\\,000 \\div 100\\,000 = 1.2$'],
      ], 'Multiplica por la escala y revisa con cuidado el cambio de unidad.'),
      xpHaz('hoja', 'En un plano a escala 1 : 200, una pared mide 4.5 cm. Subraya cuánto mide de verdad.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['900 m'], ['9 m'], ['44.4 cm'], ['204.5 cm']], pista: 'Multiplica por la escala y fíjate en qué unidad queda el resultado antes de pasarlo.' }, '$4.5 \\cdot 200 = 900$ cm, que son 9 m.')],
    cierre: 'Una razón compara dividiendo; la escala multiplica, y al final se revisa la unidad.',
  });

  xpAmplia('icf-ma-proporcion-2', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: el porcentaje es una razón',
        xpMira('dibujo', 'Un **porcentaje** es una razón contra 100. Por eso se puede escribir como fracción o como decimal.', { dib: cien, v: { k: 0, t: '' }, alto: 160 }, [
          ['En la lección de razones viste que una razón compara dividiendo.', {}],
          ['Un porcentaje es una razón contra 100: el 25 % es 25 de cada 100.', { k: 25 }, '$25\\,\\% = \\tfrac{25}{100}$'],
          ['Como decimal, la coma se corre dos lugares: el 25 % es 0.25.', { t: '0.25' }, '$\\tfrac{25}{100} = 0.25$'],
          ['25 de 100 es la cuarta parte de la cuadrícula: un cuarto.', { t: 'un cuarto' }, '$\\tfrac{25}{100} = \\tfrac14$'],
          ['El 10 % es una fila de diez: la décima parte del total.', { k: 10, t: 'un décimo' }],
          ['Por eso sacar el 10 % de algo es dividirlo entre 10.', {}, '$10\\,\\% \\text{ de } 350 = 35$'],
        ], 'El p % es p de cada 100: sirve como fracción o como decimal.'),
        xpHaz('fichas', 'Escribe el **40 %** como decimal y como fracción simplificada.', { slots: fila('decimal', 'fracción'), fichas: ['0.4', '2/5', '4.0', '40/10', '0.04'], meta: ['0.4', '2/5'], alto: 96, pista: 'El 40 % es 40 de cada 100. Corre la coma y simplifica la fracción.' }, '$\\tfrac{40}{100} = 0.4 = \\tfrac25$.')],
    ],
    despues: [
      ['Más difícil: el porcentaje de un porcentaje',
        xpMira('fichas', 'Cuando un porcentaje se saca de **otro grupo**, ya no es del total: los porcentajes se **multiplican**.', { slots: fila('en público', 'van en metro', 'del total'), fichas: ['100', '30', '15 %'], alto: 96 }, [
          ['De 200 personas, el 50 % usa transporte público, y de esas, el 30 % va en metro.', {}],
          ['El primer porcentaje es de todos: el 50 % de 200 son 100.', { pon: { 0: '100' } }],
          ['El segundo es de esos 100, no de los 200: el 30 % de 100 son 30.', { pon: { 1: '30' } }],
          ['Del total, 30 de 200 son el 15 %.', { pon: { 2: '15 %' } }, '$\\tfrac{30}{200} = 15\\,\\%$'],
          ['Atajo: se multiplican los porcentajes como decimales.', {}, '$0.5 \\cdot 0.3 = 0.15$'],
          ['Sumar el 50 % y el 30 % sería mezclar totales distintos.', { marca: [2] }],
        ], 'Un porcentaje de otro porcentaje se multiplica, no se suma.'),
        xpHaz('fichas', 'En un colegio de 400, el 25 % juega fútbol y, de esos, el 40 % es de once. Pon cuántos juegan fútbol y cuántos de ellos son de once.', { slots: fila('fútbol', 'de once'), fichas: ['100', '40', '160', '65', '260'], meta: ['100', '40'], alto: 96, pista: 'El 40 % se saca de los que juegan fútbol, no de todo el colegio.' }, 'El 25 % de 400 es 100, y el 40 % de 100 es 40.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tienda rebaja un 30 % y luego otro 20 % sobre el precio rebajado. Pedro dice que en total rebajaron el 50 %. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 30 % + 20 % = 50 %.'], ['No, porque el 20 % se saca del precio ya rebajado: la rebaja total es del 44 %.'], ['Sí, porque las dos rebajas se hacen sobre el mismo precio.'], ['No, porque la rebaja total es del 10 %.']] }, [
        ['Haz tu cuenta con un precio fácil: 100 000 pesos.', {}],
        ['Baja 30 %: quedan 70 000. Luego baja 20 % de 70 000: quedan 56 000.', {}, '$100\\,000 \\cdot 0.7 \\cdot 0.8 = 56\\,000$'],
        ['Rebajaron 44 000 de 100 000: el 44 %. Pedro no tiene razón.', {}],
        ['A y C suman los porcentajes como si fueran del mismo precio. Trampa.', { luz: [0, 2], nota: { 0: 'suma', 2: 'premisa falsa' } }],
        ['D resta los porcentajes: no sale de ninguna cuenta del problema.', { luz: [3], nota: { 3: 'resta' } }],
        ['B dice No y da la cuenta correcta. Esa es.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Prueba con 100 y aplica los cambios uno después del otro.'),
      xpHaz('hoja', 'Un salario sube el 10 % un año y el 10 % el siguiente. Juan dice que en total subió el 21 %. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['No, subió el 20 %, porque 10 + 10 = 20.'], ['Sí, porque el segundo 10 % se saca del salario ya subido: 1.1 · 1.1 = 1.21.'], ['No, subió el 11 %.'], ['Sí, porque al subir dos veces siempre se suma un 1 % de más.']], pista: 'Prueba con un salario de 100 y aplica las dos subidas, una después de la otra.' }, '$100 \\to 110 \\to 121$: subió el 21 %.')],
    cierre: 'El porcentaje es una razón con 100; un porcentaje de otro y los cambios seguidos se multiplican.',
  });

  xpAmplia('icf-ma-proporcion-3', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: lo que vale uno',
        xpMira('fichas', 'Casi todas las cuentas de proporción se resuelven con una pregunta: **¿cuánto vale uno solo?** A eso se le llama valor unitario.', { slots: fila('1 pan', '5 panes', '8 panes'), fichas: ['400', '2 000', '3 200'], alto: 96 }, [
          ['En la lección de razones viste que una razón se conserva al multiplicar las dos cantidades.', {}],
          ['Si 5 panes cuestan 2 000 pesos, ¿cuánto cuestan 8? Primero, uno solo.', {}],
          ['Un pan vale 2 000 entre 5: 400 pesos. Ese es el valor unitario.', { pon: { 0: '400' } }, '$2\\,000 \\div 5 = 400$'],
          ['Con el unitario, cualquier cantidad sale multiplicando: 8 panes son 3 200.', { pon: { 2: '3 200' } }, '$8 \\cdot 400 = 3\\,200$'],
          ['Y se comprueba: 5 panes por 400 dan los 2 000 del comienzo.', { pon: { 1: '2 000' } }],
          ['El error típico es hallar el unitario y olvidar multiplicar.', { marca: [0] }],
        ], 'Halla lo que vale uno y multiplica por lo que pides.'),
        xpHaz('fichas', '6 cuadernos cuestan 21 000 pesos. Pon lo que vale **uno** y lo que valen **10**.', { slots: fila('uno', 'diez'), fichas: ['3 500', '35 000', '2 100', '210 000', '3 000'], meta: ['3 500', '35 000'], alto: 96, pista: 'Reparte el precio entre los 6 cuadernos y después multiplica.' }, '$21\\,000 \\div 6 = 3\\,500$ y $10 \\cdot 3\\,500 = 35\\,000$.')],
    ],
    despues: [
      ['Más difícil: ¿directa o inversa?',
        xpMira('hoja', 'Antes de hacer una regla de tres hay que saber de qué tipo es. Una prueba sencilla: **duplica** una cantidad y mira la otra.', { paras: [['Metros de tela y precio.'], ['Grifos abiertos y tiempo para llenar un tanque.'], ['Velocidad y tiempo en el mismo camino.'], ['Edad y estatura de una persona.']] }, [
          ['Pregunta clave: si una cantidad se duplica, ¿qué le pasa a la otra?', {}],
          ['El doble de tela cuesta el doble: directa.', { luz: [0], nota: { 0: 'directa' } }],
          ['El doble de grifos llena el tanque en la mitad del tiempo: inversa.', { luz: [1], nota: { 1: 'inversa' } }],
          ['Al doble de velocidad se tarda la mitad: inversa.', { luz: [2], nota: { 2: 'inversa' } }],
          ['A los 20 años no se mide el doble que a los 10: no es proporcional.', { luz: [3], nota: { 3: 'ninguna' } }],
          ['Usa la regla de tres solo si la relación es proporcional de verdad.', {}],
        ], 'Duplica una: si la otra se duplica es directa; si queda a la mitad, inversa.'),
        xpHaz('hoja', 'Subraya la situación de proporción **inversa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Galones de gasolina y kilómetros recorridos.'], ['Pintores y días para pintar una casa.'], ['Horas trabajadas y pago, a 8 000 la hora.']], pista: 'Duplica la primera cantidad de cada una y mira si la otra crece o se achica.' }, 'El doble de pintores tarda la mitad de días.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', '4 pintores pintan un muro en 6 horas. Sofía calcula para 8 así: 1) es directa; 2) 4/8 = 6/x; 3) x = 12 horas. ¿Dónde está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['En el paso 1: más pintores tardan menos, es inversa.'], ['En el paso 2: debió escribir 4/6 = 8/x.'], ['En el paso 3: de 4/8 = 6/x sale x = 3.'], ['No hay error: tardan 12 horas.']] }, [
        ['Antes de mirar los pasos piensa: con más pintores, ¿tardan más o menos?', {}],
        ['Tardan menos. Así que 12 horas, el doble, no puede ser.', { luz: [3], nota: { 3: 'no cuadra' } }],
        ['El paso 3 está bien hecho para su ecuación: de 4x = 48 sale x = 12.', { luz: [2], nota: { 2: 'cuenta bien' } }],
        ['B cambia la ecuación, pero sigue tratándola como directa.', { luz: [1], nota: { 1: 'sigue directa' } }],
        ['El error nace en el paso 1: es inversa. El trabajo es 24, y entre 8 da 3 horas.', { luz: [0], nota: { 0: 'correcta' } }, '$4 \\cdot 6 = 24 \\quad 24 \\div 8 = 3$'],
      ], 'Antes de seguir los pasos, decide tú si es directa o inversa.'),
      xpHaz('hoja', 'Un carro a 60 km/h tarda 3 h. Leo calcula a 90 km/h: 1) más velocidad, menos tiempo; 2) 60 · 3 = 180 km; 3) 180 · 90 = 16 200 h. ¿Dónde falla?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En el paso 1.'], ['En el paso 2.'], ['En el paso 3: debió dividir, 180 ÷ 90 = 2 horas.'], ['En ninguno.']], pista: 'Revisa si el resultado final cuadra con lo que el mismo Leo dijo en el paso 1.' }, 'El camino mide 180 km: a 90 km/h tarda 2 horas.')],
    cierre: 'Unitario y multiplicar en la directa; producto fijo en la inversa; y antes, decide cuál es.',
  });

  xpAmplia('icf-ma-proporcion-4', {
    conecta: 'icf-ma-proporcion-3',
    desde: [
      ['Desde cero: qué es una tasa',
        xpMira('fichas', 'Una **tasa** es un valor unitario con nombre propio: cuánto de algo hay **por cada** unidad de otra cosa.', { slots: fila('km por hora', 'pesos por kilo', 'litros por minuto'), fichas: ['50', '4 500', '12'], alto: 96 }, [
          ['En la lección de regla de tres viste que todo empieza por lo que vale uno.', {}],
          ['Una tasa dice cuánto de algo hay por cada unidad de otra cosa.', {}],
          ['Una moto recorre 150 km en 3 horas: 50 km por cada hora.', { pon: { 0: '50' } }, '$150 \\div 3 = 50$'],
          ['Un bulto de 4 kilos cuesta 18 000: 4 500 pesos por kilo.', { pon: { 1: '4 500' } }, '$18\\,000 \\div 4 = 4\\,500$'],
          ['Una llave echa 60 litros en 5 minutos: 12 litros por minuto.', { pon: { 2: '12' } }, '$60 \\div 5 = 12$'],
          ['La palabra «por» te dice qué va abajo al dividir.', {}],
        ], 'Tasa: lo de arriba dividido entre lo que va después del «por».'),
        xpHaz('fichas', 'Un ciclista hace 36 km en 2 horas y una bomba saca 90 litros en 6 minutos. Pon las dos tasas.', { slots: fila('km por hora', 'litros por minuto'), fichas: ['18', '15', '72', '540', '34'], meta: ['18', '15'], alto: 96, pista: 'Divide lo que se recorre o se saca entre el tiempo que tarda.' }, '$36 \\div 2 = 18$ y $90 \\div 6 = 15$.')],
      ['Desde cero: horas y minutos',
        xpMira('dibujo', 'Las velocidades van en horas, pero los relojes cuentan minutos. Un minuto es la **sexagésima** parte de una hora.', { dib: reloj, v: { m: 60 }, alto: 190 }, [
          ['Una hora tiene 60 minutos: es la vuelta completa del minutero.', {}],
          ['Media hora son 30 minutos: la mitad de la vuelta, 0.5 horas.', { m: 30 }, '$\\tfrac{30}{60} = 0.5$'],
          ['Un cuarto de hora son 15 minutos: 0.25 horas.', { m: 15 }, '$\\tfrac{15}{60} = 0.25$'],
          ['45 minutos son tres cuartos de hora: 0.75 horas, no 0.45.', { m: 45 }, '$\\tfrac{45}{60} = 0.75$'],
          ['Para pasar minutos a horas siempre se divide entre 60.', { m: 20 }, '$\\tfrac{20}{60} = \\tfrac13$'],
        ], 'Minutos a horas: divide entre 60. Media hora es 0.5, no 0.30.'),
        xpHaz('dibujo', 'Mueve el minutero hasta marcar **0.75** horas.', { dib: reloj, v: { m: 10 }, metas: { m: 45 }, alto: 240, manijas: [{ k: 'm', min: 0, max: 60, paso: 5, et: 'minutos' }],
          lee: v => `$\\tfrac{${v.m}}{60} = ${Math.round(v.m / 60 * 100) / 100} \\text{ h}$`, dice: () => 'Cada hora tiene 60 minutos.' }, '0.75 de 60 minutos son 45 minutos.')],
    ],
    despues: [
      ['Más difícil: cambiar las dos unidades',
        xpMira('fichas', 'En una tasa hay **dos** unidades. Si te la piden en otras, hay que cambiar **las dos**: la de arriba y la de abajo.', { slots: fila('metros por hora', 'metros por minuto'), fichas: ['90 000', '1 500'], alto: 96 }, [
          ['Un tren va a 90 km/h. ¿Cuántos metros avanza en un minuto?', {}],
          ['Cambian las dos unidades: kilómetros a metros y horas a minutos.', {}],
          ['Primero arriba: 90 km son 90 000 metros en una hora.', { pon: { 0: '90 000' } }, '$90 \\cdot 1\\,000 = 90\\,000$'],
          ['Después abajo: una hora tiene 60 minutos, así que se divide entre 60.', {}],
          ['Son 1 500 metros por cada minuto.', { pon: { 1: '1 500' } }, '$90\\,000 \\div 60 = 1\\,500$'],
          ['Si solo cambias una unidad, el resultado queda mezclado y falla.', { marca: [1] }],
        ], 'Para cambiar una tasa, cambia la unidad de arriba y la de abajo.'),
        xpHaz('fichas', 'Una llave echa 12 litros por minuto. Pon cuántos litros echa en **una hora** y en **media hora**.', { slots: fila('una hora', 'media hora'), fichas: ['720', '360', '72', '12', '6'], meta: ['720', '360'], alto: 96, pista: 'Una hora son 60 minutos y media hora, 30.' }, '$12 \\cdot 60 = 720$ y $12 \\cdot 30 = 360$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se quiere saber cuánto tarda un bus de A a B. Se sabe que sale a las 6:00 y que va a 60 km/h. ¿Qué dato **falta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['La hora de llegada de otro bus.'], ['La distancia entre A y B.'], ['El precio del pasaje.'], ['Ninguno: con la velocidad basta.']] }, [
        ['Para el tiempo se usa distancia entre velocidad. Revisa cuál de las dos tienes.', {}, '$t = d \\div v$'],
        ['La velocidad está: 60 km/h. Falta la distancia.', {}],
        ['D dice que basta la velocidad: sin distancia no hay qué dividir.', { luz: [3], nota: { 3: 'no basta' } }],
        ['C es un dato real de un viaje, pero no entra en la cuenta.', { luz: [2], nota: { 2: 'no sirve' } }],
        ['A habla de otro bus: no dice nada de este viaje.', { luz: [0], nota: { 0: 'otro viaje' } }],
        ['B es lo que falta: con ella, el tiempo es la distancia entre 60.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Escribe la cuenta que harías y mira qué número te falta para hacerla.'),
      xpHaz('hoja', 'Se quiere saber cuántos dólares se reciben por 500 000 pesos. Subraya el dato que hace falta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Cuántos pesos vale un dólar ese día.'], ['Cuánto costaba el dólar hace un año.'], ['El precio de lo que se va a comprar.'], ['Ninguno: un dólar siempre vale lo mismo.']], pista: 'Piensa en la tasa que une los pesos con los dólares y en qué momento se usa.' }, 'Con la tasa del día: dólares = pesos ÷ pesos por dólar.')],
    cierre: 'Tasa es tanto por cada uno; los minutos se pasan a horas y se cambian las dos unidades a la vez.',
  });
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
//#archivo js/explora-icf-ma-3-pasos.js
// Preicfes · Matemáticas, mundo 3 «Conteo y Probabilidad», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde contar
// parejas en una tabla, ordenar en fila, qué es la probabilidad y cómo se lee una tabla con totales, hasta las trampas que más
// salen (sumar en vez de multiplicar, contar con orden lo que no lo tiene, casos que no son igual de probables, el total equivocado).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Bolsa: k rojas (de color) entre n bolas.
  const bolsa = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => K.c(58 + (i % 8) * 32, 50 + Math.floor(i / 8) * 36, 12, i < Math.round(v.k) ? 'fA' : 'fc')).join('') + K.t(170, 150, v.t || '', 'ta');

  xpAmplia('icf-ma-azar-1', {
    conecta: 'icf-ma-proporcion-3',
    desde: [
      ['Desde cero: contar parejas en una tabla',
        xpMira('rejilla', 'Contar combinaciones es contar **casillas**: cada fila es una opción de una cosa y cada columna, una opción de la otra.', { f: 3, c: 2, filas: ['roja', 'azul', 'blanca'], cols: ['negra', 'gris'], celda: i => ['R N', 'R G', 'A N', 'A G', 'B N', 'B G'][i] }, [
          ['En la lección de regla de tres viste que un rectángulo de 4 por 6 tiene 24 cuadros.', {}],
          ['Contar combinaciones es lo mismo. Tienes 3 camisas y 2 gorras.', {}],
          ['Cada fila es una camisa y cada columna, una gorra.', { luz: [0, 1] }],
          ['Cada casilla es una pinta: camisa roja con gorra negra, por ejemplo.', { on: [0] }],
          ['Se cuentan las casillas: 3 filas por 2 columnas, 6 pintas.', { on: [1, 2, 3, 4, 5] }, '$3 \\cdot 2 = 6$'],
          ['Contar una por una sirve con pocas; multiplicar sirve siempre.', {}],
        ], 'Cada pareja posible es una casilla: filas por columnas.'),
        xpHaz('rejilla', 'Hay 4 jugos y 3 empanadas. Marca **todas** las combinaciones de un jugo con una empanada.', { f: 4, c: 3, filas: ['mora', 'lulo', 'mango', 'piña'], cols: ['carne', 'pollo', 'queso'], meta: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          lee: c => `$${c.filter(x => x === 1).length} \\text{ de } 4 \\cdot 3$`, dice: c => `${c.filter(x => x === 1).length} combinaciones marcadas.` }, '$4 \\cdot 3 = 12$ combinaciones.')],
    ],
    despues: [
      ['Más difícil: al menos uno',
        xpMira('fichas', 'Cuando piden «**al menos uno**», casi siempre es más fácil contar **todo** y quitar lo que **no** sirve.', { slots: fila('todas', 'sin ningún 7', 'con algún 7'), fichas: ['1 000', '729', '271'], alto: 96 }, [
          ['Una clave tiene 3 dígitos del 0 al 9. ¿Cuántas tienen al menos un 7?', {}],
          ['Contarlas directo es enredado: un 7, dos 7 o tres 7, en distintos puestos.', {}],
          ['Mejor contar todas: 10 opciones en cada puesto, 1 000 claves.', { pon: { 0: '1 000' } }, '$10 \\cdot 10 \\cdot 10 = 1\\,000$'],
          ['Ahora las que no tienen ningún 7: quedan 9 opciones en cada puesto.', { pon: { 1: '729' } }, '$9 \\cdot 9 \\cdot 9 = 729$'],
          ['Las que tienen algún 7 son el resto.', { pon: { 2: '271' } }, '$1\\,000 - 729 = 271$'],
          ['Al menos uno: todas menos las que no tienen ninguno.', { marca: [2] }],
        ], 'Al menos uno = todos los casos − los que no tienen ninguno.'),
        xpHaz('fichas', 'Una placa lleva 2 letras de entre A, B, C, D y E, que se pueden repetir. Pon cuántas hay en total y cuántas tienen **al menos una A**.', { slots: fila('total', 'con alguna A'), fichas: ['25', '9', '16', '10', '5'], meta: ['25', '9'], alto: 96, pista: 'Cuenta todas y quita las que no tienen ninguna A: sin A quedan 4 letras por puesto.' }, '$5 \\cdot 5 = 25$, sin A $4 \\cdot 4 = 16$, y $25 - 16 = 9$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un restaurante ofrece 3 sopas, 5 platos fuertes y 2 postres. Un almuerzo lleva sopa, plato y postre. ¿Cuántos almuerzos distintos hay?', { letras: ['A', 'B', 'C', 'D'], paras: [['3 + 5 + 2 = 10'], ['3 · 5 · 2 = 30'], ['3 · 5 = 15, porque el postre no cambia el almuerzo.'], ['5 · 2 = 10, porque la sopa siempre se sirve.']] }, [
        ['Un almuerzo lleva tres decisiones: una sopa, y un plato, y un postre.', {}],
        ['A suma: eso contaría escoger una sola cosa de todo el menú.', { luz: [0], nota: { 0: 'suma' } }],
        ['C y D dejan por fuera una decisión, y cada una cambia el almuerzo.', { luz: [2, 3], nota: { 2: 'falta una', 3: 'falta una' } }],
        ['Cada sopa va con cada plato, y cada pareja con cada postre: se multiplica.', {}],
        ['B: 3 por 5 por 2 son 30 almuerzos. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$3 \\cdot 5 \\cdot 2 = 30$'],
      ], 'Cuenta las decisiones: si son varias seguidas, multiplica todas.'),
      xpHaz('hoja', 'Para ir al colegio, Ana puede ir a pie por 3 caminos o en bus por 2 rutas. Subraya de cuántas maneras puede ir.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['6, porque 3 · 2 = 6.'], ['5, porque escoge una sola manera: a pie o en bus.'], ['3, porque a pie es lo más común.'], ['2, porque son dos medios de transporte.']], pista: 'Pregúntate si Ana toma una decisión o dos para hacer el viaje.' }, 'Una sola elección entre los dos grupos: $3 + 2 = 5$.')],
    cierre: 'Varias decisiones se multiplican, una sola elección suma, y al menos uno es todo menos ninguno.',
  });

  xpAmplia('icf-ma-azar-2', {
    conecta: 'icf-ma-azar-1',
    desde: [
      ['Desde cero: ordenar en fila',
        xpMira('fichas', 'Ordenar cosas en fila es tomar **decisiones seguidas**, y en cada puesto queda **una opción menos**.', { slots: fila('1.º', '2.º', '3.º', 'total').map(s => ({ ...s, w: 62 })), fichas: ['3', '2', '1', '6'], alto: 96 }, [
          ['En la lección anterior viste que una decisión y otra se multiplican.', {}],
          ['Ordenar tres libros en un estante son tres decisiones seguidas.', {}],
          ['Para el primer puesto hay 3 libros.', { pon: { 0: '3' } }],
          ['Para el segundo quedan 2, porque uno ya se usó.', { pon: { 1: '2' } }],
          ['Para el último queda 1. En total hay 6 órdenes.', { pon: { 2: '1', 3: '6' } }, '$3 \\cdot 2 \\cdot 1 = 6$'],
          ['A 3 · 2 · 1 se le llama 3 factorial, y se escribe 3!.', { marca: [3] }, '$3! = 6$'],
        ], 'n cosas en fila: n · (n − 1) · … · 1, que se escribe n!.'),
        xpHaz('fichas', 'Cinco fotos van en una fila de 5 marcos. Pon las opciones del **primer** marco y el **total** de órdenes.', { slots: fila('primer marco', 'total'), fichas: ['5', '120', '25', '60', '15'], meta: ['5', '120'], alto: 96, pista: 'En cada marco queda una foto menos. Multiplica hasta llegar a 1.' }, '$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.')],
    ],
    despues: [
      ['Más difícil: filas con condiciones',
        xpMira('fichas', 'Si alguien tiene un puesto **obligado**, se fija primero. Si dos deben ir **juntos**, se amarran como un bloque.', { slots: fila('Ana primera', 'el bloque y 3', 'por dentro', 'juntos').map(s => ({ ...s, w: 66 })), fichas: ['24', '24', '2', '48'], alto: 96 }, [
          ['Cinco amigos se toman una foto en fila. ¿Y si Ana debe ir primera?', {}],
          ['Su puesto ya está decidido: los otros 4 se ordenan libres.', { pon: { 0: '24' } }, '$4! = 24$'],
          ['Ahora Ana y Beto deben quedar juntos. Se amarran como un solo bloque.', {}],
          ['Quedan 4 piezas, el bloque y 3 amigos, que se ordenan de 24 maneras.', { pon: { 1: '24' } }],
          ['Dentro del bloque puede ir Ana y Beto, o Beto y Ana: 2 maneras.', { pon: { 2: '2' } }],
          ['En total, 24 por 2: 48 fotos con los dos juntos.', { pon: { 3: '48' } }, '$24 \\cdot 2 = 48$'],
        ], 'Fija lo obligado, amarra lo que va junto y cuenta lo demás.'),
        xpHaz('fichas', 'Cuatro libros van en un estante. Pon cuántos órdenes hay si el de arte va **al final**, y cuántos si en cambio dos libros deben ir **juntos**.', { slots: fila('arte al final', 'dos juntos'), fichas: ['6', '12', '24', '4', '8'], meta: ['6', '12'], alto: 96, pista: 'Con el de arte fijo se ordenan 3. Con el bloque hay 3 piezas, y el bloque se voltea.' }, '$3! = 6$ y $3! \\cdot 2 = 12$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'De 8 estudiantes se escogen 2 para representar al curso, con los mismos deberes. Camilo dice que hay 56 maneras. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque hay 8 para el primero y 7 para el segundo.'], ['No, porque cada pareja se contó dos veces: son 28.'], ['No, porque son 8 + 7 = 15.'], ['Sí, porque 8 · 7 = 56 siempre da las parejas.']] }, [
        ['Pregunta primero si importa el orden. Los dos tienen los mismos deberes.', {}],
        ['No importa: Ana y Beto es la misma pareja que Beto y Ana.', {}],
        ['A da una razón cierta, 8 por 7, pero concluye mal: contó con orden.', { luz: [0], nota: { 0: 'contó con orden' } }],
        ['D generaliza: 8 · 7 cuenta parejas con orden, no grupos.', { luz: [3], nota: { 3: 'siempre' } }],
        ['C suma, y con dos decisiones seguidas nunca se suma.', { luz: [2], nota: { 2: 'suma' } }],
        ['B divide entre los 2 órdenes de cada pareja. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$56 \\div 2 = 28$'],
      ], 'Decide si importa el orden antes de leer las razones de cada opción.'),
      xpHaz('hoja', 'De 6 canciones, una emisora escoge 3 para un concurso, sin orden. Rita dice que hay 120 maneras. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Sí, porque 6 · 5 · 4 = 120.'], ['No: son 120 entre 2, o sea 60.'], ['No: cada grupo de 3 se contó 6 veces, así que son 20.'], ['Sí, porque el orden de las canciones siempre importa.']], pista: 'Si el orden no importa, ¿de cuántas maneras se puede ordenar un mismo grupo de 3?' }, 'Un grupo de 3 se ordena de $3! = 6$ maneras: $120 \\div 6 = 20$.')],
    cierre: 'En fila, n factorial; con condiciones, fija y amarra; sin orden, divide entre los órdenes del grupo.',
  });

  xpAmplia('icf-ma-azar-3', {
    conecta: 'icf-ma-azar-2',
    desde: [
      ['Desde cero: qué es la probabilidad',
        xpMira('dibujo', 'La **probabilidad** mide qué tan fácil es que algo pase cuando no sabes qué va a salir. Se calcula **contando**.', { dib: bolsa, v: { n: 10, k: 0, t: '' }, alto: 170 }, [
          ['En la lección de permutaciones aprendiste a contar todos los casos posibles.', {}],
          ['Algo es aleatorio cuando no sabes qué va a salir, como sacar una bola sin mirar.', {}],
          ['Los casos posibles son todo lo que puede salir: aquí, 10 bolas.', { t: '10 posibles' }],
          ['Los favorables son los que te sirven. Si quieres roja, hay 3 rojas.', { k: 3, t: '3 favorables' }],
          ['La probabilidad es favorables entre posibles: 3 de 10.', { t: '3 de 10' }, '$\\tfrac{3}{10} = 0.3 = 30\\,\\%$'],
          ['Fracción, decimal o porcentaje: es el mismo número dicho de tres formas.', {}],
        ], 'Probabilidad = casos favorables ÷ casos posibles.'),
        xpHaz('fichas', 'Se lanza un dado normal. Pon los casos posibles, los favorables a «sale un número mayor que 4» y la probabilidad.', { slots: fila('posibles', 'favorables', 'probabilidad'), fichas: ['6', '2', '1/3', '4', '1/2'], meta: ['6', '2', '1/3'], alto: 96, pista: 'Mayores que 4 son los que pasan del 4: el 4 no cuenta.' }, 'Sirven el 5 y el 6: $\\tfrac26 = \\tfrac13$.')],
    ],
    despues: [
      ['Más difícil: casos igual de probables',
        xpMira('hoja', 'Para dividir favorables entre posibles, los casos tienen que ser **igual de probables**. Si no, la cuenta engaña.', { paras: [['cara y cara'], ['cara y sello'], ['sello y cara'], ['sello y sello']] }, [
          ['Se lanzan dos monedas. ¿Qué tan probable es que salga una cara y un sello?', {}],
          ['Tentación: hay tres resultados, dos caras, mixto y dos sellos. Entonces 1/3. Trampa.', {}],
          ['Piensa las monedas como distintas: la primera y la segunda.', {}],
          ['Salen cuatro casos, todos igual de fáciles.', { luz: [0, 1, 2, 3] }],
          ['El mixto sale de dos maneras: cara y sello, o sello y cara.', { luz: [1, 2], nota: { 1: 'mixto', 2: 'mixto' } }],
          ['Entonces es 2 de 4, la mitad, no un tercio.', { luz: [1, 2] }, '$\\tfrac24 = \\tfrac12$'],
        ], 'Los casos deben ser igual de probables: separa la primera de la segunda.'),
        xpHaz('fichas', 'Se lanzan tres monedas. Pon cuántos casos hay en total y la probabilidad de que salgan **exactamente dos caras**.', { slots: fila('casos', 'dos caras'), fichas: ['8', '3/8', '6', '1/3', '3/6'], meta: ['8', '3/8'], alto: 96, pista: 'Cada moneda tiene 2 caras. El sello puede quedar en la primera, la segunda o la tercera.' }, '$2 \\cdot 2 \\cdot 2 = 8$ casos, y 3 tienen dos caras.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una ruleta tiene 8 casillas iguales: 3 azules, 4 rojas y 1 verde. ¿Cuál afirmación es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Rojo es más probable que azul: 4 de 8 frente a 3 de 8.'], ['La probabilidad de verde es 1/3, porque hay tres colores.'], ['La de azul es 3/5, porque hay 3 azules y 5 que no.'], ['Si salió rojo tres veces, ahora es más probable azul.']] }, [
        ['Primero los casos posibles: 8 casillas iguales. Ese es el total.', {}],
        ['B cuenta colores, no casillas, y los colores no son igual de probables.', { luz: [1], nota: { 1: 'cuenta colores' } }],
        ['C divide entre las que no sirven. Siempre se divide entre el total.', { luz: [2], nota: { 2: 'mal total' } }],
        ['D cree que la ruleta recuerda. Cada giro empieza igual que el primero.', { luz: [3], nota: { 3: 'sin memoria' } }],
        ['A compara 4 de 8 con 3 de 8, sobre el mismo total. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Divide siempre entre el total de casos igual de probables.'),
      xpHaz('hoja', 'Una caja tiene 5 lápices negros, 3 rojos y 2 azules. Se saca uno sin mirar. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La de rojo es 3/7, porque hay 3 rojos y 7 que no.'], ['La de azul es 1/3, porque hay tres colores.'], ['La de negro es 1/2, porque son 5 de 10.'], ['Si salen dos negros y se devuelven, el siguiente será rojo seguro.']], pista: 'Cuenta todos los lápices de la caja: ese es el total de casos posibles.' }, 'Hay 10 lápices y 5 son negros: $\\tfrac{5}{10} = \\tfrac12$.')],
    cierre: 'Favorables entre posibles, con casos igual de probables; y el azar no tiene memoria.',
  });

  const T4 = ['12', '8', '20', '18', '22', '40', '30', '30', '60'];
  xpAmplia('icf-ma-azar-4', {
    conecta: 'icf-ma-azar-3',
    desde: [
      ['Desde cero: una tabla con totales',
        xpMira('rejilla', 'Las preguntas de este tema casi siempre traen una **tabla de doble entrada con totales**. Antes de calcular, hay que saber leerla.', { f: 3, c: 3, filas: ['usa bus', 'no usa', 'total'], cols: ['mañana', 'tarde', 'total'], izq: 70, celda: i => T4[i] }, [
          ['En la lección anterior viste que la probabilidad es favorables entre posibles.', {}],
          ['Esta tabla cuenta 60 estudiantes según su jornada y si usan bus.', {}],
          ['Cada casilla de adentro cruza dos cosas: 12 son de la mañana y usan bus.', { luz: [0] }],
          ['La última columna suma cada fila: 20 usan bus en total.', { luz: [2] }, '$12 + 8 = 20$'],
          ['La última fila suma cada columna: 30 son de la mañana.', { luz: [6] }, '$12 + 18 = 30$'],
          ['Y la esquina es el total de todos: 60 estudiantes.', { luz: [8] }],
        ], 'Adentro, los cruces; en los bordes, los totales; en la esquina, todos.'),
        xpHaz('rejilla', 'Toca la casilla que dice cuántos estudiantes de la **tarde** **no** usan bus.', { f: 3, c: 3, filas: ['usa bus', 'no usa', 'total'], cols: ['mañana', 'tarde', 'total'], izq: 70, celda: i => T4[i], unoAUno: true, meta: [4] }, 'Fila «no usa», columna «tarde»: son 22.')],
    ],
    despues: [
      ['Más difícil: completar la tabla',
        xpMira('rejilla', 'A veces la tabla llega **incompleta**. Con los totales se llenan los huecos restando, y después se calcula.', { f: 3, c: 3, filas: ['con gafas', 'sin gafas', 'total'], cols: ['niñas', 'niños', 'total'], izq: 74, celda: i => ({ 0: '9', 2: '15', 6: '20', 7: '20', 8: '40' }[i] || '?') }, [
          ['A veces la tabla llega incompleta. Los totales ayudan a llenarla.', {}],
          ['Con gafas hay 15 y 9 son niñas: los niños con gafas son 6.', { txt: { 1: '6' }, luz: [1] }, '$15 - 9 = 6$'],
          ['Las niñas son 20 y 9 tienen gafas: 11 niñas sin gafas.', { txt: { 3: '11' }, luz: [3] }, '$20 - 9 = 11$'],
          ['Los niños son 20 y 6 tienen gafas: 14 niños sin gafas.', { txt: { 4: '14' }, luz: [4] }, '$20 - 6 = 14$'],
          ['Sin gafas en total hay 11 más 14: 25. Y cuadra, porque 15 + 25 = 40.', { txt: { 5: '25' }, luz: [5] }],
          ['Entre los de gafas, la probabilidad de niño es 6 de 15.', { luz: [1, 2] }, '$\\tfrac{6}{15} = \\tfrac25$'],
        ], 'Llena los huecos restando de los totales y revisa que todo cuadre.'),
        xpHaz('fichas', 'De 50 clientes, 30 pagan con tarjeta. Compraron ropa 25, y 18 de ellos con tarjeta. Pon los de ropa en efectivo y la de tarjeta **entre** los de ropa.', { slots: fila('ropa, efectivo', 'tarjeta | ropa'), fichas: ['7', '18/25', '18/30', '12', '25/50'], meta: ['7', '18/25'], alto: 96, pista: 'Los de ropa son 25: ese es el total de la segunda pregunta.' }, '$25 - 18 = 7$ y $\\tfrac{18}{25}$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se encuestó a 80 personas: 30 viven en el campo, y de ellas 12 tienen moto. Si se escoge al azar una persona **del campo**, ¿qué probabilidad hay de que tenga moto?', { letras: ['A', 'B', 'C', 'D'], paras: [['12/80'], ['12/30'], ['30/80'], ['12/50, porque 50 no viven en el campo.']] }, [
        ['La frase clave es «una persona del campo»: el total ya no son las 80.', {}],
        ['A divide entre todos: sería la de campo y moto entre los 80.', { luz: [0], nota: { 0: 'total de todos' } }],
        ['C es la probabilidad de vivir en el campo: responde otra pregunta.', { luz: [2], nota: { 2: 'otra pregunta' } }],
        ['D divide entre los que no son del campo: el grupo equivocado.', { luz: [3], nota: { 3: 'otro grupo' } }],
        ['B toma las 12 con moto entre las 30 del campo. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$\\tfrac{12}{30} = \\tfrac25$'],
      ], 'Busca la frase que dice entre quiénes se escoge: ese es el total.'),
      xpHaz('hoja', 'En una caja hay 4 jugos de mora y 2 de lulo. Se sacan dos **sin devolver**. Subraya la probabilidad de que los dos sean de mora.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['4/6 · 4/6 = 4/9'], ['4/6 · 3/5 = 2/5'], ['4/6 + 3/5'], ['2/6 · 1/5']], pista: 'Después de sacar el primero, ¿cuántos jugos quedan en la caja y cuántos son de mora?' }, 'Quedan 5 jugos y 3 de mora: $\\tfrac46 \\cdot \\tfrac35 = \\tfrac25$.')],
    cierre: 'Lee entre quiénes se escoge, llena la tabla con los totales y, sin devolver, cambia el total.',
  });
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
//#archivo js/explora-icf-ma-4-pasos.js
// Preicfes · Matemáticas, mundo 4 «Áreas y Volúmenes», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es medir
// (palito y cuadrito), radio, diámetro y π, y qué es el volumen, hasta las trampas que más salen (perímetro frente a área, m² a
// cm², radio frente a diámetro, m³ a litros) y el formato del examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rectángulo de 5 por 3 en cuadros de 28: `lado` resalta el borde de abajo; k cuadros pintados.
  const malla = (v, K) => {
    const u = 28, x0 = 100, y0 = 140; let h = '';
    for (let i = 0; i < 15; i++) h += K.r(x0 + (i % 5) * u, y0 - (Math.floor(i / 5) + 1) * u, u, u, i < Math.round(v.k) ? 'fa' : 'fc', 0);
    if (v.lado) { h += K.l(x0, y0, x0 + 5 * u, y0, 'lg gr'); for (let i = 0; i <= 5; i++) h += K.l(x0 + i * u, y0 - 5, x0 + i * u, y0 + 5, 'lg'); }
    if (v.uno) h += K.r(x0, y0 - u, u, u, 'fA', 0);
    return h + K.t(x0 + 2.5 * u, y0 + 22, '5 m', 's tm') + K.t(x0 - 10, y0 - 1.5 * u + 4, '3 m', 's tm', 'end') + K.t(170, 22, v.t || '', 'ta');
  };
  // Un metro cuadrado partido en 10 × 10; las primeras f filas pintadas.
  const metro = (v, K) => {
    let h = '';
    for (let i = 0; i < 100; i++) h += K.r(110 + (i % 10) * 12, 24 + Math.floor(i / 10) * 12, 12, 12, Math.floor(i / 10) < Math.round(v.f) ? 'fa' : 'fc', 0);
    return h + K.t(170, 162, '100 cm', 's tm') + K.t(102, 88, '100 cm', 's tm', 'end') + K.t(240, 80, v.t || '', 'ta', 'start');
  };
  // Círculo de radio 3 (u = 12): radio, diámetro y el borde estirado, medido en diámetros.
  const circulo = (v, K) => {
    const c = [170, 66], r = 36; let h = K.c(c[0], c[1], r, 'fc') + K.c(c[0], c[1], 3, 'fk');
    if (v.r) h += K.l(c[0], c[1], c[0] + r, c[1], 'lg gr') + K.t(c[0] + r / 2, c[1] - 6, v.rr || 'r = 3', 's tg');
    if (v.d) h += K.l(c[0] - r, c[1] + 0.1, c[0] + r, c[1] + 0.1, 'lf gr') + K.t(c[0], c[1] + 18, v.dd || 'd = 6', 's tf');
    if (v.e) {
      const L = Math.PI * 2 * r, x0 = 170 - L / 2;
      h += K.l(x0, 140, x0 + L, 140, 'la gr');
      for (let k = 0; k <= 3; k++) h += K.l(x0 + k * 2 * r, 134, x0 + k * 2 * r, 146, 'lf') + (k < 3 ? K.t(x0 + (k + 0.5) * 2 * r, 160, 'd', 's tf') : '');
      h += K.t(x0 + L + 5, 145, '+0.14', 's tm', 'start');
    }
    return h + K.t(170, 186, v.t || '', 'ta');
  };
  // Caja de a × b × c cubitos.
  const caja = (v, K) => K.caja([150, 150], 22, v.a, v.b, v.c, 'fa') + K.t(270, 40, v.t || '', 'ta', 'middle');

  xpAmplia('icf-ma-medida-1', {
    conecta: 'icf-ma-azar-1',
    desde: [
      ['Desde cero: medir con palitos y cuadritos',
        xpMira('dibujo', '**Medir** es contar cuántas veces cabe una unidad. Para un borde la unidad es un palito; para una superficie, un cuadrito.', { dib: malla, v: { k: 0, lado: 0, uno: 0, t: '' }, alto: 180 }, [
          ['En la lección de conteo viste que 3 filas por 2 columnas son 6 casillas.', {}],
          ['Medir es contar cuántas veces cabe una unidad. Para un borde, un palito de 1 m.', { lado: 1 }],
          ['El lado de abajo mide 5 palitos: 5 metros.', { lado: 1, t: 'borde: metros' }],
          ['Para una superficie, la unidad es un cuadrito de 1 m por 1 m: un metro cuadrado.', { uno: 1, lado: 0, t: '1 m²' }],
          ['Aquí caben 5 por 3 cuadritos: 15 metros cuadrados.', { k: 15, uno: 0, t: '15 m²' }, '$5 \\cdot 3 = 15$'],
          ['Metros para bordes, metros cuadrados para superficies: nunca se mezclan.', { k: 15, lado: 1 }],
        ], 'Borde en metros (m), superficie en metros cuadrados (m²).'),
        xpHaz('hoja', 'Se va a comprar **guardaescoba**, la tira que va pegada a lo largo del borde del piso. Subraya qué hay que medir.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El área del piso, en m².'], ['El perímetro del piso, en m.'], ['El volumen del cuarto, en m³.']], pista: 'La tira no cubre el piso: va pegada al borde, alrededor.' }, 'La tira rodea el cuarto: se mide el perímetro, en metros.')],
    ],
    despues: [
      ['Más difícil: pasar unidades de área',
        xpMira('dibujo', 'Un metro tiene 100 cm, pero un **metro cuadrado** no tiene 100 cm². Mira por qué.', { dib: metro, v: { f: 0, t: '' }, alto: 176 }, [
          ['Un metro tiene 100 centímetros. ¿Cuántos centímetros cuadrados tiene un metro cuadrado?', {}],
          ['Tentación: decir 100. Pero un metro cuadrado es un cuadrado de 100 por 100.', {}],
          ['Cada fila del dibujo son 100 cuadritos de 1 cm², y hay 100 filas.', { f: 1, t: '100' }],
          ['En total, 100 por 100: 10 000 centímetros cuadrados.', { f: 10, t: '10 000' }, '$100 \\cdot 100 = 10\\,000$'],
          ['Al pasar áreas, el cambio de unidad se eleva al cuadrado.', {}, '$1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2$'],
        ], '1 m² = 100 · 100 = 10 000 cm²: en área el cambio va al cuadrado.'),
        xpHaz('fichas', 'Una baldosa mide 50 cm por 50 cm. Pon su área en cm² y cuántas baldosas cubren **1 m²**.', { slots: fila('área (cm²)', 'en 1 m²'), fichas: ['2 500', '4', '100', '2', '250'], meta: ['2 500', '4'], alto: 96, pista: 'Un metro cuadrado tiene 10 000 cm². ¿Cuántas veces cabe la baldosa?' }, '$50 \\cdot 50 = 2\\,500$ y $10\\,000 \\div 2\\,500 = 4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un lote rectangular mide 20 m por 10 m. Para cercarlo con una vuelta de alambre, Lucía compra 200 m. ¿Hizo bien la cuenta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 20 · 10 = 200.'], ['No, porque la cerca rodea el lote: 2 · (20 + 10) = 60 m.'], ['No, porque bastan 30 m: 20 + 10.'], ['Sí, porque un lote grande necesita mucho alambre.']] }, [
        ['Antes de leer las opciones: cercar es rodear, así que se pide el perímetro.', {}],
        ['Se suman los cuatro lados: 60 m. Entonces la respuesta es No.', {}, '$20 + 10 + 20 + 10 = 60$'],
        ['A multiplica: eso es el área, la superficie, en metros cuadrados.', { luz: [0], nota: { 0: 'es el área' } }],
        ['C suma solo dos lados: le falta la otra mitad del borde.', { luz: [2], nota: { 2: 'dos lados' } }],
        ['D da una razón que suena bien, pero no sale de ninguna cuenta.', { luz: [3], nota: { 3: 'sin cuenta' } }],
        ['B rodea los cuatro lados. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Decide primero si la situación pide rodear o cubrir.'),
      xpHaz('hoja', 'Un salón de 8 m por 5 m se cubrirá con baldosas de 1 m². Diego dice que necesita 26 baldosas. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 2 · (8 + 5) = 26.'], ['No, necesita 40, porque cubrir es contar cuadros: 8 · 5.'], ['No, necesita 13: 8 + 5.'], ['Sí, porque las baldosas se ponen por el borde.']], pista: 'Las baldosas cubren todo el piso. ¿Eso es rodear o cubrir?' }, 'Cubrir es área: $8 \\cdot 5 = 40$ baldosas.')],
    cierre: 'Rodear suma lados en metros; cubrir cuenta cuadros en m²; y 1 m² son 10 000 cm².',
  });

  xpAmplia('icf-ma-medida-2', {
    conecta: 'icf-ma-medida-1',
    desde: [
      ['Desde cero: radio, diámetro y π',
        xpMira('dibujo', 'El círculo no tiene lados. Para medirlo se usan su **radio**, su **diámetro** y un número especial: **π**.', { dib: circulo, v: { r: 0, d: 0, e: 0, t: '' }, alto: 196 }, [
          ['En la lección de perímetro y área viste que rodear suma lados y cubrir cuenta cuadros.', {}],
          ['El círculo no tiene lados. Su centro es el punto del medio.', { t: 'centro' }],
          ['El radio va del centro hasta el borde. Aquí mide 3.', { r: 1, t: 'radio' }],
          ['El diámetro cruza de borde a borde por el centro: son dos radios, 6.', { r: 1, d: 1, t: 'diámetro = 2 radios' }],
          ['Si estiras el borde, mide un poco más de 3 diámetros: unas 3.14 veces.', { d: 1, e: 1, t: 'borde ≈ 3.14 diámetros' }],
          ['Ese número, 3.14…, se llama π. Por eso el borde es π por el diámetro.', { d: 1, e: 1, t: 'borde = π · d' }, '$\\pi \\cdot 6 = 2\\pi \\cdot 3$'],
        ], 'Diámetro = 2 radios; el borde del círculo mide π por el diámetro.'),
        xpHaz('fichas', 'Una rueda tiene **radio** 20 cm. Pon su diámetro y lo que avanza en una vuelta, con $\\pi \\approx 3.14$.', { slots: fila('diámetro', 'una vuelta (cm)'), fichas: ['40', '125.6', '62.8', '10', '1256'], meta: ['40', '125.6'], alto: 96, pista: 'El diámetro son dos radios. En una vuelta, la rueda avanza su borde.' }, '$d = 40$ y $3.14 \\cdot 40 = 125.6$ cm.')],
    ],
    despues: [
      ['Más difícil: radio frente a diámetro',
        xpMira('dibujo', 'La trampa más común con círculos: el problema da el **diámetro** y la fórmula del área pide el **radio**.', { dib: circulo, v: { r: 0, d: 1, e: 0, dd: 'd = 30 cm', t: '' }, alto: 196 }, [
          ['Una pizza mide 30 cm de diámetro. ¿Cuál es su área?', {}],
          ['La fórmula del área usa el radio, no el diámetro: primero se parte en dos.', { r: 1, rr: 'r = 15', t: 'radio 15' }],
          ['El área es π por 15 al cuadrado: 225π cm².', { r: 1, rr: 'r = 15', t: '225π' }, '$\\pi \\cdot 15^2 = 225\\pi$'],
          ['Quien usa el 30 obtiene 900π: cuatro veces más. Trampa.', { t: '900π: trampa' }, '$30^2 = 900$'],
          ['Dos pizzas de 20 cm de diámetro, con radio 10, dan 200π entre las dos.', { t: '2 · 100π' }, '$2 \\cdot \\pi \\cdot 10^2 = 200\\pi$'],
          ['Una sola de 30 cm, con 225π, trae más que las dos de 20.', { t: '225π > 200π' }],
        ], 'Si te dan el diámetro, pártelo en dos antes de usar πr².'),
        xpHaz('fichas', 'Un tapete redondo mide **4 m de diámetro**. Pon su radio y su área, contada en π.', { slots: fila('radio (m)', 'área (en π)'), fichas: ['2', '4', '16', '8', '1'], meta: ['2', '4'], alto: 96, pista: 'Parte el diámetro en dos y eleva ese número al cuadrado.' }, 'Radio 2: $\\pi \\cdot 2^2 = 4\\pi$ m².')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'A una lámina cuadrada de 10 cm de lado se le recorta el círculo más grande posible. ¿Cuál expresión da el área que **sobra**, en cm²?', { letras: ['A', 'B', 'C', 'D'], paras: [['100 − 25π'], ['100 − 100π'], ['40 − 10π'], ['100 − 10π']] }, [
        ['Sobra el cuadrado menos el círculo: hay que hallar las dos áreas.', {}],
        ['El cuadrado de lado 10 tiene 100 cm².', {}, '$10 \\cdot 10 = 100$'],
        ['El círculo más grande toca los cuatro lados: su diámetro es 10 y su radio, 5.', {}],
        ['B usa 10 como radio: confunde el radio con el diámetro.', { luz: [1], nota: { 1: 'diámetro' } }],
        ['C resta bordes y D usa π por el diámetro, la fórmula del borde. No son áreas.', { luz: [2, 3], nota: { 2: 'bordes', 3: 'borde' } }],
        ['A resta π por 5 al cuadrado. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }, '$100 - 25\\pi \\approx 21.5$'],
      ], 'En una figura compuesta, halla cada pieza con su fórmula y luego suma o resta.'),
      xpHaz('hoja', 'Un parque cuadrado de 20 m de lado tiene en el centro una fuente redonda de **6 m de diámetro**. Subraya el área de prado que queda, en m².', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['400 − 36π'], ['400 − 9π'], ['80 − 6π'], ['400 − 6π']], pista: 'La fuente da el diámetro. ¿Qué número va al cuadrado en el área del círculo?' }, 'Radio 3: $400 - 9\\pi$ m² de prado.')],
    cierre: 'El radio es la mitad del diámetro; el área usa el radio al cuadrado, y lo compuesto se suma o se resta.',
  });

  xpAmplia('icf-ma-medida-3', {
    conecta: 'icf-ma-medida-2',
    desde: [
      ['Desde cero: qué es el volumen',
        xpMira('dibujo', 'El **volumen** es cuánto espacio ocupa algo. Se mide con **cubitos**, como el área se medía con cuadritos.', { dib: caja, v: { a: 1, b: 1, c: 1, t: '' }, alto: 176 }, [
          ['En la lección de círculos viste que el área del círculo es π por el radio al cuadrado.', {}],
          ['El volumen es cuánto espacio ocupa algo. Se mide con cubitos.', {}],
          ['Un cubito de 1 cm de largo, ancho y alto es un centímetro cúbico: 1 cm³.', { t: '1 cm³' }],
          ['Una caja de 3 por 2 por 2 se llena con 12 cubitos: 12 cm³.', { a: 3, b: 2, c: 2, t: '12 cm³' }, '$3 \\cdot 2 \\cdot 2 = 12$'],
          ['La capacidad es cuánto líquido cabe adentro de un recipiente.', { t: 'capacidad' }],
          ['Un cubo de 10 cm de lado guarda justo 1 litro: 1 000 cm³.', { t: '1 L = 1 000 cm³' }, '$10 \\cdot 10 \\cdot 10 = 1\\,000$'],
        ], 'Volumen en cubitos (cm³, m³); capacidad en litros: 1 L = 1 000 cm³.'),
        xpHaz('fichas', 'Un cartón de leche mide 10 cm por 10 cm de base y 20 cm de alto. Pon su volumen en cm³ y en litros.', { slots: fila('cm³', 'litros'), fichas: ['2 000', '2', '200', '20', '0.2'], meta: ['2 000', '2'], alto: 96, pista: 'Multiplica las tres medidas. Cada 1 000 cm³ es un litro.' }, '$10 \\cdot 10 \\cdot 20 = 2\\,000$ cm³: 2 litros.')],
    ],
    despues: [
      ['Más difícil: pasar unidades de volumen',
        xpMira('fichas', 'Así como 1 m² son 10 000 cm², un **metro cúbico** guarda muchísimos centímetros cúbicos: el cambio va **al cubo**.', { slots: fila('cm en 1 m', 'cm³ en 1 m³', 'litros en 1 m³'), fichas: ['100', '1 000 000', '1 000'], alto: 96 }, [
          ['Un metro tiene 100 cm. ¿Cuántos cm³ tiene un metro cúbico?', {}],
          ['Un metro cúbico es un cubo de 100 por 100 por 100 centímetros.', { pon: { 0: '100' } }],
          ['Son 100 por 100 por 100: un millón de centímetros cúbicos.', { pon: { 1: '1 000 000' } }, '$100^3 = 1\\,000\\,000$'],
          ['Cada litro son 1 000 cm³, así que en 1 m³ caben 1 000 litros.', { pon: { 2: '1 000' } }, '$1\\,000\\,000 \\div 1\\,000 = 1\\,000$'],
          ['Largo: por 100. Área: por 100 al cuadrado. Volumen: por 100 al cubo.', { marca: [1] }],
        ], '1 m³ = 1 000 000 cm³ = 1 000 litros.'),
        xpHaz('fichas', 'Un tanque de **2 m³** se llena con baldes de 10 litros. Pon los litros del tanque y cuántos baldes hacen falta.', { slots: fila('litros', 'baldes'), fichas: ['2 000', '200', '20', '2 000 000', '20 000'], meta: ['2 000', '200'], alto: 96, pista: 'Cada metro cúbico son 1 000 litros. Después reparte en baldes de 10.' }, '$2 \\cdot 1\\,000 = 2\\,000$ L y $2\\,000 \\div 10 = 200$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tanque cilíndrico tiene 1 m de radio y 2 m de alto. ¿Cuántos litros le caben? Usa $\\pi \\approx 3.14$.', { letras: ['A', 'B', 'C', 'D'], paras: [['6.28 litros'], ['6 280 litros'], ['25 120 litros'], ['2 093 litros']] }, [
        ['Cilindro: área de la base por la altura. La base es un círculo de radio 1.', {}],
        ['Base: π por 1 al cuadrado, 3.14 m². Por 2 de alto: 6.28 m³.', {}, '$3.14 \\cdot 1^2 \\cdot 2 = 6.28$'],
        ['A deja metros cúbicos y los llama litros: unidades mezcladas.', { luz: [0], nota: { 0: 'unidades' } }],
        ['C usa 2 como radio: confunde el radio con el diámetro.', { luz: [2], nota: { 2: 'diámetro' } }],
        ['D toma un tercio, como si fuera un cono. Pero es un cilindro.', { luz: [3], nota: { 3: 'es un cono' } }],
        ['Cada metro cúbico son 1 000 litros: 6 280 litros. B es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Calcula el volumen en m³ y conviértelo a litros al final.'),
      xpHaz('hoja', 'Una piscina mide 5 m de largo, 3 m de ancho y 1.2 m de hondo. Subraya cuántos litros le caben.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['18 litros'], ['18 000 litros'], ['9.2 litros'], ['1 800 litros']], pista: 'Multiplica las tres medidas en metros y fíjate en la unidad del resultado.' }, '$5 \\cdot 3 \\cdot 1.2 = 18$ m³, que son 18 000 litros.')],
    cierre: 'Volumen es base por altura en cubitos; 1 L = 1 000 cm³ y 1 m³ = 1 000 L.',
  });
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
//#archivo js/explora-icf-ma-5-pasos.js
// Preicfes · Matemáticas, mundo 5 «Funciones Lineales», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde el plano
// cartesiano, la letra que guarda un número y la tabla para comparar, hasta las trampas que más salen (lo empinado que depende de la
// escala, el fijo cambiado por la pendiente, el empate que no es entero, el «siempre» que no se cumple).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Plano de 0 a 8 y de 0 a h. Punto (px, py) con sus guías; recta de (0, b) con pendiente m si `lin`.
  const X = x => 52 + x * 32, Y = (y, h) => 176 - y / h * 144;
  const plano = (v, K) => {
    const h = v.h || 24; let s = '';
    for (let i = 0; i <= 8; i += 2) s += K.l(X(i), 32, X(i), 176, i ? 'ls' : 'lm') + K.t(X(i), 192, i, 's tm');
    for (let k = 0; k <= 4; k++) s += K.l(52, Y(k * h / 4, h), 308, Y(k * h / 4, h), k ? 'ls' : 'lm') + (k ? K.t(46, Y(k * h / 4, h) + 4, Math.round(k * h / 4), 's tm', 'end') : '');
    if (v.ex) s += K.t(308, 170, v.ex, 's tg', 'end');
    if (v.ey) s += K.t(58, 26, v.ey, 's ta', 'start');
    if (v.lin) s += K.pl([[X(0), Y(v.b, h)], [X(8), Y(v.b + v.m * 8, h)]], 'la gr');
    if (v.pt) s += K.l(X(v.px), 176, X(v.px), Y(v.py, h), 'lg d') + K.l(52, Y(v.py, h), X(v.px), Y(v.py, h), 'lg d') + K.c(X(v.px), Y(v.py, h), 6, 'fG');
    return s + K.t(190, 20, v.t || '', 'ta');
  };
  const P0 = { h: 24, b: 0, m: 0, lin: 0, pt: 0, px: 0, py: 0, ex: '', ey: '', t: '' };

  xpAmplia('icf-ma-lineal-1', {
    conecta: 'icf-ma-proporcion-4',
    desde: [
      ['Desde cero: el plano cartesiano',
        xpMira('dibujo', 'Una gráfica se dibuja en un **plano**: dos reglas que se cruzan. Cada punto guarda **dos** números a la vez.', { dib: plano, v: { ...P0 }, alto: 200 }, [
          ['En la lección de tasas viste que una tasa dice cuánto cambia algo por cada unidad.', {}],
          ['Un plano tiene dos reglas. La horizontal es para lo que avanza, como el tiempo.', { ex: 'minutos →' }],
          ['La vertical es para lo que se mide, como los litros de un tanque.', { ey: '↑ litros' }],
          ['Un punto junta las dos: (2, 10) es «a los 2 minutos hay 10 litros».', { pt: 1, px: 2, py: 10, t: '(2, 10)' }],
          ['Primero se camina a la derecha y después se sube: el orden importa.', { pt: 1, px: 2, py: 10, t: '(x, y)' }],
          ['Si unes los puntos de una misma situación, sale su gráfica.', { lin: 1, b: 6, m: 2, t: 'la gráfica' }],
        ], 'Un punto (x, y): primero lo que avanza, después lo que se mide.'),
        xpHaz('dibujo', 'Ubica el punto **(5, 16)**: a los 5 minutos hay 16 litros.', { dib: plano, v: { ...P0, ex: 'minutos →', ey: '↑ litros', pt: 1, px: 1, py: 4 }, metas: { px: 5, py: 16 }, alto: 200,
          manijas: [{ k: ['px', 'py'], min: [0, 0], max: [8, 24], paso: [1, 2], r: 10, en: v => [X(v.px), Y(v.py, 24)], de: (x, y) => [(x - 52) / 32, (176 - y) / 144 * 24] }],
          lee: v => `$(${v.px}, ${v.py})$`, dice: () => 'Primero a la derecha, después hacia arriba.' }, 'Cinco a la derecha y dieciséis hacia arriba.')],
    ],
    despues: [
      ['Más difícil: lo empinado engaña',
        xpMira('dibujo', 'Dos gráficas pueden **verse** igual de empinadas y tener pendientes muy distintas. Manda la **escala** del eje.', { dib: plano, v: { ...P0, lin: 1, b: 0, m: 3, h: 24 }, alto: 200 }, [
          ['Dos gráficas pueden verse igual de empinadas y tener pendientes distintas.', {}],
          ['En esta, el eje vertical llega a 24: de 0 a 8 sube 24. La pendiente es 3.', { t: '24 ÷ 8 = 3' }, '$24 \\div 8 = 3$'],
          ['Ahora el eje llega a 240, y la recta se ve idéntica.', { h: 240, m: 30, t: '' }],
          ['Pero sube 240 en 8: la pendiente es 30, diez veces más.', { t: '240 ÷ 8 = 30' }, '$240 \\div 8 = 30$'],
          ['Lo empinado depende de la escala; la pendiente sale de los números.', {}],
        ], 'No compares pendientes a ojo: lee los números de los ejes.'),
        xpHaz('fichas', 'Una gráfica pasa por (2, 150) y (6, 350). Pon lo que **sube**, lo que **avanza** y la **pendiente**.', { slots: fila('sube', 'avanza', 'pendiente'), fichas: ['200', '4', '50', '100', '25'], meta: ['200', '4', '50'], alto: 96, pista: 'Resta las y, resta las x, y divide lo que sube entre lo que avanza.' }, '$350 - 150 = 200$, $6 - 2 = 4$ y $200 \\div 4 = 50$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tanque tiene 50 litros y pierde 5 litros por minuto. ¿Cuál tabla representa la situación en los minutos 0, 1 y 2?', { letras: ['A', 'B', 'C', 'D'], paras: [['50, 45, 40'], ['50, 55, 60'], ['45, 40, 35'], ['50, 45, 35']] }, [
        ['Revisa tres cosas: dónde empieza, si sube o baja y cuánto cambia cada vez.', {}],
        ['B sube 5 cada minuto, pero el tanque pierde agua: signo equivocado.', { luz: [1], nota: { 1: 'signo' } }],
        ['C baja bien, pero empieza en 45: el punto de partida es 50.', { luz: [2], nota: { 2: 'partida' } }],
        ['D empieza bien, pero baja 5 y luego 10: el cambio no es parejo.', { luz: [3], nota: { 3: 'no es parejo' } }],
        ['A empieza en 50 y baja 5 cada minuto. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Revisa punto de partida, signo del cambio y que el cambio sea parejo.'),
      xpHaz('hoja', 'Un celular tiene 90 % de batería y pierde 4 % por hora. Subraya la tabla que lo representa en las horas 0, 1 y 2.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['90, 94, 98'], ['86, 82, 78'], ['90, 86, 82'], ['90, 86, 78']], pista: 'Mira el primer número, si sube o baja y si cambia siempre lo mismo.' }, 'Empieza en 90 y baja 4 cada hora.')],
    cierre: 'Lee los ejes, calcula sube entre avanza con números y revisa partida, signo y cambio parejo.',
  });

  xpAmplia('icf-ma-lineal-2', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: la letra que guarda un número',
        xpMira('fichas', 'En álgebra, una **letra** es una caja donde va un número que todavía no sabemos. Las palabras dicen qué se le hace.', { slots: fila('el doble', 'aumentado en 5', 'triple menos 1'), fichas: ['2x', 'x + 5', '3x − 1'], alto: 96 }, [
          ['En la lección de pendiente viste lo que cambia por cada unidad.', {}],
          ['Una letra, como x, es una caja con un número que todavía no conocemos.', {}],
          ['«El doble de un número» se escribe 2x: dos veces lo que haya en la caja.', { pon: { 0: '2x' } }],
          ['«Un número aumentado en 5» es x + 5.', { pon: { 1: 'x + 5' } }],
          ['«El triple de un número, menos 1» es 3x − 1: primero el triple, luego se resta.', { pon: { 2: '3x − 1' } }],
          ['Si x vale 4, la caja se llena: 2x es 8, x + 5 es 9 y 3x − 1 es 11.', { marca: [0, 1, 2] }],
        ], 'Una letra guarda un número; las palabras dicen qué operaciones se le hacen.'),
        xpHaz('fichas', 'Traduce: «la **mitad** de un número» y «un número **disminuido en 7**».', { slots: fila('la mitad', 'disminuido en 7'), fichas: ['x/2', 'x − 7', '2x', '7 − x', 'x + 7'], meta: ['x/2', 'x − 7'], alto: 96, pista: 'Disminuir es quitarle al número, así que él va primero.' }, 'La mitad es $\\tfrac{x}{2}$ y disminuido en 7 es $x - 7$.')],
    ],
    despues: [
      ['Más difícil: leer la expresión',
        xpMira('fichas', 'El examen también va al revés: te da la expresión y pregunta qué **significa** cada número.', { slots: fila('fijo', 'por cada mes', 'con 5 meses'), fichas: ['50', '20', '150'], alto: 96 }, [
          ['Un gimnasio cobra C = 50 + 20m, en miles, donde m son los meses.', {}, '$C = 50 + 20m$'],
          ['El número solo, 50, no depende de m: se paga una vez. Es el fijo.', { pon: { 0: '50' } }],
          ['El 20 va pegado a m: se paga 20 por cada mes. Es la pendiente.', { pon: { 1: '20' } }],
          ['Con 5 meses: 50 más 20 por 5, son 150 mil.', { pon: { 2: '150' } }, '$50 + 20 \\cdot 5 = 150$'],
          ['Si el número pegado a la letra es negativo, cada unidad resta en vez de sumar.', {}],
        ], 'Número solo: fijo. Número pegado a la letra: lo que cambia por cada unidad.'),
        xpHaz('hoja', 'Una tarjeta de bus tiene un saldo S = 40 000 − 2 500v, con v los viajes. Subraya qué significa el **2 500**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo que había en la tarjeta al comienzo.'], ['Lo que se descuenta en cada viaje.'], ['Los viajes que se pueden hacer.']], pista: 'Mira a qué está pegado ese número y si suma o resta.' }, 'Va pegado a v con signo menos: se resta en cada viaje.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lavandería cobra 6 000 por el servicio y 2 500 por cada kilo de ropa. ¿Cuál expresión da el cobro C por k kilos?', { letras: ['A', 'B', 'C', 'D'], paras: [['C = 6 000k + 2 500'], ['C = 6 000 + 2 500k'], ['C = 8 500k'], ['C = 6 000 + 2 500']] }, [
        ['Separa lo que se paga una vez de lo que se paga por cada kilo.', {}],
        ['El 6 000 se paga una vez: va solo. El 2 500 va pegado a k.', {}],
        ['A los cambia: cobraría 6 000 por cada kilo.', { luz: [0], nota: { 0: 'cambiados' } }],
        ['C multiplica todo por k: el fijo terminaría cobrándose por kilo.', { luz: [2], nota: { 2: 'fijo por kilo' } }],
        ['D no tiene letra: daría lo mismo con 1 kilo que con 10.', { luz: [3], nota: { 3: 'sin letra' } }],
        ['B es fijo más 2 500 por kilo. Con 2 kilos da 11 000.', { luz: [1], nota: { 1: 'correcta' } }, '$6\\,000 + 2\\,500 \\cdot 2 = 11\\,000$'],
      ], 'Lo fijo va solo y lo que se cobra por cada uno va pegado a la letra.'),
      xpHaz('hoja', 'Un tanque tiene 800 litros y se le sacan 25 por día. Subraya la expresión de los litros L que quedan después de d días.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['L = 800d − 25'], ['L = 25d − 800'], ['L = 800 − 25d'], ['L = 800 + 25d']], pista: 'Pruébala con d = 0 y con d = 1: ¿cuánta agua debería haber?' }, 'Empieza en 800 y cada día resta 25.')],
    cierre: 'Lo fijo va solo, lo que cambia va pegado a la letra, y la expresión se prueba con un número.',
  });

  const TA = i => String(i < 5 ? 10 + 2 * (i + 1) : 4 * (i - 4));
  const TB = i => String(i < 5 ? 6 + 3 * (i + 1) : 5 * (i - 4));
  xpAmplia('icf-ma-lineal-3', {
    conecta: 'icf-ma-lineal-2',
    desde: [
      ['Desde cero: comparar con una tabla',
        xpMira('rejilla', 'Para comparar dos planes no hace falta nada raro: una **tabla** con los dos, lado a lado, uso por uso.', { f: 2, c: 5, filas: ['plan A', 'plan B'], cols: ['1', '2', '3', '4', '5'], izq: 64, celda: TA }, [
          ['En la lección anterior escribiste cobros como fijo más algo por cada unidad.', {}],
          ['Para comparar dos planes, lo más sencillo es hacer una tabla.', {}],
          ['A cobra 10 fijos y 2 por cada uso. B no tiene fijo y cobra 4 por uso.', { luz: [0, 5] }],
          ['Con pocos usos, B es más barato: con 2 usos, 8 contra 14.', { luz: [1, 6] }],
          ['Con 5 usos cuestan lo mismo: 20 cada uno. Ahí empatan.', { luz: [4, 9] }],
          ['Después del empate, el que sube más rápido, B, se vuelve el más caro.', {}],
        ], 'Con los dos planes lado a lado se ve cuál conviene y dónde empatan.'),
        xpHaz('rejilla', 'Plan A: 6 fijos y 3 por uso. Plan B: 5 por uso. Toca las **dos** casillas donde cuestan **lo mismo**.', { f: 2, c: 5, filas: ['plan A', 'plan B'], cols: ['1', '2', '3', '4', '5'], izq: 64, celda: TB, unoAUno: true, meta: [2, 7] }, 'Con 3 usos los dos cobran 15.')],
    ],
    despues: [
      ['Más difícil: el empate que no es entero',
        xpMira('fichas', 'A veces el empate cae en un número que **no existe** en la vida real, como 3.5 copias. Entonces se prueban los enteros.', { slots: fila('B empieza', 'se acerca', 'empate', 'desde').map(s => ({ ...s, w: 66 })), fichas: ['7 000', '2 000', '3.5', '4'], alto: 96 }, [
          ['A cobra 3 000 por copia. B cobra 7 000 fijos y 1 000 por copia.', {}],
          ['Al comienzo, B va 7 000 más caro.', { pon: { 0: '7 000' } }],
          ['Pero en cada copia B se acerca 2 000.', { pon: { 1: '2 000' } }, '$3\\,000 - 1\\,000 = 2\\,000$'],
          ['Empatarían en 3.5 copias, que no existen.', { pon: { 2: '3.5' } }, '$7\\,000 \\div 2\\,000 = 3.5$'],
          ['Con 4 copias, A cobra 12 000 y B, 11 000: conviene B desde 4.', { pon: { 3: '4' } }, '$4 \\cdot 3\\,000 = 12\\,000 \\quad 7\\,000 + 4\\,000 = 11\\,000$'],
          ['Si el empate no es entero, prueba los enteros de cada lado.', { marca: [3] }],
        ], 'Si el empate no es entero, prueba el entero de antes y el de después.'),
        xpHaz('fichas', 'Un plan cobra 2 500 por hora. Otro cobra 7 000 fijos más 1 000 por hora. Pon el empate, redondeado, y desde qué hora entera conviene el de fijo.', { slots: fila('empate (≈ h)', 'conviene desde'), fichas: ['4.7', '5', '4', '2.8', '7'], meta: ['4.7', '5'], alto: 96, pista: 'Divide la diferencia de fijos entre lo que se acerca por hora, y prueba los enteros vecinos.' }, '$7\\,000 \\div 1\\,500 \\approx 4.7$: desde la hora 5.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Plan A: 20 000 fijos y 500 por minuto. Plan B: 1 000 por minuto, sin fijo. Ana habla 30 minutos y dice que le conviene B. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['No, porque A cobra menos por minuto.'], ['Sí, porque con 30 minutos B cuesta 30 000 y A, 35 000.'], ['Sí, porque B no tiene fijo y siempre es más barato.'], ['No, porque los planes empatan en 40 minutos.']] }, [
        ['Haz tu cuenta con los 30 minutos de Ana antes de leer los porqués.', {}],
        ['A cuesta 20 000 más 500 por 30: 35 000. B cuesta 30 000.', {}, '$20\\,000 + 15\\,000 = 35\\,000$'],
        ['B sale más barato: la respuesta es Sí, y las del No caen.', { luz: [0, 3], nota: { 0: 'es Sí', 3: 'es Sí' } }],
        ['A y D dicen datos ciertos, pero no deciden para 30 minutos.', { luz: [0, 3] }],
        ['C dice «siempre», y después de 40 minutos B sale más caro.', { luz: [2], nota: { 2: 'siempre' } }],
        ['B da la cuenta para la cantidad de Ana. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Calcula con la cantidad que se usa y desconfía del «siempre».'),
      xpHaz('hoja', 'Taller X: 30 000 fijos y 10 000 por hora. Taller Y: 18 000 por hora. Luis necesita 5 horas y dice que le conviene Y. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque Y no cobra fijo.'], ['No: con 5 horas X cobra 80 000 y Y, 90 000.'], ['Sí, porque Y siempre es más barato.'], ['No, porque X cobra más por hora.']], pista: 'Calcula lo que cobra cada taller por 5 horas antes de leer los porqués.' }, 'X: $30\\,000 + 50\\,000 = 80\\,000$; Y: $90\\,000$.')],
    cierre: 'Tabla o cruce para ver el empate; a cada lado gana uno distinto; decide con tu cantidad.',
  });
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
//#archivo js/explora-icf-ma-6-pasos.js
// Preicfes · Matemáticas, mundo 6 «Triángulos y Semejanza», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es un
// ángulo, el cuadrado y la raíz, los nombres del triángulo rectángulo, la misma forma con otro tamaño y dividir dos lados, hasta las
// trampas que más salen (paralelas, Pitágoras escondido, el trozo en lugar del lado, k frente a k², la razón mal escogida).
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const nombre = g => (g < 89.5 ? 'agudo' : g < 90.5 ? 'recto' : g < 179.5 ? 'obtuso' : 'llano');
  // Ángulo de g grados con vértice en (170, 150).
  const angulo = (v, K) => {
    const [x, y] = K.at(170, 150, 120, v.g);
    return K.l(170, 150, 300, 150, 'lm gr') + K.sec(170, 150, 40, 0, v.g, 'fa') + K.l(170, 150, x, y, 'la gr') + K.c(170, 150, 4, 'fk') +
      K.t(310, 40, `${Math.round(v.g)}°`, 'b', 'end') + K.t(310, 62, v.n ? nombre(v.g) : '', 'ta', 'end') + K.t(170, 182, v.t || '', 's tm');
  };
  // Dos paralelas cortadas por una recta a 65°: k = 1 un ángulo, 2 su copia abajo, 3 los opuestos, 4 los vecinos.
  const PA = [150, 60], PB = [150 - 70 / Math.tan(65 * Math.PI / 180), 130];
  const paralelas = (v, K) => {
    const [x1, y1] = K.at(PA[0], PA[1], 50, 65), [x2, y2] = K.at(PB[0], PB[1], 50, 245);
    let h = K.l(30, 60, 310, 60, 'lm gr') + K.l(30, 130, 310, 130, 'lm gr') + K.l(x1, y1, x2, y2, 'la gr');
    for (const [P, on] of [[PA, v.k >= 1], [PB, v.k >= 2]]) {
      if (on) h += K.sec(P[0], P[1], 20, 0, 65, 'fg');
      if (v.k >= 3 && P === PA) h += K.sec(P[0], P[1], 20, 180, 245, 'fg');
      if (v.k >= 3 && P === PB) h += K.sec(P[0], P[1], 20, 180, 245, 'fg');
      if (v.k >= 4) h += K.sec(P[0], P[1], 20, 65, 180, 'ff') + K.sec(P[0], P[1], 20, 245, 360, 'ff');
    }
    return h + K.t(170, 178, v.t || '', 'ta') + (v.k >= 1 ? K.t(310, 24, '65°', 's tg', 'end') : '') + (v.k >= 4 ? K.t(310, 44, '115°', 's tf', 'end') : '');
  };
  // Cuadrado de k × k baldosas.
  const cuadro = (v, K) => {
    const n = Math.round(v.k), u = 22; let s = '';
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += K.r(120 - n * u / 2 + i * u, 20 + j * u, u - 2, u - 2, 'fa', 2);
    return s + K.t(250, 80, v.t || '', 'ta', 'start');
  };
  // Triángulo rectángulo: catetos 160 × 90, ángulo recto abajo a la derecha.
  const rectangulo = (v, K) => {
    const A = [70, 150], B = [230, 150], C = [230, 60];
    return K.p([A, B, C], 'fn') + K.r(218, 138, 12, 12, 'fn', 0) +
      (v.c ? K.l(A[0], A[1], B[0], B[1], 'lg gr') + K.l(B[0], B[1], C[0], C[1], 'lg gr') + K.t(150, 170, 'cateto', 's tg') + K.t(240, 110, 'cateto', 's tg', 'start') : '') +
      (v.h ? K.l(A[0], A[1], C[0], C[1], 'lf gr') + K.t(134, 92, 'hipotenusa', 's tf', 'end') : '') + K.t(170, 28, v.t || '', 'ta');
  };
  // Techo isósceles de lados 10 y base 12 (u = 12), con la altura.
  const techo = (v, K) => {
    const u = 12, A = [170 - 6 * u, 160], B = [170 + 6 * u, 160], C = [170, 160 - 8 * u];
    return K.p([A, B, C], 'fa') + K.t(130, 104, '10', 's', 'end') + K.t(210, 104, '10', 's', 'start') +
      (v.a ? K.l(170, 160, 170, C[1], 'lg gr') + K.r(170, 148, 12, 12, 'fn', 0) + K.t(134, 178, '6', 's tm') + K.t(206, 178, '6', 's tm') : K.t(170, 178, '12', 's tm')) +
      (v.hh ? K.t(178, 120, v.hh, 's tg', 'start') : '') + K.t(296, 40, v.t || '', 'ta', 'end');
  };
  // Dos fotos: la de 2 × 3 y otra de w × h (u = 20), con una cara adentro.
  const foto = (v, K) => {
    const u = 20, cara = (x, y, w, h) => `<ellipse class="xf fg" cx="${K.n(x + w / 2)}" cy="${K.n(y + h * 0.45)}" rx="${K.n(w * 0.28)}" ry="${K.n(h * 0.28)}"/>`;
    const fw = v.w * u, fh = v.h * u;
    return K.r(30, 190 - 3 * u, 2 * u, 3 * u, 'fc', 2) + cara(30, 190 - 3 * u, 2 * u, 3 * u) + K.t(50, 204, '2 × 3', 's tm') +
      K.r(120, 190 - fh, fw, fh, 'fc', 2) + cara(120, 190 - fh, fw, fh) + K.t(120 + fw / 2, 204, `${String(Math.round(v.w * 10) / 10)} × ${String(Math.round(v.h * 10) / 10)}`, 's tm') + K.t(320, 24, v.t || '', 'ta', 'end');
  };
  // Triángulo con una paralela a la base que corta un tercio desde la punta.
  const encaje = (v, K) => {
    const A = [170, 20], B = [50, 170], C = [290, 170], D = [A[0] + (B[0] - A[0]) / 3, A[1] + 50], E = [A[0] + (C[0] - A[0]) / 3, A[1] + 50];
    return K.p([A, B, C], 'fn') + K.f(v.p, K.p([A, D, E], 'fa')) + K.l(D[0], D[1], E[0], E[1], 'lg gr') +
      (v.l ? K.t(D[0] - 10, (A[1] + D[1]) / 2 + 6, '4', 's tg', 'end') + K.t((D[0] + B[0]) / 2 - 10, (D[1] + B[1]) / 2, v.l > 1 ? '8' : '', 's tf', 'end') + K.t(72, 110, v.l > 1 ? '' : '12', 's tm', 'end') : '') +
      K.t(170, 188, '15', 's tm') + (v.b ? K.t(170, D[1] - 6, v.b, 's tg') : '') + K.t(330, 30, v.t || '', 'ta', 'end');
  };
  // Rampa: sube e y avanza 4e (u = 28).
  const rampa = (v, K) => {
    const u = 28, x0 = 50, y0 = 160, b = 4 * v.e * u, h = v.e * u;
    return K.p([[x0, y0], [x0 + b, y0], [x0 + b, y0 - h]], 'fa') + K.r(x0 + b - 10, y0 - 10, 10, 10, 'fn', 0) + K.ang([x0, y0], [x0 + b, y0], [x0 + b, y0 - h], 34, '', 'fg') +
      K.t(x0 + b / 2, y0 + 18, `avanza ${Math.round(4 * v.e)}`, 's tm') + K.t(x0 + b + 6, y0 - h / 2 + 4, `sube ${Math.round(v.e)}`, 's tm', 'start') + K.t(170, 30, v.t || '', 'ta');
  };
  // Notables: m = 0 equilátero de lado 2, 1 partido en dos (30°-60°-90°), 2 cuadrado con su diagonal (45°).
  const notables = (v, K) => {
    const m = Math.round(v.m);
    if (m === 2) return K.r(120, 50, 100, 100, 'fn', 0) + K.l(120, 150, 220, 50, 'la gr') + K.ang([120, 150], [220, 150], [220, 50], 30, '45°', 'fg') + K.t(170, 168, '1', 's tm') + K.t(230, 104, '1', 's tm', 'start') + K.t(170, 30, v.t || '', 'ta');
    const A = [110, 170], B = [230, 170], C = [170, 170 - 103.92];
    let h = K.p([A, B, C], m ? "fn" : "fa") + K.t(132, 112, '2', 's', 'end') + K.t(208, 112, '2', 's', 'start');
    if (m === 1) h += K.p([C, [170, 170], B], 'fa') + K.l(170, 170, C[0], C[1], 'lg gr') + K.t(200, 186, '1', 's tg') + K.t(164, 128, '√3', 's tg', 'end') + K.ang(C, [170, 170], B, 22, '30°', 'fg');
    else h += K.t(170, 186, '2', 's tm');
    return h + K.t(170, 30, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-forma-1', {
    conecta: 'icf-ma-medida-2',
    desde: [
      ['Desde cero: qué es un ángulo',
        xpMira('dibujo', 'Un **ángulo** es cuánto se abre un rayo respecto a otro. Se mide en **grados**, y la vuelta completa tiene 360.', { dib: angulo, v: { g: 0, n: 0, t: '' }, alto: 196 }, [
          ['En la lección de círculos viste que un sector es una fracción de la vuelta de 360°.', {}],
          ['Un ángulo es la abertura entre dos rayos que salen del mismo punto: el vértice.', { g: 50, t: 'vértice' }],
          ['Media vuelta forma una recta y mide 180°.', { g: 180, n: 1, t: '' }],
          ['Un cuarto de vuelta mide 90°: el ángulo recto, como la esquina de un cuaderno.', { g: 90, n: 1 }],
          ['Un ángulo de menos de 90° se llama agudo.', { g: 40, n: 1 }],
          ['Uno de más de 90° y menos de 180° se llama obtuso.', { g: 130, n: 1 }],
        ], 'Vuelta 360°, recta 180°, recto 90°; menos de 90° agudo, más, obtuso.'),
        xpHaz('dibujo', 'Abre el ángulo hasta **135°**: un recto y medio recto más.', { dib: angulo, v: { g: 30, n: 1 }, metas: { g: 135 }, alto: 240, manijas: [{ k: 'g', min: 0, max: 180, paso: 15, et: 'grados' }],
          lee: v => `$${v.g}^\\circ$`, dice: () => 'Medio recto son 45°.' }, '$90^\\circ + 45^\\circ = 135^\\circ$: un ángulo obtuso.')],
    ],
    despues: [
      ['Más difícil: ángulos entre paralelas',
        xpMira('dibujo', 'Cuando una recta corta dos **paralelas** aparecen ocho ángulos. Parecen muchos, pero solo hay **dos** medidas.', { dib: paralelas, v: { k: 0, t: '' }, alto: 190 }, [
          ['Dos rectas paralelas nunca se cruzan, como los rieles de un tren.', {}],
          ['Una tercera recta las corta y forma cuatro ángulos en cada cruce: ocho en total.', { t: 'ocho ángulos' }],
          ['Este ángulo mide 65°.', { k: 1, t: '65°' }],
          ['Los dos cruces son copias: abajo, en la misma posición, también mide 65°.', { k: 2, t: 'copia' }],
          ['El de enfrente, opuesto por el vértice, es igual: otro 65° en cada cruce.', { k: 3, t: 'opuestos' }],
          ['Los vecinos sobre una recta suman 180°: los que faltan miden 115°.', { k: 4, t: '65° y 115°' }, '$180 - 65 = 115$'],
        ], 'Entre paralelas solo hay dos medidas, y entre las dos suman 180°.'),
        xpHaz('fichas', 'Una recta corta dos paralelas y uno de los ángulos mide 70°. Pon las dos medidas que aparecen en los ocho ángulos.', { slots: fila('iguales a él', 'los otros'), fichas: ['70°', '110°', '20°', '90°', '140°'], meta: ['70°', '110°'], alto: 96, pista: 'Los vecinos sobre una recta completan media vuelta.' }, 'Cuatro miden 70° y cuatro, $180 - 70 = 110^\\circ$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pablo tiene palitos de 4 cm, 6 cm y 11 cm y dice que con ellos arma un triángulo. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 4 + 6 + 11 = 21, que es un número grande.'], ['Sí, porque 11 − 6 = 5 y 4 es menor que 5.'], ['No, porque 4 + 6 = 10, que no alcanza a 11.'], ['No, porque los tres lados deben ser iguales.']] }, [
        ['Prueba clave: los dos lados cortos juntos deben pasar al largo.', {}],
        ['4 + 6 = 10, menos que 11: los cortos no alcanzan. Es No.', {}, '$4 + 6 = 10 < 11$'],
        ['A suma los tres: ese número no decide nada.', { luz: [0], nota: { 0: 'no decide' } }],
        ['B hace una resta cierta, pero que 4 sea menor que 5 dice justo que no cierra.', { luz: [1], nota: { 1: 'concluye mal' } }],
        ['D exige lados iguales: eso es solo el triángulo equilátero.', { luz: [3], nota: { 3: 'falso' } }],
        ['C compara los cortos con el largo. Es la correcta.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Haz la prueba con los dos lados cortos antes de leer los porqués.'),
      xpHaz('hoja', 'Un triángulo tiene ángulos de 50° y 75°. Marta dice que el tercero es obtuso. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 50 + 75 = 125, que pasa de 90.'], ['No, porque el tercero mide 55°, menos de 90.'], ['Sí, porque todo triángulo tiene un ángulo obtuso.'], ['No, porque el tercero mide 125°.']], pista: 'Halla primero el tercer ángulo: los tres suman 180°.' }, '$180 - 125 = 55^\\circ$: es agudo.')],
    cierre: 'Vuelta 360°, recta 180°; entre paralelas, dos medidas; y los lados cortos deben pasar al largo.',
  });

  xpAmplia('icf-ma-forma-2', {
    conecta: 'icf-ma-forma-1',
    desde: [
      ['Desde cero: el cuadrado y la raíz',
        xpMira('dibujo', 'Para Pitágoras hacen falta dos operaciones: **elevar al cuadrado** y su contraria, **sacar la raíz cuadrada**.', { dib: cuadro, v: { k: 1, t: '' }, alto: 170 }, [
          ['En la lección de ángulos viste que un ángulo recto mide 90°, como una esquina.', {}],
          ['Elevar al cuadrado es multiplicar un número por sí mismo: 3² es 3 por 3.', { k: 3, t: '3² = 3 · 3' }],
          ['Se llama así porque es el área de un cuadrado de ese lado: 9 baldosas.', { t: '3² = 9' }],
          ['Un cuadrado de lado 5 tiene 25 baldosas: 5² = 25.', { k: 5, t: '5² = 25' }],
          ['La raíz cuadrada va al revés: un cuadrado de 25 baldosas tiene lado 5.', { t: '√25 = 5' }],
          ['Con números grandes es igual: la raíz de 144 es 12, porque 12 por 12 da 144.', {}, '$\\sqrt{144} = 12$'],
        ], 'Cuadrado: el número por sí mismo. Raíz: el lado del cuadrado que da ese número.'),
        xpHaz('fichas', 'Pon el valor de $7^2$ y de $\\sqrt{81}$.', { slots: fila('7²', '√81'), fichas: ['49', '9', '14', '40.5', '3'], meta: ['49', '9'], alto: 96, pista: 'Al cuadrado no es por 2. La raíz busca el número que, por sí mismo, da 81.' }, '$7 \\cdot 7 = 49$ y $9 \\cdot 9 = 81$.')],
      ['Desde cero: los nombres del triángulo rectángulo',
        xpMira('dibujo', 'Pitágoras solo vale en el **triángulo rectángulo**, y usa los nombres de sus lados.', { dib: rectangulo, v: { c: 0, h: 0, t: '' }, alto: 186 }, [
          ['Un triángulo rectángulo tiene un ángulo recto, marcado con un cuadradito.', { t: 'ángulo recto' }],
          ['Los dos lados que forman el ángulo recto se llaman catetos.', { c: 1, t: 'catetos' }],
          ['El lado de enfrente del ángulo recto se llama hipotenusa.', { h: 1, t: 'hipotenusa' }],
          ['La hipotenusa es siempre el lado más largo.', { t: 'la más larga' }],
          ['Si el triángulo no tiene ángulo recto, Pitágoras no sirve.', { t: '' }],
        ], 'Catetos: los del ángulo recto. Hipotenusa: la de enfrente, la más larga.'),
        xpHaz('hoja', 'Un triángulo rectángulo tiene lados de 9, 12 y 15. Subraya la **hipotenusa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['9'], ['12'], ['15']], pista: 'La hipotenusa está enfrente del ángulo recto. ¿Cómo es comparada con los otros?' }, 'La hipotenusa es la más larga: 15.')],
    ],
    despues: [
      ['Más difícil: Pitágoras escondido',
        xpMira('dibujo', 'Muchas veces el triángulo rectángulo **no está a la vista**: hay que trazarlo, por ejemplo con una altura.', { dib: techo, v: { a: 0, hh: '', t: '' }, alto: 196 }, [
          ['Un techo es un triángulo con dos lados de 10 m y una base de 12 m. ¿Qué tan alto es?', {}],
          ['La altura baja derecho desde la punta y parte la base en dos: 6 y 6.', { a: 1 }],
          ['Aparecen dos triángulos rectángulos, cada uno con hipotenusa 10 y cateto 6.', { a: 1, t: '10 y 6' }],
          ['La altura es el otro cateto: 100 menos 36 da 64, y la raíz es 8.', { a: 1, hh: '8', t: 'altura 8' }, '$\\sqrt{100 - 36} = 8$'],
          ['Con la altura sale el área del techo: 12 por 8 entre 2, son 48 m².', { a: 1, hh: '8', t: 'área 48' }, '$\\tfrac{12 \\cdot 8}{2} = 48$'],
        ], 'Traza la altura o la diagonal: ahí aparece el triángulo rectángulo.'),
        xpHaz('fichas', 'Un triángulo tiene dos lados de 17 y una base de 16. Pon la mitad de la base y la altura.', { slots: fila('mitad de la base', 'altura'), fichas: ['8', '15', '16', '9', '25'], meta: ['8', '15'], alto: 96, pista: 'La altura parte la base en dos. Después, hipotenusa 17 y un cateto conocido.' }, '$\\sqrt{289 - 64} = \\sqrt{225} = 15$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tabla de 25 dm se apoya en un muro, con el pie a 7 dm. Juan halla la altura: 1) 25² + 7² = 674; 2) √674 ≈ 26; 3) llega a 26 dm. ¿Dónde está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['En el paso 1: la tabla es la hipotenusa, así que se resta: 625 − 49 = 576.'], ['En el paso 2: la raíz de 674 no se acerca a 26.'], ['En el paso 3: debió dar la respuesta en metros.'], ['No hay error.']] }, [
        ['Antes de los pasos: ¿puede la altura ser mayor que la tabla misma?', {}],
        ['No: la tabla es la hipotenusa, el lado más largo. 26 dm no puede ser.', { luz: [3], nota: { 3: 'no cuadra' } }],
        ['B revisa la raíz, pero la de 674 sí es casi 26: esa cuenta está bien.', { luz: [1], nota: { 1: 'cuenta bien' } }],
        ['C cambia la unidad, y eso no arregla el error.', { luz: [2], nota: { 2: 'no arregla' } }],
        ['El error está en el paso 1: para un cateto se resta. Da 24 dm.', { luz: [0], nota: { 0: 'correcta' } }, '$\\sqrt{625 - 49} = \\sqrt{576} = 24$'],
      ], 'Antes de seguir los pasos, revisa que la hipotenusa quede como el lado más largo.'),
      xpHaz('hoja', 'Una pantalla mide 24 de ancho y 10 de alto. Ana halla la diagonal: 1) 24 + 10 = 34; 2) 34² = 1 156; 3) la diagonal es 34. ¿Dónde está el error?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['En el paso 1: se suman los cuadrados, 576 + 100 = 676, y la diagonal es 26.'], ['En el paso 2: 34² no es 1 156.'], ['En el paso 3: la diagonal es 1 156.'], ['No hay error.']], pista: 'Recuerda qué se suma en Pitágoras: ¿los lados o sus cuadrados?' }, '$\\sqrt{576 + 100} = \\sqrt{676} = 26$.')],
    cierre: 'Busca el ángulo recto: hipotenusa al cuadrado es la suma; un cateto, la resta.',
  });

  xpAmplia('icf-ma-forma-3', {
    conecta: 'icf-ma-proporcion-1',
    desde: [
      ['Desde cero: misma forma, otro tamaño',
        xpMira('dibujo', 'Dos figuras son **semejantes** si tienen la misma forma, aunque una sea más grande. Piensa en ampliar una foto.', { dib: foto, v: { w: 2, h: 3, t: '' }, alto: 214 }, [
          ['En la lección de escalas viste que una escala multiplica todas las medidas por el mismo número.', {}],
          ['Dos figuras son semejantes si tienen la misma forma, aunque cambie el tamaño.', { t: 'copia igual' }],
          ['Esta foto mide 2 por 3. Ampliada al doble mide 4 por 6: misma forma.', { w: 4, h: 6, t: 'por 2' }],
          ['Si solo estiras el ancho, 4 por 3, la cara se deforma: no es semejante.', { w: 4, h: 3, t: 'deformada' }],
          ['El número por el que se multiplica se llama factor, o razón de semejanza.', { w: 4, h: 6, t: 'factor 2' }],
          ['En las semejantes los ángulos no cambian, y todos los lados crecen por el mismo factor.', {}],
        ], 'Semejantes: misma forma, mismos ángulos, todos los lados por el mismo factor.'),
        xpHaz('dibujo', 'Amplía la foto de 2 por 3 sin deformarla: el ancho ya es **5**. Lleva el alto hasta donde le toca.', { dib: foto, v: { w: 5, h: 4 }, metas: { h: 7.5 }, alto: 250, manijas: [{ k: 'h', min: 1, max: 9, paso: 0.5, et: 'alto' }],
          lee: v => `$5 \\div 2 = 2.5 \\quad ${v.h} \\div 3 = ${Math.round(v.h / 3 * 100) / 100}$`, dice: () => 'Los dos lados deben crecer por el mismo factor.' }, 'Factor 2.5: el alto es $3 \\cdot 2.5 = 7.5$.')],
    ],
    despues: [
      ['Más difícil: el triángulo dentro del triángulo',
        xpMira('dibujo', 'Una paralela a la base corta un triángulo y deja otro pequeño arriba. Son semejantes, pero hay una **trampa**.', { dib: encaje, v: { p: 0, l: 0, b: '', t: '' }, alto: 200 }, [
          ['Una recta paralela a la base corta el triángulo y deja otro pequeño arriba.', {}],
          ['El pequeño y el grande son semejantes: tienen los mismos ángulos.', { p: 1 }],
          ['El lado del grande mide 12 y el del pequeño, 4: el factor es un tercio.', { p: 1, l: 1, t: '4 de 12' }],
          ['La base grande mide 15, así que la pequeña mide 15 entre 3: 5.', { p: 1, l: 1, b: '5', t: 'base 5' }, '$15 \\cdot \\tfrac{4}{12} = 5$'],
          ['Trampa: comparar con el trozo de abajo, que mide 8. Eso da 7.5 y está mal.', { p: 1, l: 2, b: '¿7.5?', t: 'trampa' }],
          ['Se compara lado completo con lado completo, siempre desde el vértice.', { p: 1, l: 1, b: '5', t: '' }],
        ], 'Compara el lado completo del pequeño con el lado completo del grande.'),
        xpHaz('fichas', 'Un lado de un triángulo mide 20 y una paralela a la base lo corta a 5 de la punta. La base mide 16. Pon el factor y la base del triángulo pequeño.', { slots: fila('factor', 'base pequeña'), fichas: ['1/4', '4', '1/3', '5.3', '12'], meta: ['1/4', '4'], alto: 96, pista: 'Compara 5 con el lado completo, no con el trozo que queda abajo.' }, '$\\tfrac{5}{20} = \\tfrac14$ y $16 \\cdot \\tfrac14 = 4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos terrenos tienen la misma forma y el lado del grande es el triple. El pequeño mide 40 m². ¿Cuánto mide el grande?', { letras: ['A', 'B', 'C', 'D'], paras: [['120 m², porque el lado es el triple.'], ['360 m², porque el área crece por 3².'], ['43 m², porque 40 + 3.'], ['1 080 m², porque 40 · 27.']] }, [
        ['Piden un área: el factor de los lados no sirve tal cual.', {}],
        ['Si los lados se triplican, el área crece por 3 por 3: nueve veces.', {}, '$3^2 = 9$'],
        ['A usa el factor de los lados: multiplica solo una vez.', { luz: [0], nota: { 0: 'k, no k²' } }],
        ['C suma el factor, y en semejanza se multiplica.', { luz: [2], nota: { 2: 'suma' } }],
        ['D usa 3 al cubo: eso sería un volumen, no un área.', { luz: [3], nota: { 3: 'volumen' } }],
        ['B: 40 por 9, 360 m². Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }, '$40 \\cdot 9 = 360$'],
      ], 'Largo por k, área por k², volumen por k³.'),
      xpHaz('hoja', 'Dos tanques tienen la misma forma y el grande mide el doble de alto. El pequeño guarda 50 litros. Subraya lo que guarda el grande.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['100 litros'], ['200 litros'], ['400 litros'], ['52 litros']], pista: 'Litros son volumen. ¿Cuántas veces se multiplica el factor 2 en un volumen?' }, 'El volumen crece por $2^3 = 8$: $50 \\cdot 8 = 400$.')],
    cierre: 'Misma forma, mismo factor: lados por k, área por k², volumen por k³, lado completo con lado completo.',
  });

  xpAmplia('icf-ma-forma-4', {
    conecta: 'icf-ma-forma-3',
    desde: [
      ['Desde cero: dividir dos lados',
        xpMira('dibujo', 'La trigonometría empieza con algo sencillo: **dividir** dos lados de un triángulo rectángulo. Piensa en una **rampa**.', { dib: rampa, v: { e: 1, t: '' }, alto: 186 }, [
          ['En la lección de semejanza viste que al agrandar un triángulo, todos sus lados crecen igual.', {}],
          ['Piensa en una rampa que sube 1 metro por cada 4 que avanza.', { t: '1 de 4' }],
          ['Una rampa más larga pero igual de inclinada sube 2 por cada 8.', { e: 2, t: '2 de 8' }],
          ['Al dividir lo que sube entre lo que avanza, da lo mismo en las dos: 0.25.', { t: '0.25' }, '$\\tfrac14 = \\tfrac28 = 0.25$'],
          ['Esa división no depende del tamaño: depende solo de la inclinación, del ángulo.', {}],
          ['Dividir lados de un triángulo rectángulo es justo lo que hace la trigonometría.', {}],
        ], 'Si el ángulo no cambia, la división entre dos lados tampoco cambia.'),
        xpHaz('fichas', 'Una rampa sube 3 m mientras avanza 12 m. Otra, igual de inclinada, avanza 20 m. Pon la división de la primera y lo que sube la segunda.', { slots: fila('sube ÷ avanza', 'sube la otra'), fichas: ['0.25', '5', '4', '0.15', '8'], meta: ['0.25', '5'], alto: 96, pista: 'Igual de inclinada quiere decir la misma división.' }, '$3 \\div 12 = 0.25$ y $20 \\cdot 0.25 = 5$.')],
    ],
    despues: [
      ['Más difícil: los ángulos notables',
        xpMira('dibujo', 'Los ángulos de **30°**, **45°** y **60°** salen tanto que conviene saber sus razones. Se sacan de figuras conocidas.', { dib: notables, v: { m: 0, t: '' }, alto: 196 }, [
          ['Hay ángulos que salen tanto que conviene saber sus razones de memoria.', { t: 'equilátero de lado 2' }],
          ['Parte el triángulo equilátero por la mitad: queda uno de 30°, 60° y 90°.', { m: 1, t: '30°, 60° y 90°' }],
          ['El lado frente a 30° mide 1, la mitad de la hipotenusa: sen 30° = 1/2.', { m: 1, t: 'sen 30° = 1/2' }],
          ['La altura mide raíz de 3, por Pitágoras: 4 menos 1 es 3.', { m: 1, t: 'altura √3' }, '$\\sqrt{2^2 - 1^2} = \\sqrt3$'],
          ['Ahora parte un cuadrado por su diagonal: quedan dos ángulos de 45°.', { m: 2, t: 'medio cuadrado' }],
          ['Los dos catetos son iguales, así que tan 45° = 1.', { m: 2, t: 'tan 45° = 1' }],
        ], 'Medio equilátero: sen 30° = 1/2. Medio cuadrado: tan 45° = 1.'),
        xpHaz('fichas', 'Un triángulo de 30°, 60° y 90° tiene hipotenusa 10. Pon el cateto opuesto a 30° y el seno de 30° en decimal.', { slots: fila('opuesto a 30°', 'sen 30°'), fichas: ['5', '0.5', '10', '0.3', '8.66'], meta: ['5', '0.5'], alto: 96, pista: 'Frente a 30° está la mitad de la hipotenusa.' }, 'La mitad de 10 es 5, y $\\tfrac{5}{10} = 0.5$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'A 30 m de un árbol, su punta se ve con un ángulo de 35° sobre el suelo. ¿Cuál expresión da la altura h del árbol?', { letras: ['A', 'B', 'C', 'D'], paras: [['h = 30 · tan 35°'], ['h = 30 · sen 35°'], ['h = 30 ÷ tan 35°'], ['h = tan 35° ÷ 30']] }, [
        ['Ubica lo que tienes desde el ángulo: los 30 m son el cateto adyacente.', {}],
        ['Lo que buscas, la altura, está enfrente del ángulo: es el opuesto.', {}],
        ['La razón que une opuesto y adyacente es la tangente.', {}, '$\\tan 35^\\circ = \\tfrac{h}{30}$'],
        ['B usa el seno, que necesita la hipotenusa, y no la tienes.', { luz: [1], nota: { 1: 'sin hipotenusa' } }],
        ['C y D despejan mal: si h entre 30 da la tangente, h queda multiplicando.', { luz: [2, 3], nota: { 2: 'despeje', 3: 'despeje' } }],
        ['A multiplica 30 por la tangente. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Nombra los lados desde el ángulo y escoge la razón que une lo que tienes con lo que buscas.'),
      xpHaz('hoja', 'Una cuerda de 50 m va de la punta de una antena al suelo y forma 60° con el suelo. Subraya la expresión de la altura h de la antena.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['h = 50 · tan 60°'], ['h = 50 · cos 60°'], ['h = 50 · sen 60°'], ['h = 50 ÷ sen 60°']], pista: 'La cuerda es la hipotenusa. ¿La altura está enfrente del ángulo o junto a él?' }, 'Opuesto entre hipotenusa es el seno: $h = 50 \\cdot \\operatorname{sen} 60^\\circ$.')],
    cierre: 'Dividir lados da razones que solo dependen del ángulo; nombra desde θ y escoge la que une lo que tienes.',
  });
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
//#archivo js/explora-icf-ma-7-pasos.js
// Preicfes · Matemáticas, mundo 7 «Ecuaciones en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero (qué es una letra, despejar, el plano), sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Balanza de dulces: una caja (x o su valor) con n dulces sueltos a la izquierda y r dulces a la derecha.
  const caja = (v, K) => {
    let h = K.l(20, 118, 320, 118, 'lm') + K.r(24, 62, 52, 52, 'fa', 6) + K.t(50, 96, v.k ? String(Math.round(v.k)) : 'x', 'b') + K.t(170, 98, '=', 'b');
    for (let i = 0; i < Math.round(v.n); i++) h += K.c(96 + i * 22, 102, 9, 'fg');
    for (let i = 0; i < Math.round(v.r); i++) h += K.c(196 + (i % 6) * 22, 102 - Math.floor(i / 6) * 22, 9, 'fg');
    return h + K.t(170, 150, v.t || '', 'ta');
  };
  // Piezas de álgebra: a cuadrados grandes (x²), b barras (x) y c cuadraditos (1).
  const piezas = (v, K) => {
    let h = '', x = 20;
    for (let i = 0; i < Math.round(v.a); i++) { h += K.r(x, 30, 48, 48, 'fa', 3); x += 54; }
    for (let i = 0; i < Math.round(v.b); i++) { h += K.r(x, 30, 14, 48, 'fg', 2); x += 20; }
    for (let i = 0; i < Math.round(v.c); i++) h += K.r(x + (i % 2) * 18, 30 + Math.floor(i / 2) * 18, 14, 14, 'ff', 2);
    return h + K.t(170, 118, v.t || '', 'ta');
  };
  // Plano de 0 a 10: la recta x + y = 10 (a), la recta y = x − 4 (b) y su cruce (p).
  const cruce = (v, K) => {
    const X = x => 40 + x * 24, Y = y => 170 - y * 15;
    let h = K.l(X(0), Y(0), X(10.5), Y(0), 'lm') + K.l(X(0), Y(0), X(0), Y(10.5), 'lm');
    for (let i = 2; i <= 10; i += 2) h += K.t(X(i), Y(0) + 15, i, 's tm') + K.t(X(0) - 6, Y(i) + 4, i, 's tm', 'end');
    h += K.f(v.a, K.l(X(0), Y(10), X(10), Y(0), 'la gr') + K.t(X(1.2), Y(9.6), 'suman 10', 's ta', 'start'));
    h += K.f(v.b, K.l(X(4), Y(0), X(10), Y(6), 'lg gr') + K.t(X(9.6), Y(6.4), 'uno 4 más', 's tg', 'end'));
    return h + K.f(v.p, K.l(X(7), Y(3), X(7), Y(0), 'lg d') + K.l(X(0), Y(3), X(7), Y(3), 'lg d') + K.c(X(7), Y(3), 7, 'fF') + K.t(318, 40, v.t || '', 'b', 'end'));
  };
  // Recta de −6 a 6 con dos puntos a y b y el letrero s arriba.
  const recta = (v, K) => {
    const X = n => 170 + n * 24;
    let h = K.l(20, 70, 320, 70, 'lm');
    for (let i = -6; i <= 6; i++) h += K.l(X(i), 65, X(i), 75, 'lm') + K.t(X(i), 94, String(i).replace('-', '−'), 's tm');
    return h + K.c(X(v.a), 70, 7, 'fa') + K.c(X(v.b), 70, 7, 'fg') + K.t(170, 34, v.s || '', 'ta');
  };

  xpAmplia('icf-ma-ecuaciones-1', {
    conecta: 'icf-ma-lineal-2',
    desde: [
      ['Desde cero: la letra y despejar',
        xpMira('dibujo', 'Antes de plantear: una **letra** es una caja cerrada que guarda un número que todavía no sabemos.', { dib: caja, v: { n: 0, r: 0, k: 0, t: '' }, alto: 160 }, [
          ['En «De la situación a la ecuación» viste que una letra representa lo que no se sabe.', {}],
          ['Aquí la letra es una caja cerrada: adentro hay dulces que no vemos.', { t: 'x = ¿cuántos hay?' }],
          ['La caja y tres dulces sueltos pesan como once dulces.', { n: 3, r: 11, t: 'x + 3 = 11' }],
          ['Despejar es dejar sola la caja: se quitan tres dulces de cada lado.', { n: 0, r: 8, t: 'x = 11 − 3' }],
          ['En la caja hay ocho. Se comprueba: ocho más tres da once.', { k: 8, t: 'x = 8' }, '$8 + 3 = 11$'],
        ], 'Despejar es dejar la letra sola haciendo lo mismo en los dos lados.'),
        xpHaz('fichas', 'Una caja y 5 dulces pesan como 12 dulces. Pon lo que se quita de cada lado y lo que hay en la caja.', { slots: fila('se quita', 'en la caja'), fichas: ['5', '7', '12', '17', '6'], meta: ['5', '7'], alto: 96, pista: 'Para dejar la caja sola, quita lo que la acompaña, en los dos lados.' }, '$x + 5 = 12$, así que $x = 7$.')],
    ],
    despues: [
      ['Más difícil: una vez o por persona',
        xpMira('fichas', 'El dato que más despista: lo que se paga **una vez** y lo que se paga **por persona**.', { slots: fila('una vez', 'por persona', 'personas'), fichas: ['120', '45x', '9'], alto: 96 }, [
          ['Un paseo cobra un bus de 120 mil para todos y 45 mil por persona.', {}],
          ['El bus se paga una sola vez: va suelto.', { pon: { 0: '120' } }],
          ['Lo de cada persona se repite: va con la letra.', { pon: { 1: '45x' } }, '$45x + 120 = 525$'],
          ['Pagaron 525 mil: se quita el bus y se reparte. Fueron nueve.', { pon: { 2: '9' } }, '$405 \\div 45 = 9$'],
          ['Error típico: repartir 525 entre 45 sin quitar el bus.', { marca: [2] }, '$525 \\div 45 \\approx 11.7$'],
        ], 'Lo que se repite va con la letra; lo que se paga una vez va suelto.'),
        xpHaz('fichas', 'Una cancha cobra 60 mil de alquiler y 8 mil por jugador. Pagaron 172 mil. Pon lo que pagaron los jugadores y cuántos eran.', { slots: fila('jugadores', 'cuántos'), fichas: ['112', '14', '21', '172', '8'], meta: ['112', '14'], alto: 96, pista: 'Primero quita lo que se paga una sola vez.' }, '$172 - 60 = 112$ y $112 \\div 8 = 14$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Lina pagó 30 mil por **un** estuche de 6 mil y varios cuadernos de 4 mil. ¿Qué ecuación da los cuadernos c?', { letras: ['A', 'B', 'C', 'D'], paras: [['4c + 6 = 30'], ['6c + 4 = 30'], ['10c = 30'], ['4c = 30 + 6']] }, [
        ['Antes de mirar opciones: qué se repite y qué se paga una vez.', {}],
        ['Esta pone el precio del estuche con la c: cambia los papeles.', { luz: [1], nota: { 1: 'papeles cambiados' } }],
        ['Esta cobra el estuche con cada cuaderno: confunde total y unidad.', { luz: [2], nota: { 2: 'estuche repetido' } }],
        ['Esta suma el estuche al total en vez de quitarlo.', { luz: [3], nota: { 3: 'signo al revés' } }],
        ['Cuatro por cada cuaderno y un estuche suelto: esta sí.', { luz: [0], nota: { 0: 'sirve' } }],
        ['Comprueba: con seis cuadernos, 24 más 6 da 30.', { luz: [0] }, '$4 \\cdot 6 + 6 = 30$'],
      ], 'Busca la ecuación que respeta qué se repite y qué va una vez, y compruébala.'),
      xpHaz('hoja', 'Un taller cobra 15 mil por revisar la moto y 9 mil por cada repuesto. La cuenta fue de 51 mil. Subraya la ecuación de los repuestos r.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['15r + 9 = 51'], ['9r = 51 + 15'], ['9r + 15 = 51'], ['24r = 51']], pista: 'La revisión se cobra una sola vez; ¿cuál número va con la r?' }, '$9r + 15 = 51$: fueron cuatro repuestos.')],
    cierre: 'Letra para lo que no sabes, lo repetido con la letra, lo de una vez suelto, y siempre comprobar.',
  });

  xpAmplia('icf-ma-ecuaciones-2', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: piezas, potencias y coeficientes',
        xpMira('dibujo', 'Una **expresión** es una cuenta con letras. Se puede armar con piezas, como un rompecabezas.', { dib: piezas, v: { a: 0, b: 0, c: 0, t: '' }, alto: 130 }, [
          ['En la lección anterior viste que la letra guarda un número que no sabemos.', {}],
          ['Una barra de largo x y ancho 1 vale x.', { b: 1, t: 'x' }],
          ['Un cuadrado de lado x vale x por x: se escribe x².', { a: 1, b: 0, t: 'x² = x · x' }],
          ['Cada cuadradito suelto vale uno: son los números.', { b: 1, c: 3, t: 'x² + x + 3' }],
          ['El número delante de la letra cuenta piezas iguales: es el coeficiente.', { b: 4, t: 'x² + 4x + 3' }],
        ], 'x² es x por x; el coeficiente cuenta cuántas piezas iguales hay.'),
        xpHaz('fichas', 'Hay 2 cuadrados grandes, 5 barras y 1 cuadradito. Pon el coeficiente de x² y el de x.', { slots: fila('de x²', 'de x'), fichas: ['2', '5', '1', '7', '10'], meta: ['2', '5'], alto: 96, pista: 'El coeficiente cuenta las piezas de una misma clase.' }, 'Se escribe $2x^2 + 5x + 1$.')],
    ],
    despues: [
      ['Más difícil: reemplazar con negativos',
        xpMira('hoja', 'Al **reemplazar** un negativo, el paréntesis decide el resultado. Mira $3x^2$ con $x = -2$.', { paras: [['3x² con x = −2'], ['= 3 · (−2)²'], ['= 3 · 4 = 12'], ['En cambio, (3x)² = (−6)² = 36']] }, [
          ['Reemplazar es poner el número donde está la letra, entre paréntesis.', { luz: [0] }],
          ['El paréntesis protege el signo: menos dos al cuadrado.', { luz: [1] }],
          ['Primero la potencia y después el producto: da doce.', { luz: [2] }, '$(-2)^2 = 4$'],
          ['Si el tres también está adentro del paréntesis, todo se eleva: treinta y seis.', { luz: [3] }],
          ['Sin paréntesis saldría menos doce: es el error típico.', { luz: [1], nota: { 1: 'cuida el signo' } }],
        ], 'Reemplaza con paréntesis y haz primero la potencia.'),
        xpHaz('fichas', 'Con $x = -3$, pon el valor de $2x^2$ y el de $5 - x$.', { slots: fila('2x²', '5 − x'), fichas: ['18', '8', '−18', '2', '36'], meta: ['18', '8'], alto: 96, pista: 'Pon −3 entre paréntesis; menos por menos da más.' }, '$2 \\cdot 9 = 18$ y $5 - (-3) = 8$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un rectángulo mide x de ancho; el largo es el doble del ancho más 4. ¿Qué expresión da su **perímetro**?', { letras: ['A', 'B', 'C', 'D'], paras: [['6x + 8'], ['3x + 4'], ['2x² + 4x'], ['4x + 8']] }, [
        ['Primero se escribe el largo con la letra: dos x más cuatro.', {}, '$2x + 4$'],
        ['Esta suma un ancho y un largo: es medio perímetro.', { luz: [1], nota: { 1: 'medio borde' } }],
        ['Esta multiplica ancho por largo: es el área, no el borde.', { luz: [2], nota: { 2: 'es el área' } }],
        ['Esta cuenta solo los dos largos y olvida los anchos.', { luz: [3], nota: { 3: 'faltan anchos' } }],
        ['Dos anchos y dos largos dan seis x más ocho: sirve.', { luz: [0], nota: { 0: 'sirve' } }, '$2x + 2(2x + 4)$'],
        ['Prueba con x = 1: lados 1 y 6, borde 14.', { luz: [0] }, '$6 + 8 = 14$'],
      ], 'Escribe cada parte con la letra y prueba con un número pequeño.'),
      xpHaz('hoja', 'Una huerta mide x de ancho y su largo es el triple del ancho menos 2. Subraya la expresión de su **área**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['8x − 4'], ['3x² − 2x'], ['4x − 2'], ['3x − 2x²']], pista: 'El área multiplica ancho por largo; el perímetro los suma.' }, '$x(3x - 2) = 3x^2 - 2x$.')],
    cierre: 'Las piezas iguales se cuentan, el paréntesis cuida el signo y cada expresión dice qué mide.',
  });

  xpAmplia('icf-ma-ecuaciones-3', {
    conecta: 'icf-ma-lineal-3',
    desde: [
      ['Desde cero: dos pistas a la vez',
        xpMira('dibujo', 'Un **sistema** son dos pistas que deben cumplirse al mismo tiempo. Cada pista es una recta.', { dib: cruce, v: { a: 0, b: 0, p: 0, t: '' }, alto: 190 }, [
          ['En «Comparar planes» viste que dos rectas se cruzan donde los planes cuestan igual.', {}],
          ['Pista uno: dos números suman diez. Hay muchas parejas.', { a: 1 }],
          ['Pista dos: el primero tiene cuatro más. También hay muchas.', { b: 1 }],
          ['Solo una pareja cumple las dos: donde se cruzan.', { p: 1, t: '(7, 3)' }],
          ['Siete más tres da diez y siete menos tres da cuatro.', {}, '$7 + 3 = 10, \\; 7 - 3 = 4$'],
        ], 'La solución de un sistema cumple todas las pistas a la vez.'),
        xpHaz('fichas', 'Dos números suman 12 y el primero es el doble del segundo. Pon la pareja que cumple las dos pistas.', { slots: fila('primero', 'segundo'), fichas: ['8', '4', '6', '10', '2'], meta: ['8', '4'], alto: 96, pista: 'Prueba parejas que sumen 12 y mira en cuál uno es el doble del otro.' }, '$8 + 4 = 12$ y 8 es el doble de 4.')],
    ],
    despues: [
      ['Más difícil: cuántas y cuánto dinero',
        xpMira('hoja', 'En un concierto se vendieron 100 boletas, generales de 20 mil y VIP de 50 mil, por 2 600 mil. ¿Cuántas de cada una?', { paras: [['g + v = 100 (cuenta boletas)'], ['20g + 50v = 2 600 (cuenta dinero)'], ['Todas generales: 2 000; faltan 600'], ['Cada VIP suma 30 más: 600 ÷ 30 = 20']] }, [
          ['El examen da dos totales: cuántas cosas y cuánto dinero.', {}],
          ['Las boletas, sin importar el precio, suman cien.', { luz: [0] }],
          ['El dinero usa el precio de cada clase.', { luz: [1] }],
          ['Si todas fueran generales serían dos mil: faltan seiscientos.', { luz: [2] }, '$2\\,600 - 2\\,000 = 600$'],
          ['Cada VIP suma treinta más: veinte VIP y ochenta generales.', { luz: [3] }, '$20 \\cdot 50 + 80 \\cdot 20 = 2\\,600$'],
          ['Trampa: mezclar boletas con pesos en la misma ecuación.', { nota: { 0: 'boletas', 1: 'pesos' } }],
        ], 'Una ecuación cuenta las cosas y la otra cuenta el dinero.'),
        xpHaz('fichas', 'Una papelería vendió 40 cuadernos, unos de 8 mil y otros de 4 mil, por 248 mil. Pon cuántos de cada precio vendió.', { slots: fila('de 8 mil', 'de 4 mil'), fichas: ['22', '18', '20', '31', '9'], meta: ['22', '18'], alto: 96, pista: 'Supón que todos son de 4 mil y mira cuánto falta; cada uno de 8 suma 4 más.' }, '$40 \\cdot 4 = 160$; faltan 88 y $88 \\div 4 = 22$ de 8 mil.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos arepas y tres gaseosas valen 13 mil; una arepa y dos gaseosas, 8 mil. Con a el precio de la arepa y g el de la gaseosa, ¿qué sistema sirve?', { letras: ['A', 'B', 'C', 'D'], paras: [['2a + 3g = 13 y a + 2g = 8'], ['2a + 3a = 13 y g + 2g = 8'], ['5(a + g) = 13 y 3(a + g) = 8'], ['2a + 3g = 8 y a + 2g = 13']] }, [
        ['Cada compra da una ecuación: cantidad por precio, igual a su total.', {}],
        ['Esta cruza los totales: cada compra quedó con el de la otra.', { luz: [3], nota: { 3: 'totales cruzados' } }],
        ['Esta junta arepas con arepas y gaseosas con gaseosas: mezcla.', { luz: [1], nota: { 1: 'mezcla' } }],
        ['Esta suma las cantidades como si todo costara lo mismo.', { luz: [2], nota: { 2: 'un solo precio' } }],
        ['Esta respeta cada compra con su total: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
        ['Comprueba con a = 2 y g = 3: dan 13 y 8.', { luz: [0] }, '$4 + 9 = 13, \\; 2 + 6 = 8$'],
      ], 'Una ecuación por compra, cada una con su propio total.'),
      xpHaz('hoja', 'Se compraron 9 cosas entre manillas (m) de 2 mil y llaveros (l) de 1 mil, por 14 mil. Subraya el sistema que sirve.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['m + l = 14 y 2m + l = 9'], ['m + l = 9 y 2m + l = 14'], ['m + 2l = 14 y m + l = 9'], ['3(m + l) = 14 y m + l = 9']], pista: 'Una ecuación cuenta las cosas y la otra el dinero, cada una con su precio.' }, 'Con 5 manillas y 4 llaveros: $10 + 4 = 14$.')],
    cierre: 'Dos pistas a la vez: una ecuación por cada total y la pareja que cumple las dos.',
  });

  xpAmplia('icf-ma-ecuaciones-4', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: mayor y menor',
        xpMira('dibujo', 'Una **desigualdad** no iguala: compara. Dice cuál número es mayor, y eso se ve en la recta.', { dib: recta, v: { a: 3, b: 5, s: '' }, alto: 112 }, [
          ['En «Plantear ecuaciones» un solo valor equilibraba la balanza.', {}],
          ['En la recta, el número mayor siempre queda a la derecha.', { s: 'el 5 está a la derecha del 3' }],
          ['Tres es menor que cinco: el pico del signo apunta al menor.', { s: '3 < 5' }],
          ['Con negativos, menos cinco queda a la izquierda de menos tres.', { a: -5, b: -3, s: '−5 < −3' }],
          ['Por eso menos cinco es menor, aunque el cinco parezca grande.', {}],
        ], 'El mayor queda a la derecha; el pico del signo apunta al menor.'),
        xpHaz('fichas', 'Pon el signo que va entre cada pareja de números.', { slots: fila('−2 ? 1', '0.5 ? 0.25', '−7 ? −9'), fichas: ['<', '>', '>', '='], meta: ['<', '>', '>'], alto: 96, pista: 'Imagina la recta: el que queda más a la derecha es el mayor.' }, '$-2 < 1$, $0.5 > 0.25$ y $-7 > -9$.')],
    ],
    despues: [
      ['Más difícil: redondear hacia arriba',
        xpMira('fichas', 'Con «como máximo» se redondea hacia abajo. Con «**al menos**», hacia **arriba**.', { slots: fila('división', 'al menos'), fichas: ['12.5', '13'], alto: 96 }, [
          ['Un vendedor gana 12 mil por venta y quiere al menos 150 mil.', {}, '$12v \\ge 150$'],
          ['Se divide: da doce y medio.', { pon: { 0: '12.5' } }, '$150 \\div 12 = 12.5$'],
          ['Doce ventas dan 144 mil: no alcanzan.', {}, '$12 \\cdot 12 = 144$'],
          ['Necesita trece ventas como mínimo.', { pon: { 1: '13' } }, '$12 \\cdot 13 = 156$'],
          ['Redondear a doce es la trampa más común.', { marca: [1] }],
        ], '«Al menos» redondea hacia arriba: con menos no alcanza.'),
        xpHaz('fichas', 'Un bus lleva 45 personas. Van 200 al paseo. Pon el resultado de la división y los buses que hacen falta como mínimo.', { slots: fila('división', 'buses'), fichas: ['4.44', '5', '4', '45', '6'], meta: ['4.44', '5'], alto: 96, pista: 'Con cuatro buses, ¿caben todos?' }, '$200 \\div 45 \\approx 4.44$: con 4 quedan 20 por fuera, hacen falta 5.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Para subir a un juego hay que medir **al menos** 120 cm y **menos de** 190 cm. ¿Qué intervalo muestra quién puede subir?', { letras: ['A', 'B', 'C', 'D'], paras: [['120 ≤ h < 190'], ['120 < h ≤ 190'], ['120 ≤ h ≤ 190'], ['h < 120 o h ≥ 190']] }, [
        ['Se traduce cada frase a un signo, borde por borde.', {}],
        ['«Al menos 120» deja entrar al 120. «Menos de 190» no deja entrar al 190.', {}],
        ['Esta cambia los dos bordes: deja fuera a quien mide 120 justos.', { luz: [1], nota: { 1: 'bordes cambiados' } }],
        ['Esta deja subir a quien mide 190 justos.', { luz: [2], nota: { 2: 'sobra el 190' } }],
        ['Esta muestra a los que no pueden subir.', { luz: [3], nota: { 3: 'lo contrario' } }],
        ['Esta respeta los dos bordes: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Decide cada borde por separado: ¿entra o no entra?'),
      xpHaz('hoja', 'Una tarifa es para quienes tienen **más de** 12 años y **como máximo** 17. Subraya el intervalo de la edad e.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['12 ≤ e ≤ 17'], ['12 < e ≤ 17'], ['12 < e < 17'], ['e > 17']], pista: 'Lee cada borde aparte: ¿entra el 12? ¿entra el 17?' }, 'El 12 no entra y el 17 sí.')],
    cierre: 'El mayor va a la derecha, un negativo voltea el signo y cada palabra decide si el borde entra.',
  });
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
//#archivo js/explora-icf-ma-8-pasos.js
// Preicfes · Matemáticas, mundo 8 «Validar Procedimientos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es una
// afirmación y una razón hasta los «Sí, porque…» del examen, los contraejemplos y el dato que falta.
{
  // Ocho personas; las primeras g llevan gafas; x marca a la que rompe el «todos».
  const salon = (v, K) => {
    let h = '';
    for (let i = 0; i < 8; i++) {
      const x = 40 + i * 37;
      h += K.c(x, 80, 14, 'fc');
      if (i < Math.round(v.g)) h += K.c(x - 6, 78, 5, 'fa') + K.c(x + 6, 78, 5, 'fa') + K.l(x - 1, 78, x + 1, 78, 'lm');
      if (v.x && i === 7) h += K.arc(x, 80, 20, 0, 360, 'lo gr');
    }
    return h + K.t(170, 134, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-argumenta-1', {
    conecta: 'icf-ma-ecuaciones-1',
    desde: [
      ['Desde cero: afirmación y razón',
        xpMira('hoja', 'Antes de validar: una **afirmación** es una frase que puede ser verdadera o falsa, y una **razón** dice por qué.', { paras: [['Afirmación: 15 es múltiplo de 5.'], ['Razón: 15 = 5 · 3.'], ['Afirmación: todo número par termina en 2.'], ['Revisión: 14 es par y termina en 4.']] }, [
          ['En «Plantear ecuaciones» comprobaste un valor llevándolo al enunciado.', {}],
          ['Una afirmación se puede revisar: es verdadera o es falsa.', { luz: [0], nota: { 0: 'afirmación' } }],
          ['La razón dice por qué: cinco por tres da quince.', { luz: [1], nota: { 1: 'razón' } }],
          ['Esta otra suena bien, pero hay que revisarla.', { luz: [2] }],
          ['El 14 es par y termina en cuatro: la afirmación es falsa.', { luz: [3], tacha: [2] }],
          ['Razonar es mostrar la razón, no solo decir la respuesta.', {}],
        ], 'Una afirmación se revisa con una razón o con un caso.'),
        xpHaz('hoja', 'Subraya la afirmación **verdadera**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Todo número que termina en 0 es par.'], ['Todo número de dos cifras es mayor que 50.'], ['Todo múltiplo de 3 es impar.']], pista: 'Prueba cada frase con dos o tres números.' }, 'Terminar en 0 es ser múltiplo de 10, y 10 es par.')],
    ],
    despues: [
      ['Más difícil: la razón que suena bien',
        xpMira('hoja', 'Un razonamiento puede **sonar** lógico y tener la conclusión falsa. Camila dice:', { paras: [['«Subió 20 % y bajó 20 %: quedó igual.»'], ['«Porque +20 y −20 se anulan.»'], ['Prueba: 100 sube a 120.'], ['Luego 120 baja a 96.']] }, [
          ['La conclusión: el precio quedó igual.', { luz: [0] }],
          ['La razón parece cierta: más veinte y menos veinte se anulan.', { luz: [1] }],
          ['Se prueba con un precio: cien sube a ciento veinte.', { luz: [2] }, '$100 \\cdot 1.2 = 120$'],
          ['El 20 % que baja se saca de 120, no de 100.', { luz: [3] }, '$120 \\cdot 0.8 = 96$'],
          ['Quedó en 96: la conclusión es falsa.', { tacha: [0], nota: { 0: 'falsa' } }],
          ['Prueba con un número antes de creerle a la razón.', {}],
        ], 'Antes de aceptar una razón, pruébala con un número.'),
        xpHaz('hoja', 'Dani: «Si duplico el lado de un cuadrado, su área se duplica». Subraya lo que sirve para revisarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Lado 3: área 9. Lado 6: área 36.'], ['Un cuadrado tiene 4 lados iguales.'], ['El doble de 3 es 6.']], pista: 'Busca la que calcula el área antes y después.' }, 'De 9 pasa a 36: se multiplica por 4, no por 2.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tienda: «3 camisetas de 20 mil por solo 50 mil: ahorras más del 15 %». ¿Es cierto?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque se ahorran 10 de 60, más del 15 %.'], ['Sí, porque 50 es menos que 60.'], ['No, porque el descuento es de 10 mil, no de 15.'], ['Sí, porque 10 es el 20 % de 50.']] }, [
        ['Primero tu cuenta: sin oferta son 60 y se ahorran 10.', {}, '$10 \\div 60 \\approx 16.7\\,\\%$'],
        ['Pasa del 15 %: se descartan las que dicen «No».', { tacha: [2], nota: { 2: 'dice No' } }],
        ['Esta es cierta, pero no prueba que pase del 15 %.', { luz: [1], nota: { 1: 'no lo prueba' } }],
        ['Esta saca el porcentaje sobre 50: la base es el precio de antes.', { luz: [3], nota: { 3: 'base mala' } }],
        ['Esta compara lo ahorrado con lo que costaba: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Decide Sí o No con tu cuenta y luego elige el «porque» que lo demuestra.'),
      xpHaz('hoja', 'Andrés: «Si gano 2 de cada 5 partidos, gano más de la mitad». Subraya la respuesta correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 2 de 5 es el 40 %.'], ['No, porque 2 de 5 es el 40 %, menos de la mitad.'], ['No, porque 5 es impar.'], ['Sí, porque gana dos partidos.']], pista: 'Decide primero Sí o No con tu cuenta; después mira si el «porque» lo demuestra.' }, '$2 \\div 5 = 0.4$, que es menos que 0.5.')],
    cierre: 'Haz tu propia cuenta, decide Sí o No y elige la razón que de verdad lo demuestra.',
  });

  xpAmplia('icf-ma-argumenta-2', {
    conecta: 'icf-ma-argumenta-1',
    desde: [
      ['Desde cero: todos, algunos y ninguno',
        xpMira('dibujo', 'Tres palabras mandan en una afirmación: **todos**, **algunos** y **ninguno**. Mira este salón de ocho.', { dib: salon, v: { g: 0, x: 0, t: '' }, alto: 150 }, [
          ['En la lección anterior viste que una afirmación puede ser verdadera o falsa.', {}],
          ['Si los ocho usan gafas, «todos usan gafas» es verdad.', { g: 8, t: 'todos' }],
          ['Si uno no usa, ya no son todos: esa persona es el contraejemplo.', { g: 7, x: 1, t: 'uno no: ya no son todos' }],
          ['«Algunos usan gafas» se cumple con que haya uno solo.', { g: 1, x: 0, t: 'algunos' }],
          ['«Ninguno usa gafas» cae si aparece uno con gafas.', { t: 'ninguno: falso' }],
        ], 'Un «todos» cae con un solo caso en contra: el contraejemplo.'),
        xpHaz('hoja', '«Todos los meses tienen 30 días o más». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Enero'], ['Febrero'], ['Abril']], pista: 'Busca un mes que no cumpla la frase.' }, 'Febrero tiene 28 o 29 días.')],
    ],
    despues: [
      ['Más difícil: negativos, ceros y decimales',
        xpMira('hoja', 'Los contraejemplos difíciles se esconden en los **negativos**, el **cero** y los **decimales**.', { paras: [['Si a > b, entonces a² > b².'], ['a = 5, b = 2: 25 > 4'], ['a = 1, b = −3: 1 < 9'], ['Arreglada: si a y b son positivos.']] }, [
          ['La frase compara dos números y sus cuadrados.', { luz: [0] }],
          ['Con cinco y dos, la frase funciona.', { luz: [1], nota: { 1: 'cumple' } }],
          ['Con uno y menos tres: uno es mayor, pero su cuadrado es menor.', { luz: [2], nota: { 2: 'la tumba' } }],
          ['Un solo caso así basta para decir que es falsa.', { tacha: [0] }],
          ['Con positivos sí es cierta: así se arregla.', { luz: [3] }],
        ], 'Si los positivos no la tumban, prueba con negativos, cero o decimales.'),
        xpHaz('hoja', '«Al dividir un número entre 2, el resultado es menor que el número». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['10'], ['−4'], ['3']], pista: 'Prueba con un número negativo.' }, '$-4 \\div 2 = -2$, y $-2$ es mayor que $-4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Afirmación: «La suma de dos números primos siempre es par». ¿Qué pareja muestra que es **falsa**?', { letras: ['A', 'B', 'C', 'D'], paras: [['3 y 5: suman 8'], ['2 y 7: suman 9'], ['4 y 9: suman 13'], ['7 y 7: suman 14']] }, [
        ['Un contraejemplo cumple la condición y falla la conclusión.', {}],
        ['Estos son primos y suman par: apoyan la frase, no la tumban.', { luz: [0], nota: { 0: 'cumple' } }],
        ['Esta tampoco: catorce es par.', { luz: [3], nota: { 3: 'cumple' } }],
        ['Suma impar, pero cuatro y nueve no son primos: no cuenta.', { luz: [2], nota: { 2: 'no son primos' } }],
        ['Dos y siete son primos y suman nueve: la tumba.', { luz: [1], nota: { 1: 'contraejemplo' } }],
        ['El dos, el único primo par, suele ser la clave.', { luz: [1] }],
      ], 'El contraejemplo debe cumplir la condición: si no, no cuenta.'),
      xpHaz('hoja', 'Afirmación: «Todo número que termina en 4 es múltiplo de 4». Subraya el contraejemplo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['24'], ['44'], ['14'], ['40']], pista: 'Debe terminar en 4 y no dividirse exacto entre 4.' }, '14 termina en 4 y $14 \\div 4 = 3.5$.')],
    cierre: 'Un contraejemplo cumple la condición y falla la conclusión; búscalo en negativos, el cero y el 2.',
  });

  xpAmplia('icf-ma-argumenta-3', {
    conecta: 'icf-ma-ecuaciones-3',
    desde: [
      ['Desde cero: pregunta y datos',
        xpMira('hoja', 'Todo problema tiene una **pregunta** (lo que se quiere saber) y unos **datos** (lo que ya se sabe).', { paras: [['Pregunta: ¿cuánto pagó Sara?'], ['Dato: compró 4 cuadernos.'], ['Dato: cada cuaderno vale 3 mil.'], ['4 · 3 = 12 mil']] }, [
          ['En «Sistemas» viste que con dos cosas desconocidas hacen falta dos pistas.', {}],
          ['La pregunta es lo que se quiere saber.', { luz: [0], nota: { 0: 'pregunta' } }],
          ['Los datos son lo que ya se sabe.', { luz: [1], nota: { 1: 'dato' } }],
          ['Con cuántos cuadernos no basta: falta el precio.', { luz: [1] }],
          ['Con los dos datos sale una sola respuesta: doce mil.', { luz: [2, 3], nota: { 2: 'dato' } }],
        ], 'La información alcanza cuando deja una sola respuesta.'),
        xpHaz('hoja', 'Se quiere el alto de una caja cuyo volumen es 60. Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El color de la caja'], ['El área de la base'], ['El peso de la caja']], pista: 'El volumen es el área de la base por el alto.' }, 'Con el área de la base: alto = 60 ÷ base.')],
    ],
    despues: [
      ['Más difícil: el dato escondido',
        xpMira('hoja', 'A veces el dato no aparece escrito, pero **se puede sacar** de otros. ¿Cuál fue la cuarta nota de Ana?', { paras: [['Promedio de sus 4 notas: 3.5'], ['Tres notas: 3, 4 y 3'], ['Total: 3.5 · 4 = 14'], ['Cuarta: 14 − 10 = 4']] }, [
          ['Parece que falta la cuarta nota.', { luz: [1] }],
          ['Pero el promedio esconde el total de puntos.', { luz: [0, 2] }, '$3.5 \\cdot 4 = 14$'],
          ['Las tres notas conocidas suman diez.', { luz: [1] }, '$3 + 4 + 3 = 10$'],
          ['La que falta es cuatro: la información sí alcanza.', { luz: [3], nota: { 3: 'alcanza' } }],
          ['Antes de decir «falta un dato», mira si se puede calcular.', {}],
        ], 'Un promedio por la cantidad de datos da el total.'),
        xpHaz('hoja', 'Un bus salió a las 7:10 y llegó a las 9:40, siempre a 60 km/h. Subraya lo que **sí** se puede saber.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La distancia recorrida'], ['El número de pasajeros'], ['El precio del pasaje']], pista: 'Del reloj sale el tiempo; con la velocidad, ¿qué más sale?' }, 'Viajó 2.5 h: $2.5 \\cdot 60 = 150$ km.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En grado 11 hay 120 estudiantes y el 30 % de **todo** el colegio usa bus. ¿Qué dato falta para saber cuántos de 11 usan bus?', { letras: ['A', 'B', 'C', 'D'], paras: [['El total de estudiantes del colegio.'], ['El porcentaje de los de 11 que usa bus.'], ['Cuántos buses tiene el colegio.'], ['Ninguno: son 36.']] }, [
        ['Primero, qué se pregunta: los de once que usan bus.', {}],
        ['El 30 % es de todo el colegio, no de once.', {}],
        ['Esta aplica ese 30 % a once: supone lo que no se sabe.', { luz: [3], nota: { 3: 'supone' } }],
        ['Con el total del colegio solo se sabe cuántos usan bus en todo.', { luz: [0], nota: { 0: 'no basta' } }],
        ['Los buses no dicen quién los usa.', { luz: [2], nota: { 2: 'sobra' } }],
        ['El porcentaje propio de once sí da una sola respuesta.', { luz: [1], nota: { 1: 'falta este' } }],
      ], 'El dato que falta es el que deja una sola respuesta a lo que se pregunta.'),
      xpHaz('hoja', 'Se quiere el área de un terreno triangular y se sabe que su base mide 40 m. Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El perímetro del terreno.'], ['La altura sobre esa base.'], ['El precio del metro cuadrado.'], ['Ninguno: el área es 20 m².']], pista: 'El área de un triángulo es base por altura entre dos.' }, 'Con la altura h: área $= 40 \\cdot h \\div 2$.')],
    cierre: 'Lee la pregunta, saca lo que se puede calcular y pide solo el dato que deja una respuesta.',
  });
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
//#archivo js/explora-icf-ma-9-pasos.js
// Preicfes · Matemáticas, mundo 9 «Dinero y Créditos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es el capital,
// la tasa y un multiplicador hasta las tablas de saldo y los pasos con error que pide el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Capital (barra larga), interés i (pedazo que se suma) y el total s.
  const plata = (v, K) => K.r(40, 60, 240, 40, 'fa', 3) + K.t(160, 86, 'capital', 'b') +
    K.f(v.i, K.r(284, 60, 24, 40, 'fg', 3) + K.t(296, 50, 'interés', 's tg')) +
    K.f(v.s, K.cota(40, 118, 308, 118, 'capital + interés')) + K.t(170, 30, v.t || '', 'ta');
  // Precio: el 100 % es la barra punteada; q es el porcentaje que se paga (más de 100 si hay impuesto).
  const precio = (v, K) => {
    const q = v.q, w = Math.min(q, 100) * 2.2;
    return K.r(30, 60, 220, 40, 'fn', 3) + K.r(30, 60, w, 40, 'fa', 3) + K.f(q > 100.5 ? 1 : 0, K.r(252, 60, (q - 100) * 2.2, 40, 'fg', 3)) +
      K.t(30 + w / 2, 86, `${Math.round(q)} %`, 'b') + K.t(170, 132, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-finanzas-1', {
    conecta: 'icf-ma-proporcion-2',
    desde: [
      ['Desde cero: capital, interés y tasa',
        xpMira('dibujo', 'Antes de las fórmulas: el **interés** es lo que se paga por usar plata ajena, y es un **porcentaje** de esa plata.', { dib: plata, v: { i: 0, s: 0, t: '' }, alto: 150 }, [
          ['En «Porcentajes y cambios» viste que el 10 % es la décima parte.', {}],
          ['El capital es la plata que se presta o se ahorra.', { t: 'capital: 200 mil' }],
          ['El interés es lo que se paga por usar esa plata.', { i: 1, t: 'interés' }],
          ['La tasa dice qué porcentaje del capital es el interés.', { t: 'tasa: 10 % al año' }],
          ['El 10 % de 200 mil son 20 mil en un año.', { t: '10 % de 200 = 20' }, '$0.10 \\cdot 200 = 20$'],
          ['Al final se devuelve el capital más el interés.', { s: 1, t: '200 + 20 = 220 mil' }],
        ], 'Interés = tasa por capital; al final se paga capital más interés.'),
        xpHaz('fichas', 'Se ahorran 300 mil al 5 % anual. Pon el interés de un año y lo que hay al final de ese año.', { slots: fila('interés', 'al final'), fichas: ['15', '315', '5', '305', '350'], meta: ['15', '315'], alto: 96, pista: 'El 1 % de 300 es 3; el 5 % son cinco veces eso.' }, '$0.05 \\cdot 300 = 15$ y $300 + 15 = 315$.')],
    ],
    despues: [
      ['Más difícil: ¿cuándo se duplica?',
        xpMira('fichas', 'Una pregunta típica: cuánto tarda la plata en **duplicarse**, con simple y con compuesto, al 10 % anual.', { slots: fila('simple', 'compuesto'), fichas: ['10 años', '8 años'], alto: 96 }, [
          ['Al 10 % simple, cada año suma la décima parte del inicio.', {}],
          ['Para sumar otro capital completo hacen falta diez años.', { pon: { 0: '10 años' } }, '$10 \\cdot 10\\,\\% = 100\\,\\%$'],
          ['En compuesto, se multiplica por 1.1 año tras año.', {}, '$1.1^7 \\approx 1.95$'],
          ['En el año ocho ya pasa del doble.', { pon: { 1: '8 años' } }, '$1.1^8 \\approx 2.14$'],
          ['El compuesto llega antes porque el interés también gana interés.', { marca: [1] }],
        ], 'El compuesto se duplica antes: el interés gana interés.'),
        xpHaz('fichas', 'Al 15 % anual, pon el primer año en que el capital se duplica con interés simple y con compuesto.', { slots: fila('simple', 'compuesto'), fichas: ['7', '5', '6', '4', '15'], meta: ['7', '5'], alto: 96, pista: 'En simple cuenta cuántos 15 % hacen 100 %; en compuesto multiplica por 1.15 hasta pasar de 2.' }, 'Simple: 7 años (105 %). Compuesto: $1.15^5 \\approx 2.01$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se ahorran 100 mil al 10 % anual **compuesto**. ¿Qué tabla muestra el saldo, en miles, en los años 0, 1, 2 y 3?', { letras: ['A', 'B', 'C', 'D'], paras: [['100, 110, 121, 133.1'], ['100, 110, 120, 130'], ['110, 121, 133.1, 146.41'], ['0, 10, 21, 33.1']] }, [
        ['Mira primero el punto de partida: en el año cero hay cien.', {}],
        ['Esta empieza en 110: tiene la forma buena y el arranque malo.', { luz: [2], nota: { 2: 'arranque malo' } }],
        ['Esta muestra solo el interés ganado, no el saldo.', { luz: [3], nota: { 3: 'solo interés' } }],
        ['Esta sube siempre diez: es interés simple.', { luz: [1], nota: { 1: 'simple' } }],
        ['Esta multiplica por 1.1 desde cien: sirve.', { luz: [0], nota: { 0: 'sirve' } }, '$121 \\cdot 1.1 = 133.1$'],
      ], 'Revisa el punto de partida y si cada paso suma o multiplica.'),
      xpHaz('hoja', 'Una deuda de 50 mil crece al 20 % mensual compuesto. Subraya la tabla de los meses 0, 1, 2 y 3, en miles.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['50, 60, 70, 80'], ['60, 72, 86.4, 103.68'], ['50, 60, 72, 86.4'], ['0, 10, 22, 36.4']], pista: 'Revisa el mes 0 y si cada paso suma lo mismo o multiplica por lo mismo.' }, '$50 \\cdot 1.2 = 60$, $60 \\cdot 1.2 = 72$ y $72 \\cdot 1.2 = 86.4$.')],
    cierre: 'El interés es un porcentaje del dinero: simple suma lo mismo, compuesto multiplica; revisa siempre el arranque.',
  });

  xpAmplia('icf-ma-finanzas-2', {
    conecta: 'icf-ma-finanzas-1',
    desde: [
      ['Desde cero: el multiplicador',
        xpMira('dibujo', 'Un descuento quita un pedazo del precio y un impuesto lo agrega. Todo se resume en un **multiplicador**.', { dib: precio, v: { q: 100, t: '' }, alto: 145 }, [
          ['En la lección anterior viste que el interés es un porcentaje que se suma.', {}],
          ['El precio completo es el cien por ciento.', { t: 'precio completo' }],
          ['Un descuento del 30 % quita un pedazo: queda el 70 %.', { q: 70, t: 'descuento del 30 %' }, '$1 - 0.30 = 0.70$'],
          ['Por eso lo que se paga es el precio por 0.7.', { t: 'se multiplica por 0.7' }],
          ['Un impuesto del 19 % agrega un pedazo: queda el 119 %.', { q: 119, t: 'impuesto del 19 %' }],
          ['Ese precio es el de antes por 1.19.', { t: 'se multiplica por 1.19' }, '$1 + 0.19 = 1.19$'],
        ], 'Descuento: 1 menos el porcentaje. Aumento: 1 más el porcentaje.'),
        xpHaz('fichas', 'Pon el multiplicador de un descuento del 15 % y el de un aumento del 8 %.', { slots: fila('descuento', 'aumento'), fichas: ['0.85', '1.08', '0.15', '1.8', '0.92'], meta: ['0.85', '1.08'], alto: 96, pista: 'Al 1 réstale o súmale el porcentaje escrito como decimal.' }, '$1 - 0.15 = 0.85$ y $1 + 0.08 = 1.08$.')],
    ],
    despues: [
      ['Más difícil: descuento e IVA juntos',
        xpMira('fichas', 'Un televisor de 1 000 mil tiene 10 % de descuento y paga IVA del 19 %. ¿Importa el orden?', { slots: fila('primero IVA', 'primero descuento'), fichas: ['1 071', '1 071'], alto: 96 }, [
          ['Con el IVA primero son 1 190; con el descuento después, 1 071.', { pon: { 0: '1 071' } }, '$1\\,000 \\cdot 1.19 \\cdot 0.9$'],
          ['Con el descuento primero son 900; con el IVA después, 1 071.', { pon: { 1: '1 071' } }, '$1\\,000 \\cdot 0.9 \\cdot 1.19$'],
          ['Da lo mismo: son multiplicaciones y el orden no importa.', { marca: [0, 1] }],
          ['Trampa: restar 10 y sumar 19 como si fuera un 9 % más.', {}, '$1\\,000 \\cdot 1.09 = 1\\,090$'],
          ['El cambio real es por 1.071: un 7.1 % más.', {}, '$1.19 \\cdot 0.9 = 1.071$'],
        ], 'Los porcentajes seguidos se multiplican, no se suman.'),
        xpHaz('fichas', 'Unos tenis de 200 mil tienen 25 % de descuento y luego IVA del 19 %. Pon el precio con descuento y el precio final.', { slots: fila('con descuento', 'final'), fichas: ['150', '178.5', '188', '169', '238'], meta: ['150', '178.5'], alto: 96, pista: 'Multiplica por 0.75 y después por 1.19.' }, '$200 \\cdot 0.75 = 150$ y $150 \\cdot 1.19 = 178.5$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un celular cuesta 595 mil **con** IVA del 19 %. Para hallar el precio sin IVA, Laura hizo estos pasos. ¿En cuál está el error?', { letras: ['A', 'B', 'C', 'D'], paras: [['Paso 1: el IVA es del 19 %.'], ['Paso 2: el 19 % de 595 es 113.05.'], ['Paso 3: 595 − 113.05 = 481.95.'], ['Paso 4: sin IVA cuesta 481.95.']] }, [
        ['Haz tu cuenta primero: sin IVA es 595 entre 1.19.', {}, '$595 \\div 1.19 = 500$'],
        ['El primer paso es cierto: el IVA es del 19 %.', { luz: [0], nota: { 0: 'bien' } }],
        ['Aquí saca el 19 % de 595, que ya trae IVA: la base está mal.', { luz: [1], nota: { 1: 'error' } }],
        ['Los pasos tres y cuatro hacen bien su cuenta, pero arrastran el error.', { luz: [2, 3], nota: { 2: 'arrastra', 3: 'arrastra' } }],
        ['El error está donde nace, no donde se nota.', { luz: [1] }],
      ], 'Busca el primer paso que falla: los siguientes solo lo arrastran.'),
      xpHaz('hoja', 'Se deben 500 mil al 2 % mensual y se paga una cuota de 80 mil. Subraya el paso **equivocado**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Interés del mes: 2 % de 500 = 10.'], ['Abono a la deuda: 80 − 10 = 70.'], ['Deuda nueva: 500 − 80 = 420.'], ['El mes siguiente el interés será menor.']], pista: 'Solo el abono baja la deuda; el interés no.' }, 'La deuda nueva es $500 - 70 = 430$.')],
    cierre: 'Cada porcentaje es un multiplicador; para quitar el IVA se divide, y solo el abono baja la deuda.',
  });
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
//#archivo js/explora-icf-ma-10-pasos.js
// Preicfes · Matemáticas, mundo 10 «Funciones que Curvan», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde el plano, las
// potencias y lo que se repite hasta las gráficas, tablas y expresiones que el examen pide reconocer.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const curva = (K, f, X, Y, a, b, cls = 'la gr') => K.pl(Array.from({ length: 61 }, (_, i) => { const x = a + (b - a) * i / 60; return [X(x), Y(f(x))]; }), cls);
  // Puntos de y = x²: aparecen n de la lista; c une la curva.
  const PX = [0, 1, 2, 3, -1, -2, -3];
  const cuadrado = (v, K) => {
    const X = x => 170 + x * 40, Y = y => 170 - y * 16;
    let h = K.l(40, Y(0), 300, Y(0), 'lm') + K.l(170, 16, 170, Y(0), 'lm');
    for (let i = -3; i <= 3; i++) if (i) h += K.t(X(i), Y(0) + 16, String(i).replace('-', '−'), 's tm');
    h += K.f(v.c, curva(K, x => x * x, X, Y, -3, 3));
    PX.slice(0, Math.round(v.n)).forEach(x => { h += K.c(X(x), Y(x * x), 5, 'fF') + K.t(X(x) + (x < 0 ? -9 : 9), Y(x * x) - 6, x * x, 's', x < 0 ? 'end' : 'start'); });
    return h;
  };
  // Balón h = −t² + 8t: c los ceros, e el eje, v el vértice.
  const balon = (v, K) => {
    const X = t => 40 + t * 30, Y = h => 160 - h * 8;
    return K.l(30, 160, 300, 160, 'lm') + curva(K, t => -t * t + 8 * t, X, Y, 0, 8) +
      K.f(v.c, K.c(X(0), 160, 5, 'fF') + K.c(X(8), 160, 5, 'fF') + K.t(X(0), 178, '0 s', 's') + K.t(X(8), 178, '8 s', 's')) +
      K.f(v.e, K.l(X(4), 26, X(4), 160, 'lg d') + K.t(X(4), 178, '4 s', 's tg')) +
      K.f(v.v, K.c(X(4), Y(16), 6, 'fg') + K.t(X(4) + 12, Y(16) + 4, '16 m', 'b', 'start'));
  };
  // Cuatro gráficas pequeñas (altura contra tiempo, en 0..1); n: rótulo de cada una.
  const GR = [t => 3.6 * t * (1 - t), t => 0.3 + 2.1 * t - 2.4 * t * t, t => 0.3 - t + 1.2 * t * t, t => 0.3 - 0.3 * t];
  const graficas = (v, K) => GR.map((f, i) => {
    const ox = 14 + (i % 2) * 166, oy = 10 + Math.floor(i / 2) * 92, X = t => ox + 20 + t * 126, Y = h => oy + 72 - h * 60;
    return K.r(ox, oy, 156, 84, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.l(ox + 20, oy + 72, ox + 150, oy + 72, 'lm') + K.l(ox + 20, oy + 8, ox + 20, oy + 72, 'lm') +
      curva(K, f, X, Y, 0, 1) + K.t(ox + 14, oy + 24, 'ABCD'[i], 'b') + K.t(ox + 148, oy + 20, (v.n || [])[i] || '', 's tm', 'end');
  }).join('') + K.t(170, 206, v.t || '', 'ta');
  // Rueda de radio 10 m (70 px): cabina en el ángulo g; h dibuja su altura sobre el centro.
  const rueda = (v, K) => {
    const q = K.at(110, 100, 70, v.g);
    return K.arc(110, 100, 70, 0, 360, 'lm') + K.l(30, 100, 290, 100, 'lr') + K.l(110, 100, q[0], q[1], 'la gr') + K.c(q[0], q[1], 8, 'fa') +
      K.f(v.h, K.l(q[0], q[1], q[0], 100, 'lg d')) + K.l(250, 100, 250, q[1], 'lo gr') + K.c(250, q[1], 5, 'fF') + K.t(262, q[1] + 4, v.r || '', 's', 'start') +
      K.t(110, 190, v.t || '', 'ta');
  };
  // Marea y = 3 + 2 sen(2πt/12), de 0 a 12 h: m línea media, a amplitud, h medio periodo, q periodo.
  const marea = (v, K) => {
    const X = t => 30 + t * 22, Y = y => 150 - y * 22;
    return K.l(30, 150, 300, 150, 'lm') + [0, 3, 6, 9, 12].map(t => K.t(X(t), 166, `${t} h`, 's tm')).join('') + curva(K, t => 3 + 2 * Math.sin(t * Math.PI / 6), X, Y, 0, 12) +
      K.f(v.m, K.l(30, Y(3), 300, Y(3), 'lg d') + K.t(306, Y(3) + 4, '3', 's tg', 'start')) +
      K.f(v.a, K.l(X(3), Y(3), X(3), Y(5), 'lo gr') + K.t(X(3) + 8, Y(4) + 4, '2', 's', 'start')) +
      K.f(v.h, K.l(X(3), 22, X(9), 22, 'lg') + K.t(X(6), 16, 'medio periodo: 6 h', 's tg')) +
      K.f(v.q, K.l(X(0), 34, X(12), 34, 'la') + K.t(X(6), 46, 'periodo: 12 h', 's ta'));
  };
  // Máquina: entra x, sale y con la regla r.
  const maq = (v, K) => K.r(120, 40, 100, 60, 'fa', 8) + K.t(170, 76, v.r || '', 'b') + K.ar(40, 70, 112, 70, 'gr') + K.ar(228, 70, 300, 70, 'gr') +
    K.t(70, 60, String(Math.round(v.x)), 'b') + K.f(v.s, K.t(268, 60, String(Math.round(v.y)), 'b')) + K.t(170, 132, v.t || '', 'ta');
  // Tanque V = 500 − 25t: e el inicio, c el final, d el dominio y el rango.
  const tanque = (v, K) => {
    const X = t => 50 + t * 12, Y = q => 160 - q * 0.26;
    return K.l(50, 160, 300, 160, 'lm') + K.l(50, 20, 50, 160, 'lm') + K.l(X(0), Y(500), X(20), Y(0), 'la gr') +
      K.f(v.e, K.c(X(0), Y(500), 6, 'fF') + K.t(34, Y(500) + 4, '500 L', 's tm', 'end')) +
      K.f(v.c, K.c(X(20), Y(0), 6, 'fF') + K.t(X(20), 178, '20 min', 's tm')) +
      K.f(v.d, K.l(X(0), 188, X(20), 188, 'lo gr') + K.t(X(10), 204, 'dominio: 0 a 20 min', 's') + K.l(42, Y(0), 42, Y(500), 'lg gr') + K.t(150, 40, 'rango: 0 a 500 L', 's tg'));
  };

  xpAmplia('icf-ma-curvas-1', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: el plano y el cuadrado',
        xpMira('dibujo', 'Antes de la parábola: cada punto del plano es una pareja (x, y), y **x²** es x por x.', { dib: cuadrado, v: { n: 0, c: 0 }, alto: 192 }, [
          ['En «Pendiente como razón de cambio» viste que en una recta y sube siempre lo mismo.', {}],
          ['Cada punto es una pareja: cuánto a la derecha y cuánto arriba.', { n: 1 }],
          ['Si y es x por x, con uno da uno y con dos da cuatro.', { n: 3 }, '$1^2 = 1, \\; 2^2 = 4$'],
          ['Los saltos crecen: uno, tres, cinco. No es una recta.', { n: 4 }, '$3^2 = 9$'],
          ['Con negativos da lo mismo: menos dos al cuadrado es cuatro.', { n: 7 }, '$(-2)^2 = 4$'],
          ['Al unir los puntos sale una parábola, simétrica, con su punto más bajo en el centro.', { n: 7, c: 1 }],
        ], 'En y = x² los saltos crecen y la curva es simétrica.'),
        xpHaz('fichas', 'Para $y = x^2$, pon el valor de y cuando $x = 4$ y cuando $x = -5$.', { slots: fila('x = 4', 'x = −5'), fichas: ['16', '25', '8', '−25', '10'], meta: ['16', '25'], alto: 96, pista: 'Multiplica el número por sí mismo; menos por menos da más.' }, '$4 \\cdot 4 = 16$ y $(-5)(-5) = 25$.')],
    ],
    despues: [
      ['Más difícil: tiempo o altura',
        xpMira('dibujo', 'De la misma curva se preguntan **tres** cosas distintas. Un balón: $h = -t^2 + 8t$, en metros y segundos.', { dib: balon, v: { c: 0, e: 0, v: 0 }, alto: 186 }, [
          ['El balón sale del suelo y vuelve a él a los ocho segundos.', { c: 1 }, '$-t(t - 8) = 0$'],
          ['Sube durante la mitad del tiempo: cuatro segundos.', { e: 1 }],
          ['La altura máxima se halla reemplazando ese tiempo.', { v: 1 }, '$-16 + 32 = 16$'],
          ['Trampa: dar el 4 cuando piden la altura, o el 16 cuando piden el tiempo.', {}],
          ['Mira siempre qué pide y en qué unidad: metros o segundos.', {}],
        ], 'Ceros: cuándo sale y cae. Mitad: cuándo está arriba. Reemplazo: qué tan alto.'),
        xpHaz('fichas', 'Una pelota: $h = -2t^2 + 12t$, en metros y segundos. Pon el tiempo de la altura máxima y esa altura.', { slots: fila('tiempo (s)', 'altura (m)'), fichas: ['3', '18', '6', '36', '12'], meta: ['3', '18'], alto: 96, pista: 'Busca los ceros, toma la mitad y reemplaza.' }, 'Ceros 0 y 6; en $t = 3$: $-18 + 36 = 18$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Una piedra se lanza hacia arriba desde un puente de 15 m y cae al río. ¿Qué gráfica de altura contra tiempo la representa?', { dib: graficas, v: { n: ['', '', '', ''], t: '' }, alto: 214 }, [
        ['La piedra sale de 15 m: la gráfica debe empezar arriba del suelo.', { t: 'empieza en 15 m' }],
        ['Esta sube y baja, pero empieza en cero: punto de partida malo.', { n: ['partida mala', '', '', ''] }],
        ['Esta abre hacia arriba: la piedra no baja primero.', { n: ['partida mala', '', 'forma mala', ''] }],
        ['Esta es una recta: la piedra no baja siempre igual.', { n: ['partida mala', '', 'forma mala', 'es recta'] }],
        ['Esta empieza en 15, sube, frena y cae: sirve.', { n: ['partida mala', 'sirve', 'forma mala', 'es recta'] }],
      ], 'En una gráfica mira el punto de partida, la forma y el final.'),
      xpHaz('hoja', 'Un dron despega de una terraza de 10 m, sube un rato y luego baja hasta el suelo. Subraya la descripción de su gráfica.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Empieza en 0, sube y vuelve a 0.'], ['Empieza en 10, sube y termina en 0.'], ['Empieza en 10 y baja siempre.'], ['Empieza en 10, baja y luego sube.']], pista: 'Revisa dónde empieza, qué hace primero y dónde termina.' }, 'Parte de 10, sube primero y termina en el suelo.')],
    cierre: 'x² da saltos que crecen y una curva simétrica; mira partida, forma y si piden tiempo o altura.',
  });

  xpAmplia('icf-ma-curvas-2', {
    conecta: 'icf-ma-finanzas-1',
    desde: [
      ['Desde cero: qué es una potencia',
        xpMira('fichas', 'Una **potencia** es una multiplicación repetida: la **base** se multiplica tantas veces como dice el **exponente**.', { slots: fila('hora 1', 'hora 2', 'hora 3'), fichas: ['2', '4', '8'], alto: 96 }, [
          ['En «Interés simple y compuesto» viste que el compuesto multiplica cada año.', {}],
          ['Una bacteria se parte en dos cada hora: a la hora uno hay dos.', { pon: { 0: '2' } }],
          ['A la hora dos, cada una se parte otra vez: cuatro.', { pon: { 1: '4' } }, '$2 \\cdot 2 = 4$'],
          ['A la hora tres hay ocho: dos multiplicado tres veces.', { pon: { 2: '8' } }, '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$'],
          ['La base es el dos; el exponente, las horas. Se escribe y = 2 a la t.', {}, '$y = 2^t$'],
        ], 'Base: lo que se multiplica. Exponente: cuántas veces.'),
        xpHaz('fichas', 'Pon el valor de $5^3$ y el de $2^6$.', { slots: fila('5³', '2⁶'), fichas: ['125', '64', '15', '12', '32'], meta: ['125', '64'], alto: 96, pista: 'Multiplica la base por sí misma tantas veces como diga el exponente.' }, '$5 \\cdot 5 \\cdot 5 = 125$ y $2^6 = 64$.')],
    ],
    despues: [
      ['Más difícil: ¿lineal o exponencial?',
        xpMira('hoja', 'Al comienzo una tabla lineal y una exponencial se parecen. Para distinguirlas, **resta** o **divide** datos seguidos.', { paras: [['Tabla A: 3, 6, 9, 12'], ['Tabla B: 3, 6, 12, 24'], ['A: suma 3 cada vez'], ['B: multiplica por 2 cada vez']] }, [
          ['Las dos empiezan en tres y siguen en seis.', { luz: [0, 1] }],
          ['En A las diferencias son siempre tres: es lineal.', { luz: [2], nota: { 0: 'lineal' } }],
          ['En B cada dato entre el anterior da siempre dos: es exponencial.', { luz: [3], nota: { 1: 'exponencial' } }],
          ['En el paso diez, A va en 30 y B ya pasa de 1 500.', {}, '$3 \\cdot 2^9 = 1\\,536$'],
          ['Diferencia constante: lineal. Cociente constante: exponencial.', {}],
        ], 'Resta: si da igual, es lineal. Divide: si da igual, es exponencial.'),
        xpHaz('hoja', 'Subraya la tabla que crece de forma **exponencial**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['5, 10, 15, 20'], ['5, 15, 45, 135'], ['5, 8, 11, 14']], pista: 'Divide cada número entre el anterior.' }, 'Cada dato es el anterior por 3.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un lago tiene 400 peces y cada año pierde el 25 % de los que hay. ¿Qué expresión da los peces después de t años?', { letras: ['A', 'B', 'C', 'D'], paras: [['400 · 0.25ᵗ'], ['400 − 0.25t'], ['400 · 0.75ᵗ'], ['0.75 · 400t']] }, [
        ['Pierde un cuarto cada año: queda el 75 % de lo que había.', {}, '$1 - 0.25 = 0.75$'],
        ['Esta multiplica por lo que se pierde, no por lo que queda.', { luz: [0], nota: { 0: 'tasa, no lo que queda' } }],
        ['Esta resta siempre lo mismo: sería una recta.', { luz: [1], nota: { 1: 'lineal' } }],
        ['Esta pone la t multiplicando: crecería en vez de bajar.', { luz: [3], nota: { 3: 'crece' } }],
        ['Esta multiplica cada año por 0.75: sirve.', { luz: [2], nota: { 2: 'sirve' } }, '$400 \\cdot 0.75 = 300$'],
      ], 'En la base va lo que queda: 1 menos la pérdida.'),
      xpHaz('hoja', 'Un carro de 60 millones pierde el 15 % de su valor cada año. Subraya su valor, en millones, después de t años.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['60 · 0.15ᵗ'], ['60 − 0.15t'], ['60 · 1.15ᵗ'], ['60 · 0.85ᵗ']], pista: 'Piensa en el porcentaje que queda, no en el que se pierde.' }, 'Queda el 85 % cada año: $60 \\cdot 0.85^t$.')],
    cierre: 'Exponencial multiplica por lo mismo: divide datos seguidos y pon en la base lo que queda.',
  });

  xpAmplia('icf-ma-curvas-3', {
    conecta: 'icf-ma-forma-4',
    desde: [
      ['Desde cero: lo que se repite',
        xpMira('dibujo', 'Algo es **periódico** si se repite igual cada cierto tiempo, como un semáforo o una rueda de chicago.', { dib: rueda, v: { g: 0, h: 0, r: '', t: '' }, alto: 200 }, [
          ['En «Razones trigonométricas» viste que el seno es el cateto opuesto sobre la hipotenusa.', {}],
          ['Una cabina da vueltas en una rueda de 10 m de radio.', { g: 90, r: '10 m', t: 'arriba: 10 m sobre el centro' }],
          ['Su altura sobre el centro es el radio por el seno del ángulo.', { g: 30, h: 1, r: '5 m', t: 'a 30°: 10 · sen 30°' }, '$10 \\cdot 0.5 = 5$'],
          ['Abajo del centro, la altura es negativa.', { g: 270, h: 0, r: '−10 m', t: 'abajo: −10 m' }],
          ['Al completar la vuelta todo se repite: eso es un periodo.', { g: 360, r: '0 m', t: 'una vuelta: un periodo' }],
        ], 'Lo periódico se repite; la altura en una rueda es radio por seno.'),
        xpHaz('fichas', 'Una rueda tiene radio 8 m. Pon la altura de la cabina sobre el centro a 90° y a 30°.', { slots: fila('a 90°', 'a 30°'), fichas: ['8', '4', '−8', '0', '16'], meta: ['8', '4'], alto: 96, pista: 'A 90° está en lo más alto; el seno de 30° es la mitad.' }, '$8 \\cdot 1 = 8$ y $8 \\cdot 0.5 = 4$.')],
    ],
    despues: [
      ['Más difícil: leer una marea',
        xpMira('dibujo', 'Una tabla de mareas da la altura del agua cada tres horas: 3, 5, 3, 1 y 3 m. De ahí salen centro, amplitud y periodo.', { dib: marea, v: { m: 0, a: 0, h: 0, q: 0 }, alto: 176 }, [
          ['Va de uno a cinco metros: la línea media es tres.', { m: 1 }, '$\\tfrac{1 + 5}{2} = 3$'],
          ['La amplitud es dos, no cuatro: se mide desde el medio.', { a: 1 }, '$5 - 3 = 2$'],
          ['De la marea alta a la baja pasan seis horas: es medio periodo.', { h: 1 }],
          ['El periodo completo es de doce horas.', { q: 1 }],
          ['Trampa: dar el seis como periodo o el cuatro como amplitud.', {}],
        ], 'Amplitud desde el centro; de alto a bajo es medio periodo.'),
        xpHaz('fichas', 'Una boya sube y baja entre 2 m y 8 m y tarda 5 s de lo más alto a lo más bajo. Pon la amplitud y el periodo.', { slots: fila('amplitud', 'periodo (s)'), fichas: ['3', '10', '6', '5', '2.5'], meta: ['3', '10'], alto: 96, pista: 'El centro es 5; de arriba a abajo es medio periodo.' }, '$8 - 5 = 3$ y $2 \\cdot 5 = 10$ s.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un cuarto frío oscila entre −4 °C y 6 °C y repite su ciclo cada 8 horas. ¿Qué expresión lo describe?', { letras: ['A', 'B', 'C', 'D'], paras: [['T = 1 + 5 · sen(…), periodo 8 h'], ['T = 1 + 10 · sen(…), periodo 8 h'], ['T = 2 + 4 · sen(…), periodo 8 h'], ['T = 1 + 5 · sen(…), periodo 4 h']] }, [
        ['Primero el centro: la mitad entre menos cuatro y seis es uno.', {}, '$\\tfrac{-4 + 6}{2} = 1$'],
        ['La amplitud va del centro al máximo: cinco.', {}, '$6 - 1 = 5$'],
        ['Esta usa todo el rango como amplitud: llegaría a once.', { luz: [1], nota: { 1: 'rango, no amplitud' } }],
        ['Esta tiene el centro mal: no baja hasta menos cuatro.', { luz: [2], nota: { 2: 'centro malo' } }, '$2 - 4 = -2$'],
        ['Esta tiene centro y amplitud bien, pero el periodo a la mitad.', { luz: [3], nota: { 3: 'medio periodo' } }],
        ['Esta cumple las tres cosas: sirve.', { luz: [0], nota: { 0: 'sirve' } }],
      ], 'Revisa centro, amplitud y periodo, una cosa a la vez.'),
      xpHaz('hoja', 'El brillo de una luz va de 20 a 80 y se repite cada 2 s. Subraya la expresión que lo describe.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['B = 50 + 60 · sen(…), periodo 2 s'], ['B = 50 + 30 · sen(…), periodo 1 s'], ['B = 50 + 30 · sen(…), periodo 2 s'], ['B = 30 + 50 · sen(…), periodo 2 s']], pista: 'Halla el centro y luego la distancia del centro al máximo.' }, 'Centro 50, amplitud 30 y periodo 2 s.')],
    cierre: 'Lo periódico se repite: centro a la mitad, amplitud desde el centro y periodo de cresta a cresta.',
  });

  xpAmplia('icf-ma-curvas-4', {
    conecta: 'icf-ma-curvas-1',
    desde: [
      ['Desde cero: entrada y salida',
        xpMira('dibujo', 'Una **función** es una regla, como una máquina: le entra un número y le sale otro.', { dib: maq, v: { r: 'x + 3', x: 2, y: 5, s: 0, t: '' }, alto: 146 }, [
          ['En «Cuadráticas» hallaste alturas reemplazando el tiempo en una fórmula.', {}],
          ['La regla de esta máquina es sumar tres.', { t: 'regla: sumar 3' }],
          ['Si entra dos, sale cinco.', { s: 1, t: 'entra 2, sale 5' }, '$2 + 3 = 5$'],
          ['La entrada se llama x y la salida, y.', { t: 'x entra, y sale' }],
          ['Cada pareja es un punto del plano: aquí, el (2, 5).', { t: 'punto (2, 5)' }],
        ], 'Una función toma una entrada x y da una salida y.'),
        xpHaz('fichas', 'La regla es «el doble menos uno». Pon la salida cuando entra 4 y cuando entra 0.', { slots: fila('entra 4', 'entra 0'), fichas: ['7', '−1', '8', '1', '3'], meta: ['7', '−1'], alto: 96, pista: 'Primero el doble y después quita uno.' }, '$2 \\cdot 4 - 1 = 7$ y $2 \\cdot 0 - 1 = -1$.')],
    ],
    despues: [
      ['Más difícil: el contexto pone límites',
        xpMira('dibujo', 'En un problema real, la fórmula vale **solo mientras tenga sentido**. Un tanque: $V = 500 - 25t$.', { dib: tanque, v: { e: 0, c: 0, d: 0 }, alto: 212 }, [
          ['Un tanque de 500 litros pierde 25 litros por minuto.', {}],
          ['El tiempo no puede ser negativo: empieza en cero, con 500 litros.', { e: 1 }],
          ['Se vacía cuando V es cero: a los veinte minutos.', { c: 1 }, '$500 \\div 25 = 20$'],
          ['Dominio: de 0 a 20 minutos. Rango: de 0 a 500 litros.', { d: 1 }],
          ['Trampa: dar minutos cuando piden el rango, que va en litros.', {}],
        ], 'Dominio en la unidad de lo que entra; rango en la de lo que sale.'),
        xpHaz('fichas', 'Un celular tiene 80 % de batería y gasta 4 % por hora. Pon cuántas horas dura y el mayor valor del rango.', { slots: fila('horas', 'mayor %'), fichas: ['20', '80', '100', '4', '16'], meta: ['20', '80'], alto: 96, pista: 'Divide la batería entre lo que gasta en una hora.' }, '$80 \\div 4 = 20$ h; la batería va de 0 a 80 %.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Para $f(x) = (x - 1)(x - 5)$, ¿qué afirmación es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Corta el eje x en −1 y en −5.'], ['Corta el eje y en 5.'], ['Su valor mínimo es 5.'], ['Corta el eje x en 1 y en 5, y el eje y en −5.']] }, [
        ['Con y igual a cero salen los cortes con el eje x: uno y cinco.', {}, '$x - 1 = 0 \\; o \\; x - 5 = 0$'],
        ['Con x igual a cero sale el corte con el eje y.', {}, '$(-1)(-5) = 5$'],
        ['Esta cambia los signos de los ceros.', { luz: [0], nota: { 0: 'signos' } }],
        ['Esta confunde el corte con el eje y con el punto más bajo.', { luz: [2], nota: { 2: 'mínimo −4' } }, '$f(3) = 2 \\cdot (-2) = -4$'],
        ['Esta tiene los ceros bien y el corte con y mal: media verdad.', { luz: [3], nota: { 3: 'media verdad' } }],
        ['Corta el eje y en cinco: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Eje x: y = 0. Eje y: x = 0. Una opción a medias es falsa.'),
      xpHaz('hoja', '$g(x) = 2x - 8$, con x entre 0 y 10. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Corta el eje x en 8.'], ['Su rango va de −8 a 12.'], ['Su dominio va de −8 a 12.'], ['Corta el eje y en 4.']], pista: 'Calcula g en los bordes del dominio y donde vale cero.' }, '$g(0) = -8$ y $g(10) = 12$.')],
    cierre: 'Una salida por entrada; dominio lo que entra, rango lo que sale, y cada corte con su cero.',
  });
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
//#archivo js/explora-icf-ma-11-pasos.js
// Preicfes · Matemáticas, mundo 11 «Movimientos y Vistas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde ubicar un
// punto, contar caras y medir con restas hasta los movimientos, vistas y distancias que pide el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const sg = n => String(n).replace('-', '−');
  // Cuadrícula de −4 a 4 con un punto (px, py) y sus guías.
  const U = 20, X = x => 170 + x * U, Y = y => 100 - y * U;
  const red = K => { let h = ''; for (let i = -4; i <= 4; i++) h += K.l(X(i), Y(-4), X(i), Y(4), i ? 'lr' : 'lm') + K.l(X(-4), Y(i), X(4), Y(i), i ? 'lr' : 'lm'); return h; };
  const punto = (v, K) => red(K) + K.l(X(v.px), Y(0), X(v.px), Y(v.py), 'lg d') + K.l(X(0), Y(v.py), X(v.px), Y(v.py), 'lg d') +
    K.c(X(v.px), Y(v.py), 6, 'fF') + K.t(170, 198, v.t || '', 'ta');
  // Cubo grande con una cara (c), una arista (a) y un vértice (p) resaltados.
  const cubo = (v, K) => {
    const o = [150, 160], u = 64, I = (x, y, z) => K.iso(o, u, x, y, z);
    return K.caja(o, u, 1, 1, 1, 'fa', false) + K.f(v.c, K.p([I(0, 0, 1), I(1, 0, 1), I(1, 1, 1), I(0, 1, 1)], 'fg')) +
      K.f(v.a, K.l(...I(0, 0, 0), ...I(0, 0, 1), 'lo gr')) + K.f(v.p, K.c(...I(0, 0, 1), 7, 'fF')) + K.t(170, 196, v.t || '', 'ta');
  };
  // Dos moldes de seis cuadrados: la cruz (a) y la fila (b); x tacha la fila.
  const moldes = (v, K) => {
    const q = (x, y, cls) => K.r(x, y, 22, 22, cls, 2);
    let h = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]].map(([c, f]) => q(30 + c * 24, 30 + f * 24, v.a ? 'fg' : 'fc')).join('');
    h += Array.from({ length: 6 }, (_, i) => q(182 + i * 24, 54, v.b ? 'fa' : 'fc')).join('');
    return h + K.f(v.a, K.t(78, 122, 'cierra', 's tg')) + K.f(v.b, K.t(254, 122, 'no cierra', 's ta')) +
      K.f(v.x, K.l(178, 50, 330, 80, 'lo gr') + K.l(178, 80, 330, 50, 'lo gr')) + K.t(170, 150, v.t || '', 'ta');
  };
  // Torre de cubos (columnas de 3, 1 y 1) y cuatro vistas posibles; n: rótulo de cada vista.
  const VI = [[3, 1, 1], [1, 1, 1], [1, 1, 3], [5]];
  const vistas = (v, K) => {
    let h = '';
    [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2]].forEach(([c, z]) => { h += K.caja(K.iso([40, 140], 22, c, 0, z), 22, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); });
    VI.forEach((cols, i) => {
      const ox = 146 + (i % 2) * 98, oy = 8 + Math.floor(i / 2) * 92;
      h += K.r(ox, oy, 92, 86, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.t(ox + 14, oy + 22, 'ABCD'[i], 'b') + K.t(ox + 86, oy + 18, (v.n || [])[i] || '', 's tm', 'end');
      cols.forEach((n, c) => { for (let z = 0; z < n; z++) h += K.r(ox + 26 + c * 14, oy + 70 - z * 11, 13, 10, 'fa', 1); });
    });
    return h + K.t(70, 178, v.t || '', 's ta');
  };
  // Cuadrícula de 0 a 8: de (1, 1) a (3, 5) en escalera (h, vv) y en línea recta (d).
  const G = x => 90 + x * 20, H = y => 180 - y * 20;
  const escalera = (v, K) => {
    let h = '';
    for (let i = 0; i <= 8; i++) h += K.l(G(i), H(0), G(i), H(8), i ? 'lr' : 'lm') + K.l(G(0), H(i), G(8), H(i), i ? 'lr' : 'lm');
    return h + K.c(G(1), H(1), 6, 'fa') + K.c(G(3), H(5), 6, 'fa') + K.t(G(1) - 8, H(1) + 16, '(1, 1)', 's', 'end') + K.t(G(3) + 10, H(5) - 6, '(3, 5)', 's', 'start') +
      K.f(v.h, K.l(G(1), H(1), G(3), H(1), 'lo gr') + K.t(G(2), H(1) + 16, '2', 'b')) +
      K.f(v.vv, K.l(G(3), H(1), G(3), H(5), 'lg gr') + K.t(G(3) + 10, H(3), '4', 'b', 'start')) +
      K.f(v.d, K.l(G(1), H(1), G(3), H(5), 'la gr') + K.t(G(1) - 6, H(3), '√20', 'b ta', 'end'));
  };
  // Polar: 10 m a g grados desde (50, 170), 12 px por metro; x e y encienden las proyecciones.
  const dron = (v, K) => {
    const q = K.at(50, 170, 120, v.g);
    return K.l(30, 170, 320, 170, 'lm') + K.l(50, 20, 50, 186, 'lm') + K.arc(50, 170, 28, 0, Math.max(0.3, v.g), 'lo gr') + K.t(88, 160, `${Math.round(v.g)}°`, 's') +
      K.l(50, 170, q[0], q[1], 'la gr') + K.c(q[0], q[1], 7, 'fF') + K.t(q[0] + 10, q[1] - 6, '10 m', 's', 'start') +
      K.f(v.y, K.l(q[0], q[1], q[0], 170, 'lg d') + K.t(q[0] + 8, (q[1] + 170) / 2, 'altura 5', 's tg', 'start')) +
      K.f(v.x, K.l(50, 178, q[0], 178, 'lo gr') + K.t((50 + q[0]) / 2, 196, 'a la derecha 8.7', 's'));
  };

  xpAmplia('icf-ma-espacio-1', {
    conecta: 'icf-ma-forma-3',
    desde: [
      ['Desde cero: ubicar un punto',
        xpMira('dibujo', 'Para mover figuras hay que saber **ubicar** puntos: cada uno tiene dos números, primero x y después y.', { dib: punto, v: { px: 0, py: 0, t: '(0, 0): el centro' }, alto: 206 }, [
          ['En «Tales y semejanza» viste figuras con la misma forma y distinto tamaño.', {}],
          ['El punto (2, 3) está dos a la derecha y tres arriba del centro.', { px: 2, py: 3, t: '(2, 3)' }],
          ['Los negativos van a la izquierda o hacia abajo.', { px: -3, py: -1, t: '(−3, −1)' }],
          ['El primer número siempre es el de los lados; el segundo, el de altura.', { px: 1, py: -2, t: '(1, −2)' }],
          ['Mover una figura es cambiar los números de sus puntos.', { px: 3, py: -2, t: '(1, −2) → (3, −2)' }],
        ], 'Primero x (lados) y después y (altura); los negativos van a la izquierda o abajo.'),
        xpHaz('dibujo', 'Arrastra el punto hasta $(-2, 3)$.', { dib: punto, v: { px: 1, py: -1, t: '' }, alto: 206, metas: { px: -2, py: 3 },
          manijas: [{ k: ['px', 'py'], min: -4, max: 4, paso: 1, en: v => [X(v.px), Y(v.py)], de: (x, y) => [(x - 170) / U, (100 - y) / U] }],
          dice: v => `Está en (${sg(v.px)}, ${sg(v.py)}).`, pista: 'Dos a la izquierda y tres arriba.' }, '$(-2, 3)$: dos a la izquierda, tres arriba.')],
    ],
    despues: [
      ['Más difícil: el orden de los movimientos',
        xpMira('fichas', 'Con **dos** movimientos seguidos, el **orden** puede cambiar el resultado. Punto (2, 1).', { slots: fila('orden 1', 'orden 2'), fichas: ['(1, 1)', '(−5, 1)'], alto: 96 }, [
          ['Orden 1: reflejar en el eje y y luego correr 3 a la derecha.', {}],
          ['Reflejar da (−2, 1); correr tres da (1, 1).', { pon: { 0: '(1, 1)' } }, '$-2 + 3 = 1$'],
          ['Orden 2: primero correr 3 a la derecha da (5, 1).', {}],
          ['Y reflejar (5, 1) da (−5, 1): otro lugar.', { pon: { 1: '(−5, 1)' } }],
          ['Haz los movimientos uno a la vez y en el orden que dicen.', { marca: [0, 1] }],
        ], 'Un movimiento a la vez y en el orden del enunciado.'),
        xpHaz('fichas', 'El punto (3, 2) gira 180° con centro en el origen y luego baja 4. Pon el punto tras el giro y el final.', { slots: fila('tras el giro', 'final'), fichas: ['(−3, −2)', '(−3, −6)', '(3, −2)', '(−3, 2)', '(−7, −2)'], meta: ['(−3, −2)', '(−3, −6)'], alto: 96, pista: 'Media vuelta cambia los dos signos; bajar cambia la y.' }, '$(3, 2) \\to (-3, -2) \\to (-3, -6)$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un triángulo con vértices (1, 1), (4, 1) y (1, 3) pasa a (−1, 1), (−4, 1) y (−1, 3). ¿Qué movimiento se hizo?', { letras: ['A', 'B', 'C', 'D'], paras: [['Traslación de 2 a la izquierda.'], ['Reflexión en el eje y.'], ['Rotación de 180°.'], ['Reflexión en el eje x.']] }, [
        ['Compara punto por punto: la x cambia de signo y la y se queda.', {}],
        ['Correr dos a la izquierda sirve para el primer punto, pero no para (4, 1).', { luz: [0], nota: { 0: 'un solo punto' } }, '$4 - 2 = 2$'],
        ['La media vuelta también cambiaría el signo de la y.', { luz: [2], nota: { 2: 'cambia y' } }],
        ['El reflejo en el eje x cambiaría la y, no la x.', { luz: [3], nota: { 3: 'cambia y' } }],
        ['Cambia solo el signo de x: es el reflejo en el eje y.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Revisa todos los vértices, no solo uno.'),
      xpHaz('hoja', 'Un cuadrado de lado 2 con un vértice en (1, 1) pasa a tener lado 6 y ese vértice en (3, 3). Subraya el movimiento.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Traslación de 2 a la derecha y 2 arriba.'], ['Homotecia de factor 3 con centro en el origen.'], ['Rotación de 90°.'], ['Homotecia de factor 2 con centro en el origen.']], pista: 'Mira qué pasó con el tamaño, no solo con un vértice.' }, 'El lado pasa de 2 a 6 y $(1, 1) \\to (3, 3)$: factor 3.')],
    cierre: 'Cada movimiento cambia los números de los puntos; hazlos en orden y revisa todos los vértices.',
  });

  xpAmplia('icf-ma-espacio-2', {
    conecta: 'icf-ma-medida-3',
    desde: [
      ['Desde cero: caras, aristas y vértices',
        xpMira('dibujo', 'Un cuerpo sólido tiene **caras** (las partes planas), **aristas** (los bordes) y **vértices** (las esquinas).', { dib: cubo, v: { c: 0, a: 0, p: 0, t: '' }, alto: 204 }, [
          ['En «Volumen y capacidad» contaste cubitos para medir lo que cabe en una caja.', {}],
          ['Las caras son los cuadrados planos: un cubo tiene seis.', { c: 1, t: '6 caras' }],
          ['Donde se juntan dos caras hay una arista: tiene doce.', { a: 1, t: '12 aristas' }],
          ['Donde se juntan tres aristas hay un vértice: tiene ocho.', { p: 1, t: '8 vértices' }],
          ['Desde un solo lado se ven, como máximo, tres caras.', { t: 'se ven 3 de 6' }],
        ], 'Caras planas, aristas en los bordes y vértices en las esquinas.'),
        xpHaz('fichas', 'Una caja de zapatos es un prisma rectangular. Pon cuántas caras y cuántas aristas tiene.', { slots: fila('caras', 'aristas'), fichas: ['6', '12', '8', '4', '24'], meta: ['6', '12'], alto: 96, pista: 'Tiene la misma forma que un cubo, aunque sus lados sean distintos.' }, 'Como el cubo: 6 caras y 12 aristas.')],
    ],
    despues: [
      ['Más difícil: el molde que no cierra',
        xpMira('dibujo', 'No toda figura de seis cuadrados se dobla en un cubo. Compara una **cruz** con una **fila**.', { dib: moldes, v: { a: 0, b: 0, x: 0, t: '' }, alto: 160 }, [
          ['La cruz sí cierra: cuatro dan la vuelta y dos tapan.', { a: 1 }],
          ['Seis en fila no: al dar la vuelta, la quinta cae sobre la primera.', { b: 1, x: 1 }],
          ['Regla útil: más de cuatro en una fila nunca cierra.', { t: 'más de 4 en fila: no' }],
          ['Y las dos tapas deben quedar a lados distintos de la tira.', { t: 'una tapa arriba, otra abajo' }],
        ], 'Cuatro en fila como máximo y una tapa a cada lado.'),
        xpHaz('hoja', 'Subraya el molde que **sí** se dobla en un cubo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fila de 4, con una tapa arriba y otra abajo del segundo cuadrado.'], ['Fila de 5, con una tapa arriba.'], ['Fila de 4, con dos tapas arriba, una junto a la otra.']], pista: 'Más de cuatro en fila no cierra, y dos tapas del mismo lado chocan.' }, 'Es la cruz: cuatro dan la vuelta y las tapas quedan opuestas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Una fila de 3 cubos tiene 2 cubos más encima del de la izquierda. ¿Qué se ve **de frente**?', { dib: vistas, v: { n: ['', '', '', ''], t: '' }, alto: 196 }, [
        ['De frente se ve, en cada columna, la torre más alta.', { t: 'columnas: 3, 1 y 1' }],
        ['Esta es la vista desde arriba: tres cuadrados en fila.', { n: ['', 'arriba', '', ''] }],
        ['Esta está al revés: así se vería desde atrás.', { n: ['', 'arriba', 'atrás', ''] }],
        ['Esta apila todos los cubos: suma en vez de mirar.', { n: ['', 'arriba', 'atrás', 'suma'] }],
        ['Columna de tres a la izquierda y dos sueltos: sirve.', { n: ['sirve', 'arriba', 'atrás', 'suma'] }],
      ], 'Cada vista muestra la torre más alta de cada columna, desde su lado.'),
      xpHaz('hoja', 'Una fila de 4 cubos tiene 1 cubo más encima del **segundo** desde la izquierda. Subraya las alturas que se ven de frente, de izquierda a derecha.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['1, 2, 1, 1'], ['1, 1, 2, 1'], ['2, 1, 1, 1'], ['5']], pista: 'Cuenta columna por columna, de izquierda a derecha.' }, 'Solo la segunda columna tiene dos cubos.')],
    cierre: 'Caras, aristas y vértices; cada vista muestra la torre más alta, y no todo molde se dobla en cubo.',
  });

  xpAmplia('icf-ma-espacio-3', {
    conecta: 'icf-ma-espacio-1',
    desde: [
      ['Desde cero: medir con restas',
        xpMira('dibujo', 'Para medir entre dos puntos se camina en **escalera** y después se usa **Pitágoras**.', { dib: escalera, v: { h: 0, vv: 0, d: 0 }, alto: 196 }, [
          ['En la lección de movimientos ubicaste puntos con dos números en el plano.', {}],
          ['A la derecha se camina dos: tres menos uno.', { h: 1 }, '$3 - 1 = 2$'],
          ['Hacia arriba se camina cuatro: cinco menos uno.', { vv: 1 }, '$5 - 1 = 4$'],
          ['La línea recta es la hipotenusa de ese triángulo.', { d: 1 }, '$\\sqrt{2^2 + 4^2} = \\sqrt{20}$'],
          ['Mide un poco menos de cinco: la raíz no siempre es exacta.', {}, '$\\sqrt{20} \\approx 4.47$'],
        ], 'Restas para los lados y Pitágoras para la recta.'),
        xpHaz('fichas', 'De (1, 2) a (6, 14). Pon cuánto se camina hacia arriba y la distancia en línea recta.', { slots: fila('arriba', 'distancia'), fichas: ['12', '13', '5', '17', '169'], meta: ['12', '13'], alto: 96, pista: 'Resta las y; después usa Pitágoras con 5 y 12.' }, '$\\sqrt{25 + 144} = \\sqrt{169} = 13$.')],
    ],
    despues: [
      ['Más difícil: de polar a cartesiano',
        xpMira('dibujo', 'La cuerda de una cometa mide **10 m** y forma **30°** con el piso. ¿Qué tan alta está y cuánto se alejó?', { dib: dron, v: { g: 0, x: 0, y: 0 }, alto: 200 }, [
          ['El ángulo se mide desde la derecha, contra el reloj.', { g: 30 }],
          ['Su altura es la distancia por el seno: cinco metros.', { y: 1 }, '$10 \\cdot \\tfrac{1}{2} = 5$'],
          ['Lo que avanza a la derecha es la distancia por el coseno.', { x: 1 }, '$10 \\cdot 0.87 \\approx 8.7$'],
          ['Trampa: un rumbo de brújula se mide desde el norte, no desde la derecha.', {}],
          ['Lee siempre desde dónde y hacia dónde se mide el ángulo.', {}],
        ], 'Altura: distancia por seno. Avance: distancia por coseno.'),
        xpHaz('fichas', 'Un punto está a 6 pasos a 150°. Pon su altura y hacia qué lado queda.', { slots: [{ x: 110, y: 46, w: 84, et: 'altura' }, { x: 230, y: 46, w: 104, et: 'lado' }], fichas: ['3', 'izquierda', 'derecha', '5.2', '6'], meta: ['3', 'izquierda'], alto: 96, pista: 'El seno de 150° es igual al de 30°; pasado 90° se está a la izquierda.' }, '$6 \\cdot 0.5 = 3$, a la izquierda del centro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En una bodega la esquina es (0, 0, 0). Una caja está en (3, 4, 12), en metros. ¿A qué distancia está de la esquina?', { letras: ['A', 'B', 'C', 'D'], paras: [['19 m'], ['5 m'], ['13 m'], ['169 m']] }, [
        ['En el espacio se suman tres cuadrados, uno por cada dirección.', {}, '$9 + 16 + 144 = 169$'],
        ['Esta suma las coordenadas: camina por las aristas, no en línea recta.', { luz: [0], nota: { 0: 'por las aristas' } }],
        ['Esta solo mira el piso: olvida la altura.', { luz: [1], nota: { 1: 'sin altura' } }, '$\\sqrt{9 + 16} = 5$'],
        ['Esta se quedó sin sacar la raíz.', { luz: [3], nota: { 3: 'sin raíz' } }],
        ['La raíz de 169 es trece: sirve.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Tres cuadrados, se suman y se saca la raíz.'),
      xpHaz('hoja', 'Un cable va de la esquina (0, 0, 0) de un cuarto a un gancho en (6, 2, 3), en metros. Subraya el largo del cable tenso.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['11 m'], ['7 m'], ['49 m'], ['√40 m']], pista: 'Eleva al cuadrado las tres coordenadas, suma y saca la raíz.' }, '$\\sqrt{36 + 4 + 9} = \\sqrt{49} = 7$.')],
    cierre: 'Restas para los lados y Pitágoras para la distancia; en polares, desde la derecha; en 3D, tres cuadrados.',
  });
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
//#archivo js/explora-icf-ma-12-pasos.js
// Preicfes · Matemáticas, mundos 12 «Dispersión y Comparación» y 13 «Números y Sucesiones», paso a paso (spec
// 2026-11-28-preicfes-paso-a-paso): desde el promedio, la mediana, la fracción y el conjunto hasta lo que pregunta el examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Ahorros de cuatro amigos (a, b, c, e, en miles); m enciende el promedio 5 y d las desviaciones.
  const ahorros = (v, K) => {
    const Y = q => 150 - q * 14;
    return [v.a, v.b, v.c, v.e].map((q, i) => {
      const x = 60 + i * 64;
      return K.r(x, Y(q), 36, q * 14, 'fa', 3) + K.t(x + 18, 168, String(Math.round(q)), 's tm') + K.f(v.d, K.l(x + 18, Y(q), x + 18, Y(5), 'lo gr'));
    }).join('') + K.l(40, 150, 320, 150, 'lm') + K.f(v.m, K.l(40, Y(5), 320, Y(5), 'lg d') + K.t(322, Y(5) + 4, '5', 's tg', 'start')) + K.t(170, 22, v.t || '', 'ta');
  };
  // Siete tiempos que se ordenan (o de 0 a 1); m resalta la mediana.
  const DES = [9, 3, 7, 1, 12, 5, 8], ORD = [...DES].sort((a, b) => a - b);
  const ordena = (v, K) => DES.map((n, i) => {
    const x = K.lerp(40 + i * 43, 40 + ORD.indexOf(n) * 43, v.o);
    return K.r(x - 16, 50, 32, 32, v.m && n === 7 ? 'fg' : 'fc', 4) + K.t(x, 72, n, 'b');
  }).join('') + K.f(v.m, K.t(169, 110, 'mediana: 7', 's tg')) + K.t(170, 128, v.t || '', 'ta');
  // Dos cajas sobre una recta de 0 a 12: A (2, 4, 6, 7, 10) y B (3, 5, 8, 11, 12).
  const cajas = (v, K) => {
    const X = x => 30 + x * 23, una = (q, y, cls) => K.l(X(q[0]), y + 12, X(q[4]), y + 12, 'gr') + K.r(X(q[1]), y, X(q[3]) - X(q[1]), 24, cls, 2) +
      K.f(v.m, K.l(X(q[2]), y, X(q[2]), y + 24, 'lo gr'));
    let h = K.l(30, 140, 310, 140, 'lm');
    for (let i = 0; i <= 12; i += 2) h += K.t(X(i), 158, i, 's tm');
    return h + una([2, 4, 6, 7, 10], 40, 'fa') + una([3, 5, 8, 11, 12], 90, 'fg') + K.t(16, 57, 'A', 'b ta') + K.t(16, 107, 'B', 'b tg') +
      K.f(v.q, K.l(X(8), 82, X(12), 82, 'lg gr') + K.t(X(10), 78, 'la mitad de B', 's tg')) + K.f(v.l, K.t(170, 22, 'caja más larga: más regados', 's')) + K.t(170, 176, v.t || '', 'ta');
  };
  // Horas de estudio y puntaje: aparecen n puntos; l guía de Ana; r tendencia; o un punto raro; e predicción lejana.
  const PT = [[1, 30], [2, 40], [3, 42], [4, 55], [5, 58], [6, 70]];
  const nube = (v, K) => {
    const X = x => 50 + x * 36, Y = y => 160 - y * 1.8;
    let h = K.l(40, 160, 320, 160, 'lm') + K.l(40, 20, 40, 160, 'lm') + K.t(318, 176, 'horas', 's tm', 'end') + K.t(46, 18, 'puntaje', 's tm', 'start');
    for (let i = 1; i <= 6; i++) h += K.t(X(i), 176, i, 's tm');
    h += K.f(v.r, K.l(X(0.6), Y(26.8), X(6.4), Y(73.2), 'lg d'));
    h += K.f(v.e, K.l(X(6.4), Y(73.2), X(7.4), Y(81.2), 'lo d') + K.t(X(7.4), Y(81.2) - 4, '¿?', 'b', 'end'));
    h += PT.slice(0, Math.round(v.n)).map(([x, y]) => K.c(X(x), Y(y), 5, 'fa')).join('');
    h += K.f(v.l, K.l(X(2), Y(40), X(2), 160, 'lg d') + K.l(40, Y(40), X(2), Y(40), 'lg d') + K.t(X(2) + 8, Y(40) - 6, 'Ana (2, 40)', 's', 'start'));
    return h + K.f(v.o, K.c(X(5.5), Y(22), 6, 'fF') + K.t(X(5.5) - 10, Y(22) + 4, 'raro', 's', 'end'));
  };
  // Barra partida en d pedazos iguales, con n pintados.
  const barra = (v, K) => {
    const d = Math.round(v.d), w = 260 / d;
    let h = '';
    for (let i = 0; i < d; i++) h += K.r(40 + i * w, 50, w - 3, 40, i < Math.round(v.n) ? 'fa' : 'fc', 3);
    return h + K.t(170, 124, v.t || '', 'ta');
  };
  // Un conjunto: e pone a martes y miércoles adentro; f pone el lunes afuera.
  const conjunto = (v, K) => K.r(16, 8, 308, 140, 'fn', 6) + K.c(130, 80, 62, 'fa') + K.t(312, 28, 'días de la semana', 's tm', 'end') + K.t(130, 32, 'empiezan por m', 's ta') +
    K.f(v.e, K.t(130, 76, 'martes', 'b') + K.t(130, 100, 'miércoles', 'b')) + K.f(v.f, K.t(260, 90, 'lunes', 'b')) + K.t(170, 170, v.t || '', 'ta');
  // Venn de fútbol (F) y baloncesto (B) en un grupo de 40.
  const venn = (v, K) => K.r(16, 8, 308, 130, 'fn', 6) + K.c(134, 73, 52, 'fa') + K.c(206, 73, 52, 'fg') + K.t(80, 28, 'F', 'b ta') + K.t(262, 28, 'B', 'b tg') +
    K.f(v.b, K.t(170, 78, '7', 'b')) + K.f(v.a, K.t(112, 78, '11', 'b')) + K.f(v.c, K.t(228, 78, '8', 'b')) + K.f(v.u, K.t(300, 128, '14', 'b')) + K.t(170, 160, v.t || '', 'ta');
  // Cuatro diagramas de teatro (T) y canto (C); n: rótulo de cada uno.
  const DG = [[[45, 40, 22], [115, 40, 22]], [[80, 44, 16], [80, 40, 34]], [[80, 40, 34], [80, 44, 16]], [[64, 40, 26], [100, 40, 26]]];
  const diagramas = (v, K) => DG.map((cs, i) => {
    const ox = 14 + (i % 2) * 166, oy = 8 + Math.floor(i / 2) * 92;
    const [t, c] = cs, nt = i === 2 ? 'C' : 'T';
    return K.r(ox, oy, 156, 84, (v.n || [])[i] === 'sirve' ? 'fg' : 'fn', 6) + K.t(ox + 14, oy + 22, 'ABCD'[i], 'b') + K.t(ox + 150, oy + 18, (v.n || [])[i] || '', 's tm', 'end') +
      (i === 1 ? K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg') + K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') : i === 2 ? K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') + K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg')
        : K.c(ox + t[0], oy + t[1] + 4, t[2], 'fa') + K.c(ox + c[0], oy + c[1] + 4, c[2], 'fg')) +
      (i === 1 ? K.t(ox + 80, oy + 52, 'T', 's') + K.t(ox + 80, oy + 24, 'C', 's') : i === 2 ? K.t(ox + 80, oy + 52, 'C', 's') + K.t(ox + 80, oy + 24, 'T', 's')
        : K.t(ox + t[0] - (i === 3 ? 10 : 0), oy + 48, nt, 's') + K.t(ox + c[0] + (i === 3 ? 10 : 0), oy + 48, 'C', 's'));
  }).join('') + K.t(170, 196, v.t || '', 'ta');
  // n cuadrados hechos con palillos.
  const palillos = (v, K) => {
    const n = Math.round(v.n), x0 = 40, y0 = 40, s = 44;
    let h = '';
    for (let k = 0; k <= n; k++) h += K.l(x0 + k * s, y0, x0 + k * s, y0 + s, 'la gr');
    for (let k = 0; k < n; k++) h += K.l(x0 + k * s, y0, x0 + (k + 1) * s, y0, 'la gr') + K.l(x0 + k * s, y0 + s, x0 + (k + 1) * s, y0 + s, 'la gr');
    return h + K.t(170, 124, v.t || '', 'ta');
  };

  xpAmplia('icf-ma-dispersion-1', {
    conecta: 'icf-ma-datos-2',
    desde: [
      ['Desde cero: qué tan lejos del promedio',
        xpMira('dibujo', 'Antes de la varianza: la **desviación** de un dato es cuánto se aleja del **promedio**.', { dib: ahorros, v: { a: 2, b: 4, c: 6, e: 8, m: 0, d: 0, t: '' }, alto: 180 }, [
          ['En «Promedio, mediana y moda» viste que el promedio reparte todo en partes iguales.', {}],
          ['Cuatro amigos ahorraron 2, 4, 6 y 8 mil.', { t: 'ahorros en miles' }],
          ['Si lo juntan y lo reparten igual, cada uno tendría cinco.', { m: 1, t: 'promedio: 5' }, '$20 \\div 4 = 5$'],
          ['La desviación de cada dato es lo que le falta o le sobra para llegar al promedio.', { d: 1 }],
          ['El de 2 queda a tres por debajo; el de 8, a tres por encima.', { t: 'se alejan 3, 1, 1 y 3' }],
          ['La dispersión dice qué tan lejos quedan, en general, del promedio.', {}],
        ], 'Desviación: distancia de un dato al promedio.'),
        xpHaz('fichas', 'Datos: 10, 12, 14 y 16. Pon el promedio y cuánto se aleja de él el 10.', { slots: fila('promedio', 'se aleja'), fichas: ['13', '3', '6', '12', '52'], meta: ['13', '3'], alto: 96, pista: 'Suma, reparte entre 4 y luego resta.' }, '$52 \\div 4 = 13$ y $13 - 10 = 3$.')],
    ],
    despues: [
      ['Más difícil: el rango engaña',
        xpMira('hoja', 'El **rango** solo mira los dos extremos. Dos grupos pueden tener el mismo rango y estar muy distinto de regados.', { paras: [['Grupo A: 2, 5, 5, 5, 8'], ['Grupo B: 2, 2, 5, 8, 8'], ['Mismo promedio: 5. Mismo rango: 6.'], ['B tiene más datos lejos: más dispersión.']] }, [
          ['Los dos grupos van de dos a ocho y su promedio es cinco.', { luz: [2] }, '$25 \\div 5 = 5$'],
          ['En A, tres datos están justo en el promedio.', { luz: [0], nota: { 0: 'apretado' } }],
          ['En B, cuatro datos están a tres de distancia.', { luz: [1], nota: { 1: 'regado' } }],
          ['B está más disperso aunque el rango sea igual.', { luz: [3] }],
          ['Por eso la desviación estándar mira a todos los datos.', {}],
        ], 'El rango mira dos datos; la desviación mira a todos.'),
        xpHaz('hoja', 'Los tres grupos tienen promedio 7. Subraya el de **mayor** desviación estándar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['7, 7, 7, 7'], ['4, 6, 8, 10'], ['1, 7, 7, 13']], pista: 'Mira qué tan lejos del 7 quedan los datos, y cuánto pesan los lejanos.' }, 'Se alejan 6, 0, 0 y 6: sus cuadrados suman 72.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos atletas tienen el mismo promedio, 12.0 s, en 100 m. La desviación de Juan es 0.2 s y la de Pedro, 0.9 s. ¿Qué conclusión es válida?', { letras: ['A', 'B', 'C', 'D'], paras: [['Juan es más rápido.'], ['Los tiempos de Juan son más parejos.'], ['Pedro corrió más carreras.'], ['Pedro siempre corre más lento.']] }, [
        ['La desviación dice qué tan parejos son, no quién gana.', {}],
        ['Con el mismo promedio, ninguno es más rápido en general.', { luz: [0], nota: { 0: 'no lo dice' } }],
        ['La desviación no cuenta cuántas carreras hubo.', { luz: [2], nota: { 2: 'no lo dice' } }],
        ['«Siempre» es un absoluto que los datos no permiten.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['Menor desviación: tiempos más parecidos entre sí. Sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Menor desviación es más parejo, no mejor ni más rápido.'),
      xpHaz('hoja', 'Dos panaderías venden en promedio 50 panes al día; la desviación de A es 4 y la de B, 15. Subraya la conclusión válida.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['A vende más panes.'], ['B nunca vende 50 panes.'], ['Las ventas de A cambian menos de un día a otro.'], ['B tiene más clientes.']], pista: 'La desviación mide cuánto cambian los datos, no cuánto se vende.' }, 'Desviación 4 frente a 15: A es más estable.')],
    cierre: 'La dispersión mide qué tan lejos del promedio quedan los datos; menor desviación es más parejo, no mejor.',
  });

  xpAmplia('icf-ma-dispersion-2', {
    conecta: 'icf-ma-datos-2',
    desde: [
      ['Desde cero: ordenar y el del medio',
        xpMira('dibujo', 'Percentiles y cajas se construyen con una sola idea: **ordenar** los datos y buscar el **del medio**.', { dib: ordena, v: { o: 0, m: 0, t: '' }, alto: 140 }, [
          ['En «Promedio, mediana y moda» viste que la mediana es el dato del medio.', {}],
          ['Siete tiempos de llegada, en minutos, en desorden.', { t: 'en desorden' }],
          ['Primero se ordenan de menor a mayor.', { o: 1, t: 'en orden' }],
          ['El del medio deja tres a cada lado: es siete.', { m: 1, t: 'tres a cada lado' }],
          ['Con un número par de datos, se promedian los dos del centro.', { t: 'par: promedio de los dos centrales' }],
        ], 'Ordena; la mediana deja la misma cantidad de datos a cada lado.'),
        xpHaz('fichas', 'Datos: 6, 2, 9, 4, 11, 7. Pon los dos del centro y la mediana.', { slots: fila('centro 1', 'centro 2', 'mediana'), fichas: ['6', '7', '6.5', '4', '9'], meta: ['6', '7', '6.5'], alto: 96, pista: 'Ordena primero; con seis datos, el medio queda entre el tercero y el cuarto.' }, '2, 4, 6, 7, 9, 11: la mediana es $\\tfrac{6 + 7}{2} = 6.5$.')],
    ],
    despues: [
      ['Más difícil: comparar dos cajas',
        xpMira('dibujo', 'El examen pone **dos cajas** juntas y pide comparar. Cada caja tiene un cuarto de los datos en cada tramo.', { dib: cajas, v: { m: 0, q: 0, l: 0, t: '' }, alto: 184 }, [
          ['La línea de adentro es la mediana: seis en A y ocho en B.', { m: 1 }],
          ['La mediana no es el promedio: el promedio puede ser otro.', { t: 'mediana no es promedio' }],
          ['En B, la mitad de los datos pasa de ocho; en A, menos de la cuarta parte.', { q: 1 }],
          ['Una caja más larga indica datos más regados, no más datos.', { l: 1 }],
          ['Las dos pueden tener la misma cantidad de datos.', { t: 'mismo número de datos' }],
        ], 'La caja muestra dónde está cada cuarto, no cuántos datos hay.'),
        xpHaz('hoja', 'Una caja tiene mínimo 10, cuartiles 20, 25 y 30, y máximo 50. Subraya qué parte de los datos está entre 20 y 30.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['25 %'], ['50 %'], ['75 %']], pista: 'Entre el primer y el tercer cuartil está la caja.' }, 'La caja guarda la mitad central: dos cuartos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En una prueba de 400 estudiantes, Sara quedó en el percentil 90. ¿Qué afirmación es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sara sacó 90 puntos.'], ['Sara respondió bien el 90 % de las preguntas.'], ['Unos 360 estudiantes sacaron menos que Sara.'], ['Solo 10 estudiantes sacaron más que Sara.']] }, [
        ['El percentil es un lugar en la fila, no una nota.', {}],
        ['Esta toma el 90 como puntaje.', { luz: [0], nota: { 0: 'no es nota' } }],
        ['Esta lo toma como el porcentaje de preguntas buenas.', { luz: [1], nota: { 1: 'no es aciertos' } }],
        ['Esta confunde el 10 % con 10 personas: serían cuarenta.', { luz: [3], nota: { 3: '10 % no es 10' } }, '$0.10 \\cdot 400 = 40$'],
        ['El 90 % de 400 son 360 por debajo: sirve.', { luz: [2], nota: { 2: 'sirve' } }, '$0.9 \\cdot 400 = 360$'],
      ], 'Percentil p: el p % de los datos queda por debajo.'),
      xpHaz('hoja', 'De 250 aspirantes, Tomás quedó en el percentil 60. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Tomás sacó 60 puntos.'], ['Unos 150 aspirantes sacaron menos que Tomás.'], ['60 aspirantes sacaron más que él.'], ['Tomás acertó el 60 % de la prueba.']], pista: 'El percentil dice qué parte de los aspirantes quedó por debajo.' }, '$0.6 \\cdot 250 = 150$ por debajo.')],
    cierre: 'Ordena y busca el medio; la caja parte en cuartos y el percentil es un lugar en la fila, no una nota.',
  });

  xpAmplia('icf-ma-dispersion-3', {
    conecta: 'icf-ma-lineal-1',
    desde: [
      ['Desde cero: un punto por persona',
        xpMira('dibujo', 'Un **diagrama de dispersión** pone un punto por cada caso, con **dos** datos: uno en cada eje.', { dib: nube, v: { n: 0, l: 0, r: 0, o: 0, e: 0 }, alto: 184 }, [
          ['En «Pendiente como razón de cambio» viste que una recta que sube tiene pendiente positiva.', {}],
          ['Aquí cada punto es una persona: horas de estudio y puntaje.', { n: 1 }],
          ['Ana estudió dos horas y sacó 40: su punto va en (2, 40).', { n: 2, l: 1 }],
          ['Con más personas aparece una nube de puntos.', { n: 6, l: 0 }],
          ['Si la nube sube, a más horas suele haber más puntaje.', { r: 1 }],
        ], 'Cada punto es un caso con dos datos; la nube muestra cómo van juntos.'),
        xpHaz('hoja', 'Cada punto es un día: temperatura y helados vendidos. La nube sube. Subraya lo que se puede leer.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los días más calientes suelen venderse más helados.'], ['Cada grado más vende exactamente 10 helados más.'], ['El calor no tiene relación con los helados.']], pista: 'Una nube que sube dice «suele», no «exactamente».' }, 'Una nube que sube: correlación positiva.')],
    ],
    despues: [
      ['Más difícil: el punto raro y predecir lejos',
        xpMira('dibujo', 'Dos trampas: un **punto raro** que cambia la lectura y **predecir** muy lejos de los datos medidos.', { dib: nube, v: { n: 6, l: 0, r: 1, o: 0, e: 0 }, alto: 184 }, [
          ['Esta nube sube con claridad.', {}],
          ['Aparece un punto raro: mucho estudio y poco puntaje.', { o: 1 }],
          ['Debilita la correlación, pero no la vuelve negativa.', {}],
          ['Otra trampa: alargar la línea muy lejos de los datos.', { e: 1 }],
          ['Con datos de 1 a 6 horas, predecir para 20 horas no es confiable.', {}],
        ], 'Un punto raro debilita; predecir fuera de los datos no es confiable.'),
        xpHaz('hoja', 'Con niños de 2 a 10 años, la línea es estatura = 6 · edad + 80, en cm. Subraya la predicción **menos** confiable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['A los 5 años: 110 cm'], ['A los 8 años: 128 cm'], ['A los 40 años: 320 cm']], pista: 'Busca la edad que queda fuera de los datos medidos.' }, 'Los 40 años están lejos de los datos: nadie mide 3.2 m.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En 30 ciudades, donde hay más bibliotecas hay menos delitos (r = −0.7). ¿Qué conclusión se apoya en los datos?', { letras: ['A', 'B', 'C', 'D'], paras: [['Construir bibliotecas baja los delitos.'], ['Hay una relación negativa y bastante fuerte entre las dos.'], ['No hay relación porque r es negativo.'], ['Toda ciudad con muchas bibliotecas tiene pocos delitos.']] }, [
        ['Los datos muestran que van juntas, no que una cause la otra.', {}],
        ['Esta afirma una causa: haría falta un experimento.', { luz: [0], nota: { 0: 'causa' } }],
        ['Esta lee el signo como si no hubiera relación.', { luz: [2], nota: { 2: 'signo' } }],
        ['Esta generaliza a todas: una correlación admite excepciones.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['Negativa y bastante fuerte, sin hablar de causa: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Correlación dice sentido y fuerza; nunca causa ni «todos».'),
      xpHaz('hoja', 'En 50 familias, las que tienen más carros gastan más en comida (r = 0.6). Subraya la conclusión que se apoya en los datos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Comprar un carro hace gastar más en comida.'], ['Las familias con más carros suelen gastar más en comida.'], ['No hay relación: 0.6 está lejos de 1.'], ['Toda familia con dos carros gasta más que una con uno.']], pista: 'Descarta las que hablan de causa, de siempre o de ninguna relación.' }, 'Positiva y moderada: «suelen», sin causa.')],
    cierre: 'Cada punto es un caso; la nube dice si van juntas y qué tan fuerte, pero ir juntas no es causar.',
  });

  xpAmplia('icf-ma-numeros-1', {
    conecta: 'icf-ma-proporcion-2',
    desde: [
      ['Desde cero: qué es una fracción',
        xpMira('dibujo', 'Una **fracción** parte un entero en pedazos iguales y toma algunos.', { dib: barra, v: { d: 5, n: 0, t: '' }, alto: 136 }, [
          ['En «Porcentajes y cambios» viste que el 25 % es la cuarta parte.', {}],
          ['El de abajo, el denominador, dice en cuántos pedazos iguales se parte.', { t: 'denominador: 5 pedazos' }],
          ['El de arriba, el numerador, dice cuántos pedazos se toman.', { n: 3, t: '3/5' }],
          ['La raya es una división: tres entre cinco da 0.6.', { t: '3/5 = 0.6' }, '$3 \\div 5 = 0.6$'],
          ['Y 0.6 es lo mismo que 60 de cada 100: el 60 %.', { t: '3/5 = 0.6 = 60 %' }],
        ], 'Abajo, en cuántas partes; arriba, cuántas se toman.'),
        xpHaz('fichas', 'Una barra está partida en 8 pedazos iguales y se pintan 2. Pon la fracción simplificada y su decimal.', { slots: fila('fracción', 'decimal'), fichas: ['1/4', '0.25', '1/8', '0.28', '4/2'], meta: ['1/4', '0.25'], alto: 96, pista: 'Dos de ocho es lo mismo que una de cuatro.' }, '$\\tfrac{2}{8} = \\tfrac{1}{4} = 0.25$.')],
    ],
    despues: [
      ['Más difícil: comparar formas distintas',
        xpMira('hoja', 'Para comparar números escritos de distinta forma, se pasan **todos a decimal**. ¿Cuál es mayor: 3/8, 0.4 o 35 %?', { paras: [['3/8 = 0.375'], ['0.4 = 0.400'], ['35 % = 0.350'], ['Orden: 35 % < 3/8 < 0.4']] }, [
          ['Tres octavos es tres entre ocho.', { luz: [0] }, '$3 \\div 8 = 0.375$'],
          ['Al decimal se le agregan ceros para comparar cifra por cifra.', { luz: [1] }],
          ['El porcentaje se divide entre cien.', { luz: [2] }],
          ['Ya en decimales, se ordenan sin problema.', { luz: [3] }],
          ['Trampa: creer que 3/8 es grande porque el ocho es grande.', { luz: [0], nota: { 0: 'no es el mayor' } }],
        ], 'Todo a decimal, con las mismas cifras, y después se compara.'),
        xpHaz('fichas', 'Pon el **mayor** y el **menor** de: 2/3, 0.6 y 65 %.', { slots: fila('mayor', 'menor'), fichas: ['2/3', '0.6', '65 %'], meta: ['2/3', '0.6'], alto: 96, pista: 'Pasa todos a decimal: 2 entre 3 da 0.666…' }, '0.666…, 0.6 y 0.65.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una célula mide $2 \\cdot 10^{-5}$ m y un grano de arena, $5 \\cdot 10^{-4}$ m. ¿Cuántas veces más grande es el grano?', { letras: ['A', 'B', 'C', 'D'], paras: [['2.5 veces'], ['25 veces'], ['250 veces'], ['0.04 veces']] }, [
        ['Cuántas veces más grande: se divide el grande entre el pequeño.', {}, '$\\tfrac{5 \\cdot 10^{-4}}{2 \\cdot 10^{-5}}$'],
        ['Los números de adelante: cinco entre dos es 2.5.', {}],
        ['Las potencias se restan: menos cuatro menos menos cinco es uno.', {}, '$10^{-4 - (-5)} = 10^1$'],
        ['Esta olvidó la potencia de diez.', { luz: [0], nota: { 0: 'sin la potencia' } }],
        ['Esta dividió al revés: daría menos de uno.', { luz: [3], nota: { 3: 'al revés' } }],
        ['2.5 por 10 da 25: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Divide los números de adelante y resta los exponentes.'),
      xpHaz('hoja', 'Un glóbulo rojo mide $8 \\cdot 10^{-6}$ m y una hormiga, $4 \\cdot 10^{-3}$ m. Subraya cuántas veces más larga es la hormiga.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['50 veces'], ['500 veces'], ['5 000 veces'], ['0.002 veces']], pista: 'Divide los números de adelante y resta los exponentes; 4 entre 8 da 0.5.' }, '$0.5 \\cdot 10^{3} = 500$.')],
    cierre: 'Fracción, decimal y porcentaje son el mismo número; para comparar, a decimal; en potencias, resta exponentes.',
  });

  xpAmplia('icf-ma-numeros-2', {
    conecta: 'icf-ma-azar-4',
    desde: [
      ['Desde cero: qué es un conjunto',
        xpMira('dibujo', 'Un **conjunto** es una colección bien definida: se sabe con seguridad quién está y quién no.', { dib: conjunto, v: { e: 0, f: 0, t: '' }, alto: 180 }, [
          ['En «Tablas y eventos dependientes» contaste casos en una tabla de dos entradas.', {}],
          ['Ejemplo: los días de la semana que empiezan por m.', { t: 'el rectángulo es el universo' }],
          ['Martes y miércoles cumplen: son sus elementos y van adentro.', { e: 1, t: 'elementos: adentro' }],
          ['El lunes no empieza por m: queda afuera, pero en el universo.', { f: 1, t: 'el resto: afuera' }],
          ['«Los días bonitos» no sería un conjunto: depende del gusto.', { t: 'bien definido: sin gustos' }],
        ], 'Conjunto: se sabe quién está; el rectángulo es el universo.'),
        xpHaz('hoja', 'Subraya la colección que **sí** es un conjunto bien definido.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las canciones bonitas'], ['Los números pares menores que 10'], ['Las personas altas del barrio']], pista: 'Busca la que no depende del gusto de cada quien.' }, '{2, 4, 6, 8}: no hay duda de quién está.')],
    ],
    despues: [
      ['Más difícil: «juega fútbol» no es «solo fútbol»',
        xpMira('dibujo', 'De 40 estudiantes, 18 juegan fútbol, 15 baloncesto y 7 los dos. Las palabras **solo** y **ninguno** mandan.', { dib: venn, v: { a: 0, b: 0, c: 0, u: 0, t: '' }, alto: 172 }, [
          ['«Juegan fútbol» incluye a los que también juegan baloncesto.', { t: '18 incluye a los 7' }],
          ['Siete juegan los dos: van al centro.', { b: 1, t: 'centro: 7' }],
          ['Solo fútbol: dieciocho menos siete, once.', { a: 1, t: 'solo F: 11' }, '$18 - 7 = 11$'],
          ['Solo baloncesto: quince menos siete, ocho.', { c: 1, t: 'solo B: 8' }, '$15 - 7 = 8$'],
          ['Ninguno: cuarenta menos los que están adentro.', { u: 1, t: 'ninguno: 14' }, '$40 - 26 = 14$'],
          ['Trampa: restar 18 y 15 de 40 sin quitar el cruce.', {}, '$40 - 33 = 7$'],
        ], 'Llena el centro primero; «solo» resta el cruce.'),
        xpHaz('fichas', 'De 50 personas, 30 leen noticias en el celular, 25 en papel y 12 de las dos formas. Pon solo papel y ninguna.', { slots: fila('solo papel', 'ninguna'), fichas: ['13', '7', '25', '12', '5'], meta: ['13', '7'], alto: 96, pista: 'Empieza por el centro, 12, y después cuenta los de adentro.' }, '$25 - 12 = 13$; adentro hay 43 y $50 - 43 = 7$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('dibujo', 'Todos los que hacen teatro (T) también cantan (C), pero algunos que cantan no hacen teatro. ¿Qué diagrama lo representa?', { dib: diagramas, v: { n: ['', '', '', ''], t: '' }, alto: 200 }, [
        ['«Todos los de teatro cantan»: nadie de teatro queda fuera de canto.', { t: 'T no se sale de C' }],
        ['Separados diría que nadie hace las dos cosas.', { n: ['nadie ambas', '', '', ''] }],
        ['Aquí canto está dentro de teatro: está invertido.', { n: ['nadie ambas', '', 'invertido', ''] }],
        ['Al cruzarse, queda gente de teatro que no canta.', { n: ['nadie ambas', '', 'invertido', 'T sobra'] }],
        ['Teatro dentro de canto, y canto con gente de sobra: sirve.', { n: ['nadie ambas', 'sirve', 'invertido', 'T sobra'] }],
      ], '«Todos los A son B»: el círculo de A va dentro del de B.'),
      xpHaz('hoja', 'Todas las aves tienen plumas y ningún reptil tiene plumas. Subraya cómo quedan los conjuntos de reptiles (R) y aves (A).', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['R y A se cruzan.'], ['R queda dentro de A.'], ['R y A quedan separados.'], ['A queda dentro de R.']], pista: 'Si un reptil no tiene plumas, ¿puede ser ave?' }, 'Ningún reptil es ave: no se tocan.')],
    cierre: 'Un conjunto deja claro quién está; llena el diagrama del centro hacia afuera y lee bien «todos» y «solo».',
  });

  xpAmplia('icf-ma-numeros-3', {
    conecta: 'icf-ma-curvas-2',
    desde: [
      ['Desde cero: una lista con lugares',
        xpMira('dibujo', 'Una **sucesión** es una lista en orden: primero, segundo, tercero… Cada lugar tiene su número.', { dib: palillos, v: { n: 0, t: '' }, alto: 136 }, [
          ['En «Exponenciales y logarítmicas» viste cantidades que se multiplican paso a paso.', {}],
          ['Con palillos, un cuadrado usa cuatro.', { n: 1, t: 'lugar 1: 4 palillos' }],
          ['Dos cuadrados pegados usan siete: el lado del medio se comparte.', { n: 2, t: '4, 7' }],
          ['Tres usan diez: cada cuadrado nuevo suma tres.', { n: 3, t: '4, 7, 10' }],
          ['Para el lugar n: uno más tres por n.', { n: 4, t: 'lugar n: 1 + 3n' }, '$1 + 3 \\cdot 4 = 13$'],
        ], 'La regla del lugar n permite saltar a cualquier término.'),
        xpHaz('fichas', 'Con la regla 1 + 3n, pon cuántos palillos usan 10 cuadrados y cuántos cuadrados se hacen con 61 palillos.', { slots: fila('10 cuadrados', 'con 61'), fichas: ['31', '20', '30', '21', '40'], meta: ['31', '20'], alto: 96, pista: 'Reemplaza n = 10; para 61, quita uno y divide entre tres.' }, '$1 + 30 = 31$ y $(61 - 1) \\div 3 = 20$.')],
    ],
    despues: [
      ['Más difícil: término o suma',
        xpMira('fichas', 'El examen distingue **el término** de un lugar y **la suma** de varios. Sucesión 3, 5, 7…', { slots: fila('término 10', 'suma de 10'), fichas: ['21', '120'], alto: 96 }, [
          ['La sucesión 3, 5, 7… suma dos cada vez.', {}],
          ['El término diez está a nueve saltos del tres.', { pon: { 0: '21' } }, '$3 + 9 \\cdot 2 = 21$'],
          ['La suma de los diez primeros junta todos los términos.', {}],
          ['Se emparejan primero y último: cinco parejas de 24.', { pon: { 1: '120' } }, '$5 \\cdot 24 = 120$'],
          ['Trampa: responder 21 cuando piden la suma.', { marca: [0] }],
        ], 'Término: un lugar. Suma: todos hasta ese lugar.'),
        xpHaz('fichas', '2, 6, 10, 14… Pon el término 8 y la suma de los 8 primeros.', { slots: fila('término 8', 'suma de 8'), fichas: ['30', '128', '32', '34', '256'], meta: ['30', '128'], alto: 96, pista: 'Siete saltos de 4; luego empareja el primero con el último.' }, '$2 + 7 \\cdot 4 = 30$ y $4 \\cdot 32 = 128$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tira de papel de 2 m se dobla por la mitad una y otra vez. ¿Qué afirmación sobre su largo es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Tras el tercer doblez mide 0.5 m.'], ['Su largo se acerca a 0.'], ['Pierde 0.5 m en cada doblez.'], ['Tras 4 dobleces mide 0.']] }, [
        ['Cada doblez multiplica el largo por un medio: 1, 0.5, 0.25…', {}, '$2 \\cdot \\tfrac{1}{2} = 1$'],
        ['Esta cuenta un doblez de menos: 0.5 m es tras el segundo.', { luz: [0], nota: { 0: 'un paso menos' } }],
        ['Esta resta siempre lo mismo: sería aritmética.', { luz: [2], nota: { 2: 'resta' } }],
        ['Esta dice que llega a cero: solo se acerca.', { luz: [3], nota: { 3: 'no llega' } }],
        ['El largo se achica sin fin hacia cero: sirve.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Multiplicar por menos de 1 acerca a cero sin llegar.'),
      xpHaz('hoja', 'Un tanque pierde la mitad de su agua cada semana; hoy tiene 80 litros. Subraya la afirmación correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En 2 semanas tiene 40 litros.'], ['Cada semana pierde 40 litros.'], ['El agua se acerca a 0 sin llegar a 0.'], ['En 4 semanas queda vacío.']], pista: 'Escribe 80, 40, 20, 10… y mira qué hace la lista.' }, '80, 40, 20, 10, 5… cada vez la mitad.')],
    cierre: 'Una sucesión es una lista con lugares: halla la regla, separa término de suma y mira a qué se acerca.',
  });
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
//#archivo js/explora-icf-lc-pasos.js
// Preicfes · Lectura Crítica, mundo 1 «Lo que Dice el Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero (dato, oración, párrafo, contexto, referente), sube al caso que despista y termina mostrando cómo
// lo pregunta el examen, con las trampas de cada opción. Textos breves propios.
{
  xpAmplia('icf-lc-literal-1', {
    conecta: null,
    desde: [
      ['Desde cero: qué es un dato',
        xpMira('hoja', 'Antes de las palabras difíciles: un **texto** es un grupo de oraciones sobre algo. Cada **dato** es una cosa que el texto afirma.', { paras: [['La tienda de doña Rosa abre a las seis.'], ['Vende pan, leche y huevos.'], ['Los sábados les fía a los vecinos.']] }, [
          ['Un texto puede ser corto: aquí hay tres oraciones.', { luz: [0, 1, 2] }],
          ['Cada oración afirma algo: eso es un dato.', { luz: [0], nota: { 0: 'dato' } }],
          ['Este dato dice qué vende la tienda.', { luz: [1], nota: { 1: 'dato' } }],
          ['Y este dice cuándo fía y a quién.', { luz: [2], nota: { 2: 'dato' } }],
          ['Una pregunta literal pide un dato que está escrito.', {}],
          ['Leer con lupa es buscar ese dato, palabra por palabra.', {}],
        ], 'Un dato es lo que el texto afirma; la pregunta literal lo pide tal cual.'),
        xpHaz('hoja', 'Pregunta: **¿quién** viaja gratis? Subraya la oración que lo responde.', { modo: 'toca', meta: [2], paras: [['El bus a Girardot sale cada hora.'], ['El pasaje cuesta 35 000 pesos.'], ['Los niños menores de cinco años no pagan.']], pista: 'Esa oración habla del horario o del precio. Busca la que dice quién no paga.' }, 'La respuesta está escrita: los niños menores de cinco años.')],
      ['Desde cero: oración y párrafo',
        xpMira('hoja', 'Otra pieza básica: la **oración** y el **párrafo**. Con ellas se arma todo texto.', { paras: [['Mi barrio tiene una cancha.', 'Allí juegan los niños por la tarde.'], ['El año pasado se dañó la malla.', 'Los vecinos hicieron una rifa para arreglarla.']] }, [
          ['Una oración empieza con mayúscula y termina en punto.', { luz: [0] }],
          ['Esta es otra oración: dice algo más.', { luz: [1] }],
          ['Juntas forman un párrafo: las dos hablan de la cancha.', { luz: [0, 1], nota: { 0: 'párrafo 1' } }],
          ['Con el punto aparte empieza otro párrafo.', { luz: [2], nota: { 1: 'párrafo 2' } }],
          ['Este segundo párrafo cuenta un problema y su arreglo.', { luz: [2, 3] }],
        ], 'Oración: una idea con su punto. Párrafo: varias oraciones sobre lo mismo.'),
        xpHaz('hoja', 'Pon al margen de qué habla cada párrafo.', { modo: 'margen', rotulos: ['lo que cambió', 'cómo es el lugar'], meta: [1, 0], paras: [['La biblioteca queda junto al parque.', 'Tiene dos pisos.'], ['En enero pintaron las paredes.', 'También cambiaron las sillas.']], pista: 'Alguno no va ahí: uno describe el lugar y otro cuenta lo que se hizo.' }, 'Uno describe y el otro cuenta un cambio.')],
    ],
    despues: [
      ['Más difícil: cierto, pero no está',
        xpMira('hoja', 'Un paso más: la opción más peligrosa es la que **es verdad en el mundo**, pero el texto no la dice.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El café crece mejor a la sombra de árboles altos, que lo protegen del sol fuerte.'], ['La sombra protege al café del sol fuerte.'], ['Colombia vende mucho café a otros países.'], ['El café nunca crece al sol.']] }, [
          ['Arriba, el texto. Abajo, tres opciones.', { luz: [0] }],
          ['La primera dice lo mismo con otras palabras.', { luz: [1], nota: { 1: 'lo dice' } }],
          ['La segunda es cierta en el mundo, pero el texto no la dice.', { luz: [2], tacha: [2], nota: { 2: 'no está' } }],
          ['La tercera usa «nunca»: el texto dice «mejor», no «solo».', { luz: [3], tacha: [3], nota: { 3: 'exagera' } }],
          ['Palabras como nunca, siempre y todos piden una prueba igual de fuerte.', {}],
        ], 'Que algo sea verdad en el mundo no basta: tiene que estar en el texto.'),
        xpHaz('hoja', 'Texto: «La guadua crece rápido y se usa para construir casas en el Eje Cafetero». **Tacha** las dos que el texto no dice.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [1, 2], paras: [['La guadua sirve para construir.'], ['La guadua es la planta más rápida del mundo.'], ['La guadua es más barata que el ladrillo.']], pista: 'Una de las tachadas sí está en el texto, dicha de otra forma.' }, 'Lo del mundo entero y lo del ladrillo nadie lo escribió.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la pregunta literal empieza con «Según el texto…». Las opciones falsas casi siempre **suenan bien**.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['En la vereda, la escuela tiene una sola maestra. Ella enseña a los cinco grados en el mismo salón, por turnos.'], ['La maestra enseña a varios grados en un salón.'], ['La escuela necesita más maestras.'], ['Todos los niños de la vereda estudian allí.'], ['Los cinco grados tienen salones distintos.']] }, [
        ['La pregunta: según el texto, ¿qué es cierto de la escuela?', { luz: [0] }],
        ['B puede ser verdad, pero el texto no lo dice: es una opinión.', { luz: [2], nota: { 2: 'no está' } }],
        ['C usa «todos»: el texto no habla de todos los niños.', { luz: [3], nota: { 3: 'absoluto' } }],
        ['D usa las palabras del texto, pero dice lo contrario.', { luz: [4], nota: { 4: 'lo cambia' } }],
        ['A dice lo mismo con otras palabras: esa es.', { luz: [1], nota: { 1: 'lo dice' } }],
        ['Antes de elegir, señala en el texto la frase que la respalda.', { luz: [0, 1] }],
      ], 'La correcta se puede señalar en el texto; las trampas suenan bien, pero no.'),
      xpHaz('hoja', 'Texto: «El mercado campesino llega a la plaza cada quince días, con frutas de seis veredas». Según el texto, ¿qué es cierto?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El mercado es más barato que el supermercado.'], ['Llega todas las semanas.'], ['Trae frutas de varias veredas.'], ['Todas las frutas del pueblo vienen de ahí.']], pista: 'Esa opción suena posible, pero no la puedes señalar en el texto. Busca la que repite el dato con otras palabras.' }, 'Seis veredas son varias: el dato está escrito.')],
    cierre: 'Señala el dato en el texto, mira qué hace cada párrafo y desconfía de lo que suena bien pero no está.',
  });

  xpAmplia('icf-lc-literal-2', {
    conecta: 'icf-lc-literal-1',
    desde: [
      ['Desde cero: contexto y referente',
        xpMira('hoja', 'Antes de las palabras difíciles: una palabra puede tener **varios sentidos**, y algunas palabras solo **apuntan** a otras.', { paras: [['Juan', 'tomó', 'el bus.'], ['Juan', 'tomó', 'una decisión.'], ['Juan', 'lo', 'perdió por llegar tarde.']] }, [
          ['En la lección de datos del texto viste que la respuesta se señala, no se recuerda.', {}],
          ['Aquí «tomó» significa subirse al bus.', { luz: [1, 2], nota: { 0: 'se subió' } }],
          ['Aquí la misma palabra significa decidir.', { luz: [4, 5], nota: { 1: 'decidió' } }],
          ['El sentido depende de las palabras vecinas: eso es el contexto.', { luz: [1, 4] }],
          ['«Lo» no dice nada solo: apunta al bus, su referente.', { luz: [7], sello: { 7: 'el bus' } }],
          ['Contexto para el sentido; referente para lo que se apunta.', {}],
        ], 'Contexto: las palabras vecinas dan el sentido. Referente: aquello a lo que apunta un «lo» o un «ella».'),
        xpHaz('hoja', '«Marta compró una mesa y la pintó de verde». Subraya el **referente** de «la».', { modo: 'toca', meta: [2], paras: [['Marta', 'compró', 'una mesa', 'y la pintó de verde.']], pista: 'Pon cada opción en lugar de «la»: ¿qué se pinta de verde?' }, 'Lo que se pinta de verde es la mesa.')],
    ],
    despues: [
      ['Más difícil: el sinónimo que no encaja',
        xpMira('hoja', 'Un paso más: un sinónimo de diccionario puede **romper** la oración. Siempre se prueba en el texto.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El equipo', 'sufrió', 'una dura', 'derrota.'], ['El equipo sufrió una rígida derrota.'], ['El equipo sufrió una lenta derrota.'], ['El equipo sufrió una dolorosa derrota.']] }, [
          ['Te piden cambiar «dura» sin cambiar el sentido.', { luz: [2] }],
          ['«Rígida» es sinónimo de dura, pero de una piedra.', { luz: [4], tacha: [4], nota: { 1: 'otro sentido' } }],
          ['«Lenta» cabe en la oración, pero dice otra cosa.', { luz: [5], tacha: [5], nota: { 2: 'cambia' } }],
          ['En una derrota, «dura» habla de dolor, no de algo sólido.', { luz: [2] }],
          ['«Dolorosa» conserva lo que la oración quería decir.', { luz: [6], nota: { 3: 'encaja' } }],
        ], 'El sinónimo correcto es el que sirve en esa oración, no en el diccionario.'),
        xpHaz('hoja', '«La empresa **despidió** a veinte trabajadores». Subraya lo que significa en esta oración.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Les dijo adiós.'], ['Los sacó del empleo.'], ['Los acompañó a la puerta.']], pista: 'Esa opción es otro sentido de «despedir», el de las visitas. Piensa en un trabajo.' }, 'Con «trabajadores» al lado, despedir es quitar el empleo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el texto, la palabra X puede reemplazarse por…» o «la expresión Y se refiere a…».', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['La junta pidió arreglar la vía. El municipio aceptó, pero la obra se frenó por falta de plata.'], ['se detuvo'], ['se calmó'], ['se aceleró'], ['se canceló para siempre']] }, [
        ['La pregunta: ¿qué palabra puede reemplazar a «frenó»?', { luz: [0] }],
        ['B sirve para calmar a una persona brava, no para una obra.', { luz: [2], nota: { 2: 'otro sentido' } }],
        ['C dice lo contrario: sentido opuesto en la misma oración.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D exagera: el texto no dice que no vuelva a empezar.', { luz: [4], nota: { 4: 'absoluto' } }],
        ['A conserva el sentido: la obra se detuvo.', { luz: [1], nota: { 1: 'encaja' } }],
        ['Método: lee la oración con cada opción y escucha si cambia.', {}],
      ], 'Pon cada opción en la oración: la que no cambia el sentido es la buena.'),
      xpHaz('hoja', '«La rectora habló con los padres. Ellos le contaron que el bus llega tarde». Subraya a quién se refiere «ellos».', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['A la rectora'], ['A los padres'], ['Al bus'], ['A los niños del bus']], pista: '«Ellos» es masculino y plural: busca quién se nombró antes y cabe en esa forma.' }, 'Los padres son los únicos nombrados en masculino plural.')],
    cierre: 'Prueba cada palabra en su oración, busca el referente hacia atrás y no te fíes del sinónimo del diccionario.',
  });
}
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
//#archivo js/explora-icf-lc-2-pasos.js
// Preicfes · Lectura Crítica, mundo 2 «Cómo se Arma un Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): función de un
// fragmento, conector y voz definidos desde cero; luego el caso que despista y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-estructura-1', {
    conecta: 'icf-lc-literal-1',
    desde: [
      ['Desde cero: el texto es un equipo',
        xpMira('hoja', 'Antes de las palabras difíciles: un texto es como un equipo de fútbol. Cada **párrafo** juega en una posición distinta.', { paras: [['La cancha del barrio no tiene luz.'], ['Por eso nadie juega después de las seis.'], ['Si se ponen dos lámparas, se podría jugar de noche.']] }, [
          ['En la lección de datos del texto viste que cada párrafo tiene un oficio.', {}],
          ['Como en un equipo: uno defiende, otro arma y otro ataca.', {}],
          ['Este párrafo presenta la situación.', { luz: [0], nota: { 0: 'situación' } }],
          ['Este cuenta lo que pasa por esa situación.', { luz: [1], nota: { 1: 'consecuencia' } }],
          ['Y este propone una salida.', { luz: [2], nota: { 2: 'propuesta' } }],
          ['A ese papel de cada parte se le llama su función.', {}],
        ], 'La función de un párrafo es el papel que cumple dentro del texto.'),
        xpHaz('hoja', 'Pon al margen la función de cada párrafo.', { modo: 'margen', rotulos: ['propuesta', 'situación', 'consecuencia'], meta: [1, 2, 0], paras: [['El puesto de salud abre solo los martes.'], ['Así que muchos enfermos viajan dos horas.'], ['Abrirlo tres días evitaría esos viajes.']], pista: 'Alguno no va ahí: busca «así que» y lo que «evitaría».' }, '«Así que» trae la consecuencia y «evitaría» propone.')],
    ],
    despues: [
      ['Más difícil: función no es tema',
        xpMira('hoja', 'Un paso más: preguntar por la función **no** es preguntar de qué habla, sino **para qué está** ese fragmento.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Las motos deberían pagar menos peaje: ocupan menos vía. Mi primo, por ejemplo, paga lo mismo que un camión.'], ['Habla de un primo y un camión.'], ['Da un caso que apoya la propuesta.'], ['Concluye el texto.']] }, [
          ['Te preguntan por la oración del primo.', { luz: [0] }],
          ['La a dice de qué habla, no qué hace.', { luz: [1], tacha: [1], nota: { 1: 'solo el tema' } }],
          ['La c no sirve: va al final, pero no recoge nada.', { luz: [3], tacha: [3], nota: { 3: 'no cierra' } }],
          ['«Por ejemplo» delata su oficio: muestra un caso.', { luz: [0] }],
          ['Y ese caso apoya lo que se propone.', { luz: [2], nota: { 2: 'su función' } }],
        ], 'Función es para qué está. Se responde con un verbo: muestra, apoya, objeta, concluye.'),
        xpHaz('hoja', '«Hay que proteger a las abejas. Sin ellas, el café daría menos fruto». ¿Qué función cumple la segunda oración?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Habla del café.'], ['Da una razón para la primera.'], ['Cambia de tema.']], pista: 'Esa dice de qué habla o no mira la primera oración. Pregunta para qué está.' }, 'Responde por qué hay que protegerlas: es una razón.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el texto, la oración 3 cumple la función de…». Mira qué hace frente a lo anterior.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['(1) Muchos creen que leer en el celular no es leer. (2) Sin embargo, los mensajes y las noticias también son textos. (3) Claro, un libro pide más atención que un chat.'], ['presentar una idea que el autor comparte'], ['reconocer un límite de lo que el autor defiende'], ['dar un ejemplo de un libro'], ['concluir que los libros sobran']] }, [
        ['La pregunta: ¿qué función cumple la oración 3?', { luz: [0] }],
        ['A falla: el autor no comparte la idea del comienzo, la discute.', { luz: [1], nota: { 1: 'al revés' } }],
        ['C repite la palabra «libro», pero la oración no da un ejemplo.', { luz: [3], nota: { 3: 'misma palabra' } }],
        ['D dice algo que el texto nunca afirma.', { luz: [4], nota: { 4: 'no está' } }],
        ['«Claro» concede: el autor acepta una parte del otro lado.', { luz: [2], nota: { 2: 'concede' } }],
      ], 'La función se ve en la palabra que abre el fragmento y en su relación con lo anterior.'),
      xpHaz('hoja', '«Que el mercado abra de noche: así comprarán los que trabajan. Mi vecina sale a las siete y no alcanza». ¿Qué función cumple la última oración?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Propone abrir de noche.'], ['Muestra un caso que apoya la propuesta.'], ['Presenta una objeción.'], ['Concluye que el mercado debe cerrar.']], pista: 'Esa confunde lo que propone el texto con lo que hace esta oración. Mira si da un caso.' }, 'La vecina es un caso que apoya abrir de noche.')],
    cierre: 'Pregunta para qué está cada parte: dato, problema, propuesta, objeción o ejemplo.',
  });

  xpAmplia('icf-lc-estructura-2', {
    conecta: 'icf-lc-literal-2',
    desde: [
      ['Desde cero: qué es un conector',
        xpMira('hoja', 'Antes de las palabras difíciles: un **conector** es una palabra que une dos ideas, como una bisagra une la puerta y la pared.', { paras: [['Hizo sol', 'y', 'fuimos al río.'], ['Hizo sol,', 'pero', 'no fuimos al río.'], ['Hizo sol,', 'por eso', 'fuimos al río.']] }, [
          ['En la lección de palabras y referencias viste que «sin embargo» opone.', {}],
          ['Las tres oraciones empiezan igual: hizo sol.', { luz: [0, 3, 6] }],
          ['«Y» solo suma: pasó una cosa y otra.', { luz: [1], nota: { 0: 'suma' } }],
          ['«Pero» avisa que pasó algo inesperado.', { luz: [4], nota: { 1: 'opone' } }],
          ['«Por eso» dice que una cosa llevó a la otra.', { luz: [7], nota: { 2: 'consecuencia' } }],
          ['Cambia el conector y cambia la relación entre las ideas.', {}],
        ], 'El conector dice la relación entre dos ideas: suma, opone, causa o resultado.'),
        xpHaz('hoja', 'Pon al margen qué relación hace cada conector.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['opone', 'suma', 'resultado'], meta: [1, 0, 2], paras: [['Llegó temprano y saludó a todos.'], ['Llegó temprano, pero la puerta estaba cerrada.'], ['Llegó temprano, así que consiguió puesto.']], pista: 'Alguno no va ahí: tapa el conector y di qué pasa entre las dos ideas.' }, '«Y» suma, «pero» opone y «así que» trae el resultado.')],
    ],
    despues: [
      ['Más difícil: mismas palabras, otra relación',
        xpMira('hoja', 'Un paso más: la trampa favorita usa **las mismas palabras** del texto y les cambia la relación.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El pueblo creció porque llegó la carretera.'], ['La carretera llegó porque el pueblo creció.'], ['Llegó la carretera y, por eso, el pueblo creció.'], ['El pueblo creció, aunque llegó la carretera.']] }, [
          ['En el texto, la carretera es la causa.', { luz: [0], nota: { 0: 'causa: carretera' } }],
          ['La a usa las mismas palabras, pero voltea causa y efecto.', { luz: [1], tacha: [1], nota: { 1: 'al revés' } }],
          ['La b dice lo mismo con otro conector de la misma familia.', { luz: [2], nota: { 2: 'mismo sentido' } }],
          ['La c pone «aunque»: como si la carretera estorbara.', { luz: [3], tacha: [3], nota: { 3: 'otra relación' } }],
          ['Antes de elegir, di en voz baja qué causa qué.', {}],
        ], 'Revisa la flecha: qué causa qué y qué se opone a qué. Las palabras iguales engañan.'),
        xpHaz('hoja', 'Texto: «Bajaron las ventas, ya que subió el precio». **Tacha** las dos que cambian la relación.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Subió el precio porque bajaron las ventas.'], ['Subió el precio; por eso bajaron las ventas.'], ['Bajaron las ventas, aunque subió el precio.']], pista: 'Alguna de las tachadas dice lo mismo que el texto. Busca cuál pone el precio como causa.' }, 'Solo una deja el precio como causa de las ventas bajas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué conector completa el texto?» o «¿qué relación hay entre las dos oraciones?».', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['La tienda bajó los precios. ___, vendió menos que el mes pasado.'], ['Por lo tanto'], ['Sin embargo'], ['Es decir'], ['Por ejemplo']] }, [
        ['Lee lo que se espera: bajar precios debería subir las ventas.', { luz: [0] }],
        ['Pero vendió menos: pasó lo contrario de lo esperado.', { luz: [0], nota: { 0: 'choque' } }],
        ['A trae un resultado: diría que bajar precios hizo vender menos.', { luz: [1], nota: { 1: 'resultado' } }],
        ['C aclara y D da un caso: ninguna opone.', { luz: [3, 4], nota: { 3: 'aclara', 4: 'un caso' } }],
        ['B opone: es la que marca el choque.', { luz: [2], nota: { 2: 'opone' } }],
      ], 'Primero di qué relación hay entre las ideas; después busca el conector que la nombra.'),
      xpHaz('hoja', '«Ese año llovió muy poco. ___, la cosecha de papa fue pequeña». Subraya el conector que completa el texto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['En cambio'], ['Aun así'], ['Por eso'], ['O sea']], pista: 'Ese conector opone o aclara. Aquí la segunda idea resulta de la primera.' }, 'La cosecha pequeña resulta de la poca lluvia.')],
    cierre: 'Di qué relación hay entre las ideas y escoge el conector que la nombra, sin dejarte llevar por palabras iguales.',
  });

  xpAmplia('icf-lc-estructura-3', {
    conecta: 'icf-lc-estructura-2',
    desde: [
      ['Desde cero: qué es una voz',
        xpMira('hoja', 'Antes de las palabras difíciles: la **voz** es quien dice cada idea. No siempre es quien escribe.', { paras: [['Escribo esto desde la tienda de mi papá.'], ['Él dice: «Los clientes ya no fían».'], ['La radio informa que subió el arroz.']] }, [
          ['En la lección de conectores viste que las palabras pequeñas marcan relaciones.', {}],
          ['Ahora la pregunta es otra: ¿quién dice cada cosa?', {}],
          ['«Escribo» es la voz de quien escribe el texto.', { luz: [0], nota: { 0: 'quien escribe' } }],
          ['Las comillas traen la voz del papá, con sus palabras.', { luz: [1], nota: { 1: 'el papá' } }],
          ['«Informa que» trae la voz de la radio, contada por otro.', { luz: [2], nota: { 2: 'la radio' } }],
          ['Un texto puede tener varias voces: hay que separarlas.', {}],
        ], 'Voz: quien dice cada idea. Las comillas y verbos como «dice» o «informa» la marcan.'),
        xpHaz('hoja', 'Subraya la idea que es de **quien escribe**, no de otra voz.', { modo: 'toca', meta: [1], paras: [['El médico dice que caminar ayuda.', 'Yo creo que bailar también ayuda.', 'Mi tía asegura que el café da energía.']], pista: 'Esa idea tiene otro dueño: mira el verbo «dice» o «asegura».' }, '«Yo creo» marca la voz de quien escribe.')],
    ],
    despues: [
      ['Más difícil: para qué se cita a alguien',
        xpMira('hoja', 'Un paso más: el autor cita a alguien **para algo**: apoyarse, discutirle o mostrar otra mirada.', { paras: [['«Las bibliotecas sobran», dijo un concejal.', 'Yo pienso lo contrario.'], ['«Aquí hice mis tareas», cuenta una exalumna.', 'Por eso hay que cuidarla.']] }, [
          ['Aquí cita al concejal para discutirle.', { luz: [0, 1], nota: { 0: 'para discutirle' } }],
          ['Cuidado: la idea de que sobran no es del autor.', { luz: [0], sello: { 0: 'del concejal' } }],
          ['Aquí cita a la exalumna para apoyarse.', { luz: [2, 3], nota: { 1: 'para apoyarse' } }],
          ['La cita da un caso que sostiene lo que el autor pide.', { luz: [3] }],
          ['Pregunta siempre: ¿el autor está de acuerdo con quien cita?', {}],
        ], 'Citar no es estar de acuerdo: mira si el autor se apoya en la cita o la discute.'),
        xpHaz('hoja', '«Un vecino dijo: “El parque es peligroso”. Pero desde que hay luces, juegan ahí cien niños». ¿Para qué se cita al vecino?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Para apoyar que el parque es peligroso.'], ['Para presentar una idea que el autor discute.'], ['Para contar quién cuida el parque.']], pista: 'Mira qué viene después de «pero».' }, 'El «pero» muestra que el autor no está de acuerdo con el vecino.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Según el autor…» en un texto con varias voces. La trampa es darle al autor la idea de otro.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Para algunos padres, el celular en el colegio distrae. La rectora, en cambio, dice que bien usado ayuda a investigar. Yo creo que lo importante es enseñar a usarlo.'], ['el celular distrae'], ['el celular ayuda a investigar'], ['hay que enseñar a usar el celular'], ['hay que prohibir el celular']] }, [
        ['La pregunta: según el autor, ¿qué es lo importante?', { luz: [0] }],
        ['A es la idea de algunos padres, no del autor.', { luz: [1], nota: { 1: 'de los padres' } }],
        ['B es de la rectora: «dice que» se la da a ella.', { luz: [2], nota: { 2: 'de la rectora' } }],
        ['D no la dice nadie en el texto.', { luz: [4], nota: { 4: 'no está' } }],
        ['«Yo creo» marca la voz del autor: es la C.', { luz: [3], nota: { 3: 'del autor' } }],
      ], 'Antes de responder «según el autor», busca la marca de su voz: yo creo, pienso, considero.'),
      xpHaz('hoja', '«El entrenador asegura que el equipo está listo. Los hinchas dudan. Yo pienso que falta un buen arquero». Según el autor, ¿qué pasa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El equipo está listo.'], ['Nadie confía en el equipo.'], ['Al equipo le falta un buen arquero.'], ['El equipo va a perder la final.']], pista: 'Esa idea es de otra voz o no la dice nadie. Busca la marca «yo pienso».' }, '«Yo pienso» es la voz del autor: falta un arquero.')],
    cierre: 'Separa las voces, pregunta para qué se cita a cada una y dale al autor solo lo que él dice.',
  });
}
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
//#archivo js/explora-icf-lc-3-pasos.js
// Preicfes · Lectura Crítica, mundo 3 «Tesis y Argumentos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): argumento, tesis,
// premisa y peso de una razón definidos desde cero; luego la tesis que llega al final, lo que fortalece sin parecerlo y las trampas
// del examen (tema frente a tesis, lo que habla del tema pero no pesa). Textos breves propios.
{
  xpAmplia('icf-lc-argumento-1', {
    conecta: 'icf-lc-estructura-1',
    desde: [
      ['Desde cero: qué es argumentar',
        xpMira('hoja', 'Antes de las palabras difíciles: **argumentar** es dar razones para que otro acepte una idea. Lo haces cuando pides permiso para salir.', { paras: [['Ma, déjame ir al paseo.'], ['Ya hice las tareas.'], ['Va la profesora y volvemos a las cinco.']] }, [
          ['En la lección de la función del párrafo viste que cada parte tiene un oficio.', {}],
          ['Aquí hay un oficio nuevo: convencer a alguien.', {}],
          ['Lo que se quiere lograr es la tesis: ir al paseo.', { luz: [0], nota: { 0: 'tesis' } }],
          ['Lo que se da para lograrlo son las razones.', { luz: [1, 2], nota: { 1: 'razón', 2: 'razón' } }],
          ['Tesis más razones forman un argumento.', { luz: [0, 1, 2] }],
          ['Si nadie pudiera estar en desacuerdo, no haría falta argumentar.', {}],
        ], 'Argumento: una tesis (lo que se quiere que aceptes) y las razones que la apoyan.'),
        xpHaz('hoja', 'Subraya la **tesis**: lo que se quiere que aceptes.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El parque necesita canecas.'], ['La gente bota la basura en el pasto.'], ['Los perros riegan las bolsas.']], pista: 'Esa es una razón: responde por qué. Busca lo que se pide.' }, 'Las otras dos responden por qué hacen falta las canecas.')],
    ],
    despues: [
      ['Más difícil: la tesis que llega al final',
        xpMira('hoja', 'Un paso más: las razones también se llaman **premisas**. Y la tesis no siempre va al comienzo: a veces llega de última.', { paras: [['Los buses pasan llenos a las seis.'], ['Muchos estudiantes llegan tarde a primera hora.'], ['A las seis y media pasa un bus vacío.'], ['Por eso, el colegio debería entrar media hora después.']] }, [
          ['Premisa: una afirmación que sirve de base a otra.', {}],
          ['Estas tres son premisas: dan datos.', { luz: [0, 1, 2], nota: { 0: 'premisa', 1: 'premisa', 2: 'premisa' } }],
          ['«Por eso» anuncia lo que se concluye de ellas.', { luz: [3] }],
          ['Esa es la tesis, aunque llegue de última.', { luz: [3], nota: { 3: 'tesis' } }],
          ['Busca lo que se pide; no te fíes del lugar.', {}],
        ], 'Premisa: la base. Tesis: lo que se concluye y se pide, esté donde esté.'),
        xpHaz('hoja', 'Subraya la **tesis** de este texto.', { modo: 'toca', meta: [2], paras: [['En la vereda no hay señal.', 'Los niños no pueden hacer tareas en línea.', 'La alcaldía debería poner una antena.', 'Ya lo hizo el pueblo vecino.']], pista: 'Esa es una premisa: da un dato. Busca la que pide algo que se puede discutir.' }, '«Debería» pide algo: esa es la tesis, aunque no esté al final.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Cuál es la tesis del texto?». La trampa más común es una opción que dice **el tema**.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Las ciclorrutas se llenan de motos. Los ciclistas tienen que bajarse a la calle. La ciudad debe multar a las motos que las usen.'], ['las ciclorrutas de la ciudad'], ['las motos ocupan las ciclorrutas'], ['la ciudad debe multar a las motos que usan las ciclorrutas'], ['las motos deben desaparecer']] }, [
        ['La pregunta: ¿cuál es la tesis del texto?', { luz: [0] }],
        ['A es el tema: de qué se habla, sin afirmar nada.', { luz: [1], nota: { 1: 'tema' } }],
        ['B es una premisa: un dato que sostiene la tesis.', { luz: [2], nota: { 2: 'premisa' } }],
        ['D exagera: el texto no pide eso.', { luz: [4], nota: { 4: 'exagera' } }],
        ['C es lo que se pide y se puede discutir: la tesis.', { luz: [3], nota: { 3: 'tesis' } }],
      ], 'Tesis: lo que el autor defiende. No es el tema ni un dato de apoyo.'),
      xpHaz('hoja', '«En el pueblo no hay dónde reciclar. Las bolsas terminan en la quebrada. El municipio debe poner puntos de reciclaje». ¿Cuál es la tesis?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El reciclaje en el pueblo.'], ['Las bolsas terminan en la quebrada.'], ['El municipio debe poner puntos de reciclaje.'], ['Nadie en el pueblo recicla.']], pista: 'Esa es el tema, un dato o una exageración. Busca lo que se pide.' }, 'Lo que se pide al municipio es la tesis.')],
    cierre: 'La tesis es lo que se defiende; las premisas la sostienen; el tema solo dice de qué se habla.',
  });

  xpAmplia('icf-lc-argumento-2', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: un argumento se puede pesar',
        xpMira('hoja', 'Antes de las palabras difíciles: un argumento es como una mesa. Las razones son las patas, y unas sostienen más que otras.', { letras: ['tesis', 'a', 'b'], paras: [['Esta tienda es la más barata del barrio.'], ['Comparé diez productos y aquí costaban menos.'], ['Me lo dijo el dueño.']] }, [
          ['En la lección de tesis y razones viste que la razón responde «por qué».', {}],
          ['Arriba está la tesis que se defiende.', { luz: [0] }],
          ['Comparar diez productos es una pata firme.', { luz: [1], nota: { 1: 'firme' } }],
          ['Que lo diga el dueño es una pata débil: a él le conviene.', { luz: [2], nota: { 2: 'débil' } }],
          ['Fortalecer es poner una pata más firme; debilitar, aflojar una.', {}],
        ], 'Una razón pesa más si se puede comprobar y si quien la da no gana nada.'),
        xpHaz('hoja', 'Tesis: «La nueva cancha sintética atrae más gente». Subraya la razón más **firme**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El entrenador dice que se ve bonita.'], ['Antes iban 40 personas al mes; ahora van 120.'], ['La cancha es verde.']], pista: 'Esa no se puede comprobar o no responde por qué. Busca algo que se cuente.' }, 'Contar a la gente antes y después es una pata firme.')],
    ],
    despues: [
      ['Más difícil: descartar la otra causa',
        xpMira('hoja', 'Un paso más: también **fortalece** descartar otra causa. Si quitas la duda, la tesis queda más firme.', { letras: ['tesis', 'a', 'b', 'c'], paras: [['Las clases de música subieron las notas de matemáticas.'], ['Los de música también tenían más horas de tutoría.'], ['Los dos grupos tenían las mismas tutorías.'], ['La profesora de música es nueva.']] }, [
          ['Arriba está la tesis.', { luz: [0] }],
          ['La a trae otra causa posible: debilita.', { luz: [1], nota: { 1: 'debilita' } }],
          ['La b quita esa duda: los grupos eran iguales en tutorías.', { luz: [2], nota: { 2: 'fortalece' } }],
          ['Sin otra diferencia, la música queda como explicación.', { luz: [0, 2] }],
          ['La c no cambia nada: no pesa.', { luz: [3], nota: { 3: 'no pesa' } }],
        ], 'Debilita lo que trae otra causa; fortalece lo que la descarta.'),
        xpHaz('hoja', 'Tesis: «El nuevo horario de la ruta bajó las llegadas tarde». Subraya el dato que la **fortalece**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ese mes abrieron un puente que acorta el camino.'], ['En ese tiempo no cambió nada más en el colegio ni en las vías.'], ['La ruta es amarilla.']], pista: 'Ese dato trae otra causa o no pesa. Busca el que descarta otras explicaciones.' }, 'Si nada más cambió, el horario queda como explicación.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Cuál afirmación **debilita** el argumento?». La trampa es la opción que habla del tema pero no pesa.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Desde que el barrio tiene cámaras, bajaron los robos. Las cámaras evitan el delito.'], ['Las cámaras son costosas.'], ['Ese mismo año llegó una patrulla fija al barrio.'], ['Los vecinos están contentos con las cámaras.'], ['Las cámaras nunca fallan.']] }, [
        ['La pregunta: ¿qué debilita la idea de que las cámaras evitan robos?', { luz: [0] }],
        ['A habla de las cámaras, pero el precio no cambia la causa.', { luz: [1], nota: { 1: 'no pesa' } }],
        ['C habla de gusto, no de robos: tampoco pesa.', { luz: [3], nota: { 3: 'no pesa' } }],
        ['D más bien apoya, y además es un absoluto.', { luz: [4], nota: { 4: 'apoya' } }],
        ['B trae otra causa posible: la patrulla. Esa debilita.', { luz: [2], nota: { 2: 'debilita' } }],
      ], 'Para debilitar una causa, busca otra explicación del mismo resultado.'),
      xpHaz('hoja', '«Los que desayunan bien sacan mejores notas. Desayunar mejora el estudio». ¿Qué debilita el argumento?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El desayuno tiene frutas.'], ['Los que desayunan bien también duermen más horas.'], ['Muchos colegios dan desayuno.'], ['Todos los que desayunan ganan el año.']], pista: 'Esa opción habla del desayuno, pero no cambia la causa. Busca otra explicación de las notas.' }, 'Dormir más es otra causa posible de las buenas notas.')],
    cierre: 'Pesa cada razón: lo comprobable sostiene, otra causa debilita y descartarla fortalece.',
  });
}
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
//#archivo js/explora-icf-lc-4-pasos.js
// Preicfes · Lectura Crítica, mundo 4 «Textos Literarios», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): texto literario,
// narrador, personaje, sentido figurado, verso, estrofa y voz poética definidos desde cero; luego el narrador que sabe poco, la
// figura que cambia con el contexto, el tono que choca con las palabras y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-literario-1', {
    conecta: 'icf-lc-estructura-3',
    desde: [
      ['Desde cero: qué es un texto literario',
        xpMira('hoja', 'Antes de las palabras difíciles: un **texto literario** inventa un mundo con palabras: un cuento, una novela, un poema.', { paras: [['Una noticia: «El martes llovió en Pasto».'], ['Un cuento: «Esa tarde la lluvia llegó a Pasto buscando a alguien».']] }, [
          ['En la lección de voces viste que no siempre habla quien escribe.', {}],
          ['La noticia informa un hecho real.', { luz: [0], nota: { 0: 'informa' } }],
          ['El cuento inventa: la lluvia busca a alguien.', { luz: [1], nota: { 1: 'inventa' } }],
          ['En un cuento, la voz que cuenta se llama narrador.', { luz: [1] }],
          ['Los seres a quienes les pasa la historia son los personajes.', {}],
          ['Y lo que les pasa, en orden, es la trama.', {}],
        ], 'Literatura: un mundo inventado. Narrador: quien cuenta. Personajes: a quienes les pasa.'),
        xpHaz('hoja', 'Pon al margen qué es cada parte del cuento.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['personaje', 'narrador', 'trama'], meta: [1, 0, 2], paras: [['«Yo lo vi todo desde la ventana».'], ['Don Tulio, el zapatero del barrio.'], ['Perdió su martillo, lo buscó y lo encontró.']], pista: 'Alguno no va ahí: ¿quién cuenta, a quién le pasa y qué pasa?' }, 'El «yo» cuenta, don Tulio vive la historia y lo que pasa es la trama.')],
    ],
    despues: [
      ['Más difícil: el narrador que sabe poco',
        xpMira('hoja', 'Un paso más: un narrador puede **equivocarse** o saber poco. Lo que él cree no siempre es lo que pasó.', { paras: [['Yo tenía seis años y estaba seguro:'], ['papá se iba cada lunes porque le gustaba el bus.'], ['Volvía cansado, con olor a cemento y las manos rotas.']] }, [
          ['Narra un niño de seis años.', { luz: [0], nota: { 0: 'narrador niño' } }],
          ['Él cree que el papá viaja por gusto.', { luz: [1], nota: { 1: 'lo que cree' } }],
          ['Pero las pistas dicen otra cosa: cemento y manos rotas.', { luz: [2], nota: { 2: 'las pistas' } }],
          ['El lector entiende más que el narrador: el papá trabaja duro.', { luz: [1, 2] }],
          ['No confundas lo que cree el narrador con lo que muestra el texto.', {}],
        ], 'Si el narrador sabe poco, las pistas dicen más que sus palabras.'),
        xpHaz('hoja', '«Mi hermana dice que ya no le gusta bailar. Cada noche, con la puerta cerrada, se oye música y el piso cruje». Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Odia la música.'], ['Sigue bailando a escondidas.'], ['El piso está dañado.']], pista: 'Junta lo que dice la hermana con lo que se oye cada noche.' }, 'Lo que hace contradice lo que dice: sigue bailando.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Del personaje se puede afirmar que…». La buena sale de **lo que hace**, no de lo que dicen de él.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Todos llamaban a Rubiela «la brava». Pero cuando el perro del vecino se enfermó, ella pasó la noche cuidándolo y nunca lo contó.'], ['Es brava, como dicen todos.'], ['Es cariñosa, aunque no lo muestre.'], ['Es veterinaria.'], ['Odia a los vecinos.']] }, [
        ['La pregunta: ¿qué se puede afirmar de Rubiela?', { luz: [0] }],
        ['A repite lo que dicen otros, no lo que ella hace.', { luz: [1], nota: { 1: 'lo que dicen' } }],
        ['C inventa un oficio que el texto no menciona.', { luz: [3], nota: { 3: 'no está' } }],
        ['D contradice lo que hizo por el perro del vecino.', { luz: [4], nota: { 4: 'al revés' } }],
        ['B sale de sus actos: cuida y no lo cuenta.', { luz: [2], nota: { 2: 'se deduce' } }],
      ], 'El personaje se conoce por sus actos; las opiniones de otros pueden ser la trampa.'),
      xpHaz('hoja', '«Mi abuela guardaba las cartas del abuelo en una caja. Nunca la abría, pero la limpiaba cada día». Subraya lo que se deduce de la abuela.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Tenía muchas cajas.'], ['Las cartas no le importaban.'], ['Cuidaba un recuerdo valioso.'], ['El abuelo vivía con ella.']], pista: 'Junta las dos acciones: no abrirla y limpiarla cada día.' }, 'Limpiar la caja cada día muestra que el recuerdo le importa.')],
    cierre: 'Distingue autor y narrador, mira lo que hacen los personajes y compara el comienzo con el final.',
  });

  xpAmplia('icf-lc-literario-2', {
    conecta: 'icf-lc-literario-1',
    desde: [
      ['Desde cero: literal y figurado',
        xpMira('hoja', 'Antes de las palabras difíciles: el **sentido literal** es lo que dicen las palabras tal cual; el **figurado**, lo que quieren decir.', { paras: [['Me muero de hambre.'], ['Ese examen fue un hueso.'], ['Mi mamá tiene un corazón de oro.']] }, [
          ['En la lección del narrador viste que las pistas dicen más que las palabras.', {}],
          ['Nadie se muere por almorzar tarde: es una manera de hablar.', { luz: [0], nota: { 0: 'mucha hambre' } }],
          ['Un examen no es un hueso: se dice que fue difícil.', { luz: [1], nota: { 1: 'difícil' } }],
          ['Un corazón de oro no brilla: habla de bondad.', { luz: [2], nota: { 2: 'bondad' } }],
          ['Las usas a diario: se llaman figuras.', {}],
          ['Leer una figura es traducirla a lo que de verdad pasa.', {}],
        ], 'Literal: lo que dicen las palabras. Figurado: lo que quieren decir. Las figuras se traducen.'),
        xpHaz('hoja', 'Pon al margen qué quiere decir cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['está muy cansado', 'es muy pequeño', 'está muy bravo'], meta: [1, 2, 0], paras: [['Ese apartamento es una caja de fósforos.'], ['Juan echa humo por las orejas.'], ['Llegué muerto del trabajo.']], pista: 'Alguno no va ahí: traduce cada frase a lo que pasa de verdad.' }, 'Una caja diminuta, humo de rabia y un cansancio enorme.')],
    ],
    despues: [
      ['Más difícil: la figura cambia con el contexto',
        xpMira('hoja', 'Un paso más: una figura no tiene un sentido fijo. El **contexto** de la historia decide qué quiere decir.', { paras: [['Cuando el hijo se fue, la casa quedó en invierno.'], ['Cuando nació la niña, se acabó el invierno de la casa.'], ['En Bogotá el invierno trae aguaceros.']] }, [
          ['Aquí «invierno» no habla del clima: habla de tristeza.', { luz: [0], nota: { 0: 'tristeza' } }],
          ['Aquí la misma imagen se cierra: volvió la alegría.', { luz: [1], nota: { 1: 'fin de la tristeza' } }],
          ['Y aquí «invierno» es literal: la temporada de lluvias.', { luz: [2], nota: { 2: 'literal' } }],
          ['La palabra es la misma; el contexto cambia el sentido.', { luz: [0, 2] }],
          ['Pregunta qué pasó en la historia cuando aparece la figura.', {}],
        ], 'El sentido de una figura sale de lo que pasa en la historia, no del diccionario.'),
        xpHaz('hoja', '«Después de la pelea, entre los dos hermanos se levantó un muro». Subraya lo que significa el muro.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Construyeron una pared en la casa.'], ['Dejaron de hablarse.'], ['Se volvieron más fuertes.']], pista: 'Esa lectura es literal o no sale de la pelea. ¿Qué pasa entre dos personas después de pelear?' }, 'El muro es la distancia que dejó la pelea.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «La expresión X tiene el mismo sentido que…». Hay que traducir la figura sin quedarse en sus palabras.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Desde que cerró la fábrica, el pueblo es un reloj parado».'], ['el pueblo tiene un reloj dañado'], ['en el pueblo la vida se detuvo'], ['el pueblo llega tarde a todo'], ['el pueblo desapareció']] }, [
        ['La pregunta: ¿qué quiere decir «un reloj parado»?', { luz: [0] }],
        ['A lo toma literal: la trampa de las mismas palabras.', { luz: [1], nota: { 1: 'literal' } }],
        ['C usa la idea de tiempo, pero cambia el sentido.', { luz: [3], nota: { 3: 'otro sentido' } }],
        ['D exagera: el pueblo sigue ahí, solo quieto.', { luz: [4], nota: { 4: 'exagera' } }],
        ['B traduce la figura: sin la fábrica, nada se mueve.', { luz: [2], nota: { 2: 'mismo sentido' } }],
      ], 'Traduce la figura a lo que pasó en la historia y busca la opción que lo diga.'),
      xpHaz('hoja', '«Cuando le dieron la noticia, a Marina se le vino el mundo encima». ¿Qué expresión tiene el mismo sentido?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Marina se cayó.'], ['Marina sintió un dolor enorme.'], ['Hubo un temblor.'], ['Marina se puso contenta.']], pista: 'Esa opción toma la frase al pie de la letra o le cambia el sentimiento.' }, 'Que el mundo se le venga encima es sentir un golpe enorme.')],
    cierre: 'Traduce cada figura a lo que pasa en la historia: el contexto decide su sentido.',
  });

  xpAmplia('icf-lc-literario-3', {
    conecta: 'icf-lc-literario-2',
    desde: [
      ['Desde cero: verso, estrofa y voz poética',
        xpMira('hoja', 'Antes de las palabras difíciles: un **poema** se escribe en renglones cortos, los **versos**. Un grupo de versos es una **estrofa**.', { paras: [['La lluvia toca el techo,', 'cuenta los días que faltan.'], ['Yo, desde la cama,', 'le contesto con mi calma.']] }, [
          ['En la lección de figuras viste que una imagen dice una cosa con otra.', {}],
          ['Cada renglón corto es un verso.', { luz: [0], nota: { 0: 'verso' } }],
          ['Los versos juntos forman una estrofa.', { luz: [0, 1], nota: { 0: 'estrofa 1' } }],
          ['Quien habla en el poema es la voz poética: aquí, un «yo».', { luz: [2], nota: { 1: 'voz poética' } }],
          ['La voz no es el poeta: es alguien que él inventa.', {}],
        ], 'Verso: un renglón. Estrofa: un grupo de versos. Voz poética: quien habla en el poema.'),
        xpHaz('hoja', '«Soy el bus de la última ruta, / llevo cansancio y canciones». Subraya quién es la **voz poética**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El poeta'], ['Un bus'], ['Los pasajeros']], pista: 'Busca quién dice «soy».' }, 'Habla un bus: el poeta le prestó la voz.')],
    ],
    despues: [
      ['Más difícil: el tono que choca con las palabras',
        xpMira('hoja', 'Un paso más: un poema puede hablar de algo alegre con un **tono** triste. En ese choque está el sentido.', { paras: [['Qué bonita la fiesta,'], ['todos bailan en la sala;'], ['yo cuido tu silla vacía'], ['por si vuelves a la casa.']] }, [
          ['Empieza alegre: una fiesta bonita.', { luz: [0, 1], nota: { 0: 'alegría' } }],
          ['El tercer verso cambia todo: una silla vacía.', { luz: [2], nota: { 2: 'ausencia' } }],
          ['La voz no baila: espera a alguien que no está.', { luz: [2, 3] }],
          ['El tono final es triste, aunque haya fiesta.', { luz: [3], nota: { 3: 'tono triste' } }],
          ['Tema: la ausencia en medio de la alegría de otros.', { luz: [0, 2] }],
        ], 'Cuando la alegría de afuera choca con la voz, el tono está en lo que siente la voz.'),
        xpHaz('hoja', '«Me regalaron un balcón frente al mar, / y yo, que no sé nadar, / lo miro de lejos, con miedo». Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Feliz'], ['Temeroso'], ['Burlón']], pista: 'Mira cómo dice la voz que mira el mar.' }, 'El regalo es bonito, pero la voz mira «con miedo».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En el poema, la voz poética…» o «el tono del poema es…». Las trampas confunden la voz con el poeta.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Soy la quebrada del pueblo: / me tiraron llantas y botellas, / y aun así les doy agua cada mañana».'], ['El poeta vive junto a una quebrada.'], ['La quebrada reprocha el daño, pero sigue dando.'], ['La quebrada está feliz con su basura.'], ['El poema enseña a reciclar llantas.']] }, [
        ['La pregunta: ¿qué expresa la voz poética?', { luz: [0] }],
        ['A confunde la voz con el poeta: aquí habla la quebrada.', { luz: [1], nota: { 1: 'no es el poeta' } }],
        ['C ignora el reproche: nadie está feliz con llantas encima.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D convierte el poema en una lección que no da.', { luz: [4], nota: { 4: 'no está' } }],
        ['B junta la queja y el «aun así»: esa es.', { luz: [2], nota: { 2: 'sí' } }],
      ], 'Pregunta quién habla, de qué se queja y qué cambia después de palabras como «aun así».'),
      xpHaz('hoja', '«Me fui del campo a la ciudad grande; / tengo luz, tengo ruido, tengo prisa, / y cada noche sueño con gallinas». ¿Qué expresa la voz?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Odia el campo.'], ['Extraña la vida del campo.'], ['Le encanta la prisa.'], ['El poeta cría gallinas.']], pista: 'Mira con qué sueña cada noche y qué viene después de tanto «tengo».' }, 'Tiene de todo, pero sueña con el campo: lo extraña.')],
    cierre: 'En un poema, pregunta quién habla, con qué tono y qué cambia cuando se rompe lo que se repite.',
  });
}
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
//#archivo js/explora-icf-lc-5-pasos.js
// Preicfes · Lectura Crítica, mundo 5 «Textos Filosóficos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): filosofía, concepto,
// definición y contraejemplo desde cero; luego lo que el autor expone para tumbarlo, la palabra que redefine y las trampas del examen
// (estrategia argumentativa, sinónimo de siempre frente a la definición del autor). Textos breves propios.
{
  xpAmplia('icf-lc-filosofico-1', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: qué es la filosofía',
        xpMira('hoja', 'Antes de las palabras difíciles: la **filosofía** se pregunta por lo que damos por hecho: qué es justo, qué es verdad, qué es un amigo.', { paras: [['¿Cuánto cuesta el pasaje del bus?'], ['¿Es justo que el pasaje cueste igual para todos?']] }, [
          ['En la lección de tesis viste que un argumento defiende una idea con razones.', {}],
          ['La primera pregunta se responde mirando la tarifa.', { luz: [0], nota: { 0: 'con un dato' } }],
          ['La segunda no: hay que pensar qué es justo.', { luz: [1], nota: { 1: 'filosófica' } }],
          ['Un texto filosófico responde esas preguntas con argumentos.', {}],
          ['Por eso tiene tesis, razones y objeciones, como ya viste.', {}],
        ], 'La filosofía pregunta por lo que damos por hecho y responde con argumentos, no con datos.'),
        xpHaz('hoja', '**Tacha** las dos preguntas que se cierran con un dato.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['¿A qué hora abre el banco?'], ['¿Qué hace que una promesa obligue?'], ['¿Cuántos habitantes tiene Neiva?'], ['¿Es bueno decir siempre la verdad?']], pista: 'Alguna de las tachadas no se cierra averiguando un dato.' }, 'La hora y los habitantes se averiguan; las otras se piensan.')],
    ],
    despues: [
      ['Más difícil: lo que el autor expone para tumbarlo',
        xpMira('hoja', 'Un paso más: el filósofo expone ideas **para tumbarlas**. Un **contraejemplo** es el caso que muestra que una idea general falla.', { paras: [['Se dice que lo que hace la mayoría es lo correcto.'], ['Pero una vez la mayoría del salón se burló de un compañero.'], ['Entonces, que muchos lo hagan no lo vuelve correcto.']] }, [
          ['Primero, una idea general que el autor expone.', { luz: [0], nota: { 0: 'se expone' } }],
          ['Luego un caso que no encaja: el contraejemplo.', { luz: [1], nota: { 1: 'contraejemplo' } }],
          ['Con ese caso, la idea general cae.', { luz: [0], tacha: [0] }],
          ['Lo que el autor defiende está al final.', { luz: [2], nota: { 2: 'tesis' } }],
          ['Trampa: elegir la idea expuesta como si fuera del autor.', { luz: [0] }],
        ], 'Un contraejemplo tumba una idea general; lo que se expone para tumbarlo no es la tesis.'),
        xpHaz('hoja', '«Dicen que quien estudia mucho siempre gana. Mi hermano estudió noches enteras y perdió». Subraya el **contraejemplo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Quien estudia mucho siempre gana.'], ['El hermano estudió mucho y perdió.'], ['Estudiar de noche cansa.']], pista: 'Busca el caso que no cumple la idea general.' }, 'Un solo caso que no cumple basta para tumbar un «siempre».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué estrategia usa el autor?». Hay que nombrar **cómo** argumenta: caso imaginado, contraejemplo, definición.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Imagina que pudieras saber todo lo que piensan los demás. ¿Seguirías teniendo amigos? Tal vez la amistad necesita que no lo sepamos todo».'], ['Cita a un experto en amistad.'], ['Plantea un caso imaginado para probar una idea.'], ['Da los datos de una encuesta.'], ['Cuenta una historia real de su vida.']] }, [
        ['La pregunta: ¿qué estrategia usa el autor?', { luz: [0] }],
        ['A falla: no hay ninguna cita de nadie.', { luz: [1], nota: { 1: 'no está' } }],
        ['C falla: no hay ningún número ni encuesta.', { luz: [3], nota: { 3: 'no está' } }],
        ['D falla: «imagina» no cuenta algo que pasó.', { luz: [4], nota: { 4: 'no es real' } }],
        ['B: «imagina que» abre un experimento mental.', { luz: [2], nota: { 2: 'estrategia' } }],
      ], 'Nombra la estrategia por sus marcas: «imagina» es un caso pensado; «por ejemplo», un caso real.'),
      xpHaz('hoja', '«Dicen que mentir siempre daña. Pero si miento para esconder a un amigo de quien lo persigue, lo salvo». ¿Qué estrategia usa el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Usa un contraejemplo.'], ['Cita una autoridad.'], ['Da una estadística.'], ['Define la palabra amigo.']], pista: 'Esa estrategia no aparece en el texto. Mira qué hace el caso del amigo con la idea general.' }, 'El caso del amigo tumba el «siempre»: es un contraejemplo.')],
    cierre: 'Reconoce la pregunta filosófica, sigue lo que se prueba y se descarta, y nombra la estrategia.',
  });

  xpAmplia('icf-lc-filosofico-2', {
    conecta: 'icf-lc-filosofico-1',
    desde: [
      ['Desde cero: qué es un concepto',
        xpMira('hoja', 'Antes de las palabras difíciles: un **concepto** es la idea que hay detrás de una palabra. «Silla» junta a todas las sillas, aunque sean distintas.', { paras: [['Una silla de madera, una de plástico y una de ruedas.'], ['Las tres sirven para que se siente una persona.'], ['Una piedra donde me siento no es una silla.']] }, [
          ['En la lección de la pregunta filosófica viste que se piensa qué es algo.', {}],
          ['Estas cosas se ven muy distintas.', { luz: [0] }],
          ['Pero tienen algo en común: eso es el concepto.', { luz: [1], nota: { 1: 'lo común' } }],
          ['Definir es decir ese algo común en una frase.', {}],
          ['Y la definición sirve para dejar casos por fuera.', { luz: [2], nota: { 2: 'queda por fuera' } }],
        ], 'Concepto: la idea común detrás de una palabra. Definir es decirla y marcar sus límites.'),
        xpHaz('hoja', 'Definición: «Un juego es una actividad con reglas que se hace por gusto». Subraya lo que **no** es un juego, según ella.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Parqués con los primos.'], ['Lavar la loza porque toca.'], ['Fútbol en el recreo.']], pista: 'Mira las dos condiciones: reglas y por gusto.' }, 'Lavar la loza no se hace por gusto: queda por fuera.')],
    ],
    despues: [
      ['Más difícil: la palabra que el autor redefine',
        xpMira('hoja', 'Un paso más: el autor puede usar una palabra común con un sentido **suyo**. Si respondes con el sentido de siempre, caes.', { paras: [['En este ensayo, «pobreza» no es solo falta de dinero.'], ['Llamo pobreza a no poder elegir cómo vivir.'], ['Así, alguien con plata pero sin libertad es pobre.']] }, [
          ['Primero avisa que la palabra no tiene su sentido de siempre.', { luz: [0], nota: { 0: 'aviso' } }],
          ['«Llamo» trae la definición del autor.', { luz: [1], nota: { 1: 'su definición' } }],
          ['Con ella, un rico puede ser pobre.', { luz: [2], nota: { 2: 'consecuencia' } }],
          ['Eso suena raro solo si usas el sentido común de pobreza.', { luz: [2] }],
          ['En filosofía, las palabras significan lo que el autor definió.', {}],
        ], 'Si el autor define una palabra, responde con su definición, no con la de todos los días.'),
        xpHaz('hoja', 'Con esa definición de pobreza, subraya el caso de una persona **pobre**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Gana poco, pero eligió su oficio y su lugar.'], ['Tiene dinero, pero no puede salir ni decidir nada.'], ['Compra lo que quiere y viaja.']], pista: 'Usa la definición del autor: no poder elegir cómo vivir.' }, 'Según el autor, es pobre quien no puede elegir, aunque tenga plata.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Para el autor, X significa…». La trampa es el sentido de diccionario que el autor no usa.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Entiendo por generosidad no dar lo que sobra, sino dar tiempo a quien lo necesita».'], ['dar las cosas que sobran'], ['regalar mucho dinero'], ['dedicar tiempo a quien lo necesita'], ['nunca pensar en uno mismo']] }, [
        ['La pregunta: para el autor, ¿qué es generosidad?', { luz: [0] }],
        ['A es justo lo que el autor dice que no es.', { luz: [1], nota: { 1: 'descartado' } }],
        ['B usa el sentido de siempre, no el del autor.', { luz: [2], nota: { 2: 'sentido común' } }],
        ['D exagera con un absoluto: «nunca».', { luz: [4], nota: { 4: 'absoluto' } }],
        ['C repite la definición con otras palabras.', { luz: [3], nota: { 3: 'su definición' } }],
      ], 'Busca «entiendo por» o «llamo» y responde con esa definición, no con la de siempre.'),
      xpHaz('hoja', '«Llamo disciplina no a obedecer, sino a cumplir lo que uno mismo se propuso». Según el autor, ¿qué caso es disciplina?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Hacer lo que manda el profesor sin pensar.'], ['Terminar el curso que uno decidió hacer.'], ['Hacer lo que todos hacen.'], ['No tener ninguna obligación.']], pista: 'Esa opción usa el sentido de siempre. Aplica la definición: cumplir lo que uno se propuso.' }, 'Terminar lo que uno mismo decidió es disciplina para el autor.')],
    cierre: 'Busca cómo define el autor cada concepto, úsalo así y separa el ejemplo de la analogía.',
  });
}
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
//#archivo js/explora-icf-lc-6-pasos.js
// Preicfes · Lectura Crítica, mundo 6 «Textos Discontinuos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): texto continuo y
// discontinuo, viñeta, globo, caricatura, ironía y texto mixto desde cero (con piezas dibujadas de XLAB: periódico y cartel); luego
// la gráfica que no dice la causa, la ironía de la caricatura, la foto que no prueba y las trampas del examen. Piezas breves propias.
{
  const X = XLAB;
  // Una hoja de periódico (se lee en fila) junto a un cartel de precios (se lee por partes).
  const dosTextos = v => X.foto(X.periodico(18, 26, 140, 124, 'Sube el pan', { nombre: 'EL BARRIO' }) +
    X.aviso(182, 26, 140, 124, ['PRECIOS DE HOY', 'Pan: 500', 'Leche: 4 000', 'Huevo: 700'], 'papel') +
    (v.a ? X.rot(88, 182, 'en fila') : '') + (v.b ? X.rot(252, 182, 'por partes') : '') + (v.c ? X.flecha(330, 8, 306, 44, '#ffd23f') : ''), 200, 'mesa');
  // Una página de periódico con titular, foto y columnas; rótulos opcionales.
  const pagina = v => X.foto(X.periodico(40, 14, 260, 150, 'Vuelven las ranas', { foto: 1, nombre: 'EL VECINO' }) +
    (v.t ? X.rot(250, 46, 'titular', 'oscuro') : '') + (v.f ? X.rot(87, 104, 'foto', 'oscuro') : '') + (v.c ? X.rot(220, 132, 'texto', 'oscuro') : ''), 200, 'mesa');

  xpAmplia('icf-lc-discontinuo-1', {
    conecta: 'icf-lc-estructura-1',
    desde: [
      ['Desde cero: en fila o por partes',
        xpMira('dibujo', 'Antes de las palabras difíciles: hay textos que se leen **en fila** y textos que se leen **por partes**.', { dib: dosTextos, v: {}, alto: 200 }, [
          ['En la lección de la función del párrafo viste que cada parte tiene un oficio.', {}],
          ['Una noticia se lee en fila: renglón tras renglón.', { a: 1 }],
          ['A eso se le llama texto continuo.', { a: 1 }],
          ['Un cartel de precios no se lee en fila: se salta de un dato a otro.', { a: 1, b: 1 }],
          ['Es un texto discontinuo, como tablas, avisos, gráficas y cómics.', { a: 1, b: 1 }],
          ['Cada pedazo cumple un oficio: el título dice de qué trata.', { a: 1, b: 1, c: 1 }],
        ], 'Continuo: se lee en fila. Discontinuo: por partes, como un cartel, una tabla o un cómic.'),
        xpHaz('hoja', 'Subraya los dos textos **discontinuos**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Una carta a la abuela.'], ['El horario de buses de la terminal.'], ['Un cuento de terror.'], ['La tabla de posiciones del torneo.']], pista: 'Alguno se lee en fila, renglón tras renglón. Busca los que se leen saltando.' }, 'El horario y la tabla se leen saltando de casilla en casilla.')],
    ],
    despues: [
      ['Más difícil: lo que la tabla no dice',
        xpMira('hoja', 'Un paso más: una tabla muestra **cuánto**, pero no siempre **por qué**. La trampa es leer una causa que no está.', { letras: ['tabla', 'a', 'b', 'c'], paras: [['Sombrillas vendidas: enero 100, abril 300. Gripas en el colegio: enero 10, abril 30.'], ['En abril se vendió el triple de sombrillas.'], ['Las sombrillas causan gripa.'], ['En abril llovió más.']] }, [
          ['La tabla da cuatro números.', { luz: [0] }],
          ['La a solo lee los números: está bien.', { luz: [1], nota: { 1: 'lo dice' } }],
          ['La b inventa una causa: suben juntas, pero eso no prueba nada.', { luz: [2], tacha: [2], nota: { 2: 'causa inventada' } }],
          ['La c puede ser cierta, pero la tabla no habla de lluvia.', { luz: [3], tacha: [3], nota: { 3: 'no está' } }],
          ['Que dos cosas suban juntas no dice que una cause la otra.', {}],
        ], 'Lee lo que muestran los números; la causa y lo que no aparece, no.'),
        xpHaz('hoja', 'Infografía: «Visitas a la biblioteca: lunes 20, sábado 80». Subraya lo que **sí** dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El sábado fueron cuatro veces más personas.'], ['El sábado la gente lee más libros.'], ['Los lunes la biblioteca está cerrada.']], pista: 'Esa opción va más allá de los números. Busca la que solo los compara.' }, '80 es cuatro veces 20: eso es todo lo que dice.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «Según la tabla, es correcto afirmar que…». Compara con el **total**, no solo con el número grande.', { letras: ['tabla', 'A', 'B', 'C', 'D'], paras: [['¿Cómo llegas al colegio? Grado 6 (40 estudiantes): 20 a pie. Grado 11 (100 estudiantes): 30 a pie.'], ['En grado 11 caminan más, porque son 30.'], ['En grado 6 camina la mitad; en grado 11, menos de un tercio.'], ['Los de grado 11 son perezosos.'], ['Nadie en grado 11 llega en bus.']] }, [
        ['La pregunta: ¿qué es correcto afirmar según la tabla?', { luz: [0] }],
        ['A mira el número grande y olvida el total: trampa.', { luz: [1], nota: { 1: 'sin total' } }],
        ['C es una opinión que la tabla no da.', { luz: [3], nota: { 3: 'opinión' } }],
        ['D usa «nadie»: la tabla no habla del bus.', { luz: [4], nota: { 4: 'no está' } }],
        ['B compara cada número con su total: 20 de 40 y 30 de 100.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'En una tabla, compara cada cantidad con su total y no leas lo que no aparece.'),
      xpHaz('hoja', 'Tabla: «Barrio A, 50 casas: 10 sin luz. Barrio B, 20 casas: 8 sin luz». Según la tabla, ¿qué es correcto?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['A está peor, porque son 10 casas.'], ['B está peor: 4 de cada 10 casas no tienen luz.'], ['En B la luz es más cara.'], ['Todas las casas de A tienen luz.']], pista: 'Esa opción olvida el total o dice algo que la tabla no trae. Saca la parte de cada barrio.' }, '10 de 50 son 2 de cada 10; 8 de 20 son 4 de cada 10.')],
    cierre: 'En un texto discontinuo, mira qué hace cada parte, compara con el total y no leas causas que no están.',
  });

  xpAmplia('icf-lc-discontinuo-2', {
    conecta: 'icf-lc-estructura-3',
    desde: [
      ['Desde cero: cómo se lee un cómic',
        xpMira('hoja', 'Antes de las palabras difíciles: un **cómic** cuenta con dibujos en cuadros, las **viñetas**. Se leen de izquierda a derecha y de arriba abajo.', { letras: ['1', '2', '3'], paras: [['Viñeta 1: una niña mira la lluvia por la ventana.'], ['Viñeta 2: busca sus botas debajo de la cama.'], ['Viñeta 3: salta en un charco, feliz.']] }, [
          ['En la lección de voces viste que un texto puede tener varias voces.', {}],
          ['En un cómic, cada cuadro es una viñeta.', { luz: [0], nota: { 0: 'viñeta' } }],
          ['Se leen en orden, como los renglones.', { luz: [0, 1, 2] }],
          ['El orden cuenta una historia: mira, busca, salta.', { luz: [1, 2], nota: { 1: 'luego', 2: 'al final' } }],
          ['Las voces de los personajes van en globos; el narrador, en recuadros.', {}],
        ], 'Viñeta: cada cuadro. Globos: las voces de los personajes. Recuadro: el narrador.'),
        xpHaz('hoja', 'Pon al margen qué es cada elemento del cómic.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['globo', 'viñeta', 'recuadro'], meta: [1, 0, 2], paras: [['El cuadro donde está dibujada una escena.'], ['El espacio donde va lo que dice un personaje.'], ['La caja donde habla el narrador.']], pista: 'Alguno no va ahí: ¿dibujo, voz del personaje o voz del narrador?' }, 'Viñeta para la escena, globo para el personaje, recuadro para el narrador.')],
    ],
    despues: [
      ['Más difícil: la ironía de la caricatura',
        xpMira('hoja', 'Un paso más: una **caricatura** critica con humor. Muchas usan **ironía**: dicen lo contrario de lo que muestran.', { paras: [['Dibujo: una calle llena de huecos y un carro hundido hasta el techo.'], ['Globo del alcalde: «¡Nuestras vías son un ejemplo!».'], ['Recuadro: «Inauguración de obras».']] }, [
          ['El dibujo muestra un desastre.', { luz: [0], nota: { 0: 'lo que se ve' } }],
          ['El globo dice que todo está perfecto.', { luz: [1], nota: { 1: 'lo que dice' } }],
          ['El choque entre lo que se ve y lo que se dice es la ironía.', { luz: [0, 1] }],
          ['La caricatura no elogia al alcalde: lo critica.', { luz: [1] }],
          ['Trampa: creer que el autor piensa lo que dice el personaje.', {}],
        ], 'Ironía: lo dicho choca con lo mostrado. El autor critica; no comparte la frase del personaje.'),
        xpHaz('hoja', 'Caricatura: un río lleno de basura. Un pez con tapabocas dice: «¡Qué agua tan pura!». Subraya lo que critica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que los peces usen tapabocas.'], ['La contaminación del río.'], ['Que el agua esté limpia.']], pista: 'Compara lo que dice el pez con lo que se ve en el dibujo.' }, 'El pez dice lo contrario de lo que se ve: es ironía.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «En la viñeta, la frase del personaje…» o «¿qué critica la caricatura?». Separa la voz del personaje de la del autor.', { letras: ['viñeta', 'A', 'B', 'C', 'D'], paras: [['Un señor carga diez bolsas plásticas. Globo: «Yo sí cuido el planeta: traje mi termo».'], ['El señor cuida el planeta, como él dice.'], ['Critica a quien dice cuidar el planeta y no lo hace.'], ['Los termos dañan el planeta.'], ['El autor vende bolsas plásticas.']] }, [
        ['La pregunta: ¿qué critica la caricatura?', { luz: [0] }],
        ['A le cree al personaje: confunde su voz con la del autor.', { luz: [1], nota: { 1: 'cree al personaje' } }],
        ['C toma una palabra del dibujo y le cambia el sentido.', { luz: [3], nota: { 3: 'misma palabra' } }],
        ['D inventa algo sobre el autor.', { luz: [4], nota: { 4: 'no está' } }],
        ['B ve el choque entre las bolsas y lo que dice.', { luz: [2], nota: { 2: 'ironía' } }],
      ], 'En un cómic, compara lo que dice el personaje con lo que muestra el dibujo.'),
      xpHaz('hoja', 'Viñeta: un hospital con pacientes en el piso del pasillo. Globo del gerente: «Atención cinco estrellas». ¿Qué expresa la viñeta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El hospital atiende muy bien.'], ['Una crítica a la mala atención del hospital.'], ['El gerente es médico.'], ['Todos los hospitales del país son malos.']], pista: 'Esa opción le cree al personaje o generaliza. Compara el globo con el dibujo.' }, 'Lo que dice el gerente choca con lo que se ve: es una crítica.')],
    cierre: 'En un cómic, lee las viñetas en orden, separa la voz del personaje de la del autor y busca la ironía.',
  });

  xpAmplia('icf-lc-discontinuo-3', {
    conecta: 'icf-lc-discontinuo-1',
    desde: [
      ['Desde cero: una página con muchas piezas',
        xpMira('dibujo', 'Antes de las palabras difíciles: una página de periódico mezcla **piezas**: titular, foto y texto. Cada una aporta algo.', { dib: pagina, v: {}, alto: 200 }, [
          ['En la lección de infografías viste que cada parte responde algo distinto.', {}],
          ['El titular resume la noticia en pocas palabras.', { t: 1 }],
          ['La foto deja ver lo que pasó.', { t: 1, f: 1 }],
          ['El texto explica con detalle y da los datos.', { t: 1, f: 1, c: 1 }],
          ['Juntas forman un texto mixto: parte continua y parte discontinua.', { t: 1, f: 1, c: 1 }],
        ], 'Un texto mixto junta piezas en fila (el texto) y piezas sueltas (titular, foto, tabla).'),
        xpHaz('hoja', 'Pon al margen la pieza que responde cada pregunta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['la foto', 'el titular', 'la tabla'], meta: [1, 2, 0], paras: [['¿Qué pasó, en pocas palabras?'], ['¿Cuántos hubo cada año?'], ['¿Cómo se veía el lugar?']], pista: 'Alguna no va ahí: ¿resume, cuenta o muestra?' }, 'El titular resume, la tabla cuenta y la foto muestra.')],
    ],
    despues: [
      ['Más difícil: la foto que no prueba',
        xpMira('hoja', 'Un paso más: una foto muestra **un momento y un lugar**. No prueba lo que pasa en todas partes ni todo el tiempo.', { letras: ['pieza', 'a', 'b', 'c'], paras: [['Foto: una cancha llena de niños jugando. Pie: «Domingo en el barrio Las Flores».'], ['Ese domingo había niños jugando en esa cancha.'], ['En la ciudad los niños juegan mucho.'], ['La cancha siempre está llena.']] }, [
          ['La foto muestra un domingo, en un barrio.', { luz: [0], nota: { 0: 'un momento' } }],
          ['La a se queda en lo que se ve.', { luz: [1], nota: { 1: 'alcanza' } }],
          ['La b salta de un barrio a toda la ciudad.', { luz: [2], tacha: [2], nota: { 2: 'generaliza' } }],
          ['La c salta de un día a siempre.', { luz: [3], tacha: [3], nota: { 3: 'absoluto' } }],
          ['El pie de foto dice el cuándo y el dónde: úsalo.', { luz: [0] }],
        ], 'Una foto vale para su momento y su lugar; lo demás dice de más.'),
        xpHaz('hoja', 'Foto: un bus vacío. Pie: «Ruta 12, martes a las 3 de la tarde». **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Nadie usa la ruta 12.'], ['Ese martes, a esa hora, el bus iba vacío.'], ['Los buses de la ciudad andan vacíos.']], pista: 'Alguna de las tachadas se queda en lo que muestra la foto.' }, '«Nadie» y «los buses de la ciudad» van más allá de una foto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «De la noticia y la gráfica se puede concluir…». La buena **cabe en todas las piezas** a la vez.', { letras: ['piezas', 'A', 'B', 'C', 'D'], paras: [['Titular: «Más turistas en el pueblo». Gráfica: de 2 000 a 5 000 turistas en un año. Una vendedora: «Vendo más, pero el arriendo se me duplicó».'], ['A todos en el pueblo les fue mejor.'], ['La vendedora vende menos que antes.'], ['Llegaron más turistas, aunque no todo fue ganancia.'], ['Los turistas subieron el arriendo a propósito.']] }, [
        ['La pregunta: ¿qué se concluye de las tres piezas juntas?', { luz: [0] }],
        ['A choca con la voz de la vendedora: generaliza.', { luz: [1], nota: { 1: 'generaliza' } }],
        ['B dice lo contrario de lo que ella cuenta.', { luz: [2], nota: { 2: 'al revés' } }],
        ['D inventa una intención que nadie mencionó.', { luz: [4], nota: { 4: 'no está' } }],
        ['C cabe en el titular, en la gráfica y en la voz.', { luz: [3], nota: { 3: 'cabe en todo' } }],
      ], 'Prueba cada conclusión contra cada pieza: si una la contradice, descártala.'),
      xpHaz('hoja', 'Titular: «El parque se renovó». Foto: juegos nuevos. Un abuelo: «Quitaron las bancas y no tengo dónde sentarme». ¿Qué se concluye?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El parque quedó perfecto para todos.'], ['Hubo cambios que no sirvieron a todos.'], ['Al abuelo no le gustan los parques.'], ['El parque sigue igual.']], pista: 'Esa opción choca con alguna pieza. Pruébala con el titular, la foto y la voz.' }, 'Hay juegos nuevos, pero el abuelo perdió su banca.')],
    cierre: 'En un texto mixto, pregunta qué aporta cada pieza y escoge la conclusión que cabe en todas.',
  });
}
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
//#archivo js/explora-icf-lc-7-pasos.js
// Preicfes · Lectura Crítica, mundo 7 «Evaluar un Texto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): supuesto, enunciado
// válido, muestra, valor y visión del mundo desde cero; luego supuesto frente a premisa, la muestra que no representa, la palabra que
// delata una mirada y las trampas del examen. Textos breves propios.
{
  xpAmplia('icf-lc-evalua-1', {
    conecta: 'icf-lc-argumento-1',
    desde: [
      ['Desde cero: lo que se da por hecho',
        xpMira('hoja', 'Antes de las palabras difíciles: al hablar damos cosas **por hecho**. Si digo «lleva sombrilla», doy por hecho que va a llover.', { paras: [['«Lleva sombrilla».'], ['Lo que se da por hecho: va a llover.'], ['«Apúrate, que cierran».'], ['Lo que se da por hecho: el lugar cierra pronto.']] }, [
          ['En la lección de tesis viste que una tesis se apoya en razones.', {}],
          ['Algunas razones no se escriben: se dan por hechas.', {}],
          ['Nadie dijo «va a llover», pero el consejo lo necesita.', { luz: [0, 1], nota: { 1: 'supuesto' } }],
          ['Aquí tampoco se dice la hora, pero se supone que es pronto.', { luz: [2, 3], nota: { 3: 'supuesto' } }],
          ['Eso que se da por hecho y no se escribe es un supuesto.', {}],
        ], 'Supuesto: una idea que no se escribe, pero que la frase necesita para tener sentido.'),
        xpHaz('hoja', '«Ponte la chaqueta, que vamos a la finca de la abuela en el páramo». Subraya lo que se **supone**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La finca es grande.'], ['Allá hace frío.'], ['La chaqueta es azul.']], pista: 'Pregunta por qué alguien diría eso: ¿qué tiene que ser cierto?' }, 'Sin frío, el consejo de la chaqueta no tendría sentido.')],
    ],
    despues: [
      ['Más difícil: supuesto frente a premisa',
        xpMira('hoja', 'Un paso más: el supuesto **no está escrito**. Si la opción ya aparece en el texto, no es el supuesto: es una premisa.', { letras: ['texto', 'a', 'b', 'c'], paras: [['El colegio debe tener psicóloga, porque muchos estudiantes están tristes.'], ['Muchos estudiantes están tristes.'], ['Una psicóloga puede ayudar a quien está triste.'], ['Las psicólogas ganan poco.']] }, [
          ['Arriba está el argumento completo.', { luz: [0] }],
          ['La a ya está escrita: es la premisa, no el supuesto.', { luz: [1], nota: { 1: 'premisa' } }],
          ['La b no está escrita, y sin ella la idea no tiene sentido.', { luz: [2], nota: { 2: 'supuesto' } }],
          ['Niégala: si no ayudara, ¿para qué pedirla?', { luz: [2] }],
          ['La c no hace falta para que la idea funcione.', { luz: [3], tacha: [3], nota: { 3: 'no hace falta' } }],
        ], 'El supuesto no está escrito; la premisa sí. Niega la opción: si la idea se cae, era el supuesto.'),
        xpHaz('hoja', '«Hay que poner más policías en la plaza, porque ahí roban mucho». Subraya el **supuesto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['En la plaza roban mucho.'], ['Con más policías robarían menos.'], ['La plaza es bonita.']], pista: 'Esa ya está escrita o no hace falta. Niega cada una y mira cuál tumba la idea.' }, 'Si más policías no cambiaran nada, la propuesta se caería.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «El autor da por sentado que…». La trampa es la opción que **ya está escrita** o la que es cierta pero no hace falta.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Para que los jóvenes lean más, la biblioteca debe prestar libros por celular».'], ['La biblioteca tiene libros.'], ['Los jóvenes usan el celular y leerían en él.'], ['Los jóvenes deben leer más.'], ['Todos los jóvenes odian los libros de papel.']] }, [
        ['La pregunta: ¿qué da por sentado el autor?', { luz: [0] }],
        ['A es cierta, pero no es lo que la propuesta necesita.', { luz: [1], nota: { 1: 'no hace falta' } }],
        ['C ya está escrita: es la meta del texto.', { luz: [3], nota: { 3: 'ya está' } }],
        ['D exagera con «todos» y «odian».', { luz: [4], nota: { 4: 'absoluto' } }],
        ['B: si no leyeran en el celular, la propuesta se cae.', { luz: [2], nota: { 2: 'supuesto' } }],
      ], 'Niega cada opción: la que tumba la idea es el supuesto.'),
      xpHaz('hoja', '«Si el colegio vende fruta en la tienda, los estudiantes comerán más sano». ¿Qué da por sentado el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['La tienda del colegio es pequeña.'], ['Todos los estudiantes odian la fruta.'], ['El colegio tiene tienda.'], ['Si hay fruta a la venta, los estudiantes la comprarán.']], pista: 'Esa opción no hace falta, exagera o ya está escrita. Niega cada una: ¿cuál tumba la idea?' }, 'Si nadie la comprara, vender fruta no cambiaría nada.')],
    cierre: 'Busca lo que el texto da por hecho, para qué escribe y con qué recursos convence.',
  });

  xpAmplia('icf-lc-evalua-2', {
    conecta: 'icf-lc-argumento-2',
    desde: [
      ['Desde cero: qué es un enunciado válido',
        xpMira('hoja', 'Antes de las palabras difíciles: un **enunciado** es una frase que afirma algo. Es **válido** si lo que lo sostiene alcanza.', { paras: [['Enunciado: «Esta panadería hace el mejor pan del barrio».'], ['Respaldo 1: «Me gusta».'], ['Respaldo 2: «Diez vecinos probaron el pan de las cinco panaderías del barrio y ganó esta».']] }, [
          ['En la lección de fortalecer y debilitar viste que unas razones pesan más.', {}],
          ['Este es el enunciado: afirma algo.', { luz: [0], nota: { 0: 'enunciado' } }],
          ['«Me gusta» es un gusto: no alcanza para decir «el mejor».', { luz: [1], nota: { 1: 'no alcanza' } }],
          ['Comparar todas con varios vecinos sí se acerca.', { luz: [2], nota: { 2: 'alcanza más' } }],
          ['Válido no es lo mismo que cierto: es bien sostenido.', {}],
        ], 'Un enunciado es válido cuando su respaldo alcanza para lo que afirma.'),
        xpHaz('hoja', 'Enunciado: «El río más largo del país es el Magdalena». Subraya el respaldo que **alcanza**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo dijo un amigo.'], ['Un mapa oficial compara el largo de todos los ríos del país.'], ['Es un río muy famoso.']], pista: 'Ese respaldo es un rumor o una fama. Busca el que compara.' }, 'Para decir «el más largo» hay que comparar con todos.')],
    ],
    despues: [
      ['Más difícil: la muestra que no representa',
        xpMira('hoja', 'Un paso más: para hablar de **todos**, los que se preguntan deben parecerse a todos. Si no, la **muestra** no representa.', { paras: [['Se preguntó a 200 personas a la salida de un gimnasio.'], ['El 90 % dijo hacer ejercicio cada semana.'], ['Titular: «Casi todo el país hace ejercicio».']] }, [
          ['Muestra: el grupo al que se le pregunta.', { luz: [0], nota: { 0: 'muestra' } }],
          ['¿Dónde se preguntó? A la salida de un gimnasio.', { luz: [0] }],
          ['Ahí casi todos hacen ejercicio: el resultado era de esperar.', { luz: [1] }],
          ['El titular salta de ese grupo a todo el país.', { luz: [2], tacha: [2], nota: { 2: 'no representa' } }],
          ['Pregunta siempre a quién se preguntó y dónde.', {}],
        ], 'Una muestra representa si se parece al grupo completo; si no, la conclusión dice de más.'),
        xpHaz('hoja', 'Una encuesta hecha en un concierto de rock concluye que el rock es la música favorita de la ciudad. Subraya el problema.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hubo muchas preguntas.'], ['Solo se preguntó a gente que ya escogió ir al rock.'], ['El rock es ruidoso.']], pista: '¿A quién le preguntaron, y se parece a toda la ciudad?' }, 'Quien va a un concierto de rock no representa a toda la ciudad.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Por qué el enunciado no es válido?». Mira **cuántos**, **quiénes** y con qué se comparó.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Un estudiante usó una aplicación de inglés un mes y subió su nota. Concluye: «La aplicación mejora el inglés de cualquiera».'], ['Porque las aplicaciones son caras.'], ['Porque un solo caso no alcanza para hablar de cualquiera.'], ['Porque el inglés es difícil.'], ['Porque el estudiante mintió.']] }, [
        ['La pregunta: ¿por qué la conclusión no es válida?', { luz: [0] }],
        ['A habla del precio: no toca el respaldo.', { luz: [1], nota: { 1: 'no pesa' } }],
        ['C es una opinión sobre el inglés, no sobre la prueba.', { luz: [3], nota: { 3: 'no pesa' } }],
        ['D acusa sin pruebas: el texto no dice que mintiera.', { luz: [4], nota: { 4: 'no está' } }],
        ['B: de un solo caso no se salta a cualquiera.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Un enunciado no es válido si dice de más: pocos casos, muestra rara o sin comparar.'),
      xpHaz('hoja', '«En mi cuadra, tres familias compraron perro y están más felices. Tener perro hace feliz a toda familia». ¿Por qué no es válido?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Porque los perros comen mucho.'], ['Porque tres familias de una cuadra no alcanzan para toda familia.'], ['Porque las familias mienten.'], ['Porque los gatos son mejores.']], pista: 'Esa razón no toca el respaldo. Mira cuántos casos hay y a quiénes se aplica la conclusión.' }, 'Tres casos de una cuadra no sostienen un «toda familia».')],
    cierre: 'Mide el respaldo: cuántos, quiénes y comparados con qué. Si no alcanza, el enunciado dice de más.',
  });

  xpAmplia('icf-lc-evalua-3', {
    conecta: 'icf-lc-evalua-1',
    desde: [
      ['Desde cero: qué es un valor',
        xpMira('hoja', 'Antes de las palabras difíciles: un **valor** es algo que una persona considera importante: la salud, la familia, la libertad, el dinero.', { paras: [['Ana rechazó un trabajo mejor pagado para cuidar a su mamá.'], ['Pedro cambió de trabajo porque le pagaban el doble.']] }, [
          ['En la lección de supuestos viste que no todo se escribe.', {}],
          ['Los valores casi nunca se escriben: se notan en lo que se elige.', {}],
          ['Ana pone primero a su familia.', { luz: [0], nota: { 0: 'la familia' } }],
          ['Pedro pone primero el ingreso.', { luz: [1], nota: { 1: 'el dinero' } }],
          ['Ninguno miente: valoran cosas distintas.', { luz: [0, 1] }],
        ], 'Valor: lo que alguien pone primero. Se descubre mirando lo que elige.'),
        xpHaz('hoja', '«Prefiero un barrio con árboles, aunque quede lejos del trabajo». Subraya el valor que pone primero.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La cercanía'], ['La naturaleza'], ['El ahorro']], pista: '¿Qué escoge, aunque le cueste otra cosa?' }, 'Acepta quedar lejos con tal de tener árboles.')],
    ],
    despues: [
      ['Más difícil: la palabra que delata una mirada',
        xpMira('hoja', 'Un paso más: una sola palabra puede delatar cómo ve el mundo el autor: su **visión del mundo**.', { paras: [['Uno: «El gasto en bibliotecas es muy alto».'], ['Otro: «La inversión en bibliotecas es muy alta».']] }, [
          ['Los dos hablan de la misma plata.', { luz: [0, 1] }],
          ['«Gasto» hace pensar en plata que se va.', { luz: [0], nota: { 0: 'se pierde' } }],
          ['«Inversión» hace pensar en plata que vuelve con ganancia.', { luz: [1], nota: { 1: 'da fruto' } }],
          ['El primero ve las bibliotecas como una carga.', { luz: [0] }],
          ['El segundo, como algo que deja beneficios.', { luz: [1] }],
        ], 'La palabra escogida delata la visión del mundo: qué ve el autor como carga y qué como valor.'),
        xpHaz('hoja', 'Pon al margen cómo ve cada uno a los vendedores del andén.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['como un problema', 'como trabajadores'], meta: [0, 1], paras: [['«Los invasores del andén volvieron».'], ['«Los vendedores volvieron a su sitio de trabajo».']], pista: 'Alguno no va ahí: mira qué palabra usa cada uno para nombrarlos.' }, '«Invasores» los ve como problema; «sitio de trabajo», como trabajadores.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué valor defiende el autor?». La trampa es un valor bonito que el texto **no** pone primero.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['«Construir el estadio en el humedal sería un error. Las aves y el agua que guarda ese lugar no se reponen con ninguna obra».'], ['La diversión de los hinchas.'], ['La protección de la naturaleza.'], ['El progreso económico de la ciudad.'], ['La justicia entre ricos y pobres.']] }, [
        ['La pregunta: ¿qué valor defiende el autor?', { luz: [0] }],
        ['A habla del estadio, pero el autor no la defiende.', { luz: [1], nota: { 1: 'no la pone primero' } }],
        ['C es lo que el autor está dispuesto a dejar de lado.', { luz: [3], nota: { 3: 'lo deja de lado' } }],
        ['D es un valor importante, pero el texto no habla de eso.', { luz: [4], nota: { 4: 'no está' } }],
        ['B: lo que no se repone es lo que más le importa.', { luz: [2], nota: { 2: 'su valor' } }],
      ], 'El valor del autor es lo que prefiere cuando hay que escoger. Un valor bonito ajeno al texto es trampa.'),
      xpHaz('hoja', '«No quiero que mi hijo sea el mejor del salón; quiero que ayude al que se queda atrás». ¿Qué valor defiende el autor?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La competencia'], ['La solidaridad'], ['La obediencia'], ['La riqueza']], pista: 'Esa opción es lo que el autor deja en segundo lugar o algo que no menciona.' }, 'Ayudar al que se queda atrás vale más que ganar.')],
    cierre: 'Mira qué pone primero el autor, qué palabras escoge y en qué coincide o choca con otros.',
  });
}
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
//#archivo js/explora-icf-lc-8-pasos.js
// Preicfes · Lectura Crítica, mundo 8 «Comparar Textos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): comparar, propósito y
// postura desde cero; luego ampliar frente a ejemplificar, qué le respondería un autor al otro y las trampas del examen (matizar no
// es contradecir, invertir las posturas, darle a uno la idea del otro). Parejas breves propias.
{
  xpAmplia('icf-lc-comparar-1', {
    conecta: 'icf-lc-evalua-3',
    desde: [
      ['Desde cero: leer dos textos a la vez',
        xpMira('hoja', 'Antes de las palabras difíciles: comparar dos textos es como comparar dos fotos del mismo sitio: qué se repite y qué cambia.', { letras: ['T1', 'T2'], paras: [['«La plaza de mercado abre a las cinco y vende frutas de la región».'], ['«Desde niña voy a la plaza con mi abuela; huele a guayaba y a café».']] }, [
          ['En la lección de valores viste que dos textos pueden coincidir y chocar.', {}],
          ['Primero busca el tema: los dos hablan de la plaza.', { luz: [0, 1], nota: { 0: 'la plaza', 1: 'la plaza' } }],
          ['T1 informa: horarios y productos.', { luz: [0], nota: { 0: 'informa' } }],
          ['T2 cuenta un recuerdo: olores y la abuela.', { luz: [1], nota: { 1: 'recuerda' } }],
          ['Mismo tema, distinto propósito: eso ya es comparar.', {}],
        ], 'Comparar es buscar el tema común y ver qué hace distinto cada texto.'),
        xpHaz('hoja', 'T1: «El café colombiano se vende en muchos países». T2: «El tinto de mi papá a las cinco despierta la casa». Subraya lo que comparten.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Hablan del café.'], ['Dan cifras.'], ['Hablan del papá.']], pista: 'Esa solo está en uno. Busca lo que puedas señalar en los dos.' }, 'El café está en los dos; el papá, solo en uno.')],
    ],
    despues: [
      ['Más difícil: ampliar o ejemplificar',
        xpMira('hoja', 'Un paso más: cuando dos textos van del mismo lado, mira si el segundo **muestra un caso** o **agrega algo nuevo**.', { letras: ['T1', 'a', 'b', 'c'], paras: [['«Caminar media hora al día protege el corazón».'], ['«Mi tío camina cada mañana y su médico lo felicitó».'], ['«Además, caminar mejora el ánimo».'], ['«Caminar media hora es bueno para el corazón».']] }, [
          ['Arriba está la idea de T1.', { luz: [0] }],
          ['La a es un caso de lo que dice T1: ejemplifica.', { luz: [1], nota: { 1: 'ejemplifica' } }],
          ['La b suma un beneficio nuevo: amplía.', { luz: [2], nota: { 2: 'amplía' } }],
          ['La c solo repite T1 con otras palabras.', { luz: [3], nota: { 3: 'repite' } }],
          ['Ninguna contradice: todas van del mismo lado.', { luz: [1, 2, 3] }],
        ], 'Ejemplificar: un caso de lo mismo. Ampliar: algo nuevo del mismo lado. Repetir: lo mismo dicho distinto.'),
        xpHaz('hoja', 'T1: «Leer en voz alta mejora la pronunciación». Pon al margen qué hace cada texto con T1.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['repite', 'ejemplifica', 'amplía'], meta: [1, 2, 0], paras: [['«Mi hija lee cuentos en voz alta y ya no se traba».'], ['«Además, leer en voz alta ayuda a recordar».'], ['«Leer en voz alta hace que uno pronuncie mejor».']], pista: 'Alguno no va ahí: ¿es un caso, algo nuevo o lo mismo?' }, 'La hija es un caso, recordar es algo nuevo y la última repite.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿Qué relación hay entre el texto 1 y el texto 2?». Las trampas confunden **matizar** con contradecir.', { letras: ['textos', 'A', 'B', 'C', 'D'], paras: [['T1: «Las vacunas protegen a los niños». T2: «Las vacunas protegen, pero hay que ponerlas a tiempo».'], ['T2 contradice a T1.'], ['T2 matiza a T1: le agrega una condición.'], ['T2 repite a T1.'], ['T2 no habla del mismo tema.']] }, [
        ['La pregunta: ¿qué relación hay entre T1 y T2?', { luz: [0] }],
        ['A falla: T2 no niega que las vacunas protejan.', { luz: [1], nota: { 1: 'no niega' } }],
        ['C falla: T2 agrega algo que T1 no dice.', { luz: [3], nota: { 3: 'agrega' } }],
        ['D falla: los dos hablan de vacunas.', { luz: [4], nota: { 4: 'mismo tema' } }],
        ['B: «pero hay que…» pone una condición. Eso es matizar.', { luz: [2], nota: { 2: 'matiza' } }],
      ], 'Contradecir niega; matizar acepta y pone un límite; ampliar agrega; ejemplificar muestra un caso.'),
      xpHaz('hoja', 'T1: «El reciclaje reduce la basura». T2: «En mi conjunto separamos todo y el camión ya lleva la mitad de bolsas». ¿Qué relación hay?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['T2 contradice a T1.'], ['T2 matiza a T1.'], ['T2 da un caso que ejemplifica a T1.'], ['T2 cambia de tema.']], pista: 'Esa relación no encaja: ¿T2 niega, pone un límite o muestra un caso?' }, 'El conjunto es un caso de lo que dice T1.')],
    cierre: 'Busca el tema común, el propósito de cada uno y si uno ejemplifica, amplía, matiza o contradice al otro.',
  });

  xpAmplia('icf-lc-comparar-2', {
    conecta: 'icf-lc-comparar-1',
    desde: [
      ['Desde cero: qué es una postura',
        xpMira('hoja', 'Antes de las palabras difíciles: una **postura** es el lado en que se pone alguien frente a un asunto: a favor, en contra o con condiciones.', { paras: [['Asunto: ¿uniforme obligatorio en el colegio?'], ['Laura: «Sí, así nadie se fija en la ropa».'], ['Tomás: «No, cada uno debe vestirse como quiera».'], ['Sara: «Sí, pero solo para las salidas».']] }, [
          ['En la lección de dos textos viste que uno puede matizar al otro.', {}],
          ['Este es el asunto que se discute.', { luz: [0], nota: { 0: 'asunto' } }],
          ['Laura está a favor y da su razón.', { luz: [1], nota: { 1: 'a favor' } }],
          ['Tomás está en contra.', { luz: [2], nota: { 2: 'en contra' } }],
          ['Sara acepta, con una condición: matiza.', { luz: [3], nota: { 3: 'con condición' } }],
          ['Cada postura tiene su tesis y sus razones.', {}],
        ], 'Postura: el lado de cada uno frente al asunto. Puede ser a favor, en contra o con condiciones.'),
        xpHaz('hoja', 'Asunto: ¿cerrar la calle los sábados para el mercado? Pon al margen la postura de cada voz.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['con condición', 'en contra', 'a favor'], meta: [2, 0, 1], paras: [['«Sí, se mueve la economía».'], ['«Sí, pero solo hasta mediodía».'], ['«No, la ambulancia no podría pasar».']], pista: 'Alguno no va ahí: busca «sí», «sí, pero» y «no».' }, '«Sí» apoya, «sí, pero» pone condición y «no» se opone.')],
    ],
    despues: [
      ['Más difícil: qué le respondería uno al otro',
        xpMira('hoja', 'Un paso más: a veces hay que imaginar **qué le diría** un autor al otro. Usa la idea del primero contra lo que dice el segundo.', { letras: ['T1', 'T2', 'a', 'b'], paras: [['«Hay que construir más vías para acabar el trancón».'], ['«Más vías atraen más carros; el trancón vuelve».'], ['T2 le diría a T1: las vías nuevas se llenarán pronto.'], ['T2 le diría a T1: hay que hacer vías más anchas.']] }, [
          ['T1 propone una salida: más vías.', { luz: [0], nota: { 0: 'propone' } }],
          ['T2 da una razón que choca con esa salida.', { luz: [1], nota: { 1: 'su idea' } }],
          ['La a usa la idea de T2 contra la propuesta de T1.', { luz: [2], nota: { 2: 'responde' } }],
          ['La b le da la razón a T1: invierte la postura de T2.', { luz: [3], tacha: [3], nota: { 3: 'al revés' } }],
          ['Primero di la tesis de cada uno; después, cómo chocan.', {}],
        ], 'Para saber qué respondería un autor, aplica su idea a lo que propone el otro.'),
        xpHaz('hoja', 'T1: «Multar a quien bote basura limpiará el río». T2: «La gente bota basura porque el camión no pasa». ¿Qué le diría T2 a T1?', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que sin camión, las multas no bastan.'], ['Que las multas deben ser más altas.'], ['Que el río es muy largo.']], pista: 'Esa respuesta no usa la idea de T2. ¿Qué dice T2 que causa la basura?' }, 'Si la causa es el camión, multar no resuelve el problema.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen: «¿En qué coinciden los dos autores?» o «¿qué diría el autor 2 del autor 1?». Hay trampas que invierten las posturas.', { letras: ['textos', 'A', 'B', 'C', 'D'], paras: [['T1: «El festival del río debe cancelarse: deja toneladas de basura». T2: «La basura es un problema, sí; pongamos canecas en vez de cancelarlo».'], ['Los dos quieren cancelar el festival.'], ['Coinciden en que hay un problema de basura, no en la salida.'], ['T2 niega que haya basura.'], ['T1 propone poner canecas.']] }, [
        ['La pregunta: ¿en qué coinciden y en qué no?', { luz: [0] }],
        ['A invierte la postura de T2: él no quiere cancelar.', { luz: [1], nota: { 1: 'invierte' } }],
        ['C contradice el «sí» de T2: él acepta el problema.', { luz: [3], nota: { 3: 'al revés' } }],
        ['D le da a T1 la propuesta de T2.', { luz: [4], nota: { 4: 'cambia el dueño' } }],
        ['B separa el hecho común de las salidas distintas.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Separa en cada texto el hecho, la postura y la salida: así ves en qué coinciden y en qué chocan.'),
      xpHaz('hoja', 'T1: «Madrugar a entrenar forma el carácter». T2: «Forma el carácter, sí, pero entrenar cansado causa lesiones». ¿En qué coinciden?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['En que hay que madrugar.'], ['En que entrenar puede formar el carácter.'], ['En que entrenar siempre causa lesiones.'], ['En que el carácter no importa.']], pista: 'Esa opción le da a uno la idea del otro o exagera. Busca lo que aceptan los dos.' }, 'El «sí» de T2 acepta lo del carácter; difieren en lo demás.')],
    cierre: 'Di la tesis de cada uno, cómo responde el otro y qué quedó sin contestar.',
  });
}
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
//#archivo js/explora-icf-sc-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 1 «Constitución y Estado», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Plaza de una ciudad: capitolio, la Constitución en papel viejo y gente; v elige qué aparece.
  const plaza = v => X.foto((v.cap ? X.edificio(262, 166, 120, 'capitolio') : '') +
    (v.doc ? X.documento(14, 14, 132, 92, ['Art. 1: Estado social', 'Art. 113: ramas'], { titulo: 'Constitución', sello: '1991' }) : '') +
    (v.gente ? X.persona(56, 178, 0.8, '#3f6fb5') + X.persona(96, 180, 0.85, '#3f9b6a') + X.persona(172, 178, 0.82, '#b5493f', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.r ? X.rot(170, 194, v.r, 'oscuro') : ''), 204, 'ciudad');
  // Un hospital, una persona que reclama y la carta con que reclama.
  const reclamo = v => X.foto((v.hosp ? X.edificio(250, 166, 130, 'hospital') : '') +
    (v.pers ? X.persona(120, 180, 0.9, '#7a4fb5', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.doc ? X.documento(12, 18, 96, 84, ['Señores:', 'pido mi', 'medicina.'], { titulo: 'Carta' }) : '') +
    (v.r ? X.rot(170, 194, v.r, 'oscuro') : ''), 204, 'ciudad');

  xpAmplia('icf-sc-constitucion-1', {
    conecta: null,
    desde: [
      ['Desde cero: el Estado y su Constitución',
        xpMira('dibujo', 'Antes de las palabras difíciles: un **Estado** es un país organizado, y la **Constitución**, su reglamento más alto.', { dib: plaza, v: {}, alto: 204 }, [
          ['Un Estado junta tres cosas: un territorio, su gente y unas autoridades.', { cap: 1 }],
          ['La gente vive en el territorio y elige a muchas de esas autoridades.', { cap: 1, gente: 1 }],
          ['Las reglas más altas del país están escritas en un papel: la Constitución.', { cap: 1, gente: 1, doc: 1 }],
          ['La de Colombia es de 1991 y reemplazó a la de 1886.', { cap: 1, gente: 1, doc: 1, r: 'Constitución de 1991' }],
          ['Es como el reglamento de un torneo: obliga a jugadores y también a árbitros.', { cap: 1, gente: 1, doc: 1, cartel: 'Reglas' }],
        ], 'Estado: territorio, gente y autoridades. Constitución: las reglas más altas, que obligan a todos.'),
        xpHaz('hoja', 'Subraya lo que la **Constitución** sí hace.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fija reglas que obligan a todos, también a los gobernantes.'], ['Dice cuál es el mejor equipo de fútbol del país.'], ['Cambia sola cada vez que llega un presidente nuevo.']], pista: 'Piensa en el reglamento del torneo: ¿a quién obliga y quién lo cambia a su antojo?' }, 'Las reglas más altas obligan a todos y no cambian al gusto de nadie.')],
    ],
    despues: [
      ['Más difícil: ramas y control en un mismo caso',
        xpMira('hoja', 'Un paso más: en un caso real aparecen **varios** actores a la vez, y cada uno hace solo su parte.', { paras: [['El Congreso aprueba dinero para computadores de colegios.'], ['El Ministerio firma el contrato y los reparte.'], ['La Contraloría encuentra que se pagaron caros.'], ['Un juez condena al contratista por fraude.']] }, [
          ['Primero se aprueba el gasto: eso lo hace la rama legislativa.', { luz: [0], nota: { 0: 'legislativa' } }],
          ['Firmar y repartir es gobernar: rama ejecutiva.', { luz: [1], nota: { 1: 'ejecutiva' } }],
          ['Revisar si el dinero rindió es del órgano de control.', { luz: [2], nota: { 2: 'control' } }],
          ['Castigar un delito lo decide un juez: rama judicial.', { luz: [3], nota: { 3: 'judicial' } }],
          ['Trampa común: creer que la Contraloría castiga delitos. Ella revisa el dinero.', { luz: [2] }],
        ], 'En un mismo caso, cada actor hace solo su parte: aprobar, ejecutar, vigilar o juzgar.'),
        xpHaz('hoja', 'Un gobernador firma un decreto que choca con una ley. Subraya quién puede **anularlo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La Contraloría, porque vigila el dinero.'], ['Un juez, porque decide si el decreto respeta las normas de arriba.'], ['Otro gobernador, porque tiene el mismo cargo.']], pista: 'Anular por chocar con una norma es resolver un conflicto según la ley. ¿Qué rama hace eso?' }, 'Decidir si una norma choca con otra es tarea de los jueces.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen no pide recitar el artículo: te da una **propuesta** y pregunta qué principio se afecta.', { letras: ['A', 'B', 'C', 'D'], paras: [['La separación de poderes, porque el gobierno controlaría a los jueces.'], ['El Estado social, porque los jueces ganarían menos.'], ['La descentralización, porque hay jueces en las regiones.'], ['Ninguno, porque el presidente fue elegido por la mayoría.']] }, [
          ['La propuesta: el presidente nombra y retira jueces cuando quiera.', {}],
          ['Esta usa una palabra real, pero el sueldo no es lo que cambia. Trampa.', { luz: [1], nota: { 1: 'no responde' } }],
          ['Esta suena técnica y no tiene nada que ver con el caso.', { luz: [2], nota: { 2: 'fuera de tema' } }],
          ['Esta acepta todo por venir de la mayoría: ni ella está sobre la Constitución.', { luz: [3], nota: { 3: 'autoridad' } }],
          ['Si el que gobierna también manda a los jueces, nadie lo frena.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Busca qué cambia de verdad en la propuesta y descarta lo que solo suena bien.'),
      xpHaz('hoja', 'Un concejo aprueba que el alcalde gaste sin rendir cuentas a nadie. Subraya lo que más se **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La rama judicial, porque los jueces trabajarían menos.'], ['La democracia, porque el concejo fue elegido.'], ['El control, porque nadie revisaría el gasto público.'], ['El Estado social, porque el alcalde ayuda a los pobres.']], pista: 'Pregunta qué deja de pasar si nadie pide cuentas del dinero. Una opción dice algo cierto que no responde.' }, 'Sin rendir cuentas, nadie vigila el dinero público.')],
    cierre: 'Estado bajo la ley y con deberes sociales; tres ramas que se reparten el poder y órganos que vigilan.',
  });

  xpAmplia('icf-sc-constitucion-2', {
    conecta: 'icf-sc-constitucion-1',
    desde: [
      ['Desde cero: qué es un derecho',
        xpMira('dibujo', 'Desde el principio: un **derecho** no es un favor. Es algo que te deben respetar o garantizar.', { dib: reclamo, v: {}, alto: 204 }, [
          ['En la lección de las ramas viste que todos, también el Estado, están bajo la ley.', { hosp: 1 }],
          ['Esa ley te reconoce derechos: cosas que te deben dar o respetar.', { hosp: 1 }],
          ['Si no te entregan la medicina que necesitas, se afecta tu derecho a la salud.', { hosp: 1, pers: 1 }],
          ['Un mecanismo es la herramienta para reclamarlo, como una carta o una demanda corta.', { hosp: 1, pers: 1, doc: 1 }],
          ['Es como la garantía de un celular: dice a dónde ir si algo falla.', { hosp: 1, pers: 1, doc: 1, cartel: 'Mi salud', r: 'derecho + mecanismo' }],
        ], 'Derecho: lo que te deben respetar o dar. Mecanismo: la herramienta para reclamarlo.'),
        xpHaz('hoja', 'Subraya lo que es un **derecho**, no un favor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que el alcalde te salude en la calle.'], ['Estudiar la primaria gratis en un colegio del Estado.'], ['Que te inviten a la fiesta de la cuadra.']], pista: 'Un favor depende del gusto de otro. Busca lo que el Estado te debe aunque no le caigas bien.' }, 'La educación básica en colegios del Estado es un derecho, no un regalo.')],
    ],
    despues: [
      ['Más difícil: una herramienta lleva a otra',
        xpMira('hoja', 'Un paso más: a veces una herramienta **no funciona** y se pasa a otra.', { paras: [['Ana pide por escrito copia de su historia clínica.'], ['Pasan tres semanas y nadie le responde.'], ['Sin esa copia no le programan una cirugía.'], ['Pone una tutela por su derecho de petición y su salud.']] }, [
          ['Primero usa el derecho de petición: pide algo por escrito.', { luz: [0], nota: { 0: 'petición' } }],
          ['La ley da un plazo corto para responder, y ese plazo ya pasó.', { luz: [1], nota: { 1: 'sin respuesta' } }],
          ['Ahora, además, su salud está en riesgo.', { luz: [2] }],
          ['Que no respondan una petición viola un derecho fundamental: cabe la tutela.', { luz: [3], nota: { 3: 'tutela' } }],
          ['Trampa común: pensar que la petición y la tutela son lo mismo. Una pide; la otra protege.', {}],
        ], 'Si una petición no recibe respuesta, se puede pedir protección con una tutela.'),
        xpHaz('hoja', 'El ruido de una discoteca afecta a todo un barrio, y un bebé enfermo no puede dormir. Subraya la lectura **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Solo cabe el habeas corpus, porque nadie descansa.'], ['No hay mecanismo: el ruido no afecta ningún derecho.'], ['El ruido de todos va por acción popular; si la salud del bebé corre riesgo grave, cabe la tutela.']], pista: 'Hay dos problemas a la vez: uno es de todos y otro de una persona. ¿Cuál opción los separa?' }, 'Lo colectivo va por acción popular; el riesgo grave de una persona, por tutela.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Formato que sale mucho: **«Sí/No, porque…»**. Decide primero tú y luego mira la razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque están en juego su educación y su igualdad, y no hay otro medio tan rápido.'], ['Sí, porque la tutela sirve para cualquier problema.'], ['No, porque solo los colombianos tienen derechos.'], ['No, porque primero debe poner una acción popular.']] }, [
          ['El caso: a Pedro le niegan un cupo escolar por ser extranjero. ¿Procede la tutela?', {}],
          ['Esta dice Sí, pero con una razón absoluta: la tutela no sirve para todo.', { luz: [1], nota: { 1: 'absoluto' } }],
          ['Esta es falsa: los extranjeros también tienen derechos en Colombia.', { luz: [2], nota: { 2: 'prejuicio' } }],
          ['Esta cambia la herramienta: la acción popular es para lo de todos.', { luz: [3], nota: { 3: 'herramienta' } }],
          ['Derecho fundamental en juego y sin otro camino eficaz: esa es la razón.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En el Sí/No, la conclusión puede ser buena y la razón falsa: revisa las dos.'),
      xpHaz('hoja', 'Una empresa rellena el humedal de un barrio. Un vecino quiere frenarlo. Subraya el mecanismo y su razón.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Tutela, porque el humedal es propiedad del vecino.'], ['Habeas corpus, porque se están llevando algo.'], ['Acción popular, porque el humedal es un derecho colectivo.'], ['Derecho de petición, porque obliga a la empresa a parar.']], pista: 'Pregunta de quién es el humedal. Ojo: pedir información no obliga a nadie a detener una obra.' }, 'El ambiente es de todos: acción popular.')],
    cierre: 'Mira de quién es el derecho, qué se reclama y si hay otro camino: ahí sale la herramienta.',
  });
}
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
//#archivo js/explora-icf-sc-2-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 2 «Participación y Control», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const gente = (x, s = 0.8) => X.persona(x, 178, s, '#3f6fb5') + X.persona(x + 32, 180, s + 0.02, '#b5493f') + X.persona(x + 64, 178, s, '#3f9b6a');
  // Puesto de votación en un colegio, con la fila y la urna (v.e: el voto entra de 0 a 1).
  const votacion = v => X.foto((v.cole ? X.edificio(80, 166, 120, 'colegio') : '') + (v.gente ? gente(178) : '') +
    (v.urna ? X.urna(298, 176, 0.75, v.e || 0) : '') + (v.r ? X.rot(170, 196, v.r, 'oscuro') : ''), 206, 'ciudad');
  // Una obra pública con su contrato, el dinero de todos y una veedora que mira.
  const vigila = v => X.foto((v.cole ? X.edificio(262, 166, 120, 'colegio') : '') +
    (v.doc ? X.documento(12, 14, 112, 84, ['Obra: colegio', 'Valor pagado'], { titulo: 'Contrato' }) : '') +
    (v.plata ? X.billete(132, 24, 78, '$ 10 000') + X.moneda(226, 36, 12, '$') + X.moneda(254, 46, 12, '$') : '') +
    (v.gente ? X.persona(150, 182, 0.85, '#7a4fb5', { cartel: 'Veeduría' }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');
  // Un conjunto de casas que quiere cambiar su reglamento.
  const reforma = v => X.foto((v.casa ? X.edificio(70, 166, 100, 'casa') : '') +
    (v.doc ? X.documento(200, 14, 126, 88, ['Art. 1: horarios', 'Art. 2: mascotas'], { titulo: 'Reglamento' }) : '') +
    (v.gente ? X.persona(150, 180, 0.8, '#3f6fb5') + X.persona(186, 182, 0.82, '#b5493f') : '') + (v.urna ? X.urna(282, 178, 0.68, v.e || 0) : '') +
    (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-participacion-1', {
    conecta: 'icf-sc-constitucion-2',
    desde: [
      ['Desde cero: qué es participar',
        xpMira('dibujo', 'Desde el principio: **participar** es tomar parte en las decisiones que te afectan. Votar es la forma más conocida.', { dib: votacion, v: { cole: 1 }, alto: 206 }, [
          ['En la lección de derechos viste herramientas para reclamar; participar también es un derecho.', { cole: 1 }],
          ['Participar es tomar parte en lo que se decide sobre tu barrio o tu país.', { cole: 1, gente: 1 }],
          ['Votar es lo más conocido: en el colegio del barrio se arma la fila y la urna.', { cole: 1, gente: 1, urna: 1, e: 0.2 }],
          ['Si eliges a quien decide por ti, es democracia representativa.', { cole: 1, gente: 1, urna: 1, e: 1, r: 'representativa' }],
          ['Si la gente vota el asunto mismo, es participación directa.', { cole: 1, gente: 1, urna: 1, e: 1, r: 'directa' }],
        ], 'Representativa: eliges quién decide. Directa: la gente decide el asunto; la Constitución combina las dos.'),
        xpHaz('hoja', 'Subraya el caso en que la gente **decide directamente** el asunto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los vecinos eligen a su concejal.'], ['Los habitantes votan Sí o No a cambiar el nombre del municipio.'], ['El concejo aprueba los impuestos del año.']], pista: 'En dos de ellas decide alguien elegido. Busca dónde la gente vota el tema mismo.' }, 'Votar el nombre del pueblo es decidir el asunto directamente.')],
    ],
    despues: [
      ['Más difícil: ganar no siempre basta',
        xpMira('hoja', 'Un paso más: una consulta popular obliga solo si gana la mitad más uno **y** vota suficiente gente.', { paras: [['En un municipio hay 30 000 inscritos para votar.'], ['A la consulta van 8 000 personas.'], ['7 500 votan Sí y 500 votan No.'], ['Se pide que vote al menos un tercio de los inscritos.']] }, [
          ['Ganar no basta: también se necesita que vote bastante gente.', { luz: [3], nota: { 3: 'la regla' } }],
          ['Un tercio de 30 000 inscritos son 10 000 votantes.', { luz: [0, 3], nota: { 0: 'mínimo 10 000' } }],
          ['Votaron 8 000: no se llegó al mínimo.', { luz: [1], nota: { 1: 'faltan 2 000' } }],
          ['Aunque el Sí arrasó, la consulta no obliga.', { luz: [2], nota: { 2: 'no obliga' } }],
          ['Trampa común: mirar solo quién ganó y olvidar cuántos votaron.', {}],
        ], 'Una consulta obliga si gana la mitad más uno y vota al menos un tercio de los inscritos.'),
        xpHaz('hoja', 'Un pueblo tiene 12 000 inscritos. En su consulta votan 4 500 y el Sí saca 3 000. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['No obliga, porque el Sí no llegó a 4 500 votos.'], ['Obliga: votó más de un tercio (4 000) y el Sí pasó de la mitad.'], ['No obliga, porque votó menos de la mitad del pueblo.']], pista: 'Saca primero el tercio de 12 000. Luego mira si el Sí pasó de la mitad de los que votaron.' }, 'Votaron 4 500 de un mínimo de 4 000, y 3 000 es más de la mitad.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen da un **objetivo** de un grupo y pregunta qué mecanismo le sirve, con su razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Revocatoria, porque el alcalde no ha hecho parques.'], ['Cabildo abierto, porque permite discutir un tema con el concejo en público.'], ['Plebiscito, porque los jóvenes pueden convocarlo.'], ['Tutela, porque los parques son un derecho fundamental.']] }, [
          ['El objetivo: unos jóvenes quieren que el concejo discuta en público la falta de parques.', {}],
          ['Esta castiga al alcalde, pero ellos quieren discutir, no sacarlo. Fuera de la pregunta.', { luz: [0], nota: { 0: 'otro objetivo' } }],
          ['Esta invierte quién convoca: el plebiscito lo convoca el presidente.', { luz: [2], nota: { 2: 'invertido' } }],
          ['Esta usa una herramienta de reclamo, no de participación.', { luz: [3], nota: { 3: 'otra herramienta' } }],
          ['Hablar con el concejo en público: eso es el cabildo abierto.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Lee el objetivo exacto del grupo: discutir, decidir, proponer o retirar a alguien.'),
      xpHaz('hoja', 'Un municipio quiere que sus habitantes decidan si cambian el horario de la feria anual. Subraya el mecanismo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Plebiscito, porque lo convoca el alcalde.'], ['Revocatoria, porque cambia algo del pueblo.'], ['Cabildo abierto, porque allí la gente vota.'], ['Consulta popular, porque se pregunta un asunto del municipio.']], pista: 'Una opción cambia quién convoca y otra dice que en el cabildo se vota. Busca la que pregunta un asunto.' }, 'Preguntar un asunto del municipio es una consulta popular.')],
    cierre: 'Eliges quién decide o decides tú; cada mecanismo tiene su asunto, y una consulta obliga solo si vota bastante gente.',
  });

  xpAmplia('icf-sc-participacion-2', {
    conecta: 'icf-sc-constitucion-1',
    desde: [
      ['Desde cero: por qué alguien vigila',
        xpMira('dibujo', 'Desde el principio: lo **público** es de todos, y por eso alguien tiene que mirar cómo se usa.', { dib: vigila, v: { cole: 1 }, alto: 208 }, [
          ['En la lección del Estado conociste a la Contraloría, la Procuraduría y la Defensoría.', { cole: 1 }],
          ['El dinero del Estado sale sobre todo de los impuestos que pagamos.', { cole: 1, plata: 1 }],
          ['Ese dinero se gasta con contratos: papeles que dicen qué se hace y a qué precio.', { cole: 1, plata: 1, doc: 1 }],
          ['Si nadie revisa, la obra puede quedar a medias o el dinero irse para amigos.', { cole: 1, plata: 1, doc: 1, r: '¿quién revisa?' }],
          ['Es como la vaca de un paseo: todos quieren ver en qué se gastó.', { cole: 1, plata: 1, doc: 1, gente: 1 }],
        ], 'Lo público es de todos: por eso se revisa el dinero y la conducta de quienes lo manejan.'),
        xpHaz('hoja', 'Subraya de dónde sale, **sobre todo**, el dinero público.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Del bolsillo del alcalde de turno.'], ['De los impuestos que pagan personas y empresas.'], ['De los bancos, que se lo regalan al Estado.']], pista: 'Piensa en la vaca del paseo: ¿quién pone la plata?' }, 'Los impuestos de todos sostienen lo público.')],
    ],
    despues: [
      ['Más difícil: una falta, tres sanciones',
        xpMira('hoja', 'Un paso más: una sola falta puede traer **varias** sanciones, una por cada pregunta.', { paras: [['Una veeduría ve que un comedor escolar pagado no existe.'], ['Lleva las pruebas a los organismos de control y a la Fiscalía.'], ['La Procuraduría destituye al funcionario.'], ['Luego la Fiscalía lo acusa y la Contraloría le cobra el dinero.']] }, [
          ['La veeduría mira y denuncia; no castiga a nadie.', { luz: [0], nota: { 0: 'veeduría' } }],
          ['Con la denuncia, cada entidad abre su propia investigación.', { luz: [1] }],
          ['La Procuraduría juzga la conducta del funcionario y lo puede destituir.', { luz: [2], nota: { 2: 'disciplinaria' } }],
          ['La Fiscalía persigue el delito y la Contraloría busca recuperar el dinero.', { luz: [3], nota: { 3: 'penal y fiscal' } }],
          ['Trampa común: creer que una sanción impide las otras. Responden preguntas distintas.', {}],
        ], 'Una falta puede tener sanción disciplinaria, penal y fiscal: cada una responde algo distinto.'),
        xpHaz('hoja', 'A un funcionario ya lo destituyó la Procuraduría por un contrato amañado. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ya no lo pueden investigar por nada más.'], ['La Fiscalía todavía puede acusarlo si hubo delito.'], ['La veeduría debe ponerle una multa.']], pista: 'La destitución responde a su conducta. ¿Quién responde si hubo delito?' }, 'Conducta y delito son preguntas distintas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen cuenta un caso y pregunta **qué entidad** actúa y por qué. Cada opción falsa tiene su trampa.', { letras: ['A', 'B', 'C', 'D'], paras: [['La Fiscalía, porque toda pérdida de dinero es un delito.'], ['La Defensoría, porque la salud es un derecho.'], ['La Contraloría, porque vigila cómo se gasta el dinero público.'], ['El Congreso, porque aprueba las leyes de salud.']] }, [
          ['El caso: un hospital público pagó ambulancias que nunca llegaron. ¿Quién revisa el gasto?', {}],
          ['Esta generaliza: no toda pérdida es delito, y la pregunta es por el gasto.', { luz: [0], nota: { 0: 'generaliza' } }],
          ['Esta suena noble, pero responde otra pregunta: la de los derechos.', { luz: [1], nota: { 1: 'atractiva' } }],
          ['Esta trae una rama que hace leyes, no que revisa este contrato.', { luz: [3], nota: { 3: 'otra rama' } }],
          ['El rastro del dinero público lo sigue la Contraloría.', { luz: [2], nota: { 2: 'sirve' } }],
        ], 'Pregunta qué se investiga: dinero, conducta, delito o derechos. La palabra clave elige la entidad.'),
      xpHaz('hoja', 'A una señora su EPS le niega una cita y no sabe a quién acudir en su municipio. Subraya quién la **orienta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La Contraloría municipal, porque la EPS maneja dinero.'], ['La Personería, porque defiende los derechos de la gente del municipio.'], ['La Fiscalía, porque negar una cita siempre es delito.'], ['El concejo, porque aprobó el presupuesto.']], pista: 'Ella no pregunta por dinero ni por delitos: necesita que la ayuden con un derecho.' }, 'La Personería acompaña a las personas en su municipio.')],
    cierre: 'Lo público se vigila: dinero, conducta y delito tienen su entidad, y la gente mira y denuncia.',
  });

  xpAmplia('icf-sc-participacion-3', {
    conecta: 'icf-sc-participacion-1',
    desde: [
      ['Desde cero: por qué cuesta cambiar las reglas',
        xpMira('dibujo', 'Desde el principio: **reformar** es cambiar una regla que ya existe. Las reglas más importantes piden más.', { dib: reforma, v: { casa: 1 }, alto: 208 }, [
          ['En la lección de participación viste el referendo: la gente vota una norma.', { casa: 1, urna: 1 }],
          ['Reformar es cambiar o añadir algo a una regla que ya existe.', { casa: 1, doc: 1 }],
          ['En un conjunto de casas, el reglamento no lo cambia un solo vecino.', { casa: 1, doc: 1, gente: 1 }],
          ['Se necesita una asamblea y más votos que de costumbre.', { casa: 1, doc: 1, gente: 1, urna: 1, e: 1 }],
          ['Con la Constitución pasa igual, pero con pasos aún más exigentes.', { casa: 1, doc: 1, gente: 1, urna: 1, e: 1, r: 'más pasos, más votos' }],
        ], 'Reformar es cambiar una regla existente; las más importantes piden más pasos y más votos.'),
        xpHaz('hoja', 'Subraya qué es **reformar** la Constitución.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cumplirla al pie de la letra.'], ['Cambiar o añadir algo a su texto por un camino permitido.'], ['Desobedecerla cuando no gusta.']], pista: 'Reformar no es obedecer ni desobedecer: es tocar el texto mismo.' }, 'Se cambia el texto, por el camino que ella misma fija.')],
    ],
    despues: [
      ['Más difícil: los pasos y el límite',
        xpMira('hoja', 'Un paso más: el **acto legislativo** del Congreso tiene muchos pasos, y la Corte revisa que se cumplan.', { paras: [['Un acto legislativo pasa por ocho debates en el Congreso.'], ['Se reparten en dos periodos de sesiones seguidos.'], ['La Corte Constitucional revisa que se cumplieran los pasos.'], ['El Congreso puede reformar, pero no reemplazar los pilares de la Constitución.']] }, [
          ['Ocho debates: no basta una votación rápida.', { luz: [0], nota: { 0: '8 debates' } }],
          ['Y en dos periodos, para que haya tiempo de pensarlo.', { luz: [1], nota: { 1: 'tiempo' } }],
          ['Después, la Corte mira si el camino se respetó.', { luz: [2], nota: { 2: 'Corte' } }],
          ['Ha dicho que reformar no es sustituir: no se puede borrar, por ejemplo, la división del poder.', { luz: [3], nota: { 3: 'límite' } }],
          ['Trampa común: pensar que con muchos votos se puede cambiar cualquier cosa.', {}],
        ], 'Ocho debates, la Corte revisa el camino y reformar no es reemplazar los pilares.'),
        xpHaz('hoja', 'Un acto legislativo se aprobó en un solo debate «porque era urgente». Subraya lo más **probable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['La Corte lo puede declarar inválido por saltarse los pasos.'], ['Vale, porque la urgencia permite saltar pasos.'], ['Vale, porque el presidente estaba de acuerdo.']], pista: 'Recuerda quién revisa el camino de una reforma y cuántos debates pide.' }, 'Sin los ocho debates, el camino no se respetó.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'El examen pide el **argumento que apoya** una idea. Aquí: que reformar la Constitución sea difícil.', { letras: ['A', 'B', 'C', 'D'], paras: [['Un cambio tan grande debe contar con muchos, para no quitarles derechos a las minorías.'], ['La Constitución de 1991 no se puede cambiar nunca.'], ['Los congresistas ganan más si nadie la cambia.'], ['Todo cambio a las reglas es malo para el país.']] }, [
          ['Se pide una razón que sostenga la idea, no cualquier frase a favor.', {}],
          ['Esta es falsa: hay tres caminos para cambiarla.', { luz: [1], nota: { 1: 'falsa' } }],
          ['Esta inventa un motivo que nada en el caso muestra.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta generaliza con «todo»: sin datos, no sostiene nada.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['Proteger a quien hoy es minoría sí explica por qué debe costar.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Un buen argumento explica el porqué sin absolutos ni motivos inventados.'),
      xpHaz('hoja', 'Se quiere cambiar un artículo por **referendo**. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El presidente lo decide solo, sin votación.'], ['El Congreso lo aprueba por ley y luego la gente vota el texto.'], ['Lo aprueba un juez en diez días.'], ['Basta con reunir firmas, sin votación.']], pista: 'En un referendo siempre vota la gente. Antes, alguien tiene que aprobar llevarlo a las urnas.' }, 'Ley del Congreso y voto de la gente.')],
    cierre: 'La Constitución manda; se reforma por tres caminos exigentes, y reformar no es reemplazar.',
  });
}
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
//#archivo js/explora-icf-sc-3-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 3 «Perspectivas e Intereses», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un lote con árboles que unos quieren de parque y otros de parqueadero; la alcaldía decide.
  const lote = v => X.foto((v.arb ? X.arbol(150, 168, 0.9) + X.arbol(196, 170, 0.75) : '') +
    (v.a ? X.persona(60, 180, 0.85, '#3f9b6a', { cartel: 'Parque sí' }) : '') + (v.b ? X.persona(250, 180, 0.85, '#b5493f', { cartel: 'Parqueo' }) : '') +
    (v.al ? X.edificio(306, 166, 60, 'capitolio', { bandera: false }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');
  // Un río visto por dos personas distintas.
  const lente = v => X.foto((v.rio ? X.rio(188, 16) : '') + (v.arb ? X.arbol(40, 168, 0.8) + X.arbol(300, 166, 0.9) : '') +
    (v.a ? X.persona(110, 172, 0.85, '#d08a2c', { cartel: 'Represa' }) : '') + (v.b ? X.persona(226, 172, 0.85, '#6b4fa0', { cartel: 'Sagrado' }) : '') +
    (v.r ? X.rot(170, 26, v.r, 'oscuro') : ''), 206, 'campo');
  // Un acuerdo entre vecinos, escrito en un acta.
  const acuerdo = v => X.foto((v.cole ? X.edificio(256, 166, 120, 'colegio') : '') +
    (v.gente ? X.persona(110, 180, 0.82, '#3f6fb5') + X.persona(150, 182, 0.84, '#b5493f', v.cartel ? { cartel: v.cartel } : {}) : '') +
    (v.doc ? X.documento(12, 14, 112, 84, ['1. Turnos', '2. Revisión'], { titulo: 'Acta' }) : '') + (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-perspectivas-1', {
    conecta: 'icf-sc-participacion-3',
    desde: [
      ['Desde cero: conflicto y actores',
        xpMira('dibujo', 'Desde el principio: un **conflicto** no es una pelea a golpes. Es cuando lo que unos quieren no cabe con lo que quieren otros.', { dib: lote, v: { arb: 1 }, alto: 208 }, [
          ['En la lección de reformas viste que las reglas protegen a quien hoy es minoría.', { arb: 1 }],
          ['Un conflicto aparece cuando dos o más quieren cosas que no caben a la vez.', { arb: 1, a: 1 }],
          ['Aquí, unos quieren el lote como parque y otros, como parqueadero.', { arb: 1, a: 1, b: 1 }],
          ['Actor es todo el que gana, pierde o decide algo en el caso, como la alcaldía.', { arb: 1, a: 1, b: 1, al: 1 }],
          ['Truco: arma en tu cabeza una tabla con tres columnas.', { arb: 1, a: 1, b: 1, al: 1, r: 'actor · qué quiere · por qué' }],
        ], 'Conflicto: deseos que no caben a la vez. Actor: quien gana, pierde o decide. Tabla: actor, qué quiere, por qué.'),
        xpHaz('hoja', 'En el caso del lote, subraya un **actor** que cuenta aunque no hable en la reunión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los niños que juegan allí cada tarde.'], ['La marca del cemento del andén.'], ['Un turista que pasó una vez.']], pista: 'Actor es quien gana o pierde algo con la decisión. ¿Quién pierde si no hay parque?' }, 'Los niños pierden su lugar de juego: son actores.')],
    ],
    despues: [
      ['Más difícil: la tabla con un actor escondido',
        xpMira('hoja', 'Un paso más: llena la tabla con un caso de **cuatro** actores y busca al que nadie nombra.', { paras: [['Pescadores: quieren el río limpio, porque viven de la pesca.'], ['Empresa minera: quiere sacar oro, porque es su negocio.'], ['Alcaldía: quiere regalías, porque con ellas hace obras.'], ['Familias río abajo: nadie las invitó a la reunión.']] }, [
          ['Cada fila responde lo mismo: actor, qué quiere y por qué.', { luz: [0, 1, 2] }],
          ['Pescadores y minera chocan: unos necesitan el río limpio y la otra lo puede ensuciar.', { luz: [0, 1], nota: { 0: 'choca', 1: 'choca' } }],
          ['La alcaldía parece neutral, pero también gana con la mina.', { luz: [2], nota: { 2: 'interesada' } }],
          ['El más fácil de olvidar: quien sufre el efecto y no está en la mesa.', { luz: [3], nota: { 3: 'ausente' } }],
          ['Trampa común: confundir lo que alguien pide con la razón que lo mueve.', {}],
        ], 'Con la tabla ves los choques, los intereses escondidos y a quien no está en la mesa.'),
        xpHaz('hoja', 'Un colegio pasará su jornada a la tarde; solo se reúnen profesores y directivos. Subraya al actor **ausente**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El rector, que convocó la reunión.'], ['Los profesores, que votaron el cambio.'], ['Las familias que trabajan de tarde y recogen a los niños.']], pista: 'Busca a quien le cambia la vida con la decisión y no estaba sentado allí.' }, 'Las familias cargan el cambio y nadie las oyó.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pregunta típica: **¿qué actor tendría más razones para oponerse?** Usa la tabla, no tu gusto.', { letras: ['A', 'B', 'C', 'D'], paras: [['Las agencias de turismo, porque ganarían clientes.'], ['Los campesinos que siembran café allí, porque perderían dónde cultivar.'], ['Los turistas, porque les gusta el café.'], ['Todos los habitantes, porque nadie quiere cambios.']] }, [
          ['El caso: convertir una vereda cafetera en zona de turismo de aventura.', {}],
          ['Esta invierte el lado: las agencias ganan, así que estarían a favor.', { luz: [0], nota: { 0: 'invertida' } }],
          ['Esta da una razón que no sale del caso.', { luz: [2], nota: { 2: 'sin razón' } }],
          ['Esta generaliza con «todos» y «nadie».', { luz: [3], nota: { 3: 'generaliza' } }],
          ['En la tabla, los cafeteros pierden su tierra de trabajo: ellos se oponen.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Pregunta quién pierde y por qué; descarta lados invertidos y generalizaciones.'),
      xpHaz('hoja', 'Una ciudad prohíbe las ventas ambulantes en el centro para despejar andenes. Subraya el **conflicto** más probable.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Entre peatones y turistas, porque caminan distinto.'], ['Ninguno, porque la norma ya se aprobó.'], ['Entre vendedores, que pierden su ingreso, y quienes quieren andenes libres.'], ['Entre vendedores y bancos, porque cobran intereses.']], pista: 'Arma la tabla: ¿quién pierde con la norma y quién gana con ella?' }, 'Pierden los vendedores y ganan los que caminan: ahí choca.')],
    cierre: 'Actor, qué quiere y por qué: así ves quién choca, quién gana escondido y quién falta en la mesa.',
  });

  xpAmplia('icf-sc-perspectivas-2', {
    conecta: 'icf-sc-perspectivas-1',
    desde: [
      ['Desde cero: el lente de cada uno',
        xpMira('dibujo', 'Desde el principio: dos personas pueden mirar **el mismo río** y ver cosas distintas.', { dib: lente, v: { rio: 1 }, alto: 206 }, [
          ['En la lección de actores viste que cada uno quiere algo por una razón.', { rio: 1 }],
          ['Esa razón sale muchas veces de cómo ve el mundo: su cosmovisión.', { rio: 1, arb: 1 }],
          ['Para una ingeniera, el río puede ser agua para una represa.', { rio: 1, arb: 1, a: 1 }],
          ['Para un pueblo indígena, puede ser parte sagrada de su territorio.', { rio: 1, arb: 1, a: 1, b: 1 }],
          ['Es como unas gafas de color: todos llevamos unas, aunque no las notemos.', { rio: 1, arb: 1, a: 1, b: 1, r: 'cada quien, su lente' }],
        ], 'Cosmovisión: el lente desde el que alguien ve el mundo y decide qué vale.'),
        xpHaz('hoja', 'Subraya la frase que muestra una **cosmovisión** sobre la tierra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El lote mide 300 metros cuadrados.'], ['La tierra es nuestra madre: no se vende.'], ['El bus a la vereda pasa a las seis.']], pista: 'Dos frases solo dan datos. Busca la que dice qué vale la tierra para alguien.' }, 'Ver la tierra como madre es una manera de mirar el mundo.')],
    ],
    despues: [
      ['Más difícil: el prejuicio disfrazado de dato',
        xpMira('hoja', 'Un paso más: a veces el prejuicio **trae un caso real** para parecer razonable.', { paras: [['«Los del barrio Alto no pagan: no les fíe».'], ['«Tres del barrio Alto me quedaron debiendo».'], ['«El registro dice que el 5 % de los clientes del barrio no pagó».'], ['«Hay que mirar el historial de cada cliente».']] }, [
          ['Esta juzga a todo un barrio: prejuicio de los clásicos.', { luz: [0], nota: { 0: 'prejuicio' } }],
          ['Esta trae casos reales, pero tres no hablan por todo un barrio.', { luz: [1], nota: { 1: 'pocos casos' } }],
          ['Esta mira todo el grupo y muestra lo contrario: casi todos pagan.', { luz: [2], nota: { 2: 'dato' } }],
          ['Esta juzga a cada persona por lo que hizo, no por su grupo.', { luz: [3], nota: { 3: 'sin prejuicio' } }],
          ['Trampa: un caso cierto no vuelve justa una generalización.', {}],
        ], 'El prejuicio se delata cuando salta de unos pocos a todos.'),
        xpHaz('hoja', 'Subraya la frase que **generaliza** a partir de pocos casos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['En la encuesta, 8 de cada 10 usuarios calificaron bien el servicio.'], ['Este conductor tiene tres multas por exceso de velocidad.'], ['Dos turistas extranjeros me robaron: los extranjeros son ladrones.']], pista: 'Busca el salto: unos pocos casos y después una frase sobre todo un grupo.' }, 'De dos turistas pasa a «los extranjeros»: generaliza.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pregunta típica: **¿qué supuesto o prejuicio hay en la frase?** Busca lo que da por cierto sin decirlo.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que los campesinos, como grupo, no valoran el estudio.'], ['Que el colegio cuesta demasiado dinero.'], ['Que el funcionario también es campesino.'], ['Que la vereda queda lejos de la ciudad.']] }, [
          ['La frase: «Para qué un colegio en la vereda, si los campesinos no quieren estudiar».', {}],
          ['Esta puede ser cierta en el mundo, pero la frase no lo supone.', { luz: [1], nota: { 1: 'no está' } }],
          ['Esta inventa un dato que la frase no da.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta es otra idea razonable que no explica la frase.', { luz: [3], nota: { 3: 'otra idea' } }],
          ['La frase supone algo de todo un grupo, sin preguntarle: ese es el prejuicio.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'El supuesto es lo que la frase necesita creer para sonar lógica.'),
      xpHaz('hoja', 'Una empresa no contrata mujeres para manejar camiones: «no tienen la fuerza». Subraya la mejor **crítica**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Las mujeres manejan mejor que los hombres.'], ['Juzga a todas por su grupo y no mide la capacidad de cada aspirante.'], ['La empresa debería vender los camiones.'], ['Manejar camiones es un trabajo aburrido.']], pista: 'Una opción responde con otro prejuicio. Busca la que señala el error de juzgar al grupo.' }, 'Señala el prejuicio sin crear otro.')],
    cierre: 'Todos miramos con un lente; el prejuicio salta de pocos casos a todo un grupo y se ve en lo que da por cierto.',
  });

  xpAmplia('icf-sc-perspectivas-3', {
    conecta: 'icf-sc-perspectivas-1',
    desde: [
      ['Desde cero: qué es una salida',
        xpMira('dibujo', 'Desde el principio: una **solución** es una salida que termina o baja un conflicto. Casi nunca deja a todos felices.', { dib: acuerdo, v: { cole: 1 }, alto: 208 }, [
          ['En la lección de actores viste que cada uno quiere algo por una razón.', { cole: 1 }],
          ['Una solución es una salida que termina o baja el conflicto.', { cole: 1, gente: 1 }],
          ['Casi nunca todos ganan todo: cada uno cede algo.', { cole: 1, gente: 1, r: 'cada uno cede algo' }],
          ['Se cumple más si los actores la discuten y queda por escrito.', { cole: 1, gente: 1, doc: 1 }],
          ['Como el control del televisor: turnos acordados antes de que empiece la pelea.', { cole: 1, gente: 1, doc: 1, cartel: 'Acuerdo' }],
        ], 'Solución: salida que baja el conflicto; se cumple más si se acuerda y cada uno cede.'),
        xpHaz('hoja', 'Dos hermanos pelean por el único computador de la casa. Subraya la salida **acordada**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El papá lo esconde para siempre.'], ['Hacen juntos un horario por turnos y lo pegan en la nevera.'], ['El mayor lo usa porque es el mayor.']], pista: 'Dos salidas las impone alguien. Busca la que hicieron los dos.' }, 'La hicieron los dos y quedó a la vista.')],
    ],
    despues: [
      ['Más difícil: lo que no se negocia',
        xpMira('hoja', 'Un paso más: una salida es **incompatible** con un grupo si choca con algo que para él no se negocia.', { paras: [['Que la carretera pase por el sitio sagrado, con un pago al resguardo.'], ['Hacer la consulta previa con el resguardo para decidir el trazado.'], ['Que la empresa decida sola, porque es la que paga.'], ['Que no haya carretera ni otro arreglo, sin oír a nadie.']] }, [
          ['Para el resguardo, el sitio sagrado no tiene precio: pagar no lo arregla.', { luz: [0], nota: { 0: 'incompatible' } }],
          ['Decidir sin ellos choca con la consulta previa, que es su derecho.', { luz: [2], nota: { 2: 'excluye' } }],
          ['Cerrarlo todo sin oír a nadie deja sin vía a quienes la necesitan.', { luz: [3], nota: { 3: 'no oye' } }],
          ['La consulta previa busca un trazado que los dos puedan aceptar.', { luz: [1], nota: { 1: 'compatible' } }],
          ['Trampa: creer que todo se arregla con dinero. Hay valores que no se venden.', {}],
        ], 'Una salida es incompatible si choca con lo que un grupo considera innegociable.'),
        xpHaz('hoja', 'Una comunidad religiosa no trabaja los sábados. Subraya la salida **incompatible** con ella.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Dejar que cambien el turno del sábado por uno del domingo.'], ['Repartir los turnos según lo que cada empleado pueda.'], ['Obligar a todos los empleados a trabajar todos los sábados.']], pista: 'Busca la salida que no le deja ningún espacio a lo que para ellos no se negocia.' }, 'Obligar el sábado choca de frente con su creencia.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué propuesta tiene más probabilidad de ser aceptada por los dos grupos?**', { letras: ['A', 'B', 'C', 'D'], paras: [['Cerrar la cancha, porque el descanso es un derecho.'], ['Jugar hasta las 9 p. m., en un horario acordado entre vecinos y jugadores y revisado cada mes.'], ['Dejar todo igual, porque el deporte es sano.'], ['Que los vecinos se muden a otro barrio.']] }, [
          ['El caso: los vecinos quieren dormir y unos jugadores usan de noche una cancha iluminada.', {}],
          ['Esta suena justa, pero solo atiende a los vecinos.', { luz: [0], nota: { 0: 'un lado' } }],
          ['Esta también suena bien, pero solo atiende a los jugadores.', { luz: [2], nota: { 2: 'un lado' } }],
          ['Esta no se puede cumplir: no es viable.', { luz: [3], nota: { 3: 'inviable' } }],
          ['Acordada por los dos, con límite y revisión: atiende a ambos.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'La salida que dura atiende a los dos lados, se puede cumplir y se revisa.'),
      xpHaz('hoja', 'En un pueblo turístico falta agua en verano; hoteles y campesinos la necesitan. Subraya la salida que atiende **a los dos**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Darles toda el agua a los hoteles, que traen dinero.'], ['Prohibir el turismo para siempre.'], ['Que cada uno saque lo que pueda.'], ['Cupos y turnos acordados en un comité de hoteles y campesinos.']], pista: 'Descarta las que dejan a un grupo sin nada o que nadie controla.' }, 'Cupos acordados entre los dos grupos.')],
    cierre: 'A quién atiende, si choca con algo innegociable, si se puede cumplir y si la acordaron todos.',
  });
}
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
//#archivo js/explora-icf-sc-4-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 4 «Fuentes y Argumentos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un escritorio de archivo: una carta vieja, un periódico y la lupa.
  const archivo = v => X.foto((v.doc ? X.documento(14, 16, 140, 112, ['Querida madre:', 'aquí en la mina', 'todo es duro.'], { titulo: 'Carta', fecha: '1885' }) : '') +
    (v.per ? X.periodico(184, 20, 140, 112, 'Llega el tren', { foto: 1 }) : '') + (v.lupa ? X.lupa(150, 150, 20) : '') +
    (v.r ? X.rot(250, 172, v.r, 'oscuro') : ''), 196, 'papel');
  // Un periódico con su titular y la encuesta en que se apoya.
  const prueba = v => X.foto((v.per ? X.periodico(14, 18, 146, 116, 'Todos quieren ciclorrutas') : '') +
    (v.doc ? X.documento(190, 18, 136, 104, ['200 personas', 'solo barrio Norte', '70 % dice sí'], { titulo: 'Encuesta' }) : '') +
    (v.lupa ? X.lupa(176, 150, 20) : '') + (v.r ? X.rot(250, 168, v.r, 'oscuro') : ''), 196, 'papel');
  // Una caricatura: un político enorme y la gente diminuta.
  const caricatura = v => X.foto((v.per ? X.periodico(12, 14, 118, 96, 'Opinión', { nombre: 'LA VOZ' }) : '') +
    (v.big ? X.persona(238, 178, 1.5, '#2b3440') + X.rot(238, 30, 'Lo prometo todo') : '') +
    (v.chicos ? X.persona(170, 182, 0.42, '#3f9b6a') + X.persona(190, 182, 0.42, '#b5493f') + X.persona(306, 182, 0.42, '#3f6fb5') : '') +
    (v.r ? X.rot(110, 150, v.r, 'oscuro') : ''), 206, 'ciudad');

  xpAmplia('icf-sc-fuentes-1', {
    conecta: 'icf-sc-perspectivas-2',
    desde: [
      ['Desde cero: qué es una fuente',
        xpMira('dibujo', 'Desde el principio: una **fuente** es todo lo que nos deja saber algo del pasado. Hay que leerla como a un testigo.', { dib: archivo, v: { doc: 1 }, alto: 196 }, [
          ['En la lección de cosmovisiones viste que cada quien mira con su lente.', { doc: 1 }],
          ['Una fuente es toda huella del pasado: cartas, fotos, periódicos, cuentas, objetos.', { doc: 1, per: 1 }],
          ['Quien la hizo también tenía su lente, y eso queda en lo que escribió.', { doc: 1, per: 1, r: '¿quién la hizo?' }],
          ['Leerla es como oír un chisme: preguntas quién lo cuenta, cuándo y para qué.', { doc: 1, per: 1, lupa: 1 }],
          ['Por eso, lo primero que se busca es el autor y la fecha.', { doc: 1, per: 1, lupa: 1, r: 'autor y fecha' }],
        ], 'Fuente: huella del pasado. Lo primero: quién la hizo, cuándo y desde qué lente.'),
        xpHaz('hoja', 'Subraya lo que **sí** es una fuente para estudiar la vida en una hacienda del siglo XIX.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El libro de cuentas de la hacienda, escrito en esa época.'], ['Una película de acción estrenada este año.'], ['Tu opinión sobre las haciendas.']], pista: 'Una fuente es una huella que dejó ese tiempo. ¿Cuál viene de entonces?' }, 'El libro de cuentas es una huella de la época.')],
    ],
    despues: [
      ['Más difícil: la misma fuente, dos usos',
        xpMira('hoja', 'Un paso más: una fuente con interés puede ser mala para un dato y **muy buena** para otra pregunta.', { paras: [['Un afiche oficial de hace 80 años dice: «En nuestro país no hay pobres».'], ['Como prueba de que no había pobres, sirve poco.'], ['Como prueba de cómo quería verse el gobierno, sirve mucho.'], ['Todo depende de la pregunta que le hagas.']] }, [
          ['El afiche se hizo para convencer, no para informar.', { luz: [0], nota: { 0: 'propaganda' } }],
          ['Si preguntas si había pobres, no le puedes creer sin más.', { luz: [1], nota: { 1: 'débil' } }],
          ['Si preguntas qué quería mostrar el gobierno, es una prueba directa.', { luz: [2], nota: { 2: 'fuerte' } }],
          ['La utilidad de una fuente cambia con la pregunta.', { luz: [3] }],
          ['Trampa: botar una fuente por tener interés. Hasta lo que exagera dice algo.', {}],
        ], 'Una fuente interesada puede fallar en un dato y servir para entender a quien la hizo.'),
        xpHaz('hoja', 'El diario de un capataz dice que «los peones trabajan felices». Subraya para qué **sí** sirve bien.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Para probar que los peones eran felices.'], ['Para saber cómo veía el capataz a los peones.'], ['Para saber cuánto ganan hoy los peones.']], pista: 'El capataz tenía interés en que todo se viera bien. ¿De quién habla mejor su diario?' }, 'El diario muestra la mirada del capataz.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿la fuente le sirve a la investigadora?** con opciones de Sí y No y su porqué.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque es una fuente primaria de la época.'], ['Sí, porque los registros oficiales siempre dicen la verdad.'], ['No, porque toda fuente vieja es falsa.'], ['No del todo, porque la fuente no registra a las mujeres; habría que buscar otras.']] }, [
          ['El caso: quiere saber cómo vivían las mujeres de un pueblo minero hacia 1900 y solo tiene la nómina de la mina.', {}],
          ['Ser de la época no basta: hay que ver si habla del tema.', { luz: [0], nota: { 0: 'no basta' } }],
          ['«Siempre» y «oficial» son trampa: aceptar por autoridad.', { luz: [1], nota: { 1: 'autoridad' } }],
          ['«Toda fuente vieja» generaliza: lo viejo no es falso.', { luz: [2], nota: { 2: 'generaliza' } }],
          ['La nómina solo pagaba a hombres: las mujeres no aparecen. Falta buscar más.', { luz: [3], nota: { 3: 'sirve' } }],
        ], 'Pregunta si la fuente habla de lo que se investiga y a quién deja por fuera.'),
      xpHaz('hoja', 'Un historiador quiere saber qué mercancías entraban al puerto de Cartagena hacia 1780. Subraya la fuente que **más** le sirve.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Una novela de piratas escrita hace poco.'], ['Los libros de impuestos del puerto de esa época, que anotaban cada carga.'], ['La opinión de un turista que visita hoy la ciudad.'], ['Un mapa actual de Cartagena.']], pista: 'Busca la fuente que es de ese tiempo y que mide justo lo que él pregunta.' }, 'Es de la época y anota cada carga.')],
    cierre: 'De cuándo es, quién la hizo y para qué, de quién habla y de quién calla, y qué pregunta le haces.',
  });

  xpAmplia('icf-sc-fuentes-2', {
    conecta: 'icf-sc-fuentes-1',
    desde: [
      ['Desde cero: qué es una prueba',
        xpMira('dibujo', 'Desde el principio: una **prueba** es lo que hace más creíble una afirmación. Pero cada fuente prueba poco.', { dib: prueba, v: { per: 1 }, alto: 196 }, [
          ['En la lección anterior viste que una fuente sirve según la pregunta que le hagas.', { per: 1 }],
          ['Una prueba es lo que vuelve más creíble una afirmación.', { per: 1, doc: 1 }],
          ['Pero una fuente solo prueba lo que midió, y donde lo midió.', { per: 1, doc: 1, r: '¿qué midió?' }],
          ['El titular habla de «todos», y la encuesta fue en un solo barrio.', { per: 1, doc: 1, r: '¿dónde?' }],
          ['Es como probar la sopa con una cucharada: sirve si la revolviste bien.', { per: 1, doc: 1, lupa: 1 }],
        ], 'Una fuente prueba lo que midió, donde lo midió: ni un paso más.'),
        xpHaz('hoja', 'En la encuesta del barrio Norte, el 70 % quiere ciclorrutas. Subraya lo que queda **probado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que toda la ciudad quiere ciclorrutas.'], ['Que la mayoría de los encuestados del barrio Norte las quiere.'], ['Que las ciclorrutas bajan los accidentes.']], pista: 'Mira a quién preguntaron y qué les preguntaron. No digas más que eso.' }, 'Solo se preguntó en un barrio, y solo por el gusto.')],
    ],
    despues: [
      ['Más difícil: apoya, debilita o no pesa',
        xpMira('hoja', 'Un paso más: el examen pone una **tesis** y varios datos. Cada dato la apoya, la debilita o no pesa.', { paras: [['Tesis: la ciclorruta bajó los accidentes de la avenida.'], ['Tras abrirla, los accidentes bajaron de 40 a 22 al año.'], ['En otra avenida sin ciclorruta, los accidentes no cambiaron.'], ['Ese mismo año pusieron cámaras de velocidad en la avenida.'], ['A los ciclistas les gusta el color de la ciclorruta.']] }, [
          ['Pon cada dato junto a la tesis: ¿la deja más firme o más débil?', { luz: [0], nota: { 0: 'tesis' } }],
          ['Bajar de 40 a 22 apoya la tesis.', { luz: [1], nota: { 1: 'apoya' } }],
          ['Que la otra avenida no cambiara la apoya más: es una comparación.', { luz: [2], nota: { 2: 'apoya' } }],
          ['Las cámaras son otra explicación posible: la debilitan.', { luz: [3], nota: { 3: 'debilita' } }],
          ['El color no dice nada de accidentes: no pesa.', { luz: [4], nota: { 4: 'no pesa' } }],
          ['Trampa: un dato verdadero no siempre sirve para la tesis.', {}],
        ], 'Cada dato apoya, debilita o no pesa; otra causa posible siempre debilita.'),
        xpHaz('hoja', 'Tesis: «el comedor escolar mejoró la asistencia». Subraya el dato que la **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La asistencia subió del 80 % al 92 %.'], ['Ese mismo año empezó un bus gratis al colegio.'], ['Los niños dicen que la comida es rica.']], pista: 'Busca el dato que ofrece otra explicación para la misma subida.' }, 'El bus también pudo subir la asistencia.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué haría falta para sostener la conclusión?** Busca lo que separa las explicaciones.', { letras: ['A', 'B', 'C', 'D'], paras: [['Saber si la gente dejó de denunciar, por ejemplo porque cerraron la estación.'], ['Que el alcalde lo repita en televisión.'], ['Que un 30 % es un número grande.'], ['Nada, porque las cifras oficiales no se discuten.']] }, [
          ['El caso: las denuncias por robo bajaron 30 % y la alcaldía concluye que hay menos robos.', {}],
          ['Repetirlo no lo vuelve cierto: es aceptar por autoridad.', { luz: [1], nota: { 1: 'autoridad' } }],
          ['El tamaño del número no separa las dos explicaciones.', { luz: [2], nota: { 2: 'no pesa' } }],
          ['Toda cifra se puede revisar: «no se discute» es trampa.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['Denuncias no son robos: si la gente dejó de denunciar, la conclusión cae.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Pregunta qué midió la fuente y qué otra cosa pudo producir el mismo número.'),
      xpHaz('hoja', 'Un estudio halla que quienes desayunan sacan mejores notas. Subraya la lectura **prudente**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Desayunar causa buenas notas en todos.'], ['El estudio es falso porque habla de comida.'], ['Van juntos, pero puede haber otra causa, como el apoyo de la familia.'], ['Hay que obligar a todos a desayunar.']], pista: 'Que dos cosas vayan juntas, ¿prueba cuál causa cuál? Busca la que no dice de más.' }, 'Juntas no es por: falta descartar otras causas.')],
    cierre: 'Qué mide la fuente, dónde lo midió, si cada dato apoya o debilita y qué otra explicación cabe.',
  });

  xpAmplia('icf-sc-fuentes-3', {
    conecta: 'icf-sc-fuentes-1',
    desde: [
      ['Desde cero: un dibujo que opina',
        xpMira('dibujo', 'Desde el principio: una **caricatura** no es una foto. Es un dibujo hecho para dar una opinión.', { dib: caricatura, v: { per: 1 }, alto: 206 }, [
          ['En la lección de fuentes viste que toda fuente tiene autor, fecha y propósito.', { per: 1 }],
          ['Una caricatura es un dibujo que opina: no informa, toma partido.', { per: 1, big: 1 }],
          ['Exagera lo que quiere criticar: aquí, el político es enorme.', { per: 1, big: 1, r: 'exagera' }],
          ['Y lo compara con algo: la gente se ve diminuta a su lado.', { per: 1, big: 1, chicos: 1 }],
          ['Leerla es preguntar qué agranda, qué achica y qué quiere que pienses.', { per: 1, big: 1, chicos: 1, r: '¿qué agranda?' }],
        ], 'La caricatura opina exagerando y comparando: pregunta qué agranda y qué achica.'),
        xpHaz('hoja', 'En la caricatura hay un político gigante y gente diminuta. Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El político se siente muy por encima de la gente.'], ['El político es muy alto en la vida real.'], ['A la gente le gusta mirar hacia arriba.']], pista: 'La caricatura no mide estaturas: el tamaño es un símbolo. ¿De qué?' }, 'El tamaño simboliza poder y distancia.')],
    ],
    despues: [
      ['Más difícil: qué sostiene un discurso',
        xpMira('hoja', 'Un paso más: en un discurso se mezclan **datos**, citas famosas y ataques. Solo unos sostienen la propuesta.', { paras: [['«Como dijo un premio Nobel, la educación lo cambia todo».'], ['«El año pasado, 3 de cada 10 jóvenes de las veredas dejaron el colegio».'], ['«Mi rival nunca estudió en un colegio público».'], ['«Por eso propongo transporte escolar gratis en las veredas».']] }, [
          ['Citar a un famoso adorna, pero no prueba la propuesta.', { luz: [0], nota: { 0: 'autoridad' } }],
          ['Este es un dato que se puede revisar: sí es una razón.', { luz: [1], nota: { 1: 'dato' } }],
          ['Esto ataca a la persona; no discute la idea.', { luz: [2], nota: { 2: 'ataque' } }],
          ['Esta es la propuesta: el dato le da apoyo; la cita y el ataque, no.', { luz: [3], nota: { 3: 'propuesta' } }],
          ['Trampa: aceptar una idea solo porque la dijo alguien importante.', {}],
        ], 'Solo los datos revisables apoyan la propuesta; citas famosas y ataques no la prueban.'),
        xpHaz('hoja', 'Subraya la frase que **sí** da una razón revisable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«Un gran pensador estaría de acuerdo conmigo».'], ['«En el barrio hay un solo médico para 9 000 personas».'], ['«Mis rivales son unos mentirosos».']], pista: 'Una razón revisable se puede contar o comprobar. Las otras se apoyan en alguien.' }, 'Médicos y personas se pueden contar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué critica la caricatura?** La respuesta junta la imagen con la frase.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que la publicidad oficial dice lo contrario de lo que se ve.'], ['Que todos los ríos del país están sucios.'], ['Que los carteles de la orilla son feos.'], ['Que la gente no debe bañarse en el río.']] }, [
          ['La imagen: un río lleno de basura y un cartel que dice «Río limpio, gracias a nosotros».', {}],
          ['Esta generaliza: el dibujo muestra un río, no todos.', { luz: [1], nota: { 1: 'generaliza' } }],
          ['Esta se queda en lo literal: no habla del choque.', { luz: [2], nota: { 2: 'literal' } }],
          ['Esta da un consejo que el dibujo no da.', { luz: [3], nota: { 3: 'fuera' } }],
          ['La frase choca con la escena: critica la propaganda que no cumple.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En la caricatura, la crítica está en el choque entre lo que se dice y lo que se ve.'),
      xpHaz('hoja', 'Un candidato dice: «O aprueban mi plan, o el barrio se hunde en el caos». Subraya la **estrategia** que usa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Da un dato verificable sobre el barrio.'], ['Presenta solo dos salidas, como si no hubiera otras.'], ['Cita a una autoridad reconocida.'], ['Reconoce los argumentos de su rival.']], pista: 'Cuenta las salidas que deja la frase. ¿Hay de verdad solo esas?' }, 'Es una falsa elección: deja solo dos caminos.')],
    cierre: 'Qué exagera, con qué choca la frase y qué queda cuando quitas citas famosas y ataques.',
  });
}
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
//#archivo js/explora-icf-sc-5-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 5 «Problemas Complejos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Una fábrica junto a un río con peces; con `bota`, sale un chorro sucio al río.
  const rioFab = v => X.foto((v.rio ? X.rio(188, 18) : '') + (v.peces ? X.pez(70, 192, 0.55) + X.pez(150, 190, 0.5, '#e0b030') : '') +
    (v.fab ? X.edificio(256, 172, 120, 'fabrica', { humo: v.humo ? 1 : 0 }) : '') + (v.bota ? '<path d="M214 166 L214 180 Q210 188 196 189" stroke="#5b4a2a" stroke-width="5" fill="none"/><ellipse cx="168" cy="190" rx="44" ry="6" fill="#6b5a3a" opacity=".75"/>' : '') +
    (v.r ? X.rot(110, 30, v.r, 'oscuro') : ''), 212, 'campo');
  // Un pueblo con sus casas, una fábrica, el río y dos personas que piden cosas distintas.
  const caras = v => X.foto((v.rio ? X.rio(192, 14) : '') + (v.casa ? X.edificio(52, 172, 80, 'casa') : '') + (v.fab ? X.edificio(272, 172, 110, 'fabrica') : '') +
    (v.a ? X.persona(140, 180, 0.8, '#d08a2c', { cartel: 'Empleo' }) : '') + (v.b ? X.persona(200, 180, 0.8, '#3f9b6a', { cartel: 'Agua' }) : '') +
    (v.r ? X.rot(170, 26, v.r, 'oscuro') : ''), 212, 'campo');
  // La alcaldía saca una medida y la gente se acomoda.
  const medida = v => X.foto((v.cap ? X.edificio(264, 166, 110, 'capitolio') : '') +
    (v.doc ? X.documento(12, 14, 120, 86, ['Desde el lunes:', 'nueva regla'], { titulo: 'Decreto', sello: 'A' }) : '') +
    (v.gente ? X.persona(150, 180, 0.8, '#3f6fb5') + X.persona(182, 182, 0.82, '#b5493f') + X.persona(214, 180, 0.8, '#3f9b6a') : '') +
    (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-sistemico-1', {
    conecta: 'icf-sc-fuentes-2',
    desde: [
      ['Desde cero: causa y consecuencia',
        xpMira('dibujo', 'Desde el principio: una **causa** hace que algo pase; una **consecuencia** es lo que resulta.', { dib: rioFab, v: { rio: 1, peces: 1 }, alto: 212 }, [
          ['En la lección de pruebas viste que un mismo dato puede tener otra explicación.', { rio: 1, peces: 1 }],
          ['Una causa es lo que hace que algo pase; la consecuencia es lo que resulta.', { rio: 1, peces: 1, fab: 1, humo: 1 }],
          ['La fábrica bota residuos al río: esa es una causa.', { rio: 1, peces: 1, fab: 1, humo: 1, bota: 1, r: 'causa' }],
          ['Los peces desaparecen: esa es una consecuencia.', { rio: 1, peces: 0, fab: 1, humo: 1, bota: 1, r: 'consecuencia' }],
          ['Como fichas de dominó: una tumba a la siguiente, siempre en orden.', { rio: 1, peces: 0, fab: 1, humo: 1, bota: 1, r: 'causa → consecuencia' }],
        ], 'Causa: lo que hace que algo pase. Consecuencia: lo que resulta. Van en orden, como fichas de dominó.'),
        xpHaz('hoja', '«Llovió una semana entera y el río se desbordó». Subraya la **consecuencia**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Llovió una semana entera.'], ['El río se desbordó.'], ['Era el mes de octubre.']], pista: 'La consecuencia es lo que resultó. ¿Qué pasó por culpa de lo otro?' }, 'El desborde resultó de la lluvia.')],
    ],
    despues: [
      ['Más difícil: consecuencia cercana y lejana',
        xpMira('hoja', 'Un paso más: las consecuencias van en **eslabones**. Unas aparecen enseguida y otras mucho después.', { paras: [['Cierran la única fábrica del pueblo.'], ['Cien personas quedan sin empleo.'], ['Las tiendas venden menos.'], ['Algunas familias se van a la ciudad y baja la matrícula del colegio.']] }, [
          ['La consecuencia directa aparece enseguida: se pierde el empleo.', { luz: [0, 1], nota: { 1: 'directa' } }],
          ['Sin salario, la gente compra menos en las tiendas.', { luz: [2], nota: { 2: 'segunda' } }],
          ['Más lejos: familias que se van y un colegio con menos niños.', { luz: [3], nota: { 3: 'lejana' } }],
          ['Cuantos más eslabones, más otras causas pueden meterse en el camino.', {}],
          ['Trampa: si piden la consecuencia directa, no elijas la lejana aunque sea cierta.', {}],
        ], 'Distingue la consecuencia directa de las lejanas: cada eslabón suma otras causas posibles.'),
        xpHaz('hoja', 'Sube el precio del pasaje de bus. Subraya la consecuencia **más directa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los usuarios gastan más para moverse.'], ['Meses después baja la venta de ropa en el centro.'], ['Cambia el clima de la ciudad.']], pista: 'La directa no necesita otros eslabones en el medio.' }, 'Pagar más por el pasaje pasa enseguida.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿cuál es la causa de fondo?** Una opción será el detonante, que suena muy lógico.', { letras: ['A', 'B', 'C', 'D'], paras: [['La lluvia fuerte de la última semana.'], ['La pérdida de humedales y quebradas que recogían el agua.'], ['Que la gente no quiere a su ciudad.'], ['Que el alcalde lleva poco tiempo.']] }, [
          ['El caso: las inundaciones aumentaron tras diez años de tapar humedales y quebradas con cemento.', {}],
          ['La lluvia dispara la inundación, pero llueve igual que antes: es el detonante.', { luz: [0], nota: { 0: 'detonante' } }],
          ['Esta juzga a la gente sin ningún dato del caso.', { luz: [2], nota: { 2: 'sin dato' } }],
          ['Esta solo coincide en el tiempo: juntas no es por.', { luz: [3], nota: { 3: 'coincidencia' } }],
          ['Sin dónde guardar el agua, cualquier aguacero inunda: esa es la causa de fondo.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'La causa de fondo venía preparando el problema; el detonante solo lo disparó.'),
      xpHaz('hoja', 'Cerraron un puerto y, meses después, bajaron las ventas de los restaurantes cercanos. Subraya la **cadena** correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Los restaurantes subieron precios y por eso cerró el puerto.'], ['Menos barcos y viajeros, menos clientes, menos ventas.'], ['Bajaron las ventas porque cambió el menú.'], ['Las ventas bajas hicieron cerrar el puerto.']], pista: 'Revisa el orden de las flechas: ¿qué pasó primero? Una opción trae una causa sin dato.' }, 'Del cierre a los clientes y de los clientes a las ventas.')],
    cierre: 'Separa detonante y causa de fondo, sigue la cadena eslabón por eslabón y no confundas juntas con por.',
  });

  xpAmplia('icf-sc-sistemico-2', {
    conecta: 'icf-sc-sistemico-1',
    desde: [
      ['Desde cero: un problema con varias caras',
        xpMira('dibujo', 'Desde el principio: un problema es como un dado. Según la **cara** que mires, ves una cosa distinta.', { dib: caras, v: { rio: 1, fab: 1 }, alto: 212 }, [
          ['En la lección anterior viste que una causa trae consecuencias en cadena.', { rio: 1, fab: 1 }],
          ['Esas consecuencias caen en varias dimensiones: caras de un mismo problema.', { rio: 1, fab: 1, casa: 1 }],
          ['La fábrica da empleo: esa es la cara económica.', { rio: 1, fab: 1, casa: 1, a: 1 }],
          ['Si el río se ensucia, es la cara ambiental.', { rio: 1, fab: 1, casa: 1, a: 1, b: 1 }],
          ['También hay cara social, cultural, legal y política, según qué se toque.', { rio: 1, fab: 1, casa: 1, a: 1, b: 1, r: 'seis caras' }],
        ], 'Un problema tiene varias caras: económica, ambiental, social, cultural, legal y política.'),
        xpHaz('hoja', 'Subraya la frase de la dimensión **ambiental**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La fábrica paga buenos salarios.'], ['Los peces del río están desapareciendo.'], ['El concejo cambió la norma de usos del suelo.']], pista: 'Lo ambiental habla de la naturaleza: agua, aire, animales, plantas.' }, 'Los peces del río son la cara ambiental.')],
    ],
    despues: [
      ['Más difícil: el choque cambia con el tiempo',
        xpMira('hoja', 'Un paso más: mira las dimensiones **y el tiempo**. Quien pierde hoy puede ganar mañana.', { paras: [['Se prohíbe pescar en la ciénaga tres meses al año.'], ['Los peces se reproducen y vuelven a aumentar.'], ['Los pescadores pierden su ingreso esos meses.'], ['Se les paga un apoyo mientras dura la veda.']] }, [
          ['Prohibir la pesca unos meses deja que los peces se reproduzcan.', { luz: [0, 1], nota: { 1: 'ambiental' } }],
          ['Hoy, los pescadores pierden su ingreso: choque económico.', { luz: [2], nota: { 2: 'corto plazo' } }],
          ['Pero en unos años habrá más peces, y esos pescadores ganan.', { luz: [1], nota: { 1: 'largo plazo' } }],
          ['El apoyo durante la veda cubre el hueco del corto plazo.', { luz: [3], nota: { 3: 'puente' } }],
          ['Trampa: mirar un solo momento. La pérdida de hoy puede ser la ganancia de mañana.', {}],
        ], 'Mira las dimensiones y el tiempo: lo que hoy pierde un grupo puede ganarlo mañana.'),
        xpHaz('hoja', 'Una ciudad cobra por entrar en carro al centro. Subraya la lectura que mira **corto y largo plazo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Hoy molesta a quienes manejan; con el tiempo puede bajar el trancón y el humo.'], ['Es solo un cobro más y no cambia nada.'], ['Es buena porque todo el mundo usa bicicleta.']], pista: 'Busca la opción que dice qué pasa ahora y qué pasa después.' }, 'Molestia hoy, menos trancón y humo después.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué dimensiones entran en choque?** Las dos tienen que salir del caso.', { letras: ['A', 'B', 'C', 'D'], paras: [['La económica, por los turistas, y la ambiental, porque el páramo produce agua.'], ['La cultural y la deportiva, porque los turistas hacen deporte.'], ['Ninguna, porque los aeropuertos traen progreso.'], ['Solo la política, porque el alcalde decide.']] }, [
          ['El caso: un municipio quiere hacer un aeropuerto en un páramo para traer turistas.', {}],
          ['Esta inventa una dimensión que el caso no trae.', { luz: [1], nota: { 1: 'inventa' } }],
          ['Esta suena positiva, pero niega el choque que el caso muestra.', { luz: [2], nota: { 2: 'atractiva' } }],
          ['Esta reduce todo a quién decide.', { luz: [3], nota: { 3: 'reduce' } }],
          ['Turistas que traen dinero contra un páramo que da agua: ahí chocan.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Nombra qué mejora y qué empeora en el caso: esas son las dimensiones que chocan.'),
      xpHaz('hoja', 'Plan: tumbar las casas de bahareque de un barrio antiguo para hacer edificios modernos. Subraya la dimensión que se **descuida** más.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La económica, porque los edificios valen más.'], ['La cultural, porque se pierde una arquitectura que es memoria del barrio.'], ['La ambiental, porque los edificios dan sombra.'], ['Ninguna, porque modernizar siempre es mejor.']], pista: 'Pregunta qué se pierde que no se puede volver a comprar.' }, 'Las casas antiguas son memoria: dimensión cultural.')],
    cierre: 'Nombra las caras del problema, di cuáles chocan, mira el tiempo y busca ceder en cada una.',
  });

  xpAmplia('icf-sc-sistemico-3', {
    conecta: 'icf-sc-sistemico-2',
    desde: [
      ['Desde cero: qué es intervenir',
        xpMira('dibujo', 'Desde el principio: **intervenir** es actuar a propósito para cambiar un problema. Y la gente siempre responde.', { dib: medida, v: { cap: 1 }, alto: 208 }, [
          ['En la lección anterior viste que un problema tiene caras que chocan.', { cap: 1 }],
          ['Intervenir es actuar a propósito sobre él: una ley, un programa, un cobro.', { cap: 1, doc: 1 }],
          ['Toda intervención tiene una meta: lo que se quiere lograr.', { cap: 1, doc: 1, r: 'meta' }],
          ['Y la gente responde: cambia lo que hace para acomodarse.', { cap: 1, doc: 1, gente: 1 }],
          ['Como apretar un globo: lo que hundes por un lado sale por otro.', { cap: 1, doc: 1, gente: 1, r: 'la gente se acomoda' }],
        ], 'Intervenir es actuar para cambiar un problema; tiene una meta y la gente se acomoda.'),
        xpHaz('hoja', 'Subraya cuál es una **intervención**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Llovió más de lo normal en abril.'], ['Un barrio cumplió 50 años.'], ['El alcalde crea un programa de comedores escolares.']], pista: 'Una intervención la hace alguien a propósito para cambiar algo.' }, 'El programa es una acción hecha a propósito.')],
    ],
    despues: [
      ['Más difícil: cuando sale al revés',
        xpMira('hoja', 'Un paso más: una medida puede lograr **lo contrario** de lo que buscaba.', { paras: [['Un jardín infantil multa a los padres que recogen tarde a los niños.'], ['Antes, llegar tarde daba vergüenza.'], ['Ahora muchos piensan: «pago y listo».'], ['Los retrasos aumentan en vez de bajar.']] }, [
          ['La meta era clara: que los padres llegaran a tiempo.', { luz: [0], nota: { 0: 'meta' } }],
          ['Pero la multa cambió el sentido de llegar tarde.', { luz: [1] }],
          ['Lo volvió un servicio que se paga: ya no da vergüenza.', { luz: [2], nota: { 2: 'se acomodan' } }],
          ['Resultado: más retrasos. El efecto fue el contrario.', { luz: [3], nota: { 3: 'al revés' } }],
          ['Trampa: suponer que la gente obedece sin pensar. Responde a la regla nueva.', {}],
        ], 'Una medida puede lograr lo contrario si cambia cómo la gente entiende lo que hace.'),
        xpHaz('hoja', 'Para cuidar un parque, empiezan a cobrar la entrada. Subraya el efecto **no buscado** más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Las familias pobres dejan de ir y se quedan sin dónde jugar.'], ['El parque recibe dinero para mantenerse.'], ['Los árboles crecen más rápido.']], pista: 'Uno es justo lo que se buscaba. El no buscado le cae a alguien que nadie tuvo en cuenta.' }, 'Nadie quería dejar sin parque a quien no puede pagar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué efecto no esperado es más probable?** Piensa cómo se acomodaría la gente.', { letras: ['A', 'B', 'C', 'D'], paras: [['La gente compra varias botellas pequeñas y toma lo mismo.'], ['Las gaseosas desaparecen del país.'], ['La venta de agua sube un 100 %.'], ['Nadie vuelve a tomar gaseosa.']] }, [
          ['El caso: un impuesto alto, solo a las gaseosas de botella grande, para que se tome menos.', {}],
          ['Esta exagera: un impuesto no borra un producto.', { luz: [1], nota: { 1: 'exagera' } }],
          ['Esta inventa una cifra que el caso no da.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta es absoluta: «nadie» casi nunca es verdad.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['El impuesto deja libre la botella pequeña: la gente se pasa a ella.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'El efecto no esperado sale de ver por dónde se escapa la gente de la regla.'),
      xpHaz('hoja', 'Meta: bajar las muertes en las vías. Subraya lo que de verdad **mide** si se logró.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El número de multas que se pusieron.'], ['Los kilómetros de vía pintados.'], ['Las muertes en las vías por cada 100 000 habitantes, antes y después.'], ['Los afiches repartidos en la campaña.']], pista: 'Tres opciones miden lo que se hizo, no lo que se quería lograr.' }, 'Mide la meta misma, antes y después.')],
    cierre: 'Qué busca la medida, cómo se acomodará la gente, a quién le pesa y cómo sabremos si sirvió.',
  });
}
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
//#archivo js/explora-icf-sc-6-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 6 «Historia de Colombia», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const T = (x, y, s, c, tam = 10, peso = 600) => `<text x="${x}" y="${y}" fill="${c}" font-size="${tam}" font-weight="${peso}" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${s}</text>`;
  // Línea de tiempo sobre una tira de papel: [x, año, rótulo]; se encienden las k primeras marcas.
  const linea = (pts, k = 0) => `<rect x="12" y="140" width="316" height="52" rx="6" fill="#efe2c2" stroke="#9c7b45"/><line x1="24" y1="160" x2="316" y2="160" stroke="#6b4f22" stroke-width="2"/>` +
    pts.map(([x, a, b], i) => { const on = i < k; return `<circle cx="${x}" cy="160" r="${on ? 6 : 4}" fill="${on ? '#a3242a' : '#b9a27a'}"/>` + T(x, 152, a, on ? '#3b2a12' : '#8c7650', 10) + T(x, 182, b, on ? '#3b2a12' : '#8c7650', 10, on ? 600 : 500); }).join('');
  // El acta de 1810 y la línea de tiempo de la independencia.
  const acta = v => X.foto((v.doc ? X.documento(14, 10, 160, 112, ['Santafé, julio de 1810', 'Se forma una junta', 'de gobierno.'], { titulo: 'Acta', sello: 'J' }) : '') +
    linea([[44, 'h. 1550', 'Colonia'], [140, '1810', 'Junta'], [222, '1819', 'Boyacá'], [298, '1851', 'Abolición']], v.t || 0) +
    (v.r ? X.rot(258, 62, v.r, 'oscuro') : ''), 200, 'papel');
  // Dos constituciones del siglo XIX, una federal y otra central.
  const cartas = v => X.foto((v.docs ? X.documento(14, 12, 146, 104, ['Nueve estados', 'soberanos'], { titulo: 'Rionegro', fecha: '1863' }) +
    X.documento(180, 12, 146, 104, ['Un poder central', 'en Bogotá'], { titulo: 'Constitución', fecha: '1886' }) : '') +
    linea([[44, '1819', 'Boyacá'], [126, '1863', 'Rionegro'], [212, '1886', 'Regeneración'], [298, '1899', 'Mil Días']], v.t || 0) +
    (v.r ? X.rot(170, 128, v.r, 'oscuro') : ''), 200, 'papel');
  // Una fábrica de comienzos del siglo XX con obreros en huelga y el periódico del día.
  const huelga = v => X.foto((v.fab ? X.edificio(262, 166, 120, 'fabrica') : '') + (v.per ? X.periodico(12, 12, 124, 92, 'Huelga', { nombre: 'EL OBRERO' }) : '') +
    (v.gente ? X.persona(120, 182, 0.8, '#5a5a5a') + X.persona(156, 184, 0.84, '#6b4423', v.cartel ? { cartel: v.cartel } : {}) + X.persona(196, 182, 0.8, '#3f4f6b') : '') +
    (v.r ? X.rot(170, 200, v.r, 'oscuro') : ''), 210, 'ciudad');

  xpAmplia('icf-sc-historia-1', {
    conecta: 'icf-sc-sistemico-1',
    desde: [
      ['Desde cero: colonia, criollos e independencia',
        xpMira('dibujo', 'Desde el principio: tres palabras para entender cómo Colombia dejó de depender de España.', { dib: acta, v: { doc: 1 }, alto: 200 }, [
          ['En la lección de causas viste la diferencia entre detonante y causa de fondo.', { doc: 1 }],
          ['Colonia: casi tres siglos en que España gobernó estas tierras desde lejos.', { doc: 1, t: 1 }],
          ['Criollos: hijos de españoles nacidos aquí; con riqueza, pero sin los cargos altos.', { doc: 1, t: 1, r: 'criollos' }],
          ['El 20 de julio de 1810 se firmó en Santafé el acta de una junta de gobierno.', { doc: 1, t: 2 }],
          ['La batalla de Boyacá, el 7 de agosto de 1819, aseguró la independencia.', { doc: 1, t: 3 }],
        ], 'Colonia: España gobernaba desde lejos. Criollos: ricos sin poder. 1810 abrió el camino y 1819 lo aseguró.'),
        xpHaz('hoja', 'Subraya quién era un **criollo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un hijo de españoles nacido en Popayán.'], ['Un funcionario nacido en Sevilla y enviado a Santafé.'], ['Un pueblo indígena del altiplano.']], pista: 'Criollo: de familia española, pero nacido de este lado del mar.' }, 'Hijo de españoles nacido en América: criollo.')],
    ],
    despues: [
      ['Más difícil: razones de afuera y de adentro',
        xpMira('hoja', 'Un paso más: la independencia no tuvo **una** causa. Se juntaron ideas de afuera y malestar de adentro.', { paras: [['Las ideas de la Ilustración llegaban en libros prohibidos.'], ['Antonio Nariño imprimió los Derechos del Hombre y fue encarcelado.'], ['Los criollos estaban cansados de no llegar a los cargos altos.'], ['Las reformas de la Corona subieron impuestos y controles.']] }, [
          ['Ideas de afuera: libertad e igualdad, que circulaban en secreto.', { luz: [0], nota: { 0: 'ideas' } }],
          ['Nariño las imprimió y lo encarcelaron: esas ideas daban miedo.', { luz: [1], nota: { 1: 'ideas' } }],
          ['Razón de adentro: el malestar criollo por el poder que no tenían.', { luz: [2], nota: { 2: 'fondo' } }],
          ['Más impuestos y controles desde España aumentaron ese malestar.', { luz: [3], nota: { 3: 'fondo' } }],
          ['Trampa: explicar la independencia con una sola causa. Se juntaron varias.', {}],
        ], 'La independencia juntó ideas de afuera y malestar de adentro, que un detonante hizo estallar.'),
        xpHaz('hoja', 'Subraya una causa **de fondo** de la independencia, no un detonante.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un pleito por un florero un día de mercado.'], ['El malestar de los criollos por no llegar a los cargos altos.'], ['La llegada de un visitante español ese mismo día.']], pista: 'La causa de fondo venía de años atrás; el detonante pasa en un día.' }, 'El malestar criollo venía de mucho antes.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una **fuente de la época** y la pregunta «¿qué muestra?». Cuidado con leerla con ojos de hoy.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que protestaban contra impuestos y funcionarios, sin rechazar todavía al rey.'], ['Que ya querían la independencia total de España.'], ['Que el rey había quitado los impuestos.'], ['Que en la Nueva Granada todos estaban de acuerdo.']] }, [
          ['La fuente: en 1781 unos rebeldes contra nuevos impuestos gritaban «Viva el rey y muera el mal gobierno».', {}],
          ['Esta es un anacronismo: la independencia llegó casi treinta años después.', { luz: [1], nota: { 1: 'anacronismo' } }],
          ['Esta invierte lo que pasaba: protestaban porque subían los impuestos.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta generaliza: una protesta muestra desacuerdo, no unanimidad.', { luz: [3], nota: { 3: 'generaliza' } }],
          ['«Viva el rey» y «muera el mal gobierno»: contra los funcionarios, no contra el rey.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Lee la fuente con los ojos de su época: no le pongas ideas que llegaron después.'),
      xpHaz('hoja', 'Una carta de 1812 se queja de que la guerra entre los mismos patriotas arruina el comercio. Subraya el **contexto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La Guerra de los Mil Días.'], ['La llegada de Colón.'], ['La Patria Boba, cuando centralistas y federalistas se enfrentaron.'], ['El Frente Nacional.']], pista: 'Mira el año de la carta y busca qué pasaba entre la junta de 1810 y la reconquista española.' }, 'Entre 1810 y 1816 los patriotas pelearon entre sí.')],
    cierre: 'Mira el orden colonial, las causas de afuera y de adentro, la resistencia y lo que cambió y siguió.',
  });

  xpAmplia('icf-sc-historia-2', {
    conecta: 'icf-sc-historia-1',
    desde: [
      ['Desde cero: un país por armar',
        xpMira('dibujo', 'Desde el principio: ganar la independencia era el comienzo. Después había que **armar** el país.', { dib: cartas, v: {}, alto: 200 }, [
          ['En la lección anterior viste cómo se logró la independencia, entre 1810 y 1819.', { t: 1 }],
          ['Después tocaba decidir: ¿quién manda, cómo y desde dónde?', { t: 1, r: '¿quién manda?' }],
          ['Por eso hubo varias constituciones: cada una respondía distinto.', { t: 3, docs: 1, r: '' }],
          ['Centralismo: decide la capital. Federalismo: cada región decide mucho.', { t: 3, docs: 1, r: 'centro o regiones' }],
          ['Como una familia que discute si las reglas las pone la mamá o cada hijo en su cuarto.', { t: 3, docs: 1 }],
        ], 'Tras la independencia hubo que armar el país: centralismo o federalismo, en varias constituciones.'),
        xpHaz('hoja', 'Subraya una idea **federalista**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cada región hace sus propias leyes de educación.'], ['Todo se decide en la capital.'], ['El presidente nombra a todos los gobernadores.']], pista: 'Federalismo: el poder se reparte entre las regiones.' }, 'Que cada región haga sus leyes es federalismo.')],
    ],
    despues: [
      ['Más difícil: guerras civiles y un país que se parte',
        xpMira('hoja', 'Un paso más: las ideas distintas no se discutieron solo con votos. El siglo XIX terminó en **guerra**.', { paras: [['En el siglo XIX hubo varias guerras civiles entre los partidos.'], ['La más larga, la de los Mil Días, fue de 1899 a 1902.'], ['Dejó un país débil y endeudado.'], ['En 1903 Panamá se separó, con apoyo de Estados Unidos.']] }, [
          ['Las diferencias entre partidos terminaron varias veces en guerras.', { luz: [0] }],
          ['La de los Mil Días cerró el siglo con miles de muertos.', { luz: [1], nota: { 1: '1899 a 1902' } }],
          ['Después, el país quedó pobre y dividido.', { luz: [2], nota: { 2: 'consecuencia' } }],
          ['Debilitado, no pudo impedir que Panamá se separara.', { luz: [3], nota: { 3: '1903' } }],
          ['Trampa: dar una sola causa. El interés de Estados Unidos pesó, y también la guerra interna.', {}],
        ], 'Las guerras civiles debilitaron al país; Panamá se separó en 1903 en ese contexto.'),
        xpHaz('hoja', 'Subraya la lectura **más completa** de la separación de Panamá.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Fue solo culpa de Estados Unidos.'], ['Pesaron el interés de Estados Unidos en el canal y un país debilitado por la guerra.'], ['Panamá se separó porque no le gustaba el café.']], pista: 'La más completa junta lo de afuera con lo de adentro.' }, 'Interés de afuera y debilidad de adentro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una **fuente con fecha** y la pregunta «¿con qué proceso se relaciona?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Con la Regeneración, que centralizó el poder y se alió con la Iglesia.'], ['Con el Olimpo Radical, que separó la Iglesia del Estado.'], ['Con la junta de gobierno de 1810.'], ['Con la Constitución de 1991.']] }, [
          ['La fuente: un acuerdo de 1887 le da a la Iglesia católica un papel central en la educación.', {}],
          ['Esta invierte la posición: los radicales querían alejar a la Iglesia.', { luz: [1], nota: { 1: 'invertida' } }],
          ['Esta queda casi ochenta años antes: anacronismo.', { luz: [2], nota: { 2: 'otra época' } }],
          ['Esta queda un siglo después, con otra Constitución.', { luz: [3], nota: { 3: 'otra época' } }],
          ['1887, poder central e Iglesia en la educación: la Regeneración.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Ubica la fecha y la idea de la fuente; descarta épocas equivocadas y posiciones invertidas.'),
      xpHaz('hoja', 'En 1863 una constitución crea nueve estados con mucho poder propio. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Era centralista, porque todo se decidía en Bogotá.'], ['Era federalista, porque las regiones tenían mucho poder.'], ['Era de la Regeneración, que dio la Constitución de 1886.'], ['Fue la que abolió la esclavitud, en 1851.']], pista: 'Nueve estados con poder propio: ¿centro o regiones? Revisa también las fechas.' }, 'Rionegro repartió el poder entre los estados.')],
    cierre: 'Centro o regiones, Iglesia y voto: dos partidos, varias constituciones, guerras y un péndulo.',
  });

  xpAmplia('icf-sc-historia-3', {
    conecta: 'icf-sc-historia-2',
    desde: [
      ['Desde cero: palabras del siglo XX',
        xpMira('dibujo', 'Desde el principio: el siglo XX trae palabras nuevas. Conocerlas evita confundir épocas y actores.', { dib: huelga, v: { per: 1 }, alto: 210 }, [
          ['En la lección del siglo XIX viste las guerras entre los dos partidos.', { per: 1 }],
          ['En el siglo XX llegaron fábricas, obreros y peleas por el salario.', { per: 1, fab: 1, gente: 1 }],
          ['Una huelga es parar el trabajo, todos juntos, para exigir algo.', { per: 1, fab: 1, gente: 1, cartel: '8 horas' }],
          ['La Violencia, con mayúscula, fue la ola de muertes entre liberales y conservadores a mitad de siglo.', { per: 1, fab: 1, gente: 1, cartel: '8 horas', r: 'la Violencia' }],
          ['Después nacieron guerrillas y paramilitares: grupos armados por fuera de la ley.', { per: 1, fab: 1, gente: 1, cartel: '8 horas', r: 'grupos armados' }],
        ], 'Siglo XX: obreros y huelgas, la Violencia entre partidos y luego guerrillas y paramilitares.'),
        xpHaz('hoja', 'Subraya qué es una **huelga**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los trabajadores dejan de trabajar juntos para exigir algo.'], ['Un día de fiesta nacional.'], ['Una guerra entre dos países.']], pista: 'Piensa en el cartel de los obreros: ¿qué hacen para que los oigan?' }, 'Parar juntos para exigir: huelga.')],
    ],
    despues: [
      ['Más difícil: lo que origina y lo que alimenta',
        xpMira('hoja', 'Un paso más: separa lo que **originó** el conflicto de lo que lo **alimentó** y lo alargó.', { paras: [['Muchos campesinos no tenían tierra propia.'], ['Las guerrillas crecieron donde el Estado casi no llegaba.'], ['El narcotráfico dio dinero a guerrillas y paramilitares.'], ['Millones de personas fueron desplazadas de sus tierras.']] }, [
          ['La tierra mal repartida fue una causa de fondo.', { luz: [0], nota: { 0: 'fondo' } }],
          ['Donde el Estado no llegaba, los grupos armados ocuparon su lugar.', { luz: [1], nota: { 1: 'ausencia' } }],
          ['El narcotráfico fue combustible: alargó y empeoró la guerra.', { luz: [2], nota: { 2: 'combustible' } }],
          ['Y la tierra volvió a aparecer como consecuencia: el desplazamiento.', { luz: [3], nota: { 3: 'consecuencia' } }],
          ['Trampa: confundir lo que alimenta un conflicto con lo que lo originó.', {}],
        ], 'La tierra está en el fondo y en las consecuencias; el narcotráfico alimentó y alargó la guerra.'),
        xpHaz('hoja', 'Subraya lo que **alimentó** el conflicto más que originarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La tierra mal repartida desde antes.'], ['La exclusión de otros partidos durante el Frente Nacional.'], ['El dinero del narcotráfico.']], pista: 'Busca lo que llegó cuando el conflicto ya existía y le dio más fuerza.' }, 'El narcotráfico llegó después y le dio dinero a la guerra.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un **testimonio** y la pregunta «¿qué fenómeno muestra?». Lee cada palabra del relato.', { letras: ['A', 'B', 'C', 'D'], paras: [['El desplazamiento forzado, que golpeó sobre todo a civiles del campo.'], ['Una mudanza por gusto a la ciudad.'], ['Una reforma agraria que entregó tierras.'], ['Que los campesinos fueron los culpables de la guerra.']] }, [
          ['El testimonio: «Nos sacaron de la finca en una noche y llegamos a la ciudad sin nada».', {}],
          ['Esta ignora «nos sacaron»: no fue por gusto.', { luz: [1], nota: { 1: 'ignora' } }],
          ['Esta invierte lo que pasó: perdieron la tierra, no la recibieron.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta culpa a las víctimas: prejuicio sin ningún dato.', { luz: [3], nota: { 3: 'prejuicio' } }],
          ['Salir a la fuerza y sin nada: desplazamiento forzado.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En un testimonio, las palabras exactas («nos sacaron») deciden la respuesta.'),
      xpHaz('hoja', 'Un informe muestra que la mayoría de las víctimas del conflicto fueron civiles. Subraya la conclusión que **se apoya** en él.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Que solo murieron combatientes.'], ['Que el conflicto golpeó sobre todo a quienes no tenían armas.'], ['Que el conflicto ya terminó por completo.'], ['Que los civiles empezaron la guerra.']], pista: 'Civil es quien no tiene armas. Busca la que dice lo mismo que el dato, sin agregar.' }, 'Civiles: los que no portaban armas.')],
    cierre: 'Varias causas y varios actores: tierra, Estado ausente, narcotráfico, víctimas civiles e intentos de paz.',
  });
}
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
