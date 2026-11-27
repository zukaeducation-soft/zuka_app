// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/conjuntos-kit.js
// Piezas de dibujo del mundo «Teoría de Conjuntos» (spec 2026-11-26-conjuntos-lamina). Todos los juegos del mundo
// usan el lenguaje de su lámina: el universo es un panel, cada conjunto una membrana (curva con brillo y relleno
// translúcido), cada elemento una píldora, y abajo una franja con la escritura formal en letra de libro.
// Va después de kit.js (usa fitText, drawTile, inkOn).
const SK = (() => {
  const SERIF = 'serif';   // una sola familia: p5 pone comillas a los nombres con espacios
  const al = (p, col, a) => { const c = p.color(col); c.setAlpha(a); return c; };
  // Colores de los conjuntos A, B y C: `line` para la curva y el relleno, `ink` para escribir su nombre.
  const sets = C => [{ line: C.mint, ink: C.Q }, { line: C.coral, ink: C.I }, { line: C.sky, ink: C.Z }];
  // Valor dibujado que se acerca suave a su destino (solo para dibujar; la lógica usa el valor real).
  const ease = (o, k, to, dt, sp = 13) => { const v = o[k] ?? to; return (o[k] = Math.abs(to - v) < 0.4 ? to : v + (to - v) * Math.min(1, dt * sp)); };
  const dash = (p, on) => p.drawingContext.setLineDash?.(on ? [5, 4] : []);

  // Texto en cursiva de libro (nombres de conjuntos, notación corta). Deja puesta la letra del juego.
  function serif(p, txt, x, y, size, col, maxW) {
    p.noStroke(); p.fill(col); p.textFont(SERIF); p.textStyle(p.BOLDITALIC); p.textAlign(p.CENTER, p.CENTER); p.textSize(size);
    if (maxW) while (size > 9 && p.textWidth(txt) > maxW) p.textSize(--size);
    p.text(txt, x, y);
    p.textFont('system-ui'); p.textStyle(p.BOLD);
  }
  // Panel (el universo, una pizarra): tarjeta translúcida con borde fino. o = { col, r, u (rótulo U), alpha }.
  function panel(p, C, b, o = {}) {
    p.stroke(o.col ?? C.line); p.strokeWeight(o.col ? 1.6 : 1); p.fill(al(p, C.card, o.alpha ?? 225)); p.rect(b.x, b.y, b.w, b.h, o.r ?? 14);
    if (o.u) serif(p, 'U', b.x + 14, b.y + 14, 14, C.mute);
  }
  // Membrana: la curva de un conjunto, con brillo por fuera y relleno translúcido. o = { fill (alfa), w, dash }.
  function membrane(p, C, cx, cy, rx, ry, col, o = {}) {
    p.noFill(); p.stroke(al(p, col, 36)); p.strokeWeight(9); p.ellipse(cx, cy, 2 * rx, 2 * ry);
    p.fill(al(p, col, o.fill ?? 34)); p.stroke(col); p.strokeWeight(o.w ?? 2);
    if (o.dash) dash(p, true);
    p.ellipse(cx, cy, 2 * rx, 2 * ry);
    dash(p, false); p.noStroke();
  }
  // Nombre de un conjunto: letra en cursiva dentro de un disco con el borde de su color.
  function tag(p, C, txt, x, y, set, size = 15) {
    p.stroke(set.line); p.strokeWeight(1.5); p.fill(C.card); p.circle(x, y, size + 13);
    serif(p, txt, x, y, size, set.ink);
  }
  // Píldora de un elemento. o = { state: 'idle' | 'on' | 'ok' | 'bad' | 'ghost', col (color del conjunto), sel, k, size, ink }.
  function chip(p, C, b, txt, o = {}) {
    const k = o.k ?? 1, w = b.w * k, h = b.h * k, x = b.x + (b.w - w) / 2, y = b.y + (b.h - h) / 2, r = Math.min(h / 2, o.r ?? 99);
    const st = o.state ?? 'idle', col = st === 'bad' ? C.bad : st === 'ok' ? C.ok : o.col ?? C.mint;
    if (st === 'ghost') { p.noFill(); p.stroke(C.line); p.strokeWeight(1.2); dash(p, true); p.rect(x, y, w, h, r); dash(p, false); p.noStroke(); return; }
    if (o.sel) { p.noFill(); p.stroke(C.brand); p.strokeWeight(2); p.rect(x - 3, y - 3, w + 6, h + 8, r + 3); }
    p.noStroke(); p.fill(st === 'idle' ? C.line : al(p, col, 150)); p.rect(x, y + 2, w, h, r);
    p.fill(C.halo); p.rect(x, y, w, h, r);
    if (st !== 'idle') { p.fill(al(p, col, 56)); p.rect(x, y, w, h, r); }
    p.noFill(); p.stroke(st === 'idle' ? C.line : col); p.strokeWeight(st === 'idle' ? 1 : 1.6); p.rect(x, y, w, h, r);
    p.noStroke();
    if (txt != null && txt !== '') {
      p.fill(o.ink ?? C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      fitText(p, String(txt), b.x + b.w / 2, b.y + b.h / 2 + 1, w - 12, o.size ?? 13, h - 4);
    }
  }
  // Franja de escritura formal: tarjeta con barra de color, rótulo pequeño y la fórmula (TeX entre $…$).
  // o = { kicker, raw (rótulo sin pasar a mayúsculas), col, ink, size, right (ancho reservado a la derecha) }.
  function formal(p, C, b, tex, o = {}) {
    panel(p, C, b, { r: 12 });
    p.noStroke(); p.fill(o.col ?? C.mint); p.rect(b.x + 1, b.y + 9, 3, b.h - 18, 2);
    const w = b.w - 26 - (o.right ?? 0), cx = b.x + 16 + w / 2;
    if (o.kicker) {
      const ctx = p.drawingContext;
      p.fill(C.mute); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.CENTER); p.textSize(10);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '1px';
      p.text(o.raw ? String(o.kicker) : String(o.kicker).toUpperCase(), b.x + 14, b.y + 13);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }
    p.fill(o.ink ?? C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
    fitText(p, tex, cx, b.y + b.h / 2 + (o.kicker ? 8 : 1), w, o.size ?? 19, b.h - (o.kicker ? 24 : 10));
  }
  // Rótulo del enunciado: barrita del color del mundo y texto en versalitas.
  function kicker(p, C, txt, x, y) { drawKicker(p, C, txt, x, y, { bar: C.mint, col: C.Q }); p.noStroke(); }
  // Zonas de un Venn de círculos (máscara de bits: 1 = A, 2 = B, 4 = C; 0 = fuera de todos), recortadas con su borde
  // exacto. o = { col, alpha } rellena; con o.hatch, raya en diagonal (marca una zona sin taparla). Se pinta con el
  // contexto del lienzo y no con p.fill: al salir del recorte el contexto vuelve a su color anterior, y p5, que recuerda
  // el último relleno, se saltaría el siguiente p.fill del mismo color.
  function zones(p, box, circles, masks, o = {}) {
    const css = al(p, o.col, o.alpha ?? 255).toString();
    const ctx = p.drawingContext;
    for (const m of masks) {
      ctx.save(); ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(box.x, box.y, box.w, box.h, 14); else ctx.rect(box.x, box.y, box.w, box.h);
      ctx.clip();
      circles.forEach((c, k) => {
        const inn = !!(m & (1 << k));
        ctx.beginPath(); if (!inn) ctx.rect(box.x, box.y, box.w, box.h);
        ctx.moveTo(c.x + c.r, c.y); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.clip(inn ? 'nonzero' : 'evenodd');
      });
      if (o.hatch) {
        ctx.strokeStyle = css; ctx.lineWidth = 1.6; ctx.setLineDash([]); ctx.beginPath();
        for (let i = -box.h; i < box.w; i += o.gap ?? 9) { ctx.moveTo(box.x + i, box.y + box.h); ctx.lineTo(box.x + i + box.h, box.y); }
        ctx.stroke();
      } else { ctx.fillStyle = css; ctx.fillRect(box.x, box.y, box.w, box.h); }
      ctx.restore();
    }
  }
  // Zona de un punto en un Venn de círculos (máscara de bits).
  const maskAt = (circles, x, y) => circles.reduce((m, c, k) => m | (Math.hypot(x - c.x, y - c.y) < c.r ? 1 << k : 0), 0);
  // Dos círculos cruzados dentro de una caja.
  function venn2(box, k = 0.6, dy = 0) {
    const r = Math.min(box.w / (2 + 2 * k + 0.5), box.h / 2.35), cx = box.x + box.w / 2, cy = box.y + box.h / 2 + dy;
    return [{ x: cx - r * k, y: cy, r }, { x: cx + r * k, y: cy, r }];
  }
  // Lista por extensión en TeX: setTex('V', ['a', 'e']) → «$V = \{\text{a}, \text{e}\}$»; vacía → llaves vacías.
  const setTex = (name, xs) => `$${name} = \\{${xs.length ? xs.map(x => `\\text{${x}}`).join(', ') : '\\ \\ '}\\}$`;

  return { al, sets, ease, serif, panel, membrane, tag, chip, formal, kicker, zones, maskAt, venn2, setTex };
})();
;
//#archivo js/games/dibuja-intervalo.js
// Dibuja el intervalo (lección 1.1): dos asas sobre la recta que se arrastran (ajuste a enteros);
// tocar un asa alterna extremo lleno (incluido) / vacío (excluido). El conjunto se muestra en notación.
// params = { min, max, a, b, aClosed, bClosed, set (texto) }
// state = { left, right, leftClosed, rightClosed }  (las asas pueden cruzarse; se normalizan al calificar)

GAMES['dibuja-intervalo'] = (() => {
  const norm = s => (s.left <= s.right
    ? s
    : { left: s.right, right: s.left, leftClosed: s.rightClosed, rightClosed: s.leftClosed });

  function grade(state, params) {
    const s = norm({ left: 0, right: 0, ...state });
    const ok = s.left === params.a && s.right === params.b && s.leftClosed === params.aClosed && s.rightClosed === params.bClosed;
    const br = (c, side) => (side === 'l' ? (c ? '[' : '(') : (c ? ']' : ')'));
    return { ok, solution: `$${br(params.aClosed, 'l')}${params.a},\\ ${params.b}${br(params.bClosed, 'r')}$` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { left: params.min + 1, right: params.max - 1, leftClosed: true, rightClosed: true };
    let locked = false, map = null, lineY = 0, W = 0, drag = null, moved = false;
    const R = 13;

    function layout(w, h) { W = w; lineY = h * 0.55; map = lineMap(params.min, params.max, 26, w - 26); }
    const handleX = k => map.toPx(st[k]);

    const m = mountSketch(host, (p, size) => {
      p.setup = () => {
        p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h);
        // Las asas ya forman un intervalo válido: se puede comprobar desde que el lienzo existe.
        api.ready(true);
      };
      p.onResize = () => layout(size.w, size.h);

      function handle(x, closed, color) {
        p.stroke(color); p.strokeWeight(3); p.fill(closed ? color : C.bg); p.circle(x, lineY, R * 2);
      }

      p.draw = () => {
        p.background(C.bg);
        const lo = Math.min(st.left, st.right), hi = Math.max(st.left, st.right);
        // Enunciado y notación que se va armando.
        drawKicker(p, C, 'Dibuja el conjunto', W / 2, 16, { center: true });
        p.noStroke(); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD);
        p.fill(C.ink); p.textSize(22); p.text(params.set, W / 2, 28);
        const s = norm(st), br = (c, side) => (side === 'l' ? (c ? '[' : '(') : (c ? ']' : ')'));
        drawPill(p, C, `${br(s.leftClosed, 'l')}${s.left}, ${s.right}${br(s.rightClosed, 'r')}`.replace(/-/g, '−'), W / 2, 78, C.sun, 18);
        // Segmento sombreado y recta.
        p.noStroke(); p.fill(C.sun + '73'); p.rect(map.toPx(lo), lineY - 12, map.toPx(hi) - map.toPx(lo), 24, 6);
        p.stroke(C.ink); p.strokeWeight(3); p.line(map.toPx(params.min) - 6, lineY, map.toPx(params.max) + 6, lineY);
        p.textAlign(p.CENTER, p.TOP); p.textSize(13); p.textStyle(p.BOLD);
        for (let v = params.min; v <= params.max; v++) {
          p.stroke(v === 0 ? C.sun : C.ink); p.strokeWeight(2); p.line(map.toPx(v), lineY - 7, map.toPx(v), lineY + 7);
          p.noStroke(); p.fill(v === 0 ? C.N : v < 0 ? C.I : C.ink); p.text(String(v).replace('-', '−'), map.toPx(v), lineY + 14);
        }
        if (locked) {
          // La respuesta correcta en verde, bajo las asas del estudiante.
          p.stroke(C.ok); p.strokeWeight(5); p.line(map.toPx(params.a), lineY + 40, map.toPx(params.b), lineY + 40);
          p.stroke(C.ok); p.strokeWeight(3); p.fill(params.aClosed ? C.ok : C.bg); p.circle(map.toPx(params.a), lineY + 40, 18);
          p.fill(params.bClosed ? C.ok : C.bg); p.circle(map.toPx(params.b), lineY + 40, 18);
        }
        p.stroke(C.brand); p.strokeWeight(5); p.line(map.toPx(lo), lineY, map.toPx(hi), lineY);
        const good = grade(st, params).ok;
        handle(handleX('left'), st.leftClosed, locked ? (good ? C.ok : C.bad) : (drag === 'left' ? C.ink : C.brand));
        handle(handleX('right'), st.rightClosed, locked ? (good ? C.ok : C.bad) : (drag === 'right' ? C.ink : C.brand));
        p.noStroke(); p.fill(C.mute); p.textSize(12); p.textAlign(p.CENTER, p.TOP);
        p.text('Arrastra las asas · toca una para llenarla o vaciarla', W / 2, lineY + 60 + (locked ? 10 : 0));
      };

      p.mousePressed = () => {
        if (locked) return;
        const k = ['left', 'right'].sort((a, b) => Math.abs(p.mouseX - handleX(a)) - Math.abs(p.mouseX - handleX(b)))
          .find(k => Math.hypot(p.mouseX - handleX(k), p.mouseY - lineY) < R + 10);
        if (k) { drag = k; moved = false; return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        const v = Math.round(Math.max(params.min, Math.min(params.max, map.toVal(p.mouseX))));
        if (v !== st[drag]) { st[drag] = v; moved = true; }
        return false;
      };
      p.mouseReleased = () => {
        if (!drag) return;
        if (!moved) { st[drag + 'Closed'] = !st[drag + 'Closed']; api.sfx?.tap?.(); }
        drag = null;
        return false;
      };
    }, 0.8);

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
//#archivo js/games/mide-altura.js
// Mide la altura (trigonometría, medición indirecta): un edificio, un árbol o un faro de altura conocida.
// Con elevación se arrastra al topógrafo por el suelo hasta que vea la cima con el ángulo pedido; con
// depresión, el vigía está arriba del faro y se arrastra el barco. El ángulo y la distancia se ven en
// vivo, a escala. Rondas con pestañas.
// params = { rounds: [{ kind: 'edificio' | 'arbol' | 'faro', h, angle, mode?: 'elev' | 'dep', maxD }] }
// state = { ds: [metros | null] }

GAMES['mide-altura'] = (() => {
  const angleAt = (h, d) => Math.atan2(h, d) * 180 / Math.PI;
  const STEP = 0.1;   // metros: arrastrar acerca, los botones − / + afinan
  const NAMES = { edificio: 'la azotea del edificio', arbol: 'la copa del árbol', faro: 'el barco desde el faro' };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.ds?.[i] != null && Math.abs(angleAt(r.h, state.ds[i]) - r.angle) <= 1);
    const solution = params.rounds.map(r => `$d = \\frac{${r.h}}{\\tan ${r.angle}^\\circ} \\approx ${(r.h / Math.tan(r.angle * Math.PI / 180)).toFixed(2)}$ m`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { ds: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], groundY = 0, objX = 0, s = 1, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      groundY = h - 92; objX = w - 46;
      btns = [{ d: STEP, x: 12, y: h - 38, w: 40, h: 30, t: '−' }, { d: -STEP, x: w - 52, y: h - 38, w: 40, h: 30, t: '+' }];
    }
    const scaleFor = r => Math.min((objX - 24) / r.maxD, (groundY - 110) / r.h);
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(st.ds.every(d => d !== null));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function object(r, topY) {
        const x = objX;
        if (r.kind === 'edificio') {
          p.noStroke(); p.fill(C.line); p.rect(x - 18, topY, 36, groundY - topY, 3);
          p.fill(C.N + '88'); for (let y = topY + 8; y < groundY - 10; y += 14) { p.rect(x - 12, y, 8, 7); p.rect(x + 4, y, 8, 7); }
        } else if (r.kind === 'arbol') {
          p.noStroke(); p.fill('#8A5A3B'); p.rect(x - 5, topY + (groundY - topY) * 0.45, 10, (groundY - topY) * 0.55);
          p.fill(C.Q); p.circle(x, topY + (groundY - topY) * 0.32, (groundY - topY) * 0.64);
        } else {
          p.noStroke(); p.fill(C.ink); p.quad(x - 12, groundY, x + 12, groundY, x + 7, topY, x - 7, topY);
          p.fill(C.I); for (let k = 1; k <= 3; k++) p.rect(x - 11 + k, groundY - k * (groundY - topY) / 4, 22 - 2 * k, 8);
          p.fill(C.N); p.circle(x, topY - 6, 12);
        }
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], dep = r.mode === 'dep', d = st.ds[cur];
        s = scaleFor(r);
        const topY = groundY - r.h * s, good = !VELO.on && d !== null && Math.abs(angleAt(r.h, d) - r.angle) <= 1;
        tabs.forEach((t, i) => {
          const di = st.ds[i], ok = di !== null && Math.abs(angleAt(params.rounds[i].h, di) - params.rounds[i].angle) <= 1;
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : di !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(14); p.textAlign(p.LEFT, p.TOP);
        p.text(dep ? `Mueve el barco hasta que el vigía lo vea ${r.angle}° por debajo de la horizontal` : `Camina hasta ver ${NAMES[r.kind]} a ${r.angle}° de elevación`, 12, 44, W - 24, 44);

        // Suelo o mar, el objeto y su altura.
        p.noStroke(); p.fill(dep ? C.Z + '33' : C.line + '66'); p.rect(0, groundY, W, H - groundY);
        p.stroke(C.mute); p.strokeWeight(2); p.line(0, groundY, W, groundY);
        object(r, topY);
        p.noStroke(); p.fill(C.I); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.RIGHT, p.CENTER);
        p.text(`${r.h} m`, objX - 24, (topY + groundY) / 2);

        // El observador (o el barco) en la distancia elegida.
        const dd = d ?? r.maxD * 0.5, x = objX - dd * s, col = locked ? (good ? C.ok : C.bad) : C.brand;
        if (dep) {
          p.noStroke(); p.fill(col); p.quad(x - 16, groundY + 4, x + 16, groundY + 4, x + 11, groundY + 14, x - 11, groundY + 14);
          p.stroke(col); p.strokeWeight(2); p.line(x, groundY + 4, x, groundY - 14);
          p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([5, 5]); p.line(objX, topY, 12, topY); p.drawingContext.setLineDash([]);
          p.stroke(C.N); p.strokeWeight(2.5); p.line(objX, topY, x, groundY);
          const a = Math.atan2(groundY - topY, objX - x);
          p.noFill(); p.stroke(C.N); p.strokeWeight(2.5); p.arc(objX, topY, 70, 70, Math.PI, Math.PI + a);
        } else {
          p.stroke(col); p.strokeWeight(3);
          p.line(x, groundY, x, groundY - 22); p.line(x, groundY - 22, x - 7, groundY - 12); p.line(x, groundY - 22, x + 7, groundY - 12);
          p.line(x, groundY, x - 6, groundY + 0); p.noStroke(); p.fill(col); p.circle(x, groundY - 28, 11);
          p.stroke(C.N); p.strokeWeight(2.5); p.line(x, groundY, objX, topY);
          p.noFill(); p.arc(x, groundY, 70, 70, -Math.atan2(groundY - topY, objX - x), 0);
        }
        // Cinta métrica y lecturas.
        p.stroke(C.Z); p.strokeWeight(3); p.line(x, groundY + 28, objX, groundY + 28);
        p.noStroke(); p.fill(C.Z); p.textStyle(p.BOLD); p.textSize(12); p.textAlign(p.CENTER, p.TOP);
        p.text(d === null ? 'arrastra' : `d = ${d} m`, (x + objX) / 2, groundY + 34);
        const ang = angleAt(r.h, dd);
        p.fill(d === null ? C.mute : locked && !good ? C.ok : good ? C.ok : C.ink); p.textSize(15); p.textAlign(p.CENTER, p.CENTER);
        const want = (r.h / Math.tan(r.angle * Math.PI / 180)).toFixed(1);
        // Entre los botones − y + caben unos 170 px: lectura corta.
        p.text(d === null ? `meta: ${r.angle}°` : locked && !good ? `era d ≈ ${want} m` : `θ = ${ang.toFixed(1)}° · meta ${r.angle}°`, W / 2, H - 23);
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); p.textSize(18); p.text(b.t, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      const clampD = (r, v) => Math.max(STEP, Math.min(r.maxD, +(Math.round(v / STEP) * STEP).toFixed(1)));
      const place = () => { const r = params.rounds[cur]; st.ds[cur] = clampD(r, (objX - p.mouseX) / s); ready(); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => inside(b, p.mouseX, p.mouseY));
        if (b) { const r = params.rounds[cur]; st.ds[cur] = clampD(r, (st.ds[cur] ?? r.maxD * 0.5) + b.d); ready(); api.sfx?.tap?.(); return false; }
        if (p.mouseY < groundY - 60 || p.mouseY > groundY + 50 || p.mouseX > objX - 4) return;
        drag = true; place(); return false;
      };
      p.mouseDragged = () => { if (!drag) return; place(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.05);

    return {
      loaded: m.ready,
      getState: () => ({ ds: [...st.ds] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, angleAt, STEP };
})();
;
//#archivo js/games/atrapa-punto.js
// Atrapa el punto (trigonometría, circunferencia unitaria): los 16 puntos notables (múltiplos de 30° y
// de 45°) están marcados; se toca el que cumple la pista de cada ronda: coordenadas exactas, un ángulo en
// radianes o un valor con signo. Al tocar se ve el ángulo, nunca las coordenadas. Rondas con pestañas.
// params = { rounds: [{ prompt, angles: [grados aceptados] }] }   state = { picks: [grados | null] }

GAMES['atrapa-punto'] = (() => {
  const POINTS = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => r.angles.includes(state.picks?.[i]));
    return { ok, solution: params.rounds.map(r => `${r.prompt} → ${r.angles.map(a => `${a}°`).join(' o ')}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { picks: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, pulse = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.38, h * 0.28); cx = w / 2; cy = 92 + R;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(st.picks.every(v => v !== null));
    const pt = deg => [cx + R * Math.cos(deg * Math.PI / 180), cy - R * Math.sin(deg * Math.PI / 180)];

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], pick = st.picks[cur];
        tabs.forEach((t, i) => {
          const v = st.picks[i], ok = params.rounds[i].angles.includes(v);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.CENTER, p.CENTER); p.text('Atrapa el punto donde', W / 2, 52);
        p.fill(C.N); p.textStyle(p.BOLD); p.textSize(19); p.text(r.prompt, W / 2, 74);

        // Ejes, circunferencia y guías de cuadrante.
        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - R - 16, cy, cx + R + 16, cy); p.line(cx, cy - R - 16, cx, cy + R + 16);
        p.noFill(); p.stroke(C.line); p.strokeWeight(2); p.circle(cx, cy, 2 * R);
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL);
        p.text('1', cx + R + 8, cy + 10); p.text('−1', cx - R - 10, cy + 10); p.text('1', cx + 9, cy - R - 6); p.text('−1', cx + 11, cy + R + 8);
        // El radio al punto elegido.
        if (pick !== null) { const [x, y] = pt(pick); p.stroke(locked ? (r.angles.includes(pick) ? C.ok : C.bad) : C.brand); p.strokeWeight(3); p.line(cx, cy, x, y); }
        POINTS.forEach(a => {
          const [x, y] = pt(a), sel = a === pick, right = locked && r.angles.includes(a);
          if (right && !sel) { p.noFill(); p.stroke(C.ok); p.strokeWeight(3); p.drawingContext.setLineDash([4, 3]); p.circle(x, y, 26); p.drawingContext.setLineDash([]); }
          if (sel) { p.noFill(); p.stroke(locked ? (r.angles.includes(a) ? C.ok : C.bad) : C.brand); p.strokeWeight(3); p.circle(x, y, 26 + 6 * pulse); }
          p.noStroke(); p.fill(sel ? (locked ? (r.angles.includes(a) ? C.ok : C.bad) : C.brand) : a % 90 === 0 ? C.mute : C.Z); p.circle(x, y, sel ? 14 : 11);
        });
        pulse = Math.max(0, pulse - 0.06);
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(16);
        p.fill(pick === null ? C.mute : C.ink);
        p.text(pick === null ? 'Toca uno de los puntos' : `elegiste θ = ${pick}°`, W / 2, cy + R + 36);
        if (locked && !r.angles.includes(pick)) { p.fill(C.ok); p.textSize(13); p.text(`era ${r.angles.map(a => `${a}°`).join(' o ')}`, W / 2, cy + R + 58); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        let best = null, bd = 26;
        POINTS.forEach(a => { const [x, y] = pt(a), d = Math.hypot(p.mouseX - x, p.mouseY - y); if (d < bd) { bd = d; best = a; } });
        if (best === null) return;
        st.picks[cur] = best; pulse = 1; api.sfx?.tap?.(); ready();
        return false;
      };
    }, 1.32);

    return {
      loaded: m.ready,
      getState: () => ({ picks: [...st.picks] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, POINTS };
})();
;
//#archivo js/games/noria.js
// La noria (trigonometría, signos y ángulo de referencia): se gira la noria arrastrando la cabina
// dorada (de 15° en 15°) hasta un ángulo que cumpla la condición de la ronda: signos de sen, cos o tan,
// o un ángulo de referencia en cierto cuadrante. Suele haber varias respuestas. La altura de la cabina
// (seno) y su avance (coseno) se ven en vivo. Rondas con pestañas.
// params = { rounds: [{ prompt, sen?: '+' | '-', cos?, tan?, ref? }] }   state = { angles: [grados | null] }

GAMES['noria'] = (() => {
  const norm = d => ((d % 360) + 360) % 360;
  function refOf(deg) {
    const d = norm(deg);
    return d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
  }
  const sgn = v => (Math.abs(v) < 1e-9 ? 0 : Math.sign(v));
  function fits(deg, cond) {
    const t = deg * Math.PI / 180, vals = { sen: Math.sin(t), cos: Math.cos(t), tan: Math.abs(Math.cos(t)) < 1e-9 ? NaN : Math.tan(t) };
    for (const k of ['sen', 'cos', 'tan']) {
      if (!cond[k]) continue;
      const s = sgn(vals[k]);
      if (!(cond[k] === '+' ? s > 0 : s < 0)) return false;
    }
    return cond.ref == null || refOf(deg) === cond.ref;
  }
  const valid = cond => Array.from({ length: 24 }, (_, k) => k * 15).filter(a => fits(a, cond));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.angles?.[i] != null && fits(state.angles?.[i], r));
    return { ok, solution: params.rounds.map(r => `${r.prompt}: por ejemplo ${valid(r).slice(0, 3).map(a => `${a}°`).join(', ')}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { angles: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, drag = false, spin = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.33, h * 0.27); cx = w / 2; cy = 92 + R;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(st.angles.every(a => a !== null));
    const pt = (deg, r = R) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], a = st.angles[cur] ?? 0, good = st.angles[cur] !== null && fits(a, r);
        let dSpin = ((a - spin) % 360 + 540) % 360 - 180;   // camino corto entre el ángulo dibujado y el elegido
        spin += dSpin * 0.2;
        tabs.forEach((t, i) => {
          const v = st.angles[i], ok = v !== null && fits(v, params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textSize(15); p.textAlign(p.CENTER, p.TOP);
        p.text(r.prompt, 12, 44, W - 24, 40);

        // Estructura, ejes y cuadrantes.
        p.stroke(C.line); p.strokeWeight(3); p.line(cx, cy, cx - R * 0.7, cy + R + 22); p.line(cx, cy, cx + R * 0.7, cy + R + 22);
        p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([4, 5]); p.line(cx - R - 18, cy, cx + R + 18, cy); p.line(cx, cy - R - 18, cx, cy + R + 18); p.drawingContext.setLineDash([]);
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        [['I', 45], ['II', 135], ['III', 225], ['IV', 315]].forEach(([q, d]) => { const [x, y] = pt(d, R * 0.45); p.text(q, x, y); });
        p.noFill(); p.stroke(C.ink + '99'); p.strokeWeight(3); p.circle(cx, cy, 2 * R);
        for (let k = 0; k < 8; k++) { const [x, y] = pt(spin + k * 45); p.stroke(C.line); p.strokeWeight(1.5); p.line(cx, cy, x, y); }
        for (let k = 1; k < 8; k++) { const [x, y] = pt(spin + k * 45); p.noStroke(); p.fill(C.Z + '99'); p.rect(x - 9, y - 4, 18, 14, 4); }
        // Cabina dorada: su altura (seno, rosa) y su avance (coseno, azul).
        const [hx, hy] = pt(spin);
        p.stroke(C.I); p.strokeWeight(4); p.line(hx, cy, hx, hy);
        p.stroke(C.Z); p.strokeWeight(4); p.line(cx, cy, hx, cy);
        const col = locked ? (good ? C.ok : C.bad) : C.N;
        p.noStroke(); p.fill(col); p.rect(hx - 13, hy - 6, 26, 20, 5); p.fill(C.bg); p.rect(hx - 8, hy - 2, 16, 7, 2);
        p.noFill(); p.stroke(C.N); p.strokeWeight(2.5); p.arc(cx, cy, 40, 40, -norm(spin) * Math.PI / 180, 0);
        // Lecturas.
        const t = a * Math.PI / 180, y0 = cy + R + 40, f = v => (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2).replace('-', '−'));
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(16); p.fill(st.angles[cur] === null ? C.mute : C.ink);
        p.text(st.angles[cur] === null ? 'arrastra la cabina dorada' : `θ = ${norm(a)}°   ·   referencia ${refOf(a)}°`, W / 2, y0);
        p.textSize(13); p.fill(C.I); p.text(`sen θ = ${f(Math.sin(t))}`, W / 2 - 70, y0 + 24);
        p.fill(C.Z); p.text(`cos θ = ${f(Math.cos(t))}`, W / 2 + 70, y0 + 24);
        if (locked && !good) { p.fill(C.ok); p.text(`por ejemplo ${valid(r).slice(0, 3).map(v => `${v}°`).join(', ')}`, W / 2, y0 + 46); }
      };

      const place = () => { let d = Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI; if (d < 0) d += 360; st.angles[cur] = Math.round(d / 15) * 15 % 360; ready(); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; spin = st.angles[t] ?? 0; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const d = Math.hypot(p.mouseX - cx, p.mouseY - cy);
        if (d > R * 0.3 && d < R + 34) { drag = true; place(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; place(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.25);

    return {
      loaded: m.ready,
      getState: () => ({ angles: [...st.angles] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, fits, refOf };
})();
;
//#archivo js/games/sintoniza-onda.js
// Sintoniza la onda (trigonometría, gráficas): en la pantalla de un osciloscopio está la onda fantasma
// (punteada) y la tuya; cada manija (a amplitud, b frecuencia, c desfase en
// cuartos de π, d altura) se mueve tu onda hasta que coincida. Vale cualquier forma equivalente
// (−3 sen(x − π) es 3 sen x). Rondas con pestañas.
// params = { rounds: [{ fn: 'sen' | 'cos', target: { a, b, cq, d }, knobs: ['a', 'b', 'c', 'd'] }] }
// state = { vals: [{ a, b, cq, d }] }   (c = cq · π/4)

GAMES['sintoniza-onda'] = (() => {
  const F = { sen: Math.sin, cos: Math.cos };
  const evalAt = (fn, v, x) => v.a * F[fn](v.b * x - v.cq * Math.PI / 4) + v.d;
  let same = (fn, u, v) => { for (let k = 0; k <= 96; k++) { const x = k * 4 * Math.PI / 96; if (Math.abs(evalAt(fn, u, x) - evalAt(fn, v, x)) > 1e-6) return false; } return true; };
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const num = v => String(v);

  function cTex(cq) {
    const n = Math.abs(cq), g = gcd(n, 4), top = n / g, den = 4 / g;
    if (den === 1) return top === 1 ? '\\pi' : `${top}\\pi`;
    return `\\tfrac{${top === 1 ? '' : top}\\pi}{${den}}`;
  }
  function texOf(fn, v) {
    const f = fn === 'sen' ? '\\operatorname{sen}' : '\\cos';
    const coef = v.a === 1 ? '' : v.a === -1 ? '-' : num(v.a);
    const inner = v.b === 1 ? 'x' : `${num(v.b)}x`;
    const body = v.cq === 0 ? `${f} ${inner}` : `${f}\\left(${inner} ${v.cq > 0 ? '-' : '+'} ${cTex(v.cq)}\\right)`;
    const tail = v.d > 0 ? ` + ${num(v.d)}` : v.d < 0 ? ` - ${num(-v.d)}` : '';
    return `y = ${coef}${body}${tail}`;
  }
  // cq · π/4 escrito simplificado: 2 → π/2, −4 → −π.
  function piTxt(cq) {
    if (cq === 0) return '0';
    const n = Math.abs(cq), g = gcd(n, 4), top = n / g, den = 4 / g;
    return (cq < 0 ? '−' : '') + (den === 1 ? (top === 1 ? 'π' : `${top}π`) : `${top === 1 ? '' : top}π/${den}`);
  }
  // La misma fórmula para el lienzo (sin TeX).
  function txtOf(fn, v) {
    const n = Math.abs(v.cq), g = gcd(n, 4), top = n / g, den = 4 / g;
    const c = den === 1 ? (top === 1 ? 'π' : `${top}π`) : `${top === 1 ? '' : top}π/${den}`;
    const coef = v.a === 1 ? '' : v.a === -1 ? '−' : num(v.a).replace('-', '−');
    const inner = v.b === 1 ? 'x' : `${num(v.b)}x`;
    const body = v.cq === 0 ? `${fn} ${inner}` : `${fn}(${inner} ${v.cq > 0 ? '−' : '+'} ${c})`;
    const tail = v.d > 0 ? ` + ${num(v.d)}` : v.d < 0 ? ` − ${num(-v.d)}` : '';
    return `y = ${coef}${body}${tail}`;
  }

  same = velo(same);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => !!state.vals?.[i] && same(r.fn, state.vals?.[i], r.target));
    return { ok, solution: params.rounds.map(r => `$${texOf(r.fn, r.target)}$`).join(' · ') };
  }

  const KNOBS = {
    a: { key: 'a', step: 0.5, min: -3, max: 3, name: 'a · amplitud' },
    b: { key: 'b', step: 0.5, min: 0.5, max: 4, name: 'b · frecuencia' },
    c: { key: 'cq', step: 1, min: -8, max: 8, name: 'c · fase' },
    d: { key: 'd', step: 0.5, min: -2, max: 2, name: 'd · altura' },
  };

  function create(host, params, api) {
    const C = api.palette;
    const st = { vals: params.rounds.map(() => ({ a: 1, b: 1, cq: 0, d: 0 })) };
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], scr = null, rows = [], drag = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(params.rounds.length, w);
      scr = { x: 12, y: 48, w: w - 24, h: Math.min(h * .62, h - 97 - 38 * params.rounds[cur].knobs.length) };
      const y0 = scr.y + scr.h + 52;
      rows = params.rounds[cur].knobs.map((k, i) => {
        const K = KNOBS[k];
        return { k, rail: practiceTrack(113, w - 59, y0 + i * 34, K.min, K.max, K.step) };
      });
    }
    const ready = () => api.ready(touched.every(Boolean));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function wave(fn, v, col, weight, dashed) {
        const X = x => scr.x + 10 + (x / (2 * Math.PI)) * (scr.w - 20), Y = y => scr.y + scr.h / 2 - y * (scr.h - 16) / 8;
        p.noFill(); p.stroke(col); p.strokeWeight(weight);
        if (dashed) p.drawingContext.setLineDash([7, 6]);
        p.beginShape();
        for (let k = 0; k <= 160; k++) { const x = k * 2 * Math.PI / 160; p.vertex(X(x), Math.max(scr.y + 2, Math.min(scr.y + scr.h - 2, Y(evalAt(fn, v, x))))); }
        p.endShape(); p.drawingContext.setLineDash([]);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = st.vals[cur], good = same(r.fn, v, r.target);
        drawTabs(p, C, tabs, cur, i => {
          const ok = same(params.rounds[i].fn, st.vals[i], params.rounds[i].target);
          return locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
        });
        // Pantalla del osciloscopio: cuadrícula, eje y las dos ondas.
        drawPracticePanel(p, scr, C.card, good ? C.ok : locked ? C.bad : C.line, 12);
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = 1; k < 4; k++) { const x = scr.x + 10 + k * (scr.w - 20) / 4; p.line(x, scr.y + 6, x, scr.y + scr.h - 6); }
        for (let k = -3; k <= 3; k++) { const y = scr.y + scr.h / 2 - k * (scr.h - 16) / 8; p.stroke(k === 0 ? C.mute : C.line); p.line(scr.x + 6, y, scr.x + scr.w - 6, y); }
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.TOP);
        ['π/2', 'π', '3π/2'].forEach((t, k) => p.text(t, scr.x + 10 + (k + 1) * (scr.w - 20) / 4, scr.y + scr.h / 2 + 3));
        p.textAlign(p.LEFT, p.CENTER); p.text('3', scr.x + 4, scr.y + scr.h / 2 - 3 * (scr.h - 16) / 8); p.text('−3', scr.x + 4, scr.y + scr.h / 2 + 3 * (scr.h - 16) / 8);
        wave(r.fn, r.target, C.mute, 3, true);
        wave(r.fn, v, locked ? (good ? C.ok : C.bad) : r.fn === 'sen' ? C.I : C.Z, 3.5, false);
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(17); p.fill(good ? C.ok : C.ink);
        fitText(p, `$${texOf(r.fn, v)}$`, W / 2, scr.y + scr.h + 21, W - 34, 17, 27);
        rows.forEach(row => {
          const K = KNOBS[row.k], val = v[K.key];
          drawPracticeTrack(p, C, row.rail, val, K.name, row.k === 'c' ? piTxt(val) : negTxt(val), C.brand, drag === row);
        });
        if (locked && !good) { p.noStroke(); p.fill(C.ok); p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.text(`era ${txtOf(r.fn, r.target)}`, W / 2, H - 12); }
      };

      const move = x => {
        const K = KNOBS[drag.k], v = st.vals[cur];
        let next = drag.rail.value(x);
        if (K.key === 'a' && next === 0) next = x < drag.rail.x(0) ? -K.step : K.step;
        if (!touched[cur] || next !== v[K.key]) {
          v[K.key] = next; touched[cur] = true; api.sfx?.tap?.(); ready();
        }
      };
      p.mousePressed = () => {
        if (!inCanvas(p)) return;
        const t = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; drag = null; layout(W, H); api.sfx?.tap?.(); return false; }
        if (locked) return;
        drag = rows.find(row => row.rail.hit(p.mouseX, p.mouseY));
        if (drag) { move(p.mouseX); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { move(p.mouseX); return false; } };
      p.mouseReleased = () => { drag = null; };
    }, 1.35, () => {
      if (locked || !rows.length) return null;
      return rows[0].rail.gesture(st.vals[cur][KNOBS[rows[0].k].key]);
    });

    return {
      loaded: m.ready,
      getState: () => ({ vals: st.vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
      demo: m.demo,
      peek: () => ({ W, H, rails: rows.map(({ k, rail }) => ({ key: KNOBS[k].key, from: { x: rail.x(st.vals[cur][KNOBS[k].key]), y: rail.y }, to: { x: rail.x(params.rounds[cur].target[KNOBS[k].key]), y: rail.y } })) }),
    };
  }

  return { grade, create, texOf, demo: true };
})();
;
//#archivo js/games/la-obra.js
// La obra (lección 1.2): se sabe cuántos obreros tardan cuántos días; se arrastran obreros de la
// banca a la obra (o se usan ±) y un calendario muestra los días que tardarían (producto constante,
// regla de tres inversa). Hay que dejar los obreros justos para terminar en los días pedidos.
// params = { workers, days, askDays, max }   state = { workers }

GAMES['la-obra'] = (() => {
  const answerOf = p => Math.round((p.workers * p.days) / p.askDays);
  const daysFor = (p, w) => (p.workers * p.days) / w;

  function grade(state, params) {
    const ans = answerOf(params);
    return { ok: state.workers === ans, solution: `$${params.workers} \\cdot ${params.days} = ${params.workers * params.days} = x \\cdot ${params.askDays} \\Rightarrow x = ${ans}$ obreros` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { workers: params.workers };
    let locked = false, W = 0, H = 0, bench = null, site = null, buttons = [], drag = null;

    function layout(w, h) {
      W = w; H = h;
      bench = { x: 12, y: h * 0.3, w: w * 0.34, h: h * 0.5 };
      site = { x: w * 0.34 + 28, y: h * 0.3, w: w - (w * 0.34 + 28) - 12, h: h * 0.5 };
      buttons = [
        { d: -1, x: site.x, y: site.y + site.h + 10, w: 44, h: 32, t: '−' },
        { d: 1, x: site.x + site.w - 44, y: site.y + site.h + 10, w: 44, h: 32, t: '+' },
      ];
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    function setWorkers(n) {
      st.workers = Math.max(1, Math.min(params.max, n));
      api.ready(st.workers !== params.workers);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function worker(x, y, s, col) {
        p.noStroke(); p.fill(col); p.circle(x, y - s * 0.45, s * 0.45);
        p.rect(x - s * 0.3, y - s * 0.2, s * 0.6, s * 0.75, s * 0.12);
        p.fill(C.sun); p.arc(x, y - s * 0.5, s * 0.55, s * 0.4, p.PI, p.TWO_PI); // casco
      }
      // Obreros en cuadrícula dentro de una caja.
      function crowd(box, n, col, cols) {
        const s = Math.min(26, (box.w - 12) / cols / 1.1, (box.h - 30) / Math.ceil(Math.max(n, 1) / cols) / 1.3);
        for (let i = 0; i < n; i++) worker(box.x + 10 + (i % cols) * (box.w - 16) / cols + s * 0.5, box.y + 30 + Math.floor(i / cols) * s * 1.3 + s * 0.5, s, col);
      }

      p.draw = () => {
        p.background(C.bg);
        const ans = answerOf(params), good = st.workers === ans;
        const days = daysFor(params, st.workers);
        // Calendario.
        p.noStroke(); p.fill(C.mute); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(12);
        p.text(`${params.workers} obreros × ${params.days} días = ${params.workers * params.days} obreros·día`, W / 2, 6);
        p.fill(C.N); p.textSize(14); p.text(`¿Cuántos obreros para terminar en ${params.askDays} días?`, W / 2, 24);
        const col = locked ? (good ? C.ok : C.bad) : Math.round(days) === params.askDays && !VELO.on ? C.ok : C.brand;
        p.stroke(col); p.strokeWeight(2.5); p.fill(C.card); p.rect(W / 2 - 70, 48, 140, 50, 12);
        p.noStroke(); p.fill(col); p.rect(W / 2 - 70, 48, 140, 14, 12, 12, 0, 0);
        p.fill(C.ink); p.textSize(22); p.textAlign(p.CENTER, p.CENTER); p.text(`${Math.round(days)} días`, W / 2, 80);
        p.fill(C.mute); p.textSize(10); p.textAlign(p.CENTER, p.TOP); p.text('calendario', W / 2, 100);
        // Banca y obra.
        [['Banca', bench], ['Obra', site]].forEach(([name, box]) => {
          p.stroke(C.line); p.strokeWeight(2); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 12);
          p.noStroke(); p.fill(C.mute); p.textSize(12); p.textAlign(p.CENTER, p.TOP); p.text(name, box.x + box.w / 2, box.y + 8);
        });
        crowd(bench, Math.max(0, params.max - st.workers), C.mute, 4);
        crowd(site, st.workers, col, 5);
        p.noStroke(); p.fill(C.ink); p.textSize(16); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        // Entre los botones − y +: si el hueco es angosto queda solo el número.
        const gap = site.w - 104;
        fitText(p, gap < 64 ? String(st.workers) : `${st.workers} obrero${st.workers === 1 ? '' : 's'}`, site.x + site.w / 2, buttons[0].y + 16, Math.max(24, gap), 16);
        buttons.forEach(b => {
          drawTile(p, C, b, b.t, { fill: C.sky, r: 8, lift: 2, size: 18 });
        });
        p.fill(C.mute); p.textSize(11); p.text(locked && !good ? `Debían ser ${ans} obreros para ${params.askDays} días` : 'Arrastra obreros a la obra o toca ±', W / 2, H - 12);
        if (drag) worker(p.mouseX, p.mouseY, 30, C.brand);
      };

      p.mousePressed = () => {
        if (locked) return;
        const b = buttons.find(b => inside(b, p.mouseX, p.mouseY));
        if (b) { setWorkers(st.workers + b.d); api.sfx?.tap?.(); return false; }
        if (inside(bench, p.mouseX, p.mouseY) && st.workers < params.max) { drag = 'bench'; return false; }
        if (inside(site, p.mouseX, p.mouseY) && st.workers > 1) { drag = 'site'; return false; }
      };
      p.mouseDragged = () => (drag ? false : undefined);
      p.mouseReleased = () => {
        if (!drag) return;
        if (drag === 'bench' && inside(site, p.mouseX, p.mouseY)) { setWorkers(st.workers + 1); api.sfx?.tap?.(); }
        if (drag === 'site' && inside(bench, p.mouseX, p.mouseY)) { setWorkers(st.workers - 1); api.sfx?.tap?.(); }
        drag = null;
        return false;
      };
    }, 1.2);

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
//#archivo js/games/cuadricula-cien.js
// Pinta el porcentaje (lección 1.3): una cuadrícula de 10 × 10 que se pinta arrastrando el dedo.
// Tres rondas («35 %», «3/4», «0,08»): hay que dejar pintadas exactamente las casillas que pide
// cada una (por ciento = de cada 100).
// params = { rounds: [{ ask, count }] }   state = { counts: (número | null)[] }

GAMES['cuadricula-cien'] = (() => {
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.counts[i] === r.count);
    const asks = params.rounds.map(r => r.ask), counts = params.rounds.map(r => r.count);
    const list = a => a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1];
    return { ok, solution: `${list(asks)} son ${list(counts)} casillas de 100` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const N = params.rounds.length;
    const cells = params.rounds.map(() => new Array(100).fill(false));
    const st = { counts: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, round = 0, paint = null, grid = null, tabs = [], nextBtn = null;

    function layout(w, h) {
      W = w; H = h;
      const size = Math.min(w - 24, h - 130);
      grid = { x: (w - size) / 2, y: 60, s: size, c: size / 10 };
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * ((w - 24) / N), y: 8, w: (w - 24) / N - 6, h: 40 }));
      nextBtn = { x: grid.x + grid.s - 150, y: grid.y + grid.s + 12, w: 150, h: 34 };
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const cellAt = (x, y) => {
      const i = Math.floor((x - grid.x) / grid.c), j = Math.floor((y - grid.y) / grid.c);
      return i >= 0 && i < 10 && j >= 0 && j < 10 ? j * 10 + i : -1;
    };
    const count = k => cells[k].filter(Boolean).length;
    function setCell(idx, v) {
      if (idx < 0 || cells[round][idx] === v) return;
      cells[round][idx] = v;
      st.counts[round] = count(round);
      api.ready(st.counts.every(c => c !== null));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function mini(k, x, y, s) {
        for (let i = 0; i < 100; i++) {
          p.fill(cells[k][i] ? C.N : C.line); p.noStroke();   // C.N: en el tema claro el sol casi no se distingue de lo vacío
          p.rect(x + (i % 10) * s, y + Math.floor(i / 10) * s, s - 0.6, s - 0.6);
        }
      }

      p.draw = () => {
        p.background(C.bg);
        // Pestañas de ronda (con miniatura de las rondas ya tocadas).
        tabs.forEach((t, i) => {
          const good = st.counts[i] === params.rounds[i].count;
          const col = locked ? (good ? C.ok : C.bad) : i === round ? C.brand : C.line;
          p.stroke(col); p.strokeWeight(i === round ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 10);
          p.noStroke(); p.fill(i === round || locked ? C.ink : C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(14);
          p.text(params.rounds[i].ask, t.x + 10, t.y + t.h / 2);
          if (st.counts[i] !== null) mini(i, t.x + t.w - 34, t.y + 5, 3);
        });
        // Cuadrícula.
        const g = cells[round];
        for (let i = 0; i < 100; i++) {
          const x = grid.x + (i % 10) * grid.c, y = grid.y + Math.floor(i / 10) * grid.c;
          p.stroke(C.line); p.strokeWeight(1); p.fill(g[i] ? C.sun : C.card);
          p.rect(x, y, grid.c, grid.c, 3);
        }
        const n = count(round), good = n === params.rounds[round].count;
        const col = locked ? (good ? C.ok : C.bad) : C.N;
        p.noStroke(); p.fill(col); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(18);
        p.text(`${n} de 100`, grid.x + 2, nextBtn.y + nextBtn.h / 2);
        if (!locked && round < N - 1) {
          drawTile(p, C, nextBtn, 'Siguiente ronda →', { fill: C.sky, size: 14 });
        }
        p.fill(C.mute); p.textSize(11); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.NORMAL);
        p.text(locked && !good ? `Eran ${params.rounds[round].count} casillas` : 'Arrastra el dedo para pintar; vuelve a pasar para borrar', W / 2, H - 12);
      };

      p.mousePressed = () => {
        if (locked) return;
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { round = t; api.sfx?.tap?.(); return false; }
        if (round < N - 1 && inside(nextBtn, p.mouseX, p.mouseY)) { round++; api.sfx?.tap?.(); return false; }
        const idx = cellAt(p.mouseX, p.mouseY);
        if (idx < 0) return;
        paint = !cells[round][idx];
        setCell(idx, paint);
        return false;
      };
      p.mouseDragged = () => {
        if (locked || paint === null) return;
        setCell(cellAt(p.mouseX, p.mouseY), paint);
        return false;
      };
      p.mouseReleased = () => {
        if (paint === null) return;
        paint = null;
        api.sfx?.tap?.();
        return false;
      };
    }, 1.15);

    return {
      loaded: m.ready,
      getState: () => ({ counts: [...st.counts] }),
      lock() { locked = true; paint = null; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/cascada.js
// Descuentos en cascada (lección 1.3, ejercicio 1.10): una etiqueta de precio a la que se le pegan
// stickers de descuento en cualquier orden (el precio cae con cada uno) y un deslizador para fijar
// el descuento único equivalente: los descuentos sucesivos se multiplican, no se suman.
// params = { price, changes, step }   state = { applied: índices[], single: % | null }

GAMES['cascada'] = (() => {
  const factor = p => p.changes.reduce((f, c) => f * (1 + c / 100), 1);
  const answerOf = p => Math.round(100 * (1 - factor(p)));
  const fmt = n => Math.round(n).toLocaleString('es-CO');
  const dec = n => String(+n.toFixed(2));

  function grade(state, params) {
    const all = params.changes.every((_, i) => state.applied.filter(j => j === i).length === 1) && state.applied.length === params.changes.length;
    const ok = all && state.single === answerOf(params);
    const prod = params.changes.map(c => dec(1 + c / 100)).join(' \\cdot ');
    const sum = -params.changes.reduce((s, c) => s + c, 0);   // lo que daría sumar los cambios con su signo
    return { ok, solution: `$${prod} = ${dec(factor(params))} \\Rightarrow ${answerOf(params)}\\%$ (no ${sum} %)` };
  }

  function create(host, params, api) {
    const C = api.palette;
    const COLS = [C.I, C.N, C.Q, C.R];
    const st = { applied: [], single: null };
    let locked = false, W = 0, H = 0, tag = null, tray = [], slider = null, drag = null, shown = params.price;

    function layout(w, h) {
      W = w; H = h;
      tag = { x: w * 0.16, y: 48, w: w * 0.68, h: h * 0.3 };
      tray = params.changes.map((_, i) => ({ x: w / 2 - 36 + (i - (params.changes.length - 1) / 2) * 90, y: tag.y + tag.h + 20, w: 72, h: 72 }));
      slider = { x: 32, y: h - 70, w: w - 64 };
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const priceNow = () => st.applied.reduce((v, i) => v * (1 + params.changes[i] / 100), params.price);
    const ready = () => api.ready(st.applied.length === params.changes.length && st.single !== null);
    function setSingle(x) {
      st.single = Math.max(0, Math.min(100, Math.round(((x - slider.x) / slider.w) * 100 / params.step) * params.step));
      ready();
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function sticker(x, y, s, i) {
        p.stroke(C.card); p.strokeWeight(3); p.fill(COLS[i % COLS.length]); p.circle(x, y, s);
        p.noStroke(); p.fill(inkOn(COLS[i % COLS.length])); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(s * 0.26);
        p.text(`${params.changes[i] > 0 ? '+' : '−'}${Math.abs(params.changes[i])} %`, x, y);
      }

      p.draw = () => {
        p.background(C.bg);
        const target = priceNow();
        shown += (target - shown) * 0.12;   // el precio cae contando hacia abajo
        if (Math.abs(target - shown) < 1) shown = target;
        const ans = answerOf(params), good = st.single === ans;
        const col = locked ? (good && st.applied.length === params.changes.length ? C.ok : C.bad) : C.brand;
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.TOP); p.textStyle(p.BOLD); p.textSize(14);
        p.text(params.changes.every(c => c < 0) ? 'Pega los dos descuentos y halla el descuento único' : 'Pega los dos cambios y halla el descuento único', 12, 8, W - 24, 40);
        // Etiqueta.
        p.stroke(C.line); p.strokeWeight(2); p.fill(C.card); p.rect(tag.x, tag.y, tag.w, tag.h, 16);
        p.noStroke(); p.fill(C.line); p.circle(tag.x + tag.w / 2, tag.y + 14, 12);
        p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.text('precio', tag.x + tag.w / 2, tag.y + 26);
        let y = tag.y + 44;
        let v = params.price;
        st.applied.forEach(i => {
          p.fill(C.mute); p.textSize(13); p.textAlign(p.CENTER, p.TOP); p.text(`$ ${fmt(v)}`, tag.x + tag.w / 2, y);
          p.stroke(C.bad); p.strokeWeight(1.5); p.line(tag.x + tag.w / 2 - 34, y + 8, tag.x + tag.w / 2 + 34, y + 8); p.noStroke();
          v *= 1 + params.changes[i] / 100; y += 18;
        });
        p.fill(C.ink); p.textSize(26); p.textStyle(p.BOLD); p.text(`$ ${fmt(shown)}`, tag.x + tag.w / 2, y + 4);
        st.applied.forEach((i, k) => sticker(tag.x + 24 + k * 34, tag.y + 24, 40, i));
        // Bandeja de stickers.
        params.changes.forEach((_, i) => {
          if (st.applied.includes(i) || drag?.i === i) return;
          sticker(tray[i].x + tray[i].w / 2, tray[i].y + tray[i].h / 2, 64, i);
        });
        // Deslizador del descuento único.
        const xOf = s => slider.x + (s / 100) * slider.w;
        p.fill(C.mute); p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.BOTTOM); p.text('descuento único', slider.x, slider.y - 14);
        p.textAlign(p.RIGHT, p.BOTTOM); p.fill(col); p.textSize(16);
        p.text(st.single === null ? '— %' : `${st.single} %  →  $ ${fmt(params.price * (1 - st.single / 100))}`, slider.x + slider.w, slider.y - 12);
        p.stroke(C.mute); p.strokeWeight(6); p.line(slider.x, slider.y, slider.x + slider.w, slider.y);
        if (st.single !== null) { p.stroke(col); p.line(slider.x, slider.y, xOf(st.single), slider.y); }
        p.fill(C.cream); p.stroke(col); p.strokeWeight(3); p.circle(xOf(st.single ?? 0), slider.y, 26);
        if (locked) { p.noStroke(); p.fill(C.ok); p.textSize(11); p.textAlign(p.CENTER, p.TOP); p.text(`${ans} %`, xOf(ans), slider.y + 16); p.stroke(C.ok); p.strokeWeight(2); p.line(xOf(ans), slider.y - 10, xOf(ans), slider.y + 10); }
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER);
        p.text(locked && !good ? `El descuento único era ${ans} %` : 'Arrastra los stickers a la etiqueta; luego el deslizador', W / 2, H - 12);
        if (drag && !drag.slider) sticker(p.mouseX, p.mouseY, 64, drag.i);
      };

      p.mousePressed = () => {
        if (locked) return;
        const i = tray.findIndex((b, i) => !st.applied.includes(i) && inside(b, p.mouseX, p.mouseY));
        if (i >= 0) { drag = { i }; return false; }
        if (Math.abs(p.mouseY - slider.y) <= 22 && p.mouseX >= slider.x - 16 && p.mouseX <= slider.x + slider.w + 16) { drag = { slider: true }; setSingle(p.mouseX); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; if (drag.slider) setSingle(p.mouseX); return false; };
      p.mouseReleased = () => {
        if (!drag) return;
        if (!drag.slider && inside(tag, p.mouseX, p.mouseY)) { st.applied.push(drag.i); api.sfx?.tap?.(); ready(); }
        drag = null;
        return false;
      };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ applied: [...st.applied], single: st.single }),
      lock() { locked = true; drag = null; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/mueve-parabola.js
// Mueve la parábola (polinomio cuadrático): arriba está la ecuación en forma estándar y abajo una
// parábola propia en una cuadrícula. Se toca o se arrastra sobre la cuadrícula para poner el vértice
// (salta a puntos enteros) y con − / + se cambia a (pasos de 0.5, sin el 0) hasta que la parábola sea
// la de la ecuación. No hay parábola fantasma: el vértice sale de completar el cuadrado.
// params = { rounds: [{ a, b, c }] }   state = { vals: [{ a, h, k }] }

GAMES['mueve-parabola'] = (() => {
  const RANGE = 6;
  const clean = v => { const r = Math.round(v * 1e9) / 1e9; return r === 0 ? 0 : r; };
  const vertexOf = r => ({ h: clean(-r.b / (2 * r.a)), k: clean(r.c - r.b * r.b / (4 * r.a)) });
  const coef = a => (a === 1 ? '' : a === -1 ? '-' : String(a));
  const signed = v => (v > 0 ? ` + ${v}` : v < 0 ? ` - ${-v}` : '');
  function texStd(r) {
    const bx = r.b === 0 ? '' : `${r.b > 0 ? ' + ' : ' - '}${Math.abs(r.b) === 1 ? '' : Math.abs(r.b)}x`;
    return `y = ${coef(r.a)}x^2${bx}${signed(r.c)}`;
  }
  function texVertex(v) {
    const sq = v.h === 0 ? 'x^2' : `(x ${v.h > 0 ? '-' : '+'} ${Math.abs(v.h)})^2`;
    return `y = ${coef(v.a)}${sq}${signed(v.k)}`;
  }
  const txt = s => s.replace(/\^2/g, '²').replace(/ - /g, ' − ').replace(/= -/, '= −').replace(/\(x - /, '(x − ');
  const same = (v, r) => { const t = vertexOf(r); return !!v && v.a === r.a && v.h === t.h && v.k === t.k; };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.vals?.[i], r));
    return { ok, solution: params.rounds.map(r => `$${texStd(r)} = ${texVertex({ a: r.a, ...vertexOf(r) }).slice(4)}$`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const vals = params.rounds.map(() => ({ a: 1, h: 0, k: 0 })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, minus = null, plus = null;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(w - 24, h - 190);
      box = { x: (w - side) / 2, y: 82, w: side, h: side };
      minus = { x: w - 150, y: box.y + side + 12, w: 44, h: 38 };
      plus = { x: w - 56, y: box.y + side + 12, w: 44, h: 38 };
    }
    const X = x => box.x + (x + RANGE + 0.5) * box.w / (2 * RANGE + 1);
    const Y = y => box.y + (RANGE + 0.5 - y) * box.h / (2 * RANGE + 1);
    const toGrid = (px, py) => ({
      h: Math.max(-RANGE, Math.min(RANGE, Math.round((px - box.x) * (2 * RANGE + 1) / box.w - RANGE - 0.5))),
      k: Math.max(-RANGE, Math.min(RANGE, Math.round(RANGE + 0.5 - (py - box.y) * (2 * RANGE + 1) / box.h))),
    });
    const ready = () => api.ready(touched.every(Boolean));

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
        const r = params.rounds[cur], v = vals[cur], good = same(v, r);
        tabs.forEach((t, i) => {
          const ok = same(vals[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fit(txt(texStd(r)), W / 2, 62, 20, W - 24);

        // Cuadrícula con ejes.
        p.stroke(locked ? (good ? C.ok : C.bad) : C.line); p.strokeWeight(locked ? 2.5 : 1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        p.strokeWeight(1);
        for (let k = -RANGE; k <= RANGE; k++) {
          p.stroke(k === 0 ? C.mute : C.line);
          p.line(X(k), box.y + 4, X(k), box.y + box.h - 4); p.line(box.x + 4, Y(k), box.x + box.w - 4, Y(k));
        }
        p.noStroke(); p.fill(C.mute); p.textSize(9); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.TOP);
        for (const k of [-4, -2, 2, 4]) {
          const s = String(k).replace('-', '−');
          p.text(s, X(k), Y(0) + 2); p.textAlign(p.RIGHT, p.CENTER); p.text(s, X(0) - 3, Y(k)); p.textAlign(p.CENTER, p.TOP);
        }
        // La parábola propia, recortada a la cuadrícula.
        p.noFill(); p.stroke(locked ? (good ? C.ok : C.bad) : C.I); p.strokeWeight(3);
        p.drawingContext.save(); p.drawingContext.beginPath(); p.drawingContext.rect(box.x, box.y, box.w, box.h); p.drawingContext.clip();
        p.beginShape();
        for (let s = 0; s <= 160; s++) { const x = -RANGE - 0.5 + s * (2 * RANGE + 1) / 160, y = v.a * (x - v.h) ** 2 + v.k; if (Math.abs(y) < 40) p.vertex(X(x), Y(y)); }
        p.endShape();
        p.drawingContext.setLineDash([5, 5]); p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(v.h), box.y, X(v.h), box.y + box.h); p.drawingContext.setLineDash([]);
        p.drawingContext.restore();
        p.noStroke(); p.fill(C.N); p.circle(X(v.h), Y(v.k), 16);
        p.fill(C.bg); p.circle(X(v.h), Y(v.k), 6);

        // a con − / + y la forma canónica en vivo.
        p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text('a · abertura', 14, minus.y + 19);
        p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textSize(17); p.text(String(v.a).replace('-', '−'), (minus.x + minus.w + plus.x) / 2, minus.y + 19);
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(20); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
        p.fill(C.ink); p.textStyle(p.BOLD);
        fit(`${txt(texVertex(v))}   vértice (${v.h}, ${v.k})`.replace(/-(\d)/g, '−$1'), W / 2, minus.y + 62, 15, W - 24);
        if (locked && !good) { p.fill(C.ok); fit(`era ${txt(texVertex({ a: r.a, ...vertexOf(r) }))}`, W / 2, H - 10, 12, W - 24); }
      };

      function moveTo() {
        const g = toGrid(p.mouseX, p.mouseY), v = vals[cur];
        if (g.h !== v.h || g.k !== v.k) { v.h = g.h; v.k = g.k; api.sfx?.tap?.(); }
        touched[cur] = true; ready();
      }
      let dragging = false;
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(box, p.mouseX, p.mouseY)) { dragging = true; moveTo(); return false; }
        const d = inside(minus, p.mouseX, p.mouseY) ? -1 : inside(plus, p.mouseX, p.mouseY) ? 1 : 0;
        if (!d) return;
        const v = vals[cur];
        v.a = Math.max(-3, Math.min(3, v.a + d * 0.5));
        if (v.a === 0) v.a = d * 0.5;   // a = 0 no es parábola: se salta
        touched[cur] = true; api.sfx?.tap?.(); ready();
        return false;
      };
      p.mouseDragged = () => { if (dragging && !locked) { moveTo(); return false; } };
      p.mouseReleased = () => { dragging = false; };
    }, 1.5);

    return {
      loaded: m.ready,
      getState: () => ({ vals: vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, vertexOf, texStd, texVertex, RANGE };
})();
;
//#archivo js/games/correa-del-perro.js
// El perro y la correa (cálculo, valor absoluto): |x − c| < r son los puntos a menos de r del poste c,
// justo hasta donde llega un perro amarrado con una correa de largo r. Se mueve el poste, se estira la
// correa, se elige la zona (🐶 «donde el perro alcanza», adentro, o 🐱 «donde el gato está a salvo»,
// afuera) y si las puntas cuentan (la correa llega justo: ≤, ≥). La zona se pinta en la recta en vivo.
// params = { min, max, rounds: [{ txt, c, r, out, closed }] }   state = { vals: [{ c, r, out, closed }] }

GAMES['correa-del-perro'] = (() => {
  const num = v => String(v).replace('-', '−');
  function setText(v) {
    const L = num(v.c - v.r), R = num(v.c + v.r);
    if (!v.out) return `${v.closed ? '[' : '('}${L}, ${R}${v.closed ? ']' : ')'}`;
    return `(−∞, ${L}${v.closed ? ']' : ')'} ∪ ${v.closed ? '[' : '('}${R}, ∞)`;
  }
  let same = (a, b) => !!a && a.c === b.c && a.r === b.r && !!a.out === !!b.out && !!a.closed === !!b.closed;

  same = velo(same);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.vals[i], r));
    return { ok, solution: params.rounds.map(r => `${r.txt}: ${setText(r)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette, lo = params.min, hi = params.max;
    const vals = params.rounds.map(() => ({ c: 0, r: 1, out: false, closed: false })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], rows = [], modeBtn = null, endBtn = null, drag = null;
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const X = v => 22 + (v - lo) / (hi - lo) * (W - 44);
    const toV = px => lo + (px - 22) / (W - 44) * (hi - lo);
    const snap = v => Math.round(v * 2) / 2;
    const LY = () => 172;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const y0 = H - 140;
      rows = ['c', 'r'].map((k, i) => ({ k, y: y0 + i * 44, minus: { x: W - 150, y: y0 + i * 44, w: 42, h: 36 }, plus: { x: W - 54, y: y0 + i * 44, w: 42, h: 36 } }));
      const by = H - 46, bw = (W - 32) / 2;
      modeBtn = { x: 12, y: by, w: bw, h: 38 };
      endBtn = { x: 20 + bw, y: by, w: bw, h: 38 };
    }
    const changed = () => { touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean)); };
    function setC(v) { const s = vals[cur]; s.c = Math.max(lo + s.r, Math.min(hi - s.r, snap(v))); }
    function setR(v) { const s = vals[cur]; s.r = Math.max(0.5, Math.min(Math.min(s.c - lo, hi - s.c), snap(v))); }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };
      function fit(s, x, y, sz, maxW) { p.textSize(sz); while (sz > 9 && p.textWidth(s) > maxW) { sz -= 1; p.textSize(sz); } p.text(s, x, y); }
      function btn(b, label, on, col) {
        p.stroke(locked ? C.line : on ? col : C.line); p.strokeWeight(on ? 2.5 : 1.5); p.fill(on ? C.card : C.bg); p.rect(b.x, b.y, b.w, b.h, 10);
        p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fit(label, b.x + b.w / 2, b.y + b.h / 2, 14, b.w - 10);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = vals[cur], good = same(v, r), ly = LY();
        tabs.forEach((tb, i) => {
          const ok = same(vals[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fit(r.txt, W / 2, 62, 24, W - 24);

        // Recta, zona pintada y puntas.
        const zone = locked ? (good ? C.ok : C.bad) : v.out ? C.R : C.Q, L = X(v.c - v.r), R = X(v.c + v.r);
        p.stroke(C.line); p.strokeWeight(2); p.line(14, ly, W - 14, ly);
        for (let k = Math.ceil(lo); k <= hi; k++) {
          p.stroke(C.line); p.strokeWeight(1); p.line(X(k), ly - 4, X(k), ly + 4);
          if (k % 2 === 0) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(10); p.textAlign(p.CENTER, p.TOP); p.text(num(k), X(k), ly + 8); }
        }
        p.stroke(zone); p.strokeWeight(8);
        if (v.out) { p.line(14, ly, L, ly); p.line(R, ly, W - 14, ly); } else p.line(L, ly, R, ly);
        [L, R].forEach(x => { p.stroke(zone); p.strokeWeight(2.5); p.fill(v.closed ? zone : C.bg); p.circle(x, ly, 15); });
        // Poste, correa (arco) y perro en la punta.
        const pole = X(v.c), rad = R - pole;
        p.noFill(); p.stroke(C.N); p.strokeWeight(2); p.drawingContext.setLineDash([5, 5]);
        p.arc(pole, ly, 2 * rad, 2 * Math.min(rad, 70), Math.PI, 2 * Math.PI); p.drawingContext.setLineDash([]);
        p.stroke(C.ink); p.strokeWeight(4); p.line(pole, ly, pole, ly - 46);
        p.noStroke(); p.fill(C.N); p.circle(pole, ly - 48, 10);
        p.stroke(C.N); p.strokeWeight(2); p.line(pole, ly - 44, R, ly - 10);
        p.noStroke(); p.textAlign(p.CENTER, p.BOTTOM); p.textSize(24); p.text(v.out ? '🐱' : '🐶', v.out ? Math.min(W - 18, R + 22) : R, ly - 6);
        p.fill(C.mute); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.TOP); p.text(`poste ${num(v.c)}`, pole, ly + 22);

        p.fill(good && !locked ? C.ok : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fit(`zona: ${setText(v)}`, W / 2, ly + 44, 16, W - 24);
        if (locked && !good) { p.fill(C.ok); fit(`era ${setText(r)}`, W / 2, ly + 62, 13, W - 24); }

        rows.forEach(row => {
          p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(13);
          p.text(row.k === 'c' ? 'poste (centro)' : 'correa (radio)', 14, row.y + 18);
          p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textSize(16); p.text(num(v[row.k]), W - 81, row.y + 18);
          [[row.minus, '−'], [row.plus, '+']].forEach(([b, s]) => {
            p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
            p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(18); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
          });
        });
        btn(modeBtn, v.out ? '🐱 afuera: a salvo' : '🐶 adentro: alcanza', true, v.out ? C.R : C.Q);
        btn(endBtn, v.closed ? '● puntas incluidas' : '○ puntas excluidas', v.closed, C.N);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const v = vals[cur], mx = p.mouseX, my = p.mouseY, ly = LY();
        if (inside(modeBtn, mx, my)) { v.out = !v.out; changed(); return false; }
        if (inside(endBtn, mx, my)) { v.closed = !v.closed; changed(); return false; }
        for (const row of rows) {
          const d = inside(row.minus, mx, my) ? -0.5 : inside(row.plus, mx, my) ? 0.5 : 0;
          if (!d) continue;
          if (row.k === 'c') setC(v.c + d); else setR(v.r + d);
          changed(); return false;
        }
        if (Math.abs(my - ly) < 60) {
          drag = Math.abs(mx - X(v.c + v.r)) < 22 || Math.abs(mx - X(v.c - v.r)) < 22 ? 'r' : Math.abs(mx - X(v.c)) < 26 ? 'c' : null;
          if (drag) return false;
        }
      };
      p.mouseDragged = () => {
        if (!drag || locked) return;
        const v = vals[cur], x = toV(p.mouseX), old = `${v.c},${v.r}`;
        if (drag === 'c') setC(x); else setR(Math.abs(x - v.c));
        if (`${v.c},${v.r}` !== old) changed();
        return false;
      };
      p.mouseReleased = () => { drag = null; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ vals: vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, setText };
})();
;
//#archivo js/games/laser-recta.js
// El láser (cálculo, ecuación de la recta): un rayo láser recto atraviesa el plano y hay dos cristales.
// Tres perillas lo controlan: «sube» y «avanza» (la pendiente m = sube/avanza, que se ve como un
// escalón dibujado en el corte con el eje y) y el corte b con el eje y. Hay que alinearlo para que
// atraviese los dos cristales: entonces brillan. La ecuación y = mx + b se escribe en vivo.
// params = { rounds: [{ P: [x, y], Q: [x, y] }] }   state = { vals: [{ rise, run, b }] }

GAMES['laser-recta'] = (() => {
  const RANGE = 6;
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const num = v => String(v).replace('-', '−');
  function lineText(v) {
    const g = gcd(Math.abs(v.rise), v.run) || 1, n = v.rise / g, d = v.run / g;
    const bTxt = v.b > 0 ? ` + ${num(v.b)}` : v.b < 0 ? ` − ${num(-v.b)}` : '';
    if (n === 0) return `y = ${num(v.b)}`;
    const mx = d === 1 ? (n === 1 ? 'x' : n === -1 ? '−x' : `${num(n)}x`) : `${n < 0 ? '−' : ''}${Math.abs(n)}/${d} x`;
    return `y = ${mx}${bTxt}`;
  }
  let hits = (v, P) => Math.abs(P[1] - (v.rise / v.run * P[0] + v.b)) < 1e-9;
  let fits = (v, r) => !!v && hits(v, r.P) && hits(v, r.Q);
  function texOf(r) {
    let n = r.Q[1] - r.P[1], d = r.Q[0] - r.P[0];
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(Math.abs(n), d) || 1; n /= g; d /= g;
    const b = Math.round((r.P[1] - n / d * r.P[0]) * 1e9) / 1e9;
    const m = n === 0 ? '' : d === 1 ? (n === 1 ? 'x' : n === -1 ? '-x' : `${n}x`) : `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}x`;
    const bt = n === 0 ? `${b}` : b > 0 ? ` + ${b}` : b < 0 ? ` - ${-b}` : '';
    return `y = ${m}${bt}`;
  }

  fits = velo(fits);
  hits = velo(hits);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => !!state.vals?.[i] && fits(state.vals[i], r));
    return { ok, solution: params.rounds.map(r => `$${texOf(r)}$`).join(' · ') };
  }

  const KNOBS = [
    { key: 'rise', step: 1, min: -6, max: 6, name: 'sube' },
    { key: 'run', step: 1, min: 1, max: 6, name: 'avanza' },
    { key: 'b', step: 0.5, min: -6, max: 6, name: 'corte b' },
  ];

  function create(host, params, api) {
    const C = api.palette;
    const vals = params.rounds.map(() => ({ rise: 1, run: 1, b: 0 })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, rows = [];
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const n = 2 * RANGE + 1;
    const X = x => box.x + (x + RANGE + 0.5) / n * box.w, Y = y => box.y + (RANGE + 0.5 - y) / n * box.h;

    function layout() {
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(W - 24, H - 200);
      box = { x: (W - side) / 2, y: 76, w: side, h: side };
      const y0 = box.y + side + 10;
      rows = KNOBS.map((k, i) => ({ k, y: y0 + i * 40, minus: { x: W - 150, y: y0 + i * 40, w: 42, h: 34 }, plus: { x: W - 54, y: y0 + i * 40, w: 42, h: 34 } }));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = vals[cur], ok = fits(v, r), mm = v.rise / v.run;
        tabs.forEach((tb, i) => {
          const g = fits(vals[i], params.rounds[i]);
          const col = locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(tb.x, tb.y, tb.w, tb.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, tb.x + tb.w / 2, tb.y + tb.h / 2);
        });
        p.noStroke(); p.fill(ok ? C.ok : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(20); p.text(lineText(v), W / 2, 58);
        // Plano.
        p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
        for (let k = -RANGE; k <= RANGE; k++) { p.stroke(C.line); p.strokeWeight(0.6); p.line(X(k), box.y + 2, X(k), box.y + box.h - 2); p.line(box.x + 2, Y(k), box.x + box.w - 2, Y(k)); }
        p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(0), box.y + 2, X(0), box.y + box.h - 2); p.line(box.x + 2, Y(0), box.x + box.w - 2, Y(0));
        // Rayo (recortado al plano) con resplandor.
        const xa = -RANGE - 0.5, xb = RANGE + 0.5;
        p.drawingContext.save(); p.drawingContext.beginPath(); p.drawingContext.rect(box.x, box.y, box.w, box.h); p.drawingContext.clip();
        const col = locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.I;
        p.stroke(col); p.strokeWeight(9); p.drawingContext.globalAlpha = 0.25; p.line(X(xa), Y(mm * xa + v.b), X(xb), Y(mm * xb + v.b));
        p.drawingContext.globalAlpha = 1; p.strokeWeight(2.5); p.line(X(xa), Y(mm * xa + v.b), X(xb), Y(mm * xb + v.b));
        // Escalón de la pendiente desde el corte con el eje y.
        p.stroke(C.N); p.strokeWeight(2); p.drawingContext.setLineDash([4, 4]);
        p.line(X(0), Y(v.b), X(v.run), Y(v.b)); p.line(X(v.run), Y(v.b), X(v.run), Y(v.b + v.rise)); p.drawingContext.setLineDash([]);
        p.drawingContext.restore();
        p.noStroke(); p.fill(C.N); p.circle(X(0), Y(v.b), 9);
        // Cristales.
        [r.P, r.Q].forEach(Pt => {
          const x = X(Pt[0]), y = Y(Pt[1]), lit = hits(v, Pt);
          p.stroke(C.ink); p.strokeWeight(1.5); p.fill(lit && !VELO.on ? C.ok : C.Z);
          p.quad(x, y - 11, x + 8, y, x, y + 11, x - 8, y);
          p.noStroke(); p.fill(C.ink); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM);
          p.text(`(${num(Pt[0])}, ${num(Pt[1])})`, Math.max(box.x + 28, Math.min(box.x + box.w - 28, x)), y - 13);
        });
        if (locked && !ok) { p.noStroke(); p.fill(C.ok); p.textSize(13); p.textAlign(p.CENTER, p.TOP); p.text(`era ${texOf(r).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2 ').replace(/-/g, '−')}`, W / 2, box.y + box.h - 22); }
        rows.forEach(row => {
          const K = row.k;
          p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(K.name, 14, row.y + 17);
          p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textSize(16); p.text(num(v[K.key]), W - 81, row.y + 17);
          [[row.minus, '−'], [row.plus, '+']].forEach(([b, s]) => {
            p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
            p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(18); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
          });
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        for (const row of rows) {
          const d = inside(row.minus, p.mouseX, p.mouseY) ? -1 : inside(row.plus, p.mouseX, p.mouseY) ? 1 : 0;
          if (!d) continue;
          const K = row.k, v = vals[cur];
          v[K.key] = Math.max(K.min, Math.min(K.max, +(v[K.key] + d * K.step).toFixed(2)));
          touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean));
          return false;
        }
      };
    }, 1.6);

    return {
      loaded: m.ready,
      getState: () => ({ vals: vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, lineText };
})();
;
//#archivo js/games/raices-imanes.js
// Imanes de raíces (cálculo, funciones polinómicas): en el plano está la gráfica fantasma de un polinomio.
// Unos imanes se deslizan por el eje x (se ajustan a enteros) y marcan las raíces; dos imanes en el mismo
// lugar hacen una raíz doble (la curva rebota en vez de cruzar). Con ◀ ▶ se elige el coeficiente
// principal a. La curva del estudiante y su fórmula factorizada y = a(x − r₁)(x − r₂)… se arman en vivo.
// params = { rounds: [{ roots: [r…], a, xr, yr, mark: [x, y] }] }   (mark: un punto rotulado de la fantasma)
// state = { rounds: [{ roots: [r…], a }] }

GAMES['raices-imanes'] = (() => {
  const AS = [-2, -1, -0.5, 0.5, 1, 2];
  const value = (roots, a, x) => roots.reduce((acc, r) => acc * (x - r), a);
  const SUP = { 2: '²', 3: '³', 4: '⁴' };
  function formula(roots, a) {
    const count = new Map();
    [...roots].sort((u, w) => u - w).forEach(r => count.set(r, (count.get(r) || 0) + 1));
    const parts = [...count].sort(([u], [w]) => (u === 0 ? -1 : w === 0 ? 1 : u - w)).map(([r, k]) => {
      const e = SUP[k] || '';
      return r === 0 ? `x${e}` : `(x ${r < 0 ? '+' : '−'} ${numTxt(Math.abs(r))})${e}`;
    });
    const coef = a === 1 ? '' : a === -1 ? '−' : numTxt(a);
    return `y = ${coef}${parts.join('')}`;
  }
  const sorted = a => [...a].sort((u, w) => u - w).join(',');
  const same = (s, r) => !!s && sorted(s.roots) === sorted(r.roots) && s.a === r.a;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.rounds[i], r));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) ${formula(r.roots, r.a)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = params.rounds.map(r => ({ roots: r.roots.map((_, k) => Math.ceil(r.xr[0]) + 1 + k), a: 1 }));
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = -1, btns = [];

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 46 - 110, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 46, w, h }, r.xr, r.yr);
      const by = H - 48;
      btns = [{ d: -1, x: 12, y: by, w: 56, h: 40 }, { d: 1, x: W - 68, y: by, w: 56, h: 40 }];
    }
    const touch = () => { touched[cur] = true; api.ready(touched.every(Boolean)); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], s = st[cur], ok = same(s, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(st[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        drawPlane(p, C, v);
        // Fantasma.
        p.stroke(C.mute); p.strokeWeight(5); p.drawingContext.setLineDash([2, 8]);
        drawCurve(p, v, x => value(r.roots, r.a, x)); p.drawingContext.setLineDash([]);
        if (r.mark) {
          p.noStroke(); p.fill(C.mute); p.circle(v.X(r.mark[0]), v.Y(r.mark[1]), 10);
          p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.CENTER);
          p.text(`(${numTxt(r.mark[0])}, ${numTxt(r.mark[1])})`, v.X(r.mark[0]) + 8, v.Y(r.mark[1]) - 10);
        }
        // Curva del estudiante.
        p.stroke(locked ? (ok ? C.ok : C.bad) : C.brand); p.strokeWeight(3);
        drawCurve(p, v, x => value(s.roots, s.a, x));
        // Imanes (apilados si coinciden).
        const seen = new Map();
        s.roots.forEach((x, k) => {
          const n = seen.get(x) || 0; seen.set(x, n + 1);
          const cx = v.X(x), cy = v.Y(0) - n * 22;
          p.stroke(C.ink); p.strokeWeight(2); p.fill(drag === k ? C.N : C.I); p.rect(cx - 9, cy - 9, 18, 18, 4);
          p.noStroke(); p.fill(C.card); p.rect(cx - 9, cy + 3, 18, 6);
        });
        // Fórmula y coeficiente.
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.fill(locked ? (ok ? C.ok : C.bad) : C.ink);
        fitText(p, formula(s.roots, s.a), W / 2, v.box.y + v.box.h + 24, W - 24, 18);
        if (locked && !ok) { p.fill(C.ok); fitText(p, formula(r.roots, r.a), W / 2, v.box.y + v.box.h + 46, W - 24, 14); }
        p.fill(C.R); p.textSize(16); p.text(`a = ${numTxt(s.a)}`, W / 2, H - 28);
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.R); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(16); p.text(b.d < 0 ? '◀' : '▶', b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const s = st[cur], b = btns.find(b => hitBox(b, p.mouseX, p.mouseY));
        if (b) { s.a = AS[Math.max(0, Math.min(AS.length - 1, AS.indexOf(s.a) + b.d))]; touch(); api.sfx?.tap?.(); return false; }
        const seen = new Map();
        const pts = s.roots.map(x => { const n = seen.get(x) || 0; seen.set(x, n + 1); return { x: v.X(x), y: v.Y(0) - n * 22 }; });
        // El imán de arriba de la pila es el que se agarra.
        let best = -1, bd = 26;
        pts.forEach((pt, k) => { const d = Math.hypot(pt.x - p.mouseX, pt.y - p.mouseY); if (d <= bd + 0.5) { bd = d; best = k; } });
        drag = best;
        if (drag >= 0) return false;
      };
      p.mouseDragged = () => {
        if (drag < 0 || locked) return;
        const r = params.rounds[cur], x = Math.max(Math.ceil(r.xr[0]) + 1, Math.min(Math.floor(r.xr[1]) - 1, Math.round(v.toX(p.mouseX))));
        if (x !== st[cur].roots[drag]) { st[cur].roots[drag] = x; touch(); }
        return false;
      };
      p.mouseReleased = () => { drag = -1; };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ rounds: st.map(s => ({ roots: s.roots.slice(), a: s.a })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, formula, value, AS };
})();
;
//#archivo js/games/cruz-asintotas.js
// La cruz de asíntotas (cálculo, funciones racionales): arriba está la fórmula y = (px + q)/(x − h). En el
// plano hay una cruz (dos rectas punteadas) que se arrastra (ajuste a enteros); la hipérbola se dibuja
// pegada a la cruz, así que hay que llevarla al lugar correcto: la vertical donde el denominador se anula
// (x = h) y la horizontal a la altura del cociente de los coeficientes principales (y = p).
// params = { rounds: [{ p, q, h, xr, yr }] }   state = { cross: [[x, y]] }

GAMES['cruz-asintotas'] = (() => {
  const center = r => [r.h, r.p];
  const kOf = r => r.p * r.h + r.q;
  function lin(m, b) {
    const mx = m === 1 ? 'x' : m === -1 ? '−x' : `${numTxt(m)}x`;
    return b === 0 ? mx : `${mx} ${b < 0 ? '−' : '+'} ${numTxt(Math.abs(b))}`;
  }
  const fText = r => `y = (${lin(r.p, r.q)}) / (${lin(1, -r.h)})`;
  const same = (c, r) => !!c && c[0] === r.h && c[1] === r.p;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.cross[i], r));
    return { ok, solution: params.rounds.map((r, i) => `${i + 1}) x = ${numTxt(r.h)}, y = ${numTxt(r.p)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const cross = params.rounds.map(() => [0, 0]), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], v = null, drag = null;

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], w = W - 24, h = Math.min(H - 84 - 70, w * (r.yr[1] - r.yr[0]) / (r.xr[1] - r.xr[0]));
      v = planeView({ x: 12, y: 84, w, h }, r.xr, r.yr);
    }
    function dashed(p, x, y, col) {
      p.stroke(col); p.strokeWeight(2.5); p.drawingContext.setLineDash([7, 6]);
      p.line(v.X(x), v.box.y + 3, v.X(x), v.box.y + v.box.h - 3); p.line(v.box.x + 3, v.Y(y), v.box.x + v.box.w - 3, v.Y(y));
      p.drawingContext.setLineDash([]);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], [cx, cy] = cross[cur], k = kOf(r), ok = same(cross[cur], r);
        drawTabs(p, C, tabs, cur, i => (locked ? (same(cross[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, fText(r), W / 2, 62, W - 24, 19);
        drawPlane(p, C, v);
        if (locked && !ok) dashed(p, r.h, r.p, C.ok);
        dashed(p, cx, cy, locked ? (ok ? C.ok : C.bad) : C.N);
        p.stroke(C.brand); p.strokeWeight(3.5);
        drawCurve(p, v, x => k / (x - cx) + cy, v.xr[0], cx - 1e-6, 160);
        drawCurve(p, v, x => k / (x - cx) + cy, cx + 1e-6, v.xr[1], 160);
        // Manija de la cruz.
        p.stroke(C.ink); p.strokeWeight(2); p.fill(drag ? C.N : C.card); p.circle(v.X(cx), v.Y(cy), 22);
        p.noStroke(); p.fill(C.N); p.textSize(12); p.textAlign(p.LEFT, p.BOTTOM);
        p.text(`(${numTxt(cx)}, ${numTxt(cy)})`, Math.min(v.X(cx) + 13, W - 70), v.Y(cy) - 8);
        p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(14);
        const by = v.box.y + v.box.h + 22;
        p.fill(C.N); fitText(p, `Dominio: ℝ ∖ {${numTxt(cx)}}`, W / 4 + 4, by, W / 2 - 12, 14);
        p.fill(C.Z); fitText(p, `Rango: ℝ ∖ {${numTxt(cy)}}`, 3 * W / 4 - 4, by, W / 2 - 12, 14);
        p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, 'Arrastra el centro de la cruz', W / 2, by + 24, W - 24, 12);
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked || !hitBox(v.box, p.mouseX, p.mouseY)) return;
        drag = true; p.mouseDragged(); return false;
      };
      p.mouseDragged = () => {
        if (!drag || locked) return;
        const r = params.rounds[cur];
        const x = Math.max(Math.ceil(r.xr[0]) + 1, Math.min(Math.floor(r.xr[1]) - 1, Math.round(v.toX(p.mouseX))));
        const y = Math.max(Math.ceil(r.yr[0]) + 1, Math.min(Math.floor(r.yr[1]) - 1, Math.round(v.toY(p.mouseY))));
        if (x !== cross[cur][0] || y !== cross[cur][1]) { cross[cur] = [x, y]; touched[cur] = true; api.ready(touched.every(Boolean)); }
        return false;
      };
      p.mouseReleased = () => { drag = null; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ cross: cross.map(c => c.slice()) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, center, kOf, fText };
})();
;
//#archivo js/games/alcancias-gemelas.js
// Las alcancías gemelas (Álgebra 1.4, simple contra compuesto): dos alcancías arrancan con el mismo capital.
// La de la derecha crece con interés compuesto a una tasa fija durante n periodos; la de la izquierda, con
// interés simple a la tasa que se elija (deslizador o − / +, de décima en décima). Meta: que al final las dos
// queden al mismo nivel. La tasa simple tiene que ser MAYOR que la compuesta, porque el compuesto gana
// interés sobre el interés: ((1 + r)ⁿ − 1)/n.
// params = { rounds: [{ C, r, n }], tol, max }   state = { rates: [tasa % | null] }

GAMES['alcancias-gemelas'] = (() => {
  const equivalent = (r, n) => (((1 + r / 100) ** n - 1) / n) * 100;
  let near = (x, r, tol) => x != null && Math.abs(x - equivalent(r.r, r.n)) <= tol + 1e-9;
  const fmt = v => { const r = +v.toFixed(2); return Number.isInteger(r) ? String(r).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(r); };

  near = velo(near);
  function grade(state, params) {
    const ok = params.rounds.every((r, i) => near(state.rates?.[i], r, params.tol));
    const solution = params.rounds.map(r => `${r.r} % compuesto en ${r.n} periodos ≈ ${fmt(+equivalent(r.r, r.n).toFixed(2))} % simple`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds, max = params.max ?? 40, step = 0.1;
    const st = { rates: R.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], jars = [], slider = null, minus = null, plus = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      const jw = Math.min(110, (w - 60) / 2);
      jars = [{ x: w * 0.28 - jw / 2, y: 104, w: jw, h: h - 270 }, { x: w * 0.72 - jw / 2, y: 104, w: jw, h: h - 270 }];
      slider = { x0: 24, x1: w - 24, y: h - 104 };
      minus = { x: 14, y: h - 56, w: 64, h: 38 }; plus = { x: w - 78, y: h - 56, w: 64, h: 38 };
    }
    const setRate = v => { st.rates[cur] = Math.min(max, Math.max(0, Math.round(v / step) * step)); st.rates[cur] = +st.rates[cur].toFixed(1); api.ready(st.rates.every(x => x != null)); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function jar(b, amounts, col, title, sub) {
        const top = amounts[amounts.length - 1], scaleTop = Math.max(...amounts, R[cur].C * (1 + max * R[cur].n / 100)) * 1.02;
        const Yv = v => b.y + b.h - (v / scaleTop) * b.h;
        p.stroke(C.line); p.strokeWeight(2); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 6, 6, 22, 22);
        // Capas: una por periodo (la primera es el capital)
        for (let k = amounts.length - 1; k >= 0; k--) {
          const c = p.color(col); c.setAlpha(k === 0 ? 90 : 120 + 120 * k / amounts.length);
          p.noStroke(); p.fill(c); p.rect(b.x + 4, Yv(amounts[k]), b.w - 8, b.y + b.h - 4 - Yv(amounts[k]), 4, 4, 18, 18);
        }
        p.stroke(C.ink); p.strokeWeight(2); p.line(b.x - 6, Yv(top), b.x + b.w + 6, Yv(top));
        p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.BOTTOM); fitText(p, fmt(top), b.x + b.w / 2, Yv(top) - 5, b.w + 30, 14);
        p.fill(col); p.textSize(13); p.textAlign(p.CENTER, p.TOP); p.text(title, b.x + b.w / 2, b.y + b.h + 8);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(11); fitText(p, sub, b.x + b.w / 2, b.y + b.h + 32, b.w + 40, 11);
        return Yv(top);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], x = st.rates[cur], ok = near(x, r, params.tol);
        drawTabs(p, C, tabs, cur, i => (locked ? (near(st.rates[i], R[i], params.tol) ? C.ok : C.bad) : i === cur ? C.brand : st.rates[i] != null ? C.Z : C.line));
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.LEFT, p.TOP);
        p.text(`Las dos empiezan con ${fmt(r.C)} y pasan ${r.n} periodos. Elige la tasa simple que las iguala.`, 14, 48, W - 28, 40);
        const comp = Array.from({ length: r.n + 1 }, (_, k) => r.C * (1 + r.r / 100) ** k);
        const simp = Array.from({ length: r.n + 1 }, (_, k) => r.C * (1 + (x ?? 0) * k / 100));
        const ys = jar(jars[0], simp, C.Z, 'Simple', x == null ? 'tasa: ?' : `tasa: ${String(x.toFixed(1))} %`);
        const yc = jar(jars[1], comp, C.R, 'Compuesto', `tasa: ${String(r.r)} %`);
        if (x != null) { p.stroke(ok ? C.ok : C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([5, 5]); p.line(jars[0].x + jars[0].w, ys, jars[1].x, yc); p.drawingContext.setLineDash([]); }
        // Deslizador de la tasa simple
        const sx = v => slider.x0 + (v / max) * (slider.x1 - slider.x0);
        p.stroke(C.line); p.strokeWeight(4); p.line(slider.x0, slider.y, slider.x1, slider.y);
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textAlign(p.CENTER, p.TOP);
        for (let k = 0; k <= max; k += 10) p.text(`${k} %`, sx(k), slider.y + 10);
        if (x != null) { p.fill(C.Z); p.stroke(C.ink); p.strokeWeight(2); p.circle(sx(x), slider.y, 22); }
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => {
          p.stroke(locked ? C.line : C.brand); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 8);
          p.noStroke(); p.fill(locked ? C.mute : C.brand); p.textSize(20); p.textAlign(p.CENTER, p.CENTER); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textSize(12);
        if (locked && !ok) { p.fill(C.ok); p.textStyle(p.BOLD); fitText(p, `≈ ${fmt(+equivalent(r.r, r.n).toFixed(2))} % simple`, W / 2, minus.y + 19, W - 170, 12); }
        else { p.fill(ok ? C.ok : C.mute); p.textStyle(ok ? p.BOLD : p.NORMAL); fitText(p, ok ? '¡Mismo nivel!' : '0.1 % por toque', W / 2, minus.y + 19, W - 170, 12); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const d = hitBox(plus, p.mouseX, p.mouseY) ? 1 : hitBox(minus, p.mouseX, p.mouseY) ? -1 : 0;
        if (d) { setRate((st.rates[cur] ?? R[cur].r) + d * step); api.sfx?.tap?.(); return false; }
        if (Math.abs(p.mouseY - slider.y) < 26 && p.mouseX > slider.x0 - 12 && p.mouseX < slider.x1 + 12) { drag = true; setRate((p.mouseX - slider.x0) / (slider.x1 - slider.x0) * max); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { setRate((p.mouseX - slider.x0) / (slider.x1 - slider.x0) * max); return false; } };
      p.mouseReleased = () => { drag = false; };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ rates: [...st.rates] }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, equivalent };
})();
;
//#archivo js/games/pinta-venn.js
// Pinta el Venn (Álgebra 0, operaciones entre conjuntos): un diagrama de Venn de 2 o 3 círculos dentro del
// universo U. Cada toque pinta o despinta la zona tocada. Meta: pintar exactamente las zonas de la operación
// pedida (A − B, (A ∪ B)ᶜ, A ∩ (B ∪ C)…). Cada zona se identifica por los círculos en los que está (máscara
// de bits: 1 = A, 2 = B, 4 = C; 0 = fuera de todos).
// params = { rounds: [{ text, n: 2 | 3, f(a, b, c) → bool }] }   state = { masks: [[máscaras pintadas]] }

GAMES['pinta-venn'] = (() => {
  const targetMasks = r => Array.from({ length: 2 ** r.n }, (_, m) => m).filter(m => r.f(!!(m & 1), !!(m & 2), !!(m & 4)));
  const good = (ms, r) => { const t = targetMasks(r); return !!ms && ms.length === t.length && t.every(m => ms.includes(m)); };
  const NAMES = ['A', 'B', 'C'];

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => good(state.masks?.[i], r));
    const zone = (m, n) => { const inn = NAMES.slice(0, n).filter((_, k) => m & (1 << k)), out = NAMES.slice(0, n).filter((_, k) => !(m & (1 << k))); return inn.length ? inn.join(' ∩ ') + (out.length ? ` sin ${out.join(' ni ')}` : '') : 'fuera de todos'; };
    const solution = params.rounds.map(r => `${r.text}: ${targetMasks(r).map(m => zone(m, r.n)).join(', ')}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const st = { masks: R.map(() => []) };
    const touched = R.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], box = null, circles = [];

    function layout(w, h) {
      W = w; H = h;
      tabs = roundTabs(R.length);
      box = { x: 12, y: 102, w: w - 24, h: h - 102 - 34 };
      placeCircles();
    }
    function placeCircles() {
      const n = R[cur].n, cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      if (n === 2) {
        const r = Math.min(box.w / 3.4, box.h / 2.5);
        circles = [{ x: cx - r * 0.6, y: cy, r }, { x: cx + r * 0.6, y: cy, r }];
      } else {
        const r = Math.min(box.w / 3.3, box.h / 3.3);
        circles = [{ x: cx - r * 0.58, y: cy - r * 0.4, r }, { x: cx + r * 0.58, y: cy - r * 0.4, r }, { x: cx, y: cy + r * 0.6, r }];
      }
    }
    const maskAt = (x, y) => SK.maskAt(circles, x, y);
    const toggle = m => {
      const ms = st.masks[cur], i = ms.indexOf(m);
      if (i >= 0) ms.splice(i, 1); else ms.push(m);
      touched[cur] = true; api.ready(touched.every(Boolean));
    };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], ms = st.masks[cur], tgt = targetMasks(r), S = SK.sets(C), fine = good(ms, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (good(st.masks[i], R[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        SK.kicker(p, C, 'Pinta las zonas de', 14, 56);
        p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        fitText(p, r.text, W / 2, 82, W - 28, 23);
        SK.panel(p, C, box, { u: true });
        // Zonas pintadas, con su borde exacto. Al calificar: verde lo bien pintado, rojo lo que sobraba y rayado lo que faltaba.
        const fill = (masks, col, a) => SK.zones(p, box, circles, masks, { col, alpha: a });
        if (!locked) fill(ms, C.brand, 120);
        else {
          fill(ms.filter(k => tgt.includes(k)), C.ok, 130); fill(ms.filter(k => !tgt.includes(k)), C.bad, 130);
          SK.zones(p, box, circles, tgt.filter(k => !ms.includes(k)), { col: C.ok, hatch: true });
        }
        circles.forEach((c, k) => { p.noFill(); p.stroke(SK.al(p, S[k].line, 40)); p.strokeWeight(8); p.circle(c.x, c.y, 2 * c.r); p.stroke(S[k].line); p.strokeWeight(2.2); p.circle(c.x, c.y, 2 * c.r); });
        p.noStroke();
        const lab = [[-0.8, -0.8], [0.8, -0.8], [0, 1.1]];
        circles.forEach((c, k) => SK.tag(p, C, NAMES[k], c.x + lab[k][0] * c.r, Math.min(box.y + box.h - 16, c.y + lab[k][1] * c.r), S[k]));
        p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.NORMAL); p.textSize(11);
        p.fill(locked && !fine ? C.ok : C.mute);
        p.text(locked ? (fine ? '' : 'Rayado: faltaba pintar · rojo: sobraba') : 'Toca una zona para pintarla o despintarla', W / 2, H - 15);
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(b => hitBox(b, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; placeCircles(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (hitBox(box, p.mouseX, p.mouseY)) { toggle(maskAt(p.mouseX, p.mouseY)); api.sfx?.tap?.(); return false; }
      };
    }, 1.2);

    return {
      loaded: m.ready,
      getState: () => ({ masks: st.masks.map(x => [...x]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, targetMasks };
})();
;
//#archivo js/games/solapa-cardinal.js
// Solapa los conjuntos (Álgebra 0, alg-0c; spec 2026-11-18-algebra-revision): el cardinal de la unión. A y B tienen
// sus puntos (personas); al arrastrar B sobre A, algunos puntos pasan a la zona común y la cuenta se escribe sola:
// n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Hay que solapar justo lo que hace falta para que la unión tenga el total dado.
// params = { rounds: [{ a, b, total, A, B }] }   (A, B: qué cuenta cada conjunto)   state = { rounds: [{ k }] }   (k = n(A ∩ B))
GAMES['solapa-cardinal'] = (() => {
  const need = r => r.a + r.b - r.total;
  // Puntos repartidos en un óvalo (rejilla que llena la zona).
  function dots(p, n, cx, cy, rx, ry, col) {
    const cols = Math.max(1, Math.ceil(Math.sqrt(n * rx / ry))), rows = Math.ceil(n / cols);
    p.noStroke(); p.fill(col);
    for (let i = 0; i < n; i++) { const c = i % cols, rr = Math.floor(i / cols); p.circle(cx + (c - (cols - 1) / 2) * Math.min(14, (2 * rx) / cols), cy + (rr - (rows - 1) / 2) * Math.min(14, (2 * ry) / rows), 7); }
  }
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ k: 1 }),
    ok: (s, r) => s.k === need(r),
    solution: r => `n(A ∩ B) = ${r.a} + ${r.b} − ${r.total} = ${need(r)}`,
    prompt: r => `${r.a} ${r.A}, ${r.b} ${r.B}: en total son ${r.total}. Solapa B`,
    foot: () => 'Arrastra B: lo que comparten queda en la zona común',
    layout(G) { const W = G.W, H = G.H; G.cy = H * 0.46; G.R = Math.min(W * 0.25, H * 0.2); G.fb = { x: 12, y: H - 88, w: W - 24, h: 54 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, [SA, SB] = SK.sets(C), good = !VELO.on && G.s.k === need(r), k = G.locked && !good ? need(r) : G.s.k, m = Math.min(r.a, r.b);
      // La distancia entre centros sale de k: sin compartir, separados; todo compartido, el menor adentro del mayor.
      const R = G.R, f = m ? k / m : 0, d = 2 * R * (1 - f) + 0.15 * R * f, ax = G.W / 2 - d / 2, bx = G.W / 2 + d / 2;
      G.bx = bx;
      SK.membrane(p, C, ax, G.cy, R, R * 0.85, SA.line, { fill: 26 }); SK.membrane(p, C, bx, G.cy, R, R * 0.85, SB.line, { fill: 26 });
      SK.tag(p, C, 'A', ax - R * 0.7, G.cy - R * 0.85, SA); SK.tag(p, C, 'B', bx + R * 0.7, G.cy - R * 0.85, SB);
      const lensW = Math.max(0, 2 * R - d) / 2;
      dots(p, r.a - k, ax - lensW / 2 - R * 0.15, G.cy, Math.max(12, (R - lensW) * 0.6), R * 0.55, SA.line);
      dots(p, r.b - k, bx + lensW / 2 + R * 0.15, G.cy, Math.max(12, (R - lensW) * 0.6), R * 0.55, SB.line);
      if (k) dots(p, k, (ax + bx) / 2, G.cy, Math.max(8, lensW * 0.7), R * 0.6, C.brand);
      TK.label(p, C, `${r.a - k}`, ax - R * 0.55, G.cy + R * 0.95, SA.ink, 12, 40);
      TK.label(p, C, `${k}`, (ax + bx) / 2, G.cy + R * 0.95, C.ink, 12, 40);
      TK.label(p, C, `${r.b - k}`, bx + R * 0.55, G.cy + R * 0.95, SB.ink, 12, 40);
      const u = r.a + r.b - k;
      SK.formal(p, C, G.fb, `$n(A \\cup B) = ${r.a} + ${r.b} - ${k} = ${u}$`, { kicker: `Meta: ${r.total}`, col: G.locked ? C.ok : u === r.total && !VELO.on ? C.ok : SB.line, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.cy) > G.R * 1.1 || x < G.W * 0.3) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.bx, y: G.cy }, to: { x: G.bx - G.R * 0.6, y: G.cy }, text: 'Arrastra B sobre A', ty: G.cy - G.R - 22 }),
    peek: G => ({ cy: G.cy, R: G.R, need: need(G.r) }),
  });
  // El dedo fija dónde está B; de ahí sale cuántos puntos comparten.
  game.move = (G, x) => {
    const r = G.r, m = Math.min(r.a, r.b), R = G.R, d = Math.max(0.15 * R, Math.min(2 * R, 2 * (x - G.W / 2))), f = (2 * R - d) / (2 * R - 0.15 * R);
    const k = Math.max(0, Math.min(m, Math.round(f * m)));
    if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); }
  };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/recta-kit.js
// Piezas de dibujo del mundo «La Recta Real» (spec 2026-11-18-algebra-revision). Va después de kit.js y formula.js.
// Flechas sobre la recta, manijas, fichas y la franja de escritura formal (TeX entre $…$).
const RK = (() => {
  const al = (p, col, a) => { const c = p.color(col); c.setAlpha(a); return c; };
  // Ficha con texto. o = { on, col, r, size }.
  function chip(p, C, b, txt, o = {}) {
    const col = o.col ?? C.brand;
    p.stroke(o.on ? col : C.line); p.strokeWeight(o.on ? 2 : 1.2); p.fill(o.on ? al(p, col, 60) : C.card); p.rect(b.x, b.y, b.w, b.h, o.r ?? 9);
    p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
    fitText(p, String(txt), b.x + b.w / 2, b.y + b.h / 2 + 1, b.w - 8, o.size ?? 14, b.h - 4);
  }
  // Flecha horizontal de x0 a x1 a la altura y.
  function arrow(p, x0, x1, y, col, w = 4) {
    p.stroke(col); p.strokeWeight(w); p.line(x0, y, x1, y);
    const d = Math.sign(x1 - x0) || 1;
    p.noStroke(); p.fill(col); if (Math.abs(x1 - x0) > 2) p.triangle(x1 + d * 2, y, x1 - d * 11, y - 7, x1 - d * 11, y + 7);
  }
  function knob(p, C, x, y, col) { p.stroke(col); p.strokeWeight(3); p.fill(C.cream ?? C.card); p.circle(x, y, 22); }
  // Franja de escritura formal, con rótulo pequeño opcional.
  function strip(p, C, b, tex, o = {}) {
    if (VELO.on) o = { ...o, kicker: '' };   // en evaluación el rótulo no comenta la respuesta
    p.stroke(C.line); p.strokeWeight(1); p.fill(al(p, C.card, 230)); p.rect(b.x, b.y, b.w, b.h, 12);
    p.noStroke(); p.fill(o.col ?? C.brand); p.rect(b.x + 1, b.y + 9, 3, b.h - 18, 2);
    if (o.kicker) { p.fill(C.mute); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.CENTER); p.textSize(10); p.text(o.kicker, b.x + 14, b.y + 12); }
    p.fill(C.ink); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
    fitText(p, tex, b.x + b.w / 2 + 4, b.y + b.h / 2 + (o.kicker ? 7 : 1), b.w - 28, o.size ?? 18, b.h - (o.kicker ? 22 : 10));
  }
  // Número en TeX: entero, decimal corto o fracción (−0.5 → −½).
  const num = v => { if (Number.isInteger(v)) return String(v); for (let d = 2; d <= 12; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`; } return String(+v.toFixed(3)); };
  // Entre paréntesis si es negativo: 3 − (−4).
  const par = v => (v < 0 ? `(${num(v)})` : num(v));
  // Regla de valores con manija: n marcas de x0 a x1; lab(k) rotula la marca k (o null). Devuelve la x de cada marca.
  function track(p, C, x0, x1, y, n, i, lab, col) {
    const X = k => x0 + k * (x1 - x0) / (n - 1);
    p.stroke(C.line); p.strokeWeight(2); p.line(x0, y, x1, y);
    for (let k = 0; k < n; k++) { p.stroke(C.line); p.strokeWeight(1.5); p.line(X(k), y - 4, X(k), y + 4); const t = lab?.(k); if (t != null) TK.label(p, C, t, X(k), y + 18, k === i ? C.brand : C.mute, 10, Math.max(22, (x1 - x0) / n * 1.8)); }
    knob(p, C, X(i), y, col ?? C.brand);
    return X;
  }
  const pick = (x, x0, x1, n) => Math.max(0, Math.min(n - 1, Math.round((x - x0) / (x1 - x0) * (n - 1))));
  // Bloque algebraico: kind 2 = cuadrado x², 1 = barra x (vertical), 0 = cuadrito 1. u = lado x; s = lado 1. Negativo en coral.
  const tileSize = (kind, u, s) => (kind === 2 ? [u, u] : kind === 1 ? [s, u] : [s, s]);
  function tile(p, C, kind, x, y, u, s, neg, o = {}) {
    const [w, h] = tileSize(kind, u, s), col = neg ? C.coral : [C.mint, C.sky, C.sun][2 - kind];
    p.stroke(o.lift ? C.brand : RK_ink(C, col)); p.strokeWeight(o.lift ? 2 : 1.2); p.fill(al(p, col, o.ghost ? 40 : 170)); p.rect(x, y, w, h, 3);
    if (o.label !== false && Math.min(w, h) >= 14) { p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(Math.min(12, h * 0.6)); p.text((neg ? '−' : '') + ['1', 'x', 'x²'][kind], x + w / 2, y + h / 2 + 1); }
    return [w, h];
  }
  const RK_ink = (C, col) => C.line;
  // Plano cartesiano en la caja b con la ventana v = { x0, x1, y0, y1 }; o = { step, lx, ly } (rótulos de los ejes).
  // Devuelve { X, Y, iX, iY } para pasar de valores a pantalla y de vuelta.
  function plane(p, C, b, v, o = {}) {
    const X = x => b.x + (x - v.x0) / (v.x1 - v.x0) * b.w, Y = y => b.y + b.h - (y - v.y0) / (v.y1 - v.y0) * b.h;
    const iX = px => v.x0 + (px - b.x) / b.w * (v.x1 - v.x0), iY = py => v.y0 + (b.y + b.h - py) / b.h * (v.y1 - v.y0);
    p.noStroke(); p.fill(al(p, C.card, 150)); p.rect(b.x, b.y, b.w, b.h, 8);
    const st = o.step ?? 1;
    p.stroke(al(p, C.line, 120)); p.strokeWeight(1);
    for (let x = Math.ceil(v.x0 / st) * st; x <= v.x1; x += st) p.line(X(x), b.y, X(x), b.y + b.h);
    for (let y = Math.ceil(v.y0 / st) * st; y <= v.y1; y += st) p.line(b.x, Y(y), b.x + b.w, Y(y));
    p.stroke(C.ink); p.strokeWeight(1.6);
    if (v.y0 <= 0 && v.y1 >= 0) p.line(b.x, Y(0), b.x + b.w, Y(0));
    if (v.x0 <= 0 && v.x1 >= 0) p.line(X(0), b.y, X(0), b.y + b.h);
    if (o.lx) TK.label(p, C, o.lx, b.x + b.w - 10, Math.min(b.y + b.h - 8, Y(0) - 10), C.mute, 10, 30);
    if (o.ly) TK.label(p, C, o.ly, Math.max(b.x + 10, X(0) + 12), b.y + 10, C.mute, 10, 30);
    return { X, Y, iX, iY };
  }
  // Curva y = f(x) recortada a la caja.
  function curve(p, b, M, v, f, col, w = 2.5) {
    p.noFill(); p.stroke(col); p.strokeWeight(w); p.beginShape();
    for (let i = 0; i <= 120; i++) { const x = v.x0 + (v.x1 - v.x0) * i / 120, y = f(x); if (!Number.isFinite(y) || y < v.y0 - 1 || y > v.y1 + 1) { p.endShape(); p.beginShape(); continue; } p.vertex(M.X(x), M.Y(y)); }
    p.endShape();
  }
  return { al, chip, arrow, knob, strip, num, par, track, pick, tile, tileSize, plane, curve };
})();
;
//#archivo js/games/barra-razon.js
// La cinta de la razón (Álgebra, alg-12; spec 2026-11-18-algebra-revision): el diagrama de cinta. Una cinta de T unidades
// se parte con una manija en dos tramos, A y B; abajo se escribe A : B y su forma más simple. Hay que dejar la razón que
// pide la ronda: con 2 : 5 en 35, cada «parte» vale 5 y la cinta queda 10 y 25.
// params = { rounds: [{ T, p, q, A, B }] }   state = { rounds: [{ a }] }   (a: unidades del primer tramo)
GAMES['barra-razon'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const need = r => (r.T * r.p) / (r.p + r.q);
  let ok = (s, r) => s.a * r.q === (r.T - s.a) * r.p;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 0.95,
    init: r => ({ a: Math.round(r.T / 2) === need(r) ? Math.round(r.T / 2) + 1 : Math.round(r.T / 2) }),
    ok,
    solution: r => `${need(r)} de ${r.A} y ${r.T - need(r)} de ${r.B}`,
    prompt: r => `${r.T} en total, ${r.A} a ${r.B} como ${r.p} : ${r.q}`,
    foot: () => 'Arrastra la manija para partir la cinta',
    layout(G) { G.bar = { x: 16, y: G.H * 0.42, w: G.W - 32, h: 46 }; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r, bar } = G, a = G.locked && !ok(G.s, r) ? need(r) : G.s.a, b = r.T - a, u = bar.w / r.T, g = gcd(a, b) || 1;
      p.stroke(C.line); p.strokeWeight(1); p.fill(C.sky); p.rect(bar.x, bar.y, a * u, bar.h, 6, 0, 0, 6); p.fill(C.coral); p.rect(bar.x + a * u, bar.y, b * u, bar.h, 0, 6, 6, 0);
      if (u > 5) for (let i = 1; i < r.T; i++) { p.stroke(RK.al(p, C.ink, 50)); p.strokeWeight(1); p.line(bar.x + i * u, bar.y + 4, bar.x + i * u, bar.y + bar.h - 4); }
      TK.label(p, C, `${r.A}: ${a}`, bar.x + a * u / 2, bar.y - 14, C.ink, 12, Math.max(60, a * u)); TK.label(p, C, `${r.B}: ${b}`, bar.x + a * u + b * u / 2, bar.y - 14, C.ink, 12, Math.max(60, b * u));
      G.hx = bar.x + a * u; RK.knob(p, C, G.hx, bar.y + bar.h + 26, C.brand);
      RK.strip(p, C, G.fb, `$${a} : ${b} = ${a / g} : ${b / g}$`, { kicker: `Meta: ${r.p} : ${r.q}`, col: G.locked ? C.ok : ok(G.s, r) ? C.ok : C.brand, size: 20 });
    },
    press(G, x, y) { if (Math.abs(y - (G.bar.y + G.bar.h / 2)) > 60) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.hx, y: G.bar.y + G.bar.h + 26 }, to: { x: G.hx - 50, y: G.bar.y + G.bar.h + 26 }, text: 'Arrastra la manija', ty: G.bar.y - 40 }),
    peek: G => ({ bar: G.bar }),
  });
  game.move = (G, x) => { const r = G.r, a = Math.max(1, Math.min(r.T - 1, Math.round((x - G.bar.x) / (G.bar.w / r.T)))); if (a !== G.s.a || !G.touched[G.cur]) { G.s.a = a; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/mapa-escala.js
// El mapa a escala (Álgebra, alg-12f; spec 2026-11-18-algebra-revision): regla de tres con una escala. En el mapa, la
// barra de escala dice cuántos km vale 1 cm. Se arrastra el segundo pueblo sobre la regla del mapa (de medio en medio
// centímetro) hasta que la distancia en el mapa represente la distancia real pedida.
// params = { rounds: [{ cm, km, real }] }   (escala: cm centímetros = km kilómetros)   state = { rounds: [{ d }] }   (cm en el mapa)
GAMES['mapa-escala'] = (() => {
  const need = r => (r.real * r.cm) / r.km;
  let ok = (s, r) => Math.abs(s.d - need(r)) < 1e-9;
  const MAX = 10;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ d: 1 }),
    ok,
    solution: r => `${need(r)} cm en el mapa`,
    prompt: r => `Escala: ${r.cm} cm son ${r.km} km. Ubica un pueblo a ${r.real} km`,
    foot: () => 'Arrastra el segundo pueblo sobre la regla del mapa',
    layout(G) { G.map = { x: 12, y: 96, w: G.W - 24, h: G.H * 0.5 }; G.ry = G.map.y + G.map.h * 0.62; G.x0 = G.map.x + 18; G.u = (G.map.w - 36) / MAX; G.fb = { x: 12, y: G.H - 84, w: G.W - 24, h: 52 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r, map } = G, d = G.locked && !ok(G.s, r) ? need(r) : G.s.d;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.mint, 30)); p.rect(map.x, map.y, map.w, map.h, 12);
      p.noFill(); p.stroke(RK.al(p, C.mint, 120)); p.strokeWeight(1.2); p.beginShape(); for (let i = 0; i <= 8; i++) p.vertex(map.x + i * map.w / 8, map.y + 30 + Math.sin(i * 1.3) * 12); p.endShape();
      // Regla del mapa en centímetros.
      for (let i = 0; i <= MAX * 2; i++) { const x = G.x0 + i * G.u / 2; p.stroke(C.ink); p.strokeWeight(i % 2 ? 1 : 1.6); p.line(x, G.ry, x, G.ry + (i % 2 ? 5 : 9)); if (i % 2 === 0) TK.label(p, C, String(i / 2), x, G.ry + 18, C.mute, 10, 20); }
      TK.label(p, C, 'cm', G.x0 + MAX * G.u + 4, G.ry + 32, C.mute, 10, 30);
      const bx = G.x0 + d * G.u;
      p.stroke(C.brand); p.strokeWeight(2.5); p.drawingContext.setLineDash([5, 4]); p.line(G.x0, G.ry - 22, bx, G.ry - 22); p.drawingContext.setLineDash([]);
      drawDot(p, C, G.x0, G.ry - 22, 14, C.ink); TK.label(p, C, 'A', G.x0, G.ry - 40, C.ink, 12, 20);
      RK.knob(p, C, bx, G.ry - 22, C.brand); TK.label(p, C, 'B', bx, G.ry - 44, C.brand, 12, 20); G.bx = bx;
      // Barra de escala.
      p.stroke(C.ink); p.strokeWeight(3); p.line(map.x + 18, map.y + map.h - 18, map.x + 18 + r.cm * G.u, map.y + map.h - 18);
      TK.label(p, C, `${r.cm} cm = ${r.km} km`, map.x + 18 + r.cm * G.u + 50, map.y + map.h - 18, C.ink, 11, 100);
      RK.strip(p, C, G.fb, `$\\tfrac{${r.cm}\\text{ cm}}{${r.km}\\text{ km}} = \\tfrac{${d}\\text{ cm}}{${r.real}\\text{ km}}\\;?$`, { kicker: `En el mapa: ${d} cm`, col: G.locked ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - (G.ry - 22)) > 40) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.bx, y: G.ry - 22 }, to: { x: G.bx + 3 * G.u, y: G.ry - 22 }, text: 'Arrastra el pueblo B', ty: G.ry + 50 }),
    peek: G => ({ x0: G.x0, u: G.u, ry: G.ry }),
  });
  game.move = (G, x) => { const d = Math.max(0.5, Math.min(MAX, Math.round(((x - G.x0) / G.u) * 2) / 2)); if (d !== G.s.d || !G.touched[G.cur]) { G.s.d = d; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/precio-original.js
// El precio de antes (Álgebra, alg-13c; spec 2026-11-18-algebra-revision): para volver al precio original se divide entre
// el factor, no se resta el porcentaje. La barra del precio de antes se estira con la manija; el cambio la recorta (o la
// alarga) y el precio de ahora queda al lado. Hay que encontrar el precio de antes que da el precio que se ve en la
// etiqueta.
// params = { rounds: [{ r, now, step, max }] }   (r: cambio en %, negativo = descuento)   state = { rounds: [{ old }] }
GAMES['precio-original'] = (() => {
  const need = r => r.now / (1 + r.r / 100);
  let ok = (s, r) => Math.abs(s.old - need(r)) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: r => ({ old: r.now }),
    ok,
    solution: r => `${need(r)}: ${need(r)} × ${1 + r.r / 100} = ${r.now}`,
    prompt: r => `Ahora cuesta ${r.now} mil tras ${r.r < 0 ? 'un descuento' : 'un aumento'} del ${Math.abs(r.r)} %. ¿Y antes?`,
    foot: () => 'Arrastra la manija del precio de antes',
    layout(G) { G.y1 = 132; G.y2 = 200; G.tY = G.H - 120; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, old = G.locked && !ok(G.s, r) ? need(r) : G.s.old, nw = old * (1 + r.r / 100), u = (G.W - 60) / (r.max * 1.25);
      TK.label(p, C, 'antes', 30, G.y1 - 18, C.mute, 10, 50); TK.label(p, C, 'ahora', 30, G.y2 - 18, C.mute, 10, 50);
      p.noStroke(); p.fill(C.sky); p.rect(20, G.y1, old * u, 28, 5); TK.label(p, C, `${+old.toFixed(2)}`, 20 + old * u + 22, G.y1 + 14, C.ink, 12, 50);
      p.fill(r.r < 0 ? C.coral : C.mint); p.rect(20, G.y2, nw * u, 28, 5); TK.label(p, C, `${+nw.toFixed(2)}`, 20 + nw * u + 22, G.y2 + 14, C.ink, 12, 50);
      p.stroke(C.ok); p.strokeWeight(2); p.line(20 + r.now * u, G.y2 - 8, 20 + r.now * u, G.y2 + 36); TK.label(p, C, `etiqueta: ${r.now}`, Math.min(G.W - 50, 20 + r.now * u), G.y2 + 48, C.ok, 11, 90);
      const n = Math.round(r.max / r.step);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, n, Math.round(old / r.step) - 1, k => ((k + 1) % 4 === 0 ? String((k + 1) * r.step) : null));
      RK.strip(p, C, G.fb, `$${+old.toFixed(2)} \\times ${1 + r.r / 100} = ${+nw.toFixed(2)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(Math.round(G.s.old / G.r.step) - 1), y: G.tY }, to: { x: G.X(Math.round(G.s.old / G.r.step) + 3), y: G.tY }, text: 'Arrastra el precio de antes', ty: G.tY - 36 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, v = (RK.pick(x, 30, G.W - 30, Math.round(r.max / r.step)) + 1) * r.step; if (v !== G.s.old || !G.touched[G.cur]) { G.s.old = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/factorial-cajas.js
// Las filas posibles (Álgebra, alg-15; spec 2026-11-18-algebra-revision): el factorial cuenta de cuántas maneras se pone
// en fila un grupo. Hay n casillas; para la primera hay n opciones, para la segunda n − 1… Se arrastra cuántos objetos
// hay y se ven las opciones de cada casilla multiplicándose: n! = Π k. Hay que llegar al número de filas pedido.
// params = { rounds: [{ target }] }   state = { rounds: [{ n }] }   (de 1 a 7)
GAMES['factorial-cajas'] = (() => {
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const need = q => { for (let n = 1; n <= 7; n++) if (fact(n) === q.target) return n; return -1; };
  let ok = (s, q) => fact(s.n) === q.target;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ n: 2 }),
    ok,
    solution: q => `${need(q)}! = ${q.target}`,
    prompt: q => `¿Cuántos objetos se ponen en fila de ${q.target} maneras?`,
    foot: () => 'Arrastra cuántos objetos hay',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r: q } = G, n = G.locked && !ok(G.s, q) ? need(q) : G.s.n, w = Math.min(44, (G.W - 30) / n - 6);
      for (let i = 0; i < n; i++) {
        const x = G.W / 2 - (n * (w + 6) - 6) / 2 + i * (w + 6);
        p.stroke(C.line); p.strokeWeight(1.4); p.noFill(); p.rect(x, 150, w, w, 8);
        TK.label(p, C, String(n - i), x + w / 2, 150 + w / 2, C.ink, 16, w);
        TK.label(p, C, `opciones`, x + w / 2, 150 + w + 12, C.mute, 8, w + 6);
        if (i) TK.label(p, C, '×', x - 3, 150 + w / 2, C.mute, 12, 10);
      }
      G.X = RK.track(p, C, 40, G.W - 40, G.tY, 7, n - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' \\cdot ')} = ${fact(n)}$`, { col: G.locked || ok(G.s, q) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.n - 1), y: G.tY }, to: { x: G.X(G.s.n + 1), y: G.tY }, text: 'Arrastra cuántos objetos', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const n = RK.pick(x, 40, G.W - 40, 7) + 1; if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { need, fact });
})();
;
//#archivo js/games/bloques-polinomio.js
// Arma el polinomio (Álgebra, alg-23a; spec 2026-11-18-algebra-revision): un polinomio se escribe con bloques. Cuadrados
// x², barras x y cuadritos 1; los rojos son negativos. Se arrastran bloques de la bandeja a la mesa (y fuera de ella para
// quitarlos); un bloque y su opuesto se anulan. Rondas 'arma': construir el polinomio pedido; rondas 'suma': la mesa ya
// tiene P y hay que agregarle Q, y queda P + Q.
// params = { rounds: [{ mode: 'arma' | 'suma', P?, Q?, target? }] }   (coeficientes [x², x, 1])   state = { rounds: [{ c: [a, b, c] }] }
GAMES['bloques-polinomio'] = (() => {
  const goal = r => (r.mode === 'suma' ? r.P.map((v, i) => v + r.Q[i]) : r.target);
  let ok = (s, r) => s.c.join() === goal(r).join();
  const poly = c => { const t = []; [[c[0], 'x^2'], [c[1], 'x'], [c[2], '']].forEach(([v, x]) => { if (!v) return; const a = Math.abs(v), body = x ? (a === 1 ? x : a + x) : String(a); t.push((v < 0 ? '-' : t.length ? '+' : '') + body); }); return t.length ? t.join(' ') : '0'; };
  const SRC = [[2, false], [1, false], [0, false], [2, true], [1, true], [0, true]];
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ c: r.mode === 'suma' ? [...r.P] : [0, 0, 0] }),
    ok,
    answered: (s, r) => s.c.join() !== (r.mode === 'suma' ? r.P : [0, 0, 0]).join(),
    solution: r => poly(goal(r)),
    prompt: r => (r.mode === 'suma' ? `Suma $${poly(r.Q)}$ al polinomio de la mesa` : `Arma $${poly(r.target)}$ con bloques`),
    foot: () => 'Arrastra bloques a la mesa; un bloque y su opuesto se anulan',
    layout(G) { G.mat = { x: 12, y: 96, w: G.W - 24, h: G.H * 0.42 }; G.trayY = G.mat.y + G.mat.h + 14; G.u = 40; G.s = 14; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r, mat, u, s } = G, c = G.locked && !ok(G.s, r) ? goal(r) : G.s.c;
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(mat.x, mat.y, mat.w, mat.h, 14);
      let x = mat.x + 10, y = mat.y + 10, rowH = 0; G.onMat = [];
      [2, 1, 0].forEach(k => { const n = Math.abs(c[2 - k]); for (let i = 0; i < n; i++) { const [w, h] = RK.tileSize(k, u, s); if (x + w > mat.x + mat.w - 8) { x = mat.x + 10; y += rowH + 6; rowH = 0; } G.onMat.push({ k, neg: c[2 - k] < 0, x, y, w, h }); RK.tile(p, C, k, x, y, u, s, c[2 - k] < 0); x += w + 5; rowH = Math.max(rowH, h); } });
      G.src = SRC.map(([k, neg], i) => { const [w, h] = RK.tileSize(k, u, s); const bx = 16 + (i % 3) * ((G.W - 32) / 3), by = G.trayY + Math.floor(i / 3) * 50; RK.tile(p, C, k, bx, by, u, s, neg); return { k, neg, x: bx, y: by, w, h }; });
      if (G.drag) RK.tile(p, C, G.drag.k, G.drag.x - 12, G.drag.y - 12, u, s, G.drag.neg, { lift: true });
      RK.strip(p, C, G.fb, `$${poly(c)}$`, { kicker: 'En la mesa', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) {
      const q = G.src.find(q => hitBox({ x: q.x - 4, y: q.y - 4, w: q.w + 8, h: q.h + 8 }, x, y));
      if (q) { G.drag = { k: q.k, neg: q.neg, from: 'tray', x, y }; return true; }
      const m = (G.onMat || []).find(q => hitBox(q, x, y));
      if (m) { G.drag = { k: m.k, neg: m.neg, from: 'mat', x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const inMat = hitBox(G.mat, x, y), i = 2 - d.k, v = d.neg ? -1 : 1;
      if (d.from === 'tray' && inMat) { G.s.c[i] += v; G.touch(); } else if (d.from === 'mat' && !inMat) { G.s.c[i] -= v; G.touch(); }
    },
    demo(G) { const q = G.src?.[1]; return q ? { from: { x: q.x + 6, y: q.y + 16 }, to: { x: G.mat.x + G.mat.w / 2, y: G.mat.y + G.mat.h / 2 }, text: 'Arrastra bloques a la mesa', ty: G.mat.y + 14 } : null; },
    peek: G => ({ src: G.src, mat: G.mat }),
  });
  return Object.assign(game, { goal, poly });
})();
;
//#archivo js/games/despeja-x.js
// Despeja x (Álgebra, alg-1; spec 2026-11-18-algebra-revision): resolver es aplicar la misma operación a los dos lados.
// La ecuación ax + b = c (o x/a + b = c) está escrita; abajo hay tarjetas de operaciones. Se arrastra una tarjeta sobre
// la ecuación y se aplica a los dos lados: la ecuación cambia. Hay que dejar x sola. Se puede deshacer arrastrando la
// ecuación hacia abajo.
// params = { rounds: [{ a, b, c, div?, cards: [[op, v], …] }] }   (op '+' o '×')   state = { rounds: [{ steps: [índices de tarjeta] }] }
GAMES['despeja-x'] = (() => {
  // La ecuación es k·x + m = n (k puede ser fracción).
  const start = r => ({ k: r.div ? 1 / r.a : r.a, m: r.b, n: r.c });
  const apply = (e, [op, v]) => (op === '+' ? { k: e.k, m: e.m + v, n: e.n + v } : { k: e.k * v, m: e.m * v, n: e.n * v });
  const state = (s, r) => s.steps.reduce((e, i) => apply(e, r.cards[i]), start(r));
  let ok = (s, r) => { const e = state(s, r); return Math.abs(e.k - 1) < 1e-9 && Math.abs(e.m) < 1e-9; };
  const fmt = v => RK.num(Math.round(v * 1e6) / 1e6);
  const lhs = e => { const k = Math.abs(e.k - 1) < 1e-9 ? 'x' : Math.abs(e.k + 1) < 1e-9 ? '-x' : `${fmt(e.k)}x`; return Math.abs(e.m) < 1e-9 ? k : `${k} ${e.m < 0 ? '-' : '+'} ${fmt(Math.abs(e.m))}`; };
  const answer = r => { const steps = [], e0 = start(r); const iPlus = r.cards.findIndex(([op, v]) => op === '+' && Math.abs(v + e0.m) < 1e-9); if (e0.m && iPlus >= 0) steps.push(iPlus); const iMul = r.cards.findIndex(([op, v]) => op === '×' && Math.abs(v * e0.k - 1) < 1e-9); if (Math.abs(e0.k - 1) > 1e-9 && iMul >= 0) steps.push(iMul); return { steps }; };
  const lab = ([op, v]) => (op === '+' ? `${v < 0 ? '-' : '+'}\\,${fmt(Math.abs(v))}` : `\\times\\,${fmt(v)}`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ steps: [] }),
    ok,
    answered: s => s.steps.length > 0,
    solution: r => { const e = state(answer(r), r); return `x = ${fmt(e.n).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2')}`; },
    prompt: r => `Despeja x en $${lhs(start(r))} = ${fmt(r.c)}$`,
    foot: () => 'Arrastra una tarjeta a la ecuación: se aplica a los dos lados',
    layout(G) { G.eq = { x: 16, y: 106, w: G.W - 32, h: 64 }; G.cardY = G.H * 0.55; G.fb = { x: 12, y: G.H - 76, w: G.W - 24, h: 48 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, e = state(s, r);
      p.stroke(C.brand); p.strokeWeight(1.5); p.fill(RK.al(p, C.brand, 20)); p.rect(G.eq.x, G.eq.y, G.eq.w, G.eq.h, 12);
      TK.label(p, C, `$${lhs(e)} = ${fmt(e.n)}$`, G.W / 2, G.eq.y + G.eq.h / 2, C.ink, 22, G.eq.w - 20);
      TK.label(p, C, s.steps.length ? `pasos: ${s.steps.map(i => r.cards[i][0] === '+' ? `${r.cards[i][1] < 0 ? '−' : '+'}${Math.abs(r.cards[i][1])}` : `×${fmt(r.cards[i][1]).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, '$1/$2')}`).join('  ')}` : 'aún sin pasos', G.W / 2, G.eq.y + G.eq.h + 16, C.mute, 11, G.W - 30);
      const w = Math.min(70, (G.W - 24) / r.cards.length - 6);
      G.cards = r.cards.map((c, i) => ({ i, x: G.W / 2 - (r.cards.length * (w + 6) - 6) / 2 + i * (w + 6), y: G.cardY, w, h: 40 }));
      G.cards.forEach(b => { if (G.drag?.i !== b.i) RK.chip(p, C, b, `$${lab(r.cards[b.i])}$`, { size: 14 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 20, w, h: 40 }, `$${lab(r.cards[G.drag.i])}$`, { on: true, size: 14 });
      RK.strip(p, C, G.fb, VELO.on ? '$\\text{lo mismo a los dos lados}$' : ok(s, r) ? `$x = ${fmt(e.n)}$` : '$\\text{deja la x sola}$', { kicker: 'Lo mismo a los dos lados', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 19 });
    },
    press(G, x, y) {
      const b = (G.cards || []).find(b => hitBox(b, x, y)); if (b) { G.drag = { i: b.i, x, y }; return true; }
      if (hitBox(G.eq, x, y) && G.s.steps.length) { G.drag = { i: -1, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      if (d.i === -1) { if (y > G.eq.y + G.eq.h + 30) { G.s.steps.pop(); G.touch(); } return; }
      if (hitBox({ x: G.eq.x, y: G.eq.y - 20, w: G.eq.w, h: G.eq.h + 40 }, x, y) && G.s.steps.length < 4) { G.s.steps.push(d.i); G.touch(); }
    },
    demo(G) { const b = G.cards?.[0]; return b ? { from: { x: b.x + b.w / 2, y: b.y + 20 }, to: { x: G.W / 2, y: G.eq.y + 30 }, text: 'Arrastra una tarjeta a la ecuación', ty: G.cardY + 60 } : null; },
    peek: G => ({ cards: G.cards, eq: G.eq }),
  });
  return Object.assign(game, { answer, state });
})();
;
//#archivo js/games/consecutivos.js
// Números seguidos (Álgebra, alg-1; spec 2026-11-18-algebra-revision): plantear una ecuación con una incógnita. Hay k
// números consecutivos (o de dos en dos) que suman S; se arrastra el primero, x, y los demás lo siguen: x, x + d, x + 2d…
// Las barras muestran la suma, que es kx + (algo fijo). Hay que encontrar x.
// params = { rounds: [{ k, d, S }] }   state = { rounds: [{ x }] }   (de 1 a 60)
GAMES['consecutivos'] = (() => {
  const sum = (r, x) => r.k * x + (r.d * r.k * (r.k - 1)) / 2;
  const need = r => (r.S - (r.d * r.k * (r.k - 1)) / 2) / r.k;
  let ok = (s, r) => sum(r, s.x) === r.S;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: () => ({ x: 1 }),
    ok,
    solution: r => Array.from({ length: r.k }, (_, i) => need(r) + i * r.d).join(' + ') + ` = ${r.S}`,
    prompt: r => `${r.k} números ${r.d === 1 ? 'seguidos' : r.d === 2 ? 'pares (o impares) seguidos' : `de ${r.d} en ${r.d}`} suman ${r.S}. ¿Cuál es el primero?`,
    foot: () => 'Arrastra el primero: los demás lo siguen',
    layout(G) { G.base = G.H - 150; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 68, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, x = G.locked && !ok(G.s, r) ? need(r) : G.s.x, w = (G.W - 40) / r.k, top = 60 + r.d * r.k, Y = v => G.base - (G.base - 104) * v / top;
      for (let i = 0; i < r.k; i++) { const v = x + i * r.d; p.noStroke(); p.fill(C.sky); p.rect(20 + i * w + 4, Y(v), w - 8, G.base - Y(v), 3); TK.label(p, C, String(v), 20 + i * w + w / 2, Y(v) - 10, C.ink, 12, w); }
      TK.label(p, C, `suma: ${sum(r, x)}`, G.W / 2, 104, sum(r, x) === r.S && !VELO.on ? C.ok : C.mute, 13, 140);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 60, x - 1, i => ((i + 1) % 10 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$${r.k}x + ${(r.d * r.k * (r.k - 1)) / 2} = ${r.S}$`, { kicker: `x = ${x}`, col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.x - 1), y: G.tY }, to: { x: G.X(G.s.x + 12), y: G.tY }, text: 'Arrastra el primero', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 60) + 1; if (v !== G.s.x || !G.touched[G.cur]) { G.s.x = v; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/denominador-comun.js
// El denominador común (Álgebra, alg-25b; spec 2026-11-18-algebra-revision): el mínimo común denominador lleva cada
// factor de los denominadores, con la mayor potencia que aparece. Arriba están las dos fracciones con sus denominadores
// factorizados; abajo, fichas de factores. Se arrastran a la caja del común denominador las fichas justas.
// params = { rounds: [{ d1: [factores], d2: [factores], chips: [factores] }] }   state = { rounds: [{ box: [índices] }] }
GAMES['denominador-comun'] = (() => {
  const lcd = r => { const o = [...r.d1], rest = [...r.d2]; r.d1.forEach(f => { const i = rest.indexOf(f); if (i >= 0) rest.splice(i, 1); }); return [...o, ...rest]; };
  let ok = (s, r) => s.box.map(i => r.chips[i]).sort().join('|') === lcd(r).sort().join('|');
  const answer = r => { const used = new Set(); return { box: lcd(r).map(f => { const i = r.chips.findIndex((c, k) => c === f && !used.has(k)); used.add(i); return i; }) }; };
  // Producto de factores con potencias: ['x', 'x', 'x+1'] → x^{2}(x+1).
  const mul = fs => { const n = new Map(); fs.forEach(f => n.set(f, (n.get(f) || 0) + 1)); return [...n].map(([f, k]) => `${f.length > 2 ? `(${f})` : f}${k > 1 ? `^{${k}}` : ''}`).join(''); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ box: [] }),
    ok,
    answered: s => s.box.length > 0,
    solution: r => mul(lcd(r)),
    prompt: r => `Común denominador de $\\dfrac{1}{${mul(r.d1)}}$ y $\\dfrac{1}{${mul(r.d2)}}$`,
    foot: () => 'Arrastra a la caja los factores justos',
    layout(G) { G.box = { x: 16, y: 112, w: G.W - 32, h: 64 }; G.cy = G.H * 0.56; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s;
      p.stroke(C.brand); p.strokeWeight(1.4); p.fill(RK.al(p, C.brand, 18)); p.rect(G.box.x, G.box.y, G.box.w, G.box.h, 12);
      TK.label(p, C, 'común denominador', G.box.x + 70, G.box.y - 10, C.mute, 10, 140);
      G.spots = [];
      s.box.forEach((i, j) => G.spots.push({ i, inBox: true, x: G.box.x + 8 + j * 66, y: G.box.y + 14, w: 60, h: 36 }));
      const free = r.chips.map((_, i) => i).filter(i => !s.box.includes(i));
      const fw = Math.min(60, (G.W - 24) / Math.max(1, free.length) - 6); free.forEach((i, j) => G.spots.push({ i, x: G.W / 2 - (free.length * (fw + 6) - 6) / 2 + j * (fw + 6), y: G.cy, w: fw, h: 36 }));
      G.spots.forEach(q => { if (G.drag?.i !== q.i) RK.chip(p, C, q, `$${r.chips[q.i]}$`, { on: q.inBox, col: C.mint, size: q.w < 56 ? 11 : 13 }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 30, y: G.drag.y - 18, w: 60, h: 36 }, `$${r.chips[G.drag.i]}$`, { on: true, size: 13 });
      RK.strip(p, C, G.fb, s.box.length ? `$${mul(s.box.map(i => r.chips[i]))}$` : '$\\text{caja vacía}$', { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const q = (G.spots || []).find(q => hitBox(q, x, y)); if (!q) return false; G.drag = { i: q.i, inBox: !!q.inBox, x, y }; return true; },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const inB = hitBox({ x: G.box.x - 8, y: G.box.y - 16, w: G.box.w + 16, h: G.box.h + 32 }, x, y), b = G.s.box;
      if (!d.inBox && inB && b.length < 4) { b.push(d.i); G.touch(); } else if (d.inBox && !inB) { b.splice(b.indexOf(d.i), 1); G.touch(); }
    },
    demo(G) { const q = G.spots?.find(q => !q.inBox); return q ? { from: { x: q.x + 30, y: q.y + 18 }, to: { x: G.box.x + 40, y: G.box.y + 32 }, text: 'Arrastra a la caja', ty: G.cy + 56 } : null; },
    peek: G => ({ spots: G.spots, box: G.box }),
  });
  return Object.assign(game, { lcd, answer, mul });
})();
;
//#archivo js/games/dos-rectas.js
// El punto de las dos rectas (Álgebra, alg-101; spec 2026-11-18-algebra-revision): la solución de un sistema de dos
// ecuaciones lineales es el punto que cumple las dos a la vez, el cruce de sus rectas. Se arrastra un punto por el plano;
// cada ecuación se enciende cuando el punto la cumple. Hay que dejarlo donde se encienden las dos.
// params = { rounds: [{ e1: [a, b, c], e2: [a, b, c] }] }   (ax + by = c)   state = { rounds: [{ x, y }] }   (enteros de −6 a 6)
GAMES['dos-rectas'] = (() => {
  const V = { x0: -6, x1: 6, y0: -6, y1: 6 };
  const on = (e, x, y) => e[0] * x + e[1] * y === e[2];
  let ok = (s, r) => on(r.e1, s.x, s.y) && on(r.e2, s.x, s.y);
  const answer = r => { for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) if (ok({ x, y }, r)) return { x, y }; return null; };
  const eq = ([a, b, c]) => b === 0 ? `${a === 1 ? '' : a}x = ${c}` : `${a === 1 ? '' : a === -1 ? '-' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: r => (ok({ x: 0, y: 0 }, r) ? { x: 1, y: -1 } : { x: 0, y: 0 }),
    ok,
    solution: r => { const a = answer(r); return `(${a.x}, ${a.y})`; },
    prompt: r => `Deja el punto donde se cumplen $${eq(r.e1)}$ y $${eq(r.e2)}$`,
    foot: () => 'Arrastra el punto; cada ecuación se enciende cuando el punto la cumple',
    layout(G) { const s = Math.min(G.W - 32, G.H * 0.5); G.b = { x: (G.W - s) / 2, y: 100, w: s, h: s }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, M = G.M = RK.plane(p, C, G.b, V, { step: 1, lx: 'x', ly: 'y' });
      [[r.e1, C.sky], [r.e2, C.coral]].forEach(([e, col]) => {
        if (e[1] === 0) { const x = e[2] / e[0]; p.stroke(col); p.strokeWeight(2.4); p.line(M.X(x), G.b.y, M.X(x), G.b.y + G.b.h); }
        else RK.curve(p, G.b, M, V, x => (e[2] - e[0] * x) / e[1], col, 2.4);
      });
      [[r.e1, C.sky], [r.e2, C.coral]].forEach(([e, col], i) => { const b = { x: 12 + i * (G.W - 24) / 2 + 3, y: G.b.y + G.b.h + 8, w: (G.W - 24) / 2 - 6, h: 30 }, yes = on(e, s.x, s.y); RK.chip(p, C, b, `$${eq(e)}$`, { on: yes && !VELO.on, col: yes && !VELO.on ? C.ok : col, size: 12 }); });
      drawDot(p, C, M.X(s.x), M.Y(s.y), 16, ok(s, r) ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$(x, y) = (${s.x}, ${s.y})$`, { kicker: ok(s, r) ? 'Cumple las dos: es la solución' : 'Busca el cruce', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(G.s.x), y: G.M.Y(G.s.y) }, to: { x: G.M.X(G.s.x + 2), y: G.M.Y(G.s.y + 1) }, text: 'Arrastra el punto', ty: G.b.y + 16 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x, y) => { const c = v => Math.max(-6, Math.min(6, Math.round(v))), nx = c(G.M.iX(x)), ny = c(G.M.iY(y)); if (nx !== G.s.x || ny !== G.s.y || !G.touched[G.cur]) { G.s.x = nx; G.s.y = ny; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/corte-parabola-recta.js
// La recta que corta la parábola (Álgebra, alg-102; spec 2026-11-18-algebra-revision): en un sistema no lineal los cortes
// son los x donde las dos expresiones de y coinciden: al igualarlas queda una cuadrática. La pendiente de la recta está
// fija; se arrastra su altura n hasta que pase por el corte marcado. Entonces aparece el otro corte y la cuadrática
// factorizada.
// params = { rounds: [{ a, m, x0 }] }   (parábola y = a·x², recta y = m·x + n)   state = { rounds: [{ n }] }   (entero de −8 a 12)
GAMES['corte-parabola-recta'] = (() => {
  const V = { x0: -5, x1: 5, y0: -8, y1: 14 };
  const need = r => r.a * r.x0 ** 2 - r.m * r.x0;
  let ok = (s, r) => s.n === need(r);
  const other = r => r.m / r.a - r.x0;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ n: need(r) === 0 ? 2 : 0 }),
    ok,
    solution: r => `n = ${need(r)}: corta en x = ${r.x0} y x = ${RK.num(other(r))}`,
    prompt: r => `Sube o baja $y = ${r.m === 0 ? '' : `${r.m === 1 ? '' : r.m === -1 ? '-' : r.m}x + `}n$ hasta que corte a $y = ${r.a === 1 ? '' : r.a}x^2$ en $x = ${r.x0}$`,
    foot: () => 'Arrastra la recta arriba o abajo',
    layout(G) { G.b = { x: 16, y: 100, w: G.W - 32, h: G.H * 0.56 }; G.fb = { x: 12, y: G.H - 72, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, n = G.locked && !ok(G.s, r) ? need(r) : G.s.n, M = G.M = RK.plane(p, C, G.b, V, { step: 1 });
      RK.curve(p, G.b, M, V, x => r.a * x * x, C.sky, 2.6);
      RK.curve(p, G.b, M, V, x => r.m * x + n, ok({ n }, r) ? C.ok : C.coral, 2.6);
      p.noFill(); p.stroke(C.brand); p.strokeWeight(2); p.drawingContext.setLineDash([4, 3]); p.line(M.X(r.x0), G.b.y, M.X(r.x0), G.b.y + G.b.h); p.drawingContext.setLineDash([]);
      // Cortes reales: raíces de a·x² − m·x − n = 0.
      const D = r.m * r.m + 4 * r.a * n;
      if (D >= 0) [(r.m + Math.sqrt(D)) / (2 * r.a), (r.m - Math.sqrt(D)) / (2 * r.a)].forEach(x => { if (x >= V.x0 && x <= V.x1) drawDot(p, C, M.X(x), M.Y(r.a * x * x), 11, ok({ n }, r) ? C.ok : C.ink); });
      RK.knob(p, C, M.X(V.x1 - 0.6), M.Y(r.m * (V.x1 - 0.6) + n), C.coral);
      const q = `${r.a === 1 ? '' : r.a}x^2${r.m === 0 ? '' : ` ${r.m < 0 ? '+' : '-'} ${Math.abs(r.m) === 1 ? '' : Math.abs(r.m)}x`}${n === 0 ? '' : ` ${n > 0 ? '-' : '+'} ${Math.abs(n)}`} = 0`;
      RK.strip(p, C, G.fb, ok({ n }, r) ? `$${q}:\\ x = ${r.x0},\\ x = ${RK.num(other(r))}$` : `$${q}$`, { kicker: 'Igualar las dos y y pasar todo a un lado', col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { if (!hitBox(G.b, x, y)) return false; G.grab = true; G.y0 = y; G.n0 = G.s.n; return true; },
    drag(G, x, y) { if (!G.grab) return false; const d = G.M.iY(y) - G.M.iY(G.y0), n = Math.max(-8, Math.min(12, Math.round(G.n0 + d))); if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.M.X(3), y: G.M.Y(G.s.n + 3 * G.r.m) }, to: { x: G.M.X(3), y: G.M.Y(G.s.n + 3 * G.r.m + 3) }, text: 'Arrastra la recta', ty: G.b.y + 16 }),
    peek: G => ({ b: G.b, M: G.M }),
  });
  return Object.assign(game, { need });
})();
;
//#archivo js/games/tabla-compuesta.js
// La regla de tres compuesta por unidades (Álgebra, alg-12f; spec 2026-11-18-algebra-revision): si el resultado es
// proporcional a dos magnitudes a la vez, se reduce a la unidad: lo que hace un trabajador en una hora. Una cuadrícula de
// trabajadores × horas; se arrastra cuánto rinde cada casilla hasta que la primera cuadrícula dé el dato conocido. Con ese
// rendimiento, el juego llena la segunda cuadrícula y da la respuesta.
// params = { rounds: [{ who, what, m1, h1, c1, m2, h2, step, max }] }   state = { rounds: [{ k }] }   (rendimiento k·step)
GAMES['tabla-compuesta'] = (() => {
  let ok = (s, r) => s.k * r.step * r.m1 * r.h1 === r.c1;
  const answer = r => ({ k: r.c1 / (r.m1 * r.h1) / r.step });
  const grid = (p, C, x, y, m, h, cell, v, col, good) => {
    for (let i = 0; i < m; i++) for (let j = 0; j < h; j++) { p.stroke(C.bg); p.strokeWeight(1.5); p.fill(good ? C.ok : col); p.rect(x + j * cell, y + i * cell, cell, cell, 3); }
  };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ k: answer(r).k === 1 ? 2 : 1 }),
    ok,
    solution: r => `${r.c1 / (r.m1 * r.h1)} por casilla: ${r.c1 / (r.m1 * r.h1) * r.m2 * r.h2} ${r.what}`,
    prompt: r => `${r.m1} ${r.who} en ${r.h1} h: ${r.c1} ${r.what}. ¿Y ${r.m2} ${r.who} en ${r.h2} h?`,
    foot: () => 'Arrastra cuánto rinde un trabajador en una hora',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, v = s.k * r.step, cell = Math.min(22, (G.W - 60) / (r.h1 + r.h2), (G.tY - 160) / Math.max(r.m1, r.m2));
      const t1 = v * r.m1 * r.h1, good = ok(s, r);
      TK.label(p, C, `${r.m1} × ${r.h1} casillas = ${t1} (meta ${r.c1})`, 20 + r.h1 * cell / 2 + 30, 104, good ? C.ok : C.mute, 10, G.W / 2);
      grid(p, C, 20, 120, r.m1, r.h1, cell, v, C.sky, good);
      const x2 = G.W - 20 - r.h2 * cell;
      TK.label(p, C, good ? `${r.m2} × ${r.h2} = ${v * r.m2 * r.h2}` : '?', x2 + r.h2 * cell / 2, 104, C.mute, 10, G.W / 2);
      grid(p, C, x2, 120, r.m2, r.h2, cell, v, RK.al(p, C.coral, good ? 255 : 90), false);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, r.max / r.step, s.k - 1, i => ((i + 1) % 2 === 0 ? String((i + 1) * r.step) : null));
      RK.strip(p, C, G.fb, good ? `$${v}\\cdot ${r.m2}\\cdot ${r.h2} = ${v * r.m2 * r.h2}\\ \\text{${r.what}}$` : `$${v}\\ \\text{por casilla}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k - 1), y: G.tY }, to: { x: G.X([G.s.k + 1, G.s.k + 2, G.s.k + 3].find(i => i + 1 !== answer(G.r).k)), y: G.tY }, text: 'Arrastra el rendimiento', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const k = RK.pick(x, 30, G.W - 30, G.r.max / G.r.step) + 1; if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/estira-todo.js
// ¿De qué número es? (Álgebra, alg-13; spec 2026-11-18-algebra-revision): si una parte es el p % de un total, el total
// es la parte ÷ p · 100. La barra es el total, con una regla de 0 % a 100 %; se arrastra el largo del total y la marca del
// p % se mueve con él. Hay que lograr que esa marca caiga justo en la parte conocida.
// params = { rounds: [{ part, p, step, max }] }   state = { rounds: [{ w }] }   (w múltiplo de step)
GAMES['estira-todo'] = (() => {
  let ok = (s, r) => Math.abs(s.w * r.p / 100 - r.part) < 1e-9;
  const answer = r => ({ w: r.part * 100 / r.p });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1,
    init: r => ({ w: answer(r).w === r.step * 10 ? r.step * 12 : r.step * 10 }),
    ok,
    solution: r => `${r.part} es el ${r.p} % de ${answer(r).w}`,
    prompt: r => `${r.part} es el ${r.p} % de un número. ¿De cuál?`,
    foot: () => 'Arrastra el final de la barra: es el total, el 100 %',
    layout(G) { G.y = 150; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, x0 = 24, u = (G.W - 60) / Math.max(r.max, r.part * 1.2), y = G.y, end = x0 + s.w * u, mk = x0 + s.w * r.p / 100 * u, pt = x0 + r.part * u;
      p.noStroke(); p.fill(RK.al(p, C.sky, 90)); p.rect(x0, y, s.w * u, 30, 4);
      p.fill(ok(s, r) ? C.ok : C.sky); p.rect(x0, y, Math.min(s.w, s.w * r.p / 100) * u, 30, 4);
      (s.w * u > 170 ? [0, 25, 50, 75, 100] : s.w * u > 80 ? [0, 50, 100] : [100]).forEach(q => { const x = x0 + s.w * q / 100 * u; p.stroke(C.ink); p.strokeWeight(1); p.line(x, y + 30, x, y + 38); TK.label(p, C, `${q} %`, x, y + 48, C.mute, 9, 34); });
      p.stroke(C.coral); p.strokeWeight(2); p.drawingContext.setLineDash([4, 3]); p.line(pt, y - 30, pt, y + 30); p.drawingContext.setLineDash([]);
      TK.label(p, C, `parte: ${r.part}`, pt, y - 40, C.coral, 11, 80);
      p.stroke(C.brand); p.strokeWeight(2); p.line(mk, y - 6, mk, y + 36);
      RK.knob(p, C, end, y + 15, C.brand); G.end = end;
      TK.label(p, C, `total: ${s.w}`, Math.min(G.W - 40, end), y + 74, C.ink, 12, 90);
      RK.strip(p, C, G.fb, `$${r.p}\\%\\ \\text{de}\\ ${s.w} = ${+(s.w * r.p / 100).toFixed(2)}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.y - 15) > 50) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.end, y: G.y + 15 }, to: { x: G.end + 40, y: G.y + 15 }, text: 'Estira el total', ty: G.y + 96 }),
    peek: G => ({ y: G.y }),
  });
  game.move = (G, x) => { const r = G.r, u = (G.W - 60) / Math.max(r.max, r.part * 1.2), w = Math.max(r.step, Math.min(r.max, Math.round((x - 24) / u / r.step) * r.step)); if (w !== G.s.w || !G.touched[G.cur]) { G.s.w = w; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/elige-comite.js
// Elegir un comité (Álgebra, alg-24c; spec 2026-11-18-algebra-revision): las maneras de escoger k personas entre n son
// C(n, k), el coeficiente del binomio: de cada paréntesis (1 + x) se toma o no se toma la x. Se arrastra el tamaño del
// comité y se ven todos los comités posibles (si caben) y cuántos son. Hay que llegar a la cantidad pedida.
// params = { rounds: [{ n, ways }] }   state = { rounds: [{ k }] }   (k de 0 a n)
GAMES['elige-comite'] = (() => {
  const C_ = (n, k) => { let v = 1; for (let i = 1; i <= k; i++) v = v * (n - k + i) / i; return Math.round(v); };
  let ok = (s, r) => C_(r.n, s.k) === r.ways;
  const answer = r => ({ k: [...Array(r.n + 1).keys()].find(k => C_(r.n, k) === r.ways) });
  const groups = (n, k) => { const out = []; for (let m = 0; m < 2 ** n && out.length < 40; m++) { let c = 0; for (let i = 0; i < n; i++) if (m & (1 << i)) c++; if (c === k) out.push(m); } return out; };
  const L = 'ABCDEFGH';
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ k: C_(r.n, 0) === r.ways ? 1 : 0 }),
    ok,
    solution: r => `comités de ${answer(r).k} (o de ${r.n - answer(r).k}): C(${r.n}, ${answer(r).k}) = ${r.ways}`,
    prompt: r => `De ${r.n} personas, ¿de qué tamaño es el comité que se puede formar de ${r.ways} maneras?`,
    foot: () => 'Arrastra cuántas personas tiene el comité',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, list = groups(r.n, s.k), cw = Math.max(26, s.k * 9 + 14), cols = Math.max(1, Math.floor((G.W - 20) / cw));
      list.forEach((m, j) => { const x = 12 + (j % cols) * cw, y = 102 + Math.floor(j / cols) * 16; const txt = [...L.slice(0, r.n)].filter((_, i) => m & (1 << i)).join(''); TK.label(p, C, txt || '∅', x + cw / 2, y + 6, C.sky, 10, cw - 4); });
      const tot = C_(r.n, s.k);
      TK.label(p, C, `${tot} comité${tot === 1 ? '' : 's'} de ${s.k}${tot > 40 ? ' (se ven 40)' : ''}`, G.W / 2, G.tY - 40, ok(s, r) ? C.ok : C.ink, 12, G.W - 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, r.n + 1, s.k, i => String(i));
      RK.strip(p, C, G.fb, `$C(${r.n}, ${s.k}) = ${tot}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(1), y: G.tY }, text: 'Arrastra el tamaño', ty: G.tY - 60 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, G.r.n + 1); if (v !== G.s.k || !G.touched[G.cur]) { G.s.k = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/factor-area.js
// Escalar una figura (Preuniversitario, pu-ge-3; spec 2026-11-18-preuda-razonamiento-completo): si las longitudes se
// multiplican por k, el área se multiplica por k² y el volumen por k³. Se ve la figura original en cuadritos (o cubitos) y se
// arrastra el factor k; la copia crece y se cuentan sus cuadritos. Hay que llegar al área (o volumen) pedido.
// params = { rounds: [{ kind: 'area' | 'vol', side, target }] }   (side: lado original en unidades)   state = { rounds: [{ k }] }   (k de 1 a 5)
GAMES['factor-area'] = (() => {
  const val = (r, k) => (r.kind === 'vol' ? (r.side * k) ** 3 : (r.side * k) ** 2);
  let ok = (s, r) => val(r, s.k) === r.target;
  const answer = r => { for (let k = 1; k <= 5; k++) if (val(r, k) === r.target) return { k }; return null; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ k: 1 }),
    ok,
    solution: r => `k = ${answer(r).k}`,
    prompt: r => (r.kind === 'vol' ? `Un cubo de ${r.side ** 3} cubitos crece hasta ${r.target}. ¿Por cuánto se multiplicó la arista?` : `Un cuadrado de ${r.side ** 2} cuadritos crece hasta ${r.target}. ¿Por cuánto se multiplicó el lado?`),
    foot: () => 'Arrastra el factor k que multiplica las longitudes',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, n = r.side * s.k, room = Math.min(G.W - 120, G.tY - 150), c = Math.min(22, room / (r.side * 5)), good = ok(s, r);
      const sq = (x, y, m, col) => { for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { p.stroke(C.bg); p.strokeWeight(1); p.fill(col); p.rect(x + i * c, y + j * c, c, c, 2); } };
      sq(20, 110, r.side, C.mint);
      TK.label(p, C, 'original', 20 + r.side * c / 2, 100, C.mute, 9, 70);
      const x0 = Math.max(30 + r.side * c + 20, G.W - 20 - n * c);
      sq(x0, 110, n, good ? C.ok : C.sky);
      if (r.kind === 'vol') TK.label(p, C, `× ${n} capas`, x0 + n * c / 2, 110 + n * c + 12, C.mute, 10, 90);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 5, s.k - 1, i => `k = ${i + 1}`);
      RK.strip(p, C, G.fb, r.kind === 'vol' ? `$${n}^3 = ${val(r, s.k)}\\ \\text{cubitos}$` : `$${n}^2 = ${val(r, s.k)}\\ \\text{cuadritos}$`, { kicker: `Las longitudes por ${s.k}`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X([1, 2, 3].find(i => i + 1 !== answer(G.r).k)), y: G.tY }, text: 'Arrastra el factor', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 5) + 1; if (v !== G.s.k || !G.touched[G.cur]) { G.s.k = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/tales-rectas.js
// El teorema de Tales (Preuniversitario, pu-ge-3; spec 2026-11-18-preuda-razonamiento-completo): rectas paralelas que cortan
// dos rectas que salen de un punto O dejan segmentos proporcionales: OA/AB = OA'/A'B'. Están OA, AB y OA'; se arrastra el
// punto B' sobre la segunda recta (de medio en medio) hasta que la recta BB' quede paralela a AA'.
// params = { rounds: [{ a, b, c }] }   (OA = a, AB = b, OA' = c)   state = { rounds: [{ d }] }   (A'B' de 0.5 a 12)
GAMES['tales-rectas'] = (() => {
  const need = r => r.b * r.c / r.a;
  let ok = (s, r) => Math.abs(s.d - need(r)) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: r => ({ d: need(r) === 2 ? 3 : 2 }),
    ok,
    solution: r => `A'B' = ${RK.num(need(r))}`,
    prompt: r => `OA = ${r.a}, AB = ${r.b}, OA' = ${r.c}. ¿Cuánto mide A'B' si BB' es paralela a AA'?`,
    foot: () => "Arrastra B' por la recta de arriba",
    layout(G) { G.O = { x: 24, y: G.H - 110 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { d: need(r) } : G.s, O = G.O, maxL = Math.max(r.a + r.b, r.c + 12), u = (G.W - 60) / maxL, ang = -0.55;
      const P1 = t => ({ x: O.x + t * u, y: O.y }), P2 = t => ({ x: O.x + t * u * Math.cos(ang), y: O.y + t * u * Math.sin(ang) });
      p.stroke(C.ink); p.strokeWeight(1.6); p.line(O.x, O.y, G.W - 16, O.y); const e = P2(maxL); p.line(O.x, O.y, e.x, e.y);
      const A = P1(r.a), B = P1(r.a + r.b), A2 = P2(r.c), B2 = P2(r.c + s.d), good = ok(s, r);
      p.stroke(C.sky); p.strokeWeight(2.2); p.line(A.x, A.y, A2.x, A2.y);
      p.stroke(good ? C.ok : C.coral); p.line(B.x, B.y, B2.x, B2.y);
      [[A, 'A'], [B, 'B'], [A2, "A'"], [O, 'O']].forEach(([q, t]) => { drawDot(p, C, q.x, q.y, 9, C.ink); TK.label(p, C, t, q.x, q.y + 14, C.mute, 10, 24); });
      RK.knob(p, C, B2.x, B2.y, C.brand); TK.label(p, C, "B'", B2.x, B2.y - 18, C.ink, 11, 24); G.B2 = B2;
      TK.label(p, C, String(r.a), (O.x + A.x) / 2, O.y + 14, C.ink, 10, 30); TK.label(p, C, String(r.b), (A.x + B.x) / 2, O.y + 14, C.ink, 10, 30);
      RK.strip(p, C, G.fb, `$\\dfrac{${r.a}}{${r.b}} ${VELO.on ? '\\;?\\;' : good ? '=' : '\\ne'} \\dfrac{${r.c}}{${RK.num(s.d)}}$`, { kicker: `A'B' = ${String(s.d)}`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.hypot(x - G.B2.x, y - G.B2.y) > 44) return false; G.grab = true; return true; },
    drag(G, x, y) {
      if (!G.grab) return false;
      const r = G.r, O = G.O, maxL = Math.max(r.a + r.b, r.c + 12), u = (G.W - 60) / maxL, ang = -0.55, t = ((x - O.x) * Math.cos(ang) + (y - O.y) * Math.sin(ang)) / u;
      const d = Math.max(0.5, Math.min(12, Math.round((t - r.c) * 2) / 2)); if (d !== G.s.d || !G.touched[G.cur]) { G.s.d = d; G.touch(); } return true;
    },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.B2.x, y: G.B2.y }, to: { x: G.B2.x + 30, y: G.B2.y - 18 }, text: "Arrastra B'", ty: G.O.y + 34 }),
    peek: G => ({ O: G.O, B2: G.B2 }),
  });
  return Object.assign(game, { answer: r => ({ d: need(r) }) });
})();
;
//#archivo js/games/corta-paralelogramo.js
// El área del paralelogramo (Preuniversitario, pu-ge-4; spec 2026-11-18-preuda-razonamiento-completo): un paralelogramo se
// corta y se vuelve un rectángulo de la misma base y la misma altura: área = base × altura (no base × lado inclinado). Está
// la altura y el lado inclinado; se arrastra la base hasta el área pedida. El triángulo recortado se ve pasar al otro lado.
// params = { rounds: [{ h, slant, target }] }   (slant: lado inclinado, solo de distractor)   state = { rounds: [{ b }] }   (base de 1 a 12)
GAMES['corta-paralelogramo'] = (() => {
  let ok = (s, r) => s.b * r.h === r.target;
  const answer = r => ({ b: r.target / r.h });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.1,
    init: () => ({ b: 1 }),
    ok,
    solution: r => `base ${r.target / r.h}`,
    prompt: r => `Altura ${r.h}, lado inclinado ${r.slant}. ¿Qué base da un área de ${r.target}?`,
    foot: () => 'Arrastra la base del paralelogramo',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, off = Math.sqrt(Math.max(0, r.slant ** 2 - r.h ** 2)), u = Math.min((G.W - 60) / (12 + off), (G.tY - 160) / r.h), x0 = 30, yb = G.tY - 50, good = ok(s, r);
      const pts = [[x0, yb], [x0 + s.b * u, yb], [x0 + (s.b + off) * u, yb - r.h * u], [x0 + off * u, yb - r.h * u]];
      p.stroke(C.ink); p.strokeWeight(1.6); p.fill(RK.al(p, good ? C.ok : C.sky, 120)); p.beginShape(); pts.forEach(q => p.vertex(...q)); p.endShape(p.CLOSE);
      p.noFill(); p.stroke(C.coral); p.drawingContext.setLineDash([5, 4]); p.rect(x0 + off * u, yb - r.h * u, s.b * u, r.h * u); p.drawingContext.setLineDash([]);
      p.stroke(C.brand); p.strokeWeight(1.4); p.line(x0 + off * u, yb, x0 + off * u, yb - r.h * u);
      TK.label(p, C, `h = ${r.h}`, x0 + off * u + 26, yb - r.h * u - 10, C.brand, 10, 50);
      TK.label(p, C, `${r.slant}`, x0 + off * u / 2 - 10, yb - r.h * u / 2, C.mute, 10, 30);
      TK.label(p, C, `base ${s.b}`, x0 + s.b * u / 2, yb + 12, C.ink, 10, 70);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 12, s.b - 1, i => (i % 2 === 1 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$${s.b} \\cdot ${r.h} = ${s.b * r.h}$`, { kicker: 'base × altura', col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X([2, 3, 5].find(i => i + 1 !== answer(G.r).b)), y: G.tY }, text: 'Arrastra la base', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 12) + 1; if (v !== G.s.b || !G.touched[G.cur]) { G.s.b = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/mide-circulo.js
// Radio, longitud y área del círculo (Preuniversitario, pu-ge-4; spec 2026-11-18-preuda-razonamiento-completo): L = 2πr y
// A = πr². Se arrastra el borde del círculo (radio de medio en medio) y se ven en vivo el diámetro, la longitud y el área
// (en múltiplos de π). Hay que lograr la medida pedida, sin confundir radio con diámetro.
// params = { rounds: [{ ask: 'L' | 'A' | 'd', target }] }   (L y A en múltiplos de π)   state = { rounds: [{ r }] }   (de 0.5 a 10)
GAMES['mide-circulo'] = (() => {
  const val = (ask, r) => (ask === 'L' ? 2 * r : ask === 'A' ? r * r : 2 * r);
  let ok = (s, r) => Math.abs(val(r.ask, s.r) - r.target) < 1e-9;
  const answer = r => ({ r: r.ask === 'A' ? Math.sqrt(r.target) : r.target / 2 });
  const show = v => RK.num(Math.round(v * 100) / 100);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ r: answer(r).r === 1 ? 2 : 1 }),
    ok,
    solution: r => `r = ${show(answer(r).r)}`,
    prompt: r => (r.ask === 'L' ? `Haz un círculo de longitud ${show(r.target)}π` : r.ask === 'A' ? `Haz un círculo de área ${show(r.target)}π` : `Haz un círculo de diámetro ${show(r.target)}`),
    foot: () => 'Arrastra el borde del círculo',
    layout(G) { G.c = { x: G.W / 2, y: 100 + (G.H - 280) / 2 }; G.R = Math.min(G.W / 2 - 24, (G.H - 280) / 2); G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, u = G.R / 10, good = ok(s, r);
      p.stroke(good ? C.ok : C.sky); p.strokeWeight(2.4); p.fill(RK.al(p, good ? C.ok : C.sky, 50)); p.circle(G.c.x, G.c.y, 2 * s.r * u);
      p.stroke(C.brand); p.strokeWeight(1.6); p.line(G.c.x, G.c.y, G.c.x + s.r * u, G.c.y); drawDot(p, C, G.c.x, G.c.y, 6, C.ink);
      RK.knob(p, C, G.c.x + s.r * u, G.c.y, C.brand); G.kx = G.c.x + s.r * u;
      TK.label(p, C, `r = ${show(s.r)}`, G.c.x + s.r * u / 2, G.c.y - 12, C.ink, 11, 70);
      [`d = ${show(2 * s.r)}`, `L = ${show(2 * s.r)}π`, `A = ${show(s.r * s.r)}π`].forEach((t, i) => TK.label(p, C, t, 20 + (i + 0.5) * (G.W - 40) / 3, G.c.y + G.R + 20, C.mute, 11, (G.W - 40) / 3));
      RK.strip(p, C, G.fb, r.ask === 'L' ? `$L = 2\\pi \\cdot ${show(s.r)} = ${show(2 * s.r)}\\pi$` : r.ask === 'A' ? `$A = \\pi \\cdot ${show(s.r)}^2 = ${show(s.r * s.r)}\\pi$` : `$d = 2 \\cdot ${show(s.r)} = ${show(2 * s.r)}$`, { col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.hypot(x - G.c.x, y - G.c.y) > G.R + 30) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.kx, y: G.c.y }, to: { x: G.kx + G.R * 0.25, y: G.c.y }, text: 'Arrastra el borde', ty: G.c.y + G.R + 40 }),
    peek: G => ({ c: G.c, R: G.R }),
  });
  game.move = (G, x, y) => { const v = Math.max(0.5, Math.min(10, Math.round(Math.hypot(x - G.c.x, y - G.c.y) / (G.R / 10) * 2) / 2)); if (v !== G.s.r || !G.touched[G.cur]) { G.s.r = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/triangulo-cuadricula.js
// Triángulo en la cuadrícula (Preuniversitario, pu-ge-5; spec 2026-11-18-preuda-razonamiento-completo): con la base sobre una
// línea de la cuadrícula, el área es base × altura ÷ 2, y la altura es qué tan lejos está el tercer vértice de esa línea
// (correrlo de lado no cambia el área). Se arrastra el vértice de arriba por los puntos de la cuadrícula hasta el área pedida.
// params = { rounds: [{ b, target }] }   (base de (0, 0) a (b, 0))   state = { rounds: [{ x, y }] }   (enteros, x de 0 a 8, y de 1 a 7)
GAMES['triangulo-cuadricula'] = (() => {
  let ok = (s, r) => r.b * s.y === 2 * r.target;
  const answer = r => ({ x: 1, y: 2 * r.target / r.b });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ x: 2, y: 2 * r.target / r.b === 1 ? 2 : 1 }),
    ok,
    solution: r => `altura ${2 * r.target / r.b}`,
    prompt: r => `La base mide ${r.b}. Lleva el vértice a un punto que dé área ${r.target}`,
    foot: () => 'Arrastra el vértice de arriba por la cuadrícula',
    layout(G) { const s = Math.min(G.W - 40, G.H - 200); G.u = s / 8; G.o = { x: (G.W - s) / 2, y: 100 + s }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, u = G.u, o = G.o, X = x => o.x + x * u, Y = y => o.y - y * u, good = ok(s, r);
      p.stroke(RK.al(p, C.line, 110)); p.strokeWeight(1); for (let i = 0; i <= 8; i++) { p.line(X(i), Y(0), X(i), Y(8)); p.line(X(0), Y(i), X(8), Y(i)); }
      p.stroke(C.ink); p.strokeWeight(2); p.fill(RK.al(p, good ? C.ok : C.sky, 120)); p.triangle(X(0), Y(0), X(r.b), Y(0), X(s.x), Y(s.y));
      p.stroke(C.brand); p.strokeWeight(1.4); p.drawingContext.setLineDash([4, 3]); p.line(X(s.x), Y(s.y), X(s.x), Y(0)); p.drawingContext.setLineDash([]);
      RK.knob(p, C, X(s.x), Y(s.y), C.brand);
      RK.strip(p, C, G.fb, `$\\dfrac{${r.b} \\cdot ${s.y}}{2} = ${RK.num(r.b * s.y / 2)}$`, { kicker: `altura ${s.y}`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const X = G.o.x + G.s.x * G.u, Y = G.o.y - G.s.y * G.u; if (Math.hypot(x - X, y - Y) > 40) return false; G.grab = true; return true; },
    drag(G, x, y) { if (!G.grab) return false; const nx = Math.max(0, Math.min(8, Math.round((x - G.o.x) / G.u))), ny = Math.max(1, Math.min(7, Math.round((G.o.y - y) / G.u))); if (nx !== G.s.x || ny !== G.s.y || !G.touched[G.cur]) { G.s.x = nx; G.s.y = ny; G.touch(); } return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.o.x + G.s.x * G.u, y: G.o.y - G.s.y * G.u }, to: { x: G.o.x + (G.s.x + 3) * G.u, y: G.o.y - G.s.y * G.u }, text: 'Arrastra el vértice', ty: G.o.y + 18 }),
    peek: G => ({ o: G.o, u: G.u }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/sombreado-resta.js
// El área sombreada es una resta (Preuniversitario, pu-ge-5; spec 2026-11-18-preuda-razonamiento-completo): la zona
// sombreada es la figura grande menos lo que se le quita. Un cuadrado con un círculo (o un cuadrado) adentro; se arrastra
// el tamaño de la figura de adentro y la cuenta «grande − chica» se ve en vivo, hasta que lo sombreado mida lo pedido.
// params = { rounds: [{ s, kind: 'circ' | 'sq', target }] }   (target: número o [a, b] = a − bπ)   state = { rounds: [{ t }] }   (radio o lado, de 1 a s)
GAMES['sombreado-resta'] = (() => {
  const shaded = (r, t) => (r.kind === 'circ' ? [r.s * r.s, t * t] : [r.s * r.s - t * t, 0]);
  let ok = (s, r) => { const [a, b] = shaded(r, s.t); return Array.isArray(r.target) ? a === r.target[0] && b === r.target[1] : a === r.target && b === 0; };
  const answer = r => { for (let t = 1; t <= r.s; t++) if (ok({ t }, r)) return { t }; return null; };
  const tt = (r, t) => { const [a, b] = shaded(r, t); return b ? `${a} - ${b}\\pi` : `${a}`; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ t: 1 }),
    ok,
    solution: r => `${r.kind === 'circ' ? 'radio' : 'lado'} ${answer(r).t}`,
    prompt: r => `Cuadrado de lado ${r.s}. Ajusta ${r.kind === 'circ' ? 'el círculo' : 'el cuadrado'} de adentro para que lo sombreado mida $${Array.isArray(r.target) ? `${r.target[0]} - ${r.target[1]}\\pi` : r.target}$`,
    foot: () => 'Arrastra el borde de la figura de adentro',
    layout(G) { const s = Math.min(G.W - 60, G.H - 210); G.box = { x: (G.W - s) / 2, y: 100, w: s }; G.fb = { x: 12, y: G.H - 70, w: G.W - 24, h: 46 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, b = G.box, u = b.w / r.s, cx = b.x + b.w / 2, cy = b.y + b.w / 2, good = ok(s, r);
      p.stroke(C.ink); p.strokeWeight(1.6); p.fill(good ? C.ok : C.sky); p.rect(b.x, b.y, b.w, b.w);
      p.fill(C.bg); p.stroke(C.ink); if (r.kind === 'circ') p.circle(cx, cy, 2 * s.t * u); else p.rect(cx - s.t * u / 2, cy - s.t * u / 2, s.t * u, s.t * u);
      const kx = r.kind === 'circ' ? cx + s.t * u : cx + s.t * u / 2; RK.knob(p, C, kx, cy, C.brand); G.kx = kx; G.cy = cy;
      TK.label(p, C, `${r.kind === 'circ' ? 'r' : 'lado'} = ${s.t}`, cx, cy + 14, C.ink, 11, 70);
      RK.strip(p, C, G.fb, `$${r.s}^2 - ${r.kind === 'circ' ? `\\pi \\cdot ${s.t}^2` : `${s.t}^2`} = ${tt(r, s.t)}$`, { kicker: 'grande − chica', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const b = G.box; if (!hitBox({ x: b.x, y: b.y, w: b.w, h: b.w }, x, y)) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.kx, y: G.cy }, to: { x: G.kx + G.box.w * 0.15, y: G.cy }, text: 'Arrastra el borde', ty: G.box.y + G.box.w + 16 }),
    peek: G => ({ box: G.box }),
  });
  game.move = (G, x) => { const r = G.r, b = G.box, u = b.w / r.s, d = Math.abs(x - (b.x + b.w / 2)) / u, t = Math.max(1, Math.min(r.kind === 'circ' ? Math.floor(r.s / 2) : r.s - 1, Math.round(r.kind === 'circ' ? d : 2 * d))); if (t !== G.s.t || !G.touched[G.cur]) { G.s.t = t; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/prisma-capas.js
// El volumen de un prisma o un cilindro (Preuniversitario, pu-ge-6; spec 2026-11-18-preuda-razonamiento-completo): V = área de
// la base × altura: el sólido es una pila de capas iguales a la base. Se ve la base con su área; se arrastra la altura y las
// capas se apilan. Hay que llegar al volumen pedido.
// params = { rounds: [{ base: 'rect' | 'circ' | 'tri', dims: [..], target }] }   (circ: target en múltiplos de π)   state = { rounds: [{ h }] }   (de 1 a 10)
GAMES['prisma-capas'] = (() => {
  const A = r => (r.base === 'rect' ? r.dims[0] * r.dims[1] : r.base === 'tri' ? r.dims[0] * r.dims[1] / 2 : r.dims[0] ** 2);
  let ok = (s, r) => A(r) * s.h === r.target;
  const answer = r => ({ h: r.target / A(r) });
  const pi = r => (r.base === 'circ' ? '\\pi' : '');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ h: 1 }),
    ok,
    solution: r => `altura ${r.target / A(r)}`,
    prompt: r => `${r.base === 'rect' ? `Base de ${r.dims[0]} × ${r.dims[1]}` : r.base === 'tri' ? `Base triangular de base ${r.dims[0]} y altura ${r.dims[1]}` : `Cilindro de radio ${r.dims[0]}`}: ¿qué altura da volumen $${r.target}${pi(r)}$?`,
    foot: () => 'Arrastra la altura: cada capa es una copia de la base',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), cx = G.W / 2, w = Math.min(150, G.W * 0.45), lh = Math.min(14, (G.tY - 190) / 10), yb = G.tY - 60;
      for (let i = 0; i < s.h; i++) {
        const y = yb - i * lh; p.stroke(C.bg); p.strokeWeight(1);
        p.fill(RK.al(p, good ? C.ok : i % 2 ? C.sky : C.mint, 220));
        if (r.base === 'circ') p.ellipse(cx, y, w, w * 0.32); else if (r.base === 'tri') p.triangle(cx - w / 2, y + 8, cx + w / 2, y + 8, cx + w * 0.1, y - 10); else p.quad(cx - w / 2, y + 8, cx + w / 2 - 20, y + 8, cx + w / 2, y - 8, cx - w / 2 + 20, y - 8);
      }
      TK.label(p, C, `base: $${A(r)}${pi(r)}$`, cx, yb + 28, C.mute, 11, 140);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 10, s.h - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$${A(r)}${pi(r)} \\cdot ${s.h} = ${A(r) * s.h}${pi(r)}$`, { kicker: `${s.h} capa${s.h > 1 ? 's' : ''}`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X([2, 3, 5].find(i => i + 1 !== answer(G.r).h)), y: G.tY }, text: 'Arrastra la altura', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 10) + 1; if (v !== G.s.h || !G.touched[G.cur]) { G.s.h = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/cono-tercio.js
// El cono es un tercio del cilindro (Preuniversitario, pu-ge-6; spec 2026-11-18-preuda-razonamiento-completo): un cono (o una
// pirámide) llena la tercera parte del cilindro (o prisma) de la misma base y altura: V = ⅓ · base · altura. Se arrastra la
// altura del cono; al lado, el cilindro igual con su agua a un tercio. Hay que llegar al volumen pedido.
// params = { rounds: [{ base: 'circ' | 'rect', dims: [..], target }] }   (circ: target en múltiplos de π)   state = { rounds: [{ h }] }   (de 1 a 12)
GAMES['cono-tercio'] = (() => {
  const A = r => (r.base === 'rect' ? r.dims[0] * r.dims[1] : r.dims[0] ** 2);
  const V = (r, h) => A(r) * h / 3;
  let ok = (s, r) => Math.abs(V(r, s.h) - r.target) < 1e-9;
  const answer = r => ({ h: 3 * r.target / A(r) });
  const pi = r => (r.base === 'circ' ? '\\pi' : '');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: () => ({ h: 1 }),
    ok,
    solution: r => `altura ${3 * r.target / A(r)}`,
    prompt: r => `${r.base === 'circ' ? `Cono de radio ${r.dims[0]}` : `Pirámide de base ${r.dims[0]} × ${r.dims[1]}`}: ¿qué altura da volumen $${r.target}${pi(r)}$?`,
    foot: () => 'Arrastra la altura del cono',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), yb = G.tY - 56, u = (G.tY - 190) / 12, w = Math.min(110, G.W * 0.3), hp = s.h * u, x1 = G.W * 0.3, x2 = G.W * 0.7;
      p.stroke(C.ink); p.strokeWeight(1.6); p.fill(RK.al(p, good ? C.ok : C.coral, 140)); p.triangle(x1 - w / 2, yb, x1 + w / 2, yb, x1, yb - hp); p.ellipse(x1, yb, w, w * 0.25);
      p.noFill(); p.rect(x2 - w / 2, yb - hp, w, hp); p.noStroke(); p.fill(RK.al(p, C.sky, 160)); p.rect(x2 - w / 2, yb - hp / 3, w, hp / 3);
      TK.label(p, C, 'cono', x1, yb + 22, C.mute, 10, 60); TK.label(p, C, 'cilindro: ⅓ lleno', x2, yb + 22, C.mute, 10, 120);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 12, s.h - 1, i => (i % 2 === 1 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$\\tfrac13 \\cdot ${A(r)}${pi(r)} \\cdot ${s.h} = ${RK.num(V(r, s.h))}${pi(r)}$`, { col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X([2, 4, 6].find(i => i + 1 !== answer(G.r).h)), y: G.tY }, text: 'Arrastra la altura', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 12) + 1; if (v !== G.s.h || !G.touched[G.cur]) { G.s.h = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/orden-kit.js
// Kit de los acertijos de orden y asignación (Preuniversitario, mundo «Acertijos de orden»; spec
// 2026-11-18-preuda-razonamiento-completo). Va después de kit.js y recta-kit.js.
// Un acomodo es una lista: arr[i] = nombre en la casilla i (o null). Las pistas son objetos:
//   en línea: at {a, i} · notAt {a, i} · before {a, b} (a antes que b) · justBefore {a, b} (a justo antes de b) · adj {a, b} ·
//   notAdj {a, b} · end {a} · notEnd {a} · gap {a, b, k} (b está k casillas después de a)
//   en círculo (circ = true): opp {a, b} · adj / notAdj (dando la vuelta) · right {a, b} (b justo a la derecha de a, horario)
// Cada pista trae su texto (`say`) para mostrarla tal como la diría el enunciado.
const ORD = (() => {
  const pos = (arr, a) => arr.indexOf(a);
  function sat(arr, c, circ) {
    const n = arr.length, A = pos(arr, c.a), B = c.b != null ? pos(arr, c.b) : -1;
    if (A < 0 || (c.b != null && B < 0)) return null;               // aún no se puede juzgar
    const d = circ ? (B - A + n) % n : B - A;
    switch (c.t) {
      case 'at': return A === c.i;
      case 'notAt': return A !== c.i;
      case 'before': return A < B;
      case 'justBefore': return B - A === 1;
      case 'gap': return B - A === c.k;
      case 'adj': return circ ? d === 1 || d === n - 1 : Math.abs(A - B) === 1;
      case 'notAdj': return circ ? !(d === 1 || d === n - 1) : Math.abs(A - B) !== 1;
      case 'end': return A === 0 || A === n - 1;
      case 'notEnd': return A !== 0 && A !== n - 1;
      case 'opp': return d === n / 2;
      case 'right': return d === 1;
      default: return false;
    }
  }
  const perms = list => (list.length <= 1 ? [list] : list.flatMap((x, i) => perms([...list.slice(0, i), ...list.slice(i + 1)]).map(p => [x, ...p])));
  // Soluciones de un acertijo. En círculo, la primera persona queda fija en la casilla 0 (girar no cambia nada).
  function solutions(names, clues, circ, fixFirst = circ) {
    const base = fixFirst ? perms(names.slice(1)).map(p => [names[0], ...p]) : perms(names);
    return base.filter(arr => clues.every(c => sat(arr, c, circ)));
  }
  // Iguales salvo un giro (para la mesa redonda).
  const sameRing = (a, b) => a.length === b.length && a.some((_, k) => a.every((x, i) => x === b[(i + k) % b.length]));
  // Fichas que se arrastran a casillas. G.slots = [{x, y, w, h}], G.tray = [{x, y, w, h}] (una por nombre).
  // Devuelve el índice de casilla bajo (x, y) o -1.
  const slotAt = (G, x, y) => (G.slots || []).findIndex(b => hitBox({ x: b.x - 6, y: b.y - 8, w: b.w + 12, h: b.h + 16 }, x, y));
  // press/drag/release comunes: se arrastra un nombre desde la bandeja o desde una casilla; al soltar en una casilla ocupada,
  // los dos se cambian de lugar; al soltar fuera, vuelve a la bandeja.
  function press(G, x, y) {
    const k = slotAt(G, x, y); if (k >= 0 && G.s.arr[k] != null) { G.drag = { name: G.s.arr[k], from: k, x, y }; return true; }
    const t = (G.trayBoxes || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { name: t.name, from: -1, x, y }; return true; }
    return false;
  }
  function drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; }
  function release(G, x, y) {
    const d = G.drag; G.drag = null; if (!d) return;
    const arr = G.s.arr, k = slotAt(G, x, y);
    if (d.from >= 0) arr[d.from] = null;
    if (k >= 0) { const prev = arr[k]; arr[k] = d.name; if (prev != null && d.from >= 0) arr[d.from] = prev; }
    G.touch();
  }
  // Dibuja la bandeja con los nombres que faltan por ubicar (abajo, sobre la franja) y la ficha que se arrastra.
  function drawTray(G, y, col) {
    const { p, C, r } = G, free = r.names.filter(n => !G.s.arr.includes(n) && G.drag?.name !== n), w = Math.min(64, (G.W - 20) / Math.max(1, r.names.length) - 6);
    G.trayBoxes = free.map((name, i) => ({ name, x: G.W / 2 - (free.length * (w + 6) - 6) / 2 + i * (w + 6), y, w, h: 32 }));
    G.trayBoxes.forEach(b => RK.chip(p, C, b, b.name, { size: 12, col }));
    if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 16, w, h: 32 }, G.drag.name, { on: true, col: C.brand, size: 12 });
  }
  // Lista de pistas con ✓ cuando ya se cumplen (en gris si todavía no se pueden juzgar).
  function drawClues(G, x, y, w, circ) {
    const { p, C, r } = G;
    r.clues.forEach((c, i) => { const v = VELO.on ? null : sat(G.s.arr, c, circ); TK.label(p, C, `${v === true ? '✓' : v === false ? '✗' : '·'} ${c.say}`, x + w / 2, y + i * 15, v === true ? C.ok : v === false ? C.bad : C.mute, 10, w); });
  }
  // Juego de acomodar nombres en casillas con pistas. o = { circ, fixFirst (la primera persona ya está en la casilla 0), aspect, slots(G) → [{x, y, w, h}], label(i, r) → rótulo de la
  // casilla, decor(G) (dibujo de la escena, debajo de las fichas), cluesY(G), prompt(r), foot, color }.
  function slotGame(o) {
    const circ = !!o.circ;
    const ok = velo((s, r) => s.arr.every(x => x != null) && r.clues.every(c => sat(s.arr, c, circ)));
    const sols = r => solutions(r.names, r.clues, circ, !!o.fixFirst);
    // En círculo cualquier giro de la solución también vale: se muestra la que deja a la primera persona en la casilla 0.
    const answer = r => ({ arr: sols(r)[0] });
    const game = roundsGame({
      aspect: o.aspect || 1.3,
      init: r => ({ arr: r.names.map((n, i) => (o.fixFirst && i === 0 ? n : null)) }),
      ok,
      answered: (s, r) => s.arr.some((x, i) => x != null && !(o.fixFirst && i === 0)),
      solution: r => answer(r).arr.map((n, i) => `${o.label(i, r)}: ${n}`).join(', '),
      prompt: o.prompt,
      foot: () => o.foot || 'Arrastra cada nombre a su lugar; suéltalo sobre otro para cambiarlos',
      layout(G) { G.slots = o.slots(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
      enter(G) { G.drag = null; G.slots = o.slots(G); },
      draw(G) {
        const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
        o.decor?.({ ...G, s });
        G.slots.forEach((b, i) => {
          TK.label(p, C, o.label(i, r), b.lx ?? b.x + b.w / 2, b.ly ?? b.y - 8, C.mute, 9, 60);
          const v = s.arr[i];
          if (v != null && G.drag?.name !== v) RK.chip(p, C, b, v, { on: true, col: good ? C.ok : o.color?.(C) || C.sky, size: 12 });
          else { p.noFill(); p.stroke(C.line); p.strokeWeight(1.2); p.drawingContext.setLineDash([4, 3]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); }
        });
        const cb = o.clues ? o.clues(G) : { x: 16, y: 200, w: G.W - 32 };
        drawClues({ ...G, s }, cb.x, cb.y, cb.w, circ);
        drawTray(G, G.H - 108, C.mint);
        RK.strip(p, C, G.fb, good ? '$\\text{todas las pistas se cumplen}$' : '$\\text{cumple todas las pistas}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
      },
      press: (G, x, y) => { if (o.fixFirst && slotAt(G, x, y) === 0) return false; return press(G, x, y); }, drag, release: (G, x, y) => { if (o.fixFirst && slotAt(G, x, y) === 0) { G.drag = null; return; } release(G, x, y); },
      demo(G) { const b = G.trayBoxes?.[0]; if (!b) return null; const sol = answer(G.r).arr, k = G.slots.findIndex((_, i) => sol[i] !== b.name), sl = G.slots[k]; return { from: { x: b.x + b.w / 2, y: b.y + 16 }, to: { x: sl.x + sl.w / 2, y: sl.y + sl.h / 2 }, text: 'Arrastra un nombre', ty: b.y - 14 }; },
      peek: G => ({ slots: G.slots, tray: G.trayBoxes }),
    });
    return Object.assign(game, { answer, solutions: sols });
  }
  return { sat, perms, solutions, sameRing, slotAt, press, drag, release, drawTray, drawClues, slotGame };
})();
;
//#archivo js/games/descarta-casos.js
// Probar y descartar (Preuniversitario, pu-or-1 a pu-or-4; spec 2026-11-18-preuda-razonamiento-completo): cuando las pistas
// dejan pocas posibilidades, se escriben todas y se tachan las que chocan con alguna pista. Hay tarjetas con acomodos
// posibles y fichas con las pistas; se arrastra una pista sobre la tarjeta que la incumple y esa tarjeta queda tachada (si la
// pista sí se cumple en esa tarjeta, no pasa nada). Hay que dejar en pie solo el acomodo que cumple todo.
// params = { rounds: [{ cands: [[nombres]], clues, circ? }] }   state = { rounds: [{ out: [índices de tarjetas tachadas] }] }
GAMES['descarta-casos'] = (() => {
  const good = r => r.cands.findIndex(a => r.clues.every(c => ORD.sat(a, c, !!r.circ)));
  let ok = (s, r) => s.out.length === r.cands.length - 1 && !s.out.includes(good(r));
  const answer = r => ({ out: r.cands.map((_, i) => i).filter(i => i !== good(r)) });
  const lay = G => { const n = G.r.cands.length, w = G.W - 40, h = Math.min(34, (G.H * 0.42) / n - 6); G.cards = G.r.cands.map((_, i) => ({ i, x: 20, y: 100 + i * (h + 6), w, h })); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: () => ({ out: [] }),
    ok,
    answered: s => s.out.length > 0,
    solution: r => r.cands[good(r)].join(', '),
    prompt: () => 'Tacha cada acomodo con la pista que incumple',
    foot: () => 'Arrastra una pista sobre la tarjeta que la incumple',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s;
      G.cards.forEach(b => { const off = s.out.includes(b.i); RK.chip(p, C, b, r.cands[b.i].join(' · '), { on: !off, col: off ? C.line : ok(s, r) ? C.ok : C.sky, size: 12 }); if (off) { p.stroke(C.bad); p.strokeWeight(2); p.line(b.x + 6, b.y + b.h / 2, b.x + b.w - 6, b.y + b.h / 2); } });
      const y0 = G.cards[G.cards.length - 1].y + 50, n = r.clues.length, w = G.W - 32;
      G.clueBoxes = r.clues.map((c, i) => ({ i, x: 16, y: y0 + i * 30, w, h: 26 }));
      G.clueBoxes.forEach(b => { if (G.drag?.i !== b.i) RK.chip(p, C, b, r.clues[b.i].say, { size: 10, col: C.mint }); });
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 13, w, h: 26 }, r.clues[G.drag.i].say, { on: true, size: 10 });
      RK.strip(p, C, G.fb, `$\\text{quedan ${r.cands.length - s.out.length} de ${r.cands.length}}$`, { col: G.locked || ok(G.s, r) ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) {
      const b = (G.clueBoxes || []).find(b => hitBox(b, x, y)); if (b) { G.drag = { i: b.i, x, y }; return true; }
      const c = G.cards.find(c => hitBox(c, x, y)); if (c && G.s.out.includes(c.i)) { G.s.out.splice(G.s.out.indexOf(c.i), 1); G.touch(); return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return;
      const c = G.cards.find(c => hitBox(c, x, y)); if (!c || G.s.out.includes(c.i)) return;
      if (ORD.sat(G.r.cands[c.i], G.r.clues[d.i], !!G.r.circ) === false) { G.s.out.push(c.i); G.touch(); }
    },
    demo(G) { const b = G.clueBoxes?.[0], c = G.cards?.[0]; return b && c ? { from: { x: b.x + b.w / 2, y: b.y + 13 }, to: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, text: 'Arrastra la pista a una tarjeta', ty: b.y - 12 } : null; },
    peek: G => ({ cards: G.cards, clues: G.clueBoxes }),
  });
  return Object.assign(game, { answer, good });
})();
;
//#archivo js/games/trabajo-conjunto.js
// El trabajo conjunto (Preuniversitario, pu-pr-3; spec 2026-11-18-preuda-razonamiento-completo): si uno hace un trabajo en a
// horas y otro en b, en cada hora hacen 1/a y 1/b: juntos se suman las rapideces, no los tiempos. Se arrastran las horas y el
// tanque se llena con dos colores (lo que aporta cada uno). Hay que dejarlo lleno justo.
// params = { rounds: [{ who: [a, b], a, b }] }   state = { rounds: [{ t }] }   (horas, de media en media)
GAMES['trabajo-conjunto'] = (() => {
  const need = r => r.a * r.b / (r.a + r.b);
  let ok = (s, r) => Math.abs(s.t - need(r)) < 1e-9;
  const max = r => Math.min(r.a, r.b);
  const N = r => Math.round(max(r) * 2);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ t: 0.5 }),
    ok,
    solution: r => `${RK.num(need(r))} horas`,
    prompt: r => `${r.who[0]} solo tarda ${r.a} h y ${r.who[1]} solo ${r.b} h. ¿Cuánto tardan juntos?`,
    foot: () => 'Arrastra las horas que trabajan juntos',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { t: need(r) } : G.s, fa = s.t / r.a, fb = s.t / r.b, tot = fa + fb, good = ok(s, r), x0 = G.W / 2 - 50, y0 = 110, h = G.tY - 180;
      p.noFill(); p.stroke(C.ink); p.strokeWeight(1.6); p.rect(x0, y0, 100, h, 4);
      const ha = Math.min(1, fa) * h, hb = Math.min(1 - Math.min(1, fa), fb) * h;
      p.noStroke(); p.fill(good ? C.ok : C.sky); p.rect(x0 + 2, y0 + h - ha, 96, ha); p.fill(good ? C.ok : C.coral); p.rect(x0 + 2, y0 + h - ha - hb, 96, hb);
      if (tot > 1) TK.label(p, C, 'se rebosa', G.W / 2, y0 - 10, C.bad, 11, 100);
      TK.label(p, C, `${r.who[0]}: ${RK.num(Math.round(fa * 1000) / 1000)}`, x0 - 50, y0 + h - ha / 2, C.sky, 10, 90);
      TK.label(p, C, `${r.who[1]}: ${RK.num(Math.round(fb * 1000) / 1000)}`, x0 + 150, y0 + h - ha - hb / 2, C.coral, 10, 90);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), Math.round(s.t * 2) - 1, i => ((i + 1) % 2 === 0 ? String((i + 1) / 2) : null));
      RK.strip(p, C, G.fb, `$\\tfrac{${RK.num(s.t)}}{${r.a}} + \\tfrac{${RK.num(s.t)}}{${r.b}} ${VELO.on ? '' : good ? '= 1' : tot > 1 ? '> 1' : '< 1'}$`, { kicker: 'Lo que hace cada uno se suma', col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(1), y: G.tY }, text: 'Arrastra las horas', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = (RK.pick(x, 30, G.W - 30, N(G.r)) + 1) / 2; if (v !== G.s.t || !G.touched[G.cur]) { G.s.t = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ t: need(r) }) });
})();
;
//#archivo js/games/velocidad-media.js
// La velocidad media (Preuniversitario, pu-pr-3; spec 2026-11-18-preuda-razonamiento-completo): la velocidad media es la
// distancia total entre el tiempo total, no el promedio de las velocidades. Un viaje de dos tramos; arriba las barras del
// tiempo de cada tramo. Se arrastra una velocidad constante y su barra de tiempo debe igualar la suma de las otras dos.
// params = { rounds: [{ legs: [[km, km/h], [km, km/h]] }] }   state = { rounds: [{ v }] }   (km/h, de 5 en 5 hasta 120)
GAMES['velocidad-media'] = (() => {
  const D = r => r.legs[0][0] + r.legs[1][0], T = r => r.legs[0][0] / r.legs[0][1] + r.legs[1][0] / r.legs[1][1];
  const need = r => D(r) / T(r);
  let ok = (s, r) => Math.abs(s.v - need(r)) < 1e-9;
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => { const avg = (r.legs[0][1] + r.legs[1][1]) / 2; const a5 = Math.round(avg / 5) * 5; return { v: a5 === need(r) ? 10 : a5 }; },
    ok,
    solution: r => `${RK.num(need(r))} km/h`,
    prompt: r => `${r.legs[0][0]} km a ${r.legs[0][1]} km/h y ${r.legs[1][0]} km a ${r.legs[1][1]} km/h. ¿Velocidad media?`,
    foot: () => 'Arrastra la velocidad que hace el viaje en el mismo tiempo',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: need(r) } : G.s, t1 = r.legs[0][0] / r.legs[0][1], t2 = r.legs[1][0] / r.legs[1][1], tv = D(r) / s.v, u = (G.W - 60) / Math.max(T(r), tv) / 1.1, good = ok(s, r);
      TK.label(p, C, 'tiempo del viaje real', G.W / 2, 104, C.mute, 10, 200);
      p.noStroke(); p.fill(C.sky); p.rect(30, 114, t1 * u, 24, 3); p.fill(C.coral); p.rect(30 + t1 * u, 114, t2 * u, 24, 3);
      TK.label(p, C, `${RK.num(t1)} h + ${RK.num(t2)} h = ${RK.num(T(r))} h`, G.W / 2, 150, C.ink, 11, G.W - 30);
      TK.label(p, C, `a ${s.v} km/h constante`, G.W / 2, 176, C.mute, 10, 200);
      p.fill(good ? C.ok : C.mint); p.rect(30, 186, tv * u, 24, 3);
      TK.label(p, C, `${D(r)} km ÷ ${s.v} = ${RK.num(Math.round(tv * 100) / 100)} h`, G.W / 2, 222, C.ink, 11, G.W - 30);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 24, s.v / 5 - 1, i => ((i + 1) % 4 === 0 ? String((i + 1) * 5) : null));
      RK.strip(p, C, G.fb, `$v_m = \\dfrac{${D(r)}}{${RK.num(T(r))}} ${VELO.on ? '\\;?\\;' : good ? '=' : '\\ne'} ${s.v}$`, { kicker: 'Distancia total ÷ tiempo total', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.v / 5 - 1), y: G.tY }, to: { x: G.X(Math.min(23, G.s.v / 5 + 2)), y: G.tY }, text: 'Arrastra la velocidad', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = (RK.pick(x, 30, G.W - 30, 24) + 1) * 5; if (v !== G.s.v || !G.touched[G.cur]) { G.s.v = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ v: need(r) }) });
})();
;
//#archivo js/games/arbol-opciones.js
// El árbol de opciones (Preuniversitario, pu-co-1; spec 2026-11-18-preuda-razonamiento-completo): si cada decisión se toma
// después de la anterior, el árbol se abre en cada nivel y las hojas son el producto de las opciones. Se conocen el total y
// casi todos los niveles; se arrastran las ramas del nivel que falta y el árbol cuenta sus hojas.
// params = { rounds: [{ levels: [{ name, n }], miss, total }] }   (miss: nivel que falta)   state = { rounds: [{ k }] }   (de 1 a 8)
GAMES['arbol-opciones'] = (() => {
  const prod = (r, k) => r.levels.reduce((a, l, i) => a * (i === r.miss ? k : l.n), 1);
  let ok = (s, r) => prod(r, s.k) === r.total;
  const answer = r => ({ k: r.levels[r.miss].n });
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ k: r.levels[r.miss].n === 1 ? 2 : 1 }),
    ok,
    solution: r => `${r.levels[r.miss].n} ${r.levels[r.miss].name}`,
    prompt: r => `${r.total} combinaciones en total. ¿Cuántas opciones de ${r.levels[r.miss].name}?`,
    foot: () => 'Arrastra cuántas ramas tiene el nivel que falta',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, ns = r.levels.map((l, i) => (i === r.miss ? s.k : l.n)), L = ns.length, top = 104, H = G.tY - 150, good = ok(s, r);
      let nodes = [{ x: G.W / 2, y: top }];
      ns.forEach((n, lv) => {
        const y = top + (lv + 1) * H / L, total = nodes.length * n, w = (G.W - 40) / total, next = [];
        nodes.forEach((nd, j) => { for (let b = 0; b < n; b++) { const x = 20 + (j * n + b + 0.5) * w; p.stroke(lv === r.miss ? (good ? C.ok : C.coral) : C.line); p.strokeWeight(total > 40 ? 0.6 : 1.2); p.line(nd.x, nd.y, x, y); next.push({ x, y }); } });
        TK.label(p, C, `${r.levels[lv].name}: ${n}`, 54, y - H / L / 2, lv === r.miss ? C.coral : C.mute, 9, 100);
        nodes = next;
      });
      if (nodes.length <= 60) nodes.forEach(nd => drawDot(p, C, nd.x, nd.y, 4, good ? C.ok : C.sky));
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 8, s.k - 1, i => String(i + 1));
      RK.strip(p, C, G.fb, `$${ns.join(' \\cdot ')} = ${prod(r, s.k)}\\ \\text{hojas}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.k - 1), y: G.tY }, to: { x: G.X([5, 6, 7].find(i => i + 1 !== answer(G.r).k)), y: G.tY }, text: 'Arrastra las ramas', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 8) + 1; if (v !== G.s.k || !G.touched[G.cur]) { G.s.k = v; G.touch(); } };
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/placas-codigo.js
// Contar códigos casilla por casilla (Preuniversitario, pu-co-1 y pu-co-2; spec 2026-11-18-preuda-razonamiento-completo): en
// un código cada casilla tiene sus opciones; si no se puede repetir, cada casilla tiene una menos que la anterior. Se arrastra
// a cada casilla la ficha con su número de opciones; el juego multiplica.
// params = { rounds: [{ slots: [rótulo], rule, want: [n], tray: [n], ask? }] }   (ask: la pregunta; por defecto «¿Cuántos códigos hay?»)   state = { rounds: [{ put: [índice de ficha | null] }] }
GAMES['placas-codigo'] = (() => {
  let ok = (s, r) => r.want.every((w, i) => s.put[i] != null && r.tray[s.put[i]] === w);
  const answer = r => { const used = new Set(); return { put: r.want.map(w => { const i = r.tray.findIndex((t, k) => t === w && !used.has(k)); used.add(i); return i; }) }; };
  const lay = G => { const n = G.r.slots.length, w = Math.min(58, (G.W - 30) / n - 6); G.boxes = G.r.slots.map((_, i) => ({ i, x: G.W / 2 - (n * (w + 6) - 6) / 2 + i * (w + 6), y: 140, w, h: 48 })); };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ put: r.slots.map(() => null) }),
    ok,
    answered: s => s.put.some(v => v != null),
    solution: r => `${r.want.join(' · ')} = ${r.want.reduce((a, b) => a * b, 1)}`,
    prompt: r => `${r.ask || '¿Cuántos códigos hay?'} ${r.rule}`,
    foot: () => 'Arrastra a cada casilla cuántas opciones tiene',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r);
      G.boxes.forEach(b => { TK.label(p, C, r.slots[b.i], b.x + b.w / 2, b.y - 10, C.mute, 9, b.w + 6); const v = s.put[b.i]; if (v != null && G.drag?.from !== b.i) RK.chip(p, C, b, String(r.tray[v]), { on: true, col: good ? C.ok : C.sky, size: 15 }); else { p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 3]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); } });
      const free = r.tray.map((_, i) => i).filter(i => !s.put.includes(i) && G.drag?.i !== i), w = Math.min(50, (G.W - 20) / Math.max(1, r.tray.length) - 6);
      G.tbox = free.map((i, j) => ({ i, x: G.W / 2 - (free.length * (w + 6) - 6) / 2 + j * (w + 6), y: G.H - 112, w, h: 34 }));
      G.tbox.forEach(b => RK.chip(p, C, b, String(r.tray[b.i]), { size: 13, col: C.mint }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - w / 2, y: G.drag.y - 17, w, h: 34 }, String(r.tray[G.drag.i]), { on: true, col: C.brand, size: 13 });
      const vals = s.put.map(v => (v == null ? '\\square' : r.tray[v])), tot = s.put.every(v => v != null) ? s.put.reduce((a, v) => a * r.tray[v], 1) : null;
      RK.strip(p, C, G.fb, `$${vals.join(' \\cdot ')}${tot != null ? ` = ${tot}` : ''}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) {
      const t = (G.tbox || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { i: t.i, from: -1, x, y }; return true; }
      const b = G.boxes.find(b => hitBox(b, x, y)); if (b && G.s.put[b.i] != null) { G.drag = { i: G.s.put[b.i], from: b.i, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      const d = G.drag; G.drag = null; if (!d) return; const P = G.s.put, b = G.boxes.find(b => hitBox({ x: b.x - 4, y: b.y - 8, w: b.w + 8, h: b.h + 16 }, x, y));
      if (d.from >= 0) P[d.from] = null;
      if (b) { const prev = P[b.i]; P[b.i] = d.i; if (prev != null && d.from >= 0) P[d.from] = prev; }
      G.touch();
    },
    demo(G) { const t = G.tbox?.[0], b = G.boxes.find(b => G.r.want[b.i] !== G.r.tray[t?.i]) || G.boxes[0]; return t ? { from: { x: t.x + t.w / 2, y: t.y + 17 }, to: { x: b.x + b.w / 2, y: b.y + 24 }, text: 'Arrastra a una casilla', ty: t.y - 12 } : null; },
    peek: G => ({ boxes: G.boxes, tray: G.tbox }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/anagramas.js
// Anagramas con letras repetidas (Preuniversitario, pu-co-2; spec 2026-11-18-preuda-razonamiento-completo): ordenar n letras
// distintas da n! maneras; si una letra se repite k veces, intercambiar sus copias no cambia la palabra, así que se divide
// entre k!. Arriba está n!; se arrastran al denominador las fichas k! de cada letra repetida y el juego hace la cuenta.
// params = { rounds: [{ word }] }   state = { rounds: [{ den: [k, k, …] }] }   (fichas 2!, 3!, 4!)
GAMES['anagramas'] = (() => {
  const reps = r => { const m = {}; [...r.word].forEach(c => { m[c] = (m[c] || 0) + 1; }); return Object.values(m).filter(k => k > 1).sort((a, b) => a - b); };
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  let ok = (s, r) => [...s.den].sort((a, b) => a - b).join() === reps(r).join();
  const TRAY = [2, 2, 3, 3, 4];
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ den: [] }),
    ok,
    answered: s => s.den.length > 0,
    solution: r => `${r.word.length}! / ${reps(r).map(k => `${k}!`).join('·')} = ${fact(r.word.length) / reps(r).reduce((a, k) => a * fact(k), 1)}`,
    prompt: r => `¿De cuántas maneras se ordenan las letras de ${r.word}?`,
    foot: () => 'Arrastra al denominador un k! por cada letra que se repite k veces',
    layout(G) { G.den = { x: G.W / 2 - 110, y: 196, w: 220, h: 44 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { den: reps(r) } : G.s, good = ok(s, r), n = r.word.length, w = Math.min(30, (G.W - 40) / n);
      [...r.word].forEach((c, i) => { const same = [...r.word].filter(x => x === c).length > 1; RK.chip(p, C, { x: G.W / 2 - n * w / 2 + i * w, y: 104, w: w - 2, h: 32 }, c, { on: true, col: same ? C.coral : C.sky, size: 14 }); });
      TK.label(p, C, `$${n}! = ${fact(n)}$`, G.W / 2, 166, C.ink, 16, 160);
      p.stroke(C.ink); p.strokeWeight(2); p.line(G.W / 2 - 110, 186, G.W / 2 + 110, 186);
      p.noFill(); p.stroke(C.line); p.drawingContext.setLineDash([4, 3]); p.rect(G.den.x, G.den.y, G.den.w, G.den.h, 10); p.drawingContext.setLineDash([]);
      G.inDen = s.den.map((k, i) => ({ k, i, x: G.den.x + 8 + i * 50, y: G.den.y + 6, w: 44, h: 32 }));
      G.inDen.forEach(b => RK.chip(p, C, b, `$${b.k}!$`, { on: true, col: good ? C.ok : C.mint, size: 14 }));
      G.tray = TRAY.map((k, i) => ({ k, x: G.W / 2 - (TRAY.length * 50 - 6) / 2 + i * 50, y: G.H - 112, w: 44, h: 32 }));
      G.tray.forEach(b => RK.chip(p, C, b, `$${b.k}!$`, { size: 13 }));
      if (G.drag) RK.chip(p, C, { x: G.drag.x - 22, y: G.drag.y - 16, w: 44, h: 32 }, `$${G.drag.k}!$`, { on: true, col: C.brand, size: 13 });
      const d = s.den.reduce((a, k) => a * fact(k), 1), v = fact(n) / d;
      RK.strip(p, C, G.fb, `$\\dfrac{${n}!}{${s.den.length ? s.den.map(k => `${k}!`).join(' \\cdot ') : '1'}} = ${Number.isInteger(v) ? v : RK.num(Math.round(v * 100) / 100)}$`, { col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) {
      const t = (G.tray || []).find(b => hitBox(b, x, y)); if (t) { G.drag = { k: t.k, from: -1, x, y }; return true; }
      const b = (G.inDen || []).find(b => hitBox(b, x, y)); if (b) { G.s.den.splice(b.i, 1); G.drag = { k: b.k, from: b.i, x, y }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) { const d = G.drag; G.drag = null; if (!d) return; if (hitBox({ x: G.den.x - 10, y: G.den.y - 14, w: G.den.w + 20, h: G.den.h + 28 }, x, y) && G.s.den.length < 4) G.s.den.push(d.k); G.touch(); },
    demo: G => ({ from: { x: G.tray[4].x + 22, y: G.tray[4].y + 16 }, to: { x: G.den.x + 30, y: G.den.y + 22 }, text: 'Arrastra al denominador', ty: G.tray[0].y - 12 }),
    peek: G => ({ den: G.den, tray: G.tray }),
  });
  return Object.assign(game, { answer: r => ({ den: reps(r) }), reps });
})();
;
//#archivo js/games/torres-vistas.js
// Vistas de una construcción (Preuniversitario, pu-es-2; spec 2026-11-18-preuda-razonamiento-completo): la vista de frente
// muestra la torre más alta de cada columna y la de lado, la más alta de cada fila. Con esas dos vistas, ¿cuál es la
// construcción con más cubos? Cada casilla puede tener a lo sumo el menor de los dos límites. Se arrastra cada casilla de la
// vista desde arriba hacia arriba o abajo para fijar su altura; las vistas se dibujan en vivo.
// params = { rounds: [{ front: [máximo por columna], side: [máximo por fila] }] }   state = { rounds: [{ h: [[alturas]] }] }
GAMES['torres-vistas'] = (() => {
  const want = r => r.side.map(sv => r.front.map(fv => Math.min(sv, fv)));
  const views = h => ({ front: h[0].map((_, i) => Math.max(...h.map(row => row[i]))), side: h.map(row => Math.max(...row)) });
  let ok = (s, r) => s.h.flat().join() === want(r).flat().join();
  const lay = G => { const r = G.r, c = Math.min(46, (G.W - 120) / r.front.length); G.c = c; G.o = { x: 40, y: 150 }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ h: r.side.map(() => r.front.map(() => 0)) }),
    ok,
    answered: s => s.h.flat().some(v => v > 0),
    solution: r => `${want(r).flat().reduce((a, b) => a + b, 0)} cubos: ${want(r).map(row => row.join(' ')).join(' / ')}`,
    prompt: () => 'Arma la construcción con más cubos que tenga estas dos vistas',
    foot: () => 'Arrastra cada casilla hacia arriba o abajo para cambiar su altura',
    layout(G) { lay(G); G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = null; lay(G); },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { h: want(r) } : G.s, c = G.c, o = G.o, v = views(s.h), good = G.locked && ok(s, r);
      TK.label(p, C, 'desde arriba', o.x + r.front.length * c / 2, o.y - 34, C.mute, 10, 120);
      s.h.forEach((row, j) => row.forEach((hv, i) => { p.stroke(C.ink); p.strokeWeight(1.2); p.fill(RK.al(p, good ? C.ok : C.sky, 40 + hv * 50)); p.rect(o.x + i * c, o.y + j * c, c, c); TK.label(p, C, String(hv), o.x + i * c + c / 2, o.y + j * c + c / 2, C.ink, 13, c); }));
      r.front.forEach((fv, i) => { const vv = v.front[i]; TK.label(p, C, `${fv}`, o.x + i * c + c / 2, o.y - 14, VELO.on ? C.ink : vv === fv ? C.ok : C.coral, 11, c); });
      TK.label(p, C, 'frente ↑', o.x - 22, o.y - 14, C.mute, 8, 40);
      r.side.forEach((sv, j) => { const vv = v.side[j]; TK.label(p, C, `${sv}`, o.x + r.front.length * c + 14, o.y + j * c + c / 2, VELO.on ? C.ink : vv === sv ? C.ok : C.coral, 11, 24); });
      TK.label(p, C, 'lado →', o.x + r.front.length * c + 40, o.y - 14, C.mute, 8, 50);
      const tot = s.h.flat().reduce((a, b) => a + b, 0);
      RK.strip(p, C, G.fb, `$\\text{${tot} cubos}$`, { kicker: 'Los números de afuera son las vistas pedidas', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const i = Math.floor((x - G.o.x) / G.c), j = Math.floor((y - G.o.y) / G.c); if (i < 0 || j < 0 || i >= G.r.front.length || j >= G.r.side.length) return false; G.grab = { i, j, y0: y, h0: G.s.h[j][i] }; return true; },
    drag(G, x, y) { const g = G.grab; if (!g) return false; const v = Math.max(0, Math.min(4, g.h0 + Math.round((g.y0 - y) / 24))); if (v !== G.s.h[g.j][g.i] || !G.touched[G.cur]) { G.s.h[g.j][g.i] = v; G.touch(); } return true; },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.o.x + G.c / 2, y: G.o.y + G.c / 2 }, to: { x: G.o.x + G.c / 2, y: G.o.y + G.c / 2 - 48 }, text: 'Arrastra hacia arriba', ty: G.o.y + G.r.side.length * G.c + 24 }),
    peek: G => ({ o: G.o, c: G.c }),
  });
  return Object.assign(game, { answer: r => ({ h: want(r) }) });
})();
;
//#archivo js/games/cubos-ocultos.js
// Los cubos que no se ven (Preuniversitario, pu-es-2; spec 2026-11-18-preuda-razonamiento-completo): en una construcción de
// cubos, los que sostienen a los de arriba también cuentan aunque no se vean. Se ve la construcción en perspectiva y su
// vista desde arriba con las alturas tapadas; se arrastra el total de cubos.
// params = { rounds: [{ h: [[alturas por fila]] }] }   state = { rounds: [{ n }] }   (de 1 a 40)
GAMES['cubos-ocultos'] = (() => {
  const total = r => r.h.flat().reduce((a, b) => a + b, 0);
  let ok = (s, r) => s.n === total(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ n: 1 }),
    ok,
    solution: r => `${total(r)} cubos`,
    prompt: () => '¿Cuántos cubos tiene la construcción, contando los escondidos?',
    foot: () => 'Arrastra el total de cubos',
    layout(G) { G.tY = G.H - 108; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { n: total(r) } : G.s, rows = r.h.length, cols = r.h[0].length, c = Math.min(26, (G.W - 80) / (cols + rows * 0.6)), dx = c * 0.6, dy = c * 0.5, ox = 40, oy = G.tY - 70;
      // Se dibuja de atrás (fila 0) hacia adelante y de abajo hacia arriba, para que lo de adelante tape lo de atrás.
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) for (let k = 0; k < r.h[j][i]; k++) {
        const x = ox + i * c + (rows - 1 - j) * dx, y = oy - k * c - (rows - 1 - j) * dy;
        p.stroke(C.bg); p.strokeWeight(1); p.fill(RK.al(p, C.sky, 230)); p.rect(x, y, c, c);
        p.fill(RK.al(p, C.sky, 170)); p.quad(x, y, x + c, y, x + c + dx, y - dy, x + dx, y - dy);
        p.fill(RK.al(p, C.sky, 120)); p.quad(x + c, y, x + c + dx, y - dy, x + c + dx, y - dy + c, x + c, y + c);
      }
      const good = G.locked && ok(s, r);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 40, s.n - 1, i => ((i + 1) % 5 === 0 ? String(i + 1) : null));
      RK.strip(p, C, G.fb, `$\\text{${s.n} cubos}$`, { kicker: good ? 'Contaste también los de abajo' : 'Cuenta columna por columna', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 30) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(0), y: G.tY }, to: { x: G.X(4), y: G.tY }, text: 'Arrastra el total', ty: G.tY - 28 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const v = RK.pick(x, 30, G.W - 30, 40) + 1; if (v !== G.s.n || !G.touched[G.cur]) { G.s.n = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ n: total(r) }) });
})();
;
//#archivo js/games/codigo-kit.js
// Kit de los códigos (Preuniversitario, mundo «Codificación»; spec 2026-11-18-preuda-razonamiento-completo): una fila de
// casillas que se llena arrastrando fichas de una bandeja (las fichas no se gastan: se pueden usar varias veces). Cada juego da
// lo que se ve arriba (la clave, los ejemplos) y qué ficha va en cada casilla.
// o = { aspect, prompt(r), foot, tray(r) → [rótulos], need(r) → [índice de ficha por casilla], over(r, i) → rótulo sobre la
//       casilla i, decor(G), done(r) → texto al acertar, col(C), alt(r) → [[otras respuestas igual de válidas]] (p. ej. ¬q ∨ ¬p) }
const CODK = (() => {
  function fillGame(o) {
    const ok = velo((s, r) => [o.need(r), ...(o.alt ? o.alt(r) || [] : [])].some(nd => nd.every((k, i) => s.f[i] === k)));
    const answer = r => ({ f: o.need(r).slice() });
    const game = roundsGame({
      aspect: o.aspect || 1.25,
      init: r => ({ f: o.need(r).map(() => -1) }),
      answered: s => s.f.some(k => k >= 0),
      ok,
      solution: r => o.need(r).map(k => o.tray(r)[k]).join(' '),
      prompt: o.prompt,
      foot: () => o.foot || 'Arrastra fichas de la bandeja a las casillas',
      layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
      enter(G) { G.drag = null; },
      draw(G) {
        const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), n = o.need(r).length, T = o.tray(r);
        o.decor?.({ ...G, s });
        const sw = Math.min(o.chipW || 46, (G.W - 32) / n - 6), sy = G.slotY || 232, x0 = (G.W - n * (sw + 6) + 6) / 2;
        G.slots = Array.from({ length: n }, (_, i) => ({ x: x0 + i * (sw + 6), y: sy, w: sw, h: 40 }));
        G.slots.forEach((b, i) => {
          if (o.over) TK.label(p, C, o.over(r, i), b.x + b.w / 2, b.y - 12, C.ink, 13, b.w + 4);
          const k = s.f[i];
          if (k >= 0) RK.chip(p, C, b, T[k], { on: true, col: good ? C.ok : (o.col?.(C) || C.sky), size: 14 });
          else { p.noFill(); p.stroke(C.line); p.strokeWeight(1.2); p.drawingContext.setLineDash([4, 3]); p.rect(b.x, b.y, b.w, b.h, 8); p.drawingContext.setLineDash([]); }
        });
        const per = Math.min(T.length, o.perRow || 7), tw = Math.min(o.chipW || 44, (G.W - 24) / per - 6), rows = Math.ceil(T.length / per), ty0 = G.H - 80 - rows * 46;
        G.tray = T.map((t, i) => { const row = Math.floor(i / per), inRow = Math.min(per, T.length - row * per), tx0 = (G.W - inRow * (tw + 6) + 6) / 2; return { x: tx0 + (i % per) * (tw + 6), y: ty0 + row * 46, w: tw, h: 38, k: i }; });
        G.tray.forEach(b => RK.chip(p, C, b, T[b.k], { on: false, size: 14 }));
        if (G.drag) RK.chip(p, C, { x: G.drag.x - tw / 2, y: G.drag.y - 19, w: tw, h: 38 }, T[G.drag.k], { on: true, col: C.brand, size: 14 });
        RK.strip(p, C, G.fb, good ? ((d => (d.includes('$') ? d : `$\\text{${d}}$`))(o.done ? o.done(r) : 'código correcto')) : VELO.on ? '$\\text{una ficha en cada casilla}$' : '$\\text{completa todas las casillas}$', { col: G.locked || good ? C.ok : C.brand, size: 15 });
      },
      press(G, x, y) {
        const t = (G.tray || []).find(b => hitBox(b, x, y));
        if (t) { G.drag = { k: t.k, x, y }; return true; }
        const i = (G.slots || []).findIndex(b => hitBox(b, x, y));
        if (i >= 0 && G.s.f[i] >= 0) { G.drag = { k: G.s.f[i], x, y }; G.s.f[i] = -1; G.touch(); return true; }
        return false;
      },
      drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
      release(G, x, y) { if (!G.drag) return; const i = (G.slots || []).findIndex(b => hitBox({ x: b.x - 6, y: b.y - 10, w: b.w + 12, h: b.h + 20 }, x, y)); if (i >= 0) { G.s.f[i] = G.drag.k; G.touch(); } G.drag = null; },
      // La mano arrastra una ficha que NO es la de la respuesta (así la demostración no regala nada).
      demo(G) { const need = o.need(G.r), n = (G.tray || []).length, k = [...Array(n).keys()].find(i => !need.includes(i)) ?? (need[0] + 1) % Math.max(n, 1), t = G.tray?.[k], sl = G.slots?.[0]; if (!t || !sl) return null; return { from: { x: t.x + t.w / 2, y: t.y + 19 }, to: { x: sl.x + sl.w / 2, y: sl.y + 20 }, text: 'Arrastra una ficha', ty: Math.min(sl.y + 58, (sl.y + 40 + Math.min(...G.tray.map(b => b.y))) / 2) }; },
      peek: G => ({ slots: G.slots, tray: G.tray }),
    });
    return Object.assign(game, { answer });
  }
  return { fillGame };
})();
;
//#archivo js/games/grafica-kit.js
// Kit de las gráficas (Preuniversitario, mundo «Tablas y gráficas»; spec 2026-11-18-preuda-razonamiento-completo): ejes con
// rayas de escala y barras, para los juegos de leer, armar y comparar datos.
// GRAF.axes(p, C, b, lo, hi, step) → Y(v)   dibuja la escala de lo a hi con una raya cada step
// GRAF.bars(p, C, b, vals, labs, Y, o) → columnas [{ x, w, cx }]   o = { col(i), lo (piso), hl: [índices resaltados] }
// GRAF.colAt(cols, x) → índice de la columna bajo x (o −1)
const GRAF = (() => {
  function axes(p, C, b, lo, hi, step) {
    const Y = v => b.y + b.h - (v - lo) / (hi - lo) * b.h;
    for (let v = lo; v <= hi + 1e-9; v += step) {
      const y = Y(v);
      p.stroke(RK.al(p, C.line, v === lo ? 220 : 90)); p.strokeWeight(1); p.line(b.x, y, b.x + b.w, y);
      TK.label(p, C, String(Math.round(v * 100) / 100), b.x - 14, y, C.mute, 9, 26);
    }
    p.stroke(C.line); p.line(b.x, b.y, b.x, b.y + b.h);
    return Y;
  }
  function bars(p, C, b, vals, labs, Y, o = {}) {
    const n = vals.length, w = b.w / n, lo = o.lo ?? 0;
    return vals.map((v, i) => {
      const x = b.x + i * w + w * 0.18, bw = w * 0.64, top = Y(Math.max(v, lo)), hl = o.hl?.includes(i);
      p.noStroke(); p.fill(o.col ? o.col(i) : hl ? C.brand : C.sky); p.rect(x, top, bw, Y(lo) - top, 3, 3, 0, 0);
      if (labs) TK.label(p, C, labs[i], x + bw / 2, b.y + b.h + 13, hl ? C.brand : C.ink, 10, w);
      return { x, w: bw, cx: x + bw / 2, top };
    });
  }
  const colAt = (cols, x) => cols.findIndex(c => x >= c.x - 8 && x <= c.x + c.w + 8);
  return { axes, bars, colAt };
})();
;
//#archivo js/games/lee-barras.js
// Leer una gráfica de barras (Preuniversitario, pu-gr-1 y pu-gr-3; spec 2026-11-18-preuda-razonamiento-completo): la escala
// manda. Se ve una gráfica de barras (a veces con el eje que no empieza en cero) y una pregunta (el valor de una barra, la
// diferencia entre dos o el total). Se desliza el marcador de abajo hasta la respuesta; las barras de la pregunta se resaltan.
// params = { rounds: [{ bars: [[rótulo, valor]], lo, hi, step, q: 'val' | 'diff' | 'sum', a, b?, max, tstep }] }
// state = { rounds: [{ i }] }   (respuesta = i · tstep)
GAMES['lee-barras'] = (() => {
  const ans = r => { const v = r.bars.map(b => b[1]); return r.q === 'sum' ? v.reduce((a, c) => a + c, 0) : r.q === 'diff' ? Math.abs(v[r.a] - v[r.b]) : v[r.a]; };
  const n = r => Math.round(r.max / r.tstep) + 1;
  let ok = (s, r) => s.i * r.tstep === ans(r);
  const ask = r => (r.q === 'sum' ? '¿Cuánto suman todas las barras?' : r.q === 'diff' ? `¿Cuánto más tiene ${r.bars[r.a][0]} que ${r.bars[r.b][0]}?` : `¿Cuánto tiene ${r.bars[r.a][0]}?`);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ i: ans(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => `${ans(r)}`,
    prompt: ask,
    foot: () => 'Desliza el marcador hasta la respuesta',
    layout(G) { G.b = { x: 44, y: 96, w: G.W - 60, h: G.H - 266 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { i: ans(r) / r.tstep } : G.s, good = ok(s, r), lo = r.lo ?? 0;
      const Y = GRAF.axes(p, C, G.b, lo, r.hi, r.step);
      const hl = r.q === 'sum' ? r.bars.map((_, i) => i) : r.q === 'diff' ? [r.a, r.b] : [r.a];
      GRAF.bars(p, C, G.b, r.bars.map(b => b[1]), r.bars.map(b => b[0]), Y, { lo, hl });
      if (lo > 0) TK.label(p, C, `el eje empieza en ${lo}`, G.b.x + G.b.w / 2, G.b.y + G.b.h + 30, C.coral, 9, G.b.w);
      const N = n(r);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N, s.i, k => (k % Math.ceil(N / 6) === 0 ? String(k * r.tstep) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$${s.i * r.tstep}$`, { kicker: good ? 'lectura correcta' : 'tu respuesta', col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.i), y: G.tY }, to: { x: G.X(G.s.i) + 60, y: G.tY }, text: 'Desliza el marcador', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const i = RK.pick(x, 30, G.W - 30, n(G.r)); if (i !== G.s.i || !G.touched[G.cur]) { G.s.i = i; G.touch(); } };
  return Object.assign(game, { answer: r => ({ i: ans(r) / r.tstep }) });
})();
;
//#archivo js/games/mayor-subida.js
// El tramo que más sube (Preuniversitario, pu-gr-1; spec 2026-11-18-preuda-razonamiento-completo): una gráfica de línea en el
// tiempo. Se arrastra la franja de lupa sobre un tramo (de un punto al siguiente) y el juego dice cuánto cambió ahí, en
// unidades y en porcentaje. Hay que dejarla en el tramo que pide la pregunta: el de mayor subida, mayor bajada o mayor
// aumento porcentual (que no siempre es el mismo que el de mayor subida).
// params = { rounds: [{ pts: [[rótulo, valor]], hi, step, q: 'up' | 'down' | 'pct' }] }   state = { rounds: [{ k }] }   (tramo k: de k a k+1)
GAMES['mayor-subida'] = (() => {
  const d = (r, k) => r.pts[k + 1][1] - r.pts[k][1];
  const pct = (r, k) => d(r, k) / r.pts[k][1] * 100;
  const score = (r, k) => (r.q === 'down' ? -d(r, k) : r.q === 'pct' ? pct(r, k) : d(r, k));
  const best = r => { let b = 0; for (let k = 1; k < r.pts.length - 1; k++) if (score(r, k) > score(r, b)) b = k; return b; };
  let ok = (s, r) => s.k === best(r);
  const fmt = v => (Math.round(v * 10) / 10).toString();
  const ask = { up: '¿En qué tramo subió más?', down: '¿En qué tramo bajó más?', pct: '¿En qué tramo creció más en porcentaje?' };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ k: best(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => { const k = best(r); return `de ${r.pts[k][0]} a ${r.pts[k + 1][0]}`; },
    prompt: r => ask[r.q],
    foot: () => 'Arrastra la lupa de un tramo a otro',
    layout(G) { G.b = { x: 44, y: 96, w: G.W - 64, h: G.H - 230 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: best(r) } : G.s, good = ok(s, r), n = r.pts.length, b = G.b;
      const Y = GRAF.axes(p, C, b, 0, r.hi, r.step), X = i => b.x + (i + 0.5) * b.w / n; G.Xp = X;
      p.noStroke(); p.fill(RK.al(p, good ? C.ok : C.brand, 45)); p.quad(X(s.k), b.y, X(s.k + 1), b.y, X(s.k + 1), b.y + b.h, X(s.k), b.y + b.h);
      p.noFill(); p.stroke(C.sky); p.strokeWeight(2.4); p.beginShape(); r.pts.forEach((pt, i) => p.vertex(X(i), Y(pt[1]))); p.endShape();
      r.pts.forEach((pt, i) => { p.noStroke(); p.fill(i === s.k || i === s.k + 1 ? (good ? C.ok : C.brand) : C.sky); p.circle(X(i), Y(pt[1]), 9); TK.label(p, C, String(pt[1]), X(i), Y(pt[1]) - 12, C.ink, 10, 40); TK.label(p, C, pt[0], X(i), b.y + b.h + 13, C.mute, 9, b.w / n); });
      const dv = d(r, s.k);
      RK.strip(p, C, G.fb, `$${dv >= 0 ? '+' : ''}${dv}\\ \\ (${dv >= 0 ? '+' : ''}${fmt(pct(r, s.k))}\\%)$`, { kicker: `de ${r.pts[s.k][0]} a ${r.pts[s.k + 1][0]}`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (y < G.b.y - 10 || y > G.b.y + G.b.h + 20) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.Xp(G.s.k + 0.5), y: G.b.y + G.b.h / 2 }, to: { x: G.Xp(G.s.k + 2.5), y: G.b.y + G.b.h / 2 }, text: 'Arrastra la lupa', ty: G.b.y + 12 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, x) => { const n = G.r.pts.length, k = Math.max(0, Math.min(n - 2, Math.floor((x - G.b.x) / (G.b.w / n) - 0.5))); if (k !== G.s.k || !G.touched[G.cur]) { G.s.k = k; G.touch(); } };
  return Object.assign(game, { answer: r => ({ k: best(r) }) });
})();
;
//#archivo js/games/nivela-datos.js
// Nivelar los datos (Preuniversitario, pu-gr-2; spec 2026-11-18-preuda-razonamiento-completo): el promedio es la altura que
// tendrían todas las barras si se repartiera parejo. Se arrastra la línea de nivel: lo que sobresale por encima se pinta de un
// color y lo que falta por debajo de otro, con su cuenta. Cuando sobra lo mismo que falta, la línea está en el promedio.
// params = { rounds: [{ data: [números], labs?, hi, step }] }   state = { rounds: [{ h }] }   (de medio en medio)
GAMES['nivela-datos'] = (() => {
  const mean = r => r.data.reduce((a, b) => a + b, 0) / r.data.length;
  let ok = (s, r) => s.h === mean(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ h: mean(r) === 0.5 ? 1 : 0.5 }),
    ok,
    solution: r => `${r.data.join(' + ')} = ${r.data.reduce((a, b) => a + b, 0)}; ÷ ${r.data.length} = ${mean(r)}`,
    prompt: () => 'Lleva la línea al promedio: que sobre lo mismo que falta',
    foot: () => 'Arrastra la línea de nivel',
    layout(G) { G.b = { x: 44, y: 96, w: G.W - 92, h: G.H - 224 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { h: mean(r) } : G.s, good = ok(s, r);
      const Y = GRAF.axes(p, C, G.b, 0, r.hi, r.step); G.Y = Y;
      const cols = GRAF.bars(p, C, G.b, r.data, r.labs || r.data.map(String), Y, { col: () => RK.al(p, C.sky, 160) });
      let over = 0, under = 0;
      cols.forEach((c, i) => {
        const v = r.data[i];
        if (v > s.h) { over += v - s.h; p.noStroke(); p.fill(RK.al(p, C.coral, 200)); p.rect(c.x, Y(v), c.w, Y(s.h) - Y(v)); }
        else if (v < s.h) { under += s.h - v; p.noStroke(); p.fill(RK.al(p, C.mint, 120)); p.rect(c.x, Y(s.h), c.w, Y(v) - Y(s.h)); }
      });
      const y = Y(s.h); p.stroke(good ? C.ok : C.brand); p.strokeWeight(2.5); p.line(G.b.x, y, G.b.x + G.b.w, y); RK.knob(p, C, G.b.x + G.b.w + 14, y, C.brand);
      TK.label(p, C, String(s.h), G.b.x + G.b.w + 14, y - 14, C.brand, 11, 30);
      RK.strip(p, C, G.fb, `$\\text{sobra}\\ ${over}\\ \\cdot\\ \\text{falta}\\ ${under}$`, { kicker: good ? `promedio ${s.h}` : over > under ? 'sobra más: sube la línea' : 'falta más: baja la línea', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.abs(y - G.Y(G.s.h)) > 26 || x < G.b.x - 10) return false; G.grab = true; game.move(G, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, y); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.b.x + G.b.w + 14, y: G.Y(G.s.h) }, to: { x: G.b.x + G.b.w + 14, y: G.Y(G.s.h) - 60 }, text: 'Sube la línea', ty: G.b.y + 10 }),
    peek: G => ({ b: G.b }),
  });
  game.move = (G, y) => { const r = G.r, b = G.b, v = Math.max(0, Math.min(r.hi, Math.round((b.y + b.h - y) / b.h * r.hi * 2) / 2)); if (v !== G.s.h || !G.touched[G.cur]) { G.s.h = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ h: mean(r) }) });
})();
;
//#archivo js/games/tres-centros.js
// Media, mediana y moda en una gráfica de puntos (Preuniversitario, pu-gr-2; spec 2026-11-18-preuda-razonamiento-completo):
// cada dato es un punto apilado sobre su valor. Debajo de la recta hay tres alfileres (media, mediana, moda) que se arrastran a
// su lugar (de medio en medio). Con datos cargados a un lado, los tres no coinciden.
// params = { rounds: [{ data: [enteros], lo, hi }] }   state = { rounds: [{ m: [media, mediana, moda] }] }
GAMES['tres-centros'] = (() => {
  const NAMES = ['media', 'mediana', 'moda'];
  const vals = r => {
    const s = r.data.slice().sort((a, b) => a - b), n = s.length, mean = s.reduce((a, b) => a + b, 0) / n;
    const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    const cnt = {}; s.forEach(v => (cnt[v] = (cnt[v] || 0) + 1)); const mode = +Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
    return [mean, med, mode];
  };
  let ok = (s, r) => vals(r).every((v, i) => s.m[i] === v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.4,
    init: r => ({ m: [r.lo, r.lo, r.lo] }),
    ok,
    solution: r => vals(r).map((v, i) => `${NAMES[i]} ${v}`).join(', '),
    prompt: () => 'Pon la media, la mediana y la moda en su lugar',
    foot: () => 'Arrastra cada alfiler sobre la recta',
    layout(G) { G.ax = { x0: 30, x1: G.W - 30, y: 200 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { m: vals(r) } : G.s, good = ok(s, r), ax = G.ax, X = v => ax.x0 + (v - r.lo) / (r.hi - r.lo) * (ax.x1 - ax.x0), want = vals(r);
      G.X = X;
      p.stroke(C.ink); p.strokeWeight(1.4); p.line(ax.x0, ax.y, ax.x1, ax.y);
      const cnt = {};
      for (let v = r.lo; v <= r.hi; v++) { p.stroke(C.line); p.line(X(v), ax.y - 3, X(v), ax.y + 3); TK.label(p, C, String(v), X(v), ax.y + 13, C.mute, 9, 20); }
      r.data.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; p.noStroke(); p.fill(C.sky); p.circle(X(v), ax.y - 10 - (cnt[v] - 1) * 14, 11); });
      const cols = [C.brand, C.coral, C.mint];
      G.pins = s.m.map((v, i) => {
        const x = X(v), y = ax.y + 40 + i * 28, right = v === want[i];
        p.stroke(cols[i]); p.strokeWeight(1.5); p.line(x, ax.y + 4, x, y - 9);
        p.noStroke(); p.fill(right && good ? C.ok : cols[i]); p.circle(x, y, 16);
        TK.label(p, C, `${NAMES[i]} ${v}`, Math.min(Math.max(x, 60), G.W - 60), y + 15, C.ink, 9, 100);
        return { x, y };
      });
      RK.strip(p, C, G.fb, good ? '$\\text{los tres centros, en su lugar}$' : `$\\text{${s.m.join(' · ')}}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const i = (G.pins || []).findIndex(q => Math.hypot(x - q.x, y - q.y) < 18); if (i < 0) return false; G.grab = i; return true; },
    drag(G, x) { if (G.grab < 0) return false; const r = G.r, ax = G.ax, v = Math.max(r.lo, Math.min(r.hi, Math.round((r.lo + (x - ax.x0) / (ax.x1 - ax.x0) * (r.hi - r.lo)) * 2) / 2)); if (v !== G.s.m[G.grab]) { G.s.m[G.grab] = v; G.touch(); } return true; },
    release(G) { G.grab = -1; },
    demo: G => (G.pins ? { from: G.pins[0], to: { x: G.pins[0].x + 80, y: G.pins[0].y }, text: 'Arrastra el alfiler', ty: 100 } : null),
    peek: G => ({ pins: G.pins, ax: G.ax }),
  });
  return Object.assign(game, { answer: r => ({ m: vals(r) }) });
})();
;
//#archivo js/games/dato-faltante.js
// El dato que falta (Preuniversitario, pu-gr-2; spec 2026-11-18-preuda-razonamiento-completo): se conoce el promedio de todos
// los datos pero falta uno. La línea del promedio pedido está marcada; se arrastra la barra que falta y el juego muestra en
// vivo el promedio que da con ese valor. Para que el promedio sea el pedido, la suma tiene que ser promedio × cantidad.
// params = { rounds: [{ data: [números con null en el que falta], mean, hi, step }] }   state = { rounds: [{ v }] }
GAMES['dato-faltante'] = (() => {
  const need = r => r.mean * r.data.length - r.data.reduce((a, b) => a + (b ?? 0), 0);
  let ok = (s, r) => s.v === need(r);
  const cur = (r, v) => r.data.map(d => d ?? v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ v: need(r) === r.step ? 2 * r.step : r.step }),
    ok,
    solution: r => `${r.mean} · ${r.data.length} = ${r.mean * r.data.length}; falta ${need(r)}`,
    prompt: r => `El promedio de los ${r.data.length} datos es ${r.mean}. ¿Cuál falta?`,
    foot: () => 'Arrastra la barra que falta',
    layout(G) { G.b = { x: 44, y: 96, w: G.W - 60, h: G.H - 224 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: need(r) } : G.s, good = ok(s, r), D = cur(r, s.v), k = r.data.indexOf(null);
      const Y = GRAF.axes(p, C, G.b, 0, r.hi, r.step); G.Y = Y;
      G.cols = GRAF.bars(p, C, G.b, D, D.map(String), Y, { col: i => (i === k ? (good ? C.ok : C.brand) : C.sky) });
      const y = Y(r.mean); p.stroke(C.coral); p.strokeWeight(1.5); p.drawingContext.setLineDash([6, 4]); p.line(G.b.x, y, G.b.x + G.b.w, y); p.drawingContext.setLineDash([]);
      TK.label(p, C, `promedio ${r.mean}`, G.b.x + 46, y - 10, C.coral, 9, 90);
      const c = G.cols[k]; RK.knob(p, C, c.cx, c.top, C.brand);
      const sum = D.reduce((a, b) => a + b, 0), m = Math.round(sum / D.length * 100) / 100;
      RK.strip(p, C, G.fb, `$${sum} \\div ${D.length} = ${m}$`, { kicker: good ? 'el promedio da justo' : 'el promedio con este dato', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { const k = G.r.data.indexOf(null), c = G.cols?.[k]; if (!c || x < c.x - 14 || x > c.x + c.w + 14 || y < G.b.y - 20 || y > G.b.y + G.b.h + 10) return false; G.grab = true; game.move(G, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, y); return true; },
    release(G) { G.grab = false; },
    demo: G => { const c = G.cols?.[G.r.data.indexOf(null)]; return c ? { from: { x: c.cx, y: c.top }, to: { x: c.cx, y: c.top - 60 }, text: 'Sube la barra', ty: G.b.y + 10 } : null; },
    peek: G => ({ b: G.b, cols: G.cols }),
  });
  game.move = (G, y) => { const r = G.r, b = G.b, v = Math.max(0, Math.min(r.hi, Math.round((b.y + b.h - y) / b.h * r.hi / r.step) * r.step)); if (v !== G.s.v || !G.touched[G.cur]) { G.s.v = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ v: need(r) }) });
})();
;
//#archivo js/games/eje-engano.js
// El eje que engaña (Preuniversitario, pu-gr-3; spec 2026-11-18-preuda-razonamiento-completo): dos barras con el eje cortado
// parecen muy distintas. A la izquierda hay una agarradera para bajar el piso del eje hasta 0 y ver la diferencia de verdad.
// Abajo se desliza cuánto por ciento más tiene la barra alta que la baja: eso no depende de dónde empiece el eje.
// params = { rounds: [{ a: [rótulo, valor], b: [rótulo, valor], floor }] }   state = { rounds: [{ p, fl }] }   (p de 0 a 100, de 5 en 5)
GAMES['eje-engano'] = (() => {
  const need = r => (r.a[1] - r.b[1]) / r.b[1] * 100;
  let ok = (s, r) => s.p === need(r);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: r => ({ p: need(r) === 50 ? 45 : 50, fl: r.floor }),
    ok,
    solution: r => `${r.a[0]} tiene ${need(r)} % más que ${r.b[0]}`,
    prompt: r => `¿Cuánto por ciento más tiene ${r.a[0]} que ${r.b[0]}?`,
    foot: () => 'Baja el piso del eje y desliza el porcentaje',
    layout(G) { G.b = { x: 60, y: 96, w: G.W - 80, h: G.H - 276 }; G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { p: need(r), fl: 0 } : G.s, good = ok(s, r), b = G.b, hi = r.a[1] * 1.08;
      const Y = v => b.y + b.h - (v - s.fl) / (hi - s.fl) * b.h;
      for (let k = 0; k <= 4; k++) { const v = s.fl + (hi - s.fl) * k / 4, y = Y(v); p.stroke(RK.al(p, C.line, 90)); p.strokeWeight(1); p.line(b.x, y, b.x + b.w, y); TK.label(p, C, String(Math.round(v)), b.x - 18, y, C.mute, 9, 30); }
      [r.a, r.b].forEach(([lab, v], i) => { const x = b.x + b.w * (0.15 + i * 0.45), w = b.w * 0.3; p.noStroke(); p.fill(i ? C.sky : C.coral); p.rect(x, Y(v), w, Y(s.fl) - Y(v), 3, 3, 0, 0); TK.label(p, C, `${lab}: ${v}`, x + w / 2, b.y + b.h + 14, C.ink, 10, w + 30); });
      G.hy = Y(s.fl); p.noStroke(); p.fill(C.brand); p.rect(b.x - 62, G.hy - 9, 24, 18, 5); TK.label(p, C, `piso ${s.fl}`, b.x - 50, G.hy - 18, C.brand, 8, 44); TK.label(p, C, '↓', b.x - 50, G.hy + 16, C.brand, 10, 20);
      const look = (r.a[1] - s.fl) / (r.b[1] - s.fl);
      TK.label(p, C, `a la vista: ${Math.round(look * 10) / 10} veces más alta`, b.x + b.w / 2, b.y - 6, s.fl > 0 ? C.coral : C.mute, 10, b.w);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, 21, s.p / 5, k => (k % 4 === 0 ? `${k * 5}%` : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$${r.b[1]} \\cdot ${(1 + s.p / 100).toFixed(2)} = ${Math.round(r.b[1] * (1 + s.p / 100) * 100) / 100}$`, { kicker: `${s.p} % más`, col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) {
      if (Math.abs(y - G.tY) < 28) { G.grab = 'p'; game.move(G, x); return true; }
      if (x < G.b.x && Math.abs(y - G.hy) < 22) { G.grab = 'fl'; G.y0 = y; G.f0 = G.s.fl; return true; }
      return false;
    },
    drag(G, x, y) {
      if (G.grab === 'p') { game.move(G, x); return true; }
      if (G.grab === 'fl') { const r = G.r, b = G.b, f = Math.max(0, Math.min(r.floor, Math.round(G.f0 - (y - G.y0) / 80 * r.floor))); if (f !== G.s.fl) { G.s.fl = f; G.touch(); } return true; }
      return false;
    },
    release(G) { G.grab = null; },
    demo: G => ({ from: { x: G.b.x - 50, y: G.hy }, to: { x: G.b.x - 50, y: G.hy + 50 }, text: 'Baja el piso', ty: G.b.y + 20 }),
    peek: G => ({ tY: G.tY, b: G.b }),
  });
  game.move = (G, x) => { const v = 5 * RK.pick(x, 30, G.W - 30, 21); if (v !== G.s.p || !G.touched[G.cur]) { G.s.p = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ p: need(r), fl: 0 }) });
})();
;
//#archivo js/games/tabla-doble.js
// Comparar grupos de distinto tamaño (Preuniversitario, pu-gr-3; spec 2026-11-18-preuda-razonamiento-completo): una tabla de
// dos grupos con cuántos dicen «sí» de cuántos. Más personas no es más proporción. Cada grupo tiene su barra de 100 %; se
// arrastra la parte pintada de cada una hasta su porcentaje (de 5 en 5) y así se comparan de verdad.
// params = { rounds: [{ rows: [[grupo, sí, total]], what }] }   state = { rounds: [{ p: [porcentaje por grupo] }] }
GAMES['tabla-doble'] = (() => {
  const need = r => r.rows.map(([, y, t]) => y / t * 100);
  let ok = (s, r) => need(r).every((v, i) => s.p[i] === v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.2,
    init: r => ({ p: r.rows.map(() => 0) }),
    ok,
    solution: r => r.rows.map(([g, y, t], i) => `${g}: ${y} de ${t} = ${need(r)[i]} %`).join('; '),
    prompt: r => `¿Qué porcentaje ${r.what} en cada grupo?`,
    foot: () => 'Arrastra la parte pintada de cada barra',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; G.x0 = 24; G.x1 = G.W - 24; },
    enter(G) { G.grab = -1; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { p: need(r) } : G.s, good = ok(s, r), X = v => G.x0 + v / 100 * (G.x1 - G.x0);
      G.rowsY = r.rows.map((_, i) => 140 + i * 92);
      r.rows.forEach(([g, y, t], i) => {
        const yy = G.rowsY[i];
        TK.label(p, C, `${g}: ${y} de ${t}`, G.W / 2, yy - 28, C.ink, 13, G.W - 30);
        p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 200)); p.rect(G.x0, yy - 14, G.x1 - G.x0, 28, 6);
        p.noStroke(); p.fill(s.p[i] === need(r)[i] && good ? C.ok : i ? C.sky : C.coral); p.rect(G.x0, yy - 14, X(s.p[i]) - G.x0, 28, 6);
        for (let k = 1; k < 10; k++) { p.stroke(RK.al(p, C.line, 120)); p.line(X(k * 10), yy + 14, X(k * 10), yy + 20); }
        RK.knob(p, C, X(s.p[i]), yy, C.brand);
        TK.label(p, C, `${s.p[i]} %`, Math.min(Math.max(X(s.p[i]), 40), G.W - 40), yy + 30, C.brand, 11, 60);
      });
      const best = good ? r.rows[need(r).indexOf(Math.max(...need(r)))][0] : null;
      RK.strip(p, C, G.fb, good ? `$\\text{mayor proporción: ${best}}$` : `$${s.p.map(v => v + '\\%').join('\\quad ')}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const i = (G.rowsY || []).findIndex(yy => Math.abs(y - yy) < 24); if (i < 0) return false; G.grab = i; game.move(G, x); return true; },
    drag(G, x) { if (G.grab < 0) return false; game.move(G, x); return true; },
    release(G) { G.grab = -1; },
    demo: G => (G.rowsY ? { from: { x: G.x0 + 4, y: G.rowsY[0] }, to: { x: G.x0 + 120, y: G.rowsY[0] }, text: 'Arrastra la barra', ty: G.rowsY[0] + 50 } : null),
    peek: G => ({ rowsY: G.rowsY, x0: G.x0, x1: G.x1 }),
  });
  game.move = (G, x) => { const v = Math.max(0, Math.min(100, Math.round((x - G.x0) / (G.x1 - G.x0) * 20) * 5)); if (v !== G.s.p[G.grab] || !G.touched[G.cur]) { G.s.p[G.grab] = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ p: need(r) }) });
})();
;
//#archivo js/games/rompe-promesa.js
// ¿Cuándo es falsa? (Preuniversitario, pu-lo-1 y pu-lo-3; spec 2026-11-18-preuda-razonamiento-completo): una frase con dos
// partes («si llueve, llevo paraguas») y un tablero de 2 × 2 con los cuatro casos posibles. Se tocan las casillas donde la
// frase queda falsa (o verdadera, según se pida). El condicional solo se rompe en un caso.
// params = { rounds: [{ say, p, q, f(p, q) → bool, want: bool }] }   state = { rounds: [{ m: [4 marcas] }] }   (casillas: p V/F × q V/F)
GAMES['rompe-promesa'] = (() => {
  const CASES = [[true, true], [true, false], [false, true], [false, false]];
  const need = r => CASES.map(([a, b]) => !!r.f(a, b) === r.want);
  let ok = (s, r) => need(r).every((v, i) => s.m[i] === v);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ m: [false, false, false, false] }),
    answered: s => s.m.some(Boolean),
    ok,
    solution: r => CASES.filter((_, i) => need(r)[i]).map(([a, b]) => `${a ? '' : 'no '}${r.p} y ${b ? '' : 'no '}${r.q}`).join('; '),
    prompt: r => `«${r.say}». Marca los casos en que es ${r.want ? 'verdad' : 'falsa'}`,
    foot: () => 'Toca las casillas para marcarlas',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { m: need(r) } : G.s, good = ok(s, r), lw = 76, cw = (G.W - 30 - lw) / 2, ch = 72, x0 = 15 + lw, y0 = 136;
      TK.label(p, C, r.q, x0 + cw, y0 - 40, C.ink, 11, 2 * cw);
      ['sí', 'no'].forEach((t, j) => TK.label(p, C, t, x0 + (j + 0.5) * cw, y0 - 18, C.mute, 10, cw));
      ['sí', 'no'].forEach((t, i) => { const yy = y0 + (i + 0.5) * ch; TK.label(p, C, t, 15 + lw / 2, yy - 9, C.ink, 11, lw - 4); TK.label(p, C, r.p, 15 + lw / 2, yy + 8, C.mute, 9, lw - 4); });
      G.cells = CASES.map((_, k) => {
        const i = Math.floor(k / 2), j = k % 2, x = x0 + j * cw, y = y0 + i * ch, on = s.m[k];
        p.stroke(C.line); p.strokeWeight(1); p.fill(on ? RK.al(p, r.want ? C.ok : C.coral, 110) : RK.al(p, C.card, 200)); p.rect(x + 3, y + 3, cw - 6, ch - 6, 8);
        if (on) TK.label(p, C, r.want ? 'verdad' : 'falsa', x + cw / 2, y + ch / 2, C.ink, 12, cw - 10);
        return { x: x + 3, y: y + 3, w: cw - 6, h: ch - 6, k };
      });
      const n = s.m.filter(Boolean).length;
      RK.strip(p, C, G.fb, good ? `$\\text{${n === 1 ? 'un solo caso' : n + ' casos'}}$` : `$\\text{${n} marcadas}$`, { col: G.locked || good ? C.ok : C.brand, size: 15 });
    },
    press(G, x, y) { const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false; G.s.m[c.k] = !G.s.m[c.k]; G.touch(); return true; },
    demo: G => (G.cells ? { from: { x: G.cells[0].x + 30, y: G.cells[0].y + 30 }, to: { x: G.cells[0].x + 30, y: G.cells[0].y + 30 }, text: 'Toca un caso', ty: G.cells[3].y + G.cells[3].h + 20 } : null),
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ m: need(r) }) });
})();
;
//#archivo js/games/contraejemplo.js
// El contraejemplo (Preuniversitario, pu-lo-2 y pu-lo-4; spec 2026-11-18-preuda-razonamiento-completo): para tumbar «todos
// cumplen» basta UNO que no cumpla; para tumbar «ninguno cumple», uno que sí. En una caja hay fichas; se toca la que tumba la
// frase y el juego la pone a prueba.
// params = { rounds: [{ claim, items: [fichas], bad(x) → bool (true si la ficha tumba la frase) }] }   state = { rounds: [{ pick }] }
GAMES['contraejemplo'] = (() => {
  let ok = (s, r) => s.pick >= 0 && !!r.bad(r.items[s.pick]);
  const first = r => r.items.findIndex(x => r.bad(x));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: () => ({ pick: -1 }),
    answered: s => s.pick >= 0,
    ok,
    solution: r => `${r.items[first(r)]} tumba la frase`,
    prompt: r => `«${r.claim}». Toca la ficha que la tumba`,
    foot: () => 'Toca una ficha para ponerla a prueba',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { pick: first(r) } : G.s, good = ok(s, r), n = r.items.length, per = Math.min(n, 4), cw = Math.min(70, (G.W - 40) / per), rows = Math.ceil(n / per);
      p.stroke(C.line); p.strokeWeight(1); p.fill(RK.al(p, C.card, 160)); p.rect(16, 96, G.W - 32, rows * 56 + 24, 12);
      G.cells = r.items.map((it, i) => {
        const row = Math.floor(i / per), inRow = Math.min(per, n - row * per), x = (G.W - inRow * cw) / 2 + (i % per) * cw, y = 108 + row * 56, b = { x: x + 4, y, w: cw - 8, h: 46, i };
        const on = s.pick === i;
        RK.chip(p, C, b, String(it), { on, col: on ? (good ? C.ok : C.bad) : C.sky, size: 15 });
        return b;
      });
      const it = s.pick >= 0 ? r.items[s.pick] : null;
      RK.strip(p, C, G.fb, it === null ? '$\\text{elige una ficha}$' : VELO.on ? `$\\text{${it}}$` : good ? `$\\text{${it}: la frase cae}$` : `$\\text{${it}: la frase sigue en pie}$`, { col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false; G.s.pick = c.i; G.touch(); return true; },
    demo: G => (G.cells ? { from: { x: G.cells[0].x + 20, y: G.cells[0].y + 20 }, to: { x: G.cells[0].x + 20, y: G.cells[0].y + 20 }, text: 'Toca una ficha', ty: G.cells.at(-1).y + 76 } : null),
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ pick: first(r) }) });
})();
;
//#archivo js/games/niega-todos.js
// Tumbar la frase con lo mínimo (Preuniversitario, pu-lo-2; spec 2026-11-18-preuda-razonamiento-completo): una fila de luces y
// una frase que hoy es verdad («todas están prendidas», «ninguna está prendida», «alguna está prendida»). Se tocan luces para
// cambiarlas hasta volver falsa la frase, cambiando lo menos posible. Así se ve que «todas» cae con una sola, y que «alguna»
// solo cae si se apagan todas: su negación es «ninguna».
// params = { rounds: [{ kind: 'todas' | 'ninguna' | 'alguna', on: [estado inicial] }] }   state = { rounds: [{ on: [...] }] }
GAMES['niega-todos'] = (() => {
  const SAY = { todas: 'Todas las luces están prendidas', ninguna: 'Ninguna luz está prendida', alguna: 'Alguna luz está prendida' };
  const NEG = { todas: 'alguna está apagada', ninguna: 'alguna está prendida', alguna: 'ninguna está prendida' };
  const truth = (k, on) => (k === 'todas' ? on.every(Boolean) : k === 'ninguna' ? !on.some(Boolean) : on.some(Boolean));
  const changes = (s, r) => s.on.filter((v, i) => v !== r.on[i]).length;
  const minCh = r => (r.kind === 'alguna' ? r.on.filter(Boolean).length : 1);
  let ok = (s, r) => !truth(r.kind, s.on) && changes(s, r) === minCh(r);
  const answer = r => { const on = r.on.slice(); if (r.kind === 'alguna') on.fill(false); else on[0] = !on[0]; return { on }; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ on: r.on.slice() }),
    answered: (s, r) => changes(s, r) > 0,
    ok,
    solution: r => `basta que ${NEG[r.kind]}: ${minCh(r)} cambio${minCh(r) > 1 ? 's' : ''}`,
    prompt: r => `«${SAY[r.kind]}». Vuélvela falsa cambiando lo menos posible`,
    foot: () => 'Toca una luz para prenderla o apagarla',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? answer(r) : G.s, good = ok(s, r), n = s.on.length, w = (G.W - 30) / n, y = 180, d = Math.min(w * 0.7, 44);
      G.bulbs = s.on.map((b, i) => {
        const x = 15 + (i + 0.5) * w, ch = b !== r.on[i];
        if (b) { p.noStroke(); p.fill(RK.al(p, C.sun, 70)); p.circle(x, y, d * 1.5); }
        p.stroke(ch ? C.brand : C.ink); p.strokeWeight(ch ? 2.5 : 1.4); p.fill(b ? C.sun : RK.al(p, C.card, 200)); p.circle(x, y, d);
        return { x, y, d, i };
      });
      const t = truth(r.kind, s.on), c = changes(s, r);
      TK.label(p, C, `la frase es ${t ? 'verdad' : 'falsa'}`, G.W / 2, 246, t ? C.mute : C.coral, 12, G.W - 30);
      RK.strip(p, C, G.fb, `$\\text{${c} cambio${c === 1 ? '' : 's'}}$`, { kicker: good ? `cae: ${NEG[r.kind]}` : t ? 'sigue siendo verdad' : 'falsa, pero ¿con menos cambios?', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { const i = (G.bulbs || []).findIndex(b => Math.hypot(x - b.x, y - b.y) < b.d / 2 + 8); if (i < 0) return false; G.s.on[i] = !G.s.on[i]; G.touch(); return true; },
    demo: G => (G.bulbs ? { from: G.bulbs[0], to: G.bulbs[0], text: 'Toca una luz', ty: G.bulbs[0].y + 50 } : null),
    peek: G => ({ bulbs: G.bulbs }),
  });
  return Object.assign(game, { answer });
})();
;
//#archivo js/games/cinta-ecuacion.js
// La cinta de la ecuación (Preuniversitario, pu-ec-1 y pu-ec-2; spec 2026-11-18-preuda-razonamiento-completo): un problema de
// texto se dibuja como una cinta: cada cantidad es un tramo hecho de x y de un pedazo fijo («Sara tiene 4 más que su
// hermano»: x y x + 4). Se desliza x y la cinta crece; hay que dejarla justo del largo del total.
// params = { rounds: [{ parts: [[coef, constante, rótulo]], total, lo, hi }] }   state = { rounds: [{ x }] }
GAMES['cinta-ecuacion'] = (() => {
  const len = (r, x) => r.parts.reduce((a, [c, k]) => a + c * x + k, 0);
  const need = r => { for (let x = r.lo; x <= r.hi; x++) if (len(r, x) === r.total) return x; return null; };
  let ok = (s, r) => len(r, s.x) === r.total;
  const N = r => r.hi - r.lo + 1;
  const term = (c, k) => { if (c === -1 && k > 0) return `${k} - x`; const a = c === 1 ? 'x' : c === -1 ? '-x' : c === 0 ? '' : `${c}x`; return k ? (a ? `${a} ${k > 0 ? '+' : '-'} ${Math.abs(k)}` : `${k}`) : a; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.15,
    init: r => ({ x: need(r) === r.lo ? r.lo + 1 : r.lo }),
    ok,
    solution: r => `x = ${need(r)}`,
    prompt: r => r.say || `${r.parts.map(p => p[2]).join(" + ")} = ${r.total}`,
    foot: () => 'Desliza x hasta que la cinta llegue al total',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { x: need(r) } : G.s, good = ok(s, r), x0 = 20, Wt = G.W - 40, top = r.total * 1.25, sc = Wt / top, cols = [C.sky, C.coral, C.mint, C.sun];
      p.stroke(C.ink); p.strokeWeight(1.5); p.drawingContext.setLineDash([6, 4]); p.noFill(); p.rect(x0, 112, r.total * sc, 40, 6); p.drawingContext.setLineDash([]);
      TK.label(p, C, `total ${r.total}`, x0 + r.total * sc / 2, 102, C.ink, 10, 120);
      let x = x0;
      const segs = r.parts.map(([c, k, lab], i) => {
        const v = c * s.x + k, w = Math.max(0, Math.min(v * sc, x0 + Wt - x)), seg = { x, w, v, c, k, lab, i };
        p.noStroke(); p.fill(RK.al(p, cols[i % 4], 200)); p.rect(x, 116, w, 32, 4);
        x += w; return seg;
      });
      segs.forEach(({ x, w, v, c, k, lab, i }) => {
        if (w > 34) TK.label(p, C, `$${term(c, k)}$`, x + w / 2, 132, inkOn(cols[i % 4]), 11, w - 4);
        TK.label(p, C, `${lab}: ${v}`, x + w / 2, 166 + i * 15, C.mute, 9, Math.max(w, 70));
      });
      const L = len(r, s.x), cs = r.parts.reduce((a, p) => a + p[0], 0), ks = r.parts.reduce((a, p) => a + p[1], 0);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), s.x - r.lo, k => ((r.lo + k) % 5 === 0 ? String(r.lo + k) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$${term(cs, ks)} = ${L}$`, { kicker: good ? `x = ${s.x}: llega justo` : L < r.total ? 'le falta' : 'se pasa', col: G.locked || good ? C.ok : C.brand, size: 17 });
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
//#archivo js/games/mezcla-precio.js
// La mezcla (Preuniversitario, pu-ec-2; spec 2026-11-18-preuda-razonamiento-completo): se mezclan dos productos de precios
// distintos para tener un total de kilos a un precio dado. Se desliza cuántos kilos van del primero (el resto es del segundo);
// el juego suma lo que cuesta cada montón y da el precio por kilo de la mezcla en una aguja.
// params = { rounds: [{ a: [nombre, precio], b: [nombre, precio], total, target, step }] }   state = { rounds: [{ ka }] }
GAMES['mezcla-precio'] = (() => {
  const price = (r, ka) => (ka * r.a[1] + (r.total - ka) * r.b[1]) / r.total;
  const need = r => { for (let k = 0; k <= r.total; k += r.step) if (Math.abs(price(r, k) - r.target) < 1e-9) return k; return null; };
  let ok = (s, r) => Math.abs(price(r, s.ka) - r.target) < 1e-9;
  const N = r => Math.round(r.total / r.step) + 1;
  const fm = v => Math.round(v).toLocaleString('es-CO');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ ka: need(r) === 0 ? r.step : 0 }),
    ok,
    solution: r => `${need(r)} kg de ${r.a[0]} y ${r.total - need(r)} kg de ${r.b[0]}`,
    prompt: r => `${r.total} kg de mezcla a ${fm(r.target)} el kilo: ¿cuánto de cada uno?`,
    foot: () => 'Desliza cuántos kilos van del primero',
    layout(G) { G.tY = G.H - 104; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { ka: need(r) } : G.s, good = ok(s, r), kb = r.total - s.ka, cx = [G.W * 0.25, G.W * 0.75], base = 230, u = Math.min(14, 120 / r.total * 2);
      [[r.a, s.ka, C.coral], [r.b, kb, C.sky]].forEach(([[name, pr], kg, col], i) => {
        const per = 5;
        for (let k = 0; k < kg; k++) { p.noStroke(); p.fill(col); p.rect(cx[i] - per * u / 2 + (k % per) * u, base - (Math.floor(k / per) + 1) * u, u - 1, u - 1, 2); }
        TK.label(p, C, `${name}: ${kg} kg`, cx[i], base + 14, C.ink, 11, G.W * 0.45);
        TK.label(p, C, `a ${fm(pr)} = ${fm(kg * pr)}`, cx[i], base + 30, C.mute, 9, G.W * 0.45);
      });
      const pm = price(r, s.ka), lo = Math.min(r.a[1], r.b[1]), hi = Math.max(r.a[1], r.b[1]), gx = x => 30 + (x - lo) / (hi - lo) * (G.W - 60), gy = 104;
      p.stroke(C.line); p.strokeWeight(3); p.line(30, gy, G.W - 30, gy);
      p.noStroke(); p.fill(C.coral); p.circle(gx(r.target), gy, 8);
      TK.label(p, C, `meta ${fm(r.target)}`, gx(r.target), gy - 12, C.coral, 9, 80);
      RK.knob(p, C, gx(pm), gy, good ? C.ok : C.brand);
      G.X = RK.track(p, C, 30, G.W - 30, G.tY, N(r), s.ka / r.step, k => (k % 2 === 0 ? String(k * r.step) : null), good ? C.ok : C.brand);
      RK.strip(p, C, G.fb, `$\\tfrac{${fm(s.ka * r.a[1])} + ${fm(kb * r.b[1])}}{${r.total}} = ${fm(pm)}$`, { kicker: good ? 'precio justo' : 'precio por kilo de la mezcla', col: G.locked || good ? C.ok : C.brand, size: 16 });
    },
    press(G, x, y) { if (Math.abs(y - G.tY) > 28) return false; G.grab = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.grab) return false; game.move(G, x); return true; },
    release(G) { G.grab = false; },
    demo: G => ({ from: { x: G.X(G.s.ka / G.r.step), y: G.tY }, to: { x: G.X(G.s.ka / G.r.step) + 60, y: G.tY }, text: 'Desliza los kilos', ty: G.tY - 30 }),
    peek: G => ({ tY: G.tY }),
  });
  game.move = (G, x) => { const r = G.r, v = RK.pick(x, 30, G.W - 30, N(r)) * r.step; if (v !== G.s.ka || !G.touched[G.cur]) { G.s.ka = v; G.touch(); } };
  return Object.assign(game, { answer: r => ({ ka: need(r) }) });
})();
;
//#archivo js/games/alcancia-monedas.js
// La alcancía (Preuniversitario, pu-ec-2; spec 2026-11-18-preuda-razonamiento-completo): hay N monedas de dos valores y se sabe
// cuánto suman. Las monedas están en fila; se arrastra la divisoria: las de la izquierda son de un valor y las de la derecha
// del otro. El juego cuenta cuánto suman y lo compara con el total.
// params = { rounds: [{ n, v: [valor izq, valor der], total }] }   state = { rounds: [{ k }] }   (monedas del primer valor)
GAMES['alcancia-monedas'] = (() => {
  const sum = (r, k) => k * r.v[0] + (r.n - k) * r.v[1];
  const need = r => { for (let k = 0; k <= r.n; k++) if (sum(r, k) === r.total) return k; return null; };
  let ok = (s, r) => sum(r, s.k) === r.total;
  const fm = v => v.toLocaleString('es-CO');
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ k: need(r) === 0 ? 1 : 0 }),
    ok,
    solution: r => `${need(r)} de ${fm(r.v[0])} y ${r.n - need(r)} de ${fm(r.v[1])}`,
    prompt: r => `${r.n} monedas de ${fm(r.v[0])} y ${fm(r.v[1])} suman ${fm(r.total)}. ¿Cuántas de cada una?`,
    foot: () => 'Arrastra la divisoria entre las monedas',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: need(r) } : G.s, good = ok(s, r), per = Math.min(r.n, 10), d = Math.min(28, (G.W - 40) / per), rows = Math.ceil(r.n / per), x0 = (G.W - per * d) / 2, y0 = 120;
      G.pos = [];
      for (let i = 0; i < r.n; i++) {
        const x = x0 + (i % per + 0.5) * d, y = y0 + Math.floor(i / per) * (d + 6), a = i < s.k, col = a ? C.sun : RK.al(p, C.line, 230);
        p.stroke(C.ink); p.strokeWeight(1); p.fill(col); p.circle(x, y, d * 0.86);
        TK.label(p, C, a ? String(r.v[0]) : String(r.v[1]), x, y, a ? inkOn(C.sun) : C.ink, 8, d * 0.8);
        G.pos.push({ x, y });
      }
      const at = i => (i < r.n ? G.pos[i] : { x: G.pos[r.n - 1].x + d, y: G.pos[r.n - 1].y }), q = s.k < r.n ? at(s.k) : at(r.n);
      G.div = { x: q.x - d / 2, y: q.y };
      p.stroke(C.brand); p.strokeWeight(3); p.line(G.div.x, q.y - d * 0.6, G.div.x, q.y + d * 0.6); RK.knob(p, C, G.div.x, q.y + d * 0.6 + 4, C.brand);
      const S = sum(r, s.k);
      TK.label(p, C, `${s.k} · ${fm(r.v[0])} + ${r.n - s.k} · ${fm(r.v[1])}`, G.W / 2, y0 + rows * (d + 6) + 18, C.ink, 12, G.W - 30);
      RK.strip(p, C, G.fb, `$\\text{suman ${fm(S)}}$`, { kicker: good ? 'justo el total' : S < r.total ? 'falta' : 'sobra', col: G.locked || good ? C.ok : C.brand, size: 17 });
      G.d = d;
    },
    press(G, x, y) { if (!G.pos || y < G.pos[0].y - 30 || y > G.pos.at(-1).y + 40) return false; G.grab = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.grab) return false; game.move(G, x, y); return true; },
    release(G) { G.grab = false; },
    demo: G => (G.div ? { from: G.div, to: { x: G.div.x + 3 * G.d, y: G.div.y }, text: 'Arrastra la divisoria', ty: G.div.y - 34 } : null),
    peek: G => ({ pos: G.pos }),
  });
  game.move = (G, x, y) => {
    const r = G.r; let best = 0, bd = 1e9;
    for (let k = 0; k <= r.n; k++) { const q = k < r.n ? G.pos[k] : { x: G.pos[r.n - 1].x + G.d, y: G.pos[r.n - 1].y }, dx = q.x - G.d / 2 - x, dy = q.y - y, dd = dx * dx + dy * dy * 4; if (dd < bd) { bd = dd; best = k; } }
    if (best !== G.s.k || !G.touched[G.cur]) { G.s.k = best; G.touch(); }
  };
  return Object.assign(game, { answer: r => ({ k: need(r) }) });
})();
;
//#archivo js/games/intervalo-solucion.js
// La solución de una desigualdad (Preuniversitario, pu-ec-3; spec 2026-11-18-preuda-razonamiento-completo): en la recta se
// arrastra el punto frontera, se toca el punto para dejarlo abierto o cerrado (si entra o no) y se toca un lado de la recta
// para pintar hacia dónde van las soluciones. El juego prueba en vivo un número del lado pintado en la desigualdad original.
// params = { rounds: [{ tex, f(x) → bool, lo, hi }] }   (la solución es un rayo con frontera entera)
// state = { rounds: [{ b, closed, dir }] }   (dir: −1 izquierda, 1 derecha, 0 sin pintar)
GAMES['intervalo-solucion'] = (() => {
  const need = r => { for (let b = r.lo; b <= r.hi; b++) { const L = r.f(b - 0.5), R = r.f(b + 0.5); if (L !== R) return { b, closed: !!r.f(b), dir: R ? 1 : -1 }; } return null; };
  let ok = (s, r) => { const n = need(r); return s.b === n.b && s.closed === n.closed && s.dir === n.dir; };
  const sym = s => (s.dir > 0 ? (s.closed ? '\\ge' : '>') : (s.closed ? '\\le' : '<'));
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.05,
    init: r => ({ b: need(r).b === 0 ? 1 : 0, closed: false, dir: 0 }),
    answered: s => s.dir !== 0,
    ok,
    solution: r => { const n = need(r); return `$x ${sym(n)} ${n.b}$`; },
    prompt: r => `Pinta la solución de $${r.tex}$`,
    foot: () => 'Arrastra la frontera, toca el punto y toca el lado que va',
    layout(G) { G.ax = { x0: 24, x1: G.W - 24, y: 190 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? need(r) : G.s, good = ok(s, r), ax = G.ax, X = v => ax.x0 + (v - r.lo) / (r.hi - r.lo) * (ax.x1 - ax.x0);
      G.X = X;
      if (s.dir) { p.stroke(good ? C.ok : C.brand); p.strokeWeight(6); p.line(X(s.b), ax.y, s.dir > 0 ? ax.x1 : ax.x0, ax.y); }
      p.stroke(C.ink); p.strokeWeight(1.5); p.line(ax.x0, ax.y, ax.x1, ax.y);
      for (let v = r.lo; v <= r.hi; v++) { p.strokeWeight(1); p.line(X(v), ax.y - 4, X(v), ax.y + 4); TK.label(p, C, String(v), X(v), ax.y + 16, C.mute, 8, 20); }
      p.stroke(good ? C.ok : C.brand); p.strokeWeight(2.5); p.fill(s.closed ? (good ? C.ok : C.brand) : C.bg); p.circle(X(s.b), ax.y, 16);
      RK.knob(p, C, X(s.b), ax.y - 30, C.brand);
      if (s.dir) {
        const t = s.b + s.dir * 2, val = r.f(t);
        TK.label(p, C, `prueba con x = ${t}: ${val ? 'cumple' : 'no cumple'}`, G.W / 2, ax.y + 46, VELO.on ? C.ink : val ? C.ok : C.bad, 11, G.W - 30);
        const e = r.f(s.b); TK.label(p, C, `y con x = ${s.b}: ${e ? 'cumple' : 'no cumple'}`, G.W / 2, ax.y + 64, VELO.on ? C.ink : e === s.closed ? C.ok : C.bad, 11, G.W - 30);
      }
      RK.strip(p, C, G.fb, s.dir ? `$x ${sym(s)} ${s.b}$` : '$\\text{toca un lado de la recta}$', { col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) {
      const ax = G.ax, bx = G.X(G.s.b);
      if (Math.hypot(x - bx, y - (ax.y - 30)) < 18) { G.grab = true; return true; }
      if (Math.hypot(x - bx, y - ax.y) < 14) { G.s.closed = !G.s.closed; G.touch(); return true; }
      if (Math.abs(y - ax.y) < 26 && x > ax.x0 - 10 && x < ax.x1 + 10) { G.s.dir = x > bx ? 1 : -1; G.touch(); return true; }
      return false;
    },
    drag(G, x) { if (!G.grab) return false; const r = G.r, ax = G.ax, b = Math.max(r.lo, Math.min(r.hi, Math.round(r.lo + (x - ax.x0) / (ax.x1 - ax.x0) * (r.hi - r.lo)))); if (b !== G.s.b) { G.s.b = b; G.touch(); } return true; },
    release(G) { G.grab = false; },
    demo: G => { const bx = G.X ? G.X(G.s.b) : G.W / 2; return { from: { x: bx, y: G.ax.y - 30 }, to: { x: bx + 60, y: G.ax.y - 30 }, text: 'Arrastra la frontera', ty: G.ax.y - 60 }; },
    peek: G => ({ ax: G.ax }),
  });
  return Object.assign(game, { answer: need });
})();
;
//#archivo js/games/tabla-dados.js
// La tabla de dos dados (Preuniversitario, pu-pb-1 y pu-pb-2; spec 2026-11-18-preuda-razonamiento-completo): los 36 resultados
// de lanzar dos dados en una tabla de 6 × 6 (fila: primer dado, columna: segundo). Se tocan las casillas donde pasa el suceso
// pedido; el juego cuenta las marcadas y escribe la probabilidad como fracción simplificada.
// params = { rounds: [{ say, f(a, b) → bool }] }   state = { rounds: [{ m: [36 marcas] }] }
GAMES['tabla-dados'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const need = r => Array.from({ length: 36 }, (_, k) => !!r.f(Math.floor(k / 6) + 1, k % 6 + 1));
  let ok = (s, r) => need(r).every((v, k) => s.m[k] === v);
  const frac = k => { const g = gcd(k, 36) || 1; return k ? `\\tfrac{${k / g}}{${36 / g}}` : '0'; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.3,
    init: () => ({ m: Array(36).fill(false) }),
    answered: s => s.m.some(Boolean),
    ok,
    solution: r => { const k = need(r).filter(Boolean).length; return `${k} de 36: $${frac(k)}$`; },
    prompt: r => `Dos dados: marca los resultados en que ${r.say}`,
    foot: () => 'Toca las casillas para marcarlas',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { m: need(r) } : G.s, good = ok(s, r), cs = Math.min(40, (G.W - 60) / 6), x0 = (G.W - 6 * cs) / 2 + 10, y0 = 112;
      for (let j = 0; j < 6; j++) TK.label(p, C, String(j + 1), x0 + (j + 0.5) * cs, y0 - 12, C.coral, 11, cs);
      G.cells = [];
      for (let i = 0; i < 6; i++) {
        TK.label(p, C, String(i + 1), x0 - 14, y0 + (i + 0.5) * cs, C.sky, 11, 20);
        for (let j = 0; j < 6; j++) {
          const k = i * 6 + j, x = x0 + j * cs, y = y0 + i * cs, on = s.m[k];
          p.stroke(RK.al(p, C.line, 150)); p.strokeWeight(1); p.fill(on ? RK.al(p, good ? C.ok : C.brand, 150) : RK.al(p, C.card, 210)); p.rect(x + 1, y + 1, cs - 2, cs - 2, 4);
          TK.label(p, C, `${i + 1},${j + 1}`, x + cs / 2, y + cs / 2, on ? C.ink : C.mute, 8, cs - 4);
          G.cells.push({ x, y, w: cs, h: cs, k });
        }
      }
      const k = s.m.filter(Boolean).length;
      RK.strip(p, C, G.fb, `$P = ${frac(k)}$`, { kicker: `${k} de 36 resultados`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const c = (G.cells || []).find(b => hitBox(b, x, y)); if (!c) return false; G.s.m[c.k] = !G.s.m[c.k]; G.touch(); return true; },
    demo: G => { const c = G.cells?.[7]; return c ? { from: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, to: { x: c.x + c.w / 2, y: c.y + c.h / 2 }, text: 'Toca una casilla', ty: G.cells.at(-1).y + 52 } : null; },
    peek: G => ({ cells: G.cells }),
  });
  return Object.assign(game, { answer: r => ({ m: need(r) }) });
})();
;
//#archivo js/games/urna-fraccion.js
// La urna (Preuniversitario, pu-pb-1; spec 2026-11-18-preuda-razonamiento-completo): en una urna hay bolas de otros colores y se
// echan bolas del color pedido arrastrándolas desde la bandeja (o se sacan arrastrándolas afuera). El juego escribe en vivo
// P(color) = favorables / posibles; hay que lograr la probabilidad pedida.
// params = { rounds: [{ color, others: [[color, cantidad]], target: [num, den] }] }   state = { rounds: [{ k }] }   (bolas del color pedido)
GAMES['urna-fraccion'] = (() => {
  const tot = r => r.others.reduce((a, o) => a + o[1], 0);
  const need = r => { for (let k = 0; k <= 20; k++) if (k * r.target[1] === r.target[0] * (k + tot(r))) return k; return null; };
  let ok = (s, r) => s.k * r.target[1] === r.target[0] * (s.k + tot(r));
  const NAME = { coral: 'rojas', sky: 'azules', mint: 'verdes', sun: 'amarillas', brand: 'moradas' };
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ k: 0 }),
    answered: s => s.k > 0,
    ok,
    solution: r => `${need(r)} ${NAME[r.color]}`,
    prompt: r => `Echa bolas ${NAME[r.color]} hasta que $P = \\tfrac{${r.target[0]}}{${r.target[1]}}$`,
    foot: () => 'Arrastra bolas a la urna (o sácalas)',
    layout(G) { G.urn = { x: G.W / 2 - 90, y: 110, w: 180, h: 170 }; G.tray = { x: G.W / 2, y: G.H - 110 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.drag = null; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { k: need(r) } : G.s, good = ok(s, r), u = G.urn;
      p.stroke(C.ink); p.strokeWeight(2); p.fill(RK.al(p, C.card, 160)); p.rect(u.x, u.y, u.w, u.h, 8, 8, 40, 40);
      const balls = [...Array(s.k).fill(r.color), ...r.others.flatMap(([c, n]) => Array(n).fill(c))], per = 6, d = 24;
      G.mine = [];
      balls.forEach((c, i) => { const x = u.x + 18 + (i % per) * 28, y = u.y + u.h - 20 - Math.floor(i / per) * 26; p.stroke(C.ink); p.strokeWeight(1); p.fill(C[c]); p.circle(x, y, d); if (i < s.k) G.mine.push({ x, y }); });
      p.stroke(C.ink); p.strokeWeight(1); p.fill(C[r.color]); p.circle(G.tray.x, G.tray.y, 30);
      TK.label(p, C, 'toma de aquí', G.tray.x, G.tray.y + 26, C.mute, 9, 100);
      if (G.drag) { p.fill(C[r.color]); p.circle(G.drag.x, G.drag.y, 26); }
      const n = s.k + tot(r), g = gcd(s.k, n) || 1;
      RK.strip(p, C, G.fb, `$P = \\tfrac{${s.k}}{${n}}${s.k && g > 1 ? ` = \\tfrac{${s.k / g}}{${n / g}}` : ''}$`, { kicker: good ? 'probabilidad lograda' : 'favorables / posibles', col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) {
      if (Math.hypot(x - G.tray.x, y - G.tray.y) < 24) { G.drag = { x, y, from: 'tray' }; return true; }
      const m = (G.mine || []).find(q => Math.hypot(x - q.x, y - q.y) < 14); if (m) { G.drag = { x, y, from: 'urn' }; return true; }
      return false;
    },
    drag(G, x, y) { if (!G.drag) return false; G.drag.x = x; G.drag.y = y; return true; },
    release(G, x, y) {
      if (!G.drag) return; const u = G.urn, inU = x > u.x && x < u.x + u.w && y > u.y && y < u.y + u.h;
      if (G.drag.from === 'tray' && inU && G.s.k < 20) { G.s.k++; G.touch(); }
      if (G.drag.from === 'urn' && !inU && G.s.k > 0) { G.s.k--; G.touch(); }
      G.drag = null;
    },
    demo: G => ({ from: G.tray, to: { x: G.urn.x + G.urn.w / 2, y: G.urn.y + 60 }, text: 'Arrastra a la urna', ty: G.tray.y - 30 }),
    peek: G => ({ tray: G.tray, urn: G.urn }),
  });
  return Object.assign(game, { answer: r => ({ k: need(r) }) });
})();
;
//#archivo js/games/arbol-caminos.js
// El árbol de probabilidades (Preuniversitario, pu-pb-2; spec 2026-11-18-preuda-razonamiento-completo): dos o tres pasos
// independientes (monedas, tiros) en un árbol; cada rama lleva su probabilidad. Se tocan las hojas (caminos completos) donde pasa
// lo pedido; el juego multiplica a lo largo de cada camino y suma los caminos marcados.
// params = { rounds: [{ steps: [[[rótulo, num, den], …]], say, f(camino de índices) → bool }] }   state = { rounds: [{ m: [marca por hoja] }] }
GAMES['arbol-caminos'] = (() => {
  const paths = r => r.steps.reduce((acc, st) => acc.flatMap(pa => st.map((_, i) => [...pa, i])), [[]]);
  const need = r => paths(r).map(pa => !!r.f(pa));
  let ok = (s, r) => need(r).every((v, k) => s.m[k] === v);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const prob = (r, pa) => pa.reduce(([n, d], i, k) => [n * r.steps[k][i][1], d * r.steps[k][i][2]], [1, 1]);
  const add = (a, b) => { const n = a[0] * b[1] + b[0] * a[1], d = a[1] * b[1], g = gcd(n, d) || 1; return [n / g, d / g]; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.35,
    init: r => ({ m: paths(r).map(() => false) }),
    answered: s => s.m.some(Boolean),
    ok,
    solution: r => { const P = paths(r).filter((pa, k) => need(r)[k]).reduce((a, pa) => add(a, prob(r, pa)), [0, 1]); return `$P = \\tfrac{${P[0]}}{${P[1]}}$`; },
    prompt: r => `Marca los caminos en que ${r.say}`,
    foot: () => 'Toca las hojas del árbol',
    layout(G) { G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) {},
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { m: need(r) } : G.s, good = ok(s, r), P = paths(r), L = r.steps.length, hTot = G.H - 210, x0 = 30, dx = (G.W - 110) / L;
      const yOf = (lvl, idx, count) => 100 + (idx + 0.5) * hTot / count;
      let level = [[]];
      for (let l = 0; l < L; l++) {
        const next = level.flatMap(pa => r.steps[l].map((_, i) => [...pa, i])), cnt = next.length, pc = level.length;
        next.forEach((pa, k) => {
          const parent = Math.floor(k / r.steps[l].length), y1 = l ? yOf(l - 1, parent, pc) : 100 + hTot / 2, y2 = yOf(l, k, cnt), xa = x0 + l * dx, xb = x0 + (l + 1) * dx, [lab, n, d] = r.steps[l][pa[l]];
          p.stroke(C.line); p.strokeWeight(1.2); p.line(xa, y1, xb, y2);
          if (cnt <= 8) TK.label(p, C, `${lab} $\\tfrac{${n}}{${d}}$`, (xa + xb) / 2, (y1 + y2) / 2 - 8, C.mute, 8, dx);
        });
        level = next;
      }
      G.leaves = P.map((pa, k) => {
        const y = yOf(L - 1, k, P.length), x = x0 + L * dx, on = s.m[k], pr = prob(r, pa);
        p.stroke(on ? (good ? C.ok : C.brand) : C.line); p.strokeWeight(on ? 2 : 1); p.fill(on ? RK.al(p, good ? C.ok : C.brand, 90) : RK.al(p, C.card, 220)); p.rect(x + 4, y - 10, 64, 20, 6);
        TK.label(p, C, `${pa.map((i, l) => r.steps[l][i][0]).join('')} $\\tfrac{${pr[0]}}{${pr[1]}}$`, x + 36, y, C.ink, 9, 62);
        return { x: x + 4, y: y - 10, w: 64, h: 20, k };
      });
      const sum = P.filter((_, k) => s.m[k]).reduce((a, pa) => add(a, prob(r, pa)), [0, 1]);
      RK.strip(p, C, G.fb, `$P = ${sum[0] ? `\\tfrac{${sum[0]}}{${sum[1]}}` : '0'}$`, { kicker: good ? 'se multiplica por camino y se suman los caminos' : `${s.m.filter(Boolean).length} caminos marcados`, col: G.locked || good ? C.ok : C.brand, size: 18 });
    },
    press(G, x, y) { const c = (G.leaves || []).find(b => hitBox({ x: b.x - 4, y: b.y - 2, w: b.w + 8, h: b.h + 4 }, x, y)); if (!c) return false; G.s.m[c.k] = !G.s.m[c.k]; G.touch(); return true; },
    demo: G => { const c = G.leaves?.[0]; return c ? { from: { x: c.x + 30, y: c.y + 10 }, to: { x: c.x + 30, y: c.y + 10 }, text: 'Toca una hoja', ty: G.leaves.at(-1).y + 40 } : null; },
    peek: G => ({ leaves: G.leaves }),
  });
  return Object.assign(game, { answer: r => ({ m: need(r) }) });
})();
;
//#archivo js/games/area-probabilidad.js
// El área de la probabilidad (Preuniversitario, pu-pb-2; spec 2026-11-18-preuda-razonamiento-completo): un cuadrado de lado 1 es
// todo lo que puede pasar. El ancho pintado es P(A) y el alto P(B); si A y B son independientes, que pasen los dos es el
// rectángulo de la esquina: P(A) · P(B). Uno de los dos lados viene dado; se arrastra el otro hasta que el área sea la pedida.
// params = { rounds: [{ a: [num, den] | null, b: [num, den] | null, both: [num, den], grid }] }   state = { rounds: [{ v }] }   (el lado libre, en partes de grid)
GAMES['area-probabilidad'] = (() => {
  const free = r => (r.a ? 'b' : 'a');
  const known = r => r.a || r.b;
  const need = r => { const k = known(r); for (let v = 0; v <= r.grid; v++) if (k[0] * v * r.both[1] === r.both[0] * k[1] * r.grid) return v; return null; };
  let ok = (s, r) => s.v === need(r);
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const fr = (n, d) => { const g = gcd(n, d) || 1; return n ? `\\tfrac{${n / g}}{${d / g}}` : '0'; };
  ok = velo(ok);
  const game = roundsGame({
    aspect: 1.25,
    init: r => ({ v: need(r) === r.grid ? 1 : r.grid }),
    ok,
    solution: r => `$P(${free(r).toUpperCase()}) = ${fr(need(r), r.grid)}$`,
    prompt: r => `$P(${free(r) === 'a' ? 'B' : 'A'}) = ${fr(known(r)[0], known(r)[1])}$ y $P(A \\text{ y } B) = ${fr(r.both[0], r.both[1])}$. ¿$P(${free(r).toUpperCase()})$?`,
    foot: () => 'Arrastra el borde del lado que falta',
    layout(G) { G.S = Math.min(G.W - 80, G.H - 230); G.o = { x: (G.W - G.S) / 2, y: 104 }; G.fb = { x: 12, y: G.H - 66, w: G.W - 24, h: 44 }; },
    enter(G) { G.grab = false; },
    draw(G) {
      const { p, C, r } = G, s = G.locked && !ok(G.s, r) ? { v: need(r) } : G.s, good = ok(s, r), S = G.S, o = G.o, k = known(r), kv = k[0] / k[1], fv = s.v / r.grid;
      const wA = free(r) === 'a' ? fv : kv, hB = free(r) === 'b' ? fv : kv;
      p.stroke(C.ink); p.strokeWeight(1.5); p.fill(RK.al(p, C.card, 200)); p.rect(o.x, o.y, S, S);
      p.noStroke(); p.fill(RK.al(p, C.sky, 70)); p.rect(o.x, o.y, wA * S, S);
      p.fill(RK.al(p, C.coral, 70)); p.rect(o.x, o.y + S - hB * S, S, hB * S);
      p.fill(RK.al(p, good ? C.ok : C.brand, 170)); p.rect(o.x, o.y + S - hB * S, wA * S, hB * S);
      p.stroke(RK.al(p, C.line, 120)); p.strokeWeight(1); for (let i = 1; i < r.grid; i++) { p.line(o.x + i * S / r.grid, o.y, o.x + i * S / r.grid, o.y + S); p.line(o.x, o.y + i * S / r.grid, o.x + S, o.y + i * S / r.grid); }
      G.h = free(r) === 'a' ? { x: o.x + wA * S, y: o.y + S + 14 } : { x: o.x - 14, y: o.y + S - hB * S };
      RK.knob(p, C, G.h.x, G.h.y, C.brand);
      TK.label(p, C, 'A', o.x + wA * S / 2, o.y - 10, C.sky, 11, 30); TK.label(p, C, 'B', o.x + S + 12, o.y + S - hB * S / 2, C.coral, 11, 20);
      const both = [free(r) === 'a' ? s.v * k[0] : k[0] * s.v, r.grid * k[1]];
      RK.strip(p, C, G.fb, `$${free(r) === 'a' ? fr(s.v, r.grid) : fr(k[0], k[1])} \\cdot ${free(r) === 'b' ? fr(s.v, r.grid) : fr(k[0], k[1])} = ${fr(both[0], both[1])}$`, { kicker: good ? 'el área pedida' : 'área de los dos', col: G.locked || good ? C.ok : C.brand, size: 17 });
    },
    press(G, x, y) { if (Math.hypot(x - G.h.x, y - G.h.y) > 26) return false; G.grab = true; return true; },
    drag(G, x, y) {
      if (!G.grab) return false; const r = G.r, o = G.o, S = G.S;
      const t = free(r) === 'a' ? (x - o.x) / S : (o.y + S - y) / S, v = Math.max(0, Math.min(r.grid, Math.round(t * r.grid)));
      if (v !== G.s.v) { G.s.v = v; G.touch(); } return true;
    },
    release(G) { G.grab = false; },
    demo: G => (G.h ? { from: G.h, to: free(G.r) === 'a' ? { x: G.h.x - 50, y: G.h.y } : { x: G.h.x, y: G.h.y + 50 }, text: 'Arrastra el borde', ty: G.o.y + G.S + 36 } : null),
    peek: G => ({ h: G.h }),
  });
  return Object.assign(game, { answer: r => ({ v: need(r) }) });
})();
;
//#archivo js/games/mueve-kit.js
// Kit de los juegos en movimiento por preguntas (Preuniversitario UdeA, razonamiento; spec 2026-11-20-preuda-movimiento).
// Seis juegos que reciben lo mismo que vuela-precios y rompe-cambios, pero con una mecánica física distinta cada uno:
// params = { rounds: [{ title, items: [{ ask, options: [...], answer }] }], miss? }. Va después de kit.js.
// Nada se mueve si no lo mueve el estudiante: lo que avanza solo (un aro en el aire, una carga que baja) se detiene y espera.
// s = { pick: opción elegida (índice de `options`) o −1, order: orden en pantalla, wrong: posición en pantalla del último
// error }. ok(s, item) = s.pick === item.answer.
const MV = (() => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const orderOf = it => shuffledOrder(it.options.length, it.ask);
  // Definición para questGame (cada juego hace questGame(MV.quiz({ … }))): el enunciado es la pregunta y la solución,
  // «pregunta: respuesta».
  function quiz(def) {
    return {
      aspect: 1.3,
      idle: 'Sin prisa: solo se mueve lo que tú muevas',
      prompt: it => it.ask,
      solution: it => `${it.ask}: ${it.options[it.answer]}`,
      ok: (s, it) => !!s && s.pick === it.answer,
      answer: it => ({ pick: it.answer }),
      yes: it => `${it.options[it.answer]}. ¡Bien!`,
      ...def,
      init: (it, r, G) => ({ pick: -1, wrong: -1, order: orderOf(it), ...(def.init ? def.init(it, r, G) : {}) }),
      retry: G => { const w = G.s.wrong, s = def.init ? def.init(G.item, G.round, G) : {}; G.s = { pick: -1, wrong: w, order: G.s.order, ...s }; G._gl = null; },
    };
  }
  // El objeto llegó a la opción de la posición k: se califica. Fallar quita una vida y vuelve todo al inicio.
  function choose(G, k) {
    const s = G.s, it = G.item;
    s.pick = s.order[k]; s.wrong = k;
    const miss = G.params.miss;
    return G.submit(`«${it.options[s.pick]}» no es${miss ? `: ${miss}` : ''}`);
  }
  // Tono de la opción k: verde al acertar, rojo la del último error.
  const toneOf = (G, k) => (G.solved && G.s.order[k] === G.item.answer ? G.C.ok : G.s.wrong === k && !G.solved ? G.C.bad : null);
  // Rótulo de una opción: tarjeta con borde; si no cabe en un renglón, en dos.
  function tag(p, C, txt, cx, cy, w, h, tone) {
    drawPracticePanel(p, { x: cx - w / 2, y: cy - h / 2, w, h }, C.card, tone ?? C.line, 8, tone ? 2 : 1);
    p.noStroke(); p.fill(tone === C.ok ? C.ok : C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
    const s = String(txt);
    p.textSize(13);
    if (p.textWidth(s) <= w - 10 || !s.includes(' ') || (typeof formulaWanted === 'function' && formulaWanted(s))) { fitText(p, s, cx, cy + 1, w - 10, 13, h - 4); return; }
    p.textSize(12);
    const lines = wrapWords(s, w - 10, t => p.textWidth(t)).slice(0, 2);
    lines.forEach((ln, i) => fitText(p, ln, cx, cy + 1 + (i - (lines.length - 1) / 2) * 14, w - 8, 12));
  }
  // Puntos de un camino para el robot (cajas de tamaño cero, como las de questGame).
  const pt = (x, y) => ({ x, y, w: 0, h: 0 });
  // Color con transparencia (0 a 255).
  const alpha = (p, col, a) => { const c = p.color(col); c.setAlpha(a); return c; };
  return { clamp, orderOf, quiz, choose, toneOf, tag, pt, alpha };
})();
;
//#archivo js/games/pinta-personas.js
// Pinta a las personas (Álgebra, porcentajes). Un grupo de personitas que no son 100 (20, 25, 40, 8): se tocan para
// pintarlas hasta tener el porcentaje pedido. El porcentaje es «de cada 100», así que hay que pasarlo a este total:
// parte = total · p / 100. Tocar una pintada la despinta.
// params = { rounds: [{ total, pct, what }] }   state = { painted: [número | null por ronda] }

GAMES['pinta-personas'] = (() => {
  const want = r => (r.total * r.pct) / 100;
  const okRound = (k, r) => k === want(r);

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okRound(state.painted?.[i], r));
    return { ok, solution: params.rounds.map(r => `${want(r)} de ${r.total}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette, R = params.rounds;
    const P = R.map(r => Array(r.total).fill(false)), touched = R.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [];

    function layout(w, h) { W = w; H = h; tabs = roundTabs(R.length, w); }
    // Cuadrícula de la ronda actual (se calcula igual al dibujar y al tocar, aunque aún no se haya redibujado).
    function grid() {
      const r = R[cur], cols = r.total <= 8 ? 4 : r.total <= 25 ? 5 : 8, rows = Math.ceil(r.total / cols);
      const top = 98, bot = H - 52, cw = (W - 24) / cols, ch = (bot - top) / rows;
      return { cols, cw, ch, s: Math.min(cw, ch) * 0.82,
        cells: Array.from({ length: r.total }, (_, i) => ({ x: 12 + (i % cols) * cw, y: top + Math.floor(i / cols) * ch, w: cw, h: ch })) };
    }
    const count = i => P[i].filter(Boolean).length;

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function person(x, y, s, col) {
        p.noStroke(); p.fill(col);
        p.circle(x, y - s * 0.28, s * 0.38);
        p.rect(x - s * 0.24, y - s * 0.06, s * 0.48, s * 0.46, s * 0.2, s * 0.2, s * 0.06, s * 0.06);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = R[cur], k = count(cur), good = okRound(k, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (okRound(count(i), R[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Q : C.line));
        p.textAlign(p.CENTER, p.CENTER); p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD);
        fitText(p, `Pinta al ${String(r.pct)} % del grupo`, W / 2, 56, W - 24, 15);
        p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, `${r.total} personas · ${r.what}`, W / 2, 78, W - 24, 12);
        // Personas en una cuadrícula que llena el espacio
        const { s, cells } = grid(), shown = locked && !good ? want(r) : null;
        cells.forEach((c, i) => {
          const on = shown == null ? P[cur][i] : i < shown;
          person(c.x + c.w / 2, c.y + c.h / 2, s, on ? (locked ? C.ok : C.sun) : C.mute);
        });
        const msg = locked && !good ? `Eran ${want(r)} de ${r.total}` : `pintadas: ${k} de ${r.total}`;
        p.fill(locked ? C.ok : C.ink); p.textStyle(p.BOLD); fitText(p, msg, W / 2, H - 26, W - 24, 15);
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(b => hitBox(b, x, y));
        if (tb >= 0) { cur = tb; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const i = grid().cells.findIndex(c => hitBox(c, x, y));
        if (i >= 0) { P[cur][i] = !P[cur][i]; touched[cur] = true; api.ready(touched.every(Boolean)); api.sfx?.tap?.(); return false; }
      };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ painted: P.map((row, i) => (touched[i] ? row.filter(Boolean).length : null)) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create };
})();
;
//#archivo js/games/lectura-kit.js
// Kit LEC de comprensión lectora (spec 2026-11-19-preuda-lectura-textos). Juegos en HTML (el texto largo se lee mejor que en un
// lienzo y se adapta solo al ancho y al tema): un panel con el texto de la lección en párrafos numerados y una fábrica de juegos
// de fichas que se arrastran a zonas. Se arrastra con el dedo o el ratón; también se toca la ficha y luego la zona, y con el
// teclado (Enter o espacio). Nada dice si va bien hasta comprobar; la escena sí reacciona en vivo (la balanza se inclina, el
// esqueleto del texto se arma, la oración se lee con la palabra puesta).
//   LEC.doc(doc, { hideBody })      → HTML del panel. doc = { id, title, ficha?: { autor, fuente, fecha }, paras: [...] }
//   LEC.drop(name, def)             → { grade, create } para GAMES[name]. def.norm(params) da las rondas
//                                     { ask, chips: [texto], zones: [{ label, cap }], key: [zona | [zonas] | null por ficha] }
//                                     y def.render(r, ui) arma la escena con ui.zone(i), ui.chip(c), ui.pool(), ui.placed(i).
//   LEC.rounds(name, params)        → las rondas normalizadas (para las pruebas).
//   LEC.sentences(párrafo)          → las oraciones de un párrafo (corta tras . ! ? … cuando sigue mayúscula).
//   LEC.css(id, reglas)             → pone una sola vez en la página los estilos propios de un juego.
const LEC = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
  // Texto con __subrayado__ (la palabra por la que pregunta el examen) y **negrita**.
  const fmt = s => esc(s).replace(/__(.+?)__/g, '<u>$1</u>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const DEFS = {};
  let made = 0;

  function doc(d, o = {}) {
    if (!d) return '';
    const ficha = d.ficha ? `<p class="lec-ficha">${[d.ficha.autor, d.ficha.fuente, d.ficha.fecha].filter(Boolean).map(esc).join(' · ')}</p>` : '';
    const body = o.hideBody
      ? `<p class="lec-hidden">${esc(o.hideMsg || 'El texto se abre cuando termines de anticipar.')}</p>`
      : d.paras.map((p, i) => `<p class="lec-p"><span class="lec-pn" aria-label="párrafo ${i + 1}">${i + 1}</span>${fmt(p)}</p>`).join('');
    return `<details class="lec-doc"${o.closed ? '' : ' open'}><summary><span class="lec-dk">${esc(o.label || 'Texto')}</span><span class="lec-dt">${esc(d.title)}</span></summary>${ficha}<div class="lec-body">${body}</div></details>`;
  }
  const docs = (p, o) => p.docs ? p.docs.map((d, i) => doc(d, { ...o, label: ['Texto Uno', 'Texto Dos'][i], closed: i > 0 })).join('') : doc(p.doc, o);
  const keyOf = k => k == null ? [] : [].concat(k);
  // Orden fijo pero revuelto para mostrar fichas y tonos: los datos ponen la respuesta primero o en el orden de los párrafos, y
  // en pantalla eso no puede notarse. Depende solo del texto, así que no cambia al repintar ni entre sesiones.
  const hash = t => { let h = 2166136261; for (const ch of String(t)) h = Math.imul(h ^ ch.codePointAt(0), 16777619); return h >>> 0; };
  const mix = list => list.map((t, i) => [hash(`${t}·${list.length}`), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  const first = (s, n = 7) => { const w = s.replace(/__|\*\*/g, '').split(/\s+/); return w.slice(0, n).join(' ') + (w.length > n ? '…' : ''); };

  function rounds(name, params) { return DEFS[name].norm(params); }
  // Sin «lookbehind» (Safari viejo no lo entiende): se marca el corte y luego se parte.
  const sentences = t => String(t).replace(/([.!?…][»”")]?)\s+(?=[¿¡«"(—]?[A-ZÁÉÍÓÚÑ0-9])/g, '$1\u0001').split('\u0001').map(x => x.trim()).filter(Boolean);
  const styled = new Set();
  function css(id, rules) {
    if (styled.has(id) || typeof document === 'undefined' || !document.head?.appendChild) return;
    styled.add(id);
    const el = document.createElement('style');
    el.id = `lec-css-${id}`; el.textContent = rules;
    document.head.appendChild(el);
  }
  // Enter y las flechas sobre el texto, una ficha o una zona no siguen hasta la lección: allá Enter comprueba la respuesta y
  // ← / → cambian de ejercicio. El <summary> conserva su Enter para plegar el texto.
  function guardKeys(box) {
    box.addEventListener('keydown', e => {
      if (['Enter', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) && e.target !== box) e.stopPropagation();
    });
  }

  function drop(name, def) {
    DEFS[name] = def;
    function grade(state, params) {
      const rs = def.norm(params);
      const ok = rs.every((r, i) => r.key.every((k, c) => {
        const z = state?.rounds?.[i]?.place?.[c] ?? -1;
        return k == null ? z === -1 : keyOf(k).includes(z);
      }));
      const solution = def.solution ? def.solution(rs, params) : rs.map(r => r.zones.map((z, zi) => {
        const cs = r.chips.filter((_, c) => keyOf(r.key[c])[0] === zi);
        return cs.length ? `${z.label}: ${cs.map(t => `«${t}»`).join(', ')}` : '';
      }).filter(Boolean).join(' · ')).join(' | ');
      return { ok, solution };
    }

    function create(host, params, api) {
      const rs = def.norm(params), uid = ++made;
      const st = { rounds: rs.map(r => ({ place: r.chips.map(() => -1) })) };
      let at = 0, sel = -1, locked = false, okAll = null, drag = null;
      const box = document.createElement('div');
      box.className = `lec lec-${name}`;
      box.innerHTML = `${docs(params, { hideBody: def.hideBody, hideMsg: def.hideMsg })}<div class="lec-play"></div>`;
      host.appendChild(box);
      const play = box.querySelector('.lec-play');
      const needAll = r => r.key.every(k => k != null);
      const roundReady = i => {
        const r = rs[i], pl = st.rounds[i].place;
        if (needAll(r)) return pl.every(z => z >= 0);
        return pl.some(z => z >= 0) && r.zones.every((z, zi) => z.cap !== 1 || pl.includes(zi));
      };
      const isReady = () => rs.every((_, i) => roundReady(i));

      function ui(i) {
        const r = rs[i], pl = st.rounds[i].place;
        const mark = c => {
          if (!locked) return c === sel ? ' sel' : '';
          const good = r.key[c] == null ? pl[c] === -1 : keyOf(r.key[c]).includes(pl[c]);
          return pl[c] === -1 && r.key[c] == null ? ' off' : good ? ' good' : ' bad';
        };
        const chip = c => `<span class="lec-chip${mark(c)}" role="button" tabindex="${locked ? -1 : 0}" data-c="${c}" aria-pressed="${c === sel}">${fmt(r.chips[c])}</span>`;
        const placed = zi => r.chips.map((_, c) => c).filter(c => pl[c] === zi);
        const zone = (zi, o = {}) => {
          const z = r.zones[zi], tag = o.inline ? 'span' : 'div', inside = placed(zi).map(chip).join('');
          return `<${tag} class="lec-zone${inside ? ' full' : ''}${o.cls ? ` ${o.cls}` : ''}" role="group" tabindex="${locked ? -1 : 0}" data-zi="${zi}" aria-label="${esc(z.label)}${inside ? '' : ', vacía'}">${o.noLabel ? '' : `<span class="lec-zl">${fmt(z.label)}</span>`}${o.before || ''}${inside || (o.inline ? '<span class="lec-gap"> </span>' : '')}${o.after || ''}</${tag}>`;
        };
        const pool = () => {
          const order = mix(r.chips), free = order.filter(c => pl[c] === -1);
          return `<div class="lec-pool" role="group" tabindex="${locked ? -1 : 0}" aria-label="Bandeja de fichas">${free.map(chip).join('') || '<span class="lec-empty">Todas las fichas están puestas.</span>'}</div>`;
        };
        return { r, pl, chip, zone, pool, placed, fmt, esc, first, locked, doc: params.doc, count: zi => placed(zi).length };
      }

      function render() {
        const r = rs[at], n = rs.length;
        const tabs = n > 1 ? `<div class="lec-tabs" role="tablist">${rs.map((_, i) => `<span role="tab" class="lec-tab${i === at ? ' on' : ''}${st.rounds[i].place.some(z => z >= 0) ? ' has' : ''}" data-tab="${i}" id="lec-tab-${uid}-${i}" aria-selected="${i === at}" tabindex="${i === at ? 0 : -1}">${i + 1}</span>`).join('')}</div>` : '';
        const scene = (def.render || defaultRender)(r, ui(at));
        const foot = locked ? (okAll ? 'Muy bien.' : 'En verde lo que quedó bien; en rojo lo que va en otro lugar.')
          : sel >= 0 ? 'Ahora toca la zona donde va (o arrástrala).' : (def.foot || 'Arrastra cada ficha a su lugar, o tócala y luego toca la zona.');
        play.innerHTML = `${tabs}${r.ask ? `<p class="lec-ask">${fmt(r.ask)}</p>` : ''}${scene}<p class="lec-foot">${foot}</p>`;
        if (def.hideBody && locked) box.querySelector('.lec-body').innerHTML = params.doc.paras.map((p, i) => `<p class="lec-p"><span class="lec-pn">${i + 1}</span>${fmt(p)}</p>`).join('');
      }
      function defaultRender(r, u) {
        return `<div class="lec-zones lec-${def.layout || 'bins'}">${r.zones.map((_, zi) => u.zone(zi)).join('')}</div>${u.pool()}`;
      }
      function place(c, zi) {
        const r = rs[at], pl = st.rounds[at].place;
        if (zi >= 0 && r.zones[zi].cap === 1) pl.forEach((z, k) => { if (z === zi && k !== c) pl[k] = -1; });
        pl[c] = zi; sel = -1;
        api.sfx?.tap?.();
        render();
        api.ready(isReady());
      }
      const focusChip = c => play.querySelector(`.lec-chip[data-c="${c}"]`)?.focus({ preventScroll: true });

      play.addEventListener('pointerdown', e => {
        const ch = e.target.closest('.lec-chip');
        if (!ch || locked || e.button > 0 || drag) return;
        drag = { c: +ch.dataset.c, x: e.clientX, y: e.clientY, el: ch, ghost: null, id: e.pointerId };
        (() => { try { ch.setPointerCapture(e.pointerId); } catch { /* puntero sintético */ } })();
        e.preventDefault();
      });
      play.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        if (!drag.ghost && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) {
          drag.ghost = drag.el.cloneNode(true);
          drag.ghost.classList.add('lec-ghost');
          document.body.appendChild(drag.ghost);
          drag.el.classList.add('lifting');
        }
        if (drag.ghost) {
          drag.ghost.style.left = `${e.clientX / zk()}px`; drag.ghost.style.top = `${e.clientY / zk()}px`;
          play.querySelectorAll('.lec-zone.over').forEach(z => z.classList.remove('over'));
          drag.ghost.hidden = true;
          document.elementFromPoint(e.clientX, e.clientY)?.closest('.lec-zone')?.classList.add('over');
          drag.ghost.hidden = false;
        }
      });
      const endDrag = e => {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag; drag = null;
        if (d.ghost) {
          d.ghost.remove();
          const t = e.type === 'pointercancel' ? null : document.elementFromPoint(e.clientX, e.clientY);
          const z = t?.closest('.lec-zone'), pool = t?.closest('.lec-pool');
          if (z && play.contains(z)) place(d.c, +z.dataset.zi);
          else if (pool && play.contains(pool)) place(d.c, -1);
          else render();
        } else if (e.type === 'pointerup') {
          const z = d.el.closest('.lec-zone');
          if (z && sel >= 0 && sel !== d.c) { const c = sel; place(c, +z.dataset.zi); focusChip(c); return; }
          sel = sel === d.c ? -1 : d.c; api.sfx?.tap?.(); render(); focusChip(d.c);
        }
      };
      play.addEventListener('pointerup', endDrag);
      play.addEventListener('pointercancel', endDrag);
      play.addEventListener('click', e => {
        const tab = e.target.closest('.lec-tab');
        if (tab) { at = +tab.dataset.tab; sel = -1; render(); return; }
        if (locked || e.target.closest('.lec-chip')) return;
        const z = e.target.closest('.lec-zone');
        if (z && sel >= 0) { place(sel, +z.dataset.zi); return; }
        if (e.target.closest('.lec-pool') && sel >= 0) place(sel, -1);
      });
      // Las teclas que usa el juego no siguen hasta la lección (allá Enter comprueba y las flechas cambian de ejercicio).
      play.addEventListener('keydown', e => {
        const act = e.key === 'Enter' || e.key === ' ';
        const tab = e.target.closest('.lec-tab');
        if (tab) {
          const to = typeof rovingIndex === 'function' ? rovingIndex(e.key, at, rs.length) : -1;
          if (to < 0) { if (act) e.stopPropagation(); return; }
          e.preventDefault(); e.stopPropagation(); at = to; sel = -1; render();
          play.querySelector(`.lec-tab[data-tab="${at}"]`)?.focus();
          return;
        }
        if (!act || locked) return;
        const ch = e.target.closest('.lec-chip'), z = e.target.closest('.lec-zone');
        if (ch && !(z && sel >= 0 && sel !== +ch.dataset.c)) {
          e.preventDefault(); e.stopPropagation();
          const c = +ch.dataset.c; sel = sel === c ? -1 : c; render(); focusChip(c);
        } else if (z && sel >= 0) {
          e.preventDefault(); e.stopPropagation();
          const c = sel; place(c, +z.dataset.zi); focusChip(c);
        } else if (e.target.closest('.lec-pool') && sel >= 0) {
          e.preventDefault(); e.stopPropagation();
          const c = sel; place(c, -1); focusChip(c);
        }
      });
      guardKeys(box);
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => JSON.parse(JSON.stringify(st)),
        lock(ok) { locked = true; okAll = ok; sel = -1; render(); },
        destroy() { drag?.ghost?.remove(); box.remove(); },
        // Para el robot del navegador: la ronda, el estado y la jugada de la clave.
        // Una zona de cupo 1 recibe una sola ficha: si la clave admite varias zonas (los renglones de un resumen), cada ficha toma una libre.
        peek: () => ({ at, state: st, solve: rs.map(r => { const used = new Set(); return r.key.map(k => { const z = keyOf(k).find(z => r.zones[z].cap !== 1 || !used.has(z)) ?? -1; used.add(z); return z; }); }) }),
      };
    }
    return { grade, create };
  }

  // Relación que dibuja cada conector (conector-bisagra): se ve en vivo, no dice si es la que pide el texto.
  const REL = [
    [/^(pero|sin embargo|no obstante|aunque|en cambio|mientras que|por el contrario)/i, '↔', 'contraste'],
    [/^(por eso|por tanto|por lo tanto|así que|en consecuencia|de modo que|de ahí que)/i, '→', 'consecuencia'],
    [/^(porque|ya que|puesto que|dado que|pues)/i, '←', 'causa'],
    [/^(además|también|asimismo|incluso|más aún)/i, '+', 'suma'],
    [/^(por ejemplo|es decir|o sea|en otras palabras)/i, '=', 'aclara o ejemplifica'],
    [/^(en conclusión|en suma|en resumen|en fin)/i, '∴', 'cierra'],
    [/^(si|siempre que|con tal de que)\b/i, '⇒', 'condición'],
    [/^(después|luego|primero|al final|finalmente|antes|entonces)\b/i, '⇢', 'orden en el tiempo'],
  ];
  const rel = w => { const m = REL.find(([re]) => re.test(String(w).trim())); return m ? { sym: m[1], name: m[2] } : { sym: '·', name: 'otra relación' }; };

  return { esc, fmt, doc, docs, drop, rounds, first, rel, keyOf, guardKeys, mix, sentences, css };
})();
;
//#archivo js/games/pregunta-examen.js
// Pregunta de examen (lectura, kit LEC; spec 2026-11-19-preuda-lectura-textos): el formato real del examen de admisión, con el
// texto arriba en párrafos numerados, el enunciado y cuatro opciones A–D. Se toca una opción. Es el único juego de opción
// múltiple de lectura y va solo en evaluaciones y entrenamiento, nunca en lecciones: el examen es así y hay que practicarlo.
// params = { doc | docs, q, options: [4], answer }
// state = { pick: índice o -1 }
GAMES['pregunta-examen'] = (() => {
  const L = 'ABCD';
  function grade(state, params) {
    return { ok: state?.pick === params.answer, solution: `${L[params.answer]}. ${params.options[params.answer]}` };
  }
  function create(host, params, api) {
    const st = { pick: -1 };
    let locked = false;
    const box = document.createElement('div');
    box.className = 'lec lec-examen';
    box.innerHTML = `${LEC.docs(params)}<div class="lec-play"></div>`;
    host.appendChild(box);
    const play = box.querySelector('.lec-play');
    function render() {
      play.innerHTML = `<p class="lec-q">${LEC.fmt(params.q)}</p><div class="lec-opts" role="radiogroup" aria-label="Opciones">${params.options.map((o, i) => {
        const cls = locked ? (i === params.answer ? ' good' : i === st.pick ? ' bad' : '') : i === st.pick ? ' on' : '';
        return `<span class="lec-opt${cls}" role="radio" tabindex="${locked ? -1 : (st.pick < 0 ? (i === 0 ? 0 : -1) : (i === st.pick ? 0 : -1))}" aria-checked="${i === st.pick}" data-i="${i}"><b>${L[i]}.</b><span>${LEC.fmt(o)}</span></span>`;
      }).join('')}</div>`;
    }
    const pick = i => { st.pick = i; api.sfx?.tap?.(); render(); play.querySelector(`.lec-opt[data-i="${i}"]`)?.focus({ preventScroll: true }); api.ready(true); };
    play.addEventListener('click', e => { const o = e.target.closest('.lec-opt'); if (o && !locked) pick(+o.dataset.i); });
    play.addEventListener('keydown', e => {
      const o = e.target.closest('.lec-opt');
      if (!o || locked) return;
      const i = +o.dataset.i, d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); e.stopPropagation(); pick((i + d + 4) % 4); }
      else if (e.key === ' ') { e.preventDefault(); e.stopPropagation(); pick(i); }
    });
    LEC.guardKeys(box);
    render();
    return {
      loaded: Promise.resolve(),
      getState: () => ({ pick: st.pick }),
      lock() { locked = true; render(); },
      destroy() { box.remove(); },
      peek: () => ({ state: st, solve: params.answer }),
    };
  }
  return { grade, create };
})();
;
//#archivo js/games/examen-kit.js
// Zona de examen del Preuniversitario, razonamiento lógico (spec 2026-11-20-preuda-razonamiento-diez). Tres juegos HTML que
// ponen el concepto de la lección en un problema como los del examen, cada uno con un gesto distinto:
//   completa-solucion  el problema y su solución con huecos: se arrastran las fichas a los huecos (un toque la manda al primer hueco libre).
//                      params = { q, lines: ['… [[valor]] …'], extra: [fichas que sobran] }   state = { fill: [texto | null] }
//   caza-error         una solución con un paso equivocado: se toca el paso y se le arrastra encima la corrección.
//                      params = { q, steps: [texto], wrong, fixes: [texto], fix }             state = { line, fix }
//   opcion-examen      la pregunta en el formato real, con opciones A–D.
//                      params = { q, options: [4], answer }                                    state = { pick }
// Los textos llevan TeX entre $…$. En `lines`, los huecos [[…]] van fuera de las fórmulas.
const EXQ = (() => {
  // «30 %» no se parte entre dos renglones.
  const T = s => { s = String(s).replace(/(\d) %/g, '$1 %'); return typeof tex === 'function' ? tex(s) : s; };
  const TAG = '<p class="exq-tag"><i></i>Como en el examen</p>';
  const head = p => `${TAG}<div class="exq-q">${T(p.q)}</div>`;
  const BL = /\[\[(.+?)\]\]/g;
  const blanksOf = p => p.lines.flatMap(l => [...l.matchAll(BL)].map(m => m[1]));
  // Orden fijo y revuelto (no depende del azar: la misma ficha queda siempre en el mismo sitio).
  const mix = (list, seed) => {
    const h = s => { let x = 2166136261 ^ seed; for (const ch of s) x = Math.imul(x ^ ch.charCodeAt(0), 16777619); return x >>> 0; };
    return list.map((t, i) => [h(`${t}#${i}`), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  };
  const box = (host, cls) => { const b = document.createElement('div'); b.className = `exq ${cls}`; host.appendChild(b); return b; };

  // Arrastre de fichas con el dedo o el ratón. onDrop(ficha, elemento bajo el dedo); un toque sin mover llama onTap(ficha).
  function drag(root, sel, { onDrop, onTap, live }) {
    let d = null;
    root.addEventListener('pointerdown', e => {
      const el = e.target.closest(sel);
      if (!el || !live() || d) return;
      d = { el, id: e.pointerId, x: e.clientX, y: e.clientY, ghost: null };
    });
    const move = e => {
      if (!d || e.pointerId !== d.id) return;
      // En una bandeja que se desliza de lado (touch-action: pan-x), el gesto horizontal es del navegador.
      const lado = e.pointerType === 'touch' && Math.abs(e.clientX - d.x) > Math.abs(e.clientY - d.y) && getComputedStyle(d.el).touchAction === 'pan-x';
      if (!d.ghost && !lado && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 7) {
        const r = d.el.getBoundingClientRect();
        d.ghost = d.el.cloneNode(true);
        d.ghost.classList.add('exq-ghost');
        Object.assign(d.ghost.style, { width: `${r.width / zk()}px`, left: `${r.left / zk()}px`, top: `${r.top / zk()}px` });
        d.ox = e.clientX - r.left; d.oy = e.clientY - r.top;
        document.body.appendChild(d.ghost);
        d.el.classList.add('lift');
      }
      if (d.ghost) {
        e.preventDefault();
        d.ghost.style.left = `${(e.clientX - d.ox) / zk()}px`; d.ghost.style.top = `${(e.clientY - d.oy) / zk()}px`;
        const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-drop]');
        root.querySelectorAll('.over').forEach(o => o !== over && o.classList.remove('over'));
        if (over && root.contains(over)) over.classList.add('over');
      }
    };
    const up = e => {
      if (!d || e.pointerId !== d.id) return;
      const { el, ghost } = d; d = null;
      el.classList.remove('lift');
      root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
      if (!ghost) return;     // sin arrastre: el click normal hace de toque
      ghost.remove();
      if (!live() || e.type === 'pointercancel') return;
      const over = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-drop]');
      root.dataset.dragged = '1'; setTimeout(() => { delete root.dataset.dragged; }, 60);
      if (over && root.contains(over)) onDrop(el, over);
    };
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    root.addEventListener('click', e => {
      if (root.dataset.dragged || !live()) return;
      const el = e.target.closest(sel);
      if (el) onTap(el);
    });
    return () => { d?.ghost?.remove(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); };
  }

  // ── completa-solucion ──────────────────────────────────────────────────────────────────────────────────────────────
  const completa = {
    grade(state, params) {
      const bl = blanksOf(params);
      return { ok: bl.every((b, i) => state?.fill?.[i] === b), solution: params.lines.map(l => l.replace(BL, '$1')).join(' · ') };
    },
    solve: params => ({ fill: blanksOf(params) }),
    create(host, params, api) {
      const bl = blanksOf(params), chips = [...bl, ...(params.extra || [])], order = mix(chips, params.q.length);
      const fill = bl.map(() => -1);      // índice de la ficha puesta en cada hueco
      let locked = false;
      const b = box(host, 'exq-completa');
      const used = c => fill.includes(c);
      function render() {
        let n = 0;
        const line = l => l.split(BL).map((s, i) => {
          if (i % 2 === 0) return T(s);
          const k = n++, c = fill[k];
          const cls = locked ? (c >= 0 && chips[c] === bl[k] ? ' good' : ' bad') : c >= 0 ? ' full' : '';
          return `<button type="button" class="exq-blank${cls}" data-drop data-b="${k}" aria-label="hueco ${k + 1}${c >= 0 ? `: ${chips[c]}` : ', vacío'}">${locked ? T(bl[k]) : c >= 0 ? T(chips[c]) : ''}</button>`;
        }).join('');
        const tray = order.filter(c => !used(c)).map(c => `<button type="button" class="exq-chip" data-c="${c}">${T(chips[c])}</button>`).join('');
        b.innerHTML = `${head(params)}<ol class="exq-sol">${params.lines.map(l => `<li>${line(l)}</li>`).join('')}</ol>
          ${locked ? '' : `<div class="exq-tray" data-drop data-tray aria-label="Fichas">${tray || '<span class="exq-empty">Toca un hueco para devolver su ficha</span>'}</div>`}`;
      }
      const put = (c, k) => { const was = fill.indexOf(c); if (was >= 0) fill[was] = -1; fill[k] = c; after(); };
      const after = () => { api.sfx?.tap?.(); render(); api.ready(fill.every(c => c >= 0)); };
      const off = drag(b, '.exq-chip, .exq-blank.full', {
        live: () => !locked,
        onDrop(el, over) {
          const c = el.dataset.c != null ? +el.dataset.c : fill[+el.dataset.b];
          if (over.dataset.b != null) put(c, +over.dataset.b);
          else if (over.dataset.tray != null && el.dataset.b != null) { fill[+el.dataset.b] = -1; after(); }
        },
        onTap(el) {
          if (el.dataset.c != null) {
            const free = fill.indexOf(-1);
            if (free >= 0) put(+el.dataset.c, free);
          } else { fill[+el.dataset.b] = -1; after(); }
        },
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ fill: fill.map(c => (c >= 0 ? chips[c] : null)) }),
        lock() { locked = true; render(); },
        destroy() { off(); b.remove(); },
        peek: () => ({ fill, chips, solve: bl }),
      };
    },
  };

  // ── caza-error ─────────────────────────────────────────────────────────────────────────────────────────────────────
  const caza = {
    grade(state, params) {
      return { ok: state?.line === params.wrong && state?.fix === params.fix, solution: `El error está en el paso ${params.wrong + 1}. Debía ser: ${params.fixes[params.fix]}` };
    },
    solve: params => ({ line: params.wrong, fix: params.fix }),
    create(host, params, api) {
      const st = { line: -1, fix: -1 };
      let locked = false;
      const order = mix(params.fixes, params.q.length + 7);
      const b = box(host, 'exq-caza');
      function render() {
        const steps = params.steps.map((s, i) => {
          const on = i === st.line, fixed = on && st.fix >= 0;
          const cls = locked ? (i === params.wrong ? ' good' : on ? ' bad' : '') : on ? ' on' : '';
          const show = locked && i === params.wrong ? params.fixes[params.fix] : fixed ? params.fixes[st.fix] : null;
          return `<li><button type="button" class="exq-step${cls}" data-drop data-i="${i}" aria-pressed="${on}"><span class="exq-n">${i + 1}</span><span class="exq-t">${show != null ? `<s>${T(s)}</s><b>${T(show)}</b>` : T(s)}</span></button></li>`;
        }).join('');
        const tray = st.line < 0 ? '<span class="exq-empty">Toca el paso que no se justifica</span>'
          : order.map(f => `<button type="button" class="exq-chip wide${f === st.fix ? ' on' : ''}" data-f="${f}">${T(params.fixes[f])}</button>`).join('');
        b.innerHTML = `${head(params)}<p class="exq-sub">Esta solución tiene <b>un paso equivocado</b>.</p><ol class="exq-steps">${steps}</ol>
          ${locked ? '' : `<p class="exq-sub">${st.line < 0 ? '' : 'Arrastra al paso cómo debía quedar:'}</p><div class="exq-tray col">${tray}</div>`}`;
      }
      const after = () => { api.sfx?.tap?.(); render(); api.ready(st.line >= 0 && st.fix >= 0); };
      const off = drag(b, '.exq-chip, .exq-step', {
        live: () => !locked,
        onDrop(el, over) { if (el.dataset.f != null && over.dataset.i != null) { st.line = +over.dataset.i; st.fix = +el.dataset.f; after(); } },
        onTap(el) {
          if (el.dataset.f != null) st.fix = +el.dataset.f;
          else { const i = +el.dataset.i; if (st.line !== i) { st.line = i; st.fix = -1; } }
          after();
        },
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ ...st }),
        lock() { locked = true; render(); },
        destroy() { off(); b.remove(); },
        peek: () => ({ state: st, solve: { line: params.wrong, fix: params.fix } }),
      };
    },
  };

  // ── opcion-examen ──────────────────────────────────────────────────────────────────────────────────────────────────
  const L = 'ABCD';
  const opcion = {
    grade(state, params) { return { ok: state?.pick === params.answer, solution: `${L[params.answer]}. ${params.options[params.answer]}` }; },
    solve: params => ({ pick: params.answer }),
    create(host, params, api) {
      const st = { pick: -1 };
      let locked = false;
      const b = box(host, 'exq-opcion');
      function render() {
        b.innerHTML = `${head(params)}<div class="exq-opts" role="radiogroup" aria-label="Opciones">${params.options.map((o, i) => {
          const cls = locked ? (i === params.answer ? ' good' : i === st.pick ? ' bad' : '') : i === st.pick ? ' on' : '';
          return `<button type="button" class="exq-opt${cls}" role="radio" aria-checked="${i === st.pick}" data-i="${i}"><b>${L[i]}</b><span>${T(o)}</span></button>`;
        }).join('')}</div>`;
      }
      b.addEventListener('click', e => {
        const o = e.target.closest('.exq-opt');
        if (!o || locked) return;
        st.pick = +o.dataset.i; api.sfx?.tap?.(); render(); api.ready(true);
        b.querySelector(`.exq-opt[data-i="${st.pick}"]`)?.focus({ preventScroll: true });
      });
      render();
      return {
        loaded: Promise.resolve(),
        getState: () => ({ ...st }),
        lock() { locked = true; render(); },
        destroy() { b.remove(); },
        peek: () => ({ state: st, solve: params.answer }),
      };
    },
  };

  return { completa, caza, opcion, blanksOf, drag };
})();
;
//#archivo js/games/completa-solucion.js
// Zona de examen del Preuniversitario (spec 2026-11-20-preuda-razonamiento-diez). El juego está en examen-kit.js (EXQ.completa),
// con los otros dos formatos «como en el examen»: comparten el rótulo, el estilo (css/examen.css) y el arrastre de fichas.
GAMES['completa-solucion'] = EXQ.completa;
;
//#archivo js/games/caza-error.js
// Zona de examen del Preuniversitario (spec 2026-11-20-preuda-razonamiento-diez). El juego está en examen-kit.js (EXQ.caza),
// con los otros dos formatos «como en el examen»: comparten el rótulo, el estilo (css/examen.css) y el arrastre de fichas.
GAMES['caza-error'] = EXQ.caza;
;
//#archivo js/games/opcion-examen.js
// Zona de examen del Preuniversitario (spec 2026-11-20-preuda-razonamiento-diez). El juego está en examen-kit.js (EXQ.opcion),
// con los otros dos formatos «como en el examen»: comparten el rótulo, el estilo (css/examen.css) y el arrastre de fichas.
GAMES['opcion-examen'] = EXQ.opcion;
;
//#archivo js/games/geo-escena-1.js
// Ejercicios de «Ángulos y paralelas» (pu-ge-1) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const gr = n => `${Math.round(n)}°`, rad = g => g * Math.PI / 180;

  // Un rayo parte la media vuelta: un ángulo debe ser k veces el otro.  v { a }
  const O = [170, 160];
  XG.figura('vecinos-razon', {
    ini: () => ({ a: 90 }),
    manijas: () => [{ k: 'a', min: 12, max: 168, paso: 3, inv: true, en: v => XPK.at(...O, 120, v.a), de: (x, y) => (y > O[1] ? (x < O[0] ? 180 : 0) : Math.atan2(O[1] - y, x - O[0]) * 180 / Math.PI) }],
    ok: (v, p) => v.a === p.k * (180 - v.a),
    sol: p => ({ a: 180 * p.k / (p.k + 1) }),
    texto: p => `$${p.k + 1}x = 180^\\circ$: miden $${180 / (p.k + 1)}^\\circ$ y $${180 * p.k / (p.k + 1)}^\\circ$`,
    alto: () => 190,
    dib(v, K, p, f) {
      const R = K.at(...O, 120, v.a), D = [305, O[1]], I = [35, O[1]], o = 180 - v.a, M = K.at(O[0], O[1] + 5, 54, v.a + o / 2);
      let cortes = '';
      for (let g = o, n = 1; f && g * n < v.a - 0.5 && n < 9; n++) cortes += K.l(...O, ...K.at(...O, 70, v.a - g * n), 'lg d');
      return K.ang(O, D, R, 44, gr(v.a), 'fa', 'ta') + K.ang(O, R, I, 36, '', 'fg') + K.f(f, cortes) + K.t(...M, f > 0.5 ? gr(o) : '?', 'tg') + K.l(...I, ...D) + K.l(...O, ...R, 'la gr') + K.c(...O, 4, 'fk');
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${180 - Math.round(v.a)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (v.a === 180 - 180 / p.k ? `Son ${p.k + 1} partes: ${p.k} de uno y una del otro.` : v.a > p.k * (180 - v.a) ? `Es más de ${p.k} veces el dorado.` : `No llega a ${p.k} veces el dorado.`),
    bien: (v, p) => `Son ${p.k + 1} partes iguales: ${p.k} de un lado y una del otro.`,
  });

  // Complementario, suplementario y opuesto por el vértice del mismo ángulo.
  XG.rotula('tres-parientes', {
    slots: () => [{ x: 130, y: 42, w: 58, h: 38 }, { x: 130, y: 112, w: 58, h: 38 }, { x: 130, y: 182, w: 58, h: 38 }],
    fichas: p => p.fichas, metas: p => [90 - p.a, 180 - p.a, p.a].map(gr),
    texto: p => `complementario $${90 - p.a}^\\circ$, suplementario $${180 - p.a}^\\circ$, opuesto $${p.a}^\\circ$`,
    alto: () => 214,
    fondo(K, p) {
      const a = p.a, e = (y, t) => K.t(6, y + 5, t, 's', 'start'), V = [215, 70], W = [246, 138], C = [246, 188], P = (c, r, g) => K.at(...c, r, g), dato = c => K.t(...P([c[0], c[1] + 5], 58, a / 2), gr(a), 's ta');
      return e(42, 'complementario') + e(112, 'suplementario') + e(182, 'opuesto')
        + K.ang(V, P(V, 50, 0), P(V, 50, a), 36, '', 'fa') + K.ang(V, P(V, 50, a), P(V, 50, 90), 24, '', 'fg') + K.l(...V, ...P(V, 100, 0)) + K.l(...V, ...P(V, 58, 90)) + K.l(...V, ...P(V, 80, a), 'la') + dato(V)
        + K.ang(W, P(W, 50, 0), P(W, 50, a), 36, '', 'fa') + K.ang(W, P(W, 50, a), P(W, 50, 180), 20, '', 'fg') + K.l(176, W[1], 330, W[1]) + K.l(...W, ...P(W, 74, a), 'la') + dato(W)
        + K.ang(C, P(C, 50, 0), P(C, 50, a), 34, '', 'fa') + K.ang(C, P(C, 50, 180), P(C, 50, 180 + a), 34, '', 'fg') + K.l(176, C[1], 330, C[1]) + K.l(...P(C, 56, a), ...P(C, 52, 180 + a), 'la') + dato(C);
    },
    aviso(q, p) { return q[0][0] === gr(180 - p.a) ? 'Complementarios: juntos hacen la esquina recta, 90°.' : q[2][0] !== gr(p.a) ? 'Los opuestos por el vértice abren lo mismo.' : 'Mira qué completan: una esquina recta o media vuelta.'; },
    bien: () => 'Uno completa 90°, otro 180° y el opuesto es igual.',
  });

  // Dos paralelas y una transversal: con un ángulo se conocen los demás.
  const metasCruce = p => [p.a, p.a, 180 - p.a, p.a].map(gr);
  XG.rotula('cruce-ocho', {
    slots: () => [{ x: 288, y: 28, w: 58, h: 36 }, { x: 60, y: 94, w: 58, h: 36 }, { x: 270, y: 94, w: 58, h: 36 }, { x: 52, y: 192, w: 58, h: 36 }],
    fichas: p => p.fichas, metas: metasCruce,
    texto: p => `los iguales miden $${p.a}^\\circ$ y el conjugado, $${180 - p.a}^\\circ$`,
    alto: () => 218,
    fondo(K, p) {
      const t = Math.tan(rad(p.a)), Y1 = 62, Y2 = 160, X = y => 168 + (110 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], up = [X(14), 14], dn = [X(208), 208], d = (W, s) => [W[0] + 100 * s, W[1]];
      return K.ang(Q, d(Q, 1), P, 28, gr(p.a), 'fa', 'ta') + K.ang(P, d(P, 1), up, 24, '', 'fg') + K.ang(P, d(P, -1), Q, 24, '', 'ff') + K.ang(P, d(P, 1), Q, 18, '', 'fo') + K.ang(Q, d(Q, -1), dn, 24, '', 'fg')
        + K.l(10, Y1, 330, Y1) + K.l(10, Y2, 330, Y2) + K.l(...up, ...dn, 'la gr')
        + K.l(258, 36, P[0] + 22, 50, 'lg d') + K.l(90, 90, P[0] - 22, 72, 'lf d') + K.l(240, 90, P[0] + 18, 72, 'lo d') + K.l(82, 188, Q[0] - 20, 172, 'lg d');
    },
    aviso(q, p) { const m = metasCruce(p); return q[2][0] === m[0] ? 'Los dos de adentro y del mismo lado no son iguales: suman 180°.' : q[1][0] !== m[1] ? 'Los alternos internos forman una Z y son iguales.' : q[3][0] !== m[3] ? 'Los opuestos por el vértice son iguales.' : 'Los de la misma esquina, en cada cruce, son iguales.'; },
    bien: () => 'Solo hay dos medidas: las iguales y la que completa 180°.',
  });

  // Conjugados internos: el de arriba mide `dif` más que el de abajo.  v { a }
  const Y1 = 64, Y2 = 156;
  XG.figura('conjugados-justos', {
    ini: () => ({ a: 90 }),
    manijas: () => [{ k: 'a', min: 40, max: 140, paso: 5, inv: true, en: v => [170 + 86 / Math.tan(rad(v.a)), 24], de: x => Math.atan2(86, x - 170) * 180 / Math.PI }],
    ok: (v, p) => 180 - v.a === v.a + p.dif,
    sol: p => ({ a: (180 - p.dif) / 2 }),
    texto: p => `$x + (x + ${p.dif}) = 180$: miden $${(180 - p.dif) / 2}^\\circ$ y $${(180 + p.dif) / 2}^\\circ$`,
    alto: () => 206, pie: 'Arrastra la punta de la transversal.',
    dib(v, K, p, f) {
      const t = Math.tan(rad(v.a)), X = y => 170 + (110 - y) / t, P = [X(Y1), Y1], Q = [X(Y2), Y2], d = W => [W[0] + 100, W[1]];
      return K.ang(P, d(P), Q, 24, f > 0.5 ? gr(180 - v.a) : '?', 'fg', 'tg') + K.ang(Q, d(Q), P, 24, gr(v.a), 'fa', 'ta') + K.l(14, Y1, 326, Y1) + K.l(14, Y2, 326, Y2) + K.l(X(24), 24, X(198), 198, 'la gr');
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${180 - Math.round(v.a)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (v.a === (180 + p.dif) / 2 ? 'Al revés: el mayor debe ser el dorado.' : `El dorado mide ${180 - v.a}° y el de abajo ${v.a}°: no se llevan ${p.dif}°.`),
    bien: (v, p) => `${180 - v.a}° es ${p.dif}° más que ${v.a}°, y juntos dan 180°.`,
  });

  // Los dos ángulos de la base: iguales, y que arriba quede el pedido.  v { a, b }
  const T = v => { const ta = Math.tan(rad(v.a)), tb = Math.tan(rad(v.b)), x = 190 * tb / (ta + tb); return [[75, 178], [265, 178], [75 + x, 178 - x * ta]]; };
  const medio = (P, Q) => [P[0] + (Q[0] - P[0]) * 0.68, P[1] + (Q[1] - P[1]) * 0.68];
  XG.figura('tercer-angulo', {
    ini: () => ({ a: 34, b: 44 }),
    manijas: () => [{ k: 'a', min: 30, max: 58, paso: 2, r: 9, en: v => medio(T(v)[0], T(v)[2]), de: (x, y) => Math.atan2(178 - y, x - 75) * 180 / Math.PI },
      { k: 'b', min: 30, max: 58, paso: 2, r: 9, en: v => medio(T(v)[1], T(v)[2]), de: (x, y) => Math.atan2(178 - y, 265 - x) * 180 / Math.PI }],
    ok: (v, p) => v.a === v.b && 180 - v.a - v.b === p.top,
    sol: p => ({ a: (180 - p.top) / 2, b: (180 - p.top) / 2 }),
    texto: p => `$180^\\circ - ${p.top}^\\circ = ${180 - p.top}^\\circ$, y la mitad es $${(180 - p.top) / 2}^\\circ$`,
    alto: () => 200, pie: 'Arrastra los dos lados para abrir los ángulos de abajo.',
    dib(v, K, p, f) {
      const [A, B, C] = T(v);
      return K.ang(A, B, C, 34, gr(v.a), 'fa', 'ta') + K.ang(B, C, A, 34, gr(v.b), 'fg', 'tg') + K.ang(C, A, B, 20, f > 0.5 ? gr(180 - v.a - v.b) : '?', 'ff', 'tf') + K.pl([A, B, C, A]);
    },
    lee: v => `$${Math.round(v.a)}^\\circ + ${Math.round(v.b)}^\\circ + ${Math.round(180 - v.a - v.b)}^\\circ = 180^\\circ$`,
    aviso: (v, p) => (180 - v.a - v.b === p.top ? 'Arriba quedó bien, pero los de abajo debían ser iguales.' : v.a !== v.b ? 'Los de abajo deben ser iguales, y los tres suman 180°.' : `Arriba quedaron ${180 - v.a - v.b}°, no ${p.top}°.`),
    bien: () => 'Lo que falta para 180° se reparte por igual entre los dos de abajo.',
  });

  // Ángulo exterior: se corre el vértice B por el piso; se lee el ángulo de arriba.  v { c }
  const AC = 108, A0 = [60, 172];
  const EX = (v, p) => [A0[0] + AC * Math.sin(rad(v.c)) / Math.sin(rad(180 - p.a - v.c)), 172];
  XG.figura('exterior-alcanza', {
    ini: () => ({ c: 30 }),
    manijas: p => [{ k: 'c', min: 20, max: 75, paso: 5, en: v => EX(v, p), de(x) { let m = 20, e = 1e9; for (let c = 20; c <= 75; c += 5) { const q = Math.abs(EX({ c }, p)[0] - x); if (q < e) { e = q; m = c; } } return m; } }],
    ok: (v, p) => v.c + p.a === p.ext,
    sol: p => ({ c: p.ext - p.a }),
    texto: p => `$${p.ext}^\\circ - ${p.a}^\\circ = ${p.ext - p.a}^\\circ$`,
    alto: () => 205, pie: 'Arrastra el vértice de la derecha por el piso.',
    dib(v, K, p, f) {
      const C = K.at(...A0, AC, p.a), B = EX(v, p);
      return K.ang(A0, B, C, 30, gr(p.a), 'fa', 'ta') + K.ang(C, A0, B, 26, gr(v.c), 'ff', 'tf') + K.ang(B, [B[0] + 60, 172], C, 24, f > 0.5 ? gr(p.a + v.c) : '?', 'fo', 'to') + K.l(A0[0], 172, Math.min(334, B[0] + 90), 172, 'lm') + K.pl([A0, B, C, A0]);
    },
    lee: (v, p) => `$${p.a}^\\circ + ${Math.round(v.c)}^\\circ = ${Math.round(p.a + v.c)}^\\circ$`,
    aviso: (v, p) => (v.c === 180 - p.ext ? 'Ese es el vecino del exterior, el de adentro.' : `El exterior quedó en ${p.a + v.c}°.`),
    bien: () => 'El exterior reúne los dos ángulos lejanos.',
  });

  // Polígono regular: cuántos lados para que cada ángulo mida lo pedido.  v { n }
  XG.figura('poligono-regular', {
    ini: () => ({ n: 4 }),
    manijas: () => [{ k: 'n', min: 3, max: 20, paso: 1, et: 'lados' }],
    ok: (v, p) => (v.n - 2) * 180 === p.ang * v.n,
    sol: p => ({ n: 360 / (180 - p.ang) }),
    texto(p) { const n = 360 / (180 - p.ang); return `$(${n} - 2) \\cdot 180^\\circ \\div ${n} = ${p.ang}^\\circ$`; },
    alto: () => 246, pie: 'Arrastra el número de lados.',
    dib(v, K, p, f) {
      const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 92, 80, 90 + i * 360 / n));
      let h = '';
      for (let i = 1; i < n - 1; i++) h += K.f(f * (n - 2) - i + 1, K.p([P[0], P[i], P[i + 1]], ['fa', 'fg', 'ff', 'fo'][i % 4]));
      return h + K.p(P, 'fn') + K.t(8, 18, `${n} lados`, 'tm', 'start') + K.f(f * 2 - 1, K.t(332, 18, `${n - 2} ${n === 3 ? 'triángulo' : 'triángulos'}`, 'ta', 'end'));
    },
    lee: v => { const n = Math.round(v.n), a = (n - 2) * 180 / n; return `$${(n - 2) * 180}^\\circ \\div ${n} ${Number.isInteger(a) ? '=' : '\\approx'} ${Math.round(a * 10) / 10}^\\circ$`; },
    aviso: (v, p) => ((v.n - 2) * 180 < p.ang * v.n ? 'Cada ángulo quedó más cerrado: con más lados se abren.' : 'Cada ángulo quedó más abierto: tiene demasiados lados.'),
    bien: v => `${v.n - 2} triángulos, repartidos entre ${v.n} ángulos iguales.`,
  });

  // En movimiento: el rayo del faro sale con el ángulo que se le da (de 5 en 5).
  XG.tiros('lanza-angulo', {
    perilla: () => ({ et: 'Ángulo', min: 0, max: 36, cara: v => v * 5, lee: v => `${v * 5}°` }),
    meta: t => t.r / 5, alto: 178, ms: 1500,
    dib(t, v, K, p, f) {
      const C = [170, 156];
      let h = K.arc(...C, 128, 0, 180, 'lm');
      for (let g = 0; g <= 180; g += 15) h += K.l(...K.at(...C, g % 45 ? 124 : 119, g), ...K.at(...C, 128, g), 'lm');
      h += K.l(24, 156, 316, 156);
      if (v != null) {
        const a = v * 5 * Math.min(1, f * 1.5), u = Math.max(0, f * 3 - 2);
        h += K.sec(...C, 34, 0, a, 'fa') + K.l(...C, ...K.at(...C, 40 + 88 * u, a), 'la gr') + K.f(f * 3 - 2, (v * 5 === t.r ? K.c(...K.at(...C, 138, t.r), 6, 'fo') : '') + K.t(...K.at(170, 161, 60, Math.max(16, Math.min(164, v * 2.5))), `${v * 5}°`, 'ta'));
      }
      return h + K.c(...C, 6, 'fk');
    },
    falla: (t, v) => (t.e?.[v * 5] || (v * 5 > t.r ? 'Abrió demasiado.' : 'Le faltó abrir.')),
    cuenta: t => `$${t.c} = ${t.r}^\\circ$`, pie: 'Estira el ángulo y suelta: sale el rayo.',
  });
})();
;
//#archivo js/games/geo-escena-2.js
// Ejercicios de «Triángulos y Pitágoras» (pu-ge-2) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100);
  // Catetos sobre cuadrícula: el cuadrado de la hipotenusa debe valer c2, con los dos catetos mayores que `mas`.  v { a, b }
  const U = 7.4, OX = 100, OY = 150, P = (x, y) => [OX + x * U, OY - y * U];
  const cuadrado = p => { for (let a = p.mas + 1; a < 11; a++) for (let b = a; b < 11; b++) if (a * a + b * b === p.c2) return { a, b }; return null; };
  XG.figura('cuadrado-catetos', {
    ini: () => ({ a: 4, b: 4 }),
    manijas: () => [{ k: 'a', min: 1, max: 10, paso: 1, r: 9, en: v => P(0, v.a), de: (x, y) => (OY - y) / U }, { k: 'b', min: 1, max: 10, paso: 1, r: 9, en: v => P(v.b, 0), de: x => (x - OX) / U }],
    ok: (v, p) => v.a ** 2 + v.b ** 2 === p.c2 && Math.min(v.a, v.b) > p.mas,
    sol: cuadrado,
    texto(p) { const s = cuadrado(p); return `$${s.a}^2 + ${s.b}^2 = ${s.a ** 2} + ${s.b ** 2} = ${p.c2}$`; },
    alto: () => 245, pie: 'Arrastra las puntas de los dos catetos.',
    dib(v, K, p, f) {
      const { a, b } = v, A = Math.round(a), B = Math.round(b), ent = a === A && b === B;
      const rej = (x0, y0, n) => { let h = ''; for (let i = 1; i < n; i++) h += K.l(...P(x0 + i, y0), ...P(x0 + i, y0 + n), 'lr') + K.l(...P(x0, y0 + i), ...P(x0 + n, y0 + i), 'lr'); return h; };
      return K.p([P(0, 0), P(b, 0), P(b, -b), P(0, -b)], 'fa') + K.p([P(0, 0), P(0, a), P(-a, a), P(-a, 0)], 'fg') + (ent ? rej(0, -B, B) + rej(-A, 0, A) : '')
        + K.f(f, K.p([P(b, 0), P(0, a), P(a * f, a + b * f), P(b + a * f, b * f)], 'ff')) + K.f(f * 2 - 1, K.t(...P((a + b) / 2, (a + b) / 2 - 0.7), N(a * a + b * b), 'tf'))
        + K.p([P(0, 0), P(b, 0), P(0, a)], 'fc') + K.pl([P(0, 1), P(1, 1), P(1, 0)], 'lm');
    },
    lee: v => `$${Math.round(v.a)}^2 + ${Math.round(v.b)}^2 = ${Math.round(v.a) ** 2 + Math.round(v.b) ** 2}$`,
    aviso: (v, p) => (v.a ** 2 + v.b ** 2 === p.c2 ? `Suma bien, pero un cateto no es mayor que ${p.mas}.` : v.a ** 2 + v.b ** 2 > p.c2 ? 'El cuadrado de la hipotenusa quedó más grande.' : 'El cuadrado de la hipotenusa quedó más chico.'),
    bien: () => 'Los dos cuadrados de los catetos llenan el de la hipotenusa.',
  });

  // Cable tenso de largo c con el pie a b del mástil: cuánto mide el mástil.  v { h }
  const u2 = 6.8, M0 = [130, 206];
  XG.figura('cateto-falta', {
    ini: () => ({ h: 8 }),
    manijas: () => [{ k: 'h', min: 4, max: 28, paso: 1, en: v => [M0[0], M0[1] - v.h * u2], de: (x, y) => (M0[1] - y) / u2 }],
    ok: (v, p) => v.h ** 2 + p.b ** 2 === p.c ** 2,
    sol: p => ({ h: Math.sqrt(p.c ** 2 - p.b ** 2) }),
    texto: p => `$\\sqrt{${p.c}^2 - ${p.b}^2} = \\sqrt{${p.c ** 2 - p.b ** 2}} = ${Math.sqrt(p.c ** 2 - p.b ** 2)}$`,
    alto: () => 234, pie: 'Arrastra la punta del mástil.',
    dib(v, K, p, f) {
      const E = [M0[0] + p.b * u2, M0[1]], top = [M0[0], M0[1] - v.h * u2], k = p.c / Math.hypot(v.h, p.b) * f;
      return K.l(30, M0[1], 310, M0[1], 'lm') + K.l(...M0, ...top, 'gr') + K.t(M0[0] - 14, (M0[1] + top[1]) / 2 + 5, N(v.h), 'ta', 'end') + K.cota(M0[0], 212, E[0], 212, `${p.b}`)
        + (f ? K.l(...E, E[0] + (top[0] - E[0]) * k, E[1] + (top[1] - E[1]) * k, 'lf gr') : K.l(232, 60, 310, 60, 'lf gr')) + K.t(271, 46, `cable: ${p.c}`, 'tf') + K.c(...E, 4, 'fk') + K.pl([[M0[0], M0[1] - 10], [M0[0] + 10, M0[1] - 10], [M0[0] + 10, M0[1]]], 'lm');
    },
    lee: (v, p) => `$${Math.round(v.h)}^2 + ${p.b}^2 = ${Math.round(v.h) ** 2 + p.b ** 2} \\qquad ${p.c}^2 = ${p.c ** 2}$`,
    aviso: (v, p) => (v.h === p.c - p.b ? 'Restaste los lados. Se restan sus cuadrados.' : v.h ** 2 + p.b ** 2 > p.c ** 2 ? 'El cable no alcanza a llegar a la punta.' : 'Sobra cable: no queda tenso.'),
    bien: () => 'El cable llega justo: su cuadrado es la suma de los otros dos.',
  });

  // Tres triángulos de la misma familia, cada uno con un lado por hallar. tri: [{ a, b }, { a, h }, …]
  const falta = t => Math.sqrt(t.h ? t.h ** 2 - t.a ** 2 : t.a ** 2 + t.b ** 2);
  XG.rotula('lados-familia', {
    slots: p => p.tri.map((t, i) => (t.h ? { x: 71 + i * 109, y: 172, w: 54, h: 36 } : { x: 88 + i * 109, y: 60, w: 50, h: 36 })),
    fichas: p => p.fichas, metas: p => p.tri.map(t => String(falta(t))),
    texto: p => p.tri.map(t => (t.h ? `$${t.h}^2 - ${t.a}^2 = ${falta(t)}^2$` : `$${t.a}^2 + ${t.b}^2 = ${falta(t)}^2$`)).join(', '),
    alto: () => 200,
    fondo: (K, p) => p.tri.map((t, i) => {
      const x = 36 + i * 109, y = 140;
      return K.p([[x, y], [x + 70, y], [x, y - 53]], ['fa', 'fg', 'ff'][i]) + K.pl([[x, y - 9], [x + 9, y - 9], [x + 9, y]], 'lm') + K.t(x - 6, y - 22, t.a, '', 'end') + (t.h ? K.t(x + 44, y - 36, t.h, '', 'start') : K.t(x + 35, y + 18, t.b) + K.l(x + 40, y - 32, x + 52, y - 58, 'lm d'));
    }).join(''),
    aviso(q, p) { const t = p.tri.find((t, i) => !t.h && q[i][0] === String(t.a + t.b)); return t ? `${t.a} + ${t.b} es ir por el borde: la hipotenusa es más corta.` : 'Todos son 3-4-5 agrandados: busca por cuánto se multiplicó cada uno.'; },
    bien: () => 'Los tres son un 3-4-5 agrandado.',
  });

  // La cinta que mide la diagonal de un cuadrado: se corta acostada y al comprobar gira 45°.  v { c }
  const u3 = 11, Q = [60, 186];
  XG.figura('diagonal-cuadrado', {
    ini: p => ({ c: p.lado }),
    manijas: p => [{ k: 'c', min: p.lado, max: 2 * p.lado, paso: 0.5, en: v => [Q[0] + v.c * u3, Q[1]], de: x => (x - Q[0]) / u3 }],
    ok: (v, p) => Math.abs(v.c - p.lado * Math.SQRT2) <= 0.25,
    sol: p => ({ c: Math.round(2 * p.lado * Math.SQRT2) / 2 }),
    texto: p => `$${p.lado}\\sqrt{2} \\approx ${Math.round(p.lado * Math.SQRT2 * 10) / 10}$`,
    alto: () => 216, pie: 'Arrastra la punta de la cinta.',
    dib(v, K, p, f) {
      const S = p.lado * u3;
      return K.r(Q[0], Q[1] - S, S, S, 'fc') + K.t(Q[0] - 10, Q[1] - S / 2 + 5, p.lado, 'tm', 'end') + K.l(...Q, ...K.at(...Q, v.c * u3, 45 * f), 'lf gr') + K.c(Q[0] + S, Q[1] - S, 5, f < 1 ? 'fM' : Math.abs(v.c - p.lado * Math.SQRT2) <= 0.25 ? 'fo' : 'ff') + K.t(Q[0] + 10, Q[1] + 24, `cinta: ${N(v.c)}`, 'tf', 'start');
    },
    lee: (v, p) => `$${p.lado}^2 + ${p.lado}^2 = ${2 * p.lado ** 2} \\qquad ${N(v.c)}^2 = ${N(v.c * v.c)}$`,
    aviso: (v, p) => (v.c === 2 * p.lado ? 'Eso es ir por dos lados del borde.' : v.c > p.lado * Math.SQRT2 ? 'La cinta se pasa de la esquina.' : 'La cinta no llega a la esquina.'),
    bien: () => 'La diagonal es el lado por raíz de 2, casi una vez y media.',
  });

  // Medio triángulo equilátero: lado, mitad de la base y altura.
  const eqMetas = p => [`${p.per / 3}`, `${p.per / 6}`, `${p.per / 6}√3`];
  XG.rotula('equilatero-partes', {
    slots: () => [{ x: 64, y: 92, w: 62, h: 36 }, { x: 130, y: 206, w: 62, h: 36 }, { x: 282, y: 128, w: 62, h: 36 }],
    fichas: p => p.fichas, metas: eqMetas,
    texto: p => `lado $${p.per / 3}$, media base $${p.per / 6}$ y altura $${p.per / 6}\\sqrt3$`,
    alto: () => 230,
    fondo(K, p) {
      const A = [90, 178], B = [250, 178], C = [170, 39.4], M = [170, 178];
      return K.p([A, B, C], 'fc') + K.p([A, M, C], 'fa') + K.l(...C, ...M, 'lf gr') + K.ang(A, M, C, 26, '60°', 'fg', 's') + K.pl([[170, 168], [160, 168], [160, 178]], 'lm') + K.l(174, 124, 248, 128, 'lf d') + K.t(170, 22, `perímetro del triángulo grande: ${p.per}`, 's tm');
    },
    aviso(q, p) { const m = eqMetas(p); return q[0][0] !== m[0] ? 'Los tres lados son iguales: reparte el perímetro entre tres.' : q[1][0] !== m[1] ? 'La altura cae en la mitad de la base.' : 'Con 30°, 60° y 90° los lados son x, x√3 y 2x.'; },
    bien: () => 'Medio equilátero: x, x√3 y 2x.',
  });

  // Un punto de la cuadrícula a distancia d de A, en diagonal.  v { x, y }
  const G = 24, GP = (x, y) => [26 + x * G, 232 - y * G];
  const lejos = p => { for (let x = p.A[0] + 1; x <= 12; x++) for (let y = p.A[1] + 1; y <= 9; y++) if ((x - p.A[0]) ** 2 + (y - p.A[1]) ** 2 === p.d ** 2) return { x, y }; return null; };
  XG.figura('a-diez-pasos', {
    ini: () => ({ x: 4, y: 3 }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [12, 9], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 26) / G, (232 - y) / G] }],
    ok: (v, p) => (v.x - p.A[0]) ** 2 + (v.y - p.A[1]) ** 2 === p.d ** 2 && v.x !== p.A[0] && v.y !== p.A[1],
    sol: lejos,
    texto(p) { const s = lejos(p); return `$${s.x - p.A[0]}^2 + ${s.y - p.A[1]}^2 = ${p.d}^2$`; },
    alto: () => 250, pie: 'Arrastra el punto por la cuadrícula.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i <= 12; i++) h += K.l(...GP(i, 0), ...GP(i, 9), 'ls');
      for (let j = 0; j <= 9; j++) h += K.l(...GP(0, j), ...GP(12, j), 'ls');
      const A = GP(...p.A), B = GP(v.x, v.y), C = GP(v.x, p.A[1]);
      if (f) {
        h += K.f(f, Array.from({ length: 31 }, (_, k) => K.at(...A, p.d * G, 3 * k)).filter(q => q[0] < 315 && q[1] > 15).map(q => K.c(...q, 2, 'fo')).join(''))
          + K.f(f, K.p([A, C, B], 'fa') + K.t((A[0] + C[0]) / 2, A[1] + 15, Math.abs(Math.round(v.x - p.A[0])), 's ta') + K.t(C[0] + (v.x > 10 ? -10 : 12), (C[1] + B[1]) / 2 + 5, Math.abs(Math.round(v.y - p.A[1])), 's ta')) + K.l(...A, A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 'lf gr');
      }
      return h + K.c(...A, 6, 'fk') + K.t(A[0] - 10, A[1] - 8, 'A');
    },
    lee: (v, p) => { const a = Math.abs(Math.round(v.x) - p.A[0]), b = Math.abs(Math.round(v.y) - p.A[1]); return `$${a}^2 + ${b}^2 = ${a * a + b * b} \\qquad ${p.d}^2 = ${p.d ** 2}$`; },
    aviso: (v, p) => (v.x === p.A[0] || v.y === p.A[1] ? 'Debe quedar en diagonal.' : Math.abs(v.x - p.A[0]) + Math.abs(v.y - p.A[1]) === p.d ? 'Contaste el camino por la cuadrícula; en línea recta es menos.' : (v.x - p.A[0]) ** 2 + (v.y - p.A[1]) ** 2 > p.d ** 2 ? 'Quedó más lejos.' : 'Quedó más cerca.'),
    bien: () => 'La distancia es la hipotenusa del triángulo de la cuadrícula.',
  });

  // Dos triángulos que comparten la altura: del primero sale la altura y con ella el segundo cable.  v { c }
  const u4 = 6, F = [132, 186], alt = p => Math.sqrt(p.c1 ** 2 - p.b1 ** 2);
  XG.figura('dos-pasos', {
    ini: () => ({ c: 12 }),
    manijas: p => [{ k: 'c', min: 8, max: 40, paso: 1, inv: true, en: v => [F[0] + p.b2 * u4 - v.c * u4, F[1]], de: x => (F[0] + p.b2 * u4 - x) / u4 }],
    ok: (v, p) => v.c ** 2 === alt(p) ** 2 + p.b2 ** 2,
    sol: p => ({ c: Math.hypot(alt(p), p.b2) }),
    texto: p => `altura $\\sqrt{${p.c1}^2 - ${p.b1}^2} = ${alt(p)}$ y cable $\\sqrt{${alt(p)}^2 + ${p.b2}^2} = ${Math.hypot(alt(p), p.b2)}$`,
    alto: () => 222, pie: 'Arrastra la punta del cable que está en el suelo.',
    dib(v, K, p, f) {
      const h = alt(p), top = [F[0], F[1] - h * u4], B = [F[0] + p.b2 * u4, F[1]], g = Math.atan2(h, p.b2) * 180 / Math.PI;
      return K.l(6, F[1], 330, F[1], 'lm') + K.l(...F, ...top, 'gr') + K.l(F[0] - p.b1 * u4, F[1], ...top, 'la gr') + K.t(F[0] - p.b1 * u4 / 2 - 14, F[1] - h * u4 / 2, p.c1, 'ta', 'end') + K.cota(F[0] - p.b1 * u4, 196, F[0], 196, p.b1) + K.cota(F[0], 196, B[0], 196, p.b2)
        + K.l(...B, ...K.at(...B, v.c * u4, 180 - g * f), 'lf gr') + K.t(B[0] + 30, 60, `cable: ${N(v.c)}`, 'tf', 'end') + K.f(f, K.t(F[0] + 8, F[1] - h * u4 / 2 + 22, h, 'tm', 'start')) + K.c(...top, 5, f < 1 ? 'fM' : Math.abs(v.c - Math.hypot(h, p.b2)) < 0.1 ? 'fo' : 'ff');
    },
    lee: (v, p) => `$${alt(p)}^2 + ${p.b2}^2 = ${alt(p) ** 2 + p.b2 ** 2} \\qquad ${Math.round(v.c)}^2 = ${Math.round(v.c) ** 2}$`,
    aviso: (v, p) => (v.c === alt(p) + p.b2 ? 'Sumaste los lados; se suman los cuadrados.' : v.c === p.c1 ? 'Ese es el otro cable: este tiene el pie más lejos.' : v.c > Math.hypot(alt(p), p.b2) ? 'Sobra cable.' : 'El cable no llega a la punta.'),
    bien: () => 'Primero la altura, que comparten los dos; después el otro cable.',
  });

  // En movimiento: una cuerda sale y debe medir justo el lado que falta. tiro: { a, b, r } (hipotenusa) o { h, b, r } (cateto)
  XG.tiros('lanza-cuerda', {
    perilla: () => ({ et: 'Cuerda', min: 0, max: 50, lee: v => `${v} m` }),
    meta: t => t.r, alto: 196, ms: 1500,
    dib(t, v, K, p, f) {
      const hip = t.a != null, a = hip ? t.a : t.r, b = t.b, u = Math.min(128 / a, 190 / b), A = [80, 168], B = [80 + b * u, 168], C = [80, 168 - a * u], [D, E] = hip ? [B, C] : [A, C], k = v == null ? 0 : v * f / t.r;
      return K.l(20, 168, 330, 168, 'lm') + K.pl([[80, 158], [90, 158], [90, 168]], 'lm') + (hip ? K.l(...A, ...C, 'gr') + K.t(68, (A[1] + C[1]) / 2 + 5, a, 'ta', 'end') : K.l(...B, ...C, 'gr') + K.t((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2 - 6, t.h, 'ta', 'start')) + K.t((A[0] + B[0]) / 2, 188, b, 'ta') + K.l(...A, ...B, 'gr')
        + (v == null ? K.l(...D, ...E, 'lm d') : K.l(...D, D[0] + (E[0] - D[0]) * k, D[1] + (E[1] - D[1]) * k, 'lf gr')) + K.c(...E, 7, f >= 1 ? (v === t.r ? 'fo' : 'ff') : 'fM') + K.c(...D, 4, 'fk');
    },
    falla: (t, v) => (t.a != null ? (v === t.a + t.b ? 'Sumaste los lados; se suman los cuadrados.' : v > t.r ? 'Se pasó de largo.' : 'No llegó.') : v === t.h - t.b ? 'Restaste los lados; se restan los cuadrados.' : v > t.r ? 'Se pasó de largo.' : 'No llegó.'),
    cuenta: t => (t.a != null ? `$\\sqrt{${t.a}^2 + ${t.b}^2} = ${t.r}$` : `$\\sqrt{${t.h}^2 - ${t.b}^2} = ${t.r}$`), pie: 'Estira la cuerda y suelta: sale hacia el punto.',
  });
})();
;
//#archivo js/games/geo-escena-3.js
// Ejercicios de «Semejanza y escala» (pu-ge-3) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  const igualA = x => (Math.abs(x - Math.round(x * 100) / 100) < 1e-9 ? '=' : '\\approx');
  const cara = (K, X, Y, W, H) => `<ellipse class="xf fg" cx="${K.n(X + W / 2)}" cy="${K.n(Y + H / 2)}" rx="${K.n(W * 0.24)}" ry="${K.n(H * 0.34)}"/>`;

  // Ampliar una foto hasta un alto dado sin deformarla.  v { w, h }
  XG.figura('foto-fiel', {
    ini: p => ({ w: p.w0, h: p.h0 }),
    manijas: () => [{ k: ['w', 'h'], min: [2, 2], max: [16, 12], paso: [0.5, 0.5], en: v => [112 + v.w * 13, 188 - v.h * 13], de: (x, y) => [(x - 112) / 13, (188 - y) / 13] }],
    ok: (v, p) => v.h === p.h && v.w * p.h0 === p.w0 * v.h,
    sol: p => ({ w: p.w0 * p.h / p.h0, h: p.h }),
    texto: p => `$${p.h} \\div ${p.h0} = ${p.h / p.h0}$ y $${p.w0} \\cdot ${p.h / p.h0} = ${p.w0 * p.h / p.h0}$`,
    alto: () => 214, pie: 'Arrastra la esquina de la foto.',
    dib(v, K, p, f) {
      const u = 13, x = 112, y = 188, w = v.w * u, h = v.h * u, e = p.w0 / p.h0 * p.h * u * f;
      return K.r(10, y - p.h0 * u, p.w0 * u, p.h0 * u, 'fc') + cara(K, 10, y - p.h0 * u, p.w0 * u, p.h0 * u) + K.t(10 + p.w0 * u / 2, y + 17, p.w0, 'tm') + K.t(92, y - p.h0 * u / 2 + 5, p.h0, 'tm', 'start')
        + K.r(x, y - h, w, h, 'fa') + K.f(f, cara(K, x, y - h, w, h) + K.l(x, y, x + e, y - p.h * u * f, 'lg d')) + K.t(x + w / 2, y + 17, N(v.w), 'ta') + K.t(x + 10, y - h + 18, N(v.h), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${N(v.w)}}{${p.w0}} ${igualA(v.w / p.w0)} ${N(v.w / p.w0)} \\qquad \\tfrac{${N(v.h)}}{${p.h0}} ${igualA(v.h / p.h0)} ${N(v.h / p.h0)}$`,
    aviso: (v, p) => (v.h !== p.h ? `El alto debía ser ${p.h}.` : v.w - p.w0 === v.h - p.h0 ? 'Le sumaste lo mismo a los dos lados, y eso deforma: se multiplica.' : 'Se deformó: los dos lados deben crecer las mismas veces.'),
    bien: (v, p) => `Los dos lados crecieron ${N(p.h / p.h0)} veces.`,
  });

  // Altura de un poste por su sombra: el rayo, paralelo al de la vara, sale al comprobar.  v { h }
  XG.figura('sombra-poste', {
    ini: p => ({ h: p.h0 }),
    manijas: () => [{ k: 'h', min: 1, max: 10, paso: 0.5, en: v => [124, 188 - v.h * 16], de: (x, y) => (188 - y) / 16 }],
    ok: (v, p) => v.h * p.s0 === p.s * p.h0,
    sol: p => ({ h: p.s * p.h0 / p.s0 }),
    texto: p => `$\\tfrac{${p.h0}}{${p.s0}} = \\tfrac{h}{${p.s}}$: $h = ${p.s * p.h0 / p.s0}$`,
    alto: () => 214, pie: 'Arrastra la punta del poste.',
    dib(v, K, p, f) {
      const u = 16, y = 188, x1 = 34, x2 = 124, s = v.h * p.s0 / p.h0;
      return K.l(8, y, 332, y, 'lm') + K.l(x1, y, x1, y - p.h0 * u, 'gr la') + K.l(x1, y + 4, x1 + p.s0 * u, y + 4, 'gr lm') + K.l(x1, y - p.h0 * u, x1 + p.s0 * u, y, 'lg d') + K.t(x1 - 6, y - p.h0 * u / 2 + 5, N(p.h0), 'ta', 'end') + K.t(x1 + p.s0 * u / 2, y + 20, N(p.s0), 'tm')
        + K.l(x2, y, x2, y - v.h * u, 'gr lf') + K.l(x2, y + 4, x2 + p.s * u, y + 4, 'gr lm') + K.t(x2 - 14, y - v.h * u / 2 + 5, N(v.h), 'tf', 'end') + K.t(x2 + p.s * u / 2, y + 20, p.s, 'tm')
        + (f ? K.l(x2, y - v.h * u, x2 + s * u * f, y - v.h * u * (1 - f), 'lg gr') : '');
    },
    lee: (v, p) => `$\\tfrac{${N(p.h0)}}{${N(p.s0)}} = ${N(p.h0 / p.s0)} \\qquad \\tfrac{${N(v.h)}}{${p.s}} = ${N(v.h / p.s)}$`,
    aviso: (v, p) => (v.h === p.h0 + p.s - p.s0 ? 'Sumaste lo mismo; las sombras crecen multiplicando.' : v.h * p.s0 > p.s * p.h0 ? 'Su sombra sería más larga.' : 'Su sombra sería más corta.'),
    bien: () => 'El rayo cae en la punta de la sombra: son triángulos semejantes.',
  });

  // Tales: dos transversales y tres paralelas; la tercera paralela aparece al comprobar.  v { x }
  const TC = (p, x) => { const k = 40 / p.c; return [190 + (x + p.c) * k * 0.9, 34 + (x + p.c) * k]; };
  XG.figura('tales-corte', {
    ini: () => ({ x: 4 }),
    manijas: p => [{ k: 'x', min: 1, max: 17, paso: 1, en: v => TC(p, v.x), de: (x, y) => ((y - 74) / 40 * p.c + (x - TC(p, 0)[0]) / 36 * p.c) / 2 }],
    ok: (v, p) => v.x * p.a === p.b * p.c,
    sol: p => ({ x: p.b * p.c / p.a }),
    texto: p => `$\\tfrac{${p.a}}{${p.b}} = \\tfrac{${p.c}}{x}$: $x = ${p.b * p.c / p.a}$`,
    alto: () => 226, pie: 'Arrastra el punto a lo largo de la recta de la derecha.',
    dib(v, K, p, f) {
      const y1 = 34, y2 = 74, y3 = 74 + 40 * p.b / p.a, X1 = y => 108 - (y - 34) * 0.3, Q1 = [TC(p, -p.c)[0], y1], Q2 = TC(p, 0), Q3 = TC(p, v.x);
      return K.l(X1(16), 16, X1(212), 212, 'la') + K.l(...TC(p, -p.c * 1.4), ...TC(p, 18.4), 'lm') + K.l(20, y1, 320, y1) + K.l(20, y2, 320, y2) + K.t(X1(54) - 10, 59, p.a, 'ta', 'end') + K.t(X1(118) - 10, 122, p.b, 'ta', 'end') + K.t((Q1[0] + Q2[0]) / 2 + 14, 58, p.c, 'tf', 'start') + K.t((Q2[0] + Q3[0]) / 2 + 20, (Q2[1] + Q3[1]) / 2 - 2, N(v.x), 'tf', 'start') + K.l(...Q1, ...Q3, 'lf gr')
        + K.f(f, K.c(X1(y3), y3, 5, 'fk') + K.l(X1(y3) - 40 * f, y3, X1(y3) + (320 - X1(y3)) * f, y3, 'lo gr') + K.c(...Q3, 5, 'fF'));
    },
    lee: (v, p) => `$\\tfrac{${p.b}}{${p.a}} ${igualA(p.b / p.a)} ${N(p.b / p.a)} \\qquad \\tfrac{${Math.round(v.x)}}{${p.c}} ${igualA(Math.round(v.x) / p.c)} ${N(Math.round(v.x) / p.c)}$`,
    aviso: (v, p) => (v.x === p.c + p.b - p.a ? 'Sumaste la diferencia; los segmentos guardan la misma razón.' : v.x === p.b ? 'Los dos lados no miden igual: esta recta es más inclinada.' : v.x * p.a > p.b * p.c ? 'Se pasa de la tercera paralela.' : 'No llega a la tercera paralela.'),
    bien: () => 'Las paralelas cortan segmentos proporcionales.',
  });

  // Escala de un mapa: cuántos kilómetros reales.  v { km }
  XG.figura('escala-mapa', {
    ini: () => ({ km: 0.25 }),
    manijas: () => [{ k: 'km', min: 0.25, max: 6, paso: 0.25, en: v => [34 + v.km * 45, 132], de: x => (x - 34) / 45 }],
    ok: (v, p) => v.km * 100000 === p.cm * p.den,
    sol: p => ({ km: p.cm * p.den / 100000 }),
    texto: p => `$${p.cm} \\cdot ${miles(p.den)} = ${miles(p.cm * p.den)}$ cm, que son ${p.cm * p.den / 100000} km`,
    alto: () => 184, pie: 'Arrastra el final del camino real.',
    dib(v, K, p, f) {
      let h = K.t(170, 20, `mapa 1 : ${miles(p.den).replace(/\\,/g, ' ')}`, 'tm') + K.l(80, 62, 260, 62, 'lg gr') + K.c(80, 62, 5, 'fG') + K.c(260, 62, 5, 'fG') + K.t(170, 50, `${p.cm} cm`, 's tg');
      for (let i = 0; i <= p.cm; i++) h += K.l(80 + i * 180 / p.cm, 62, 80 + i * 180 / p.cm, 70, 'lm');
      h += K.l(34, 132, 304, 132, 'lm');
      for (let i = 0; i <= 6; i++) h += K.l(34 + i * 45, 132, 34 + i * 45, 142, 'lm') + K.t(34 + i * 45, 160, i, 's tm');
      const x = 34 + p.cm * p.den / 100000 * 45;
      return h + K.t(170, 178, 'kilómetros reales', 's tm') + K.l(34, 132, 34 + v.km * 45, 132, 'la gr') + K.t(Math.max(60, 34 + v.km * 45), 112, `${N(v.km)} km`, 'ta') + K.f(f, K.l(80, 70, 34, 124, 'lg d') + K.l(260, 70, 260 + (x - 260) * f, 70 + 54 * f, 'lg d') + K.c(x, 132, 5, 'fo'));
    },
    lee: (v, p) => `$${p.cm} \\cdot ${miles(p.den)} \\text{ cm} = ${miles(p.cm * p.den)} \\text{ cm}$`,
    aviso: (v, p) => (v.km === p.cm ? 'Un centímetro del mapa no es un kilómetro.' : v.km * 100000 > p.cm * p.den ? 'Es más de lo que dice la escala. Un kilómetro son 100 000 cm.' : 'Es menos de lo que dice la escala. Un kilómetro son 100 000 cm.'),
    bien: (v, p) => `Son ${p.cm * p.den / 100} metros reales.`,
  });

  // De cuánto creció el área sale cuánto creció el lado.  v { k }
  XG.figura('papel-factor', {
    ini: () => ({ k: 1 }),
    manijas: () => [{ k: 'k', min: 1, max: 36, paso: 1, et: 'el lado se multiplica por' }],
    ok: (v, p) => v.k ** 2 === p.veces,
    sol: p => ({ k: Math.sqrt(p.veces) }),
    texto: p => `$k^2 = ${p.veces}$: $k = ${Math.sqrt(p.veces)}$`,
    alto: () => 236, pie: 'Arrastra el factor del lado.',
    dib(v, K, p, f) {
      const k = Math.max(1, Math.round(v.k)), S = 150, u = S / k, X = 150, Y = 12, n = Math.round(f * k);
      let h = K.r(50, 80, 26, 26, 'fg', 2) + K.t(63, 124, 'antes', 's tm') + K.r(X, Y, S, S, 'fc', 2);
      if (!f) return h + K.t(X + S / 2, Y + S / 2 + 8, '?', 'B tm');
      h += K.r(X, Y, u, u, 'fg', 0);
      for (let i = 1; i <= n && i < k; i++) h += K.l(X + i * u, Y, X + i * u, Y + S, 'lr') + K.l(X, Y + i * u, X + S, Y + i * u, 'lr');
      return h + K.f(f * 2 - 1, K.t(X - 12, Y + 24, k * k, 'b ta', 'end') + K.t(X - 12, Y + 42, 'veces', 's tm', 'end'));
    },
    lee: v => `$${Math.round(v.k)}^2 = ${Math.round(v.k) ** 2}$`,
    aviso: (v, p) => (v.k === p.veces ? `${p.veces} es lo que creció el área, no el lado.` : v.k === p.veces / 2 ? 'No es la mitad: el área crece a lo ancho y a lo alto.' : v.k ** 2 > p.veces ? `Con ese factor el área crece ${v.k ** 2} veces.` : `Con ese factor el área solo crece ${v.k ** 2} veces.`),
    bien: v => `${v.k} filas de ${v.k}: el área crece con el cuadrado.`,
  });

  // Maqueta: arista, cara y volumen crecen distinto.
  const crece = p => [1, 2, 3].map(e => `× ${p.k ** e}`);
  XG.rotula('tres-crecimientos', {
    slots: () => [{ x: 290, y: 36, w: 76, h: 36 }, { x: 290, y: 92, w: 76, h: 36 }, { x: 290, y: 148, w: 76, h: 36 }],
    fichas: p => p.fichas, metas: crece,
    texto: p => `$${p.k}$, $${p.k}^2 = ${p.k ** 2}$ y $${p.k}^3 = ${p.k ** 3}$`,
    alto: () => 190,
    fondo: (K, p) => K.caja([28, 176], 11, 1, 1, 1, 'fg') + K.caja([100, 178], 11, p.k, p.k, p.k, 'fa') + K.t(86, 24, `arista × ${p.k}`, 's tm') + ['cinta del borde', 'pintura', 'arena'].map((t, i) => K.t(246, 40 + 56 * i, t, 's', 'end')).join(''),
    aviso(q, p) { const m = crece(p); return q[1][0] === m[0] || q[2][0] === m[0] ? 'La pintura cubre área y la arena llena volumen: crecen más que el largo.' : q[1][0] === `× ${2 * p.k}` ? 'El factor no se duplica: se multiplica por sí mismo.' : 'Largo por k; área por k dos veces; volumen por k tres veces.'; },
    bien: () => 'Largo, área y volumen: k, k² y k³.',
  });

  // Copia semejante con el área partida por `div`.  v { w, h }
  XG.figura('achica-area', {
    ini: p => ({ w: p.w, h: p.h }),
    manijas: p => [{ k: ['w', 'h'], min: [1, 1], max: [p.w, p.h], paso: [0.5, 0.5], en: v => [80 + v.w * 22, 170 - v.h * 22], de: (x, y) => [(x - 80) / 22, (170 - y) / 22] }],
    ok: (v, p) => v.w * p.h === v.h * p.w && v.w * v.h * p.div === p.w * p.h,
    sol: p => ({ w: p.w / Math.sqrt(p.div), h: p.h / Math.sqrt(p.div) }),
    texto: p => `lados por $\\tfrac{1}{${Math.sqrt(p.div)}}$: ${p.w / Math.sqrt(p.div)} por ${p.h / Math.sqrt(p.div)}`,
    alto: () => 200, pie: 'Arrastra la esquina de la copia.',
    dib(v, K, p, f) {
      const u = 22, x = 80, y = 170;
      let h = K.r(x, y - p.h * u, p.w * u, p.h * u, 'fc d');
      if (f) for (let i = 0; i < Math.floor(p.w / v.w + 1e-9); i++) for (let j = 0; j < Math.floor(p.h / v.h + 1e-9); j++) if (i + j) h += K.f(f, K.r(x + i * v.w * u, y - (j + 1) * v.h * u, v.w * u, v.h * u, 'fg'));
      return h + K.r(x, y - v.h * u, v.w * u, v.h * u, 'fa') + K.t(x + v.w * u / 2, y - v.h * u - 8, N(v.w), 'ta') + K.t(x + v.w * u + 10, y - v.h * u / 2 + 5, N(v.h), 'ta', 'start') + K.t(x + p.w * u / 2, y + 18, p.w, 'tm') + K.t(x - 10, y - p.h * u / 2 + 5, p.h, 'tm', 'end') + K.f(f, K.l(x, y, x + p.w * u * f, y - p.h * u * f, 'lf d'));
    },
    lee: (v, p) => `$${N(v.w)} \\cdot ${N(v.h)} = ${N(v.w * v.h)} \\qquad ${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    aviso: (v, p) => (v.w * p.h !== v.h * p.w ? 'Cambió la forma: los dos lados deben achicarse las mismas veces.' : v.w * p.div === p.w ? `Dividiste cada lado entre ${p.div}: el área quedó mucho más chica.` : `La forma es la misma, pero el área no es la parte pedida.`),
    bien: (v, p) => `Caben ${p.div} copias: cada lado se partió entre ${Math.sqrt(p.div)}.`,
  });

  // En movimiento: un dron avanza por la regla lo que se le diga.
  XG.tiros('lanza-escala', {
    perilla: () => ({ et: 'Avance', min: 0, max: 30, lee: v => `${v}` }),
    meta: t => t.r, alto: 130, ms: 1600,
    dib(t, v, K, p, f) {
      const X = n => 24 + n * 292 / 30, y = 100, n = v == null ? 0 : v * f;
      let h = K.l(14, y, 326, y);
      for (let i = 0; i <= 30; i++) h += K.l(X(i), y - (i % 5 ? 3 : 6), X(i), y + (i % 5 ? 3 : 6), 'lm') + (i % 5 ? '' : K.t(X(i), y + 22, i, 's tm'));
      return h + (v == null ? '' : K.l(X(0), y - 10, X(n), y - 10, 'la gr') + K.f(f * 4 - 3, K.t(X(v), y - 42, v, v === t.r ? 'to' : 'tf')))
        + (yy => K.c(X(n), yy, 8, 'fA') + K.l(X(n) - 15, yy - 8, X(n) + 15, yy - 8, 'gr'))(y - 18 - 44 * Math.sin(Math.PI * f));
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se pasó de largo.' : 'Se quedó corto.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira el avance y suelta: sale el dron.',
  });
})();
;
//#archivo js/games/geo-escena-4.js
// Ejercicios de «Perímetros, áreas y círculos» (pu-ge-4) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), PI = x => `${N(x) === '1' ? '' : N(x)}\\pi`;

  // Triángulo con la misma área que un rectángulo.  v { h }
  XG.figura('misma-area', {
    ini: () => ({ h: 3 }),
    manijas: p => [{ k: 'h', min: 1, max: 14, paso: 1, en: v => [190 + p.b * 5.5, 186 - v.h * 11], de: (x, y) => (186 - y) / 11 }],
    ok: (v, p) => p.b * v.h === 2 * p.w * p.H,
    sol: p => ({ h: 2 * p.w * p.H / p.b }),
    texto: p => `$\\tfrac{${p.b} \\cdot ${2 * p.w * p.H / p.b}}{2} = ${p.w * p.H}$`,
    alto: () => 214, pie: 'Arrastra el vértice de arriba.',
    dib(v, K, p, f) {
      const u = 11, y = 186, x = 190, h = v.h * u, b = p.b * u;
      return K.r(24, y - p.H * u, p.w * u, p.H * u, 'fg') + K.t(24 + p.w * u / 2, y + 17, p.w, 'tg') + K.t(18, y - p.H * u / 2 + 5, p.H, 'tg', 'end') + K.f(f, K.r(x, y - h, b, h, 'fn d')) + K.p([[x, y], [x + b, y], [x + b / 2, y - h]], 'fa') + K.l(x + b / 2, y, x + b / 2, y - h, 'lf d') + K.t(x + b / 2, y + 17, p.b, 'ta') + K.t(x + b / 2 + 8, y - h * 0.3, N(v.h), 'tf', 'start')
        + K.f(f * 2 - 1, K.t(24 + p.w * u / 2, y - p.H * u / 2 + 5, p.w * p.H, 'tg'));
    },
    lee: (v, p) => `$\\tfrac{${p.b} \\cdot ${Math.round(v.h)}}{2} = ${N(p.b * Math.round(v.h) / 2)}$`,
    aviso: (v, p) => (p.b * v.h === p.w * p.H ? 'Así la caja punteada vale lo mismo, y el triángulo es la mitad.' : p.b * v.h > 2 * p.w * p.H ? 'El triángulo quedó más grande.' : 'El triángulo quedó más chico.'),
    bien: () => 'El triángulo es la mitad de base por altura.',
  });

  // Marco articulado: los lados no cambian, la altura sí.  v { s } = cuánto se corre el lado de arriba
  const altoMarco = (v, p) => Math.sqrt(p.l ** 2 - v.s ** 2);
  XG.figura('inclina-marco', {
    ini: () => ({ s: 0 }),
    manijas: p => [{ k: 's', min: 0, max: p.l - 1, paso: 1, en: v => [34 + v.s * 14, 188 - altoMarco(v, p) * 14], de: x => (x - 34) / 14 }],
    ok: (v, p) => p.b * altoMarco(v, p) === p.area,
    sol: p => ({ s: Math.sqrt(p.l ** 2 - (p.area / p.b) ** 2) }),
    texto: p => `altura $${p.area} \\div ${p.b} = ${p.area / p.b}$, y $\\sqrt{${p.l}^2 - ${p.area / p.b}^2} = ${Math.sqrt(p.l ** 2 - (p.area / p.b) ** 2)}$`,
    alto: () => 214, pie: 'Arrastra la esquina de arriba para inclinar el marco.',
    dib(v, K, p, f) {
      const u = 14, x = 34, y = 188, H = altoMarco(v, p) * u, s = v.s * u, b = p.b * u;
      return K.p([[x, y], [x + b, y], [x + b + s, y - H], [x + s, y - H]], 'fa') + K.t(x + b / 2 + 10, y + 18, p.b, 'ta') + K.t(x + b + s / 2 + 12, y - H / 2 + 12, p.l, 'tm', 'start') + (v.s > 0.3 ? K.l(x, y - H, x + s, y - H, 'lf d') + K.l(x, y, x, y - H, 'lm d') + K.t(x + s / 2, y - H - 8, N(v.s), 's tf') : '')
        + K.f(f, K.l(x + s, y, x + s, y - H, 'lf d') + K.t(x + s + 8, y - H / 2 + 5, N(H / u), 'tf', 'start'));
    },
    lee: (v, p) => { const h = altoMarco(v, p); return `$${p.b} \\cdot ${N(h)} ${Number.isInteger(h) ? '=' : '\\approx'} ${N(p.b * h)}$`; },
    aviso: (v, p) => (p.b * altoMarco(v, p) > p.area ? 'El área quedó más grande: hay que acostarlo más.' : 'El área quedó más chica: está muy acostado.'),
    bien: () => 'Los lados son los mismos, pero el área depende de la altura.',
  });

  // Rectángulo con la misma altura y la misma área que un trapecio.  v { w }
  XG.figura('trapecio-gemelo', {
    ini: () => ({ w: 4 }),
    manijas: () => [{ k: 'w', min: 2, max: 18, paso: 1, en: v => [40 + v.w * 15, 168], de: x => (x - 40) / 15 }],
    ok: (v, p) => 2 * v.w === p.B + p.b,
    sol: p => ({ w: (p.B + p.b) / 2 }),
    texto: p => `$\\tfrac{${p.B} + ${p.b}}{2} = ${(p.B + p.b) / 2}$`,
    alto: () => 212, pie: 'Arrastra el lado derecho del rectángulo.',
    dib(v, K, p, f) {
      const u = 15, x = 40, y = 106, H = 62, o = 25, B = p.B * u, b = p.b * u, w = v.w * u;
      return K.p([[x, y], [x + B, y], [x + o + b, y - H], [x + o, y - H]], 'fg') + K.t(x + B / 2, y + 17, p.B, 'tg') + K.t(x + o + b / 2, y - H - 7, p.b, 'tg') + K.r(x, 137, w, H, 'fa') + K.t(x + w / 2, 174, N(v.w), 'ta') + K.f(f, K.r(x + o / 2 * f, 137 - (137 - (y - H)) * f, w, H, 'fn d'));
    },
    lee: (v, p) => `$\\tfrac{${p.B} + ${p.b}}{2} = ${N((p.B + p.b) / 2)} \\qquad \\text{tu base: } ${Math.round(v.w)}$`,
    aviso: (v, p) => (v.w === p.B + p.b ? 'Esa es la base del trapecio con su copia: falta la mitad.' : v.w * 2 > p.B + p.b ? 'Al rectángulo le sobra.' : 'Al rectángulo le falta.'),
    bien: () => 'El promedio de las bases: lo que sobra abajo llena lo que falta arriba.',
  });

  // Círculo de área dada.  v { r }
  XG.figura('radio-area', {
    ini: () => ({ r: 2 }),
    manijas: () => [{ k: 'r', min: 1, max: 18, paso: 1, en: v => [170 + v.r * 6, 114], de: (x, y) => Math.hypot(x - 170, y - 114) / 6 }],
    ok: (v, p) => v.r ** 2 === p.area,
    sol: p => ({ r: Math.sqrt(p.area) }),
    texto: p => `$r^2 = ${p.area}$: $r = ${Math.sqrt(p.area)}$`,
    alto: () => 228, pie: 'Arrastra el borde del círculo.',
    dib: (v, K, p, f) => K.c(170, 114, v.r * 6, 'fa') + K.l(170, 114, 170 + v.r * 6, 114, 'lf') + K.c(170, 114, 3, 'fk') + K.t(8, 20, `r = ${N(v.r)}`, 'tf', 'start') + K.f(f, K.c(170, 114, Math.sqrt(p.area) * 6, 'fn d') + K.t(332, 20, `r² = ${N(v.r * v.r)}`, 'ta', 'end')),
    lee: v => `$\\pi \\cdot ${Math.round(v.r)}^2 = ${Math.round(v.r) ** 2}\\pi$`,
    aviso: (v, p) => (2 * v.r === p.area ? `Con ese radio, ${p.area}π es el borde; el área es mucho más.` : v.r ** 2 > p.area ? 'Ocupa más de lo pedido.' : 'Ocupa menos de lo pedido.'),
    bien: () => 'El radio por el radio, por π.',
  });

  // Arco de longitud dada.  v { g }
  XG.figura('arco-justo', {
    ini: () => ({ g: 30 }),
    manijas: () => [{ k: 'g', min: 10, max: 350, paso: 10, en: v => XPK.at(170, 108, 86, v.g), de: (x, y, v) => { const g = (Math.atan2(108 - y, x - 170) * 180 / Math.PI + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 350 : 10) : g; } }],
    ok: (v, p) => v.g * p.r === 180 * p.arco,
    sol: p => ({ g: 180 * p.arco / p.r }),
    texto: p => `$\\tfrac{${p.arco}}{${2 * p.r}} \\cdot 360^\\circ = ${180 * p.arco / p.r}^\\circ$`,
    alto: () => 216, pie: 'Arrastra el punto por el borde.',
    dib: (v, K, p, f) => K.c(170, 108, 86, 'fc') + K.sec(170, 108, 86, 0, v.g, 'fa') + K.arc(170, 108, 86, 0, v.g, 'lf gr') + K.l(170, 108, 256, 108) + K.t(212, 126, `r = ${p.r}`, 's tm') + K.t(...K.at(170, 112, 38, Math.max(16, v.g / 2)), `${Math.round(v.g)}°`, 'ta') + K.f(f, K.arc(170, 108, 95, 0, Math.min(359, 180 * p.arco / p.r) * f, 'lo gr')),
    lee: (v, p) => `$\\tfrac{${Math.round(v.g)}}{360} \\cdot ${2 * p.r}\\pi = ${PI(Math.round(v.g) / 180 * p.r)}$`,
    aviso: (v, p) => (v.g === 360 * p.arco / p.r ? `Comparaste con ${p.r}π, que es medio borde; el entero es ${2 * p.r}π.` : v.g * p.r > 180 * p.arco ? 'El arco quedó más largo.' : 'El arco quedó más corto.'),
    bien: (v, p) => `${p.arco} de ${2 * p.r} partes del borde: esa misma parte de la vuelta.`,
  });

  // Borde de un rectángulo con medio círculo encima.
  const borde = p => [`${p.w / 2}π`, `${p.w + 2 * p.h}`, `${p.w + 2 * p.h} + ${p.w / 2}π`];
  XG.rotula('borde-mixto', {
    slots: () => [{ x: 278, y: 46, w: 92, h: 36 }, { x: 278, y: 112, w: 92, h: 36 }, { x: 278, y: 178, w: 92, h: 36 }],
    fichas: p => p.fichas, metas: borde,
    texto: p => `curva $${p.w / 2}\\pi$, rectos $${p.h} + ${p.w} + ${p.h} = ${p.w + 2 * p.h}$, en total $${p.w + 2 * p.h} + ${p.w / 2}\\pi$`,
    alto: () => 206,
    fondo: (K, p, f) => K.r(50, 78, 84, 100, 'fa', 0) + K.sec(92, 78, 42, 0, 180, 'fg') + K.l(51, 78, 133, 78, 'lm d') + K.f(f, K.arc(92, 78, 42, 0, 180 * f, 'lg gr') + K.pl([[50, 78], [50, 178], [134, 178], [134, 78]], 'la gr')) + K.t(92, 197, p.w, 'tm') + K.t(42, 132, p.h, 'tm', 'end') + K.t(222, 50, 'curva', 's tg', 'end') + K.t(222, 116, 'rectos', 's ta', 'end') + K.t(222, 182, 'borde', 's', 'end'),
    aviso(q, p) { return q[0][0] === `${p.w}π` ? 'Esa es la vuelta completa: solo hay medio círculo.' : q[1][0] === `${2 * p.w + 2 * p.h}` ? 'El lado que toca el medio círculo quedó adentro: no es borde.' : 'Sigue el borde con el dedo y suma solo lo que recorres.'; },
    bien: () => 'Solo cuenta lo que se recorre por fuera.',
  });

  // Rombo de área dada con una diagonal fija.  v { D }
  XG.figura('rombo-diagonales', {
    ini: () => ({ D: 4 }),
    manijas: () => [{ k: 'D', min: 2, max: 14, paso: 1, en: v => [170, 112 - v.D * 7], de: (x, y) => (112 - y) / 7 }],
    ok: (v, p) => v.D * p.d === 2 * p.area,
    sol: p => ({ D: 2 * p.area / p.d }),
    texto: p => `$\\tfrac{${p.d} \\cdot ${2 * p.area / p.d}}{2} = ${p.area}$`,
    alto: () => 226, pie: 'Arrastra la punta de arriba.',
    dib(v, K, p, f) {
      const a = p.d * 7, b = v.D * 7, C = [170, 112];
      return K.f(f, K.r(C[0] - a, C[1] - b, 2 * a, 2 * b, 'fn d', 0)) + K.p([[C[0] - a, C[1]], [C[0], C[1] - b], [C[0] + a, C[1]], [C[0], C[1] + b]], 'fa') + K.l(C[0] - a, C[1], C[0] + a, C[1], 'lg') + K.l(C[0], C[1] - b, C[0], C[1] + b, 'lf') + K.t(C[0] + a + 8, C[1] + 5, p.d, 'tg', 'start') + K.t(C[0] + 8, C[1] + b * 0.55, N(v.D), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac{${p.d} \\cdot ${Math.round(v.D)}}{2} = ${N(p.d * Math.round(v.D) / 2)}$`,
    aviso: (v, p) => (v.D * p.d === p.area ? 'Eso vale la caja que lo rodea; el rombo es la mitad.' : v.D * p.d > 2 * p.area ? 'Quedó más grande.' : 'Quedó más chico.'),
    bien: () => 'El rombo ocupa la mitad de la caja de sus diagonales.',
  });

  // En movimiento: la rueda da las vueltas que se le pidan y debe parar en la meta. tiro: { q, d (dato), m (meta), r, c, e }
  XG.tiros('rueda-lanza', {
    perilla: () => ({ et: 'Vueltas', min: 0, max: 12, lee: v => `${v} ${v === 1 ? 'vuelta' : 'vueltas'}` }),
    meta: t => t.r, alto: 130, ms: 1900,
    dib(t, v, K, p, f) {
      const y = 106, r = 24, x0 = 44, xm = 276, x = Math.min(380, x0 + (xm - x0) * (v == null ? 0 : v / t.r * f));
      let h = K.l(10, y, 330, y) + K.l(xm, y, xm, y - 62, 'lo gr') + K.p([[xm, y - 62], [xm + 22, y - 54], [xm, y - 46]], 'fo') + K.t(xm, y + 18, t.m, 's to') + K.t(10, 20, t.d, 's tm', 'start');
      if (v != null) { h += K.l(x0, y, x, y, 'la gr'); for (let i = 1; i <= v * f + 1e-9; i++) h += K.l(x0 + (xm - x0) * i / t.r, y - 5, x0 + (xm - x0) * i / t.r, y + 5, 'lg gr'); }
      return h + K.c(x, y - r, r, 'fa') + K.l(x, y - r, ...K.at(x, y - r, r, -90 - 360 * (v || 0) * f), 'lf gr') + K.c(x, y - r, 3, 'fk');
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se pasó de la bandera.' : 'No alcanzó a llegar.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira las vueltas y suelta: la rueda sale.',
  });
})();
;
//#archivo js/games/geo-escena-5.js
// Ejercicios de «Áreas sombreadas y cuadrícula» (pu-ge-5) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100);
  // Lámina con un hueco cuadrado.  v { s }
  XG.figura('marco-hueco', {
    ini: () => ({ s: 2 }),
    manijas: p => [{ k: 's', min: 1, max: Math.min(p.w, p.h), paso: 1, en: v => [170 + v.s * 10.5, 100 - v.s * 10.5], de: (x, y) => (x - 170 + 100 - y) / 21 }],
    ok: (v, p) => p.w * p.h - v.s ** 2 === p.area,
    sol: p => ({ s: Math.sqrt(p.w * p.h - p.area) }),
    texto: p => `$${p.w * p.h} - ${p.area} = ${p.w * p.h - p.area}$: lado $${Math.sqrt(p.w * p.h - p.area)}$`,
    alto: () => 214, pie: 'Arrastra la esquina del hueco.',
    dib(v, K, p, f) {
      const u = 21, x = 170 - p.w * u / 2, y = 100 - p.h * u / 2, s = v.s * u;
      let g = '';
      for (let i = 1; i < p.w; i++) g += K.l(x + i * u, y, x + i * u, y + p.h * u, 'lr');
      for (let j = 1; j < p.h; j++) g += K.l(x, y + j * u, x + p.w * u, y + j * u, 'lr');
      return K.r(x, y, p.w * u, p.h * u, 'fa') + K.f(f, g) + K.r(170 - s / 2, 100 - s / 2, s, s, 'fc') + K.t(170, 105, N(v.s), 'tf') + K.t(170, y + p.h * u + 18, p.w, 'ta') + K.t(x - 9, 105, p.h, 'ta', 'end');
    },
    lee: (v, p) => `$${p.w * p.h} - ${Math.round(v.s) ** 2} = ${p.w * p.h - Math.round(v.s) ** 2}$`,
    aviso: (v, p) => (p.w * p.h - v.s ** 2 > p.area ? 'Queda demasiada lámina: el hueco es muy chico.' : 'Queda muy poca lámina: el hueco es muy grande.'),
    bien: () => 'Lo sombreado es la grande menos el hueco.',
  });

  // Anillo.  v { r }
  XG.figura('anillo-justo', {
    ini: () => ({ r: 1 }),
    manijas: p => [{ k: 'r', min: 1, max: p.R - 1, paso: 1, en: v => [170 + v.r * 13, 106], de: (x, y) => Math.hypot(x - 170, y - 106) / 13 }],
    ok: (v, p) => p.R ** 2 - v.r ** 2 === p.area,
    sol: p => ({ r: Math.sqrt(p.R ** 2 - p.area) }),
    texto: p => `$${p.R ** 2}\\pi - ${p.area}\\pi = ${p.R ** 2 - p.area}\\pi$: radio $${Math.sqrt(p.R ** 2 - p.area)}$`,
    alto: () => 212, pie: 'Arrastra el borde del hueco.',
    dib: (v, K, p, f) => K.c(170, 106, p.R * 13, 'fa') + K.c(170, 106, v.r * 13, 'fc') + K.l(170, 106, ...K.at(170, 106, p.R * 13, 140), 'la') + K.t(...K.at(170, 111, p.R * 13 + 14, 140), p.R, 'ta') + K.l(170, 106, 170 + v.r * 13, 106, 'lf') + K.t(170 + v.r * 5, 126, N(v.r), 'tf') + K.f(f, K.c(170, 106, Math.sqrt(p.R ** 2 - p.area) * 13, 'fn d')),
    lee: (v, p) => `$${p.R ** 2}\\pi - ${Math.round(v.r) ** 2}\\pi = ${p.R ** 2 - Math.round(v.r) ** 2}\\pi$`,
    aviso: (v, p) => (p.R ** 2 - v.r ** 2 > p.area ? 'El anillo quedó con más área: el hueco es muy chico.' : 'El anillo quedó con menos área: el hueco es muy grande.'),
    bien: () => 'Se restan las áreas de los círculos, no los radios.',
  });

  // Triángulo con la base vertical sobre la cuadrícula.  v { x, y }
  const G = 26, GP = (x, y) => [34 + x * G, 200 - y * G];
  const malla = (K, w, h) => { let s = ''; for (let i = 0; i <= w; i++) s += K.l(...GP(i, 0), ...GP(i, h), 'ls'); for (let j = 0; j <= h; j++) s += K.l(...GP(0, j), ...GP(w, j), 'ls'); return s; };
  XG.figura('vertice-lejos', {
    ini: () => ({ x: 4, y: 3 }),
    manijas: () => [{ k: ['x', 'y'], min: [2, 0], max: [11, 7], paso: [1, 1], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / G, (200 - y) / G] }],
    ok: (v, p) => p.base * (v.x - 1) === 2 * p.area,
    sol: p => ({ x: 1 + 2 * p.area / p.base, y: 3 }),
    texto: p => `$\\tfrac{${p.base} \\cdot ${2 * p.area / p.base}}{2} = ${p.area}$`,
    alto: () => 212, pie: 'Arrastra el vértice libre por la cuadrícula.',
    dib: (v, K, p, f) => malla(K, 11, 7) + K.p([GP(1, 0), GP(1, p.base), GP(v.x, v.y)], 'fa') + K.l(...GP(1, 0), ...GP(1, p.base), 'lg gr') + K.f(f, K.l(...GP(1, v.y), ...GP(1 + (v.x - 1) * f, v.y), 'lf d') + K.t(...GP((1 + v.x) / 2, v.y + (v.y > 5 ? -0.8 : 0.3)), N(v.x - 1), 'tf')),
    lee: (v, p) => `$\\tfrac{${p.base} \\cdot ${Math.round(v.x) - 1}}{2} = ${N(p.base * (Math.round(v.x) - 1) / 2)}$`,
    aviso: (v, p) => (p.base * (v.x - 1) === p.area ? 'Eso es base por altura; el triángulo vale la mitad.' : v.x * p.base === 2 * p.area ? 'La altura se cuenta desde la base, no desde el borde.' : p.base * (v.x - 1) > 2 * p.area ? 'Quedó más grande.' : 'Quedó más chico.'),
    bien: () => 'Solo cuenta cuánto se aleja el vértice de la base.',
  });

  // Triángulo torcido: caja menos las tres esquinas.
  const ESQ = p => [p.w * p.ya / 2, (p.w - p.xc) * p.h / 2, (p.h - p.ya) * p.xc / 2];
  const caja = p => { const e = ESQ(p); return [...e, p.w * p.h - e[0] - e[1] - e[2]].map(String); };
  XG.rotula('caja-torcida', {
    slots: () => [{ x: 298, y: 24, w: 64, h: 34 }, { x: 298, y: 74, w: 64, h: 34 }, { x: 298, y: 124, w: 64, h: 34 }, { x: 298, y: 174, w: 64, h: 34 }],
    fichas: p => p.fichas, metas: caja,
    texto(p) { const m = caja(p); return `$${p.w * p.h} - ${m[0]} - ${m[1]} - ${m[2]} = ${m[3]}$`; },
    alto: () => 200,
    fondo(K, p, f) {
      const u = 26, Q = (x, y) => [18 + x * u, 180 - y * u], A = [0, p.ya], B = [p.w, 0], C = [p.xc, p.h], t = (P, cls) => K.p(P.map(q => Q(...q)), cls);
      let s = '';
      for (let i = 0; i <= p.w; i++) s += K.l(...Q(i, 0), ...Q(i, p.h), 'ls');
      for (let j = 0; j <= p.h; j++) s += K.l(...Q(0, j), ...Q(p.w, j), 'ls');
      return s + K.f(0.45 + 0.55 * f, t([[0, 0], B, A], 'fg') + t([B, [p.w, p.h], C], 'ff') + t([C, [0, p.h], A], 'fo')) + t([A, B, C], 'fa') + K.t(...Q(1, 0.3), 'a', 'tg') + K.t(...Q(p.w - 1, p.h - 1.6), 'b', 'tf') + K.t(...Q(0.8, p.h - 1), 'c', 'to') + K.t(...Q(3.1, 2.6), 'T', 'ta') + ['a', 'b', 'c', 'T'].map((l, i) => K.t(252, 29 + 50 * i, l, ['tg', 'tf', 'to', 'ta'][i])).join('');
    },
    aviso(q, p) { const m = caja(p); return m.slice(0, 3).some((x, i) => q[i][0] === String(2 * x) && !m.includes(q[i][0])) ? 'Cada esquina es medio rectángulo: parte entre dos.' : q[3][0] !== m[3] && m.slice(0, 3).every((x, i) => q[i][0] === x) ? 'A la caja entera quítale las tres esquinas.' : 'Cuenta los catetos de cada esquina en la cuadrícula.'; },
    bien: () => 'La caja menos las tres esquinas.',
  });

  // Casa: rectángulo con techo triangular, área total pedida.  v { x, y }
  XG.figura('techo-justo', {
    ini: p => ({ x: 5, y: p.h + 1 }),
    manijas: p => [{ k: ['x', 'y'], min: [0, p.h + 0.5], max: [11, 7], paso: [1, 0.5], en: v => GP(v.x, v.y), de: (x, y) => [(x - 34) / G, (200 - y) / G] }],
    ok: (v, p) => p.w * p.h + p.w * (v.y - p.h) / 2 === p.area,
    sol: p => ({ x: 5, y: p.h + 2 * (p.area - p.w * p.h) / p.w }),
    texto: p => `$${p.w * p.h} + \\tfrac{${p.w} \\cdot ${2 * (p.area - p.w * p.h) / p.w}}{2} = ${p.area}$`,
    alto: () => 212, pie: 'Arrastra la punta del techo.',
    dib: (v, K, p, f) => malla(K, 11, 7) + K.p([GP(2, 0), GP(2 + p.w, 0), GP(2 + p.w, p.h), GP(2, p.h)], 'fg') + K.p([GP(2, p.h), GP(2 + p.w, p.h), GP(v.x, v.y)], 'fa') + K.f(f, K.l(...GP(v.x, p.h), ...GP(v.x, p.h + (v.y - p.h) * f), 'lf d') + K.t(...GP(2 + p.w / 2, p.h / 2 - 0.2), p.w * p.h, 'tg') + K.t(...GP((2 + 2 + p.w + v.x) / 3 - 0.4, p.h + (v.y - p.h) * 0.2), N(p.w * (v.y - p.h) / 2), 'ta')),
    lee: (v, p) => `$${p.w * p.h} + ${N(p.w * (v.y - p.h) / 2)} = ${N(p.w * p.h + p.w * (v.y - p.h) / 2)}$`,
    aviso: (v, p) => (p.w * (v.y - p.h) === p.area - p.w * p.h ? 'El techo es un triángulo: vale la mitad de base por altura.' : p.w * p.h + p.w * (v.y - p.h) / 2 > p.area ? 'Sobra área.' : 'Falta área.'),
    bien: () => 'El rectángulo más la mitad de base por altura del techo.',
  });

  // Bandera con una onda que falta a un lado y sobra al otro: qué rectángulo de la misma altura vale lo mismo.  v { w }
  XG.figura('bandera-onda', {
    ini: () => ({ w: 5 }),
    manijas: () => [{ k: 'w', min: 2, max: 18, paso: 1, en: v => [50 + v.w * 13, 168], de: x => (x - 50) / 13 }],
    ok: (v, p) => v.w === p.w,
    sol: p => ({ w: p.w }),
    texto: p => `la onda que sobra llena la que falta: $${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    alto: () => 220, pie: 'Arrastra el lado derecho del rectángulo.',
    dib(v, K, p, f) {
      const u = 13, x = 50, y = 8, W = p.w * u, H = p.h * u, r = H / 2, d = W * (1 - f);
      return `<path class="xf fa" d="M${x} ${y} H${x + W} V${y + H} H${x} A${r} ${r} 0 0 0 ${x} ${y} Z"/><path class="xf fg" d="M${K.n(x + d)} ${y} a${r} ${r} 0 0 1 0 ${H} Z"/>` + K.cota(x, y + H + 8, x + W, y + H + 8, p.w) + K.t(x - 10, y + r + 5, p.h, 's tm', 'end')
        + K.r(x, 132, v.w * u, H, 'fc') + K.t(x + Math.max(26, v.w * u / 2 - 6), 132 + H / 2 + 5, `${N(v.w)} × ${p.h}`, 'tm');
    },
    lee: (v, p) => `$${N(v.w)} \\cdot ${p.h} = ${N(v.w * p.h)} \\qquad ${p.w} \\cdot ${p.h} = ${p.w * p.h}$`,
    aviso: (v, p) => (v.w === p.w + p.h / 2 ? 'Contaste la onda que sobra, pero del otro lado falta una igual.' : v.w === p.w - p.h / 2 ? 'Quitaste la onda que falta, pero del otro lado sobra una igual.' : v.w > p.w ? 'Tu rectángulo es más grande.' : 'Tu rectángulo es más chico.'),
    bien: () => 'La pieza que sobra llena el hueco: es un rectángulo.',
  });

  // Andén alrededor de un jardín: qué ancho da el área pedida.  v { a }
  const anden = (a, p) => (p.w + 2 * a) * (p.h + 2 * a) - p.w * p.h;
  const anchoDe = p => { for (let a = 0.5; a <= 4; a += 0.5) if (anden(a, p) === p.area) return { a }; return null; };
  XG.figura('anden-ancho', {
    ini: () => ({ a: 0.5 }),
    manijas: p => [{ k: 'a', min: 0.5, max: 4, paso: 0.5, en: v => [170 + (p.w / 2 + v.a) * 14, 100 - (p.h / 2 + v.a) * 14], de: (x, y) => ((x - 170) / 14 - p.w / 2 + (100 - y) / 14 - p.h / 2) / 2 }],
    ok: (v, p) => anden(v.a, p) === p.area,
    sol: anchoDe,
    texto(p) { const { a } = anchoDe(p); return `$${p.w + 2 * a} \\cdot ${p.h + 2 * a} - ${p.w} \\cdot ${p.h} = ${p.area}$`; },
    alto: () => 206, pie: 'Arrastra la esquina del andén.',
    dib(v, K, p, f) {
      const u = 14, w = (p.w + 2 * v.a) * u, h = (p.h + 2 * v.a) * u;
      return K.r(170 - w / 2, 100 - h / 2, w, h, 'fg') + K.r(170 - p.w * u / 2, 100 - p.h * u / 2, p.w * u, p.h * u, 'fa') + K.t(170, 105, `${p.w} × ${p.h}`, 'ta') + K.t(6, 18, `ancho: ${N(v.a)}`, 'tg', 'start') + K.f(f, K.t(170, 100 + h / 2 + 16, N(p.w + 2 * v.a), 's tg') + K.t(170 + w / 2 + 8, 105, N(p.h + 2 * v.a), 's tg', 'start'));
    },
    lee: (v, p) => `$${N(p.w + 2 * v.a)} \\cdot ${N(p.h + 2 * v.a)} - ${p.w * p.h} = ${N(anden(v.a, p))}$`,
    aviso: (v, p) => ((p.w + v.a) * (p.h + v.a) - p.w * p.h === p.area ? 'El andén crece a los dos lados: suma el ancho dos veces.' : anden(v.a, p) > p.area ? 'El andén quedó muy ancho.' : 'El andén quedó muy angosto.'),
    bien: (v, p) => `El rectángulo de afuera mide ${p.w + 2 * v.a} por ${p.h + 2 * v.a}.`,
  });

  // En movimiento: se lanza pintura, un cuadro por cuadro sombreado. tiro.f = { w, h, hueco, esq, tri }
  XG.tiros('llena-lanza', {
    perilla: () => ({ et: 'Pintura', min: 0, max: 40, lee: v => `${v} cuadros` }),
    meta: t => t.r, alto: 150, ms: 1900,
    dib(t, v, K, p, f) {
      const F = t.f, u = 13, x = 12, y = 122, W = F.w * u, H = F.h * u;
      let h = F.tri ? K.p([[x, y], [x + W, y], [x + W / 2, y - H]], 'fa') : K.r(x, y - H, W, H, 'fa', 0);
      if (F.hueco) h += K.r(x + (W - F.hueco[0] * u) / 2, F.tri ? y - F.hueco[1] * u : y - (H + F.hueco[1] * u) / 2, F.hueco[0] * u, F.hueco[1] * u, 'fc', 0) + K.t(x + W / 2, (F.tri ? y - F.hueco[1] * u / 2 : y - H / 2) + 5, F.hueco.join('×'), 's tm');
      if (F.esq) h += K.p([[x, y], [x + F.esq * u, y], [x, y - H]], 'fc') + K.p([[x + W, y - H], [x + W - F.esq * u, y - H], [x + W, y]], 'fc') + K.t(x + F.esq * u / 2, y + 16, F.esq, 's tm') + K.t(x + W / 2, y - H - 6, F.w, 's ta');
      else h += K.t(x + W / 2, y + 16, F.w, 's ta');
      h += F.tri ? K.l(x + W + 8, y, x + W + 8, y - H, 'lm') + K.t(x + W + 14, y - H / 2 + 5, F.h, 's ta', 'start') : K.t(x + W + 6, y - H / 2 + 5, F.h, 's ta', 'start');
      const c = 15, X = 180, n = v == null ? 0 : Math.floor(v * f + 1e-9);
      for (let i = 0; i < 40; i++) h += K.r(X + (i % 10) * c, 106 - Math.floor(i / 10) * c, c - 2, c - 2, i < n ? (f >= 1 && v !== t.r ? 'ff' : 'fA') : 'fc', 3);
      return h;
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Sobró pintura.' : 'Faltó pintura.')),
    cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira la pintura justa para lo sombreado y suelta.',
  });
})();
;
//#archivo js/games/geo-escena-6.js
// Ejercicios de «Volúmenes y superficies» (pu-ge-6) con la escena de la explicación. Armazones en js/games/figura-kit.js.
(() => {
  const N = x => String(Math.round(x * 100) / 100), miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  const eli = (K, x, y, rx, cls) => `<ellipse class="xf ${cls}" cx="${x}" cy="${K.n(y)}" rx="${rx}" ry="${K.n(rx * 0.28)}"/>`;
  const cil = (K, x, y, r, h, f, cls = 'fa') => {
    const ya = y - h * f;
    return (f > 0.01 ? `<path class="xf ${cls}" d="M${x - r} ${K.n(ya)} V${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} V${K.n(ya)}"/>` + eli(K, x, ya, r, cls) : '') + `<path class="xl" d="M${x - r} ${K.n(y - h)} V${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} V${K.n(y - h)}"/>` + eli(K, x, y - h, r, 'fn');
  };
  const cono = (K, x, y, r, h, cls) => `<path class="xf ${cls}" d="M${x - r} ${y} A${r} ${K.n(r * 0.28)} 0 0 0 ${x + r} ${y} L${x} ${K.n(y - h)} Z"/><path class="xl lm d" d="M${x - r} ${y} A${r} ${K.n(r * 0.28)} 0 0 1 ${x + r} ${y}"/>`;

  // Capas de cubitos hasta un volumen.  v { c }
  XG.figura('capas-caja', {
    ini: () => ({ c: 1 }),
    manijas: () => [{ k: 'c', min: 0, max: 9, paso: 1, et: 'capas' }],
    ok: (v, p) => p.a * p.b * v.c === p.vol,
    sol: p => ({ c: p.vol / (p.a * p.b) }),
    texto: p => `$${p.vol} \\div (${p.a} \\cdot ${p.b}) = ${p.vol / (p.a * p.b)}$`,
    alto: () => 264, pie: 'Arrastra el número de capas.',
    dib: (v, K, p, f) => K.caja([170, 190], 13, p.a, p.b, Math.round(v.c), 'fa') + K.t(196, 200, p.a, 'tm', 'start') + K.t(144, 200, p.b, 'tm', 'end') + K.f(f, K.t(8, 20, `${p.a * p.b} por capa`, 'ta', 'start')),
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\cdot ${Math.round(v.c)} = ${p.a * p.b * Math.round(v.c)}$`,
    aviso: (v, p) => (p.a * p.b * v.c > p.vol ? 'Sobran cubitos.' : 'Faltan cubitos.'),
    bien: (v, p) => `${v.c} capas de ${p.a * p.b}.`,
  });

  // Cilindro de volumen dado.  v { h }
  XG.figura('cilindro-altura', {
    ini: () => ({ h: 2 }),
    manijas: () => [{ k: 'h', min: 1, max: 12, paso: 1, en: v => [170, 190 - v.h * 13], de: (x, y) => (190 - y) / 13 }],
    ok: (v, p) => p.r ** 2 * v.h === p.vol,
    sol: p => ({ h: p.vol / p.r ** 2 }),
    texto: p => `$\\pi \\cdot ${p.r}^2 \\cdot ${p.vol / p.r ** 2} = ${p.vol}\\pi$`,
    alto: () => 216, pie: 'Arrastra la tapa del cilindro.',
    dib: (v, K, p, f) => cil(K, 170, 190, 56, v.h * 13, f) + K.l(170, 190 - v.h * 13, 226, 190 - v.h * 13, 'lf') + K.t(236, 194 - v.h * 13, `r = ${p.r}`, 'tf', 'start') + K.t(104, 194 - v.h * 6.5, N(v.h), 'ta', 'end'),
    lee: (v, p) => `$\\pi \\cdot ${p.r}^2 \\cdot ${Math.round(v.h)} = ${p.r ** 2 * Math.round(v.h)}\\pi$`,
    aviso: (v, p) => (2 * p.r * v.h === p.vol ? 'La base es πr², no 2πr.' : p.r ** 2 * v.h > p.vol ? 'Cabe más de lo pedido.' : 'Cabe menos de lo pedido.'),
    bien: () => 'Área de la base por la altura.',
  });

  // Conos llenos que se vacían en un cilindro de igual base y altura.  v { n } nivel
  XG.figura('cono-agua', {
    ini: () => ({ n: 0 }),
    manijas: p => [{ k: 'n', min: 0, max: p.h, paso: 1, en: v => [304, 196 - v.n * 10], de: (x, y) => (196 - y) / 10 }],
    ok: (v, p) => 3 * v.n === p.conos * p.h,
    sol: p => ({ n: p.conos * p.h / 3 }),
    texto: p => `$\\tfrac{${p.conos}}{3} \\cdot ${p.h} = ${p.conos * p.h / 3}$`,
    alto: () => 222, pie: 'Arrastra la marca del nivel.',
    dib(v, K, p, f) {
      let h = '';
      for (let i = 0; i < p.conos; i++) h += K.f(1.15 - f, cono(K, 42 + i * 80, 196, 36, p.h * 10, 'fg'));
      const y = 196 - v.n * 10;
      return h + K.t(84, 24, `altura ${p.h}`, 's tm') + cil(K, 232, 196, 36, p.h * 10, p.conos / 3 * f) + K.l(196, y, 304, y, 'lf gr') + K.t(188, y + 5, N(v.n), 'tf', 'end');
    },
    lee: (v, p) => `$\\tfrac{${p.conos}}{3} \\cdot ${p.h} = ${p.conos * p.h / 3}$`,
    aviso: (v, p) => (2 * v.n === p.conos * p.h ? 'Un cono no es la mitad del cilindro: es la tercera parte.' : 3 * v.n > p.conos * p.h ? 'El agua queda más abajo.' : 'El agua queda más arriba.'),
    bien: (v, p) => `Cada cono llena un tercio: ${p.conos === 2 ? 'dos conos, dos tercios' : 'uno solo, un tercio'}.`,
  });

  // Pirámide de base cuadrada.  v { h }
  XG.figura('piramide-altura', {
    ini: () => ({ h: 3 }),
    manijas: () => [{ k: 'h', min: 1, max: 11, paso: 1, en: v => [170, 167 - v.h * 12], de: (x, y) => (167 - y) / 12 }],
    ok: (v, p) => p.a ** 2 * v.h === 3 * p.vol,
    sol: p => ({ h: 3 * p.vol / p.a ** 2 }),
    texto: p => `$\\tfrac13 \\cdot ${p.a ** 2} \\cdot ${3 * p.vol / p.a ** 2} = ${p.vol}$`,
    alto: () => 222, pie: 'Arrastra la punta de la pirámide.',
    dib(v, K, p, f) {
      const o = [170, 194], a = p.a, u = 66 / a, I = (x, y) => K.iso(o, u, x, y, 0), alza = q => [q[0], q[1] - v.h * 12], T = [170, 167 - v.h * 12];
      return K.p([I(0, 0), I(a, 0), I(a, a), I(0, a)], 'fc') + K.l(...I(a / 2, a / 2), ...T, 'lf d') + K.p([I(0, 0), I(a, 0), T], 'fa') + K.p([I(0, 0), I(0, a), T], 'fg') + K.f(f, K.p([I(0, 0), I(a, 0), I(a, a), I(0, a)].map(alza), 'fn d') + [I(0, 0), I(a, 0), I(0, a)].map(q => K.l(...q, ...alza(q), 'lm d')).join('')) + K.t(206, 208, a, 'tm', 'start') + K.t(134, 208, a, 'tm', 'end') + K.l(252, 167, 252, T[1], 'lf') + K.t(260, (167 + T[1]) / 2 + 5, N(v.h), 'tf', 'start');
    },
    lee: (v, p) => `$\\tfrac13 \\cdot ${p.a ** 2} \\cdot ${Math.round(v.h)} = ${N(p.a ** 2 * Math.round(v.h) / 3)}$`,
    aviso: (v, p) => (p.a ** 2 * v.h === p.vol ? 'Eso vale el prisma; la pirámide es la tercera parte.' : p.a ** 2 * v.h > 3 * p.vol ? 'Cabe más de lo pedido.' : 'Cabe menos de lo pedido.'),
    bien: () => 'Un tercio de base por altura.',
  });

  // Caras de una caja y su superficie total.
  const caras = p => [p.a * p.b, p.a * p.h, p.b * p.h, 2 * (p.a * p.b + p.a * p.h + p.b * p.h)].map(String);
  XG.rotula('caras-caja', {
    slots: () => [{ x: 290, y: 28, w: 78, h: 34 }, { x: 290, y: 76, w: 78, h: 34 }, { x: 290, y: 124, w: 78, h: 34 }, { x: 290, y: 172, w: 78, h: 34 }],
    fichas: p => p.fichas, metas: caras,
    texto: p => `$2 \\cdot (${caras(p).slice(0, 3).join(' + ')}) = ${caras(p)[3]}$`,
    alto: () => 200,
    fondo(K, p) {
      const o = [68, 160], I = (x, y, z) => K.iso(o, 16, x, y, z), { a, b, h } = p, mas = (q, x, y) => [q[0] + x, q[1] + y];
      return K.p([I(0, 0, 0), I(a, 0, 0), I(a, 0, h), I(0, 0, h)], 'fg') + K.p([I(0, 0, 0), I(0, b, 0), I(0, b, h), I(0, 0, h)], 'ff') + K.p([I(0, 0, h), I(a, 0, h), I(a, b, h), I(0, b, h)], 'fa') + K.t(...mas(I(a / 2, 0, 0), 6, 18), a, 'tm') + K.t(...mas(I(0, b / 2, 0), -10, 14), b, 'tm') + K.t(...mas(I(a, 0, h / 2), 8, 6), h, 'tm', 'start')
        + [['tapa', 'ta'], ['frente', 'tg'], ['costado', 'tf'], ['toda la piel', '']].map(([t, k], i) => K.t(244, 33 + 48 * i, t, `s ${k}`, 'end')).join('');
    },
    aviso(q, p) { const m = caras(p); return q[3][0] === String(m[3] / 2) ? 'Hay dos caras de cada una: falta la mitad de la piel.' : q[3][0] !== m[3] ? 'Cada cara se repite al otro lado. Suma las seis.' : 'Mira qué dos medidas tiene cada cara.'; },
    bien: () => 'Seis caras, en tres parejas iguales.',
  });

  // Cubo con la superficie dada.  v { a }
  XG.figura('cubo-arista', {
    ini: () => ({ a: 1 }),
    manijas: () => [{ k: 'a', min: 1, max: 9, paso: 1, en: v => [170, 200 - v.a * 11], de: (x, y) => (200 - y) / 11 }],
    ok: (v, p) => 6 * v.a ** 2 === p.sup,
    sol: p => ({ a: Math.sqrt(p.sup / 6) }),
    texto: p => `$${p.sup} \\div 6 = ${p.sup / 6}$ y $\\sqrt{${p.sup / 6}} = ${Math.sqrt(p.sup / 6)}$`,
    alto: () => 222, pie: 'Arrastra la esquina para cambiar la arista.',
    dib: (v, K, p, f) => K.caja([170, 200], 11, v.a, v.a, v.a, 'fa', false) + K.t(170 + v.a * 9.6 + 8, 202 - v.a * 9, N(v.a), 'ta', 'start') + K.f(f, K.t(8, 20, `cada cara: ${N(v.a * v.a)}`, 'ta', 'start') + K.t(332, 20, '6 caras', 'tm', 'end')),
    lee: v => `$6 \\cdot ${Math.round(v.a)}^2 = ${6 * Math.round(v.a) ** 2}$`,
    aviso: (v, p) => (6 * v.a === p.sup ? 'Eso es el área de una cara: falta hallar su lado.' : 6 * v.a ** 2 > p.sup ? 'La piel quedó más grande.' : 'La piel quedó más chica.'),
    bien: () => 'Seis caras cuadradas iguales.',
  });

  // Litros a metros cúbicos y nivel del agua.  v { h }
  XG.figura('litros-nivel', {
    ini: () => ({ h: 0.25 }),
    manijas: () => [{ k: 'h', min: 0.25, max: 4, paso: 0.25, et: 'altura del agua (m)', rot: v => N(v.h) }],
    ok: (v, p) => p.a * p.b * v.h * 1000 === p.litros,
    sol: p => ({ h: p.litros / 1000 / (p.a * p.b) }),
    texto: p => `$${miles(p.litros)}$ litros son $${p.litros / 1000}$ m³, y $${p.litros / 1000} \\div ${p.a * p.b} = ${p.litros / 1000 / (p.a * p.b)}$ m`,
    alto: () => 262, pie: 'Arrastra la altura del agua.',
    dib(v, K, p, f) {
      const o = [160, 180], u = 28, I = (x, y, z) => K.iso(o, u, x, y, z), z = 4, q = p.litros / 1000 / (p.a * p.b), mas = (w, x, y) => [w[0] + x, w[1] + y];
      return K.caja(o, u, p.a, p.b, v.h, 'fa', false) + K.pl([I(0, 0, 0), I(0, 0, z), I(p.a, 0, z), I(p.a, p.b, z), I(0, p.b, z), I(0, 0, z)], 'lm') + K.l(...I(p.a, 0, 0), ...I(p.a, 0, z), 'lm') + K.l(...I(0, p.b, 0), ...I(0, p.b, z), 'lm') + K.t(...mas(I(p.a / 2, 0, 0), 14, 18), `${p.a} m`, 'tm') + K.t(...mas(I(0, p.b / 2, 0), -16, 18), `${p.b} m`, 'tm') + K.f(f, K.pl([I(0, p.b, q), I(0, 0, q), I(p.a, 0, q)], 'lo gr'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${p.b} \\cdot ${N(v.h)} = ${N(p.a * p.b * v.h)} \\text{ m}^3 = ${miles(Math.round(p.a * p.b * v.h * 1000))} \\text{ litros}$`,
    aviso: (v, p) => (p.a * p.b * v.h * 1000 > p.litros ? 'Con ese nivel hay más litros.' : 'Con ese nivel hay menos litros.'),
    bien: () => 'Cada metro cúbico son 1 000 litros.',
  });

  // En movimiento: se bombea agua (en π) para llenar justo un recipiente. tiro: { q, t: 'cil' | 'cono' | 'esf', rad, h, cilindro, r, c, e }
  XG.tiros('llena-tanque', {
    perilla: () => ({ et: 'Agua', min: 0, max: 40, lee: v => `${v}π` }),
    meta: t => t.r, alto: 182, ms: 1800,
    dib(t, v, K, p, f) {
      const x = 90, y = 158, k = v == null ? 0 : v / t.r * f, n = Math.min(1, k), s = 1 - Math.cbrt(1 - n);
      let h;
      if (t.t === 'cil') h = cil(K, x, y, 46, 104, n) + K.t(x - 54, y - 50, t.h, 'ta', 'end') + K.t(x, y - 126, `r = ${t.rad}`, 's tf');
      else if (t.t === 'cono') h = cono(K, x, y, 52, 106, 'fc') + (n > 0.01 ? `<path class="xf fa" d="M${x - 52} ${y} A52 14.6 0 0 0 ${x + 52} ${y} L${K.n(x + 52 * (1 - s))} ${K.n(y - 106 * s)} H${K.n(x - 52 * (1 - s))} Z"/>` : '') + K.l(x, y, x, y - 106, 'lm d') + K.t(x - 46, y - 60, t.h, 'ta', 'end') + K.t(x, y - 118, `r = ${t.rad}`, 's tf');
      else h = cil(K, x, y, 50, 100, 0) + K.c(x, y - 50, 49, 'fc') + (n > 0.01 ? K.c(x, y - 50, 49 * Math.cbrt(n), 'fa') : '') + K.t(x, y - 124, `cilindro: ${t.cilindro}π`, 's tf');
      const X = 262, H = 116, q = v == null ? 0 : v * (1 - f) / 40;
      h += K.r(X - 26, y - H, 52, H, 'fc') + K.r(X - 26, y - H * q, 52, H * q, 'fg') + K.t(X, y - H - 8, v == null ? 'bomba' : `${v}π`, 's tg');
      if (v != null && f > 0.02 && f < 0.98) h += K.l(X - 26, y - 12, x + 62, y - 12, 'lg d gr');
      if (k > 1.001) h += K.f((k - 1) * 6, [-1, 1].map(g => K.l(x + g * 58, y - 92, x + g * 66, y - 60, 'lf gr') + K.c(x + g * 68, y - 48, 4, 'fF')).join(''));
      return h;
    },
    falla: (t, v) => (t.e?.[v] || (v > t.r ? 'Se derramó.' : 'No se llenó.')),
    cuenta: t => `$${t.c} = ${t.r}\\pi$`, pie: 'Estira el agua justa y suelta la bomba.',
  });
})();
;
//#archivo js/games/orden-escena.js
// Ejercicios del mundo «Acertijos de orden y asignación» (pu-or-1 a pu-or-4) con las escenas de la explicación. Armazones en
// js/games/logica-kit.js y js/games/figura-kit.js.
(() => {
  // ------------------------------------------------------------------------------------------------ pu-or-1 · en línea
  const fila = (n, y = 46) => Array.from({ length: n }, (_, i) => { const w = Math.min(72, 330 / n - 4); return { x: 170 + (i - (n - 1) / 2) * (w + 4), y, w, h: 42, et: String(i + 1) }; });
  const linea = { slots: p => fila(p.fichas.length), alto: () => 92, fondo: (K, p) => K.t(8, 14, p.izq || 'primero', 's tm', 'start') + K.t(332, 14, p.der || 'último', 's tm', 'end') };
  XG.puestos('fila-cine', { ...linea, orden: 'de primero a último: ' });
  XG.puestos('llegada-carrera', { ...linea, orden: 'de primero a último: ' });
  XG.puestos('un-cambio', { ...linea, orden: 'de izquierda a derecha: ' });
  // Edificio: el piso 1 está abajo.
  XG.puestos('pisos-edificio', {
    orden: 'del piso 1 hacia arriba: ',
    slots: p => p.fichas.map((_, i) => ({ x: 182, y: 26 + (p.fichas.length - 1 - i) * 37, w: 110, h: 33 })),
    alto: p => p.fichas.length * 37 + 14,
    fondo(K, p) { const n = p.fichas.length; let h = K.r(110, 6, 144, n * 37 + 2, 'fc', 4); for (let i = 0; i < n; i++) h += K.t(96, 31 + (n - 1 - i) * 37, `piso ${i + 1}`, 's tm', 'end'); return h + K.l(60, n * 37 + 9, 300, n * 37 + 9); },
  });

  // Filas completas: se tocan las imposibles.  params { filas: [[…]], pistas }
  const imposible = (p, i) => p.pistas.some(x => !XG.regla(x.r, p.filas[i]));
  XG.marca('tacha-filas', {
    sitios: p => p.filas.map((_, i) => ({ x: 170, y: 22 + i * 40, w: 300, h: 34 })),
    cara: (K, p, i, on) => K.t(170, 27 + i * 40, p.filas[i].join(' · ')) + (on ? K.l(50, 22 + i * 40, 290, 22 + i * 40, 'lf') : ''),
    alto: p => p.filas.length * 40 + 6, pistas: p => p.pistas,
    sol: p => p.filas.map((_, i) => i).filter(i => imposible(p, i)),
    aviso: (on, p) => (on.some((x, i) => x && !imposible(p, i)) ? 'Tachaste una fila que cumple todas las pistas.' : 'Quedó sin tachar una fila que rompe alguna pista.'),
    bien: () => 'Cada fila tachada rompe al menos una pista.',
    texto: p => `quedan ${p.filas.filter((_, i) => !imposible(p, i)).map(f => f.join(' · ')).join(' y ')}`, pie: 'Toca las filas imposibles para tacharlas.',
  });

  // En qué puestos podría estar alguien.  params { names, quien, pistas }
  const donde = p => [...new Set(XG.perms(p.names).filter(o => p.pistas.every(x => XG.regla(x.r, o))).map(o => o.indexOf(p.quien)))].sort((a, b) => a - b);
  XG.marca('puestos-posibles', {
    sitios: p => fila(p.names.length).map(s => ({ ...s, y: 34, h: 44 })), cara: (K, p, i) => K.t(fila(p.names.length)[i].x, 40, i + 1, 'b'),
    alto: () => 66, pistas: p => p.pistas, sol: donde,
    aviso: (on, p) => (on.some((x, i) => x && !donde(p).includes(i)) ? `En uno de esos puestos, ${p.quien} rompe alguna pista.` : `${p.quien} tiene otro puesto posible.`),
    bien: p => `En esos puestos, y solo en esos, ${p.quien} cumple todo.`, texto: p => `puestos ${donde(p).map(i => i + 1).join(' y ')}`, pie: 'Toca todos los puestos posibles.',
  });

  XG.cartas('pistas-justas', { lee: o => o.join(' · '), pie: 'Son todas las filas posibles. Escoge las pistas que dejan una sola.' });

  // En movimiento: el corredor avanza hasta la casilla de su puesto.
  XG.tiros('corre-puesto', {
    perilla: (t, p) => ({ et: 'Puesto', min: 0, max: p.n, lee: v => `puesto ${v}` }), meta: t => t.r, alto: 92, ms: 1400,
    dib(t, v, K, p, f) {
      const w = 320 / p.n, X = k => 10 + (k - 0.5) * w; let h = '';
      for (let k = 1; k <= p.n; k++) h += K.r(X(k) - w / 2 + 2, 34, w - 4, 34, t.fijo?.[k] ? 'fg' : f >= 1 && k === t.r && v === t.r ? 'fo' : 'fc', 6) + K.t(X(k), 84, k, 's tm') + (t.fijo?.[k] ? K.t(X(k), 56, t.fijo[k], 's') : '');
      const x = v == null ? 0 : v * f;
      return v == null ? h : h + K.c(Math.max(12, X(x)), 51 - 22 * Math.abs(Math.sin(Math.PI * v * f)), 9, f >= 1 && v !== t.r ? 'fF' : 'fA');
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Quedó muy atrás en la fila.' : 'Quedó muy adelante en la fila.'),
    cuenta: t => t.c, pie: 'Estira hasta el puesto y suelta.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-2 · en círculo
  const mesa = (n, cy = 106, r = 78, w = 62) => Array.from({ length: n }, (_, i) => { const a = (90 - i * 360 / n) * Math.PI / 180; return { x: Math.round(170 + r * 1.35 * Math.cos(a)), y: Math.round(cy - r * Math.sin(a)), w, h: 38 }; });
  const tablero = K => K.c(170, 106, 42, 'fc') + K.arc(170, 106, 28, 60, -60, 'lm') + K.ar(...K.at(170, 106, 28, -50), ...K.at(170, 106, 28, -62), 'lm');
  const redonda = { slots: p => mesa(p.fichas.length + Object.keys(p.fijas || {}).length), alto: () => 212, fondo: tablero, orden: 'en el sentido del reloj: ' };
  XG.puestos('mesa-amigos', redonda);
  XG.puestos('collar-cerrado', redonda);
  XG.puestos('cambia-mesa', redonda);

  // Cuatro mesas: se tocan las que son la misma del modelo, girada.
  const gira = (a, b) => a.some((_, k) => a.every((x, i) => b[(i + k) % b.length] === x));
  const rueda = (K, x, y, o, r) => K.c(x, y, r * 0.5, 'fc') + o.map((t, i) => { const [a, b] = K.at(x, y, r, 90 - i * 360 / o.length); return K.t(a, b + 5, t); }).join('');
  XG.marca('misma-mesa', {
    nombre: (p, i) => `mesa ${p.mesas[i].join(', ')}`,
    sitios: () => [0, 1, 2, 3].map(i => ({ x: 90 + (i % 2) * 160, y: 170 + Math.floor(i / 2) * 106, w: 146, h: 100 })),
    cara: (K, p, i) => rueda(K, 90 + (i % 2) * 160, 170 + Math.floor(i / 2) * 106, p.mesas[i], 37),
    fondo: (K, p) => K.t(170, 16, 'modelo', 's tm') + rueda(K, 170, 66, p.modelo, 38), alto: () => 332,
    sol: p => p.mesas.map((_, i) => i).filter(i => gira(p.modelo, p.mesas[i])),
    aviso: (on, p) => (on.some((x, i) => x && !gira(p.modelo, p.mesas[i])) ? 'Una de las que tocaste cambia los vecinos o el sentido.' : 'Falta una: gírala y mira que cada uno conserva sus vecinos.'),
    bien: () => 'Girar no cambia quién sigue a quién.', texto: () => 'las que conservan el mismo orden en el sentido del reloj',
  });

  // Anillo numerado.  v { k }
  const aro = (K, n, R, cy, cls) => Array.from({ length: n }, (_, i) => { const [x, y] = K.at(170, cy, R, 90 - i * 360 / n); return K.c(x, y, 14, cls(i + 1)) + K.t(x, y + 5, i + 1, 's'); }).join('');
  const llega = p => (p.de - 1 + p.pasos) % p.n + 1;
  XG.figura('vuelta-silla', {
    ini: p => ({ k: p.de }),
    manijas: p => [{ k: 'k', min: 1, max: p.n, paso: 1, r: 12, inv: false, en: v => XPK.at(170, 114, 62, 90 - (v.k - 1) * 360 / p.n), de: (x, y) => { const g = (90 - Math.atan2(114 - y, x - 170) * 180 / Math.PI + 720) % 360; return Math.round(g / 360 * p.n) % p.n + 1; } }],
    ok: (v, p) => v.k === llega(p), sol: p => ({ k: llega(p) }),
    texto: p => `$${p.de} + ${p.pasos} = ${p.de + p.pasos}$, menos las vueltas de ${p.n}: silla $${llega(p)}$`,
    alto: () => 232, ms: 2200, pie: 'Arrastra el señalador hasta la silla donde termina.',
    dib(v, K, p, f) {
      const n = p.n, c = f ? (Math.round(p.de - 1 + p.pasos * f)) % n + 1 : 0;
      return aro(K, n, 96, 114, i => (f >= 1 && i === llega(p) ? 'fo' : i === c ? 'fA' : i === p.de ? 'fg' : 'fc')) + K.l(170, 114, ...K.at(170, 114, 62, 90 - (Math.round(v.k) - 1) * 360 / n), 'la') + (f ? K.c(170, 114, 31, 'fop') + K.t(170, 116, Math.round(p.pasos * f), 'b ta') + K.t(170, 133, 'pasos', 's tm') : '');
    },
    lee: (v, p) => `$${p.de} + ${p.pasos} = ${p.de + p.pasos} \\to ${p.de + p.pasos} - ${Math.floor((p.de + p.pasos - 1) / p.n) * p.n} = ${llega(p)}$`,
    aviso: (v, p) => (v.k === (llega(p) % p.n) + 1 || v.k === (llega(p) + p.n - 2) % p.n + 1 ? 'Por una: el primer paso es la silla siguiente.' : 'Cada vuelta completa no mueve nada: réstala.'),
    bien: p => 'Las vueltas completas no cambian la silla: solo cuenta lo que sobra.',
  });

  const otra = (a, n) => (a - 1 + n / 2) % n + 1;
  XG.rotula('frente-silla', {
    slots: () => [{ x: 298, y: 36, w: 56, h: 36 }, { x: 298, y: 96, w: 56, h: 36 }, { x: 298, y: 156, w: 56, h: 36 }],
    fichas: p => p.fichas, metas: p => p.de.map(a => String(otra(a, p.n))),
    texto: p => p.de.map(a => `frente a la ${a}, la ${otra(a, p.n)}`).join('; '), alto: () => 196,
    fondo(K, p, f) {
      const P = i => K.at(96, 98, 78, 90 - (i - 1) * 360 / p.n);
      let h = K.c(96, 98, 78, 'fn');
      for (let i = 1; i <= p.n; i++) h += K.c(...P(i), 4, 'fM');
      h += p.de.map((a, k) => { const [x, y] = P(a), cls = ['fa', 'fg', 'ff'][k], [u, w] = P(otra(a, p.n)); return (f ? K.l(x, y, x + (u - x) * f, y + (w - y) * f, ['la', 'lg', 'lf'][k]) : '') + K.c(x, y, 13, cls) + K.t(x, y + 5, a, 's'); }).join('');
      return h + p.de.map((a, k) => K.t(267, 41 + 60 * k, `frente a la ${a}`, 's', 'end')).join('') + K.t(96, 103, `${p.n} sillas`, 's tm');
    },
    aviso: (q, p) => (p.de.some((a, k) => q[k][0] === String(p.n - a) && q[k][0] !== String(otra(a, p.n))) ? 'Enfrente no es lo que le falta al total: es avanzar la mitad.' : p.de.some((a, k) => +q[k][0] > p.n) ? 'Esa silla no existe: al pasar la última se vuelve a la 1.' : 'Enfrente es media mesa: avanza la mitad de las sillas.'),
    bien: p => `Media mesa son ${p.n / 2} sillas, por cualquiera de los dos lados.`,
  });

  // Sillas a cierta distancia de otra: por los dos lados.
  const lejos = p => Array.from({ length: p.n }, (_, i) => i).filter(i => { const d = Math.abs(i + 1 - p.de); return Math.min(d, p.n - d) === p.d; });
  const sitio = (p, i) => { const a = (90 - i * 360 / p.n) * Math.PI / 180; return { x: Math.round(170 + 88 * Math.cos(a)), y: Math.round(108 - 88 * Math.sin(a)), w: 36, h: 36, red: true }; };
  XG.marca('dos-lados', {
    sitios: p => Array.from({ length: p.n }, (_, i) => sitio(p, i)), cara: (K, p, i) => { const s = sitio(p, i); return K.t(s.x, s.y + 5, i + 1); },
    fondo: (K, p) => { const s = sitio(p, p.de - 1); return K.c(s.x, s.y, 24, 'fg') + K.t(170, 104, p.quien, 'tg') + K.t(170, 124, `silla ${p.de}`, 's tm'); },
    alto: () => 216, sol: lejos,
    aviso: (on, p) => (on.filter(Boolean).length === 1 && lejos(p).some(i => on[i]) ? 'Contaste solo hacia un lado.' : 'Cuenta los pasos desde la silla siguiente, por un lado y por el otro.'),
    bien: () => 'A la misma distancia hay una silla por cada lado.', texto: p => `sillas ${lejos(p).map(i => i + 1).join(' y ')}`, pie: 'Toca todas las sillas posibles.',
  });

  // En movimiento: la ruleta avanza los pasos que se le den.
  XG.tiros('gira-ruleta', {
    perilla: () => ({ et: 'Pasos', min: 0, max: 12, lee: v => `${v} ${v === 1 ? 'paso' : 'pasos'}` }), meta: t => t.r, alto: 214, ms: 1900,
    dib(t, v, K, p, f) {
      const n = t.n, cy = 107, k = t.de - 1 + (v || 0) * f, c = Math.round(k) % n + 1;
      return aro(K, n, 88, cy, i => (f >= 1 && i === c ? ((v - t.r) % n === 0 ? 'fo' : 'ff') : i === t.de ? 'fg' : 'fc')) + K.ar(170, cy, ...K.at(170, cy, 60, 90 - k * 360 / n), 'la gr');
    },
    falla: (t, v) => t.e?.[v] || ((v - t.r) % t.n === 0 ? 'Llegó, pero dio una vuelta de más.' : v > t.r ? 'Se pasó. Cuenta desde la silla siguiente.' : 'No alcanzó a llegar.'),
    cuenta: t => t.c, pie: 'Estira los pasos y suelta: gira en el sentido del reloj.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-3 · tablas
  XG.tabla('tabla-oficios');
  XG.tabla('tabla-dos-datos');
  const cel = (n, i, c = 46, x0 = 84, y0 = 30) => ({ x: x0 + (i % n + 0.5) * c, y: y0 + (Math.floor(i / n) + 0.5) * c, w: c - 4, h: c - 4 });
  const cabezas = (K, p, c = 46) => p.cols.map((t, i) => K.t(84 + (i + 0.5) * c, 22, t, 's')).join('') + p.filas.map((t, i) => K.t(76, 30 + (i + 0.5) * c + 5, t, 's', 'end')).join('');
  const celda = (p, i) => `${p.filas[Math.floor(i / p.cols.length)]}, ${p.cols[i % p.cols.length]}`;
  const base = { alto: p => 36 + 46 * p.filas.length, fondo: cabezas, sitios: p => Array.from({ length: p.filas.length * p.cols.length }, (_, i) => cel(p.cols.length, i)) };
  const simb = (K, p, i, t, cls) => { const s = cel(p.cols.length, i); return K.t(s.x, s.y + 7, t, `b ${cls}`); };

  // Un ✓ tacha su fila y su columna: se tocan las casillas que tacha.
  const cruz = p => Array.from({ length: p.filas.length * p.cols.length }, (_, i) => i).filter(i => { const n = p.cols.length, [r, c] = [Math.floor(i / n), i % n], [R, C] = p.si; return (r === R) !== (c === C); });
  XG.marca('tacha-cruz', {
    ...base, nombre: celda, sol: cruz,
    cara: (K, p, i, on) => (i === p.si[0] * p.cols.length + p.si[1] ? simb(K, p, i, '✓', 'to') : on ? simb(K, p, i, '✗', 'tf') : ''),
    aviso(on, p) { const n = p.cols.length, f = cruz(p).filter(i => on[i]), soloF = f.length && f.every(i => Math.floor(i / n) === p.si[0]), soloC = f.length && f.every(i => i % n === p.si[1]); return on.some((x, i) => x && !cruz(p).includes(i)) ? 'Tachaste una casilla que todavía es posible.' : soloF ? 'Falta la columna: nadie más puede tener eso.' : soloC ? 'Falta la fila: esa persona ya no puede tener otro.' : 'Faltan casillas en la fila o en la columna del ✓.'; },
    bien: () => 'Toda su fila y toda su columna, menos el ✓.', texto: () => 'el resto de la fila y de la columna del ✓', pie: 'Toca las casillas que quedan tachadas.',
  });

  // Tabla con ✗: se tocan los ✓ que ya son seguros.
  const seguros = p => { const n = p.cols.length, x = i => p.x.includes(i), out = []; for (let i = 0; i < n * n; i++) { if (x(i)) continue; const r = Math.floor(i / n), c = i % n, F = Array.from({ length: n }, (_, k) => r * n + k), C = Array.from({ length: n }, (_, k) => k * n + c); if (F.every(k => k === i || x(k)) || C.every(k => k === i || x(k))) out.push(i); } return out; };
  XG.marca('hueco-unico', {
    ...base, nombre: celda, sol: seguros, cara: (K, p, i, on) => (p.x.includes(i) ? simb(K, p, i, '✗', 'tf') : on ? simb(K, p, i, '✓', 'to') : ''),
    aviso: (on, p) => (on.some((x, i) => x && p.x.includes(i)) ? 'Una casilla tachada no puede ser ✓.' : on.some((x, i) => x && !seguros(p).includes(i)) ? 'En esa fila y en esa columna queda más de un hueco: todavía no es seguro.' : seguros(p).some(i => !on[i] && Array.from({ length: p.cols.length }, (_, k) => Math.floor(i / p.cols.length) * p.cols.length + k).every(k => k === i || p.x.includes(k))) ? 'Falta uno: hay una fila con un solo hueco.' : 'Falta uno: hay una columna con un solo hueco.'),
    bien: () => 'Donde queda un solo hueco, en una fila o en una columna, va el ✓.', texto: p => seguros(p).map(i => `${p.filas[Math.floor(i / p.cols.length)]}: ${p.cols[i % p.cols.length]}`).join('; '), pie: 'Toca los ✓ que ya son seguros.',
  });

  // Tabla llena por otro: se tocan los ✓ que rompen una pista.
  const ve = p => (r, c) => p.si[r] === c;
  const malos = p => p.si.map((c, r) => r * p.cols.length + c).filter((i, r) => p.pistas.some(x => x.r[1] === r && !XG.reglaTb(x.r, ve(p), p.filas.length)));
  XG.marca('tabla-ajena', {
    ...base, nombre: celda, sol: malos, pistas: p => p.pistas, cara: (K, p, i, on) => (p.si[Math.floor(i / p.cols.length)] === i % p.cols.length ? simb(K, p, i, '✓', on ? 'tf' : 'to') : ''),
    aviso: (on, p) => (on.some((x, i) => x && p.si[Math.floor(i / p.cols.length)] !== i % p.cols.length) ? 'Solo se tocan casillas con ✓.' : on.some((x, i) => x && !malos(p).includes(i)) ? 'Tocaste un ✓ que cumple sus pistas.' : 'Queda otro ✓ que rompe una pista.'),
    bien: () => 'Esos ✓ contradicen una pista; los demás cumplen.', texto: p => malos(p).map(i => `${p.filas[Math.floor(i / p.cols.length)]} con ${p.cols[i % p.cols.length]}`).join('; '), pie: 'Toca los ✓ que rompen alguna pista.',
  });

  XG.cartas('pista-falta', { lee: o => o.join(' · '), cab: p => p.gente.join(' · '), pie: 'Los apagados ya los tachó la pista de la gorra.' });

  // Tres casas, con dos datos cada una.
  XG.puestos('casas-datos', {
    orden: 'arriba las paredes y abajo las bebidas: ', slots: () => [0, 1, 2, 3, 4, 5].map(i => ({ x: 100 + (i % 3) * 94, y: 58 + Math.floor(i / 3) * 52, w: 80, h: 40 })), alto: () => 146,
    fondo: K => [0, 1, 2].map(i => K.r(54 + i * 94, 30, 92, 108, 'fc', 4) + K.pl([[50 + i * 94, 30], [100 + i * 94, 8], [150 + i * 94, 30]], 'lm') + K.t(100 + i * 94, 27, i + 1, 's tm')).join('') + K.t(50, 62, 'pared', 's tm', 'end') + K.t(50, 114, 'toman', 's tm', 'end'),
  });

  // En movimiento: la bola cae en una de las cajas.
  const cajas = (t, v, K, f) => {
    const n = t.cajas.length, w = 320 / n, X = k => 10 + (k - 0.5) * w; let h = '';
    t.cajas.forEach((c, i) => { h += K.r(X(i + 1) - w / 2 + 4, 92, w - 8, 44, f >= 1 && i + 1 === t.r && v === t.r ? 'fo' : f >= 1 && v === i + 1 ? 'ff' : 'fc', 6) + K.t(X(i + 1), 156, c, 's') + K.t(X(i + 1), 120, i + 1, 's tm'); });
    const a = Math.min(1, f * 1.6), b = Math.max(0, f * 2.6 - 1.6);
    return h + K.l(10, 34, 330, 34, 'lm') + (v == null ? K.c(16, 24, 9, 'fA') : K.c(16 + (X(v) - 16) * a, 24 + Math.min(1, b) * 84, 9, 'fA'));
  };
  for (const nombre of ['cae-caja', 'cae-zona']) XG.tiros(nombre, {
    perilla: t => ({ et: 'Caja', min: 0, max: t.cajas.length, lee: v => t.cajas[v - 1] }), meta: t => t.r, alto: 166, ms: 1300,
    dib: (t, v, K, p, f) => cajas(t, v, K, f), falla: (t, v) => t.e?.[v] || 'Esa no: vuelve a leer las pistas.', cuenta: t => t.c, pie: 'Estira hasta la caja y suelta la bola.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-4 · condiciones
  // Los cuatro casos de dos personas.  params { a, b, r, regla }
  const CASOS = p => [[p.a, p.b], [p.a], [p.b], []];
  const pasa = p => CASOS(p).map((s, i) => [s, i]).filter(([s]) => XG.reglaEq(p.r, s)).map(([, i]) => i);
  XG.marca('casos-si', {
    sitios: () => [0, 1, 2, 3].map(i => ({ x: 90 + (i % 2) * 160, y: 36 + Math.floor(i / 2) * 64, w: 150, h: 56 })),
    cara: (K, p, i) => K.t(90 + (i % 2) * 160, 41 + Math.floor(i / 2) * 64, [`${p.a} y ${p.b}`, `solo ${p.a}`, `solo ${p.b}`, 'ninguno'][i]),
    alto: () => 136, sol: pasa,
    aviso: (on, p) => (on.some((x, i) => x && !pasa(p).includes(i)) ? 'Uno de esos casos rompe la regla.' : 'Falta un caso: si no rompe la regla, se puede.'),
    bien: () => 'La regla solo prohíbe un caso.', texto: p => pasa(p).map(i => [`${p.a} y ${p.b}`, `solo ${p.a}`, `solo ${p.b}`, 'ninguno'][i]).join(', '), pie: 'Toca todos los casos que se pueden.',
  });

  // Frases que dicen lo mismo que la regla.  params { frases: [{ t, ok }] }  (dos renglones con «|»)
  XG.marca('misma-regla', {
    sitios: p => p.frases.map((_, i) => ({ x: 170, y: 28 + i * 52, w: 310, h: 44 })), cara: (K, p, i) => K.t(170, 33 + i * 52, p.frases[i].t, 's'), alto: p => p.frases.length * 52 + 6,
    sol: p => p.frases.map((_, i) => i).filter(i => p.frases[i].ok),
    aviso: (on, p) => (on.some((x, i) => x && !p.frases[i].ok) ? 'Una de esas invierte la regla: tener el permiso no obliga.' : 'Falta una frase que dice lo mismo.'),
    bien: () => '«Solo si» es «si va, tiene el permiso»; y sin permiso no va.', texto: p => p.frases.filter(x => x.ok).map(x => `«${x.t}»`).join(' y '), pie: 'Toca todas las frases que dicen lo mismo.',
  });

  // Equipos: se toca quién va.  params { gente, cuantos?, pistas }
  const van = (on, p) => p.gente.filter((_, i) => on[i]);
  const todosEq = p => Array.from({ length: 2 ** p.gente.length }, (_, m) => p.gente.map((_, i) => !!(m >> i & 1))).filter(on => (!p.cuantos || van(on, p).length === p.cuantos) && p.pistas.every(x => XG.reglaEq(x.r, van(on, p))));
  const aIdx = on => on.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
  const gente = {
    sitios: p => p.gente.map((_, i) => { const n = p.gente.length, f = n > 4 ? Math.ceil(n / 2) : n, r = Math.floor(i / f), k = r ? n - f : f; return { x: 170 + (i % f - (k - 1) / 2) * 104, y: 34 + r * 58, w: 92, h: 48 }; }),
    cara(K, p, i) { const s = this.sitios(p)[i]; return K.t(s.x, s.y + 5, p.gente[i]); },
    alto: p => (p.gente.length > 4 ? 122 : 66), pistas: p => p.pistas,
  };
  const equipo = (nombre, d) => XG.marca(nombre, {
    ...gente, cara: (K, p, i) => gente.cara(K, p, i), cumple: (on, p) => p.pistas.map(x => XG.reglaEq(x.r, van(on, p))), vale: (on, p) => todosEq(p).some(o => o.join() === on.join()), sol: p => aIdx(todosEq(p)[0]),
    aviso: () => 'Las pistas marcadas no se cumplen.', texto: p => van(todosEq(p)[0], p).join(', '), pie: 'Toca a quienes van.', ...d,
  });
  equipo('equipo-justo', { bien: () => 'Ese equipo cumple todas las reglas.' });
  equipo('rompe-regla', { bien: () => 'Para romper un «si…» tiene que ir el primero sin el segundo.', texto: p => todosEq(p).map(o => van(o, p).join(', ')).join(' o ') });
  // El grupo más grande que cumple.
  const tope = p => Math.max(...todosEq(p).map(o => van(o, p).length));
  equipo('maximo-grupo', {
    vale: (on, p) => van(on, p).length === tope(p) && todosEq(p).some(o => o.join() === on.join()), sol: p => aIdx(todosEq(p).find(o => van(o, p).length === tope(p))), texto: p => van(todosEq(p).find(o => van(o, p).length === tope(p)), p).join(', '),
    aviso: (on, p) => (todosEq(p).some(o => o.join() === on.join()) ? `Cumple, pero hay un grupo de ${tope(p)}.` : 'Las pistas marcadas no se cumplen.'), bien: p => `Son ${tope(p)}: con uno más se rompe alguna regla.`,
  });
  // Quién tiene que ir: está en todos los equipos posibles.
  const fijos = p => p.gente.map((_, i) => i).filter(i => todosEq({ ...p, cuantos: p.son }).every(o => o[i]));
  XG.marca('quien-seguro', {
    ...gente, cara: (K, p, i) => gente.cara(K, p, i), sol: fijos,
    aviso: (on, p) => (on.some((x, i) => x && !fijos(p).includes(i)) ? 'Hay un equipo que cumple sin alguno de los que tocaste.' : 'Falta alguien que está en todos los equipos.'),
    bien: p => `Los equipos posibles son ${todosEq({ ...p, cuantos: p.son }).map(o => van(o, p).join('-')).join(', ')}.`, texto: p => fijos(p).map(i => p.gente[i]).join(', '), pie: 'Toca a quien tiene que ir, en cualquier equipo posible.',
  });

  // Afirmaciones en tres zonas.  params { equipos: [[…]], dichos: [{ t, van: […] }] }
  const zonaDe = (x, p) => { const k = p.equipos.filter(e => x.van.every(v => e.includes(v))).length; return k === p.equipos.length ? 0 : k ? 1 : 2; };
  const igual = (a, b) => [...a].sort().join('|') === [...b].sort().join('|');
  const metasZ = p => [0, 1, 2].map(z => p.dichos.filter(x => zonaDe(x, p) === z).map(x => x.t));
  XG.juego('tres-zonas', {
    zonas: true, metasZ,
    ini: () => ({ q: [[], [], []] }), listo: (s, p) => s.q.reduce((n, l) => n + l.length, 0) === p.dichos.length,
    ok: (s, p) => metasZ(p).every((m, i) => igual(m, s.q[i])), sol: p => ({ q: metasZ(p) }),
    texto: p => metasZ(p).map((m, i) => `${['tiene que', 'podría', 'no puede'][i]}: ${m.join(', ')}`).join('; '),
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-rot"></div>';
      const box = stage.firstChild; let esc = null, jz = null;
      const slots = ['tiene que', 'podría', 'no puede'].map((et, i) => ({ x: 60 + i * 110, y: 118, w: 108, h: 146, n: 4, et, ey: -80 }));
      const monta = s => { esc?.(); esc = XPD.fichas(box, { slots, fichas: p.dichos.map(x => x.t), alto: 196, cumple: () => true, fondo: K => K.t(170, 18, `equipos: ${p.equipos.map(e => e.join('-')).join('  ·  ')}`, 's ta') + (jz ? slots.map((z, i) => K.r(z.x - 56, 43, 112, 150, jz[i] ? 'bien' : 'mal', 12)).join('') : '') }, s, { set: n => { ui.set(n); ui.nota(''); }, nota() {} }); };
      monta(ui.s); ui.limpia(() => esc?.()); ui.nota('Lleva cada afirmación a su zona. Un toque la pasa de zona.');
      box.addEventListener('keydown', e => { if (!ui.locked && e.target.closest('.xfi-ch') && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation(); });
      return ok => {
        box.inert = true; jz = metasZ(p).map((m, i) => igual(m, ui.s.q[i])); monta({ q: ui.s.q.map(l => [...l]) });
        if (ok) { XS.merge(); return ui.nota('En todos, en alguno o en ninguno.'); }
        XS.nope(); ui.nota('Cuenta en cuántos equipos se cumple: en todos, en alguno o en ninguno.');
        ui.espera(2800, () => { const b = { q: metasZ(p) }; ui.muestra(b); jz = [true, true, true]; monta(b); ui.nota('Así quedan.'); });
      };
    },
  });
})();
;
//#archivo js/games/proporcion-escena.js
// Ejercicios de «Proporcionalidad y porcentajes» (pu-pr-1 a pu-pr-5) con las escenas de la explicación: vasos, barras, rectángulos de
// trabajo, vías y dobles reglas. Armazones en js/games/figura-kit.js y js/games/logica-kit.js (spec 2026-11-24-ejercicios-explora).
(() => {
  const N = x => String(Math.round(x * 100) / 100), R = Math.round, eq = x => (Math.abs(x - R(x * 100) / 100) < 1e-9 ? '=' : '\\approx');
  const miles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,'), mil = n => miles(n).replace(/\\,/g, ' ');
  const C = ['fa', 'fg', 'ff'], T = ['ta', 'tg', 'tf'];
  // Manija que se arrastra de lado: valor = (x − x0) / u.
  const lado = (k, min, max, paso, x0, u, y, mas = {}) => ({ k, min, max, paso, en: v => [x0 + v[k] * u, y], de: x => (x - x0) / u, ...mas });

  // ------------------------------------------------------------------------------------------- pu-pr-1 · razones y escalas
  const vasos = (K, n, x, y, cls, col = 12) => Array.from({ length: n }, (_, i) => { const X = x + (i % col) * 22, Y = y + Math.floor(i / col) * 26; return K.p([[X, Y], [X + 17, Y], [X + 14, Y + 20], [X + 3, Y + 20]], cls); }).join('');
  // Dos cantidades en la razón p : q y con un total dado.  v { a, b }
  XG.figura('mezcla-total', {
    ini: p => ({ a: p.p, b: p.q }),
    manijas: p => [{ k: 'a', min: 1, max: 24, paso: 1, et: p.ea }, { k: 'b', min: 1, max: 24, paso: 1, et: p.eb }],
    ok: (v, p) => v.a * p.q === v.b * p.p && v.a + v.b === p.total,
    sol: p => ({ a: p.p * p.total / (p.p + p.q), b: p.q * p.total / (p.p + p.q) }),
    texto: p => `$${p.total} \\div ${p.p + p.q} = ${p.total / (p.p + p.q)}$: ${p.p * p.total / (p.p + p.q)} y ${p.q * p.total / (p.p + p.q)}`,
    alto: () => 232, pie: 'Mueve las dos perillas.',
    dib: (v, K, p, f) => vasos(K, R(v.a), 46, 12, 'fa') + vasos(K, R(v.b), 46, 70, 'fg') + K.t(24, 34, R(v.a), 'ta') + K.t(24, 92, R(v.b), 'tg') + K.f(f, K.t(334, 130, `total: ${R(v.a + v.b)}`, 's tm', 'end')),
    lee: (v, p) => `$${R(v.a)} \\cdot ${p.q} = ${R(v.a) * p.q} \\qquad ${R(v.b)} \\cdot ${p.p} = ${R(v.b) * p.p}$`,
    aviso: (v, p) => (v.a * p.q === v.b * p.p ? `La razón está bien, pero son ${v.a + v.b} en total.` : v.a + v.b === p.total ? 'El total está bien, pero no guarda la razón.' : 'No guarda la razón: los productos en cruz no coinciden.'),
    bien: (v, p) => `Son ${p.total / (p.p + p.q)} grupos de ${p.p} y ${p.q}.`,
  });

  const suena = (p, i) => p.jarras[i][0] * p.modelo[1] === p.jarras[i][1] * p.modelo[0];
  XG.marca('mismo-sabor', {
    sitios: p => p.jarras.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 128 + Math.floor(i / 3) * 84, w: 100, h: 78 })),
    cara: (K, p, i) => { const x = 62 + (i % 3) * 108, y = 128 + Math.floor(i / 3) * 84; return K.t(x, y - 6, p.jarras[i][0], 'b ta') + K.t(x, y + 24, p.jarras[i][1], 'b tg') + K.l(x - 16, y + 4, x + 16, y + 4, 'lm'); },
    fondo: (K, p) => K.t(170, 18, 'modelo', 's tm') + K.t(150, 48, `${p.modelo[0]} de jugo`, 'ta', 'end') + K.t(190, 48, `${p.modelo[1]} de agua`, 'tg', 'start') + K.t(170, 72, 'arriba, jugo; abajo, agua', 's tm'), alto: () => 254,
    sol: p => p.jarras.map((_, i) => i).filter(i => suena(p, i)),
    aviso: (on, p) => (on.some((x, i) => x && !suena(p, i) && p.jarras[i][0] - p.modelo[0] === p.jarras[i][1] - p.modelo[1]) ? 'En una sumaste (o restaste) lo mismo a los dos: cambia el sabor.' : on.some((x, i) => x && !suena(p, i)) ? 'En una de esas los productos en cruz no coinciden.' : 'Falta otra: multiplica o divide los dos por lo mismo.'),
    bien: () => 'Los dos se multiplicaron o dividieron por lo mismo.', texto: p => p.jarras.filter((_, i) => suena(p, i)).map(j => j.join(' : ')).join(', '), pie: 'Toca todas las que saben igual.',
  });

  // Barra con dos cortes.  v { a, b }
  const partes = p => p.r.reduce((x, y) => x + y, 0);
  XG.figura('corta-reparto', {
    ini: p => ({ a: 3 * p.paso, b: p.total - 3 * p.paso }),
    manijas: p => [lado('a', p.paso, p.total - 2 * p.paso, p.paso, 20, 300 / p.total, 72, { limita: v => v.a < v.b }), lado('b', 2 * p.paso, p.total - p.paso, p.paso, 20, 300 / p.total, 72, { limita: v => v.a < v.b })],
    ok: (v, p) => { const u = p.total / partes(p); return v.a === p.r[0] * u && v.b === (p.r[0] + p.r[1]) * u; },
    sol: p => { const u = p.total / partes(p); return { a: p.r[0] * u, b: (p.r[0] + p.r[1]) * u }; },
    texto: p => `$${p.total} \\div ${partes(p)} = ${p.total / partes(p)}$: ${p.r.map(x => x * p.total / partes(p)).join(', ')}`,
    alto: () => 150, pie: 'Arrastra los dos cortes.',
    dib(v, K, p, f) {
      const X = k => 20 + k * 300 / p.total, q = [0, v.a, v.b, p.total], n = partes(p);
      return [0, 1, 2].map(i => K.r(X(q[i]), 50, X(q[i + 1]) - X(q[i]), 44, C[i]) + K.t((X(q[i]) + X(q[i + 1])) / 2, 118 + (i === 1 ? 18 : 0), N(q[i + 1] - q[i]), T[i])).join('') + K.t(170, 28, `${p.total} ${p.que}`, 'tm') + K.f(f, Array.from({ length: n - 1 }, (_, i) => K.l(20 + (i + 1) * 300 / n, 44, 20 + (i + 1) * 300 / n, 100, 'lo d')).join(''));
    },
    lee: (v, p) => `$${p.total} \\div ${partes(p)} = ${p.total / partes(p)}$`,
    aviso: (v, p) => (v.a === p.total / 3 && v.b === 2 * v.a ? 'No se reparte por igual: cada uno recibe según sus partes.' : `No les tocan ${p.r.join(', ')} partes: cuenta las rayas de cada pedazo.`),
    bien: (v, p) => `Son ${partes(p)} partes iguales de ${p.total / partes(p)}.`,
  });

  // Se conoce lo de uno solo; se hallan los demás y el total.
  const una = p => p.sabe / p.r[p.k], otros = p => p.r.map((_, i) => i).filter(i => i !== p.k);
  const metasUna = p => [...otros(p).map(i => p.r[i] * una(p)), partes(p) * una(p)].map(String);
  XG.rotula('una-parte', {
    slots: () => [0, 1, 2].map(i => ({ x: 62 + i * 108, y: 128, w: 92, h: 38 })), fichas: p => p.fichas, metas: metasUna,
    texto: p => `una parte vale $${p.sabe} \\div ${p.r[p.k]} = ${una(p)}$: ${metasUna(p).join(', ')}`, alto: () => 168,
    fondo(K, p, f) {
      const n = partes(p), w = 300 / n; let h = '', c = 0;
      p.r.forEach((g, i) => { for (let j = 0; j < g; j++, c++) h += K.r(20 + c * w + 1, 40, w - 2, 34, C[i]) + K.f(f, K.t(20 + (c + 0.5) * w, 62, una(p), 's')); h += K.t(20 + (c - g / 2) * w, 30, p.nom[i], `s ${T[i]}`); });
      return h + otros(p).map((i, k) => K.t(62 + k * 108, 164, p.nom[i], 's tm')).join('') + K.t(278, 164, 'en total', 's tm') + K.t(170, 94, `${p.nom[p.k]}: ${p.sabe}`, T[p.k]);
    },
    aviso(q, p) { const m = metasUna(p); return q[2][0] === String(una(p)) ? 'El total son todas las partes, no una.' : q[0][0] !== m[0] && q[1][0] !== m[1] ? 'Halla primero cuánto vale una sola parte.' : 'Multiplica lo que vale una parte por las que tiene cada uno.'; },
    bien: p => `Cada parte vale ${una(p)}.`,
  });

  // Escala: distancia real (escala-real) o medida en el plano (escala-plano).
  const mapa = (K, p, cm, txt) => K.r(14, 12, 312, 62, 'fc') + K.t(24, 30, `1 : ${mil(p.den)}`, 's tm', 'start') + K.l(30, 56, 30 + cm * 34, 56, 'lf gr') + K.c(30, 56, 4, 'fF') + K.c(30 + cm * 34, 56, 4, 'fF') + K.t(316, 30, txt, 'tf', 'end');
  XG.figura('escala-real', {
    ini: () => ({ km: 0.2 }), manijas: () => [lado('km', 0.2, 4.2, 0.2, 34, 64, 118)],
    ok: (v, p) => R(v.km * 100000) === p.cm * p.den, sol: p => ({ km: p.cm * p.den / 100000 }),
    texto: p => `$${p.cm} \\cdot ${miles(p.den)} = ${miles(p.cm * p.den)}$ cm $= ${p.cm * p.den / 100000}$ km`, alto: () => 166, pie: 'Arrastra el final de la distancia real.',
    dib(v, K, p, f) { const x = k => 34 + k * 64; return mapa(K, p, p.cm, `${p.cm} cm`) + K.l(x(0), 118, x(4.2), 118, 'lm') + [0, 1, 2, 3, 4].map(k => K.l(x(k), 118, x(k), 127, 'lm') + K.t(x(k), 143, k, 's tm')).join('') + K.t(170, 160, 'kilómetros', 's tm') + K.l(x(0), 118, x(v.km), 118, 'la gr') + K.t(Math.max(60, x(v.km)), 100, `${N(v.km)} km`, 'ta') + K.f(f, K.c(x(p.cm * p.den / 100000), 118, 5, 'fo') + Array.from({ length: p.cm }, (_, i) => K.l(x((i + 1) * p.den / 100000), 110, x((i + 1) * p.den / 100000), 126, 'lg')).join('')); },
    lee: (v, p) => `$1 \\text{ cm} \\to ${miles(p.den)} \\text{ cm} = ${p.den / 100} \\text{ m}$`,
    aviso: (v, p) => (R(v.km * 100000) > p.cm * p.den ? `Cada centímetro son ${p.den / 100} m; te pasaste.` : `Cada centímetro son ${p.den / 100} m; falta.`), bien: (v, p) => `${p.cm} veces ${p.den / 100} m.`,
  });
  XG.figura('escala-plano', {
    ini: () => ({ cm: 1 }), manijas: () => [lado('cm', 0.5, 8, 0.5, 30, 34, 56)],
    ok: (v, p) => v.cm * p.den === p.km * 100000, sol: p => ({ cm: p.km * 100000 / p.den }),
    texto: p => `$${p.km} \\text{ km} = ${miles(p.km * 100000)}$ cm, y $${miles(p.km * 100000)} \\div ${miles(p.den)} = ${p.km * 100000 / p.den}$`, alto: () => 150, pie: 'Arrastra el punto del mapa.',
    dib: (v, K, p, f) => mapa(K, p, v.cm, `${N(v.cm)} cm`) + K.l(30, 116, 310, 116, 'la gr') + K.c(30, 116, 5, 'fA') + K.c(310, 116, 5, 'fA') + K.t(170, 106, `${p.km} km de verdad`, 'ta') + K.f(f, K.t(170, 142, `tu medida serían ${N(v.cm * p.den / 100000)} km`, 's tm')),
    lee: (v, p) => `$${N(v.cm)} \\cdot ${miles(p.den)} \\text{ cm} = ${N(v.cm * p.den / 100000)} \\text{ km}$`,
    aviso: (v, p) => (v.cm * p.den > p.km * 100000 ? 'En el mapa quedó muy lejos.' : 'En el mapa quedó muy cerca.'), bien: (v, p) => `Cada centímetro son ${N(p.den / 100000)} km.`,
  });

  // Se agrega solo de un lado hasta lograr la razón p : q.  v { n }
  XG.figura('arregla-razon', {
    ini: () => ({ n: 0 }), manijas: () => [{ k: 'n', min: 0, max: 12, paso: 1, et: 'vasos de jugo que se agregan' }],
    ok: (v, p) => (p.a + v.n) * p.q === p.b * p.p, sol: p => ({ n: p.b * p.p / p.q - p.a }),
    texto: p => `$\\tfrac{${p.p}}{${p.q}} = \\tfrac{${p.b * p.p / p.q}}{${p.b}}$: se agregan $${p.b * p.p / p.q - p.a}$`, alto: () => 210, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => vasos(K, p.a + R(v.n), 46, 12, 'fa', 9) + vasos(K, p.b, 46, 92, 'fg', 9) + K.t(24, 34, p.a + R(v.n), 'ta') + K.t(24, 112, p.b, 'tg') + K.t(334, 34, 'jugo', 's ta', 'end') + K.t(334, 112, 'agua', 's tg', 'end'),
    lee: (v, p) => `$${p.a + R(v.n)} \\cdot ${p.q} = ${(p.a + R(v.n)) * p.q} \\qquad ${p.b} \\cdot ${p.p} = ${p.b * p.p}$`,
    aviso: (v, p) => ((p.a + v.n) * p.q > p.b * p.p ? 'Quedó con demasiado jugo.' : 'Todavía le falta jugo.'), bien: (v, p) => `${p.a + v.n} y ${p.b} es lo mismo que ${p.p} y ${p.q}.`,
  });

  // En movimiento: el balde se llena con lo que se le dé y debe llegar a la raya.
  const balde = (nombre, o) => XG.tiros(nombre, {
    perilla: () => ({ et: o.et, min: 0, max: o.max, cara: o.k ? v => v * o.k : undefined, lee: v => `${v * (o.k || 1)}${o.u || ''}` }), meta: t => t.r / (o.k || 1), alto: 138, ms: 1600,
    dib(t, v, K, p, f) {
      const m = t.r / (o.k || 1), k = v == null ? 0 : (v === m ? 1 : v < m ? 0.7 : 1.2) * f, H = 78, y = 124, n = Math.min(1.16, k);
      return K.p([[112, y - 96], [228, y - 96], [214, y], [126, y]], 'fn') + (n > 0.01 ? K.p([[126, y], [214, y], [214 + 14 * n * H / 96, y - H * n], [126 - 14 * n * H / 96, y - H * n]], k > 1.001 ? 'ff' : 'fa') : '') + K.l(106, y - H, 234, y - H, f >= 1 && v === m ? 'lo gr' : 'lg d gr') + (v == null ? '' : K.t(170, y - 30, `${v * (o.k || 1)}${o.u || ''}`, 'b')) + (k > 1.1 ? K.f(Math.min(1, (k - 1.1) * 10), K.c(100, y - 70, 5, 'fF') + K.c(240, y - 62, 5, 'fF') + K.c(94, y - 40, 4, 'fF')) : '');
    },
    falla: (t, v) => t.e?.[v * (o.k || 1)] || (v * (o.k || 1) > t.r ? 'Se pasó de la raya.' : 'No llegó a la raya.'), cuenta: t => `$${t.c} = ${t.r}$${t.u || ''}`, pie: 'Estira la cantidad justa y suelta.',
  });
  balde('sirve-partes', { et: 'Cantidad', max: 40 });
  balde('lanza-regla', { et: 'Cantidad', max: 40 });
  balde('tiro-porciento', { et: 'Cantidad', max: 40 });
  balde('tiro-precio', { et: 'Precio', max: 24, k: 5 });

  // ------------------------------------------------------------------------------------------------ pu-pr-2 · regla de tres
  // Directa: se estira la segunda barra.  params { x1, y1, x2, ex, ey, max, paso }   v { y }
  XG.figura('precio-unidad', {
    ini: p => ({ y: p.y1 }), manijas: p => [lado('y', p.paso, p.max, p.paso, 24, 280 / p.max, 148)],
    ok: (v, p) => v.y * p.x1 === p.y1 * p.x2, sol: p => ({ y: p.y1 * p.x2 / p.x1 }),
    texto: p => `$${p.y1} \\div ${p.x1} = ${p.y1 / p.x1}$ y $${p.x2} \\cdot ${p.y1 / p.x1} = ${p.y1 * p.x2 / p.x1}$`, alto: () => 180, pie: 'Arrastra el final de la barra.',
    dib(v, K, p, f) {
      const u = 280 / p.max; let h = K.t(24, 24, `${p.x1} ${p.ex}`, 's tm', 'start') + K.r(24, 32, p.y1 * u, 30, 'fg') + K.t(34 + p.y1 * u, 53, p.y1, 'tg', 'start') + K.t(24, 122, `${p.x2} ${p.ex}`, 's tm', 'start') + K.r(24, 132, v.y * u, 32, 'fa') + K.t(24 + v.y * u / 2, 153, N(v.y), 'ta');
      if (f) { for (let i = 1; i < p.x1; i++) h += K.l(24 + i * p.y1 / p.x1 * u, 32, 24 + i * p.y1 / p.x1 * u, 62, 'lr'); h += K.f(f, Array.from({ length: p.x2 }, (_, i) => K.l(24 + (i + 1) * p.y1 / p.x1 * u, 126, 24 + (i + 1) * p.y1 / p.x1 * u, 170, 'lo d')).join('')); }
      return h;
    },
    lee: (v, p) => `$${p.y1} \\div ${p.x1} = ${N(p.y1 / p.x1)} \\qquad ${N(v.y)} \\div ${p.x2} ${eq(v.y / p.x2)} ${N(v.y / p.x2)}$`,
    aviso: (v, p) => (v.y === p.y1 + p.x2 - p.x1 ? 'Sumaste la diferencia; lo que no cambia es el valor de uno.' : v.y * p.x1 > p.y1 * p.x2 ? 'Cada uno saldría más caro que antes.' : 'Cada uno saldría más barato que antes.'), bien: (v, p) => `Cada uno vale ${N(p.y1 / p.x1)}.`,
  });

  // Inversa: rectángulo de trabajo con un lado dado.  params { a1, b1, a2, ea, eb, max }   v { b }
  const ejes = K => K.l(64, 182, 330, 182, 'lm') + K.l(64, 182, 64, 12, 'lm');
  XG.figura('rectangulo-trabajo', {
    ini: () => ({ b: 2 }), manijas: p => [{ k: 'b', min: 1, max: p.max, paso: 1, en: v => [64 + p.a2 * 11, 182 - v.b * 160 / p.max], de: (x, y) => (182 - y) * p.max / 160 }],
    ok: (v, p) => v.b * p.a2 === p.a1 * p.b1, sol: p => ({ b: p.a1 * p.b1 / p.a2 }),
    texto: p => `$${p.a1} \\cdot ${p.b1} = ${p.a1 * p.b1}$ y $${p.a1 * p.b1} \\div ${p.a2} = ${p.a1 * p.b1 / p.a2}$`, alto: () => 206, pie: 'Arrastra el borde de arriba del rectángulo.',
    dib(v, K, p, f) { const uy = 160 / p.max; return ejes(K) + K.f(0.4 + 0.6 * f, K.r(64, 182 - p.b1 * uy, p.a1 * 22, p.b1 * uy, 'fn d') + K.t(70 + p.a1 * 22, 190 - p.b1 * uy, `${p.a1} × ${p.b1}`, 's tm', 'start')) + K.r(64, 182 - v.b * uy, p.a2 * 22, v.b * uy, 'fa') + K.t(64 + p.a2 * 11, 200, `${p.a2} ${p.ea}`, 'ta') + K.t(56, 186 - v.b * uy / 2, N(v.b), 'tg', 'end') + K.t(56, 202 - v.b * uy / 2, p.eb, 's tm', 'end'); },
    lee: (v, p) => `$${p.a1} \\cdot ${p.b1} = ${p.a1 * p.b1} \\qquad ${p.a2} \\cdot ${R(v.b)} = ${p.a2 * R(v.b)}$`,
    aviso: (v, p) => (v.b * p.a1 === p.b1 * p.a2 ? `Dividiste como si fuera directa: con menos ${p.ea} no puede tardar menos.` : v.b * p.a2 > p.a1 * p.b1 ? 'Sobra trabajo: el producto quedó más grande.' : 'Falta trabajo: el producto quedó más chico.'), bien: (v, p) => `Las dos cuentas dan ${p.a1 * p.b1}.`,
  });

  XG.marca('crece-o-baja', {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 320, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6,
    sol: p => p.casos.map((_, i) => i).filter(i => p.casos[i].inv),
    aviso: (on, p) => (on.some((x, i) => x && !p.casos[i].inv) ? 'En una de esas, si una se duplica la otra también: es directa.' : 'Falta otra en la que una sube y la otra baja.'),
    bien: () => 'En esas, al duplicar una, la otra queda a la mitad.', texto: p => p.casos.filter(c => c.inv).map(c => c.t).join('; '), pie: 'Toca todas las inversas.',
  });

  // Compuesta: filas = horas, columnas = quienes trabajan.  params { a1, b1, c1, a?, b?, c, ea }; se mueve lo que falta.  v { n }
  const compuesta = (nombre, horas) => XG.figura(nombre, {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: horas ? 'horas' : p.ea }],
    ok: (v, p) => v.n * p.fijo * p.c1 === p.c * p.a1 * p.b1, sol: p => ({ n: p.c * p.a1 * p.b1 / (p.c1 * p.fijo) }),
    texto: p => `$${p.c1} \\div (${p.a1} \\cdot ${p.b1}) = ${p.c1 / (p.a1 * p.b1)}$ y $${p.c} \\div (${p.fijo} \\cdot ${p.c1 / (p.a1 * p.b1)}) = ${p.c * p.a1 * p.b1 / (p.c1 * p.fijo)}$`,
    alto: () => 236, pie: 'Cada cuadro es uno trabajando una hora. Mueve la perilla.',
    dib(v, K, p, f) {
      const n = R(v.n), a = horas ? p.fijo : n, b = horas ? n : p.fijo, u = 16, val = p.c1 / (p.a1 * p.b1);
      const cuadros = (x, y, a, b, w, cls, t) => Array.from({ length: a * b }, (_, i) => K.r(x + (i % a) * w + 1, y + Math.floor(i / a) * w + 1, w - 2, w - 2, cls, 2) + (t ? K.f(f, K.t(x + (i % a + 0.5) * w, y + (Math.floor(i / a) + 0.5) * w + 4, val, 's')) : '')).join('');
      return K.t(60, 18, `${p.c1} ${p.que}`, 's tg') + cuadros(60 - p.a1 * 8, 28, p.a1, p.b1, 16, 'fg') + K.t(60, 46 + p.b1 * 16, `${p.a1} ${p.ea}`, 's tm') + K.t(60, 62 + p.b1 * 16, `${p.b1} h`, 's tm') + K.t(226, 18, `${a} ${p.ea}, ${b} h`, 's ta') + cuadros(226 - a * u / 2, 28, a, b, u, 'fa', true);
    },
    lee: (v, p) => `$${p.fijo} \\cdot ${R(v.n)} \\cdot ${p.c1 / (p.a1 * p.b1)} = ${p.fijo * R(v.n) * p.c1 / (p.a1 * p.b1)}$`,
    aviso: (v, p) => (v.n * p.fijo * p.c1 > p.c * p.a1 * p.b1 ? `Harían más de ${p.c}.` : `Harían menos de ${p.c}.`), bien: (v, p) => `Cada cuadro hace ${p.c1 / (p.a1 * p.b1)}.`,
  });
  compuesta('cuadros-trabajo', true); compuesta('maquinas-justas', false);

  // Tabla directa con tres huecos.  params { k, x: [..], huecos: [['y', i] | ['x', i]] }
  const metasT = p => p.huecos.map(([f, i]) => N(f === 'y' ? p.x[i] * p.k : p.x[i]));
  XG.rotula('tabla-directa', {
    slots: p => p.huecos.map(([f, i]) => ({ x: 112 + i * (208 / p.x.length) + 104 / p.x.length, y: f === 'x' ? 44 : 112, w: 46, h: 38 })), fichas: p => p.fichas, metas: metasT,
    texto: p => `cada uno vale $${p.k}$: ${metasT(p).join(', ')}`, alto: () => 148,
    fondo: (K, p) => { const w = 208 / p.x.length, hay = (f, i) => p.huecos.some(h => h[0] === f && h[1] === i); return K.t(100, 49, p.ex, 's', 'end') + K.t(100, 117, p.ey, 's', 'end') + p.x.map((x, i) => K.r(112 + i * w + 2, 18, w - 4, 52, 'fc', 6) + K.r(112 + i * w + 2, 86, w - 4, 52, 'fc', 6) + (hay('x', i) ? '' : K.t(112 + (i + 0.5) * w, 49, x, 'ta')) + (hay('y', i) ? '' : K.t(112 + (i + 0.5) * w, 117, N(x * p.k), 'tg'))).join(''); },
    aviso: (q, p) => (q.some((l, i) => { const [f, j] = p.huecos[i], d = p.x.findIndex((_, k) => !p.huecos.some(h => h[1] === k)); return f === 'y' && l[0] === N(p.x[d] * p.k + p.x[j] - p.x[d]); }) ? 'Sumaste lo mismo arriba y abajo; el cociente es lo que no cambia.' : 'Halla cuánto vale uno con la columna completa: ese cociente sirve para todas.'),
    bien: p => `En todas las columnas, abajo entre arriba da ${N(p.k)}.`,
  });

  // Cambian las personas a mitad de camino.  params { g, d, pasan, llegan }   v { x } de medio en medio
  const queda = p => p.g * (p.d - p.pasan) / (p.g + p.llegan);
  XG.figura('raciones-dias', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 0.5, max: p.d, paso: 0.5, en: v => [40 + (p.pasan + v.x) * 20, 92], de: x => (x - 40) / 20 - p.pasan }],
    ok: (v, p) => v.x === queda(p), sol: p => ({ x: queda(p) }),
    texto: p => `quedan $${p.g} \\cdot ${p.d - p.pasan} = ${p.g * (p.d - p.pasan)}$ raciones y $${p.g * (p.d - p.pasan)} \\div ${p.g + p.llegan} = ${queda(p)}$ días`, alto: () => 186, pie: 'Arrastra hasta cuándo alcanza la comida.',
    dib(v, K, p, f) {
      const h = n => n * 4.6, y = 158; return K.l(30, y, 330, y, 'lm') + K.r(40, y - h(p.g), p.pasan * 20, h(p.g), 'fg', 0) + K.t(40 + p.pasan * 10, y - h(p.g) - 7, p.g, 'tg') + K.f(0.35 + 0.65 * f, K.r(40 + p.pasan * 20, y - h(p.g), (p.d - p.pasan) * 20, h(p.g), 'fn d', 0)) + K.r(40 + p.pasan * 20, y - h(p.g + p.llegan), v.x * 20, h(p.g + p.llegan), 'fa', 0) + K.t(40 + p.pasan * 20 + v.x * 10, y - h(p.g + p.llegan) - 7, p.g + p.llegan, 'ta') + K.t(40 + p.pasan * 10, y + 18, `${p.pasan} días`, 's tm') + K.t(40 + p.pasan * 20 + Math.max(26, v.x * 10), y + 18, `${N(v.x)} ${v.x === 1 ? 'día' : 'días'} más`, 's ta');
    },
    lee: (v, p) => `$${p.g + p.llegan} \\cdot ${N(v.x)} = ${N((p.g + p.llegan) * v.x)} \\qquad ${p.g} \\cdot ${p.d - p.pasan} = ${p.g * (p.d - p.pasan)}$`,
    aviso: (v, p) => (v.x === p.d - p.pasan ? 'Eso duraría si no llegara nadie.' : v.x === p.g * p.d / (p.g + p.llegan) ? 'Ya se gastaron los primeros días: descuéntalos.' : v.x > queda(p) ? 'Se gastaría más comida de la que queda.' : 'Sobraría comida.'), bien: () => 'Las raciones que quedaban, repartidas entre más personas.',
  });

  // --------------------------------------------------------------------------------------- pu-pr-3 · velocidad y trabajo
  const carro = (K, x, y, cls) => K.r(x - 15, y - 13, 30, 10, cls, 4) + K.r(x - 8, y - 20, 16, 9, cls, 3) + K.c(x - 8, y - 2, 4, 'fk') + K.c(x + 8, y - 2, 4, 'fk');
  const cx = (p, k) => Math.max(10, Math.min(330, 24 + k / p.D * 292));
  const via = (K, p) => K.l(14, 104, 326, 104, 'lm');
  const reloj = (nombre, d) => XG.figura(nombre, {
    ini: () => ({ t: 0 }), manijas: p => [{ k: 't', min: 0, max: p.max, paso: 0.5, et: 'horas', rot: v => N(v.t) }], alto: () => 186, ms: 2000, pie: 'Mueve el reloj. Al comprobar salen los carros.', ...d,
  });
  reloj('reloj-encuentro', {
    ok: (v, p) => v.t * (p.va + p.vb) === p.D, sol: p => ({ t: p.D / (p.va + p.vb) }), texto: p => `$${p.D} \\div (${p.va} + ${p.vb}) = ${p.D / (p.va + p.vb)}$ h`,
    dib(v, K, p, f) { const a = p.va * v.t * f, b = p.D - p.vb * v.t * f; return via(K, p) + carro(K, cx(p, a), 100, 'fa') + carro(K, cx(p, b), 100, 'fg') + K.t(24, 62, `${p.va} km/h`, 's ta', 'start') + K.t(316, 62, `${p.vb} km/h`, 's tg', 'end') + K.cota(24, 110, 316, 110, `${p.D} km`) + (f ? K.l(24, 34, cx(p, a), 34, 'la gr') + K.l(316, 42, cx(p, b), 42, 'lg gr') : ''); },
    lee: (v, p) => `$${p.va} \\cdot ${N(v.t)} + ${p.vb} \\cdot ${N(v.t)} = ${N((p.va + p.vb) * v.t)}$`, aviso: (v, p) => (v.t * (p.va + p.vb) > p.D ? 'Ya se cruzaron y siguieron de largo.' : v.t * p.va === p.D ? 'El otro también avanza.' : 'Todavía no se encuentran.'), bien: p => 'Cada hora se acercan lo que avanzan los dos.',
  });
  const caza = { ok: (v, p) => v.t * (p.vb - p.va) === p.vent, sol: p => ({ t: p.vent / (p.vb - p.va) }),
    dib(v, K, p, f) { const a = p.vent + p.va * v.t * f, b = p.vb * v.t * f; return via(K, p) + carro(K, cx(p, a), 100, 'fg') + carro(K, cx(p, b), 100, 'fa') + K.t(24, 30, `el de atrás: ${p.vb} km/h`, 's ta', 'start') + K.t(24, 48, `el de adelante: ${p.va} km/h`, 's tg', 'start') + (f ? K.l(24, 116, cx(p, b), 116, 'la gr') + K.l(24, 124, cx(p, a), 124, 'lg gr') : p.horas ? '' : K.cota(24, 110, cx(p, p.vent), 110, `${p.vent} km`)); },
    lee: (v, p) => `$\\text{ventaja: } ${p.vent} - ${p.vb - p.va} \\cdot ${N(v.t)} = ${N(p.vent - (p.vb - p.va) * v.t)}$`, bien: (v, p) => `Cada hora descuenta ${p.vb - p.va} km.` };
  reloj('reloj-caza', { ...caza, texto: p => `$${p.vent} \\div (${p.vb} - ${p.va}) = ${p.vent / (p.vb - p.va)}$ h`, aviso: (v, p) => (v.t * (p.vb - p.va) > p.vent ? 'Ya lo alcanzó y lo pasó.' : 'Aún no lo alcanza: cada hora solo descuenta la diferencia.') });
  reloj('sale-despues', { ...caza, texto: p => `ventaja $${p.va} \\cdot ${p.horas} = ${p.vent}$ km, y $${p.vent} \\div ${p.vb - p.va} = ${p.vent / (p.vb - p.va)}$ h`, aviso: (v, p) => (v.t === p.horas ? 'Esas son las horas de ventaja, no las de la persecución.' : v.t === p.vent / (p.vb - p.va) + p.horas ? 'Cuenta desde que sale el segundo.' : v.t * (p.vb - p.va) > p.vent ? 'Ya lo alcanzó y lo pasó.' : 'Aún no lo alcanza.') });

  // Velocidad media de dos tramos iguales.  v { v }
  XG.figura('media-viaje', {
    ini: p => ({ v: p.v1 }), manijas: p => [lado('v', p.v1, p.v2, 2.5, 24 - p.v1 * 292 / (p.v2 - p.v1), 292 / (p.v2 - p.v1), 132)],
    ok: (v, p) => v.v === 2 * p.d / (p.d / p.v1 + p.d / p.v2), sol: p => ({ v: 2 * p.d / (p.d / p.v1 + p.d / p.v2) }),
    texto: p => `$\\tfrac{${2 * p.d}}{${p.d / p.v1} + ${p.d / p.v2}} = ${2 * p.d / (p.d / p.v1 + p.d / p.v2)}$ km/h`, alto: () => 172, pie: 'Arrastra la velocidad media de todo el viaje.',
    dib(v, K, p, f) { const x = q => 24 + (q - p.v1) * 292 / (p.v2 - p.v1), t1 = p.d / p.v1, t2 = p.d / p.v2, u = 270 / (t1 + t2); return K.t(24, 20, `${p.d} km a ${p.v1} km/h`, 's ta', 'start') + K.t(316, 20, `${p.d} km a ${p.v2} km/h`, 's tg', 'end') + (f ? K.r(34, 34, t1 * u * Math.min(1, f * 2), 26, 'fa') + K.r(34 + t1 * u, 34, t2 * u * Math.max(0, f * 2 - 1), 26, 'fg') + K.f(f * 2 - 1, K.t(34 + t1 * u / 2, 52, `${t1} h`, 'ta') + K.t(34 + (t1 + t2 / 2) * u, 52, `${t2} h`, 'tg')) : K.r(34, 34, 135, 26, 'fa') + K.r(169, 34, 135, 26, 'fg') + K.t(169, 78, 'dos tramos de igual distancia', 's tm')) + K.l(24, 132, 316, 132, 'lm') + K.t(24, 160, p.v1, 's tm') + K.t(316, 160, p.v2, 's tm') + K.t(Math.max(44, Math.min(292, x(v.v))), 110, `${N(v.v)} km/h`, 'b') + K.f(f, K.c(x(2 * p.d / (t1 + t2)), 132, 6, 'fo')); },
    lee: (v, p) => `$${2 * p.d} \\text{ km en } ${p.d / p.v1 + p.d / p.v2} \\text{ h}$`, aviso: (v, p) => (v.v === (p.v1 + p.v2) / 2 ? 'Promediaste las velocidades, pero va más horas despacio.' : v.v > 2 * p.d / (p.d / p.v1 + p.d / p.v2) ? 'Es menos: pasa más tiempo yendo despacio.' : 'Es más: revisa las horas de cada tramo.'), bien: () => 'Toda la distancia entre todo el tiempo.',
  });

  // Tanque con dos llaves.
  const tanque = (K, a, b, f) => { const H = 128, y = 150, t = Math.min(1, a + b), A = a / (a + b || 1) * t; return K.r(112, y - H * A * f, 116, H * A * f, 'fa', 0) + K.r(112, y - H * t * f, 116, H * (t - A) * f, 'fg', 0) + K.r(112, y - H, 116, H, 'fn', 3) + (a + b > 1.001 && f >= 1 ? [106, 234].map(x => K.l(x, y - H + 6, x, y - H + 60, 'lf gr')).join('') : ''); };
  XG.figura('juntos-llenan', {
    ini: () => ({ t: 1 }), manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: 'horas' }],
    ok: (v, p) => v.t * (p.A + p.B) === p.A * p.B, sol: p => ({ t: p.A * p.B / (p.A + p.B) }), texto: p => `$\\tfrac{1}{${p.A}} + \\tfrac{1}{${p.B}} = \\tfrac{1}{${p.A * p.B / (p.A + p.B)}}$: $${p.A * p.B / (p.A + p.B)}$ h`,
    alto: () => 222, ms: 1900, pie: 'Mueve el reloj. Al comprobar se abren las dos llaves.',
    dib: (v, K, p, f) => tanque(K, v.t / p.A, v.t / p.B, f) + K.t(100, 50, `sola: ${p.A} h`, 's ta', 'end') + K.t(242, 50, `sola: ${p.B} h`, 's tg', 'start'),
    lee: (v, p) => `$\\tfrac{${R(v.t)}}{${p.A}} + \\tfrac{${R(v.t)}}{${p.B}} = \\tfrac{${R(v.t) * (p.A + p.B)}}{${p.A * p.B}}$`, aviso: (v, p) => (v.t === (p.A + p.B) / 2 ? 'El promedio no sirve: juntas tardan menos que la más rápida sola.' : v.t >= Math.min(p.A, p.B) ? 'Se riega: juntas tardan menos que la más rápida sola.' : v.t * (p.A + p.B) > p.A * p.B ? 'Se riega: ya estaba lleno.' : 'No alcanza a llenarse.'), bien: () => 'Se suma lo que cada una llena por hora.',
  });
  const sola = p => p.A * p.j / (p.A - p.j);
  XG.figura('segunda-llave', {
    ini: () => ({ B: 1 }), manijas: p => [{ k: 'B', min: 1, max: p.max, paso: 1, et: 'horas de la segunda, sola' }],
    ok: (v, p) => v.B === sola(p), sol: p => ({ B: sola(p) }), texto: p => `$\\tfrac{1}{${p.j}} - \\tfrac{1}{${p.A}} = \\tfrac{1}{${sola(p)}}$: $${sola(p)}$ h`,
    alto: () => 222, ms: 1900, pie: 'Mueve las horas de la segunda llave.',
    dib: (v, K, p, f) => tanque(K, p.j / p.A, p.j / v.B, f) + K.t(100, 50, `sola: ${p.A} h`, 's ta', 'end') + K.t(242, 50, 'sola: ?', 's tg', 'start') + K.t(170, 14, `juntas: ${p.j} h`, 's'),
    lee: (v, p) => `$\\tfrac{${p.j}}{${p.A}} + \\tfrac{${p.j}}{${R(v.B)}} ${eq(p.j / p.A + p.j / R(v.B))} ${N(p.j / p.A + p.j / R(v.B))} \\text{ tanques}$`, aviso: (v, p) => (v.B === p.A - p.j ? 'No se restan las horas: se resta lo que llenan por hora.' : v.B > sola(p) ? `Con las dos, en ${p.j} horas no se llenaría.` : `Con las dos, antes de ${p.j} horas ya se regaría.`), bien: p => 'Lo que llenan juntas en una hora, menos lo que llena la primera.',
  });

  // Distancia, velocidad o tiempo: el dato que falta de tres viajes.  params { viajes: [{ d, v, t, falta }] }
  const metasV = p => p.viajes.map(x => N(x[x.falta]));
  XG.rotula('tres-viajes', {
    slots: p => p.viajes.map((x, i) => ({ x: { d: 128, v: 210, t: 292 }[x.falta], y: 52 + i * 50, w: 66, h: 38 })), fichas: p => p.fichas, metas: metasV,
    texto: p => p.viajes.map(x => `$${x.v} \\cdot ${x.t} = ${x.d}$`).join(', '), alto: () => 182,
    fondo: (K, p) => K.t(128, 20, 'km', 's tm') + K.t(210, 20, 'km/h', 's tm') + K.t(292, 20, 'horas', 's tm') + p.viajes.map((x, i) => K.t(80, 57 + i * 50, x.n, 's', 'end') + [['d', 128], ['v', 210], ['t', 292]].filter(([k]) => k !== x.falta).map(([k, X]) => K.t(X, 57 + i * 50, N(x[k]))).join('')).join(''),
    aviso: (q, p) => { const i = p.viajes.findIndex((x, k) => q[k][0] !== N(x[x.falta])), x = p.viajes[i]; return x.falta === 'd' ? 'La distancia es velocidad por tiempo.' : x.falta === 't' ? 'El tiempo es distancia entre velocidad.' : 'La velocidad es distancia entre tiempo.'; }, bien: () => 'En los tres, velocidad por tiempo da la distancia.',
  });

  // En movimiento: el bus anda las horas que se le den y debe parar en la bandera.
  XG.tiros('lanza-viaje', {
    perilla: () => ({ et: 'Horas', min: 0, max: 20, lee: v => `${v} h` }), meta: t => t.r, alto: 112, ms: 1800,
    dib(t, v, K, p, f) { const xm = 250, x = v == null ? 40 : 40 + (xm - 40) * (v === t.r ? 1 : v < t.r ? 0.7 : 1.3) * f; return K.l(10, 90, 330, 90) + K.l(xm, 90, xm, 34, 'lo gr') + K.p([[xm, 34], [xm + 22, 42], [xm, 50]], 'fo') + (v == null ? '' : K.l(40, 96, x, 96, 'la gr') + K.t(40, 22, `${v} h`, 'b', 'start')) + carro(K, x, 88, f >= 1 && v !== t.r ? 'ff' : 'fA'); },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Se pasó de la bandera.' : 'No alcanzó a llegar.'), cuenta: t => `$${t.c} = ${t.r}$ h`, pie: 'Estira las horas y suelta.',
  });

  // ------------------------------------------------------------------------------------------------ pu-pr-4 · porcentajes
  const regla = (K, L, p, q, cls) => K.r(25, 52, L, 40, 'fc') + K.r(25, 52, p / 100 * L, 40, cls || 'fa') + Array.from({ length: 11 }, (_, k) => K.l(25 + k * L / 10, 92, 25 + k * L / 10, k % 5 ? 97 : 102, 'lm')).join('');
  XG.figura('parte-barra', {
    ini: () => ({ q: 0 }), manijas: p => [lado('q', 0, p.total, p.paso, 25, 290 / p.total, 72)],
    ok: (v, p) => v.q * 100 === p.pct * p.total, sol: p => ({ q: p.pct * p.total / 100 }), texto: p => `$${p.pct / 100} \\cdot ${p.total} = ${p.pct * p.total / 100}$`, alto: () => 138, pie: 'Arrastra el borde de la parte.',
    dib: (v, K, p, f) => regla(K, 290, v.q / p.total * 100) + K.t(25, 40, '0', 's tm') + K.t(315, 40, p.total, 's tm') + (v.q > p.total * 0.08 && v.q < p.total * 0.9 ? K.t(25 + v.q / p.total * 290, 40, N(v.q), 'tg') : K.t(170, 22, N(v.q), 'tg')) + K.t(25, 120, '0 %', 's tm') + K.t(308, 120, '100 %', 's tm') + K.f(f, K.l(25 + p.pct * 2.9, 46, 25 + p.pct * 2.9, 104, 'lo gr') + K.t(25 + p.pct * 2.9, 122, `${p.pct} %`, 'to')),
    lee: (v, p) => `$\\tfrac{${R(v.q)}}{${p.total}} ${eq(v.q / p.total * 100)} ${N(R(v.q) / p.total * 100)}\\,\\%$`, aviso: (v, p) => (v.q === p.pct ? `${p.pct} es el porcentaje, no la cantidad.` : v.q * 100 > p.pct * p.total ? `Es más del ${p.pct} %.` : `Es menos del ${p.pct} %.`), bien: (v, p) => `El 10 % son ${N(p.total / 10)}: se arma con esas piezas.`,
  });
  XG.figura('porcentaje-barra', {
    ini: () => ({ p: 0 }), manijas: () => [lado('p', 0, 100, 5, 25, 2.9, 72)],
    ok: (v, p) => v.p * p.total === 100 * p.parte, sol: p => ({ p: 100 * p.parte / p.total }), texto: p => `$\\tfrac{${p.parte}}{${p.total}} \\cdot 100 = ${100 * p.parte / p.total}\\,\\%$`, alto: () => 138, pie: 'Arrastra hasta el porcentaje.',
    dib: (v, K, p, f) => regla(K, 290, v.p) + K.t(170, 22, `${p.parte} de ${p.total}`, 'tg') + K.t(25, 120, '0 %', 's tm') + K.t(308, 120, '100 %', 's tm') + (v.p > 10 && v.p < 86 ? K.t(25 + v.p * 2.9, 120, `${N(v.p)} %`, 'ta') : K.t(170, 120, `${N(v.p)} %`, 'ta')) + K.f(f, K.l(25 + p.parte / p.total * 290, 44, 25 + p.parte / p.total * 290, 100, 'lo gr') + K.t(25 + p.parte / p.total * 290, 40, p.parte, 'to')),
    lee: (v, p) => `$${N(v.p)}\\,\\% \\text{ de } ${p.total} = ${N(v.p * p.total / 100)}$`, aviso: (v, p) => (v.p === p.parte ? `${p.parte} es la cantidad; compárala con el total.` : v.p === 100 - 100 * p.parte / p.total ? 'Ese es el porcentaje de los que faltan.' : v.p * p.total > 100 * p.parte ? 'Ese porcentaje es más que la parte.' : 'Ese porcentaje es menos que la parte.'), bien: () => 'La parte arriba, el total abajo, por 100.',
  });
  XG.figura('total-barra', {
    ini: p => ({ T: p.max - 20 }), manijas: p => [lado('T', p.min, p.max, 5, 25, 290 / p.max, 72)],
    ok: (v, p) => v.T * p.pct === 100 * p.parte, sol: p => ({ T: 100 * p.parte / p.pct }), texto: p => `$${p.parte} \\div ${p.pct / 100} = ${100 * p.parte / p.pct}$`, alto: () => 138, pie: 'Arrastra el final de la barra: es el total.',
    dib(v, K, p, f) { const u = 290 / p.max, L = v.T * u; return K.r(25, 52, L, 40, 'fc') + K.r(25, 52, p.parte * u, 40, 'fg') + K.t(25 + p.parte * u / 2, 77, p.parte, 'tg') + K.t(25 + L, 40, N(v.T), 'ta') + K.f(f, K.l(25 + L * p.pct / 100, 46, 25 + L * p.pct / 100, 104, 'lo gr') + K.t(25 + L * p.pct / 100, 122, `${p.pct} % del tuyo`, 's to')); },
    lee: (v, p) => `$${p.pct}\\,\\% \\text{ de } ${N(v.T)} = ${N(v.T * p.pct / 100)}$`, aviso: (v, p) => (Math.abs(v.T - p.parte * p.pct / 100) < 2.6 ? `Le sacaste el ${p.pct} % a la parte, y ella ya es ese ${p.pct} %.` : v.T < p.parte ? 'El total no puede ser menor que la parte.' : Math.abs(v.T - p.parte * (1 + (100 - p.pct) / 100)) < 2.6 ? 'Le sumaste el porcentaje que falta a la parte; ese porcentaje es del total.' : v.T * p.pct > 100 * p.parte ? 'Ese total es muy grande.' : 'Ese total es muy chico.'), bien: (v, p) => `El ${p.pct} % de ${v.T} es ${p.parte}.`,
  });

  // Piezas de un total: se tocan las que arman un porcentaje.  params { total, pct, piezas }
  const armaP = (on, p) => p.piezas.reduce((s, x, i) => s + (on[i] ? x : 0), 0);
  const solP = p => { const n = p.piezas.length; for (let m = 1; m < 2 ** n; m++) { const on = p.piezas.map((_, i) => !!(m >> i & 1)); if (armaP(on, p) * 100 === p.pct * p.total) return on.map((x, i) => (x ? i : -1)).filter(i => i >= 0); } return null; };
  XG.marca('piezas-diez', {
    sitios: p => p.piezas.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 78 + Math.floor(i / 4) * 54, w: 70, h: 44 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 84 + Math.floor(i / 4) * 54, p.piezas[i], 'b'),
    fondo: (K, p) => K.r(25, 22, 290, 16, 'fc') + K.t(170, 16, `total: ${p.total}`, 's tm'), alto: () => 160, vale: (on, p) => armaP(on, p) * 100 === p.pct * p.total, sol: solP,
    aviso: (on, p) => (armaP(on, p) === p.pct ? `Juntan ${p.pct}, pero se pide el ${p.pct} % de ${p.total}.` : `Juntan ${armaP(on, p)}: ${armaP(on, p) * 100 > p.pct * p.total ? 'se pasa' : 'no alcanza'}. El 10 % son ${p.total / 10}.`),
    bien: p => `Juntan ${p.pct * p.total / 100}.`, texto: p => `${solP(p).map(i => p.piezas[i]).join(' + ')} $= ${p.pct * p.total / 100}$`, pie: 'Toca las piezas que lo arman.',
  });

  const metasD = p => { const a = p.total * p.p1 / 100, b = a * p.p2 / 100; return [N(a), N(b), `${N(b * 100 / p.total)} %`]; };
  XG.rotula('parte-de-la-parte', {
    slots: () => [0, 1, 2].map(i => ({ x: 62 + i * 108, y: 96, w: 96, h: 38 })), fichas: p => p.fichas, metas: metasD, texto: p => metasD(p).join(', '), alto: () => 142,
    fondo: (K, p, f) => K.r(25, 18, 290, 34, 'fc') + K.f(f, K.r(25, 18, 290 * p.p1 / 100, 34, 'fa') + K.r(25, 18, 290 * p.p1 * p.p2 / 10000, 34, 'fg')) + K.t(318, 66, `${p.total}`, 's tm', 'end') + p.et.map((t, i) => K.t(62 + i * 108, 134, t, 's tm')).join(''),
    aviso(q, p) { const m = metasD(p); return q[1][0] === N(p.total * p.p2 / 100) ? `El ${p.p2} % se toma de los ${m[0]}, no del total.` : q[2][0] === `${p.p1 + p.p2} %` ? 'Esos porcentajes no se suman: tienen totales distintos.' : 'Cada porcentaje se toma de su propio grupo.'; }, bien: () => 'El segundo porcentaje se toma de la primera parte.',
  });

  XG.marca('compara-porciento', {
    sitios: p => p.grupos.map((_, i) => ({ x: 90 + (i % 2) * 160, y: 34 + Math.floor(i / 2) * 60, w: 148, h: 50 })), cara: (K, p, i) => K.t(90 + (i % 2) * 160, 40 + Math.floor(i / 2) * 60, `${p.grupos[i][0]} de ${p.grupos[i][1]}`), alto: () => 190,
    sol: p => p.grupos.map((_, i) => i).filter(i => p.grupos[i][0] * 100 > p.mas * p.grupos[i][1]),
    aviso: (on, p) => (on.some((x, i) => x && p.grupos[i][0] * 100 <= p.mas * p.grupos[i][1]) ? `Uno de esos no pasa del ${p.mas} %: más gente no es más porcentaje.` : `Falta un grupo que pasa del ${p.mas} %.`),
    bien: p => p.grupos.filter(g => g[0] * 100 > p.mas * g[1]).map(g => `${g[0]} de ${g[1]} es ${N(g[0] / g[1] * 100)} %`).join('; ') + '.', texto: p => p.grupos.filter(g => g[0] * 100 > p.mas * g[1]).map(g => `${g[0]} de ${g[1]}`).join(', '), pie: 'Toca todos los grupos que pasan.',
  });

  // Se agrega agua hasta que el jugo sea el pct % de la mezcla.  v { w }
  XG.figura('mezcla-agua', {
    ini: () => ({ w: 0 }), manijas: p => [{ k: 'w', min: 0, max: p.max, paso: 10, en: v => [170, 168 - (p.jugo + v.w) * 140 / (p.jugo + p.max)], de: (x, y) => (168 - y) * (p.jugo + p.max) / 140 - p.jugo }],
    ok: (v, p) => p.jugo * 100 === p.pct * (p.jugo + v.w), sol: p => ({ w: p.jugo * 100 / p.pct - p.jugo }), texto: p => `mezcla $${p.jugo} \\div ${p.pct / 100} = ${p.jugo * 100 / p.pct}$; agua $${p.jugo * 100 / p.pct} - ${p.jugo} = ${p.jugo * 100 / p.pct - p.jugo}$`, alto: () => 188, pie: 'Arrastra el nivel de arriba para echar agua.',
    dib(v, K, p, f) { const u = 140 / (p.jugo + p.max); return K.r(120, 168 - p.jugo * u, 100, p.jugo * u, 'fg', 0) + K.r(120, 168 - (p.jugo + v.w) * u, 100, v.w * u, 'fa', 0) + K.r(120, 20, 100, 148, 'fn', 4) + K.t(110, 172 - p.jugo * u / 2, `jugo: ${p.jugo}`, 'tg', 'end') + (v.w > 12 ? K.t(230, 172 - (p.jugo + v.w / 2) * u, `agua: ${N(v.w)}`, 'ta', 'start') : '') + K.f(f, K.t(8, 22, `${N(p.jugo * 100 / (p.jugo + v.w))} %`, 'b tg', 'start')); },
    lee: (v, p) => `$\\tfrac{${p.jugo}}{${p.jugo + R(v.w)}} ${eq(p.jugo * 100 / (p.jugo + R(v.w)))} ${N(p.jugo * 100 / (p.jugo + R(v.w)))}\\,\\%$`, aviso: (v, p) => (v.w === p.jugo * 100 / p.pct ? 'Ese es el total de la mezcla: el jugo también cuenta.' : p.jugo * 100 > p.pct * (p.jugo + v.w) ? 'Quedó muy concentrado: falta agua.' : 'Quedó muy aguado.'), bien: (v, p) => `${p.jugo} de ${p.jugo + v.w} es el ${p.pct} %.`,
  });

  // --------------------------------------------------------------------------------- pu-pr-5 · aumentos, descuentos e IVA
  const bar = (K, y, x, u, cls, tcls, et, dentro = true) => K.t(20, y - 6, et, 's tm', 'start') + K.r(20, y, x * u, 30, cls) + (dentro && x * u > 46 ? K.t(20 + x * u / 2, y + 20, N(x), tcls) : K.t(20 + x * u + 18, y + 20, N(x), tcls, 'start'));
  const fac = c => 1 + c / 100, dice = c => `${c < 0 ? 'baja' : 'sube'} ${Math.abs(c)} %`;
  XG.figura('precio-nuevo', {
    ini: p => ({ b: p.a }), manijas: p => [lado('b', p.paso, p.max, p.paso, 20, 290 / p.max, 111)],
    ok: (v, p) => Math.abs(v.b - p.a * fac(p.c)) < 1e-6, sol: p => ({ b: p.a * fac(p.c) }), texto: p => `$${p.a} \\cdot ${N(fac(p.c))} = ${N(p.a * fac(p.c))}$`, alto: () => 140, pie: 'Arrastra el final de la barra.',
    dib: (v, K, p, f) => bar(K, 30, p.a, 290 / p.max, 'fg', 'tg', 'antes') + bar(K, 96, v.b, 290 / p.max, 'fa', 'ta', dice(p.c)) + K.f(f, K.l(20 + p.a * fac(p.c) * 290 / p.max, 88, 20 + p.a * fac(p.c) * 290 / p.max, 134, 'lo gr')),
    lee: (v, p) => `$${N(v.b)} \\div ${p.a} = ${N(v.b / p.a)} \\qquad \\text{factor: } ${N(fac(p.c))}$`, aviso: (v, p) => (v.b === p.a + p.c ? `Sumaste ${Math.abs(p.c)}, pero el ${Math.abs(p.c)} % de ${p.a} es ${N(p.a * Math.abs(p.c) / 100)}.` : v.b === p.a * Math.abs(p.c) / 100 ? 'Ese es solo el cambio.' : v.b > p.a * fac(p.c) ? 'Quedó muy caro.' : 'Quedó muy barato.'), bien: (v, p) => `Es multiplicar por ${N(fac(p.c))}.`,
  });
  XG.rotula('factor-cada', {
    slots: p => p.cambios.map((_, i) => ({ x: 270, y: 32 + i * 52, w: 88, h: 38 })), fichas: p => p.fichas, metas: p => p.cambios.map(c => `× ${N(fac(c))}`), texto: p => p.cambios.map(c => `${dice(c)}: $${N(fac(c))}$`).join(', '), alto: p => p.cambios.length * 52 + 10,
    fondo: (K, p, f) => p.cambios.map((c, i) => K.t(20, 37 + i * 52, dice(c), '', 'start') + K.r(118, 22 + i * 52, 50, 20, 'fc') + K.f(f, K.r(118, 22 + i * 52, 50 * fac(c), 20, 'fa'))).join(''),
    aviso: (q, p) => (p.cambios.some((c, i) => q[i][0] === `× ${N(Math.abs(c) / 100)}`) ? 'Ese número es solo el cambio: falta lo que ya había, el 1.' : 'El factor es 1 más o menos el porcentaje entre 100.'), bien: () => '1 más lo que sube, o 1 menos lo que baja.',
  });
  const dos = p => p.a * fac(p.c[0]) * fac(p.c[1]);
  XG.figura('dos-cambios', {
    ini: p => ({ b: p.a }), manijas: p => [lado('b', p.paso, p.max, p.paso, 20, 290 / p.max, 111)], ok: (v, p) => Math.abs(v.b - dos(p)) < 1e-6, sol: p => ({ b: dos(p) }),
    texto: p => `$${p.a} \\cdot ${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(dos(p))}$`, alto: () => 208, ms: 1900, pie: 'Arrastra el final de la segunda barra.',
    dib(v, K, p, f) { const u = 290 / p.max, m = p.a * fac(p.c[0]); return bar(K, 30, p.a, u, 'fg', 'tg', 'al comienzo') + bar(K, 96, v.b, u, 'fa', 'ta', `${dice(p.c[0])} y luego ${dice(p.c[1])}`) + K.f(f * 2, bar(K, 164, f < 0.5 ? p.a + (m - p.a) * f * 2 : m + (dos(p) - m) * (f * 2 - 1), u, 'ff', 'tf', f < 0.5 ? dice(p.c[0]) : dice(p.c[1]))); },
    lee: (v, p) => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(fac(p.c[0]) * fac(p.c[1]))}$`, aviso: (v, p) => (v.b === p.a * (1 + (p.c[0] + p.c[1]) / 100) ? 'Sumaste los porcentajes; el segundo se toma del valor nuevo.' : v.b > dos(p) ? 'Queda en menos.' : 'Queda en más.'), bien: () => 'El segundo cambio se toma del valor nuevo.',
  });
  const unico = p => R((fac(p.c[0]) * fac(p.c[1]) - 1) * 100);
  XG.figura('cambio-unico', {
    ini: () => ({ x: 0 }), manijas: () => [{ k: 'x', min: -60, max: 60, paso: 5, et: 'un solo cambio (%)' }], ok: (v, p) => v.x === unico(p), sol: p => ({ x: unico(p) }),
    texto: p => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(1 + unico(p) / 100)}$: ${dice(unico(p))}`, alto: () => 208, pie: 'Mueve la perilla: a la izquierda baja, a la derecha sube.',
    dib(v, K, p, f) { const u = 1.8; return bar(K, 24, 100, u, 'fg', 'tg', 'al comienzo') + (f ? bar(K, 84, 100 * (1 + v.x / 100 * f), u, 'fa', 'ta', `tu cambio: ${dice(R(v.x))}`) + K.f(f, K.l(20 + (100 + unico(p)) * u, 16, 20 + (100 + unico(p)) * u, 122, 'lo gr')) : K.r(20, 84, 180, 30, 'fc') + K.t(110, 104, '?', 'tm')); },
    lee: (v, p) => `$${N(fac(p.c[0]))} \\cdot ${N(fac(p.c[1]))} = ${N(1 + unico(p) / 100)} \\qquad \\text{tu factor: } ${N(1 + v.x / 100)}$`, aviso: (v, p) => (v.x === p.c[0] + p.c[1] ? 'Los porcentajes no se suman: se multiplican los factores.' : v.x > unico(p) ? 'Queda más abajo.' : 'Queda más arriba.'), bien: () => 'Un solo factor: el producto de los dos.',
  });
  const atras = (nombre, d) => XG.figura(nombre, {
    ini: p => ({ a: p.min }), manijas: p => [lado('a', p.min, p.max, p.paso, 20, 285 / p.max, 45)], ok: (v, p) => Math.abs(v.a * fac(p.c) - p.q) < 1e-6, sol: p => ({ a: R(p.q / fac(p.c) * 100) / 100 }), texto: p => `$${p.q} \\div ${N(fac(p.c))} = ${N(p.q / fac(p.c))}$`, alto: () => 196, pie: 'Arrastra la barra de arriba.',
    dib: (v, K, p, f) => bar(K, 30, v.a, 285 / p.max, 'fa', 'ta', d.antes) + bar(K, 96, p.q, 285 / p.max, 'fg', 'tg', d.despues(p)) + K.f(f, bar(K, 156, v.a * fac(p.c) * Math.max(0.02, f), 285 / p.max, 'ff', 'tf', `el tuyo, ${dice(p.c)}`) + K.l(20 + p.q * 285 / p.max, 90, 20 + p.q * 285 / p.max, 192, 'lo d')),
    lee: (v, p) => `$${N(v.a)} \\cdot ${N(fac(p.c))} = ${N(v.a * fac(p.c))}$`, aviso: (v, p) => (Math.abs(v.a - p.q * (1 - p.c / 100)) <= p.paso / 2 ? d.error : v.a * fac(p.c) > p.q ? 'Antes valía menos.' : 'Antes valía más.'), bien: (v, p) => `Para devolverse se divide entre ${N(fac(p.c))}.`,
  });
  atras('vuelta-atras', { antes: 'antes', despues: p => `quedó, después de bajar ${-p.c} %`, error: 'Le subiste el mismo porcentaje; ese porcentaje era del precio de antes.' });
  atras('sin-iva', { antes: 'sin IVA', despues: p => `con IVA del ${p.c} %`, error: 'Le quitaste el mismo porcentaje; el IVA se calculó sobre el precio sin IVA.' });

  const acaba = c => c.reduce((x, k) => x * fac(k), 100);
  XG.marca('mismo-final', {
    sitios: p => p.caminos.map((_, i) => ({ x: 170, y: 26 + i * 46, w: 300, h: 40 })), cara: (K, p, i) => K.t(170, 31 + i * 46, p.caminos[i].map(dice).join(' y luego ')), alto: p => p.caminos.length * 46 + 6,
    sol: p => p.caminos.map((_, i) => i).filter(i => Math.abs(acaba(p.caminos[i]) - p.meta) < 1e-6),
    aviso: (on, p) => (on.some((x, i) => x && Math.abs(acaba(p.caminos[i]) - p.meta) > 1e-6) ? 'Uno de esos no termina ahí: multiplica los factores.' : 'Falta un camino que termina en el mismo precio.'),
    bien: p => `Esos terminan en ${p.meta}.`, texto: p => p.caminos.filter(c => Math.abs(acaba(c) - p.meta) < 1e-6).map(c => c.map(dice).join(' y luego ')).join('; '), pie: 'Toca todos los que terminan ahí.',
  });
})();
;
//#archivo js/games/conteo-escena.js
// Ejercicios de «Conteo y combinatoria» (pu-co-1 a pu-co-5) con las escenas de la explicación: árboles, casillas, grupos, cuadrículas
// y calles. Armazones en js/games/figura-kit.js y js/games/logica-kit.js (spec 2026-11-24-ejercicios-explora).
(() => {
  const R = Math.round, C = ['fa', 'fg', 'ff', 'fo'];
  const fac = n => (n < 2 ? 1 : n * fac(n - 1));

  // Cuenta por casillas: se llena cada una con su número.  params { et, ops, metas, fichas, mira: [aviso por casilla], trampas?, ok }
  //   (metas en el orden de las casillas; ops: lo que va entre casilla y casilla)
  function cuenta(name, alto, escena) {
    const ancho = p => Math.min(84, 324 / p.et.length - 18), X = (p, i) => 170 + (i - (p.et.length - 1) / 2) * (324 / p.et.length);
    XG.rotula(name, {
      slots: p => p.et.map((_, i) => ({ x: R(X(p, i)), y: alto + 22, w: R(ancho(p)), h: 38 })), fichas: p => p.fichas, metas: p => p.metas, alto: () => alto + 64,
      texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '),
      fondo: (K, p, f) => escena(K, p, f) + p.et.map((t, i) => K.t(X(p, i), alto + 58, t, 's tm') + (p.ops?.[i] ? K.t((X(p, i) + X(p, i + 1)) / 2, alto + 28, p.ops[i], 'b') : '')).join(''),
      aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
      bien: p => p.ok,
    });
  }
  const persona = (K, x, y, cls, t) => K.c(x, y, 12, cls) + (t ? K.t(x, y + 5, t, 's') : '');
  const gente = (K, n, y, sel = 0) => Array.from({ length: n }, (_, i) => persona(K, 170 + (i - (n - 1) / 2) * Math.min(32, 300 / n), y, i < sel ? 'fa' : 'fc', 'ABCDEFGHIJKL'[i])).join('');
  const cajon = (K, n, y, w = 46) => Array.from({ length: n }, (_, i) => K.r(170 + (i - n / 2) * (w + 6) + 3, y, w, 44, 'fc', 8)).join('');

  // Frases que se tocan.  params { casos: [{ t, si }], no, falta, ok }
  function frases(name, pie) {
    const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i].si);
    XG.marca(name, {
      sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 324, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6,
      sol: si, aviso: (on, p) => (on.some((x, i) => x && !p.casos[i].si) ? p.no : p.falta), bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie,
    });
  }
  // Fichas cortas que se tocan.  params { fichas, … }
  function fichas(name, vale, d) {
    const si = p => p.fichas.map((_, i) => i).filter(i => vale(p.fichas[i], p));
    XG.marca(name, {
      sitios: p => p.fichas.map((_, i) => ({ x: 62 + (i % 3) * 108, y: d.y + Math.floor(i / 3) * 54, w: 96, h: 44 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, d.y + 6 + Math.floor(i / 3) * 54, p.fichas[i], 'b'),
      alto: p => d.y + Math.ceil(p.fichas.length / 3) * 54 - 24, fondo: d.fondo, sol: si, aviso: (on, p) => (on.some((x, i) => x && !vale(p.fichas[i], p)) ? d.no(p.fichas[on.findIndex((x, i) => x && !vale(p.fichas[i], p))], p) : d.falta), bien: d.bien, texto: p => si(p).map(i => p.fichas[i]).join(', '), pie: d.pie,
    });
  }
  // Casillas de una cuadrícula que se tocan.
  function celdas(name, d) {
    const u = p => Math.min(d.max || 40, 316 / p.cols), x0 = p => (d.x0 ?? 170 - p.cols * u(p) / 2), y0 = d.y0 ?? 10;
    const si = p => Array.from({ length: p.filas * p.cols }, (_, i) => i).filter(i => d.vale(Math.floor(i / p.cols), i % p.cols, p));
    XG.marca(name, {
      sitios: p => Array.from({ length: p.filas * p.cols }, (_, i) => ({ x: x0(p) + (i % p.cols + 0.5) * u(p), y: y0 + (Math.floor(i / p.cols) + 0.5) * u(p), w: u(p) - 4, h: u(p) - 4 })),
      cara: (K, p, i) => K.t(x0(p) + (i % p.cols + 0.5) * u(p), y0 + (Math.floor(i / p.cols) + 0.5) * u(p) + 5, d.cara ? d.cara(Math.floor(i / p.cols), i % p.cols, p) : '', d.cls || ''),
      fondo: (K, p) => (d.fondo ? d.fondo(K, p, x0(p), y0, u(p)) : ''), alto: p => y0 + p.filas * u(p) + 6, sol: si, nombre: d.nombre,
      aviso(on, p) { const s = si(p), mal = on.findIndex((x, i) => x && !s.includes(i)); return mal >= 0 ? d.no(Math.floor(mal / p.cols), mal % p.cols, p) : d.falta(p); }, bien: d.bien, texto: p => `son ${si(p).length}`, pie: d.pie,
    });
  }
  // En movimiento: el ascensor sube el número de pisos que se le dé y debe parar en el de la respuesta.
  function ascensor(name, max, paso = 1, avisos = ['Subió de más: se contó algo repetido o de sobra.', 'Le faltó subir: quedaron casos sin contar.']) {
    XG.tiros(name, {
      perilla: () => ({ et: 'Cantidad', min: 0, max: max / paso, cara: v => v * paso, lee: v => `${v * paso}` }), meta: t => t.r / paso, alto: 150, ms: 1600,
      dib(t, v, K, p, f) {
        const m = t.r / paso, k = v == null ? 0 : (v === m ? 1 : v < m ? 0.68 : 1.3) * f, y = q => 128 - q * 78; let h = K.l(136, 8, 136, 144, 'lm') + K.l(204, 8, 204, 144, 'lm');
        for (let i = 0; i < 7; i++) h += K.l(136, 128 - i * 20, 130, 128 - i * 20, 'lm') + K.l(204, 128 - i * 20, 210, 128 - i * 20, 'lm');
        return h + K.l(210, y(1), 262, y(1), f >= 1 && v === m ? 'lo gr' : 'lg d gr') + K.t(270, y(1) + 5, 'aquí', 's tm', 'start') + K.l(170, 4, 170, y(k) - 16, 'lm') + K.r(142, y(k) - 16, 56, 32, f >= 1 && v !== m ? 'ff' : f >= 1 ? 'fo' : 'fa', 5) + K.t(170, y(k) + 6, v == null ? '' : v * paso, 'b');
      },
      falla: (t, v) => t.e?.[v * paso] || avisos[v * paso > t.r ? 0 : 1], cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira hasta tu cuenta y suelta: el ascensor sube.',
    });
  }
  Object.assign(XG, { cuenta, ascensor });   // los usan otros mundos
  ascensor('sube-arbol', 40); ascensor('sube-orden', 150, 5); ascensor('sube-grupo', 48); ascensor('sube-casos', 40); ascensor('sube-figuras', 44);

  // -------------------------------------------------------------------------------------- pu-co-1 · multiplicar o sumar
  // Árbol: a ramas, cada una se abre en n, y cada una en c.  v { n }
  XG.figura('arbol-ramas', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.a * v.n * p.c === p.total, sol: p => ({ n: p.total / (p.a * p.c) }),
    texto: p => `$${p.a} \\cdot ${p.total / (p.a * p.c)} \\cdot ${p.c} = ${p.total}$`, alto: () => 236, ms: 1900, pie: 'Mueve la perilla. Al comprobar se abre todo el árbol.',
    dib(v, K, p, f) {
      const n = R(v.n); let h = K.c(22, 92, 6, 'fk');
      for (let i = 0; i < p.a; i++) {
        const y = 92 + (i - (p.a - 1) / 2) * (164 / p.a); h += K.l(22, 92, 88, y, 'lm') + K.c(88, y, 8, C[i]);
        if (f) for (let j = 0; j < n; j++) { const yy = y + (j - (n - 1) / 2) * (164 / p.a / n); h += K.f(f * 2, K.l(96, y, 180, yy, 'lm') + K.c(180, yy, Math.min(6, 60 / p.a / n), C[i])); for (let k = 0; k < p.c; k++) { const z = yy + (k - (p.c - 1) / 2) * (164 / p.a / n / p.c); h += K.f(f * 2 - 1, K.l(186, yy, 262, z, 'lm') + K.c(264, z, Math.min(2.4, 60 / (p.a * n * p.c)), C[i])); } }
        else h += K.t(112, y + 5, '…', 'tm', 'start');
      }
      return h + K.f(f * 2 - 1, K.t(284, 98, p.a * n * p.c, 'b ta', 'start'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${R(v.n)} \\cdot ${p.c} = ${p.a * R(v.n) * p.c}$`,
    aviso: (v, p) => (p.a + v.n + p.c === p.total ? 'Sumaste; las tres decisiones se toman juntas y se multiplican.' : p.a * v.n === p.total ? 'Faltó la última decisión, que abre más ramas.' : p.a * v.n * p.c > p.total ? 'Salen más combinaciones.' : 'Salen menos combinaciones.'), bien: (v, p) => `${p.a * v.n * p.c} puntas en el árbol.`,
  });
  frases('se-multiplica', 'Toca todas las que se multiplican.');
  cuenta('placa-casillas', 80, (K, p) => K.r(60, 14, 220, 58, 'fc', 10) + p.modelo.map((t, i) => K.t(170 + (i - (p.modelo.length - 1) / 2) * 56, 52, t, 'b ta')).join(''));
  cuenta('tira-colores', 80, (K, p, f) => p.modelo.map((_, i) => K.r(170 + (i - p.modelo.length / 2) * 54, 16, 54, 54, f ? p.modelo[i] : 'fc', 0)).join(''));
  celdas('rejilla-permitida', {
    max: 52, x0: 100, y0: 30, vale: (r, c, p) => !p.veta.some(([a, b]) => a === r && b === c), fondo: (K, p, x, y, u) => p.ef.map((t, i) => K.t(x - 8, y + (i + 0.5) * u + 5, t, 's', 'end')).join('') + p.ec.map((t, i) => K.t(x + (i + 0.5) * u, y - 8, t, 's')).join(''),
    nombre: (p, i) => `${p.ef[Math.floor(i / p.cols)]}, ${p.ec[i % p.cols]}`, no: (r, c, p) => `${p.ef[r]} con ${p.ec[c]} no está permitido.`, falta: () => 'Falta alguna: recorre fila por fila.', bien: p => `De ${p.filas} por ${p.cols}, ${p.filas * p.cols}, se quitan ${p.veta.length}.`, pie: 'Toca todas las que se pueden.',
  });
  XG.figura('interruptores', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'interruptores' }], ok: (v, p) => 2 ** v.n === p.total, sol: p => ({ n: Math.log2(p.total) }), texto: p => `$2^{${Math.log2(p.total)}} = ${p.total}$`, alto: () => 172, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => Array.from({ length: R(v.n) }, (_, i) => { const x = 170 + (i - (R(v.n) - 1) / 2) * Math.min(36, 300 / p.max); return K.r(x - 10, 22, 20, 38, 'fc', 10) + K.c(x, i % 2 ? 50 : 32, 7, i % 2 ? 'fM' : 'fA') + K.f(f * R(v.n) - i, K.t(x, 84, 2 ** (i + 1), 's ta')); }).join(''),
    lee: v => `$2^{${R(v.n)}} = ${2 ** R(v.n)}$`, aviso: (v, p) => (2 * v.n === p.total ? 'No se suman: cada uno duplica los estados.' : 2 ** v.n > p.total ? 'Salen más estados: cada interruptor los duplica.' : 'Salen menos estados: cada interruptor los duplica.'), bien: () => 'Cada interruptor duplica lo que había.',
  });
  cuenta('rutas-tramos', 106, (K, p, f) => { const A = [34, 60], B = [170, 24], Z = [306, 60], arco = (P, Q, n, cls, abajo) => Array.from({ length: n }, (_, i) => { const d = (i - (n - 1) / 2) * 13, mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2 + (abajo ? 34 : 0) + d; return `<path class="xl ${cls}" d="M${P} Q${mx} ${my} ${Q}"/>`; }).join(''); return arco(A, B, p.ab, 'la') + arco(B, Z, p.bz, 'lg') + arco(A, Z, p.az, 'lf', true) + [[A, 'A'], [B, 'B'], [Z, 'C']].map(([q, t]) => K.c(...q, 13, 'fc') + K.t(q[0], q[1] + 5, t)).join(''); });

  // ------------------------------------------------------------------------------------------------ pu-co-2 · ordenar
  cuenta('fila-factorial', 70, (K, p) => Array.from({ length: p.et.length - 1 }, (_, i) => K.r(170 + (i - (p.et.length - 1) / 2) * 40 + 6, 12, 28, 50, C[i % 4], 4)).join(''));
  cuenta('podio-puestos', 84, (K, p) => gente(K, p.n, 24) + K.r(100, 58, 44, 26, 'fg', 3) + K.r(148, 46, 44, 38, 'fa', 3) + K.r(196, 64, 44, 20, 'ff', 3) + K.t(122, 76, '2', 's') + K.t(170, 70, '1', 's') + K.t(218, 79, '3', 's'));
  const junta = s => [...s].sort().join('');
  fichas('palabras-distintas', (t, p) => junta(t) === junta(p.letras), {
    y: 96, fondo: (K, p) => [...p.letras].map((l, i) => K.r(170 + (i - p.letras.length / 2) * 44 + 2, 14, 40, 44, 'fa', 8) + K.t(170 + (i - (p.letras.length - 1) / 2) * 44, 42, l, 'b')).join(''),
    no: (t, p) => `«${t}» no lleva las mismas letras: cuenta cuántas hay de cada una.`, falta: 'Falta una: corre de lugar la letra que no se repite.', bien: p => `Son ${fac(p.letras.length)} órdenes entre ${fac(2)}: las repetidas no cambian la palabra.`, pie: 'Toca todas las palabras que salen de esas letras.',
  });
  cuenta('repetidas-divide', 70, (K, p) => { const vis = {}; return [...p.palabra].map((l, i) => { const rep = [...p.palabra].filter(x => x === l).length > 1; return K.r(170 + (i - p.palabra.length / 2) * 42 + 2, 14, 38, 44, rep ? (vis[l] ||= C[Object.keys(vis).length]) : 'fc', 8) + K.t(170 + (i - (p.palabra.length - 1) / 2) * 42, 42, l, 'b'); }).join(''); });
  cuenta('paquete-juntos', 74, (K, p, f) => Array.from({ length: p.n }, (_, i) => K.r(170 + (i - p.n / 2) * 42 + 3, 18, 36, 42, i < p.k ? 'fa' : 'fc', 6)).join('') + K.f(0.4 + 0.6 * f, K.r(170 - p.n / 2 * 42 - 2, 11, p.k * 42 + 3, 56, 'fn gr', 12)));
  cuenta('casilla-exigente', 74, (K, p) => K.t(170, 22, p.digitos.join('   '), 'ta') + cajon(K, p.cifras, 30));
  XG.figura('cuantos-candidatos', {
    ini: () => ({ n: 2 }), manijas: p => [{ k: 'n', min: 2, max: p.max, paso: 1, et: 'candidatos' }], ok: (v, p) => v.n * (v.n - 1) === p.total, sol(p) { for (let n = 2; n <= p.max; n++) if (n * (n - 1) === p.total) return { n }; return null; },
    texto(p) { const n = (1 + Math.sqrt(1 + 4 * p.total)) / 2; return `$${n} \\cdot ${n - 1} = ${p.total}$`; }, alto: () => 190, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => gente(K, R(v.n), 28) + p.cargos.map((t, i) => K.r(76 + i * 106, 58, 82, 44, 'fc', 8) + K.t(117 + i * 106, 118, t, 's tm') + K.f(f * 2 - i, K.t(117 + i * 106, 87, R(v.n) - i, 'b ta'))).join(''),
    lee: v => `$${R(v.n)} \\cdot ${R(v.n) - 1} = ${R(v.n) * (R(v.n) - 1)}$`, aviso: (v, p) => (2 * v.n === p.total ? 'No se suma: cada quien puede ir con cada otro.' : v.n * (v.n - 1) > p.total ? 'Habría más repartos.' : 'Habría menos repartos.'), bien: () => 'El segundo cargo tiene una opción menos.',
  });

  // ------------------------------------------------------------------------------------------------ pu-co-3 · escoger
  fichas('mismo-grupo', (t, p) => junta(t) === junta(p.grupo), {
    y: 86, fondo: (K, p) => K.t(170, 18, 'grupo', 's tm') + [...p.grupo].map((l, i) => persona(K, 170 + (i - (p.grupo.length - 1) / 2) * 34, 42, 'fa', l)).join(''),
    no: (t, p) => (new Set(t).size < t.length ? `En «${t}» alguien está repetido.` : `«${t}» tiene a otra persona.`), falta: 'Falta una: son las mismas personas en otro orden.', bien: () => 'Mismas personas en otro orden: es un solo grupo.', pie: 'Toca todas las que son ese mismo grupo.',
  });
  frases('orden-no-importa', 'Toca todas en las que el orden no importa.');
  cuenta('divide-ordenes', 62, (K, p) => gente(K, p.n, 34, p.k));
  cuenta('elige-deja', 62, (K, p) => gente(K, p.n, 34, p.k));
  cuenta('comite-mixto', 84, (K, p) => Array.from({ length: p.a }, (_, i) => persona(K, 170 + (i - (p.a - 1) / 2) * 34, 22, 'fa')).join('') + Array.from({ length: p.b }, (_, i) => persona(K, 170 + (i - (p.b - 1) / 2) * 34, 60, 'fg')).join(''));
  cuenta('con-o-sin', 62, (K, p) => persona(K, 60, 34, 'ff', 'Ana') + Array.from({ length: p.n - 1 }, (_, i) => persona(K, 110 + i * 32, 34, 'fc', 'BCDEFGH'[i])).join(''));
  const puntos = (K, n, cy, r) => Array.from({ length: n }, (_, i) => K.at(170, cy, r, 90 + i * 360 / n));
  const lineas = (K, P, salta) => { let h = ''; const n = P.length; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (!salta || (j - i > 1 && !(i === 0 && j === n - 1))) h += K.l(...P[i], ...P[j], 'lr'); return h; };
  XG.figura('cuantos-saludos', {
    ini: () => ({ n: 3 }), manijas: p => [{ k: 'n', min: 3, max: p.max, paso: 1, et: 'personas' }], ok: (v, p) => v.n * (v.n - 1) / 2 === p.total, sol: p => ({ n: (1 + Math.sqrt(1 + 8 * p.total)) / 2 }),
    texto(p) { const n = (1 + Math.sqrt(1 + 8 * p.total)) / 2; return `$\\tfrac{${n} \\cdot ${n - 1}}{2} = ${p.total}$`; }, alto: () => 240, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const P = puntos(K, R(v.n), 88, 72); return K.f(f, lineas(K, P)) + P.map(q => K.c(...q, 8, 'fa')).join(''); },
    lee: v => `$\\tfrac{${R(v.n)} \\cdot ${R(v.n) - 1}}{2} = ${R(v.n) * (R(v.n) - 1) / 2}$`, aviso: (v, p) => (v.n * (v.n - 1) / 2 < p.total && (v.n + 1) * v.n >= p.total ? 'Cada saludo es de dos personas: así salen menos.' : v.n * (v.n - 1) / 2 > p.total ? 'Se saludarían más veces.' : 'Se saludarían menos veces.'), bien: () => 'Cada pareja se saluda una sola vez.',
  });

  // -------------------------------------------------------------------------------------- pu-co-4 · casos y complemento
  celdas('cruce-numeros', { max: 39, vale: (r, c, p) => { const n = r * p.cols + c + 1; return n % p.a === 0 || n % p.b === 0; }, cara: (r, c, p) => r * p.cols + c + 1, no: (r, c, p) => `El ${r * p.cols + c + 1} no es múltiplo de ${p.a} ni de ${p.b}.`, falta: () => 'Falta alguno: recorre los de un número y luego los del otro.', bien: p => `Los múltiplos de ambos, como el ${p.ambos}, se pintan una sola vez.`, pie: 'Toca todos los que cumplen.' });
  cuenta('suma-y-resta', 92, (K, p, f) => K.c(146, 48, 46, 'fa') + K.c(194, 48, 46, 'fg') + K.t(122, 53, p.ea, 's') + K.t(218, 53, p.eb, 's') + K.t(170, 53, 'ambos', 's'));
  XG.figura('cruce-barras', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'están en los dos grupos' }], ok: (v, p) => p.a + p.b - v.x === p.total, sol: p => ({ x: p.a + p.b - p.total }), texto: p => `$${p.a} + ${p.b} - ${p.total} = ${p.a + p.b - p.total}$`, alto: () => 206, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const u = 300 / (p.a + p.b), x = f ? v.x : 0; return K.r(20, 26, p.a * u, 26, 'fa') + K.t(26, 44, `${p.a} ${p.ea}`, 's ta', 'start') + K.r(20 + (p.a - x * f) * u, 80, p.b * u, 26, 'fg') + K.t(14 + (p.a + p.b - x * f) * u, 98, `${p.b} ${p.eb}`, 's tg', 'end') + K.f(f, K.r(20 + (p.a - x) * u, 26, x * u, 80, 'fn d') + K.l(20 + p.total * u, 18, 20 + p.total * u, 124, 'lo gr') + K.t(20 + p.total * u, 138, `${p.total} en total`, 's to')); },
    lee: (v, p) => `$${p.a} + ${p.b} - ${R(v.x)} = ${p.a + p.b - R(v.x)}$`, aviso: (v, p) => (p.a + p.b - v.x > p.total ? 'Quedarían más personas de las que hay: hay más en los dos.' : 'Quedarían menos personas de las que hay: hay menos en los dos.'), bien: () => 'Lo que sobra al sumar se contó dos veces.',
  });
  cuenta('todos-ninguno', 74, (K, p) => cajon(K, p.puestos, 18));
  celdas('ruletas-alguno', { max: 42, x0: 110, y0: 30, vale: (r, c, p) => r + 1 === p.n || c + 1 === p.n, cara: (r, c) => `${r + 1}${c + 1}`, fondo: (K, p, x, y, u) => K.t(x + p.cols * u / 2, 16, 'segunda ruleta', 's tm') + K.t(x - 12, y + p.filas * u / 2 + 5, 'primera', 's tm', 'end'), no: (r, c, p) => `En ${r + 1}${c + 1} no sale ningún ${p.n}.`, falta: p => `Falta alguno: el ${p.n} puede salir en la primera, en la segunda o en las dos.`, bien: p => `$${p.filas * p.cols} - ${(p.filas - 1) * (p.cols - 1)} = ${p.filas + p.cols - 1}$`.replace(/\$/g, ''), pie: 'Toca todos los resultados que cumplen.' });
  cuenta('parte-casos', 74, (K, p) => K.t(170, 22, p.digitos.join('   '), 'ta') + cajon(K, p.cifras, 30));
  frases('lo-contrario', 'Toca todas las que dicen lo contrario.');

  // ------------------------------------------------------------------------------------------- pu-co-5 · figuras y caminos
  const malla = (K, f, c, u, y) => { let h = ''; for (let i = 0; i < f; i++) for (let j = 0; j < c; j++) h += K.r(170 + (j - c / 2) * u, y + i * u, u, u, 'fc', 0); return h; };
  cuenta('cuadrados-tamano', 112, (K, p, f) => malla(K, p.f, p.c, 32, 8) + K.f(f, K.r(170 - p.c / 2 * 32 + 2, 10, 60, 60, 'fa', 3)));
  celdas('donde-cabe', { max: 54, vale: (r, c, p) => r + p.s <= p.filas && c + p.s <= p.cols, no: (r, c, p) => 'Desde esa casilla, el cuadrado se sale de la cuadrícula.', falta: () => 'Cabe en otro lugar: córrelo a lo ancho y a lo alto.', bien: p => `Cabe en ${p.cols - p.s + 1} lugares a lo ancho y ${p.filas - p.s + 1} a lo alto.`, pie: 'Toca cada casilla que puede ser su esquina de arriba a la izquierda.', nombre: (p, i) => `fila ${Math.floor(i / p.cols) + 1}, columna ${i % p.cols + 1}` });
  XG.figura('lados-diagonales', {
    ini: () => ({ n: 4 }), manijas: p => [{ k: 'n', min: 3, max: p.max, paso: 1, et: 'lados' }], ok: (v, p) => v.n * (v.n - 3) / 2 === p.total, sol: p => ({ n: (3 + Math.sqrt(9 + 8 * p.total)) / 2 }),
    texto(p) { const n = (3 + Math.sqrt(9 + 8 * p.total)) / 2; return `$\\tfrac{${n} \\cdot ${n - 3}}{2} = ${p.total}$`; }, alto: () => 240, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const P = puntos(K, R(v.n), 88, 76); return K.f(f, lineas(K, P, true)) + K.p(P, 'fn') + P.map(q => K.c(...q, 4, 'fk')).join(''); },
    lee: v => `$\\tfrac{${R(v.n)} \\cdot ${R(v.n) - 3}}{2} = ${R(v.n) * (R(v.n) - 3) / 2}$`, aviso: (v, p) => (v.n * (v.n - 3) === p.total ? 'Cada diagonal tiene dos puntas: la contaste dos veces.' : v.n * (v.n - 3) / 2 > p.total ? 'Salen más diagonales.' : 'Salen menos diagonales.'), bien: v => `De cada vértice salen ${v.n - 3}, y cada una se comparte entre dos.`,
  });
  // Calles con una esquina cerrada; se llenan las que faltan.  params { a, b, cierra: [x, y], faltan: [[x, y]] }
  const caminos = p => { const m = {}; for (let y = 0; y <= p.b; y++) for (let x = 0; x <= p.a; x++) m[`${x},${y}`] = p.cierra[0] === x && p.cierra[1] === y ? 0 : x + y === 0 ? 1 : (m[`${x - 1},${y}`] || 0) + (m[`${x},${y - 1}`] || 0); return m; };
  const EX = (p, x) => 170 + (x - p.a / 2) * 84, EY = y => 166 - y * 62;
  XG.rotula('esquina-cerrada', {
    slots: p => p.faltan.map(([x, y]) => ({ x: R(EX(p, x)), y: EY(y), w: 48, h: 36 })), fichas: p => p.fichas, metas: p => p.faltan.map(q => String(caminos(p)[q.join()])), texto: p => `${p.faltan.map(q => caminos(p)[q.join()]).join(', ')}`, alto: () => 194,
    fondo(K, p) { let h = ''; const m = caminos(p); for (let x = 0; x <= p.a; x++) h += K.l(EX(p, x), EY(0), EX(p, x), EY(p.b), 'lm'); for (let y = 0; y <= p.b; y++) h += K.l(EX(p, 0), EY(y), EX(p, p.a), EY(y), 'lm'); for (let y = 0; y <= p.b; y++) for (let x = 0; x <= p.a; x++) { if (p.faltan.some(q => q[0] === x && q[1] === y)) continue; const c = p.cierra[0] === x && p.cierra[1] === y; h += K.c(EX(p, x), EY(y), 14, c ? 'ff' : 'fc') + K.t(EX(p, x), EY(y) + 5, c ? '✗' : x + y === 0 ? 'A' : m[`${x},${y}`], c ? 'tf' : 's'); } return h; },
    aviso(q, p) { const m = caminos(p), i = p.faltan.findIndex((e, k) => q[k][0] !== String(m[e.join()])), [x, y] = p.faltan[i]; return (p.cierra[0] === x - 1 && p.cierra[1] === y) || (p.cierra[0] === x && p.cierra[1] === y - 1) ? 'Por la esquina cerrada no llega nadie: aporta 0.' : 'Suma lo que llega desde la izquierda y desde abajo.'; }, bien: () => 'La esquina cerrada aporta 0 a sus vecinas.',
  });
  cuenta('tira-larga', 62, (K, p, f) => malla(K, 1, p.n, 36, 14) + K.f(f, K.r(170 - p.n / 2 * 36 + 3, 17, 66, 30, 'fa', 4)));
  XG.figura('triangulos-abanico', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'triángulos pequeños' }], ok: (v, p) => v.n * (v.n + 1) / 2 === p.total, sol: p => ({ n: (-1 + Math.sqrt(1 + 8 * p.total)) / 2 }),
    texto(p) { const n = (-1 + Math.sqrt(1 + 8 * p.total)) / 2; return `$${Array.from({ length: n }, (_, i) => n - i).join(' + ')} = ${p.total}$`; }, alto: () => 232, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), T = [170, 12], X = i => 50 + i * 240 / n; let h = ''; for (let i = 0; i < n; i++) h += K.p([T, [X(i), 140], [X(i + 1), 140]], 'fc'); return h + K.f(f, Array.from({ length: n }, (_, k) => K.t(50 + (k + 0.5) * 240 / n, 162, n - k, 's ta') + (k ? K.t(50 + k * 240 / n, 162, '+', 's tm') : '')).join('')); },
    lee: v => { const n = R(v.n); return `$${Array.from({ length: n }, (_, i) => n - i).join(' + ')} = ${n * (n + 1) / 2}$`; }, aviso: (v, p) => (v.n === p.total ? 'Faltó contar los grandes, que juntan varios pequeños.' : v.n * (v.n + 1) / 2 > p.total ? 'Salen más triángulos: los grandes también cuentan.' : 'Salen menos triángulos.'), bien: () => 'De un pedazo, de dos pedazos, de tres… hasta el grande.',
  });
  fichas('palabra-camino', (t, p) => [...t].filter(x => x === 'E').length === p.e && [...t].filter(x => x === 'N').length === p.n, {
    y: 128, fondo(K, p) { let h = ''; const u = 30, x0 = 170 - p.e * u / 2, y0 = 92; for (let i = 0; i <= p.e; i++) h += K.l(x0 + i * u, y0, x0 + i * u, y0 - p.n * u, 'lm'); for (let j = 0; j <= p.n; j++) h += K.l(x0, y0 - j * u, x0 + p.e * u, y0 - j * u, 'lm'); return h + K.c(x0, y0, 5, 'fA') + K.c(x0 + p.e * u, y0 - p.n * u, 5, 'fF') + K.t(x0 - 12, y0 + 6, 'A') + K.t(x0 + p.e * u + 14, y0 - p.n * u + 6, 'B'); },
    no: (t, p) => { const e = [...t].filter(x => x === 'E').length; return `«${t}» camina ${e} al este y ${t.length - e} al norte: no llega a B.`; }, falta: 'Falta uno: son las mismas cuadras en otro orden.', bien: p => `Todos tienen ${p.e} E y ${p.n} N; solo cambia el orden.`, pie: 'Toca todos los que llegan de A hasta B.',
  });
})();
;
//#archivo js/games/trig-escena.js
// Ejercicios de Trigonometría con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria): la rueda, la ola,
// el triángulo, el sector, el plano y la flor. Va después de conteo-escena.js. Tres armazones:
//   rueda(nombre, n)   n puntos que se arrastran por la rueda.   params { metas: [grados…], ini?, paso?, radio?, mira, ok }
//   mueve(nombre, d)   perillas que mueven una escena.           params { ks: [[clave, min, max, rótulo, paso?]…], v, meta, …, mira, ok }
//   XG.cuenta          fichas que arman la cuenta junto a una escena.
(() => {
  const rad = g => g * Math.PI / 180, R = Math.round;
  const XC = 170, YC = 116, RR = 84;
  // Con lo que se esconde mientras se responde: las proyecciones salen al comprobar.
  const disco = (K, f) => K.l(XC - RR - 16, YC, XC + RR + 16, YC, 'lm') + K.l(XC, YC - RR - 16, XC, YC + RR + 16, 'lm') + K.arc(XC, YC, RR, 0, 360, 'lm') + Array.from({ length: 24 }, (_, i) => { const a = K.at(XC, YC, RR - 4, i * 15), b = K.at(XC, YC, RR + 4, i * 15); return K.l(...a, ...b, 'ls'); }).join('');
  const radio = (K, g, cls, f, proy) => { const [x, y] = K.at(XC, YC, RR, g); return K.l(XC, YC, x, y, `${cls} gr`) + (proy ? K.f(f, K.l(x, y, x, YC, 'lf gr') + K.l(XC, YC, x, YC, 'lg gr')) : '') + K.f(f, K.t(...K.at(XC, YC, RR + 24, g).map((z, i) => z + (i ? 5 : 0)), `${R(g)}°`, 's')); };
  function rueda(name, n) {
    const ks = Array.from({ length: n }, (_, i) => `g${i}`), ord = v => ks.map(k => ((R(v[k]) % 360) + 360) % 360).sort((a, b) => a - b).join();
    XG.figura(name, {
      ini: p => Object.fromEntries(ks.map((k, i) => [k, p.ini?.[i] ?? 45 + 180 * i])),
      manijas: p => ks.map(k => ({ k, min: 0, max: 345, paso: p.paso || 15, en: v => { const a = rad(v[k]); return [XC + RR * Math.cos(a), YC - RR * Math.sin(a)]; }, de: (x, y) => { const a = Math.atan2(YC - y, x - XC) * 180 / Math.PI, g = (a + 360) % 360; return g > 352.5 ? 0 : g; } })),
      ok: (v, p) => ord(v) === [...p.metas].sort((a, b) => a - b).join(),
      sol: p => Object.fromEntries(ks.map((k, i) => [k, p.metas[i]])),
      texto: p => p.metas.map(g => `${g}°`).join(', '), alto: () => 232, ms: 1000, pie: n > 1 ? 'Arrastra los puntos por la rueda.' : 'Arrastra el punto por la rueda.',
      dib: (v, K, p, f) => disco(K, f) + (p.linea ? (p.linea[0] === 'y' ? K.l(XC - RR - 10, YC - RR * p.linea[1], XC + RR + 10, YC - RR * p.linea[1], 'lg d') : K.l(XC + RR * p.linea[1], YC - RR - 10, XC + RR * p.linea[1], YC + RR + 10, 'lg d')) : '') + ks.map((k, i) => radio(K, v[k], i ? 'lf' : 'la', f, n === 1)).join(''),
      aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
    });
  }
  const man = p => p.ks.map(([k, min, max, et, paso]) => ({ k, min, max, et, paso: paso || 1 }));
  function mueve(name, alto, dib, lee) {
    XG.figura(name, {
      ini: p => ({ ...p.v }), manijas: man, ok: (v, p) => p.ks.every(([k]) => Math.abs(v[k] - p.meta[k]) < 1e-6), sol: p => ({ ...p.v, ...p.meta }),
      texto: p => p.ks.map(([k, , , et]) => `${et}: ${p.meta[k]}`).join('; '), alto: p => alto + 44 * p.ks.length, ms: 1100, pie: 'Mueve las perillas. Al comprobar la escena responde.',
      dib: (v, K, p, f) => dib(v, K, p, f), lee: (v, p) => (lee ? lee(v, p) : ''), aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
    });
  }
  Object.assign(XG, { mueve });
  // ----------------------------------------------------------------------------------------------- escenas
  const ola = (v, K, p, f, al = 180) => {
    const P = XM.plano(K, 0, 4 * Math.PI, -4, 4, { H: al, g: Math.PI / 2, gy: 1 }), w = { A: 1, k: 0, w: 1, f: 0, ...v }, m = { A: 1, k: 0, w: 1, f: 0, ...p.v, ...p.meta };
    const fun = q => x => q.A * Math.sin(q.w * (x - q.f)) + q.k;
    return P.s + (p.franja ? K.l(18, P.Y(p.franja[0]), 322, P.Y(p.franja[0]), 'lg d') + K.l(18, P.Y(p.franja[1]), 322, P.Y(p.franja[1]), 'lg d') : '') + (p.sombra ? XM.curva(K, P, fun(m), 'lm d') : '') + XM.curva(K, P, fun(w)) + ((f || 0) > 0.5 ? K.l(18, P.Y(w.k), 322, P.Y(w.k), 'lf d') : '');
  };
  const tri = (K, o = {}) => { const b = o.b || 150, h = o.h || 96, x = 70, y = 124; return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fc') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.r(x + b - 10, y - 10, 10, 10, 'fn') + K.ang([x, y], [x + b, y], [x + b, y - h], 26, o.a ?? 'θ', 'fa') + K.t(x + b / 2, y + 17, o.ca ?? '', 's tg') + K.t(x + b + 8, y - h / 2 + 5, o.co ?? '', 's tf', 'start') + K.t(x + b / 2 - 12, y - h / 2 - 10, o.hi ?? '', 's ta', 'end'); };
  const libre = (K, p) => K.p([[50, 120], [270, 120], [150, 26]], 'fc') + K.t(40, 130, 'A', 's') + K.t(282, 130, 'B', 's') + K.t(150, 18, 'C', 's') + K.t(160, 138, p.c || '', 's ta') + K.t(224, 68, p.a || '', 's ta', 'start') + K.t(88, 68, p.b || '', 's ta', 'end');
  const sector = (v, K, p, f) => K.arc(XC, 100, 76, 0, 360, 'lm') + K.sec(XC, 100, 76, 0, v.g, 'fa') + K.arc(XC, 100, 76, 0, v.g, 'lf gr');
  const plano = (v, K, p, f) => { const P = XM.plano(K, -7.6, 7.6, -5, 5, { H: 210 }), q = (r, g) => [P.X(r * Math.cos(rad(g))), P.Y(r * Math.sin(rad(g)))]; return P.s + (p.z ? K.ar(P.X(0), P.Y(0), ...q(...p.z), 'lg gr') + K.t(14, 22, 'z en amarillo', 's tg', 'start') : '') + (p.pto ? K.c(P.X(p.pto[0]), P.Y(p.pto[1]), 6, 'fG') : '') + K.ar(P.X(0), P.Y(0), ...q(v.r, v.g), 'la gr') + K.f(f, K.c(...q(v.r, v.g), 6, 'fA')); };
  const rotulo = (K, p) => K.r(20, 10, 300, 54, 'fc', 10) + K.t(170, 43, p.cap || '', 'b');

  // ----------------------------------------------------------------------------------------------- juegos
  // Cada lección usa los suyos: ningún nombre se repite en el curso.
  ['coterminal-rueda', 'radianes-rueda', 'punto-unidad', 'cuadrante-referencia', 'arco-inverso', 'negativo-espejo', 'doble-vuelta', 'argumento-plano', 'vuelta-arco', 'raiz-primera', 'demoivre-rueda'].forEach(n => rueda(n, 1));
  ['gemelos-seno', 'gemelos-coseno', 'pareja-ecuacion', 'raices-opuestas', 'notables-rueda'].forEach(n => rueda(n, 2));
  mueve('sector-fraccion', 190, sector, v => `$${v.g}^\\circ$`);
  mueve('ola-amplitud', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-centro', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-periodo', 190, (v, K, p, f) => ola(v, K, p, f)); mueve('ola-desfase', 190, (v, K, p, f) => ola(v, K, p, f));
  mueve('catetos-razon', 170, (v, K, p, f) => { const u = 13; return tri(K, { b: v.x * u, h: v.y * u, ca: '', co: '' }); }, v => `$\\tfrac{${v.y}}{${v.x}}$`);
  mueve('escalera-apoya', 190, (v, K, p, f) => { const x = 60 + 130 * Math.cos(rad(v.g)), y = 160 - 130 * Math.sin(rad(v.g)); return K.l(40, 160, 300, 160, 'gr') + K.l(60, 160, x, y, 'la gr') + K.l(x, y, x, 160, 'lf d') + K.ang([60, 160], [200, 160], [x, y], 28, '', 'fa') + K.f(f, K.t(x + 14, (y + 160) / 2, `altura ${Math.round(Math.sin(rad(v.g)) * 100) / 100} · L`, 's tf', 'start')); }, v => `$${v.g}^\\circ$`);
  mueve('mirador', 200, (v, K, p, f) => { return tri(K, { b: 64, h: 64 * Math.tan(rad(v.g)), a: '', ca: `${p.d} m`, co: '' }) + K.f(f, K.t(170, 168, `${p.d} · tan ${v.g}°`, 'b ta')); }, v => `$${v.g}^\\circ$`);
  mueve('pitagoras-uno', 150, (v, K, p, f) => XM.barra(K, 30, [[v.s, 'sen²', 'ff'], [100 - v.s, '', 'fc']], { T: 100, h: 40 }) + XM.barra(K, 88, [[p.cs, 'cos² (dado)', 'fg'], [100 - p.cs, '', 'fc']], { T: 100, h: 40 }) + K.f(f, K.t(170, 83, `${v.s} + ${p.cs} = ${v.s + p.cs} centésimas`, 's')), v => `$${v.s / 100}$`);
  mueve('secante-barra', 150, (v, K, p, f) => XM.barra(K, 30, [[p.t, 'tan²', 'fa'], ...(f > 0.5 ? [[1, '1', 'fg']] : [])], { T: 10, h: 36 }) + XM.barra(K, 84, [[v.s, 'sec²', 'ff']], { T: 10, h: 36 }), v => `$\\sec^2 = ${v.s}$`);
  mueve('suma-angulos', 190, (v, K, p, f) => { const [ax, ay] = K.at(150, 170, 120, p.a), [bx, by] = K.at(150, 170, 120, p.a + v.b); return K.l(20, 170, 320, 170, 'lm') + K.sec(150, 170, 56, 0, p.a, 'fa') + K.sec(150, 170, 56, p.a, p.a + v.b, 'fg') + K.l(150, 170, ax, ay, 'la gr') + K.l(150, 170, bx, by, 'lf gr') + K.f(f, K.t(300, 30, `${p.a}° + ${v.b}° = ${p.a + v.b}°`, 's', 'end')); }, v => `$${v.b}^\\circ$`);
  mueve('resta-angulos', 190, (v, K, p, f) => { const [ax, ay] = K.at(90, 170, 140, p.a), [bx, by] = K.at(90, 170, 140, p.a - v.b); return K.l(40, 170, 320, 170, 'lm') + K.sec(90, 170, 56, 0, p.a, 'fa') + K.l(90, 170, ax, ay, 'la gr') + K.l(90, 170, bx, by, 'lf gr') + K.f(f, K.t(300, 30, `${p.a}° − ${v.b}° = ${p.a - v.b}°`, 's', 'end')); }, v => `$${v.b}^\\circ$`);
  mueve('mitad-angulo', 220, (v, K, p, f) => disco(K, f) + radio(K, p.g, 'lg', 1) + radio(K, v.m, 'la', f), v => `$${v.m}^\\circ$`);
  mueve('corta-ola', 190, (v, K, p, f) => { const P = XM.plano(K, 0, 4 * Math.PI, -1.6, 1.6, { H: 180, g: Math.PI / 2, gy: 0.5 }), a = Math.asin(Math.max(-1, Math.min(1, v.h))); return P.s + XM.curva(K, P, Math.sin) + K.l(18, P.Y(v.h), 322, P.Y(v.h), 'lf gr') + (Math.abs(v.h) <= 1 && f > 0.4 ? [a, Math.PI - a, a + 2 * Math.PI, 3 * Math.PI - a, a + 4 * Math.PI].filter(x => x > -0.01 && x < 12.58).map(x => K.c(P.X(x), P.Y(v.h), 5, 'fF')).join('') : ''); }, v => `$\\operatorname{sen}x = ${v.h}$`);
  mueve('cuelga-lado', 190, (v, K, p, f) => { const A = [50, 160], C = [50 + p.b * 10 * Math.cos(rad(30)), 160 - p.b * 5], d = Math.sqrt(Math.max(0, v.a * v.a - p.b * p.b / 4)) * 10; return K.l(30, 160, 330, 160, 'lm') + K.l(...A, ...C, 'la gr') + K.t(...A.map((z, i) => z + (i ? 18 : -4)), '30°', 's') + (v.a < p.b / 2 ? K.l(C[0], C[1], C[0], C[1] + v.a * 10, 'lf gr') : f > 0.3 ? [-d, d].filter((q, i) => C[0] + q > A[0] + 2 && (i || d > 0.1)).map(q => K.l(C[0], C[1], C[0] + q, 160, 'lf gr')).join('') : K.l(C[0], C[1], C[0] + d, 160, 'lf gr')); }, v => `$a = ${v.a}$`);
  mueve('angulo-tercero', 170, (v, K, p, f) => XM.barra(K, 50, [[p.A, `A ${p.A}°`, 'fa'], [p.B, `B ${p.B}°`, 'fg'], [v.C, 'C', 'ff']], { T: 220, h: 44 }) + K.f(f, K.l(265.5, 42, 265.5, 102, 'lg gr') + K.t(265, 36, '180°', 's tg')), v => `$C = ${v.C}^\\circ$`);
  mueve('abre-bisagra', 190, (v, K, p, f) => { const [x, y] = K.at(140, 160, p.a * 14, v.g), X2 = 140 + p.b * 14; return K.l(140, 160, X2, 160, 'lg gr') + K.l(140, 160, x, y, 'la gr') + K.l(x, y, X2, 160, 'lf gr d') + K.t(140 + p.b * 7, 178, p.b, 's tg') + K.t((140 + x) / 2 - 8, (160 + y) / 2, p.a, 's ta', 'end'); }, v => `$${v.g}^\\circ$`);
  mueve('area-bisagra', 190, (v, K, p, f) => { const [x, y] = K.at(140, 160, p.a * 14, v.g), X2 = 140 + p.b * 14; return K.p([[140, 160], [X2, 160], [x, y]], 'fa') + K.l(x, y, x, 160, 'lf d') + K.t(140 + p.b * 7, 178, p.b, 's tg'); }, v => `$${v.g}^\\circ$`);
  mueve('polar-flecha', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`); mueve('producto-polar', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`); mueve('cociente-polar', 215, plano, v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$`);
  mueve('petalos', 220, (v, K, p, f) => K.c(XC, YC, RR, 'fn') + Array.from({ length: R(v.n) }, (_, k) => { const [x, y] = K.at(XC, YC, RR, v.a + 360 * k / R(v.n)); return K.l(XC, YC, x, y, 'la') + K.c(x, y, 7, k ? 'fG' : 'fF'); }).join('') + K.l(60, YC, 280, YC, 'lm'), v => `$n = ${v.n}$`);
  // Fichas junto a una escena.
  const T = (n, o) => XG.cuenta(n, 148, (K, p) => tri(K, { ...o, ...(p.t || {}) }));
  ['lados-nombra', 'razones-tres', 'recta-notables', 'recta-mitad', 'seis-razones', 'de-una-todas', 'triangulo-inversa', 'componentes-polar', 'depresion-faro'].forEach(n => T(n, {}));
  ['senos-ley', 'cosenos-ley', 'cosenos-angulo', 'senos-pareja'].forEach(n => XG.cuenta(n, 148, libre));
  XG.cuenta('area-senos', 148, (K, p) => { const x = 190 - 90 * Math.cos(rad(p.an)), y = 118 - 90 * Math.sin(rad(p.an)); return K.p([[70, 118], [190, 118], [x, y]], 'fc') + K.ang([190, 118], [70, 118], [x, y], 22, '', 'fa') + K.t(130, 138, p.c, 's ta') + K.t((190 + x) / 2 + 10, (118 + y) / 2 - 6, p.a, 's ta', 'start') + K.t(170, 20, `ángulo de ${p.an}°`, 's tm'); });
  ['arco-cuenta', 'velocidad-cuenta', 'grados-radianes', 'vueltas-sobran-trig'].forEach(n => XG.cuenta(n, 150, (K, p) => K.arc(XC, 76, 64, 0, 360, 'lm') + K.sec(XC, 76, 64, 0, p.g, 'fa') + K.t(XC + 76, 40, p.cap || '', 's ta', 'start')));
  ['valores-eje', 'signo-valor', 'referencia-valor', 'par-impar'].forEach(n => XG.cuenta(n, 240, (K, p) => disco(K, 0) + (p.gs || []).map((g, i) => radio(K, g, ['la', 'lf', 'lg'][i % 3], 1)).join('')));
  ['lee-ola', 'ficha-ola', 'lee-periodo', 'ficha-desfase'].forEach(n => XG.cuenta(n, 186, (K, p) => ola(p.o, K, { v: p.o, meta: {} }, 0, 176)));
  ['rango-inversa', 'deshace-inversa', 'simplifica-senos', 'demuestra-pasos', 'conjugado-trig', 'reemplaza-identidad', 'suma-formula', 'suma-tangente', 'doble-cuenta', 'mitad-cuenta', 'despeja-trig', 'factoriza-trig', 'modulo-argumento', 'potencia-polar', 'raices-ordenadas'].forEach(n => XG.cuenta(n, 72, rotulo));
})();
;
//#archivo js/games/espacial-escena.js
// Ejercicios de «Razonamiento espacial» (pu-es-1 a pu-es-4) con las escenas de la explicación: calles, torres de cubos, moldes, dados,
// espejos y dobleces. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100);
  // ---------------------------------------------------------------------------------------- pu-es-1 · rejillas y caminos
  const U = 32, X = i => 26 + i * U, Y = j => 178 - j * U, COL = 9, FIL = 5, DIR = { N: [0, 1], S: [0, -1], E: [1, 0], O: [-1, 0] };
  const calles = (K, c = COL, f = FIL) => { let h = ''; for (let i = 0; i <= c; i++) h += K.l(X(i), Y(0), X(i), Y(f), 'ls'); for (let j = 0; j <= f; j++) h += K.l(X(0), Y(j), X(c), Y(j), 'ls'); return h; };
  const pto = (K, [x, y], s, cls = 'fF') => K.c(X(x), Y(y), 6, cls) + K.t(X(x) + (x > 8 ? -13 : 13), Y(y) + (y > 4 ? 16 : -8), s);
  const mueve = (a, ms) => ms.reduce(([x, y], [d, n]) => [x + DIR[d][0] * n, y + DIR[d][1] * n], a);
  const ruta = (K, a, ms, p) => { const P = [[...a]]; let [x, y] = a; for (const [d, n] of ms) { const k = Math.min(n, Math.max(0, p)); x += DIR[d][0] * k; y += DIR[d][1] * k; p -= n; P.push([x, y]); } return K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr'); };
  const esquina = { k: ['x', 'y'], min: [0, 0], max: [COL, FIL], paso: [1, 1], r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 26) / U, (178 - y) / U] };
  const cuadras = (v, a) => Math.abs(v.x - a[0]) + Math.abs(v.y - a[1]);
  const ele = (K, v, a, cls) => K.pl([[X(a[0]), Y(a[1])], [X(v.x), Y(a[1])], [X(v.x), Y(v.y)]], cls);

  // Una esquina a tantas cuadras de A y tantas de B.  v { x, y }
  XG.figura('esquina-dos', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }), manijas: () => [esquina], ok: (v, p) => cuadras(v, p.A) === p.da && cuadras(v, p.B) === p.db,
    sol(p) { for (let x = 0; x <= COL; x++) for (let y = 0; y <= FIL; y++) if (cuadras({ x, y }, p.A) === p.da && cuadras({ x, y }, p.B) === p.db) return { x, y }; return null; },
    texto: p => `a lo ancho y a lo alto suman ${p.da} desde A y ${p.db} desde B`, alto: () => 194, pie: 'Arrastra el punto por las esquinas.',
    dib: (v, K, p, f) => calles(K) + K.f(f, ele(K, v, p.A, 'la gr') + ele(K, v, p.B, 'lg gr')) + pto(K, p.A, 'A') + pto(K, p.B, 'B', 'fG'),
    lee: (v, p) => `$A: ${R(cuadras(v, p.A))} \\qquad B: ${R(cuadras(v, p.B))}$`, aviso: (v, p) => (cuadras(v, p.A) === p.da ? 'A la distancia de A le va bien; la de B no.' : cuadras(v, p.B) === p.db ? 'A la distancia de B le va bien; la de A no.' : 'Cuenta por las calles: lo que separa a lo ancho más lo que separa a lo alto.'), bien: () => 'Las dos distancias se cumplen por las calles.',
  });
  XG.figura('termina-ruta', {
    ini: p => ({ x: p.a[0], y: p.a[1] }), manijas: () => [esquina], ok: (v, p) => mueve(p.a, p.ms).join() === [v.x, v.y].join(), sol: p => { const [x, y] = mueve(p.a, p.ms); return { x, y }; },
    texto(p) { const [x, y] = mueve(p.a, p.ms), dx = x - p.a[0], dy = y - p.a[1]; return `${Math.abs(dx)} al ${dx > 0 ? 'este' : 'oeste'} y ${Math.abs(dy)} al ${dy > 0 ? 'norte' : 'sur'} de A`; }, alto: () => 194, ms: 2000, pie: 'Arrastra el punto hasta donde termina.',
    dib: (v, K, p, f) => calles(K) + (f ? ruta(K, p.a, p.ms, f * p.ms.reduce((s, m) => s + m[1], 0)) : '') + pto(K, p.a, 'A') + (f >= 1 ? K.c(X(v.x), Y(v.y), 8, mueve(p.a, p.ms).join() === [v.x, v.y].join() ? 'fo' : 'ff') : '') + K.t(332, 14, 'N ↑', 's tm', 'end'),
    lee: (v, p) => `$\\text{ancho: } ${R(v.x) - p.a[0]} \\qquad \\text{alto: } ${R(v.y) - p.a[1]}$`, aviso(v, p) { const [x, y] = mueve(p.a, p.ms); return 2 * p.a[0] - x === v.x && y === v.y ? 'Cambiaste este por oeste.' : x === v.x && 2 * p.a[1] - y === v.y ? 'Cambiaste norte por sur.' : x === v.x ? 'A lo ancho está bien; revisa norte contra sur.' : y === v.y ? 'A lo alto está bien; revisa este contra oeste.' : 'Resta los contrarios: este contra oeste y norte contra sur.'; }, bien: () => 'Los contrarios se restan; lo que queda dice dónde termina.',
  });
  // Todas las esquinas a d cuadras de A.
  XG.marca('rombo-cuadras', {
    sitios: p => Array.from({ length: (p.c + 1) * (p.f + 1) }, (_, i) => ({ x: 170 + (i % (p.c + 1) - p.c / 2) * 44, y: 22 + Math.floor(i / (p.c + 1)) * 40, w: 28, h: 28, red: true })), cara: (K, p, i) => (i % (p.c + 1) === p.A[0] && Math.floor(i / (p.c + 1)) === p.A[1] ? K.t(170 + (p.A[0] - p.c / 2) * 44, 27 + p.A[1] * 40, 'A', 'tf') : ''),
    fondo(K, p) { let h = ''; for (let x = 0; x <= p.c; x++) h += K.l(170 + (x - p.c / 2) * 44, 22, 170 + (x - p.c / 2) * 44, 22 + p.f * 40, 'lm'); for (let y = 0; y <= p.f; y++) h += K.l(170 - p.c * 22, 22 + y * 40, 170 + p.c * 22, 22 + y * 40, 'lm'); return h; }, nombre: (p, i) => `columna ${i % (p.c + 1) + 1}, fila ${Math.floor(i / (p.c + 1)) + 1}`,
    alto: p => p.f * 40 + 44, sol: p => Array.from({ length: (p.c + 1) * (p.f + 1) }, (_, i) => i).filter(i => Math.abs(i % (p.c + 1) - p.A[0]) + Math.abs(Math.floor(i / (p.c + 1)) - p.A[1]) === p.d),
    aviso(on, p) { const d = on.map((x, i) => (x ? Math.abs(i % (p.c + 1) - p.A[0]) + Math.abs(Math.floor(i / (p.c + 1)) - p.A[1]) : p.d)); return d.some(x => x !== p.d) ? `Una de esas queda a ${d.find(x => x !== p.d)} ${d.find(x => x !== p.d) === 1 ? 'cuadra' : 'cuadras'}.` : 'Falta alguna: mira también al otro lado de A.'; }, bien: () => 'Forman un rombo: lo que gana a lo ancho lo pierde a lo alto.', texto: p => `son las esquinas que suman ${p.d} cuadras`, pie: 'Toca todas las esquinas que cumplen.',
  });
  // Recorrido a escala: mientras se responde solo se ve la salida y la lista de tramos.
  const cq = (K, p, f) => {
    let [x, y] = [0, 0]; const P = [[0, 0]];
    for (const [d, n] of p.ms) { x += DIR[d][0] * n; y += DIR[d][1] * n; P.push([x, y]); }
    const xs = P.map(q => q[0]), ys = P.map(q => q[1]), mx = Math.min(...xs), my = Math.max(...ys), u = Math.min(13, 88 / Math.max(1, my - Math.min(...ys)), 180 / Math.max(1, Math.max(...xs) - mx)), q = ([a, b]) => [56 + (a - mx) * u, 16 + (my - b) * u], A = q([0, 0]), Z = q([x, y]);
    return K.f(f, K.pl(P.map(q), 'la gr') + K.l(...A, ...Z, 'lg d') + K.c(...Z, 5, 'fG')) + K.c(...A, 5, 'fF') + K.t(A[0] - 10, A[1] + 5, 'A', '', 'end') + p.ms.map(([d, n], i) => K.t(332, 24 + i * 22, `${n} al ${{ N: 'norte', S: 'sur', E: 'este', O: 'oeste' }[d]}`, 's tm', 'end')).join('');
  };
  XG.cuenta('vuelve-corto', 120, cq);
  // Listas de movimientos que terminan en el mismo lugar.
  const fin = ms => mueve([0, 0], ms).join(), dice = ms => ms.map(([d, n]) => `${n}${d}`).join('  ');
  XG.marca('mismo-destino', {
    sitios: p => p.listas.map((_, i) => ({ x: 90 + (i % 2) * 160, y: 74 + Math.floor(i / 2) * 54, w: 150, h: 44 })), cara: (K, p, i) => K.t(90 + (i % 2) * 160, 79 + Math.floor(i / 2) * 54, dice(p.listas[i])), fondo: (K, p) => K.t(170, 20, 'modelo', 's tm') + K.t(170, 42, dice(p.modelo), 'b ta'), alto: p => 50 + Math.ceil(p.listas.length / 2) * 54,
    sol: p => p.listas.map((_, i) => i).filter(i => fin(p.listas[i]) === fin(p.modelo)), aviso: (on, p) => { const i = on.findIndex((x, k) => x && fin(p.listas[k]) !== fin(p.modelo)); return i >= 0 ? `«${dice(p.listas[i])}» termina en otro lado.` : 'Falta otra: resta los movimientos contrarios.'; }, bien: () => 'El orden y las vueltas no cambian dónde se termina.', texto: p => p.listas.filter(l => fin(l) === fin(p.modelo)).map(dice).join('; '), pie: 'Toca todas las que terminan en el mismo lugar.',
  });
  XG.figura('atajo-recto', {
    ini: () => ({ h: 3 }), manijas: p => [{ k: 'h', min: 1, max: 16, paso: 1, en: v => [100 + p.b * 10, 186 - v.h * 10], de: (x, y) => (186 - y) / 10 }], ok: (v, p) => v.h ** 2 + p.b ** 2 === p.c ** 2, sol: p => ({ h: Math.sqrt(p.c ** 2 - p.b ** 2) }), texto: p => `$\\sqrt{${p.c}^2 - ${p.b}^2} = ${Math.sqrt(p.c ** 2 - p.b ** 2)}$`, alto: () => 214, pie: 'Sube el punto B.',
    dib(v, K, p, f) { const A = [100, 186], E = [100 + p.b * 10, 186], B = [E[0], 186 - v.h * 10]; return K.pl([A, E, B], 'la gr') + K.t((A[0] + E[0]) / 2, 204, `${p.b} al este`, 's ta') + K.t(E[0] + 12, (E[1] + B[1]) / 2 + 5, `${N(v.h)} al norte`, 's ta', 'start') + K.c(...A, 5, 'fF') + K.t(A[0] - 12, 190, 'A') + K.f(f, K.l(...A, A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 'lg gr')) + K.t(8, 20, `recta: ${p.c}`, 'tg', 'start'); },
    lee: (v, p) => `$${p.b}^2 + ${R(v.h)}^2 = ${p.b ** 2 + R(v.h) ** 2} \\qquad ${p.c}^2 = ${p.c ** 2}$`, aviso: (v, p) => (v.h === p.c - p.b ? 'Eso es por las calles; la línea recta es la hipotenusa.' : v.h ** 2 + p.b ** 2 > p.c ** 2 ? 'En línea recta quedó más lejos.' : 'En línea recta quedó más cerca.'), bien: () => 'La línea recta es la hipotenusa del triángulo.',
  });
  XG.rotula('regresa-ya', {
    slots: () => [{ x: 104, y: 156, w: 120, h: 38 }, { x: 240, y: 156, w: 120, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' y '), alto: () => 198, fondo: (K, p, f) => cq(K, p, f) + K.t(172, 161, 'y', '') + K.t(104, 192, 'norte o sur', 's tm') + K.t(240, 192, 'este u oeste', 's tm'),
    aviso: (q, p) => (q.flat().some(t => p.mismo.includes(t)) ? 'Eso te aleja: para volver se camina al contrario de lo que quedó.' : 'Resta los contrarios y camina al revés de lo que quedó.'), bien: () => 'Lo que quedó, pero en sentido contrario.',
  });
  // En movimiento: el taxi anda las cuadras que se le den.
  XG.tiros('taxi-cuadras', {
    perilla: () => ({ et: 'Cuadras', min: 0, max: 32, lee: v => `${v} ${v === 1 ? 'cuadra' : 'cuadras'}` }), meta: t => t.r, alto: 124, ms: 1700,
    dib(t, v, K, p, f) { const k = v == null ? 0 : (v === t.r ? 1 : v < t.r ? 0.68 : 1.25) * f, L = [[40, 104], [190, 104], [190, 34], [300, 34]], T = [150, 70, 110]; let d = k * 220, x = 40, y = 104; if (d <= 150) x = 40 + d; else if (d <= 220) { x = 190; y = 104 - (d - 150); } else { x = 190 + (d - 220); y = 34; } return K.pl(L, 'lm') + K.l(190, 34, 190, 12, 'lm') + K.c(190, 34, 9, f >= 1 && v === t.r ? 'fo' : 'fg') + (v == null ? '' : K.t(40, 24, `${v}`, 'b', 'start')) + K.r(x - 12, y - 8, 24, 16, f >= 1 && v !== t.r ? 'ff' : 'fA', 5); },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Se pasó de la esquina.' : 'No llegó a la esquina.'), cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira las cuadras y suelta: el taxi sale.',
  });

  // -------------------------------------------------------------------------------------------- pu-es-2 · vistas y cubos
  // h[fila][columna], fila 0 = adelante.
  const pila = (K, o, u, h, num = 1) => { let s = ''; for (let r = h.length - 1; r >= 0; r--) for (let c = h[0].length - 1; c >= 0; c--) { for (let z = 0; z < h[r][c]; z++) s += K.caja(K.iso(o, u, c, r, z), u, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false); if (num && h[r][c]) { const q = K.iso(o, u, c + 0.5, r + 0.5, h[r][c]); s += K.t(q[0], q[1] + 5, h[r][c], 's'); } } return s; };
  // Plano visto desde arriba: la fila de adelante abajo.
  const plano = (K, h, x, y, u) => h.map((fila, r) => fila.map((n, c) => K.r(x + c * u, y + (h.length - 1 - r) * u, u, u, 'fc', 2) + K.t(x + (c + 0.5) * u, y + (h.length - 0.5 - r) * u + 5, n)).join('')).join('') + K.t(x + h[0].length * u / 2, y + h.length * u + 16, 'adelante', 's tm');
  XG.cuenta('torres-suma', 150, (K, p) => pila(K, [150, 138], 24, p.h));
  const vista = { frente: h => h[0].map((_, c) => Math.max(...h.map(f => f[c]))), izquierda: h => [...h].reverse().map(f => Math.max(...f)) };
  // La fila pegada a quien mira desde la izquierda: se ven las filas, la de atrás a la izquierda del dibujo.
  for (const [nombre, cual] of [['vista-frente', 'frente'], ['vista-izquierda', 'izquierda']]) XG.marca(nombre, {
    sitios: p => { const n = vista[cual](p.h).length; return Array.from({ length: n * p.alto }, (_, i) => ({ x: 206 + (i % n) * 42, y: 42 + Math.floor(i / n) * 42, w: 38, h: 38 })); }, cara: () => '', alto: p => 42 + p.alto * 42,
    fondo: (K, p) => plano(K, p.h, 24, 26, 40) + K.t(24, 16, 'desde arriba', 's tm', 'start') + (cual === 'izquierda' ? K.ar(4, 70, 20, 70, 'lg') + K.t(206 + (p.h.length - 1) * 21, 12, 'atrás … adelante', 's tm') : K.t(206 + (p.h[0].length - 1) * 21, 12, 'de frente', 's tm')), nombre: (p, i) => { const n = vista[cual](p.h).length; return `columna ${i % n + 1}, altura ${p.alto - Math.floor(i / n)}`; },
    sol: p => { const v = vista[cual](p.h), n = v.length; return Array.from({ length: n * p.alto }, (_, i) => i).filter(i => p.alto - Math.floor(i / n) <= v[i % n]); },
    aviso(on, p) { const v = vista[cual](p.h), n = v.length, alt = v.map((_, c) => on.filter((x, i) => x && i % n === c).length); return on.some((x, i) => x && i + n < on.length && !on[i + n]) ? 'Ningún cubo flota: debajo de cada cuadro hay otro.' : alt.some((a, c) => a > v[c]) ? 'Una columna quedó más alta que su torre más alta.' : 'Una columna quedó baja: se ve la torre más alta, esté adelante o atrás.'; }, bien: () => 'Cada columna muestra la torre más alta que hay en esa dirección.', texto: p => `alturas ${vista[cual](p.h).join(', ')}`, pie: 'Toca los cuadros que se ven, de abajo hacia arriba.',
  });
  // Plano con la mayor cantidad de cubos para dos vistas.  params { cols, filas }  (filas de atrás hacia adelante)
  const tope = p => p.filas.flatMap(f => p.cols.map(c => String(Math.min(f, c))));
  XG.rotula('plano-maximo', {
    slots: p => p.filas.flatMap((_, r) => p.cols.map((_, c) => ({ x: 150 + c * 66, y: 62 + r * 50, w: 56, h: 40 }))), fichas: p => p.fichas, metas: tope, texto: p => `${p.filas.map((f, r) => p.cols.map(c => Math.min(f, c)).join(' y ')).join('; ')}: ${tope(p).reduce((a, b) => a + +b, 0)} cubos`, alto: p => 62 + p.filas.length * 50,
    fondo: (K, p) => p.cols.map((n, c) => K.t(150 + c * 66, 18, 'de frente', 's tm') + K.t(150 + c * 66, 36, n, 'ta')).join('') + p.filas.map((n, r) => K.t(96, 67 + r * 50, `izquierda: ${n}`, 's tg', 'end')).join('') + K.t(150 + (p.cols.length - 1) * 33, 54 + p.filas.length * 50, 'adelante', 's tm'),
    aviso(q, p) { const n = p.cols.length, v = q.map(l => +l[0]); return v.some((x, i) => x > Math.min(p.filas[Math.floor(i / n)], p.cols[i % n])) ? 'Una torre es más alta de lo que deja ver alguna de las vistas.' : 'Cumple sin pasarse, pero todavía caben más cubos o falta altura en una vista.'; }, bien: () => 'Cada torre sube hasta la menor de las dos alturas que la limitan.',
  });
  XG.cuenta('pintura-lugar', 108, (K, p) => K.caja([170, 102], 5, p.n, p.n, p.n, 'fa'));
  XG.marca('donde-pintura', {
    sitios: p => Array.from({ length: p.n * p.n }, (_, i) => ({ x: 170 + (i % p.n - (p.n - 1) / 2) * 34, y: 22 + Math.floor(i / p.n) * 34, w: 30, h: 30 })), cara: () => '', alto: p => p.n * 34 + 10, nombre: (p, i) => `fila ${Math.floor(i / p.n) + 1}, columna ${i % p.n + 1}`,
    sol: p => Array.from({ length: p.n * p.n }, (_, i) => i).filter(i => { const b = [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length; return b + 1 === p.caras; }),
    aviso(on, p) { const c = on.map((x, i) => (x ? 1 + [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length : p.caras)); const m = c.find(x => x !== p.caras); return m === 3 ? 'Los de la esquina tienen 3 caras pintadas.' : m === 1 ? 'Los de adentro de la cara solo tienen 1 cara pintada.' : 'Faltan: mira las cuatro aristas de la cara.'; }, bien: () => 'Están en las aristas, sin las esquinas.', texto: () => 'los del borde, sin las esquinas', pie: 'Es una cara del cubo, vista de frente. Toca los que cumplen.',
  });
  XG.figura('bloque-adentro', {
    ini: () => ({ c: 2 }), manijas: p => [{ k: 'c', min: 2, max: p.max, paso: 1, et: 'alto del bloque' }], ok: (v, p) => (p.a - 2) * (p.b - 2) * (v.c - 2) === p.sin, sol: p => ({ c: p.sin / ((p.a - 2) * (p.b - 2)) + 2 }), texto: p => `adentro $${p.a - 2} \\cdot ${p.b - 2} \\cdot ${p.sin / ((p.a - 2) * (p.b - 2))} = ${p.sin}$: alto $${p.sin / ((p.a - 2) * (p.b - 2)) + 2}$`, alto: () => 262, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => K.f(1 - f * 0.65, K.caja([170, 186], 13, p.a, p.b, R(v.c), 'fa')) + K.f(f, K.caja(K.iso([170, 186], 13, 1, 1, 1), 13, p.a - 2, p.b - 2, Math.max(0, R(v.c) - 2), 'ff')) + K.t(204, 200, p.a, 'tm', 'start') + K.t(136, 200, p.b, 'tm', 'end'),
    lee: (v, p) => `$${p.a - 2} \\cdot ${p.b - 2} \\cdot ${R(v.c) - 2} = ${(p.a - 2) * (p.b - 2) * (R(v.c) - 2)}$`, aviso: (v, p) => ((p.a - 2) * (p.b - 2) * v.c === p.sin ? 'Ese es el alto de adentro: falta la capa de arriba y la de abajo.' : (p.a - 2) * (p.b - 2) * (v.c - 2) > p.sin ? 'Quedan más cubitos sin pintar.' : 'Quedan menos cubitos sin pintar.'), bien: () => 'La pintura se lleva una capa por cada lado.',
  });
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  XG.ascensor('sube-cubos', 48, 1, neutro);

  // ------------------------------------------------------------------------------------------ pu-es-3 · moldes y dados
  // Dobla un molde: por cada celda, hacia dónde mira (y los ejes de su cara). null si dos caras caen en el mismo sitio.
  const neg = a => a.map(x => -x || 0);
  function dobla(cel) {
    const en = new Map(cel.map((c, i) => [c.join(), i])), out = Array(cel.length).fill(null);
    out[0] = { n: [0, 0, 1], r: [1, 0, 0], d: [0, -1, 0] };
    const q = [0];
    while (q.length) { const i = q.shift(), [c, f] = cel[i], { n, r, d } = out[i]; for (const [dx, dy, o] of [[1, 0, { n: r, r: neg(n), d }], [-1, 0, { n: neg(r), r: n, d }], [0, 1, { n: d, r, d: neg(n) }], [0, -1, { n: neg(d), r, d: n }]]) { const j = en.get([c + dx, f + dy].join()); if (j != null && !out[j]) { out[j] = o; q.push(j); } } }
    if (out.some(x => !x) || new Set(out.map(x => x.n.join())).size !== cel.length) return null;
    return out.map(x => x.n);
  }
  const opuesta = (cel, i) => { const n = dobla(cel); return n.findIndex(x => x.join() === neg(n[i]).join()); };
  const cruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const ladoDe = cel => [Math.max(...cel.map(c => c[0])) + 1, Math.max(...cel.map(c => c[1])) + 1];
  const molde = (K, cel, x, y, u, letras, on = []) => cel.map(([c, f], i) => K.r(x + c * u, y + f * u, u, u, on.includes(i) ? 'fa' : 'fc', 2) + (letras ? K.t(x + (c + 0.5) * u, y + (f + 0.5) * u + 6, letras[i], 'b') : '')).join('');
  const centro = (cel, u, cx) => cx - ladoDe(cel)[0] * u / 2;
  XG.rotula('opuestas-molde', {
    slots: p => p.pide.map((_, i) => ({ x: 66 + i * 104, y: 186, w: 70, h: 38 })), fichas: p => p.fichas, metas: p => p.pide.map(l => p.letras[opuesta(p.cel, p.letras.indexOf(l))]), texto: p => p.pide.map(l => `${l} con ${p.letras[opuesta(p.cel, p.letras.indexOf(l))]}`).join(', '), alto: () => 226,
    fondo: (K, p) => molde(K, p.cel, centro(p.cel, 38, 170), 8, 38, p.letras) + p.pide.map((l, i) => K.t(66 + i * 104, 222, `opuesta de ${l}`, 's tm')).join(''), aviso: (q, p) => (p.pide.some((l, i) => q[i][0] === l) ? 'Una cara no es opuesta de sí misma.' : p.pide.some((l, i) => { const a = p.cel[p.letras.indexOf(l)], b = p.cel[p.letras.indexOf(q[i][0])]; return b && Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1; }) ? 'Dos caras que se tocan en el molde nunca son opuestas.' : 'En una fila recta, la opuesta está saltando una.'), bien: () => 'Saltando una en la fila; las dos que sobran son las tapas.',
  });
  XG.marca('cierra-cubo', {
    sitios: p => p.moldes.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 60 + Math.floor(i / 3) * 112, w: 102, h: 106 })), cara: (K, p, i) => { const m = p.moldes[i], u = 19, [w, h] = ladoDe(m); return molde(K, m, 62 + (i % 3) * 108 - w * u / 2, 60 + Math.floor(i / 3) * 112 - h * u / 2, u); }, alto: p => Math.ceil(p.moldes.length / 3) * 112 + 6, nombre: (p, i) => `molde ${i + 1}`,
    sol: p => p.moldes.map((_, i) => i).filter(i => dobla(p.moldes[i])), aviso: (on, p) => (on.some((x, i) => x && !dobla(p.moldes[i])) ? 'En uno de esos dos caras caen en el mismo sitio y otro queda abierto.' : 'Falta uno que sí cierra.'), bien: () => 'Seis caras que caen en seis sitios distintos.', texto: p => `los moldes ${p.moldes.map((m, i) => (dobla(m) ? i + 1 : 0)).filter(Boolean).join(', ')}`, pie: 'Dobla cada uno en la mente. Toca todos los que cierran.',
  });
  XG.marca('vecinas-cara', {
    sitios: p => p.cel.map(([c, f]) => ({ x: centro(p.cel, 52, 170) + (c + 0.5) * 52, y: 12 + (f + 0.5) * 52, w: 46, h: 46 })), cara: (K, p, i) => K.t(centro(p.cel, 52, 170) + (p.cel[i][0] + 0.5) * 52, 19 + (p.cel[i][1] + 0.5) * 52, p.letras[i], p.letras[i] === p.de ? 'b tf' : 'b'), alto: p => ladoDe(p.cel)[1] * 52 + 24,
    sol: p => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return p.cel.map((_, k) => k).filter(k => k !== i && k !== o); }, aviso: (on, p) => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return on[o] ? `${p.letras[o]} queda frente a ${p.de}: no se tocan.` : on[i] ? `${p.de} es la misma cara.` : 'Falta alguna: una cara toca a las otras cuatro, menos a su opuesta.'; }, bien: () => 'Una cara toca a cuatro; a su opuesta, no.', texto: p => { const i = p.letras.indexOf(p.de), o = opuesta(p.cel, i); return [...p.letras].filter((_, k) => k !== i && k !== o).join(', '); }, pie: 'Toca todas las caras que la tocan en el cubo armado.',
  });
  const dado = (K, cx, cy, u, a, f, d, s = 'b') => { const A = [[cx - u, cy - u * 0.5], [cx, cy - u], [cx + u, cy - u * 0.5], [cx, cy]], F = [[cx - u, cy - u * 0.5], [cx, cy], [cx, cy + u * 1.1], [cx - u, cy + u * 0.6]], D = [[cx, cy], [cx + u, cy - u * 0.5], [cx + u, cy + u * 0.6], [cx, cy + u * 1.1]]; return K.p(A, 'fa') + K.p(F, 'fc') + K.p(D, 'fg') + K.t(cx, cy - u * 0.5 + 6, a, s) + K.t(cx - u / 2, cy + u * 0.36, f, s) + K.t(cx + u / 2, cy + u * 0.36, d, s); };
  const rosa = (K, cx, cy, u) => K.t(cx, cy - u - 7, 'arriba', 's tm') + K.t(cx - u - 6, cy + u * 0.3, 'frente', 's tm', 'end') + K.t(cx + u + 6, cy + u * 0.3, 'derecha', 's tm', 'start');
  XG.cuenta('dado-escondidas', 128, (K, p) => dado(K, 170, 66, 46, ...p.ve) + rosa(K, 170, 66, 46));
  XG.cuenta('vuelca-dado', 128, (K, p) => dado(K, 130, 66, 46, ...p.ve) + rosa(K, 130, 66, 46) + K.ar(98, 106, 66, 122, 'la gr') + K.t(58, 127, p.hacia, 's ta', 'end'));
  XG.cuenta('rueda-dado', 128, (K, p) => dado(K, 66, 66, 42, ...p.ve) + K.ar(124, 104, 300, 104, 'la gr') + K.t(212, 94, 'rueda a la derecha', 's ta') + K.t(66, 14, 'arriba', 's tm'));
  XG.marca('dados-imposibles', {
    sitios: p => p.dados.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 172 + Math.floor(i / 3) * 92, w: 100, h: 86 })), cara: (K, p, i) => dado(K, 62 + (i % 3) * 108, 170 + Math.floor(i / 3) * 92, 30, ...p.dados[i], ''), fondo: (K, p) => molde(K, p.cel, centro(p.cel, 36, 170), 8, 36, p.letras), alto: p => 130 + Math.ceil(p.dados.length / 3) * 92, nombre: (p, i) => `arriba ${p.dados[i][0]}, frente ${p.dados[i][1]}, derecha ${p.dados[i][2]}`,
    sol: p => p.dados.map((_, i) => i).filter(i => p.dados[i].some((a, k) => p.dados[i].some((b, m) => k !== m && opuesta(p.cel, p.letras.indexOf(a)) === p.letras.indexOf(b)))), aviso(on, p) { const mal = i => p.dados[i].some((a, k) => p.dados[i].some((b, m) => k !== m && opuesta(p.cel, p.letras.indexOf(a)) === p.letras.indexOf(b))); return on.some((x, i) => x && !mal(i)) ? 'Uno de esos no muestra ninguna pareja de opuestas.' : 'Falta uno que muestra juntas dos caras opuestas.'; }, bien: () => 'Dos caras opuestas nunca se ven a la vez.', texto: () => 'los que muestran juntas dos caras opuestas', pie: 'Toca todos los imposibles.',
  });
  XG.ascensor('sube-dado', 48, 1, neutro);
  // Para las pruebas.
  XG.espacial = { dobla, opuesta, posible(cel, letras, [a, f, d]) { const n = dobla(cel), v = l => n[letras.indexOf(l)]; return cruz(v(d), v(a)).join() === v(f).join(); } };

  // ------------------------------------------------------------------------------------- pu-es-4 · giros, espejos, dobleces
  // Media cuadrícula dada; se pinta su reflejo al otro lado del espejo vertical.
  XG.marca('espejo-vertical', {
    sitios: p => Array.from({ length: p.f * p.c }, (_, i) => ({ x: 178 + (i % p.c + 0.5) * 36, y: 14 + (Math.floor(i / p.c) + 0.5) * 36, w: 32, h: 32 })), cara: () => '', alto: p => p.f * 36 + 24, nombre: (p, i) => `fila ${Math.floor(i / p.c) + 1}, a ${i % p.c + 1} del espejo`,
    fondo: (K, p) => Array.from({ length: p.f * p.c }, (_, i) => K.r(162 - (p.c - i % p.c) * 36, 14 + Math.floor(i / p.c) * 36 + 2, 32, 32, p.dada.includes(i) ? 'fa' : 'fc', 5)).join('') + K.l(168, 4, 168, p.f * 36 + 20, 'lg gr'), sol: p => p.dada.map(i => Math.floor(i / p.c) * p.c + p.c - 1 - i % p.c),
    aviso(on, p) { const s = p.dada.map(i => Math.floor(i / p.c) * p.c + p.c - 1 - i % p.c); return on.every((x, i) => x === p.dada.includes(i)) ? 'Copiaste la figura igual: el espejo la voltea.' : on.some((x, i) => x && !s.includes(i)) ? 'Un cuadro no está a la misma distancia del espejo.' : 'Falta algún cuadro.'; }, bien: () => 'Mismo renglón y misma distancia, del otro lado.', texto: () => 'lo que está cerca del espejo se refleja cerca', pie: 'Toca los cuadros del reflejo.',
  });
  XG.marca('letras-espejo', {
    sitios: p => p.letras.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 36 + Math.floor(i / 4) * 66, w: 70, h: 58 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 44 + Math.floor(i / 4) * 66, p.letras[i], 'B'), alto: p => Math.ceil(p.letras.length / 4) * 66 + 6, sol: p => p.letras.map((_, i) => i).filter(i => p.igual.includes(p.letras[i])),
    aviso: (on, p) => { const i = on.findIndex((x, k) => x && !p.igual.includes(p.letras[k])); return i >= 0 ? `La ${p.letras[i]} se ve volteada: su izquierda y su derecha son distintas.` : 'Falta otra cuya mitad izquierda es igual a la derecha.'; }, bien: () => 'Su mitad izquierda y su mitad derecha son iguales.', texto: p => p.letras.filter(l => p.igual.includes(l)).join(', '), pie: 'Toca todas las que se ven iguales.',
  });
  const ELE = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1]];
  const pinta = (K, cel, cx, cy, u, g, cls, voltea) => { const a = g * Math.PI / 180, xs = cel.map(c => c[0]), ys = cel.map(c => c[1]), mx = (Math.max(...xs) + 1) / 2, my = (Math.max(...ys) + 1) / 2; return cel.map(([c, r]) => K.p([[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]].map(([x, y]) => { let X0 = (x - mx) * u * 0.96, Y0 = (y - my) * u * 0.96; if (voltea) X0 = -X0; return [cx + X0 * Math.cos(a) - Y0 * Math.sin(a), cy + X0 * Math.sin(a) + Y0 * Math.cos(a)]; }), cls)).join(''); };
  XG.figura('gira-ele', {
    ini: () => ({ g: 0 }), manijas: () => [{ k: 'g', min: 0, max: 270, paso: 90, r: 11, en: v => [170 + 88 * Math.sin(v.g * Math.PI / 180), 104 - 88 * Math.cos(v.g * Math.PI / 180)], de: (x, y) => (Math.atan2(x - 170, 104 - y) * 180 / Math.PI + 405) % 360 - 45 }], ok: (v, p) => v.g === ((p.g % 360) + 360) % 360, sol: p => ({ g: ((p.g % 360) + 360) % 360 }), texto: p => `queda igual que con $${((p.g % 360) + 360) % 360}^\\circ$ en el sentido del reloj`, alto: () => 210, pie: 'Arrastra el punto alrededor de la figura.',
    dib: (v, K, p, f) => K.c(170, 104, 88, 'fn d') + pinta(K, ELE, 170, 104, 32, 0, 'fc') + pinta(K, ELE, 170, 104, 32, v.g, 'fa') + K.f(f, K.l(170, 104, 170, 16, 'lm d')) + K.l(170, 104, 170 + 88 * Math.sin(v.g * Math.PI / 180), 104 - 88 * Math.cos(v.g * Math.PI / 180), 'la'),
    lee: v => `$${R(v.g)}^\\circ \\text{ en el sentido del reloj}$`, aviso: (v, p) => (v.g === ((-p.g % 360) + 360) % 360 && v.g ? 'La giraste para el otro lado.' : 'Quita las vueltas completas y mira hacia qué lado sobra.'), bien: () => 'Las vueltas completas no cambian nada.',
  });
  XG.marca('giro-o-espejo', {
    sitios: p => p.figs.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 152 + Math.floor(i / 3) * 96, w: 98, h: 88 })), cara: (K, p, i) => pinta(K, p.cel, 62 + (i % 3) * 108, 152 + Math.floor(i / 3) * 96, 19, p.figs[i][0], 'fg', p.figs[i][1]), fondo: (K, p) => K.t(170, 14, 'modelo', 's tm') + pinta(K, p.cel, 170, 62, 24, 0, 'fa'), alto: p => 106 + Math.ceil(p.figs.length / 3) * 96, nombre: (p, i) => `figura ${i + 1}`,
    sol: p => p.figs.map((_, i) => i).filter(i => !p.figs[i][1]), aviso: (on, p) => (on.some((x, i) => x && p.figs[i][1]) ? 'Una de esas está volteada: ningún giro la deja así.' : 'Falta una que sale de girar el modelo.'), bien: () => 'Girar da vueltas; las otras están en espejo.', texto: p => `las figuras ${p.figs.map((x, i) => (x[1] ? 0 : i + 1)).filter(Boolean).join(', ')}`, pie: 'Toca todas las que salen solo de girar.',
  });
  const reloj = (K, cx, cy, r, h, cls) => { let s = K.c(cx, cy, r, 'fc'); for (let i = 0; i < 12; i++) s += K.l(...K.at(cx, cy, r - 6, 90 - i * 30), ...K.at(cx, cy, r, 90 - i * 30), 'lm'); return s + K.l(cx, cy, ...K.at(cx, cy, r - 12, 90), 'lm') + K.l(cx, cy, ...K.at(cx, cy, r * 0.58, 90 - h * 30), `${cls} gr`) + K.c(cx, cy, 3, 'fk'); };
  XG.figura('hora-espejo', {
    ini: () => ({ h: 0 }), manijas: () => [{ k: 'h', min: 0, max: 11, paso: 1, r: 10, en: v => XPK.at(248, 96, 40, 90 - v.h * 30), de: (x, y) => R(((90 - Math.atan2(96 - y, x - 248) * 180 / Math.PI + 360) % 360) / 30) % 12 }], ok: (v, p) => (v.h + p.h) % 12 === 0, sol: p => ({ h: 12 - p.h }), texto: p => `$12 - ${p.h} = ${12 - p.h}$: son las ${12 - p.h}`, alto: () => 196, pie: 'Arrastra la aguja corta del reloj real.',
    dib: (v, K, p, f) => reloj(K, 92, 96, 66, p.h, 'lg') + reloj(K, 248, 96, 66, v.h, 'la') + K.l(170, 20, 170, 172, 'lm d') + K.t(92, 186, 'en el espejo', 's tg') + K.t(248, 186, 'real', 's ta') + K.f(f, K.l(...K.at(92, 96, 38, 90 - p.h * 30), ...K.at(248, 96, 38, 90 + p.h * 30), 'lo d')),
    lee: v => `$${R(v.h) || 12}\\!:\\!00$`, aviso: (v, p) => (v.h === p.h ? 'Esa es la que se ve en el espejo.' : (v.h + p.h) % 12 === 6 ? 'La volteaste de arriba abajo; el espejo cambia izquierda por derecha.' : 'La aguja real está igual de lejos del 12, al otro lado.'), bien: () => 'Igual de lejos del 12, al otro lado.',
  });
  XG.cuenta('dobla-y-cuenta', 96, (K, p) => { const c = 2 ** Math.ceil(p.d / 2), f = 2 ** Math.floor(p.d / 2), S = 84; return K.r(44, 6, S, S, 'fn d', 2) + K.r(44, 6, S / c, S / f, 'fa', 2) + K.t(150, 40, `${p.d} dobleces`, 'ta', 'start') + K.t(150, 64, `${p.np} perforaciones`, 'tf', 'start'); });
  XG.marca('papel-abierto', {
    sitios: () => Array.from({ length: 16 }, (_, i) => ({ x: 190 + (i % 4 + 0.5) * 36, y: 30 + (Math.floor(i / 4) + 0.5) * 36, w: 32, h: 32 })), cara: (K, p, i, on) => (on ? K.c(190 + (i % 4 + 0.5) * 36, 30 + (Math.floor(i / 4) + 0.5) * 36, 7, 'fF') : ''), alto: () => 184, nombre: (p, i) => `fila ${Math.floor(i / 4) + 1}, columna ${i % 4 + 1}`,
    fondo: (K, p) => K.t(92, 18, 'doblada dos veces', 's tm') + K.r(20, 30, 144, 144, 'fn d', 2) + K.r(20, 30, 72, 72, 'fa', 2) + K.l(92, 30, 92, 102, 'lg gr') + K.l(20, 102, 92, 102, 'lg gr') + K.c(20 + (p.c + 0.5) * 36, 30 + (p.f + 0.5) * 36, 7, 'fF') + K.t(262, 18, 'abierta', 's tm'),
    sol: p => [p.f, 3 - p.f].flatMap(f => [p.c, 3 - p.c].map(c => f * 4 + c)).sort((a, b) => a - b), aviso(on, p) { const s = [p.f, 3 - p.f].flatMap(f => [p.c, 3 - p.c].map(c => f * 4 + c)); return on.filter(Boolean).length < 4 && on.every((x, i) => !x || s.includes(i)) ? 'Son cuatro capas: faltan huecos.' : 'Los huecos quedan en espejo a cada lado de cada doblez.'; }, bien: () => 'Cada doblez refleja el hueco al otro lado.', texto: () => 'cuatro huecos, en espejo a cada lado de los dobleces', pie: 'Toca dónde quedan los huecos al abrirla.',
  });
  XG.ascensor('sube-dobleces', 40, 1, neutro);
})();
;
//#archivo js/games/secuencias-escena.js
// Ejercicios de «Secuencias y patrones» (pu-se-1 a pu-se-3) con las escenas de la explicación: fichas con saltos, alfabeto, figuras que
// crecen y ruedas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, mod = (a, n) => ((a % n) + n) % n, neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Fila de fichas; `saltos` dibuja arcos con su rótulo.
  const fila = (K, T, y, o = {}) => { const n = T.length, w = Math.min(54, 324 / n), X = i => 170 + (i - (n - 1) / 2) * w; return T.map((t, i) => (t === '' ? '' : K.r(X(i) - w / 2 + 3, y, w - 6, 36, o.cls ? o.cls(i) : 'fa', 9) + K.t(X(i), y + 24, t))).join('') + (o.saltos || []).map((t, i) => (t ? `<path class="xl la" d="M${R(X(i)) + 4} ${y - 3} Q${R((X(i) + X(i + 1)) / 2)} ${y - 30} ${R(X(i + 1)) - 4} ${y - 3}"/>` + K.t((X(i) + X(i + 1)) / 2, y - 24, t, 's ta') : '')).join(''); };
  const xs = (n, i) => 170 + (i - (n - 1) / 2) * Math.min(54, 324 / n);

  // ----------------------------------------------------------------------------------------- pu-se-1 · sucesiones numéricas
  // Qué lugar ocupa un número.  v { n }
  XG.figura('que-lugar', {
    ini: () => ({ n: 6 }), manijas: p => [{ k: 'n', min: 6, max: p.max, paso: 1, et: 'lugar' }], ok: (v, p) => p.a + (v.n - 1) * p.d === p.meta, sol: p => ({ n: (p.meta - p.a) / p.d + 1 }), texto: p => `$(${p.meta} - ${p.a}) \\div ${p.d} = ${(p.meta - p.a) / p.d}$ saltos: lugar ${(p.meta - p.a) / p.d + 1}`, alto: () => 186, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => fila(K, [p.a, p.a + p.d, p.a + 2 * p.d, '…', f > 0.6 ? p.a + (R(v.n) - 1) * p.d : '?'], 62, { cls: i => (i === 4 ? 'fg' : 'fa'), saltos: f ? [`+${p.d}`, `+${p.d}`] : [] }) + [0, 1, 2].map(i => K.t(xs(5, i), 116, i + 1, 's tm')).join('') + K.t(xs(5, 4), 116, R(v.n), 's tg') + K.f(f, K.t(xs(5, 4), 22, `${R(v.n) - 1} saltos`, 's ta')),
    lee: (v, p) => `$${p.a} + ${R(v.n) - 1} \\cdot ${p.d} = ${p.a + (R(v.n) - 1) * p.d}$`, aviso: (v, p) => (p.a + v.n * p.d === p.meta ? 'Esos son los saltos: el lugar es uno más.' : p.a + (v.n - 1) * p.d > p.meta ? 'En ese lugar el número ya es mayor.' : 'En ese lugar el número todavía es menor.'), bien: v => `${v.n - 1} saltos llevan al lugar ${v.n}.`,
  });
  // Huecos en una fila: params { t: [números, con null en los huecos], arriba?: [rótulos, con null], fichas, … }
  const huecos = (nombre, d) => XG.rotula(nombre, {
    slots: p => [...(p.arriba || []).map((t, i) => (t === null ? { x: R((xs(p.t.length, i) + xs(p.t.length, i + 1)) / 2), y: 34, w: 46, h: 34 } : null)), ...p.t.map((t, i) => (t === null ? { x: R(xs(p.t.length, i)), y: p.arriba ? 96 : 58, w: Math.min(46, R(324 / p.t.length) - 3), h: 38 } : null))].filter(Boolean),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: p => (p.arriba ? 124 : 92),
    fondo: (K, p) => fila(K, p.t.map(t => t ?? ''), p.arriba ? 78 : 40) + (p.arriba || []).map((t, i) => { const a = xs(p.t.length, i), b = xs(p.t.length, i + 1); return `<path class="xl la" d="M${R(a) + 4} 75 Q${R((a + b) / 2)} 52 ${R(b) - 4} 75"/>` + (t === null ? '' : K.t((a + b) / 2, 40, t, 's ta')); }).join(''),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok, ...d,
  });
  huecos('saltos-crecen'); huecos('mezcladas-siguen'); huecos('suma-dos');
  XG.cuenta('termino-lejano', 92, (K, p) => fila(K, [...p.t, '…'], 46, { saltos: p.t.slice(1).map(() => `+${p.t[1] - p.t[0]}`) }));
  // Dos filas con un término que rompe la regla en cada una.
  XG.marca('rompe-fila', {
    sitios: p => p.filas.flatMap((f, r) => f.map((_, i) => ({ x: R(170 + (i - (f.length - 1) / 2) * 54), y: 36 + r * 64, w: 48, h: 44 }))), cara: (K, p, i) => { const n = p.filas[0].length; return K.t(170 + (i % n - (n - 1) / 2) * 54, 42 + Math.floor(i / n) * 64, p.filas[Math.floor(i / n)][i % n]); }, alto: p => p.filas.length * 64 + 8,
    sol: p => p.malos.map((m, r) => r * p.filas[0].length + m), aviso(on, p) { const n = p.filas[0].length, q = p.filas.map((_, r) => on.slice(r * n, r * n + n).map((x, i) => (x ? i : -1)).filter(i => i >= 0)), r = q.findIndex((l, k) => l.length !== 1 || l[0] !== p.malos[k]), l = q[r]; return l.length > 1 ? `En la fila ${r + 1} hay un solo equivocado.` : l.length ? `El ${p.filas[r][l[0]]} no es: el equivocado daña el paso que llega a él y el que sale.` : `Falta el de la fila ${r + 1}.`; }, bien: p => p.ok, texto: p => p.malos.map((m, r) => `el ${p.filas[r][m]} debía ser ${p.buenos[r]}`).join('; '), pie: 'Toca, en cada fila, el término que rompe la regla.',
  });
  XG.rotula('cada-regla', {
    slots: p => p.filas.map((_, i) => ({ x: 270, y: 32 + i * 54, w: 118, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => p.filas.length * 54 + 12, fondo: (K, p) => p.filas.map((f, i) => K.t(196, 38 + i * 54, f.join(', '), '', 'end')).join(''),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: () => 'Una regla sirve solo si funciona en todos los pasos.',
  });
  XG.ascensor('sube-termino', 50, 1, neutro);

  // -------------------------------------------------------------------------------------------- pu-se-2 · letras y figuras
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = i => 22 + (i % 13) * 24.6, LY = i => (i < 13 ? 64 : 126);
  XG.figura('letra-sigue', {
    ini: () => ({ i: 24 }), manijas: () => [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[R(v.i)], en: v => [LX(R(v.i)), LY(R(v.i))], de: (x, y) => Math.max(0, Math.min(12, R((x - 22) / 24.6))) + (y > 95 ? 13 : 0) }], ok: (v, p) => ABC[v.i] === p.meta, sol: p => ({ i: ABC.indexOf(p.meta) }), texto: p => `sigue la ${p.meta}, la letra ${ABC.indexOf(p.meta) + 1}`, alto: () => 166, pie: 'Arrastra el señalador por el alfabeto.',
    dib: (v, K, p, f) => [...ABC].map((l, i) => { const on = p.seq.includes(l), m = f && l === ABC[R(v.i)]; return K.c(LX(i), LY(i), 11.5, m ? (l === p.meta ? 'fo' : 'ff') : on ? 'fA' : 'fc') + K.t(LX(i), LY(i) + 5, l, on && !m ? 'tc s' : 's') + K.t(LX(i), LY(i) + 27, i + 1, 's tm'); }).join('') + K.t(170, 28, `${[...p.seq].join(' · ')} · ?`, 'b ta'),
    lee: (v, p) => `$${[...p.seq].map(l => ABC.indexOf(l) + 1).join(', \\; ')}, \\; ${R(v.i) + 1}$`, aviso(v, p) { const n = [...p.seq].map(l => ABC.indexOf(l)), u = n.at(-1), d = u - n.at(-2); return v.i === u + d ? 'Repetiste el último salto; los saltos también cambian.' : `De la ${p.seq.at(-1)} a la ${ABC[v.i]} el salto es de ${Math.abs(v.i - u)}${v.i < u ? ', hacia atrás' : ''}: no sigue la regla.`; }, bien: () => 'Con números se ve la regla de los saltos.',
  });
  huecos('letras-atras');
  // Figuras de puntos.  dib según p.n
  const te = (K, n, cx, cy, u) => { let h = K.c(cx, cy, u * 0.42, 'fA'); for (let k = 1; k <= n; k++) for (let a = 0; a < 5; a++) h += K.c(...K.at(cx, cy, k * u, 90 + a * 72), u * 0.42, 'fA'); return h; };
  XG.figura('brazos-estrella', {
    ini: () => ({ n: 3 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'figura' }], ok: (v, p) => 5 * v.n + 1 === p.total, sol: p => ({ n: (p.total - 1) / 5 }), texto: p => `$5n + 1 = ${p.total}$: figura ${(p.total - 1) / 5}`, alto: () => 226, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), u = Math.min(16, 76 / n); return f ? te(K, n, 170, 88, u) + K.f(f, K.t(332, 150, `${5 * n + 1} puntos`, 'ta', 'end')) : [1, 2, 3].map(k => te(K, k, 62 + (k - 1) * 108, 64, 15) + K.t(62 + (k - 1) * 108, 134, `figura ${k}`, 's tm')).join(''); },
    lee: v => `$5 \\cdot ${R(v.n)} + 1 = ${5 * R(v.n) + 1}$`, aviso: (v, p) => (6 + 5 * v.n === p.total ? 'Contaste los saltos: la figura 1 ya tenía sus 6 puntos.' : 5 * v.n + 1 > p.total ? 'Tiene más puntos.' : 'Tiene menos puntos.'), bien: v => `Uno fijo en el centro y cinco brazos de ${v.n}.`,
  });
  XG.cuenta('fijo-y-crece', 96, (K, p, f) => p.t.map((n, k) => Array.from({ length: n }, (_, i) => K.r(18 + k * 112 + (i % 6) * 15, 8 + Math.floor(i / 6) * 15, 13, 13, f && i < p.fijo ? 'fG' : 'fa', 2)).join('') + K.t(62 + k * 112, 88, `figura ${k + 1}: ${n}`, 's tm')).join(''));
  const escal = (n, r, c) => r + c < n;   // r desde abajo
  XG.marca('escalera-cuatro', {
    sitios: p => Array.from({ length: p.lado * p.lado }, (_, i) => ({ x: 196 + (i % p.lado) * 30, y: 34 + Math.floor(i / p.lado) * 30, w: 27, h: 27 })), cara: () => '', alto: p => p.lado * 30 + 30, nombre: (p, i) => `fila ${Math.floor(i / p.lado) + 1}, columna ${i % p.lado + 1}`,
    fondo: (K, p) => [1, 2, 3].map(n => { let h = ''; for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (escal(n, r, c)) h += K.r([12, 44, 100][n - 1] + c * 20, 140 - r * 20, 19, 19, 'fg', 2); return h + K.t([12, 44, 100][n - 1] + n * 10, 176, n, 's tm'); }).join('') + K.t(256, 14, `figura ${p.n}`, 's tm'),
    sol: p => Array.from({ length: p.lado * p.lado }, (_, i) => i).filter(i => escal(p.n, p.lado - 1 - Math.floor(i / p.lado), i % p.lado)), aviso: (on, p) => { const k = on.filter(Boolean).length, t = p.n * (p.n + 1) / 2; return k === t ? 'La cantidad está bien; la forma debe ser como las anteriores, pegada a la izquierda y al piso.' : k < t ? 'Faltan cuadros: cada figura agrega una diagonal completa.' : 'Sobran cuadros.'; }, bien: p => `Agrega ${p.n} a la anterior: ${p.n * (p.n + 1) / 2} en total.`, texto: p => `${p.n * (p.n + 1) / 2} cuadros, en escalera`, pie: 'Arma la figura en la cuadrícula.',
  });
  XG.rotula('dos-reglas', {
    slots: () => [{ x: 256, y: 64, w: 56, h: 44 }, { x: 312, y: 64, w: 50, h: 44 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 100, fondo: (K, p) => p.t.map(([l, n], i) => K.r(8 + i * 56, 42, 50, 44, 'fc', 9) + K.t(22 + i * 56, 70, l, 'b ta') + K.t(42 + i * 56, 69, n, String(n).length > 1 ? 's tg' : 'tg')).join('') + K.t(256, 30, 'letra', 's tm') + K.t(312, 30, 'número', 's tm'),
    aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: () => 'Dos reglas aparte, y después se juntan.',
  });
  XG.figura('mesas-hexagono', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'mesas' }], ok: (v, p) => 4 * v.n + 2 === p.total, sol: p => ({ n: (p.total - 2) / 4 }), texto: p => `$4n + 2 = ${p.total}$: ${(p.total - 2) / 4} mesas`, alto: () => 178, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), r = Math.min(26, 290 / (n * 1.75)), w = r * 1.732, x0 = 170 - (n - 1) * w / 2; let h = ''; for (let i = 0; i < n; i++) { const cx = x0 + i * w; h += K.p([0, 1, 2, 3, 4, 5].map(k => K.at(cx, 64, r, 30 + k * 60)), 'fg'); if (f || n <= 2) h += K.f(f || 1, [60, 120, 240, 300].map(g => K.c(...K.at(cx, 64, r * 1.12, g), r * 0.16, 'fA')).join('') + (i === 0 ? K.c(...K.at(cx, 64, r * 1.12, 180), r * 0.16, 'fA') : '') + (i === n - 1 ? K.c(...K.at(cx, 64, r * 1.12, 0), r * 0.16, 'fA') : '')); } return h; },
    lee: v => `$4 \\cdot ${R(v.n)} + 2 = ${4 * R(v.n) + 2}$`, aviso: (v, p) => (6 * v.n > p.total && 6 * (v.n - 1) < p.total ? 'Al pegar dos mesas se pierden los lados que se tocan: no son 6 por mesa.' : 4 * v.n + 2 > p.total ? 'Caben más personas.' : 'Caben menos personas.'), bien: () => 'Cada mesa pone 4 y las dos puntas siempre están.',
  });
  XG.ascensor('sube-patron', 45, 1, neutro);

  // --------------------------------------------------------------------------------------------- pu-se-3 · patrones cíclicos
  // Rueda con rótulos: se parte de `de` (índice) y se avanzan `pasos` (negativos hacia atrás).  v { k }
  const CL = ['fF', 'fG', 'fA', 'fM', 'fc'];
  const rueda = (nombre, d) => XG.figura(nombre, {
    ini: p => ({ k: mod(p.de + 1 + (mod(p.de + p.pasos, p.r.length) === mod(p.de + 1, p.r.length) ? 1 : 0), p.r.length) }),
    manijas: p => [{ k: 'k', min: 0, max: p.r.length - 1, paso: 1, r: 11, en: v => XPK.at(170, 112, 54, 90 - v.k * 360 / p.r.length), de: (x, y) => R(mod(90 - Math.atan2(112 - y, x - 170) * 180 / Math.PI, 360) / 360 * p.r.length) % p.r.length }],
    ok: (v, p) => v.k === mod(p.de + p.pasos, p.r.length), sol: p => ({ k: mod(p.de + p.pasos, p.r.length) }), texto: p => `sobran ${mod(Math.abs(p.pasos), p.r.length)}: ${p.r[mod(p.de + p.pasos, p.r.length)]}`, alto: () => 226, ms: 2400, pie: 'Arrastra la flecha hasta tu respuesta.',
    dib(v, K, p, f) { const n = p.r.length, c = f ? mod(p.de + R(p.pasos * f), n) : -1; return K.c(170, 112, 86, 'fn') + p.r.map((t, i) => { const [x, y] = K.at(170, 112, 86, 90 - i * 360 / n); const fin = f >= 1 && i === mod(p.de + p.pasos, n); return (p.color && i === c && f < 1 ? K.c(x, y, 24, 'fn') : '') + (fin && p.color ? K.c(x, y, 25, 'fop') + K.c(x, y, 25, 'fo') : '') + K.c(x, y, 19, 'fop') + K.c(x, y, 19, fin && !p.color ? 'fo' : i === c && !p.color ? 'fg' : p.color ? CL[i % CL.length] : i === p.de && !p.sinDe ? 'fa' : 'fc') + K.t(x, y + 5, t, p.color && i % 5 < 4 ? 'tc s' : 's'); }).join('') + K.ar(170, 112, ...K.at(170, 112, 54, 90 - v.k * 360 / n), 'la gr') + (f ? K.c(170, 112, 24, 'fop') + K.t(170, 117, R(Math.abs(p.pasos) * f), 'b ta') : ''); },
    lee: (v, p) => { const n = p.r.length, a = Math.abs(p.pasos); return `$${a} = ${Math.floor(a / n)} \\cdot ${n} + ${a % n}$`; },
    aviso(v, p) { const n = p.r.length, m = mod(p.de + p.pasos, n); return v.k === p.de ? 'Ahí quedaría si no sobrara nada.' : !p.color && v.k === mod(p.de - p.pasos, n) ? 'Contaste hacia el otro lado.' : mod(v.k - m, n) === 1 || mod(m - v.k, n) === 1 ? 'Por uno: revisa desde dónde se empieza a contar.' : 'Las vueltas completas no cambian nada: solo cuenta lo que sobra.'; }, bien: () => 'Las vueltas completas sobran; manda el residuo.', ...d,
  });
  rueda('pieza-ciclo'); rueda('dia-semana'); rueda('retrocede-ruleta');
  XG.cuenta('vueltas-sobran', 74, (K, p) => [...(p.palabra + p.palabra + p.palabra.slice(0, 2))].map((l, i, a) => K.r(170 + (i - a.length / 2) * 25 + 1, 20, 23, 32, i < p.palabra.length ? 'fa' : 'fc', 4) + K.t(170 + (i - a.length / 2 + 0.5) * 25, 42, l)).join('') + K.t(330, 42, '…', 'tm'));
  XG.cuenta('ultima-ciclo', 92, (K, p) => fila(K, [1, 2, 3, 4, 5].map(k => `${p.base ** k}`), 38) + [1, 2, 3, 4, 5].map(k => K.t(xs(5, k - 1), 24, `${p.base}${'⁰¹²³⁴⁵'[k]}`, 's ta')).join(''));
  XG.figura('coinciden-otra', {
    ini: () => ({ t: 1 }), manijas: p => [{ k: 't', min: 1, max: p.max, paso: 1, et: p.et }], ok: (v, p) => { let m = p.a; while (m % p.b) m += p.a; return v.t === m; }, sol: p => { let m = p.a; while (m % p.b) m += p.a; return { t: m }; }, texto(p) { let m = p.a; while (m % p.b) m += p.a; return `$\\text{mcm}(${p.a}, ${p.b}) = ${m}$`; }, alto: () => 176, ms: 2000, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const X = t => 20 + t * 300 / p.max; return [[p.a, 46, 'fF', 'tf', p.na], [p.b, 92, 'fG', 'tg', p.nb]].map(([m, y, cl, tc, s]) => { let h = K.l(X(0), y, X(p.max), y, 'lm') + K.t(20, y - 14, s, `s ${tc}`, 'start') + K.c(X(0), y, 5, cl); if (f) for (let t = m; t <= p.max * f + 1e-9; t += m) h += K.c(X(t), y, 5, cl); return h; }).join('') + K.f(f, K.l(X(v.t), 34, X(v.t), 104, 'la')); },
    lee: (v, p) => `$${R(v.t)} = ${Math.floor(R(v.t) / p.a)} \\cdot ${p.a} + ${R(v.t) % p.a} \\qquad ${R(v.t)} = ${Math.floor(R(v.t) / p.b)} \\cdot ${p.b} + ${R(v.t) % p.b}$`, aviso: (v, p) => (v.t === p.a * p.b ? 'Ahí coinciden, pero ya habían coincidido antes.' : v.t === p.a + p.b ? 'Los tiempos no se suman: busca un múltiplo de los dos.' : v.t % p.a === 0 || v.t % p.b === 0 ? 'Ahí solo le toca a uno de los dos.' : 'Ahí no le toca a ninguno.'), bien: () => 'Es el primer múltiplo de los dos.',
  });
  XG.marca('mismo-residuo', {
    sitios: p => p.nums.map((_, i) => ({ x: 50 + (i % 4) * 80, y: 90 + Math.floor(i / 4) * 56, w: 68, h: 46 })), cara: (K, p, i) => K.t(50 + (i % 4) * 80, 96 + Math.floor(i / 4) * 56, p.nums[i], 'b'), alto: p => 66 + Math.ceil(p.nums.length / 4) * 56, fondo: (K, p) => Array.from({ length: p.c }, (_, i) => K.c(170 + (i - (p.c - 1) / 2) * 36, 32, 14, mod(p.de - 1, p.c) === i ? 'fA' : 'fc') + K.t(170 + (i - (p.c - 1) / 2) * 36, 37, i + 1, mod(p.de - 1, p.c) === i ? 'tc s' : 's')).join(''),
    sol: p => p.nums.map((_, i) => i).filter(i => mod(p.nums[i] - p.de, p.c) === 0), aviso(on, p) { const i = on.findIndex((x, k) => x && mod(p.nums[k] - p.de, p.c)); return i >= 0 ? `El ${p.nums[i]} deja residuo ${p.nums[i] % p.c}, no ${p.de % p.c}.` : `Falta alguno con residuo ${p.de % p.c}.`; }, bien: p => `Todos dejan residuo ${p.de % p.c} al dividir entre ${p.c}.`, texto: p => p.nums.filter(n => mod(n - p.de, p.c) === 0).join(', '), pie: 'Toca todos los que caen en el mismo lugar.',
  });
  XG.ascensor('sube-residuo', 40, 1, neutro);
})();
;
//#archivo js/games/codigos-escena.js
// Ejercicios de «Codificación» (pu-cd-1 y pu-cd-2) con las escenas de la explicación: disco de letras, letras con valor, bombillos y
// máquinas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', N = l => ABC.indexOf(l) + 1;
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const X = (n, i, w = 60) => R(170 + (i - (n - 1) / 2) * w);
  // Alfabeto en dos renglones (sin números mientras se responde).
  const LX = i => 22 + (i % 13) * 24.6, LY = (i, y) => y + (i < 13 ? 0 : 1) * 58;
  const alfabeto = (K, y, on = '') => [...ABC].map((l, i) => K.t(22 + (i % 13) * 24.6, y + (i < 13 ? 0 : 24), l, on.includes(l) ? 'ta' : 's tm')).join('');
  const flecha = (K, y, a, b) => K.t(136, y, a, 'b', 'end') + K.ar(148, y - 6, 186, y - 6, 'lm') + K.t(200, y, b, 'b ta', 'start');

  // ------------------------------------------------------------------------------------------- pu-cd-1 · claves de sustitución
  // Cuántos lugares avanza la clave.  params { de, a }   v { k }
  XG.figura('avanza-clave', {
    ini: () => ({ k: 1 }), manijas: () => [{ k: 'k', min: 0, max: 25, paso: 1, et: 'lugares' }], ok: (v, p) => v.k === (N(p.a) - N(p.de) + 26) % 26, sol: p => ({ k: (N(p.a) - N(p.de) + 26) % 26 }), texto: p => `${(N(p.a) - N(p.de) + 26) % 26} lugares`, alto: () => 262, ms: 1900, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const A = i => 90 - i * 360 / 26, a = N(p.de) - 1, k = R(R(v.k) * f); let h = K.c(170, 106, 92, 'fn'); for (let i = 0; i < 26; i++) { const [x, y] = K.at(170, 106, 92, A(i)), on = ABC[i] === p.de ? 'fa' : ABC[i] === p.a ? 'fg' : ''; h += K.c(x, y, 11, 'fop') + (on ? K.c(x, y, 11, on) : '') + K.t(x, y + 5, ABC[i], 's'); } if (f) { for (let j = 1; j <= k; j++) h += K.c(...K.at(170, 106, 70, A(a + j)), 4, ABC[(a + j) % 26] === p.a ? 'fG' : 'fA'); h += K.t(170, 112, `${k}`, 'B ta'); } else h += K.t(170, 112, `${p.de} → ${p.a}`, 'b ta'); return h; },
    lee: (v, p) => `$\\text{${p.de}} \\to \\text{${ABC[(N(p.de) - 1 + R(v.k)) % 26]}}$`, aviso(v, p) { const m = (N(p.a) - N(p.de) + 26) % 26; return v.k === 26 - m ? `Contaste de la ${p.a} a la ${p.de}: hay que ir de la ${p.de} a la ${p.a}.` : v.k === m + 1 ? `La ${p.de} es el punto de partida: no se cuenta.` : `Con ${v.k}, la ${p.de} cae en la ${ABC[(N(p.de) - 1 + v.k) % 26]}.`; }, bien: () => 'Después de la Z sigue la A.',
  });
  // Letras que se ponen en fila.  params { w (letras de arriba), fichas, metas, mira, trampas?, ok }
  const letras = (nombre, rot) => XG.rotula(nombre, {
    slots: p => [...p.metas].map((_, i) => ({ x: X(p.metas.length, i), y: 118, w: 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 212,
    fondo: (K, p) => [...p.w].map((l, i) => { const x = X(p.w.length, i); return K.t(x, 50, l, 'B') + K.ar(x, 60, x, 90, 'lm'); }).join('') + K.t(170, 18, rot, 's tm') + alfabeto(K, 174), aviso: avisa, bien: p => p.ok,
  });
  letras('cifra-palabra', 'se cifra'); letras('descifra-mensaje', 'se descifra');
  XG.rotula('suma-letras', {
    slots: p => p.metas.map((_, i) => ({ x: R(40 + i * 62 + (i === p.w.length ? 12 : 0)), y: 82, w: i === p.w.length ? 60 : 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 166,
    fondo: (K, p) => [...p.w].map((l, i) => K.t(40 + i * 62, 48, l, 'B ta') + K.t(71 + i * 62 + (i === p.w.length - 1 ? 3 : 0), 88, i === p.w.length - 1 ? '=' : '+', 'b')).join('') + K.t(40 + p.w.length * 62 + 12, 48, 'total', 's tm') + alfabeto(K, 132), aviso: avisa, bien: p => p.ok,
  });
  // Qué letra falta.  params { w ('M_L'), total, meta }   v { i }
  const suma = (p, l) => [...p.w].reduce((a, x) => a + N(x === '_' ? l : x), 0);
  XG.figura('letra-falta', {
    ini: () => ({ i: 18 }), manijas: () => [{ k: 'i', min: 0, max: 25, paso: 1, r: 13, rot: v => ABC[R(v.i)], en: v => [LX(R(v.i)), LY(R(v.i), 96)], de: (x, y) => Math.max(0, Math.min(12, R((x - 22) / 24.6))) + (y > 125 ? 13 : 0) }], ok: (v, p) => ABC[v.i] === p.meta, sol: p => ({ i: N(p.meta) - 1 }), texto: p => `${p.w.replace('_', p.meta)}: ${suma(p, p.meta)}`, alto: () => 192, pie: 'Arrastra el señalador por el alfabeto.',
    dib: (v, K, p, f) => [...p.w].map((l, i) => K.r(X(p.w.length, i, 50) - 21, 8, 42, 44, 'fc', 9) + K.t(X(p.w.length, i, 50), 38, l === '_' ? (f ? ABC[R(v.i)] : '?') : l, l === '_' ? 'b ta' : 'b') + K.f(f, K.t(X(p.w.length, i, 50), 70, N(l === '_' ? ABC[R(v.i)] : l), 's tg'))).join('') + K.t(316, 36, `= ${p.total}`, 'b tg', 'end') + [...ABC].map((l, i) => K.c(LX(i), LY(i, 96), 11.5, f && i === R(v.i) ? (l === p.meta ? 'fo' : 'ff') : 'fc') + K.t(LX(i), LY(i, 96) + 5, l, 's') + (i % 5 === 4 || f ? K.f(i % 5 === 4 ? 1 : f, K.t(LX(i), LY(i, 96) + 27, i + 1, 's tm')) : '')).join(''),
    lee: (v, p) => `$${[...p.w].map(l => N(l === '_' ? ABC[R(v.i)] : l)).join(' + ')} = ${suma(p, ABC[R(v.i)])}$`, aviso: (v, p) => `Con la ${ABC[v.i]} la palabra vale ${suma(p, ABC[v.i])}: ${suma(p, ABC[v.i]) > p.total ? 'se pasa' : 'le falta'}.`, bien: p => 'Al total se le quitan las letras que se conocen.',
  });
  const BIT = [16, 8, 4, 2, 1], focos = (K, b, y) => BIT.map((n, i) => K.c(50 + i * 60, y, 22, b?.[i] === '1' ? 'fG' : 'fc') + K.t(50 + i * 60, y + 6, n, b?.[i] === '1' ? 'tc' : 'tm')).join('');
  XG.marca('prende-focos', {
    sitios: () => BIT.map((_, i) => ({ x: 50 + i * 60, y: 66, w: 52, h: 60 })), cara: (K, p, i, on) => K.c(50 + i * 60, 60, 18, on ? 'fG' : 'fc') + K.t(50 + i * 60, 66, BIT[i], on ? 'tc' : 'tm') + K.t(50 + i * 60, 90, on ? '1' : '0', 's'), alto: () => 108, fondo: (K, p) => K.t(170, 22, `número: ${p.n}`, 'b ta'), nombre: (p, i) => `bombillo de ${BIT[i]}`,
    sol: p => BIT.map((b, i) => (p.n & b ? i : -1)).filter(i => i >= 0), aviso(on, p) { const s = BIT.reduce((a, b, i) => a + (on[i] ? b : 0), 0); return `Los prendidos suman ${s}: ${s > p.n ? 'se pasa' : 'le falta'}.`; }, bien: p => 'Primero el más grande que quepa, y sigue lo que falta.', texto: p => `${BIT.filter(b => p.n & b).join(' + ')} = ${p.n}`, pie: 'Toca los bombillos que van prendidos.',
  });
  XG.cuenta('lee-tablero', 92, (K, p) => focos(K, p.b, 42) + [...p.b].map((b, i) => K.t(50 + i * 60, 86, b, 'b')).join(''));
  XG.ascensor('sube-codigo', 50, 1, ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.']);

  // ------------------------------------------------------------------------------------------------ pu-cd-2 · deducir la regla
  const maq = (K, e, y) => e.map(([a, b], i) => flecha(K, y + i * 28, a, b)).join('');
  XG.marca('regla-todos', {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 116 + i * 44, w: 320, h: 38 })), cara: (K, p, i) => K.t(170, 121 + i * 44, p.casos[i].t, 's'), alto: p => 96 + p.casos.length * 44, fondo: (K, p) => maq(K, p.e, 28),
    sol: p => p.casos.map((_, i) => i).filter(i => p.e.every(([a, b]) => p.casos[i].f(a) === b)), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.e.every(([a, b]) => p.casos[k].f(a) === b)); if (i < 0) return 'Falta otra que también funciona con los tres.'; const [a, b] = p.e.find(([a, b]) => p.casos[i].f(a) !== b); return `«${p.casos[i].t}» con ${a} da ${p.casos[i].f(a)}, no ${b}.`; }, bien: () => 'Una regla sirve si funciona con todos los ejemplos.', texto: p => p.casos.filter(c => p.e.every(([a, b]) => c.f(a) === b)).map(c => c.t).join('; '), pie: 'Toca todas las reglas que sirven.',
  });
  XG.rotula('maquina-cifras', {
    slots: () => [{ x: 94, y: 138, w: 120, h: 42 }, { x: 246, y: 138, w: 120, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(': '), alto: () => 186, fondo: (K, p) => maq(K, p.e, 28) + K.t(94, 178, 'con las cifras', 's tm') + K.t(246, 178, `con ${p.ask}`, 's tm'), aviso: avisa, bien: p => p.ok,
  });
  XG.cuenta('maquina-dos-pasos', 96, (K, p) => maq(K, p.e, 28));
  const puestos = nombre => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: X(p.metas.length, i), y: 130, w: 52, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 160, fondo: (K, p) => flecha(K, 32, p.de, p.a) + K.t(170, 86, p.ask, 'b ta') + K.t(170, 62, p.rot, 's tm'), aviso: avisa, bien: p => p.ok,
  });
  puestos('puestos-cambian'); puestos('devuelve-puestos');
  XG.rotula('avances-crecen', {
    slots: p => p.metas.map((_, i) => ({ x: X(3, i % 3, 74), y: i < 3 ? 98 : 148, w: 60, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' '), alto: () => 213, fondo: (K, p) => flecha(K, 28, p.de, p.a) + [...p.ask].map((l, i) => K.t(X(3, i, 74), 68, l, 'B')).join('') + K.t(8, 103, 'avance', 's tm', 'start') + K.t(8, 153, 'letra', 's tm', 'start') + alfabeto(K, 186), aviso: avisa, bien: p => p.ok,
  });
  XG.rotula('clave-comparada', {
    slots: p => p.metas.map((_, i) => ({ x: X(p.metas.length, i, 64), y: 136, w: 54, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(''), alto: () => 168, fondo: (K, p) => p.filas.map((s, r) => [...s].map((t, i) => K.r(86 + r * 168 + (i - 1) * 46 - 20, 10, 40, 44, 'fc', 9) + K.t(86 + r * 168 + (i - 1) * 46, 38, t, 'b ta')).join('')).join('') + [...p.ask].map((l, i) => K.t(X(p.ask.length, i, 64), 96, l, 'B')).join(''), aviso: avisa, bien: p => p.ok,
  });
  XG.ascensor('sube-regla', 50, 1, ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.']);
})();
;
//#archivo js/games/graficas-escena.js
// Ejercicios de «Tablas y gráficas» (pu-gr-1 a pu-gr-3) con las escenas de la explicación: barras con eje, tortas, barras que se nivelan,
// balanza de grupos y grupos de personas. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100), neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Barras con eje desde `lo` hasta `hi`, con una línea cada `st`.
  const Y0 = 140, H = 116, YB = (x, hi, lo = 0) => Y0 - Math.max(0, x - lo) / (hi - lo) * H;
  const eje = (K, hi, st, lo = 0) => { let h = ''; for (let k = lo; k <= hi; k += st) h += K.l(60, YB(k, hi, lo), 320, YB(k, hi, lo), 'ls') + K.t(52, YB(k, hi, lo) + 4, k, 's tm', 'end'); return h; };
  const barras = (K, vals, rot, hi, lo = 0) => vals.map((x, i) => { const w = 250 / vals.length, y = YB(x, hi, lo); return K.r(66 + i * w + 10, y, w - 20, Y0 - y, ['fa', 'fg'][i % 2], 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, rot[i], 's'); }).join('');
  const frases = (nombre, pie) => { const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i].si); XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 330, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6, sol: si,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.casos[k].si); return i >= 0 ? p.casos[i].no : p.falta; }, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie,
  }); };
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };

  // ----------------------------------------------------------------------------------------------- pu-gr-1 · leer gráficas
  XG.cuenta('lee-escala', 160, (K, p) => eje(K, p.hi, p.st) + barras(K, p.vals, p.rot, p.hi));
  XG.figura('pasa-tabla', {
    ini: p => ({ a: p.st, b: p.st, c: p.st }), manijas: p => ['a', 'b', 'c'].map((k, i) => ({ k, min: 0, max: p.hi, paso: p.paso, r: 10, en: v => [66 + (i + 0.5) * 250 / 3, YB(v[k], p.hi)], de: (x, y) => (Y0 - y) / H * p.hi })), ok: (v, p) => v.a === p.vals[0] && v.b === p.vals[1] && v.c === p.vals[2], sol: p => ({ a: p.vals[0], b: p.vals[1], c: p.vals[2] }), texto: p => p.rot.map((r, i) => `${r}: ${p.vals[i]}`).join('; '), alto: () => 164, pie: 'Arrastra la punta de cada barra.',
    dib: (v, K, p, f) => eje(K, p.hi, p.st) + barras(K, [v.a, v.b, v.c], p.rot, p.hi) + K.f(f, [v.a, v.b, v.c].map((x, i) => K.t(66 + (i + 0.5) * 250 / 3, YB(x, p.hi) - 14, R(x), 's ta')).join('')),
    aviso(v, p) { const i = [v.a, v.b, v.c].findIndex((x, k) => x !== p.vals[k]), x = [v.a, v.b, v.c][i]; return `La barra de ${p.rot[i]} quedó en ${x} y debía llegar a ${p.vals[i]}: cada línea vale ${p.st}.`; }, bien: (v, p) => `Cada línea vale ${p.st}; la mitad de una línea son ${p.st / 2}.`,
  });
  // Qué tramo crece más en porcentaje.  params { v: [números] }
  const pct = (v, i) => (v[i + 1] - v[i]) / v[i];
  const mejorT = p => p.v.slice(1).map((_, i) => i).reduce((a, i) => (pct(p.v, i) > pct(p.v, a) ? i : a), 0);
  XG.marca('mayor-tramo', {
    sitios: p => p.v.slice(1).map((_, i) => ({ x: 62 + i * 108, y: 172, w: 98, h: 42 })), cara: (K, p, i) => K.t(62 + i * 108, 178, `${p.v[i]} → ${p.v[i + 1]}`), alto: () => 198, sol: p => [mejorT(p)],
    fondo: (K, p) => { const x = i => 40 + i * 260 / (p.v.length - 1), y = n => 136 - n * 2.8; return K.l(30, 136, 320, 136, 'lm') + K.pl(p.v.map((n, i) => [x(i), y(n)]), 'la gr') + p.v.map((n, i) => K.c(x(i), y(n), 5, 'fA') + K.t(x(i), y(n) - 12, n, 's')).join(''); },
    aviso(on, p) { const n = on.filter(Boolean).length, i = on.indexOf(true), u = p.v.slice(1).map((_, k) => p.v[k + 1] - p.v[k]); return n > 1 ? 'Es un solo tramo.' : u[i] === Math.max(...u) ? 'Ese sube más unidades; en porcentaje hay que dividir entre lo de antes.' : `De ${p.v[i]} a ${p.v[i + 1]} sube ${u[i]} sobre ${p.v[i]}; otro tramo sube más en porcentaje.`; }, bien: () => 'El cambio se divide entre el valor de antes.', texto: p => `${p.v[mejorT(p)]} → ${p.v[mejorT(p) + 1]}: ${N(pct(p.v, mejorT(p)) * 100)} %`, pie: 'Toca el tramo.',
  });
  XG.figura('barra-baja', {
    ini: p => ({ b: p.a }), manijas: p => [{ k: 'b', min: 10, max: p.max, paso: 2, r: 11, en: v => [235, 178 - v.b * 1.6], de: (x, y) => (178 - y) / 1.6 }], ok: (v, p) => v.b * 100 === p.a * (100 - p.pc), sol: p => ({ b: p.a * (100 - p.pc) / 100 }), texto: p => `${p.a} − ${p.a * p.pc / 100} = ${p.a * (100 - p.pc) / 100}`, alto: () => 208, pie: 'Arrastra la punta de la barra de ahora.',
    dib: (v, K, p, f) => K.l(40, 178, 300, 178, 'lm') + K.r(70, 178 - p.a * 1.6, 70, p.a * 1.6, 'fa') + K.r(200, 178 - v.b * 1.6, 70, v.b * 1.6, 'fg') + K.l(70, 178 - p.a * 1.6, 290, 178 - p.a * 1.6, 'lm d') + K.t(105, 198, `antes ${p.a}`, 's') + K.t(235, 198, `ahora ${R(v.b)}`, 's') + K.f(f, K.t(170, 20, `${N((v.b - p.a) / p.a * 100)} %`, 'tf')),
    lee: (v, p) => `$\\tfrac{${N(v.b)} - ${p.a}}{${p.a}} = ${N((v.b - p.a) / p.a * 100)}\\,\\%$`, aviso: (v, p) => (v.b === p.a - p.pc ? `Quitaste ${p.pc} unidades; había que quitar el ${p.pc} % de ${p.a}.` : v.b === p.a * p.pc / 100 ? 'Eso es lo que bajó; la barra muestra lo que quedó.' : v.b > p.a ? 'Así sube en vez de bajar.' : v.b * 100 > p.a * (100 - p.pc) ? 'Bajó menos de lo que se pide.' : 'Bajó más de lo que se pide.'), bien: (v, p) => `El ${p.pc} % de ${p.a} es ${p.a * p.pc / 100}.`,
  });
  XG.cuenta('ida-vuelta-porciento', 128, (K, p) => K.r(46, 106 - p.a * 1.6, 40, p.a * 1.6, 'fa', 3) + K.r(120, 106 - p.b * 1.6, 40, p.b * 1.6, 'fg', 3) + K.r(206, 106 - p.b * 1.6, 40, p.b * 1.6, 'fg', 3) + K.r(280, 106 - p.a * 1.6, 40, p.a * 1.6, 'fa', 3) + K.l(30, 106, 330, 106, 'lm') + [[66, p.a], [140, p.b], [226, p.b], [300, p.a]].map(([x, n]) => K.t(x, 123, n, 's')).join('') + K.ar(90, 94, 116, 94, 'lg') + K.ar(250, 94, 276, 94, 'lg'));
  const torta = (K, g, r = '', t = '', q = 84) => K.c(150, q + 20, q, 'fc') + (g > 0 ? K.sec(150, q + 20, q, 90 - g, 90, 'fa') : '') + (r ? K.t(...K.at(150, q + 22, q * 0.6, 90 - g / 2), r, 's') : '') + K.t(250, 34, t, 's tm', 'start');
  XG.figura('abre-sector', {
    ini: () => ({ g: 18 }), manijas: () => [{ k: 'g', min: 9, max: 342, paso: 9, r: 10, en: v => XPK.at(150, 104, 84, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(104 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 9) : g; } }], ok: (v, p) => v.g * p.total === p.parte * 360, sol: p => ({ g: p.parte * 360 / p.total }), texto: p => `$${N(p.parte * 100 / p.total)}\\,\\%$, $${p.parte * 360 / p.total}^\\circ$`, alto: () => 208, pie: 'Arrastra el borde del sector.',
    dib: (v, K, p, f) => torta(K, v.g, '', `${R(v.g)}°`) + K.f(f, K.t(250, 66, `${N(v.g / 3.6)} %`, 'ta', 'start') + K.t(250, 98, `${N(v.g / 360 * p.total)} de`, 's tm', 'start') + K.t(250, 118, `${p.total}`, 's tm', 'start')),
    lee: (v, p) => `$${N(v.g / 3.6)}\\,\\% \\text{ de } ${p.total} = ${N(v.g / 360 * p.total)}$`, aviso: (v, p) => (v.g === p.parte ? 'No es un grado por persona: la vuelta completa, 360°, son todos.' : v.g === p.parte * 100 / p.total ? `Ese es el porcentaje; en grados, cada 1 % son 3.6°.` : `Así el sector muestra ${N(v.g / 360 * p.total)} personas.`), bien: p => 'El sector es la misma fracción de la vuelta que la parte es del total.',
  });
  XG.cuenta('sector-cantidad', 164, (K, p) => torta(K, p.g, `${p.g}°`, `${p.total} en total`, 64));
  XG.ascensor('sube-grafica', 100, 5, neutro);

  // --------------------------------------------------------------------------------------- pu-gr-2 · promedio, mediana y moda
  const U = 11, prom = d => d.reduce((a, b) => a + b, 0) / d.length;
  const nivel = (K, d, t) => { const w = 230 / d.length, m = prom(d); return K.l(40, 178, 300, 178, 'lm') + d.map((x, i) => { const y = x + (m - x) * t; return K.r(50 + i * w + 5, 178 - y * U, w - 10, y * U, 'fa', 3) + K.t(50 + (i + 0.5) * w, 196, x, 's'); }).join(''); };
  XG.figura('nivela-linea', {
    ini: p => ({ y: Math.max(...p.d) }), manijas: () => [{ k: 'y', min: 0, max: 14, paso: 0.5, r: 16, rot: v => N(v.y), en: v => [312, 178 - v.y * U], de: (x, y) => (178 - y) / U }], ok: (v, p) => v.y === prom(p.d), sol: p => ({ y: prom(p.d) }), texto: p => `$${p.d.reduce((a, b) => a + b, 0)} \\div ${p.d.length} = ${N(prom(p.d))}$`, alto: () => 206, pie: 'Arrastra la línea hasta el promedio.',
    dib: (v, K, p, f) => nivel(K, p.d, f) + K.l(44, 178 - v.y * U, 296, 178 - v.y * U, 'lg d'), lee: (v, p) => `$\\tfrac{${p.d.join(' + ')}}{${p.d.length}} = ${N(prom(p.d))}$`, aviso: (v, p) => (v.y === [...p.d].sort((a, b) => a - b)[(p.d.length - 1) / 2] ? 'Ese es el dato del medio: al repartir por igual queda otro nivel.' : v.y > prom(p.d) ? 'La línea quedó alta: no alcanza para llenar hasta ahí.' : 'La línea quedó baja: sobraría.'), bien: () => 'Lo que sobra en unas llena lo que falta en otras.',
  });
  XG.figura('dato-para-promedio', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 0, max: 14, paso: 1, r: 10, en: v => [50 + (p.d.length + 0.5) * 230 / (p.d.length + 1), 178 - v.x * U], de: (x, y) => (178 - y) / U }], ok: (v, p) => v.x === p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0), sol: p => ({ x: p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0) }), texto: p => `$${p.m * (p.d.length + 1)} - ${p.d.reduce((a, b) => a + b, 0)} = ${p.m * (p.d.length + 1) - p.d.reduce((a, b) => a + b, 0)}$`, alto: () => 206, pie: 'Sube o baja la última barra.',
    dib: (v, K, p, f) => nivel(K, [...p.d, v.x].map(x => R(x * 10) / 10), f) + K.l(44, 178 - p.m * U, 296, 178 - p.m * U, 'lg d') + K.t(302, 183 - p.m * U, p.m, 'tg', 'start'), lee: (v, p) => `$\\tfrac{${p.d.join(' + ')} + ${N(v.x)}}{${p.d.length + 1}} = ${N(prom([...p.d, v.x]))}$`, aviso: (v, p) => (v.x === p.m ? 'Con el mismo promedio no alcanza: los otros tienen que quedar compensados.' : `Así el promedio es ${N(prom([...p.d, v.x]))}.`), bien: (v, p) => `Los ${p.d.length + 1} datos deben sumar ${p.m * (p.d.length + 1)}.`,
  });
  XG.rotula('ordena-centro', {
    slots: p => p.metas.map((_, i) => (i < p.d.length ? { x: R(170 + (i - (p.d.length - 1) / 2) * 47), y: 76, w: 42, h: 40 } : { x: 170, y: 138, w: 64, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => `${p.metas.slice(0, -1).join(', ')}: mediana ${p.metas.at(-1)}`, alto: () => 182, fondo: (K, p) => K.t(170, 34, p.d.join(' · '), 'b ta') + K.t(170, 176, 'mediana', 's tm'), aviso: avisa, bien: p => p.ok,
  });
  XG.cuenta('centros-par', 60, (K, p) => K.t(170, 38, p.d.join(' · '), 'b ta'));
  const fichas = (nombre, d) => { const si = p => p.fichas.map((_, i) => i).filter(i => d.vale(p.fichas[i], p)); XG.marca(nombre, {
    sitios: p => p.fichas.map((_, i) => ({ x: (p.cols === 2 ? [92, 248] : [62, 170, 278])[i % p.cols], y: d.y + Math.floor(i / p.cols) * 56, w: p.cols === 2 ? 148 : 100, h: 46 })), cara: (K, p, i) => K.t((p.cols === 2 ? [92, 248] : [62, 170, 278])[i % p.cols], d.y + 6 + Math.floor(i / p.cols) * 56, p.fichas[i]), alto: p => d.y + Math.ceil(p.fichas.length / p.cols) * 56 - 26, fondo: d.fondo, sol: si, aviso: d.aviso, bien: d.bien, texto: p => si(p).map(i => p.fichas[i]).join(', '), pie: d.pie,
  }); };
  const CEN = { promedio: prom, suma: d => d.reduce((a, b) => a + b, 0), mediana: d => [...d].sort((a, b) => a - b)[(d.length - 1) / 2], moda: d => [...d].sort((a, b) => d.filter(x => x === b).length - d.filter(x => x === a).length || a - b)[0] };
  const cambia = (t, p) => CEN[t](p.d) !== CEN[t](p.e);
  fichas('dato-exagerado', { y: 106, vale: cambia, pie: 'Toca todos los que cambian.', fondo: (K, p) => K.t(170, 28, p.d.join(' · '), 'b') + K.ar(170, 36, 170, 54, 'lm') + K.t(170, 74, p.e.join(' · '), 'b ta'), aviso(on, p) { const i = on.findIndex((x, k) => x && !cambia(p.fichas[k], p)); return i >= 0 ? `La ${p.fichas[i]} sigue igual: era ${CEN[p.fichas[i]](p.d)} y es ${CEN[p.fichas[i]](p.e)}.` : 'Falta otro que también cambia.'; }, bien: () => 'Un dato exagerado jala el promedio, no el del medio.' });
  const peso = p => p.g.reduce((a, [n, x]) => a + n * x, 0) / p.g.reduce((a, [n]) => a + n, 0);
  XG.figura('apoyo-grupos', {
    ini: () => ({ x: 5 }), manijas: () => [{ k: 'x', min: 0, max: 10, paso: 0.5, r: 11, en: v => [30 + v.x * 28, 182], de: x => (x - 30) / 28 }], ok: (v, p) => v.x === peso(p), sol: p => ({ x: peso(p) }), texto: p => `${N(peso(p))}`, alto: () => 208, pie: 'Arrastra el apoyo.',
    dib(v, K, p, f) { const X = x => 30 + x * 28, y = 140, g = Math.max(-9, Math.min(9, (peso(p) - v.x) * 4)) * f; let h = ''; for (let k = 0; k <= 10; k++) h += K.l(X(k), y, X(k), y + 5, 'lm') + K.t(X(k), y + 20, k, 's tm'); h += K.l(X(0), y, X(10), y, 'gr'); p.g.forEach(([n, x], j) => { for (let i = 0; i < n; i++) h += K.c(X(x), y - 10 - i * 17, 8, j ? 'fG' : 'fA'); }); return `<g transform="rotate(${N(g)} ${N(X(v.x))} ${y})">${h}</g>` + K.p([[X(v.x), y + 26], [X(v.x) - 14, y + 48], [X(v.x) + 14, y + 48]], 'fF'); },
    lee: (v, p) => `$\\tfrac{${p.g.map(([n, x]) => `${n} \\cdot ${x}`).join(' + ')}}{${p.g.reduce((a, [n]) => a + n, 0)}} = ${N(peso(p))}$`, aviso: (v, p) => (v.x === prom(p.g.map(([, x]) => x)) ? 'Ese es el centro de los dos valores, como si los grupos fueran iguales.' : v.x < peso(p) ? 'La tabla se inclina a la derecha.' : 'La tabla se inclina a la izquierda.'), bien: () => 'El grupo grande jala más.',
  });
  XG.cuenta('meses-mas', 60, (K, p) => Array.from({ length: p.n + p.mas }, (_, i) => K.c(170 + (i - (p.n + p.mas - 1) / 2) * 36, 30, 13, i < p.n ? 'fa' : 'fg')).join(''));
  XG.ascensor('sube-centro', 30, 1, neutro);

  // ------------------------------------------------------------------------------------------- pu-gr-3 · qué se puede concluir
  XG.figura('sube-piso', {
    ini: () => ({ f: 0 }), manijas: p => [{ k: 'f', min: 0, max: p.a - 2, paso: 1, et: 'el eje empieza en' }], ok: (v, p) => (p.b - v.f) === p.veces * (p.a - v.f), sol: p => ({ f: (p.veces * p.a - p.b) / (p.veces - 1) }), texto: p => `el eje empieza en ${(p.veces * p.a - p.b) / (p.veces - 1)}`, alto: () => 254, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => { const lo = v.f * f, Y = x => 170 - Math.max(0, (x - lo) / (p.b - lo)) * 130; return K.l(60, 170, 310, 170, 'lm') + K.t(52, 174, R(lo), 's tm', 'end') + K.r(90, Y(p.a), 70, 170 - Y(p.a), 'fa') + K.r(210, Y(p.b), 70, 170 - Y(p.b), 'fg') + K.t(125, 188, `A: ${p.a}`, 's') + K.t(245, 188, `B: ${p.b}`, 's'); },
    lee: (v, p) => `$\\tfrac{${p.b} - ${N(v.f)}}{${p.a} - ${N(v.f)}} = ${N((p.b - v.f) / (p.a - v.f))}$`, aviso: (v, p) => `Con el piso en ${v.f}, las barras miden ${p.a - v.f} y ${p.b - v.f}: B se ve ${N((p.b - v.f) / (p.a - v.f))} veces tan alta como A.`, bien: (v, p) => `Miden ${p.a - v.f} y ${p.b - v.f}, aunque los datos son ${p.a} y ${p.b}.`,
  });
  XG.cuenta('diferencia-real', 160, (K, p) => eje(K, p.hi, p.st, p.lo) + barras(K, p.vals, p.rot, p.hi, p.lo));
  const par = t => t.split(' de ').map(Number);
  fichas('pasan-porciento', { y: 30, vale: (t, p) => par(t)[0] * 100 >= p.min * par(t)[1], pie: 'Toca todos los que cumplen.', aviso(on, p) { const i = on.findIndex((x, k) => x && par(p.fichas[k])[0] * 100 < p.min * par(p.fichas[k])[1]); return i >= 0 ? `${p.fichas[i]} es el ${N(R(par(p.fichas[i])[0] / par(p.fichas[i])[1] * 1000) / 10)} %.` : 'Falta un grupo: divide cada cantidad entre su total.'; }, bien: () => 'La proporción no depende de cuántos sean, sino de cuántos de cada cien.' });
  const gente = (K, x, n, k, cls) => Array.from({ length: n }, (_, i) => K.c(x + (i % 8) * 17, 46 + Math.floor(i / 8) * 17, 6.5, i < k ? cls : 'fc')).join('');
  XG.figura('misma-proporcion', {
    ini: () => ({ k: 1 }), manijas: p => [{ k: 'k', min: 0, max: p.tb, paso: 1, et: 'en el grupo B' }], ok: (v, p) => v.k * p.ta === p.ka * p.tb, sol: p => ({ k: p.ka * p.tb / p.ta }), texto: p => `${p.ka * p.tb / p.ta} de ${p.tb}`, alto: () => 208, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => K.t(86, 24, `A: ${p.ka} de ${p.ta}`, 's ta') + K.t(254, 24, `B: ${R(v.k)} de ${p.tb}`, 's tg') + gente(K, 26, p.ta, p.ka, 'fA') + gente(K, 194, p.tb, R(v.k), 'fG') + K.f(f, K.t(86, 144, `${N(p.ka / p.ta * 100)} %`, 'b ta') + K.t(254, 144, `${N(v.k / p.tb * 100)} %`, 'b tg')),
    lee: (v, p) => `$\\tfrac{${p.ka}}{${p.ta}} = ${N(p.ka / p.ta * 100)}\\,\\% \\qquad \\tfrac{${R(v.k)}}{${p.tb}} = ${N(v.k / p.tb * 100)}\\,\\%$`, aviso: (v, p) => (v.k === p.ka ? 'Es la misma cantidad, pero el grupo B es más grande.' : v.k === p.ka + p.tb - p.ta ? 'Sumaste la diferencia entre los grupos; la proporción se multiplica.' : v.k * p.ta > p.ka * p.tb ? 'En B la proporción quedó mayor.' : 'En B la proporción quedó menor.'), bien: (v, p) => `Los dos son el ${N(p.ka / p.ta * 100)} %.`,
  });
  XG.cuenta('muestra-parecida', 90, (K, p) => { const T = p.tot.reduce((a, b) => a + b, 0); let x = 20; return p.tot.map((n, i) => { const w = n / T * 300, h = K.r(x, 24, w, 40, ['fa', 'fg', 'ff'][i], 4) + K.t(x + w / 2, 50, n) + K.t(x + w / 2, 80, p.et[i], 's tm'); x += w; return h; }).join('') + K.t(170, 14, `${T} en total`, 's tm'); });
  frases('muestras-sirven', 'Toca todas las que sirven.'); frases('se-concluye', 'Toca todo lo que se concluye.');
  XG.ascensor('sube-dato-real', 100, 5, neutro);
})();
;
//#archivo js/games/proposiciones-escena.js
// Ejercicios de «Lógica proposicional» (pu-lo-1 a pu-lo-5) con las escenas de la explicación: interruptores, tablas de V y F, círculos y
// personas que mienten. Armazones en figura-kit.js, logica-kit.js y conteo-escena.js (XG.cuenta, XG.ascensor).
(() => {
  const VF = b => (b ? 'V' : 'F'), idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a mirar.', 'Le faltó. Vuelve a mirar.'];
  // Tabla de verdad: se tocan las filas en las que la frase es V.  params { cols: [títulos], f(p, q), pie? }
  const FIL = [[1, 1], [1, 0], [0, 1], [0, 0]], YF = i => 62 + i * 44;
  const tablaV = nombre => XG.marca(nombre, {
    sitios: () => FIL.map((_, i) => ({ x: 248, y: YF(i), w: 96, h: 38 })), cara: (K, p, i, on) => K.t(248, YF(i) + 6, VF(on), on ? 'b ta' : 'tm'), alto: () => 222, nombre: (p, i) => `fila ${i + 1}`,
    fondo: (K, p) => K.t(58, 26, 'p', 'b') + K.t(128, 26, 'q', 'b') + K.t(248, 26, p.frase, 'b ta') + K.l(20, 38, 320, 38, 'lm') + FIL.map(([a, b], i) => K.t(58, YF(i) + 6, VF(a)) + K.t(128, YF(i) + 6, VF(b))).join(''),
    sol: p => idx(4, i => p.f(!!FIL[i][0], !!FIL[i][1])), aviso(on, p) { const i = FIL.findIndex(([a, b], k) => on[k] !== !!p.f(!!a, !!b)), [a, b] = FIL[i]; return `Con p ${VF(a)} y q ${VF(b)} la frase es ${VF(p.f(!!a, !!b))}: ${p.regla}`; }, bien: p => p.ok, texto: p => FIL.map(([a, b]) => VF(p.f(!!a, !!b))).join(', '), pie: 'Toca las casillas que valen V. Las demás quedan en F.',
  });
  // Casillas con su rótulo, en renglones.  params { et, metas, fichas, mira, trampas?, ok }
  const renglones = (nombre, d = {}) => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: d.x ?? 250, y: (d.y0 ?? 30) + i * 48, w: d.w ?? 124, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: p => (d.y0 ?? 30) + p.metas.length * 48 - 18,
    fondo: (K, p) => (d.fondo?.(K, p) || '') + p.et.map((t, i) => K.t((d.x ?? 250) - (d.w ?? 124) / 2 - 12, (d.y0 ?? 30) + i * 48 + 5, t, t.length > 20 ? 's' : '', 'end')).join(''), aviso: avisa, bien: p => p.ok,
  });
  const frases = nombre => { const si = p => idx(p.casos.length, i => p.casos[i].si), y0 = p => (p.da ? 24 + p.da.length * 24 : 8); XG.marca(nombre, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: y0(p) + 20 + i * 44, w: 330, h: 38 })), cara: (K, p, i) => K.t(170, y0(p) + 25 + i * 44, p.casos[i].t, 's'), alto: p => y0(p) + p.casos.length * 44 + 2, fondo: (K, p) => (p.da || []).map((t, i) => K.t(170, 20 + i * 24, t, 'ta')).join(''), sol: si,
    aviso(on, p) { const i = on.findIndex((x, k) => x && !p.casos[k].si); return i >= 0 ? p.casos[i].no : p.falta; }, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie: 'Toca todas las que cumplen.',
  }); };
  // Negación en tres pedazos (en el mismo orden de la frase).
  const negacion = nombre => XG.rotula(nombre, {
    slots: () => [{ x: 170, y: 58, w: 190, h: 38 }, { x: 170, y: 102, w: 190, h: 38 }, { x: 170, y: 146, w: 190, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' '), alto: () => 170, fondo: (K, p) => K.t(170, 24, p.frase, 'ta'), aviso: avisa, bien: p => p.ok,
  });

  // ------------------------------------------------------------------------------------ pu-lo-1 · conectivos y tablas de verdad
  const LL = [[120, 46], [120, 126], [226, 86]];
  XG.marca('prende-circuito', {
    sitios: () => LL.map(([x, y]) => ({ x, y, w: 68, h: 56 })), alto: () => 170, nombre: (p, i) => `llave ${'pqr'[i]}`,
    cara: (K, p, i, on) => { const [x, y] = LL[i]; return K.c(x - 24, y, 4, 'fk') + K.c(x + 24, y, 4, 'fk') + K.l(x - 24, y, x + (on ? 24 : 18), y - (on ? 0 : 18), on ? 'la gr' : 'gr') + K.t(x, y + 20, 'pqr'[i], 's'); },
    fondo: K => K.l(10, 86, 60, 86) + K.pl([[96, 46], [60, 46], [60, 126], [96, 126]]) + K.pl([[144, 46], [178, 46], [178, 126], [144, 126]]) + K.l(178, 86, 202, 86) + K.l(250, 86, 284, 86) + K.c(304, 86, 20, 'fc') + K.t(304, 92, '?', 'tm'),
    sol: p => p.sol, aviso(on, p) { const l = (on[0] || on[1]) && on[2]; return on[p.abierta] ? `La llave ${'pqr'[p.abierta]} tenía que quedar abierta.` : l ? 'Prende, pero cerraste una llave de más.' : !on[2] ? 'Se corta en r: está en serie con todo lo demás.' : 'No llega corriente por ninguno de los dos caminos.'; }, bien: () => '(p o q) y r: un camino de la izquierda y además r.', texto: p => p.sol.map(i => 'pqr'[i]).join(' y '), pie: 'Toca una llave para cerrarla.',
  });
  XG.rotula('valor-frases', {
    slots: p => p.et.map((_, i) => ({ x: 170 + (i - (p.et.length - 1) / 2) * 64, y: 92, w: 56, h: 42 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: () => 124, fondo: (K, p) => K.t(170, 28, p.da, 'b ta') + p.et.map((t, i) => K.t(170 + (i - (p.et.length - 1) / 2) * 64, 62, t)).join(''), aviso: avisa, bien: p => p.ok,
  });
  tablaV('tabla-disyuncion'); frases('promesa-sigue');
  XG.cuenta('cuenta-filas', 70, (K, p) => K.t(170, 42, p.frase, 'B ta'));
  XG.rotula('nombra-columna', {
    slots: p => p.cols.map((_, i) => ({ x: 152 + i * 74, y: 206, w: 70, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 234, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(34, 26, 'p', 'b') + K.t(80, 26, 'q', 'b') + K.l(14, 38, 330, 38, 'lm') + FIL.map(([a, b], i) => K.t(34, 66 + i * 34, VF(a)) + K.t(80, 66 + i * 34, VF(b)) + p.cols.map((c, j) => K.t(152 + j * 74, 66 + i * 34, c[i], c[i] === 'V' ? 'ta' : 'tm')).join('')).join('') + p.cols.map((_, j) => K.t(152 + j * 74, 26, '?', 'tm')).join(''),
  });
  renglones('frase-larga', { w: 56, x: 280 });
  XG.ascensor('sube-filas', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------- pu-lo-2 · negación y De Morgan
  negacion('niega-y'); negacion('niega-mezclada'); negacion('niega-cartel');
  tablaV('tabla-negada'); frases('casos-tumban'); renglones('parejas-negacion', { w: 148, x: 254 });
  const ZV = [[96, 92, 'solo p'], [170, 92, 'p y q'], [244, 92, 'solo q'], [300, 162, 'ninguna']];
  const venn = (K, a, b) => K.r(8, 8, 324, 176, 'fn', 8) + K.c(133, 92, 68, 'fa') + K.c(207, 92, 68, 'fg') + K.t(62, 36, a, 's ta') + K.t(278, 36, b, 's tg');
  const zonas = (nombre, pie) => XG.marca(nombre, {
    sitios: () => ZV.map(([x, y]) => ({ x, y, w: 44, h: 40 })), cara: (K, p, i, on) => K.t(ZV[i][0], ZV[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 194, nombre: (p, i) => ZV[i][2], fondo: (K, p) => venn(K, p.a, p.b),
    sol: p => p.zonas, aviso(on, p) { const i = on.findIndex((x, k) => x !== p.zonas.includes(k)); return p.mira[i]; }, bien: p => p.ok, texto: p => p.zonas.map(i => ZV[i][2].replace('p', p.a).replace('q', p.b)).join('; '), pie,
  });
  zonas('pinta-negacion', 'Toca las zonas.');
  XG.ascensor('sube-niega', 20, 1, neutro);

  // -------------------------------------------------------------------------------------------------- pu-lo-3 · el condicional
  const Z3 = [[152, 116, 0], [226, 96, 1], [304, 170, 2]];
  XG.marca('zonas-posibles', {
    sitios: () => Z3.map(([x, y]) => ({ x, y, w: 46, h: 40 })), cara: (K, p, i, on) => K.t(Z3[i][0], Z3[i][1] + 6, on ? '✓' : '', 'b ta'), alto: () => 206, nombre: (p, i) => [p.p, `${p.q} sin ser ${p.p}`, `fuera de ${p.q}`][i],
    fondo: (K, p) => K.c(170, 104, 94, 'fg') + K.c(152, 116, 48, 'fa') + K.t(170, 34, p.q, 'tg') + K.t(152, 86, p.p, 's ta'), sol: p => p.zonas, aviso(on, p) { return p.mira[on.findIndex((x, k) => x !== p.zonas.includes(k))]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las zonas posibles.',
  });
  const siE = (K, p) => K.t(170, 24, p.frase, 'ta') + K.t(46, 74, 'si', 's tm') + K.t(46, 130, 'entonces', 's tm');
  XG.rotula('voltea-niega', { slots: () => [{ x: 200, y: 69, w: 190, h: 42 }, { x: 200, y: 125, w: 190, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => `si ${p.metas[0]}, entonces ${p.metas[1]}`, alto: () => 154, fondo: siE, aviso: avisa, bien: p => p.ok });
  frases('mismo-condicional'); renglones('basta-falta', { w: 112, x: 274 });
  XG.marca('revisa-regla', {
    sitios: p => p.cartas.map((_, i) => ({ x: 88 + (i % 2) * 164, y: 40 + Math.floor(i / 2) * 76, w: 148, h: 62 })), cara: (K, p, i) => K.t(88 + (i % 2) * 164, 46 + Math.floor(i / 2) * 76, p.cartas[i].t, 's'), alto: p => 8 + Math.ceil(p.cartas.length / 2) * 76, sol: p => idx(p.cartas.length, i => p.cartas[i].si), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.cartas[k].si); return i >= 0 ? p.cartas[i].no : p.falta; }, bien: p => p.ok, texto: p => p.cartas.filter(c => c.si).map(c => c.t).join(' y '), pie: 'Toca a las que hay que revisar.',
  });
  renglones('deduce-seguro', { w: 112, x: 268 }); renglones('cadena-si', { w: 124, x: 254, y0: 100, fondo: (K, p) => p.da.map((t, i) => K.t(170, 22 + i * 24, t, i < 2 ? '' : 'ta')).join('') });
  XG.ascensor('sube-regla-si', 20, 1, neutro);

  // ------------------------------------------------------------------------------------ pu-lo-4 · cuantificadores y silogismos
  const rel = (v, r, x, y, s) => { const d = Math.hypot(v.x - x, v.y - y); return d <= s - r ? 'dentro' : d >= s + r ? 'fuera' : 'cruza'; };
  const eB = v => rel(v, 36, 130, 112, 88), eA = v => rel(v, 36, 108, 126, 40);
  XG.figura('dibujo-contra', {
    ini: () => ({ x: 290, y: 60 }), manijas: () => [{ k: ['x', 'y'], min: [40, 46], max: [300, 176], paso: 2, inv: [0, 1], r: 10, en: v => [v.x, v.y], de: (x, y) => [x, y] }], ok: v => eB(v) !== 'fuera' && eA(v) === 'fuera', sol: () => ({ x: 206, y: 76 }), texto: p => `${p.c} toca a ${p.b} sin tocar a ${p.a}`, alto: () => 216, pie: 'Arrastra el círculo rojo.',
    dib: (v, K, p) => K.c(130, 112, 88, 'fg') + K.c(108, 126, 40, 'fa') + K.c(v.x, v.y, 36, 'ff') + K.t(130, 44, p.b, 's tg') + K.t(108, 131, p.a, 's ta') + K.t(v.x, v.y + 24, p.c, 's tf'), aviso: (v, p) => (eB(v) === 'fuera' ? `Así ningún ${p.b1} sería ${p.c1}: no se cumple la segunda frase.` : `Así el círculo de ${p.c} alcanza a los ${p.a}: el dibujo no muestra la duda.`), bien: () => 'Las dos frases se cumplen y la conclusión no: no es segura.',
  });
  XG.rotula('frase-dibujo', {
    slots: () => [0, 1, 2].map(i => ({ x: 252, y: 28 + i * 52, w: 130, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 160, aviso: avisa, bien: p => p.ok,
    fondo: K => K.c(90, 28, 25, 'fg') + K.c(82, 33, 13, 'fa') + K.t(82, 37, 'A', 's') + K.t(102, 24, 'B', 's') + K.c(76, 80, 22, 'fa') + K.c(104, 80, 24, 'fg') + K.t(66, 85, 'A', 's') + K.t(116, 85, 'B', 's') + K.c(89, 80, 3.5, 'fF') + K.c(62, 132, 18, 'fa') + K.c(112, 132, 24, 'fg') + K.t(62, 137, 'A', 's') + K.t(112, 137, 'B', 's'),
  });
  frases('se-voltea'); zonas('donde-alguien', 'Toca las zonas donde seguro hay alguien.'); frases('seguro-tres');
  XG.rotula('cadena-todos', {
    slots: () => [{ x: 130, y: 150, w: 78, h: 34 }, { x: 130, y: 84, w: 78, h: 34 }, { x: 130, y: 28, w: 78, h: 34 }, { x: 286, y: 92, w: 78, h: 34 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 214, fondo: K => K.c(130, 106, 100, 'fg') + K.c(130, 126, 74, 'fa') + K.c(130, 148, 46, 'ff') + K.c(286, 92, 50, 'fc'), aviso: avisa, bien: p => p.ok,
  });
  XG.marca('tumba-todos', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, p.nums[i], 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60, sol: p => idx(p.nums.length, i => p.nums[i] % p.a === 0 && p.nums[i] % p.b !== 0), aviso(on, p) { const i = on.findIndex((x, k) => x && (p.nums[k] % p.a || p.nums[k] % p.b === 0)); return i < 0 ? 'Falta otro que también la tumba.' : p.nums[i] % p.a ? `El ${p.nums[i]} no es múltiplo de ${p.a}: la frase no habla de él.` : `El ${p.nums[i]} es múltiplo de los dos: cumple la frase.`; }, bien: p => `Múltiplos de ${p.a} que no lo son de ${p.b}.`, texto: p => p.nums.filter(n => n % p.a === 0 && n % p.b).join(', '), pie: 'Toca todos los que tumban la frase.',
  });
  XG.ascensor('sube-circulos', 30, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-lo-5 · verdad y mentira
  const combos = n => Array.from({ length: 2 ** n }, (_, m) => Array.from({ length: n }, (_, i) => !!(m >> i & 1)));
  const YG = i => 30 + i * 48, gente = (K, p, i, on) => K.c(30, YG(i), 16, ['fa', 'fg', 'ff', 'fc'][i % 4]) + K.t(30, YG(i) + 5, p.gente[i].n[0], 's') + K.t(184, YG(i) + 5, `${p.gente[i].n}: «${p.gente[i].d}»`, 's');
  const filaG = p => p.gente.map((_, i) => ({ x: 170, y: YG(i), w: 332, h: 42 }));
  // Quiénes mienten: cada frase f(v) recibe quién dice la verdad.
  const reparto = p => combos(p.gente.length).filter(v => p.gente.every((g, i) => g.f(v) === v[i]));
  const mienten = nombre => XG.marca(nombre, {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: p => idx(p.gente.length, i => !reparto(p)[0][i]),
    aviso(on, p) { const v = on.map(x => !x), i = p.gente.findIndex((g, k) => g.f(v) !== v[k]); return v[i] ? `Con lo que marcaste, choca: si ${p.gente[i].n} dice la verdad, su frase debería cumplirse, y no se cumple.` : `Con lo que marcaste, choca: ${p.gente[i].n} mentiría, pero su frase se cumple.`; }, bien: p => p.ok, texto: p => `mienten ${idx(p.gente.length, i => !reparto(p)[0][i]).map(i => p.gente[i].n).join(', ')}`, pie: 'Toca a los que mienten.',
  });
  mienten('quien-miente-tres'); mienten('cadena-acusan');
  // Quién fue: cada frase f(c) según el culpable c; se cumple con p.v verdades.
  const culpables = p => idx(p.gente.length, c => p.gente.filter(g => g.f(c)).length === p.v);
  const culpable = nombre => XG.marca(nombre, {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: culpables,
    aviso(on, p) { if (on.filter(Boolean).length > 1) return `Es ${p.que}.`; const c = on.indexOf(true), k = p.gente.filter(g => g.f(c)).length; return `Con ${p.gente[c].n} habría ${k === 1 ? 'una verdad' : `${k} verdades`}, y debe haber ${p.v === 1 ? 'solo una' : p.v}.`; }, bien: p => p.ok, texto: p => p.gente[culpables(p)[0]].n, pie: 'Toca tu respuesta.',
  });
  culpable('tres-cofres'); culpable('culpable-una-verdad');
  XG.marca('tabla-sospechosos', {
    sitios: p => p.gente.flatMap((_, r) => [...p.gente.map((_, c) => ({ x: 148 + c * 62, y: 116 + r * 48, w: 54, h: 40 })), { x: 54, y: 116 + r * 48, w: 100, h: 40 }]), alto: () => 240, nombre: (p, i) => { const n = p.gente.length + 1, r = Math.floor(i / n), c = i % n; return c === n - 1 ? `fue ${p.gente[r].n}` : `si fue ${p.gente[r].n}, frase de ${p.gente[c].n}`; },
    cara(K, p, i, on) { const n = p.gente.length + 1, r = Math.floor(i / n), c = i % n; return c === n - 1 ? K.t(54, 121 + r * 48, `fue ${p.gente[r].n}`, on ? 's ta' : 's') : K.t(148 + c * 62, 122 + r * 48, VF(on), on ? 'b ta' : 'tm'); },
    fondo: (K, p) => p.gente.map((g, c) => K.t(148 + c * 62, 84, g.n, 's')).join('') + p.gente.map((g, i) => K.t(170, 18 + i * 20, `${g.n}: «${g.d}»`, 's tm')).join(''),
    sol: p => p.gente.flatMap((_, r) => [...p.gente.map((g, c) => (g.f(r) ? r * (p.gente.length + 1) + c : -1)), culpables(p).includes(r) ? r * (p.gente.length + 1) + p.gente.length : -1]).filter(i => i >= 0),
    aviso(on, p) { const n = p.gente.length + 1; for (let r = 0; r < p.gente.length; r++) for (let c = 0; c < n - 1; c++) if (on[r * n + c] !== p.gente[c].f(r)) return `Si fue ${p.gente[r].n}, la frase de ${p.gente[c].n} es ${VF(p.gente[c].f(r))}.`; return 'Las V y las F están bien; mira a la izquierda: en una sola fila falla una sola frase.'; }, bien: p => p.ok, texto: p => `fue ${p.gente[culpables(p)[0]].n}`, pie: 'Toca las casillas que valen V y, a la izquierda, quién fue.',
  });
  XG.marca('frases-opuestas', {
    sitios: filaG, cara: gente, alto: p => 12 + p.gente.length * 48, sol: p => p.par, aviso(on, p) { const l = idx(on.length, i => on[i]); if (l.length !== 2) return 'Son dos frases.'; const t = idx(p.gente.length, c => p.gente[l[0]].f(c) && p.gente[l[1]].f(c)), n = idx(p.gente.length, c => !p.gente[l[0]].f(c) && !p.gente[l[1]].f(c)); return t.length ? `Las dos serían verdad si fue ${p.gente[t[0]].n}.` : `Las dos serían falsas si fue ${p.gente[n[0]].n}.`; }, bien: p => p.ok, texto: p => p.par.map(i => p.gente[i].n).join(' y '), pie: 'Toca las dos frases que se contradicen.',
  });
  renglones('supone-choca', { w: 148, x: 256, y0: 68, fondo: (K, p) => K.t(170, 26, p.da, 'ta') });
  XG.ascensor('sube-mentira', 15, 1, neutro);
  Object.assign(XG, { renglones, frases });   // los usan otros mundos
})();
;
//#archivo js/games/operadores-escena.js
// Ejercicios de «Operadores definidos» (pu-op-1 y pu-op-2) con las escenas de la explicación: la máquina de dos entradas, la tabla, el
// árbol de paréntesis y la balanza. Armazones en figura-kit.js, logica-kit.js, conteo-escena.js y proposiciones-escena.js.
(() => {
  const N = x => String(x).replace('-', '−'), P = x => (x < 0 ? `(${N(x)})` : N(x));
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a mirar la receta.', 'Le faltó. Vuelve a mirar la receta.'];
  const maq = (K, y, a, s, b, r, cls = 'fg') => K.r(22, y, 62, 44, 'fa', 10) + K.t(53, y + 29, a, 'b') + K.t(106, y + 29, s, 'b') + K.r(128, y, 62, 44, 'fa', 10) + K.t(159, y + 29, b, 'b') + K.ar(200, y + 22, 236, y + 22, 'lm') + K.r(242, y, 78, 44, cls, 10) + K.t(281, y + 29, r, 'b');
  // Tabla de una operación: fila del primero, columna del segundo.
  const tabK = (K, p, ch) => { const n = p.letras.length, x = j => 46 + j * 32, y = i => 46 + i * ch; return K.l(8, 28, 30 + n * 32, 28, 'lm') + K.l(30, 6, 30, 28 + n * ch, 'lm') + K.t(19, 22, '✱', 'tm') + p.letras.map((l, i) => K.t(x(i), 21, l, 'b ta') + K.t(19, y(i) + 5, l, 'b tg') + p.letras.map((_, j) => K.t(x(j), y(i) + 5, p.tab[i][j])).join('')).join(''); };
  const tablero = (nombre, ch) => XG.rotula(nombre, {
    slots: p => p.metas.map((_, i) => ({ x: 306, y: 34 + i * 52, w: 56, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: p => Math.max(34 + p.metas.length * 52 - 26, 32 + p.letras.length * ch),
    fondo: (K, p) => tabK(K, p, ch) + p.et.map((t, i) => K.t(270, 39 + i * 52, t, 's', 'end')).join(''), aviso: avisa, bien: p => p.ok,
  });

  // ------------------------------------------------------------------------------------------------ pu-op-1 · operaciones nuevas
  XG.rotula('arma-receta', {
    slots: () => [44, 114].flatMap(y => [{ x: 134, y, w: 48, h: 40 }, { x: 200, y, w: 48, h: 40 }, { x: 296, y, w: 60, h: 40 }]), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.et.map((t, i) => `${t}: ${p.metas[i * 3 + 2]}`).join('; '), alto: () => 144, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => [44, 114].map((y, i) => K.t(44, y + 5, `${p.et[i]} =`, 'ta') + K.t(96, y + 5, '4 ·') + K.t(167, y + 5, '−', 'b') + K.t(232, y - 8, '2', 's') + K.t(250, y + 5, '=', 'b')).join(''),
  });
  XG.figura('maquina-ida-vuelta', {
    ini: () => ({ a: 0, b: 0 }), manijas: p => [{ k: 'a', min: 0, max: 9, paso: 1, et: 'entrada a' }, { k: 'b', min: 0, max: 9, paso: 1, et: 'entrada b' }], ok: (v, p) => p.f(v.a, v.b) === p.m[0] && p.f(v.b, v.a) === p.m[1], sol(p) { for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) if (p.f(a, b) === p.m[0] && p.f(b, a) === p.m[1]) return { a, b }; return null; },
    texto: p => p.texto, alto: () => 226, ms: 900, pie: 'Mueve las dos entradas.',
    dib(v, K, p, f) { const s = f >= 1, r = [p.f(v.a, v.b), p.f(v.b, v.a)]; return [0, 1].map(i => maq(K, 6 + i * 56, K.sig(i ? v.b : v.a), '★', K.sig(i ? v.a : v.b), s ? N(Math.round(r[i])) : '?', s ? (r[i] === p.m[i] ? 'fo' : 'ff') : 'fg')).join(''); },
    aviso(v, p) { const r = [p.f(v.a, v.b), p.f(v.b, v.a)]; return `Arriba sale ${N(r[0])} y abajo ${N(r[1])}: ${r[0] === p.m[0] ? 'falla la de abajo' : r[1] === p.m[1] ? 'falla la de arriba' : 'fallan las dos'}.`; }, bien: p0 => `Con ${p0.a} y ${p0.b} salen los dos: el orden cambia el resultado.`,
  });
  XG.frases('cuales-conmutan');
  XG.cuenta('entran-negativos', 62, (K, p) => maq(K, 6, p.a, '★', p.b, '?'));
  tablero('lee-operacion', 34);
  const CX = j => 96 + j * 64, CY = i => 50 + i * 43;
  XG.marca('tabla-desigual', {
    sitios: p => p.letras.flatMap((_, i) => p.letras.map((_, j) => ({ x: CX(j), y: CY(i), w: 56, h: 38 }))), cara: (K, p, k) => { const n = p.letras.length, i = Math.floor(k / n), j = k % n; return K.t(CX(j), CY(i) + 6, p.tab[i][j], 'b'); }, alto: () => 202, nombre: (p, k) => { const n = p.letras.length; return `${p.letras[Math.floor(k / n)]} con ${p.letras[k % n]}: ${p.tab[Math.floor(k / n)][k % n]}`; },
    fondo: (K, p) => K.t(36, 22, '✱', 'tm') + p.letras.map((l, i) => K.t(CX(i), 22, l, 'b ta') + K.t(36, CY(i) + 6, l, 'b tg')).join(''),
    sol: p => { const n = p.letras.length, o = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (p.tab[i][j] !== p.tab[j][i]) o.push(i * n + j); return o; },
    aviso(on, p) { const n = p.letras.length, L = p.letras; for (let k = 0; k < on.length; k++) { const i = Math.floor(k / n), j = k % n; if (on[k] && i === j) return `${L[i]} ✱ ${L[i]} es lo mismo al derecho y al revés.`; if (on[k] && p.tab[i][j] === p.tab[j][i]) return `${L[i]} ✱ ${L[j]} y ${L[j]} ✱ ${L[i]} dan lo mismo.`; } for (let k = 0; k < on.length; k++) { const i = Math.floor(k / n), j = k % n; if (on[k] && !on[j * n + i]) return `Si ${L[i]} ✱ ${L[j]} cambia al voltearlo, la casilla de ${L[j]} ✱ ${L[i]} también cuenta.`; } return 'Falta otra pareja que cambia al voltearla.'; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las casillas que cambian.',
  });
  XG.renglones('neutro-de-cada', { w: 64, x: 270 });
  XG.ascensor('sube-operador', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-op-2 · anidados y ecuaciones
  XG.renglones('dos-parentesis', { w: 64, x: 270 });
  XG.rotula('arbol-operador', {
    slots: () => [{ x: 90, y: 96, w: 64, h: 40 }, { x: 250, y: 96, w: 64, h: 40 }, { x: 170, y: 28, w: 64, h: 40 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 178, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.l(150, 48, 100, 76, 'lm') + K.l(190, 48, 240, 76, 'lm') + K.t(170, 74, p.s[2], 'b ta') + [90, 250].map((x, i) => K.l(x - 10, 116, x - 32, 140, 'lm') + K.l(x + 10, 116, x + 32, 140, 'lm') + K.t(x, 138, p.s[i], 'b ta') + [0, 1].map(j => K.r(x - 52 + j * 64, 140, 40, 32, 'fc', 8) + K.t(x - 32 + j * 64, 162, p.h[i * 2 + j], 'b')).join('')).join(''),
  });
  XG.renglones('lugar-x', { w: 148, x: 254 });
  XG.figura('iguala-lados', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'x' }], ok: (v, p) => p.l(v.x) === p.r(v.x), sol(p) { for (let x = 0; x <= p.max; x++) if (p.l(x) === p.r(x)) return { x }; return null; }, texto: p => p.texto, alto: () => 208, ms: 1100, pie: 'Mueve la x.',
    dib(v, K, p, f) { const a = p.l(v.x), b = p.r(v.x), d = Math.max(-26, Math.min(26, (b - a) * 2)) * f, s = f >= 1, c = s ? (a === b ? 'fo' : 'ff') : ''; return K.l(80, 88 - d, 260, 88 + d, 'gr') + K.p([[170, 88], [154, 138], [186, 138]], 'fc') + K.r(34, 46 - d, 92, 40, c || 'fa', 8) + K.t(80, 72 - d, s ? N(Math.round(a)) : p.et[0], 'b') + K.r(214, 46 + d, 92, 40, c || 'fg', 8) + K.t(260, 72 + d, s ? N(Math.round(b)) : p.et[1], 'b'); },
    aviso: (v, p) => `Con x = ${v.x}, la izquierda vale ${p.l(v.x)} y la derecha ${p.r(v.x)}.`, bien: (v, p) => `Los dos lados valen ${p.l(v.x)}.`,
  });
  tablero('cadena-en-tabla', 38);
  XG.marca('x-consigo', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, N(p.nums[i]), 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60, nombre: (p, i) => `x igual a ${N(p.nums[i])}`,
    sol: p => p.nums.map((_, i) => i).filter(i => p.f(p.nums[i], p.nums[i]) === p.t), aviso(on, p) { const i = on.findIndex((x, k) => x && p.f(p.nums[k], p.nums[k]) !== p.t); return i < 0 ? 'Falta otro número que también cumple.' : `${P(p.nums[i])} ◆ ${P(p.nums[i])} da ${N(p.f(p.nums[i], p.nums[i]))}.`; }, bien: p => p.ok, texto: p => p.nums.filter(x => p.f(x, x) === p.t).map(N).join(' y '), pie: 'Toca todos los que cumplen.',
  });
  XG.rotula('deshace-operador', {
    slots: () => [{ x: 44, y: 62, w: 64, h: 42 }, { x: 170, y: 62, w: 64, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' → '), alto: () => 112, aviso: (q, p) => { const i = q[1][0] !== p.metas[1] ? 1 : 0; return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },   bien: p => p.ok,   // se deshace desde el final
    fondo: (K, p) => K.ar(82, 62, 132, 62, 'lm') + K.ar(208, 62, 260, 62, 'lm') + K.t(107, 46, p.s[0], 'b ta') + K.t(234, 46, p.s[1], 'b ta') + K.r(264, 41, 68, 42, 'fo', 10) + K.t(298, 68, p.sale, 'b') + K.t(44, 104, 'entra x', 's tm') + K.t(170, 104, 'en la mitad', 's tm') + K.t(298, 104, 'sale', 's tm'),
  });
  XG.ascensor('sube-anidado', 40, 1, neutro);
})();
;
//#archivo js/games/aritmetica-escena.js
// Ejercicios de «Aritmética y promedios» (pu-ar-1 a pu-ar-4) con las escenas de la explicación: la barra de lo que queda, el rectángulo
// del promedio, las columnas con llevada, las bolas del peor caso y el corral. Armazones en figura-kit, logica-kit, conteo-escena
// (XG.cuenta, XG.ascensor) y proposiciones-escena (XG.renglones, XG.frases).
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−');
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a hacer la cuenta.', 'Le faltó. Vuelve a hacer la cuenta.'];

  // ------------------------------------------------------------------------------------------- pu-ar-1 · fracciones de lo que queda
  XG.renglones('fraccion-de-que', { w: 64, x: 270 });
  XG.figura('corta-barra', {
    ini: () => ({ a: 2, b: 36 }), manijas: p => [{ k: 'a', min: 1, max: p.n - 1, paso: 1, rot: v => R(v.a), en: v => [24 + v.a * 292 / p.n, 26], de: x => (x - 24) * p.n / 292 }, { k: 'b', min: 1, max: p.n - 1, paso: 1, rot: v => R(v.b), en: v => [24 + v.b * 292 / p.n, 138], de: x => (x - 24) * p.n / 292 }],
    ok: (v, p) => v.a === p.a && v.b === p.b, sol: p => ({ a: p.a, b: p.b }), texto: p => `cortes en ${p.a} y en ${p.b}`, alto: () => 166, ms: 900, pie: 'Arrastra los dos cortes.',
    dib(v, K, p, f) { const x = n => 24 + n * 292 / p.n, b = Math.max(v.a, v.b); let h = K.r(24, 58, 292, 44, 'fa', 5) + K.r(24, 58, v.a * 292 / p.n, 44, 'ff', 5) + K.r(x(v.a), 58, (b - v.a) * 292 / p.n, 44, 'fg', 5); for (let i = 0; i <= p.n; i++) h += K.l(x(i), 102, x(i), i % 5 ? 105 : 109, 'lm') + (i % 10 === 0 ? K.t(x(i), 120, i, 's tm') : ''); return h + K.l(x(v.a), 42, x(v.a), 102, 'gr') + K.l(x(v.b), 58, x(v.b), 122, 'gr') + K.f(f, K.t(x((b + p.n) / 2), 85, p.n - R(b), 'b')); },
    aviso: (v, p) => (v.a !== p.a ? `El corte de arriba: parte los ${p.n} en ${p.f1[1]} pedazos iguales y toma ${p.f1[0]}.` : v.b <= v.a ? 'El segundo pedazo empieza donde termina el primero.' : 'El segundo pedazo se toma de lo que quedó a la derecha del primer corte, no de toda la barra.'), bien: (v, p) => `Quedan ${p.n - p.b} cuadros.`,
  });
  const barra = (K, y = 12) => K.r(24, y, 292, 36, 'fa', 5);
  XG.cuenta('queda-producto', 56, (K, p) => barra(K) + Array.from({ length: p.n - 1 }, (_, i) => K.l(24 + (i + 1) * 292 / p.n, 12, 24 + (i + 1) * 292 / p.n, 48, 'ls')).join(''));
  XG.rotula('desde-el-final', {
    slots: () => [{ x: 46, y: 70, w: 66, h: 42 }, { x: 170, y: 70, w: 66, h: 42 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(' → '), alto: () => 122, bien: p => p.ok,
    aviso: (q, p) => { const i = q[1][0] !== p.metas[1] ? 1 : 0; return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },   // se camina desde el final
    fondo: (K, p) => K.ar(84, 70, 132, 70, 'lm') + K.ar(208, 70, 260, 70, 'lm') + K.t(108, 30, p.s[0], 's tf') + K.t(234, 30, p.s[1], 's tf') + K.r(264, 49, 66, 42, 'fo', 10) + K.t(297, 76, p.queda, 'b') + K.t(46, 112, 'al principio', 's tm') + K.t(170, 112, 'después del 1.º', 's tm') + K.t(297, 112, 'quedan', 's tm'),
  });
  XG.frases('dejan-lo-mismo');
  XG.cuenta('tres-tandas', 66, (K, p) => [0, 1, 2].map(i => K.r(R(170 + (i - 1) * 108) - 34, 8, 68, 46, 'fc', 6) + K.t(170 + (i - 1) * 108, 36, p.s[i], 's tf')).join(''));
  XG.cuenta('porciento-resto', 58, K => barra(K));
  XG.ascensor('sube-resto', 140, 5, neutro);

  // -------------------------------------------------------------------------------------------------------- pu-ar-2 · promedios
  const gr = (K, x, n, m, cls) => { let h = K.r(x, 146 - m * 10, n * 20, m * 10, cls, 3); for (let i = 1; i < n; i++) h += K.l(x + i * 20, 146, x + i * 20, 146 - m * 10, 'lr'); return h; };
  XG.figura('misma-suma', {
    ini: () => ({ m: 11 }), manijas: () => [{ k: 'm', min: 1, max: 13, paso: 1, r: 16, rot: v => R(v.m), en: v => [302, 146 - v.m * 10], de: (x, y) => (146 - y) / 10 }], ok: (v, p) => v.m * p.k === p.n * p.m, sol: p => ({ m: p.n * p.m / p.k }), texto: p => `${p.n * p.m / p.k}`, alto: () => 176, ms: 900, pie: 'Sube o baja el nivel.',
    dib: (v, K, p, f) => K.l(20, 146, 326, 146, 'lm') + gr(K, 46, p.n, p.m, 'fa') + K.t(38, 150 - p.m * 5, p.m, 'ta', 'end') + K.t(46 + p.n * 10, 165, `${p.n} datos`, 's tm') + gr(K, 168, p.k, v.m, 'fg') + K.t(168 + p.k * 10, 165, `${p.k} datos`, 's tm') + K.l(168 + p.k * 20, 146 - v.m * 10, 302, 146 - v.m * 10, 'lg d') + K.f(f, K.t(46 + p.n * 10, 151 - p.m * 5, p.n * p.m, 'b') + K.t(168 + p.k * 10, 151 - Math.max(2, v.m) * 5, p.k * R(v.m), 'b')),
    aviso: (v, p) => (v.m === p.m ? 'Con el mismo nivel y más datos, la suma crece.' : `Así los ${p.k} suman ${p.k * v.m}, y los ${p.n} suman otra cosa.`), bien: (v, p) => `Los dos rectángulos tienen la misma área: ${p.n * p.m}.`,
  });
  XG.renglones('sube-baja-igual', { w: 84, x: 262 });
  const fila = (K, n, y = 28, sel = -1) => Array.from({ length: n }, (_, i) => K.c(170 + (i - (n - 1) / 2) * Math.min(34, 300 / n), y, 13, i === sel ? 'fg' : 'fa')).join('');
  XG.cuenta('cambia-uno', 56, (K, p) => fila(K, p.n, 26, p.n - 1) + K.t(170 + (p.n - 1) / 2 * 34, 54, p.c, 's tg'));
  XG.cuenta('reparte-sobra', 56, (K, p) => fila(K, p.n + 1, 26, p.n));
  XG.figura('parte-pesos', {
    ini: () => ({ w: 80 }), manijas: () => [{ k: 'w', min: 5, max: 95, paso: 5, rot: v => `${R(v.w)}`, en: v => [24 + v.w * 2.92, 116], de: x => (x - 24) / 2.92 }], ok: (v, p) => v.w === p.w, sol: p => ({ w: p.w }), texto: p => `${p.w} % y ${100 - p.w} %`, alto: () => 150, ms: 900, pie: 'Arrastra la división de los pesos.',
    dib: (v, K, p, f) => K.r(24, 50, v.w * 2.92, 46, 'fa', 5) + K.r(24 + v.w * 2.92, 50, 292 - v.w * 2.92, 46, 'fg', 5) + K.t(24 + v.w * 1.46, 78, v.w > 12 ? p.a : '', 'b') + K.t(170 + v.w * 1.46, 78, v.w < 88 ? p.b : '', 'b') + K.t(24, 38, `${p.na}: ${p.a}`, 's ta', 'start') + K.t(316, 38, `${p.nb}: ${p.b}`, 's tg', 'end') + K.l(24 + v.w * 2.92, 50, 24 + v.w * 2.92, 100, 'gr') + K.f(f, K.t(170, 18, N((p.a * v.w + p.b * (100 - v.w)) / 100), 'b')),
    aviso: (v, p) => `Con esos pesos la definitiva es ${N((p.a * v.w + p.b * (100 - v.w)) / 100)}: ${(p.a * v.w + p.b * (100 - v.w)) / 100 > p.d ? 'pesa de más la nota alta' : 'pesa de más la nota baja'}.`, bien: v => `Pesan ${v.w} % y ${100 - v.w} %.`,
  });
  XG.figura('cuantos-llegan', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'los que llegan' }], ok: (v, p) => p.k * p.a + v.n * p.b === p.m * (p.k + v.n), sol(p) { for (let n = 1; n <= p.max; n++) if (p.k * p.a + n * p.b === p.m * (p.k + n)) return { n }; return null; }, texto: p => `${p.k * (p.m - p.a) / (p.b - p.m)}`, alto: () => 168, ms: 900, pie: 'Mueve la cantidad.',
    dib: (v, K, p, f) => fila(K, p.k, 24) + K.t(170, 54, `promedian ${p.a}`, 's ta') + Array.from({ length: R(v.n) }, (_, i) => K.c(170 + (i - (R(v.n) - 1) / 2) * 24, 80, 10, 'fg')).join('') + K.t(170, 108, `promedian ${p.b}`, 's tg') + K.f(f, K.t(300, 34, N((p.k * p.a + R(v.n) * p.b) / (p.k + R(v.n))), 'b')),
    aviso: (v, p) => `Con ${v.n} el promedio de todos es ${N((p.k * p.a + v.n * p.b) / (p.k + v.n))}.`, bien: (v, p) => `Suman ${p.k * p.a + v.n * p.b} entre ${p.k + v.n}.`,
  });
  XG.renglones('aportes-nota', { w: 60, x: 276 });
  XG.ascensor('sube-promedio', 40, 1, neutro);

  // --------------------------------------------------------------------------------------------------- pu-ar-3 · criptoaritmética
  XG.figura('bloques-volteo', {
    ini: () => ({ a: 1, b: 0 }), manijas: () => [{ k: 'a', min: 1, max: 9, paso: 1, et: 'decenas' }, { k: 'b', min: 0, max: 9, paso: 1, et: 'unidades' }], ok: (v, p) => v.a + v.b === p.s && 9 * (v.a - v.b) === p.d, sol: p => ({ a: (p.s + p.d / 9) / 2, b: (p.s - p.d / 9) / 2 }), texto: p => `${(p.s + p.d / 9) / 2}${(p.s - p.d / 9) / 2}`, alto: () => 200, ms: 900, pie: 'Mueve las decenas y las unidades.',
    dib(v, K, p, f) { const A = R(v.a), B = R(v.b); let h = ''; for (let i = 0; i < A; i++) h += K.r(30 + i * 17, 10, 13, 86, 'fa', 3); for (let i = 0; i < B; i++) h += K.r(206 + (i % 5) * 20, 14 + Math.floor(i / 5) * 20, 16, 16, 'fg', 3); return h + K.f(f, K.t(254, 88, `${A}${B} → ${B}${A}`, 'b')); },
    aviso(v, p) { const c = (v.a - v.b) * 9; return v.a + v.b !== p.s ? `Sus cifras suman ${v.a + v.b}.` : `Las cifras suman bien, pero al voltearlo ${c === 0 ? 'queda igual' : `${c > 0 ? 'baja' : 'sube'} ${Math.abs(c)}`}.`; }, bien: (v, p) => `${v.a}${v.b} − ${v.b}${v.a} = ${p.d}.`,
  });
  XG.renglones('valor-letras', { w: 108, x: 252 });
  const col = (nombre, sg, slots) => XG.rotula(nombre, {
    slots: () => slots.map(([x, y]) => ({ x, y, w: 46, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 182, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.c.map(([x, y, t]) => K.t(x, y + 8, t, 'B')).join('') + K.t(96, 106, sg, 'b') + K.l(100, 132, 240, 132) + (p.rot || []).map(([x, y, t]) => K.t(x, y + 5, t, 's tm', 'start')).join(''),
  });
  col('suma-con-letras', '+', [[206, 106], [146, 22], [146, 66]]);
  col('resta-con-letras', '−', [[206, 60], [146, 106]]);
  XG.frases('siempre-once');
  XG.marca('siete-veces', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, p.nums[i], 'b'), alto: p => 8 + Math.ceil(p.nums.length / 3) * 60,
    sol: p => p.nums.map((_, i) => i).filter(i => p.nums[i] === p.k * (Math.floor(p.nums[i] / 10) + p.nums[i] % 10)), aviso(on, p) { const s = n => Math.floor(n / 10) + n % 10, i = on.findIndex((x, k) => x && p.nums[k] !== p.k * s(p.nums[k])); return i < 0 ? 'Falta otro que también cumple.' : `Las cifras de ${p.nums[i]} suman ${s(p.nums[i])}, y ${p.k} veces eso es ${p.k * s(p.nums[i])}.`; }, bien: p => p.ok, texto: p => p.nums.filter(n => n === p.k * (Math.floor(n / 10) + n % 10)).join(', '), pie: 'Toca todos los que cumplen.',
  });
  XG.rotula('producto-con-letras', {
    slots: () => [{ x: 62, y: 30, w: 46, h: 38 }, { x: 62, y: 98, w: 46, h: 38 }, { x: 262, y: 98, w: 46, h: 38 }], fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 130, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(94, 35, 'se lleva a las decenas', 's tm', 'start') + K.t(100, 106, p.u, 'B') + K.t(140, 106, `× ${p.k}`, 'b') + K.t(184, 106, '=', 'b') + K.t(222, 106, p.r[0], 'B') + K.t(300, 106, p.r[1], 'B'),
  });
  XG.ascensor('sube-cifras', 60, 1, neutro);

  // ------------------------------------------------------------------------------------------------ pu-ar-4 · máximos y mínimos
  const CL = ['fF', 'fG', 'fA', 'fM', 'fk'];
  const bolsa = (K, g, y = 26) => g.map((n, i) => { const x = 170 + (i - (g.length - 1) / 2) * 64; return K.c(x - 12, y, 11, CL[i]) + K.t(x + 4, y + 5, `× ${n}`, 's', 'start'); }).join('');
  XG.cuenta('peor-suerte', 50, (K, p) => bolsa(K, p.g, 24));
  XG.cuenta('color-pedido', 50, (K, p) => bolsa(K, p.g, 24));
  XG.frases('seguro-o-suerte');
  XG.figura('corral-pared', {
    ini: () => ({ a: 1 }), manijas: p => [{ k: 'a', min: 1, max: p.T / 2 - 1, paso: 1, et: 'ancho' }], ok: (v, p) => v.a === p.T / 4, sol: p => ({ a: p.T / 4 }), texto: p => `${p.T / 4} por ${p.T / 2}`, alto: () => 182, ms: 900, pie: 'Mueve el ancho.',
    dib(v, K, p, f) { const u = 9, w = (p.T - 2 * v.a) * u, h = v.a * u, x = 170 - w / 2; return K.r(20, 12, 300, 10, 'fk', 2) + K.r(x, 22, w, h, 'fa', 0) + K.pl([[x, 22], [x, 22 + h], [x + w, 22 + h], [x + w, 22]], 'lg gr') + K.t(x - 8, 28 + h / 2, N(v.a), 'tg', 'end') + K.t(170, 40 + h, N(p.T - 2 * v.a), 'tg') + K.f(f, K.t(170, 28 + h / 2, N(v.a * (p.T - 2 * v.a)), 'b')); },
    aviso: (v, p) => `Así el área es ${v.a * (p.T - 2 * v.a)}: hay un ancho que da más.`, bien: (v, p) => `${v.a} por ${p.T - 2 * v.a}: ${v.a * (p.T - 2 * v.a)} m².`,
  });
  XG.figura('menor-cerca', {
    ini: () => ({ k: 0 }), manijas: () => [{ k: 'k', min: 0, max: 6, paso: 1, et: 'largo', rot: v => 2 ** R(v.k) }], ok: v => v.k === 3, sol: () => ({ k: 3 }), texto: () => '8 por 8', alto: () => 196, ms: 900, pie: 'Mueve el largo.',
    dib(v, K, p, f) { const a = 2 ** v.k, b = 64 / a, u = 1.9; return K.r(170 - a * u / 2, 130 - b * u, a * u, b * u, 'fa', 2) + K.t(170, 148, N(a), 'tg') + K.t(170 + a * u / 2 + 10, 136 - b * u / 2, N(b), 'tg', 'start') + K.f(f, K.t(40, 24, `cerca: ${N(2 * (a + b))}`, 's', 'start')); },
    aviso: v => `Así se gastan ${2 * (2 ** v.k + 64 / 2 ** v.k)} m de cerca: se puede con menos.`, bien: () => 'El cuadrado gasta la menor cerca: 32 m.',
  });
  XG.cuenta('reparto-distinto', 56, (K, p) => fila(K, p.n));
  XG.renglones('techo-piso', { w: 56, x: 290 });
  XG.ascensor('sube-extremo', 40, 1, neutro);
})();
;
//#archivo js/games/ecuaciones-escena.js
// Ejercicios de «Ecuaciones y planteamiento» (pu-ec-1 a pu-ec-3) con las escenas de la explicación: la balanza, las edades que crecen
// juntas, los cambios de uno por otro, los recibos y la recta. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−'), S = x => (x < 0 ? `(${N(x)})` : N(x));
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Comprueba ese número en el enunciado.', 'Le faltó. Comprueba ese número en el enunciado.'];

  // ------------------------------------------------------------------------------------------------ pu-ec-1 · del texto a la ecuación
  XG.renglones('traduce-frases', { w: 104, x: 278 });
  XG.frases('sigue-equilibrada');
  XG.rotula('pasos-despeje', {
    slots: () => [0, 1, 2].map(i => ({ x: 200, y: 70 + i * 50, w: 130, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 196, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(200, 28, p.ec, 'B ta') + p.et.map((t, i) => K.t(122, 75 + i * 50, t, 's tm', 'end')).join(''),
  });
  XG.renglones('misma-x', { w: 120, x: 266 });
  XG.figura('ancho-del-marco', {
    ini: () => ({ x: 1 }), manijas: p => [{ k: 'x', min: 1, max: p.max, paso: 1, et: 'ancho' }], ok: (v, p) => 2 * (v.x + p.k * v.x - p.q) === p.P, sol: p => ({ x: (p.P / 2 + p.q) / (p.k + 1) }), texto: p => `ancho ${(p.P / 2 + p.q) / (p.k + 1)}`, alto: () => 182, ms: 900, pie: 'Mueve el ancho.',
    dib(v, K, p, f) { const u = 9, L = p.k * v.x - p.q; return K.r(170 - L * u / 2, 62 - v.x * u / 2, L * u, v.x * u, 'fa', 2) + K.f(f, K.t(170, 70, N(L), 'b') + K.t(170, 128, `borde ${N(2 * (v.x + L))}`, 's')); },
    aviso: (v, p) => `Con ancho ${v.x} el largo es ${p.k * v.x - p.q} y el borde mide ${2 * (v.x + p.k * v.x - p.q)}.`, bien: (v, p) => `${v.x} por ${p.k * v.x - p.q}: el borde mide ${p.P}.`,
  });
  XG.cuenta('cinco-seguidos', 56, (K, p) => Array.from({ length: p.n }, (_, i) => K.r(170 + (i - p.n / 2) * 46 + 3, 10, 40, 38, i === 2 ? 'fg' : 'fa', 6) + K.t(170 + (i - (p.n - 1) / 2) * 46, 34, ['x', 'x+1', 'x+2', 'x+3', 'x+4'][i], 's')).join(''));
  XG.cuenta('dos-cuerdas', 66, K => K.r(40, 10, 84, 14, 'fa', 7) + K.r(40, 38, 84, 14, 'fg', 7) + K.r(124, 38, 84, 14, 'fg', 7) + K.r(208, 38, 34, 14, 'ff', 7) + K.t(82, 34, 'x', 's') + K.t(225, 66, '5', 's tf'));
  XG.ascensor('sube-ecuacion', 60, 1, neutro);

  // ------------------------------------------------------------------------------------------- pu-ec-2 · edades, mezclas y monedas
  XG.figura('hace-cuantos', {
    ini: () => ({ t: 0 }), manijas: p => [{ k: 't', min: 0, max: p.b - 1, paso: 1, et: 'años hacia atrás' }], ok: (v, p) => p.a - v.t === p.k * (p.b - v.t), sol: p => ({ t: (p.k * p.b - p.a) / (p.k - 1) }), texto: p => `hace ${(p.k * p.b - p.a) / (p.k - 1)} años`, alto: () => 172, ms: 900, pie: 'Mueve los años.',
    dib(v, K, p, f) { const u = 6, A = p.a - v.t, B = p.b - v.t; return K.t(24, 18, p.na, 's tm', 'start') + K.r(24, 24, p.a * u, 26, 'fc') + K.r(24, 24, A * u, 26, 'fa') + K.t(24, 72, p.nb, 's tm', 'start') + K.r(24, 78, p.b * u, 26, 'fc') + K.r(24, 78, B * u, 26, 'fg') + K.f(f, K.t(34 + p.a * u, 43, N(A), 'ta', 'start') + K.t(34 + p.b * u, 97, N(B), 'tg', 'start')) + K.f(1 - f, K.t(34 + p.a * u, 43, p.a, 's tm', 'start') + K.t(34 + p.b * u, 97, p.b, 's tm', 'start')); },
    aviso: (v, p) => `Hace ${v.t} ${v.t === 1 ? 'año' : 'años'} tenían ${p.a - v.t} y ${p.b - v.t}, y ${p.k} veces ${p.b - v.t} son ${p.k * (p.b - v.t)}.`, bien: (v, p) => `${p.a - v.t} es ${p.k} veces ${p.b - v.t}.`,
  });
  XG.rotula('tabla-edades', {
    slots: () => [66, 120].flatMap(y => [{ x: 196, y, w: 84, h: 42 }, { x: 290, y, w: 84, h: 42 }]), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 148, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => [[110, 'hoy'], [196, p.col[0]], [290, p.col[1]]].map(([x, t]) => K.t(x, 28, t, 's tm')).join('') + K.l(10, 40, 332, 40, 'lm') + p.fila.map(([n, h], i) => K.t(14, 71 + i * 54, n, '', 'start') + K.t(110, 71 + i * 54, h, 'b ta')).join(''),
  });
  XG.cuenta('todos-iguales', 56, (K, p) => Array.from({ length: p.n }, (_, i) => K.r(22 + (i % 9) * 34, 4 + Math.floor(i / 9) * 26, 28, 20, 'fc', 4)).join(''));
  XG.figura('aranas-hormigas', {
    ini: () => ({ k: 0 }), manijas: p => [{ k: 'k', min: 0, max: p.n, paso: 1, et: 'arañas' }], ok: (v, p) => 6 * p.n + 2 * v.k === p.T, sol: p => ({ k: (p.T - 6 * p.n) / 2 }), texto: p => `${(p.T - 6 * p.n) / 2} arañas`, alto: () => 182, ms: 900, pie: 'Mueve la cantidad de arañas.',
    dib(v, K, p, f) { let h = ''; for (let i = 0; i < p.n; i++) { const x = 50 + (i % 6) * 48, y = 34 + Math.floor(i / 6) * 56, n = i < R(v.k) ? 8 : 6; for (let j = 0; j < n; j++) h += K.l(x, y, ...K.at(x, y, 19, (j + 0.5) * 360 / n), 'lr'); h += K.c(x, y, 10, n === 8 ? 'ff' : 'fg'); } return h + K.f(f, K.t(316, 128, `${6 * p.n + 2 * R(v.k)} patas`, 's', 'end')); },
    aviso: (v, p) => `Con ${v.k} ${v.k === 1 ? 'araña' : 'arañas'} hay ${6 * p.n + 2 * v.k} patas.`, bien: (v, p) => `${8 * v.k} de arañas y ${6 * (p.n - v.k)} de hormigas.`,
  });
  XG.figura('aguado', {
    ini: () => ({ b: 0 }), manijas: p => [{ k: 'b', min: 0, max: p.max, paso: 1, et: 'litros de agua' }], ok: (v, p) => p.pu * 100 === p.d * (p.L + v.b), sol: p => ({ b: p.pu * 100 / p.d - p.L }), texto: p => `${p.pu * 100 / p.d - p.L} L`, alto: () => 186, ms: 900, pie: 'Agrega agua.',
    dib(v, K, p, f) { const u = 10, y = 126; return K.r(120, y - (p.L + v.b) * u, 100, (p.L + v.b) * u, 'fc', 3) + K.r(120, y - p.L * u, 100, p.L * u, 'fa', 3) + K.r(120, y - p.pu * u, 100, p.pu * u, 'fg', 3) + K.t(112, y - p.pu * u / 2 + 5, 'pulpa', 's tg', 'end') + K.t(112, y - (p.L + p.pu) * u / 2 + 5, 'jugo', 's ta', 'end') + (v.b > 0.6 ? K.t(228, y - (p.L + v.b / 2) * u + 5, 'agua', 's tm', 'start') : '') + K.f(f, K.t(290, 70, `${N(p.pu * 100 / (p.L + v.b))} %`, 'b')); },
    aviso: (v, p) => `La pulpa son ${p.pu} L de ${p.L + v.b} L: ${N(p.pu * 100 / (p.L + v.b))} %.`, bien: (v, p) => `${p.pu} L de pulpa en ${p.L + v.b} L.`,
  });
  XG.marca('precio-posible', {
    sitios: p => p.nums.map((_, i) => ({ x: 62 + (i % 3) * 108, y: 34 + Math.floor(i / 3) * 60, w: 92, h: 48 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, 41 + Math.floor(i / 3) * 60, `${p.nums[i]} mil`, ''), alto: () => 128,
    sol: p => p.nums.map((_, i) => i).filter(i => p.nums[i] > p.a && p.nums[i] < (p.a + p.b) / 2), aviso(on, p) { const i = on.findIndex((x, k) => x && !(p.nums[k] > p.a && p.nums[k] < (p.a + p.b) / 2)), n = p.nums[i], m = (p.a + p.b) / 2; return i < 0 ? 'Falta otro precio que también se puede.' : n <= p.a || n >= p.b ? `${n} mil no está entre los dos precios.` : n === m ? `${n} mil saldría con la misma cantidad de los dos.` : `Para ${n} mil hace falta más del caro.`; }, bien: p => p.ok, texto: p => p.nums.filter(n => n > p.a && n < (p.a + p.b) / 2).join(', '), pie: 'Toca todos los posibles.',
  });
  XG.renglones('se-llevan-igual', { w: 56, x: 290 });
  XG.ascensor('sube-edades', 40, 1, neutro);

  // ---------------------------------------------------------------------------------------------- pu-ec-3 · sistemas y desigualdades
  const rec = (K, p) => p.f.map(([a, b, s], i) => { const y = 18 + i * 32; let h = ''; for (let k = 0; k < a; k++) h += K.r(18 + k * 26, y - 11, 22, 22, 'fa', 5); for (let k = 0; k < b; k++) h += K.c(134 + k * 26, y, 11, 'fg'); return h + K.t(278, y + 5, `= ${s}`, 'b', 'start'); }).join('');
  XG.cuenta('resta-recibos', 70, rec);
  XG.renglones('iguala-recibos', { w: 56, x: 290 });
  XG.figura('lleva-ventaja', {
    ini: () => ({ m: 1 }), manijas: p => [{ k: 'm', min: 1, max: p.max, paso: 1, et: 'el menor' }], ok: (v, p) => 2 * v.m + p.d === p.s, sol: p => ({ m: (p.s - p.d) / 2 }), texto: p => `${(p.s - p.d) / 2} y ${(p.s + p.d) / 2}`, alto: () => 172, ms: 900, pie: 'Mueve el menor.',
    dib(v, K, p, f) { const u = 7; return K.t(24, 18, 'mayor', 's tm', 'start') + K.r(24, 24, v.m * u, 26, 'fa') + K.r(24 + v.m * u, 24, p.d * u, 26, 'ff') + K.t(24 + (v.m + p.d / 2) * u, 43, p.d, 's') + K.t(24, 72, 'menor', 's tm', 'start') + K.r(24, 78, v.m * u, 26, 'fg') + K.f(f, K.t(300, 97, `suman ${N(2 * v.m + p.d)}`, 's', 'end')); },
    aviso: (v, p) => `Serían ${v.m} y ${v.m + p.d}: suman ${2 * v.m + p.d}.`, bien: (v, p) => `${v.m} + ${v.m + p.d} = ${p.s}.`,
  });
  const PX = x => 70 + x * 25, PY = y => 186 - y * 21;
  XG.figura('punto-comun', {
    ini: () => ({ x: 0, y: 0 }), manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [8, 8], paso: 1, r: 10, en: v => [PX(v.x), PY(v.y)], de: (x, y) => [(x - 70) / 25, (186 - y) / 21] }], ok: (v, p) => p.e.every(([a, b, c]) => a * v.x + b * v.y === c), sol(p) { for (let x = 0; x < 9; x++) for (let y = 0; y < 9; y++) if (p.e.every(([a, b, c]) => a * x + b * y === c)) return { x, y }; return null; }, texto: p => p.texto, alto: () => 212, ms: 900, pie: 'Arrastra el punto.',
    dib(v, K, p, f) { let h = ''; for (let i = 0; i < 9; i++) h += K.l(PX(i), PY(0), PX(i), PY(8), i ? 'lr' : 'lm') + K.l(PX(0), PY(i), PX(8), PY(i), i ? 'lr' : 'lm') + K.t(PX(i), 204, i, 's tm') + (i ? K.t(58, PY(i) + 5, i, 's tm', 'end') : ''); return h + K.t(290, 190, 'x', 'ta') + K.t(70, 14, 'y', 'tg') + K.f(f, p.l.map(([a, b, c, d], i) => K.l(PX(a), PY(b), PX(c), PY(d), i ? 'lg gr' : 'la gr')).join('')) + (f ? K.c(PX(v.x), PY(v.y), 7, 'fF') : ''); },
    aviso(v, p) { const i = p.e.findIndex(([a, b, c]) => a * v.x + b * v.y !== c); return `Con x = ${v.x} y y = ${v.y} ${p.e.every(([a, b, c]) => a * v.x + b * v.y !== c) ? 'no se cumple ninguna de las dos' : `no se cumple la ${i ? 'segunda' : 'primera'}`}.`; }, bien: () => 'Es el único punto que está en las dos rectas.',
  });
  XG.renglones('voltea-o-sigue', { w: 104, x: 278 });
  const X = x => 170 + x * 22;
  XG.figura('pinta-intervalo', {
    ini: () => ({ b: 0, dir: 1, ab: 0 }), manijas: () => [{ k: 'b', min: -6, max: 6, paso: 1, r: 12, en: v => [X(v.b), 16], de: x => (x - 170) / 22 }, { k: 'dir', min: -1, max: 1, paso: 2, et: 'sentido', rot: v => (v.dir > 0 ? '→' : '←') }, { k: 'ab', min: 0, max: 1, paso: 1, et: 'el borde: lleno entra, vacío no entra', rot: v => (v.ab ? '○' : '●') }],
    ok: (v, p) => v.b === p.b && v.dir === p.dir && v.ab === p.ab, sol: p => ({ b: p.b, dir: p.dir, ab: p.ab }), texto: p => p.texto, alto: () => 182, ms: 900, pie: 'Mueve el borde, el sentido y si el borde entra.',
    dib(v, K) { const d = v.dir > 0 ? 1 : -1; let h = K.l(12, 52, 328, 52, 'lm'); for (let k = -7; k <= 7; k++) h += K.l(X(k), 48, X(k), 56, 'lm') + K.t(X(k), 80, N(k), k ? 's tm' : 's'); return h + K.l(X(v.b), 28, X(v.b), 44, 'lm') + K.ar(X(v.b) + 8 * d, 52, d > 0 ? 328 : 12, 52, 'la gr') + K.c(X(v.b), 52, 8, v.ab > 0.5 ? 'fn' : 'fA'); },
    aviso(v, p) { const t = x => `${N(p.n)} ${p.m < 0 ? '−' : '+'} ${Math.abs(p.m)} · ${S(x)} da ${N(p.n + p.m * x)}`, si = x => p.n + p.m * x > p.c; if (v.b === p.b && v.dir === p.dir) return 'Mira el borde: ¿cumple él mismo?'; const x = v.b + v.dir; return !si(x) ? `Tu zona incluye el ${N(x)}, y ${t(x)}: no cumple.` : v.ab === 0 && !si(v.b) ? `Tu zona incluye el ${N(v.b)}, y ${t(v.b)}: no cumple.` : v.dir !== p.dir ? 'Tu zona sigue sin parar hacia números que no cumplen.' : 'Los de tu zona cumplen, pero quedan otros por fuera.'; }, bien: p => 'Al dividir entre un negativo, el sentido se volteó.',
  });
  XG.marca('enteros-entre', {
    sitios: p => p.nums.map((_, i) => ({ x: 38 + (i % 5) * 66, y: 34 + Math.floor(i / 5) * 60, w: 56, h: 48 })), cara: (K, p, i) => K.t(38 + (i % 5) * 66, 41 + Math.floor(i / 5) * 60, N(p.nums[i]), 'b'), alto: () => 128,
    sol: p => p.nums.map((_, i) => i).filter(i => p.si(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.si(p.nums[k])); return i < 0 ? 'Falta otro que cumple las dos partes.' : `Con x = ${N(p.nums[i])}, ${p.ex} da ${N(p.g(p.nums[i]))}: no cumple.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.si).map(N).join(', '), pie: 'Toca todos los que cumplen.',
  });
  XG.ascensor('sube-sistema', 40, 1, neutro);
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
//#archivo js/games/conjuntos-escena.js
// Ejercicios de «Conjuntos» (pu-cj-1 y pu-cj-2) con las escenas de la explicación: los círculos y sus zonas, y las barras que se solapan.
// Armazones en figura-kit, logica-kit, conteo-escena (XG.cuenta, XG.ascensor) y proposiciones-escena (XG.renglones, XG.frases).
(() => {
  const R = Math.round, idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó: algo se contó dos veces o de sobra.', 'Le faltó: algo quedó sin contar.'];
  // Dos círculos: a = solo A, i = los dos, b = solo B, o = afuera.  Centro (x, y), radio r, separados d a cada lado.
  const zona = (k, x, y, r, d) => { const h = Math.sqrt(r * r - d * d), u = y - h, v = y + h, A = `A${r} ${r} 0`; return k === 'a' ? `M${x} ${u} ${A} 1 0 ${x} ${v} ${A} 0 1 ${x} ${u} Z` : k === 'i' ? `M${x} ${u} ${A} 0 0 ${x} ${v} ${A} 0 0 ${x} ${u} Z` : `M${x} ${u} ${A} 1 1 ${x} ${v} ${A} 0 0 ${x} ${u} Z`; };
  const pz = (k, cls, ...g) => `<path class="xf ${cls}" d="${zona(k, ...g)}"/>`;
  const mini = (K, ks, x, y) => K.r(x - 62, y - 30, 124, 60, ks.includes('o') ? 'fa' : 'fc', 6) + ['a', 'i', 'b'].map(k => pz(k, ks.includes(k) ? 'fa' : 'fop', x, y, 23, 13)).join('') + K.c(x - 13, y, 23, 'fn') + K.c(x + 13, y, 23, 'fn') + K.t(x - 50, y - 14, 'A', 's') + K.t(x + 50, y - 14, 'B', 's');
  const venn = K => K.r(16, 8, 308, 168, 'fc', 10) + K.c(130, 92, 66, 'fa') + K.c(210, 92, 66, 'fg');

  // ----------------------------------------------------------------------------------------------------- pu-cj-1 · operaciones y Venn
  const DON = (x, y) => { if (x < 16 || x > 324 || y < 8 || y > 176) return -1; const a = Math.hypot(x - 130, y - 92) <= 66, b = Math.hypot(x - 210, y - 92) <= 66; return a && b ? 1 : a ? 0 : b ? 2 : 3; };
  const SITIO = [[[92, 68], [92, 112]], [[170, 70], [170, 114]], [[248, 68], [248, 112]], [[46, 152], [294, 152]]], NZ = ['solo en A', 'en los dos', 'solo en B', 'afuera'];
  XG.figura('ubica-cada', {
    ini: p => Object.assign({}, ...p.els.map((_, i) => ({ [`x${i}`]: 50 + i * 60, [`y${i}`]: 206 }))),
    manijas: p => p.els.map((e, i) => ({ k: [`x${i}`, `y${i}`], min: [20, 16], max: [320, 206], paso: 2, rot: () => e.t, en: v => [v[`x${i}`], v[`y${i}`]], de: (x, y) => [x, y] })),
    ok: (v, p) => p.els.every((e, i) => DON(v[`x${i}`], v[`y${i}`]) === e.z),
    sol: p => { const n = [0, 0, 0, 0]; return Object.assign({}, ...p.els.map((e, i) => { const [x, y] = SITIO[e.z][n[e.z]++]; return { [`x${i}`]: x, [`y${i}`]: y }; })); },
    texto: p => p.els.map(e => `${e.t} ${NZ[e.z]}`).join('; '), alto: () => 226, ms: 500, pie: 'Arrastra cada número a su zona.',
    dib: (v, K, p, f) => venn(K) + K.t(60, 30, p.a, 's ta') + K.t(280, 30, p.b, 's tg') + (f ? p.els.map((e, i) => { const x = v[`x${i}`], y = v[`y${i}`]; return K.f(f, K.c(x, y, 16, DON(x, y) === e.z ? 'fo' : 'ff') + K.t(x, y + 5, e.t, 'b')); }).join('') : ''),
    aviso(v, p) { const f = p.els.find((e, i) => DON(v[`x${i}`], v[`y${i}`]) < 0); if (f) return `El ${f.t} quedó fuera del recuadro: todos van en alguna zona.`; const i = p.els.findIndex((e, k) => DON(v[`x${k}`], v[`y${k}`]) !== e.z); return `El ${p.els[i].t} quedó ${NZ[DON(v[`x${i}`], v[`y${i}`])]}: ${p.pr}`; }, bien: (v, p) => 'Cada número cayó en una sola zona.',
  });
  const ORD = ['o', 'a', 'i', 'b'], PZ = { o: [46, 152], a: [100, 92], i: [170, 92], b: [240, 92] };
  XG.marca('pinta-operacion', {
    sitios: () => ORD.map(k => ({ x: PZ[k][0], y: PZ[k][1], w: 36, h: 34 })), alto: () => 184, nombre: (p, i) => ['afuera', 'solo A', 'los dos', 'solo B'][i],
    cara: (K, p, i, on) => { const k = ORD[i]; return (k === 'o' ? K.r(16, 8, 308, 168, on ? 'fa' : 'fc', 10) : pz(k, 'fop', 170, 92, 66, 40) + pz(k, on ? 'fa' : 'fn', 170, 92, 66, 40)) + (k === 'b' ? K.t(66, 34, 'A', 'b ta') + K.t(274, 34, 'B', 'b tg') : '') + `<rect class="caja" x="${PZ[k][0] - 18}" y="${PZ[k][1] - 17}" width="36" height="34" rx="10"/>` + K.t(PZ[k][0], PZ[k][1] + 6, on ? '✓' : '·', 'b'); },   // la caja va encima: la zona la taparía
    sol: p => idx(4, i => p.zonas.includes(ORD[i])), aviso(on, p) { return p.mira[ORD[on.findIndex((x, i) => x !== p.zonas.includes(ORD[i]))]]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca las zonas.',
  });
  XG.rotula('nombra-dibujo', {
    slots: () => [0, 1, 2, 3].map(i => ({ x: 88 + (i % 2) * 164, y: 84 + Math.floor(i / 2) * 100, w: 92, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 204, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.ks.map((ks, i) => mini(K, ks, 88 + (i % 2) * 164, 34 + Math.floor(i / 2) * 100)).join(''),
  });
  XG.cuenta('zonas-y-total', 66, K => K.c(150, 32, 30, 'fa') + K.c(190, 32, 30, 'fg') + K.t(112, 20, 'A', 's ta', 'end') + K.t(228, 20, 'B', 's tg', 'start'));
  XG.frases('ciertas-siempre');
  XG.marca('elementos-de', {
    sitios: p => p.nums.map((_, i) => ({ x: 38 + (i % 5) * 66, y: 34 + Math.floor(i / 5) * 60, w: 56, h: 48 })), cara: (K, p, i) => K.t(38 + (i % 5) * 66, 41 + Math.floor(i / 5) * 60, p.nums[i], 'b'), alto: () => 128,
    sol: p => idx(p.nums.length, i => p.si(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.si(p.nums[k])); return i < 0 ? 'Falta otro: recorre los de A uno por uno.' : !p.A.includes(p.nums[i]) ? `El ${p.nums[i]} no está en A, y de A se parte.` : `El ${p.nums[i]} está en A, pero es de los que se quitan.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.si).join(', '), pie: 'Toca los elementos que quedan.',
  });
  XG.frases('misma-zona');
  XG.ascensor('sube-union', 40, 1, neutro);

  // -------------------------------------------------------------------------------------------------------------- pu-cj-2 · encuestas
  XG.rotula('llena-encuesta', {
    slots: () => [{ x: 98, y: 92, w: 46 }, { x: 170, y: 92, w: 44 }, { x: 242, y: 92, w: 46 }, { x: 46, y: 154, w: 46, h: 34 }].map(s => ({ h: 40, ...s })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 184, fondo: (K, p) => venn(K) + K.t(60, 28, p.a, 's ta') + K.t(280, 28, p.b, 's tg'),
    aviso: (q, p) => { const i = [1, 0, 2, 3].find(k => q[k][0] !== p.metas[k]); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; }, bien: p => p.ok,   // se llena desde el centro
  });
  XG.figura('corre-solape', {
    ini: () => ({ s: 0 }), manijas: p => [{ k: 's', min: 0, max: p.b, paso: 1, rot: v => R(v.s), en: v => [24 + (p.a + p.b - v.s) * 290 / (p.a + p.b), 118], de: x => p.a + p.b - (x - 24) * (p.a + p.b) / 290 }], ok: (v, p) => p.a + p.b - v.s + p.n === p.T, sol: p => ({ s: p.a + p.b + p.n - p.T }), texto: p => `${p.a + p.b + p.n - p.T}`, alto: () => 168, ms: 900, pie: 'Corre la barra de abajo: la ficha dice cuántos se solapan.',
    dib(v, K, p, f) { const u = 290 / (p.a + p.b), xb = 24 + (p.a - v.s) * u; return K.r(24, 40, p.a * u, 34, 'fa') + K.t(30, 62, `${p.na}: ${p.a}`, 's', 'start') + K.r(xb, 84, p.b * u, 34, 'fg') + K.t(xb + 8, 106, `${p.nb}: ${p.b}`, 's', 'start') + (v.s > 0.3 ? K.r(xb, 40, v.s * u, 78, 'ff d') : '') + K.f(f, K.l(24 + (p.T - p.n) * u, 26, 24 + (p.T - p.n) * u, 128, 'lo gr') + K.t(24 + (p.T - p.n) * u, 20, `${p.T - p.n} hacen alguna`, 's')); },
    aviso: (v, p) => `Así harían algo ${p.a + p.b - v.s}, y con los ${p.n} que no hacen ninguna serían ${p.a + p.b - v.s + p.n} personas.`, bien: (v, p) => `${p.a} + ${p.b} − ${v.s} = ${p.T - p.n}.`,
  });
  const C3 = [[138, 66], [202, 66], [170, 120]], tres = (K, p) => K.c(...C3[0], 54, 'fa') + K.c(...C3[1], 54, 'fg') + K.c(...C3[2], 54, 'ff') + K.t(76, 22, p.e[0], 's ta', 'end') + K.t(264, 22, p.e[1], 's tg', 'start') + K.t(232, 164, p.e[2], 's tf', 'start');
  const Z3 = [[170, 46], [133, 102], [207, 102], [104, 54], [236, 54], [170, 152], [170, 80], [40, 140]];
  XG.rotula('tres-circulos', {
    slots: () => Z3.slice(0, 6).map(([x, y]) => ({ x, y, w: 36, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 178, fondo: (K, p) => tres(K, p) + K.t(170, 87, p.c, 'b'), aviso: avisa, bien: p => p.ok,
  });
  XG.marca('pinta-tres', {
    sitios: () => Z3.map(([x, y]) => ({ x, y, w: 32, h: 30 })), cara: (K, p, i, on) => K.t(Z3[i][0], Z3[i][1] + 6, on ? '✓' : '·', 'b'), alto: () => 180, nombre: (p, i) => ['A y B', 'A y C', 'B y C', 'solo A', 'solo B', 'solo C', 'los tres', 'ninguno'][i], fondo: (K, p) => tres(K, p),
    sol: p => p.zonas, aviso(on, p) { return p.mira[on.findIndex((x, i) => x !== p.zonas.includes(i))]; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca todas las zonas que cumplen.',
  });
  XG.rotula('lee-encuesta', {
    slots: p => p.metas.map((_, i) => ({ x: 306, y: 26 + i * 48, w: 52, h: 38 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '), alto: () => 196, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.r(4, 34, 156, 130, 'fc', 8) + K.c(62, 94, 42, 'fa') + K.c(102, 94, 42, 'fg') + K.t(24, 52, 'A', 's ta') + K.t(140, 52, 'B', 's tg') + [[40, 94], [82, 94], [124, 94], [24, 152]].map(([x, y], i) => K.t(x, y + (i < 3 ? 6 : 0), p.z[i], 'b')).join('') + p.et.map((t, i) => K.t(274, 31 + i * 48, t, 's', 'end')).join(''),
  });
  XG.cuenta('desde-los-totales', 62, (K, p) => K.c(150, 30, 28, 'fa') + K.c(190, 30, 28, 'fg') + K.t(112, 35, p.a, 's ta', 'end') + K.t(228, 35, p.b, 's tg', 'start'));
  XG.cuenta('porciento-comun', 62, (K, p) => K.c(150, 30, 28, 'fa') + K.c(190, 30, 28, 'fg') + K.t(112, 35, p.a, 's ta', 'end') + K.t(228, 35, p.b, 's tg', 'start'));
  XG.ascensor('sube-encuesta', 60, 1, neutro);
})();
;
//#archivo js/games/numeros-escena.js
// Ejercicios de «Teoría de números» (pu-nu-1 a pu-nu-3) con las escenas de la explicación: el árbol de primos, los criterios, los saltos que
// coinciden, las baldosas y los residuos. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f), cifras = n => [...String(n)].reduce((a, c) => a + +c, 0);
  const divisor = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return 0; }, primo = n => n > 1 && !divisor(n);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a hacer la cuenta.', 'Le faltó. Vuelve a hacer la cuenta.'];
  const G3 = i => [62 + (i % 3) * 108, 34 + Math.floor(i / 3) * 60], G5 = i => [38 + (i % 5) * 66, 34 + Math.floor(i / 5) * 60];

  // ------------------------------------------------------------------------------------------------- pu-nu-1 · primos y divisibilidad
  XG.marca('toca-primos', {
    sitios: p => p.nums.map((_, i) => ({ x: G3(i)[0], y: G3(i)[1], w: 92, h: 48 })), cara: (K, p, i) => K.t(G3(i)[0], G3(i)[1] + 7, p.nums[i], 'b'), alto: () => 128, sol: p => idx(p.nums.length, i => primo(p.nums[i])),
    aviso(on, p) { const i = on.findIndex((x, k) => x && !primo(p.nums[k])), n = p.nums[i]; return i < 0 ? 'Falta otro que solo se acomoda en una fila.' : n === 1 ? 'El 1 tiene un solo divisor: no es primo.' : `El ${n} se acomoda en filas: ${divisor(n)} · ${n / divisor(n)}.`; }, bien: p => p.ok, texto: p => p.nums.filter(primo).join(', '), pie: 'Toca todos los primos.',
  });
  XG.rotula('arbol-primos', {
    slots: () => [[84, 58], [178, 58], [132, 108], [226, 108], [180, 158], [274, 158]].map(([x, y]) => ({ x, y, w: 48, h: 36 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.filter((_, i) => i !== 1 && i !== 3).join(' · '), alto: () => 180, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(131, 26, p.n, 'B ta') + [[131, 30, 58], [178, 76, 108], [226, 126, 158]].map(([x, a, y]) => K.l(x - 8, a, x - 38, y - 20, 'lm') + K.l(x + 8, a, x + 38, y - 20, 'lm')).join(''),
  });
  XG.cuenta('opciones-divisor', 56, (K, p) => K.t(170, 38, p.s, 'B ta'));
  XG.marca('cifra-que-falta', {
    sitios: () => Array.from({ length: 10 }, (_, i) => ({ x: G5(i)[0], y: G5(i)[1] + 40, w: 56, h: 44 })), cara: (K, p, i) => K.t(G5(i)[0], G5(i)[1] + 46, i, 'b'), alto: () => 162, fondo: (K, p) => K.t(170, 30, `${p.a} _`, 'B ta'), nombre: (p, i) => `cifra ${i}`,
    sol: p => idx(10, d => (p.a.replace(/\D/g, '') * 10 + d) % p.by === 0), aviso(on, p) { const n = d => p.a.replace(/\D/g, '') * 10 + d, i = on.findIndex((x, d) => x && n(d) % p.by); return i < 0 ? 'Falta otra cifra que también sirve.' : i % 2 ? `Con ${i} queda impar.` : `Con ${i} las cifras suman ${cifras(n(i))}, que no es múltiplo de 3.`; }, bien: p => p.ok, texto: p => idx(10, d => (p.a.replace(/\D/g, '') * 10 + d) % p.by === 0).join(' y '), pie: 'Toca todas las cifras que sirven.',
  });
  const CX = j => 130 + j * 56, CY = i => 60 + i * 50;
  XG.marca('tabla-criterios', {
    sitios: p => p.f.flatMap((_, i) => p.c.map((_, j) => ({ x: CX(j), y: CY(i), w: 48, h: 42 }))), cara: (K, p, k, on) => K.t(CX(k % p.c.length), CY(Math.floor(k / p.c.length)) + 6, on ? '✓' : '·', 'b'), alto: p => CY(p.f.length - 1) + 28, nombre: (p, k) => `${p.f[Math.floor(k / p.c.length)]} entre ${p.c[k % p.c.length]}`,
    fondo: (K, p) => K.t(50, 22, 'entre', 's tm') + p.c.map((c, j) => K.t(CX(j), 24, c, 'b ta')).join('') + p.f.map((n, i) => K.t(84, CY(i) + 6, n, 'b', 'end')).join(''),
    sol: p => idx(p.f.length * p.c.length, k => p.f[Math.floor(k / p.c.length)] % p.c[k % p.c.length] === 0), aviso(on, p) { const m = p.c.length, k = on.findIndex((x, k) => x !== (p.f[Math.floor(k / m)] % p.c[k % m] === 0)), n = p.f[Math.floor(k / m)], d = p.c[k % m]; return d === 3 || d === 9 ? `Las cifras de ${n} suman ${cifras(n)}: ¿es múltiplo de ${d}?` : d === 4 ? `Las dos últimas cifras de ${n} son ${String(n % 100).padStart(2, '0')}: ¿es múltiplo de 4?` : `Mira en qué termina ${n}.`; }, bien: p => p.ok, texto: p => p.f.map(n => `${n} entre ${p.c.filter(d => n % d === 0).join(', ')}`).join('; '), pie: 'Toca las casillas en las que la división es exacta.',
  });
  XG.frases('siempre-multiplo'); XG.frases('basta-con');
  XG.ascensor('sube-divisores', 40, 1, neutro);

  // ------------------------------------------------------------------------------------------------------------- pu-nu-2 · MCM y MCD
  XG.figura('saltos-cada-una', {
    ini: () => ({ x: 1, y: 1 }), manijas: p => [{ k: 'x', min: 1, max: p.max, paso: 1, et: `saltos de la que avanza ${p.a}` }, { k: 'y', min: 1, max: p.max, paso: 1, et: `saltos de la que avanza ${p.b}` }], ok: (v, p) => { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return v.x * p.a === t && v.y * p.b === t; }, sol(p) { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return { x: t / p.a, y: t / p.b }; }, texto(p) { for (let t = p.a; ; t += p.a) if (t % p.b === 0) return `${t / p.a} y ${t / p.b} saltos, en el ${t}`; }, alto: () => 206, ms: 1100, pie: 'Mueve los saltos de cada rana.',
    dib(v, K, p, f) { const M = Math.max(p.a, p.b) * p.max, X = t => 20 + t * 300 / M; return [[p.a, v.x, 40, 'la', 'fA', 'ta'], [p.b, v.y, 86, 'lg', 'fG', 'tg']].map(([m, n, y, l, c, tc]) => { let h = K.l(X(0), y, X(M), y, 'lm') + K.c(X(0), y, 5, c) + K.t(X(M), y - 24, `de ${m} en ${m}`, `s ${tc}`, 'end'), k = f * n; for (let i = 0; i < Math.floor(k + 1e-6); i++) h += `<path class="xl ${l}" d="M${K.n(X(i * m))} ${y} Q${K.n(X((i + 0.5) * m))} ${y - 20} ${K.n(X((i + 1) * m))} ${y}"/>`; return h + (f >= 1 ? K.c(X(R(n) * m), y, 5, c) + K.t(X(R(n) * m), y + 18, R(n) * m, 's') : ''); }).join(''); },
    aviso: (v, p) => (v.x * p.a === v.y * p.b ? `Coinciden en el ${v.x * p.a}, pero ya habían coincidido antes.` : `Una llega al ${v.x * p.a} y la otra al ${v.y * p.b}: no es el mismo lugar.`), bien: (v, p) => `Las dos llegan al ${v.x * p.a}, y antes no coinciden.`,
  });
  XG.cuenta('paquetes-iguales', 56, K => Array.from({ length: 9 }, (_, i) => K.r(30 + i * 32, 4, 24, 18, 'fa', 5) + K.c(42 + i * 32, 38, 9, 'fg')).join(''));
  XG.rotula('exponentes-mcd', {
    slots: () => [[150, 118], [214, 118], [150, 178], [214, 178]].map(([x, y]) => ({ x, y: y - 14, w: 36, h: 32 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 192, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => K.t(170, 28, p.n[0], 'b ta') + K.t(170, 60, p.n[1], 'b tg') + [['MCD =', 122, ''], ['MCM =', 182, p.r]].map(([t, y, r]) => K.t(96, y, t, 'b', 'end') + K.t(122, y, '2', 'b') + K.t(176, y, '·', 'b') + K.t(189, y, '3', 'b') + K.t(240, y, r, 'b', 'start')).join(''),
  });
  XG.renglones('cual-de-los-dos', { w: 60, x: 306 });
  XG.figura('baldosa-mayor', {
    ini: () => ({ s: 1 }), manijas: p => [{ k: 's', min: 1, max: p.max, paso: 1, et: 'lado de la baldosa' }], ok: (v, p) => p.a % v.s === 0 && p.b % v.s === 0 && !idx(p.a + 1, d => d > v.s && p.a % d === 0 && p.b % d === 0).length, sol(p) { let m = 1; for (let d = 1; d <= p.a; d++) if (p.a % d === 0 && p.b % d === 0) m = d; return { s: m }; }, texto(p) { let m = 1; for (let d = 1; d <= p.a; d++) if (p.a % d === 0 && p.b % d === 0) m = d; return `lado ${m}`; }, alto: () => 192, ms: 1200, pie: 'Mueve el lado.',
    dib(v, K, p, f) { const u = Math.min(260 / p.b, 112 / p.a), x0 = 170 - p.b * u / 2, y0 = 12, s = R(v.s), nx = Math.floor(p.b / s), ny = Math.floor(p.a / s); let h = K.r(x0, y0, p.b * u, p.a * u, f >= 1 && (p.a % s || p.b % s) ? 'ff' : 'fc', 0); const n = f ? Math.ceil(f * nx * ny) : 1; for (let i = 0; i < n; i++) h += K.r(x0 + (i % nx) * s * u, y0 + Math.floor(i / nx) * s * u, s * u, s * u, 'fa', 0); return h + K.t(x0 - 8, y0 + p.a * u / 2 + 5, p.a, 's', 'end') + K.t(170, y0 + p.a * u + 16, p.b, 's'); },
    aviso: (v, p) => (p.b % v.s ? `A lo largo sobran ${p.b % v.s}.` : p.a % v.s ? `A lo ancho sobran ${p.a % v.s}.` : 'Cabe exacta, pero hay otra más grande que también.'), bien: (v, p) => `${p.b / v.s} por ${p.a / v.s} baldosas, sin cortar ninguna.`,
  });
  XG.cuenta('producto-mcd', 56, (K, p) => K.t(170, 36, p.s, 'b ta'));
  XG.cuenta('hora-del-cruce', 60, (K, p) => [[110, p.a, 'fa'], [230, p.b, 'fg']].map(([x, t, c]) => K.r(x - 46, 10, 92, 34, c, 8) + K.c(x - 24, 46, 7, 'fk') + K.c(x + 24, 46, 7, 'fk') + K.t(x, 32, t, 's')).join(''));
  XG.ascensor('sube-mcm', 120, 2, neutro);

  // -------------------------------------------------------------------------------------- pu-nu-3 · paridad, residuos y última cifra
  XG.frases('siempre-par');
  XG.figura('dos-residuos', {
    ini: p => ({ n: p.min }), manijas: p => [{ k: 'n', min: p.min, max: p.max, paso: 1, et: 'número' }], ok: (v, p) => p.c.every(([d, r]) => v.n % d === r), sol(p) { for (let n = p.min; n <= p.max; n++) if (p.c.every(([d, r]) => n % d === r)) return { n }; return null; }, texto(p) { for (let n = p.min; n <= p.max; n++) if (p.c.every(([d, r]) => n % d === r)) return `${n}`; return ''; }, alto: () => 182, ms: 900, pie: 'Mueve el número.',
    dib(v, K, p, f) { const n = R(v.n); return p.c.map(([d, r], k) => { const y = 14 + k * 58, q = Math.floor(n / d), g = Math.min(8, 300 / (n + q + 2)); let h = K.t(20, y, `en grupos de ${d}`, 's tm', 'start'), x = 24; for (let i = 0; i < n; i++) { if (f && i && i % d === 0) x += g * 0.9 * Math.min(1, f); h += K.c(x, y + 18, g * 0.4, f >= 1 && i >= q * d ? 'fF' : 'fA'); x += g; } return h + (f >= 1 ? K.t(320, y + 38, `sobran ${n % d}`, n % d === r ? 's to' : 's tf', 'end') : ''); }).join(''); },
    aviso: (v, p) => `El ${v.n} deja ${v.n % p.c[0][0]} entre ${p.c[0][0]} y ${v.n % p.c[1][0]} entre ${p.c[1][0]}.`, bien: (v, p) => `${v.n} cumple las dos condiciones.`,
  });
  XG.cuenta('opera-residuos', 50, (K, p) => K.t(170, 34, p.s, 'B ta'));
  XG.rotula('ciclo-ultima', {
    slots: p => p.metas.map((_, i) => ({ x: 84 + i * 56, y: 78, w: 48, h: 40 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 112, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => p.et.map((t, i) => K.t(28 + i * 56, 36, t, 'b ta')).join('') + K.t(28, 84, p.a, 'b') + K.l(6, 48, 336, 48, 'lm'),
  });
  const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], ang = k => 90 - k * 360 / 7;
  XG.figura('rueda-semana', {
    ini: p => ({ k: p.hoy }), manijas: () => [{ k: 'k', min: 0, max: 6, paso: 1, r: 12, en: v => { const a = ang(v.k) * Math.PI / 180; return [170 + 46 * Math.cos(a), 104 - 46 * Math.sin(a)]; }, de: (x, y) => { const g = Math.atan2(104 - y, x - 170) * 180 / Math.PI; return Math.round(((90 - g + 360) % 360) / (360 / 7)) % 7; } }], ok: (v, p) => v.k === (p.hoy + p.n) % 7, sol: p => ({ k: (p.hoy + p.n) % 7 }), texto: p => DIAS[(p.hoy + p.n) % 7], alto: () => 208, ms: 1300, pie: 'Gira la aguja hasta el día.',
    dib(v, K, p, f) { const k = R(v.k); return K.c(170, 104, 94, 'fc') + DIAS.map((d, i) => { const [x, y] = K.at(170, 104, 74, ang(i)); return K.c(x, y, 19, i === p.hoy ? 'fg' : f >= 1 && i === k ? (k === (p.hoy + p.n) % 7 ? 'fo' : 'ff') : 'fn') + K.t(x, y + 4, d, 's'); }).join('') + K.l(170, 104, ...K.at(170, 104, 46, ang(v.k)), 'la gr') + K.c(170, 104, 6, 'fA') + K.t(20, 20, 'hoy', 's tg', 'start') + K.c(12, 16, 5, 'fG'); },
    aviso: (v, p) => `De ${DIAS[p.hoy]} a ${DIAS[v.k]} se avanzan ${(v.k - p.hoy + 7) % 7} días, además de las semanas completas.`, bien: p => 'Las semanas completas no cambian el día: solo cuenta lo que sobra.',
  });
  XG.cuenta('ultima-por-partes', 50, (K, p) => K.t(170, 34, p.s, 'B ta'));
  XG.cuenta('arma-dividendo', 50, (K, p) => K.t(170, 34, p.s, 'b ta'));
  XG.ascensor('sube-sobrante', 30, 1, neutro);
})();
;
//#archivo js/games/probabilidad-escena.js
// Ejercicios de «Probabilidad» (pu-pb-1 y pu-pb-2) con las escenas de la explicación: la ruleta, las urnas, la tabla de dos dados, la escala
// de 0 a 1, el cuadro de casillas y la bolsa que cambia. Armazones en figura-kit, logica-kit, conteo-escena y proposiciones-escena.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100), idx = (n, f) => Array.from({ length: n }, (_, i) => i).filter(f);
  const avisa = (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const neutro = ['Se pasó. Vuelve a contar.', 'Le faltó. Vuelve a contar.'];
  const bolas = (K, n, k, x, y, cols, cls) => Array.from({ length: R(n) }, (_, i) => K.c(x + (i % cols) * 22, y + Math.floor(i / cols) * 22, 9, i < k ? 'fF' : cls || 'fA')).join('');

  // -------------------------------------------------------------------------------------------- pu-pb-1 · espacio muestral y Laplace
  const RU = (i, n, r) => { const a = (90 - (i + 0.5) * 360 / n) * Math.PI / 180; return [170 + r * Math.cos(a), 104 - r * Math.sin(a)]; };
  XG.marca('ruleta-favorables', {
    sitios: p => p.nums.map((_, i) => { const [x, y] = RU(i, p.nums.length, 70); return { x, y, w: 36, h: 36, red: true }; }), cara: (K, p, i) => { const [x, y] = RU(i, p.nums.length, 70); return K.t(x, y + 6, p.nums[i], 'b'); }, alto: () => 208,
    fondo: (K, p) => K.c(170, 104, 100, 'fc') + p.nums.map((_, i) => K.l(170, 104, ...K.at(170, 104, 100, 90 - i * 360 / p.nums.length), 'lm')).join(''),
    sol: p => idx(p.nums.length, i => p.f(p.nums[i])), aviso(on, p) { const i = on.findIndex((x, k) => x && !p.f(p.nums[k])); return i < 0 ? 'Falta otro: basta con que cumpla una de las dos cosas.' : `El ${p.nums[i]} no cumple ninguna de las dos cosas.`; }, bien: p => p.ok, texto: p => p.nums.filter(p.f).join(', '), pie: 'Toca todos los favorables.',
  });
  XG.figura('iguala-urnas', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'verdes en la urna B' }], ok: (v, p) => p.b * p.t === p.a * (p.b + v.x), sol: p => ({ x: p.b * p.t / p.a - p.b }), texto: p => `${p.b * p.t / p.a - p.b} verdes`, alto: () => 196, ms: 900, pie: 'Echa verdes en la urna B.',
    dib: (v, K, p, f) => K.r(12, 24, 148, 98, 'fn', 14) + K.r(180, 24, 148, 98, 'fn', 14) + K.t(86, 16, 'urna A', 's tm') + K.t(254, 16, 'urna B', 's tm') + bolas(K, p.t, p.a, 30, 42, 6) + bolas(K, p.b + R(v.x), p.b, 198, 42, 6) + K.f(f, K.t(86, 140, `${p.a}/${p.t}`, 'b') + K.t(254, 140, `${p.b}/${p.b + R(v.x)}`, 'b')),
    aviso: (v, p) => `En la B quedan ${p.b} naranjas de ${p.b + v.x}, y esa parte es ${p.b * p.t > p.a * (p.b + v.x) ? 'mayor' : 'menor'} que ${p.a} de ${p.t}.`, bien: (v, p) => `${p.a} de ${p.t} es la misma parte que ${p.b} de ${p.b + v.x}.`,
  });
  const DX = j => 64 + j * 48, DY = i => 42 + i * 32;
  XG.marca('tabla-diferencia', {
    sitios: () => idx(36, () => true).map(k => ({ x: DX(k % 6), y: DY(Math.floor(k / 6)), w: 44, h: 30 })), cara: (K, p, k, on) => K.t(DX(k % 6), DY(Math.floor(k / 6)) + 5, on ? '✓' : '·', 'b'), alto: () => 220, nombre: (p, k) => `${Math.floor(k / 6) + 1} y ${k % 6 + 1}`,
    fondo: K => [1, 2, 3, 4, 5, 6].map(n => K.t(DX(n - 1), 20, n, 's ta') + K.t(24, DY(n - 1) + 5, n, 's tg')).join(''),
    sol: p => idx(36, k => p.f(Math.floor(k / 6) + 1, k % 6 + 1)), aviso(on, p) { const k = on.findIndex((x, i) => x && !p.f(Math.floor(i / 6) + 1, i % 6 + 1)); return k < 0 ? 'Faltan parejas: recuerda que cada una sale también al revés.' : `Con ${Math.floor(k / 6) + 1} y ${k % 6 + 1} la diferencia es ${Math.abs(Math.floor(k / 6) - k % 6)}.`; }, bien: p => p.ok, texto: p => p.texto, pie: 'Fila: primer dado. Columna: segundo dado.',
  });
  XG.renglones('cuantas-parejas', { w: 64, x: 270 });
  XG.renglones('cero-a-uno', { w: 60, x: 274 });
  XG.figura('punto-escala', {
    ini: () => ({ x: 0 }), manijas: () => [{ k: 'x', min: 0, max: 1, paso: 0.05, r: 12, en: v => [30 + v.x * 280, 112], de: x => (x - 30) / 280 }], ok: (v, p) => Math.abs(v.x - p.k / p.n) < 1e-9, sol: p => ({ x: p.k / p.n }), texto: p => `${p.k}/${p.n} = ${N(p.k / p.n)}`, alto: () => 152, ms: 900, pie: 'Arrastra el punto.',
    dib: (v, K, p, f) => bolas(K, p.n, p.k, 170 - (p.n - 1) * 11, 24, 20) + K.l(30, 112, 310, 112, 'gr') + [['0', 0], ['1/2', 0.5], ['1', 1]].map(([t, x]) => K.l(30 + x * 280, 106, 30 + x * 280, 118) + K.t(30 + x * 280, 142, t)).join('') + Array.from({ length: 21 }, (_, i) => K.l(30 + i * 14, 109, 30 + i * 14, 115, 'lm')).join('') + K.t(30, 84, 'imposible', 's tm') + K.t(306, 84, 'seguro', 's tm') + K.f(f, K.t(Math.max(30, Math.min(300, 30 + v.x * 280)), 66, N(v.x), 'b')),
    aviso: (v, p) => `Pusiste ${N(v.x)}: así sería más ${v.x > p.k / p.n ? 'fácil' : 'difícil'} de lo que es. Compara las naranjas con todas las bolas.`, bien: (v, p) => `${p.k} de ${p.n} es ${N(v.x)}.`,
  });
  XG.cuenta('grupo-gafas', 62, (K, p) => Array.from({ length: p.n }, (_, i) => { const m = i < p.m, g = m ? i < p.mg : i - p.m < p.hg, x = 34 + (i % 15) * 19.4, y = 12 + Math.floor(i / 15) * 32; return K.c(x, y, 8, m ? 'fa' : 'fg') + (g ? K.l(x - 6, y - 1, x + 6, y - 1, 'gr') : ''); }).join(''));
  XG.ascensor('sube-favorables', 40, 1, neutro);

  // ----------------------------------------------------------------------------------------- pu-pb-2 · complemento e independencia
  XG.renglones('lo-que-falta', { w: 64, x: 284 });
  const GX = j => 84 + j * 50, GY = i => 52 + i * 42;
  XG.marca('cruce-sin-b', {
    sitios: p => idx(p.c * p.f, () => true).map(k => ({ x: GX(k % p.c), y: GY(Math.floor(k / p.c)), w: 46, h: 38 })), cara: (K, p, k, on) => K.t(GX(k % p.c), GY(Math.floor(k / p.c)) + 6, on ? '✓' : '·', 'b'), alto: p => GY(p.f - 1) + 26, nombre: (p, k) => `${k % p.c < p.a ? 'A' : 'no A'} y ${Math.floor(k / p.c) < p.b ? 'B' : 'no B'}`,
    fondo: (K, p) => idx(p.c, () => true).map(j => K.t(GX(j), 24, j < p.a ? 'A' : 'no A', j < p.a ? 's ta' : 's tm')).join('') + idx(p.f, () => true).map(i => K.t(50, GY(i) + 5, i < p.b ? 'B' : 'no B', i < p.b ? 's tg' : 's tm', 'end')).join(''),
    sol: p => idx(p.c * p.f, k => k % p.c < p.a && Math.floor(k / p.c) >= p.b), aviso(on, p) { const k = on.findIndex((x, i) => x && !(i % p.c < p.a && Math.floor(i / p.c) >= p.b)); return k < 0 ? 'Faltan casillas que están en A y no en B.' : k % p.c >= p.a ? 'Marcaste una columna en la que A no pasa.' : 'Marcaste una fila en la que B sí pasa.'; }, bien: p => p.ok, texto: p => p.texto, pie: 'Toca las casillas.',
  });
  XG.cuenta('fallan-todos', 52, (K, p) => [[110, p.x, 'fa'], [230, p.y, 'fg']].map(([x, t, c]) => K.r(x - 50, 8, 100, 36, c, 8) + K.t(x, 31, t, 's')).join(''));
  XG.frases('no-se-afectan');
  XG.rotula('arbol-bolsa', {
    slots: () => [36, 80, 126, 170].map(y => ({ x: 236, y, w: 56, h: 36 })), fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join(', '), alto: () => 198, aviso: avisa, bien: p => p.ok,
    fondo: (K, p) => bolas(K, p.n + p.v, p.n, 18, 88, 3) + K.l(82, 103, 126, 58, 'lm') + K.l(82, 103, 126, 148, 'lm') + K.c(138, 58, 11, 'fF') + K.c(138, 148, 11, 'fA') + K.t(96, 70, p.p1[0], 's', 'end') + K.t(96, 144, p.p1[1], 's', 'end') + [[58, 36, 'fF'], [58, 80, 'fA'], [148, 126, 'fF'], [148, 170, 'fA']].map(([a, b, c]) => K.l(150, a, 206, b, 'lm') + K.c(290, b, 11, c)).join('') + K.t(138, 16, '1.ª', 's tm') + K.t(290, 16, '2.ª', 's tm'),
  });
  XG.renglones('devuelve-o-no', { w: 64, x: 290 });
  XG.figura('falla-cuadrado', {
    ini: () => ({ q: 0.9 }), manijas: () => [{ k: 'q', min: 0.02, max: 1, paso: 0.02, et: 'probabilidad de que falle uno' }], ok: (v, p) => Math.abs(1 - v.q * v.q - p.al) < 1e-9, sol: p => ({ q: Math.sqrt(1 - p.al) }), texto: p => N(Math.sqrt(1 - p.al)), alto: () => 208, ms: 900, pie: 'Mueve la probabilidad de fallar.',
    dib(v, K, p, f) { const L = 130, s = v.q * L; return K.r(105, 14, L, L, 'fa', 2) + K.r(105, 14, s, s, 'ff', 2) + K.t(105 + s / 2, 18 + s / 2, s > 92 ? 'fallan los dos' : '', 's') + K.f(f, K.t(96, 60, N(v.q * v.q), 'b tf', 'end') + K.t(244, 130, N(1 - v.q * v.q), 'b ta', 'start')); },
    aviso: (v, p) => `Fallarían los dos con probabilidad ${N(v.q * v.q)}, y acertaría al menos uno con ${N(1 - v.q * v.q)}.`, bien: (v, p) => `${N(v.q)} · ${N(v.q)} = ${N(v.q * v.q)}, y 1 − ${N(v.q * v.q)} = ${N(p.al)}.`,
  });
  XG.ascensor('sube-por-ciento', 100, 2, neutro);
})();
;
//#archivo js/games/hoja-kit.js
// Kit de los ejercicios de lectura en los que el texto es la escena (spec 2026-11-24-lectura-explora). Va después de
// explora-kit.js y lectura-kit.js. Armazones sobre XG.juego (estado puro; nada dice si va bien hasta comprobar):
//   HOJA.toca(nombre, d)    se tocan trozos del texto (subrayar, tachar).            estado { m: [claves] }
//   HOJA.zonas(nombre, d)   fichas que van al margen o a huecos de la escena.        estado { en: [zona por ficha, −1 = bandeja] }
//   HOJA.pinta(nombre, d)   se pintan oraciones con marcadores.                      estado { c: [marcador por línea, −1] }
//   HOJA.regla(nombre, d)   perillas que recorren palabras que miden.                   estado { v: [tope por fila] }
//   HOJA.hilos(nombre, d)   se tira un hilo de cada tarjeta a un punto del texto.    estado { a: [destino por tarjeta, −1] }
//   HOJA.ordena(nombre, d)  tiras que se mueven hasta que el orden tiene sentido.    estado { o: [índices], t: ya se movió }
// `p.mira[i]` es el aviso de la ficha o tarjeta i cuando quedó mal: cierto en cualquier sitio equivocado y sin dar la respuesta.
// `p.luz` = [[párrafo, trozo literal]]: las palabras que lo prueban, que se encienden al final.
const HOJA = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const luzDe = (t, n, luz = []) => luz.filter(l => l[0] === n).reduce((h, l) => h.replace(esc(l[1]), m => `<mark class="hj-luz">${m}</mark>`), fmt(t));
  const oraciones = (p, n) => (p.trozos?.[n] ? p.trozos[n].split('|') : LEC.sentences(p.doc.paras[n - 1]));
  const parr = (n, dentro, o = {}) => `<div class="hj-p ${o.cls || ''}" data-p="${n}" ${o.attr || ''}><b class="hj-n" aria-label="párrafo ${n}">${n}</b>${o.antes || ''}<p>${dentro}</p></div>`;
  const cabeza = d => `<header class="hj-cab"><h4 data-b="titulo">${esc(d.title)}</h4>${d.ficha ? `<p>${['autor', 'fuente', 'fecha'].map(k => `<span data-b="${k}">${esc(d.ficha[k])}</span>`).join('<i>·</i>')}</p>` : ''}</header>`;
  // La hoja: título y párrafos (todos, o los `nums`). `trozo(n, i, t)` envuelve cada oración.
  function hoja(p, o = {}) {
    const d = p.doc, nums = o.nums || d.paras.map((_, i) => i + 1);
    return `<article class="hj-hoja ${o.cls || ''}" ${o.attr || ''}>${o.cab ?? cabeza(d)}${nums.map(n => parr(n, o.trozo
      ? oraciones(p, n).map((t, i) => o.trozo(n, i, t)).join(p.trozos?.[n] ? '' : ' ') : luzDe(d.paras[n - 1], n, p.luz), o.parr?.(n))).join('')}</article>`;
  }
  // El texto entero, plegado: en el examen siempre se puede volver a él.
  const completo = (d, luz) => (Array.isArray(d) ? d.map((x, i) => completo(x, i ? [] : luz).replace('Ver el texto completo', `Ver el Texto ${['Uno', 'Dos'][i]}`)).join('') : `<details class="hj-todo"><summary>Ver el texto completo</summary>${hoja({ doc: d, luz })}</details>`);
  // Lo tapado tampoco se lee con lector de pantalla hasta que se destapa.
  const tapa = (root, si) => root.querySelectorAll('.hj-hoja.cortina .hj-p, .hj-velo, .hj-queda').forEach(x => (si ? x.setAttribute('aria-hidden', 'true') : x.removeAttribute('aria-hidden')));
  const prende = root => tapa(root, false) || root.querySelectorAll('.hj-luz').forEach((m, i) => { m.style.setProperty('--d', `${i * 260}ms`); m.classList.add('on'); if (!i) aVer(root, m); });
  // En un texto largo, lo primero que se enciende queda a la vista (el aviso tapa la mitad de abajo en el celular).
  const aVer = (root, m) => setTimeout(() => {
    const s = root.isConnected && quienRueda(root); if (!s) return;
    const r = s.getBoundingClientRect(), y = m.getBoundingClientRect().top, fb = document.querySelector('.feedback.show')?.getBoundingClientRect();
    const abajo = fb && fb.left < r.right && fb.right > r.left ? Math.min(r.bottom, fb.top) : r.bottom;
    if (y < r.top + 10 || y > abajo - 30) s.scrollBy({ top: (y - r.top - (abajo - r.top) / 3) / zk(), behavior: quieto() ? 'auto' : 'smooth' });
  }, 700);
  const quieto = () => typeof xpStill === 'function' && xpStill();
  const tactil = () => { if (typeof xpTick === 'function') xpTick(); };

  // Se arrastra la ficha, o se toca la ficha y luego el sitio (dedo, ratón o teclado). Cerca del borde, la hoja se desplaza sola.
  function manos(ui, root, pon) {
    let sel = null;
    const elige = el => { root.querySelectorAll('.hj-sel').forEach(x => x.classList.remove('hj-sel')); sel = el ? el.dataset.f : null; el?.classList.add('hj-sel'); root.querySelectorAll('[data-f]').forEach(x => x.setAttribute('aria-pressed', x === el)); root.classList.toggle('hj-lleva', !!el); };
    XG.arrastra(ui, root, '[data-f]', {
      onDrop: (el, z) => { elige(null); pon(+el.dataset.f, +z.dataset.drop); },
      onTap: el => {
        const z = el.closest('[data-drop]');
        if (sel === el.dataset.f) { elige(null); return pon(+el.dataset.f, -1); }
        if (sel != null && z && z.dataset.drop !== '-1') { const f = +sel; elige(null); return pon(f, +z.dataset.drop); }
        elige(el); XS.tick(2);
      },
    });
    root.addEventListener('click', e => {
      if (ui.locked || root.dataset.dragged || sel == null || e.target.closest('[data-f]')) return;
      const z = e.target.closest('[data-drop]');
      if (z && root.contains(z)) { const f = +sel; elige(null); pon(f, +z.dataset.drop); }
    });
    root.addEventListener('keydown', e => {
      if (ui.locked || e.target.dataset?.drop == null || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.stopPropagation(); e.preventDefault(); e.target.click();
    });
    desplaza(ui, root);
  }
  const quienRueda = root => { const h = root.querySelector('.hj-esc'); return h && h.scrollHeight > h.clientHeight + 6 && getComputedStyle(h).overflowY === 'auto' ? h : root.closest('.lesson-body'); };
  function desplaza(ui, root, llevando = () => !!document.querySelector('.exq-ghost')) {
    let y = 0, t = 0;
    const paso = () => {
      t = 0;
      if (!llevando()) return;
      const s = quienRueda(root); if (!s) return;
      const r = s.getBoundingClientRect(), m = root.querySelector('.hj-mesa')?.getBoundingClientRect();
      const abajo = m && m.top > r.top + 120 && m.left < r.left + 20 && m.top < r.bottom ? m.top : r.bottom;
      const v = y < r.top + 54 ? -7 : y > abajo - 54 && y < abajo ? 7 : 0;
      if (v) s.scrollTop += v;
      t = requestAnimationFrame(paso);
    };
    const mueve = e => { y = e.clientY; if (!t && llevando()) t = requestAnimationFrame(paso); };
    window.addEventListener('pointermove', mueve);
    ui.limpia(() => { window.removeEventListener('pointermove', mueve); cancelAnimationFrame(t); });
  }
  // Se revisa marca por marca: `lista` = [[elemento, si va bien]].
  function revisa(ui, lista, fin) {
    let i = 0;
    const cada = quieto() ? 0 : Math.max(160, Math.min(420, 2200 / Math.max(1, lista.length)));
    (function sig() {
      if (i >= lista.length) return ui.espera(quieto() ? 0 : 380, fin);
      const [el, ok] = lista[i++];
      if (el) { el.classList.add(ok ? 'hj-bien' : 'hj-mal'); if (ok) XS.pop(); else XS.nope(); }
      ui.espera(cada, sig);
    })();
  }
  // Lo que pasa al comprobar, igual en todos: revisar, decir, y si falló mostrar la buena.
  function cierra(ui, ok, { lista, aviso, bien, buena, final }) {
    ui.nota('');
    revisa(ui, lista(), () => {
      if (ok) { final(); return ui.nota(bien); }
      ui.nota(aviso, true);
      ui.espera(2400, () => { buena(); final(); ui.nota(bien); });
    });
  }
  const igual = (c, z) => (c == null ? z === -1 : Array.isArray(c) ? c.includes(z) : c === z);
  const base = c => (c == null ? -1 : Array.isArray(c) ? c[0] : c);

  // ------------------------------------------------------------------------------------------------ fichas a zonas o huecos
  // d: { escena(p) → html con HOJA.zona(i, rótulo); varias; minimo(p); vivo(root, p, s); final(root, p); rot(p, i) }
  // p: { fichas, va: [zona | [zonas] | null por ficha], mira, bien, luz }
  const zona = (i, rot = '', cls = '', nombre = '') => `<span class="hj-z ${cls}" data-drop="${i}" tabindex="0" role="button" data-nom="${esc(nombre || rot || `lugar ${i + 1}`)}" aria-label="${esc(nombre || rot || `lugar ${i + 1}`)}"><span class="hj-dentro" data-z="${i}" data-rot="${esc(rot)}"></span></span>`;
  function zonas(nombre, d) {
    XG.juego(nombre, {
      tipo: 'zonas', varias: !!d.varias, ini: p => ({ en: p.fichas.map(() => -1) }), ok: (s, p) => p.va.every((c, f) => igual(c, s.en[f])),
      listo: (s, p) => s.en.filter(z => z >= 0).length >= p.va.filter(c => c != null).length,
      sol: p => ({ en: p.va.map(base) }), rot: (p, i) => d.rot(p, i),
      texto: p => p.va.map((c, f) => (c == null ? '' : `${d.rot(p, base(c))} → ${p.fichas[f]}`)).filter(Boolean).join(' · '),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre}"><div class="hj-esc">${d.escena(p)}</div><div class="hj-mesa"><div class="hj-band" data-drop="-1" aria-label="fichas"></div></div></div>`;
        const root = stage.firstChild, band = root.querySelector('.hj-band'), orden = LEC.mix(p.fichas);
        tapa(root, true);
        const pinta = () => {
          const s = ui.s, foco = document.activeElement?.dataset?.f;
          const ficha = k => `<button type="button" class="hj-f" data-f="${k}">${esc(p.fichas[k])}</button>`;
          band.innerHTML = orden.filter(k => s.en[k] < 0).map(ficha).join('');
          root.classList.toggle('hj-vacia', !band.innerHTML);
          root.querySelectorAll('[data-z]').forEach(z => {
            const l = orden.filter(k => s.en[k] === +z.dataset.z);
            z.innerHTML = l.map(ficha).join('') || (z.dataset.rot ? `<em>${esc(z.dataset.rot)}</em>` : '');
            z.parentElement.classList.toggle('hj-llena', l.length > 0);
            z.parentElement.setAttribute('aria-label', `${z.parentElement.dataset.nom}${l.length ? `: ${l.map(k => p.fichas[k]).join(', ')}` : ''}`);
          });
          if (foco != null) root.querySelector(`[data-f="${foco}"]`)?.focus({ preventScroll: true });
          d.vivo?.(root, p, s);
        };
        pinta();
        ui.nota(p.ayuda || d.ayuda || 'Arrastra cada ficha, o tócala y luego toca su lugar.');
        manos(ui, root, (f, z) => {
          const en = [...ui.s.en], antes = en[f];
          if (z >= 0 && !d.varias) { const otra = en.findIndex((q, k) => q === z && k !== f); if (otra >= 0) en[otra] = antes; }
          en[f] = z; ui.set({ en }); XS.pop(); tactil(); pinta();
        });
        const el = f => root.querySelector(`[data-f="${f}"]`);
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const malas = p.va.map((c, f) => (igual(c, s.en[f]) ? -1 : f)).filter(f => f >= 0);
          cierra(ui, okk, {
            lista: () => s.en.map((z, f) => [z, f]).filter(x => x[0] >= 0).sort((a, b) => a[0] - b[0]).map(([, f]) => [el(f), !malas.includes(f)]),
            aviso: p.mira?.[malas.find(f => s.en[f] >= 0) ?? malas[0]] || '', bien: p.bien,
            buena() { ui.muestra({ en: p.va.map(base) }); pinta(); p.va.forEach((c, f) => c != null && el(f)?.classList.add('hj-bien')); },
            final() { prende(root); d.final?.(root, p, ui); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------------- tocar trozos
  // d: { escena(p, T) con T(clave, texto) → trozo; claves(p); texto(p); modo: 'subraya' | 'tacha'; ayuda; final }
  // p: { va: [claves], n, mira: { clave: aviso }, falta }
  function toca(nombre, d) {
    XG.juego(nombre, {
      tipo: 'toca', ini: () => ({ m: [] }), claves: p => d.claves(p).map(String),
      listo: (s, p) => (p.n ? s.m.length === p.n : s.m.length > 0),
      ok: (s, p) => [...s.m].sort().join() === p.va.map(String).sort().join(),
      sol: p => ({ m: p.va.map(String) }), texto: p => d.texto(p),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre} hj-toca hj-${d.modo}"><div class="hj-esc">${d.escena(p, (k, t) => `<span class="hj-t" data-k="${k}" role="button" tabindex="0" aria-pressed="false">${fmt(t)}</span>`)}</div></div>`;
        const root = stage.firstChild, q = k => root.querySelector(`.hj-t[data-k="${k}"]`), va = p.va.map(String);
        const pinta = () => {
          root.querySelectorAll('.hj-t').forEach(t => { const on = ui.s.m.includes(t.dataset.k); t.classList.toggle('on', on); t.setAttribute('aria-pressed', on); });
          d.vivo?.(root, p, ui.s);
        };
        const pon = k => {
          if (ui.locked) return;
          const m = ui.s.m.includes(k) ? ui.s.m.filter(x => x !== k) : p.n && ui.s.m.length >= p.n ? [...ui.s.m.slice(1), k] : [...ui.s.m, k];
          ui.set({ m }); XS.pop(); tactil(); pinta();
        };
        root.addEventListener('click', e => { const t = e.target.closest('.hj-t'); if (t) pon(t.dataset.k); });
        root.addEventListener('keydown', e => { const t = e.target.closest?.('.hj-t'); if (t && !ui.locked && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); pon(t.dataset.k); } });
        ui.nota((p.ayuda || d.ayuda || 'Toca una oración para subrayarla; otro toque la suelta.') + (p.n > 1 ? ` Son ${p.n}.` : ''));
        pinta();
        return okk => {
          const m = ui.s.m; root.classList.add('hj-fin');
          const mala = m.find(k => !va.includes(k));
          cierra(ui, okk, {
            lista: () => [...root.querySelectorAll('.hj-t')].filter(t => m.includes(t.dataset.k)).map(t => [t, va.includes(t.dataset.k)]),
            aviso: (mala != null && p.mira?.[mala]) || p.falta || '', bien: p.bien,
            buena() { ui.muestra({ m: va }); pinta(); root.querySelectorAll('.hj-mal').forEach(t => t.classList.remove('hj-mal')); va.forEach(k => q(k)?.classList.add('hj-bien')); },
            final() { prende(root); d.final?.(root, p, ui); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------ pintar con marcadores
  // Se escoge un marcador y se tocan oraciones (o se arrastra el marcador hasta la oración).
  // d: { escena(p, T) }   p: { lineas, plumas, va: [pluma por línea], mira }    estado { c: [pluma por línea, −1 sin pintar] }
  function pinta(nombre, d) {
    XG.juego(nombre, {
      tipo: 'pinta', ini: p => ({ c: p.lineas.map(() => -1) }), listo: s => s.c.every(x => x >= 0),
      ok: (s, p) => s.c.join() === p.va.join(), sol: p => ({ c: [...p.va] }),
      texto: p => p.lineas.map((t, i) => `${t.length > 34 ? `«${t.split(' ').slice(0, 4).join(' ')}…»` : `«${t}»`} → ${p.plumas[p.va[i]]}`).join(' · '),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre} hj-pinta"><div class="hj-esc">${d.escena(p, (i, t) => `<p class="hj-linea" data-drop="${i}" data-l="${i}" tabindex="0" role="button"><span>${fmt(t)}</span><small></small></p>`)}</div><div class="hj-mesa"><div class="hj-band">${p.plumas.map((t, k) => `<button type="button" class="hj-f hj-pluma m${k}" data-f="${k}" aria-pressed="${!k}"><i></i>${esc(t)}</button>`).join('')}</div></div></div>`;
        const root = stage.firstChild, L = i => root.querySelector(`[data-l="${i}"]`);
        let pluma = 0;
        const draw = () => {
          p.lineas.forEach((t, i) => {
            const k = ui.s.c[i], el = L(i);
            el.className = `hj-linea${k >= 0 ? ` m${k}` : ''}`; el.lastChild.textContent = k >= 0 ? p.plumas[k] : '';
            el.setAttribute('aria-label', `${t} ${k >= 0 ? p.plumas[k] : 'sin pintar'}`);
          });
          root.querySelectorAll('.hj-pluma').forEach((b, k) => { b.classList.toggle('hj-sel', k === pluma); b.setAttribute('aria-pressed', k === pluma); });
        };
        const pon = (i, k) => { const c = [...ui.s.c]; c[i] = c[i] === k ? -1 : k; ui.set({ c }); XS.pop(); tactil(); draw(); };
        XG.arrastra(ui, root, '[data-f]', { onDrop: (el, z) => { pluma = +el.dataset.f; if (ui.s.c[+z.dataset.drop] !== pluma) pon(+z.dataset.drop, pluma); else draw(); }, onTap: el => { pluma = +el.dataset.f; XS.tick(pluma * 3); draw(); } });
        const linea = e => (ui.locked || root.dataset.dragged ? null : e.target.closest?.('.hj-linea'));
        root.addEventListener('click', e => { const x = linea(e); if (x) pon(+x.dataset.l, pluma); });
        root.addEventListener('keydown', e => { const x = linea(e); if (x && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); pon(+x.dataset.l, pluma); } });
        desplaza(ui, root);
        draw();
        ui.nota('Escoge un marcador y toca las oraciones; con otro toque se borra.');
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const mala = s.c.findIndex((k, i) => k !== p.va[i]);
          cierra(ui, okk, {
            lista: () => s.c.map((k, i) => [L(i), k === p.va[i]]), aviso: p.mira[mala] || '', bien: p.bien,
            buena() { ui.muestra({ c: [...p.va] }); draw(); p.va.forEach((_, i) => L(i).classList.add('hj-bien')); }, final() { prende(root); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------ ajustar con perillas
  // Cada perilla recorre palabras que miden (algunos … todos) y la oración se escribe sola.
  // d: { tras(p) }   p: { filas: [{ antes, topes, despues, va, ini }], mira }    estado { v: [tope por fila, −1 sin tocar] }
  function regla(nombre, d) {
    const ini = f => f.ini ?? (f.va === 0 ? f.topes.length - 1 : 0);
    XG.juego(nombre, {
      tipo: 'regla', ini: p => ({ v: p.filas.map(ini), t: false }), inicio: ini, listo: s => s.t,
      ok: (s, p) => p.filas.every((f, i) => s.v[i] === f.va), sol: p => ({ v: p.filas.map(f => f.va), t: true }),
      texto: p => p.filas.map(f => `${f.antes} ${f.topes[f.va]}${f.despues ? ` ${f.despues}` : ''}`).join(' · '),
      monta(stage, p, ui) {
        stage.innerHTML = `<div class="hj hj-${nombre} hj-reglas"><div class="hj-esc">${d.cabeza?.(p) || ''}${p.filas.map((f, i) => `<section class="hj-regla" data-i="${i}"><p>${esc(f.antes)} <b></b> ${esc(f.despues || '')}</p><div></div></section>`).join('')}${d.tras(p)}</div></div>`;
        const root = stage.firstChild, S1 = i => root.querySelector(`.hj-regla[data-i="${i}"]`);
        const di = () => p.filas.forEach((f, i) => { S1(i).querySelector('b').textContent = f.topes[ui.s.v[i]]; });
        const ps = p.filas.map((f, i) => XG.perilla(ui, S1(i).lastElementChild, { et: '', min: 0, max: f.topes.length - 1, v: ini(f), cara: () => '', lee: v => f.topes[v], on: v => { const q = [...ui.s.v]; q[i] = v; ui.set({ v: q, t: true }); di(); } }));
        di(); ui.nota('Mueve las perillas: la oración cambia sola.');
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const mala = p.filas.findIndex((f, i) => s.v[i] !== f.va);
          cierra(ui, okk, {
            lista: () => p.filas.map((f, i) => [S1(i), s.v[i] === f.va]), aviso: p.mira[mala] || '', bien: p.bien,
            buena() { ui.muestra({ v: p.filas.map(f => f.va), t: true }); p.filas.forEach((f, i) => { ps[i].set(f.va); S1(i).classList.remove('hj-mal'); S1(i).classList.add('hj-bien'); }); di(); }, final() { prende(root); },
          });
        };
      },
    });
  }

  // ------------------------------------------------------------------------------------------------------- tirar hilos
  // d: { escena(p) con [data-t="i"] en los destinos; destinos(p) → cuántos; rot(p, i) }   p: { tarjetas, va: [destino | [destinos]], mira }
  function hilos(nombre, d) {
    XG.juego(nombre, {
      tipo: 'hilos', ini: p => ({ a: p.tarjetas.map(() => -1) }), listo: s => s.a.every(x => x >= 0),
      ok: (s, p) => p.va.every((c, i) => igual(c, s.a[i])), sol: p => ({ a: p.va.map(base) }), destinos: p => d.destinos(p),
      texto: p => p.tarjetas.map((t, i) => `${t} → ${d.rot(p, base(p.va[i]))}`).join(' · '),
      monta(stage, p, ui) {
        const orden = LEC.mix(p.tarjetas);
        stage.innerHTML = `<div class="hj hj-${nombre} hj-hilos"><div class="hj-esc">${d.escena(p)}</div><div class="hj-mesa"><div class="hj-orig">${orden.map((k, n) => `<button type="button" class="hj-o c${n % 4}" data-o="${k}"><i class="hj-nudo"></i><span>${esc(p.tarjetas[k])}</span></button>`).join('')}</div></div><svg class="hj-svg" aria-hidden="true"></svg></div>`;
        const root = stage.firstChild, svg = root.lastElementChild, escena = root.firstChild, ver = {};
        let dedo = null, sel = null, guia = null;
        tapa(root, true);
        const T = i => root.querySelector(`[data-t="${i}"]`), O = i => root.querySelector(`[data-o="${i}"]`), color = k => `c${orden.indexOf(k) % 4}`;
        const curva = (a, b) => { const m = (a[1] + b[1]) / 2; return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} C${a[0].toFixed(1)} ${m.toFixed(1)} ${b[0].toFixed(1)} ${m.toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
        function pinta() {
          const b = root.getBoundingClientRect(), e = escena.getBoundingClientRect(), dentro = escena.scrollHeight > escena.clientHeight + 6;
          const nudo = k => { const r = O(k).querySelector('.hj-nudo').getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; };
          svg.setAttribute('viewBox', `0 0 ${Math.max(1, b.width)} ${Math.max(1, b.height)}`);
          let g = '';
          p.tarjetas.forEach((_, k) => {
            const t = ui.s.a[k];
            O(k).classList.toggle('on', t >= 0);
            O(k).setAttribute('aria-label', `${p.tarjetas[k]}${t >= 0 ? `, atada a ${d.rot(p, t)}` : ''}`);
            if (t < 0 || !T(t)) return;
            // El hilo llega a la primera línea del destino.
            const r = (T(t).getClientRects()[0] || T(t).getBoundingClientRect()), bloque = getComputedStyle(T(t)).display !== 'inline', rango = orden.indexOf(k);
            const w = bloque ? [r.right - 16 - rango * 18 - b.left, r.top + Math.min(r.height / 2, 16) - b.top] : [r.left + 4 - b.left, r.top + 3 - b.top];   // en los bloques, a la derecha y en abanico: no tapa las letras
            if (dentro) w[1] = XG.clamp(w[1], e.top - b.top + 4, e.bottom - b.top - 4);
            if (!bloque) w[0] += ui.s.a.slice(0, k).filter(x => x === t).length * 14;
            g += `<path class="hj-hilo ${color(k)} ${ver[k] || ''}" d="${curva(nudo(k), w)}"/><circle class="hj-pin ${color(k)} ${ver[k] || ''}" cx="${w[0].toFixed(1)}" cy="${w[1].toFixed(1)}" r="5"/>`;
          });
          if (guia) g += `<path class="hj-hilo vivo" d="${curva(nudo(guia.k), guia.q)}"/>`;
          svg.innerHTML = g;
          root.querySelectorAll('[data-t]').forEach(t => t.classList.toggle('hj-atada', ui.s.a.includes(+t.dataset.t)));
        }
        const pon = (k, t) => { const a = [...ui.s.a]; a[k] = t; ui.set({ a }); XS.pop(); tactil(); pinta(); };
        const elige = k => { sel = k; root.querySelectorAll('.hj-o').forEach(o => { const on = k != null && +o.dataset.o === k; o.classList.toggle('hj-sel', on); o.setAttribute('aria-pressed', on); }); root.classList.toggle('hj-lleva', k != null); };
        const meta = e => { const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-t]'); return t && root.contains(t) ? t : null; };
        root.addEventListener('pointerdown', e => { const o = e.target.closest('.hj-o'); if (!o || ui.locked || dedo) return; dedo = { id: e.pointerId, k: +o.dataset.o, x: e.clientX, y: e.clientY, mov: false }; });
        const mueve = e => {
          if (!dedo || e.pointerId !== dedo.id) return;
          if (!dedo.mov && Math.hypot(e.clientX - dedo.x, e.clientY - dedo.y) < 8) return;
          dedo.mov = true; e.preventDefault();
          const b = root.getBoundingClientRect(), t = meta(e);
          guia = { k: dedo.k, q: [e.clientX - b.left, e.clientY - b.top] };
          root.querySelectorAll('.over').forEach(o => o !== t && o.classList.remove('over'));
          t?.classList.add('over');
          pinta();
        };
        const deja = e => {
          if (!dedo || e.pointerId !== dedo.id) return;
          const g = dedo; dedo = null; guia = null;
          root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
          if (!g.mov) return;
          root.dataset.dragged = '1'; setTimeout(() => { delete root.dataset.dragged; }, 60);
          const t = e.type === 'pointerup' && !ui.locked && meta(e);
          if (t) { elige(null); pon(g.k, +t.dataset.t); } else pinta();
        };
        const oye = [[window, 'pointermove', mueve, { passive: false }], [window, 'pointerup', deja], [window, 'pointercancel', deja], [window, 'resize', pinta], [document, 'scroll', pinta, true], [root, 'toggle', pinta, true]];
        oye.forEach(([o, t, f, c]) => o.addEventListener(t, f, c));
        ui.limpia(() => oye.forEach(([o, t, f, c]) => o.removeEventListener(t, f, c)));
        desplaza(ui, root, () => !!dedo?.mov);
        root.addEventListener('click', e => {
          if (ui.locked || root.dataset.dragged) return;
          const o = e.target.closest('.hj-o'), t = e.target.closest('[data-t]');
          if (o) { XS.tick(2); return elige(sel === +o.dataset.o ? null : +o.dataset.o); }
          if (t && sel != null) { const k = sel; elige(null); pon(k, +t.dataset.t); }
        });
        root.addEventListener('keydown', e => { if (ui.locked || e.target.dataset?.t == null || (e.key !== 'Enter' && e.key !== ' ')) return; e.preventDefault(); e.stopPropagation(); e.target.click(); });
        ui.nota(p.ayuda || d.ayuda || 'Tira un hilo desde cada tarjeta hasta el texto, o toca la tarjeta y luego el texto.');
        ui.espera(60, pinta);
        return okk => {
          const s = ui.s; root.classList.add('hj-fin');
          const malas = p.va.map((c, k) => (igual(c, s.a[k]) ? -1 : k)).filter(k => k >= 0);
          let i = 0;
          const marca = (k, bien) => { ver[k] = bien ? 'good' : 'bad'; O(k).classList.remove('hj-mal'); O(k).classList.add(bien ? 'hj-bien' : 'hj-mal'); };
          const cierre = () => { prende(root); d.final?.(root, p, ui); ui.nota(p.bien); ui.espera(80, pinta); ui.espera(700, pinta); };
          ui.nota('');
          (function sig() {
            if (i < orden.length) { const k = orden[i++], bien = !malas.includes(k); marca(k, bien); if (bien) XS.pop(); else XS.nope(); pinta(); return ui.espera(quieto() ? 0 : 420, sig); }
            if (okk) return cierre();
            ui.nota(p.mira?.[malas[0]] || '', true);
            ui.espera(2400, () => { ui.muestra({ a: p.va.map(base) }); orden.forEach(k => marca(k, true)); pinta(); cierre(); });
          })();
        };
      },
    });
  }

  // -------------------------------------------------------------------------------------------------------- mover tiras
  // d: { tiras(p) en el orden bueno; cabeza(p) }   p: { ini: permutación, fija: las primeras n no se mueven, mira, bien }
  function ordena(nombre, d) {
    XG.juego(nombre, {
      tipo: 'ordena', ini: p => ({ o: [...p.ini], t: false }), listo: s => s.t, ok: (s, p) => s.o.join() === p.ini.map((_, i) => i).join(),
      sol: p => ({ o: p.ini.map((_, i) => i), t: true }), tiras: p => d.tiras(p),
      texto: p => d.tiras(p).map((t, i) => `${i + 1}. ${t.length > 60 ? `${t.split(' ').slice(0, 7).join(' ')}…` : t}`).join(' '),
      monta(stage, p, ui) {
        const tiras = d.tiras(p), fija = p.fija || 0;
        stage.innerHTML = `<div class="hj hj-${nombre} hj-ordena"><div class="hj-esc">${d.cabeza?.(p) || ''}<ol class="hj-tiras"></ol></div></div>`;
        const root = stage.firstChild, ol = root.querySelector('ol');
        ol.innerHTML = tiras.map((t, i) => `<li class="hj-tira" data-i="${i}"><button type="button" class="hj-asa" aria-label="Mover: ${esc(t.split(' ').slice(0, 5).join(' '))}"><i></i></button><span>${luzDe(t, i + 1, p.luz)}</span></li>`).join('');
        const li = i => ol.querySelector(`[data-i="${i}"]`);
        // Cambia el orden y cada tira se desliza hasta su nuevo puesto.
        const acomoda = (ms = 220, menos = null) => {
          const antes = new Map([...ol.children].map(x => [x, x.getBoundingClientRect().top]));
          ui.s.o.forEach(i => ol.appendChild(li(i)));
          [...ol.children].forEach((x, n) => {
            x.classList.toggle('fija', n < fija);
            const dy = (antes.get(x) - x.getBoundingClientRect().top) / zk();
            if (!dy || x === menos || quieto() || !x.animate) return;
            x.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: ms, easing: 'cubic-bezier(.2,.8,.2,1)' });
          });
        };
        acomoda(0);
        const lleva = (i, a) => { a = XG.clamp(a, fija, tiras.length - 1); const o = ui.s.o.filter(x => x !== i); o.splice(a, 0, i); if (o.join() === ui.s.o.join()) return false; ui.set({ o, t: true }); XS.tick(a); tactil(); return true; };
        let dedo = null;
        ol.addEventListener('pointerdown', e => {
          const x = e.target.closest('.hj-tira'); if (!x || ui.locked || dedo || x.classList.contains('fija')) return;
          if (e.pointerType !== 'mouse' && !e.target.closest('.hj-asa')) return;   // con el dedo, del asa: el resto deja desplazar
          dedo = { id: e.pointerId, x, i: +x.dataset.i }; x.classList.add('lift'); e.preventDefault(); x.querySelector('.hj-asa').focus({ preventScroll: true });
        });
        const mueve = e => {
          if (!dedo || e.pointerId !== dedo.id || ui.locked) return;
          e.preventDefault();
          const n = [...ol.children].filter(x => x !== dedo.x).filter(x => { const r = x.getBoundingClientRect(); return e.clientY > r.top + r.height / 2; }).length;
          if (lleva(dedo.i, n)) acomoda();
        };
        const deja = e => { if (!dedo || e.pointerId !== dedo.id) return; dedo.x.classList.remove('lift'); dedo = null; };
        window.addEventListener('pointermove', mueve, { passive: false }); window.addEventListener('pointerup', deja); window.addEventListener('pointercancel', deja);
        ui.limpia(() => { window.removeEventListener('pointermove', mueve); window.removeEventListener('pointerup', deja); window.removeEventListener('pointercancel', deja); });
        desplaza(ui, root, () => !!dedo);
        ol.addEventListener('keydown', e => {
          const x = e.target.closest('.hj-tira'); if (!x || ui.locked || !['ArrowUp', 'ArrowDown'].includes(e.key) || x.classList.contains('fija')) return;
          e.preventDefault(); e.stopPropagation();
          const i = +x.dataset.i;
          if (lleva(i, ui.s.o.indexOf(i) + (e.key === 'ArrowUp' ? -1 : 1))) { acomoda(); x.querySelector('.hj-asa').focus({ preventScroll: true }); }
        });
        ui.nota(p.ayuda || d.ayuda || 'Arrastra cada tira de su asa, o usa las flechas del teclado.');
        return okk => {
          root.classList.add('hj-fin');
          const s = ui.s;
          cierra(ui, okk, {
            lista: () => s.o.map((i, n) => [li(i), i === n]).slice(fija),
            aviso: p.mira?.[s.o.find((i, n) => i !== n)] || '', bien: p.bien,
            buena() { ui.muestra({ o: p.ini.map((_, i) => i), t: true }); root.querySelectorAll('.hj-mal').forEach(x => x.classList.remove('hj-mal')); acomoda(700); },
            final() { [...ol.children].forEach(x => x.classList.add('hj-bien')); prende(root); },
          });
        };
      },
    });
  }

  return { esc, fmt, hoja, completo, cabeza, parr, zona, zonas, toca, pinta, regla, hilos, ordena, oraciones, prende, luzDe, igual, base };
})();
;
//#archivo js/games/lectura-escena.js
// Ejercicios de lectura en los que el texto es la escena (spec 2026-11-24-lectura-explora). Mundo 1, «Estrategias de lectura».
// Van por datos: cada lección pone su texto (`doc`), así que sirven para los demás mundos. Piezas en hoja-kit.js.
{
  const { esc, fmt, hoja, completo, cabeza, zona, zonas, toca, hilos, ordena, oraciones } = HOJA;
  const primera = (p, n) => oraciones(p, n)[0];
  const hueco = (t, rot) => esc(t).replace(/\[(\d)\]/g, (_, i) => zona(+i, rot?.[+i] || '', 'en-linea'));
  const tarjeta = (t, i, attr, dentro = '') => `<section class="hj-portada" ${attr}><h5>${esc(t[0])}</h5><p>${esc(t[1])}</p>${dentro}</section>`;

  // --------------------------------------------------------------------------------------------------------- prelectura
  // Se apuesta con los bordes; al comprobar se levanta la cortina y se enciende lo que lo prueba.
  zonas('antes-de-leer', {
    rot: (p, i) => p.rot[i],
    escena: p => `${hoja({ ...p, trozos: null }, { cls: 'cortina' })}<p class="hj-frase">${hueco(p.frase, p.rot)}</p>`,
    final: root => root.querySelector('.hj-hoja').classList.remove('cortina'),
  });
  // De cada pregunta, un hilo al borde que la responde.
  hilos('hilo-bordes', {
    destinos: () => 4, rot: (p, i) => ['título', 'autor', 'fuente', 'fecha'][i],
    escena: p => `<article class="hj-hoja hj-bordes"><h4 data-t="0" tabindex="0" role="button">${esc(p.doc.title)}</h4>${['autor', 'fuente', 'fecha'].map((k, i) => `<p data-t="${i + 1}" tabindex="0" role="button"><small>${k}</small>${esc(p.doc.ficha[k])}</p>`).join('')}</article>`,
    ayuda: 'Tira un hilo desde cada pregunta hasta el borde que la responde, o toca la pregunta y luego el borde.',
  });
  // Solo se ve el comienzo de cada párrafo; al comprobar se abren los párrafos.
  zonas('donde-mirar', {
    rot: (p, i) => `párrafo ${i + 1}`,
    escena: p => `<article class="hj-hoja velada">${cabeza(p.doc)}${p.doc.paras.map((t, i) => { const a = primera(p, i + 1), l = p.luz.find(x => x[0] === i + 1); return HOJA.parr(i + 1, `${fmt(a)} <span class="hj-velo">${HOJA.luzDe(t.slice(a.length).trim(), i + 1, l ? [l] : [])}</span>`, { antes: `<span class="hj-marg">${zona(i, '', '', `párrafo ${i + 1}`)}</span>` }); }).join('')}</article>`,
    ayuda: 'Solo se ven los comienzos. Lleva cada pregunta al margen del párrafo donde la buscarías.',
    final: root => root.querySelector('.hj-hoja').classList.remove('velada'),
  });
  // Cuatro portadas sin abrir: para qué se escribió cada texto.
  zonas('portadas', {
    rot: (p, i) => p.portadas[i][0],
    escena: p => `<div class="hj-estante">${p.portadas.map((t, i) => tarjeta(t, i, '', zona(i, 'va a…'))).join('')}</div>`,
  });
  // Una frase suelta de cada texto: de qué fuente salió.
  hilos('voz-de-la-fuente', {
    destinos: p => p.portadas.length, rot: (p, i) => p.portadas[i][0],
    escena: p => `<div class="hj-estante">${p.portadas.map((t, i) => tarjeta(t, i, `data-t="${i}" tabindex="0" role="button"`)).join('')}</div>`,
    ayuda: 'Tira un hilo desde cada frase hasta la fuente de donde salió, o toca la frase y luego la fuente.',
  });
  const suya = (p, n, T) => hoja(p, { nums: n, trozo: (k, i, t) => T(`${k}.${i}`, t) });
  const claves = p => p.nums.flatMap(n => oraciones(p, n).map((_, i) => `${n}.${i}`));
  const dicho = p => p.va.map(k => { const [n, i] = k.split('.'); return `«${oraciones(p, +n)[+i]}»`; }).join(' · ');
  toca('comprueba-apuesta', { modo: 'subraya', claves, texto: dicho, escena: (p, T) => `<p class="hj-apuesta"><small>la apuesta</small>${esc(p.apuesta)}</p>${suya(p, p.nums, T)}${completo(p.docs || p.doc)}` });
  const lista = (p, T) => `<ul class="hj-lista">${p.lineas.map((t, i) => `<li>${T(i, t)}</li>`).join('')}</ul>`;
  const encoge = root => { const l = root.querySelector('.hj-lista'); l.classList.add('corta'); };
  toca('preguntas-previas', { modo: 'tacha', claves: p => p.lineas.map((_, i) => i), texto: p => `Se tachan: ${p.va.map(i => p.lineas[i]).join(' · ')}`, final: encoge,
    ayuda: 'Toca una pregunta para tacharla; otro toque la devuelve.', escena: (p, T) => `<article class="hj-hoja">${cabeza(p.doc)}</article>${lista(p, T)}` });
  ordena('orden-fuentes', { tiras: p => p.tiras, cabeza: p => `<p class="hj-apuesta"><small>lo que necesitas saber</small>${esc(p.busca)}</p>` });

  // ---------------------------------------------------------------------------------------------- idea central y mapa
  ordena('ordena-texto', { tiras: p => p.tiras, cabeza: p => `<article class="hj-hoja">${cabeza(p.doc)}</article>` });
  zonas('mapa-margen', {
    rot: (p, i) => `párrafo ${i + 1}`,
    escena: p => hoja(p, { parr: n => ({ antes: `<span class="hj-marg">${zona(n - 1, '¿qué hace?')}</span>` }) }),
    ayuda: 'Lleva cada nota al margen de su párrafo. Sobra una.',
  });
  zonas('talla-idea', {
    rot: (p, i) => p.rot[i],
    escena: p => `${hoja(p, { nums: [p.p] })}<div class="hj-tallas">${p.rot.map((t, i) => `<div class="t${i}"><small>${esc(t)}</small>${zona(i)}</div>`).join('')}</div>${completo(p.docs || p.doc)}`,
  });
  toca('tacha-resumen', { modo: 'tacha', claves: p => p.lineas.map((_, i) => i), texto: p => `Queda: ${p.lineas.filter((_, i) => !p.va.includes(i)).join(' ')}`, final: encoge,
    ayuda: 'Toca una oración para tacharla; otro toque la devuelve.', escena: (p, T) => `${lista(p, T)}${completo(p.docs || p.doc)}` });
  toca('subraya-tesis', { modo: 'subraya', claves, texto: dicho, escena: (p, T) => `${suya(p, p.nums, T)}${completo(p.docs || p.doc)}` });
  zonas('bisagras', {
    rot: (p, i) => p.pares[i][1].slice(0, 28) + '…',
    escena: p => `<div class="hj-pares">${p.pares.map(([a, b], i) => `<p>${esc(a)} ${zona(i, '¿…?', 'en-linea')} ${esc(b)}</p>`).join('')}</div>${completo(p.docs || p.doc)}`,
    ayuda: 'Pon en cada hueco la palabra que une las dos ideas. Sobran dos.',
  });
  zonas('arma-titulo', {
    rot: (p, i) => p.rot[i],
    escena: p => `<h4 class="hj-titulo">${p.rot.map((r, i) => zona(i, r, 'en-linea')).join(' ')}</h4>${hoja(p, { nums: [1, 2], cab: '' })}${completo(p.docs || p.doc)}`,
    ayuda: 'Arma el título que diga la idea central. Sobran fichas.',
  });
  // El techo es la idea central: lo que la sostiene son columnas; lo demás, adornos que se caen al final.
  zonas('pilares', {
    varias: true, rot: (p, i) => ['sostiene', 'adorna'][i],
    escena: p => `<div class="hj-casa"><div class="hj-techo">${esc(p.idea)}</div><div class="hj-cols">${zona(0, 'lo que la sostiene')}</div></div><div class="hj-patio">${zona(1, 'lo que solo adorna')}</div>${completo(p.docs || p.doc)}`,
    vivo: (root, p, s) => root.querySelector('.hj-casa').style.setProperty('--falta', Math.max(0, 1 - s.en.filter(z => z === 0).length / p.va.filter(z => z === 0).length)),
    final: root => root.querySelector('.hj-patio').classList.add('cae'),
    ayuda: 'Lleva cada oración: ¿sostiene la idea o solo la adorna?',
  });

  // ------------------------------------------------------------------------------------------------- tiempo y EXCEPTO
  toca('lee-la-orden', { modo: 'subraya', claves: p => p.orden.split('|').map((_, i) => i).filter(i => i % 2), texto: p => p.va.map(i => p.orden.split('|')[i]).join(' · '),
    ayuda: 'Toca un trozo para subrayarlo; otro toque lo suelta.',
    escena: (p, T) => `<article class="hj-hoja hj-orden"><p>${p.orden.split('|').map((t, i) => (i % 2 ? T(i, t) : esc(t))).join('')}</p></article>${completo(p.docs || p.doc)}` });
  // EXCEPTO: cada opción busca su párrafo; la que no lo encuentra va a «no está».
  hilos('sella-parrafo', {
    destinos: p => p.doc.paras.length + 1, rot: (p, i) => (i === p.doc.paras.length ? 'no está' : `párrafo ${i + 1}`),
    escena: p => hoja(p, { parr: n => ({ attr: `data-t="${n - 1}" tabindex="0" role="button"` }) }) + `<p class="hj-no" data-t="${p.doc.paras.length}" tabindex="0" role="button">No está en el texto</p>`,
    ayuda: 'Tira un hilo desde cada opción hasta el párrafo que la prueba, o hasta «No está en el texto».',
  });
  zonas('dentro-fuera', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `<div class="hj-marco"><small>${esc(p.rot[0])}</small>${hoja(p, { nums: [p.p], cab: '' })}${zona(0, 'sí está aquí')}</div><div class="hj-dos"><div><small>${esc(p.rot[1])}</small>${zona(1)}</div><div><small>${esc(p.rot[2])}</small>${zona(2)}</div></div>${completo(p.docs || p.doc)}`,
  });
  zonas('dice-deduce', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `${hoja(p, { nums: p.nums })}<div class="hj-escalera">${p.rot.map((t, i) => `<div class="e${i}"><small>${esc(t)}</small>${zona(i)}</div>`).join('')}</div>${completo(p.docs || p.doc)}`,
  });
  // Cada opción falsa cae cuando se ata a la oración que la desmiente; queda en pie la respuesta.
  hilos('descarta-prueba', {
    destinos: p => p.nums.reduce((n, k) => n + oraciones(p, k).length, 0), rot: (p, i) => `«${p.nums.flatMap(n => oraciones(p, n))[i].split(' ').slice(0, 7).join(' ')}…»`,
    escena: p => { let k = 0; return `${hoja(p, { nums: p.nums, trozo: (n, i, t) => `<span class="hj-t2" data-t="${k++}" tabindex="0" role="button">${fmt(t)}</span>` })}<p class="hj-queda"><small>${esc(p.pregunta)}</small><span>${esc(p.queda)}</span></p>`; },
    ayuda: 'Tira un hilo desde cada opción falsa hasta la oración que la desmiente.',
    final: root => root.querySelector('.hj-queda').classList.add('on'),
  });
  XG.conPerillas('reparte-tiempo', {
    campos: p => [{ k: 'l', et: 'leer', min: 0, max: 12, ini: 1, lee: v => `${v} min` }, { k: 'q', et: 'responder', min: 0, max: 18, ini: 4, lee: v => `${v} min` }],
    listo: s => s.l !== 1 || s.q !== 4, ok: (s, p) => s.l >= p.leer && s.q >= p.resp && s.l + s.q <= p.total - p.rep,
    sol: p => ({ l: p.leer, q: p.total - p.rep - p.leer }), texto: p => `leer ${p.leer}, responder ${p.total - p.rep - p.leer} y repasar ${p.rep} (minutos)`, alto: 150, ms: 1500,
    quieta: p => XPK.r(24, 60, 292, 44, 'fn', 8) + XPK.t(170, 40, `${p.total} minutos`, 's ta') + Array.from({ length: p.total + 1 }, (_, k) => XPK.l(24 + 292 * k / p.total, 108, 24 + 292 * k / p.total, k % 5 ? 113 : 118, 'lm') + (k % 5 ? '' : XPK.t(24 + 292 * k / p.total, 134, k, 's tm'))).join(''),
    cuadro(s, p, f) {
      const X = m => 24 + 292 * Math.min(p.total * 1.06, m) / p.total, t = f * p.total, tr = (a, b, cls, et) => (t > a && b > a ? XPK.r(X(a), 60, X(Math.min(b, t)) - X(a), 44, cls, 6) + (t >= b && X(b) - X(a) > 46 ? XPK.t((X(a) + X(b)) / 2, 87, et, 's') : '') : '');
      return GAMES['reparte-tiempo'].quieta(p) + tr(0, s.l, 'fa', 'leer') + tr(s.l, s.l + s.q, 'fg', 'responder') + tr(s.l + s.q, p.total, 'fA', 'repasar') + (s.l + s.q > p.total && f === 1 ? XPK.t(316, 50, 'no cabe', 's ta', 'end') : '');
    },
    aviso: (s, p) => (s.l + s.q > p.total - p.rep ? `Minutos que sobran para repasar: ${Math.max(0, p.total - s.l - s.q)}. No alcanza para volver a las marcadas.` : s.l < p.leer ? 'Con tan poca lectura tocaría releer en cada pregunta.' : 'A las preguntas les falta tiempo: se responderían sin volver al texto.'),
    bien: (s, p) => `Quedan ${p.total - s.l - s.q} min para volver a las marcadas.`,
  });
  ordena('ruta-preguntas', { tiras: p => p.tiras });
}
;
//#archivo js/games/lectura-tipos-escena.js
// Ejercicios de lectura sobre la hoja · mundo 2, «Tipos de texto y géneros» (spec 2026-11-24-lectura-explora). Van por datos.
{
  const { esc, fmt, hoja, completo, zona, zonas, toca, hilos, ordena, pinta, oraciones } = HOJA;
  const lineas = (p, T) => `<article class="hj-hoja hj-lineas">${p.lineas.map((t, i) => T(i, t)).join('')}</article>`;
  const cajas = p => `<div class="hj-dos alto">${p.rot.map((t, i) => `<div><small>${esc(t)}</small>${zona(i, '', '', t)}</div>`).join('')}</div>`;
  const doc = p => (p.doc?.paras ? completo(p.docs || p.doc) : '');

  // Marcadores de colores: cada oración se pinta con lo que hace o con quién habla.
  for (const n of ['pinta-tipos', 'pinta-voces', 'pinta-preguntas']) pinta(n, { escena: (p, T) => lineas(p, T) + doc(p) });

  // La pista se ata a la oración que la tiene.
  const atada = p => `<article class="hj-hoja hj-lineas">${p.lineas.map((t, i) => `<p class="hj-linea" data-t="${i}" tabindex="0" role="button">${fmt(t)}</p>`).join('')}</article>${doc(p)}`;
  const corta = t => (t.length > 46 ? `«${t.split(' ').slice(0, 6).join(' ')}…»` : `«${t}»`);
  hilos('pista-tipo', { destinos: p => p.lineas.length, rot: (p, i) => corta(p.lineas[i]), escena: atada, ayuda: 'Tira un hilo desde cada pista hasta la oración donde está.' });
  hilos('pieza-argumento', { destinos: p => p.lineas.length, rot: (p, i) => corta(p.lineas[i]), escena: atada, ayuda: 'Tira un hilo desde cada pieza hasta la oración que cumple ese papel.' });

  // La misma idea, escrita con otro propósito.
  zonas('cambia-tipo', {
    rot: (p, i) => p.rot[i],
    escena: p => `<p class="hj-apuesta"><small>${esc(p.de)}</small>${esc(p.antes)}</p><p class="hj-frase">${esc(p.frase).replace(/\[(\d)\]/g, (_, i) => zona(+i, p.rot[+i], 'en-linea'))}</p>`,
    ayuda: 'Llena los huecos de la oración nueva. Sobran fichas.',
  });
  zonas('todo-o-parte', { varias: true, rot: (p, i) => p.rot[i], escena: p => cajas(p) + doc(p) });
  zonas('genero-o-cita', { varias: true, rot: (p, i) => p.rot[i], escena: p => cajas(p) + doc(p) });
  ordena('pasos-del-proceso', { tiras: p => p.tiras, cabeza: p => `<p class="hj-apuesta"><small>${esc(p.que)}</small>${esc(p.de)}</p>` });

  // Signos y referentes: el hilo llega al lugar exacto del texto. `texto` va en trozos con «|»; los impares se pueden tocar.
  const trozos = p => p.texto.split('|');
  const pieza = p => `<article class="hj-hoja"><p class="hj-frase corta">${trozos(p).map((t, i) => (i % 2 ? `<span class="hj-t2" data-t="${(i - 1) / 2}" tabindex="0" role="button">${esc(t)}</span>` : esc(t))).join('')}</p></article>${doc(p)}`;
  const rotPieza = (p, i) => `«${trozos(p)[2 * i + 1].trim()}»`, cuantas = p => (trozos(p).length - 1) / 2;
  hilos('signo-oficio', { destinos: cuantas, rot: rotPieza, escena: pieza, ayuda: 'Tira un hilo desde cada oficio hasta el signo que lo hace.' });
  hilos('tira-referente', { destinos: cuantas, rot: rotPieza, escena: pieza, ayuda: 'Tira un hilo desde cada palabra hasta aquello a lo que apunta.' });

  // La vida que se cuenta: antes, el momento del cambio y después.
  zonas('linea-vida', {
    varias: true, rot: (p, i) => p.rot[i],
    escena: p => `<div class="hj-vida">${p.rot.map((t, i) => `<div><i></i><small>${esc(t)}</small>${zona(i, '', '', t)}</div>`).join('')}</div>${doc(p)}`,
    ayuda: 'Lleva cada ficha a su lugar de la línea.',
  });
  const suya = (p, T) => hoja(p, { nums: p.nums, trozo: (k, i, t) => T(`${k}.${i}`, t) });
  toca('subraya-rasgo', { modo: 'subraya', claves: p => p.nums.flatMap(n => oraciones(p, n).map((_, i) => `${n}.${i}`)), texto: p => p.va.map(k => { const [n, i] = k.split('.'); return `«${oraciones(p, +n)[+i]}»`; }).join(' · '), escena: (p, T) => suya(p, T) + doc(p) });
}
;
//#archivo js/games/lectura-explicita-escena.js
// Ejercicios de lectura sobre la hoja · mundo 3, «Información explícita» (spec 2026-11-24-lectura-explora). Van por datos.
{
  const { esc, completo, zona, zonas, regla } = HOJA;
  // Paráfrasis: la perilla recorre palabras que miden hasta que la oración dice lo mismo que el texto.
  regla('ajusta-alcance', { tras: p => completo(p.docs || p.doc, p.luz) });
  // La palabra tachada se cambia por otra que dice lo mismo en esa oración.
  zonas('cambia-palabra', {
    rot: (p, i) => `«${p.frases[i][2]}»`,
    escena: p => `<div class="hj-pares">${p.frases.map(([n, a, w, b], i) => `<p><small>párrafo ${n}</small>${esc(a)}<s>${esc(w)}</s> ${zona(i, '¿…?', 'en-linea', `en vez de ${w}`)}${esc(b)}</p>`).join('')}</div>${completo(p.docs || p.doc)}`,
    ayuda: 'Pon cada ficha en vez de la palabra tachada.',
  });
}
;
//#archivo js/games/lectura-argumento-escena.js
// Ejercicios de lectura sobre la hoja · balanza de una tesis (spec 2026-11-24-lectura-explora). Va por datos.
{
  const { esc, completo, zona, zonas } = HOJA;
  // La tesis está en el fiel: lo que se pone a cada lado solo pesa por cuánto hay (no dice si va bien).
  zonas('balanza-tesis', {
    varias: true, rot: (p, i) => ['la apoya', 'la debilita', 'no pesa'][i],
    escena: p => `<div class="hj-balanza"><p class="hj-tesis"><small>la tesis</small>${esc(p.tesis)}</p><div class="hj-brazo"></div><div class="hj-platos"><div><small>la apoya</small>${zona(0, '', '', 'la apoya')}</div><div><small>la debilita</small>${zona(1, '', '', 'la debilita')}</div></div></div><div class="hj-suelo"><small>no pesa</small>${zona(2, '', '', 'no pesa')}</div>${p.doc?.paras ? completo(p.docs || p.doc) : ''}`,
    vivo(root, p, s) { const n = z => s.en.filter(x => x === z).length; root.querySelector('.hj-balanza').style.setProperty('--g', Math.max(-2, Math.min(2, n(1) - n(0)))); },
    ayuda: 'Supón que cada dato es cierto y llévalo a su plato.',
  });
}
;
//#archivo js/games/marca-mueve.js
// Lo que pasa en los ejercicios de tocar al comprobar (spec 2026-11-24-ejercicios-explora, «Al comprobar, la escena se mueve»). Se carga
// después de las escenas y lo usa XG.marca (logica-kit.js):
//   XG.MUEVE[nombre](K, p, on, f, st)  dibujo encima de la escena que ejecuta lo marcado; f va de 0 a 1.   st: los sitios
//   XG.PRUEBA[nombre](p, i)            la cuenta de ese sitio, que aparece debajo de su dato al revisarlo.
// Las dos son puras. Sin ellas, cada sitio marcado salta o se sacude al revisarse.
(() => {
  const R = Math.round, N = x => String(R(x * 100) / 100).replace('-', '−'), si = on => on.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
  const paso = (f, k, n) => Math.max(0, Math.min(1, f * n - k));      // el turno k de n
  const mezcla = (a, b, f) => a + (b - a) * f, div = n => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return d; return n; };
  const onda = (K, p, on, f, st) => si(on).map((i, k, l) => { const q = paso(f, k * 0.25, l.length * 0.25 + 0.75); return q > 0 && q < 1 ? K.f(1 - q, K.c(st[i].x, st[i].y, 8 + q * 30, 'fn gr')) : ''; }).join('');
  onda.corta = true;   // no se repite con la respuesta buena
  // Una línea que crece por varios puntos.
  const crece = (K, P, f, cls) => { const L = P.slice(1).map((q, i) => Math.hypot(q[0] - P[i][0], q[1] - P[i][1])), T = L.reduce((a, b) => a + b, 0); let r = f * T; const out = [P[0]]; for (let i = 0; i < L.length && r > 0; i++) { const k = Math.min(1, r / (L[i] || 1)); out.push([mezcla(P[i][0], P[i + 1][0], k), mezcla(P[i][1], P[i + 1][1], k)]); r -= L[i]; } return out.length > 1 ? K.pl(out, cls) : ''; };
  const cae = (K, p, on, f, st) => si(on).map((i, k, l) => { const q = Math.min(1, paso(f, k * 0.6, l.length * 0.6 + 1)); return q > 0 && q < 1 ? K.f(q, K.r(st[i].x - st[i].w / 2, st[i].y - st[i].h / 2 - (1 - q) * 46, st[i].w, st[i].h, 'fa', 6)) : ''; }).join('');
  // Las seis caras de un molde: hacia dónde mira cada celda al doblar, y el orden en que se doblan.
  const neg = a => a.map(x => -x || 0);
  function dobla(cel) {
    const en = new Map(cel.map((c, i) => [c.join(), i])), out = Array(cel.length).fill(null), q = [0], orden = [];
    out[0] = { n: [0, 0, 1], r: [1, 0, 0], d: [0, -1, 0] };
    while (q.length) { const i = q.shift(), [c, g] = cel[i], { n, r, d } = out[i]; orden.push(i); for (const [dx, dy, o] of [[1, 0, { n: r, r: neg(n), d }], [-1, 0, { n: neg(r), r: n, d }], [0, 1, { n: d, r, d: neg(n) }], [0, -1, { n: neg(d), r, d: n }]]) { const j = en.get([c + dx, g + dy].join()); if (j != null && !out[j]) { out[j] = o; q.push(j); } } }
    return { n: out.map(x => x && x.n.join()), orden };
  }

  XG.MUEVE = {
    // La corriente avanza por lo que está cerrado; si llega, el bombillo prende.
    'prende-circuito'(K, p, on, f) {
      const rama = y => [[60, 86], [60, y], [178, y], [178, 86]], a = [on[0] && 46, on[1] && 126].filter(Boolean), pasa = a.length > 0;
      let h = crece(K, [[10, 86], [60, 86]], Math.min(1, f * 4), 'la gr');
      if (f > 0.25) for (const y of a) h += crece(K, rama(y), Math.min(1, (f - 0.25) * 2.5), 'la gr');
      if (pasa && f > 0.65) h += crece(K, [[178, 86], on[2] ? [284, 86] : [202, 86]], Math.min(1, (f - 0.65) * 4), 'la gr');
      const llega = pasa && on[2];
      return h + (f >= 0.9 ? (llega ? K.c(304, 86, 20, 'fop') + K.c(304, 86, 20, 'fo') + [0, 45, 90, 270, 315].map(g => K.l(...K.at(304, 86, 24, g), ...K.at(304, 86, 30, g), 'lo gr')).join('') : pasa ? K.t(212, 66, '✗', 'tf') : K.t(60, 70, '✗', 'tf')) : '');
    },
    // La aguja da dos vueltas y al final se lee cuántos favorables marcó.
    'ruleta-favorables': (K, p, on, f) => K.l(170, 104, ...K.at(170, 104, 48, 90 - f * 720), 'lf gr') + K.c(170, 104, f >= 1 ? 22 : 8, 'fc') + (f >= 1 ? K.t(170, 110, `${si(on).length}/${p.nums.length}`, 'b') : ''),
    'mayor-tramo'(K, p, on, f) { const x = i => 40 + i * 260 / (p.v.length - 1), y = n => 136 - n * 2.8; return si(on).map(i => crece(K, [[x(i), y(p.v[i])], [x(i + 1), y(p.v[i])], [x(i + 1), y(p.v[i + 1])]], f, 'lf gr d') + K.f(f, K.l(x(i), y(p.v[i]), x(i + 1), y(p.v[i + 1]), 'lf gr'))).join(''); },
    'prende-focos'(K, p, on, f) { const l = si(on), B = [16, 8, 4, 2, 1]; let s = 0; const h = l.map((i, k) => { const q = paso(f, k, l.length); s += q >= 1 ? B[i] : 0; return q > 0 ? [20, 60, 120, 160].map(g => K.l(...K.at(50 + i * 60, 60, 21, g), ...K.at(50 + i * 60, 60, 21 + 7 * q, g), 'lg')).join('') : ''; }).join(''); return h + K.t(330, 22, `van ${s}`, s === p.n ? 'b to' : 'b', 'end'); },
    'pinta-operacion': onda, 'pinta-negacion': onda, 'donde-alguien': onda, 'zonas-posibles': onda, 'pinta-tres': onda, 'cruce-sin-b': onda, 'rejilla-permitida': onda, 'ruletas-alguno': onda, 'cruce-numeros': onda, 'donde-pintura': onda,
    'vecinas-cara': (K, p, on, f, st) => { const a = st[p.letras.indexOf(p.de)]; return si(on).map(i => crece(K, [[a.x, a.y], [st[i].x, st[i].y]], f, 'lf d')).join(''); },
    'vista-frente': cae, 'vista-izquierda': cae, 'escalera-cuatro': cae,
    // La mitad dada se voltea sobre el espejo.
    'espejo-vertical': (K, p, on, f) => p.dada.map(i => { const c = i % p.c, r = Math.floor(i / p.c), x0 = 162 - (p.c - c) * 36 + 16, x1 = 178 + (p.c - 1 - c + 0.5) * 36, g = Math.cos(Math.PI * f), w = Math.max(1, 32 * Math.abs(g)), x = (x0 + x1) / 2 + (x0 - x1) / 2 * g; return K.r(x - w / 2, 14 + r * 36 + 2, w, 32, 'fn gr', 4); }).join(''),
    // La hoja se abre, primero hacia abajo y después hacia la derecha.
    'papel-abierto'(K, p, on, f) { const a = Math.min(1, f * 2), b = Math.max(0, f * 2 - 1), X = c => 190 + (c + 0.5) * 36, Y = c => 30 + (c + 0.5) * 36, y2 = mezcla(Y(p.f), Y(3 - p.f), a), x2 = mezcla(X(p.c), X(3 - p.c), b); return K.r(190, 30, 72 + 72 * b, 72 + 72 * a, 'fn gr', 2) + K.c(X(p.c), Y(p.f), 9, 'fn gr') + (a > 0.05 ? K.c(X(p.c), y2, 9, 'fn gr') : '') + (b > 0.05 ? K.c(x2, Y(p.f), 9, 'fn gr') + K.c(x2, Y(3 - p.f), 9, 'fn gr') : ''); },
    // Cada molde marcado se dobla cara por cara; si dos caen en el mismo sitio, se ve.
    'cierra-cubo': (K, p, on, f) => si(on).map(i => { const m = p.moldes[i], u = 19, w = Math.max(...m.map(c => c[0])) + 1, h = Math.max(...m.map(c => c[1])) + 1, x = 62 + (i % 3) * 108 - w * u / 2, y = 60 + Math.floor(i / 3) * 112 - h * u / 2, D = dobla(m), choca = k => D.n.some((z, j) => j !== k && z === D.n[k]), cierra = !D.n.some((_, k) => choca(k)); return D.orden.slice(0, Math.ceil(f * m.length)).map(k => K.r(x + m[k][0] * u, y + m[k][1] * u, u, u, f >= 1 ? (cierra ? 'fo' : choca(k) ? 'ff' : 'fa') : 'fa', 2)).join(''); }).join(''),
    // El modelo, girado hasta que coincide (o no) con cada mesa marcada.
    'misma-mesa': (K, p, on, f) => si(on).map(i => { const n = p.modelo.length, k = p.mesas[i].indexOf(p.modelo[0]), x = 90 + (i % 2) * 160, y = 170 + Math.floor(i / 2) * 106; return p.modelo.map((t, j) => { const [a, b] = K.at(x, y, 13, 90 - (j + k * f) * 360 / n); return K.t(a, b + 4, t, f >= 1 ? (p.mesas[i][(j + k) % n] === t ? 's to' : 's tf') : 's'); }).join(''); }).join(''),
    'giro-o-espejo': (K, p, on, f) => si(on).map(i => { const [g, v] = p.figs[i], u = 19, a = g * f * Math.PI / 180, cx = 62 + (i % 3) * 108, cy = 152 + Math.floor(i / 3) * 96, mx = (Math.max(...p.cel.map(c => c[0])) + 1) / 2, my = (Math.max(...p.cel.map(c => c[1])) + 1) / 2; return p.cel.map(([c, r]) => K.p([[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]].map(([x, y]) => { const X = (x - mx) * u * 0.96, Y = (y - my) * u * 0.96; return [cx + X * Math.cos(a) - Y * Math.sin(a), cy + X * Math.sin(a) + Y * Math.cos(a)]; }), f >= 1 ? (v ? 'ff' : 'fo') : 'fn gr')).join(''); }).join(''),
    // Los caminos que se marcaron, de a uno.
    'palabra-camino'(K, p, on, f) { const u = 30, x0 = 170 - p.e * u / 2, y0 = 92, l = si(on); return l.map((i, k) => { let x = x0, y = y0; const P = [[x, y]]; for (const c of p.fichas[i]) { if (c === 'E') x += u; else y -= u; P.push([x, y]); } const q = paso(f, k, l.length); return q > 0 ? crece(K, P, q, `${['la', 'lg', 'lf', 'lo'][k % 4]} gr`) + (q >= 1 ? K.c(x, y, 5, x === x0 + p.e * u && y === y0 - p.n * u ? 'fo' : 'ff') : '') : ''; }).join(''); },
    'rombo-cuadras': (K, p, on, f, st) => { const A = st[p.A[1] * (p.c + 1) + p.A[0]]; return si(on).map(i => crece(K, [[A.x, A.y], [st[i].x, A.y], [st[i].x, st[i].y]], f, 'la')).join(''); },
    'dos-lados': (K, p, on, f, st) => si(on).map((i, k) => { const a = p.de - 1, d = (i - a + p.n) % p.n, s = d <= p.n / 2 ? 1 : -1, m = Math.min(d, p.n - d); return m ? crece(K, Array.from({ length: m + 1 }, (_, j) => { const q = st[(a + s * j + p.n * 2) % p.n]; return [170 + (q.x - 170) * 0.68, 108 + (q.y - 108) * 0.68]; }), f, k ? 'lg gr' : 'la gr') : ''; }).join(''),
    'piezas-diez'(K, p, on, f) { const s = si(on).reduce((a, i) => a + p.piezas[i], 0), w = Math.min(290, 290 * s * f / p.total); return K.r(25, 22, w, 16, 'fa') + K.t(330, 16, N(s * f), 's', 'end') + (f >= 1 ? K.l(25 + 2.9 * p.pct, 18, 25 + 2.9 * p.pct, 42, 'lo gr') + K.t(25 + 2.9 * p.pct, 54, `${p.pct} %`, 's to') : ''); },
    'donde-cabe'(K, p, on, f, st) { const u = st[1].x - st[0].x, l = si(on), k = Math.min(l.length - 1, Math.floor(f * l.length)), i = l[k], c = i % p.cols, r = Math.floor(i / p.cols), cabe = c + p.s <= p.cols && r + p.s <= p.filas; return f >= 1 ? '' : K.r(st[i].x - u / 2, st[i].y - u / 2, p.s * u, p.s * u, cabe ? 'fo' : 'ff', 4); },
    'tacha-cruz': (K, p, on, f, st) => { const a = st[p.si[0] * p.cols.length + p.si[1]]; return si(on).map(i => crece(K, [[a.x, a.y], [st[i].x, st[i].y]], f, 'lf d')).join(''); },
    'hueco-unico': (K, p, on, f, st) => { const n = p.cols.length, m = p.filas.length; return si(on).map(i => { const r = Math.floor(i / n), c = i % n, s = st[i]; return [st[r * n], st[r * n + n - 1], st[c], st[(m - 1) * n + c]].map(q => crece(K, [[s.x, s.y], [q.x, q.y]], f, 'lg d')).join(''); }).join(''); },
    // Cada letra viaja a su reflejo en la diagonal.
    'tabla-desigual': (K, p, on, f, st) => { const n = p.letras.length; return si(on).map(k => { const i = Math.floor(k / n), j = k % n, a = st[k], b = st[j * n + i]; return i === j || f >= 1 ? '' : K.t(mezcla(a.x, b.x, f), mezcla(a.y, b.y, f) + 6, p.tab[i][j], 'b tf'); }).join(''); },
  };

  const orden = t => [...t].sort().join(''), CAR = { promedio: d => N(d.reduce((a, b) => a + b, 0) / d.length), mediana: d => N([...d].sort((a, b) => a - b)[(d.length - 1) / 2]), moda: d => N([...d].sort((a, b) => d.filter(x => x === b).length - d.filter(x => x === a).length)[0]), suma: d => N(d.reduce((a, b) => a + b, 0)) };
  const fin = ms => ms.reduce(([x, y], [d, n]) => [x + ({ E: n, O: -n }[d] || 0), y + ({ N: n, S: -n }[d] || 0)], [0, 0]);
  XG.PRUEBA = {
    'toca-primos': (p, i) => { const n = p.nums[i]; return n === 1 ? 'un divisor' : div(n) === n ? `1 · ${n}` : `${div(n)} · ${n / div(n)}`; },
    'siete-veces': (p, i) => { const n = p.nums[i], s = Math.floor(n / 10) + n % 10; return `${p.k} · ${s} = ${p.k * s}`; },
    'x-consigo': (p, i) => `da ${N(p.f(p.nums[i], p.nums[i]))}`,
    'tumba-todos': (p, i) => `${p.a}: ${p.nums[i] % p.a ? 'no' : 'sí'} · ${p.b}: ${p.nums[i] % p.b ? 'no' : 'sí'}`,
    'enteros-entre': (p, i) => `da ${N(p.g(p.nums[i]))}`,
    'precio-posible': (p, i) => { const n = p.nums[i], m = (p.a + p.b) / 2; return n <= p.a || n >= p.b ? 'no está entre' : n === m ? 'igual de los dos' : n < m ? 'más del barato' : 'más del caro'; },
    'cifra-que-falta': (p, i) => { const n = p.a.replace(/\D/g, '') * 10 + i; return n % p.by ? `sobra ${n % p.by}` : 'exacta'; },
    'tabla-criterios': (p, i) => { const m = p.c.length, n = p.f[Math.floor(i / m)], d = p.c[i % m]; return n % d ? `sobra ${n % d}` : `da ${n / d}`; },
    'tabla-desigual': (p, i) => { const n = p.letras.length, a = p.tab[Math.floor(i / n)][i % n], b = p.tab[i % n][Math.floor(i / n)]; return a === b ? `${a} = ${b}` : `${a} ≠ ${b}`; },
    'tabla-diferencia': (p, i) => String(Math.abs(Math.floor(i / 6) - i % 6)),
    'mismo-residuo': (p, i) => `deja ${((p.nums[i] % p.c) + p.c) % p.c}`,
    'regla-todos': (p, i) => p.e.map(([a]) => `${a} → ${N(p.casos[i].f(a))}`).join(' · '),
    'mismo-sabor': (p, i) => { const a = p.jarras[i][0] * p.modelo[1], b = p.jarras[i][1] * p.modelo[0]; return `${a} ${a === b ? '=' : '≠'} ${b}`; },
    'compara-porciento': (p, i) => `${N(p.grupos[i][0] / p.grupos[i][1] * 100)} %`,
    'pasan-porciento': (p, i) => { const [a, b] = p.fichas[i].match(/\d+/g); return `${N(a / b * 100)} %`; },
    'mismo-final': (p, i) => { const v = [100]; p.caminos[i].forEach(k => v.push(v.at(-1) * (1 + k / 100))); return v.map(N).join(' → '); },
    'mayor-tramo': (p, i) => { const c = (p.v[i + 1] - p.v[i]) / p.v[i] * 100; return `${c >= 0 ? '+' : ''}${N(R(c * 10) / 10)} %`; },
    'mismo-destino': (p, i) => { const [x, y] = fin(p.listas[i]), l = [x && `${Math.abs(x)}${x > 0 ? 'E' : 'O'}`, y && `${Math.abs(y)}${y > 0 ? 'N' : 'S'}`].filter(Boolean); return `queda en ${l.join(' y ') || 'A'}`; },
    'palabras-distintas': (p, i) => orden(p.fichas[i]), 'mismo-grupo': (p, i) => orden(p.fichas[i]),
    'dato-exagerado': (p, i) => `${CAR[p.fichas[i]](p.d)} → ${CAR[p.fichas[i]](p.e)}`,
    'donde-pintura': (p, i) => String(1 + [Math.floor(i / p.n), i % p.n].filter(k => k === 0 || k === p.n - 1).length),
  };
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
//#archivo js/games/corta-igual.js
// Corta igual (Preuniversitario UdeA, pu-cm-2; spec 2026-11-18-preuda-mundo-1): por qué hace falta un denominador
// común. Dos barras del mismo largo muestran a/b y c/d con pedazos de distinto tamaño: así no se pueden juntar. Un
// deslizador recorta las dos barras en n pedacitos iguales; si n no es múltiplo de los dos denominadores, los cortes
// nuevos no caen sobre los viejos (se ven en rojo). Cuando encajan en las dos, la tercera barra junta (o quita) los
// pedacitos y el juego escribe la cuenta: «1/2 + 1/3 = 3/6 + 2/6 = 5/6». Vale cualquier denominador común.
// params = { rounds: [{ a: [num, den], b: [num, den], op?: '+' | '-' }] }   state = { rounds: [{ n }] }
GAMES['corta-igual'] = (() => {
  const MAXN = 24, U = 1.5;   // la barra de la suma puede pasar de 1: caben hasta 1.5 unidades
  const fits = (r, n) => n % r.a[1] === 0 && n % r.b[1] === 0;
  const lcm = (a, b) => { let n = Math.max(a, b); while (n % a || n % b) n++; return n; };
  const sign = r => (r.op === '-' ? -1 : 1);
  const pieces = (r, n) => [r.a[0] * n / r.a[1], r.b[0] * n / r.b[1]];
  const text = (r, n) => { const [x, y] = pieces(r, n); return `${r.a[0]}/${r.a[1]} ${r.op === '-' ? '−' : '+'} ${r.b[0]}/${r.b[1]} = ${x}/${n} ${r.op === '-' ? '−' : '+'} ${y}/${n} = ${x + sign(r) * y}/${n}`; };
  const game = roundsGame({
    aspect: 1.36,
    init: () => ({ n: 1 }),
    ok: (s, r) => s.n > 1 && fits(r, s.n),
    solution: r => text(r, lcm(r.a[1], r.b[1])),
    prompt: r => `Recorta las dos barras en pedacitos iguales para ${r.op === '-' ? 'restar' : 'sumar'}`,
    foot: (r, s) => (s.n === 1 ? 'Los pedazos son de distinto tamaño: así no se pueden juntar' : fits(r, s.n) ? (s.n === lcm(r.a[1], r.b[1]) ? 'Encajan en las dos: es el denominador común más pequeño' : `Encajan; también sirve ${lcm(r.a[1], r.b[1])}, que es más pequeño`) : 'Los cortes nuevos no caen sobre los viejos'),
    layout(G) { G.x0 = 20; G.uw = (G.W - 40) / U; G.slY = G.H - 62; G.px = n => 26 + (n - 1) / (MAXN - 1) * (G.W - 52); },
    enter(G) { G.dragging = false; },
    draw(G) {
      const { p, C, r, s, x0, uw } = G, ok = !VELO.on && fits(r, s.n), n = s.n;
      TK.label(p, C, ok && n > 1 ? text(r, n) : `${r.a[0]}/${r.a[1]} ${r.op === '-' ? '−' : '+'} ${r.b[0]}/${r.b[1]}`, G.W / 2, 108, G.locked ? (ok ? C.ok : C.bad) : ok && n > 1 ? C.ok : C.ink, 17, G.W - 20);
      const bar = (y, fr, col, lab) => {
        p.noStroke(); p.fill(col); p.rect(x0, y, uw * fr[0] / fr[1], 34, 5);
        p.noFill(); p.stroke(C.ink); p.strokeWeight(2); p.rect(x0, y, uw, 34, 5);
        for (let k = 1; k < fr[1]; k++) p.line(x0 + uw * k / fr[1], y, x0 + uw * k / fr[1], y + 34);
        // Los cortes nuevos: finos; en rojo los que no caen sobre un corte viejo cuando no encaja.
        if (n > 1) for (let k = 1; k < n; k++) { const old = (k * fr[1]) % n === 0; if (old) continue; p.stroke(n % fr[1] ? C.bad : C.bg); p.strokeWeight(1.5); p.line(x0 + uw * k / n, y + 2, x0 + uw * k / n, y + 32); }
        TK.label(p, C, lab, x0 + uw + 26, y + 17, n > 1 && n % fr[1] ? C.bad : C.mute, 13, 60);
      };
      bar(138, r.a, C.sky, n > 1 && n % r.a[1] === 0 ? `${r.a[0] * n / r.a[1]}/${n}` : `${r.a[0]}/${r.a[1]}`);
      bar(186, r.b, C.coral, n > 1 && n % r.b[1] === 0 ? `${r.b[0] * n / r.b[1]}/${n}` : `${r.b[0]}/${r.b[1]}`);
      // La barra del resultado: aparece cuando los pedacitos son del mismo tamaño.
      const y = 248;
      p.noFill(); p.stroke(C.line); p.strokeWeight(2); p.rect(x0, y, uw, 34, 5);
      if (ok && n > 1) {
        const [a, b] = pieces(r, n), w = uw / n, tot = a + sign(r) * b;
        for (let k = 0; k < (r.op === '-' ? a : a + b); k++) { const gone = r.op === '-' && k >= tot; p.stroke(C.bg); p.strokeWeight(1.5); p.fill(gone ? C.line : k < a ? C.sky : C.coral); p.rect(x0 + k * w, y, w, 34, 3); if (gone) { p.stroke(C.bad); p.strokeWeight(2); p.line(x0 + k * w + 3, y + 4, x0 + (k + 1) * w - 3, y + 30); } }
        TK.label(p, C, `${tot}/${n}`, x0 + uw + 26, y + 17, C.ok, 14, 60);
      } else TK.label(p, C, 'todavía no se pueden juntar', x0 + uw / 2, y + 17, C.mute, 12, uw - 10);
      // Deslizador: en cuántos pedacitos se recorta cada barra.
      const sy = G.slY;
      p.stroke(C.line); p.strokeWeight(6); p.line(G.px(1), sy, G.px(MAXN), sy);
      for (let k = 1; k <= MAXN; k++) { p.stroke(C.bg); p.strokeWeight(1.5); p.line(G.px(k), sy - 3, G.px(k), sy + 3); if (k === 1 || k % 2 === 0) { p.noStroke(); p.fill(C.mute); p.textStyle(p.BOLD); p.textSize(9); p.textAlign(p.CENTER, p.CENTER); p.text(k, G.px(k), sy + 24); } }
      TK.label(p, C, 'pedacitos por barra', G.W / 2, sy - 26, C.mute, 11, 200);
      p.stroke(n === 1 ? C.mute : ok ? C.ok : C.bad); p.strokeWeight(3); p.fill(C.cream); p.circle(G.px(n), sy, 30);
      p.noStroke(); p.fill(inkOn(C.cream, C.ink)); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.CENTER); p.text(n, G.px(n), sy + 1);
    },
    press(G, x, y) { if (Math.abs(y - G.slY) > 30) return false; G.dragging = true; game.setN(G, x); return true; },
    drag(G, x) { if (!G.dragging) return false; game.setN(G, x); return true; },
    release(G) { G.dragging = false; },
    demo: G => ({ from: { x: G.px(G.s.n), y: G.slY }, to: { x: G.px(G.s.n < 8 ? 10 : 4), y: G.slY }, text: 'Arrastra: recorta las barras en pedacitos', ty: G.slY - 50 }),
    peek: G => ({ slY: G.slY, px: [...Array(MAXN).keys()].map(i => G.px(i + 1)) }),
  });
  game.setN = (G, x) => { const n = Math.max(1, Math.min(MAXN, Math.round(1 + (x - 26) / (G.W - 52) * (MAXN - 1)))); if (n !== G.s.n || !G.touched[G.cur]) { G.s.n = n; G.touch(); } };
  return Object.assign(game, { fits, lcm, text });
})();
;
//#archivo js/games/geo-kit.js
// Piezas de dibujo de los juegos de geometría del Preuniversitario UdeA (spec 2026-11-18-preuda-geometria). Va después
// de kit.js. Los ángulos van en grados, en sentido antihorario desde la derecha, como en el cuaderno.
const GEO = (() => {
  const rad = d => d * Math.PI / 180;
  // Punto a distancia r de (x, y) en la dirección d.
  const at = (x, y, r, d) => [x + r * Math.cos(rad(d)), y - r * Math.sin(rad(d))];
  // Dirección (0 a 360) en la que queda (x, y) visto desde (x0, y0).
  const angOf = (x0, y0, x, y) => (Math.atan2(y0 - y, x - x0) * 180 / Math.PI + 360) % 360;
  const snap = (v, s) => Math.round(v / s) * s;
  // Sector de a0 a a1 (a0 < a1) con su medida escrita afuera: así se «ve» un ángulo.
  function wedge(p, C, x, y, r, a0, a1, col, label, lr) {
    if (a1 - a0 < 0.5) return;
    const c = p.color(col); c.setAlpha(80);
    p.noStroke(); p.fill(c); p.arc(x, y, 2 * r, 2 * r, -rad(a1), -rad(a0), p.PIE);
    p.noFill(); p.stroke(col); p.strokeWeight(2); p.arc(x, y, 2 * r, 2 * r, -rad(a1), -rad(a0));
    if (label != null) { const [lx, ly] = at(x, y, lr ?? r + 15, (a0 + a1) / 2); TK.label(p, C, String(label), lx, ly, col, 13, 64); }
  }
  // Recta que pasa por (x, y) con dirección d, de largo 2·len.
  function line(p, x, y, len, d, col, w = 3) { const [a, b] = at(x, y, len, d), [c, e] = at(x, y, len, d + 180); p.stroke(col); p.strokeWeight(w); p.line(a, b, c, e); }
  // Manija para arrastrar: un punto con aro.
  function knob(p, C, x, y, col) { p.stroke(col); p.strokeWeight(3); p.fill(C.cream); p.circle(x, y, 22); }
  return { rad, at, angOf, snap, wedge, line, knob };
})();
;
//#archivo js/games/tijera-angulos.js
// Tijera de ángulos (Preuniversitario UdeA, pu-ge-1; spec 2026-11-18-preuda-geometria): dos rectas que se cruzan
// forman cuatro ángulos. Una recta está quieta; la otra se gira arrastrando su punta. El ángulo azul (el que se abre)
// muestra su medida en vivo; el ángulo por el que pregunta la ronda dice «?» hasta comprobar: hay que deducirlo.
//   'opp'  : el opuesto por el vértice debe medir `given`      → el azul mide lo mismo
//   'sup'  : el vecino (suplementario) debe medir `given`      → azul = 180 − given
//   'comp' : entre la recta y la vertical debe haber `given`   → azul = 90 − given (complementarios)
//   'ratio': el vecino debe ser `k` veces el azul              → azul = 180 / (k + 1)
// params = { rounds: [{ kind, given?, k? }] }   state = { rounds: [{ a }] }   (a de 5° en 5°, entre 5° y 175°)
GAMES['tijera-angulos'] = (() => {
  const want = r => (r.kind === 'opp' ? r.given : r.kind === 'sup' ? 180 - r.given : r.kind === 'comp' ? 90 - r.given : 180 / (r.k + 1));
  const PROMPT = {
    opp: r => `Abre la tijera: el ángulo opuesto al azul debe medir ${r.given}°`,
    sup: r => `Abre la tijera: el ángulo vecino del azul debe medir ${r.given}°`,
    comp: r => `El ángulo verde, hasta la vertical, debe medir ${r.given}°`,
    ratio: r => `El ángulo vecino debe ser ${r.k === 2 ? 'el doble' : r.k === 3 ? 'el triple' : `${r.k} veces`} del azul`,
  };
  const game = roundsGame({
    aspect: 1.25,
    init: () => ({ a: 100 }),
    ok: (s, r) => s.a === want(r),
    solution: r => `azul = ${want(r)}°`,
    prompt: r => PROMPT[r.kind](r),
    foot: r => (r.kind === 'opp' ? 'Los opuestos por el vértice son iguales' : r.kind === 'comp' ? 'Complementarios: suman 90°' : 'Los vecinos son suplementarios: suman 180°'),
    layout(G) { G.ox = G.W / 2; G.oy = (112 + G.H - 30) / 2 + 8; G.R = Math.min(G.W * 0.4, (G.H - 170) / 2); },
    enter(G) { G.dragging = false; },
    draw(G) {
      const { p, C, r, s, ox, oy, R } = G, a = s.a, show = G.locked, q = v => (show ? `${v}°` : '?');
      // Los cuatro ángulos: azul y su opuesto, el vecino y su opuesto.
      GEO.wedge(p, C, ox, oy, 46, 0, a, C.sky, `${a}°`);
      if (r.kind === 'comp') {
        p.stroke(C.mute); p.strokeWeight(2); p.drawingContext.setLineDash([5, 5]); p.line(ox, oy, ox, oy - R); p.drawingContext.setLineDash([]);
        if (a < 90) GEO.wedge(p, C, ox, oy, 62, a, 90, C.mint, q(90 - a), 78);
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(ox, oy - 12, 12, 12);
      } else {
        GEO.wedge(p, C, ox, oy, 38, a, 180, C.coral, r.kind === 'opp' ? null : q(180 - a));
        GEO.wedge(p, C, ox, oy, 46, 180, 180 + a, C.sky, r.kind === 'opp' ? q(a) : null);
        GEO.wedge(p, C, ox, oy, 38, 180 + a, 360, C.coral, null);
      }
      GEO.line(p, ox, oy, R, 0, C.ink);
      GEO.line(p, ox, oy, R, a, G.locked ? (a === want(r) ? C.ok : C.bad) : C.ink);
      drawDot(p, C, ox, oy, 9, C.ink);
      const [kx, ky] = GEO.at(ox, oy, R, a); G.kx = kx; G.ky = ky;
      GEO.knob(p, C, kx, ky, C.sky);
    },
    press(G, x, y) { if (Math.hypot(x - G.ox, y - G.oy) < 24 || y < 96 || y > G.H - 26) return false; G.dragging = true; game.turn(G, x, y); return true; },
    drag(G, x, y) { if (!G.dragging) return false; game.turn(G, x, y); return true; },
    release(G) { G.dragging = false; },
    demo: G => ({ from: { x: G.kx, y: G.ky }, to: (([x, y]) => ({ x, y }))(GEO.at(G.ox, G.oy, G.R, G.s.a > 90 ? 50 : 130)), text: 'Arrastra la punta para girar la recta', ty: G.H - 44 }),
    peek: G => ({ o: [G.ox, G.oy], R: G.R, want: want(G.r) }),
  });
  // El dedo fija la dirección de la recta (una recta no tiene «lado»: 200° es lo mismo que 20°).
  game.turn = (G, x, y) => { let a = GEO.snap(GEO.angOf(G.ox, G.oy, x, y) % 180, 5); a = Math.max(5, Math.min(175, a)); if (a !== G.s.a || !G.touched[G.cur]) { G.s.a = a; G.touch(); } };
  return Object.assign(game, { want });
})();
;
//#archivo js/games/apice-triangulo.js
// Mueve el vértice (Preuniversitario UdeA, pu-ge-1 y pu-ge-2; spec 2026-11-18-preuda-geometria): un triángulo con la
// base quieta y el vértice de arriba suelto. Al arrastrarlo cambian los tres ángulos, pero su suma no: siempre 180°.
//   mode 'falta': se piden el ángulo A y el de arriba, C. El de arriba muestra «?»: hay que deducir B = 180 − A − C.
//   mode 'tipo' : hay que dejar el triángulo del tipo pedido (isósceles, rectángulo, equilátero u obtusángulo) con el
//                 ángulo A dado; los lados iguales se marcan con rayitas y el ángulo recto con su cuadrito.
// Los ángulos de la base saltan de 5° en 5°.
// params = { rounds: [{ mode: 'falta', A, C } | { mode: 'tipo', tipo, A }] }   state = { rounds: [{ A, B }] }
GAMES['apice-triangulo'] = (() => {
  const C3 = s => 180 - s.A - s.B;
  const TIPO = {
    isosceles: s => s.A === s.B || s.A === C3(s) || s.B === C3(s),
    rectangulo: s => s.A === 90 || s.B === 90 || C3(s) === 90,
    equilatero: s => s.A === 60 && s.B === 60,
    obtusangulo: s => Math.max(s.A, s.B, C3(s)) > 90,
  };
  const NOMBRE = { isosceles: 'isósceles', rectangulo: 'rectángulo', equilatero: 'equilátero', obtusangulo: 'obtusángulo' };
  const okOf = (s, r) => (r.mode === 'falta' ? s.A === r.A && C3(s) === r.C : s.A === r.A && TIPO[r.tipo](s) && (!r.y || TIPO[r.y](s)));
  // Una respuesta que sirve (para la solución y las pruebas).
  function answer(r) {
    if (r.mode === 'falta') return { A: r.A, B: 180 - r.A - r.C };
    for (let B = 10; B <= 160 - r.A; B += 5) if (okOf({ A: r.A, B }, r)) return { A: r.A, B };
    return null;
  }
  const game = roundsGame({
    aspect: 1.28,
    init: () => ({ A: 50, B: 25 }),
    ok: okOf,
    solution: r => { const a = answer(r); return `${a.A}°, ${a.B}° y ${180 - a.A - a.B}°`; },
    prompt: r => (r.mode === 'falta' ? `Arma un triángulo con A = ${r.A}° y C = ${r.C}°` : `Arma un triángulo ${NOMBRE[r.tipo]}${r.y ? ` y ${NOMBRE[r.y]}` : ''} con A = ${r.A}°`),
    foot: (r, s) => (r.mode === 'falta' ? 'Los tres ángulos siempre suman 180°' : `${s.A}° + ${s.B}° + ${C3(s)}° = 180°`),
    layout(G) { G.ax = 36; G.bx = G.W - 36; G.by = G.H - 78; },
    enter(G) { G.dragging = false; },
    draw(G) {
      const { p, C, r, s, ax, bx, by } = G, c = C3(s), base = bx - ax;
      // El vértice de arriba sale de los dos ángulos de la base.
      const ta = Math.tan(GEO.rad(s.A)), tb = Math.tan(GEO.rad(s.B));
      let x = s.A === 90 ? 0 : s.B === 90 ? base : base * tb / (ta + tb), h = s.A === 90 ? base * tb : x * ta;
      // Si el triángulo es muy alto, se dibuja a escala para que quepa.
      const k = Math.min(1, (by - 118) / h), sx = ax + (base * (1 - k)) / 2, A = [sx, by], B = [sx + base * k, by], V = [sx + x * k, by - h * k];
      G.A = A; G.B = B; G.V = V;
      const col = G.locked ? (okOf(s, r) ? C.ok : C.bad) : C.ink, c3 = p.color(C.sun); c3.setAlpha(40);
      p.fill(c3); p.stroke(col); p.strokeWeight(3); p.triangle(A[0], A[1], B[0], B[1], V[0], V[1]);
      const dirAV = GEO.angOf(A[0], A[1], V[0], V[1]), dirBV = GEO.angOf(B[0], B[1], V[0], V[1]), dirVA = (dirAV + 180) % 360, dirVB = (dirBV + 180) % 360;
      GEO.wedge(p, C, A[0], A[1], 26, 0, dirAV, C.sky, `${s.A}°`, 42);
      GEO.wedge(p, C, B[0], B[1], 26, dirBV, 180, C.coral, `${s.B}°`, 42);
      GEO.wedge(p, C, V[0], V[1], 22, dirVA, dirVB, C.mint, r.mode === 'falta' && !G.locked ? '?' : `${c}°`, 38);
      // El cuadrito del ángulo recto.
      p.noFill(); p.stroke(C.ink); p.strokeWeight(1.5);
      if (s.A === 90) p.rect(A[0], A[1] - 10, 10, 10); if (s.B === 90) p.rect(B[0] - 10, B[1] - 10, 10, 10);
      if (c === 90) { p.push(); p.translate(V[0], V[1]); p.rotate(-GEO.rad(dirVA)); p.rect(0, -10, 10, 10); p.pop(); }
      TK.label(p, C, 'A', A[0] - 12, A[1] + 14, C.mute, 13, 20); TK.label(p, C, 'B', B[0] + 12, B[1] + 14, C.mute, 13, 20); TK.label(p, C, 'C', V[0], V[1] - 26, C.mute, 13, 20);
      // Rayitas en los lados iguales (frente a ángulos iguales).
      const tick = (P, Q) => { const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, d = GEO.angOf(P[0], P[1], Q[0], Q[1]) + 90, [a, b] = GEO.at(mx, my, 7, d), [e, f] = GEO.at(mx, my, 7, d + 180); p.stroke(C.ink); p.strokeWeight(2.5); p.line(a, b, e, f); };
      if (r.mode === 'tipo') { if (s.A === s.B) { tick(A, V); tick(B, V); } if (s.A === c) { tick(B, V); tick(A, B); } if (s.B === c) { tick(A, V); tick(A, B); } }
      GEO.knob(p, C, V[0], V[1], C.mint);
    },
    press(G, x, y) { if (y < 96 || y > G.by + 6) return false; G.dragging = true; game.move(G, x, y); return true; },
    drag(G, x, y) { if (!G.dragging) return false; game.move(G, x, y); return true; },
    release(G) { G.dragging = false; },
    demo: G => ({ from: { x: G.V[0], y: G.V[1] }, to: { x: G.W / 2 + (G.V[0] > G.W / 2 ? -50 : 50), y: Math.max(140, G.V[1] - 30) }, text: 'Arrastra el vértice de arriba', ty: G.H - 44 }),
    peek: G => ({ A: G.A, B: G.B, V: G.V }),
  });
  // El dedo fija los dos ángulos de la base (de 5° en 5°); el de arriba es lo que falta para 180°.
  game.move = (G, x, y) => {
    const a = GEO.angOf(G.ax, G.by, x, y), b = 180 - GEO.angOf(G.bx, G.by, x, y);
    let A = Math.max(10, Math.min(150, GEO.snap(a > 180 ? 10 : a, 5))), B = Math.max(10, Math.min(150, GEO.snap(b < 0 || b > 180 ? 10 : b, 5)));
    if (A + B > 170) B = 170 - A;
    if (A !== G.s.A || B !== G.s.B || !G.touched[G.cur]) { G.s.A = A; G.s.B = B; G.touch(); }
  };
  return Object.assign(game, { okOf, answer });
})();
;
//#archivo js/games/escalera-pared.js
// La escalera y la pared (Preuniversitario UdeA, pu-ge-2; spec 2026-11-18-preuda-geometria): una escalera de largo
// fijo apoyada en una pared. Se arrastra su pie por el piso: la punta sube o baja sola, porque el largo no cambia.
// Hay que dejar la punta justo en la ventana. La distancia del pie, la altura y el largo forman un triángulo
// rectángulo: d² + h² = L². El juego muestra d y h mientras se arrastra.
// params = { rounds: [{ L, h }] }   (h: altura de la ventana; d sale entero)   state = { rounds: [{ d }] }
GAMES['escalera-pared'] = (() => {
  const need = r => Math.sqrt(r.L * r.L - r.h * r.h);
  const game = roundsGame({
    aspect: 1.4,
    init: r => ({ d: 1 }),
    ok: (s, r) => s.d === need(r),
    solution: r => `pie a ${need(r)} m de la pared`,
    prompt: r => `La escalera mide ${r.L} m. Llévala hasta la ventana, a ${r.h} m`,
    foot: (r, s) => `pie² + altura² = ${s.d * s.d} + ${(r.L * r.L - s.d * s.d)} = ${r.L * r.L}`,
    layout(G) { G.wx = 44; G.fy = G.H - 70; },
    enter(G) { G.dragging = false; },
    draw(G) {
      const { p, C, r, s, wx, fy } = G, u = G.u = Math.min((G.W - 80) / r.L, (fy - 124) / r.L), h = Math.sqrt(r.L * r.L - s.d * s.d), ok = !VELO.on && s.d === need(r);
      // Pared con marcas de metro, piso y ventana.
      p.stroke(C.ink); p.strokeWeight(4); p.line(wx, fy, wx, fy - r.L * u - 8); p.line(wx - 8, fy, G.W - 14, fy);
      p.strokeWeight(1.5); p.stroke(C.line); for (let i = 1; i <= r.L; i++) { p.line(wx - 5, fy - i * u, wx, fy - i * u); p.line(wx + i * u, fy, wx + i * u, fy + 5); }
      const wy = fy - r.h * u;
      p.noFill(); p.stroke(C.ok); p.strokeWeight(2.5); p.rect(wx - 22, wy - 12, 18, 24, 3); p.line(wx - 13, wy - 12, wx - 13, wy + 12);
      TK.label(p, C, `${r.h} m`, wx - 13, wy - 22, C.ok, 11, 40);
      // La escalera: dos largueros y peldaños.
      const fx = wx + s.d * u, ty = fy - h * u, col = G.locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.sun;
      p.stroke(col); p.strokeWeight(5); p.line(fx, fy, wx, ty);
      p.stroke(C.bg); p.strokeWeight(2); for (let i = 1; i < r.L; i++) { const k = i / r.L, x = fx + (wx - fx) * k, y = fy + (ty - fy) * k, a = Math.atan2(ty - fy, wx - fx) + Math.PI / 2; p.line(x - 3 * Math.cos(a), y - 3 * Math.sin(a), x + 3 * Math.cos(a), y + 3 * Math.sin(a)); }
      TK.label(p, C, `${r.L} m`, (fx + wx) / 2 + 18, (fy + ty) / 2 - 10, C.N, 13, 50);
      // Las dos medidas, en vivo.
      p.stroke(C.sky); p.strokeWeight(3); p.line(wx, fy + 14, fx, fy + 14);
      TK.label(p, C, `pie: ${s.d} m`, (wx + fx) / 2 + 10, fy + 30, C.sky, 13, 110);
      p.stroke(C.coral); p.strokeWeight(3); p.line(wx + 9, fy, wx + 9, ty);
      TK.label(p, C, `altura: ${Number.isInteger(h) ? h : h.toFixed(1)} m`, wx + 62, Math.min(fy - 16, Math.max(ty + 14, 132)), C.coral, 13, 110);
      G.fx = fx; GEO.knob(p, C, fx, fy, C.sky);
    },
    press(G, x, y) { if (Math.abs(y - G.fy) > 34) return false; G.dragging = true; game.move(G, x); return true; },
    drag(G, x) { if (!G.dragging) return false; game.move(G, x); return true; },
    release(G) { G.dragging = false; },
    demo: G => ({ from: { x: G.fx, y: G.fy }, to: { x: G.fx + 4 * G.u, y: G.fy }, text: 'Arrastra el pie de la escalera', ty: 106 }),
    peek: G => ({ wx: G.wx, fy: G.fy, u: G.u, need: need(G.r) }),
  });
  game.move = (G, x) => { const d = Math.max(0, Math.min(G.r.L, Math.round((x - G.wx) / G.u))); if (d !== G.s.d || !G.touched[G.cur]) { G.s.d = d; G.touch(); } };
  return Object.assign(game, { need });
})();
;
//#archivo js/games/toca-lados.js
// Toca los lados (Trigonometría, trig-1; con csc, sec y cot en trig-42c): el triángulo sale girado o volteado y hay que mirar desde θ.
// Se toca primero el lado de arriba de la fracción y luego el de abajo. item = { fn, t (0–7: volteos), len: [op, ady, hip] }
GAMES['toca-lados'] = (() => {
  const PAIR = { sen: [0, 2], cos: [1, 2], tan: [0, 1], csc: [2, 0], sec: [2, 1], cot: [1, 0] };
  return questGame({
    aspect: 1.3,
    init: () => ({ pick: [] }),
    ok: (s, it) => s.pick.join() === PAIR[it.fn].join(),
    answer: it => ({ pick: [...PAIR[it.fn]] }),
    solution: it => `$${TK.FN[it.fn]}\\theta = \\tfrac{${it.len[PAIR[it.fn][0]]}}{${it.len[PAIR[it.fn][1]]}}$`,
    prompt: it => `Arma $${TK.FN[it.fn]}\\theta$: toca el lado de arriba y luego el de abajo`,
    foot: () => 'Mira desde θ: el opuesto queda al frente; la hipotenusa, frente al ángulo recto',
    no: () => 'Esos dos lados forman otra razón',
    retry: G => { G.s.pick = []; },
    layout(G) {
      const it = G.item, t = it.t || 0, k = Math.max(0.4, Math.min(1, it.len[0] / it.len[1])), kx = Math.max(0.4, Math.min(1, it.len[1] / it.len[0]));
      const w = Math.min(G.W - 110, G.bottom - G.top - 96, 180), h = w, x0 = (G.W - w) / 2, y0 = G.top + 58;
      const P = ([u, v]) => { if (t & 4) [u, v] = [v, u]; if (t & 1) u = 1 - u; if (t & 2) v = 1 - v; return [x0 + u * w, y0 + v * h]; };
      const A = P([(1 - kx) / 2, 1]), B = P([(1 + kx) / 2, 1]), T = P([(1 + kx) / 2, 1 - k]);
      G.A = A; G.B = B; G.T = T; G.seg = [[B, T], [A, B], [A, T]]; G.cen = [(A[0] + B[0] + T[0]) / 3, (A[1] + B[1] + T[1]) / 3];
    },
    draw(G) {
      const { p, C, s, item: it, A, B, T, seg, cen } = G, col = i => (s.pick[0] === i ? C.sky : s.pick[1] === i ? C.coral : C.ink);
      const show = i => (s.pick[i] == null ? '\\square' : it.len[s.pick[i]]);
      TK.label(p, C, `$${TK.FN[it.fn]}\\theta = \\tfrac{${show(0)}}{${show(1)}}$`, G.W / 2, G.top + 26, G.solved ? C.ok : C.ink, 22, G.W - 40);
      p.noStroke(); p.fill(C.card); p.triangle(...A, ...B, ...T);
      seg.forEach(([a, b], i) => { p.stroke(col(i)); p.strokeWeight(s.pick.includes(i) ? 6 : 3); p.line(...a, ...b); });
      // Ángulo recto y θ.
      const u = (a, b, d) => { const n = Math.hypot(b[0] - a[0], b[1] - a[1]); return [a[0] + (b[0] - a[0]) / n * d, a[1] + (b[1] - a[1]) / n * d]; };
      const q1 = u(B, A, 12), q2 = u(B, T, 12); p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.quad(...B, ...q1, q1[0] + q2[0] - B[0], q1[1] + q2[1] - B[1], ...q2);
      const th = u(A, cen, 30); drawDot(p, C, A[0], A[1], 9, C.N); TK.label(p, C, 'θ', th[0], th[1], C.N, 17, 30);
      seg.forEach(([a, b], i) => TK.sideLabel(p, C, it.len[i], a, b, cen, col(i)));
    },
    press(G, x, y) {
      const s = G.s, i = TK.hitSeg(G.seg, x, y);
      if (i < 0 || s.pick.includes(i)) return i >= 0;
      s.pick.push(i); G.api.sfx?.tap?.();
      if (s.pick.length === 2) G.submit();
      return true;
    },
    peek: G => ({ solve: PAIR[G.item.fn].filter(i => !G.s.pick.includes(i) || G.s.pick.length === 0).map(i => TK.mid(...G.seg[i])) }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/explora-angulo.js
// Explora · escena «angulo» (spec 2026-11-23-explora-leccion-interactiva, lección trig-41a): una rueda donde el lado terminal
// se arrastra con el dedo. Se puede girar más de una vuelta y hacia atrás; una espiral muestra el giro (positivo, color del
// curso; negativo, naranja). En las explicaciones, cada momento puede mostrar el radio (`radio`), el arco sobre la
// circunferencia (`arco`), radios de un radián puestos uno tras otro (`radios`) o un rótulo propio (`etiqueta`).
// Va después de js/explora.js (usa XP, XPD, XS, xpSpring, xpTick, xpMenos, xpClamp).

const xpGcd = (a, b) => (b ? xpGcd(b, a % b) : a);
// Grados enteros → radianes con π (en TeX y en texto plano).
function xpRad(deg, tex = true) {
  if (!deg) return '0';
  const g = xpGcd(Math.abs(deg), 180), n = Math.abs(deg / g), d = 180 / g, sg = deg < 0 ? (tex ? '-' : '−') : '';
  const pi = tex ? '\\pi' : 'π', num = n === 1 ? pi : `${n}${pi}`;
  if (d === 1) return `${sg}${num}`;
  return tex ? `${sg}\\tfrac{${num}}{${d}}` : `${sg}${num}/${d}`;
}
const xpGiro = x => ((x % 360) + 540) % 360 - 180;   // diferencia de ángulos en [−180, 180)

// Ángulo: `meta` (grados) o, con `cot`, cualquier coterminal de `cot` distinto de él. `etq`: 'grados', 'rad' o 'ambos'.
XP.angulo = {
  ini: p => ({ deg: p.desde ?? 0 }),
  ok: (s, p) => (p.cot != null ? s.deg !== p.cot && ((s.deg - p.cot) % 360 + 360) % 360 === 0 : s.deg === p.meta),
  sol: p => ({ deg: p.cot != null ? p.cot + 360 : p.meta }),
  lee(s, p) {
    const g = `${s.deg}^\\circ`, r = xpRad(s.deg);
    return `$\\theta = ${p.etq === 'rad' ? r : p.etq === 'grados' ? g : `${g} = ${r}`}$`;
  },
  dice(s, p = {}) {
    const d = s.deg, a = Math.abs(d), v = Math.floor(a / 360), r = a % 360;
    if (!d) return p.pista || 'Arrastra el lado terminal para girar.';
    if (v) return `${v === 1 ? 'Una vuelta' : `${v} vueltas`}${r ? ` y ${r}° más` : v === 1 ? ' exacta' : ' exactas'}, ${d > 0 ? 'hacia adelante' : 'hacia atrás'}.`;
    return `Giraste ${a}° ${d > 0 ? 'contra las agujas del reloj: positivo' : 'como las agujas del reloj: negativo'}.`;
  },
};

XPD.angulo = (stage, p, s, api) => {
  const W = 340, H = 236, CX = 170, CY = 116, R = 82, lo = p.min ?? -720, hi = p.max ?? 720, paso = p.paso || 15;
  stage.innerHTML = `<svg class="xp-svg xa" viewBox="0 0 ${W} ${H}" role="slider" tabindex="0" aria-label="Ángulo: flechas para girar ${paso}°, Re Pág y Av Pág para un cuarto de vuelta" aria-valuemin="${lo}" aria-valuemax="${hi}">
    <line class="xa-ax" x1="${CX - R - 40}" y1="${CY}" x2="${CX + R + 40}" y2="${CY}"/>
    <line class="xa-ax" x1="${CX}" y1="${CY - R - 26}" x2="${CX}" y2="${CY + R + 26}"/>
    <circle class="xa-circ" cx="${CX}" cy="${CY}" r="${R}"/><g class="xp-dyn"></g></svg>`;
  const svg = stage.firstChild, dyn = svg.lastChild;
  let c = s.deg, touched = false, stop = null, lastD = s.deg, flags = {}, prev = 0;
  const P = (deg, r) => [CX + r * Math.cos(deg * Math.PI / 180), CY - r * Math.sin(deg * Math.PI / 180)];
  const camino = (a, b, rf) => {
    const n = Math.max(2, Math.ceil(Math.abs(b - a) / 4)), pts = [];
    for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n; pts.push(P(t, rf(t)).map(v => v.toFixed(1)).join(' ')); }
    return 'M' + pts.join(' L');
  };
  function draw() {
    const d = Math.round(c), neg = c < 0, RAD = 180 / Math.PI;
    if (d !== lastD) {
      if (Math.round(d / paso) !== Math.round(lastD / paso)) XS.tick(d / 24);
      if (Math.trunc(d / 360) !== Math.trunc(lastD / 360)) XS.pop();   // una vuelta completa
      lastD = d;
    }
    let h = '';
    // Sobre la circunferencia: radios de un radián, uno tras otro, o el arco que recorre el ángulo.
    if (flags.radios && Math.abs(c) > 0.5) {
      const sg = Math.sign(c);
      for (let k = 0; k * RAD < Math.abs(c); k++) {
        h += `<path class="xa-rad${k % 2 ? ' b' : ''}" d="${camino(sg * k * RAD, sg * Math.min((k + 1) * RAD, Math.abs(c)), () => R)}"/>`;
        if ((k + 1) * RAD <= Math.abs(c)) { const m = P(sg * (k + 0.5) * RAD, R + 15); h += `<text class="xa-rl" x="${m[0]}" y="${m[1] + 5}">${k + 1}</text>`; }
      }
    } else if (flags.arco && Math.abs(c) > 0.5) {
      h += `<path class="xa-rad" d="${camino(0, c, () => R)}"/>`;
      if (Math.abs(Math.abs(c) - RAD) < 1.5) { const m = P(c / 2, R + 15); h += `<text class="xa-rl" x="${m[0]}" y="${m[1] + 5}">r</text>`; }
    }
    if (flags.radio) h += `<line class="xa-r" x1="${CX}" y1="${CY}" x2="${CX + R}" y2="${CY}"/><text class="xa-rl" x="${CX + R / 2}" y="${CY + 18}">r</text>`;
    // El giro: una espiral que se abre con cada vuelta, con su flecha.
    if (Math.abs(c) > 1) {
      const rf = t => 20 + 9 * Math.abs(t) / 360, e = P(c, rf(c)), e0 = P(c - Math.sign(c) * 8, rf(c - Math.sign(c) * 8));
      const ang = Math.atan2(e[1] - e0[1], e[0] - e0[0]);
      h += `<path class="xa-spin${neg ? ' neg' : ''}" d="${camino(0, c, rf)}"/>`
        + `<path class="xa-spin${neg ? ' neg' : ''}" d="M${e[0] - 9 * Math.cos(ang - 0.5)} ${e[1] - 9 * Math.sin(ang - 0.5)} L${e[0]} ${e[1]} L${e[0] - 9 * Math.cos(ang + 0.5)} ${e[1] - 9 * Math.sin(ang + 0.5)}"/>`;
    }
    const t = P(c, R + 14), lb = P(c, R + 50);
    h += `<line class="xa-ini" x1="${CX}" y1="${CY}" x2="${CX + R + 14}" y2="${CY}"/>`
      + `<line class="xa-term${neg ? ' neg' : ''}" x1="${CX}" y1="${CY}" x2="${t[0]}" y2="${t[1]}"/>`
      + `<circle class="xa-o" cx="${CX}" cy="${CY}" r="3.5"/>`;
    if (!touched) h += `<circle class="xp-halo" cx="${t[0]}" cy="${t[1]}" r="12"/>`;
    h += `<g class="xp-tok${neg ? ' flip' : ''}"><circle cx="${t[0]}" cy="${t[1]}" r="11"/></g>`;
    const etq = p.etq || 'ambos';
    const calc = etq === 'rad' ? xpRad(d, false) : etq === 'grados' ? `${xpMenos(d)}°` : `${xpMenos(d)}° = ${xpRad(d, false)}`;
    const txt = flags.etiqueta != null ? (Math.abs(c - (flags.a ?? c)) < 0.5 ? flags.etiqueta : '') : calc;
    const w = txt.length * 8, sn = Math.sin(c * Math.PI / 180);
    if (Math.abs(sn) > 0.8) {   // arriba o abajo: al lado de la manija
      const der = t[0] + 20 + w <= W - 4;
      h += `<text class="xa-lab" text-anchor="${der ? 'start' : 'end'}" x="${der ? t[0] + 20 : t[0] - 20}" y="${t[1] + 5}">${txt}</text>`;
    } else h += `<text class="xa-lab" x="${xpClamp(lb[0], w / 2 + 4, W - w / 2 - 4)}" y="${xpClamp(lb[1] + 5, 16, H - 6)}">${txt}</text>`;
    dyn.innerHTML = h;
    svg.setAttribute('aria-valuenow', String(d));
    svg.setAttribute('aria-valuetext', `${d} grados`);
  }
  const raw = e => {
    const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width - CX, y = (e.clientY - r.top) * H / r.height - CY;
    return Math.atan2(-y, x) * 180 / Math.PI;
  };
  const fija = () => { const d = xpClamp(Math.round(c / paso) * paso, lo, hi); if (d !== s.deg) { s = { deg: d }; xpTick(); api.set(s, true); } };
  let dedo = null;
  const lejos = e => { const r = svg.getBoundingClientRect(); return Math.hypot((e.clientX - r.left) * W / r.width - CX, (e.clientY - r.top) * H / r.height - CY) > 18; };
  svg.onpointerdown = e => {
    if (dedo != null || !lejos(e)) return;
    dedo = e.pointerId; touched = true; stop?.();
    try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
    svg.classList.add('drag');
    prev = raw(e); c = xpClamp(c + xpGiro(prev - c), lo, hi);   // el lado terminal salta al dedo por el camino más corto
    fija(); draw();
    svg.onpointermove = ev => {
      if (ev.pointerId !== dedo) return;
      const a = raw(ev);
      if (lejos(ev)) { c = xpClamp(c + xpGiro(a - prev), lo, hi); fija(); draw(); }
      prev = a;
    };
  };
  svg.onpointerup = svg.onpointercancel = e => {
    if (!svg.onpointermove || e.pointerId !== dedo) return;
    dedo = null; svg.onpointermove = null; svg.classList.remove('drag');
    api.set(s);   // la meta cuenta donde se suelta
    stop = xpSpring(c, s.deg, x => { c = x; draw(); });
  };
  svg.onkeydown = e => {
    const k = { ArrowRight: paso, ArrowUp: paso, ArrowLeft: -paso, ArrowDown: -paso, PageUp: 90, PageDown: -90 }[e.key];
    if (k == null && e.key !== 'Home') return;
    e.preventDefault(); touched = true; stop?.();
    c = e.key === 'Home' ? 0 : xpClamp(s.deg + k, lo, hi);
    s = { deg: Math.round(c) }; xpTick(); api.set(s); draw();
  };
  draw();
  return Object.assign(() => stop?.(), { mover(x, m) { touched = true; if (m) flags = m; c = x; s = { deg: Math.round(x) }; draw(); } });
};
;
//#archivo js/explora-numeros.js
// Explora · escenas de números (Preuniversitario, mundo 1 «Cálculo mental»; spec 2026-11-23-explora-leccion-interactiva):
//   barras    fracciones: una barra que se corta en partes iguales (regla de abajo) y se llena arrastrando; al cortar, lo
//             tomado conserva su tamaño (1/2 = 2/4 = 4/8 se ve). Con `total`, cada parte muestra cuánto vale.
//   cien      porcentajes: una cuadrícula de 100 que se pinta arrastrando; `quita` marca las casillas que se quitan.
//   potencia  potencias y raíces: factores en fichas y puntos que se multiplican al arrastrar el exponente; con modo 'lado',
//             un cuadrado que crece al arrastrar el lado.
// En las explicaciones (`muestra`) cada escena tiene `anima(m, done)` y `salta(momentos)`. Va después de js/explora.js.

const xpGcd2 = (a, b) => (b ? xpGcd2(b, a % b) : Math.abs(a));
const xpNum = x => String(Math.round(x * 1000) / 1000).replace('-', '−');                 // 0.8, 12, 2.5 (sin ceros de más)
const xpNumTex = x => String(Math.round(x * 1000) / 1000);
const xpFrac = (n, d) => (d === 1 ? `${n}` : `\\tfrac{${n}}{${d}}`);
// Miles con espacio (la app usa el punto como decimal): 100 000 en texto y 100\,000 en TeX.
const xpMiles = (v, tex) => String(v).replace(/\B(?=(\d{3})+$)/g, tex ? '\\,' : ' ');

// ---------------------------------------------------------------------------------------------------------------- barras
// Práctica: meta [n, d] (la fracción pedida), d inicial, cortar (se puede cambiar el número de partes), dpide (con cuántas
// partes debe quedar), total (cantidad).
XP.barras = {
  ini: p => ({ d: p.d ?? (p.meta ? p.meta[1] : 4), n: p.n ?? 0 }),
  ok: (s, p) => s.n > 0 && s.n * p.meta[1] === p.meta[0] * s.d && (!p.dpide || s.d === p.dpide),   // dpide: con ese número de partes
  sol: p => {
    const d = p.dpide ?? (p.cortar ? p.meta[1] : (p.d ?? p.meta[1]));
    return { d, n: p.meta[0] * d / p.meta[1] };
  },
  lee(s, p) {
    if (!s.n) return p.total ? `$\\text{cada parte} = ${xpNumTex(p.total / s.d)}$` : '';
    if (p.total) return `$${xpFrac(s.n, s.d)} \\text{ de } ${p.total} = ${xpNumTex(s.n * p.total / s.d)}$`;
    const g = xpGcd2(s.n, s.d);
    return `$${xpFrac(s.n, s.d)}${g > 1 ? ` = ${xpFrac(s.n / g, s.d / g)}` : ''}$`;
  },
  dice(s, p) {
    if (!s.n) return `Arrastra sobre la barra para tomar partes.${p.cortar ? ' Con la regla de abajo eliges en cuántas cortar.' : ''}`;
    if (s.d === 1) return `La barra está entera: ${s.n ? 'la tomaste toda' : 'córtala con la regla de abajo'}.`;
    return `Cortaste en ${s.d} partes iguales y tomaste ${s.n}.${p.total ? ` Cada parte vale ${xpNum(p.total / s.d)}.` : ''}`;
  },
};

XPD.barras = (stage, p, s, api) => {
  const W = 340, X0 = 20, BW = 300;
  let vis = p.meta ? [{ n: s.n, d: s.d, total: p.total, f: s.n / s.d }] : [];   // en una explicación, las barras las pone cada momento
  let stop = null, arr = null;
  stage.innerHTML = `<svg class="xp-svg xb" viewBox="0 0 ${W} 150" role="img" aria-label="Barras de fracciones"></svg>`;
  const svg = stage.firstChild;
  const maxB = Math.max(1, ...(p.momentos || []).map(m => (m.barras || []).length));
  const conTotal = p.total != null || (p.momentos || []).some(m => (m.barras || []).some(b => b.total != null));
  const alto = () => (p.meta ? (p.cortar ? 150 : 104) + (p.total != null && !p.cortar ? 16 : 0) : maxB * 62 + 12 + (conTotal ? 20 : 0));
  function draw() {
    const H = alto(); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const conEt = vis.some(b => b.label), x0 = conEt ? 64 : X0, bw = conEt ? 256 : BW, bh = maxB > 1 ? 30 : 44;
    let h = '';
    vis.forEach((b, i) => {
      const y = p.meta ? 18 : 16 + i * 62, pw = bw / b.d;
      if (b.label) h += `<text class="xb-lab" x="${x0 - 12}" y="${y + bh / 2 + 6}">${b.label}</text>`;
      h += `<rect class="xb-out" x="${x0}" y="${y}" width="${bw}" height="${bh}" rx="7"/>`;
      if (b.f > 0.001) h += `<rect class="xb-fill" x="${x0}" y="${y}" width="${bw * Math.min(1, b.f)}" height="${bh}" rx="7"/>`;
      for (let k = 1; k < b.d; k++) h += `<line class="xb-cut" x1="${x0 + k * pw}" y1="${y}" x2="${x0 + k * pw}" y2="${y + bh}"/>`;
      if (b.total != null && b.d <= 10 && Number.isInteger(b.total / b.d)) {
        for (let k = 0; k < b.d; k++) h += `<text class="xb-val${k < b.n ? ' on' : ''}" x="${x0 + (k + 0.5) * pw}" y="${y + bh + 16}">${xpNum(b.total / b.d)}</text>`;
      }
    });
    if (p.meta && p.cortar) {   // regla de cortes: de 1 a 12 partes
      const y = 118, X = k => X0 + (k - 1) / 11 * BW;
      h += `<line class="xb-rule" x1="${X0}" y1="${y}" x2="${X0 + BW}" y2="${y}"/>`;
      for (let k = 1; k <= 12; k++) h += `<line class="xb-tk" x1="${X(k)}" y1="${y - 4}" x2="${X(k)}" y2="${y + 4}"/>`;
      h += `<text class="xb-rl" x="${X0}" y="${y - 12}" text-anchor="start">partes</text>`
        + `<g class="xp-tok"><circle cx="${X(s.d)}" cy="${y}" r="13"/><text x="${X(s.d)}" y="${y + 5}">${s.d}</text></g>`;
    }
    svg.innerHTML = h;
  }
  if (p.meta) {
    const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * alto() / r.height]; };
    const mueve = e => {
      const [x, y] = at(e);
      if (arr === 'cortar') {
        const d = xpClamp(Math.round((x - X0) / BW * 11) + 1, 1, 12);
        if (d !== s.d) { s = { d, n: Math.round(f0 * d) }; XS.tick(d); xpTick(); api.set(s, true); }   // lo tomado conserva su tamaño
      } else {
        const n = x < X0 ? 0 : xpClamp(Math.ceil((x - X0) / BW * s.d), 0, s.d);   // la parte que toca el dedo
        if (n !== s.n) { s = { d: s.d, n }; XS.tick(n); xpTick(); api.set(s, true); }
      }
      vis = [{ n: s.n, d: s.d, total: p.total, f: s.n / s.d }]; draw();
    };
    let f0 = 0, dedo = null;
    svg.onpointerdown = e => {
      if (dedo != null) return;
      dedo = e.pointerId;
      const [, y] = at(e);
      arr = p.cortar && y > 96 ? 'cortar' : 'llenar'; f0 = s.n / s.d;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      mueve(e); svg.onpointermove = ev => { if (ev.pointerId === dedo) mueve(ev); };
    };
    svg.onpointerup = svg.onpointercancel = e => { if (!arr || e.pointerId !== dedo) return; arr = null; dedo = null; svg.onpointermove = null; api.set(s); };
  }
  draw();
  const aplica = m => (m.barras || []).map((b, i) => ({ ...b, f0: vis[i]?.f ?? 0, f: b.n / b.d }));
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      const nuevas = aplica(m);
      if (!nuevas.length) { const t = setTimeout(done, 300); return () => clearTimeout(t); }
      if (nuevas.length !== vis.length || nuevas.some((b, i) => b.d !== vis[i]?.d)) XS.pop();
      vis = nuevas.map(b => ({ ...b, f: b.f0 }));
      stop = xpTween(0, 1, m.ms || 1100, t => { vis = nuevas.map(b => ({ ...b, f: b.f0 + (b.f - b.f0) * t })); draw(); }, done);
      return () => stop?.();
    },
    salta(ms) { const u = [...ms].reverse().find(m => m.barras); if (u) { vis = aplica(u); draw(); } },
  });
};

// ------------------------------------------------------------------------------------------------------------------ cien
XP.cien = {
  ini: p => ({ k: p.k ?? 0 }),
  ok: (s, p) => s.k === p.meta,
  sol: p => ({ k: p.meta }),
  lee(s, p) {
    const k = s.k;
    let t = `${k}\\,\\% = \\tfrac{${k}}{100} = ${xpNumTex(k / 100)}`;
    if (p.total) t += ` \\quad ${k}\\,\\% \\text{ de } ${p.total} = ${xpNumTex(k * p.total / 100)}`;
    return `$${t}$`;
  },
  dice(s, p) {
    if (!s.k) return 'Arrastra sobre la cuadrícula para pintar casillas.';
    return `${s.k} de cada 100 casillas.${p.total ? ` Cada casilla vale ${xpNum(p.total / 100)}.` : ''}`;
  },
};

XPD.cien = (stage, p, s, api) => {
  const C = 19, G = 3, S = 10 * C + 9 * G, W = 340, X0 = (W - S) / 2, Y0 = 6;
  let vis = { k: s.k, quita: 0 }, stop = null, arr = false, lastK = s.k;
  stage.innerHTML = `<svg class="xp-svg xc100" viewBox="0 0 ${W} ${S + 12}" role="img" aria-label="Cuadrícula de 100 casillas"></svg>`;
  const svg = stage.firstChild;
  function draw() {
    const k = Math.round(vis.k), q = vis.quita || 0;
    if (k !== lastK) { if (Math.abs(k - lastK) <= 3 || k % 5 === 0) XS.tick(k / 6); lastK = k; }
    let h = '';
    for (let i = 0; i < 100; i++) {
      const r = Math.floor(i / 10), c = i % 10;
      const cls = i < k - q ? 'on' : i < k ? 'quita' : '';
      h += `<rect class="xc-cell ${cls}" x="${X0 + c * (C + G)}" y="${Y0 + r * (C + G)}" width="${C}" height="${C}" rx="4"/>`;
    }
    svg.innerHTML = h;
  }
  if (p.meta != null) {
    const celda = e => {
      const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width - X0, y = (e.clientY - r.top) * (S + 12) / r.height - Y0;
      const c = xpClamp(Math.floor(x / (C + G)), 0, 9), f = xpClamp(Math.floor(y / (C + G)), 0, 9);
      return y < -6 ? 0 : f * 10 + c + 1;
    };
    const mueve = e => { const k = celda(e); if (k !== s.k) { s = { k }; xpTick(); api.set(s, true); } vis = { k: s.k, quita: 0 }; draw(); };
    svg.onpointerdown = e => { if (arr) return; arr = e.pointerId; try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ } mueve(e); svg.onpointermove = ev => { if (ev.pointerId === arr) mueve(ev); }; };
    svg.onpointerup = svg.onpointercancel = e => { if (arr === false || e.pointerId !== arr) return; arr = false; svg.onpointermove = null; api.set(s); };
  }
  draw();
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      const k0 = Math.round(vis.k) - (vis.quita || 0), k1 = m.k ?? vis.k, q = m.quita || 0;
      vis = { k: k0, quita: 0 };
      stop = xpTween(k0, k1, m.ms || Math.min(1800, 300 + Math.abs(k1 - k0) * 22), x => { vis = { k: x, quita: 0 }; draw(); }, () => {
        if (!q) return done();
        XS.nope(); vis = { k: k1, quita: q }; draw(); const t = setTimeout(done, 500); stop = () => clearTimeout(t);
      });
      return () => stop?.();
    },
    salta(ms) { const u = [...ms].reverse().find(m => m.k != null); if (u) { vis = { k: u.k, quita: u.quita || 0 }; draw(); } },
  });
};

// -------------------------------------------------------------------------------------------------------------- potencia
// modo 'exp' (por defecto): base b, se arrastra el exponente e (0..max), meta = e pedido.
// modo 'lado': se arrastra el lado s de un cuadrado (1..max), meta = lado pedido.
XP.potencia = {
  ini: p => (p.modo === 'lado' ? { s: p.desde ?? 1 } : { e: p.desde ?? 1 }),
  ok: (s, p) => (p.modo === 'lado' ? s.s === p.meta : s.e === p.meta),
  sol: p => (p.modo === 'lado' ? { s: p.meta } : { e: p.meta }),
  lee(s, p) {
    if (p.modo === 'lado') return `$${s.s}^2 = ${s.s * s.s} \\quad\\Rightarrow\\quad \\sqrt{${s.s * s.s}} = ${s.s}$`;
    const b = p.base, e = s.e;
    if (e === 0) return `$${b}^0 = 1$`;
    if (e === 1) return `$${b}^1 = ${b}$`;
    return e > 5 && b >= 10 ? `$${b}^{${e}} = ${xpMiles(b ** e, true)}$` : `$${b}^{${e}} = ${Array(e).fill(b).join(' \\cdot ')} = ${xpMiles(b ** e, true)}$`;
  },
  dice(s, p) {
    if (p.modo === 'lado') return s.s === 1 ? 'Un cuadrado de lado 1 tiene una sola casilla.' : `Un cuadrado de lado ${s.s} tiene ${s.s * s.s} casillas.`;
    const e = s.e;
    return e === 0 ? 'Ningún factor: la potencia vale 1.' : `${e} ${e === 1 ? 'factor' : 'factores'} de ${p.base}: ${xpMiles(p.base ** e)}.`;
  },
};

XPD.potencia = (stage, p, s, api) => {
  const W = 340, H = 214, TY = 196, X0 = 30, TW = 280, max = p.max ?? (p.modo === 'lado' ? 10 : 6), min = p.modo === 'lado' ? 1 : 0;
  let vis = p.modo === 'lado' ? { s: s.s ?? 1 } : { e: s.e ?? 1, base: p.base }, arr = false, stop = null;
  stage.innerHTML = `<svg class="xp-svg xpw" viewBox="0 0 ${W} ${H}" role="img" aria-label="Potencias"></svg>`;
  const svg = stage.firstChild;
  // Puntos: b^e en un rectángulo de b^⌈e/2⌉ × b^⌊e/2⌋, agrupados de b en b; o el cuadrado de lado s.
  function puntos(cols, rows, grp, y0, y1) {
    if (cols * rows > 400) return '';
    const gw = Math.max(0, Math.ceil(cols / grp) - 1), gh = Math.max(0, Math.ceil(rows / grp) - 1);
    const st = Math.min((TW - gw * 6) / cols, (y1 - y0 - gh * 6) / rows, 22), r = Math.max(1.6, st * 0.36);
    const w = cols * st + gw * 6, hh = rows * st + gh * 6, x0 = (W - w) / 2, yy = y0 + (y1 - y0 - hh) / 2;
    let h = '';
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      h += `<circle class="xpw-dot" cx="${x0 + i * st + Math.floor(i / grp) * 6 + st / 2}" cy="${yy + j * st + Math.floor(j / grp) * 6 + st / 2}" r="${r}"/>`;
    }
    return h;
  }
  function draw() {
    let h = '';
    if (p.modo === 'lado' || vis.s != null) {
      const n = Math.round(vis.s ?? 1);
      h += puntos(n, n, 100, 8, 160) + `<text class="xpw-big" x="${W / 2}" y="${p.meta != null ? 182 : 196}">lado ${n} · ${n * n} ${n === 1 ? 'casilla' : 'casillas'}</text>`;
    } else if (vis.grupos) {   // las leyes: grupos de factores que se cuentan
      const b = vis.base; let x = 0;
      const fichas = vis.grupos.map((g, gi) => Array(g).fill(0).map((_, k) => ({ gi, k })));
      const todas = fichas.flat(), cw = Math.min(34, (TW - (vis.grupos.length - 1) * 14) / todas.length);
      const tw = todas.length * cw + (vis.junta ? 0 : (vis.grupos.length - 1) * 14), x0 = (W - tw) / 2;
      fichas.forEach((g, gi) => {
        g.forEach(() => { h += `<g class="xpw-chip g${gi % 3}"><rect x="${x0 + x}" y="60" width="${cw - 4}" height="34" rx="7"/><text x="${x0 + x + (cw - 4) / 2}" y="83">${b}</text></g>`; x += cw; });
        if (!vis.junta) { h += `<text class="xpw-sub" x="${x0 + x - g.length * cw / 2 - 2}" y="120">${b}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[g.length] || ''}</text>`; x += 14; }
      });
      if (vis.junta) h += `<text class="xpw-big" x="${W / 2}" y="130">${b}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[todas.length] || ''} · ${todas.length} factores</text>`;
    } else {
      const b = vis.base, e = Math.round(vis.e);
      const n = Math.min(e, 8), cw = Math.min(36, TW / Math.max(1, n));
      for (let k = 0; k < n; k++) h += `<g class="xpw-chip g0"><rect x="${(W - n * cw) / 2 + k * cw}" y="8" width="${cw - 4}" height="30" rx="7"/><text x="${(W - n * cw) / 2 + k * cw + (cw - 4) / 2}" y="29">${b}</text></g>`;
      const v = b ** e, c = b ** Math.ceil(e / 2), r = b ** Math.floor(e / 2);
      h += v <= 400 ? puntos(c, r, b, 46, p.meta != null ? 170 : 186) : `<text class="xpw-big" x="${W / 2}" y="112">${xpMiles(v)}</text>`;
    }
    if (p.meta != null) {   // control: el exponente (o el lado) se arrastra
      const X = k => X0 + (k - min) / (max - min) * TW, cur = p.modo === 'lado' ? s.s : s.e;
      h += `<line class="xb-rule" x1="${X0}" y1="${TY}" x2="${X0 + TW}" y2="${TY}"/>`;
      for (let k = min; k <= max; k++) h += `<line class="xb-tk" x1="${X(k)}" y1="${TY - 4}" x2="${X(k)}" y2="${TY + 4}"/>`;
      h += `<g class="xp-tok"><circle cx="${X(cur)}" cy="${TY}" r="12"/><text x="${X(cur)}" y="${TY + 5}">${cur}</text></g>`;
    }
    svg.innerHTML = h;
  }
  if (p.meta != null) {
    let dedo = null;
    const mueve = e => {
      const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) * W / r.width;
      const v = xpClamp(Math.round((x - X0) / TW * (max - min)) + min, min, max);
      const cur = p.modo === 'lado' ? s.s : s.e;
      if (v !== cur) { s = p.modo === 'lado' ? { s: v } : { e: v }; XS.hop(v); xpTick(); api.set(s, true); }
      vis = p.modo === 'lado' ? { s: s.s } : { e: s.e, base: p.base }; draw();
    };
    // Solo la franja de la regla mueve el control: sobre los puntos se puede desplazar la página.
    svg.onpointerdown = e => {
      const r = svg.getBoundingClientRect();
      if (dedo != null || (e.clientY - r.top) * H / r.height < 165) return;
      dedo = e.pointerId; arr = true; try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      mueve(e); svg.onpointermove = ev => { if (ev.pointerId === dedo) mueve(ev); };
    };
    svg.onpointerup = svg.onpointercancel = e => { if (!arr || e.pointerId !== dedo) return; arr = false; dedo = null; svg.onpointermove = null; api.set(s); };
  }
  draw();
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      if (m.grupos) { vis = { base: m.base ?? vis.base ?? p.base, grupos: m.grupos, junta: !!m.junta }; XS.pop(); draw(); const t = setTimeout(done, 700); return () => clearTimeout(t); }
      if (m.s != null) {
        const a = vis.s ?? 1; vis = { s: a };
        stop = xpTween(a, m.s, m.ms || 1200, x => { const n = Math.round(x); if (n !== Math.round(vis.s)) XS.hop(n); vis = { s: x }; draw(); }, done);
        return () => stop?.();
      }
      const base = m.base ?? vis.base ?? p.base, a = base === vis.base ? (vis.e ?? 0) : 0;   // otra base: se empieza de cero
      vis = { base, e: a };
      stop = xpTween(a, m.e ?? a, m.ms || 1300, x => { const n = Math.round(x); if (n !== Math.round(vis.e)) XS.hop(n); vis = { base, e: x }; draw(); }, done);
      return () => stop?.();
    },
    salta(ms) {
      const u = ms[ms.length - 1];
      vis = u.grupos ? { base: u.base ?? p.base, grupos: u.grupos, junta: !!u.junta } : u.s != null ? { s: u.s } : { base: u.base ?? p.base, e: u.e ?? 1 };
      draw();
    },
  });
};
;
//#archivo js/explora-alg-mundos-1-2.js
// Álgebra · mundos 1 (Teoría de Conjuntos: alg-0b y alg-0c) y 2 (La Recta Real), Explora. Ejemplos propios, que no salen en los ejercicios.
{
  const bola = (K, x, y, r, t, cls, tx = 'b') => K.c(x, y, r, cls) + K.t(x, y - r + 20, t, tx);
  // ---------------------------------------------------------------------------------------------------------- alg-0b
  const dentro = (v, K) => K.r(14, 8, 312, 160, 'fc', 10) + K.c(150 + 40 * (1 - v.in), 92, 66, 'fa') + K.t(150 + 40 * (1 - v.in) - 44, 46, 'B', 'b ta') + K.c(60 + 90 * v.in, 104, 30, 'fg') + K.t(60 + 90 * v.in, 110, 'A', 'b tg') + (v.p ? K.t(170, 190, v.p, 'ta') : '');
  const partes = (v, K) => {
    const n = Math.round(v.n), N = 2 ** n, e = ['t', 'c', 'm', 'q', 'n'], w = Math.min(58, 310 / Math.min(N, 8)); let h = K.t(170, 24, `{${e.slice(0, n).join(', ')}}`, 'b ta');
    for (let i = 0; i < N; i++) { const s = e.filter((_, k) => i >> k & 1).join(''); const f = Math.floor(i / 8), c = i % 8, x = 170 + (c - (Math.min(N, 8) - 1) / 2) * w; h += K.r(x - w / 2 + 2, 40 + f * 30, w - 4, 26, 'fa', 6) + K.t(x, 57 + f * 30, s || '∅', 's'); }
    return h;
  };
  xpLec('alg-0b', [
    ['Estar contenido', xpMira('dibujo', 'Empecemos por la idea: un conjunto puede estar **dentro** de otro.', { dib: dentro, v: { in: 0, p: '' }, alto: 200 }, [
      ['A son los perros callejeros del barrio; B, todos los perros del barrio.', {}],
      ['Cada elemento de A también está en B: A cabe entero dentro.', { in: 1 }, '$A \\subseteq B$'],
      ['Se dice que A es **subconjunto** de B. Basta un solo elemento afuera para que no lo sea.', {}, '$A \\subseteq B$'],
      ['Además, B tiene perros con dueño, que no están en A: es un subconjunto propio.', {}, '$A \\subset B$'],
      ['Ojo: ∈ une un elemento con un conjunto; ⊆ une dos conjuntos.', {}, '$x \\in A, \\quad A \\subseteq B$'],
    ], '$A \\subseteq B$: todo elemento de A está en B. El elemento usa $\\in$; el conjunto, $\\subseteq$.'),
    xpHaz('fichas', 'Deja en A solo letras que hagan cierto $A \\subseteq B$, con B = {r, i, o, s}. Son tres.', { slots: [{ x: 170, y: 50, w: 220, h: 56, n: 3 }], fichas: ['r', 'a', 's', 'm', 'o'], meta: [['r', 's', 'o']], alto: 90, pista: 'Alguna de tus letras no está en B.' }, 'r, s y o están en B: $\\{r, s, o\\} \\subseteq B$.')],
    ['El vacío y los iguales', xpMira('dibujo', 'Segunda idea: el **vacío** cabe en todos, y dos iguales caben uno en el otro.', { dib: (v, K) => K.c(90, 84, 54, 'fa') + K.t(90, 90, v.a, 's') + K.c(250, 84, 54, 'fg') + K.t(250, 90, v.b, 's') + K.t(170, 92, v.m, 'b'), v: { a: 'a, m, o, r', b: 'r, o, m, a', m: '?' }, alto: 160 }, [
      ['Letras de AMOR y letras de ROMA. ¿Son conjuntos distintos?', {}],
      ['Cada uno está dentro del otro: son el mismo conjunto.', { m: '=' }, '$A \\subseteq B \\text{ y } B \\subseteq A$'],
      ['Ahora A son los triángulos de cuatro lados. No hay ninguno.', { a: '∅', b: 'figuras', m: '⊆' }, '$A = \\varnothing$'],
      ['El vacío no tiene elementos que se salgan: está contenido en todo conjunto.', {}, '$\\varnothing \\subseteq B$'],
      ['Pero {∅} no está vacío: es una caja con una caja vacía adentro.', { a: '{∅}', b: '1 cosa', m: '→' }, '$\\{\\varnothing\\} \\neq \\varnothing$'],
    ], 'Iguales: cada uno contenido en el otro. El vacío está contenido en todos.'),
    xpFila('Pon entre cada pareja el símbolo que va: 3 □ {1, 3}; {3} □ {1, 3}; {3, 1} □ {1, 3}.', ['3 □ {1, 3}', '{3} □ {1, 3}', '{3, 1} □ {1, 3}'], ['∈', '⊂', '='], ['∉'], 'Elemento con conjunto: pertenece. Uno menor que el otro: contenido. Los mismos: iguales.', 'Elemento, subconjunto propio e iguales.')],
    ['Todos los subconjuntos', xpMira('dibujo', 'Tercera idea: el **conjunto de partes** reúne todos los subconjuntos.', { dib: partes, v: { n: 0 }, alto: 150 }, [
      ['El vacío tiene un solo subconjunto: él mismo.', {}, '$2^0 = 1$'],
      ['Con un elemento hay dos: no llevarlo o llevarlo.', { n: 1 }, '$2^1 = 2$'],
      ['Con dos, cuatro: cada subconjunto anterior sin el nuevo y con el nuevo.', { n: 2 }, '$2^2 = 4$'],
      ['Con tres, ocho. Cada elemento nuevo duplica.', { n: 3 }, '$2^3 = 8$'],
      ['Con n elementos: dos opciones por cada uno.', { n: 3 }, '$2^n$'],
    ], 'Un conjunto de n elementos tiene $2^n$ subconjuntos.'),
    xpMueve('¿Cuántos elementos hacen falta para tener **32** subconjuntos?', 230, { n: 1 }, [xpRegla('n', 0, 5, 'elementos')], { n: 5 }, partes, '$2^5 = 32$.', { lee: v => `$2^{${v.n}} = ${2 ** v.n}$` })],
    ['Ahora sí, un problema', xpMueve('Una hamburguesería cobra lo mismo por cualquier combinación de salsas, incluso ninguna. Quiere ofrecer **16** combinaciones. ¿Cuántas salsas necesita?', 230, { n: 1 }, [xpRegla('n', 0, 5, 'salsas')], { n: 4 }, partes, 'Cada salsa se pone o no: $2^4 = 16$.', { lee: v => `$2^{${v.n}} = ${2 ** v.n}$` })],
  ], 'Contenido es «todos los de uno están en el otro»; y hay $2^n$ subconjuntos.');

  // ---------------------------------------------------------------------------------------------------------- alg-0c
  const R = 62, h0 = Math.sqrt(R * R - 1444), T = 92 - h0, U = 92 + h0, ar = `A${R} ${R} 0`;
  const Z = { a: `M170 ${T} ${ar} 1 0 170 ${U} ${ar} 0 1 170 ${T} Z`, i: `M170 ${T} ${ar} 0 0 170 ${U} ${ar} 0 0 170 ${T} Z`, b: `M170 ${T} ${ar} 1 1 170 ${U} ${ar} 0 0 170 ${T} Z` };
  const pz = (k, c) => `<path class="xf ${c} sn" d="${Z[k]}"/>`;
  const venn = (v, K) => K.r(14, 10, 312, 164, v.o > 0.5 ? 'fa' : 'fc', 10) + ['a', 'i', 'b'].map(k => pz(k, v[k] > 0.5 ? 'fa' : 'fop')).join('') + K.c(132, 92, R, 'fn') + K.c(208, 92, R, 'fn') + K.t(66, 34, 'A', 'b ta') + K.t(274, 34, 'B', 'b tg') + [['ta', 102], ['ti', 170], ['tb', 238]].map(([k, x]) => K.t(x, 98, v[k] || '', 's')).join('') + (v.p ? K.t(170, 196, v.p, 'ta') : '');
  const num = (v, K) => { const i = v.i, a = v.A - i, b = v.B - i; return venn({ a: 1, i: 1, b: 1 }, K) + K.t(102, 98, K.sig(a), 'b') + K.t(170, 98, K.sig(i), 'b') + K.t(238, 98, K.sig(b), 'b') + K.t(170, 194, `en total ${K.sig(a + i + b)}`, 's'); };
  xpLec('alg-0c', [
    ['Unir y cruzar', xpMira('dibujo', 'Empecemos por la idea: la **unión** junta y la **intersección** deja lo común.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0, ta: 'bus', ti: 'a pie', tb: 'bici' }, alto: 180 }, [
      ['A: como llega Lina al trabajo, en bus o a pie. B: como llega Óscar, en bici o a pie.', {}],
      ['La unión toma lo que está en A, en B o en los dos, sin repetir.', { a: 1, i: 1, b: 1 }, '$A \\cup B$'],
      ['La intersección, solo lo que está en los dos: a pie.', { a: 0, b: 0 }, '$A \\cap B$'],
      ['«O» une y «y» cruza.', {}, '$A \\cap B$'],
      ['Si no comparten nada, la intersección es el vacío: son disjuntos.', { i: 0, ti: '' }, '$A \\cap B = \\varnothing$'],
    ], '$\\cup$: en uno o en el otro. $\\cap$: en los dos.'),
    xpFila('A = {lun, mié, vie}; B = {mié, jue}. ¿Cuántos elementos hay?', ['A ∪ B', 'A ∩ B', 'A'], ['4', '1', '3'], ['5', '2'], 'El miércoles está en los dos: en la unión se cuenta una sola vez.', 'La unión tiene 4, porque mié no se repite.')],
    ['Quitar', xpMira('dibujo', 'Segunda idea: la **diferencia** quita y el **complemento** toma lo de afuera.', { dib: venn, v: { a: 0, i: 0, b: 0, o: 0 }, alto: 180 }, [
      ['A menos B: lo de A que no está en B.', { a: 1 }, '$A - B$'],
      ['B menos A es otra zona: el orden importa.', { a: 0, b: 1 }, '$B - A$'],
      ['Las dos a la vez: en uno o en otro, pero no en ambos.', { a: 1 }, '$A \\triangle B$'],
      ['El complemento de A es todo lo del universo que no está en A.', { a: 0, b: 1, o: 1 }, "$A'$"],
      ['Afuera de la unión: ni en A ni en B.', { b: 0 }, "$(A \\cup B)' = A' \\cap B'$"],
    ], 'La diferencia parte de uno y quita el otro; el complemento necesita el universo.'),
    xpFila('U = {1, …, 8}; A = {2, 3, 5, 7}; B = {3, 6}. ¿Cuántos elementos?', ['A − B', 'B − A', 'A△B', "A'"], ['3', '1', '4', '4'], ['2', '8'], 'Empieza por lo común, el 3. La diferencia simétrica junta las dos diferencias.', 'A − B = {2, 5, 7}; B − A = {6}; juntas, cuatro.')],
    ['Contar sin repetir', xpMira('dibujo', 'Tercera idea: al sumar A y B, lo común se cuenta **dos veces**.', { dib: num, v: { A: 9, B: 7, i: 0 }, alto: 205 }, [
      ['9 personas tocan tambor y 7 cantan. Si nadie hace las dos cosas, son 16.', {}, '$9 + 7 = 16$'],
      ['Si una hace las dos, va en la zona del medio y el total baja.', { i: 1 }, '$9 + 7 - 1 = 15$'],
      ['Con cuatro comunes, baja cuatro.', { i: 4 }, '$9 + 7 - 4 = 12$'],
      ['Se suma todo y se resta una vez lo común.', {}, '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$'],
    ], '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.'),
    xpMueve('11 personas tienen moto y 8, bicicleta. En total son **14**. Mueve cuántas tienen las dos.', 270, { A: 11, B: 8, i: 0 }, [xpRegla('i', 0, 8, 'tienen las dos')], { i: 5 }, num, '$11 + 8 - 5 = 14$.', { lee: v => `$11 + 8 - ${v.i} = ${19 - v.i}$` })],
    ['Ahora sí, un problema', xpFila('De 40 viajeros, 22 llevan mapa, 17 brújula y 8 las dos. Llena las cuatro zonas.', ['solo mapa', 'las dos', 'solo brújula', 'nada'], ['14', '8', '9', '9'], ['22', '17', '1'], 'Empieza por las dos y réstalo a cada total; lo que falte para 40 no lleva nada.', '$14 + 8 + 9 = 31$ y quedan 9 sin nada.')],
  ], 'Unir, cruzar, quitar y mirar afuera: cada operación es una zona.');

  // ---------------------------------------------------------------------------------------------------------- alg-11
  const recta = (v, K) => { const L = XM.linea(K, -6, 6, 110); return L.s + K.c(L.X(v.x), 110, 8, 'fA') + (v.q > 0.5 ? K.ar(L.X(v.d), 84, L.X(v.x), 84, 'la gr') : '') + (v.e > 0.5 ? K.c(L.X(-v.x), 110, 8, 'fF') + K.l(L.X(0), 60, L.X(0), 140, 'lm d') : '') + (v.p ? K.t(170, 40, v.p, 'b ta') : ''); };
  xpLec('alg-11', [
    ['Contar y deber', xpMira('dibujo', 'Empecemos por la idea: los **naturales** cuentan; los **enteros** también pueden deber.', { dib: recta, v: { x: 3, d: 0, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['1, 2, 3… sirven para contar: son los naturales.', {}, '$\\mathbb{N}$'],
      ['Un buzo está 3 metros sobre el agua y baja 5. ¿Dónde queda?', { d: 3, q: 1, x: -2 }, '$3 - 5 = -2$'],
      ['No hay natural para eso: hacen falta los negativos.', { q: 0 }, '$-2$'],
      ['Con el cero y los negativos se arman los enteros.', {}, '$\\mathbb{Z} = \\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$'],
      ['Todo natural es entero, pero no al revés.', {}, '$\\mathbb{N} \\subset \\mathbb{Z}$'],
    ], '$\\mathbb{N} \\subset \\mathbb{Z}$: los enteros suman el cero y los negativos.'),
    xpMueve('Un ascensor está en el piso 4 y baja 7. Llévalo a donde queda.', 220, { x: 4, d: 4, q: 1, e: 0 }, [xpRegla('x', -6, 6, 'piso')], { x: -3 }, recta, '$4 - 7 = -3$: tercer sótano.', { lee: v => `$${v.x}$` })],
    ['El espejo del cero', xpMira('dibujo', 'Segunda idea: cada entero tiene un **opuesto**, a la misma distancia del cero.', { dib: recta, v: { x: 4, d: 0, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['El 4 está a cuatro pasos del cero.', {}],
      ['Al otro lado, a los mismos pasos, está su opuesto: −4.', { e: 1 }, '$4 + (-4) = 0$'],
      ['El opuesto de −5 es 5: dos cambios de lado.', { x: -5 }, '$-(-5) = 5$'],
      ['Juntos siempre dan cero.', {}, '$a + (-a) = 0$'],
      ['El cero es su propio opuesto.', { x: 0 }, '$-0 = 0$'],
    ], 'El opuesto está a la misma distancia del cero y juntos dan 0.'),
    xpMueve('Mueve el punto hasta que su opuesto (el otro color) quede en **5**.', 220, { x: 2, d: 0, q: 0, e: 1 }, [xpRegla('x', -6, 6, 'punto')], { x: -5 }, recta, 'El opuesto de $-5$ es 5.', { lee: v => `$-(${v.x}) = ${-v.x}$` })],
    ['Restar es sumar el opuesto', xpMira('dibujo', 'Tercera idea: restar un negativo **quita una deuda**.', { dib: recta, v: { x: -2, d: -2, q: 0, e: 0, p: '' }, alto: 160 }, [
      ['Tienes −2: debes dos.', {}, '$-2$'],
      ['Te quitan una deuda de 5: quedas mejor.', { q: 1, x: 3, p: '−2 − (−5)' }, '$-2 - (-5)$'],
      ['Es lo mismo que sumar 5.', { p: '−2 + 5 = 3' }, '$-2 + 5 = 3$'],
      ['Siempre: restar es sumar el opuesto.', {}, '$a - b = a + (-b)$'],
    ], '$a - b = a + (-b)$.'),
    xpMueve('Lleva el punto al resultado de $-3 - (-7)$.', 220, { x: -3, d: -3, q: 1, e: 0 }, [xpRegla('x', -6, 6, 'resultado')], { x: 4 }, recta, '$-3 + 7 = 4$.', { lee: v => `$${v.x}$` })],
    ['Ahora sí, un problema', xpFila('A las 6 a. m. hay −5 °C; sube 9 y luego baja 7. Pon la temperatura después de cada cambio.', ['sube 9', 'baja 7'], ['4', '−3'], ['14', '3', '−4'], 'Desde −5, nueve pasos a la derecha; y desde ahí, siete a la izquierda.', '$-5 + 9 = 4$ y $4 - 7 = -3$.')],
  ], 'Los enteros tienen opuestos, y restar es sumar el opuesto.');

  // ---------------------------------------------------------------------------------------------------------- alg-11b
  const frac = (v, K) => { const d = Math.round(v.d), n = Math.round(v.n); return Array.from({ length: d }, (_, i) => K.r(20 + i * 300 / d, 50, 300 / d, 50, i < n ? 'fa' : 'fc')).join('') + K.t(170, 34, `${n}/${d}`, 'b ta') + (v.m > 0.5 ? XM.barra(K, 112, [[v.mn, '', 'fg'], [v.md - v.mn, '', 'fc']], { h: 26 }) : ''); };
  xpLec('alg-11b', [
    ['Partes iguales', xpMira('dibujo', 'Empecemos por la idea: un **racional** es un reparto en partes iguales.', { dib: frac, v: { d: 1, n: 1 }, alto: 130 }, [
      ['Una cinta entera, sin cortes.', {}],
      ['Se parte en 5 pedazos iguales: cada uno es un quinto.', { d: 5, n: 1 }, '$\\tfrac15$'],
      ['Tomamos tres: tres quintos.', { n: 3 }, '$\\tfrac35$'],
      ['Abajo, en cuántas partes; arriba, cuántas se toman.', {}, '$\\tfrac{a}{b}, \\ b \\neq 0$'],
      ['Abajo no puede ir 0: no se puede partir en cero pedazos.', {}, '$b \\neq 0$'],
    ], 'Racional: un cociente de enteros con denominador distinto de 0.'),
    xpMueve('Arma $\\tfrac{4}{7}$ de la cinta.', 240, { d: 2, n: 1 }, [xpRegla('d', 2, 9, 'partes'), xpRegla('n', 0, 9, 'tomadas')], { d: 7, n: 4 }, frac, 'Siete partes y cuatro tomadas.', { lee: v => `$\\tfrac{${v.n}}{${v.d}}$` })],
    ['El mismo pedazo', xpMira('dibujo', 'Segunda idea: fracciones distintas pueden valer **lo mismo**.', { dib: frac, v: { d: 3, n: 2, m: 1, mn: 2, md: 3 }, alto: 150 }, [
      ['Arriba, dos tercios. Abajo, la misma cantidad sin cortes.', {}, '$\\tfrac23$'],
      ['Cortamos cada tercio en dos: seis pedazos, cuatro tomados.', { d: 6, n: 4 }, '$\\tfrac46$'],
      ['El largo no cambió: se multiplicó arriba y abajo por 2.', {}, '$\\tfrac23 = \\tfrac46$'],
      ['Al revés, dividir arriba y abajo simplifica.', { d: 3, n: 2 }, '$\\tfrac46 = \\tfrac23$'],
    ], 'Multiplicar o dividir arriba y abajo por lo mismo no cambia el valor.'),
    xpMueve('Con **12** partes, toma las que valen lo mismo que la barra de abajo, $\\tfrac34$.', 230, { d: 12, n: 2, m: 1, mn: 3, md: 4 }, [xpRegla('n', 0, 12, 'tomadas')], { n: 9 }, frac, '$\\tfrac34 = \\tfrac{9}{12}$.', { lee: v => `$\\tfrac{${v.n}}{12}$` })],
    ['Decimales que paran o se repiten', xpMira('dibujo', 'Tercera idea: al dividir, el decimal **se detiene** o **se repite**.', { dib: (v, K) => XM.pasos(K, v, ['3 ÷ 4 = 0.75', '2 ÷ 11 = 0.18 18…', '0.18 18… = 2/11'], 44, 40), v: { n: 1 }, alto: 150 }, [
      ['3 ÷ 4: el residuo llega a cero y se detiene.', {}, '$\\tfrac34 = 0.75$'],
      ['2 ÷ 11: los residuos se repiten y las cifras también.', { n: 2 }, '$\\tfrac{2}{11} = 0.\\overline{18}$'],
      ['Solo hay unos pocos residuos posibles: tarde o temprano vuelve alguno.', {}],
      ['Y al revés: todo decimal que para o se repite viene de una fracción.', { n: 3 }, '$0.\\overline{18} = \\tfrac{18}{99} = \\tfrac{2}{11}$'],
    ], 'Racional = decimal que termina o que se repite.'),
    xpFila('Pon cada decimal bajo su fracción.', ['1/4', '4/9', '7/20'], ['0.25', '0.444…', '0.35'], ['0.4', '0.14', '0.49'], 'Los novenos se repiten; los cuartos y veinteavos se vuelven centésimos.', 'Dos se detienen y los novenos se repiten.')],
    ['Ahora sí, un problema', xpMueve('De una pista de 1 km, Iván corrió $\\tfrac25$. Con marcas cada **décimo**, ¿cuántas marcas pasó?', 230, { d: 10, n: 0, m: 1, mn: 2, md: 5 }, [xpRegla('n', 0, 10, 'décimos')], { n: 4 }, frac, '$\\tfrac25 = \\tfrac{4}{10} = 0.4$.', { lee: v => `$\\tfrac{${v.n}}{10}$` })],
  ], 'Un racional es un reparto: muchas fracciones lo nombran y su decimal para o se repite.');

  // ---------------------------------------------------------------------------------------------------------- alg-11c
  const diag = (v, K) => K.p([[40, 150], [40 + v.l * 40, 150], [40 + v.l * 40, 150 - v.l * 40], [40, 150 - v.l * 40]], 'fa') + K.l(40, 150, 40 + v.l * 40, 150 - v.l * 40, 'lf gr') + K.f(v.g, K.ar(40, 170, 40 + v.l * 56.57, 170, 'lf gr') + K.t(50 + v.l * 56.57, 176, v.t || '√2', 'b tf', 'start'));
  const lupa = (v, K) => { const a = Math.round(v.a * 10) / 10, L = XM.linea(K, 0, 6, 90); return L.s + K.r(L.X(v.a), 70, L.X(v.a + v.w) - L.X(v.a), 40, 'fa') + K.t(170, 40, `${K.sig(a * a)}  y  ${K.sig((a + v.w) ** 2)}`, 'b ta'); };
  xpLec('alg-11c', [
    ['Un largo sin fracción', xpMira('dibujo', 'Empecemos por la idea: hay largos que **ninguna fracción** mide.', { dib: diag, v: { l: 2, g: 0 }, alto: 190 }, [
      ['Un cuadrado de lado 1. Su diagonal parte la figura en dos triángulos.', {}],
      ['Por Pitágoras, la diagonal al cuadrado es 1 + 1.', {}, '$d^2 = 1^2 + 1^2 = 2$'],
      ['La diagonal mide raíz de dos.', { g: 1 }, '$d = \\sqrt2$'],
      ['Su decimal ni para ni se repite: 1.41421356…', {}, '$1.41421356\\ldots$'],
      ['No es racional: se llama **irracional**. π es otro.', {}, '$\\sqrt2, \\pi \\in \\mathbb{I}$'],
    ], 'Irracional: su decimal no termina ni se repite.'),
    xpFila('Pon cada número en su familia más pequeña.', ['√9', '−2.5', '√5'], ['natural', 'racional', 'irracional'], ['entero'], 'Primero calcula la raíz si es exacta. −2.5 es una división de enteros.', '$\\sqrt9 = 3$ es natural; $\\sqrt5$ no es exacta.')],
    ['Encerrar una raíz', xpMira('dibujo', 'Segunda idea: una raíz se **encierra** entre dos números que sí conocemos.', { dib: lupa, v: { a: 2, w: 1 }, alto: 130 }, [
      ['¿Dónde está raíz de siete? Probemos entre 2 y 3.', {}],
      ['Dos al cuadrado es 4 y tres al cuadrado, 9. El 7 queda en medio.', {}, '$2 < \\sqrt7 < 3$'],
      ['Se angosta: 2.5 al cuadrado es 6.25.', { a: 2.5, w: 0.5 }, '$2.5 < \\sqrt7 < 3$'],
      ['Y 2.6 al cuadrado es 6.76; 2.7, 7.29.', { a: 2.6, w: 0.1 }, '$2.6 < \\sqrt7 < 2.7$'],
      ['Nunca se llega exacto, pero se puede acercar cuanto se quiera.', {}, '$\\sqrt7 \\approx 2.65$'],
    ], 'Si $a^2 < n < b^2$, entonces $a < \\sqrt{n} < b$.'),
    xpMueve('Mueve la ventana de ancho 1 hasta encerrar $\\sqrt{20}$.', 190, { a: 0, w: 1 }, [xpRegla('a', 0, 4, 'empieza en')], { a: 4 }, lupa, '$4^2 = 16$ y $5^2 = 25$.', { lee: v => `$${v.a}^2 = ${v.a ** 2}, \\ ${v.a + 1}^2 = ${(v.a + 1) ** 2}$` })],
    ['La recta llena', xpMira('dibujo', 'Tercera idea: racionales e irracionales juntos llenan la recta: los **reales**.', { dib: (v, K) => { const L = XM.linea(K, -2, 4, 80); return L.s + [[-1.5, 'fa', 1], [0.75, 'fa', 1], [2, 'fa', 1], [1.414, 'fF', 2], [3.1416, 'fF', 2]].map(([x, c, k]) => K.f(v.n - k + 1, K.c(L.X(x), 80, 6, c))).join('') + K.f(v.n - 2, K.r(L.X(-2), 76, 292, 8, 'fo')); }, v: { n: 0 }, alto: 120 }, [
      ['Primero, algunos racionales en la recta.', { n: 1 }, '$\\mathbb{Q}$'],
      ['Entre dos racionales cualquiera siempre hay otro.', {}, '$\\tfrac{a+b}{2}$'],
      ['Aun así quedan huecos: ahí están los irracionales.', { n: 2 }, '$\\mathbb{I}$'],
      ['Juntos, sin huecos, son los reales.', { n: 3 }, '$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$'],
    ], '$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$ y $\\mathbb{Q} \\cap \\mathbb{I} = \\varnothing$.'),
    xpFila('Ordena de menor a mayor.', ['1.º', '2.º', '3.º'], ['1.4', '√2', '3/2'], [], 'Raíz de dos vale 1.414…', '$1.4 < 1.414\\ldots < 1.5$.')],
    ['Ahora sí, un problema', xpMueve('Un jardín cuadrado tiene **30** m² de área. ¿Entre qué enteros está su lado? Mueve la ventana (hasta 6).', 190, { a: 0, w: 1 }, [xpRegla('a', 0, 5, 'empieza en')], { a: 5 }, lupa, '$5^2 = 25 < 30 < 36 = 6^2$.', { lee: v => `$${v.a ** 2} \\ \\text{y} \\ ${(v.a + 1) ** 2}$` })],
  ], 'Los irracionales llenan los huecos; juntos con los racionales son los reales.');

  // ---------------------------------------------------------------------------------------------------------- alg-12b
  const rec = (v, K) => XM.reja(K, 40, 30, v.b, v.a, 26, 'fa') + XM.reja(K, 40 + v.b * 26 + v.s * 24, 30, v.c, v.a, 26, 'fg');
  xpLec('alg-12b', [
    ['Cambiar y agrupar', xpMira('dibujo', 'Empecemos por la idea: sumar y multiplicar dejan **cambiar el orden** y **agrupar**.', { dib: (v, K) => K.f(1 - v.g, XM.reja(K, 60, 20, 5, 3, 30)) + K.f(v.g, XM.reja(K, 120, 20, 3, 5, 26, 'fg')), v: { g: 0 }, alto: 165 }, [
      ['Una bandeja de 3 filas con 5 panes.', {}, '$3 \\cdot 5$'],
      ['Se gira: 5 filas de 3. Son los mismos panes.', { g: 1 }, '$5 \\cdot 3$'],
      ['Es la propiedad **conmutativa**: vale para sumar y para multiplicar.', {}, '$a \\cdot b = b \\cdot a$'],
      ['La **asociativa** deja escoger qué se hace primero.', {}, '$(a + b) + c = a + (b + c)$'],
      ['Restar y dividir no dejan: 8 − 3 no es 3 − 8.', {}, '$8 - 3 \\neq 3 - 8$'],
    ], 'Conmutativa cambia el orden; asociativa, la agrupación. Solo suma y producto.'),
    xpFila('Agrupa para calcular fácil: $25 \\cdot 7 \\cdot 4$. Pon la pareja y el resultado.', ['25 · 4', 'por 7'], ['100', '700'], ['175', '28', '107'], 'Cambia el orden: multiplica 25 por 4 antes.', '$(25 \\cdot 4) \\cdot 7 = 700$.')],
    ['Repartir', xpMira('dibujo', 'Segunda idea: la **distributiva** une la suma con el producto.', { dib: rec, v: { a: 3, b: 4, c: 3, s: 1 }, alto: 120 }, [
      ['Dos bloques de 3 filas: uno de 4 y otro de 3.', {}, '$3 \\cdot 4 + 3 \\cdot 3$'],
      ['Se juntan: un solo bloque de 3 filas y 7 columnas.', { s: 0 }, '$3 \\cdot (4 + 3)$'],
      ['Son los mismos cuadros: 12 y 9, o 21 de una vez.', {}, '$3(4 + 3) = 12 + 9$'],
      ['Separar es distribuir; juntar es sacar factor común.', { s: 1 }, '$a(b + c) = ab + ac$'],
    ], '$a(b + c) = ab + ac$: se lee en los dos sentidos.'),
    xpMueve('Haz que los dos bloques sumen **32** cuadros con 4 filas y el primero de 5 columnas.', 260, { a: 4, b: 5, c: 1, s: 0.5 }, [xpRegla('c', 1, 6, 'columnas del segundo')], { c: 3 }, rec, '$4(5 + 3) = 32$.', { lee: v => `$4(5 + ${v.c}) = ${4 * (5 + v.c)}$` })],
    ['Neutros e inversos', xpMira('dibujo', 'Tercera idea: hay números que **no cambian nada** y otros que **deshacen**.', { dib: (v, K) => { const L = XM.linea(K, -4, 4, 60); return L.s + K.c(L.X(v.x), 60, 8, 'fA') + K.t(170, 116, v.p, 'b ta'); }, v: { x: 3, p: '3 + 0 = 3' }, alto: 140 }, [
      ['Sumar 0 deja igual: es el neutro de la suma.', {}, '$a + 0 = a$'],
      ['Su inverso aditivo lo lleva a 0.', { x: 0, p: '3 + (−3) = 0' }, '$a + (-a) = 0$'],
      ['Multiplicar por 1 deja igual.', { x: 4, p: '4 · 1 = 4' }, '$a \\cdot 1 = a$'],
      ['El recíproco lo lleva a 1.', { x: 1, p: '4 · 1/4 = 1' }, '$a \\cdot \\tfrac1a = 1$'],
      ['El 0 no tiene recíproco: nada por 0 da 1.', { x: 0, p: '0 · ? = 1' }, '$a \\neq 0$'],
    ], 'Neutros: 0 y 1. Inversos: el opuesto lleva a 0; el recíproco, a 1.'),
    xpFila('Pon lo que deshace cada cosa.', ['+ (−6)', '· 5/3', '· (−2)'], ['+ 6', '· 3/5', '· (−1/2)'], ['· 2', '− 6', '· 5/3'], 'A una suma la deshace el opuesto; a un producto, el recíproco, que conserva el signo.', 'Opuesto para la suma; recíproco para el producto.')],
    ['Ahora sí, un problema', xpFila('6 cajas con 18 limas y 6 con 12 limones. Saca el 6 y calcula.', ['18 + 12', 'por 6'], ['30', '180'], ['108', '72', '36'], 'Es $6 \\cdot 18 + 6 \\cdot 12$: junta primero.', '$6(18 + 12) = 6 \\cdot 30 = 180$.')],
  ], 'Cambiar, agrupar, repartir y deshacer: con eso se mueve todo el álgebra.');

  // ---------------------------------------------------------------------------------------------------------- alg-12c
  const giro = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.ar(L.X(0), 78, L.X(v.x), 78, 'la gr') + K.t(170, 40, v.p || '', 'b ta'); };
  xpLec('alg-12c', [
    ['Restar y dividir se deshacen', xpMira('dibujo', 'Empecemos por la idea: restar y dividir son **sumar y multiplicar disfrazados**.', { dib: (v, K) => XM.pasos(K, v, ['10 − 4 = 10 + (−4)', '12 ÷ 3 = 12 · 1/3', '12 ÷ 2/5 = 12 · 5/2 = 30'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['Restar 4 es sumar su opuesto.', { n: 1 }, '$a - b = a + (-b)$'],
      ['Dividir entre 3 es multiplicar por su recíproco.', { n: 2 }, '$a \\div b = a \\cdot \\tfrac1b$'],
      ['Por eso, dividir entre dos quintos es multiplicar por cinco medios.', { n: 3 }, '$12 \\cdot \\tfrac52 = 30$'],
      ['Y por eso no se divide entre 0: no tiene recíproco.', {}, '$a \\div 0 \\ \\text{no existe}$'],
    ], 'Restar: sumar el opuesto. Dividir: multiplicar por el recíproco.'),
    xpFila('Pon cada resultado.', ['8 ÷ 1/2', '6 ÷ 3/4', '−5 − (−9)'], ['16', '8', '4'], ['4.5', '−14', '2'], 'Multiplica por el recíproco; y quitar −9 es sumar 9.', '$8 \\cdot 2$, $6 \\cdot \\tfrac43$ y $-5 + 9$.')],
    ['Por qué menos por menos es más', xpMira('dibujo', 'Segunda idea: multiplicar por −1 **voltea** la flecha.', { dib: giro, v: { x: 3, p: '3' }, alto: 140 }, [
      ['Una flecha de 3 hacia la derecha.', {}],
      ['Por 2: el doble de larga, misma dirección.', { x: 6, p: '2 · 3 = 6' }, '$2 \\cdot 3 = 6$'],
      ['Por −2: el doble de larga y volteada.', { x: -6, p: '−2 · 3 = −6' }, '$-2 \\cdot 3 = -6$'],
      ['Otra vez por −1: se voltea y vuelve a la derecha.', { x: 6, p: '(−1)(−6) = 6' }, '$(-1)(-6) = 6$'],
      ['Dos vueltas dejan la flecha como estaba.', {}, '$(-a)(-b) = ab$'],
    ], 'Cada factor negativo voltea; dos vueltas se anulan.'),
    xpMueve('Lleva la flecha a $(-2)(-4)$.', 200, { x: -4, p: '' }, [xpRegla('x', -8, 8, 'flecha', 2)], { x: 8 }, giro, 'Dos negativos: $8$.', { lee: v => `$${v.x}$` })],
    ['El cero y cancelar', xpMira('dibujo', 'Tercera idea: si un producto da 0, **algún factor es 0**; y se cancela lo que no es 0.', { dib: (v, K) => XM.pasos(K, v, ['a · 0 = 0', '5 · x = 0  →  x = 0', '3x = 3 · 7  →  x = 7', '0 · 2 = 0 · 9, pero 2 ≠ 9'], 34, 34), v: { n: 0 }, alto: 160 }, [
      ['Cero veces cualquier cosa es cero.', { n: 1 }, '$a \\cdot 0 = 0$'],
      ['Si el producto da cero, alguno de los factores lo es.', { n: 2 }, '$ab = 0 \\Rightarrow a = 0 \\text{ o } b = 0$'],
      ['Un factor que no es 0 se puede cancelar a ambos lados.', { n: 3 }, '$3x = 3 \\cdot 7$'],
      ['El 0 no se cancela: borraría números distintos.', { n: 4 }, '$0 \\cdot 2 = 0 \\cdot 9$'],
    ], 'Producto 0: algún factor es 0. Se cancela solo lo que no es 0.'),
    xpFila('$(x - 3)(x + 8) = 0$. Pon los valores de x, de menor a mayor.', ['menor', 'mayor'], ['−8', '3'], ['8', '−3', '0'], 'Cada paréntesis puede ser el que vale 0.', '$x = -8$ o $x = 3$.')],
    ['Ahora sí, un problema', xpMueve('Un submarino baja 2 m por minuto: velocidad −2. ¿A qué altura, respecto de ahora, estaba **hace 3 minutos**?', 200, { x: 0, p: '' }, [xpRegla('x', -8, 8, 'altura', 2)], { x: 6 }, giro, '$(-2)(-3) = 6$: seis metros más arriba.', { lee: v => `$${v.x}$` })],
  ], 'Los signos y el cero salen de los axiomas: no hay que creerlos, se deducen.');

  // ---------------------------------------------------------------------------------------------------------- alg-12d
  const ord = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.c(L.X(v.a), 100, 8, 'fA') + K.t(L.X(v.a), 82, 'a', 'ta') + K.c(L.X(v.b), 100, 8, 'fF') + K.t(L.X(v.b), 82, 'b', 'tf') + K.t(170, 40, v.p || '', 'b'); };
  const tramo = (v, K) => { const L = XM.linea(K, -8, 8, 100, { p: 2 }); return L.s + K.r(L.X(v.c - v.r), 94, L.X(v.c + v.r) - L.X(v.c - v.r), 12, 'fa') + K.c(L.X(v.c), 100, 5, 'fF') + K.l(L.X(v.c), 70, L.X(v.c + v.r), 70, 'lf') + K.t(L.X(v.c + v.r / 2), 62, `${K.sig(v.r)}`, 's tf'); };
  xpLec('alg-12d', [
    ['Quién va a la izquierda', xpMira('dibujo', 'Empecemos por la idea: **menor** es estar a la izquierda.', { dib: ord, v: { a: -4, b: 1, p: 'a < b' }, alto: 140 }, [
      ['a está a la izquierda de b: a es menor.', {}, '$a < b$'],
      ['Sumar lo mismo a los dos los corre juntos: el orden sigue.', { a: -1, b: 4, p: 'a + 3 < b + 3' }, '$a + c < b + c$'],
      ['Por un positivo, se estiran: el orden sigue.', { a: -2, b: 8, p: '' }, '$c > 0: \\ ac < bc$'],
      ['Por un negativo, se voltean como en un espejo: ¡cambia el orden!', { a: 2, b: -8, p: '−a > −b' }, '$c < 0: \\ ac > bc$'],
    ], 'Al multiplicar por un negativo, la desigualdad se voltea.'),
    xpFila('Pon el signo que va.', ['−7 □ −2', '(−1)(−7) □ (−1)(−2)', '−7 + 10 □ −2 + 10'], ['<', '>', '<'], ['='], 'El −1 voltea; sumar no.', 'Solo el producto por un negativo cambia el sentido.')],
    ['La distancia', xpMira('dibujo', 'Segunda idea: el **valor absoluto** es una distancia, y nunca es negativa.', { dib: tramo, v: { c: 0, r: 5 }, alto: 130 }, [
      ['El valor absoluto de −5 es 5: su distancia al cero.', {}, '$|-5| = 5$'],
      ['El de 5 también: están igual de lejos.', {}, '$|5| = 5$'],
      ['La distancia entre dos números es el valor absoluto de su resta.', { c: 2, r: 4 }, '$|6 - 2| = 4$'],
      ['Los que están a 4 del 2 son dos: 6 y −2.', {}, '$|x - 2| = 4$'],
    ], '$|x - c|$ es la distancia de x a c.'),
    xpMueve('Mueve la distancia hasta que los bordes queden en **−7 y 3**.', 200, { c: -2, r: 1 }, [xpRegla('r', 1, 6, 'distancia')], { r: 5 }, tramo, '$|x + 2| = 5$: $-7$ y $3$.', { lee: v => `$|x + 2| = ${v.r}$` })],
    ['Cerca o lejos', xpMira('dibujo', 'Tercera idea: «menor que» es **cerca**; «mayor que» es **lejos**.', { dib: tramo, v: { c: 1, r: 0 }, alto: 130 }, [
      ['Los números a menos de 3 del 1: crece desde el 1.', { r: 3 }, '$|x - 1| < 3$'],
      ['Es un solo tramo: entre −2 y 4.', {}, '$-2 < x < 4$'],
      ['Lejos es lo demás: dos pedazos.', {}, '$|x - 1| > 3: \\ x < -2 \\text{ o } x > 4$'],
      ['Y una distancia menor que −1 no existe.', {}, '$|x| < -1: \\ \\varnothing$'],
    ], 'Cerca: un tramo. Lejos: dos pedazos.'),
    xpMueve('Arma $|x - 2| \\le 4$: pon el centro y la distancia.', 250, { c: 0, r: 1 }, [xpRegla('c', -4, 4, 'centro'), xpRegla('r', 1, 4, 'distancia')], { c: 2, r: 4 }, tramo, 'Centro 2 y distancia 4: de $-2$ a $6$.', { lee: v => `$[${v.c - v.r}, ${v.c + v.r}]$` })],
    ['Ahora sí, un problema', xpMueve('Un horno trabaja bien entre −1 y 7 unidades de su escala. Escríbelo como $|x - c| \\le r$: halla c y r.', 250, { c: 0, r: 1 }, [xpRegla('c', -4, 4, 'centro c'), xpRegla('r', 1, 4, 'distancia r')], { c: 3, r: 4 }, tramo, 'El medio es 3 y los bordes están a 4: $|x - 3| \\le 4$.', { lee: v => `$[${v.c - v.r}, ${v.c + v.r}]$` })],
  ], 'Orden es izquierda o derecha; valor absoluto es distancia.');
}
;
//#archivo js/explora-lectura.js
// Explora · escena «hoja» para las lecciones de comprensión lectora (spec 2026-11-24-lectura-explora): el texto es la escena.
//   { cab: [título, autor, fuente, fecha], paras: [[trozos…]…], tapa, unidos }   trozos: 't','a','f','d' los bordes; 0, 1, 2… el texto
// En las explicaciones cada momento cambia la hoja (y lo demás se queda como estaba):
//   luz [trozos] (solo ese momento) · tacha [trozos] · nota { párrafo: rótulo } · tapa true | false · sello { trozo: rótulo }
// En la práctica: modo 'toca' (subrayar los que cumplen; meta [trozos]), 'tacha' (igual, pero se quitan) o 'margen'
// (arrastrar o tocar rótulos al margen de cada párrafo; rotulos, meta [rótulo por párrafo]). Va después de explora-escenas.js.
XP.hoja = {
  ini: p => (p.modo === 'margen' ? { n: p.paras.map(() => -1) } : { m: [] }),
  ok(s, p) {
    if (p.modo === 'margen') return s.n.join() === p.meta.join();
    return [...s.m].map(String).sort().join() === p.meta.map(String).sort().join();
  },
  sol: p => (p.modo === 'margen' ? { n: [...p.meta] } : { m: p.meta.map(String) }),
  lee: () => '',
  dice(s, p) {
    if (p.modo === 'margen') { const f = s.n.filter(x => x < 0).length; return f === s.n.length ? 'Arrastra cada rótulo a su párrafo, o tócalo y luego toca el párrafo.' : f ? `${f === 1 ? 'Falta un párrafo' : `Faltan ${f} párrafos`}.` : XP.hoja.ok(s, p) ? 'Cada uno con su rótulo.' : 'Todos con rótulo: mira si cada uno corresponde.'; }
    const n = s.m.length, v = p.modo === 'tacha' ? ['Toca lo que sobra para tacharlo.', 'tachada', 'tachadas'] : ['Toca un trozo para subrayarlo; otro toque lo suelta.', 'subrayada', 'subrayadas'];
    return !n ? v[0] : `${n} de ${p.meta.length} ${n === 1 ? 'marca' : 'marcas'}.`;
  },
};

XPD.hoja = (stage, p, s, api) => {
  const mira = !!p.momentos, toca = !mira && p.modo !== 'margen';
  let k = 0, v = { luz: [], tacha: [], nota: {}, sello: {}, tapa: !!p.tapa }, sel = null, timer = 0, dedo = null, tecla = null;
  const tr = (id, t, cls = '') => `<span class="hj-t ${cls}" data-k="${id}"${toca && !p.quietos?.includes(id) ? ' role="button" tabindex="0"' : ''}>${HOJA.fmt(t)}</span>`;
  const cab = p.cab ? `<header class="hj-cab"><h4>${tr('t', p.cab[0])}</h4><p>${['a', 'f', 'd'].map((id, i) => tr(id, p.cab[i + 1])).join('<i>·</i>')}</p></header>` : '';
  stage.innerHTML = `<div class="hj hj-mira ${toca ? `hj-toca hj-${p.modo === 'tacha' ? 'tacha' : 'subraya'}` : ''}"><article class="hj-hoja">${cab}${p.paras.map((l, i) => `<div class="hj-p" data-p="${i}"><b class="hj-n">${p.letras?.[i] || i + 1}</b><span class="hj-marg"></span><p>${l.map(t => tr(k++, t)).join(p.unidos ? '' : ' ')}</p></div>`).join('')}</article>${p.modo === 'margen' ? '<div class="hj-band"></div>' : ''}</div>`;
  const root = stage.firstChild, T = id => root.querySelector(`.hj-t[data-k="${id}"]`), P = i => root.querySelector(`.hj-p[data-p="${i}"]`);
  const chip = (i, en) => `<button type="button" class="hj-f${sel === i ? ' hj-sel' : ''}" data-r="${i}" data-en="${en}">${HOJA.esc(p.rotulos[i])}</button>`;

  function pintaMira() {
    root.querySelectorAll('.hj-t').forEach(t => {
      const id = t.dataset.k, en = l => l.map(String).includes(id);
      t.classList.toggle('on', en(v.luz)); t.classList.toggle('tachado', en(v.tacha));
      t.dataset.sello = v.sello[id] || ''; t.classList.toggle('con-sello', !!v.sello[id]);
    });
    root.classList.toggle('foco', v.luz.length > 0);
    root.classList.toggle('tapada', v.tapa);
    p.paras.forEach((_, i) => { const m = P(i).querySelector('.hj-marg'), t = v.nota[i] || ''; if (m.textContent !== t) m.innerHTML = t ? `<em class="hj-nota">${HOJA.esc(t)}</em>` : ''; });
  }
  function pinta() {
    if (mira) return pintaMira();
    if (toca) return root.querySelectorAll('.hj-t').forEach(t => { const on = s.m.includes(t.dataset.k); t.classList.toggle('on', on); if (t.getAttribute('role')) t.setAttribute('aria-pressed', on); });
    root.querySelector('.hj-band').innerHTML = p.rotulos.map((_, i) => (s.n.includes(i) ? '' : chip(i, -1))).join('');
    p.paras.forEach((_, i) => { P(i).querySelector('.hj-marg').innerHTML = s.n[i] >= 0 ? chip(s.n[i], i) : '<em class="hj-hueco">?</em>'; });
    root.querySelectorAll('[data-r]').forEach(b => { b.onkeydown = tecla; });
    root.classList.toggle('hj-lleva', sel != null);
  }
  // Al completar las marcas sin cumplir, se avisa (sin decir cuál).
  const fin = lleno => { XS.pop(); xpTick(); api.nota(''); api.set(s); pinta(); if (lleno && !XP.hoja.ok(s, p)) { XS.nope(); api.nota(p.pista || 'Casi: algo no cumple. Vuelve a leer y cambia una marca.'); } };
  if (toca) {
    const pon = t => {
      const id = t.dataset.k, l = s.m.includes(id) ? s.m.filter(x => x !== id) : s.m.length >= p.meta.length ? [...s.m.slice(1), id] : [...s.m, id];
      s = { m: l }; fin(l.length === p.meta.length);
    };
    const cual = e => e.target.closest?.('.hj-t[role=button]');
    root.onclick = e => { const t = cual(e); if (t) pon(t); };
    root.querySelectorAll('.hj-t[role=button]').forEach(t => { t.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pon(t); } }; });
  }
  if (p.modo === 'margen' && !mira) {
    const pon = (r, i) => {
      const n = s.n.map(x => (x === r ? -1 : x)), de = s.n.indexOf(r);
      if (i >= 0) { if (n[i] >= 0 && de >= 0) n[de] = n[i]; n[i] = r; }
      sel = null; s = { n }; fin(n.every(x => x >= 0));
    };
    // Un toque elige el rótulo y otro en el párrafo lo pone; arrastrar hace lo mismo.
    root.onpointerdown = e => { const b = e.target.closest('[data-r]'); if (!b || dedo) return; dedo = { id: e.pointerId, r: +b.dataset.r, en: +b.dataset.en, b, x: e.clientX, y: e.clientY, g: null }; };
    const mueve = e => {
      if (!dedo || e.pointerId !== dedo.id) return;
      if (!dedo.g) {
        if (Math.hypot(e.clientX - dedo.x, e.clientY - dedo.y) < 7) return;
        const r = dedo.b.getBoundingClientRect();
        dedo.g = dedo.b.cloneNode(true); dedo.g.classList.add('exq-ghost'); Object.assign(dedo.g.style, { width: `${r.width / zk()}px`, left: `${r.left / zk()}px`, top: `${r.top / zk()}px` });
        dedo.ox = e.clientX - r.left; dedo.oy = e.clientY - r.top; document.body.appendChild(dedo.g); dedo.b.classList.add('lift');
      }
      e.preventDefault();
      dedo.g.style.left = `${(e.clientX - dedo.ox) / zk()}px`; dedo.g.style.top = `${(e.clientY - dedo.oy) / zk()}px`;
      const q = document.elementFromPoint(e.clientX, e.clientY)?.closest('.hj-p');
      root.querySelectorAll('.over').forEach(o => o !== q && o.classList.remove('over'));
      if (q && root.contains(q)) q.classList.add('over');
      const st = root.closest('.xp-step'), r = st?.getBoundingClientRect();
      if (r) { if (e.clientY < r.top + 46) st.scrollTop -= 8; else if (e.clientY > r.bottom - 46) st.scrollTop += 8; }
    };
    const deja = e => {
      if (!dedo || e.pointerId !== dedo.id) return;
      const d = dedo; dedo = null; d.g?.remove(); d.b.classList.remove('lift');
      root.querySelectorAll('.over').forEach(o => o.classList.remove('over'));
      if (e.type === 'pointercancel') return;
      const q = document.elementFromPoint(e.clientX, e.clientY)?.closest('.hj-p');
      if (d.g) { if (q && root.contains(q)) pon(d.r, +q.dataset.p); else if (d.en >= 0) pon(d.r, -1); return; }
      if (sel != null && d.en >= 0 && sel !== d.r) return pon(sel, d.en);
      sel = sel === d.r ? null : d.r; XS.tick(2); pinta();
    };
    root.onclick = e => { const q = e.target.closest('.hj-p'); if (q && sel != null && !e.target.closest('[data-r]')) pon(sel, +q.dataset.p); };
    tecla = e => {   // la explicación solo deja pasar las teclas al manejador del propio botón
      const b = e.currentTarget; if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault(); const r = +b.dataset.r, en = +b.dataset.en;   // con teclado: de la bandeja al primer párrafo libre, y de vuelta
      pon(r, en >= 0 ? -1 : Math.max(0, s.n.indexOf(-1)));
      (root.querySelector('.hj-band [data-r]') || root.querySelector('[data-r]'))?.focus({ preventScroll: true });
    };
    window.addEventListener('pointermove', mueve, { passive: false }); window.addEventListener('pointerup', deja); window.addEventListener('pointercancel', deja);
    timer = () => { window.removeEventListener('pointermove', mueve); window.removeEventListener('pointerup', deja); window.removeEventListener('pointercancel', deja); dedo?.g?.remove(); };
  }
  pinta();
  const aplica = m => {
    v = { luz: m.luz || [], tacha: [...v.tacha, ...(m.tacha || [])], nota: { ...v.nota, ...m.nota }, sello: { ...v.sello, ...m.sello }, tapa: m.tapa ?? v.tapa };
    if (m.limpia) v = { ...v, tacha: m.tacha || [], nota: m.nota || {}, sello: m.sello || {} };
  };
  let t = 0;
  return Object.assign(() => { clearTimeout(t); if (typeof timer === 'function') timer(); }, {
    anima(m, done) {
      aplica(m); pinta();
      if (m.tacha) XS.tick(-6); else if (m.luz || m.nota || m.sello) XS.pop();
      const q = m.luz?.length ? T(m.luz[0]) : m.nota ? P(Object.keys(m.nota)[0]) : null, st = root.closest('.xp-step');
      // En pantallas pequeñas la hoja puede ser más alta que el paso: lo que se nombra queda a la vista.
      if (q && st && st.scrollHeight > st.clientHeight + 4) { const a = q.getBoundingClientRect(), b = st.getBoundingClientRect(); if (a.bottom > b.bottom - 10 || a.top < b.top + 10) st.scrollBy({ top: (a.top - b.top - b.height * 0.45) / zk(), behavior: xpStill() ? 'auto' : 'smooth' }); }
      t = setTimeout(done, xpStill() ? 0 : 750);
      return () => clearTimeout(t);
    },
    salta(l) { l.forEach(aplica); v.luz = []; pinta(); },
  });
};
;
//#archivo js/explora-voces.js
// GENERADO por tools/subir-voz.js: no editar a mano. Lecciones narradas → su lista de audios en Bunny (EXPLORA_VOZ).
const EXPLORA_VOCES = {
  "icf-ma-datos-1": "voz-731e1dfbbf53.json",
  "icf-ma-datos-2": "voz-bcff10db21d7.json",
  "icf-ma-datos-3": "voz-a5a8fb7e3bc1.json",
  "pu-cm-1": "voz-05c26a14b48f.json",
  "pu-cm-2": "voz-d32f237d2c4f.json",
  "pu-cm-3": "voz-a5cfb42918fa.json",
  "pu-cm-4": "voz-cd3065d83bd1.json"
};
;
//#archivo js/explora-pu-cm-2.js
// Preuniversitario · pu-cm-2 «Fracciones»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva; escena «barras»
// en js/explora-numeros.js). Cada capítulo abre explicando, sigue «tu turno» y el problema va al final. Los ejemplos no son los
// de los ejercicios de la lección (tabla de quintos, 6/9, entre 1/2 y 3/5, 11/12, 7/8 − 1/2, 1/3 de 3/4, 3/5 = 21, 1/4 + 2/3…).
EXPLORA['pu-cm-2'] = {
  caps: ['Partes iguales', 'Fracciones equivalentes', 'Comparar y sumar', 'La fracción de una cantidad', 'Ahora sí, un problema'],
  pasos: [
    // ---- Partes iguales ----
    { cap: 0, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Mira esta barra: con ella vas a descubrir **qué es una fracción**.',
      momentos: [
        { barras: [{ n: 0, d: 1 }], dice: 'Está entera, todavía sin cortar. Una fracción aparece cuando la partimos en pedazos iguales.' },
        { barras: [{ n: 0, d: 8 }], dice: 'Aquí la cortamos en 8. Ese número se escribe abajo y se llama **denominador**.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Si tomamos 3 pedazos, el 3 va arriba: es el **numerador**. Tenemos tres octavos.' },
        { barras: [{ n: 8, d: 8 }], cuenta: '$\\tfrac88 = 1$', dice: '¿Y si los tomamos todos? Volvemos a la barra completa: ocho octavos son 1.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Eso sí, los pedazos deben ser iguales; con uno más grande, no sabríamos cuánto es tres octavos.' },
      ],
      idea: 'El denominador dice en cuántas partes **iguales** se corta; el numerador, cuántas se toman.' },
    { cap: 0, tipo: 'barras', meta: [4, 7], d: 7,
      texto: '**Tu turno.** Esta barra viene cortada en séptimos. Arrastra sobre ella hasta tomar cuatro.',
      idea: 'Cuatro de siete partes iguales: $\\tfrac47$.' },

    // ---- Fracciones equivalentes ----
    { cap: 1, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Dos fracciones pueden verse muy distintas y valer **la misma cantidad**. Fíjate.',
      momentos: [
        { barras: [{ n: 1, d: 2, label: '1/2' }], cuenta: '$\\tfrac12$', dice: 'Aquí tenemos media barra, o sea, un medio.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }], cuenta: '$\\tfrac12 = \\tfrac24$',
          dice: 'Cortamos cada mitad en dos. Ahora son dos cuartos, pero ¡mide exactamente lo mismo!' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }, { n: 4, d: 8, label: '4/8' }], cuenta: '$\\tfrac12 = \\tfrac24 = \\tfrac48$',
          dice: 'Otro corte más y quedan cuatro octavos. Multiplicar arriba y abajo por lo mismo no cambia el valor.' },
        { barras: [{ n: 10, d: 12, label: '10/12' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac{10}{12} = \\tfrac56$',
          dice: 'Simplificar es devolverse: si dividimos arriba y abajo entre 2, diez doceavos se vuelven cinco sextos.' },
      ],
      idea: 'Multiplicar o dividir arriba y abajo por el mismo número da una fracción **equivalente**: la misma cantidad.' },
    { cap: 1, tipo: 'barras', meta: [1, 3], d: 3, cortar: true, dpide: 12,
      texto: '**Tu turno.** ¿Cómo se vería un tercio en una barra de 12 pedazos? Córtala con la regla de abajo y llénala.',
      idea: 'Un tercio son cuatro doceavos: $\\tfrac13 = \\tfrac{4}{12}$.' },

    // ---- Comparar y sumar ----
    { cap: 2, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Para comparar o sumar fracciones hay un truco: usar **partes del mismo tamaño**.',
      momentos: [
        { barras: [{ n: 5, d: 6, label: '5/6' }, { n: 4, d: 5, label: '4/5' }], dice: '¿Cuál es mayor, 5/6 o 4/5? A simple vista cuesta decidir, porque los pedazos no miden igual.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 = \\tfrac{25}{30} \\quad \\tfrac45 = \\tfrac{24}{30}$',
          dice: 'Cortemos las dos barras en treinta partes iguales. Ahora basta con contar: 25 contra 24.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 > \\tfrac45$',
          dice: 'Gana 5/6, por muy poquito. Un atajo es multiplicar en cruz: 5 por 5 da 25, y 4 por 6 da 24.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 1, d: 3, label: '1/3' }], cuenta: '$\\tfrac12 + \\tfrac13$',
          dice: 'Con la suma ocurre igual: un medio y un tercio no se pueden juntar así, porque son pedazos distintos.' },
        { barras: [{ n: 3, d: 6, label: '3/6' }, { n: 2, d: 6, label: '2/6' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac36 + \\tfrac26 = \\tfrac56$',
          dice: 'En sextos sale fácil: tres más dos, cinco sextos. Sumar arriba y abajo daría 2/5, y eso está mal.' },
      ],
      idea: 'Para comparar o sumar, primero partes del mismo tamaño (el mismo denominador); luego se cuentan.' },
    { cap: 2, tipo: 'barras', meta: [7, 10], d: 2, cortar: true,
      texto: '**Tu turno.** Suma un medio y un quinto. Busca un corte en el que quepan los dos y llena el resultado.',
      idea: 'En décimos: $\\tfrac12 + \\tfrac15 = \\tfrac{5}{10} + \\tfrac{2}{10} = \\tfrac{7}{10}$.' },

    // ---- La fracción de una cantidad ----
    { cap: 3, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Ahora la barra va a valer algo. Así se calcula **la fracción de una cantidad**.',
      momentos: [
        { barras: [{ n: 0, d: 1, total: 20 }], dice: 'Imagina que son 20 dulces y quieres tres cuartos. ¿Cuántos te tocan?' },
        { barras: [{ n: 0, d: 4, total: 20 }], cuenta: '$20 \\div 4 = 5$', dice: 'Los repartimos en 4 grupos iguales: quedan 5 en cada uno.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\text{ de } 20 = 3 \\cdot 5 = 15$',
          dice: 'Tomas 3 grupos: son 15 dulces. Dividimos entre el de abajo y multiplicamos por el de arriba.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\cdot 20 = \\tfrac{60}{4} = 15$',
          dice: 'Si prefieres, multiplica primero y divide después: llegas al mismo resultado.' },
      ],
      idea: 'La fracción de una cantidad: se divide entre el denominador y se multiplica por el numerador.' },
    { cap: 3, tipo: 'barras', meta: [5, 6], d: 6, total: 42,
      texto: '**Tu turno.** En un viaje de 42 km ya recorriste cinco sextos. Marca esa parte y descubre cuántos kilómetros llevas.',
      idea: 'Cada sexto son 7 km: $\\tfrac56 \\text{ de } 42 = 35$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'barras', meta: [2, 3], d: 1, cortar: true, total: 24,
      texto: 'Ana se lleva dos tercios de una cinta de 24 m. Corta la cinta y toma su parte: ¿cuántos metros le tocan?',
      idea: 'Cada tercio son 8 m: Ana se lleva $\\tfrac23 \\text{ de } 24 = 16$ m.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-2', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Partes iguales, fracciones equivalentes, comparar y sumar con el mismo denominador, y la fracción de una cantidad.' },
  ],
};
;
//#archivo js/explora-pu-cm-3.js
// Preuniversitario · pu-cm-3 «Decimales y porcentajes»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva;
// escena «cien» en js/explora-numeros.js). Los ejemplos no son los de los ejercicios de la lección (2/5, 0.625, 5/6, 21 de 60,
// 75 % de 16, 15 % de 40, 25 % de 120, 3/5, el 80 % y el 45 % de una elección, el tanque con 14 litros…).
EXPLORA['pu-cm-3'] = {
  caps: ['De cada 100', 'Fracción, decimal y porcentaje', 'El porcentaje de una cantidad', 'Subir y bajar', 'Ahora sí, un problema'],
  pasos: [
    // ---- De cada 100 ----
    { cap: 0, tipo: 'muestra', escena: 'cien', en: {},
      texto: '¿Qué significa **por ciento**? Significa «de cada 100», y aquí lo vas a ver.',
      momentos: [
        { k: 0, dice: 'Esta cuadrícula tiene 100 casillas y todas juntas forman el total.' },
        { k: 30, cuenta: '$30\\,\\%$', dice: 'Si pintamos 30, tenemos el 30 por ciento. Así de simple.' },
        { k: 100, cuenta: '$100\\,\\% = 1$', dice: 'Cuando se pintan todas llegamos al 100 %, que es el total completo.' },
        { k: 50, cuenta: '$50\\,\\% = \\tfrac12$', dice: 'Y con 50 casillas pintadas queda justo la mitad: el 50 %.' },
      ],
      idea: 'Por ciento es «de cada 100»: el $100\\,\\%$ es el total.' },
    { cap: 0, tipo: 'cien', meta: 45,
      texto: '**Tu turno.** Ahora pinta el 45 %, arrastrando sobre la cuadrícula.',
      idea: '45 de cada 100 casillas: $45\\,\\%$.' },

    // ---- Fracción, decimal y porcentaje ----
    { cap: 1, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Lo curioso es que una misma cantidad se puede escribir de **tres formas**.',
      momentos: [
        { k: 20, cuenta: '$\\tfrac15 = \\tfrac{20}{100} = 20\\,\\%$', dice: 'Un quinto de la cuadrícula ocupa 20 casillas, o sea, el 20 %.' },
        { k: 20, cuenta: '$20\\,\\% = 0.20$', dice: 'También son 20 centésimas. Con decimales se escribe 0.20, que es lo mismo que 0.2.' },
        { k: 36, cuenta: '$\\tfrac{9}{25} = \\tfrac{36}{100} = 36\\,\\%$', dice: '¿Y si son 9 de cada 25? Multiplicamos los dos números por 4 y quedan 36 de cada 100: el 36 %.' },
        { k: 36, cuenta: '$9 \\div 25 = 0.36$', dice: 'Dividir también sirve: 9 entre 25 da 0.36. Corremos el punto dos lugares y sale 36 %.' },
      ],
      idea: 'Fracción, decimal y porcentaje son tres formas de lo mismo: $\\tfrac15 = 0.2 = 20\\,\\%$.' },
    { cap: 1, tipo: 'cien', meta: 65,
      texto: '**Tu turno.** Intenta pintar 13 de cada 20 casillas de la cuadrícula. ¿Qué porcentaje es?',
      idea: '$\\tfrac{13}{20} = \\tfrac{65}{100} = 65\\,\\%$.' },

    // ---- El porcentaje de una cantidad ----
    { cap: 2, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Veamos cómo sacar **el porcentaje de una cantidad**. Digamos que la cuadrícula vale 50 000 pesos.',
      momentos: [
        { k: 100, cuenta: '$50\\,000 \\div 100 = 500$', dice: 'Repartimos ese dinero entre las 100 casillas, y a cada una le tocan 500 pesos.' },
        { k: 10, cuenta: '$10\\,\\% \\text{ de } 50\\,000 = 5\\,000$', dice: 'Para el 10 % tomamos 10 casillas: 5 000 pesos. Es la décima parte del total.' },
        { k: 15, cuenta: '$15\\,\\% = 5\\,000 + 2\\,500 = 7\\,500$', dice: 'Con eso armamos el 15 %: al 10 % le sumamos su mitad, el 5 %. Son 7 500 pesos.' },
        { k: 15, cuenta: '$0.15 \\cdot 50\\,000 = 7\\,500$', dice: 'Hay un camino directo: escribir el porcentaje como decimal y multiplicarlo por la cantidad.' },
        { k: 25, cuenta: '$12 \\div 48 = 0.25 = 25\\,\\%$', dice: 'Al revés también funciona. ¿Qué porcentaje es 12 de 48? Dividimos 12 entre 48: da 0.25, el 25 %.' },
      ],
      idea: 'El porcentaje de una cantidad: el porcentaje en decimal por la cantidad. El $10\\,\\%$ corre el punto.' },
    { cap: 2, tipo: 'cien', meta: 30, total: 240,
      texto: '**Tu turno.** Esta vez la cuadrícula vale 240. Pinta el 30 % y mira cuánto es.',
      idea: '$0.30 \\cdot 240 = 72$.' },

    // ---- Subir y bajar ----
    { cap: 3, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Los precios suben y bajan todo el tiempo. Vas a ver que **subir y bajar** un porcentaje es multiplicar.',
      momentos: [
        { k: 100, dice: 'Unos tenis cuestan 200 000 pesos y les hacen un descuento del 20 %.' },
        { k: 100, quita: 20, cuenta: '$200\\,000 \\cdot 0.8 = 160\\,000$', dice: 'Quitamos 20 casillas y queda el 80 %. Por eso, bajar un 20 % es multiplicar por 0.8.' },
        { k: 80, cuenta: '$\\times 1.1$', dice: 'Después, el precio sube un 10 %. Ojo: ese 10 % sale del precio rebajado, no del original.' },
        { k: 88, cuenta: '$0.8 \\cdot 1.1 = 0.88$', dice: 'El 10 % de 80 son 8 casillas, y quedamos en 88 %. ¡No es lo mismo que bajar 10!' },
        { k: 80, cuenta: '$160\\,000 \\div 0.8 = 200\\,000$', dice: '¿Cómo volver al precio original? Si 160 000 es el 80 %, dividimos entre 0.8.' },
        { k: 100, cuenta: '$80 \\cdot 1.25 = 100$', dice: 'Y para volver de 80 a 100 se suben 20, la cuarta parte de 80: un 25 %, ¡no un 20 %!' },
      ],
      idea: 'Bajar un porcentaje es multiplicar por menos de 1; subir, por más de 1. Los cambios seguidos se multiplican.' },
    { cap: 3, tipo: 'cien', meta: 60, k: 100,
      texto: '**Tu turno.** Una batería llena pierde el 40 % de su carga. Deja pintado solo lo que queda.',
      idea: 'Perder el $40\\,\\%$ deja el $60\\,\\%$: se multiplica por $0.6$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'cien', meta: 55, total: 600,
      texto: 'De 600 hinchas en el estadio, el 55 % llevaba la camiseta local. La cuadrícula representa a los 600: pinta ese porcentaje. ¿Cuántos son?',
      idea: 'Cada casilla son 6 hinchas: $0.55 \\cdot 600 = 330$.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-3', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'De cada 100, las tres formas de escribirlo, el porcentaje de una cantidad y subir o bajar multiplicando.' },
  ],
};
;
//#archivo js/explora-pu-cm-4.js
// Preuniversitario · pu-cm-4 «Potencias, raíces y estimación»: explicación interactiva (spec
// 2026-11-23-explora-leccion-interactiva; escena «potencia» en js/explora-numeros.js). Los ejemplos no son los de los
// ejercicios de la lección (81 por reenvíos, la torre del 2 con 2⁶, 3⁵/3³, 0.36 m², 20, √30, 25 y −27, 2⁹·5⁶, 3⁴·3²/(3²)³, 90 cm²…).
EXPLORA['pu-cm-4'] = {
  caps: ['Multiplicar repetido', 'Al cuadrado: un área', 'Contar factores', 'Raíces', 'Ahora sí, un problema'],
  pasos: [
    // ---- Multiplicar repetido ----
    { cap: 0, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: '¿Qué es una potencia? Es **multiplicar repetido**: el mismo número, varias veces.',
      momentos: [
        { base: 2, e: 1, cuenta: '$2^1 = 2$', dice: 'Tomemos el 2. Uno solo son dos puntos.' },
        { base: 2, e: 3, cuenta: '$2^3 = 2 \\cdot 2 \\cdot 2 = 8$', dice: 'Si multiplicamos 2 por 2 por 2, los puntos se van duplicando y llegan a 8. Eso es 2 a la 3.' },
        { base: 2, e: 5, cuenta: '$2^5 = 32$', dice: 'Cada 2 que se agrega duplica todo lo anterior. Con cinco, ya vamos en 32.' },
        { base: 2, e: 3, cuenta: '$2^3 \\neq 2 \\cdot 3$', dice: 'Ojo: 2 a la 3 no es lo mismo que 2 por 3. Da 8, no 6.' },
        { base: 5, e: 0, cuenta: '$5^0 = 1$', dice: 'Y si el exponente es cero, todavía no hemos multiplicado nada: queda el 1 del que partimos.' },
      ],
      idea: 'Una potencia es multiplicar repetido: $b^n$ son $n$ factores iguales a $b$. Y $b^0 = 1$.' },
    { cap: 0, tipo: 'potencia', base: 3, meta: 3, max: 5,
      texto: '**Tu turno.** Ahora arrastra el exponente hasta que el 3 llegue a 27.',
      idea: 'Tres treses: $3^3 = 27$.' },

    // ---- Al cuadrado: un área ----
    { cap: 1, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'La expresión **al cuadrado** viene de una figura: el área de un cuadrado con ese lado.',
      momentos: [
        { s: 3, cuenta: '$3^2 = 9$', dice: 'Este tiene lado 3: son 3 filas de 3 casillas, 9 en total. Por eso 3 al cuadrado es 9.' },
        { s: 6, cuenta: '$6^2 = 36$', dice: 'Al duplicar el lado, de 3 a 6, uno esperaría el doble de casillas. Pero son 36, ¡el cuádruple!' },
        { s: 10, cuenta: '$10^2 = 100$', dice: 'Con lado 10 llegamos a 100 casillas. El área siempre es lado por lado.' },
        { s: 9, cuenta: '$(3 \\cdot 3)^2 = 9 \\cdot 9 = 81$', dice: '¿Y al triplicar el lado, de 3 a 9? Pasamos de 9 casillas a 81: nueve veces más área.' },
        { s: 3, cuenta: '$0.3^2 = 0.09$', dice: 'También sirve con decimales. Si las 100 casillas valen 1, un lado de 0.3 cubre 9: el área es 0.09.' },
      ],
      idea: 'Elevar al cuadrado es el área de un cuadrado: $n^2 = n \\cdot n$.' },
    { cap: 1, tipo: 'potencia', modo: 'lado', meta: 7, max: 10,
      texto: '**Tu turno.** Mueve el lado hasta que el cuadrado tenga 49 casillas.',
      idea: 'Lado 7: $7^2 = 49$.' },

    // ---- Contar factores ----
    { cap: 2, tipo: 'muestra', escena: 'potencia', en: { base: 2 },
      texto: 'Las leyes de las potencias no hay que memorizarlas: **salen de contar**.',
      momentos: [
        { base: 2, grupos: [3, 4], cuenta: '$2^3 \\cdot 2^4$', dice: 'Mira estos dos grupos: en uno el 2 está tres veces; en el otro, cuatro.' },
        { base: 2, grupos: [3, 4], junta: true, cuenta: '$2^3 \\cdot 2^4 = 2^7$', dice: 'Cuando los multiplicamos se juntan, y el 2 queda siete veces. Por eso se suman los exponentes.' },
        { base: 5, grupos: [2, 2, 2], cuenta: '$(5^2)^3$', dice: 'Veamos otro caso: tres grupos iguales, y en cada uno el 5 está dos veces.' },
        { base: 5, grupos: [2, 2, 2], junta: true, cuenta: '$(5^2)^3 = 5^6$', dice: 'Tres grupos de dos son seis. Al elevar una potencia, los exponentes se multiplican.' },
      ],
      idea: 'Con la misma base, al multiplicar potencias los exponentes se suman; al elevar una potencia, se multiplican.' },
    { cap: 2, tipo: 'casillas', filas: [{ tex: '$3^2 \\cdot 3^5$', r: '3⁷' }, { tex: '$(7^2)^4$', r: '7⁸' }], fichas: ['3¹⁰', '7⁸', '3⁷', '7⁶'],
      pista: 'Cuenta los factores: en el primero se juntan, en el segundo hay grupos iguales.',
      texto: '**Tu turno.** Toca la ficha de cada resultado. Basta con contar los factores, sin calcular nada.',
      idea: '$3^2 \\cdot 3^5 = 3^7$ y $(7^2)^4 = 7^8$.' },

    // ---- Raíces ----
    { cap: 3, tipo: 'muestra', escena: 'potencia', en: { modo: 'lado' },
      texto: 'Hagamos la pregunta al revés: eso es la **raíz cuadrada**.',
      momentos: [
        { s: 1, dice: 'Esta vez conocemos el área, 81 casillas, y queremos saber cuánto mide el lado.' },
        { s: 9, ms: 1800, cuenta: '$\\sqrt{81} = 9$', dice: 'Hacemos crecer el cuadrado hasta las 81 casillas, y el lado mide 9. Esa es la raíz de 81.' },
        { s: 8, cuenta: '$8^2 = 64 < 70$', dice: 'Probemos con la raíz de 70. Un lado de 8 da 64 casillas: todavía no alcanza.' },
        { s: 9, cuenta: '$64 < 70 < 81$', dice: 'Uno de 9 da 81 y se pasa. Entonces la raíz de 70 está entre 8 y 9, más cerca del 8.' },
        { s: 6, cuenta: '$\\sqrt{0.36} = 0.6$', dice: 'Para la raíz de 0.36 pintamos 36 casillas de 100. El lado mide 6 décimas: la raíz es 0.6.' },
        { s: 10, cuenta: '$71 \\cdot 19 \\approx 70 \\cdot 20 = 1\\,400$', dice: 'Estimar también ayuda. En vez de 71 por 19, pensamos en 70 por 20: da cerca de 1 400.' },
      ],
      idea: 'La raíz cuadrada busca el lado: $\\sqrt{81} = 9$ porque $9^2 = 81$. Si no es exacta, se acorrala entre dos cuadrados.' },
    { cap: 3, tipo: 'potencia', modo: 'lado', meta: 8, max: 10,
      texto: '**Tu turno.** Encuentra la raíz de 64: mueve el lado hasta que el cuadrado tenga 64 casillas.',
      idea: '$\\sqrt{64} = 8$ porque $8^2 = 64$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'potencia', base: 10, meta: 5, max: 7,
      texto: 'En un juego, cada nivel multiplica los puntos por 10 y se empieza con 1. ¿Cuántos niveles hay que pasar para llegar a 100 000? Arrastra.',
      idea: 'Cinco veces por 10: $10^5 = 100\\,000$, un 1 con cinco ceros.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-4', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Multiplicar repetido, el cuadrado como área, contar factores y la raíz como la pregunta al revés.' },
  ],
};
;
//#archivo js/explora-pu-cm-1.js
// Preuniversitario · pu-cm-1 «Enteros, signos y jerarquía»: explicación interactiva que reemplaza el video
// (spec 2026-11-23-explora-leccion-interactiva; tipos de paso en js/explora.js). Primero se explica y después se pide:
// cada capítulo abre con una explicación animada (`muestra`), sigue «tu turno» con la misma escena, y el problema va
// al final. Los ejemplos no repiten los de los ejercicios de la lección (js/courses/preuda-r-calculo.js).
EXPLORA['pu-cm-1'] = {
  caps: ['La recta', 'Sumar y restar', 'El menos da la vuelta', 'Las capas', 'Ahora sí, un problema'],
  pasos: [
    // ---- La recta ----
    { cap: 0, tipo: 'muestra', escena: 'recta', en: { modo: 'llegar', min: -8, max: 8, desde: 0 },
      texto: 'Empecemos por la idea: **dónde viven los enteros**. Piensa en un termómetro acostado.',
      momentos: [
        { de: 0, a: 0, marcas: [0], dice: 'El 0 es como el punto donde el agua se congela: la frontera entre dos lados.' },
        { de: 0, a: 5, ms: 1800, zona: 'pos', dice: 'Si la temperatura sube, avanzamos a la derecha: 1, 2, 3… Son los **positivos**.' },
        { de: 5, a: -5, ms: 2600, zona: 'ambas', dice: 'Si baja del 0, seguimos a la izquierda: −1, −2, −3… Son los **negativos**.' },
        { de: -5, a: -5, zona: 'ambas', marcas: [-5, -2], cuenta: '$-5 < -2$', dice: '¿Qué es más frío, −5 o −2? −5: está más lejos del 0, hacia la izquierda.' },
        { de: -5, a: -5, zona: 'ambas', cuenta: '$-5 < -2 < 0 < 3$', dice: 'Regla de oro: en la recta, el **menor** es siempre el que está más a la izquierda.' },
      ],
      idea: 'A la izquierda del 0 están los negativos; a la derecha, los positivos. Es menor el que está más a la izquierda.' },
    { cap: 0, tipo: 'recta', modo: 'llegar', min: -8, max: 8, desde: 3, meta: -2,
      texto: '**Tu turno.** Arrastra la ficha hasta $-2$.',
      idea: 'Cada entero tiene su lugar: $-2$ está dos pasos a la izquierda del 0.' },
    { cap: 0, tipo: 'muestra', escena: 'recta', en: { modo: 'espejo', min: -8, max: 8, desde: 1 },
      texto: 'Segunda idea: **el opuesto**. Imagina que en el 0 hay un espejo.',
      momentos: [
        { de: 1, a: 4, ms: 1400, cuenta: '$-(4) = -4$', dice: 'Cada número tiene un reflejo al otro lado del espejo. El reflejo del 4 es −4.' },
        { de: 4, a: 4, marcas: [4, -4], cuenta: '$-(4) = -4$', dice: '4 y −4 están a 4 pasos del 0, uno a cada lado. Se llaman **opuestos**.' },
        { de: 4, a: -6, ms: 2400, cuenta: '$-(-6) = 6$', dice: 'El reflejo de −6 es 6. Por eso −(−6) = 6: el reflejo de un reflejo vuelve al original.' },
        { de: -6, a: 0, ms: 1600, cuenta: '$-(0) = 0$', dice: '¿Y el 0? Está justo sobre el espejo: es su propio opuesto.' },
        { de: 0, a: 3, ms: 1300, cuenta: '$3 + (-3) = 0$', dice: 'Un número más su opuesto siempre da 0: ir 3 pasos y volver 3 deja en el mismo sitio.' },
      ],
      idea: 'Un número y su opuesto están igual de lejos del 0 y suman 0. Dos menos se cancelan: $-(-6) = 6$.' },
    { cap: 0, tipo: 'recta', modo: 'espejo', min: -8, max: 8, desde: 2, meta: 5,
      texto: '**Tu turno.** Mueve la ficha y déjala donde su reflejo caiga en $5$.',
      idea: 'El opuesto de $-5$ es $5$: $-(-5) = 5$.' },
    { cap: 0, tipo: 'muestra', escena: 'recta', en: { modo: 'distancia', min: -8, max: 8, ancla: -2, desde: -2 },
      texto: 'Tercera idea: **la distancia**. Cuántos pasos hay que caminar de un número a otro.',
      momentos: [
        { de: -2, a: 3, ms: 2000, cuenta: '$|3 - (-2)| = 5$', dice: 'Caminemos de −2 a 3 y contemos cada paso que da la ficha.' },
        { de: 3, a: 3, marcas: [0], cuenta: '$|3 - (-2)| = 5$', dice: 'Son 2 pasos hasta el 0 y 3 más del otro lado: 5 en total. Cruzar el 0 no cuesta nada extra.' },
        { de: 3, a: 3, cuenta: '$|3 - (-2)| = 5$', dice: 'Se escribe con barras, |3 − (−2)|. Las barras dicen: «cuenta los pasos, sin importar el sentido».' },
        { de: 3, a: -6, ms: 2400, cuenta: '$|{-6} - (-2)| = 4$', dice: 'Hacia la izquierda también se cuentan pasos: de −2 a −6 hay 4.' },
        { de: -6, a: -6, cuenta: '$|{-6} - (-2)| = 4$', dice: 'Por eso una distancia **nunca es negativa**: los pasos se cuentan, no se deben.' },
      ],
      idea: 'La distancia es cuántos pasos separan dos números. Se escribe con barras y nunca es negativa.' },
    { cap: 0, tipo: 'recta', modo: 'distancia', min: -8, max: 8, ancla: -3, desde: -3, meta: 4,
      texto: '**Tu turno.** Arrastra la ficha desde $-3$ hasta $4$ y mira cuántos pasos recorre.',
      idea: 'De $-3$ a $4$ hay 7 pasos: $|4 - (-3)| = 7$.' },
    { cap: 0, tipo: 'recta', modo: 'dos', min: -8, max: 8, ancla: 1, dist: 4, metas: [-3, 5],
      texto: 'Como la distancia se cuenta hacia los dos lados, a 4 pasos del $1$ hay **dos** lugares. Toca los dos.',
      idea: 'A una misma distancia hay dos lugares: $1 - 4$ y $1 + 4$, uno a cada lado del 1.' },

    // ---- Sumar y restar ----
    { cap: 1, tipo: 'muestra', escena: 'recta', en: { modo: 'salto', min: -8, max: 8, desde: -4 },
      texto: 'Ahora las operaciones. **Sumar es caminar** por la recta.',
      momentos: [
        { de: -4, a: -4, cuenta: '$-4$', dice: 'Salimos de −4. El número que sumamos dice hacia dónde y cuánto caminar.' },
        { de: -4, a: 1, ms: 1800, cuenta: '$-4 + 5 = 1$', dice: 'Sumar 5, un positivo, es dar 5 pasos a la **derecha**: llegamos a 1.' },
        { de: 1, a: -4, ms: 1000, cuenta: '$-4$', dice: 'Volvamos al punto de partida, el −4.' },
        { de: -4, a: -7, ms: 1500, cuenta: '$-4 + (-3) = -7$', dice: 'Sumar −3, un negativo, es dar 3 pasos a la **izquierda**: llegamos a −7.' },
        { de: -7, a: -7, cuenta: '$-4 + (-3) = -7$', dice: 'El signo dice el sentido y el número, cuántos pasos. Como ganar o gastar dinero.' },
      ],
      idea: 'Sumar es moverse: un positivo lleva a la derecha y un negativo, a la izquierda.' },
    { cap: 1, tipo: 'recta', modo: 'salto', min: -8, max: 8, desde: -4, suma: 6, meta: 2,
      texto: '**Tu turno.** Sales de $-4$: arrastra la ficha para sumar $6$.',
      idea: 'Seis pasos a la derecha: $-4 + 6 = 2$.' },
    { cap: 1, tipo: 'recta', modo: 'salto', min: -8, max: 8, desde: 2, suma: -5, meta: -3,
      texto: 'Ahora suma $-5$ saliendo de $2$.',
      idea: 'Cinco pasos a la izquierda: $2 + (-5) = -3$.' },
    { cap: 1, tipo: 'muestra', escena: 'recta', en: { modo: 'salto', min: -8, max: 8, desde: 3 },
      texto: '¿Y restar? **Restar es caminar al revés** de lo que harías al sumar.',
      momentos: [
        { de: 3, a: 3, cuenta: '$3$', dice: 'Partimos de 3. Sumar 5 nos llevaría 5 pasos a la derecha…' },
        { de: 3, a: -2, ms: 1800, cuenta: '$3 - 5 = -2$', dice: '…así que restar 5 es ir 5 pasos al revés, a la izquierda: llegamos a −2.' },
        { de: -2, a: 3, ms: 1000, cuenta: '$3$', dice: 'Volvamos al 3. Ahora la pregunta difícil: ¿qué es restar −4?' },
        { de: 3, a: 7, ms: 1700, cuenta: '$3 - (-4) = 7$', dice: 'Sumar −4 iría a la izquierda. Restarlo es al revés: 4 pasos a la **derecha**.' },
        { de: 7, a: 7, marcas: [7], cuenta: '$3 - (-4) = 7$', dice: 'Piénsalo como dinero: si te perdonan una deuda de 4, tu saldo **sube** 4.' },
        { de: 7, a: 7, cuenta: '$3 - (-4) = 3 + 4 = 7$', dice: 'La regla: restar es sumar el opuesto. Dos menos seguidos se vuelven un más.' },
      ],
      idea: 'Restar es sumar el opuesto. Restar un negativo sube: $3 - (-4) = 3 + 4 = 7$.' },
    { cap: 1, tipo: 'recta', modo: 'salto', min: -8, max: 8, desde: 3, resta: 7, meta: -4,
      texto: '**Tu turno.** Haz $3 - 7$ con la ficha.',
      idea: 'Siete pasos a la izquierda: $3 - 7 = 3 + (-7) = -4$.' },
    { cap: 1, tipo: 'recta', modo: 'salto', min: -8, max: 8, desde: -2, resta: -6, meta: 4,
      texto: 'Y ahora $-2 - (-6)$: sal de $-2$ y camina al revés de sumar $-6$.',
      idea: 'Quitar seis deudas es ganar seis: $-2 - (-6) = -2 + 6 = 4$.' },

    // ---- El menos da la vuelta ----
    { cap: 2, tipo: 'muestra', escena: 'saltos', en: { a: -3, min: -15, max: 15, meta: 12, desde: 1 },
      texto: 'Multiplicar. La idea: **repetir saltos iguales**, como una rana que siempre salta lo mismo.',
      momentos: [
        { de: -3, a: -3, cuenta: '$(-3) \\cdot 1 = -3$', dice: 'Este salto mide −3: tres pasos hacia la izquierda.' },
        { de: -3, a: -12, ms: 2200, cuenta: '$(-3) \\cdot 4 = -12$', dice: 'Multiplicar por 4 es repetir el mismo salto 4 veces. Mira cada salto.' },
        { de: -12, a: -12, cuenta: '$(-3) \\cdot 4 = -12$', dice: 'Es como deber 3 a cuatro amigos: en total debes 12.' },
        { de: -12, a: 12, ms: 3000, cuenta: '$(-3) \\cdot (-4) = 12$', dice: 'Ahora las veces son −4. El menos de las veces hace que toda la cadena **dé la vuelta** en el 0.' },
        { de: 12, a: 12, cuenta: '$(-3) \\cdot (-4) = 12$', dice: 'Dar la vuelta a algo negativo lo vuelve positivo: menos por menos da más.' },
      ],
      idea: 'Multiplicar es repetir saltos. Multiplicar por un negativo **da la vuelta** en el 0: $(-3)(-4) = 12$.' },
    { cap: 2, tipo: 'saltos', a: 2, min: -12, max: 12, meta: -8,
      texto: '**Tu turno.** Cada salto mide $2$. Lleva la punta hasta el aro.',
      idea: 'Cuatro saltos de $2$ y una vuelta: $2 \\cdot (-4) = -8$.' },
    { cap: 2, tipo: 'saltos', a: -4, min: -16, max: 16, meta: 12,
      texto: 'Ahora los saltos miden $-4$. Lleva la punta hasta el aro.',
      idea: 'Tres saltos de $-4$ y una vuelta: $(-4)(-3) = 12$.' },
    { cap: 2, tipo: 'muestra', escena: 'signos', en: { factores: [2, 3, 2], menos: 9 },
      texto: 'Con varios factores, **cada signo menos es una vuelta**. Mira cómo cambia el resultado.',
      momentos: [
        { dice: 'Multiplicamos 2 · 3 · 2. Sin signos menos nadie da la vuelta: el producto es positivo.' },
        { i: 0, dice: 'Un menos: el producto da una vuelta y queda mirando al lado negativo.' },
        { i: 1, dice: 'Dos menos: dos vueltas. Una deshace la otra y vuelve a ser positivo.' },
        { i: 2, dice: 'Tres menos: otra vuelta más. Negativo otra vez.' },
        { dice: 'No importa **cuál** factor sea negativo, sino **cuántos**: par da positivo, impar da negativo.' },
      ],
      idea: 'Número **par** de signos menos: positivo. Número **impar**: negativo.' },
    { cap: 2, tipo: 'signos', factores: [2, 3, 1, 2], menos: 3,
      texto: '**Tu turno.** Toca los factores para volverlos negativos y deja **tres** signos menos.',
      idea: 'Tres signos menos, impar: el producto es negativo.' },

    // ---- Las capas ----
    { cap: 3, tipo: 'muestra', escena: 'capas', en: { expr: '5 + 3 * ( 2 - 6 ) ^ 2' },
      texto: 'Última idea: en una cuenta larga **el orden importa**. Se resuelve por capas, como pelar una cebolla.',
      momentos: [
        { cuenta: '$2 - 6 = -4$', dice: 'Primero, lo que está dentro del paréntesis: es una caja que se abre antes que todo.' },
        { cuenta: '$(-4)^2 = 16$', dice: 'Luego, la potencia. El menos está dentro del paréntesis, así que también se eleva.' },
        { cuenta: '$3 \\cdot 16 = 48$', dice: 'Después, multiplicaciones y divisiones: 3 por 16 da 48.' },
        { cuenta: '$5 + 48 = 53$', dice: 'Al final, sumas y restas. Si hubieras sumado 5 + 3 primero, saldría otro número.' },
      ],
      idea: 'Primero paréntesis, luego potencias, después × y ÷, y al final + y −.' },
    { cap: 3, tipo: 'capas', expr: '6 + 2 * ( 1 - 4 ) ^ 2',
      texto: '**Tu turno.** Toca la operación que va primero; el resultado se funde solo. Sigue hasta que quede un número.',
      idea: 'Capa por capa: $6 + 2 \\cdot (1 - 4)^2 = 6 + 2 \\cdot 9 = 24$.' },
    { cap: 3, tipo: 'capas', expr: '18 / 3 * 2 - 7',
      texto: '× y ÷ están en la **misma** capa: entre ellas va primero la que está más a la izquierda. Toca en orden.',
      idea: 'En $18 \\div 3 \\cdot 2$ va primero la división, por estar a la izquierda: da $12$, no $3$.' },
    { cap: 3, tipo: 'casillas', filas: [{ tex: '$-3^2$', r: '−9' }, { tex: '$(-3)^2$', r: '9' }], fichas: ['9', '−6', '−9', '6'],
      pista: 'Mira si el menos está dentro del paréntesis: solo entonces se eleva.',
      texto: 'Un detalle: en $-3^2$ la potencia va antes que el menos, que está **afuera**. En $(-3)^2$ se eleva todo. Toca cada resultado.',
      idea: 'En $(-3)^2$ el menos está adentro y se eleva: $9$. En $-3^2$ se queda afuera: $-9$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'recta', modo: 'distancia', min: -8, max: 8, ancla: -2, desde: -2, meta: 6,
      texto: 'Un equipo empezó el torneo con diferencia de gol $-2$ y lo terminó con $+6$. ¿En cuánto mejoró? Mídelo con la ficha.',
      idea: 'De $-2$ a $6$ hay $|6 - (-2)| = 8$: el equipo mejoró en 8 goles.' },
    { cap: 4, tipo: 'cierre', clave: 'gol', real: '8',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Enteros en la recta, opuestos, distancia, sumar y restar, signos y capas.' },
  ],
};
;
//#archivo js/explora-icf-ma.js
// Preicfes · Matemáticas, mundo 1 «Datos y Gráficas» (Explora, escenas «dibujo», «fichas» y «hoja»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 10) / 10), Y0 = 168, H = 136;
  // Barras con eje desde `lo` hasta `hi`, rayas cada `st`; `lin` dibuja una línea a esa altura.
  const barras = (v, K) => {
    const n = v.vals.length, w = 250 / n, Y = x => Y0 - (Math.max(v.lo || 0, x) - (v.lo || 0)) / (v.hi - (v.lo || 0)) * H; let h = '';
    for (let k = v.lo || 0; k <= v.hi + 1e-6; k += v.st) h += K.l(60, Y(k), 320, Y(k), 'ls') + K.t(52, Y(k) + 4, N(k), 's tm', 'end');
    v.vals.forEach((x, i) => { h += K.r(66 + i * w + 8, Y(x), w - 16, Y0 - Y(x), i === v.on ? 'fA' : 'fa', 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, v.rot[i], 's'); });
    return h + (v.lin > 0 ? K.l(60, Y(v.lin), 320, Y(v.lin), 'lg d') : '') + (v.nota ? K.t(190, 20, v.nota, 'tg') : '');
  };
  const manija = (k, i, n, hi, paso, en = 0) => ({ k, min: en, max: hi, paso, r: 10, en: v => [66 + (i + 0.5) * 250 / n, Y0 - v[k] / hi * H], de: (x, y) => (Y0 - y) / H * hi });
  const torta = (v, K) => { const m = K.at(150, 100, 52, 90 - v.g / 2); return K.sec(150, 100, 80, 90 - 360, 90 - v.g, 'fn') + K.sec(150, 100, 80, 90 - v.g, 90, 'fA') + K.t(m[0], m[1] + 5, v.r || '', 's') + K.t(252, 40, `${N(v.g)}°`, 'tm', 'start'); };

  xpLec('icf-ma-datos-1', [
    ['Primero, la escala',
      xpMira('dibujo', '¿Cómo se lee bien una gráfica? Mirando primero su **escala**, no a ojo.', { dib: barras, v: { vals: [50, 75, 25], hi: 100, st: 50, rot: ['lun', 'mar', 'mié'], on: -1, nota: '' }, alto: 195 }, [
        ['Estas barras muestran la lluvia de tres días. Fíjate en las rayas: van de 50 en 50.', {}],
        ['La barra del lunes llega justo a la primera raya, así que vale 50.', { on: 0, nota: '50' }],
        ['Con el martes hay que pensar un poco más: queda en la mitad entre 50 y 100. Son 75.', { on: 1, nota: '75' }, '$50 + 25 = 75$'],
        ['Y el miércoles está en la mitad entre 0 y 50. Entonces vale 25.', { on: 2, nota: '25' }],
        ['Si hubiéramos pensado que las rayas iban de 10 en 10, todo saldría mal.', { on: -1, nota: '' }],
      ], 'Mira cuánto vale una raya y qué parte de ella alcanza la barra.'),
      xpHaz('dibujo', 'Ahora pasa esta tabla a la gráfica: A vale 30, B vale 60 y C vale 90. Arrastra cada barra.', { dib: (v, K) => barras({ vals: [v.a, v.b, v.c], hi: 120, st: 60, rot: ['A', 'B', 'C'], on: -1 }, K), v: { a: 15, b: 15, c: 15 }, metas: { a: 30, b: 60, c: 90 }, alto: 195, manijas: ['a', 'b', 'c'].map((k, i) => manija(k, i, 3, 120, 15)),
        lee: v => `$${v.a}, \\; ${v.b}, \\; ${v.c}$`, dice: () => 'Las rayas van de 60 en 60: la mitad de una raya son 30.' }, 'El 30 y el 90 caen a mitad de raya.')],
    ['Cambio y porcentaje',
      xpMira('dibujo', 'Cuando algo cambia, el porcentaje se calcula sobre lo que había **antes**.', { dib: barras, v: { vals: [8, 8], hi: 16, st: 4, rot: ['antes', 'ahora'], on: 1, nota: '' }, alto: 195 }, [
        ['Imagina un coro que empezó con 8 estudiantes.', {}],
        ['Hoy son 12, porque entraron 4 más.', { vals: [8, 12], nota: '+4' }, '$12 - 8 = 4$'],
        ['Para saber cuánto creció, comparamos esos 4 con los 8 del comienzo: es la mitad, el 50 %.', { nota: '+50 %' }, '$\\tfrac{4}{8} = 50\\,\\%$'],
        ['¿Y si después pasa de 12 a 8? Pierde 4 de 12, una tercera parte: cerca del 33 %.', { vals: [12, 8], nota: '−33 %' }, '$\\tfrac{4}{12} \\approx 33\\,\\%$'],
        ['Fueron 4 estudiantes las dos veces, pero el porcentaje cambió, porque el punto de partida era otro.', {}],
      ], 'Cambio porcentual = lo que cambió ÷ lo que había antes.'),
      xpHaz('dibujo', 'Antes había 40. Arrastra la barra de ahora hasta que el aumento sea del 25 %.', { dib: (v, K) => barras({ vals: [40, v.b], hi: 80, st: 20, rot: ['antes', 'ahora'], on: 1 }, K), v: { b: 70 }, metas: { b: 50 }, alto: 195, manijas: [manija('b', 1, 2, 80, 5, 10)],
        lee: v => `$\\tfrac{${v.b} - 40}{40} = ${N((v.b - 40) / 40 * 100)}\\,\\%$`, dice: v => (v.b >= 40 ? `Subió ${v.b - 40} sobre 40.` : `Bajó ${40 - v.b} sobre 40.`) }, 'El 25 % de 40 son 10: $40 + 10 = 50$.')],
    ['La torta',
      xpMira('dibujo', 'Otra gráfica muy común es la torta. En ella, el total es la **vuelta completa**.', { dib: torta, v: { g: 360, r: '100 %' }, alto: 200 }, [
        ['Todo el círculo es el 100 %, y una vuelta mide 360°.', {}, '$100\\,\\% = 360^\\circ$'],
        ['Por eso la mitad del total, el 50 %, ocupa media vuelta: 180°.', { g: 180, r: '50 %' }, '$50\\,\\% = 180^\\circ$'],
        ['Para el 10 % dividimos la vuelta entre 10, y quedan 36°.', { g: 36, r: '10 %' }, '$360^\\circ \\div 10 = 36^\\circ$'],
        ['Con ese dato es fácil: el 30 % es tres veces 36°, o sea, 108°.', { g: 108, r: '30 %' }, '$3 \\cdot 36^\\circ = 108^\\circ$'],
        ['También podemos ir al revés: un ángulo de 90°, dividido entre 360, es el 25 %.', { g: 90, r: '25 %' }, '$\\tfrac{90}{360} = 25\\,\\%$'],
      ], 'El sector es la misma fracción de 360° que la parte es del total.'),
      xpHaz('dibujo', 'De 50 personas, 10 prefieren el té. Arrastra el borde hasta abrir su sector.', { dib: (v, K) => torta({ g: v.g, r: 'té' }, K), v: { g: 144 }, metas: { g: 72 }, alto: 200, manijas: [{ k: 'g', min: 18, max: 342, paso: 18, r: 10, en: v => XPK.at(150, 100, 80, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(100 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 18) : g; } }],
        lee: v => `$${N(v.g / 3.6)}\\,\\% \\text{ de } 50 = ${N(v.g / 360 * 50)}$`, dice: v => `${v.g}° son el ${N(v.g / 3.6)} % de la vuelta.` }, '10 de 50 son el 20 %: $2 \\cdot 36^\\circ = 72^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una tienda vendió 10 cajas en enero, 20 en febrero y 15 en marzo. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Siempre aumentaron.'], ['De enero a febrero subieron el 50 %.'], ['De enero a febrero se duplicaron.'], ['En marzo fueron las menores.']], pista: 'Esa no cuadra con los tres números. Revísala uno por uno.' }, 'De 10 a 20 es el doble: un aumento del 100 %.')],
  ], 'Escala primero, lo de antes para el porcentaje y 360° para la torta.');

  xpLec('icf-ma-datos-2', [
    ['Repartir parejo',
      xpMira('dibujo', '¿Qué es el **promedio**? Es lo que le tocaría a cada uno si repartiéramos todo por igual.', { dib: barras, v: { vals: [2, 11, 5], hi: 12, st: 3, rot: ['Ana', 'Bea', 'Ciro'], on: -1, nota: '', lin: 0 }, alto: 195 }, [
        ['Tres amigos coleccionan láminas: Ana tiene 2, Bea tiene 11 y Ciro tiene 5.', {}],
        ['Si las juntan todas, reúnen 18.', { nota: '18' }, '$2 + 11 + 5 = 18$'],
        ['Al repartir esas 18 entre los tres, a cada uno le tocan 6.', { lin: 6 }, '$18 \\div 3 = 6$'],
        ['Mira lo que pasa: Bea le pasa a los otros lo que le sobra, y todos quedan iguales.', { vals: [6, 6, 6], nota: 'promedio 6' }],
        ['Lo que sobra arriba de la línea llena justo lo que falta abajo. Ese nivel es el promedio.', {}],
      ], 'Promedio: suma todo y reparte entre cuántos son.'),
      xpHaz('dibujo', 'Hay tres datos: 4, 9 y uno que falta. Muévelo hasta que el promedio sea 8.', { dib: (v, K) => barras({ vals: [4, 9, v.c], hi: 15, st: 5, rot: ['4', '9', '?'], on: 2, lin: (13 + v.c) / 3 }, K), v: { c: 5 }, metas: { c: 11 }, alto: 195, manijas: [manija('c', 2, 3, 15, 1)],
        lee: v => `$\\tfrac{4 + 9 + ${v.c}}{3} = ${N((13 + v.c) / 3)}$`, dice: () => 'Tres datos con promedio 8 deben sumar 24.' }, 'Deben sumar 24 y ya hay 13: faltan 11.')],
    ['El del centro y el que más sale',
      xpMira('fichas', 'Hay otra forma de resumir datos: la **mediana**, que es el dato del centro cuando están **en orden**.', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 60, y: 60, w: 50 })), fichas: ['9', '3', '7', '3', '4'], alto: 110 }, [
        ['Aquí tenemos cinco datos, todos revueltos.', {}],
        ['Lo primero es ordenarlos de menor a mayor.', { pon: { 0: '3', 1: '3', 2: '4', 3: '7', 4: '9' } }],
        ['El del centro es el 4, con dos datos a cada lado. Esa es la mediana.', { marca: [2] }, '$\\text{mediana} = 4$'],
        ['Y la moda es el dato que más se repite. Aquí es el 3, que aparece dos veces.', { marca: [0, 1] }, '$\\text{moda} = 3$'],
        ['Cuando la cantidad de datos es par, quedan dos en el centro, y la mediana es el promedio de esos dos.', { marca: [] }],
      ], 'Mediana: ordena y busca el centro. Moda: el que más se repite.'),
      xpHaz('fichas', 'Con estos datos, 8, 2, 6, 2, 10 y 5, pon la mediana y la moda.', { slots: [{ x: 110, y: 46, w: 90, et: 'mediana' }, { x: 230, y: 46, w: 90, et: 'moda' }], fichas: ['5.5', '2', '6', '4', '10'], meta: ['5.5', '2'], alto: 96, pista: 'Ordena: 2, 2, 5, 6, 8, 10. Con seis datos hay dos en el centro.' }, 'Los del centro son 5 y 6: $\\tfrac{5 + 6}{2} = 5.5$. El 2 se repite.')],
    ['El dato que jala y el que pesa',
      xpMira('dibujo', 'Ojo con algo: un dato muy grande **jala** el promedio, pero a la mediana casi no la mueve.', { dib: barras, v: { vals: [1, 2, 2, 3, 2], hi: 24, st: 6, rot: ['1', '2', '2', '3', '2'], on: -1, nota: '', lin: 0 }, alto: 195 }, [
        ['Piensa en cinco sueldos parecidos, en millones. Aquí el promedio y la mediana valen 2.', { lin: 2 }],
        ['De pronto, uno de ellos sube a 22.', { vals: [1, 2, 2, 3, 22], rot: ['1', '2', '2', '3', '22'], on: 4 }],
        ['El promedio salta a 6, aunque nadie en el grupo gana eso.', { lin: 6, nota: 'promedio 6' }, '$30 \\div 5 = 6$'],
        ['La mediana, en cambio, sigue en 2. Por eso describe mejor a este grupo.', { lin: 2, nota: 'mediana 2' }],
        ['Algo parecido pasa con las notas que tienen peso: cada una cuenta según su porcentaje.', { nota: '' }, '$0.4 \\cdot 5 + 0.6 \\cdot 3 = 3.8$'],
      ], 'Un dato extremo mueve el promedio y casi nunca la mediana.'),
      xpHaz('fichas', 'En el taller, que vale el 30 %, sacaste 5; en el examen, que vale el 70 %, sacaste 3. Pon los aportes y la nota final.', { slots: [{ x: 66, y: 46, w: 80, et: 'taller' }, { x: 170, y: 46, w: 80, et: 'examen' }, { x: 274, y: 46, w: 80, et: 'nota' }], fichas: ['1.5', '2.1', '3.6', '4.0', '3.0'], meta: ['1.5', '2.1', '3.6'], alto: 96, pista: 'Multiplica cada nota por su peso y después suma los aportes.' }, '$0.3 \\cdot 5 = 1.5$, $0.7 \\cdot 3 = 2.1$ y $1.5 + 2.1 = 3.6$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Cuatro amigos tienen en promedio 10 años. Llega uno más, y ahora el promedio es 11. Mueve su edad.', { dib: (v, K) => barras({ vals: [10, 10, 10, 10, v.e], hi: 20, st: 5, rot: ['10', '10', '10', '10', '?'], on: 4, lin: (40 + v.e) / 5 }, K), v: { e: 12 }, metas: { e: 15 }, alto: 195, manijas: [manija('e', 4, 5, 20, 1)],
        lee: v => `$\\tfrac{40 + ${v.e}}{5} = ${N((40 + v.e) / 5)}$`, dice: () => 'Cinco personas con promedio 11 suman 55.' }, 'Antes sumaban 40; ahora deben sumar 55: tiene 15.')],
  ], 'Promedio reparte, mediana parte en dos, moda repite; y los extremos jalan.');

  xpLec('icf-ma-datos-3', [
    ['El eje que engaña',
      xpMira('dibujo', 'Una gráfica también puede engañar: si el eje **no empieza en cero**, la diferencia se ve mucho más grande de lo que es.', { dib: barras, v: { vals: [52, 54], lo: 50, hi: 55, st: 1, rot: ['A: 52', 'B: 54'], on: 1, nota: '' }, alto: 195 }, [
        ['Mira estas dos barras: la segunda parece el doble de la primera.', {}],
        ['Pero fíjate dónde arranca el eje: en 50, no en cero.', { nota: 'desde 50' }],
        ['Si lo dibujamos desde cero, las dos barras casi miden lo mismo.', { lo: 0, hi: 60, st: 20, nota: 'desde 0' }],
        ['Con los números se ve claro: B tiene apenas 2 más que 52, cerca de un 4 %.', { nota: '+4 %' }, '$\\tfrac{2}{52} \\approx 4\\,\\%$'],
        ['Así que no te dejes llevar por las alturas: fíjate en los números.', { nota: '' }],
      ], 'Antes de comparar barras, mira dónde empieza el eje.'),
      xpHaz('dibujo', 'La tienda A vendió 30 y la B, 36. Baja el piso del eje hasta que el dibujo deje de engañar.', { dib: (v, K) => barras({ vals: [30, 36], lo: v.p, hi: 40, st: (40 - v.p) / 4, rot: ['A: 30', 'B: 36'], on: 1 }, K), v: { p: 24 }, metas: { p: 0 }, alto: 240, manijas: [{ k: 'p', min: 0, max: 24, paso: 4, et: 'piso del eje' }],
        lee: v => `$\\text{B parece } ${N((36 - v.p) / (30 - v.p))} \\text{ veces A}$`, dice: v => (v.p ? 'Todavía se corta la parte de abajo de las barras.' : 'Ahora se ven completas.') }, 'Desde 0, B es 1.2 veces A: un 20 % más.')],
    ['Grupos de distinto tamaño',
      xpMira('dibujo', 'Cuando los grupos tienen distinto tamaño, contar no basta: hay que comparar **porcentajes**.', { dib: barras, v: { vals: [30, 40], hi: 100, st: 25, rot: ['A: 30', 'B: 40'], on: -1, nota: '' }, alto: 195 }, [
        ['En el curso A aprobaron 30 y en el B, 40. A primera vista, parece que gana el segundo.', {}],
        ['Pero el curso A tiene 50 estudiantes, y el B tiene 80.', { vals: [50, 80], rot: ['A: 50', 'B: 80'] }],
        ['De los 50 de A aprobaron 30, o sea, el 60 %.', { vals: [60, 80], rot: ['A: 60 %', 'B: 80'], on: 0 }, '$\\tfrac{30}{50} = 60\\,\\%$'],
        ['En el otro curso aprobaron 40 de 80, que es el 50 %. Al final gana el curso más pequeño.', { vals: [60, 50], rot: ['A: 60 %', 'B: 50 %'], on: 1 }, '$\\tfrac{40}{80} = 50\\,\\%$'],
        ['Tener más personas no significa tener una mayor proporción.', { on: -1 }],
      ], 'Cada cantidad se divide entre el total de su propio grupo.'),
      xpHaz('fichas', 'El equipo rojo ganó 12 de sus 20 partidos y el azul, 15 de 30. Pon el porcentaje de cada uno.', { slots: [{ x: 110, y: 46, w: 90, et: 'rojo' }, { x: 230, y: 46, w: 90, et: 'azul' }], fichas: ['60 %', '50 %', '12 %', '15 %', '24 %'], meta: ['60 %', '50 %'], alto: 96, pista: 'Divide 12 entre 20 y 15 entre 30.' }, 'El rojo tiene menos triunfos, pero mayor proporción.')],
    ['La muestra',
      xpMira('hoja', 'Casi nunca se le pregunta a todo el mundo: se toma una **muestra**, y esa muestra sirve si se parece a todos.', { paras: [['Se quiere saber cuánto deporte hace la gente de un pueblo.'], ['Preguntar en el gimnasio.'], ['Sortear personas de todos los barrios.'], ['Preguntar a quien quiera llamar.']] }, [
        ['Aquí la población, es decir, todos los que nos interesan, es el pueblo entero.', { luz: [0] }],
        ['Si preguntamos en el gimnasio, todos hacen deporte. La respuesta sale cargada.', { luz: [1], nota: { 1: 'sesgada' } }],
        ['Con un sorteo en todos los barrios, cualquiera del pueblo puede salir. Esa sí sirve.', { luz: [2], nota: { 2: 'sirve' } }],
        ['Y cuando responde solo quien quiere llamar, llaman los interesados, y otra vez se carga.', { luz: [3], nota: { 3: 'sesgada' } }],
        ['Y recuerda: lo que concluyas solo vale para el grupo del que salió la muestra.', { luz: [2] }],
      ], 'Sirve si cualquiera de la población podía salir.'),
      xpHaz('hoja', 'Un colegio quiere saber qué música prefieren sus estudiantes. Subraya la muestra que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los de la banda de rock.'], ['Cinco de cada curso, por sorteo.'], ['Los que fueron al concierto.']], pista: 'En esa algunos estudiantes nunca podrían salir.' }, 'Con sorteo en cada curso, todos pueden salir.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una panadería encuestó a 100 de sus clientes, y 70 dijeron que comen pan a diario. **Tacha** las dos conclusiones que no valen.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['El 70 % del país come pan a diario.'], ['30 de los encuestados no comen pan a diario.'], ['Comen pan porque es barato.']], pista: 'Alguna de las tachadas sale directo de los números.' }, 'Los clientes no son el país, y nadie preguntó por qué.')],
  ], 'Eje desde cero, porcentajes para comparar y muestras donde cualquiera pueda salir.');
}
