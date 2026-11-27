// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/distancia-justa.js
// Distancia justa (lección 1.1): con `a` fijo en la recta, colocar `b` de modo que |b − a| = d.
// Una "cuerda" entre ambos muestra la distancia en vivo; hay dos respuestas válidas (a + d y a − d).
// params = { min, max, a, d }   state = { b: entero | null }

GAMES['distancia-justa'] = (() => {
  function grade(state, params) {
    const sols = [params.a + params.d, params.a - params.d];
    const ok = state.b !== null && sols.includes(state.b);
    return { ok, solution: `$|b - (${params.a})| = ${params.d}$ se cumple con $b = ${sols[0]}$ o $b = ${sols[1]}$` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { b: null };
    let locked = false, map = null, lineY = 0, W = 0, H = 0, drag = false, bx = 0;
    const R = 14;

    function layout(w, h) {
      W = w; H = h; lineY = h * 0.6;
      map = lineMap(params.min, params.max, 26, w - 26);
      bx = st.b === null ? w / 2 : map.toPx(st.b);
    }
    const neg = s => String(s).replace(/-/g, '−');

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const ax = map.toPx(params.a);
        drawKicker(p, C, 'Coloca b para que la distancia sea', W / 2, 16, { center: true });
        p.noStroke(); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD);
        p.fill(C.ink); p.textSize(22); p.text(`|b − a| = ${params.d}`, W / 2, 28);
        // Cuerda con la distancia actual.
        if (st.b !== null) {
          const d = Math.abs(st.b - params.a), good = d === params.d;
          const col = locked ? (good ? C.ok : C.bad) : (good ? C.ok : C.brand);
          p.stroke(col); p.strokeWeight(4); p.line(ax, lineY - 34, bx, lineY - 34);
          p.line(ax, lineY - 34, ax, lineY - 16); p.line(bx, lineY - 34, bx, lineY - 16);
          drawPill(p, C, `|${neg(st.b)} − (${neg(params.a)})| = ${d}`, W / 2, lineY - 54, col, 16);
        } else {
          p.noStroke(); p.fill(C.mute); p.textSize(14); p.textAlign(p.CENTER, p.BOTTOM);
          p.text('Arrastra la ficha b sobre la recta', W / 2, lineY - 40);
        }
        // Recta con marcas enteras.
        p.stroke(C.ink); p.strokeWeight(3); p.line(map.toPx(params.min) - 6, lineY, map.toPx(params.max) + 6, lineY);
        p.textAlign(p.CENTER, p.TOP); p.textSize(12); p.textStyle(p.BOLD);
        for (let v = params.min; v <= params.max; v++) {
          p.stroke(v === 0 ? C.sun : C.ink); p.strokeWeight(v % 5 === 0 ? 2 : 1); p.line(map.toPx(v), lineY - 6, map.toPx(v), lineY + 6);
          if (v % 2 === 0) { p.noStroke(); p.fill(v === 0 ? C.N : v < 0 ? C.I : C.ink); p.text(neg(v), map.toPx(v), lineY + 12); }
        }
        if (locked) {
          // Las dos posiciones válidas, con arcos de radio d a cada lado de a.
          [params.a + params.d, params.a - params.d].forEach(v => {
            p.noStroke(); p.fill(C.ok); p.circle(map.toPx(v), lineY, 12);
            p.textAlign(p.CENTER, p.TOP); p.textSize(13); p.text(`b = ${neg(v)}`, map.toPx(v), lineY + 30);
          });
          p.noFill(); p.stroke(C.ok + '88'); p.strokeWeight(2);
          p.arc(ax, lineY, 2 * params.d * (map.toPx(1) - map.toPx(0)), 70, Math.PI, 2 * Math.PI);
        }
        // Punto a fijo.
        p.noStroke(); p.fill(C.sun); p.circle(ax, lineY, R * 1.6);   // sin halo: taparía los números de la recta
        p.fill(inkOn(C.sun, C.bg)); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text('a', ax, lineY + 1);
        // Ficha b.
        const bcol = locked ? (grade(st, params).ok ? C.ok : C.bad) : (drag ? C.ink : C.brand);
        p.noStroke(); p.fill(bcol); p.circle(bx, st.b === null ? H * 0.82 : lineY, R * 2);
        p.fill(inkOn(bcol, C.bg)); p.text('b', bx, (st.b === null ? H * 0.82 : lineY) + 1);
      };

      const by = () => (st.b === null ? H * 0.82 : lineY);
      p.mousePressed = () => {
        if (locked) return;
        if (Math.hypot(p.mouseX - bx, p.mouseY - by()) < R + 12) { drag = true; api.sfx?.tap?.(); return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        bx = p.constrain(p.mouseX, map.toPx(params.min), map.toPx(params.max));
        st.b = Math.round(map.toVal(bx));
        return false;
      };
      p.mouseReleased = () => {
        if (!drag) return;
        drag = false;
        bx = map.toPx(st.b);
        api.ready(st.b !== null);
        return false;
      };
    }, 0.85);

    return {
      loaded: m.ready,
      getState: () => ({ ...st }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/ordena-terminos.js
// Ordena los términos (lección 1.5): una expresión (en KaTeX, fuera del lienzo) y una fila de
// cajas vacías unidas por «+»; se arrastran fichas (con distractores) a las cajas en el orden
// de la expansión. Sirve para desplegar una sigma y para armar una cadena telescópica.
// params = { tex, chips: [etiqueta], order: [índices correctos], result }   state = { boxes: [índice | null] }

GAMES['ordena-terminos'] = (() => {
  // `sep` une las cajas: '+' para desplegar una suma (por defecto) o '=' para encadenar pasos.
  // La bandeja se muestra barajada (determinista) para que la respuesta no sean las primeras fichas.
  const trayOrder = p => shuffledOrder(p.chips.length, p.chips.join('|'));
  function grade(state, params) {
    const sep = params.sep || '+';
    const ok = params.order.every((j, i) => state.boxes[i] === j) && state.boxes.length === params.order.length;
    return { ok, solution: `${params.order.map(j => params.chips[j]).join(` ${sep} `)}${sep === '+' ? ` = ${params.result}` : ''}` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const n = params.order.length;
    const st = { boxes: Array.from({ length: n }, () => null) };
    let locked = false, W = 0, H = 0, boxes = [], tray = [], drag = null, caption = null;

    // La expresión va en HTML (KaTeX) arriba del lienzo.
    caption = document.createElement('div');
    caption.style.cssText = 'text-align:center;padding:4px 0 8px;font-size:18px';
    caption.innerHTML = window.tex ? tex(`$${params.tex}$`) : params.tex;
    host.appendChild(caption);

    function layout(w, h) {
      W = w; H = h;
      // Con etiquetas largas (pasos de una simplificación) van dos por fila y más anchas.
      const long = params.chips.some(c => c.length > 12), maxW = long ? 150 : 96;
      const cols = Math.min(n, long ? 2 : 3), rows = Math.ceil(n / cols), bw = Math.min(maxW, (w - 34 - (cols - 1) * 22) / cols), gap = (w - 34 - cols * bw) / Math.max(1, cols - 1);
      const top = 20, left = n > cols ? 22 : 12;
      boxes = Array.from({ length: n }, (_, i) => ({ x: left + (i % cols) * (bw + gap), y: top + Math.floor(i / cols) * 54, w: bw, h: 40 }));
      const tcols = Math.min(params.chips.length, long ? 2 : 3), tw = Math.min(maxW, (w - 24 - (tcols - 1) * 8) / tcols), tgap = (w - 24 - tcols * tw) / Math.max(1, tcols - 1), trows = Math.ceil(params.chips.length / tcols);
      tray = [];
      trayOrder(params).forEach((j, k) => { tray[j] = { x: 12 + (k % tcols) * (tw + tgap), y: h - 30 - trows * 42 + Math.floor(k / tcols) * 42, w: tw, h: 34 }; });
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const placedAt = j => st.boxes.indexOf(j);
    const ready = () => api.ready(st.boxes.every(j => j !== null));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      // Ficha con relieve (crema en la bandeja, color sol ya puesta) o casilla punteada si está vacía.
      function chip(b, label, col, fill = C.cream, dashed = false) {
        if (dashed) return drawSlot(p, C, b, 9, col === C.line ? C.mute : col);
        drawTile(p, C, b, label, { fill, r: 9, lift: 2, size: label.length > 18 ? 9 : label.length > 7 ? 11 : 14 });
      }

      const sep = params.sep || '+';
      p.draw = () => {
        p.background(C.bg);
        boxes.forEach((b, i) => {
          const j = st.boxes[i], good = j !== null && j === params.order[i];
          const col = locked ? (good ? C.ok : C.bad) : j !== null ? C.brand : C.line;
          if (j === null) chip(b, '', col, C.bg, true); else chip(b, params.chips[j], col, locked ? col : C.sun);
          // El «+» va entre cajas; si la siguiente cae en otra fila, va al inicio de esa fila.
          if (i < n - 1) { p.noStroke(); p.fill(C.mute); p.textSize(16); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); const nb = boxes[i + 1]; if (nb.y === b.y) p.text(sep, (b.x + b.w + nb.x) / 2, b.y + b.h / 2); else p.text(sep, nb.x - 11, nb.y + nb.h / 2); }
          if (locked && !good) { p.noStroke(); p.fill(C.ok); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.TOP); p.text(`→ ${params.chips[params.order[i]]}`, b.x + b.w / 2, b.y + b.h + 2); }
        });
        const last = boxes[n - 1];
        p.noStroke(); p.fill(locked ? (grade(st, params).ok ? C.ok : C.mute) : C.mute); p.textSize(14); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.CENTER);
        if (sep === '+') p.text(locked ? `= ${params.result}` : '= ?', last.x + last.w + 10, last.y + last.h / 2);
        if (!locked) params.chips.forEach((v, j) => { if (placedAt(j) < 0 && !(drag && drag.j === j)) chip(tray[j], v, C.Z); });   // bloqueado, la bandeja sobra
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.text(locked ? (grade(st, params).ok ? '¡En orden!' : 'Mira los términos en verde') : `Arrastra los términos en orden · sobran ${params.chips.length - n}`, 12, H - 22, W - 24, 20);
        if (drag) chip({ x: p.mouseX - tray[0].w / 2, y: p.mouseY - 17, w: tray[0].w, h: 34 }, params.chips[drag.j], C.brand, C.sun);
      };

      p.mousePressed = () => {
        if (locked) return;
        const i = boxes.findIndex((b, i) => st.boxes[i] !== null && inside(b, p.mouseX, p.mouseY));
        if (i >= 0) { drag = { j: st.boxes[i] }; st.boxes[i] = null; ready(); return false; }
        const j = tray.findIndex((b, j) => placedAt(j) < 0 && inside(b, p.mouseX, p.mouseY));
        if (j >= 0) { drag = { j }; return false; }
      };
      p.mouseDragged = () => (drag ? false : undefined);
      p.mouseReleased = () => {
        if (!drag) return;
        const i = boxes.findIndex(b => inside({ x: b.x - 6, y: b.y - 8, w: b.w + 12, h: b.h + 16 }, p.mouseX, p.mouseY));
        if (i >= 0) { st.boxes[i] = drag.j; api.sfx?.tap?.(); }
        drag = null;
        ready();
        return false;
      };
    }, 1.0);

    return {
      loaded: m.ready,
      getState: () => ({ boxes: [...st.boxes] }),
      lock() { locked = true; drag = null; },
      destroy: () => { caption.remove(); m.remove(); },
    };
  }

  return { grade, create, trayOrder };
})();
;
//#archivo js/games/une-parejas.js
// Une las parejas (varias lecciones): etiquetas a la izquierda y a la derecha (con distractores a
// la derecha); se arrastra desde una de la izquierda hasta su pareja. Un destino solo aguanta una
// cuerda y arrastrar desde una etiqueta ya unida la suelta. Como «une-factor», pero con textos.
// params = { left: [label], right: [label], pairs: [[i, j]] }   state = { links: [j | null] }

