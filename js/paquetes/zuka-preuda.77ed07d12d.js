// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/rueda-porcentaje.js
// La rueda del porcentaje (lección 1.3): un pastel marcado en unidades del total (170, 180, 240)
// y una aguja que se gira; el sector sombreado dice cuántas unidades cubre y hay que dejarlo
// justo en la parte pedida para leer qué porcentaje es (ejercicios 1.9, 1.13 y 1.16).
// params = { rounds: [{ part, whole }], tol }   state = { pct: (número | null)[] }

GAMES['rueda-porcentaje'] = (() => {
  const answerOf = r => (100 * r.part) / r.whole;
  const fmt = n => String(+n.toFixed(1));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.pct[i] !== null && Math.abs(state.pct[i] - answerOf(r)) <= params.tol);
    return { ok, solution: params.rounds.map(r => `${fmt(r.part)} de ${r.whole} = ${fmt(answerOf(r))} %`).join(', ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const N = params.rounds.length;
    const st = { pct: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * ((w - 24) / N), y: 8, w: (w - 24) / N - 6, h: 34 }));
      R = Math.min(w, h) * 0.3; cx = w / 2; cy = 60 + R + 24;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const angOf = pct => -Math.PI / 2 + (pct / 100) * Math.PI * 2;  // desde las 12, sentido horario
    function setFromPointer(x, y) {
      let a = Math.atan2(y - cy, x - cx) + Math.PI / 2;
      if (a < 0) a += Math.PI * 2;
      st.pct[cur] = Math.round((a / (Math.PI * 2)) * 1000) / 10;
      api.ready(st.pct.every(v => v !== null));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], pct = st.pct[cur], ans = answerOf(r);
        tabs.forEach((t, i) => {
          const v = st.pct[i], good = v !== null && Math.abs(v - answerOf(params.rounds[i])) <= params.tol;
          const col = locked ? (good ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.ok : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(12);
          p.text(`${fmt(params.rounds[i].part)} de ${params.rounds[i].whole}`, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.TOP); p.textSize(14); p.textStyle(p.BOLD);
        p.text(`¿Qué porcentaje es ${fmt(r.part)} de ${r.whole}?`, W / 2, 50);
        // Pastel y sector.
        p.stroke(C.line); p.strokeWeight(2); p.fill(C.card); p.circle(cx, cy, R * 2);
        const good = pct !== null && Math.abs(pct - ans) <= params.tol;
        const col = locked ? (good ? C.ok : C.bad) : C.brand;
        if (pct !== null && pct > 0) {
          p.noStroke(); p.fill(locked ? col : C.sun);   // la parte cubierta, rellena
          p.arc(cx, cy, R * 2, R * 2, angOf(0), angOf(pct), p.PIE);
        }
        // Marcas en unidades (cada décimo del total) y anillo exterior en % (20 marcas, sin números).
        for (let k = 0; k < 10; k++) {
          const a = angOf(k * 10), x1 = cx + Math.cos(a) * (R - 8), y1 = cy + Math.sin(a) * (R - 8);
          p.stroke(C.mute); p.strokeWeight(1.5); p.line(x1, y1, cx + Math.cos(a) * R, cy + Math.sin(a) * R);
          p.noStroke(); p.fill(pct !== null && k * 10 < pct - 3 ? inkOn(locked ? col : C.sun, C.ink) : C.mute); p.textSize(10); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
          p.text(fmt((k * r.whole) / 10), cx + Math.cos(a) * (R - 22), cy + Math.sin(a) * (R - 22));
        }
        for (let k = 0; k < 20; k++) {
          const a = angOf(k * 5);
          p.stroke(locked ? col : C.line); p.strokeWeight(k % 2 ? 1 : 2);
          p.line(cx + Math.cos(a) * (R + 6), cy + Math.sin(a) * (R + 6), cx + Math.cos(a) * (R + (k % 2 ? 10 : 14)), cy + Math.sin(a) * (R + (k % 2 ? 10 : 14)));
          if (locked && k % 4 === 0) { p.noStroke(); p.fill(col); p.textSize(10); p.text(`${k * 5} %`, cx + Math.cos(a) * (R + 26), cy + Math.sin(a) * (R + 26)); }
        }
        // Aguja.
        const a = angOf(pct ?? 0);
        p.stroke(col); p.strokeWeight(4); p.line(cx, cy, cx + Math.cos(a) * (R + 2), cy + Math.sin(a) * (R + 2));
        p.noStroke(); p.fill(col); p.circle(cx + Math.cos(a) * (R + 2), cy + Math.sin(a) * (R + 2), 22); p.fill(C.ink); p.circle(cx, cy, 10);
        // Lectura: unidades cubiertas y, al bloquear, el porcentaje.
        p.fill(col); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(18);
        const units = pct === null ? null : (pct / 100) * r.whole;
        p.text(units === null ? 'gira la aguja' : `${fmt(units)} de ${r.whole}`, W / 2, cy + R + 30);
        if (locked) { p.textSize(14); p.text(`${fmt(pct ?? 0)} %  ·  correcto: ${fmt(ans)} %`, W / 2, cy + R + 56); }
        p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.text(locked ? 'El anillo exterior marca el porcentaje' : 'Arrastra la aguja hasta cubrir la parte pedida', W / 2, H - 12);
      };

      p.mousePressed = () => {
        if (locked) return;
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) <= R + 24) { drag = true; setFromPointer(p.mouseX, p.mouseY); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; setFromPointer(p.mouseX, p.mouseY); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ pct: [...st.pct] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/lado-del-cuadrado.js
// El lado del cuadrado (lección 1.2.a, raíces): un cuadrado cuya esquina se arrastra; el área se
// calcula en vivo. Meta en cada ronda: el lado cuya área es la pedida (la raíz cuadrada). Con
// área 3 el lado es √3 ≈ 1.73: no se puede dar exacto, de ahí la tolerancia, que es sobre el lado
// (en unidades) para que el margen sea el mismo en todas las rondas. Los botones − y + ajustan fino.
// params = { rounds: [{ area }], max, step, tol }   state = { sides: [número | null] }

GAMES['lado-del-cuadrado'] = (() => {
  const fmt = n => String(+n.toFixed(2));
  const near = (s, area, tol) => s != null && Math.abs(s - Math.sqrt(area)) <= tol;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => near(state.sides[i], r.area, params.tol));
    const solution = params.rounds.map(r => `$\\sqrt{${fmt(r.area)}} ${Number.isInteger(Math.sqrt(r.area)) || Number.isInteger(Math.sqrt(r.area) * 2) ? '=' : '\\approx'} ${fmt(Math.sqrt(r.area))}$`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { sides: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], box = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      const step = Math.min(52, (w - 124) / params.rounds.length);   // las pestañas no pisan los botones − y +
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * step, y: 8, w: step - 8, h: 30 }));
      btns = [{ x: w - 104, y: 8, w: 44, h: 30, d: -1 }, { x: w - 56, y: 8, w: 44, h: 30, d: 1 }];
      const size = Math.min(w - 110, h - 190);
      box = { x: 48, y: h - 70, size };   // esquina inferior izquierda fija; crece hacia arriba y a la derecha
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const pxPer = () => box.size / params.max;
    const side = () => st.sides[cur] ?? 0;
    const ready = () => api.ready(st.sides.every(s => s !== null));
    const setSide = v => { st.sides[cur] = +Math.max(0, Math.min(params.max, v)).toFixed(4); ready(); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], s = side(), area = s * s, good = near(s, r.area, params.tol);
        tabs.forEach((t, i) => {
          const v = st.sides[i], ok = near(v, params.rounds[i].area, params.tol);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 8);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(18); p.text(b.d < 0 ? '−' : '+', b.x + b.w / 2, b.y + b.h / 2 - 1);
        });
        p.noStroke(); p.fill(C.N); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(14);
        p.text(`Arrastra la esquina hasta que el área sea ${fmt(r.area)}`, 12, 46, W - 24, 36);
        // Cuadrícula de fondo (unidades) y el cuadrado.
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = 0; k <= params.max; k++) { const o = k * pxPer(); p.line(box.x + o, box.y, box.x + o, box.y - box.size); p.line(box.x, box.y - o, box.x + box.size, box.y - o); }
        const px = s * pxPer();
        const col = locked ? (good ? C.ok : C.bad) : C.brand;
        p.noStroke(); p.fill(p.color(col)); p.drawingContext.globalAlpha = 0.25; p.rect(box.x, box.y - px, px, px); p.drawingContext.globalAlpha = 1;
        p.stroke(col); p.strokeWeight(2.5); p.noFill(); p.rect(box.x, box.y - px, px, px);
        p.noStroke(); p.fill(col); p.circle(box.x + px, box.y - px, 16);
        // Rótulos del lado y del área.
        p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.TOP); if (px > 44) p.text(`lado ${fmt(s)}`, box.x + px / 2, box.y + 6);
        p.textAlign(p.RIGHT, p.CENTER); if (px > 44) { p.push(); p.translate(box.x - 8, box.y - px / 2); p.rotate(-Math.PI / 2); p.textAlign(p.CENTER, p.BOTTOM); p.text(`lado ${fmt(s)}`, 0, 0); p.pop(); }   // con el cuadrado aún diminuto los dos rótulos se encimarían
        p.fill(locked ? col : C.ink); p.textSize(18); p.textAlign(p.CENTER, p.CENTER);
        p.text(`área = ${fmt(s)}² = ${fmt(area)}`, W / 2, 96);
        if (locked && !good) { p.fill(C.ok); p.textSize(12); p.text(`el lado era √${fmt(r.area)} ≈ ${fmt(Math.sqrt(r.area))}`, W / 2, 118); }
        const pend = st.sides.findIndex((v, i) => v === null && i !== cur);
        p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL);
        p.text(locked ? (grade(st, params).ok ? '¡Cuadrados perfectos!' : 'Mira el lado correcto en verde') : st.sides[cur] !== null && pend >= 0 ? `Ajusta fino con − y + · luego toca la pestaña ${pend + 1}` : 'Arrastra la esquina o ajusta fino con − y +', 12, H - 20, W - 24, 18);
      };

      const setFrom = (x, y) => setSide(Math.round((Math.max(x - box.x, box.y - y) / pxPer()) / params.step) * params.step);
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => inside(b, p.mouseX, p.mouseY));
        if (b) { setSide(side() + b.d * params.step); api.sfx?.tap?.(); return false; }
        if (p.mouseX >= box.x - 20 && p.mouseX <= box.x + box.size + 20 && p.mouseY <= box.y + 20 && p.mouseY >= box.y - box.size - 20) { drag = true; setFrom(p.mouseX, p.mouseY); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; setFrom(p.mouseX, p.mouseY); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ sides: [...st.sides] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/lupa-densidad.js
// La lupa de la recta (Álgebra 1.1, densidad de los reales): dos banderitas marcan números casi pegados
// (⅓ y 0.34, 1.41 y √2, π y 22/7). De lejos parecen el mismo punto. Con la lupa (+ / −) la recta se amplía
// 10 veces alrededor del punto elegido y aparecen marcas nuevas; hay que soltar el punto ESTRICTAMENTE entre
// las dos banderitas. Siempre cabe otro número: entre dos reales distintos hay infinitos.
// params = { rounds: [{ a: { label, value }, b: { label, value }, view: [lo, hi] }] }   state = { xs: [x | null] }

GAMES['lupa-densidad'] = (() => {
  let inside = (x, r) => x != null && x > Math.min(r.a.value, r.b.value) && x < Math.max(r.a.value, r.b.value);
  // Un número «redondo» entre a y b: el promedio con las menos cifras posibles.
  function between(r) {
    const lo = Math.min(r.a.value, r.b.value), hi = Math.max(r.a.value, r.b.value), mid = (lo + hi) / 2;
    for (let d = 0; d <= 12; d++) { const x = +mid.toFixed(d); if (x > lo && x < hi) return x; }
    return mid;
  }
  const zoomView = (v, c, f) => { const w = (v.hi - v.lo) / f; return { lo: c - w / 2, hi: c + w / 2 }; };
  // Paso «redondo» (1, 0.1, 0.01…) para unas 10 a 100 marcas en la vista.
  const stepOf = v => 10 ** Math.floor(Math.log10((v.hi - v.lo) / 10) + 1e-9);
  const decimalsOf = st => Math.max(0, -Math.round(Math.log10(st)));

  inside = velo(inside);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => inside(state.xs?.[i], r));
    const solution = params.rounds.map(r => `entre ${r.a.label} y ${r.b.label} está ${between(r)}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { xs: R.map(() => null) };
    const views = R.map(r => ({ lo: r.view[0], hi: r.view[1] }));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], line = null, zin = null, zout = null, drag = false, pulse = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      line = { x0: 24, x1: w - 24, y: h * 0.5 };
      zout = { x: 14, y: h - 56, w: (w - 38) / 2, h: 42 };
      zin = { x: w / 2 + 5, y: h - 56, w: (w - 38) / 2, h: 42 };
    }
    const toPx = v => line.x0 + (v - views[cur].lo) / (views[cur].hi - views[cur].lo) * (line.x1 - line.x0);
    const toVal = px => views[cur].lo + (px - line.x0) / (line.x1 - line.x0) * (views[cur].hi - views[cur].lo);
    function setX(px) {
      const s = stepOf(views[cur]) / 10, raw = toVal(Math.min(line.x1, Math.max(line.x0, px)));
      st.xs[cur] = +(Math.round(raw / s) * s).toFixed(decimalsOf(s));
      api.ready(st.xs.every(x => x != null));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function flag(v, label, col, up) {
        let x = toPx(v), off = false;
        if (x < line.x0 - 2 || x > line.x1 + 2) { off = true; x = x < line.x0 ? line.x0 : line.x1; }
        const dy = up ? -1 : 1, top = line.y + dy * 58;
        p.stroke(col); p.strokeWeight(2);
        if (!off) p.line(x, line.y, x, top);
        // La etiqueta va en una píldora del color de la bandera.
        drawPill(p, C, off ? (x <= line.x0 ? `◀ ${label}` : `${label} ▶`) : label, Math.min(W - 30, Math.max(30, x)), top + dy * 24, col, 13);
        p.noStroke(); p.fill(col);
        if (!off) p.triangle(x, top, x + 14 * (up ? 1 : -1), top + dy * 6, x, top + dy * 12);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], v = views[cur], x = st.xs[cur], good = inside(x, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (inside(st.xs[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.xs[i] != null ? C.Z : C.line));
        drawKicker(p, C, `Un punto entre ${r.a.label} y ${r.b.label}`, 14, 56);
        const zoom = (r.view[1] - r.view[0]) / (v.hi - v.lo);
        drawPill(p, C, `lupa ×${zoom >= 1 ? Math.round(zoom).toLocaleString('es-CO') : zoom}`, W - 50, 78, C.sun, 11);

        // Lente: un círculo suave detrás de la recta.
        p.noStroke(); p.fill(C.card); p.rect(10, line.y - 96, W - 20, 192, 16);
        // Marcas: cada paso fino y cada 10 más largas, con número.
        const s = stepOf(v), fine = s / 10, dec = decimalsOf(fine);
        p.stroke(C.ink); p.strokeWeight(2.5); p.line(line.x0, line.y, line.x1, line.y);
        const k0 = Math.ceil(v.lo / fine - 1e-9), k1 = Math.floor(v.hi / fine + 1e-9);
        const gapPx = toPx(s) - toPx(0), every = gapPx < 22 ? 5 : gapPx < 48 ? 2 : 1;
        for (let k = k0; k <= k1; k++) {
          const t = k * fine, px = toPx(t), big = Math.abs(Math.round(k / 10) * 10 - k) < 1e-6;
          p.stroke(big ? C.ink : C.line); p.strokeWeight(big ? 2 : 1);
          p.line(px, line.y - (big ? 9 : 5), px, line.y + (big ? 9 : 5));
          if (big && Math.round(k / 10) % every === 0) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(10); p.textAlign(p.CENTER, p.TOP); p.text(t.toFixed(Math.max(0, dec - 1)), px, line.y + 12); }
        }
        flag(r.a.value, r.a.label, C.Z, true);
        flag(r.b.value, r.b.label, C.I, false);
        // Punto del estudiante
        if (x != null) {
          const px = toPx(x), onView = px >= line.x0 - 1 && px <= line.x1 + 1;
          if (onView) drawDot(p, C, px, line.y, 16 + 3 * Math.sin(pulse), good ? C.ok : C.sun);
          pulse += 0.12;
          p.noStroke(); p.fill(good ? C.ok : C.ink); p.textStyle(p.BOLD); p.textSize(18); p.textAlign(p.CENTER, p.CENTER);
          fitText(p, `tu punto: ${x.toFixed(decimalsOf(stepOf(v) / 10))}${onView ? '' : ' (fuera de la vista)'}`, W / 2, zout.y - 38, W - 28, 18);
        } else { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.CENTER, p.CENTER); p.text('Toca la recta para poner tu punto', W / 2, zout.y - 38); }
        if (locked && !good) { p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(13); p.text(`Por ejemplo: ${between(r)}`, W / 2, zout.y - 14); }
        // Botones de la lupa
        [[zout, '−  alejar'], [zin, '+  acercar']].forEach(([b, t]) => {
          drawTile(p, C, b, t, { fill: locked ? C.card : C.sky, ink: locked ? C.mute : undefined, size: 14 });
        });
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = R[cur], v = views[cur];
        if (hitBox(zin, p.mouseX, p.mouseY)) {
          if (v.hi - v.lo > 1e-6) {
            const x = st.xs[cur], c = x != null && x > v.lo && x < v.hi ? x : (r.a.value + r.b.value) / 2;
            views[cur] = zoomView(v, c, 10);
          }
          api.sfx?.tap?.(); return false;
        }
        if (hitBox(zout, p.mouseX, p.mouseY)) {
          const c = (v.lo + v.hi) / 2, w = v.hi - v.lo;
          views[cur] = w * 10 >= r.view[1] - r.view[0] ? { lo: r.view[0], hi: r.view[1] } : zoomView(v, c, 0.1);
          api.sfx?.tap?.(); return false;
        }
        if (Math.abs(p.mouseY - line.y) < 60 && p.mouseX > line.x0 - 10 && p.mouseX < line.x1 + 10) { drag = true; setX(p.mouseX); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { setX(p.mouseX); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ xs: [...st.xs] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, zoomView, between };
})();
;
//#archivo js/games/fila-pistas.js
// La fila con pistas (Preuniversitario, pu-or-1; spec 2026-11-18-preuda-razonamiento-completo): personas en fila, numeradas de
// izquierda a derecha, y pistas de orden. Se arrastran los nombres a los puestos; cada pista se marca ✓ cuando ya se cumple.
// Hay que acomodarlos a todos cumpliendo todas las pistas (la solución es única).
// params = { rounds: [{ names, clues: [{ t, a, b?, i?, k?, say }] }] }   state = { rounds: [{ arr }] }   (pistas: orden-kit.js)
GAMES['fila-pistas'] = ORD.slotGame({
  aspect: 1.3,
  prompt: r => `Acomoda a las ${r.names.length} personas en la fila`,
  slots: G => { const n = G.r.names.length, w = Math.min(64, (G.W - 30) / n - 6); return G.r.names.map((_, i) => ({ x: G.W / 2 - (n * (w + 6) - 6) / 2 + i * (w + 6), y: 116, w, h: 50 })); },
  label: i => `${i + 1}.º`,
  decor: G => { const { p, C } = G; p.stroke(C.line); p.strokeWeight(1); p.line(16, 172, G.W - 16, 172); TK.label(G.p, C, 'izquierda', 40, 182, C.mute, 9, 70); TK.label(G.p, C, 'derecha', G.W - 40, 182, C.mute, 9, 70); },
  clues: G => ({ x: 16, y: 200, w: G.W - 32 }),
});
;
//#archivo js/games/mesa-redonda.js
// La mesa redonda (Preuniversitario, pu-or-2; spec 2026-11-18-preuda-razonamiento-completo): girar a todos no cambia nada,
// así que la primera persona ya está sentada y las demás se ubican respecto a ella. Pistas: «frente a», «junto a», «justo a la
// derecha de» (en el sentido del reloj). Se arrastran los nombres a las sillas hasta cumplir todas las pistas.
// params = { rounds: [{ names, clues }] }   (names[0] va fija en la silla de arriba)   state = { rounds: [{ arr }] }
GAMES['mesa-redonda'] = (() => {
  const g = ORD.slotGame({
    circ: true,
    fixFirst: true,
    aspect: 1.6,
    prompt: r => `Sienta a las ${r.names.length} personas alrededor de la mesa`,
    slots: G => { const n = G.r.names.length, cx = G.W / 2, cy = 190, R = 80, w = 58; return G.r.names.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return { x: cx + R * Math.cos(a) - w / 2, y: cy + R * Math.sin(a) - 15, w, h: 30, lx: -100, ly: -100 }; }); },
    label: () => '',
    decor: G => { const { p, C } = G; p.stroke(C.line); p.strokeWeight(1.4); p.fill(RK.al(p, C.card, 200)); p.circle(G.W / 2, 190, 110); TK.label(p, C, 'mesa', G.W / 2, 190, C.mute, 10, 60); },
    clues: G => ({ x: 16, y: 292, w: G.W - 32 }),
    color: C => C.sky,
  });
  return g;
})();
;
//#archivo js/games/ronda-saltos.js
// La ronda que cuenta (Preuniversitario, pu-or-2; spec 2026-11-18-preuda-razonamiento-completo): n personas en círculo; se
// cuenta desde la persona 1 en el sentido del reloj y cada k-ésima sale de la ronda, y se sigue contando desde la siguiente.
// ¿Quién queda de último? Se arrastra la corona hasta la persona que crees que se queda; el juego muestra, en el orden en que
// salen, quiénes van saliendo hasta donde va tu corona, para que puedas seguir la cuenta tú mismo.
// params = { rounds: [{ n, k }] }   state = { rounds: [{ pick }] }   (pick: número de la persona, de 1 a n)
GAMES['ronda-saltos'] = (() => {
  const order = r => { const ring = Array.from({ length: r.n }, (_, i) => i + 1), out = []; let i = 0; while (ring.length > 1) { i = (i + r.k - 1) % ring.length; out.push(ring.splice(i, 1)[0]); } return { out, last: ring[0] }; };
  let ok = (s, r) => s.pick === order(r).last;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.4,
    init: () => ({ pick: null }),
    ok,
    answered: s => s.pick != null,
    solution: r => `queda la persona ${order(r).last}`,
    prompt: r => `${r.n} personas en ronda; sale cada ${r.k}.ª al contar. ¿Quién queda?`,
    foot: () => 'Arrastra la corona hasta la persona que se queda',
    layout(G) { G.c = { x: G.W / 2, y: 196 }; G.R = Math.min(G.W / 2 - 40, 92); G.crown = { x: G.W / 2 - 30, y: G.c.y + G.R + 30, w: 60, h: 30 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { pick: order(r).last } : G.s, o = order(r);
      for (let i = 0; i < r.n; i++) {
        const a = -Math.PI / 2 + i * 2 * Math.PI / r.n, x = G.c.x + G.R * Math.cos(a), y = G.c.y + G.R * Math.sin(a), me = s.pick === i + 1;
        p.stroke(C.ink); p.strokeWeight(1.4); p.fill(me ? (G.locked ? (ok(s, r) ? C.ok : C.bad) : C.sun) : C.card); p.circle(x, y, 30);
        TK.label(p, C, String(i + 1), x, y, inkOn(me ? C.sun : C.card), 12, 26);
        if (me) { p.noStroke(); p.fill(C.brand); p.triangle(x - 10, y - 18, x + 10, y - 18, x, y - 30); p.triangle(x - 10, y - 18, x - 4, y - 18, x - 10, y - 28); p.triangle(x + 10, y - 18, x + 4, y - 18, x + 10, y - 28); }
      }
      TK.label(p, C, '↻ se cuenta así', G.c.x, G.c.y, C.mute, 10, 100);
      if (!G.drag && s.pick == null) RK.chip(p, C, G.crown, 'corona', { on: true, col: C.brand, size: 11 });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 30, y: G.drag.y - 15, w: 60, h: 30 }, 'corona', { on: true, col: C.brand, size: 11 });
      RK.strip(p, C, G.fb, G.locked ? `$\\text{salen: ${o.out.join(', ')}}$` : `$\\text{cuenta de ${r.k} en ${r.k}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 14 });
    },
    press(G, x, y) {
      if (G.s.pick == null && hitBox(G.crown, x, y)) { G.drag = { x, y }; return true; }
      if (G.s.pick != null) { const i = G.s.pick - 1, a = -Math.PI / 2 + i * 2 * Math.PI / G.r.n; if (Math.hypot(x - (G.c.x + G.R * Math.cos(a)), y - (G.c.y + G.R * Math.sin(a))) < 24) { G.drag = { x, y }; G.s.pick = null; return true; } }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      for (let i = 0; i < G.r.n; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / G.r.n; if (Math.hypot(x - (G.c.x + G.R * Math.cos(a)), y - (G.c.y + G.R * Math.sin(a))) < 26) { G.s.pick = i + 1; break; } }
      G.touch();
    },
    demo: G => ({ from: { x: G.crown.x + 30, y: G.crown.y + 15 }, to: { x: G.c.x, y: G.c.y - G.R }, text: 'Arrastra la corona', ty: G.crown.y - 14 }),
    peek: G => ({ c: G.c, R: G.R, crown: G.crown }),
  });
  return Object.assign(game, { answer: r => ({ pick: order(r).last }), order });
})();
;
//#archivo js/games/tabla-cruces.js
// La tabla de doble entrada (Preuniversitario, pu-or-3; spec 2026-11-18-preuda-razonamiento-completo): personas en las filas
// y opciones en las columnas; cada fila y cada columna tiene un solo ✓. Las pistas negativas («Lina no estudia Medicina»)
// ya vienen tachadas con ✗ en la tabla. Se arrastran las fichas ✓ (una por persona) a las casillas; una casilla tachada no
// recibe ✓. Hay que dejar un ✓ por fila y por columna que cumpla todas las pistas.
// params = { rounds: [{ rows, cols, clues: [{ t: 'not' | 'is', a, v, say }] }] }   (a: índice de fila, v: de columna)
// state = { rounds: [{ pick: [columna | null por fila] }] }
GAMES['tabla-cruces'] = (() => {
  const crossed = (r, a, v) => r.clues.some(c => c.t === 'not' && c.a === a && c.v === v);
  const valid = (r, pick) => pick.every(x => x != null) && new Set(pick).size === pick.length && r.clues.every(c => (c.t === 'not' ? pick[c.a] !== c.v : pick[c.a] === c.v));
  const solutions = r => ORD.perms(r.cols.map((_, i) => i)).filter(p => valid(r, p));
  let ok = (s, r) => valid(r, s.pick);
  const answer = r => ({ pick: solutions(r)[0] });
  const lay = G => { const r = G.r, cw = Math.min(64, (G.W - 90) / r.cols.length), ch = 34; G.cell = (a, v) => ({ x: 84 + v * cw, y: 128 + a * ch, w: cw - 4, h: ch - 4 }); G.cw = cw; G.ch = ch; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ pick: r.rows.map(() => null) }),
    ok,
    answered: s => s.pick.some(x => x != null),
    solution: r => answer(r).pick.map((v, a) => `${r.rows[a]}: ${r.cols[v]}`).join(', '),
    prompt: () => 'Pon un ✓ por fila y por columna',
    foot: () => 'Arrastra las fichas ✓ a la tabla; sácalas para quitarlas',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
      r.cols.forEach((c, v) => TK.label(p, C, c, 84 + v * G.cw + (G.cw - 4) / 2, 116, C.ink, 10, G.cw));
      r.rows.forEach((nm, a) => { TK.label(p, C, nm, 44, 128 + a * G.ch + (G.ch - 4) / 2, C.ink, 11, 76); r.cols.forEach((_, v) => { const b = G.cell(a, v); p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 180)); p.rect(b.x, b.y, b.w, b.h, 4); if (crossed(r, a, v)) TK.label(p, C, '✗', b.x + b.w / 2, b.y + b.h / 2, C.bad, 14, b.w); else if (s.pick[a] === v && G.drag?.a !== a) TK.label(p, C, '✓', b.x + b.w / 2, b.y + b.h / 2, good ? C.ok : C.sky, 16, b.w); }); });
      const left = r.rows.length - s.pick.filter(x => x != null).length - (G.drag && G.drag.a == null ? 1 : 0), ty = 128 + r.rows.length * G.ch + 14;
      G.src = { x: G.W / 2 - 40, y: ty, w: 80, h: 30 };
      if (left > 0) RK.chip(p, C, G.src, `✓ × ${left}`, { on: true, col: C.brand, size: 12 });
      const pos = r.clues.filter(c => c.t === 'is');
      pos.forEach((c, i) => TK.label(p, C, c.say, G.W / 2, ty + 44 + i * 14, C.mute, 10, G.W - 30));
      if (G.drag) TK.label(p, C, '✓', G.drag.x, G.drag.y, C.brand, 22, 30);
      RK.strip(p, C, G.fb, good ? '$\\text{un ✓ por fila y por columna}$' : '$\\text{cada fila y cada columna: un solo ✓}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) {
      if (G.src && hitBox(G.src, x, y)) { G.drag = { a: null, x, y }; return true; }
      for (let a = 0; a < G.r.rows.length; a++) { const v = G.s.pick[a]; if (v != null && hitBox(G.cell(a, v), x, y)) { G.drag = { a, x, y }; return true; } }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return; const r = G.r;
      if (d.a != null) G.s.pick[d.a] = null;
      for (let a = 0; a < r.rows.length; a++) for (let v = 0; v < r.cols.length; v++) if (hitBox(G.cell(a, v), x, y) && !crossed(r, a, v)) { G.s.pick[a] = v; }
      G.touch();
    },
    demo(G) { const r = G.r, sol = answer(r).pick, v = r.cols.findIndex((_, k) => k !== sol[0] && !crossed(r, 0, k)), b = G.cell(0, v < 0 ? 0 : v); return G.src ? { from: { x: G.src.x + 40, y: G.src.y + 15 }, to: { x: b.x + b.w / 2, y: b.y + b.h / 2 }, text: 'Arrastra un ✓', ty: G.src.y - 12 } : null; },
    peek: G => ({ src: G.src }),
  });
  return Object.assign(game, { answer, solutions });
})();
;
//#archivo js/games/casilleros.js
// Los casilleros (Preuniversitario, pu-or-3; spec 2026-11-18-preuda-razonamiento-completo): cada persona guarda una cosa
// distinta en su casillero. Pistas: «la mochila no es de Ana», «el balón está en el casillero de Beto». Se arrastran las
// cosas a los casilleros hasta cumplir todas las pistas (una cosa por casillero).
// params = { rounds: [{ people, names, clues }] }   (names: cosas; pistas at / notAt con i = índice de la persona)
// state = { rounds: [{ arr }] }
GAMES['casilleros'] = ORD.slotGame({
  aspect: 1.3,
  prompt: () => '¿Qué guarda cada uno en su casillero?',
  slots: G => { const n = G.r.people.length, w = Math.min(70, (G.W - 30) / n - 6); return G.r.people.map((_, i) => ({ x: G.W / 2 - (n * (w + 6) - 6) / 2 + i * (w + 6), y: 128, w, h: 50 })); },
  label: (i, r) => r.people[i],
  decor: G => { const { p, C, r } = G, n = r.people.length, w = Math.min(70, (G.W - 30) / n - 6); for (let i = 0; i < n; i++) { const x = G.W / 2 - (n * (w + 6) - 6) / 2 + i * (w + 6); p.stroke(C.line); p.strokeWeight(1.2); p.fill(RK.al(p, C.card, 200)); p.rect(x - 3, 106, w + 6, 82, 4); p.line(x + w - 8, 112, x + w - 8, 120); } },
  clues: G => ({ x: 16, y: 206, w: G.W - 32 }),
  color: C => C.coral,
});
;
//#archivo js/games/comite-reglas.js
// El comité con reglas (Preuniversitario, pu-or-4; spec 2026-11-18-preuda-razonamiento-completo): se elige un grupo de k
// personas con condiciones como «si F está, G no», «H va solo si J va», «L tiene que ir». Se arrastran personas al comité
// (y de vuelta) y cada regla se marca ✓ o ✗ en vivo. Hay que armar un comité válido que cumpla lo que pide la ronda.
// params = { rounds: [{ names, k, rules: [{ t, a, b?, say }], need?: [nombres] }] }
//   t: 'ifNot' (si a, no b) · 'onlyIf' (a solo si b) · 'must' (a va) · 'out' (a no va) · 'either' (va a o va b)
// state = { rounds: [{ in: [nombres] }] }
GAMES['comite-reglas'] = (() => {
  const rule = (c, S) => { const A = S.includes(c.a), B = S.includes(c.b); switch (c.t) {
    case 'ifNot': return !(A && B); case 'onlyIf': return !A || B; case 'must': return A; case 'out': return !A; case 'either': return A || B; default: return false; } };
  const valid = (r, S) => S.length === r.k && r.rules.every(c => rule(c, S));
  let ok = (s, r) => valid(r, s.in) && (r.need || []).every(n => s.in.includes(n));
  const combos = (list, k) => (k === 0 ? [[]] : list.flatMap((x, i) => combos(list.slice(i + 1), k - 1).map(c => [x, ...c])));
  const answer = r => ({ in: combos(r.names, r.k).find(S => ok({ in: S }, r)) });
  const lay = G => { const n = G.r.names.length, w = Math.min(54, (G.W - 20) / n - 4); G.home = G.r.names.map((nm, i) => ({ nm, x: G.W / 2 - (n * (w + 4) - 4) / 2 + i * (w + 4), y: 108, w, h: 30 })); G.box = { x: 24, y: 152, w: G.W - 48, h: 54 }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ in: [] }),
    ok,
    answered: s => s.in.length > 0,
    solution: r => answer(r).in.join(', '),
    prompt: r => `Arma un comité de ${r.k}${r.need ? ` con ${r.need.join(' y ')}` : ''} que cumpla las reglas`,
    foot: () => 'Arrastra personas al comité y de vuelta',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
      G.home.forEach(b => { if (!s.in.includes(b.nm) && G.drag?.nm !== b.nm) RK.chip(p, C, b, b.nm, { size: 12, col: C.sky }); });
      p.stroke(good ? C.ok : C.brand); p.strokeWeight(1.4); p.fill(RK.al(p, C.brand, 20)); p.rect(G.box.x, G.box.y, G.box.w, G.box.h, 12);
      TK.label(p, C, `comité (${s.in.length} de ${r.k})`, G.box.x + 60, G.box.y - 8, C.mute, 10, 120);
      const w = G.home[0].w; G.inBoxes = s.in.map((nm, i) => ({ nm, x: G.box.x + 10 + i * (w + 6), y: G.box.y + 12, w, h: 30 }));
      G.inBoxes.forEach(b => { if (G.drag?.nm !== b.nm) RK.chip(p, C, b, b.nm, { on: true, size: 12, col: good ? C.ok : C.mint }); });
      r.rules.forEach((c, i) => { const v = rule(c, s.in); TK.label(p, C, `${VELO.on ? '·' : v ? '✓' : '✗'} ${c.say}`, G.W / 2, 226 + i * 15, VELO.on ? C.ink : v ? C.ok : C.bad, 10, G.W - 30); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 15, w, h: 30 }, G.drag.nm, { on: true, col: C.brand, size: 12 });
      RK.strip(p, C, G.fb, good || (VELO.on && s.in.length >= r.k) ? `$\\text{${s.in.join(', ')}}$` : `$\\text{faltan ${Math.max(0, r.k - s.in.length)}}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) {
      const b = [...(G.inBoxes || []), ...G.home.filter(b => !G.s.in.includes(b.nm))].find(b => hitBox(b, x, y)); if (!b) return false;
      G.drag = { nm: b.nm, x, y }; return true;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return; const S = G.s.in, inside = hitBox({ x: G.box.x - 6, y: G.box.y - 10, w: G.box.w + 12, h: G.box.h + 20 }, x, y);
      if (inside && !S.includes(d.nm) && S.length < G.r.k) S.push(d.nm); else if (!inside && S.includes(d.nm)) S.splice(S.indexOf(d.nm), 1);
      G.touch();
    },
    demo(G) { const b = G.home[G.home.length - 1]; return { from: { x: b.x + b.w / 2, y: b.y + 15 }, to: { x: G.box.x + 40, y: G.box.y + 27 }, text: 'Arrastra al comité', ty: G.box.y + G.box.h + 12 }; },
    peek: G => ({ home: G.home, box: G.box }),
  });
  return Object.assign(game, { answer, rule, combos, valid });
})();
;
//#archivo js/games/tiene-podria.js
// Tiene que, podría o no puede (Preuniversitario, pu-or-4; spec 2026-11-18-preuda-razonamiento-completo): con varias
// soluciones posibles, una afirmación es necesaria si pasa en todas, posible si pasa en alguna e imposible si no pasa en
// ninguna. Arriba hay un banco de pruebas: se arrastran personas al comité y se ve si cumple las reglas (así se exploran
// los casos). Abajo, cada afirmación se arrastra a su zona: «tiene que», «podría» o «no puede».
// params = { rounds: [{ names, k, rules, claims: [{ t: 'in' | 'out' | 'both', a, b?, say }] }] }   (reglas como en comite-reglas)
// state = { rounds: [{ in: [nombres], zone: [0 | 1 | 2 | null por afirmación] }] }   (0 tiene que · 1 podría · 2 no puede)
GAMES['tiene-podria'] = (() => {
  const CR = () => GAMES['comite-reglas'];
  const cases = r => CR().combos(r.names, r.k).filter(S => CR().valid(r, S));
  const holds = (c, S) => (c.t === 'in' ? S.includes(c.a) : c.t === 'out' ? !S.includes(c.a) : S.includes(c.a) && S.includes(c.b));
  const kind = (r, c) => { const L = cases(r), n = L.filter(S => holds(c, S)).length; return n === L.length ? 0 : n > 0 ? 1 : 2; };
  let ok = (s, r) => r.claims.every((c, i) => s.zone[i] === kind(r, c));
  const answer = r => ({ in: [], zone: r.claims.map(c => kind(r, c)) });
  const ZN = ['tiene que', 'podría', 'no puede'];
  const lay = G => { const n = G.r.names.length, w = Math.min(50, (G.W - 20) / n - 4); const y0 = 106 + G.r.rules.length * 13; G.home = G.r.names.map((nm, i) => ({ nm, x: G.W / 2 - (n * (w + 4) - 4) / 2 + i * (w + 4), y: y0, w, h: 26 })); G.box = { x: 24, y: y0 + 34, w: G.W - 48, h: 40 }; const zw = (G.W - 32) / 3; G.zones = ZN.map((t, z) => ({ z, x: 16 + z * zw, y: G.H - 190, w: zw - 6, h: 76 })); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.75,
    init: r => ({ in: [], zone: r.claims.map(() => null) }),
    ok,
    answered: s => s.zone.some(z => z != null),
    solution: r => r.claims.map(c => `${c.say}: ${ZN[kind(r, c)]}`).join('; '),
    prompt: r => `Comités de ${r.k}: ¿tiene que pasar, podría o no puede?`,
    foot: () => 'Prueba casos arriba; arrastra cada afirmación a su zona',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, w = G.home[0].w;
      G.home.forEach(b => { if (!s.in.includes(b.nm) && G.drag?.nm !== b.nm) RK.chip(p, C, b, b.nm, { size: 11, col: C.sky }); });
      const v = CR().valid(r, s.in);
      p.stroke(s.in.length === r.k && !VELO.on ? (v ? C.ok : C.bad) : C.line); p.strokeWeight(1.4); p.fill(RK.al(p, C.brand, 16)); p.rect(G.box.x, G.box.y, G.box.w, G.box.h, 10);
      G.inBoxes = s.in.map((nm, i) => ({ nm, x: G.box.x + 8 + i * (w + 4), y: G.box.y + 7, w, h: 26 }));
      G.inBoxes.forEach(b => { if (G.drag?.nm !== b.nm) RK.chip(p, C, b, b.nm, { on: true, size: 11, col: C.mint }); });
      TK.label(p, C, s.in.length < r.k ? `prueba un caso (${s.in.length} de ${r.k})` : VELO.on ? 'un caso posible de prueba' : v ? 'este caso cumple las reglas' : 'este caso no cumple', G.W / 2, G.box.y + G.box.h + 10, s.in.length < r.k || VELO.on ? C.mute : v ? C.ok : C.bad, 10, G.W - 30);
      r.rules.forEach((c, i) => TK.label(p, C, c.say, G.W / 2, 100 + i * 13, C.ink, 10, G.W - 30));
      G.zones.forEach(z => { p.stroke(C.line); p.strokeWeight(1.2); p.fill(RK.al(p, C.card, 170)); p.rect(z.x, z.y, z.w, z.h, 8); TK.label(p, C, ZN[z.z], z.x + z.w / 2, z.y + 10, C.ink, 10, z.w); });
      const cw = G.W - 40, n = r.claims.length;
      G.claimBoxes = r.claims.map((c, i) => { const zi = s.zone[i]; if (zi == null) return { i, x: 20, y: G.box.y + G.box.h + 24 + i * 25, w: cw, h: 22 }; const z = G.zones[zi], k = r.claims.slice(0, i).filter((_, j) => s.zone[j] === zi).length; return { i, x: z.x + 3, y: z.y + 20 + k * 18, w: z.w - 6, h: 16 }; });
      G.claimBoxes.forEach(b => { if (G.drag?.ci !== b.i) RK.chip(p, C, b, r.claims[b.i].say, { on: s.zone[b.i] != null, size: s.zone[b.i] == null ? 10 : 8, col: G.locked ? (s.zone[b.i] === kind(r, r.claims[b.i]) ? C.ok : C.bad) : C.coral }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 70, y: G.drag.y - 11, w: 140, h: 22 }, G.drag.nm ?? r.claims[G.drag.ci].say, { on: true, col: C.brand, size: 10 });
      RK.strip(p, C, G.fb, `$\\text{${s.zone.filter(z => z != null).length} de ${n} afirmaciones ubicadas}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 14 });
    },
    press(G, x, y) {
      const c = (G.claimBoxes || []).find(b => hitBox(b, x, y)); if (c) { G.drag = { ci: c.i, x, y }; return true; }
      const b = [...(G.inBoxes || []), ...G.home.filter(b => !G.s.in.includes(b.nm))].find(b => hitBox(b, x, y)); if (b) { G.drag = { nm: b.nm, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      if (d.ci != null) { const z = G.zones.find(z => hitBox(z, x, y)); G.s.zone[d.ci] = z ? z.z : null; G.touch(); return; }
      const S = G.s.in, inside = hitBox({ x: G.box.x - 6, y: G.box.y - 10, w: G.box.w + 12, h: G.box.h + 20 }, x, y);
      if (inside && !S.includes(d.nm) && S.length < G.r.k) S.push(d.nm); else if (!inside && S.includes(d.nm)) S.splice(S.indexOf(d.nm), 1);
    },
    demo(G) { const c = G.claimBoxes?.find(b => G.s.zone[b.i] == null); if (!c) return null; const z = G.zones[(kind(G.r, G.r.claims[c.i]) + 1) % 3]; return { from: { x: c.x + c.w / 2, y: c.y + 11 }, to: { x: z.x + z.w / 2, y: z.y + 40 }, text: 'Arrastra a una zona', ty: z.y - 10 }; },
    peek: G => ({ zones: G.zones, claims: G.claimBoxes }),
  });
  return Object.assign(game, { answer, kind, cases });
})();
;
//#archivo js/games/saludos.js
// Los saludos (Preuniversitario, pu-co-3 y pu-co-5; spec 2026-11-18-preuda-razonamiento-completo): si cada persona saluda una
// vez a cada otra, cada saludo es una pareja sin orden: hay C(n, 2) = n(n − 1)/2. Se arrastra de una persona a otra para
// trazar su saludo (cada pareja cuenta una sola vez, en cualquier sentido). Hay que trazarlos todos.
// params = { rounds: [{ n }] }   state = { rounds: [{ pairs: ['i-j'] }] }   (i < j)
GAMES['saludos'] = (() => {
  const total = r => r.n * (r.n - 1) / 2;
  let ok = (s, r) => s.pairs.length === total(r);
  const pt = (G, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / G.r.n; return { x: G.c.x + G.R * Math.cos(a), y: G.c.y + G.R * Math.sin(a) }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: () => ({ pairs: [] }),
    ok,
    answered: s => s.pairs.length > 0,
    solution: r => `${total(r)} saludos`,
    prompt: r => `${r.n} personas: cada una saluda una vez a cada otra. Traza todos los saludos`,
    foot: () => 'Arrastra de una persona a otra para trazar su saludo',
    layout(G) { G.c = { x: G.W / 2, y: 200 }; G.R = Math.min(G.W / 2 - 40, 96); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { pairs: [...Array(r.n).keys()].flatMap(i => [...Array(r.n).keys()].filter(j => j > i).map(j => `${i}-${j}`)) } : G.s, good = ok(s, r);
      s.pairs.forEach(k => { const [i, j] = k.split('-').map(Number), a = pt(G, i), b = pt(G, j); p.stroke(good ? C.ok : C.sky); p.strokeWeight(2); p.line(a.x, a.y, b.x, b.y); });
      if (G.drag) { const a = pt(G, G.drag.i); p.stroke(C.brand); p.strokeWeight(2); p.line(a.x, a.y, G.drag.x, G.drag.y); }
      for (let i = 0; i < r.n; i++) { const q = pt(G, i); p.stroke(C.ink); p.strokeWeight(1.4); p.fill(C.card); p.circle(q.x, q.y, 28); TK.label(p, C, String.fromCharCode(65 + i), q.x, q.y, C.ink, 12, 24); }
      RK.strip(p, C, G.fb, `$\\text{${s.pairs.length} saludos}$`, { kicker: good ? 'Todos: cada pareja una vez' : 'Sigue trazando', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { for (let i = 0; i < G.r.n; i++) { const q = pt(G, i); if (Math.hypot(x - q.x, y - q.y) < 22) { G.drag = { i, x, y }; return true; } } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      for (let j = 0; j < G.r.n; j++) { const q = pt(G, j); if (j !== d.i && Math.hypot(x - q.x, y - q.y) < 24) { const k = `${Math.min(d.i, j)}-${Math.max(d.i, j)}`; if (!G.s.pairs.includes(k)) { G.s.pairs.push(k); G.touch(); } } }
    },
    demo: G => { const a = pt(G, 0), b = pt(G, 1); return { from: a, to: b, text: 'Arrastra de una a otra', ty: G.c.y + G.R + 30 }; },
    peek: G => ({ c: G.c, R: G.R }),
  });
  return Object.assign(game, { total });
})();
;
//#archivo js/games/diagonales.js
// Las diagonales de un polígono (Preuniversitario, pu-co-5; spec 2026-11-18-preuda-razonamiento-completo): de cada vértice salen
// diagonales a todos menos a sí mismo y a sus dos vecinos (n − 3), y cada diagonal se contaría dos veces: n(n − 3)/2. Se
// arrastra de un vértice a otro no vecino para trazar la diagonal. Hay que trazarlas todas.
// params = { rounds: [{ n }] }   state = { rounds: [{ d: ['i-j'] }] }
GAMES['diagonales'] = (() => {
  const total = r => r.n * (r.n - 3) / 2;
  let ok = (s, r) => s.d.length === total(r);
  const pt = (G, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / G.r.n; return { x: G.c.x + G.R * Math.cos(a), y: G.c.y + G.R * Math.sin(a) }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: () => ({ d: [] }),
    ok,
    answered: s => s.d.length > 0,
    solution: r => `${total(r)} diagonales`,
    prompt: r => `Traza todas las diagonales del polígono de ${r.n} lados`,
    foot: () => 'Arrastra de un vértice a otro que no sea su vecino',
    layout(G) { G.c = { x: G.W / 2, y: 200 }; G.R = Math.min(G.W / 2 - 40, 96); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, n = r.n, all = [...Array(n).keys()].flatMap(i => [...Array(n).keys()].filter(j => j > i + 1 && !(i === 0 && j === n - 1)).map(j => `${i}-${j}`)), s = G.locked && !ok(G.s, r) ? { d: all } : G.s, good = ok(s, r);
      p.stroke(C.ink); p.strokeWeight(2); p.noFill(); p.beginShape(); for (let i = 0; i < n; i++) { const q = pt(G, i); p.vertex(q.x, q.y); } p.endShape(p.CLOSE);
      s.d.forEach(k => { const [i, j] = k.split('-').map(Number), a = pt(G, i), b = pt(G, j); p.stroke(good ? C.ok : C.coral); p.strokeWeight(1.8); p.line(a.x, a.y, b.x, b.y); });
      if (G.drag) { const a = pt(G, G.drag.i); p.stroke(C.brand); p.strokeWeight(2); p.line(a.x, a.y, G.drag.x, G.drag.y); }
      for (let i = 0; i < n; i++) { const q = pt(G, i); drawDot(p, C, q.x, q.y, 12, C.brand); }
      RK.strip(p, C, G.fb, `$\\text{${s.d.length} diagonales}$`, { kicker: good ? 'Están todas' : 'Sigue trazando', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { for (let i = 0; i < G.r.n; i++) { const q = pt(G, i); if (Math.hypot(x - q.x, y - q.y) < 20) { G.drag = { i, x, y }; return true; } } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return; const n = G.r.n;
      for (let j = 0; j < n; j++) { const q = pt(G, j), gap = Math.abs(j - d.i); if (Math.hypot(x - q.x, y - q.y) < 22 && gap > 1 && gap < n - 1) { const k = `${Math.min(d.i, j)}-${Math.max(d.i, j)}`; if (!G.s.d.includes(k)) { G.s.d.push(k); G.touch(); } } }
    },
    demo: G => { const a = pt(G, 0), b = pt(G, 2); return { from: a, to: b, text: 'Traza una diagonal', ty: G.c.y + G.R + 30 }; },
    peek: G => ({ c: G.c, R: G.R }),
  });
  return Object.assign(game, { total });
})();
;
//#archivo js/games/cuenta-cuadrados.js
// Contar cuadrados por tamaños (Preuniversitario, pu-co-5; spec 2026-11-18-preuda-razonamiento-completo): en una cuadrícula de
// n × n hay cuadrados de 1, de 2, …, de n; los de lado s caben (n − s + 1) veces por fila y por columna: (n − s + 1)². Para
// cada tamaño se arrastra cuántos hay (el juego muestra uno de ese tamaño moviéndose por la cuadrícula para ayudar a contar).
// params = { rounds: [{ n }] }   state = { rounds: [{ c: [conteo por tamaño] }] }   (conteos de 0 a 25)
GAMES['cuenta-cuadrados'] = (() => {
  const want = r => Array.from({ length: r.n }, (_, s) => (r.n - s) ** 2);
  let ok = (st, r) => st.c.join() === want(r).join();
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.45,
    init: r => ({ c: Array(r.n).fill(0) }),
    ok,
    answered: s => s.c.some(v => v > 0),
    solution: r => `${want(r).join(' + ')} = ${want(r).reduce((a, b) => a + b, 0)}`,
    prompt: r => `¿Cuántos cuadrados hay en una cuadrícula de ${r.n} × ${r.n}?`,
    foot: () => 'Arrastra cuántos cuadrados hay de cada tamaño',
    layout(G) { const n = G.r.n; G.u = Math.min(30, (G.W * 0.5) / n); G.o = { x: (G.W - n * G.u) / 2, y: 104 }; G.tr = Array.from({ length: n }, (_, s) => 104 + n * G.u + 34 + s * 40); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; game.layout(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { c: want(r) } : G.s, n = r.n, u = G.u, o = G.o, good = ok(s, r);
      p.stroke(C.ink); p.strokeWeight(1.4); p.noFill(); for (let i = 0; i <= n; i++) { p.line(o.x + i * u, o.y, o.x + i * u, o.y + n * u); p.line(o.x, o.y + i * u, o.x + n * u, o.y + i * u); }
      const sz = G.grab >= 0 ? G.grab + 1 : 0;
      if (sz) { const m = n - sz + 1, k = Math.floor(G.t * 1.2) % (m * m); p.stroke(C.brand); p.strokeWeight(3); p.rect(o.x + (k % m) * u, o.y + Math.floor(k / m) * u, sz * u, sz * u); }
      G.X = G.tr.map((ty, si) => { TK.label(p, C, `lado ${si + 1}: ${s.c[si]}`, 50, ty - 14, s.c[si] === want(r)[si] && G.locked ? C.ok : C.ink, 10, 90); return RK.track(p, C, 100, G.W - 24, ty, 26, s.c[si], i => (i % 5 === 0 ? String(i) : null), C.sky); });
      RK.strip(p, C, G.fb, `$${s.c.join(' + ')} = ${s.c.reduce((a, b) => a + b, 0)}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const j = G.tr.findIndex(t => Math.abs(y - t) < 18); if (j < 0) return false; G.grab = j; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => ({ from: { x: G.X[0](0), y: G.tr[0] }, to: { x: G.X[0](3), y: G.tr[0] }, text: 'Arrastra el conteo', ty: G.tr[0] - 28 }),
    peek: G => ({ tr: G.tr }),
  });
  game.layout = G => { const n = G.r.n; G.u = Math.min(30, (G.W * 0.5) / n); G.o = { x: (G.W - n * G.u) / 2, y: 104 }; G.tr = Array.from({ length: n }, (_, s) => 104 + n * G.u + 34 + s * 40); };
  game.move = (G, x) => { const v = RK.pick(x, 100, G.W - 24, 26), j = G.grab; if (v !== G.s.c[j] || !G.touched[G.cur]) { G.s.c[j] = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ c: want(r) }) });
})();
;
//#archivo js/games/complemento-conteo.js
// Contar por el complemento (Preuniversitario, pu-co-4; spec 2026-11-18-preuda-razonamiento-completo): «al menos uno» es más
// fácil al revés: todos los casos menos los que no tienen ninguno. Dos filas de casillas: arriba el total (sin condición) y
// abajo los casos que NO sirven; se arrastran las opciones de cada casilla y el juego resta.
// params = { rounds: [{ slots: [rótulo], all: [n], none: [n], tray: [n], ask }] }
// state = { rounds: [{ a: [índice | null], b: [índice | null] }] }
GAMES['complemento-conteo'] = (() => {
  const P = l => l.reduce((x, y) => x * y, 1);
  const fit = (put, tray, want) => want.every((w, i) => put[i] != null && tray[put[i]] === w);
  let ok = (s, r) => fit(s.a, r.tray, r.all) && fit(s.b, r.tray, r.none);
  const pick = (r, want) => want.map(w => r.tray.indexOf(w));
  const answer = r => ({ a: pick(r, r.all), b: pick(r, r.none) });
  const lay = G => { const n = G.r.slots.length, w = Math.min(54, (G.W - 120) / n - 6); G.rowA = G.r.slots.map((_, i) => ({ i, x: 104 + i * (w + 6), y: 128, w, h: 40 })); G.rowB = G.rowA.map(b => ({ ...b, y: 196 })); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ a: r.slots.map(() => null), b: r.slots.map(() => null) }),
    ok,
    answered: s => s.a.some(v => v != null) || s.b.some(v => v != null),
    solution: r => `${P(r.all)} − ${P(r.none)} = ${P(r.all) - P(r.none)}`,
    prompt: r => r.ask,
    foot: () => 'Arrastra fichas: arriba todos los casos, abajo los que no sirven',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
      TK.label(p, C, 'todos', 50, 148, C.ink, 11, 80); TK.label(p, C, 'no sirven', 50, 216, C.coral, 11, 80);
      r.slots.forEach((t, i) => TK.label(p, C, t, G.rowA[i].x + G.rowA[i].w / 2, 116, C.mute, 9, G.rowA[i].w + 4));
      [['a', G.rowA, C.sky], ['b', G.rowB, C.coral]].forEach(([k, row, col]) => row.forEach(b => { const v = s[k][b.i]; if (v != null && !(G.drag && G.drag.k === k && G.drag.from === b.i)) RK.chip(p, C, b, String(r.tray[v]), { on: true, col: good ? C.ok : col, size: 14 }); else { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 3]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); } }));
      const w = Math.min(48, (G.W - 20) / r.tray.length - 6);
      G.tbox = r.tray.map((v, i) => ({ i, x: G.W / 2 - (r.tray.length * (w + 6) - 6) / 2 + i * (w + 6), y: G.H - 112, w, h: 32 }));
      G.tbox.forEach(b => RK.chip(p, C, b, String(r.tray[b.i]), { size: 13, col: C.mint }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 16, w, h: 32 }, String(r.tray[G.drag.i]), { on: true, col: C.brand, size: 13 });
      const full = k => s[k].every(v => v != null), A = full('a') ? P(s.a.map(v => r.tray[v])) : null, B = full('b') ? P(s.b.map(v => r.tray[v])) : null;
      RK.strip(p, C, G.fb, A != null && B != null ? `$${A} - ${B} = ${A - B}$` : '$\\text{todos} - \\text{los que no sirven}$', { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) {
      const t = (G.tbox || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { i: t.i, k: null, from: -1, x, y }; return true; }
      for (const [k, row] of [['a', G.rowA], ['b', G.rowB]]) { const b = row.find(b => hitBox(b, x, y)); if (b && G.s[k][b.i] != null) { G.drag = { i: G.s[k][b.i], k, from: b.i, x, y }; return true; } }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      if (d.k) G.s[d.k][d.from] = null;
      for (const [k, row] of [['a', G.rowA], ['b', G.rowB]]) { const b = row.find(b => hitBox({ x: b.x - 3, y: b.y - 8, w: b.w + 6, h: b.h + 16 }, x, y)); if (b) G.s[k][b.i] = d.i; }
      G.touch();
    },
    demo(G) { const t = G.tbox?.[0], b = G.rowB[0]; return t ? { from: { x: t.x + t.w / 2, y: t.y + 16 }, to: { x: b.x + b.w / 2, y: b.y + 20 }, text: 'Arrastra a una casilla', ty: t.y - 12 } : null; },
    peek: G => ({ rowA: G.rowA, rowB: G.rowB, tray: G.tbox }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/cubo-kit.js
// Kit del cubo (Preuniversitario, mundo «Razonamiento espacial»; spec 2026-11-18-preuda-razonamiento-completo): dobla un
// desarrollo plano y dice qué cara del cubo es cada cuadrado. Se recorre el desarrollo desde un cuadrado (abajo del cubo) y
// cada paso a un vecino «rueda» el cubo: el cuadrado vecino queda abajo. Caras del cubo: 0 y 1 opuestas, 2 y 3, 4 y 5.
// cells = [[col, fila], …]   →   fold(cells) = [id de cara de cada cuadrado] o null si no es un desarrollo válido.
const CUBO = (() => {
  const roll = (s, d) => {
    const { U, D, N, S, E, W } = s;
    if (d === 'E') return { U: W, D: E, N, S, E: U, W: D };
    if (d === 'W') return { U: E, D: W, N, S, E: D, W: U };
    if (d === 'N') return { U: S, D: N, N: U, S: D, E, W };
    return { U: N, D: S, N: D, S: U, E, W };          // 'S'
  };
  function fold(cells) {
    if (cells.length !== 6) return null;
    const key = c => c.join(','), idx = {}; cells.forEach((c, i) => { idx[key(c)] = i; });
    const face = Array(6).fill(null), st = Array(6).fill(null);
    face[0] = 0; st[0] = { D: 0, U: 1, N: 2, S: 3, E: 4, W: 5 };
    const Q = [0], dirs = [['E', 1, 0], ['W', -1, 0], ['N', 0, -1], ['S', 0, 1]];
    while (Q.length) {
      const i = Q.shift(), [x, y] = cells[i];
      for (const [d, dx, dy] of dirs) { const j = idx[key([x + dx, y + dy])]; if (j == null || st[j]) continue; st[j] = roll(st[i], d); face[j] = st[j].D; Q.push(j); }
    }
    if (face.some(f => f == null)) return null;                    // no está todo unido
    return new Set(face).size === 6 ? face : null;                 // dos cuadrados en la misma cara: no cierra
  }
  // Índice del cuadrado opuesto a i en un desarrollo válido.
  const opposite = (cells, i) => { const f = fold(cells); return f ? f.indexOf(f[i] ^ 1) : -1; };
  return { fold, opposite };
})();
;
//#archivo js/games/ruta-cuadras.js
// El camino más corto por cuadras (Preuniversitario, pu-es-1; spec 2026-11-18-preuda-razonamiento-completo): en una ciudad
// sin diagonales, el camino más corto mide lo horizontal más lo vertical, por cualquier ruta que no se devuelva; un
// obstáculo obliga a rodearlo. Se arrastra el dedo por las esquinas de la rejilla, de A hacia B; cada cuadra se cuenta.
// Hay que llegar a B con el menor número de cuadras posible.
// params = { rounds: [{ w, h, A: [x, y], B: [x, y], walls: [[x, y]] }] }   (walls: manzanas que no se pueden cruzar)
// state = { rounds: [{ path: [[x, y], …] }] }
GAMES['ruta-cuadras'] = (() => {
  const key = p => p.join(',');
  // Distancia más corta con BFS sobre las esquinas. El parque ocupa varias manzanas: una calle queda cerrada si pasa por
  // dentro de él, es decir, si las dos manzanas que separa son del parque.
  const isWall = (r, x, y) => (r.walls || []).some(w => w[0] === x && w[1] === y);
  const blocked = (r, a, b) => { if (a[0] === b[0]) { const y = Math.min(a[1], b[1]), x = a[0]; return isWall(r, x - 1, y) && isWall(r, x, y); } const x = Math.min(a[0], b[0]), y = a[1]; return isWall(r, x, y - 1) && isWall(r, x, y); };
  const nbrs = (r, p) => [[1, 0], [-1, 0], [0, 1], [0, -1]].map(d => [p[0] + d[0], p[1] + d[1]]).filter(q => q[0] >= 0 && q[1] >= 0 && q[0] <= r.w && q[1] <= r.h && !blocked(r, p, q));
  const shortest = r => { const seen = { [key(r.A)]: 0 }, Q = [r.A]; while (Q.length) { const p = Q.shift(); for (const q of nbrs(r, p)) if (seen[key(q)] == null) { seen[key(q)] = seen[key(p)] + 1; Q.push(q); } } return seen[key(r.B)]; };
  let ok = (s, r) => s.path.length > 0 && key(s.path[s.path.length - 1]) === key(r.B) && s.path.length - 1 === shortest(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ path: [r.A] }),
    ok,
    answered: s => s.path.length > 1,
    solution: r => `${shortest(r)} cuadras`,
    prompt: r => `Ve de A a B por el camino más corto${(r.walls || []).length ? ' (rodea el parque)' : ''}`,
    foot: () => 'Arrastra el dedo por las calles; vuelve atrás para borrar',
    layout(G) { const r = G.r; G.u = Math.min((G.W - 40) / r.w, (G.H - 220) / r.h); G.o = { x: (G.W - r.w * G.u) / 2, y: 104 + r.h * G.u }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; game.lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { path: [r.A] } : G.s, u = G.u, o = G.o, X = x => o.x + x * u, Y = y => o.y - y * u, good = ok(s, r);
      for (let i = 0; i < r.w; i++) for (let j = 0; j < r.h; j++) { const wall = (r.walls || []).some(w => w[0] === i && w[1] === j); p.noStroke(); p.fill(wall ? RK.al(p, C.mint, 160) : RK.al(p, C.card, 170)); p.rect(X(i) + 3, Y(j + 1) + 3, u - 6, u - 6, 3); }
      p.noFill(); p.stroke(good ? C.ok : C.brand); p.strokeWeight(3.5); p.beginShape(); s.path.forEach(q => p.vertex(X(q[0]), Y(q[1]))); p.endShape();
      [[r.A, 'A', C.sky], [r.B, 'B', C.coral]].forEach(([q, t, col]) => { p.noStroke(); p.fill(col); p.circle(X(q[0]), Y(q[1]), 22); TK.label(p, C, t, X(q[0]), Y(q[1]), inkOn(col), 11, 20); });
      const last = s.path[s.path.length - 1]; RK.knob(p, C, X(last[0]), Y(last[1]), C.brand);
      RK.strip(p, C, G.fb, `$\\text{${s.path.length - 1} cuadras}$`, { kicker: key(last) === key(r.B) ? (good ? 'Es el más corto' : 'Llegaste, pero hay un camino más corto') : 'Sigue hasta B', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const last = G.s.path[G.s.path.length - 1]; if (Math.hypot(x - (G.o.x + last[0] * G.u), y - (G.o.y - last[1] * G.u)) > 36) return false; G.grab = true; return true; },
    drag(G, x, y) {
      if (!G.grab) return false; const r = G.r, P = G.s.path, q = [Math.round((x - G.o.x) / G.u), Math.round((G.o.y - y) / G.u)], last = P[P.length - 1];
      if (P.length > 1 && key(q) === key(P[P.length - 2])) { P.pop(); G.touch(); return true; }
      if (nbrs(r, last).some(n => key(n) === key(q)) && !P.some(p => key(p) === key(q))) { P.push(q); G.touch(); }
      return true;
    },
    release(G) { G.grab = false; },
    demo: G => { const A = G.r.A, X = x => G.o.x + x * G.u, Y = y => G.o.y - y * G.u; return { from: { x: X(A[0]), y: Y(A[1]) }, to: { x: X(A[0] + 1), y: Y(A[1]) }, text: 'Arrastra por las calles', ty: G.o.y + 18 }; },
    peek: G => ({ o: G.o, u: G.u }),
  });
  game.lay = G => { const r = G.r; G.u = Math.min((G.W - 40) / r.w, (G.H - 220) / r.h); G.o = { x: (G.W - r.w * G.u) / 2, y: 104 + r.h * G.u }; };
  return Object.assign(game, { shortest });
})();
;
//#archivo js/games/brujula-pasos.js
// Seguir instrucciones en la rejilla (Preuniversitario, pu-es-1; spec 2026-11-18-preuda-razonamiento-completo): «3 cuadras al
// norte, 5 al este, 1 al sur…»: los movimientos opuestos se cancelan, así que basta sumar lo vertical y lo horizontal por
// separado. Se arrastra la ficha a la esquina donde termina el recorrido (desde la salida marcada).
// params = { rounds: [{ w, h, start: [x, y], moves: [['N' | 'S' | 'E' | 'O', n]] }] }   state = { rounds: [{ x, y }] }
GAMES['brujula-pasos'] = (() => {
  const D = { N: [0, 1], S: [0, -1], E: [1, 0], O: [-1, 0] }, NAME = { N: 'norte', S: 'sur', E: 'este', O: 'oeste' };
  const end = r => r.moves.reduce((p, [d, n]) => [p[0] + D[d][0] * n, p[1] + D[d][1] * n], r.start);
  let ok = (s, r) => s.x === end(r)[0] && s.y === end(r)[1];
  const lay = G => { const r = G.r; G.u = Math.min((G.W - 40) / r.w, (G.H - 250) / r.h); G.o = { x: (G.W - r.w * G.u) / 2, y: 104 + r.h * G.u }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ x: r.start[0], y: r.start[1] }),
    ok,
    solution: r => `(${end(r).join(', ')})`,
    prompt: r => r.moves.map(([d, n]) => `${n} al ${NAME[d]}`).join(', '),
    foot: () => 'Arrastra la ficha a la esquina donde termina el recorrido',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { x: end(r)[0], y: end(r)[1] } : G.s, u = G.u, o = G.o, X = x => o.x + x * u, Y = y => o.y - y * u, good = ok(s, r);
      p.stroke(RK.al(p, C.line, 120)); p.strokeWeight(1); for (let i = 0; i <= r.w; i++) p.line(X(i), Y(0), X(i), Y(r.h)); for (let j = 0; j <= r.h; j++) p.line(X(0), Y(j), X(r.w), Y(j));
      TK.label(p, C, 'N ↑', X(r.w) - 14, Y(r.h) - 10, C.mute, 10, 30);
      p.noStroke(); p.fill(C.sky); p.circle(X(r.start[0]), Y(r.start[1]), 18); TK.label(p, C, 'salida', X(r.start[0]), Y(r.start[1]) + 16, C.mute, 9, 50);
      p.fill(good ? C.ok : C.brand); p.circle(X(s.x), Y(s.y), 22);
      RK.strip(p, C, G.fb, good ? '$\\text{los opuestos se cancelan}$' : '$\\text{suma lo horizontal y lo vertical}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { if (Math.hypot(x - (G.o.x + G.s.x * G.u), y - (G.o.y - G.s.y * G.u)) > 36) return false; G.grab = true; return true; },
    drag(G, x, y) { if (!G.grab) return false; const nx = Math.max(0, Math.min(G.r.w, Math.round((x - G.o.x) / G.u))), ny = Math.max(0, Math.min(G.r.h, Math.round((G.o.y - y) / G.u))); if (nx !== G.s.x || ny !== G.s.y || !G.touched[G.cur]) { G.s.x = nx; G.s.y = ny; G.touch(); } return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.o.x + G.s.x * G.u, y: G.o.y - G.s.y * G.u }, to: { x: G.o.x + (G.s.x + 1) * G.u, y: G.o.y - (G.s.y + 1) * G.u }, text: 'Arrastra la ficha', ty: G.o.y + 26 }),
    peek: G => ({ o: G.o, u: G.u }),
  });
  return Object.assign(game, { answer: r => ({ x: end(r)[0], y: end(r)[1] }) });
})();
;
//#archivo js/games/caras-opuestas.js
// Caras opuestas del cubo (Preuniversitario, pu-es-3; spec 2026-11-18-preuda-razonamiento-completo): en un desarrollo, dos
// cuadrados que se tocan nunca quedan opuestos; en una fila de tres, el primero y el tercero sí. Hay un desarrollo con letras;
// junto a tres letras hay un hueco: se arrastra a cada hueco la letra que queda frente a ella al armar el cubo.
// params = { rounds: [{ cells: [[col, fila]], letters: [..], ask: [índices] }] }   state = { rounds: [{ put: [letra | null] }] }
GAMES['caras-opuestas'] = (() => {
  const want = r => r.ask.map(i => r.letters[CUBO.opposite(r.cells, i)]);
  let ok = (s, r) => s.put.join() === want(r).join();
  const lay = G => { const r = G.r, W = Math.max(...r.cells.map(c => c[0])) + 1, H = Math.max(...r.cells.map(c => c[1])) + 1; G.u = Math.min(42, (G.W - 40) / W, 180 / H); G.o = { x: (G.W - W * G.u) / 2, y: 104 }; G.slots = r.ask.map((_, k) => ({ k, x: G.W / 2 - (r.ask.length * 96 - 8) / 2 + k * 96 + 46, y: 104 + H * G.u + 22, w: 40, h: 36 })); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.5,
    init: r => ({ put: r.ask.map(() => null) }),
    ok,
    answered: s => s.put.some(v => v != null),
    solution: r => r.ask.map((i, k) => `${r.letters[i]} ↔ ${want(r)[k]}`).join(', '),
    prompt: () => 'Al armar el cubo, ¿qué letra queda frente a cada una?',
    foot: () => 'Arrastra a cada hueco la letra opuesta',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { put: want(r) } : G.s, good = ok(s, r), u = G.u, o = G.o;
      r.cells.forEach((c, i) => { const b = { x: o.x + c[0] * u, y: o.y + c[1] * u, w: u, h: u }; p.stroke(C.ink); p.strokeWeight(1.4); p.fill(r.ask.includes(i) ? RK.al(p, C.sky, 120) : RK.al(p, C.card, 200)); p.rect(b.x, b.y, u, u); TK.label(p, C, r.letters[i], b.x + u / 2, b.y + u / 2, C.ink, 14, u); });
      G.slots.forEach(b => { TK.label(p, C, `${r.letters[r.ask[b.k]]} ↔`, b.x - 26, b.y + 18, C.ink, 13, 40); const v = s.put[b.k]; if (v != null) RK.chip(p, C, b, v, { on: true, col: G.locked ? (v === want(r)[b.k] ? C.ok : C.bad) : good ? C.ok : C.mint, size: 13 }); else { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 3]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); } });
      G.tray = r.letters.map((L, i) => ({ L, x: G.W / 2 - (r.letters.length * 40 - 6) / 2 + i * 40, y: G.H - 110, w: 34, h: 32 }));
      G.tray.forEach(b => RK.chip(p, C, b, b.L, { size: 13, col: C.coral }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 17, y: G.drag.y - 16, w: 34, h: 32 }, G.drag.L, { on: true, col: C.brand, size: 13 });
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{una cara para cada casilla}$' : good ? '$\\text{bien doblado}$' : '$\\text{dobla el desarrollo en tu cabeza}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const t = (G.tray || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { L: t.L, x, y }; return true; } const b = G.slots.find(b => hitBox(b, x, y)); if (b && G.s.put[b.k] != null) { G.drag = { L: G.s.put[b.k], x, y }; G.s.put[b.k] = null; return true; } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; const b = G.slots.find(b => hitBox({ x: b.x - 6, y: b.y - 8, w: b.w + 12, h: b.h + 16 }, x, y)); if (b) G.s.put[b.k] = d.L; G.touch(); },
    demo(G) { const t = G.tray?.find(b => b.L !== want(G.r)[0]), b = G.slots[0]; return t ? { from: { x: t.x + 17, y: t.y + 16 }, to: { x: b.x + 20, y: b.y + 18 }, text: 'Arrastra una letra', ty: t.y - 12 } : null; },
    peek: G => ({ slots: G.slots, tray: G.tray }),
  });
  return Object.assign(game, { answer: r => ({ put: want(r) }), want });
})();
;
//#archivo js/games/dado-siete.js
// El dado: las caras opuestas suman 7 (Preuniversitario, pu-es-3; spec 2026-11-18-preuda-razonamiento-completo): en un dado
// común 1 va frente a 6, 2 frente a 5 y 3 frente a 4. Se ven tres caras (arriba, frente y derecha); se arrastran los números
// de las tres caras escondidas (abajo, atrás e izquierda) a su lugar en el desarrollo.
// params = { rounds: [{ top, front, right }] }   state = { rounds: [{ bottom, back, left }] }
GAMES['dado-siete'] = (() => {
  const want = r => ({ bottom: 7 - r.top, back: 7 - r.front, left: 7 - r.right });
  let ok = (s, r) => ['bottom', 'back', 'left'].every(k => s[k] === want(r)[k]);
  const NAMES = { bottom: 'abajo', back: 'atrás', left: 'izquierda' };
  const lay = G => { const u = 46, cx = G.W / 2; G.u = u; G.cells = { top: [cx - u / 2, 120], back: [cx - u / 2, 120 - u + u], left: [cx - 3 * u / 2, 120 + u], front: [cx - u / 2, 120 + u], right: [cx + u / 2, 120 + u], bottom: [cx - u / 2, 120 + 2 * u] }; G.cells.back = [cx - u / 2, 120 - 0]; G.cells.top = [cx - u / 2, 120 + u]; G.cells.front = [cx - u / 2, 120 + 2 * u]; G.cells.bottom = [cx - u / 2, 120 + 3 * u]; G.cells.left = [cx - 3 * u / 2, 120 + u]; G.cells.right = [cx + u / 2, 120 + u]; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: () => ({ bottom: null, back: null, left: null }),
    ok,
    answered: s => s.bottom != null || s.back != null || s.left != null,
    solution: r => `abajo ${7 - r.top}, atrás ${7 - r.front}, izquierda ${7 - r.right}`,
    prompt: r => `Se ven ${r.top} arriba, ${r.front} al frente y ${r.right} a la derecha. ¿Y las escondidas?`,
    foot: () => 'Arrastra los números a las caras escondidas del desarrollo',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? want(r) : G.s, u = G.u, good = ok(s, r);
      const known = { top: r.top, front: r.front, right: r.right };
      Object.entries(G.cells).forEach(([k, [x, y]]) => {
        const v = known[k] ?? s[k], hidden = !(k in known);
        p.stroke(C.ink); p.strokeWeight(1.4); p.fill(hidden ? RK.al(p, good ? C.ok : C.mint, 90) : RK.al(p, C.card, 220)); p.rect(x, y, u, u, 4);
        if (v != null) TK.label(p, C, String(v), x + u / 2, y + u / 2, C.ink, 18, u); else TK.label(p, C, NAMES[k], x + u / 2, y + u / 2, C.mute, 8, u - 4);
      });
      G.tray = [1, 2, 3, 4, 5, 6].map((n, i) => ({ n, x: G.W / 2 - (6 * 40 - 6) / 2 + i * 40, y: G.H - 110, w: 34, h: 34 }));
      G.tray.forEach(b => RK.chip(p, C, b, String(b.n), { size: 14, col: C.sky }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 17, y: G.drag.y - 17, w: 34, h: 34 }, String(G.drag.n), { on: true, col: C.brand, size: 14 });
      RK.strip(p, C, G.fb, good ? '$\\text{cada pareja suma 7}$' : '$\\text{opuestas: 1-6, 2-5, 3-4}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const t = (G.tray || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { n: t.n, x, y }; return true; } for (const k of ['bottom', 'back', 'left']) { const [cx, cy] = G.cells[k]; if (G.s[k] != null && hitBox({ x: cx, y: cy, w: G.u, h: G.u }, x, y)) { G.drag = { n: G.s[k], x, y }; G.s[k] = null; return true; } } return false; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; for (const k of ['bottom', 'back', 'left']) { const [cx, cy] = G.cells[k]; if (hitBox({ x: cx - 4, y: cy - 4, w: G.u + 8, h: G.u + 8 }, x, y)) G.s[k] = d.n; } G.touch(); },
    demo(G) { const [cx, cy] = G.cells.left, t = G.tray?.find(b => b.n !== 7 - G.r.right); return t ? { from: { x: t.x + 17, y: t.y + 17 }, to: { x: cx + G.u / 2, y: cy + G.u / 2 }, text: 'Arrastra un número', ty: t.y - 12 } : null; },
    peek: G => ({ cells: G.cells, tray: G.tray }),
  });
  return Object.assign(game, { answer: r => want(r) });
})();
;
//#archivo js/games/dobla-papel.js
// Doblar y perforar (Preuniversitario, pu-es-4; spec 2026-11-18-preuda-razonamiento-completo): cada doblez duplica las capas
// del papel, así que un agujero hecho con el papel doblado n veces atraviesa 2ⁿ capas y al abrir hay 2ⁿ agujeros (por cada
// agujero que se hizo). Se ve el papel doblado; se arrastra cuántos agujeros habrá al desdoblarlo y el juego lo abre.
// params = { rounds: [{ folds, holes }] }   state = { rounds: [{ n }] }   (de 1 a 32)
GAMES['dobla-papel'] = (() => {
  const total = r => 2 ** r.folds * r.holes;
  let ok = (s, r) => s.n === total(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `${total(r)} agujeros`,
    prompt: r => `Se dobla una hoja por la mitad ${r.folds} ${r.folds === 1 ? 'vez' : 'veces'} y se hace${r.holes > 1 ? 'n' : ''} ${r.holes} agujero${r.holes > 1 ? 's' : ''}. ¿Cuántos hay al abrirla?`,
    foot: () => 'Arrastra cuántos agujeros quedan al abrir la hoja',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { n: total(r) } : G.s, good = ok(s, r), x0 = 30, y0 = 110;
      // Capas del papel doblado, una sobre otra.
      const L = 2 ** r.folds, W = 90, H = 70;
      for (let i = Math.min(L, 8) - 1; i >= 0; i--) { p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 220 - i * 18)); p.rect(x0 + i * 3, y0 + i * 3, W, H, 3); }
      for (let h = 0; h < r.holes; h++) { p.noStroke(); p.fill(C.ink); p.circle(x0 + 30 + h * 22, y0 + 34, 9); }
      TK.label(p, C, `${L} capas`, x0 + W / 2, y0 + H + 30, C.mute, 10, 90);
      if (G.locked || good) {        // la hoja abierta: la cuadrícula de capas, con un agujero por capa y por perforación
        const cols = 2 ** Math.ceil(r.folds / 2), rows = 2 ** Math.floor(r.folds / 2), cw = Math.min(28, (G.W - 170) / cols), ch = Math.min(28, 120 / rows), ox = G.W - 30 - cols * cw;
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { p.stroke(C.line); p.fill(RK.al(p, C.card, 200)); p.rect(ox + i * cw, y0 + j * ch, cw, ch); for (let h = 0; h < r.holes; h++) { p.noStroke(); p.fill(C.ok); p.circle(ox + i * cw + (h + 1) * cw / (r.holes + 1), y0 + j * ch + ch / 2, 5); } }
        TK.label(p, C, 'abierta', ox + cols * cw / 2, y0 + rows * ch + 14, C.mute, 10, 80);
      }
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 32, s.n - 1, i => ((i + 1) % 4 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$\\text{${s.n} agujeros}$`, { kicker: 'Cada doblez duplica las capas', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(2), y: G.tY }, text: 'Arrastra los agujeros', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 32) + 1; if (v !== G.s.n || !G.touched[G.cur]) { G.s.n = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ n: total(r) }) });
})();
;
//#archivo js/games/reloj-espejo.js
// El reloj en el espejo (Preuniversitario, pu-es-4; spec 2026-11-18-preuda-razonamiento-completo): en un espejo vertical las
// agujas se ven al otro lado del 12: la hora del espejo y la real suman 12:00. A la izquierda está el reflejo; a la derecha,
// un reloj normal: se arrastra el minutero (y el horario lo sigue) hasta mostrar la hora real.
// params = { rounds: [{ seen: minutos desde las 12:00 }] }   state = { rounds: [{ t }] }   (minutos, de 5 en 5, de 0 a 715)
GAMES['reloj-espejo'] = (() => {
  const real = r => (720 - r.seen) % 720;
  let ok = (s, r) => s.t === real(r);
  const hm = t => `${Math.floor(t / 60) || 12}:${String(t % 60).padStart(2, '0')}`;
  const face = (p, C, c, R, t, mirror, col) => {
    p.stroke(C.ink); p.strokeWeight(2); p.fill(RK.al(p, C.card, 220)); p.circle(c.x, c.y, 2 * R);
    for (let k = 0; k < 12; k++) { const a = -Math.PI / 2 + k * Math.PI / 6; p.strokeWeight(k % 3 ? 1 : 2.5); p.line(c.x + R * 0.85 * Math.cos(a), c.y + R * 0.85 * Math.sin(a), c.x + R * 0.95 * Math.cos(a), c.y + R * 0.95 * Math.sin(a)); }
    const sx = mirror ? -1 : 1, am = -Math.PI / 2 + (t % 60) / 60 * 2 * Math.PI, ah = -Math.PI / 2 + (t % 720) / 720 * 2 * Math.PI;
    p.stroke(col); p.strokeWeight(3); p.line(c.x, c.y, c.x + sx * R * 0.5 * Math.cos(ah), c.y + R * 0.5 * Math.sin(ah));
    p.strokeWeight(2); p.line(c.x, c.y, c.x + sx * R * 0.8 * Math.cos(am), c.y + R * 0.8 * Math.sin(am));
    return { mx: c.x + sx * R * 0.8 * Math.cos(am), my: c.y + R * 0.8 * Math.sin(am) };
  };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ t: r.seen }),
    ok,
    solution: r => `son las ${hm(real(r))}`,
    prompt: () => 'Este reloj se ve en un espejo. ¿Qué hora es en realidad?',
    foot: () => 'Arrastra el minutero del reloj de la derecha',
    layout(G) { G.R = Math.min(G.W * 0.21, 72); G.cL = { x: G.W * 0.27, y: 190 }; G.cR = { x: G.W * 0.73, y: 190 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { t: real(r) } : G.s, good = ok(s, r);
      face(p, C, G.cL, G.R, r.seen, true, C.coral); TK.label(p, C, 'en el espejo', G.cL.x, G.cL.y + G.R + 16, C.mute, 10, 100);
      G.hand = face(p, C, G.cR, G.R, s.t, false, good ? C.ok : C.brand); TK.label(p, C, `real: ${hm(s.t)}`, G.cR.x, G.cR.y + G.R + 16, C.ink, 11, 100);
      RK.knob(p, C, G.hand.mx, G.hand.my, C.brand);
      RK.strip(p, C, G.fb, good ? '$\\text{espejo + real} = 12{:}00$' : `$\\text{${hm(s.t)}}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.hypot(x - G.cR.x, y - G.cR.y) > G.R + 20) return false; G.grab = true; G.prevA = Math.atan2(y - G.cR.y, x - G.cR.x); return true; },
    drag(G, x, y) {
      if (!G.grab) return false;
      const a = Math.atan2(y - G.cR.y, x - G.cR.x); let d = a - G.prevA; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; G.prevA = a;
      G.acc = (G.acc || 0) + d / (2 * Math.PI) * 60; const steps = Math.trunc(G.acc / 5);
      if (steps) { G.acc -= steps * 5; G.s.t = ((G.s.t + steps * 5) % 720 + 720) % 720; G.touch(); }
      return true;
    },
    release(G) { G.grab = false; G.acc = 0; },
    demo: G => ({ from: { x: G.hand?.mx ?? G.cR.x, y: G.hand?.my ?? G.cR.y - 50 }, to: { x: G.cR.x + G.R * 0.8, y: G.cR.y }, text: 'Gira el minutero', ty: G.cR.y + G.R + 36 }),
    peek: G => ({ cR: G.cR, R: G.R }),
  });
  return Object.assign(game, { answer: r => ({ t: real(r) }) });
})();
;
//#archivo js/games/sucesion-kit.js
// Kit de las sucesiones (Preuniversitario, mundo «Secuencias y patrones»; spec 2026-11-18-preuda-razonamiento-completo): un
// juego de «el término que sigue»: se ven los términos como barras y fichas, y se arrastra la altura de la barra que falta
// (el valor que se propone). Cada juego da su propia escena de ayuda (diferencias, sumas, colores por posición).
// o = { aspect, prompt(r), foot, terms(r) → [números] (con null en el que falta), need(r), range(r) → [mín, máx] del valor, extra(G), fmt(v) → rótulo, noBars }
const SUC = (() => {
  function nextGame(o) {
    const ok = velo((s, r) => s.v === o.need(r));
    const game = roundsGame({
      aspect: o.aspect || 1.25,
      init: r => { const [lo] = o.range(r); return { v: o.need(r) === lo ? lo + 1 : lo }; },
      ok,
      solution: r => (o.fmt ? o.fmt(o.need(r)) : `${o.need(r)}`),
      prompt: o.prompt,
      foot: () => o.foot || 'Arrastra la barra que falta hasta su valor',
      layout(G) { G.b = { x: 20, y: 110, w: G.W - 40, h: G.H - 270 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
      enter(G) { G.grab = false; },
      draw(G) {
        const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: o.need(r) } : G.s, good = ok(s, r), T = o.terms(r), n = T.length, b = G.b, [lo0, hi] = o.range(r), lo = Math.min(0, lo0), Y = v => b.y + b.h - (v - lo) / (hi - lo) * b.h, w = b.w / n, y0 = Y(0);
        G.miss = T.indexOf(null); G.Y = Y; G.lo = lo; G.hi = hi; G.vlo = lo0;
        p.stroke(C.line); p.strokeWeight(1); p.line(b.x, y0, b.x + b.w, y0);
        T.forEach((t, i) => {
          const v = t == null ? s.v : t, x = b.x + i * w + w * 0.2, col = o.color ? o.color(C, i, r) : C.sky;
          if (!o.noBars) { p.noStroke(); p.fill(t == null ? (good ? C.ok : C.brand) : col); p.rect(x, Math.min(y0, Y(v)), w * 0.6, Math.abs(Y(v) - y0), 3); }
          TK.label(p, C, o.fmt ? o.fmt(v) : String(v), x + w * 0.3, Y(v) + (v >= 0 ? -10 : 10), t == null ? C.brand : C.ink, 11, w);
        });
        o.extra?.({ ...G, s, T: T.map(t => (t == null ? s.v : t)) });
        const mx = b.x + G.miss * w + w / 2; RK.knob(p, C, mx, Y(s.v), C.brand); G.kx = mx;
        RK.strip(p, C, G.fb, good ? `$\\text{sigue: ${o.fmt ? o.fmt(o.need(r)) : o.need(r)}}$` : `$\\text{¿${o.fmt ? o.fmt(s.v) : s.v}?}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
      },
      // Arrastre relativo: cada 8 px desde donde se tocó es una unidad (en el celular la barra es corta y las unidades, muchas);
      // un toque sin arrastrar sube o baja una unidad según se toque por encima o por debajo de la punta.
      press(G, x, y) { const w = G.b.w / o.terms(G.r).length; if (Math.abs(x - G.kx) > w * 0.6 + 10 || !hitBox({ x: G.b.x, y: G.b.y - 20, w: G.b.w, h: G.b.h + 40 }, x, y)) return false; G.grab = { y0: y, v0: G.s.v, moved: false }; return true; },
      drag(G, x, y) { if (!G.grab) return false; if (Math.abs(y - G.grab.y0) > 4) G.grab.moved = true; game.set(G, G.grab.v0 + Math.round((G.grab.y0 - y) / 8)); return true; },
      release(G, x, y) { if (G.grab && !G.grab.moved) game.set(G, G.s.v + (y < G.Y(G.s.v) ? 1 : -1)); G.grab = null; },
      demo: G => ({ from: { x: G.kx, y: G.Y(G.s.v) }, to: { x: G.kx, y: G.Y(G.s.v) - 40 }, text: 'Arrastra la barra', ty: G.b.y + 10 }),
      peek: G => ({ b: G.b, kx: G.kx }),
    });
    game.set = (G, raw) => { const v = Math.max(G.vlo, Math.min(G.hi, raw)); if (v !== G.s.v || !G.touched[G.cur]) { G.s.v = v; G.touch(); } };
    return Object.assign(game, { answer: r => ({ v: o.need(r) }) });
  }
  return { nextGame };
})();
;
//#archivo js/games/diferencias-escalera.js
// Las diferencias de las diferencias (Preuniversitario, pu-se-1; spec 2026-11-18-preuda-razonamiento-completo): si las
// diferencias no son iguales, a veces lo son las diferencias de las diferencias (como en los cuadrados). Se arrastra el
// término que sigue; abajo se ven en vivo la fila de diferencias y la de segundas diferencias.
// params = { rounds: [{ seq: [términos conocidos], hi }] }   state = { rounds: [{ v }] }
GAMES['diferencias-escalera'] = SUC.nextGame({
  prompt: () => '¿Qué número sigue? Mira las diferencias de las diferencias',
  terms: r => [...r.seq, null],
  need: r => { const s = r.seq, n = s.length, d1 = s[n - 1] - s[n - 2], d2 = d1 - (s[n - 2] - s[n - 3]); return s[n - 1] + d1 + d2; },
  range: r => [0, r.hi],
  extra: G => {
    const { p, C, T } = G, b = G.b, w = b.w / T.length, y = b.y + b.h + 14;
    T.slice(1).forEach((t, i) => { const d = t - T[i]; TK.label(p, C, `${d >= 0 ? '+' : ''}${d}`, b.x + (i + 1) * w, y, C.coral, 10, w); });
    const D = T.slice(1).map((t, i) => t - T[i]);
    D.slice(1).forEach((t, i) => { const d = t - D[i]; TK.label(p, C, `${d >= 0 ? '+' : ''}${d}`, b.x + (i + 1.5) * w, y + 16, C.mute, 9, w); });
  },
});
;
//#archivo js/games/fibonacci-suma.js
// Sucesiones tipo Fibonacci (Preuniversitario, pu-se-1; spec 2026-11-18-preuda-razonamiento-completo): cada término es la suma
// de los dos anteriores. Falta uno en el medio; se arrastra su barra hasta el valor que hace que la regla se cumpla en todo
// el resto. Debajo de cada término se ve la suma de los dos anteriores y si coincide.
// params = { rounds: [{ seq: [términos con null en el que falta], hi }] }   state = { rounds: [{ v }] }
GAMES['fibonacci-suma'] = SUC.nextGame({
  prompt: () => 'Cada término es la suma de los dos anteriores. ¿Cuál falta?',
  foot: 'Arrastra la barra que falta; abajo se comprueba cada suma',
  terms: r => r.seq,
  need: r => { const k = r.seq.indexOf(null); return k >= 2 ? r.seq[k - 1] + r.seq[k - 2] : r.seq[k + 1] - r.seq[k - 1]; },
  range: r => [0, r.hi],
  extra: G => {
    const { p, C, T } = G, b = G.b, w = b.w / T.length, y = b.y + b.h + 14;
    T.forEach((t, i) => { if (i < 2) return; const sum = T[i - 1] + T[i - 2]; TK.label(p, C, `${T[i - 2]}+${T[i - 1]}`, b.x + (i + 0.5) * w, y, sum === t && !VELO.on ? C.ok : C.bad, 9, w); });
  },
});
;
//#archivo js/games/alterna-dos.js
// Dos sucesiones intercaladas (Preuniversitario, pu-se-1 y pu-se-2; spec 2026-11-18-preuda-razonamiento-completo): a veces
// los términos de las posiciones impares siguen una regla y los de las pares otra. Las barras se pintan de dos colores según
// la posición; se arrastra el término que sigue (que pertenece a una de las dos).
// params = { rounds: [{ seq: [términos conocidos], need, hi }] }   state = { rounds: [{ v }] }
GAMES['alterna-dos'] = SUC.nextGame({
  prompt: () => '¿Qué sigue? Hay dos sucesiones intercaladas',
  terms: r => [...r.seq, null],
  need: r => r.need,
  range: r => [0, r.hi],
  color: (C, i) => (i % 2 ? C.coral : C.sky),
});
;
//#archivo js/games/letras-salto.js
// Letras que saltan (Preuniversitario, pu-se-2; spec 2026-11-18-preuda-razonamiento-completo): cada letra vale su posición en
// el alfabeto sin Ñ (A = 1 … Z = 26). Las letras se ven como barras de esa altura; se arrastra la barra de la que sigue y
// abajo se leen las posiciones y los saltos entre ellas.
// params = { rounds: [{ seq: ['B', 'D', …], need: 'X' }] }   state = { rounds: [{ v }] }   (v de 1 a 26)
GAMES['letras-salto'] = (() => {
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', pos = l => ABC.indexOf(l) + 1;
  return SUC.nextGame({
    prompt: () => '¿Qué letra sigue? (sin Ñ: A = 1, …, Z = 26)',
    foot: 'Arrastra la barra: su altura es la posición de la letra',
    terms: r => [...r.seq.map(pos), null],
    need: r => pos(r.need),
    range: () => [1, 26],
    fmt: v => ABC[v - 1] || '?',
    extra: G => {
      const { p, C, T } = G, b = G.b, w = b.w / T.length, y = b.y + b.h + 14;
      T.forEach((t, i) => TK.label(p, C, String(t), b.x + (i + 0.5) * w, y, C.mute, 10, w));
      T.slice(1).forEach((t, i) => { const d = t - T[i]; TK.label(p, C, `${d >= 0 ? '+' : ''}${d}`, b.x + (i + 1) * w, y + 16, C.coral, 9, w); });
    },
  });
})();
;
//#archivo js/games/figura-patron.js
// Figuras que crecen (Preuniversitario, pu-se-2; spec 2026-11-18-preuda-razonamiento-completo): cada figura es un montón de
// puntos ordenados en filas; se ven las primeras y se arrastra la que sigue hasta que tenga los puntos justos. Abajo se ve
// cuántos puntos gana cada figura.
// params = { rounds: [{ seq: [puntos de las primeras figuras], need, cols, hi }] }   state = { rounds: [{ v }] }
GAMES['figura-patron'] = SUC.nextGame({
  prompt: () => '¿Cuántos puntos tiene la figura que sigue?',
  foot: 'Arrastra la figura que falta para darle puntos',
  terms: r => [...r.seq, null],
  need: r => r.need,
  range: r => [1, r.hi],
  noBars: true,
  extra: G => {
    const { p, C, T, r } = G, b = G.b, w = b.w / T.length, y0 = G.Y(0), cols = r.cols || 3, good = !VELO.on && G.s.v === r.need;
    T.forEach((v, i) => {
      const rows = Math.ceil(v / cols), top = G.Y(v), x0 = b.x + i * w + w * 0.15, cw = w * 0.7 / cols, rh = (y0 - top) / Math.max(rows, 1), d = Math.max(3, Math.min(cw, rh) * 0.7), miss = i === G.miss;
      p.noStroke(); p.fill(miss ? (good ? C.ok : C.brand) : C.sky);
      for (let k = 0; k < v; k++) p.circle(x0 + (k % cols + 0.5) * cw, y0 - (Math.floor(k / cols) + 0.5) * rh, d);
      TK.label(p, C, `fig ${i + 1}`, b.x + (i + 0.5) * w, y0 + 14, C.mute, 9, w);
    });
    T.slice(1).forEach((t, i) => { const d = t - T[i]; TK.label(p, C, `+${d}`, b.x + (i + 1) * w, y0 + 30, C.coral, 9, w); });
  },
});
;
//#archivo js/games/ciclo-reloj.js
// La rueda de la semana (Preuniversitario, pu-se-3; spec 2026-11-18-preuda-razonamiento-completo): los días se repiten cada 7.
// Una rueda con los siete días y una flecha que sale del día de hoy: se gira la flecha hasta el día pedido. El juego cuenta
// cuántos días avanza la flecha (k) y muestra si lo que queda, n − k, son semanas completas.
// params = { rounds: [{ start: 0 (lunes) … 6, n }] }   state = { rounds: [{ d }] }   (día 0 a 6)
GAMES['ciclo-reloj'] = (() => {
  const DAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  const need = r => (r.start + r.n) % 7;
  let ok = (s, r) => s.d === need(r);
  const ang = d => -Math.PI / 2 + d * 2 * Math.PI / 7;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ d: need(r) === r.start ? (r.start + 1) % 7 : r.start }),
    ok,
    solution: r => `${r.n} = 7 · ${Math.floor(r.n / 7)} + ${r.n % 7}: ${DAYS[need(r)]}`,
    prompt: r => `Hoy es ${DAYS[r.start]}. ¿Qué día será dentro de ${r.n} días?`,
    foot: () => 'Gira la flecha hasta el día',
    layout(G) { G.R = Math.min(G.W * 0.33, 118); G.c = { x: G.W / 2, y: 92 + G.R + 10 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { d: need(r) } : G.s, good = ok(s, r), c = G.c, R = G.R, k = ((s.d - r.start) % 7 + 7) % 7, rest = r.n - k;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.circle(c.x, c.y, 2 * R);
      for (let i = 0; i < 7; i++) {
        const a = ang(i), x = c.x + R * 0.78 * Math.cos(a), y = c.y + R * 0.78 * Math.sin(a), on = i === s.d, here = i === r.start;
        p.noStroke(); p.fill(on ? (good ? C.ok : C.brand) : here ? RK.al(p, C.sky, 120) : RK.al(p, C.line, 80)); p.circle(x, y, 40);
        TK.label(p, C, DAYS[i].slice(0, 3), x, y, on ? inkOn(good ? C.ok : C.brand) : C.ink, 11, 38);
      }
      p.noFill(); p.stroke(C.coral); p.strokeWeight(2);
      if (k) p.arc(c.x, c.y, R * 0.9, R * 0.9, ang(r.start), ang(r.start + k));
      const a = ang(s.d); p.stroke(good ? C.ok : C.brand); p.strokeWeight(3); p.line(c.x, c.y, c.x + R * 0.55 * Math.cos(a), c.y + R * 0.55 * Math.sin(a));
      G.tip = { x: c.x + R * 0.55 * Math.cos(a), y: c.y + R * 0.55 * Math.sin(a) }; RK.knob(p, C, G.tip.x, G.tip.y, C.brand);
      TK.label(p, C, `avanza ${k}`, c.x, c.y + 18, C.coral, 10, 80);
      const mult = rest % 7 === 0;
      RK.strip(p, C, G.fb, `$${r.n} - ${k} = ${rest}$`, { kicker: mult ? `${rest} son ${rest / 7} semanas completas` : `${rest} no son semanas completas`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.hypot(x - G.c.x, y - G.c.y) > G.R + 16) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => { const a = ang(G.s.d + 2); return { from: G.tip || G.c, to: { x: G.c.x + G.R * 0.6 * Math.cos(a), y: G.c.y + G.R * 0.6 * Math.sin(a) }, text: 'Gira la flecha', ty: G.c.y + G.R + 22 }; },
    peek: G => ({ c: G.c, R: G.R }),
  });
  game.move = (G, x, y) => {
    if (Math.hypot(x - G.c.x, y - G.c.y) < 12) return;
    let a = Math.atan2(y - G.c.y, x - G.c.x) + Math.PI / 2; if (a < 0) a += 2 * Math.PI;
    const d = Math.round(a / (2 * Math.PI / 7)) % 7;
    if (d !== G.s.d || !G.touched[G.cur]) { G.s.d = d; G.touch(); }
  };
  return Object.assign(game, { answer: r => ({ d: need(r) }) });
})();
;
//#archivo js/games/ciclo-colores.js
// El collar que se repite (Preuniversitario, pu-se-3; spec 2026-11-18-preuda-razonamiento-completo): un collar repite siempre
// el mismo grupo de cuentas de colores. Se ven las primeras con su número; se arrastra desde la bandeja la cuenta del color que
// va en la posición pedida y se suelta en su hueco.
// params = { rounds: [{ cyc: ['coral', 'sky', …] (colores distintos de la paleta), N }] }   state = { rounds: [{ c }] }   (c: índice en cyc o −1)
GAMES['ciclo-colores'] = (() => {
  const need = r => (r.N - 1) % r.cyc.length;
  let ok = (s, r) => s.c === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ c: -1 }),
    answered: s => s.c >= 0,
    ok,
    solution: r => `${r.N} deja residuo ${r.N % r.cyc.length} al dividir entre ${r.cyc.length}: la cuenta ${need(r) + 1} del grupo`,
    prompt: r => `¿De qué color es la cuenta número ${r.N}?`,
    foot: () => 'Arrastra una cuenta de la bandeja al hueco',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; G.slot = { x: G.W / 2, y: 236 }; G.trayY = Math.max(G.H - 112, 300); },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { c: need(r) } : G.s, good = ok(s, r), k = r.cyc.length, shown = Math.min(2 * k + 1, 9), w = (G.W - 40) / shown;
      p.stroke(C.line); p.strokeWeight(1.5); p.noFill(); p.line(20, 128, G.W - 20, 128);
      for (let i = 0; i < shown; i++) { const x = 20 + (i + 0.5) * w; p.stroke(C.ink); p.strokeWeight(1); p.fill(C[r.cyc[i % k]]); p.circle(x, 128, Math.min(w * 0.7, 28)); TK.label(p, C, String(i + 1), x, 156, C.mute, 10, w); }
      TK.label(p, C, '…', G.W / 2, 190, C.mute, 16, 40);
      const sl = G.slot; p.stroke(good ? C.ok : C.brand); p.strokeWeight(2); p.fill(s.c >= 0 && G.grab < 0 ? C[r.cyc[s.c]] : RK.al(p, C.card, 120)); p.circle(sl.x, sl.y, 40);
      TK.label(p, C, `cuenta ${r.N}`, sl.x, sl.y + 34, C.ink, 12, 120);
      const tw = (G.W - 40) / k; G.tray = r.cyc.map((col, i) => ({ x: 20 + (i + 0.5) * tw, y: G.trayY, col }));
      G.tray.forEach((t, i) => { p.stroke(C.ink); p.strokeWeight(1); p.fill(C[t.col]); p.circle(t.x, t.y, 32); });
      if (G.grab >= 0) { p.stroke(C.ink); p.fill(C[r.cyc[G.grab]]); p.circle(G.gx, G.gy, 36); }
      RK.strip(p, C, G.fb, !good ? `$\\text{grupos de}\\ ${k}\\ \\text{cuentas}$` : `$${r.N} = ${k}\\cdot ${Math.floor((r.N - 1) / k)} + ${(r.N - 1) % k + 1}$`, { kicker: good ? `es la cuenta ${(r.N - 1) % k + 1} de su grupo` : '', col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const i = (G.tray || []).findIndex(t => Math.hypot(x - t.x, y - t.y) < 24); if (i < 0) return false; G.grab = i; G.gx = x; G.gy = y; return true; },
    drag(G, x, y) { if (G.grab < 0) return false; G.gx = x; G.gy = y; return true; },
    release(G) { if (G.grab < 0) return; if (Math.hypot(G.gx - G.slot.x, G.gy - G.slot.y) < 40) { G.s.c = G.grab; G.touch(); } G.grab = -1; },
    demo: G => ({ from: G.tray ? G.tray[0] : { x: 40, y: G.trayY }, to: G.slot, text: 'Arrastra al hueco', ty: G.slot.y - 34 }),
    peek: G => ({ tray: G.tray, slot: G.slot }),
  });
  return Object.assign(game, { answer: r => ({ c: need(r) }) });
})();
;
//#archivo js/games/ultima-cifra.js
// La última cifra de una potencia (Preuniversitario, pu-se-3; spec 2026-11-18-preuda-razonamiento-completo): la última cifra de
// a, a², a³… se repite en un ciclo. El juego calcula las primeras potencias y marca su última cifra; se arrastra el marcador
// de la regla 0–9 hasta la cifra en que termina aⁿ.
// params = { rounds: [{ a, n }] }   state = { rounds: [{ d }] }   (d de 0 a 9)
GAMES['ultima-cifra'] = (() => {
  const last = (a, n) => { let x = 1; for (let i = 0; i < n; i++) x = x * a % 10; return x; };
  let ok = (s, r) => s.d === last(r.a, r.n);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ d: last(r.a, r.n) === 0 ? 1 : 0 }),
    ok,
    solution: r => `$${r.a}^{${r.n}}$ termina en ${last(r.a, r.n)}`,
    prompt: r => `¿En qué cifra termina $${r.a}^{${r.n}}$?`,
    foot: () => 'Arrastra el marcador a la última cifra',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { d: last(r.a, r.n) } : G.s, good = ok(s, r), y0 = 96, rh = (G.tY - 40 - y0) / 5;
      for (let k = 1; k <= 6; k++) {
        const str = String(Math.pow(r.a, k)), y = y0 + (k - 1) * rh, tx = str.length > 9 ? '…' + str.slice(-8) : str;
        TK.label(p, C, `$${r.a}^{${k}}$`, 46, y, C.mute, 12, 60);
        TK.label(p, C, tx.length > 1 ? tx.slice(0, -1) : '', G.W * 0.48, y, C.ink, 12, G.W * 0.45);
        p.noStroke(); p.fill(RK.al(p, C.coral, 60)); p.rect(G.W * 0.8 - 13, y - 12, 26, 24, 6);
        TK.label(p, C, str.slice(-1), G.W * 0.8, y, C.ink, 14, 26);
      }
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 10, s.d, i => String(i), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, good ? `$${r.a}^{${r.n}}\\ \\text{termina en}\\ ${s.d}$` : `$\\text{¿termina en}\\ ${s.d}?$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.d), y: G.tY }, to: { x: G.X(G.s.d + 3), y: G.tY }, text: 'Arrastra el marcador', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const d = RK.pick(x, 30, G.W - 30, 10); if (d !== G.s.d || !G.touched[G.cur]) { G.s.d = d; G.touch(); } };
  return Object.assign(game, { answer: r => ({ d: last(r.a, r.n) }) });
})();
;
//#archivo js/games/clave-simbolos.js
// Clave de símbolos (Preuniversitario, pu-cd-1 y pu-cd-2; spec 2026-11-18-preuda-razonamiento-completo): cada letra se cambia
// siempre por el mismo símbolo. Arriba está la tabla de la clave (o, si hay `ex`, unos ejemplos ya cifrados de donde hay que
// sacarla); se arrastran fichas para cifrar una palabra (mode 'code') o para descifrar un mensaje (mode 'decode').
// params = { rounds: [{ key: [[letra, símbolo], …], word, mode, ex?: [[palabra, cifrada], …] }] }   state = { rounds: [{ f: [ficha | −1] }] }
GAMES['clave-simbolos'] = (() => {
  const L = r => r.key.map(k => k[0]), S = r => r.key.map(k => k[1]);
  const coded = r => [...r.word].map(c => S(r)[L(r).indexOf(c)]);
  return CODK.fillGame({
    aspect: 1.3,
    prompt: r => (r.mode === 'decode' ? 'Descifra el mensaje con la clave' : `Cifra la palabra ${r.word}`),
    tray: r => (r.mode === 'decode' ? L(r) : S(r)),
    need: r => [...r.word].map(c => L(r).indexOf(c)),
    over: (r, i) => (r.mode === 'decode' ? coded(r)[i] : r.word[i]),
    done: r => (r.mode === 'decode' ? `dice ${r.word}` : `${r.word} se cifra ${coded(r).join(' ')}`),
    decor(G) {
      const { p, C, r } = G;
      if (r.ex) {
        TK.label(p, C, 'Ejemplos de la clave:', G.W / 2, 94, C.mute, 10, G.W - 30);
        r.ex.forEach(([w, c], i) => TK.label(p, C, `${w}  →  ${c}`, G.W / 2, 118 + i * 22, C.ink, 14, G.W - 30));
        return;
      }
      const n = r.key.length, cw = Math.min(40, (G.W - 30) / n);
      const x0 = (G.W - n * cw) / 2;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(x0 - 4, 96, n * cw + 8, 74, 8);
      r.key.forEach(([l, s], i) => {
        const x = x0 + (i + 0.5) * cw;
        TK.label(p, C, l, x, 114, C.ink, 14, cw);
        TK.label(p, C, '↓', x, 133, C.mute, 10, cw);
        TK.label(p, C, s, x, 152, C.coral, 15, cw);
      });
    },
  });
})();
;
//#archivo js/games/permuta-codigo.js
// El código que reordena (Preuniversitario, pu-cd-2; spec 2026-11-18-preuda-razonamiento-completo): un código que no cambia
// las letras, solo su orden. Con los ejemplos se descubre a qué lugar va cada letra, y se arrastran las letras de la palabra
// nueva a las casillas en el orden del código.
// params = { rounds: [{ ex: [[palabra, cifrada], …] (letras distintas), word }] }   state = { rounds: [{ f: [ficha | −1] }] }
GAMES['permuta-codigo'] = (() => {
  const perm = r => { const [a, b] = r.ex[0]; return [...b].map(c => a.indexOf(c)); };
  const out = r => perm(r).map(i => r.word[i]).join('');
  const tray = r => [...new Set(r.word)].sort();
  return CODK.fillGame({
    aspect: 1.3,
    prompt: r => `¿Cómo se escribe ${r.word} en este código?`,
    foot: 'Arrastra las letras en el orden del código',
    tray,
    need: r => [...out(r)].map(c => tray(r).indexOf(c)),
    over: (r, i) => `${i + 1}`,
    done: r => `${r.word} se escribe ${out(r)}`,
    col: C => C.mint,
    decor(G) {
      const { p, C, r } = G;
      TK.label(p, C, 'Ejemplos:', G.W / 2, 94, C.mute, 10, G.W - 30);
      r.ex.forEach(([w, c], i) => TK.label(p, C, `${w}  →  ${c}`, G.W / 2, 118 + i * 24, C.ink, 15, G.W - 30));
      TK.label(p, C, `${r.word}  →  ?`, G.W / 2, 118 + r.ex.length * 24 + 8, C.brand, 15, G.W - 30);
    },
  });
})();
;
//#archivo js/games/rueda-cesar.js
// La rueda de César (Preuniversitario, pu-cd-1 y pu-cd-2; spec 2026-11-18-preuda-razonamiento-completo): dos anillos con el
// alfabeto sin Ñ. El de afuera es la letra original; el de adentro, la cifrada. Se gira el anillo de adentro hasta que la pista
// se cumpla (una letra y su cifrada, o una palabra y su cifrada) y entonces el mensaje secreto se lee solo, descifrado.
// params = { rounds: [{ pair: [original, cifrada], msg: mensaje cifrado }] }   state = { rounds: [{ k }] }   (k de 0 a 25)
GAMES['rueda-cesar'] = (() => {
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', idx = c => ABC.indexOf(c);
  const shift = r => (idx(r.pair[1][0]) - idx(r.pair[0][0]) + 26) % 26;
  const enc = (w, k) => [...w].map(c => (idx(c) < 0 ? c : ABC[(idx(c) + k) % 26])).join('');
  const dec = (w, k) => enc(w, (26 - k) % 26);
  let ok = (s, r) => s.k === shift(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: r => ({ k: shift(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => `clave +${shift(r)}: ${r.msg} dice ${dec(r.msg, shift(r))}`,
    prompt: r => `Si ${r.pair[0]} se cifra ${r.pair[1]}, ¿qué dice ${r.msg}?`,
    foot: () => 'Gira el anillo de adentro',
    layout(G) { G.R = Math.min(G.W * 0.42, 150); G.c = { x: G.W / 2, y: 100 + G.R }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: shift(r) } : G.s, good = ok(s, r), c = G.c, R = G.R, step = 2 * Math.PI / 26;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.circle(c.x, c.y, 2 * R);
      p.fill(RK.al(p, C.sky, 40)); p.circle(c.x, c.y, 2 * R * 0.72);
      const hot = new Set([...r.pair[0]].map(idx));
      for (let i = 0; i < 26; i++) {
        const a = -Math.PI / 2 + i * step;
        TK.label(p, C, ABC[i], c.x + R * 0.86 * Math.cos(a), c.y + R * 0.86 * Math.sin(a), hot.has(i) ? C.brand : C.ink, 11, 14);
        TK.label(p, C, ABC[(i + s.k) % 26], c.x + R * 0.6 * Math.cos(a), c.y + R * 0.6 * Math.sin(a), hot.has(i) ? C.coral : C.mute, 10, 14);
      }
      const a0 = -Math.PI / 2; p.stroke(C.brand); p.strokeWeight(2); p.line(c.x + R * 0.68 * Math.cos(a0), c.y + R * 0.68 * Math.sin(a0), c.x + R * 0.78 * Math.cos(a0), c.y + R * 0.78 * Math.sin(a0));
      const now = enc(r.pair[0], s.k), match = now === r.pair[1];
      TK.label(p, C, `${r.pair[0]} → ${now}`, c.x, c.y - 12, match && !VELO.on ? C.ok : C.ink, 13, R);
      TK.label(p, C, `clave +${s.k}`, c.x, c.y + 12, C.mute, 10, R);
      RK.strip(p, C, G.fb, `$\\text{${r.msg} → ${dec(r.msg, s.k)}}$`, { kicker: good ? 'mensaje descifrado' : 'el mensaje con esta clave', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const d = Math.hypot(x - G.c.x, y - G.c.y); if (d > G.R + 10) return false; G.grab = true; G.prevA = Math.atan2(y - G.c.y, x - G.c.x); G.acc = 0; return true; },
    drag(G, x, y) {
      if (!G.grab) return false;
      const a = Math.atan2(y - G.c.y, x - G.c.x); let d = a - G.prevA; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; G.prevA = a;
      G.acc += d / (2 * Math.PI / 26); const st = Math.trunc(G.acc);
      if (st) { G.acc -= st; G.s.k = ((G.s.k - st) % 26 + 26) % 26; G.touch(); }
      return true;
    },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.c.x + G.R * 0.6, y: G.c.y }, to: { x: G.c.x, y: G.c.y + G.R * 0.6 }, text: 'Gira el anillo', ty: G.c.y + G.R + 18 }),
    peek: G => ({ c: G.c, R: G.R }),
  });
  return Object.assign(game, { answer: r => ({ k: shift(r) }) });
})();
;
//#archivo js/games/altura-letras.js
// Las letras valen su lugar (Preuniversitario, pu-cd-1; spec 2026-11-18-preuda-razonamiento-completo): en el código A = 1,
// B = 2, …, Z = 26 (sin Ñ) cada letra de la palabra es una columna. A la izquierda está la regla del alfabeto; se arrastra cada
// columna hasta la altura de su letra y el juego suma lo que vale la palabra.
// params = { rounds: [{ word }] }   state = { rounds: [{ h: [altura por letra] }] }   (de 1 a 26)
GAMES['altura-letras'] = (() => {
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', pos = c => ABC.indexOf(c) + 1;
  const need = r => [...r.word].map(pos);
  let ok = (s, r) => need(r).every((v, i) => s.h[i] === v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ h: need(r).map(v => (v === 1 ? 2 : 1)) }),
    ok,
    solution: r => `${r.word} = ${need(r).join(' + ')} = ${need(r).reduce((a, b) => a + b, 0)}`,
    prompt: r => `¿Cuánto vale ${r.word}? (A = 1, …, Z = 26, sin Ñ)`,
    foot: () => 'Sube cada columna hasta la altura de su letra',
    layout(G) { G.b = { x: 46, y: 96, w: G.W - 62, h: G.H - 230 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { h: need(r) } : G.s, good = ok(s, r), b = G.b, n = r.word.length, w = b.w / n, Y = v => b.y + b.h - v / 26 * b.h;
      G.Y = Y;
      for (let v = 1; v <= 26; v++) {
        const y = Y(v), major = v % 5 === 0 || v === 1;
        p.stroke(RK.al(p, C.line, major ? 160 : 60)); p.strokeWeight(1); p.line(b.x, y, b.x + b.w, y);
        if (major || v === 26) TK.label(p, C, `${ABC[v - 1]} ${v}`, 24, y, C.mute, 8, 40);
      }
      G.cols = [...r.word].map((ch, i) => {
        const v = s.h[i], x = b.x + i * w + w * 0.2, cw = w * 0.6, right = v === pos(ch);
        p.noStroke(); p.fill(right && good ? C.ok : C.sky); p.rect(x, Y(v), cw, b.y + b.h - Y(v), 3);
        TK.label(p, C, ABC[v - 1], x + cw / 2, Y(v) - 10, C.ink, 11, cw);
        TK.label(p, C, ch, x + cw / 2, b.y + b.h + 14, C.brand, 14, cw);
        TK.label(p, C, String(v), x + cw / 2, b.y + b.h + 32, C.mute, 10, cw);
        return { x: x + cw / 2, y: Y(v) };
      });
      const sum = s.h.reduce((a, c) => a + c, 0);
      RK.strip(p, C, G.fb, `$${s.h.join(' + ')} = ${sum}$`, { kicker: good ? `${r.word} vale ${sum}` : 'lo que vale con estas alturas', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const n = G.r.word.length, w = G.b.w / n, i = Math.floor((x - G.b.x) / w); if (i < 0 || i >= n || y < G.b.y - 20 || y > G.b.y + G.b.h + 10) return false; G.grab = i; game.move(G, y); return true; },
    drag(G, x, y) { if (G.grab < 0) return false; game.move(G, y); return true; },
    release(G) { G.grab = -1; },
    demo: G => (G.cols ? { from: G.cols[0], to: { x: G.cols[0].x, y: G.cols[0].y - 60 }, text: 'Sube la columna', ty: G.b.y + 10 } : null),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, y) => { const b = G.b, v = Math.max(1, Math.min(26, Math.round((b.y + b.h - y) / b.h * 26))); if (v !== G.s.h[G.grab] || !G.touched[G.cur]) { G.s.h[G.grab] = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ h: need(r) }) });
})();
;
//#archivo js/games/binario-luces.js
// Las luces del código binario (Preuniversitario, pu-cd-1; spec 2026-11-18-preuda-razonamiento-completo): una fila de bombillos
// que valen 16, 8, 4, 2 y 1 (cada uno el doble del de su derecha). Se tocan los bombillos para prenderlos o apagarlos hasta
// que lo que suman los prendidos sea el número pedido; abajo se lee el código de unos y ceros.
// params = { rounds: [{ n, bits }] }   state = { rounds: [{ on: [0 | 1 por bombillo] }] }
GAMES['binario-luces'] = (() => {
  const val = (on) => on.reduce((a, b) => a * 2 + b, 0);
  let ok = (s, r) => val(s.on) === r.n;
  const bitsOf = r => Array.from({ length: r.bits }, (_, i) => (r.n >> (r.bits - 1 - i)) & 1);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ on: Array(r.bits).fill(0) }),
    answered: s => s.on.some(Boolean),
    ok,
    solution: r => `${r.n} = ${bitsOf(r).join('')}`,
    prompt: r => `Prende los bombillos que suman ${r.n}`,
    foot: () => 'Toca un bombillo para prenderlo o apagarlo',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { on: bitsOf(r) } : G.s, good = ok(s, r), n = r.bits, w = (G.W - 30) / n, y = 170, d = Math.min(w * 0.7, 52);
      G.bulbs = s.on.map((b, i) => {
        const x = 15 + (i + 0.5) * w, v = 2 ** (n - 1 - i);
        if (b) { p.noStroke(); p.fill(RK.al(p, C.sun, 70)); p.circle(x, y, d * 1.5); }
        p.stroke(C.ink); p.strokeWeight(1.4); p.fill(b ? C.sun : RK.al(p, C.card, 200)); p.circle(x, y, d);
        p.noStroke(); p.fill(C.mute); p.rect(x - d * 0.18, y + d / 2 - 2, d * 0.36, 10, 2);
        TK.label(p, C, String(v), x, y - d / 2 - 14, C.mute, 11, w);
        TK.label(p, C, String(b), x, y + d / 2 + 26, b ? C.ink : C.mute, 16, w);
        return { x, y, d };
      });
      const parts = s.on.map((b, i) => (b ? 2 ** (n - 1 - i) : 0)).filter(Boolean);
      RK.strip(p, C, G.fb, `$${parts.length ? parts.join(' + ') : '0'} = ${val(s.on)}$`, { kicker: `código ${s.on.join('')}`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const i = (G.bulbs || []).findIndex(b => Math.hypot(x - b.x, y - b.y) < b.d / 2 + 8); if (i < 0) return false; G.s.on[i] = 1 - G.s.on[i]; G.touch(); return true; },
    demo: G => (G.bulbs ? { from: G.bulbs[0], to: G.bulbs[0], text: 'Toca un bombillo', ty: G.bulbs[0].y + 70 } : null),
    peek: G => ({ bulbs: G.bulbs }),
  });
  return Object.assign(game, { answer: r => ({ on: bitsOf(r) }) });
})();
;
//#archivo js/games/maquina-regla.js
// La máquina de la regla (Preuniversitario, pu-cd-2; spec 2026-11-18-preuda-razonamiento-completo): una máquina convierte
// números según una regla escondida. Se arrastra una ficha de regla a la máquina (y, si lleva número, se desliza ese número);
// la máquina prueba la regla con todos los ejemplos y marca cuáles cumple. La regla buena tiene que servir para todos; entonces
// la máquina dice qué sale con el número nuevo.
// params = { rounds: [{ ex: [[entra, sale], …], ask, op, k? }] }   state = { rounds: [{ op: índice | −1, k }] }   (k de 0 a 12)
GAMES['maquina-regla'] = (() => {
  const OPS = [
    { id: 'add', lab: '+ k', f: (x, k) => x + k, k: true },
    { id: 'sub', lab: '− k', f: (x, k) => x - k, k: true },
    { id: 'mul', lab: '× k', f: (x, k) => x * k, k: true },
    { id: 'dsum', lab: 'suma cifras', f: x => [...String(x)].reduce((a, c) => a + +c, 0) },
    { id: 'dmul', lab: 'multiplica cifras', f: x => [...String(x)].reduce((a, c) => a * +c, 1) },
    { id: 'rev', lab: 'al revés', f: x => +[...String(x)].reverse().join('') },
  ];
  const run = (s, x) => (s.op < 0 ? null : OPS[s.op].f(x, s.k));
  let ok = (s, r) => s.op >= 0 && r.ex.every(([a, b]) => run(s, a) === b);
  const answer = r => ({ op: OPS.findIndex(o => o.id === r.op), k: r.k ?? 0 });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.4,
    init: () => ({ op: -1, k: 0 }),
    answered: s => s.op >= 0,
    ok,
    solution: r => { const s = answer(r), o = OPS[s.op]; return `regla «${o.k ? o.lab.replace('k', s.k) : o.lab}»: ${r.ask} → ${run(s, r.ask)}`; },
    prompt: () => 'Descubre la regla de la máquina',
    foot: (r, s) => (s.op >= 0 && OPS[s.op].k ? 'Desliza el número de la regla' : 'Arrastra una regla a la máquina'),
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; G.tY = G.H - 96; },
    enter(G) { G.drag = null; G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
      const mx = 16, mw = G.W - 32, my = 92, rowH = 24;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 210)); p.rect(mx, my, mw, (r.ex.length + 1) * rowH + 44, 10);
      G.mbox = { x: G.W / 2 - 70, y: my + 6, w: 140, h: 30 };
      p.stroke(good ? C.ok : C.brand); p.strokeWeight(1.5); p.fill(RK.al(p, good ? C.ok : C.brand, 40)); p.rect(G.mbox.x, G.mbox.y, G.mbox.w, G.mbox.h, 8);
      const o = s.op >= 0 ? OPS[s.op] : null;
      TK.label(p, C, o ? (o.k ? o.lab.replace('k', s.k) : o.lab) : 'regla: ?', G.W / 2, my + 21, C.ink, 13, 136);
      const rows = [...r.ex.map(e => [e[0], e[1]]), [r.ask, null]];
      rows.forEach(([a, b], i) => {
        const y = my + 50 + i * rowH, got = run(s, a), hit = b != null && got === b;
        TK.label(p, C, String(a), G.W * 0.2, y, C.ink, 13, 60);
        TK.label(p, C, '→', G.W * 0.36, y, C.mute, 12, 20);
        TK.label(p, C, got == null ? '?' : String(got), G.W * 0.52, y, b == null ? (good ? C.ok : C.brand) : hit && !VELO.on ? C.ok : C.bad, 13, 70);
        TK.label(p, C, b == null ? 'nuevo' : `debe dar ${b}`, G.W * 0.78, y, C.mute, 10, G.W * 0.36);
      });
      const per = 3, tw = (G.W - 32) / per - 6, ty0 = my + (r.ex.length + 1) * rowH + 56;
      G.chips = OPS.map((op, i) => ({ x: 16 + (i % per) * (tw + 6), y: ty0 + Math.floor(i / per) * 40, w: tw, h: 32, i }));
      G.chips.forEach(b => RK.chip(p, C, b, OPS[b.i].lab, { on: b.i === s.op, col: C.sky, size: 11 }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - tw / 2, y: G.drag.y - 16, w: tw, h: 32 }, OPS[G.drag.i].lab, { on: true, col: C.brand, size: 11 });
      if (o?.k) G.X = RK.track(p, C, 30, G.W - 30, G.tY, 13, s.k, i => (i % 2 === 0 ? String(i) : null), C.brand);
      else G.X = null;
      RK.strip(p, C, G.fb, good ? `$${r.ask} \\to ${run(s, r.ask)}$` : '$\\text{la regla debe servir para todos}$', { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const c = (G.chips || []).find(b => hitBox(b, x, y));
      if (c) { G.drag = { i: c.i, x, y }; return true; }
      if (G.X && Math.abs(y - G.tY) < 26) { G.grab = true; game.move(G, x); return true; }
      return false;
    },
    drag(G, x, y) { if (G.drag) { G.drag.x = x; G.drag.y = y; return true; } if (G.grab) { game.move(G, x); return true; } return false; },
    release(G, x, y) {
      if (G.drag) { const m = G.mbox; if (hitBox({ x: m.x - 20, y: m.y - 20, w: m.w + 40, h: m.h + 60 }, x, y)) { G.s.op = G.drag.i; G.touch(); } G.drag = null; }
      G.grab = false;
    },
    demo: G => { if (!G.chips || !G.mbox) return null; const c = G.chips[answer(G.r).op === 0 ? 1 : 0]; return { from: { x: c.x + c.w / 2, y: c.y + 16 }, to: { x: G.mbox.x + 70, y: G.mbox.y + 15 }, text: 'Arrastra una regla', ty: c.y + 52 }; },
    peek: G => ({ chips: G.chips, mbox: G.mbox, tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 30, G.W - 30, 13); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/circuito-logico.js
// El circuito lógico (Preuniversitario, pu-lo-1 a pu-lo-3; spec 2026-11-18-preuda-razonamiento-completo): dos interruptores p y
// q. En serie el bombillo prende solo si los dos están cerrados (p ∧ q); en paralelo, si alguno lo está (p ∨ q). Un interruptor
// marcado con ¬ funciona al revés (cerrado cuando su letra es falsa), y un inversor antes del bombillo niega todo. Se tocan los
// interruptores hasta que el bombillo quede como se pide.
// params = { rounds: [{ op: 'and' | 'or', neg?: [bool, bool], out?: bool, want: bool, fix?: { p?: bool, q?: bool } }] }
// state = { rounds: [{ v: [p, q] }] }
GAMES['circuito-logico'] = (() => {
  const val = (r, v) => { const a = r.neg?.[0] ? !v[0] : v[0], b = r.neg?.[1] ? !v[1] : v[1], x = r.op === 'and' ? a && b : a || b; return r.out ? !x : x; };
  const fixed = r => ['p', 'q'].map(k => r.fix?.[k]);
  let ok = (s, r) => val(r, s.v) === r.want && fixed(r).every((f, i) => f === undefined || s.v[i] === f);
  const sols = r => [[false, false], [false, true], [true, false], [true, true]].filter(v => ok({ v }, r));
  const tex = r => { const a = r.neg?.[0] ? '\\neg p' : 'p', b = r.neg?.[1] ? '\\neg q' : 'q', x = `${a} ${r.op === 'and' ? '\\wedge' : '\\vee'} ${b}`; return r.out ? `\\neg(${x})` : x; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => { const f = fixed(r), v = [f[0] ?? false, f[1] ?? false]; if (ok({ v }, r)) { const i = f[1] === undefined ? 1 : 0; v[i] = !v[i]; } return { v }; },
    ok,
    solution: r => { const v = sols(r)[0]; return `p ${v[0] ? 'V' : 'F'}, q ${v[1] ? 'V' : 'F'}`; },
    prompt: r => `${r.want ? 'Prende' : 'Apaga'} el bombillo: $${tex(r)}$`,
    foot: () => 'Toca los interruptores para abrirlos o cerrarlos',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: sols(r)[0] } : G.s, good = ok(s, r), lit = val(r, s.v), W = G.W;
      const x0 = 30, x1 = W - 30, yT = 120, yB = 290, mid = (yT + yB) / 2;
      const wire = on => { p.stroke(on ? C.sun : C.line); p.strokeWeight(on ? 3 : 2); };
      wire(lit); p.noFill();
      p.line(x0, yT, x0, yB); p.line(x0, yB, x1, yB); p.line(x1, yB, x1, yT);
      p.noStroke(); p.fill(C.mute); p.rect(x0 - 10, mid - 18, 20, 36, 4); TK.label(p, C, '+', x0, mid - 8, inkOn(C.mute), 10, 16);
      const sw = (i, x, y) => {
        const on = r.neg?.[i] ? !s.v[i] : s.v[i], fx = fixed(r)[i] !== undefined;
        p.stroke(on ? C.sun : C.ink); p.strokeWeight(3); p.line(x - 22, y, x - 12, y); p.line(x + 12, y, x + 22, y);
        if (on) p.line(x - 12, y, x + 12, y); else p.line(x - 12, y, x + 8, y - 16);
        p.noStroke(); p.fill(C.ink); p.circle(x - 12, y, 6); p.circle(x + 12, y, 6);
        TK.label(p, C, `$${r.neg?.[i] ? '\\neg ' : ''}${'pq'[i]}$`, x, y - 26, fx ? C.mute : C.brand, 13, 50);
        TK.label(p, C, s.v[i] ? `${'pq'[i]} = V` : `${'pq'[i]} = F`, x, y + 20, fx ? C.mute : C.ink, 10, 60);
        return { x, y, i, fx };
      };
      if (r.op === 'and') {
        const xa = x0 + (x1 - x0) * 0.3, xb = x0 + (x1 - x0) * 0.62;
        wire(lit); p.line(x0, yT, xa - 22, yT); p.line(xa + 22, yT, xb - 22, yT); p.line(xb + 22, yT, x1, yT);
        G.sw = [sw(0, xa, yT), sw(1, xb, yT)];
      } else {
        const xs = x0 + (x1 - x0) * 0.42, ya = yT - 10, yb = yT + 60, xl = xs - 50, xr = xs + 50;
        wire(lit); p.line(x0, yT, xl, yT); p.line(xl, ya, xl, yb); p.line(xr, ya, xr, yb); p.line(xr, yT, x1, yT);
        p.line(xl, ya, xs - 22, ya); p.line(xs + 22, ya, xr, ya); p.line(xl, yb, xs - 22, yb); p.line(xs + 22, yb, xr, yb);
        G.sw = [sw(0, xs, ya), sw(1, xs, yb)];
      }
      if (r.out) { const xi = x1 - 40; p.stroke(C.ink); p.strokeWeight(1.5); p.fill(C.card); p.rect(xi - 16, yT - 12, 32, 24, 5); TK.label(p, C, '$\\neg$', xi, yT, C.ink, 13, 30); }
      const bx = (x0 + x1) / 2;
      if (lit) { p.noStroke(); p.fill(RK.al(p, C.sun, 70)); p.circle(bx, yB, 64); }
      p.stroke(C.ink); p.strokeWeight(1.5); p.fill(lit ? C.sun : C.card); p.circle(bx, yB, 34);
      RK.strip(p, C, G.fb, `$${tex(r)} = ${lit ? 'V' : 'F'}$`, { kicker: lit ? 'el bombillo prende' : 'el bombillo está apagado', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const w = (G.sw || []).find(o => Math.hypot(x - o.x, y - o.y) < 30); if (!w) return false; if (!w.fx) { G.s.v[w.i] = !G.s.v[w.i]; G.touch(); } return true; },
    demo: G => { const w = G.sw?.find(o => !o.fx); return w ? { from: w, to: w, text: 'Toca el interruptor', ty: w.y + 42 } : null; },
    peek: G => ({ sw: G.sw }),
  });
  return Object.assign(game, { answer: r => ({ v: sols(r)[0] }) });
})();
;
//#archivo js/games/tabla-verdad.js
// La tabla de verdad (Preuniversitario, pu-lo-1 a pu-lo-3; spec 2026-11-18-preuda-razonamiento-completo): todas las
// combinaciones de p y q (o de p, q y r) en filas, y la columna de la fórmula vacía. Se toca cada casilla para ponerle V o F.
// Si hay `given`, una columna ya hecha sirve de comparación (para ver que dos fórmulas son equivalentes).
// params = { rounds: [{ tex, f(p, q, r) → bool, n: 2 | 3, given?: { tex, f } }] }   state = { rounds: [{ c: [null | true | false por fila] }] }
GAMES['tabla-verdad'] = (() => {
  const rows = r => Array.from({ length: 2 ** r.n }, (_, k) => Array.from({ length: r.n }, (_, j) => !((k >> (r.n - 1 - j)) & 1)));
  const need = r => rows(r).map(v => !!r.f(...v));
  let ok = (s, r) => need(r).every((v, i) => s.c[i] === v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: r => ({ c: rows(r).map(() => null) }),
    answered: s => s.c.some(v => v !== null),
    ok,
    solution: r => need(r).map(v => (v ? 'V' : 'F')).join(' '),
    prompt: r => `Llena la tabla de $${r.tex}$`,
    foot: () => 'Toca cada casilla: V, F, V…',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { c: need(r) } : G.s, good = ok(s, r), R = rows(r), nc = r.n + (r.given ? 2 : 1);
      const cw = Math.min(70, (G.W - 30) / nc), x0 = (G.W - nc * cw) / 2, rh = Math.min(34, (G.H - 220) / (R.length + 1)), y0 = 96;
      const head = ['p', 'q', 'r'].slice(0, r.n).concat(r.given ? [r.given.tex] : [], [r.tex]);
      head.forEach((h, j) => { const last = j === nc - 1; p.noStroke(); p.fill(RK.al(p, last ? C.brand : C.line, last ? 60 : 90)); p.rect(x0 + j * cw + 1, y0, cw - 2, rh - 2, 4); TK.label(p, C, `$${h}$`, x0 + (j + 0.5) * cw, y0 + rh / 2, C.ink, 12, cw - 4); });
      G.cells = R.map((v, i) => {
        const y = y0 + (i + 1) * rh;
        v.forEach((b, j) => TK.label(p, C, b ? 'V' : 'F', x0 + (j + 0.5) * cw, y + rh / 2, b ? C.ok : C.bad, 12, cw));
        if (r.given) { const g = !!r.given.f(...v); TK.label(p, C, g ? 'V' : 'F', x0 + (r.n + 0.5) * cw, y + rh / 2, C.mute, 12, cw); }
        const x = x0 + (nc - 1) * cw, c = s.c[i];
        p.stroke(C.line); p.strokeWeight(1); p.fill(c === null ? RK.al(p, C.card, 200) : RK.al(p, c ? C.ok : C.bad, 70)); p.rect(x + 3, y + 2, cw - 6, rh - 4, 6);
        TK.label(p, C, c === null ? '?' : c ? 'V' : 'F', x + cw / 2, y + rh / 2, C.ink, 13, cw);
        return { x: x + 3, y: y + 2, w: cw - 6, h: rh - 4, i };
      });
      const done = s.c.filter(v => v !== null).length;
      RK.strip(p, C, G.fb, good ? '$\\text{tabla completa y correcta}$' : `$\\text{${done} de ${R.length} filas}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false; const v = G.s.c[c.i]; G.s.c[c.i] = v === null ? true : v ? false : true; G.touch(); return true; },
    demo: G => (G.cells ? { from: { x: G.cells[0].x + G.cells[0].w / 2, y: G.cells[0].y + 12 }, to: { x: G.cells[0].x + G.cells[0].w / 2, y: G.cells[0].y + 12 }, text: 'Toca la casilla', ty: G.cells.at(-1).y + 50 } : null),
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ c: need(r) }) });
})();
;
//#archivo js/games/arma-negacion.js
// Arma la frase (Preuniversitario, pu-lo-2 y pu-lo-3; spec 2026-11-18-preuda-razonamiento-completo): arriba está una frase o una
// fórmula y lo que se pide de ella (su negación, su contrarrecíproco…). Se arrastran fichas a las casillas para escribirla; las
// fichas pueden ser símbolos ($\neg p$, $\wedge$) o palabras («algún», «no»). Sobran fichas para que no se arme sola.
// params = { rounds: [{ ask, show, tray: [fichas], need: [índice de ficha por casilla] }] }   state = { rounds: [{ f: [ficha | −1] }] }
GAMES['arma-negacion'] = CODK.fillGame({
  aspect: 1.5,
  chipW: 66,
  perRow: 4,
  prompt: r => r.ask,
  foot: 'Arrastra las fichas a las casillas',
  tray: r => r.tray,
  need: r => r.need,
  alt: r => r.alt,
  done: () => 'bien escrita',
  col: C => C.mint,
  decor(G) {
    const { p, C, r } = G;
    p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(20, 110, G.W - 40, 56, 10);
    TK.label(p, C, r.show, G.W / 2, 138, C.ink, 15, G.W - 56);
  },
});
;
//#archivo js/games/flecha-deduce.js
// ¿Qué se puede concluir? (Preuniversitario, pu-lo-3; spec 2026-11-18-preuda-razonamiento-completo): una regla «si p, entonces
// q» es una flecha entre dos focos. Un dato enciende o apaga uno de ellos; el otro foco se toca para ponerle «sí», «no» o «no se
// sabe». Modus ponens y tollens permiten concluir; afirmar el consecuente o negar el antecedente no.
// params = { rounds: [{ p, q, fact: ['p' | 'q', bool] }] }   state = { rounds: [{ v: null | 'si' | 'no' | 'nose' }] }
GAMES['flecha-deduce'] = (() => {
  const need = r => { const [k, b] = r.fact; return k === 'p' ? (b ? 'si' : 'nose') : (b ? 'nose' : 'no'); };
  const NAME = { si: 'sí', no: 'no', nose: 'no se sabe' };
  let ok = (s, r) => s.v === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ v: null }),
    answered: s => s.v !== null,
    ok,
    solution: r => `${r.fact[0] === 'p' ? r.q : r.p}: ${NAME[need(r)]}`,
    prompt: r => `Regla: si ${r.p}, entonces ${r.q}`,
    foot: () => 'Toca el foco que no tiene dato: sí, no o no se sabe',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: need(r) } : G.s, good = ok(s, r), y = 190, xs = [G.W * 0.24, G.W * 0.76], R = Math.min(42, G.W * 0.12);
      p.stroke(C.ink); p.strokeWeight(2.5); p.line(xs[0] + R + 6, y, xs[1] - R - 12, y); p.noStroke(); p.fill(C.ink); p.triangle(xs[1] - R - 4, y, xs[1] - R - 16, y - 7, xs[1] - R - 16, y + 7);
      G.lamps = ['p', 'q'].map((k, i) => {
        const isFact = r.fact[0] === k, st = isFact ? (r.fact[1] ? 'si' : 'no') : s.v, x = xs[i];
        if (st === 'si') { p.noStroke(); p.fill(RK.al(p, C.sun, 70)); p.circle(x, y, R * 2.8); }
        p.stroke(isFact ? C.ink : good ? C.ok : C.brand); p.strokeWeight(isFact ? 1.4 : 2.5);
        p.fill(st === 'si' ? C.sun : st === 'no' ? RK.al(p, C.line, 200) : RK.al(p, C.card, 200)); p.circle(x, y, R * 2);
        TK.label(p, C, st === null ? '?' : st === 'nose' ? '¿?' : NAME[st], x, y, st === 'si' ? inkOn(C.sun) : C.ink, 12, R * 1.8);
        TK.label(p, C, r[k], x, y + R + 18, C.ink, 10, G.W * 0.44);
        TK.label(p, C, isFact ? 'dato' : 'conclusión', x, y - R - 14, isFact ? C.mute : C.brand, 9, 90);
        return { x, y, R, isFact };
      });
      RK.strip(p, C, G.fb, s.v === null ? '$\\text{¿qué se concluye?}$' : `$\\text{${NAME[s.v]}}$`, { kicker: good ? (s.v === 'nose' ? 'el dato no alcanza' : 'se concluye') : '', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const l = (G.lamps || []).find(o => !o.isFact && Math.hypot(x - o.x, y - o.y) < o.R + 10); if (!l) return false; const order = [null, 'si', 'no', 'nose']; G.s.v = order[(order.indexOf(G.s.v) + 1) % 4] || 'si'; G.touch(); return true; },
    demo: G => { const l = G.lamps?.find(o => !o.isFact); return l ? { from: l, to: l, text: 'Toca el foco', ty: l.y + l.R + 40 } : null; },
    peek: G => ({ lamps: G.lamps }),
  });
  return Object.assign(game, { answer: r => ({ v: need(r) }) });
})();
;
//#archivo js/games/arma-silogismo.js
// Los círculos del silogismo (Preuniversitario, pu-lo-4; spec 2026-11-18-preuda-razonamiento-completo): cada premisa se dibuja
// con círculos: «todos los A son B» pone A dentro de B, «ningún A es B» los separa y «algunos A son B» los cruza sin que uno
// quede dentro del otro. Se arrastran los círculos hasta cumplir todas las premisas; cada una se marca al cumplirse. Lo que
// queda dibujado muestra qué conclusión sale.
// params = { rounds: [{ sets: [{ k, name, r }], rels: [[k1, k2, 'sub' | 'disj' | 'cross']], sol: { k: [x, y] } }] }   (unidades: lienzo de 10 × 6)
// state = { rounds: [{ pos: { k: [x, y] } }] }
GAMES['arma-silogismo'] = (() => {
  const rel = (s, r, [a, b, t]) => {
    const A = r.sets.find(z => z.k === a), B = r.sets.find(z => z.k === b), [xa, ya] = s.pos[a], [xb, yb] = s.pos[b], d = Math.hypot(xa - xb, ya - yb);
    if (t === 'sub') return d + A.r <= B.r + 1e-9;
    if (t === 'disj') return d >= A.r + B.r - 1e-9;
    return d < A.r + B.r && d + Math.min(A.r, B.r) > Math.max(A.r, B.r);
  };
  let ok = (s, r) => r.rels.every(x => rel(s, r, x));
  const SAY = { sub: (a, b) => `todos los ${a} son ${b}`, disj: (a, b) => `ningún ${a} es ${b}`, cross: (a, b) => `algunos ${a} son ${b}` };
  const start = r => { const pos = {}; r.sets.forEach((z, i) => { pos[z.k] = [1.6 + i * 3.4, 3]; }); return pos; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ pos: start(r) }),
    answered: (s, r) => JSON.stringify(s.pos) !== JSON.stringify(start(r)),
    ok,
    solution: r => r.rels.map(([a, b, t]) => SAY[t](r.sets.find(z => z.k === a).name, r.sets.find(z => z.k === b).name)).join('; '),
    prompt: () => 'Dibuja las premisas con los círculos',
    foot: () => 'Arrastra los círculos',
    layout(G) { G.u = (G.W - 20) / 10; G.o = { x: 10, y: 150 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { pos: r.sol } : G.s, good = ok(s, r), u = G.u, o = G.o, cols = [C.sky, C.coral, C.mint];
      r.rels.forEach((x, i) => { const hit = rel(s, r, x); TK.label(p, C, `${VELO.on ? '·' : hit ? '✓' : '·'} ${SAY[x[2]](r.sets.find(z => z.k === x[0]).name, r.sets.find(z => z.k === x[1]).name)}`, G.W / 2, 96 + i * 18, hit && !VELO.on ? C.ok : C.ink, 11, G.W - 24); });
      p.stroke(C.line); p.strokeWeight(1); p.noFill(); p.rect(o.x, o.y, 10 * u, 6 * u, 10);
      r.sets.forEach((z, i) => {
        const [x, y] = s.pos[z.k], cx = o.x + x * u, cy = o.y + y * u;
        p.stroke(cols[i % 3]); p.strokeWeight(2); p.fill(RK.al(p, cols[i % 3], 40)); p.circle(cx, cy, 2 * z.r * u);
        TK.label(p, C, z.name, cx, cy - z.r * u + 12, C.ink, 10, z.r * u * 1.6);
      });
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{acomoda los círculos}$' : good ? '$\\text{todas las premisas dibujadas}$' : `$\\text{${r.rels.filter(x => rel(s, r, x)).length} de ${r.rels.length} premisas}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) {
      const u = G.u, o = G.o, list = G.r.sets.slice().sort((a, b) => a.r - b.r);
      const z = list.find(z => { const [px, py] = G.s.pos[z.k]; return Math.hypot(x - (o.x + px * u), y - (o.y + py * u)) < z.r * u; });
      if (!z) return false; const [px, py] = G.s.pos[z.k]; G.grab = { k: z.k, dx: (x - o.x) / u - px, dy: (y - o.y) / u - py }; return true;
    },
    drag(G, x, y) {
      if (!G.grab) return false;
      const u = G.u, o = G.o, z = G.r.sets.find(q => q.k === G.grab.k), nx = Math.max(z.r * 0.5, Math.min(10 - z.r * 0.5, Math.round(((x - o.x) / u - G.grab.dx) * 4) / 4)), ny = Math.max(z.r * 0.5, Math.min(6 - z.r * 0.5, Math.round(((y - o.y) / u - G.grab.dy) * 4) / 4));
      const c = G.s.pos[z.k]; if (c[0] !== nx || c[1] !== ny) { G.s.pos[z.k] = [nx, ny]; G.touch(); }
      return true;
    },
    release(G) { G.grab = null; },
    demo: G => { const z = G.r.sets[0], [x, y] = G.s.pos[z.k]; const a = { x: G.o.x + x * G.u, y: G.o.y + y * G.u }; return { from: a, to: { x: a.x + 2.5 * G.u, y: a.y }, text: 'Arrastra un círculo', ty: G.o.y + 6 * G.u + 16 }; },
    peek: G => ({ u: G.u, o: G.o }),
  });
  return Object.assign(game, { answer: r => ({ pos: r.sol }) });
})();
;
//#archivo js/games/quien-miente.js
// ¿Quién miente? (Preuniversitario, pu-lo-5; spec 2026-11-18-preuda-razonamiento-completo): cada personaje dice algo. Se toca
// a cada uno para suponer si dice la verdad o miente; el juego revisa cada frase con esa suposición y marca en rojo las que no
// cuadran (un sincero que dice algo falso, o un mentiroso que dice algo verdadero). La suposición buena no choca con nada.
// params = { rounds: [{ people: [{ name, say, f(T) → bool }], cond?(T) → bool, condSay? }] }   (T[i]: true si i dice la verdad)
// state = { rounds: [{ T: [null | true | false] }] }
GAMES['quien-miente'] = (() => {
  const fits = (r, T) => T.every(t => t !== null) && r.people.every((q, i) => !!q.f(T) === T[i]) && (!r.cond || r.cond(T));
  const sols = r => { const n = r.people.length, out = []; for (let m = 0; m < 2 ** n; m++) { const T = Array.from({ length: n }, (_, i) => !!((m >> i) & 1)); if (fits(r, T)) out.push(T); } return out; };
  let ok = (s, r) => fits(r, s.T);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ T: r.people.map(() => null) }),
    answered: s => s.T.some(t => t !== null),
    ok,
    solution: r => sols(r)[0].map((t, i) => `${r.people[i].name} ${t ? 'dice la verdad' : 'miente'}`).join(', '),
    prompt: r => r.condSay || '¿Quién dice la verdad y quién miente?',
    foot: () => 'Toca a cada uno: verdad o mentira',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { T: sols(r)[0] } : G.s, good = ok(s, r), n = r.people.length, all = s.T.every(t => t !== null), rh = Math.min(72, (G.H - 200) / n);
      G.cards = r.people.map((q, i) => {
        const y = 96 + i * rh, t = s.T[i], said = all ? !!q.f(s.T) : null, clash = all && said !== t;
        p.stroke(clash ? C.bad : C.line); p.strokeWeight(clash ? 2 : 1); p.fill(RK.al(p, C.card, 210)); p.rect(16, y, G.W - 32, rh - 8, 10);
        const bx = 24, bw = 74;
        p.noStroke(); p.fill(t === null ? RK.al(p, C.line, 120) : t ? C.ok : C.coral); p.rect(bx, y + 8, bw, rh - 24, 8);
        TK.label(p, C, q.name, bx + bw / 2, y + 8 + (rh - 24) / 2 - 7, t === null ? C.ink : inkOn(t ? C.ok : C.coral), 12, bw - 6);
        TK.label(p, C, t === null ? '?' : t ? 'verdad' : 'miente', bx + bw / 2, y + 8 + (rh - 24) / 2 + 9, t === null ? C.mute : inkOn(t ? C.ok : C.coral), 9, bw - 6);
        TK.label(p, C, `«${q.say}»`, (bx + bw + G.W - 20) / 2, y + (rh - 8) / 2 - (all ? 7 : 0), C.ink, 11, G.W - bw - 60);
        if (all) TK.label(p, C, `esto sería ${said ? 'verdad' : 'falso'}`, (bx + bw + G.W - 20) / 2, y + (rh - 8) / 2 + 11, clash ? C.bad : C.mute, 9, G.W - bw - 60);
        return { x: 16, y, w: G.W - 32, h: rh - 8, i };
      });
      const condBad = all && r.cond && !r.cond(s.T);
      RK.strip(p, C, G.fb, !all ? '$\\text{supón algo de cada uno}$' : VELO.on ? '$\\text{todos tienen su papel}$' : good ? '$\\text{todo cuadra}$' : condBad ? '$\\text{no cumple la condición}$' : '$\\text{hay frases que chocan}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const c = (G.cards || []).find(b => hitBox(b, x, y)); if (!c) return false; const t = G.s.T[c.i]; G.s.T[c.i] = t === null ? true : !t; G.touch(); return true; },
    demo: G => (G.cards ? { from: { x: 60, y: G.cards[0].y + 24 }, to: { x: 60, y: G.cards[0].y + 24 }, text: 'Toca para suponer', ty: G.cards.at(-1).y + G.cards.at(-1).h + 18 } : null),
    peek: G => ({ cards: G.cards }),
  });
  return Object.assign(game, { answer: r => ({ T: sols(r)[0] }), solutions: r => sols(r).map(T => ({ T })) });
})();
;
//#archivo js/games/maquina-operador.js
// La máquina de dos entradas (Preuniversitario, pu-op-1 y pu-op-2; spec 2026-11-18-preuda-razonamiento-completo): un operador
// nuevo, como a ★ b = 2a − b, es una máquina con dos bocas. Se desliza el número de cada boca; la máquina muestra la regla con
// los números ya puestos en lugar de a y b, y su resultado. Hay que lograr el resultado pedido (si una boca viene fija, solo se
// mueve la otra).
// params = { rounds: [{ sym, tex, f(a, b), target, lo, hi, fix?: { a?, b? } }] }   state = { rounds: [{ a, b }] }
GAMES['maquina-operador'] = (() => {
  let ok = (s, r) => r.f(s.a, s.b) === r.target && (r.fix?.a === undefined || s.a === r.fix.a) && (r.fix?.b === undefined || s.b === r.fix.b);
  const sols = r => { const out = []; for (let a = r.lo; a <= r.hi; a++) for (let b = r.lo; b <= r.hi; b++) if (ok({ a, b }, r)) out.push({ a, b }); return out; };
  const sub = (r, a, b) => r.tex.replace(/(?<![\\a-zA-Z])a(?![a-zA-Z])/g, `(${a})`).replace(/(?<![\\a-zA-Z(])b(?![a-zA-Z])/g, `(${b})`).replace(/(\d)\(/g, '$1\\cdot(');
  const N = r => r.hi - r.lo + 1;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => { const s = { a: r.fix?.a ?? r.lo, b: r.fix?.b ?? r.lo }; if (ok(s, r)) s[r.fix?.b === undefined ? 'b' : 'a'] += 1; return s; },
    ok,
    solution: r => { const s = sols(r)[0]; return `$${s.a} ${r.sym} ${s.b} = ${r.target}$`; },
    prompt: r => `Con $a ${r.sym} b = ${r.tex}$, logra que salga ${r.target}`,
    foot: () => 'Desliza los números de las bocas',
    layout(G) { G.tA = G.H - 150; G.tB = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? sols(r)[0] : G.s, good = ok(s, r), v = r.f(s.a, s.b), mx = G.W / 2, my = 180;
      p.stroke(C.ink); p.strokeWeight(1.5); p.fill(RK.al(p, C.card, 220)); p.rect(mx - 110, my - 50, 220, 100, 14);
      [['a', s.a, mx - 60], ['b', s.b, mx + 60]].forEach(([k, val, x]) => { p.noStroke(); p.fill(RK.al(p, k === 'a' ? C.sky : C.coral, 140)); p.rect(x - 26, my - 80, 52, 34, 8); TK.label(p, C, `${k} = ${val}`, x, my - 63, C.ink, 12, 50); });
      TK.label(p, C, `$${sub(r, s.a, s.b)}$`, mx, my - 10, C.ink, 14, 200);
      TK.label(p, C, `$= ${v}$`, mx, my + 22, good ? C.ok : C.brand, 18, 200);
      const fa = r.fix?.a !== undefined, fbx = r.fix?.b !== undefined;
      G.XA = RK.track(p, C, 40, G.W - 30, G.tA, N(r), s.a - r.lo, k => ((r.lo + k) % 2 === 0 ? String(r.lo + k) : null), fa ? C.mute : C.sky);
      G.XB = RK.track(p, C, 40, G.W - 30, G.tB, N(r), s.b - r.lo, k => null, fbx ? C.mute : C.coral);
      TK.label(p, C, 'a', 20, G.tA, C.sky, 12, 20); TK.label(p, C, 'b', 20, G.tB, C.coral, 12, 20);
      RK.strip(p, C, G.fb, `$${s.a} ${r.sym} ${s.b} = ${v}$`, { kicker: good ? 'sale lo pedido' : `debe salir ${r.target}`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const r = G.r; if (Math.abs(y - G.tA) < 20 && r.fix?.a === undefined) G.grab = 'a'; else if (Math.abs(y - G.tB) < 20 && r.fix?.b === undefined) G.grab = 'b'; else return false; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = null; },
    demo: G => { const k = G.r.fix?.a === undefined ? 'a' : 'b', y = k === 'a' ? G.tA : G.tB, X = k === 'a' ? G.XA : G.XB; return { from: { x: X(G.s[k] - G.r.lo), y }, to: { x: X(G.s[k] - G.r.lo) + 60, y }, text: 'Desliza el número', ty: G.tA - 30 }; },
    peek: G => ({ tA: G.tA, tB: G.tB }),
  });
  game.move = (G, x) => { const r = G.r, v = r.lo + RK.pick(x, 40, G.W - 30, N(r)); if (v !== G.s[G.grab] || !G.touched[G.cur]) { G.s[G.grab] = v; G.touch(); } };
  return Object.assign(game, { answer: r => sols(r)[0] });
})();
;
//#archivo js/games/cruce-tabla.js
// El cruce de la tabla (Preuniversitario, pu-op-1 y pu-op-2; spec 2026-11-18-preuda-razonamiento-completo): una operación dada
// por tabla. El resultado de x ∘ y está en el cruce de la FILA de x con la COLUMNA de y. Se toca la casilla; con una cadena
// (x ∘ y) ∘ z, lo que salió primero pasa a ser la fila del segundo paso.
// params = { rounds: [{ set: [elementos], tab: [[resultado]], chain: [x, y, z?] }] }   state = { rounds: [{ picks: [[fila, col]] }] }
GAMES['cruce-tabla'] = (() => {
  const idx = (r, v) => r.set.indexOf(v);
  const steps = r => { const out = []; let cur = r.chain[0]; for (let k = 1; k < r.chain.length; k++) { const i = idx(r, cur), j = idx(r, r.chain[k]); out.push([i, j]); cur = r.tab[i][j]; } return out; };
  let ok = (s, r) => { const st = steps(r); return s.picks.length === st.length && st.every(([i, j], k) => s.picks[k][0] === i && s.picks[k][1] === j); };
  const expr = r => r.chain.length === 2 ? `${r.chain[0]} \\circ ${r.chain[1]}` : `(${r.chain[0]} \\circ ${r.chain[1]}) \\circ ${r.chain[2]}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ picks: [] }),
    answered: s => s.picks.length > 0,
    ok,
    solution: r => { let cur = r.chain[0]; const parts = []; for (let k = 1; k < r.chain.length; k++) { const v = r.tab[idx(r, cur)][idx(r, r.chain[k])]; parts.push(`${cur} ∘ ${r.chain[k]} = ${v}`); cur = v; } return parts.join('; '); },
    prompt: r => `Usa la tabla: ¿cuánto es $${expr(r)}$?`,
    foot: () => 'Toca el cruce: fila del primero, columna del segundo',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { picks: steps(r) } : G.s, good = ok(s, r), n = r.set.length, cs = Math.min(46, (G.W - 60) / (n + 1)), x0 = (G.W - (n + 1) * cs) / 2, y0 = 100;
      p.noStroke(); p.fill(RK.al(p, C.brand, 70)); p.rect(x0, y0, cs, cs, 6); TK.label(p, C, '$\\circ$', x0 + cs / 2, y0 + cs / 2, C.ink, 14, cs);
      r.set.forEach((v, k) => { TK.label(p, C, String(v), x0 + (k + 1.5) * cs, y0 + cs / 2, C.coral, 13, cs); TK.label(p, C, String(v), x0 + cs / 2, y0 + (k + 1.5) * cs, C.sky, 13, cs); });
      const last = s.picks.at(-1), cols = [C.brand, C.mint];
      G.cells = [];
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const x = x0 + (j + 1) * cs, y = y0 + (i + 1) * cs, k = s.picks.findIndex(q => q[0] === i && q[1] === j);
        p.stroke(C.line); p.strokeWeight(1); p.fill(k >= 0 ? RK.al(p, good ? C.ok : cols[k % 2], 120) : RK.al(p, C.card, 200)); p.rect(x + 1, y + 1, cs - 2, cs - 2, 5);
        TK.label(p, C, String(r.tab[i][j]), x + cs / 2, y + cs / 2, C.ink, 13, cs);
        G.cells.push({ x, y, w: cs, h: cs, i, j });
      }
      if (last) { const [i, j] = last; p.noStroke(); p.fill(RK.al(p, C.sky, 40)); p.rect(x0, y0 + (i + 1) * cs, cs, cs); p.fill(RK.al(p, C.coral, 40)); p.rect(x0 + (j + 1) * cs, y0, cs, cs); }
      const txt = s.picks.map(([i, j]) => `${r.set[i]} \\circ ${r.set[j]} = ${r.tab[i][j]}`).join(';\\ ');
      RK.strip(p, C, G.fb, txt ? `$${txt}$` : '$\\text{toca un cruce}$', { kicker: `paso ${Math.min(s.picks.length + 1, r.chain.length - 1)} de ${r.chain.length - 1}`, col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) {
      const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false;
      const need = G.r.chain.length - 1, P = G.s.picks;
      const k = P.findIndex(q => q[0] === c.i && q[1] === c.j);
      if (k >= 0) P.splice(k); else if (P.length < need) P.push([c.i, c.j]); else P[need - 1] = [c.i, c.j];
      G.touch(); return true;
    },
    demo: G => { const c = G.cells?.[0]; return c ? { from: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, to: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, text: 'Toca el cruce', ty: G.cells.at(-1).y + G.cells.at(-1).h + 22 } : null; },
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ picks: steps(r) }) });
})();
;
//#archivo js/games/neutro-buscador.js
// El que no cambia nada (Preuniversitario, pu-op-1; spec 2026-11-18-preuda-razonamiento-completo): el elemento neutro e de un
// operador cumple a ∘ e = a para TODO a. Se desliza un candidato e y el juego opera con él varios números: cada a es una barra
// gris y a ∘ e una barra de color al lado. El neutro deja todas las parejas iguales.
// params = { rounds: [{ sym, tex, f(a, b), lo, hi, as: [números a probar] }] }   state = { rounds: [{ e }] }
GAMES['neutro-buscador'] = (() => {
  const good = (r, e) => r.as.every(a => r.f(a, e) === a);
  const need = r => { for (let e = r.lo; e <= r.hi; e++) if (good(r, e)) return e; return null; };
  let ok = (s, r) => good(r, s.e);
  const N = r => r.hi - r.lo + 1;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ e: need(r) === r.lo ? r.lo + 1 : r.lo }),
    ok,
    solution: r => `e = ${need(r)}`,
    prompt: r => `Con $a ${r.sym} b = ${r.tex}$, busca $e$ con $a ${r.sym} e = a$ siempre`,
    foot: () => 'Desliza el candidato e',
    layout(G) { G.b = { x: 30, y: 104, w: G.W - 50, h: G.H - 270 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { e: need(r) } : G.s, g = ok(s, r), b = G.b, vals = r.as.map(a => r.f(a, s.e));
      const top = Math.max(...r.as, ...vals, 1), bot = Math.min(0, ...vals), Y = v => b.y + b.h - (v - bot) / (top - bot) * b.h, w = b.w / r.as.length;
      p.stroke(C.line); p.strokeWeight(1); p.line(b.x, Y(0), b.x + b.w, Y(0));
      r.as.forEach((a, i) => {
        const x = b.x + i * w, v = vals[i], same = !VELO.on && v === a;
        p.noStroke(); p.fill(RK.al(p, C.line, 200)); p.rect(x + w * 0.15, Math.min(Y(a), Y(0)), w * 0.3, Math.abs(Y(0) - Y(a)), 2);
        p.fill(same ? C.ok : C.coral); p.rect(x + w * 0.5, Math.min(Y(v), Y(0)), w * 0.3, Math.abs(Y(0) - Y(v)), 2);
        TK.label(p, C, `$${a} ${r.sym} ${s.e} = ${v}$`, x + w / 2, b.y + b.h + 14 + (i % 2) * 14, same ? C.ok : C.ink, 9, w * 1.6);
      });
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), s.e - r.lo, k => ((r.lo + k) % 2 === 0 ? String(r.lo + k) : null), g ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$e = ${s.e}$`, { kicker: g ? 'no cambia a nadie: es el neutro' : `${r.as.filter((a, i) => vals[i] !== a).length} cambian`, col: G.locked || g ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.e - G.r.lo), y: G.tY }, to: { x: G.X(G.s.e - G.r.lo) + 60, y: G.tY }, text: 'Desliza e', ty: G.b.y + 10 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, e = r.lo + RK.pick(x, 30, G.W - 30, N(r)); if (e !== G.s.e || !G.touched[G.cur]) { G.s.e = e; G.touch(); } };
  return Object.assign(game, { answer: r => ({ e: need(r) }) });
})();
;
//#archivo js/games/anida-operador.js
// Operador anidado (Preuniversitario, pu-op-2; spec 2026-11-18-preuda-razonamiento-completo): una operación anidada como
// (3 ★ 1) ★ 4 se dibuja como cajas dentro de cajas. Se toca una caja para calcularla: solo se puede si adentro ya no quedan
// cajas sin calcular; entonces se cierra y queda su resultado. Así se ve que se resuelve de adentro hacia afuera.
// params = { rounds: [{ sym, tex, f(a, b), expr: número | [izq, der] }] }   state = { rounds: [{ done: [rutas calculadas] }] }
GAMES['anida-operador'] = (() => {
  const nodes = (e, path = '') => (Array.isArray(e) ? [...nodes(e[0], path + '0'), ...nodes(e[1], path + '1'), path] : []);
  let ok = (s, r) => s.done.includes('');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: () => ({ done: [] }),
    answered: s => s.done.length > 0,
    ok,
    solution: r => { const out = []; const ev = e => { if (!Array.isArray(e)) return e; const a = ev(e[0]), b = ev(e[1]), v = r.f(a, b); out.push(`$${a} ${r.sym} ${b} = ${v}$`); return v; }; ev(r.expr); return out.join('; '); },
    prompt: r => `Con $a ${r.sym} b = ${r.tex}$, calcula de adentro hacia afuera`,
    foot: () => 'Toca la caja que ya se puede calcular',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.msg = 0; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { done: nodes(r.expr) } : G.s, good = ok(s, r), D = new Set(s.done);
      const val = e => (Array.isArray(e) ? r.f(val(e[0]), val(e[1])) : e);
      const closed = (e, path) => !Array.isArray(e) || D.has(path);
      p.textSize(16); p.textFont('Jost');
      const tw = t => p.textWidth(String(t)) + 14;
      const meas = (e, path) => (closed(e, path) ? tw(val(e)) : 16 + meas(e[0], path + '0') + 26 + meas(e[1], path + '1'));
      const cols = [C.sky, C.coral, C.mint, C.brand];
      G.boxes = [];
      const draw = (e, path, x, y, h, dep) => {
        if (closed(e, path)) {
          const w = tw(val(e)), fresh = Array.isArray(e);
          p.noStroke(); p.fill(fresh ? RK.al(p, C.ok, 90) : RK.al(p, C.card, 220)); p.rect(x, y - 14, w, 28, 6);
          TK.label(p, C, String(val(e)), x + w / 2, y, C.ink, 15, w);
          return w;
        }
        const w = meas(e, path);
        p.stroke(cols[dep % 4]); p.strokeWeight(2); p.fill(RK.al(p, cols[dep % 4], 30)); p.rect(x, y - h / 2, w, h, 10);
        G.boxes.push({ x, y: y - h / 2, w, h, path, ready: closed(e[0], path + '0') && closed(e[1], path + '1') });
        let cx = x + 8;
        cx += draw(e[0], path + '0', cx, y, h - 14, dep + 1);
        TK.label(p, C, `$${r.sym}$`, cx + 13, y, C.ink, 15, 24); cx += 26;
        draw(e[1], path + '1', cx, y, h - 14, dep + 1);
        return w;
      };
      const W0 = meas(r.expr, ''), depth = (e => { const d = x => (Array.isArray(x) ? 1 + Math.max(d(x[0]), d(x[1])) : 0); return d(e); })(r.expr);
      draw(r.expr, '', Math.max(10, (G.W - W0) / 2), 190, 40 + depth * 14, 0);
      if (G.msg > 0) { G.msg -= p.deltaTime || 16; TK.label(p, C, 'primero lo de adentro', G.W / 2, 270, C.bad, 12, G.W - 30); }
      RK.strip(p, C, G.fb, good ? `$\\text{resultado: ${val(r.expr)}}$` : `$\\text{${s.done.length} de ${nodes(r.expr).length} cajas}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const hit = (G.boxes || []).filter(b => hitBox(b, x, y)).sort((a, b) => b.path.length - a.path.length)[0];
      if (!hit) return false;
      if (hit.ready) { G.s.done.push(hit.path); G.touch(); } else G.msg = 1400;
      return true;
    },
    demo: G => { const b = (G.boxes || []).slice().sort((a, c) => c.path.length - a.path.length)[0]; return b ? { from: { x: b.x + 10, y: b.y + b.h / 2 }, to: { x: b.x + 10, y: b.y + b.h / 2 }, text: 'Toca la caja de adentro', ty: b.y + b.h + 40 } : null; },
    peek: G => ({ boxes: G.boxes }),
  });
  return Object.assign(game, { answer: r => ({ done: nodes(r.expr) }) });
})();
;
//#archivo js/games/busca-x-operador.js
// La x dentro del operador (Preuniversitario, pu-op-2; spec 2026-11-18-preuda-razonamiento-completo): una ecuación como
// x ⊕ 4 = 19 se resuelve reemplazando el operador por su regla. Se desliza x; el juego escribe la regla con x ya puesta, su
// valor, y lo compara con el lado derecho en una balanza que se inclina hasta quedar pareja.
// params = { rounds: [{ sym, tex, f(a, b), k, side: 'left' | 'right', target, lo, hi }] }   state = { rounds: [{ x }] }
GAMES['busca-x-operador'] = (() => {
  const val = (r, x) => (r.side === 'right' ? r.f(r.k, x) : r.f(x, r.k));
  const need = r => { for (let x = r.lo; x <= r.hi; x++) if (val(r, x) === r.target) return x; return null; };
  let ok = (s, r) => val(r, s.x) === r.target;
  const N = r => r.hi - r.lo + 1;
  const eq = r => (r.side === 'right' ? `${r.k} ${r.sym} x` : `x ${r.sym} ${r.k}`);
  const sub = (r, a, b) => r.tex.replace(/(?<![\\a-zA-Z])a(?![a-zA-Z])/g, `(${a})`).replace(/(?<![\\a-zA-Z(])b(?![a-zA-Z])/g, `(${b})`).replace(/(\d)\(/g, '$1\\cdot(');
  const show = (r, x) => (r.side === 'right' ? sub(r, r.k, x) : sub(r, x, r.k));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ x: need(r) === r.lo ? r.lo + 1 : r.lo }),
    ok,
    solution: r => `x = ${need(r)}`,
    prompt: r => `Con $a ${r.sym} b = ${r.tex}$, halla $x$: $${eq(r)} = ${r.target}$`,
    foot: () => 'Desliza x hasta que la balanza quede pareja',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { x: need(r) } : G.s, good = ok(s, r), v = val(r, s.x), cx = G.W / 2, cy = 200;
      const ang = Math.max(-0.3, Math.min(0.3, (r.target - v) * 0.03));
      p.noStroke(); p.fill(C.ink); p.triangle(cx, cy, cx - 14, cy + 40, cx + 14, cy + 40);
      p.push(); p.translate(cx, cy); p.rotate(ang);
      p.stroke(C.ink); p.strokeWeight(3); p.line(-G.W * 0.38, 0, G.W * 0.38, 0);
      [[-G.W * 0.28, `$${show(r, s.x)} = ${v}$`, good ? C.ok : C.brand], [G.W * 0.28, `$${r.target}$`, C.coral]].forEach(([x, t, col]) => {
        p.stroke(C.line); p.strokeWeight(1); p.line(x, 0, x, 22); p.noStroke(); p.fill(RK.al(p, col, 60)); p.rect(x - 62, 22, 124, 34, 8);
        TK.label(p, C, t, x, 39, C.ink, 12, 118);
      });
      p.pop();
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), s.x - r.lo, k => ((r.lo + k) % 2 === 0 ? String(r.lo + k) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$x = ${s.x}$`, { kicker: good ? 'la balanza queda pareja' : v < r.target ? 'falta peso a la izquierda' : 'sobra peso a la izquierda', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.x - G.r.lo), y: G.tY }, to: { x: G.X(G.s.x - G.r.lo) + 60, y: G.tY }, text: 'Desliza x', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, v = r.lo + RK.pick(x, 30, G.W - 30, N(r)); if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ x: need(r) }) });
})();
;
//#archivo js/games/corta-lo-que-queda.js
// De lo que queda (Preuniversitario, pu-ar-1; spec 2026-11-18-preuda-razonamiento-completo): «gasta 1/3 y luego 1/4 de lo que
// le queda». Cada compra es una fila: la barra de esa fila es el dinero que había ANTES de comprar (el total o lo que quedaba),
// partida en partes iguales. Se arrastra el corte hasta las partes que se gastan; la fila de abajo empieza con lo que quedó.
// params = { rounds: [{ total, steps: [[num, den, 'total' | 'resto']] }] }   state = { rounds: [{ j: [partes cortadas por fila] }] }
GAMES['corta-lo-que-queda'] = (() => {
  const run = (r, j) => { let rem = r.total; return r.steps.map(([, den, of], k) => { const base = of === 'total' ? r.total : rem, spent = base * j[k] / den; rem -= spent; return { base, spent, rem }; }); };
  let ok = (s, r) => r.steps.every(([num], k) => s.j[k] === num);
  const money = v => (Math.round(v) === v ? v.toLocaleString('es-CO') : v.toFixed(1));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ j: r.steps.map(() => 0) }),
    ok,
    solution: r => { const R = run(r, r.steps.map(s => s[0])); return R.map((x, k) => `gasta ${money(x.spent)}, quedan ${money(x.rem)}`).join('; '); },
    prompt: r => `Hay ${money(r.total)}. Corta lo que gasta cada fila`,
    foot: () => 'Arrastra el corte de cada fila',
    layout(G) { G.x0 = 20; G.x1 = G.W - 20; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { j: r.steps.map(x => x[0]) } : G.s, good = ok(s, r), R = run(r, s.j), Wt = G.x1 - G.x0;
      G.rows = R.map((x, k) => {
        const [, den] = r.steps[k], y = 124 + k * 72, bw = Wt * x.base / r.total, cut = G.x0 + bw * s.j[k] / den;
        TK.label(p, C, `gasta $\\tfrac{${r.steps[k][0]}}{${den}}$ ${r.steps[k][2] === 'total' ? 'del total' : 'de lo que queda'} (había ${money(x.base)})`, G.x0 + Wt / 2, y - 14, C.ink, 10, Wt);
        p.noStroke(); p.fill(RK.al(p, C.mint, 120)); p.rect(G.x0, y, bw, 30, 6);
        p.fill(RK.al(p, C.coral, 200)); p.rect(G.x0, y, cut - G.x0, 30, 6, 0, 0, 6);
        for (let t = 1; t < den; t++) { p.stroke(C.ink); p.strokeWeight(1); p.line(G.x0 + bw * t / den, y, G.x0 + bw * t / den, y + 30); }
        RK.knob(p, C, cut, y + 15, C.brand);
        TK.label(p, C, `gasta ${money(x.spent)} · quedan ${money(x.rem)}`, G.x0 + Wt / 2, y + 44, C.ink, 10, Wt);
        return { y, bw, den };
      });
      const last = R.at(-1).rem;
      RK.strip(p, C, G.fb, `$\\text{quedan ${money(last)}}$`, { kicker: good ? 'eso es lo que queda' : 'lo que va quedando', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const k = (G.rows || []).findIndex(rw => y > rw.y - 12 && y < rw.y + 42); if (k < 0) return false; G.grab = k; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => { const rw = G.rows?.[0]; return rw ? { from: { x: G.x0 + 4, y: rw.y + 15 }, to: { x: G.x0 + rw.bw / rw.den, y: rw.y + 15 }, text: 'Arrastra el corte', ty: rw.y - 30 } : null; },
    peek: G => ({ rows: G.rows }),
  });
  game.move = (G, x) => { const rw = G.rows[G.grab], j = Math.max(0, Math.min(rw.den, Math.round((x - G.x0) / (rw.bw / rw.den)))); if (j !== G.s.j[G.grab] || !G.touched[G.cur]) { G.s.j[G.grab] = j; G.touch(); } };
  return Object.assign(game, { answer: r => ({ j: r.steps.map(x => x[0]) }) });
})();
;
//#archivo js/games/total-original.js
// ¿Cuánto había al principio? (Preuniversitario, pu-ar-1; spec 2026-11-18-preuda-razonamiento-completo): se sabe lo que quedó
// después de unas compras con fracciones, y se busca lo que había. Se desliza el total; el juego aplica las compras a ese total,
// dibuja la barra de lo que queda y la compara con lo que se sabe que quedó.
// params = { rounds: [{ steps: [[num, den, 'total' | 'resto']], left, step, max }] }   state = { rounds: [{ t }] }
GAMES['total-original'] = (() => {
  const rest = (r, t) => { let rem = t; r.steps.forEach(([n, d, of]) => { rem -= (of === 'total' ? t : rem) * n / d; }); return rem; };
  const need = r => { for (let t = r.step; t <= r.max; t += r.step) if (Math.abs(rest(r, t) - r.left) < 1e-9) return t; return null; };
  let ok = (s, r) => Math.abs(rest(r, s.t) - r.left) < 1e-9;
  const N = r => Math.round(r.max / r.step);
  const fmt = v => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v).toLocaleString('es-CO') : v.toFixed(1));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ t: need(r) === r.step ? 2 * r.step : r.step }),
    ok,
    solution: r => `había ${fmt(need(r))}`,
    prompt: r => `Al final le quedan ${fmt(r.left)}. ¿Cuánto tenía?`,
    foot: () => 'Desliza el total hasta que quede lo que se sabe',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { t: need(r) } : G.s, good = ok(s, r), x0 = 20, Wt = G.W - 40, sc = Wt / r.max, rem = rest(r, s.t);
      p.noStroke(); p.fill(RK.al(p, C.line, 80)); p.rect(x0, 130, s.t * sc, 34, 6);
      p.fill(good ? C.ok : C.sky); p.rect(x0 + (s.t - rem) * sc, 130, rem * sc, 34, 6);
      r.steps.forEach(([n, d, of], k) => TK.label(p, C, `${k ? 'luego ' : ''}gastó $\\tfrac{${n}}{${d}}$ ${of === 'total' ? 'del total' : 'de lo que quedaba'}`, G.W / 2, 92 + k * 18, C.ink, 11, G.W - 30));
      TK.label(p, C, `total ${fmt(s.t)}`, x0 + 50, 122, C.mute, 10, 100);
      p.stroke(C.coral); p.strokeWeight(2); p.drawingContext.setLineDash([5, 4]); p.noFill(); p.rect(x0 + (s.t - r.left) * sc, 182, r.left * sc, 26, 5); p.drawingContext.setLineDash([]);
      TK.label(p, C, `debe quedar ${fmt(r.left)}`, G.W / 2, 226, C.coral, 10, G.W - 40);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), s.t / r.step - 1, k => null, good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$\\text{con ${fmt(s.t)} quedan ${fmt(rem)}}$`, { kicker: good ? 'coincide' : rem < r.left ? 'queda poco: sube el total' : 'queda mucho: baja el total', col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.t / G.r.step - 1), y: G.tY }, to: { x: G.X(G.s.t / G.r.step - 1) + 70, y: G.tY }, text: 'Desliza el total', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, t = (RK.pick(x, 30, G.W - 30, N(r)) + 1) * r.step; if (t !== G.s.t || !G.touched[G.cur]) { G.s.t = t; G.touch(); } };
  return Object.assign(game, { answer: r => ({ t: need(r) }) });
})();
;
//#archivo js/games/nota-ponderada.js
// La nota que falta (Preuniversitario, pu-ar-2; spec 2026-11-18-preuda-razonamiento-completo): en un promedio ponderado cada
// nota pesa su porcentaje. Cada nota es una barra tan ancha como su peso y tan alta como la nota; la línea de la definitiva es
// la altura que tendría todo parejo. Se sube la barra de la nota que falta hasta que la definitiva llegue a la meta.
// params = { rounds: [{ items: [[rótulo, peso %, nota | null]], target }] }   state = { rounds: [{ g }] }   (de 0 a 5, de 0.1 en 0.1)
GAMES['nota-ponderada'] = (() => {
  const def = (r, g) => r.items.reduce((a, [, w, n]) => a + w / 100 * (n ?? g), 0);
  const r2 = v => Math.round(v * 100) / 100;
  const need = r => { for (let k = 0; k <= 50; k++) if (Math.abs(def(r, k / 10) - r.target) < 1e-9) return k / 10; return null; };
  let ok = (s, r) => Math.abs(def(r, s.g) - r.target) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ g: need(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => `le falta un ${need(r)}`,
    prompt: r => `¿Qué nota necesita para que la definitiva sea ${r.target}?`,
    foot: () => 'Sube la barra de la nota que falta',
    layout(G) { G.b = { x: 40, y: 104, w: G.W - 60, h: G.H - 250 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { g: need(r) } : G.s, good = ok(s, r), b = G.b, Y = v => b.y + b.h - v / 5 * b.h;
      GRAF.axes(p, C, b, 0, 5, 1);
      let x = b.x; G.miss = null;
      r.items.forEach(([lab, w, n]) => {
        const bw = b.w * w / 100, v = n ?? s.g, miss = n === null;
        p.noStroke(); p.fill(miss ? (good ? C.ok : C.brand) : RK.al(p, C.sky, 170)); p.rect(x + 2, Y(v), bw - 4, Y(0) - Y(v), 3, 3, 0, 0);
        TK.label(p, C, `${lab} · ${w} %`, x + bw / 2, b.y + b.h + 13, C.ink, 9, bw);
        TK.label(p, C, String(v), x + bw / 2, Y(v) - 10, miss ? C.brand : C.ink, 11, bw);
        if (miss) { G.miss = { x: x + bw / 2, x0: x, x1: x + bw }; RK.knob(p, C, x + bw / 2, Y(v), C.brand); }
        x += bw;
      });
      const d = def(r, s.g), y = Y(d); p.stroke(C.coral); p.strokeWeight(2); p.drawingContext.setLineDash([6, 4]); p.line(b.x, y, b.x + b.w, y); p.drawingContext.setLineDash([]);
      TK.label(p, C, `definitiva ${r2(d)}`, b.x + b.w - 50, y - 10, C.coral, 10, 100);
      RK.strip(p, C, G.fb, `$${r.items.map(([, w, n]) => `${w / 100}\\cdot ${n ?? s.g}`).join(' + ')} = ${r2(d)}$`, { kicker: good ? 'llega justo a la meta' : `meta ${r.target}`, col: G.locked || good ? C.ok : C.brand, size: 14 });
    },
    // Arrastre relativo: 10 px por décima desde donde se tocó; un toque sin arrastrar sube o baja una décima.
    press(G, x, y) { const m = G.miss; if (!m || x < m.x0 - 6 || x > m.x1 + 6 || y < G.b.y - 20 || y > G.b.y + G.b.h + 10) return false; G.grab = { y0: y, g0: G.s.g, moved: false }; return true; },
    drag(G, x, y) { if (!G.grab) return false; if (Math.abs(y - G.grab.y0) > 4) G.grab.moved = true; game.set(G, G.grab.g0 * 10 + Math.round((G.grab.y0 - y) / 10)); return true; },
    release(G, x, y) { if (G.grab && !G.grab.moved) { const b = G.b, top = b.y + b.h - G.s.g / 5 * b.h; game.set(G, G.s.g * 10 + (y < top ? 1 : -1)); } G.grab = null; },
    demo: G => (G.miss ? { from: { x: G.miss.x, y: G.b.y + G.b.h - 10 }, to: { x: G.miss.x, y: G.b.y + G.b.h - 90 }, text: 'Sube la barra', ty: G.b.y + 10 } : null),
    peek: G => ({ b: G.b, miss: G.miss }),
  });
  game.set = (G, tenths) => { const g = Math.max(0, Math.min(50, Math.round(tenths))) / 10; if (g !== G.s.g || !G.touched[G.cur]) { G.s.g = g; G.touch(); } };
  return Object.assign(game, { answer: r => ({ g: need(r) }) });
})();
;
//#archivo js/games/cripto-letras.js
// Criptoaritmética (Preuniversitario, pu-ar-3; spec 2026-11-18-preuda-razonamiento-completo): cada letra es una cifra y letras
// distintas son cifras distintas. Cada letra tiene su rueda (se arrastra arriba o abajo para cambiar la cifra); la cuenta se
// reescribe en vivo con las cifras puestas y dice si se cumple. Un número no puede empezar en 0.
// params = { rounds: [{ letters: 'AB', show: 'AB + BA = 121', f(v) → bool, lead: 'A' }] }   (v: { letra: cifra })   state = { rounds: [{ d: [cifra por letra] }] }
GAMES['cripto-letras'] = (() => {
  const val = (r, d) => Object.fromEntries([...r.letters].map((l, i) => [l, d[i]]));
  const valid = (r, d) => new Set(d).size === d.length && [...(r.lead || '')].every(l => val(r, d)[l] !== 0) && !!r.f(val(r, d));
  const sols = r => { const n = r.letters.length, out = []; const rec = (d) => { if (d.length === n) { if (valid(r, d)) out.push(d.slice()); return; } for (let k = 0; k <= 9; k++) if (!d.includes(k)) { d.push(k); rec(d); d.pop(); } }; rec([]); return out; };
  let ok = (s, r) => valid(r, s.d);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ d: [...r.letters].map((_, i) => (i + 1) % 10) }),
    ok,
    solution: r => { const d = sols(r)[0]; return [...r.letters].map((l, i) => `${l} = ${d[i]}`).join(', '); },
    prompt: r => `Cada letra es una cifra distinta: ${r.show}`,
    foot: () => 'Arrastra cada rueda arriba o abajo',
    layout(G) { G.wy = 230; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { d: sols(r)[0] } : G.s, good = ok(s, r), v = val(r, s.d), n = r.letters.length, w = Math.min(70, (G.W - 30) / n);
      const shown = [...r.show].map(ch => (ch in v ? v[ch] : ch)).join('');
      TK.label(p, C, r.show, G.W / 2, 104, C.mute, 15, G.W - 30);
      TK.label(p, C, shown, G.W / 2, 140, good ? C.ok : C.ink, 22, G.W - 30);
      const dup = s.d.filter((x, i) => s.d.indexOf(x) !== i);
      G.wheels = [...r.letters].map((l, i) => {
        const x = (G.W - n * w) / 2 + (i + 0.5) * w, y = G.wy, bad = dup.includes(s.d[i]) || ((r.lead || '').includes(l) && s.d[i] === 0);
        p.stroke(bad ? C.bad : C.line); p.strokeWeight(bad ? 2 : 1); p.fill(RK.al(p, C.card, 220)); p.rect(x - w * 0.36, y - 46, w * 0.72, 92, 10);
        TK.label(p, C, String((s.d[i] + 9) % 10), x, y - 28, C.mute, 11, w * 0.6);
        TK.label(p, C, String(s.d[i]), x, y, C.ink, 22, w * 0.6);
        TK.label(p, C, String((s.d[i] + 1) % 10), x, y + 28, C.mute, 11, w * 0.6);
        TK.label(p, C, l, x, y - 62, C.brand, 15, w);
        return { x, y, w };
      });
      const eqOk = !!r.f(v);
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{una cifra para cada letra}$' : good ? '$\\text{se cumple}$' : dup.length ? '$\\text{hay dos letras con la misma cifra}$' : eqOk ? '$\\text{revisa: ¿empieza en 0?}$' : '$\\text{la cuenta no se cumple}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const i = (G.wheels || []).findIndex(q => Math.abs(x - q.x) < q.w * 0.4 && Math.abs(y - q.y) < 52); if (i < 0) return false; G.grab = i; G.y0 = y; G.d0 = G.s.d[i]; return true; },
    drag(G, x, y) { if (G.grab < 0) return false; const d = ((G.d0 + Math.round((G.y0 - y) / 22)) % 10 + 10) % 10; if (d !== G.s.d[G.grab]) { G.s.d[G.grab] = d; G.touch(); } return true; },
    release(G, x, y) { if (G.grab >= 0 && Math.abs(y - G.y0) < 6) { const q = G.wheels[G.grab]; G.s.d[G.grab] = (G.s.d[G.grab] + (y < q.y ? 9 : 1)) % 10; G.touch(); } G.grab = -1; },
    demo: G => { const q = G.wheels?.[0]; return q ? { from: { x: q.x, y: q.y + 20 }, to: { x: q.x, y: q.y - 30 }, text: 'Arrastra la rueda', ty: q.y + 66 } : null; },
    peek: G => ({ wheels: G.wheels }),
  });
  return Object.assign(game, { answer: r => ({ d: sols(r)[0] }), solutions: r => sols(r) });
})();
;
//#archivo js/games/tablero-cifras.js
// El tablero de los números de dos cifras (Preuniversitario, pu-ar-3; spec 2026-11-18-preuda-razonamiento-completo): del 10 al
// 99, cada fila es una cifra de las decenas y cada columna una de las unidades: el número XY vale 10X + Y. Se toca un número y
// el juego revisa cada condición con él; hay que encontrar el único que las cumple todas.
// params = { rounds: [{ conds: [{ say, f(n) → bool }] }] }   state = { rounds: [{ n }] }
GAMES['tablero-cifras'] = (() => {
  const all = r => Array.from({ length: 90 }, (_, k) => k + 10).filter(n => r.conds.every(c => c.f(n)));
  let ok = (s, r) => s.n !== null && r.conds.every(c => c.f(s.n));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.6,
    init: () => ({ n: null }),
    answered: s => s.n !== null,
    ok,
    solution: r => `${all(r)[0]}`,
    prompt: () => 'Busca el número de dos cifras que cumple todo',
    foot: () => 'Toca un número para ponerlo a prueba',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { n: all(r)[0] } : G.s, good = ok(s, r), cs = Math.min(28, (G.W - 40) / 10), x0 = (G.W - 10 * cs) / 2 + 6, y0 = 96 + r.conds.length * 18;
      r.conds.forEach((c, i) => { const hit = s.n !== null && c.f(s.n); TK.label(p, C, `${s.n === null ? '·' : VELO.on ? '·' : hit ? '✓' : '✗'} ${c.say}`, G.W / 2, 92 + i * 18, s.n === null ? C.ink : hit && !VELO.on ? C.ok : C.bad, 11, G.W - 24); });
      for (let u = 0; u < 10; u++) TK.label(p, C, String(u), x0 + (u + 0.5) * cs, y0 + 6, C.coral, 9, cs);
      G.cells = [];
      for (let t = 1; t <= 9; t++) {
        TK.label(p, C, String(t), x0 - 10, y0 + 14 + (t - 0.5) * cs, C.sky, 9, 14);
        for (let u = 0; u < 10; u++) {
          const n = 10 * t + u, x = x0 + u * cs, y = y0 + 14 + (t - 1) * cs, on = s.n === n;
          p.stroke(RK.al(p, C.line, 140)); p.strokeWeight(1); p.fill(on ? (good ? C.ok : C.brand) : RK.al(p, C.card, 200)); p.rect(x, y, cs, cs, 3);
          TK.label(p, C, String(n), x + cs / 2, y + cs / 2, on ? inkOn(good ? C.ok : C.brand) : C.ink, 9, cs - 2);
          G.cells.push({ x, y, w: cs, h: cs, n });
        }
      }
      RK.strip(p, C, G.fb, s.n === null ? '$\\text{toca un número}$' : `$${s.n} = 10 \\cdot ${Math.floor(s.n / 10)} + ${s.n % 10}$`, { kicker: good ? 'cumple todas' : '', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false; G.s.n = c.n; G.touch(); return true; },
    demo: G => { const c = G.cells?.[34]; return c ? { from: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, to: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, text: 'Toca un número', ty: G.cells.at(-1).y + 40 } : null; },
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ n: all(r)[0] }), solutions: r => all(r) });
})();
;
//#archivo js/games/peor-caso-bolsa.js
// El peor caso (Preuniversitario, pu-ar-4; spec 2026-11-18-preuda-razonamiento-completo): en una bolsa hay bolas de colores y se
// sacan sin mirar. ¿Cuántas hay que sacar para estar SEGUROS de algo? Se desliza cuántas sacar y el juego las saca con la peor
// suerte posible (la que más retrasa lo pedido). Hay que hallar el menor número con el que, aun con esa mala suerte, se cumple.
// params = { rounds: [{ bag: [[color, cantidad]], kind: 'iguales' | 'color', k, color? }] }   state = { rounds: [{ n }] }
GAMES['peor-caso-bolsa'] = (() => {
  const total = r => r.bag.reduce((a, b) => a + b[1], 0);
  const worst = r => {
    const out = [];
    if (r.kind === 'iguales') { const left = r.bag.map(b => Math.min(b[1], r.k - 1)); let more = true; while (more) { more = false; r.bag.forEach((b, i) => { if (left[i] > 0) { out.push(b[0]); left[i]--; more = true; } }); } r.bag.forEach(b => { for (let j = Math.min(b[1], r.k - 1); j < b[1]; j++) out.push(b[0]); }); }
    else { r.bag.forEach(b => { if (b[0] !== r.color) for (let j = 0; j < b[1]; j++) out.push(b[0]); }); const c = r.bag.find(b => b[0] === r.color); for (let j = 0; j < c[1]; j++) out.push(r.color); }
    return out;
  };
  const meets = (r, drawn) => { const cnt = {}; drawn.forEach(c => (cnt[c] = (cnt[c] || 0) + 1)); return r.kind === 'iguales' ? Object.values(cnt).some(v => v >= r.k) : (cnt[r.color] || 0) >= r.k; };
  const need = r => { const w = worst(r); for (let n = 1; n <= w.length; n++) if (meets(r, w.slice(0, n))) return n; return null; };
  let ok = (s, r) => s.n === need(r);
  const NAME = { coral: 'rojas', sky: 'azules', mint: 'verdes', sun: 'amarillas', brand: 'moradas' };
  const ask = r => (r.kind === 'iguales' ? `¿Cuántas sacar para tener seguro ${r.k} del mismo color?` : `¿Cuántas sacar para tener seguro ${r.k} ${NAME[r.color]}?`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `${need(r)} bolas`,
    prompt: ask,
    foot: () => 'Desliza cuántas sacar; el juego saca con la peor suerte',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { n: need(r) } : G.s, good = ok(s, r), w = worst(r), T = total(r), per = Math.min(T, 10), d = Math.min(24, (G.W - 40) / per);
      TK.label(p, C, `En la bolsa: ${r.bag.map(([c, n]) => `${n} ${NAME[c]}`).join(', ')}`, G.W / 2, 96, C.ink, 11, G.W - 24);
      w.forEach((c, i) => {
        const x = (G.W - per * d) / 2 + (i % per + 0.5) * d, y = 130 + Math.floor(i / per) * d, out = i < s.n;
        p.stroke(C.ink); p.strokeWeight(out ? 1.5 : 0.6); p.fill(out ? C[c] : RK.al(p, C[c], 50)); p.circle(x, y, d * 0.8);
      });
      const m = meets(r, w.slice(0, s.n)), prev = s.n > 1 && meets(r, w.slice(0, s.n - 1));
      if (!VELO.on) TK.label(p, C, m ? (prev ? 'se cumple, pero con menos también' : 'aun con la peor suerte, se cumple') : 'con mala suerte, todavía no', G.W / 2, 130 + Math.ceil(T / per) * d + 10, m ? (prev ? C.coral : C.ok) : C.bad, 11, G.W - 24);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, T, s.n - 1, k => ((k + 1) % 5 === 0 || k === 0 ? String(k + 1) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$\\text{sacar ${s.n}}$`, { kicker: good ? 'el menor número seguro' : '', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 3), y: G.tY }, text: 'Desliza cuántas sacar', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 30, G.W - 30, total(G.r)) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { answer: r => ({ n: need(r) }) });
})();
;
//#archivo js/games/reparto-extremo.js
// El reparto extremo (Preuniversitario, pu-ar-4; spec 2026-11-18-preuda-razonamiento-completo): se reparten dulces entre varios
// niños, cada uno con una cantidad DISTINTA y al menos 1. Se sube o se baja la columna de cada niño; el juego cuenta el total.
// Para el máximo de uno, los demás reciben lo mínimo posible; para el menor máximo, todo se reparte lo más parejo que se pueda.
// params = { rounds: [{ n, total, ask: 'max' | 'minmax' }] }   state = { rounds: [{ h: [cantidad por niño] }] }
GAMES['reparto-extremo'] = (() => {
  const target = r => { const base = r.n * (r.n - 1) / 2; if (r.ask === 'max') return r.total - base; let m = r.n; while (m * (m + 1) / 2 - (m - r.n) * (m - r.n + 1) / 2 < r.total) m++; return m; };
  const valid = (r, h) => h.every(v => v >= 1) && new Set(h).size === h.length && h.reduce((a, b) => a + b, 0) === r.total;
  let ok = (s, r) => valid(r, s.h) && Math.max(...s.h) === target(r);
  const answer = r => { const n = r.n; if (r.ask === 'max') return { h: [...Array.from({ length: n - 1 }, (_, i) => i + 1), target(r)] }; const m = target(r); const h = Array.from({ length: n }, (_, i) => m - i); let extra = h.reduce((a, b) => a + b, 0) - r.total; for (let i = n - 1; i >= 0 && extra > 0; i--) { const room = h[i] - (i === n - 1 ? 1 : h[i + 1] + 1); const t = Math.min(room, extra); h[i] -= t; extra -= t; } return { h }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ h: Array(r.n).fill(1) }),
    ok,
    solution: r => answer(r).h.join(', '),
    prompt: r => (r.ask === 'max' ? `${r.total} dulces, ${r.n} niños, todos distintos: ¿lo máximo de uno?` : `${r.total} dulces, ${r.n} niños, todos distintos: ¿el menor máximo?`),
    foot: () => 'Sube o baja la columna de cada niño',
    layout(G) { G.b = { x: 30, y: 110, w: G.W - 50, h: G.H - 240 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), top = r.total, b = G.b;
      const Y = GRAF.axes(p, C, b, 0, top, Math.max(1, Math.ceil(top / 6)));
      const dup = s.h.filter((x, i) => s.h.indexOf(x) !== i);
      G.cols = GRAF.bars(p, C, b, s.h, s.h.map((_, i) => `niño ${i + 1}`), Y, { col: i => (dup.includes(s.h[i]) ? C.bad : good ? C.ok : C.sky) });
      G.cols.forEach((c, i) => { RK.knob(p, C, c.cx, c.top, C.brand); TK.label(p, C, String(s.h[i]), c.cx, c.top - 14, C.ink, 11, c.w); });
      const sum = s.h.reduce((a, c) => a + c, 0);
      RK.strip(p, C, G.fb, `$\\text{suma}\\ ${sum}\\ \\text{de}\\ ${r.total}\\ \\cdot\\ \\text{el mayor}\\ ${Math.max(...s.h)}$`, { kicker: dup.length ? 'hay dos iguales' : sum !== r.total ? (sum < r.total ? 'faltan dulces' : 'sobran dulces') : good ? (r.ask === 'max' ? 'lo máximo posible' : 'el menor máximo posible') : 'reparto válido, pero se puede mejorar', col: G.locked || good ? C.ok : C.brand, size: 14 });
    },
    press(G, x, y) { const i = GRAF.colAt(G.cols || [], x); if (i < 0 || y < G.b.y - 20 || y > G.b.y + G.b.h + 10) return false; G.grab = i; game.move(G, y); return true; },
    drag(G, x, y) { if (G.grab < 0) return false; game.move(G, y); return true; },
    release(G) { G.grab = -1; },
    demo: G => (G.cols ? { from: { x: G.cols[0].cx, y: G.cols[0].top }, to: { x: G.cols[0].cx, y: G.cols[0].top - 60 }, text: 'Sube la columna', ty: G.b.y + 10 } : null),
    peek: G => ({ b: G.b, cols: G.cols }),
  });
  game.move = (G, y) => { const r = G.r, b = G.b, v = Math.max(1, Math.min(r.total, Math.round((b.y + b.h - y) / b.h * r.total))); if (v !== G.s.h[G.grab] || !G.touched[G.cur]) { G.s.h[G.grab] = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/encuesta-tres.js
// La encuesta de tres círculos (Preuniversitario, pu-cj-1 y pu-cj-2; spec 2026-11-18-preuda-razonamiento-completo): un Venn de
// tres conjuntos con sus 8 zonas. Cada zona tiene su número: se arrastra arriba o abajo sobre la zona para cambiarlo. Al lado
// están los datos de la encuesta (cuántos en A, en A y B, en los tres…) y el juego suma las zonas en vivo para cada dato. Se
// llena del centro hacia afuera.
// params = { rounds: [{ labels: [A, B, C], z: { a, b, c, ab, ac, bc, abc, none } }] }   (z: cuántos hay SOLO en cada zona)
// state = { rounds: [{ v: { a, b, c, ab, ac, bc, abc, none } }] }
GAMES['encuesta-tres'] = (() => {
  const KEYS = ['abc', 'ab', 'ac', 'bc', 'a', 'b', 'c', 'none'];
  const MASK = { a: 1, b: 2, c: 4, ab: 3, ac: 5, bc: 6, abc: 7, none: 0 };
  const data = (r, v) => {
    const inA = k => MASK[k] & 1, inB = k => MASK[k] & 2, inC = k => MASK[k] & 4, S = f => KEYS.filter(f).reduce((t, k) => t + v[k], 0);
    const [A, B, Cn] = r.labels, sh = t => (t.length > 5 ? t.slice(0, 4) + '.' : t);   // rótulos cortos: caben dos columnas a 300 px
    return [
      ['en los 3', v.abc], [`${sh(A)} y ${sh(B)}`, S(k => inA(k) && inB(k))], [`${sh(A)} y ${sh(Cn)}`, S(k => inA(k) && inC(k))], [`${sh(B)} y ${sh(Cn)}`, S(k => inB(k) && inC(k))],
      [A, S(inA)], [B, S(inB)], [Cn, S(inC)], ['total', S(() => true)],
    ];
  };
  let ok = (s, r) => KEYS.every(k => s.v[k] === r.z[k]);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.45,
    init: () => ({ v: Object.fromEntries(KEYS.map(k => [k, 0])) }),
    answered: s => KEYS.some(k => s.v[k] > 0),
    ok,
    solution: r => KEYS.map(k => `${k === 'none' ? 'ninguno' : k.toUpperCase()}: ${r.z[k]}`).join(', '),
    prompt: () => 'Llena el diagrama con la encuesta, del centro hacia afuera',
    foot: () => 'Arrastra arriba o abajo sobre una zona para cambiar su número',
    layout(G) {
      const W = G.W, cx = W / 2, cy = 200, d = Math.min(W * 0.13, 46), R = d * 1.75;
      G.c = [[cx - d, cy - d * 0.55], [cx + d, cy - d * 0.55], [cx, cy + d * 0.95]]; G.R = R; G.box = { x: 12, y: cy - R - d * 0.6 - 10, w: W - 24, h: 2 * R + d * 1.6 + 30 };
      const acc = {}; for (let x = G.box.x; x < G.box.x + G.box.w; x += 4) for (let y = G.box.y; y < G.box.y + G.box.h; y += 4) { let m = 0; G.c.forEach(([a, b], i) => { if ((x - a) ** 2 + (y - b) ** 2 < R * R) m |= 1 << i; }); (acc[m] = acc[m] || []).push([x, y]); }
      G.cent = {}; KEYS.forEach(k => { const pts = acc[MASK[k]] || [[G.box.x + 20, G.box.y + 16]]; G.cent[k] = k === 'none' ? [G.box.x + 30, G.box.y + G.box.h - 18] : [pts.reduce((a, q) => a + q[0], 0) / pts.length, pts.reduce((a, q) => a + q[1], 0) / pts.length]; });
      G.fb = { x: 12, y: G.H - 66, w: W - 24, h: 44 };
    },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: r.z } : G.s, good = ok(s, r), cols = [C.sky, C.coral, C.mint];
      p.stroke(C.line); p.strokeWeight(1); p.noFill(); p.rect(G.box.x, G.box.y, G.box.w, G.box.h, 10);
      G.c.forEach(([x, y], i) => { p.stroke(cols[i]); p.strokeWeight(2); p.fill(RK.al(p, cols[i], 30)); p.circle(x, y, 2 * G.R); });
      TK.label(p, C, r.labels[0], G.c[0][0] - G.R * 0.7, G.c[0][1] - G.R * 0.85, cols[0], 10, 80);
      TK.label(p, C, r.labels[1], G.c[1][0] + G.R * 0.7, G.c[1][1] - G.R * 0.85, cols[1], 10, 80);
      TK.label(p, C, r.labels[2], G.c[2][0] + G.R * 0.95, G.c[2][1] + G.R * 0.8, cols[2], 10, 80);
      KEYS.forEach(k => { const [x, y] = G.cent[k], hit = s.v[k] === r.z[k]; p.noStroke(); p.fill(RK.al(p, C.card, 230)); p.rect(x - 14, y - 11, 28, 22, 6); TK.label(p, C, String(s.v[k]), x, y, G.grab?.k === k ? C.brand : good && hit && !VELO.on ? C.ok : C.ink, 13, 26); });
      TK.label(p, C, 'ninguno', G.cent.none[0], G.cent.none[1] - 20, C.mute, 9, 60);
      const want = data(r, r.z), now = data(r, s.v), y0 = G.box.y + G.box.h + 12, colW = (G.W - 24) / 2;
      want.forEach(([lab, n], i) => { const hit = now[i][1] === n, x = 12 + (i % 2) * colW + colW / 2, y = y0 + Math.floor(i / 2) * 15; TK.label(p, C, `${VELO.on ? '·' : hit ? '✓' : '·'} ${lab}: ${n} (van ${now[i][1]})`, x, y, hit && !VELO.on ? C.ok : C.ink, 9, colW - 4); });
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{una cuenta para cada zona}$' : good ? '$\\text{el diagrama cuadra con la encuesta}$' : `$\\text{${want.filter((w, i) => now[i][1] === w[1]).length} de ${want.length} datos}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const k = KEYS.find(q => Math.abs(x - G.cent[q][0]) < 22 && Math.abs(y - G.cent[q][1]) < 18); if (!k) return false; G.grab = { k, y0: y, v0: G.s.v[k] }; return true; },
    drag(G, x, y) { if (!G.grab) return false; const v = Math.max(0, Math.min(60, G.grab.v0 + Math.round((G.grab.y0 - y) / 12))); if (v !== G.s.v[G.grab.k]) { G.s.v[G.grab.k] = v; G.touch(); } return true; },
    release(G, x, y) { if (G.grab && Math.abs(y - G.grab.y0) < 5) { G.s.v[G.grab.k] += 1; G.touch(); } G.grab = null; },
    demo: G => { const [x, y] = G.cent.abc; return { from: { x, y: y + 20 }, to: { x, y: y - 40 }, text: 'Arrastra hacia arriba', ty: G.box.y + 14 }; },
    peek: G => ({ cent: G.cent }),
  });
  return Object.assign(game, { answer: r => ({ v: { ...r.z } }) });
})();
;
//#archivo js/games/solapa-barras.js
// Las barras que se solapan (Preuniversitario, pu-cj-2; spec 2026-11-18-preuda-razonamiento-completo): en una encuesta de un
// total de personas, los de A son una barra y los de B otra. Se arrastra la barra de B: lo que se monta sobre A son los que
// están en los dos. El juego cuenta la unión (lo que cubren las dos) y los de ninguno (lo que queda sin cubrir), y los compara
// con el dato que da la encuesta.
// params = { rounds: [{ labels: [A, B], total, a, b, none }] }   state = { rounds: [{ s }] }   (inicio de la barra de B)
GAMES['solapa-barras'] = (() => {
  const both = (r, s) => Math.max(0, Math.min(r.a, s + r.b) - s);
  const none = (r, s) => r.total - (r.a + r.b - both(r, s));
  const need = r => { for (let s = 0; s <= r.total - r.b; s++) if (none(r, s) === r.none) return s; return null; };
  let ok = (s, r) => none(r, s.s) === r.none;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ s: need(r) === r.total - r.b ? 0 : r.total - r.b }),
    ok,
    solution: r => `los dos: ${both(r, need(r))}`,
    prompt: r => `De ${r.total}: ${r.a} ${r.labels[0]}, ${r.b} ${r.labels[1]}, ${r.none} ninguno. ¿Cuántos los dos?`,
    foot: () => 'Arrastra la barra de abajo',
    layout(G) { G.x0 = 20; G.x1 = G.W - 20; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { s: need(r) } : G.s, good = ok(s, r), u = (G.x1 - G.x0) / r.total, X = v => G.x0 + v * u;
      p.stroke(C.line); p.strokeWeight(1); p.noFill(); p.rect(G.x0, 110, G.x1 - G.x0, 110, 8);
      TK.label(p, C, `total ${r.total}`, G.W / 2, 100, C.mute, 10, 120);
      const bo = both(r, s.s), un = r.a + r.b - bo;
      if (bo > 0) { p.noStroke(); p.fill(RK.al(p, C.brand, 70)); p.quad(X(s.s), 120, X(s.s + bo), 120, X(s.s + bo), 208, X(s.s), 208); }
      p.noStroke(); p.fill(RK.al(p, C.sky, 200)); p.rect(X(0), 126, r.a * u, 30, 5);
      p.fill(RK.al(p, C.coral, 200)); p.rect(X(s.s), 172, r.b * u, 30, 5);
      TK.label(p, C, `${r.labels[0]} ${r.a}`, X(r.a / 2), 141, inkOn(C.sky), 10, r.a * u);
      TK.label(p, C, `${r.labels[1]} ${r.b}`, X(s.s + r.b / 2), 187, inkOn(C.coral), 10, r.b * u);
      p.stroke(C.ink); p.strokeWeight(1.2); p.line(X(un), 112, X(un), 218);
      TK.label(p, C, `los dos: ${bo}`, X(s.s + bo / 2), 236, C.brand, 10, 90);
      TK.label(p, C, `ninguno: ${r.total - un}`, X((un + r.total) / 2), 254, good ? C.ok : C.ink, 10, Math.max(80, (r.total - un) * u));
      G.bx = X(s.s + r.b / 2); G.u = u;
      RK.strip(p, C, G.fb, `$${r.a} + ${r.b} - ${bo} = ${un}$`, { kicker: good ? `y ${r.total - un} en ninguno: cuadra` : `unión ${un}; ninguno ${r.total - un}`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (y < 166 || y > 208) return false; G.grab = { dx: x - G.bx }; return true; },
    drag(G, x) { if (!G.grab) return false; const r = G.r, s = Math.max(0, Math.min(r.total - r.b, Math.round((x - G.grab.dx - G.x0) / G.u - r.b / 2))); if (s !== G.s.s) { G.s.s = s; G.touch(); } return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.bx, y: 187 }, to: { x: G.bx - 60, y: 187 }, text: 'Arrastra la barra', ty: 272 }),
    peek: G => ({ bx: G.bx }),
  });
  return Object.assign(game, { answer: r => ({ s: need(r) }) });
})();
;
//#archivo js/games/arbol-factores.js
// El árbol de factores (Preuniversitario, pu-nu-1 y pu-nu-2; spec 2026-11-18-preuda-razonamiento-completo): un número arriba.
// Se arrastra un primo de la bandeja sobre una hoja del árbol: si la divide, la hoja se abre en dos ramas (el primo y lo que
// queda); si no, no pasa nada. Cuando todas las hojas son primos, el juego escribe la descomposición con exponentes.
// params = { rounds: [{ n }] }   state = { rounds: [{ splits: [[índice de hoja, primo]] }] }
GAMES['arbol-factores'] = (() => {
  const PR = [2, 3, 5, 7, 11];
  const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  // El árbol se guarda como lista de nodos { v, kids, depth }; las hojas en orden de izquierda a derecha.
  const build = (r, splits) => {
    const nodes = [{ v: r.n, kids: null, depth: 0 }];
    const leaves = () => { const out = []; const walk = i => { const nd = nodes[i]; if (!nd.kids) out.push(i); else nd.kids.forEach(walk); }; walk(0); return out; };
    splits.forEach(([li, pr]) => { const L = leaves(), i = L[li]; if (i === undefined) return; const nd = nodes[i]; if (nd.v % pr || nd.v === pr) return; nodes.push({ v: pr, kids: null, depth: nd.depth + 1 }, { v: nd.v / pr, kids: null, depth: nd.depth + 1 }); nd.kids = [nodes.length - 2, nodes.length - 1]; });
    return { nodes, leaves: leaves() };
  };
  let ok = (s, r) => build(r, s.splits).leaves.every(i => isP(build(r, s.splits).nodes[i].v));
  const answer = r => { const splits = []; let li = 0, v = r.n; while (!isP(v)) { const pr = PR.find(q => v % q === 0) || v; splits.push([li, pr]); li += 1; v /= pr; } return { splits }; };
  const fact = n => { const f = {}; let v = n; for (let d = 2; v > 1; d++) while (v % d === 0) { f[d] = (f[d] || 0) + 1; v /= d; } return Object.entries(f).map(([b, e]) => (e > 1 ? `${b}^{${e}}` : b)).join(' \\cdot '); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: () => ({ splits: [] }),
    answered: s => s.splits.length > 0,
    ok,
    solution: r => `$${r.n} = ${fact(r.n)}$`,
    prompt: r => `Descompón ${r.n} en primos`,
    foot: () => 'Arrastra un primo sobre una hoja que divida',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), T = build(r, s.splits), top = 104, dy = Math.min(42, (G.H - 250) / Math.max(1, ...T.nodes.map(q => q.depth)));
      const pos = {}; let col = 0; const nLeaves = T.leaves.length, cw = (G.W - 40) / Math.max(nLeaves, 1);
      const place = i => { const nd = T.nodes[i]; if (!nd.kids) { pos[i] = { x: 20 + (col + 0.5) * cw, y: top + nd.depth * dy }; col++; } else { nd.kids.forEach(place); pos[i] = { x: (pos[nd.kids[0]].x + pos[nd.kids[1]].x) / 2, y: top + nd.depth * dy }; } };
      place(0);
      T.nodes.forEach((nd, i) => { if (nd.kids) nd.kids.forEach(k => { p.stroke(C.line); p.strokeWeight(1.5); p.line(pos[i].x, pos[i].y, pos[k].x, pos[k].y); }); });
      G.leafBoxes = [];
      T.nodes.forEach((nd, i) => {
        const q = pos[i], leaf = !nd.kids, pr = !VELO.on && leaf && isP(nd.v);
        p.stroke(pr ? C.ok : C.line); p.strokeWeight(pr ? 2 : 1); p.fill(leaf ? (pr ? RK.al(p, C.ok, 70) : RK.al(p, C.card, 230)) : RK.al(p, C.line, 60)); p.circle(q.x, q.y, 34);
        TK.label(p, C, String(nd.v), q.x, q.y, C.ink, 12, 32);
        if (leaf) G.leafBoxes.push({ x: q.x, y: q.y, li: T.leaves.indexOf(i), v: nd.v });
      });
      const tw = (G.W - 40) / PR.length; G.tray = PR.map((v, i) => ({ x: 20 + i * tw + 4, y: G.H - 120, w: tw - 8, h: 36, v }));
      G.tray.forEach(b => RK.chip(p, C, b, String(b.v), { on: false, size: 14 }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 20, y: G.drag.y - 18, w: 40, h: 36 }, String(G.drag.v), { on: true, col: C.brand, size: 14 });
      const leavesTxt = T.leaves.map(i => T.nodes[i].v).sort((a, b) => a - b).join(' \\cdot ');
      RK.strip(p, C, G.fb, good ? `$${r.n} = ${fact(r.n)}$` : `$${r.n} = ${leavesTxt}$`, { kicker: good ? 'todas las hojas son primos' : '', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const t = (G.tray || []).find(b => hitBox(b, x, y)); if (!t) return false; G.drag = { v: t.v, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      if (!G.drag) return; const l = (G.leafBoxes || []).find(q => Math.hypot(x - q.x, y - q.y) < 26);
      if (l && l.v % G.drag.v === 0 && l.v !== G.drag.v) { G.s.splits.push([l.li, G.drag.v]); G.touch(); }
      G.drag = null;
    },
    demo: G => { const t = G.tray?.[0], l = G.leafBoxes?.[0]; return t && l ? { from: { x: t.x + t.w / 2, y: t.y + 18 }, to: l, text: 'Arrastra un primo', ty: t.y - 20 } : null; },
    peek: G => ({ tray: G.tray, leaves: G.leafBoxes }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/cifra-faltante.js
// La cifra que falta (Preuniversitario, pu-nu-1; spec 2026-11-18-preuda-razonamiento-completo): a un número le falta una cifra
// y tiene que ser divisible por algo. Se arrastra la rueda de la cifra; el juego aplica el criterio en vivo (la suma de cifras
// para 3 y 9, las dos últimas para 4, la suma alternada para 11) y dice si ya es divisible.
// params = { rounds: [{ tpl: '4_72', by: 3 | 4 | 9 | 11 | 6 }] }   state = { rounds: [{ d }] }   (cualquier cifra que cumpla vale)
GAMES['cifra-faltante'] = (() => {
  const num = (r, d) => +r.tpl.replace('_', d);
  let ok = (s, r) => s.d !== null && num(r, s.d) % r.by === 0;
  const first = r => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].find(d => num(r, d) % r.by === 0);
  const test = (r, d) => {
    const ds = String(num(r, d)).split('').map(Number), sum = ds.reduce((a, b) => a + b, 0);
    if (r.by === 3 || r.by === 9) return `suma de cifras: ${ds.join(' + ')} = ${sum}`;
    if (r.by === 4) return `dos últimas cifras: ${ds.slice(-2).join('')}`;
    if (r.by === 11) { const alt = ds.reduce((a, b, i) => a + (i % 2 ? -b : b), 0); return `suma alternada: ${ds.map((b, i) => (i ? (i % 2 ? '− ' : '+ ') : '') + b).join(' ')} = ${alt}`; }
    return `par: ${ds.at(-1) % 2 === 0 ? 'sí' : 'no'} · suma de cifras ${sum}`;
  };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ d: num(r, 0) % r.by === 0 ? 1 : 0 }),
    ok,
    solution: r => `con ${first(r)}: ${num(r, first(r))}`,
    prompt: r => `¿Qué cifra va en el hueco de ${r.tpl.replace('_', '□')} para que sea divisible por ${r.by}?`,
    foot: () => 'Arrastra la rueda arriba o abajo',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { d: first(r) } : G.s, good = ok(s, r), chars = [...r.tpl], cw = Math.min(46, (G.W - 40) / chars.length), x0 = (G.W - chars.length * cw) / 2, y = 170;
      chars.forEach((ch, i) => {
        const x = x0 + (i + 0.5) * cw, gap = ch === '_';
        p.stroke(gap ? (good ? C.ok : C.brand) : C.line); p.strokeWeight(gap ? 2 : 1); p.fill(RK.al(p, C.card, 230)); p.rect(x - cw * 0.42, y - 30, cw * 0.84, 60, 8);
        if (gap) { TK.label(p, C, String((s.d + 9) % 10), x, y - 44, C.mute, 10, cw); TK.label(p, C, String((s.d + 1) % 10), x, y + 44, C.mute, 10, cw); G.wheel = { x, y, w: cw }; }
        TK.label(p, C, gap ? String(s.d) : ch, x, y, gap ? C.brand : C.ink, 22, cw * 0.8);
      });
      TK.label(p, C, test(r, s.d), G.W / 2, 246, C.ink, 11, G.W - 24);
      RK.strip(p, C, G.fb, `$${num(r, s.d)} \\div ${r.by} = ${Math.floor(num(r, s.d) / r.by)}\\ \\text{residuo}\\ ${num(r, s.d) % r.by}$`, { kicker: good ? 'divisible' : 'aún no es divisible', col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const w = G.wheel; if (!w || Math.abs(x - w.x) > w.w / 2 + 6 || Math.abs(y - w.y) > 56) return false; G.grab = true; G.y0 = y; G.d0 = G.s.d; return true; },
    drag(G, x, y) { if (!G.grab) return false; const d = ((G.d0 + Math.round((G.y0 - y) / 20)) % 10 + 10) % 10; if (d !== G.s.d) { G.s.d = d; G.touch(); } return true; },
    release(G, x, y) { if (G.grab && Math.abs(y - G.y0) < 5) { G.s.d = (G.s.d + (y < G.wheel.y ? 9 : 1)) % 10; G.touch(); } G.grab = false; },
    demo: G => (G.wheel ? { from: { x: G.wheel.x, y: G.wheel.y + 20 }, to: { x: G.wheel.x, y: G.wheel.y - 30 }, text: 'Arrastra la rueda', ty: G.wheel.y - 74 } : null),
    peek: G => ({ wheel: G.wheel }),
  });
  return Object.assign(game, { answer: r => ({ d: first(r) }) });
})();
;
//#archivo js/games/ritmos-mcm.js
// Los ritmos que coinciden (Preuniversitario, pu-nu-2; spec 2026-11-18-preuda-razonamiento-completo): dos cosas que se repiten
// (un bus cada a minutos, otro cada b) son dos filas de marcas en una línea de tiempo. Se arrastra el marcador por la línea;
// el juego dice si en ese momento hay marca en cada fila. La primera vez que coinciden después de 0 es el MCM.
// params = { rounds: [{ a, b, max, labels? }] }   state = { rounds: [{ t }] }
GAMES['ritmos-mcm'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a), lcm = (a, b) => a / gcd(a, b) * b;
  let ok = (s, r) => s.t === lcm(r.a, r.b);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ t: r.a }),
    ok,
    solution: r => `a los ${lcm(r.a, r.b)}`,
    prompt: r => `Uno cada ${r.a} y otro cada ${r.b}. ¿Cuándo coinciden otra vez?`,
    foot: () => 'Arrastra el marcador por la línea de tiempo',
    layout(G) { G.x0 = 24; G.x1 = G.W - 24; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { t: lcm(r.a, r.b) } : G.s, good = ok(s, r), X = t => G.x0 + t / r.max * (G.x1 - G.x0), labs = r.labels || ['A', 'B'];
      [[r.a, 130, C.sky, labs[0]], [r.b, 190, C.coral, labs[1]]].forEach(([k, y, col, lab]) => {
        p.stroke(C.line); p.strokeWeight(1); p.line(G.x0, y, G.x1, y);
        for (let t = 0; t <= r.max; t += k) { p.noStroke(); p.fill(col); p.circle(X(t), y, 10); }
        TK.label(p, C, `${lab}: cada ${k}`, G.x0 + 50, y - 16, col, 10, 110);
      });
      for (let t = 0; t <= r.max; t += Math.max(1, Math.round(r.max / 10))) TK.label(p, C, String(t), X(t), 226, C.mute, 8, 24);
      const onA = s.t % r.a === 0, onB = s.t % r.b === 0, x = X(s.t);
      p.stroke(good ? C.ok : C.brand); p.strokeWeight(2); p.line(x, 112, x, 208); RK.knob(p, C, x, 244, C.brand);
      TK.label(p, C, `t = ${s.t}`, x, 262, C.brand, 11, 60);
      RK.strip(p, C, G.fb, `$\\text{${labs[0]}: ${onA ? 'sí' : 'no'} · ${labs[1]}: ${onB ? 'sí' : 'no'}}$`, { kicker: good ? 'la primera vez que coinciden' : onA && onB ? 'coinciden, pero ¿es la primera vez?' : '', col: G.locked || good ? C.ok : C.brand, size: 15 });
      G.X = X;
    },
    press(G, x, y) { if (y < 100 || y > 270) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.t), y: 244 }, to: { x: G.X(G.s.t) + 70, y: 244 }, text: 'Arrastra el marcador', ty: 286 }),
    peek: G => ({ x0: G.x0, x1: G.x1 }),
  });
  game.move = (G, x) => { const r = G.r, t = Math.max(1, Math.min(r.max, Math.round((x - G.x0) / (G.x1 - G.x0) * r.max))); if (t !== G.s.t || !G.touched[G.cur]) { G.s.t = t; G.touch(); } };
  return Object.assign(game, { answer: r => ({ t: lcm(r.a, r.b) }) });
})();
;
//#archivo js/games/corta-mcd.js
// Baldosas sin cortar (Preuniversitario, pu-nu-2; spec 2026-11-18-preuda-razonamiento-completo): un piso de a × b se cubre con
// baldosas cuadradas iguales, sin cortar ninguna. Se arrastra el tamaño de la baldosa; el juego la repite por el piso y pinta
// de rojo lo que sobra si no cabe justo. La baldosa más grande que cubre sin sobrar mide el MCD.
// params = { rounds: [{ a, b }] }   state = { rounds: [{ k }] }   (lado de la baldosa, de 1 a min(a, b))
GAMES['corta-mcd'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  let ok = (s, r) => s.k === gcd(r.a, r.b);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ k: 1 }),
    ok,
    solution: r => `baldosas de ${gcd(r.a, r.b)}: ${(r.a / gcd(r.a, r.b)) * (r.b / gcd(r.a, r.b))} baldosas`,
    prompt: r => `Piso de ${r.a} × ${r.b}: la baldosa cuadrada más grande sin cortar`,
    foot: () => 'Desliza el tamaño de la baldosa',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: gcd(r.a, r.b) } : G.s, good = ok(s, r), u = Math.min((G.W - 40) / r.a, (G.tY - 150) / r.b), x0 = (G.W - r.a * u) / 2, y0 = 100, k = s.k;
      const fx = Math.floor(r.a / k), fy = Math.floor(r.b / k), fits = r.a % k === 0 && r.b % k === 0;
      p.noStroke(); p.fill(RK.al(p, C.bad, 80)); p.rect(x0, y0, r.a * u, r.b * u, 4);
      for (let i = 0; i < fx; i++) for (let j = 0; j < fy; j++) { p.stroke(C.ink); p.strokeWeight(1); p.fill(RK.al(p, good ? C.ok : (i + j) % 2 ? C.sky : C.mint, 170)); p.rect(x0 + i * k * u, y0 + j * k * u, k * u, k * u); }
      p.noFill(); p.stroke(C.ink); p.strokeWeight(2); p.rect(x0, y0, r.a * u, r.b * u, 4);
      TK.label(p, C, String(r.a), x0 + r.a * u / 2, y0 - 10, C.mute, 10, 40); TK.label(p, C, String(r.b), x0 - 12, y0 + r.b * u / 2, C.mute, 10, 20);
      const mx = Math.min(r.a, r.b);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, mx, k - 1, i => ((i + 1) % Math.ceil(mx / 8) === 0 || i === 0 ? String(i + 1) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$\\text{baldosa de ${k}}$`, { kicker: fits ? (good ? 'la más grande que cabe justo' : `cabe justo: ${fx * fy} baldosas; ¿y más grande?`) : 'sobra piso (en rojo)', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k - 1), y: G.tY }, to: { x: G.X(G.s.k - 1) + 60, y: G.tY }, text: 'Desliza el tamaño', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, k = RK.pick(x, 30, G.W - 30, Math.min(r.a, r.b)) + 1; if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { answer: r => ({ k: gcd(r.a, r.b) }) });
})();
;
//#archivo js/games/arbol-potencia.js
// El árbol de la potencia (Álgebra, potencias; lección alg-21a): un árbol en el que de cada nudo salen b ramas, nivel
// tras nivel. Con e niveles tiene b · b · … · b = bᵉ hojas. Se eligen las ramas por nudo (la base) y los niveles (el
// exponente) hasta tener exactamente las hojas pedidas. Hay metas con varias respuestas (64 = 2⁶ = 4³ = 8²).
// params = { rounds: [{ target }], maxBase?, maxExp? }   state = { rounds: [{ b, e }] }
// Spec 2026-11-15-torres-de-potencias.

GAMES['arbol-potencia'] = (() => {
  // Primera pareja (base, exponente) que da n hojas, con la base más pequeña.
  function powersOf(n, maxB = 9, maxE = 7) {
    const out = [];
    for (let b = 2; b <= maxB; b++) for (let e = 1; e <= maxE; e++) if (b ** e === n) out.push([b, e]);
    return out;
  }
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ b: 2, e: 1 }),
    ok: (s, r) => s.b ** s.e === r.target,
    solution: (r, P) => powersOf(r.target, P.maxBase, P.maxExp).map(([b, e]) => `${b}${sup(e)}`).join(' = ') + ` = ${r.target}`,
    prompt: r => `Haz un árbol con exactamente ${r.target} hojas`,
    foot: (r, s) => (s.b ** s.e === r.target ? `${Array(s.e).fill(s.b).join(' · ')} = ${r.target}` : 'Cada nivel multiplica las puntas por las ramas de cada nudo'),
    layout(G) { const w = (G.W - 36) / 2; G.box = [{ x: 12, y: G.H - 64, w, h: 32 }, { x: 24 + w, y: G.H - 64, w, h: 32 }]; },
    draw(G) {
      const { p, C, W, H, s, r } = G, n = s.b ** s.e, good = !VELO.on && n === r.target, top = 128, bot = H - 96, lv = (bot - top) / s.e;
      p.noStroke(); p.fill(good ? C.ok : C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.textSize(17);
      p.text(`${s.b}${sup(s.e)} = ${n} hojas`, W / 2, 94);
      // Las ramas: el nivel k tiene bᵏ puntas repartidas a lo ancho; se dibuja hasta donde se alcanzan a ver.
      const X = (k, i) => 12 + ((i + 0.5) / s.b ** k) * (W - 24), Y = k => bot - k * lv;
      p.stroke(C.Q); p.strokeWeight(5); p.line(W / 2, bot + 14, W / 2, bot);
      let last = 0;
      for (let k = 1; k <= s.e && s.b ** k <= 160; k++) {
        p.stroke(C.Q); p.strokeWeight(Math.max(1, 4 - k));
        for (let i = 0; i < s.b ** k; i++) p.line(X(k - 1, Math.floor(i / s.b)), Y(k - 1), X(k, i), Y(k));
        last = k;
      }
      const cnt = s.b ** last, d = Math.max(3, Math.min(12, (W - 24) / cnt - 1));
      p.noStroke(); p.fill(good ? C.ok : C.mint);
      for (let i = 0; i < cnt; i++) p.circle(X(last, i), Y(last), d);
      if (last < s.e) { p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.text(`… y ${s.e - last} ${s.e - last === 1 ? 'nivel' : 'niveles'} más: ya no caben en el dibujo`, W / 2, top - 12); }
      drawStepper(p, C, G.box[0], s.b, 'ramas por nudo (base)');
      drawStepper(p, C, G.box[1], s.e, 'niveles (exponente)');
    },
    press(G, x, y) {
      const P = G.params, db = stepHit(G.box[0], x, y), de = stepHit(G.box[1], x, y);
      if (!db && !de) return false;
      G.s.b = Math.max(2, Math.min(P.maxBase ?? 9, G.s.b + db)); G.s.e = Math.max(1, Math.min(P.maxExp ?? 7, G.s.e + de)); G.touch();
      return true;
    },
    peek: G => ({ box: G.box }),
  });
  return { ...game, powersOf };
})();
;
//#archivo js/games/recta-muda.js
// Recta muda (spec 2026-11-24-ejercicios-explora): una recta que solo trae dos números escritos. Se cuelga cada expresión
// donde vive. params = { min, max, rotulos, fichas: [{ t: TeX, v }] }   state = { en: [posición | null] }
// cuelga-porcientos y cuelga-decimales: lo mismo en una recta de 0 a 1 partida en `den` marcas (v se da en marcas).
for (const name of ['recta-muda', 'cuelga-porcientos', 'cuelga-decimales']) XG.juego(name, {
  ini: p => ({ en: p.fichas.map(() => null) }),
  listo: s => s.en.every(v => v != null),
  ok: (s, p) => p.fichas.every((f, i) => s.en[i] === f.v),
  sol: p => ({ en: p.fichas.map(f => f.v) }),
  texto: p => [...p.fichas].sort((a, b) => a.v - b.v).map(f => `$${f.t} = ${p.den ? (name === 'cuelga-porcientos' ? `${f.v * 100 / p.den}\\,\\%` : f.v / p.den) : f.v}$`).join(', '),
  monta(stage, p, ui) {
    const W = 340, H = 258, Y = 214, et = v => (!p.den ? XG.menos(v) : name === 'cuelga-porcientos' ? `${v * 100 / p.den} %` : `${v / p.den}`);
    stage.innerHTML = '<div class="xg-muda" data-drop><div class="xg-lona"></div></div><div class="xp-tray" data-drop data-tray></div>';
    const lona = stage.querySelector('.xg-lona'), muda = stage.firstChild, tray = stage.lastChild;
    const R = XG.recta(lona, { min: p.min, max: p.max, rotulos: p.rotulos, et, alto: H, y: Y });
    let estado = null;   // al comprobar: 'bien' o 'mal' por ficha
    const chip = i => {
      const v = ui.s.en[i], cls = estado ? ` ${estado[i]}` : '';
      return `<button type="button" class="xp-chip xg-col${cls}" data-i="${i}" ${v != null && ui.locked ? `title="en ${et(v)}"` : ''}>${tex(`$${p.fichas[i].t}$`)}</button>`;
    };
    // Cuatro alturas para que las fichas cercanas no se encimen.
    const niveles = () => {
      const orden = p.fichas.map((_, i) => i).filter(i => ui.s.en[i] != null).sort((a, b) => ui.s.en[a] - ui.s.en[b]), out = {}, fin = [-999, -999, -999, -999], sep = 80 * W / (lona.clientWidth || 300);
      for (const i of orden) {
        let n = fin.findIndex(x => R.X(ui.s.en[i]) - x > sep);
        if (n < 0) n = fin.indexOf(Math.min(...fin));
        out[i] = n; fin[n] = R.X(ui.s.en[i]);
      }
      return out;
    };
    const orden = en => en.filter(v => v != null).sort((a, b) => a - b);
    function draw() {
      const nv = niveles();
      tray.innerHTML = p.fichas.map((_, i) => i).filter(i => ui.s.en[i] == null).map(chip).join('');
      tray.hidden = !tray.children.length && ui.locked;
      muda.querySelectorAll('.xg-col').forEach(e => e.remove());
      let h = '';
      for (const i in nv) {
        const x = R.X(ui.s.en[i]), top = 26 + 50 * (3 - nv[i]);
        const cls = estado ? (estado[i] === 'bien' ? ' good' : ' bad') : '';
        h += `<line class="xg-hilo${cls}" x1="${x}" y1="${top}" x2="${x}" y2="${Y}"/><circle class="xp-anc xg-pin${cls}" cx="${x}" cy="${Y}" r="5"/>`;
        // En una recta de 0 a 1 los rótulos van en dos filas para no pisarse; el que ya está escrito no se repite.
        const fila = p.den ? orden(ui.s.en).indexOf(ui.s.en[i]) % 2 : 0, cerca = p.den && p.rotulos.some(r => r !== ui.s.en[i] && Math.abs(r - ui.s.en[i]) < 3);
        if (ui.locked && !(p.den && p.rotulos.includes(ui.s.en[i]))) h += `<text class="xp-lb-on" x="${x}" y="${Y + (fila || cerca ? 40 : 24)}">${et(ui.s.en[i])}</text>`;
        muda.insertAdjacentHTML('beforeend', chip(+i));
        const b = muda.lastElementChild;
        b.style.left = `${XG.clamp(x, 44, W - 44) / W * 100}%`; b.style.top = `${top / H * 100}%`;
      }
      R.din.innerHTML = h;
    }
    const pon = (i, v) => {
      const en = [...ui.s.en], otro = en.indexOf(v);
      if (v != null && otro >= 0 && otro !== i) en[otro] = null;   // en un lugar solo cabe una
      en[i] = v; ui.set({ en }); XS.pop(); xpTick(); draw();
      stage.querySelector(`[data-i="${i}"]`)?.focus({ preventScroll: true });
    };
    let x = 0;
    ui.limpia((f => { window.addEventListener('pointermove', f); window.addEventListener('pointerup', f); return () => { window.removeEventListener('pointermove', f); window.removeEventListener('pointerup', f); }; })(e => {
      x = e.clientX;
      // Mientras se arrastra, se enciende la marca donde caería.
      const r = muda.getBoundingClientRect(), v = XG.clamp(Math.round(R.at(e)), p.min, p.max);
      const va = e.type === 'pointermove' && !ui.locked && stage.querySelector('.lift') && e.clientY > r.top && e.clientY < r.bottom;
      R.bajo.innerHTML = va ? `<line class="xg-hilo" x1="${R.X(v)}" y1="16" x2="${R.X(v)}" y2="${Y}"/><circle class="xp-ring" cx="${R.X(v)}" cy="${Y}" r="11"/>` : '';
    }));
    XG.arrastra(ui, stage, '.xg-col', {
      onDrop(el, over) {
        if (over === tray) return pon(+el.dataset.i, null);
        pon(+el.dataset.i, XG.clamp(Math.round(R.at({ clientX: x, clientY: 0 })), p.min, p.max));
      },
      onTap(el) {
        const i = +el.dataset.i;
        if (ui.s.en[i] != null) return pon(i, null);
        const medio = Math.round((p.min + p.max) / 2), libre = [0, 4, -4, 2, -2, 6, 1, -1, 3].map(d => medio + d).find(v => !ui.s.en.includes(v) && !p.fichas.some(f => f.v === v));
        pon(i, libre);
      },
    });
    stage.onkeydown = e => {
      const b = e.target.closest('.xg-col'), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!b || !k || ui.locked) return;
      e.preventDefault(); e.stopPropagation();
      const i = +b.dataset.i;
      let v = ui.s.en[i] == null ? Math.round((p.min + p.max) / 2) : ui.s.en[i] + k;
      while (ui.s.en.some((y, j) => j !== i && y === v)) v += k;
      if (v >= p.min && v <= p.max) pon(i, v);
    };
    draw(); ui.nota(p.pie || 'Cada marca es un número entero.');
    return ok => {
      estado = p.fichas.map((f, i) => (ui.s.en[i] === f.v ? 'bien' : 'mal'));
      draw();
      ui.nota(ok ? 'Cada una en su lugar.' : 'Las rojas se van a su lugar.');
      if (!ok) ui.espera(1100, () => { ui.muestra({ en: p.fichas.map(f => f.v) }); estado = estado.map(() => 'bien'); XS.merge(); draw(); });
    };
  },
});
;
//#archivo js/games/dos-radares.js
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
;
//#archivo js/games/arma-viaje.js
// Arma el viaje (spec 2026-11-24-ejercicios-explora): con dos cartas de sumar o restar se va de `desde` a `meta`. La ficha no
// se mueve hasta comprobar. params = { min, max, desde, meta, cartas: [{ t: '- (-8)', d: 8 }] }   state = { en: [carta | null, …] }
XG.juego('arma-viaje', {
  ini: () => ({ en: [null, null] }),
  listo: s => s.en.every(i => i != null),
  ok: (s, p) => s.en.every(i => i != null) && s.en[0] !== s.en[1] && p.desde + s.en.reduce((t, i) => t + p.cartas[i].d, 0) === p.meta,
  sol(p) {
    for (let i = 0; i < p.cartas.length; i++) for (let j = i + 1; j < p.cartas.length; j++) if (p.desde + p.cartas[i].d + p.cartas[j].d === p.meta) return { en: [i, j] };
    return null;
  },
  texto(p) { const [i, j] = this.solve(p).en; return `$${p.desde} ${p.cartas[i].t} ${p.cartas[j].t} = ${p.meta}$`; },
  monta(stage, p, ui) {
    stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
    const [lona, frase, tray] = stage.children;
    const R = XG.recta(lona, { min: p.min, max: p.max, alto: 142, y: 98 });
    const meta = `<circle class="xp-goal" cx="${R.X(p.meta)}" cy="${R.y}" r="18"/>`;
    R.bajo.innerHTML = meta; R.din.innerHTML = XG.ficha(R.X(p.desde), R.y, p.desde);
    const carta = i => `$${p.cartas[i].t}$`;
    function draw() {
      frase.innerHTML = `<b>${XG.menos(p.desde)}</b>` + ui.s.en.map((i, k) => `<button type="button" class="xp-slot${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? tex(carta(i)) : ''}</button>`).join('') + `<span>=</span><b class="xg-meta">${XG.menos(p.meta)}</b>`;
      tray.innerHTML = p.cartas.map((_, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${tex(carta(i))}</button>`)).join('');
    }
    const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
    XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
      onDrop(el, over) {
        const i = el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k];
        pon(i, over.dataset.k != null ? +over.dataset.k : null);
      },
      onTap(el) {
        if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null);
        const k = ui.s.en.indexOf(null);
        if (k >= 0) pon(+el.dataset.i, k);
      },
    });
    draw(); ui.nota('Elige dos cartas. La ficha caminará cuando compruebes.');
    return ok => {
      const corre = (en, despues) => {
        let t = `${p.desde}`;
        ui.lee(`$${t}$`);
        XG.camina(ui, R, p.desde, en.map(i => p.cartas[i]), { cada: (k, x) => { t += ` ${p.cartas[en[k - 1]].t}`; ui.lee(`$${t} = ${x}$`); }, fin: despues });
      };
      frase.hidden = tray.hidden = true;
      ui.nota('');
      corre(ui.s.en, (x, fuera) => {
        if (ok) return ui.nota('Llegó justo al aro.');
        ui.nota(fuera ? 'Con esas cartas se sale de la recta. Mira las que sí sirven.' : `Con esas cartas llega a ${XG.menos(x)}. Mira las que sí sirven.`);
        ui.espera(1500, () => corre(GAMES['arma-viaje'].solve(p).en, () => XS.merge()));
      });
    };
  },
});
;
//#archivo js/games/taller-saltos.js
// Taller de saltos (spec 2026-11-24-ejercicios-explora): se fija cuánto mide el salto y cuántas veces se repite para caer en
// el aro con la cadena volteada (veces negativas). La cadena no se ve hasta comprobar.
// params = { min, max, cada, tope, meta }   state = { a, b }
XG.juego('taller-saltos', {
  ini: () => ({ a: 1, b: 0 }),
  listo: s => s.a !== 0 && s.b !== 0,
  ok: (s, p) => s.b < 0 && s.a * s.b === p.meta,
  sol(p) { for (let b = -2; b >= -p.tope; b--) if (p.meta % b === 0 && Math.abs(p.meta / b) <= p.tope) return { a: p.meta / b, b }; return null; },
  texto(p) { const { a, b } = this.solve(p); return `$${XG.par(a)} \\cdot ${XG.par(b)} = ${p.meta}$`; },
  monta(stage, p, ui) {
    stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
    const R = XG.recta(stage.firstChild, { min: p.min, max: p.max, cada: p.cada, alto: 146 });
    R.bajo.innerHTML = `<circle class="xp-goal" cx="${R.X(p.meta)}" cy="${R.y}" r="13"/>`;
    const salto = (a, k, dir) => XG.arco(R.X(a * k * dir), R.X(a * (k + 1) * dir), R.y, 9 + Math.abs(a), `xp-hop${dir < 0 ? ' flip' : ''}`) + `<circle class="xp-land${dir < 0 ? ' flip' : ''}" cx="${R.X(a * (k + 1) * dir)}" cy="${R.y}" r="3.2"/>`;
    const punto = (x, cls = '') => `<g class="xp-tok ${cls}"><circle cx="${R.X(x)}" cy="${R.y}" r="9"/></g>`;
    const draw = () => { R.din.innerHTML = (ui.s.a ? salto(ui.s.a, 0, 1) : '') + punto(0); };
    const pa = XG.perilla(ui, stage.lastChild, { et: 'Cada salto mide', min: -p.tope, max: p.tope, v: ui.s.a, lee: v => XG.menos(v), on: a => { ui.set({ ...ui.s, a }); draw(); } });
    const pb = XG.perilla(ui, stage.lastChild, { et: 'Veces que se repite', min: -p.tope, max: p.tope, v: ui.s.b, lee: v => `${XG.menos(v)} ${Math.abs(v) === 1 ? 'vez' : 'veces'}`, on: b => ui.set({ ...ui.s, b }) });
    draw(); ui.nota('Se ve un solo salto: imagina la cadena completa.');
    // Arma la cadena de |b| saltos y, si b es negativo, la voltea en el 0.
    function corre(a, b, fin) {
      const n = Math.abs(b), dentro = x => x >= p.min && x <= p.max;
      let k = 0, h = '';
      (function paso() {
        if (k < n && dentro(a * (k + 1))) { h += salto(a, k, 1); k++; R.din.innerHTML = h + punto(a * k); XS.hop(k); return ui.espera(330, paso); }
        if (k < n) { R.din.innerHTML = h + punto(a * k); ui.lee(`$${XG.par(a)} \\cdot ${XG.par(b)} = ${a * b}$`); return fin('La cadena se sale de la recta.'); }
        const cierra = () => { ui.lee(`$${XG.par(a)} \\cdot ${XG.par(b)} = ${a * b}$`); fin(''); };
        if (b > 0) return cierra();
        ui.nota('Veces negativas: la cadena da la vuelta en el 0.');
        ui.espera(450, () => {
          XS.flip();
          ui.tween(1, -1, 900, t => {   // gira alrededor del 0
            R.din.innerHTML = `<g transform="translate(${R.X(0)} 0) scale(${t || 0.001} 1) translate(${-R.X(0)} 0)">${t > 0 ? h : h.replace(/xp-hop|xp-land/g, '$& flip')}</g>` + punto(a * n * t, t < 0 ? 'flip' : '');
          }, cierra);
        });
      })();
    }
    return ok => {
      const { a, b } = ui.s;
      corre(a, b, aviso => {
        if (ok) return ui.nota('Saltos negativos, veces negativas: dos menos, y cae del lado positivo.');
        const g = GAMES['taller-saltos'].solve(p);
        ui.nota(aviso || (a * b === p.meta ? 'Cae en el aro, pero sin dar la vuelta. Mira una que sí la da.' : `Cae en ${XG.menos(a * b)}. Mira una que sí llega.`));
        ui.espera(1700, () => { pa.set(g.a); pb.set(g.b); ui.lee(''); corre(g.a, g.b, () => ui.nota('Saltos negativos, veces negativas: cae del lado positivo.')); });
      });
    };
  },
});
;
//#archivo js/games/signos-condiciones.js
// Signos con dos condiciones (spec 2026-11-24-ejercicios-explora): se voltean los signos para que el PRODUCTO sea positivo y
// la SUMA negativa a la vez, dejando al menos un número positivo. Los resultados quedan tapados hasta comprobar.
// params = { factores }   state = { neg: [bool], tocado }
XG.juego('signos-condiciones', {
  ini: p => ({ neg: p.factores.map(() => false), tocado: false }),
  listo: s => !!s.tocado,
  vals: (s, p) => p.factores.map((f, i) => (s.neg[i] ? -f : f)),
  ok(s, p) { const v = p.factores.map((f, i) => (s.neg[i] ? -f : f)); return v.reduce((a, b) => a * b, 1) > 0 && v.reduce((a, b) => a + b, 0) < 0 && v.some(x => x > 0); },
  sol(p) {
    for (let m = 1; m < (1 << p.factores.length) - 1; m++) {
      const v = p.factores.map((f, i) => (m >> i & 1 ? -f : f));
      if (v.reduce((a, b) => a * b, 1) > 0 && v.reduce((a, b) => a + b, 0) < 0) return { neg: p.factores.map((_, i) => !!(m >> i & 1)), tocado: true };
    }
    return null;
  },
  texto(p) {
    const v = this.vals(this.solve(p), p);
    return `Por ejemplo, $${v.map(XG.par).join(' \\cdot ')} = ${v.reduce((a, b) => a * b, 1)}$ y $${v.map(XG.par).join(' + ')} = ${v.reduce((a, b) => a + b, 0)}$`;
  },
  monta(stage, p, ui) {
    const G = GAMES['signos-condiciones'];
    stage.innerHTML = `<div class="xp-fact">${p.factores.map((_, i) => `<button type="button" class="xp-f" data-i="${i}"></button>`).join('')}</div>
      <div class="xg-dos"><div class="xp-coin"><small>Producto</small><b>?</b><em>positivo</em></div><div class="xp-coin"><small>Suma</small><b>?</b><em>negativa</em></div></div>`;
    const bs = [...stage.querySelectorAll('.xp-f')], coins = [...stage.querySelectorAll('.xp-coin')];
    const draw = () => bs.forEach((b, i) => {
      const n = ui.s.neg[i], v = n ? -p.factores[i] : p.factores[i];
      b.classList.toggle('neg', n); b.textContent = XG.menos(v); b.setAttribute('aria-label', `${v}: cambiar el signo`);
    });
    stage.onclick = e => {
      const b = e.target.closest('.xp-f');
      if (!b || ui.locked) return;
      const i = +b.dataset.i;
      ui.set({ neg: ui.s.neg.map((x, k) => (k === i ? !x : x)), tocado: true });
      XS.flip(); xpTick(); draw();
      if (!xpStill()) b.animate([{ transform: 'rotateY(90deg)' }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    };
    draw(); ui.nota('Toca un número para cambiarle el signo. Deja al menos uno positivo.');
    function destapa(c, v, bien) {
      c.classList.toggle('neg', v < 0); c.classList.add(bien ? 'good' : 'bad'); c.classList.remove(bien ? 'bad' : 'good');
      c.querySelector('b').textContent = v > 0 ? `+${v}` : XG.menos(v);
      XS.flip();
      if (!xpStill()) c.animate([{ transform: 'rotateX(90deg) scale(.9)' }, { transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    function muestra(fin) {
      const v = G.vals(ui.s, p), prod = v.reduce((a, b) => a * b, 1), sum = v.reduce((a, b) => a + b, 0), n = ui.s.neg.filter(Boolean).length;
      destapa(coins[0], prod, prod > 0);
      ui.nota(`${n} ${n === 1 ? 'signo menos' : 'signos menos'}: ${n % 2 ? 'impar, producto negativo' : 'par, producto positivo'}.`);
      ui.espera(1300, () => {
        destapa(coins[1], sum, sum < 0);
        ui.lee(`$${v.map(XG.par).join(' + ')} = ${sum}$`);
        fin?.(v);
      });
    }
    return ok => {
      muestra(v => {
        if (ok) return;
        const todos = v.every(x => x < 0);
        ui.espera(1500, () => {
          if (todos) ui.nota('Cumple las dos, pero faltó dejar un número positivo. Así sí:');
          ui.espera(todos ? 1800 : 0, () => {
            ui.muestra(G.solve(p)); draw(); ui.lee('');
            coins.forEach(c => { c.classList.remove('good', 'bad', 'neg'); c.querySelector('b').textContent = '?'; });
            muestra();
          });
        });
      });
    };
  },
});
;
//#archivo js/games/potencia-signo.js
// Potencia con signo (spec 2026-11-24-ejercicios-explora): se arma ±(±b)^e para que valga `meta` llevando un menos adentro del
// paréntesis. El valor no se ve hasta comprobar. params = { base, max, meta }   state = { fuera, dentro, e, tocado }
XG.juego('potencia-signo', {
  ini: () => ({ fuera: false, dentro: false, e: 1 }),
  valor: (s, p) => (s.fuera ? -1 : 1) * (s.dentro ? -p.base : p.base) ** s.e,
  listo: s => !!s.dentro,
  ok: (s, p) => !!s.dentro && (s.fuera ? -1 : 1) * (-p.base) ** s.e === p.meta,
  sol(p) { for (let e = 1; e <= p.max; e++) for (const fuera of [false, true]) if ((fuera ? -1 : 1) * (-p.base) ** e === p.meta) return { fuera, dentro: true, e }; return null; },
  texto(p) { const s = this.solve(p); return `$${s.fuera ? '-' : ''}(-${p.base})^{${s.e}} = ${p.meta}$`; },
  monta(stage, p, ui) {
    const G = GAMES['potencia-signo'];
    stage.innerHTML = '<div class="xg-pot"></div><div class="xg-cadena"></div><div class="xg-perillas"></div>';
    const [pot, cad, per] = stage.children;
    const draw = () => {
      const s = ui.s, sw = (k, on, et) => `<button type="button" class="xg-sw${on ? ' on' : ''}" data-k="${k}" aria-pressed="${on}" aria-label="${et}">−</button>`;
      pot.innerHTML = `${sw('fuera', s.fuera, 'menos afuera')}<span class="xp-par">(</span>${sw('dentro', s.dentro, 'menos adentro')}<span class="xp-n">${p.base}</span><span class="xp-par">)</span><sup>${s.e}</sup>`;
    };
    pot.onclick = e => {
      const b = e.target.closest('.xg-sw');
      if (!b || ui.locked) return;
      const k = b.dataset.k;
      ui.set({ ...ui.s, [k]: !ui.s[k] }); XS.flip(); xpTick(); draw();
      pot.querySelector(`[data-k="${k}"]`).focus({ preventScroll: true });
      ui.nota(ui.s.dentro ? '' : 'Falta el menos de adentro.');
    };
    const pe = XG.perilla(ui, per, { et: 'Exponente', min: 1, max: p.max, v: 1, lee: () => '', on: e => { ui.set({ ...ui.s, e }); draw(); } });
    draw(); ui.nota('Toca los menos para encenderlos y arrastra el exponente.');
    // Escribe los factores, los empareja de a dos y al final aplica el menos de afuera.
    function corre(s, fin) {
      const n = s.e, dentro = (-p.base) ** n;
      let k = 0;
      cad.innerHTML = '';
      (function factor() {
        if (k < n) {
          cad.insertAdjacentHTML('beforeend', `<span class="xg-fac${k % 2 || k + 1 < n ? ` par${(k >> 1) % 2}` : ' solo'}">${XG.menos(-p.base)}</span>`);
          k++; XS.hop(k); return ui.espera(300, factor);
        }
        ui.lee(`$(-${p.base})^{${n}} = ${dentro}$`);
        ui.nota(n % 2 ? 'Un menos queda sin pareja: adentro da negativo.' : 'Los menos se emparejan todos: adentro da positivo.');
        ui.espera(1300, () => {
          if (s.fuera) { XS.flip(); ui.lee(`$-(-${p.base})^{${n}} = -(${dentro}) = ${-dentro}$`); }
          ui.espera(900, () => fin(s.fuera ? -dentro : dentro));
        });
      })();
    }
    return ok => {
      corre(ui.s, v => {
        if (ok) return ui.nota('El menos de afuera se aplica al final.');
        ui.nota(`Vale ${XG.menos(v)}, no ${XG.menos(p.meta)}. Mira la que sí.`);
        ui.espera(1500, () => { const g = G.solve(p); ui.muestra(g); ui.lee(''); pe.set(g.e); draw(); corre(g, () => {}); });
      });
    };
  },
});
;
//#archivo js/games/parentesis-justo.js
// Paréntesis justo (spec 2026-11-24-ejercicios-explora): se arrastra el dedo sobre la cuenta, del primer número al último que
// van dentro, para poner el paréntesis que la hace dar `meta`. No se calcula nada hasta comprobar.
// params = { expr: '5 - 8 * 3 - 1', meta }   state = { a, b } (número en que abre y número en que cierra)
(() => {
  const calc = { '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b };
  const lista = p => p.expr.split(' ');
  function toks(s, p) {
    let k = -1;
    const out = [];
    for (const t of lista(p)) {
      if (!/\d/.test(t)) { out.push(t); continue; }
      k++;
      if (s && k === s.a) out.push('(');
      out.push(t);
      if (s && k === s.b) out.push(')');
    }
    return out;
  }
  // Índice de la operación que sigue: dentro del paréntesis, × ÷ primero, de izquierda a derecha.
  function sigue(t) {
    const hi = t.indexOf(')'), a = hi < 0 ? 0 : t.lastIndexOf('(', hi) + 1, b = hi < 0 ? t.length : hi;
    for (const ops of ['*/', '+-']) for (let i = a; i < b; i++) if (t[i].length === 1 && ops.includes(t[i]) && i > a) return i;
    return -1;
  }
  function aplica(t, i) {
    const r = [...t];
    r.splice(i - 1, 3, String(calc[t[i]](+t[i - 1], +t[i + 1])));
    if (r[i - 2] === '(' && r[i] === ')') r.splice(i - 2, 3, r[i - 1]);
    return r;
  }
  const valor = t => { let x = [...t]; while (x.length > 1) x = aplica(x, sigue(x)); return +x[0]; };
  const numeros = p => lista(p).filter(t => /\d/.test(t)).length;
  const sol = p => { for (let a = 0; a < numeros(p); a++) for (let b = a + 1; b < numeros(p); b++) if (valor(toks({ a, b }, p)) === p.meta) return { a, b }; return null; };
  const SIM = { '*': '×', '/': '÷', '-': '−' };
  const linda = t => t.map((x, i) => (/^-\d/.test(x) && i && t[i - 1] !== '(' ? `(${x.replace('-', '−')})` : SIM[x] || x.replace('-', '−')));

  XG.juego('parentesis-justo', {
    toks, valor,
    ini: () => ({ a: -1, b: -1 }),
    listo: s => s.a >= 0 && s.b > s.a,
    ok: (s, p) => s.a >= 0 && s.b > s.a && valor(toks(s, p)) === p.meta,
    sol,
    texto: p => `$${toks(sol(p), p).join(' ').replace(/\*/g, '\\cdot').replace(/\//g, '\\div')} = ${p.meta}$`,
    monta(stage, p, ui) {
      stage.innerHTML = `<div class="xp-expr xg-sel"></div><p class="xg-igual">debe dar <b>${XG.menos(p.meta)}</b></p>`;
      const ex = stage.firstChild;
      let ancla = -1, dedo = null, pos = [];
      function draw() {
        const s = ui.s, hay = s.a >= 0;
        let k = -1, h = '';
        for (const t of lista(p)) {
          const num = /\d/.test(t);
          if (num) k++;
          const dentro = hay && (num ? k >= s.a && k <= s.b : k >= s.a && k < s.b);
          if (num && hay && k === s.a) h += `<span class="xp-par on">(</span>`;
          h += num ? `<button type="button" class="xp-n xg-num${dentro ? ' in' : ''}" data-n="${k}" aria-pressed="${dentro}">${t}</button>` : `<span class="xg-op${dentro ? ' in' : ''}">${SIM[t] || t}</span>`;
          if (num && hay && k === s.b) h += `<span class="xp-par on">)</span>`;
        }
        ex.innerHTML = h;
      }
      // Las posiciones se miden una vez por gesto: al aparecer el paréntesis la fila se corre y el dedo no debe saltar de número.
      const mide = () => { pos = [...ex.querySelectorAll('.xg-num')].map(b => { const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
      const cerca = e => {
        let best = -1, d = 1e9;
        pos.forEach(([x, y], n) => { const k = Math.hypot(e.clientX - x, (e.clientY - y) * 1.5); if (k < d) { d = k; best = n; } });
        return best;
      };
      const pon = n => {
        const s = { a: Math.min(ancla, n), b: Math.max(ancla, n) };
        if (s.a === ui.s.a && s.b === ui.s.b) return;
        ui.set(s); XS.tick(n); xpTick(); draw();
        ui.nota(s.a === s.b ? 'Sigue arrastrando hasta el último número que va adentro.' : '');
      };
      ex.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { ex.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mide(); const n = cerca(e);
        // Con un solo número marcado, tocar otro cierra ahí (sin arrastrar).
        if (!(ui.s.a >= 0 && ui.s.a === ui.s.b && n !== ui.s.a)) ancla = n;
        pon(n); };
      ex.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) pon(cerca(e)); };
      ex.onpointerup = ex.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      ex.onkeydown = e => {
        const b = e.target.closest('.xg-num');
        if (!b || ui.locked || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault(); e.stopPropagation();
        const n = +b.dataset.n;
        if (!(ui.s.a >= 0 && ui.s.a === ui.s.b && n !== ui.s.a)) ancla = n;
        pon(n); ex.querySelector(`[data-n="${n}"]`).focus({ preventScroll: true });
      };
      draw(); ui.nota('Pasa el dedo del primer número al último que van dentro del paréntesis.');
      function corre(s, fin) {
        let t = toks(s, p);
        const pinta = (i, nuevo) => {
          ex.innerHTML = linda(t).map((x, k) => `<span class="${/\d/.test(t[k]) ? `xp-n${k === nuevo ? ' new' : ''}` : t[k] === '(' || t[k] === ')' ? 'xp-par on' : `xg-op${k === i ? ' now' : ''}`}">${x}</span>`).join('');
        };
        pinta();
        (function paso() {
          if (t.length === 1) { ex.classList.add('done'); return fin(+t[0]); }
          const i = sigue(t);
          ui.espera(550, () => { pinta(i); XS.pop(); ui.espera(650, () => { const par = t[i - 2] === '(' && t[i + 2] === ')'; t = aplica(t, i); pinta(-1, par ? i - 2 : i - 1); XS.merge(); paso(); }); });
        })();
      }
      return ok => {
        ui.nota('');
        corre(ui.s, v => {
          if (ok) return ui.nota('Primero el paréntesis; después, lo de afuera.');
          ui.nota(`Ahí da ${XG.menos(v)}. Mira dónde iba.`);
          ui.espera(1500, () => { ex.classList.remove('done'); corre(sol(p), () => {}); });
        });
      };
    },
  });
})();
;
//#archivo js/games/lanza-ficha.js
// Lanza la ficha (spec 2026-11-24-ejercicios-explora; en movimiento): sale una operación y la ficha espera en su primer número.
// Se estira el impulso (sentido y número de pasos) y al soltar la ficha sale saltando. Tres tiros; se perdona un fallo.
// params = { min, max, tope, tiros: [{ t: '-5 - (-9)', desde, d }] }   state = { n: tiros hechos, fallos }
// lanza-fraccion: lo mismo con `den`: cada marca es 1/den (desde y d se dan en marcas).
(() => {
  const MAXF = 2;
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  const val = (x, p) => { if (!p.den) return `${x}`; const g = mcd(x, p.den) || 1, n = x / g, d = p.den / g; return d === 1 ? `${n}` : `\\tfrac{${n}}{${d}}`; };
  for (const name of ['lanza-ficha', 'lanza-fraccion', 'lanza-porciento', 'lanza-potencia']) XG.juego(name, {
    ini: () => ({ n: 0, fallos: 0 }),
    listo: (s, p) => s.n >= p.tiros.length || s.fallos >= MAXF,
    ok: (s, p) => s.n >= p.tiros.length && s.fallos < MAXF,
    sol: p => ({ n: p.tiros.length, fallos: 0 }),
    tira(s, k, p) {
      if (s.n >= p.tiros.length || s.fallos >= MAXF) return s;
      return k === p.tiros[s.n].d ? { ...s, n: s.n + 1 } : { ...s, fallos: s.fallos + 1 };
    },
    texto: p => p.tiros.map(t => `$${t.t} = ${t.res || val(t.desde + t.d, p)}$`).join(', '),
    monta(stage, p, ui) {
      const G = GAMES[name], cara = x => (p.den ? '' : x);
      stage.innerHTML = '<div class="xg-op-grande"></div><div class="xp-dots" aria-hidden="true"></div><div class="xg-lona"></div><div class="xg-perillas"></div>';
      const [op, dots, lona, per] = stage.children;
      const R = XG.recta(lona, { min: p.min, max: p.max, alto: 150, ...(p.marcas ? { rotulos: Object.keys(p.marcas).map(Number), et: v => p.marcas[v] } : p.cada ? { cada: p.cada } : p.den ? { rotulos: [0, p.den / 2, p.den, p.den * 1.5], et: v => ({ 0: '0', [p.den / 2]: '1/2', [p.den]: '1', [p.den * 1.5]: '3/2' })[v] } : {}) });
      let vuela = false;
      const tiro = () => p.tiros[Math.min(ui.s.n, p.tiros.length - 1)];
      const quieta = (x, cls) => { R.din.innerHTML = XG.ficha(R.X(x), R.y, cara(x), cls); };
      const pone = () => {
        dots.innerHTML = p.tiros.map((_, k) => `<i class="${k < ui.s.n ? 'done' : k === ui.s.n ? 'now' : ''}"></i>`).join('');
        op.innerHTML = tex(`$${tiro().t}$`); quieta(tiro().desde); pe?.set(0);
      };
      let pe = null;
      pe = XG.perilla(ui, per, { et: 'Impulso', min: p.piso ?? -p.tope, max: p.tope, v: 0, quieta: () => vuela || G.listo(ui.s, p),
        lee: v => (v ? `${Math.abs(v)} ${p.den ? (Math.abs(v) === 1 ? p.unidad[0] : p.unidad[1]) : Math.abs(v) === 1 ? 'paso' : 'pasos'} a la ${v > 0 ? 'derecha' : 'izquierda'}` : 'estira y suelta'), on() {}, suelta: lanza });
      function lanza(k) {
        if (!k || vuela || G.listo(ui.s, p)) return;
        vuela = true;
        const t = tiro(), dir = Math.sign(k), n = Math.abs(k);
        let i = 0, estela = '';
        ui.nota('');
        (function brinco() {
          const a = t.desde + dir * i, b = a + dir;
          if (i >= n || b < p.min || b > p.max) return cae(t.desde + dir * i, i < n);
          i++;
          ui.tween(0, 1, 170, u => {
            const x = R.X(a) + (R.X(b) - R.X(a)) * u, y = R.y - 26 * 4 * u * (1 - u);
            R.din.innerHTML = estela + XG.ficha(x, y, cara(u < 0.5 ? a : b), dir < 0 ? 'flip' : '');
          }, () => { estela += XG.arco(R.X(a), R.X(b), R.y, 11, `xp-hop${dir < 0 ? ' flip' : ''}`); XS.hop(i); brinco(); });
        })();
        function cae(x, fuera) {
          const antes = ui.s, s = G.tira(antes, k, p), bien = s.n > antes.n;
          ui.set(s);
          R.din.innerHTML = estela + `<circle class="xp-ring${bien ? ' good' : ' bad'}" cx="${R.X(x)}" cy="${R.y}" r="20"/>` + XG.ficha(R.X(x), R.y, cara(x));
          bien ? XS.merge() : XS.nope();
          ui.lee(bien ? `$${t.t} = ${t.res || val(x, p)}$` : '');
          const sentido = Math.sign(t.d) !== dir;
          ui.nota(bien ? (s.n >= p.tiros.length ? 'Ya están todos. Comprueba.' : 'Ahí es.')
            : fuera ? 'Se salió de la recta.' : sentido ? 'Era hacia el otro lado.' : n < Math.abs(t.d) ? `Faltaron ${p.unidad?.[1] || 'pasos'}.` : `Sobraron ${p.unidad?.[1] || 'pasos'}.`, !bien);
          if (!bien && s.fallos >= MAXF) ui.espera(1500, () => !ui.locked && ui.nota('Se acabaron los intentos. Comprueba para ver cómo era.', true));
          if (G.listo(s, p)) { vuela = false; dots.innerHTML = p.tiros.map((_, j) => `<i class="${j < s.n ? 'done' : ''}"></i>`).join(''); return; }
          ui.espera(1700, () => { vuela = false; ui.lee(''); ui.nota(bien ? 'Siguiente tiro.' : 'Otra vez: ya no puedes fallar más.'); pone(); });
        }
      }
      pone(); ui.nota(p.pie || 'Estira el impulso hacia donde va la operación y suelta.');
      return ok => {
        ui.nota(ok ? 'Todos en su lugar.' : 'Mira cómo era.');
        if (ok) return;
        const t = tiro();
        ui.espera(400, () => { ui.lee(`$${t.t} = ${t.res || val(t.desde + t.d, p)}$`); XG.camina(ui, R, t.desde, [t], { cara }); });
      };
    },
  });
})();
;
//#archivo js/games/fracciones-escena.js
// Ejercicios de fracciones con la escena de barras de la explicación (pu-cm-2; spec 2026-11-24-ejercicios-explora). Kit en
// js/games/explora-kit.js. Mientras se responde no se dibuja la barra de la respuesta; al comprobar se dibuja y se compara.
//   corta-iguales     correr los cortes hasta que las partes sean iguales y tomar las que se piden.   state { c: [cortes], t: [partes tomadas] }
//   fraccion-gemela   armar una fracción que mida lo mismo, con más partes.                           state { n, d }
//   entre-fracciones  armar una fracción que caiga entre dos.                                         state { n, d }
//   piezas-exactas    escoger tres pedazos que llenen justo lo pedido.                                 state { en: [pieza | null] }
//   resta-falta       armar lo que salió para que quede lo que quedó.                                 state { n, d }
//   parte-de-parte    marcar en un terreno una parte de otra parte.                                   state { w, h }
//   total-escondido   de una parte, reconstruir el total.                                             state { parte, n }
(() => {
  const tf = (n, d) => (d === 1 ? `${n}` : `\\tfrac{${n}}{${d}}`);
  const W = 340, X0 = 20, BW = 300;
  // Barra cortada en d partes con n llenas (la escena «barras»). f: fracción llena si va a medias de una animación.
  const barra = (y, h, n, d, o = {}) => {
    const x = o.x ?? X0, w = o.w ?? BW, f = o.f ?? n / d;
    let s = `<rect class="xb-out" x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>`;
    if (f > 0) s += `<rect class="xb-fill ${o.cls || ''}" x="${x}" y="${y}" width="${w * Math.min(1, f)}" height="${h}" rx="7"/>`;
    if (d <= 30) for (let k = 1; k < d; k++) s += `<line class="xb-cut" x1="${x + w * k / d}" y1="${y}" x2="${x + w * k / d}" y2="${y + h}"/>`;
    if (o.et) s += `<text class="xp-tag" x="${x + w / 2}" y="${y - 8}">${o.et}</text>`;
    return s;
  };
  const lienzo = (box, alto) => { box.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Barras de fracciones"></svg>`; return box.firstChild; };
  // Dos perillas: arriba y abajo de la fracción que se arma; el renglón la escribe.
  function armaFraccion(ui, box, max) {
    const lee = () => ui.lee(ui.s.n ? `$\\dfrac{${ui.s.n}}{${ui.s.d}}$` : '');
    const a = XG.perilla(ui, box, { et: 'Numerador', min: 0, max, v: 0, lee: () => '', on: n => { ui.set({ ...ui.s, n }); lee(); } });
    const b = XG.perilla(ui, box, { et: 'Denominador', min: 1, max, v: 1, lee: () => '', on: d => { ui.set({ ...ui.s, d }); lee(); } });
    return { pon(n, d) { a.set(n); b.set(d); ui.lee(`$\\dfrac{${n}}{${d}}$`); } };
  }
  const iniF = () => ({ n: 0, d: 1 });
  const busca = (max, f) => { for (let d = 1; d <= max; d++) for (let n = 1; n <= max; n++) if (f(n, d)) return { n, d }; return null; };
  const igual = (n, d, [a, b]) => n * b === a * d;

  // ---------------------------------------------------------------------------------------------------- corta-iguales
  const partes = (s, p) => { const c = [0, ...s.c, p.ticks]; return c.slice(1).map((x, i) => x - c[i]); };
  XG.juego('corta-iguales', {
    ini: p => ({ c: [...p.ini], t: Array(p.n).fill(false) }),
    listo: s => s.t.some(Boolean),
    ok: (s, p) => partes(s, p).every(x => x === p.ticks / p.n) && s.t.filter(Boolean).length === p.toma,
    sol: p => ({ c: p.ini.map((_, i) => (i + 1) * p.ticks / p.n), t: Array.from({ length: p.n }, (_, i) => i < p.toma) }),
    texto: p => `${p.n} partes iguales de ${p.ticks / p.n} cm y ${p.toma} tomadas: $${tf(p.toma, p.n)}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-libre"></div>';
      const svg = lienzo(stage.firstChild, 150), X = v => X0 + v / p.ticks * BW, Y = 44, H = 52;
      let arr = -1, dedo = null, mal = false;
      const draw = () => {
        const c = [0, ...ui.s.c, p.ticks], bien = p.ticks / p.n;
        let h = `<rect class="xb-out" x="${X0}" y="${Y}" width="${BW}" height="${H}" rx="7"/>`;
        ui.s.t.forEach((t, i) => {
          h += `<rect class="${t ? 'xb-fill' : 'xg-hueco'}${mal && c[i + 1] - c[i] !== bien ? ' bad' : ''}" x="${X(c[i]) + 1}" y="${Y}" width="${X(c[i + 1]) - X(c[i]) - 2}" height="${H}" rx="5" data-p="${i}" role="button" tabindex="${ui.locked ? -1 : 0}" aria-pressed="${t}" aria-label="Parte ${i + 1}"/>`;
          if (ui.locked) h += `<text class="xp-tag${t ? ' xg-sobre' : ''}" x="${(X(c[i]) + X(c[i + 1])) / 2}" y="${Y + 32}">${c[i + 1] - c[i]}</text>`;
        });
        for (let k = 0; k <= p.ticks; k++) h += `<line class="xb-tk" x1="${X(k)}" y1="${Y + H + 6}" x2="${X(k)}" y2="${Y + H + (k % 5 ? 11 : 15)}"/>`;
        ui.s.c.forEach((v, i) => { h += `<g class="xg-corte${i === arr ? ' on' : ''}" tabindex="${ui.locked ? -1 : 0}" role="slider" aria-label="Corte ${i + 1}" aria-valuemin="1" aria-valuemax="${p.ticks - 1}" aria-valuenow="${v}" data-c="${i}"><line x1="${X(v)}" y1="${Y - 14}" x2="${X(v)}" y2="${Y + H + 6}"/><circle cx="${X(v)}" cy="${Y - 18}" r="11"/><path d="M${X(v) - 4} ${Y - 18} h8"/></g>`; });
        svg.innerHTML = h;
      };
      const pon = (i, v) => {
        const c = ui.s.c, lo = (c[i - 1] ?? 0) + 1, hi = (c[i + 1] ?? p.ticks) - 1;
        v = XG.clamp(v, lo, hi);
        if (v === c[i]) return;
        ui.set({ ...ui.s, c: c.map((x, k) => (k === i ? v : x)) }); XS.tick(v); xpTick(); draw();
      };
      const toma = i => { ui.set({ ...ui.s, t: ui.s.t.map((t, k) => (k === i ? !t : t)) }); XS.pop(); xpTick(); draw(); };
      const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * 150 / r.height]; };
      svg.onpointerdown = e => {
        if (ui.locked || dedo != null) return;
        const [x, y] = at(e);
        const corte = e.target.closest?.('[data-c]');
        if (y > Y - 2 && !corte) {   // tocar una parte la toma o la suelta
          const b = e.target.closest?.('[data-p]');
          if (b) toma(+b.dataset.p);
          return;
        }
        arr = corte ? +corte.dataset.c : ui.s.c.reduce((m, v, i) => (Math.abs(X(v) - x) < Math.abs(X(ui.s.c[m]) - x) ? i : m), 0);
        if (!corte && Math.abs(X(ui.s.c[arr]) - x) > 24) { arr = -1; return; }
        dedo = e.pointerId;
        try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ }
        draw();
      };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) pon(arr, Math.round((at(e)[0] - X0) / BW * p.ticks)); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) { dedo = null; arr = -1; draw(); } };
      svg.onkeydown = e => {
        const b = e.target.closest('[data-p]');
        if (b && !ui.locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); const i = +b.dataset.p; toma(i); svg.querySelector(`[data-p="${i}"]`)?.focus({ preventScroll: true }); return; }
        const g = e.target.closest('[data-c]'), k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!g || !k || ui.locked) return;
        e.preventDefault(); e.stopPropagation();
        const i = +g.dataset.c; pon(i, ui.s.c[i] + k); svg.querySelector(`[data-c="${i}"]`)?.focus({ preventScroll: true });
      };
      draw(); ui.nota('Arrastra las manijas de arriba. Toca una parte para tomarla.');
      return ok => {
        mal = !ok; draw();
        const tam = partes(ui.s, p), par = tam.every(x => x === tam[0]);
        ui.nota(ok ? 'Todas miden lo mismo: ahora sí tiene nombre.' : !par ? `Las partes miden ${tam.join(', ')} cm: no son iguales.` : 'Son iguales, pero no tomaste las que se pedían.');
        if (!ok) ui.espera(2600, () => { ui.muestra(GAMES['corta-iguales'].solve(p)); mal = false; XS.merge(); draw(); });
        else ui.lee(`$${tf(p.toma, p.n)}$`);
      };
    },
  });

  // -------------------------------------------------------------------------------------------------- fraccion-gemela
  XG.juego('fraccion-gemela', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.d > p.a[1] && s.n > 0 && igual(s.n, s.d, p.a),
    sol: p => busca(p.max, (n, d) => d > p.a[1] && igual(n, d, p.a)),
    texto(p) { const s = this.solve(p); return `Por ejemplo, $${tf(p.a[0], p.a[1])} = ${tf(s.n, s.d)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 126), arma = (n, d, f) => { svg.innerHTML = barra(22, 36, ...p.a, { et: p.a.join('/') }) + (n ? barra(78, 36, n, d, { f, cls: 'b' }) : `<rect class="xg-tapada" x="${X0}" y="78" width="${BW}" height="36" rx="7"/><text class="xp-tag" x="170" y="102">?</text>`); };
      arma();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('Tu barra se dibuja al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, n / d, 1100, f => arma(n, d, f), fin);
      return ok => {
        const { n, d } = ui.s;
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota(`Termina en el mismo punto, con ${d} partes más pequeñas.`);
          ui.nota(igual(n, d, p.a) ? `Mide lo mismo, pero ${d} no es más de ${p.a[1]}.` : n > d ? 'La tuya pasa de la barra entera.' : n / d > p.a[0] / p.a[1] ? 'La tuya es más larga.' : 'La tuya es más corta.');
          ui.espera(2000, () => { const s = GAMES['fraccion-gemela'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta sí termina en el mismo punto.')); });
        });
      };
    },
  });

  // ------------------------------------------------------------------------------------------------- entre-fracciones
  XG.juego('entre-fracciones', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.n * p.lo[1] > p.lo[0] * s.d && s.n * p.hi[1] < p.hi[0] * s.d,
    sol: p => busca(p.max, (n, d) => n * p.lo[1] > p.lo[0] * d && n * p.hi[1] < p.hi[0] * d),
    texto(p) { const s = this.solve(p); return `Por ejemplo, $${tf(...p.lo)} < ${tf(s.n, s.d)} < ${tf(...p.hi)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 118), Y = 74, X = v => X0 + Math.min(1.05, v) * BW;
      const pinta = (m = '') => {
        let h = `<rect class="xg-franja" x="${X(p.lo[0] / p.lo[1])}" y="${Y - 30}" width="${X(p.hi[0] / p.hi[1]) - X(p.lo[0] / p.lo[1])}" height="38" rx="4"/><line class="xp-ax" x1="${X0}" y1="${Y}" x2="${X0 + BW}" y2="${Y}"/>`;
        for (const [v, t] of [[0, '0'], [1, '1']]) h += `<line class="xp-tk z" x1="${X(v)}" y1="${Y - 6}" x2="${X(v)}" y2="${Y + 6}"/><text class="xp-lb z" x="${X(v)}" y="${Y + 24}">${t}</text>`;
        [p.lo, p.hi].forEach((f, k) => { h += `<line class="xg-hilo" x1="${X(f[0] / f[1])}" y1="${Y - 34}" x2="${X(f[0] / f[1])}" y2="${Y + 8}"/><text class="xp-tag" x="${X(f[0] / f[1]) + (k ? 12 : -12)}" y="${Y - 42}">${f.join('/')}</text>`; });
        svg.innerHTML = h + m;
      };
      pinta();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('Tu fracción cae en la recta al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, Math.min(1.05, n / d), 1200, v => pinta(`<line class="xp-trail" x1="${X0}" y1="${Y}" x2="${X(v)}" y2="${Y}"/><g class="xp-tok"><circle cx="${X(v)}" cy="${Y}" r="9"/></g>`), fin);
      return ok => {
        const { n, d } = ui.s, v = n / d, a = p.lo[0] / p.lo[1], b = p.hi[0] / p.hi[1];
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota('Cae entre las dos.');
          ui.nota(v === a || v === b ? 'Vale lo mismo que una de las dos: no queda en medio.' : v < a ? `Queda antes de ${p.lo.join('/')}.` : v > 1 ? 'Pasa del 1.' : `Queda después de ${p.hi.join('/')}.`);
          ui.espera(2000, () => { const s = GAMES['entre-fracciones'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta sí cae entre las dos.')); });
        });
      };
    },
  });

  // --------------------------------------------------------------------------------------------------- piezas-exactas
  const suma = (en, p) => en.reduce((t, i) => t + p.den * p.piezas[i][0] / p.piezas[i][1], 0);   // en partes de 1/den
  XG.juego('piezas-exactas', {
    ini: p => ({ en: Array(p.k).fill(null) }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === p.k && suma(s.en, p) === p.den * p.meta[0] / p.meta[1],
    sol(p) {
      const n = p.piezas.length;
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) if (suma([a, b, c], p) === p.den * p.meta[0] / p.meta[1]) return { en: [a, b, c] };
      return null;
    },
    texto(p) { return `$${this.solve(p).en.map(i => tf(...p.piezas[i])).join(' + ')} = ${tf(...p.meta)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
      const [lona, frase, tray] = stage.children, svg = lienzo(lona, 92), Y = 34, H = 42, BW = 280, xm = X0 + BW * p.meta[0] / p.meta[1];
      const pinta = (m = '') => { svg.innerHTML = `<rect class="xb-out" x="${X0}" y="${Y}" width="${BW}" height="${H}" rx="7"/>${m}<line class="xg-marca" x1="${xm}" y1="${Y - 10}" x2="${xm}" y2="${Y + H + 8}"/><text class="xp-tag xg-ok" x="${xm - 4}" y="${Y - 14}">${p.meta.join('/')}</text>`; };
      const cara = i => tex(`$${tf(...p.piezas[i])}$`);
      const draw = () => {
        frase.innerHTML = ui.s.en.map((i, k) => `${k ? '<span>+</span>' : ''}<button type="button" class="xp-slot xg-ch${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? cara(i) : ''}</button>`).join('');
        tray.innerHTML = p.piezas.map((_, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${cara(i)}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      pinta(); draw(); ui.nota('Los pedazos se ponen en la barra al comprobar.');
      const corre = (en, fin) => {
        let x = 0, h = '', k = 0;
        (function pieza() {
          if (k >= en.length) return fin(x);
          const [a, b] = p.piezas[en[k]], w = a / b, x0 = x, cls = ['', ' b', ' c'][k % 3];
          const r = (f, t) => `<rect class="xb-fill xg-pz${cls}" x="${X0 + x0 * BW}" y="${Y}" width="${Math.max(0, BW * f - 2)}" height="${H}" rx="5"/>${t ? `<text class="xp-tag xg-sobre" x="${X0 + (x0 + w / 2) * BW}" y="${Y + 27}">${a}/${b}</text>` : ''}`;
          ui.tween(0, w, 650, f => pinta(h + r(f)), () => { h += r(w, true); x += w; k++; XS.hop(k * 2); pinta(h); ui.espera(250, pieza); });
        })();
      };
      // Con la marca por denominador si todas caben; si no, con uno más fino.
      const cuenta = en => { const d = en.every(i => p.meta[1] % p.piezas[i][1] === 0) ? p.meta[1] : p.den; ui.lee(`$${en.map(i => tf(d * p.piezas[i][0] / p.piezas[i][1], d)).join(' + ')} = ${tf(suma(en, p) * d / p.den, d)}$`); };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, x => {
          cuenta(ui.s.en);
          if (ok) return ui.nota('Justo hasta la marca.');
          ui.nota(x > p.meta[0] / p.meta[1] ? 'Se pasa de la marca.' : 'No alcanza la marca.');
          ui.espera(2000, () => { const s = GAMES['piezas-exactas'].solve(p); ui.muestra(s); draw(); tray.hidden = true; ui.lee(''); corre(s.en, () => { cuenta(s.en); ui.nota('Estas tres sí.'); }); });
        });
      };
    },
  });

  // ------------------------------------------------------------------------------------------------------ resta-falta
  XG.juego('resta-falta', {
    ini: iniF,
    listo: s => s.n > 0 && s.d > 1,
    ok: (s, p) => s.n > 0 && (p.de[0] * s.d - s.n * p.de[1]) * p.queda[1] === p.queda[0] * p.de[1] * s.d,
    sol: p => busca(p.max, (n, d) => (p.de[0] * d - n * p.de[1]) * p.queda[1] === p.queda[0] * p.de[1] * d),
    texto(p) { const s = this.solve(p); return `$${tf(...p.de)} - ${tf(s.n, s.d)} = ${tf(...p.queda)}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 140), y = 26;
      const pinta = (quita = 0) => {
        const a = p.de[0] / p.de[1], q = p.queda[0] / p.queda[1], v = Math.max(0, a - quita);
        svg.innerHTML = barra(y, 34, 0, 1, { f: v, et: `antes: ${p.de.join('/')}` }) + (quita ? `<rect class="xg-quita" x="${X0 + BW * v}" y="${y}" width="${BW * (a - v)}" height="34" rx="4"/>` : '')
          + barra(96, 34, ...p.queda, { et: `después: ${p.queda.join('/')}`, cls: 'b' }) + `<line class="xg-hilo" x1="${X0 + BW * q}" y1="${y - 4}" x2="${X0 + BW * q}" y2="130"/>`;
      };
      pinta();
      const pf = armaFraccion(ui, stage.lastChild, p.max);
      ui.nota('El gasto se descuenta al comprobar.');
      const corre = (n, d, fin) => ui.tween(0, n / d, 1200, pinta, fin);
      return ok => {
        const { n, d } = ui.s, queda = p.de[0] / p.de[1] - n / d, q = p.queda[0] / p.queda[1];
        ui.nota('');
        corre(n, d, () => {
          if (ok) return ui.nota('Queda justo lo que marca ahora.');
          ui.nota(queda > q ? `Así quedaría más de ${p.queda.join('/')}: se gastó más.` : queda < 0 ? 'Es más de lo que había en el tanque.' : `Así quedaría menos de ${p.queda.join('/')}: se gastó menos.`);
          ui.espera(2000, () => { const s = GAMES['resta-falta'].solve(p); pf.pon(s.n, s.d); corre(s.n, s.d, () => ui.nota('Esta es.')); });
        });
      };
    },
  });

  // --------------------------------------------------------------------------------------------------- parte-de-parte
  const celdas = p => p.cols * p.filas * p.de[0] * p.parte[0] / (p.de[1] * p.parte[1]);
  XG.juego('parte-de-parte', {
    ini: () => ({ w: 0, h: 0 }),
    listo: s => s.w > 0 && s.h > 0,
    ok: (s, p) => s.w * s.h === celdas(p),
    sol: p => ({ w: p.cols * p.de[0] / p.de[1], h: p.filas * p.parte[0] / p.parte[1] }),
    texto: p => `$${tf(...p.parte)} \\cdot ${tf(...p.de)} = ${tf(p.de[0] * p.parte[0], p.de[1] * p.parte[1])}$: ${celdas(p)} de los ${p.cols * p.filas} lotes`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-libre"></div>';
      const C = 40, H = p.filas * C + 12, x0 = (W - p.cols * C) / 2, svg = lienzo(stage.firstChild, H);
      let dedo = null, guia = 0, tocado = false;
      const draw = () => {
        let h = '';
        for (let f = 0; f < p.filas; f++) for (let c = 0; c < p.cols; c++) h += `<rect class="xg-lote${guia && c < p.cols * p.de[0] / p.de[1] ? ' de' : ''}" x="${x0 + c * C + 1.5}" y="${6 + f * C + 1.5}" width="${C - 3}" height="${C - 3}" rx="6"/>`;
        if (ui.s.w) h += `<rect class="xg-siembra${guia === 2 ? ' good' : ''}" x="${x0 + 1.5}" y="7.5" width="${ui.s.w * C - 3}" height="${ui.s.h * C - 3}" rx="7"/>`;
        const ex = x0 + Math.max(0.5, ui.s.w) * C, ey = 6 + Math.max(0.5, ui.s.h) * C;
        if (!ui.locked) h += (tocado ? '' : `<circle class="xp-halo" cx="${ex}" cy="${ey}" r="11"/>`) + `<g class="xp-tok"><circle cx="${ex}" cy="${ey}" r="10"/></g>`;
        svg.innerHTML = h;
      };
      const pon = (w, h) => { w = XG.clamp(w, 1, p.cols); h = XG.clamp(h, 1, p.filas); tocado = true; if (w !== ui.s.w || h !== ui.s.h) { ui.set({ w, h }); XS.tick(w * h % 9); xpTick(); svg.setAttribute('aria-valuenow', w * h); } draw(); };
      const mueve = e => { const r = svg.getBoundingClientRect(); pon(Math.round(((e.clientX - r.left) * W / r.width - x0) / C), Math.round(((e.clientY - r.top) * H / r.height - 6) / C)); };
      svg.setAttribute('tabindex', '0'); svg.setAttribute('role', 'slider'); svg.setAttribute('aria-label', 'Terreno: mueve la esquina con las flechas'); svg.setAttribute('aria-valuemin', '0'); svg.setAttribute('aria-valuemax', p.cols * p.filas); svg.setAttribute('aria-valuenow', '0');
      svg.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mueve(e); };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) mueve(e); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      svg.onkeydown = e => {
        const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key];
        if (!k || ui.locked) return;
        e.preventDefault(); e.stopPropagation(); pon(ui.s.w + k[0], ui.s.h + k[1]);
      };
      draw(); ui.nota('Arrastra la esquina para marcar los lotes.');
      return ok => {
        const n = ui.s.w * ui.s.h;
        ui.lee(`$${n}\\text{ de }${p.cols * p.filas}$`);
        ui.nota(ok ? 'Justo esa parte del terreno.' : `Marcaste ${n} de ${p.cols * p.filas} lotes.`);
        guia = ok ? 2 : 0; draw();
        if (!ok) ui.espera(1800, () => {
          guia = 1; draw(); XS.pop(); ui.nota('Primero, lo sembrado.');
          ui.espera(1600, () => { ui.muestra(GAMES['parte-de-parte'].solve(p)); guia = 2; XS.merge(); draw(); ui.nota('Después, la parte de eso.'); ui.lee(`$${celdas(p)}\\text{ de }${p.cols * p.filas}$`); });
        });
      };
    },
  });

  // -------------------------------------------------------------------------------------------------- total-escondido
  XG.juego('total-escondido', {
    ini: () => ({ parte: 1, n: 1 }),
    listo: s => s.n > 1 && s.parte > 1,
    ok: (s, p) => s.n === p.frac[1] && s.parte * p.frac[0] === p.vale,
    sol: p => ({ n: p.frac[1], parte: p.vale / p.frac[0] }),
    texto: p => `Cada parte vale $${p.vale} \\div ${p.frac[0]} = ${p.vale / p.frac[0]}$ y son ${p.frac[1]} partes: $${p.vale / p.frac[0] * p.frac[1]}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-perillas"></div>';
      const svg = lienzo(stage.firstChild, 104), Y = 36;
      const pinta = (parte, n, f = 1) => {
        const w = Math.min(44, BW / Math.max(n, 1)), x = X0 + (BW - w * n) / 2;
        let h = `<text class="xp-tag" x="170" y="18">${p.frac.join('/')} del total = ${p.vale}</text>`;
        for (let k = 0; k < n * f; k++) h += `<rect class="${k < p.frac[0] ? 'xb-fill' : 'xb-out'}" x="${x + k * w + 1}" y="${Y}" width="${w - 2}" height="38" rx="5"/>` + (parte ? `<text class="xp-tag${k < p.frac[0] ? ' xg-sobre' : ''}" x="${x + (k + 0.5) * w}" y="${Y + 25}">${parte}</text>` : '');
        if (!n) h += `<rect class="xg-tapada" x="${X0}" y="${Y}" width="${BW}" height="38" rx="7"/><text class="xp-tag" x="170" y="${Y + 25}">?</text>`;
        svg.innerHTML = h;
      };
      pinta(0, 0);
      const pa = XG.perilla(ui, stage.lastChild, { et: 'Cada parte vale', min: 1, max: 12, v: 1, lee: () => '', on: parte => ui.set({ ...ui.s, parte }) });
      const pb = XG.perilla(ui, stage.lastChild, { et: 'Partes del total', min: 1, max: 10, v: 1, lee: () => '', on: n => ui.set({ ...ui.s, n }) });
      ui.nota('Decide en cuántas partes va el total y cuánto vale cada una.');
      const corre = (parte, n, fin) => ui.tween(0, 1, 250 * n, f => pinta(parte, n, f), () => { pinta(parte, n); ui.lee(`$${n < p.frac[0] ? '' : `${p.frac[0]} \\cdot ${parte} = ${p.frac[0] * parte} \\quad `}${n} \\cdot ${parte} = ${n * parte}$`); fin(); });
      return ok => {
        const { parte, n } = ui.s;
        ui.nota('');
        corre(parte, n, () => {
          if (ok) return ui.nota('De la parte al total: primero una parte, después todas.');
          ui.nota(n !== p.frac[1] ? `El total no va en ${n} partes: mira el denominador.` : `${p.frac[0]} partes de ${parte} no suman ${p.vale}.`);
          ui.espera(2200, () => { const s = GAMES['total-escondido'].solve(p); pa.set(s.parte); pb.set(s.n); corre(s.parte, s.n, () => ui.nota('Así sí cuadra.')); });
        });
      };
    },
  });
})();
;
//#archivo js/games/porcentajes-escena.js
// Ejercicios de decimales y porcentajes con las escenas de la explicación (pu-cm-3; spec 2026-11-24-ejercicios-explora). Kit en
// js/games/explora-kit.js. La escena no dice el resultado mientras se responde; al comprobar ejecuta la respuesta.
//   rejilla-otra        pintar un porcentaje en una rejilla que no es de 100.            state { k }
//   que-porcentaje      decir qué porcentaje es una parte.                               state { v } (de 5 en 5)
//   pedazos-porciento   escoger tres pedazos del total que suman el porcentaje pedido.   state { en }
//   etiqueta-vieja      hallar el precio de antes de un descuento.                       state { v } (de 5 en 5)
//   vuelta-al-precio    cuánto bajar para deshacer un aumento.                           state { v } (de 5 en 5)
//   factor-final        qué queda tras dos cambios seguidos.                             state { v }
(() => {
  const W = 340, X0 = 20, BW = 300;
  const num = x => String(Math.round(x * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const lienzo = (box, alto) => { box.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 ${W} ${alto}" role="img" aria-label="Escena del porcentaje"></svg>`; return box.firstChild; };
  // Barra de ancho proporcional a v (max es el valor del ancho completo) con rótulo arriba.
  const barra = (y, v, max, cls, et) => `<rect class="xb-fill ${cls}" x="${X0}" y="${y}" width="${Math.max(0, BW * v / max)}" height="30" rx="6"/>${et ? `<text class="xg-et" x="${X0}" y="${y - 7}">${et}</text>` : ''}`;

  // ------------------------------------------------------------------------------------------------------ rejilla-otra
  const meta = p => p.cols * p.filas * p.pct / 100;
  XG.juego('rejilla-otra', {
    ini: () => ({ k: 0 }),
    listo: s => s.k > 0,
    ok: (s, p) => s.k === meta(p),
    sol: p => ({ k: meta(p) }),
    texto: p => `${meta(p)} de las ${p.cols * p.filas} sillas: $${p.pct / 100} \\cdot ${p.cols * p.filas} = ${meta(p)}$`,
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div>';
      const C = 32, H = p.filas * C + 12, x0 = (W - p.cols * C) / 2, svg = lienzo(stage.firstChild, H), tot = p.cols * p.filas;
      let dedo = null, marca = 0;
      const draw = () => {
        let h = '';
        for (let i = 0; i < tot; i++) h += `<rect class="xg-lote${i < ui.s.k ? ' on' : ''}${marca && i < marca ? ' de' : ''}" x="${x0 + (i % p.cols) * C + 2}" y="${6 + Math.floor(i / p.cols) * C + 2}" width="${C - 4}" height="${C - 4}" rx="7"/>`;
        svg.innerHTML = h; svg.setAttribute('aria-valuenow', ui.s.k);
      };
      const pon = k => { k = XG.clamp(k, 0, tot); if (k === ui.s.k) return; ui.set({ k }); XS.tick(k % 12); xpTick(); draw(); };
      const mueve = e => {
        const r = svg.getBoundingClientRect(), f = XG.clamp(Math.floor(((e.clientY - r.top) * H / r.height - 6) / C), 0, p.filas - 1);
        pon(f * p.cols + XG.clamp(Math.ceil(((e.clientX - r.left) * W / r.width - x0) / C), 0, p.cols));
      };
      for (const [a, v] of [['tabindex', '0'], ['role', 'slider'], ['aria-label', 'Sillas pintadas'], ['aria-valuemin', 0], ['aria-valuemax', tot]]) svg.setAttribute(a, v);
      svg.onpointerdown = e => { if (ui.locked || dedo != null) return; dedo = e.pointerId; try { svg.setPointerCapture(dedo); } catch (er) { /* sin captura */ } mueve(e); };
      svg.onpointermove = e => { if (e.pointerId === dedo && !ui.locked) mueve(e); };
      svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId === dedo) dedo = null; };
      svg.onkeydown = e => { const k = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: p.cols, ArrowUp: -p.cols }[e.key]; if (!k || ui.locked) return; e.preventDefault(); e.stopPropagation(); pon(ui.s.k + k); };
      draw(); ui.nota('Arrastra sobre las sillas para pintarlas.');
      return ok => {
        ui.lee(`$\\dfrac{${ui.s.k}}{${tot}} = ${num(100 * ui.s.k / tot)}\\,\\%$`);
        ui.nota(ok ? 'Esa es la parte pedida, aunque no sean 100 sillas.' : ui.s.k === p.pct ? `${p.pct} sillas no son el ${p.pct} %: el porcentaje es de cada 100.` : `Pintaste el ${num(100 * ui.s.k / tot)} %.`);
        if (!ok) ui.espera(2400, () => { ui.muestra({ k: meta(p) }); marca = meta(p); XS.merge(); draw(); ui.nota('Esta es la parte pedida.'); ui.lee(`$\\dfrac{${meta(p)}}{${tot}} = ${p.pct}\\,\\%$`); });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- que-porcentaje
  XG.conPerillas('que-porcentaje', {
    campos: p => [{ k: 'v', et: 'Porcentaje', min: 0, max: 20, ini: 0, cara: v => v * 5, lee: v => `${v * 5} %` }],
    listo: s => s.v > 0,
    ok: (s, p) => s.v * 5 * p.todo === 100 * p.parte,
    sol: p => ({ v: 20 * p.parte / p.todo }),
    texto: p => `$${p.parte} \\div ${p.todo} = ${p.parte / p.todo}$: el ${100 * p.parte / p.todo} %`,
    alto: 120,
    quieta: (p, K) => `<text class="xp-tag" x="170" y="22">${p.parte} de ${p.todo}</text><rect class="xg-tapada" x="20" y="44" width="300" height="34" rx="7"/><text class="xp-tag" x="170" y="67">?</text>`,
    cuadro(s, p, f) {
      const a = p.parte / p.todo, b = s.v / 20;
      let h = `<rect class="xb-out" x="20" y="30" width="300" height="30" rx="7"/>` + barra(30, a * f, 1, '', `${p.parte} de ${p.todo}`) + `<rect class="xb-out" x="20" y="84" width="300" height="30" rx="7"/>` + barra(84, b * f, 1, 'b', `${s.v * 5} %`);
      for (let k = 1; k < 10; k++) h += `<line class="xb-cut" x1="${20 + 30 * k}" y1="84" x2="${20 + 30 * k}" y2="114"/>`;
      return h;
    },
    aviso: (s, p) => (s.v * 5 === p.parte ? `${p.parte} es la cantidad, no el porcentaje.` : s.v * 5 * p.todo > 100 * p.parte ? 'Tu porcentaje es más que la parte.' : 'Tu porcentaje es menos que la parte.'),
    bien: () => 'Miden lo mismo: es esa parte de cada 100.',
  });

  // ------------------------------------------------------------------------------------------------- pedazos-porciento
  const suma = (en, p) => en.reduce((t, i) => t + p.cartas[i], 0);
  XG.juego('pedazos-porciento', {
    ini: p => ({ en: Array(p.k).fill(null) }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === p.k && suma(s.en, p) * 100 === p.pct * p.total,
    sol(p) {
      const n = p.cartas.length;
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) if (suma([a, b, c], p) * 100 === p.pct * p.total) return { en: [a, b, c] };
      return null;
    },
    texto(p) { const e = this.solve(p).en; return `$${e.map(i => p.cartas[i]).join(' + ')} = ${suma(e, p)}$: ${e.map(i => `${p.cartas[i] * 100 / p.total} %`).join(' + ')} = ${p.pct} %`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona"></div><div class="xg-frase"></div><div class="xp-tray" data-drop data-tray></div>';
      const [lona, frase, tray] = stage.children, svg = lienzo(lona, 96), xm = X0 + BW * p.pct / 100;
      const pinta = (m = '', fin) => { svg.innerHTML = `<rect class="xb-out" x="${X0}" y="36" width="${BW}" height="40" rx="7"/>${m}<text class="xg-et" x="${X0}" y="20">total: ${p.total}</text>` + (fin ? `<line class="xg-marca" x1="${xm}" y1="26" x2="${xm}" y2="86"/><text class="xp-tag xg-ok" x="${xm}" y="22">${p.pct} %</text>` : ''); };
      const draw = () => {
        frase.innerHTML = ui.s.en.map((i, k) => `${k ? '<span>+</span>' : ''}<button type="button" class="xp-slot xg-ch${i != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="casilla ${k + 1}">${i != null ? p.cartas[i] : ''}</button>`).join('');
        tray.innerHTML = p.cartas.map((c, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${c}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      pinta(); draw(); ui.nota('Cada carta es una cantidad. Piensa qué porcentaje del total es.');
      const corre = (en, fin) => {
        let x = 0, h = '', k = 0;
        (function pieza() {
          if (k >= en.length) return fin(x);
          const v = p.cartas[en[k]], w = v / p.total, x0 = x, cls = ['', ' b', ' c'][k % 3];
          const r = (f, t) => `<rect class="xb-fill xg-pz${cls}" x="${X0 + x0 * BW}" y="36" width="${Math.max(1, BW * f - 1)}" height="40" rx="4"/>${t && w > 0.12 ? `<text class="xp-tag xg-sobre" x="${X0 + (x0 + w / 2) * BW}" y="61">${Math.round(w * 100)} %</text>` : ''}`;
          ui.tween(0, w, 650, f => pinta(h + r(f), true), () => { h += r(w, true); x += w; k++; XS.hop(k * 2); pinta(h, true); ui.espera(300, pieza); });
        })();
        ui.lee(`$${en.map(i => `${Math.round(p.cartas[i] * 100 / p.total)}\\,\\%`).join(' + ')} = ${Math.round(suma(en, p) * 100 / p.total)}\\,\\%$`);
      };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, x => {
          if (ok) return ui.nota('Justo el porcentaje pedido.');
          ui.nota(suma(ui.s.en, p) === p.pct ? `Suman ${p.pct}, pero ${p.pct} no es el ${p.pct} % de ${p.total}.` : x * 100 > p.pct ? 'Se pasa.' : 'No alcanza.');
          ui.espera(2000, () => { const s = GAMES['pedazos-porciento'].solve(p); ui.muestra(s); draw(); corre(s.en, () => ui.nota('Estas tres sí.')); });
        });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- etiqueta-vieja
  XG.conPerillas('etiqueta-vieja', {
    campos: p => [{ k: 'v', et: 'Precio de antes', min: 10, max: 40, ini: 10, cara: v => v * 5, lee: v => `${v * 5} mil` }],
    listo: (s, p) => s.v > 10,
    ok: (s, p) => s.v * 5 * (100 - p.baja) === 100 * p.queda,
    sol: p => ({ v: 20 * p.queda / (100 - p.baja) }),
    texto: p => `$${p.queda} \\div ${(100 - p.baja) / 100} = ${100 * p.queda / (100 - p.baja)}$ mil`,
    alto: 128,
    quieta: p => `<rect class="xg-tapada" x="20" y="24" width="300" height="30" rx="7"/><text class="xp-tag" x="170" y="45">antes: ?</text>` + barra(84, p.queda, 200, 'b', `después de bajar ${p.baja} %: ${p.queda} mil`),
    cuadro(s, p, f) {
      const v = s.v * 5, cae = v * p.baja / 100 * f;
      return barra(24, v - cae, 200, '', `antes: ${v} mil`) + `<rect class="xg-quita" x="${X0 + BW * (v - cae) / 200}" y="24" width="${BW * cae / 200}" height="30"/>` + barra(84, p.queda, 200, 'b', `quedó en ${p.queda} mil`) + `<line class="xg-hilo" x1="${X0 + BW * p.queda / 200}" y1="18" x2="${X0 + BW * p.queda / 200}" y2="118"/>`;
    },
    lee: (s, p) => `$${s.v * 5} \\cdot ${(100 - p.baja) / 100} = ${num(s.v * 5 * (100 - p.baja) / 100)}$`,
    aviso: (s, p) => (s.v * 5 * (100 - p.baja) > 100 * p.queda ? 'Quedaría más caro: el precio de antes era menor.' : s.v * 5 <= p.queda ? 'El precio de antes tiene que ser mayor.' : 'Quedaría más barato: el precio de antes era mayor.'),
    bien: () => 'El descuento se toma del precio de antes, no del que quedó.',
  });

  // -------------------------------------------------------------------------------------------------- vuelta-al-precio
  XG.conPerillas('vuelta-al-precio', {
    campos: p => [{ k: 'v', et: 'Descuento', min: 0, max: 10, ini: 0, cara: v => v * 5, lee: v => `${v * 5} %` }],
    listo: s => s.v > 0,
    ok: (s, p) => (100 + p.sube) * (100 - s.v * 5) === 10000,
    sol: p => ({ v: (100 - 10000 / (100 + p.sube)) / 5 }),
    texto: p => `$${(100 + p.sube) / 100} \\cdot ${10000 / (100 + p.sube) / 100} = 1$: hay que bajar el ${100 - 10000 / (100 + p.sube)} %`,
    alto: 120,
    quieta: p => barra(26, 100, 150, '', 'antes: 100') + barra(82, 100 + p.sube, 150, 'b', `después de subir el ${p.sube} %`),
    cuadro(s, p, f) {
      const v = 100 + p.sube, cae = v * s.v * 5 / 100 * f;
      return barra(26, 100, 150, '', 'antes: 100') + barra(82, v - cae, 150, 'b', `${v} baja ${s.v * 5} %`) + `<rect class="xg-quita" x="${X0 + BW * (v - cae) / 150}" y="82" width="${BW * cae / 150}" height="30"/><line class="xg-hilo" x1="${X0 + BW * 100 / 150}" y1="18" x2="${X0 + BW * 100 / 150}" y2="118"/>`;
    },
    lee: (s, p) => `$${100 + p.sube} \\cdot ${num((100 - s.v * 5) / 100)} = ${num((100 + p.sube) * (100 - s.v * 5) / 100)}$`,
    aviso: (s, p) => (s.v * 5 === p.sube ? 'Queda por debajo: ese porcentaje ahora se toma de un precio más grande.' : (100 + p.sube) * (100 - s.v * 5) < 10000 ? 'Bajó demasiado.' : 'Todavía está por encima.'),
    bien: () => 'Vuelve justo al precio de antes.',
  });

  // ------------------------------------------------------------------------------------------------------ factor-final
  const final = p => p.cambios.reduce((t, c) => t * (100 + c) / 100, 100);
  XG.conPerillas('factor-final', {
    campos: p => [{ k: 'v', et: 'Queda, de cada 100', min: p.min, max: p.max, ini: p.ini, lee: v => `${v}` }],
    listo: (s, p) => s.v !== p.ini,
    ok: (s, p) => s.v === Math.round(final(p)),
    sol: p => ({ v: Math.round(final(p)) }),
    texto: p => `$${p.cambios.map(c => (100 + c) / 100).join(' \\cdot ')} = ${Math.round(final(p)) / 100}$: quedan ${Math.round(final(p))} de cada 100`,
    alto: 128,
    quieta: () => barra(24, 100, 125, '', 'al comienzo: 100') + '<rect class="xg-tapada" x="20" y="84" width="300" height="30" rx="7"/><text class="xp-tag" x="170" y="105">al final: ?</text>',
    cuadro(s, p, f) {
      const n = p.cambios.length, u = f * n, k = Math.min(n - 1, Math.floor(u));
      let v = 100; for (let i = 0; i < k; i++) v *= (100 + p.cambios[i]) / 100;
      v *= 1 + p.cambios[k] / 100 * (u - k);
      return barra(24, v, 125, '', `${p.cambios[k] < 0 ? 'baja' : 'sube'} ${Math.abs(p.cambios[k])} %: ${num(v)}`) + barra(84, s.v, 125, 'b', `tu respuesta: ${s.v}`) + (f >= 1 ? `<line class="xg-hilo" x1="${X0 + BW * v / 125}" y1="18" x2="${X0 + BW * v / 125}" y2="118"/>` : '');
    },
    ms: 2600,
    aviso: (s, p) => (s.v === 100 + p.cambios.reduce((a, b) => a + b, 0) ? 'Los porcentajes no se suman: el segundo se toma del precio nuevo.' : s.v > final(p) ? 'Queda menos.' : 'Queda más.'),
    bien: () => 'Los cambios seguidos se multiplican.',
  });
})();
;
//#archivo js/games/potencias-escena.js
// Ejercicios de potencias, raíces y estimación con las escenas de la explicación (pu-cm-4; spec 2026-11-24-ejercicios-explora).
// Kit en js/games/explora-kit.js. La escena no dice el resultado mientras se responde; al comprobar ejecuta la respuesta.
//   crece-factor       cuántas rondas de multiplicar por lo mismo hacen falta.        state { e }
//   cuadrado-justo     lado de un cuadrado con un área tantas veces mayor.            state { v }
//   exponentes-justos  poner tres exponentes para que salga el pedido.                state { en }
//   misma-potencia     escribir un número como potencia de dos bases.                 state { a, b }
//   raiz-bandera       estimar una raíz en la recta, en décimas.                      state { v }
//   estima-diez        estimar un producto como a · 10ⁿ.                              state { a, e }
(() => {
  const W = 340, X0 = 20, BW = 300;
  const mil = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const milT = x => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');

  // ------------------------------------------------------------------------------------------------------ crece-factor
  XG.conPerillas('crece-factor', {
    campos: p => [{ k: 'e', et: 'Rondas', min: 0, max: p.max, ini: 0, lee: v => `${v} ${v === 1 ? 'ronda' : 'rondas'}` }],
    listo: s => s.e > 0,
    ok: (s, p) => p.base ** s.e === p.meta,
    sol: p => ({ e: Math.round(Math.log(p.meta) / Math.log(p.base)) }),
    texto(p) { const e = this.solve(p).e; return `$${Array(e).fill(p.base).join(' \\cdot ')} = ${p.base}^{${e}} = ${p.meta}$`; },
    alto: 130,
    quieta: p => `<g class="xp-tok"><circle cx="40" cy="62" r="15"/><text x="40" y="67">1</text></g><text class="xp-tag" x="190" y="60">× ${p.base} en cada ronda</text><text class="xg-et" x="130" y="84">hasta ${p.meta}</text>`,
    cuadro(s, p, f) {
      const n = Math.max(1, s.e), k = Math.min(s.e, Math.floor(f * n + 0.001)), paso = Math.min(64, 290 / n);
      let h = '';
      for (let i = 0; i <= k; i++) {
        const x = 26 + i * paso, v = p.base ** i, r = Math.min(26, 11 + 2.4 * i);
        if (i) h += `<text class="xg-et xg-cen" x="${x - paso / 2}" y="28">×${p.base}</text><line class="xp-link" x1="${x - paso + 11}" y1="66" x2="${x - 11}" y2="66"/>`;
        h += `<circle class="xp-ring${v === p.meta ? ' good' : ''}" cx="${x}" cy="66" r="${Math.min(r, paso / 2 - 2)}"/><text class="xp-tag" x="${x}" y="${i % 2 && paso < 50 ? 124 : 108}">${mil(v)}</text>`;
      }
      return h;
    },
    ms: 2400,
    lee: (s, p) => `$${p.base}^{${s.e}} = ${milT(p.base ** s.e)}$`,
    aviso: (s, p) => (p.base ** s.e > p.meta ? 'Te pasaste de rondas.' : 'Faltan rondas.'),
    bien: () => 'Cada ronda es un factor más.',
  });

  // ---------------------------------------------------------------------------------------------------- cuadrado-justo
  XG.conPerillas('cuadrado-justo', {
    campos: p => [{ k: 'v', et: 'Lado nuevo', min: 1, max: p.max, ini: 1, cara: v => v * p.lado, lee: v => `${v * p.lado} m` }],
    listo: s => s.v !== 1,
    ok: (s, p) => s.v * s.v === p.veces,
    sol: p => ({ v: Math.sqrt(p.veces) }),
    texto: p => `El lado se multiplica por $\\sqrt{${p.veces}} = ${Math.sqrt(p.veces)}$: $${p.lado * Math.sqrt(p.veces)}$ m, y $${p.lado * Math.sqrt(p.veces)}^2 = ${p.veces} \\cdot ${p.lado * p.lado}$`,
    alto: 176,
    quieta: p => `<rect class="xb-fill" x="150" y="80" width="26" height="26" rx="3"/><text class="xp-tag" x="163" y="72">lado ${p.lado} m</text><text class="xg-et xg-cen" x="170" y="132">el área debe ser ${p.veces} veces esta</text>`,
    cuadro(s, p, f) {
      const n = s.v, g = Math.sqrt(p.veces), c = Math.min(26, 150 / Math.max(1, n)), x0 = 170 - n * c / 2, y0 = 12, k = Math.ceil(n), tot = Math.floor(f * k * k);
      let h = `<rect class="xb-out" x="${x0}" y="${y0}" width="${n * c}" height="${n * c}"/>`;
      for (let i = 0; i < tot; i++) { const a = i % k, b = Math.floor(i / k), w = Math.min(1, n - a), q = Math.min(1, n - b); if (w > 0 && q > 0) h += `<rect class="xb-fill${i ? ' b' : ''}" x="${x0 + a * c + 0.6}" y="${y0 + b * c + 0.6}" width="${Math.max(0, w * c - 1.2)}" height="${Math.max(0, q * c - 1.2)}" rx="2"/>`; }
      if (f >= 1 && n !== g) h += `<rect class="xg-marca" fill="none" x="${x0}" y="${y0}" width="${Math.min(150, g * c)}" height="${Math.min(150, g * c)}"/>`;   // el que se pedía
      return h;
    },
    ms: 1800,
    lee: (s, p) => `$${s.v * p.lado}^2 = ${(s.v * p.lado) ** 2} \\qquad ${p.veces} \\cdot ${p.lado}^2 = ${p.veces * p.lado * p.lado}$`,
    aviso: (s, p) => (s.v === p.veces ? 'Multiplicaste el lado: el área creció muchísimo más.' : s.v * s.v > p.veces ? 'El área se pasa.' : 'Al área le falta.'),
    bien: () => 'El lado crece con la raíz de las veces.',
  });

  // -------------------------------------------------------------------------------------------------- exponentes-justos
  const val = (en, p) => p.cartas[en[0]] * p.cartas[en[1]] + p.cartas[en[2]];
  XG.juego('exponentes-justos', {
    ini: () => ({ en: [null, null, null] }),
    listo: s => s.en.every(i => i != null),
    ok: (s, p) => s.en.every(i => i != null) && new Set(s.en).size === 3 && val(s.en, p) === p.meta,
    sol(p) { const n = p.cartas.length; for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) if (a !== b && b !== c && a !== c && val([a, b, c], p) === p.meta) return { en: [a, b, c] }; return null; },
    texto(p) { const [a, b, c] = this.solve(p).en.map(i => p.cartas[i]); return `Por ejemplo, $(${p.base}^{${a}})^{${b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${a * b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${p.meta}}$`; },
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-exp"></div><div class="xg-cadena"></div><div class="xp-tray" data-drop data-tray></div>';
      const [ex, cad, tray] = stage.children;
      const draw = () => {
        const sl = k => `<button type="button" class="xp-slot${ui.s.en[k] != null ? ' full' : ''}" data-drop data-k="${k}" aria-label="exponente ${k + 1}">${ui.s.en[k] != null ? p.cartas[ui.s.en[k]] : ''}</button>`;
        ex.innerHTML = `<span class="xg-gr"><i>(</i><b>${p.base}</b>${sl(0)}<i>)</i>${sl(1)}</span><i>·</i><span class="xg-gr"><b>${p.base}</b>${sl(2)}</span><i>=</i><span class="xg-gr xg-meta"><b>${p.base}</b><sup>${p.meta}</sup></span>`;
        tray.innerHTML = p.cartas.map((c, i) => (ui.s.en.includes(i) ? '' : `<button type="button" class="xp-chip" data-i="${i}">${c}</button>`)).join('');
      };
      const pon = (i, k) => { const en = ui.s.en.map(x => (x === i ? null : x)); if (k != null) en[k] = i; ui.set({ en }); XS.pop(); xpTick(); draw(); stage.querySelector(k != null ? `[data-k="${k}"]` : `[data-i="${i}"]`)?.focus({ preventScroll: true }); };
      XG.arrastra(ui, stage, '.xp-chip, .xp-slot.full', {
        onDrop(el, over) { pon(el.dataset.i != null ? +el.dataset.i : ui.s.en[+el.dataset.k], over.dataset.k != null ? +over.dataset.k : null); },
        onTap(el) { if (el.dataset.k != null) return pon(ui.s.en[+el.dataset.k], null); const k = ui.s.en.indexOf(null); if (k >= 0) pon(+el.dataset.i, k); },
      });
      draw(); ui.nota('Arrastra un número a cada exponente.');
      // Escribe los factores: los grupos de adentro y, aparte, los de la otra potencia.
      const corre = (en, fin) => {
        const [a, b, c] = en.map(i => p.cartas[i]), total = a * b + c;
        let k = 0; cad.innerHTML = '';
        (function factor() {
          if (k < total) {
            const g = k < a * b ? Math.floor(k / a) % 2 : 2;
            if (k && (k === a * b || (k < a * b && k % a === 0))) cad.insertAdjacentHTML('beforeend', '<span class="xg-sep"></span>');
            cad.insertAdjacentHTML('beforeend', `<span class="xg-fac xg-mini par${g === 1 ? 1 : 0}${g === 2 ? ' solo' : ''}">${p.base}</span>`);
            k++; XS.hop(k % 8); return ui.espera(110, factor);
          }
          ui.lee(`$(${p.base}^{${a}})^{${b}} \\cdot ${p.base}^{${c}} = ${p.base}^{${a} \\cdot ${b} + ${c}} = ${p.base}^{${total}}$`); fin(total);
        })();
      };
      return ok => {
        tray.hidden = true; ui.nota('');
        corre(ui.s.en, t => {
          if (ok) return ui.nota(`${t} factores en total.`);
          ui.nota(ui.s.en.reduce((x, i) => x + p.cartas[i], 0) === p.meta ? `Sumaste los tres. Los grupos se multiplican: son ${t} factores.` : `Son ${t} factores, no ${p.meta}.`);
          ui.espera(2400, () => { const s = GAMES['exponentes-justos'].solve(p); ui.muestra(s); draw(); tray.hidden = true; ui.lee(''); corre(s.en, () => ui.nota('Así sí.')); });
        });
      };
    },
  });

  // ---------------------------------------------------------------------------------------------------- misma-potencia
  XG.conPerillas('misma-potencia', {
    campos: p => [{ k: 'a', et: `Exponente del ${p.bases[0]}`, min: 1, max: p.max, ini: 1, lee: () => '' }, { k: 'b', et: `Exponente del ${p.bases[1]}`, min: 1, max: p.max, ini: 1, lee: () => '' }],
    listo: s => s.a > 1 || s.b > 1,
    ok: (s, p) => p.bases[0] ** s.a === p.meta && p.bases[1] ** s.b === p.meta,
    sol: p => ({ a: Math.round(Math.log(p.meta) / Math.log(p.bases[0])), b: Math.round(Math.log(p.meta) / Math.log(p.bases[1])) }),
    texto(p) { const s = this.solve(p); return `$${p.meta} = ${p.bases[0]}^{${s.a}} = ${p.bases[1]}^{${s.b}}$`; },
    alto: 118,
    quieta: p => `<text class="xp-tag xg-gr2" x="170" y="66">${mil(p.meta)}</text>`,
    cuadro(s, p, f) {
      const fila = (y, base, e, cls) => { const n = Math.floor(f * e + 0.001), w = Math.min(34, 280 / e), x0 = 170 - e * w / 2; let h = ''; for (let i = 0; i < n; i++) h += `<rect class="xg-lote ${cls}" x="${x0 + i * w + 1.5}" y="${y}" width="${w - 3}" height="30" rx="6"/><text class="xp-tag" x="${x0 + (i + 0.5) * w}" y="${y + 20}">${base}</text>`; return h; };
      return fila(16, p.bases[0], s.a, 'on2') + fila(70, p.bases[1], s.b, 'de');
    },
    ms: 1600,
    lee: (s, p) => `$${p.bases[0]}^{${s.a}} = ${milT(p.bases[0] ** s.a)} \\qquad ${p.bases[1]}^{${s.b}} = ${milT(p.bases[1] ** s.b)}$`,
    aviso: (s, p) => { const x = p.bases[0] ** s.a === p.meta, y = p.bases[1] ** s.b === p.meta; return x || y ? `La del ${x ? p.bases[0] : p.bases[1]} sí; la del ${x ? p.bases[1] : p.bases[0]} no da ${p.meta}.` : `Ninguna da ${p.meta}.`; },
    bien: p => 'El mismo número, con factores más grandes o más pequeños.',
  });

  // ------------------------------------------------------------------------------------------------------ raiz-bandera
  XG.conPerillas('raiz-bandera', {
    campos: p => [{ k: 'v', et: 'Tu estimación', min: p.min * 10, max: p.max * 10, ini: p.min * 10, cara: v => v / 10, lee: v => `${(v / 10).toFixed(1)}` }],
    listo: (s, p) => s.v !== p.min * 10,
    ok: (s, p) => Math.abs(s.v / 10 - Math.sqrt(p.n)) <= p.tol,
    sol: p => ({ v: Math.round(10 * Math.sqrt(p.n)) }),
    texto: p => `$\\sqrt{${p.n}} \\approx ${Math.round(10 * Math.sqrt(p.n)) / 10}$`,
    alto: 128,
    quieta: p => { let h = `<line class="xp-ax" x1="20" y1="84" x2="320" y2="84"/>`; for (let v = p.min; v <= p.max; v++) { const x = X0 + BW * (v - p.min) / (p.max - p.min); h += `<line class="xp-tk z" x1="${x}" y1="78" x2="${x}" y2="90"/><text class="xp-lb z" x="${x}" y="110">${v}</text>`; } return h; },
    cuadro(s, p, f) {
      const X = v => X0 + BW * (v - p.min) / (p.max - p.min), v = s.v / 10, r = Math.sqrt(p.n);
      let h = this.quieta(p);
      for (let k = p.min; k <= p.max; k++) h += `<text class="xg-et xg-cen" x="${X(k)}" y="${66}">${k * k}</text>`;
      h += `<g class="xp-tok"><circle cx="${X(p.min + (v - p.min) * Math.min(1, f * 1.4))}" cy="84" r="9"/></g>`;
      if (f >= 1) h += `<line class="xg-marca" x1="${X(r)}" y1="30" x2="${X(r)}" y2="94"/><text class="xp-tag xg-ok" x="${X(r)}" y="24">área ${p.n}</text>`;
      return h;
    },
    ms: 1400,
    lee: (s, p) => `$${s.v / 10}^2 = ${Math.round(s.v * s.v) / 100}$`,
    aviso: (s, p) => (s.v / 10 > Math.sqrt(p.n) ? `Un cuadrado de ese lado tiene más de ${p.n}.` : `Un cuadrado de ese lado tiene menos de ${p.n}.`),
    bien: (s, p) => `El cuadrado de ese lado queda muy cerca de ${p.n}.`,
  });

  // ------------------------------------------------------------------------------------------------------- estima-diez
  XG.conPerillas('estima-diez', {
    campos: p => [{ k: 'a', et: 'Primera cifra', min: 1, max: 9, ini: 1, lee: () => '' }, { k: 'e', et: 'Ceros', min: 0, max: 6, ini: 0, lee: v => `${v} ${v === 1 ? 'cero' : 'ceros'}` }],
    listo: s => s.e > 0,
    ok: (s, p) => s.a === p.a && s.e === p.e,
    sol: p => ({ a: p.a, e: p.e }),
    texto: p => `$${p.redondo.join(' \\cdot ')} = ${milT(p.a * 10 ** p.e)} = ${p.a} \\cdot 10^{${p.e}}$ (exacto: $${milT(p.x * p.y)}$)`,
    alto: 112,
    quieta: p => `<text class="xp-tag xg-gr2" x="170" y="66">${p.x} × ${p.y}</text>`,
    cuadro(s, p, f) {
      const v = s.a * 10 ** s.e, r = p.x * p.y, L = x => Math.max(1, 300 * x / Math.max(v, r));   // a escala: un cero de más se nota
      return `<rect class="xb-fill b" x="20" y="22" width="${L(r) * f}" height="24" rx="5"/><text class="xg-et" x="20" y="16">${p.x} × ${p.y} = ${mil(r)}</text><rect class="xb-fill" x="20" y="64" width="${L(v) * f}" height="24" rx="5"/><text class="xg-et" x="20" y="60">tu estimación: ${mil(v)}</text>`;
    },
    ms: 1300,
    aviso: (s, p) => (s.e !== p.e && s.a === p.a ? `La cifra sí, pero con ${s.e > p.e ? 'más' : 'menos'} ceros de los que van.` : s.e === p.e ? 'Los ceros sí; la primera cifra no.' : 'Redondea cada número a una cifra y cuenta los ceros de los dos.'),
    bien: () => 'Se multiplican las cifras y se cuentan los ceros.',
  });
})();
;
//#archivo js/games/rotula-mueve.js
// Lo que pasa en los ejercicios de arrastrar fichas al comprobar (spec 2026-11-24-ejercicios-explora, «Al comprobar, las fichas se mueven»).
// Lo usa XG.rotula (figura-kit.js):
//   XG.ROTULA[nombre](K, p, v, f)   dibujo encima de la escena que ejecuta lo puesto; v: la ficha de cada lugar; f de 0 a 1
//   XG.ORDEN[nombre]                en qué orden se revisan los lugares, si no es el de siempre
//   XG.cadena(ops, v)               lo que da la cuenta con las fichas puestas («9», «·», «8», «=»), o null si no hay cuenta
// Todo es puro.
(() => {
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  const num = s => { const m = /^(−?\d+(?:\.\d+)?)(?:\/(\d+))?$/.exec(String(s).replace('-', '−')); if (!m) return null; const a = +m[1].replace('−', '-'), b = +(m[2] || 1); return Number.isInteger(a) ? [a, b] : [Math.round(a * 1000), 1000 * b]; };
  const red = ([a, b]) => { const g = mcd(a, b) || 1; return b / g < 0 ? [-a / g, -b / g] : [a / g, b / g]; };
  const esc = r => { const [a, b] = red(r); return (b === 1 ? String(a) : `${a}/${b}`).replace('-', '−'); };
  XG.cadena = (ops, v) => {
    const k = ops?.indexOf('=') ?? -1; if (k < 1 || ops.slice(0, k).some(o => !['·', '+', '−', '÷'].includes(o)) || (ops.slice(0, k).some(o => '·÷'.includes(o)) && ops.slice(0, k).some(o => '+−'.includes(o)))) return null;
    const n = v.slice(0, k + 1).map(num); if (n.some(x => !x)) return null;
    let r = n[0];
    for (let i = 0; i < k; i++) { const [a, b] = r, [c, d] = n[i + 1], o = ops[i]; if (o === '÷' && !c) return null; r = red(o === '·' ? [a * c, b * d] : o === '÷' ? [a * d, b * c] : o === '+' ? [a * d + c * b, b * d] : [a * d - c * b, b * d]); }
    const tx = s => String(s).replace('−', '-').replace(/^(-?\d+)\/(\d+)$/, '\\tfrac{$1}{$2}'), par = s => (s.startsWith('-') ? `(${s})` : s);
    return { en: k + 1, t: esc(r), tex: `$${v.slice(0, k + 1).map((x, i) => (i ? ` ${{ '·': '\\cdot', '÷': '\\div', '−': '-', '+': '+' }[ops[i - 1]]} ${par(tx(x))}` : tx(x))).join('')} = ${tx(esc(r))}$` };
  };
  const mezcla = (a, b, f) => a + (b - a) * f, paso = (f, k, n) => Math.max(0, Math.min(1, f * n - k));
  const crece = (K, [a, b], [c, d], f, cls) => (f > 0 ? K.l(a, b, mezcla(a, c, f), mezcla(b, d, f), cls) : '');
  const marco = (K, x, q) => (q > 0 && q < 1 ? K.r(x - 28, 38, 56, 138 * Math.min(1, q * 1.4), 'fn gr', 10) : '');
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−'), V = s => +String(s).replace('−', '-');

  XG.ORDEN = { 'desde-el-final': [1, 0], 'deshace-operador': [1, 0], 'llena-encuesta': [1, 0, 2, 3], 'arbol-operador': [0, 1, 2], 'suma-con-letras': [0, 1, 2] };
  XG.ROTULA = {
    // Los resultados suben por el árbol.
    'arbol-operador': (K, p, v, f) => [[90, 1], [250, 1]].map(([x]) => crece(K, [x - 32, 140], [x - 10, 116], paso(f, 0, 2), 'la gr') + crece(K, [x + 32, 140], [x + 10, 116], paso(f, 0, 2), 'la gr')).join('') + crece(K, [100, 76], [150, 48], paso(f, 1, 2), 'lg gr') + crece(K, [240, 76], [190, 48], paso(f, 1, 2), 'lg gr'),
    'arbol-primos': (K, p, v, f) => { const l = [[131, 30, 58], [178, 76, 108], [226, 126, 158]], d = [+p.n, V(v[1]), V(v[3])]; return l.map(([x, a, y], i) => { const q = paso(f, i, 3), ok = V(v[2 * i]) * V(v[2 * i + 1]) === d[i]; return crece(K, [x - 8, a], [x - 38, y - 20], q, 'la gr') + crece(K, [x + 8, a], [x + 38, y - 20], q, 'la gr') + (q >= 1 ? K.t(i < 2 ? [215, 263][i] : 148, [62, 112, 162][i], `${v[2 * i]} · ${v[2 * i + 1]} ${ok ? '=' : '≠'} ${d[i]}`, ok ? 's to' : 's tf', i < 2 ? 'start' : 'end') : ''); }).join(''); },
    'arbol-bolsa': (K, p, v, f) => crece(K, [82, 103], [126, 58], paso(f, 0, 2), 'lf gr') + crece(K, [82, 103], [126, 148], paso(f, 0, 2), 'la gr') + [[58, 36], [58, 80], [148, 126], [148, 170]].map(([a, b], i) => crece(K, [150, a], [206, b], paso(f, 1, 2), i % 2 ? 'la gr' : 'lf gr')).join(''),
    // Cada círculo suma lo que tiene adentro.
    'tres-circulos'(K, p, v, f) { const [ab, ac, bc, a, b, c] = v.map(V), z = V(p.c), s = [a + ab + ac + z, b + ab + bc + z, c + ac + bc + z]; return [[138, 66, 'la'], [202, 66, 'lg'], [170, 120, 'lf']].map(([x, y, l], i) => K.arc(x, y, 54, 90, 90 + 359 * paso(f, i, 3), `${l} gr`)).join('') + [[76, 40, 'end'], [264, 40, 'start'], [232, 178, 'start']].map(([x, y, q], i) => (paso(f, i, 3) >= 1 ? K.t(x, y, `suma ${s[i]}`, 's', q) : '')).join(''); },
    'llena-encuesta': (K, p, v, f) => [1, 0, 2, 3].map((i, k) => { const q = paso(f, k, 4), [x, y] = [[98, 92], [170, 92], [242, 92], [46, 154]][i]; return q > 0 && q < 1 ? K.f(1 - q, K.c(x, y, 14 + 30 * q, 'fn gr')) : ''; }).join('') + K.t(316, 168, `van ${[1, 0, 2, 3].reduce((s, i, k) => s + (paso(f, k, 4) >= 1 ? V(v[i]) : 0), 0)}`, 's', 'end'),
    // La fila del primero y la columna del segundo se cruzan.
    'lee-operacion'(K, p, v, f) { const L = p.letras, par = [['q', 's'], ['s', 'q'], ['r', v[2]]], n = L.length; return par.map(([a, b], k) => { const q = paso(f, k, 3); if (q <= 0 || (q >= 1 && k < 2)) return ''; const x = 46 + L.indexOf(b) * 32, y = 46 + L.indexOf(a) * 34; return crece(K, [30, y], [x, y], Math.min(1, q * 2), 'lg gr') + crece(K, [x, 28], [x, y], Math.max(0, q * 2 - 1), 'la gr') + (q > 0.95 ? K.c(x, y, 13, 'fn gr') : ''); }).join(''); },
    'cadena-en-tabla'(K, p, v, f) { const L = p.letras, o = (a, b) => p.tab[L.indexOf(a)][L.indexOf(b)], par = [['t', 'u'], [o('t', 'u'), 'v'], ['u', 'v'], ['t', o('u', 'v')], [v[2], 'u']]; return par.map(([a, b], k) => { const q = paso(f, k, 5); if (q <= 0 || (q >= 1 && k < 4)) return ''; const x = 46 + L.indexOf(b) * 32, y = 46 + L.indexOf(a) * 38; return crece(K, [30, y], [x, y], Math.min(1, q * 2), 'lg gr') + crece(K, [x, 28], [x, y], Math.max(0, q * 2 - 1), 'la gr') + (q > 0.9 ? K.c(x, y, 13, 'fn gr') : ''); }).join(''); },
    // Las columnas se operan con las cifras puestas.
    'suma-con-letras': (K, p, v, f) => marco(K, 206, paso(f, 0, 2)) + marco(K, 146, paso(f, 1, 2)) + (f >= 1 ? K.t(330, 158, `da ${10 * V(v[2]) + 8 + 40 + V(v[0])}`, 'b', 'end') : ''),
    'resta-con-letras': (K, p, v, f) => marco(K, 206, paso(f, 0, 2)) + marco(K, 146, paso(f, 1, 2)) + (f >= 1 ? K.t(330, 158, `da ${N(70 + V(v[0]) - 10 * V(v[1]) - 8)}`, 'b', 'end') : ''),
    'producto-con-letras': (K, p, v, f) => crece(K, [140, 80], [100, 80], paso(f, 0, 2), 'lg gr') + crece(K, [140, 72], [62, 72], paso(f, 1, 2), 'la gr') + (f >= 1 ? K.t(330, 64, `${v[1]}${p.u} × ${p.k} = ${(10 * V(v[1]) + V(p.u)) * p.k}`, 's', 'end') : ''),
    // Se comprueba hacia adelante con lo que puso.
    'desde-el-final'(K, p, v, f) { const g = p.s.map(t => { const [a, b] = t.match(/(\d+)\/(\d+)/).slice(1).map(Number); return (b - a) / b; }), r = [V(v[0]) * g[0], V(v[1]) * g[1]]; return [[46, 170], [170, 297]].map(([a, b], i) => { const q = paso(f, i, 2), x = mezcla(a, b, q); return q > 0 && q < 1 ? K.c(x, 70, 7, 'fA') : q >= 1 ? K.t((a + b) / 2, 92, `da ${N(r[i])}`, r[i] === (i ? V(p.queda) : V(v[1])) ? 's to' : 's tf') : ''; }).join(''); },
    'deshace-operador'(K, p, v, f) { const k = p.s.map(t => +t.match(/\d+/)[0]), r = [V(v[0]) * k[0] + 3, V(v[1]) * k[1] + 3]; return [[44, 170], [170, 298]].map(([a, b], i) => { const q = paso(f, i, 2), x = mezcla(a, b, q); return q > 0 && q < 1 ? K.c(x, 62, 7, 'fA') : q >= 1 ? K.t((a + b) / 2, 86, `da ${N(r[i])}`, r[i] === (i ? V(p.sale) : V(v[1])) ? 's to' : 's tf') : ''; }).join(''); },
    // Se tachan parejas desde los extremos hasta el del medio.
    'ordena-centro'(K, p, v, f) { const n = p.d.length, m = (n - 1) / 2, X = i => 170 + (i - m) * 47; let h = ''; for (let k = 0; k < m; k++) { const q = paso(f, k, m); for (const i of [k, n - 1 - k]) h += crece(K, [X(i) - 17, 92], [X(i) + 17, 60], q, 'lf gr'); } return h + (f >= 1 ? K.c(X(m), 76, 25, 'fn gr') + K.l(170, 102, 170, 116, 'lo gr') : ''); },
    'tabla-edades': (K, p, v, f) => [66, 120].map((y, i) => [196, 290].map((x, j) => crece(K, [130, y + 24], [x, y + 24], paso(f, i * 2 + j, 4), j ? 'lg' : 'la')).join('')).join(''),
    'cadena-todos': (K, p, v, f) => [[148, 46, 'lf'], [126, 74, 'la'], [106, 100, 'lg']].map(([y, r, l], k) => K.arc(130, y, r, 90, 90 + 359 * paso(f, k, 3), `${l} gr`)).join(''),
    'suma-letras'(K, p, v, f) { const n = p.w.length, s = v.slice(0, n).reduce((a, x, i) => a + (paso(f, i, n) >= 1 ? V(x) : 0), 0); return Array.from({ length: n }, (_, i) => { const q = paso(f, i, n); return q > 0 && q < 1 ? K.c(mezcla(40 + i * 62, 40 + n * 62 + 12, q), 60, 6, 'fA') : ''; }).join('') + K.t(40 + n * 62 + 12, 26, `van ${s}`, 's'); },
    'pasos-despeje': (K, p, v, f) => [0, 1, 2].map(i => crece(K, [282, 30 + i * 50], [282, 66 + i * 50], paso(f, i, 3), 'la gr')).join(''),
    'ciclo-ultima': (K, p, v, f) => [0, 1, 2, 3].map(i => { const q = paso(f, i, 4), a = 28 + i * 56; return q > 0 && q < 1 ? K.t(mezcla(a, a + 56, q), 58 - 14 * Math.sin(Math.PI * q), '× 2', 's ta') : ''; }).join(''),
  };
})();
;
//#archivo js/games/suma-poligono.js
// Parte el polígono (Preuniversitario UdeA, pu-ge-1; spec 2026-11-18-preuda-geometria): por qué los ángulos de un
// polígono de n lados suman (n − 2)·180°. Desde el vértice marcado se arrastran diagonales hasta los demás vértices:
// el polígono queda partido en triángulos, cada uno vale 180° y el juego lleva la cuenta. Hay que trazarlas todas.
// params = { rounds: [{ n }] }   state = { rounds: [{ d: [vértices unidos con el 0] }] }
GAMES['suma-poligono'] = (() => {
  const NOM = { 4: 'cuadrilátero', 5: 'pentágono', 6: 'hexágono', 7: 'heptágono', 8: 'octágono' };
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ d: [] }),
    ok: (s, r) => s.d.length === r.n - 3,
    answered: s => s.d.length > 0,
    solution: r => `${r.n - 2} triángulos: ${r.n - 2} · 180° = ${(r.n - 2) * 180}°`,
    prompt: r => `Parte el ${NOM[r.n]} en triángulos con diagonales desde el punto`,
    foot: (r, s) => (s.d.length === r.n - 3 ? `Regular: cada ángulo mide ${(r.n - 2) * 180}° ÷ ${r.n} ${Number.isInteger((r.n - 2) * 180 / r.n) ? '=' : '≈'} ${Math.round((r.n - 2) * 1800 / r.n) / 10}°` : 'Arrastra desde el punto hasta otro vértice'),
    layout(G) { G.cx = G.W / 2; G.cy = (128 + G.H - 34) / 2 + 6; G.R = Math.min(G.W * 0.38, (G.H - 190) / 2); },
    enter(G) { G.line = null; },
    draw(G) {
      const { p, C, r, s, cx, cy, R } = G, V = Array.from({ length: r.n }, (_, i) => GEO.at(cx, cy, R, 90 - i * 360 / r.n)), tri = s.d.length + 1, done = s.d.length === r.n - 3;
      G.V = V;
      // Solo se cuentan triángulos cuando todas las piezas lo son: antes, alguna pieza todavía tiene más de tres lados.
      TK.label(p, C, done ? `${tri} triángulos: ${tri} · 180° = ${tri * 180}°` : `${tri} ${tri === 1 ? 'pieza' : 'piezas'}: aún no son todas triángulos`, G.W / 2, 108, G.locked ? (done ? C.ok : C.bad) : done && !VELO.on ? C.ok : C.ink, 17, G.W - 24);
      // Los triángulos del abanico, cada uno de un tono, cuando ya están todas las diagonales de en medio.
      const cuts = [1, ...[...s.d].sort((a, b) => a - b), r.n - 1], cols = [C.sky, C.mint, C.coral, C.sun];
      for (let k = 0; k < cuts.length - 1; k++) {
        const full = cuts[k + 1] - cuts[k] === 1, c = p.color(cols[k % 4]); c.setAlpha(full ? 110 : 40);
        p.noStroke(); p.fill(c); p.beginShape(); p.vertex(V[0][0], V[0][1]); for (let i = cuts[k]; i <= cuts[k + 1]; i++) p.vertex(V[i][0], V[i][1]); p.endShape(p.CLOSE);
      }
      p.noFill(); p.stroke(C.ink); p.strokeWeight(3); p.beginShape(); V.forEach(v => p.vertex(v[0], v[1])); p.endShape(p.CLOSE);
      p.stroke(C.ink); p.strokeWeight(2); s.d.forEach(i => p.line(V[0][0], V[0][1], V[i][0], V[i][1]));
      if (G.line) { p.stroke(C.brand); p.strokeWeight(2.5); p.drawingContext.setLineDash([6, 5]); p.line(V[0][0], V[0][1], G.line.x, G.line.y); p.drawingContext.setLineDash([]); }
      V.forEach((v, i) => { if (i > 1 && i < r.n - 1 && !s.d.includes(i)) { p.noFill(); p.stroke(C.brand); p.strokeWeight(2); p.circle(v[0], v[1], 18); } else if (i) drawDot(p, C, v[0], v[1], 7, C.ink); });
      GEO.knob(p, C, V[0][0], V[0][1], C.brand);
    },
    press(G, x, y) { if (Math.hypot(x - G.V[0][0], y - G.V[0][1]) > 30) return false; G.line = { x, y }; return true; },
    drag(G, x, y) { if (!G.line) return false; G.line.x = x; G.line.y = y; return true; },
    release(G, x, y) {
      if (!G.line) return; G.line = null;
      const i = G.V.findIndex((v, k) => k > 1 && k < G.r.n - 1 && Math.hypot(x - v[0], y - v[1]) < 28);
      if (i > 0 && !G.s.d.includes(i)) { G.s.d.push(i); G.touch(); }
    },
    demo(G) { const i = [...Array(G.r.n).keys()].find(k => k > 1 && k < G.r.n - 1 && !G.s.d.includes(k)); return i ? { from: { x: G.V[0][0], y: G.V[0][1] }, to: { x: G.V[i][0], y: G.V[i][1] }, text: 'Arrastra del punto a otro vértice', ty: G.H - 44 } : null; },
    peek: G => ({ V: G.V }),
  });
  return game;
})();
;
//#archivo js/games/voltea-flecha.js
// Voltea la flecha (Preuniversitario UdeA, pu-cm-1; spec 2026-11-18-preuda-enteros): la regla de los signos se ve.
// Una flecha de tamaño a sale del 0. Con un deslizador se elige el multiplicador b: la flecha se repite |b| veces
// (se estira) y, si b es negativo, toda la cadena se refleja en el 0 (se voltea). Hay que llevar la punta al aro. Si a
// ya es negativa y b también, la cadena se voltea hacia la derecha: negativo por negativo, positivo. Estilo de la
// «balanza»: todo cambia en vivo mientras se arrastra, sin vidas ni reloj.
// params = { rounds: [{ a, target }] }   state = { rounds: [{ b }] }   (b entero de −6 a 6)
GAMES['voltea-flecha'] = (() => {
  const m = TK.minusTxt, B = 6;
  const par = v => (v < 0 ? `(${m(v)})` : String(v));
  const range = r => Math.max(15, Math.ceil((Math.max(Math.abs(r.target), Math.abs(r.a) * 3) + 2) / 5) * 5);
  const game = roundsGame({
    aspect: 1.32,
    init: () => ({ b: 1 }),
    ok: (s, r) => r.a * s.b === r.target,
    solution: r => `${par(r.a)} · ${par(r.target / r.a)} = ${m(r.target)}`,
    prompt: r => `Estira y voltea la flecha de ${m(r.a)} hasta llegar a ${m(r.target)}`,
    foot: (r, s) => (s.b < 0 ? 'Multiplicador negativo: la cadena se refleja en el 0' : s.b === 0 ? 'Por 0 no queda flecha' : 'Multiplicador positivo: solo se estira'),
    layout(G) {
      const R = range(G.r);
      G.L = { x0: 18, x1: G.W - 18, min: -R, max: R, y: 262 };
      G.X = v => G.L.x0 + (v + R) / (2 * R) * (G.L.x1 - G.L.x0);
      G.slY = G.H - 66; G.bx = b => 30 + (b + B) / (2 * B) * (G.W - 60);
    },
    enter(G) { G.dragging = false; game.layoutOf(G); },
    draw(G) {
      const { p, C, r, s, L, X } = G, R = L.max, v = r.a * s.b, ok = !VELO.on && v === r.target, clampV = x => Math.max(-R, Math.min(R, x));
      const col = G.locked ? (ok ? C.ok : C.bad) : ok ? C.ok : v < 0 ? C.coral : C.sky;
      TK.label(p, C, `${par(r.a)} · ${par(s.b)} = ${m(v)}`, G.W / 2, 104, G.locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.ink, 20, G.W - 24);
      drawNumLine(p, C, L, { step: 1, every: 5, size: 11 });
      // El espejo en el 0.
      p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([5, 5]); p.line(X(0), L.y - 104, X(0), L.y + 8); p.drawingContext.setLineDash([]);
      TK.label(p, C, 'espejo', X(0), L.y - 114, C.mute, 10, 60);
      // El aro donde debe quedar la punta.
      const tx = X(r.target);
      p.noFill(); p.stroke(C.ok); p.strokeWeight(2.5); p.circle(tx, L.y - 34, 26);
      TK.label(p, C, m(r.target), tx, L.y - 58, C.ok, 12, 40);
      // La flecha original (arriba, delgada): es la pieza que se repite.
      const arrowTo = (x0, x1, y, c, w, head = 8) => { if (Math.abs(x1 - x0) < 1) return; p.stroke(c); p.strokeWeight(w); p.line(x0, y, x1, y); const d = Math.sign(x1 - x0); p.noStroke(); p.fill(c); p.triangle(x1 + d * head * 0.6, y, x1 - d * head, y - head, x1 - d * head, y + head); };
      arrowTo(X(0), X(r.a), L.y - 86, r.a < 0 ? C.coral : C.sky, 3, 6);
      TK.label(p, C, `flecha: ${m(r.a)}`, X(r.a / 2) + (r.a < 0 ? -30 : 30), L.y - 98, C.mute, 11, 80);
      // Con multiplicador negativo: la cadena sin voltear queda punteada al otro lado.
      if (s.b < 0) {
        const gx = X(clampV(r.a * -s.b));
        p.stroke(C.mute); p.strokeWeight(3); p.drawingContext.setLineDash([3, 6]); p.line(X(0), L.y - 34, gx, L.y - 34); p.drawingContext.setLineDash([]);
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); const d = Math.sign(gx - X(0)); p.arc(X(0), L.y - 44, 44, 34, Math.PI, 2 * Math.PI);
        p.noStroke(); p.fill(C.mute); p.triangle(X(0) - d * 22, L.y - 40, X(0) - d * 27, L.y - 50, X(0) - d * 17, L.y - 50);
      }
      // La cadena: |b| copias de la flecha, de punta a cola. La punta se desliza y pasa por el 0 al voltearse.
      const shown = TK.glide(G, 'v' + G.cur, clampV(v), 7), hx = X(shown);
      arrowTo(X(0), hx, L.y - 34, col, 7, 10);
      for (let i = 1; i < Math.abs(s.b); i++) { const sx = X(r.a * i * Math.sign(s.b)); if (Math.abs(sx - X(0)) < Math.abs(hx - X(0)) - 4) { p.stroke(C.bg); p.strokeWeight(2.5); p.line(sx, L.y - 40, sx, L.y - 28); } }
      drawDot(p, C, X(0), L.y - 34, 10, C.cream);
      if (Math.abs(v) > R) TK.label(p, C, `${m(v)}: se sale de la recta`, G.W / 2, L.y + 40, C.bad, 12, 220);
      else TK.label(p, C, `${Math.abs(s.b)} ${Math.abs(s.b) === 1 ? 'copia' : 'copias'}${s.b < 0 ? ', volteadas' : ''}`, G.W / 2, L.y + 40, C.mute, 12, 220);
      // El deslizador del multiplicador: a la izquierda voltea, a la derecha no.
      const y = G.slY, bx = G.bx;
      p.strokeWeight(6); p.stroke(C.coral); p.line(bx(-B), y, bx(0), y); p.stroke(C.sky); p.line(bx(0), y, bx(B), y);
      for (let b = -B; b <= B; b++) { p.stroke(C.bg); p.strokeWeight(2); p.line(bx(b), y - 3, bx(b), y + 3); p.noStroke(); p.fill(b < 0 ? C.I : b ? C.Z : C.N); p.textStyle(p.BOLD); p.textSize(10); p.textAlign(p.CENTER, p.CENTER); p.text(m(b), bx(b), y + 24); }
      TK.label(p, C, 'voltea', bx(-B / 2), y - 26, C.I, 11, 80); TK.label(p, C, 'no voltea', bx(B / 2), y - 26, C.Z, 11, 80);
      p.stroke(col); p.strokeWeight(3); p.fill(C.cream); p.circle(bx(s.b), y, 32);
      p.noStroke(); p.fill(inkOn(C.cream, C.ink)); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.CENTER); p.text(`×${par(s.b)}`, bx(s.b), y + 1);
    },
    press(G, x, y) { if (Math.abs(y - G.slY) > 30) return false; G.dragging = true; game.setB(G, x); return true; },
    drag(G, x) { if (!G.dragging) return false; game.setB(G, x); return true; },
    release(G) { G.dragging = false; },
    // La mano arrastra el multiplicador hacia el lado que voltea.
    demo: G => ({ from: { x: G.bx(G.s.b), y: G.slY }, to: { x: G.bx(G.s.b > -2 ? -3 : 3), y: G.slY }, text: 'Arrastra el multiplicador: mira la flecha', ty: G.L.y + 64 }),
    peek: G => ({ slY: G.slY, xOf: [...Array(2 * B + 1).keys()].map(i => G.bx(i - B)), need: G.r.target / G.r.a }),
  });
  // El multiplicador que corresponde al dedo; cambia de ronda → la recta toma el rango de esa ronda.
  game.setB = (G, x) => { const b = Math.max(-B, Math.min(B, Math.round((x - 30) / (G.W - 60) * 2 * B - B))); if (b !== G.s.b || !G.touched[G.cur]) { G.s.b = b; G.touch(); } };
  game.layoutOf = G => { const R = range(G.r); G.L.min = -R; G.L.max = R; G.X = v => G.L.x0 + (v + R) / (2 * R) * (G.L.x1 - G.L.x0); };
  return Object.assign(game, { range });
})();
;
//#archivo js/games/capas-operacion.js
// Capas de una operación (Preuniversitario UdeA, pu-cm-1; spec 2026-11-18-preuda-enteros): la jerarquía se decide,
// no se memoriza. La expresión aparece en fichas; el estudiante ARRASTRA un número sobre su vecino y el juego los opera
// (las dos fichas se funden en su resultado; para una potencia se juntan la base y el exponente). Si junta dos que
// todavía no tocan, pierde una vida y el juego le dice qué capa va antes: paréntesis, potencias, × y ÷ (de izquierda a
// derecha), + y − (de izquierda a derecha). Una fila de capas marca las que ya quedaron resueltas.
// item = { expr: '6 + 2 * ( 5 - 8 ) ^ 2' }   (fichas separadas por espacios; '-3' es un número negativo, así que
// '-3 ^ 2' sería (−3)²: para −3² se escribe '0 - 3 ^ 2')
// state del reto = { tk: [fichas], last: índice de la ficha recién calculada, log: [pasos] }
GAMES['capas-operacion'] = (() => {
  const OPS = ['+', '-', '*', '/', '^'], SYM = { '+': '+', '-': '−', '*': '×', '/': '÷', '^': '^' };
  const m = TK.minusTxt;
  const parse = expr => expr.trim().split(/\s+/).map(t => (OPS.includes(t) ? { op: t } : t === '(' || t === ')' ? { p: t } : { n: +t }));
  const depth = (tk, i) => tk.slice(0, i).reduce((d, t) => d + (t.p === '(' ? 1 : t.p === ')' ? -1 : 0), 0);
  // El grupo (entre paréntesis, o la expresión entera) al que pertenece la ficha i: [desde, hasta).
  function group(tk, i) {
    let a = i, d = 0;
    while (a > 0) { const t = tk[a - 1]; if (t.p === ')') d++; else if (t.p === '(') { if (!d) break; d--; } a--; }
    let b = i; d = 0;
    while (b < tk.length) { const t = tk[b]; if (t.p === '(') d++; else if (t.p === ')') { if (!d) break; d--; } b++; }
    return [a, b];
  }
  // Operaciones de un grupo que están en su mismo nivel (no dentro de paréntesis más adentro).
  const opsIn = (tk, [a, b]) => { const out = []; let d = 0; for (let j = a; j < b; j++) { const t = tk[j]; if (t.p === '(') d++; else if (t.p === ')') d--; else if (t.op && !d) out.push(j); } return out; };
  const nextIn = (tk, g) => {
    const ops = opsIn(tk, g);
    const pw = ops.filter(j => tk[j].op === '^'); if (pw.length) return pw;
    const md = ops.filter(j => '*/'.includes(tk[j].op)); if (md.length) return [md[0]];
    return ops.length ? [ops[0]] : [];
  };
  // Las operaciones que se pueden hacer ya: en cada grupo (un paréntesis o la expresión entera), la que sigue según la
  // jerarquía, siempre que sus dos vecinos ya sean números (si uno es un paréntesis sin resolver, ese va primero).
  // Así 3² − 4 · (1 − 3) deja hacer 3² o el paréntesis en cualquier orden: los dos son pasos correctos.
  function legal(tk) {
    const num = j => tk[j]?.n !== undefined, out = [], seen = new Set();
    tk.forEach((t, i) => {
      if (!t.op) return;
      const g = group(tk, i), key = g.join(); if (seen.has(key)) return; seen.add(key);
      const ops = opsIn(tk, g), pw = ops.filter(j => tk[j].op === '^');
      if (pw.length) { out.push(...pw.filter(j => num(j - 1) && num(j + 1))); return; }
      const md = ops.filter(j => '*/'.includes(tk[j].op)), f = md.length ? md[0] : ops[0];
      if (f !== undefined && num(f - 1) && num(f + 1)) out.push(f);
    });
    return out.sort((a, b) => a - b);
  }
  // Por qué no se puede hacer todavía la operación i ('' si sí se puede).
  function why(tk, i) {
    if (legal(tk).includes(i)) return '';
    const g = group(tk, i), mine = opsIn(tk, g), op = tk[i].op;
    // Mientras quede un paréntesis sin resolver en su grupo, ese va antes.
    if (tk.slice(g[0], g[1]).some(t => t.p === '(')) return 'Primero lo que está entre paréntesis';
    if (op !== '^' && mine.some(j => tk[j].op === '^')) return 'Las potencias van antes que × ÷ + −';
    if ('+-'.includes(op) && mine.some(j => '*/'.includes(tk[j].op))) return 'La multiplicación y la división van antes que la suma y la resta';
    return 'Del mismo nivel: de izquierda a derecha';
  }
  const calc = (a, op, b) => (op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : op === '/' ? a / b : Math.pow(a, b));
  // Hace la operación i: sus dos números se vuelven uno; un paréntesis que queda con un solo número se quita.
  function apply(tk, i) {
    const r = calc(tk[i - 1].n, tk[i].op, tk[i + 1].n);
    let out = [...tk.slice(0, i - 1), { n: r, fresh: true }, ...tk.slice(i + 2)];
    for (let j = 1; j < out.length - 1; j++) if (out[j - 1].p === '(' && out[j].n !== undefined && out[j + 1].p === ')') { out = [...out.slice(0, j - 1), out[j], ...out.slice(j + 2)]; j = 0; }
    return out;
  }
  const value = expr => { let tk = parse(expr), g = 0; while (tk.length > 1 && g++ < 40) tk = apply(tk, legal(tk)[0]); return tk[0].n; };
  // La expresión como se lee: «6 + 2 × (−3)²».
  function show(tk) {
    let s = '';
    tk.forEach((t, i) => {
      if (t.op === '^') return;
      if (tk[i - 1]?.op === '^') { s += sup(t.n); return; }
      const neg = t.n < 0 && (i > 0 || tk[i + 1]?.op === '^');
      const txt = t.op ? ` ${SYM[t.op]} ` : t.p === '(' ? '(' : t.p === ')' ? ')' : neg ? `(${m(t.n)})` : m(t.n);
      s += txt;
    });
    return s.replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')').trim();
  }
  // Fichas en una sola fila centrada (un paréntesis nunca se parte): número 40 px o más, operación 32, paréntesis 14 y el
  // exponente arriba, más pequeño. Si no cabe, todo se achica por igual (G.k).
  function lay(G) {
    const tk = G.s.tk, gap = 5;
    const wOf = (t, i) => (t.op === '^' ? 0 : tk[i - 1]?.op === '^' ? 30 : t.op ? 32 : t.p ? 14 : Math.max(40, 14 + 10 * m(t.n).length));
    const tot = tk.reduce((s, t, i) => s + wOf(t, i) + (wOf(t, i) ? gap : 0), -gap);
    const k = G.k = Math.min(1, (G.W - 16) / tot), h = 44 * k, y0 = G.top + 70;
    let x = (G.W - tot * k) / 2;
    G.boxes = tk.map((t, i) => { const w = wOf(t, i) * k, up = tk[i - 1]?.op === '^', b = { x, y: up ? y0 - 16 * k : y0, w, h: up ? 30 * k : h }; if (w) x += w + gap * k; return b; });
    // El ^ se toca en el exponente: la caja del exponente sirve de botón.
    tk.forEach((t, i) => { if (t.op === '^') G.boxes[i] = G.boxes[i + 1]; });
  }
  return Object.assign(questGame({
    aspect: 1.25,
    init: it => ({ tk: parse(it.expr), last: -1, log: [] }),
    ok: (s, it) => s.tk.length === 1 && s.tk[0].n === value(it.expr),
    answer: it => ({ tk: [{ n: value(it.expr) }] }),
    solution: it => `${show(parse(it.expr))} = ${m(value(it.expr))}`,
    prompt: () => 'Junta las dos fichas que se operan primero',
    foot: () => 'Arrastra un número sobre su vecino: el juego hace la cuenta',
    layout: G => { G.grab = null; lay(G); },
    draw(G) {
      const { p, C, s } = G, tk = s.tk, g = G.grab;
      const isNum = i => tk[i]?.n !== undefined, over = g ? tk.findIndex((t, j) => j !== g.i && isNum(j) && hitBox(G.boxes[j], g.x, g.y)) : -1;
      const tile = (i, b, lifted) => {
        const t = tk[i], exp = tk[i - 1]?.op === '^', neg = t.n < 0 && !exp && (i > 0 || tk[i + 1]?.op === '^');
        drawTile(p, C, b, exp ? m(t.n) : neg ? `(${m(t.n)})` : m(t.n), { fill: exp ? C.sun : t.fresh && i === s.last ? C.mint : C.cream, size: (exp ? 14 : 18) * G.k, lift: lifted ? 5 : 2, ring: i === over ? C.brand : undefined });
      };
      tk.forEach((t, i) => {
        const b = G.boxes[i]; if (!b || t.op === '^') return;
        if (t.p) { TK.label(p, C, t.p, b.x + b.w / 2, b.y + b.h / 2, C.mute, 26 * G.k, 20); return; }
        // Las operaciones son el «pegante» entre fichas: se dibujan como signos, no como botones.
        if (t.op) { TK.label(p, C, SYM[t.op], b.x + b.w / 2, b.y + b.h / 2, C.sky, 24 * G.k, 30); return; }
        if (g && g.i === i) { p.noFill(); p.stroke(C.line); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 4]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); return; }
        tile(i, b);
      });
      // Las capas: se marca la que ya no tiene operaciones pendientes.
      const left = [tk.some(t => t.p), tk.some(t => t.op === '^'), tk.some(t => t.op === '*' || t.op === '/'), tk.some(t => t.op === '+' || t.op === '-')];
      const pw = (G.W - 24 - 18) / 4, py = G.top + 150;
      ['( )', 'xⁿ', '× ÷', '+ −'].forEach((lab, k) => {
        const b = { x: 12 + k * (pw + 6), y: py, w: pw, h: 30 };
        p.noFill(); p.stroke(left[k] ? C.line : C.ok); p.strokeWeight(left[k] ? 1.5 : 2); p.rect(b.x, b.y, b.w, b.h, 15);
        TK.label(p, C, left[k] ? lab : `${lab} ✓`, b.x + b.w / 2, b.y + b.h / 2, left[k] ? C.mute : C.ok, 13, pw - 8);
      });
      // Los últimos pasos hechos, debajo.
      s.log.slice(-3).forEach((l, k, a) => TK.label(p, C, l, G.W / 2, G.bottom - 64 + (k - a.length + 1) * 22, k === a.length - 1 ? C.Q : C.mute, 14, G.W - 30));
      if (tk.length === 1) TK.label(p, C, G.solved ? '¡Resuelto!' : 'Ese es el resultado', G.W / 2, G.bottom - 20, C.ok, 14, 200);
      // La ficha que va en el dedo, por encima de todo.
      if (g) { const b = G.boxes[g.i]; tile(g.i, { x: g.x - b.w / 2, y: g.y - b.h / 2 - 6, w: b.w, h: b.h }, true); }
    },
    press(G, x, y) {
      const tk = G.s.tk, i = tk.findIndex((t, j) => t.n !== undefined && hitBox(G.boxes[j], x, y));
      if (i < 0 || tk.length === 1) return false;
      G.grab = { i, x, y }; G.api.sfx?.tap?.();
      return true;
    },
    drag(G, x, y) { if (!G.grab) return false; G.grab.x = x; G.grab.y = y; return true; },
    release(G, x, y) {
      const g = G.grab; if (!g) return;
      G.grab = null;
      const s = G.s, tk = s.tk, j = tk.findIndex((t, k) => k !== g.i && t.n !== undefined && hitBox(G.boxes[k], x, y));
      if (j < 0) return;   // se soltó en el aire: la ficha vuelve a su sitio
      const lo = Math.min(g.i, j), i = lo + 1;
      if (Math.abs(g.i - j) !== 2 || !tk[i].op) { G.a.say('Esas dos fichas no son vecinas: entre ellas hay más cosas', G.C.bad); return; }
      const reason = why(tk, i);
      if (reason) { G.bad(reason); return; }
      const a = tk[i - 1].n, b = tk[i + 1].n, r = calc(a, tk[i].op, b);
      s.log.push(tk[i].op === '^' ? `${a < 0 ? `(${m(a)})` : m(a)}${sup(b)} = ${m(r)}` : `${m(a)} ${SYM[tk[i].op]} ${b < 0 ? `(${m(b)})` : m(b)} = ${m(r)}`);
      s.tk = apply(tk, i); s.last = s.tk.findIndex(t => t.fresh); s.tk.forEach((t, k) => { if (k !== s.last) delete t.fresh; });
      lay(G);
      if (s.tk.length === 1) G.submit();
    },
    // La mano junta dos fichas vecinas (las del primer paso correcto): así se ve qué es «operar» en este juego.
    demo(G) {
      const tk = G.s.tk; if (tk.length === 1) return null;
      const i = legal(tk)[0], c = b => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
      return { from: c(G.boxes[i - 1]), to: c(G.boxes[i + 1]), text: 'Arrastra un número sobre su vecino', ty: G.top + 44 };
    },
    // Para el robot: las dos cajas que hay que juntar ahora, y un par que todavía no toca.
    peek: G => {
      const tk = G.s.tk, c = b => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
      if (tk.length === 1) return {};
      const i = legal(tk)[0], bad = tk.findIndex((t, j) => t.op && why(tk, j));
      return { from: c(G.boxes[i - 1]), to: c(G.boxes[i + 1]), wrong: bad >= 0 ? [c(G.boxes[bad - 1]), c(G.boxes[bad + 1])] : null };
    },
  }), { parse, legal, why, apply, show, value });
})();
;
//#archivo js/explora-pu-ge-1.js
// Preuniversitario · pu-ge-1 «Ángulos y paralelas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const O = [170, 150];
  // Media vuelta partida por un rayo en el ángulo a.
  const media = (v, K) => {
    const R = K.at(...O, 115, v.a), D = [300, O[1]], I = [40, O[1]];
    return K.ang(O, D, R, 42, `${Math.round(v.a)}°`, 'fa', 'ta') + K.f(v.ver ?? 1, K.ang(O, R, I, 34, v.ver === 0 ? '' : `${180 - Math.round(v.a)}°`, 'fg', 'tg'))
      + K.l(...I, ...D) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
  };
  // Dos rectas que se cruzan.
  const cruce = (v, K) => {
    const C = [170, 100], P = g => K.at(...C, 92, g), r = v.rot ?? 0, a = v.a;
    const A = P(r), B = P(r + a), A2 = P(r + 180), B2 = P(r + 180 + a), n = Math.round(a);
    return K.f(v.f1 ?? 1, K.ang(C, A, B, 40, `${n}°`, 'fa', 'ta')) + K.f(v.f2 ?? 0, K.ang(C, A2, B2, 40, `${n}°`, 'fa', 'ta'))
      + K.f(v.f3 ?? 0, K.ang(C, B, A2, 30, `${180 - n}°`, 'fg', 'tg')) + K.f(v.f4 ?? 0, K.ang(C, B2, A, 30, `${180 - n}°`, 'fg', 'tg'))
      + K.l(...A, ...A2) + K.l(...B, ...B2) + K.c(...C, 4, 'fk');
  };
  // Complemento: un cuarto de vuelta partido en dos.
  const recto = (v, K) => {
    const V = [110, 170], R = K.at(...V, 135, v.a), D = [265, 170], U = [110, 20], n = Math.round(v.a);
    return K.ang(V, D, R, 46, `${n}°`, 'fa', 'ta') + K.ang(V, R, U, 38, `${90 - n}°`, 'fg', 'tg') + K.l(...V, ...D) + K.l(...V, ...U) + K.l(...V, ...R, 'la gr') + K.c(...V, 4, 'fk');
  };
  // Paralelas en y = 60 e y = 150 con una transversal de ángulo a.
  const Y1 = 62, Y2 = 152;
  const par = (v, K) => {
    const t = Math.tan(v.a * Math.PI / 180), X = y => 170 + (107 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], n = Math.round(v.a);
    const d = (W, s) => [W[0] + s * 100, W[1]], up = [X(Y1 - 40), Y1 - 40], dn = [X(Y2 + 40), Y2 + 40];
    return K.f(v.cor ?? 0, K.ang(P, d(P, 1), up, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.alt ?? 0, K.ang(P, d(P, -1), Q, 26, `${n}°`, 'fa', 'ta') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.f(v.con ?? 0, K.ang(P, d(P, 1), Q, 26, v.oculta ? '?' : `${180 - n}°`, 'fg', 'tg') + K.ang(Q, d(Q, 1), P, 26, `${n}°`, 'fa', 'ta'))
      + K.l(20, Y1, 320, Y1) + K.l(20, Y2, 320, Y2) + K.l(...up, ...dn, 'la gr') + K.t(312, Y1 - 8, 'ℓ₁', 'tm') + K.t(312, Y2 - 8, 'ℓ₂', 'tm');
  };
  const TX = v => { // triángulo de base 70..270 con ángulos a y b
    const A = [85, 170], B = [255, 170], ta = Math.tan(v.a * Math.PI / 180), tb = Math.tan(v.b * Math.PI / 180), x = 170 * tb / (ta + tb);
    return [A, B, [85 + x, 170 - x * ta]];
  };
  const tri = (v, K) => {
    const [A, B, C] = TX(v), a = Math.round(v.a), b = Math.round(v.b);
    const cA = v.une ?? 0, L = [C[0] - 120, C[1]], R = [C[0] + 120, C[1]];
    return K.ang(A, B, C, 32, `${a}°`, 'fa', 'ta') + K.ang(B, C, A, 32, `${b}°`, 'fg', 'tg') + (v.ext == null || v.ext < 0.5 ? K.ang(C, A, B, 26, v.oc ? '?' : `${180 - a - b}°`, 'ff', 'tf') : '')
      + K.f(cA, K.l(Math.max(6, L[0]), L[1], Math.min(334, R[0]), R[1], 'lm d') + K.ang(C, L, A, 20, '', 'fa') + K.ang(C, B, R, 20, '', 'fg'))
      + K.f(v.ext ?? 0, K.l(B[0], B[1], 330, 170, 'lm') + K.ang(B, [330, 170], C, 24, `${a + (180 - a - b)}°`, 'fo', 'to') + K.ang(C, A, B, 26, `${180 - a - b}°`, 'ff', 'tf'))
      + K.pl([A, B, C, A]);
  };
  const pol = (v, K) => {
    const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 88, 90 + i * 360 / n));
    let h = '';
    for (let i = 1; i < n - 1; i++) h += K.f(v.f ?? 1, K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]));
    return h + K.p(P, 'fn') + K.t(40, 190, `${n} lados`, 'tm');
  };

  xpLec('pu-ge-1', [
    ['Ángulos que se completan',
      xpMira('dibujo', 'Empecemos por lo básico: ángulos que **juntos** forman algo conocido.', { dib: (v, K) => (v.cual < 0.5 ? media(v, K) : v.cual < 1.5 ? recto(v, K) : cruce(v, K)), v: { cual: 0, a: 60, ver: 1, rot: 12, f1: 1, f2: 0, f3: 0, f4: 0 }, alto: 200 }, [
        ['Un rayo parte la media vuelta en dos ángulos. Juntos siempre dan 180°: son suplementarios.', {}, '$60^\\circ + 120^\\circ = 180^\\circ$'],
        ['Si uno crece, el otro se achica lo mismo. La suma no cambia.', { a: 140 }, '$140^\\circ + 40^\\circ = 180^\\circ$'],
        ['En una esquina recta pasa igual, pero juntos dan 90°: son complementarios.', { cual: 1, a: 35 }, '$35^\\circ + 55^\\circ = 90^\\circ$'],
        ['Ahora dos rectas que se cruzan, como una tijera abierta.', { cual: 2, a: 80 }],
        ['Los ángulos de enfrente abren lo mismo: son opuestos por el vértice, y son iguales.', { f2: 1 }],
        ['Y los de al lado completan la media vuelta: 100° cada uno.', { f3: 1, f4: 1 }, '$80^\\circ + 100^\\circ = 180^\\circ$'],
      ], 'Vecinos sobre una recta suman 180°; en una esquina recta, 90°; los opuestos por el vértice son iguales.'),
      xpHaz('dibujo', 'Arrastra el rayo hasta que el ángulo dorado, el vecino, mida 115°.', { dib: media, v: { a: 120 }, metas: { a: 65 }, alto: 190,
        manijas: [{ k: 'a', min: 15, max: 165, paso: 5, en: v => XPK.at(...O, 115, v.a), de: (x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * 180 / Math.PI) }],
        lee: v => `$${v.a}^\\circ + ${180 - v.a}^\\circ = 180^\\circ$`, dice: v => `El tuyo mide ${v.a}° y al dorado le queda lo que falta para 180°.` }, 'Al vecino le toca lo que falta: $180^\\circ - 115^\\circ = 65^\\circ$.')],
    ['Paralelas y transversal',
      xpMira('dibujo', 'Segunda idea: una recta que corta a **dos paralelas** repite sus ángulos.', { dib: par, v: { a: 60, cor: 0, alt: 0, con: 0 }, alto: 200 }, [
        ['Dos paralelas y una recta que las atraviesa: la transversal. Se forman dos cruces idénticos.', {}],
        ['Los que están en la misma esquina de cada cruce son iguales: se llaman correspondientes.', { cor: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Entre las paralelas, a lados distintos de la transversal, forman una Z: alternos internos, iguales.', { cor: 0, alt: 1 }, '$60^\\circ = 60^\\circ$'],
        ['Entre las paralelas y del mismo lado están los conjugados: esos suman 180°.', { alt: 0, con: 1 }, '$120^\\circ + 60^\\circ = 180^\\circ$'],
        ['Si la transversal se inclina cambian los números, pero no las relaciones.', { a: 105 }, '$75^\\circ + 105^\\circ = 180^\\circ$'],
      ], 'Con paralelas: correspondientes y alternos internos son iguales; conjugados internos suman 180°.'),
      xpHaz('dibujo', 'Inclina la transversal hasta que el conjugado dorado, el que no se ve, mida 125°.', { dib: par, v: { a: 90, con: 1, oculta: 1 }, metas: { a: 55 }, alto: 200,
        manijas: [{ k: 'a', min: 40, max: 140, paso: 5, en: v => [170 + 85 / Math.tan(v.a * Math.PI / 180), 22], de: x => Math.atan2(85, x - 170) * 180 / Math.PI }],
        lee: v => `$? + ${v.a}^\\circ = 180^\\circ$`, dice: v => `El ángulo de abajo mide ${v.a}°. El dorado es su conjugado.` }, 'Conjugados suman 180°: $180^\\circ - 125^\\circ = 55^\\circ$.')],
    ['Los ángulos de un triángulo',
      xpMira('dibujo', 'Tercera idea: por qué los ángulos de **cualquier** triángulo suman 180°.', { dib: tri, v: { a: 55, b: 65, une: 0, ext: 0 }, alto: 200 }, [
        ['Este triángulo tiene tres ángulos distintos. ¿Cuánto suman?', {}],
        ['Trazamos arriba una paralela a la base. Los ángulos de abajo reaparecen arriba: son alternos internos.', { une: 1 }],
        ['Arriba, los tres juntos forman media vuelta. Por eso suman 180°.', {}, '$55^\\circ + 60^\\circ + 65^\\circ = 180^\\circ$'],
        ['Cambia el triángulo y la suma sigue igual.', { a: 80, b: 35 }, '$80^\\circ + 65^\\circ + 35^\\circ = 180^\\circ$'],
        ['Si alargamos un lado aparece un ángulo exterior: mide lo mismo que los otros dos interiores juntos.', { une: 0, ext: 1 }, '$80^\\circ + 65^\\circ = 145^\\circ$'],
      ], 'Los tres ángulos de un triángulo suman 180°, y un exterior es la suma de los dos interiores lejanos.'),
      xpHaz('dibujo', 'El ángulo dorado mide 45°. Mueve el de la izquierda hasta que el de arriba, oculto, mida 70°.', { dib: tri, v: { a: 40, b: 45, oc: 1 }, metas: { a: 65 }, alto: 200,
        manijas: [{ k: 'a', min: 25, max: 75, paso: 5, en: v => TX(v)[2], de: (x, y) => Math.atan2(170 - y, x - 85) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + 45^\\circ + ? = 180^\\circ$`, dice: v => `Los dos de abajo suman ${v.a + 45}°. Arriba queda lo que falta para 180°.` }, 'Falta lo que queda de 180°: $180^\\circ - 45^\\circ - 70^\\circ = 65^\\circ$.')],
    ['Polígonos: cortar en triángulos',
      xpMira('dibujo', 'Cuarta idea: cualquier polígono se **corta en triángulos**.', { dib: pol, v: { n: 4, f: 0 }, alto: 200 }, [
        ['Un cuadrilátero no es un triángulo, pero podemos cortarlo desde una esquina.', {}],
        ['Salen dos triángulos, cada uno con 180°: los cuatro ángulos suman 360°.', { f: 1 }, '$2 \\cdot 180^\\circ = 360^\\circ$'],
        ['Con cinco lados salen tres triángulos: 540°.', { n: 5 }, '$3 \\cdot 180^\\circ = 540^\\circ$'],
        ['Siempre salen dos triángulos menos que lados: con ocho lados, seis triángulos.', { n: 8 }, '$(n - 2) \\cdot 180^\\circ$'],
        ['Si el polígono es regular, la suma se reparte por igual entre sus ángulos: 1 080 entre 8 son 135°.', {}, '$1080^\\circ \\div 8 = 135^\\circ$'],
      ], 'Un polígono de n lados se corta en n − 2 triángulos: sus ángulos suman $(n - 2) \\cdot 180^\\circ$.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que los ángulos sumen 720°.', { dib: pol, v: { n: 3, f: 1 }, metas: { n: 6 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 10, paso: 1 }],
        lee: v => `$${v.n - 2} \\cdot 180^\\circ = ${(v.n - 2) * 180}^\\circ$`, dice: v => `${v.n} lados: ${v.n - 2} ${v.n === 3 ? 'triángulo' : 'triángulos'}.` }, 'Cuatro triángulos, seis lados: $4 \\cdot 180^\\circ = 720^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una escalera de tijera tiene dos patas iguales y arriba debe abrir 40°. Inclínala: ¿qué ángulo hace cada pata con el piso?', {
        dib: (v, K) => { const h = 130, d = h / Math.tan(v.a * Math.PI / 180), A = [170 - d, 170], B = [170 + d, 170], C = [170, 40]; return K.ang(A, B, C, 28, `${v.a}°`, 'fa', 'ta') + K.ang(B, C, A, 28, `${v.a}°`, 'fa', 'ta') + K.ang(C, A, B, 26, '?', 'ff', 'tf') + K.l(20, 170, 320, 170, 'lm') + K.pl([A, C, B], 'gr'); },
        v: { a: 50 }, metas: { a: 70 }, alto: 200, manijas: [{ k: 'a', min: 45, max: 85, paso: 5, en: v => [170 + 130 / Math.tan(v.a * Math.PI / 180), 170], de: x => Math.atan2(130, Math.max(1, x - 170)) * 180 / Math.PI }],
        lee: v => `$${v.a}^\\circ + ${v.a}^\\circ + ? = 180^\\circ$`, dice: v => `Las patas iguales hacen ángulos iguales con el piso: ${v.a}° cada una.` }, 'Los dos de abajo son iguales y suman $180^\\circ - 40^\\circ = 140^\\circ$: 70° cada uno.')],
  ], 'Vecinos que completan 180°, paralelas que repiten ángulos, triángulos de 180° y polígonos hechos de triángulos.');
}
;
//#archivo js/explora-pu-ge-2.js
// Preuniversitario · pu-ge-2 «Triángulos y Pitágoras» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const U = 6.5, OX = 92, OY = 168;
  let Z = U;
  const P = (x, y) => [OX + x * Z, OY - y * Z];
  const sq = x => Math.round(x * x * 10) / 10;
  // Triángulo rectángulo con los tres cuadrados; los catetos son a (hacia arriba) y b (hacia la derecha).
  const cuad = (v, K) => {
    Z = v.u ?? U;
    const { a, b } = v, m = v.f ?? 1, fc = v.fc ?? m;
    const rej = (x0, y0, n) => { let h = ''; for (let i = 1; i < n; i++) h += K.l(...P(x0 + i, y0), ...P(x0 + i, y0 + n), 'ls') + K.l(...P(x0, y0 + i), ...P(x0 + n, y0 + i), 'ls'); return h; };
    const ent = Number.isInteger(a) && Number.isInteger(b);
    return K.f(m, K.p([P(0, 0), P(b, 0), P(b, -b), P(0, -b)], 'fa') + K.p([P(0, 0), P(0, a), P(-a, a), P(-a, 0)], 'fg') + (ent ? rej(0, -b, b) + rej(-a, 0, a) : '')
      + K.t(...P(b / 2, -b / 2 - 0.7), sq(b), 'ta') + K.t(...P(-a / 2, a / 2 - 0.7), sq(a), 'tg'))
      + K.f(fc, K.p([P(b, 0), P(0, a), P(a, a + b), P(a + b, b)], 'ff') + K.t(...P((a + b) / 2, (a + b) / 2 - 0.7), v.oc ? '?' : sq(Math.hypot(a, b)), 'tf'))
      + K.p([P(0, 0), P(b, 0), P(0, a)], 'fc') + K.pl([P(0, 1), P(1, 1), P(1, 0)], 'lm') + K.pl([P(0, 0), P(b, 0), P(0, a), P(0, 0)]);
  };
  const K1 = x => String(Math.round(x * 100) / 100);
  // Triángulo rectángulo con rótulos, a escala u.
  const tri = (v, K) => {
    const u = v.u ?? 11, A = [60, 185], B = [60 + v.b * u, 185], C = [60, 185 - v.a * u];
    return K.p([A, B, C], 'fa') + K.pl([[60, 175], [70, 175], [70, 185]], 'lm') + K.t((A[0] + B[0]) / 2, 203, v.lb ?? K1(v.b), 'ta') + K.t(50, (A[1] + C[1]) / 2 + 5, v.la ?? K1(v.a), 'tg', 'end')
      + K.t((B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2 - 8, v.lc ?? K1(Math.hypot(v.a, v.b)), 'tf', 'start');
  };
  // Los dos especiales: medio cuadrado (m = 0) y medio equilátero (m = 1).
  const esp = (v, K) => {
    if (v.m < 0.5) {
      const S = 130, x = 105, y = 30, Q = [[x, y], [x + S, y], [x + S, y + S], [x, y + S]];
      return K.p(Q, 'fc') + K.f(v.f, K.p([Q[0], Q[2], Q[3]], 'fa') + K.l(...Q[0], ...Q[2], 'lf gr') + K.ang(Q[2], Q[3], Q[0], 28, '45°', 'fg', 's') + K.t(x + S / 2 + 12, y + S / 2 - 10, 'x√2', 'tf', 'start'))
        + K.t(x + S / 2, y + S + 20, 'x') + K.t(x - 12, y + S / 2 + 5, 'x');
    }
    const A = [90, 175], B = [250, 175], C = [170, 175 - 138.6], M = [170, 175];
    return K.p([A, B, C], 'fc') + K.f(v.f, K.p([A, M, C], 'fa') + K.l(...C, ...M, 'lf gr') + K.ang(A, M, C, 26, '60°', 'fg', 's') + K.ang(C, A, M, 34, '30°', 'fg', 's') + K.t(181, 120, 'x√3', 'tf', 'start') + K.t(128, 194, 'x'))
      + K.t(118, 104, '2x', '', 'end') + K.t(222, 104, '2x', '', 'start');
  };
  const V35 = (v, K) => {
    const u = v.u ?? 4.2, k = v.k, A = [90, 190], B = [90 + 4 * k * u, 190], C = [90, 190 - 3 * k * u];
    return K.p([A, B, C], 'fa') + K.t((A[0] + B[0]) / 2, 207, `4 · ${k} = ${4 * k}`, 'ta') + K.t(82, (A[1] + C[1]) / 2 + 5, `3 · ${k} = ${3 * k}`, 'tg', 'end') + K.t((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 6, `5 · ${k} = ${5 * k}`, 'tf', 'start');
  };

  xpLec('pu-ge-2', [
    ['Tres cuadrados',
      xpMira('dibujo', 'Empecemos por la idea: Pitágoras habla de **áreas de cuadrados**.', { dib: cuad, v: { a: 3, b: 4, f: 0, fc: 0, u: 8 }, alto: 225 }, [
        ['Un triángulo rectángulo: sus dos lados cortos, los catetos, forman una esquina recta.', {}],
        ['Sobre cada cateto armamos un cuadrado: uno tiene 9 casillas y el otro 16.', { f: 1 }, '$3^2 = 9 \\quad 4^2 = 16$'],
        ['Sobre el lado largo, la hipotenusa, otro cuadrado. Su área es justo la de los dos juntos: 25.', { fc: 1 }, '$9 + 16 = 25$'],
        ['Si un cuadrado tiene área 25, su lado mide 5: esa es la hipotenusa.', {}, '$c = \\sqrt{25} = 5$'],
        ['Con otros catetos pasa lo mismo: 9 más 36 son 45, y la hipotenusa es la raíz de 45.', { a: 3, b: 6 }, '$c = \\sqrt{45} \\approx 6.7$'],
      ], 'En un triángulo rectángulo, el cuadrado de la hipotenusa vale lo que los dos de los catetos: $c^2 = a^2 + b^2$.'),
      xpHaz('dibujo', 'Arrastra las puntas de los catetos hasta que el cuadrado de la hipotenusa valga 113.', { dib: cuad, v: { a: 4, b: 4 }, alto: 260, cumple: v => v.a * v.a + v.b * v.b === 113, sol: { a: 7, b: 8 },
        manijas: [{ k: 'a', min: 1, max: 12, paso: 1, r: 9, en: v => P(0, v.a), de: (x, y) => (OY - y) / U }, { k: 'b', min: 1, max: 12, paso: 1, r: 9, en: v => P(v.b, 0), de: x => (x - OX) / U }],
        lee: v => `$${v.a}^2 + ${v.b}^2 = ${v.a * v.a} + ${v.b * v.b} = ${v.a * v.a + v.b * v.b}$`, dice: v => (v.a * v.a + v.b * v.b > 113 ? 'Te pasaste: el cuadrado grande es mayor que 113.' : 'Busca dos cuadrados que juntos hagan 113.') }, '$49 + 64 = 113$: catetos 7 y 8, y la hipotenusa mide $\\sqrt{113} \\approx 10.6$.')],
    ['El lado que falta',
      xpMira('dibujo', 'Segunda idea: si falta un **cateto**, los cuadrados se restan.', { dib: tri, v: { a: 20, b: 21, lc: '29', la: '?', u: 8 }, alto: 215 }, [
        ['Aquí conocemos la hipotenusa, 29, y un cateto, 21. Falta el otro.', {}],
        ['El cuadrado grande vale 841: es lo que suman los dos chicos. Uno de ellos es 441.', {}, '$29^2 = 841 \\quad 21^2 = 441$'],
        ['Lo que sobra es el cuadrado que buscamos: 841 menos 441 son 400.', {}, '$841 - 441 = 400$'],
        ['Su lado es la raíz de 400. El cateto mide 20.', { la: '20' }, '$a = \\sqrt{400} = 20$'],
        ['Cuidado: no se restan los lados. 29 menos 21 son 8, y eso no es el cateto.', {}, '$29 - 21 \\neq 20$'],
      ], 'Hipotenusa: se suman los cuadrados. Cateto: se restan. Al final, la raíz.'),
      xpHaz('dibujo', 'La base mide 9 y la hipotenusa debe medir 15. Estira el otro cateto.', { dib: tri, v: { a: 5, b: 9, u: 12 }, metas: { a: 12 }, alto: 215,
        manijas: [{ k: 'a', min: 2, max: 14, paso: 1, en: v => [60, 185 - v.a * 12], de: (x, y) => (185 - y) / 12 }],
        lee: v => `$${v.a}^2 + 9^2 = ${v.a * v.a + 81} \\quad c \\approx ${K1(Math.hypot(v.a, 9))}$`, dice: v => `El cuadrado de la hipotenusa va en ${v.a * v.a + 81}. Debe ser 15 · 15 = 225.` }, '$225 - 81 = 144$ y $\\sqrt{144} = 12$.')],
    ['Triángulos que conviene reconocer',
      xpMira('dibujo', 'Tercera idea: hay triángulos que se **reconocen** y ahorran la cuenta.', { dib: (v, K) => (v.t < 0.5 ? V35({ k: Math.max(1, Math.round(v.k)), u: v.u }, K) : esp(v, K)), v: { t: 0, k: 1, m: 0, f: 0, u: 24 }, alto: 215 }, [
        ['El 3, 4, 5 es el más famoso: 9 más 16 son 25.', {}, '$3^2 + 4^2 = 5^2$'],
        ['Si todos los lados se multiplican por lo mismo, sigue siendo rectángulo: 18, 24 y 30.', { k: 6, u: 6 }, '$3k, \\; 4k, \\; 5k$'],
        ['Otro: cortamos un cuadrado por su diagonal. Quedan dos ángulos de 45° y dos catetos iguales.', { t: 1, m: 0, f: 1 }, '$x^2 + x^2 = 2x^2$'],
        ['La diagonal es siempre el lado por raíz de 2, un poco menos de una vez y media.', {}, '$d = x\\sqrt{2} \\approx 1.41x$'],
        ['Y medio triángulo equilátero tiene ángulos de 30°, 60° y 90°: el cateto corto es la mitad de la hipotenusa.', { m: 1 }, '$x, \\; x\\sqrt{3}, \\; 2x$'],
      ], 'Reconoce 3-4-5 y sus múltiplos, el medio cuadrado $x, x, x\\sqrt2$ y el medio equilátero $x, x\\sqrt3, 2x$.'),
      xpHaz('dibujo', 'Agranda el triángulo 3-4-5 hasta que su hipotenusa mida 35.', { dib: V35, v: { k: 1 }, metas: { k: 7 }, alto: 260, manijas: [{ k: 'k', min: 1, max: 10, paso: 1, et: 'factor' }],
        lee: v => `$${3 * v.k}, \\; ${4 * v.k}, \\; ${5 * v.k}$`, dice: v => `Todos los lados por ${v.k}: el triángulo no cambia de forma.` }, 'El factor es 7: lados 21, 28 y 35.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque rectangular mide 24 m por 18 m. Se cruza por la diagonal. Estira la cinta desde una esquina hasta la opuesta: ¿cuánto mide?', {
        dib: (v, K) => { const A = [58, 190], n = v.c / 30; return K.r(58, 22, 224, 168, 'fc') + K.cota(58, 196, 282, 196, '24 m') + K.t(48, 110, '18 m', 'tm', 'end') + K.l(...A, 58 + n * 224, 190 - n * 168, 'la gr'); },
        v: { c: 5 }, metas: { c: 30 }, alto: 225, manijas: [{ k: 'c', min: 2, max: 32, paso: 1, rot: v => String(v.c), en: v => [58 + v.c / 30 * 224, 190 - v.c / 30 * 168], de: (x, y) => ((x - 58) * 0.8 + (190 - y) * 0.6) / 280 * 30 }],
        lee: v => `$${v.c}^2 = ${v.c * v.c} \\qquad 24^2 + 18^2 = 900$`, dice: v => (v.c < 30 ? 'La cinta aún no llega a la esquina.' : v.c > 30 ? 'La cinta se pasó de la esquina.' : 'Justo hasta la esquina: es un 3-4-5 por 6.') }, 'Es un 3-4-5 por 6: la diagonal mide 30 m, frente a 42 m por el borde.')],
  ], 'Cuadrados que se suman para la hipotenusa, se restan para un cateto, y triángulos que se reconocen de una mirada.');
}
;
//#archivo js/explora-pu-ge-3.js
// Preuniversitario · pu-ge-3 «Semejanza y escala» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos rectángulos: el modelo w0 × h0 y la copia w × h (u píxeles por unidad).
  const foto = (v, K) => {
    const u = 19, x = 108, y = 190, w = v.w * u, h = v.h * u, cara = (X, Y, W, H) => K.c(X + W * 0.5, Y + H * 0.42, 1, 'sn fM') + `<ellipse class="xf fg" cx="${X + W / 2}" cy="${Y + H / 2}" rx="${W * 0.2}" ry="${H * 0.32}"/>`;
    return K.r(12, y - 3 * u, 4 * u, 3 * u, 'fc') + cara(12, y - 3 * u, 4 * u, 3 * u) + K.t(12 + 2 * u, y + 18, '4', 'tm') + K.t(12 + 2 * u, y - 3 * u - 8, 'modelo', 's tm')
      + K.r(x, y - h, w, h, 'fa') + cara(x, y - h, w, h) + K.t(x + w / 2, y + 18, N(v.w), 'ta') + K.t(x - 8, y - h / 2 + 5, N(v.h), 'tg', 'end') + K.t(20, y - 3 * u / 2 + 5, '3', 'tm');
  };
  // Sombras: objeto de altura h y sombra s; vara de referencia de altura h0 y sombra s0.
  const som = (v, K) => {
    const u = v.u ?? 16, y = 180, x1 = 30, x2 = 120, ray = (x, h, s, c) => K.l(x, y - h * u, x + s * u, y, `${c} d`);
    return K.l(10, y, 330, y, 'lm') + K.l(x1, y, x1, y - v.h0 * u, 'gr la') + K.l(x1, y + 3, x1 + v.s0 * u, y + 3, 'gr lm') + K.f(v.ray ?? 1, ray(x1, v.h0, v.s0, 'lg')) + K.t(x1 - 9, y - v.h0 * u - 4, N(v.h0), 'ta') + K.t(x1 + v.s0 * u / 2, y + 20, N(v.s0), 'tm')
      + K.f(v.obj ?? 1, K.l(x2, y, x2, y - v.h * u, 'gr lf') + K.l(x2, y + 3, x2 + v.s * u, y + 3, 'gr lm') + (v.paralelo ? ray(x2, v.h, v.h * v.s0 / v.h0, 'lg') : ray(x2, v.h, v.s, 'lg')) + K.t(x2 - 14, y - v.h * u + 5, v.lh ?? N(v.h), 'tf', 'end') + K.t(x2 + v.s * u / 2, y + 20, N(v.s), 'tm'));
  };
  const cubo = (v, K) => {
    const k = Math.max(1, Math.round(v.k));
    if (v.m > 1.5) return K.caja([170, 195], 92 / Math.max(k, 2), k, k, k, 'fa');
    if (v.m > 0.5) { const u = 150 / Math.max(k, 3); let h = ''; for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) h += K.r(170 - k * u / 2 + i * u + 1, 185 - (j + 1) * u, u - 2, u - 2, 'fa'); return h; }
    const u = 250 / Math.max(k, 3); let h = ''; for (let i = 0; i < k; i++) h += K.l(45 + i * u + 3, 110, 45 + (i + 1) * u - 3, 110, 'la gr'); return h;
  };

  xpLec('pu-ge-3', [
    ['La misma forma',
      xpMira('dibujo', 'Empecemos por la idea: ser **semejante** es tener la misma forma en otro tamaño.', { dib: foto, v: { w: 4, h: 3 }, alto: 215 }, [
        ['Una foto de 4 por 3 y su copia. Todavía son iguales.', {}],
        ['Si solo se estira el ancho, la cara se deforma: ya no es la misma forma.', { w: 8 }],
        ['Para que no se deforme, el alto debe crecer igual: si el ancho se duplicó, el alto también.', { h: 6 }, '$\\tfrac84 = \\tfrac63 = 2$'],
        ['Ese 2 es la razón de semejanza. Es el mismo para todos los lados.', {}, '$k = 2$'],
        ['También sirve para achicar: todo por un medio da 2 por 1.5.', { w: 2, h: 1.5 }, '$\\tfrac24 = \\tfrac{1.5}{3} = \\tfrac12$'],
      ], 'Dos figuras son semejantes si tienen los mismos ángulos y todos los lados se multiplican por el **mismo** número, la razón.'),
      xpHaz('dibujo', 'Estira la foto de 4 por 3 hasta que tenga 10 de ancho, sin deformarla.', { dib: foto, v: { w: 5, h: 2 }, alto: 215, metas: { w: 10, h: 7.5 },
        manijas: [{ k: ['w', 'h'], min: [1, 1], max: [11, 8.5], paso: [0.5, 0.5], r: 10, en: v => [108 + v.w * 19, 190 - v.h * 19], de: (x, y) => [(x - 108) / 19, (190 - y) / 19] }],
        lee: v => `$\\tfrac{${v.w}}{4} = ${N(v.w / 4)} \\qquad \\tfrac{${v.h}}{3} = ${N(v.h / 3)}$`, dice: v => (Math.abs(v.w / 4 - v.h / 3) < 0.01 ? 'Las dos razones coinciden: no hay deformación.' : 'Las dos razones deben ser iguales.') }, 'La razón es 2.5: $4 \\cdot 2.5 = 10$ y $3 \\cdot 2.5 = 7.5$.')],
    ['Sombras y Tales',
      xpMira('dibujo', 'Segunda idea: a la misma hora, las **sombras** forman triángulos semejantes.', { dib: som, v: { h0: 2, s0: 3, h: 6, s: 9, ray: 1, obj: 0, u: 19 }, alto: 210 }, [
        ['Una vara de 2 m da una sombra de 3 m. El rayo de sol cierra un triángulo.', {}],
        ['Al lado hay un árbol con 9 m de sombra. El sol llega inclinado igual.', { obj: 1, lh: '?' }],
        ['Los rayos son paralelos: los triángulos tienen la misma forma. La sombra es 3 veces la otra.', {}, '$\\tfrac{9}{3} = 3$'],
        ['Entonces la altura también es 3 veces la de la vara: 6 m.', { lh: '6' }, '$2 \\cdot 3 = 6$'],
        ['Eso es el teorema de Tales: rectas paralelas cortan segmentos proporcionales.', {}, '$\\tfrac{2}{3} = \\tfrac{6}{9}$'],
      ], 'Con los rayos paralelos, altura y sombra guardan la misma razón en todos los objetos.'),
      xpHaz('dibujo', 'Una estaca de 1 m da 1.5 m de sombra y un poste da 9 m. Sube el poste hasta que su rayo caiga donde acaba su sombra.', { dib: som, v: { h0: 1, s0: 1.5, h: 2, s: 9, paralelo: 1, u: 21 }, metas: { h: 6 }, alto: 210,
        manijas: [{ k: 'h', min: 1, max: 8, paso: 0.5, en: v => [120, 180 - v.h * 21], de: (x, y) => (180 - y) / 21, r: 10 }],
        lee: v => `$\\tfrac{1}{1.5} = \\tfrac{${v.h}}{${N(v.h * 1.5)}}$`, dice: v => `Un poste de ${N(v.h)} m daría ${N(v.h * 1.5)} m de sombra.` }, 'La sombra es 6 veces la de la estaca: el poste mide 6 m.')],
    ['Largo, área y volumen',
      xpMira('dibujo', 'Tercera idea: al agrandar, el **área** y el **volumen** crecen más que el largo.', { dib: cubo, v: { k: 1, m: 0 }, alto: 205 }, [
        ['Un segmento se duplica: ahora mide 2 veces lo de antes.', { k: 2 }, '$\\text{largo: } \\times 2$'],
        ['Pero un cuadrado con el lado doble tiene 4 cuadritos: crece a lo ancho y a lo alto.', { m: 1 }, '$\\text{área: } \\times 4 \\quad (2^2 = 4)$'],
        ['Y un cubo con la arista doble tiene 8 cubitos: crece en tres direcciones.', { m: 2 }, '$\\text{volumen: } \\times 8 \\quad (2^3 = 8)$'],
        ['Con el lado cuatro veces más largo: 16 cuadritos.', { m: 1, k: 4 }, '$4^2 = 16$'],
        ['Y 64 cubitos. El error típico es multiplicar también el área y el volumen por 4.', { m: 2 }, '$4^3 = 64$'],
      ], 'Si los largos se multiplican por k, las áreas por $k^2$ y los volúmenes por $k^3$.'),
      xpHaz('dibujo', 'Un afiche cuadrado se agrandó y ahora gasta 25 veces el papel de antes. ¿Por cuánto se multiplicó su lado?', { dib: (v, K) => cubo({ ...v, m: 1 }, K), v: { k: 1 }, metas: { k: 5 }, alto: 255, manijas: [{ k: 'k', min: 1, max: 8, paso: 1, et: 'lado × ' }],
        lee: v => `$\\text{área: } \\times ${v.k * v.k} \\quad (${v.k}^2 = ${v.k * v.k})$`, dice: v => `Lado por ${v.k}: caben ${v.k * v.k} ${v.k === 1 ? 'afiche' : 'afiches'} de los de antes.` }, '$5^2 = 25$: el lado se multiplicó por 5, no por 25.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En un plano a escala 1 : 50, una pared mide 6 cm. Estira la pared real hasta su largo verdadero, en metros.', {
        dib: (v, K) => K.t(170, 24, 'plano: 1 cm → 50 cm = 0.5 m', 'tm') + K.r(50, 46, 120, 16, 'fg') + K.t(182, 60, '6 cm', 'tg', 'start') + K.r(40, 104, v.m * 52, 34, 'fa') + [1, 2, 3, 4, 5].map(i => K.l(40 + i * 52, 138, 40 + i * 52, 146, 'lm') + K.t(40 + i * 52, 161, `${i}`, 's tm')).join('') + K.t(316, 161, 'm', 's tm'),
        v: { m: 0.5 }, metas: { m: 3 }, alto: 175, manijas: [{ k: 'm', min: 0.5, max: 5, paso: 0.5, en: v => [40 + v.m * 52, 121], de: x => (x - 40) / 52 }],
        lee: v => `$${N(v.m)} \\text{ m} = ${N(v.m * 100)} \\text{ cm} = 50 \\cdot ${N(v.m * 2)}$`, dice: v => `${N(v.m)} m reales caben en ${N(v.m * 2)} cm del plano.` }, '$6 \\cdot 50 = 300$ cm: la pared mide 3 m.')],
  ], 'La misma razón en todos los lados, sombras proporcionales, y áreas que crecen con $k^2$ y volúmenes con $k^3$.');
}
;
//#archivo js/explora-pu-ge-4.js
// Preuniversitario · pu-ge-4 «Perímetros, áreas y círculos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Paralelogramo de base b y altura h inclinado s; c = 0..1 mueve el triángulo cortado al otro lado. tri: se ve medio.
  const U = 22;
  const para = (v, K) => {
    const x = 60, y = 180, b = v.b * U, h = v.h * U, s = v.s * U, d = (v.c ?? 0) * b;
    const T = [[x + d, y], [x + s + d, y - h], [x + s + d, y]];
    return K.p([[x + s, y], [x + b, y], [x + b + s, y - h], [x + s, y - h]], 'fa') + (v.s > 0.05 ? K.p(T, v.c > 0.02 ? 'fg' : 'fa') : '')
      + K.f(v.tri ?? 0, K.p([[x + s, y - h], [x + b + s, y - h], [x + b, y]], 'fc')) + K.cota(x + s * Math.min(1, v.c ?? 0), y + 8, x + s * Math.min(1, v.c ?? 0) + b, y + 8, N(v.b))
      + K.l(x + s, y, x + s, y - h, 'lf d') + K.t(x + s - 8, y - h / 2 + 5, N(v.h), 'tf', 'end');
  };
  const triang = (v, K) => {
    const x = 60, y = 185, b = 8 * 26, h = v.h * 26, ap = x + 130;
    return K.r(x, y - h, b, h, 'fc d') + K.p([[x, y], [x + b, y], [ap, y - h]], 'fa') + K.l(ap, y, ap, y - h, 'lf d') + K.cota(x, y + 8, x + b, y + 8, '8') + K.t(ap + 9, y - h / 2 + 5, N(v.h), 'tf', 'start');
  };
  const rombo = (v, K) => {
    const [x, y] = [170, 105], a = 120, b = v.D * 10, L = [x - a, y], R = [x + a, y], T = [x, y - b], B = [x, y + b];
    return K.f(v.caja, K.r(x - a, y - b, 2 * a, 2 * b, 'fn d', 0)) + K.p([L, T, R, B], 'fa') + K.f(v.dob, [[L, T, -1, -1], [T, R, 1, -1], [R, B, 1, 1], [B, L, -1, 1]].map(([P, Q, i, j]) => K.p([P, Q, [x + i * a, y + j * b]], 'fg')).join('')) + K.l(...L, ...R, 'lg') + K.l(...T, ...B, 'lf') + K.t(x + 60, y - 6, '12', 'tg') + K.t(x + 10, y + 50, N(v.D), 'tf', 'start');
  };
  const contorno = (v, K) => {
    const r = v.w * 10, x = 170 - r, y = 180, h = 80, yo = y - h;
    return K.r(x, yo, 2 * r, h, 'fa', 0) + K.sec(170, yo, r, 0, 180, 'fg') + K.f(v.r, K.pl([[x, yo], [x, y], [x + 2 * r, y], [x + 2 * r, yo]], 'la gr')) + K.f(v.t, K.l(x, yo, x + 2 * r, yo, 'lf d')) + K.f(v.c, K.arc(170, yo, r, 0, 180, 'lg gr')) + K.t(170, y + 18, N(v.w), 'ta') + K.t(x - 8, y - h / 2 + 5, '5', 'ta', 'end');
  };
  const trap = (v, K) => {
    const u = 15, y = 170, x = 22, B = v.B * u, b = v.b * u, h = v.h * u, o = 20, g = v.g ?? 0;
    const P = [[x, y], [x + B, y], [x + o + b, y - h], [x + o, y - h]], d = (1 - g) * 70;
    // Copia girada media vuelta alrededor del medio del lado derecho.
    const M = [(P[1][0] + P[2][0]) / 2, (P[1][1] + P[2][1]) / 2], R = P.map(p => [2 * M[0] - p[0] + d, 2 * M[1] - p[1]]);
    return K.f(v.dos ?? 0, K.p(R, 'fg')) + K.p(P, 'fa') + K.t(x + B / 2, y + 18, N(v.B), 'ta') + K.t(x + o + b / 2, y - h - 7, N(v.b), 'ta') + K.l(x + o, y, x + o, y - h, 'lf d') + K.t(x + o + 8, y - h / 2 + 5, N(v.h), 'tf', 'start')
      + K.f((v.dos ?? 0) * g, K.t(x + B + b / 2 + d, y + 18, N(v.b), 'tg'));
  };
  // Rueda que rueda: el perímetro se marca en el suelo.
  const rueda = (v, K) => {
    const r = 34, y = 130, x0 = 50, L = 2 * Math.PI * r * v.t, cx = x0 + L;
    return K.l(20, y, 330, y, 'lm') + K.l(x0, y, cx, y, 'la gr') + K.c(cx, y - r, r, 'fc') + K.arc(cx, y - r, r, -90, -90 + 360 * (1 - v.t) + 0.01, 'la gr') + K.l(cx, y - r, ...K.at(cx, y - r, r, -90 - 360 * v.t), 'lf')
      + K.f(v.d ?? 0, [0, 1, 2].map(i => K.l(x0 + i * 2 * r + 1, y + 18, x0 + (i + 1) * 2 * r - 1, y + 18, 'lg gr') + K.t(x0 + (i + 0.5) * 2 * r, y + 36, 'd', 'tg')).join(''));
  };
  // Círculo partido en gajos que se acomodan casi como un rectángulo.
  const gajos = (v, K) => {
    const n = 16, r = 58, t = v.t; let h = '';
    for (let i = 0; i < n; i++) {
      const a = 90 + i * 360 / n, up = i % 2 === 0, w = Math.PI * r / (n / 2), X = 78 + (Math.floor(i / 2)) * w + (up ? 0 : w / 2), Y = up ? 130 : 130 - r;
      const cx = K.lerp(170, X, t), cy = K.lerp(100, Y, t), rot = K.lerp(a + 180 / n, up ? 90 : 270, t);
      h += K.sec(cx, cy, r, rot - 180 / n, rot + 180 / n, up ? 'fa' : 'fg');
    }
    return h + K.f(t > 0.98 ? 1 : 0, K.cota(72, 144, 72 + Math.PI * r, 144, 'π r') + K.t(58, 106, 'r', 'tf', 'end'));
  };
  const sec = (v, K) => K.c(170, 105, 82, 'fc') + K.sec(170, 105, 82, 0, v.g, 'fa') + K.arc(170, 105, 82, 0, v.g, 'lf gr') + K.t(270, 190, `r = ${v.r}`, 'tm', 'start') + K.t(...K.at(170, 110, 40, Math.max(14, v.g / 2)), `${Math.round(v.g)}°`, 'ta');

  xpLec('pu-ge-4', [
    ['Base por altura',
      xpMira('dibujo', 'Empecemos por la idea: casi todas las áreas salen del **rectángulo**.', { dib: para, v: { b: 7, h: 5, s: 0, c: 0, tri: 0 }, alto: 225 }, [
        ['Un rectángulo de 7 por 5 tiene 5 filas de 7 cuadros: 35.', {}, '$7 \\cdot 5 = 35$'],
        ['Lo inclinamos: es un paralelogramo. La base y la altura no cambiaron.', { s: 2 }],
        ['Cortamos el triángulo de un lado y lo pasamos al otro: vuelve a ser un rectángulo.', { c: 1 }, '$b \\cdot h = 35$'],
        ['Por eso su área también es base por altura. La altura es la recta, no el lado inclinado.', { c: 0 }],
        ['Y un triángulo es la mitad: base por altura, partido en dos.', { tri: 1 }, '$\\tfrac{7 \\cdot 5}{2} = 17.5$'],
      ], 'Rectángulo y paralelogramo: $b \\cdot h$. Triángulo: la mitad. La altura siempre es perpendicular a la base.'),
      xpHaz('dibujo', 'La base del triángulo mide 8. Sube el vértice hasta que el área sea 20.', { dib: triang, v: { h: 2 }, metas: { h: 5 }, alto: 220,
        manijas: [{ k: 'h', min: 1, max: 6.5, paso: 0.5, en: v => [190, 185 - v.h * 26], de: (x, y) => (185 - y) / 26 }],
        lee: v => `$\\tfrac{8 \\cdot ${N(v.h)}}{2} = ${N(4 * v.h)}$`, dice: v => `El rectángulo punteado vale ${N(8 * v.h)} y el triángulo es la mitad.` }, '$\\tfrac{8 \\cdot 5}{2} = 20$: el rectángulo entero vale 40.')],
    ['El rombo: media caja',
      xpMira('dibujo', 'Otra mitad: un **rombo** es la mitad de la caja de sus diagonales.', { dib: rombo, v: { D: 9, caja: 0, dob: 0 }, alto: 215 }, [
        ['Un rombo tiene cuatro lados iguales. Sus diagonales, aquí 12 y 9, se cruzan en ángulo recto.', {}],
        ['Lo metemos en una caja: sus lados miden lo mismo que las diagonales, 12 y 9.', { caja: 1 }, '$12 \\cdot 9 = 108$'],
        ['Las diagonales parten el rombo en cuatro triángulos, y en las esquinas sobran otros cuatro iguales.', { dob: 1 }],
        ['Por eso el rombo es la mitad de la caja: 54.', {}, '$\\tfrac{12 \\cdot 9}{2} = 54$'],
      ], 'Rombo: la mitad del producto de las diagonales, $\\tfrac{D \\cdot d}{2}$.'),
      xpHaz('dibujo', 'Una diagonal mide 12. Estira la otra hasta que el área del rombo sea 42.', { dib: rombo, v: { D: 4, caja: 1, dob: 0 }, metas: { D: 7 }, alto: 215, manijas: [{ k: 'D', min: 2, max: 10, paso: 1, en: v => [170, 105 - v.D * 10], de: (x, y) => (105 - y) / 10 }],
        lee: v => `$\\tfrac{12 \\cdot ${v.D}}{2} = ${6 * v.D}$`, dice: v => `La caja vale ${12 * v.D} y el rombo es la mitad.` }, 'La caja debe valer 84: $\\tfrac{12 \\cdot 7}{2} = 42$.')],
    ['El trapecio: dos juntos',
      xpMira('dibujo', 'Segunda idea: un **trapecio** se entiende pegándole una copia.', { dib: trap, v: { B: 9, b: 5, h: 6, dos: 0, g: 0 }, alto: 200 }, [
        ['Un trapecio tiene dos bases paralelas: aquí 9 y 5. La altura es 6.', {}],
        ['Le ponemos al lado una copia girada media vuelta.', { dos: 1 }],
        ['Encajan: forman un paralelogramo de base 9 más 5, que es 14.', { g: 1 }, '$9 + 5 = 14$'],
        ['Ese paralelogramo vale 14 por 6, o sea 84. El trapecio es la mitad: 42.', {}, '$\\tfrac{(9 + 5) \\cdot 6}{2} = 42$'],
        ['Es lo mismo que usar el promedio de las bases, 7, por la altura.', {}, '$7 \\cdot 6 = 42$'],
      ], 'Área del trapecio: promedio de las bases por la altura, $\\tfrac{(B + b)\\,h}{2}$.'),
      xpHaz('dibujo', 'Las bases miden 10 y 4. Ajusta la altura hasta que el área sea 35.', { dib: trap, v: { B: 10, b: 4, h: 2 }, metas: { h: 5 }, alto: 190,
        manijas: [{ k: 'h', min: 1, max: 9, paso: 1, en: v => [102, 170 - v.h * 15], de: (x, y) => (170 - y) / 15, r: 10 }],
        lee: v => `$\\tfrac{(10 + 4) \\cdot ${v.h}}{2} = ${7 * v.h}$`, dice: v => `El promedio de las bases es 7, y la altura va en ${v.h}.` }, 'Promedio 7 por altura 5: $7 \\cdot 5 = 35$.')],
    ['El círculo',
      xpMira('dibujo', 'Tercera idea: de dónde salen $2\\pi r$ y $\\pi r^2$.', { dib: (v, K) => (v.m < 0.5 ? rueda(v, K) : gajos({ t: v.w }, K)), v: { m: 0, t: 0, d: 0, w: 0 }, alto: 190 }, [
        ['Una rueda da una vuelta completa y deja marcado su borde en el piso.', { t: 1 }],
        ['Ese largo son tres diámetros y un poquito más: π diámetros, unos 3.14.', { d: 1 }, '$L = \\pi d = 2\\pi r$'],
        ['Para el área, cortamos el círculo en gajos, como una naranja.', { m: 1 }],
        ['Los acomodamos punta arriba, punta abajo: casi un rectángulo.', { w: 1 }],
        ['Su largo es medio borde, π r, y su alto es r. El área es π r por r.', {}, '$A = \\pi r \\cdot r = \\pi r^2$'],
      ], 'El borde mide $2\\pi r$ y el círculo ocupa $\\pi r^2$. Cuidado con usar el diámetro donde va el radio.'),
      xpHaz('dibujo', 'Arrastra el borde hasta que la circunferencia mida 14π.', { dib: (v, K) => K.c(170, 105, v.r * 12, 'fa') + K.l(170, 105, 170 + v.r * 12, 105, 'lf') + K.c(170, 105, 3, 'fk') + K.t(40, 30, `r = ${v.r}`, 'tf'), v: { r: 2 }, metas: { r: 7 }, alto: 215,
        manijas: [{ k: 'r', min: 1, max: 8, paso: 1, en: v => [170 + v.r * 12, 105], de: (x, y) => Math.hypot(x - 170, y - 105) / 12, r: 10 }],
        lee: v => `$2\\pi \\cdot ${v.r} = ${2 * v.r}\\pi$`, dice: v => `Con radio ${v.r}, el diámetro es ${2 * v.r}.` }, '$2\\pi r = 14\\pi$, así que el radio es 7.')],
    ['El sector: una tajada',
      xpMira('dibujo', 'Cuarta idea: un **sector** es una fracción del círculo, como una tajada.', { dib: sec, v: { g: 360, r: 8 }, alto: 205 }, [
        ['El círculo entero de radio 8 vale 64π y su borde mide 16π.', {}, '$\\pi \\cdot 8^2 = 64\\pi \\quad 2\\pi \\cdot 8 = 16\\pi$'],
        ['Media vuelta, 180°, es la mitad: 32π de área y 8π de borde.', { g: 180 }, '$\\tfrac12 \\cdot 64\\pi = 32\\pi$'],
        ['Un cuarto de vuelta es la cuarta parte: 16π de área y 4π de borde.', { g: 90 }, '$\\tfrac14 \\cdot 64\\pi = 16\\pi$'],
        ['En general, la fracción es el ángulo sobre 360: 45° es la octava parte, 8π.', { g: 45 }, '$\\tfrac{45}{360} \\cdot 64\\pi = 8\\pi$'],
      ], 'Sector y arco: la fracción $\\tfrac{\\theta}{360^\\circ}$ del área y del borde del círculo.'),
      xpHaz('dibujo', 'El radio mide 4. Abre el sector hasta que su área sea 6π.', { dib: sec, v: { g: 30, r: 4 }, metas: { g: 135 }, alto: 205,
        manijas: [{ k: 'g', min: 15, max: 345, paso: 15, en: v => XPK.at(170, 105, 82, v.g), de: (x, y, v) => { const g = (Math.atan2(105 - y, x - 170) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 345 : 15) : g; }, r: 10 }],
        lee: v => `$\\tfrac{${v.g}}{360} \\cdot 16\\pi = ${N(v.g / 360 * 16)}\\pi$`, dice: v => `${v.g}° de 360°: ${N(v.g / 3.6)} de cada 100 partes del círculo.` }, '6 de 16 son tres octavos: $\\tfrac38 \\cdot 360^\\circ = 135^\\circ$.')],
    ['Por el borde',
      xpMira('dibujo', 'Quinta idea: el **perímetro** es lo que se recorre por fuera.', { dib: contorno, v: { w: 8, r: 0, c: 0, t: 0 }, alto: 205 }, [
        ['Un rectángulo de 8 por 5 con medio círculo encima. ¿Cuánto mide su borde?', {}],
        ['Los tramos rectos de afuera son tres: 5, 8 y 5. Suman 18.', { r: 1 }, '$5 + 8 + 5 = 18$'],
        ['El lado de arriba quedó adentro: lo tapa el medio círculo, y por ahí no se camina.', { t: 1 }],
        ['La curva es media circunferencia de diámetro 8: la mitad de 8π.', { c: 1 }, '$\\tfrac12 \\cdot 8\\pi = 4\\pi$'],
        ['El borde mide 18 más 4π.', {}, '$18 + 4\\pi$'],
      ], 'Para el borde de una figura armada, recórrela por fuera: los lados que comparten las piezas no cuentan.'),
      xpHaz('dibujo', 'Ensancha la figura hasta que los tramos **rectos** del borde sumen 20. Los costados miden 5.', { dib: contorno, v: { w: 4, r: 1, c: 0, t: 0 }, metas: { w: 10 }, alto: 205, manijas: [{ k: 'w', min: 3, max: 12, paso: 1, en: v => [170 + v.w * 10, 140], de: x => (x - 170) / 10 }],
        lee: v => `$5 + ${v.w} + 5 = ${v.w + 10}$`, dice: () => 'Cuenta los dos costados y el piso; el lado de arriba quedó adentro.' }, 'Dos costados de 5 y un piso de 10: $5 + 10 + 5 = 20$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una ventana es un rectángulo de 4 por 3 con medio círculo encima. Pon el área de cada parte y la total.', {
        fondo: (K, v) => K.r(60, 78, 104, 78, 'fa') + K.sec(112, 78, 52, 0, 180, 'fg') + K.t(112, 174, '4', 'tm') + K.t(52, 122, '3', 'tm', 'end') + K.t(205, 62, 'medio círculo', 's tg', 'start') + K.t(205, 112, 'rectángulo', 's ta', 'start') + K.t(205, 162, 'en total', 's', 'start'),
        slots: [{ x: 245, y: 36, w: 92, h: 36 }, { x: 245, y: 86, w: 92, h: 36 }, { x: 245, y: 136, w: 92, h: 36 }], fichas: ['12', '2π', '4π', '12 + 2π', '7'], meta: ['2π', '12', '12 + 2π'], alto: 185,
        pista: 'El radio es la mitad del ancho, 2, y solo hay medio círculo.' }, 'Radio 2: medio círculo vale $\\tfrac12 \\pi 2^2 = 2\\pi$. Con el rectángulo, $12 + 2\\pi$.')],
  ], 'Base por altura, medios y promedios, $2\\pi r$ y $\\pi r^2$, y los sectores como tajadas del círculo.');
}
;
//#archivo js/explora-pu-ge-5.js
// Preuniversitario · pu-ge-5 «Áreas sombreadas y cuadrícula» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const U = 24;
  const hueco = (v, K) => {
    const x = 170 - v.W * U / 2, y = 20, w = v.w * U, h = v.h * U;
    return K.r(x, y, v.W * U, v.H * U, 'fa') + K.f(v.f ?? 1, K.r(x + (v.W * U - w) / 2, y + (v.H * U - h) / 2, w, h, 'fc') + K.t(170, y + v.H * U / 2 + 5, `${N(v.w)} × ${N(v.h)}`, 'tm')) + K.t(170, y + v.H * U + 18, v.W, 'ta') + K.t(x - 9, y + v.H * U / 2 + 5, v.H, 'ta', 'end');
  };
  // Cuadrícula de puntos (x, y) con origen abajo a la izquierda.
  const G = 26, GX = 40, GY = 190, P = (x, y) => [GX + x * G, GY - y * G];
  const malla = (K, w, h) => { let s = ''; for (let i = 0; i <= w; i++) s += K.l(...P(i, 0), ...P(i, h), 'ls'); for (let j = 0; j <= h; j++) s += K.l(...P(0, j), ...P(w, j), 'ls'); return s; };
  const inscrito = (v, K) => {
    const A = [1, 1], B = [7, 2], C = [3, 6];
    const T = [[[1, 1], [7, 1], [7, 2]], [[7, 2], [7, 6], [3, 6]], [[3, 6], [1, 6], [1, 1]]];
    return malla(K, 10, 7) + K.f(v.caja, K.p([P(1, 1), P(7, 1), P(7, 6), P(1, 6)], 'fn d')) + T.map((t, i) => K.f(v['t' + i], K.p(t.map(q => P(...q)), 'ff'))).join('') + K.p([A, B, C].map(q => P(...q)), 'fa')
      + K.f(v.t0, K.t(...P(5.4, 1.08), '3', 's tf')) + K.f(v.t1, K.t(...P(5.8, 4.4), '8', 'tf')) + K.f(v.t2, K.t(...P(1.6, 4.2), '5', 'tf'));
  };
  const tri = (v, K) => malla(K, 10, 7) + K.p([P(1, 1), P(9, 1), P(v.x, v.y)], 'fa') + K.l(...P(v.x, v.y), ...P(v.x, 1), 'lf d');
  // Cuadrado con un semicírculo que se pasa de un lado al otro.
  const muerde = (v, K) => {
    const x = 70, y = 40, S = 120, r = S / 2, d = v.t * S;
    return K.r(x, y, S, S, 'fa') + `<path class="xf fc" d="M${x} ${y} A${r} ${r} 0 0 1 ${x} ${y + S} Z"/>` + K.f(v.pieza ?? 1, `<path class="xf fg" d="M${K.n(x + d)} ${K.n(y + (v.dy ?? 0))} a${r} ${r} 0 0 1 0 ${S} Z"/>`) + K.t(x + r, y + S + 20, '10', 'ta');
  };

  xpLec('pu-ge-5', [
    ['La grande menos lo que falta',
      xpMira('dibujo', 'Empecemos por la idea: un área con hueco es **la grande menos lo que se quita**.', { dib: hueco, v: { W: 8, H: 6, w: 3, h: 2, f: 0 }, alto: 190 }, [
        ['Una lámina de 8 por 6 tiene 48 cuadros de área.', {}, '$8 \\cdot 6 = 48$'],
        ['Le abrimos una ventana de 3 por 2: se van 6 cuadros.', { f: 1 }, '$3 \\cdot 2 = 6$'],
        ['Lo que queda sombreado es la diferencia: 48 menos 6 son 42.', {}, '$48 - 6 = 42$'],
        ['Con una ventana más grande, de 6 por 4, queda la mitad: 24.', { w: 6, h: 4 }, '$48 - 24 = 24$'],
        ['No importa dónde esté la ventana: solo cuánto ocupa.', {}],
      ], 'Área sombreada = figura grande − lo que se le quita. No hay que inventar una fórmula nueva.'),
      xpHaz('dibujo', 'Un marco de 10 por 7 lleva una foto de 5 de alto. Ajusta el ancho de la foto hasta que el marco, lo sombreado, mida 30.', { dib: hueco, v: { W: 10, H: 7, w: 3, h: 5 }, metas: { w: 8 }, alto: 212,
        manijas: [{ k: 'w', min: 2, max: 9, paso: 1, en: v => [170 + v.w * U / 2, 20 + 84], de: x => (x - 170) * 2 / U, r: 10 }],
        lee: v => `$70 - ${5 * v.w} = ${70 - 5 * v.w}$`, dice: v => `La foto ocupa ${v.w} · 5 = ${5 * v.w}.` }, '$70 - 40 = 30$: la foto mide 8 por 5.')],
    ['Triángulos en la cuadrícula',
      xpMira('dibujo', 'Segunda idea: en una cuadrícula, **encierra** la figura en una caja.', { dib: inscrito, v: { caja: 0, t0: 0, t1: 0, t2: 0 }, alto: 200 }, [
        ['Este triángulo está torcido: no tiene base horizontal. ¿Cómo medirlo?', {}],
        ['Lo encerramos en un rectángulo de 6 por 5: 30 cuadros.', { caja: 1 }, '$6 \\cdot 5 = 30$'],
        ['Sobran tres esquinas, y son triángulos fáciles. La de abajo: 6 por 1, la mitad, 3.', { t0: 1 }, '$\\tfrac{6 \\cdot 1}{2} = 3$'],
        ['La de la derecha, 4 por 4 entre 2, vale 8. La de la izquierda, 2 por 5 entre 2, vale 5.', { t1: 1, t2: 1 }, '$8 \\quad 5$'],
        ['A la caja le quitamos las tres: 30 menos 16 son 14.', {}, '$30 - 3 - 8 - 5 = 14$'],
      ], 'Figura torcida: enciérrala en un rectángulo y réstale los triángulos de las esquinas.'),
      xpHaz('dibujo', 'La base mide 8. Mueve el vértice hasta que el triángulo tenga área 20.', { dib: tri, v: { x: 5, y: 3 }, cumple: v => 4 * (v.y - 1) === 20, sol: { x: 5, y: 6 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [0, 2], max: [10, 7], paso: 1, en: v => P(v.x, v.y), de: (x, y) => [(x - GX) / G, (GY - y) / G], r: 10 }],
        lee: v => `$\\tfrac{8 \\cdot ${v.y - 1}}{2} = ${4 * (v.y - 1)}$`, dice: v => `La altura es ${v.y - 1}. Moverlo hacia los lados no cambia el área.` }, 'Altura 5: $\\tfrac{8 \\cdot 5}{2} = 20$, esté donde esté el vértice a esa altura.')],
    ['Mover piezas',
      xpMira('dibujo', 'Tercera idea: a veces basta **mover una pieza** para ver una figura fácil.', { dib: muerde, v: { t: 1, pieza: 1 }, alto: 190 }, [
        ['Una figura rara: a la izquierda le falta medio círculo y a la derecha le sobra otro igual.', {}],
        ['Con fórmulas habría que sumar y restar medios círculos. Mejor miremos.', {}],
        ['La pieza que sobra llena justo el hueco que falta.', { t: 0 }],
        ['Queda un cuadrado de lado 10. El área es 100, sin usar π.', {}, '$10 \\cdot 10 = 100$'],
      ], 'Antes de calcular, busca si una pieza que sobra llena un hueco igual: el área no cambia al moverla.'),
      xpHaz('dibujo', 'Lleva el medio círculo dorado al hueco y mira qué figura queda.', { dib: muerde, v: { t: 1, dy: 0, pieza: 1 }, metas: { t: 0, dy: 0 }, alto: 190,
        manijas: [{ k: ['t', 'dy'], min: [0, -30], max: [1.2, 30], paso: [0.1, 10], inv: [0, 1], en: v => [70 + v.t * 120 + 24, 100 + v.dy], de: (x, y) => [(x - 94) / 120, y - 100], r: 10 }],
        lee: v => (v.t === 0 && v.dy === 0 ? '$10 \\cdot 10 = 100$' : ''), dice: v => (v.t === 0 && v.dy === 0 ? 'Encajó: es un cuadrado.' : 'Llévalo hasta que tape el hueco de la izquierda.') }, 'Lo que sobraba llenó lo que faltaba: un cuadrado de área 100.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una piscina de 8 m por 5 m tiene un andén de 1 m de ancho por todo el borde. ¿Qué área tiene el andén?', {
        fondo: K => K.r(20, 30, 150, 105, 'fg') + K.r(35, 45, 120, 75, 'fa') + K.t(95, 87, '8 × 5', 'ta') + K.t(95, 152, 'andén: 1 m a cada lado', 's tg') + K.t(192, 40, 'grande', 's tm', 'start') + K.t(192, 90, 'piscina', 's tm', 'start') + K.t(192, 140, 'andén', 's tg', 'start'),
        slots: [{ x: 285, y: 36, w: 76, h: 36 }, { x: 285, y: 86, w: 76, h: 36 }, { x: 285, y: 136, w: 76, h: 36 }], fichas: ['40', '54', '70', '30', '14'], meta: ['70', '40', '30'], alto: 170,
        pista: 'El andén agrega 1 m a cada lado: el rectángulo grande mide 10 por 7.' }, 'El grande mide 10 por 7: $70 - 40 = 30$ m² de andén.')],
  ], 'Restar lo que falta, encerrar en una caja y mover piezas: así cualquier área se vuelve fácil.');
}
;
//#archivo js/explora-pu-ge-6.js
// Preuniversitario · pu-ge-6 «Volúmenes y superficies» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const capas = (v, K) => K.caja([170 - (v.a - v.b) * 10, 200], v.u ?? 24, v.a, v.b, Math.max(0, Math.round(v.c)), 'fa');
  // Cilindro con agua hasta la fracción n y un cono al lado.
  const eli = (K, x, y, rx, cls) => `<ellipse class="xf ${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.28}"/>`;
  const cil = (K, x, y, r, h, f, cls = 'fa') => {
    const ya = y - h * f;
    return (f > 0.01 ? `<path class="xf ${cls}" d="M${x - r} ${K.n(ya)} V${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} V${K.n(ya)}"/>` + eli(K, x, K.n(ya), r, cls) : '')
      + `<path class="xl" d="M${x - r} ${y - h} V${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} V${y - h}"/>` + eli(K, x, y - h, r, 'fn');
  };
  const cono = (K, x, y, r, h, cls) => `<path class="xf ${cls}" d="M${x - r} ${y} A${r} ${r * 0.28} 0 0 0 ${x + r} ${y} L${x} ${K.n(y - h)} Z"/>` + `<path class="xl lm d" d="M${x - r} ${y} A${r} ${r * 0.28} 0 0 1 ${x + r} ${y}"/>`;
  const tercio = (v, K) => cil(K, 230, 180, 60, 130, v.n / 3) + [0, 1, 2].map(i => K.l(296, 180 - 130 * (i + 1) / 3, 304, 180 - 130 * (i + 1) / 3, 'lm')).join('') + cono(K, 85, 180, 60, 130, 'fg') + K.t(85, 205, 'cono', 'tg') + K.t(230, 205, 'cilindro', 'ta');
  // Caja a × b × h y su desarrollo: las seis caras.
  const des = (v, K) => {
    const u = v.u ?? 17, a = v.a * u, b = v.b * u, h = v.h * u, x = 170 - a / 2, y0 = 14, s = v.s ?? 1;
    // Cruz: arriba tapa, luego frente, base y atrás; costados a los lados del frente.
    const q = (X, Y, W, H, t, cls, f = 1) => K.f(f, K.r(X, Y, W, H, cls, 1) + (t ? K.t(X + W / 2, Y + H / 2 + 5, t, 's') : ''));
    return q(x, y0, a, b, N(v.a * v.b), 'fa') + q(x, y0 + b, a, h, N(v.a * v.h), 'fg') + q(x, y0 + b + h, a, b, N(v.a * v.b), 'fa', s) + q(x, y0 + 2 * b + h, a, h, N(v.a * v.h), 'fg', s)
      + q(x - b, y0 + b, b, h, N(v.b * v.h), 'ff', s) + q(x + a, y0 + b, b, h, N(v.b * v.h), 'ff', s);
  };
  const pileta = (v, K) => {
    const o = [160, 178], u = 26, I = (x, y, z) => K.iso(o, u, x, y, z), z = 2.5, w = v.h / 2 * z;
    return K.caja(o, u, 5, 4, w, 'fa', false) + K.pl([I(0, 0, w), I(0, 0, z), I(5, 0, z), I(5, 4, z), I(0, 4, z), I(0, 0, z)], 'lm') + K.l(...I(5, 0, 0), ...I(5, 0, z), 'lm') + K.l(...I(0, 4, 0), ...I(0, 4, z), 'lm') + K.t(I(2.5, 0, 0)[0] + 14, I(2.5, 0, 0)[1] + 22, '5 m', 'tm') + K.t(I(0, 2, 0)[0] - 14, I(0, 2, 0)[1] + 22, '4 m', 'tm');
  };

  xpLec('pu-ge-6', [
    ['Capas que se apilan',
      xpMira('dibujo', 'Empecemos por la idea: el volumen de una caja se cuenta **por capas**.', { dib: capas, v: { a: 4, b: 3, c: 0 }, alto: 220 }, [
        ['La base de 4 por 3 es un piso de 12 baldosas.', {}, '$4 \\cdot 3 = 12$'],
        ['Ponemos una capa de cubitos: 12 cubitos.', { c: 1 }, '$12 \\cdot 1 = 12$'],
        ['Con tres capas iguales son 12 por 3: 36 cubitos.', { c: 3 }, '$12 \\cdot 3 = 36$'],
        ['Con cinco capas, 60. Cada capa agrega lo mismo.', { c: 5 }, '$12 \\cdot 5 = 60$'],
        ['Vale para cualquier columna recta: prismas y cilindros. Área de la base por altura.', {}, '$V = A_{\\text{base}} \\cdot h$'],
      ], 'Prismas y cilindros: volumen = área de la base × altura, porque son capas iguales.'),
      xpHaz('dibujo', 'La base es de 5 por 3. Apila capas hasta tener 90 cubitos.', { dib: capas, v: { a: 5, b: 3, c: 1, u: 21 }, metas: { c: 6 }, alto: 270, manijas: [{ k: 'c', min: 0, max: 7, paso: 1, et: 'capas' }],
        lee: v => `$5 \\cdot 3 \\cdot ${v.c} = ${15 * v.c}$`, dice: v => `${v.c} ${v.c === 1 ? 'capa' : 'capas'} de 15 cubitos.` }, '$15 \\cdot 6 = 90$: seis capas.')],
    ['Conos y pirámides: un tercio',
      xpMira('dibujo', 'Segunda idea: un cono llena **un tercio** del cilindro que lo envuelve.', { dib: tercio, v: { n: 0 }, alto: 215 }, [
        ['Un cono y un cilindro con la misma base y la misma altura.', {}],
        ['Echamos en el cilindro el agua que cabe en el cono: sube hasta la tercera parte.', { n: 1 }, '$\\tfrac13$'],
        ['Otro cono lleno: dos terceras partes.', { n: 2 }, '$\\tfrac23$'],
        ['Con el tercero se llena justo. Un cono es la tercera parte del cilindro.', { n: 3 }, '$V_{\\text{cono}} = \\tfrac13 \\pi r^2 h$'],
        ['Igual pasa con una pirámide y el prisma de su misma base y altura.', {}, '$V = \\tfrac13 A_{\\text{base}} \\cdot h$'],
        ['Y una esfera que cabe justa en un cilindro llena dos tercios de él. De ahí sale su fórmula.', { n: 2 }, '$V = \\tfrac43 \\pi r^3$'],
      ], 'Cono y pirámide: un tercio de base por altura, porque tres llenan el cilindro o el prisma.'),
      xpHaz('dibujo', 'Un cono tiene radio 2. Sube la punta hasta que su volumen sea 8π.', { dib: (v, K) => cono(K, 170, 185, 46, v.h * 18, 'fg') + K.l(170, 185, 170, 185 - v.h * 18, 'lf d') + K.l(170, 185, 216, 185, 'la') + K.t(240, 190, 'r = 2', 'ta', 'start') + K.t(112, 185 - v.h * 9, `h = ${v.h}`, 'tf', 'end'), v: { h: 2 }, metas: { h: 6 }, alto: 215,
        manijas: [{ k: 'h', min: 1, max: 9, paso: 1, en: v => [170, 185 - v.h * 18], de: (x, y) => (185 - y) / 18, r: 10 }],
        lee: v => `$\\tfrac13 \\cdot 4\\pi \\cdot ${v.h} = ${v.h % 3 ? `\\tfrac{${4 * v.h}}{3}` : 4 * v.h / 3}\\pi$`, dice: v => `La base vale 4π. El cilindro de esa altura valdría ${4 * v.h}π.` }, '$\\tfrac13 \\cdot 4\\pi \\cdot 6 = 8\\pi$.')],
    ['La piel: desarrollar la caja',
      xpMira('dibujo', 'Tercera idea: la **superficie** es la piel. Se abre la caja y se suman las caras.', { dib: des, v: { a: 5, b: 2, h: 4, s: 0 }, alto: 220 }, [
        ['Una caja de 5 por 2 de base y 4 de alto. Primero vemos la tapa y el frente.', {}, '$5 \\cdot 2 = 10 \\quad 5 \\cdot 4 = 20$'],
        ['Al abrirla aparecen todas: seis rectángulos, que van en parejas iguales.', { s: 1 }],
        ['Tapa y base: 10 cada una. Frente y atrás: 20 cada una. Costados: 8 cada uno.', {}, '$10 + 20 + 8 = 38$'],
        ['Como hay dos de cada una, la piel mide el doble: 76.', {}, '$2 \\cdot 38 = 76$'],
        ['Un cubo de arista 2 tiene seis caras iguales de 4: son 24.', { a: 2, b: 2, h: 2 }, '$6 \\cdot 4 = 24$'],
      ], 'Superficie = suma de las caras. En una caja van por parejas; en un cubo son $6a^2$.'),
      xpHaz('dibujo', 'La base mide 4 por 2. Ajusta la altura hasta que las seis caras sumen 52.', { dib: des, v: { a: 4, b: 2, h: 1 }, metas: { h: 3 }, alto: 285, manijas: [{ k: 'h', min: 1, max: 5, paso: 1, et: 'altura' }],
        lee: v => `$2 \\cdot (8 + ${4 * v.h} + ${2 * v.h}) = ${16 + 12 * v.h}$`, dice: v => `Con altura ${v.h}: caras de 8, ${4 * v.h} y ${2 * v.h}, dos de cada una.` }, '$2 \\cdot (8 + 12 + 6) = 52$: la altura es 3.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una piscina tiene fondo de 5 m por 4 m. Se le echan 24 m³ de agua. Sube el nivel: ¿hasta qué altura llega?', { dib: pileta, v: { h: 0.2 }, metas: { h: 1.2 }, alto: 240, manijas: [{ k: 'h', min: 0.2, max: 2, paso: 0.1, et: 'altura del agua (m)', rot: v => N(v.h) }],
        lee: v => `$5 \\cdot 4 \\cdot ${N(v.h)} = ${N(20 * v.h)} \\text{ m}^3$`, dice: v => `Cada metro de altura son 20 m³. Van ${N(20 * v.h)}.` }, '$24 \\div 20 = 1.2$ m. Y como 1 m³ son 1 000 litros, hay 24 000 litros.')],
  ], 'Capas para prismas y cilindros, un tercio para conos y pirámides, y la piel como suma de las caras.');
}
;
//#archivo js/explora-pu-or-1.js
// Preuniversitario · pu-or-1 «Orden en línea» (Explora, escena «fichas»). Los ejemplos no son los de los ejercicios.
{
  const fila = (n, y = 100) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * (n > 4 ? 66 : 78), y, w: n > 4 ? 62 : 72, et: String(i + 1) }));
  const pistas = (...l) => K => l.map((t, i) => K.t(170, 20 + i * 18, t, 's')).join('');

  xpLec('pu-or-1', [
    ['Dibuja la fila',
      xpMira('fichas', 'Empecemos por la idea: las pistas de orden se **dibujan**, no se memorizan.', { slots: fila(4), fichas: ['Ana', 'Leo', 'Mar', 'Pol'], alto: 150,
        fondo: (K, v) => K.t(170, 22, v.p || '', 'ta') }, [
        ['Cuatro personas hacen fila. Dibujamos cuatro casillas: la 1 es la primera.', { v: { p: '' } }],
        ['Primero las pistas firmes, las que dicen un puesto exacto: «Mar es la tercera».', { v: { p: 'Mar es la tercera' }, pon: { 2: 'Mar' } }],
        ['«Leo está justo detrás de Mar»: justo detrás es la casilla siguiente.', { v: { p: 'Leo está justo detrás de Mar' }, pon: { 3: 'Leo' } }],
        ['Quedan Ana y Pol. «Ana está antes que Pol»: antes no quiere decir pegada, solo más adelante.', { v: { p: 'Ana está antes que Pol' }, pon: { 0: 'Ana' } }],
        ['Y Pol ocupa el único lugar libre. La fila quedó armada.', { pon: { 1: 'Pol' }, v: { p: 'Ana · Pol · Mar · Leo' } }],
      ], 'Dibuja casillas numeradas y pon primero las pistas que dicen un puesto exacto.'),
      xpHaz('fichas', 'Ordena cuatro libros en el estante con estas pistas.', { slots: fila(4, 112), fichas: ['rojo', 'azul', 'verde', 'negro'], meta: ['verde', 'rojo', 'azul', 'negro'], alto: 158,
        fondo: pistas('El verde va en el puesto 1.', 'El negro es el último de la derecha.', 'El rojo está antes que el azul.'), pista: 'Empieza por el verde y el negro: dicen un puesto exacto.' }, 'Con el verde y el negro fijos, solo el rojo puede ir antes que el azul.')],
    ['Bloques que viajan juntos',
      xpMira('fichas', 'Segunda idea: lo que va **pegado** viaja como un bloque.', { slots: fila(5), fichas: ['Eva', 'Flor', 'Gus', 'Hugo', 'Inés'], alto: 150, fondo: (K, v) => K.t(170, 22, v.p || '', 'ta') }, [
        ['Cinco puestos. «Flor está justo después de Eva»: son un bloque, Eva-Flor.', { v: { p: 'bloque Eva–Flor' } }],
        ['«Gus está en el centro.» El bloque no cabe partido: va antes o después de Gus.', { v: { p: 'Gus está en el centro' }, pon: { 2: 'Gus' } }],
        ['Probamos el bloque a la izquierda.', { pon: { 0: 'Eva', 1: 'Flor' }, marca: [0, 1] }],
        ['Pero falta otra pista: «Hugo es el primero». Choca. El bloque debe ir a la derecha.', { saca: [0, 1], v: { p: 'Hugo es el primero' }, pon: { 0: 'Hugo', 3: 'Eva', 4: 'Flor' } }],
        ['Inés toma el lugar que queda: la segunda.', { pon: { 1: 'Inés' } }],
      ], 'Junta en un bloque lo que va pegado y busca dónde cabe entero.'),
      xpHaz('fichas', 'Cinco camisetas cuelgan en fila. Cuélgalas con las pistas.', { slots: fila(5, 130), fichas: ['A', 'B', 'C', 'D', 'E'], meta: ['E', 'C', 'A', 'B', 'D'], alto: 176,
        fondo: pistas('C es la segunda.', 'B va justo después de A.', 'D es la última.', 'E está antes que A.'), pista: 'Con C en el 2 y D en el 5, ¿dónde cabe entero el bloque A-B?' }, 'Con C en el 2 y D en el 5, el bloque A-B solo cabe en 3-4, y E queda de primera.')],
    ['Probar y descartar',
      xpMira('fichas', 'Tercera idea: si quedan dos caminos, se **prueba** cada uno hasta que uno choque.', { slots: fila(4), fichas: ['Sol', 'Tito', 'Leo', 'Ana'], alto: 150, fondo: (K, v) => K.t(170, 22, v.p || '', v.mal ? 'tf' : 'ta') }, [
        ['Sol es la primera, Leo va justo delante de Ana, y Tito no es el último.', { pon: { 0: 'Sol' }, v: { p: 'Tito no es el último', mal: 0 } }],
        ['Tito puede ser el segundo o el tercero. Probemos el tercero.', { pon: { 2: 'Tito' }, marca: [2] }],
        ['Leo y Ana quedarían en 2 y 4, separados por Tito. Choca: ese camino se borra.', { pon: { 1: 'Leo', 3: 'Ana' }, v: { p: 'Leo y Ana deben ir pegados', mal: 1 } }],
        ['Entonces Tito es el segundo, y Leo con Ana quedan al final. Todo cumple.', { saca: [1, 2, 3], v: { p: 'Sol · Tito · Leo · Ana', mal: 0 } , pon: { 1: 'Tito', 2: 'Leo', 3: 'Ana' } }],
      ], 'Con dos posibilidades, supón una; si choca con una pista, la otra es la verdadera.'),
      xpHaz('fichas', 'Cuatro carros están parqueados del 1 al 4. Ubícalos.', { slots: fila(4, 112), fichas: ['rojo', 'gris', 'blanco', 'negro'], meta: ['blanco', 'negro', 'gris', 'rojo'], alto: 158,
        fondo: pistas('El blanco está justo a la izquierda del negro.', 'El gris no está en una punta.', 'El rojo no está en el 1.'), pista: 'Prueba el bloque blanco-negro en 1-2, en 2-3 y en 3-4.' }, 'En 2-3 el gris caería en una punta; en 3-4 el rojo caería en el 1. Solo queda 1-2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una línea de metro tiene cinco estaciones. Ponlas en orden con las pistas.', { slots: fila(5, 130), fichas: ['Sol', 'Río', 'Faro', 'Luna', 'Prado'], meta: ['Sol', 'Prado', 'Río', 'Faro', 'Luna'], alto: 176,
        fondo: pistas('Río queda en el centro.', 'Prado está justo antes de Río.', 'Luna es la última.', 'Sol está antes que Faro.'), pista: 'Pon primero Río y Luna, que dicen un puesto exacto.' }, 'Fijas Río y Luna, pegas Prado a Río, y los dos puestos que quedan los decide «Sol antes que Faro».')],
  ], 'Casillas numeradas, pistas firmes primero, bloques pegados y probar hasta que un camino choque.');
}
;
//#archivo js/explora-pu-or-2.js
// Preuniversitario · pu-or-2 «Orden circular» (Explora, escenas «fichas» y «dibujo»). Los ejemplos no son los de los ejercicios.
{
  // n sillas en el sentido del reloj, la 1 arriba.
  const mesa = (n, cy = 108, r = 78, w = 62) => Array.from({ length: n }, (_, i) => { const [x, y] = XPK.at(170, cy, r * 1.0, 90 - i * 360 / n); return { x: 170 + (x - 170) * 1.35, y, w, h: 38 }; });
  const tabla = (n, cy = 108) => (K, v) => K.c(170, cy, 42, 'fc') + K.arc(170, cy, 30, 60, -60, 'lm') + K.ar(...K.at(170, cy, 30, -50), ...K.at(170, cy, 30, -62), 'lm') + (v.p ? K.t(170, cy + 5, v.p, 's ta') : '');
  // Anillo numerado con un señalador.
  const anillo = (v, K) => {
    const n = v.n, cy = 110; let h = K.c(170, cy, 92, 'fn');
    const c = ((Math.round(v.k) - 1) % n + n) % n + 1;
    for (let i = 1; i <= n; i++) { const [x, y] = K.at(170, cy, 92, 90 - (i - 1) * 360 / n); h += K.c(x, y, 15, i === c ? 'fA' : i === v.de ? 'fg' : 'fc') + K.t(x, y + 5, i, i === c ? 'tc' : ''); }
    const a0 = 90 - (v.de - 1) * 360 / n, a1 = 90 - (v.k - 1) * 360 / n;
    if (Math.abs(v.k - v.de) > 0.05) { const t = Math.max(a1, a0 - 359); h += K.arc(170, cy, 60, a0, t, 'la gr') + K.ar(...K.at(170, cy, 60, t + 4), ...K.at(170, cy, 60, t), 'la gr'); }
    return h + K.t(170, cy + 6, `${Math.round(v.k - v.de)} ${Math.round(v.k - v.de) === 1 ? 'paso' : 'pasos'}`, 'ta');
  };
  const pie = (...l) => (K, y) => l.map((t, i) => K.t(170, y + i * 17, t, 's')).join('');

  xpLec('pu-or-2', [
    ['Fija a uno',
      xpMira('fichas', 'Empecemos por la idea: en una mesa redonda, **girar a todos** no cambia nada.', { slots: mesa(4), fichas: ['Ana', 'Beto', 'Caro', 'Dani'], alto: 220, fondo: tabla(4) }, [
        ['Cuatro amigos en una mesa redonda. Se leen en el sentido del reloj: Ana, Beto, Caro, Dani.', { pon: { 0: 'Ana', 1: 'Beto', 2: 'Caro', 3: 'Dani' } }],
        ['Si todos corren un puesto, cada uno conserva sus vecinos: es la misma mesa.', { saca: [0, 1, 2, 3], pon: { 1: 'Ana', 2: 'Beto', 3: 'Caro', 0: 'Dani' } }],
        ['Por eso se fija a uno, el que quieras, y los demás se ubican respecto a él.', { saca: [0, 1, 2, 3], pon: { 0: 'Ana' }, marca: [0] }],
        ['Beto sigue a Ana en el sentido del reloj: su puesto queda decidido.', { pon: { 1: 'Beto' } }],
        ['Caro frente a Ana: al otro lado de la mesa. Dani va en el puesto que queda.', { pon: { 2: 'Caro', 3: 'Dani' } }],
      ], 'En círculo, fija a una persona: girar la mesa no crea un acomodo nuevo.'),
      xpHaz('fichas', 'Lía ya está sentada. Sienta a los demás; «sigue» es en el sentido del reloj.', { slots: mesa(4), fijas: { 0: 'Lía' }, fichas: ['Marta', 'Nico', 'Pol'], meta: ['Lía', 'Marta', 'Nico', 'Pol'], alto: 250,
        fondo: (K, v) => tabla(4)(K, v) + pie('Nico está frente a Lía.', 'Marta sigue a Lía.')(K, 226), pista: 'Frente a Lía es el puesto de abajo.' }, 'Con Lía fija: Nico enfrente, Marta le sigue y Pol toma el otro lado.')],
    ['Frente a frente',
      xpMira('fichas', 'Segunda idea: «frente a» es **media mesa** de distancia.', { slots: mesa(6, 112, 84, 58), fichas: ['Eva', 'Flor', 'Gus', 'Hugo', 'Inés', 'Juan'], alto: 222, fondo: tabla(6, 112) }, [
        ['Seis sillas. Fijamos a Eva arriba.', { pon: { 0: 'Eva' } }],
        ['Frente a Eva está Hugo: se cuentan tres sillas, la mitad de seis. Da igual por qué lado.', { pon: { 3: 'Hugo' }, marca: [0, 3] }],
        ['«Gus está entre Flor y Hugo»: Gus es vecino de Hugo, y Flor sigue después.', {}],
        ['Puede ser por un lado o por el otro. Si además Flor sigue a Eva en el reloj, es por la derecha.', { pon: { 1: 'Flor', 2: 'Gus' } }],
        ['Quedan dos sillas. Con «Inés junto a Hugo», todos tienen lugar.', { pon: { 4: 'Inés', 5: 'Juan' } }],
      ], 'Con un número par de sillas, «frente a» es avanzar la mitad de ellas.'),
      xpHaz('fichas', 'Sienta a los cinco que faltan; «sigue» es en el sentido del reloj.', { slots: mesa(6, 108, 84, 58), fijas: { 0: 'Paz' }, fichas: ['Raúl', 'Inés', 'Toño', 'Vera', 'Beto'], meta: ['Paz', 'Inés', 'Beto', 'Raúl', 'Toño', 'Vera'], alto: 282,
        fondo: (K, v) => tabla(6, 108)(K, v) + pie('Raúl está frente a Paz. Inés sigue a Paz.', 'Beto está entre Inés y Raúl.', 'Toño es vecino de Raúl.')(K, 236), pista: 'Empieza por Raúl, frente a Paz: a tres sillas.' }, 'Raúl a media mesa, Inés después de Paz, Beto entre ellos, Toño al otro lado de Raúl y Vera donde queda.')],
    ['Dar la vuelta contando',
      xpMira('dibujo', 'Tercera idea: al contar en ronda, después del último **vuelve** el primero.', { dib: anillo, v: { n: 7, de: 5, k: 5 }, alto: 222 }, [
        ['Siete sillas numeradas en el sentido del reloj. Estamos en la 5.', {}],
        ['Avanzamos dos: llegamos a la 7, la última.', { k: 7 }, '$5 + 2 = 7$'],
        ['Un paso más y no hay silla 8: volvemos a la 1.', { k: 8 }, '$5 + 3 = 8 \\to 8 - 7 = 1$'],
        ['Avanzar 4 desde la 5 da 9, que se pasa por 2: es la silla 2.', { k: 9 }, '$5 + 4 = 9 \\to 9 - 7 = 2$'],
        ['Atajo: suma y, si te pasas, réstale el número de sillas.', {}, '$9 - 7 = 2$'],
      ], 'Contando en ronda: suma los pasos y, si te pasas, resta el número de sillas.'),
      xpHaz('dibujo', 'Hay 9 sillas. Desde la 7, arrastra el señalador 5 pasos en el sentido del reloj.', { dib: anillo, v: { n: 9, de: 7, k: 7 }, metas: { k: 12 }, alto: 225,
        manijas: [{ k: 'k', min: 7, max: 15, paso: 1, r: 13, rot: v => String((v.k - 1) % 9 + 1), en: v => XPK.at(170, 110, 92, 90 - (v.k - 1) * 40), de: (x, y, v) => { const a = 90 - Math.atan2(110 - y, x - 170) * 180 / Math.PI, k = (a / 40 + 1); return v.k + ((((k - v.k) % 9) + 13.5) % 9) - 4.5; } }],
        lee: v => `$7 + ${v.k - 7} = ${v.k}${v.k > 9 ? ` \\to ${v.k} - 9 = ${v.k - 9}` : ''}$`, dice: v => (v.k > 9 ? 'Pasaste la 9: se vuelve a contar desde la 1.' : 'Aún no das la vuelta.') }, '$7 + 5 = 12$ y $12 - 9 = 3$: la silla 3.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Cinco materas rodean una fuente. La rosa ya está. Ubica las demás; «sigue» es en el sentido del reloj.', { slots: mesa(5, 108, 84, 66), fijas: { 0: 'rosa' }, fichas: ['lirio', 'clavel', 'dalia', 'girasol'], meta: ['rosa', 'clavel', 'dalia', 'lirio', 'girasol'], alto: 280,
        fondo: (K, v) => tabla(5, 108)(K, v) + pie('El clavel sigue a la rosa.', 'La dalia es vecina del clavel.', 'El lirio no es vecino de la rosa.')(K, 232), pista: 'La rosa tiene dos vecinos: uno es el clavel. El lirio no puede ser el otro.' }, 'Clavel tras la rosa, dalia tras el clavel; el lirio no toca a la rosa, así que el girasol queda a su lado.')],
  ], 'Fijar a uno, «frente a» como media mesa, y dar la vuelta cuando se acaban las sillas.');
}
;
//#archivo js/explora-pu-or-3.js
// Preuniversitario · pu-or-3 «Tablas de doble entrada» (Explora, escena «rejilla»). Los ejemplos no son los de los ejercicios.
{
  const rot = ['', '✓', '✗'], T = (filas, cols, o = {}) => ({ f: filas.length, c: cols.length, filas, cols, estados: 3, rot, unoAUno: true, cw: 60, ch: 44, izq: 62, ...o });
  const dice = n => c => { const k = c.filter(x => x === 1).length; return k ? `${k} de ${n} ✓. Un ✓ por fila y uno por columna.` : 'Un toque pone ✓, otro pone ✗ y otro borra.'; };
  const raya = (n) => (K, g) => K.l(g.x(n), g.y(0) - 18, g.x(n), g.y(3), 'lg');

  xpLec('pu-or-3', [
    ['Tachar y marcar',
      xpMira('rejilla', 'Empecemos por la idea: para emparejar, una **tabla** donde cada pista deja una marca.', T(['Luz', 'Paco', 'Rita'], ['bus', 'bici', 'metro']), [
        ['Luz, Paco y Rita usan transportes distintos. Personas en las filas, transportes en las columnas.', {}],
        ['«Luz no va en bus ni en metro»: dos tachones en su fila.', { x: [0, 2] }],
        ['En la fila de Luz queda un solo hueco: va en bici. Ahí va el ✓.', { on: [1] }],
        ['Si la bici es de Luz, no es de nadie más: se tacha el resto de su columna.', { x: [4, 7] }],
        ['«Paco no va en metro»: a Paco solo le queda el bus.', { x: [5], on: [3] }],
        ['Y a Rita, el metro. Cada fila y cada columna tiene un solo ✓.', { x: [6], on: [8] }],
      ], 'Cada «no» es una ✗. Cuando en una fila o columna queda un solo hueco, ese es el ✓.'),
      xpHaz('rejilla', 'Cada uno toca un instrumento distinto. Nora no toca violín ni arpa. Iván no toca arpa. Marca los ✓.', T(['Nora', 'Iván', 'Sara'], ['violín', 'tambor', 'arpa'], { meta: [1, 3, 8], dice: dice(3), lleno: c => c.filter(x => x === 1).length === 3, pista: 'Empieza por Nora: le queda un solo instrumento.' }), 'A Nora le queda el tambor; a Iván, el violín, porque no toca arpa; y el arpa es de Sara.')],
    ['Un ✓ que tacha a los demás',
      xpMira('rejilla', 'Segunda idea: un ✓ **tacha** toda su fila y toda su columna, y eso destapa otro.', T(['Ana', 'Beto', 'Cris', 'Dora'], ['mango', 'uva', 'kiwi', 'pera'], { cw: 62, ch: 40 }), [
        ['Cuatro amigos y cuatro frutas. La pista más fuerte es afirmativa: «Dora eligió kiwi».', { on: [14] }],
        ['Ese ✓ tacha el resto de la fila de Dora y de la columna del kiwi.', { x: [12, 13, 15, 2, 6, 10] }],
        ['«Ana no eligió mango ni pera.» Con el kiwi ya tachado, solo le queda la uva.', { x: [0, 3], on: [1] }],
        ['La uva ya tiene dueña: se tacha para Beto y Cris.', { x: [5, 9] }],
        ['«Beto no eligió mango»: entonces pera. Y el mango queda para Cris.', { x: [4], on: [7, 8] }],
      ], 'Empieza por las pistas que afirman: su ✓ tacha fila y columna y hace aparecer los demás.'),
      xpHaz('rejilla', 'Cuatro estudiantes, cuatro colores. Teo tiene el verde. Uma no tiene ni el rojo ni el gris. Vera no tiene el gris. Marca los ✓.', T(['Teo', 'Uma', 'Vera', 'Will'], ['rojo', 'azul', 'verde', 'gris'], { cw: 62, ch: 40, meta: [2, 5, 8, 15], dice: dice(4), lleno: c => c.filter(x => x === 1).length === 4, pista: 'Con el verde de Teo tachado, ¿qué le queda a Uma?' }), 'Teo verde; a Uma solo le queda azul; a Vera, rojo; y Will se queda con el gris.')],
    ['Dos tablas que se hablan',
      xpMira('rejilla', 'Tercera idea: con **dos datos** por persona, una tabla al lado de la otra.', T(['Lina', 'Mario', 'Nadia'], ['Cali', 'Tunja', 'Pasto', 'chef', 'piloto', 'juez'], { cw: 45, izq: 58, sobre: raya(3) }), [
        ['Cada persona vive en una ciudad y tiene un oficio. Las dos tablas comparten las filas.', {}],
        ['«Lina vive en Cali» y «Mario es juez»: dos ✓, con sus tachones.', { on: [0, 11], x: [1, 2, 6, 12, 9, 10, 5, 17] }],
        ['«El piloto vive en Tunja.» Mario es juez, no piloto: entonces no vive en Tunja.', { x: [7] }],
        ['A Mario le queda Pasto, y Tunja queda para Nadia.', { on: [8, 13], x: [14] }],
        ['Si Nadia vive en Tunja, es la piloto. Y Lina es la chef.', { on: [16, 3], x: [15, 4] }],
      ], 'Una pista que une dos datos («el piloto vive en Tunja») pasa las marcas de una tabla a la otra.'),
      xpHaz('rejilla', 'Cada uno cocina un día y un plato. Gil cocina el martes. Quien cocina el lunes hace pasta. Ema hace sopa.', T(['Ema', 'Gil', 'Hugo'], ['lun', 'mar', 'mié', 'sopa', 'arroz', 'pasta'], { cw: 45, izq: 58, sobre: raya(3), meta: [2, 3, 7, 10, 12, 17], dice: c => `${c.filter(x => x === 1).length} de 6 ✓. Tres en cada tabla.`, lleno: c => c.filter(x => x === 1).length === 6, pista: 'Ema hace sopa: entonces no cocina el lunes.' }), 'Ema no es la del lunes ni la del martes: miércoles. Hugo, lunes y pasta; Gil, martes y arroz.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Cumplen años en meses distintos. Olga, en julio. Ana no cumple en mayo ni en agosto. Luis no cumple en mayo. ¿Quién cumple cuándo?', T(['Ana', 'Luis', 'Olga', 'Raúl'], ['mayo', 'junio', 'julio', 'agosto'], { cw: 62, ch: 40, meta: [1, 7, 10, 12], dice: dice(4), lleno: c => c.filter(x => x === 1).length === 4, pista: 'Con julio de Olga, a Ana le queda un solo mes.' }), 'Olga julio, Ana junio; a Luis le queda agosto y a Raúl, mayo.')],
  ], 'Personas en filas, datos en columnas, ✗ por cada «no» y un solo ✓ por fila y por columna.');
}
;
//#archivo js/explora-pu-or-4.js
// Preuniversitario · pu-or-4 «Condiciones: tiene que, podría, no puede» (Explora, escenas «rejilla» y «fichas»).
// Los ejemplos no son los de los ejercicios.
{
  // Cuatro casos de dos personas; cada fila es un caso.
  const casos = (a, b, o = {}) => ({ f: 4, c: 1, filas: [`${a} y ${b}`, `solo ${a}`, `solo ${b}`, 'ninguno'], izq: 120, cw: 120, ch: 38, estados: 2, rot: ['', 'se puede', 'choca'], ...o });
  // Equipos posibles: filas = equipos, columnas = personas.
  const eq = ['PQ', 'PR', 'PS', 'QR', 'QS', 'RS'], G = 'PQRS';
  const equipos = { f: 6, c: 4, cols: [...G], filas: eq.map(e => [...e].join(' y ')), izq: 78, cw: 50, ch: 30, estados: 3, celda: (i, r, c) => (eq[r].includes(G[c]) ? '●' : '') };
  const fila = r => [0, 1, 2, 3].map(c => r * 4 + c);
  const zonas = (y = 128) => ['tiene que', 'podría', 'no puede'].map((et, i) => ({ x: 60 + i * 110, y, w: 108, h: 92, n: 3, et, ey: -54 }));

  xpLec('pu-or-4', [
    ['Leer bien un «si…»',
      xpMira('rejilla', 'Empecemos por la idea: «si va A, va B» solo **obliga** cuando A va.', casos('A', 'B', { estados: 3, rot: ['', 'se puede', 'choca'] }), [
        ['La regla: «si va A, entonces va B». Hay cuatro casos. Los revisamos uno por uno.', {}],
        ['Van los dos: A está y B también. Cumple.', { on: [0] }],
        ['Va solo A: la regla pedía a B y no está. Choca.', { x: [1] }],
        ['Va solo B: A no está, así que la regla no pide nada. Se puede.', { on: [2] }],
        ['No va ninguno: tampoco pide nada. Se puede.', { on: [3] }],
        ['Por eso, saber que va B no dice nada de A: puede ir o no.', { luz: [0, 2] }],
      ], '«Si A, entonces B» solo prohíbe un caso: que esté A sin B.'),
      xpHaz('rejilla', 'La regla es «si va M, entonces NO va N». Toca todos los casos que se pueden.', casos('M', 'N', { meta: [1, 2, 3], dice: c => `Marcaste ${c.filter(x => x).length} de los cuatro casos.` }), 'Solo choca que vayan los dos: con M presente, N no puede estar.')],
    ['«Solo si» y la vuelta',
      xpMira('rejilla', 'Segunda idea: «C va **solo si** va D» quiere decir que C necesita a D.', casos('C', 'D', { estados: 3, rot: ['', 'se puede', 'choca'] }), [
        ['«C va solo si va D»: D es el permiso de C. Es igual a decir «si va C, va D».', {}],
        ['Los dos juntos: C tiene su permiso. Se puede.', { on: [0] }],
        ['Solo C, sin permiso: choca.', { x: [1] }],
        ['Solo D: tener permiso no obliga a ir. Se puede.', { on: [2] }],
        ['Y ninguno: se puede.', { on: [3] }],
        ['Mira al revés: si D no va, C tampoco. Esa vuelta siempre vale.', { luz: [3] }, '$\\text{sin D} \\Rightarrow \\text{sin C}$'],
      ], '«C solo si D» es «si C, entonces D». Y dado vuelta: sin D no hay C.'),
      xpHaz('rejilla', 'La regla es «E va solo si va F», y además F **no** va. Toca lo único que se puede.', casos('E', 'F', { meta: [3], dice: c => `Marcaste ${c.filter(x => x).length}. Recuerda: F no va.` }), 'Sin F no hay E: no va ninguno.')],
    ['Tiene que, podría, no puede',
      xpMira('rejilla', 'Tercera idea: se hace la **lista** de casos y se mira qué pasa en ella.', equipos, [
        ['Se eligen dos de P, Q, R y S. Hay seis parejas. Estas son todas.', {}],
        ['Regla 1: «si va P, va R». Chocan P con Q y P con S.', { x: [...fila(0), ...fila(2)] }],
        ['Regla 2: «Q y S no van juntos». Choca esa pareja.', { x: fila(4) }],
        ['Quedan tres casos. R está en los tres: R **tiene que** ir.', { luz: [6, 14, 22], on: [6, 14, 22] }],
        ['P está en uno de los tres: **podría** ir, pero no es seguro.', { luz: [4] }],
        ['Y P con Q no aparece en ninguno: **no puede** pasar.', { luz: fila(0) }],
      ], 'Tiene que: en todos los casos. Podría: en alguno. No puede: en ninguno.'),
      xpHaz('fichas', 'Los únicos equipos posibles son L-M-N, M-N-O y M-O-P. Lleva cada afirmación a su zona.', { slots: zonas(), fichas: ['va M', 'va N', 'van L y P', 'va O'], meta: ['va M', ['va N', 'va O'], 'van L y P'], alto: 182,
        fondo: K => K.t(170, 24, 'L-M-N', 'ta') + K.t(70, 24, 'equipos:', 's tm') + K.t(240, 24, 'M-N-O', 'ta') + K.t(170, 46, 'M-O-P', 'ta'), pista: 'Cuenta en cuántos de los tres equipos se cumple cada una.' }, 'M está en los tres; N y O, en dos; y L con P, en ninguno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se llevan exactamente 3 de 4: mapa, radio, carpa y farol. Si va la radio, va el mapa. Carpa y farol no van juntos. Clasifica (carpa-farol: los dos).', { slots: zonas(100), fichas: ['mapa', 'radio', 'carpa', 'carpa-farol'], meta: [['mapa', 'radio'], 'carpa', 'carpa-farol'], alto: 156,
        pista: 'Lista los equipajes: se deja por fuera la carpa o el farol.' }, 'Solo hay dos equipajes: mapa, radio y carpa, o mapa, radio y farol.')],
  ], 'Un «si» prohíbe un solo caso, «solo si» pide permiso, y la lista de casos dice qué es seguro.');
}
;
//#archivo js/explora-pu-pr-1.js
// Preuniversitario · pu-pr-1 «Razones, repartos y escalas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Vasos: a de un color y b de otro, en grupos.
  const vasos = (v, K) => {
    const A = Math.round(v.a), B = Math.round(v.b), col = v.col ?? 10; let h = '';
    const pone = (n, y, cls) => { let s = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / col), c = i % col; s += K.p([[46 + c * 28, y + r * 34], [68 + c * 28, y + r * 34], [65 + c * 28, y + 26 + r * 34], [49 + c * 28, y + 26 + r * 34]], cls); } return s; };
    h += pone(A, 28, 'fa') + pone(B, 110, 'fg');
    return h + K.t(24, 46, A, 'b ta') + K.t(24, 128, B, 'b') + K.t(46, 20, v.ea ?? 'de jugo', 's tm', 'start') + K.t(46, 102, v.eb ?? 'de agua', 's tm', 'start');
  };
  // Barra partida en partes iguales, con grupos de colores.
  const C = ['fa', 'fg', 'ff'];
  const barra = (v, K) => {
    const r = v.r, n = r.reduce((x, y) => x + y, 0), w = 300 / n; let h = '', k = 0;
    r.forEach((g, i) => { for (let j = 0; j < g; j++, k++) h += K.r(20 + k * w + 1, 60, w - 2, 44, C[i]); });
    h += K.f(v.val, Array.from({ length: n }, (_, i) => K.t(20 + (i + 0.5) * w, 87, N(v.T / n), 's')).join(''));
    k = 0; r.forEach((g, i) => { h += K.f(v.tot, K.t(20 + (k + g / 2) * w, 126, N(g * v.T / n), ['ta', 'tg', 'tf'][i])); k += g; });
    return h + K.t(170, 34, `${v.T} en total`, 'tm');
  };
  const corte = (v, K) => {
    const x = 20 + v.c / 84 * 300;
    return K.r(20, 60, x - 20, 44, 'fa') + K.r(x, 60, 320 - x, 44, 'fg') + Array.from({ length: 6 }, (_, i) => K.l(20 + (i + 1) * 300 / 7, 60, 20 + (i + 1) * 300 / 7, 104, 'ls')).join('') + K.t(20 + (x - 20) / 2, 130, N(v.c), 'ta') + K.t((x + 320) / 2, 130, N(84 - v.c), 'tg') + K.t(170, 36, '84 horas', 'tm');
  };
  const mapa = (v, K) => {
    let h = K.r(20, 20, 300, 64, 'fc') + K.c(40, 60, 5, 'fF') + K.c(40 + v.cm * 34, 60, 5, 'fF') + K.l(40, 60, 40 + v.cm * 34, 60, 'lf d') + K.t(40 + v.cm * 17, 48, `${N(v.cm)} cm`, 'tf') + K.t(30, 34, 'mapa', 's tm', 'start');
    h += K.f(v.real, K.ar(170, 92, 170, 114, 'lm') + K.t(184, 109, `× ${v.esc}`, 'ta', 'start') + K.t(170, 144, v.txt || '', 'b ta'));
    return h;
  };
  const regla = (v, K) => K.t(170, 24, 'mapa: 7 cm · escala 1 : 20 000', 'tm') + K.r(50, 38, 7 * 24, 14, 'ff') + K.r(40, 96, v.km * 125, 30, 'fa') + [0.4, 0.8, 1.2, 1.6, 2].map(k => K.l(40 + k * 125, 126, 40 + k * 125, 134, 'lm') + K.t(40 + k * 125, 149, k, 's tm')).join('') + K.t(316, 149, 'km', 's tm');

  xpLec('pu-pr-1', [
    ['Tantos por cada tantos',
      xpMira('dibujo', 'Empecemos por la idea: una **razón** dice tantos de esto por cada tantos de aquello.', { dib: vasos, v: { a: 2, b: 3, col: 10 }, alto: 190 }, [
        ['Dos vasos de jugo por cada tres de agua: la razón es 2 a 3.', {}, '$2 : 3$'],
        ['Si hacemos el doble, 4 de jugo y 6 de agua. Sabe igual: la razón no cambió.', { a: 4, b: 6 }, '$\\tfrac{2}{3} = \\tfrac{4}{6}$'],
        ['Con el triple, 6 y 9. Los dos se multiplican por el mismo número.', { a: 6, b: 9 }, '$\\tfrac{2}{3} = \\tfrac{6}{9}$'],
        ['Volvamos a 2 y 3. Si a cada uno le sumamos 1, queda 3 y 4: sabe distinto.', { a: 3, b: 4 }, '$\\tfrac{2}{3} \\neq \\tfrac{3}{4}$'],
        ['Para saber si dos razones son iguales, multiplica en cruz: 2 por 9 y 3 por 6, 18 y 18.', { a: 6, b: 9 }, '$2 \\cdot 9 = 3 \\cdot 6$'],
      ], 'Dos razones iguales forman una proporción: se multiplica (o divide) por lo mismo, y los productos en cruz coinciden.'),
      xpHaz('dibujo', 'Un tono lleva 2 tarros de azul por cada 5 de blanco. Hay 20 de blanco: ajusta los de azul.', { dib: vasos, v: { a: 2, b: 20, col: 10, ea: 'azul', eb: 'blanco' }, metas: { a: 8 }, alto: 240, manijas: [{ k: 'a', min: 1, max: 12, paso: 1, et: '' }],
        lee: v => `$\\tfrac{2}{5} \\; \\tfrac{${v.a}}{20} \\qquad 2 \\cdot 20 = 40 \\quad 5 \\cdot ${v.a} = ${5 * v.a}$`, dice: v => (5 * v.a === 40 ? 'Los productos en cruz coinciden.' : 'Los productos en cruz aún no coinciden.') }, 'De 5 a 20 es por 4: también $2 \\cdot 4 = 8$ de azul.')],
    ['Repartir por partes',
      xpMira('dibujo', 'Segunda idea: repartir en una razón es partir en **partes iguales** y darlas.', { dib: barra, v: { r: [1, 2, 3], T: 48, val: 0, tot: 0 }, alto: 150 }, [
        ['Repartimos 48 dulces entre tres niños en razón 1, 2 y 3.', {}],
        ['En total son 1 más 2 más 3: seis partes iguales.', {}, '$1 + 2 + 3 = 6$'],
        ['Cada parte vale 48 entre 6: 8 dulces.', { val: 1 }, '$48 \\div 6 = 8$'],
        ['Ahora se entregan: 1 parte son 8, 2 partes son 16 y 3 partes son 24.', { tot: 1 }, '$8 + 16 + 24 = 48$'],
        ['No se divide 48 entre 3: a cada uno le toca según sus partes.', {}],
      ], 'Suma las partes, divide el total entre ellas y multiplica por las de cada uno.'),
      xpHaz('dibujo', 'Dos personas se reparten 84 horas de trabajo en razón 3 : 4. Arrastra el corte.', { dib: corte, v: { c: 72 }, metas: { c: 36 }, alto: 150, manijas: [{ k: 'c', min: 12, max: 72, paso: 4, en: v => [20 + v.c / 84 * 300, 82], de: x => (x - 20) / 300 * 84, r: 11 }],
        lee: v => `$\\tfrac{${v.c}}{${84 - v.c}} \\qquad 84 \\div 7 = 12$`, dice: v => `La primera hace ${v.c} y la otra ${84 - v.c}.` }, 'Son 7 partes de 12 horas: $3 \\cdot 12 = 36$ y $4 \\cdot 12 = 48$.')],
    ['Escalas',
      xpMira('dibujo', 'Tercera idea: una **escala** es una razón entre el mapa y la realidad.', { dib: mapa, v: { cm: 1, real: 0, esc: '50 000', txt: '' }, alto: 165 }, [
        ['Escala 1 : 50 000 quiere decir: 1 cm del mapa son 50 000 cm de verdad.', {}, '$1 : 50\\,000$'],
        ['50 000 cm son 500 m, porque cada metro tiene 100 cm.', { real: 1, txt: '50 000 cm = 500 m' }, '$50\\,000 \\div 100 = 500$'],
        ['Si en el mapa hay 6 cm, son 6 veces 500 m: 3 000 m.', { cm: 6, txt: '6 · 500 m = 3 000 m' }, '$6 \\cdot 500 = 3\\,000$'],
        ['Y 3 000 m son 3 km. Las dos medidas de la escala van en la misma unidad.', { txt: '3 km' }, '$3\\,000 \\text{ m} = 3 \\text{ km}$'],
      ], 'Escala 1 : N: lo real es N veces lo del mapa, en la misma unidad. Luego se cambia de unidad.'),
      xpHaz('dibujo', 'En un mapa 1 : 20 000, dos colegios están a 7 cm. Estira la barra hasta la distancia real.', { dib: regla, v: { km: 0.2 }, metas: { km: 1.4 }, alto: 165, manijas: [{ k: 'km', min: 0.1, max: 2.2, paso: 0.1, en: v => [40 + v.km * 125, 111], de: x => (x - 40) / 125, r: 11 }],
        lee: v => `$${N(v.km)} \\text{ km} = ${N(v.km * 1000)} \\text{ m} = ${N(v.km * 5)} \\cdot 200 \\text{ m}$`, dice: v => `Cada centímetro son 200 m: esta barra son ${N(v.km * 5)} cm del mapa.` }, '1 cm son 200 m: $7 \\cdot 200 = 1\\,400$ m, o sea 1.4 km.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una mezcla de 640 g lleva maní, almendras y pasas en razón 4 : 1 : 3. Pon los gramos de cada una.', {
        fondo: K => [4, 1, 3].map((g, i) => Array.from({ length: g }, (_, j) => K.r(30 + ([0, 4, 5][i] + j) * 35 + 1, 24, 33, 26, C[i])).join('')).join(''),
        slots: [{ x: 70, y: 100, w: 84, et: 'maní' }, { x: 170, y: 100, w: 84, et: 'almendras' }, { x: 270, y: 100, w: 84, et: 'pasas' }], fichas: ['80', '160', '240', '320', '213'], meta: ['320', '80', '240'], alto: 150, pista: 'Son 8 partes iguales. ¿Cuánto pesa cada una?' }, '8 partes de 80 g: $4 \\cdot 80 = 320$, $80$ y $3 \\cdot 80 = 240$.')],
  ], 'Razones que se agrandan por igual, repartos por partes y escalas que son una razón.');
}
;
//#archivo js/explora-pu-pr-2.js
// Preuniversitario · pu-pr-2 «Regla de tres simple y compuesta» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Directa: dos barras que crecen a la vez.
  const dir = (v, K) => {
    const ux = 270 / v.X, uy = 270 / v.Y, x = v.x, y = v.y ?? v.x * v.k;
    return K.t(30, 36, v.ex, 's tm', 'start') + K.r(30, 44, x * ux, 32, 'fa') + K.t(30 + x * ux + 8, 66, N(x), 'ta', 'start') + K.t(30, 112, v.ey, 's tm', 'start') + K.r(30, 120, y * uy, 32, 'fg') + K.t(30 + y * uy + (v.m ? 20 : 8), 142, v.oc ? '?' : N(y), 'tg', 'start');
  };
  // Inversa: rectángulo de área fija.
  const inv = (v, K) => {
    const ux = v.ux, uy = v.uy, w = v.a * ux, h = v.b * uy, y = 190, x = 60;
    let s = K.r(x, y - h, w, h, 'fa');
    for (let i = 1; i < Math.round(v.a); i++) s += K.l(x + i * ux, y, x + i * ux, y - h, 'lr');
    return s + K.l(x, y, 325, y, 'lm') + K.l(x, y, x, 20, 'lm') + K.t(x + w / 2, y + 17, `${N(v.a)} ${v.ea}`, 'ta') + K.t(x - 8, y - h / 2 + 5, N(v.b), 'tg', 'end') + K.t(x - 8, y - h / 2 + 20, v.eb, 's tm', 'end');
  };
  // Trabajo: filas = horas, columnas = personas o máquinas; cada cuadro, una hora de una.
  const tra = (v, K) => {
    const a = Math.round(v.a), b = Math.round(v.b), u = 30, x = 170 - a * u / 2 + 10, y = 26; let s = '';
    for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) s += K.r(x + i * u + 1, y + j * u + 1, u - 2, u - 2, 'fa') + K.f(v.val ?? 0, K.t(x + (i + 0.5) * u, y + (j + 0.5) * u + 4, v.c, 's'));
    return s + K.t(x + a * u / 2, 18, `${a} ${v.ea}`, 'ta') + K.t(x - 8, y + b * u / 2 + 5, `${b} h`, 'tg', 'end');
  };

  xpLec('pu-pr-2', [
    ['Directa: crecen a la vez',
      xpMira('dibujo', 'Empecemos por la idea: en una relación **directa**, las dos crecen igual.', { dib: dir, v: { X: 10, Y: 40, x: 2, k: 4, ex: 'cuadernos', ey: 'precio (miles)' }, alto: 170 }, [
        ['Dos cuadernos cuestan 8 mil pesos.', {}, '$8 \\div 2 = 4$'],
        ['Con el doble de cuadernos, el doble de precio: 4 cuadernos, 16 mil.', { x: 4 }, '$16 \\div 4 = 4$'],
        ['Con siete, 28 mil. El cociente no cambia: cada cuaderno vale 4 mil.', { x: 7 }, '$28 \\div 7 = 4$'],
        ['Por eso el camino más corto es buscar cuánto vale uno y multiplicar.', { x: 1 }, '$1 \\to 4$'],
        ['Nueve cuadernos: 9 por 4, son 36 mil.', { x: 9 }, '$9 \\cdot 4 = 36$'],
      ], 'Directa: el cociente no cambia. Halla cuánto vale **uno** y multiplica.'),
      xpHaz('dibujo', 'Cinco metros de tela cuestan 40 mil. Estira el precio hasta el de 8 metros.', { dib: dir, v: { X: 10, Y: 100, x: 8, y: 30, ex: 'metros de tela', ey: 'precio (miles)', m: 1 }, metas: { y: 64 }, alto: 170, manijas: [{ k: 'y', min: 4, max: 90, paso: 4, en: v => [30 + v.y * 2.7, 136], de: x => (x - 30) / 2.7, r: 11 }],
        lee: v => `$\\tfrac{40}{5} = 8 \\qquad \\tfrac{${v.y}}{8} = ${N(v.y / 8)}$`, dice: v => `A ese precio, cada metro saldría a ${N(v.y / 8)} mil.` }, 'Cada metro vale 8 mil: $8 \\cdot 8 = 64$ mil.')],
    ['Inversa: una sube, la otra baja',
      xpMira('dibujo', 'Segunda idea: en una relación **inversa**, lo que no cambia es el producto.', { dib: inv, v: { a: 6, b: 10, ux: 18, uy: 8, ea: 'obreros', eb: 'días' }, alto: 215 }, [
        ['Seis obreros terminan una obra en 10 días. El área es el trabajo: 60 jornadas.', {}, '$6 \\cdot 10 = 60$'],
        ['Si van menos obreros, 4, tienen que trabajar más días: 15. El trabajo es el mismo.', { a: 4, b: 15 }, '$4 \\cdot 15 = 60$'],
        ['Con 12 obreros bastan 5 días. El rectángulo se aplasta, pero ocupa lo mismo.', { a: 12, b: 5 }, '$12 \\cdot 5 = 60$'],
        ['Doble de obreros, mitad de días. Por eso se multiplica, no se divide.', {}, '$a \\cdot b = 60$'],
        ['Si la gente cambia a mitad de camino, reparte lo que falta: 24 jornadas entre 4 obreros son 6 días.', { a: 4, b: 6 }, '$24 \\div 4 = 6$'],
        ['Pregúntate siempre: si una crece, ¿la otra crece o baja? Eso decide qué cuenta hacer.', {}],
      ], 'Inversa: el producto no cambia. Si una se duplica, la otra queda a la mitad.'),
      xpHaz('dibujo', 'El pasto alcanza para 6 vacas durante 14 días. Son 7 vacas: baja los días hasta gastar lo mismo.', { dib: inv, v: { a: 7, b: 16, ux: 18, uy: 8.5, ea: 'vacas', eb: 'días' }, metas: { b: 12 }, alto: 215, manijas: [{ k: 'b', min: 2, max: 18, paso: 1, en: v => [123, 190 - v.b * 8.5], de: (x, y) => (190 - y) / 8.5, r: 11 }],
        lee: v => `$6 \\cdot 14 = 84 \\qquad 7 \\cdot ${v.b} = ${7 * v.b}$`, dice: v => `7 vacas por ${v.b} días son ${7 * v.b} raciones.` }, 'Son 84 raciones: $84 \\div 7 = 12$ días.')],
    ['Compuesta: cuenta el trabajo',
      xpMira('dibujo', 'Tercera idea: con **tres datos**, cuenta cuadritos de trabajo.', { dib: tra, v: { a: 2, b: 3, ea: 'sastres', c: '4', val: 0 }, alto: 190 }, [
        ['Dos sastres en 3 horas hacen 24 botones. ¿Cuántos hacen 4 sastres en 5 horas?', {}],
        ['Cada cuadro es un sastre trabajando una hora: hay 2 por 3, seis cuadros.', {}, '$2 \\cdot 3 = 6$'],
        ['Los seis cuadros dan 24 botones: cada cuadro hace 4.', { val: 1 }, '$24 \\div 6 = 4$'],
        ['Con 4 sastres y 5 horas hay 20 cuadros.', { a: 4, b: 5 }, '$4 \\cdot 5 = 20$'],
        ['Veinte cuadros de 4 botones: son 80.', {}, '$20 \\cdot 4 = 80$'],
      ], 'Compuesta: reduce a **uno solo en una hora** y luego multiplica por los cuadros que haya.'),
      xpHaz('dibujo', 'Dos hornos en 3 horas hacen 30 panes. Ajusta las horas para que 4 hornos hagan 100 panes.', { dib: tra, v: { a: 4, b: 1, ea: 'hornos', c: '5', val: 1 }, metas: { b: 5 }, alto: 250, manijas: [{ k: 'b', min: 1, max: 6, paso: 1, et: 'horas' }],
        lee: v => `$4 \\cdot ${v.b} \\cdot 5 = ${20 * v.b}$`, dice: v => `${4 * v.b} cuadros de 5 panes: ${20 * v.b}.` }, 'Un horno hace 5 panes por hora; 4 hornos, 20. Para 100 hacen falta 5 horas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con 6 litros de pintura se cubren 48 m². Estira los litros hasta cubrir 80 m².', { dib: (v, K) => dir({ ...v, x: v.y * 8, ex: 'm² cubiertos', ey: 'litros' }, K), v: { X: 110, Y: 12, y: 2, m: 1 }, metas: { y: 10 }, alto: 170, manijas: [{ k: 'y', min: 1, max: 12, paso: 1, en: v => [30 + v.y * 22.5, 136], de: x => (x - 30) / 22.5, r: 11 }],
        lee: v => `$48 \\div 6 = 8 \\qquad ${v.y} \\cdot 8 = ${8 * v.y}$`, dice: v => `${v.y} ${v.y === 1 ? 'litro cubre' : 'litros cubren'} ${8 * v.y} m².` }, 'Es directa: cada litro cubre 8 m², y $80 \\div 8 = 10$ litros.')],
  ], 'Directa guarda el cociente, inversa guarda el producto, y en la compuesta se cuentan cuadros de trabajo.');
}
;
//#archivo js/explora-pu-pr-3.js
// Preuniversitario · pu-pr-3 «Velocidad y trabajo conjunto» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const carro = (K, x, y, cls) => K.r(x - 15, y - 13, 30, 10, cls, 4) + K.r(x - 8, y - 20, 16, 9, cls, 3) + K.c(x - 8, y - 2, 4, 'fk') + K.c(x + 8, y - 2, 4, 'fk');
  // Dos móviles en una vía de D km: uno desde la izquierda (va, sale en t = ta) y otro (vb) desde la derecha o detrás.
  const via = (v, K) => {
    const X = k => 24 + k / v.D * 292, a = v.va * v.t, b = v.modo === 'caza' ? v.vent + v.vb * v.t : v.D - v.vb * v.t;
    let h = K.l(20, 100, 320, 100, 'lm') + K.l(X(0), 96, X(0), 104, 'lm') + K.l(X(v.D), 96, X(v.D), 104, 'lm') + K.t(X(v.D), 120, `${v.D} km`, 's tm', 'end') + K.t(X(0), 120, '0', 's tm');
    h += K.l(X(0), 96, X(a), 96, 'la gr') + carro(K, X(a), 94, 'fa') + K.t(Math.max(30, X(a)), 64, `${N(a)} km`, 'ta');
    if (v.vb) h += (v.modo === 'caza' ? K.l(X(0), 106, X(b), 106, 'lg gr') : K.l(X(v.D), 106, X(b), 106, 'lg gr')) + carro(K, X(b), 94, 'fg') + K.t(Math.min(300, X(b)), v.modo === 'caza' || Math.abs(X(a) - X(b)) < 70 ? 44 : 64, `${N(v.modo === 'caza' ? b : v.vb * v.t)} km`, 'tg');
    return h + K.t(170, 26, `${N(v.t)} h`, 'b');
  };
  const media = (v, K) => {
    const u = 300 / 260, w1 = 120 * u, w2 = 120 * u, f = v.f;
    return K.t(170, 22, 'ida: 120 km a 60 km/h', 'ta') + K.r(32, 32, w1 * Math.min(1, f), 26, 'fa') + K.f(f > 0.9 ? 1 : 0, K.t(32 + w1 + 10, 50, '2 h', 'ta', 'start')) + K.t(170, 88, 'regreso: 120 km a 40 km/h', 'tg') + K.r(32, 98, w2 * Math.min(1, v.g), 26, 'fg') + K.f(v.g > 0.9 ? 1 : 0, K.t(32 + w2 + 10, 116, '3 h', 'tg', 'start')) + K.f(v.tot, K.t(170, 152, '240 km en 5 h', 'b'));
  };
  // Tanque que se llena con dos llaves: en t horas, t/A y t/B.
  const tanque = (v, K) => {
    const H = 140, y = 175, a = Math.min(1, v.t / v.A), b = v.dos ? Math.min(1 - a, v.t / v.B) : 0;
    return K.r(115, y - H * a, 110, H * a, 'fa') + K.r(115, y - H * a - H * b, 110, H * b, 'fg') + K.r(115, y - H, 110, H, 'fn') + (v.marcas ? Array.from({ length: v.marcas - 1 }, (_, i) => K.l(225, y - H * (i + 1) / v.marcas, 233, y - H * (i + 1) / v.marcas, 'lm')).join('') : '')
      + K.t(105, y - H * a / 2 + 5, a > 0.04 ? v.ta ?? '' : '', 'ta', 'end') + K.t(242, y - H * a - H * b / 2 + 5, b > 0.04 ? v.tb ?? '' : '', 'tg', 'start') + K.t(170, 24, `${N(v.t)} h`, 'b');
  };

  xpLec('pu-pr-3', [
    ['Distancia, velocidad y tiempo',
      xpMira('dibujo', 'Empecemos por la idea: la velocidad dice **cuánto avanzas en cada hora**.', { dib: via, v: { D: 300, va: 60, vb: 0, t: 0, modo: 'x', vent: 0 }, alto: 135 }, [
        ['Un carro va a 60 km/h: cada hora avanza 60 km.', { t: 1 }, '$60 \\cdot 1 = 60$'],
        ['En 3 horas avanza 60 tres veces: 180 km. Distancia es velocidad por tiempo.', { t: 3 }, '$d = v \\cdot t = 180$'],
        ['Ahora otro carro sale al tiempo desde el otro extremo, a 40 km/h.', { t: 0, vb: 40 }],
        ['Cada hora se acercan 60 más 40: 100 km. Las velocidades se suman.', { t: 1 }, '$60 + 40 = 100$'],
        ['Los separan 300 km: se encuentran en 3 horas.', { t: 3 }, '$300 \\div 100 = 3$'],
        ['Y si uno sale 2 horas antes a 60 km/h, esa salida son 120 km de ventaja.', { t: 2, vb: 0 }, '$60 \\cdot 2 = 120$'],
      ], '$d = v \\cdot t$. Si dos se acercan, sus velocidades se suman; si uno persigue a otro, se restan.'),
      xpHaz('dibujo', 'Dos ciclistas salen al tiempo desde pueblos a 105 km, a 20 y a 15 km/h. Mueve el reloj hasta que se encuentren.', { dib: via, v: { D: 105, va: 20, vb: 15, t: 0.5, modo: 'x', vent: 0 }, metas: { t: 3 }, alto: 190, manijas: [{ k: 't', min: 0, max: 5, paso: 0.5, et: 'horas', rot: v => N(v.t) }],
        lee: v => `$20 \\cdot ${N(v.t)} + 15 \\cdot ${N(v.t)} = ${N(35 * v.t)}$`, dice: v => (35 * v.t > 105 ? 'Ya se cruzaron: pasaron de largo.' : `Entre los dos llevan ${N(35 * v.t)} de 105 km.`) }, 'Se acercan 35 km cada hora: $105 \\div 35 = 3$ horas.')],
    ['Velocidad media: no es el promedio',
      xpMira('dibujo', 'Segunda idea: la velocidad **media** es toda la distancia entre todo el tiempo.', { dib: media, v: { f: 0, g: 0, tot: 0 }, alto: 165 }, [
        ['De ida, 120 km a 60 km/h: se gastan 2 horas.', { f: 1 }, '$120 \\div 60 = 2$'],
        ['De regreso, los mismos 120 km a 40 km/h: se gastan 3 horas.', { g: 1 }, '$120 \\div 40 = 3$'],
        ['En total, 240 km en 5 horas.', { tot: 1 }, '$\\tfrac{240}{5} = 48$'],
        ['La media es 48 km/h, no 50. Se pasa más tiempo yendo despacio, y eso pesa más.', {}, '$48 \\neq \\tfrac{60 + 40}{2}$'],
      ], 'Velocidad media = distancia total ÷ tiempo total. No se promedian las velocidades.'),
      xpHaz('fichas', 'Un bus hace 90 km a 90 km/h y otros 90 km a 45 km/h. Pon las horas de cada tramo y la velocidad media.', { slots: [{ x: 70, y: 70, w: 84, et: 'horas, tramo 1' }, { x: 170, y: 70, w: 84, et: 'horas, tramo 2' }, { x: 270, y: 70, w: 84, et: 'media (km/h)' }], fichas: ['1', '2', '3', '60', '67.5'], meta: ['1', '2', '60'], alto: 120, fondo: K => K.r(20, 14, 150, 22, 'fa') + K.r(170, 14, 150, 22, 'fg') + K.t(95, 30, '90 km', 's') + K.t(245, 30, '90 km', 's'), pista: 'La media es 180 km entre todas las horas.' }, '1 h y 2 h: $180 \\div 3 = 60$ km/h, y no 67.5.')],
    ['Trabajar juntos: se suman las rapideces',
      xpMira('dibujo', 'Tercera idea: juntos se suma lo que cada uno hace **en una hora**.', { dib: tanque, v: { t: 0, A: 4, B: 12, dos: 0, ta: '', tb: '' }, alto: 195 }, [
        ['Una llave llena el tanque en 4 horas. En una hora llena un cuarto.', { t: 1, ta: '1/4' }, '$\\tfrac14$'],
        ['Otra llave lo llena en 12 horas: en una hora, un doceavo.', { dos: 1, tb: '1/12' }, '$\\tfrac{1}{12}$'],
        ['Abiertas las dos, en una hora llenan un cuarto más un doceavo: la tercera parte.', {}, '$\\tfrac14 + \\tfrac{1}{12} = \\tfrac13$'],
        ['Entonces en 3 horas el tanque está lleno.', { t: 3, ta: '3/4', tb: '3/12' }, '$3 \\cdot \\tfrac13 = 1$'],
        ['Al revés también: si juntas llenan 1/3 por hora y una llena 1/4, la otra llena lo que falta.', {}, '$\\tfrac13 - \\tfrac14 = \\tfrac{1}{12}$'],
        ['No se promedian ni se suman las horas: juntas tardan menos que la más rápida sola.', {}, '$3 < 4$'],
      ], 'Suma lo que cada uno hace por hora. Juntos siempre tardan menos que el más rápido.'),
      xpHaz('dibujo', 'Una bomba llena un pozo en 5 h y otra en 20 h. Mueve el reloj hasta que juntas lo llenen justo.', { dib: tanque, v: { t: 1, A: 5, B: 20, dos: 1, marcas: 4 }, metas: { t: 4 }, alto: 245, manijas: [{ k: 't', min: 0, max: 8, paso: 1, et: 'horas' }],
        lee: v => `$\\tfrac{${v.t}}{5} + \\tfrac{${v.t}}{20} = \\tfrac{${5 * v.t}}{20}$`, dice: v => (v.t > 4 ? 'El pozo ya está lleno y se riega: menos horas.' : `Llevan ${5 * v.t} de 20 partes del pozo.`) }, '$\\tfrac15 + \\tfrac{1}{20} = \\tfrac{5}{20} = \\tfrac14$ por hora: 4 horas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un camión le lleva 160 km a un carro. El camión va a 50 km/h y el carro a 90 km/h. ¿En cuántas horas lo alcanza?', { dib: via, v: { D: 480, va: 90, vb: 50, t: 0, modo: 'caza', vent: 160 }, metas: { t: 4 }, alto: 190, manijas: [{ k: 't', min: 0, max: 5, paso: 0.5, et: 'horas', rot: v => N(v.t) }],
        lee: v => `$\\text{ventaja: } 160 - 40 \\cdot ${N(v.t)} = ${N(160 - 40 * v.t)}$`, dice: v => (v.t > 4 ? 'El carro ya lo pasó.' : `El carro descuenta 40 km cada hora: faltan ${N(160 - 40 * v.t)}.`) }, 'Cada hora descuenta $90 - 50 = 40$ km: $160 \\div 40 = 4$ horas.')],
  ], '$d = v \\cdot t$, velocidades que se suman o se restan, media como total entre total, y rapideces que se suman.');
}
;
//#archivo js/explora-pu-pr-4.js
// Preuniversitario · pu-pr-4 «Porcentajes» (Explora, escena «dibujo»: la doble barra). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Doble barra: abajo el porcentaje (0–100 a lo largo de v.L píxeles), arriba la cantidad (total v.T).
  const doble = (v, K) => {
    const L = v.L ?? 290, x = 25 + v.p / 100 * L, q = v.q ?? v.p * v.T / 100;
    return K.r(25, 56, L, 40, 'fc') + K.r(25, 56, x - 25, 40, 'fa') + [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(k => K.l(25 + k / 100 * L, 96, 25 + k / 100 * L, k % 50 ? 101 : 106, 'lm')).join('')
      + K.t(25, 121, '0 %', 's tm') + K.t(25 + L, 121, '100 %', 's tm') + (v.p > 12 && v.p < 86 ? K.t(x, 121, v.ocp ? '? %' : `${N(v.p)} %`, 'ta') : '') + K.t(25, 46, '0', 's tm') + (v.p < 86 ? K.t(25 + L, 46, v.ocT ? '?' : N(v.T), 's tm') : '') + K.t(x, 46, v.ocq ? '?' : N(q), 'tg');
  };

  xpLec('pu-pr-4', [
    ['El tanto por ciento de algo',
      xpMira('dibujo', 'Empecemos por la idea: una barra con **dos reglas**, la cantidad arriba y el porcentaje abajo.', { dib: doble, v: { p: 100, T: 60, L: 290 }, alto: 140 }, [
        ['La barra entera son 60 estudiantes: el 100 %.', {}, '$100\\,\\% = 60$'],
        ['La mitad es el 50 %: 30 estudiantes.', { p: 50 }, '$50\\,\\% = 30$'],
        ['El 10 % es la décima parte: 6. Es la pieza que más sirve.', { p: 10 }, '$10\\,\\% = 6$'],
        ['El 30 % son tres piezas del 10 %: 18.', { p: 30 }, '$3 \\cdot 6 = 18$'],
        ['Y el 35 % son 18 más media pieza, 3: son 21. Es igual a 0.35 por 60.', { p: 35 }, '$0.35 \\cdot 60 = 21$'],
      ], 'El p % de N es $\\tfrac{p}{100} \\cdot N$. A mano, ármalo con piezas del 10 %, del 5 % y del 1 %.'),
      xpHaz('dibujo', 'Un viaje es de 80 km y ya va el 65 %. Arrastra hasta los kilómetros recorridos.', { dib: (v, K) => doble({ ...v, p: v.q / 0.8 }, K), v: { q: 8, T: 80, L: 290 }, metas: { q: 52 }, alto: 140, manijas: [{ k: 'q', min: 0, max: 80, paso: 4, en: v => [25 + v.q / 80 * 290, 76], de: x => (x - 25) / 290 * 80, r: 11 }],
        lee: v => `$10\\,\\% = 8 \\qquad \\tfrac{${v.q}}{80} = ${N(v.q / 0.8)}\\,\\%$`, dice: v => `${v.q} km de 80 son el ${N(v.q / 0.8)} %.` }, 'Seis piezas de 8 son 48, y media pieza más, 4: 52 km.')],
    ['¿Qué porcentaje es?',
      xpMira('dibujo', 'Segunda idea: para saber **qué porcentaje** es, compara la parte con el total.', { dib: doble, v: { p: 40, T: 25, q: 10, ocp: 1, L: 290 }, alto: 140 }, [
        ['De 25 penaltis, un arquero tapó 10. ¿Qué porcentaje es?', {}],
        ['La fracción es 10 de 25, dos quintos.', {}, '$\\tfrac{10}{25} = \\tfrac25$'],
        ['Si 25 fueran 100, se multiplicaría por 4. Los 10 también: 40.', {}, '$\\tfrac{10}{25} = \\tfrac{40}{100}$'],
        ['Es el 40 %. La cuenta corta: parte entre total, por 100.', { ocp: 0 }, '$\\tfrac{10}{25} \\cdot 100 = 40$'],
        ['Cuidado: si divides 25 entre 10 sale 2.5. La parte va arriba y el total abajo.', {}, '$\\tfrac{\\text{parte}}{\\text{total}}$'],
      ], 'Qué porcentaje es A de B: $\\tfrac{A}{B} \\cdot 100$. El total siempre va abajo.'),
      xpHaz('dibujo', 'De 40 libros, 14 son novelas. Arrastra el porcentaje hasta que coincida con 14.', { dib: doble, v: { p: 10, T: 40, L: 290 }, metas: { p: 35 }, alto: 140, manijas: [{ k: 'p', min: 0, max: 100, paso: 5, en: v => [25 + v.p * 2.9, 76], de: x => (x - 25) / 2.9, r: 11 }],
        lee: v => `$${v.p}\\,\\% \\text{ de } 40 = ${N(v.p * 0.4)}$`, dice: v => `El ${v.p} % de 40 libros son ${N(v.p * 0.4)}.` }, '$\\tfrac{14}{40} \\cdot 100 = 35$: son el 35 %.')],
    ['Al revés: hallar el total',
      xpMira('dibujo', 'Tercera idea: si se conoce la parte, se **sube** hasta el 100 %.', { dib: doble, v: { p: 30, T: 70, q: 21, ocT: 1, L: 290 }, alto: 140 }, [
        ['El 30 % de una caja son 21 naranjas. ¿Cuántas hay en total?', {}],
        ['Bajamos a la pieza del 10 %: la tercera parte de 21, que es 7.', { p: 10, q: 7 }, '$21 \\div 3 = 7$'],
        ['Y subimos al 100 %: diez piezas de 7 son 70.', { p: 100, q: 70, ocT: 0 }, '$10 \\cdot 7 = 70$'],
        ['No se le saca el 30 % a 21: esa es la parte, no el total.', { p: 30, q: 21 }, '$\\tfrac{21}{0.30} = 70$'],
      ], 'Para volver al total: divide hasta el 10 % o el 1 % y sube al 100 %.'),
      xpHaz('dibujo', 'Veintisiete jugadores son el 45 % de un club. Estira el total hasta que el 45 % sean 27.', { dib: (v, K) => { const L = v.T * 3.4; return doble({ ...v, p: 45, L }, K); }, v: { T: 32 }, metas: { T: 60 }, alto: 140, manijas: [{ k: 'T', min: 20, max: 80, paso: 4, en: v => [25 + v.T * 3.4, 76], de: x => (x - 25) / 3.4, r: 11 }],
        lee: v => `$45\\,\\% \\text{ de } ${v.T} = ${N(0.45 * v.T)}$`, dice: v => `Si el club tuviera ${v.T}, el 45 % serían ${N(0.45 * v.T)}.` }, 'El 5 % son 3 jugadores; el 100 %, veinte veces eso: 60.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un colegio de 250 personas, el 40 % toma bus. De ellas, el 30 % vive fuera de la ciudad. Completa.', { slots: [{ x: 70, y: 72, w: 92, et: 'toman bus' }, { x: 170, y: 72, w: 92, et: 'viven afuera' }, { x: 270, y: 72, w: 92, et: '% del colegio' }], fichas: ['100', '75', '30', '12 %', '70 %'], meta: ['100', '30', '12 %'], alto: 122, fondo: K => K.r(25, 16, 290, 20, 'fc') + K.r(25, 16, 116, 20, 'fa') + K.r(25, 16, 35, 20, 'fg'), pista: 'El 30 % se saca de los que toman bus, no de los 250.' }, 'El 40 % de 250 son 100; el 30 % de esos 100 son 30, y 30 de 250 son el 12 %.')],
  ], 'La parte, el porcentaje y el total: tres preguntas sobre la misma barra de dos reglas.');
}
;
//#archivo js/explora-pu-pr-5.js
// Preuniversitario · pu-pr-5 «Aumentos, descuentos e IVA» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barras: cada una con su valor y su rótulo; u píxeles por unidad.
  const bars = (v, K) => {
    const u = v.u ?? 2;
    const fila = (x, y, cls, tcls, et, o = 1) => K.f(o, K.r(20, y, x * u, 30, cls) + K.t(20 + x * u + (v.m ? 18 : 8), y + 20, N(x), tcls, 'start') + K.t(20, y - 6, et, 's tm', 'start'));
    return fila(v.a, 26, 'fa', 'ta', v.ea ?? 'antes') + fila(v.b, 88, 'fg', 'tg', v.eb ?? 'después', v.fb ?? 1) + (v.c != null ? fila(v.c, 150, 'ff', 'tf', v.ec ?? 'al final', v.fc ?? 1) : '');
  };

  xpLec('pu-pr-5', [
    ['Subir y bajar es multiplicar',
      xpMira('dibujo', 'Empecemos por la idea: un aumento o un descuento es **un solo factor**.', { dib: bars, v: { a: 100, b: 100, u: 1.9, fb: 1 }, alto: 135 }, [
        ['Algo vale 100: es el 100 %, o sea 1 vez el precio.', {}, '$100\\,\\% = 1$'],
        ['Sube un 20 %: ahora es el 120 %, que es multiplicar por 1.2.', { b: 120 }, '$100 \\cdot 1.2 = 120$'],
        ['Si baja un 20 %, queda el 80 %: multiplicar por 0.8.', { b: 80 }, '$100 \\cdot 0.8 = 80$'],
        ['Baja un 5 %: queda el 95 %, por 0.95.', { b: 95 }, '$100 \\cdot 0.95 = 95$'],
        ['Sube un 50 %: por 1.5. El factor es 1 más o menos el porcentaje.', { b: 150 }, '$100 \\cdot 1.5 = 150$'],
      ], 'Aumentar r % es multiplicar por $1 + \\tfrac{r}{100}$; descontar, por $1 - \\tfrac{r}{100}$.'),
      xpHaz('dibujo', 'Unos zapatos de 80 mil bajan un 35 %. Arrastra hasta el precio nuevo.', { dib: bars, v: { a: 80, b: 72, u: 3, m: 1 }, metas: { b: 52 }, alto: 135, manijas: [{ k: 'b', min: 8, max: 80, paso: 4, en: v => [20 + v.b * 3, 103], de: x => (x - 20) / 3, r: 10 }],
        lee: v => `$\\tfrac{${v.b}}{80} = ${N(v.b / 80)}$`, dice: v => `${v.b} es el ${N(v.b / 0.8)} % de 80: bajó un ${N(100 - v.b / 0.8)} %.` }, 'Queda el 65 %: $80 \\cdot 0.65 = 52$ mil.')],
    ['Uno tras otro',
      xpMira('dibujo', 'Segunda idea: los cambios seguidos **se multiplican**, no se suman.', { dib: bars, v: { a: 100, b: 100, c: 100, u: 1.9, fb: 0, fc: 0, eb: 'sube 50 %', ec: 'ahora vale' }, alto: 195 }, [
        ['Una acción vale 100 y sube un 50 %.', { fb: 1, b: 150 }, '$100 \\cdot 1.5 = 150$'],
        ['Después baja un 50 %. Pero ahora el 50 % es de 150, no de 100.', { fc: 1, c: 150 }, '$50\\,\\% \\text{ de } 150 = 75$'],
        ['Queda en 75: no volvió a 100. Se perdió una cuarta parte.', { c: 75, ec: 'baja 50 %' }, '$150 \\cdot 0.5 = 75$'],
        ['Juntos son un solo factor: 1.5 por 0.5, que da 0.75.', {}, '$1.5 \\cdot 0.5 = 0.75$'],
        ['Y el orden no importa: al revés también queda en 75.', { b: 50, eb: 'baja 50 %', ec: 'sube 50 %' }, '$0.5 \\cdot 1.5 = 0.75$'],
      ], 'Porcentajes sucesivos: multiplica los factores. Cada cambio se calcula sobre el valor nuevo.'),
      xpHaz('dibujo', 'Un arriendo de 100 sube 10 % y al otro año 20 %. ¿Cuánto subió en total? Estira la barra del final.', { dib: bars, v: { a: 100, b: 110, c: 112, u: 1.8, m: 1, eb: 'sube 10 %', ec: 'sube 20 % más' }, metas: { c: 132 }, alto: 195, manijas: [{ k: 'c', min: 100, max: 150, paso: 2, en: v => [20 + v.c * 1.8, 165], de: x => (x - 20) / 1.8, r: 10 }],
        lee: v => `$\\tfrac{${v.c}}{110} \\approx ${N(v.c / 110)} \\qquad \\text{en total } +${v.c - 100}\\,\\%$`, dice: v => `De 110 a ${v.c} subió ${N(v.c - 110)}. El 20 % de 110 es 22.` }, '$1.1 \\cdot 1.2 = 1.32$: subió 32 %, no 30 %.')],
    ['Devolverse: IVA y precio de antes',
      xpMira('dibujo', 'Tercera idea: para volver al precio de antes, se **divide** entre el factor.', { dib: bars, v: { a: 50, b: 50, u: 3.8, ea: 'sin IVA', eb: 'con IVA del 19 %', fb: 0 }, alto: 135 }, [
        ['Un libro vale 50 sin IVA. Con el 19 % de IVA se multiplica por 1.19.', { fb: 1, b: 59.5 }, '$50 \\cdot 1.19 = 59.5$'],
        ['Si solo conoces el precio con IVA, el camino de vuelta es dividir.', {}, '$59.5 \\div 1.19 = 50$'],
        ['Quitarle el 19 % a 59.5 no sirve: daría 48.2, porque el 19 % era de 50.', { a: 48.2 }, '$59.5 \\cdot 0.81 \\approx 48.2$'],
        ['Igual con un descuento: si algo quedó en 40 tras bajar 20 %, antes valía 40 entre 0.8.', { a: 50, b: 40, ea: 'antes', eb: 'con 20 % menos' }, '$40 \\div 0.8 = 50$'],
      ], 'Adelante se multiplica por el factor; atrás se divide. Nunca se quita el mismo porcentaje.'),
      xpHaz('dibujo', 'Con IVA del 19 %, un mueble vale 178.5 mil. Arrastra su precio sin IVA hasta que cuadre.', { dib: (v, K) => bars({ ...v, b: v.a * 1.19, ea: 'sin IVA', eb: 'con IVA del 19 %' }, K), v: { a: 110, u: 1.1, m: 1 }, metas: { a: 150 }, alto: 135, manijas: [{ k: 'a', min: 100, max: 200, paso: 10, en: v => [20 + v.a * 1.1, 41], de: x => (x - 20) / 1.1, r: 10 }],
        lee: v => `$${v.a} \\cdot 1.19 = ${N(v.a * 1.19)}$`, dice: v => `Sin IVA ${v.a}; con IVA ${N(v.a * 1.19)}. Debe dar 178.5.` }, '$178.5 \\div 1.19 = 150$ mil.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con un descuento del 25 %, un celular quedó en 450 mil. Arrastra el precio de antes hasta que cuadre.', { dib: (v, K) => bars({ ...v, b: v.a * 0.75, ea: 'antes', eb: 'con 25 % menos' }, K), v: { a: 450, u: 0.36, m: 1 }, metas: { a: 600 }, alto: 135, manijas: [{ k: 'a', min: 400, max: 800, paso: 25, en: v => [20 + v.a * 0.36, 41], de: x => (x - 20) / 0.36, r: 10 }],
        lee: v => `$${v.a} \\cdot 0.75 = ${N(v.a * 0.75)}$`, dice: v => `Si antes valía ${v.a}, ahora valdría ${N(v.a * 0.75)}.` }, '450 son el 75 %: $450 \\div 0.75 = 600$ mil.')],
  ], 'Un factor por cada cambio, los factores se multiplican, y para devolverse se divide.');
}
;
//#archivo js/explora-pu-co-1.js
// Preuniversitario · pu-co-1 «Principio multiplicativo y árboles» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Árbol de dos niveles: a ramas y, en cada una, b.
  const arbol = (v, K) => {
    const a = v.A, b = Math.round(v.b), y0 = 24, H = 170, cls = ['fa', 'fg', 'ff', 'fo']; let h = K.c(34, 110, 6, 'fk');
    for (let i = 0; i < a; i++) {
      const y = y0 + (i + 0.5) * H / a;
      h += K.f(v.n1, K.l(34, 110, 96, y, 'lm') + K.r(96, y - 12, 62, 24, cls[i], 8) + K.t(127, y + 5, v.e1[i], 's'));
      for (let j = 0; j < b; j++) { const yy = y + (j - (b - 1) / 2) * (H / a / b); h += K.f(v.n2, K.l(158, y, 218, yy, 'lm') + K.r(218, yy - 11, 84, 22, cls[i], 8) + K.t(260, yy + 4, v.e2[j], 's')); }
    }
    return h + K.f(v.n2, K.t(322, 114, a * b, 'b ta'));
  };
  const casa = (xs, y, et) => xs.map((x, i) => ({ x, y, w: 64, et: et[i] }));
  // Cuadrícula a × n: cada casilla, una combinación.
  const cuad = (v, K) => {
    const n = Math.round(v.n), u = Math.min(30, 240 / Math.max(n, 1)); let h = '';
    for (let i = 0; i < 4; i++) for (let j = 0; j < n; j++) h += K.r(70 + j * u + 1, 30 + i * 30 + 1, u - 2, 28, ['fa', 'fg', 'ff', 'fo'][i]);
    return h + ['coco', 'mora', 'uva', 'café'].map((t, i) => K.t(60, 50 + i * 30, t, 's', 'end')).join('') + K.t(70 + n * u / 2, 22, `${n} ${n === 1 ? 'salsa' : 'salsas'}`, 'tg');
  };

  xpLec('pu-co-1', [
    ['El árbol de opciones',
      xpMira('dibujo', 'Empecemos por la idea: cada decisión **abre ramas**.', { dib: arbol, v: { A: 3, b: 2, n1: 0, n2: 0, e1: ['trigo', 'maíz', 'avena'], e2: ['queso', 'huevo'] }, alto: 215 }, [
        ['Vas a pedir un sánduche. Primero eliges el pan.', {}],
        ['Hay tres panes: tres ramas.', { n1: 1 }, '$3$'],
        ['Luego el relleno: queso o huevo. Cada pan se abre en dos.', { n2: 1 }],
        ['Cuenta las puntas: tres panes con dos rellenos cada uno, seis sánduches.', {}, '$3 \\cdot 2 = 6$'],
        ['No hace falta dibujarlo siempre: si se elige esto **y** aquello, se multiplica.', {}, '$m \\cdot n$'],
      ], 'Si una decisión tiene m opciones y la otra n, juntas tienen $m \\cdot n$.'),
      xpHaz('dibujo', 'Una heladería tiene 4 sabores. ¿Cuántas salsas debe haber para que existan 20 helados de un sabor con una salsa?', { dib: cuad, v: { n: 1 }, metas: { n: 5 }, alto: 225, manijas: [{ k: 'n', min: 1, max: 8, paso: 1, et: 'salsas' }],
        lee: v => `$4 \\cdot ${v.n} = ${4 * v.n}$`, dice: v => `Cada casilla es un helado: van ${4 * v.n}.` }, '$4 \\cdot 5 = 20$: con cinco salsas.')],
    ['¿Se suma o se multiplica?',
      xpMira('dibujo', 'Segunda idea: «**y**» multiplica; «**o**» suma.', { dib: (v, K) => {
        const p = (x, y, n, cls) => Array.from({ length: n }, (_, i) => K.c(x + i * 30, y, 11, cls)).join('');
        if (v.m < 0.5) return K.t(40, 40, 'novelas', 's tm', 'start') + p(50, 66, 4, 'fa') + K.t(40, 112, 'cuentos', 's tm', 'start') + p(50, 138, 3, 'fg') + K.f(v.f, K.t(220, 106, '4 + 3 = 7', 'b ta'));
        let h = ''; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) h += K.c(60 + i * 52, 50 + j * 42, 11, 'fa') + K.c(78 + i * 52, 50 + j * 42, 11, 'fg');
        return h + K.f(v.f, K.t(290, 98, '4 · 3 = 12', 'ta'));
      }, v: { m: 0, f: 0 }, alto: 175 }, [
        ['En un estante hay 4 novelas y 3 libros de cuentos.', {}],
        ['Si te llevas **uno**, novela o cuento, hay 4 más 3: siete maneras.', { f: 1 }, '$4 + 3 = 7$'],
        ['Si te llevas una novela **y** un libro de cuentos, cada novela va con cada uno de los 3.', { m: 1, f: 0 }],
        ['Son 4 por 3: doce parejas.', { f: 1 }, '$4 \\cdot 3 = 12$'],
        ['Pregúntate: ¿hago las dos cosas, o solo una de ellas?', {}],
      ], 'Una cosa **o** la otra: se suma. Una cosa **y** después la otra: se multiplica.'),
      xpHaz('fichas', 'Lleva cada situación a su cuenta. Hay 5 camisetas, 3 gorras y 2 lápices.', { slots: [{ x: 88, y: 72, w: 156, h: 100, n: 3, et: 'se suma', ey: -56 }, { x: 252, y: 72, w: 156, h: 100, n: 3, et: 'se multiplica', ey: -56 }], fichas: ['gorra o lápiz', 'gorra y lápiz', 'una sola cosa', 'de cada una'], meta: [['gorra o lápiz', 'una sola cosa'], ['gorra y lápiz', 'de cada una']], alto: 126, pista: '¿Se hacen las dos cosas o solo una?' }, 'Elegir una sola: $3 + 2$ o $5 + 3 + 2$. Elegir de cada una: $3 \\cdot 2$ o $5 \\cdot 3 \\cdot 2$.')],
    ['Casilla por casilla',
      xpMira('fichas', 'Tercera idea: dibuja **casillas** y escribe en cada una cuántas opciones quedan.', { slots: casa([130, 210], 100, ['decenas', 'unidades']), fichas: ['9', '9', '10'], alto: 150, fondo: (K, v) => K.t(170, 34, v.p || '', 'ta') }, [
        ['¿Cuántos números de dos cifras distintas hay? Dos casillas: decenas y unidades.', {}],
        ['Se empieza por la casilla más exigente: las decenas no pueden ser 0. Quedan 9 opciones.', { pon: { 0: '9' }, v: { p: '1, 2, 3, 4, 5, 6, 7, 8, 9' } }],
        ['Para las unidades sí sirve el 0, pero no la cifra ya usada: 10 menos 1 son 9.', { pon: { 1: '9' }, v: { p: '0 sí; la repetida no' } }],
        ['Se multiplican: 9 por 9, ochenta y un números.', { v: { p: '9 · 9 = 81' } }, '$9 \\cdot 9 = 81$'],
      ], 'Una casilla por decisión, primero la más exigente, y se multiplican.'),
      xpHaz('fichas', 'Una clave lleva dos vocales distintas y después un dígito. Pon cuántas opciones hay en cada casilla y el total.', { slots: casa([46, 126, 206], 60, ['vocal 1', 'vocal 2', 'dígito']).concat([{ x: 296, y: 60, w: 72, et: 'total' }]), fichas: ['5', '4', '10', '200', '250', '9'], meta: ['5', '4', '10', '200'], alto: 106, fondo: K => K.t(86, 65, '·', 'b') + K.t(166, 65, '·', 'b') + K.t(248, 65, '=', 'b'), pista: 'La segunda vocal no puede ser la primera. Los dígitos van del 0 al 9.' }, '$5 \\cdot 4 \\cdot 10 = 200$ claves.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una bandera de 3 franjas se pinta con 4 colores. Franjas vecinas no llevan el mismo color. Cuenta de arriba abajo: ¿cuántas banderas hay?', { slots: [40, 92, 144].map((y, i) => ({ x: 120, y, w: 150, h: 42, et: ['franja 1', 'franja 2', 'franja 3'][i], ex: 112, ey: 5 })).concat([{ x: 120, y: 206, w: 110, et: 'banderas', ex: 96, ey: 5 }]), fichas: ['4', '3', '3', '2', '36', '24', '64'], meta: ['4', '3', '3', '36'], alto: 236, pista: 'La tercera solo debe ser distinta de la segunda: puede repetir el color de la primera.' }, '$4 \\cdot 3 \\cdot 3 = 36$: la tercera solo cuida a su vecina.')],
  ], 'Árboles, «y» que multiplica, «o» que suma, y una casilla por cada decisión.');
}
;
//#archivo js/explora-pu-co-2.js
// Preuniversitario · pu-co-2 «Permutaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  const fila = (n, y, w = 54) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * (w + 10), y, w }));
  const FAC = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];
  // n puestos con las opciones que quedan en cada uno.
  const puestos = (v, K) => {
    const n = Math.round(v.n), w = Math.min(50, 290 / n); let h = '';
    for (let i = 0; i < n; i++) h += K.r(170 + (i - n / 2) * w + 2, 50, w - 4, 46, 'fa', 8) + K.t(170 + (i - n / 2 + 0.5) * w, 80, n - i, 'b ta');
    return h + K.t(170, 32, `${n} personas, ${n} puestos`, 'tm');
  };

  xpLec('pu-co-2', [
    ['Ordenar a todos',
      xpMira('fichas', 'Empecemos por la idea: al ordenar, cada puesto **gasta** una opción.', { slots: fila(4, 90), fichas: ['A', 'B', 'C', 'D'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Cuatro cuadros distintos en una pared. ¿De cuántas maneras se cuelgan en fila?', {}],
        ['Para el primer puesto hay 4 opciones. Ponemos uno.', { pon: { 0: 'C' }, v: { p: '4' } }],
        ['Para el segundo ya solo quedan 3.', { pon: { 1: 'A' }, v: { p: '4 · 3' } }],
        ['Luego 2, y al final 1.', { pon: { 2: 'D', 3: 'B' }, v: { p: '4 · 3 · 2 · 1' } }],
        ['Se multiplican: 24 órdenes. Se escribe 4! y se lee «cuatro factorial».', { v: { p: '4! = 24' } }, '$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$'],
      ], 'Ordenar n cosas distintas: $n! = n \\cdot (n-1) \\cdots 2 \\cdot 1$ maneras.'),
      xpHaz('dibujo', 'Un grupo de amigos puede hacer fila de 5 040 maneras. Arrastra hasta descubrir cuántos son.', { dib: puestos, v: { n: 2 }, metas: { n: 7 }, alto: 170, manijas: [{ k: 'n', min: 2, max: 8, paso: 1, et: 'amigos' }],
        lee: v => `$${v.n}! = ${FAC[v.n]}$`, dice: v => `Con ${v.n} amigos hay ${FAC[v.n]} filas distintas.` }, '$7! = 5\\,040$: son siete.')],
    ['Solo algunos puestos',
      xpMira('fichas', 'Segunda idea: si solo hay **algunos puestos**, se deja de multiplicar antes.', { slots: fila(3, 90, 62), fichas: ['Ana', 'Beto', 'Ciro', 'Dora', 'Eva', 'Fito'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Seis amigos, y en la mesa hay tres cargos: capitán, portero y árbitro.', {}],
        ['Para capitán hay 6 opciones.', { pon: { 0: 'Dora' }, v: { p: '6' } }],
        ['Portero: quedan 5. Árbitro: quedan 4.', { pon: { 1: 'Ana', 2: 'Fito' }, v: { p: '6 · 5 · 4' } }],
        ['Y ahí se para: no hay más puestos. Son 120 repartos.', { v: { p: '6 · 5 · 4 = 120' } }, '$6 \\cdot 5 \\cdot 4 = 120$'],
        ['Aquí el orden importa: Ana de portera y Dora de capitana no es lo mismo que al revés.', { marca: [0, 1] }],
      ], 'Con k puestos se multiplican k números que bajan de uno en uno desde n.'),
      xpHaz('fichas', 'De 7 candidatos se elige presidente y secretario. Pon las opciones de cada cargo y el total.', { slots: [{ x: 70, y: 56, w: 76, et: 'presidente' }, { x: 166, y: 56, w: 76, et: 'secretario' }, { x: 270, y: 56, w: 80, et: 'total' }], fichas: ['7', '6', '42', '49', '21', '2'], meta: ['7', '6', '42'], alto: 104, fondo: K => K.t(118, 61, '·', 'b') + K.t(218, 61, '=', 'b'), pista: 'Quien es presidente no puede ser también secretario.' }, '$7 \\cdot 6 = 42$.')],
    ['Letras repetidas',
      xpMira('fichas', 'Tercera idea: si hay cosas **iguales**, algunos órdenes se ven idénticos.', { slots: fila(3, 88), fichas: ['A₁', 'L', 'A₂', 'A', 'A'], alto: 128, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Las letras de ALA. Si las dos A fueran distintas, habría 3! = 6 órdenes.', { pon: { 0: 'A₁', 1: 'L', 2: 'A₂' }, v: { p: '3! = 6' } }],
        ['Pero al cambiar una A por la otra, la palabra se ve igual.', { saca: [0, 2], pon: { 0: 'A₂', 2: 'A₁' } }],
        ['Cada palabra se contó 2 veces: una por cada orden de las dos A.', { saca: [0, 2], pon: { 0: 'A', 2: 'A' }, v: { p: '6 ÷ 2' } }],
        ['Entonces se divide entre 2!: quedan 3 palabras. ALA, AAL y LAA.', { v: { p: '3! ÷ 2! = 3' } }, '$\\tfrac{3!}{2!} = 3$'],
      ], 'Con repetidas: el factorial del total entre el factorial de cada grupo de iguales.'),
      xpHaz('fichas', '¿Cuántos órdenes distintos tienen las letras de TACTO? Completa la cuenta.', { slots: [{ x: 66, y: 60, w: 80, et: '5!' }, { x: 170, y: 60, w: 80, et: '2!' }, { x: 276, y: 60, w: 80, et: 'órdenes' }], fichas: ['120', '2', '60', '24', '4', '30'], meta: ['120', '2', '60'], alto: 108, fondo: K => K.t(118, 65, '÷', 'b') + K.t(223, 65, '=', 'b'), pista: 'Son cinco letras y solo la T se repite, dos veces.' }, '$\\tfrac{5!}{2!} = \\tfrac{120}{2} = 60$.')],
    ['Los que van juntos',
      xpMira('fichas', 'Cuarta idea: los que van **juntos** se atan y cuentan como uno.', { slots: fila(4, 90), fichas: ['M', 'N', 'P', 'Q'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') + K.f(v.b || 0, K.r(42 + (v.bx || 0) * 64, 62, 128, 56, 'fg', 12)) }, [
        ['Cuatro fichas en fila, con una condición: M y N van pegadas.', {}],
        ['Las atamos en un paquete. Ahora se ordenan 3 cosas: el paquete, P y Q.', { v: { b: 1, bx: 0, p: '3! = 6' }, pon: { 0: 'M', 1: 'N', 2: 'P', 3: 'Q' } }],
        ['Pero dentro del paquete también hay orden: M-N o N-M, 2 maneras.', { saca: [0, 1], pon: { 0: 'N', 1: 'M' }, v: { p: '3! · 2!' } }],
        ['En total, 6 por 2: doce.', { v: { p: '6 · 2 = 12' } }, '$3! \\cdot 2! = 12$'],
      ], 'Ata a los que van juntos, ordena los paquetes y multiplica por los órdenes de adentro.'),
      xpHaz('fichas', 'Cinco libros en fila, y tres son de una saga que va junta. Completa: paquetes, orden adentro y total.', { slots: [{ x: 66, y: 60, w: 80, et: 'paquetes' }, { x: 170, y: 60, w: 80, et: 'adentro' }, { x: 276, y: 60, w: 80, et: 'total' }], fichas: ['6', '6', '36', '120', '24', '12'], meta: ['6', '6', '36'], alto: 108, fondo: K => K.t(118, 65, '·', 'b') + K.t(223, 65, '=', 'b'), pista: 'La saga es un paquete: con los otros dos libros son 3 cosas. Adentro hay 3 tomos.' }, '$3! \\cdot 3! = 6 \\cdot 6 = 36$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Con 1, 3, 4, 6 y 7, sin repetir, se forman números de 3 cifras que terminen en impar. Llena las casillas en orden y el total.', { slots: [{ x: 50, y: 60, w: 70, et: 'última' }, { x: 134, y: 60, w: 70, et: 'primera' }, { x: 218, y: 60, w: 70, et: 'del medio' }, { x: 300, y: 60, w: 70, et: 'total' }], fichas: ['3', '4', '3', '36', '60', '5', '2'], meta: ['3', '4', '3', '36'], alto: 108, fondo: K => K.t(92, 65, '·', 'b') + K.t(176, 65, '·', 'b') + K.t(259, 65, '=', 'b'), pista: 'La última es la exigente: solo 1, 3 o 7.' }, '$3 \\cdot 4 \\cdot 3 = 36$: primero la casilla exigente.')],
  ], 'Factorial, puestos que se agotan, repetidas que se dividen y paquetes que van juntos.');
}
;
//#archivo js/explora-pu-co-3.js
// Preuniversitario · pu-co-3 «Combinaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  const L = 'ABCDEF', par = n => ({ f: n, c: n, filas: [...L].slice(0, n), cols: [...L].slice(0, n), izq: 30, cw: 46, ch: 36, celda: (i, r, c) => (r === c ? '' : L[r] + L[c]), hueco: (i, r, c) => r === c });
  // Las seis ordenaciones de un mismo grupo de tres.
  const seis = (v, K) => {
    const P = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']; let h = '';
    P.forEach((t, i) => { const c = i % 3, r = Math.floor(i / 3), x = K.lerp(62 + c * 108, 170, v.j), y = K.lerp(56 + r * 54, 84, v.j); h += K.f(1 - v.j * 0.6, K.r(x - 42, y - 18, 84, 36, 'fa', 9)) + K.f(1 - v.j, K.t(x, y + 6, t, 'b')); });
    return h + K.f(v.j, K.t(170, 90, '{A, B, C}', 'b ta')) + K.f(v.f, K.t(170, 152, v.p, 'b'));
  };
  const dej = (v, K) => {
    let h = ''; for (let i = 0; i < 9; i++) { const e = i < Math.round(v.k); h += K.c(34 + i * 34, 70, 14, e ? 'fA' : 'fc') + K.t(34 + i * 34, 75, 'ABCDEFGHI'[i], e ? 'tc' : 'tm'); }
    return h + K.t(170, 26, v.p, 'ta') + K.f(v.f, K.t(170, 122, 'los que van se eligen · los que no, también', 's tm'));
  };

  xpLec('pu-co-3', [
    ['El orden no importa',
      xpMira('rejilla', 'Empecemos por la idea: una pareja es la misma **se diga como se diga**.', par(4), [
        ['Cuatro amigos, A, B, C y D. Se eligen dos. La fila es el primero; la columna, el segundo.', {}],
        ['Hay 4 por 3: doce casillas. Pero AB y BA son la misma pareja.', { luz: [1, 4] }, '$4 \\cdot 3 = 12$'],
        ['Tachamos las repetidas: las de abajo de la diagonal.', { x: [4, 8, 9, 12, 13, 14] }],
        ['Quedan la mitad: seis parejas. Se dividió entre 2 porque dos personas se ordenan de 2 maneras.', { on: [1, 2, 3, 6, 7, 11] }, '$\\tfrac{4 \\cdot 3}{2} = 6$'],
      ], 'Si el orden no importa, es una combinación: se cuentan los órdenes y se quitan los repetidos.'),
      xpHaz('rejilla', 'Seis frutas, A a F: un jugo lleva dos, pero A y B no se mezclan. Marca cada pareja una sola vez.', { ...par(6), cw: 42, ch: 32, hueco: (i, r, c) => r === c || r + c === 1, cumple: c => { for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (i + j > 1 && c[i * 6 + j] + c[j * 6 + i] !== 1) return false; return true; }, sol: [2, 3, 4, 5, 8, 9, 10, 11, 15, 16, 17, 22, 23, 29],
        lee: c => `$${c.filter(x => x).length} \\text{ marcadas}$`, dice: c => { for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (c[i * 6 + j] + c[j * 6 + i] > 1) return `${L[i]}${L[j]} y ${L[j]}${L[i]} son el mismo jugo: deja una.`; return 'Cada pareja, una sola vez. Puedes arrastrar.'; } }, '$\\tfrac{6 \\cdot 5}{2} - 1 = 14$ jugos: se quita el de A con B.')],
    ['Dividir entre los órdenes',
      xpMira('dibujo', 'Segunda idea: con **tres** elegidos, cada grupo se repite 6 veces.', { dib: seis, v: { j: 0, f: 0, p: '' }, alto: 170 }, [
        ['De siete personas se eligen tres. Si el orden contara, serían 7 por 6 por 5: 210.', {}, '$7 \\cdot 6 \\cdot 5 = 210$'],
        ['Pero estas seis filas tienen a los mismos tres: A, B y C.', {}, '$3! = 6$'],
        ['Son un solo grupo. Pasa igual con cada trío.', { j: 1 }],
        ['Por eso se divide: 210 entre 6 son 35 grupos.', { f: 1, p: '210 ÷ 6 = 35' }, '$\\tfrac{7 \\cdot 6 \\cdot 5}{3 \\cdot 2 \\cdot 1} = 35$'],
        ['Arriba, tantos factores como elegidos; abajo, el factorial de los elegidos.', {}, '$\\binom{7}{3} = 35$'],
      ], 'Combinaciones de n en k: $\\binom{n}{k} = \\tfrac{n (n-1) \\cdots}{k!}$, con k factores arriba.'),
      xpHaz('fichas', 'De 8 canciones se eligen 3 para un viaje, sin orden. Completa la cuenta.', { slots: [{ x: 66, y: 56, w: 84, et: '8 · 7 · 6' }, { x: 170, y: 56, w: 80, et: '3!' }, { x: 276, y: 56, w: 80, et: 'grupos' }], fichas: ['336', '6', '56', '3', '112', '24'], meta: ['336', '6', '56'], alto: 104, fondo: K => K.t(119, 61, '÷', 'b') + K.t(223, 61, '=', 'b'), pista: 'Tres canciones se ordenan de 3 · 2 · 1 maneras.' }, '$\\tfrac{336}{6} = 56$ grupos.')],
    ['Elegir es también dejar',
      xpMira('dibujo', 'Tercera idea: elegir a los que van es elegir a los que **se quedan**.', { dib: dej, v: { k: 2, p: 'van 2, se quedan 7', f: 0 }, alto: 140 }, [
        ['De nueve personas van dos a un paseo: 36 maneras.', {}, '$\\binom92 = \\tfrac{9 \\cdot 8}{2} = 36$'],
        ['¿Y si van siete? La cuenta directa es larga.', { k: 7, p: 'van 7, se quedan 2' }],
        ['Pero cada grupo de siete que va deja a dos por fuera. Basta contar quiénes se quedan.', { f: 1 }],
        ['Se quedan dos: otra vez 36.', {}, '$\\binom97 = \\binom92 = 36$'],
        ['Y elegir a los nueve, o a ninguno, se puede de una sola manera.', { k: 9, p: 'van todos' }, '$\\binom99 = \\binom90 = 1$'],
      ], '$\\binom{n}{k} = \\binom{n}{n-k}$: cuenta el grupo más pequeño, el que va o el que se queda.'),
      xpHaz('fichas', 'De 10 jugadores van 8 a la cancha. Cuenta a los que se quedan: ¿cuántos son y cuántos grupos hay?', { slots: [{ x: 100, y: 56, w: 100, et: 'se quedan' }, { x: 240, y: 56, w: 100, et: 'grupos' }], fichas: ['2', '45', '8', '90', '80'], meta: ['2', '45'], alto: 104, pista: 'Se quedan 2 de 10: diez por nueve, entre dos.' }, '$\\binom{10}{8} = \\binom{10}{2} = \\tfrac{10 \\cdot 9}{2} = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 5 libros y 4 revistas te llevas 2 libros y 2 revistas. Completa: maneras de elegir libros, revistas y el total.', { slots: [{ x: 60, y: 56, w: 80, et: 'libros' }, { x: 166, y: 56, w: 80, et: 'revistas' }, { x: 276, y: 56, w: 80, et: 'total' }], fichas: ['10', '6', '60', '16', '20', '12'], meta: ['10', '6', '60'], alto: 104, fondo: K => K.t(113, 61, '·', 'b') + K.t(221, 61, '=', 'b'), pista: 'Libros y revistas: se hacen las dos cosas, así que se multiplica.' }, '$\\binom52 \\cdot \\binom42 = 10 \\cdot 6 = 60$.')],
  ], 'El orden no importa: se divide entre los órdenes, y elegir es también dejar.');
}
;
//#archivo js/explora-pu-co-4.js
// Preuniversitario · pu-co-4 «Conteo por casos y complemento» (Explora). Los ejemplos no son los de los ejercicios.
{
  const num = (n, c) => ({ f: Math.ceil(n / c), c, cw: 33, ch: 30, celda: i => (i < n ? String(i + 1) : ''), hueco: i => i >= n });
  const mult = (n, k) => Array.from({ length: n }, (_, i) => i).filter(i => (i + 1) % k === 0);
  const D10 = { f: 10, c: 10, cw: 30, ch: 24, celda: (i, r, c) => `${r}${c}` };
  const dados = { f: 6, c: 6, filas: ['1', '2', '3', '4', '5', '6'], cols: ['1', '2', '3', '4', '5', '6'], izq: 30, cw: 42, ch: 32 };
  const cifras = (dec, uni) => ({ f: dec.length, c: uni.length, filas: dec.map(String), cols: uni.map(String), izq: 40, cw: 60, ch: 38, celda: (i, r, c) => `${dec[r]}${uni[c]}` });
  const con7 = Array.from({ length: 100 }, (_, i) => i).filter(i => Math.floor(i / 10) === 7 || i % 10 === 7);

  xpLec('pu-co-4', [
    ['Sumar sin contar doble',
      xpMira('rejilla', 'Empecemos por la idea: al juntar dos grupos, lo que está **en los dos** se cuenta una vez.', num(30, 10), [
        ['Los números del 1 al 30. ¿Cuántos son múltiplos de 2 o de 5?', {}],
        ['Múltiplos de 2: hay 15.', { on: mult(30, 2) }, '$30 \\div 2 = 15$'],
        ['Múltiplos de 5: hay 6. Mira cuáles no estaban ya pintados.', { luz: mult(30, 5) }, '$30 \\div 5 = 6$'],
        ['El 10, el 20 y el 30 están en los dos grupos: si sumamos 15 y 6, los contamos doble.', { luz: [9, 19, 29] }],
        ['Se quitan una vez: 15 más 6 menos 3, dieciocho números.', { on: mult(30, 5) }, '$15 + 6 - 3 = 18$'],
      ], 'Uno u otro: suma los dos grupos y resta los que están en ambos.'),
      xpHaz('rejilla', 'Pinta los múltiplos de 3 o de 7, del 1 al 30.', { ...num(30, 10), meta: [...new Set([...mult(30, 3), ...mult(30, 7)])], lee: c => `$${c.filter(x => x).length} \\text{ pintados}$`, dice: c => (c[20] ? 'El 21 está en los dos grupos, pero es una sola casilla.' : 'Pinta los de 3 y los de 7.') }, '$10 + 4 - 1 = 13$: el 21 está en los dos y se cuenta una vez.')],
    ['Contar lo contrario',
      xpMira('rejilla', 'Segunda idea: «al menos uno» se cuenta mejor **al revés**.', D10, [
        ['Todas las claves de dos dígitos, del 00 al 99: son cien.', {}, '$10 \\cdot 10 = 100$'],
        ['¿Cuántas tienen al menos un 7? Puede estar adelante, atrás o en los dos lados.', { on: con7 }],
        ['Es más fácil contar las que **no** tienen 7: 9 opciones en cada puesto.', {}, '$9 \\cdot 9 = 81$'],
        ['El resto sí tiene: 100 menos 81 son 19.', {}, '$100 - 81 = 19$'],
        ['No son 20: la clave 77 está en la fila y en la columna, pero es una sola.', { luz: [77] }],
      ], 'Al menos uno = todos − ninguno.'),
      xpHaz('rejilla', 'Se lanzan dos dados (fila y columna). Pinta los resultados en que **al menos uno** es 5.', { ...dados, meta: Array.from({ length: 36 }, (_, i) => i).filter(i => Math.floor(i / 6) === 4 || i % 6 === 4), lee: c => `$${c.filter(x => x).length} \\text{ de } 36$`, dice: () => 'La fila dice el primer dado; la columna, el segundo.' }, '$36 - 5 \\cdot 5 = 11$ resultados.')],
    ['Separar en casos',
      xpMira('rejilla', 'Tercera idea: si una condición **cambia** las opciones, se separan casos.', cifras([1, 2, 3], [0, 1, 2, 3]), [
        ['Con 0, 1, 2 y 3 se forman números de dos cifras distintas. ¿Cuántos son pares?', {}],
        ['Primero, los que repiten cifra no sirven: 11, 22 y 33.', { x: [1, 6, 11] }],
        ['Caso 1: terminan en 0. Adelante puede ir 1, 2 o 3: son 3.', { on: [0, 4, 8] }, '$3$'],
        ['Caso 2: terminan en 2. Adelante no va el 0 ni el 2: quedan 1 y 3, son 2.', { on: [2, 10] }, '$2$'],
        ['Los casos no se cruzan, así que se suman: cinco números.', {}, '$3 + 2 = 5$'],
      ], 'Divide en casos que no se crucen, cuenta cada uno y suma.'),
      xpHaz('rejilla', 'Con 0, 2, 4 y 5 se forman números de dos cifras distintas. Pinta los que son pares.', { ...cifras([2, 4, 5], [0, 2, 4, 5]), meta: [0, 4, 8, 5, 9, 2, 10], lee: c => `$${c.filter(x => x).length} \\text{ números}$`, dice: () => 'Mira por columnas: los que terminan en 0, en 2 y en 4.' }, 'Terminan en 0: 3. En 2: 2. En 4: 2. En total $3 + 2 + 2 = 7$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 30 familias, 18 tienen perro, 14 tienen gato y 5 no tienen ninguno. Completa: con mascota, suma y los que tienen ambos.', { slots: [{ x: 62, y: 60, w: 92, et: 'con alguna' }, { x: 170, y: 60, w: 92, et: 'perro + gato' }, { x: 278, y: 60, w: 92, et: 'ambos' }], fichas: ['25', '32', '7', '30', '2', '12'], meta: ['25', '32', '7'], alto: 108, pista: 'Con alguna: 30 menos las que no tienen. Lo que sobra en la suma se contó doble.' }, '$30 - 5 = 25$ y $18 + 14 = 32$: sobran $32 - 25 = 7$, las que tienen los dos.')],
  ], 'Sumar sin contar doble, contar lo contrario y separar en casos que no se crucen.');
}
;
//#archivo js/explora-pu-co-5.js
// Preuniversitario · pu-co-5 «Contar figuras y caminos» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Cuadrícula f × c con un cuadrado de lado s resaltado que se puede correr.
  const cuad = (v, K) => {
    const u = 40, x = 170 - v.c * u / 2, y = 20, s = Math.round(v.s); let h = '';
    for (let i = 0; i < v.f; i++) for (let j = 0; j < v.c; j++) h += K.r(x + j * u, y + i * u, u, u, 'fc', 0);
    return h + K.f(v.ver ?? 1, K.r(x + v.px * u + 2, y + v.py * u + 2, s * u - 4, s * u - 4, 'fa gr', 4)) + K.t(170, y + v.f * u + 22, v.p || '', 'ta');
  };
  const diag = (v, K) => {
    const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 84, 90 + i * 360 / n)); let h = '';
    for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (!(i === 0 && j === n - 1)) h += K.f(i === 0 ? v.una : v.todas, K.l(...P[i], ...P[j], i === 0 ? 'la' : 'lg'));
    return h + K.p(P, 'fn') + P.map((p, i) => K.c(...p, i ? 4 : 6, i ? 'fk' : 'fA')).join('');
  };
  // Esquinas de una cuadrícula de calles con el número de caminos.
  const X = i => 76 + i * 62, Y = j => 176 - j * 48, calles = (a, b) => K => { let h = ''; for (let i = 0; i <= a; i++) h += K.l(X(i), Y(0), X(i), Y(b), 'lm'); for (let j = 0; j <= b; j++) h += K.l(X(0), Y(j), X(a), Y(j), 'lm'); return h; };
  const esq = (a, b) => { const s = []; for (let j = 0; j <= b; j++) for (let i = 0; i <= a; i++) s.push({ x: X(i), y: Y(j), w: 42, h: 34 }); return s; };

  xpLec('pu-co-5', [
    ['Contar por tamaños',
      xpMira('dibujo', 'Empecemos por la idea: las figuras se cuentan **por tamaños**, para no olvidar ninguna.', { dib: cuad, v: { f: 3, c: 3, s: 1, px: 0, py: 0, ver: 0, p: '' }, alto: 175 }, [
        ['En una cuadrícula de 3 por 3 hay más cuadrados de los que se ven.', {}],
        ['Los pequeños, de lado 1: nueve.', { ver: 1, px: 2, py: 2, p: 'lado 1: 9' }, '$9$'],
        ['Los de lado 2: la esquina puede estar en 2 lugares a lo ancho y 2 a lo alto. Son cuatro.', { s: 2, px: 1, py: 1, p: 'lado 2: 4' }, '$2 \\cdot 2 = 4$'],
        ['Y el grande, de lado 3: uno.', { s: 3, px: 0, py: 0, p: 'lado 3: 1' }, '$1$'],
        ['En total 9 más 4 más 1: catorce.', {}, '$9 + 4 + 1 = 14$'],
        ['Con triángulos pegados en abanico es igual: los de un pedazo, los de dos, los de tres…', {}],
      ], 'Cuenta por tamaños: para cada uno, en cuántos lugares cabe. Luego suma.'),
      xpHaz('fichas', 'Una cuadrícula de 2 filas por 4 columnas: ¿cuántos cuadrados hay de cada tamaño?', { slots: [{ x: 66, y: 140, w: 84, et: 'lado 1' }, { x: 170, y: 140, w: 84, et: 'lado 2' }, { x: 274, y: 140, w: 84, et: 'en total' }], fichas: ['8', '3', '11', '4', '2', '12'], meta: ['8', '3', '11'], alto: 186, fondo: K => { let h = ''; for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) h += K.r(94 + j * 38, 18 + i * 38, 38, 38, 'fc', 0); return h; }, pista: 'Un cuadrado de lado 2 ocupa las dos filas: solo se corre a lo ancho.' }, 'Lado 1: 8. Lado 2: cabe en 3 lugares. Total 11.')],
    ['Diagonales y parejas',
      xpMira('dibujo', 'Segunda idea: cada diagonal es una **pareja** de vértices que no son vecinos.', { dib: diag, v: { n: 6, una: 0, todas: 0 }, alto: 195 }, [
        ['Un hexágono. Desde el vértice marcado, ¿cuántas diagonales salen?', {}],
        ['A él mismo no va, y sus dos vecinos ya están unidos por lados. Quedan 6 menos 3: tres.', { una: 1 }, '$6 - 3 = 3$'],
        ['De cada uno de los 6 vértices salen 3: serían 18.', { todas: 1 }, '$6 \\cdot 3 = 18$'],
        ['Pero cada diagonal tiene dos puntas y se contó dos veces. Son 9.', {}, '$\\tfrac{6 \\cdot 3}{2} = 9$'],
      ], 'Un polígono de n lados tiene $\\tfrac{n (n - 3)}{2}$ diagonales.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que haya exactamente 20 diagonales.', { dib: diag, v: { n: 4, una: 1, todas: 1 }, metas: { n: 8 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 11, paso: 1, et: 'lados' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `De cada vértice salen ${v.n - 3}.` }, '$\\tfrac{8 \\cdot 5}{2} = 20$: un octágono.')],
    ['Caminos que se suman',
      xpMira('fichas', 'Tercera idea: a cada esquina se llega **desde la izquierda o desde abajo**.', { slots: esq(2, 2), fichas: ['1', '1', '1', '1', '2', '3', '3', '6'], alto: 206, fondo: calles(2, 2), fijas: { 0: 'A' } }, [
        ['Desde A solo se camina al este o al norte. ¿De cuántas maneras se llega a cada esquina?', {}],
        ['Por el borde de abajo y por el de la izquierda hay un solo camino: derecho.', { pon: { 1: '1', 2: '1', 3: '1', 6: '1' } }],
        ['A la esquina del centro se llega desde la izquierda o desde abajo: 1 más 1, dos.', { pon: { 4: '2' }, marca: [1, 3] }, '$1 + 1 = 2$'],
        ['Cada esquina suma la de su izquierda y la de abajo: 1 más 2 son 3.', { pon: { 5: '3', 7: '3' } }, '$1 + 2 = 3$'],
        ['Y la última, 3 más 3: seis caminos.', { pon: { 8: '6' } }, '$3 + 3 = 6$'],
        ['Si una esquina estuviera cerrada, por ella no llegaría nadie: aportaría 0 a las siguientes.', { marca: [4] }],
        ['Un camino también es una palabra, como EENN o ENEN: siempre dos E y dos N, en otro orden.', {}],
      ], 'Los caminos a una esquina son los de su izquierda más los de abajo.'),
      xpHaz('fichas', 'Completa los caminos que faltan hasta la esquina de arriba a la derecha.', { slots: esq(3, 3).map(s => ({ ...s, y: s.y - 2 })), fichas: ['10', '10', '20', '9', '12', '6'], fijas: { 0: 'A', 1: '1', 2: '1', 3: '1', 4: '1', 5: '2', 6: '3', 7: '4', 8: '1', 9: '3', 10: '6', 12: '1', 13: '4' }, meta: ['A', '1', '1', '1', '1', '2', '3', '4', '1', '3', '6', '10', '1', '4', '10', '20'], alto: 206, fondo: calles(3, 3), pista: 'Suma el número de la izquierda y el de abajo.' }, '$4 + 6 = 10$ dos veces, y $10 + 10 = 20$ caminos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una tira tiene 5 cuadritos en fila. Cuenta los rectángulos: ¿cuántos hay de cada largo y en total?', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 34 + i * 54, y: 96, w: 48, et: `largo ${i + 1}` })).concat([{ x: 308, y: 96, w: 56, et: 'total' }]), fichas: ['5', '4', '3', '2', '1', '15', '10', '6'], meta: ['5', '4', '3', '2', '1', '15'], alto: 142, fondo: K => Array.from({ length: 5 }, (_, i) => K.r(80 + i * 36, 18, 36, 36, 'fc', 0)).join(''), pista: 'Un rectángulo de largo 2 puede empezar en 4 lugares.' }, '$5 + 4 + 3 + 2 + 1 = 15$ rectángulos.')],
  ], 'Contar por tamaños, parejas que no se cuentan doble y caminos que se suman.');
}
;
//#archivo js/explora-pu-es-1.js
// Preuniversitario · pu-es-1 «Rejillas y caminos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const U = 32, X = i => 26 + i * U, Y = j => 186 - j * U, COL = 9, FIL = 5;
  const calles = K => { let h = ''; for (let i = 0; i <= COL; i++) h += K.l(X(i), Y(0), X(i), Y(FIL), 'ls'); for (let j = 0; j <= FIL; j++) h += K.l(X(0), Y(j), X(COL), Y(j), 'ls'); return h; };
  const rosa = K => K.t(326, 22, 'N', 's tm') + K.ar(326, 44, 326, 28, 'lm');
  const pto = (K, x, y, s, cls = 'fF', dx = -12, dy = 16) => K.c(X(x), Y(y), 6, cls) + K.t(X(x) + dx, Y(y) + dy, s, '');
  const manija = { k: ['x', 'y'], min: [0, 0], max: [COL, FIL], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 26) / U, (186 - y) / U] };
  // De A a B primero al este y luego al norte; t de 0 a 1 recorre el camino.
  const camino = (v, K) => {
    const dx = v.bx - v.ax, dy = v.by - v.ay, n = Math.abs(dx) + Math.abs(dy), k = v.t * n, e = Math.min(k, Math.abs(dx)), m = k - e;
    const P = v.otro ? [[v.ax, v.ay], [v.ax, v.ay + Math.sign(dy) * Math.min(k, Math.abs(dy))], [v.ax + Math.sign(dx) * Math.max(0, k - Math.abs(dy)), v.ay + Math.sign(dy) * Math.min(k, Math.abs(dy))]] : [[v.ax, v.ay], [v.ax + Math.sign(dx) * e, v.ay], [v.ax + Math.sign(dx) * e, v.ay + Math.sign(dy) * m]];
    return calles(K) + rosa(K) + K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr') + K.f(v.rec ?? 0, K.l(X(v.ax), Y(v.ay), X(v.bx), Y(v.by), 'lg gr')) + pto(K, v.ax, v.ay, 'A') + pto(K, v.bx, v.by, 'B', 'fG', 12, -8);
  };
  // Recorrido por tramos; p = cuántas cuadras lleva.
  const DIR = { N: [0, 1], S: [0, -1], E: [1, 0], O: [-1, 0] };
  const ruta = (K, x, y, ms, p) => { const P = [[x, y]]; for (const [d, n] of ms) { const k = Math.min(n, Math.max(0, p)); x += DIR[d][0] * k; y += DIR[d][1] * k; p -= n; P.push([x, y]); } return K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr') + K.c(X(x), Y(y), 7, 'fA'); };
  const MS = [['N', 4], ['E', 5], ['S', 1], ['O', 2]];

  xpLec('pu-es-1', [
    ['Caminar por las calles',
      xpMira('dibujo', 'Empecemos por la idea: en una ciudad no se vuela, se camina **por las calles**.', { dib: camino, v: { ax: 1, ay: 1, bx: 6, by: 4, t: 0, otro: 0 }, alto: 206 }, [
        ['De A a B. Solo se puede caminar por las calles de la rejilla.', {}],
        ['Cinco cuadras al este y tres al norte: ocho cuadras.', { t: 1 }, '$5 + 3 = 8$'],
        ['Por otro camino, primero al norte y luego al este, también son ocho.', { otro: 1 }, '$3 + 5 = 8$'],
        ['Mientras no te devuelvas, todos los caminos miden igual: lo que separa a lo ancho más lo que separa a lo alto.', {}],
        ['Con B más cerca, tres y dos: cinco cuadras.', { bx: 4, by: 3 }, '$3 + 2 = 5$'],
      ], 'Distancia por calles = cuadras a lo ancho + cuadras a lo alto.'),
      xpHaz('dibujo', 'Lleva el punto a una esquina que esté a 6 cuadras de A. Hay varias: encuentra una.', { dib: (v, K) => calles(K) + pto(K, 3, 1, 'A') + K.pl([[X(3), Y(1)], [X(v.x), Y(1)], [X(v.x), Y(v.y)]], 'la gr'), v: { x: 4, y: 2 }, cumple: v => Math.abs(v.x - 3) + Math.abs(v.y - 1) === 6, sol: { x: 6, y: 4 }, alto: 206, manijas: [manija],
        lee: v => `$${Math.abs(v.x - 3)} + ${Math.abs(v.y - 1)} = ${Math.abs(v.x - 3) + Math.abs(v.y - 1)}$`, dice: v => `${Math.abs(v.x - 3)} a lo ancho y ${Math.abs(v.y - 1)} a lo alto.` }, 'Sirve cualquier esquina cuyas cuadras a lo ancho y a lo alto sumen 6.')],
    ['Juntar los movimientos',
      xpMira('dibujo', 'Segunda idea: lo que importa es **dónde terminas**, no las vueltas que diste.', { dib: (v, K) => calles(K) + rosa(K) + ruta(K, 2, 0, MS, v.p) + pto(K, 2, 0, 'A') + K.f(v.n, K.l(X(2), Y(0), X(5), Y(0), 'lg gr') + K.l(X(5), Y(0), X(5), Y(3), 'lg gr')), v: { p: 0, n: 0 }, alto: 206 }, [
        ['Desde A: cuatro cuadras al norte y cinco al este.', { p: 9 }],
        ['Luego una al sur y dos al oeste.', { p: 12 }],
        ['Caminó 12 cuadras en total.', {}, '$4 + 5 + 1 + 2 = 12$'],
        ['Norte y sur se restan: 4 menos 1, tres al norte. Este y oeste también: 5 menos 2, tres al este.', { n: 1 }, '$4 - 1 = 3 \\quad 5 - 2 = 3$'],
        ['Así que terminó a 6 cuadras de A, aunque caminó 12.', {}, '$3 + 3 = 6$'],
      ], 'Norte contra sur, este contra oeste: se restan. Lo que queda dice dónde terminas.'),
      xpHaz('dibujo', 'Desde A: 4 al este, 3 al norte, 6 al oeste y 1 al sur. Lleva el punto a donde se termina.', { dib: (v, K) => calles(K) + rosa(K) + pto(K, 4, 2, 'A'), v: { x: 5, y: 2 }, metas: { x: 2, y: 4 }, alto: 206, manijas: [manija],
        lee: v => `$${Math.abs(v.x - 4)} \\text{ al ${v.x >= 4 ? 'este' : 'oeste'}}, \\; ${Math.abs(v.y - 2)} \\text{ al ${v.y >= 2 ? 'norte' : 'sur'}}$`, dice: () => 'Junta primero este con oeste, y luego norte con sur.' }, '6 al oeste y 4 al este dejan 2 al oeste; 3 al norte y 1 al sur dejan 2 al norte.')],
    ['En línea recta',
      xpMira('dibujo', 'Tercera idea: la **línea recta** es el atajo, y se mide con Pitágoras.', { dib: camino, v: { ax: 1, ay: 1, bx: 5, by: 4, t: 1, otro: 0, rec: 0 }, alto: 206 }, [
        ['De A a B hay 4 cuadras al este y 3 al norte: 7 por las calles.', {}, '$4 + 3 = 7$'],
        ['Un pájaro va derecho: su camino es la hipotenusa de un triángulo rectángulo.', { rec: 1 }],
        ['Nueve más dieciséis son 25, y su raíz es 5.', {}, '$\\sqrt{4^2 + 3^2} = 5$'],
        ['En línea recta son 5 cuadras: menos que las 7 de caminar.', {}, '$5 < 7$'],
      ], 'Por calles se suman los lados; en línea recta se usa $\\sqrt{a^2 + b^2}$.'),
      xpHaz('fichas', 'De la plaza al hospital hay 12 cuadras al este y 5 al norte. Pon la distancia por calles y en línea recta.', { slots: [{ x: 100, y: 56, w: 100, et: 'por calles' }, { x: 240, y: 56, w: 100, et: 'línea recta' }], fichas: ['17', '13', '7', '60', '15'], meta: ['17', '13'], alto: 104, pista: 'Por calles se suma; en línea recta, 144 más 25 y la raíz.' }, '$12 + 5 = 17$ y $\\sqrt{144 + 25} = \\sqrt{169} = 13$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque queda a 4 cuadras de la estación M y a 4 de la estación N, al norte de ellas. Ubícalo.', { dib: (v, K) => calles(K) + pto(K, 1, 1, 'M', 'fF', 0, 20) + pto(K, 7, 1, 'N', 'fF', 0, 20), v: { x: 2, y: 4 }, cumple: v => Math.abs(v.x - 1) + Math.abs(v.y - 1) === 4 && Math.abs(v.x - 7) + Math.abs(v.y - 1) === 4 && v.y > 1, sol: { x: 4, y: 2 }, alto: 210, manijas: [manija],
        lee: v => `$M: ${Math.abs(v.x - 1) + Math.abs(v.y - 1)} \\qquad N: ${Math.abs(v.x - 7) + Math.abs(v.y - 1)}$`, dice: () => 'Las dos distancias deben dar 4. ¿Dónde está igual de lejos de M y de N?' }, 'Está a mitad de camino: 3 cuadras a lo ancho de cada una y 1 al norte, $3 + 1 = 4$.')],
  ], 'Por calles se suma, los movimientos contrarios se restan, y en línea recta manda Pitágoras.');
}
;
//#archivo js/explora-pu-es-2.js
// Preuniversitario · pu-es-2 «Vistas y cubos» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Construcción: h[fila][columna] (fila 0 = la de adelante). Se dibuja de atrás hacia adelante.
  const pila = (K, o, u, h, sube = 1, num = 0) => {
    let s = '';
    for (let r = h.length - 1; r >= 0; r--) for (let c = h[0].length - 1; c >= 0; c--) {
      const n = Math.round(h[r][c] * sube);
      for (let z = 0; z < n; z++) s += K.caja(K.iso(o, u, c, r, z), u, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false);
      if (num && n) { const p = K.iso(o, u, c + 0.5, r + 0.5, n); s += K.t(p[0], p[1] + 5, h[r][c], 's'); }
    }
    return s;
  };
  const H = [[1, 1, 2], [1, 3, 3]];
  // Vista plana: columnas de cuadros.
  const vista = (K, x, y, a, et) => a.map((n, i) => Array.from({ length: n }, (_, z) => K.r(x + i * 24, y - (z + 1) * 24, 22, 22, 'fg')).join('')).join('') + K.t(x + a.length * 12, y + 17, et, 's tm');
  const max = a => Math.max(...a);
  const cubo = (v, K) => {
    const n = 7, u = 15, o = [170, 196], I = (x, y, z) => K.iso(o, u, x, y, z), q = (P, cl) => K.p(P, cl);
    let h = K.caja(o, u, n, n, n, 'fa');
    const top = (x, y, cl) => q([I(x, y, n), I(x + 1, y, n), I(x + 1, y + 1, n), I(x, y + 1, n)], cl), fr = (x, z, cl) => q([I(x, 0, z), I(x + 1, 0, z), I(x + 1, 0, z + 1), I(x, 0, z + 1)], cl), iz = (y, z, cl) => q([I(0, y, z), I(0, y + 1, z), I(0, y + 1, z + 1), I(0, y, z + 1)], cl);
    let e = '', a = '', c = '';
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const b = (i === 0 || i === n - 1) + (j === 0 || j === n - 1), k = b === 2 ? 'e' : b === 1 ? 'a' : 'c', cl = { e: 'fF', a: 'fG', c: 'fo' }[k], s = top(i, j, cl) + fr(i, j, cl) + iz(i, j, cl);
      if (k === 'e') e += s; else if (k === 'a') a += s; else c += s;
    }
    return h + K.f(v.c, c) + K.f(v.a, a) + K.f(v.e, e);
  };

  xpLec('pu-es-2', [
    ['Contar por torres',
      xpMira('dibujo', 'Empecemos por la idea: para no perder cubos escondidos, cuenta **por torres**.', { dib: (v, K) => pila(K, [140, 190], 34, H, v.s, v.n), v: { s: 1, n: 0 }, alto: 205 }, [
        ['Esta construcción tiene cubos que no se ven, debajo y detrás de otros.', {}],
        ['Mírala como torres. Cada torre tiene una altura: se escribe arriba.', { n: 1 }],
        ['La fila de adelante tiene torres de 1, 1 y 2: cuatro cubos.', {}, '$1 + 1 + 2 = 4$'],
        ['La de atrás, de 1, 3 y 3: siete cubos.', {}, '$1 + 3 + 3 = 7$'],
        ['En total, once. Ningún cubo flota: debajo de cada uno hay otro o el piso.', {}, '$4 + 7 = 11$'],
      ], 'Escribe la altura de cada torre y suma: así cuentas también los cubos escondidos.'),
      xpHaz('fichas', 'Cuenta los cubos de cada fila y el total. Los números dicen la altura de cada torre.', { slots: [{ x: 66, y: 196, w: 84, et: 'adelante' }, { x: 170, y: 196, w: 84, et: 'atrás' }, { x: 274, y: 196, w: 84, et: 'en total' }], fichas: ['5', '8', '13', '6', '10', '11'], meta: ['5', '8', '13'], alto: 242, fondo: K => pila(K, [150, 160], 28, [[1, 2, 2], [2, 2, 4]], 1, 1), pista: 'Adelante hay torres de 1, 2 y 2.' }, 'Adelante $1 + 2 + 2 = 5$, atrás $2 + 2 + 4 = 8$: 13 cubos.')],
    ['Las vistas',
      xpMira('dibujo', 'Segunda idea: una **vista** aplasta la construcción y deja ver solo lo más alto.', { dib: (v, K) => pila(K, [110, 170], 26, H, 1, 1) + K.f(v.f, vista(K, 210, 84, [0, 1, 2].map(c => max(H.map(r => r[c]))), 'de frente')) + K.f(v.l, vista(K, 222, 190, H.map(r => max(r)).reverse(), 'desde la izquierda')), v: { f: 0, l: 0 }, alto: 210 }, [
        ['La misma construcción, con la altura de cada torre.', {}],
        ['De frente, cada columna muestra su torre más alta: de izquierda a derecha, 1, 3 y 3.', { f: 1 }, '$1, \\; 3, \\; 3$'],
        ['Las torres bajitas de adelante no tapan a las altas, y las de atrás no se ven si son más bajas.', {}],
        ['Desde la izquierda se mira cada fila: la de atrás llega a 3 y la de adelante, a 2.', { l: 1 }, '$3, \\; 2$'],
        ['Construcciones distintas pueden tener las mismas vistas.', {}],
      ], 'En una vista, cada columna muestra la altura **máxima** de las torres que están en esa dirección.'),
      xpHaz('rejilla', 'Vista desde arriba: toca cada casilla para darle altura (0 a 3). De frente, por columnas, se debe ver 1, 3 y 2; por filas, 2 y 3.', { f: 2, c: 3, estados: 4, unoAUno: true, rot: ['0', '1', '2', '3'], filas: ['fila: 2', 'fila: 3'], cols: ['1', '3', '2'], izq: 70, cw: 64, ch: 52, cumple: c => [1, 3, 2].every((m, k) => Math.max(c[k], c[k + 3]) === m) && [2, 3].every((m, r) => Math.max(c[3 * r], c[3 * r + 1], c[3 * r + 2]) === m), sol: { 0: 1, 1: 0, 2: 2, 3: 1, 4: 3, 5: 0 },
        lee: c => `$\\text{columnas: } ${[0, 1, 2].map(k => Math.max(c[k], c[k + 3])).join(', ')} \\quad \\text{filas: } ${[0, 1].map(r => Math.max(c[3 * r], c[3 * r + 1], c[3 * r + 2])).join(', ')}$`, dice: c => `Llevas ${c.reduce((a, b) => a + b, 0)} cubos.` }, 'El 3 solo cabe donde se cruzan la columna del 3 y la fila del 3; lo demás se puede armar de varias formas.')],
    ['El cubo pintado',
      xpMira('dibujo', 'Tercera idea: si se pinta un cubo y se corta, la pintura depende del **lugar**.', { dib: cubo, v: { e: 0, a: 0, c: 0 }, alto: 215 }, [
        ['Un cubo de arista 7 se pinta por fuera y se corta en cubitos: 343.', {}, '$7^3 = 343$'],
        ['Las esquinas tienen 3 caras pintadas. Siempre son 8.', { e: 1 }, '$8$'],
        ['Los de las aristas, sin las esquinas, tienen 2: hay 12 aristas con 5 cada una.', { a: 1 }, '$12 \\cdot 5 = 60$'],
        ['Los del centro de cada cara tienen 1: son 6 caras de 5 por 5.', { c: 1 }, '$6 \\cdot 25 = 150$'],
        ['Y por dentro queda un cubo de 5 sin pintura: 125. Todo suma 343.', {}, '$5^3 = 125$'],
      ], 'Con arista n: 8 esquinas, $12(n-2)$ en aristas, $6(n-2)^2$ en caras y $(n-2)^3$ sin pintar.'),
      xpHaz('fichas', 'Un cubo de arista 5 se pinta y se corta en cubitos. ¿Cuántos tienen 3, 2 y 1 caras pintadas?', { slots: [{ x: 66, y: 56, w: 84, et: '3 caras' }, { x: 170, y: 56, w: 84, et: '2 caras' }, { x: 274, y: 56, w: 84, et: '1 cara' }], fichas: ['8', '36', '54', '60', '27', '150'], meta: ['8', '36', '54'], alto: 104, pista: 'En cada arista, quitando esquinas, quedan 3. En cada cara, 3 por 3.' }, '8 esquinas, $12 \\cdot 3 = 36$ y $6 \\cdot 9 = 54$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un bloque de 5 × 4 × 3 se pinta por fuera y se corta en cubitos de 1. ¿Cuántos hay, cuántos sin pintar y cuántos con pintura?', { slots: [{ x: 66, y: 176, w: 84, et: 'en total' }, { x: 170, y: 176, w: 84, et: 'sin pintar' }, { x: 274, y: 176, w: 84, et: 'con pintura' }], fichas: ['60', '6', '54', '24', '36', '12'], meta: ['60', '6', '54'], alto: 222, fondo: K => K.caja([160, 140], 21, 5, 4, 3, 'fa'), pista: 'Sin pintar queda un bloque de 3 por 2 por 1: se quita una capa por cada lado.' }, '$5 \\cdot 4 \\cdot 3 = 60$; adentro $3 \\cdot 2 \\cdot 1 = 6$; con pintura 54.')],
  ], 'Torres con su altura, vistas que guardan el máximo, y la pintura según el lugar.');
}
;
//#archivo js/explora-pu-es-3.js
// Preuniversitario · pu-es-3 «Desarrollos del cubo» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CL = { 0: 'fc', 1: 'fa', 2: 'fg', 3: 'ff' };
  // Desarrollo: celdas [columna, fila] con letra y color de pareja (0 = sin marcar).
  const red = (K, x, y, u, cel, let_, col = []) => cel.map(([c, r], i) => K.r(x + c * u, y + r * u, u, u, CL[col[i] || 0], 2) + K.t(x + (c + 0.5) * u, y + (r + 0.5) * u + 6, let_[i], 'b')).join('');
  const N1 = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 2]];
  const N2 = [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]];
  // Dado en perspectiva: arriba, frente y derecha.
  const dado = (K, cx, cy, u, a, f, d) => {
    const A = [[cx - u, cy - u * 0.5], [cx, cy - u], [cx + u, cy - u * 0.5], [cx, cy]], F = [[cx - u, cy - u * 0.5], [cx, cy], [cx, cy + u * 1.1], [cx - u, cy + u * 0.6]], D = [[cx, cy], [cx + u, cy - u * 0.5], [cx + u, cy + u * 0.6], [cx, cy + u * 1.1]];
    return K.p(A, 'fa') + K.p(F, 'fc') + K.p(D, 'fg') + K.t(cx, cy - u * 0.5 + 7, a, 'b') + K.t(cx - u / 2, cy + u * 0.38, f, 'b') + K.t(cx + u / 2, cy + u * 0.38, d, 'b');
  };
  const rot3 = (K, cx, cy, u) => K.t(cx, cy - u - 8, 'arriba', 's tm') + K.t(cx - u - 6, cy + u * 0.3, 'frente', 's tm', 'end') + K.t(cx + u + 6, cy + u * 0.3, 'derecha', 's tm', 'start');
  // Parejas de caras opuestas en colores.
  const par = (v, K) => red(K, 78, 24, 46, N1, ['P', 'Q', 'R', 'S', 'T', 'U'], [v.a > 0.5 ? 1 : 0, v.b > 0.5 ? 2 : 0, v.a > 0.5 ? 1 : 0, v.b > 0.5 ? 2 : 0, v.c > 0.5 ? 3 : 0, v.c > 0.5 ? 3 : 0]);

  xpLec('pu-es-3', [
    ['Caras opuestas en el molde',
      xpMira('dibujo', 'Empecemos por la idea: al doblar el molde, ¿qué caras quedan **frente a frente**?', { dib: par, v: { a: 0, b: 0, c: 0 }, alto: 180 }, [
        ['Este molde se dobla y arma un cubo. Tiene seis caras: P, Q, R, S, T y U.', {}],
        ['En una fila recta, las vecinas se tocan. La opuesta está saltando una: P y R.', { a: 1 }],
        ['Por lo mismo, Q y S son opuestas: entre ellas está R.', { b: 1 }],
        ['Las dos que sobran, una arriba y otra abajo de la fila, son las tapas: T y U.', { c: 1 }],
        ['Son tres parejas. Dos caras opuestas nunca se tocan en el molde.', {}],
        ['No todo molde cierra: si dos caras caen en el mismo sitio, otro sitio queda abierto.', {}],
      ], 'En una fila recta, la cara opuesta está **saltando una**. Las dos que sobran son opuestas.'),
      xpHaz('fichas', 'Este molde se dobla en un cubo. Pon la cara opuesta de cada una.', { slots: [{ x: 66, y: 196, w: 70, et: 'opuesta de A' }, { x: 170, y: 196, w: 70, et: 'opuesta de B' }, { x: 274, y: 196, w: 70, et: 'opuesta de E' }], fichas: ['C', 'D', 'F', 'A', 'B'], meta: ['C', 'D', 'F'], alto: 242, fondo: K => red(K, 86, 14, 42, [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [3, 2]], ['A', 'B', 'C', 'D', 'E', 'F']), pista: 'A, B, C y D están en fila: salta una. Las que sobran son las tapas.' }, 'A con C, B con D, y las tapas E con F, aunque no estén en la misma columna.')],
    ['El dado suma siete',
      xpMira('dibujo', 'Segunda idea: en un dado corriente, las caras opuestas **suman 7**.', { dib: (v, K) => dado(K, 170, 100, 62, 4, 2, 1) + rot3(K, 170, 100, 62) + K.f(v.o, K.t(40, 30, 'abajo: 3', 'ta', 'start') + K.f(v.o2, K.t(40, 188, 'atrás: 5', 'ta', 'start') + K.t(232, 188, 'izquierda: 6', 'ta', 'start'))), v: { o: 0, o2: 0 }, alto: 200 }, [
        ['Un dado muestra el 4 arriba, el 2 al frente y el 1 a la derecha.', {}],
        ['Debajo del 4 está el que completa 7: el 3.', { o: 1 }, '$7 - 4 = 3$'],
        ['Atrás, detrás del 2, está el 5. Y a la izquierda, frente al 1, el 6.', { o2: 1 }, '$7 - 2 = 5 \\quad 7 - 1 = 6$'],
        ['Las tres visibles suman 7 y las escondidas 14. En total siempre son 21.', {}, '$7 + 14 = 21$'],
      ], 'Opuestas: 1 con 6, 2 con 5 y 3 con 4. Las seis caras suman 21.'),
      xpHaz('fichas', 'Se ven el 6 arriba, el 5 al frente y el 4 a la derecha. Pon las tres escondidas.', { slots: [{ x: 66, y: 190, w: 70, et: 'abajo' }, { x: 170, y: 190, w: 70, et: 'atrás' }, { x: 274, y: 190, w: 70, et: 'izquierda' }], fichas: ['1', '2', '3', '4', '5'], meta: ['1', '2', '3'], alto: 236, fondo: K => dado(K, 170, 72, 50, 6, 5, 4), pista: 'Cada escondida completa 7 con la que tiene enfrente.' }, 'Abajo $7 - 6 = 1$, atrás $7 - 5 = 2$, izquierda $7 - 4 = 3$.')],
    ['Rodar el dado',
      xpMira('dibujo', 'Tercera idea: al **volcar** el dado, cada cara pasa al sitio siguiente.', { dib: (v, K) => (v.m < 0.5 ? dado(K, 100, 96, 52, 1, 2, 4) : dado(K, 240, 96, 52, 3, 2, 1)) + K.f(v.fl, K.ar(150, 178, 200, 178, 'la gr')) + K.t(v.m < 0.5 ? 100 : 240, 28, v.p || '', 'ta'), v: { m: 0, fl: 0, p: '' }, alto: 195 }, [
        ['Arriba el 1, al frente el 2 y a la derecha el 4. Lo volcamos hacia la derecha.', {}],
        ['La cara de la derecha, el 4, es la que va a quedar contra la mesa.', { fl: 1 }],
        ['La de arriba, el 1, pasa a la derecha. Y la de la izquierda, 7 menos 4, sube: el 3.', { m: 1 }, '$7 - 4 = 3$'],
        ['El frente no cambia: el dado giró alrededor de él. Sigue el 2.', {}],
        ['Hacia adelante es igual: sube la de atrás, la de arriba pasa al frente y los lados no cambian.', {}],
        ['Cuatro vuelcos hacia el mismo lado lo dejan como al principio.', { m: 0, fl: 0 }],
      ], 'Al volcar a la derecha: arriba → derecha → abajo → izquierda → arriba. El frente y atrás no cambian.'),
      xpHaz('fichas', 'Arriba el 2, al frente el 1 y a la derecha el 4. Se vuelca una vez hacia la derecha. ¿Qué se ve ahora?', { slots: [{ x: 66, y: 190, w: 70, et: 'arriba' }, { x: 170, y: 190, w: 70, et: 'frente' }, { x: 274, y: 190, w: 70, et: 'derecha' }], fichas: ['3', '1', '2', '4', '5', '6'], meta: ['3', '1', '2'], alto: 236, fondo: K => dado(K, 170, 72, 50, 2, 1, 4), pista: 'Sube la cara de la izquierda, que es la opuesta del 4.' }, 'Sube la izquierda, $7 - 4 = 3$; el frente sigue en 1 y el 2 pasa a la derecha.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Este molde en escalera también arma un cubo. Pon la cara opuesta de cada una.', { slots: [{ x: 66, y: 196, w: 70, et: 'opuesta de 1' }, { x: 170, y: 196, w: 70, et: 'opuesta de 2' }, { x: 274, y: 196, w: 70, et: 'opuesta de 3' }], fichas: ['4', '5', '6', '1', '2', '3'], meta: ['4', '5', '6'], alto: 242, fondo: K => red(K, 86, 14, 42, N2, ['1', '2', '3', '4', '5', '6']), pista: 'Imagina que el cubo rueda por la escalera: tras tres vuelcos, 1, 2, 3, llega a la cara opuesta de la primera.' }, 'Al rodar por la escalera, la cara opuesta aparece cada tres: 1 con 4, 2 con 5 y 3 con 6.')],
  ], 'Opuestas saltando una, caras que suman 7, y vuelcos que pasan cada cara al sitio siguiente.');
}
;
//#archivo js/explora-pu-es-4.js
// Preuniversitario · pu-es-4 «Giros, espejos y dobleces» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Espejo: figura F en cuadritos y su reflejo a distancia de un eje vertical.
  const F = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [0, 3], [0, 4]];
  const espejo = (v, K) => {
    const u = 22, ax = 170, y = 40, x = (c, s) => ax + s * (1.4 + 2 - c) * u;
    return K.l(ax, 22, ax, 170, 'lg d') + F.map(([c, r]) => K.r(x(c, -1) - u, y + r * u, u - 2, u - 2, 'fa')).join('') + K.f(v.r, F.map(([c, r]) => K.r(x(c, 1), y + r * u, u - 2, u - 2, 'fg')).join(''))
      + K.f(v.d, K.l(x(1, -1) - u / 2, y + 2 * u + 10, x(1, 1) + u / 2, y + 2 * u + 10, 'lf d') + K.t(ax, 188, 'la misma distancia', 's tf'));
  };
  // Giro de una F alrededor de su centro; g en grados, sentido del reloj.
  const giro = (v, K) => {
    const u = 26, G = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [0, 3], [0, 4]], cx = 170, cy = 105, a = v.g * Math.PI / 180;
    const R = (x, y) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)];
    const cel = (c, r, f) => { const x = (c - 1) * u - u / 2, y = (r - 2) * u - u / 2; return [[x, y], [x + u - 2, y], [x + u - 2, y + u - 2], [x, y + u - 2]].map(f); };
    return K.c(cx, cy, 92, 'fn d') + G.map(([c, r]) => K.p(cel(c, r, ([x, y]) => [cx + x, cy + y]), 'fc')).join('') + G.map(([c, r]) => K.p(cel(c, r, ([x, y]) => R(x, y)), 'fa')).join('') + K.c(cx, cy, 4, 'fk') + K.l(cx, cy, cx + 92 * Math.sin(a), cy - 92 * Math.cos(a), 'la');
  };
  // Papel doblado d veces (0..n) con un hueco; abierto = se ven los huecos.
  const papel = (v, K) => {
    const d = Math.round(v.d), x = 40, y = 40, S = 120, w = S / 2 ** Math.ceil(d / 2), h = S / 2 ** Math.floor(d / 2);
    const c = 2 ** Math.ceil(d / 2), r = 2 ** Math.floor(d / 2);
    let A = ''; const W = S / c, HH = S / r, rad = Math.max(1.6, Math.min(W, HH) * 0.13), np = v.np || 1;
    for (let i = 0; i < c; i++) for (let j = 0; j < r; j++) for (let k = 0; k < np; k++) { const fx = (k + 1) / (np + 1); A += K.c(190 + (i + (i % 2 ? 1 - fx : fx)) * W, y + (j + 0.5) * HH, rad, 'fF'); }
    let B = ''; for (let k = 0; k < np; k++) B += K.c(x + w * (k + 1) / (np + 1), y + h / 2, Math.max(2, rad), 'fF');
    return K.t(100, 24, 'doblado', 's tm') + K.r(x, y, S, S, 'fn d', 2) + K.r(x, y, w, h, 'fa', 2) + B + K.t(250, 24, 'abierto', 's tm') + K.r(190, y, S, S, 'fa', 2) + K.f(v.ab ?? 1, Array.from({ length: c - 1 }, (_, i) => K.l(190 + (i + 1) * W, y, 190 + (i + 1) * W, y + S, 'ls')).join('') + Array.from({ length: r - 1 }, (_, i) => K.l(190, y + (i + 1) * HH, 310, y + (i + 1) * HH, 'ls')).join('') + A) + K.t(100, 180, `${2 ** d} ${d ? 'capas' : 'capa'}`, 'ta');
  };
  const reloj = (K, cx, cy, r, h, cls) => { let s = K.c(cx, cy, r, 'fc'); for (let i = 0; i < 12; i++) { const p = K.at(cx, cy, r - 6, 90 - i * 30), q = K.at(cx, cy, r, 90 - i * 30); s += K.l(...p, ...q, 'lm'); } const m = K.at(cx, cy, r - 12, 90), t = K.at(cx, cy, r * 0.55, 90 - h * 30); return s + K.l(cx, cy, ...m, 'lm') + K.l(cx, cy, ...t, `${cls} gr`) + K.c(cx, cy, 3, 'fk'); };
  // Reflejo hacia abajo: 8 filas × 6 columnas; las 4 de arriba están dadas.
  const DADAS = [6, 7, 8, 12, 18, 19, 20], dados = Object.fromEntries(DADAS.map(i => [i, 1]));
  const meta = DADAS.map(i => (7 - Math.floor(i / 6)) * 6 + i % 6);

  xpLec('pu-es-4', [
    ['El espejo',
      xpMira('dibujo', 'Empecemos por la idea: un espejo deja cada punto a la **misma distancia**, al otro lado.', { dib: espejo, v: { r: 0, d: 0 }, alto: 200 }, [
        ['Una F frente a un espejo vertical: la línea punteada.', {}],
        ['Su reflejo queda volteado: lo que estaba cerca del espejo sigue cerca.', { r: 1 }],
        ['Cada cuadrito y su reflejo están en el mismo renglón y a la misma distancia del espejo.', { d: 1 }],
        ['Un espejo vertical cambia izquierda por derecha, pero no arriba por abajo.', {}],
        ['Por eso letras como A, M y O se ven iguales, y la F no.', { d: 0 }],
      ], 'Reflejar: mismo renglón y misma distancia al espejo, del otro lado.'),
      xpHaz('rejilla', 'El espejo está en la línea horizontal, como un lago. Pinta el reflejo de la figura.', { f: 8, c: 6, cw: 32, ch: 24, dados, meta, sobre: (K, g) => K.l(g.x(0) - 8, g.y(4), g.x(6) + 8, g.y(4), 'lg gr'), dice: c => `${c.filter((x, i) => x && !dados[i]).length} de ${meta.length}. La fila pegada a la línea se refleja pegada a la línea.` }, 'Cada cuadrito baja a la misma distancia de la línea, en su misma columna.')],
    ['Los giros',
      xpMira('dibujo', 'Segunda idea: al **girar**, la figura no se voltea: da vueltas completa.', { dib: giro, v: { g: 0 }, alto: 212 }, [
        ['La misma F, con un punto fijo en el centro.', {}],
        ['Un cuarto de vuelta en el sentido del reloj: 90°. Queda acostada.', { g: 90 }, '$90^\\circ$'],
        ['Media vuelta: 180°. Queda de cabeza.', { g: 180 }, '$180^\\circ$'],
        ['Tres cuartos, 270°, es lo mismo que un cuarto hacia el otro lado.', { g: 270 }, '$270^\\circ = -90^\\circ$'],
        ['Y con cuatro cuartos vuelve al principio. Ningún giro da el reflejo del espejo.', { g: 360 }, '$360^\\circ$'],
      ], 'Girar da vueltas; reflejar voltea. 270° a un lado es 90° al otro.'),
      xpHaz('dibujo', 'Deja la F como queda tras **cinco** cuartos de vuelta en el sentido del reloj. Gírala por la manija.', { dib: giro, v: { g: 0 }, cumple: v => v.g % 360 === 90, sol: { g: 90 }, alto: 212,
        manijas: [{ k: 'g', min: 0, max: 450, paso: 90, r: 11, en: v => [170 + 92 * Math.sin(v.g * Math.PI / 180), 105 - 92 * Math.cos(v.g * Math.PI / 180)], de: (x, y, v) => { const g = Math.atan2(x - 170, 105 - y) * 180 / Math.PI; return v.g + (((g - v.g) % 360) + 540) % 360 - 180; } }],
        lee: v => `$${v.g}^\\circ$`, dice: v => `${v.g / 90} ${v.g === 90 ? 'cuarto' : 'cuartos'} de vuelta. Cuatro cuartos no cambian nada.` }, 'Cinco cuartos son una vuelta completa y un cuarto más: queda igual que con 90°.')],
    ['Doblar y perforar',
      xpMira('dibujo', 'Tercera idea: cada doblez **duplica** las capas.', { dib: papel, v: { d: 0, ab: 0 }, alto: 195 }, [
        ['Una hoja sin doblar: una capa. Si se perfora, queda un hueco.', { ab: 1 }, '$1$'],
        ['Se dobla una vez por la mitad: dos capas. El mismo golpe deja dos huecos.', { d: 1 }, '$2$'],
        ['Dos dobleces: cuatro capas y cuatro huecos.', { d: 2 }, '$2 \\cdot 2 = 4$'],
        ['Tres dobleces: ocho. Cada doblez multiplica por 2.', { d: 3 }, '$2^3 = 8$'],
        ['Los huecos quedan en espejo a cada lado de cada doblez.', {}],
        ['Y si se perfora sobre un doblez, las dos capas unidas dejan un solo hueco: sale la mitad.', {}],
      ], 'Con d dobleces hay $2^d$ capas: cada perforación deja $2^d$ huecos.'),
      xpHaz('dibujo', 'Se hacen **dos** perforaciones en la hoja doblada y al abrirla hay 16 huecos. ¿Cuántos dobleces tenía?', { dib: papel, v: { d: 0, np: 2, ab: 1 }, metas: { d: 3 }, alto: 245, manijas: [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dobleces' }],
        lee: v => `$2 \\cdot 2^{${v.d}} = ${2 * 2 ** v.d}$`, dice: v => `${2 ** v.d} ${v.d ? 'capas' : 'capa'} por 2 perforaciones: ${2 * 2 ** v.d} huecos.` }, '$16 = 2 \\cdot 8$: ocho capas, tres dobleces.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En un espejo, un reloj de agujas sin números parece marcar las 10 en punto. Mueve la aguja corta del reloj real.', { dib: (v, K) => reloj(K, 90, 100, 66, 10, 'lg') + reloj(K, 250, 100, 66, v.h, 'la') + K.l(170, 24, 170, 176, 'lm d') + K.t(90, 188, 'en el espejo', 's tg') + K.t(250, 188, 'real', 's ta'), v: { h: 6 }, metas: { h: 2 }, alto: 200,
        manijas: [{ k: 'h', min: 0, max: 11, paso: 1, r: 10, en: v => XPK.at(250, 100, 38, 90 - v.h * 30), de: (x, y) => ((90 - Math.atan2(100 - y, x - 250) * 180 / Math.PI + 360) % 360) / 30 % 11.5 }],
        lee: v => `$${v.h || 12}\\!:\\!00$`, dice: () => 'El espejo cambia izquierda por derecha: la aguja a un lado del 12 se ve al otro.' }, 'La aguja real está igual de lejos del 12, al otro lado: son las 2. Juntas suman 12.')],
  ], 'El espejo voltea a la misma distancia, el giro da vueltas y cada doblez duplica las capas.');
}
;
//#archivo js/explora-pu-cd-1.js
// Preuniversitario · pu-cd-1 «Claves de sustitución» (Explora). Los ejemplos no son los de los ejercicios.
{
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', cif = (w, k) => [...w].map(l => ABC[(ABC.indexOf(l) + k + 26) % 26]).join('');
  // Disco: afuera el alfabeto normal; adentro, el corrido k lugares (debajo de A está la letra A + k).
  const disco = (v, K) => {
    let h = K.c(170, 118, 106, 'fn') + K.c(170, 118, 82, 'fn') + K.c(170, 118, 58, 'fn');
    for (let i = 0; i < 26; i++) { const a = 90 - i * 360 / 26, p = K.at(170, 118, 94, a), q = K.at(170, 118, 70, a + v.k * 360 / 26); h += K.t(p[0], p[1] + 4, ABC[i], 's') + K.t(q[0], q[1] + 4, ABC[i], 's ta'); }
    return h + K.t(170, 112, v.t ?? '', 's tm') + K.t(170, 134, v.c ?? '', 'ta');
  };
  const focos = (v, K) => [16, 8, 4, 2, 1].map((n, i) => K.c(50 + i * 60, 80, 22, v.b[i] === '1' ? 'fG' : 'fc') + K.t(50 + i * 60, 86, n, v.b[i] === '1' ? 'tc' : 'tm') + K.t(50 + i * 60, 126, v.b[i], 'b')).join('') + K.t(170, 34, v.p || '', 'ta');
  const tira = (v, K) => [...v.w].map((l, i) => { const x = 170 + (i - (v.w.length - 1) / 2) * 66; return K.r(x - 27, 34, 54, 48, 'fa', 10) + K.t(x, 66, l, 'B') + K.f(v.n, K.t(x, 112, ABC.indexOf(l) + 1, 'b tg')); }).join('') + K.t(170, 152, v.p || '', 'b ta');

  xpLec('pu-cd-1', [
    ['El alfabeto corrido',
      xpMira('dibujo', 'Empecemos por la idea: una clave antigua **corre** el alfabeto unos lugares.', { dib: disco, v: { k: 0, t: '', c: '' }, alto: 232 }, [
        ['Dos discos con el alfabeto. Sin girar, cada letra va consigo misma.', {}],
        ['Giramos el de adentro 5 lugares: ahora A va con F, B va con G.', { k: 5, t: 'A → F' }],
        ['Para cifrar SOL se busca cada letra afuera y se lee la de adentro: X, T, Q.', { t: 'SOL', c: 'XTQ' }],
        ['Para descifrar se hace al revés: de adentro hacia afuera. Se devuelven los 5 lugares.', { t: 'XTQ', c: 'SOL' }],
        ['Después de la Z sigue la A: la Y corrida 5 lugares es D.', { t: 'Y → D', c: '' }],
      ], 'Cifrar: avanzar k lugares. Descifrar: devolverse k. Después de Z sigue A.'),
      xpHaz('dibujo', 'En una clave, la H se cifra con N. Gira el disco de adentro hasta que coincidan.', { dib: (v, K) => disco({ k: v.k, t: 'MAR', c: cif('MAR', v.k) }, K), v: { k: 1 }, metas: { k: 6 }, alto: 232,
        manijas: [{ k: 'k', min: 0, max: 25, paso: 1, r: 10, en: v => XPK.at(170, 118, 44, 90 + v.k * 360 / 26), de: (x, y, v) => { const k = (Math.atan2(118 - y, x - 170) * 180 / Math.PI - 90) / (360 / 26); return v.k + ((((k - v.k) % 26) + 39) % 26) - 13; } }],
        lee: v => `$\\text{H} \\to \\text{${cif('H', v.k)}}$`, dice: v => `Corrido ${v.k} ${v.k === 1 ? 'lugar' : 'lugares'}: MAR se escribe ${cif('MAR', v.k)}.` }, 'De H a N hay 6 lugares: es la clave de todas las letras.')],
    ['Letras con valor',
      xpMira('dibujo', 'Segunda idea: otras claves cambian cada letra por su **número**.', { dib: tira, v: { w: 'SOL', n: 0, p: '' }, alto: 168 }, [
        ['A vale 1, B vale 2… hasta Z, que vale 26. ¿Cuánto vale SOL?', {}],
        ['S es la letra 19, O es la 15 y L es la 12.', { n: 1 }],
        ['Se suman: 19 más 15 más 12 son 46.', { p: '46' }, '$19 + 15 + 12 = 46$'],
        ['Atajo para contar: E es 5, J es 10, O es 15, T es 20 y Y es 25.', { p: 'E 5 · J 10 · O 15 · T 20 · Y 25' }],
      ], 'Memoriza E 5, J 10, O 15, T 20 y cuenta desde la más cercana.'),
      xpHaz('fichas', 'Pon el valor de cada letra de MESA y el total.', { slots: [0, 1, 2, 3].map(i => ({ x: 46 + i * 62, y: 92, w: 56 })).concat([{ x: 302, y: 92, w: 64, et: 'total' }]), fichas: ['13', '5', '19', '1', '38', '37', '12'], meta: ['13', '5', '19', '1', '38'], alto: 140, fondo: K => [...'MESA'].map((l, i) => K.t(46 + i * 62, 58, l, 'B ta')).join(''), pista: 'M está después de la J (10): K 11, L 12, M 13.' }, '$13 + 5 + 19 + 1 = 38$.')],
    ['Bombillos: el binario',
      xpMira('dibujo', 'Tercera idea: con **bombillos** prendidos y apagados se escribe cualquier número.', { dib: focos, v: { b: '00000', p: '' }, alto: 150 }, [
        ['Cinco bombillos que valen 16, 8, 4, 2 y 1. Cada uno vale el doble del de su derecha.', {}],
        ['Prendemos el 8, el 4 y el 1: suman 13.', { b: '01101', p: '8 + 4 + 1 = 13' }, '$01101 \\to 13$'],
        ['Para escribir el 6: ¿cabe el 16? No. ¿El 8? No. El 4 sí, y quedan 2.', { b: '00100', p: '6 − 4 = 2' }],
        ['El 2 también: 4 más 2 son 6. Cada número se escribe de una sola manera.', { b: '00110', p: '4 + 2 = 6' }, '$00110 \\to 6$'],
      ], 'Empieza por el bombillo más grande que quepa y sigue con lo que falta.'),
      xpHaz('rejilla', 'Prende los bombillos que suman 19.', { f: 1, c: 5, cw: 60, ch: 56, celda: (i) => String([16, 8, 4, 2, 1][i]), unoAUno: true, meta: [0, 3, 4], lee: c => `$${[16, 8, 4, 2, 1].filter((_, i) => c[i]).join(' + ') || 0} = ${[16, 8, 4, 2, 1].reduce((a, n, i) => a + n * c[i], 0)}$`, dice: c => `El tablero dice ${c.join(' ')}.` }, '$16 + 2 + 1 = 19$: se escribe 1 0 0 1 1.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Cada letra se cambió por la que está 2 lugares después. Descifra NWB: ¿qué palabra era?', { slots: [0, 1, 2].map(i => ({ x: 108 + i * 64, y: 104, w: 56 })), fichas: ['L', 'U', 'Z', 'P', 'Y', 'D', 'A'], meta: ['L', 'U', 'Z'], alto: 136, fondo: K => [...'NWB'].map((l, i) => K.t(108 + i * 64, 44, l, 'B tg') + K.ar(108 + i * 64, 54, 108 + i * 64, 78, 'lm')).join(''), pista: 'Descifrar es devolverse 2. Antes de la A está la Z.' }, 'N − 2 = L, W − 2 = U y B − 2 = Z: LUZ.')],
  ], 'Correr el alfabeto, sumar el valor de las letras y prender bombillos que duplican.');
}
;
//#archivo js/explora-pu-cd-2.js
// Preuniversitario · pu-cd-2 «Deducir la regla» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Máquina con varios ejemplos (entrada → salida) y una pregunta.
  const maq = (v, K) => v.e.map(([a, b], i) => K.t(90, 42 + i * 40, a, 'b') + K.ar(112, 36 + i * 40, 142, 36 + i * 40, 'lm') + K.r(146, 20 + i * 40, 48, 32, 'fa', 9) + K.t(170, 41 + i * 40, '?', 'tm') + K.ar(198, 36 + i * 40, 228, 36 + i * 40, 'lm') + K.t(252, 42 + i * 40, b, 'b ta')).join('') + K.t(170, 34 + v.e.length * 40, v.p || '', 'tg');
  const slots = (n, y) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * 64, y, w: 56 }));
  const ej = (K, y, a, b) => K.t(120, y, a, 'b') + K.ar(156, y - 6, 188, y - 6, 'lm') + K.t(226, y, b, 'b ta');

  xpLec('pu-cd-2', [
    ['La máquina de números',
      xpMira('dibujo', 'Empecemos por la idea: una regla se adivina con un ejemplo y se **comprueba** con los demás.', { dib: maq, v: { e: [['23', '6'], ['41', '4'], ['15', '5']], p: '' }, alto: 165 }, [
        ['Una máquina recibe 23 y entrega 6. ¿Qué hizo?', {}],
        ['Con un solo ejemplo hay muchas reglas: 23 menos 17, o 2 por 3…', { p: '¿23 − 17? ¿2 · 3?' }],
        ['Probamos «restar 17» con el segundo: 41 menos 17 son 24, no 4. Se descarta.', { p: '41 − 17 = 24 ✗' }],
        ['Probamos «multiplicar las cifras»: 4 por 1 son 4. Sirve.', { p: '4 · 1 = 4 ✓' }],
        ['Y con 15: 1 por 5 son 5. Cumple con todos: esa es la regla.', { p: '1 · 5 = 5 ✓' }],
      ], 'Propón una regla con un ejemplo y pruébala con **todos**. Si falla en uno, se descarta.'),
      xpHaz('fichas', 'Una máquina hace 2 → 5, 4 → 17 y 5 → 26. ¿Qué entrega con el 7? Pon la cuenta y el resultado.', { slots: [{ x: 100, y: 138, w: 110, et: 'cuenta' }, { x: 246, y: 138, w: 84, et: 'resultado' }], fichas: ['7·7+1', '7·4+1', '50', '29', '36'], meta: ['7·7+1', '50'], alto: 186, fondo: K => ej(K, 34, 2, 5) + ej(K, 66, 4, 17) + ej(K, 98, 5, 26), pista: '2 · 2 + 1, 4 · 4 + 1… ¿y con 7?' }, 'La regla es multiplicar por sí mismo y sumar 1: $49 + 1 = 50$.')],
    ['Letras que cambian de puesto',
      xpMira('fichas', 'Segunda idea: a veces las letras son las mismas, pero **cambian de puesto**.', { slots: slots(4, 110), fichas: ['L', 'A', 'G', 'O'], alto: 146, fondo: (K, v) => K.t(170, 34, 'LAGO → ALOG', 'b ta') + K.t(170, 66, v.p || '', 'tg') }, [
        ['LAGO se escribe ALOG. Están las mismas cuatro letras: solo se movieron.', { pon: { 0: 'L', 1: 'A', 2: 'G', 3: 'O' } }],
        ['Mira los puestos: la primera y la segunda se intercambiaron.', { saca: [0, 1], pon: { 0: 'A', 1: 'L' }, v: { p: 'puestos 1 y 2' } }],
        ['La tercera y la cuarta también.', { saca: [2, 3], pon: { 2: 'O', 3: 'G' }, v: { p: 'puestos 3 y 4' } }],
        ['La regla habla de puestos, no de letras. Sirve para cualquier palabra de cuatro.', { v: { p: '1 ↔ 2 y 3 ↔ 4' } }],
      ], 'Si las letras son las mismas, numera los puestos y mira a dónde va cada uno.'),
      xpHaz('fichas', 'En ese código, LAGO se escribe ALOG. Escribe SOPA.', { slots: slots(4, 70), fichas: ['S', 'O', 'P', 'A'], meta: ['O', 'S', 'A', 'P'], alto: 106, fondo: K => K.t(170, 30, 'SOPA', 'b'), pista: 'Se cambian la 1 con la 2 y la 3 con la 4.' }, 'SOPA pasa a OSAP.')],
    ['El corrimiento que crece',
      xpMira('dibujo', 'Tercera idea: a veces cada letra avanza una **cantidad distinta**.', { dib: (v, K) => [...'SOL'].map((l, i) => { const x = 100 + i * 70, d = ['T', 'Q', 'O'][i]; return K.t(x, 50, l, 'B') + K.f(v['a' + i], K.ar(x, 60, x, 100, 'lm') + K.t(x + 18, 86, `+${i + 1}`, 'tg') + K.t(x, 130, d, 'B ta')); }).join(''), v: { a0: 0, a1: 0, a2: 0 }, alto: 150 }, [
        ['SOL se escribe TQO. ¿Es un corrimiento fijo? Vamos letra por letra.', {}],
        ['De S a T hay 1 lugar.', { a0: 1 }],
        ['De O a Q hay 2. Ya no es fijo.', { a1: 1 }],
        ['De L a O hay 3. La regla: la primera avanza 1, la segunda 2, la tercera 3.', { a2: 1 }],
      ], 'Escribe cuánto avanza cada letra: si no es igual, busca el patrón de los avances.'),
      xpHaz('fichas', 'Con esa regla (avanzar 1, 2, 3…), cifra la palabra MAR.', { slots: slots(3, 96), fichas: ['N', 'C', 'U', 'B', 'S', 'T'], meta: ['N', 'C', 'U'], alto: 130, fondo: K => [...'MAR'].map((l, i) => K.t(106 + i * 64, 42, l, 'B') + K.t(126 + i * 64, 62, `+${i + 1}`, 's tg')).join(''), pista: 'M avanza 1, A avanza 2 y R avanza 3.' }, 'M → N, A → C y R → U: NCU.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'PAN se escribe ▲●■ y PAZ se escribe ▲●◆. Escribe ZAPA con los mismos símbolos.', { slots: slots(4, 96), fichas: ['▲', '●', '●', '■', '◆', '▲'], meta: ['◆', '●', '▲', '●'], alto: 130, fondo: K => [...'ZAPA'].map((l, i) => K.t(74 + i * 64, 50, l, 'B')).join(''), pista: 'P y A son iguales en las dos palabras; lo que cambia es N y Z.' }, 'Z ◆, A ●, P ▲ y A ●: ◆●▲●.')],
  ], 'Proponer y comprobar, mirar puestos, medir avances y comparar lo que cambia.');
}
;
//#archivo js/explora-pu-gr-1.js
// Preuniversitario · pu-gr-1 «Leer gráficas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 10) / 10);
  // Barras con eje: vals, hi, paso.
  const Y0 = 172, H = 140;
  const barras = (v, K) => {
    const n = v.vals.length, w = 250 / n, Y = x => Y0 - x / v.hi * H; let h = '';
    for (let k = 0; k <= v.hi; k += v.st) h += K.l(60, Y(k), 320, Y(k), 'ls') + K.t(52, Y(k) + 4, k, 's tm', 'end');
    v.vals.forEach((x, i) => { h += K.r(66 + i * w + 8, Y(x), w - 16, Y0 - Y(x), i === v.on ? 'fA' : 'fa', 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, v.rot[i], 's'); });
    return h + (v.lin != null ? K.l(60, Y(v.lin), 320, Y(v.lin), 'lg d') : '') + (v.nota ? K.t(190, 22, v.nota, 'tg') : '');
  };
  const cambio = (v, K) => { const Y = x => 170 - x * v.u; return K.l(40, 170, 300, 170, 'lm') + K.r(70, Y(v.a), 70, 170 - Y(v.a), 'fa') + K.r(200, Y(v.b), 70, 170 - Y(v.b), 'fg') + K.l(70, Y(v.a), 290, Y(v.a), 'lm d') + K.t(105, 188, `antes ${N(v.a)}`, 's') + K.t(235, 188, `ahora ${N(v.b)}`, 's') + K.f(v.f ?? 1, K.t(170, Y(Math.max(v.a, v.b)) - 12 < 14 ? 14 : Y(Math.max(v.a, v.b)) - 12, v.txt || '', 'tf')); };
  const COL = ['fa', 'fg', 'ff', 'fc'];
  const torta = (v, K) => { let a = 90, h = ''; v.p.forEach((x, i) => { const b = a - x * 3.6; h += K.sec(150, 104, 84, b, a, COL[i]); const m = K.at(150, 104, 56, (a + b) / 2); h += x > 7 ? K.t(m[0], m[1] + 5, v.r[i] ?? '', 's') : ''; a = b; }); return h + K.t(250, 40, v.t || '', 'tm', 'start'); };

  xpLec('pu-gr-1', [
    ['Leer el eje',
      xpMira('dibujo', 'Empecemos por la idea: antes de mirar las barras, mira **el eje**.', { dib: barras, v: { vals: [30, 60, 20, 40], hi: 70, st: 10, rot: ['ene', 'feb', 'mar', 'abr'], on: -1, nota: '' }, alto: 195 }, [
        ['Las ventas de cuatro meses. El eje de la izquierda va de 10 en 10.', {}],
        ['La barra de febrero llega hasta la línea del 60: se vendieron 60.', { on: 1, nota: '60' }],
        ['La de marzo llega a 20. Febrero superó a marzo por 40.', { on: 2, nota: '60 − 20 = 40' }, '$60 - 20 = 40$'],
        ['Para el total se suman todas: 30, 60, 20 y 40 son 150.', { on: -1, nota: '150' }, '$30 + 60 + 20 + 40 = 150$'],
        ['Fíjate siempre en cuánto vale cada línea: no siempre es de uno en uno.', { nota: '' }],
      ], 'Primero la escala del eje, luego la punta de cada barra.'),
      xpHaz('dibujo', 'Pasa la tabla a la gráfica: A = 15, B = 35, C = 25. Arrastra la punta de cada barra.', { dib: (v, K) => barras({ vals: [v.a, v.b, v.c], hi: 40, st: 10, rot: ['A', 'B', 'C'], on: -1 }, K), v: { a: 5, b: 5, c: 5 }, metas: { a: 15, b: 35, c: 25 }, alto: 195,
        manijas: ['a', 'b', 'c'].map((k, i) => ({ k, min: 0, max: 40, paso: 5, r: 10, en: v => [66 + (i + 0.5) * 250 / 3, Y0 - v[k] / 40 * H], de: (x, y) => (Y0 - y) / H * 40 })),
        lee: v => `$${v.a}, \\; ${v.b}, \\; ${v.c}$`, dice: () => 'El eje va de 10 en 10: el 15 queda a mitad entre 10 y 20.' }, 'Los números que no tienen línea van a mitad de camino.')],
    ['¿Cuánto cambió, en porcentaje?',
      xpMira('dibujo', 'Segunda idea: el cambio se compara con **lo que había antes**.', { dib: cambio, v: { a: 40, b: 40, u: 1.9, txt: '', f: 1 }, alto: 200 }, [
        ['Un negocio vendía 40.', {}],
        ['Ahora vende 60. Aumentó 20 unidades.', { b: 60, txt: '+20' }, '$60 - 40 = 20$'],
        ['20 es la mitad de 40: aumentó el 50 %.', { txt: '+50 %' }, '$\\tfrac{20}{40} = 50\\,\\%$'],
        ['Al revés, si de 60 baja a 40, pierde 20 de 60: la tercera parte.', { a: 60, b: 40, txt: '−33.3 %' }, '$\\tfrac{20}{60} \\approx 33.3\\,\\%$'],
        ['La misma diferencia, distinto porcentaje: depende de dónde se empieza.', {}],
      ], 'Variación porcentual = cambio ÷ valor de **antes**.'),
      xpHaz('dibujo', 'Antes se vendían 50. Arrastra la barra de ahora hasta que el aumento sea del 30 %.', { dib: cambio, v: { a: 50, b: 55, u: 1.6, f: 0 }, metas: { b: 65 }, alto: 200, manijas: [{ k: 'b', min: 10, max: 95, paso: 5, r: 11, en: v => [235, 170 - v.b * 1.6], de: (x, y) => (170 - y) / 1.6 }],
        lee: v => `$\\tfrac{${v.b} - 50}{50} = ${Math.round((v.b - 50) / 50 * 100)}\\,\\%$`, dice: v => (v.b >= 50 ? `Aumentó ${v.b - 50} sobre 50.` : `Bajó ${50 - v.b} sobre 50.`) }, 'El 30 % de 50 son 15: $50 + 15 = 65$.')],
    ['La torta',
      xpMira('dibujo', 'Tercera idea: en una gráfica circular, **toda la vuelta** es el 100 %.', { dib: torta, v: { p: [100, 0, 0], r: ['100 %', '', ''], t: '360°' }, alto: 205 }, [
        ['La torta completa es el 100 % y da toda la vuelta: 360°.', {}, '$100\\,\\% = 360^\\circ$'],
        ['La mitad es el 50 % y mide 180°.', { p: [50, 50, 0], r: ['50 %', '50 %', ''], t: '180°' }, '$50\\,\\% = 180^\\circ$'],
        ['Un cuarto es el 25 %: un ángulo recto, 90°.', { p: [25, 75, 0], r: ['25 %', '75 %', ''], t: '90°' }, '$25\\,\\% = 90^\\circ$'],
        ['Cada 1 % son 3.6°. El 40 % mide 40 por 3.6: 144°.', { p: [40, 60, 0], r: ['40 %', '60 %', ''], t: '144°' }, '$40 \\cdot 3.6^\\circ = 144^\\circ$'],
      ], 'El 100 % son 360°, así que cada 1 % son 3.6°.'),
      xpHaz('dibujo', 'De 150 personas, 45 prefieren el café. Abre el sector del café hasta su tamaño.', { dib: (v, K) => torta({ p: [v.g / 3.6, 100 - v.g / 3.6], r: ['café', ''], t: `${v.g}°` }, K), v: { g: 36 }, metas: { g: 108 }, alto: 205,
        manijas: [{ k: 'g', min: 18, max: 342, paso: 18, r: 10, en: v => XPK.at(150, 104, 84, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(104 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 18) : g; } }],
        lee: v => `$${N(v.g / 3.6)}\\,\\% \\text{ de } 150 = ${N(v.g / 360 * 150)}$`, dice: v => `${v.g}° son el ${N(v.g / 3.6)} % de la vuelta.` }, '45 de 150 son el 30 %: $30 \\cdot 3.6^\\circ = 108^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Las ventas fueron 10, 15, 21 y 28. Pon el aumento en porcentaje de cada tramo.', { slots: [0, 1, 2].map(i => ({ x: 80 + i * 90, y: 142, w: 76, et: ['10 → 15', '15 → 21', '21 → 28'][i] })), fichas: ['50 %', '40 %', '33 %', '5 %', '70 %'], meta: ['50 %', '40 %', '33 %'], alto: 190, fondo: K => K.pl([[60, 100], [140, 82], [220, 60], [300, 34]], 'la gr') + [[60, 100, 10], [140, 82, 15], [220, 60, 21], [300, 34, 28]].map(([x, y, t]) => K.c(x, y, 4, 'fA') + K.t(x, y - 10, t, 's')).join(''), pista: 'Divide cada aumento, 5, 6 y 7, entre el valor de antes.' }, '$\\tfrac{5}{10}$, $\\tfrac{6}{15}$ y $\\tfrac{7}{21}$: el último sube más unidades, pero el primero sube más en porcentaje.')],
  ], 'Mirar la escala, comparar con lo de antes y repartir los 360° de la torta.');
}
;
//#archivo js/explora-pu-gr-2.js
// Preuniversitario · pu-gr-2 «Promedio, mediana y moda» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barras que se nivelan: t = 0 los datos, t = 1 todos en el promedio.
  const nivel = (v, K) => { const d = v.d, n = d.length, m = d.reduce((a, b) => a + b, 0) / n, u = 12, w = 220 / n; let h = K.l(40, 170, 300, 170, 'lm'); d.forEach((x, i) => { const y = x + (m - x) * v.t; h += K.r(60 + i * w + 5, 170 - y * u, w - 10, y * u, 'fa', 3) + K.t(60 + (i + 0.5) * w, 188, v.t > 0.98 ? N(m) : x, 's'); }); return h + K.f(v.l, K.l(50, 170 - m * u, 296, 170 - m * u, 'lg d') + K.t(300, 170 - m * u + 5, N(m), 'tg', 'start')); };
  const fila = (n, y = 84) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * 60, y, w: 52 }));
  // Balanza: grupos de n personas sentadas en su valor, y el apoyo.
  const bal = (v, K) => { const X = x => 30 + x * 28, y = 130; let h = K.l(X(0), y, X(10), y, 'gr'); for (let k = 0; k <= 10; k++) h += K.l(X(k), y, X(k), y + 5, 'lm') + K.t(X(k), y + 20, k, 's tm'); v.g.forEach(([n, x], j) => { for (let i = 0; i < n; i++) h += K.c(X(x), y - 10 - i * 17, 8, j ? 'fG' : 'fA'); }); return h + K.f(v.a ?? 1, K.p([[X(v.x), y + 26], [X(v.x) - 14, y + 50], [X(v.x) + 14, y + 50]], 'fF')); };

  xpLec('pu-gr-2', [
    ['Promedio: nivelar',
      xpMira('dibujo', 'Empecemos por la idea: el promedio es **repartir por igual**.', { dib: nivel, v: { d: [2, 8, 5, 9], t: 0, l: 0 }, alto: 200 }, [
        ['Cuatro amigos tienen 2, 8, 5 y 9 láminas.', {}],
        ['Las juntan todas: son 24.', {}, '$2 + 8 + 5 + 9 = 24$'],
        ['Y las reparten por igual: a cada uno le tocan 6. Ese es el promedio.', { t: 1, l: 1 }, '$24 \\div 4 = 6$'],
        ['Lo que les sobra a unos llena lo que les falta a otros.', { t: 0 }],
        ['Nadie tenía 6: el promedio no tiene que ser uno de los datos.', {}],
      ], 'Promedio = suma de todos ÷ cuántos son. Es el nivel donde todo queda parejo.'),
      xpHaz('dibujo', 'Los datos son 5, 10, 6 y uno más. Súbelo hasta que el promedio sea 8.', { dib: (v, K) => nivel({ d: [5, 10, 6, v.x], t: 0, l: 1 }, K), v: { x: 1 }, metas: { x: 11 }, alto: 200, manijas: [{ k: 'x', min: 0, max: 13, paso: 1, r: 10, en: v => [60 + 3.5 * 55, 170 - v.x * 12], de: (x, y) => (170 - y) / 12 }],
        lee: v => `$\\tfrac{5 + 10 + 6 + ${v.x}}{4} = ${N((21 + v.x) / 4)}$`, dice: v => `La suma va en ${21 + v.x}. Para promedio 8 con 4 datos debe ser 32.` }, '$4 \\cdot 8 = 32$ y $32 - 21 = 11$.')],
    ['Mediana y moda',
      xpMira('fichas', 'Segunda idea: la **mediana** es el del medio y la **moda**, el más repetido.', { slots: fila(5), fichas: ['30', '3', '5', '3', '2'], alto: 122, fondo: (K, v) => K.t(170, 34, v.p || '', 'ta') }, [
        ['Cinco salarios. Para la mediana hay que ponerlos en orden.', { pon: { 0: '2', 1: '3', 2: '3', 3: '5', 4: '30' } }],
        ['La mediana es el del medio: dos a un lado y dos al otro. Es 3.', { marca: [2], v: { p: 'mediana 3' } }],
        ['La moda es el que más se repite: también 3.', { marca: [1, 2], v: { p: 'moda 3' } }],
        ['El promedio es 43 entre 5: 8.6. El 30 lo jala hacia arriba.', { marca: [4], v: { p: 'promedio 8.6' } }, '$43 \\div 5 = 8.6$'],
        ['Un dato exagerado mueve el promedio, pero casi no mueve la mediana.', { v: { p: 'promedio 8.6 · mediana 3' } }],
      ], 'Mediana: ordena y toma el del medio (con cantidad par, el promedio de los dos del medio). Moda: el más repetido.'),
      xpHaz('fichas', 'Los datos son 9, 3, 14, 3, 6 y 7. Pon el promedio, la mediana y la moda.', { slots: [{ x: 62, y: 58, w: 92, et: 'promedio' }, { x: 170, y: 58, w: 92, et: 'mediana' }, { x: 278, y: 58, w: 92, et: 'moda' }], fichas: ['7', '6.5', '3', '6', '14', '8.5'], meta: ['7', '6.5', '3'], alto: 106, pista: 'Ordena: 3, 3, 6, 7, 9, 14. Hay dos en el medio.' }, 'Suma 42 entre 6 es 7; en el medio están 6 y 7: 6.5; y el 3 se repite.')],
    ['No todos pesan igual',
      xpMira('dibujo', 'Tercera idea: si un grupo es más grande, **jala más** el promedio.', { dib: bal, v: { g: [[1, 2], [1, 10]], x: 6, a: 1 }, alto: 190 }, [
        ['Una persona con 2 y otra con 10. La tabla se equilibra en el centro: 6.', {}, '$\\tfrac{2 + 10}{2} = 6$'],
        ['Si en el 10 hay tres personas, el equilibrio se corre hacia ellas.', { g: [[1, 2], [3, 10]], x: 8 }],
        ['Cada una cuenta: 2 más tres veces 10 son 32, entre cuatro personas, 8.', {}, '$\\tfrac{2 + 3 \\cdot 10}{4} = 8$'],
        ['No es el promedio de 2 y 10: hay que multiplicar cada valor por cuántos lo tienen.', {}, '$8 \\neq 6$'],
      ], 'Promedio de grupos: (valor × cuántos) de cada grupo, sumado, entre el total de personas.'),
      xpHaz('dibujo', 'Un grupo de 1 persona sacó 3 y otro de 3 personas sacó 7. Mueve el apoyo al punto de equilibrio.', { dib: (v, K) => bal({ g: [[1, 3], [3, 7]], x: v.x }, K), v: { x: 4 }, metas: { x: 6 }, alto: 190, manijas: [{ k: 'x', min: 0, max: 10, paso: 0.5, r: 11, en: v => [30 + v.x * 28, 172], de: x => (x - 30) / 28 }],
        lee: () => '$\\tfrac{1 \\cdot 3 + 3 \\cdot 7}{4}$', dice: v => (v.x < 6 ? 'Todavía pesa más el lado del 7: córrelo hacia allá.' : v.x > 6 ? 'Te pasaste: ahora pesa más el lado del 3.' : 'En equilibrio.') }, '$\\tfrac{3 + 21}{4} = 6$, más cerca del grupo grande.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El promedio de 5 números es 12. Se quita uno y el promedio de los que quedan es 11. Pon las dos sumas y el que se quitó.', { slots: [{ x: 62, y: 58, w: 92, et: 'suma de 5' }, { x: 170, y: 58, w: 92, et: 'suma de 4' }, { x: 278, y: 58, w: 92, et: 'se quitó' }], fichas: ['60', '44', '16', '1', '55', '48'], meta: ['60', '44', '16'], alto: 106, pista: 'Suma = promedio por cuántos son: 5 · 12 y 4 · 11.' }, '$60 - 44 = 16$.')],
  ], 'Nivelar, ordenar para hallar el del medio, contar repetidos y dejar que el grupo grande pese más.');
}
;
//#archivo js/explora-pu-gr-3.js
// Preuniversitario · pu-gr-3 «Qué se puede concluir» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos barras con el eje empezando en f.
  const eje = (v, K) => { const H = 136, Y = x => 170 - Math.max(0, (x - v.f) / (v.top - v.f)) * H; return [0, 0.5, 1].map(t => { const x = v.f + (v.top - v.f) * t; return K.l(60, Y(x), 310, Y(x), 'ls') + K.t(52, Y(x) + 4, Math.round(x), 's tm', 'end'); }).join('') + K.r(90, Y(v.a), 70, 170 - Y(v.a), 'fa') + K.r(210, Y(v.b), 70, 170 - Y(v.b), 'fg') + K.t(125, 188, `A: ${v.a}`, 's') + K.t(245, 188, `B: ${v.b}`, 's'); };
  const grupo = (K, x, y, n, k, cols, u, cls) => { let h = ''; for (let i = 0; i < n; i++) h += K.c(x + (i % cols) * u, y + Math.floor(i / cols) * u, u * 0.36, i < k ? cls : 'fc'); return h; };
  // Ciudad de 10 × 10: al oeste casi todos opinan que sí. La muestra es un rectángulo o un puñado repartido.
  const SI = i => (i % 10) < (Math.floor(i / 10) % 2 ? 4 : 5), REP = [3, 12, 18, 27, 34, 41, 50, 59, 66, 72, 75, 88, 93, 97, 9, 20];
  const ciudad = (v, K) => { let h = ''; for (let i = 0; i < 100; i++) { const x = 70 + (i % 10) * 18, y = 18 + Math.floor(i / 10) * 17, en = v.m < 0.5 ? false : v.m < 1.5 ? i % 10 < 4 && i < 40 : REP.includes(i); h += K.c(x, y, 5.5, SI(i) ? 'fA' : 'fG') + (en ? K.c(x, y, 8.5, 'fn') : ''); } return h + K.t(258, 80, v.p || '', 'ta', 'start') + K.t(258, 104, v.q || '', 's tm', 'start'); };
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];

  xpLec('pu-gr-3', [
    ['El eje que engaña',
      xpMira('dibujo', 'Empecemos por la idea: si el eje no empieza en 0, la diferencia **se agranda**.', { dib: eje, v: { a: 96, b: 100, f: 94, top: 102 }, alto: 200 }, [
        ['La barra B parece tres veces más alta que la A.', {}],
        ['Pero mira el eje: empieza en 94, no en 0.', {}],
        ['Bajemos el eje hasta 0. Las barras casi son iguales: 96 y 100.', { f: 0 }],
        ['La diferencia es de 4, apenas un poco más del 4 %.', {}, '$\\tfrac{4}{96} \\approx 4.2\\,\\%$'],
      ], 'Antes de comparar alturas, mira dónde empieza el eje. Compara los números, no el dibujo.'),
      xpHaz('dibujo', 'A vende 60 y B vende 70. Sube el piso del eje hasta que B **parezca** el doble de alta que A.', { dib: eje, v: { a: 60, b: 70, f: 0, top: 72 }, metas: { f: 50 }, alto: 250, manijas: [{ k: 'f', min: 0, max: 58, paso: 2, et: 'el eje empieza en' }],
        lee: v => `$\\tfrac{70 - ${v.f}}{60 - ${v.f}} = ${N((70 - v.f) / (60 - v.f))}$`, dice: v => `Con el piso en ${v.f}, las barras miden ${60 - v.f} y ${70 - v.f}.` }, 'Con el piso en 50 miden 10 y 20: parece el doble, y en realidad es un 17 % más.')],
    ['Cantidad no es proporción',
      xpMira('dibujo', 'Segunda idea: para comparar grupos de **distinto tamaño**, usa la proporción.', { dib: (v, K) => grupo(K, 40, 50, 40, 20, 8, 15, 'fA') + grupo(K, 190, 50, 100, 30, 10, 15, 'fG') + K.t(92, 30, '20 de 40', 'ta') + K.t(258, 30, '30 de 100', 'tg') + K.f(v.p, K.t(92, 146, '50 %', 'b ta') + K.t(258, 216, '30 %', 'b tg')), v: { p: 0 }, alto: 225 }, [
        ['En un salón, 20 tocan guitarra. En otro, 30. ¿Dónde hay más afición?', {}],
        ['30 es más que 20, pero el segundo salón es mucho más grande.', {}],
        ['Miremos de cada cien: 20 de 40 es la mitad; 30 de 100 es el 30 %.', { p: 1 }, '$\\tfrac{20}{40} = 50\\,\\% \\quad \\tfrac{30}{100} = 30\\,\\%$'],
        ['En proporción, hay más afición en el salón pequeño.', {}],
      ], 'La cantidad cuenta cuántos; la proporción dice cuántos **de cada cien**.'),
      xpHaz('fichas', 'En el barrio P reciclan 24 de 80 casas; en el Q, 18 de 45. Pon los porcentajes y dónde es mayor la proporción.', { slots: [{ x: 62, y: 58, w: 92, et: 'barrio P' }, { x: 170, y: 58, w: 92, et: 'barrio Q' }, { x: 278, y: 58, w: 92, et: 'mayor en' }], fichas: ['30 %', '40 %', 'P', 'Q', '24 %', '18 %'], meta: ['30 %', '40 %', 'Q'], alto: 106, pista: 'Divide cada cantidad entre el total de su barrio.' }, '$\\tfrac{24}{80} = 30\\,\\%$ y $\\tfrac{18}{45} = 40\\,\\%$: recicla más, en proporción, el Q.')],
    ['¿A quién se le preguntó?',
      xpMira('dibujo', 'Tercera idea: una **muestra** sirve si se parece a todos.', { dib: ciudad, v: { m: 0, p: '', q: '' }, alto: 190 }, [
        ['Una ciudad de 100 personas. Las verdes dicen que sí: son 45.', { p: '45 %', q: 'de verdad' }],
        ['Un periodista pregunta solo en un barrio, arriba a la izquierda.', { m: 1, p: '', q: '' }],
        ['Allí todos dicen que sí. Anuncia: «el 100 % está de acuerdo».', { p: '100 %', q: 'según él' }],
        ['Si escoge personas por toda la ciudad, al azar, se acerca mucho más.', { m: 2, p: '7 de 16', q: 'el 44 %' }, '$\\tfrac{7}{16} \\approx 44\\,\\%$'],
        ['Una muestra de un solo lugar no representa a todos, aunque sea grande.', {}],
      ], 'Una muestra representa a todos si se escoge al azar y de todas partes.'),
      xpHaz('fichas', 'Se quiere saber cuánto leen **todos** los estudiantes de un colegio. ¿Qué muestras sirven?', { slots: Z('sirve', 'no sirve'), fichas: ['en la biblioteca', 'lista al azar', 'solo grado once', 'sorteo en todos'], meta: [['lista al azar', 'sorteo en todos'], ['en la biblioteca', 'solo grado once']], alto: 138, pista: '¿Todos tienen la misma oportunidad de salir?' }, 'En la biblioteca y en un solo grado quedan por fuera muchos; el azar por todo el colegio no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A 200 clientes escogidos al azar se les preguntó: 120 prefieren té. ¿Qué se concluye de esos datos?', { slots: Z('se concluye', 'no se concluye'), fichas: ['60 % de la muestra', 'todos toman té', '80 no lo prefieren', 'es por el frío'], meta: [['60 % de la muestra', '80 no lo prefieren'], ['todos toman té', 'es por el frío']], alto: 138, pista: 'Los datos dicen cuántos; no dicen por qué, ni hablan de todos.' }, '120 de 200 es el 60 % y 80 no lo eligieron. Ni el motivo ni «todos» salen de esos números.')],
  ], 'Mirar el eje, comparar proporciones y preguntar a quién se le preguntó.');
}
;
//#archivo js/explora-pu-se-1.js
// Preuniversitario · pu-se-1 «Sucesiones numéricas» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Términos en fichas con arcos que dicen qué pasa de uno a otro (v.op: rótulos; v.d, v.d2: qué tanto se ven).
  const suc = (v, K) => {
    const T = v.t, n = T.length, w = Math.min(58, 320 / n), X = i => 170 + (i - (n - 1) / 2) * w; let h = '';
    T.forEach((t, i) => { const c = v.col ? ['fa', 'fg'][i % 2] : t === '?' ? 'fg' : 'fa'; h += K.r(X(i) - w / 2 + 4, 110, w - 8, 38, c, 9) + K.t(X(i), 135, t, v.col ? ['ta', 'tg'][i % 2] : ''); });
    const arc = (a, b, y, hh, cl = 'la') => `<path class="xl ${cl}" d="M${K.n(a)} ${y} Q${K.n((a + b) / 2)} ${y - hh} ${K.n(b)} ${y}"/>`;
    const s = v.col ? 2 : 1;
    let A = ''; for (let i = 0; i + s < n; i++) if (v.op[i] != null && v.op[i] !== '') A += arc(X(i) + 4, X(i + s) - 4, 106, v.col ? 60 : 34, v.col && i % 2 ? 'lg' : 'la') + K.t((X(i) + X(i + s)) / 2, v.col ? (i % 2 ? 52 : 68) : 80, v.op[i], v.col ? ['ta', 'tg'][i % 2] : 'ta');
    let B = ''; if (v.op2) v.op2.forEach((t, i) => { B += arc((X(i) + X(i + 1)) / 2 + 3, (X(i + 1) + X(i + 2)) / 2 - 3, 66, 26, 'lg') + K.t(X(i + 1), 44, t, 'tg'); });
    return h + K.f(v.d, A) + K.f(v.d2 ?? 0, B);
  };

  xpLec('pu-se-1', [
    ['Siempre se suma lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: para ver una sucesión, mira **qué pasa** de un término al otro.', { dib: suc, v: { t: ['4', '11', '18', '25'], op: ['+7', '+7', '+7'], d: 0 }, alto: 165 }, [
        ['Una sucesión es una fila de números con una regla escondida.', {}],
        ['De 4 a 11 se suma 7. De 11 a 18, otra vez 7. Siempre 7.', { d: 1 }],
        ['El que sigue es 25 más 7: treinta y dos.', { t: ['4', '11', '18', '25', '32'], op: ['+7', '+7', '+7', '+7'] }, '$25 + 7 = 32$'],
        ['¿Y el décimo? Desde el primero hasta el décimo hay 9 saltos, no 10.', {}, '$10 - 1 = 9$'],
        ['Entonces es 4 más 9 saltos de 7: sesenta y siete.', {}, '$4 + 9 \\cdot 7 = 67$'],
      ], 'Término n = primero + (n − 1) saltos. Los saltos son uno menos que los términos.'),
      xpHaz('fichas', 'La sucesión es 8, 14, 20, 26… Arma el término 12: saltos, lo que avanzan y el término.', { slots: [{ x: 62, y: 56, w: 92, et: 'saltos' }, { x: 170, y: 56, w: 92, et: 'avanzan' }, { x: 278, y: 56, w: 92, et: 'término 12' }], fichas: ['11', '66', '74', '12', '72', '80'], meta: ['11', '66', '74'], alto: 104, pista: 'Del primero al doce hay 11 saltos de 6.' }, '$11 \\cdot 6 = 66$ y $8 + 66 = 74$.')],
    ['Los saltos también cambian',
      xpMira('dibujo', 'Segunda idea: si los saltos no son iguales, mira **los saltos de los saltos**.', { dib: suc, v: { t: ['1', '3', '7', '13', '21'], op: ['+2', '+4', '+6', '+8'], op2: ['+2', '+2', '+2'], d: 0, d2: 0 }, alto: 165 }, [
        ['Aquí no se suma siempre lo mismo.', {}],
        ['Los saltos son 2, 4, 6 y 8. ¡Los saltos forman otra sucesión!', { d: 1 }],
        ['Cada salto crece de 2 en 2.', { d2: 1 }],
        ['El salto que sigue es 10, y el término, 21 más 10: treinta y uno.', { t: ['1', '3', '7', '13', '21', '31'], op: ['+2', '+4', '+6', '+8', '+10'], op2: ['+2', '+2', '+2', '+2'] }, '$21 + 10 = 31$'],
      ], 'Escribe las diferencias. Si no son iguales, busca la regla de las diferencias.'),
      xpHaz('fichas', 'Pon los saltos que faltan y el término que sigue en 5, 6, 9, 14, 21.', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 54, y: 46, w: 48, h: 36 })).concat([{ x: 300, y: 98, w: 48, h: 36 }]), fijas: { 0: '+1', 1: '+3' }, fichas: ['+5', '+7', '+9', '30', '28', '+8'], meta: ['+1', '+3', '+5', '+7', '+9', '30'], alto: 126, fondo: K => [5, 6, 9, 14, 21].map((t, i) => K.t(24 + i * 54, 103, t, 'b')).join(''), pista: 'De 9 a 14 hay 5, de 14 a 21 hay 7. ¿Qué salto sigue?' }, 'Los saltos son 1, 3, 5, 7 y 9: el que sigue es $21 + 9 = 30$.')],
    ['Otras reglas',
      xpMira('dibujo', 'Tercera idea: tres reglas más que **aparecen mucho**.', { dib: suc, v: { t: ['2', '6', '18', '54'], op: ['×3', '×3', '×3'], d: 1, col: 0 }, alto: 165 }, [
        ['A veces se multiplica: cada término es 3 veces el anterior. Sigue 162.', {}, '$54 \\cdot 3 = 162$'],
        ['A veces se suman los dos anteriores: 1 más 4 son 5, 4 más 5 son 9, 5 más 9 son 14.', { t: ['1', '4', '5', '9', '14'], op: ['', '', '', ''] }, '$9 + 14 = 23$'],
        ['Y a veces hay dos sucesiones mezcladas, una por turno.', { t: ['3', '50', '6', '45', '9', '40'], op: ['+3', '−5', '+3', '−5', '', ''], col: 1 }],
        ['Los lugares impares suben de 3 en 3; los pares bajan de 5 en 5. Sigue el 12.', { t: ['3', '50', '6', '45', '9', '40', '12'], op: ['+3', '−5', '+3', '−5', '+3', '', ''] }, '$9 + 3 = 12$'],
      ], 'Prueba: ¿se suma?, ¿se multiplica?, ¿se suman los dos anteriores?, ¿son dos mezcladas?'),
      xpHaz('fichas', 'Hay dos sucesiones mezcladas: 7, 60, 9, 55, 11, 50. Pon los dos términos que siguen.', { slots: [{ x: 248, y: 62, w: 56 }, { x: 310, y: 62, w: 56 }], fichas: ['13', '45', '12', '49', '40'], meta: ['13', '45'], alto: 104, fondo: K => [7, 60, 9, 55, 11, 50].map((t, i) => K.t(24 + i * 35, 67, t, i % 2 ? 'b tg' : 'b ta')).join(''), pista: 'Salta de uno en uno: 7, 9, 11 por un lado y 60, 55, 50 por el otro.' }, 'Una sube de 2 en 2, $11 + 2 = 13$; la otra baja de 5 en 5, $50 - 5 = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En 1, 2, 6, 24… cada paso multiplica por un número distinto. Pon los multiplicadores y el término que sigue.', { slots: [0, 1, 2, 3].map(i => ({ x: 66 + i * 62, y: 46, w: 54, h: 36 })).concat([{ x: 290, y: 98, w: 56, h: 36 }]), fichas: ['×2', '×3', '×4', '×5', '120', '48', '×6'], meta: ['×2', '×3', '×4', '×5', '120'], alto: 126, fondo: K => [1, 2, 6, 24].map((t, i) => K.t(36 + i * 62, 103, t, 'b')).join(''), pista: 'De 1 a 2 es por 2, de 2 a 6 es por 3. ¿Y de 6 a 24?' }, 'Por 2, por 3, por 4 y ahora por 5: $24 \\cdot 5 = 120$.')],
  ], 'Mira los saltos, los saltos de los saltos, los productos y las sucesiones mezcladas.');
}
;
//#archivo js/explora-pu-se-2.js
// Preuniversitario · pu-se-2 «Letras y figuras» (Explora). Los ejemplos no son los de los ejercicios.
{
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = i => 22 + (i % 13) * 24.6, LY = i => (i < 13 ? 70 : 132);
  // Alfabeto en dos filas con las letras marcadas.
  const abc = (v, K) => [...ABC].map((l, i) => { const on = v.m.includes(l); return K.c(LX(i), LY(i), 11.5, on ? 'fA' : 'fc') + K.t(LX(i), LY(i) + 5, l, on ? 'tc s' : 's') + K.f(v.num, K.t(LX(i), LY(i) + 27, i + 1, 's tm')); }).join('') + K.t(170, 30, v.p || '', 'b ta');
  // Cruz de brazos n: 4n + 1 puntos.
  const cruz = (v, K) => { const n = Math.round(v.n), u = Math.min(22, 90 / n); let h = K.c(170, 110, u * 0.4, 'fG'); for (let k = 1; k <= n; k++) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) h += K.c(170 + a * k * u, 110 + b * k * u, u * 0.4, 'fA'); return h + K.t(40, 30, `figura ${n}`, 'tm', 'start') + K.t(300, 30, 4 * n + 1, 'b ta'); };
  // Marco de puntos alrededor de un cuadrado de lado n: 4n + 4.
  const marco = (v, K) => { const n = v.n, s = n + 2, u = Math.min(22, 168 / s); let h = ''; for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) { const b = i === 0 || j === 0 || i === s - 1 || j === s - 1; h += K.c(170 + (i - (s - 1) / 2) * u, 100 + (j - (s - 1) / 2) * u, u * 0.36, b ? 'fA' : 'fc'); } return h + K.t(20, 28, `figura ${n}`, 'tm', 'start') + K.t(316, 28, 4 * n + 4, 'b ta', 'end'); };
  // n mesas cuadradas en fila con sus sillas.
  const mesas = (v, K) => { const n = v.n, u = Math.min(40, 270 / n), x0 = 170 - n * u / 2; let h = ''; for (let i = 0; i < n; i++) h += K.r(x0 + i * u, 80, u, u, 'fg') + K.c(x0 + (i + 0.5) * u, 80 - u * 0.4, u * 0.24, 'fA') + K.c(x0 + (i + 0.5) * u, 80 + u * 1.4, u * 0.24, 'fA'); return h + K.c(x0 - u * 0.4, 80 + u / 2, u * 0.24, 'fA') + K.c(x0 + n * u + u * 0.4, 80 + u / 2, u * 0.24, 'fA') + K.t(170, 34, `${n} ${n === 1 ? 'mesa' : 'mesas'} · ${2 * n + 2} sillas`, 'ta'); };

  xpLec('pu-se-2', [
    ['Las letras son números',
      xpMira('dibujo', 'Empecemos por la idea: cada letra tiene su **lugar** en el alfabeto.', { dib: abc, v: { m: '', num: 0, p: '' }, alto: 172 }, [
        ['El alfabeto de 26 letras, sin Ñ. Cada letra tiene un número: A es 1, B es 2…', { num: 1 }],
        ['La secuencia A, C, F, J parece rara con letras.', { m: 'ACFJ', p: 'A · C · F · J' }],
        ['Con números se ve mejor: 1, 3, 6, 10.', { p: '1 · 3 · 6 · 10' }],
        ['Los saltos son 2, 3 y 4. El que sigue es 5: 10 más 5 son 15.', { p: '+2, +3, +4, +5' }, '$10 + 5 = 15$'],
        ['La letra 15 es la O.', { m: 'ACFJO', p: 'A · C · F · J · O' }],
      ], 'Cambia las letras por su lugar en el alfabeto y busca la regla de los números.'),
      xpHaz('dibujo', 'La secuencia es B, D, G, K. Lleva el señalador hasta la letra que sigue.', { dib: (v, K) => abc({ m: 'BDGK', num: 1, p: 'B · D · G · K · ?' }, K), v: { i: 12 }, metas: { i: 15 }, alto: 172,
        manijas: [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[v.i], en: v => [LX(Math.round(v.i)), LY(Math.round(v.i))], de: (x, y) => xpClamp(Math.round((x - 22) / 24.6), 0, 12) + (y > 101 ? 13 : 0) }],
        lee: v => `$2, \\; 4, \\; 7, \\; 11, \\; ${v.i + 1}$`, dice: v => `La ${ABC[v.i]} es la letra ${v.i + 1}. De K a ${ABC[v.i]} hay un salto de ${v.i - 10}.` }, 'Los saltos son 2, 3, 4 y 5: $11 + 5 = 16$, la P.')],
    ['Figuras que crecen',
      xpMira('dibujo', 'Segunda idea: en las figuras, cuenta lo que se **agrega** cada vez.', { dib: cruz, v: { n: 1 }, alto: 210 }, [
        ['La figura 1 es una cruz de 5 puntos: uno en el centro y 4 alrededor.', {}, '$5$'],
        ['La figura 2 alarga cada brazo un punto: agrega 4.', { n: 2 }, '$5 + 4 = 9$'],
        ['La 3 agrega otros 4: trece.', { n: 3 }, '$9 + 4 = 13$'],
        ['El centro es 1 y cada figura tiene 4 brazos de n puntos: 4n + 1.', {}, '$4n + 1$'],
        ['La figura 6 tiene 4 por 6, más 1: veinticinco.', { n: 6 }, '$4 \\cdot 6 + 1 = 25$'],
      ], 'Busca la parte fija y la que crece: aquí 1 fijo y 4 más en cada figura, $4n + 1$.'),
      xpHaz('dibujo', 'Un marco de puntos rodea un cuadrado. Agranda la figura hasta que el marco tenga 36 puntos.', { dib: marco, v: { n: 1 }, metas: { n: 8 }, alto: 245, manijas: [{ k: 'n', min: 1, max: 10, paso: 1, et: 'figura' }],
        lee: v => `$4 \\cdot ${v.n} + 4 = ${4 * v.n + 4}$`, dice: v => `Cuatro lados de ${v.n} y cuatro esquinas: ${4 * v.n + 4}.` }, '$4n + 4 = 36$ cuando $n = 8$.')],
    ['Dos reglas a la vez',
      xpMira('dibujo', 'Tercera idea: si hay **letras y números** juntos, son dos reglas aparte.', { dib: (v, K) => v.l.map((l, i) => K.r(22 + i * 62, 60, 54, 48, 'fc', 10) + K.t(38 + i * 62, 92, l, 'b ta') + K.t(60 + i * 62, 92, v.n[i], 'b tg')).join('') + K.f(v.a, K.t(170, 40, 'letras: +1', 'ta')) + K.f(v.b, K.t(170, 136, 'números: ×2', 'tg')), v: { l: ['K', 'L', 'M', 'N'], n: ['5', '10', '20', '40'], a: 0, b: 0 }, alto: 150 }, [
        ['K5, L10, M20, N40. No las mires juntas.', {}],
        ['Primero solo las letras: K, L, M, N. Avanzan de a una.', { a: 1 }],
        ['Ahora solo los números: 5, 10, 20, 40. Se duplican.', { b: 1 }],
        ['La que sigue junta las dos respuestas: O80.', { l: ['K', 'L', 'M', 'N', 'O'], n: ['5', '10', '20', '40', '80'] }, '$40 \\cdot 2 = 80$'],
      ], 'Separa las letras de los números, resuelve cada regla y junta las respuestas.'),
      xpHaz('fichas', 'Pon lo que sigue en Z1, X3, V6, T10: la letra y el número.', { slots: [{ x: 120, y: 58, w: 84, et: 'letra' }, { x: 220, y: 58, w: 84, et: 'número' }], fichas: ['R', 'S', 'Q', '15', '14', '20'], meta: ['R', '15'], alto: 106, pista: 'Las letras van hacia atrás de 2 en 2; los números suman 2, 3, 4…' }, 'Z, X, V, T, **R**; y 1, 3, 6, 10, **15** (se suma 5).')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una mesa cuadrada tiene 4 sillas; dos juntas en fila, 6; tres, 8. Arrastra: ¿cuántas mesas en fila hacen falta para 22 sillas?', { dib: mesas, v: { n: 1 }, metas: { n: 10 }, alto: 190, manijas: [{ k: 'n', min: 1, max: 13, paso: 1, et: 'mesas' }],
        lee: v => `$2 \\cdot ${v.n} + 2 = ${2 * v.n + 2}$`, dice: () => 'Cada mesa pone 2 sillas, y las dos puntas siempre están.' }, '$2n + 2 = 22$: diez mesas.')],
  ], 'Letras como números, figuras con una parte fija y otra que crece, y dos reglas por separado.');
}
;
//#archivo js/explora-pu-se-3.js
// Preuniversitario · pu-se-3 «Patrones cíclicos» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CC = ['fF', 'fG', 'fA', 'fM'];
  // Tira de cuentas en filas de c (el largo del ciclo) hasta la n.
  const filas = (v, K) => { const c = v.c, n = Math.round(v.n), u = Math.min(22, 170 / Math.ceil(v.max / c)); let h = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / c), x = 120 + (i % c) * 34, y = 24 + r * u; h += K.c(x, y, u * 0.4, i === n - 1 && v.ult ? 'fn gr' : CC[i % c]) + (i === n - 1 ? K.c(x, y, u * 0.4, CC[i % c]) + K.c(x, y, u * 0.62, 'fn') + K.t(x + 18, y + 5, n, 's', 'start') : ''); } return h; };
  const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
  // Rueda de n rótulos con un señalador en k (se puede pasar de una vuelta).
  const rueda = (K, R, k, de) => { const n = R.length, cy = 112; let h = K.c(170, cy, 84, 'fn'); R.forEach((t, i) => { const [x, y] = K.at(170, cy, 84, 90 - i * 360 / n), on = ((Math.round(k) % n) + n) % n === i; h += K.c(x, y, 19, on ? 'fA' : i === de ? 'fg' : 'fc') + K.t(x, y + 5, t, on ? 'tc s' : 's'); }); const p = K.at(170, cy, 52, 90 - k * 360 / n); return h + K.ar(170, cy, ...p, 'la gr'); };
  const faros = (v, K) => { const X = t => 24 + t * 12.2; let h = ''; [[v.a, 60, 'fF', 'tf'], [v.b, 112, 'fG', 'tg']].forEach(([m, y, cl, tc]) => { h += K.l(X(0), y, X(24), y, 'lm') + K.t(334, y - 14, `cada ${m} s`, `s ${tc}`, 'end'); for (let t = 0; t <= 24; t += m) h += K.c(X(t), y, 6, t <= v.t + 1e-9 ? cl : 'fc'); }); return h + K.l(X(v.t), 38, X(v.t), 128, 'la') + K.t(X(v.t), 30, `${K.sig(v.t)} s`, 'ta'); };

  xpLec('pu-se-3', [
    ['Lo que se repite, sobra',
      xpMira('dibujo', 'Empecemos por la idea: en un ciclo, las **vueltas completas** no cambian nada.', { dib: filas, v: { c: 4, n: 4, max: 30 }, alto: 205 }, [
        ['Un collar repite naranja, amarillo, verde y gris. Cuatro cuentas son una vuelta.', {}],
        ['Ponemos cada vuelta en una fila. La cuenta 8 vuelve a ser gris.', { n: 8 }],
        ['¿De qué color es la 30? Veintiocho son siete vueltas completas.', { n: 28 }, '$28 = 7 \\cdot 4$'],
        ['Sobran dos: la 30 es como la segunda. Amarilla.', { n: 30 }, '$30 = 7 \\cdot 4 + 2$'],
        ['Lo único que importa es el residuo. Si es 0, es el último del ciclo.', {}],
      ], 'Divide entre el largo del ciclo: el **residuo** dice el lugar. Residuo 0 es el último.'),
      xpHaz('dibujo', 'Hoy es martes. Gira la flecha hasta el día que será dentro de 38 días.', { dib: (v, K) => rueda(K, DIAS, v.k, 1), v: { k: 1 }, cumple: v => ((v.k % 7) + 7) % 7 === 4, sol: { k: 4 }, alto: 226,
        manijas: [{ k: 'k', min: -7, max: 46, paso: 1, r: 10, en: v => XPK.at(170, 112, 52, 90 - v.k * 360 / 7), de: (x, y, v) => { const k = (90 - Math.atan2(112 - y, x - 170) * 180 / Math.PI) / (360 / 7); return v.k + ((((k - v.k) % 7) + 10.5) % 7) - 3.5; } }],
        lee: () => '$38 = 5 \\cdot 7 + 3$', dice: () => 'Cinco semanas no cambian el día. Solo cuentan los días que sobran.' }, 'Sobran 3 días: de martes a viernes.')],
    ['La última cifra',
      xpMira('dibujo', 'Segunda idea: las **últimas cifras** de las potencias también dan vueltas.', { dib: (v, K) => rueda(K, ['3', '9', '7', '1'], v.k, -1) + K.t(8, 24, v.p, 'b ta', 'start'), v: { k: 0, p: '3¹ = 3' }, alto: 226 }, [
        ['Potencias de 3. La primera termina en 3.', {}],
        ['3 por 3 son 9. Luego 27, que termina en 7.', { k: 2, p: '3³ = 27' }],
        ['27 por 3 son 81: termina en 1.', { k: 3, p: '3⁴ = 81' }],
        ['81 por 3 son 243: otra vez 3. El ciclo es 3, 9, 7, 1, de largo 4.', { k: 4, p: '3⁵ = 243' }],
        ['Para 3 a la 50: 50 entre 4 deja residuo 2. Termina como 3 a la 2, en 9.', { k: 5, p: '3⁵⁰ → …9' }, '$50 = 12 \\cdot 4 + 2$'],
      ], 'Escribe las últimas cifras hasta que se repitan y usa el residuo del exponente.'),
      xpHaz('fichas', 'Las potencias de 8 terminan en 8, 4, 2, 6 y se repite. ¿En qué termina $8^{23}$? Pon el residuo y la cifra.', { slots: [{ x: 110, y: 58, w: 110, et: 'residuo de 23 ÷ 4' }, { x: 240, y: 58, w: 100, et: 'última cifra' }], fichas: ['3', '2', '1', '4', '6', '8'], meta: ['3', '2'], alto: 106, pista: '23 son 5 vueltas de 4 y sobran 3. La tercera del ciclo es…' }, '$23 = 5 \\cdot 4 + 3$: la tercera, 2.')],
    ['Dos ciclos a la vez',
      xpMira('dibujo', 'Tercera idea: dos ciclos **coinciden** cada cierto tiempo.', { dib: faros, v: { a: 4, b: 10, t: 0 }, alto: 145 }, [
        ['Dos faros se encienden juntos. Uno alumbra cada 4 segundos; el otro, cada 10.', {}],
        ['A los 4 y a los 8 alumbra solo el primero.', { t: 8 }],
        ['A los 10, solo el segundo. A los 12 y a los 16, solo el primero.', { t: 16 }],
        ['A los 20 alumbran los dos: es el primer múltiplo común de 4 y 10.', { t: 20 }, '$\\text{mcm}(4, 10) = 20$'],
      ], 'Dos ciclos vuelven a coincidir en el mínimo común múltiplo de sus largos.'),
      xpHaz('dibujo', 'Dos campanas suenan juntas al empezar: una cada 6 s y otra cada 9 s. Mueve el tiempo hasta que vuelvan a coincidir.', { dib: faros, v: { a: 6, b: 9, t: 3 }, metas: { t: 18 }, alto: 195, manijas: [{ k: 't', min: 1, max: 24, paso: 1, et: 'segundos' }],
        lee: v => `$${v.t} \\div 6 ${v.t % 6 ? '\\text{ no}' : '\\text{ sí}'} \\qquad ${v.t} \\div 9 ${v.t % 9 ? '\\text{ no}' : '\\text{ sí}'}$`, dice: v => (v.t % 6 === 0 && v.t % 9 === 0 ? 'Suenan las dos.' : v.t % 6 === 0 ? 'Suena solo la primera.' : v.t % 9 === 0 ? 'Suena solo la segunda.' : 'Ninguna suena en este segundo.') }, 'El primer múltiplo común de 6 y 9 es 18.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un letrero escribe PERAPERAPERA… sin parar. ¿Qué letra ocupa el lugar 63? Pon las vueltas completas, el residuo y la letra.', { slots: [{ x: 62, y: 58, w: 92, et: 'vueltas' }, { x: 170, y: 58, w: 92, et: 'residuo' }, { x: 278, y: 58, w: 92, et: 'letra' }], fichas: ['15', '3', 'R', 'A', 'E', '16', '2'], meta: ['15', '3', 'R'], alto: 106, pista: '15 vueltas son 60 letras. Faltan 3.' }, '$63 = 15 \\cdot 4 + 3$: la tercera letra de PERA, la R.')],
  ], 'Las vueltas completas sobran, el residuo manda, y dos ciclos coinciden en el mínimo común múltiplo.');
}
;
//#archivo js/explora-pu-lo-1.js
// Preuniversitario · pu-lo-1 «Conectivos y tablas de verdad» (Explora). Los ejemplos no son los de los ejercicios.
{
  const VF = ['', 'V', 'F'];
  // Circuito: en serie (y), en paralelo (o) o con un inversor (no). p y q: 0 abierto, 1 cerrado.
  const llave = (K, x, y, on, t) => K.c(x, y, 4, 'fk') + K.c(x + 52, y, 4, 'fk') + K.l(x, y, x + 52 - (on > 0.5 ? 0 : 6), y - (1 - on) * 26, on > 0.5 ? 'la gr' : 'gr') + K.t(x + 26, y + 22, t, 's');
  const foco = (K, x, y, on) => K.c(x, y, 20, on ? 'fG' : 'fc') + K.t(x, y + 6, on ? 'V' : 'F', on ? 'tc' : 'tm');
  const circ = (v, K) => {
    const p = v.p > 0.5, q = v.q > 0.5;
    if (v.m < 0.5) return K.l(20, 90, 70, 90) + llave(K, 70, 90, v.p, 'p') + K.l(122, 90, 160, 90) + llave(K, 160, 90, v.q, 'q') + K.l(212, 90, 262, 90) + foco(K, 284, 90, p && q);
    if (v.m < 1.5) return K.l(20, 90, 80, 90) + K.pl([[130, 50], [80, 50], [80, 130], [130, 130]]) + llave(K, 130, 50, v.p, 'p') + llave(K, 130, 130, v.q, 'q') + K.pl([[182, 50], [232, 50], [232, 130], [182, 130]]) + K.l(232, 90, 262, 90) + foco(K, 284, 90, p || q);
    return K.l(20, 90, 70, 90) + llave(K, 70, 90, v.p, 'p') + K.l(122, 90, 150, 90) + K.p([[150, 66], [150, 114], [200, 90]], 'fg') + K.t(168, 95, '¬', 'b') + K.l(200, 90, 262, 90) + foco(K, 284, 90, !p);
  };
  // Tabla de dos letras: las dos primeras columnas están dadas.
  const D = { 0: 1, 1: 1, 3: 1, 4: 2, 6: 2, 7: 1, 9: 2, 10: 2 };
  const tabla = (cols, o = {}) => ({ f: 4, c: cols.length, cols, estados: 3, rot: VF, unoAUno: true, cw: 62, ch: 38, dados: cols.length === 3 ? D : undefined, ...o });

  xpLec('pu-lo-1', [
    ['Y, o, no: tres circuitos',
      xpMira('dibujo', 'Empecemos por la idea: los conectivos funcionan como **interruptores**.', { dib: circ, v: { m: 0, p: 0, q: 0 }, alto: 160 }, [
        ['«p **y** q»: dos interruptores uno tras otro. Si están abiertos, el bombillo no prende.', {}],
        ['Con uno solo cerrado, tampoco: la corriente se corta en el otro.', { p: 1 }],
        ['Con los dos cerrados, prende. La «y» pide que se cumplan **ambas**.', { q: 1 }, '$p \\wedge q$'],
        ['«p **o** q»: dos caminos. Con uno cerrado ya prende; con los dos, también.', { m: 1, q: 0 }, '$p \\vee q$'],
        ['Solo se apaga si ninguno está cerrado.', { p: 0 }],
        ['«**no** p»: un inversor. Si p es falsa, prende.', { m: 2 }, '$\\neg p$'],
      ], '«y»: verdadera solo con ambas. «o»: falsa solo con ninguna. «no»: lo contrario.'),
      xpHaz('fichas', 'p es verdadera y q es falsa. Pon V o F en cada una.', { slots: [{ x: 66, y: 60, w: 76, et: 'p y q' }, { x: 170, y: 60, w: 76, et: 'p o q' }, { x: 274, y: 60, w: 76, et: 'no q' }], fichas: ['V', 'F'], repite: true, meta: ['F', 'V', 'V'], alto: 108, pista: '«y» pide ambas; a «o» le basta una.' }, 'p y q: falta q, F. p o q: basta p, V. No q: q es F, así que V.')],
    ['La tabla de verdad',
      xpMira('rejilla', 'Segunda idea: la tabla escribe **todos** los casos, uno por fila.', tabla(['p', 'q', 'p ∧ q']), [
        ['Con dos letras hay cuatro casos: las dos V, una y una, y las dos F.', {}, '$2 \\cdot 2 = 4$'],
        ['La columna de «p y q» se llena fila por fila. Primera: V y V, da V.', { on: [2] }],
        ['En las otras tres falta alguna: todas dan F.', { x: [5, 8, 11] }],
        ['Una frase larga se arma por partes, con una columna para cada pedazo.', {}],
        ['Con tres letras serían ocho filas: cada letra duplica los casos.', {}, '$2^3 = 8$'],
      ], 'Una fila por caso: con n letras, $2^n$ filas. Se llena por partes.'),
      xpHaz('rejilla', 'Llena la columna de $\\neg p \\wedge q$: es verdadera solo si p es falsa **y** q es verdadera.', tabla(['p', 'q', '¬p ∧ q'], { meta: { 2: 2, 5: 2, 8: 1, 11: 2 }, dice: () => 'Un toque pone V, otro pone F. Mira cada fila por aparte.', lleno: c => [2, 5, 8, 11].every(i => c[i]), pista: 'Busca la fila donde p es F y q es V: solo esa da V.' }), 'Solo la fila de p falsa y q verdadera da V.')],
    ['El condicional: una promesa',
      xpMira('rejilla', 'Tercera idea: «si p, entonces q» es una **promesa**.', tabla(['p', 'q', 'p → q']), [
        ['«Si te quedas, te preparo café». p: te quedas. q: hay café.', {}],
        ['Te quedas y hay café: cumplió. V.', { on: [2] }],
        ['Te quedas y no hay café: rompió la promesa. F.', { x: [5] }],
        ['No te quedas: la promesa no te cubría. Con café o sin café, nadie mintió. V y V.', { on: [8, 11] }],
        ['Solo es falsa en un caso: p verdadera y q falsa.', { luz: [3, 4, 5] }],
      ], '$p \\to q$ solo es falsa cuando p es verdadera y q es falsa.'),
      xpHaz('rejilla', 'Ahora al revés: llena la columna de $q \\to p$. La promesa la hace q.', tabla(['p', 'q', 'q → p'], { meta: { 2: 1, 5: 1, 8: 2, 11: 1 }, dice: () => 'Se rompe cuando q es V y p es F.', lleno: c => [2, 5, 8, 11].every(i => c[i]), pista: 'Busca la fila donde q es V y p es F: solo esa da F.' }), 'Se rompe en la tercera fila: q verdadera y p falsa.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'p es V, q es F y r es V. Halla el valor de cada pedazo y el de la frase completa.', { slots: [{ x: 66, y: 60, w: 76, et: 'p ∧ r' }, { x: 170, y: 60, w: 76, et: 'q ∨ ¬r' }, { x: 274, y: 60, w: 84, et: '(p∧r) → (q∨¬r)' }], fichas: ['V', 'F'], repite: true, meta: ['V', 'F', 'F'], alto: 108, pista: 'Primero los pedazos. Una V que promete una F rompe la promesa.' }, 'p ∧ r es V; q ∨ ¬r es F o F, o sea F. De V a F, el condicional es falso.')],
  ], '«Y» pide ambas, «o» se conforma con una, y el condicional solo falla si promete y no cumple.');
}
;
//#archivo js/explora-pu-lo-2.js
// Preuniversitario · pu-lo-2 «Negación y De Morgan» (Explora). Los ejemplos no son los de los ejercicios.
{
  const VF = ['', 'V', 'F'];
  // Dos conjuntos: zonas por máscara (1 = A, 2 = B, 3 = ambas, 0 = afuera) que se pintan.
  const AX = 135, BX = 205, CY = 92, R = 62;
  const venn = (v, K) => {
    // Afuera de la unión: se pinta todo y se tapan los círculos.
    let h = K.r(20, 10, 300, 166, v.fuera > 0.5 ? 'fa' : 'fc', 8);
    h += v.i > 0.5 ? '<path class="xf fop" d="M170 40.8 A62 62 0 0 1 170 143.2 A62 62 0 0 1 170 40.8 Z"/>' : K.c(AX, CY, R, 'fop') + K.c(BX, CY, R, 'fop');
    return h + K.c(AX, CY, R, v.A > 0.5 ? 'fa' : 'fn') + K.c(BX, CY, R, v.B > 0.5 ? 'fg' : 'fn') + K.t(AX - 34, CY - 68, v.ta, 's') + K.t(BX + 34, CY - 68, v.tb, 's') + K.t(170, 168, v.t || '', 'ta');
  };
  const focos = (v, K) => v.b.map((x, i) => K.c(50 + i * 60, 70, 21, x ? 'fG' : 'fc')).join('') + K.t(170, 128, v.t || '', 'b ta');
  const T = (cols, o) => ({ f: 4, c: 4, cols, estados: 3, rot: VF, unoAUno: true, cw: 70, ch: 38, dados: { 0: 1, 1: 1, 4: 1, 5: 2, 8: 2, 9: 1, 12: 2, 13: 2 }, ...o });

  xpLec('pu-lo-2', [
    ['Negar es decir lo contrario, completo',
      xpMira('dibujo', 'Empecemos por la idea: negar una frase es decir cuándo **deja de ser verdad**.', { dib: venn, v: { s: 0, i: 0, A: 1, B: 1, fuera: 0, ta: 'llueve', tb: 'hace frío', t: 'llueve o hace frío' }, alto: 184 }, [
        ['«Llueve o hace frío» es verdad en cualquiera de los dos círculos.', {}],
        ['¿Cuándo es falsa? Solo afuera de los dos: ni llueve ni hace frío.', { A: 0, B: 0, fuera: 1, t: 'no llueve y no hace frío' }],
        ['La negación de una «o» es una «y» de negaciones.', {}, '$\\neg(p \\vee q) = \\neg p \\wedge \\neg q$'],
        ['Con «llueve y hace frío» pasa al revés: basta que falle una para que sea falsa.', { t: 'no llueve o no hace frío', i: 1 }, '$\\neg(p \\wedge q) = \\neg p \\vee \\neg q$'],
        ['Son las leyes de De Morgan: se niega cada parte y se cambia el conectivo.', {}],
      ], 'De Morgan: niega cada parte y cambia «y» por «o» o «o» por «y».'),
      xpHaz('fichas', 'Arma la negación de «**compré pan o leche**».', { slots: [{ x: 170, y: 32, w: 190 }, { x: 170, y: 78, w: 60 }, { x: 170, y: 124, w: 190 }], fichas: ['no compré pan', 'no compré leche', 'y', 'o', 'compré pan'], cumple: q => q[1][0] === 'y' && [...q[0], ...q[2]].sort().join() === 'no compré leche,no compré pan', sol: ['no compré pan', 'y', 'no compré leche'], alto: 150, pista: 'Para que «pan o leche» sea falso deben faltar los dos.' }, 'No compré pan **y** no compré leche: tienen que faltar los dos.')],
    ['Comprobarlo con la tabla',
      xpMira('rejilla', 'Segunda idea: dos frases dicen lo mismo si sus columnas **coinciden**.', T(['p', 'q', '¬(p∧q)', '¬p∨¬q']), [
        ['Comparemos «no es cierto que p y q» con «no p o no q».', {}],
        ['«p y q» solo es verdad en la primera fila. Su negación, solo falsa ahí.', { x: [2], on: [6, 10, 14] }],
        ['Ahora «no p o no q»: en la primera fila las dos son verdaderas, así que es F.', { x: [3] }],
        ['En las demás alguna es falsa, y con eso basta: V, V y V.', { on: [7, 11, 15] }],
        ['Las dos columnas son iguales: dicen lo mismo.', { luz: [2, 3, 6, 7, 10, 11, 14, 15] }],
      ], 'Si las columnas coinciden en todas las filas, las frases son equivalentes.'),
      xpHaz('rejilla', 'La columna de $\\neg(p \\vee q)$ ya está. Llena la de $\\neg p \\wedge \\neg q$ y compara.', T(['p', 'q', '¬(p∨q)', '¬p∧¬q'], { dados: { 0: 1, 1: 1, 2: 2, 4: 1, 5: 2, 6: 2, 8: 2, 9: 1, 10: 2, 12: 2, 13: 2, 14: 1 }, meta: { 3: 2, 7: 2, 11: 2, 15: 1 }, dice: () => 'Es V solo si p es F y q es F.', lleno: c => [3, 7, 11, 15].every(i => c[i]), pista: 'Solo una fila tiene p falsa y q falsa.' }), 'F, F, F, V: igual que la otra columna.')],
    ['Todos, alguno, ninguno',
      xpMira('dibujo', 'Tercera idea: para tumbar un «**todos**» basta un solo caso.', { dib: focos, v: { b: [1, 1, 1, 1, 1], t: 'todos prendidos' }, alto: 145 }, [
        ['«Todos los bombillos están prendidos». Ahora es verdad.', {}],
        ['¿Qué es lo mínimo para que sea falsa? Apagar uno.', { b: [1, 1, 0, 1, 1], t: 'alguno apagado' }],
        ['Su negación es «alguno está apagado», no «todos están apagados».', {}],
        ['Ahora «alguno está prendido». Para tumbarla hay que apagarlos todos.', { b: [0, 0, 0, 0, 0], t: 'ninguno prendido' }],
        ['Todos contra alguno no; alguno contra ninguno. Esas son las parejas.', { t: 'alguno ↔ ninguno' }],
      ], 'La negación de «todos son» es «alguno no es». La de «alguno es», «ninguno es».'),
      xpHaz('rejilla', 'Un cartel dice «**ningún** bombillo está prendido». Vuélvelo falso tocando lo mínimo.', { f: 1, c: 6, cw: 50, ch: 50, rot: ['○', '●'], unoAUno: true, cumple: c => c.reduce((a, b) => a + b, 0) === 1, sol: [2], dice: c => { const n = c.reduce((a, b) => a + b, 0); return n === 0 ? 'Todos apagados: el cartel dice la verdad.' : n === 1 ? 'Con uno basta: ya es falso.' : 'Prendiste de más: con menos también era falso.'; } }, 'Con uno prendido ya es falso: la negación es «**alguno** está prendido».')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Arma la negación de «**todos pagaron y ninguno llegó tarde**».', { slots: [{ x: 170, y: 32, w: 190 }, { x: 170, y: 78, w: 60 }, { x: 170, y: 124, w: 190 }], fichas: ['alguno no pagó', 'alguno llegó tarde', 'o', 'y', 'nadie pagó'], cumple: q => q[1][0] === 'o' && [...q[0], ...q[2]].sort().join() === 'alguno llegó tarde,alguno no pagó', sol: ['alguno no pagó', 'o', 'alguno llegó tarde'], alto: 150, pista: 'La «y» pasa a «o»; «todos» pasa a «alguno no», y «ninguno», a «alguno».' }, 'Alguno no pagó **o** alguno llegó tarde: basta que falle una parte.')],
  ], 'Negar cada parte, cambiar el conectivo, y tumbar un «todos» con un solo caso.');
}
;
//#archivo js/explora-pu-lo-3.js
// Preuniversitario · pu-lo-3 «El condicional» (Explora). Los ejemplos no son los de los ejercicios.
{
  // «Si p, entonces q»: el círculo de p está dentro del de q. Un punto se mueve por las tres zonas.
  const C = [170, 104];
  const circ = (v, K) => K.c(...C, 88, v.lq > 0.5 ? 'fg' : 'fc') + K.c(C[0] - 18, C[1] + 12, 44, v.lp > 0.5 ? 'fa' : 'fc') + K.t(C[0], C[1] - 58, v.q, 'tg') + K.t(C[0] - 18, C[1] + 42, v.p, 'ta') + (v.pt === 0 ? '' : K.c(v.x, v.y, 8, 'fF'));
  const enP = v => Math.hypot(v.x - C[0] + 18, v.y - C[1] - 12) < 44, enQ = v => Math.hypot(v.x - C[0], v.y - C[1]) < 88;
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];

  xpLec('pu-lo-3', [
    ['Uno dentro del otro',
      xpMira('dibujo', 'Empecemos por la idea: «si p, entonces q» es un círculo **dentro** de otro.', { dib: circ, v: { p: 'abejas', q: 'insectos', lp: 0, lq: 0, x: 150, y: 108, pt: 0 }, alto: 206 }, [
        ['«Si es una abeja, es un insecto». Las abejas están dentro de los insectos.', {}],
        ['Estar en el círculo chico obliga a estar en el grande: ser abeja **basta** para ser insecto.', { pt: 1, lp: 1 }, '$p \\to q$'],
        ['Pero se puede ser insecto sin ser abeja: una hormiga.', { x: 225, y: 100, lp: 0, lq: 1 }],
        ['Y afuera del grande nadie puede ser abeja.', { x: 300, y: 60, lq: 0 }],
        ['p es suficiente para q; q es necesaria para p.', {}],
      ], '«Si p, entonces q»: p está dentro de q. p basta; q hace falta.'),
      xpHaz('dibujo', '«Si es de Cali, es colombiano». Lleva el punto a alguien que muestre que el **revés** es falso.', { dib: (v, K) => circ({ ...v, p: 'de Cali', q: 'colombianos', lp: 0, lq: 0, pt: 0 }, K), v: { x: 312, y: 30 }, cumple: v => enQ(v) && !enP(v), sol: { x: 226, y: 104 }, alto: 206,
        manijas: [{ k: ['x', 'y'], min: [20, 16], max: [320, 190], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }],
        lee: () => '', dice: v => (enP(v) ? 'Es de Cali y colombiano: cumple las dos, no sirve.' : enQ(v) ? 'Es colombiano y no es de Cali.' : 'No es colombiano: no dice nada del revés.') }, 'Un colombiano que no es de Cali muestra que «si es colombiano, es de Cali» es falso.')],
    ['La vuelta que sí vale',
      xpMira('dibujo', 'Segunda idea: el **contrarrecíproco** niega y voltea, y dice lo mismo.', { dib: circ, v: { p: 'corcho', q: 'flota', lp: 0, lq: 0, x: 150, y: 108, pt: 0 }, alto: 206 }, [
        ['«Si es corcho, flota». El corcho está dentro de lo que flota.', {}],
        ['Algo **no flota**: está afuera del círculo grande.', { pt: 1, x: 304, y: 50 }],
        ['Entonces tampoco puede estar en el chico: no es corcho.', {}, '$\\neg q \\to \\neg p$'],
        ['Eso es el contrarrecíproco: se niegan las dos partes y se cambian de lugar.', {}],
        ['Dice exactamente lo mismo que la frase original.', {}, '$(p \\to q) = (\\neg q \\to \\neg p)$'],
      ], '$p \\to q$ equivale a $\\neg q \\to \\neg p$: negar las dos y voltear.'),
      xpHaz('fichas', 'Arma el contrarrecíproco de «**si estudia, aprueba**».', { slots: [{ x: 170, y: 40, w: 170, et: 'entonces', ey: 42 }, { x: 170, y: 118, w: 170 }], fichas: ['no aprueba', 'no estudia', 'aprueba', 'estudia'], meta: ['no aprueba', 'no estudia'], alto: 146, fondo: K => K.t(54, 45, 'si', 'ta'), pista: 'Niega las dos partes y cámbialas de lugar.' }, 'Si no aprueba, entonces no estudia.')],
    ['Las dos trampas',
      xpMira('dibujo', 'Tercera idea: hay dos conclusiones que **parecen** válidas y no lo son.', { dib: circ, v: { p: 'abejas', q: 'insectos', lp: 0, lq: 1, x: 222, y: 100, pt: 1 }, alto: 206 }, [
        ['Trampa 1: «es un insecto, luego es una abeja». El punto puede estar aquí.', {}],
        ['O aquí. Con solo saber que está en el grande no se sabe.', { x: 152, y: 116 }],
        ['Trampa 2: «no es una abeja, luego no es un insecto».', { lq: 0, x: 236, y: 120 }],
        ['Falso: puede estar en el grande sin estar en el chico.', { lq: 1 }],
        ['Solo hay dos deducciones seguras: si pasa p, pasa q; si no pasa q, no pasa p.', { lq: 0, lp: 0, pt: 0 }],
      ], 'Seguras: de p se llega a q, y de «no q» a «no p». Con q o con «no p» no se concluye nada.'),
      xpHaz('fichas', '«Si hay partido, hay trancón». ¿Con cuáles datos se puede concluir algo seguro?', { slots: Z('se concluye', 'no se sabe'), fichas: ['hay partido', 'no hay trancón', 'hay trancón', 'no hay partido'], meta: [['hay partido', 'no hay trancón'], ['hay trancón', 'no hay partido']], alto: 138, pista: 'Solo sirven p y «no q».' }, 'Con partido hay trancón; sin trancón no hay partido. Los otros dos no dicen nada.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Cada tarjeta tiene letra por un lado y número por el otro. Regla: «si hay vocal, al otro lado hay par». ¿Cuáles hay que voltear para revisarla?', { f: 1, c: 4, cw: 70, ch: 74, celda: i => ['E', 'K', '4', '7'][i], unoAUno: true, meta: [0, 3], dice: c => (c[2] ? 'Con el 4: detrás puede haber vocal o consonante; nunca rompe la regla.' : c[1] ? 'La regla no habla de consonantes.' : 'Voltea solo las que podrían romper la regla.') }, 'La E (debe tener par) y el 7 (no puede tener vocal). El 4 y la K nunca la rompen.')],
  ], 'p dentro de q, el contrarrecíproco que vale, y las dos trampas que no.');
}
;
//#archivo js/explora-pu-lo-4.js
// Preuniversitario · pu-lo-4 «Cuantificadores y silogismos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const cir = (K, x, y, r, cls, t, ty) => K.c(x, y, r, cls) + K.t(x, y + (ty ?? 5), t, cls === 'fa' ? 'ta' : cls === 'fg' ? 'tg' : 'tf');
  const dos = (v, K) => cir(K, v.bx, v.by, v.br, 'fg', v.tb, -v.br + 22) + cir(K, v.ax, v.ay, v.ar, 'fa', v.ta, v.arriba ? -v.ar - 7 : v.ar > 40 ? -v.ar + 22 : 5) + K.f(v.x ?? 0, K.c(v.px ?? 170, v.py ?? 100, 7, 'fF')) + K.t(170, 196, v.t || '', '');
  const tres = (v, K) => cir(K, 130, 100, 86, 'fg', v.tb, -62) + cir(K, 118, 116, 42, 'fa', v.ta) + cir(K, v.cx, v.cy, v.cr, 'ff', v.tc, v.arriba ? -v.cr - 7 : 5);
  const rel = (v, ar, bx, by, br) => { const d = Math.hypot(v.x - bx, v.y - by); return d <= br - ar ? 'dentro' : d >= br + ar ? 'fuera' : 'cruza'; };
  const mano = { k: ['x', 'y'], min: [40, 56], max: [300, 160], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] };
  const Z = (a, b) => [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: a, ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: b, ey: -62 }];
  const base = { bx: 210, by: 100, br: 78, ax: 60, ay: 100, ar: 34, ta: 'A', tb: 'B' };

  xpLec('pu-lo-4', [
    ['Todos y ninguno',
      xpMira('dibujo', 'Empecemos por la idea: cada frase con «todos» o «ningún» es un **dibujo de círculos**.', { dib: dos, v: { ...base, ta: 'loros', tb: 'aves', t: '', x: 0, px: 258, py: 110 }, alto: 206 }, [
        ['«Todos los loros son aves»: el círculo de los loros va dentro del de las aves.', { ax: 200, ay: 110 }],
        ['No dice que todas las aves sean loros: hay espacio de sobra.', { x: 1, px: 258, py: 110 }],
        ['«Ningún pez es ave»: los círculos no se tocan.', { x: 0, ta: 'peces', ax: 62, ay: 100 }],
        ['«Ningún» se puede voltear: ningún ave es pez. Con «todos» no se puede.', {}],
      ], '«Todos los A son B»: A dentro de B. «Ningún A es B»: separados.'),
      xpHaz('dibujo', '«**Todas** las guitarras son instrumentos». Lleva el círculo de las guitarras a su sitio.', { dib: (v, K) => dos({ ...base, arriba: 1, ta: 'guitarras', tb: 'instrumentos', ax: v.x, ay: v.y }, K), v: { x: 80, y: 60 }, cumple: v => rel(v, 34, 210, 100, 78) === 'dentro', sol: { x: 210, y: 116 }, alto: 206, manijas: [mano], lee: () => '', dice: v => ({ dentro: 'Ninguna guitarra queda por fuera.', fuera: 'Así, ninguna guitarra sería instrumento.', cruza: 'Así, unas guitarras no serían instrumentos.' }[rel(v, 34, 210, 100, 78)]) }, 'Todas dentro: cada guitarra está en el círculo de los instrumentos.')],
    ['Algunos',
      xpMira('dibujo', 'Segunda idea: «**algunos**» quiere decir al menos uno en los dos.', { dib: dos, v: { ...base, ar: 60, br: 70, ax: 70, ta: 'músicos', tb: 'zurdos', t: '', x: 0, px: 165, py: 104 }, alto: 206 }, [
        ['«Algunos músicos son zurdos»: los círculos se cruzan.', { ax: 130 }],
        ['En la parte común hay al menos uno.', { x: 1, px: 165, py: 104 }],
        ['No dice que haya músicos que no sean zurdos: de esa zona no se sabe nada.', {}],
        ['Y se puede voltear: si algún músico es zurdo, algún zurdo es músico.', {}],
        ['«Algunos músicos no son zurdos» pone el punto en la otra parte.', { px: 100, py: 104 }],
      ], '«Algunos A son B»: hay al menos uno en la parte común. Se puede voltear.'),
      xpHaz('dibujo', '«**Algunos** bailarines son ingenieros, pero **no todos**». Acomoda el círculo.', { dib: (v, K) => dos({ ...base, arriba: 1, ar: 50, ta: 'bailarines', tb: 'ingenieros', ax: v.x, ay: v.y }, K), v: { x: 56, y: 80 }, cumple: v => rel(v, 50, 210, 100, 78) === 'cruza', sol: { x: 134, y: 100 }, alto: 206, manijas: [{ ...mano, min: [56, 72], max: [284, 150] }], lee: () => '', dice: v => ({ dentro: 'Así serían todos.', fuera: 'Así no sería ninguno.', cruza: 'Unos adentro y otros afuera.' }[rel(v, 50, 210, 100, 78)]) }, 'Se cruzan: unos quedan adentro y otros por fuera.')],
    ['Encadenar frases',
      xpMira('dibujo', 'Tercera idea: un **silogismo** une dos frases por el círculo que comparten.', { dib: tres, v: { ta: 'loros', tb: 'aves', tc: '', cx: 276, cy: 110, cr: 0 }, alto: 206 }, [
        ['«Todos los loros son aves» y «ninguna ave es mamífero». El círculo común es el de las aves.', {}],
        ['Los mamíferos quedan afuera de las aves.', { tc: 'mamíf.', cr: 44 }],
        ['Entonces también quedan afuera de los loros: ningún loro es mamífero.', {}],
        ['¿Y si los mamíferos tocaran a los loros? Tendrían que entrar en las aves, y eso no se puede.', { cx: 276 }],
        ['Una conclusión es segura si se cumple en **todos** los dibujos posibles.', {}],
      ], 'Dibuja las premisas. Una conclusión vale si sale en todos los dibujos posibles.'),
      xpHaz('dibujo', '«Todos los gatos son felinos» y «ningún felino es reptil». Pon los reptiles donde deben ir.', { dib: (v, K) => tres({ arriba: 1, ta: 'gatos', tb: 'felinos', tc: 'reptiles', cx: v.x, cy: v.y, cr: 36 }, K), v: { x: 190, y: 70 }, cumple: v => rel(v, 36, 130, 100, 86) === 'fuera', sol: { x: 288, y: 100 }, alto: 206, manijas: [mano], lee: () => '', dice: v => (rel(v, 36, 130, 100, 86) === 'fuera' ? 'Afuera de los felinos, y por eso afuera de los gatos.' : 'Todavía toca a los felinos.') }, 'Afuera de los felinos: entonces ningún gato es reptil.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A: pianistas, M: músicos, Z: zurdos. Todos los A son M. Algunos M son Z. ¿Qué es seguro?', { slots: Z('seguro', 'no es seguro'), fichas: ['algún Z es M', 'algún A es Z', 'todo M es A', 'sin M no hay A'], meta: [['algún Z es M', 'sin M no hay A'], ['algún A es Z', 'todo M es A']], alto: 138, pista: 'Los zurdos pueden cruzarse con los músicos sin tocar a los pianistas.' }, '«Algunos» se voltea y A está dentro de M; pero los zurdos podrían no tocar a los pianistas.')],
  ], 'Círculos dentro, separados o cruzados, y conclusiones que valen en todos los dibujos.');
}
;
//#archivo js/explora-pu-lo-5.js
// Preuniversitario · pu-lo-5 «Verdad y mentira» (Explora). Los ejemplos no son los de los ejercicios.
{
  const globo = (K, y, n, t, cls) => K.c(38, y, 16, cls) + K.t(38, y + 5, n[0], 's') + K.r(64, y - 18, 258, 36, 'fc', 12) + K.t(193, y + 5, t, 's');
  const Z = (y = 150) => [{ x: 88, y, w: 156, h: 74, n: 3, et: 'dice la verdad', ey: -42 }, { x: 252, y, w: 156, h: 74, n: 3, et: 'miente', ey: -42 }];
  const caso = (filas, cols, o = {}) => ({ f: filas.length, c: cols.length, filas, cols, izq: 92, cw: 70, ch: 40, estados: 3, rot: ['', 'V', 'F'], unoAUno: true, ...o });

  xpLec('pu-lo-5', [
    ['Suponer y mirar si choca',
      xpMira('fichas', 'Empecemos por la idea: **supón** que alguien dice la verdad y mira si algo choca.', { slots: Z(144), fichas: ['Ana', 'Beto'], alto: 184, fondo: (K, v) => globo(K, 26, 'Ana', '«Beto miente»', 'fa') + globo(K, 68, 'Beto', '«Ana y yo mentimos»', 'fg') + K.t(170, 102, v.p || '', v.mal ? 's tf' : 's ta') }, [
        ['Ana dice que Beto miente. Beto dice que los dos mienten.', {}],
        ['Supongamos que Beto dice la verdad.', { pon: { 0: 'Beto' }, v: { p: 'supongamos' } }],
        ['Entonces los dos mienten… ¡y Beto estaría mintiendo! Choca: no puede ser.', { v: { p: '¡choca!', mal: 1 }, marca: [0] }],
        ['Beto miente. Su frase es falsa: no mienten los dos. Entonces Ana dice la verdad.', { saca: [0], pon: { 1: 'Beto', 0: 'Ana' }, v: { p: '', mal: 0 } }],
        ['Comprobamos: Ana dijo «Beto miente», y es cierto. Todo cuadra.', { v: { p: 'cuadra' } }],
      ], 'Supón una cosa; si choca, la contraria es la verdadera. Al final, comprueba todo.'),
      xpHaz('fichas', '¿Quién dice la verdad y quién miente?', { slots: Z(), fichas: ['Cata', 'Dino'], meta: [[], ['Cata', 'Dino']], alto: 192, fondo: K => globo(K, 26, 'Cata', '«Dino dice la verdad»', 'fa') + globo(K, 68, 'Dino', '«Solo uno de los dos miente»', 'fg'), pista: 'Si Dino dijera la verdad, Cata también: serían dos, no uno.' }, 'Si Dino dijera la verdad, Cata también, y entonces nadie mentiría: choca. Los dos mienten.')],
    ['¿Quién fue? Una tabla de casos',
      xpMira('rejilla', 'Segunda idea: si hay un culpable, revisa **cada sospechoso** en una tabla.', caso(['si fue Leo', 'si fue Mía', 'si fue Nico'], ['Leo', 'Mía', 'Nico'], { pie: 'Leo: «fue Mía» · Mía: «fue Nico» · Nico: «Mía miente»' }), [
        ['Alguien se comió el ponqué, y se sabe que **solo uno** miente.', {}],
        ['Si fue Leo: Leo miente y Mía miente. Nico acierta. Dos mentiras: no.', { x: [0, 1], on: [2] }],
        ['Si fue Mía: Leo acierta, Mía miente y Nico acierta. ¡Una sola mentira!', { on: [3, 5], x: [4] }],
        ['Si fue Nico: Leo miente, Mía acierta y Nico miente. Dos: no.', { x: [6, 8], on: [7] }],
        ['Solo la segunda fila cumple. Fue Mía.', { luz: [3, 4, 5] }],
      ], 'Una fila por sospechoso: escribe V o F en cada frase y busca la fila que cumple la condición.'),
      xpHaz('rejilla', 'P: «fue Q». Q: «yo no fui». R: «yo no fui». Solo **una** frase es verdadera. Llena la tabla: ¿quién fue?', caso(['si fue P', 'si fue Q', 'si fue R'], ['P', 'Q', 'R'], { meta: { 0: 2, 1: 1, 2: 1, 3: 1, 4: 2, 5: 1, 6: 2, 7: 1, 8: 2 }, dice: c => `${c.filter(x => x).length} de 9 casillas. Un toque pone V, otro F.`, lleno: c => c.every(x => x), pista: 'Revisa fila por fila: si fue P, la frase de P («fue Q») es falsa, y las de Q y R, verdaderas.' }), 'Con P hay dos verdades, con Q también y con R solo una: fue R.')],
    ['Atajos',
      xpMira('fichas', 'Tercera idea: dos frases que **se contradicen** ya dan información.', { slots: Z(174), fichas: ['Eva', 'Fito', 'Gina'], alto: 214, fondo: (K, v) => globo(K, 20, 'Eva', '«Fue Gina»', 'fa') + globo(K, 58, 'Fito', '«Yo fui»', 'fg') + globo(K, 96, 'Gina', '«Yo no fui»', 'ff') }, [
        ['Alguien rompió el florero, y solo uno de los tres dice la verdad.', {}],
        ['Eva dice «fue Gina» y Gina dice «yo no fui». Una es verdad y la otra no.', {}],
        ['La única verdad está entre ellas. Entonces Fito miente: él no fue.', { pon: { 1: 'Fito' } }],
        ['Fue Eva o Gina. Si fue Gina, Eva dice la verdad y Gina miente: cumple.', { pon: { 0: 'Eva', 1: 'Gina' } }],
        ['Si fue Eva, Gina dice la verdad y Eva miente: también cumple. Faltaría otra pista.', { saca: [0, 1], pon: { 0: 'Gina', 1: ['Fito', 'Eva'] } }],
      ], 'Frases opuestas: una es verdad y la otra mentira, sin saber cuál. Eso decide a los demás.'),
      xpHaz('fichas', 'De estos tres, **exactamente uno** miente. Ubícalos.', { slots: Z(174), fichas: ['Hugo', 'Inés', 'Juan'], meta: [['Hugo', 'Juan'], 'Inés'], alto: 214, fondo: K => globo(K, 20, 'Hugo', '«Inés miente»', 'fa') + globo(K, 58, 'Inés', '«Juan miente»', 'fg') + globo(K, 96, 'Juan', '«Hugo dice la verdad»', 'ff'), pista: 'Hugo e Inés: si Inés dijera la verdad, Hugo mentiría y Juan también.' }, 'Hugo e Inés se contradicen: uno miente. Si fuera Hugo, también mentiría Juan. Miente Inés.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En una isla cada uno dice siempre la verdad o siempre miente. Kira habla por las dos. Ubícalas.', { slots: Z(132), fichas: ['Kira', 'Lola'], meta: ['Kira', 'Lola'], alto: 174, fondo: K => globo(K, 34, 'Kira', '«Al menos una de las dos miente»', 'fa'), pista: 'Si Kira mintiera, su frase sería falsa: ninguna mentiría. ¿Se puede?' }, 'Si Kira mintiera, su frase sería cierta: choca. Dice la verdad, así que miente Lola.')],
  ], 'Suponer hasta que choque, revisar a cada sospechoso y aprovechar las frases opuestas.');
}
;
//#archivo js/explora-pu-op-1.js
// Preuniversitario · pu-op-1 «Operaciones nuevas» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Máquina: entran a y b, sale r; arriba la receta y abajo la cuenta.
  const maq = (v, K) => K.t(170, 26, v.re, 'b tg') + K.r(22, 62, 62, 52, 'fa', 10) + K.t(53, 95, v.a, 'B') + K.t(106, 96, v.s, 'b') + K.r(128, 62, 62, 52, 'fa', 10) + K.t(159, 95, v.b, 'B') + K.ar(200, 88, 236, 88, 'lm') + K.r(242, 62, 78, 52, 'fg', 10) + K.t(281, 95, v.r, 'B') + K.t(170, 150, v.c || '', 'ta');
  const G = ['k', 'm', 'n'], TAB = [['k', 'm', 'n'], ['m', 'n', 'k'], ['n', 'k', 'm']];
  const tab = (T, o = {}) => ({ f: 3, c: 3, filas: G, cols: G, izq: 60, cw: 60, ch: 46, celda: (i, r, c) => T[r][c], unoAUno: true, ...o });

  xpLec('pu-op-1', [
    ['Una receta con huecos',
      xpMira('dibujo', 'Empecemos por la idea: un símbolo nuevo es una **receta**.', { dib: maq, v: { re: 'a ◆ b = 2a + 3b', a: 'a', b: 'b', s: '◆', r: '?', c: '' }, alto: 165 }, [
        ['La receta dice: el doble del primero más el triple del segundo.', {}, '$a \\diamond b = 2a + 3b$'],
        ['Para 4 ◆ 1, el 4 entra donde dice a y el 1 donde dice b.', { a: '4', b: '1', c: '2 · 4 + 3 · 1' }],
        ['Ocho más tres: once.', { r: '11' }, '$2 \\cdot 4 + 3 \\cdot 1 = 11$'],
        ['Si los cambiamos de lugar, 1 ◆ 4 da 2 más 12: catorce. El orden importa.', { a: '1', b: '4', r: '14', c: '2 · 1 + 3 · 4' }, '$2 \\cdot 1 + 3 \\cdot 4 = 14$'],
        ['Por eso primero se mira quién es a y quién es b.', {}],
      ], 'Reemplaza cada número en el lugar de su letra. El primero es a; el segundo, b.'),
      xpHaz('dibujo', 'Con $a \\diamond b = a \\cdot b + 2$, cambia la segunda entrada hasta que salga 22.', { dib: (v, K) => maq({ re: 'a ◆ b = a · b + 2', a: '5', b: v.b, s: '◆', r: 5 * v.b + 2, c: '' }, K), v: { b: 1 }, metas: { b: 4 }, alto: 215, manijas: [{ k: 'b', min: 0, max: 8, paso: 1, et: 'segunda entrada' }],
        lee: v => `$5 \\diamond ${v.b} = 5 \\cdot ${v.b} + 2 = ${5 * v.b + 2}$`, dice: v => `Sale ${5 * v.b + 2}.` }, '$5 \\cdot 4 + 2 = 22$.')],
    ['Los negativos, con paréntesis',
      xpMira('dibujo', 'Segunda idea: al reemplazar un negativo, ponle **paréntesis**.', { dib: maq, v: { re: 'a ◆ b = b² − a', a: 'a', b: 'b', s: '◆', r: '?', c: '' }, alto: 165 }, [
        ['Otra receta: el cuadrado del segundo menos el primero.', {}, '$a \\diamond b = b^2 - a$'],
        ['Con 2 ◆ (−3), el segundo es −3.', { a: '2', b: '−3', c: '(−3)² − 2' }],
        ['El cuadrado es de todo el −3, con su signo: 9. Menos 2, queda 7.', { r: '7' }, '$(-3)^2 - 2 = 7$'],
        ['Con (−4) ◆ 1 se resta un negativo: 1 menos menos 4 son 5.', { a: '−4', b: '1', r: '5', c: '1² − (−4)' }, '$1^2 - (-4) = 5$'],
      ], 'Los negativos entran con paréntesis: $(-3)^2 = 9$ y restar $-4$ es sumar 4.'),
      xpHaz('fichas', 'Con $a \\diamond b = b^2 - a$, halla cada resultado.', { slots: [{ x: 66, y: 56, w: 84, et: '1 ◆ (−5)' }, { x: 170, y: 56, w: 84, et: '(−6) ◆ 2' }, { x: 274, y: 56, w: 84, et: '10 ◆ 3' }], fichas: ['24', '10', '−1', '−26', '−2', '1'], meta: ['24', '10', '−1'], alto: 104, pista: 'El segundo se eleva al cuadrado; luego se resta el primero.' }, '$25 - 1 = 24$, $4 - (-6) = 10$ y $9 - 10 = -1$.')],
    ['Operaciones en una tabla',
      xpMira('rejilla', 'Tercera idea: a veces no hay receta, sino una **tabla**.', tab(TAB), [
        ['Una operación entre k, m y n. El primero se busca en las filas y el segundo, en las columnas.', {}],
        ['Para m ✱ n: la fila de m, la columna de n. El resultado es k.', { luz: [3, 4, 5, 2, 8], on: [5] }, '$m \\ast n = k$'],
        ['La fila y la columna de k dejan todo igual. Por eso k es el neutro.', { off: [5], luz: [0, 1, 2, 3, 6] }],
        ['Si la tabla es simétrica por la diagonal, el orden no importa.', { luz: [1, 3, 2, 6, 5, 7] }],
      ], 'Fila del primero, columna del segundo. El neutro no cambia a nadie.'),
      xpHaz('rejilla', 'En esta otra tabla, toca la casilla de **n ✱ m**.', tab([['m', 'k', 'n'], ['n', 'm', 'k'], ['k', 'n', 'm']], { meta: [7], dice: c => (c[5] ? 'Esa es m ✱ n: el primero va en las filas.' : 'El primero, n, está en las filas; el segundo, m, en las columnas.') }), 'Fila de n, columna de m: el resultado es n.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con $a \\circ b = a + b - 7$ hay un neutro: un número que no cambia a los demás. Búscalo.', { dib: (v, K) => [3, 8, 12].map((a, i) => K.t(120, 44 + i * 40, `${a} ∘ ${K.sig(v.e)} = ${K.sig(a + v.e - 7)}`, a + v.e - 7 === a ? 'b to' : 'b') + K.t(250, 44 + i * 40, a + v.e - 7 === a ? 'igual' : 'cambió', a + v.e - 7 === a ? 'to' : 'tf')).join(''), v: { e: 0 }, metas: { e: 7 }, alto: 200, manijas: [{ k: 'e', min: -3, max: 10, paso: 1, et: 'candidato' }],
        lee: v => `$a + ${v.e < 0 ? `(${v.e})` : v.e} - 7 = a ${v.e === 7 ? '' : v.e > 7 ? `+ ${v.e - 7}` : `- ${7 - v.e}`}$`, dice: () => 'Debe dejar igual al 3, al 8 y al 12.' }, 'Con 7, $a + 7 - 7 = a$: no cambia a nadie.')],
  ], 'Reemplazar en la receta, con paréntesis en los negativos, y leer tablas por fila y columna.');
}
;
//#archivo js/explora-pu-op-2.js
// Preuniversitario · pu-op-2 «Anidados y ecuaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Renglones de una cuenta que se van revelando.
  const pasos = (v, K) => K.t(170, 28, v.re, 'b tg') + v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 72 + i * 38, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join('');
  // Balanza de una ecuación: izquierda y derecha en números.
  const bal = (K, izq, der, ti, td) => { const a = Math.max(-14, Math.min(14, (der - izq) * 1.2)), d = a; return K.l(80, 96 - d, 260, 96 + d, 'gr') + K.p([[170, 96], [156, 140], [184, 140]], 'fc') + K.r(44, 58 - d, 84, 36, 'fa', 8) + K.t(86, 81 - d, ti, '') + K.r(212, 58 + d, 84, 36, 'fg', 8) + K.t(254, 81 + d, td, ''); };

  xpLec('pu-op-2', [
    ['De adentro hacia afuera',
      xpMira('dibujo', 'Empecemos por la idea: si hay paréntesis, primero lo de **adentro**.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b', l: ['(3 ⊕ 1) ⊕ 4', '5 ⊕ 4', '13'], n: 1 }, alto: 170 }, [
        ['Con esta receta queremos (3 ⊕ 1) ⊕ 4.', {}, '$a \\oplus b = a + 2b$'],
        ['Adentro: 3 más el doble de 1 son 5. El paréntesis se cambia por 5.', { n: 2 }, '$3 + 2 \\cdot 1 = 5$'],
        ['Ahora 5 ⊕ 4: 5 más 8, trece.', { n: 3 }, '$5 + 2 \\cdot 4 = 13$'],
        ['Si el paréntesis está al otro lado cambia: 1 ⊕ 4 son 9, y 3 ⊕ 9 son 21.', { l: ['3 ⊕ (1 ⊕ 4)', '3 ⊕ 9', '21'] }, '$3 + 2 \\cdot 9 = 21$'],
      ], 'Resuelve el paréntesis, ponlo como un solo número y sigue.'),
      xpHaz('fichas', 'Con $a \\oplus b = a + 2b$, calcula $(2 \\oplus 5) \\oplus 1$: primero lo de adentro y luego el final.', { slots: [{ x: 110, y: 56, w: 92, et: '2 ⊕ 5' }, { x: 230, y: 56, w: 92, et: 'resultado' }], fichas: ['12', '14', '9', '25', '7'], meta: ['12', '14'], alto: 104, pista: '2 más el doble de 5. Ese resultado es el nuevo primer número.' }, '$2 + 10 = 12$ y $12 + 2 = 14$.')],
    ['Cuando hay una x',
      xpMira('dibujo', 'Segunda idea: con una x se reemplaza igual, y queda una **ecuación**.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b', l: ['x ⊕ 4 = 15', 'x + 8 = 15', 'x = 7'], n: 1 }, alto: 170 }, [
        ['¿Qué x cumple x ⊕ 4 = 15? Aquí x es el primero y 4 el segundo.', {}],
        ['Reemplazamos: x más el doble de 4.', { n: 2 }, '$x + 2 \\cdot 4 = 15$'],
        ['Quitamos 8 a los dos lados: x es 7.', { n: 3 }, '$x = 15 - 8 = 7$'],
        ['Comprobamos: 7 ⊕ 4 son 7 más 8, quince.', {}, '$7 + 8 = 15$'],
      ], 'Reemplaza, y resuelve la ecuación que queda. Al final, comprueba.'),
      xpHaz('dibujo', 'Con $a \\oplus b = a + 2b$, mueve la x hasta que $5 \\oplus x = 19$.', { dib: (v, K) => bal(K, 5 + 2 * v.x, 19, `5 + 2·${v.x}`, '19'), v: { x: 2 }, metas: { x: 7 }, alto: 205, manijas: [{ k: 'x', min: 0, max: 12, paso: 1, et: 'x' }],
        lee: v => `$5 + 2 \\cdot ${v.x} = ${5 + 2 * v.x}$`, dice: v => (5 + 2 * v.x < 19 ? 'Le falta peso a la izquierda.' : 5 + 2 * v.x > 19 ? 'La izquierda pesa de más.' : 'En equilibrio.') }, '$5 + 2x = 19$, así que $2x = 14$ y $x = 7$.')],
    ['Dos operaciones juntas',
      xpMira('dibujo', 'Tercera idea: con **dos símbolos**, cada uno usa su propia receta.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b ; a ⊙ b = a · b − 1', l: ['(2 ⊙ 3) ⊕ 4', '5 ⊕ 4', '13'], n: 1 }, alto: 170 }, [
        ['Ahora hay dos recetas. Queremos (2 ⊙ 3) ⊕ 4.', {}],
        ['Adentro está ⊙: 2 por 3, menos 1, da 5.', { n: 2 }, '$2 \\cdot 3 - 1 = 5$'],
        ['Afuera está ⊕: 5 más el doble de 4, trece.', { n: 3 }, '$5 + 8 = 13$'],
        ['Escribe cada receta antes de empezar, para no mezclarlas.', {}],
      ], 'Cada símbolo, su receta; primero el de adentro.'),
      xpHaz('fichas', 'Con $a \\oplus b = a + 2b$ y $a \\odot b = a \\cdot b - 1$, calcula $(1 \\oplus 3) \\odot 2$.', { slots: [{ x: 110, y: 56, w: 92, et: '1 ⊕ 3' }, { x: 230, y: 56, w: 92, et: 'resultado' }], fichas: ['7', '13', '2', '11', '3'], meta: ['7', '13'], alto: 104, pista: 'Adentro: 1 más el doble de 3.' }, '$1 + 6 = 7$ y $7 \\cdot 2 - 1 = 13$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con $a \\oplus b = a + 2b$, ¿qué número operado consigo mismo da 24? Mueve la x.', { dib: (v, K) => bal(K, 3 * v.x, 24, `${v.x} + 2·${v.x}`, '24'), v: { x: 2 }, metas: { x: 8 }, alto: 205, manijas: [{ k: 'x', min: 0, max: 12, paso: 1, et: 'x' }],
        lee: v => `$${v.x} \\oplus ${v.x} = ${v.x} + 2 \\cdot ${v.x} = ${3 * v.x}$`, dice: v => (3 * v.x < 24 ? 'Aún no llega a 24.' : 3 * v.x > 24 ? 'Se pasó de 24.' : 'En equilibrio.') }, '$x + 2x = 3x = 24$: $x = 8$.')],
  ], 'De adentro hacia afuera, reemplazar la x y no mezclar las recetas.');
}
;
//#archivo js/explora-pu-ar-1.js
// Preuniversitario · pu-ar-1 «Fracciones de lo que queda» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barra del total T: gastos g1 y g2 (cantidades) con su intensidad; lo que queda al final.
  const barra = (v, K) => {
    const L = 292, u = L / v.T, x1 = 24 + v.g1 * u, x2 = x1 + v.g2 * u; let h = K.r(24, 60, L, 44, 'fa', 5);
    h += K.f(v.a, K.r(24, 60, v.g1 * u, 44, 'ff', 5) + K.t(24 + v.g1 * u / 2, 88, v.e1 ?? N(v.g1), 's')) + K.f(v.b, K.r(x1, 60, v.g2 * u, 44, 'fg', 5) + K.t(x1 + v.g2 * u / 2, 88, v.e2 ?? N(v.g2), 's'));
    for (let i = 1; i < (v.n1 || 1); i++) h += K.l(24 + i * L / v.n1, 60, 24 + i * L / v.n1, 104, 'ls');
    if (v.n2) for (let i = 1; i < v.n2; i++) h += K.f(v.c2, K.l(x1 + i * (316 - x1) / v.n2, 60, x1 + i * (316 - x1) / v.n2, 104, 'lm d'));
    return h + K.t(170, 46, v.t ?? N(v.T), 'tm') + K.f(v.q, K.cota(v.b > 0.5 ? x2 : x1, 116, 316, 116, v.eq ?? `quedan ${N(v.T - v.g1 - (v.b > 0.5 ? v.g2 : 0))}`, 'ta'));
  };
  const V = { a: 0, b: 0, q: 0, c2: 0 };

  xpLec('pu-ar-1', [
    ['El segundo pedazo es de lo que queda',
      xpMira('dibujo', 'Empecemos por la idea: «de lo que queda» cambia **el todo**.', { dib: barra, v: { T: 72, g1: 12, g2: 30, n1: 6, n2: 2, ...V }, alto: 145 }, [
        ['Alguien tiene 72 mil. Gasta la sexta parte: cada sexta parte son 12 mil.', {}, '$72 \\div 6 = 12$'],
        ['Le quedan 60 mil. Ese es ahora el todo.', { a: 1, q: 1 }, '$72 - 12 = 60$'],
        ['Gasta la mitad de **lo que queda**: la mitad de 60, no de 72.', { c2: 1 }, '$60 \\div 2 = 30$'],
        ['Son 30 mil. Le quedan otros 30 mil.', { b: 1 }, '$60 - 30 = 30$'],
        ['Si hubiera tomado la mitad de 72, la cuenta saldría mal.', {}, '$\\tfrac12 \\text{ de } 60 \\neq \\tfrac12 \\text{ de } 72$'],
      ], 'Después de cada gasto hay un todo nuevo: la fracción siguiente se toma de ahí.'),
      xpHaz('fichas', 'De 84 km se recorren dos séptimos en bus y luego un tercio de lo que falta, a pie. Pon los km de bus, a pie y lo que falta.', { slots: [{ x: 62, y: 58, w: 92, et: 'en bus' }, { x: 170, y: 58, w: 92, et: 'a pie' }, { x: 278, y: 58, w: 92, et: 'faltan' }], fichas: ['24', '20', '40', '28', '32', '60'], meta: ['24', '20', '40'], alto: 106, pista: 'Un séptimo de 84 son 12. El tercio se toma de los 60 que faltan.' }, '$2 \\cdot 12 = 24$; de los 60 que faltan, un tercio es 20; faltan 40.')],
    ['Multiplicar lo que queda',
      xpMira('rejilla', 'Segunda idea: para saber qué fracción queda, se **multiplican las que quedan**.', { f: 4, c: 6, cw: 46, ch: 36, estados: 3, rot: ['', '', '✗'] }, [
        ['Un terreno de 24 cuadros. Se vende un sexto: una columna.', { x: [0, 6, 12, 18] }, '$\\tfrac16$'],
        ['Quedan cinco sextos del terreno.', {}, '$1 - \\tfrac16 = \\tfrac56$'],
        ['De lo que queda se siembra un cuarto: una fila de las columnas que quedaron.', { x: [1, 2, 3, 4, 5] }, '$\\tfrac14 \\text{ de } \\tfrac56$'],
        ['Quedan tres cuartos de cinco sextos: 15 de 24 cuadros.', { on: [7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23] }, '$\\tfrac34 \\cdot \\tfrac56 = \\tfrac{15}{24} = \\tfrac58$'],
      ], 'Si se gasta $\\tfrac16$ queda $\\tfrac56$; si luego se gasta $\\tfrac14$ de eso, queda $\\tfrac34 \\cdot \\tfrac56$.'),
      xpHaz('rejilla', 'De un lote de 20 cuadros se venden dos quintos (dos columnas) y se riega un cuarto de lo que queda. Pinta lo que sobra, cualquier pedazo de ese tamaño.', { f: 4, c: 5, cw: 48, ch: 36, cumple: c => c.reduce((a, b) => a + b, 0) === 9, sol: [0, 1, 2, 5, 6, 7, 10, 11, 12], lee: c => `$\\tfrac{${c.reduce((a, b) => a + b, 0)}}{20}$`, dice: c => `${c.reduce((a, b) => a + b, 0)} de 20 cuadros pintados.` }, '$\\tfrac35 \\cdot \\tfrac34 = \\tfrac{9}{20}$: nueve cuadros.')],
    ['Al revés: hallar el principio',
      xpMira('dibujo', 'Tercera idea: si se sabe lo que sobró, se camina **de atrás hacia adelante**.', { dib: barra, v: { T: 60, g1: 20, g2: 10, n1: 3, n2: 4, a: 1, b: 1, q: 1, c2: 1, e1: '?', e2: '?', t: '?', eq: 'sobraron 30' }, alto: 145 }, [
        ['Gastó un tercio, luego un cuarto de lo que quedaba, y le sobraron 30. ¿Cuánto tenía?', {}],
        ['Los 30 son tres cuartos de lo que había antes del segundo gasto.', {}, '$30 = \\tfrac34 \\text{ de ?}$'],
        ['Cada cuarto son 10: antes tenía 40.', { e2: '10' }, '$30 \\div 3 = 10 \\quad 4 \\cdot 10 = 40$'],
        ['Y 40 son dos tercios del principio: cada tercio son 20, así que tenía 60.', { e1: '20', t: '60' }, '$40 \\div 2 = 20 \\quad 3 \\cdot 20 = 60$'],
        ['Comprobamos: 60 menos 20 son 40; menos 10, quedan 30.', {}, '$60 - 20 - 10 = 30$'],
      ], 'De atrás hacia adelante: lo que sobró es una fracción conocida de lo que había antes.'),
      xpHaz('dibujo', 'Gastó un cuarto y luego la mitad de lo que le quedaba; le sobraron 24. Ajusta el total hasta que sobren 24.', { dib: (v, K) => barra({ T: v.T, g1: v.T / 4, g2: v.T * 3 / 8, n1: 4, n2: 2, a: 1, b: 1, q: 1, c2: 0 }, K), v: { T: 40 }, metas: { T: 64 }, alto: 195, manijas: [{ k: 'T', min: 16, max: 96, paso: 8, et: 'total' }],
        lee: v => `$\\tfrac12 \\cdot \\tfrac34 \\cdot ${v.T} = ${N(v.T * 3 / 8)}$`, dice: v => `Con ${v.T} sobrarían ${N(v.T * 3 / 8)}.` }, '24 es la mitad de 48, y 48 son tres cuartos de 64.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De una torta se come un tercio y luego dos quintos de lo que queda. Sobran 18 porciones. ¿Cuántas había antes del segundo corte, al principio, y en el primer corte?', { slots: [{ x: 62, y: 58, w: 96, et: 'antes del 2.º' }, { x: 170, y: 58, w: 96, et: 'al principio' }, { x: 278, y: 58, w: 96, et: 'primer corte' }], fichas: ['30', '45', '15', '27', '18', '12'], meta: ['30', '45', '15'], alto: 106, pista: '18 son tres quintos de lo que había antes; y eso, dos tercios del principio.' }, '18 son tres quintos de 30, y 30 son dos tercios de 45; el primer corte fue 15.')],
  ], 'Cada gasto deja un todo nuevo, lo que queda se multiplica, y al revés se camina hacia atrás.');
}
;
//#archivo js/explora-pu-ar-2.js
// Preuniversitario · pu-ar-2 «Promedios» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Rectángulo n × promedio: su área es la suma. Con un dato nuevo x al lado.
  const rect = (v, K) => {
    const u = v.u ?? 9, w = 34, x0 = 60, y = 178; let h = K.l(40, y, 320, y, 'lm');
    h += K.r(x0, y - v.m * u, v.n * w, v.m * u, 'fa', 3); for (let i = 1; i < v.n; i++) h += K.l(x0 + i * w, y, x0 + i * w, y - v.m * u, 'lr');
    h += K.t(x0 - 8, y - v.m * u / 2 + 5, N(v.m), 'ta', 'end') + K.t(x0 + v.n * w / 2, y + 17, `${Math.round(v.n)} datos`, 's tm');
    if (v.x != null && v.f > 0.01) h += K.f(v.f, K.r(x0 + v.n * w + 6, y - v.x * u, w, v.x * u, 'fg', 3) + K.t(x0 + v.n * w + 23, y + 17, N(v.x), 's tg'));
    return h + K.f(v.l ?? 0, K.l(50, y - (v.p ?? 0) * u, 316, y - (v.p ?? 0) * u, 'lf d') + K.t(318, y - (v.p ?? 0) * u - 6, N(v.p ?? 0), 'tf', 'end'));
  };
  // Pesos en porcentaje: tramos de una barra con su nota.
  const pesos = (v, K) => { let x = 24, h = ''; v.w.forEach((w, i) => { const L = w * 2.92; h += K.r(x, 66, L, 40, ['fa', 'fg', 'ff'][i], 5) + K.t(x + L / 2, 91, v.nt[i], 'b') + K.t(x + L / 2, 124, `${w} %`, 's tm') + K.f(v.a, K.t(x + L / 2, 152, v.ap[i], 'ta')); x += L; }); return h + K.t(170, 40, v.t || '', 'b ta'); };

  xpLec('pu-ar-2', [
    ['La suma escondida',
      xpMira('dibujo', 'Empecemos por la idea: todo promedio **esconde una suma**.', { dib: rect, v: { n: 4, m: 7, x: 0, f: 0, l: 0, p: 0 }, alto: 200 }, [
        ['Cuatro números promedian 7. No sabemos cuáles son.', {}],
        ['Pero es como si los cuatro midieran 7: un rectángulo de 4 por 7.', {}, '$4 \\cdot 7 = 28$'],
        ['Su suma es 28, sean los que sean. Esa es la llave de casi todo.', {}, '$\\text{suma} = n \\cdot \\text{promedio}$'],
        ['Seis números que promedian 12 suman 72.', { n: 6, m: 12 }, '$6 \\cdot 12 = 72$'],
      ], 'Suma = cuántos son × promedio. Con la suma se resuelven los problemas de promedios.'),
      xpHaz('dibujo', 'Seis datos suman 54. Arrastra el nivel hasta su promedio.', { dib: rect, v: { n: 6, m: 5, f: 0 }, metas: { m: 9 }, alto: 200, manijas: [{ k: 'm', min: 1, max: 16, paso: 1, r: 11, en: v => [162, 178 - v.m * 9], de: (x, y) => (178 - y) / 9 }],
        lee: v => `$6 \\cdot ${v.m} = ${6 * v.m}$`, dice: v => `Seis datos de ${v.m} suman ${6 * v.m}.` }, '$54 \\div 6 = 9$.')],
    ['Entra uno, sale uno',
      xpMira('dibujo', 'Segunda idea: si entra o sale un dato, **cambia la suma**.', { dib: rect, v: { n: 4, m: 7, x: 12, f: 0, l: 0, p: 7 }, alto: 200 }, [
        ['Cuatro números promedian 7: suman 28.', {}, '$4 \\cdot 7 = 28$'],
        ['Entra un 12. Ahora son cinco y suman 40.', { f: 1 }, '$28 + 12 = 40$'],
        ['El promedio nuevo es 40 entre 5: ocho.', { l: 1, p: 8 }, '$40 \\div 5 = 8$'],
        ['El 12 tenía 5 de más sobre el 7, y se repartieron entre los cinco: subió 1.', {}, '$12 - 7 = 5 \\quad 5 \\div 5 = 1$'],
        ['Si el que entra es igual al promedio, no cambia nada.', { x: 7, p: 7 }],
      ], 'Suma vieja ± el dato = suma nueva; divide entre la cantidad nueva.'),
      xpHaz('dibujo', 'Tres datos promedian 10. Entra otro y el promedio sube a 12. Ajusta el dato que entró.', { dib: (v, K) => rect({ n: 3, m: 10, x: v.x, f: 1, l: 1, p: (30 + v.x) / 4, u: 7 }, K), v: { x: 8 }, metas: { x: 18 }, alto: 200, manijas: [{ k: 'x', min: 0, max: 22, paso: 1, r: 11, en: v => [185, 178 - v.x * 7], de: (x, y) => (178 - y) / 7 }],
        lee: v => `$\\tfrac{30 + ${v.x}}{4} = ${N((30 + v.x) / 4)}$`, dice: v => `La suma va en ${30 + v.x}. Cuatro datos de 12 suman 48.` }, '$48 - 30 = 18$.')],
    ['Notas con peso',
      xpMira('dibujo', 'Tercera idea: si las notas **no pesan igual**, cada una aporta según su porcentaje.', { dib: pesos, v: { w: [30, 70], nt: ['5.0', '3.0'], ap: ['1.5', '2.1'], a: 0, t: '' }, alto: 168 }, [
        ['Un trabajo vale el 30 % y se sacó 5.0. El examen vale el 70 % y se sacó 3.0.', {}],
        ['El trabajo aporta el 30 % de 5: 1.5. El examen, el 70 % de 3: 2.1.', { a: 1 }, '$0.3 \\cdot 5 = 1.5 \\quad 0.7 \\cdot 3 = 2.1$'],
        ['La definitiva es la suma de los aportes: 3.6.', { t: '3.6' }, '$1.5 + 2.1 = 3.6$'],
        ['No es 4.0, el promedio simple: el examen pesa más y jala hacia abajo.', {}, '$3.6 \\neq 4.0$'],
      ], 'Promedio ponderado: suma de nota × peso, con los pesos en decimales.'),
      xpHaz('fichas', 'Un taller vale el 25 % con nota 4.0 y el final el 75 % con nota 3.2. Pon cada aporte y la definitiva.', { slots: [{ x: 62, y: 58, w: 92, et: 'taller' }, { x: 170, y: 58, w: 92, et: 'final' }, { x: 278, y: 58, w: 92, et: 'definitiva' }], fichas: ['1.0', '2.4', '3.4', '3.6', '0.8', '3.0'], meta: ['1.0', '2.4', '3.4'], alto: 106, pista: 'La cuarta parte de 4.0 y las tres cuartas partes de 3.2.' }, '$0.25 \\cdot 4 = 1.0$, $0.75 \\cdot 3.2 = 2.4$ y juntas 3.4.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ocho hombres pesan en promedio 70 kg y dos mujeres, 55 kg. Pon la suma de ellos, la de ellas y el promedio de los diez.', { slots: [{ x: 62, y: 58, w: 92, et: 'ellos' }, { x: 170, y: 58, w: 92, et: 'ellas' }, { x: 278, y: 58, w: 92, et: 'promedio' }], fichas: ['560', '110', '67', '62.5', '670', '65'], meta: ['560', '110', '67'], alto: 106, pista: 'Diez personas pesan 560 + 110.' }, '$\\tfrac{560 + 110}{10} = 67$ kg, no 62.5.')],
  ], 'La suma escondida, lo que entra y lo que sale, y los pesos de cada nota.');
}
;
//#archivo js/explora-pu-ar-3.js
// Preuniversitario · pu-ar-3 «Criptoaritmética» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Número de dos cifras en barras de 10 y cuadritos de 1.
  const bloques = (v, K) => { let h = ''; const A = Math.round(v.a), B = Math.round(v.b); for (let i = 0; i < A; i++) h += K.r(34 + i * 18, 40, 14, 110, 'fa', 3); for (let i = 0; i < B; i++) h += K.r(230 + (i % 3) * 22, 40 + Math.floor(i / 3) * 22, 18, 18, 'fg', 3); return h + K.t(100, 172, `${A} decenas`, 'ta') + K.t(262, 172, `${B} unidades`, 'tg') + K.t(170, 24, v.t ?? `${A}${B}`, 'B'); };
  // Suma en columnas con llevada: filas de textos.
  const suma = (v, K) => { const X = [150, 200], h = K.l(116, 112, 226, 112) + K.t(120, 96, '+', 'b'); const f = (r, y, c) => r.map((t, i) => (t === '' ? '' : K.t(X[i], y, t, `B ${c[i] || ''}`))).join(''); return h + f(v.r1, 58, v.c || []) + f(v.r2, 98, v.c || []) + f(v.r3, 148, v.c || []) + K.f(v.ll, K.t(X[0], 30, '1', 's tf') + K.t(X[0] + 44, 30, '← llevo 1', 's tf', 'start')); };

  xpLec('pu-ar-3', [
    ['Cada cifra según su puesto',
      xpMira('dibujo', 'Empecemos por la idea: el número $\\overline{AB}$ vale **10A + B**.', { dib: bloques, v: { a: 4, b: 7, t: '47' }, alto: 185 }, [
        ['47 son 4 barras de diez y 7 cuadritos: 40 más 7.', {}, '$47 = 10 \\cdot 4 + 7$'],
        ['Si se voltean sus cifras queda 74: 7 barras y 4 cuadritos.', { a: 7, b: 4, t: '74' }, '$74 = 10 \\cdot 7 + 4$'],
        ['Subió 27. Cambiar un cuadrito por una barra suma 9, y se cambiaron 3.', {}, '$74 - 47 = 27 = 9 \\cdot 3$'],
        ['Siempre pasa: al voltear, el número cambia 9 veces la diferencia de sus cifras.', {}, '$9 \\cdot (7 - 4)$'],
      ], '$\\overline{AB} = 10A + B$. Al voltear las cifras, cambia en 9 veces su diferencia.'),
      xpHaz('fichas', 'Un número de dos cifras: sus cifras suman 10 y, al voltearlo, **sube** 36. Pon sus cifras.', { slots: [{ x: 130, y: 58, w: 70, et: 'decenas' }, { x: 220, y: 58, w: 70, et: 'unidades' }], fichas: ['3', '7', '4', '6', '2', '8'], meta: ['3', '7'], alto: 106, pista: '36 son 9 por 4: las cifras se llevan 4. Sube, así que la mayor está en las unidades.' }, 'Se llevan 4 y suman 10: 3 y 7. El número es 37, y $73 - 37 = 36$.')],
    ['Columna por columna',
      xpMira('dibujo', 'Segunda idea: en una suma con letras, se empieza por **las unidades** y se cuida lo que se lleva.', { dib: suma, v: { r1: ['A', '7'], r2: ['2', 'B'], r3: ['6', '1'], ll: 0, c: ['ta', 'tg'] }, alto: 165 }, [
        ['A7 más 2B da 61. Cada letra es una cifra.', {}],
        ['Unidades: 7 más B debe terminar en 1. Con B = 4 da 11.', { r2: ['2', '4'] }, '$7 + 4 = 11$'],
        ['Se escribe 1 y se lleva 1 a las decenas.', { ll: 1 }],
        ['Decenas: 1 que se lleva, más A, más 2, da 6. Entonces A es 3.', { r1: ['3', '7'] }, '$1 + A + 2 = 6$'],
        ['Comprobamos: 37 más 24 son 61.', {}, '$37 + 24 = 61$'],
      ], 'Primero unidades; si pasan de 9, se lleva 1. Luego decenas, sumando lo que se llevó.'),
      xpHaz('fichas', '$\\overline{3A} + \\overline{B8} = 85$. Descubre A y B.', { slots: [{ x: 130, y: 190, w: 70, et: 'A' }, { x: 220, y: 190, w: 70, et: 'B' }], fichas: ['7', '4', '5', '3', '6'], meta: ['7', '4'], alto: 236, fondo: K => suma({ r1: ['3', 'A'], r2: ['B', '8'], r3: ['8', '5'], ll: 0, c: ['ta', 'tg'] }, K), pista: 'A + 8 termina en 5: es 15. Se lleva 1 a las decenas.' }, '$7 + 8 = 15$, se lleva 1; $1 + 3 + B = 8$, así que B = 4. Y $37 + 48 = 85$.')],
    ['Letras repetidas',
      xpMira('dibujo', 'Tercera idea: si las letras se repiten, se **juntan** como en el álgebra.', { dib: (v, K) => v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 44 + i * 40, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join(''), v: { l: ['AA + BB = 88', '11A + 11B = 88', '11 · (A + B) = 88', 'A + B = 8'], n: 1 }, alto: 180 }, [
        ['AA más BB es 88. AA es diez A más una A: once A.', {}, '$\\overline{AA} = 10A + A = 11A$'],
        ['Igual, BB son once B.', { n: 2 }],
        ['Se saca el 11 común.', { n: 3 }],
        ['Dividimos entre 11: A más B suman 8. Lo demás no se sabe, y no hacía falta.', { n: 4 }, '$88 \\div 11 = 8$'],
        ['También $\\overline{AB} + \\overline{BA}$ es once veces A + B.', { l: ['AB + BA', '10A + B + 10B + A', '11A + 11B', '11 · (A + B)'] }],
      ], 'Escribe cada número con 10 y 1, junta las letras iguales y saca el factor común.'),
      xpHaz('fichas', '$\\overline{AB} + \\overline{BA} = 77$ y $A - B = 3$. Pon A + B y las dos cifras.', { slots: [{ x: 66, y: 58, w: 84, et: 'A + B' }, { x: 170, y: 58, w: 84, et: 'A' }, { x: 274, y: 58, w: 84, et: 'B' }], fichas: ['7', '5', '2', '4', '3', '11'], meta: ['7', '5', '2'], alto: 106, pista: '77 son once veces A + B. Dos cifras que suman 7 y se llevan 3.' }, '$77 \\div 11 = 7$; suman 7 y se llevan 3: 5 y 2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En $\\overline{5A} + \\overline{A5} = 99$, A es la misma cifra. Pon cuánto suman los dos números en términos de A y el valor de A.', { slots: [{ x: 100, y: 58, w: 130, et: 'la suma es' }, { x: 256, y: 58, w: 84, et: 'A' }], fichas: ['55 + 11·A', '10 + 2·A', '4', '9', '5'], meta: ['55 + 11·A', '4'], alto: 106, pista: 'El primero vale 50 + A, y el segundo, 10 · A + 5.' }, '$50 + A + 10A + 5 = 55 + 11A = 99$: $11A = 44$ y A = 4.')],
  ], 'Diez por las decenas, columnas con lo que se lleva, y letras que se juntan.');
}
;
//#archivo js/explora-pu-ar-4.js
// Preuniversitario · pu-ar-4 «Máximos y mínimos» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CL = ['fF', 'fG', 'fA', 'fM', 'fk'];
  // Bolas que salen en el peor orden: lista de colores; se ven las primeras n.
  const bolas = (v, K) => { let h = ''; const L = v.l, n = Math.round(v.n); for (let i = 0; i < n; i++) h += K.c(40 + (i % 8) * 37, 60 + Math.floor(i / 8) * 40, 14, CL[L[i]]); return h + K.t(170, 28, v.t || '', 'b ta'); };
  const rect = (v, K) => { const u = v.u ?? 14, w = v.a * u, h = (v.S - v.a) * u; return K.r(170 - w / 2, 190 - h, w, h, 'fa', 3) + K.t(170, 208, K.sig(v.a), 'ta') + K.t(170 - w / 2 - 8, 194 - h / 2, K.sig(v.S - v.a), 'tg', 'end') + K.t(170, 194 - h / 2, K.sig(v.a * (v.S - v.a)), 'b'); };
  const torres = (v, K) => v.d.map((n, i) => { const x = 40 + i * 56; let h = ''; const u = Math.min(16, 130 / Math.max(...v.d)); for (let j = 0; j < n; j++) h += K.r(x, 160 - (j + 1) * u, 36, u - 2, i === v.d.length - 1 ? 'fg' : 'fa', 2); return h + K.t(x + 18, 178, n, ''); }).join('') + K.t(170, 20, v.t || '', 'b ta');
  // Cajas de 8 con sus libros.
  const cajas = (v, K) => { let h = '', q = 43; for (let i = 0; i < v.n; i++) { const x = 30 + (i % 4) * 74, y = 26 + Math.floor(i / 4) * 66; h += K.r(x, y, 62, 50, 'fc', 6); for (let j = 0; j < 8 && q > 0; j++, q--) h += K.r(x + 5 + (j % 4) * 13.5, y + 5 + Math.floor(j / 4) * 22, 11, 18, 'fa', 2); } return h + K.t(170, 168, q > 0 ? `quedan ${q} por fuera` : 'todos guardados', q > 0 ? 'tf' : 'to'); };

  xpLec('pu-ar-4', [
    ['El peor caso',
      xpMira('dibujo', 'Empecemos por la idea: «estar **seguro**» es aguantar la peor suerte.', { dib: bolas, v: { l: [0, 1, 2, 3, 4, 4], n: 0, t: '' }, alto: 130 }, [
        ['Un cajón con medias de 5 colores, muchas de cada uno. ¿Cuántas sacar para tener **seguro** un par?', {}],
        ['Con dos podría salir un par de una vez. Pero eso sería suerte.', { n: 2, l: [0, 0, 1, 2, 3, 3] }],
        ['La peor suerte: las cinco primeras salen todas distintas.', { n: 5, l: [0, 1, 2, 3, 4, 4], t: '5 y ningún par' }],
        ['La sexta repite algún color, sea el que sea. Con 6 es seguro.', { n: 6, t: '6: par seguro' }, '$5 + 1 = 6$'],
      ], 'Imagina la peor suerte posible y suma 1.'),
      xpHaz('dibujo', 'En una urna hay 4 bolas naranjas, 6 amarillas y 3 verdes. Saca bolas en el peor orden hasta tener **seguro** 2 verdes.', { dib: bolas, v: { l: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2], n: 2 }, metas: { n: 12 }, alto: 200, manijas: [{ k: 'n', min: 0, max: 13, paso: 1, et: 'bolas sacadas' }],
        lee: v => `$6 + 4 = 10 ${v.n > 10 ? ` \\quad ${v.n} - 10 = ${v.n - 10}` : ''}$`, dice: v => `${v.n} sacadas: ${Math.max(0, v.n - 10)} ${v.n === 11 ? 'verde' : 'verdes'} en el peor caso.` }, 'Pueden salir antes las 10 que no son verdes: $10 + 2 = 12$.')],
    ['El producto más grande',
      xpMira('dibujo', 'Segunda idea: con la misma cerca, gana **el cuadrado**.', { dib: rect, v: { a: 1, S: 8, u: 19 }, alto: 218 }, [
        ['Con 16 m de cerca, largo y ancho suman 8. Si mide 1 por 7, el área es 7.', {}, '$1 \\cdot 7 = 7$'],
        ['Con 2 por 6 ya son 12.', { a: 2 }, '$2 \\cdot 6 = 12$'],
        ['Con 3 por 5 son quince.', { a: 3 }, '$3 \\cdot 5 = 15$'],
        ['Con 4 por 4 llega a 16: lo máximo. Es el cuadrado.', { a: 4 }, '$4 \\cdot 4 = 16$'],
        ['Más allá vuelve a bajar: 6 por 2 son 12.', { a: 6 }, '$6 \\cdot 2 = 12$'],
      ], 'Si la suma es fija, el producto es mayor cuando los dos números son iguales.'),
      xpHaz('dibujo', 'Con 28 m de cerca, ajusta el ancho hasta el corral de mayor área.', { dib: rect, v: { a: 2, S: 14, u: 11.5 }, metas: { a: 7 }, alto: 265, manijas: [{ k: 'a', min: 1, max: 13, paso: 1, et: 'ancho' }],
        lee: v => `$${v.a} \\cdot ${14 - v.a} = ${v.a * (14 - v.a)}$`, dice: v => `Los lados suman 14: ${v.a} y ${14 - v.a}.` }, 'Largo y ancho suman 14: 7 por 7, 49 m².')],
    ['Repartos extremos',
      xpMira('dibujo', 'Tercera idea: para que **uno** reciba lo más posible, los demás reciben lo mínimo.', { dib: torres, v: { d: [1, 3, 4, 7], t: '' }, alto: 190 }, [
        ['Se reparten 15 monedas entre 4 amigos. Todos reciben algo y cantidades distintas.', { t: '15 monedas' }],
        ['¿Cuánto puede recibir, como mucho, uno? Los otros deben recibir lo menos posible.', {}],
        ['Lo menos, sin repetir: 1, 2 y 3. Suman 6.', { d: [1, 2, 3, 0] }, '$1 + 2 + 3 = 6$'],
        ['El resto es para el último: 9 monedas.', { d: [1, 2, 3, 9] }, '$15 - 6 = 9$'],
        ['Para el mínimo del que más recibe, se reparte lo más parejo posible.', { d: [2, 3, 4, 6] }, '$2 + 3 + 4 + 6 = 15$'],
      ], 'Máximo de uno: los demás al mínimo. Mínimo del mayor: todos lo más parejo posible.'),
      xpHaz('fichas', 'Se reparten 25 dulces entre 5 niños, todos con algo y cantidades distintas. Pon los cuatro mínimos, su suma y lo máximo que recibe uno.', { slots: [0, 1, 2, 3].map(i => ({ x: 36 + i * 54, y: 58, w: 48, et: i ? '' : 'mínimos' })).concat([{ x: 258, y: 58, w: 56, et: 'suma' }, { x: 314, y: 58, w: 48, et: 'máximo' }]), fichas: ['1', '2', '3', '4', '10', '15', '5', '21'], cumple: q => [0, 1, 2, 3].map(i => q[i][0]).sort().join('') === '1234' && q[4][0] === '10' && q[5][0] === '15', sol: ['1', '2', '3', '4', '10', '15'], alto: 106, pista: 'Lo menos posible sin repetir: 1, 2, 3 y 4.' }, '$1 + 2 + 3 + 4 = 10$ y $25 - 10 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Hay 43 libros y en cada caja caben 8. ¿Cuál es la **menor** cantidad de cajas que sirve?', { dib: cajas, v: { n: 2 }, metas: { n: 6 }, alto: 225, manijas: [{ k: 'n', min: 1, max: 8, paso: 1, et: 'cajas' }],
        lee: v => `$8 \\cdot ${v.n} = ${8 * v.n}$`, dice: v => (8 * v.n < 43 ? `Faltan ${43 - 8 * v.n} libros por guardar.` : v.n > 6 ? 'Sobran cajas enteras: con menos también cabían.' : 'Caben todos, y con una caja menos no.') }, '$5 \\cdot 8 = 40$ no alcanza; con 6 cajas sí, aunque la última no se llene.')],
  ], 'La peor suerte más uno, el cuadrado para el producto, y los demás al mínimo.');
}
;
//#archivo js/explora-pu-ec-1.js
// Preuniversitario · pu-ec-1 «Del texto a la ecuación» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Balanza: cajas x y pesas sueltas a cada lado; iq/de = [cajas, pesas].
  const plato = (K, x, y, c, p) => { let h = K.l(x - 62, y, x + 62, y, 'gr'); let k = 0; const X = i => x - 52 + i * 26; for (let i = 0; i < c; i++, k++) h += K.r(X(k % 4) , y - 26 - Math.floor(k / 4) * 28, 24, 24, 'fa', 4) + K.t(X(k % 4) + 12, y - 9 - Math.floor(k / 4) * 28, 'x', 's'); return h + (p ? K.r(x + 28, y - 26 - (c > 3 ? 28 : 0), 34, 24, 'fg', 4) + K.t(x + 45, y - 9 - (c > 3 ? 28 : 0), p, 's') : ''); };
  const bal = (v, K) => { const d = Math.max(-16, Math.min(16, v.d ?? 0)); return K.l(84, 128 + d, 256, 128 - d, 'gr') + K.p([[170, 128], [152, 178], [188, 178]], 'fc') + plato(K, 84, 128 + d, Math.round(v.c1), Math.round(v.p1)) + plato(K, 256, 128 - d, Math.round(v.c2), Math.round(v.p2)) + K.t(170, 28, v.t || '', 'b ta'); };
  // Partes iguales en barras.
  const partes = (v, K) => v.f.map(([n, e, s], i) => { const y = 34 + i * 46; let h = K.t(58, y + 21, e, 's', 'end'); for (let k = 0; k < n; k++) h += K.r(66 + k * 52, y, 50, 32, 'fa', 5) + K.t(91 + k * 52, y + 21, v.x ?? 'x', ''); return h + (s ? K.r(66 + n * 52, y, 44, 32, 'fg', 5) + K.t(88 + n * 52, y + 21, `+${s}`, 's') : ''); }).join('') + K.t(170, 34 + v.f.length * 46 + 12, v.t || '', 'ta');

  xpLec('pu-ec-1', [
    ['Traducir palabra por palabra',
      xpMira('dibujo', 'Empecemos por la idea: una frase se **traduce** a símbolos, pedazo por pedazo.', { dib: (v, K) => v.l.map(([a, b], i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(160, 38 + i * 36, a, '', 'end') + K.ar(172, 33 + i * 36, 198, 33 + i * 36, 'lm') + K.t(212, 38 + i * 36, b, 'b ta', 'start'))).join(''), v: { l: [['un número', 'x'], ['el doble', '2x'], ['más 5', '2x + 5'], ['es 21', '2x + 5 = 21']], n: 0 }, alto: 170 }, [
        ['«El doble de un número, más 5, es 21». Al número que no se conoce lo llamamos x.', { n: 1 }],
        ['El doble es dos veces el número.', { n: 2 }, '$2x$'],
        ['Más 5: se le suma 5 a eso.', { n: 3 }, '$2x + 5$'],
        ['La palabra «es» se vuelve el signo igual.', { n: 4 }, '$2x + 5 = 21$'],
        ['Ojo: «el doble de un número más 5» puede confundir. La coma dice qué va primero.', {}],
      ], 'Ponle x a lo que no sabes; cada palabra es una operación, y «es» es el igual.'),
      xpHaz('fichas', 'Arma la ecuación: «al triple de un número le quito 4 y me da 20».', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 60, y: 50, w: 52 })), fichas: ['3x', '−', '4', '=', '20', '+', 'x'], cumple: q => ['3x−4=20', '20=3x−4'].includes(q.map(l => l[0]).join('')), sol: ['3x', '−', '4', '=', '20'], alto: 84, pista: 'El triple es tres veces el número.' }, '$3x - 4 = 20$.')],
    ['La balanza',
      xpMira('dibujo', 'Segunda idea: una ecuación es una **balanza**: lo que hagas a un lado, hazlo al otro.', { dib: bal, v: { c1: 3, p1: 4, c2: 0, p2: 19, d: 0, t: '3x + 4 = 19' }, alto: 190 }, [
        ['Tres cajas iguales y 4 de peso equilibran 19.', {}, '$3x + 4 = 19$'],
        ['Si quitamos 4 solo de un lado, se desequilibra.', { p1: 0, d: -12, t: '' }],
        ['Quitamos 4 también del otro: quedan tres cajas y 15.', { p2: 15, d: 0, t: '3x = 15' }, '$19 - 4 = 15$'],
        ['Repartimos entre 3: una caja pesa 5.', { c1: 1, p2: 5, t: 'x = 5' }, '$15 \\div 3 = 5$'],
        ['Comprobamos: 3 por 5, más 4, son 19.', {}, '$3 \\cdot 5 + 4 = 19$'],
      ], 'Quita lo mismo a los dos lados hasta dejar sola la x; luego divide.'),
      xpHaz('dibujo', 'Aquí hay cajas a los dos lados: $4x + 1 = x + 16$. Mueve la x hasta que la balanza quede derecha.', { dib: (v, K) => bal({ c1: 4, p1: 1, c2: 1, p2: 16, d: (3 * v.x - 15) * 1.4, t: '' }, K), v: { x: 1 }, metas: { x: 5 }, alto: 240, manijas: [{ k: 'x', min: 0, max: 10, paso: 1, et: 'x' }],
        lee: v => `$4 \\cdot ${v.x} + 1 = ${4 * v.x + 1} \\qquad ${v.x} + 16 = ${v.x + 16}$`, dice: v => (v.x < 5 ? 'Pesa más la derecha.' : v.x > 5 ? 'Pesa más la izquierda.' : 'En equilibrio.') }, 'Quitando una caja y 1 de cada lado: $3x = 15$, $x = 5$.')],
    ['Todo con la misma x',
      xpMira('dibujo', 'Tercera idea: si hay varias cantidades, **escríbelas todas** con la misma x.', { dib: partes, v: { f: [[1, 'Ana', 0], [2, 'Beto', 0], [1, 'Caro', 8]], x: 'x', t: '' }, alto: 200 }, [
        ['Beto tiene el doble de Ana, y Caro, 8 más que Ana. Entre los tres, 48.', { t: 'suman 48' }],
        ['Ana es x, Beto 2x y Caro x + 8. Son cuatro cajas iguales y 8 más.', {}, '$x + 2x + x + 8 = 4x + 8$'],
        ['Quitamos el 8: cuatro cajas valen 40.', {}, '$4x = 48 - 8 = 40$'],
        ['Cada caja vale 10: Ana 10, Beto 20 y Caro 18.', { x: '10', t: '10 + 20 + 18 = 48' }, '$x = 10$'],
        ['Conviene llamar x al más pequeño, o al que se usa para describir a los otros.', {}],
      ], 'Llama x a uno, escribe los demás con esa x y súmalos.'),
      xpHaz('dibujo', 'El segundo tiene el triple del primero, y el tercero, 2 más que el primero. Suman 62. Ajusta x.', { dib: (v, K) => partes({ f: [[1, '1.º', 0], [3, '2.º', 0], [1, '3.º', 2]], x: v.x, t: `suman ${5 * v.x + 2}` }, K), v: { x: 5 }, metas: { x: 12 }, alto: 245, manijas: [{ k: 'x', min: 1, max: 20, paso: 1, et: 'x' }],
        lee: v => `$5 \\cdot ${v.x} + 2 = ${5 * v.x + 2}$`, dice: v => (5 * v.x + 2 < 62 ? 'Aún no llegan a 62.' : 5 * v.x + 2 > 62 ? 'Se pasaron de 62.' : 'Justo 62.') }, '$5x + 2 = 62$: $x = 12$, y son 12, 36 y 14.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Tres números **impares** seguidos suman 51. Encuéntralos.', { slots: [0, 1, 2].map(i => ({ x: 90 + i * 80, y: 56, w: 66, et: ['x', 'x + 2', 'x + 4'][i] })), fichas: ['15', '17', '19', '16', '13', '21'], meta: ['15', '17', '19'], alto: 104, pista: 'El del medio es la tercera parte de 51.' }, '$3x + 6 = 51$, $x = 15$: 15, 17 y 19.')],
  ], 'Traducir, equilibrar y escribir todo con la misma x.');
}
;
//#archivo js/explora-pu-ec-2.js
// Preuniversitario · pu-ec-2 «Edades, mezclas y monedas» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos edades que crecen juntas.
  const edades = (v, K) => { const u = v.u ?? 4, A = v.a + v.t, B = v.b + v.t; return K.t(24, 42, v.ea, 's tm', 'start') + K.r(24, 48, v.a * u, 30, 'fa') + K.r(24 + v.a * u, 48, v.t * u, 30, 'ff') + K.t(24 + A * u + 8, 69, N(A), 'ta', 'start') + K.t(24, 106, v.eb, 's tm', 'start') + K.r(24, 112, v.b * u, 30, 'fg') + K.r(24 + v.b * u, 112, v.t * u, 30, 'ff') + K.t(24 + B * u + 8, 133, N(B), 'tg', 'start') + K.f(v.d ?? 0, K.cota(24 + B * u, 156, 24 + A * u, 156, `diferencia ${v.a - v.b}`, 'tf')); };
  // n monedas: k de las grandes.
  const monedas = (v, K) => { let h = ''; for (let i = 0; i < v.n; i++) { const g = i < Math.round(v.k), x = 36 + (i % 8) * 38, y = 50 + Math.floor(i / 8) * 42; h += K.c(x, y, g ? 17 : 13, g ? 'fG' : 'fA') + K.t(x, y + 4, g ? v.G : v.P, 'tc s'); } return h + K.t(170, 142, v.t ?? `total ${v.n * v.P + Math.round(v.k) * (v.G - v.P)}`, 'b ta'); };
  // Mezcla: dos frascos y el precio por kilo del resultado.
  const mezcla = (v, K) => { const m = (v.a * v.pa + v.b * v.pb) / (v.a + v.b), u = 13; return K.r(50, 150 - v.a * u, 70, v.a * u, 'fa') + K.t(85, 168, `${N(v.a)} ${v.un}`, 's') + K.t(85, 140 - v.a * u, v.pa, 'ta') + K.r(220, 150 - v.b * u, 70, v.b * u, 'fg') + K.t(255, 168, `${N(v.b)} ${v.un}`, 's') + K.t(255, 140 - v.b * u, v.pb, 'tg') + K.t(170, 100, N(m), 'B tf') + K.t(170, 122, 'la mezcla', 's tm'); };

  xpLec('pu-ec-2', [
    ['Las edades crecen juntas',
      xpMira('dibujo', 'Empecemos por la idea: pasan los años y la **diferencia** de edades no cambia.', { dib: edades, v: { a: 34, b: 10, t: 0, d: 0, ea: 'tía', eb: 'sobrino' }, alto: 185 }, [
        ['Una tía tiene 34 años y su sobrino 10. Se llevan 24.', { d: 1 }, '$34 - 10 = 24$'],
        ['Pasan 6 años: los dos crecen igual, 40 y 16. Se siguen llevando 24.', { t: 6 }, '$40 - 16 = 24$'],
        ['¿Cuándo tendrá la tía el doble? Cuando la diferencia sea igual a la edad del sobrino.', {}, '$2x - x = 24$'],
        ['Es decir, cuando él tenga 24 y ella 48: dentro de 14 años.', { t: 14 }, '$24 - 10 = 14$'],
        ['Con ecuación: 34 más t es el doble de 10 más t.', {}, '$34 + t = 2(10 + t)$'],
      ], 'A los dos se les suman los mismos años. La diferencia es siempre la misma.'),
      xpHaz('dibujo', 'Un padre tiene 38 años y su hija 10. Mueve los años hasta que él tenga el **doble** que ella.', { dib: edades, v: { a: 38, b: 10, t: 2, u: 3.9, d: 0, ea: 'padre', eb: 'hija' }, metas: { t: 18 }, alto: 205, manijas: [{ k: 't', min: 0, max: 24, paso: 1, et: 'años que pasan' }],
        lee: v => `$38 + ${v.t} = ${38 + v.t} \\qquad 2 \\cdot (10 + ${v.t}) = ${2 * (10 + v.t)}$`, dice: v => `Él tendría ${38 + v.t} y ella ${10 + v.t}.` }, '$38 + t = 20 + 2t$: $t = 18$, con 56 y 28 años.')],
    ['Cambiar una por otra',
      xpMira('dibujo', 'Segunda idea: supón que **todas son iguales** y cambia de a una.', { dib: monedas, v: { n: 10, k: 0, G: 5, P: 2 }, alto: 155 }, [
        ['Diez billetes, unos de 2 mil y otros de 5 mil, suman 38 mil. ¿Cuántos hay de cada uno?', { t: 'deben ser 38' }],
        ['Supongamos que todos son de 2 mil: serían 20 mil.', { t: null }, '$10 \\cdot 2 = 20$'],
        ['Cada vez que se cambia uno de 2 por uno de 5, el total sube 3.', { k: 1 }, '$20 + 3 = 23$'],
        ['Faltan 18 desde 20 hasta 38: son seis cambios.', { k: 6 }, '$18 \\div 3 = 6$'],
        ['Seis de 5 mil y cuatro de 2 mil: 30 más 8.', {}, '$6 \\cdot 5 + 4 \\cdot 2 = 38$'],
      ], 'Supón que todas valen lo menos; cada cambio sube la diferencia entre las dos.'),
      xpHaz('dibujo', 'Quince monedas de 1 y de 5 suman 39. Cambia monedas hasta lograrlo.', { dib: monedas, v: { n: 15, k: 0, G: 5, P: 1 }, metas: { k: 6 }, alto: 210, manijas: [{ k: 'k', min: 0, max: 15, paso: 1, et: 'monedas de 5' }],
        lee: v => `$5 \\cdot ${v.k} + ${15 - v.k} = ${15 + 4 * v.k}$`, dice: v => `Cada cambio sube 4. Van ${15 + 4 * v.k}.` }, 'Todas de 1 son 15; faltan 24 y cada cambio sube 4: seis monedas de 5.')],
    ['Mezclas',
      xpMira('dibujo', 'Tercera idea: en una mezcla se suma lo que **vale** cada parte.', { dib: mezcla, v: { a: 3, pa: 4, b: 3, pb: 10, un: 'kg' }, alto: 180 }, [
        ['Tres kilos de 4 mil y tres kilos de 10 mil. Mitad y mitad: la mezcla vale 7 mil el kilo.', {}, '$\\tfrac{3 \\cdot 4 + 3 \\cdot 10}{6} = 7$'],
        ['Si se pone más del barato, 6 kilos, el precio baja hacia 4.', { a: 6 }, '$\\tfrac{6 \\cdot 4 + 3 \\cdot 10}{9} = 6$'],
        ['Se suma lo que vale cada parte y se divide entre todos los kilos.', {}, '$\\tfrac{24 + 30}{9} = 6$'],
        ['El precio de la mezcla siempre queda entre los dos.', {}, '$4 < 6 < 10$'],
      ], 'Valor de la mezcla = (cantidad × precio de cada parte, sumado) ÷ cantidad total.'),
      xpHaz('dibujo', 'Hay 2 kg de maní de 8 mil. ¿Cuántos kilos de uno de 5 mil se le agregan para que la mezcla valga 6 mil?', { dib: (v, K) => mezcla({ a: 2, pa: 8, b: v.b, pb: 5, un: 'kg' }, K), v: { b: 1 }, metas: { b: 4 }, alto: 230, manijas: [{ k: 'b', min: 1, max: 8, paso: 1, et: 'kilos de 5 mil' }],
        lee: v => `$\\tfrac{2 \\cdot 8 + ${v.b} \\cdot 5}{${2 + v.b}} = ${N((16 + 5 * v.b) / (2 + v.b))}$`, dice: v => `La mezcla valdría ${N((16 + 5 * v.b) / (2 + v.b))} mil el kilo.` }, '$\\tfrac{16 + 20}{6} = 6$: cuatro kilos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Hay 14 asientos entre bancos de 3 patas y sillas de 4, y 48 patas en total. Pon las patas si todos fueran bancos, las sillas y los bancos.', { slots: [{ x: 62, y: 58, w: 96, et: 'todos bancos' }, { x: 170, y: 58, w: 96, et: 'sillas' }, { x: 278, y: 58, w: 96, et: 'bancos' }], fichas: ['42', '6', '8', '56', '7', '12'], meta: ['42', '6', '8'], alto: 106, pista: 'Cada banco que se cambia por silla agrega 1 pata. Faltan 48 − 42.' }, '$14 \\cdot 3 = 42$; faltan 6 patas, una por silla: 6 sillas y 8 bancos.')],
  ], 'Los mismos años para todos, cambios de uno por otro, y sumar lo que vale cada parte.');
}
;
//#archivo js/explora-pu-ec-3.js
// Preuniversitario · pu-ec-3 «Sistemas y desigualdades» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Recibos: filas de dibujos (cafés en azul, tortas en dorado) con su total.
  const rec = (v, K) => v.f.map(([c, t, s], i) => { const y = 40 + i * 52; let h = ''; for (let k = 0; k < c; k++) h += K.r(26 + k * 34, y - 14, 26, 28, 'fa', 6) + K.t(39 + k * 34, y + 5, 'c', 's'); for (let k = 0; k < t; k++) h += K.c(140 + k * 34, y, 14, 'fg') + K.t(140 + k * 34, y + 5, 't', 's'); return h + K.t(262, y + 5, `= ${s}`, 'b', 'start'); }).join('') + K.f(v.r ?? 0, K.l(20, 118, 320, 118, 'lm')) + K.t(170, 40 + v.f.length * 52 + 4, v.p || '', 'b ta');
  // Recta con una solución pintada desde b hacia dir.
  const X = x => 170 + x * 22, recta = (v, K) => { let h = K.l(12, 90, 328, 90, 'lm'); for (let k = -7; k <= 7; k++) h += K.l(X(k), 86, X(k), 94, 'lm') + K.t(X(k), 112, K.sig(k), k === 0 ? 's' : 's tm'); return h + (v.sol ? K.l(X(v.b) + 8 * Math.sign(v.dir), 90, v.dir > 0 ? 326 : 14, 90, 'la gr') + K.ar(X(v.b) + 8 * Math.sign(v.dir), 90, v.dir > 0 ? 328 : 12, 90, 'la gr') + K.c(X(v.b), 90, 8, v.ab ? 'fn' : 'fA') : '') + K.t(170, 40, v.t || '', 'b ta'); };
  // Dos puntos en la recta: p < q, y sus imágenes al multiplicar por k.
  const dos = (v, K) => recta({ t: v.t }, K) + K.c(X(v.p), 90, 10, 'fA') + K.t(X(v.p), 72, K.sig(Math.round(v.p * 10) / 10), 'ta') + K.c(X(v.q), 90, 10, 'fG') + K.t(X(v.q), 72, K.sig(Math.round(v.q * 10) / 10), 'tg');

  xpLec('pu-ec-3', [
    ['Dos recibos',
      xpMira('dibujo', 'Empecemos por la idea: dos condiciones a la vez se **comparan**, como dos recibos.', { dib: rec, v: { f: [[2, 3, 19], [2, 1, 9]], p: '', r: 0 }, alto: 170 }, [
        ['Dos cafés y tres tortas cuestan 19. Dos cafés y una torta, 9.', {}],
        ['Los dos recibos tienen los mismos cafés. Se diferencian en dos tortas.', { p: '3 − 1 = 2 tortas' }],
        ['Y en el precio se diferencian en 10: dos tortas valen 10.', { p: '2t = 19 − 9 = 10' }, '$19 - 9 = 10$'],
        ['Cada torta vale 5.', { p: 't = 5' }, '$t = 5$'],
        ['En el segundo recibo: dos cafés más 5 son 9, así que cada café vale 2.', { p: 'c = 2' }, '$2c + 5 = 9$'],
      ], 'Si dos ecuaciones comparten una parte, réstalas: esa parte desaparece.'),
      xpHaz('dibujo', 'Un lápiz y dos borradores cuestan 8; tres lápices y dos borradores, 12. Ajusta los dos precios.', { dib: (v, K) => [[1, 2, 8], [3, 2, 12]].map(([a, b, s], i) => { const y = 40 + i * 44, t = a * v.l + b * v.b; let h = ''; for (let k = 0; k < a; k++) h += K.r(26 + k * 34, y - 12, 26, 24, 'fa', 6) + K.t(39 + k * 34, y + 5, v.l, 's'); for (let k = 0; k < b; k++) h += K.c(146 + k * 34, y, 13, 'fg') + K.t(146 + k * 34, y + 5, v.b, 's'); return h + K.t(212, y + 5, `= ${t}`, t === s ? 'b to' : 'b tf', 'start') + K.t(290, y + 5, `(${s})`, 'tm', 'start'); }).join(''), v: { l: 5, b: 1 }, metas: { l: 2, b: 3 }, alto: 210, manijas: [{ k: 'l', min: 0, max: 8, paso: 1, et: 'lápiz' }, { k: 'b', min: 0, max: 8, paso: 1, et: 'borrador' }],
        lee: v => `$${v.l} + 2 \\cdot ${v.b} = ${v.l + 2 * v.b} \\qquad 3 \\cdot ${v.l} + 2 \\cdot ${v.b} = ${3 * v.l + 2 * v.b}$`, dice: () => 'Los dos recibos deben cuadrar a la vez. Se diferencian en dos lápices.' }, 'Dos lápices son $12 - 8 = 4$: cada uno 2, y el borrador 3.')],
    ['Suma y diferencia',
      xpMira('dibujo', 'Segunda idea: si se conocen la **suma** y la **diferencia**, se emparejan.', { dib: (v, K) => K.t(30, 46, 'mayor', 's tm', 'start') + K.r(30, 52, v.s * 14, 32, 'fa') + K.r(30 + v.s * 14, 52, v.d * 14, 32, 'ff') + K.t(30, 112, 'menor', 's tm', 'start') + K.r(30, 118, v.s * 14, 32, 'fg') + K.t(170, 28, v.p || '', 'b ta') + K.f(v.n, K.t(30 + v.s * 7, 73, v.s, 's') + K.t(30 + v.s * 7, 139, v.s, 's')) + (v.d > 0.2 ? K.t(30 + v.s * 14 + v.d * 7, 73, '4', 's') : ''), v: { s: 7, d: 4, p: '', n: 0 }, alto: 165 }, [
        ['Dos números suman 18 y el mayor le lleva 4 al menor.', { p: 'suman 18' }],
        ['Si al mayor le quitamos los 4 de ventaja, quedan iguales y suman 14.', { d: 0, p: '18 − 4 = 14' }, '$18 - 4 = 14$'],
        ['Cada uno es la mitad de 14: siete. Ese es el menor.', { n: 1, p: 'menor: 7' }, '$14 \\div 2 = 7$'],
        ['El mayor es 7 más los 4: once.', { d: 4, p: 'mayor: 11' }, '$7 + 4 = 11$'],
        ['Con ecuaciones es sumar las dos: 2x es 18 más 4.', {}, '$2x = 18 + 4 = 22$'],
      ], 'Menor = (suma − diferencia) ÷ 2. Mayor = (suma + diferencia) ÷ 2.'),
      xpHaz('fichas', 'Dos números suman 26 y se llevan 8. Pon el menor y el mayor.', { slots: [{ x: 110, y: 56, w: 92, et: 'menor' }, { x: 230, y: 56, w: 92, et: 'mayor' }], fichas: ['9', '17', '18', '8', '13'], meta: ['9', '17'], alto: 104, pista: 'Quita la ventaja: 26 − 8 = 18, y reparte entre 2.' }, '$18 \\div 2 = 9$ y $9 + 8 = 17$.')],
    ['Desigualdades',
      xpMira('dibujo', 'Tercera idea: multiplicar por un negativo **voltea** la desigualdad.', { dib: (v, K) => (v.m < 0.5 ? dos(v, K) : recta(v, K)), v: { m: 0, p: 2, q: 5, t: '2 < 5', sol: 0, b: 0, dir: 1, ab: 0 }, alto: 130 }, [
        ['2 es menor que 5: está más a la izquierda.', {}, '$2 < 5$'],
        ['Si multiplicamos los dos por −1, saltan al otro lado del cero, en espejo.', { p: -2, q: -5, t: '−2 > −5' }],
        ['Ahora −2 está a la derecha de −5: el signo se volteó.', {}, '$-2 > -5$'],
        ['Para resolver −4x < 8, se divide entre −4 y se voltea.', { m: 1, t: 'x > −2', sol: 1, b: -2, dir: 1, ab: 1 }, '$-4x < 8 \\;\\Rightarrow\\; x > -2$'],
        ['Sumar o restar no voltea nada; solo multiplicar o dividir por un negativo.', {}],
      ], 'Se despeja como una ecuación, pero al multiplicar o dividir por un negativo se voltea el signo.'),
      xpHaz('dibujo', 'Pinta la solución de $1 - 2x \\ge -7$: mueve el borde y elige hacia dónde va la flecha.', { dib: (v, K) => recta({ ...v, sol: 1, ab: 0, t: `x ${v.dir > 0 ? '≥' : '≤'} ${K.sig(v.b)}` }, K), v: { b: 0, dir: 1 }, metas: { b: 4, dir: -1 }, alto: 190,
        manijas: [{ k: 'b', min: -6, max: 6, paso: 1, r: 10, en: v => [X(v.b), 90], de: x => (x - 170) / 22 }, { k: 'dir', min: -1, max: 1, paso: 2, et: 'sentido de la flecha', rot: v => (v.dir > 0 ? '→' : '←') }],
        lee: v => `$x = ${v.b}: \\; 1 - 2 \\cdot ${v.b < 0 ? `(${v.b})` : v.b} = ${1 - 2 * v.b}$`, dice: v => { const p = v.dir > 0 ? Math.max(5, v.b + 1) : v.b; return 1 - 2 * p < -7 ? `Tu zona incluye el ${K1(p)}, y 1 − 2x da ${K1(1 - 2 * p)}: menos que −7.` : v.b < 4 ? 'Todos los de tu zona cumplen, pero quedan otros por fuera, como el 4.' : 'Todos cumplen, y no queda ninguno por fuera.'; } }, '$-2x \\ge -8$; al dividir entre $-2$ se voltea: $x \\le 4$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un taxi cobra 5 mil de arranque y 3 mil por kilómetro. Con 32 mil, ¿cuántos kilómetros como **máximo** se pueden recorrer?', { dib: (v, K) => K.t(170, 40, `5 + 3 · ${v.k} = ${5 + 3 * v.k}`, 5 + 3 * v.k > 32 ? 'B tf' : 'B ta') + K.r(30, 70, 280, 30, 'fc') + K.r(30, 70, Math.min(280, (5 + 3 * v.k) * 7), 30, 5 + 3 * v.k > 32 ? 'ff' : 'fa') + K.l(30 + 32 * 7, 62, 30 + 32 * 7, 108, 'lg gr') + K.t(30 + 32 * 7, 124, '32', 'tg'), v: { k: 2 }, metas: { k: 9 }, alto: 190, manijas: [{ k: 'k', min: 0, max: 12, paso: 1, et: 'kilómetros' }],
        lee: () => '$5 + 3k \\le 32$', dice: v => (5 + 3 * v.k > 32 ? 'Se pasó del dinero.' : v.k < 9 ? 'Todavía alcanza para más.' : 'Justo: uno más ya no alcanza.') }, '$3k \\le 27$: como máximo 9 km.')],
  ], 'Restar recibos, emparejar suma y diferencia, y voltear el signo con los negativos.');
  function K1(x) { return String(x).replace('-', '−'); }
}
;
//#archivo js/explora-pu-cj-1.js
// Preuniversitario · pu-cj-1 «Operaciones y Venn» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Dos círculos y sus cuatro zonas como caminos: a = solo A, i = ambos, b = solo B, o = afuera.
  const AX = 130, BX = 210, CY = 96, R = 68, dy = Math.sqrt(R * R - 1600), y1 = CY - dy, y2 = CY + dy;
  const P = { a: `M170 ${y1} A${R} ${R} 0 1 0 170 ${y2} A${R} ${R} 0 0 1 170 ${y1} Z`, i: `M170 ${y1} A${R} ${R} 0 0 1 170 ${y2} A${R} ${R} 0 0 1 170 ${y1} Z`, b: `M170 ${y1} A${R} ${R} 0 1 1 170 ${y2} A${R} ${R} 0 0 0 170 ${y1} Z` };
  const zona = (k, cls) => `<path class="xf ${cls} sn" d="${P[k]}"/>`;
  const venn = (v, K) => {
    let h = K.r(16, 8, 308, 190, v.o > 0.5 ? 'fa' : 'fc', 10);
    if (v.o > 0.5) h += ['a', 'i', 'b'].map(k => zona(k, 'fop')).join('');
    for (const k of ['a', 'i', 'b']) if (v[k] > 0.5) h += zona(k, 'fa');
    return h + K.c(AX, CY, R, 'fn') + K.c(BX, CY, R, 'fn') + K.t(AX - 62, 32, 'A', 'b ta') + K.t(BX + 62, 32, 'B', 'b tg');
  };
  const num = (v, K) => venn(v, K) + [['na', 105], ['ni', 170], ['nb', 235]].map(([k, x]) => K.t(x, CY + 6, v[k] ?? '', 'b')).join('') + K.t(44, 172, v.no ?? '', 'b tm') + (v.p ? K.t(170, 217, v.p, 'ta') : '');
  // Zonas para fichas: solo A, ambos, solo B y afuera.
  const Z = [{ x: 98, y: 96, w: 76, h: 112, n: 4, libre: true }, { x: 170, y: 96, w: 58, h: 100, n: 3, libre: true }, { x: 242, y: 96, w: 76, h: 112, n: 4, libre: true }, { x: 170, y: 172, w: 290, h: 24, n: 4, libre: true }];

  // Zona donde se suelta una ficha: según la distancia a los centros.
  const donde = (x, y) => { if (x < 10 || x > 330 || y < 4 || y > 202) return -1; const a = Math.hypot(x - AX, y - CY) <= R, b = Math.hypot(x - BX, y - CY) <= R; return a && b ? 1 : a ? 0 : b ? 2 : 3; };

  xpLec('pu-cj-1', [
    ['Cada cosa en su zona',
      xpMira('fichas', 'Empecemos por la idea: dos círculos hacen **cuatro zonas**.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34 } : z)), fichas: ['1', '2', '4', '5', '10', '15'], alto: 202, fondo: K => venn({}, K) }, [
        ['A son los pares y B, los múltiplos de 5. Repartimos algunos números.', {}],
        ['El 2 y el 4 son pares y no múltiplos de 5: van solo en A.', { pon: { 0: ['2', '4'] } }],
        ['El 10 cumple las dos cosas: va en el centro, en la intersección.', { pon: { 1: '10' } }],
        ['El 5 y el 15, solo en B.', { pon: { 2: ['5', '15'] } }],
        ['Y el 1 no cumple ninguna: queda afuera, en el universo.', { pon: { 3: '1' } }],
      ], 'Pregunta dos veces: ¿está en A?, ¿está en B? Las respuestas dicen la zona.'),
      xpHaz('fichas', 'A: divisores de 12. B: impares. Ubica los números.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34 } : z)), donde, fichas: ['1', '2', '3', '4', '5', '6', '7', '8'], meta: [['2', '4', '6'], ['1', '3'], ['5', '7'], '8'], alto: 202, fondo: K => venn({}, K), pista: 'El 1 y el 3 dividen a 12 y son impares.' }, 'Solo A: 2, 4, 6. Ambos: 1, 3. Solo B: 5, 7. Afuera: 8.')],
    ['Las operaciones se pintan',
      xpMira('dibujo', 'Segunda idea: cada operación **pinta** unas zonas.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0 }, alto: 206 }, [
        ['Unión: lo que está en A, en B o en los dos.', { a: 1, i: 1, b: 1 }, '$A \\cup B$'],
        ['Intersección: solo lo que está en los dos.', { a: 0, b: 0 }, '$A \\cap B$'],
        ['Diferencia A menos B: lo de A, quitándole lo que también es de B.', { a: 1, i: 0 }, '$A - B$'],
        ['Complemento de A: todo lo que **no** está en A, también lo de afuera.', { a: 0, b: 1, o: 1 }, '$A^c$'],
        ['Complemento de la unión: solo lo de afuera.', { b: 0 }, '$(A \\cup B)^c$'],
      ], 'Unión: todo. Intersección: lo común. Diferencia: quitar lo común. Complemento: lo que falta del universo.'),
      xpHaz('fichas', 'Pinta $(A \\cap B)^c$: lleva una mancha a cada zona que le pertenece.', { slots: Z.map((z, i) => (i === 3 ? { ...z, y: 180, h: 34, n: 2 } : { ...z, n: 2 })), donde, fichas: ['●', '●', '●', '●'], meta: ['●', null, '●', '●'], alto: 202, fondo: (K, v, q) => venn({ a: q[0].length, i: q[1].length, b: q[2].length, o: q[3].length }, K), dice: q => (q[1].length ? 'El centro es justo lo que no va.' : 'Es todo lo que no está en la intersección.'), pista: 'Va todo menos el centro: solo A, solo B y afuera.' }, 'Todo menos el centro: es lo contrario de la intersección.')],
    ['Contar sin repetir',
      xpMira('dibujo', 'Tercera idea: al contar la unión, lo común **no se cuenta dos veces**.', { dib: num, v: { a: 1, i: 1, b: 1, o: 0, na: '', ni: '', nb: '', no: '', p: '' }, alto: 224 }, [
        ['A tiene 13 elementos, B tiene 8 y en común tienen 5.', { ni: '5' }],
        ['Solo en A quedan 13 menos 5: ocho.', { na: '8' }, '$13 - 5 = 8$'],
        ['Solo en B, 8 menos 5: tres.', { nb: '3' }, '$8 - 5 = 3$'],
        ['En la unión hay 8 más 5 más 3: dieciséis.', { p: '8 + 5 + 3 = 16' }, '$13 + 8 - 5 = 16$'],
        ['Sumar 13 y 8 daría 21: los 5 comunes se contarían dos veces.', {}],
      ], '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.'),
      xpHaz('fichas', 'A tiene 14 elementos, B tiene 11 y la unión, 19. Llena las zonas.', { slots: [{ x: 98, y: 96, w: 52 }, { x: 170, y: 96, w: 44 }, { x: 242, y: 96, w: 52 }], fichas: ['8', '6', '5', '14', '11', '3'], meta: ['8', '6', '5'], alto: 202, fondo: K => venn({}, K), pista: '14 + 11 son 25, y la unión es 19: sobran los que se contaron dos veces.' }, '$25 - 19 = 6$ en común; $14 - 6 = 8$ y $11 - 6 = 5$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un grupo de 30, 16 están en A, 12 en B y 5 en los dos. Llena las cuatro zonas.', { slots: [{ x: 98, y: 96, w: 52 }, { x: 170, y: 96, w: 44 }, { x: 242, y: 96, w: 52 }, { x: 54, y: 164, w: 52, h: 34 }], fichas: ['11', '5', '7', '7', '16', '12', '2'], meta: ['11', '5', '7', '7'], alto: 202, fondo: K => venn({}, K), pista: 'Empieza por el centro. Afuera quedan 30 menos los de la unión.' }, 'Centro 5, solo A 11, solo B 7: la unión es 23 y afuera quedan 7.')],
  ], 'Cuatro zonas, operaciones que las pintan y lo común que se cuenta una sola vez.');
}
;
//#archivo js/explora-pu-cj-2.js
// Preuniversitario · pu-cj-2 «Encuestas» (Explora). Los ejemplos no son los de los ejercicios.
{
  const dos = (v, K) => K.r(16, 8, 308, 168, 'fc', 10) + K.c(130, 94, 66, 'fa') + K.c(210, 94, 66, 'fg') + K.t(62, 30, v.A, 's ta') + K.t(278, 30, v.B, 's tg') + K.t(102, 100, v.na ?? '', 'b') + K.t(170, 100, v.ni ?? '', 'b') + K.t(238, 100, v.nb ?? '', 'b') + K.t(52, 164, v.no ?? '', 'b tm') + (v.p ? K.t(170, 198, v.p, 'ta') : '');
  const C3 = [[135, 84], [205, 84], [170, 144]], tres = (v, K) => K.c(...C3[0], 62, 'fa') + K.c(...C3[1], 62, 'fg') + K.c(...C3[2], 62, 'ff') + K.t(70, 26, v.e?.[0] ?? 'A', 'ta') + K.t(270, 26, v.e?.[1] ?? 'B', 'tg') + K.t(250, 196, v.e?.[2] ?? 'C', 'tf') + [['abc', 170, 108], ['ab', 170, 70], ['ac', 132, 126], ['bc', 208, 126], ['a', 102, 74], ['b', 238, 74], ['c', 170, 176]].map(([k, x, y]) => K.t(x, y + 5, v[k] ?? '', 'b')).join('');
  // Dos barras sobre una de total T: la de B se corre y lo que se solapa es «los dos».
  const barras = (v, K) => { const u = 290 / v.M, a = v.a * u, b = v.b * u, xb = 24 + a - v.s * u; return K.t(24, 22, `${v.T - v.n} tienen alguno`, 's tm', 'start') + K.r(24, 30, (v.T - v.n) * u, 18, 'fc') + K.r(24 + (v.T - v.n) * u, 30, v.n * u, 18, 'fM') + K.r(24, 62, a, 32, 'fa') + K.t(30, 83, `A ${v.a}`, 's', 'start') + K.r(xb, 98, b, 32, 'fg') + K.t(xb + 6, 119, `B ${v.b}`, 's', 'start') + (v.s > 0 ? K.r(xb, 62, v.s * u, 68, 'ff d') + K.t(xb + v.s * u / 2, 150, `los dos ${Math.round(v.s)}`, 'tf') : '') + K.l(24 + (v.T - v.n) * u, 26, 24 + (v.T - v.n) * u, 134, 'lo d'); };

  xpLec('pu-cj-2', [
    ['Del centro hacia afuera',
      xpMira('dibujo', 'Empecemos por la idea: una encuesta se llena **desde el centro**.', { dib: dos, v: { A: 'música', B: 'cine', na: '', ni: '', nb: '', no: '', p: '50 personas' }, alto: 205 }, [
        ['De 50 personas, 28 oyen música, 20 van a cine y 9 hacen las dos cosas.', {}],
        ['Primero el centro: los 9 que hacen las dos.', { ni: '9' }],
        ['De los 28 de música, 9 ya están puestos. Solo música: 19.', { na: '19' }, '$28 - 9 = 19$'],
        ['De los 20 de cine, solo cine: 11.', { nb: '11' }, '$20 - 9 = 11$'],
        ['Adentro hay 39. De 50, afuera quedan 11 que no hacen ninguna.', { no: '11' }, '$50 - (19 + 9 + 11) = 11$'],
      ], 'Primero los que hacen las dos; luego se restan; al final, los de afuera.'),
      xpHaz('fichas', 'De 45 lectores, 24 leen novela, 19 leen poesía y 8 leen las dos. Llena el diagrama.', { slots: [{ x: 102, y: 94, w: 52 }, { x: 170, y: 94, w: 44 }, { x: 238, y: 94, w: 52 }, { x: 54, y: 156, w: 52, h: 34 }], fichas: ['16', '8', '11', '10', '24', '19', '2'], meta: ['16', '8', '11', '10'], alto: 186, fondo: K => dos({ A: 'novela', B: 'poesía' }, K), pista: 'El centro es 8. A cada grupo réstale esos 8.' }, 'Centro 8, solo novela 16, solo poesía 11 y afuera $45 - 35 = 10$.')],
    ['Cuando no dicen el centro',
      xpMira('dibujo', 'Segunda idea: si no dicen cuántos hacen las dos, **lo que sobra** los delata.', { dib: barras, v: { T: 32, M: 38, n: 3, a: 20, b: 17, s: 0 }, alto: 165 }, [
        ['De 32 personas, 20 tienen A, 17 tienen B y 3 no tienen ninguno.', {}],
        ['Con alguno hay 32 menos 3: veintinueve. Es la línea verde.', {}, '$32 - 3 = 29$'],
        ['Pero 20 más 17 son 37: la barra se pasa por 8.', {}, '$37 - 29 = 8$'],
        ['Esos 8 se contaron dos veces: se solapan las barras hasta la línea.', { s: 8 }],
        ['Ocho tienen los dos. Solo A: 12. Solo B: 9.', {}, '$12 + 8 + 9 = 29$'],
      ], 'Los dos = (A + B) − los que tienen alguno.'),
      xpHaz('dibujo', 'De 50 personas, 30 tienen A, 26 tienen B y 4 ninguno. Corre la barra B hasta que cuadre con la línea.', { dib: barras, v: { T: 50, M: 60, n: 4, a: 30, b: 26, s: 0 }, metas: { s: 10 }, alto: 165, manijas: [{ k: 's', min: 0, max: 20, paso: 1, r: 11, en: v => [24 + (v.a + v.b - v.s) * 290 / 60, 114], de: x => 56 - (x - 24) * 60 / 290 }],
        lee: v => `$30 + 26 - ${v.s} = ${56 - v.s}$`, dice: v => `Con alguno hay ${56 - v.s}. Deben ser 50 − 4 = 46.` }, '$56 - 46 = 10$ tienen los dos.')],
    ['Tres conjuntos',
      xpMira('dibujo', 'Tercera idea: con tres círculos es **lo mismo**: del centro hacia afuera.', { dib: tres, v: { e: ['inglés', 'francés', 'alemán'], abc: '', ab: '', ac: '', bc: '', a: '', b: '', c: '' }, alto: 212 }, [
        ['Los que estudian los tres idiomas son 3: van en el centro.', { abc: '3' }],
        ['Inglés y francés son 7 en total. Tres ya están en el centro: quedan 4.', { ab: '4' }, '$7 - 3 = 4$'],
        ['Inglés y alemán son 5: quedan 2. Francés y alemán son 4: queda 1.', { ac: '2', bc: '1' }, '$5 - 3 = 2 \\quad 4 - 3 = 1$'],
        ['Inglés son 15. Ya hay 3, 4 y 2 adentro: solo inglés, 6.', { a: '6' }, '$15 - 9 = 6$'],
        ['Francés son 13 en total: quedan 5. Alemán son 10: quedan 4.', { b: '5', c: '4' }],
      ], 'Centro, luego las parejas (restando el centro) y al final los que hacen una sola.'),
      xpHaz('fichas', 'En A y B hay 5, en A y C 6, en B y C 4 (contando los 2 que están en los tres) y en A 15. Llena las zonas vacías.', { slots: [{ x: 170, y: 64, w: 40, h: 36 }, { x: 126, y: 130, w: 40, h: 36 }, { x: 214, y: 130, w: 40, h: 36 }, { x: 98, y: 72, w: 42, h: 36 }], fichas: ['3', '4', '2', '6', '5', '9'], meta: ['3', '4', '2', '6'], alto: 212, fondo: K => tres({ abc: '2' }, K), pista: 'A cada pareja réstale los 2 del centro.' }, '$5 - 2 = 3$, $6 - 2 = 4$, $4 - 2 = 2$ y $15 - 2 - 3 - 4 = 6$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En una oficina de 36 todos toman té o café: 20 té y 22 café. Pon los que toman los dos, solo té y solo café.', { slots: [{ x: 66, y: 58, w: 88, et: 'los dos' }, { x: 170, y: 58, w: 88, et: 'solo té' }, { x: 274, y: 58, w: 88, et: 'solo café' }], fichas: ['6', '14', '16', '20', '22', '8'], meta: ['6', '14', '16'], alto: 106, pista: '20 + 22 son 42, y solo hay 36 personas.' }, '$42 - 36 = 6$; solo té 14 y solo café 16.')],
  ], 'Del centro hacia afuera, y lo que sobra al sumar es lo que está en los dos.');
}
;
//#archivo js/explora-pu-nu-1.js
// Preuniversitario · pu-nu-1 «Primos y divisibilidad» (Explora). Los ejemplos no son los de los ejercicios.
{
  // n puntos en filas de c: si sobra, la última fila queda incompleta.
  const puntos = (v, K) => { const n = Math.round(v.n), c = Math.max(1, Math.round(v.c)), f = Math.ceil(n / c), u = Math.min(26, 290 / c, 130 / f); let h = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / c), inc = r === f - 1 && n % c; h += K.c(170 + (i % c - (c - 1) / 2) * u, 40 + r * u, u * 0.36, inc ? 'fF' : 'fA'); } return h + K.t(170, 22, n % c ? `sobran ${n % c}` : `${f} × ${c} = ${n}`, n % c ? 'tf' : 'b ta'); };
  // Árbol de factores por pasos: lista de [número, izquierda, derecha].
  const arbol = (v, K) => { const q = Math.round(v.n); let h = K.t(120, 30, '60', 'B'), x = 120, y = 30; [['2', '30'], ['2', '15'], ['3', '5']].forEach(([a, b], i) => { if (i < q) { h += K.l(x - 6, y + 8, x - 34, y + 32, 'lm') + K.l(x + 6, y + 8, x + 34, y + 32, 'lm') + K.c(x - 42, y + 46, 15, 'fA') + K.t(x - 42, y + 51, a, 'tc') + (i === 2 ? K.c(x + 42, y + 46, 15, 'fA') + K.t(x + 42, y + 51, b, 'tc') : K.t(x + 42, y + 52, b, 'b')); x += 42; y += 46; } }); return h + K.t(182, 66, v.p || '', 'ta', 'start'); };
  const crit = (v, K) => K.t(170, 70, v.t, 'B') + K.t(170, 112, v.a || '', 'b ta') + K.t(170, 146, v.b || '', 'tg');

  xpLec('pu-nu-1', [
    ['Primos: los que no se acomodan',
      xpMira('dibujo', 'Empecemos por la idea: dividir es **acomodar en filas** iguales.', { dib: puntos, v: { n: 12, c: 12 }, alto: 190 }, [
        ['Doce puntos en una fila.', {}, '$12 = 1 \\cdot 12$'],
        ['También caben en filas de 4: por eso 4 y 3 son divisores de 12.', { c: 4 }, '$12 = 3 \\cdot 4$'],
        ['En filas de 5 no: sobran 2. El 5 no divide a 12.', { c: 5 }],
        ['Ahora 7 puntos. En filas de 2, de 3, de 4… siempre sobra algo.', { n: 7, c: 3 }],
        ['Solo se acomodan en una fila de 7. El 7 es **primo**: lo dividen solo 1 y él.', { c: 7 }, '$7 = 1 \\cdot 7$'],
        ['El 1 no es primo, y el 2 es el único primo par.', { n: 2, c: 2 }],
      ], 'Primo: solo se acomoda en una fila. Compuesto: forma un rectángulo.'),
      xpHaz('dibujo', 'Muestra que 35 **no** es primo: busca filas, de más de uno, en que no sobre nada.', { dib: puntos, v: { n: 35, c: 2 }, cumple: v => v.c === 5 || v.c === 7, sol: { c: 5 }, alto: 235, manijas: [{ k: 'c', min: 2, max: 12, paso: 1, et: 'puntos por fila' }],
        lee: v => `$35 \\div ${v.c} = ${Math.floor(35 / v.c)}${35 % v.c ? ` \\text{ y sobran } ${35 % v.c}` : ''}$`, dice: v => (35 % v.c ? `En filas de ${v.c} sobran ${35 % v.c}.` : 'No sobra nada: es un divisor.') }, '$35 = 5 \\cdot 7$: no es primo.')],
    ['Descomponer en primos',
      xpMira('dibujo', 'Segunda idea: todo número se arma **multiplicando primos**.', { dib: arbol, v: { n: 0, p: '' }, alto: 205 }, [
        ['Empezamos con 60. ¿Lo divide el 2? Sí.', {}],
        ['60 es 2 por 30. El 2 es primo: queda encerrado.', { n: 1 }, '$60 = 2 \\cdot 30$'],
        ['30 es 2 por 15.', { n: 2 }, '$60 = 2 \\cdot 2 \\cdot 15$'],
        ['15 es 3 por 5, y los dos son primos. Se acabó.', { n: 3 }, '$60 = 2^2 \\cdot 3 \\cdot 5$'],
        ['Los divisores de 60 salen de combinar esos primos: hay 3 por 2 por 2, doce.', { p: '(2+1)(1+1)(1+1) = 12' }, '$3 \\cdot 2 \\cdot 2 = 12$'],
      ], 'Se divide entre primos hasta llegar a 1. Divisores: suma 1 a cada exponente y multiplica.'),
      xpHaz('fichas', 'Descompón 90 en primos: pon los cuatro factores, en cualquier orden.', { slots: [0, 1, 2, 3].map(i => ({ x: 74 + i * 64, y: 56, w: 54 })), fichas: ['2', '3', '3', '5', '9', '10', '6'], cumple: q => q.map(l => l[0]).sort().join() === '2,3,3,5', sol: ['2', '3', '3', '5'], alto: 86, fondo: K => K.t(2, 61, '90 =', '', 'start') + [0, 1, 2].map(i => K.t(106 + i * 64, 61, '·', 'b')).join(''), pista: 'Todos deben ser primos: 9, 10 y 6 no lo son.' }, '$90 = 2 \\cdot 3 \\cdot 3 \\cdot 5$.')],
    ['Criterios de divisibilidad',
      xpMira('dibujo', 'Tercera idea: hay **atajos** para saber si un número se deja dividir.', { dib: crit, v: { t: '3 741', a: '', b: '' }, alto: 165 }, [
        ['Entre 3: se suman las cifras. 3 más 7 más 4 más 1 son 15, y 15 es de 3: sí.', { a: '3 + 7 + 4 + 1 = 15', b: 'entre 3: sí' }, '$15 = 3 \\cdot 5$'],
        ['Entre 9 es igual: 15 no es múltiplo de 9. No se puede.', { b: 'entre 9: no' }],
        ['Entre 2, 5 y 10 se mira la última cifra. 1 no sirve para ninguno.', { a: 'última cifra: 1', b: 'ni 2, ni 5, ni 10' }],
        ['Entre 4 se miran las dos últimas: en 5 316, el 16 es de 4. Sí.', { t: '5 316', a: 'dos últimas: 16', b: 'entre 4: sí' }, '$16 = 4 \\cdot 4$'],
        ['Entre 6 debe cumplir con 2 y con 3: 5 316 es par y sus cifras suman 15. Sí.', { a: 'par, y 5 + 3 + 1 + 6 = 15', b: 'entre 6: sí' }],
        ['Basta con 2 y 3: no comparten primos y su producto es 6.', { b: '2 · 3 = 6' }],
        ['Con 2 y 4 no basta para 8: el 20 cumple los dos y no es de 8.', { t: '20', a: 'entre 2 y 4: sí', b: 'entre 8: no' }],
      ], '3 y 9: suma de cifras. 2, 5 y 10: última cifra. 4: dos últimas. 6: entre 2 y entre 3.'),
      xpHaz('fichas', 'El número 73_ debe ser divisible entre **4**. ¿Qué cifras pueden ir al final?', { slots: [{ x: 98, y: 66, w: 150, h: 72, n: 5, et: 'sirven', ey: -44 }, { x: 248, y: 66, w: 140, h: 72, n: 5, et: 'no sirven', ey: -44 }], fichas: ['0', '2', '4', '6', '8'], meta: [['2', '6'], ['0', '4', '8']], alto: 112, pista: 'Mira las dos últimas cifras: 30, 32, 34, 36 y 38.' }, '32 y 36 son múltiplos de 4; 30, 34 y 38 no.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Los divisores de 48 van por parejas. Completa las parejas y di cuántos divisores hay.', { slots: [0, 1, 2, 3].map(i => ({ x: 48 + i * 62, y: 96, w: 52 })).concat([{ x: 302, y: 96, w: 60, et: 'divisores' }]), fichas: ['24', '16', '12', '8', '10', '9', '18'], meta: ['24', '16', '12', '8', '10'], alto: 144, fondo: K => K.t(170, 22, '1 · 48', 'tm') + [2, 3, 4, 6].map((n, i) => K.t(48 + i * 62, 64, `${n} ·`, 'b')).join(''), pista: 'Cada pareja multiplica 48. Cuenta también el 1 y el 48.' }, '1·48, 2·24, 3·16, 4·12 y 6·8: cinco parejas, 10 divisores.')],
  ], 'Filas sin sobrantes, números armados con primos, y atajos para dividir.');
}
;
//#archivo js/explora-pu-nu-2.js
// Preuniversitario · pu-nu-2 «MCM y MCD» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Dos saltadores: múltiplos de a y de b hasta t.
  const saltos = (v, K) => { const M = v.max, X = t => 20 + t * 300 / M; let h = ''; [[v.a, 70, 'la', 'fA', 'ta'], [v.b, 130, 'lg', 'fG', 'tg']].forEach(([m, y, l, f, tc]) => { h += K.l(X(0), y, X(M), y, 'lm') + K.t(330, y - 30, `de ${m} en ${m}`, `s ${tc}`, 'end'); for (let t = 0; t + m <= v.t + 1e-6; t += m) h += `<path class="xl ${l}" d="M${K.n(X(t))} ${y} Q${K.n(X(t + m / 2))} ${y - 34} ${K.n(X(t + m))} ${y}"/>` + K.c(X(t + m), y, 4, f) + K.t(X(t + m), y + 17, t + m, 's'); }); return h + (v.ok > 0.99 ? K.l(X(v.t), 30, X(v.t), 66, 'lo d') + K.l(X(v.t), 92, X(v.t), 126, 'lo d') : ''); };
  // Dos cuerdas cortadas en pedazos de s.
  const cuerdas = (v, K) => { const u = 290 / Math.max(v.a, v.b), s = Math.max(1, Math.round(v.s)); return [[v.a, 50, 'fa'], [v.b, 112, 'fg']].map(([L, y, c]) => { let h = K.t(24, y - 8, `${L} ${v.un || 'm'}`, 's tm', 'start'); for (let x = 0; x + s <= L; x += s) h += K.r(24 + x * u + 0.8, y, s * u - 1.6, 28, c, 3); const r = L % s; return h + (r ? K.r(24 + (L - r) * u, y, r * u, 28, 'ff', 2) + K.t(24 + L * u, y + 44, `sobran ${r}`, 's tf', 'end') : K.t(24 + L * u, y + 44, `${L / s} pedazos`, 's to', 'end')); }).join(''); };
  const fact = (v, K) => [['24', ['2', '2', '2', '3'], 60], ['36', ['2', '2', '3', '3'], 116]].map(([n, f, y], j) => K.t(52, y + 6, `${n} =`, 'b', 'end') + f.map((p, i) => { const com = j === 0 ? [0, 1, 3].includes(i) : [0, 1, 2].includes(i); return K.c(88 + i * 44, y, 17, v.c > 0.5 && com ? 'fA' : v.m > 0.5 && (j === 0 ? i < 3 : i > 1) ? 'fG' : 'fc') + K.t(88 + i * 44, y + 5, p, (v.c > 0.5 && com) || (v.m > 0.5 && (j === 0 ? i < 3 : i > 1)) ? 'tc' : ''); }).join('')).join('') + K.t(170, 172, v.p || '', 'b ta');

  xpLec('pu-nu-2', [
    ['MCM: cuándo coinciden',
      xpMira('dibujo', 'Empecemos por la idea: el **mínimo común múltiplo** es el primer lugar donde coinciden.', { dib: saltos, v: { a: 6, b: 8, t: 0, max: 30, ok: 0 }, alto: 165 }, [
        ['Dos ranas salen juntas. Una salta de 6 en 6 y la otra de 8 en 8.', {}],
        ['Una pisa 6 y 12; la otra, 8. Aún no coinciden.', { t: 12 }],
        ['Ya van por 18 y por 16: tampoco.', { t: 18 }],
        ['En 24 pisan las dos: es el primer múltiplo común.', { t: 24, ok: 1 }, '$\\text{mcm}(6, 8) = 24$'],
        ['Después vuelven a coincidir en 48, 72… los múltiplos de 24.', {}],
      ], 'MCM: el menor número que es múltiplo de los dos. Sirve para «¿cuándo vuelven a coincidir?».'),
      xpHaz('dibujo', 'Una rana salta de 9 en 9 y otra de 15 en 15. Avanza hasta el primer lugar donde coinciden.', { dib: (v, K) => saltos({ ...v, ok: v.t % 9 === 0 && v.t % 15 === 0 ? 1 : 0 }, K), v: { a: 9, b: 15, t: 3, max: 60 }, metas: { t: 45 }, alto: 215, manijas: [{ k: 't', min: 3, max: 60, paso: 3, et: 'lugar' }],
        lee: v => `$${v.t} \\div 9 ${v.t % 9 ? '\\text{ no}' : '\\text{ sí}'} \\qquad ${v.t} \\div 15 ${v.t % 15 ? '\\text{ no}' : '\\text{ sí}'}$`, dice: () => 'Busca el primer número que sea de 9 y de 15.' }, 'Múltiplos de 15: 15, 30, **45**; y $45 = 9 \\cdot 5$.')],
    ['MCD: el pedazo más grande',
      xpMira('dibujo', 'Segunda idea: el **máximo común divisor** es el pedazo más grande que cabe en los dos.', { dib: cuerdas, v: { a: 20, b: 30, s: 1 }, alto: 170 }, [
        ['Dos cuerdas, de 20 y 30 metros. Se cortan en pedazos iguales, sin que sobre nada.', {}],
        ['Con pedazos de 4, en la segunda sobran 2. No sirve.', { s: 4 }],
        ['Con pedazos de 5 no sobra en ninguna: el 5 divide a los dos.', { s: 5 }],
        ['Con pedazos de 10 tampoco, y son más largos.', { s: 10 }, '$\\text{mcd}(20, 30) = 10$'],
        ['Más largos no se puede: 10 es el mayor divisor común.', { s: 15 }],
      ], 'MCD: el mayor número que divide a los dos. Sirve para repartir o cortar sin que sobre.'),
      xpHaz('dibujo', 'Dos cintas de 28 y 42 cm se cortan en pedazos iguales, lo más largos posible y sin sobrantes. ¿De cuánto?', { dib: cuerdas, v: { a: 28, b: 42, s: 3, un: 'cm' }, metas: { s: 14 }, alto: 220, manijas: [{ k: 's', min: 1, max: 21, paso: 1, et: 'largo del pedazo' }],
        lee: v => `$28 \\div ${v.s} ${28 % v.s ? '\\text{ no}' : '\\text{ sí}'} \\qquad 42 \\div ${v.s} ${42 % v.s ? '\\text{ no}' : '\\text{ sí}'}$`, dice: v => (28 % v.s || 42 % v.s ? 'Sobra en alguna.' : v.s < 14 ? 'No sobra, pero hay uno más largo.' : 'No sobra, y no hay uno más largo.') }, '14 divide a 28 y a 42, y ninguno mayor lo hace.')],
    ['Con factores primos',
      xpMira('dibujo', 'Tercera idea: con los **primos** salen los dos de una vez.', { dib: fact, v: { c: 0, m: 0, p: '' }, alto: 185 }, [
        ['24 es 2 · 2 · 2 · 3 y 36 es 2 · 2 · 3 · 3.', {}],
        ['Los que comparten son dos doses y un tres.', { c: 1 }],
        ['Su producto es el MCD: 2 por 2 por 3, doce.', { p: 'MCD = 2 · 2 · 3 = 12' }, '$\\text{mcd}(24, 36) = 12$'],
        ['Para el MCM se toman todos, cada primo las veces que más aparece: tres doses y dos treses.', { c: 0, m: 1, p: 'MCM = 2 · 2 · 2 · 3 · 3 = 72' }, '$2^3 \\cdot 3^2 = 72$'],
        ['Un chequeo: el MCD por el MCM da el producto de los dos números.', {}, '$12 \\cdot 72 = 24 \\cdot 36$'],
      ], 'MCD: primos comunes. MCM: todos los primos, con el mayor exponente.'),
      xpHaz('fichas', '$40 = 2^3 \\cdot 5$ y $60 = 2^2 \\cdot 3 \\cdot 5$. Pon el MCD y el MCM.', { slots: [{ x: 110, y: 56, w: 92, et: 'MCD' }, { x: 230, y: 56, w: 92, et: 'MCM' }], fichas: ['20', '120', '10', '60', '240'], meta: ['20', '120'], alto: 104, pista: 'Comunes: dos doses y un cinco. Todos: tres doses, un tres y un cinco.' }, 'MCD $2^2 \\cdot 5 = 20$ y MCM $2^3 \\cdot 3 \\cdot 5 = 120$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '¿Con qué se resuelve cada pregunta?', { slots: [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: 'MCM', ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: 'MCD', ey: -62 }], fichas: ['¿cuándo coinciden?', 'cortar sin sobras', '¿otra vez juntos?', 'bolsas iguales'], meta: [['¿cuándo coinciden?', '¿otra vez juntos?'], ['cortar sin sobras', 'bolsas iguales']], alto: 138, pista: 'Coincidir mira hacia adelante (múltiplos); repartir mira hacia adentro (divisores).' }, 'Coincidir es MCM; cortar o repartir por igual es MCD.')],
  ], 'Coincidir es MCM, repartir sin sobras es MCD, y los primos dan los dos.');
}
;
//#archivo js/explora-pu-nu-3.js
// Preuniversitario · pu-nu-3 «Paridad, residuos y última cifra» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Puntos en parejas: grupos a y b; si j = 1 los sueltos se juntan.
  const parejas = (v, K) => { const f = (n, x, y, c, rev) => { let h = ''; const k = Math.ceil(n / 2); for (let i = 0; i < n; i++) { const col = Math.floor(i / 2); h += K.c(x + (rev ? k - 1 - col : col) * 26, y + (i % 2) * 24, 9, n % 2 && i === n - 1 ? 'fF' : c); } return h; }; const b = Math.round(v.b); const A = Math.round(v.a); return f(A, 40, 60, 'fA') + (b ? f(b, 200, 60, 'fG', 1) : '') + K.t(80, 126, `${Math.round(v.a)}`, 'b ta') + (b ? K.t(240, 126, `${b}`, 'b tg') : '') + K.t(170, 30, v.p || '', 'b') + (v.j > 0.5 ? K.l(40 + Math.floor((A - 1) / 2) * 26 + 12, 60, 188, 60, 'lo d') : ''); };
  // n puntos en grupos de d; lo que sobra va aparte.
  const grupos = (v, K) => { const d = v.d, n = Math.round(v.n), q = Math.floor(n / d) - (v.s > 0.5 ? 1 : 0), r = n - d * q; let h = ''; for (let g = 0; g < q; g++) { const x = 24 + (g % 5) * 58, y = 44 + Math.floor(g / 5) * 46; h += K.r(x, y, 50, 36, 'fc', 8); for (let i = 0; i < d; i++) h += K.c(x + 9 + (i % 4) * 11, y + 11 + Math.floor(i / 4) * 14, 4.4, 'fA'); } for (let i = 0; i < r; i++) h += K.c(40 + i * 20, 156, 6, 'fF'); return h + K.t(170, 28, `${n} = ${d} · ${q} + ${r}`, 'b ta') + K.t(330, 161, r ? `${v.s > 0.5 ? "sobran" : "residuo"} ${r}` : 'sin residuo', r ? 'tf' : 'to', 'end'); };
  const texto = (v, K) => v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 44 + i * 40, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join('');
  const Z = [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: 'par', ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: 'impar', ey: -62 }];

  xpLec('pu-nu-3', [
    ['Par o impar',
      xpMira('dibujo', 'Empecemos por la idea: par es **todo en parejas**; impar es que sobra uno.', { dib: parejas, v: { a: 8, b: 0, j: 0, p: '' }, alto: 145 }, [
        ['El 8 se acomoda en parejas exactas: es par.', {}],
        ['El 7 deja uno suelto: es impar.', { a: 7 }],
        ['Si se suman dos impares, 7 y 5, los dos sueltos hacen pareja: la suma es par.', { b: 5, j: 1, p: '7 + 5 = 12' }, '$\\text{impar} + \\text{impar} = \\text{par}$'],
        ['Con un impar y un par, el suelto sigue solo: impar.', { b: 6, j: 0, p: '7 + 6 = 13' }, '$\\text{impar} + \\text{par} = \\text{impar}$'],
        ['Al multiplicar, basta un factor par para que todo salga en parejas.', { a: 14, b: 0, p: '7 · 2 = 14' }, '$\\text{par} \\cdot \\text{lo que sea} = \\text{par}$'],
      ], 'Suma: impar con impar da par. Producto: solo impar por impar da impar.'),
      xpHaz('fichas', 'Sin hacer la cuenta, di si el resultado es par o impar.', { slots: Z, fichas: ['37 · 48', '95 + 61', '21 · 33', '84 + 19'], meta: [['37 · 48', '95 + 61'], ['21 · 33', '84 + 19']], alto: 138, pista: 'Mira solo si cada número es par o impar.' }, 'Un factor par da par; dos impares sumados dan par; impar por impar, impar; par más impar, impar.')],
    ['Los residuos se suman y se multiplican',
      xpMira('dibujo', 'Segunda idea: el **residuo** es lo que sobra al hacer grupos.', { dib: grupos, v: { n: 17, d: 5, s: 0 }, alto: 175 }, [
        ['17 en grupos de 5: tres grupos y sobran 2. El residuo es 2.', {}, '$17 = 5 \\cdot 3 + 2$'],
        ['24 en grupos de 5: sobran 4.', { n: 24 }, '$24 = 5 \\cdot 4 + 4$'],
        ['Si se suman, 17 más 24, los sobrantes también: 2 más 4 son 6.', { n: 41, s: 1 }, '$2 + 4 = 6$'],
        ['Con 6 sobrantes se hace otro grupo de 5 y sobra 1. Por eso 41 deja residuo 1.', { s: 0 }, '$6 = 5 + 1$'],
        ['Con productos pasa igual: se multiplican los residuos y se vuelve a dividir.', { n: 8 }, '$2 \\cdot 4 = 8 \\to 3$'],
      ], 'Cambia cada número por su residuo, haz la cuenta con ellos y saca el residuo otra vez.'),
      xpHaz('fichas', 'Residuo de $38 + 29$ entre 5, sin sumar: pon el de cada uno y el de la suma.', { slots: [{ x: 66, y: 58, w: 84, et: 'de 38' }, { x: 170, y: 58, w: 84, et: 'de 29' }, { x: 274, y: 58, w: 84, et: 'de la suma' }], fichas: ['3', '4', '2', '1', '7', '0'], meta: ['3', '4', '2'], alto: 106, pista: '3 más 4 son 7, y 7 todavía tiene un grupo de 5.' }, '$3 + 4 = 7$, y 7 deja residuo 2.')],
    ['La última cifra',
      xpMira('dibujo', 'Tercera idea: la última cifra de un producto **solo depende de las últimas cifras**.', { dib: texto, v: { l: ['47 · 83', '7 · 3 = 21', 'termina en 1'], n: 1 }, alto: 145 }, [
        ['¿En qué termina 47 por 83? No hace falta multiplicar todo.', {}],
        ['Las decenas solo aportan decenas. Importan el 7 y el 3.', { n: 2 }, '$7 \\cdot 3 = 21$'],
        ['21 termina en 1: el producto también.', { n: 3 }, '$47 \\cdot 83 = 3\\,901$'],
        ['Con 47 al cuadrado: 7 por 7 son 49, termina en 9.', { l: ['47 · 47', '7 · 7 = 49', 'termina en 9'] }],
        ['En las potencias de 3 la última cifra se repite cada cuatro: 3, 9, 7, 1, y otra vez 3.', { l: ['3, 9, 27, 81, 243', '3, 9, 7, 1, 3', 'se repite cada 4'] }],
        ['Para 3 a la 18: 18 entre 4 deja residuo 2. Es la segunda del ciclo, 9.', {}, '$18 = 4 \\cdot 4 + 2$'],
        ['Con los días es igual: cada 7 vuelve el mismo, y el residuo dice cuántos se avanzan.', { l: ['30 días', '30 = 7 · 4 + 2', 'se avanzan 2'] }],
      ], 'Para la última cifra de sumas, productos y potencias basta usar las últimas cifras.'),
      xpHaz('fichas', '¿En qué termina $123 \\cdot 456$? Pon el producto de las últimas cifras y la respuesta.', { slots: [{ x: 110, y: 58, w: 110, et: 'últimas cifras' }, { x: 240, y: 58, w: 92, et: 'termina en' }], fichas: ['18', '8', '9', '1', '6'], meta: ['18', '8'], alto: 106, pista: 'Multiplica 3 por 6 y mira en qué termina.' }, '$3 \\cdot 6 = 18$: termina en 8.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Busca el número menor que 20 que deja residuo 2 entre 3 y residuo 3 entre 4.', { dib: (v, K) => K.t(170, 40, v.n, 'B') + K.t(100, 90, `entre 3: ${v.n % 3}`, v.n % 3 === 2 ? 'b to' : 'b tf') + K.t(240, 90, `entre 4: ${v.n % 4}`, v.n % 4 === 3 ? 'b to' : 'b tf'), v: { n: 4 }, metas: { n: 11 }, alto: 165, manijas: [{ k: 'n', min: 1, max: 19, paso: 1, et: 'número' }],
        lee: v => `$${v.n} = 3 \\cdot ${Math.floor(v.n / 3)} + ${v.n % 3} = 4 \\cdot ${Math.floor(v.n / 4)} + ${v.n % 4}$`, dice: () => 'Si le sumaras 1, sería múltiplo de 3 y de 4.' }, 'Le falta 1 para ser múltiplo de 3 y de 4: $12 - 1 = 11$.')],
  ], 'Parejas y sueltos, sobrantes que se operan, y últimas cifras que mandan.');
}
;
//#archivo js/explora-pu-pb-1.js
// Preuniversitario · pu-pb-1 «Espacio muestral y Laplace» (Explora). Los ejemplos no son los de los ejercicios.
{
  const caras = (v, K) => [1, 2, 3, 4, 5, 6].map(n => K.r(26 + (n - 1) * 49, 60, 42, 42, v.s.includes(n) ? 'fA' : 'fc', 9) + K.t(47 + (n - 1) * 49, 88, n, v.s.includes(n) ? 'b tc' : 'b')).join('') + K.t(170, 32, v.p || '', 'ta');
  // Urna con r rojas (naranja) y a azules (verde).
  const urna = (v, K) => { const r = v.r, a = Math.round(v.a), n = r + a; let h = K.r(50, 20, 240, 130, 'fn', 18); for (let i = 0; i < n; i++) h += K.c(78 + (i % 7) * 31, 134 - Math.floor(i / 7) * 32, 13, i < r ? 'fF' : 'fA'); return h; };
  const escala = (v, K) => K.l(30, 90, 310, 90, 'gr') + [['0', 30], ['1/2', 170], ['1', 310]].map(([t, x]) => K.l(x, 84, x, 96) + K.t(x, 116, t, '')).join('') + K.t(30, 60, 'imposible', 's tm') + K.t(310, 60, 'seguro', 's tm') + K.f(v.f, K.c(30 + v.x * 280, 90, 9, 'fA') + K.t(Math.max(60, Math.min(285, 30 + v.x * 280)), 40, v.t || '', 'ta'));
  const D = { f: 6, c: 6, filas: ['1', '2', '3', '4', '5', '6'], cols: ['1', '2', '3', '4', '5', '6'], izq: 30, cw: 42, ch: 32 }, sum = { ...D, celda: (i, r, c) => String(r + c + 2) };
  const con = f => Array.from({ length: 36 }, (_, i) => i).filter(i => f(Math.floor(i / 6) + 1, i % 6 + 1));

  xpLec('pu-pb-1', [
    ['Favorables sobre posibles',
      xpMira('dibujo', 'Empecemos por la idea: la probabilidad es una **fracción** de los casos.', { dib: caras, v: { s: [], p: '' }, alto: 125 }, [
        ['Un dado tiene seis resultados posibles, todos igual de fáciles.', {}, '$6 \\text{ posibles}$'],
        ['¿Probabilidad de sacar más de 2? Sirven 3, 4, 5 y 6: cuatro casos.', { s: [3, 4, 5, 6], p: 'más de 2' }],
        ['Cuatro de seis: dos tercios.', {}, '$P = \\tfrac46 = \\tfrac23$'],
        ['¿Y de sacar un 5? Un caso de seis.', { s: [5], p: 'un 5' }, '$P = \\tfrac16$'],
        ['Favorables arriba, posibles abajo. Vale si todos los casos son igual de fáciles.', {}],
      ], '$P = \\tfrac{\\text{casos favorables}}{\\text{casos posibles}}$, con casos igual de fáciles.'),
      xpHaz('dibujo', 'Una urna tiene 5 bolas naranjas. Echa verdes hasta que sacar naranja tenga probabilidad un tercio.', { dib: urna, v: { r: 5, a: 2 }, metas: { a: 10 }, alto: 205, manijas: [{ k: 'a', min: 0, max: 16, paso: 1, et: 'verdes' }],
        lee: v => `$P(\\text{naranja}) = \\tfrac{5}{${5 + v.a}}$`, dice: v => `Hay ${5 + v.a} bolas y 5 son naranjas.` }, 'Un tercio: 5 de 15, así que hacen falta 10 verdes.')],
    ['Dos dados: la tabla',
      xpMira('rejilla', 'Segunda idea: con dos dados los casos son **36 parejas**.', sum, [
        ['La fila es un dado y la columna, el otro. Cada casilla dice la suma.', {}, '$6 \\cdot 6 = 36$'],
        ['La suma 7 sale en seis casillas.', { on: con((a, b) => a + b === 7) }, '$P(7) = \\tfrac{6}{36} = \\tfrac16$'],
        ['La suma 12 sale en una sola: 6 y 6.', { luz: con((a, b) => a + b === 12) }, '$P(12) = \\tfrac{1}{36}$'],
        ['Por eso 7 es la suma más fácil: hay más maneras de lograrla.', {}],
        ['Ojo: 3 y 4 no es la misma casilla que 4 y 3. Son dos casos.', { luz: [15, 20] }],
      ], 'Dos dados: 36 parejas ordenadas. No todas las sumas son igual de probables.'),
      xpHaz('rejilla', 'Pinta los resultados en que la suma es 5.', { ...D, meta: con((a, b) => a + b === 5), lee: c => `$\\tfrac{${c.filter(x => x).length}}{36}$`, dice: () => 'La fila es el primer dado; la columna, el segundo.' }, '1+4, 2+3, 3+2 y 4+1: $\\tfrac{4}{36} = \\tfrac19$.')],
    ['De imposible a seguro',
      xpMira('dibujo', 'Tercera idea: toda probabilidad está **entre 0 y 1**.', { dib: escala, v: { x: 0, f: 0, t: '' }, alto: 130 }, [
        ['Cero es imposible: sacar un 7 con un dado corriente.', { f: 1, t: 'un 7' }, '$P = \\tfrac06 = 0$'],
        ['Uno es seguro: sacar un número menor que 7.', { x: 1, t: 'menor que 7' }, '$P = \\tfrac66 = 1$'],
        ['Un medio es tan fácil como difícil: sacar par.', { x: 0.5, t: 'par' }, '$P = \\tfrac36 = \\tfrac12$'],
        ['Sacar más de 1 está muy cerca de lo seguro.', { x: 5 / 6, t: 'más de 1' }, '$P = \\tfrac56$'],
        ['Si al hacer la cuenta te da más de 1, algo quedó mal.', {}],
      ], '0 es imposible, 1 es seguro, y ninguna probabilidad pasa de 1.'),
      xpHaz('fichas', 'Se saca una ficha al azar de A, B, C, D. Pon la probabilidad de cada cosa.', { slots: [{ x: 66, y: 58, w: 90, et: 'que sea Z' }, { x: 170, y: 58, w: 90, et: 'que sea B' }, { x: 274, y: 58, w: 90, et: 'una letra' }], fichas: ['0', '1/4', '1', '1/2', '4'], meta: ['0', '1/4', '1'], alto: 106, pista: 'No hay Z; hay una B entre cuatro; todas son letras.' }, 'Imposible 0, una de cuatro $\\tfrac14$, y seguro 1.')],
    ['Ahora sí, un problema',
      xpHaz('rejilla', 'Se saca una tarjeta del 1 al 12. Pinta las favorables a «sale un número **primo**».', { f: 3, c: 4, cw: 56, ch: 44, celda: i => String(i + 1), meta: [1, 2, 4, 6, 10], lee: c => `$P = \\tfrac{${c.filter(x => x).length}}{12}$`, dice: c => (c[0] ? 'El 1 no es primo.' : c[8] ? 'El 9 es 3 por 3.' : 'Primo: solo lo dividen 1 y él mismo.') }, '2, 3, 5, 7 y 11: $\\tfrac{5}{12}$.')],
  ], 'Favorables sobre posibles, 36 parejas con dos dados, y siempre entre 0 y 1.');
}
;
//#archivo js/explora-pu-pb-2.js
// Preuniversitario · pu-pb-2 «Complemento e independencia» (Explora). Los ejemplos no son los de los ejercicios.
{
  const barra = (v, K) => K.r(24, 60, 292, 44, 'fg', 6) + K.r(24, 60, 292 * v.p, 44, 'fa', 6) + (v.p > 0.12 ? K.t(24 + 146 * v.p, 88, v.ta, '') : '') + K.f(v.f, K.t(24 + 292 * (v.p + 1) / 2, 88, v.tb, '')) + K.t(24, 46, v.ea || '', 's ta', 'start') + K.f(v.f, K.t(316, 46, v.eb || '', 's tg', 'end'));
  // Bolsa con r naranjas y g verdes, y los pasos de la cuenta.
  const bolsa = (v, K) => { let h = K.r(30, 30, 130, 120, 'fn', 16); const n = Math.round(v.r) + v.g; for (let i = 0; i < n; i++) h += K.c(56 + (i % 4) * 26, 130 - Math.floor(i / 4) * 30, 11, i < Math.round(v.r) ? 'fF' : 'fA'); return h + v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(246, 56 + i * 44, t, i === 2 ? 'B ta' : 'b'))).join(''); };
  const grid = (f, c, o) => ({ f, c, cw: 50, ch: 42, ...o });

  xpLec('pu-pb-2', [
    ['El complemento',
      xpMira('dibujo', 'Empecemos por la idea: lo que pasa y lo que **no** pasa completan 1.', { dib: barra, v: { p: 0.2, f: 0, ta: '1/5', tb: '4/5', ea: 'gana', eb: 'no gana' }, alto: 125 }, [
        ['La probabilidad de ganar una rifa es un quinto.', {}],
        ['La de no ganar es todo lo demás: cuatro quintos.', { f: 1 }, '$1 - \\tfrac15 = \\tfrac45$'],
        ['Si la de ganar sube al 60 %, la de no ganar baja al 40 %.', { p: 0.6, ta: '60 %', tb: '40 %' }, '$100\\,\\% - 60\\,\\% = 40\\,\\%$'],
        ['Sirve para «al menos uno»: es más fácil contar cuándo no sale ninguno.', { ea: 'al menos uno', eb: 'ninguno', p: 0.8, ta: '1 − ninguno', tb: '' }, '$P(\\text{al menos uno}) = 1 - P(\\text{ninguno})$'],
      ], '$P(\\text{no A}) = 1 - P(A)$. «Al menos uno» es 1 menos «ninguno».'),
      xpHaz('rejilla', 'Se lanzan dos monedas. Pinta los casos en que sale **al menos una** cara.', grid(2, 2, { cw: 70, ch: 56, filas: ['1.ª cara', '1.ª sello'], cols: ['2.ª cara', '2.ª sello'], izq: 84, celda: i => ['CC', 'CS', 'SC', 'SS'][i], meta: [0, 1, 2], lee: c => `$\\tfrac{${c.filter(x => x).length}}{4}$`, dice: () => 'Solo falla si las dos son sello.' }), 'Solo SS falla: $1 - \\tfrac14 = \\tfrac34$.')],
    ['Independientes: se multiplican',
      xpMira('rejilla', 'Segunda idea: si una cosa no afecta a la otra, las probabilidades **se multiplican**.', grid(4, 6, { cw: 44, ch: 36, estados: 3, rot: ['', '', ''] }), [
        ['Un cuadro de 24 casillas es el total. Llueve con probabilidad un medio: tres columnas.', { x: [0, 1, 2, 6, 7, 8, 12, 13, 14, 18, 19, 20] }, '$\\tfrac12$'],
        ['El bus llega tarde con probabilidad un cuarto, llueva o no: una fila.', { luz: [0, 1, 2, 3, 4, 5] }, '$\\tfrac14$'],
        ['Que pasen las dos cosas es el cruce: tres casillas.', { on: [0, 1, 2], luz: [0, 1, 2, 3, 4, 5] }],
        ['Tres de 24 es un octavo: un medio por un cuarto.', {}, '$\\tfrac12 \\cdot \\tfrac14 = \\tfrac{3}{24} = \\tfrac18$'],
      ], 'Si A y B son independientes, $P(A \\text{ y } B) = P(A) \\cdot P(B)$.'),
      xpHaz('rejilla', 'A pasa con probabilidad dos tercios y B, con un cuarto; son independientes. Pinta el cruce: «A y B».', grid(4, 3, { cw: 62, ch: 40, cols: ['A', 'A', 'no A'], filas: ['B', 'no B', 'no B', 'no B'], izq: 60, meta: [0, 1], lee: c => `$\\tfrac{${c.reduce((a, b) => a + b, 0)}}{12}$`, dice: () => 'Dos de las tres columnas, y de ellas una de las cuatro filas.' }), '$\\tfrac23 \\cdot \\tfrac14 = \\tfrac{2}{12} = \\tfrac16$.')],
    ['Sin devolver: cambia la bolsa',
      xpMira('dibujo', 'Tercera idea: si no se devuelve, el segundo paso es con **otra bolsa**.', { dib: bolsa, v: { r: 3, g: 2, l: ['3/5', '2/4', '3/10'], n: 0 }, alto: 170 }, [
        ['Una bolsa con 3 bolas naranjas y 2 verdes. Se sacan dos, sin devolver.', {}],
        ['La primera es naranja con probabilidad tres quintos.', { n: 1 }, '$\\tfrac35$'],
        ['Ahora quedan 2 naranjas y 2 verdes: la segunda, dos cuartos.', { r: 2, n: 2 }, '$\\tfrac24$'],
        ['Las dos naranjas: se multiplican. Tres décimos.', { n: 3 }, '$\\tfrac35 \\cdot \\tfrac24 = \\tfrac{6}{20} = \\tfrac{3}{10}$'],
        ['Si se devolviera la primera, sería tres quintos otra vez: nueve veinticincoavos.', { r: 3, l: ['3/5', '3/5', '9/25'] }, '$\\tfrac35 \\cdot \\tfrac35 = \\tfrac{9}{25}$'],
      ], 'Sin devolver: en el segundo paso hay una bola menos, abajo y (si salió de ese color) arriba.'),
      xpHaz('fichas', 'Hay 5 fichas verdes y 3 negras. Se sacan dos sin devolver. Pon la probabilidad de cada paso y la de que las dos sean verdes.', { slots: [{ x: 66, y: 58, w: 88, et: '1.ª verde' }, { x: 170, y: 58, w: 88, et: '2.ª, tras verde' }, { x: 274, y: 58, w: 88, et: 'las dos' }], fichas: ['5/8', '4/7', '5/14', '5/7', '25/64', '4/8'], meta: ['5/8', '4/7', '5/14'], alto: 106, pista: 'Después de sacar una verde quedan 4 verdes de 7 fichas.' }, '$\\tfrac58 \\cdot \\tfrac47 = \\tfrac{20}{56} = \\tfrac{5}{14}$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ana acierta 2 de cada 3 tiros y Beto, 1 de cada 2. Tiran una vez, cada uno por su lado. Pon la probabilidad de que falle cada uno y de que acierte al menos uno.', { slots: [{ x: 66, y: 58, w: 88, et: 'falla Ana' }, { x: 170, y: 58, w: 88, et: 'falla Beto' }, { x: 274, y: 58, w: 92, et: 'al menos uno' }], fichas: ['1/3', '1/2', '5/6', '1/6', '2/3', '7/6'], meta: ['1/3', '1/2', '5/6'], alto: 106, pista: 'Fallan los dos con probabilidad 1/3 · 1/2.' }, 'Fallan los dos: $\\tfrac13 \\cdot \\tfrac12 = \\tfrac16$; al menos uno: $1 - \\tfrac16 = \\tfrac56$.')],
  ], 'El complemento completa 1, lo independiente se multiplica, y sin devolver cambia la bolsa.');
}
;
//#archivo js/explora-pu-el-1.js
// Preuniversitario · pu-el-1 «Prelectura» (Explora). Textos cortos propios: no son los de los ejercicios.
{
  const HIELO = { cab: ['Lo que el hielo recuerda', 'Grupo de glaciología de una universidad', 'Revista de divulgación', 'Marzo de 2025'],
    paras: [['Cada invierno, la nieve que cae sobre un nevado se aplasta y se vuelve una capa de hielo.', 'En esa capa quedan atrapados el polvo y el aire de aquel año.', 'Por eso, perforar un nevado es como leer un diario del clima.']] };

  xpLec('pu-el-1', [
    ['Los bordes del texto',
      xpMira('hoja', 'Empecemos por la idea: antes de leer un texto se leen **sus bordes**.', { ...HIELO, tapa: true }, [
        ['El texto está tapado. Solo se ven sus bordes: título, autor, fuente y fecha.', {}],
        ['El título anuncia el tema: algo sobre lo que el hielo guarda.', { luz: ['t'] }],
        ['El autor dice quién habla: científicos que estudian los glaciares.', { luz: ['a'] }],
        ['La fuente dice para qué se escribió: una revista de divulgación explica.', { luz: ['f'] }],
        ['La fecha dice de cuándo son los datos.', { luz: ['d'] }],
        ['Con eso se apuesta: explicará qué guarda el hielo. Y al destaparlo, así es.', { luz: [2], tapa: false }],
      ], 'El título anuncia el tema; el autor, quién habla; la fuente, para qué; la fecha, de cuándo es.'),
      xpHaz('hoja', 'Subraya los **dos** bordes que anuncian que este texto va a **defender una postura**.', { modo: 'toca', meta: ['t', 'f'], cab: ['Prohibir los patines no arregla los andenes', 'Vecina del barrio', 'Columna de opinión', 'Mayo de 2025'], paras: [],
        pista: 'Quién firma y cuándo no dicen si habrá postura. Busca dónde se toma partido y qué clase de texto es.' }, 'Un título que toma partido y una columna de opinión anuncian que se va a defender algo.')],
    ['La fuente dice para qué',
      xpMira('hoja', 'Segunda idea: el mismo tema cambia según **de dónde viene** el texto.', { letras: ['A', 'B', 'C'], paras: [['Informe técnico de la empresa de acueducto.'], ['Columna de opinión de un periódico.'], ['Testimonio en un libro de memorias.']] }, [
        ['Tres textos sobre el mismo río. Todavía no hemos leído ninguno.', {}],
        ['Un informe técnico registra: dirá cuánta agua lleva y qué tan limpia está.', { luz: [0], nota: { 0: 'registra datos' } }],
        ['Una columna de opinión defiende: dirá qué se debería hacer con el río.', { luz: [1], nota: { 1: 'defiende una postura' } }],
        ['Un testimonio cuenta: dirá cómo era crecer junto al río.', { luz: [2], nota: { 2: 'cuenta lo vivido' } }],
        ['Al texto que explica se le llama expositivo; al que cuenta, narrativo.', {}],
        ['¿Buscas un dato? Sirve más la fuente que mide y, entre esas, la más reciente.', { luz: [0] }],
        ['Por eso la fuente dice qué buscar, y también qué no esperar.', {}],
      ], 'Un informe registra, la divulgación explica, una columna defiende y un testimonio cuenta.'),
      xpHaz('hoja', 'Pon al margen para qué se escribió cada texto.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['contar lo vivido', 'explicar algo', 'defender una postura'], meta: [1, 2, 0],
        paras: [['«Por qué flotan los barcos de hierro», revista de ciencia para jóvenes.'], ['«El tren sí vale la pena», editorial de un diario.'], ['«Mis años en el faro», memorias de un farero.']], pista: 'Alguno no va ahí. Mira otra vez la fuente de cada uno, no solo el tema.' }, 'La fuente y el título, juntos, dicen para qué se escribió.')],
    ['La vista rápida',
      xpMira('hoja', 'Tercera idea: antes de leer todo, se pasa la vista por **el comienzo de cada párrafo**.', { paras: [['Los pulpos tienen tres corazones.', 'Dos llevan la sangre a las branquias y el otro, al resto del cuerpo.'], ['Su inteligencia también sorprende.', 'En los acuarios abren frascos y reconocen a quien los alimenta.'], ['Sin embargo, viven poco.', 'La mayoría no pasa de dos años.']] }, [
        ['Este texto tiene tres párrafos. No hace falta leerlos completos todavía.', {}],
        ['Se leen solo los comienzos: con eso se sabe de qué trata cada uno.', { luz: [0, 2, 4] }],
        ['Quedan tres pistas al margen: el cuerpo, la inteligencia y la vida.', { nota: { 0: 'cuerpo', 1: 'inteligencia', 2: 'cuánto viven' } }],
        ['Si preguntan qué hacen con los frascos, ya sabes a qué párrafo ir.', { luz: [3] }],
        ['También ayudan las palabras que se repiten: muestran el tema.', {}],
      ], 'El comienzo de cada párrafo y las palabras que se repiten dicen dónde está cada cosa.'),
      xpHaz('hoja', 'Solo ves los comienzos. Subraya el párrafo al que irías para saber **cuánto cuesta** mantener un huerto.', { modo: 'toca', meta: [2], paras: [['Los huertos de azotea empezaron como un pasatiempo.'], ['Hoy alimentan comedores enteros.'], ['Sostenerlos, eso sí, exige dinero y tiempo.'], ['Por eso algunos edificios reparten las tareas.']], pista: 'Ese comienzo anuncia otra cosa. Busca el que habla de lo que hace falta para mantenerlos.' }, 'Un buen comienzo anuncia lo que sigue: allá se vuelve a buscar el dato.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Antes de leer «Cinco mitos sobre el café», de una revista de salud, **tacha** las dos preguntas que el texto seguramente **no** va a responder.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['¿Qué creencias falsas hay sobre el café?'], ['¿Qué sintió la autora la primera vez que lo probó?'], ['¿Le hace daño al corazón?'], ['¿Cuál es la mejor cafetería de la ciudad?']], pista: 'Alguna de las tachadas sí cabe en un texto que corrige creencias sobre la salud. Busca las que pedirían otra clase de texto.' }, 'Los bordes dicen qué esperar del texto y también qué no.')],
  ], 'Antes de leer: los bordes para apostar el tema y el propósito, y una vista rápida para saber dónde está cada cosa.');
}
;
//#archivo js/explora-pu-el-2.js
// Preuniversitario · pu-el-2 «Idea central y mapa del texto» (Explora). Textos cortos propios.
xpLec('pu-el-2', [
  ['Una idea por párrafo',
    xpMira('hoja', 'Empecemos por la idea: cada párrafo tiene **una idea** que reúne lo demás.', { paras: [['En el patio del colegio, el piso llega a cincuenta grados al mediodía.', 'Los niños se quedan en los pasillos y las canchas están vacías.', 'Un patio sin árboles es un patio que no se puede usar.']] }, [
      ['Tres oraciones. ¿Cuál dice lo que dice todo el párrafo?', {}],
      ['La primera es un dato: cuánto calienta el piso.', { luz: [0], sello: { 0: 'dato' } }],
      ['La segunda es una consecuencia: las canchas vacías.', { luz: [1], sello: { 1: 'consecuencia' } }],
      ['La última las reúne: sin árboles, el patio no sirve. Esa es la idea.', { luz: [2], sello: { 2: 'idea' } }],
      ['La idea puede estar al final, al principio o en la mitad: no hay puesto fijo.', { luz: [2] }],
      ['Quedarse en un detalle es poco; decir que no debería haber patios es de más.', {}],
    ], 'La idea reúne lo que dicen las demás: ni un detalle suelto ni más de lo que dice el párrafo.'),
    xpHaz('hoja', 'Subraya la oración que **reúne** a las demás.', { modo: 'toca', meta: [1], paras: [['La nueva línea de buses ahorra veinte minutos por viaje.', 'Pero llegar más rápido no sirve si nadie puede subirse.', 'A las seis de la mañana pasan llenos y la fila da la vuelta a la manzana.', 'Muchos terminan yéndose a pie.']], pista: 'Esa aporta un dato o un caso. Busca la que los demás datos, juntos, hacen ver.' }, 'Los datos y los casos apoyan; la idea es lo que todos juntos hacen ver.')],
  ['El mapa del texto',
    xpMira('hoja', 'Segunda idea: una nota al margen por párrafo arma **el mapa** del texto.', { paras: [['Las abejas polinizan buena parte de lo que comemos.'], ['Sin embargo, su número cae cada año.'], ['Además, cada vez hay menos flores silvestres.'], ['Por eso conviene dejar franjas de flores junto a los cultivos.']] }, [
      ['Cuatro párrafos de los que solo vemos el comienzo.', {}],
      ['El primero dice por qué importan las abejas.', { luz: [0], nota: { 0: 'dice por qué importa' } }],
      ['«Sin embargo» opone: aquí aparece el problema.', { luz: [1], nota: { 1: 'plantea el problema' } }],
      ['«Además» suma otra cosa en la misma dirección.', { luz: [2], nota: { 2: 'suma otro problema' } }],
      ['«Por eso» saca una consecuencia: la propuesta.', { luz: [3], nota: { 3: 'propone algo' } }],
      ['Las palabras que retoman, como «su número», van después de lo que retoman.', { luz: [1] }],
      ['Lo que se defiende es la tesis; lo que otros discuten, una objeción; rematar es cerrar con la tesis.', {}],
    ], '«Sin embargo» opone, «además» suma, «por eso» concluye: el comienzo dice qué hace el párrafo.'),
    xpHaz('hoja', 'Pon al margen qué **hace** cada párrafo.', { modo: 'margen', rotulos: ['propone algo', 'responde a quien no está de acuerdo', 'da una razón', 'dice lo que defiende'], meta: [3, 2, 1, 0],
      paras: [['El recreo del colegio debería durar más.'], ['La razón es sencilla: moverse ayuda a concentrarse.'], ['Algunos dicen que se pierde clase; pero una clase sin atención también se pierde.'], ['Por eso conviene probar un mes con diez minutos más.']], pista: 'Algún rótulo no va ahí. Mira cómo empieza cada párrafo: ¿afirma, explica, contesta o propone?' }, 'El mapa dice qué hace cada párrafo, no de qué habla.')],
  ['Lo que sostiene y lo que adorna',
    xpMira('hoja', 'Tercera idea: un resumen se queda con lo que **sostiene** la idea central y suelta lo demás.', { letras: ['A', 'B', 'C', 'D', 'E'], paras: [['Leer en voz alta mejora la lectura.'], ['Obliga a ir despacio y a no saltarse palabras.'], ['La maestra usaba un libro de tapas verdes.'], ['Al oírse, uno nota lo que no entendió.'], ['Eran las cuatro de la tarde.']] }, [
      ['La primera es la idea central: leer en voz alta mejora la lectura.', { luz: [0], nota: { 0: 'idea central' } }],
      ['Ir despacio la sostiene: es una razón.', { luz: [1], nota: { 1: 'apoyo' } }],
      ['Oírse también la sostiene: otra razón.', { luz: [3], nota: { 3: 'apoyo' } }],
      ['El color del libro y la hora son ciertos, pero si se quitan, nada se cae.', { luz: [2, 4] }],
      ['Se tachan. Lo que queda es el resumen.', { tacha: [2, 4] }],
      ['Y un buen título dice lo mismo en pocas palabras: «Leer en voz alta sirve».', { luz: [0] }],
    ], 'La prueba: quita la oración. Si la idea central pierde apoyo, era importante; si no, era adorno.'),
    xpHaz('hoja', 'Idea central: «Al mercado se puede ir en bicicleta». **Tacha** las dos oraciones que no la sostienen.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['Hay una ciclorruta que llega hasta la puerta.'], ['El mercado se fundó hace ochenta años.'], ['Los domingos venden flores.'], ['Adentro hay dónde dejar la bicicleta con llave.']], pista: 'Alguna de las tachadas sí sostiene la idea. Quita cada una y mira si sigue siendo fácil llegar en bicicleta.' }, 'Lo cierto no siempre es importante: importa lo que sostiene.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la oración que dice la **idea central** de todo el texto.', { modo: 'toca', meta: [4], paras: [['El museo abre hasta tarde los jueves.', 'Ese día entran más estudiantes que en toda la semana.'], ['Además, la mitad llega sin que nadie se lo haya pedido.', 'Una guía cuenta que algunos vuelven con sus abuelos.'], ['Cuando el horario se acomoda a la gente, la gente va al museo.']], pista: 'Esa vale para una parte. Busca la que explica por igual los dos primeros párrafos.' }, 'La idea central del texto reúne las ideas de sus párrafos.')],
], 'Una idea por párrafo, una nota al margen que diga qué hace, y para el resumen solo lo que sostiene.');
;
//#archivo js/explora-pu-el-3.js
// Preuniversitario · pu-el-3 «Tiempo y preguntas EXCEPTO» (Explora). Textos cortos propios.
{
  // Barra de minutos: l lectura, q preguntas, r repaso; m: la pregunta difícil que se come el resto.
  const barra = (v, K) => {
    const T = v.t, X = x => 24 + 292 * x / T, tr = (a, b, cls, s) => (b - a > 0.1 ? K.r(X(a), 70, X(b) - X(a), 46, cls, 6) + (b - a > 1.6 ? K.t(X((a + b) / 2), 98, s, 's') : '') : '');
    let h = K.r(24, 70, 292, 46, 'fn', 6) + tr(0, v.l, 'fa', 'leer') + tr(v.l, v.l + v.q, 'fg', 'responder') + tr(v.l + v.q, v.l + v.q + v.r, 'fA', 'repasar') + K.f(v.m, K.r(X(v.l), 70, (X(T) - X(v.l)) * v.m, 46, 'fF', 6) + K.t(X(v.l) + (X(T) - X(v.l)) / 2, 98, 'una sola pregunta', 's'));
    for (let k = 0; k <= T; k += T > 12 ? 2 : 1) h += K.l(X(k), 120, X(k), 126, 'lm') + (k % (T > 12 ? 4 : 2) === 0 ? K.t(X(k), 142, k, 's tm') : '');
    return h + K.t(170, 46, `${T} minutos`, 's ta');
  };
  xpLec('pu-el-3', [
    ['El tiempo',
      xpMira('dibujo', 'Empecemos por la idea: el tiempo se **reparte antes** de empezar.', { dib: barra, v: { t: 18, l: 0, q: 0, r: 0, m: 0 }, alto: 160 }, [
        ['Un texto con ocho preguntas y 18 minutos para todo.', {}],
        ['Primero, una lectura completa: cinco minutos.', { l: 5 }],
        ['Después, las preguntas, volviendo siempre al texto: once minutos.', { q: 11 }],
        ['Y dos minutos para repasar las que quedaron marcadas.', { r: 2 }],
        ['El error es quedarse en una difícil: se come el tiempo de las demás.', { m: 1 }],
        ['Mejor: marcarla, seguir y volver. Y responder todas, porque fallar no resta.', { m: 0 }],
      ], 'Leer una vez, responder volviendo al texto, marcar la difícil y no dejar nada en blanco.'),
      xpHaz('dibujo', 'Tienes **12** minutos. Deja **4** para leer y **1** para repasar; lo demás es para responder. Mueve los dos deslizadores.', { dib: (v, K) => barra({ t: 12, l: v.l, q: v.q, r: 12 - v.l - v.q, m: 0 }, K), v: { l: 1, q: 3 }, alto: 260, manijas: [{ k: 'l', min: 1, max: 6, paso: 1, et: 'minutos para leer' }, { k: 'q', min: 2, max: 8, paso: 1, et: 'minutos para responder', limita: v => v.l + v.q <= 12 }], metas: { l: 4, q: 7 }, limita: v => v.l + v.q <= 12 }, 'La mayor parte del tiempo es para responder con el texto a la vista.')],
    ['Volver al párrafo',
      xpMira('hoja', 'Segunda idea: en una pregunta **EXCEPTO**, tres opciones están en el texto y una no.', { letras: ['1', '2', 'a', 'b', 'c', 'd'], paras: [['El faro se encendía con aceite y lo cuidaba una familia.'], ['Hoy funciona con energía solar y se vigila a distancia.'], ['tenía cuidadores'], ['usaba aceite'], ['recibe turistas'], ['usa energía solar']] }, [
        ['«Del faro se dice todo lo siguiente, EXCEPTO». Se subraya la palabra que manda.', {}],
        ['Tenía cuidadores: está en el párrafo 1. Se descarta.', { luz: [0, 2], tacha: [2], nota: { 2: 'párrafo 1' } }],
        ['Usaba aceite: también en el párrafo 1. Se descarta.', { luz: [0, 3], tacha: [3], nota: { 3: 'párrafo 1' } }],
        ['Energía solar: está en el párrafo 2. Se descarta.', { luz: [1, 5], tacha: [5], nota: { 5: 'párrafo 2' } }],
        ['Recibe turistas: puede ser cierto, pero el texto no lo dice.', { luz: [4], nota: { 4: 'en ninguno' } }],
        ['La que se queda sin párrafo es la respuesta.', { luz: [4] }],
      ], 'En EXCEPTO cada opción busca su párrafo. La que no lo encuentra es la respuesta.'),
      xpHaz('hoja', '«Todo lo siguiente se dice de la laguna, EXCEPTO». **Tacha** las tres opciones que sí tienen párrafo.', { modo: 'tacha', letras: ['1', '2', 'a', 'b', 'c', 'd'], quietos: [0, 1], meta: [2, 4, 5], paras: [['La laguna se alimenta de tres quebradas y en ella anidan patos.'], ['Desde hace un año está prohibido pescar.'], ['anidan aves'], ['se puede nadar'], ['recibe agua de quebradas'], ['no se puede pescar']], pista: 'Alguna de las tachadas no está en el texto. Vuelve a los párrafos 1 y 2 y busca cada una.' }, 'Que algo suene lógico no basta: tiene que estar escrito.')],
    ['La intrusa disfrazada',
      xpMira('hoja', 'Tercera idea: si la pregunta nombra **un párrafo**, solo vale lo que está ahí.', { letras: ['1', '2', 'a', 'b', 'c'], paras: [['El páramo guarda agua en su musgo y la suelta poco a poco.'], ['Las quemas y el ganado lo secan; por eso hay guardas.'], ['guarda agua'], ['hay guardas'], ['las quemas le hacen daño']] }, [
        ['«Según el párrafo 2, se dice todo, EXCEPTO». La orden nombra un párrafo.', { luz: [1] }],
        ['Que hay guardas y que las quemas dañan está ahí: se descartan.', { tacha: [3, 4], luz: [1] }],
        ['Guarda agua sí está en el texto, pero en el párrafo 1.', { luz: [0, 2], nota: { 2: 'otro párrafo' } }],
        ['Como la orden pide el 2, esa es la respuesta, aunque suene conocida.', { luz: [2] }],
        ['Ojo: «lo dice» es estar escrito; «se deduce» es tener que pensarlo con lo escrito.', { limpia: true }],
        ['Que da agua aun después de la lluvia no está escrito: se deduce de «poco a poco».', { luz: [0] }],
        ['Y una opción falsa se desmiente con una oración que diga lo contrario.', {}],
      ], 'Lo que está en otro párrafo no cuenta. Y deducir es sacar algo de lo escrito, sin inventar.'),
      xpHaz('hoja', 'Marca al margen: ¿el texto lo dice, se deduce de él o no está? El texto: «La panadería abre a las cinco; a las siete ya no hay pan».', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['no está', 'se deduce', 'lo dice'], meta: [1, 2, 0], paras: [['El pan se vende rápido.'], ['La panadería abre a las cinco.'], ['El pan es barato.']], pista: 'Alguno no va ahí. Pregúntate: ¿está escrito, sale de lo escrito o habría que inventarlo?' }, 'Escrito, deducido o inventado: tres cosas distintas.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Según el **párrafo 1**, el taller hace todo lo siguiente, EXCEPTO». Subraya la respuesta.', { modo: 'toca', letras: ['1', '2', 'a', 'b', 'c'], quietos: [0, 1], meta: [3], paras: [['En el taller reparan radios viejos y enseñan a soldar.'], ['Los sábados regalan piezas sueltas a los colegios.'], ['dar clases de soldadura'], ['donar piezas'], ['arreglar aparatos']], pista: 'Esa sí está en el párrafo 1, quizá con otras palabras. Busca la que solo aparece en otro lado.' }, 'La orden manda: primero qué pide y dónde; después, las opciones.')],
  ], 'Reparte el tiempo, lee la orden, lleva cada opción a su párrafo y no dejes nada en blanco.');
}
;
//#archivo js/explora-pu-tt-1.js
// Preuniversitario · pu-tt-1 «Tipologías» (Explora). Textos cortos propios.
xpLec('pu-tt-1', [
  ['Cuatro maneras',
    xpMira('hoja', 'Empecemos por la idea: con las palabras se pueden hacer **cuatro cosas** distintas.', { letras: ['A', 'B', 'C', 'D'], paras: [['Anoche un búho entró al dormitorio y nadie pudo dormir.'], ['El búho es pequeño, pardo y tiene los ojos amarillos.'], ['El búho gira la cabeza porque sus ojos no se mueven.'], ['El colegio debería conservar el árbol viejo, porque allí vive el búho.']] }, [
      ['Cuatro oraciones sobre el mismo búho. Cada una hace algo distinto.', {}],
      ['La primera cuenta algo que pasó: narra. Se nota en el tiempo y en la acción.', { luz: [0], nota: { 0: 'narra' } }],
      ['La segunda muestra cómo es: describe. Se nota en colores y formas.', { luz: [1], nota: { 1: 'describe' } }],
      ['La tercera dice cómo funciona: explica. También se llama expositiva.', { luz: [2], nota: { 2: 'explica' } }],
      ['La cuarta pide algo y da una razón: argumenta. «Debería» la delata.', { luz: [3], nota: { 3: 'argumenta' } }],
    ], 'Narrar es contar; describir, mostrar; explicar, decir cómo funciona; argumentar, defender.'),
    xpHaz('hoja', 'Pon al margen qué hace cada oración.', { modo: 'margen', letras: ['A', 'B', 'C', 'D'], rotulos: ['explica', 'argumenta', 'narra', 'describe'], meta: [3, 2, 1, 0], paras: [['La feria huele a naranja y está llena de toldos verdes.'], ['El domingo se cayó un toldo y todos corrieron a levantarlo.'], ['Los toldos deberían ir amarrados, porque el viento es fuerte.'], ['El toldo se infla porque el aire entra por debajo.']], pista: 'Alguno no va ahí. Pregunta: ¿cómo es?, ¿qué pasó?, ¿qué hay que hacer? o ¿cómo funciona?' }, 'La misma feria sirve para narrar, describir, explicar o argumentar.')],
  ['Las pistas',
    xpMira('hoja', 'Segunda idea: cada tipología deja **pistas en las palabras**.', { paras: [['Primero se calienta el agua;', 'después se agrega la sal', 'y al final se apaga.'], ['Llegó tarde, saludó y se sentó.'], ['Es una casa baja, azul, con olor a madera.'], ['Vale la pena arreglarla porque aún sirve.']] }, [
      ['Cuatro trozos. Busquemos la pista de cada uno.', {}],
      ['«Primero», «después», «al final»: pasos en orden. Explica un proceso.', { luz: [0, 1, 2], nota: { 0: 'pasos' } }],
      ['«Llegó», «saludó», «se sentó»: acciones en pasado. Narra.', { luz: [3], nota: { 1: 'acciones pasadas' } }],
      ['«Baja», «azul», «olor»: lo que se ve y se huele. Describe.', { luz: [4], nota: { 2: 'sensaciones' } }],
      ['«Vale la pena… porque»: un juicio y su razón. Argumenta.', { luz: [5], nota: { 3: 'juicio y razón' } }],
      ['Si cambias la pista, cambia la tipología: «arregló la casa» ya narra.', {}],
    ], 'Pasos: explica. Acciones en pasado: narra. Sensaciones: describe. «Debería» o «porque» con un juicio: argumenta.'),
    xpHaz('hoja', 'Subraya las **dos** oraciones que narran.', { modo: 'toca', meta: [1, 3], paras: [['La laguna es redonda y oscura.', 'Mi tío la cruzó a nado una sola vez.', 'El fondo se oscurece porque la luz no llega.'], ['Salió temblando y no quiso volver.', 'Deberían poner un aviso en la orilla.']], pista: 'Alguna de las subrayadas no cuenta una acción que ya pasó. Busca los verbos en pasado con alguien que hace algo.' }, 'Narrar necesita que pase algo en el tiempo.')],
  ['Se mezclan',
    xpMira('hoja', 'Tercera idea: un texto mezcla tipologías, pero **una manda**.', { paras: [['El parque tiene bancas rotas y una fuente seca.'], ['El mes pasado se cayó un niño.'], ['Las bancas se pudren porque nadie las pinta.'], ['Por eso, el barrio debería adoptar el parque.']] }, [
      ['Este texto empieza describiendo el parque.', { luz: [0], nota: { 0: 'describe' } }],
      ['Después narra una caída.', { luz: [1], nota: { 1: 'narra' } }],
      ['Y explica por qué se dañan las bancas.', { luz: [2], nota: { 2: 'explica' } }],
      ['Al final pide: todo lo anterior estaba para llegar ahí.', { luz: [3], nota: { 3: 'argumenta' } }],
      ['Por eso predomina la argumentación: es el propósito de todo el texto.', { luz: [3] }],
      ['Una crónica también mezcla: relata, describe, da voz a testigos y a veces cierra con una postura.', {}],
    ], 'Predomina la tipología que organiza todo el texto, no la que ocupa más renglones.'),
    xpHaz('hoja', 'Subraya la oración que dice el **propósito de todo** el texto.', { modo: 'toca', meta: [3], paras: [['La panadería de la esquina abre a las cuatro.', 'Ayer se quedó sin harina y cerró a las siete.'], ['El pan se endurece porque pierde agua.'], ['Conviene comprarle a ella, para que no desaparezca.']], pista: 'Esa sirve a una parte. Busca aquello para lo que se dijeron las demás.' }, 'Pregunta para qué está cada parte: casi siempre, todas sirven a una.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'De estas cuatro oraciones, dos **explican** el eco y dos son de otra tipología. **Tacha** esas dos.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['El sonido choca contra la montaña y regresa.'], ['Aquella tarde mi hermana gritó su nombre tres veces.'], ['Todos deberíamos gritar al menos una vez en un cañón.'], ['Si la pared está muy cerca, el eco no se distingue del grito.']], pista: 'Alguna de las tachadas sí dice cómo funciona el eco. Busca la que cuenta y la que pide.' }, 'Explicar es decir cómo funciona, sin contar ni pedir.')],
], 'Narrar, describir, explicar y argumentar: busca la pista en las palabras y pregunta cuál manda en todo el texto.');
;
//#archivo js/explora-pu-tt-2.js
// Preuniversitario · pu-tt-2 «Géneros del examen» (Explora). Textos cortos propios.
xpLec('pu-tt-2', [
  ['Quién habla y para qué',
    xpMira('hoja', 'Empecemos por la idea: el **género** se reconoce por quién habla y para qué.', { letras: ['A', 'B', 'C', 'D', 'E'], paras: [['Yo vi crecer el puerto desde mi ventana.'], ['Cerrar el puerto fue un error.'], ['El agua sube dos veces al día por la atracción de la Luna.'], ['A las cinco de la mañana, el muelle ya olía a café.'], ['—¿Extraña el mar? —Todos los días.']] }, [
      ['Alguien cuenta lo que vivió, en primera persona: testimonio.', { luz: [0], nota: { 0: 'testimonio' } }],
      ['Alguien juzga algo de actualidad y firma: artículo de opinión.', { luz: [1], nota: { 1: 'opinión' } }],
      ['Se explica ciencia para quien no es experto: texto divulgativo.', { luz: [2], nota: { 2: 'divulgativo' } }],
      ['Se relata con hora y lugar: crónica.', { luz: [3], nota: { 3: 'crónica' } }],
      ['Preguntas y respuestas, dos voces: entrevista.', { luz: [4], nota: { 4: 'entrevista' } }],
      ['Y un ensayo reflexiona con calma alrededor de una tesis.', {}],
    ], 'Testimonio: lo vivido. Opinión: un juicio. Divulgación: ciencia. Crónica: hora y lugar. Entrevista: dos voces.'),
    xpHaz('hoja', 'Pon al margen el género de cada fragmento.', { modo: 'margen', letras: ['A', 'B', 'C', 'D'], rotulos: ['crónica', 'divulgativo', 'opinión', 'testimonio'], meta: [1, 3, 0, 2], paras: [['La miel no se daña porque tiene muy poca agua.'], ['Yo aprendí a nadar el año de la creciente.'], ['Era mediodía en la plaza y el desfile aún no llegaba.'], ['Subir el pasaje sin mejorar los buses es una burla.']], pista: 'Alguno no va ahí. ¿Explica, cuenta su propia vida, relata con hora y lugar, o juzga?' }, 'La voz y el propósito dicen el género.')],
  ['Dos voces y sus signos',
    xpMira('hoja', 'Segunda idea: en una entrevista, los **signos** dicen quién habla.', { paras: [['Sara Díaz arregla relojes hace veinte años.'], ['—¿Por qué relojes?'], ['—Por una razón: me gusta oír que algo vuelve a andar.'], ['—¿Y cuáles prefiere?', '—Los viejos.']] }, [
      ['El periodista presenta: habla de ella como «ella».', { luz: [0], nota: { 0: 'periodista' } }],
      ['La raya da el turno. Aquí pregunta el periodista.', { luz: [1], nota: { 1: 'periodista' } }],
      ['Otra raya: ahora responde Sara, en primera persona.', { luz: [2], nota: { 2: 'Sara' } }],
      ['Los dos puntos anuncian lo que viene: cuál es la razón.', { luz: [2] }],
      ['Los signos de pregunta abren y cierran lo que se pregunta.', { luz: [3] }],
      ['A veces la raya cambia en el mismo renglón: cambia la voz.', { luz: [4] }],
    ], 'La raya da el turno, los dos puntos anuncian y los de pregunta encierran lo que se pregunta.'),
    xpHaz('hoja', 'Subraya las **dos** oraciones que dice la entrevistada.', { modo: 'toca', meta: [2, 4], paras: [['Elena Ruiz pinta murales desde niña.', '—¿Qué es lo más difícil?', '—Esperar a que el muro se seque.'], ['Se ríe y mira sus manos.', '—Yo nunca aprendí a esperar.']], pista: 'Alguna de las subrayadas no es suya: alguien la presenta, la mira o le pregunta. Busca sus respuestas.' }, 'Quien presenta, describe o pregunta es el periodista.')],
  ['A qué apunta una palabra',
    xpMira('hoja', 'Tercera idea: palabras como «ese», «ella» o «lo» **apuntan** a algo ya nombrado.', { unidos: true, paras: [['Sara compró ', 'un reloj', ' y ', 'una lupa', '. ', 'Lo', ' abrió con cuidado y con ', 'ella', ' buscó la pieza rota.']] }, [
      ['«Lo abrió». ¿Qué abrió? Hay que volver atrás.', { luz: [5] }],
      ['Se prueba cada opción: «abrió un reloj» tiene sentido.', { luz: [1, 5] }],
      ['«Lo» es masculino y singular, como «un reloj».', { luz: [1, 5] }],
      ['«Con ella buscó»: femenino y sirve para mirar. Apunta a la lupa.', { luz: [3, 7] }],
      ['Dos palabras pueden apuntar a lo mismo, o cada una a algo distinto.', {}],
      ['Reemplaza, lee la oración entera y revisa que concuerde.', {}],
    ], 'Para saber a qué apunta una palabra, pon cada opción en su lugar y lee toda la oración.'),
    xpHaz('hoja', 'Subraya aquello a lo que apunta «**esta**».', { modo: 'toca', unidos: true, meta: [3], quietos: [0, 2, 4, 5, 6], paras: [['El taller tiene ', 'un banco', ' junto a ', 'una ventana', '. Por ', 'esta', ' entra la luz de la mañana.']], pista: 'Prueba: ¿por un banco entra la luz?' }, 'Concuerda en género y, sobre todo, tiene sentido.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'El género anticipa las preguntas. De un **testimonio** sobre una mudanza, tacha las dos preguntas que **no** esperarías.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['¿Qué sintió al dejar su casa?'], ['¿Cuál es la fórmula para calcular la carga?'], ['¿Por qué tuvo que irse?'], ['¿Qué ley propone el autor?']], pista: 'Alguna de las tachadas sí se responde con una vida contada. Busca las que pedirían ciencia o una postura.' }, 'En un testimonio se pregunta por lo vivido: qué sintió y por qué pasó.')],
], 'Quién habla y para qué dicen el género; los signos, los turnos; y cada «ese» o «lo» apunta a algo ya dicho.');
;
//#archivo js/explora-pu-tt-3.js
// Preuniversitario · pu-tt-3 «Estructura y testimonio» (Explora). Textos cortos propios.
xpLec('pu-tt-3', [
  ['Cómo está armado',
    xpMira('hoja', 'Empecemos por la idea: un texto está **armado por piezas**, y cada una cumple un papel.', { paras: [['El parque debería cerrar más tarde.'], ['De noche es cuando la gente sale del trabajo.'], ['Algunos dicen que es peligroso.'], ['Pero donde hay luz y gente, hay menos peligro.']] }, [
      ['Este texto argumenta. Veamos sus piezas.', {}],
      ['Lo que defiende es la tesis.', { luz: [0], nota: { 0: 'tesis' } }],
      ['La razón que la apoya es un argumento.', { luz: [1], nota: { 1: 'argumento' } }],
      ['Lo que dirían otros en contra es el contraargumento.', { luz: [2], nota: { 2: 'contraargumento' } }],
      ['Y la respuesta lo contesta: «pero…».', { luz: [3], nota: { 3: 'respuesta' } }],
      ['Un texto que cuenta una vida se arma distinto: antes, cambio y después.', {}],
    ], 'Argumentar: tesis, argumento, contraargumento y respuesta. Contar una vida: antes, cambio y después.'),
    xpHaz('hoja', 'Pon al margen el papel de cada oración.', { modo: 'margen', rotulos: ['contraargumento', 'tesis', 'respuesta', 'argumento'], meta: [1, 3, 0, 2], paras: [['El salón debería tener plantas.'], ['Las plantas refrescan el aire.'], ['Hay quienes creen que ensucian.'], ['Sin embargo, basta regarlas con cuidado.']], pista: 'Alguno no va ahí. ¿Qué se pide, con qué razón, qué dicen otros y cómo se les contesta?' }, 'Cada pieza responde a otra: por eso el orden importa.')],
  ['La voz del testimonio',
    xpMira('hoja', 'Segunda idea: el testimonio suena a **alguien que habla** de su vida.', { paras: [['Yo salí del pueblo a los quince.', 'Uno a esa edad no sabe nada, ¿sí me entiende?'], ['Un día llegó una carta.', 'Entonces decidí volver.'], ['Ahora siembro otra vez.']] }, [
      ['«Yo salí»: primera persona. Quien habla lo vivió.', { luz: [0], nota: { 0: 'antes' } }],
      ['«Uno», «¿sí me entiende?»: así se habla. Son marcas de oralidad.', { luz: [1], sello: { 1: 'oralidad' } }],
      ['«Uno» parece cualquiera, pero habla de sí misma.', { luz: [1] }],
      ['«Un día» marca el momento del cambio.', { luz: [2, 3], nota: { 1: 'cambio' } }],
      ['«Ahora» marca el después.', { luz: [4], nota: { 2: 'después' } }],
      ['Las palabras de tiempo ordenan la vida que se cuenta.', {}],
    ], 'Primera persona, marcas de oralidad como «uno» y palabras de tiempo que ordenan la vida.'),
    xpHaz('hoja', 'Subraya las **dos** oraciones con marcas de oralidad.', { modo: 'toca', meta: [1, 3], paras: [['Yo manejaba un bus escolar.', 'Mire, uno ahí aprende a tener paciencia.'], ['Los niños subían en la misma esquina.', 'Eran terribles, pues, pero qué se le va a hacer.']], pista: 'Alguna de las subrayadas no tiene muletillas del habla. Léelas en voz alta: ¿en cuáles parece que te conversan?' }, 'Las marcas de oralidad dejan oír la voz.')],
  ['Género o cita',
    xpMira('hoja', 'Tercera idea: «testimonio» puede ser **todo el texto** o solo **una cita** adentro.', { letras: ['A', 'B'], paras: [['Yo fui telegrafista treinta años.', 'Mandé miles de mensajes que nunca leí.'], ['La oficina de telégrafos debería ser un museo.', '«Yo mandé miles de mensajes», cuenta Ana Vega.', 'Esa memoria merece un techo.']] }, [
      ['En A habla la misma persona de principio a fin.', { luz: [0, 1] }],
      ['Todo el texto es su voz: el género es testimonio.', { luz: [0, 1], nota: { 0: 'testimonio' } }],
      ['En B escribe otra persona, que defiende algo.', { luz: [2, 4] }],
      ['Solo deja hablar un momento a Ana: es una cita testimonial.', { luz: [3], sello: { 3: 'cita' } }],
      ['B sigue siendo un texto de opinión, aunque tenga una cita.', { nota: { 1: 'opinión con una cita' } }],
      ['A veces quien habla pregunta sin esperar respuesta: es una pregunta retórica.', {}],
    ], 'El género lo da quien habla en todo el texto. Una pregunta retórica no pide un dato: señala algo.'),
    xpHaz('hoja', 'Subraya la **pregunta retórica**: la que no espera que le contesten.', { modo: 'toca', meta: [3], paras: [['«¿Qué hora es?», le preguntó al vecino.', '«¿Me ayuda con la maleta?», dijo después.'], ['Había perdido el bus, el dinero y los papeles.', '«¿Y ahora quién podría creerme?», pensó en voz alta.']], pista: 'Esa no pregunta, o alguien puede contestarla con un dato o con un gesto. Busca la que no espera contestación.' }, 'Si una respuesta sonaría rara, la pregunta es retórica.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la **cita testimonial** de este artículo.', { modo: 'toca', meta: [2], paras: [['El molino de agua lleva dos siglos en pie.', 'Cerrarlo sería perder una escuela.'], ['«Yo aprendí a contar con los bultos de maíz», dice Pedro, el molinero.', 'Su historia es la de muchos.', 'Por eso hay que cuidarlo.']], pista: 'Esa la dice quien escribe el artículo. Busca dónde habla en primera persona alguien que lo vivió.' }, 'La cita deja oír al testigo; el artículo sigue siendo de quien lo escribe.')],
], 'Mira cómo está armado el texto, quién habla en todo y quién solo en una cita.');
;
//#archivo js/explora-pu-ie.js
// Preuniversitario · lectura, mundo 3 «Información explícita» (Explora): pu-ie-1 a pu-ie-4. Textos cortos propios.
xpLec('pu-ie-1', [
  ['La palabra clave',
    xpMira('hoja', 'Empecemos por la idea: «según el texto» pide un dato **escrito**. No se recuerda: se busca.', { paras: [['El faro se encendió por primera vez en 1907.'], ['Lo cuidaban dos familias que se turnaban cada mes.'], ['Su luz se ve a 30 kilómetros.']] }, [
      ['Pregunta: ¿cada cuánto se turnaban? No respondas de memoria.', {}],
      ['Se saca una palabra clave: «turnaban».', {}],
      ['Se pasa la vista buscando solo eso.', { luz: [1], nota: { 1: 'turnos' } }],
      ['Ahí está: cada mes. El dato queda señalado.', { luz: [1] }],
      ['Si preguntan por una fecha o una distancia, la pista es un número.', { luz: [0, 2] }],
    ], 'Saca una palabra clave de la pregunta (un nombre, una cifra) y vuelve al texto a buscarla.'),
    xpHaz('hoja', 'Subraya la oración que responde: ¿**cuánto** pesa la campana?', { modo: 'toca', meta: [2], paras: [['La campana llegó en un barco en 1820.', 'La subieron entre cuarenta hombres.'], ['Pesa novecientos kilos.', 'Suena dos veces al día.']], pista: 'Esa trae un dato, pero de otra cosa. La palabra clave es «pesa».' }, 'El dato está escrito: solo hay que encontrarlo.')],
  ['Datos que se juntan',
    xpMira('hoja', 'Segunda idea: a veces la respuesta necesita **dos datos** de oraciones distintas.', { paras: [['Al torneo llegaron 48 equipos.', 'La lluvia obligó a cambiar de cancha.'], ['De ellos, 30 venían de otros municipios.']] }, [
      ['Pregunta: ¿cuántos equipos eran del mismo municipio?', {}],
      ['Nadie lo dice en una sola oración.', {}],
      ['Aquí está el total.', { luz: [0], sello: { 0: 'total' } }],
      ['Y aquí los que venían de afuera.', { luz: [2], sello: { 2: 'de afuera' } }],
      ['Se juntan: 48 menos 30 son 18.', { luz: [0, 2] }],
      ['La lluvia es cierta, pero no hace falta.', { luz: [1] }],
    ], 'Si no está en una oración, mira si sale de juntar dos. Lo demás se deja quieto.'),
    xpHaz('hoja', 'Subraya las **dos** oraciones que se juntan para saber cuántos años duró abierto el teatro.', { modo: 'toca', meta: [0, 3], paras: [['El teatro abrió en 1931.', 'Tenía doscientas sillas rojas.'], ['Allí cantó una vez una niña del barrio.', 'Cerró sus puertas en 1986.']], pista: 'Alguna de las subrayadas no habla de cuándo abrió ni de cuándo cerró.' }, 'Un comienzo y un final: dos datos, una respuesta.')],
  ['Ni más ni menos que lo escrito',
    xpMira('hoja', 'Tercera idea: al volver, se compara **verbo por verbo**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Los vecinos pidieron un semáforo y la oficina prometió estudiarlo.'], ['Los vecinos pidieron un semáforo.'], ['La oficina instaló un semáforo.'], ['La oficina dijo que lo estudiaría.']] }, [
      ['Arriba, lo que dice el texto. Abajo, tres opciones.', { luz: [0] }],
      ['«Pidieron» está tal cual.', { luz: [0, 1], nota: { 1: 'lo dice' } }],
      ['«Instaló» no es «prometió estudiar». Cambió el verbo.', { luz: [0, 2], tacha: [2] }],
      ['«Dijo que lo estudiaría» usa otras palabras para lo mismo.', { luz: [0, 3], nota: { 3: 'lo mismo' } }],
      ['Una opción falsa se descarta con la oración que la contradice.', { luz: [0] }],
      ['Y si algo no está escrito pero sale de lo escrito, se deduce.', {}],
    ], '«Pidió» no es «logró». Compara el verbo de la opción con el del texto.'),
    xpHaz('hoja', 'El texto: «El club **propuso** abrir los lunes». **Tacha** las dos opciones que no dice.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['El club abre los lunes.'], ['El club hizo una propuesta.'], ['Se planteó abrir los lunes.'], ['Los lunes el club se llena.']], pista: 'Alguna de las tachadas sí sale de «propuso abrir los lunes». Proponer no es hacer.' }, 'Proponer, pedir o prometer no es hacer.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la oración que responde: ¿**por qué** cambiaron de lugar la feria?', { modo: 'toca', meta: [3], paras: [['La feria del libro reúne a sesenta editoriales.', 'Este año se hizo en la plaza cubierta.'], ['Duró cuatro días y la entrada fue gratis.', 'La lluvia del año pasado había dañado muchas cajas.']], pista: 'Esa dice qué pasó, no por qué se cambió. Busca lo que había salido mal antes.' }, 'La pregunta dice qué clase de dato buscar: cuánto, cuándo o por qué.')],
], 'Palabra clave, volver al texto, juntar si hace falta y comparar verbo por verbo.');

xpLec('pu-ie-2', [
  ['Lo mismo, con otras palabras',
    xpMira('hoja', 'Empecemos por la idea: parafrasear es decir **lo mismo** con otras palabras.', { letras: ['1', 'a', 'b', 'c'], paras: [['Muchos jóvenes prefieren oír un podcast que leer el periódico.'], ['A bastantes muchachos les gusta más oír un podcast.'], ['Los jóvenes ya no leen.'], ['Los podcast duran media hora.']] }, [
      ['Arriba, el original. ¿Cuál de las tres dice lo mismo?', { luz: [0] }],
      ['«Muchos» es «bastantes» y «prefieren» es «les gusta más»: es fiel.', { luz: [0, 1], nota: { 1: 'fiel' } }],
      ['«Ya no leen» dice más de lo dicho: exagera.', { luz: [2], nota: { 2: 'dice de más' } }],
      ['La duración no estaba: agrega.', { luz: [3], nota: { 3: 'agrega' } }],
      ['Cambian las palabras; lo que se dice, no.', { luz: [0, 1] }],
    ], 'Una paráfrasis fiel no agrega ni quita: solo cambia las palabras.'),
    xpHaz('hoja', 'Original: «Casi siempre llueve en abril». Subraya la paráfrasis **fiel**.', { modo: 'toca', meta: [1], letras: ['A', 'B', 'C', 'D'], paras: [['En abril llueve todos los días.'], ['La lluvia es habitual en abril.'], ['A veces llueve en abril.'], ['Abril es el mes más triste.']], pista: 'Esa cambia cuánto llueve o agrega algo. Busca la que conserve «casi siempre».' }, '«Casi siempre» y «habitual» miden lo mismo.')],
  ['El alcance',
    xpMira('hoja', 'Segunda idea: las trampas cambian **cuánto** o **hasta dónde**.', { letras: ['A', 'B', 'C'], paras: [['Algunos…', 'varios…', 'muchos…', 'todos.'], ['Puede…', 'suele…', 'siempre.'], ['Reduce…', 'elimina.']] }, [
      ['Estas palabras miden. Van de menos a más.', {}],
      ['De «algunos» a «todos» hay mucho trecho.', { luz: [0, 3], nota: { 0: 'cuántos' } }],
      ['«Puede» o «suele» no es «siempre».', { luz: [4, 5, 6], nota: { 1: 'qué tan seguido' } }],
      ['«Reduce» deja algo; «elimina» no deja nada.', { luz: [7, 8], nota: { 2: 'hasta dónde' } }],
      ['Si la opción sube o baja de escalón, ya no es fiel.', {}],
      ['Otra trampa: «sugiere» propone; «demuestra» asegura.', {}],
    ], 'Cuida las palabras que miden: cuántos, qué tan seguido y hasta dónde.'),
    xpHaz('hoja', 'Original: «El filtro **puede reducir** el ruido». **Tacha** las dos que cambian el alcance.', { modo: 'tacha', meta: [1, 2], letras: ['A', 'B', 'C', 'D'], paras: [['Con el filtro es posible que haya menos ruido.'], ['El filtro acaba con el ruido.'], ['El filtro siempre baja el ruido.'], ['Quizá el filtro disminuya el ruido.']], pista: 'Alguna de las tachadas conserva «puede» y «reducir». Busca la que asegura o la que elimina.' }, '«Puede» es quizá; «reducir» es menos, no nada.')],
  ['Las bisagras también dicen',
    xpMira('hoja', 'Tercera idea: al decirlo con otras palabras, se conserva **cómo se unen** las ideas.', { paras: [['El bus se varó;', 'por eso llegamos tarde.'], ['El bus se varó;', 'sin embargo, llegamos a tiempo.'], ['El bus se varó.', 'Además, llovía.'], ['Solo había una salida:', 'caminar.']] }, [
      ['«Por eso»: lo segundo resulta de lo primero.', { luz: [0, 1], nota: { 0: 'resulta' } }],
      ['«Sin embargo»: lo segundo va en contra de lo esperado.', { luz: [2, 3], nota: { 1: 'se opone o limita' } }],
      ['«Además»: se suma otra cosa del mismo lado.', { luz: [4, 5], nota: { 2: 'suma' } }],
      ['Los dos puntos anuncian lo que viene; las rayas meten una aclaración o ejemplos.', { luz: [6, 7], nota: { 3: 'anuncia' } }],
      ['Cambiar la bisagra cambia lo que se dice, aunque las palabras sean las mismas.', {}],
    ], '«Por eso» resulta, «sin embargo» limita y «además» suma: la paráfrasis conserva esa relación.'),
    xpHaz('hoja', 'Pon al margen cómo se une lo segundo con lo primero.', { modo: 'margen', rotulos: ['se opone', 'resulta', 'suma'], meta: [1, 2, 0], paras: [['Dejó la ventana abierta; por eso se mojó el libro.'], ['Es barato. Además, dura años.'], ['Es viejo; sin embargo, funciona.']], pista: 'Alguno no va ahí. Mira la palabra que une las dos mitades.' }, 'La relación entre las ideas también se parafrasea.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Original: «Varios estudios **sugieren** que caminar **ayuda** a la memoria». Subraya la fiel.', { modo: 'toca', meta: [2], letras: ['A', 'B', 'C', 'D'], paras: [['Está demostrado que caminar da memoria.'], ['Todos los estudios recomiendan caminar.'], ['Algunas investigaciones apuntan a que caminar favorece la memoria.'], ['Sin caminar no hay memoria.']], pista: 'Esa asegura, generaliza o exagera. Busca la que propone sin asegurar.' }, 'Mismo número, misma seguridad, misma fuerza.')],
], 'Otras palabras, el mismo alcance y la misma relación entre las ideas.');

xpLec('pu-ie-3', [
  ['Verdadero no es «dicho»',
    xpMira('hoja', 'Empecemos por la idea: algo puede ser **verdad** y aun así **no estar en el texto**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Los murciélagos de la cueva salen al anochecer y comen frutas.'], ['Salen cuando oscurece.'], ['Son mamíferos.'], ['Le temen a la luz.']] }, [
      ['Arriba, todo lo que dice el texto.', { luz: [0] }],
      ['«Salen cuando oscurece»: está, con otras palabras.', { luz: [0, 1], nota: { 1: 'lo dice' } }],
      ['«Son mamíferos»: es verdad, pero aquí nadie lo dijo.', { luz: [2], nota: { 2: 'no lo dice' } }],
      ['«Le temen a la luz»: suena lógico. Tampoco está.', { luz: [3], nota: { 3: 'no lo dice' } }],
      ['La pregunta que salva: ¿dónde lo dice?', { luz: [0] }],
    ], 'Para aceptar una opción, señala la frase que la dice. Si no puedes, no está.'),
    xpHaz('hoja', 'Texto: «La tortuga vuelve cada año a la misma playa a poner sus huevos». **Tacha** las dos que **no** dice.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['Regresa todos los años.'], ['Vive más de cien años.'], ['Está en peligro.'], ['Pone huevos en la playa.']], pista: 'Alguna de las tachadas sí está en el texto, aunque con otras palabras.' }, 'Que lo sepas tú no significa que lo diga el texto.')],
  ['Los huecos que uno llena',
    xpMira('hoja', 'Segunda idea: sin darnos cuenta, **llenamos huecos** con lo que sabemos.', { paras: [['Inés llegó empapada', 'y colgó el abrigo.'], ['Su tío usa hojas de sauce para el dolor,', 'como hacía su madre.']] }, [
      ['Uno piensa: «Llovía». El texto no lo dice: pudo caer al río.', { luz: [0] }],
      ['El texto solo dice que llegó empapada.', { luz: [0], sello: { 0: 'dicho' } }],
      ['Uno piensa: «El sauce cura». El texto tampoco lo dice.', { luz: [2] }],
      ['Dice que el tío lo usa, por tradición.', { luz: [2, 3], sello: { 3: 'dicho' } }],
      ['Que alguien haga algo no prueba que funcione.', {}],
      ['Advertir, pedir o creer no es asegurar.', {}],
    ], 'Que alguien lo haga, lo crea o lo pida no es que el texto lo afirme.'),
    xpHaz('hoja', 'Subraya la única opción que el texto **dice**: «Rosa le reza a la luna para que crezca su huerta».', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['La luna hace crecer las plantas.'], ['La huerta de Rosa está creciendo.'], ['Rosa no usa abono.'], ['Rosa le pide algo a la luna.']], pista: 'Esa llena un hueco. El texto solo cuenta lo que hace Rosa y para qué.' }, 'El texto cuenta lo que hace Rosa, no que funcione.')],
  ['En otro lugar o en ninguno',
    xpMira('hoja', 'Tercera idea: antes de decir «no está», **se busca** en todo el texto.', { letras: ['1', '2', 'a', 'b', 'c'], paras: [['El taller abrió en una cochera.'], ['Hoy ocupa una bodega y tiene seis mesas.'], ['empezó en una cochera'], ['tiene seis mesas'], ['vende por internet']] }, [
      ['«Según el párrafo 2, se dice todo, EXCEPTO».', { luz: [1] }],
      ['Las seis mesas están ahí: se descarta.', { luz: [1, 3], tacha: [3] }],
      ['La cochera está, pero en el párrafo 1.', { luz: [0, 2], nota: { 2: 'en otro' } }],
      ['Vender por internet no está en ninguno.', { luz: [4], nota: { 4: 'en ninguno' } }],
      ['Las dos quedan fuera del párrafo 2, por razones distintas.', { luz: [2, 4] }],
      ['Para entender una palabra como «ninguno», se busca a quién apunta.', {}],
    ], 'Está aquí, está en otro lado o no está: se decide buscando, no recordando.'),
    xpHaz('hoja', 'Pon al margen dónde está cada opción. Párrafo 1: «Es un pan de yuca». Párrafo 2: «Se hornea en hojas».', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['en ninguno', 'en el 1', 'en el 2'], meta: [2, 0, 1], paras: [['Se cocina envuelto.'], ['Se come con queso.'], ['Se hace con yuca.']], pista: 'Alguno no va ahí. Busca cada opción en los dos párrafos del enunciado.' }, 'Buscar antes de descartar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Texto: «Dos alumnos cambiaron de mesa y dicen que piensan quedarse». Subraya lo que **sí** se puede afirmar.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sus notas mejoraron.'], ['Quieren seguir en la mesa nueva.'], ['La mesa vieja era incómoda.'], ['El profesor los movió.']], pista: 'Para aceptar esa tendrías que agregar algo que el texto no dice.' }, 'Solo lo leído: lo demás lo puso uno.')],
], 'Pregunta siempre: ¿dónde lo dice? Lo que solo suena bien se queda afuera.');

xpLec('pu-ie-4', [
  ['Cada idea tiene dueño',
    xpMira('hoja', 'Empecemos por la idea: en un texto hablan **varias voces**, y cada idea tiene dueño.', { paras: [['Según la entrenadora, faltó descanso.'], ['«Nos sobró confianza», dijo el capitán.'], ['A mi juicio, las dos cosas son ciertas.']] }, [
      ['Tres ideas sobre el mismo partido. ¿De quién es cada una?', {}],
      ['«Según la entrenadora»: la idea es de ella.', { luz: [0], nota: { 0: 'la entrenadora' } }],
      ['Comillas y «dijo»: son las palabras exactas del capitán.', { luz: [1], nota: { 1: 'el capitán' } }],
      ['«A mi juicio»: habla quien escribe, el autor.', { luz: [2], nota: { 2: 'el autor' } }],
      ['Otras marcas: sostiene, afirma, reconoce, a mi modo de ver.', {}],
    ], '«Según», las comillas y verbos como «sostiene» dicen de quién es la idea; «a mi juicio», que es del autor.'),
    xpHaz('hoja', 'Pon al margen de quién es cada idea.', { modo: 'margen', rotulos: ['el autor', 'la bióloga', 'el alcalde'], meta: [1, 2, 0], paras: [['El humedal se seca, sostiene la bióloga Paz.'], ['«Hay otras prioridades», respondió el alcalde.'], ['A mi modo de ver, sin agua no hay ninguna.']], pista: 'Alguno no va ahí. Busca el verbo o la marca junto a cada idea.' }, 'La marca manda: sin ella, la idea sería del autor.')],
  ['La trampa de la voz',
    xpMira('hoja', 'Segunda idea: el examen pone en boca de uno lo que dijo **otro**.', { letras: ['1', '2', 'a', 'b'], paras: [['Ruiz afirma que el tren es caro.'], ['Creo, en cambio, que es caro no tenerlo.'], ['El autor dice que el tren es caro.'], ['Ruiz dice que el tren es caro.']] }, [
      ['Dos voces: la de Ruiz y la de quien escribe.', { luz: [0, 1] }],
      ['La opción a: la idea está en el texto…', { luz: [0, 2] }],
      ['…pero no es del autor. Es falsa, aunque suene conocida.', { luz: [2], tacha: [2] }],
      ['La opción b le da la idea a su dueño.', { luz: [0, 3], nota: { 3: 'bien atribuida' } }],
      ['«Creo» es del autor: él piensa otra cosa.', { luz: [1] }],
      ['Por eso se revisan dos cosas: qué se dice y quién.', {}],
    ], 'No basta con que la idea esté: tiene que ser de quien dice la opción.'),
    xpHaz('hoja', 'Subraya la oración que podrías atribuir al **autor**.', { modo: 'toca', meta: [2], paras: [['Los taxistas alegan que perderán pasajeros.', 'Según un informe, hay menos trancones.'], ['Pienso que la ciudad gana tiempo para todos.', '«Ya era hora», comentó una ciclista.']], pista: 'Esa es de otra voz: mira «alegan», «según» o las comillas.' }, '«Pienso», «creo» y «a mi juicio» son del autor.')],
  ['Quién va antes y quién después',
    xpMira('hoja', 'Tercera idea: las **fechas** y las palabras que retoman ordenan lo que pasó.', { paras: [['En 2010 abrió la panadería.'], ['Dos años después llegó Luis,', 'el panadero de las trenzas.'], ['En 2015, Luis abrió la suya,', 'porque ya sabía el oficio.']] }, [
      ['Una fecha escrita es el punto de partida.', { luz: [0], nota: { 0: '2010' } }],
      ['«Dos años después» también es una fecha: 2012.', { luz: [1], nota: { 1: '2012' } }],
      ['Si un párrafo nombra a Luis como conocido, va después de presentarlo.', { luz: [2, 3] }],
      ['«Porque» dice qué trajo qué: es una cadena.', { luz: [3, 4], nota: { 2: '2015' } }],
      ['Primero aprende, después abre. La causa va antes.', { luz: [1, 3] }],
      ['Los dos puntos aclaran en qué consiste algo.', {}],
    ], 'Cuenta desde la fecha escrita; quien se menciona como conocido ya apareció; la causa va antes.'),
    xpHaz('hoja', 'Pon al margen el año de cada hecho.', { modo: 'margen', rotulos: ['2020', '2018', '2021'], meta: [1, 0, 2], paras: [['En 2018 se fundó el coro.'], ['Dos años después grabó un disco.'], ['Al año siguiente salió de gira.']], pista: 'Alguno no va ahí. Cuenta desde 2018, paso a paso.' }, '«Al año siguiente» se cuenta desde lo último que se dijo.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Según **la vecina**…» Subraya lo que dice ella y nadie más.', { modo: 'toca', meta: [3], paras: [['El parque estuvo cerrado un año.', 'La alcaldía asegura que fue por seguridad.'], ['«Fue por abandono», cuenta doña Luz, la vecina.', 'Según ella, los columpios llevaban meses rotos.'], ['Quizá las dos cosas sean ciertas.']], quietos: [2], pista: 'Esa es de otra voz. Busca a quién apunta «ella».' }, '«Según ella» retoma a la persona que se acaba de nombrar.')],
], 'Qué se dice, quién lo dice y cuándo pasó: las tres cosas se revisan.');
;
//#archivo js/explora-pu-in.js
// Preuniversitario · lectura, mundo 4 «Inferencia» (Explora): pu-in-1 a pu-in-4. Textos cortos propios.
xpLec('pu-in-1', [
  ['Leer entre líneas',
    xpMira('hoja', 'Empecemos por la idea: **inferir** es ver lo que el texto no dice, pero deja ver.', { paras: [['Cerró el paraguas', 'y se quitó los lentes llenos de vaho.', 'Dejó un charco en la entrada.']] }, [
      ['Nadie dice qué tiempo hacía.', {}],
      ['Pero hay un paraguas…', { luz: [0], sello: { 0: 'pista' } }],
      ['…unos lentes llenos de vaho…', { luz: [1], sello: { 1: 'pista' } }],
      ['…y un charco. Tres pistas para lo mismo: venía de la lluvia.', { luz: [2], sello: { 2: 'pista' } }],
      ['Eso es inferir: las pistas están en la página.', { luz: [0, 1, 2] }],
      ['El sentido de una palabra también se infiere de lo que la rodea.', {}],
    ], 'Una inferencia se apoya en pistas del texto: se puede señalar con el dedo.'),
    xpHaz('hoja', 'Subraya las **dos** pistas de que Marta **no esperaba** visita.', { modo: 'toca', meta: [1, 2], paras: [['Tocaron el timbre a las ocho.', 'Marta escondió los platos sucios.', 'Salió a abrir en pantuflas.'], ['Era su prima.', 'Traía un pan bajo el brazo.']], pista: 'Alguna de las subrayadas no muestra a Marta sorprendida. Busca lo que ella hace.' }, 'Lo que alguien hace deja ver lo que no dice.')],
  ['Inferencia o suposición',
    xpMira('hoja', 'Segunda idea: si la idea no tiene pista, es **suposición**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Iván revisa el correo cada cinco minutos y no toca el almuerzo.'], ['Está pendiente de una respuesta.'], ['Lo van a despedir.'], ['Está enamorado.']] }, [
      ['Arriba está lo que se ve.', { luz: [0] }],
      ['Que espera una respuesta se apoya en que revisa una y otra vez.', { luz: [0, 1], nota: { 1: 'inferencia' } }],
      ['Que lo van a despedir: no hay pista del trabajo.', { luz: [2], nota: { 2: 'suposición' } }],
      ['Que está enamorado: podría ser, pero lo pone uno.', { luz: [3], nota: { 3: 'suposición' } }],
      ['Que sea posible no basta: hace falta la pista.', { luz: [0] }],
    ], 'Si para sostenerla tienes que agregar algo tuyo, ya no es inferencia.'),
    xpHaz('hoja', 'Texto: «El perro duerme junto a la puerta desde que Leo viajó». **Tacha** las dos suposiciones.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['El perro espera a Leo.'], ['Leo no va a volver.'], ['El perro está apegado a Leo.'], ['Nadie más cuida al perro.']], pista: 'Alguna de las tachadas sí tiene pista: la puerta y el viaje.' }, 'La puerta es la pista: lo demás sobra.')],
  ['Gestos y cadenas',
    xpMira('hoja', 'Tercera idea: los relatos **muestran** lo que se siente y encadenan hechos.', { paras: [['Cerró la fábrica de la esquina.', 'Desde entonces,', 'la cafetería abre solo medio día.'], ['El dueño limpia mesas que ya están limpias.']] }, [
      ['Primero pasó algo: cerró la fábrica.', { luz: [0], nota: { 0: 'cadena' } }],
      ['«Desde entonces» une ese hecho con el que sigue.', { luz: [1] }],
      ['Abre menos: se deduce que tiene menos clientes.', { luz: [2] }],
      ['Y el gesto: limpia lo limpio. Está inquieto, aunque no lo diga.', { luz: [3], nota: { 1: 'gesto' } }],
      ['Un cambio también se muestra: alguien bota lo que antes guardaba.', {}],
      ['Pregunta siempre: ¿qué siente quien hace eso?', { luz: [3] }],
    ], '«Desde entonces» encadena hechos; un gesto deja ver lo que se siente.'),
    xpHaz('hoja', 'Subraya el gesto que muestra que Sofía está **nerviosa**.', { modo: 'toca', meta: [2], paras: [['Sofía llegó temprano al teatro.', 'Se sentó en la tercera fila.', 'Dobló el programa hasta volverlo un cuadrito.'], ['Había unas cien personas.', 'A las ocho se apagaron las luces.']], pista: 'Esa cuenta un hecho, pero no deja ver nervios. Busca qué hace con las manos.' }, 'Las manos hablan.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Texto: «Tomás bajó el precio dos veces y ya no canta al abrir el puesto». Subraya lo que **se infiere**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Tomás va a cerrar.'], ['A Tomás no le está yendo bien.'], ['Tomás perdió la voz.'], ['Los vecinos son tacaños.']], pista: 'Esa agrega algo que no tiene pista. Busca la que junta el precio y el canto.' }, 'Dos pistas, una inferencia.')],
], 'Pista en la página: inferencia. Sin pista: suposición. Y los gestos hablan.');

xpLec('pu-in-2', [
  ['Lo que se da por hecho',
    xpMira('hoja', 'Empecemos por la idea: un **presupuesto** es lo que la frase da por cierto sin decirlo.', { paras: [['Julia dejó de fumar.'], ['Volvió a llover.'], ['Ya es hora de que arreglen el puente.']] }, [
      ['«Dejó de fumar»: si antes no fumara, la frase no tendría sentido.', { luz: [0], nota: { 0: 'antes fumaba' } }],
      ['«Volvió a llover»: da por hecho que ya había llovido.', { luz: [1], nota: { 1: 'ya había llovido' } }],
      ['«Ya es hora»: da por hecho que no lo han arreglado.', { luz: [2], nota: { 2: 'sigue dañado' } }],
      ['Nadie lo afirma: se cuela sin discutirse.', {}],
      ['La prueba: ¿qué tiene que ser cierto para que se pueda decir así?', {}],
    ], 'Presupuesto: lo que tiene que ser cierto para que la frase tenga sentido.'),
    xpHaz('hoja', 'Pon al margen lo que da por hecho cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['antes vivía allí', 'ya había ganado', 'aún no llega'], meta: [1, 2, 0], paras: [['Ganó otra vez.'], ['Todavía la esperan.'], ['Ya no vive en el puerto.']], pista: 'Alguno no va ahí. Pregunta qué tuvo que pasar antes.' }, '«Otra vez», «todavía» y «ya no» cargan con algo de antes.')],
  ['Las palabras delatoras',
    xpMira('hoja', 'Segunda idea: hay palabras que casi siempre **cargan** un presupuesto.', { letras: ['A', 'B', 'C', 'D'], paras: [['por fin…', 'todavía…', 'ya no…'], ['otra vez…', 'volver a…', 'dejar de…'], ['Los reparan, como hacían sus abuelos.'], ['El pueblo sí sabe esperar.']] }, [
      ['«Por fin», «todavía», «ya no»: algo venía de antes.', { luz: [0, 1, 2] }],
      ['«Otra vez», «volver a», «dejar de»: se repite o se corta.', { luz: [3, 4, 5] }],
      ['Sin palabra de la lista: «como hacían sus abuelos» supone años.', { luz: [6], nota: { 2: 'comparación' } }],
      ['Y el «sí» que insiste responde a alguien que lo duda.', { luz: [7], nota: { 3: 'insiste' } }],
      ['Verbos como «saber» también: «sabe lo que vale» lo da por cierto.', {}],
      ['El examen lo dice así: da por sentado, supone, presupone.', {}],
    ], 'Busca «por fin», «todavía», «ya no», «dejar de»… y también comparaciones, un «sí» que insiste o «saber».'),
    xpHaz('hoja', 'Subraya las **dos** oraciones que dan algo por hecho.', { modo: 'toca', meta: [1, 3], paras: [['El teatro tiene cien sillas.', 'Por fin le pusieron techo.'], ['La entrada cuesta cinco mil.', 'La obra volvió a empezar tarde.']], pista: 'Alguna de las subrayadas solo informa. Busca las palabras que cargan con algo de antes.' }, '«Por fin» y «volvió a» traen historia.')],
  ['Dar por hecho no es decir',
    xpMira('hoja', 'Tercera idea: no confundas lo que **dice**, lo que **supone** y lo que no está.', { letras: ['1', 'a', 'b', 'c'], paras: [['La ludoteca dejó de cerrar los lunes.'], ['Antes cerraba los lunes.'], ['Ahora abre los lunes.'], ['Abre hasta la noche.']] }, [
      ['Arriba está la frase.', { luz: [0] }],
      ['Que ahora abre los lunes es lo que dice.', { luz: [0, 2], nota: { 2: 'lo dice' } }],
      ['Que antes cerraba lo da por hecho.', { luz: [0, 1], nota: { 1: 'lo supone' } }],
      ['Hasta qué hora: ni lo dice ni lo supone.', { luz: [3], nota: { 3: 'no está' } }],
      ['Criticar una parte tampoco es rechazarlo todo.', {}],
      ['Una razón sostiene lo que se pide; un dato suelto, no.', {}],
    ], 'Lo que dice está escrito; lo que supone, tiene que ser cierto; lo demás no está.'),
    xpHaz('hoja', 'Frase: «El coro sigue ensayando en el garaje». **Tacha** las dos que ni dice ni supone.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['El coro ya ensayaba en el garaje.'], ['El garaje es pequeño.'], ['El coro canta mal.'], ['El coro ensaya hoy en el garaje.']], pista: 'Alguna de las tachadas sale de «sigue». ¿Qué tiene que ser cierto?' }, '«Sigue» dice que ahora y supone que antes.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La paciencia de los vecinos es más corta de lo que cree el alcalde». Subraya lo que **da por sentado**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Los vecinos son pacientes.'], ['El alcalde es impaciente.'], ['El alcalde cree que tienen alguna paciencia.'], ['Los vecinos van a protestar.']], pista: 'Esa no hace falta para que la comparación tenga sentido. ¿Qué cree el alcalde?' }, 'Una comparación también presupone.')],
], 'Pregunta qué tiene que ser cierto para que se diga así: eso es lo que se da por hecho.');

xpLec('pu-in-3', [
  ['Encadenar hechos',
    xpMira('hoja', 'Empecemos por la idea: una causa **empuja** a la siguiente, como fichas de dominó.', { paras: [['Se secó la quebrada.'], ['Los molinos se quedaron sin agua.'], ['Los molineros buscaron otro oficio.'], ['El pan empezó a llegar de lejos.']] }, [
      ['Cuatro hechos. ¿Cuál empuja a cuál?', {}],
      ['Sin quebrada, los molinos se paran.', { luz: [0, 1], nota: { 0: 'empieza' } }],
      ['Sin molinos, los molineros se van a otra cosa.', { luz: [1, 2] }],
      ['Sin molineros, el pan viene de lejos.', { luz: [2, 3], nota: { 3: 'termina' } }],
      ['«Por eso», «con menos», «desde entonces» marcan la cadena.', {}],
      ['Y «porque» presenta la causa al revés: después del efecto.', {}],
    ], 'De cada hecho pregunta qué tuvo que pasar antes. «Por eso» trae el efecto; «porque», la causa.'),
    xpHaz('hoja', 'Pon al margen el lugar de cada hecho en la cadena.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['primero', 'segundo', 'tercero'], meta: [1, 2, 0], paras: [['La bodega se inundó.'], ['Se dañaron los libros.'], ['Se rompió un tubo.']], pista: 'Alguno no va ahí. ¿Qué tuvo que pasar antes de que la bodega se inundara?' }, 'El tubo, el agua, los libros.')],
  ['Después no es por',
    xpMira('hoja', 'Segunda idea: que algo pase **después** no prueba que pase **por** eso.', { paras: [['Estrenó zapatos y ganó el partido.'], ['Pintaron el puente y ese mes subió el arroz.'], ['Apagaron la estufa y se enfrió la sopa.']] }, [
      ['¿Ganó por los zapatos? Solo pasó después.', { luz: [0], nota: { 0: 'coincide' } }],
      ['¿El arroz subió por la pintura? Tampoco.', { luz: [1], nota: { 1: 'coincide' } }],
      ['¿La sopa se enfrió por apagar la estufa? Sí: eso la mantenía caliente.', { luz: [2], nota: { 2: 'causa' } }],
      ['La prueba: quita lo primero. ¿Lo segundo habría pasado igual?', {}],
      ['Si algo empezó antes, lo de después no pudo causarlo.', {}],
    ], 'Quita el primer hecho: si lo segundo pasaría igual, solo coinciden.'),
    xpHaz('hoja', 'Subraya la oración en la que hay una **causa** de verdad.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Compró un cuaderno rojo y pasó el examen.'], ['Cambió la luna y se dañó la nevera.'], ['Dejó la puerta abierta y entró el gato.'], ['Cantó un gallo y salió el sol.']], pista: 'Quita lo primero de esa: lo segundo habría pasado igual.' }, 'Con la puerta cerrada, el gato no entra.')],
  ['Nombrar no es afirmar',
    xpMira('hoja', 'Tercera idea: un texto a veces nombra una causa para **descartarla**.', { paras: [['Hay quien culpa al colegio del ruido.'], ['Pero el ruido empezó antes de que abriera.'], ['Lo que cambió fue la ruta de los camiones.']] }, [
      ['«Hay quien culpa»: no lo dice el autor, lo dicen otros.', { luz: [0], nota: { 0: 'lo que otros creen' } }],
      ['«Pero»: la desmiente. Empezó antes.', { luz: [1], nota: { 1: 'lo desmiente' } }],
      ['Y pone la causa de fondo.', { luz: [2], nota: { 2: 'la causa' } }],
      ['Una opción que culpe al colegio sería falsa, aunque esté nombrado.', { luz: [0], tacha: [0] }],
      ['Para descartarla, se señala la oración que la contradice.', { luz: [1] }],
      ['Que la ruta causó ruido se puede apoyar con hechos; un dato suelto no ayuda.', {}],
    ], '«Hay quien culpa… pero»: el autor nombra una causa para negarla.'),
    xpHaz('hoja', 'Subraya la oración con la causa que el autor **sí** acepta.', { modo: 'toca', meta: [2], paras: [['Dicen que el lago se secó por los pescadores.', 'Sin embargo, ellos se habían ido años antes.'], ['El agua se desvió para regar las fincas.', 'Hoy queda un barrizal.']], pista: 'Esa la dicen otros, la niega el autor o es la consecuencia.' }, 'Entre «dicen que» y «sin embargo», busca lo que el autor afirma.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La tienda cerró en mayo; las ventas venían cayendo desde enero, cuando abrieron la plaza». **Tacha** las dos causas que **no** sirven.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [1, 2], paras: [['La plaza le quitó clientes.'], ['Mayo es un mal mes.'], ['El cierre hizo caer las ventas.']], pista: 'Alguna de las tachadas sí encaja: mira qué pasó en enero.' }, 'Lo que pasó después (el cierre) no pudo causar lo de antes.')],
], 'Encadena hechos del texto, desconfía de lo que solo pasó después y distingue nombrar de afirmar.');

xpLec('pu-in-4', [
  ['Mostrar, no nombrar',
    xpMira('hoja', 'Empecemos por la idea: en un relato, lo que se siente casi nunca se **nombra**: se **muestra**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Estoy muy triste.'], ['Dejó su silla en el mismo sitio, aunque estorbaba.'], ['Infló el pecho al oír su nombre.'], ['Se encogió de hombros: «Ya qué».']] }, [
      ['«Estoy triste» lo nombra: no hay nada que descubrir.', { luz: [0], nota: { 0: 'lo nombra' } }],
      ['Dejar la silla de alguien que no está: nostalgia.', { luz: [1], nota: { 1: 'nostalgia' } }],
      ['Inflar el pecho: orgullo.', { luz: [2], nota: { 2: 'orgullo' } }],
      ['«Ya qué»: resignación, aceptar lo que no se puede cambiar.', { luz: [3], nota: { 3: 'resignación' } }],
      ['También están el desdén (creer algo poca cosa) y la reserva (callarlo).', {}],
    ], 'Nostalgia, orgullo, resignación, desdén, reserva: cada una deja su huella en lo que se hace.'),
    xpHaz('hoja', 'Pon al margen lo que deja ver cada gesto.', { modo: 'margen', rotulos: ['desdén', 'nostalgia', 'reserva'], meta: [1, 2, 0], paras: [['Huele cada tanto el abrigo de su abuelo.'], ['«Nada, estoy bien», dice, y cambia de tema.'], ['«Eso lo hace cualquiera», dijo sin mirar.']], pista: 'Alguno no va ahí. ¿Quién extraña, quién calla y quién desprecia?' }, 'El gesto dice lo que la persona no.')],
  ['Los motivos',
    xpMira('hoja', 'Segunda idea: el **motivo** se ve en lo que se hace y en lo que se guarda.', { paras: [['Ahorró dos años en un tarro.'], ['Compró el violín de segunda.'], ['Lo dejó en la cama de su hermana', 'sin nota.']] }, [
      ['Dos años de ahorro: algo le importa mucho.', { luz: [0] }],
      ['Un violín: ya se sabe qué quería.', { luz: [1] }],
      ['En la cama de su hermana: el motivo es ella.', { luz: [2], nota: { 2: 'lo hizo por ella' } }],
      ['Sin nota: no busca que le den las gracias.', { luz: [3] }],
      ['La respuesta se apoya en una frase, no en lo que uno sentiría.', {}],
      ['Y lo que se calla («nadie lo admite») también es pista.', {}],
    ], 'El motivo se prueba con una frase del texto, no con lo que uno habría sentido.'),
    xpHaz('hoja', 'Subraya la oración que prueba que **no valoró** el regalo.', { modo: 'toca', meta: [2], paras: [['Le regalaron un reloj de pared.', 'Era de madera y sonaba cada hora.'], ['Nunca lo sacó de la caja.', 'Un día lo pidió su vecina.']], pista: 'Esa cuenta el regalo o lo que pasó después. Busca qué hizo con él.' }, 'La prueba está en lo que hizo con él.')],
  ['Seguir el hilo del relato',
    xpMira('hoja', 'Tercera idea: para entender, hay que saber **qué ya se contó** y **a qué apunta** cada palabra.', { paras: [['Mi abuelo tenía un bote azul.'], ['En ese bote aprendí a remar.'], ['Hoy está en el patio, boca abajo.', 'Lo cubre una lona.']] }, [
      ['Se presenta el bote: «un bote».', { luz: [0], nota: { 0: 'se presenta' } }],
      ['«Ese bote» ya es conocido: va después.', { luz: [1], nota: { 1: 'se retoma' } }],
      ['«Hoy» trae el presente.', { luz: [2], nota: { 2: 'hoy' } }],
      ['«Lo cubre»: ¿qué? El bote, que está boca abajo.', { luz: [3] }],
      ['Lo que sigue ayuda: una lona cubre un bote, no un patio.', { luz: [2, 3] }],
      ['El sentido de una palabra también sale de lo que la rodea.', {}],
    ], '«Ese», «lo» y «hoy» dicen qué ya se contó; lo que sigue ayuda a decidir.'),
    xpHaz('hoja', 'Subraya aquello a lo que apunta «**lo**».', { modo: 'toca', unidos: true, quietos: [0, 2, 4, 5], meta: [1], paras: [['Guardó ', 'el sombrero', ' en ', 'la repisa', '. ', 'Cada domingo se lo pone para salir.']], pista: 'Reemplaza: ¿se pondría la repisa para salir?' }, 'Lo que sigue dice qué se puede poner uno.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la oración que deja ver que el padre está **orgulloso**.', { modo: 'toca', meta: [3], paras: [['Le entregaron el diploma a las seis.', 'El padre llegó tarde, con el uniforme puesto.'], ['«¿Y eso para qué sirve?», preguntó.', 'Esa noche lo colgó en la pared de la sala.']], pista: 'Esa cuenta lo que pasó o lo que dijo. Busca lo que hizo con el diploma.' }, 'Dijo una cosa; hizo otra. El gesto pesa más.')],
], 'Busca el gesto, señala la frase y no pongas lo que sentirías tú.');
;
//#archivo js/explora-pu-vo.js
// Preuniversitario · lectura, mundo 5 «Vocabulario en contexto» (Explora): pu-vo-1 a pu-vo-4. Textos cortos propios.
xpLec('pu-vo-1', [
  ['La prueba del reemplazo',
    xpMira('hoja', 'Empecemos por la idea: el sinónimo bueno es el que **encaja en la oración**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Presentó una propuesta sólida y la aprobaron.'], ['Presentó una propuesta dura y la aprobaron.'], ['Presentó una propuesta pesada y la aprobaron.'], ['Presentó una propuesta bien fundada y la aprobaron.']] }, [
      ['¿Qué quiere decir «sólida» aquí?', { luz: [0] }],
      ['«Dura» es un sentido de sólida, pero la oración se vuelve rara.', { luz: [1], tacha: [1] }],
      ['«Pesada»: tampoco es eso.', { luz: [2], tacha: [2] }],
      ['«Bien fundada»: por eso la aprobaron. Encaja.', { luz: [0, 3], nota: { 3: 'encaja' } }],
      ['Se reemplaza y se lee la oración entera, hasta el final.', {}],
    ], 'Reemplaza, lee la oración completa y quédate con la que dice lo mismo.'),
    xpHaz('hoja', '«Fue una respuesta **seca**: dijo no y colgó». Subraya la palabra que encaja.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['árida'], ['deshidratada'], ['cortante'], ['delgada']], pista: 'Ponla en la oración: ¿una respuesta puede ser así? Mira «dijo no y colgó».' }, 'Lo que sigue en la oración confirma el sentido.')],
  ['Verbos concretos, ideas',
    xpMira('hoja', 'Segunda idea: a veces un verbo de **cosas** se usa con **ideas**.', { paras: [['Con un dato derribó la mentira.'], ['Cocinaron el plan durante meses.'], ['El rumor apagó el entusiasmo.']] }, [
      ['Nadie tumba paredes ni prende una estufa aquí.', {}],
      ['Derribar una idea: mostrar que es falsa.', { luz: [0], nota: { 0: 'mostrar que es falsa' } }],
      ['Cocinar un plan: prepararlo con calma.', { luz: [1], nota: { 1: 'preparar con calma' } }],
      ['Apagar el entusiasmo: hacer que se acabe.', { luz: [2], nota: { 2: 'acabar' } }],
      ['Se aplica la misma prueba: reemplazar y leer.', {}],
    ], 'Piensa qué hace el verbo con una cosa y busca lo parecido con una idea.'),
    xpHaz('hoja', 'Pon al margen lo que quiere decir cada verbo.', { modo: 'margen', rotulos: ['aclarar', 'detener', 'aumentar'], meta: [1, 0, 2], paras: [['Frenó los rumores con un comunicado.'], ['Despejó las dudas de todos.'], ['El video alimentó la polémica.']], pista: 'Alguno no va ahí. ¿Qué hace un freno, qué pasa cuando se despeja, qué hace un alimento?' }, 'De la cosa a la idea.')],
  ['Ni al pie de la letra ni de más',
    xpMira('hoja', 'Tercera idea: al entender una frase, cuida **hasta dónde** llega.', { letras: ['1', 'a', 'b', 'c'], paras: [['«El coro me enseñó a oír», dice Rita.'], ['Le curó los oídos.'], ['Aprendió a prestar atención a los demás.'], ['Ahora oye todo lo que pasa en el mundo.']] }, [
      ['Rita no habla de sus oídos.', { luz: [0] }],
      ['«Le curó»: al pie de la letra, se queda corta.', { luz: [1], nota: { 1: 'corta' } }],
      ['«Todo lo que pasa en el mundo»: exagera.', { luz: [3], nota: { 3: 'de más' } }],
      ['Prestar atención a los demás: en un coro se aprende eso.', { luz: [2], nota: { 2: 'justa' } }],
      ['Y una bisagra como «porque» o «sin embargo» también ajusta lo dicho.', {}],
      ['Lo que se dice con otras palabras sigue siendo el mismo hecho.', {}],
    ], 'La justa recoge lo que el texto cuenta: ni literal ni exagerada.'),
    xpHaz('hoja', '«La montaña le bajó los humos». Subraya la versión **justa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Allá arriba no hay humo.'], ['Subirla lo volvió menos presumido.'], ['Nunca volvió a creer en sí mismo.']], pista: 'Esa la toma al pie de la letra o la exagera.' }, 'Ni el humo de verdad ni un cambio total.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Su explicación fue **clara** y hasta los más pequeños entendieron». Tacha las dos que **no** encajan.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['blanca'], ['sencilla'], ['fácil de seguir'], ['transparente como el agua del río']], pista: 'Alguna de las tachadas sí explica que los pequeños entendieran.' }, 'El final de la oración decide.')],
], 'Reemplaza, lee hasta el final y cuida hasta dónde llega.');

xpLec('pu-vo-2', [
  ['Una palabra, varios sentidos',
    xpMira('hoja', 'Empecemos por la idea: la misma palabra cambia de sentido; la **oración** elige.', { letras: ['A', 'B', 'C'], paras: [['Se le rompió la hoja del cuchillo.'], ['Cayó una hoja del árbol.'], ['Firmó la última hoja.']] }, [
      ['Tres veces «hoja». Tres cosas distintas.', {}],
      ['«Del cuchillo»: es la parte que corta.', { luz: [0], nota: { 0: 'filo' } }],
      ['«Del árbol»: es parte de una planta.', { luz: [1], nota: { 1: 'de una planta' } }],
      ['«Firmó»: es de papel.', { luz: [2], nota: { 2: 'de papel' } }],
      ['Las palabras vecinas eligen el sentido. Eso se llama polisemia.', {}],
    ], 'Mira las palabras vecinas: ellas eligen el sentido.'),
    xpHaz('hoja', 'Pon al margen qué es «**cabo**» en cada oración.', { modo: 'margen', rotulos: ['militar', 'punta de tierra', 'extremo o final'], meta: [1, 2, 0], paras: [['El barco rodeó el cabo.'], ['Al cabo de un rato volvió.'], ['El cabo saludó al sargento.']], pista: 'Alguno no va ahí. ¿Quién saluda, qué se rodea y qué llega al final?' }, 'El verbo de cada oración decide.')],
  ['El sentido más común',
    xpMira('hoja', 'Segunda idea: la opción trampa es el sentido **más común**, que no es el del texto.', { letras: ['1', 'a', 'b'], paras: [['El jurado falló a favor de la niña.'], ['El jurado se equivocó.'], ['El jurado decidió.']] }, [
      ['«Falló»: lo primero que uno piensa es «se equivocó».', { luz: [0] }],
      ['Pero «a favor de» no va con equivocarse.', { luz: [0, 1], tacha: [1] }],
      ['Fallar, en un jurado, es decidir.', { luz: [0, 2], nota: { 2: 'encaja' } }],
      ['El sentido más común es la trampa favorita.', {}],
      ['Desconfía de la primera que se te ocurra y haz la prueba.', {}],
    ], 'El sentido más común suele ser la trampa: pruébalo en la oración.'),
    xpHaz('hoja', '«El actor hizo un **papel** difícil». Subraya el sentido que tiene ahí.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['hoja para escribir'], ['documento'], ['billete'], ['personaje']], pista: 'Esa es otra clase de papel. ¿Qué hace un actor?' }, 'Quién lo hace también elige el sentido.')],
  ['Lo que retoma y lo que aclara',
    xpMira('hoja', 'Tercera idea: para entender, mira también qué **retoma** cada palabra y qué hace cada **signo**.', { paras: [['El pueblo hizo una minga:', 'todos pusieron un día de trabajo.'], ['Con ese esfuerzo,', 'abrieron el camino.'], ['Los dueños de la finca,', 'que viven lejos,', 'no ayudaron; nadie contó con ellos.']] }, [
      ['Los dos puntos aclaran qué es una minga.', { luz: [0, 1], nota: { 0: 'aclara' } }],
      ['«Ese esfuerzo» retoma lo anterior: va después.', { luz: [2], nota: { 1: 'retoma' } }],
      ['La coma abre una aclaración que se puede quitar.', { luz: [5], nota: { 2: 'aclaración' } }],
      ['«Ellos»: los dueños, no el pueblo.', { luz: [4, 6] }],
      ['«Al cabo de», «mientras tanto» ordenan en el tiempo.', {}],
      ['Y un hecho trae otro: el esfuerzo abre el camino.', { luz: [2, 3] }],
    ], '«Ese…» retoma, los dos puntos aclaran y la coma puede abrir algo que se quita.'),
    xpHaz('hoja', 'Subraya la oración que **solo puede ir después** de otra.', { modo: 'toca', meta: [2], paras: [['Los vecinos pintaron la cancha.', 'En la cuadra viven treinta familias.'], ['Con ese arreglo volvieron los torneos.', 'Los sábados hay mercado en la plaza.']], pista: 'Esa no retoma nada con «ese». Busca la que da algo por contado.' }, '«Ese arreglo» necesita un arreglo ya contado.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«La **corriente** se fue a las ocho y prendimos velas». Tacha los dos sentidos que **no** son.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 1], paras: [['agua que corre'], ['moda de pensamiento'], ['electricidad']], pista: 'Alguna de las tachadas es justo la que obliga a prender velas.' }, 'Las velas eligieron el sentido.')],
], 'Mira las vecinas, desconfía del sentido más común y sigue lo que se retoma.');

xpLec('pu-vo-3', [
  ['No es la suma de las palabras',
    xpMira('hoja', 'Empecemos por la idea: en una **frase hecha**, el sentido no sale de sumar las palabras.', { paras: [['Pedro se durmió en los laureles.'], ['A Ana se le fueron las luces.'], ['A Luis le tomaron el pelo con la rifa.']] }, [
      ['Aquí no hay laureles, ni luces, ni pelo.', {}],
      ['Dormirse en los laureles: confiarse y dejar de esforzarse.', { luz: [0], nota: { 0: 'se confió' } }],
      ['Irse las luces: no poder pensar.', { luz: [1], nota: { 1: 'se bloqueó' } }],
      ['Tomar el pelo: burlarse de alguien.', { luz: [2], nota: { 2: 'se burlaron de él' } }],
      ['El sentido está en la situación, no en las palabras sueltas.', {}],
    ], 'No sumes las palabras: mira qué está pasando.'),
    xpHaz('hoja', 'Pon al margen lo que quiere decir cada expresión.', { modo: 'margen', rotulos: ['fingir no ver', 'acertar', 'excederse'], meta: [1, 2, 0], paras: [['Dio en el clavo: halló la falla al primer intento.'], ['Se le fue la mano: le echó sal tres veces.'], ['Hizo la vista gorda: los vio copiar y siguió de largo.']], pista: 'Alguno no va ahí. Lo que va después de los dos puntos lo explica.' }, 'Lo que sigue a los dos puntos da el sentido.')],
  ['El contexto la explica',
    xpMira('hoja', 'Segunda idea: si no conoces la expresión, **la situación** la explica.', { paras: [['Probó una llave, probó otra', 'y volvió a la primera:', 'daba palos de ciego.'], ['No decía nada;', 'su hermana le dijo: «suelte la lengua».']] }, [
      ['«Daba palos de ciego». ¿Qué será?', { luz: [2] }],
      ['Lo que pasó antes fue probar sin saber.', { luz: [0, 1], nota: { 0: 'probar sin saber' } }],
      ['«Suelte la lengua». No decía nada…', { luz: [3, 4] }],
      ['…así que soltar la lengua es hablar.', { luz: [4], nota: { 1: 'hablar' } }],
      ['No hace falta saber de dónde viene.', {}],
      ['Las comillas traen palabras exactas; sin ellas, es con otras palabras.', {}],
    ], 'Busca antes o después la situación que la explica.'),
    xpHaz('hoja', '«Sacó la mejor nota: **se lució**». Subraya lo que explica la expresión.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['brilló en la oscuridad'], ['lo hizo muy bien'], ['se cansó'], ['apagó la luz']], pista: 'Esa la toma al pie de la letra o no va con la nota.' }, 'La nota explica el lucirse.')],
  ['Exagerar para decir',
    xpMira('hoja', 'Tercera idea: muchas expresiones **exageran**. No se leen al pie de la letra.', { letras: ['A', 'B', 'C'], paras: [['Es más viejo que el agua.'], ['Me lo dijo mil veces.'], ['Caminó dos horas hasta la escuela.']] }, [
      ['Nadie es más viejo que el agua: exagera para decir «muy viejo».', { luz: [0], nota: { 0: 'exagera' } }],
      ['Nadie contó mil veces: quiere decir «muchas».', { luz: [1], nota: { 1: 'exagera' } }],
      ['Dos horas sí se caminan: al pie de la letra.', { luz: [2], nota: { 2: 'tal cual' } }],
      ['Exagerar así se llama hipérbole.', {}],
      ['La prueba: imagínalo tal cual. Si es imposible, es una manera de decir.', {}],
      ['Y lo que alguien dice deja ver su ánimo: vergüenza, desánimo, conformidad.', {}],
    ], 'Imagínalo tal cual: si es imposible, es una manera de decir.'),
    xpHaz('hoja', '**Tacha** las dos que **no** se leen al pie de la letra.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Tengo un hambre de lobo.'], ['Comí a las doce.'], ['Se me vino el mundo encima.'], ['El plato estaba frío.']], pista: 'Alguna de las tachadas sí pudo pasar tal cual.' }, 'Ni lobo ni mundo: exageraciones.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Le dieron la noticia y **se quedó de una pieza**». Subraya lo que pasó.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['No se rompió.'], ['Se alegró mucho.'], ['Se sorprendió tanto que no pudo moverse.'], ['Siguió caminando.']], pista: 'Esa la toma al pie de la letra o no va con quedarse quieto.' }, 'De una pieza, como una estatua.')],
], 'No sumes las palabras; mira la situación y prueba si es posible tal cual.');

xpLec('pu-vo-4', [
  ['Las piezas',
    xpMira('hoja', 'Empecemos por la idea: muchas palabras están hechas de **piezas** con sentido.', { letras: ['A', 'B', 'C', 'D'], paras: [['bio', 'logía'], ['in', 'vis', 'ible'], ['sub', 'marino'], ['micro', 'scopio']] }, [
      ['Bio- es vida y -logía, estudio: estudio de la vida.', { luz: [0, 1], nota: { 0: 'estudio de la vida' } }],
      ['In- niega, vis- es ver, -ible es «que se puede».', { luz: [2, 3, 4], nota: { 1: 'que no se puede ver' } }],
      ['Sub- quiere decir debajo.', { luz: [5, 6], nota: { 2: 'debajo del mar' } }],
      ['Micro- quiere decir pequeño.', { luz: [7, 8], nota: { 3: 'para ver lo pequeño' } }],
      ['Otras: anti- contra, inter- entre, foto- luz, -voro que come, -fobia rechazo, aud- oír.', {}],
      ['Una palabra nueva se parte y se arma.', {}],
    ], 'Parte la palabra: comienzo, raíz y final. Busca otras que tengan la misma pieza.'),
    xpHaz('hoja', 'Pon al margen lo que significa cada palabra.', { modo: 'margen', rotulos: ['que come hierba', 'contra el robo', 'debajo del suelo'], meta: [1, 2, 0], paras: [['antirrobo'], ['subsuelo'], ['herbívoro']], pista: 'Alguno no va ahí. Anti- es contra, sub- es debajo y -voro es que come.' }, 'Con las piezas se deduce lo que nunca se ha visto.')],
  ['Piezas que engañan',
    xpMira('hoja', 'Segunda idea: a veces la pieza **engaña**, y manda el contexto.', { letras: ['A', 'B', 'C'], paras: [['Va a rehacer la tarea.'], ['Le gusta recordar a su abuela.'], ['El regalo es para ti.']] }, [
      ['Rehacer: hacer otra vez. Aquí re- ayuda.', { luz: [0], nota: { 0: 'otra vez' } }],
      ['Recordar no es «cordar» otra vez: es traer a la memoria.', { luz: [1], nota: { 1: 'engaña' } }],
      ['Regalo no es «galo» otra vez.', { luz: [2], nota: { 2: 'engaña' } }],
      ['La prueba: quita la pieza y agrega «otra vez». ¿Dice lo mismo?', {}],
      ['Si no encaja en la oración, manda el contexto.', {}],
    ], 'Prueba la lectura por piezas en la oración; si no encaja, manda el contexto.'),
    xpHaz('hoja', '**Tacha** las dos palabras en que re- **no** es «otra vez».', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['reescribir'], ['resolver un problema'], ['rellenar el vaso'], ['respetar una regla']], pista: 'Alguna de las tachadas sí es hacer algo otra vez.' }, 'Escribir y llenar se repiten; resolver y respetar, no.')],
  ['El texto también ayuda',
    xpMira('hoja', 'Tercera idea: muchas veces el texto **traduce** la palabra difícil.', { paras: [['Es un animal nocturno:', 'sale cuando oscurece.'], ['Son insectívoros, es decir,', 'comen insectos.'], ['Podría servir de medicina;', 'en cambio, la raíz es venenosa.']] }, [
      ['Los dos puntos traducen «nocturno».', { luz: [0, 1], nota: { 0: 'traduce' } }],
      ['«Es decir» también traduce.', { luz: [2, 3], nota: { 1: 'traduce' } }],
      ['«Podría» no es «ya sirve»: cuida el verbo.', { luz: [4] }],
      ['«En cambio» compara dos cosas distintas.', { luz: [5], nota: { 2: 'compara' } }],
      ['Nombrar algo para comparar no es decir que esté ahí.', {}],
      ['Y un proceso se sigue paso a paso.', {}],
    ], '«Es decir» y los dos puntos traducen; «podría» no asegura; «en cambio» compara.'),
    xpHaz('hoja', 'Subraya el trozo que **traduce** «perenne».', { modo: 'toca', meta: [1], paras: [['Es un árbol perenne, es decir,', 'no pierde las hojas en todo el año.'], ['Crece junto al agua', 'y da una sombra fresca.']], pista: 'Ese no explica la palabra. Busca lo que va después de «es decir».' }, 'El propio texto suele dar la clave.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Una planta **fotófila** no crece bajo techo». Subraya lo que significa (foto-, luz; -fila, que ama).', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['que sale en fotos'], ['que le teme a la luz'], ['que forma filas'], ['que necesita mucha luz']], pista: 'Esa suena parecido, pero no va con las piezas ni con «bajo techo».' }, 'Piezas y contexto dicen lo mismo: ahí no hay duda.')],
], 'Parte la palabra, arma el sentido y pruébalo en la oración.');
;
//#archivo js/explora-pu-ap.js
// Preuniversitario · lectura, mundo 6 «Aplicación y analogía» (Explora): pu-ap-1 y pu-ap-2. Textos cortos propios.
xpLec('pu-ap-1', [
  ['Sacar el principio',
    xpMira('hoja', 'Empecemos por la idea: para llevar una idea a otro caso, primero se saca el **principio**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Rosa anota cada gasto; desde entonces gasta menos.'], ['Rosa tiene una libreta.'], ['Lo que se mide, mejora.'], ['Todo el que anota se vuelve rico.']] }, [
      ['Este es el caso.', { luz: [0] }],
      ['La libreta es un detalle: no sirve para otro tema.', { luz: [1], nota: { 1: 'el caso' } }],
      ['«Se vuelve rico» dice más de lo que muestra el caso.', { luz: [3], nota: { 3: 'de más' } }],
      ['«Lo que se mide, mejora»: sirve para gastos, sueño o entrenamientos.', { luz: [2], nota: { 2: 'principio' } }],
      ['El principio no nombra a Rosa ni su libreta.', { luz: [2] }],
    ], 'El principio dice lo mismo sin nombrar el caso, y no exagera.'),
    xpHaz('hoja', '«El equipo ensayó la jugada lenta cien veces; en el partido le salió rápida». Subraya el **principio**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El equipo ganó el partido.'], ['Cien es un buen número.'], ['Lo que se practica despacio sale bien deprisa.'], ['Practicar hace perfecto todo.']], pista: 'Esa se queda en el caso, agrega algo o exagera.' }, 'Sirve también para un músico o para un cirujano.')],
  ['La estructura, no el tema',
    xpMira('hoja', 'Segunda idea: el caso nuevo puede ser de **otro tema**; importa la estructura.', { letras: ['1', 'a', 'b', 'c'], paras: [['Principio: quien avisa a tiempo evita un daño mayor.'], ['El conductor llama al taller al primer ruido.'], ['La vecina cuenta que anoche llovió.'], ['Una salvavidas pita al ver la primera ola grande.']] }, [
      ['Dos piezas: avisar pronto y evitar algo peor.', { luz: [0] }],
      ['El conductor: aviso temprano y daño evitado. Cumple.', { luz: [1], nota: { 1: 'cumple' } }],
      ['La vecina cuenta algo, pero no evita nada.', { luz: [2], nota: { 2: 'no cumple' } }],
      ['La salvavidas: otro tema, la misma estructura. Cumple.', { luz: [3], nota: { 3: 'cumple' } }],
      ['Que se parezca el tema no basta; que cambie no importa.', {}],
      ['Un dato apoya la idea, la debilita o simplemente no pesa.', {}],
    ], 'Busca las piezas del principio en el caso. Si falta una, no se cumple.'),
    xpHaz('hoja', 'Principio: **repartir una carga la hace liviana**. Tacha los dos casos que **no** lo cumplen.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Diez vecinos cargan el piano.'], ['Un atleta levanta más cada mes.'], ['Cada quien estudia un capítulo y lo explica.'], ['Compran un piano más pequeño.']], pista: 'Alguna de las tachadas sí reparte algo entre varios.' }, 'Un piano o un libro: se reparte la carga.')],
  ['Del caso al límite',
    xpMira('hoja', 'Tercera idea: un texto va **del caso a la idea**, y a veces le pone un **límite**.', { paras: [['En la esquina, todos cruzan por el mismo hueco.'], ['Ponerle una reja no sirvió.'], ['La idea va más allá de esa esquina:', 'la gente busca lo fácil.'], ['Eso no quiere decir que todo se valga.']] }, [
      ['Primero presenta lo que pasa.', { luz: [0], nota: { 0: 'presenta' } }],
      ['Después cuenta lo que no funcionó.', { luz: [1], nota: { 1: 'lo que falló' } }],
      ['«Va más allá»: de ahí sale la idea general.', { luz: [2], nota: { 2: 'la idea' } }],
      ['Los dos puntos anuncian en qué consiste.', { luz: [3] }],
      ['«Eso no quiere decir»: le pone un límite.', { luz: [4], nota: { 3: 'un límite' } }],
      ['Las comillas a veces solo presentan un nombre especial.', {}],
    ], '«Va más allá» saca la idea; «eso no significa» le pone un límite.'),
    xpHaz('hoja', 'Subraya la oración que le pone un **límite** a la idea.', { modo: 'toca', meta: [3], paras: [['Los gatos eligen la caja y no la cama cara.', 'La idea sirve para muchos regalos.'], ['A veces lo sencillo gusta más.', 'Pero no todo lo barato gusta.']], pista: 'Esa cuenta el caso o dice la idea. Busca la que la frena.' }, 'Todo principio tiene un hasta dónde.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Principio: **un error visto a tiempo enseña**. Subraya el caso que lo cumple.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Esconden la nota mala.'], ['Revisan el examen y anotan en qué fallaron.'], ['El profesor no corrige.'], ['Nadie falló.']], pista: 'A ese le falta una pieza: que el error se vea o que enseñe.' }, 'Error, verlo y aprender: las tres piezas.')],
], 'Saca el principio, busca sus piezas en el caso y respeta sus límites.');

xpLec('pu-ap-2', [
  ['La misma relación',
    xpMira('hoja', 'Empecemos por la idea: en una **analogía**, la relación es la misma a los dos lados.', { letras: ['1', 'a', 'b', 'c'], paras: [['Remo es a bote como…'], ['pedal es a bicicleta'], ['agua es a río'], ['bote es a lago']] }, [
      ['Primero se dice la relación con un verbo.', { luz: [0] }],
      ['El remo mueve al bote.', { luz: [0], nota: { 0: 'mueve' } }],
      ['El pedal mueve a la bicicleta: es la misma.', { luz: [1], nota: { 1: 'mueve' } }],
      ['El agua forma el río: es otra relación.', { luz: [2], nota: { 2: 'forma' } }],
      ['El bote flota en el lago: otra, aunque haya agua.', { luz: [3], nota: { 3: 'flota en' } }],
      ['El tema parecido engaña; el verbo no.', {}],
    ], 'Di la relación con un verbo y prueba el mismo verbo al otro lado.'),
    xpHaz('hoja', '«**Llave es a puerta** como…». Subraya la que conserva la relación.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['puerta es a casa'], ['madera es a puerta'], ['contraseña es a celular'], ['ventana es a pared']], pista: 'La llave abre la puerta. ¿En esa, la primera abre la segunda?' }, 'Lo que abre y lo abierto.')],
  ['Tipos de relación',
    xpMira('hoja', 'Segunda idea: hay relaciones que se repiten mucho.', { letras: ['A', 'B', 'C', 'D'], paras: [['ladrillo y muro'], ['pincel y pintora'], ['chispa e incendio'], ['cachorro y perro']] }, [
      ['El ladrillo es parte del muro: parte y todo.', { luz: [0], nota: { 0: 'parte y todo' } }],
      ['La pintora usa el pincel: herramienta y quien la usa.', { luz: [1], nota: { 1: 'herramienta y quien la usa' } }],
      ['La chispa trae el incendio: causa y efecto.', { luz: [2], nota: { 2: 'causa y efecto' } }],
      ['El cachorro llega a ser perro: etapa y lo que llega a ser.', { luz: [3], nota: { 3: 'etapa y lo que llega a ser' } }],
      ['Antes de mirar opciones, nombra la relación.', {}],
    ], 'Parte y todo, herramienta y usuario, causa y efecto, etapa y lo que llega a ser.'),
    xpHaz('hoja', 'Pon al margen la relación de cada pareja.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['causa y efecto', 'herramienta y quien la usa', 'parte y todo'], meta: [2, 0, 1], paras: [['pétalo y flor'], ['frío y escarcha'], ['tijera y peluquero']], pista: 'Alguno no va ahí. Arma una oración corta con cada pareja.' }, 'Una oración corta dice la relación.')],
  ['Hasta dónde llega',
    xpMira('hoja', 'Tercera idea: una comparación **explica**, pero siempre tiene un **límite**.', { paras: [['La memoria es como una bodega:', 'ahí se guarda lo vivido.'], ['Así como una bodega se llena, la memoria también.'], ['Pero una bodega no cambia lo que guarda,', 'y la memoria sí.']] }, [
      ['Se presenta la comparación.', { luz: [0], nota: { 0: 'compara' } }],
      ['«Así como… también» dice en qué se parecen.', { luz: [2], nota: { 1: 'se parecen' } }],
      ['«Pero» señala en qué falla: el límite.', { luz: [3, 4], nota: { 2: 'el límite' } }],
      ['Que tenga un límite no la vuelve inútil.', {}],
      ['Una explicación avanza con «primero», «detrás», «después».', {}],
      ['Y «por eso» trae lo que resulta.', {}],
    ], '«Así como… también» dice en qué se parecen; «pero», en qué no.'),
    xpHaz('hoja', 'Subraya la oración que dice el **límite** de la comparación.', { modo: 'toca', meta: [2], paras: [['Un libro es como un viaje.', 'Los dos llevan a otra parte.'], ['Solo que del libro se puede volver en un segundo.', 'Por eso se lee en el bus.']], pista: 'Esa dice en qué se parecen o qué resulta. Busca la diferencia.' }, '«Solo que» también pone límites.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«**Borrador es a novela** como…». Tacha las dos que **no** conservan la relación.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['boceto es a pintura'], ['lápiz es a escritor'], ['plano es a edificio'], ['capítulo es a novela']], pista: 'Alguna de las tachadas sí es una etapa de lo que llega a ser.' }, 'Antes fue borrador, boceto o plano.')],
], 'Di la relación con un verbo, nómbrala y cuida el límite de la comparación.');
;
//#archivo js/explora-pu-fu.js
// Preuniversitario · lectura, mundo 7 «Fuentes y voces» (Explora): pu-fu-1 y pu-fu-2. Textos cortos propios.
xpLec('pu-fu-1', [
  ['Directa e indirecta',
    xpMira('hoja', 'Empecemos por la idea: las palabras de otro se **copian** o se **cuentan**.', { paras: [['«El mar está cansado», dice la buzo.'], ['La buzo dice que el mar está cansado.'], ['Según la buzo, el mar está cansado.'], ['Dijo que el mar estaba «como de lata».']] }, [
      ['Comillas y palabras exactas: cita directa.', { luz: [0], nota: { 0: 'directa' } }],
      ['«Dice que…»: se cuenta. Cita indirecta.', { luz: [1], nota: { 1: 'indirecta' } }],
      ['«Según…» también cuenta con otras palabras.', { luz: [2], nota: { 2: 'indirecta' } }],
      ['A veces solo se copia una expresión, dentro de la oración de otro.', { luz: [3], nota: { 3: 'solo una expresión' } }],
      ['Las comillas prometen: esto lo dijo tal cual.', {}],
    ], 'Comillas: palabras exactas. «Que» o «según»: contadas por quien escribe.'),
    xpHaz('hoja', '**Tacha** las dos citas **indirectas**.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['«Me iré al alba», anunció.'], ['Anunció que se iría al alba.'], ['«¿Y el perro?», preguntó.'], ['Según su tía, se fue temprano.']], pista: 'Alguna de las tachadas copia las palabras exactas. Mira las comillas.' }, 'Sin comillas, alguien lo cuenta a su manera.')],
  ['Quién habla y quién escribe',
    xpMira('hoja', 'Segunda idea: la voz de quien **escribe** no es la de quienes **cita**.', { paras: [['El doctor Paz sostiene que hay que dormir más.'], ['La entrenadora admite que no siempre se puede.'], ['Me parece que los dos tienen razón a medias.']] }, [
      ['«Sostiene»: es la idea del doctor.', { luz: [0], nota: { 0: 'el doctor' } }],
      ['«Admite»: la entrenadora reconoce algo que no le conviene.', { luz: [1], nota: { 1: 'la entrenadora' } }],
      ['«Me parece»: ahora habla quien escribe.', { luz: [2], nota: { 2: 'el autor' } }],
      ['Cada párrafo suele presentar a su voz en la primera oración.', {}],
      ['«Eso» puede apuntar a un hecho completo, y «su», a quien habla.', {}],
      ['Antes de atribuir una idea, busca su marca.', {}],
    ], '«Yo», «creo», «me parece», «a mi modo de ver» son de quien escribe. Lo demás tiene otro dueño.'),
    xpHaz('hoja', 'Pon al margen de quién es cada idea.', { modo: 'margen', rotulos: ['el autor', 'el panadero', 'la inspectora'], meta: [2, 1, 0], paras: [['Faltan extintores, afirma la inspectora.'], ['«Los compro el lunes», prometió el panadero.'], ['Creo que el lunes es tarde.']], pista: 'Alguno no va ahí. Busca el verbo y la primera persona.' }, 'La primera persona sin comillas es de quien escribe.')],
  ['Lo que concluye el autor',
    xpMira('hoja', 'Tercera idea: al final, el autor dice **su tesis**, y hay datos que la mueven.', { paras: [['Unos quieren más buses;', 'otros, más calles.'], ['No se trata de buses o calles,', 'sino de viajar menos.'], ['Quien trabaja cerca no necesita ni lo uno ni lo otro.']] }, [
      ['Primero, las voces que discuten.', { luz: [0, 1], nota: { 0: 'las voces' } }],
      ['«No se trata de… sino de…»: ahí está la tesis.', { luz: [2, 3], nota: { 1: 'la tesis' } }],
      ['Un dato que la favorece, la apoya.', { luz: [4], nota: { 2: 'la apoya' } }],
      ['Si un estudio dijera que nadie quiere vivir cerca, la debilitaría.', {}],
      ['El color de los buses no le haría nada.', {}],
      ['Un resumen guarda el tema, las voces y la tesis.', { luz: [2, 3] }],
    ], '«No… sino…» suele decir la tesis. Un dato la apoya, la debilita o no pesa.'),
    xpHaz('hoja', 'Tesis: «Hay que **sembrar árboles** en la avenida». Subraya el dato que la **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La sombra baja la temperatura.'], ['La avenida tiene tres carriles.'], ['Las raíces romperían el tubo del agua.'], ['A la gente le gusta caminar con sombra.']], pista: 'Ese la apoya o no le hace nada. Busca el que daría una razón para no hacerlo.' }, 'Debilitar es dar una razón en contra.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la oración con la **tesis del autor**.', { modo: 'toca', meta: [3], paras: [['«El circo educa», dice un payaso.', 'Una maestra opina que distrae.'], ['Los dos hablan de niños distintos.', 'A mi juicio, depende de qué circo se lleve.']], pista: 'Esa es de otra voz o prepara el terreno. Busca la primera persona.' }, '«A mi juicio» abre la tesis.')],
], 'Distingue lo copiado de lo contado, a quien habla de quien escribe, y busca la tesis.');

xpLec('pu-fu-2', [
  ['Tres posturas',
    xpMira('hoja', 'Empecemos por la idea: frente a un tema se está **a favor**, **en contra** o se **matiza**.', { paras: [['Sí: el tren hace falta ya.'], ['No: el tren destruirá el bosque.'], ['Sí, pero por la orilla y de noche no.']] }, [
      ['Tres voces sobre un tren.', {}],
      ['«Sí»: esta voz está a favor.', { luz: [0], nota: { 0: 'a favor' } }],
      ['«No»: esta voz está en contra.', { luz: [1], nota: { 1: 'en contra' } }],
      ['«Sí, pero»: acepta con condiciones. Matiza.', { luz: [2], nota: { 2: 'matizada' } }],
      ['Alguien puede estar a favor y aun así pedir algo: mira qué quiere al final.', {}],
      ['Y querer cerrar casi todo es estar en contra, aunque no diga «todo».', {}],
    ], 'A favor, en contra o sí, pero con condiciones.'),
    xpHaz('hoja', 'Pon al margen la postura sobre el **horario nocturno**.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['matizada', 'a favor', 'en contra'], meta: [2, 0, 1], paras: [['Nadie debería estudiar a esa hora.'], ['Está bien, si hay transporte de regreso.'], ['Es lo mejor que han hecho.']], pista: 'Alguno no va ahí. Busca el «si» que pone una condición.' }, 'La condición es la huella del matiz.')],
  ['La cita de afuera',
    xpMira('hoja', 'Segunda idea: el examen trae una **cita que no está** y pregunta qué le hace a la tesis.', { letras: ['1', 'a', 'b', 'c'], paras: [['Tesis: el mercado debe cerrar a las seis.'], ['«Después de las seis hay más robos.»'], ['«A las siete llega la mitad de los clientes.»'], ['«El mercado tiene techo de zinc.»']] }, [
      ['Se compara con la tesis, no con un detalle.', { luz: [0] }],
      ['Más robos: le da la razón. Apoya.', { luz: [0, 1], nota: { 1: 'apoya' } }],
      ['Se perderían clientes: le quita razón. Debilita.', { luz: [0, 2], nota: { 2: 'debilita' } }],
      ['El techo: habla del mercado, pero no de la hora.', { luz: [3], nota: { 3: 'no pesa' } }],
      ['Si la tesis tiene dos partes, basta con que toque una.', {}],
    ], 'Supón que la cita es cierta: ¿la tesis queda más fuerte, más débil o igual?'),
    xpHaz('hoja', 'Tesis: «Los murales del parque deben **conservarse**». Subraya la cita que **apoya**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['«Los pintaron en una noche.»'], ['«Desde que están, hay más visitantes.»'], ['«Tapan las grietas que hay que reparar.»'], ['«El parque tiene dos entradas.»']], pista: 'Esa debilita o no pesa. ¿Cuál daría una razón para dejarlos?' }, 'Apoyar es dar una razón.')],
  ['Cómo se matiza',
    xpMira('hoja', 'Tercera idea: matizar tiene **sus palabras**, y hay que leer el verbo.', { paras: [['El plan es bueno, aunque se queda corto.'], ['Reconozco que costará, pero vale la pena.'], ['Propone cobrar la entrada;', 'por eso habrá dinero para cuidar.'], ['Antes talaban; ahora guían.']] }, [
      ['«Aunque» acepta y frena.', { luz: [0], nota: { 0: 'sí, pero' } }],
      ['«Reconozco… pero» admite algo y sigue.', { luz: [1], nota: { 1: 'sí, pero' } }],
      ['«Propone» no es «hizo». Cuida el verbo.', { luz: [2] }],
      ['«Por eso» trae lo que resulta.', { luz: [3] }],
      ['De comparar «antes» con «ahora» se deduce un cambio.', { luz: [4], nota: { 3: 'se deduce' } }],
      ['«La mayor parte» no es «todo»: una opción que exagera es falsa.', {}],
    ], '«Aunque», «pero», «reconozco»: matiz. «Propone» no es «hizo» ni «la mayor parte» es «todo».'),
    xpHaz('hoja', 'Subraya la oración que **matiza**.', { modo: 'toca', meta: [2], paras: [['El festival atrae a miles.', 'Los hoteles se llenan.'], ['Es una fiesta, aunque deja mucha basura.', 'Dura tres días.']], pista: 'Esa solo informa. Busca la que acepta y frena a la vez.' }, 'Aceptar y frenar: eso es matizar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Tesis: «Las visitas al faro **necesitan guía**». Tacha las dos citas que **no** la apoyan.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['«El faro mide veinte metros.»'], ['«Sin guía, la mitad se pierde.»'], ['«Con o sin guía, todos llegan bien.»'], ['«Con guía, hay menos caídas.»']], pista: 'Alguna de las tachadas sí da una razón para llevar guía.' }, 'Una no pesa y la otra debilita.')],
], 'Ubica la postura, compara cada cita con la tesis y lee con cuidado los verbos.');
;
//#archivo js/explora-pu-cn.js
// Preuniversitario · lectura, mundo 8 «Conectores y función de partes» (Explora): pu-cn-1 y pu-cn-2. Textos cortos propios.
xpLec('pu-cn-1', [
  ['Lo que anuncia un conector',
    xpMira('hoja', 'Empecemos por la idea: un **conector** avisa qué viene.', { letras: ['A', 'B', 'C', 'D', 'E'], paras: [['Llovió; sin embargo, salimos.'], ['Llovió; por lo tanto, no salimos.'], ['Llovió. Además, hacía frío.'], ['Llevamos de todo; por ejemplo, botas.'], ['No salimos porque llovía.']] }, [
      ['«Sin embargo»: viene algo contra lo esperado. Contraste.', { luz: [0], nota: { 0: 'contraste' } }],
      ['«Por lo tanto»: viene lo que resulta. Consecuencia.', { luz: [1], nota: { 1: 'consecuencia' } }],
      ['«Además», «por otra parte»: suman.', { luz: [2], nota: { 2: 'suma' } }],
      ['«Por ejemplo»: viene un caso.', { luz: [3], nota: { 3: 'ejemplo' } }],
      ['«Porque»: viene la causa.', { luz: [4], nota: { 4: 'causa' } }],
      ['Y «en suma», «en conclusión» recogen lo dicho.', {}],
    ], 'Contraste, consecuencia, suma, ejemplo, causa y conclusión: el conector dice qué esperar.'),
    xpHaz('hoja', 'Pon al margen lo que anuncia cada conector.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['contraste', 'suma', 'consecuencia'], meta: [2, 0, 1], paras: [['Se fue la luz; por eso cerraron.'], ['Es pequeño; no obstante, cabe todo.'], ['Es barato. Asimismo, dura más.']], pista: 'Alguno no va ahí. ¿Resulta, choca o se agrega?' }, '«No obstante» contrasta y «asimismo» suma.')],
  ['Oponer y rectificar',
    xpMira('hoja', 'Segunda idea: después de un **no**, «al contrario» **rectifica**.', { letras: ['A', 'B', 'C'], paras: [['Es caro, pero dura.'], ['No es caro; al contrario, es regalado.'], ['El problema no es el ruido; es, más bien, la hora.']] }, [
      ['«Pero»: las dos ideas siguen en pie. Es caro y dura.', { luz: [0], nota: { 0: 'opone' } }],
      ['«No es caro; al contrario…»: la primera se cae.', { luz: [1] }],
      ['Se niega una y se pone otra: rectifica.', { luz: [1], nota: { 1: 'rectifica' } }],
      ['«Más bien», «antes bien» y «sino» hacen lo mismo.', { luz: [2], nota: { 2: 'rectifica' } }],
      ['La pista es el «no» de la primera parte.', {}],
      ['Por eso ahí no cabe «sin embargo»: no hay nada a qué oponerse.', {}],
    ], 'Oponer deja dos ideas en pie; rectificar niega una y pone otra en su lugar.'),
    xpHaz('hoja', 'Subraya la oración que **rectifica**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Estudió, pero no pasó.'], ['Aunque llovía, jugaron.'], ['No fue un error, sino una broma.'], ['Llegó tarde; sin embargo, entró.']], pista: 'En esa siguen en pie las dos ideas. Busca la que niega una y pone otra.' }, '«No… sino…»: el rectificador más corto.')],
  ['Lo que necesita un conector',
    xpMira('hoja', 'Tercera idea: un conector **necesita** algo antes, y lo que sigue al contraste **pesa más**.', { paras: [['Dicen que el bus es lento.', 'Sin embargo, hoy llegó primero.'], ['Las razones son dos.'], ['En primer lugar, tiene carril propio.', 'Por otra parte, no busca parqueo.']] }, [
      ['Lo que sigue a «sin embargo» suele ser lo que importa.', { luz: [1] }],
      ['«Las razones» explican algo ya dicho.', { luz: [2], nota: { 1: 'explica lo anterior' } }],
      ['«Por otra parte» solo va después de otra razón.', { luz: [3, 4], nota: { 2: 'razones' } }],
      ['«Esto no quiere decir» frena algo que se acaba de decir.', {}],
      ['Así se ordena un texto desordenado.', {}],
      ['Y frenar no es negar: se le baja el volumen.', {}],
    ], 'Cada conector pide algo antes. Después del contraste viene lo que más pesa.'),
    xpHaz('hoja', 'Subraya la oración que el autor quiere que **más pese**.', { modo: 'toca', meta: [2], paras: [['El parque es bonito y tiene árboles.', 'Los domingos se llena.'], ['Sin embargo, no hay un solo baño.', 'Lo abrieron hace un año.']], pista: 'Esa prepara el terreno o agrega un dato. ¿Qué viene después del contraste?' }, 'El contraste señala lo importante.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Estaba cansado; ___ siguió». Tacha los dos conectores que **no** sirven.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['sin embargo,'], ['por lo tanto,'], ['no obstante,'], ['por ejemplo,']], pista: 'Alguno de los tachados sí marca que seguir va contra lo esperado.' }, 'Seguir cansado va contra lo esperado: contraste.')],
], 'Pregunta qué anuncia, si opone o rectifica, y qué necesita antes.');

xpLec('pu-cn-2', [
  ['Lo que hace un párrafo',
    xpMira('hoja', 'Empecemos por la idea: cada parte **hace** algo en el argumento, y eso tiene nombre.', { paras: [['Pongamos un caso: la calle del puerto.'], ['Es verdad que había baches.'], ['Pero los baches no se arreglan con semáforos.'], ['En suma, hacía falta pavimento.']] }, [
      ['Un caso que muestra la idea: ejemplifica o ilustra.', { luz: [0], nota: { 0: 'ejemplifica' } }],
      ['«Es verdad que»: acepta algo del otro lado. Concede.', { luz: [1], nota: { 1: 'concede' } }],
      ['«Pero»: muestra que no se sostiene. Refuta o desmonta.', { luz: [2], nota: { 2: 'refuta' } }],
      ['«En suma»: recoge lo dicho. Concluye.', { luz: [3], nota: { 3: 'concluye' } }],
      ['«Es decir» traduce: dice de frente lo que quedó escondido.', {}],
      ['Las primeras palabras suelen delatar la función.', {}],
    ], 'Ejemplificar, conceder, refutar, concluir: busca la marca en el comienzo.'),
    xpHaz('hoja', 'Pon al margen qué hace cada oración.', { modo: 'margen', rotulos: ['concluye', 'concede', 'ejemplifica'], meta: [1, 2, 0], paras: [['Con razón se dice que cuesta.'], ['Por ejemplo, un pueblo vecino ahorró la mitad.'], ['En definitiva, conviene.']], pista: 'Alguno no va ahí. ¿Acepta, muestra un caso o recoge?' }, '«Con razón» acepta algo del otro lado.')],
  ['Matizar y relativizar',
    xpMira('hoja', 'Segunda idea: se **matiza** lo propio y se **relativiza** lo ajeno.', { letras: ['A', 'B'], paras: [['No digo que la música sobre;', 'digo que tape las voces.'], ['Puede que vengan más turistas,', 'pero eso dice poco del barrio.']] }, [
      ['«No digo que…»: le pone límite a su propia crítica.', { luz: [0] }],
      ['Es lo suyo: matiza.', { luz: [0, 1], nota: { 0: 'matiza lo propio' } }],
      ['«Puede que…»: acepta un dato del otro.', { luz: [2] }],
      ['«Pero eso dice poco»: le quita peso. Relativiza.', { luz: [2, 3], nota: { 1: 'relativiza lo ajeno' } }],
      ['La pregunta es: ¿de quién es la idea que se limita?', {}],
    ], '¿De quién es la idea que se limita? Propia: matiza. Ajena: relativiza.'),
    xpHaz('hoja', 'Subraya la oración que **matiza lo propio**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tal vez suban las ventas, pero importa poco.'], ['No estoy en contra de los perros, sino de que anden sueltos.'], ['Es posible que guste; eso no lo hace útil.']], pista: 'En esa se acepta algo del otro y se le quita peso. Busca dónde alguien aclara su propia postura.' }, 'Quien matiza aclara hasta dónde llega lo suyo.')],
  ['Los signos',
    xpMira('hoja', 'Tercera idea: los **signos** también hacen cosas.', { unidos: true, paras: [['Llegó el ', '«gran»', ' cambio: un semáforo.'], ['Vende frutas ', '—mango, lulo, guama—', ' en la esquina.'], ['Cualquiera puede ir ', '(si paga antes)', '.']] }, [
      ['Comillas sobre «gran»: el autor no lo cree. Son irónicas.', { luz: [1], nota: { 0: 'ironía' } }],
      ['Rayas: meten una lista de ejemplos.', { luz: [4], nota: { 1: 'ejemplos' } }],
      ['Paréntesis: guardan una condición o aclaración.', { luz: [7], nota: { 2: 'condición' } }],
      ['A veces lo que va en el paréntesis es lo más importante.', { luz: [7] }],
      ['La ironía dice bonito lo grave; la burla muestra lo ridículo.', {}],
      ['Y otras frases reconocen lo cierto o señalan un daño.', {}],
    ], 'Comillas irónicas, rayas que meten ejemplos, paréntesis que guardan condiciones.'),
    xpHaz('hoja', 'Subraya el trozo en que el autor **no cree** lo que dice la palabra.', { modo: 'toca', unidos: true, quietos: [0, 2, 4], meta: [3], paras: [['Abrieron la sede ', '(a las seis)', '. La ', '«comodidad»', ' de dos sillas para cien personas.']], pista: 'Ese aclara la hora. Busca la palabra que se contradice con lo que sigue.' }, 'Dos sillas para cien: la palabra no se sostiene.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la oración que **concede**.', { modo: 'toca', meta: [1], paras: [['El tranvía debe volver.', 'Sin duda, los rieles cuestan.'], ['Aun así, duran cincuenta años.', 'Por ejemplo, los de 1930 siguen ahí.']], pista: 'Esa defiende, responde o ilustra. Busca dónde se acepta algo en contra.' }, '«Sin duda» acepta antes de responder.')],
], 'Nombra lo que hace cada parte, pregunta de quién es la idea y lee los signos.');
;
//#archivo js/explora-pu-ag.js
// Preuniversitario · lectura, mundo 9 «Argumentación, intención y tono» (Explora): pu-ag-1 a pu-ag-3. Textos cortos propios.
xpLec('pu-ag-1', [
  ['Qué y por qué',
    xpMira('hoja', 'Empecemos por la idea: la **tesis** dice **qué** se defiende; los argumentos, **por qué**.', { paras: [['Muchos llegan con hambre a clase.'], ['Sostengo que el colegio debe dar desayuno.'], ['Quien desayuna se concentra mejor.'], ['Además, cuesta menos que repetir un año.']] }, [
      ['La primera prepara el terreno.', { luz: [0] }],
      ['«Sostengo que»: ahí está lo que se defiende. La tesis.', { luz: [1], nota: { 1: 'tesis: qué' } }],
      ['¿Por qué? Porque se concentra mejor. Argumento.', { luz: [2], nota: { 2: 'por qué' } }],
      ['¿Por qué más? Porque cuesta menos. Otro argumento.', { luz: [3], nota: { 3: 'por qué' } }],
      ['La prueba: responde «¿qué?» o responde «¿por qué?».', {}],
    ], 'Tesis: ¿qué defiende? Argumento: ¿por qué?'),
    xpHaz('hoja', 'Subraya la **tesis**.', { modo: 'toca', meta: [2], paras: [['El río pasa a dos cuadras.', 'Nadie lo mira.'], ['La ciudad debería abrir un paseo en la orilla.', 'Caminar baja el estrés.']], pista: 'Esa prepara el terreno o responde «¿por qué?».' }, 'Lo que se defiende, no las razones.')],
  ['Tipos de argumento',
    xpMira('hoja', 'Segunda idea: las razones pueden ser de **varias clases**.', { letras: ['A', 'B', 'C', 'D', 'E'], paras: [['Ocho de cada diez lo prefieren.'], ['En Tunja lo hicieron y bajó el ruido.'], ['Según la física Ana Gil, funciona.'], ['Quitar el freno no hace mejor un carro.'], ['Si hay sombra, la gente camina más.']] }, [
      ['Cifras: argumento de datos.', { luz: [0], nota: { 0: 'datos' } }],
      ['Un caso con nombre: ejemplo.', { luz: [1], nota: { 1: 'ejemplo' } }],
      ['Habla un experto: argumento de autoridad.', { luz: [2], nota: { 2: 'autoridad' } }],
      ['Una comparación con otra cosa: analogía.', { luz: [3], nota: { 3: 'analogía' } }],
      ['Una cosa trae otra: causa.', { luz: [4], nota: { 4: 'causa' } }],
    ], 'Datos, ejemplo, autoridad, analogía y causa.'),
    xpHaz('hoja', 'Pon al margen el tipo de cada argumento.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['analogía', 'datos', 'autoridad'], meta: [2, 0, 1], paras: [['Lo recomienda la pediatra Luz Rey.'], ['Una ciudad sin parques es una casa sin ventanas.'], ['El 40 % no tiene carro.']], pista: 'Alguno no va ahí. Busca un experto, una comparación y una cifra.' }, 'Cada clase tiene su huella.')],
  ['La objeción y su respuesta',
    xpMira('hoja', 'Tercera idea: un buen texto nombra lo que diría **el otro lado** y le responde.', { paras: [['Hay quien piensa que el desayuno es tarea de la casa.'], ['Algunas casas, sin duda, pueden.'], ['Las loncheras vacías de los lunes cuentan el resto.']] }, [
      ['«Se dirá que» o «Hay quien piensa»: la objeción.', { luz: [0], nota: { 0: 'objeción' } }],
      ['«Sin duda», «admito que»: concede una parte.', { luz: [1], nota: { 1: 'concesión' } }],
      ['Y responde con un hecho, sin decir «pero».', { luz: [2], nota: { 2: 'respuesta' } }],
      ['La respuesta puede refutar o quitarle peso (relativizar).', {}],
      ['Un dato apoya la tesis, la debilita o no pesa.', {}],
      ['Al final, el texto suele volver a la tesis.', {}],
    ], '«Hay quien piensa» objeta, «sin duda» concede y un hecho puede responder sin «pero».'),
    xpHaz('hoja', 'Subraya la **concesión**.', { modo: 'toca', meta: [1], paras: [['Dirán que sale caro.', 'Admito que el primer año cuesta.'], ['Desde el segundo, se paga solo.', 'Por eso hay que empezar ya.']], pista: 'Esa objeta, responde o concluye. Busca dónde acepta una parte.' }, '«Admito que» acepta una parte.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Tesis: «Hay que **cerrar al tráfico** la calle los domingos». Tacha los dos datos que **no** la apoyan.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['En otra ciudad, las ventas subieron.'], ['La calle tiene doce cuadras.'], ['Los niños juegan sin peligro.'], ['El hospital quedaría sin acceso.']], pista: 'Alguna de las tachadas sí da una razón para cerrarla.' }, 'Uno no pesa y el otro la debilita.')],
], 'Qué defiende, por qué, qué diría el otro lado y cómo se le responde.');

xpLec('pu-ag-2', [
  ['Para qué escribe',
    xpMira('hoja', 'Empecemos por la idea: la **intención** es para qué se escribe.', { letras: ['A', 'B', 'C', 'D'], paras: [['El tren sale a las seis y cuesta tres mil.'], ['Súbase al tren: llegará antes y contaminará menos.'], ['Prometieron tren y entregaron un anuncio.'], ['¿Qué perdemos cuando dejamos de esperar un tren?']] }, [
      ['Datos y ya: informar.', { luz: [0], nota: { 0: 'informar' } }],
      ['Invita a hacer algo: persuadir.', { luz: [1], nota: { 1: 'persuadir' } }],
      ['Señala un defecto: criticar.', { luz: [2], nota: { 2: 'criticar' } }],
      ['Piensa en voz alta: reflexionar.', { luz: [3], nota: { 3: 'reflexionar' } }],
      ['Los bordes ya dan una pista: una columna de humor no informa a secas.', {}],
    ], 'Informar, persuadir, criticar o reflexionar: ¿qué quiere lograr en quien lee?'),
    xpHaz('hoja', 'Pon al margen la intención de cada oración.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['criticar', 'informar', 'persuadir'], meta: [1, 2, 0], paras: [['El museo abre a las nueve.'], ['Venga: no se arrepentirá.'], ['Gastaron en la puerta lo que faltaba para los cuadros.']], pista: 'Alguno no va ahí. ¿Da un dato, invita o señala un defecto?' }, 'El mismo museo sirve para tres intenciones.')],
  ['El tono',
    xpMira('hoja', 'Segunda idea: el **tono** es la actitud, y se oye hasta en un adverbio.', { paras: [['El informe, curiosamente, se perdió.'], ['Por fortuna, había copia.'], ['Una oficina ejemplar: abre una hora al mes.'], ['Entiendo a quien se cansó de esperar.']] }, [
      ['«Curiosamente» no agrega un dato: sospecha.', { luz: [0], nota: { 0: 'sospecha' } }],
      ['«Por fortuna» muestra alivio.', { luz: [1], nota: { 1: 'alivio' } }],
      ['«Ejemplar», pero abre una hora: dice lo contrario. Ironía.', { luz: [2], nota: { 2: 'ironía' } }],
      ['Y aquí comprende: el tono cambia según de quién se habla.', { luz: [3], nota: { 3: 'comprensión' } }],
      ['La prueba: quita la palabra. Si el dato queda, solo había actitud.', {}],
    ], 'Quita el adverbio: si el dato sigue, lo que perdiste era la actitud del autor.'),
    xpHaz('hoja', 'Subraya la palabra que **solo** muestra actitud.', { modo: 'toca', unidos: true, quietos: [0, 2, 4, 6], meta: [3], paras: [['El bus pasó ', 'dos veces', ' y, ', 'lamentablemente', ', las ', 'dos', ' iba lleno.']], pista: 'Si quitas esa, se pierde un dato. Busca la que solo dice lo que le parece.' }, 'Sin «lamentablemente», el hecho queda completo.')],
  ['Comillas con intención',
    xpMira('hoja', 'Tercera idea: las **comillas** también tienen intención, y cada párrafo, una función.', { paras: [['Ofrecen viajes «sin sorpresas».'], ['En su contrato no está la palabra «devolución».'], ['No me burlo de quien compra.'], ['Antes de pagar, pregunte quién responde.']] }, [
      ['Copia la promesa y toma distancia.', { luz: [0], nota: { 0: 'con distancia' } }],
      ['Aquí muestra una palabra que falta.', { luz: [1], nota: { 1: 'lo que no dicen' } }],
      ['«No me burlo»: aclara a quién no critica.', { luz: [2], nota: { 2: 'aclara' } }],
      ['Y termina con un consejo.', { luz: [3], nota: { 3: 'aconseja' } }],
      ['Criticar un método no es burlarse de quien cae en él.', {}],
      ['La ironía se prueba: debajo del elogio hay un problema.', {}],
    ], 'Comillas que toman distancia o muestran lo que falta. Y criticar algo no es burlarse de las personas.'),
    xpHaz('hoja', 'Subraya la oración **irónica**.', { modo: 'toca', meta: [1], paras: [['El ascensor lleva un mes dañado.', 'Excelente servicio: así hacemos ejercicio.'], ['Los vecinos firmaron una carta.', 'Nadie ha respondido.']], pista: 'Esa cuenta un hecho. Busca el elogio que no puede ser en serio.' }, 'Elogiar lo dañado: dice lo contrario.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Por supuesto, el puente se cayó **otra vez**». Tacha los dos tonos que **no** tiene.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['alegre'], ['crítico'], ['neutral']], pista: 'Alguno de los tachados sí se oye en «por supuesto» y «otra vez».' }, 'Se esperaba lo peor: eso es criticar.')],
], 'Para qué escribe, con qué actitud, y de quién habla en cada frase.');

xpLec('pu-ag-3', [
  ['Comprobar o valorar',
    xpMira('hoja', 'Empecemos por la idea: un **hecho** se puede **comprobar**; una **opinión** **valora**.', { letras: ['A', 'B', 'C'], paras: [['El puente mide 80 metros.'], ['El puente es horrible.'], ['El puente se abrió en 1960.']] }, [
      ['Se puede medir: es un hecho.', { luz: [0], nota: { 0: 'hecho' } }],
      ['¿Con qué se mide lo horrible? Opinión.', { luz: [1], nota: { 1: 'opinión' } }],
      ['Hay un registro: es un hecho.', { luz: [2], nota: { 2: 'hecho' } }],
      ['«Mejor», «peor», «lamentable», «a mi juicio» suelen delatar opinión.', {}],
      ['Pero la prueba es otra: ¿se puede verificar?', {}],
    ], 'Pregunta: si alguien lo duda, ¿hay a dónde ir a mirar?'),
    xpHaz('hoja', '**Tacha** las dos opiniones.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 2], paras: [['El mercado cierra a las dos.'], ['Cerrar a las dos es absurdo.'], ['Es el mercado más acogedor.'], ['Hay cuarenta puestos.']], pista: 'Alguna de las tachadas se puede ir a comprobar.' }, 'La hora y los puestos se verifican.')],
  ['Opiniones escondidas',
    xpMira('hoja', 'Segunda idea: hay opiniones **sin** palabra que las delate, y hechos con palabras que **parecen** valorar.', { letras: ['A', 'B', 'C', 'D'], paras: [['El plan es acertado y ya es hora de aplicarlo.'], ['Nada ha unido tanto al pueblo.'], ['Es un suelo rico en hierro.'], ['Buena parte, el 45 %, vive lejos.']] }, [
      ['«Acertado», «ya es hora»: juzga y exige. Opinión.', { luz: [0], nota: { 0: 'opinión' } }],
      ['«Tanto» no se puede medir: opinión.', { luz: [1], nota: { 1: 'opinión' } }],
      ['«Rico en hierro» se mide en un laboratorio: hecho.', { luz: [2], nota: { 2: 'hecho' } }],
      ['«Buena parte», con su cifra: hecho.', { luz: [3], nota: { 3: 'hecho' } }],
      ['No mires la palabra sola: mira la oración.', {}],
      ['Y hay palabras que opinan calladas, como «mendigar» por «pedir».', {}],
    ], 'No basta la palabra: «rico en» describe y «ya es hora» opina.'),
    xpHaz('hoja', 'Subraya la oración que es un **hecho**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tienen toda la razón en protestar.'], ['Es el árbol más alto: mide veinte metros.'], ['Hace falta que alguien responda.']], pista: 'Esa juzga o exige. ¿Cuál se puede ir a medir?' }, '«Más alto», aquí, se mide en metros.')],
  ['Hechos que apoyan opiniones',
    xpMira('hoja', 'Tercera idea: los textos mezclan los dos, y un **hecho** es lo que **prueba**.', { paras: [['Prestó ocho mil juegos el año pasado.'], ['Es la ludoteca más querida.'], ['Quienes jugaban allí hoy la atienden.'], ['Ojalá la arreglen pronto.']] }, [
      ['Un dato: se puede revisar.', { luz: [0], nota: { 0: 'hecho' } }],
      ['Una valoración apoyada en ese dato.', { luz: [1], nota: { 1: 'opinión' } }],
      ['Otro hecho: prueba que formó gente.', { luz: [2], nota: { 2: 'hecho' } }],
      ['Un deseo: también es opinión.', { luz: [3], nota: { 3: 'opinión' } }],
      ['Si comparas dos cifras, también deduces hechos.', {}],
      ['Una crónica cuenta hechos y de paso opina.', {}],
    ], 'Para probar hace falta un hecho; la opinión se apoya en él.'),
    xpHaz('hoja', 'Subraya el hecho que **prueba** que el coro crece.', { modo: 'toca', meta: [2], paras: [['El coro canta precioso.', 'Todos lo admiran.'], ['Pasó de nueve a treinta voces en un año.', 'Merece una sala mejor.']], pista: 'Esa valora o desea. Busca lo que se puede contar.' }, 'Nueve y treinta: se cuentan.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya la **opinión** que no usa «mejor», «peor» ni «debería».', { modo: 'toca', meta: [3], paras: [['La feria dura tres días.', 'Vienen artesanos de ocho pueblos.'], ['El año pasado llovió dos tardes.', 'Ninguna fiesta se le compara.']], pista: 'Esa se puede verificar. ¿Cuál no tiene con qué medirse?' }, 'No hay cómo medir «ninguna se le compara».')],
], 'Verificar es la prueba. Y las palabras, solas, engañan.');
;
//#archivo js/explora-pu-dt.js
// Preuniversitario · lectura, mundo 10 «Lectura de dos textos» (Explora): pu-dt-1 y pu-dt-2. Textos cortos propios.
xpLec('pu-dt-1', [
  ['En los dos o en uno',
    xpMira('hoja', 'Empecemos por la idea: una **coincidencia** tiene que estar en **los dos** textos.', { letras: ['1', '2', 'a', 'b', 'c'], paras: [['Los patios con árboles refrescan; hay que cuidarlos.'], ['Los patios con árboles ensucian; hay que cuidarlos con turnos.'], ['Hay que cuidarlos.'], ['Refrescan.'], ['Ensucian.']] }, [
      ['Dos textos sobre lo mismo, con enfoques distintos.', { luz: [0, 1] }],
      ['«Hay que cuidarlos» está en los dos: coincidencia.', { luz: [0, 1, 2], nota: { 2: 'los dos' } }],
      ['«Refrescan» solo está en el primero.', { luz: [0, 3], nota: { 3: 'solo el 1' } }],
      ['«Ensucian», solo en el segundo.', { luz: [1, 4], nota: { 4: 'solo el 2' } }],
      ['El enfoque: uno mira lo que dan y otro lo que quitan.', {}],
    ], 'Busca cada idea en los dos. Si solo está en uno, es diferencia.'),
    xpHaz('hoja', 'Texto 1: «Leer en papel cansa menos y se recuerda más». Texto 2: «Leer en papel se recuerda más, pero pesa». Subraya la **coincidencia**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cansa menos.'], ['Se recuerda más.'], ['Pesa.']], pista: 'Esa está solo en uno. Búscala en el otro texto.' }, 'Coincidir: estar en los dos.')],
  ['Uno explica al otro',
    xpMira('hoja', 'Segunda idea: a veces un texto **explica** lo que el otro solo afirma.', { letras: ['1', 'a', 'b', 'c'], paras: [['Texto 1: los niños se duermen en la tercera clase.'], ['Texto 2: el almuerzo se sirve a las diez y da sueño.'], ['Texto 2: los niños se duermen en clase.'], ['Texto 2: las clases duran una hora.']] }, [
      ['El primero cuenta algo, pero no dice por qué.', { luz: [0] }],
      ['«El almuerzo da sueño»: esa es la causa. Lo explica.', { luz: [0, 1], nota: { 1: 'lo explica' } }],
      ['Repetir no es explicar.', { luz: [2], nota: { 2: 'repite' } }],
      ['Un dato que no toca la causa, tampoco.', { luz: [3], nota: { 3: 'no toca la causa' } }],
      ['La prueba: pon «porque» entre los dos.', { luz: [0, 1] }],
      ['Y no hace falta que los autores estén de acuerdo.', {}],
    ], 'Pon «porque» entre los dos: si tiene sentido, uno explica al otro.'),
    xpHaz('hoja', 'Texto 1: «En esa calle hay menos accidentes». Subraya lo que lo **explica**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['En esa calle casi no hay choques.'], ['La calle tiene nombre de pájaro.'], ['Allá pusieron reductores de velocidad.']], pista: 'Esa repite o no toca la causa. Prueba con «porque».' }, 'Menos accidentes porque van más despacio.')],
  ['Con qué se sostiene',
    xpMira('hoja', 'Tercera idea: también se compara **con qué** respalda cada texto lo que dice.', { paras: [['Varios estudios señalan que puede servir.'], ['Una maestra cuenta que le funcionó.'], ['Yo lo he visto en mi taller.']] }, [
      ['«Estudios», «puede»: investigación y cautela.', { luz: [0], nota: { 0: 'investigación' } }],
      ['Lo que cuenta otra persona.', { luz: [1], nota: { 1: 'lo cuenta otro' } }],
      ['«Yo», «mi taller»: experiencia propia.', { luz: [2], nota: { 2: 'experiencia del autor' } }],
      ['Es una diferencia de respaldo, no de tema.', {}],
      ['Y los textos se unen con «en cambio», «del mismo modo», «por eso».', {}],
    ], 'Investigación, lo que cuenta otro o experiencia propia: mira la persona y la cautela.'),
    xpHaz('hoja', 'Pon al margen el respaldo de cada oración.', { modo: 'margen', rotulos: ['experiencia propia', 'lo cuenta otro', 'investigación'], meta: [1, 2, 0], paras: [['Mi vecino dice que su huerta mejoró.'], ['Una encuesta a mil hogares lo confirma.'], ['En mi huerta, el abono tardó un mes.']], pista: 'Alguno no va ahí. ¿Habla «yo», habla otro o habla un estudio?' }, 'La primera persona delata la experiencia.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Texto 1: «El tren une y contamina poco». Texto 2: «El tren une, pero parte el bosque». **Tacha** las dos que no son coincidencia.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Contamina poco.'], ['Une a la gente.'], ['Parte el bosque.']], pista: 'Alguna de las tachadas sí está en los dos textos.' }, 'Solo una idea está en ambos.')],
], 'Busca en los dos, prueba con «porque» y compara los respaldos.');

xpLec('pu-dt-2', [
  ['La tesis como lente',
    xpMira('hoja', 'Empecemos por la idea: para saber qué **diría** un autor, se usa **su tesis** como lente.', { letras: ['1', 'a', 'b', 'c'], paras: [['Autora: los museos deberían ser gratis.'], ['«Cobremos solo a los turistas.»'], ['«Que entre quien quiera, sin boleta.»'], ['«Subamos la entrada.»']] }, [
      ['Esta es su tesis.', { luz: [0] }],
      ['«Sin boleta»: encaja con su tesis.', { luz: [0, 2], nota: { 2: 'lo diría' } }],
      ['«Subamos»: contradice su tesis.', { luz: [3], nota: { 3: 'no lo diría' } }],
      ['«Solo a los turistas»: tampoco; pidió gratis, sin excepción.', { luz: [1], nota: { 1: 'no lo diría' } }],
      ['No puede contradecir lo que ya dijo.', {}],
    ], 'Pon la frase frente a la tesis: si la contradice, no lo diría.'),
    xpHaz('hoja', 'Tesis: «Las tareas deben hacerse **en clase**». Subraya lo que **diría** ese autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«Más tareas para el fin de semana.»'], ['«Guarden los últimos veinte minutos para practicar aquí.»'], ['«Los papás deben ayudar por la noche.»']], pista: 'Esa manda la tarea para la casa: contradice su tesis.' }, 'Lo que diría cabe dentro de su tesis.')],
  ['Conceder, proponer, rechazar',
    xpMira('hoja', 'Segunda idea: mira qué **sostiene**, qué **concede** y qué **rechaza** cada autor.', { paras: [['El taxi es más cómodo.'], ['Por supuesto, cuesta más.'], ['Los críticos dicen que es inseguro;'], ['pero esa crítica es vieja.'], ['Propongo compartirlo.']] }, [
      ['Lo que sostiene: es idea suya.', { luz: [0], nota: { 0: 'sostiene' } }],
      ['«Por supuesto», «no niego»: lo concede. También vale como idea suya.', { luz: [1], nota: { 1: 'concede' } }],
      ['«Los críticos dicen»: no es de él.', { luz: [2], nota: { 2: 'lo dicen otros' } }],
      ['«Pero» la rechaza: no está de acuerdo.', { luz: [3], nota: { 3: 'la rechaza' } }],
      ['«Propongo»: ofrece una salida.', { luz: [4], nota: { 4: 'propone' } }],
      ['Con eso se oye su tono: tajante, conciliador, propositivo…', {}],
    ], 'Lo que concede cuenta como suyo; lo que «los críticos dicen» y él rechaza, no.'),
    xpHaz('hoja', 'Subraya la idea que **no** se le puede atribuir al autor.', { modo: 'toca', meta: [2], paras: [['El barco es lento.', 'No niego que es bonito.'], ['Hay quienes dicen que es gratis;', 'se equivocan.'], ['Propongo un puente.']], pista: 'Esa la sostiene, la concede o la propone. Busca la que dicen otros.' }, '«Hay quienes dicen» y «se equivocan»: no es suya.')],
  ['Un tercero en la discusión',
    xpMira('hoja', 'Tercera idea: alguien puede tomar ideas de los dos para **discutir con uno**.', { letras: ['1', 'a', 'b', 'c'], paras: [['Tesis del Uno: todos deben ir en bicicleta.'], ['Dos: muchos viven en lomas.'], ['Uno: admito que bajo la lluvia es difícil.'], ['Uno: la bicicleta no contamina.']] }, [
      ['Un vecino quiere argumentos contra el Uno.', { luz: [0] }],
      ['Las lomas: idea del Dos que choca. Le sirve.', { luz: [1], nota: { 1: 'le sirve' } }],
      ['La lluvia: la concede el propio Uno. También le sirve.', { luz: [2], nota: { 2: 'le sirve' } }],
      ['No contaminar favorece al Uno: no le sirve.', { luz: [3], nota: { 3: 'no le sirve' } }],
      ['Un dato apoya, debilita o no pesa frente a esa tesis.', {}],
      ['No importa de qué texto salga.', {}],
    ], 'Sirve lo que su autor sostiene o concede y choca con la tesis.'),
    xpHaz('hoja', 'Tesis del Uno: «El colegio debe empezar a las seis». **Tacha** las dos que no sirven **contra** ella.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Uno: así queda la tarde libre.'], ['Dos: a esa hora nadie se concentra.'], ['Dos: el colegio tiene dos pisos.']], pista: 'Alguna de las tachadas sí choca con empezar a las seis.' }, 'Una la favorece y otra no pesa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Autor: «Los perros deben ir **sueltos en parques cercados**». Subraya lo que diría ante «perros siempre con correa».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«De acuerdo: siempre con correa.»'], ['«Que anden sueltos por la calle.»'], ['«En un parque con cerca, la correa sobra.»']], pista: 'Esa contradice su tesis o dice más de lo que él pidió.' }, 'Ni se contradice ni exagera.')],
], 'Su tesis es el lente; lo que concede es suyo; lo que rechaza, no.');
;
//#archivo js/explora-pu-rf.js
// Preuniversitario · lectura, mundo 11 «Referencia y cohesión» (Explora): pu-rf-1 y pu-rf-2. Textos cortos propios.
xpLec('pu-rf-1', [
  ['El referente',
    xpMira('hoja', 'Empecemos por la idea: un **pronombre** reemplaza algo ya dicho, su **referente**.', { unidos: true, paras: [['Nora guardó ', 'la carta', ' en ', 'el cajón', '. Después ', 'la', ' buscó y no ', 'lo', ' pudo abrir.']] }, [
      ['«La buscó». ¿Qué buscó? Se mira hacia atrás.', { luz: [5] }],
      ['«Buscó la carta»: femenino y con sentido.', { luz: [1, 5] }],
      ['«No lo pudo abrir». Masculino: el cajón.', { luz: [3, 7] }],
      ['La prueba: reemplaza y lee toda la oración.', {}],
      ['Género y número ayudan; el sentido decide.', { luz: [1, 3] }],
    ], 'Busca hacia atrás, reemplaza y lee: si tiene sentido, ese es.'),
    xpHaz('hoja', 'Subraya el referente de «**ellos**».', { modo: 'toca', unidos: true, quietos: [1, 3, 5], meta: [2], paras: [['Las maestras', ' recibieron a ', 'los abuelos del barrio', ' en ', 'la cancha', '; ellos contaron historias.']], pista: 'Ese no concuerda: «ellos» es masculino y plural.' }, 'Masculino y plural: solo uno concuerda.')],
  ['Este y aquel',
    xpMira('hoja', 'Segunda idea: «**este**» es lo más cercano y «**aquel**», lo más lejano.', { unidos: true, paras: [['Compró ', 'un violín', ' y ', 'un tambor', '; ', 'este', ' suena fuerte, ', 'aquel', ' suena dulce.']] }, [
      ['Dos cosas nombradas en orden.', { luz: [1, 3] }],
      ['«Este»: la más cercana hacia atrás. El tambor.', { luz: [3, 5] }],
      ['«Aquel»: la más lejana. El violín.', { luz: [1, 7] }],
      ['El sentido lo confirma: el tambor suena fuerte.', { luz: [3, 5] }],
      ['«Esto último» es lo último de una lista.', {}],
      ['Y «eso» puede apuntar a un hecho completo.', {}],
    ], 'Este, el cercano; aquel, el lejano; esto último, el final de la lista.'),
    xpHaz('hoja', '«Hablaron la jueza y la testigo; **aquella** preguntó y **esta** respondió». Pon al margen quién es cada una.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['la testigo', 'la jueza'], meta: [1, 0], paras: [['aquella'], ['esta']], pista: 'Alguna no va ahí. Cuenta hacia atrás: ¿cuál está más cerca?' }, 'La jueza, primero y lejos; la testigo, cerca.')],
  ['Lo que da por contado',
    xpMira('hoja', 'Tercera idea: «**la** aplicación», «**en cambio**» o «**al día siguiente**» dan algo por contado.', { paras: [['Dos hermanas tienen un molino.'], ['La mayor madruga;', 'la menor, en cambio, trasnocha.'], ['Una tarde el molino se dañó', 'porque se partió el eje.'], ['Al día siguiente lo arreglaron juntas.']] }, [
      ['«Un molino»: se presenta.', { luz: [0], nota: { 0: 'se presenta' } }],
      ['«En cambio» se opone a lo anterior: va después.', { luz: [1, 2] }],
      ['«El molino»: ya es conocido.', { luz: [3], nota: { 2: 'ya conocido' } }],
      ['«Porque»: el eje partido es la causa.', { luz: [3, 4] }],
      ['«Al día siguiente» ¿de cuál? Del daño.', { luz: [5], nota: { 3: 'después' } }],
      ['Una idea del relato también se lleva a otros casos: se buscan sus piezas.', {}],
    ], '«Un» presenta, «el» retoma; «en cambio» y «al día siguiente» van después de algo.'),
    xpHaz('hoja', 'Subraya la oración que **no puede ir de primera**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un pescador encontró una botella.'], ['El pescador, en cambio, no quiso abrirla.'], ['En el puerto vive una niña curiosa.']], pista: 'Esa presenta a alguien: puede abrir el relato. Busca la que da algo por contado.' }, '«El» y «en cambio» piden algo antes.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Subraya aquello a lo que apunta «**eso**».', { modo: 'toca', unidos: true, quietos: [0, 2, 4], meta: [3], paras: [['Cuentan que ', 'el capitán', ' ', 'regaló su barco', '; eso nadie lo esperaba.']], pista: 'Ese es una persona. ¿Qué fue lo que nadie esperaba?' }, '«Eso» apuntó a un hecho completo.')],
], 'Hacia atrás, reemplaza y lee; este cerca, aquel lejos.');

xpLec('pu-rf-2', [
  ['Otro nombre para lo mismo',
    xpMira('hoja', 'Empecemos por la idea: para no repetir, se **sustituye** con otra palabra.', { paras: [['El gato subió al techo.'], ['El felino miró abajo.'], ['El animal no se movió.'], ['El «rey del barrio» se durmió.']] }, [
      ['Primero aparece con su nombre.', { luz: [0], nota: { 0: 'el gato' } }],
      ['«El felino» es el mismo gato, con otra palabra.', { luz: [1], nota: { 1: 'el gato' } }],
      ['«El animal» es más general: sigue siendo él.', { luz: [2], nota: { 2: 'el gato' } }],
      ['Un apodo entre comillas también.', { luz: [3], nota: { 3: 'el gato' } }],
      ['Es una sustitución: cuatro nombres, un solo gato.', {}],
    ], 'Sinónimo, palabra más general o apodo: nombres distintos para lo mismo.'),
    xpHaz('hoja', 'Pon al margen a quién nombra cada expresión: «El tren llevaba carbón para la reina».', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['el carbón', 'la reina', 'el tren'], meta: [1, 2, 0], paras: [['la soberana'], ['el largo gusano de hierro'], ['el mineral negro']], pista: 'Alguno no va ahí. ¿Cuál es una persona, cuál una máquina y cuál se quema?' }, 'Lo que se dice de cada uno lo delata.')],
  ['Lo que se calla',
    xpMira('hoja', 'Segunda idea: la **elipsis** calla lo que ya se dijo, y la **coma** guarda su lugar.', { unidos: true, paras: [['Ana estudia Medicina; Juan', ',', ' Derecho.'], ['Unos trajeron pan; otros', ',', ' queso.']] }, [
      ['«Juan, Derecho». ¿Qué falta?', { luz: [0] }],
      ['«Estudia». Ya se dijo: no se repite.', { luz: [0, 2] }],
      ['La coma ocupa su lugar.', { luz: [1] }],
      ['«Otros, queso»: falta «trajeron».', { luz: [3, 4, 5] }],
      ['Para entenderla, se busca en la primera mitad.', {}],
    ], 'Lo que falta está en la primera mitad; la coma guarda su puesto.'),
    xpHaz('hoja', '«Los lunes hay teatro; los martes, cine». Subraya lo que se **calló**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['los lunes'], ['hay'], ['teatro']], pista: 'Ponlo en vez de la coma: «los martes … cine».' }, 'Los martes hay cine.')],
  ['Contar en orden y unir',
    xpMira('hoja', 'Tercera idea: «el primero», «la segunda» se **cuentan** en el orden en que se nombró.', { unidos: true, paras: [['Tiene ', 'cabras', ', ', 'un horno', ' y ', 'una moto', '.'], ['Las primeras dan leche; el segundo, pan; la tercera lo lleva al pueblo.'], ['Por eso vive bien; sin embargo, trabaja mucho.']] }, [
      ['Tres cosas, en orden.', { luz: [1, 3, 5] }],
      ['Las primeras: las cabras, en plural.', { luz: [1, 7] }],
      ['El segundo: el horno, masculino. La tercera: la moto.', { luz: [3, 5, 7] }],
      ['«Por eso» trae lo que resulta; «sin embargo», lo que choca.', { luz: [8] }],
      ['Un «pero» necesita algo antes, y un balance va al final.', {}],
      ['Un dato apoya una tesis, la debilita o no pesa.', {}],
    ], 'Cuenta en orden y confirma con el género y el número.'),
    xpHaz('hoja', '«Sembró maíz, papa y ají; **el último** picó y **la segunda** se heló». Pon al margen qué es cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['el ají', 'la papa'], meta: [0, 1], paras: [['el último'], ['la segunda']], pista: 'Alguno no va ahí. Cuenta en orden y mira el género.' }, 'Tercero y segunda: el orden manda.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '**Tacha** las dos oraciones que **no** nombran al río.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['El río creció; la corriente rugía.'], ['El puente aguantó.'], ['El gigante marrón se llevó la cerca.'], ['Los vecinos miraban.']], pista: 'Alguna de las tachadas sí nombra al río con otras palabras.' }, '«Corriente» y «gigante marrón»: el mismo río.')],
], 'Otro nombre, un silencio o un número de orden: todos apuntan a algo ya dicho.');
;
//#archivo js/explora-pu-lf.js
// Preuniversitario · lectura, mundo 12 «Lenguaje figurado» (Explora): pu-lf-1 y pu-lf-2. Textos cortos propios.
xpLec('pu-lf-1', [
  ['Cuatro figuras',
    xpMira('hoja', 'Empecemos por la idea: una **figura** dice una cosa para hacer ver otra.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sus ojos eran dos faroles.'], ['Sus ojos brillaban como faroles.'], ['El mar susurraba su nombre.'], ['Te lo dije un millón de veces.']] }, [
      ['«Eran faroles»: dice que A es B. Metáfora.', { luz: [0], nota: { 0: 'metáfora' } }],
      ['«Como faroles»: con «como». Comparación.', { luz: [1], nota: { 1: 'comparación' } }],
      ['El mar no susurra: se le da algo humano. Personificación.', { luz: [2], nota: { 2: 'personificación' } }],
      ['Un millón de veces: exagera. Hipérbole.', { luz: [3], nota: { 3: 'hipérbole' } }],
      ['Busca «como»; si no está, mira si es, si es humano o si exagera.', {}],
    ], 'Es: metáfora. Como: comparación. Humano: personificación. Exagera: hipérbole.'),
    xpHaz('hoja', 'Pon al margen la figura de cada frase.', { modo: 'margen', letras: ['A', 'B', 'C', 'D'], rotulos: ['hipérbole', 'metáfora', 'personificación', 'comparación'], meta: [3, 2, 0, 1], paras: [['Duerme como un tronco.'], ['La luna espía por la ventana.'], ['Esperé siglos.'], ['Tu risa es un cascabel.']], pista: 'Alguno no va ahí. Busca «como», algo humano, una exageración y un «es».' }, 'Cada figura tiene su seña.')],
  ['Qué quiere decir',
    xpMira('hoja', 'Segunda idea: el examen pregunta qué **significa** la figura, no solo su nombre.', { letras: ['1', 'a', 'b', 'c'], paras: [['El pueblo se quitó el sombrero ante ella.'], ['Todos usaban sombrero.'], ['El pueblo la admiró.'], ['El pueblo la nombró reina para siempre.']] }, [
      ['No se trata de sombreros.', { luz: [0] }],
      ['«Todos usaban»: al pie de la letra.', { luz: [1], nota: { 1: 'al pie de la letra' } }],
      ['«Reina para siempre»: le agrega.', { luz: [3], nota: { 3: 'de más' } }],
      ['Quitarse el sombrero es un gesto de admiración: justa.', { luz: [0, 2], nota: { 2: 'justa' } }],
      ['Se traduce la imagen sin agregarle nada.', {}],
    ], 'Pregunta qué hay de cierto detrás de la imagen y dilo sin agregar.'),
    xpHaz('hoja', '«El invierno se quedó a vivir en la casa». Subraya lo que **quiere decir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Un señor llamado Invierno se mudó.'], ['Nadie volverá a sentir calor.'], ['En la casa hace mucho frío.']], pista: 'Esa la toma al pie de la letra o le agrega.' }, 'El frío que no se va.')],
  ['Dónde se esconde',
    xpMira('hoja', 'Tercera idea: a veces la figura va en un **inciso**, y la crónica la usa para pintar cada hora.', { paras: [['El trueno, ese viejo gruñón, despertó.'], ['Nadie duerme: la noche tiene ojos.'], ['A las seis ya se calmó.'], ['Pero quien lo oyó no lo olvida.']] }, [
      ['La coma abre otro nombre: una metáfora.', { luz: [0] }],
      ['Los dos puntos anuncian la razón, dicha con una imagen.', { luz: [1] }],
      ['«A las seis» ordena en el tiempo.', { luz: [2], nota: { 2: 'después' } }],
      ['El «Pero» cierra y vuelve al comienzo.', { luz: [3], nota: { 3: 'cierra' } }],
      ['Para resumir, las imágenes se quitan: queda lo que cambia.', {}],
    ], 'La coma puede abrir una metáfora; los dos puntos, su razón. En el resumen no van.'),
    xpHaz('hoja', 'Subraya el trozo que es **otro nombre** del faro.', { modo: 'toca', meta: [1], paras: [['El faro,', 'ese dedo de luz,', 'señala el puerto.'], ['Abajo duermen los barcos.']], pista: 'Ese no es otro nombre del faro. Busca entre las comas.' }, 'El inciso guardaba la metáfora.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '**Tacha** las dos frases que **no** tienen personificación.', { modo: 'tacha', letras: ['A', 'B', 'C', 'D'], meta: [0, 3], paras: [['El camino es largo.'], ['El reloj nos regaña.'], ['La lluvia tocó a la puerta.'], ['Corre como el viento.']], pista: 'Alguna de las tachadas le da algo humano a una cosa.' }, 'Regañar y tocar la puerta son cosas de gente.')],
], 'Nombra la figura, tradúcela y no le agregues.');

xpLec('pu-lf-2', [
  ['Decir lo contrario',
    xpMira('hoja', 'Empecemos por la idea: la **ironía** dice lo contrario de lo que se piensa, y los **hechos** la delatan.', { paras: [['Llegó con dos horas de retraso.', '«Qué puntual», le dijeron.'], ['La gotera cayó sobre el piano.', '«Qué buen gusto musical tiene.»']] }, [
      ['Un hecho: llegó tarde.', { luz: [0], nota: { 0: 'hecho y elogio' } }],
      ['«Qué puntual» choca con el hecho.', { luz: [0, 1] }],
      ['Se piensa lo contrario: es ironía.', { luz: [1] }],
      ['Aquí también: nadie elogia de verdad una gotera.', { luz: [2, 3], nota: { 1: 'hecho y elogio' } }],
      ['Compara siempre lo que se dice con lo que pasa.', {}],
    ], 'Si lo que se dice choca con lo que pasa, es ironía.'),
    xpHaz('hoja', 'Subraya la frase **irónica**.', { modo: 'toca', meta: [1], paras: [['El plato llegó frío y sin cubiertos.', '«Aquí sí saben atender.»'], ['El mesero pidió disculpas.', 'Volvimos a los diez minutos.']], pista: 'Esa cuenta un hecho. Busca el elogio que choca con él.' }, 'Frío y sin cubiertos: no saben atender.')],
  ['La ironía sutil',
    xpMira('hoja', 'Segunda idea: en un texto serio la ironía puede ser **sutil**: está en el **tono**.', { letras: ['A', 'B', 'C'], paras: [['Anunció, con aire de gran noticia, una reunión más.'], ['Cargaba el formulario como quien carga una reliquia.'], ['Llegó la «solución»: otro letrero.']] }, [
      ['No hay un hecho que la contradiga.', { luz: [0] }],
      ['Pero el tono solemne no va con algo tan pequeño.', { luz: [0], nota: { 0: 'tono solemne' } }],
      ['Comparar un formulario con una reliquia también se burla.', { luz: [1], nota: { 1: 'comparación' } }],
      ['Y unas comillas toman distancia.', { luz: [2], nota: { 2: 'comillas' } }],
      ['La pregunta: ¿el autor se lo cree o toma distancia?', {}],
    ], 'La sutil no dice lo contrario de un hecho: pone un tono que no va con el asunto.'),
    xpHaz('hoja', 'Subraya la ironía **sutil**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«Qué silencio», dijo entre los pitos.'], ['El bus pasó a las ocho.'], ['Estrenó, con la solemnidad de un presidente, su nuevo lápiz.']], pista: 'Esa dice lo contrario de un hecho o solo informa.' }, 'Demasiada solemnidad para un lápiz.')],
  ['Lo que de verdad piensa',
    xpMira('hoja', 'Tercera idea: detrás del elogio hay una **tesis escondida**.', { paras: [['Qué veloz es nuestro correo:', 'la carta tardó nueve meses.'], ['¿Para qué apurarse?', 'Las noticias también saben esperar.']] }, [
      ['«Veloz»: dale la vuelta.', { luz: [0] }],
      ['Nueve meses es un dato. Lo dice en serio.', { luz: [1], nota: { 0: 'elogio y dato' } }],
      ['La pregunta no espera respuesta: es retórica.', { luz: [2], nota: { 1: 'pregunta retórica' } }],
      ['Lo que piensa: el correo es muy lento.', { luz: [0, 1, 2, 3] }],
      ['Los datos se pesan contra esa tesis, no contra el elogio.', {}],
      ['Un inciso, como «veloces como son», también puede ser irónico.', {}],
    ], 'Dale la vuelta al elogio: ahí está la tesis. Los datos van en serio.'),
    xpHaz('hoja', '«Felicito al arquitecto: puso la puerta **a dos metros del suelo**». Subraya lo que **piensa** el autor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La puerta es hermosa.'], ['La puerta está mal puesta.'], ['El arquitecto ganó un premio.']], pista: 'Esa se queda en el elogio o agrega algo. Dale la vuelta.' }, 'El dato desarma el elogio.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '**Tacha** las dos oraciones que van **en serio**.', { modo: 'tacha', meta: [1, 3], paras: [['Bendito sea el ascensor.', 'Lleva tres meses dañado.'], ['Nos mantiene delgados y unidos.', 'Vivo en el piso doce.']], letras: ['A', 'B'], pista: 'Alguna de las tachadas es un elogio que choca con los hechos.' }, 'Los datos van en serio; el elogio, no.')],
], 'Compara con los hechos, oye el tono y dale la vuelta al elogio.');
