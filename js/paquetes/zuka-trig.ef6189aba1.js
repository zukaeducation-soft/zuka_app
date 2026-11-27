// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/rueda-angulo.js
// La rueda del ángulo (trigonometría, grados y radianes): se gira el lado terminal arrastrando su
// punta (también varias vueltas y en sentido negativo) hasta el ángulo pedido, en grados o radianes.
// El giro deja una espiral que cuenta las vueltas; los botones ajustan de a un paso. Rondas con pestañas.
// params = { snap, rounds: [{ target (grados), label, tex }] }   state = { angles: [grados | null] }

GAMES['rueda-angulo'] = (() => {
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Grados → múltiplo de π en texto (150 → 5π/6); con múltiplos de 5°.
  function fmtRad(deg) {
    if (deg === 0) return '0';
    if (deg % 5 !== 0) return (deg * Math.PI / 180).toFixed(2).replace('-', '−');
    const n = deg / 5, g = gcd(Math.abs(n), 36), num = n / g, den = 36 / g, k = Math.abs(num);
    const top = k === 1 ? 'π' : `${k}π`;
    return (num < 0 ? '−' : '') + (den === 1 ? top : `${top}/${den}`);
  }

  // Lleva el giro por el camino corto: de 170° a −170° son +20°, no −340°.
  function unwrap(prev, now) {
    let delta = now - prev;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return delta;
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.angles[i] != null && Math.abs(state.angles[i] - r.target) < 0.5);
    // Si la ronda ya está en grados, no se repite «405° = 405°».
    return { ok, solution: params.rounds.map(r => (r.tex === `${r.target}^\\circ` ? `$${r.tex}$` : `$${r.tex} = ${r.target}^\\circ$`)).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette, snap = params.snap || 15;
    const st = { angles: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], cx = 0, cy = 0, R = 0, drag = false, raw = 0, last = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.34, h * 0.27); cx = w / 2; cy = 70 + R + 26;
      const bw = 96, by = h - 50;
      btns = [{ d: snap, x: w / 2 - bw - 6, y: by, w: bw, h: 36, t: `↺ +${snap}°` }, { d: -snap, x: w / 2 + 6, y: by, w: bw, h: 36, t: `↻ −${snap}°` }];
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ang = () => st.angles[cur] ?? 0;
    const ready = () => api.ready(st.angles.every(a => a !== null));
    const pt = (deg, r) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function spiral(deg, col, weight) {
        if (Math.abs(deg) < 1) return;
        p.noFill(); p.stroke(col); p.strokeWeight(weight); p.beginShape();
        const n = Math.max(2, Math.ceil(Math.abs(deg) / 3));
        for (let k = 0; k <= n; k++) {
          const d = deg * k / n, [x, y] = pt(d, R * 0.3 + R * 0.12 * Math.abs(d) / 360);
          p.vertex(x, y);
        }
        p.endShape();
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], a = ang(), good = Math.abs(a - r.target) < 0.5;
        tabs.forEach((t, i) => {
          const v = st.angles[i], ok = v !== null && Math.abs(v - params.rounds[i].target) < 0.5;
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.LEFT, p.CENTER); p.text('Gira hasta', 12, 54);
        p.fill(C.N); p.textStyle(p.BOLD); let ts = 24; p.textSize(ts); while (ts > 13 && p.textWidth(r.label) > W - 94) p.textSize(--ts); p.text(r.label, 82, 54);

        // Ejes y circunferencia.
        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - R - 14, cy, cx + R + 14, cy); p.line(cx, cy - R - 14, cx, cy + R + 14);
        p.noFill(); p.stroke(C.line); p.strokeWeight(2); p.circle(cx, cy, 2 * R);
        // Espiral del giro (amarilla si es positivo, coral si es negativo) y lado inicial.
        spiral(a, a >= 0 ? C.N : C.I, 3);
        p.stroke(C.Z); p.strokeWeight(4); p.line(cx, cy, cx + R, cy);
        if (locked && !good) {
          const [gx, gy] = pt(r.target, R);
          p.stroke(C.ok); p.strokeWeight(3); p.drawingContext.setLineDash([6, 5]); p.line(cx, cy, gx, gy); p.drawingContext.setLineDash([]);
        }
        const col = locked ? (good ? C.ok : C.bad) : drag ? C.ink : C.brand;
        const [hx, hy] = pt(a, R);
        p.stroke(col); p.strokeWeight(5); p.line(cx, cy, hx, hy);
        p.noStroke(); p.fill(col); p.circle(hx, hy, 22);
        p.fill(C.bg); p.circle(hx, hy, 8);

        // Lectura: grados, radianes y vueltas.
        const turns = Math.trunc(a / 360), rest = a - 360 * turns;
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER);
        p.fill(st.angles[cur] === null ? C.mute : C.ink); p.textStyle(p.BOLD); p.textSize(20);
        p.text(st.angles[cur] === null ? 'arrastra el punto' : `θ = ${String(a).replace('-', '−')}° = ${fmtRad(a)}`, W / 2, cy + R + 34);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12);
        if (st.angles[cur] !== null && turns !== 0) p.text(`${Math.abs(turns)} ${Math.abs(turns) === 1 ? 'vuelta' : 'vueltas'}${a < 0 ? ' hacia atrás' : ''} y ${String(rest).replace('-', '−')}° más`, W / 2, cy + R + 56);
        if (locked && !good) { p.fill(C.ok); p.textStyle(p.BOLD); p.text(`era ${String(r.target).replace('-', '−')}° = ${fmtRad(r.target)}`, W / 2, cy + R + 76); }
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); p.textSize(14); p.text(b.t, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      const setAngle = v => { st.angles[cur] = Math.round(v / snap) * snap; ready(); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const b = btns.find(b => inside(b, p.mouseX, p.mouseY));
        if (b) { setAngle(ang() + b.d); api.sfx?.tap?.(); return false; }
        const d = Math.hypot(p.mouseX - cx, p.mouseY - cy);
        if (d > R * 0.25 && d < R + 34) {
          drag = true; raw = ang(); last = Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI;
          // Al tocar, la punta salta al lugar tocado (dentro de la misma vuelta).
          let delta = last - (((raw % 360) + 360) % 360); if (delta > 180) delta -= 360; if (delta < -180) delta += 360;
          raw += delta; setAngle(raw); return false;
        }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) < R * 0.2) return false;   // cerca del centro el sentido es ambiguo
        const now = Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI;
        const delta = unwrap(last, now);
        last = now; raw += delta; setAngle(raw);
        return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.38);

    return {
      loaded: m.ready,
      getState: () => ({ angles: [...st.angles] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, fmtRad, unwrap };
})();
;
//#archivo js/games/corta-pizza.js
// Corta la pizza (trigonometría, arco y sector): se abre la porción arrastrando su borde y, si la
// ronda lo permite, se cambia el radio de la pizza, hasta que el arco (s = rθ) o el área del sector
// (A = ½r²θ) sea la pedida. El ángulo en radianes y las dos medidas se ven en vivo. Rondas con pestañas.
// params = { rounds: [{ goal: 'arc' | 'area', value, label, r?, deg?, rMin?, rMax? }] }   state = { cuts: [{ deg, r }] }

GAMES['corta-pizza'] = (() => {
  const measure = ({ deg, r }) => { const t = deg * Math.PI / 180; return { arc: r * t, area: 0.5 * r * r * t }; };
  const hit = (cut, round) => !!cut && Math.abs(measure(cut)[round.goal] - round.value) <= 0.02 * round.value + 1e-9;
  const fmt = v => String(+v.toFixed(2));

  // Lo que había que poner: el ángulo (si el radio es fijo) o el radio (si el ángulo es fijo).
  function answer(r) {
    if (r.r != null) {
      const t = r.goal === 'arc' ? r.value / r.r : 2 * r.value / (r.r * r.r);
      return { deg: Math.round(t * 180 / Math.PI), r: r.r };
    }
    const t = r.deg * Math.PI / 180;
    return { deg: r.deg, r: Math.round(r.goal === 'arc' ? r.value / t : Math.sqrt(2 * r.value / t)) };
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => hit(state.cuts[i], r));
    const solution = params.rounds.map(r => { const a = answer(r); return `$r = ${a.r},\\ \\theta = ${a.deg}^\\circ$`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, CRUST = '#D9A066', CHEESE = '#F6D365', TOP = '#D64545';
    const st = { cuts: params.rounds.map(r => ({ deg: r.deg ?? 30, r: r.r ?? (r.rMin ?? 2) })) };
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], btns = [], cx = 0, cy = 0, Rmax = 0, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      Rmax = Math.min(w * 0.36, h * 0.26); cx = w / 2; cy = 84 + Rmax;
      const by = h - 46;
      btns = [{ d: -1, x: w / 2 - 110, y: by, w: 44, h: 34, t: '−' }, { d: 1, x: w / 2 + 66, y: by, w: 44, h: 34, t: '+' }];
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const rr = round => round.rMax ?? round.r ?? 10;
    const pxR = (round, r) => Rmax * r / rr(round);
    const ready = () => api.ready(touched.every(Boolean));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const round = params.rounds[cur], cut = st.cuts[cur], good = hit(cut, round), meas = measure(cut);
        tabs.forEach((t, i) => {
          const ok = hit(st.cuts[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.LEFT, p.CENTER);
        p.text('Corta una porción con', 12, 52);
        p.fill(C.N); p.textStyle(p.BOLD); let ts = 17; p.textSize(ts); while (ts > 11 && p.textWidth(round.label) > W - 24) p.textSize(--ts); p.text(round.label, 12, 70);

        // La pizza entera (tenue) y la porción.
        const R = pxR(round, cut.r), a = cut.deg * Math.PI / 180;
        p.noStroke(); p.fill(CRUST + '55'); p.circle(cx, cy, 2 * R);
        p.fill(CHEESE + '40'); p.circle(cx, cy, 2 * R - 14);
        p.fill(CHEESE); p.stroke(locked ? (good ? C.ok : C.bad) : CRUST); p.strokeWeight(3);
        p.arc(cx, cy, 2 * R, 2 * R, -a, 0, p.PIE);
        p.noStroke(); p.fill(TOP);
        for (let k = 1; k <= Math.floor(cut.deg / 25); k++) { const t = -a * (k - 0.5) / Math.floor(cut.deg / 25 + 0.0001); p.circle(cx + R * 0.6 * Math.cos(t), cy + R * 0.6 * Math.sin(t), Math.max(5, R * 0.12)); }
        // El arco resaltado (la orilla) y el ángulo.
        p.noFill(); p.stroke(C.Z); p.strokeWeight(6); p.arc(cx, cy, 2 * R, 2 * R, -a, 0);
        p.stroke(C.brand); p.strokeWeight(3); p.arc(cx, cy, 44, 44, -a, 0);   // se ve sobre el queso en los dos temas
        // Asas: borde de la porción (ángulo) y orilla (radio, si se puede cambiar).
        if (round.deg == null) { p.noStroke(); p.fill(C.brand); p.circle(cx + R * Math.cos(-a), cy + R * Math.sin(-a), 20); }
        if (round.r == null) { p.noStroke(); p.fill(C.Q); p.circle(cx + R, cy, 18); }

        // Lecturas en vivo.
        const y0 = cy + Rmax + 24;
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(14);
        p.text(`θ = ${cut.deg}° = ${fmt(a)} rad   ·   r = ${cut.r}`, W / 2, y0);
        p.textSize(13);
        p.fill(round.goal === 'arc' ? (good ? C.ok : C.Z) : C.mute); p.text(`arco s = rθ = ${fmt(meas.arc)}`, W / 2, y0 + 22);
        p.fill(round.goal === 'area' ? (good ? C.ok : C.Z) : C.mute); p.text(`área A = ½ r² θ = ${fmt(meas.area)}`, W / 2, y0 + 42);
        if (locked && !good) { const ans = answer(round); p.fill(C.ok); p.text(`era θ = ${ans.deg}° con r = ${ans.r}`, W / 2, y0 + 62); }
        // Botones: ajustan el ángulo (de a 5°) o el radio (de a 1), según lo que se pueda mover.
        const what = round.deg == null ? 'ángulo' : 'radio';
        btns.forEach(b => {
          p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); p.textSize(18); p.text(b.t, b.x + b.w / 2, b.y + b.h / 2);
        });
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.text(`${what}`, W / 2, btns[0].y + 17);
      };

      const touch = () => { touched[cur] = true; ready(); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const round = params.rounds[cur], cut = st.cuts[cur];
        const b = btns.find(b => inside(b, p.mouseX, p.mouseY));
        if (b) {
          if (round.deg == null) cut.deg = Math.max(5, Math.min(355, cut.deg + 5 * b.d));
          else cut.r = Math.max(round.rMin ?? 1, Math.min(rr(round), cut.r + b.d));
          touch(); api.sfx?.tap?.(); return false;
        }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) <= Rmax + 24 && p.mouseY < cy + Rmax + 12) { drag = true; p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        const round = params.rounds[cur], cut = st.cuts[cur];
        if (round.deg == null) {
          let d = Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI; if (d < 0) d += 360;
          cut.deg = Math.max(5, Math.min(355, Math.round(d / 5) * 5));
        } else {
          cut.r = Math.max(round.rMin ?? 1, Math.min(rr(round), Math.round(Math.hypot(p.mouseX - cx, p.mouseY - cy) / Rmax * rr(round))));
        }
        touch(); return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.42);

    return {
      loaded: m.ready,
      getState: () => ({ cuts: st.cuts.map(c => ({ ...c })) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, measure };
})();
;
//#archivo js/games/arma-triangulo.js
// Arma el triángulo (trigonometría, razones): un triángulo rectángulo sobre una cuadrícula con el
// ángulo θ abajo a la izquierda; se arrastran la esquina del cateto adyacente y la punta del opuesto
// (números enteros) hasta que la razón pedida (sen, cos, tan, csc, sec o cot) valga lo que se pide.
// La hipotenusa y la razón se ven en vivo. Rondas con pestañas.
// params = { max, rounds: [{ fn, num, den }] }   state = { legs: [{ a, b }] }  (a: adyacente, b: opuesto)

GAMES['arma-triangulo'] = (() => {
  const NAMES = { sen: 'sen', cos: 'cos', tan: 'tan', csc: 'csc', sec: 'sec', cot: 'cot' };
  const FRAC = { sen: 'op/hip', cos: 'ady/hip', tan: 'op/ady', csc: 'hip/op', sec: 'hip/ady', cot: 'ady/op' };
  function ratio(fn, a, b) {
    const h = Math.hypot(a, b);
    return { sen: b / h, cos: a / h, tan: b / a, csc: h / b, sec: h / a, cot: a / b }[fn];
  }
  // Catetos enteros: la razón tiene que ser exacta (con 0.005 de tolerancia, 7 y 3 «daban» cos = 12/13).
  const hit = (leg, r) => !!leg && Math.abs(ratio(r.fn, leg.a, leg.b) - r.num / r.den) < 1e-9;
  const tex = fn => (fn === 'sen' ? '\\operatorname{sen}' : `\\${fn}`);
  // Catetos más pequeños (enteros, hasta max) que dan la razón pedida.
  function example(r, max) {
    for (let s = 2; s <= 2 * max; s++) for (let a = 1; a < s && a <= max; a++) { const b = s - a; if (b <= max && hit({ a, b }, r)) return { a, b }; }
    return null;
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => !!state.legs?.[i] && hit(state.legs[i], r));
    const solution = params.rounds.map(r => {
      const e = example(r, params.max);
      return `$${tex(r.fn)}\\theta = \\frac{${r.num}}{${r.den}}$${e ? ` (adyacente ${e.a}, opuesto ${e.b})` : ''}`;
    }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette, max = params.max;
    const st = { legs: params.rounds.map(() => ({ a: 3, b: 2 })) };
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], ox = 0, oy = 0, u = 0, drag = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      u = Math.min((w - 70) / max, (h - 190) / max);
      ox = 34; oy = 76 + u * max;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(touched.every(Boolean));
    const hypTxt = (a, b) => { const s = a * a + b * b, r = Math.round(Math.sqrt(s)); return r * r === s ? String(r) : `√${s}`; };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], { a, b } = st.legs[cur], good = hit(st.legs[cur], r);
        tabs.forEach((t, i) => {
          const ok = hit(st.legs[i], params.rounds[i]);
          const col = locked ? (ok ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12); p.textAlign(p.LEFT, p.CENTER); p.text('Meta:', 12, 54);
        p.fill(C.N); p.textStyle(p.BOLD); p.textSize(20); p.text(`${NAMES[r.fn]} θ = ${r.num}/${r.den}`, 54, 54);

        // Cuadrícula.
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = 0; k <= max; k++) { p.line(ox + k * u, oy, ox + k * u, oy - max * u); p.line(ox, oy - k * u, ox + max * u, oy - k * u); }
        // El triángulo: adyacente (abajo), opuesto (derecha) e hipotenusa.
        const A = [ox, oy], B = [ox + a * u, oy], T = [ox + a * u, oy - b * u];
        p.noStroke(); p.fill(C.Z + '22'); p.triangle(...A, ...B, ...T);
        const col = locked ? (good ? C.ok : C.bad) : null;
        p.strokeWeight(5);
        p.stroke(col || C.Z); p.line(...A, ...B);
        p.stroke(col || C.I); p.line(...B, ...T);
        p.stroke(col || C.N); p.line(...A, ...T);
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(B[0] - 10, B[1] - 10, 10, 10);
        p.stroke(C.N); p.strokeWeight(2.5); p.arc(ox, oy, 46, 46, -Math.atan2(b, a), 0);
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.LEFT, p.BOTTOM); p.text('θ', ox + 26, oy - 3);
        // Asas.
        p.fill(C.Z); p.circle(...B, 18); p.fill(C.I); p.circle(...T, 18);
        // Rótulos de los lados.
        p.textSize(12); p.textAlign(p.CENTER, p.TOP); p.fill(C.Z); p.text(`ady ${a}`, ox + a * u / 2, oy + 6);
        p.textAlign(p.LEFT, p.CENTER); p.fill(C.I); p.text(`op ${b}`, B[0] + 12, oy - b * u / 2);
        p.textAlign(p.RIGHT, p.BOTTOM); p.fill(C.N); p.text(`hip ${hypTxt(a, b)}`, ox + a * u / 2 - 6, oy - b * u / 2 - 6);
        // Lectura de la razón.
        const val = ratio(r.fn, a, b);
        p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(16); p.fill(good ? C.ok : C.ink);
        p.text(`${NAMES[r.fn]} θ = ${FRAC[r.fn]} = ${val.toFixed(3)}`, W / 2, oy + 34);
        p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(12);
        p.text(`meta: ${r.num}/${r.den} = ${(r.num / r.den).toFixed(3)}`, W / 2, oy + 54);
        if (locked && !good) { const e = example(r, max); if (e) { p.fill(C.ok); p.textStyle(p.BOLD); p.text(`por ejemplo: adyacente ${e.a} y opuesto ${e.b}`, W / 2, oy + 74); } }
        else { p.fill(C.mute); p.text('Arrastra la esquina azul y la punta coral', W / 2, oy + 74); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const { a, b } = st.legs[cur];
        const dB = Math.hypot(p.mouseX - (ox + a * u), p.mouseY - oy), dT = Math.hypot(p.mouseX - (ox + a * u), p.mouseY - (oy - b * u));
        if (Math.min(dB, dT) < 30) { drag = dT <= dB ? 'b' : 'a'; return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        const leg = st.legs[cur];
        if (drag === 'a') leg.a = Math.max(1, Math.min(max, Math.round((p.mouseX - ox) / u)));
        else leg.b = Math.max(1, Math.min(max, Math.round((oy - p.mouseY) / u)));
        touched[cur] = true; ready();
        return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = null; api.sfx?.tap?.(); return false; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ legs: st.legs.map(l => ({ ...l })) }),
      lock() { locked = true; drag = null; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, ratio };
})();
;
//#archivo js/games/canon-inverso.js
// El cañón inverso (trigonometría, funciones inversas): un cañón en el centro de la circunferencia
// unitaria solo puede girar dentro del RANGO de la inversa (media vuelta derecha para sen⁻¹ y tan⁻¹,
// media vuelta de arriba para cos⁻¹; la zona fuera del rango se ve rayada). El cañón gira la vuelta
// completa: hay dos globos con el mismo seno (o coseno, o tangente) y solo el del rango es el valor
// principal. Nada revienta hasta comprobar. En rondas de precisión (snap < 15) o sin guía no hay globos.
// Se apunta arrastrando o con − / +. Rondas con pestañas.
// params = { rounds: [{ fn: 'asin' | 'acos' | 'atan', x, label, snap?: grados (15), guide?: true }] }
// state = { aims: [grados | null] }

GAMES['canon-inverso'] = (() => {
  const RANGE = { asin: [-90, 90], acos: [0, 180], atan: [-90, 90] };
  const D = 180 / Math.PI;
  const NAME = { asin: 'sen⁻¹', acos: 'cos⁻¹', atan: 'tan⁻¹' };
  const FN = { asin: 'sen', acos: 'cos', atan: 'tan' };
  function principal(fn, x) { return (fn === 'asin' ? Math.asin(x) : fn === 'acos' ? Math.acos(x) : Math.atan(x)) * D; }
  // Los dos globos: el principal y su «gemelo» con el mismo valor fuera del rango.
  function balloons(fn, x) {
    const t = principal(fn, x);
    return [t, fn === 'asin' ? 180 - t : fn === 'acos' ? -t : t + 180];
  }
  const hits = (aim, r) => aim != null && Math.abs(aim - principal(r.fn, r.x)) <= (r.snap || 15) / 2 + 1e-6;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => hits(state.aims[i], r));
    const solution = params.rounds.map(r => `${NAME[r.fn]}(${r.label ?? +r.x.toFixed(3)}) = ${+principal(r.fn, r.x).toFixed(1)}°`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { aims: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, drag = false, shown = 0, minus = null, plus = null, pop = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.36, h * 0.27); cx = w / 2; cy = 96 + R + 8;
      minus = { x: 14, y: h - 52, w: 48, h: 40 }; plus = { x: w - 62, y: h - 52, w: 48, h: 40 };
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const pt = (deg, r = R) => [cx + r * Math.cos(deg / D), cy - r * Math.sin(deg / D)];
    const clampAim = (r, d) => { const s = r.snap || 15; let v = ((Math.round(d / s) * s) % 360 + 360) % 360; if (v > 180) v -= 360; return v; };
    const setAim = d => { const r = params.rounds[cur]; st.aims[cur] = clampAim(r, d); api.ready(st.aims.every(a => a !== null)); };
    const fmt = v => (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2).replace('-', '−'));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], aim = st.aims[cur], [lo, hi] = RANGE[r.fn];
        const goal = aim ?? (lo + hi) / 2; shown += (((goal - shown) % 360 + 540) % 360 - 180) * 0.25;
        if (locked) pop = Math.max(0, pop - 0.03);
        tabs.forEach((t, i) => {
          const a = st.aims[i], col = locked ? (hits(a, params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : a !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        let ts = 19; p.textStyle(p.BOLD); p.textSize(ts);
        const ask = `θ = ${NAME[r.fn]}(${r.label ?? r.x})`;
        while (p.textWidth(ask) > W - 24 && ts > 12) p.textSize(--ts);
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.CENTER); p.text(ask, W / 2, 62);

        // Zona prohibida rayada y zona del rango sombreada.
        p.noStroke(); p.fill(C.brand + '22'); p.arc(cx, cy, 2 * R + 30, 2 * R + 30, -hi / D, -lo / D, p.PIE);
        p.stroke(C.line); p.strokeWeight(1);
        for (let d = lo + 3; d < lo + 360; d += 6) if (d > hi) { const [x0, y0] = pt(d, R * 0.25), [x1, y1] = pt(d, R * 0.95); p.line(x0, y0, x1, y1); }
        // Ejes y circunferencia.
        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - R - 18, cy, cx + R + 18, cy); p.line(cx, cy - R - 18, cx, cy + R + 18);
        p.noFill(); p.stroke(C.ink + '88'); p.strokeWeight(2.5); p.circle(cx, cy, 2 * R);
        // Recta guía: altura x (seno), abscisa x (coseno) o pendiente x (tangente).
        if (r.guide !== false) {
          p.stroke(C.N + 'aa'); p.strokeWeight(2); p.drawingContext.setLineDash([6, 6]);
          if (r.fn === 'asin') p.line(cx - R - 18, cy - r.x * R, cx + R + 18, cy - r.x * R);
          else if (r.fn === 'acos') p.line(cx + r.x * R, cy - R - 18, cx + r.x * R, cy + R + 18);
          else { const t = principal('atan', r.x); const [x0, y0] = pt(t, R + 18), [x1, y1] = pt(t + 180, R + 18); p.line(x0, y0, x1, y1); }
          p.drawingContext.setLineDash([]);
        }
        // Globos: el del rango y su gemelo.
        const showB = r.guide !== false && (r.snap || 15) >= 15;
        balloons(r.fn, r.x).forEach((b, k) => {
          if (!showB && !(locked && k === 0)) return;
          const [bx, by] = pt(b), burst = locked && k === 0 && hits(aim, r);
          if (burst) {
            p.noFill(); p.stroke(C.ok); p.strokeWeight(2);
            for (let j = 0; j < 8; j++) { const a = j * Math.PI / 4, s = 12 + 14 * (1 - pop); p.line(bx + Math.cos(a) * s * 0.6, by + Math.sin(a) * s * 0.6, bx + Math.cos(a) * s, by + Math.sin(a) * s); }
            return;
          }
          const col = locked && k === 0 ? C.ok : C.I;
          p.stroke(C.mute); p.strokeWeight(1); p.line(bx, by + 11, bx, by + 22);
          p.noStroke(); p.fill(col); p.ellipse(bx, by, 20, 24);
          p.fill(C.bg + '88'); p.ellipse(bx - 4, by - 5, 5, 7);
        });
        // El cañón.
        const ang = -shown / D;
        p.push(); p.translate(cx, cy); p.rotate(ang);
        if (aim !== null) { p.stroke(C.N); p.strokeWeight(2); p.drawingContext.setLineDash([2, 5]); p.line(26, 0, R, 0); p.drawingContext.setLineDash([]); }
        p.noStroke(); p.fill(locked ? (hits(aim, r) ? C.ok : C.bad) : C.brand); p.rect(0, -8, 34, 16, 4);
        p.pop();
        p.noStroke(); p.fill(C.card); p.stroke(C.brand); p.strokeWeight(2); p.circle(cx, cy, 28);
        p.noFill(); p.stroke(C.N); p.strokeWeight(2.5); if (Math.abs(shown) > 0.5) p.arc(cx, cy, 64, 64, Math.min(0, -shown / D), Math.max(0, -shown / D));

        // Lecturas y botones.
        const y0 = cy + R + 34;
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(17); p.fill(aim === null ? C.mute : C.ink);
        if (aim === null) p.text('arrastra para apuntar el cañón', W / 2, y0);
        else { const t = aim / D, v = r.fn === 'asin' ? Math.sin(t) : r.fn === 'acos' ? Math.cos(t) : Math.tan(t); p.text(`θ = ${String(aim).replace('-', '−')}°   ·   ${FN[r.fn]} θ = ${Math.abs(v) > 1e6 ? 'no existe' : fmt(v)}`, W / 2, y0); }
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(`el rango de ${NAME[r.fn]} va de ${String(lo).replace('-', '−')}° a ${hi}°`, W / 2, y0 + 22);
        if (locked && !hits(aim, r)) { p.fill(C.ok); p.textStyle(p.BOLD); p.text(`era ${+principal(r.fn, r.x).toFixed(1)}°`, W / 2, y0 + 42); }
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(22); p.textStyle(p.BOLD); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; shown = st.aims[t] ?? 0; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const r = params.rounds[cur], s = r.snap || 15;
        if (inside(minus, p.mouseX, p.mouseY)) { setAim((st.aims[cur] ?? 0) - s); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { setAim((st.aims[cur] ?? 0) + s); api.sfx?.tap?.(); return false; }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) < R + 40) { drag = true; p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        let d = Math.atan2(cy - p.mouseY, p.mouseX - cx) * D;
        setAim(d); return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.45);

    return {
      loaded: m.ready,
      getState: () => ({ aims: [...st.aims] }),
      lock() { locked = true; drag = false; pop = 1; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, principal, balloons, RANGE };
})();
;
//#archivo js/games/tanque-pitagorico.js
// El tanque pitagórico (trigonometría, identidades fundamentales): un tanque transparente muestra una
// identidad como líquidos apilados. Con sen²θ + cos²θ = 1, el rosa (el cuadrado del dato) ya está y hay
// que ajustar la otra razón para que el cian llene justo hasta la marca 1. Con 1 + tan²θ = sec²θ, la
// capa gris es el 1 y la marca de arriba es sec²θ. Si te pasas, el tanque se rebosa. La perilla da el
// valor (de 0.01 en 0.01, con − / + y arrastre) y el botón ± el signo, que decide el cuadrante.
// params = { rounds: [{ id: 'sc' | 'ts', given, value, ask, q }] }   state = { vals: [número | null] }

GAMES['tanque-pitagorico'] = (() => {
  const MAX = { sc: 1, ts: 3 };
  const POS = { sen: [1, 2], cos: [1, 4], tan: [1, 3], sec: [1, 4] };
  const sq = v => v * v;
  function target(r) {
    const v = r.value;
    const mag = r.id === 'sc' ? Math.sqrt(Math.max(0, 1 - sq(v))) : r.ask === 'sec' ? Math.sqrt(1 + sq(v)) : Math.sqrt(Math.max(0, sq(v) - 1));
    const sign = POS[r.ask].includes(r.q) ? 1 : -1;
    return Math.round(sign * mag * 1e9) / 1e9;
  }
  const good = (v, r) => v != null && Math.abs(v - target(r)) < 0.005;
  const f2 = v => (+v.toFixed(2)).toString().replace('-', '−');

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => good(state.vals[i], r));
    const solution = params.rounds.map(r => `${r.ask} θ = ${f2(target(r))}`).join(' · ');
    return { ok, solution };
  }

  // Capas del tanque y nivel de la marca para un valor elegido v.
  function layers(r, v) {
    const w = v ?? 0, cap = Math.max(1 + sq(r.value), sq(target(r)), sq(r.value)) * 1.4;
    if (r.id === 'sc') return { stack: [[r.given, sq(r.value)], [r.ask, sq(w)]], mark: 1, cap: 1.25 };
    if (r.ask === 'sec') return { stack: [['1', 1], ['tan', sq(r.value)]], mark: sq(w), cap };
    return { stack: [['1', 1], ['tan', sq(w)]], mark: sq(r.value), cap };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { vals: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], tank = null, dial = null, minus = null, plus = null, sign = null, drag = false, slosh = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      tank = { x: 30, y: 112, w: Math.min(150, w - 214), h: h - 250 };
      dial = { x: w - 64, y: tank.y, w: 30, h: tank.h };
      const by = h - 112, bx = Math.min(tank.x + tank.w + 14, w - 166);
      minus = { x: bx, y: by, w: 46, h: 40 }; plus = { x: bx + 54, y: by, w: 46, h: 40 };
      sign = { x: bx, y: by - 52, w: 100, h: 40 };
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const mag = () => Math.abs(st.vals[cur] ?? 0);
    const neg = () => (st.vals[cur] ?? 0) < 0 || Object.is(st.vals[cur], -0);
    const setVal = (m, negative) => {
      const r = params.rounds[cur], mm = Math.round(Math.min(MAX[r.id], Math.max(0, m)) * 100) / 100;
      st.vals[cur] = negative ? -mm : mm; slosh = 1;
      api.ready(st.vals.every(v => v !== null));
    };
    const COL = name => ({ sen: C.I, cos: C.Z, tan: C.Q, sec: C.R, 1: C.line })[name];

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], v = st.vals[cur], L = layers(r, v);
        slosh = Math.max(0, slosh - 0.04);
        tabs.forEach((t, i) => {
          const col = locked ? (good(st.vals[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.vals[i] !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        const quad = ['', 'I', 'II', 'III', 'IV'][r.q];
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        let ts = 17; p.textSize(ts);
        const ask = `${r.given} θ = ${f2(r.value)}  ·  θ en el cuadrante ${quad}  ·  ¿${r.ask} θ?`;
        while (p.textWidth(ask) > W - 20 && ts > 11) p.textSize(--ts);
        p.fill(C.N); p.text(ask, W / 2, 54);
        p.textSize(14); p.fill(C.mute); p.text(r.id === 'sc' ? 'sen²θ + cos²θ = 1' : '1 + tan²θ = sec²θ', W / 2, 82);

        // El tanque: capas apiladas y la marca.
        const Y = val => tank.y + tank.h - (Math.min(val, L.cap) / L.cap) * tank.h;
        let base = 0, total = 0;
        L.stack.forEach(([name, amt]) => {
          const top = Math.min(base + amt, L.cap);
          const wob = slosh * 4 * Math.sin(p.frameCount * 0.3);
          p.noStroke(); p.fill(COL(name) + (name === '1' ? 'cc' : 'bb'));
          p.rect(tank.x, Y(top) + (top === base + amt ? wob : 0), tank.w, Y(base) - Y(top));
          if (Y(base) - Y(top) > 16) { p.fill(name === '1' ? C.ink : C.bg); p.textSize(12); p.textStyle(p.BOLD); p.text(name === '1' ? '1' : `${name}²θ = ${f2(amt)}`, tank.x + tank.w / 2, (Y(base) + Y(top)) / 2); }
          base += amt; total = base;
        });
        const over = v !== null && total - L.mark > 0.0001, full = v !== null && Math.abs(total - L.mark) < 0.0001;
        // Marca (en sc es fija en 1; en ts puede ser lo que el jugador elige).
        p.stroke(full ? C.ok : C.N); p.strokeWeight(3); p.line(tank.x - 12, Y(L.mark), tank.x + tank.w + 12, Y(L.mark));
        p.noStroke(); p.fill(full ? C.ok : C.N); p.textSize(12); p.textAlign(p.LEFT, p.CENTER);
        p.text(r.id === 'sc' ? '1' : `sec²θ = ${f2(L.mark)}`, tank.x + tank.w + 14, Y(L.mark) - 10);
        if (over) {   // rebosa: gotas que caen por el borde
          p.fill(C.bad);
          for (let k = 0; k < 4; k++) { const yy = (p.frameCount * 3 + k * 28) % (tank.h * 0.6); p.circle(tank.x + tank.w + 4, Y(L.mark) + yy, 6); }
        }
        p.noFill(); p.stroke(C.ink + '99'); p.strokeWeight(3); p.line(tank.x, tank.y - 10, tank.x, tank.y + tank.h); p.line(tank.x, tank.y + tank.h, tank.x + tank.w, tank.y + tank.h); p.line(tank.x + tank.w, tank.y + tank.h, tank.x + tank.w, tank.y - 10);
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textSize(13); p.fill(over ? C.bad : full ? C.ok : C.mute);
        p.text(over ? '¡se rebosa!' : full ? '¡lleno justo!' : 'falta llenar', tank.x + tank.w / 2, tank.y + tank.h + 18);

        // Perilla vertical del valor (magnitud).
        const mx = MAX[r.id], dy = dial.y + dial.h - (mag() / mx) * dial.h;
        p.stroke(C.line); p.strokeWeight(6); p.line(dial.x + dial.w / 2, dial.y, dial.x + dial.w / 2, dial.y + dial.h);
        p.noStroke(); p.fill(COL(r.ask)); p.circle(dial.x + dial.w / 2, dy, 26);
        p.fill(C.mute); p.textSize(11); p.text(String(mx), dial.x + dial.w / 2, dial.y - 12); p.text('0', dial.x + dial.w / 2, dial.y + dial.h + 12);

        // Valor elegido, signo y botones.
        const vx = (tank.x + tank.w + dial.x - 16) / 2;
        p.textStyle(p.BOLD); p.fill(v === null ? C.mute : COL(r.ask));
        p.textSize(15); p.text(`${r.ask} θ =`, vx, sign.y - 72);
        p.textSize(24); p.text(v === null ? '?' : `${neg() ? '−' : ''}${mag().toFixed(2)}`, vx, sign.y - 46);
        if (locked && !good(v, r)) { p.fill(C.ok); p.textSize(13); p.text(`era ${f2(target(r))}`, vx, sign.y - 18); }
        [[sign, neg() ? 'signo −' : 'signo +'], [minus, '−'], [plus, '+']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(b === sign ? 15 : 22); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(minus, p.mouseX, p.mouseY)) { setVal(mag() - 0.01, neg()); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { setVal(mag() + 0.01, neg()); api.sfx?.tap?.(); return false; }
        if (inside(sign, p.mouseX, p.mouseY)) { setVal(mag(), !neg()); api.sfx?.tap?.(); return false; }
        if (inside({ x: dial.x - 16, y: dial.y - 14, w: dial.w + 32, h: dial.h + 28 }, p.mouseX, p.mouseY)) { drag = true; p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        const mx = MAX[params.rounds[cur].id];
        setVal((dial.y + dial.h - p.mouseY) / dial.h * mx, neg()); return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.35);

    return {
      loaded: m.ready,
      getState: () => ({ vals: [...st.vals] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target, layers, MAX };
})();
;
//#archivo js/games/detector-identidades.js
// El detector de identidades (trigonometría, simplificar y demostrar): en la pantalla están las gráficas
// de los dos lados de una igualdad (izquierdo rosa grueso, derecho azul punteado encima). Si es una
// identidad, coinciden en todo x; si no, en algún lugar se separan. Se arrastra la lupa por el eje x y
// se lee el valor de cada lado; luego se elige «Contraejemplo aquí» (guarda ese x) o «Es identidad».
// Rondas con pestañas. Las funciones vienen en los parámetros.
// params = { rounds: [{ lhs, rhs, f, g, identity }] }   state = { answers: [{ x } | 'id' | null] }

GAMES['detector-identidades'] = (() => {
  const val = (h, x) => { const v = h(x); return Number.isFinite(v) && Math.abs(v) < 1e3 ? v : NaN; };
  function differs(r, x) {
    const a = val(r.f, x), b = val(r.g, x);
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) > 0.05;
  }
  const okOne = (a, r) => (r.identity ? a === 'id' : !!a && a !== 'id' && differs(r, a.x));
  const piTxt = x => {
    const k = Math.round(x / (Math.PI / 12));
    if (Math.abs(k * Math.PI / 12 - x) > 1e-6) return x.toFixed(2);
    if (k === 0) return '0';
    const g = (a, b) => (b ? g(b, a % b) : a), d = g(Math.abs(k), 12), n = Math.abs(k) / d, den = 12 / d;
    return (k < 0 ? '−' : '') + (n === 1 ? '' : n) + 'π' + (den === 1 ? '' : '/' + den);
  };

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.answers[i], r));
    const solution = params.rounds.map(r => {
      if (r.identity) return `«${r.lhs} = ${r.rhs}» es identidad`;
      const xs = Array.from({ length: 25 }, (_, k) => -Math.PI + k * Math.PI / 12).filter(x => differs(r, x));
      const x = xs.find(x => Math.abs(x - Math.PI / 2) < 1e-9) ?? xs[0];
      return `«${r.lhs} = ${r.rhs}» falla, por ejemplo en x = ${piTxt(x)}`;
    }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { answers: params.rounds.map(() => null) };
    const probe = params.rounds.map(() => Math.PI / 4);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], scr = null, bId = null, bCx = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      scr = { x: 12, y: 104, w: w - 24, h: h * 0.4 };
      const by = h - 52, bw = (w - 36) / 2;
      bCx = { x: 12, y: by, w: bw, h: 42 }; bId = { x: 24 + bw, y: by, w: bw, h: 42 };
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const X = x => scr.x + ((x + Math.PI) / (2 * Math.PI)) * scr.w;
    const Xinv = px => -Math.PI + ((px - scr.x) / scr.w) * 2 * Math.PI;
    const Y = y => scr.y + scr.h / 2 - y * scr.h / 6;      // de −3 a 3
    const ready = () => api.ready(st.answers.every(a => a !== null));
    const f2 = v => (Number.isFinite(v) ? (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2).replace('-', '−')) : 'no existe');

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function plot(h, col, weight, dash) {
        p.noFill(); p.stroke(col); p.strokeWeight(weight); if (dash) p.drawingContext.setLineDash(dash);
        let open = false, prev = null;
        for (let px = 0; px <= scr.w; px += 2) {
          const x = Xinv(scr.x + px), v = val(h, x);
          const inRange = Number.isFinite(v) && Math.abs(v) <= 3.2;
          if (!inRange || (prev !== null && Math.abs(v - prev) > 2.5)) { if (open) p.endShape(); open = false; prev = inRange ? v : null; if (!inRange) continue; }
          if (!open) { p.beginShape(); open = true; }
          p.vertex(scr.x + px, Y(v)); prev = v;
        }
        if (open) p.endShape();
        p.drawingContext.setLineDash([]);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], a = st.answers[cur], x = probe[cur];
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.answers[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.answers[i] !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        let ts = 18; p.textSize(ts); const claim = `¿${r.lhs} = ${r.rhs}?`;
        while (p.textWidth(claim) > W - 20 && ts > 11) p.textSize(--ts);
        p.fill(C.ink); p.text(claim, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL);
        p.fill(C.I); p.text(`━ ${r.lhs}`, W / 4, 84); p.fill(C.Z); p.text(`┅ ${r.rhs}`, 3 * W / 4, 84);

        // Pantalla: cuadrícula, ejes y las dos gráficas.
        p.noStroke(); p.fill(C.card); p.rect(scr.x, scr.y, scr.w, scr.h, 10);
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = -2; k <= 2; k++) { const px = X(k * Math.PI / 2); p.line(px, scr.y + 4, px, scr.y + scr.h - 4); }
        p.strokeWeight(1.5); p.line(scr.x, Y(0), scr.x + scr.w, Y(0));
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textAlign(p.CENTER, p.TOP);
        ['−π', '−π/2', '0', 'π/2', 'π'].forEach((s, k) => p.text(s, X((k - 2) * Math.PI / 2), Y(0) + 4));
        plot(r.f, C.I, 6);
        plot(r.g, C.Z, 2.5, [7, 6]);

        // Lupa.
        const lx = X(x), fx = val(r.f, x), gx = val(r.g, x), diff = differs(r, x);
        p.stroke(C.N); p.strokeWeight(1.5); p.line(lx, scr.y, lx, scr.y + scr.h);
        [[fx, C.I], [gx, C.Z]].forEach(([v, col]) => { if (Number.isFinite(v) && Math.abs(v) <= 3) { p.noStroke(); p.fill(col); p.circle(lx, Y(v), 10); } });
        p.noFill(); p.stroke(C.N); p.strokeWeight(3); p.circle(lx, scr.y + scr.h + 22, 26); p.line(lx + 9, scr.y + scr.h + 31, lx + 16, scr.y + scr.h + 38);
        const y0 = scr.y + scr.h + 62;
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(15); p.fill(C.ink);
        p.text(`x = ${piTxt(x)}`, W / 2, y0);
        p.textSize(14); p.fill(C.I); p.text(`izq. = ${f2(fx)}`, W / 2 - 74, y0 + 24); p.fill(C.Z); p.text(`der. = ${f2(gx)}`, W / 2 + 74, y0 + 24);
        p.textSize(13);
        if (locked && !okOne(a, r)) { p.fill(C.ok); p.text(r.identity ? 'era una identidad' : 'tenía contraejemplo', W / 2, y0 + 48); }
        else { p.fill(diff ? C.N : C.mute); p.text(diff ? '¡aquí se separan!' : 'aquí coinciden', W / 2, y0 + 48); }

        // Veredicto.
        [[bCx, a && a !== 'id' ? `marcado x = ${piTxt(a.x)}` : 'Contraejemplo aquí', a && a !== 'id'], [bId, 'Es identidad', a === 'id']].forEach(([b, s, on]) => {
          p.stroke(on ? C.brand : C.line); p.strokeWeight(on ? 3 : 1.5); p.fill(on ? C.brand + '33' : C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); let fs = 14; p.textSize(fs); while (p.textWidth(s) > b.w - 10 && fs > 9) p.textSize(--fs); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      const setProbe = () => { const k = Math.round(Xinv(Math.min(scr.x + scr.w, Math.max(scr.x, p.mouseX))) / (Math.PI / 12)); probe[cur] = k * Math.PI / 12; };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(bCx, p.mouseX, p.mouseY)) { st.answers[cur] = { x: probe[cur] }; ready(); api.sfx?.tap?.(); return false; }
        if (inside(bId, p.mouseX, p.mouseY)) { st.answers[cur] = 'id'; ready(); api.sfx?.tap?.(); return false; }
        if (p.mouseY > scr.y && p.mouseY < scr.y + scr.h + 44 && p.mouseX > scr.x - 10 && p.mouseX < scr.x + scr.w + 10) { drag = true; setProbe(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; setProbe(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; return false; };
    }, 1.55);

    return {
      loaded: m.ready,
      getState: () => ({ answers: st.answers.map(a => (a && a !== 'id' ? { x: a.x } : a)) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, differs };
})();
;
//#archivo js/games/encadena-angulos.js
// Ángulos encadenados (trigonometría, suma y resta de ángulos): para sacar el valor exacto de un ángulo
// «raro» (75°, 15°, 165°…) se arma con dos notables. En la circunferencia unitaria hay dos brazos: el
// primero (amarillo) gira hasta un ángulo α; el segundo (rosa) sale desde α y suma o resta β según hacia
// dónde se arrastre. Si los dos son notables y la punta cae en el ángulo pedido, se enciende y aparece
// la fórmula de suma con los valores. Paso de 15°. Rondas con pestañas.
// params = { rounds: [{ target }] }   state = { chains: [{ a, b, op } | null] }

GAMES['encadena-angulos'] = (() => {
  const norm = d => ((d % 360) + 360) % 360;
  const isNotable = d => d > 0 && d < 360 && (d % 30 === 0 || d % 45 === 0);
  const lands = c => norm(c.a + (c.op === '-' ? -c.b : c.b));
  const okOne = (c, r) => !!c && isNotable(c.a) && isNotable(c.b) && lands(c) === norm(r.target);
  const NOT = Array.from({ length: 23 }, (_, k) => (k + 1) * 15).filter(isNotable);
  function example(t) {
    for (const op of ['+', '-']) for (const a of NOT) for (const b of NOT) if (b <= 90 && lands({ a, b, op }) === norm(t)) return `${t}° = ${a}° ${op === '+' ? '+' : '−'} ${b}°`;
    return `${t}°`;
  }

  function grade(state, params) {
    return { ok: params.rounds.every((r, i) => okOne(state.chains[i], r)), solution: params.rounds.map(r => example(r.target)).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { chains: params.rounds.map(() => null) };
    const arms = params.rounds.map(() => ({ a: 0, t: 0, touched: false }));     // t = ángulo de la punta del segundo brazo
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, grab = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.36, h * 0.27); cx = w / 2; cy = 92 + R + 6;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const pt = (deg, r = R) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
    function sync() {
      const A = arms[cur], d = ((A.t - A.a) % 360 + 540) % 360 - 180;      // de −180 a 180
      st.chains[cur] = A.touched ? { a: norm(A.a), b: Math.abs(d), op: d < 0 ? '-' : '+' } : null;
      api.ready(st.chains.every(Boolean));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], A = arms[cur], c = st.chains[cur], good = okOne(c, r);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.chains[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.chains[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const ask = `Arma ${r.target}° con dos ángulos notables`;
        let ts = 18; p.textSize(ts); while (p.textWidth(ask) > W - 20 && ts > 11) p.textSize(--ts);
        p.text(ask, W / 2, 58);

        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - R - 16, cy, cx + R + 16, cy); p.line(cx, cy - R - 16, cx, cy + R + 16);
        p.noFill(); p.stroke(C.ink + '77'); p.strokeWeight(2.5); p.circle(cx, cy, 2 * R);
        // Marcas notables en el borde.
        NOT.forEach(d => { const [x0, y0] = pt(d, R - 5), [x1, y1] = pt(d, R + 5); p.stroke(C.mute); p.strokeWeight(1.5); p.line(x0, y0, x1, y1); });
        // Meta punteada.
        const [tx, ty] = pt(r.target, R + 14);
        p.stroke(good ? C.ok : C.mute); p.strokeWeight(2); p.drawingContext.setLineDash([5, 6]); p.line(cx, cy, tx, ty); p.drawingContext.setLineDash([]);
        p.noStroke(); p.fill(good ? C.ok : C.mute); p.textSize(12); p.text(`${r.target}°`, ...pt(r.target, R + 30));

        // Arcos de α (desde 0) y de β (desde α).
        const d = ((A.t - A.a) % 360 + 540) % 360 - 180, aa = norm(A.a);
        p.noFill(); p.stroke(C.N); p.strokeWeight(4);
        if (aa > 0) p.arc(cx, cy, R * 0.5, R * 0.5, -aa * Math.PI / 180, 0);
        p.stroke(C.I); p.strokeWeight(4);
        if (Math.abs(d) > 0) { const s = Math.min(A.a, A.a + d), e = Math.max(A.a, A.a + d); p.arc(cx, cy, R * 0.82, R * 0.82, -e * Math.PI / 180, -s * Math.PI / 180); }
        // Brazos.
        const [ax, ay] = pt(A.a), [bx, by] = pt(A.t);
        p.stroke(C.N); p.strokeWeight(5); p.line(cx, cy, ax, ay);
        p.stroke(C.I); p.strokeWeight(4); p.line(ax, ay, bx, by); p.line(cx, cy, bx, by);
        p.noStroke(); p.fill(C.N); p.circle(ax, ay, 22); p.fill(locked ? (good ? C.ok : C.bad) : good ? C.ok : C.I); p.circle(bx, by, 22);
        p.fill(C.bg); p.textSize(11); p.text('α', ax, ay); p.text('β', bx, by);

        // Lecturas.
        const y0 = cy + R + 34;
        p.textStyle(p.BOLD); p.textSize(16);
        if (!c) { p.fill(C.mute); p.text('arrastra el punto α y luego el punto β', W / 2, y0); }
        else {
          const tick = v => (isNotable(v) ? ' ✓' : ' ✗');
          p.fill(C.N); p.text(`α = ${c.a}°${tick(c.a)}`, W / 2 - 76, y0);
          p.fill(C.I); p.text(`β = ${c.b}°${tick(c.b)}`, W / 2 + 76, y0);
          p.fill(good ? C.ok : C.ink); p.textSize(15);
          p.text(`${c.a}° ${c.op === '+' ? '+' : '−'} ${c.b}° = ${lands(c)}°`, W / 2, y0 + 26);
          if (good) {
            p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.ink);
            const s = c.op === '+' ? ['+', '−'] : ['−', '+'];
            const l1 = `sen(α ${s[0]} β) = sen α cos β ${s[0]} cos α sen β`, l2 = `cos(α ${s[0]} β) = cos α cos β ${s[1]} sen α sen β`;
            let fs = 12; while (p.textWidth(l1) > W - 16 && fs > 9) p.textSize(--fs);
            p.text(l1, W / 2, y0 + 50); p.text(l2, W / 2, y0 + 68);
          }
        }
        if (locked && !good) { p.fill(C.ok); p.textSize(13); p.textStyle(p.BOLD); p.text(example(r.target), W / 2, y0 + 92); }
      };

      const angAt = () => { let d = Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI; return Math.round(d / 15) * 15; };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const A = arms[cur], [ax, ay] = pt(A.a), [bx, by] = pt(A.t);
        const da = Math.hypot(p.mouseX - ax, p.mouseY - ay), db = Math.hypot(p.mouseX - bx, p.mouseY - by);
        if (Math.min(da, db) < 34) { grab = db <= da && A.touched ? 'b' : da < 34 ? 'a' : 'b'; return false; }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) < R + 30) { grab = A.touched ? 'b' : 'a'; p.mouseDragged(); return false; }
      };
      p.mouseDragged = () => {
        if (!grab) return;
        const A = arms[cur], d = angAt();
        if (grab === 'a') { const keep = ((A.t - A.a) % 360 + 540) % 360 - 180; A.a = norm(d); A.t = A.a + (A.touched ? keep : 0); }
        else A.t = A.a + ((d - A.a) % 360 + 540) % 360 - 180;
        A.touched = true; sync(); return false;
      };
      p.mouseReleased = () => { if (!grab) return; grab = null; api.sfx?.tap?.(); return false; };
    }, 1.5);

    return {
      loaded: m.ready,
      getState: () => ({ chains: st.chains.map(c => (c ? { ...c } : null)) }),
      lock() { locked = true; grab = null; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, isNotable, lands };
})();
;
//#archivo js/games/corredores-dobles.js
// Corredores dobles (trigonometría, ángulo doble y medio): en una pista circular corren dos atletas que
// salen juntos de 0°. El lento (azul) recorre θ y el rápido (rosa) va siempre al doble, 2θ. Mientras se
// mantiene presionado «Correr» avanzan; al soltar, el lento se detiene en el múltiplo de 15° más cercano
// (− / + ajustan). Hay que frenar cuando se cumpla la condición de la ronda, sobre θ, sobre 2θ o sobre
// cos 2θ y sen 2θ. Al ir hacia atrás desde 2θ aparece el ángulo medio: dos lentos posibles por cada
// rápido. Rondas con pestañas.
// params = { rounds: [{ prompt, fast?, q?, cos2?, sen2?, slowSen?: '+' | '-', slowCos? }] }
// state = { angles: [grados | null] }

GAMES['corredores-dobles'] = (() => {
  const norm = d => ((Math.round(d) % 360) + 360) % 360;
  const quad = d => { const t = norm(d); return t % 90 === 0 ? 0 : Math.floor(t / 90) + 1; };
  const sgn = v => (Math.abs(v) < 1e-9 ? 0 : Math.sign(v));
  function fits(deg, r) {
    const t = norm(deg), rad = t * Math.PI / 180;
    if (r.q != null && quad(t) !== r.q) return false;
    if (r.fast != null && norm(2 * t) !== norm(r.fast)) return false;
    if (r.cos2 != null && Math.abs(Math.cos(2 * rad) - r.cos2) > 1e-6) return false;
    if (r.sen2 != null && Math.abs(Math.sin(2 * rad) - r.sen2) > 1e-6) return false;
    if (r.slowSen && sgn(Math.sin(rad)) !== (r.slowSen === '+' ? 1 : -1)) return false;
    if (r.slowCos && sgn(Math.cos(rad)) !== (r.slowCos === '+' ? 1 : -1)) return false;
    return true;
  }
  const valid = r => Array.from({ length: 24 }, (_, k) => k * 15).filter(a => fits(a, r));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => state.angles[i] != null && fits(state.angles[i], r));
    return { ok, solution: params.rounds.map(r => `${r.prompt}: θ = ${valid(r).map(a => `${a}°`).join(' o ')}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { angles: params.rounds.map(() => null) };
    const pos = params.rounds.map(() => 0);          // ángulo continuo mientras corren
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, run = null, minus = null, plus = null, running = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.34, h * 0.24); cx = w / 2; cy = 104 + R + 8;
      const by = h - 54;
      minus = { x: 12, y: by, w: 52, h: 42 }; plus = { x: w - 64, y: by, w: 52, h: 42 }; run = { x: 74, y: by, w: w - 148, h: 42 };
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const pt = (deg, r = R) => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
    const settle = () => { pos[cur] = Math.round(pos[cur] / 15) * 15; st.angles[cur] = norm(pos[cur]); api.ready(st.angles.every(a => a !== null)); };
    const f2 = v => (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2).replace('-', '−'));

    function runner(p, deg, col, r, label) {
      const [x, y] = pt(deg, r), bob = running ? Math.sin(p.frameCount * 0.6) * 2 : 0;
      p.noStroke(); p.fill(col); p.circle(x, y - 9 + bob, 12);
      p.stroke(col); p.strokeWeight(4); p.line(x, y - 3 + bob, x, y + 8);
      p.strokeWeight(3); const leg = running ? Math.sin(p.frameCount * 0.6) * 5 : 3; p.line(x, y + 8, x - leg, y + 15); p.line(x, y + 8, x + leg, y + 15);
      p.noStroke(); p.fill(col); p.textSize(11); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
      const [lx, ly] = pt(deg, r + (r < R ? -22 : 24)); p.text(label, lx, ly);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        if (running && !locked) { pos[cur] += 75 * (p.deltaTime / 1000); if (pos[cur] >= 360) pos[cur] -= 360; }
        p.background(C.bg);
        const r = params.rounds[cur], a = st.angles[cur], th = pos[cur], good = a !== null && fits(a, r);
        tabs.forEach((t, i) => {
          const v = st.angles[i], col = locked ? (v !== null && fits(v, params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : v !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.TOP); p.textSize(15);
        p.text(r.prompt, 12, 44, W - 24, 54);

        // Pista: dos carriles (el lento por dentro, el rápido por fuera) y la línea de salida.
        p.noFill(); p.stroke(C.line); p.strokeWeight(16); p.circle(cx, cy, 2 * R); p.circle(cx, cy, 2 * (R - 26));
        p.stroke(C.bg); p.strokeWeight(1); p.drawingContext.setLineDash([4, 6]); p.circle(cx, cy, 2 * R); p.circle(cx, cy, 2 * (R - 26)); p.drawingContext.setLineDash([]);
        p.stroke(C.ink); p.strokeWeight(3); p.line(cx + R - 40, cy, cx + R + 10, cy);
        p.stroke(C.line); p.strokeWeight(1); p.line(cx - R + 34, cy, cx + R - 40, cy); p.line(cx, cy - R + 34, cx, cy + R - 34);
        // Recorridos.
        p.noFill(); p.strokeWeight(4);
        p.stroke(C.Z + 'aa'); if (th > 0.5) p.arc(cx, cy, 2 * (R - 26), 2 * (R - 26), -th * Math.PI / 180, 0);
        p.stroke(C.I + 'aa'); const t2 = (2 * th) % 360; if (t2 > 0.5) p.arc(cx, cy, 2 * R + 20, 2 * R + 20, -t2 * Math.PI / 180, 0);
        runner(p, 2 * th, locked ? (good ? C.ok : C.bad) : C.I, R, '2θ');
        runner(p, th, locked ? (good ? C.ok : C.bad) : C.Z, R - 26, 'θ');
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL); p.textAlign(p.CENTER, p.CENTER); p.text('salida', cx + R - 12, cy + 12);

        // Marcador.
        const rad = th * Math.PI / 180, y0 = cy + R + 34;
        p.textStyle(p.BOLD); p.textSize(16); p.fill(C.Z); p.text(`θ = ${Math.round(th)}°`, W / 2 - 64, y0); p.fill(C.I); p.text(`2θ = ${Math.round(2 * th) % 360}°`, W / 2 + 64, y0);
        p.textSize(13); p.textStyle(p.NORMAL); p.fill(C.ink);
        p.text(`cos 2θ = ${f2(Math.cos(2 * rad))}   ·   sen 2θ = ${f2(Math.sin(2 * rad))}`, W / 2, y0 + 22);
        if (locked && !good) { p.fill(C.ok); p.textStyle(p.BOLD); p.text(`valía θ = ${valid(r).map(v => `${v}°`).join(' o ')}`, W / 2, y0 + 42); }

        [[minus, '−'], [run, running ? 'corriendo…' : 'mantén: correr'], [plus, '+']].forEach(([b, s]) => {
          const on = b === run && running;
          p.stroke(on ? C.brand : C.line); p.strokeWeight(on ? 3 : 1.5); p.fill(on ? C.brand + '33' : C.card); p.rect(b.x, b.y, b.w, b.h, 10);
          p.noStroke(); p.fill(C.ink); p.textStyle(p.BOLD); p.textSize(b === run ? 15 : 22); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
        });
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { if (running) { running = false; settle(); } cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(run, p.mouseX, p.mouseY)) { running = true; return false; }
        if (inside(minus, p.mouseX, p.mouseY)) { pos[cur] = (pos[cur] + 345) % 360; settle(); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { pos[cur] = (pos[cur] + 15) % 360; settle(); api.sfx?.tap?.(); return false; }
      };
      p.mouseReleased = () => { if (!running) return; running = false; settle(); api.sfx?.tap?.(); return false; };
    }, 1.55);

    return {
      loaded: m.ready,
      getState: () => ({ angles: [...st.angles] }),
      lock() { locked = true; if (running) { running = false; settle(); } },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, fits };
})();
;
//#archivo js/games/pesca-raices.js
// Pesca de raíces (trigonometría, ecuaciones): el lado izquierdo de la ecuación es una ola (la gráfica)
// y el lado derecho, el nivel del agua. Los peces viven justo donde la ola cruza o toca el agua: esas son
// las soluciones en [0, 2π). Se tocan las marcas del muelle (cada π/12) para lanzar anzuelos; tocar otra
// vez lo recoge. Hay que atrapar todas sin anzuelos de más. Rondas con pestañas.
// params = { rounds: [{ label, g, k } | { label, f }] }   (f = g − k; si hay g se dibuja g y el agua en k)
// state = { hooks: [[grados]] }

GAMES['pesca-raices'] = (() => {
  const MAX_HOOKS = 6;
  const D = Math.PI / 180;
  const fOf = r => r.f || (x => r.g(x) - (r.k || 0));
  function rootsOf(f) {
    if (typeof f !== 'function') f = fOf(f);        // también acepta una ronda { g, k } o { f }
    return Array.from({ length: 24 }, (_, k) => k * 15).filter(d => { const v = f(d * D); return Number.isFinite(v) && Math.abs(v) < 1e-7; });
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  function piTxt(d) {
    if (d === 0) return '0';
    const k = d / 15, g = gcd(k, 12), n = k / g, den = 12 / g;
    return `${n === 1 ? '' : n}π${den === 1 ? '' : '/' + den}`;
  }
  const same = (hooks, roots) => !!hooks && hooks.length === roots.length && roots.every(r => hooks.includes(r));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => same(state.hooks[i], rootsOf(fOf(r))));
    const solution = params.rounds.map(r => `${r.label || 'ecuación'}: x = ${rootsOf(fOf(r)).map(d => `${piTxt(d)} (${d}°)`).join(', ')}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { hooks: params.rounds.map(() => []) };
    const touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], scr = null, last = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      scr = { x: 16, y: 120, w: w - 32, h: h - 250 };
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const X = d => scr.x + (d / 360) * scr.w;
    const yr = r => r.yr || 3;
    const Y = (v, r) => scr.y + scr.h / 2 - (v / yr(r)) * (scr.h / 2 - 8);

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], g = r.g || r.f, k = r.g ? r.k || 0 : 0, hooks = st.hooks[cur], roots = rootsOf(fOf(r));
        tabs.forEach((t, i) => {
          const col = locked ? (same(st.hooks[i], rootsOf(fOf(params.rounds[i]))) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        let ts = 18; p.textSize(ts); const lab = r.label || '';
        while (p.textWidth(lab) > W - 20 && ts > 11) p.textSize(--ts);
        p.fill(C.ink); p.text(lab, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(`en [0, 2π)  ·  anzuelos: ${hooks.length} de ${MAX_HOOKS}`, W / 2, 80);

        // Agua (debajo del nivel k) y la ola.
        const wy = Y(k, r);
        p.noStroke(); p.fill(C.Z + '30'); p.rect(scr.x, wy, scr.w, scr.y + scr.h - wy, 0, 0, 10, 10);
        p.stroke(C.Z); p.strokeWeight(2); p.line(scr.x, wy, scr.x + scr.w, wy);
        for (let j = 0; j < 3; j++) { const sx = scr.x + ((p.frameCount * 0.6 + j * scr.w / 3) % scr.w); p.noFill(); p.stroke(C.Z + '88'); p.strokeWeight(1.5); p.arc(sx, wy + 14 + j * 10, 14, 6, 0, Math.PI); }
        p.stroke(C.line); p.strokeWeight(1); [90, 180, 270].forEach(d => p.line(X(d), scr.y, X(d), scr.y + scr.h));
        p.noFill(); p.stroke(C.I); p.strokeWeight(3.5);
        let open = false, prev = null;
        for (let px = 0; px <= scr.w; px += 2) {
          const v = g((px / scr.w) * 2 * Math.PI), inR = Number.isFinite(v) && Math.abs(v) <= yr(r) * 1.05;
          if (!inR || (prev !== null && Math.abs(v - prev) > yr(r))) { if (open) p.endShape(); open = false; prev = inR ? v : null; if (!inR) continue; }
          if (!open) { p.beginShape(); open = true; }
          p.vertex(scr.x + px, Y(v, r)); prev = v;
        }
        if (open) p.endShape();
        p.noStroke(); p.fill(C.Z); p.textSize(11); p.textAlign(p.RIGHT, p.BOTTOM); p.text(`agua: y = ${String(k).replace('-', '−')}`, scr.x + scr.w - 4, wy - 3);

        // Muelle con 24 marcas y anzuelos.
        const my = scr.y + scr.h + 24;
        p.stroke(C.N); p.strokeWeight(5); p.line(scr.x, my, scr.x + scr.w, my);
        for (let j = 0; j < 24; j++) {
          const d = j * 15, x = X(d), on = hooks.includes(d), isRoot = roots.includes(d);
          p.stroke(C.ink); p.strokeWeight(j % 6 === 0 ? 2.5 : 1.2); p.line(x, my - (j % 6 === 0 ? 8 : 5), x, my + (j % 6 === 0 ? 8 : 5));
          if (on) {
            const col = locked ? (isRoot ? C.ok : C.bad) : C.N;
            p.stroke(col); p.strokeWeight(1.5); p.line(x, my, x, wy);
            p.noFill(); p.strokeWeight(2.5); p.arc(x - 3, wy + 6, 8, 10, 0, Math.PI);
            if (locked && isRoot) { p.noStroke(); p.fill(C.ok); p.ellipse(x, wy + 18, 16, 8); p.triangle(x + 7, wy + 18, x + 13, wy + 13, x + 13, wy + 23); }
          } else if (locked && isRoot) { p.noStroke(); p.fill(C.ok + '99'); p.ellipse(x, wy + 18, 16, 8); }
        }
        p.noStroke(); p.fill(C.mute); p.textSize(11); p.textAlign(p.CENTER, p.TOP);
        ['0', 'π/2', 'π', '3π/2', '2π'].forEach((s, j) => p.text(s, X(j * 90), my + 12));
        p.textSize(15); p.textStyle(p.BOLD); p.fill(last === null ? C.mute : C.ink);
        p.text(last === null ? 'toca el muelle para lanzar un anzuelo' : `x = ${piTxt(last)}  (${last}°)`, W / 2, my + 34);
        if (locked && !same(hooks, roots)) { p.fill(C.ok); p.textSize(13); p.text(`peces en ${roots.map(piTxt).join(', ')}`, W / 2, my + 56); }
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; last = null; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (p.mouseY < scr.y || p.mouseY > scr.y + scr.h + 50 || p.mouseX < scr.x - 10 || p.mouseX > scr.x + scr.w + 10) return;
        const d = Math.round(((p.mouseX - scr.x) / scr.w) * 24) * 15;
        if (d < 0 || d >= 360) return false;
        const hooks = st.hooks[cur], i = hooks.indexOf(d);
        if (i >= 0) hooks.splice(i, 1); else if (hooks.length < MAX_HOOKS) hooks.push(d);
        last = d; touched[cur] = true; api.ready(touched.every(Boolean)); api.sfx?.tap?.(); return false;
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ hooks: st.hooks.map(h => [...h]) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, rootsOf, MAX_HOOKS };
})();
;
//#archivo js/games/compas-ambiguo.js
// El compás ambiguo (trigonometría, ley de senos, caso LLA): se conocen el ángulo A, el lado b (de A
// a C) y el lado a, opuesto a A. El lado a es el brazo de un compás clavado en C: se arrastra su punta
// para que toque la base. Si la toca, se suelta ahí y queda marcado un triángulo. Puede haber dos
// lugares, uno o ninguno; si no alcanza, se pulsa «No hay triángulo». Rondas con pestañas.
// params = { rounds: [{ A, b, a }] }   state = { marks: [[x] | 'none' | null] }

GAMES['compas-ambiguo'] = (() => {
  const D = Math.PI / 180;
  function solutions(r) {
    const h = r.b * Math.sin(r.A * D), cx = r.b * Math.cos(r.A * D);
    if (r.a < h - 1e-9) return [];
    if (Math.abs(r.a - h) < 1e-9) return [cx];
    const d = Math.sqrt(r.a * r.a - h * h);
    return [cx - d, cx + d].filter(x => x > 1e-9);
  }
  // Todos los cortes de la circunferencia (centro C, radio a) con la recta de la base, sin filtrar.
  function cuts(r) {
    const h = r.b * Math.sin(r.A * D), cx = r.b * Math.cos(r.A * D);
    if (r.a < h - 1e-9) return [];
    if (Math.abs(r.a - h) < 1e-9) return [cx];
    const d = Math.sqrt(r.a * r.a - h * h);
    return [cx - d, cx + d];
  }
  function okOne(m, r) {
    const s = solutions(r);
    if (!s.length) return m === 'none';
    return Array.isArray(m) && m.length === s.length && s.every(x => m.some(y => Math.abs(x - y) < 0.05));
  }
  const n2 = n => ['ningún triángulo', 'un triángulo', 'dos triángulos'][n];

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.marks[i], r));
    const solution = params.rounds.map(r => { const s = solutions(r); return `A = ${r.A}°, b = ${r.b}, a = ${r.a}: ${n2(s.length)}${s.length ? ` (c = ${s.map(x => x.toFixed(2)).join(' o ')})` : ''}`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { marks: params.rounds.map(() => null) };
    const phi = params.rounds.map(() => 50);        // ángulo del brazo del compás (empieza hacia arriba, lejos de la base)
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], k = 1, A0 = [0, 0], none = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      none = { x: 12, y: h - 52, w: w - 24, h: 42 };
    }
    function fit() {
      const r = params.rounds[cur], cx = r.b * Math.cos(r.A * D), cy = r.b * Math.sin(r.A * D);
      const minX = Math.min(0, cx - r.a) - 0.6, maxX = Math.max(cx + r.a, r.b, 4) + 0.5, maxY = cy + r.a;
      k = Math.min((W - 30) / (maxX - minX), (H - 250) / Math.max(maxY, 1), 40);
      A0 = [15 - minX * k, 100 + maxY * k];
    }
    const P = (x, y) => [A0[0] + x * k, A0[1] - y * k];
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const ready = () => api.ready(st.marks.every(m => m !== null));
    function tipOf(r, f) { const cx = r.b * Math.cos(r.A * D), cy = r.b * Math.sin(r.A * D); return [cx + r.a * Math.cos(f * D), cy + r.a * Math.sin(f * D)]; }
    // Si la punta está a menos de 0.35 unidades de la base cerca de una solución, se pega a ella.
    function snapped(r, f) { const [x, y] = tipOf(r, f); return cuts(r).find(s => Math.abs(y) < 0.35 * Math.max(1, r.a / 6) && Math.abs(x - s) < 0.8 * Math.max(1, r.a / 6)); }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg); fit();
        const r = params.rounds[cur], mk = st.marks[cur], cx = r.b * Math.cos(r.A * D), cy = r.b * Math.sin(r.A * D), sols = solutions(r);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.marks[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.marks[i] !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const ask = `A = ${r.A}°   ·   b = ${r.b}   ·   a = ${r.a}`;
        let ts = 17; p.textSize(ts); while (p.textWidth(ask) > W - 20 && ts > 11) p.textSize(--ts);
        p.text(ask, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text('¿Dónde puede estar el vértice B?', W / 2, 78);

        const [ax, ay] = P(0, 0), [Cx, Cy] = P(cx, cy);
        // Triángulos marcados.
        if (Array.isArray(mk)) mk.forEach(x => { const [bx, by] = P(x, 0); p.noStroke(); p.fill((locked ? (okOne(mk, r) ? C.ok : C.bad) : C.Z) + '33'); p.triangle(ax, ay, Cx, Cy, bx, by); p.fill(locked ? (sols.some(x0 => Math.abs(x0 - x) < 0.05) ? C.ok : C.bad) : C.Z); p.circle(bx, by, 12); p.textSize(11); p.textStyle(p.BOLD); p.text('B', bx, by + 16); });
        if (locked && !okOne(mk, r)) sols.forEach(x => { const [bx, by] = P(x, 0); p.noFill(); p.stroke(C.ok); p.strokeWeight(2); p.circle(bx, by, 18); });
        // Base, lado b y ángulo A.
        p.stroke(C.ink); p.strokeWeight(3); p.line(8, ay, W - 8, ay);
        p.stroke(C.Z); p.strokeWeight(4); p.line(ax, ay, Cx, Cy);
        p.noFill(); p.stroke(C.N); p.strokeWeight(2.5); p.arc(ax, ay, 46, 46, -r.A * D, 0);
        p.noStroke(); p.fill(C.N); p.textSize(12); p.textStyle(p.BOLD); p.text('A', ax - 8, ay + 14);
        p.fill(C.Z); p.text(`b = ${r.b}`, (ax + Cx) / 2 - 22, (ay + Cy) / 2);
        // Arco que barre la punta (traza tenue del compás) y el brazo.
        p.noFill(); p.stroke(C.I + '44'); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 6]); p.circle(Cx, Cy, 2 * r.a * k); p.drawingContext.setLineDash([]);
        const s = snapped(r, phi[cur]), [tx, ty] = s != null ? P(s, 0) : P(...tipOf(r, phi[cur]));
        p.stroke(C.I); p.strokeWeight(5); p.line(Cx, Cy, tx, ty);
        p.noStroke(); p.fill(s != null ? C.N : C.I); p.circle(tx, ty, s != null ? 16 : 12);
        p.fill(C.card); p.stroke(C.ink); p.strokeWeight(2); p.circle(Cx, Cy, 12);
        p.noStroke(); p.fill(C.ink); p.text('C', Cx, Cy - 16);
        p.fill(C.I); p.text(`a = ${r.a}`, (Cx + tx) / 2 + 22, (Cy + ty) / 2);

        // Estado y botón.
        p.textSize(14); p.fill(C.ink); p.textStyle(p.BOLD);
        const msg = mk === 'none' ? 'dijiste: no hay triángulo' : Array.isArray(mk) ? `marcaste ${n2(mk.length)}` : 'arrastra la punta rosa hasta la base';
        p.text(msg, W / 2, H - 76);
        if (locked && !okOne(mk, r)) { p.fill(C.ok); p.text(`había ${n2(sols.length)}`, W / 2, H - 98); }
        p.stroke(mk === 'none' ? C.brand : C.line); p.strokeWeight(mk === 'none' ? 3 : 1.5); p.fill(mk === 'none' ? C.brand + '33' : C.card); p.rect(none.x, none.y, none.w, none.h, 10);
        p.noStroke(); p.fill(C.ink); p.textSize(15); p.text('No hay triángulo', W / 2, none.y + none.h / 2);
      };

      const aimAt = () => {
        const r = params.rounds[cur], [Cx, Cy] = P(r.b * Math.cos(r.A * D), r.b * Math.sin(r.A * D));
        phi[cur] = Math.atan2(Cy - p.mouseY, p.mouseX - Cx) / D;
      };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(none, p.mouseX, p.mouseY)) { st.marks[cur] = 'none'; ready(); api.sfx?.tap?.(); return false; }
        if (p.mouseY > 90 && p.mouseY < none.y - 30) { drag = true; aimAt(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; aimAt(); return false; };
      p.mouseReleased = () => {
        if (!drag) return; drag = false;
        const r = params.rounds[cur], s = snapped(r, phi[cur]);
        if (s != null) {
          let mk = Array.isArray(st.marks[cur]) ? st.marks[cur] : [];
          mk = mk.some(x => Math.abs(x - s) < 0.05) ? mk.filter(x => Math.abs(x - s) >= 0.05) : [...mk, s];
          st.marks[cur] = mk.length ? mk : null; ready(); api.sfx?.tap?.();
        }
        return false;
      };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ marks: st.marks.map(m => (Array.isArray(m) ? [...m] : m)) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, solutions, cuts };
})();
;
//#archivo js/games/brazo-robot.js
// El brazo robot (trigonometría, ley de cosenos): un brazo con hombro fijo, un tramo a horizontal y un
// antebrazo b. Se dobla el codo (ángulo C entre los dos tramos) arrastrando la pinza o con − / + (de 1°
// en 1°) para que la pinza quede a distancia c del hombro, donde está la gema: c² = a² + b² − 2ab cos C.
// En las rondas con anillo se ve el círculo de alcance c; en las demás hay que calcular C. Al acertar, la
// pinza se cierra. Rondas con pestañas.
// params = { rounds: [{ a, b, c, ring?: true }] }   state = { angles: [grados | null] }

GAMES['brazo-robot'] = (() => {
  const D = Math.PI / 180;
  const elbowFor = r => Math.acos((r.a * r.a + r.b * r.b - r.c * r.c) / (2 * r.a * r.b)) / D;
  const reach = (a, b, C) => Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C * D));
  const okOne = (v, r) => v != null && Math.abs(v - elbowFor(r)) <= 1;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.angles[i], r));
    return { ok, solution: params.rounds.map(r => `a = ${r.a}, b = ${r.b}, c = ${r.c}: C ≈ ${Math.round(elbowFor(r))}°`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { angles: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], k = 1, S = [0, 0], minus = null, plus = null, drag = false, shown = 90;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      minus = { x: 12, y: h - 52, w: 52, h: 42 }; plus = { x: w - 64, y: h - 52, w: 52, h: 42 };
    }
    function fit() {
      const r = params.rounds[cur], span = r.a + r.b;
      k = Math.min((W - 60) / (span + 0.6), (H - 260) / (r.b + 0.6));
      S = [W / 2 - (r.a / 2) * k, 104 + r.b * k + 20];
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const setAng = v => { st.angles[cur] = Math.max(5, Math.min(175, Math.round(v))); api.ready(st.angles.every(a => a !== null)); };
    const elbow = r => [S[0] + r.a * k, S[1]];
    const gripAt = (r, Cdeg) => { const [ex, ey] = elbow(r); return [ex - r.b * k * Math.cos(Cdeg * D), ey - r.b * k * Math.sin(Cdeg * D)]; };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg); fit();
        const r = params.rounds[cur], v = st.angles[cur], good = okOne(v, r), want = elbowFor(r);
        shown += ((v ?? 90) - shown) * 0.25;
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.angles[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.angles[i] !== null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const ask = `a = ${r.a}  ·  b = ${r.b}  ·  la gema está a c = ${r.c}`;
        let ts = 17; p.textSize(ts); while (p.textWidth(ask) > W - 20 && ts > 11) p.textSize(--ts);
        p.text(ask, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(r.ring ? 'dobla el codo C hasta que la pinza llegue a la gema' : 'calcula C: la gema está escondida a distancia c', W / 2, 78);

        // Mesa, anillo de alcance y gema.
        p.stroke(C.line); p.strokeWeight(2); p.line(14, S[1] + 18, W - 14, S[1] + 18);
        if (r.ring) { p.noFill(); p.stroke(C.Q + '99'); p.strokeWeight(2); p.drawingContext.setLineDash([6, 6]); p.arc(S[0], S[1], 2 * r.c * k, 2 * r.c * k, Math.PI, 2 * Math.PI); p.drawingContext.setLineDash([]); }
        const [gx, gy] = gripAt(r, want);
        if (r.ring || locked) { p.noStroke(); p.fill(locked && !good ? C.ok : C.Q); p.quad(gx, gy - 11, gx + 9, gy, gx, gy + 11, gx - 9, gy); }
        // Brazo: base, tramo a, codo, antebrazo b y pinza.
        const [ex, ey] = elbow(r), [hx, hy] = gripAt(r, shown);
        p.noStroke(); p.fill(C.card); p.stroke(C.line); p.strokeWeight(2); p.rect(S[0] - 18, S[1] - 6, 36, 24, 6);
        p.stroke(C.Z); p.strokeWeight(10); p.line(S[0], S[1], ex, ey);
        p.stroke(C.I); p.strokeWeight(8); p.line(ex, ey, hx, hy);
        p.noStroke(); p.fill(C.ink); p.circle(S[0], S[1], 16); p.fill(C.N); p.circle(ex, ey, 18);
        const show = good && (r.ring || locked), dir = Math.atan2(hy - ey, hx - ex), open = show ? 0.12 : 0.55;
        p.stroke(locked ? (good ? C.ok : C.bad) : C.ink); p.strokeWeight(4);
        [-1, 1].forEach(s => p.line(hx, hy, hx + 16 * Math.cos(dir + s * open), hy + 16 * Math.sin(dir + s * open)));
        // Ángulo C en el codo (entre el tramo que vuelve al hombro y el antebrazo).
        p.noFill(); p.stroke(C.N); p.strokeWeight(3); p.arc(ex, ey, 52, 52, Math.PI, Math.PI + shown * D);
        p.noStroke(); p.fill(C.Z); p.textSize(12); p.textStyle(p.BOLD); p.text(`a = ${r.a}`, (S[0] + ex) / 2, S[1] + 32);
        p.fill(C.I); p.text(`b = ${r.b}`, (ex + hx) / 2 + 20, (ey + hy) / 2);

        const y0 = H - 80;
        p.textSize(18); p.fill(v === null ? C.mute : show ? C.ok : C.ink); p.text(v === null ? 'C = ?' : `C = ${v}°`, W / 2, y0);
        if (locked && !good) { p.fill(C.ok); p.textSize(13); p.text(`era C ≈ ${Math.round(want)}°`, W / 2, y0 + 22); }
        else if (show && !locked) { p.fill(C.ok); p.textSize(13); p.text('¡agarrada!', W / 2, y0 + 22); }
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(22); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
      };

      const aim = () => { const [ex, ey] = elbow(params.rounds[cur]); let a = Math.atan2(ey - p.mouseY, ex - p.mouseX) / D; if (a < 0) a = a < -90 ? 175 : 5; setAng(a); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; shown = st.angles[t] ?? 90; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (inside(minus, p.mouseX, p.mouseY)) { setAng((st.angles[cur] ?? 90) - 1); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { setAng((st.angles[cur] ?? 90) + 1); api.sfx?.tap?.(); return false; }
        if (p.mouseY > 90 && p.mouseY < H - 100) { drag = true; aim(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; aim(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.3);

    return {
      loaded: m.ready,
      getState: () => ({ angles: [...st.angles] }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, elbowFor, reach };
})();
;
//#archivo js/games/mapa-tesoro.js
// El mapa del tesoro (trigonometría, forma polar de un complejo): en un mapa cartesiano hay una X en el
// punto a + bi. El pirata sale del origen y solo entiende instrucciones polares: un rumbo (se gira la
// brújula, de 15° en 15°) y una cantidad de pasos exacta (− / + recorren √1, √2, √3, 2, √5…). En el mapa
// solo se ve hacia dónde mira el pirata; la caminata (y el cofre) aparecen al comprobar. Rondas con pestañas.
// params = { rounds: [{ a, b, label }] }   state = { walks: [{ k, deg } | null] }   (pasos = √k)

GAMES['mapa-tesoro'] = (() => {
  const K_MAX = 50;
  function radTxt(k) {
    let out = 1, inn = k;
    for (let f = 2; f * f <= inn; f++) while (inn % (f * f) === 0) { out *= f; inn /= f * f; }
    return inn === 1 ? String(out) : `${out === 1 ? '' : out}√${inn}`;
  }
  function argDeg(a, b) {
    let d = Math.atan2(b, a) * 180 / Math.PI;
    if (d < 0) d += 360;
    return Math.round(d * 1e6) / 1e6 % 360;
  }
  const want = r => ({ k: Math.round(r.a * r.a + r.b * r.b), deg: argDeg(r.a, r.b) });
  const okOne = (w, r) => !!w && w.k === want(r).k && Math.abs(((w.deg - want(r).deg) % 360 + 360) % 360) < 1e-6;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.walks[i], r));
    const solution = params.rounds.map(r => { const w = want(r); return `${r.label}: ${radTxt(w.k)} pasos a ${w.deg}°`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { walks: params.rounds.map(() => null) };
    const plan = params.rounds.map(() => ({ k: 1, deg: 0, touched: false }));
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], map = null, comp = null, minus = null, plus = null, drag = false;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      const side = Math.min(w - 24, h - 250);
      map = { x: (w - side) / 2, y: 74, s: side };
      comp = { x: 64, y: map.y + side + 82, r: 50 };
      minus = { x: w - 150, y: comp.y + 6, w: 44, h: 40 }; plus = { x: w - 56, y: comp.y + 6, w: 44, h: 40 };
    }
    const inside = (b, x, y) => b && x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const sync = () => { const P = plan[cur]; st.walks[cur] = P.touched ? { k: P.k, deg: P.deg } : null; api.ready(st.walks.every(Boolean)); };
    const span = r => Math.max(3, Math.ceil(Math.max(Math.abs(r.a), Math.abs(r.b), Math.sqrt(plan[cur].k)) + 1));

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], P = plan[cur], good = okOne(st.walks[cur], r), L = span(r);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.walks[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.walks[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const ask = `El tesoro está en z = ${r.label}`;
        let ts = 16; p.textSize(ts); while (p.textWidth(ask) > W - 16 && ts > 10) p.textSize(--ts);
        p.text(ask, W / 2, 56);

        // Mapa: papel, cuadrícula y ejes.
        const u = map.s / (2 * L), X = x => map.x + map.s / 2 + x * u, Y = y => map.y + map.s / 2 - y * u;
        p.noStroke(); p.fill(C.N + '18'); p.rect(map.x, map.y, map.s, map.s, 10);
        p.stroke(C.line); p.strokeWeight(1);
        for (let k = -L; k <= L; k++) { p.line(X(k), map.y, X(k), map.y + map.s); p.line(map.x, Y(k), map.x + map.s, Y(k)); }
        p.stroke(C.mute); p.strokeWeight(2); p.line(map.x, Y(0), map.x + map.s, Y(0)); p.line(X(0), map.y, X(0), map.y + map.s);
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL);
        p.textAlign(p.RIGHT, p.TOP); p.text('Re', map.x + map.s - 4, Y(0) + 3); p.textAlign(p.LEFT, p.TOP); p.text('Im', X(0) + 4, map.y + 3);
        p.textAlign(p.CENTER, p.TOP); for (let k = -L + 1; k < L; k++) if (k) p.text(k, X(k), Y(0) + 3);
        // La X del tesoro.
        const tx = X(r.a), ty = Y(r.b);
        p.stroke(C.I); p.strokeWeight(4); p.line(tx - 8, ty - 8, tx + 8, ty + 8); p.line(tx - 8, ty + 8, tx + 8, ty - 8);
        // El plan: rumbo y pasos, con huellas.
        const rr = Math.sqrt(P.k), rad = P.deg * Math.PI / 180, ex = X(rr * Math.cos(rad)), ey = Y(rr * Math.sin(rad));
        if (P.touched && !locked) {   // solo el rumbo: una flecha corta de largo fijo
          const ax = X(0) + 34 * Math.cos(rad), ay = Y(0) - 34 * Math.sin(rad);
          p.stroke(C.Z); p.strokeWeight(3); p.line(X(0), Y(0), ax, ay); p.noStroke(); p.fill(C.Z); p.circle(ax, ay, 8);
        }
        if (P.touched && locked) {
          p.stroke(C.Z); p.strokeWeight(2.5); p.drawingContext.setLineDash([5, 6]); p.line(X(0), Y(0), ex, ey); p.drawingContext.setLineDash([]);
          const n = Math.max(2, Math.round(rr * 2));
          for (let j = 1; j <= n; j++) { const f = j / n; p.noStroke(); p.fill(C.Z + 'aa'); p.circle(X(0) + (ex - X(0)) * f + (j % 2 ? 3 : -3), Y(0) + (ey - Y(0)) * f, 5); }
        }
        // El pirata (en el origen) y, al comprobar, el cofre.
        p.noStroke(); p.fill(C.N); p.circle(X(0), Y(0) - 10, 12); p.fill(C.ink); p.rect(X(0) - 7, Y(0) - 16, 14, 4, 2);
        if (locked) {
          const col = good ? C.ok : C.bad, [cx, cy] = good ? [tx, ty] : [ex, ey];
          p.fill(col); p.rect(cx - 10, cy - 8, 20, 14, 3); p.fill(C.N); p.rect(cx - 10, cy - 12, 20, 5, 2);
          if (!good) { const w = want(r); p.fill(C.ok); p.textSize(13); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.text(`era: ${radTxt(w.k)} pasos a ${w.deg}°`, W / 2, map.y + map.s + 14); }
        }

        // Brújula del rumbo.
        p.noFill(); p.stroke(C.line); p.strokeWeight(2); p.circle(comp.x, comp.y, comp.r * 2);
        for (let d = 0; d < 360; d += 45) { const a = d * Math.PI / 180; p.line(comp.x + (comp.r - 6) * Math.cos(a), comp.y - (comp.r - 6) * Math.sin(a), comp.x + comp.r * Math.cos(a), comp.y - comp.r * Math.sin(a)); }
        p.stroke(C.Z); p.strokeWeight(4); p.line(comp.x, comp.y, comp.x + (comp.r - 8) * Math.cos(rad), comp.y - (comp.r - 8) * Math.sin(rad));
        p.noStroke(); p.fill(C.Z); p.circle(comp.x + (comp.r - 8) * Math.cos(rad), comp.y - (comp.r - 8) * Math.sin(rad), 12);
        p.fill(C.ink); p.textSize(12); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER); p.text('rumbo', comp.x + comp.r + 26, comp.y - comp.r + 6);
        // Pasos.
        const mid = (minus.x + plus.x + plus.w) / 2;
        p.textSize(13); p.fill(C.mute); p.text('pasos', mid, comp.y - 34);
        p.textSize(22); p.fill(P.touched ? C.ink : C.mute); p.text(radTxt(P.k), mid, comp.y - 12);
        [[minus, '−'], [plus, '+']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(22); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
        p.fill(P.touched ? C.Z : C.mute);
        const msg = P.touched ? `${radTxt(P.k)} pasos a ${P.deg}°` : 'gira la brújula y elige los pasos';
        let fs = 14; p.textSize(fs); while (p.textWidth(msg) > W - 16 && fs > 10) p.textSize(--fs);
        p.text(msg, W / 2, comp.y + comp.r + 34);
      };

      const setDeg = () => { let d = Math.atan2(comp.y - p.mouseY, p.mouseX - comp.x) * 180 / Math.PI; d = ((Math.round(d / 15) * 15) % 360 + 360) % 360; plan[cur].deg = d; plan[cur].touched = true; sync(); };
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const P = plan[cur];
        if (inside(minus, p.mouseX, p.mouseY)) { P.k = Math.max(1, P.k - 1); P.touched = true; sync(); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { P.k = Math.min(K_MAX, P.k + 1); P.touched = true; sync(); api.sfx?.tap?.(); return false; }
        if (Math.hypot(p.mouseX - comp.x, p.mouseY - comp.y) < comp.r + 24) { drag = true; setDeg(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; setDeg(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.45);

    return {
      loaded: m.ready,
      getState: () => ({ walks: st.walks.map(w => (w ? { ...w } : null)) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, radTxt, argDeg };
})();
;
//#archivo js/games/telarana-polar.js
// La telaraña polar (trigonometría, producto y cociente de complejos): dos flechas z₁ (cian) y z₂
// (rosa) salen del centro de una telaraña. Los hilos circulares son módulos candidatos (el correcto y
// trampas como r₁ + r₂) y los rayos van cada 15°. Se arrastra la araña al nudo del producto z₁·z₂ o del
// cociente z₁/z₂: módulos multiplicados (o divididos) y ángulos sumados (o restados). Rondas con pestañas.
// params = { rounds: [{ op: '×' | '÷', z1: { r, deg }, z2: { r, deg } }] }   state = { picks: [{ r, deg } | null] }

GAMES['telarana-polar'] = (() => {
  const norm = d => ((Math.round(d) % 360) + 360) % 360;
  const round6 = v => Math.round(v * 1e6) / 1e6;
  function target(r) {
    const mul = r.op === '×';
    return { r: round6(mul ? r.z1.r * r.z2.r : r.z1.r / r.z2.r), deg: norm(mul ? r.z1.deg + r.z2.deg : r.z1.deg - r.z2.deg) };
  }
  // Hilos: el módulo correcto y las trampas típicas, sin repetir.
  function rings(r) {
    const t = target(r).r, a = r.z1.r, b = r.z2.r;
    // Trampas cercanas al correcto (entre t/4 y 4t) para que los hilos no se amontonen en el centro.
    const c = [a + b, Math.abs(a - b), a * b, a / b, b / a, a, b].map(round6).filter(v => v > 0.05 && v >= t / 4 && v <= 4 * t && Math.abs(v - t) > 1e-6);
    const out = [...new Set([t, ...c])];
    for (const extra of [round6(2 * t), round6(t / 2)]) if (out.length < 3 && !out.includes(extra)) out.push(extra);
    return out.sort((x, y) => x - y).slice(0, 6);
  }
  const fmt = v => (Number.isInteger(v) ? String(v) : String(+v.toFixed(2)));
  const okOne = (pk, r) => !!pk && Math.abs(pk.r - target(r).r) < 1e-6 && norm(pk.deg) === target(r).deg;

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.picks[i], r));
    const solution = params.rounds.map(r => { const t = target(r); return `z₁ ${r.op} z₂ = ${fmt(t.r)} cis ${t.deg}°`; }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { picks: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, drag = false, spider = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.44, (h - 200) / 2); cx = w / 2; cy = 104 + R;
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    // Los hilos se reparten parejo en pantalla (el i-ésimo a (i + 1)/n del radio) con su valor real escrito;
    // entre hilos se interpola, así que las flechas z₁ y z₂ quedan bien ordenadas aunque su módulo no sea un hilo.
    const maxR = r => Math.max(...rings(r)) * 1.08;
    function scr(r, mod) {
      const v = rings(r), n = v.length, xs = [0, ...v], ys = [0, ...v.map((_, i) => (i + 1) / (n + 0.4) * R)];
      for (let i = 1; i < xs.length; i++) if (mod <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (mod - xs[i - 1]) / (xs[i] - xs[i - 1]);
      return Math.min(R * 1.04, ys[n] + (mod - xs[n]) / xs[n] * (ys[n] - ys[n - 1]));
    }
    const P = (r, mod, deg) => { const d = scr(r, mod), a = deg * Math.PI / 180; return [cx + d * Math.cos(a), cy - d * Math.sin(a)]; };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      function arrow(x0, y0, x1, y1, col) {
        p.stroke(col); p.strokeWeight(4); p.line(x0, y0, x1, y1);
        const a = Math.atan2(y1 - y0, x1 - x0); p.noStroke(); p.fill(col);
        p.triangle(x1, y1, x1 - 12 * Math.cos(a - 0.4), y1 - 12 * Math.sin(a - 0.4), x1 - 12 * Math.cos(a + 0.4), y1 - 12 * Math.sin(a + 0.4));
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], pk = st.picks[cur], good = okOne(pk, r);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.picks[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.picks[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        const ask = `z₁ = ${fmt(r.z1.r)} cis ${r.z1.deg}°   ${r.op}   z₂ = ${fmt(r.z2.r)} cis ${r.z2.deg}°`;
        let ts = 16; p.textSize(ts); while (p.textWidth(ask) > W - 16 && ts > 10) p.textSize(--ts);
        p.fill(C.ink); p.text(ask, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(`lleva la araña al nudo de z₁ ${r.op} z₂`, W / 2, 78);

        // Telaraña: rayos cada 15° e hilos en los módulos candidatos.
        for (let d = 0; d < 360; d += 15) { const [x, y] = P(r, maxR(r), d); p.stroke(C.line); p.strokeWeight(d % 90 ? 1 : 2); p.line(cx, cy, x, y); }
        rings(r).forEach(v => {
          p.noFill(); p.stroke(C.mute + '99'); p.strokeWeight(1.5); p.beginShape();
          for (let d = 0; d <= 360; d += 15) { const [x, y] = P(r, v, d); const sag = 0.06 * v; const [mx, my] = P(r, v - sag, d + 7.5); p.vertex(x, y); if (d < 360) p.quadraticVertex(mx, my, ...P(r, v, d + 15)); }
          p.endShape();
          const [lx, ly] = P(r, v, 82); p.noStroke(); p.fill(C.mute); p.textSize(10); p.text(fmt(v), lx + 8, ly);
        });
        // Las dos flechas.
        arrow(cx, cy, ...P(r, r.z1.r, r.z1.deg), C.Z);
        arrow(cx, cy, ...P(r, r.z2.r, r.z2.deg), C.I);
        const lab = (mod, deg) => { const [x, y] = P(r, mod, deg), a = deg * Math.PI / 180; return [x + 14 * Math.cos(a), y - 14 * Math.sin(a)]; };
        const [l1x, l1y] = lab(r.z1.r, r.z1.deg), [l2x, l2y] = lab(r.z2.r, r.z2.deg);
        p.noStroke(); p.textStyle(p.BOLD); p.textSize(13); p.fill(C.Z); p.text('z₁', l1x, l1y); p.fill(C.I); p.text('z₂', l2x, l2y);
        // La araña.
        const sp = pk ? P(r, pk.r, pk.deg) : [cx + R + 4, cy + 26];
        spider = sp;
        const col = locked ? (good ? C.ok : C.bad) : C.N;
        p.stroke(col); p.strokeWeight(2);
        for (let j = 0; j < 4; j++) { const a = -0.9 + j * 0.6; p.line(sp[0], sp[1], sp[0] + 14 * Math.cos(a), sp[1] + 14 * Math.sin(a)); p.line(sp[0], sp[1], sp[0] - 14 * Math.cos(a), sp[1] + 14 * Math.sin(a)); }
        p.noStroke(); p.fill(col); p.ellipse(sp[0], sp[1], 14, 16);
        if (locked && !good) { const t = target(r), [gx, gy] = P(r, t.r, t.deg); p.noFill(); p.stroke(C.ok); p.strokeWeight(3); p.circle(gx, gy, 22); }

        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.fill(pk ? C.ink : C.mute);
        const msg = pk ? `araña en ${fmt(pk.r)} cis ${pk.deg}°` : 'arrastra la araña dorada a un nudo';
        let fs = 16; p.textSize(fs); while (p.textWidth(msg) > W - 16 && fs > 10) p.textSize(--fs);
        p.text(msg, W / 2, H - 30);
        if (locked && !good) { const t = target(r); p.fill(C.ok); p.textSize(13); p.text(`era ${fmt(t.r)} cis ${t.deg}°`, W / 2, H - 10); }
      };

      // Suelta en el nudo más cercano (hilo y rayo).
      function snap() {
        const r = params.rounds[cur], dx = p.mouseX - cx, dy = cy - p.mouseY, d = Math.hypot(dx, dy);
        const ring = rings(r).reduce((b, v) => (Math.abs(scr(r, v) - d) < Math.abs(scr(r, b) - d) ? v : b));
        const deg = norm(Math.round(Math.atan2(dy, dx) * 180 / Math.PI / 15) * 15);
        st.picks[cur] = { r: ring, deg }; api.ready(st.picks.every(Boolean));
      }
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        if (spider && Math.hypot(p.mouseX - spider[0], p.mouseY - spider[1]) < 30) { drag = true; return false; }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) < R + 10) { drag = true; snap(); return false; }
      };
      p.mouseDragged = () => { if (!drag) return; snap(); return false; };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.4);

    return {
      loaded: m.ready,
      getState: () => ({ picks: st.picks.map(x => (x ? { ...x } : null)) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, target, rings };   // scr (posición en pantalla) es interna
})();
;
//#archivo js/games/espiral-potencias.js
// La espiral de potencias (trigonometría, De Moivre): hay que decidir cuántas veces multiplicar por z
// para caer justo en la estrella. «× z» y «÷ z» cambian n; la espiral queda tapada por una nube hasta
// comprobar: entonces el punto salta potencia por potencia (zⁿ = rⁿ cis nθ) y se ve si llega. Mientras
// tanto solo se ven z, la estrella y n. Rondas con pestañas.
// params = { rounds: [{ z: { r, deg }, goal: { r, deg }, label?, zLabel? }] }   state = { ns: [n | null] }

GAMES['espiral-potencias'] = (() => {
  const N_MAX = 24;
  const norm = d => ((Math.round(d) % 360) + 360) % 360;
  const power = (z, n) => ({ r: Math.pow(z.r, n), deg: norm(z.deg * n) });
  const okOne = (n, r) => n != null && n > 0 && Math.abs(power(r.z, n).r - r.goal.r) < 1e-6 * Math.max(1, r.goal.r) && power(r.z, n).deg === norm(r.goal.deg);
  const first = r => { for (let n = 1; n <= N_MAX; n++) if (okOne(n, r)) return n; return null; };
  const fmt = v => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : String(+v.toFixed(2)));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => okOne(state.ns[i], r));
    return { ok, solution: params.rounds.map(r => `${r.label || 'meta'}: n = ${first(r)}`).join(' · ') };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { ns: params.rounds.map(() => null) };
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, R = 0, bMul = null, bDiv = null, anim = 1, scale = null;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      R = Math.min(w * 0.44, (h - 230) / 2); cx = w / 2; cy = 96 + R;
      const bw = (w - 36) / 2; bDiv = { x: 12, y: h - 54, w: bw, h: 44 }; bMul = { x: 24 + bw, y: h - 54, w: bw, h: 44 };
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], n = st.ns[cur] ?? 0;
        anim = Math.min(1, anim + 0.06);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.ns[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.ns[i] != null ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textSize(16); p.textAlign(p.CENTER, p.CENTER);
        const ask = `z = ${r.zLabel || `${fmt(r.z.r)} cis ${r.z.deg}°`}   ·   llega a la estrella ${r.label || ''}`;
        let ts = 16; p.textSize(ts); while (p.textWidth(ask) > W - 16 && ts > 10) p.textSize(--ts);
        p.text(ask, W / 2, 56);

        // Escala: que quepan la meta y la potencia actual (con animación suave).
        const need = Math.max(r.goal.r, locked ? power(r.z, n).r : 1, r.z.r, 1) * 1.15;
        scale = scale == null ? need : scale + (need - scale) * 0.12;
        const k = R / scale, P = (mod, deg) => [cx + mod * k * Math.cos(deg * Math.PI / 180), cy - mod * k * Math.sin(deg * Math.PI / 180)];
        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - R, cy, cx + R, cy); p.line(cx, cy - R, cx, cy + R);
        p.noFill(); p.stroke(C.line); p.strokeWeight(1); p.drawingContext.setLineDash([3, 5]); p.circle(cx, cy, 2 * k); p.drawingContext.setLineDash([]);
        p.noStroke(); p.fill(C.mute); p.textSize(10); p.textStyle(p.NORMAL); p.text('1', cx + k + 6, cy + 8);
        // Estrella meta.
        const [gx, gy] = P(r.goal.r, r.goal.deg), tw = p.frameCount * 0.05;
        p.fill(C.N); p.noStroke(); p.beginShape();
        for (let j = 0; j < 10; j++) { const a = tw + j * Math.PI / 5, rr = j % 2 ? 5 : 12; p.vertex(gx + rr * Math.cos(a), gy + rr * Math.sin(a)); }
        p.endShape(p.CLOSE);
        // z (flecha corta) siempre visible; la espiral solo al comprobar.
        const [zx, zy] = P(r.z.r, r.z.deg); p.stroke(C.R); p.strokeWeight(3); p.line(cx, cy, zx, zy); p.noStroke(); p.fill(C.R); p.circle(zx, zy, 9);
        p.textSize(12); p.textStyle(p.BOLD); p.text('z', zx + 10, zy - 10);
        if (!locked) {
        } else {
        p.noFill(); p.stroke(C.Z); p.strokeWeight(2.5); p.beginShape();
        for (let j = 0; j <= n; j++) {
          const steps = 12, lim = j === n ? Math.round(steps * anim) : steps;
          if (j === 0) { p.vertex(...P(1, 0)); continue; }
          for (let s = 1; s <= lim; s++) { const f = (j - 1) + s / steps; p.vertex(...P(Math.pow(r.z.r, f), r.z.deg * f)); }
        }
        p.endShape();
        for (let j = 0; j < n; j++) { const q = power(r.z, j), [x, y] = P(q.r, q.deg); p.noStroke(); p.fill(C.Z + '99'); p.circle(x, y, 7); }
        const f = n === 0 ? 0 : n - 1 + anim, [hx, hy] = P(Math.pow(r.z.r, f), r.z.deg * f);
        const on = st.ns[cur] != null && okOne(st.ns[cur], r) && locked;
        p.noStroke(); p.fill(locked ? (okOne(st.ns[cur], r) ? C.ok : C.bad) : C.I); p.circle(hx, hy, 16);
        if (on) { p.noFill(); p.stroke(C.ok); p.strokeWeight(3); p.circle(gx, gy, 30); }
        }

        // Marcador y botones.
        const q = power(r.z, n), y0 = cy + R + 20;
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(17); p.fill(C.ink);
        p.text(n === 0 ? 'n = 0   (pulsa × z)' : `multiplicar ${n} ${n === 1 ? 'vez' : 'veces'}: z^${n}`, W / 2, y0);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(locked ? `z^${n} = ${fmt(q.r)} cis ${q.deg}°` : 'la espiral se revela al comprobar', W / 2, y0 + 20);
        if (locked && !okOne(st.ns[cur], r)) { p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(13); p.text(`llegaba con n = ${first(r)}`, W / 2, y0 + 40); }
        [[bDiv, '÷ z'], [bMul, '× z']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(18); p.textStyle(p.BOLD); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
      };

      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; anim = 1; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const n = st.ns[cur] ?? 0;
        if (inside(bMul, p.mouseX, p.mouseY) && n < N_MAX) { st.ns[cur] = n + 1; anim = 1; api.ready(st.ns.every(v => v != null && v > 0)); api.sfx?.tap?.(); return false; }
        if (inside(bDiv, p.mouseX, p.mouseY) && n > 0) { st.ns[cur] = n - 1; anim = 1; api.ready(st.ns.every(v => v != null && v > 0)); api.sfx?.tap?.(); return false; }
      };
    }, 1.45);

    return {
      loaded: m.ready,
      getState: () => ({ ns: [...st.ns] }),
      lock() { locked = true; anim = 0; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, power, first };
})();
;
//#archivo js/games/flor-de-raices.js
// La flor de raíces (trigonometría, raíces n-ésimas): las n raíces de z son los pétalos de una flor
// regular, separados 360°/n. Se gira la flor arrastrando cualquier pétalo (de 5° en 5°) y se elige el
// radio con − / + entre módulos candidatos (ⁿ√r, r/n, √r…). Al girar se ven el ángulo φ del pétalo
// dorado y su potencia nφ; z aparece como un punto fantasma. Rondas con pestañas.
// params = { rounds: [{ n, r, deg, label }] }   state = { flowers: [{ rho, rot } | null] }

GAMES['flor-de-raices'] = (() => {
  const SUP = { 2: '', 3: '∛', 4: '∜' };
  const norm = d => ((Math.round(d) % 360) + 360) % 360;
  const rootR = R => Math.pow(R.r, 1 / R.n);
  const isInt = v => Math.abs(v - Math.round(v)) < 1e-9;
  function radTxt(n, r) {
    const v = Math.pow(r, 1 / n);
    if (isInt(v)) return String(Math.round(v));
    return n === 2 ? `√${r}` : SUP[n] ? `${SUP[n]}${r}` : `${r}^(1/${n})`;
  }
  // Radios candidatos con su etiqueta.
  function radii(R) {
    const w = rootR(R), wt = radTxt(R.n, R.r);
    // La correcta nunca queda en un extremo: hay una trampa menor (ⁿ√r − 1 o ⁿ√r / 2) y otras mayores.
    const low = w - 1 > 0.3 ? [w - 1, isInt(w) ? String(Math.round(w) - 1) : `${wt} − 1`] : [w / 2, `${wt}/2`];
    const c = [[w, wt], low, [R.r / R.n, isInt(R.r / R.n) ? String(R.r / R.n) : `${R.r}/${R.n}`], [Math.sqrt(R.r), radTxt(2, R.r)], [w + 1, isInt(w) ? String(Math.round(w) + 1) : `${wt} + 1`]];
    const out = [];
    for (const [v, t] of c) if (out.length < 4 && !out.some(o => Math.abs(o.v - v) < 1e-9)) out.push({ v, t });
    return out.sort((a, b) => a.v - b.v);
  }
  const step = R => 360 / R.n;
  const okOne = (f, R) => !!f && Math.abs(f.rho - rootR(R)) < 1e-9 && Math.abs((((f.rot - R.deg / R.n) % step(R)) + step(R)) % step(R)) < 1e-6
    || (!!f && Math.abs(f.rho - rootR(R)) < 1e-9 && Math.abs(step(R) - (((f.rot - R.deg / R.n) % step(R)) + step(R)) % step(R)) < 1e-6);
  const angles = R => Array.from({ length: R.n }, (_, k) => +(R.deg / R.n + k * step(R)).toFixed(2));

  function grade(state, params) {
    const ok = params.rounds.every((R, i) => okOne(state.flowers[i], R));
    const solution = params.rounds.map(R => `${R.label || 'z'}: radio ${radTxt(R.n, R.r)}, pétalos en ${angles(R).map(a => `${a}°`).join(', ')}`).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const st = { flowers: params.rounds.map(() => null) };
    const fl = params.rounds.map(R => ({ i: radii(R).length - 1, rot: 10, touched: false }));   // empieza en el radio mayor, que nunca es el correcto
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], cx = 0, cy = 0, Rpx = 0, minus = null, plus = null, drag = false, grabOff = 0;

    function layout(w, h) {
      W = w; H = h;
      tabs = params.rounds.map((_, i) => ({ x: 12 + i * 52, y: 8, w: 44, h: 30 }));
      Rpx = Math.min(w * 0.42, (h - 230) / 2); cx = w / 2; cy = 100 + Rpx;
      minus = { x: 12, y: h - 54, w: 52, h: 44 }; plus = { x: w - 64, y: h - 54, w: 52, h: 44 };
    }
    const inside = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    const sync = () => { const F = fl[cur], R = params.rounds[cur]; st.flowers[cur] = F.touched ? { rho: radii(R)[F.i].v, rot: F.rot } : null; api.ready(st.flowers.every(Boolean)); };

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); layout(size.w, size.h); };
      p.onResize = () => layout(size.w, size.h);

      p.draw = () => {
        p.background(C.bg);
        const R = params.rounds[cur], F = fl[cur], rads = radii(R), rho = rads[F.i].v, good = okOne(st.flowers[cur], R);
        tabs.forEach((t, i) => {
          const col = locked ? (okOne(st.flowers[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : st.flowers[i] ? C.Z : C.line;
          p.stroke(col); p.strokeWeight(i === cur ? 2.5 : 1.5); p.fill(C.card); p.rect(t.x, t.y, t.w, t.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(i + 1, t.x + t.w / 2, t.y + t.h / 2);
        });
        p.noStroke(); p.fill(C.N); p.textStyle(p.BOLD); p.textAlign(p.CENTER, p.CENTER);
        const ask = `Raíces ${['', '', 'cuadradas', 'cúbicas', 'cuartas', 'quintas', 'sextas'][R.n] || `${R.n}-ésimas`} de z = ${R.label}`;
        let ts = 16; p.textSize(ts); while (p.textWidth(ask) > W - 16 && ts > 10) p.textSize(--ts);
        p.text(ask, W / 2, 56);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(`z = ${R.r} cis ${R.deg}°  ·  ${R.n} pétalos`, W / 2, 78);

        const maxV = rads[rads.length - 1].v * 1.12, k = Rpx / maxV;
        const P = (mod, deg) => [cx + mod * k * Math.cos(deg * Math.PI / 180), cy - mod * k * Math.sin(deg * Math.PI / 180)];
        p.stroke(C.line); p.strokeWeight(1.5); p.line(cx - Rpx, cy, cx + Rpx, cy); p.line(cx, cy - Rpx, cx, cy + Rpx);
        rads.forEach((o, j) => { p.noFill(); p.stroke(j === F.i ? C.Q : C.line); p.strokeWeight(j === F.i ? 2 : 1); p.drawingContext.setLineDash([3, 5]); p.circle(cx, cy, 2 * o.v * k); p.drawingContext.setLineDash([]); });
        // z fantasma.
        const far = R.r > maxV, [zx, zy] = P(far ? maxV * 0.97 : R.r, R.deg);
        p.noFill(); p.stroke(C.I); p.strokeWeight(2); if (far) p.drawingContext.setLineDash([3, 3]); p.circle(zx, zy, 16); p.drawingContext.setLineDash([]);
        p.noStroke(); p.fill(C.I); p.textSize(12); p.textStyle(p.BOLD); p.text(far ? 'z (más lejos)' : 'z', zx + (far ? 0 : 13), zy - 14);
        // Pétalos.
        for (let j = 0; j < R.n; j++) {
          const d = F.rot + j * step(R), [px, py] = P(rho, d), a = Math.atan2(py - cy, px - cx);
          const col = locked ? (good ? C.ok : C.bad) : j === 0 ? C.N : C.Q;
          p.push(); p.translate((cx + px) / 2, (cy + py) / 2); p.rotate(a);
          p.noStroke(); p.fill(col + '55'); p.ellipse(0, 0, Math.hypot(px - cx, py - cy), 22);
          p.pop();
          p.noStroke(); p.fill(col); p.circle(px, py, 13);
        }
        p.fill(C.N); p.circle(cx, cy, 10);
        if (locked && !good) angles(R).forEach(d => { const [x, y] = P(rootR(R), d); p.noFill(); p.stroke(C.ok); p.strokeWeight(2.5); p.circle(x, y, 22); });

        // Lecturas.
        const y0 = cy + Rpx + 22, phi = norm(F.rot);
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(16); p.fill(F.touched ? C.ink : C.mute);
        const msg = F.touched ? `radio ${rads[F.i].t}  ·  pétalo dorado en ${phi}°` : 'gira la flor y elige el radio';
        let fs = 16; p.textSize(fs); while (p.textWidth(msg) > W - 16 && fs > 10) p.textSize(--fs);
        p.text(msg, W / 2, y0);
        p.textSize(12); p.textStyle(p.NORMAL); p.fill(C.mute); p.text(`los pétalos van cada ${+step(R).toFixed(2)}°`, W / 2, y0 + 20);
        if (locked && !good) { p.fill(C.ok); p.textStyle(p.BOLD); p.textSize(13); p.text(`radio ${radTxt(R.n, R.r)}, un pétalo en ${angles(R)[0]}°`, W / 2, y0 + 40); }
        [[minus, '− radio'], [plus, '+ radio']].forEach(([b, s]) => { p.stroke(C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 10); p.noStroke(); p.fill(C.ink); p.textSize(11); p.textStyle(p.BOLD); p.text(s, b.x + b.w / 2, b.y + b.h / 2); });
      };

      const angAt = () => Math.atan2(cy - p.mouseY, p.mouseX - cx) * 180 / Math.PI;
      p.mousePressed = () => {
        const t = tabs.findIndex(t => inside(t, p.mouseX, p.mouseY));
        if (t >= 0) { cur = t; api.sfx?.tap?.(); return false; }
        if (locked) return;
        const F = fl[cur], R = params.rounds[cur];
        if (inside(minus, p.mouseX, p.mouseY)) { F.i = Math.max(0, F.i - 1); F.touched = true; sync(); api.sfx?.tap?.(); return false; }
        if (inside(plus, p.mouseX, p.mouseY)) { F.i = Math.min(radii(R).length - 1, F.i + 1); F.touched = true; sync(); api.sfx?.tap?.(); return false; }
        if (Math.hypot(p.mouseX - cx, p.mouseY - cy) < Rpx + 10) { drag = true; grabOff = angAt() - F.rot; return false; }
      };
      p.mouseDragged = () => {
        if (!drag) return;
        const F = fl[cur], R = params.rounds[cur];
        F.rot = ((Math.round((angAt() - grabOff) / 5) * 5) % step(R) + step(R)) % step(R);
        F.touched = true; sync(); return false;
      };
      p.mouseReleased = () => { if (!drag) return; drag = false; api.sfx?.tap?.(); return false; };
    }, 1.45);

    return {
      loaded: m.ready,
      getState: () => ({ flowers: st.flowers.map(f => (f ? { ...f } : null)) }),
      lock() { locked = true; drag = false; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, rootR, radTxt, radii, angles, okOne };
})();
;
//#archivo js/games/quita-vueltas.js
// Quita vueltas (Trigonometría, trig-41a): un ángulo grande o negativo y su coterminal. El lado terminal no se mueve al quitar o poner
// vueltas completas. item = { deg, lo? (0), rad? }
GAMES['quita-vueltas'] = (() => {
  const fmt = (it, d) => (it.rad ? `$${TK.piTex(d / 15, 12)}$` : `${TK.minusTxt(d)}°`);
  const lo = it => it.lo ?? 0, need = it => -Math.floor((it.deg - lo(it)) / 360);
  return questGame({
    aspect: 1.3,
    init: () => ({ k: 0 }),
    ok: (s, it) => { const d = it.deg + 360 * s.k; return d >= lo(it) && d < lo(it) + 360; },
    answer: it => ({ k: need(it) }),
    solution: it => `${fmt(it, it.deg)} → ${fmt(it, it.deg + 360 * need(it))}`,
    prompt: it => `Quita o pon vueltas hasta dejar ${fmt(it, it.deg)} entre ${fmt(it, lo(it))} y ${fmt(it, lo(it) + 360)}`,
    foot: () => 'El lado terminal no se mueve: todos esos ángulos son coterminales',
    layout(G) { G.btn = TK.row(G, 3); const h = G.btn[0].y - G.top - 34; G.R = Math.min(G.W * 0.3, h / 2 - 4); G.cx = G.W / 2; G.cy = G.top + 8 + h / 2; },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, d = it.deg + 360 * s.k, [tx, ty] = TK.at(cx, cy, R, d);
      TK.ring(p, C, cx, cy, R);
      // La espiral cuenta las vueltas; el lado terminal queda quieto.
      p.noFill(); p.stroke(G.solved ? C.ok : C.coral); p.strokeWeight(3); p.beginShape();
      const ds = TK.glide(G, 'd', d, 6), n = Math.max(8, Math.ceil(Math.abs(ds) / 6));
      for (let i = 0; i <= n; i++) { const a = ds * i / n, r = R * 0.2 + Math.min(R * 0.62, Math.abs(a) / 360 * R * 0.17); p.vertex(...TK.at(cx, cy, r, a)); }
      p.endShape();
      p.stroke(C.sky); p.strokeWeight(4); p.line(cx, cy, tx, ty); drawDot(p, C, tx, ty, 11, C.sky);
      TK.label(p, C, G.solved ? fmt(it, d) : `${fmt(it, it.deg)} ${s.k < 0 ? '−' : '+'} ${Math.abs(s.k)} ${Math.abs(s.k) === 1 ? 'vuelta' : 'vueltas'}`, cx, cy + R + 20, G.solved ? C.ok : C.ink, 17, 220);
      drawBtn(p, C, G.btn[0], '− 1 vuelta', false, C.cream); drawBtn(p, C, G.btn[1], '+ 1 vuelta', false, C.cream); drawBtn(p, C, G.btn[2], 'Listo', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, i = G.btn.findIndex(b => hitBox(b, x, y));
      if (i < 0) return false;
      if (i === 2) { G.submit('Todavía no está en ese intervalo'); return true; }
      const k = s.k + (i ? 1 : -1);
      if (Math.abs(G.item.deg + 360 * k) <= 2160) { s.k = k; G.api.sfx?.tap?.(); }
      return true;
    },
    peek: G => { const n = need(G.item) - G.s.k; return { solve: [...Array(Math.abs(n)).fill(G.btn[n > 0 ? 1 : 0]), G.btn[2]], wrong: n ? G.btn[2] : null }; },
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/rueda-rodante.js
// La rueda rodante (Trigonometría, trig-41b): una rueda avanza lo mismo que mide el arco que apoya, s = r·θ. Se elige el ángulo (en
// sextos de π) y se suelta la rueda. item = { r, n }   (θ = n·π/6; la bandera está a r·θ)
GAMES['rueda-rodante'] = (() => {
  const sTex = it => TK.piTex(it.r * it.n, 6);
  return questGame({
    aspect: 1.3,
    init: () => ({ n: 0, rolled: false }),
    ok: (s, it) => !!s.rolled && s.n === it.n,
    answer: it => ({ n: it.n, rolled: true }),
    solution: it => `$\\theta = \\tfrac{s}{r} = ${TK.piTex(it.n, 6)}$`,
    prompt: it => `Bandera a $s = ${sTex(it)}$ m, radio de ${it.r} m. ¿Qué ángulo debe girar la rueda?`,
    foot: () => 'La rueda avanza lo mismo que mide el arco que apoya: $s = r\\theta$',
    layout(G) { const y = G.bottom - 46; G.st = { x: 12, y, w: G.W * 0.56, h: 38 }; G.go = { x: G.st.x + G.st.w + 10, y, w: G.W - 34 - G.st.w, h: 38 }; G.gy = y - 46; },
    draw(G) {
      const { p, C, s, item: it, W, gy } = G, x0 = 60, span = W - 100, dist = n => it.r * n * Math.PI / 6;
      const sc = Math.min(span * 0.74 / dist(it.n), 44 / it.r), rp = it.r * sc, th = (s.rolled ? s.n * Math.PI / 6 : 0) * TK.prog(G, 0.5);
      const wx = Math.min(W - rp - 4, x0 + it.r * th * sc), wy = gy - rp, fx = x0 + dist(it.n) * sc;
      p.stroke(C.line); p.strokeWeight(3); p.line(10, gy, W - 10, gy);
      p.stroke(C.coral); p.strokeWeight(5); p.line(x0, gy, wx, gy);
      // Bandera.
      p.stroke(C.ink); p.strokeWeight(2); p.line(fx, gy, fx, gy - 2 * rp - 26); p.noStroke(); p.fill(G.solved ? C.ok : C.coral); p.triangle(fx, gy - 2 * rp - 26, fx + 18, gy - 2 * rp - 19, fx, gy - 2 * rp - 12);
      TK.label(p, C, `$s = ${sTex(it)}$ m`, fx, gy + 16, C.ink, 13, 120);
      // Rueda: el arco que ya rodó va en coral, igual que el camino.
      p.fill(C.card); p.stroke(C.ink); p.strokeWeight(3); p.circle(wx, wy, 2 * rp);
      if (th > 0) { p.noFill(); p.stroke(C.coral); p.strokeWeight(5); p.arc(wx, wy, 2 * rp, 2 * rp, Math.PI / 2, Math.PI / 2 + Math.min(th, 2 * Math.PI - 0.001)); }
      p.stroke(C.sky); p.strokeWeight(3); p.line(wx, wy, wx - rp * Math.sin(th), wy + rp * Math.cos(th));
      drawDot(p, C, wx - rp * Math.sin(th), wy + rp * Math.cos(th), 9, C.sky);
      TK.label(p, C, `r = ${it.r} m`, x0, gy - 2 * rp - 12, C.mute, 12, 90);
      drawStepper(p, C, G.st, `$${TK.piTex(s.n, 6)}$`, 'ángulo que gira (θ, en radianes)');
      drawBtn(p, C, G.go, 'Rodar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, d = stepHit(G.st, x, y);
      if (d) { s.n = Math.max(0, Math.min(24, s.n + d)); s.rolled = false; G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      s.rolled = true; TK.fire(G); G.submit(s.n < G.item.n ? 'Se quedó corta: no llegó a la bandera' : 'Se pasó de la bandera');
      return true;
    },
    peek: G => ({ solve: [...TK.steps(G.st, G.s.n, G.item.n), G.go], wrong: G.s.n === G.item.n ? null : G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/figuras-notables.js
// Figuras notables (Trigonometría, trig-2): las razones de 30°, 45° y 60° salen de medio triángulo equilátero (1, √3, 2) y de medio
// cuadrado (1, 1, √2). Se tocan dos lados: el de arriba y el de abajo de la fracción. item = { fn, deg }
GAMES['figuras-notables'] = (() => {
  const S3 = Math.sqrt(3), LEN = [1, S3, 2, 1, 1, Math.SQRT2], TEX = ['1', '\\sqrt3', '2', '1', '1', '\\sqrt2'];
  const RES = { tan60: '\\sqrt3', tan30: '\\tfrac{\\sqrt3}{3}', sen45: '\\tfrac{\\sqrt2}{2}', cos45: '\\tfrac{\\sqrt2}{2}', tan45: '1' };
  const fits = (a, b, it) => a !== b && a != null && b != null && (a < 3) === (b < 3) && (a < 3) === (it.deg !== 45) && Math.abs(LEN[a] / LEN[b] - TK.F[it.fn](TK.rad(it.deg))) < 1e-9;
  const pair = it => { for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) if (fits(a, b, it)) return [a, b]; return null; };
  const name = it => `${TK.FN[it.fn]} ${it.deg}^\\circ`;
  return questGame({
    aspect: 1.3,
    init: () => ({ pick: [] }),
    ok: (s, it) => fits(s.pick[0], s.pick[1], it),
    answer: it => ({ pick: pair(it) }),
    solution: it => { const [a, b] = pair(it), r = RES[it.fn + it.deg]; return `$${name(it)} = \\tfrac{${TEX[a]}}{${TEX[b]}}${r ? ` = ${r}` : ''}$`; },
    prompt: it => `Arma $${name(it)}$: toca el lado de arriba y luego el de abajo`,
    foot: () => 'Busca el ángulo en una figura y mira sus lados desde ahí',
    no: () => 'Esos lados no dan esa razón: busca primero el ángulo',
    retry: G => { G.s.pick = []; },
    layout(G) {
      const u = Math.min(74, (G.W - 96) / 2.3, (G.bottom - G.top - 110) / S3), yb = G.top + 76 + S3 * u, xe = G.W * 0.27 - u / 2, v = u * 1.25, xs = G.W * 0.74 - v / 2;
      const A = [xe, yb], B = [xe + u, yb], T = [xe + u, yb - S3 * u], A2 = [xs, yb], B2 = [xs + v, yb], T2 = [xs + v, yb - v];
      G.tri = [[A, B, T], [A2, B2, T2]]; G.seg = [[A, B], [B, T], [A, T], [A2, B2], [B2, T2], [A2, T2]]; G.yb = yb;
    },
    draw(G) {
      const { p, C, s, item: it, tri, seg } = G, col = i => (s.pick[0] === i ? C.sky : s.pick[1] === i ? C.coral : C.ink);
      const show = i => (s.pick[i] == null ? '\\square' : TEX[s.pick[i]]), r = RES[it.fn + it.deg];
      TK.label(p, C, `$${name(it)} = \\tfrac{${show(0)}}{${show(1)}}${G.solved && r ? ` = ${r}` : ''}$`, G.W / 2, G.top + 26, G.solved ? C.ok : C.ink, 21, G.W - 30);
      tri.forEach(([a, b, t], k) => {
        const cen = [(a[0] + b[0] + t[0]) / 3, (a[1] + b[1] + t[1]) / 3];
        p.noStroke(); p.fill(C.card); p.triangle(...a, ...b, ...t);
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(b[0] - 11, b[1] - 11, 11, 11);
        for (let i = 0; i < 3; i++) { const [q, w] = seg[3 * k + i]; p.stroke(col(3 * k + i)); p.strokeWeight(s.pick.includes(3 * k + i) ? 6 : 3); p.line(...q, ...w); TK.sideLabel(p, C, `$${TEX[3 * k + i]}$`, q, w, cen, col(3 * k + i)); }
        TK.label(p, C, k ? '45°' : '60°', a[0] + (k ? 26 : 19), a[1] - 9, C.N, 12, 40); TK.label(p, C, k ? '45°' : '30°', t[0] - (k ? 10 : 8), t[1] + (k ? 26 : 34), C.N, 12, 40);
        TK.label(p, C, k ? 'Medio cuadrado' : 'Medio equilátero', (a[0] + b[0]) / 2, G.yb + 34, C.mute, 11, 130);
      });
    },
    press(G, x, y) {
      const s = G.s, i = TK.hitSeg(G.seg, x, y);
      if (i < 0 || s.pick.includes(i)) return i >= 0;
      s.pick.push(i); G.api.sfx?.tap?.();
      if (s.pick.length === 2) G.submit();
      return true;
    },
    peek: G => ({ solve: G.s.pick.length ? [] : pair(G.item).map(i => TK.mid(...G.seg[i])) }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/multiplica-razon.js
// Multiplica por la razón (Trigonometría, trig-42c; con sen, cos y tan en trig-1): en una situación se conoce un lado y un ángulo y
// se busca otro lado. Se elige la razón que convierte el lado conocido en el buscado; el juego hace la cuenta.
// item = { q, known: 'op'|'ady'|'hip', want, val, deg, unit, fns? }
GAMES['multiplica-razon'] = (() => {
  const RATIO = { 'op/hip': 'sen', 'ady/hip': 'cos', 'op/ady': 'tan', 'hip/op': 'csc', 'hip/ady': 'sec', 'ady/op': 'cot' };
  const ALL = ['sen', 'cos', 'tan', 'csc', 'sec', 'cot'], IDX = { op: 0, ady: 1, hip: 2 };
  const fn = it => RATIO[`${it.want}/${it.known}`], res = it => Math.round(it.val * TK.F[fn(it)](TK.rad(it.deg)) * 10) / 10;
  return questGame({
    aspect: 1.35,
    init: () => ({ pick: null }),
    ok: (s, it) => s.pick === fn(it),
    answer: it => ({ pick: fn(it) }),
    solution: it => `$${it.val} \\cdot ${TK.FN[fn(it)]}\\,${it.deg}^\\circ \\approx ${res(it)}$ ${it.unit}`,
    prompt: it => it.q,
    foot: () => 'lado buscado = lado conocido × razón',
    no: (it, s) => `$${TK.FN[s.pick]}$ une otros dos lados`,
    layout(G) {
      const fns = G.item.fns || ALL, rows = Math.ceil(fns.length / 3), w = (G.W - 24 - 16) / 3, y0 = G.bottom - rows * 44 - 2;
      G.tile = fns.map((f, i) => ({ f, x: 12 + (i % 3) * (w + 8), y: y0 + Math.floor(i / 3) * 44, w, h: 36 }));
      const h = Math.min(y0 - G.top - 78, 130), a = TK.rad(Math.max(28, Math.min(62, G.item.deg))), bw = Math.min(G.W - 130, h / Math.tan(a)), x0 = (G.W - bw) / 2, yb = y0 - 30;
      G.A = [x0, yb]; G.B = [x0 + bw, yb]; G.T = [x0 + bw, yb - bw * Math.tan(a)]; G.eqY = G.top + 20;
    },
    draw(G) {
      const { p, C, s, item: it, A, B, T } = G, seg = [[B, T], [A, B], [A, T]], cen = [(A[0] + B[0] + T[0]) / 3, (A[1] + B[1] + T[1]) / 3], k = IDX[it.known], w = IDX[it.want];
      TK.label(p, C, G.solved ? `$${it.val} \\times ${TK.FN[fn(it)]}\\,${it.deg}^\\circ \\approx ${res(it)}$ ${it.unit}` : `$? = ${it.val} \\times \\square$`, G.W / 2, G.eqY, G.solved ? C.ok : C.ink, 19, G.W - 30);
      p.noStroke(); p.fill(C.card); p.triangle(...A, ...B, ...T);
      seg.forEach(([a, b], i) => { p.stroke(i === k ? C.sky : i === w ? C.coral : C.mute); p.strokeWeight(i === k || i === w ? 5 : 2); p.line(...a, ...b); });
      p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(B[0] - 11, B[1] - 11, 11, 11);
      TK.sideLabel(p, C, `${it.val} ${it.unit}`, ...seg[k], cen, C.sky, 13); TK.sideLabel(p, C, G.solved ? `${res(it)} ${it.unit}` : '?', ...seg[w], cen, C.coral, G.solved ? 13 : 18);
      TK.label(p, C, `${it.deg}°`, A[0] + 34, A[1] - 9, C.N, 12, 40);
      G.tile.forEach(t => drawTile(p, C, t, `$${TK.FN[t.f]}\\,${it.deg}^\\circ$`, { fill: G.solved && t.f === fn(it) ? C.ok : s.pick === t.f ? C.coral : C.cream, size: 15, r: 10 }));
    },
    press(G, x, y) {
      const t = G.tile.find(b => hitBox(b, x, y));
      if (!t) return false;
      G.s.pick = t.f; G.submit();
      return true;
    },
    peek: G => ({ solve: [G.tile.find(t => t.f === fn(G.item))], wrong: G.tile.find(t => t.f !== fn(G.item)) }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/proyecta-punto.js
// Proyecta el punto (Trigonometría, trig-3; en el primer cuadrante, trig-2): un punto de la circunferencia unitaria es (cos t, sen t).
// Se eligen los dos valores, con su signo, y se proyecta. item = { deg, rad? }
GAMES['proyecta-punto'] = (() => {
  const idx = v => TK.VAL.findIndex(q => Math.abs(q - v) < 1e-6), ci = it => idx(Math.cos(TK.rad(it.deg))), si = it => idx(Math.sin(TK.rad(it.deg)));
  const name = it => (it.rad ? TK.piTex(it.deg / 15, 12) : `${it.deg}^\\circ`);
  return questGame({
    aspect: 1.4,
    init: () => ({ c: 4, s: 4, miss: null }),
    ok: (s, it) => s.c === ci(it) && s.s === si(it),
    answer: it => ({ c: ci(it), s: si(it), miss: null }),
    solution: it => `$${name(it)}$: $(${TK.VTEX[ci(it)]},\\ ${TK.VTEX[si(it)]})$`,
    prompt: it => `Pon el coseno y el seno del punto de $${name(it)}$ y proyecta`,
    foot: () => 'El punto es (cos t, sen t): el coseno va de lado y el seno, hacia arriba',
    layout(G) {
      const w = (G.W - 36) / 2, y = G.bottom - 98; G.bc = { x: 12, y, w, h: 36 }; G.bs = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.R = Math.min(G.W * 0.27, (y - G.top - 44) / 2); G.cx = G.W / 2; G.cy = G.top + 12 + G.R;
    },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, [x, y] = TK.at(cx, cy, R, it.deg);
      TK.ring(p, C, cx, cy, R);
      p.stroke(C.mute); p.strokeWeight(2); p.line(cx, cy, x, y);
      if (G.solved) { p.strokeWeight(5); p.stroke(C.sky); p.line(cx, cy, x, cy); p.stroke(C.coral); p.line(x, cy, x, y); }
      if (s.miss && !G.solved) { const mx = cx + TK.VAL[s.miss[0]] * R, my = cy - TK.VAL[s.miss[1]] * R; p.stroke(C.bad); p.strokeWeight(3); p.line(mx - 6, my - 6, mx + 6, my + 6); p.line(mx - 6, my + 6, mx + 6, my - 6); TK.label(p, C, 'tu punto', mx, my + 16, C.bad, 11, 70); }
      drawDot(p, C, x, y, 12, G.solved ? C.ok : C.N);
      TK.label(p, C, `$${name(it)}$`, x + (x >= cx ? 26 : -26), y + (y <= cy ? -12 : 14), C.ink, 14, 60);
      drawStepper(p, C, G.bc, `$${TK.VTEX[s.c]}$`, 'coseno (de lado)', C.Z); drawStepper(p, C, G.bs, `$${TK.VTEX[s.s]}$`, 'seno (arriba o abajo)', C.I);
      drawBtn(p, C, G.go, 'Proyectar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, dc = stepHit(G.bc, x, y), ds = stepHit(G.bs, x, y);
      if (dc || ds) { if (dc) s.c = Math.max(0, Math.min(8, s.c + dc)); else s.s = Math.max(0, Math.min(8, s.s + ds)); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      const shot = [s.c, s.s];
      if (!G.submit('Ese no es el punto: mira dónde cayó el tuyo')) G.s.miss = shot;
      return true;
    },
    peek: G => ({ solve: [...TK.steps(G.bc, G.s.c, ci(G.item)), ...TK.steps(G.bs, G.s.s, si(G.item)), G.go], wrong: G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/espejo-cuadrantes.js
// Espejo de cuadrantes (Trigonometría, trig-43b): reflejar en el eje x cambia el signo del seno; en el eje y, el del coseno. El
// ángulo de referencia es el del reflejo que cae en el cuadrante I: el estudiante lleva el punto allí y dice cuánto mide
// (el juego no lo escribe hasta comprobar). Con `cond` se parte del cuadrante I y se busca el cuadrante que cumple los signos.
// item = { deg, to (1–4), max?, cond? }
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
GAMES['espejo-cuadrantes'] = (() => {
  const OPS = [d => TK.mod(-d, 360), d => TK.mod(180 - d, 360)], ROM = ['', 'I', 'II', 'III', 'IV'];
  const quad = d => Math.floor(TK.mod(d, 360) / 90) + 1, run = (it, ops) => ops.reduce((d, k) => OPS[k](d), it.deg);
  const route = it => [[], [0], [1], [0, 1]].find(o => o.length <= (it.max ?? 2) && quad(run(it, o)) === it.to);
  const there = (s, it) => s.ops.length <= (it.max ?? 2) && quad(run(it, s.ops)) === it.to;
  return questGame({
    aspect: 1.4,
    init: () => ({ ops: [], ref: 9 }),
    ok: (s, it) => there(s, it) && (!!it.cond || 5 * s.ref === run(it, s.ops)),
    answer: it => ({ ops: route(it), ref: it.cond ? 9 : run(it, route(it)) / 5 }),
    solution: it => (it.cond ? `${it.deg}° → ${run(it, route(it))}° (cuadrante ${ROM[it.to]})` : `Ángulo de referencia de ${it.deg}°: ${run(it, route(it))}°`),
    prompt: it => (it.cond ? `Lleva ${it.deg}° adonde ${it.cond}` : `Lleva ${it.deg}° al cuadrante I y di su ángulo de referencia`),
    foot: (it, s) => (!it.cond && there(s, it) ? 'El ángulo de referencia es el que forma con el eje x' : `Espejos usados: ${s.ops.length} de ${it.max ?? 2}`),
    retry: G => { if (!there(G.s, G.item)) G.s.ops = []; },
    layout(G) {
      G.btn = TK.row(G, 2); const y = G.btn[0].y;
      G.st = { x: 12, y, w: G.W * 0.56, h: 38 }; G.chk = { x: G.st.x + G.st.w + 10, y, w: G.W - 34 - G.st.w, h: 38 };
      const h = y - G.top - 62; G.R = Math.min(G.W * 0.27, h / 2 - 2); G.cx = G.W / 2; G.cy = G.top + 10 + G.R;
    },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, d = run(it, s.ops), [tx, ty] = TK.at(cx, cy, R, d), x = TK.glide(G, 'x', tx), y = TK.glide(G, 'y', ty), [ox, oy] = TK.at(cx, cy, R, it.deg), r = TK.rad(d), ask = !it.cond && there(s, it);
      TK.ring(p, C, cx, cy, R);
      p.stroke(C.mute); p.strokeWeight(1.5); p.line(cx, cy, ox, oy); p.noStroke(); p.fill(C.mute); p.circle(ox, oy, 8);
      TK.label(p, C, `${it.deg}°`, ox + (ox >= cx ? 22 : -22), oy + (oy <= cy ? -11 : 13), C.mute, 12, 50);
      p.noStroke(); p.fill(C.card); p.triangle(cx, cy, x, cy, x, y);
      p.strokeWeight(4); p.stroke(C.sky); p.line(cx, cy, x, cy); p.stroke(C.coral); p.line(x, cy, x, y); p.stroke(C.ink); p.strokeWeight(2.5); p.line(cx, cy, x, y);
      drawDot(p, C, x, y, 12, G.solved ? C.ok : C.N);
      if (s.ops.length) TK.label(p, C, G.solved ? `${d}°` : '¿?°', x + (x >= cx ? 24 : -24), y + (y <= cy ? -12 : 14), G.solved ? C.ok : C.ink, 14, 60);
      const sg = [['sen', Math.sin(r)], ['cos', Math.cos(r)], ['tan', Math.tan(r)]], w = (G.W - 24) / 3, py = G.btn[0].y - 36;
      sg.forEach(([n, v], i) => drawPill(p, C, `${n} ${v > 0 ? '+' : '−'}`, 12 + w * (i + 0.5), py, v > 0 ? C.mint : C.coral, 12));
      if (ask) { drawStepper(p, C, G.st, `${5 * s.ref}°`, 'ángulo de referencia'); drawBtn(p, C, G.chk, 'Comprobar', G.solved, G.solved ? C.ok : C.coral); }
      else { drawBtn(p, C, G.btn[0], 'Espejo ↕', false, C.cream); drawBtn(p, C, G.btn[1], 'Espejo ↔', false, C.cream); }
    },
    press(G, x, y) {
      const s = G.s, it = G.item;
      if (!it.cond && there(s, it)) {
        const d = stepHit(G.st, x, y);
        if (d) { s.ref = Math.max(1, Math.min(17, s.ref + d)); G.api.sfx?.tap?.(); return true; }
        if (!hitBox(G.chk, x, y)) return false;
        G.submit('Ese no es: mira cuánto le falta al ángulo para llegar al eje x más cercano');
        return true;
      }
      const i = G.btn.findIndex(b => hitBox(b, x, y));
      if (i < 0) return false;
      s.ops.push(i); G.api.sfx?.tap?.();
      if (there(s, it)) { if (it.cond) G.good(`Llegaste a ${run(it, s.ops)}°`); }
      else if (s.ops.length >= (it.max ?? 2)) G.bad('Se acabaron los espejos: empieza de nuevo');
      return true;
    },
    peek: G => {
      const it = G.item, r = route(it), on = there(G.s, it);
      const tail = it.cond ? [] : [...TK.steps(G.st, G.s.ref, run(it, r) / 5), G.chk];
      return { solve: [...(on ? [] : r.slice(G.s.ops.length).map(k => G.btn[k])), ...tail], wrong: on && !it.cond ? (5 * G.s.ref === run(it, G.s.ops) ? null : G.chk) : (it.max ?? 2) === 1 && !G.s.ops.length ? G.btn[1 - r[0]] : null };
    },
  });
})();
;
//#archivo js/games/ola-entre-lineas.js
// La ola entre líneas (Trigonometría, trig-44a): y = a·sen x + d va de d − a a d + a. Se eligen la amplitud y la línea media para que
// la ola toque justo el techo y el piso; la ola solo se dibuja al lanzarla. item = { hi, lo }
GAMES['ola-entre-lineas'] = (() => {
  const half = v => TK.minusTxt(v / 2);
  return questGame({
    aspect: 1.4,
    init: () => ({ a: 2, d: 0, sa: 2, sd: 0 }),
    ok: (s, it) => s.d + s.a === 2 * it.hi && s.d - s.a === 2 * it.lo,
    answer: it => ({ a: it.hi - it.lo, d: it.hi + it.lo, sa: it.hi - it.lo, sd: it.hi + it.lo }),
    solution: it => { const a = (it.hi - it.lo) / 2, d = (it.hi + it.lo) / 2; return `$y = ${a === 1 ? '' : a}\\operatorname{sen} x${d ? ` ${d < 0 ? '-' : '+'} ${Math.abs(d)}` : ''}$`; },
    prompt: it => `Lanza una ola que toque justo el techo (${TK.minusTxt(it.hi)}) y el piso (${TK.minusTxt(it.lo)})`,
    foot: () => 'La ola va de d − a hasta d + a',
    layout(G) {
      const w = (G.W - 36) / 2, y = G.bottom - 98; G.ba = { x: 12, y, w, h: 36 }; G.bd = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.box = { x: 16, y: G.top + 6, w: G.W - 32, h: y - G.top - 30 };
    },
    draw(G) {
      const { p, C, s, item: it, box } = G, Y = v => box.y + box.h / 2 - v * box.h / 11, X = t => box.x + t / (4 * Math.PI) * box.w;
      p.noStroke(); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
      p.stroke(C.line); p.strokeWeight(1.5); p.line(box.x, Y(0), box.x + box.w, Y(0));
      const dash = (v, col, txt) => { p.stroke(col); p.strokeWeight(2.5); p.drawingContext.setLineDash([7, 5]); p.line(box.x, Y(v), box.x + box.w, Y(v)); p.drawingContext.setLineDash([]); drawPill(p, C, txt, box.x + box.w - 44, Y(v), col, 11); };
      dash(it.hi, C.coral, `techo ${TK.minusTxt(it.hi)}`); dash(it.lo, C.sky, `piso ${TK.minusTxt(it.lo)}`);
      p.stroke(C.mute); p.strokeWeight(1); p.drawingContext.setLineDash([2, 4]); p.line(box.x, Y(s.sd / 2), box.x + box.w, Y(s.sd / 2)); p.drawingContext.setLineDash([]);
      p.noFill(); p.stroke(G.solved ? C.ok : C.mint); p.strokeWeight(3.5); p.beginShape();
      for (let i = 0, kk = Math.round(120 * TK.prog(G, 0.45)); i <= kk; i++) { const t = i / 120 * 4 * Math.PI; p.vertex(X(t), Y(Math.max(-5.4, Math.min(5.4, s.sa / 2 * Math.sin(t) + s.sd / 2)))); }
      p.endShape();
      drawStepper(p, C, G.ba, half(s.a), 'amplitud (a)'); drawStepper(p, C, G.bd, half(s.d), 'línea media (d)');
      drawBtn(p, C, G.go, 'Lanzar ola', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, da = stepHit(G.ba, x, y), dd = stepHit(G.bd, x, y);
      if (da || dd) { if (da) s.a = Math.max(1, Math.min(8, s.a + da)); else s.d = Math.max(-6, Math.min(6, s.d + dd)); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      s.sa = s.a; s.sd = s.d; TK.fire(G);
      const top = (s.d + s.a) / 2;
      G.submit(top < it.hi ? 'La cresta no llega al techo' : top > it.hi ? 'La cresta se pasa del techo' : 'El valle no toca el piso');
      return true;
    },
    peek: G => ({ solve: [...TK.steps(G.ba, G.s.a, G.item.hi - G.item.lo), ...TK.steps(G.bd, G.s.d, G.item.hi + G.item.lo), G.go], wrong: G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/crestas-faroles.js
// Crestas y faroles (Trigonometría, trig-44b): y = cos(b(x − h)) tiene periodo 2π/b y la cresta en x = h. Se eligen b y el
// corrimiento para que cada cresta caiga en un farol. item = { b (0–3: ½, 1, 2, 4), h (en cuartos de π) }
GAMES['crestas-faroles'] = (() => {
  const BS = [0.5, 1, 2, 4], BT = ['½', '1', '2', '4'], per = bi => 8 / BS[bi];
  return questGame({
    aspect: 1.4,
    init: () => ({ bi: 1, h: 0, sb: 1, sh: 0 }),
    ok: (s, it) => s.bi === it.b && TK.mod(s.h - it.h, per(it.b)) === 0,
    answer: it => ({ bi: it.b, h: it.h, sb: it.b, sh: it.h }),
    solution: it => `$b = ${BS[it.b]}$ (periodo $${TK.piTex(per(it.b), 4)}$), corrida $${TK.piTex(it.h, 4)}$`,
    prompt: () => 'Suelta una ola cuyas crestas caigan justo en los faroles',
    foot: (it, s) => `Periodo de tu ola: $\\tfrac{2\\pi}{b} = ${TK.piTex(per(s.bi), 4)}$`,
    layout(G) {
      const w = (G.W - 36) / 2, y = G.bottom - 98; G.bb = { x: 12, y, w, h: 36 }; G.bh = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.box = { x: 16, y: G.top + 6, w: G.W - 32, h: y - G.top - 30 };
    },
    draw(G) {
      const { p, C, s, item: it, box } = G, X = q => box.x + 8 + q / 16 * (box.w - 16), y0 = box.y + box.h * 0.58, amp = box.h * 0.24;
      p.noStroke(); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
      p.stroke(C.line); p.strokeWeight(1.5); p.line(box.x, y0, box.x + box.w, y0);
      for (let k = 0; k <= 4; k++) { p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(4 * k), y0 - 4, X(4 * k), y0 + 4); TK.label(p, C, `$${TK.piTex(k)}$`, X(4 * k), box.y + box.h - 12, C.mute, 12, 40); }
      // Faroles en las crestas pedidas.
      for (let q = TK.mod(it.h, per(it.b)); q <= 16; q += per(it.b)) { p.stroke(C.mute); p.strokeWeight(2); p.line(X(q), y0, X(q), y0 - amp - 22); drawDot(p, C, X(q), y0 - amp - 22, G.solved ? 13 : 9, C.sun); }
      p.noFill(); p.stroke(G.solved ? C.ok : C.mint); p.strokeWeight(3.5); p.beginShape();
      for (let i = 0, kk = Math.round(200 * TK.prog(G, 0.45)); i <= kk; i++) { const q = i / 200 * 16; p.vertex(X(q), y0 - amp * Math.cos(BS[s.sb] * (q - s.sh) * Math.PI / 4)); }
      p.endShape();
      drawStepper(p, C, G.bb, BT[s.bi], 'ondas en 2π (b)'); drawStepper(p, C, G.bh, `$${TK.piTex(s.h, 4)}$`, 'corrida a la derecha');
      drawBtn(p, C, G.go, 'Soltar la ola', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, db = stepHit(G.bb, x, y), dh = stepHit(G.bh, x, y);
      if (db || dh) { if (db) s.bi = Math.max(0, Math.min(3, s.bi + db)); else s.h = Math.max(0, Math.min(8, s.h + dh)); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      s.sb = s.bi; s.sh = s.h; TK.fire(G);
      G.submit(s.bi !== G.item.b ? 'Las crestas no están a la distancia de los faroles' : 'La distancia está bien, pero la ola quedó corrida');
      return true;
    },
    peek: G => ({ solve: [...TK.steps(G.bb, G.s.bi, G.item.b), ...TK.steps(G.bh, G.s.h, G.item.h), G.go], wrong: G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/ventana-inversa.js
// La ventana de la inversa (Trigonometría, trig-45): para invertir una función hay que quedarse con un tramo que tenga todas las
// alturas y no repita ninguna. Se mueve una ventana sobre la gráfica (en medios de π). item = { fn, std? }
GAMES['ventana-inversa'] = (() => {
  const stdA = fn => (fn === 'cos' ? 0 : -1);
  const valid = (fn, a, w) => w === 2 && TK.mod(a, 2) === (fn === 'cos' ? 0 : 1);
  return questGame({
    aspect: 1.4,
    init: () => ({ a: -4, w: 4 }),
    ok: (s, it) => valid(it.fn, s.a, s.w) && (!it.std || s.a === stdA(it.fn)),
    answer: it => ({ a: stdA(it.fn), w: 2 }),
    solution: it => `$${TK.FN[it.fn]}^{-1}$: $[${TK.piTex(stdA(it.fn), 2)},\\ ${TK.piTex(stdA(it.fn) + 2, 2)}]$`,
    prompt: it => (it.std ? `Deja la ventana oficial de $${TK.FN[it.fn]}^{-1}$: tiene los ángulos agudos` : `Deja un tramo de $y = ${TK.FN[it.fn]} x$ con todas las alturas, sin repetir`),
    foot: (it, s) => `Ventana: de $${TK.piTex(s.a, 2)}$ a $${TK.piTex(s.a + s.w, 2)}$`,
    yes: (it, s) => (s.a === stdA(it.fn) ? '¡Es justo la ventana oficial!' : 'Sirve: tiene todas las alturas una sola vez'),
    layout(G) {
      const w = (G.W - 36) / 2, y = G.bottom - 98; G.ba = { x: 12, y, w, h: 36 }; G.bw = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.box = { x: 16, y: G.top + 6, w: G.W - 32, h: y - G.top - 30 };
    },
    draw(G) {
      const { p, C, s, item: it, box } = G, yr = it.fn === 'tan' ? 3.2 : 1.5, f = TK.F[it.fn];
      const X = q => box.x + (q + 4) / 8 * box.w, Y = v => box.y + (box.h - 16) / 2 - v * (box.h - 16) / (2 * yr);
      p.noStroke(); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
      const band = p.color(G.solved ? C.ok : C.sky); band.setAlpha(60); p.fill(band); const ga = TK.glide(G, 'a', s.a), gw = TK.glide(G, 'w', s.w); p.rect(X(ga), box.y, X(ga + gw) - X(ga), box.h - 16);
      p.stroke(C.line); p.strokeWeight(1.5); p.line(box.x, Y(0), box.x + box.w, Y(0)); p.line(X(0), box.y, X(0), box.y + box.h - 16);
      for (let q = -4; q <= 4; q += 2) TK.label(p, C, `$${TK.piTex(q, 2)}$`, Math.max(box.x + 14, Math.min(box.x + box.w - 14, X(q))), box.y + box.h - 8, C.mute, 11, 40);
      // La curva: gruesa dentro de la ventana, delgada afuera.
      let prev = null;
      for (let i = 0; i <= 320; i++) {
        const q = -4 + i / 40, v = f(q * Math.PI / 2), pt = Math.abs(v) <= yr ? [X(q), Y(v), q] : null;
        if (prev && pt && Math.abs(pt[1] - prev[1]) < box.h / 2) { const inn = q > s.a && q <= s.a + s.w; p.stroke(inn ? (G.solved ? C.ok : C.mint) : C.mute); p.strokeWeight(inn ? 4 : 1.5); p.line(prev[0], prev[1], pt[0], pt[1]); }
        prev = pt;
      }
      drawStepper(p, C, G.ba, `$${TK.piTex(s.a, 2)}$`, 'empieza en'); drawStepper(p, C, G.bw, `$${TK.piTex(s.w, 2)}$`, 'ancho');
      drawBtn(p, C, G.go, 'Probar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, da = stepHit(G.ba, x, y), dw = stepHit(G.bw, x, y);
      if (da || dw) { if (dw) s.w = Math.max(1, Math.min(4, s.w + dw)); else s.a += da; s.a = Math.max(-4, Math.min(4 - s.w, s.a)); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      G.submit(s.w < 2 ? 'Faltan alturas: ese tramo no las recorre todas' : !valid(it.fn, s.a, s.w) ? 'Una altura se repite: no habría un solo ángulo que devolver' : 'Sirve, pero la oficial es la que contiene los ángulos agudos');
      return true;
    },
    // Primero el ancho (al achicarlo, el inicio no se mueve) y después el inicio.
    peek: G => ({ solve: [...TK.steps(G.bw, G.s.w, 2), ...TK.steps(G.ba, G.s.a, stdA(G.item.fn)), G.go], wrong: G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/escala-triangulo.js
// Escala el triángulo (Trigonometría, trig-4): el triángulo de lados cos θ, sen θ y 1 se divide entero entre cos θ o entre sen θ. Sale
// otro triángulo semejante con lados 1, tan θ, sec θ o cot θ, 1, csc θ: de ahí las otras identidades pitagóricas.
// item = { want: 'tan'|'sec'|'cot'|'csc' }
GAMES['escala-triangulo'] = (() => {
  const LAB = { cos: ['1', 'tan', 'sec'], sen: ['cot', '1', 'csc'] }, ID = { cos: '1 + \\tan^2\\theta = \\sec^2\\theta', sen: '\\cot^2\\theta + 1 = \\csc^2\\theta' };
  const divOf = w => (LAB.cos.includes(w) ? 'cos' : 'sen'), tex = n => (n === '1' ? '1' : `${TK.FN[n]}\\theta`), TH = 35;
  return questGame({
    aspect: 1.3,
    init: () => ({ div: null, pick: null }),
    ok: (s, it) => !!s.div && LAB[s.div][s.pick] === it.want,
    answer: it => ({ div: divOf(it.want), pick: LAB[divOf(it.want)].indexOf(it.want) }),
    solution: it => `$${tex(it.want)}$: dividir entre $${tex(divOf(it.want))}$; $${ID[divOf(it.want)]}$`,
    prompt: it => `Divide el triángulo y toca el lado que queda valiendo $${tex(it.want)}$`,
    foot: (it, s) => (s.div ? `Todo se dividió entre $${tex(s.div)}$: misma forma, más grande` : 'Los lados miden $\\cos\\theta$, $\\operatorname{sen}\\theta$ y 1 (la hipotenusa)'),
    no: () => 'Ese es otro lado: piensa qué da dividir cada uno',
    retry: G => { G.s.pick = null; },
    layout(G) {
      G.btn = TK.row(G, 3);
      const h = Math.min(G.btn[0].y - G.top - 86, 150), w = Math.min(G.W - 150, h / Math.tan(TK.rad(TH))), hh = w * Math.tan(TK.rad(TH)), x0 = (G.W - w) / 2, yb = G.btn[0].y - 34;
      G.A = [x0, yb]; G.B = [x0 + w, yb]; G.T = [x0 + w, yb - hh]; G.seg = [[G.A, G.B], [G.B, G.T], [G.A, G.T]];
    },
    draw(G) {
      const { p, C, s, item: it, A, B, T, seg } = G, cen = [(A[0] + B[0] + T[0]) / 3, (A[1] + B[1] + T[1]) / 3];
      TK.label(p, C, G.solved ? `$${ID[s.div]}$` : `¿Cuál lado vale $${tex(it.want)}$?`, G.W / 2, G.top + 22, G.solved ? C.ok : C.ink, 18, G.W - 30);
      p.noStroke(); p.fill(C.card); p.triangle(...A, ...B, ...T);
      if (s.div) {   // el triángulo de antes, más pequeño
        const k = s.div === 'cos' ? Math.cos(TK.rad(TH)) : Math.sin(TK.rad(TH)), q = pt => [A[0] + (pt[0] - A[0]) * k, A[1] + (pt[1] - A[1]) * k];
        p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([4, 4]); p.triangle(...A, ...q(B), ...q(T)); p.drawingContext.setLineDash([]);
      }
      const lab = i => (!s.div ? ['\\cos\\theta', '\\operatorname{sen}\\theta', '1'][i] : LAB[s.div][i] === '1' ? '1' : G.solved ? tex(LAB[s.div][i]) : '?');
      seg.forEach(([a, b], i) => { const on = s.pick === i, col = on ? (G.solved ? C.ok : C.coral) : C.ink; p.stroke(col); p.strokeWeight(on ? 6 : 3); p.line(...a, ...b); TK.sideLabel(p, C, `$${lab(i)}$`, a, b, cen, col, 15); });
      p.noFill(); p.stroke(C.mute); p.strokeWeight(1.5); p.rect(B[0] - 11, B[1] - 11, 11, 11); TK.label(p, C, 'θ', A[0] + 30, A[1] - 9, C.N, 15, 30);
      drawBtn(p, C, G.btn[0], '÷ $\\cos\\theta$', s.div === 'cos', s.div === 'cos' ? C.mint : C.cream); drawBtn(p, C, G.btn[1], '÷ $\\operatorname{sen}\\theta$', s.div === 'sen', s.div === 'sen' ? C.mint : C.cream); drawBtn(p, C, G.btn[2], '↶ volver', false, C.sky);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, b = G.btn.findIndex(q => hitBox(q, x, y));
      if (b >= 0) { s.div = [`cos`, `sen`, null][b]; s.pick = null; G.api.sfx?.tap?.(); return true; }
      const i = TK.hitSeg(G.seg, x, y);
      if (i < 0) return false;
      if (!s.div) { G.a.say('Primero divide todos los lados entre cos θ o entre sen θ', G.C.N); return true; }
      if (LAB[s.div][i] === '1') { G.a.say('Ese lado quedó valiendo 1', G.C.N); return true; }
      s.pick = i;
      if (LAB[s.div].includes(it.want)) G.submit(); else G.bad('En este triángulo no aparece ese lado: divide entre la otra');
      return true;
    },
    peek: G => { const d = divOf(G.item.want); return { solve: [...(G.s.div === d ? [] : [G.btn[d === 'cos' ? 0 : 1]]), TK.mid(...G.seg[LAB[d].indexOf(G.item.want)])] }; },
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/todo-en-senos.js
// Todo en senos y cosenos (Trigonometría, trig-47b): cada función se escribe como fracción de senos y cosenos (la arma el
// estudiante: qué va arriba y qué va abajo) y después se cancela lo igual de arriba con lo de abajo. Lo que queda es la
// forma simple. item = { f: ['sec', 'cot', …] }  (un producto; 'ps' = 1 − sen², 'pc' = 1 − cos²)
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
GAMES['todo-en-senos'] = (() => {
  const TOK = { sen: [['s'], []], cos: [['c'], []], tan: [['s'], ['c']], cot: [['c'], ['s']], sec: [[], ['c']], csc: [[], ['s']], ps: [['c', 'c'], []], pc: [['s', 's'], []] };
  const NAME = { ps: '(1 - \\operatorname{sen}^2 x)', pc: '(1 - \\cos^2 x)' }, tname = f => NAME[f] || `${TK.FN[f]} x`, plain = f => f === 'sen' || f === 'cos';
  // Opciones para armar la fracción de una ficha y la clave de cada lista de factores.
  const UP = ['1', 's', 'c', 'ss', 'cc'], DN = ['1', 's', 'c'], key = l => l.join('') || '1';
  const OPT = { 1: '1', s: '\\operatorname{sen} x', c: '\\cos x', ss: '\\operatorname{sen}^2 x', cc: '\\cos^2 x' };
  const chips = it => it.f.flatMap((f, t) => [...TOK[f][0].map(k => ({ k, up: true, tok: t })), ...TOK[f][1].map(k => ({ k, up: false, tok: t }))]).map((c, id) => ({ ...c, id }));
  const alive = (it, s) => chips(it).filter(c => !s.dead.includes(c.id));
  const count = (list, k, up) => list.filter(c => c.k === k && c.up === up).length;
  const pow = (n, e) => (e === 1 ? `${n} x` : `${n}^${e} x`);
  function result(list) {
    const e = [count(list, 's', true) - count(list, 's', false), count(list, 'c', true) - count(list, 'c', false)];
    const one = { '1,-1': '\\tan x', '-1,1': '\\cot x', '0,-1': '\\sec x', '-1,0': '\\csc x', '0,0': '1' }[e.join()];
    if (one) return one;
    const part = sg => [e[0] * sg > 0 ? pow('\\operatorname{sen}', Math.abs(e[0])) : '', e[1] * sg > 0 ? pow('\\cos', Math.abs(e[1])) : ''].filter(Boolean).join('\\,');
    return part(-1) ? `\\tfrac{${part(1) || 1}}{${part(-1)}}` : part(1);
  }
  const done = (it, s) => { const l = alive(it, s); return ['s', 'c'].every(k => !(count(l, k, true) && count(l, k, false))); };
  const fair = (it, s) => { const d = chips(it).filter(c => s.dead.includes(c.id)); return ['s', 'c'].every(k => count(d, k, true) === count(d, k, false)); };
  function pairs(it, s) {
    const l = alive(it, s), out = [];
    for (const k of ['s', 'c']) { const u = l.filter(c => c.k === k && c.up), d = l.filter(c => c.k === k && !c.up); for (let i = 0; i < Math.min(u.length, d.length); i++) out.push([u[i], d[i]]); }
    return out;
  }
  return questGame({
    aspect: 1.5,
    init: it => ({ open: it.f.map(plain), dead: [], sel: null, cur: null, up: null, dn: null }),
    ok: (s, it) => s.open.every(Boolean) && fair(it, s) && done(it, s),
    answer: it => { const s = { open: it.f.map(() => true), dead: [], sel: null, cur: null, up: null, dn: null }; s.dead = pairs(it, s).flat().map(c => c.id); return s; },
    solution: it => `$${it.f.map(tname).join(' \\cdot ')} = ${result(chips(it))}$`,
    prompt: it => `Simplifica $${it.f.map(tname).join(' \\cdot ')}$ con senos y cosenos`,
    foot: (it, s) => (s.cur != null ? 'Elige qué va arriba y qué va abajo de esa ficha' : s.open.every(Boolean) ? 'Toca una ficha de arriba y una igual de abajo; al terminar, «Listo»' : 'Toca una ficha amarilla para escribirla con senos y cosenos'),
    layout(G) {
      const it = G.item, n = it.f.length, tw = Math.min(112, (G.W - 24 - (n - 1) * 8) / n), x0 = (G.W - n * tw - (n - 1) * 8) / 2;
      G.tok = it.f.map((f, i) => ({ x: x0 + i * (tw + 8), y: G.top + 4, w: tw, h: 38 }));
      G.go = { x: G.W / 2 - 70, y: G.bottom - 46, w: 140, h: 38 };
      const cs = chips(it), mid = G.top + 112;
      G.bar = mid; G.chip = {};
      for (const up of [true, false]) { const r = cs.filter(c => c.up === up), w = Math.min(58, (G.W - 30) / Math.max(1, r.length) - 6), a = (G.W - r.length * (w + 6) + 6) / 2; r.forEach((c, i) => { G.chip[c.id] = { x: a + i * (w + 6), y: up ? mid - 44 : mid + 10, w, h: 34 }; }); }
      const rowOf = (list, y) => { const w = (G.W - 78 - (list.length - 1) * 5) / list.length; return list.map((k, i) => ({ k, x: 66 + i * (w + 5), y, w, h: 34 })); };
      G.upT = rowOf(UP, G.go.y - 96); G.dnT = rowOf(DN, G.go.y - 52);
    },
    draw(G) {
      const { p, C, s, item: it } = G, cs = chips(it), l = alive(it, s);
      it.f.forEach((f, i) => drawTile(p, C, G.tok[i], `$${tname(f)}$`, s.open[i] ? { fill: C.card, ink: C.mute, size: 14, lift: 0 } : { fill: C.sun, size: 15, ring: s.cur === i ? C.N : null }));
      p.stroke(C.ink); p.strokeWeight(3); p.line(30, G.bar, G.W - 30, G.bar);
      for (const c of cs) {
        if (!s.open[c.tok]) continue;
        const b = G.chip[c.id], gone = s.dead.includes(c.id);
        drawTile(p, C, b, c.k === 's' ? '$\\operatorname{sen} x$' : '$\\cos x$', gone ? { fill: C.card, ink: C.mute, size: 13, lift: 0 } : { fill: c.k === 's' ? C.sky : C.mint, size: 13, ring: s.sel === c.id ? C.N : null });
        if (gone) { p.stroke(C.bad); p.strokeWeight(2.5); p.line(b.x + 4, b.y + b.h - 4, b.x + b.w - 4, b.y + 4); }
      }
      if (s.open.every(Boolean) && !l.some(c => c.up)) TK.label(p, C, '1', G.W / 2, G.bar - 26, C.ink, 20, 40);
      if (G.solved) TK.label(p, C, `$= ${result(l)}$`, G.W / 2, G.bar + 70, C.ok, 22, G.W - 40);
      // Para abrir una ficha: se arma su fracción.
      if (s.cur != null) {
        TK.label(p, C, `$${tname(it.f[s.cur])} = \\tfrac{?}{?}$`, G.W / 2, G.upT[0].y - 26, C.ink, 17, G.W - 40);
        TK.label(p, C, 'arriba', 36, G.upT[0].y + 17, C.mute, 11, 50); TK.label(p, C, 'abajo', 36, G.dnT[0].y + 17, C.mute, 11, 50);
        G.upT.forEach(b => drawTile(p, C, b, `$${OPT[b.k]}$`, { fill: s.up === b.k ? C.coral : C.cream, size: 12, r: 8, lift: 2 }));
        G.dnT.forEach(b => drawTile(p, C, b, `$${OPT[b.k]}$`, { fill: s.dn === b.k ? C.coral : C.cream, size: 12, r: 8, lift: 2 }));
      }
      drawBtn(p, C, G.go, 'Listo', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, t = G.tok.findIndex(b => hitBox(b, x, y));
      if (t >= 0) { if (!s.open[t]) { s.cur = t; s.up = s.dn = null; G.api.sfx?.tap?.(); } return true; }
      if (s.cur != null) {
        const u = G.upT.find(b => hitBox(b, x, y)), d = G.dnT.find(b => hitBox(b, x, y));
        if (u || d) {
          if (u) s.up = u.k; else s.dn = d.k;
          if (s.up && s.dn) {
            const f = it.f[s.cur], good = s.up === key(TOK[f][0]) && s.dn === key(TOK[f][1]);
            if (good) { s.open[s.cur] = true; s.cur = null; G.api.sfx?.tap?.(); } else { s.up = s.dn = null; G.bad('Esa fracción no es esa función: repasa su definición'); }
          }
          return true;
        }
      }
      if (hitBox(G.go, x, y)) {
        if (!s.open.every(Boolean)) G.a.say('Abre primero todas las fichas amarillas', G.C.N); else G.submit('Todavía hay algo igual arriba y abajo');
        return true;
      }
      const c = alive(it, s).find(q => s.open[q.tok] && hitBox(G.chip[q.id], x, y));
      if (!c) return false;
      if (s.sel == null || s.sel === c.id) { s.sel = s.sel === c.id ? null : c.id; G.api.sfx?.tap?.(); return true; }
      const o = chips(it)[s.sel]; s.sel = null;
      if (o.k === c.k && o.up !== c.up) { s.dead.push(o.id, c.id); G.api.sfx?.tap?.(); } else G.bad('Solo se cancela lo mismo: uno arriba y otro abajo');
      return true;
    },
    peek: G => {
      const it = G.item, all = { ...G.s, open: G.s.open.map(() => true) };
      const opens = it.f.flatMap((f, i) => (G.s.open[i] ? [] : [G.tok[i], G.upT.find(b => b.k === key(TOK[f][0])), G.dnT.find(b => b.k === key(TOK[f][1]))]));
      return { solve: [...opens, ...pairs(it, all).flat().map(c => G.chip[c.id]), G.go] };
    },
  });
})();
;
//#archivo js/games/rectangulo-suma.js
// El rectángulo de la suma (Trigonometría, trig-48a): un triángulo de hipotenusa 1 inclinado dentro de un rectángulo. Sus
// catetos miden cos β y sen β, y cada uno es la hipotenusa de un triángulo pequeño de ángulo α. El estudiante le pone su
// medida a los dos tramos que forman el lado «?»: sen(α + β) es una suma; cos(α + β), una resta.
// item = { ask: 'sen'|'cos', a?, b?, vals?: [cc, sc, cs, ss] (TeX), res? }
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
GAMES['rectangulo-suma'] = (() => {
  const LAB = ['\\cos\\alpha\\cos\\beta', '\\operatorname{sen}\\alpha\\cos\\beta', '\\cos\\alpha\\operatorname{sen}\\beta', '\\operatorname{sen}\\alpha\\operatorname{sen}\\beta'];
  const ORDER = [2, 0, 3, 1];   // orden de las fichas, para que no coincida con el de los tramos
  const want = it => (it.ask === 'sen' ? [1, 2] : [0, 3]), lab = (it, i) => it.vals?.[i] ?? LAB[i];
  const name = it => `${TK.FN[it.ask]}${it.a ? ` ${it.a + it.b}^\\circ` : '(\\alpha + \\beta)'}`;
  const right = (s, it, i) => s.lab[i] != null && lab(it, s.lab[i]) === lab(it, i);
  return questGame({
    aspect: 1.45,
    init: () => ({ sel: null, lab: {} }),
    ok: (s, it) => want(it).every(i => right(s, it, i)),
    answer: it => ({ sel: null, lab: Object.fromEntries(want(it).map(i => [i, i])) }),
    solution: it => `$${name(it)} = ${lab(it, want(it)[0])} ${it.ask === 'sen' ? '+' : '-'} ${lab(it, want(it)[1])}${it.res ? ` = ${it.res}` : ''}$`,
    prompt: () => 'Toca cada tramo de color y luego la ficha con su medida',
    foot: it => (it.ask === 'sen' ? 'El lado «?» mide lo mismo que los dos tramos de color juntos' : 'El lado «?» es el tramo largo menos el tramo corto'),
    layout(G) {
      const it = G.item, al = TK.rad(it.a ?? 35), be = TK.rad(it.b ?? 25), xA = Math.cos(al) * Math.cos(be), yA = Math.sin(al) * Math.cos(be), xB = Math.cos(al + be), yB = Math.sin(al + be);
      const w = (G.W - 24 - 18) / 4, ty = G.bottom - 46;
      G.tile = ORDER.map((k, i) => ({ k, x: 12 + i * (w + 6), y: ty, w, h: 40 }));
      const u = Math.min((G.W - 90) / xA, (ty - G.top - 96) / yB), x0 = (G.W - xA * u) / 2, yb = ty - 26, P = (x, y) => [x0 + x * u, yb - y * u];
      const O = P(0, 0), F = P(xA, 0), A = P(xA, yA), TR = P(xA, yB), B = P(xB, yB), TL = P(0, yB);
      Object.assign(G, { O, F, A, TR, B, TL, seg: [[O, F], [F, A], [A, TR], [TR, B]] });
    },
    draw(G) {
      const { p, C, s, item: it, O, F, A, TR, B, TL, seg } = G, need = want(it), cols = [C.sky, C.coral];
      const sq = k => (right(s, it, need[k]) ? lab(it, need[k]) : '\\square');
      TK.label(p, C, `$${name(it)} = ${sq(0)} ${it.ask === 'sen' ? '+' : '-'} ${sq(1)}${G.solved && it.res ? ` = ${it.res}` : ''}$`, G.W / 2, G.top + 24, G.solved ? C.ok : C.ink, 17, G.W - 20);
      p.noStroke(); p.fill(C.card); p.triangle(...O, ...A, ...B);
      p.stroke(C.mute); p.strokeWeight(1.5); p.line(...O, ...TL); p.line(...TL, ...B); seg.forEach(([a, b]) => p.line(...a, ...b));
      p.stroke(C.ink); p.strokeWeight(2.5); p.line(...O, ...B); p.line(...O, ...A); p.line(...A, ...B);
      // Lo que se sabe: hipotenusa 1 y los dos catetos del triángulo inclinado.
      const mid = (a, b, dx, dy) => [(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy];
      TK.label(p, C, '1', ...mid(O, B, -9, -5), C.ink, 13, 20);
      TK.label(p, C, it.vals ? `$\\cos ${it.b}^\\circ$` : '$\\cos\\beta$', ...mid(O, A, 4, -11), C.ink, 12, 70); TK.label(p, C, it.vals ? `$\\operatorname{sen} ${it.b}^\\circ$` : '$\\operatorname{sen}\\beta$', ...mid(A, B, -22, -2), C.ink, 12, 70);
      TK.label(p, C, it.a ? `${it.a}°` : 'α', O[0] + 44, O[1] - 8, C.N, 12, 34); TK.label(p, C, it.b ? `${it.b}°` : 'β', O[0] + 30, O[1] - 27, C.N, 12, 34);
      TK.label(p, C, it.a ? `${it.a}°` : 'α', A[0] - 9, A[1] - 28, C.N, 11, 30);
      const tg = it.ask === 'sen' ? [O, TL] : [TL, B]; p.stroke(C.N); p.strokeWeight(6); p.line(...tg[0], ...tg[1]);
      TK.label(p, C, '?', it.ask === 'sen' ? O[0] - 13 : (TL[0] + B[0]) / 2, it.ask === 'sen' ? (O[1] + TL[1]) / 2 : TL[1] - 13, C.N, 17, 20);
      // Los dos tramos por medir.
      need.forEach((i, k) => {
        const [a, b] = seg[i], ok = right(s, it, i), col = G.solved ? C.ok : cols[k];
        p.stroke(col); p.strokeWeight(s.sel === i ? 8 : 5); p.line(...a, ...b);
        const horiz = i === 0 || i === 3, lx = horiz ? (a[0] + b[0]) / 2 : a[0] + 14, ly = horiz ? a[1] + (i === 0 ? 14 : -13) : (a[1] + b[1]) / 2;
        if (horiz) TK.label(p, C, ok ? `$${lab(it, i)}$` : '¿?', Math.max(lx, 44), ly, col, 12, 110);
        else { p.noStroke(); p.fill(col === C.sky ? C.Z : col === C.coral ? C.I : col); p.textStyle(p.BOLD); p.textAlign(p.LEFT, p.CENTER); fitText(p, ok ? `$${lab(it, i)}$` : '¿?', lx - 6, ly, G.W - lx, 12); }
      });
      G.tile.forEach(t => drawTile(p, C, t, `$${lab(it, t.k)}$`, { fill: C.cream, size: 12, r: 9 }));
    },
    press(G, x, y) {
      const s = G.s, it = G.item, t = G.tile.find(b => hitBox(b, x, y));
      if (t) {
        if (s.sel == null) { G.a.say('Toca primero un tramo de color', G.C.N); return true; }
        const i = s.sel; s.sel = null;
        if (lab(it, t.k) !== lab(it, i)) { G.bad('Mira de cuál triángulo pequeño es cateto ese tramo, y cuál es su hipotenusa'); return true; }
        s.lab[i] = t.k; G.api.sfx?.tap?.();
        if (want(it).every(q => right(s, it, q))) G.good(it.ask === 'sen' ? 'El seno de la suma es una suma de dos productos' : 'El coseno de la suma es una resta');
        return true;
      }
      const i = want(it).find(q => !right(s, it, q) && TK.segDist(x, y, ...G.seg[q]) < 22);
      if (i == null) return false;
      s.sel = i; G.api.sfx?.tap?.();
      return true;
    },
    peek: G => ({ solve: want(G.item).filter(i => !right(G.s, G.item, i)).flatMap(i => [TK.mid(...G.seg[i]), G.tile.find(t => t.k === i)]) }),
  });
})();
;
//#archivo js/games/tira-doble.js
// La tira doble (Trigonometría, trig-48b): una tira de largo 1 se parte en cos²θ y sen²θ. Su diferencia es cos 2θ. Se elige el corte
// (en octavos) para que la resta dé lo pedido. item = { t }   (cos 2θ = t/4, con t de −4 a 3)
GAMES['tira-doble'] = (() => {
  const fr = (n, d) => { const g = TK.gcd(n, d) || 1; n /= g; d /= g; return d === 1 || !n ? `${n}` : `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`; };
  const TH = { 8: 0, 6: 30, 4: 45, 2: 60, 0: 90 };
  return questGame({
    aspect: 1.3,
    init: () => ({ k: 8, shot: null }),
    ok: (s, it) => s.k === it.t + 4,
    answer: it => ({ k: it.t + 4, shot: it.t + 4 }),
    solution: it => `$\\cos^2\\theta = ${fr(it.t + 4, 8)}$ y $\\operatorname{sen}^2\\theta = ${fr(4 - it.t, 8)}$`,
    prompt: it => `Corta la tira para que $\\cos 2\\theta = ${fr(it.t, 4)}$ y luego resta`,
    foot: () => '$\\cos 2\\theta = \\cos^2\\theta - \\operatorname{sen}^2\\theta$, y las dos partes suman 1',
    layout(G) { const y = G.bottom - 46; G.st = { x: 12, y, w: G.W * 0.56, h: 38 }; G.go = { x: G.st.x + G.st.w + 10, y, w: G.W - 34 - G.st.w, h: 38 }; G.x0 = 24; G.w = G.W - 48; G.y1 = G.top + 34; },
    draw(G) {
      const { p, C, s, x0, w, y1 } = G, cut = x0 + w * TK.glide(G, 'k', s.k) / 8;
      // La tira: cos² a la izquierda, sen² a la derecha.
      p.noStroke(); p.fill(C.sky); p.rect(x0, y1, cut - x0, 40, 8, 0, 0, 8); p.fill(C.coral); p.rect(cut, y1, x0 + w - cut, 40, 0, 8, 8, 0);
      for (let i = 1; i < 8; i++) { p.stroke(C.bg); p.strokeWeight(1.5); p.line(x0 + w * i / 8, y1, x0 + w * i / 8, y1 + 40); }
      TK.label(p, C, `$\\cos^2\\theta = ${fr(s.k, 8)}$`, x0 + w * 0.25, y1 - 16, C.sky, 14, w / 2 - 6); TK.label(p, C, `$\\operatorname{sen}^2\\theta = ${fr(8 - s.k, 8)}$`, x0 + w * 0.75, y1 - 16, C.coral, 14, w / 2 - 6);
      if (s.shot != null) {
        const y2 = y1 + 62, a = w * s.shot / 8, b = w * (8 - s.shot) / 8, d = s.shot - 4;
        p.noStroke(); p.fill(C.sky); p.rect(x0, y2, Math.max(a, 1), 22, 5); p.fill(C.coral); p.rect(x0, y2 + 26, Math.max(b, 1), 22, 5);
        p.stroke(G.solved ? C.ok : C.N); p.strokeWeight(5); if (a !== b) p.line(x0 + Math.min(a, b), y2 + 58, x0 + Math.max(a, b), y2 + 58);
        TK.label(p, C, `$\\cos 2\\theta = ${fr(s.shot, 8)} - ${fr(8 - s.shot, 8)} = ${fr(d, 4)}$${G.solved && TH[s.shot] != null ? `  →  θ = ${TH[s.shot]}°` : ''}`, G.W / 2, y2 + 82, G.solved ? C.ok : C.ink, 16, G.W - 24);
      }
      drawStepper(p, C, G.st, `$${fr(s.k, 8)}$`, 'corte (lo que mide cos²θ)');
      drawBtn(p, C, G.go, 'Restar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, d = stepHit(G.st, x, y);
      if (d) { s.k = Math.max(0, Math.min(8, s.k + d)); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      const k = s.k;
      s.shot = k; G.submit('Con ese corte la resta da otro número: mírala');
      return true;
    },
    peek: G => ({ solve: [...TK.steps(G.st, G.s.k, G.item.t + 4), G.go], wrong: G.go }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/red-periodica.js
// La red periódica (Trigonometría, trig-49): las soluciones de una ecuación trigonométrica se repiten. Cada red atrapa una
// familia: una primera solución y un salto fijo. Los peces (las soluciones) no se ven hasta lanzar: hay que resolver la
// ecuación primero. Posiciones en doceavos de π, de 0 a 4π. item = { eq (TeX), fams: [[x0, salto], …] }
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
GAMES['red-periodica'] = (() => {
  const JUMPS = [4, 6, 8, 12, 24], END = 48;
  const run = (a, j) => { const out = []; for (let q = TK.mod(a, j); q < END; q += j) out.push(q); return out; };
  const fish = it => [...new Set(it.fams.flatMap(([a, j]) => run(a, j)))].sort((a, b) => a - b);
  const hooks = s => [...new Set(s.nets.flatMap(n => run(n.a, JUMPS[n.j])))].sort((a, b) => a - b);
  return questGame({
    aspect: 1.45,
    init: it => ({ nets: it.fams.map(() => ({ a: 0, j: 4 })), cur: 0, seen: false }),
    ok: (s, it) => hooks(s).join() === fish(it).join(),
    answer: it => ({ nets: it.fams.map(([a, j]) => ({ a, j: JUMPS.indexOf(j) })), cur: 0, seen: true }),
    solution: it => `$${it.eq}$: ${it.fams.map(([a, j]) => `$x = ${TK.piTex(a, 12)} + ${TK.piTex(j, 12).replace('\\pi', 'k\\pi')}$`).join(' y ')}`,
    prompt: it => `Atrapa todas las soluciones de $${it.eq}$ con ${it.fams.length > 1 ? 'dos redes' : 'una red'}`,
    foot: (it, s) => (s.seen ? 'Ya se ven los peces: corrige la primera solución y el salto' : it.fams.length > 1 ? 'Hay dos familias de soluciones: usa las dos redes' : 'Resuelve primero: los peces se ven al lanzar'),
    layout(G) {
      const n = G.item.fams.length, w = (G.W - 36) / 2, y = G.bottom - 98;
      G.ba = { x: 12, y, w, h: 36 }; G.bj = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.tab = n > 1 ? [0, 1].map(i => ({ x: G.W / 2 - 104 + i * 108, y: y - 54, w: 100, h: 28 })) : [];
      G.box = { x: 12, y: G.top + 6, w: G.W - 24, h: y - G.top - (n > 1 ? 70 : 30) };
      G.X = q => G.box.x + 10 + q / END * (G.box.w - 20); G.fy = G.box.y + G.box.h * 0.6;
    },
    draw(G) {
      const { p, C, s, item: it, box, X, fy } = G, fs = fish(it), cols = [C.sky, C.mint], show = s.seen || G.solved;
      p.noStroke(); p.fill(C.card); p.rect(box.x, box.y, box.w, box.h, 10);
      p.stroke(C.line); p.strokeWeight(1.5); p.line(box.x, box.y + box.h - 22, box.x + box.w, box.y + box.h - 22);
      for (let k = 0; k <= 4; k++) { p.stroke(C.mute); p.strokeWeight(1.5); p.line(X(12 * k), box.y + box.h - 26, X(12 * k), box.y + box.h - 18); TK.label(p, C, `$${TK.piTex(k)}$`, X(12 * k), box.y + box.h - 9, C.mute, 11, 36); }
      // Redes: un anzuelo por salto. Si los peces ya se ven, el anzuelo sin pez sale en rojo.
      s.nets.forEach((n, i) => run(n.a, JUMPS[n.j]).forEach(q => {
        const c = show && !fs.includes(q) ? C.bad : cols[i];
        p.stroke(c); p.strokeWeight(i === s.cur ? 3 : 2); p.line(X(q), box.y + 6 + i * 5, X(q), fy - 10); p.noFill(); p.circle(X(q), fy, 18);
      }));
      if (show) for (const q of fs) { const x = X(q); p.noStroke(); p.fill(G.solved ? C.ok : C.coral); p.ellipse(x, fy, 15, 9); p.triangle(x - 6, fy, x - 12, fy - 5, x - 12, fy + 5); }
      G.tab.forEach((b, i) => drawTile(p, C, b, `Red ${i + 1}`, { fill: cols[i], size: 13, r: 9, lift: 2, ring: s.cur === i ? C.N : null }));
      const net = s.nets[s.cur], tag = G.tab.length ? ` (red ${s.cur + 1})` : '';
      drawStepper(p, C, G.ba, `$${TK.piTex(net.a, 12)}$`, `primera solución${tag}`); drawStepper(p, C, G.bj, `$${TK.piTex(JUMPS[net.j], 12)}$`, `salto${tag}`);
      drawBtn(p, C, G.go, 'Lanzar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, net = s.nets[s.cur], da = stepHit(G.ba, x, y), dj = stepHit(G.bj, x, y);
      if (da || dj) { s.seen = false; if (da) net.a = Math.max(0, Math.min(23, net.a + da)); else net.j = Math.max(0, Math.min(4, net.j + dj)); G.api.sfx?.tap?.(); return true; }
      const t = G.tab.findIndex(b => hitBox(b, x, y));
      if (t >= 0) { s.cur = t; return true; }
      if (!hitBox(G.go, x, y)) return false;
      const h = hooks(s), f = fish(it);
      s.seen = true; G.submit(h.some(q => !f.includes(q)) ? 'Un anzuelo cayó donde no hay pez' : 'Quedaron peces sin atrapar');
      return true;
    },
    peek: G => ({ solve: [...G.item.fams.flatMap(([a, j], i) => [...(G.tab.length ? [G.tab[i]] : []), ...TK.steps(G.ba, G.s.nets[i].a, a), ...TK.steps(G.bj, G.s.nets[i].j, JUMPS.indexOf(j))]), G.go], wrong: G.go }),
  });
})();
;
//#archivo js/games/pareja-opuesta.js
// La pareja opuesta (Trigonometría, trig-46a): un triángulo se resuelve tocando lo que ya se puede calcular. Un ángulo sale de los otros
// dos; un lado (o un ángulo con su lado) sale de la ley de senos si hay una pareja completa: lado y ángulo opuesto.
// item = { ang: [A, B, C], base: [i, valor del lado i], know: ['A', 'B', 'a'], want: 'c' }
GAMES['pareja-opuesta'] = (() => {
  const ANG = ['A', 'B', 'C'], SIDE = ['a', 'b', 'c'], idx = el => (ANG.includes(el) ? ANG.indexOf(el) : SIDE.indexOf(el));
  const sides = it => it.ang.map(a => it.base[1] * Math.sin(TK.rad(a)) / Math.sin(TK.rad(it.ang[it.base[0]])));
  const r1 = v => Math.round(v * 10) / 10;
  const value = (it, el) => (ANG.includes(el) ? `${r1(it.ang[idx(el)])}°` : numTxt(r1(sides(it)[idx(el)])));
  // ¿Se puede calcular `el` con lo conocido? 'sum' (tercer ángulo), 'sines' (ley de senos) o un motivo en texto.
  function can(known, el) {
    const i = idx(el), has = e => known.includes(e), pair = ANG.some((A, k) => k !== i && has(A) && has(SIDE[k]));
    if (ANG.includes(el)) {
      if (ANG.filter(A => A !== el && has(A)).length === 2) return 'sum';
      return has(SIDE[i]) && pair ? 'sines' : 'Para un ángulo necesitas los otros dos, o su lado y una pareja completa';
    }
    if (!has(ANG[i])) return 'Te falta el ángulo opuesto a ese lado';
    return pair ? 'sines' : 'No tienes una pareja completa: un lado con su ángulo opuesto';
  }
  const good = r => r === 'sum' || r === 'sines';
  function route(it, known) {
    const k = [...known], taps = [];
    for (let n = 0; n < 6 && !k.includes(it.want); n++) {
      const el = good(can(k, it.want)) ? it.want : [...ANG, ...SIDE].find(e => !k.includes(e) && good(can(k, e)));
      if (!el) break;
      k.push(el); taps.push(el);
    }
    return { known: k, taps };
  }
  function note(it, el, how, known) {
    const i = idx(el), k = ANG.findIndex((A, q) => q !== i && known.includes(A) && known.includes(SIDE[q]));
    if (how === 'sum') return `$${el} = 180^\\circ - ${ANG.filter(A => A !== el).join(' - ')} = ${r1(it.ang[i])}^\\circ$`;
    return ANG.includes(el) ? `Ley de senos: $${el} \\approx ${r1(it.ang[i])}^\\circ$` : `Ley de senos: $${el} = \\tfrac{${SIDE[k]}\\,\\operatorname{sen} ${ANG[i]}}{\\operatorname{sen} ${ANG[k]}}$ da $${numTxt(r1(sides(it)[i]))}$`;
  }
  return questGame({
    aspect: 1.35,
    init: it => ({ known: [...it.know], taps: [], note: '' }),
    ok: (s, it) => s.known.includes(it.want),
    answer: it => ({ ...route(it, it.know), note: '' }),
    solution: it => `${route(it, it.know).taps.join(' → ')}: $${it.want} ${ANG.includes(it.want) ? '=' : '\\approx'} ${value(it, it.want).replace('°', '^\\circ')}$`,
    prompt: it => `Halla $${it.want}$: toca, en orden, lo que ya se puede calcular`,
    foot: (it, s) => s.note || 'Pareja completa: un lado y su ángulo opuesto, los dos conocidos',
    layout(G) {
      const it = G.item, [a, b, c] = sides(it), Cx = b * Math.cos(TK.rad(it.ang[0])), Cy = b * Math.sin(TK.rad(it.ang[0]));
      const minX = Math.min(0, Cx), maxX = Math.max(c, Cx), u = Math.min((G.W - 120) / (maxX - minX), (G.bottom - G.top - 96) / Cy), x0 = (G.W - (maxX - minX) * u) / 2 - minX * u, yb = G.bottom - 44;
      const V = [[x0, yb], [x0 + c * u, yb], [x0 + Cx * u, yb - Cy * u]], cen = [(V[0][0] + V[1][0] + V[2][0]) / 3, (V[0][1] + V[1][1] + V[2][1]) / 3];
      const out = (pt, d) => { const n = Math.hypot(pt[0] - cen[0], pt[1] - cen[1]) || 1; return [pt[0] + (pt[0] - cen[0]) / n * d, pt[1] + (pt[1] - cen[1]) / n * d]; };
      G.V = V; G.pos = {};
      ANG.forEach((A, i) => { G.pos[A] = out(V[i], 20); });
      SIDE.forEach((sd, i) => { const [q, w] = [V[(i + 1) % 3], V[(i + 2) % 3]]; G.pos[sd] = out([(q[0] + w[0]) / 2, (q[1] + w[1]) / 2], 18); });
      for (const el in G.pos) G.pos[el][0] = Math.max(40, Math.min(G.W - 40, G.pos[el][0]));
      G.hit = el => ({ x: G.pos[el][0] - 38, y: G.pos[el][1] - 15, w: 76, h: 30 });
    },
    draw(G) {
      const { p, C, s, item: it, V } = G;
      p.fill(C.card); p.stroke(C.ink); p.strokeWeight(3); p.triangle(...V[0], ...V[1], ...V[2]);
      for (const el of [...ANG, ...SIDE]) {
        const has = s.known.includes(el), given = it.know.includes(el), [x, y] = G.pos[el];
        drawPill(p, C, `${el} = ${has ? value(it, el) : '?'}`, x, y, has ? (given ? C.sky : G.solved && el === it.want ? C.ok : C.mint) : el === it.want ? C.coral : C.cream, 13);
      }
    },
    press(G, x, y) {
      const s = G.s, it = G.item, el = [...ANG, ...SIDE].find(e => hitBox(G.hit(e), x, y));
      if (!el) return false;
      if (s.known.includes(el)) return true;
      const r = can(s.known, el);
      if (!good(r)) { G.bad(r); return true; }
      s.note = note(it, el, r, s.known); s.known.push(el); s.taps.push(el); G.api.sfx?.tap?.();
      if (el === it.want) G.good(`${el} = ${value(it, el)}`);
      return true;
    },
    peek: G => { const bad = [...ANG, ...SIDE].find(e => !G.s.known.includes(e) && !good(can(G.s.known, e))); return { solve: route(G.item, G.s.known).taps.map(G.hit), wrong: bad ? G.hit(bad) : null }; },
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/bisagra-area.js
// La bisagra del área (Trigonometría, trig-46b): Área = ½·a·b·sen C. Con la base fija, el área solo depende de la altura a·sen C. Se
// gira el lado a hasta la altura que da el área pedida: casi siempre sirven dos ángulos, C y 180° − C.
// item = { a, b, area, atex? }   (ángulos de 15° en 15°)
GAMES['bisagra-area'] = (() => {
  const sols = it => Array.from({ length: 11 }, (_, i) => 15 * (i + 1)).filter(c => Math.abs(0.5 * it.a * it.b * Math.sin(TK.rad(c)) - it.area) < 0.02);
  const at = it => it.atex ?? `${it.area}`;
  return questGame({
    aspect: 1.35,
    init: () => ({ c: 1, marks: [] }),
    ok: (s, it) => [...s.marks].sort((a, b) => a - b).join() === sols(it).join(),
    answer: it => ({ c: 1, marks: sols(it) }),
    solution: it => `$C = ${sols(it).map(c => `${c}^\\circ`).join('$ y $')}$`,
    prompt: it => `Área $${at(it)}$: gira el lado azul y marca cada ángulo que sirve`,
    foot: () => 'Área = ½ · base · altura, y la altura es $a\\,\\operatorname{sen} C$',
    layout(G) {
      const it = G.item, y = G.bottom - 46, w = (G.W - 24 - 16), sw = w * 0.5, bw = (w - sw) / 2;
      G.st = { x: 12, y, w: sw, h: 38 }; G.mk = { x: 20 + sw, y, w: bw, h: 38 }; G.go = { x: 28 + sw + bw, y, w: bw, h: 38 };
      G.u = Math.min((G.W - 44) / (it.a + it.b), (y - G.top - 56) / it.a); G.P = [22 + it.a * G.u + (G.W - 44 - (it.a + it.b) * G.u) / 2, y - 38];
    },
    draw(G) {
      const { p, C, s, item: it, P, u } = G, Q = [P[0] + it.b * u, P[1]], tip = c => [P[0] + it.a * u * Math.cos(TK.rad(c)), P[1] - it.a * u * Math.sin(TK.rad(c))], T = tip(TK.glide(G, 'c', 15 * s.c)), hy = P[1] - 2 * it.area / it.b * u;
      p.stroke(C.line); p.strokeWeight(1.5); p.line(10, P[1], G.W - 10, P[1]);
      p.stroke(C.coral); p.strokeWeight(2.5); p.drawingContext.setLineDash([7, 5]); p.line(10, hy, G.W - 10, hy); p.drawingContext.setLineDash([]);
      drawPill(p, C, `línea punteada: altura para área ${at(it).replace(/\\sqrt(\d)/, '√$1')}`, G.W / 2, G.top + 12, C.coral, 11);
      for (const m of s.marks) { const t = tip(m); p.stroke(C.ok); p.strokeWeight(3); p.line(...P, ...t); drawDot(p, C, t[0], t[1], 9, C.ok); TK.label(p, C, `${m}°`, t[0], t[1] - 14, C.ok, 12, 40); }
      p.noStroke(); p.fill(C.card); p.triangle(...P, ...Q, ...T);
      p.stroke(C.ink); p.strokeWeight(3); p.line(...P, ...Q); p.line(...Q, ...T); p.stroke(C.sky); p.strokeWeight(5); p.line(...P, ...T);
      p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([3, 4]); p.line(T[0], T[1], T[0], P[1]); p.drawingContext.setLineDash([]);
      drawDot(p, C, T[0], T[1], 11, C.sky);
      TK.label(p, C, `${it.b}`, (P[0] + Q[0]) / 2, P[1] + 13, C.ink, 13, 40); TK.label(p, C, `${it.a}`, (P[0] + T[0]) / 2 - 12, (P[1] + T[1]) / 2 - 8, C.sky, 13, 40);
      drawStepper(p, C, G.st, `${15 * s.c}°`, 'ángulo C'); drawBtn(p, C, G.mk, 'Marcar', false, C.mint); drawBtn(p, C, G.go, 'Listo', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item, d = stepHit(G.st, x, y), c = 15 * s.c;
      if (d) { s.c = Math.max(1, Math.min(11, s.c + d)); G.api.sfx?.tap?.(); return true; }
      if (hitBox(G.mk, x, y)) {
        if (s.marks.includes(c)) return true;
        if (sols(it).includes(c)) { s.marks.push(c); G.a.say(`Con ${c}° el área sí es la pedida`, G.C.ok); G.api.sfx?.tap?.(); }
        else G.bad(0.5 * it.a * it.b * Math.sin(TK.rad(c)) < it.area ? 'Con ese ángulo la altura no llega a la línea' : 'Con ese ángulo la altura se pasa de la línea');
        return true;
      }
      if (!hitBox(G.go, x, y)) return false;
      G.submit(s.marks.length ? 'Falta otro ángulo que deja el lado a la misma altura' : 'Primero marca un ángulo que sirva');
      return true;
    },
    peek: G => {
      const solve = []; let c = G.s.c;
      for (const m of sols(G.item).filter(q => !G.s.marks.includes(q))) { solve.push(...TK.steps(G.st, c, m / 15), G.mk); c = m / 15; }
      return { solve: [...solve, G.go], wrong: sols(G.item).includes(15 * G.s.c) ? null : G.mk };
    },
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/parientes-polares.js
// Parientes polares (Trigonometría, trig-151): en forma polar, el conjugado, el opuesto, i·z y el inverso se leen en el módulo y el
// ángulo. Se mueve un punto w con dos perillas. item = { r (0–4: ½, 1, 2, 3, 4), deg (múltiplo de 15), rel }
GAMES['parientes-polares'] = (() => {
  const RS = [0.5, 1, 2, 3, 4], RT = ['\\tfrac12', '1', '2', '3', '4'], RP = ['½', '1', '2', '3', '4'];
  const REL = {
    conj: { name: 'su conjugado', rule: 'El conjugado es el reflejo en el eje real: ángulo opuesto', to: it => [it.r, -it.deg] },
    op: { name: 'su opuesto $-z$', rule: 'El opuesto queda a media vuelta: ángulo + 180°', to: it => [it.r, it.deg + 180] },
    i: { name: '$i \\cdot z$', rule: 'Multiplicar por i es un cuarto de vuelta: ángulo + 90°', to: it => [it.r, it.deg + 90] },
    inv: { name: 'su inverso $\\tfrac{1}{z}$', rule: 'El inverso invierte el módulo y cambia el signo del ángulo', to: it => [RS.indexOf(1 / RS[it.r]), -it.deg] },
  };
  const goal = it => { const [r, d] = REL[it.rel].to(it); return [r, TK.mod(d, 360)]; };
  const cis = (r, d) => `${r === 1 ? '' : `${RT[r]}\\,`}\\mathrm{cis}\\,${d}^\\circ`;
  return questGame({
    aspect: 1.4,
    init: it => ({ r: it.r, d: it.deg / 15 }),
    ok: (s, it) => s.r === goal(it)[0] && TK.mod(15 * s.d, 360) === goal(it)[1],
    answer: it => ({ r: goal(it)[0], d: goal(it)[1] / 15 }),
    solution: it => `$${cis(...goal(it))}$`,
    prompt: it => `$z = ${cis(it.r, it.deg)}$. Lleva el punto $w$ hasta ${REL[it.rel].name}`,
    foot: (it, s) => `$w = ${cis(s.r, TK.mod(15 * s.d, 360))}$`,
    yes: it => REL[it.rel].rule,
    layout(G) {
      const w = (G.W - 36) / 2, y = G.bottom - 98; G.br = { x: 12, y, w, h: 36 }; G.bd = { x: 24 + w, y, w, h: 36 }; G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.R = Math.min(G.W * 0.3, (y - G.top - 40) / 2); G.cx = G.W / 2; G.cy = G.top + 10 + G.R;
    },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, u = R / 4, z = TK.at(cx, cy, RS[it.r] * u, it.deg), wt = TK.at(cx, cy, RS[s.r] * u, 15 * s.d), w = [TK.glide(G, 'wx', wt[0]), TK.glide(G, 'wy', wt[1])];
      for (let k = 1; k <= 4; k++) { p.noFill(); p.stroke(C.line); p.strokeWeight(1.2); p.circle(cx, cy, 2 * k * u); }
      for (let a = 0; a < 180; a += 30) { const [x1, y1] = TK.at(cx, cy, R, a), [x2, y2] = TK.at(cx, cy, R, a + 180); p.stroke(C.line); p.strokeWeight(a % 90 ? 0.8 : 1.8); p.line(x1, y1, x2, y2); }
      p.stroke(C.sky); p.strokeWeight(3); p.line(cx, cy, ...z); drawDot(p, C, z[0], z[1], 11, C.sky); TK.label(p, C, 'z', z[0] + (z[0] >= cx ? 13 : -13), z[1] - 12, C.sky, 15, 20);
      const col = G.solved ? C.ok : C.coral;
      p.stroke(col); p.strokeWeight(3); p.line(cx, cy, ...w); drawDot(p, C, w[0], w[1], 11, col); TK.label(p, C, 'w', w[0] + (w[0] >= cx ? 13 : -13), w[1] + 14, col, 15, 20);
      drawStepper(p, C, G.br, RP[s.r], 'módulo de w'); drawStepper(p, C, G.bd, `${TK.mod(15 * s.d, 360)}°`, 'ángulo de w');
      drawBtn(p, C, G.go, 'Fijar', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, dr = stepHit(G.br, x, y), dd = stepHit(G.bd, x, y);
      if (dr || dd) { if (dr) s.r = Math.max(0, Math.min(4, s.r + dr)); else s.d = TK.mod(s.d + dd, 24); G.api.sfx?.tap?.(); return true; }
      if (!hitBox(G.go, x, y)) return false;
      const [r, d] = goal(G.item);
      G.submit(s.r !== r ? 'El módulo no es ese' : TK.mod(15 * s.d, 360) === G.item.deg ? 'Ahí está z: su pariente queda en otro lado' : 'El ángulo no es ese: piensa qué le pasa al girar o reflejar');
      return true;
    },
    peek: G => {
      const [r, d] = goal(G.item), n = TK.mod(d / 15 - G.s.d, 24), box = n <= 12 ? TK.plus(G.bd) : TK.minus(G.bd);
      return { solve: [...TK.steps(G.br, G.s.r, r), ...Array(n <= 12 ? n : 24 - n).fill(box), G.go], wrong: G.go };
    },
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/multiplicador-oculto.js
// El multiplicador oculto (Trigonometría, trig-152): multiplicar por w = r cis θ gira la figura θ y la estira r veces. Se ve una
// banderita (en gris) y su imagen después de multiplicarla por w una o dos veces (en color); hay que tocar en la telaraña el
// punto w. Con dos veces (w²) hay dos respuestas: las dos raíces cuadradas. item = { r (½, 1, 1.5 o 2), deg (múltiplo de 30), k? }
GAMES['multiplicador-oculto'] = (() => {
  const RS = [0.5, 1, 1.5, 2], RP = { 0.5: '½', 1: '1', 1.5: '1.5', 2: '2' };
  const FLAG = [[0.45, 0], [1, 0], [1, 0.32], [0.8, 0.5], [0.6, 0.32]];        // una banderita junto al 1
  const mul = (pt, r, deg) => { const a = TK.rad(deg), [x, y] = pt; return [r * (x * Math.cos(a) - y * Math.sin(a)), r * (x * Math.sin(a) + y * Math.cos(a))]; };
  const kOf = it => it.k || 1;
  const fits = (r, deg, it) => Math.abs(r ** kOf(it) - it.r ** kOf(it)) < 1e-9 && TK.mod(kOf(it) * deg, 360) === TK.mod(kOf(it) * it.deg, 360);
  const nodes = () => RS.flatMap(r => Array.from({ length: 12 }, (_, j) => [r, 30 * j]));
  const answers = it => nodes().filter(([r, d]) => fits(r, d, it));
  return questGame({
    aspect: 1.35,
    init: () => ({ pick: null, found: [] }),
    ok: (s, it) => s.found.length >= answers(it).length,
    answer: it => ({ pick: null, found: answers(it) }),
    solution: it => answers(it).map(([r, d]) => `$w = ${r === 1 ? '' : RP[r] + '\\,'}\\mathrm{cis}\\,${d}^\\circ$`).join(' o '),
    prompt: it => kOf(it) === 1 ? 'La bandera gris se multiplicó por $w$. Toca $w$' : 'La bandera gris se multiplicó dos veces por $w$. Toca cada $w$ posible',
    foot: (it, s) => kOf(it) === 1 ? 'El ángulo de $w$ es el giro; su módulo, cuántas veces se estiró' : `Encontrados: ${s.found.length} de ${answers(it).length}. Gira el doble y se estira el cuadrado`,
    layout(G) {
      G.R = Math.min(G.W * 0.4, (G.bottom - G.top - 30) / 2); G.cx = G.W / 2; G.cy = (G.top + G.bottom) / 2 + 6; G.u = G.R / 2.15;
      G.node = ([r, d]) => { const [x, y] = TK.at(G.cx, G.cy, r * G.u, d); const h = r < 1 ? 7 : 9; return { x: x - h, y: y - h, w: 2 * h, h: 2 * h }; };
    },
    draw(G) {
      const { p, C, s, item: it, cx, cy, u } = G, k = kOf(it);
      for (const r of RS) { p.noFill(); p.stroke(C.line); p.strokeWeight(r === 1 ? 2 : 1); p.circle(cx, cy, 2 * r * u); }
      for (let a = 0; a < 180; a += 30) { const [x1, y1] = TK.at(cx, cy, 2 * u, a), [x2, y2] = TK.at(cx, cy, 2 * u, a + 180); p.stroke(C.line); p.strokeWeight(a % 90 ? 0.8 : 1.6); p.line(x1, y1, x2, y2); }
      const scr = ([x, y]) => [cx + x * u, cy - y * u];
      const poly = (pts, col, w) => { p.stroke(col); p.strokeWeight(w); p.fill(col); p.beginShape(); pts.forEach(q => p.vertex(...scr(q))); p.endShape(p.CLOSE); };
      let img = FLAG; for (let j = 0; j < k; j++) img = img.map(q => mul(q, it.r, it.deg));
      poly(FLAG, C.mute, 2);
      poly(img, G.solved ? C.ok : C.coral, 2);
      // Los nodos van encima de las banderas (con borde), para que la respuesta siempre se vea.
      for (const n of nodes()) { const [x, y] = TK.at(cx, cy, n[0] * u, n[1]); p.stroke(C.bg); p.strokeWeight(1.5); p.fill(C.ink); p.circle(x, y, 6); }
      TK.label(p, C, 'antes', ...scr([1.15, -0.18]), C.mute, 11, 50);
      const [lx, ly] = scr(mul([1.2, 0.2], it.r ** k, k * it.deg)); TK.label(p, C, k === 1 ? 'después' : 'después de 2 veces', lx, ly, G.solved ? C.ok : C.coral, 11, 110);
      for (const [r, d] of s.found) { const [x, y] = TK.at(cx, cy, r * u, d); p.stroke(C.ok); p.strokeWeight(3); p.line(cx, cy, x, y); drawDot(p, C, x, y, 12, C.ok); TK.label(p, C, `${RP[r]} cis ${d}°`, x, y - 16, C.ok, 11, 90); }
      if (s.pick) { const [x, y] = TK.at(cx, cy, s.pick[0] * u, s.pick[1]); drawDot(p, C, x, y, 12, C.bad); }
    },
    press(G, x, y) {
      const s = G.s, it = G.item, hit = nodes().find(n => hitBox(G.node(n), x, y));
      if (!hit) return false;
      if (s.found.some(f => f[0] === hit[0] && f[1] === hit[1])) return true;
      if (!fits(hit[0], hit[1], it)) {
        s.pick = hit;
        const [r] = hit, k = kOf(it);
        G.bad(Math.abs(r ** k - it.r ** k) > 1e-9 ? 'Ese no estira lo que se estiró: mira el tamaño' : 'El tamaño sí, pero el giro no: mira hacia dónde apunta');
        return true;
      }
      s.pick = null; s.found.push(hit); G.api.sfx?.tap?.();
      if (s.found.length >= answers(it).length) G.good(kOf(it) === 1 ? 'Multiplicar es girar y estirar' : 'Dos raíces cuadradas: a media vuelta una de otra');
      return true;
    },
    peek: G => ({ solve: answers(G.item).filter(a => !G.s.found.some(f => f[0] === a[0] && f[1] === a[1])).map(G.node), wrong: G.node(nodes().find(n => !fits(n[0], n[1], G.item))) }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/hermanas-raiz.js
// Las raíces hermanas (Trigonometría, trig-153): las n raíces n-ésimas de un complejo tienen el mismo módulo y reparten la vuelta en n
// partes iguales. Con una raíz dada, se tocan las demás. item = { n, deg0, step }   (puntos cada `step` grados)
GAMES['hermanas-raiz'] = (() => {
  const ORD = { 2: 'cuadradas', 3: 'cúbicas', 4: 'cuartas', 5: 'quintas', 6: 'sextas', 8: 'octavas' };
  const others = it => Array.from({ length: it.n - 1 }, (_, k) => TK.mod(it.deg0 + (k + 1) * 360 / it.n, 360)).sort((a, b) => a - b);
  return questGame({
    aspect: 1.3,
    init: () => ({ pick: [] }),
    ok: (s, it) => [...s.pick].sort((a, b) => a - b).join() === others(it).join(),
    answer: it => ({ pick: others(it) }),
    solution: it => `${[it.deg0, ...others(it)].join('°, ')}°: una cada ${360 / it.n}°`,
    prompt: it => `Una de las ${it.n} raíces ${ORD[it.n]} está en ${it.deg0}°. Toca ${it.n === 2 ? 'la otra' : `las otras ${it.n - 1}`}`,
    foot: (it, s) => `Raíces encontradas: ${s.pick.length + 1} de ${it.n}. Todas quedan igual de separadas`,
    layout(G) { G.R = Math.min(G.W * 0.36, (G.bottom - G.top - 40) / 2); G.cx = G.W / 2; G.cy = (G.top + G.bottom) / 2; G.dot = d => { const [x, y] = TK.at(G.cx, G.cy, G.R, d); return { x: x - 6, y: y - 6, w: 12, h: 12 }; }; },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, all = [it.deg0, ...s.pick].sort((a, b) => a - b);
      TK.ring(p, C, cx, cy, R);
      if (G.solved) { p.noFill(); p.stroke(C.ok); p.strokeWeight(2.5); p.beginShape(); all.forEach(d => p.vertex(...TK.at(cx, cy, R, d))); p.endShape(p.CLOSE); }
      for (let d = 0; d < 360; d += it.step) { const [x, y] = TK.at(cx, cy, R, d); p.noStroke(); p.fill(C.mute); p.circle(x, y, 7); }
      all.forEach(d => {
        const [x, y] = TK.at(cx, cy, R, d), [lx, ly] = TK.at(cx, cy, R + 19, d), first = d === it.deg0, col = first ? C.N : G.solved ? C.ok : C.mint;
        p.stroke(col); p.strokeWeight(2.5); p.line(cx, cy, x, y); drawDot(p, C, x, y, first ? 13 : 11, col); TK.label(p, C, `${d}°`, lx, ly, col, 12, 44);
      });
    },
    press(G, x, y) {
      const s = G.s, it = G.item, a = TK.mod(Math.atan2(G.cy - y, x - G.cx) * 180 / Math.PI, 360), d = TK.mod(Math.round(a / it.step) * it.step, 360), [dx, dy] = TK.at(G.cx, G.cy, G.R, d);
      if (Math.hypot(dx - x, dy - y) > 13) return false;
      if (d === it.deg0 || s.pick.includes(d)) return true;
      if (!others(it).includes(d)) { G.bad('Ahí no hay raíz: todas quedan igual de separadas'); return true; }
      s.pick.push(d); G.api.sfx?.tap?.();
      if (s.pick.length === it.n - 1) G.good(`Una raíz cada ${360 / it.n}°: son los vértices de un polígono regular`);
      return true;
    },
    peek: G => ({ solve: others(G.item).filter(d => !G.s.pick.includes(d)).map(G.dot), wrong: G.dot([1, 2, 3].map(k => TK.mod(G.item.deg0 + k * G.item.step, 360)).find(d => !others(G.item).includes(d))) }),
  });
})();
// Juego con `questGame` y las ayudas `TK` del kit (spec 2026-11-22-trigonometria-juegos).   params = { rounds: [{ title, items }], lives? }   state = { done: [n] }
;
//#archivo js/games/jefe-rueda.js
// Jefe de la rueda (Trigonometría; spec 2026-11-23-trig-jefes-y-movimiento): batalla por turnos, sin reloj, contra el jefe
// de un mundo. Cada ataque es un reto cuya respuesta son uno o varios nudos de una rueda de ángulos (y de anillos, en la
// Galaxia Polar). Se marcan las runas y se toca «¡Atacar!»: si están todas y solo ellas, salen rayos y el jefe pierde vida.
// params = { name, kind: 'kraken'|'faro'|'nebulosa', rounds: [{ title, items: [{ say, targets: [[deg, anillo?]], rings?, step?, rad?, why }] }] }
// Juego con `questGame` y las ayudas `TK` del kit.   state = { done: [n] }
GAMES['jefe-rueda'] = (() => {
  const key = t => `${TK.mod(t[0], 360)}:${t[1] ?? 0}`;
  const want = it => it.targets.map(key).sort().join('|');
  const nRings = it => (it.rings ? it.rings.length : 1), stepOf = it => it.step || (nRings(it) > 1 ? 30 : 15);
  const total = P => P.rounds.reduce((n, r) => n + r.items.length, 0);
  const hits = G => G.params.rounds.slice(0, G.a.cur).reduce((n, r) => n + r.items.length, 0) + G.round.items.indexOf(G.item) + (G.solved ? 1 : 0);

  // El jefe: tres figuras hechas con formas, que se mueven solas y tiemblan al recibir un golpe.
  function drawBoss(G, x, y) {
    const { p, C } = G, t = G.t, hit = G.solved, dx = hit ? Math.sin(t * 55) * 3 : 0, kind = G.params.kind, core = (cx, cy, r, col) => { const g = p.color(col); g.setAlpha(80); p.noStroke(); p.fill(g); p.circle(cx, cy, r * 3.2 + Math.sin(t * 3) * 2); p.fill(col); p.circle(cx, cy, r * 1.4); };
    x += dx;
    if (kind === 'kraken') {
      p.noFill();
      for (let k = 0; k < 3; k++) {
        p.stroke(k === 1 ? C.sky : C.coral); p.strokeWeight(1.6 - k * 0.3); p.beginShape();
        for (let i = 0; i <= 40; i++) { const u = -1 + i / 20, amp = (8 - k * 2) * (1 - u * u); p.vertex(x + u * (48 - k * 2), y - 2 + Math.sin(u * 7 + t * (1.6 + k * 0.4) + k * 2) * amp + (k - 1) * 9); }
        p.endShape();
      }
      p.stroke(C.coral); p.strokeWeight(1.5); p.fill(C.card); p.circle(x, y - 2, 30); core(x, y - 2, 5, C.coral);
    } else if (kind === 'faro') {
      const beam = p.color(C.sun); beam.setAlpha(70); const a = t * 1.1;
      p.noStroke(); p.fill(beam); p.triangle(x, y - 18, x + Math.cos(a) * 120, y - 18 + Math.sin(a) * 26 - 14, x + Math.cos(a) * 120, y - 18 + Math.sin(a) * 26 + 14);
      p.fill(C.sky); p.quad(x - 13, y - 8, x + 13, y - 8, x + 19, y + 32, x - 19, y + 32); p.fill(C.cream); p.rect(x - 15, y + 6, 30, 8); p.rect(x - 17, y + 20, 34, 7);
      p.fill(C.card); p.stroke(C.sun); p.strokeWeight(1.5); p.rect(x - 16, y - 30, 32, 22, 6); core(x, y - 19, 4, C.sun);
    } else {
      p.noFill(); p.strokeWeight(3);
      for (let k = 0; k < 3; k++) { p.stroke([C.sky, C.mint, C.coral][k]); p.push(); p.translate(x, y); p.rotate(t * (0.5 + k * 0.25) + k); p.ellipse(0, 0, 96 - k * 14, 30 + k * 8); p.pop(); }
      p.noStroke(); p.fill(C.card); p.circle(x, y, 44); p.stroke(C.sky); p.strokeWeight(1.5); p.noFill(); p.circle(x, y, 44); core(x, y, 6, C.sky);
    }
  }

  return questGame({
    aspect: 1.6,
    idle: 'Sin reloj: piensa, marca los puntos y ataca',
    init: () => ({ marks: [] }),
    ok: (s, it) => [...s.marks].sort().join('|') === want(it),
    answer: it => ({ marks: it.targets.map(key) }),
    solution: it => `${it.say}: ${it.targets.map(t => `${it.rings ? `${it.rings[t[1] ?? 0]} cis ` : ''}${TK.mod(t[0], 360)}°`).join(', ')}`,
    prompt: it => it.say,
    foot: (it, s) => `Puntos marcados: ${s.marks.length}. Tócalos otra vez para quitarlos`,
    yes: it => it.why,
    layout(G) {
      const it = G.item, n = nRings(it);
      G.go = { x: G.W / 2 - 80, y: G.bottom - 46, w: 160, h: 38 };
      G.R = Math.min(G.W * 0.34, (G.go.y - G.top - 138) / 2); G.cx = G.W / 2; G.cy = G.top + 116 + G.R;
      G.rad = j => G.R * (n === 1 ? 1 : 0.4 + 0.6 * j / (n - 1));
      G.node = (deg, j = 0) => { const [x, y] = TK.at(G.cx, G.cy, G.rad(j), deg); return { x: x - 7, y: y - 7, w: 14, h: 14 }; };
    },
    draw(G) {
      const { p, C, s, item: it, cx, cy, R } = G, n = nRings(it), step = stepOf(it), P = G.params, hp = total(P) - hits(G), by = G.top + 38;
      // Jefe, nombre y vida.
      const dead = hp <= 0;
      if (dead) { p.push(); p.translate(cx, by + 10); p.rotate(0.55); drawBoss(G, 0, 0); p.pop(); TK.label(p, C, '¡Vencido!', cx, G.top + 6, C.ok, 15, 160); } else drawBoss(G, cx, by);
      const bw = Math.min(150, G.W - 60), bx = cx - bw / 2, byy = G.top + 82;
      p.noStroke(); p.fill(C.line); p.rect(bx, byy, bw, 8, 4); p.fill(hp / total(P) > 0.34 ? C.coral : C.bad); p.rect(bx, byy, bw * TK.glide(G, 'hp', hp / total(P), 5), 8, 4);
      TK.label(p, C, `${hp} de ${total(P)}`, bx + bw + 26, byy + 4, C.mute, 11, 50);
      // Tablero: anillos, radios y nudos.
      for (let j = 0; j < n; j++) { p.noFill(); p.stroke(j === n - 1 ? C.mute : C.line); p.strokeWeight(j === n - 1 ? 2 : 1.2); p.circle(cx, cy, 2 * G.rad(j)); }
      for (let d = 0; d < 180; d += step) { const [x1, y1] = TK.at(cx, cy, R, d), [x2, y2] = TK.at(cx, cy, R, d + 180); p.stroke(C.line); p.strokeWeight(d % 90 ? 0.7 : 1.8); p.line(x1, y1, x2, y2); }
      const ax = it.rad ? ['$0$', '$\\tfrac{\\pi}{2}$', '$\\pi$', '$\\tfrac{3\\pi}{2}$'] : ['0°', '90°', '180°', '270°'];
      ax.forEach((txt, k) => { const [x, y] = TK.at(cx, cy, R + (k % 2 ? 11 : 17), 90 * k); TK.label(p, C, txt, x, y, C.mute, 11, 40); });
      if (it.rings) it.rings.forEach((txt, j) => TK.label(p, C, txt, cx + G.rad(j) - 9, cy + 10, C.mute, 10, 24));
      for (let j = 0; j < n; j++) for (let d = 0; d < 360; d += step) { const [x, y] = TK.at(cx, cy, G.rad(j), d); p.noStroke(); p.fill(C.mute); p.circle(x, y, 6); }
      // Runas marcadas y, al acertar, los rayos que salen hacia el jefe.
      const k = G.solved ? Math.min(1, (1.2 - G.wait) / 0.5) : 0;
      for (const m of s.marks) {
        const [d, j] = m.split(':').map(Number), [x, y] = TK.at(cx, cy, G.rad(j), d), col = G.solved ? C.ok : C.sky;
        if (k > 0) { p.stroke(C.sun); p.strokeWeight(4); p.line(x, y, x + (cx - x) * k, y + (by - y) * k); }
        drawDot(p, C, x, y, 13, col);
      }
      drawBtn(p, C, G.go, '¡Atacar!', G.solved, G.solved ? C.ok : C.coral);
    },
    press(G, x, y) {
      const s = G.s, it = G.item;
      if (hitBox(G.go, x, y)) {
        if (!s.marks.length) { G.a.say('Marca al menos un punto en la rueda', G.C.N); return true; }
        const tg = it.targets.map(key), extra = s.marks.some(m => !tg.includes(m)), miss = tg.some(m => !s.marks.includes(m));
        G.submit(extra && miss ? 'Hay puntos mal puestos' : extra ? 'Sobra algún punto' : 'Faltan puntos: hay más soluciones');
        return true;
      }
      const step = stepOf(it), a = TK.mod(Math.atan2(G.cy - y, x - G.cx) * 180 / Math.PI, 360), d = TK.mod(Math.round(a / step) * step, 360);
      const rr = Math.hypot(x - G.cx, y - G.cy), n = nRings(it);
      if (rr > G.R + 22 || rr < G.rad(0) - 16) return false;
      let best = 0;
      for (let j = 1; j < n; j++) if (Math.abs(rr - G.rad(j)) < Math.abs(rr - G.rad(best))) best = j;
      const m = `${d}:${best}`, i = s.marks.indexOf(m);
      if (i >= 0) s.marks.splice(i, 1); else s.marks.push(m);
      G.api.sfx?.tap?.();
      return true;
    },
    peek: G => {
      const tg = G.item.targets.map(key), box = m => G.node(...m.split(':').map(Number)), off = G.s.marks.filter(m => !tg.includes(m)), on = tg.filter(m => !G.s.marks.includes(m));
      return { solve: [...off.map(box), ...on.map(box), G.go], wrong: G.s.marks.length && (off.length || on.length) ? G.go : null };
    },
  });
})();
;
//#archivo js/explora-trig-mundos.js
// Trigonometría · los tres mundos (Funciones Periódicas, Identidades y Triángulos, El Plano Complejo), Explora. trig-41a tiene su
// propio archivo. Ejemplos propios, que no salen en los ejercicios.
{
  const P = XM.pasos, rad = g => g * Math.PI / 180;
  const R = (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (v.p ? K.t(246, 60, v.p, 'b ta', 'start') : '') + (v.q ? K.t(246, 96, v.q, 'ta', 'start') : '');
  const ang = (max = 360, paso = 15, et = 'ángulo (grados)') => [xpRegla('g', 0, max, et, paso)];
  // Triángulo rectángulo de ángulo g en la esquina izquierda y base b.
  const tri = (K, x, y, b, g, o = {}) => { const h = b * Math.tan(rad(g)); return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fc') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.ang([x, y], [x + b, y], [x + b, y - h], 26, o.a ?? '', 'fa') + K.r(x + b - 10, y - 10, 10, 10, 'fn') + K.t(x + b / 2, y + 20, o.ca ?? '', 's tg') + K.t(x + b + 8, y - h / 2 + 5, o.co ?? '', 's tf', 'start') + K.t(x + b / 2 - 10, y - h / 2 - 10, o.hi ?? '', 's ta', 'end'); };

  // ---------------------------------------------------------------------------------------------------------- trig-41b
  const piz = (v, K) => K.c(120, 110, 84, 'fc') + K.sec(120, 110, 84, 0, v.g, 'fa') + K.arc(120, 110, 84, 0, v.g, 'lf gr') + (v.p ? K.t(226, 70, v.p, 'b ta', 'start') : '') + (v.q ? K.t(226, 104, v.q, 'ta', 'start') : '');
  xpLec('trig-41b', [
    ['El largo del arco', xpMira('dibujo', 'Empecemos por la idea: el arco mide **radio por ángulo**, en radianes.', { dib: piz, v: { g: 0, p: '', q: '' }, alto: 210 }, [
      ['Un radián es el ángulo cuyo arco mide un radio.', { g: 57.3, p: '1 rad' }, '$s = r$'],
      ['Con dos radianes, el arco mide dos radios.', { g: 114.6, p: '2 rad' }, '$s = 2r$'],
      ['Con θ radianes, θ radios.', { p: 'θ rad' }, '$s = r\\theta$'],
      ['La vuelta completa son dos pi.', { g: 360, p: '2π rad' }, '$s = 2\\pi r$'],
      ['En grados no sirve: primero se pasa a radianes.', { g: 90, p: 'π/2 rad' }, '$90^\\circ = \\tfrac{\\pi}{2}$'],
    ], '$s = r\\theta$, con θ en radianes.'),
    xpFila('Radio 8 y ángulo $\\tfrac{3\\pi}{4}$. Pon el arco y lo que mediría con radio 4.', ['radio 8', 'radio 4'], ['6π', '3π'], ['24π', '12π', '2π'], 'Multiplica radio por ángulo.', '$8 \\cdot \\tfrac{3\\pi}{4} = 6\\pi$.')],
    ['El pedazo de área', xpMira('dibujo', 'Segunda idea: el sector es la **misma fracción** de vuelta, pero de área.', { dib: piz, v: { g: 90, p: '', q: '' }, alto: 210 }, [
      ['Un cuarto de vuelta es un cuarto del disco.', { p: '1/4' }, '$\\tfrac14 \\pi r^2$'],
      ['Un sexto de vuelta, un sexto.', { g: 60, p: '1/6' }, '$\\tfrac16 \\pi r^2$'],
      ['En general, la fracción es θ sobre 2π.', { p: 'θ/2π' }, '$\\tfrac{\\theta}{2\\pi} \\cdot \\pi r^2$'],
      ['Al simplificar, el pi se cancela.', {}, '$A = \\tfrac12 r^2\\theta$'],
    ], '$A = \\tfrac12 r^2\\theta$.'),
    xpMueve('Pinta el sector que es **tres octavos** del disco.', 290, { g: 45, p: '' }, ang(360, 45), { g: 135 }, piz, '$\\tfrac38 \\cdot 360^\\circ = 135^\\circ$.', { lee: v => `$${v.g}^\\circ$` })],
    ['Girar y avanzar', xpMira('dibujo', 'Tercera idea: la **velocidad lineal** es radio por velocidad angular.', { dib: (v, K) => K.c(120, 110, 84, 'fn') + K.c(120, 110, 42, 'fn') + [84, 42].map((r, i) => { const [x, y] = K.at(120, 110, r, v.g); return K.l(120, 110, x, y, 'lm') + K.c(x, y, 8, i ? 'fG' : 'fA'); }).join('') + K.t(226, 110, v.p, 'ta', 'start'), v: { g: 0, p: '' }, alto: 210 }, [
      ['Dos puntos de un mismo disco, uno al doble de distancia.', {}, '$r \\ \\text{y} \\ 2r$'],
      ['Giran el mismo ángulo en el mismo tiempo.', { g: 120 }, '$\\omega = \\tfrac{\\theta}{t}$'],
      ['Pero el de afuera recorre el doble.', { p: '2r vs r' }, '$v = r\\omega$'],
      ['Las vueltas por minuto se pasan a radianes: por 2π.', {}, '$1 \\ \\text{vuelta} = 2\\pi$'],
    ], '$v = r\\omega$, con ω en radianes por unidad de tiempo.'),
    xpFila('Una rueda de radio 3 m da 5 vueltas por minuto. Pon ω y v (por minuto).', ['ω', 'v'], ['10π', '30π'], ['5π', '15π', '3π'], 'Cada vuelta son 2π; luego por el radio.', '$\\omega = 10\\pi$ y $v = 30\\pi$ m.')],
    ['Ahora sí, un problema', xpFila('Un aspersor riega un sector de $120^\\circ$ con radio 6 m. Pon el ángulo en radianes y el área.', ['radianes', 'área'], ['2π/3', '12π'], ['3π/2', '4π', '24π'], 'Un tercio de vuelta; un tercio del disco de 36π.', '$\\tfrac12 \\cdot 36 \\cdot \\tfrac{2\\pi}{3} = 12\\pi$.')],
  ], 'En radianes todo es multiplicar: arco, sector y velocidad.');

  // ---------------------------------------------------------------------------------------------------------- trig-1
  const sohD = (v, K) => tri(K, 50, 170, v.b, v.g, { a: 'θ', ca: 'adyacente', co: 'opuesto', hi: 'hipotenusa' }) + K.t(300, 30, v.p || '', 'ta', 'end');
  xpLec('trig-1', [
    ['Los nombres de los lados', xpMira('dibujo', 'Empecemos por la idea: los catetos se nombran **desde el ángulo**.', { dib: sohD, v: { b: 170, g: 35, p: '' }, alto: 200 }, [
      ['La hipotenusa mira al ángulo recto: es la más larga.', {}, '$\\text{hip}$'],
      ['El **opuesto** está enfrente de θ.', {}, '$\\text{op}$'],
      ['El **adyacente** está al lado de θ.', {}, '$\\text{ady}$'],
      ['Si se mira desde el otro ángulo, los catetos cambian de nombre.', {}, '$\\text{op} \\leftrightarrow \\text{ady}$'],
    ], 'Opuesto: enfrente. Adyacente: al lado. Hipotenusa: frente al recto.'),
    xpFila('Triángulo de lados 8, 15 y 17. Desde el ángulo opuesto al **8**, pon los lados.', ['opuesto', 'adyacente', 'hipotenusa'], ['8', '15', '17'], ['23', '25'], 'La hipotenusa es la más larga.', 'Opuesto 8, adyacente 15, hipotenusa 17.')],
    ['Razones que no cambian', xpMira('dibujo', 'Segunda idea: el tamaño cambia; **la razón, no**.', { dib: sohD, v: { b: 100, g: 35, p: '' }, alto: 200 }, [
      ['Opuesto sobre hipotenusa: el seno.', { p: 'sen = op/hip' }, '$\\operatorname{sen}\\theta = \\tfrac{\\text{op}}{\\text{hip}}$'],
      ['Agrandamos el triángulo con el mismo ángulo.', { b: 190 }, '$\\tfrac{2\\,\\text{op}}{2\\,\\text{hip}}$'],
      ['Todos los lados crecen igual: la razón se conserva.', {}, '$\\operatorname{sen}\\theta$'],
      ['Coseno: adyacente sobre hipotenusa.', { p: 'cos = ady/hip' }, '$\\cos\\theta = \\tfrac{\\text{ady}}{\\text{hip}}$'],
      ['Tangente: opuesto sobre adyacente.', { p: 'tan = op/ady' }, '$\\tan\\theta = \\tfrac{\\text{op}}{\\text{ady}}$'],
    ], 'SOH · CAH · TOA: razones que dependen solo del ángulo.'),
    xpFila('Opuesto 9, adyacente 40, hipotenusa 41. Pon cada razón.', ['sen', 'cos', 'tan'], ['9/41', '40/41', '9/40'], ['41/9', '40/9'], 'SOH, CAH, TOA.', 'Cada una con sus dos lados.')],
    ['Hallar un lado', xpMira('dibujo', 'Tercera idea: se escoge la razón que une **lo que tienes con lo que buscas**.', { dib: (v, K) => tri(K, 60, 160, 140, 40, { a: '40°', ca: v.ca, co: 'x', hi: '' }) + K.t(250, 60, v.p, 'ta', 'middle'), v: { ca: '20', p: '' }, alto: 190 }, [
      ['Se conoce el adyacente, 20, y se busca el opuesto.', {}, '$\\text{ady} = 20$'],
      ['La que une opuesto y adyacente es la tangente.', { p: 'tan 40° = x/20' }, '$\\tan 40^\\circ = \\tfrac{x}{20}$'],
      ['Se despeja: veinte veces la tangente.', { p: 'x = 20 · tan 40°' }, '$x = 20\\tan 40^\\circ$'],
      ['Con calculadora, cerca de 16.8.', {}, '$x \\approx 16.8$'],
    ], 'Mira qué dos lados intervienen y usa su razón.'),
    xpFila('$\\operatorname{sen}\\theta = 0.6$ e hipotenusa 25. Pon el opuesto y el adyacente.', ['opuesto', 'adyacente'], ['15', '20'], ['10', '41', '24'], '0.6 por 25; luego Pitágoras.', '$15$ y $\\sqrt{625 - 225} = 20$.')],
    ['Ahora sí, un problema', xpFila('Una rampa de 13 m sube 5 m. Pon el seno y el coseno de su inclinación.', ['sen', 'cos'], ['5/13', '12/13'], ['13/5', '5/12', '8/13'], 'La rampa es la hipotenusa; falta el cateto del piso.', '$\\sqrt{169 - 25} = 12$.')],
  ], 'Nombra los lados desde el ángulo y elige la razón.');

  // ---------------------------------------------------------------------------------------------------------- trig-2
  xpLec('trig-2', [
    ['Medio cuadrado', xpMira('dibujo', 'Empecemos por la idea: el de **45°** es medio cuadrado.', { dib: (v, K) => K.r(80, 20, 140, 140, 'fc') + K.l(80, 160, 220, 20, 'la gr') + K.t(150, 180, '1', 's') + K.t(232, 94, '1', 's') + K.f(v.h, K.t(136, 80, '√2', 'b ta')), v: { h: 0 }, alto: 195 }, [
      ['Un cuadrado de lado 1, partido por la diagonal.', {}, '$1, 1$'],
      ['Los dos catetos son iguales: el ángulo es 45°.', {}, '$45^\\circ$'],
      ['La diagonal mide raíz de dos.', { h: 1 }, '$\\sqrt{1 + 1}$'],
      ['Por eso seno y coseno coinciden.', {}, '$\\operatorname{sen}45^\\circ = \\tfrac{\\sqrt2}{2}$'],
      ['Y la tangente es 1.', {}, '$\\tan 45^\\circ = 1$'],
    ], '45°: $\\tfrac{\\sqrt2}{2}$, $\\tfrac{\\sqrt2}{2}$ y 1.'),
    xpFila('Un cuadrado tiene lado 6. Pon su diagonal, y el lado de uno con diagonal 10.', ['diagonal', 'lado'], ['6√2', '5√2'], ['12', '10√2', '3√2'], 'Por √2 para ir; entre √2 para volver.', '$\\tfrac{10}{\\sqrt2} = 5\\sqrt2$.')],
    ['Medio triángulo equilátero', xpMira('dibujo', 'Segunda idea: **30° y 60°** salen de medio equilátero.', { dib: (v, K) => K.p([[80, 170], [240, 170], [160, 32]], 'fc') + K.f(v.h, K.l(160, 32, 160, 170, 'lf gr') + K.t(120, 188, '1', 's') + K.t(172, 120, '√3', 'b tf', 'start')) + K.t(108, 94, '2', 'b') + K.t(94, 162, '60°', 's', 'start'), v: { h: 0 }, alto: 200 }, [
      ['Un triángulo equilátero de lado 2: ángulos de 60°.', {}, '$60^\\circ$'],
      ['La altura lo parte en dos: la base queda en 1.', { h: 1 }, '$1, 2$'],
      ['Por Pitágoras, la altura es raíz de tres.', {}, '$\\sqrt{4 - 1} = \\sqrt3$'],
      ['Desde 60°: opuesto raíz de tres, adyacente 1.', {}, '$\\operatorname{sen}60^\\circ = \\tfrac{\\sqrt3}{2}, \\ \\cos 60^\\circ = \\tfrac12$'],
      ['Desde 30° se intercambian.', {}, '$\\operatorname{sen}30^\\circ = \\tfrac12, \\ \\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$'],
    ], 'Lados 1, √3, 2: de ahí salen todas las de 30° y 60°.'),
    xpFila('Pon cada valor.', ['sen 60°', 'tan 30°', 'cos 60°'], ['√3/2', '√3/3', '1/2'], ['√3', '√2/2', '1'], 'Dibuja el triángulo 1, √3, 2.', '$\\tan 30^\\circ = \\tfrac{1}{\\sqrt3} = \\tfrac{\\sqrt3}{3}$.')],
    ['Complementarios', xpMira('dibujo', 'Tercera idea: el seno de uno es el **coseno del otro**.', { dib: (v, K) => tri(K, 60, 160, 170, v.g, { a: `${Math.round(v.g)}°`, ca: '', co: '', hi: '' }) + K.t(110, 40, `el otro: ${90 - Math.round(v.g)}°`, 's'), v: { g: 30 }, alto: 190 }, [
      ['Los dos ángulos agudos suman 90°.', {}, '$30^\\circ + 60^\\circ$'],
      ['El opuesto de uno es el adyacente del otro.', { g: 38 }, '$\\operatorname{sen}\\theta$'],
      ['Entonces el seno de θ es el coseno de 90° − θ.', {}, '$\\operatorname{sen}\\theta = \\cos(90^\\circ - \\theta)$'],
      ['Por eso el **co**seno: el seno del complemento.', {}, '$\\cos 20^\\circ = \\operatorname{sen}70^\\circ$'],
    ], '$\\operatorname{sen}\\theta = \\cos(90^\\circ - \\theta)$.'),
    xpFila('Pon el ángulo que falta.', ['sen 25° = cos', 'cos 48° = sen'], ['65°', '42°'], ['25°', '132°', '52°'], 'Juntos suman 90°.', '$90 - 25$ y $90 - 48$.')],
    ['Ahora sí, un problema', xpFila('Una escalera de 8 m forma 60° con el piso. Pon la altura a la que llega y qué tan lejos está su pie.', ['altura', 'pie'], ['4√3', '4'], ['8√3', '4√2', '2'], '$8\\operatorname{sen}60^\\circ$ y $8\\cos 60^\\circ$.', 'Altura $4\\sqrt3$ y pie a 4 m.')],
  ], 'Dos figuras bastan: medio cuadrado y medio equilátero.');

  // ---------------------------------------------------------------------------------------------------------- trig-42c
  xpLec('trig-42c', [
    ['Las tres volteadas', xpMira('dibujo', 'Empecemos por la idea: hay **seis** razones: tres y sus recíprocas.', { dib: (v, K) => [['sen', 'csc'], ['cos', 'sec'], ['tan', 'cot']].map((r, i) => K.t(90, 50 + i * 42, r[0], 'b ta') + K.f(v.n - i, K.t(170, 50 + i * 42, '↔', 'b tm') + K.t(250, 50 + i * 42, r[1], 'b tf'))).join(''), v: { n: 0 }, alto: 160 }, [
      ['La cosecante voltea al seno.', { n: 1 }, '$\\csc\\theta = \\tfrac{1}{\\operatorname{sen}\\theta}$'],
      ['La secante voltea al **co**seno.', { n: 2 }, '$\\sec\\theta = \\tfrac{1}{\\cos\\theta}$'],
      ['La cotangente voltea a la tangente.', { n: 3 }, '$\\cot\\theta = \\tfrac{1}{\\tan\\theta}$'],
      ['Ojo: van cruzadas, seno con **co**secante.', {}, '$\\operatorname{sen} \\leftrightarrow \\csc$'],
      ['Cada pareja multiplica 1.', {}, '$\\operatorname{sen}\\theta \\cdot \\csc\\theta = 1$'],
    ], 'csc con sen, sec con cos, cot con tan: productos 1.'),
    xpFila('Opuesto 7, adyacente 24, hipotenusa 25. Pon cada razón.', ['csc', 'sec', 'cot'], ['25/7', '25/24', '24/7'], ['7/25', '7/24'], 'Voltea seno, coseno y tangente.', 'Son las recíprocas.')],
    ['De una a todas', xpMira('dibujo', 'Segunda idea: con **una** razón se dibuja el triángulo y salen las demás.', { dib: (v, K) => tri(K, 60, 160, 150, 37, { a: 'θ', ca: v.a, co: v.o, hi: v.h }), v: { a: '', o: '3', h: '' }, alto: 190 }, [
      ['Se sabe que la tangente es tres cuartos.', { a: '4' }, '$\\tan\\theta = \\tfrac34$'],
      ['Opuesto 3, adyacente 4. La hipotenusa, por Pitágoras.', { h: '5' }, '$\\sqrt{9 + 16} = 5$'],
      ['Y ya salen seno y coseno.', {}, '$\\tfrac35, \\tfrac45$'],
      ['Y también todas sus recíprocas.', {}, '$\\tfrac53, \\tfrac54, \\tfrac43$'],
    ], 'Dibuja, completa con Pitágoras y lee.'),
    xpFila('$\\sec\\theta = \\tfrac{17}{15}$, θ agudo. Pon el opuesto, sen y tan.', ['opuesto', 'sen', 'tan'], ['8', '8/17', '8/15'], ['15/17', '15/8', '2'], 'Hipotenusa 17 y adyacente 15.', '$\\sqrt{289 - 225} = 8$.')],
    ['Medir sin tocar', xpMira('dibujo', 'Tercera idea: un ángulo y una distancia **miden lo que no se alcanza**.', { dib: (v, K) => tri(K, 50, 170, 190, v.g, { a: `${Math.round(v.g)}°`, ca: '30 m', co: 'altura', hi: '' }), v: { g: 20 }, alto: 200 }, [
      ['Desde 30 m se mira la punta de un árbol.', {}, '$\\text{ángulo de elevación}$'],
      ['El ángulo se mide desde la horizontal hacia arriba.', { g: 38 }, '$38^\\circ$'],
      ['La altura es 30 por la tangente.', {}, '$h = 30\\tan 38^\\circ$'],
      ['Hacia abajo se llama depresión: es igual visto desde el otro lado.', {}, '$\\text{elevación} = \\text{depresión}$'],
    ], 'Altura = distancia · tan(elevación).'),
    xpFila('A 40 m de una torre la punta se ve a 45°. Pon la altura; y la altura si fuera a 60°.', ['45°', '60°'], ['40', '40√3'], ['20', '20√3', '80'], 'tan 45° = 1 y tan 60° = √3.', '$40 \\cdot 1$ y $40\\sqrt3$.')],
    ['Ahora sí, un problema', xpFila('Desde un faro de 50 m se ve un bote con depresión de 30°. Pon la tangente y la distancia del bote a la base.', ['tan 30°', 'distancia'], ['√3/3', '50√3'], ['√3', '25', '50/√3'], '$\\tan 30^\\circ = \\tfrac{50}{d}$.', '$d = \\tfrac{50}{\\tan 30^\\circ} = 50\\sqrt3$.')],
  ], 'Una razón dibuja el triángulo; un ángulo mide de lejos.');

  // ---------------------------------------------------------------------------------------------------------- trig-3
  xpLec('trig-3', [
    ['El punto que gira', xpMira('dibujo', 'Empecemos por la idea: en la rueda de radio 1, el punto es **(cos, sen)**.', { dib: R, v: { g: 30, p: '', q: '' }, alto: 225 }, [
      ['Un triángulo de hipotenusa 1 dentro de la rueda.', {}, '$r = 1$'],
      ['El cateto horizontal es el coseno; el vertical, el seno.', { p: '(cos, sen)' }, '$(\\cos\\theta, \\operatorname{sen}\\theta)$'],
      ['Así el ángulo puede pasar de 90°.', { g: 130 }, '$\\theta = 130^\\circ$'],
      ['El coseno quedó a la izquierda: es negativo.', { q: 'cos < 0' }, '$\\cos 130^\\circ < 0$'],
      ['Ninguno pasa de 1 ni baja de −1.', { g: 200 }, '$-1 \\le \\operatorname{sen}\\theta \\le 1$'],
    ], 'En radio 1: x es el coseno, y es el seno.'),
    xpMueve('Lleva el punto a donde **cos = −1**.', 290, { g: 30 }, ang(360, 15), { g: 180 }, R, '$\\cos 180^\\circ = -1$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['Los cuatro puntos', xpMira('dibujo', 'Segunda idea: en los ejes los valores son **0, 1 o −1**.', { dib: R, v: { g: 0, p: '(1, 0)', q: '' }, alto: 225 }, [
      ['En 0°, el punto es (1, 0).', {}, '$\\cos 0 = 1, \\ \\operatorname{sen}0 = 0$'],
      ['En 90°, arriba: (0, 1).', { g: 90, p: '(0, 1)' }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['En 180° está en (−1, 0).', { g: 180, p: '(−1, 0)' }, '$\\cos 180^\\circ = -1$'],
      ['En 270°, abajo: (0, −1).', { g: 270, p: '(0, −1)' }, '$\\operatorname{sen}270^\\circ = -1$'],
      ['La tangente no existe donde el coseno es 0.', { g: 90, p: '' }, '$\\tan 90^\\circ \\ \\text{no existe}$'],
    ], 'La tangente es seno sobre coseno.'),
    xpFila('Pon cada valor.', ['sen 270°', 'cos 90°', 'tan 180°'], ['−1', '0', '0'], ['1', 'no existe'], 'Mira el punto en la rueda.', '$\\tan 180^\\circ = \\tfrac{0}{-1}$.')],
    ['Simetrías', xpMira('dibujo', 'Tercera idea: los **espejos** de la rueda dan los demás valores.', { dib: R, v: { g: 40, p: '', q: '' }, alto: 225 }, [
      ['Empecemos con el punto de 40°.', {}, '$40^\\circ$'],
      ['Su espejo a la izquierda es 140°: mismo seno, coseno opuesto.', { g: 140 }, '$\\operatorname{sen}140^\\circ = \\operatorname{sen}40^\\circ$'],
      ['El de enfrente es 220°: los dos opuestos.', { g: 220 }, '$\\operatorname{sen}220^\\circ = -\\operatorname{sen}40^\\circ$'],
      ['El de abajo es 320°: mismo coseno.', { g: 320 }, '$\\cos 320^\\circ = \\cos 40^\\circ$'],
      ['Y cada vuelta completa repite todo.', {}, '$\\theta + 360^\\circ$'],
    ], 'Espejos de θ: 180° − θ, 180° + θ y 360° − θ.'),
    xpMueve('Halla el otro ángulo entre 0° y 180° con el **mismo seno** que 60°.', 290, { g: 60 }, ang(180, 15), { g: 120 }, R, '$180^\\circ - 60^\\circ$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('Una rueda de radio 1 empieza a la derecha y gira 210°. Pon x e y del punto.', ['x', 'y'], ['−√3/2', '−1/2'], ['√3/2', '1/2', '−1'], '210° es 180° + 30°: los dos opuestos.', '$\\cos 210^\\circ$ y $\\operatorname{sen}210^\\circ$.')],
  ], 'El punto de la rueda lleva el coseno y el seno.');

  // ---------------------------------------------------------------------------------------------------------- trig-43b
  xpLec('trig-43b', [
    ['Los signos', xpMira('dibujo', 'Empecemos por la idea: el **cuadrante** decide los signos.', { dib: R, v: { g: 50, p: 'I', q: 'todas +' }, alto: 225 }, [
      ['Primero: derecha y arriba. Todo positivo.', {}, '$\\text{I: } +, +$'],
      ['Segundo: izquierda y arriba. Solo el seno.', { g: 130, p: 'II', q: 'sen +' }, '$\\text{II: } -, +$'],
      ['Tercero: izquierda y abajo. Solo la tangente.', { g: 230, p: 'III', q: 'tan +' }, '$\\text{III: } -, -$'],
      ['Cuarto: derecha y abajo. Solo el coseno.', { g: 310, p: 'IV', q: 'cos +' }, '$\\text{IV: } +, -$'],
      ['Todas, seno, tangente, coseno: en orden de giro.', {}, '$\\text{T, S, T, C}$'],
    ], 'I todas; II seno; III tangente; IV coseno.'),
    xpFila('Pon el cuadrante.', ['sen > 0, cos < 0', 'tan > 0, sen < 0', 'cos > 0, tan < 0'], ['II', 'III', 'IV'], ['I'], '¿Derecha o izquierda? ¿Arriba o abajo?', 'Segundo, tercero y cuarto.')],
    ['El ángulo de referencia', xpMira('dibujo', 'Segunda idea: el **de referencia** es lo que falta hasta el eje horizontal.', { dib: R, v: { g: 150, p: '', q: '' }, alto: 225 }, [
      ['150° está a 30° del eje.', { p: 'ref 30°' }, '$180^\\circ - 150^\\circ$'],
      ['El de 240° pasó 60° del eje.', { g: 240, p: 'ref 60°' }, '$240^\\circ - 180^\\circ$'],
      ['A 315° le faltan 45° para la vuelta.', { g: 315, p: 'ref 45°' }, '$360^\\circ - 315^\\circ$'],
      ['El valor es el del ángulo de referencia; el signo, el del cuadrante.', {}, '$\\cos 240^\\circ = -\\cos 60^\\circ$'],
    ], 'Valor del de referencia con el signo del cuadrante.'),
    xpMueve('Lleva el ángulo al **tercer cuadrante** con referencia 30°.', 290, { g: 30 }, ang(360, 15), { g: 210 }, R, '$180^\\circ + 30^\\circ$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['De un valor a los demás', xpMira('dibujo', 'Tercera idea: con una razón y el **cuadrante** salen las demás, con su signo.', { dib: (v, K) => P(K, v, ['sen θ = 3/5, cuadrante II', 'cateto: √(25 − 9) = 4', 'cos θ = −4/5', 'tan θ = −3/4'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['El triángulo de referencia es 3, 4, 5.', { n: 2 }, '$3, 4, 5$'],
      ['En el segundo, el coseno es negativo.', { n: 3 }, '$\\cos\\theta = -\\tfrac45$'],
      ['La tangente también es negativa.', { n: 4 }, '$-\\tfrac34$'],
      ['Sin saber el cuadrante habría dos respuestas.', {}, '$\\pm\\tfrac45$'],
    ], 'Triángulo para el tamaño; cuadrante para el signo.'),
    xpFila('$\\cos\\theta = \\tfrac{5}{13}$ en el cuarto. Pon sen y tan.', ['sen', 'tan'], ['−12/13', '−12/5'], ['12/13', '12/5', '−5/12'], 'En el cuarto el seno es negativo.', 'El cateto que falta es 12.')],
    ['Ahora sí, un problema', xpFila('Pon cada valor.', ['sen 330°', 'cos 135°', 'tan 225°'], ['−1/2', '−√2/2', '1'], ['1/2', '√2/2', '−1'], 'Referencias 30°, 45° y 45°.', 'Cada una con el signo de su cuadrante.')],
  ], 'Referencia para el valor, cuadrante para el signo.');

  // ---------------------------------------------------------------------------------------------------------- trig-44a
  const onda = (v, K) => { const p = XM.plano(K, 0, 12.57, -4, 4, { H: 200, g: 1.5708, gy: 1 }); return p.s + XM.curva(K, p, x => v.A * Math.sin(v.w * (x - (v.f || 0))) + v.k) + K.l(18, p.Y(v.k), 322, p.Y(v.k), 'lf d'); };
  xpLec('trig-44a', [
    ['De la rueda a la ola', xpMira('dibujo', 'Empecemos por la idea: la altura del punto que gira **dibuja una ola**.', { dib: (v, K) => { const [px, py] = K.at(70, 110, 54, v.g), q = []; for (let a = 0; a <= v.g; a += 5) q.push([140 + a * 0.5, 110 - 54 * Math.sin(rad(a))]); return K.c(70, 110, 54, 'fn') + K.l(70, 110, px, py, 'la gr') + K.c(px, py, 6, 'fF') + K.l(136, 110, 326, 110, 'lm') + (q.length > 1 ? K.pl(q, 'lf gr') : '') + K.l(px, py, 140 + v.g * 0.5, py, 'lm d'); }, v: { g: 0 }, alto: 190 }, [
      ['Empieza a la derecha, a altura 0.', {}, '$\\operatorname{sen}0 = 0$'],
      ['Un cuarto de vuelta: llega a lo más alto.', { g: 90 }, '$\\operatorname{sen}\\tfrac{\\pi}{2} = 1$'],
      ['Media vuelta: otra vez en 0.', { g: 180 }, '$\\operatorname{sen}\\pi = 0$'],
      ['Tres cuartos: lo más bajo.', { g: 270 }, '$\\operatorname{sen}\\tfrac{3\\pi}{2} = -1$'],
      ['Vuelta completa: la ola se repite.', { g: 360 }, '$2\\pi$'],
    ], 'La gráfica del seno es la altura del punto; se repite cada 2π.'),
    xpFila('Pon la altura del seno en cada momento.', ['1/4 de vuelta', '1/2 vuelta', '3/4 de vuelta'], ['1', '0', '−1'], ['1/2', '2'], 'Arriba, en medio, abajo.', '1, 0 y −1.')],
    ['La amplitud', xpMira('dibujo', 'Segunda idea: la **amplitud** es cuánto se aleja del centro.', { dib: onda, v: { A: 1, w: 1, k: 0 }, alto: 210 }, [
      ['La ola simple sube 1 y baja 1.', {}, '$y = \\operatorname{sen}x$'],
      ['Por 3: sube 3 y baja 3.', { A: 3 }, '$y = 3\\operatorname{sen}x$'],
      ['Con signo menos se voltea, pero la amplitud es 2.', { A: -2 }, '$|{-2}| = 2$'],
      ['El ancho de la ola no cambió.', {}, '$|A|$'],
    ], 'Amplitud: $|A|$, la mitad entre lo más alto y lo más bajo.'),
    xpMueve('Haz que la ola vaya de **−2 a 2** y empiece **bajando**.', 270, { A: 1, w: 1, k: 0 }, [xpRegla('A', -3, 3, 'A')], { A: -2 }, onda, '$y = -2\\operatorname{sen}x$.', { lee: v => `$y = ${v.A}\\operatorname{sen}x$` })],
    ['El centro', xpMira('dibujo', 'Tercera idea: sumar un número **sube toda la ola**.', { dib: onda, v: { A: 1, w: 1, k: 0 }, alto: 210 }, [
      ['La línea del medio está en 0.', {}, '$k = 0$'],
      ['Si se suma 2, sube a 2.', { k: 2 }, '$y = \\operatorname{sen}x + 2$'],
      ['Con amplitud 2 y centro 1, va de −1 a 3.', { A: 2, k: 1 }, '$1 \\pm 2$'],
      ['El centro es el promedio de los extremos.', {}, '$k = \\tfrac{\\max + \\min}{2}$'],
    ], 'Va de $k - |A|$ a $k + |A|$.'),
    xpMueve('Arma una ola que vaya de **−1 a 3**: mueve la amplitud y el centro.', 310, { A: 1, w: 1, k: 0 }, [xpRegla('A', 1, 3, 'amplitud'), xpRegla('k', -1, 2, 'centro')], { A: 2, k: 1 }, onda, '$y = 2\\operatorname{sen}x + 1$.', { lee: v => `$${v.k - v.A} \\ \\text{a} \\ ${v.k + v.A}$` })],
    ['Ahora sí, un problema', xpFila('La marea va de 1 m a 7 m. Pon el centro y la amplitud.', ['centro', 'amplitud'], ['4', '3'], ['6', '8', '7'], 'El promedio; y cuánto se aleja de él.', '$\\tfrac{1+7}{2} = 4$ y $7 - 4 = 3$.')],
  ], 'Amplitud: cuánto se aleja; centro: de dónde.');

  // ---------------------------------------------------------------------------------------------------------- trig-44b
  xpLec('trig-44b', [
    ['El periodo', xpMira('dibujo', 'Empecemos por la idea: el **periodo** es lo que tarda en repetirse.', { dib: onda, v: { A: 2, w: 1, k: 0, f: 0 }, alto: 210 }, [
      ['La ola simple se repite cada 2π.', {}, '$T = 2\\pi$'],
      ['Con 2x adentro va el doble de rápido: cada π.', { w: 2 }, '$T = \\tfrac{2\\pi}{2}$'],
      ['Con x sobre 2, más lento: cada 4π.', { w: 0.5 }, '$T = \\tfrac{2\\pi}{1/2} = 4\\pi$'],
      ['Se divide 2π entre el número que acompaña a la x.', {}, '$T = \\tfrac{2\\pi}{|\\omega|}$'],
    ], '$T = \\tfrac{2\\pi}{|\\omega|}$.'),
    xpMueve('Haz que la ola complete **cuatro** ciclos en el cuadro (de 0 a 4π).', 270, { A: 2, w: 1, k: 0, f: 0 }, [xpRegla('w', 0.5, 3, 'ω', 0.5)], { w: 2 }, onda, 'Cada ciclo mide π: ω = 2.', { lee: v => `$y = 2\\operatorname{sen}(${v.w}x)$` })],
    ['El desfase', xpMira('dibujo', 'Segunda idea: restar adentro **corre la ola** a la derecha.', { dib: onda, v: { A: 2, w: 1, k: 0, f: 0 }, alto: 210 }, [
      ['La ola empieza a subir en 0.', {}, '$y = 2\\operatorname{sen}x$'],
      ['Con x − π/2 empieza a subir en π/2.', { f: 1.5708 }, '$y = 2\\operatorname{sen}(x - \\tfrac{\\pi}{2})$'],
      ['Si hay número adelante, se saca factor antes.', {}, '$2x - \\pi = 2(x - \\tfrac{\\pi}{2})$'],
      ['El coseno es el seno corrido un cuarto hacia la izquierda.', { f: -1.5708 }, '$\\cos x = \\operatorname{sen}(x + \\tfrac{\\pi}{2})$'],
    ], '$A\\operatorname{sen}\\omega(x - c)$: desfase c.'),
    xpFila('$y = 3\\operatorname{sen}(4x - \\pi)$. Pon el periodo y el desfase.', ['periodo', 'desfase'], ['π/2', 'π/4'], ['π', '4', '2π'], '2π entre 4; saca factor 4.', '$4(x - \\tfrac{\\pi}{4})$.')],
    ['La tangente', xpMira('dibujo', 'Tercera idea: la tangente se repite cada **π** y tiene asíntotas.', { dib: (v, K) => { const p = XM.plano(K, -4.7, 4.7, -5, 5, { H: 200, g: 1.5708, gy: 5 }); return p.s + [-1, 0, 1].map(i => K.l(p.X(Math.PI * (i + 0.5)), 8, p.X(Math.PI * (i + 0.5)), 192, 'lf d')).join('').replace(/NaN/g, '0') + XM.curva(K, p, x => { const t = Math.tan(x); return Math.abs(Math.cos(x)) < 0.08 ? NaN : t * v.a; }); }, v: { a: 0.3 }, alto: 210 }, [
      ['Es seno sobre coseno.', { a: 1 }, '$\\tan x = \\tfrac{\\operatorname{sen}x}{\\cos x}$'],
      ['Donde el coseno es 0 hay una asíntota.', {}, '$x = \\tfrac{\\pi}{2} + k\\pi$'],
      ['Entre asíntotas sube siempre.', {}, '$\\text{creciente}$'],
      ['Se repite cada π, no cada 2π.', {}, '$T = \\pi$'],
      ['No tiene amplitud: no hay tope.', {}, '$(-\\infty, \\infty)$'],
    ], 'Tangente: periodo π y asíntotas en $\\tfrac{\\pi}{2} + k\\pi$.'),
    xpFila('Pon el periodo de cada una.', ['tan x', 'tan 2x', 'sen(x/3)'], ['π', 'π/2', '6π'], ['2π', '3π', '2π/3'], 'La tangente usa π; el seno, 2π.', '$\\pi$, $\\tfrac{\\pi}{2}$ y $6\\pi$.')],
    ['Ahora sí, un problema', xpFila('Una noria tarda 8 minutos por vuelta y va de 2 a 18 m. Pon la amplitud y ω.', ['amplitud', 'ω'], ['8', 'π/4'], ['16', '10', 'π/8'], 'La mitad de 16; y 2π entre 8.', '$\\omega = \\tfrac{2\\pi}{8}$.')],
  ], 'Periodo por dentro, desfase con factor; la tangente va cada π.');

  // ---------------------------------------------------------------------------------------------------------- trig-45
  xpLec('trig-45', [
    ['Preguntar por el ángulo', xpMira('dibujo', 'Empecemos por la idea: el inverso pregunta **¿de qué ángulo es?**', { dib: R, v: { g: 30, p: 'sen = 1/2', q: '' }, alto: 225 }, [
      ['Altura un medio. ¿Qué ángulo la da?', {}, '$\\operatorname{sen}\\theta = \\tfrac12$'],
      ['El ángulo de 30° sirve.', {}, '$30^\\circ$'],
      ['Pero 150° también: hay dos, y más con vueltas.', { g: 150 }, '$150^\\circ$'],
      ['Para que haya una sola respuesta se escoge una ventana.', { g: 30 }, '$-90^\\circ \\le \\theta \\le 90^\\circ$'],
      ['Esa respuesta es el arcoseno.', {}, '$\\operatorname{arcsen}\\tfrac12 = 30^\\circ$'],
    ], 'Arcoseno: el ángulo entre −90° y 90° con ese seno.'),
    xpFila('Pon cada ángulo.', ['arcsen 1', 'arcsen (−1/2)', 'arcsen 0'], ['90°', '−30°', '0°'], ['210°', '330°', '180°'], 'La respuesta va de −90° a 90°.', '$-30^\\circ$, no $210^\\circ$.')],
    ['Tres ventanas', xpMira('dibujo', 'Segunda idea: cada inversa tiene **su ventana**.', { dib: (v, K) => XM.rueda(K, 130, 110, 84, v.g, { arco: 0, cs: 0 }) + K.sec(130, 110, 84, v.a, v.b, 'fa') + K.t(240, 70, v.p, 'b ta', 'start'), v: { g: 0, a: -90, b: 90, p: 'arcsen' }, alto: 225 }, [
      ['Arcoseno: el lado derecho.', {}, '$[-90^\\circ, 90^\\circ]$'],
      ['Arcocoseno: la mitad de arriba.', { a: 0, b: 180, p: 'arccos' }, '$[0^\\circ, 180^\\circ]$'],
      ['Arcotangente: el derecho, sin las puntas.', { a: -89, b: 89, p: 'arctan' }, '$(-90^\\circ, 90^\\circ)$'],
      ['Si el coseno es negativo, el arcocoseno cae a la izquierda.', { a: 0, b: 180, g: 120, p: 'arccos' }, '$\\arccos(-\\tfrac12) = 120^\\circ$'],
    ], 'arcsen y arctan: derecha. arccos: arriba.'),
    xpFila('Pon cada ángulo.', ['arccos (−1)', 'arctan 1', 'arccos (−√2/2)'], ['180°', '45°', '135°'], ['0°', '225°', '−45°'], 'Arccos va de 0° a 180°.', 'Cada uno en su ventana.')],
    ['Deshacer con cuidado', xpMira('dibujo', 'Tercera idea: deshace **solo dentro de la ventana**.', { dib: (v, K) => P(K, v, ['arcsen(sen 40°) = 40°', 'arcsen(sen 140°) = 40°', 'cos(arcsen 3/5) = 4/5'], 44, 38), v: { n: 0 }, alto: 150 }, [
      ['40° está en la ventana: vuelve igual.', { n: 1 }, '$40^\\circ$'],
      ['140° no: vuelve el gemelo que sí está.', { n: 2 }, '$180^\\circ - 140^\\circ$'],
      ['Una mezcla se dibuja: seno tres quintos.', {}, '$3, 4, 5$'],
      ['El coseno de ese ángulo es cuatro quintos.', { n: 3 }, '$\\tfrac45$'],
    ], 'Si el ángulo está fuera, cambia por su gemelo.'),
    xpFila('Pon cada resultado.', ['arccos(cos 300°)', 'tan(arccos 5/13)'], ['60°', '12/5'], ['300°', '−60°', '5/12'], '¿Qué ángulo entre 0° y 180° tiene ese coseno?', '$\\cos 300^\\circ = \\cos 60^\\circ$.')],
    ['Ahora sí, un problema', xpFila('Una rampa sube 5 m en 5 m de piso; otra sube $\\sqrt3$ m por cada metro. Pon los ángulos.', ['primera', 'segunda'], ['45°', '60°'], ['30°', '90°', '1°'], 'arctan 1 y arctan √3.', '$\\arctan 1$ y $\\arctan\\sqrt3$.')],
  ], 'La inversa responde con un ángulo de su ventana.');

  // ---------------------------------------------------------------------------------------------------------- trig-4
  xpLec('trig-4', [
    ['Pitágoras en la rueda', xpMira('dibujo', 'Empecemos por la idea: seno y coseno son **catetos de hipotenusa 1**.', { dib: R, v: { g: 35, p: 'c²+s²=1', q: '' }, alto: 225 }, [
      ['El triángulo de la rueda tiene hipotenusa 1.', {}, '$x^2 + y^2 = 1$'],
      ['Con cualquier ángulo se cumple.', { g: 125 }, '$\\cos^2\\theta + \\operatorname{sen}^2\\theta = 1$'],
      ['También abajo: los cuadrados borran el signo.', { g: 250 }, '$(-0.34)^2 + (-0.94)^2 \\approx 1$'],
      ['Conocido uno, sale el otro, salvo el signo.', {}, '$\\operatorname{sen}\\theta = \\pm\\sqrt{1 - \\cos^2\\theta}$'],
    ], '$\\operatorname{sen}^2\\theta + \\cos^2\\theta = 1$.'),
    xpFila('$\\operatorname{sen}\\theta = 0.8$, agudo. Pon $\\operatorname{sen}^2\\theta$, $\\cos^2\\theta$ y $\\cos\\theta$.', ['sen²', 'cos²', 'cos'], ['0.64', '0.36', '0.6'], ['0.2', '0.4', '1.6'], 'Juntos suman 1.', '$1 - 0.64 = 0.36$.')],
    ['Dividir por coseno', xpMira('dibujo', 'Segunda idea: al dividir todo entre cos² nace **otra pitagórica**.', { dib: (v, K) => P(K, v, ['sen² + cos² = 1', 'sen²/cos² + 1 = 1/cos²', 'tan² + 1 = sec²', '1 + cot² = csc²'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Se divide cada término entre coseno al cuadrado.', { n: 2 }, '$\\tfrac{\\operatorname{sen}^2}{\\cos^2} + 1 = \\tfrac{1}{\\cos^2}$'],
      ['Seno sobre coseno es tangente; uno sobre coseno, secante.', { n: 3 }, '$\\tan^2\\theta + 1 = \\sec^2\\theta$'],
      ['Si se divide entre seno al cuadrado, sale la otra.', { n: 4 }, '$1 + \\cot^2\\theta = \\csc^2\\theta$'],
      ['Las tres son la misma, vista de tres maneras.', {}, '$x^2 + y^2 = 1$'],
    ], '$1 + \\tan^2 = \\sec^2$ y $1 + \\cot^2 = \\csc^2$.'),
    xpFila('$\\tan\\theta = 2$. Pon $\\sec^2\\theta$ y $\\cos^2\\theta$.', ['sec²', 'cos²'], ['5', '1/5'], ['3', '1/3', '4'], '1 + tan²; y su recíproco.', '$1 + 4 = 5$.')],
    ['Ángulos negativos', xpMira('dibujo', 'Tercera idea: al girar al revés, **el coseno queda y el seno cambia**.', { dib: R, v: { g: 40, p: '', q: '' }, alto: 225 }, [
      ['Miremos el punto de 40°.', {}, '$40^\\circ$'],
      ['El de −40° es su espejo de abajo.', { g: -40 }, '$-40^\\circ$'],
      ['Mismo x: el coseno es **par**.', {}, '$\\cos(-\\theta) = \\cos\\theta$'],
      ['La altura y se vuelve opuesta: el seno es **impar**.', {}, '$\\operatorname{sen}(-\\theta) = -\\operatorname{sen}\\theta$'],
      ['La tangente también es impar.', {}, '$\\tan(-\\theta) = -\\tan\\theta$'],
    ], 'Coseno par; seno y tangente impares.'),
    xpFila('Si $\\cos\\theta = \\tfrac13$ y $\\operatorname{sen}\\theta = a$, pon cada uno.', ['cos(−θ)', 'sen(−θ)'], ['1/3', '−a'], ['−1/3', 'a', '3'], 'El espejo conserva x y cambia y.', 'Par e impar.')],
    ['Ahora sí, un problema', xpFila('$(1 - \\operatorname{sen}\\theta)(1 + \\operatorname{sen}\\theta)$ se simplifica. Pon el producto y lo que vale con $\\cos\\theta = \\tfrac25$.', ['es igual a', 'vale'], ['cos²θ', '4/25'], ['1', '2/5', '21/25'], 'Diferencia de cuadrados: 1 − sen².', '$\\cos^2\\theta = \\tfrac{4}{25}$.')],
  ], 'Una sola idea, Pitágoras en radio 1, da las identidades.');

  // ---------------------------------------------------------------------------------------------------------- trig-47b
  xpLec('trig-47b', [
    ['Todo en senos y cosenos', xpMira('dibujo', 'Empecemos por la idea: si no se ve el camino, **pasa todo a seno y coseno**.', { dib: (v, K) => P(K, v, ['tan θ · cos θ', '(sen θ / cos θ) · cos θ', 'sen θ'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['La tangente es seno sobre coseno.', { n: 2 }, '$\\tfrac{\\operatorname{sen}\\theta}{\\cos\\theta}\\cos\\theta$'],
      ['Ahora el coseno se cancela.', { n: 3 }, '$\\operatorname{sen}\\theta$'],
      ['Vale para todo θ donde las dos existan.', {}, '$\\cos\\theta \\neq 0$'],
      ['Eso es una identidad: una igualdad que siempre se cumple.', {}, '$\\tan\\theta\\cos\\theta = \\operatorname{sen}\\theta$'],
    ], 'Cambia tan, cot, sec y csc por senos y cosenos.'),
    xpFila('Simplifica cada una.', ['sec θ · cot θ', 'csc θ · tan θ'], ['csc θ', 'sec θ'], ['1', 'sen θ', 'cos θ'], 'Escribe seno y coseno y cancela.', '$\\tfrac{1}{\\cos}\\tfrac{\\cos}{\\operatorname{sen}}$ y $\\tfrac{1}{\\operatorname{sen}}\\tfrac{\\operatorname{sen}}{\\cos}$.')],
    ['Trabajar un solo lado', xpMira('dibujo', 'Segunda idea: se **transforma el lado largo** hasta llegar al otro.', { dib: (v, K) => P(K, v, ['sec θ − cos θ', '1/cos θ − cos θ', '(1 − cos² θ)/cos θ', 'sen² θ/cos θ = sen θ · tan θ'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Queremos llegar a seno por tangente.', { n: 2 }, '$\\tfrac{1}{\\cos\\theta} - \\cos\\theta$'],
      ['Se suma con denominador común.', { n: 3 }, '$\\tfrac{1 - \\cos^2\\theta}{\\cos\\theta}$'],
      ['Arriba aparece Pitágoras: sen².', { n: 4 }, '$\\tfrac{\\operatorname{sen}^2\\theta}{\\cos\\theta}$'],
      ['No se pasan cosas de un lado al otro: aún no se sabe si son iguales.', {}, '$\\text{un solo lado}$'],
    ], 'Transforma un lado; no pases términos.'),
    xpFila('$\\tfrac{1 - \\operatorname{sen}^2\\theta}{\\cos\\theta}$: pon lo que hay arriba y el resultado.', ['arriba', 'resultado'], ['cos²θ', 'cos θ'], ['sen²θ', '1', 'tan θ'], 'Pitágoras arriba.', '$\\tfrac{\\cos^2\\theta}{\\cos\\theta}$.')],
    ['El conjugado', xpMira('dibujo', 'Tercera idea: con 1 − seno abajo, multiplica por **1 + seno**.', { dib: (v, K) => P(K, v, ['cos θ/(1 − sen θ)', '· (1 + sen θ)/(1 + sen θ)', 'cos θ(1 + sen θ)/cos² θ', '(1 + sen θ)/cos θ'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se multiplica por un uno escogido.', { n: 2 }, '$\\tfrac{1 + \\operatorname{sen}\\theta}{1 + \\operatorname{sen}\\theta}$'],
      ['Abajo queda 1 − sen²: coseno al cuadrado.', { n: 3 }, '$1 - \\operatorname{sen}^2\\theta = \\cos^2\\theta$'],
      ['Por último se cancela un coseno.', { n: 4 }, '$\\tfrac{1 + \\operatorname{sen}\\theta}{\\cos\\theta}$'],
      ['Para negar una identidad basta un ángulo que falle.', {}, '$\\operatorname{sen}2\\theta \\neq 2\\operatorname{sen}\\theta$'],
    ], 'El conjugado hace aparecer Pitágoras; un contraejemplo niega.'),
    xpFila('$(\\sec\\theta - 1)(\\sec\\theta + 1)$: pon el producto y su valor si $\\tan\\theta = 3$.', ['es igual a', 'vale'], ['tan²θ', '9'], ['sec²θ', '3', '10'], 'sec² − 1.', '$\\tan^2\\theta = 9$.')],
    ['Ahora sí, un problema', xpFila('Simplifica $\\tfrac{\\operatorname{sen}\\theta}{\\csc\\theta} + \\tfrac{\\cos\\theta}{\\sec\\theta}$. Pon cada término y la suma.', ['primero', 'segundo', 'suma'], ['sen²θ', 'cos²θ', '1'], ['0', 'sen θ', '2'], 'Dividir entre csc es multiplicar por sen.', '$\\operatorname{sen}^2\\theta + \\cos^2\\theta$.')],
  ], 'Senos y cosenos, un solo lado, Pitágoras y conjugado.');

  // ---------------------------------------------------------------------------------------------------------- trig-48a
  const dosA = (v, K) => { const [ax, ay] = K.at(60, 170, 150, v.a), [bx, by] = K.at(60, 170, 150, v.a + v.b); return K.l(50, 170, 320, 170, 'lm') + K.sec(60, 170, 60, 0, v.a, 'fa') + K.sec(60, 170, 60, v.a, v.a + v.b, 'fg') + K.l(60, 170, ax, ay, 'la gr') + K.l(60, 170, bx, by, 'lf gr') + K.l(bx, by, bx, 170, 'lf d') + K.t(250, 40, v.p || '', 'ta'); };
  xpLec('trig-48a', [
    ['No se reparte', xpMira('dibujo', 'Empecemos por la idea: el seno de una suma **no** es la suma de senos.', { dib: dosA, v: { a: 30, b: 0, p: '' }, alto: 190 }, [
      ['Un ángulo de 30° y otro de 30° encima.', { b: 30 }, '$30^\\circ + 30^\\circ$'],
      ['Juntos, 60°: la altura es 0.87.', { p: 'sen 60° ≈ 0.87' }, '$\\operatorname{sen}60^\\circ = \\tfrac{\\sqrt3}{2}$'],
      ['Sumando los senos daría 1.', { p: '1/2 + 1/2 = 1' }, '$\\operatorname{sen}30^\\circ + \\operatorname{sen}30^\\circ$'],
      ['El segundo ángulo ya no parte de la horizontal: sube menos.', { p: '' }, '$\\operatorname{sen}(a+b) \\neq \\operatorname{sen}a + \\operatorname{sen}b$'],
    ], 'El seno no se distribuye.'),
    xpFila('Pon los dos valores.', ['cos(60° + 30°)', 'cos 60° + cos 30°'], ['0', '1/2 + √3/2'], ['1', '√3'], 'El primero es cos 90°.', 'No son iguales.')],
    ['Las fórmulas', xpMira('dibujo', 'Segunda idea: en el seno se **mezclan**; en el coseno, no.', { dib: (v, K) => P(K, v, ['sen(a + b) = sen a cos b + cos a sen b', 'cos(a + b) = cos a cos b − sen a sen b', 'sen 75° = sen(45° + 30°)', '√2/2 · √3/2 + √2/2 · 1/2'], 34, 34, 's'), v: { n: 0 }, alto: 160 }, [
      ['Seno: cruzados y con el mismo signo.', { n: 1 }, '$\\operatorname{sen}(a \\pm b)$'],
      ['Coseno: iguales y con el signo contrario.', { n: 2 }, '$\\cos(a \\pm b)$'],
      ['75° se arma con 45° y 30°.', { n: 3 }, '$75^\\circ = 45^\\circ + 30^\\circ$'],
      ['Se reemplazan los valores notables.', { n: 4 }, '$\\tfrac{\\sqrt6 + \\sqrt2}{4}$'],
    ], 'Seno cruza y conserva signo; coseno no cruza y lo cambia.'),
    xpFila('$\\cos 75^\\circ = \\cos(45^\\circ + 30^\\circ)$: pon los dos productos y el resultado.', ['cos · cos', 'sen · sen', 'resultado'], ['√6/4', '√2/4', '(√6−√2)/4'], ['(√6+√2)/4', '1/2'], 'El coseno resta.', '$\\tfrac{\\sqrt6 - \\sqrt2}{4}$.')],
    ['La tangente de una suma', xpMira('dibujo', 'Tercera idea: la tangente sale de **dividir** las dos.', { dib: (v, K) => P(K, v, ['tan(a + b) = sen(a+b)/cos(a+b)', '(tan a + tan b)/(1 − tan a tan b)', 'tan 105° = tan(60° + 45°)', '(√3 + 1)/(1 − √3) = −2 − √3'], 34, 34, 's'), v: { n: 1 }, alto: 160 }, [
      ['Se divide todo entre coseno por coseno.', { n: 2 }, '$\\tfrac{\\tan a + \\tan b}{1 - \\tan a\\tan b}$'],
      ['Arriba la suma; abajo, uno menos el producto.', {}, '$\\tan(a + b)$'],
      ['Probemos con 60° y 45°.', { n: 3 }, '$105^\\circ$'],
      ['Da negativo: 105° está en el segundo cuadrante.', { n: 4 }, '$-2 - \\sqrt3$'],
    ], '$\\tan(a \\pm b) = \\tfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}$.'),
    xpFila('$\\tan a = 2$, $\\tan b = 3$. Pon arriba, abajo y $\\tan(a+b)$.', ['arriba', 'abajo', 'resultado'], ['5', '−5', '−1'], ['6', '7', '1'], 'Uno menos seis.', '$\\tfrac{5}{-5}$.')],
    ['Ahora sí, un problema', xpFila('$\\operatorname{sen}a = \\tfrac35$ y $\\operatorname{sen}b = \\tfrac{5}{13}$, agudos. Pon $\\cos a$, $\\cos b$ y $\\operatorname{sen}(a+b)$.', ['cos a', 'cos b', 'sen(a+b)'], ['4/5', '12/13', '56/65'], ['16/65', '33/65', '3/4'], '$\\tfrac35\\cdot\\tfrac{12}{13} + \\tfrac45\\cdot\\tfrac{5}{13}$.', '$\\tfrac{36 + 20}{65}$.')],
  ], 'Con dos ángulos conocidos se arman otros.');

  // ---------------------------------------------------------------------------------------------------------- trig-48b
  xpLec('trig-48b', [
    ['El doble', xpMira('dibujo', 'Empecemos por la idea: el doble es **la suma consigo mismo**.', { dib: (v, K) => P(K, v, ['sen 2a = sen(a + a)', '= 2 sen a cos a', 'cos 2a = cos² a − sen² a', '= 1 − 2 sen² a = 2 cos² a − 1'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se usa la suma con b igual a a.', { n: 2 }, '$\\operatorname{sen}2a = 2\\operatorname{sen}a\\cos a$'],
      ['El coseno da una resta de cuadrados.', { n: 3 }, '$\\cos 2a = \\cos^2 a - \\operatorname{sen}^2 a$'],
      ['Con Pitágoras tiene otras dos caras.', { n: 4 }, '$1 - 2\\operatorname{sen}^2 a = 2\\cos^2 a - 1$'],
      ['Doblar el ángulo no dobla el seno.', {}, '$\\operatorname{sen}60^\\circ \\neq 2\\operatorname{sen}30^\\circ$'],
    ], '$\\operatorname{sen}2a = 2\\operatorname{sen}a\\cos a$; $\\cos 2a = \\cos^2a - \\operatorname{sen}^2a$.'),
    xpFila('$\\operatorname{sen}a = \\tfrac35$, agudo. Pon $\\cos a$, $\\operatorname{sen}2a$ y $\\cos 2a$.', ['cos a', 'sen 2a', 'cos 2a'], ['4/5', '24/25', '7/25'], ['6/5', '12/25', '8/5'], '$2\\cdot\\tfrac35\\cdot\\tfrac45$ y $\\tfrac{16}{25} - \\tfrac{9}{25}$.', '24/25 y 7/25.')],
    ['La mitad', xpMira('dibujo', 'Segunda idea: de cos 2a se **despeja** la mitad.', { dib: (v, K) => P(K, v, ['cos 2a = 1 − 2 sen² a', 'sen² a = (1 − cos 2a)/2', 'sen² 15° = (1 − cos 30°)/2', '= (2 − √3)/4'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se despeja el seno al cuadrado.', { n: 2 }, '$\\operatorname{sen}^2 a = \\tfrac{1 - \\cos 2a}{2}$'],
      ['El coseno al cuadrado lleva más.', {}, '$\\cos^2 a = \\tfrac{1 + \\cos 2a}{2}$'],
      ['Con a = 15° se usa el coseno de 30°.', { n: 3 }, '$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$'],
      ['El signo de la raíz lo da el cuadrante de la mitad.', { n: 4 }, '$\\operatorname{sen}15^\\circ = \\tfrac{\\sqrt{2 - \\sqrt3}}{2}$'],
    ], '$\\operatorname{sen}^2a = \\tfrac{1 - \\cos2a}{2}$, $\\cos^2a = \\tfrac{1 + \\cos2a}{2}$.'),
    xpFila('$\\cos 2a = \\tfrac{7}{25}$, a agudo. Pon $\\operatorname{sen}^2a$ y $\\operatorname{sen}a$.', ['sen² a', 'sen a'], ['9/25', '3/5'], ['16/25', '4/5', '18/25'], 'Uno menos 7/25, la mitad.', '$\\tfrac{18/25}{2}$.')],
    ['Verlo en la rueda', xpMira('dibujo', 'Tercera idea: doblar el ángulo **salta** en la rueda.', { dib: (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (([x, y]) => K.l(130, 110, x, y, 'lf gr') + K.c(x, y, 6, 'fF'))(K.at(130, 110, 84, 2 * v.g)), v: { g: 20 }, alto: 225 }, [
      ['Un radio es a; el rojo, 2a.', {}, '$a, \\ 2a$'],
      ['Con a = 45°, el doble está arriba.', { g: 45 }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['Con 60°, el doble ya tiene coseno negativo.', { g: 60 }, '$\\cos 120^\\circ = -\\tfrac12$'],
      ['Con 90°, el doble está a la izquierda.', { g: 90 }, '$\\cos 180^\\circ = -1$'],
    ], 'El doble puede cambiar de cuadrante y de signo.'),
    xpMueve('Mueve a hasta que $\\operatorname{sen}2a$ sea **1**.', 290, { g: 15 }, ang(90, 15, 'a (grados)'), { g: 45 }, (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (([x, y]) => K.l(130, 110, x, y, 'lf gr') + K.c(x, y, 6, 'fF'))(K.at(130, 110, 84, 2 * v.g)), '$2 \\cdot 45^\\circ = 90^\\circ$.', { lee: v => `$2a = ${2 * v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('El alcance de un tiro depende de $\\operatorname{sen}2a$. Con $\\operatorname{sen}a\\cos a = 0.4$, pon $\\operatorname{sen}2a$; y el ángulo de mayor alcance.', ['sen 2a', 'mejor a'], ['0.8', '45°'], ['0.4', '90°', '0.16'], 'El doble del producto; y sen 2a = 1.', 'Máximo en $2a = 90^\\circ$.')],
  ], 'Doble: suma consigo. Mitad: se despeja.');

  // ---------------------------------------------------------------------------------------------------------- trig-49
  const red = (v, K) => { const p = XM.plano(K, 0, 12.57, -1.6, 1.6, { H: 180, g: 1.5708, gy: 1 }); return p.s + XM.curva(K, p, Math.sin) + K.l(18, p.Y(v.h), 322, p.Y(v.h), 'lf gr') + (Math.abs(v.h) <= 1 ? [Math.asin(v.h), Math.PI - Math.asin(v.h)].flatMap(x => [x, x + 2 * Math.PI, x + 4 * Math.PI]).filter(x => x >= -0.001 && x <= 12.57).map(x => K.c(p.X(x), p.Y(v.h), 5, 'fF')).join('') : ''); };
  xpLec('trig-49', [
    ['Infinitas soluciones', xpMira('dibujo', 'Empecemos por la idea: una recta corta la ola **muchas veces**.', { dib: red, v: { h: 0.5 }, alto: 190 }, [
      ['Seno igual a un medio: cada cruce es una solución.', {}, '$\\operatorname{sen}x = \\tfrac12$'],
      ['En cada ciclo hay dos: 30° y 150°.', {}, '$\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$'],
      ['Las demás se repiten cada vuelta.', {}, '$x = \\tfrac{\\pi}{6} + 2k\\pi$'],
      ['Con 1 solo hay una por ciclo.', { h: 1 }, '$\\operatorname{sen}x = 1$'],
      ['Con más de 1, ninguna.', { h: 1.4 }, '$\\operatorname{sen}x = 1.4 \\ \\text{no}$'],
    ], 'Halla las de un ciclo y suma vueltas.'),
    xpMueve('Sube la recta hasta que haya **una sola** solución por ciclo, arriba.', 250, { h: 0 }, [xpRegla('h', -1, 1.5, 'altura', 0.5)], { h: 1 }, red, 'La recta apenas toca la cresta.', { lee: v => `$\\operatorname{sen}x = ${v.h}$` })],
    ['Despejar primero', xpMira('dibujo', 'Segunda idea: se **despeja la función** y luego se busca el ángulo.', { dib: (v, K) => P(K, v, ['2 cos x + 1 = 0', 'cos x = −1/2', 'x = 120° o 240°'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Como si cos x fuera una letra.', { n: 2 }, '$\\cos x = -\\tfrac12$'],
      ['Referencia 60°; el coseno es negativo en II y III.', { n: 3 }, '$120^\\circ, 240^\\circ$'],
      ['Entre 0 y 360 esas son las dos.', {}, '$0 \\le x < 360^\\circ$'],
      ['En general se suman vueltas completas.', {}, '$+\\ 360^\\circ k$'],
    ], 'Despeja, referencia, cuadrantes, vueltas.'),
    xpFila('$2\\operatorname{sen}x - \\sqrt3 = 0$ entre 0° y 360°. Ponlas en orden.', ['menor', 'mayor'], ['60°', '120°'], ['30°', '240°', '150°'], 'sen x = √3/2: primero y segundo.', '60° y 120°.')],
    ['Factorizar', xpMira('dibujo', 'Tercera idea: si hay cuadrados, se **factoriza** como cuadrática.', { dib: (v, K) => P(K, v, ['2 sen² x − sen x = 0', 'sen x (2 sen x − 1) = 0', 'sen x = 0  o  sen x = 1/2', '0°, 180°, 30°, 150°'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['No se divide entre seno: se perderían soluciones.', {}, '$\\operatorname{sen}x \\neq 0 \\ ?$'],
      ['Mejor se saca factor común.', { n: 2 }, '$\\operatorname{sen}x(2\\operatorname{sen}x - 1)$'],
      ['Cada factor da sus ángulos.', { n: 3 }, '$\\operatorname{sen}x = 0, \\tfrac12$'],
      ['Son cuatro en una vuelta.', { n: 4 }, '$0^\\circ, 30^\\circ, 150^\\circ, 180^\\circ$'],
    ], 'Factoriza; si hay dos funciones, déjalas en una.'),
    xpFila('$\\cos^2x = 1$ entre 0° y 360° (sin 360°). Pon cuántas hay y la mayor.', ['cuántas', 'mayor'], ['2', '180°'], ['1', '4', '270°'], 'cos x = 1 o cos x = −1.', '0° y 180°.')],
    ['Ahora sí, un problema', xpFila('Una noria está a $h = 10 + 8\\operatorname{sen}x$. ¿A qué dos ángulos está a 14 m?', ['menor', 'mayor'], ['30°', '150°'], ['60°', '120°', '210°'], '8 sen x = 4.', '$\\operatorname{sen}x = \\tfrac12$.')],
  ], 'Un ciclo, sus dos ángulos y las vueltas.');

  // ---------------------------------------------------------------------------------------------------------- trig-46a
  const T3 = (K, A, B, C, o = {}) => K.p([A, B, C], 'fc') + K.t(A[0] - 10, A[1] + 14, 'A', 's') + K.t(B[0] + 10, B[1] + 14, 'B', 's') + K.t(C[0], C[1] - 8, 'C', 's') + K.t((A[0] + B[0]) / 2, A[1] + 18, o.c || 'c', 's ta') + K.t((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2, o.a || 'a', 's ta', 'start') + K.t((A[0] + C[0]) / 2 - 10, (A[1] + C[1]) / 2, o.b || 'b', 's ta', 'end');
  const osc = (v, K) => { const A = [50, 160], C = [50 + 120 * Math.cos(rad(40)), 160 - 120 * Math.sin(rad(40))], r = v.r, hh = 160 - C[1], d = Math.sqrt(Math.max(0, r * r - hh * hh)); return K.l(30, 160, 330, 160, 'lm') + K.l(...A, ...C, 'la gr') + (r >= hh - 0.01 ? [-d, d].map(q => (C[0] + q > A[0] + 2 ? K.l(C[0], C[1], C[0] + q, 160, 'lf gr') + K.c(C[0] + q, 160, 5, 'fF') : '')).join('') : K.l(C[0], C[1], C[0], C[1] + r, 'lf gr')) + K.t(200, 40, v.p || '', 'ta'); };
  xpLec('trig-46a', [
    ['Cada lado con su ángulo', xpMira('dibujo', 'Empecemos por la idea: la altura une **dos lados con sus ángulos**.', { dib: (v, K) => T3(K, [50, 160], [280, 160], [150, 50]) + K.f(v.h, K.l(150, 50, 150, 160, 'lf gr') + K.t(160, 120, 'h', 'b tf', 'start')), v: { h: 0 }, alto: 190 }, [
      ['Un triángulo cualquiera, sin ángulo recto.', {}, '$A, B, C$'],
      ['Se traza la altura: dos triángulos rectángulos.', { h: 1 }, '$h$'],
      ['Desde A, la altura es b por seno de A.', {}, '$h = b\\operatorname{sen}A$'],
      ['Desde B, es a por seno de B. Es la misma.', {}, '$b\\operatorname{sen}A = a\\operatorname{sen}B$'],
      ['Cada lado sobre el seno de su opuesto da lo mismo.', {}, '$\\tfrac{a}{\\operatorname{sen}A} = \\tfrac{b}{\\operatorname{sen}B} = \\tfrac{c}{\\operatorname{sen}C}$'],
    ], 'Lado sobre seno del ángulo opuesto: igual en los tres.'),
    xpFila('A = 30°, B = 45° y a = 6. Pon C y b.', ['C', 'b'], ['105°', '6√2'], ['75°', '3√2', '12'], 'Suman 180°; $b = \\tfrac{6\\operatorname{sen}45^\\circ}{\\operatorname{sen}30^\\circ}$.', '$12 \\cdot \\tfrac{\\sqrt2}{2}$.')],
    ['Cuándo sirve', xpMira('dibujo', 'Segunda idea: hace falta **una pareja completa**: un lado y su ángulo opuesto.', { dib: (v, K) => T3(K, [50, 160], [280, 160], [150, 50], { a: v.a, b: v.b, c: v.c }) + K.t(170, 24, v.p, 'ta'), v: { a: '?', b: '9', c: '?', p: '' }, alto: 190 }, [
      ['Dos ángulos y un lado: se halla el tercer ángulo y sirve.', { p: 'A, B y un lado ✓' }, '$180^\\circ - A - B$'],
      ['Dos lados y el ángulo opuesto a uno: sirve, con cuidado.', { a: '7', p: 'a, b y A ✓' }, '$\\tfrac{7}{\\operatorname{sen}A}$'],
      ['Dos lados y el ángulo entre ellos: no hay pareja.', { c: '10', a: '?', p: 'b, c y A ✗' }, '$\\text{cosenos}$'],
      ['Con tres lados tampoco hay pareja.', { a: '7', p: 'a, b y c ✗' }, '$\\text{cosenos}$'],
    ], 'Sin pareja lado–opuesto se usa la ley de cosenos.'),
    xpFila('¿Cuál ley? Datos conocidos:', ['A, B, a', 'a, b, C', 'a, b, A'], ['senos', 'cosenos', 'senos'], ['ninguna', 'cosenos'], '¿Hay un lado con su opuesto?', 'En a, b, C no hay pareja.')],
    ['El caso dudoso', xpMira('dibujo', 'Tercera idea: con dos lados y un opuesto puede haber **0, 1 o 2** triángulos.', { dib: osc, v: { r: 60, p: 'no alcanza' }, alto: 180 }, [
      ['El lado rojo cuelga de C. Si es corto, no llega.', {}, '$a < h$'],
      ['Si mide justo la altura, hay uno: rectángulo.', { r: 77.13, p: 'uno' }, '$a = h$'],
      ['Un poco más largo: toca en dos sitios. Dos triángulos.', { r: 95, p: 'dos' }, '$h < a < b$'],
      ['Más largo que b: solo uno.', { r: 140, p: 'uno' }, '$a \\ge b$'],
    ], 'Compara a con la altura $h = b\\operatorname{sen}A$ y con b.'),
    xpFila('A = 30° y b = 16: la altura es 8. ¿Cuántos triángulos?', ['a = 6', 'a = 11', 'a = 20'], ['0', '2', '1'], ['3'], 'Compara con 8 y con 16.', 'No llega; dos; uno.')],
    ['Ahora sí, un problema', xpFila('Desde A y B, a 20 m, se ve un árbol C con A = 45° y B = 105°. Pon C y la distancia AC sobre $\\operatorname{sen}B$.', ['C', '20/sen C'], ['30°', '40'], ['60°', '20', '10'], 'El lado de 20 es opuesto a C.', '$\\tfrac{20}{1/2} = 40$.')],
  ], 'Una pareja completa manda; en el dudoso, mira la altura.');

  // ---------------------------------------------------------------------------------------------------------- trig-46b
  const bis = (v, K) => { const [x, y] = K.at(130, 160, 110, v.g); return K.l(130, 160, 280, 160, 'lg gr') + K.l(130, 160, x, y, 'la gr') + K.l(x, y, 280, 160, 'lf gr') + K.ang([130, 160], [280, 160], [x, y], 26, `${Math.round(v.g)}°`, 'fa') + K.t(240, 60, v.p || '', 'ta'); };
  xpLec('trig-46b', [
    ['Pitágoras con corrección', xpMira('dibujo', 'Empecemos por la idea: la ley de cosenos es **Pitágoras corregido**.', { dib: bis, v: { g: 90, p: '' }, alto: 185 }, [
      ['Con 90° vale Pitágoras.', {}, '$c^2 = a^2 + b^2$'],
      ['Si el ángulo se cierra, el tercer lado se acorta: hay que quitar.', { g: 50 }, '$c^2 < a^2 + b^2$'],
      ['Si se abre, se alarga: hay que agregar.', { g: 130 }, '$c^2 > a^2 + b^2$'],
      ['La corrección es 2ab por el coseno, que cambia de signo en 90°.', {}, '$c^2 = a^2 + b^2 - 2ab\\cos C$'],
    ], '$c^2 = a^2 + b^2 - 2ab\\cos C$.'),
    xpFila('Lados 3 y 8 con 60° entre ellos. Pon $2ab\\cos C$, $c^2$ y c.', ['corrección', 'c²', 'c'], ['24', '49', '7'], ['48', '97', '73'], '2 · 3 · 8 · ½; 9 + 64 − 24.', '$c = 7$.')],
    ['Hallar un ángulo', xpMira('dibujo', 'Segunda idea: con tres lados se **despeja el coseno**.', { dib: (v, K) => P(K, v, ['lados 5, 6 y 7', '49 = 25 + 36 − 60 cos C', 'cos C = 12/60 = 1/5'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['El lado solo a la izquierda es el opuesto al ángulo buscado.', { n: 2 }, '$7^2 = 5^2 + 6^2 - 2 \\cdot 5 \\cdot 6\\cos C$'],
      ['De ahí se despeja el coseno.', { n: 3 }, '$\\cos C = \\tfrac{12}{60}$'],
      ['Positivo: el ángulo es agudo.', {}, '$C < 90^\\circ$'],
      ['Si sale negativo, es obtuso.', {}, '$C > 90^\\circ$'],
    ], '$\\cos C = \\tfrac{a^2 + b^2 - c^2}{2ab}$.'),
    xpFila('Lados 5, 16 y 19. Para el ángulo opuesto a 19: pon arriba, abajo y el coseno.', ['a²+b²−c²', '2ab', 'cos C'], ['−80', '160', '−1/2'], ['80', '1/2', '642'], '25 + 256 − 361.', 'Ángulo de $120^\\circ$.')],
    ['El área', xpMira('dibujo', 'Tercera idea: el área es **medio lado por lado por seno**.', { dib: bis, v: { g: 30, p: '' }, alto: 185 }, [
      ['La base es un lado; la altura, el otro por el seno.', {}, '$h = a\\operatorname{sen}C$'],
      ['El área es media base por altura.', {}, '$A = \\tfrac12 ab\\operatorname{sen}C$'],
      ['Crece hasta 90° y después baja.', { g: 90 }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['Con 150° vale lo mismo que con 30°.', { g: 150 }, '$\\operatorname{sen}150^\\circ = \\operatorname{sen}30^\\circ$'],
    ], '$A = \\tfrac12 ab\\operatorname{sen}C$; es mayor con 90°.'),
    xpMueve('Abre la bisagra hasta que el área sea la **máxima**.', 250, { g: 30 }, ang(165, 15), { g: 90 }, bis, 'El seno vale 1 en 90°.', { lee: v => `$C = ${v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('Dos caminos de 16 y 10 km salen de un pueblo con 60°. Pon la distancia entre los extremos y el área.', ['distancia', 'área'], ['14', '40√3'], ['196', '80', '2√129'], '256 + 100 − 160; y ½ · 16 · 10 · √3/2.', '$\\sqrt{196}$ y $40\\sqrt3$.')],
  ], 'Pitágoras corregido y el área con seno.');

  // ---------------------------------------------------------------------------------------------------------- trig-151
  const Z = (v, K) => { const p = XM.plano(K, -6.6, 6.6, -4, 4, { H: 200 }), x = v.r * Math.cos(rad(v.g)), y = v.r * Math.sin(rad(v.g)); const u = (p.X(1) - p.X(0)), w = (p.Y(0) - p.Y(1)); return p.s + `<ellipse class="xl lm d" cx="${p.X(0)}" cy="${p.Y(0)}" rx="${XPK.n(v.r * u)}" ry="${XPK.n(v.r * w)}"/>` + K.l(p.X(x), p.Y(0), p.X(x), p.Y(y), 'lf') + K.ar(p.X(0), p.Y(0), p.X(x), p.Y(y), 'la gr') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('trig-151', [
    ['Distancia y giro', xpMira('dibujo', 'Empecemos por la idea: un complejo se dice con **cuánto** y **hacia dónde**.', { dib: Z, v: { r: 2, g: 0, p: '' }, alto: 210 }, [
      ['Hay dos maneras de llegar a un punto: cuadras o distancia y dirección.', {}, '$a + bi$'],
      ['La distancia es el módulo r.', { r: 3 }, '$r = |z|$'],
      ['La dirección es el argumento θ.', { g: 60, p: '60°' }, '$\\theta = 60^\\circ$'],
      ['Sus cuadras salen con coseno y seno.', {}, '$a = r\\cos\\theta, \\ b = r\\operatorname{sen}\\theta$'],
      ['Esa es la llamada forma polar.', {}, '$z = r(\\cos\\theta + i\\operatorname{sen}\\theta)$'],
    ], '$z = r(\\cos\\theta + i\\operatorname{sen}\\theta) = r\\operatorname{cis}\\theta$.'),
    xpMueve('Lleva la flecha a $3\\operatorname{cis}135^\\circ$.', 300, { r: 1, g: 0, p: '' }, [xpRegla('r', 1, 4, 'módulo'), xpRegla('g', 0, 315, 'ángulo', 45)], { r: 3, g: 135 }, Z, 'Distancia 3, dirección 135°.', { lee: v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$` })],
    ['De cuadras a polar', xpMira('dibujo', 'Segunda idea: **Pitágoras** da el módulo y el **cuadrante** corrige el ángulo.', { dib: Z, v: { r: 2.83, g: 45, p: '2 + 2i' }, alto: 210 }, [
      ['2 + 2i: módulo raíz de 8, ángulo 45°.', {}, '$\\sqrt{4 + 4} = 2\\sqrt2$'],
      ['El −2 + 2i tiene el mismo módulo.', { g: 135, p: '−2 + 2i' }, '$2\\sqrt2$'],
      ['La calculadora da −45°, pero está en el segundo: es 135°.', {}, '$180^\\circ - 45^\\circ$'],
      ['Dibuja siempre antes de escribir el ángulo.', {}, '$\\tan\\theta = \\tfrac{b}{a}$'],
    ], '$r = \\sqrt{a^2 + b^2}$; θ con el cuadrante.'),
    xpFila('$z = -\\sqrt3 + i$. Pon el módulo y el argumento.', ['módulo', 'argumento'], ['2', '150°'], ['4', '−30°', '30°'], '3 + 1; está en el segundo, referencia 30°.', '$2\\operatorname{cis}150^\\circ$.')],
    ['De polar a cuadras', xpMira('dibujo', 'Tercera idea: para volver se **multiplica** por coseno y seno.', { dib: Z, v: { r: 4, g: 60, p: '4 cis 60°' }, alto: 210 }, [
      ['Cuatro en dirección 60°.', {}, '$4\\operatorname{cis}60^\\circ$'],
      ['Horizontal: 4 por un medio.', {}, '$4 \\cdot \\tfrac12 = 2$'],
      ['Vertical: 4 por raíz de tres medios.', {}, '$4 \\cdot \\tfrac{\\sqrt3}{2} = 2\\sqrt3$'],
      ['Sumar vueltas no cambia el número.', {}, '$60^\\circ + 360^\\circ = 420^\\circ$'],
    ], '$a = r\\cos\\theta$ y $b = r\\operatorname{sen}\\theta$.'),
    xpFila('$6\\operatorname{cis}120^\\circ$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['−3', '3√3'], ['3', '−3√3', '6'], 'Segundo cuadrante: coseno −½.', '$-3 + 3\\sqrt3\\,i$.')],
    ['Ahora sí, un problema', xpFila('Un barco está 5 al este y 5 al sur del puerto: $5 - 5i$. Pon la distancia y la dirección (0° a 360°).', ['distancia', 'dirección'], ['5√2', '315°'], ['10', '45°', '225°'], 'Cuarto cuadrante, referencia 45°.', '$5\\sqrt2\\operatorname{cis}315^\\circ$.')],
  ], 'Cuánto y hacia dónde: módulo y argumento.');

  // ---------------------------------------------------------------------------------------------------------- trig-152
  const mul = (v, K) => { const p = XM.plano(K, -7.8, 7.8, -5, 5, { H: 210 }), q = (r, g) => [p.X(r * Math.cos(rad(g))), p.Y(r * Math.sin(rad(g)))]; return p.s + K.ar(p.X(0), p.Y(0), ...q(v.r, v.g), 'la gr') + K.ar(p.X(0), p.Y(0), ...q(v.s, v.h), 'lf gr') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('trig-152', [
    ['Multiplicar es girar y estirar', xpMira('dibujo', 'Empecemos por la idea: los módulos **se multiplican** y los ángulos **se suman**.', { dib: mul, v: { r: 2, g: 30, s: 2, h: 30, p: '' }, alto: 220 }, [
      ['Empezamos en 2 cis 30°.', {}, '$2\\operatorname{cis}30^\\circ$'],
      ['Multiplicar por 2 cis 60°: primero gira 60°.', { h: 90 }, '$30^\\circ + 60^\\circ$'],
      ['Y además se estira al doble.', { s: 4 }, '$2 \\cdot 2 = 4$'],
      ['El producto: 4 cis 90°, que es 4i.', { p: '4 cis 90°' }, '$4\\operatorname{cis}90^\\circ = 4i$'],
      ['Dividir hace lo contrario: divide y resta.', {}, '$\\tfrac{r_1}{r_2}\\operatorname{cis}(\\theta_1 - \\theta_2)$'],
    ], 'Producto: módulos por, ángulos más. Cociente: entre y menos.'),
    xpMueve('Lleva la flecha roja al producto de $2\\operatorname{cis}45^\\circ$ por $2\\operatorname{cis}90^\\circ$.', 310, { r: 2, g: 45, s: 2, h: 45, p: '' }, [xpRegla('s', 1, 5, 'módulo'), xpRegla('h', 0, 315, 'ángulo', 45)], { s: 4, h: 135 }, mul, '$4\\operatorname{cis}135^\\circ$.', { lee: v => `$${v.s}\\operatorname{cis}${v.h}^\\circ$` })],
    ['Potencias: De Moivre', xpMira('dibujo', 'Segunda idea: elevar es **multiplicar muchas veces** por el mismo.', { dib: mul, v: { r: 1.5, g: 30, s: 1.5, h: 30, p: 'z' }, alto: 220 }, [
      ['Aquí está z, con ángulo 30°.', {}, '$z = r\\operatorname{cis}30^\\circ$'],
      ['Al cuadrado: 60° y módulo al cuadrado.', { s: 2.25, h: 60, p: 'z²' }, '$r^2\\operatorname{cis}60^\\circ$'],
      ['Al cubo: 90° y módulo al cubo.', { s: 3.375, h: 90, p: 'z³' }, '$r^3\\operatorname{cis}90^\\circ$'],
      ['En general, n veces el ángulo.', {}, '$z^n = r^n\\operatorname{cis}(n\\theta)$'],
      ['Los puntos dibujan una espiral.', { s: 5, h: 120, p: 'z⁴' }, '$z^4$'],
    ], '$(r\\operatorname{cis}\\theta)^n = r^n\\operatorname{cis}(n\\theta)$.'),
    xpFila('$(2\\operatorname{cis}20^\\circ)^5$: pon el módulo y el ángulo.', ['módulo', 'ángulo'], ['32', '100°'], ['10', '25°', '160°'], '2 a la 5; cinco veces 20°.', '$32\\operatorname{cis}100^\\circ$.')],
    ['Cuando conviene', xpMira('dibujo', 'Tercera idea: para potencias grandes, **pasa a polar**.', { dib: (v, K) => P(K, v, ['(1 + i)⁸', '√2 cis 45°', '(√2)⁸ cis 360°', '16'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Multiplicar ocho veces sería largo.', {}, '$(1 + i)^8$'],
      ['En polar: raíz de dos, 45°.', { n: 2 }, '$\\sqrt2\\operatorname{cis}45^\\circ$'],
      ['Módulo a la 8 es 16; ocho veces 45 es 360.', { n: 3 }, '$16\\operatorname{cis}360^\\circ$'],
      ['Una vuelta completa: es el número 16.', { n: 4 }, '$16$'],
    ], 'Polar, De Moivre y volver.'),
    xpFila('$(1 + i)^4$: pon el módulo, el ángulo y el resultado.', ['módulo', 'ángulo', 'resultado'], ['4', '180°', '−4'], ['2', '45°', '4i'], '(√2)⁴ y 4 · 45°.', '$4\\operatorname{cis}180^\\circ = -4$.')],
    ['Ahora sí, un problema', xpFila('Un engranaje multiplica por $3\\operatorname{cis}40^\\circ$ en cada paso. Tras 3 pasos, pon el estiramiento y el giro.', ['estira', 'gira'], ['27', '120°'], ['9', '43°', '64°'], '3 al cubo; tres veces 40°.', '$27\\operatorname{cis}120^\\circ$.')],
  ], 'Multiplicar gira y estira; elevar lo repite.');

  // ---------------------------------------------------------------------------------------------------------- trig-153
  const flor = (v, K) => { const n = Math.round(v.n); return K.c(120, 110, 80, 'fn') + Array.from({ length: n }, (_, k) => { const [x, y] = K.at(120, 110, 80, v.a + 360 * k / n); return K.l(120, 110, x, y, 'la') + K.c(x, y, 7, k ? 'fG' : 'fF'); }).join('') + K.l(20, 110, 225, 110, 'lm') + K.t(240, 70, v.p || '', 'ta', 'start'); };
  xpLec('trig-153', [
    ['Deshacer la potencia', xpMira('dibujo', 'Empecemos por la idea: la raíz **parte el ángulo** y saca raíz del módulo.', { dib: (v, K) => P(K, v, ['w³ = 8 cis 60°', 'módulo: raíz cúbica de 8 = 2', 'ángulo: 60° ÷ 3 = 20°', 'w = 2 cis 20°'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Buscamos w que al cubo dé 8 cis 60°.', {}, '$w^3 = z$'],
      ['El módulo: la raíz cúbica de 8.', { n: 2 }, '$\\sqrt[3]{8} = 2$'],
      ['El ángulo: la tercera parte.', { n: 3 }, '$60^\\circ \\div 3 = 20^\\circ$'],
      ['Esa es una raíz. Pero no la única.', { n: 4 }, '$2\\operatorname{cis}20^\\circ$'],
    ], 'Primera raíz: $\\sqrt[n]{r}\\operatorname{cis}\\tfrac{\\theta}{n}$.'),
    xpFila('Una raíz cuarta de $16\\operatorname{cis}80^\\circ$: pon módulo y ángulo.', ['módulo', 'ángulo'], ['2', '20°'], ['4', '320°', '40°'], 'Raíz cuarta de 16; la cuarta parte de 80.', '$2\\operatorname{cis}20^\\circ$.')],
    ['Las hermanas', xpMira('dibujo', 'Segunda idea: hay **n raíces**, repartidas como pétalos.', { dib: flor, v: { n: 1, a: 20, p: '' }, alto: 220 }, [
      ['60° y 420° son la misma dirección.', {}, '$60^\\circ + 360^\\circ$'],
      ['420 entre 3 es 140: otra raíz, a 120° de la primera.', { n: 3, p: '3 raíces' }, '$140^\\circ$'],
      ['La tercera, a otros 120°: 260°.', {}, '$260^\\circ$'],
      ['La siguiente sería 380°: ya es la primera.', {}, '$380^\\circ = 20^\\circ$'],
      ['Con n raíces, la separación es 360 entre n.', { n: 5, p: '5 raíces' }, '$\\tfrac{360^\\circ}{n}$'],
    ], 'n raíces separadas $\\tfrac{360^\\circ}{n}$ en un círculo de radio $\\sqrt[n]{r}$.'),
    xpMueve('Pon las raíces **octavas** con la primera en 10°.', 310, { n: 2, a: 0, p: '' }, [xpRegla('n', 2, 8, 'cuántas raíces'), xpRegla('a', 0, 60, 'primera (grados)', 10)], { n: 8, a: 10 }, flor, 'Ocho raíces, cada 45°.', { lee: v => `$\\tfrac{360^\\circ}{${v.n}}$` })],
    ['Las raíces de 1', xpMira('dibujo', 'Tercera idea: las raíces de 1 hacen un **polígono regular**.', { dib: (v, K) => flor(v, K) + K.f(v.l, K.p(Array.from({ length: Math.max(3, Math.round(v.n)) }, (_, k) => K.at(120, 110, 80, 360 * k / Math.max(3, Math.round(v.n)))), 'fa')), v: { n: 2, a: 0, p: '', l: 0 }, alto: 220 }, [
      ['Las raíces cuadradas de 1 son 1 y −1.', {}, '$\\pm1$'],
      ['Las cúbicas forman un triángulo.', { n: 3, l: 1 }, '$0^\\circ, 120^\\circ, 240^\\circ$'],
      ['Cuartas: un cuadrado, con i y −i.', { n: 4 }, '$1, i, -1, -i$'],
      ['Si se suman todas, dan 0: se equilibran.', {}, '$1 + i - 1 - i = 0$'],
    ], 'Las raíces de 1 son los vértices de un polígono y suman 0.'),
    xpFila('Raíces cuadradas de $-9 = 9\\operatorname{cis}180^\\circ$: pon el módulo y los ángulos.', ['módulo', 'menor', 'mayor'], ['3', '90°', '270°'], ['9', '180°', '45°'], 'La mitad de 180; y media vuelta más.', '$3i$ y $-3i$.')],
    ['Ahora sí, un problema', xpFila('Resuelve $z^3 = 27$: pon el módulo y los ángulos de las tres, en orden.', ['módulo', '1.ª', '2.ª', '3.ª'], ['3', '0°', '120°', '240°'], ['9', '90°', '180°'], '27 tiene ángulo 0°.', '3, $3\\operatorname{cis}120^\\circ$ y $3\\operatorname{cis}240^\\circ$.')],
  ], 'n raíces: un círculo repartido en partes iguales.');
}
;
//#archivo js/explora-trig-41a.js
// Trigonometría · trig-41a «Grados y radianes»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva; motor en
// js/explora.js, escena «angulo» en js/explora-angulo.js). Mismo formato que pu-cm-1 y alg-0a: cada capítulo abre con una
// explicación que corre sola, sigue «tu turno» y el problema va al final. Los ejemplos no salen en los ejercicios de la
// lección (5π/6, −3π/4, 5π/3, 405°, −210°, 765°, −300°…) y no se dice cuántos grados mide un radián: eso lo calcula un ejercicio.
EXPLORA['trig-41a'] = {
  caps: ['Un ángulo es un giro', 'Grados', 'Radianes', 'Convertir', 'Coterminales', 'Ahora sí, un problema'],
  pasos: [
    // ---- Un ángulo es un giro ----
    { cap: 0, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'Empecemos por la idea: un ángulo **mide un giro**. Mira la rueda.',
      momentos: [
        { de: 0, a: 0, cuenta: '$\\theta = 0^\\circ$', dice: 'Todo empieza en el eje x positivo. Esa raya fija es el **lado inicial**.' },
        { de: 0, a: 120, ms: 1800, cuenta: '$\\theta = 120^\\circ$', dice: 'El **lado terminal** gira. Contra las agujas del reloj, el ángulo es **positivo**.' },
        { de: 120, a: -75, ms: 2400, cuenta: '$\\theta = -75^\\circ$', dice: 'Si gira como las agujas del reloj, el ángulo es **negativo**: la espiral cambia de color.' },
        { de: -75, a: -75, cuenta: '$\\theta = -75^\\circ$', dice: 'Vértice en el origen y lado inicial sobre el semieje x positivo: así es un ángulo en **posición estándar**.' },
      ],
      idea: 'Un ángulo mide un giro desde el eje x positivo: contra el reloj es positivo; a favor del reloj, negativo.' },
    { cap: 0, tipo: 'angulo', etq: 'grados', meta: -60,
      texto: '**Tu turno.** Arrastra el lado terminal para girar 60° como las agujas del reloj.',
      idea: 'Girar 60° a favor del reloj es $-60^\\circ$.' },

    // ---- Grados ----
    { cap: 1, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'La primera forma de medir: **en grados**.',
      momentos: [
        { de: 0, a: 360, ms: 3200, cuenta: '$360^\\circ$', dice: 'Una vuelta completa mide **360°**: la espiral da la vuelta entera.' },
        { de: 360, a: 180, ms: 2000, cuenta: '$180^\\circ$', dice: 'Media vuelta mide 180°: el lado terminal apunta justo al lado contrario.' },
        { de: 180, a: 90, ms: 1500, cuenta: '$90^\\circ$', dice: 'Un cuarto de vuelta mide 90°: es un ángulo recto, como la esquina de una hoja.' },
        { de: 90, a: 90, cuenta: '$90^\\circ$', dice: '¿Por qué 360? Se atribuye a los babilonios: 360 se reparte en partes iguales de muchas formas.' },
      ],
      idea: 'Una vuelta mide $360^\\circ$, media vuelta $180^\\circ$ y un cuarto de vuelta $90^\\circ$.' },
    { cap: 1, tipo: 'angulo', etq: 'grados', meta: 270,
      texto: '**Tu turno.** Gira tres cuartos de vuelta contra las agujas del reloj.',
      idea: 'Tres cuartos de 360° son $270^\\circ$.' },

    // ---- Radianes ----
    { cap: 2, tipo: 'muestra', escena: 'angulo', en: { etq: 'rad' },
      texto: 'La segunda forma de medir usa **el radio** del círculo: el **radián**.',
      momentos: [
        { de: 0, a: 0, radio: true, etiqueta: '', dice: 'Este es el radio, en dorado: la distancia del centro al borde del círculo.' },
        { de: 0, a: 180 / Math.PI, ms: 2200, radio: true, arco: true, etiqueta: '1 rad', cuenta: '$\\theta = 1 \\text{ rad}$', dice: 'Giramos hasta que el arco recorrido mida lo mismo que el radio. Ese ángulo es **un radián**.' },
        { de: 180 / Math.PI, a: 180, ms: 3000, radios: true, etiqueta: 'π rad', cuenta: '$180^\\circ = \\pi \\text{ rad}$', dice: '¿Cuántos radios caben en media vuelta? Tres… y un poquito más: exactamente π, unos 3.14.' },
        { de: 180, a: 360, ms: 3000, radios: true, etiqueta: '2π rad', cuenta: '$360^\\circ = 2\\pi \\text{ rad}$', dice: 'Una vuelta completa son 2π radianes: un poco más de seis radios alrededor.' },
        { de: 360, a: 90, ms: 2400, cuenta: '$90^\\circ = \\tfrac{\\pi}{2} \\text{ rad}$', dice: 'Los ángulos de todos los días son fracciones de vuelta: por eso en radianes llevan π. Un cuarto de vuelta es π/2.' },
      ],
      idea: 'Un **radián** es el ángulo cuyo arco mide lo mismo que el radio. Media vuelta son $\\pi$ radianes.' },
    { cap: 2, tipo: 'angulo', etq: 'rad', meta: 45,
      texto: '**Tu turno.** Gira hasta $\\tfrac{\\pi}{4}$: la mitad de un cuarto de vuelta.',
      idea: '$\\tfrac{\\pi}{4}$ es la mitad de $\\tfrac{\\pi}{2}$: $45^\\circ$.' },

    // ---- Convertir ----
    { cap: 3, tipo: 'muestra', escena: 'angulo', en: { etq: 'ambos' },
      texto: 'Ahora, cómo **pasar de una medida a la otra**.',
      momentos: [
        { de: 0, a: 180, ms: 2000, cuenta: '$180^\\circ = \\pi \\text{ rad}$', dice: 'La llave: media vuelta mide 180° y también π radianes. Las dos cosas son lo mismo.' },
        { de: 180, a: 60, ms: 1800, cuenta: '$60^\\circ \\cdot \\tfrac{\\pi}{180} = \\tfrac{\\pi}{3}$', dice: 'De grados a radianes: multiplica por π/180. Así, 60° son π/3.' },
        { de: 60, a: 225, ms: 2000, cuenta: '$\\tfrac{5\\pi}{4} \\cdot \\tfrac{180}{\\pi} = 225^\\circ$', dice: 'De radianes a grados: multiplica por 180/π. Así, 5π/4 son 225°.' },
        { de: 225, a: 225, cuenta: '$\\tfrac{5\\pi}{4} = 5 \\cdot 45^\\circ = 225^\\circ$', dice: 'Truco: piensa π como 180°. Entonces π/4 son 45°, y 5π/4 son cinco veces 45°.' },
      ],
      idea: 'Como $180^\\circ = \\pi$ rad: de grados a radianes se multiplica por $\\tfrac{\\pi}{180}$, y al revés por $\\tfrac{180}{\\pi}$.' },
    { cap: 3, tipo: 'angulo', etq: 'grados', meta: 330, pista: 'Piensa π como 180°: π/6 son 30°, y 11π/6 son once veces eso.',
      texto: '**Tu turno.** Gira hasta $\\tfrac{11\\pi}{6}$. La rueda solo muestra grados: convierte primero.',
      idea: '$\\tfrac{11\\pi}{6} \\cdot \\tfrac{180}{\\pi} = 11 \\cdot 30^\\circ = 330^\\circ$.' },
    { cap: 3, tipo: 'casillas', filas: [{ tex: '$90^\\circ$', r: 'π/2' }, { tex: '$\\tfrac{\\pi}{6}$', r: '30°' }], fichas: ['30°', 'π/3', 'π/2', '60°'],
      pista: 'Piensa π como 180°: un cuarto de vuelta es π/2, y π/6 es la sexta parte de 180°.',
      texto: 'Toca la ficha con la otra medida de cada ángulo.',
      idea: '$90^\\circ = \\tfrac{\\pi}{2}$ y $\\tfrac{\\pi}{6} = 30^\\circ$.' },

    // ---- Coterminales ----
    { cap: 4, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'Última idea: ángulos distintos pueden **terminar en el mismo lugar**.',
      momentos: [
        { de: 0, a: 30, ms: 1200, cuenta: '$30^\\circ$', dice: 'Mira dónde termina el ángulo de 30°.' },
        { de: 30, a: 390, ms: 3400, cuenta: '$390^\\circ = 30^\\circ + 360^\\circ$', dice: 'Ahora da una vuelta completa más: 390°. ¡El lado terminal queda en el mismo sitio!' },
        { de: 390, a: -330, ms: 4200, cuenta: '$-330^\\circ = 30^\\circ - 360^\\circ$', dice: 'Y girando hacia atrás, −330° también termina ahí.' },
        { de: -330, a: -330, cuenta: '$\\theta + 360^\\circ \\cdot k$', dice: 'Se llaman **coterminales**: difieren en vueltas completas, θ + 360°·k con k entero.' },
      ],
      idea: 'Los **coterminales** terminan en el mismo lado y difieren en vueltas completas: $\\theta + 360^\\circ k$, $k$ entero.' },
    { cap: 4, tipo: 'angulo', etq: 'grados', cot: 75,
      texto: '**Tu turno.** Gira hasta un ángulo coterminal con 75°, distinto de 75°: con una vuelta de más o de menos.',
      idea: '$75^\\circ + 360^\\circ = 435^\\circ$ y $75^\\circ - 360^\\circ = -285^\\circ$ terminan en el mismo lado.' },

    // ---- Ahora sí, un problema ----
    { cap: 5, tipo: 'angulo', etq: 'ambos', meta: -120, pista: 'Una hora es una vuelta entera, a favor del reloj. Empieza donde quieras: cuenta el giro.',
      texto: 'El minutero de un reloj se mueve durante 20 minutos. ¿Qué ángulo recorre, en grados y en radianes? Ojo con el sentido. Gíralo.',
      idea: '20 minutos son un tercio de vuelta a favor del reloj: $-120^\\circ = -\\tfrac{2\\pi}{3}$.' },
    { cap: 5, tipo: 'cierre', clave: 'trig-41a', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Ángulo como giro, grados, radianes, cómo convertir y ángulos coterminales.' },
  ],
};