GAMES['une-parejas'] = (() => {
  const mateOf = (p, i) => p.pairs.find(pr => pr[0] === i)?.[1];
  // La columna derecha se muestra barajada (determinista) para que la pareja no esté «enfrente».
  const displayOrder = p => shuffledOrder(p.right.length, p.right.join('|'));

  function grade(state, params) {
    const ok = params.left.every((_, i) => state.links[i] != null && state.links[i] === mateOf(params, i));
    const solution = params.left.map((l, i) => `${l} → ${params.right[mateOf(params, i)]}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const COLS = [C.N, C.Z, C.Q, C.I, C.R, C.brand];
    const st = { links: params.left.map(() => null) };
    let locked = false, W = 0, H = 0, left = [], right = [], drag = null;

    function layout(w, h) {
      W = w; H = h;
      const n = Math.max(params.left.length, params.right.length);
      const top = 50, rowH = (h - top - 36) / n, ph = Math.max(28, Math.min(40, rowH - 8)), pw = Math.min(130, w * 0.4);
      const rowY = (k, count) => top + (k + 0.5) * rowH + ((n - count) * rowH) / 2 - ph / 2;
      left = params.left.map((_, i) => ({ x: 12, y: rowY(i, params.left.length), w: pw, h: ph }));
      right = [];
      displayOrder(params).forEach((j, k) => { right[j] = { x: w - 12 - pw, y: rowY(k, params.right.length), w: pw, h: ph }; });
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(st.links.every(j => j !== null));
    const linkedBy = j => st.links.indexOf(j);

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function pill(b, label, col, strong) {
        p.stroke(col); p.strokeWeight(strong ? 2.5 : 1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, b.h / 2);
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(label.length > 9 ? 12 : 14);
        p.text(label, b.x + b.w / 2, b.y + b.h / 2);
      }
      function rope(x0, y0, x1, y1, col) {
        p.stroke(col); p.strokeWeight(3); p.noFill();
        p.bezier(x0, y0, x0 + (x1 - x0) * 0.45, y0, x1 - (x1 - x0) * 0.45, y1, x1, y1);
        p.noStroke(); p.fill(col); p.circle(x0, y0, 9); p.circle(x1, y1, 9);
      }

      p.draw = () => {
        p.background(C.bg);
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(14);
        p.text('Une cada expresión de la izquierda con su pareja', 12, 8, W - 24, 40);
        st.links.forEach((j, i) => {
          if (j === null) return;
          const good = j === mateOf(params, i);
          rope(left[i].x + left[i].w, left[i].y + left[i].h / 2, right[j].x, right[j].y + right[j].h / 2, locked ? (good ? C.ok : C.bad) : COLS[i % COLS.length]);
        });
        if (locked) st.links.forEach((j, i) => {
          const k = mateOf(params, i);
          if (k === undefined || j === k) return;
          p.drawingContext.setLineDash([6, 5]);
          rope(left[i].x + left[i].w, left[i].y + left[i].h / 2, right[k].x, right[k].y + right[k].h / 2, C.ok);
          p.drawingContext.setLineDash([]);
        });
        if (drag) rope(left[drag.i].x + left[drag.i].w, left[drag.i].y + left[drag.i].h / 2, p.mouseX, p.mouseY, COLS[drag.i % COLS.length]);
        params.left.forEach((l, i) => {
          const j = st.links[i], good = j !== null && j === mateOf(params, i);
          pill(left[i], l, locked ? (good ? C.ok : C.bad) : j !== null || (drag && drag.i === i) ? COLS[i % COLS.length] : C.line, j !== null);
        });
        params.right.forEach((r, j) => {
          const i = linkedBy(j);
          pill(right[j], r, i >= 0 ? (locked ? (j === mateOf(params, i) ? C.ok : C.bad) : COLS[i % COLS.length]) : C.line, i >= 0);
        });
        const extra = params.right.length - params.left.length;
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.text(locked ? (grade(st, params).ok ? '¡Todas las parejas!' : 'Mira las cuerdas verdes') : `Arrastra de izquierda a derecha${extra > 0 ? ` · sobra${extra > 1 ? 'n' : ''} ${extra}` : ''}`, 12, H - 30, W - 24, 28);
      };

      p.mousePressed = () => {
        if (locked) return;
        const i = left.findIndex(b => inside(b, p.mouseX, p.mouseY));
        if (i < 0) return;
        st.links[i] = null; drag = { i }; ready();
        return false;
      };
      p.mouseDragged = () => (drag ? false : undefined);
      p.mouseReleased = () => {
        if (!drag) return;
        const j = right.findIndex(b => inside(b, p.mouseX, p.mouseY));
        if (j >= 0) { const other = linkedBy(j); if (other >= 0) st.links[other] = null; st.links[drag.i] = j; api.sfx?.tap?.(); }
        drag = null; ready();
        return false;
      };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ links: [...st.links] }),
      lock() { locked = true; drag = null; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, displayOrder };
})();
;
//#archivo js/games/semaforo-signos.js
// El semáforo de signos (cálculo, inecuaciones con productos y cocientes): una tabla con una fila por
// factor y una columna por tramo de la recta (los puntos críticos la parten). Se toca cada casilla para
// poner + o −; la fila del producto (o cociente) se calcula sola. Después se encienden los tramos que
// forman la solución y se tocan los puntos críticos para incluirlos (lleno) o no (vacío). El cero de un
// denominador nunca entra.
// params = { rounds: [{ txt, factors: [{ txt, root, s (signo del coeficiente de x), den? }], rel: '<'|'<='|'>'|'>=' }] }
// state = { rounds: [{ cells: [[±1 | 0]], picks: [bool], dots: [bool] }] }

GAMES['semaforo-signos'] = (() => {
  const signAt = (f, x) => (f.s * (x - f.root) > 0 ? 1 : -1);
  const num = v => String(v).replace('-', '−');
  const sat = (sg, rel) => (rel[0] === '<' ? sg < 0 : sg > 0);

  function truth(r) {
    const crit = r.factors.map(f => f.root).sort((a, b) => a - b);
    const n = crit.length;
    const mids = Array.from({ length: n + 1 }, (_, j) => (j === 0 ? crit[0] - 1 : j === n ? crit[n - 1] + 1 : (crit[j - 1] + crit[j]) / 2));
    const cells = r.factors.map(f => mids.map(x => signAt(f, x)));
    const product = mids.map((_, j) => cells.reduce((s, row) => s * row[j], 1));
    const picks = product.map(sg => sat(sg, r.rel));
    const dots = crit.map(c => r.rel.includes('=') && !r.factors.find(f => f.root === c).den);
    return { crit, cells, product, picks, dots };
  }

  function solutionText(r) {
    const t = truth(r), n = t.crit.length, parts = [];
    t.picks.forEach((on, j) => {
      if (!on) return;
      const lo = j === 0 ? '(−∞' : `${t.dots[j - 1] ? '[' : '('}${num(t.crit[j - 1])}`;
      const hi = j === n ? '∞)' : `${num(t.crit[j])}${t.dots[j] ? ']' : ')'}`;
      parts.push(`${lo}, ${hi}`);
    });
    return parts.join(' ∪ ') || '∅';
  }

  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function roundOk(s, r) {
    const t = truth(r);
    return !!s && same(s.cells.map(row => Array.from(row)), t.cells) && same(Array.from(s.picks), t.picks) && same(Array.from(s.dots), t.dots);
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => roundOk(state.rounds[i], r));
    return { ok, solution: params.rounds.map(r => `${r.txt}: ${solutionText(r)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = params.rounds.map(r => ({
      cells: r.factors.map(() => Array(r.factors.length + 1).fill(0)),
      picks: Array(r.factors.length + 1).fill(false),
      dots: Array(r.factors.length).fill(false),
    }));
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [];
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const LW = 78;

    function geo() {
      const r = params.rounds[cur], T = r.factors.length + 1, colW = (W - LW - 12) / T, rh = 38;
      const lineY = 104, top = 134;
      const rows = r.factors.map((_, i) => top + i * (rh + 6));
      const prodY = top + r.factors.length * (rh + 6) + 6, solY = prodY + rh + 12;
      return { r, T, colW, rh, lineY, top, rows, prodY, solY, cx: k => LW + (k + 1) * colW };
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layoutTabs(); };
      p.onResize = () => { W = size.w; H = size.h; layoutTabs(); };
      function layoutTabs() { tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 })); }
      function fit(s, x, y, sz, maxW) {
        p.textSize(sz);
        while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); }
        p.text(s, x, y);
      }
      function cell(x, y, w, h, fill, stroke, label, col) {
        p.stroke(stroke); p.strokeWeight(1.5); p.fill(fill); p.rect(x + 3, y, w - 6, h, 8);
        p.noStroke(); p.fill(col); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(20); p.text(label, x + w / 2, y + h / 2);
      }

      p.draw = () => {
        p.background(C.bg);
        const g = geo(), s = st[cur], t = truth(g.r);
        tabs.forEach((tb, i) => {
          const ok = roundOk(st[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fit(g.r.txt, W / 2, 60, 19, W - 24);

        // Recta con los tramos elegidos encendidos y los puntos críticos.
        p.stroke(C.line); p.strokeWeight(3); p.line(LW, g.lineY, W - 12, g.lineY);
        for (let j = 0; j < g.T; j++) if (s.picks[j]) {
          p.stroke(locked && s.picks[j] !== t.picks[j] ? C.bad : C.Q); p.strokeWeight(7);
          p.line(LW + j * g.colW + (j ? 0 : 4), g.lineY, LW + (j + 1) * g.colW - (j === g.T - 1 ? 4 : 0), g.lineY);
        }
        t.crit.forEach((c, k) => {
          const x = g.cx(k), wrong = locked && s.dots[k] !== t.dots[k];
          p.stroke(wrong ? C.bad : C.ink); p.strokeWeight(2.5); p.fill(s.dots[k] ? C.ink : C.bg); p.circle(x, g.lineY, 15);
          p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.BOTTOM); p.text(num(c), x, g.lineY - 11);
          p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([3, 4]); p.line(x, g.lineY + 10, x, g.solY + g.rh); p.drawingContext.setLineDash([]);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11); p.textAlign(p.LEFT, p.CENTER); p.text('puntos ● ○', 8, g.lineY);

        // Filas de los factores.
        g.r.factors.forEach((f, i) => {
          const y = g.rows[i];
          p.noStroke(); p.fill(f.den ? C.I : C.ink); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD);
          fit(f.den ? `÷ ${f.txt}` : f.txt, 8, y + g.rh / 2, 14, LW - 12);
          for (let j = 0; j < g.T; j++) {
            const v = s.cells[i][j], wrong = locked && v !== t.cells[i][j];
            cell(LW + j * g.colW, y, g.colW, g.rh, C.card, wrong ? C.bad : v ? (v > 0 ? C.Q : C.I) : C.line, v ? (v > 0 ? '+' : '−') : '·', v ? (v > 0 ? C.Q : C.I) : C.mute);
          }
        });
        // Producto (se calcula solo cuando la columna está completa).
        p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(13);
        p.text(g.r.factors.some(f => f.den) ? 'cociente' : 'producto', 8, g.prodY + g.rh / 2);
        for (let j = 0; j < g.T; j++) {
          const col = s.cells.map(row => row[j]), full = col.every(v => v);
          const v = full ? col.reduce((a, b) => a * b, 1) : 0;
          cell(LW + j * g.colW, g.prodY, g.colW, g.rh, C.bg, C.line, v ? (v > 0 ? '+' : '−') : '?', v ? (v > 0 ? C.Q : C.I) : C.mute);
        }
        // Fila de la solución: se encienden los tramos.
        p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textSize(13); p.text('solución', 8, g.solY + g.rh / 2);
        for (let j = 0; j < g.T; j++) {
          const on = s.picks[j], wrong = locked && on !== t.picks[j];
          cell(LW + j * g.colW, g.solY, g.colW, g.rh, on ? C.Q : C.card, wrong ? C.bad : on ? C.Q : C.line, on ? '✓' : '', C.bg);
        }
        if (locked && !roundOk(s, g.r)) { p.noStroke(); p.fill(C.ok); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fit(`solución: ${solutionText(g.r)}`, W / 2, H - 14, 14, W - 24); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const g = geo(), s = st[cur], t = truth(g.r), mx = p.mouseX, my = p.mouseY;
        let hit = false;
        t.crit.forEach((_, k) => { if (!hit && Math.abs(mx - g.cx(k)) < 16 && Math.abs(my - g.lineY) < 18) { s.dots[k] = !s.dots[k]; hit = true; } });
        if (!hit && mx > LW) {
          const j = Math.floor((mx - LW) / g.colW);
          if (j >= 0 && j < g.T) {
            g.rows.forEach((y, i) => { if (!hit && my >= y && my <= y + g.rh) { const v = s.cells[i][j]; s.cells[i][j] = v === 1 ? -1 : 1; hit = true; } });
            if (!hit && my >= g.solY && my <= g.solY + g.rh) { s.picks[j] = !s.picks[j]; hit = true; }
          }
        }
        if (hit) { touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean)); return false; }
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ rounds: st.map(s => ({ cells: s.cells.map(r => r.slice()), picks: s.picks.slice(), dots: s.dots.slice() })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, truth, signAt, solutionText };
})();
;
//#archivo js/games/sombra-equivalente.js
// Las dos sombras (cálculo, inecuaciones lineales): se despeja x tocando fichas de operación que se
// aplican a los DOS lados (sumar, restar, multiplicar, dividir). El signo de desigualdad es un botón: se
// voltea tocándolo. Sobre la recta hay dos sombras: la de la desigualdad original (arriba, gris) y la de la
// actual (abajo). Mientras los pasos sean válidos coinciden; si se divide entre un negativo y no se voltea
// el signo, la sombra de abajo salta al otro lado y se pinta de rojo. Meta: «x ⟂ número», equivalente.
// params = { rounds: [{ start: { a, b, rel, c, d } (a·x + b ⟂ c·x + d), chips: [{ op: '+'|'*'|'/', k, x? }], min?, max? }] }
// state = { rounds: [{ ops: [índice de ficha | 'flip'] }] }

GAMES['sombra-equivalente'] = (() => {
  const SYM = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
  const FLIP = { '<': '>', '<=': '>=', '>': '<', '>=': '<=' };
  const clean = v => { const r = Math.round(v * 1e10) / 1e10; return r === 0 ? 0 : r; };

  function frac(v) {
    v = clean(v);
    for (let d = 1; d <= 12; d++) {
      const n = Math.round(v * d);
      if (Math.abs(v * d - n) < 1e-9) {
        const sg = n < 0 ? '−' : '';
        return d === 1 ? `${sg}${Math.abs(n)}` : `${sg}${Math.abs(n)}/${d}`;
      }
    }
    return String(+v.toFixed(3)).replace('-', '−');
  }
  function side(a, b) {
    const parts = [];
    if (a !== 0) parts.push(a === 1 ? 'x' : a === -1 ? '−x' : Number.isInteger(a) ? `${frac(a)}x` : `(${frac(a)})x`);
    if (b !== 0 || a === 0) parts.push(parts.length ? `${b < 0 ? '−' : '+'} ${frac(Math.abs(b))}` : frac(b));
    return parts.join(' ');
  }
  const formText = f => `${side(f.a, f.b)} ${SYM[f.rel]} ${side(f.c, f.d)}`;

  function chipText(ch) {
    const k = Math.abs(ch.k), neg = ch.k < 0;
    if (ch.op === '+') return `${neg ? '−' : '+'}${ch.x ? (k === 1 ? '' : frac(k)) + 'x' : frac(k)}`;
    const sym = ch.op === '*' ? '×' : '÷';
    return neg ? `${sym}(−${frac(k)})` : `${sym}${frac(k)}`;
  }
  function apply(f, ch) {
    if (ch === 'flip') return { ...f, rel: FLIP[f.rel] };
    if (ch.op === '+') return ch.x ? { ...f, a: clean(f.a + ch.k), c: clean(f.c + ch.k) } : { ...f, b: clean(f.b + ch.k), d: clean(f.d + ch.k) };
    const k = ch.op === '*' ? ch.k : 1 / ch.k;
    return { a: clean(f.a * k), b: clean(f.b * k), rel: f.rel, c: clean(f.c * k), d: clean(f.d * k) };
  }
  // Conjunto solución: x ⟂ p (null si la x desaparece).
  function setOf(f) {
    const A = clean(f.a - f.c), B = clean(f.d - f.b);
    if (A === 0) return null;
    return { p: clean(B / A), rel: A > 0 ? f.rel : FLIP[f.rel] };
  }
  const replay = (r, ops) => ops.reduce((f, o) => apply(f, o === 'flip' ? 'flip' : r.chips[o]), r.start);
  const sameSet = (u, v) => !!u && !!v && Math.abs(u.p - v.p) < 1e-9 && u.rel === v.rel;
  const isolated = f => f.a === 1 && f.b === 0 && f.c === 0;
  const roundOk = (s, r) => { if (!s) return false; const f = replay(r, Array.from(s.ops)); return isolated(f) && sameSet(setOf(f), setOf(r.start)); };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => roundOk(state.rounds[i], r));
    return { ok, solution: params.rounds.map(r => { const t = setOf(r.start); return `${formText(r.start)} ⇒ x ${SYM[t.rel]} ${frac(t.p)}`; }).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ops = params.rounds.map(() => []);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], chipBoxes = [], undo = null, relBox = null;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const chips = params.rounds[cur].chips, per = Math.min(4, chips.length), cw = (W - 24 - (per - 1) * 8) / per, ch = 40, y0 = H - 112;
      chipBoxes = chips.map((_, i) => ({ x: 12 + (i % per) * (cw + 8), y: y0 + Math.floor(i / per) * (ch + 8), w: cw, h: ch }));
      undo = { x: W - 104, y: 44, w: 92, h: 30 };
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };
      function fit(s, sz, maxW) { p.textSize(sz); while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); } return sz; }
      // Sombra de un conjunto x ⟂ p sobre la recta, a la altura y.
      function shadow(set, y, col, X, lo, hi) {
        if (!set) return;
        const right = set.rel[0] === '>', px = X(Math.max(lo, Math.min(hi, set.p)));
        p.stroke(col); p.strokeWeight(9); p.strokeCap(p.ROUND);
        p.line(px, y, right ? X(hi) : X(lo), y);
        p.strokeCap(p.SQUARE);
        p.stroke(col); p.strokeWeight(2.5); p.fill(set.rel.includes('=') ? col : C.bg); p.circle(px, y, 15);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], f = replay(r, ops[cur]), target = setOf(r.start), now = setOf(f);
        const good = sameSet(now, target), done = good && isolated(f);
        tabs.forEach((tb, i) => {
          const ok = roundOk({ ops: ops[i] }, params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : ok ? C.Q : ops[i].length ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        // Deshacer.
        p.stroke(locked || !ops[cur].length ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(undo.x, undo.y, undo.w, undo.h, 8);
        p.noStroke(); p.fill(ops[cur].length && !locked ? C.ink : C.mute); p.textSize(13); p.textAlign(p.CENTER, p.CENTER); p.text('↶ deshacer', undo.x + undo.w / 2, undo.y + undo.h / 2);

        // La desigualdad actual con el signo como botón.
        const L = side(f.a, f.b), R = side(f.c, f.d), S = SYM[f.rel];
        p.textStyle(p.BOLD);
        const sz = fit(`${L}  ${S}  ${R}`, 26, W - 40);
        const wL = p.textWidth(L), wS = p.textWidth(S) + 22, wR = p.textWidth(R), total = wL + wS + wR + 16, x0 = (W - total) / 2, y = 100;
        p.noStroke(); p.fill(done ? C.ok : C.ink); p.textAlign(p.LEFT, p.CENTER); p.text(L, x0, y);
        relBox = { x: x0 + wL + 8, y: y - sz * 0.8, w: wS, h: sz * 1.6 };
        p.stroke(locked ? C.line : C.N); p.strokeWeight(2); p.fill(C.card); p.rect(relBox.x, relBox.y, relBox.w, relBox.h, 8);
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.CENTER); p.text(S, relBox.x + relBox.w / 2, y);
        p.fill(done ? C.ok : C.ink); p.textAlign(p.LEFT, p.CENTER); p.text(R, relBox.x + relBox.w + 8, y);
        p.fill(C.mute); p.textStyle(p.NORMAL); fit(`original: ${formText(r.start)}   ·   toca el signo para voltearlo`, 12, W - 24);
        p.textAlign(p.CENTER, p.CENTER); p.text(`original: ${formText(r.start)}   ·   toca el signo para voltearlo`, W / 2, 136);

        // Recta con las dos sombras.
        const lo = r.min ?? -8, hi = r.max ?? 8, X = v => 22 + (v - lo) / (hi - lo) * (W - 44), ly = 196;
        p.stroke(C.line); p.strokeWeight(2); p.line(14, ly, W - 14, ly);
        for (let v = Math.ceil(lo); v <= hi; v++) {
          p.stroke(C.line); p.strokeWeight(1); p.line(X(v), ly - 5, X(v), ly + 5);
          if (v % 2 === 0) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(10); p.textAlign(p.CENTER, p.TOP); p.text(String(v).replace('-', '−'), X(v), ly + 8); }
        }
        shadow(target, ly - 22, C.mute, X, lo, hi);
        shadow(now, ly + 30, good ? C.Q : C.bad, X, lo, hi);
        p.noStroke(); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.LEFT, p.CENTER);
        p.fill(C.mute); p.text('original', 14, ly - 36);
        p.fill(good ? C.Q : C.bad); p.text(now ? (good ? 'actual · equivalente' : 'actual · ¡otra solución!') : 'actual · sin x', 14, ly + 48);
        if (done) { p.fill(C.ok); p.textAlign(p.RIGHT, p.CENTER); p.text('¡x despejada!', W - 14, ly + 48); }

        // Fichas.
        r.chips.forEach((ch, i) => {
          const b = chipBoxes[i];
          p.stroke(locked ? C.line : ch.op === '+' ? C.Z : C.R); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fit(chipText(ch), 17, b.w - 8);
          p.text(chipText(ch), b.x + b.w / 2, b.y + b.h / 2);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11); p.textAlign(p.CENTER, p.BOTTOM);
        if (!locked) p.text('cada ficha se aplica a los dos lados', W / 2, chipBoxes[0].y - 6);
        if (locked && !roundOk({ ops: ops[cur] }, r)) { p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.CENTER); p.text(`era x ${SYM[target.rel]} ${frac(target.p)}`, W / 2, ly + 66); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        let did = false;
        if (inside(relBox, p.mouseX, p.mouseY)) { ops[cur].push('flip'); did = true; }
        else if (inside(undo, p.mouseX, p.mouseY) && ops[cur].length) { ops[cur].pop(); did = true; }
        else {
          const i = chipBoxes.findIndex(b => inside(b, p.mouseX, p.mouseY));
          if (i >= 0 && ops[cur].length < 30) { ops[cur].push(i); did = true; }
        }
        if (did) { api.sfx?.tap?.(); api.ready(ops.every(o => o.length > 0)); return false; }
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ rounds: ops.map(o => ({ ops: o.slice() })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, setOf, apply, chipText, frac, formText };
})();
;
//#archivo js/games/candado-absoluto.js
// El candado del valor absoluto (cálculo): en la recta está pintado un conjunto (un intervalo centrado o
// dos semirrectas). El candado tiene tres ruedas, centro c, símbolo (<, ≤, >, ≥) y radio r, que escriben
// |x − c| □ r. Se giran tocando ▲ / ▼ hasta que la desigualdad describa justo ese conjunto: entonces el
// candado se abre.
// params = { rounds: [{ c, rel, r }] }   state = { vals: [{ c, rel, r }] }

GAMES['candado-absoluto'] = (() => {
  const RELS = ['<', '<=', '>', '>='];
  const TEX = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' };
  const SYM = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
  const num = v => String(v);
  function texOf(v) {
    const abs = v.c === 0 ? '|x|' : v.c > 0 ? `|x - ${num(v.c)}|` : `|x + ${num(-v.c)}|`;
    return `${abs} ${TEX[v.rel]} ${num(v.r)}`;
  }
  const txtOf = v => texOf(v).replace(/\\le/, '≤').replace(/\\ge/, '≥').replace(/ - /, ' − ');
  const same = (a, b) => !!a && a.c === b.c && a.r === b.r && a.rel === b.rel;
  const WHEELS = [
    { key: 'c', step: 0.5, min: -6, max: 6, name: 'centro' },
    { key: 'rel', name: 'símbolo' },
    { key: 'r', step: 0.5, min: 0.5, max: 8, name: 'radio' },
  ];

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.vals[i], r));
    return { ok, solution: params.rounds.map(r => `$${texOf(r)}$`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette, lo = params.min ?? -10, hi = params.max ?? 10;
    const vals = params.rounds.map(() => ({ c: 0, rel: '<', r: 1 })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], wheels = [], open = 0;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const X = v => 22 + (v - lo) / (hi - lo) * (W - 44);

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const bw = Math.min(250, W - 60), bx = (W - bw) / 2, by = 210, ww = (bw - 40) / 3;
      wheels = WHEELS.map((wh, i) => {
        const x = bx + 14 + i * (ww + 6);
        return { ...wh, x, y: by + 28, w: ww, h: 92, up: { x, y: by + 28, w: ww, h: 28 }, down: { x, y: by + 92, w: ww, h: 28 } };
      });
      wheels.body = { x: bx, y: by, w: bw, h: 150 };
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };
      function fit(s, x, y, sz, maxW) { p.textSize(sz); while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); } p.text(s, x, y); }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = vals[cur], good = same(v, r);
        tabs.forEach((tb, i) => {
          const ok = same(vals[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        // El conjunto pedido (dibujado desde la combinación correcta).
        const ly = 70, inn = r.rel[0] === '<', cl = r.rel.includes('='), L = X(r.c - r.r), R = X(r.c + r.r), col = C.Z;
        p.stroke(C.line); p.strokeWeight(2); p.line(14, ly, W - 14, ly);
        for (let k = Math.ceil(lo); k <= hi; k++) {
          p.stroke(C.line); p.strokeWeight(1); p.line(X(k), ly - 4, X(k), ly + 4);
          if (k % 2 === 0) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(10); p.textAlign(p.CENTER, p.TOP); p.text(String(k).replace('-', '−'), X(k), ly + 8); }
        }
        p.stroke(col); p.strokeWeight(8);
        if (inn) p.line(L, ly, R, ly); else { p.line(14, ly, L, ly); p.line(R, ly, W - 14, ly); }
        [L, R].forEach(x => { p.stroke(col); p.strokeWeight(2.5); p.fill(cl ? col : C.bg); p.circle(x, ly, 15); });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.CENTER, p.TOP); p.text('¿qué desigualdad describe este conjunto?', W / 2, ly + 24);

        // La desigualdad que escriben las ruedas.
        p.fill(good && !locked ? C.ok : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textSize(26); fit(txtOf(v), W / 2, 124, 26, W - 24);

        // Candado: arco (se levanta cuando abre) y cuerpo con las ruedas.
        const b = wheels.body;
        open += ((good ? 1 : 0) - open) * 0.15;
        const sh = 26 * open;
        p.noFill(); p.stroke(locked ? (good ? C.ok : C.bad) : good ? C.ok : C.mute); p.strokeWeight(10);
        p.arc(b.x + b.w / 2, b.y - sh, b.w * 0.55, 70, Math.PI, 2 * Math.PI);
        p.line(b.x + b.w * 0.225, b.y - sh, b.x + b.w * 0.225, b.y + 6 - sh * 0.3);
        p.line(b.x + b.w * 0.775, b.y - sh, b.x + b.w * 0.775, b.y + 6);
        p.stroke(locked ? (good ? C.ok : C.bad) : good ? C.ok : C.N); p.strokeWeight(3); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 18);
        wheels.forEach(wh => {
          const val = v[wh.key];
          p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.bg); p.rect(wh.x, wh.y, wh.w, wh.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.Z); p.textAlign(p.CENTER, p.CENTER); p.textSize(14); p.textStyle(p.BOLD);
          p.text('▲', wh.up.x + wh.w / 2, wh.up.y + 14); p.text('▼', wh.down.x + wh.w / 2, wh.down.y + 14);
          p.fill(C.ink); p.textSize(22); p.text(wh.key === 'rel' ? SYM[val] : String(val).replace('-', '−'), wh.x + wh.w / 2, wh.y + wh.h / 2);
          p.fill(C.mute); p.textSize(11); p.text(wh.name, wh.x + wh.w / 2, wh.y + wh.h + 10);
        });
        if (good && !locked) { p.noStroke(); p.fill(C.ok); p.textSize(14); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.text('¡abierto!', W / 2, b.y + b.h + 24); }
        if (locked && !good) { p.noStroke(); p.fill(C.ok); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); fit(`era ${txtOf(r)}`, W / 2, b.y + b.h + 24, 14, W - 24); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const v = vals[cur];
        for (const wh of wheels) {
          const d = inside(wh.up, p.mouseX, p.mouseY) ? 1 : inside(wh.down, p.mouseX, p.mouseY) ? -1 : 0;
          if (!d) continue;
          if (wh.key === 'rel') v.rel = RELS[(RELS.indexOf(v.rel) + d + RELS.length) % RELS.length];
          else { const n = +(v[wh.key] + d * wh.step).toFixed(2); v[wh.key] = n > wh.max ? wh.min : n < wh.min ? wh.max : n; }
          touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean));
          return false;
        }
      };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ vals: vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, texOf };
})();
;
//#archivo js/games/tirolesa.js
// La tirolesa (cálculo, distancia entre dos puntos): dos torres en el plano cartesiano y un carrete de
// cable. Con −1 / −0.1 / +0.1 / +1 se suelta o se recoge cable desde la torre A: si es corto no alcanza
// la torre B (queda colgando el gancho); si sobra, el cable se pandea; con la medida justa (a la décima)
// queda tenso y se puede lanzar. La distancia es √((x₂ − x₁)² + (y₂ − y₁)²).
// params = { rounds: [{ A: [x, y], B: [x, y] }] }   state = { lens: [L] }

GAMES['tirolesa'] = (() => {
  const dist = (A, B) => Math.hypot(B[0] - A[0], B[1] - A[1]);
  const target = (A, B) => Math.round(dist(A, B) * 10) / 10;
  const fits = (L, r) => L != null && Math.abs(L - target(r.A, r.B)) <= 0.05 + 1e-9;
  const num = v => String(v).replace('-', '−');
  function exact(r) {
    const s = (r.B[0] - r.A[0]) ** 2 + (r.B[1] - r.A[1]) ** 2, q = Math.round(Math.sqrt(s));
    return q * q === s ? `${q}` : `\\sqrt{${s}} \\approx ${target(r.A, r.B)}`;
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.lens[i], r));
    return { ok, solution: params.rounds.map(r => `$d = ${exact(r)}$`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const lens = params.rounds.map(() => 1), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], box = null;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(W - 24, H - 170);
      box = { x: (W - side) / 2, y: 46, w: side, h: side };
      const bw = (W - 24 - 3 * 8) / 4, by = H - 50;
      btns = [-1, -0.1, 0.1, 1].map((d, i) => ({ d, x: 12 + i * (bw + 8), y: by, w: bw, h: 40 }));
    }
    // Ventana del plano: cuadrada, con margen alrededor de las dos torres.
    function view(r) {
      const xs = [r.A[0], r.B[0]], ys = [r.A[1], r.B[1]];
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const half = Math.ceil(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2) + 2;
      const x0 = Math.floor(cx - half), y0 = Math.floor(cy - half), n = 2 * half + 1;
      return { x0, y0, n, X: x => box.x + (x - x0) / n * box.w, Y: y => box.y + box.h - (y - y0) / n * box.h, u: box.w / n };
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], L = lens[cur], d = dist(r.A, r.B), ok = fits(L, r), v = view(r);
        tabs.forEach((tb, i) => {
          const g = fits(lens[i], params.rounds[i]);
          const col = locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        // Cuadrícula con ejes.
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        for (let k = 0; k <= v.n; k++) {
          const gx = v.x0 + k, gy = v.y0 + k;
          p.stroke(gx === 0 ? C.mute : C.line); p.strokeWeight(gx === 0 ? 1.5 : 0.6); p.line(v.X(gx), box.y + 2, v.X(gx), box.y + box.h - 2);
          p.stroke(gy === 0 ? C.mute : C.line); p.strokeWeight(gy === 0 ? 1.5 : 0.6); p.line(box.x + 2, v.Y(gy), box.x + box.w - 2, v.Y(gy));
        }
        const ax = v.X(r.A[0]), ay = v.Y(r.A[1]), bx = v.X(r.B[0]), by = v.Y(r.B[1]);
        // Triángulo de Pitágoras (al bloquear).
        if (locked) {
          p.drawingContext.setLineDash([5, 5]); p.stroke(C.N); p.strokeWeight(2);
          p.line(ax, ay, bx, ay); p.line(bx, ay, bx, by); p.drawingContext.setLineDash([]);
          p.noStroke(); p.fill(C.N); p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.TOP);
          p.text(`Δx = ${num(r.B[0] - r.A[0])}`, (ax + bx) / 2, ay + 4); p.textAlign(p.LEFT, p.CENTER); p.text(`Δy = ${num(r.B[1] - r.A[1])}`, bx + 6, (ay + by) / 2);
        }
        // Cable: corto (no llega), justo (tenso) o largo (se pandea).
        p.noFill(); p.strokeWeight(3.5);
        const ux = (bx - ax) / Math.hypot(bx - ax, by - ay), uy = (by - ay) / Math.hypot(bx - ax, by - ay);
        if (ok) { p.stroke(locked ? C.ok : C.Q); p.line(ax, ay, bx, by); }
        else if (L < d) {
          const ex = ax + ux * L * v.u, ey = ay + uy * L * v.u;
          p.stroke(C.I); p.line(ax, ay, ex, ey);
          p.stroke(C.I); p.line(ex, ey, ex, ey + 14); p.noFill(); p.arc(ex + 4, ey + 16, 8, 8, 0, Math.PI);
        } else {
          const sag = Math.min(box.h * 0.4, Math.sqrt(L * L - d * d) * 0.5 * v.u), mx = (ax + bx) / 2, my = (ay + by) / 2 + sag;
          p.stroke(C.R); p.beginShape(); for (let k = 0; k <= 30; k++) { const t = k / 30, x = (1 - t) ** 2 * ax + 2 * (1 - t) * t * mx + t * t * bx, y = (1 - t) ** 2 * ay + 2 * (1 - t) * t * (2 * my - (ay + by) / 2) + t * t * by; p.vertex(x, y); } p.endShape();
        }
        // Torres.
        [[ax, ay, 'A', r.A], [bx, by, 'B', r.B]].forEach(([x, y, n, P]) => {
          p.stroke(C.ink); p.strokeWeight(2); p.fill(C.N); p.rect(x - 7, y - 7, 14, 14, 3);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.BOTTOM);
          p.text(`${n}(${num(P[0])}, ${num(P[1])})`, Math.max(box.x + 34, Math.min(box.x + box.w - 34, x)), y - 10);
        });
        // Lectura y botones.
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(18);
        p.fill(ok ? C.ok : C.ink);
        p.text(`cable: ${L.toFixed(1)}  ${ok ? '¡tenso!' : L < d ? '· no alcanza' : '· sobra cable'}`, W / 2, box.y + box.h + 26);
        if (locked && !ok) { p.fill(C.ok); p.textSize(13); p.text(`medía ${target(r.A, r.B).toFixed(1)}`, W / 2, box.y + box.h + 48); }
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(16); p.text(`${b.d > 0 ? '+' : '−'}${Math.abs(b.d)}`, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => inside(b, p.mouseX, p.mouseY));
        if (!b) return;
        lens[cur] = Math.max(0, Math.min(20, +(lens[cur] + b.d).toFixed(1)));
        touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean));
        return false;
      };
    }, 1.45);

    return {
      loaded: m.ready,
      getState: () => ({ lens: lens.slice() }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, dist, target };
})();
;
//#archivo js/games/balancin.js
// El balancín (cálculo, punto medio y punto que divide un segmento): una tabla va del punto A al punto B
// del plano y en cada punta hay un peso (×1, ×2, ×3). Se arrastra el apoyo por la tabla (o con − / +,
// de doceavo en doceavo) hasta que quede en equilibrio; un nivel de burbuja y la tabla que se ladea
// muestran hacia dónde se va. Con pesos iguales el equilibrio es el punto medio; con pesos distintos, el
// punto que divide el segmento en la razón de los pesos: G = (m_A·A + m_B·B)/(m_A + m_B).
// params = { rounds: [{ A: [x, y], B: [x, y], mA, mB }] }   state = { ts: [t] }  (t = fracción de A a B)

GAMES['balancin'] = (() => {
  const clean = v => { const r = Math.round(v * 1e9) / 1e9; return r === 0 ? 0 : r; };
  const targetT = r => r.mB / (r.mA + r.mB);
  const pointAt = (A, B, t) => [clean(A[0] + t * (B[0] - A[0])), clean(A[1] + t * (B[1] - A[1]))];
  function frac(v) {
    for (let d = 1; d <= 12; d++) { const n = Math.round(v * d); if (Math.abs(v * d - n) < 1e-6) return (n < 0 ? '−' : '') + (d === 1 ? Math.abs(n) : `${Math.abs(n)}/${d}`); }
    return v.toFixed(2).replace('-', '−');
  }
  const pt = P => `(${frac(P[0])}, ${frac(P[1])})`;
  const fits = (t, r) => t != null && Math.abs(t - targetT(r)) < 1e-9;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.ts[i], r));
    return { ok, solution: params.rounds.map(r => `equilibrio en ${pt(pointAt(r.A, r.B, targetT(r)))}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ks = params.rounds.map(() => 1), touched = params.rounds.map(() => false);   // t = k/12
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, minus = null, plus = null, drag = false, tilt = 0;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(W - 24, H - 160);
      box = { x: (W - side) / 2, y: 46, w: side, h: side };
      minus = { x: 12, y: H - 50, w: 56, h: 40 }; plus = { x: W - 68, y: H - 50, w: 56, h: 40 };
    }
    function view(r) {
      const xs = [r.A[0], r.B[0]], ys = [r.A[1], r.B[1]];
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const half = Math.ceil(Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2) + 2;
      const x0 = Math.floor(cx - half), y0 = Math.floor(cy - half), n = 2 * half + 1;
      return { x0, y0, n, X: x => box.x + (x - x0) / n * box.w, Y: y => box.y + box.h - (y - y0) / n * box.h };
    }
    const changed = () => { touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean)); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], t = ks[cur] / 12, v = view(r), ok = fits(t, r);
        tabs.forEach((tb, i) => {
          const g = fits(ks[i] / 12, params.rounds[i]);
          const col = locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        for (let k = 0; k <= v.n; k++) {
          const gx = v.x0 + k, gy = v.y0 + k;
          p.stroke(gx === 0 ? C.mute : C.line); p.strokeWeight(gx === 0 ? 1.5 : 0.6); p.line(v.X(gx), box.y + 2, v.X(gx), box.y + box.h - 2);
          p.stroke(gy === 0 ? C.mute : C.line); p.strokeWeight(gy === 0 ? 1.5 : 0.6); p.line(box.x + 2, v.Y(gy), box.x + box.w - 2, v.Y(gy));
        }
        // Torque: positivo si gana A. La tabla gira un poco alrededor del apoyo.
        const torque = r.mA * t - r.mB * (1 - t);
        const G = pointAt(r.A, r.B, t), gx = v.X(G[0]), gy = v.Y(G[1]);
        const side = v.X(r.A[0]) < gx ? -1 : 1;   // gira de modo que baje la punta más pesada
        tilt += (Math.max(-0.25, Math.min(0.25, torque * 0.35)) * side * (ok ? 0 : 1) - tilt) * 0.15;
        const rot = (x, y) => { const dx = x - gx, dy = y - gy, c = Math.cos(tilt), s = Math.sin(tilt); return [gx + dx * c - dy * s, gy + dx * s + dy * c]; };
        const [ax, ay] = rot(v.X(r.A[0]), v.Y(r.A[1])), [bx, by] = rot(v.X(r.B[0]), v.Y(r.B[1]));
        p.stroke(locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.N); p.strokeWeight(7); p.line(ax, ay, bx, by);
        // Marcas de doceavos sobre la tabla.
        for (let k = 1; k < 12; k++) { const [mx, my] = rot(v.X(r.A[0] + k / 12 * (r.B[0] - r.A[0])), v.Y(r.A[1] + k / 12 * (r.B[1] - r.A[1]))); p.noStroke(); p.fill(C.bg); p.circle(mx, my, k % 6 === 0 ? 5 : 3); }
        // Pesos.
        [[ax, ay, r.mA, 'A', r.A], [bx, by, r.mB, 'B', r.B]].forEach(([x, y, w, n, P]) => {
          const s = 16 + 7 * w;
          p.stroke(C.ink); p.strokeWeight(2); p.fill(n === 'A' ? C.Z : C.I); p.rect(x - s / 2, y - s, s, s, 4);
          p.noStroke(); p.fill(C.bg); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.CENTER); p.text(`×${w}`, x, y - s / 2);
          p.fill(C.ink); p.textSize(11); p.textAlign(p.CENTER, p.TOP); p.text(`${n}${pt(P)}`, Math.max(box.x + 30, Math.min(box.x + box.w - 30, x)), y + 6);
        });
        // Apoyo (triángulo) en el punto elegido.
        p.stroke(C.ink); p.strokeWeight(2); p.fill(ok ? C.ok : C.Q); p.triangle(gx, gy + 3, gx - 11, gy + 22, gx + 11, gy + 22);
        // Nivel de burbuja.
        const lx = W / 2, lyy = box.y + box.h + 22, bw2 = 120;
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(lx - bw2 / 2, lyy - 9, bw2, 18, 9);
        p.stroke(C.mute); p.line(lx - 8, lyy - 9, lx - 8, lyy + 9); p.line(lx + 8, lyy - 9, lx + 8, lyy + 9);
        p.noStroke(); p.fill(ok ? C.ok : C.N); p.circle(lx + Math.max(-50, Math.min(50, -torque * 40)), lyy, 14);
        p.fill(ok ? C.ok : C.ink); p.textStyle(p.BOLD); p.textSize(15); p.textAlign(p.CENTER, p.CENTER);
        p.text(`apoyo en ${pt(G)}${ok ? '  ¡equilibrio!' : ''}`, W / 2, lyy + 26);
        if (locked && !ok) { p.fill(C.ok); p.textSize(12); p.text(`era ${pt(pointAt(r.A, r.B, targetT(r)))}`, W / 2, lyy + 44); }
        [[minus, '◀'], [plus, '▶']].forEach(([b, s]) => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(16); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      function moveTo(mx, my) {
        const r = params.rounds[cur], v = view(r), ax = v.X(r.A[0]), ay = v.Y(r.A[1]), bx = v.X(r.B[0]), by = v.Y(r.B[1]);
        const dx = bx - ax, dy = by - ay, t = ((mx - ax) * dx + (my - ay) * dy) / (dx * dx + dy * dy);
        const k = Math.max(1, Math.min(11, Math.round(t * 12)));
        if (k !== ks[cur]) { ks[cur] = k; changed(); } else touched[cur] = true;
      }
      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(minus, p.mouseX, p.mouseY)) { ks[cur] = Math.max(1, ks[cur] - 1); changed(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { ks[cur] = Math.min(11, ks[cur] + 1); changed(); return false; }
        if (inside(box, p.mouseX, p.mouseY)) { drag = true; moveTo(p.mouseX, p.mouseY); api.ready(touched.every(Boolean)); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { moveTo(p.mouseX, p.mouseY); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.42);

    return {
      loaded: m.ready,
      getState: () => ({ ts: ks.map(k => k / 12) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, targetT, pointAt };
})();
;
//#archivo js/games/cuerdas-iguales.js
// Cuerdas iguales (cálculo, distancia y equidistancia): un anillo se desliza por un riel (el eje x o el
// eje y) y de él salen dos cuerdas hasta los puntos A y B; sus largos se ven en vivo. Hay que dejar el
// anillo donde las dos cuerdas miden lo mismo: el punto del eje a igual distancia de A y de B.
// params = { rounds: [{ A: [x, y], B: [x, y], rail: 'x'|'y' }] }   state = { ps: [coordenada sobre el riel] }

GAMES['cuerdas-iguales'] = (() => {
  const RANGE = 8;
  const clean = v => { const r = Math.round(v * 1e9) / 1e9; return r === 0 ? 0 : r; };
  function target(r) {
    const k = r.B[0] ** 2 + r.B[1] ** 2 - r.A[0] ** 2 - r.A[1] ** 2;
    return clean(r.rail === 'y' ? k / (2 * (r.B[1] - r.A[1])) : k / (2 * (r.B[0] - r.A[0])));
  }
  const ringAt = (r, v) => (r.rail === 'y' ? [0, v] : [v, 0]);
  const len = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
  const num = v => String(v).replace('-', '−');
  const fits = (v, r) => v != null && Math.abs(v - target(r)) < 1e-9;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.ps[i], r));
    return { ok, solution: params.rounds.map(r => { const P = ringAt(r, target(r)); return `P = (${P[0]}, ${P[1]})`; }).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ps = params.rounds.map(() => 0), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, minus = null, plus = null, drag = false;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const n = 2 * RANGE + 1;
    const X = x => box.x + (x + RANGE + 0.5) / n * box.w, Y = y => box.y + (RANGE + 0.5 - y) / n * box.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(W - 24, H - 150);
      box = { x: (W - side) / 2, y: 46, w: side, h: side };
      minus = { x: 12, y: H - 50, w: 56, h: 40 }; plus = { x: W - 68, y: H - 50, w: 56, h: 40 };
    }
    const changed = () => { touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean)); };
    const set = v => { const s = Math.max(-RANGE, Math.min(RANGE, Math.round(v * 2) / 2)); if (s !== ps[cur]) { ps[cur] = s; changed(); } else { touched[cur] = true; api.ready(touched.every(Boolean)); } };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = ps[cur], P = ringAt(r, v), la = len(P, r.A), lb = len(P, r.B), ok = fits(v, r);
        tabs.forEach((tb, i) => {
          const g = fits(ps[i], params.rounds[i]);
          const col = locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        for (let k = -RANGE; k <= RANGE; k++) {
          p.stroke(C.line); p.strokeWeight(0.6); p.line(X(k), box.y + 2, X(k), box.y + box.h - 2); p.line(box.x + 2, Y(k), box.x + box.w - 2, Y(k));
        }
        p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(0), box.y + 2, X(0), box.y + box.h - 2); p.line(box.x + 2, Y(0), box.x + box.w - 2, Y(0));
        // Riel resaltado.
        p.stroke(C.R); p.strokeWeight(6);
        if (r.rail === 'y') p.line(X(0), box.y + 6, X(0), box.y + box.h - 6); else p.line(box.x + 6, Y(0), box.x + box.w - 6, Y(0));
        p.noStroke(); p.fill(C.R); p.textStyle(p.BOLD); p.textSize(11); p.textAlign(p.LEFT, p.TOP); p.text(`riel: eje ${r.rail}`, box.x + 6, box.y + 6);
        // Cuerdas con su largo.
        const px = X(P[0]), py = Y(P[1]);
        [[r.A, C.Z, la, 'A'], [r.B, C.I, lb, 'B']].forEach(([Q, col, l, name]) => {
          const qx = X(Q[0]), qy = Y(Q[1]);
          p.stroke(ok ? C.ok : col); p.strokeWeight(3); p.line(px, py, qx, qy);
          p.stroke(C.ink); p.strokeWeight(2); p.fill(col); p.circle(qx, qy, 14);
          p.noStroke(); p.fill(C.ink); p.textSize(12); p.textAlign(p.CENTER, p.BOTTOM); p.text(`${name}(${num(Q[0])}, ${num(Q[1])})`, Math.max(box.x + 34, Math.min(box.x + box.w - 34, qx)), qy - 9);
        });
        p.stroke(C.ink); p.strokeWeight(2.5); p.fill(ok ? C.ok : C.N); p.circle(px, py, 18);
        p.noStroke(); p.fill(ok ? C.ok : C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const read = `P(${num(P[0])}, ${num(P[1])})   |PA| = ${la.toFixed(2)}   |PB| = ${lb.toFixed(2)}`;
        let sz = 15; p.textSize(sz); while (sz > 10 && p.textWidth(read) > W - 24) { sz -= 1; p.textSize(sz); }
        p.text(read, W / 2, box.y + box.h + 22); p.textSize(15);
        if (ok && !locked) { p.fill(C.ok); p.text('¡cuerdas iguales!', W / 2, box.y + box.h + 44); }
        if (locked && !ok) { const T = ringAt(r, target(r)); p.fill(C.ok); p.textSize(13); p.text(`era P(${num(T[0])}, ${num(T[1])})`, W / 2, box.y + box.h + 44); }
        [[minus, r.rail === 'y' ? '▼' : '◀'], [plus, r.rail === 'y' ? '▲' : '▶']].forEach(([b, s]) => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(16); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      const fromMouse = () => { const r = params.rounds[cur]; return r.rail === 'y' ? RANGE + 0.5 - (p.mouseY - box.y) / box.h * n : (p.mouseX - box.x) / box.w * n - RANGE - 0.5; };
      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(minus, p.mouseX, p.mouseY)) { set(ps[cur] - 0.5); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { set(ps[cur] + 0.5); return false; }
        if (inside(box, p.mouseX, p.mouseY)) { drag = true; set(fromMouse()); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { set(fromMouse()); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.42);

    return {
      loaded: m.ready,
      getState: () => ({ ps: ps.slice() }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target };
})();
;
//#archivo js/games/rieles-paralelos.js
// Los rieles (cálculo, rectas paralelas y perpendiculares): en el plano hay una vía dada y una estación.
// El riel nuevo sale de la estación y se gira arrastrando su manija (o con ◀ ▶): las pendientes saltan
// entre valores «bonitos» (0, ±1/4, ±1/3, ±1/2, ±2/3, ±3/4, ±1, ±4/3, ±3/2, ±2, ±3, ±4 y la vertical).
// Según la ronda, el riel tiene que quedar paralelo a la vía (misma pendiente) o perpendicular a ella
// (m₁ · m₂ = −1; la perpendicular a una horizontal es vertical).
// params = { rounds: [{ base: { m, b } | { m: 'v', x0 }, baseTxt, through: [x, y], mode: 'par'|'perp' }] }
// state = { slopes: [m | 'v'] }

GAMES['rieles-paralelos'] = (() => {
  const RANGE = 6;
  const NUMS = [0, 1 / 4, 1 / 3, 1 / 2, 2 / 3, 3 / 4, 1, 4 / 3, 3 / 2, 2, 3, 4];
  const SLOPES = [...NUMS.slice(1).reverse().map(v => -v), ...NUMS, 'v'];
  const angleOf = m => (m === 'v' ? 90 : Math.atan(m) * 180 / Math.PI);
  const norm = m => (m === 'v' ? 'v' : SLOPES.find(s => s !== 'v' && Math.abs(s - m) < 1e-9) ?? m);
  function targetSlope(r) {
    const m = r.base.m;
    if (r.mode === 'par') return norm(m);
    if (m === 'v') return 0;
    if (m === 0) return 'v';
    return norm(-1 / m);
  }
  function slopeText(m) {
    if (m === 'v') return 'vertical';
    for (let d = 1; d <= 12; d++) { const n = Math.round(m * d); if (Math.abs(m * d - n) < 1e-9) return (n < 0 ? '−' : '') + (d === 1 ? Math.abs(n) : `${Math.abs(n)}/${d}`); }
    return String(m);
  }
  const same = (a, b) => a != null && (a === 'v' || b === 'v' ? a === b : Math.abs(a - b) < 1e-9);
  const num = v => String(v).replace('-', '−');

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.slopes[i], targetSlope(r)));
    return { ok, solution: params.rounds.map(r => `${r.mode === 'par' ? 'paralela' : 'perpendicular'} a ${r.baseTxt}: pendiente ${slopeText(targetSlope(r))}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const idx = params.rounds.map(() => SLOPES.indexOf(1)), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, minus = null, plus = null, drag = false;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const n = 2 * RANGE + 1;
    const X = x => box.x + (x + RANGE + 0.5) / n * box.w, Y = y => box.y + (RANGE + 0.5 - y) / n * box.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(W - 24, H - 170);
      box = { x: (W - side) / 2, y: 76, w: side, h: side };
      minus = { x: 12, y: H - 50, w: 56, h: 40 }; plus = { x: W - 68, y: H - 50, w: 56, h: 40 };
    }
    const changed = () => { touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean)); };
    // Recta por (x1, y1) con pendiente m, recortada a la ventana.
    function drawLine(m, x1, y1, col, w, ties) {
      let a, b;
      if (m === 'v') { a = [x1, -RANGE - 1]; b = [x1, RANGE + 1]; } else { a = [-RANGE - 1, y1 + m * (-RANGE - 1 - x1)]; b = [RANGE + 1, y1 + m * (RANGE + 1 - x1)]; }
      if (ties) {   // durmientes de la vía
        const dx = X(b[0]) - X(a[0]), dy = Y(b[1]) - Y(a[1]), L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        p5ref.stroke(C.mute); p5ref.strokeWeight(2);
        for (let s = 0; s < L; s += 14) { const cx = X(a[0]) + ux * s, cy = Y(a[1]) + uy * s; p5ref.line(cx - uy * 7, cy + ux * 7, cx + uy * 7, cy - ux * 7); }
      }
      p5ref.stroke(col); p5ref.strokeWeight(w); p5ref.line(X(a[0]), Y(a[1]), X(b[0]), Y(b[1]));
    }
    let p5ref = null;

    const m = mountSketch(host, (p, size) => {
      p5ref = p;
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };
      function fit(s, x, y, sz, maxW) { p.textSize(sz); while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); } p.text(s, x, y); }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], s = SLOPES[idx[cur]], ok = same(s, targetSlope(r)), T = r.through;
        tabs.forEach((tb, i) => {
          const g = same(SLOPES[idx[i]], targetSlope(params.rounds[i]));
          const col = locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fit(`riel ${r.mode === 'par' ? 'PARALELO' : 'PERPENDICULAR'} a ${r.baseTxt}`, W / 2, 58, 16, W - 24);
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        for (let k = -RANGE; k <= RANGE; k++) { p.stroke(C.line); p.strokeWeight(0.6); p.line(X(k), box.y + 2, X(k), box.y + box.h - 2); p.line(box.x + 2, Y(k), box.x + box.w - 2, Y(k)); }
        p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(0), box.y + 2, X(0), box.y + box.h - 2); p.line(box.x + 2, Y(0), box.x + box.w - 2, Y(0));
        p.drawingContext.save(); p.drawingContext.beginPath(); p.drawingContext.rect(box.x, box.y, box.w, box.h); p.drawingContext.clip();
        if (r.base.m === 'v') drawLine('v', r.base.x0, 0, C.ink, 4, true); else drawLine(r.base.m, 0, r.base.b, C.ink, 4, true);
        drawLine(s, T[0], T[1], locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.I, 4, false);
        p.drawingContext.restore();
        // Estación y manija para girar.
        const sx = X(T[0]), sy = Y(T[1]), ang = angleOf(s) * Math.PI / 180, hr = Math.min(70, box.w * 0.25);
        const hx = sx + Math.cos(ang) * hr, hy = sy - Math.sin(ang) * hr;
        p.stroke(C.ink); p.strokeWeight(2); p.fill(C.N); p.rect(sx - 8, sy - 8, 16, 16, 3);
        p.noStroke(); p.fill(C.ink); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.TOP); p.text(`(${num(T[0])}, ${num(T[1])})`, sx, sy + 10);
        if (!locked) { p.stroke(C.ink); p.strokeWeight(2); p.fill(C.brand); p.circle(Math.max(box.x + 9, Math.min(box.x + box.w - 9, hx)), Math.max(box.y + 9, Math.min(box.y + box.h - 9, hy)), 18); }
        // Lectura.
        p.noStroke(); p.fill(ok ? C.ok : C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const mb = r.base.m, prod = r.mode === 'perp' && s !== 'v' && mb !== 'v' ? `   m₁·m₂ = ${slopeText(mb * s)}` : '';
        fit(`pendiente del riel: ${slopeText(s)}${prod}`, W / 2, box.y + box.h + 20, 15, W - 24);
        if (locked && !ok) { p.fill(C.ok); p.textSize(12); p.text(`era ${slopeText(targetSlope(r))}`, W / 2, box.y + box.h + 40); }
        [[minus, '↻'], [plus, '↺']].forEach(([b, t]) => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(20); p.text(t, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      function aim() {
        const T = params.rounds[cur].through, dx = p.mouseX - X(T[0]), dy = Y(T[1]) - p.mouseY;
        if (Math.hypot(dx, dy) < 12) return;
        let a = Math.atan2(dy, dx) * 180 / Math.PI;
        if (a > 90) a -= 180; if (a <= -90) a += 180;
        let best = 0, bd = 1e9;
        SLOPES.forEach((s, i) => { const sa = angleOf(s), dd = Math.min(Math.abs(sa - a), 180 - Math.abs(sa - a)); if (dd < bd) { bd = dd; best = i; } });
        if (best !== idx[cur]) { idx[cur] = best; changed(); }
      }
      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(minus, p.mouseX, p.mouseY)) { idx[cur] = (idx[cur] - 1 + SLOPES.length) % SLOPES.length; changed(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { idx[cur] = (idx[cur] + 1) % SLOPES.length; changed(); return false; }
        if (inside(box, p.mouseX, p.mouseY)) { drag = true; aim(); touched[cur] = true; api.ready(touched.every(Boolean)); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { aim(); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.5);

    return {
      loaded: m.ready,
      getState: () => ({ slopes: idx.map(i => SLOPES[i]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, targetSlope, slopeText, SLOPES };
})();
;
//#archivo js/games/proyector-sombras.js
// El proyector de sombras (cálculo, dominio y rango): una gráfica en el plano. Bajo el plano hay un riel
// con dos corchetes (el dominio, la sombra sobre el eje x) y a la izquierda otro riel (el rango, la sombra
// sobre el eje y). Los corchetes se arrastran (se ajustan a enteros); llevarlos al borde del riel los
// vuelve ∞ y tocarlos alterna extremo lleno (incluido) / vacío. Al comprobar se encienden las linternas y
// las sombras verdaderas se pintan sobre los ejes.
// params = { rounds: [{ f, xr, yr, dom: [a, b, ac, bc], ran: [c, d, cc, dc] }] }  (null = ∞; extremos enteros)
// state = { rounds: [{ dom: [a, b, ac, bc], ran: [c, d, cc, dc] }] }

GAMES['proyector-sombras'] = (() => {
  const ivText = ([a, b, ac, bc]) => `${a == null ? '(' : ac ? '[' : '('}${a == null ? '−∞' : numTxt(a)}, ${b == null ? '∞' : numTxt(b)}${b == null ? ')' : bc ? ']' : ')'}`;
  const sameIv = (u, w) => !!u && u[0] === w[0] && u[1] === w[1] && (w[0] == null || u[2] === w[2]) && (w[1] == null || u[3] === w[3]);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => sameIv(state.rounds[i]?.dom, r.dom) && sameIv(state.rounds[i]?.ran, r.ran));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) dominio ${ivText(r.dom)}, rango ${ivText(r.ran)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    // Cada riel guarda dos asas: { v: número | ±Infinity, c: lleno }.
    const st = params.rounds.map(() => ({ x: [{ v: -1, c: true }, { v: 1, c: true }], y: [{ v: -1, c: true }, { v: 1, c: true }], touched: false }));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, xs = null, ys = null, drag = null;

    const toIv = hs => { const [h1, h2] = [...hs].sort((a, b) => a.v - b.v); return [Number.isFinite(h1.v) ? h1.v : null, Number.isFinite(h2.v) ? h2.v : null, h1.c, h2.c]; };
    const stateOf = s => ({ dom: toIv(s.x), ran: toIv(s.y) });

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], side = Math.min(W - 24 - 44, H - 46 - 130);
      const box = { x: 12 + 44, y: 46, w: side, h: side * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]) };
      if (box.h > H - 176) { box.h = H - 176; }
      v = planeView(box, r.xr, r.yr);
      xs = { x: box.x, y: box.y + box.h + 8, w: box.w, h: 30 };
      ys = { x: 12, y: box.y, w: 34, h: box.h };
    }
    const xPx = val => (val === -Infinity ? xs.x : val === Infinity ? xs.x + xs.w : v.X(val));
    const yPx = val => (val === -Infinity ? ys.y + ys.h : val === Infinity ? ys.y : v.Y(val));
    function snapX(px) {
      const r = params.rounds[cur];
      if (px < v.X(r.xr[0] + 0.5)) return -Infinity;
      if (px > v.X(r.xr[1] - 0.5)) return Infinity;
      return Math.round(v.toX(px));
    }
    function snapY(py) {
      const r = params.rounds[cur];
      if (py > v.Y(r.yr[0] + 0.5)) return -Infinity;
      if (py < v.Y(r.yr[1] - 0.5)) return Infinity;
      return Math.round(v.toY(py));
    }

    function bracket(p, x, y, h, horiz, isLeft, closed, col) {
      // Corchete o paréntesis (o flecha si es infinito) dibujado sobre el riel.
      p.stroke(col); p.strokeWeight(3); p.noFill();
      const s = 7;
      if (horiz) {
        if (closed) { p.line(x, y - h / 2, x, y + h / 2); p.line(x, y - h / 2, x + (isLeft ? s : -s), y - h / 2); p.line(x, y + h / 2, x + (isLeft ? s : -s), y + h / 2); }
        else p.arc(x + (isLeft ? s : -s), y, 2 * s, h, isLeft ? Math.PI / 2 : -Math.PI / 2, isLeft ? 3 * Math.PI / 2 : Math.PI / 2);
      } else {
        if (closed) { p.line(x - h / 2, y, x + h / 2, y); p.line(x - h / 2, y, x - h / 2, y + (isLeft ? -s : s)); p.line(x + h / 2, y, x + h / 2, y + (isLeft ? -s : s)); }
        else p.arc(x, y + (isLeft ? -s : s), h, 2 * s, isLeft ? 0 : Math.PI, isLeft ? Math.PI : 2 * Math.PI);
      }
    }
    function arrow(p, x, y, dx, dy, col) {
      p.stroke(col); p.strokeWeight(3); p.line(x, y, x + dx * 12, y + dy * 12);
      p.noStroke(); p.fill(col); p.triangle(x + dx * 16, y + dy * 16, x + dx * 8 - dy * 6, y + dy * 8 + dx * 6, x + dx * 8 + dy * 6, y + dy * 8 - dx * 6);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], s = st[cur], my = stateOf(s);
        drawTabs(p, C, tabs, cur, i => {
          const g = sameIv(stateOf(st[i]).dom, params.rounds[i].dom) && sameIv(stateOf(st[i]).ran, params.rounds[i].ran);
          return locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : st[i].touched ? C.Z : C.line;
        });
        drawPlane(p, C, v);
        // Sombras verdaderas (al bloquear): bandas sobre los ejes.
        if (locked) {
          const band = (iv, horiz) => {
            const a = iv[0] == null ? (horiz ? r.xr[0] : r.yr[0]) : iv[0], b = iv[1] == null ? (horiz ? r.xr[1] : r.yr[1]) : iv[1];
            p.noStroke(); p.fill(p.color(C.ok + '55'));
            if (horiz) p.rect(v.X(a), v.Y(0) - 5, v.X(b) - v.X(a), 10); else p.rect(v.X(0) - 5, v.Y(b), 10, v.Y(a) - v.Y(b));
          };
          band(r.dom, true); band(r.ran, false);
        }
        // Gráfica: solo dentro del dominio, con sus puntos extremos.
        const a = r.dom[0] == null ? r.xr[0] : r.dom[0], b = r.dom[1] == null ? r.xr[1] : r.dom[1];
        p.stroke(C.brand); p.strokeWeight(3.5); drawCurve(p, v, r.f, a, b);
        [[r.dom[0], r.dom[2]], [r.dom[1], r.dom[3]]].forEach(([x, c]) => {
          if (x == null) return;
          p.stroke(C.brand); p.strokeWeight(2.5); p.fill(c ? C.brand : C.card); p.circle(v.X(x), v.Y(r.f(x)), 11);
        });
        // Rieles con la sombra que propone el estudiante.
        [[xs, true], [ys, false]].forEach(([rail, horiz]) => {
          p.noStroke(); p.fill(C.card); p.rect(rail.x, rail.y, rail.w, rail.h, 8);
          const iv = horiz ? my.dom : my.ran, col = locked ? (sameIv(iv, horiz ? r.dom : r.ran) ? C.ok : C.bad) : horiz ? C.N : C.Z;
          const lo = horiz ? xPx(iv[0] == null ? -Infinity : iv[0]) : yPx(iv[0] == null ? -Infinity : iv[0]);
          const hi = horiz ? xPx(iv[1] == null ? Infinity : iv[1]) : yPx(iv[1] == null ? Infinity : iv[1]);
          p.fill(p.color(col + '44'));
          if (horiz) p.rect(lo, rail.y + 8, hi - lo, rail.h - 16); else p.rect(rail.x + 8, hi, rail.w - 16, lo - hi);
          if (horiz) {
            if (iv[0] == null) arrow(p, lo + 18, rail.y + rail.h / 2, -1, 0, col); else bracket(p, lo, rail.y + rail.h / 2, rail.h - 8, true, true, iv[2], col);
            if (iv[1] == null) arrow(p, hi - 18, rail.y + rail.h / 2, 1, 0, col); else bracket(p, hi, rail.y + rail.h / 2, rail.h - 8, true, false, iv[3], col);
          } else {
            if (iv[0] == null) arrow(p, rail.x + rail.w / 2, lo - 18, 0, 1, col); else bracket(p, rail.x + rail.w / 2, lo, rail.w - 8, false, true, iv[2], col);
            if (iv[1] == null) arrow(p, rail.x + rail.w / 2, hi + 18, 0, -1, col); else bracket(p, rail.x + rail.w / 2, hi, rail.w - 8, false, false, iv[3], col);
          }
        });
        // Lectura.
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        const ty = xs.y + xs.h + 22;
        p.fill(C.N); fitText(p, `Dominio: ${ivText(my.dom)}`, W / 4 + 6, ty, W / 2 - 16, 15);
        p.fill(C.Z); fitText(p, `Rango: ${ivText(my.ran)}`, 3 * W / 4 - 6, ty, W / 2 - 16, 15);
        if (locked) {
          p.fill(C.ok); p.textStyle(p.NORMAL);
          fitText(p, `Sombras: ${ivText(r.dom)} y ${ivText(r.ran)}`, W / 2, ty + 24, W - 24, 13);
        } else { p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, 'Arrastra los corchetes · tócalos para incluir o excluir', W / 2, ty + 24, W - 24, 12); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const s = st[cur];
        const pick = (hs, pos, rail) => {
          if (!hitBox({ x: rail.x - 6, y: rail.y - 6, w: rail.w + 12, h: rail.h + 12 }, p.mouseX, p.mouseY)) return -1;
          let best = -1, bd = 26;
          hs.forEach((h, i) => { const d = Math.abs(pos(h.v) - (rail === xs ? p.mouseX : p.mouseY)); if (d < bd) { bd = d; best = i; } });
          return best;
        };
        let i = pick(s.x, xPx, xs);
        if (i >= 0) { drag = { axis: 'x', i, moved: false }; return false; }
        i = pick(s.y, yPx, ys);
        if (i >= 0) { drag = { axis: 'y', i, moved: false }; return false; }
      };
      p.mouseDragged = () => {
        if (!drag || locked) return;
        const h = st[cur][drag.axis][drag.i], nv = drag.axis === 'x' ? snapX(p.mouseX) : snapY(p.mouseY);
        if (nv !== h.v) { h.v = nv; drag.moved = true; st[cur].touched = true; api.ready(st.every(t => t.touched)); }
        return false;
      };
      p.mouseReleased = () => {
        if (!drag) return;
        if (!drag.moved) { const h = st[cur][drag.axis][drag.i]; if (Number.isFinite(h.v)) { h.c = !h.c; st[cur].touched = true; api.ready(st.every(t => t.touched)); api.sfx?.tap?.(); } }
        drag = null; return false;
      };
    }, 1.5);

    return {
      loaded: m.ready,
      getState: () => ({ rounds: st.map(stateOf) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, ivText };
})();
;
//#archivo js/games/completa-simetria.js
// Completa la simetría (cálculo, funciones par e impar): la mitad derecha de una gráfica está dada (puntos
// en x = 1, 2, 3 unidos por segmentos). Se arrastran hacia arriba o abajo los puntos de la izquierda
// (x = −1, −2, −3, ajuste de ½) para que la gráfica completa sea PAR (espejo en el eje y: f(−x) = f(x)) o
// IMPAR (media vuelta alrededor del origen: f(−x) = −f(x)).
// params = { rounds: [{ mode: 'par'|'impar', pts: [[1, y], [2, y], [3, y]], y0?, yr: [min, max] }] }
// state = { ys: [[y(−1), y(−2), y(−3)]] }

GAMES['completa-simetria'] = (() => {
  const target = r => r.pts.map(([, y]) => (r.mode === 'par' ? y : -y) + 0);
  const same = (ys, r) => !!ys && target(r).every((t, k) => Math.abs(ys[k] - t) < 1e-9);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.ys[i], r));
    return {
      ok,
      solution: params.rounds.map((r, i) => `${i + 1}) ${r.pts.map(([x], k) => `f(−${x}) = ${numTxt(target(r)[k])}`).join(', ')}`).join(' · '),
    };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ys = params.rounds.map(r => r.pts.map(() => 0)), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = -1;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 46 - 80, w * (r.yr[1] - r.yr[0]) / 8);
      v = planeView({ x: 12, y: 46, w, h }, [-4, 4], r.yr);
    }
    const y0Of = r => (r.mode === 'impar' ? 0 : r.y0);

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], my = ys[cur], ok = same(my, r), y0 = y0Of(r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(ys[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        drawPlane(p, C, v);
        // Guía de la simetría: el eje y (par) o el origen (impar).
        p.stroke(C.R); p.strokeWeight(2.5); p.drawingContext.setLineDash([6, 6]);
        if (r.mode === 'par') p.line(v.X(0), v.box.y + 4, v.X(0), v.box.y + v.box.h - 4);
        p.drawingContext.setLineDash([]);
        if (r.mode === 'impar') { p.noFill(); p.circle(v.X(0), v.Y(0), 22); }
        // Polilínea completa: izquierda (del estudiante) + centro + derecha (dada).
        const left = r.pts.map(([x], k) => [-x, my[k]]).reverse(), all = [...left, ...(y0 != null ? [[0, y0]] : []), ...r.pts];
        p.noFill(); p.stroke(locked ? (ok ? C.ok : C.bad) : C.brand); p.strokeWeight(3.5);
        p.beginShape(); all.forEach(([x, y]) => p.vertex(v.X(x), v.Y(y))); p.endShape();
        if (locked && !ok) {
          p.stroke(C.ok); p.strokeWeight(2.5); p.drawingContext.setLineDash([5, 5]);
          p.beginShape(); r.pts.map(([x], k) => [-x, target(r)[k]]).reverse().forEach(([x, y]) => p.vertex(v.X(x), v.Y(y))); if (y0 != null) p.vertex(v.X(0), v.Y(y0)); p.endShape();
          p.drawingContext.setLineDash([]);
        }
        r.pts.forEach(([x, y]) => { p.noStroke(); p.fill(C.Z); p.circle(v.X(x), v.Y(y), 13); });
        if (y0 != null) { p.noStroke(); p.fill(C.Z); p.circle(v.X(0), v.Y(y0), 13); }
        r.pts.forEach(([x], k) => {
          p.stroke(C.ink); p.strokeWeight(2); p.fill(drag === k ? C.N : C.card); p.circle(v.X(-x), v.Y(my[k]), 20);
          p.noStroke(); p.fill(C.N); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM);
          p.text(numTxt(my[k]), v.X(-x), v.Y(my[k]) - 12);
        });
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.fill(r.mode === 'par' ? C.R : C.N);
        const by = v.box.y + v.box.h + 22;
        fitText(p, r.mode === 'par' ? 'Hazla PAR: f(−x) = f(x)' : 'Hazla IMPAR: f(−x) = −f(x)', W / 2, by, W - 24, 17);
        p.fill(C.mute); p.textStyle(p.NORMAL);
        fitText(p, r.mode === 'par' ? 'espejo en el eje y' : 'media vuelta alrededor del origen', W / 2, by + 24, W - 24, 13);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = params.rounds[cur];
        drag = nearest(r.pts.map(([x], k) => ({ x: v.X(-x), y: v.Y(ys[cur][k]) })), p.mouseX, p.mouseY, 30);
        if (drag < 0) drag = r.pts.findIndex(([x]) => Math.abs(v.X(-x) - p.mouseX) < 16 && hitBox(v.box, p.mouseX, p.mouseY));
        if (drag >= 0) return false;
      };
      p.mouseDragged = () => {
        if (drag < 0 || locked) return;
        const r = params.rounds[cur], y = Math.max(r.yr[0] + 0.5, Math.min(r.yr[1] - 0.5, Math.round(v.toY(p.mouseY) * 2) / 2));
        if (y !== ys[cur][drag]) { ys[cur][drag] = y; touched[cur] = true; api.ready(touched.every(Boolean)); }
        return false;
      };
      p.mouseReleased = () => { drag = -1; };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ ys: ys.map(a => a.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target };
})();
;
//#archivo js/games/apila-alturas.js
// Apila alturas (cálculo, operaciones entre funciones): en el plano están las gráficas de f y g. Sobre
// cada x marcada hay una cuenta que se arrastra hacia arriba o abajo (ajuste de ½) hasta la altura de
// (f + g)(x), (f − g)(x) o (f·g)(x), según la ronda: las operaciones se hacen punto a punto. Al comprobar,
// en la suma y la resta se apilan las barras de f y g, y aparece la gráfica verdadera.
// params = { rounds: [{ mode: 'sum'|'diff'|'prod', f, g, fTxt, gTxt, xs: [x…], xr, yr }] }
// state = { ys: [[y…]] }

GAMES['apila-alturas'] = (() => {
  const OPS = { sum: (a, b) => a + b, diff: (a, b) => a - b, prod: (a, b) => a * b };
  const NAME = { sum: 'f + g', diff: 'f − g', prod: 'f · g' };
  const target = r => r.xs.map(x => OPS[r.mode](r.f(x), r.g(x)) + 0);
  const same = (ys, r) => !!ys && target(r).every((t, k) => Math.abs(ys[k] - t) < 1e-9);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.ys[i], r));
    return {
      ok,
      solution: params.rounds.map((r, i) => `${i + 1}) ${r.xs.map((x, k) => `(${NAME[r.mode]})(${numTxt(x)}) = ${numTxt(target(r)[k])}`).join(', ')}`).join(' · '),
    };
  }

  function create(host, params, api) {
    const C = api.palette;
    const ys = params.rounds.map(r => r.xs.map(() => 0)), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = -1;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 84 - 50, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 84, w, h }, r.xr, r.yr);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], my = ys[cur], ok = same(my, r), T = target(r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(ys[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        // Leyenda.
        p.noStroke(); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        p.fill(C.Z); fitText(p, `f(x) = ${r.fTxt}`, W / 4 + 4, 62, W / 2 - 12, 15);
        p.fill(C.N); fitText(p, `g(x) = ${r.gTxt}`, 3 * W / 4 - 4, 62, W / 2 - 12, 15);
        drawPlane(p, C, v);
        if (locked && r.mode !== 'prod') r.xs.forEach(x => {
          const a = r.f(x), b = (r.mode === 'sum' ? 1 : -1) * r.g(x), bw = 12;
          p.noStroke(); p.fill(p.color(C.Z + '88')); p.rect(v.X(x) - bw - 1, Math.min(v.Y(0), v.Y(a)), bw, Math.abs(v.Y(a) - v.Y(0)));
          p.fill(p.color(C.N + '88')); p.rect(v.X(x) + 1, Math.min(v.Y(a), v.Y(a + b)), bw, Math.abs(v.Y(a + b) - v.Y(a)));
        });
        p.strokeWeight(3); p.stroke(C.Z); drawCurve(p, v, r.f); p.stroke(C.N); drawCurve(p, v, r.g);
        if (locked) { p.stroke(C.ok); p.strokeWeight(2.5); p.drawingContext.setLineDash([6, 5]); drawCurve(p, v, x => OPS[r.mode](r.f(x), r.g(x))); p.drawingContext.setLineDash([]); }
        // Guías verticales y cuentas.
        r.xs.forEach((x, k) => {
          p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([3, 4]); p.line(v.X(x), v.box.y + 3, v.X(x), v.box.y + v.box.h - 3); p.drawingContext.setLineDash([]);
        });
        p.stroke(C.brand); p.strokeWeight(2.5); p.noFill(); p.beginShape(); r.xs.forEach((x, k) => p.vertex(v.X(x), v.Y(my[k]))); p.endShape();
        r.xs.forEach((x, k) => {
          const good = Math.abs(my[k] - T[k]) < 1e-9;
          p.stroke(C.ink); p.strokeWeight(2); p.fill(locked ? (good ? C.ok : C.bad) : drag === k ? C.N : C.brand); p.circle(v.X(x), v.Y(my[k]), 18);
        });
        p.noStroke(); p.fill(C.brand); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const by = v.box.y + v.box.h + 22;
        fitText(p, `Lleva cada cuenta a la altura de (${NAME[r.mode]})(x)`, W / 2, by, W - 24, 15);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked || !hitBox(v.box, p.mouseX, p.mouseY)) return;
        const r = params.rounds[cur];
        let best = -1, bd = 22;
        r.xs.forEach((x, k) => { const d = Math.abs(v.X(x) - p.mouseX); if (d < bd) { bd = d; best = k; } });
        drag = best;
        if (drag >= 0) { p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (drag < 0 || locked) return;
        const r = params.rounds[cur], y = Math.max(r.yr[0], Math.min(r.yr[1], Math.round(v.toY(p.mouseY) * 2) / 2));
        if (y !== ys[cur][drag]) { ys[cur][drag] = y; touched[cur] = true; api.ready(touched.every(Boolean)); }
        return false;
      };
      p.mouseReleased = () => { drag = -1; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ ys: ys.map(a => a.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target };
})();
;
//#archivo js/games/tuberia-maquinas.js
// La tubería de máquinas (cálculo, composición de funciones): cada ficha es una máquina (x + 3, x², √x…).
// Tocar una ficha la mete en el primer tubo libre; tocar un tubo lo vacía. Una bolita entra con un número
// y pasa por las máquinas de izquierda a derecha mostrando el valor en cada tramo: la primera máquina es
// la de adentro de la composición. Meta: que la tubería sea la función pedida (se comprueba en varios x).
// params = { chips: [{ tpl: '(□)²', f }], rounds: [{ n, input, goal, goalTxt, chips?: [i…], tests: [x…] }] }
// state = { slots: [[i…]] }

GAMES['tuberia-maquinas'] = (() => {
  const run = (chips, seq, x) => seq.reduce((acc, i) => chips[i].f(acc), x);
  const formulaText = (chips, seq) => seq.reduce((inner, i) => chips[i].tpl.replace('□', inner).replace(/\(x\)/g, 'x'), 'x');
  const eq = (a, b) => (Number.isNaN(a) && Number.isNaN(b)) || Math.abs(a - b) < 1e-9;
  const fits = (seq, r, chips) => !!seq && seq.length === r.n && seq.every(i => i != null) && r.tests.every(x => eq(run(chips, seq, x), r.goal(x)));
  const val = y => (Number.isFinite(y) ? numTxt(+y.toFixed(2)) : '¡atasco!');

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.slots[i], r, params.chips));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) ${r.goalTxt}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const slots = params.rounds.map(r => Array(r.n).fill(null)), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], pipe = [], tray = [], inB = null, outB = null, t0 = 0;

    const avail = r => r.chips || params.chips.map((_, i) => i);
    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], py = 96, ph = 54, side = 46, gap = 8;
      inB = { x: 12, y: py, w: side, h: ph };
      outB = { x: W - 12 - side, y: py, w: side, h: ph };
      const sw = (W - 24 - 2 * side - (r.n + 1) * gap) / r.n;
      pipe = slots[cur].map((_, k) => ({ x: 12 + side + gap + k * (sw + gap), y: py, w: sw, h: ph }));
      const ids = avail(r), cols = W < 360 ? 3 : 4, cw = (W - 24 - (cols - 1) * 8) / cols;
      const rows = Math.ceil(ids.length / cols), y0 = H - rows * 50 - 4;
      tray = ids.map((id, k) => ({ id, x: 12 + (k % cols) * (cw + 8), y: y0 + Math.floor(k / cols) * 50, w: cw, h: 42 }));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); t0 = p.millis(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], seq = slots[cur], full = seq.every(i => i != null), ok = fits(seq, r, params.chips);
        drawTabs(p, C, tabs, cur, i => (locked ? (fits(slots[i], params.rounds[i], params.chips) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, `Arma ${r.goalTxt}`, W / 2, 66, W - 24, 18);
        // Tubo de fondo.
        const cy = inB.y + inB.h / 2;
        p.stroke(C.line); p.strokeWeight(14); p.line(inB.x + inB.w / 2, cy, outB.x + outB.w / 2, cy);
        // Entrada y salida.
        const filled = seq.filter(i => i != null);
        const outVal = run(params.chips, filled, r.input);
        [[inB, `${numTxt(r.input)}`, C.Z], [outB, val(outVal), locked ? (ok ? C.ok : C.bad) : C.N]].forEach(([b, t, col]) => {
          p.stroke(col); p.strokeWeight(2); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 23);
          p.noStroke(); p.fill(col); fitText(p, t, b.x + b.w / 2, b.y + b.h / 2, b.w - 6, 15);
        });
        // Máquinas.
        let acc = r.input;
        pipe.forEach((b, k) => {
          const id = seq[k];
          p.stroke(id == null ? C.line : C.brand); p.strokeWeight(2); p.fill(id == null ? C.bg : C.card);
          if (id == null) p.drawingContext.setLineDash([5, 4]);
          p.rect(b.x, b.y, b.w, b.h, 10); p.drawingContext.setLineDash([]);
          p.noStroke(); p.fill(id == null ? C.mute : C.ink); p.textStyle(p.BOLD);
          fitText(p, id == null ? `${k + 1}` : formulaText(params.chips, [id]), b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 16);
          if (id != null) { acc = params.chips[id].f(acc); p.fill(C.N); p.textStyle(p.NORMAL); fitText(p, val(acc), b.x + b.w / 2, b.y + b.h + 14, b.w, 12); }
        });
        // Bolita viajera.
        const stops = [inB, ...pipe, outB], tt = ((p.millis() - t0) / 900) % (stops.length - 1), k0 = Math.floor(tt), fr = tt - k0;
        const bx = p.lerp(stops[k0].x + stops[k0].w / 2, stops[k0 + 1].x + stops[k0 + 1].w / 2, fr);
        p.noStroke(); p.fill(C.N); p.circle(bx, inB.y - 10, 10);
        // Fórmula de la tubería.
        p.textStyle(p.BOLD); p.fill(locked ? (ok ? C.ok : C.bad) : C.brand);
        fitText(p, `tu tubería: ${full ? formulaText(params.chips, seq) : '…'}`, W / 2, inB.y + inB.h + 48, W - 24, 16);
        if (locked && !ok) { p.fill(C.ok); fitText(p, r.goalTxt, W / 2, inB.y + inB.h + 70, W - 24, 13); }
        // Bandeja.
        tray.forEach(b => {
          const used = seq.includes(b.id);
          p.stroke(used ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(used ? C.mute : C.ink); p.textStyle(p.BOLD); fitText(p, formulaText(params.chips, [b.id]), b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 16);
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const seq = slots[cur], k = pipe.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (k >= 0 && seq[k] != null) { seq[k] = null; api.ready(false); api.sfx?.tap?.(); return false; }
        const c = tray.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (c) {
          const free = seq.indexOf(null);
          if (free < 0 || seq.includes(c.id)) return false;
          seq[free] = c.id; touched[cur] = true; api.sfx?.tap?.();
          api.ready(slots.every(s => s.every(i => i != null)));
          return false;
        }
      };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ slots: slots.map(s => s.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, run, formulaText };
})();
;
//#archivo js/games/arma-tramos.js
// Arma los tramos (cálculo, funciones a tramos): arriba está la definición con dos fórmulas y el punto de
// corte c. Cada tramo es un segmento con dos asas que se arrastran en vertical (ajuste de ½): el tramo 1
// va del borde izquierdo hasta c y el tramo 2 de c al borde derecho (las asas de c se agarran por su lado).
// Abajo, dos botones deciden si en x = c el punto de cada tramo es lleno (pertenece) o vacío.
// params = { rounds: [{ c, xr, yr, left: { m, b }, right: { m, b }, leftIncl, txt: [t1, t2] }] }
// state = { rounds: [{ ys: [y(x0), y(c⁻), y(c⁺), y(x1)], dots: [lleno1, lleno2] }] }

GAMES['arma-tramos'] = (() => {
  const L = (q, x) => q.m * x + q.b;
  const targetYs = r => [L(r.left, r.xr[0]), L(r.left, r.c), L(r.right, r.c), L(r.right, r.xr[1])].map(y => y + 0);
  const targetDots = r => [!!r.leftIncl, !r.leftIncl];
  const same = (s, r) => !!s && targetYs(r).every((y, k) => Math.abs(s.ys[k] - y) < 1e-9) && targetDots(r).every((d, k) => s.dots[k] === d);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.rounds[i], r));
    return {
      ok,
      solution: params.rounds.map((r, i) => {
        const t = targetYs(r);
        return `${i + 1}) tramo 1 de (${numTxt(r.xr[0])}, ${numTxt(t[0])}) a (${numTxt(r.c)}, ${numTxt(t[1])}) ${r.leftIncl ? '●' : '○'}; tramo 2 de (${numTxt(r.c)}, ${numTxt(t[2])}) ${r.leftIncl ? '○' : '●'} a (${numTxt(r.xr[1])}, ${numTxt(t[3])})`;
      }).join(' · '),
    };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = params.rounds.map(() => ({ ys: [0, 0, 0, 0], dots: [true, true] })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = -1, dotB = [];

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 108 - 64, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 108, w, h }, r.xr, r.yr);
      const bw = (W - 32) / 2;
      dotB = [0, 1].map(k => ({ k, x: 12 + k * (bw + 8), y: H - 50, w: bw, h: 40 }));
    }
    const hx = (r, k) => [v.X(r.xr[0]), v.X(r.c) - 6, v.X(r.c) + 6, v.X(r.xr[1])][k];
    const touch = () => { touched[cur] = true; api.ready(touched.every(Boolean)); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], s = st[cur], ok = same(s, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(st[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD);
        p.fill(C.ink); p.textSize(15); p.text('f(x) =', 12, 76);
        const tx = 12 + p.textWidth('f(x) = ') + 4;
        p.fill(C.Z); fitTextLeft(r.txt[0], tx, 62); p.fill(C.N); fitTextLeft(r.txt[1], tx, 88);
        function fitTextLeft(t, x, y) { let sz = 15; p.textSize(sz); while (sz > 9 && p.textWidth(t) > W - 12 - x) p.textSize(--sz); p.text(t, x, y); }
        drawPlane(p, C, v);
        // Línea del corte.
        p.stroke(C.R); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 5]); p.line(v.X(r.c), v.box.y + 3, v.X(r.c), v.box.y + v.box.h - 3); p.drawingContext.setLineDash([]);
        const seg = (x0, y0, x1, y1, col, w = 3.5) => { p.stroke(col); p.strokeWeight(w); p.line(v.X(x0), v.Y(y0), v.X(x1), v.Y(y1)); };
        if (locked && !ok) {
          const t = targetYs(r); p.drawingContext.setLineDash([6, 5]);
          seg(r.xr[0], t[0], r.c, t[1], C.ok, 2.5); seg(r.c, t[2], r.xr[1], t[3], C.ok, 2.5); p.drawingContext.setLineDash([]);
        }
        const c1 = locked ? (ok ? C.ok : C.bad) : C.Z, c2 = locked ? (ok ? C.ok : C.bad) : C.N;
        seg(r.xr[0], s.ys[0], r.c, s.ys[1], c1); seg(r.c, s.ys[2], r.xr[1], s.ys[3], c2);
        // Puntos del corte.
        [[1, c1, 0], [2, c2, 1]].forEach(([k, col, d]) => { p.stroke(col); p.strokeWeight(2.5); p.fill(s.dots[d] ? col : C.card); p.circle(v.X(r.c), v.Y(s.ys[k]), 12); });
        // Asas.
        [0, 1, 2, 3].forEach(k => {
          if (locked) return;
          p.stroke(C.ink); p.strokeWeight(1.5); p.fill(drag === k ? C.ink : k < 2 ? C.Z : C.N);
          p.rect(hx(r, k) - (k === 1 ? 8 : k === 2 ? 0 : 4), v.Y(s.ys[k]) - 13, 8, 26, 3);
        });
        dotB.forEach(b => {
          const col = b.k ? C.N : C.Z;
          p.stroke(locked ? C.line : col); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
          fitText(p, `tramo ${b.k + 1} en x = ${numTxt(r.c)}: ${s.dots[b.k] ? '● lleno' : '○ vacío'}`, b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 13);
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = params.rounds[cur], s = st[cur], b = dotB.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (b) { s.dots[b.k] = !s.dots[b.k]; touch(); api.sfx?.tap?.(); return false; }
        if (!hitBox({ x: v.box.x - 10, y: v.box.y - 10, w: v.box.w + 20, h: v.box.h + 20 }, p.mouseX, p.mouseY)) return;
        const xc = v.X(r.c);
        if (Math.abs(p.mouseX - xc) < 24) drag = p.mouseX < xc ? 1 : 2;
        else if (Math.abs(p.mouseX - v.X(r.xr[0])) < 30) drag = 0;
        else if (Math.abs(p.mouseX - v.X(r.xr[1])) < 30) drag = 3;
        else drag = -1;
        if (drag >= 0) { p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (drag < 0 || locked) return;
        const r = params.rounds[cur], y = Math.max(r.yr[0], Math.min(r.yr[1], Math.round(v.toY(p.mouseY) * 2) / 2));
        if (y !== st[cur].ys[drag]) { st[cur].ys[drag] = y; touch(); }
        return false;
      };
      p.mouseReleased = () => { drag = -1; };
    }, 1.4);

    return {
      loaded: m.ready,
      getState: () => ({ rounds: st.map(s => ({ ys: s.ys.slice(), dots: s.dots.slice() })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, targetYs, targetDots };
})();
;
//#archivo js/games/dobla-negativos.js
// Dobla lo negativo (cálculo, función valor absoluto): está la gráfica de g y la meta es dibujar |g|. La
// gráfica viene partida en trozos por sus cortes con el eje x; tocar un trozo lo dobla como papel sobre el
// eje x (se refleja) y volver a tocarlo lo desdobla. |g| deja igual lo que está arriba y voltea lo de abajo.
// params = { rounds: [{ f, fTxt, xr, yr, roots: [x…] }] }   state = { folds: [[bool…]] }

GAMES['dobla-negativos'] = (() => {
  function pieces(r) {
    const cuts = [r.xr[0], ...r.roots, r.xr[1]];
    return cuts.slice(0, -1).map((a, k) => { const b = cuts[k + 1]; return { a, b, neg: r.f((a + b) / 2) < 0 }; });
  }
  const same = (fs, r) => !!fs && pieces(r).every((pc, k) => !!fs[k] === pc.neg);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.folds[i], r));
    return {
      ok,
      solution: params.rounds.map((r, i) => `${i + 1}) doblar ${pieces(r).filter(pc => pc.neg).map(pc => `(${numTxt(pc.a)}, ${numTxt(pc.b)})`).join(' y ')}`).join(' · '),
    };
  }

  function create(host, params, api) {
    const C = api.palette;
    const folds = params.rounds.map(r => pieces(r).map(() => false)), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 84 - 50, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 84, w, h }, r.xr, r.yr);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], fs = folds[cur], ok = same(fs, r), pcs = pieces(r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(folds[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, `Dibuja y = |${r.fTxt}|`, W / 2, 62, W - 24, 18);
        drawPlane(p, C, v);
        // Zona negativa sombreada.
        p.noStroke(); p.fill(p.color(C.I + '18')); p.rect(v.box.x + 2, v.Y(0), v.box.w - 4, v.box.y + v.box.h - 2 - v.Y(0));
        pcs.forEach((pc, k) => {
          const f = fs[k] ? x => -r.f(x) : r.f;
          if (fs[k]) { p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 5]); drawCurve(p, v, r.f, pc.a, pc.b, 80); p.drawingContext.setLineDash([]); }
          const good = fs[k] === pc.neg;
          p.stroke(locked ? (good ? C.ok : C.bad) : fs[k] ? C.N : k % 2 ? C.brand : C.Z); p.strokeWeight(4);
          drawCurve(p, v, f, pc.a, pc.b, 100);
        });
        r.roots.forEach(x => { p.noStroke(); p.fill(C.ink); p.circle(v.X(x), v.Y(0), 8); });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL);
        fitText(p, 'Toca un trozo para doblarlo sobre el eje x', W / 2, v.box.y + v.box.h + 22, W - 24, 13);
        if (locked && !ok) { p.fill(C.ok); p.textStyle(p.BOLD); fitText(p, grade({ folds }, { rounds: [r] }).solution.replace(/^1\) /, ''), W / 2, v.box.y + v.box.h + 44, W - 24, 13); }
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked || !hitBox(v.box, p.mouseX, p.mouseY)) return;
        const x = v.toX(p.mouseX), k = pieces(params.rounds[cur]).findIndex(pc => x >= pc.a && x <= pc.b);
        if (k < 0) return;
        folds[cur][k] = !folds[cur][k]; touched[cur] = true; api.ready(touched.every(Boolean)); api.sfx?.tap?.();
        return false;
      };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ folds: folds.map(a => a.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, pieces };
})();
;
//#archivo js/games/sellos-graficas.js
// Sellos de transformación (cálculo, transformaciones de funciones): en el plano está la gráfica base
// (√x, |x|, x², x³ o 1/x) y la fantasma de la meta, con su fórmula arriba. Cada sello transforma la gráfica
// actual: → ← (correr 1), ↑ ↓ (subir o bajar 1), ×2 y ×½ (estirar o encoger en vertical), reflejos en el
// eje x y en el eje y. Los sellos se apilan en orden (↶ quita el último): el orden importa, porque estirar
// después de subir también estira la subida.
// params = { rounds: [{ base, target: { A, B, C, D }, xr, yr }] }   (y = A·base(Bx + C) + D)
// state = { stamps: [[código…]] }

GAMES['sellos-graficas'] = (() => {
  const BASES = {
    sqrt: { f: Math.sqrt, wrap: s => (s === 'x' ? '√x' : `√(${s})`) },
    abs: { f: Math.abs, wrap: s => `|${s}|` },
    sq: { f: x => x * x, wrap: s => (s === 'x' ? 'x²' : `(${s})²`) },
    cube: { f: x => x * x * x, wrap: s => (s === 'x' ? 'x³' : `(${s})³`) },
    recip: { f: x => 1 / x, wrap: s => `1/${s === 'x' ? 'x' : `(${s})`}` },
  };
  const STAMPS = [
    { code: 'R', label: '→' }, { code: 'L', label: '←' }, { code: 'U', label: '↑' }, { code: 'D', label: '↓' },
    { code: 'V2', label: '×2' }, { code: 'Vh', label: '×½' }, { code: 'Fx', label: '⇅ x' }, { code: 'Fy', label: '⇆ y' },
  ];
  function apply(stamps) {
    const t = { A: 1, B: 1, C: 0, D: 0 };
    for (const s of stamps) {
      if (s === 'R') t.C -= t.B; else if (s === 'L') t.C += t.B;
      else if (s === 'U') t.D += 1; else if (s === 'D') t.D -= 1;
      else if (s === 'V2') { t.A *= 2; t.D *= 2; } else if (s === 'Vh') { t.A /= 2; t.D /= 2; }
      else if (s === 'Fx') { t.A = -t.A; t.D = -t.D; } else if (s === 'Fy') t.B = -t.B;
    }
    for (const k of 'ABCD') t[k] += 0;
    return t;
  }
  const fnOf = (base, t) => x => t.A * BASES[base].f(t.B * x + t.C) + t.D;
  function exprText(base, t) {
    const inner = (t.B === 1 ? 'x' : t.B === -1 ? '−x' : `${numTxt(t.B)}x`) + (t.C ? ` ${t.C < 0 ? '−' : '+'} ${numTxt(Math.abs(t.C))}` : '');
    const coef = t.A === 1 ? '' : t.A === -1 ? '−' : numTxt(t.A);
    return `y = ${coef}${BASES[base].wrap(inner)}${t.D ? ` ${t.D < 0 ? '−' : '+'} ${numTxt(Math.abs(t.D))}` : ''}`;
  }
  // Se compara la gráfica (no los números), porque |−x| = |x| y (−x)² = x².
  function sameGraph(base, t1, t2) {
    const f = fnOf(base, t1), g = fnOf(base, t2);
    for (let x = -8; x <= 8; x += 0.25) {
      const a = f(x), b = g(x);
      if (Number.isNaN(a) !== Number.isNaN(b) || Number.isFinite(a) !== Number.isFinite(b)) return false;
      if (Number.isFinite(a) && Math.abs(a - b) > 1e-9) return false;
    }
    return true;
  }
  const fits = (stamps, r) => !!stamps && sameGraph(r.base, apply(stamps), r.target);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => fits(state.stamps[i], r));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) ${exprText(r.base, r.target)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const stamps = params.rounds.map(() => []), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, btns = [];

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 84 - 160, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 84, w, h }, r.xr, r.yr);
      const items = [...STAMPS, { code: 'undo', label: '↶' }, { code: 'clear', label: '⌫' }];
      const bw = (W - 24 - 4 * 6) / 5, by = H - 2 * 44 - 4;
      btns = items.map((it, k) => ({ ...it, x: 12 + (k % 5) * (bw + 6), y: by + Math.floor(k / 5) * 46, w: bw, h: 40 }));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], t = apply(stamps[cur]), ok = fits(stamps[cur], r);
        drawTabs(p, C, tabs, cur, i => (locked ? (fits(stamps[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.mute); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, `meta: ${exprText(r.base, r.target)}`, W / 2, 62, W - 24, 17);
        drawPlane(p, C, v);
        const split = (f, col, w, dash) => {
          p.stroke(col); p.strokeWeight(w); if (dash) p.drawingContext.setLineDash(dash);
          drawCurve(p, v, f, v.xr[0], v.xr[1], r.base === 'recip' ? 400 : 240);
          p.drawingContext.setLineDash([]);
        };
        split(fnOf(r.base, { A: 1, B: 1, C: 0, D: 0 }), C.line, 2, null);
        split(fnOf(r.base, r.target), locked ? C.ok : C.mute, 5, [2, 8]);
        split(fnOf(r.base, t), locked ? (ok ? C.ok : C.bad) : C.brand, 3.5, null);
        // Fórmula actual y pila de sellos.
        const by = v.box.y + v.box.h + 20;
        p.noStroke(); p.fill(locked ? (ok ? C.ok : C.bad) : C.brand); p.textStyle(p.BOLD);
        fitText(p, exprText(r.base, t), W / 2, by, W - 24, 17);
        const list = stamps[cur].map(c => STAMPS.find(s => s.code === c).label).join('  ');
        p.fill(C.N); p.textStyle(p.NORMAL); fitText(p, list || 'sin sellos todavía', W / 2, by + 24, W - 24, 14);
        btns.forEach(b => {
          const tool = b.code === 'undo' || b.code === 'clear';
          p.stroke(locked ? C.line : tool ? C.I : C.R); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); fitText(p, b.label, b.x + b.w / 2, b.y + b.h / 2, b.w - 6, 17);
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (!b) return;
        const s = stamps[cur];
        if (b.code === 'undo') s.pop(); else if (b.code === 'clear') s.length = 0; else if (s.length < 12) s.push(b.code);
        touched[cur] = true; api.ready(touched.every(Boolean)); api.sfx?.tap?.();
        return false;
      };
    }, 1.55);

    return {
      loaded: m.ready,
      getState: () => ({ stamps: stamps.map(s => s.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, apply, exprText, fnOf, BASES };
})();
;
//#archivo js/games/espejo-diagonal.js
// El espejo diagonal (cálculo, función inversa): en el plano está la gráfica de f con algunos puntos
// marcados y el espejo y = x. Encima de cada punto hay una ficha que se arrastra (ajuste a enteros) hasta
// su reflejo: (a, b) pasa a (b, a). Las fichas colocadas se unen y, al comprobar, aparece la gráfica de f⁻¹.
// params = { rounds: [{ f, fTxt, pts: [[x, y]…], t: [t0, t1], range: [min, max] }] }  (t: tramo de f a dibujar)
// state = { pts: [[[x, y]…]] }

GAMES['espejo-diagonal'] = (() => {
  // Se compara como conjunto: no importa qué ficha llegó a cada reflejo.
  const key = ps => ps.map(([x, y]) => `${x},${y}`).sort().join(' ');
  const same = (qs, r) => !!qs && key(qs) === key(r.pts.map(([a, b]) => [b, a]));
  const good = (q, r) => !!q && r.pts.some(([a, b]) => q[0] === b && q[1] === a);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.pts[i], r));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) ${r.pts.map(([a, b]) => `(${numTxt(b)}, ${numTxt(a)})`).join(' ')}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const qs = params.rounds.map(r => r.pts.map(pt => pt.slice())), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = -1;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], side = Math.min(W - 24, H - 84 - 50);
      v = planeView({ x: (W - side) / 2, y: 84, w: side, h: side }, r.range, r.range);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], my = qs[cur], ok = same(my, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(qs[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.fill(C.Z);
        fitText(p, `f(x) = ${r.fTxt}`, W / 2, 62, W - 24, 18);
        drawPlane(p, C, v);
        p.stroke(C.R); p.strokeWeight(2); p.drawingContext.setLineDash([7, 6]);
        p.line(v.X(r.range[0]), v.Y(r.range[0]), v.X(r.range[1]), v.Y(r.range[1])); p.drawingContext.setLineDash([]);
        p.noStroke(); p.fill(C.R); p.textSize(12); p.textAlign(p.RIGHT, p.BOTTOM); p.text('y = x', v.X(r.range[1]) - 6, v.Y(r.range[1]) + 18);
        // f y, al comprobar, f⁻¹ (curva paramétrica (f(t), t)).
        const curveP = (fx, fy, col, w) => {
          p.stroke(col); p.strokeWeight(w); p.noFill();
          const ctx = p.drawingContext; ctx.save(); ctx.beginPath(); ctx.rect(v.box.x, v.box.y, v.box.w, v.box.h); ctx.clip();
          p.beginShape(); for (let k = 0; k <= 200; k++) { const t = r.t[0] + (r.t[1] - r.t[0]) * k / 200; p.vertex(v.X(fx(t)), v.Y(fy(t))); } p.endShape(); ctx.restore();
        };
        curveP(t => t, r.f, C.Z, 3);
        if (locked) curveP(r.f, t => t, C.ok, 3);
        r.pts.forEach(([a, b]) => { p.noStroke(); p.fill(C.Z); p.circle(v.X(a), v.Y(b), 10); });
        // Fichas del estudiante.
        if (!locked) { p.stroke(C.N); p.strokeWeight(2); p.noFill(); p.beginShape(); [...my].sort((u, w) => u[0] - w[0]).forEach(([x, y]) => p.vertex(v.X(x), v.Y(y))); p.endShape(); }
        my.forEach(([x, y], k) => {
          const g = good(my[k], r);
          p.stroke(C.ink); p.strokeWeight(2); p.fill(locked ? (g ? C.ok : C.bad) : drag === k ? C.ink : C.N); p.circle(v.X(x), v.Y(y), 18);
          if (drag === k) { p.noStroke(); p.fill(C.N); p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM); p.text(`(${numTxt(x)}, ${numTxt(y)})`, v.X(x), v.Y(y) - 12); }
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        fitText(p, 'Lleva cada ficha a su reflejo en el espejo y = x', W / 2, v.box.y + v.box.h + 22, W - 24, 13);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        drag = nearest(qs[cur].map(([x, y]) => ({ x: v.X(x), y: v.Y(y) })), p.mouseX, p.mouseY, 26);
        if (drag >= 0) return false;
      };
      p.mouseDragged = () => {
        if (drag < 0 || locked) return;
        const r = params.rounds[cur], cl = z => Math.max(r.range[0] + 1, Math.min(r.range[1] - 1, Math.round(z)));
        const q = [cl(v.toX(p.mouseX)), cl(v.toY(p.mouseY))], old = qs[cur][drag];
        if (q[0] !== old[0] || q[1] !== old[1]) { qs[cur][drag] = q; touched[cur] = true; api.ready(touched.every(Boolean)); }
        return false;
      };
      p.mouseReleased = () => { drag = -1; };
    }, 1.25);

    return {
      loaded: m.ready,
      getState: () => ({ pts: qs.map(a => a.map(q => q.slice())) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/cofre-candados.js
// El cofre de candados (cálculo, función inversa): f guarda un número en un cofre cerrando candados en
// orden (primero el de abajo). Para sacarlo hay que deshacer: tocar llaves (operaciones) que se prueban
// en el candado de arriba que siga cerrado, o sea del último al primero, con la operación contraria
// («medias y zapatos»). Las llaves elegidas arman la fórmula de f⁻¹ y una moneda de prueba muestra qué
// número devuelven. ↶ quita la última llave.
// params = { rounds: [{ fTxt, locks: [{ txt, f }], keys: [{ txt, tpl, f }], order: [i…], probe }] }
// state = { keys: [[i…]] }

GAMES['cofre-candados'] = (() => {
  const same = (seq, r) => !!seq && seq.length === r.order.length && r.order.every((k, j) => seq[j] === k);
  const formulaText = (keys, seq) => seq.reduce((inner, i) => keys[i].tpl.replace('□', inner).replace(/\(x\)/g, 'x'), 'x');

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.keys[i], r));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) ${r.order.map(k => r.keys[k].txt).join(', luego ')}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const seqs = params.rounds.map(() => []), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], tray = [], undo = null;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], cols = 3, cw = (W - 24 - (cols - 1) * 8) / cols, rows = Math.ceil((r.keys.length + 1) / cols);
      const y0 = H - rows * 48 - 4;
      tray = r.keys.map((k, i) => ({ i, x: 12 + (i % cols) * (cw + 8), y: y0 + Math.floor(i / cols) * 48, w: cw, h: 42 }));
      const j = r.keys.length; undo = { x: 12 + (j % cols) * (cw + 8), y: y0 + Math.floor(j / cols) * 48, w: cw, h: 42 };
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], seq = seqs[cur], ok = same(seq, r), n = r.locks.length;
        drawTabs(p, C, tabs, cur, i => (locked ? (same(seqs[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, `f(x) = ${r.fTxt}`, W / 2, 62, W - 24, 18);
        // Cofre con la pila de candados (el último cerrado queda arriba).
        const top = 90, lh = Math.max(24, Math.min(34, (tray[0].y - top - 62 - 70) / n - 6)), chestW = Math.min(150, W * 0.42), cx = 12 + chestW / 2;
        const chestY = top + n * (lh + 6) + 6;
        const open = locked && ok;
        p.stroke(C.N); p.strokeWeight(2.5); p.fill(C.card);
        p.rect(12, chestY, chestW, 62, 8);
        p.fill(C.N); p.noStroke(); p.rect(12, chestY + (open ? -20 : 0), chestW, 16, 8, 8, 0, 0);
        p.fill(C.bg); p.circle(cx, chestY + 38, 12);
        p.fill(open ? C.ok : C.mute); p.textSize(13); p.text(open ? `¡${numTxt(r.probe)}!` : 'x', cx, chestY + 38);
        for (let k = 0; k < n; k++) {
          const li = n - 1 - k, y = top + k * (lh + 6), tried = seq[k];
          const col = locked ? (tried === r.order[k] ? C.ok : C.bad) : tried != null ? C.Z : C.R;
          p.stroke(col); p.strokeWeight(2); p.fill(C.card); p.rect(cx - chestW / 2 + 10, y, chestW - 20, lh, 8);
          p.noStroke(); p.fill(C.ink); fitText(p, `🔒 ${r.locks[li].txt}`, cx, y + lh / 2, chestW - 28, 15);
          if (tried != null) {
            p.stroke(C.Z); p.strokeWeight(2); p.line(12 + chestW + 2, y + lh / 2, 12 + chestW + 18, y + lh / 2);
            p.noStroke(); p.fill(C.Z); p.textAlign(p.LEFT, p.CENTER); fitTextL(`🔑 ${r.keys[tried].txt}`, 12 + chestW + 22, y + lh / 2, W - 12 - (12 + chestW + 22)); p.textAlign(p.CENTER, p.CENTER);
          }
        }
        function fitTextL(t, x, y, maxW) { let sz = 15; p.textSize(sz); while (sz > 9 && p.textWidth(t) > maxW) p.textSize(--sz); p.text(t, x, y); }
        // Fórmula de f⁻¹ y moneda de prueba.
        const by = chestY + 62 + 22;
        const fx = r.locks.reduce((acc, l) => l.f(acc), r.probe), back = seq.reduce((acc, i) => r.keys[i].f(acc), fx);
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.fill(locked ? (ok ? C.ok : C.bad) : C.brand);
        fitText(p, `tus llaves: f⁻¹(x) = ${formulaText(r.keys, seq)}`, W / 2, by, W - 24, 15);
        p.fill(C.mute); p.textStyle(p.NORMAL);
        fitText(p, `moneda: guardo ${numTxt(r.probe)} → f da ${numTxt(+fx.toFixed(3))} → tus llaves devuelven ${Number.isFinite(back) ? numTxt(+back.toFixed(3)) : '¿?'}`, W / 2, by + 22, W - 24, 12);
        tray.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); fitText(p, `🔑 ${r.keys[b.i].txt}`, b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 15);
        });
        p.stroke(locked ? C.line : C.I); p.strokeWeight(1.5); p.fill(C.card); p.rect(undo.x, undo.y, undo.w, undo.h, 10);
        p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(17); p.text('↶', undo.x + undo.w / 2, undo.y + undo.h / 2);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = params.rounds[cur], seq = seqs[cur];
        if (hitBox(undo, p.mouseX, p.mouseY)) { seq.pop(); api.ready(seqs.every((s, i) => s.length === params.rounds[i].locks.length)); api.sfx?.tap?.(); return false; }
        const b = tray.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (!b || seq.length >= r.locks.length) return;
        seq.push(b.i); touched[cur] = true; api.sfx?.tap?.();
        api.ready(seqs.every((s, i) => s.length === params.rounds[i].locks.length));
        return false;
      };
    }, 1.6);

    return {
      loaded: m.ready,
      getState: () => ({ keys: seqs.map(s => s.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, formulaText };
})();
;
//#archivo js/games/escala-solucion.js
// Escala la solución (todos los cursos; reemplaza a ejercicios de escribir un número; spec 2026-11-17-sin-escribir):
// la solución es una pared que se escala de abajo hacia arriba. En cada nivel hay dos o tres agarres, cada uno con un
// paso posible del razonamiento; solo uno es válido. El estudiante elige un agarre por nivel y la cuerda une su ruta
// hasta la bandera. No hay que escribir ni calcular rápido: hay que decidir qué paso se justifica. Nada se revela
// hasta comprobar; entonces se ve la ruta buena.
// params = { rounds: [{ levels: [[paso válido, paso falso, paso falso?], …] }] }   (el válido se escribe primero; el
//   juego los baraja)      state = { rounds: [{ pick: [opción elegida por nivel, −1 si falta] }] }

GAMES['escala-solucion'] = (() => {
  // Orden de los agarres de un nivel, siempre igual para la misma ronda. shuffledOrder nunca da el orden original, y con
  // dos agarres eso dejaría el válido siempre a la derecha: aquí se rota según el texto del nivel.
  const orderOf = (r, l) => {
    const n = r.levels[l].length, seed = `${l}:${r.levels[l].join('|')}`;
    let h = 2166136261;
    for (const c of seed) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
    const k = h % n;   // rotación: el válido cae parejo en cada lugar
    return Array.from({ length: n }, (_, i) => (i + k) % n);
  };
  // Un nivel de tres agarres con textos largos ocupa dos renglones (dos arriba y uno abajo): así se leen en 300 px.
  const rowsOf = lv => (lv.length === 3 && lv.some(t => t.length > 14) ? 2 : 1);
  // Cada paso que es una ecuación o una cuenta se dibuja (y se muestra en la respuesta) como fórmula.
  const stepTex = t => (typeof mathStep === 'function' ? mathStep(t) : t);
  const center = b => [b.x + b.w / 2, b.y + b.h / 2];
  const pending = pick => pick.indexOf(-1) < 0 ? pick.length : pick.indexOf(-1);
  function traceStep(pick, level, option) {
    if (level < 0 || option < 0 || level > pending(pick) || level >= pick.length || pick[level] === option) return false;
    pick[level] = option;
    pick.fill(-1, level + 1);
    return true;
  }
  const choose = (G, level, option) => {
    if (traceStep(G.s.pick, level, option)) G.touch();
  };
  const origin = G => [G.W / 2, G.H - 45];
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ pick: r.levels.map(() => -1) }),
    ok: (s, r) => r.levels.every((_, l) => s.pick?.[l] === 0),
    answered: (s, r) => r.levels.every((_, l) => (s.pick?.[l] ?? -1) >= 0),
    // Para la respuesta (HTML con KaTeX y pie del juego): cada paso con matemática va como TeX.
    solution: r => r.levels.map(l => stepTex(l[0])).join('  →  '),
    prompt: () => 'Traza los pasos del razonamiento',
    keyboard: 'Usa las flechas izquierda y derecha para elegir un paso, arriba y abajo para cambiar de nivel y espacio para unirlo.',
    enter(G) { G.trace = null; delete G.focus; },
    foot: (r, s) => (s.pick.some(v => v < 0) ? 'Une una estación por nivel desde la base' : 'Toca un paso anterior para corregir la ruta'),
    layout(G) {
      const { W, H } = G, units = Math.max(...G.params.rounds.map(r => r.levels.reduce((t, lv) => t + rowsOf(lv), 0))), top = 91, bottom = H - 63, u = (bottom - top) / units, h = Math.min(48, u - 5);
      // Nivel 0 abajo; cada nivel ocupa uno o dos renglones.
      G.hold = (r, l, k) => {
        const lv = r.levels[l], rows = rowsOf(lv), below = r.levels.slice(0, l).reduce((t, x) => t + rowsOf(x), 0);
        const yTop = bottom - (below + rows) * u + (u - h) / 2;
        if (rows === 2) { const w = (W - 44 - 8) / 2; return k < 2 ? { x: 32 + k * (w + 8), y: yTop, w, h } : { x: 32 + (W - 44 - w) / 2, y: yTop + u, w, h }; }
        const m = lv.length, w = (W - 44 - (m - 1) * 8) / m;
        return { x: 32 + k * (w + 8), y: yTop, w, h };
      };
    },
    draw(G) {
      const { p, C, W, s, r } = G, n = r.levels.length;
      const start = origin(G), pts = [start];
      for (let l = 0; l < n; l++) {
        const o = orderOf(r, l), want = G.locked ? 0 : s.pick[l], k = o.indexOf(want);
        if (want >= 0 && k >= 0) pts.push(center(G.hold(r, l, k))); else break;
      }
      if (pts.length > 1) { p.noFill(); p.stroke(G.locked ? C.ok : C.brand); p.strokeWeight(3); p.beginShape(); pts.forEach(q => p.vertex(q[0], q[1])); p.endShape(); }
      if (G.trace && !G.locked) {
        p.drawingContext.setLineDash([4, 5]); p.stroke(C.brand); p.strokeWeight(2);
        p.line(...pts.at(-1), ...G.trace);
        p.drawingContext.setLineDash([]);
      }
      p.fill(C.card); p.stroke(C.brand); p.strokeWeight(2); p.circle(...start, 21);
      p.noStroke(); p.fill(C.brand); p.circle(...start, 6);
      for (let l = 0; l < n; l++) {
        const o = orderOf(r, l), b0 = G.hold(r, l, 0);
        p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.CENTER); p.text(l + 1, 18, b0.y + b0.h / 2 + (rowsOf(r.levels[l]) === 2 ? (G.hold(r, l, 2).y - b0.y) / 2 : 0));
        o.forEach((opt, k) => {
          const b = G.hold(r, l, k), sel = s.pick[l] === opt, good = opt === 0;
          const fill = G.locked ? (good ? C.ok : sel ? C.bad : C.card) : C.card;
          const active = !G.locked && (sel || (G.focus?.level === l && G.focus.option === k));
          drawPracticePanel(p, b, fill, active ? C.brand : C.line, 8, active ? 2 : 1);
          p.noStroke(); p.fill(inkOn(fill, C.ink)); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
          // Un paso largo se parte en dos renglones.
          const txt = r.levels[l][opt], tx = stepTex(txt); p.textSize(13);
          const parts = typeof stepLines === 'function' ? stepLines(txt) : [txt];
          if (parts.length === 2 && typeof drawFormulaCtx === 'function') parts.forEach((q, j) => { const f = stepTex(q); if (f !== q) drawFormulaCtx(p.drawingContext, f, b.x + b.w / 2, b.y + b.h / 2 + (j ? 9 : -8), { size: 13, maxW: b.w - 10, maxH: b.h / 2 - 2, weight: 700 }); else {
            // Frase corrida que no cabe en un renglón de la ficha: va en dos renglones más chicos (antes se salía y pisaba la ficha vecina).
            p.textSize(12);
            if (p.textWidth(q) <= b.w - 8 || j) fitText(p, q, b.x + b.w / 2, b.y + b.h / 2 + (j ? 9 : -8), b.w - 8, 12);
            else {
              let size = 10.5, lines;
              do { p.textSize(size); lines = wrapWords(q, b.w - 10, t => p.textWidth(t)); } while ((lines.length > 2 || lines.some(t => p.textWidth(t) > b.w - 8)) && (size -= 0.5) > 6);
              lines.slice(0, 2).forEach((t, i) => p.text(t, b.x + b.w / 2, b.y + b.h / 2 - (lines.length > 1 ? 15 - i * (size + 1) : 8)));
            }
          } });
          else if (tx !== txt) drawFormulaCtx(p.drawingContext, tx, b.x + b.w / 2, b.y + b.h / 2 + 1, { size: 15, maxW: b.w - 10, maxH: b.h - 6, weight: 700 });
          else {
            // Texto corrido: se parte en los renglones que hagan falta y se encoge hasta caber en la ficha, a lo ancho y
            // a lo alto (antes una frase larga se salía de su ficha y pisaba la de al lado en celulares angostos).
            let size = 13, lines;
            do { p.textSize(size); lines = wrapWords(txt, b.w - 12, t => p.textWidth(t)); }
            while ((lines.length * size * 1.15 > b.h - 6 || lines.some(t => p.textWidth(t) > b.w - 8)) && --size > 7);
            const lh = size * 1.15, y0 = b.y + b.h / 2 - ((lines.length - 1) * lh) / 2 + 1;
            lines.forEach((t, j) => p.text(t, b.x + b.w / 2, y0 + j * lh));
          }
        });
      }
    },
    press(G, x, y) {
      const r = G.r;
      delete G.focus;
      if (Math.hypot(x - origin(G)[0], y - origin(G)[1]) <= 22) { G.trace = [x, y]; return true; }
      for (let l = 0; l <= Math.min(pending(G.s.pick), r.levels.length - 1); l++) {
        const o = orderOf(r, l), k = o.findIndex((_, j) => hitBox(G.hold(r, l, j), x, y));
        if (k >= 0) { choose(G, l, o[k]); G.trace = [x, y]; return true; }
      }
      return false;
    },
    drag(G, x, y) {
      if (!G.trace) return false;
      G.trace = [x, y];
      const l = pending(G.s.pick);
      if (l < G.r.levels.length) {
        const o = orderOf(G.r, l), k = o.findIndex((_, j) => hitBox(G.hold(G.r, l, j), x, y));
        if (k >= 0) choose(G, l, o[k]);
      }
      return true;
    },
    release(G, x, y) { this.drag(G, x, y); G.trace = null; },
    cancel(G) { G.trace = null; },
    key(G, key) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(key)) return false;
      const end = Math.min(pending(G.s.pick), G.r.levels.length - 1);
      const f = G.focus ??= { level: end, option: 0 };
      const size = G.r.levels[f.level].length;
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        f.level = Math.max(0, Math.min(end, f.level + (key === 'ArrowUp' ? 1 : -1)));
        f.option = 0;
      } else if (key === 'ArrowLeft' || key === 'ArrowRight') {
        f.option = (size + f.option + (key === 'ArrowRight' ? 1 : -1)) % size;
      } else {
        choose(G, f.level, orderOf(G.r, f.level)[f.option]);
        f.level = Math.min(pending(G.s.pick), G.r.levels.length - 1);
        f.option = 0;
      }
      return true;
    },
    demo(G) {
      const l = pending(G.s.pick);
      if (l >= G.r.levels.length) {
        const option = orderOf(G.r, 0).findIndex(i => i !== G.s.pick[0]);
        const [x, y] = center(G.hold(G.r, 0, option));
        return { from: { x, y } };
      }
      const before = l ? center(G.hold(G.r, l - 1, orderOf(G.r, l - 1).indexOf(G.s.pick[l - 1]))) : origin(G);
      const end = center(G.hold(G.r, l, 0));
      return { from: { x: before[0], y: before[1] }, to: { x: (before[0] + end[0]) / 2, y: (before[1] + end[1]) / 2 } };
    },
    peek: G => ({ holds: G.r.levels.map((_, l) => orderOf(G.r, l).map((opt, k) => ({ opt, ...G.hold(G.r, l, k) }))) }),
  });
  return { ...game, orderOf, traceStep };
})();
