// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/games/fila-a-fila.js
// Fila a fila (geometría vectorial, eliminación de Gauss y Gauss-Jordan): una matriz, aumentada o no, se
// transforma con las tres operaciones elementales de fila — intercambiar dos filas, multiplicar una por
// k ≠ 0 y sumarle a una k veces otra —. Se toca la fila que cambia (y la otra, si hace falta), se elige k
// con dos perillas (numerador y denominador) y se aplica; se puede deshacer. La meta de cada ronda es
// dejar el bloque izquierdo en forma escalonada o escalonada reducida (así sirve para sistemas sin
// solución y para [A | I] → [I | A⁻¹]). Con det: true se lleva la cuenta det A = factor · det(actual).
// params = { rounds: [{ M: [[números]], aug: columnas tras la barra, goal: 'escalonada' | 'reducida', det }] }
// state = { ops: [[{ t: 'swap', i, j } | { t: 'scale', i, k: [n, d] } | { t: 'add', i, j, k: [n, d] }]] }

GAMES['fila-a-fila'] = (() => {
  // ---------- Fracciones exactas [n, d] con d > 0 ----------
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const F = {
    of(n, d = 1) {
      if (Array.isArray(n)) return F.of(n[0], n[1]);
      if (!Number.isInteger(n)) { let q = 1; while (!Number.isInteger(+(n * q).toFixed(9)) && q < 1e6) q *= 10; return F.of(Math.round(n * q), d * q); }
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(n, d) || 1;
      return [n / g || 0, d / g];
    },
    add: (a, b) => F.of(a[0] * b[1] + b[0] * a[1], a[1] * b[1]),
    mul: (a, b) => F.of(a[0] * b[0], a[1] * b[1]),
    div: (a, b) => F.of(a[0] * b[1], a[1] * b[0]),
    neg: a => [-a[0] || 0, a[1]],
    zero: a => a[0] === 0,
    one: a => a[0] === 1 && a[1] === 1,
    txt: a => (a[0] < 0 ? '−' : '') + Math.abs(a[0]) + (a[1] === 1 ? '' : '/' + a[1]),
  };

  const toF = M => M.map(r => r.map(v => (Array.isArray(v) ? F.of(v) : F.of(v))));
  const validK = k => Array.isArray(k) && k[1] !== 0 && Number.isInteger(k[0]) && Number.isInteger(k[1]);

  // Aplica las operaciones a una copia; una operación inválida (k = 0, misma fila) se ignora.
  function apply(M, ops) {
    const A = toF(M);
    for (const o of ops || []) {
      if (o.t === 'swap' && o.i !== o.j) [A[o.i], A[o.j]] = [A[o.j], A[o.i]];
      else if (o.t === 'scale' && validK(o.k) && o.k[0] !== 0) { const k = F.of(o.k); A[o.i] = A[o.i].map(v => F.mul(v, k)); }
      else if (o.t === 'add' && o.i !== o.j && validK(o.k)) { const k = F.of(o.k); A[o.i] = A[o.i].map((v, c) => F.add(v, F.mul(k, A[o.j][c]))); }
    }
    return A;
  }
  const isNull = (o) => (o.t !== 'swap' && (!validK(o.k) || o.k[0] === 0)) || (o.t !== 'scale' && o.i === o.j);

  const lead = (row, n) => { for (let c = 0; c < n; c++) if (!F.zero(row[c])) return c; return -1; };
  // Escalonada en las n primeras columnas: cada pivote a la derecha del de arriba y filas nulas abajo.
  function isEchelon(A, n) {
    let last = -1, zeroSeen = false;
    for (const row of A) {
      const l = lead(row, n);
      if (l < 0) { zeroSeen = true; continue; }
      if (zeroSeen || l <= last) return false;
      last = l;
    }
    return true;
  }
  // Reducida: además cada pivote vale 1 y es lo único distinto de cero en su columna.
  function isReduced(A, n) {
    if (!isEchelon(A, n)) return false;
    return A.every((row, i) => {
      const l = lead(row, n);
      if (l < 0) return true;
      return F.one(row[l]) && A.every((r2, j) => j === i || F.zero(r2[l]));
    });
  }

  // Forma escalonada reducida (Gauss-Jordan sobre las n primeras columnas), para mostrar la solución.
  function rref(M, n) {
    const A = toF(M);
    let r = 0;
    for (let c = 0; c < n && r < A.length; c++) {
      const p = A.findIndex((row, i) => i >= r && !F.zero(row[c]));
      if (p < 0) continue;
      [A[r], A[p]] = [A[p], A[r]];
      const inv = F.div([1, 1], A[r][c]);
      A[r] = A[r].map(v => F.mul(v, inv));
      A.forEach((row, i) => { if (i !== r && !F.zero(row[c])) { const k = F.neg(row[c]); A[i] = row.map((v, cc) => F.add(v, F.mul(k, A[r][cc]))); } });
      r++;
    }
    return A;
  }

  // det A = factor · det(matriz actual): intercambiar cambia el signo y multiplicar por k lo divide entre k.
  function detFactor(ops) {
    let f = [1, 1];
    for (const o of ops || []) {
      if (isNull(o)) continue;
      if (o.t === 'swap') f = F.neg(f);
      else if (o.t === 'scale') f = F.div(f, F.of(o.k));
    }
    return f;
  }
  function det(M) {
    const A = toF(M), n = A.length;
    let f = [1, 1];
    for (let c = 0; c < n; c++) {
      const p = A.findIndex((row, i) => i >= c && !F.zero(row[c]));
      if (p < 0) return [0, 1];
      if (p !== c) { [A[c], A[p]] = [A[p], A[c]]; f = F.neg(f); }
      f = F.mul(f, A[c][c]);
      for (let i = c + 1; i < n; i++) { const k = F.neg(F.div(A[i][c], A[c][c])); A[i] = A[i].map((v, cc) => F.add(v, F.mul(k, A[c][cc]))); }
    }
    return f;
  }

  const cols = r => r.M[0].length - (r.aug || 0);
  const meets = (A, r) => (r.goal === 'reducida' ? isReduced(A, cols(r)) : isEchelon(A, cols(r)));
  const matTxt = (A, r) => '[' + A.map(row => row.map((v, c) => (c === cols(r) ? '| ' : '') + F.txt(v)).join(' ')).join('; ') + ']';

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => (state.ops[i] || []).every(o => !isNull(o)) && meets(apply(r.M, state.ops[i]), r));
    return { ok, solution: params.rounds.map(r => `${r.goal === 'reducida' ? 'reducida' : 'por ejemplo'} ${matTxt(rref(r.M, cols(r)), r)}`).join(' · ') };
  }

  const MODES = [{ t: 'swap', name: 'Ri ↔ Rj' }, { t: 'scale', name: 'Ri ← k·Ri' }, { t: 'add', name: 'Ri ← Ri + k·Rj' }];

  function create(host, params, api) {
    const C = api.palette;
    const ops = params.rounds.map(() => []);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], mode = 2, selI = null, selJ = null, kn = 1, kd = 1;
    let L = {};

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const r = params.rounds[cur], m = r.M.length;
      const top = 48, rowH = 38, gridW = W - 24 - 44;
      L.top = top; L.rowH = rowH; L.gx = 12 + 44; L.cw = gridW / r.M[0].length;
      L.rows = r.M.map((_, i) => ({ x: 12, y: top + i * rowH, w: 40, h: rowH - 6 }));
      let y = top + m * rowH + 26;
      L.info = y - 10;
      const bw = (W - 24 - 12) / 3;
      L.modes = MODES.map((_, i) => ({ x: 12 + i * (bw + 6), y: y + 6, w: bw, h: 38 }));
      y += 54;
      L.preview = y + 10;
      y += 28;
      const half = (W - 24) / 2;
      L.kn = { minus: { x: 12, y, w: 38, h: 34 }, plus: { x: 12 + half - 50, y, w: 38, h: 34 }, mid: 12 + half / 2 - 6, y };
      L.kd = { minus: { x: 12 + half, y, w: 38, h: 34 }, plus: { x: W - 50, y, w: 38, h: 34 }, mid: 12 + half + half / 2 - 6, y };
      y += 46;
      L.undo = { x: 12, y, w: (W - 30) / 2, h: 40 };
      L.go = { x: 18 + (W - 30) / 2, y, w: (W - 30) / 2, h: 40 };
    }

    const curOp = () => {
      const t = MODES[mode].t;
      if (selI == null) return null;
      if (t === 'scale') return { t, i: selI, k: [kn, kd] };
      if (selJ == null) return null;
      return t === 'swap' ? { t, i: selI, j: selJ } : { t, i: selI, j: selJ, k: [kn, kd] };
    };
    function opTxt(o) {
      if (!o) return selI == null ? 'Toca la fila que cambia' : 'Ahora toca la otra fila';
      const k = F.of(o.k || [1, 1]), kt = k[1] === 1 && k[0] >= 0 ? F.txt(k) : `(${F.txt(k)})`;
      if (o.t === 'swap') return `R${o.i + 1} ↔ R${o.j + 1}`;
      if (o.t === 'scale') return `R${o.i + 1} ← ${kt}·R${o.i + 1}`;
      return `R${o.i + 1} ← R${o.i + 1} + ${kt}·R${o.j + 1}`;
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      function button(b, label, on, active) {
        p.stroke(active ? C.brand : on ? C.Z : C.line); p.strokeWeight(active ? 2.5 : 1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
        p.noStroke(); p.fill(on ? C.ink : C.mute); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        fitText(p, label, b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 14);
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], A = apply(r.M, ops[cur]), n = cols(r), done = meets(A, r);
        drawTabs(p, C, tabs, cur, i => {
          const g = meets(apply(params.rounds[i].M, ops[i]), params.rounds[i]);
          return locked ? (g ? C.ok : C.bad) : i === cur ? C.brand : ops[i].length ? C.Z : C.line;
        });
        p.noStroke(); p.fill(C.mute); p.textAlign(p.RIGHT, p.CENTER); p.textStyle(p.BOLD); p.textSize(12);
        p.text(r.goal === 'reducida' ? 'meta: reducida' : 'meta: escalonada', W - 12, 23);
        // Matriz.
        const show = locked && !done ? rref(r.M, n) : A;
        const gx = L.gx, gw = L.cw * r.M[0].length, top = L.top, hgt = r.M.length * L.rowH - 6;
        p.stroke(locked ? (done ? C.ok : C.bad) : done ? C.ok : C.line); p.strokeWeight(1.5); p.fill(C.card); p.rect(gx - 4, top - 4, gw + 8, hgt + 8, 10);
        if (r.aug) { p.stroke(C.mute); p.strokeWeight(1.5); p.line(gx + n * L.cw, top, gx + n * L.cw, top + hgt); }
        L.rows.forEach((b, i) => {
          const s = i === selI ? C.brand : i === selJ ? C.Z : C.line;
          p.stroke(s); p.strokeWeight(i === selI || i === selJ ? 2.5 : 1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 8);
          p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13); p.text(`R${i + 1}`, b.x + b.w / 2, b.y + b.h / 2);
          show[i].forEach((v, c) => {
            const pivot = c < n && c === lead(show[i], n);
            p.fill(locked && !done ? C.ok : pivot ? C.brand : F.zero(v) ? C.mute : C.ink);
            p.textStyle(pivot ? p.BOLD : p.NORMAL);
            fitText(p, F.txt(v), gx + (c + 0.5) * L.cw, b.y + b.h / 2, L.cw - 4, 16);
          });
        });
        // Determinante.
        p.noStroke(); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); p.textSize(13);
        if (r.det) {
          const f = detFactor(ops[cur]);
          p.fill(done ? C.ok : C.N);
          fitText(p, F.one(f) ? 'det A = det(actual)' : `det A = ${F.txt(f)} · det(actual)`, W / 2, L.info, W - 24, 13);
        } else { p.fill(done ? C.ok : C.mute); p.text(done ? '¡Meta cumplida!' : `${ops[cur].length} ${ops[cur].length === 1 ? 'operación' : 'operaciones'}`, W / 2, L.info); }
        // Operación.
        L.modes.forEach((b, i) => button(b, MODES[i].name, !locked, i === mode));
        const o = curOp();
        p.noStroke(); p.fill(o ? C.ink : C.mute); p.textStyle(p.BOLD); fitText(p, opTxt(o), W / 2, L.preview, W - 24, 16);
        const needK = MODES[mode].t !== 'swap';
        [['k arriba', kn, L.kn], ['k abajo', kd, L.kd]].forEach(([lab, val, K]) => {
          button(K.minus, '−', needK && !locked); button(K.plus, '+', needK && !locked);
          p.noStroke(); p.fill(needK ? C.ink : C.mute); p.textStyle(p.BOLD); p.textSize(17); p.text(String(val).replace('-', '−'), K.minus.x + (K.plus.x + K.plus.w - K.minus.x) / 2, K.y + 13);
          p.fill(C.mute); p.textStyle(p.NORMAL); p.textSize(10); p.text(lab, K.minus.x + (K.plus.x + K.plus.w - K.minus.x) / 2, K.y + 30);
        });
        button(L.undo, 'Deshacer', !locked && ops[cur].length > 0);
        button(L.go, 'Aplicar', !locked && !!o && !isNull(o));
      };

      p.mousePressed = () => {
        const x = p.mouseX, y = p.mouseY;
        const tb = tabs.findIndex(t => hitBox(t, x, y));
        if (tb >= 0) { cur = tb; selI = selJ = null; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const mi = L.modes.findIndex(b => hitBox(b, x, y));
        if (mi >= 0) { mode = mi; selJ = MODES[mi].t === 'scale' ? null : selJ; api.sfx?.tap?.(); return false; }
        const ri = L.rows.findIndex(b => hitBox({ x: b.x, y: b.y, w: W - 24, h: b.h }, x, y));
        if (ri >= 0) {
          if (selI == null || MODES[mode].t === 'scale') selI = ri;
          else if (ri === selI) { selI = null; selJ = null; }
          else selJ = ri;
          api.sfx?.tap?.(); return false;
        }
        const step = (K, d, get, set) => { if (hitBox(K.minus, x, y)) { set(get() - 1); return true; } if (hitBox(K.plus, x, y)) { set(get() + 1); return true; } return false; };
        if (MODES[mode].t !== 'swap') {
          if (step(L.kn, 1, () => kn, v => { kn = Math.max(-12, Math.min(12, v)); })) { api.sfx?.tap?.(); return false; }
          if (step(L.kd, 1, () => kd, v => { kd = Math.max(1, Math.min(12, v)); })) { api.sfx?.tap?.(); return false; }
        }
        if (hitBox(L.undo, x, y) && ops[cur].length) { ops[cur].pop(); api.sfx?.tap?.(); api.ready(ops.every(o => o.length)); return false; }
        if (hitBox(L.go, x, y)) {
          const o = curOp();
          if (!o || isNull(o)) return false;
          ops[cur].push(o); selI = selJ = null; api.sfx?.tap?.(); api.ready(ops.every(o2 => o2.length));
          return false;
        }
      };
    }, Math.max(...params.rounds.map(r => (264 + 38 * r.M.length) / 256))); // cabe entero aun con 256 px de ancho

    return {
      loaded: m.ready,
      getState: () => ({ ops: ops.map(o => o.map(x => ({ ...x }))) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, F, apply, isEchelon, isReduced, rref, detFactor, det };
})();
;
//#archivo js/games/afina-sistema.js
// Afina el sistema (geometría vectorial, sistemas 2×2 y su interpretación geométrica): cada ecuación
// ax + by = c es una recta del plano. Uno o dos coeficientes tienen manijas; al moverlas se ve cómo
// gira o se desliza la recta. La meta de cada ronda es que el sistema no tenga solución (rectas
// paralelas), tenga infinitas (la misma recta) o que su única solución sea un punto dado.
// params = { rounds: [{ e1: [a, b, c], e2: [a, b, c], free: [[ecuación, coeficiente]], goal: 'ninguna' | 'infinitas' | 'punto', P, step }] }
// state = { eqs: [[e1, e2]] }

GAMES['afina-sistema'] = (() => {
  const RANGE = 6, LIM = 12;
  const eps = 1e-9;
  const D = (e1, e2) => e1[0] * e2[1] - e1[1] * e2[0];
  function kind(e1, e2) {
    if (Math.abs(D(e1, e2)) > eps) return 'unica';
    const r1 = e1[0] * e2[2] - e1[2] * e2[0], r2 = e1[1] * e2[2] - e1[2] * e2[1];
    return Math.abs(r1) < eps && Math.abs(r2) < eps ? 'infinitas' : 'ninguna';
  }
  const solve = (e1, e2) => { const d = D(e1, e2); return [(e1[2] * e2[1] - e1[1] * e2[2]) / d, (e1[0] * e2[2] - e1[2] * e2[0]) / d].map(v => Math.round(v * 1e9) / 1e9 || 0); };
  const isLine = e => Math.abs(e[0]) > eps || Math.abs(e[1]) > eps;
  function meets(eqs, r) {
    if (!eqs || !isLine(eqs[0]) || !isLine(eqs[1])) return false;
    const k = kind(eqs[0], eqs[1]);
    if (r.goal === 'punto') return k === 'unica' && solve(eqs[0], eqs[1]).every((v, i) => Math.abs(v - r.P[i]) < 1e-9);
    return k === r.goal;
  }
  const n = v => String(+v.toFixed(3)).replace('-', '−');
  const NAMES = ['a', 'b', 'c'], SUB = ['₁', '₂'];
  function eqText(e) {
    const term = (v, s, first) => {
      if (Math.abs(v) < eps) return '';
      const a = Math.abs(v), sign = v < 0 ? (first ? '−' : ' − ') : first ? '' : ' + ';
      return sign + (a === 1 ? '' : n(a)) + s;
    };
    const lhs = (term(e[0], 'x', true) + term(e[1], 'y', !e[0])) || '0';
    return `${lhs} = ${n(e[2])}`;
  }

  // Un valor de las perillas que cumple la meta (para la solución): se barre el rango de cada perilla.
  function answer(r) {
    const step = r.step || 1, vals = [];
    for (let v = -LIM; v <= LIM + eps; v += step) vals.push(+v.toFixed(3));
    const free = r.free, base = [r.e1.slice(), r.e2.slice()];
    const tryAll = (idx, eqs) => {
      if (idx === free.length) return meets(eqs, r) ? eqs : null;
      for (const v of vals) {
        const e = eqs.map(x => x.slice()); e[free[idx][0]][free[idx][1]] = v;
        const got = tryAll(idx + 1, e);
        if (got) return got;
      }
      return null;
    };
    return tryAll(0, base);
  }

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => meets(state.eqs[i], r));
    const solution = params.rounds.map(r => {
      const a = answer(r);
      return a ? r.free.map(([e, c]) => `${NAMES[c]}${SUB[e]} = ${n(a[e][c])}`).join(', ') : '—';
    }).join(' · ');
    return { ok, solution };
  }

  function create(host, params, api) {
    const C = api.palette;
    const eqs = params.rounds.map(r => [r.e1.slice(), r.e2.slice()]), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], view = null, knobs = [], drag = null;

    function layout() {
      tabs = roundTabs(params.rounds.length, W);
      const r = params.rounds[cur], side = Math.min(W - 24, H - 148 - 39 * r.free.length);
      view = planeView({ x: (W - side) / 2, y: 112, w: side, h: side }, [-RANGE, RANGE], [-RANGE, RANGE]);
      const y0 = view.box.y + side + 24;
      knobs = r.free.map((f, i) => ({ f, rail: practiceTrack(61, W - 56, y0 + i * 37, -LIM, LIM, r.step || 1) }));
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      function drawLine(e, col) {
        const v = view, ctx = p.drawingContext;
        ctx.save(); ctx.beginPath(); ctx.rect(v.box.x, v.box.y, v.box.w, v.box.h); ctx.clip();
        p.stroke(col); p.strokeWeight(3);
        if (Math.abs(e[1]) > eps) { const y = x => (e[2] - e[0] * x) / e[1]; p.line(v.X(-RANGE - 1), v.Y(y(-RANGE - 1)), v.X(RANGE + 1), v.Y(y(RANGE + 1))); }
        else if (Math.abs(e[0]) > eps) { const x = e[2] / e[0]; p.line(v.X(x), v.box.y, v.X(x), v.box.y + v.box.h); }
        ctx.restore(); p.fill(C.bg); p.stroke(C.bg); // p5 guarda el último color: lo resincroniza tras el recorte
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], E = eqs[cur], ok = meets(E, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (meets(eqs[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        const goal = r.goal === 'ninguna' ? 'Meta: que no tenga solución' : r.goal === 'infinitas' ? 'Meta: infinitas soluciones' : `Meta: la solución es (${n(r.P[0])}, ${n(r.P[1])})`;
        p.noStroke(); p.fill(C.mute); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fitText(p, `${goal}  ·  det = ${n(D(E[0], E[1]))}`, W / 2, 52, W - 24, 13);
        [[E[0], C.Z], [E[1], C.I]].forEach(([e, col], i) => { p.fill(col); p.textStyle(p.BOLD); fitText(p, eqText(e), W / 2, 76 + i * 20, W - 24, 16); });
        drawPlane(p, C, view);
        if (r.goal === 'punto') { p.noFill(); p.stroke(C.N); p.strokeWeight(2.5); p.circle(view.X(r.P[0]), view.Y(r.P[1]), 18); }
        if (isLine(E[0])) drawLine(E[0], C.Z);
        if (isLine(E[1])) drawLine(E[1], C.I);
        if (isLine(E[0]) && isLine(E[1]) && kind(E[0], E[1]) === 'unica') {
          const s = solve(E[0], E[1]);
          if (Math.abs(s[0]) <= RANGE + 0.5 && Math.abs(s[1]) <= RANGE + 0.5) { p.noStroke(); p.fill(ok ? C.ok : C.ink); p.circle(view.X(s[0]), view.Y(s[1]), 10); }
        }
        if (locked) { p.noStroke(); p.fill(ok ? C.ok : C.bad); p.textSize(13); p.textStyle(p.BOLD); p.text(ok ? '¡Bien!' : 'Mira la solución abajo', W / 2, view.box.y + view.box.h - 14); }
        knobs.forEach(k => {
          const [e, c] = k.f;
          drawPracticeTrack(p, C, k.rail, E[e][c], NAMES[c] + SUB[e], n(E[e][c]), e ? C.I : C.Z, drag === k);
        });
      };

      const move = x => {
        const [e, c] = drag.f, next = drag.rail.value(x);
        if (!touched[cur] || eqs[cur][e][c] !== next) {
          eqs[cur][e][c] = next; touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean));
        }
      };
      p.mousePressed = () => {
        if (!inCanvas(p)) return;
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; drag = null; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        drag = knobs.find(k => k.rail.hit(p.mouseX, p.mouseY));
        if (drag) { move(p.mouseX); return false; }
      };
      p.mouseDragged = () => { if (drag && !locked) { move(p.mouseX); return false; } };
      p.mouseReleased = () => { drag = null; };
    }, 1.41, () => {
      const k = knobs[0];
      if (locked || !k) return null;
      return k.rail.gesture(eqs[cur][k.f[0]][k.f[1]]);
    });

    return {
      loaded: m.ready,
      getState: () => ({ eqs: eqs.map(E => E.map(e => e.slice())) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
      demo: m.demo,
    };
  }

  return { grade, create, kind, solve, answer, eqText, demo: true };
})();
;
//#archivo js/games/flecha-vector.js
// Flecha vector (geometría vectorial): se arrastra la punta de una flecha sobre la cuadrícula (y su cola,
// si la ronda lo permite) para construir el vector que pide cada ronda: una suma, una resta, un múltiplo,
// la proyección sobre otro, uno perpendicular, uno que encierre cierta área, la fuerza que equilibra
// otras… Se califica comparando el vector (punta − cola) con `ans`, la punta con `ans` si at: 'tip',
// o con una condición `check(w, cola)`. Abajo pueden ir lecturas en vivo: componentes, norma, producto
// escalar y producto cruz con el primer vector dado, y la suma de todos.
// params = { rounds: [{ ask, given: [{ v, at, name }], points: [{ p, name }], lines: [[a, b, c]] (ax + by = c), tail, tip (posición inicial de la punta), freeTail, at, ans | check + sol, show, name, range }] }
// state = { vecs: [{ tail: [x, y], tip: [x, y] }] }

GAMES['flecha-vector'] = (() => {
  const n = v => String(+(+v).toFixed(3)).replace('-', '−');
  const vt = w => `(${n(w[0])}, ${n(w[1])})`;
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
  const tailOf = r => r.tail || [0, 0];

  function meets(vec, r) {
    if (!vec) return false;
    const w = sub(vec.tip, vec.tail);
    if (r.check) return !!r.check(w, vec.tail, vec.tip);
    return r.at === 'tip' ? same(vec.tip, r.ans) : same(w, r.ans);
  }
  const solOf = r => r.sol || (r.at === 'tip' ? `el punto ${vt(r.ans)}` : vt(r.ans));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => meets(state.vecs[i], r));
    return { ok, solution: params.rounds.map(solOf).join(' · ') };
  }

  function readouts(r, w, vec) {
    const g = (r.given || [])[0]?.v, nm = r.name || 'w', out = [];
    for (const k of r.show || []) {
      if (k === 'comp') out.push(`${nm} = ${vt(w)}`);
      if (k === 'norm') { const q = dot(w, w), s = Math.sqrt(q); out.push(`|${nm}| = ${Number.isInteger(s) ? s : `√${q}`}`); }
      if (k === 'dot' && g) out.push(`${r.given[0].name}·${nm} = ${n(dot(g, w))}`);
      if (k === 'cross' && g) out.push(`${r.given[0].name}×${nm} = ${n(cross(g, w))}`);
      if (k === 'det' && g) out.push(`det(${r.given[0].name}, ${nm}) = ${n(cross(g, w))}`);
      if (k === 'sum') { const s = (r.given || []).reduce((a, G) => [a[0] + G.v[0], a[1] + G.v[1]], w); out.push(`suma = ${vt(s)}`); }
      if (k === 'tip') out.push(`punta ${vt(vec.tip)}`);
    }
    return out.join('   ');
  }

  function create(host, params, api) {
    const C = api.palette;
    const vecs = params.rounds.map(r => ({ tail: tailOf(r).slice(), tip: (r.tip || tailOf(r)).slice() })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], view = null, drag = null;
    const FAM = ['Z', 'I', 'Q', 'R'];

    function layout() {
      tabs = roundTabs(params.rounds.length, W);
      const R = params.rounds[cur].range || 6, side = Math.min(W - 24, H - 150);
      view = planeView({ x: (W - side) / 2, y: 98, w: side, h: side }, [-R, R], [-R, R]);
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      function arrow(a, b, col, w = 3) {
        const X0 = view.X(a[0]), Y0 = view.Y(a[1]), X1 = view.X(b[0]), Y1 = view.Y(b[1]), ang = Math.atan2(Y1 - Y0, X1 - X0);
        if (Math.hypot(X1 - X0, Y1 - Y0) < 2) return;
        p.stroke(col); p.strokeWeight(w); p.line(X0, Y0, X1 - Math.cos(ang) * 6, Y1 - Math.sin(ang) * 6);
        p.noStroke(); p.fill(col); p.triangle(X1, Y1, X1 - 13 * Math.cos(ang - 0.4), Y1 - 13 * Math.sin(ang - 0.4), X1 - 13 * Math.cos(ang + 0.4), Y1 - 13 * Math.sin(ang + 0.4));
      }
      const label = (txt, x, y, col) => { p.noStroke(); p.fill(col); p.textStyle(p.BOLD); p.textSize(13); p.textAlign(p.CENTER, p.CENTER); p.text(txt, x, y); };

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], vec = vecs[cur], w = sub(vec.tip, vec.tail), ok = meets(vec, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (meets(vecs[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD);
        if (r.ask) fitText(p, r.ask, W / 2, 54, W - 24, 15);
        p.fill(ok ? C.ok : C.mute); fitText(p, readouts(r, w, vec) || `${r.name || 'w'} = ${vt(w)}`, W / 2, 78, W - 24, 14);
        drawPlane(p, C, view);
        const ctx = p.drawingContext; ctx.save(); ctx.beginPath(); ctx.rect(view.box.x, view.box.y, view.box.w, view.box.h); ctx.clip();
        (r.lines || []).forEach(([a, b, c]) => {
          p.stroke(C.mute); p.strokeWeight(2); const R = 20;
          if (Math.abs(b) > 1e-9) p.line(view.X(-R), view.Y((c + a * R) / b), view.X(R), view.Y((c - a * R) / b));
          else p.line(view.X(c / a), view.Y(-R), view.X(c / a), view.Y(R));
        });
        (r.given || []).forEach((G, i) => {
          const at = G.at || [0, 0], end = [at[0] + G.v[0], at[1] + G.v[1]], col = C[G.fam || FAM[i % FAM.length]];
          arrow(at, end, col, 2.5);
          label(G.name, view.X(at[0] + G.v[0] / 2) + 10, view.Y(at[1] + G.v[1] / 2) - 10, col);
        });
        (r.points || []).forEach(P => {
          p.noStroke(); p.fill(C.N); p.circle(view.X(P.p[0]), view.Y(P.p[1]), 10);
          label(P.name, view.X(P.p[0]) + 12, view.Y(P.p[1]) - 10, C.N);
        });
        const col = locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.brand;
        arrow(vec.tail, vec.tip, col, 4);
        ctx.restore(); p.fill(C.bg); p.stroke(C.bg); // p5 guarda el último color: lo resincroniza tras el recorte
        drawPracticeHandle(p, C, view.X(vec.tip[0]), view.Y(vec.tip[1]), col, drag === 'tip');
        if (r.freeTail) { p.stroke(col); p.strokeWeight(2.5); p.fill(C.card); p.circle(view.X(vec.tail[0]), view.Y(vec.tail[1]), 13); }
        else { p.noStroke(); p.fill(C.ink); p.circle(view.X(vec.tail[0]), view.Y(vec.tail[1]), 7); }
        if (locked && !ok) { p.noStroke(); p.fill(C.ok); p.textStyle(p.BOLD); fitText(p, `era ${solOf(r)}`, W / 2, view.box.y + view.box.h + 18, W - 24, 13); }
        else if (!touched[cur] && !locked) { p.noStroke(); p.fill(C.mute); p.textStyle(p.NORMAL); fitText(p, r.freeTail ? 'Arrastra la punta y la cola' : 'Arrastra la punta de la flecha', W / 2, view.box.y + view.box.h + 18, W - 24, 13); }
      };

      const snap = (px, py) => {
        const R = params.rounds[cur].range || 6;
        return [Math.max(-R, Math.min(R, Math.round(view.toX(px)))), Math.max(-R, Math.min(R, Math.round(view.toY(py))))];
      };
      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; drag = null; layout(); api.sfx?.tap?.(); return false; }
        if (locked || !hitBox(view.box, p.mouseX, p.mouseY)) return;
        const r = params.rounds[cur], vec = vecs[cur];
        const pts = [{ x: view.X(vec.tip[0]), y: view.Y(vec.tip[1]) }];
        if (r.freeTail) pts.push({ x: view.X(vec.tail[0]), y: view.Y(vec.tail[1]) });
        // La punta tiene prioridad: la cola solo se agarra si está estrictamente más cerca.
        const d = pts.map(q => Math.hypot(q.x - p.mouseX, q.y - p.mouseY));
        drag = pts.length > 1 && d[1] < 26 && d[1] < d[0] ? 'tail' : 'tip';
        p.mouseDragged();
        return false;
      };
      p.mouseDragged = () => {
        if (!drag || locked) return;
        const vec = vecs[cur], s = snap(p.mouseX, p.mouseY);
        if (s[0] !== vec[drag][0] || s[1] !== vec[drag][1]) { vec[drag] = s; api.sfx?.tap?.(); }
        touched[cur] = true; api.ready(touched.every(Boolean));
        return false;
      };
      p.mouseReleased = () => { drag = null; };
    }, 1.42, () => {
      if (locked || !view) return null;
      const [x, y] = vecs[cur].tip;
      return { from: { x: view.X(x), y: view.Y(y) }, to: { x: view.X(x + (x >= 0 ? -1 : 1)), y: view.Y(y + (y >= 0 ? -1 : 1)) } };
    });

    return {
      loaded: m.ready,
      getState: () => ({ vecs: vecs.map(v => ({ tail: v.tail.slice(), tip: v.tip.slice() })) }),
      lock() { locked = true; drag = null; },
      destroy: () => m.remove(),
      demo: m.demo,
    };
  }

  return { grade, create, dot, cross, meets, demo: true };
})();
;
//#archivo js/games/conica-viva.js
// Cónica viva (geometría analítica, cónicas): una cónica dibujada en el plano con perillas para su
// centro o vértice (h, k) y su forma — radio r; parámetro p y eje de la parábola; semiejes a (horizontal)
// y b (vertical) de la elipse y la hipérbola, y hacia dónde abre esta —. Se ven en vivo los focos (y la
// directriz de la parábola). La meta de cada ronda es que la cónica sea la de la ecuación o los datos.
// Convención: parábola (y − k)² = 4p(x − h) si abre en x, (x − h)² = 4p(y − k) si abre en y.
// params = { rounds: [{ type: 'circ' | 'par' | 'eli' | 'hip', eq: texto, ans: { h, k, r | p, dir | a, b, dir } }] }
// state = { vals: [{ h, k, r, p, a, b, dir }] }

GAMES['conica-viva'] = (() => {
  const RANGE = 8;
  const KEYS = { circ: ['h', 'k', 'r'], par: ['h', 'k', 'p', 'dir'], eli: ['h', 'k', 'a', 'b'], hip: ['h', 'k', 'a', 'b', 'dir'] };
  const keysOf = t => KEYS[t];
  const n = v => String(+(+v).toFixed(3)).replace('-', '−');
  const sq = v => +(v * v).toFixed(4);
  const shift = (s, v) => (v === 0 ? s : `(${s} ${v > 0 ? '−' : '+'} ${n(Math.abs(v))})`);
  const r9 = v => Math.round(v * 1e9) / 1e9 || 0;

  function foci(t, o) {
    if (t === 'circ') return [[o.h, o.k]];
    if (t === 'par') return [o.dir === 'x' ? [o.h + o.p, o.k] : [o.h, o.k + o.p]];
    const c = t === 'eli' ? Math.sqrt(Math.abs(o.a * o.a - o.b * o.b)) : Math.hypot(o.a, o.b);
    const alongX = t === 'eli' ? o.a >= o.b : o.dir === 'x';
    return alongX ? [[r9(o.h - c), o.k], [r9(o.h + c), o.k]] : [[o.h, r9(o.k - c)], [o.h, r9(o.k + c)]];
  }
  function eqText(t, o) {
    const X = shift('x', o.h), Y = shift('y', o.k);
    if (t === 'circ') return `${X}² + ${Y}² = ${n(sq(o.r))}`;
    if (t === 'par') return o.dir === 'x' ? `${Y}² = ${n(4 * o.p)}${X}` : `${X}² = ${n(4 * o.p)}${Y}`;
    const xs = `${X}²/${n(sq(o.a))}`, ys = `${Y}²/${n(sq(o.b))}`;
    if (t === 'eli') return `${xs} + ${ys} = 1`;
    return o.dir === 'x' ? `${xs} − ${ys} = 1` : `${ys} − ${xs} = 1`;
  }
  const meets = (v, r) => !!v && keysOf(r.type).every(k => (k === 'dir' ? v.dir === r.ans.dir : Math.abs(v[k] - r.ans[k]) < 1e-9));

  function grade(state, params) {
    const ok = params.rounds.every((r, i) => meets(state.vals[i], r));
    return { ok, solution: params.rounds.map(r => eqText(r.type, r.ans)).join(' · ') };
  }

  const KNOB = {
    h: { name: 'h', step: 1, min: -6, max: 6 }, k: { name: 'k', step: 1, min: -6, max: 6 },
    r: { name: 'r', step: 0.5, min: 0.5, max: 7 }, p: { name: 'p', step: 0.5, min: -4, max: 4 },
    a: { name: 'a↔', step: 1, min: 1, max: 7 }, b: { name: 'b↕', step: 1, min: 1, max: 7 },
  };

  function create(host, params, api) {
    const C = api.palette;
    const vals = params.rounds.map(() => ({ h: 0, k: 0, r: 2, p: 1, a: 3, b: 2, dir: 'x' })), touched = params.rounds.map(() => false);
    let locked = false, W = 0, H = 0, cur = 0, tabs = [], view = null, knobs = [];

    function layout() {
      tabs = roundTabs(params.rounds.length);
      const keys = keysOf(params.rounds[cur].type), nRows = Math.ceil(keys.length / 2);
      const side = Math.min(W - 24, H - 96 - nRows * 44 - 16);
      view = planeView({ x: (W - side) / 2, y: 74, w: side, h: side }, [-RANGE, RANGE], [-RANGE, RANGE]);
      const y0 = view.box.y + side + 12, half = (W - 24) / 2;
      knobs = keys.map((key, i) => {
        const x = 12 + (i % 2) * half, y = y0 + Math.floor(i / 2) * 44;
        return key === 'dir'
          ? { key, toggle: { x: x + 4, y, w: half - 8, h: 36 } }
          : { key, x, y, minus: { x: x + 28, y, w: 36, h: 36 }, plus: { x: x + half - 44, y, w: 36, h: 36 }, mid: x + 28 + (half - 44 + 36 - 28) / 2 };
      });
    }

    const m = mountSketch(host, (p, size) => {
      p.setup = () => { p.createCanvas(size.w, size.h); p.textFont('system-ui'); W = size.w; H = size.h; layout(); };
      p.onResize = () => { W = size.w; H = size.h; layout(); };

      function curve(t, o, col, w) {
        const v = view, ctx = p.drawingContext;
        ctx.save(); ctx.beginPath(); ctx.rect(v.box.x, v.box.y, v.box.w, v.box.h); ctx.clip();
        p.noFill(); p.stroke(col); p.strokeWeight(w);
        const path = pts => { p.beginShape(); pts.forEach(([x, y]) => p.vertex(v.X(x), v.Y(y))); p.endShape(); };
        const N = 160;
        if (t === 'circ' || t === 'eli') {
          const ax = t === 'circ' ? o.r : o.a, ay = t === 'circ' ? o.r : o.b;
          path(Array.from({ length: N + 1 }, (_, i) => [o.h + ax * Math.cos(2 * Math.PI * i / N), o.k + ay * Math.sin(2 * Math.PI * i / N)]));
        } else if (t === 'par') {
          const s = Array.from({ length: N + 1 }, (_, i) => -12 + 24 * i / N);
          path(s.map(u => (o.dir === 'x' ? [o.h + u * u / (4 * o.p), o.k + u] : [o.h + u, o.k + u * u / (4 * o.p)])));
        } else {
          const s = Array.from({ length: N + 1 }, (_, i) => -2.6 + 5.2 * i / N);
          [1, -1].forEach(sg => path(s.map(u => (o.dir === 'x' ? [o.h + sg * o.a * Math.cosh(u), o.k + o.b * Math.sinh(u)] : [o.h + o.a * Math.sinh(u), o.k + sg * o.b * Math.cosh(u)]))));
          p.stroke(C.mute); p.strokeWeight(1); p.drawingContext.setLineDash([4, 4]);
          [1, -1].forEach(sg => p.line(v.X(o.h - 20 * o.a), v.Y(o.k - sg * 20 * o.b), v.X(o.h + 20 * o.a), v.Y(o.k + sg * 20 * o.b)));
          p.drawingContext.setLineDash([]);
        }
        if (t === 'par') {
          p.stroke(C.mute); p.strokeWeight(1.5); p.drawingContext.setLineDash([5, 5]);
          if (o.dir === 'x') p.line(v.X(o.h - o.p), v.box.y, v.X(o.h - o.p), v.box.y + v.box.h); else p.line(v.box.x, v.Y(o.k - o.p), v.box.x + v.box.w, v.Y(o.k - o.p));
          p.drawingContext.setLineDash([]);
        }
        ctx.restore(); p.fill(C.bg); p.stroke(C.bg); // p5 guarda el último color: lo resincroniza tras el recorte
      }

      p.draw = () => {
        p.background(C.bg);
        const r = params.rounds[cur], o = vals[cur], ok = meets(o, r);
        drawTabs(p, C, tabs, cur, i => (locked ? (meets(vals[i], params.rounds[i]) ? C.ok : C.bad) : i === cur ? C.brand : touched[i] ? C.Z : C.line));
        p.noStroke(); p.fill(C.N); p.textAlign(p.CENTER, p.CENTER); p.textStyle(p.BOLD); fitText(p, r.eq, W / 2, 52, W - 24, 16);
        drawPlane(p, C, view);
        if (locked && !ok) curve(r.type, r.ans, C.ok, 2.5);
        const col = locked ? (ok ? C.ok : C.bad) : ok ? C.ok : C.brand;
        curve(r.type, o, col, 3);
        p.noStroke(); p.fill(C.ink); p.circle(view.X(o.h), view.Y(o.k), 8);
        if (r.type !== 'circ') foci(r.type, o).forEach(([x, y]) => { p.fill(C.I); p.circle(view.X(x), view.Y(y), 9); });
        p.fill(ok ? C.ok : C.mute); p.textStyle(p.NORMAL); fitText(p, eqText(r.type, o), W / 2, view.box.y + view.box.h - 12, view.box.w - 16, 12);
        knobs.forEach(K => {
          if (K.key === 'dir') {
            const b = K.toggle;
            p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
            p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textStyle(p.BOLD); fitText(p, o.dir === 'x' ? 'abre en x ⇄' : 'abre en y ⇅', b.x + b.w / 2, b.y + b.h / 2, b.w - 8, 14);
            return;
          }
          p.noStroke(); p.fill(C.mute); p.textAlign(p.LEFT, p.CENTER); p.textStyle(p.BOLD); p.textSize(14); p.text(KNOB[K.key].name, K.x + 4, K.y + 18);
          p.fill(C.ink); p.textAlign(p.CENTER, p.CENTER); fitText(p, n(o[K.key]), K.mid, K.y + 18, Math.max(16, K.plus.x - K.minus.x - K.minus.w - 2), 16);
          [[K.minus, '−'], [K.plus, '+']].forEach(([b, s]) => {
            p.stroke(locked ? C.line : C.Z); p.strokeWeight(1.5); p.fill(C.card); p.rect(b.x, b.y, b.w, b.h, 9);
            p.noStroke(); p.fill(locked ? C.mute : C.ink); p.textSize(18); p.text(s, b.x + b.w / 2, b.y + b.h / 2);
          });
        });
      };

      p.mousePressed = () => {
        const tb = tabs.findIndex(t => hitBox(t, p.mouseX, p.mouseY));
        if (tb >= 0) { cur = tb; layout(); api.sfx?.tap?.(); return false; }
        if (locked) return;
        const o = vals[cur];
        for (const K of knobs) {
          if (K.key === 'dir') { if (hitBox(K.toggle, p.mouseX, p.mouseY)) { o.dir = o.dir === 'x' ? 'y' : 'x'; } else continue; }
          else {
            const d = hitBox(K.minus, p.mouseX, p.mouseY) ? -1 : hitBox(K.plus, p.mouseX, p.mouseY) ? 1 : 0;
            if (!d) continue;
            const S = KNOB[K.key];
            let v = +(o[K.key] + d * S.step).toFixed(3);
            if (K.key === 'p' && v === 0) v = d * S.step;
            o[K.key] = Math.max(S.min, Math.min(S.max, v));
          }
          touched[cur] = true; api.sfx?.tap?.(); api.ready(touched.every(Boolean));
          return false;
        }
      };
    }, 1.62);

    return {
      loaded: m.ready,
      getState: () => ({ vals: vals.map(v => ({ ...v })) }),
      lock() { locked = true; },
      destroy: () => m.remove(),
    };
  }

  return { grade, create, keysOf, foci, eqText, KNOB };
})();
;
//#archivo js/games/gva-escena-1.js
// Geometría Vectorial · juegos de la lección geo-1 «Sistemas 2×2 y 3×3 y su geometría» (spec 2026-11-27-curso-geometria-vectorial).
// Una ecuación lineal es una recta (con tres incógnitas, un plano) y resolver el sistema es hallar el punto común. Armazones de
// figura-kit.js (XG.figura, XG.rotula, XG.tiros) con las piezas XPK; sin lienzo ni colores propios.
(() => {
  const sg = n => String(n).replace('-', '−');
  const r1 = x => Math.round(x * 10) / 10;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  // Ecuación con sus coeficientes: eq([4, 3], 24) → «4x + 3y = 24» (texto de la escena); con tex, «4x + 3y = 24» para KaTeX.
  const eq = (cs, c, vs = 'xyz', tex = false) => {
    const m = tex ? '-' : '−';
    let s = '';
    cs.forEach((a, i) => {
      if (!a) return;
      const t = `${Math.abs(a) === 1 ? '' : Math.abs(a)}${vs[i]}`;
      s += s ? `${a < 0 ? ` ${m} ` : ' + '}${t}` : `${a < 0 ? m : ''}${t}`;
    });
    return `${s || '0'} = ${tex ? c : sg(c)}`;
  };
  const eqT = (cs, c, vs) => eq(cs, c, vs, true);
  // Plano cartesiano: B = { x0, x1, y0, y1 } en unidades; el origen cae en (ox, oy) y una unidad mide u píxeles.
  const plano = (B, ox, oy, u) => ({ ...B, ox, oy, u, X: x => ox + x * u, Y: y => oy - y * u });
  function rejilla(K, P) {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    const yx = P.y0 < 0 ? P.Y(0) + 13 : P.Y(P.y0) + 13, xy = P.x0 < 0 ? P.X(0) - 5 : P.X(P.x0) - 5;
    for (let x = P.x0; x <= P.x1; x++) if (x && x % 2 === 0) h += K.t(P.X(x), yx, sg(x), 's tm');
    for (let y = P.y0; y <= P.y1; y++) if (y && y % 2 === 0) h += K.t(xy, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h + K.t(P.X(P.x1) + 4, P.Y(0) - 5, 'x', 's tm', 'start') + K.t(P.X(0) + 6, P.Y(P.y1) + 4, 'y', 's tm', 'start');
  }
  // Trozo de la recta ax + by = c que cabe en el cuadro del plano (en unidades), o null.
  function trozo(a, b, c, P) {
    const q = [], mete = (x, y) => { if (x >= P.x0 - 1e-9 && x <= P.x1 + 1e-9 && y >= P.y0 - 1e-9 && y <= P.y1 + 1e-9) q.push([x, y]); };
    if (Math.abs(b) > 1e-12) { mete(P.x0, (c - a * P.x0) / b); mete(P.x1, (c - a * P.x1) / b); }
    if (Math.abs(a) > 1e-12) { mete((c - b * P.y0) / a, P.y0); mete((c - b * P.y1) / a, P.y1); }
    let mejor = null, d = 0;
    q.forEach(u => q.forEach(w => { const e = Math.hypot(u[0] - w[0], u[1] - w[1]); if (e > d + 1e-9) { d = e; mejor = [u, w]; } }));
    return mejor;
  }
  const recta = (K, P, a, b, c, cls) => { const s = trozo(a, b, c, P); return s ? K.l(P.X(s[0][0]), P.Y(s[0][1]), P.X(s[1][0]), P.Y(s[1][1]), cls) : ''; };
  // Cruce de a1x + b1y = c1 con a2x + b2y = c2: [x, y], o null si son paralelas o la misma.
  const cruce = ([a, b, c], [d, e, f]) => { const D = a * e - b * d; return D ? [(c * e - b * f) / D, (a * f - c * d) / D] : null; };

  // ------------------------------------------------------------------- una ecuación es una recta: sus cortes con los ejes
  // Se arrastra un punto por cada eje hasta donde la recta ax + by = c los corta.  v { px, py }
  //   params { a, b, c, mira: [aviso del corte en x, aviso del corte en y], trampa (cortes al revés), ok }
  const PQ = plano({ x0: 0, x1: 10, y0: 0, y1: 8 }, 34, 232, 26);
  XG.figura('corta-ejes', {
    ini: () => ({ px: 1, py: 1 }),
    manijas: () => [
      { k: 'px', min: 0, max: 10, paso: 1, rot: () => 'x', en: v => [PQ.X(v.px), PQ.Y(0)], de: x => (x - PQ.ox) / PQ.u },
      { k: 'py', min: 0, max: 8, paso: 1, rot: () => 'y', en: v => [PQ.X(0), PQ.Y(v.py)], de: (x, y) => (PQ.oy - y) / PQ.u }],
    ok: (v, p) => v.px === p.c / p.a && v.py === p.c / p.b,
    sol: p => ({ px: p.c / p.a, py: p.c / p.b }),
    texto: p => `$(${p.c / p.a}, 0)$ y $(0, ${p.c / p.b})$`,
    alto: () => 250, pie: 'Arrastra la x por su eje y la y por el suyo.',
    dib(v, K, p, f) {
      let h = rejilla(K, PQ) + K.t(332, 16, eq([p.a, p.b], p.c), 'ta', 'end');
      if (v.px > 0.05 && v.py > 0.05) h += K.l(PQ.X(v.px), PQ.Y(0), PQ.X(0), PQ.Y(v.py), 'lm d');
      const X = p.c / p.a, Y = p.c / p.b, va = p.a * Math.round(v.px), vb = p.b * Math.round(v.py);
      return h + K.f(f, recta(K, PQ, p.a, p.b, p.c, 'la gr')
        + K.t(332, 36, `${p.a}·${Math.round(v.px)} + ${p.b}·0 = ${va} ${va === p.c ? '✓' : '✗'}`, `s ${va === p.c ? 'to' : 'tf'}`, 'end')
        + K.t(332, 54, `${p.a}·0 + ${p.b}·${Math.round(v.py)} = ${vb} ${vb === p.c ? '✓' : '✗'}`, `s ${vb === p.c ? 'to' : 'tf'}`, 'end')
        + K.c(PQ.X(X), PQ.Y(0), 5, 'fA') + K.c(PQ.X(0), PQ.Y(Y), 5, 'fA'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${v.px} + ${p.b} \\cdot 0 = ${p.a * v.px}$ y $${p.a} \\cdot 0 + ${p.b} \\cdot ${v.py} = ${p.b * v.py}$`,
    aviso: (v, p) => (v.px === p.c / p.b && v.py === p.c / p.a ? p.trampa : v.px !== p.c / p.a ? p.mira[0] : p.mira[1]),
    bien: (v, p) => p.ok,
  });

  // --------------------------------------------------------- tres casos: se gira la segunda recta alrededor de un punto
  // La recta fija L y otra que pasa por A y por B (B se arrastra). caso 'paralela' (A fuera de L: ninguna solución) o
  // 'misma' (A sobre L: infinitas).  v { bx, by }   params { L: [a, b, c], A: [x, y], B0, B, caso, mira, pega, ok }
  const PF = plano({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 126, 24);
  const dos = (v, p) => { const dx = v.bx - p.A[0], dy = v.by - p.A[1]; if (!dx && !dy) return null; const g = gcd(dx, dy), s = dy < 0 || (!dy && dx > 0) ? -1 : 1, a = s * dy / g, b = -s * dx / g; return [a, b, a * p.A[0] + b * p.A[1]]; };
  XG.figura('gira-segunda-recta', {
    ini: p => ({ bx: p.B0[0], by: p.B0[1] }),
    manijas: () => [{ k: ['bx', 'by'], min: [-6, -4], max: [6, 4], paso: 1, rot: () => 'B', en: v => [PF.X(v.bx), PF.Y(v.by)], de: (x, y) => [(x - PF.ox) / PF.u, (PF.oy - y) / PF.u] }],
    ok: (v, p) => { const r = dos(v, p); return !!r && p.L[0] * r[1] - p.L[1] * r[0] === 0; },
    sol: p => ({ bx: p.B[0], by: p.B[1] }),
    texto: p => { const r = dos({ bx: p.B[0], by: p.B[1] }, p); return `$${eqT(r.slice(0, 2), r[2])}$, que pasa por $(${p.B.join(', ')})$`; },
    alto: () => 244, pie: 'Arrastra B: la segunda recta gira alrededor de A.',
    dib(v, K, p, f) {
      const r = dos(v, p), [a, b, c] = p.L;
      let h = rejilla(K, PF) + recta(K, PF, a, b, c, 'lg gr') + K.t(8, 16, `fija: ${eq([a, b], c)}`, 's tg', 'start');
      if (r) h += recta(K, PF, r[0], r[1], r[2], 'la gr');
      h += K.c(PF.X(p.A[0]), PF.Y(p.A[1]), 5, 'fk') + K.t(PF.X(p.A[0]) + 9, PF.Y(p.A[1]) - 7, 'A', 's', 'start');
      if (!r) return h;
      const z = cruce(p.L, r), misma = !z && a * r[2] === c * r[0] && b * r[2] === c * r[1];
      const dice = z ? `se cortan en (${sg(r1(z[0]))}, ${sg(r1(z[1]))}): una solución` : misma ? 'la misma recta: infinitas soluciones' : 'paralelas: ninguna solución';
      return h + K.f(f, K.t(332, 16, `tuya: ${eq([r[0], r[1]], r[2])}`, 's ta', 'end') + K.t(170, 238, dice, `s ${p.caso === (misma ? 'misma' : z ? 'punto' : 'paralela') ? 'to' : 'tf'}`)
        + (z && Math.abs(z[0]) <= 6 && Math.abs(z[1]) <= 4 ? K.c(PF.X(z[0]), PF.Y(z[1]), 6, 'fF') : ''));
    },
    lee: (v, p) => { const r = dos(v, p); return r ? `Tu recta: $${eqT(r.slice(0, 2), r[2])}$; la fija: $${eqT(p.L.slice(0, 2), p.L[2])}$` : 'A y B coinciden: no queda recta.'; },
    aviso: (v, p) => (dos(v, p) ? p.mira : p.pega),
    bien: (v, p) => p.ok,
  });

  // ----------------------------------------------------------------------------------- el punto común: la solución
  // Dos condiciones de contexto dibujadas como rectas; se arrastra el punto hasta el que cumple las dos.  v { x, y }
  //   params { E: [[a, b, c], [a, b, c]], et: [nombre de cada recta], sol: [x, y], ini, mira: [solo la 1, solo la 2, ninguna], ok }
  const PC = plano({ x0: 0, x1: 10, y0: 0, y1: 8 }, 34, 250, 26);
  const cumple = (E, x, y) => E.map(([a, b, c]) => a * x + b * y === c);
  XG.figura('cruce-de-rectas', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [0, 0], max: [10, 8], paso: 1, en: v => [PC.X(v.x), PC.Y(v.y)], de: (x, y) => [(x - PC.ox) / PC.u, (PC.oy - y) / PC.u] }],
    ok: (v, p) => v.x === p.sol[0] && v.y === p.sol[1],
    sol: p => ({ x: p.sol[0], y: p.sol[1] }),
    texto: p => `$(${p.sol.join(', ')})$`,
    alto: () => 268, pie: 'Arrastra el punto que brilla.',
    dib(v, K, p, f) {
      const [E1, E2] = p.E, x = Math.round(v.x), y = Math.round(v.y), [c1, c2] = cumple(p.E, x, y);
      let h = rejilla(K, PC) + recta(K, PC, ...E1, 'la gr') + recta(K, PC, ...E2, 'lg gr')
        + K.t(8, 16, `${p.et[0]}: ${eq(E1.slice(0, 2), E1[2])}`, 's ta', 'start') + K.t(8, 34, `${p.et[1]}: ${eq(E2.slice(0, 2), E2[2])}`, 's tg', 'start');
      const va = E1[0] * x + E1[1] * y, vb = E2[0] * x + E2[1] * y;
      return h + K.f(f, K.t(332, 16, `${va} ${c1 ? '✓' : '✗'}`, `s ${c1 ? 'to' : 'tf'}`, 'end') + K.t(332, 34, `${vb} ${c2 ? '✓' : '✗'}`, `s ${c2 ? 'to' : 'tf'}`, 'end')
        + K.c(PC.X(p.sol[0]), PC.Y(p.sol[1]), 7, 'fo'));
    },
    lee: (v, p) => p.E.map(([a, b, c]) => `$${a} \\cdot ${v.x} + ${b} \\cdot ${v.y} = ${a * v.x + b * v.y}$`).join(' y '),
    aviso: (v, p) => { const [c1, c2] = cumple(p.E, v.x, v.y); return c1 ? p.mira[0] : c2 ? p.mira[1] : p.mira[2]; },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------- los casos por la proporción de los coeficientes
  // Tres sistemas en renglones; a cada uno se le arrastra cuántas soluciones tiene. Al comprobar salen las razones.
  //   params { sis: [[[a, b, c], [a, b, c]] × 3], metas, fichas, mira, trampas, ok }
  const yS = i => 38 + i * 70;
  const razon = ([a, b, c], [d, e, f]) => {
    const ab = a * e === b * d, ac = a * f === c * d;
    return `${sg(a)}/${sg(d)} ${ab ? '=' : '≠'} ${sg(b)}/${sg(e)}${ab ? ` ${ac ? '=' : '≠'} ${sg(c)}/${sg(f)}` : ''}`;
  };
  XG.rotula('coeficientes-proporcion', {
    slots: p => p.sis.map((_, i) => ({ x: 272, y: yS(i), w: 112, h: 40 })),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => p.metas.join('; '), alto: () => 218,
    fondo: (K, p, f) => p.sis.map(([e1, e2], i) => K.t(8, yS(i) - 6, eq(e1.slice(0, 2), e1[2]), '', 'start') + K.t(8, yS(i) + 14, eq(e2.slice(0, 2), e2[2]), '', 'start')
      + K.f(f, K.t(8, yS(i) + 32, razon(e1, e2), 's tm', 'start')) + (i ? K.l(8, yS(i) - 32, 332, yS(i) - 32, 'ls') : '')).join(''),
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ---------------------------------------------------------------------- eliminación: un múltiplo que borra una incógnita
  // Se elige k con la regla: la ecuación nueva E[t] + k·E[s] es otra recta que gira alrededor del punto común.  v { k }
  //   params { E: [[a, b, c], [a, b, c]], s: la que se multiplica, elim: 'x' | 'y', P: [x, y], k0, mira, trampa, ok }
  const PM = plano({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 126, 22);
  const nueva = (p, k) => { const A = p.E[1 - p.s], B = p.E[p.s]; return A.map((a, i) => a + k * B[i]); };
  const kSol = p => { const i = p.elim === 'x' ? 0 : 1; return -p.E[1 - p.s][i] / p.E[p.s][i]; };
  const nom = p => [`E${p.s === 0 ? '₂' : '₁'}`, `E${p.s === 0 ? '₁' : '₂'}`];
  XG.figura('multiplo-elimina', {
    ini: p => ({ k: p.k0 }),
    manijas: p => [{ k: 'k', min: -5, max: 5, paso: 1, et: `k: cuántas veces ${nom(p)[1]} se suma a ${nom(p)[0]}` }],
    ok: (v, p) => nueva(p, v.k)[p.elim === 'x' ? 0 : 1] === 0,
    sol: p => ({ k: kSol(p) }),
    texto: p => { const r = nueva(p, kSol(p)); return `$k = ${kSol(p)}$: $${eqT(r.slice(0, 2), r[2])}$`; },
    alto: () => 270,
    dib(v, K, p, f) {
      const [E1, E2] = p.E, k = Math.round(v.k * 1000) / 1000, r = nueva(p, k), [n0, n1] = nom(p);
      let h = rejilla(K, PM) + recta(K, PM, ...E1, 'lg') + recta(K, PM, ...E2, 'la')
        + K.t(8, 16, `E₁: ${eq(E1.slice(0, 2), E1[2])}`, 's tg', 'start') + K.t(332, 16, `E₂: ${eq(E2.slice(0, 2), E2[2])}`, 's ta', 'end');
      if (Math.abs(r[0]) > 1e-9 || Math.abs(r[1]) > 1e-9) h += recta(K, PM, ...r, 'lf gr');
      h += K.c(PM.X(p.P[0]), PM.Y(p.P[1]), 5, 'fk');
      const kr = Math.round(v.k), rr = nueva(p, kr), i = p.elim === 'x' ? 0 : 1, bien = rr[i] === 0;
      return h + K.f(f, K.r(70, 30, 200, 26, 'fc', 6) + K.t(170, 48, `${n0} + ${sg(kr)}·${n1}:  ${eq(rr.slice(0, 2), rr[2])}`, `s ${bien ? 'to' : 'tf'}`));
    },
    lee: (v, p) => { const r = nueva(p, v.k), [n0, n1] = nom(p); return `$${n0} + (${v.k}) \\cdot ${n1}$: $${eqT(r.slice(0, 2), r[2])}$`; },
    aviso: (v, p) => { const r = nueva(p, v.k), i = p.elim === 'x' ? 0 : 1; return r[1 - i] === 0 ? p.trampa : `${p.mira} Con k = ${sg(v.k)}, a la ${p.elim} le queda ${sg(r[i])}.`; },
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------------- sustitución hacia atrás en un escalonado 3×3
  // Renglones de un sistema escalonado; el valor que despeja cada renglón se arrastra a su lado, de abajo hacia arriba.
  //   params { E: [[a, b, c, d] × 3], metas: [z, y, x], fichas, subs: [cuenta de cada renglón], mira, trampas, ok }
  const yE = i => 42 + i * 62, VAR = ['x', 'y', 'z'];
  XG.rotula('escalon-regresivo', {
    slots: p => [2, 1, 0].map(i => ({ x: 270, y: yE(i), w: 84, h: 40 })),
    fichas: p => p.fichas, metas: p => p.metas, texto: p => `$z = ${p.metas[0]}$, $y = ${p.metas[1]}$, $x = ${p.metas[2]}$`.replace(/−/g, '-'), alto: () => 202,
    fondo: (K, p, f) => p.E.map((e, i) => K.t(8, yE(i) + 5, eq(e.slice(0, 3), e[3]), '', 'start') + K.t(222, yE(i) + 5, `${VAR[i]} =`, 'ta', 'end')
      + K.f(f, K.t(8, yE(i) + 25, p.subs[i], 's tm', 'start'))).join('') + K.t(8, 14, 'se resuelve de abajo hacia arriba', 's tm', 'start')
      + K.f(f, K.ar(328, yE(2) + 10, 328, yE(0) - 10, 'lm')),
    aviso: (q, p) => { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: p => p.ok,
  });

  // ------------------------------------------------------------------------- tres planos: el tercero vale d
  // Vista de canto: los planos ax + by + az = d se ven como rectas en el corte (S = x + z, y). Los dos primeros comparten
  // una recta, que de canto es un punto. Se elige d con la regla; al comprobar entra el tercer plano.  v { d }
  //   params { pl: [[a, b, d], [a, b, d]], t3: [a, b], d, d0, pt: [x, y, z] en la recta común, mira, ok }
  const PV = { x0: -2, x1: 10, y0: -2, y1: 6, X: s => 82 + s * 22, Y: t => 172 - t * 22 };
  const pla = ([a, b], d, vs = 'xyz') => eq([a, b, a], d, vs);
  XG.figura('tercer-plano', {
    ini: p => ({ d: p.d0 }),
    manijas: () => [{ k: 'd', min: 0, max: 16, paso: 1, et: 'd, el término del tercer plano' }],
    ok: (v, p) => v.d === p.d,
    sol: p => ({ d: p.d }),
    texto: p => `$d = ${p.d}$: $${pla(p.t3, p.d).replace(/−/g, '-')}$`,
    alto: () => 270,
    dib(v, K, p, f) {
      const d = Math.round(v.d), [A, B] = p.pl, C = [...p.t3, d], z = cruce(A, B);
      let h = K.t(8, 16, pla(A, A[2]), 's tg', 'start') + K.t(170, 16, pla(B, B[2]), 's ta') + K.t(332, 16, pla(p.t3, d), 's tf', 'end')
        + K.t(170, 34, 'vista de canto: cada plano se ve como una recta', 's tm')
        + recta(K, PV, ...A, 'lg gr') + recta(K, PV, ...B, 'la gr') + K.c(PV.X(z[0]), PV.Y(z[1]), 5, 'fk') + K.t(PV.X(z[0]) + 10, PV.Y(z[1]) + 4, 'recta común', 's', 'start');
      const pa = cruce(A, C), pb = cruce(B, C), ok = d === p.d;
      return h + K.f(f, recta(K, PV, ...C, 'lf gr')
        + (!ok && pa && pb ? K.p([[PV.X(z[0]), PV.Y(z[1])], [PV.X(pa[0]), PV.Y(pa[1])], [PV.X(pb[0]), PV.Y(pb[1])]], 'ff') : '')
        + K.t(170, 232, ok ? 'los tres planos comparten la recta: infinitas soluciones' : 'forman un túnel: ningún punto está en los tres', `s ${ok ? 'to' : 'tf'}`));
    },
    lee: (v, p) => { const [x, y, z] = p.pt, [a, b] = p.t3; return `En $(${x}, ${y}, ${z})$: $${a} \\cdot ${x} + ${b} \\cdot ${y} + ${a} \\cdot ${z} = ${a * x + b * y + a * z}$; tu $d = ${v.d}$`; },
    aviso: (v, p) => `${p.mira} Con d = ${v.d} el tercer plano no pasa por la recta común.`,
    bien: (v, p) => p.ok,
  });

  // ------------------------------------------------------------------- en movimiento: repartos con dos condiciones
  // Hay n objetos de dos clases (precios p1 y p2) y el total es T. Se fija cuántos son de la primera clase y al soltar se
  // llenan las barras de cantidad y de dinero.  tiro { q, n, p1, p2, T, r, u1, u2, din, et }
  const W = 300, X0 = 20;
  XG.tiros('lanza-reparto', {
    perilla: t => ({ et: t.et, min: 0, max: t.n, cara: v => v, lee: v => `${v} ${t.u1}` }),
    meta: t => t.r, alto: 170, ms: 1500, pie: 'Fija cuántos son de la primera clase y suelta.',
    dib(t, v, K, p, f) {
      const M = Math.max(t.p1, t.p2) * t.n, xT = X0 + t.T / M * W;
      let h = K.t(X0, 26, `cantidad: ${t.n}`, 's tm', 'start') + K.r(X0, 34, W, 22, 'fc', 4)
        + K.t(X0, 96, 'dinero', 's tm', 'start') + K.r(X0, 104, W, 22, 'fc', 4) + K.l(xT, 96, xT, 134, 'lo gr') + K.t(Math.min(318, Math.max(36, xT)), 150, `${t.T} ${t.din}`, 's to');
      if (v == null) return h;
      const g = Math.min(1, f * 1.6), w1 = v / t.n * W, tot = t.p1 * v + t.p2 * (t.n - v), bien = v === t.r;
      h += K.r(X0, 34, w1, 22, 'fa', 4) + K.r(X0 + w1, 34, W - w1, 22, 'fg', 4)
        + K.t(X0 + 4, 74, `${v} ${t.u1}`, 's ta', 'start') + K.t(X0 + W - 4, 74, `${t.n - v} ${t.u2}`, 's tg', 'end');
      const wa = t.p1 * v / M * W * g, wb = t.p2 * (t.n - v) / M * W * Math.max(0, Math.min(1, f * 1.6 - 0.6));
      h += K.r(X0, 104, wa, 22, f >= 1 ? (bien ? 'fo' : 'ff') : 'fa', 4) + K.r(X0 + t.p1 * v / M * W, 104, wb, 22, f >= 1 ? (bien ? 'fo' : 'ff') : 'fg', 4);
      return h + K.f(f * 3 - 2, K.t(332, 96, `${tot} ${t.din}`, `s ${bien ? 'to' : 'tf'}`, 'end'));
    },
    falla: (t, v) => { const tot = t.p1 * v + t.p2 * (t.n - v); return tot > t.T ? `Con ${v} ${t.u1} se juntan ${tot} ${t.din}: se pasa de ${t.T}.` : `Con ${v} ${t.u1} se juntan ${tot} ${t.din}: faltan ${t.T - tot}.`; },
    cuenta: t => `$${t.p1}x + ${t.p2}(${t.n} - x) = ${t.T} \\;\\Rightarrow\\; x = ${t.r}$`,
  });
})();
;
//#archivo js/games/gva-escena-2.js
// Geometría Vectorial · juegos de la lección geo-2 «El conjunto Rⁿ y el álgebra matricial» (spec 2026-11-27-curso-geometria-vectorial).
// Flechas de R² que se suman y se estiran, combinaciones lineales con dos perillas, matriz por vector como combinación de columnas,
// dimensiones que encajan como dominó, el producto fila por columna, AB ≠ BA y un sistema escrito como A·x = b. Armazones de figura-kit.js.
(() => {
  const sg = n => String(n).replace('-', '−');
  const par = q => `(${q.map(sg).join(', ')})`, parT = q => `(${q.join(', ')})`;   // parT: dentro de TeX
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const mul = (A, B) => A.map(r => B[0].map((_, j) => dot(r, B.map(f => f[j]))));
  const col = (A, j) => A.map(r => r[j]);
  // Matriz con corchetes centrada en (cx, cy). M: filas de números o textos; cls(i, j) da la clase de cada entrada.
  function mat(K, cx, cy, M, { dx = 26, dy = 22, cls = () => '', marco = '' } = {}) {
    const n = M[0].length, w = (n - 1) * dx + 24, h = (M.length - 1) * dy + 24, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    let s = K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]], marco) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]], marco);
    M.forEach((r, i) => r.forEach((v, j) => { s += K.t(x0 + 12 + j * dx, y0 + 12 + i * dy + 5, typeof v === 'number' ? sg(v) : v, cls(i, j)); }));
    return s;
  }
  // Corchetes sueltos (para encerrar casilleros).
  const corchetes = (K, x0, x1, y0, y1) => K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]]);
  // Plano cuadriculado: origen O (píxeles), u píxeles por unidad, de x0 a x1 y de y0 a y1 (unidades).
  function plano(K, O, u, [x0, x1], [y0, y1]) {
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(O[0] + x * u, O[1] - y0 * u, O[0] + x * u, O[1] - y1 * u, x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(O[0] + x0 * u, O[1] - y * u, O[0] + x1 * u, O[1] - y * u, y ? 'ls' : 'lm');
    return h;
  }
  // Rótulo junto a la punta de una flecha, empujado hacia afuera y dentro del lienzo.
  const rot = (K, P, Q, s, cls = 's', alto = 300) => {
    const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]) || 1, x = Q[0] + (Q[0] - P[0]) / d * 14, y = Q[1] + (Q[1] - P[1]) / d * 14 + 4;
    return K.t(Math.max(14, Math.min(326, x)), Math.max(12, Math.min(alto - 4, y)), s, cls);
  };
  // Término a·u con su signo, para escribir combinaciones: coef(2, 'u', true) → '2\vec u'.
  const coef = (a, n, primero) => { const s = a < 0 ? '-' : primero ? '' : '+', m = Math.abs(a); return `${primero ? s : ` ${s} `}${m === 1 ? '' : m}\\vec ${n}`; };
  // Ecuación lineal en texto plano: lin([2, -1], ['a', 'b'], 4) → '2a − b = 4'.
  const lin = (c, xs, b) => c.map((k, i) => [k, xs[i]]).filter(([k]) => k).map(([k, x], i) => `${k < 0 ? (i ? ' − ' : '−') : i ? ' + ' : ''}${Math.abs(k) === 1 ? '' : Math.abs(k)}${x}`).join('') + ` = ${sg(b)}`;

  // ------------------------------------------------------------------------------- suma y producto por escalar
  // Se arrastra la punta de w = a·u + b·v en una cuadrícula de −6 a 6 y de −4 a 5.   params { u, v, a, b, ini, nu?, nv? }
  const PX = (X, Y) => [170 + 24 * X, 132 - 24 * Y];
  const comb = (p, a = p.a, b = p.b) => [a * p.u[0] + b * p.v[0], a * p.u[1] + b * p.v[1]];
  const expr = p => `${coef(p.a, p.nu || 'u', true)}${coef(p.b, p.nv || 'v')}`;
  XG.figura('suma-a-flechas', {
    ini: p => ({ x: p.ini[0], y: p.ini[1] }),
    manijas: () => [{ k: ['x', 'y'], min: [-6, -4], max: [6, 5], paso: 1, en: v => PX(v.x, v.y), de: (x, y) => [(x - 170) / 24, (132 - y) / 24] }],
    ok: (v, p) => { const w = comb(p); return v.x === w[0] && v.y === w[1]; },
    sol: p => { const w = comb(p); return { x: w[0], y: w[1] }; },
    texto: p => `$\\vec w = ${expr(p)} = ${parT(comb(p))}$`,
    alto: () => 240, pie: 'Arrastra la punta de la flecha w.',
    dib(v, K, p, f) {
      const O = PX(0, 0), U = PX(...p.u), V = PX(...p.v), W = PX(v.x, v.y), nu = p.nu || 'u', nv = p.nv || 'v';
      let h = plano(K, O, 24, [-6, 6], [-4, 5]);
      h += K.ar(...O, ...U, 'lg gr') + rot(K, O, U, nu, 'tg', 240) + K.ar(...O, ...V, 'lf gr') + rot(K, O, V, nv, 'tf', 240);
      if (f > 0) {   // el camino de la cuenta: a·u y luego b·v, cola con punta
        const A = PX(...comb(p, p.a, 0)), S = PX(...comb(p)), g = Math.min(1, f * 1.6), k = Math.max(0, f * 1.6 - 0.6);
        h += K.f(g, K.ar(...O, O[0] + (A[0] - O[0]) * g, O[1] + (A[1] - O[1]) * g, 'lg d')) + K.f(k, K.ar(...A, A[0] + (S[0] - A[0]) * k, A[1] + (S[1] - A[1]) * k, 'lf d'))
          + K.f(k, K.c(...S, 6, 'fo') + K.t(S[0], S[1] - 12, par(comb(p)), 's to'));
      }
      return h + K.ar(...O, ...W, 'la gr') + K.c(...W, 3, 'fA') + K.t(332, 18, `w = ${par([v.x, v.y])}`, 's ta', 'end');
    },
    lee: v => `$\\vec w = ${parT([v.x, v.y])}$`,
    aviso(v, p) {
      const w = comb(p), eq = q => q[0] === v.x && q[1] === v.y, nu = p.nu || 'u', nv = p.nv || 'v';
      if (eq(comb(p, p.a, -p.b))) return `El signo de ${nv} quedó al revés: la cuenta ${p.b < 0 ? 'resta' : 'suma'} ${nv}.`;
      if (Math.abs(p.a) !== 1 && eq(comb(p, Math.sign(p.a), p.b))) return `Usaste ${nu} una sola vez: el ${sg(p.a)} la estira, ${sg(p.a)}·${nu} = ${par(comb(p, p.a, 0))}.`;
      if (Math.abs(p.b) !== 1 && eq(comb(p, p.a, Math.sign(p.b)))) return `Falta estirar ${nv}: ${sg(p.b)}·${nv} = ${par(comb(p, 0, p.b))}.`;
      if (eq([w[1], w[0]])) return 'Cambiaste las componentes: la primera va a la derecha y la segunda hacia arriba.';
      return `Tu punta está en ${par([v.x, v.y])}. Haz ${sg(p.a)}·${nu} = ${par(comb(p, p.a, 0))} y luego súmale ${sg(p.b)}·${nv} = ${par(comb(p, 0, p.b))}, componente a componente.`;
    },
    bien: (v, p) => `${par(comb(p, p.a, 0))} + ${par(comb(p, 0, p.b))} = ${par(comb(p))}: cada componente se opera por separado.`,
  });

  // --------------------------------------------------------------------------------- combinación lineal
  // Dos perillas a y b estiran u y v (cada una desde el origen); al comprobar, b·v se pone en la punta de a·u.
  //   params { u, v, T, ini: [a, b] }   La solución se busca entre −3 y 3 (u y v no son paralelas: es una sola).
  const PC = (X, Y) => [170 + 20 * X, 132 - 20 * Y];
  const busca = p => { for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) { const s = comb(p, a, b); if (s[0] === p.T[0] && s[1] === p.T[1]) return { a, b }; } return null; };
  XG.figura('rieles-combinacion', {
    ini: p => ({ a: p.ini[0], b: p.ini[1] }),
    manijas: () => [{ k: 'a', min: -3, max: 3, paso: 1, et: 'a: cuántas veces u' }, { k: 'b', min: -3, max: 3, paso: 1, et: 'b: cuántas veces v' }],
    ok: (v, p) => { const s = comb(p, v.a, v.b); return s[0] === p.T[0] && s[1] === p.T[1]; },
    sol: busca,
    texto: p => { const s = busca(p); return `$a = ${s.a}$ y $b = ${s.b}$: $${s.a}\\,\\vec u + ${s.b < 0 ? `(${s.b})` : s.b}\\,\\vec v = ${parT(p.T)}$`; },
    alto: () => 300, pie: 'Mueve las dos perillas: cada una estira su flecha.',
    dib(v, K, p, f) {
      const O = PC(0, 0), A = PC(...comb(p, v.a, 0)), B = PC(...comb(p, 0, v.b)), T = PC(...p.T), S = PC(...comb(p, v.a, v.b));
      let h = plano(K, O, 20, [-7, 7], [-3, 6]) + K.r(T[0] - 8, T[1] - 8, 16, 16, 'fg', 2) + K.t(T[0], T[1] - 13, 'caja', 's tg');
      h += K.ar(...O, ...PC(...p.u), 'lm') + K.ar(...O, ...PC(...p.v), 'lm');
      const g = Math.min(1, f * 1.5), C = [O[0] + (A[0] - O[0]) * g, O[1] + (A[1] - O[1]) * g];   // b·v se traslada a la punta de a·u
      h += K.ar(...O, ...A, 'la gr') + K.ar(...C, C[0] + B[0] - O[0], C[1] + B[1] - O[1], 'lf gr');
      if (f > 0.6) h += K.f((f - 0.6) / 0.4, K.ar(...O, ...S, 'lo gr') + K.c(...S, 5, 'fo'));
      h = `<svg x="0" y="0" width="340" height="200" viewBox="0 0 340 200">${h}</svg>`;
      return h + K.t(8, 18, `a·u = ${par(comb(p, v.a, 0))}`, 's ta', 'start') + K.t(332, 18, `b·v = ${par(comb(p, 0, v.b))}`, 's tf', 'end');
    },
    lee: (v, p) => `$${v.a}\\,\\vec u + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec v = ${parT(comb(p, v.a, v.b))}$`,
    aviso(v, p) {
      const s = busca(p), r = comb(p, v.a, v.b), eqs = `${lin([p.u[0], p.v[0]], ['a', 'b'], p.T[0])} y ${lin([p.u[1], p.v[1]], ['a', 'b'], p.T[1])}`;
      if (v.a === s.b && v.b === s.a) return 'Cambiaste los números: a es cuántas veces u y b cuántas veces v.';
      if (v.a === -s.a && v.b === -s.b) return `Llegas al punto opuesto, ${par(r)}: los dos signos quedaron al revés.`;
      return `Llegas a ${par(r)}, no a ${par(p.T)}. Por componentes: ${eqs}.`;
    },
    bien: (v, p) => { const s = busca(p); return `${s.a}·u + ${sg(s.b)}·v = ${par(p.T)}: la caja es una combinación lineal de u y v.`; },
  });

  // ------------------------------------------------------------------------- matriz por vector: columnas
  // A·x = x₁·(columna 1) + x₂·(columna 2): se ponen los pesos y el resultado.   params { A (2×2), x, filas, cols, extra }
  const ax = p => p.A.map(r => dot(r, p.x));
  const axT = p => [0, 1].map(k => p.x[0] * p.A[0][k] + p.x[1] * p.A[1][k]);   // filas tomadas como columnas
  XG.rotula('columnas-del-pedido', {
    slots: () => [{ x: 70, y: 150, w: 40, h: 36 }, { x: 162, y: 150, w: 40, h: 36 }, { x: 274, y: 128, w: 54, h: 34 }, { x: 274, y: 170, w: 54, h: 34 }],
    metas: p => [...p.x, ...ax(p)].map(sg), fichas: p => [...[...p.x, ...ax(p)].map(sg), ...p.extra], alto: () => 214,
    texto: p => `$A\\vec x = ${p.x[0]}\\,(${col(p.A, 0).join(', ')}) + ${p.x[1]}\\,(${col(p.A, 1).join(', ')}) = ${par(ax(p))}$`,
    fondo(K, p, f) {
      let h = p.cols.map((c, j) => K.t(92 + j * 40, 18, c, 's tm')).join('') + p.filas.map((r, i) => K.t(8, 51 + i * 24, r, 's', 'start')).join('');
      h += mat(K, 112, 58, p.A, { dx: 40, dy: 24 }) + K.t(222, 63, 'pedido x =', 's', 'end') + mat(K, 248, 58, p.x.map(n => [n]), { dy: 24 });
      h += K.t(8, 155, 'A·x =', '', 'start') + mat(K, 108, 150, col(p.A, 0).map(n => [n]), { dy: 22, cls: () => 'tm' }) + K.t(134, 155, '+')
        + mat(K, 200, 150, col(p.A, 1).map(n => [n]), { dy: 22, cls: () => 'tm' }) + K.t(226, 155, '=') + corchetes(K, 242, 306, 108, 190);
      return h + K.f(f, K.t(170, 208, `= (${p.x[0]}·${p.A[0][0]} + ${p.x[1]}·${p.A[0][1]}, ${p.x[0]}·${p.A[1][0]} + ${p.x[1]}·${p.A[1][1]})`, 's ta'));
    },
    aviso(q, p) {
      const m = [...p.x, ...ax(p)].map(sg), i = m.findIndex((x, k) => q[k][0] !== x), y = q[i][0];
      if (i < 2) return `Cada número del pedido pesa su columna: la columna de ${p.cols[i]} va multiplicada por ${p.x[i]}.`;
      const k = i - 2;
      if (y === sg(axT(p)[k])) return `Tomaste las filas como columnas: la columna de ${p.cols[0]} es (${col(p.A, 0).join(', ')}), de arriba abajo.`;
      return `En ${p.filas[k]}: ${p.x[0]}·${p.A[k][0]} + ${p.x[1]}·${p.A[k][1]}. Suma lo que aporta cada columna en ese renglón.`;
    },
    bien: p => `${p.x[0]} veces la primera columna más ${p.x[1]} veces la segunda: ${par(ax(p))}.`,
  });

  // ------------------------------------------------------------------------------ dimensiones como dominó
  // Tres matrices que se encajan: las medidas de adentro deben coincidir.   params { piezas: [[nombre, m, n]], orden, extra }
  const pieza = q => `${q[0]}: ${q[1]}×${q[2]}`;
  const tam = p => { const o = p.orden.map(i => p.piezas[i]); return `${o[0][1]}×${o[2][2]}`; };
  XG.rotula('domino-dimensiones', {
    slots: () => [44, 118, 192, 288].map(x => ({ x, y: 156, w: 66, h: 40 })),
    metas: p => [...p.orden.map(i => pieza(p.piezas[i])), tam(p)], fichas: p => [...p.piezas.map(pieza), tam(p), ...p.extra], alto: () => 206,
    texto: p => `$${p.orden.map(i => p.piezas[i][0]).join('')}$: $${p.orden.map(i => `(${p.piezas[i][1]} \\times ${p.piezas[i][2]})`).join('')} = ${tam(p).replace('×', ' \\times ')}$`,
    fondo(K, p, f) {
      let h = '';
      p.piezas.forEach(([n, m, c], k) => {   // cada matriz como un rectángulo de m × c casillas
        const cx = 60 + k * 110, z = 9, x0 = cx - c * z / 2, y0 = 74 - m * z / 2;
        h += K.r(x0, y0, c * z, m * z, 'fa', 2);
        for (let i = 1; i < m; i++) h += K.l(x0, y0 + i * z, x0 + c * z, y0 + i * z, 'lr');
        for (let j = 1; j < c; j++) h += K.l(x0 + j * z, y0, x0 + j * z, y0 + m * z, 'lr');
        h += K.t(cx, 26, `${n}: ${m} × ${c}`, 's');
      });
      h += K.t(81, 161, '·') + K.t(155, 161, '·') + K.t(240, 161, '=');
      const o = p.orden.map(i => p.piezas[i]);
      return h + K.f(f, K.t(170, 200, `adentro: ${o[0][2]} con ${o[1][1]} y ${o[1][2]} con ${o[2][1]}; afuera: ${o[0][1]} × ${o[2][2]}`, 's to'));
    },
    aviso(q, p) {
      const P = Object.fromEntries(p.piezas.map(z => [pieza(z), z])), y = q.map(l => l[0]);
      if (y.slice(0, 3).some(t => !P[t])) return 'En los tres primeros lugares van las matrices; el tamaño del producto va después del igual.';
      for (let k = 0; k < 2; k++) { const a = P[y[k]], b = P[y[k + 1]]; if (a[2] !== b[1]) return `Entre ${a[0]} y ${b[0]}: ${a[2]} columnas contra ${b[1]} filas. Las medidas de adentro deben ser iguales.`; }
      const a = P[y[0]], c = P[y[2]];
      return `El tamaño sale de las medidas de afuera: las filas de ${a[0]} (${a[1]}) y las columnas de ${c[0]} (${c[2]}).`;
    },
    bien: p => `Cada pieza tiene tantas columnas como filas la siguiente; el producto mide ${tam(p).replace('×', ' × ')}.`,
  });

  // ------------------------------------------------------------------------------- producto fila por columna
  // PQ con su historia: filas de P (personas), columnas de Q (tiendas).   params { P, Q, fp, mid, cq, extra }
  XG.rotula('fila-por-columna', {
    slots: () => [[200, 148], [264, 148], [200, 190], [264, 190]].map(([x, y]) => ({ x, y, w: 56, h: 34 })),
    metas: p => mul(p.P, p.Q).flat().map(sg), fichas: p => [...mul(p.P, p.Q).flat().map(sg), ...p.extra], alto: () => 220,
    texto: p => `$PQ = \\begin{pmatrix} ${mul(p.P, p.Q).map(r => r.join(' & ')).join(' \\\\ ')} \\end{pmatrix}$`,
    fondo(K, p, f) {
      let h = p.mid.map((t, j) => K.t(66 + j * 36, 20, t, 's tm')).join('') + p.fp.map((t, i) => K.t(8, 51 + i * 24, t, 's', 'start')).join('') + mat(K, 84, 58, p.P, { dx: 36, dy: 24 }) + K.t(28, 96, 'P', 's ta');
      h += K.t(150, 63, '·') + p.cq.map((t, j) => K.t(220 + j * 40, 20, t, 's tm')).join('') + p.mid.map((t, i) => K.t(203, 51 + i * 24, t, 's tm', 'end')).join('') + mat(K, 240, 58, p.Q, { dx: 40, dy: 24 }) + K.t(312, 96, 'Q', 's ta');
      h += K.t(8, 174, 'PQ =', '', 'start') + p.cq.map((t, j) => K.t(200 + j * 64, 124, t, 's tm')).join('') + p.fp.map((t, i) => K.t(160, 153 + i * 42, t, 's', 'end')).join('') + corchetes(K, 166, 298, 128, 210);
      if (f > 0) { const r = mul(p.P, p.Q); h += K.f(f, K.t(332, 112, `${p.fp[0]}, ${p.cq[0]}: ${p.P[0][0]}·${p.Q[0][0]} + ${p.P[0][1]}·${p.Q[1][0]} = ${r[0][0]}`, 's to', 'end')); }
      return h;
    },
    aviso(q, p) {
      const r = mul(p.P, p.Q).flat().map(sg), QP = mul(p.Q, p.P).flat().map(sg), i = r.findIndex((x, k) => q[k][0] !== x), y = q[i][0], a = Math.floor(i / 2), b = i % 2;
      const otra = r.findIndex((x, k) => k !== i && x === y);
      if (otra >= 0) return `${y} es la casilla de ${p.fp[Math.floor(otra / 2)]} en ${p.cq[otra % 2]}. La de ${p.fp[a]} en ${p.cq[b]} usa la fila de ${p.fp[a]} en P y la columna de ${p.cq[b]} en Q.`;
      if (y === sg(p.P[a][b] * p.Q[a][b])) return 'Multiplicaste casilla por casilla. El producto de matrices es fila por columna: pareja por pareja y se suma.';
      if (y === QP[i]) return `Hiciste el producto al revés, QP. La casilla de ${p.fp[a]} en ${p.cq[b]} es la fila de ${p.fp[a]} en P por la columna de ${p.cq[b]} en Q.`;
      return `${p.fp[a]} en ${p.cq[b]}: ${p.P[a][0]}·${p.Q[0][b]} + ${p.P[a][1]}·${p.Q[1][b]}. Pareja por pareja, y se suma.`;
    },
    bien: () => 'Cada casilla es una fila de P por una columna de Q: pareja por pareja, y se suma.',
  });

  // ------------------------------------------------------------------------------------- AB ≠ BA
  // B tiene una entrada k (null en los datos): se busca el único k con AB = BA.   params { A, B, min, max, ini }
  const conK = (p, k) => p.B.map(r => r.map(x => (x === null ? k : x)));
  const iguales = (p, k) => { const B = conK(p, k); return JSON.stringify(mul(p.A, B)) === JSON.stringify(mul(B, p.A)); };
  const kSol = p => { for (let k = p.min; k <= p.max; k++) if (iguales(p, k)) return k; return null; };
  XG.figura('conmutan-o-no', {
    ini: p => ({ k: p.ini }),
    manijas: p => [{ k: 'k', min: p.min, max: p.max, paso: 1, et: 'k' }],
    ok: (v, p) => iguales(p, v.k), sol: p => ({ k: kSol(p) }),
    texto: p => `$k = ${kSol(p)}$: $AB = BA$`,
    alto: () => 236, pie: 'Mueve k. Los productos se calculan al comprobar.',
    dib(v, K, p, f) {
      const B = conK(p, v.k), AB = mul(p.A, B), BA = mul(B, p.A), q = (M, N) => M.map((r, i) => r.map((x, j) => (f > 0 ? x : '?')));
      const c = (M, N) => (i, j) => (f <= 0 ? 'tm' : M[i][j] === N[i][j] ? 'to' : 'tf');
      let h = K.t(36, 52, 'A =', '', 'end') + mat(K, 74, 48, p.A, { dx: 28 }) + K.t(198, 52, 'B =', '', 'end') + mat(K, 236, 48, B.map(r => r.map(sg)), { dx: 28, cls: (i, j) => (p.B[i][j] === null ? 'ta' : '') });
      h += K.t(36, 134, 'AB =', '', 'end') + K.f(f > 0 ? f : 1, mat(K, 82, 130, q(AB), { dx: 30, cls: c(AB, BA) })) + K.t(198, 134, 'BA =', '', 'end') + K.f(f > 0 ? f : 1, mat(K, 244, 130, q(BA), { dx: 30, cls: c(BA, AB) }));
      if (f > 0) h += K.f(f, K.t(170, 182, iguales(p, v.k) ? 'AB = BA: estas dos sí conmutan' : 'AB ≠ BA', iguales(p, v.k) ? 's to' : 's tf'));
      return h;
    },
    lee: (v, p) => `$k = ${v.k}$: $${iguales(p, v.k) ? 'AB = BA' : 'AB \\neq BA'}$`,
    aviso(v, p) {
      const B = conK(p, v.k), AB = mul(p.A, B), BA = mul(B, p.A);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (AB[i][j] !== BA[i][j]) return `Con k = ${sg(v.k)}, la casilla (${i + 1}, ${j + 1}) de AB es ${sg(AB[i][j])} y la de BA es ${sg(BA[i][j])}. Iguala esas dos con k como letra.`;
      return 'Revisa las cuatro casillas de los dos productos.';
    },
    bien: (v, p) => `Con k = ${kSol(p)} los dos órdenes dan la misma matriz. Es la excepción: en general AB ≠ BA.`,
  });

  // ------------------------------------------------------------------------------------- un sistema es A·x = b
  // Se pasan las ecuaciones a la forma A·x = b.   params { A (2×2), b, x (una solución, para comprobar), extra }
  const eqT = (r, b) => lin(r, ['x₁', 'x₂'], b);
  XG.rotula('escribe-ax-b', {
    slots: () => [[70, 118], [126, 118], [70, 160], [126, 160]].map(([x, y]) => ({ x, y, w: 46, h: 34 })).concat([118, 160].map(y => ({ x: 270, y, w: 58, h: 34 }))),
    metas: p => [...p.A.flat(), ...p.b].map(sg), fichas: p => [...[...p.A.flat(), ...p.b].map(sg), ...p.extra], alto: () => 214,
    texto: p => `$A = \\begin{pmatrix} ${p.A.map(r => r.join(' & ')).join(' \\\\ ')} \\end{pmatrix}$ y $\\vec b = (${p.b.join(', ')})$`,
    fondo(K, p, f) {
      let h = p.A.map((r, i) => K.t(170, 26 + i * 26, eqT(r, p.b[i]))).join('');
      h += corchetes(K, 42, 154, 96, 182) + mat(K, 190, 139, [['x₁'], ['x₂']], { dy: 42 }) + K.t(222, 144, '=') + corchetes(K, 236, 304, 96, 182) + K.t(26, 144, 'A', 's ta');
      return h + K.f(f, K.t(170, 206, `con x = (${p.x.join(', ')}): A·x = ${par(p.A.map(r => dot(r, p.x)))}`, 's to'));
    },
    aviso(q, p) {
      const m = [...p.A.flat(), ...p.b], i = m.findIndex((x, k) => q[k][0] !== sg(x)), y = q[i][0], r = i < 4 ? Math.floor(i / 2) : i - 4;
      if (y === sg(-m[i])) return 'Fíjate en el signo: si el término va restando, su número es negativo.';
      if (m[i] === 1 && y === '0') return 'Una incógnita sin número delante lleva un 1, no un 0.';
      if (i >= 4) return `b son los números a la derecha del igual: el de la ecuación ${r + 1}, con su signo.`;
      return `La fila ${r + 1} de A son los números delante de x₁ y x₂ en la ecuación ${r + 1}, en ese orden.`;
    },
    bien: () => 'Cada fila de A es una ecuación; x guarda las incógnitas y b lo que está a la derecha.',
  });

  // --------------------------------------------------------------------------- en movimiento: fila por columna
  // Se fija el total y al soltar las parejas se juntan, se multiplican y llenan la barra.
  //   params { max, tiros: [{ q, n: [nombres], fila, col, u, e: { valor: aviso } }] }
  XG.tiros('lanza-producto', {
    alto: 200,
    perilla: (t, p) => ({ et: 'total', min: 0, max: p.max, cara: v => v, lee: v => `${v} ${t.u}` }),
    meta: t => dot(t.fila, t.col),
    dib(t, v, K, p, f) {
      const n = t.fila.length, X = i => 170 + (i - (n - 1) / 2) * 96, B = x => 30 + 280 * x / p.max, m = dot(t.fila, t.col), baja = Math.min(1, f * 2.2);
      let h = '';
      t.fila.forEach((a, i) => {
        const y = 37 + 52 * (1 - baja);   // la columna sube hasta su pareja
        h += K.t(X(i), 16, t.n[i], 's tm') + K.r(X(i) - 30, 24, 28, 26, 'fa', 6) + K.t(X(i) - 16, 42, sg(a), 'ta');
        h += K.r(X(i) + 2, y - 13, 28, 26, 'fg', 6) + K.t(X(i) + 16, y + 5, sg(t.col[i]), 'tg');
        if (f > 0) h += K.f(Math.max(0, Math.min(1, f * 3 - 0.9 - i * 0.25)), K.t(X(i), 126, `${a}·${t.col[i]} = ${a * t.col[i]}`, 's'));
      });
      h += K.l(30, 162, 310, 162, 'lm');
      for (let k = 0; k <= p.max; k += 5) h += K.l(B(k), 158, B(k), 166, 'lm') + K.t(B(k), 182, k, 's tm');
      if (f > 0.45) { const llena = m * Math.min(1, (f - 0.45) / 0.45); h += K.r(30, 154, B(llena) - 30, 16, f >= 1 && v !== m ? 'fg' : 'fo', 3); if (f >= 1) h += K.t(B(m), 148, m, 's to'); }
      if (v != null) h += K.l(B(v), 150, B(v), 174, f >= 1 && v !== m ? 'lf gr' : 'la gr') + K.t(B(v), 196, v, 's ta');
      return h;
    },
    falla(t, v) {
      const m = dot(t.fila, t.col);
      return t.e?.[v] || (v < m ? `Te quedaste en ${v}: faltan parejas. Multiplica cada número por el suyo y suma las tres.` : `Te pasaste: ${v}. Multiplica cada pareja una sola vez y suma.`);
    },
    cuenta: t => `$${t.fila.map((a, i) => `${a} \\cdot ${t.col[i]}`).join(' + ')} = ${dot(t.fila, t.col)}$`,
    pie: 'Estira hasta el total y suelta.',
  });
})();
;
//#archivo js/games/gva-escena-3.js
// Geometría Vectorial · juegos de la lección geo-3 «Transpuesta, sistemas m×n y tipos de solución» (spec
// 2026-11-27-curso-geometria-vectorial). Armazones de js/games/figura-kit.js (figura, rotula, tiros); se dibujan con las piezas XPK.
(() => {
  const sg = n => String(n).replace('-', '−');
  const SUB = '₀₁₂₃₄₅₆₇₈₉', sub = n => String(n).split('').map(d => SUB[+d]).join('');
  const tx = n => String(n);   // número para TeX
  // Matriz con corchetes. x, y: esquina de arriba a la izquierda. o = { cw, rh, bar (columna tras la que va la raya), txt(i, j, e), cls(i, j) }
  const cx = (x, cw, j) => x + 4 + cw * (j + 0.5), cy = (y, rh, i) => y + rh * (i + 0.5);
  function mat(K, x, y, M, o = {}) {
    const cw = o.cw || 30, rh = o.rh || 26, n = M[0].length, w = n * cw + 8, h = M.length * rh, dy = o.s ? 4 : 5;
    let s = K.pl([[x + 6, y], [x, y], [x, y + h], [x + 6, y + h]]) + K.pl([[x + w - 6, y], [x + w, y], [x + w, y + h], [x + w - 6, y + h]]);
    if (o.bar != null) s += K.l(x + 4 + cw * (o.bar + 1), y + 3, x + 4 + cw * (o.bar + 1), y + h - 3, 'lm');
    M.forEach((row, i) => row.forEach((e, j) => {
      const t = o.txt ? o.txt(i, j, e) : sg(e);
      if (t !== '') s += K.t(cx(x, cw, j), cy(y, rh, i) + dy, t, `${o.s ? 's ' : ''}${o.cls ? o.cls(i, j) : ''}`.trim());
    }));
    return s;
  }
  const caja = (K, x, y, w, h, cls = 'la') => K.pl([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]], cls);
  const pmat = M => `\\begin{pmatrix} ${M.map(r => r.map(tx).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;

  // ------------------------------------------------------------------------------------------------ transpuesta
  // Se llenan las casillas de Aᵀ (3 × 2) con las entradas de A (2 × 3).  params { A, extra }
  const metasT = p => [0, 1, 2].flatMap(r => [0, 1].map(c => sg(p.A[c][r])));
  XG.rotula('filas-a-columnas', {
    slots: () => [0, 1, 2].flatMap(r => [0, 1].map(c => ({ x: 238 + c * 54, y: 56 + r * 46, w: 46, h: 38 }))),
    fichas: p => [...p.A.flat().map(sg), ...p.extra], metas: metasT, alto: () => 198,
    texto: p => `$A^T = ${pmat([0, 1, 2].map(r => [p.A[0][r], p.A[1][r]]))}$`,
    fondo(K, p, f) {
      const X = 24, Y = 78, CW = 34, RH = 28;
      let h = K.t(80, 52, 'A', 'b') + K.t(265, 22, 'Aᵀ', 'b')
        + mat(K, X, Y, p.A, { cw: CW, rh: RH, cls: i => (i ? 'tg' : 'ta') })
        + ['d1', 'd2', 'd3'].map((t, j) => K.t(cx(X, CW, j), Y - 8, t, 's tm')).join('')
        + K.t(18, cy(Y, RH, 0) + 4, 'T1', 's ta', 'end') + K.t(18, cy(Y, RH, 1) + 4, 'T2', 's tg', 'end')
        + K.ar(144, 106, 184, 106, 'lm')
        + K.pl([[216, 34], [210, 34], [210, 170], [216, 170]]) + K.pl([[314, 34], [320, 34], [320, 170], [314, 170]])
        + ['d1', 'd2', 'd3'].map((t, r) => K.t(204, 60 + r * 46, t, 's tm', 'end')).join('')
        + K.t(238, 190, 'T1', 's ta') + K.t(292, 190, 'T2', 's tg');
      h += K.f(f, caja(K, X + 2, Y + 1, 3 * CW + 4, RH - 2, 'la') + caja(K, 213, 35, 50, 134, 'la') + caja(K, X + 2, Y + RH + 1, 3 * CW + 4, RH - 2, 'lg') + caja(K, 267, 35, 50, 134, 'lg'));
      return h;
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasT(p);
      if (v.join() === p.A.flat().map(sg).join()) return 'Leíste A de corrido y la cortaste de a dos. Transponer no es eso: la fila 1 de A baja entera como columna 1.';
      const i = m.findIndex((x, k) => v[k] !== x), r = Math.floor(i / 2), c = i % 2;
      if (r < 2 && v[i] === sg(p.A[r][c])) return `En el lugar (${r + 1}, ${c + 1}) de Aᵀ va la entrada (${c + 1}, ${r + 1}) de A, no la (${r + 1}, ${c + 1}): fila y columna se cruzan.`;
      return `El lugar (${r + 1}, ${c + 1}) de Aᵀ sale de la fila ${c + 1} y la columna ${r + 1} de A.`;
    },
    bien: () => 'Cada fila de A bajó entera como una columna de Aᵀ: lo que estaba en (i, j) quedó en (j, i).',
  });

  // Matriz simétrica: se completan dos casillas para que Aᵀ = A.  v { a, b }  params { M (con dos null), et, ini }
  const huecos = p => p.M.flatMap((r, i) => r.map((e, j) => (e == null ? [i, j] : null))).filter(Boolean);
  const pide = p => huecos(p).map(([i, j]) => p.M[j][i]);
  const val = (v, p, i, j) => { const k = huecos(p).findIndex(([a, b]) => a === i && b === j); return k < 0 ? p.M[i][j] : v[['a', 'b'][k]]; };
  const lug = ([i, j]) => `(${i + 1}, ${j + 1})`;
  XG.figura('simetrica-espejo', {
    ini: p => ({ a: p.ini ?? 0, b: p.ini ?? 0 }),
    manijas: p => huecos(p).map((h, k) => ({ k: ['a', 'b'][k], min: 0, max: 9, paso: 1, et: `casilla ${lug(h)}` })),
    ok: (v, p) => v.a === pide(p)[0] && v.b === pide(p)[1],
    sol: p => ({ a: pide(p)[0], b: pide(p)[1] }),
    texto: p => huecos(p).map(([i, j], k) => `$a_{${i + 1}${j + 1}} = a_{${j + 1}${i + 1}} = ${pide(p)[k]}$`).join(' y '),
    alto: () => 250, pie: 'Mueve las dos perillas de abajo.',
    dib(v, K, p, f) {
      const X = 76, Y = 24, CW = 62, RH = 38, H = huecos(p);
      let h = '';
      if (f) for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
        const igual = val(v, p, i, j) === val(v, p, j, i), cls = igual ? 'fo' : 'ff';
        h += K.f(f, K.c(cx(X, CW, j), cy(Y, RH, i), 15, cls) + K.c(cx(X, CW, i), cy(Y, RH, j), 15, cls));
      }
      h += K.l(X + 4, Y, X + 4 + 3 * CW, Y + 3 * RH, 'lm d');
      H.forEach(([i, j]) => { h += K.r(cx(X, CW, j) - 20, cy(Y, RH, i) - 15, 40, 30, 'fn', 8); });
      h += mat(K, X, Y, p.M.map((r, i) => r.map((e, j) => val(v, p, i, j))), { cw: CW, rh: RH, cls: (i, j) => (H.some(([a, b]) => a === i && b === j) ? 'ta' : '') });
      h += [0, 1, 2].map(j => K.t(cx(X, CW, j), Y - 8, `${p.et}${j + 1}`, 's tm')).join('') + [0, 1, 2].map(i => K.t(X - 8, cy(Y, RH, i) + 4, `${p.et}${i + 1}`, 's tm', 'end')).join('');
      const todo = [0, 1, 2].every(i => [0, 1, 2].every(j => val(v, p, i, j) === val(v, p, j, i)));
      return h + K.f(f * 2 - 1, K.t(334, 80, todo ? 'Aᵀ = A' : 'Aᵀ ≠ A', todo ? 'tg' : 'tf', 'end'));
    },
    lee: (v, p) => huecos(p).map(([i, j], k) => `$a_{${i + 1}${j + 1}} = ${v[['a', 'b'][k]]}$`).join(', '),
    aviso(v, p) {
      const [x, y] = pide(p), H = huecos(p), bA = v.a === x, bB = v.b === y;
      if (!bA && !bB && v.a === y && v.b === x && x !== y) return 'Cruzaste los espejos: cada casilla copia a la del otro lado de la diagonal, con fila y columna cambiadas.';
      if (bA) return `La casilla ${lug(H[1])} todavía no se refleja: su pareja está en ${lug([H[1][1], H[1][0]])}.`;
      if (bB) return `La casilla ${lug(H[0])} todavía no se refleja: su pareja está en ${lug([H[0][1], H[0][0]])}.`;
      return 'Ninguna se refleja aún: la casilla (i, j) debe valer lo mismo que la (j, i).';
    },
    bien: () => 'Cada número es igual a su reflejo en la diagonal: la matriz es simétrica, Aᵀ = A.',
  });

  // Tallas: A es m×n y B es n×r; qué tamaño tiene cada matriz, o si no existe.  params { m, n, r }
  const talla = (a, b) => `${a}×${b}`;
  const metasTalla = p => [talla(p.n, p.m), talla(p.r, p.n), talla(p.r, p.m), talla(p.r, p.m), 'no existe'];
  XG.rotula('tallas-transpuesta', {
    slots: () => [0, 1, 2, 3, 4].map(i => ({ x: 268, y: 28 + i * 46, w: 96, h: 36 })),
    fichas: p => [...metasTalla(p), talla(p.m, p.r), talla(p.m, p.n)], metas: metasTalla, alto: () => 240,
    texto: p => `$A^T$: $${p.n} \\times ${p.m}$; $B^T$: $${p.r} \\times ${p.n}$; $(AB)^T = B^T A^T$: $${p.r} \\times ${p.m}$; $A^T B^T$ no existe`,
    fondo(K, p, f) {
      const u = 11, bloque = (x, y, a, b, cls) => { let h = ''; for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) h += K.r(x + j * u, y + i * u, u - 2, u - 2, cls, 2); return h; };
      let h = bloque(20, 26, p.m, p.n, 'fa') + K.t(20, 26 + p.m * u + 16, `A: ${p.m} × ${p.n}`, 's', 'start')
        + bloque(20, 110, p.n, p.r, 'fg') + K.t(20, 110 + p.n * u + 16, `B: ${p.n} × ${p.r}`, 's', 'start');
      h += ['Aᵀ', 'Bᵀ', '(AB)ᵀ', 'Bᵀ · Aᵀ', 'Aᵀ · Bᵀ'].map((t, i) => K.t(208, 33 + i * 46, t, '', 'end')).join('');
      h += K.f(f, K.t(150, 217, `${p.m} ≠ ${p.r}`, 's tf', 'end') + K.t(150, 171, `= (AB)ᵀ`, 's tg', 'end'));
      return h;
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasTalla(p), i = m.findIndex((x, k) => v[k] !== x);
      if (i === 0) return v[0] === talla(p.m, p.n) ? 'Esa es la talla de A: al transponer, filas y columnas cambian de papel.' : 'Aᵀ tiene tantas filas como columnas tenía A.';
      if (i === 1) return v[1] === talla(p.n, p.r) ? 'Esa es la talla de B: al transponer, se voltea.' : 'Bᵀ tiene tantas filas como columnas tenía B.';
      if (i === 2) return v[2] === talla(p.m, p.r) ? `AB es ${p.m} × ${p.r}; su transpuesta se voltea: ${p.r} × ${p.m}.` : 'Primero AB: filas de A por columnas de B. Luego se voltea.';
      if (i === 3) return `Bᵀ es ${p.r} × ${p.n} y Aᵀ es ${p.n} × ${p.m}: los del medio coinciden y el producto queda ${p.r} × ${p.m}.`;
      return `Aᵀ es ${p.n} × ${p.m} y Bᵀ es ${p.r} × ${p.n}: los del medio (${p.m} y ${p.r}) no coinciden, así que ese producto no existe.`;
    },
    bien: () => '(AB)ᵀ = BᵀAᵀ: al voltear el producto se invierte el orden, y así las tallas encajan.',
  });

  // ------------------------------------------------------------------------------------------------ operaciones de fila
  // Una cadena M₀ → M₁ → M₂ → M₃: se nombra la operación de cada paso.  params { Ms, ops, extra, mira, trampas }
  XG.rotula('nombra-operacion', {
    slots: () => [0, 1, 2].map(i => ({ x: 250, y: 68 + i * 74, w: 164, h: 34 })),
    fichas: p => [...p.ops, ...p.extra], metas: p => p.ops, alto: () => 282,
    texto: p => p.ops.join('; '),
    fondo(K, p, f) {
      const CW = 26, RH = 15;
      let h = '';
      p.Ms.forEach((M, k) => {
        const y = 8 + k * 74;
        if (k && f) M.forEach((row, i) => { if (row.join() !== p.Ms[k - 1][i].join()) h += K.f(f, K.r(22, y + i * RH, 4 * CW + 4, RH, 'fn', 3)); });
        h += mat(K, 18, y, M, { cw: CW, rh: RH, bar: 2, s: true });
        if (k < 3) h += K.ar(74, y + 49, 74, y + 70, 'lm') + K.l(90, y + 60, 166, y + 60, 'lm d');
      });
      return h;
    },
    aviso(q, p) { const i = p.ops.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
    bien: () => 'Cada paso es una de las tres operaciones: intercambiar filas, multiplicar una por k ≠ 0 o sumarle k veces otra.',
  });

  // Anular la primera columna bajo el pivote con F₂ + k₂·F₁ y F₃ + k₃·F₁.  v { a, b }  params { F }
  const kNeed = (p, i) => -p.F[i][0] / p.F[0][0];
  const filaK = (p, i, k) => p.F[i].map((e, j) => e + k * p.F[0][j]);
  const conK = k => (k < 0 ? `− ${-k}` : `+ ${k}`);
  XG.figura('anula-bajo-pivote', {
    ini: () => ({ a: 0, b: 0 }),
    manijas: () => [{ k: 'a', min: -4, max: 4, paso: 1, et: 'k₂, para F₂ + k₂·F₁' }, { k: 'b', min: -4, max: 4, paso: 1, et: 'k₃, para F₃ + k₃·F₁' }],
    ok: (v, p) => v.a === kNeed(p, 1) && v.b === kNeed(p, 2),
    sol: p => ({ a: kNeed(p, 1), b: kNeed(p, 2) }),
    texto: p => `$k_2 = ${kNeed(p, 1)}$ y $k_3 = ${kNeed(p, 2)}$: $F_2 ${conK(kNeed(p, 1)).replace('−', '-')} F_1$ y $F_3 ${conK(kNeed(p, 2)).replace('−', '-')} F_1$`,
    alto: () => 232, pie: 'Mueve k₂ y k₃. Al comprobar se hacen las cuentas.',
    dib(v, K, p, f) {
      const X = 34, Y = 18, CW = 40, RH = 32, M = [p.F[0], f > 0.5 ? filaK(p, 1, v.a) : p.F[1], f > 0.5 ? filaK(p, 2, v.b) : p.F[2]];
      let h = K.c(cx(X, CW, 0), cy(Y, RH, 0), 14, 'fn');
      if (f > 0.5) [1, 2].forEach(i => { h += K.f(f * 2 - 1, K.c(cx(X, CW, 0), cy(Y, RH, i), 14, M[i][0] === 0 ? 'fo' : 'ff')); });
      h += mat(K, X, Y, M, { cw: CW, rh: RH, bar: 2 });
      h += K.t(218, cy(Y, RH, 0) + 4, 'F₁ (pivote ' + sg(p.F[0][0]) + ')', 's tm', 'start');
      h += K.t(218, cy(Y, RH, 1) + 4, `F₂ ${conK(v.a)}·F₁`, 's ta', 'start') + K.t(218, cy(Y, RH, 2) + 4, `F₃ ${conK(v.b)}·F₁`, 's ta', 'start');
      return h;
    },
    lee: v => `$F_2 \\to F_2 ${conK(v.a).replace('−', '-')} F_1$, $F_3 \\to F_3 ${conK(v.b).replace('−', '-')} F_1$`,
    aviso(v, p) {
      const e2 = filaK(p, 1, v.a)[0], e3 = filaK(p, 2, v.b)[0];
      if ((e2 && v.a && v.a === -kNeed(p, 1)) || (!e2 && e3 && v.b && v.b === -kNeed(p, 2))) return 'Con ese signo el número de abajo crece en vez de anularse: usa el k contrario.';
      if (e2) return `En F₂ la primera entrada queda en ${sg(e2)}, no en 0.`;
      return `F₂ quedó bien; en F₃ la primera entrada queda en ${sg(e3)}, no en 0.`;
    },
    bien: (v, p) => `Debajo del pivote ${sg(p.F[0][0])} solo quedan ceros: la primera columna ya está en escalera.`,
  });

  // ------------------------------------------------------------------------------------------------ pivotes y tipo
  // Se rotula cada columna de una escalonada (pivote o libre) y el tipo de solución.  params { M (última columna: constantes), extra }
  const nv = p => p.M[0].length - 1;
  const pivs = p => p.M.map(r => r.slice(0, nv(p)).findIndex(e => e !== 0)).filter(j => j >= 0);
  const tipoDe = p => (p.M.some(r => r.slice(0, nv(p)).every(e => e === 0) && r[nv(p)] !== 0) ? 'ninguna' : pivs(p).length === nv(p) ? 'única' : 'infinitas');
  const metasPL = p => [...Array.from({ length: nv(p) }, (_, j) => (pivs(p).includes(j) ? 'pivote' : 'libre')), tipoDe(p)];
  const XS5 = [52, 114, 176, 238, 298];
  XG.rotula('pivote-o-libre', {
    slots: p => [...Array.from({ length: nv(p) }, (_, j) => ({ x: XS5[j], y: 152, w: 60, h: 34 })), { x: 262, y: 206, w: 104, h: 34 }],
    fichas: p => [...metasPL(p), ...p.extra], metas: metasPL, alto: () => 230,
    texto(p) {
      const n = j => `x_${j + 1}`, l = Array.from({ length: nv(p) }, (_, j) => j).filter(j => !pivs(p).includes(j));
      return `pivotes en $${pivs(p).map(n).join(', ')}$; libres: $${l.map(n).join(', ')}$; ${{ 'única': 'solución única', infinitas: 'infinitas soluciones', ninguna: 'ninguna solución' }[tipoDe(p)]}`;
    },
    fondo(K, p, f) {
      const Y = 34, RH = 28;
      let h = '';
      p.M.forEach((r, i) => { const j = r.slice(0, nv(p)).findIndex(e => e !== 0); if (j >= 0) h += K.f(f, K.c(XS5[j], Y + RH * (i + 0.5), 13, 'fo')); });
      h += K.pl([[26, Y], [20, Y], [20, Y + 3 * RH], [26, Y + 3 * RH]]) + K.pl([[318, Y], [324, Y], [324, Y + 3 * RH], [318, Y + 3 * RH]]) + K.l(268, Y + 3, 268, Y + 3 * RH - 3, 'lm');
      p.M.forEach((r, i) => r.forEach((e, j) => { h += K.t(XS5[j], Y + RH * (i + 0.5) + 5, sg(e)); }));
      h += Array.from({ length: nv(p) }, (_, j) => K.t(XS5[j], Y - 8, `x${sub(j + 1)}`, 's tm')).join('');
      return h + K.t(200, 211, 'soluciones:', 's', 'end');
    },
    aviso(q, p) {
      const v = q.map(l => l[0]), m = metasPL(p), i = m.findIndex((x, k) => v[k] !== x), N = nv(p);
      if (i < N) {
        if (m[i] === 'pivote') return `La columna de x${sub(i + 1)} sí tiene pivote: ahí está el primer número distinto de cero de una fila.`;
        return p.M.some(r => r[i] !== 0) ? `El número de la columna x${sub(i + 1)} no es pivote: en su fila hay antes otro distinto de cero. Esa variable queda libre.` : `En la columna de x${sub(i + 1)} no empieza ninguna fila: esa variable queda libre.`;
      }
      if (m[i] === 'ninguna') return 'Hay una fila 0 … 0 | c con c ≠ 0: dice 0 = c, imposible. No hay solución, aunque haya columnas libres.';
      if (m[i] === 'infinitas') return v[i] === 'única' ? 'Hay columnas sin pivote: esas variables quedan libres y dan infinitas soluciones.' : 'Las filas de ceros dicen 0 = 0, que siempre se cumple: no hay nada imposible.';
      return 'Cada incógnita tiene su pivote y nada es imposible: la solución es una sola.';
    },
    bien: p => (tipoDe(p) === 'ninguna' ? 'La fila 0 … 0 | c con c ≠ 0 manda: sin solución. Las columnas igual se leen como pivote o libre.' : 'Cada columna con pivote se despeja; cada una sin pivote queda libre como parámetro.'),
  });

  // Red de tráfico con una calle libre: x₄ = t y las demás dependen de t. Menor t con todas ≥ 0.  v { t }  params { e: [A, B, C, D] }
  const flujos = (p, t) => { const a = t + p.e[0], b = a + p.e[1], c = b + p.e[2]; return [a, b, c, t]; };
  const tMin = p => Math.max(0, ...flujos(p, 0).map(x => -x));
  const ND = [[84, 44], [256, 44], [256, 150], [84, 150]];
  XG.figura('red-de-flujo', {
    ini: () => ({ t: 0 }),
    manijas: () => [{ k: 't', min: 0, max: 60, paso: 5, et: 'carros por hora en x₄ = t' }],
    ok: (v, p) => v.t === tMin(p),
    sol: p => ({ t: tMin(p) }),
    texto: p => { const x = flujos(p, tMin(p)); return `$t = ${tMin(p)}$: $x_1 = ${x[0]}$, $x_2 = ${x[1]}$, $x_3 = ${x[2]}$, $x_4 = ${x[3]}$`; },
    alto: () => 250, pie: 'Arrastra t por la regla de abajo.',
    dib(v, K, p, f) {
      const x = flujos(p, v.t), lab = [[170, 30], [270, 102], [170, 176], [70, 102]], an = ['middle', 'start', 'middle', 'end'];
      let h = '';
      [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b], k) => {
        const [x1, y1] = ND[a], [x2, y2] = ND[b], dx = Math.sign(x2 - x1) * 18, dy = Math.sign(y2 - y1) * 18, neg = f > 0.5 && x[k] < 0;
        h += K.ar(x1 + dx, y1 + dy, x2 - dx, y2 - dy, `${k === 3 ? 'la' : neg ? 'lf' : 'lg'} gr`);
        const t = k === 3 ? `x₄ = ${v.t}` : f > 0.5 ? `x${sub(k + 1)} = ${sg(x[k])}` : `x${sub(k + 1)} = ?`;
        h += K.t(lab[k][0], lab[k][1] + 4, t, `s ${k === 3 ? 'ta' : neg ? 'tf' : ''}`.trim(), an[k]);
      });
      // Entradas y salidas de afuera.
      const O = [[26, 14], [314, 14], [314, 186], [26, 186]];
      p.e.forEach((e, k) => {
        const N = ND[k], u = [N[0] - O[k][0], N[1] - O[k][1]], d = Math.hypot(...u), w = [u[0] / d * 18, u[1] / d * 18];
        h += e > 0 ? K.ar(...O[k], N[0] - w[0], N[1] - w[1], 'lm') : K.ar(N[0] - w[0], N[1] - w[1], ...O[k], 'lm');
        h += K.t(O[k][0] + (k === 0 || k === 3 ? 22 : -22), O[k][1] + (k < 2 ? 4 : 2), `${Math.abs(e)}`, 's tm', k === 0 || k === 3 ? 'start' : 'end');
      });
      ND.forEach(([a, b], k) => { h += K.c(a, b, 14, 'fn') + K.t(a, b + 5, 'ABCD'[k], 's'); });
      return h;
    },
    lee: (v, p) => { const x = flujos(p, v.t); return `$x_1 = ${x[0]}$, $x_2 = ${x[1]}$, $x_3 = ${x[2]}$, $x_4 = ${x[3]}$`; },
    aviso(v, p) {
      const x = flujos(p, v.t), k = x.findIndex(z => z < 0);
      if (k >= 0) return `Con t = ${v.t}, la calle x${sub(k + 1)} lleva ${sg(x[k])}: los carros irían en contra.`;
      return `Con t = ${v.t} todas van en su sentido, pero se puede con menos: busca el menor t.`;
    },
    bien: (v, p) => `Con t = ${tMin(p)} la calle más justa queda en 0 y ninguna va en contra.`,
  });

  // ------------------------------------------------------------------------------------------------ en movimiento
  // Se fija k y al soltar la bola cae en la caja del tipo de solución que da la última fila [0 0 a(k) | b(k)].
  //   tiros [{ q, a: [c2, c1, c0], b: [d1, d0], sa, sb, pide, r, c }]
  const ev = (t, k) => [t.a[0] * k * k + t.a[1] * k + t.a[2], t.b[0] * k + t.b[1]];
  const tipoK = (t, k) => { const [a, b] = ev(t, k); return a !== 0 ? 'única' : b === 0 ? 'infinitas' : 'ninguna'; };
  const CAJAS = ['única', 'ninguna', 'infinitas'], BX = [66, 170, 274];
  XG.tiros('cae-en-tipo', {
    perilla: () => ({ et: 'k', min: 0, max: 10, cara: v => v - 5, lee: v => `k = ${sg(v - 5)}` }),
    meta: t => t.r + 5, alto: 214, ms: 1500,
    dib(t, v, K, p, f) {
      const k = v == null ? null : v - 5, num = k != null && f > 0.2, [a, b] = k == null ? [0, 0] : ev(t, k);
      let h = K.t(170, 18, 'última fila de la escalonada', 's tm');
      h += K.pl([[82, 30], [76, 30], [76, 62], [82, 62]]) + K.pl([[258, 30], [264, 30], [264, 62], [258, 62]]) + K.l(214, 33, 214, 59, 'lm');
      h += K.t(104, 51, '0') + K.t(140, 51, '0') + K.t(182, 51, num ? sg(a) : t.sa, num ? 'ta' : '') + K.t(240, 51, num ? sg(b) : t.sb, num ? 'ta' : '');
      CAJAS.forEach((c, i) => {
        h += K.r(BX[i] - 44, 150, 88, 40, 'fn', 8) + K.t(BX[i], 206, c, 's');
        if (c === t.pide) h += caja(K, BX[i] - 46, 148, 92, 44, 'la');
      });
      if (k == null) return h + K.c(170, 96, 9, 'fk');
      const ty = tipoK(t, k), i = CAJAS.indexOf(ty), u = Math.min(1, f * 1.25), bx = 170 + (BX[i] - 170) * u, by = 96 + (168 - 96) * u * u;
      h += K.f(f * 2 - 0.4, K.t(170, 86, a !== 0 ? `${sg(a)}·x₃ = ${sg(b)}` : `0 = ${sg(b)}`, 's'));
      if (f >= 1) h += K.r(BX[i] - 44, 150, 88, 40, ty === t.pide ? 'fo' : 'ff', 8) + K.t(BX[i], 206, CAJAS[i], 's');
      return h + K.c(bx, by, 9, 'fA');
    },
    falla(t, v) {
      const k = v - 5, [a, b] = ev(t, k), ty = tipoK(t, k);
      const por = { 'única': 'hay pivote y la solución es única', ninguna: 'dice 0 = algo distinto de 0: sin solución', infinitas: 'dice 0 = 0 y una variable queda libre' }[ty];
      return t.e?.[k] || `Con k = ${sg(k)} la fila queda 0 0 ${sg(a)} | ${sg(b)}: ${por}.`;
    },
    cuenta: t => `$k = ${t.r}$: ${t.c}`, pie: 'Estira hasta tu k y suelta: la bola cae donde dice la última fila.',
  });
})();
;
//#archivo js/games/gva-escena-4.js
// Geometría Vectorial · juegos de la lección geo-4 «Matrices invertibles y matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Armazones de figura-kit.js: XG.figura (se arrastra), XG.rotula (fichas a su lugar) y XG.tiros (en movimiento). Se dibujan con XPK.
(() => {
  const N = x => String(x).replace('-', '−');
  const T = x => (x < 0 ? `(${N(x)})` : N(x));                       // número dentro de una cuenta en texto plano
  const TX = x => (x < 0 ? `(${x})` : String(x));                     // lo mismo, en TeX
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, k) => s + x * B[k][j], 0)));
  const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const adj2 = A => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
  const inv2 = A => { const d = det2(A); return adj2(A).map(f => f.map(x => x / d)); };
  const fila = f => `(${f.map(N).join(', ')})`;
  const avisa = metas => (q, p) => { const ms = metas(p), i = ms.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; };
  const suyas = p => p.metas;
  // Matriz con sus corchetes, centrada en (cx, cy); dx y dy: espacio por columna y por fila.
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? N(e) : e, cls); }));
    return s;
  }
  // Rejilla de enteros alrededor del origen O, con u píxeles por unidad.
  const rejilla = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };

  // --------------------------------------------------- deshaz-transformacion · B deshace a A cuando B·A devuelve el cuadrado
  // A deforma el cuadrado de lado 1. Se arrastran las columnas de B; al comprobar, B se aplica a la figura deformada.
  //   v { p, q, r, s }: B = [[p, r], [q, s]]   params { A (det ±1), ok }
  const DO = [170, 130], DU = 24, DP = (x, y) => [DO[0] + x * DU, DO[1] - y * DU];
  const DB = v => [[v.p, v.r], [v.q, v.s]];
  const DE = (x, y) => [(x - DO[0]) / DU, (DO[1] - y) / DU];
  XG.figura('deshaz-transformacion', {
    ini: () => ({ p: 1, q: 0, r: 0, s: 1 }),
    manijas: () => [
      { k: ['p', 'q'], min: -3, max: 3, paso: 1, rot: () => 'b₁', en: v => DP(v.p, v.q), de: DE },
      { k: ['r', 's'], min: -3, max: 3, paso: 1, rot: () => 'b₂', en: v => DP(v.r, v.s), de: DE },
    ],
    ok: (v, p) => mul(DB(v), p.A).every((f, i) => f.every((x, j) => x === (i === j ? 1 : 0))),
    sol: p => { const I = inv2(p.A); return { p: I[0][0], q: I[1][0], r: I[0][1], s: I[1][1] }; },
    texto: p => `$A^{-1} = ${pm(inv2(p.A))}$`, alto: () => 260, pie: 'Arrastra las puntas b₁ y b₂: son las columnas de B.',
    dib(v, K, p, f) {
      const B = DB(v), A = p.A, BA = mul(B, A), es = BA.every((r, i) => r.every((x, j) => x === (i === j ? 1 : 0)));
      const esq = [[0, 0], [1, 0], [1, 1], [0, 1]], im = (M, [x, y]) => [M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y];
      const fig = esq.map(c => { const a = im(A, c), b = im(BA, c), t = Math.min(1, f); return DP(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t); });
      return rejilla(K, DO, DU, -3, 3, -3, 3) + K.pl([...esq, [0, 0]].map(c => DP(...c)), 'lm d')
        + K.p(fig, f >= 1 ? (es ? 'fo' : 'ff') : 'fa')
        + K.ar(...DO, ...DP(v.p, v.q), 'la gr') + K.ar(...DO, ...DP(v.r, v.s), 'lg gr')
        + K.t(16, 30, 'B =', 's', 'start') + mat(K, 70, 26, B, 's') + K.t(236, 30, 'A =', 's', 'start') + mat(K, 290, 26, A, 's')
        + K.t(170, 252, f > 0 ? 'la figura de A, después de aplicarle B' : 'la figura que dejó A', 's tm');
    },
    lee: (v, p) => `$BA = ${pm(mul(DB(v), p.A))}$`,
    aviso(v, p) {
      const B = DB(v), BA = mul(B, p.A), a = adj2(p.A);
      if (B.every((f, i) => f.every((x, j) => x === p.A[i][j]))) return 'Volviste a aplicar A: la figura se deforma más, no vuelve al cuadrado.';
      if (B.every((f, i) => f.every((x, j) => x === Math.abs(a[i][j]) * Math.sign(det2(p.A))))) return 'Intercambiaste a y d, pero faltó cambiarles el signo a b y a c.';
      const k = BA.findIndex((f, i) => f.some((x, j) => x !== (i === j ? 1 : 0)));
      const c = [BA[0][0], BA[1][0]], d = [BA[0][1], BA[1][1]];
      return BA[0][0] !== 1 || BA[1][0] !== 0 ? `B·A manda el lado de abajo a ${fila(c)}; para volver al cuadrado debe quedar en (1, 0).` : k >= 0 ? `B·A manda el lado de la izquierda a ${fila(d)}; debe quedar en (0, 1).` : 'Revisa las dos columnas de B.';
    },
    bien: p => p.ok || 'B·A = I: la figura volvió a ser el cuadrado. B es la inversa de A.',
  });

  // --------------------------------------------------- aplasta-paralelogramo · ad − bc = 0: las columnas quedan paralelas
  // A = [[a, b], [c, d]] con c en un deslizador. Se ven las columnas; al comprobar, el paralelogramo y su número ad − bc.
  //   v { c }   params { a, b, d, min, max, ini, ok }
  const AO = [112, 150], AU = 18, AP = (x, y) => [AO[0] + x * AU, AO[1] - y * AU];
  XG.figura('aplasta-paralelogramo', {
    ini: p => ({ c: p.ini }),
    manijas: p => [{ k: 'c', min: p.min, max: p.max, paso: 1, et: 'c: abajo a la izquierda de A' }],
    ok: (v, p) => p.a * p.d - p.b * v.c === 0, sol: p => ({ c: p.a * p.d / p.b }),
    texto: p => `$c = ${p.a * p.d / p.b}$: $ad - bc = ${p.a} \\cdot ${p.d} - ${p.b} \\cdot ${p.a * p.d / p.b} = 0$`, alto: () => 290, pie: 'Desliza c.',
    dib(v, K, p, f) {
      const c1 = [p.a, v.c], c2 = [p.b, p.d], dt = p.a * p.d - p.b * v.c, P4 = [[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(q => AP(...q));
      let h = rejilla(K, AO, AU, -1, 8, -4, 6) + K.f(f, K.p(P4, dt === 0 ? 'ff' : 'fa'));
      if (f > 0 && dt === 0) h += K.f(f, K.l(...AP(-c1[0] * 0.4, -c1[1] * 0.4), ...P4[2], 'lf gr'));
      h += K.ar(...AO, ...AP(...c1), 'la gr') + K.ar(...AO, ...AP(...c2), 'lg gr') + K.t(...AP(c1[0] + 0.3, c1[1] + 0.5), 'col. 1', 's ta', 'start') + K.t(...AP(c2[0] + 0.3, c2[1] - 0.9), 'col. 2', 's tg', 'start');
      h += K.t(262, 30, 'A =', 's', 'end') + mat(K, 298, 26, [[p.a, p.b], [v.c, p.d]], 's');
      return h + K.f(f, K.t(328, 76, `ad − bc = ${dt}`.replace('-', '−'), 's ta', 'end') + K.t(328, 96, dt === 0 ? 'se aplasta: sin inversa' : 'área ≠ 0: hay inversa', 's tm', 'end'));
    },
    lee: (v, p) => `$ad - bc = ${p.a} \\cdot ${p.d} - ${p.b} \\cdot ${TX(v.c)} = ${p.a * p.d - p.b * v.c}$`,
    aviso(v, p) {
      const dt = p.a * p.d - p.b * v.c;
      if (p.a * p.d + p.b * v.c === 0) return `Con c = ${N(v.c)} se anula ad + bc, pero el número que decide es ad − bc = ${N(dt)}: todavía hay inversa.`;
      return `Con c = ${N(v.c)}: ad − bc = ${p.a}·${p.d} − ${p.b}·${T(v.c)} = ${N(dt)}, no es 0. Las columnas no son paralelas y A sí tiene inversa.`;
    },
    bien: p => p.ok || 'ad − bc = 0: las dos columnas quedaron en la misma recta y el plano se aplasta. A no tiene inversa.',
  });

  // ---------------------------------------------------------- formula-inversa · intercambiar, cambiar signos y dividir
  // Se arma A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]] con fichas.   params { A, extra, mira[5], trampas?, ok }
  const FS = [{ x: 122, y: 122, w: 56, h: 38 }, { x: 204, y: 98, w: 52, h: 38 }, { x: 266, y: 98, w: 52, h: 38 }, { x: 204, y: 146, w: 52, h: 38 }, { x: 266, y: 146, w: 52, h: 38 }];
  const FM = p => { const d = det2(p.A), a = adj2(p.A); return [d === 1 ? '1' : d === -1 ? '−1' : `${d < 0 ? '−' : ''}1/${Math.abs(d)}`, ...a.flat().map(N)]; };
  XG.rotula('formula-inversa', {
    slots: () => FS, metas: FM, fichas: p => [...FM(p), ...p.extra], alto: () => 214,
    texto: p => `$A^{-1} = \\tfrac{1}{${det2(p.A)}} ${pm(adj2(p.A))}$`,
    fondo: (K, p, f) => K.t(150, 40, 'A =', '', 'end') + mat(K, 194, 36, p.A) + K.t(84, 127, 'A⁻¹ =', '', 'end') + K.t(161, 127, '·', 'b')
      + K.pl([[176, 74], [170, 74], [170, 170], [176, 170]]) + K.pl([[294, 74], [300, 74], [300, 170], [294, 170]])
      + K.f(f, K.t(170, 204, 'A · A⁻¹ = I: comprueba multiplicando', 's ta')),
    aviso: avisa(FM), bien: p => p.ok,
  });

  // ------------------------------------------------------------- combos-inversa · A x = b se resuelve con x = A⁻¹ b
  // Plano de cantidades (x, y); se arrastra el punto. Al comprobar, la escena multiplica A por el punto y lo compara con b.
  //   v { x, y }   params { A, b, et: [nombre de x, nombre de y], u: [unidad de la fila 1, de la fila 2], ok }
  const CO = [40, 222], CU = 24, CP = (x, y) => [CO[0] + x * CU, CO[1] - y * CU];
  const CS = p => { const I = inv2(p.A); return { x: I[0][0] * p.b[0] + I[0][1] * p.b[1], y: I[1][0] * p.b[0] + I[1][1] * p.b[1] }; };
  const CA = (v, p) => [p.A[0][0] * v.x + p.A[0][1] * v.y, p.A[1][0] * v.x + p.A[1][1] * v.y];
  XG.figura('combos-inversa', {
    ini: () => ({ x: 0, y: 0 }),
    manijas: () => [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => CP(v.x, v.y), de: (x, y) => [(x - CO[0]) / CU, (CO[1] - y) / CU] }],
    ok: (v, p) => { const r = CA(v, p); return r[0] === p.b[0] && r[1] === p.b[1]; },
    sol: CS,
    texto: p => { const I = inv2(p.A), s = CS(p); return `$\\vec x = A^{-1}\\vec b = ${pm(I)} ${pm(p.b.map(x => [x]))} = ${pm([[s.x], [s.y]])}$`; },
    alto: () => 250, pie: 'Arrastra el punto hasta las cantidades.',
    dib(v, K, p, f) {
      const r = CA(v, p), es = r[0] === p.b[0] && r[1] === p.b[1];
      let h = rejilla(K, CO, CU, 0, 6, 0, 6) + K.t(CO[0] + 6 * CU + 8, CO[1] + 4, p.et[0], 's tm', 'start') + K.t(CO[0] - 8, CO[1] - 6 * CU - 10, p.et[1], 's tm', 'start');
      for (let i = 1; i <= 6; i++) h += K.t(CO[0] + i * CU, CO[1] + 16, String(i), 's tm') + K.t(CO[0] - 10, CO[1] - i * CU + 4, String(i), 's tm');
      h += K.l(...CP(v.x, 0), ...CP(v.x, v.y), 'la d') + K.l(...CP(0, v.y), ...CP(v.x, v.y), 'la d');
      h += K.t(262, 48, 'A⁻¹ =', 's', 'end') + mat(K, 298, 44, inv2(p.A), 's') + K.t(262, 104, 'b =', 's', 'end') + mat(K, 285, 100, p.b.map(x => [x]), 's');
      h += K.f(f, K.t(205, 160, 'A · (x, y) =', 's tm', 'start') + K.t(205, 182, `${r[0]} ${p.u[0]}`, `s ${es ? 'to' : 'tf'}`, 'start') + K.t(205, 202, `${r[1]} ${p.u[1]}`, `s ${es ? 'to' : 'tf'}`, 'start'));
      return h;
    },
    lee: (v, p) => { const r = CA(v, p); return `$A ${pm([[v.x], [v.y]])} = ${pm(r.map(x => [x]))}$`; },
    aviso(v, p) {
      const r = CA(v, p), s = CS(p);
      if (v.x === s.y && v.y === s.x) return 'Tienes los números al revés: la primera fila de A⁻¹·b es la cantidad del eje horizontal.';
      return `Con ${v.x} y ${v.y} salen ${r[0]} ${p.u[0]} y ${r[1]} ${p.u[1]}, no ${p.b[0]} y ${p.b[1]}. Multiplica A⁻¹ por b: fila por columna.`;
    },
    bien: p => p.ok || 'A·x = b: las cantidades dan justo lo pedido.',
  });

  // ----------------------------------------------------------- filas-elemental · la identidad con una operación de fila
  // Se arma E fila por fila; al comprobar aparece E·A, que hace la operación sobre A.   params { op, E, A, extra, mira[3], trampas?, ok }
  const ES = [0, 1, 2].map(i => ({ x: 96, y: 68 + i * 44, w: 112, h: 36 }));
  XG.rotula('filas-elemental', {
    slots: () => ES, metas: p => p.E.map(fila), fichas: p => [...p.E.map(fila), ...p.extra], alto: () => 214,
    texto: p => `$E = ${pm(p.E)}$`,
    fondo: (K, p, f) => K.t(170, 22, `En I se hace ${p.op}`, 's ta') + K.t(26, 117, 'E =', '', 'end')
      + K.pl([[38, 46], [32, 46], [32, 178], [38, 178]]) + K.pl([[154, 46], [160, 46], [160, 178], [154, 178]])
      + K.t(196, 68, 'A =', 's', 'start') + mat(K, 284, 64, p.A, 's', 24, 18)
      + K.f(f, K.t(196, 150, 'E·A =', 's ta', 'start') + mat(K, 284, 146, mul(p.E, p.A), 's ta', 24, 18) + K.t(250, 204, `A con ${p.op}`, 's tm')),
    aviso: avisa(p => p.E.map(fila)), bien: p => p.ok,
  });

  // ----------------------------------------------------------------- deshaz-fila · la inversa de cada matriz elemental
  // A la derecha de cada E se pone la operación que la deshace.   params { E: [tres 2×2], metas, extra, mira[3], trampas?, ok }
  const HS = [0, 1, 2].map(i => ({ x: 236, y: 42 + i * 60, w: 172, h: 38 }));
  XG.rotula('deshaz-fila', {
    slots: () => HS, metas: p => p.metas, fichas: p => [...p.metas, ...p.extra], alto: () => 212,
    texto: p => p.metas.join('; '),
    fondo: (K, p, f) => p.E.map((E, i) => K.t(22, 47 + i * 60, `E${'₁₂₃'[i]}`, 's tm', 'start') + mat(K, 82, 42 + i * 60, E, 's') + K.ar(114, 42 + i * 60, 144, 42 + i * 60, 'lm')).join('')
      + K.f(f, K.t(170, 204, 'deshacer cada una da E⁻¹·E = I', 's ta')),
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------------- quita-capas · se deshace en el orden contrario
  // El mensaje m pasa por capas (la primera, adentro). Se ponen las inversas que lo recuperan: m = [ ] [ ] c.
  //   params { capas: [primera, segunda], metas, extra, mira[2], trampas?, ok }
  const QS = [{ x: 150, y: 168, w: 74, h: 38 }, { x: 234, y: 168, w: 74, h: 38 }];
  XG.rotula('quita-capas', {
    slots: () => QS, metas: p => p.metas, fichas: p => [...p.metas, ...p.extra], alto: () => 200,
    texto: p => `m = ${p.metas.join(' ')} c`,
    fondo(K, p, f) {
      const g = Math.max(0, 1 - f * 2), h1 = Math.max(0, 1 - Math.max(0, f * 2 - 1));
      return K.f(g, K.r(70, 14, 200, 92, 'fg', 12) + K.t(84, 32, p.capas[1], 's', 'start') + K.t(256, 32, 'se puso de última', 's tm', 'end'))
        + K.f(h1, K.r(110, 42, 120, 52, 'fa', 10) + K.t(122, 60, p.capas[0], 's', 'start') + K.t(222, 60, 'primera', 's tm', 'end'))
        + K.t(170, 82, 'm', 'b') + K.t(170, 128, `c = ${p.capas[1]} · ${p.capas[0]} · m`, 's')
        + K.t(104, 173, 'm =', '', 'end') + K.t(282, 173, 'c', '', 'start');
    },
    aviso: avisa(suyas), bien: p => p.ok,
  });

  // ------------------------------------------------------------ descifra-pares · en movimiento: m = A⁻¹ c, letra por letra
  // Cada tiro: un par cifrado c = A·m; se fija la letra pedida y al soltar la ficha vuela al alfabeto.
  //   params { A, tiros: [{ q, c: [c₁, c₂], i: 0 | 1, r, k (cuenta TeX), e? }] }
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', LX = n => 26 + ((n - 1) % 13) * 24, LY = n => (n <= 13 ? 118 : 156);
  XG.tiros('descifra-pares', {
    perilla: () => ({ et: 'Letra', min: 0, max: 26, cara: v => (v ? ABC[v - 1] : ''), lee: v => (v ? `${ABC[v - 1]} = ${v}` : "sin letra") }), meta: t => t.r, alto: 182, ms: 1500,
    dib(t, v, K, p, f) {
      let h = K.t(14, 34, 'A =', 's', 'start') + mat(K, 70, 30, p.A, 's') + K.t(132, 34, 'c =', 's', 'start') + mat(K, 172, 30, t.c.map(x => [x]), 's')
        + K.r(220, 12, 104, 38, 'fc', 10) + K.t(272, 36, `letra ${t.i + 1} del par`, 's ta');
      for (let n = 1; n <= 26; n++) h += K.t(LX(n), LY(n), ABC[n - 1], 's tm') + K.t(LX(n), LY(n) + 14, String(n), 's tm');
      if (v != null && v > 0) {
        const s = Math.min(1, f * 1.2), x = 272 + (LX(v) - 272) * s, y = 50 + (LY(v) - 56 - 50) * s - 46 * Math.sin(Math.PI * s), bien = v === t.r;
        h += (f >= 1 ? K.c(LX(v), LY(v) - 4, 13, bien ? 'fo' : 'ff') + K.t(LX(v), LY(v), ABC[v - 1], 's') : K.c(x, y, 11, 'fa') + K.t(x, y + 4, ABC[v - 1], 's'));
      }
      return h;
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Esa letra se pasa: revisa la fila de A⁻¹ que multiplicaste por c.' : 'Esa letra se queda corta: revisa la fila de A⁻¹ que multiplicaste por c.'),
    cuenta: t => `$${t.k}$`, pie: 'Estira hasta la letra y suelta.',
  });
})();
;
//#archivo js/explora-gva-1.js
// Geometría Vectorial · explicación de geo-1 «Sistemas 2×2 y 3×3 y su geometría» (spec 2026-11-27-curso-geometria-vectorial).
// Intuición primero: cada ecuación es una recta (o un plano) y resolver es hallar lo común. Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  // Plano cartesiano con su rejilla: B = { x0, x1, y0, y1 }, origen en (ox, oy), u píxeles por unidad.
  const pl = (B, ox, oy, u) => ({ ...B, X: x => ox + x * u, Y: y => oy - y * u });
  const rej = (K, P) => {
    let h = '';
    for (let x = P.x0; x <= P.x1; x++) h += K.l(P.X(x), P.Y(P.y0), P.X(x), P.Y(P.y1), x === 0 ? 'lm' : 'ls');
    for (let y = P.y0; y <= P.y1; y++) h += K.l(P.X(P.x0), P.Y(y), P.X(P.x1), P.Y(y), y === 0 ? 'lm' : 'ls');
    const yx = P.y0 < 0 ? P.Y(0) + 13 : P.Y(P.y0) + 13, xy = P.x0 < 0 ? P.X(0) - 5 : P.X(P.x0) - 5;
    for (let x = P.x0; x <= P.x1; x++) if (x && x % 2 === 0) h += K.t(P.X(x), yx, sg(x), 's tm');
    for (let y = P.y0; y <= P.y1; y++) if (y && y % 2 === 0) h += K.t(xy, P.Y(y) + 4, sg(y), 's tm', 'end');
    return h;
  };
  // Recta ax + by = c recortada al cuadro del plano.
  const rec = (K, P, a, b, c, cls) => {
    const q = [], m = (x, y) => { if (x >= P.x0 - 1e-9 && x <= P.x1 + 1e-9 && y >= P.y0 - 1e-9 && y <= P.y1 + 1e-9) q.push([x, y]); };
    if (Math.abs(b) > 1e-9) { m(P.x0, (c - a * P.x0) / b); m(P.x1, (c - a * P.x1) / b); }
    if (Math.abs(a) > 1e-9) { m((c - b * P.y0) / a, P.y0); m((c - b * P.y1) / a, P.y1); }
    let s = null, d = 0;
    q.forEach(u => q.forEach(w => { const e = Math.hypot(u[0] - w[0], u[1] - w[1]); if (e > d + 1e-9) { d = e; s = [u, w]; } }));
    return s ? K.l(P.X(s[0][0]), P.Y(s[0][1]), P.X(s[1][0]), P.Y(s[1][1]), cls) : '';
  };

  // 1 · una ecuación, una recta
  const P1 = pl({ x0: 0, x1: 9, y0: 0, y1: 6 }, 30, 190, 26);
  const PTS = [[8, 0], [4, 2], [0, 4], [2, 3], [6, 1]];
  const una = (v, K) => rej(K, P1) + PTS.map(([x, y], k) => (k < v.n ? K.c(P1.X(x), P1.Y(y), 5, 'fA') : '')).join('')
    + K.f(v.r1, rec(K, P1, 1, 2, 8, 'la gr') + K.t(332, 16, 'x + 2y = 8', 's ta', 'end'))
    + K.f(v.r2, rec(K, P1, 1, -1, 2, 'lg gr') + K.t(332, 34, 'x − y = 2', 's tg', 'end'))
    + K.f(v.z, K.c(P1.X(4), P1.Y(2), 9, 'fo') + K.t(P1.X(4) + 12, P1.Y(2) + 20, '(4, 2)', 's to', 'start'));

  // 2 · tres casos: x + y = 4 contra otra recta
  const P2 = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 124, 22);
  const OTRA = { uno: [1, -1, 0, 'x − y = 0', 'se cortan: una solución'], par: [2, 2, -2, '2x + 2y = −2', 'paralelas: ninguna solución'], misma: [2, 2, 8, '2x + 2y = 8', 'la misma recta: infinitas'] };
  const casos = (v, K) => { const o = OTRA[v.caso]; return rej(K, P2) + rec(K, P2, 1, 1, 4, 'la gr') + rec(K, P2, o[0], o[1], o[2], v.caso === 'misma' ? 'lf gr d' : 'lf gr')
    + K.t(8, 16, 'x + y = 4', 's ta', 'start') + K.t(332, 16, o[3], 's tf', 'end') + K.t(170, 228, o[4], 's tm') + (v.caso === 'uno' ? K.c(P2.X(2), P2.Y(2), 6, 'fo') : ''); };
  const P2b = pl({ x0: -6, x1: 6, y0: -4, y1: 4 }, 170, 120, 22);

  // 3 · eliminar: E₂ + k·E₁ gira alrededor del cruce
  const elim = (v, K) => { const r = [2 + v.k, -1 + v.k, 1 + 5 * v.k]; return rej(K, P2) + rec(K, P2, 1, 1, 5, 'lg') + rec(K, P2, 2, -1, 1, 'la')
    + K.t(8, 16, 'E₁: x + y = 5', 's tg', 'start') + K.t(332, 16, 'E₂: 2x − y = 1', 's ta', 'end')
    + K.f(v.r, rec(K, P2, ...r, 'lf gr') + K.t(170, 228, v.k > 0.99 ? 'E₂ + E₁:  3x = 6' : 'E₂ + k·E₁', 's tf'))
    + K.c(P2.X(2), P2.Y(3), 5, 'fk') + K.f(v.y, K.t(P2.X(2) + 10, P2.Y(3) - 8, '(2, 3)', 's to', 'start')); };
  const elim2 = (v, K) => { const r = [1 + 2 * v.k, 3 + v.k, 5 + 5 * v.k]; return rej(K, P2b) + rec(K, P2b, 2, 1, 5, 'lg') + rec(K, P2b, 1, 3, 5, 'la')
    + (r[0] || r[1] ? rec(K, P2b, ...r, 'lf gr') : '') + K.c(P2b.X(2), P2b.Y(1), 5, 'fk')
    + K.t(8, 14, 'E₁: 2x + y = 5', 's tg', 'start') + K.t(332, 14, 'E₂: x + 3y = 5', 's ta', 'end'); };

  // 4 · tres incógnitas: un sistema escalonado y las posiciones de tres planos
  const FILAS = [['x + 2y − z = 2', 'x = 1'], ['y + z = 5', 'y = 2'], ['2z = 6', 'z = 3']];
  const esquina = (K, c) => { const [x, y] = c, q = (a, b) => [x + a, y + b]; return K.p([c, q(0, -32), q(-28, -20), q(-28, 12)], 'fa') + K.p([c, q(0, -32), q(28, -20), q(28, 12)], 'fg') + K.p([c, q(-28, 12), q(0, 24), q(28, 12)], 'ff') + K.c(x, y, 4, 'fk'); };
  const libro = (K, [x, y]) => [[-30, 8], [30, 8], [-6, 18]].map(([dx, dy], i) => K.p([[x, y - 28], [x, y + 18], [x + dx, y + 18 + dy], [x + dx, y - 28 + dy]], ['fa', 'fg', 'ff'][i])).join('') + K.l(x, y - 28, x, y + 18, 'lf gr');
  const tunel = (K, [x, y]) => { const F = [[x - 30, y + 18], [x + 22, y + 18], [x - 4, y - 24]], B = F.map(([a, b]) => [a + 12, b - 10]); return K.p(B, 'fn') + F.map((u, i) => K.p([u, F[(i + 1) % 3], B[(i + 1) % 3], B[i]], ['fa', 'fg', 'ff'][i])).join(''); };
  const tres = (v, K) => FILAS.map(([e, s], i) => K.t(30, 34 + i * 30, e, '', 'start') + K.f(v.n - (2 - i), K.t(250, 34 + i * 30, s, 'to', 'start'))).join('')
    + K.f(v.f, esquina(K, [62, 168]) + libro(K, [170, 168]) + tunel(K, [278, 168]) + K.t(62, 222, 'un punto', 's') + K.t(170, 222, 'una recta', 's') + K.t(278, 222, 'ninguno', 's'));

  // Problema: dos recibos, dos rectas, un punto
  const P5 = pl({ x0: 0, x1: 6, y0: 0, y1: 6 }, 40, 180, 24);
  const pan = (v, K) => { const a = 3 * v.p + 2 * v.j, b = v.p + 2 * v.j;
    return rej(K, P5) + rec(K, P5, 3, 2, 12, 'la') + rec(K, P5, 1, 2, 8, 'lg') + K.c(P5.X(v.p), P5.Y(v.j), 7, 'fA') + K.t(P5.X(6) + 4, P5.Y(0) - 5, 'pan', 's tm', 'start') + K.t(P5.X(0) + 6, P5.Y(6) + 4, 'jugo', 's tm', 'start')
      + K.t(332, 70, `3·${v.p} + 2·${v.j} = ${a}`, a === 12 ? 'to' : 'tf', 'end') + K.t(332, 90, 'debe dar 12', 's tm', 'end')
      + K.t(332, 126, `${v.p} + 2·${v.j} = ${b}`, b === 8 ? 'to' : 'tf', 'end') + K.t(332, 146, 'debe dar 8', 's tm', 'end'); };

  xpLec('geo-1', [
    ['Una ecuación, una recta',
      xpMira('dibujo', 'Una ecuación con dos incógnitas tiene **muchas** soluciones, y juntas dibujan algo.', { dib: una, v: { n: 0, r1: 0, r2: 0, z: 0 }, alto: 220 }, [
        ['La ecuación x + 2y = 8 la cumplen muchos pares. Por ejemplo (8, 0): ocho más cero da ocho.', { n: 1 }, '$8 + 2 \\cdot 0 = 8$'],
        ['También (4, 2), (0, 4), (2, 3) y (6, 1). Mira dónde caen en el plano.', { n: 5 }, '$4 + 2 \\cdot 2 = 8$'],
        ['Todos quedan en fila: las soluciones de una ecuación lineal forman una recta.', { r1: 1 }],
        ['Otra condición, x − y = 2, es otra recta del mismo plano.', { r2: 1 }, '$x - y = 2$'],
        ['Resolver el sistema es buscar el punto que está en las dos rectas: el cruce.', { z: 1 }, '$4 + 2 \\cdot 2 = 8 \\quad 4 - 2 = 2$'],
        ['Ese punto cumple las dos ecuaciones a la vez. Por eso es la solución del sistema.', {}],
      ], 'Una ecuación $ax + by = c$ es una recta; la solución de un sistema es el punto común de sus rectas.'),
      xpHaz('dibujo', 'Arrastra el punto hasta un lugar que cumpla $2x + y = 6$.', { dib: (v, K) => rej(K, P1) + K.t(332, 16, `2·${v.x} + ${v.y} = ${2 * v.x + v.y}`, 2 * v.x + v.y === 6 ? 'to' : 'ta', 'end'), v: { x: 5, y: 5 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: [0, 0], max: [9, 6], paso: 1, en: v => [P1.X(v.x), P1.Y(v.y)], de: (x, y) => [(x - 30) / 26, (190 - y) / 26] }],
        cumple: v => 2 * v.x + v.y === 6, sol: { x: 2, y: 2 }, lee: v => `$2 \\cdot ${v.x} + ${v.y} = ${2 * v.x + v.y}$`,
        dice: v => (2 * v.x + v.y === 6 ? 'Cumple. Y no es el único: todos los puntos de esa recta cumplen.' : `Da ${2 * v.x + v.y}; tiene que dar 6.`) },
        'Cumplen $(0, 6)$, $(1, 4)$, $(2, 2)$ y $(3, 0)$: todos en la misma recta.')],
    ['Tres casos',
      xpMira('dibujo', 'Dos rectas del plano solo pueden hacer **tres** cosas.', { dib: casos, v: { caso: 'uno' }, alto: 236 }, [
        ['Pueden cortarse en un solo punto: el sistema tiene una solución.', { caso: 'uno' }, '$x + y = 4,\\; x - y = 0 \\;\\Rightarrow\\; (2, 2)$'],
        ['O tener la misma inclinación y no tocarse nunca: paralelas, ninguna solución.', { caso: 'par' }],
        ['O ser la misma recta escrita de otra forma: infinitas soluciones.', { caso: 'misma' }, '$2x + 2y = 8$ es $x + y = 4$'],
        ['¿Cómo saberlo sin dibujar? Divide coeficiente entre coeficiente.', { caso: 'par' }, '$\\tfrac{1}{2} = \\tfrac{1}{2} \\neq \\tfrac{4}{-2}$'],
        ['Si x e y no van en la misma proporción, se cruzan. Si van, decide el término de la derecha.', { caso: 'uno' }, '$\\tfrac{1}{1} \\neq \\tfrac{1}{-1}$'],
      ], 'Coeficientes no proporcionales: un punto. Proporcionales: paralelas, o la misma recta si también lo es el término.'),
      xpHaz('dibujo', 'La recta fija es $x - 2y = 2$. Elige $c$ para que $3x - 6y = c$ dé **infinitas** soluciones.', { dib: (v, K) => rej(K, P2b) + rec(K, P2b, 1, -2, 2, 'la gr') + rec(K, P2b, 3, -6, v.c, 'lf gr d')
        + K.t(8, 14, 'x − 2y = 2', 's ta', 'start') + K.t(332, 14, `3x − 6y = ${sg(v.c)}`, 's tf', 'end'), v: { c: 0 }, metas: { c: 6 }, alto: 262,
        manijas: [{ k: 'c', min: -6, max: 12, paso: 1, et: 'c, el término de la derecha' }],
        lee: v => `$3x - 6y = ${v.c}$ entre 3: $x - 2y = \\tfrac{${v.c}}{3}$`,
        dice: v => (v.c === 6 ? 'Las dos son la misma recta: infinitas soluciones.' : 'Paralelas y distintas: no hay solución.') },
        '$3x - 6y = 6$ es $x - 2y = 2$ multiplicada por 3: la misma recta.')],
    ['Eliminar una incógnita',
      xpMira('dibujo', 'Truco para no adivinar el cruce: **sumar** ecuaciones.', { dib: elim, v: { k: 0, r: 0, y: 0 }, alto: 236 }, [
        ['Dos ecuaciones, x + y = 5 y 2x − y = 1, se cruzan en un punto que aún no conocemos.', {}],
        ['Si un punto cumple las dos, también cumple su suma. Sumar da otra recta.', { r: 1 }],
        ['Al ir sumando, la recta nueva gira, pero siempre pasa por el mismo cruce.', { k: 1 }, '$(2x - y) + (x + y) = 1 + 5$'],
        ['La suma es 3x = 6: la y desapareció y la recta quedó vertical, en x = 2.', {}, '$3x = 6 \\;\\Rightarrow\\; x = 2$'],
        ['Con x = 2 en la primera, 2 + y = 5, así que y = 3. El cruce es (2, 3).', { y: 1 }, '$2 + y = 5 \\;\\Rightarrow\\; y = 3$'],
      ], 'Sumar a una ecuación un múltiplo de otra da una recta por el mismo punto; con el múltiplo justo se va una incógnita.'),
      xpHaz('dibujo', 'Con $2x + y = 5$ ($E_1$) y $x + 3y = 5$ ($E_2$), elige cuántas veces sumar $E_1$ a $E_2$ para que **desaparezca la y**.', { dib: elim2, v: { k: 1 }, metas: { k: -3 }, alto: 262,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k: veces que se suma E₁' }],
        lee: v => `$E_2 + (${v.k})E_1$: $${1 + 2 * v.k}x + ${3 + v.k}y = ${5 + 5 * v.k}$`,
        dice: v => (3 + v.k === 0 ? `Queda ${sg(1 + 2 * v.k)}x = ${sg(5 + 5 * v.k)}: la y desapareció.` : 'La y sigue ahí: su coeficiente todavía no es cero.') },
        '$k = -3$: $-5x = -10$, $x = 2$; y con $2 \\cdot 2 + y = 5$, $y = 1$.')],
    ['Tres incógnitas',
      xpMira('dibujo', 'Con x, y, z la idea es la misma, pero en el espacio.', { dib: tres, v: { n: 0, f: 0 }, alto: 236 }, [
        ['Con tres incógnitas, una ecuación como x + 2y − z = 2 ya no es una recta: es un plano.', {}],
        ['Este sistema es escalonado: cada renglón tiene una incógnita menos que el de arriba.', {}],
        ['Se empieza por abajo: 2z = 6, así que z = 3.', { n: 1 }, '$z = 3$'],
        ['Subiendo: el segundo da y = 2, y el primero, x = 1.', { n: 3 }, '$x = 2 - 4 + 3 = 1$'],
        ['La solución (1, 2, 3) es el único punto que está en los tres planos.', {}],
        ['Tres planos pueden cruzarse en un punto, compartir una recta, ser el mismo plano o no tener nada en común.', { f: 1 }],
      ], 'Una ecuación en x, y, z es un plano; un sistema escalonado se resuelve de abajo hacia arriba.'),
      xpHaz('fichas', 'Sistema escalonado: resuelve de abajo hacia arriba y arrastra cada valor junto a su incógnita.', {
        slots: [{ x: 268, y: 126, w: 70, h: 40 }, { x: 268, y: 78, w: 70, h: 40 }, { x: 268, y: 30, w: 70, h: 40 }],
        fichas: ['3', '2', '1', '5', '−1'], meta: ['3', '2', '1'], alto: 152,
        fondo: K => [['x − y + z = 2', 'x ='], ['2y + z = 7', 'y ='], ['z = 3', 'z =']].map(([e, s], i) => K.t(14, 35 + i * 48, e, '', 'start') + K.t(226, 35 + i * 48, s, 'ta', 'end')).join('') },
        '$z = 3$; $2y + 3 = 7$ da $y = 2$; $x - 2 + 3 = 2$ da $x = 1$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En una panadería, 3 panes y 2 jugos cuestan 12 mil, y 1 pan y 2 jugos, 8 mil. Ajusta los dos **precios** (en miles).', { dib: pan, v: { p: 5, j: 1 }, metas: { p: 2, j: 3 }, alto: 290,
        manijas: [{ k: 'p', min: 0, max: 6, paso: 1, et: 'pan' }, { k: 'j', min: 0, max: 6, paso: 1, et: 'jugo' }],
        lee: v => `$3 \\cdot ${v.p} + 2 \\cdot ${v.j} = ${3 * v.p + 2 * v.j}$ y $${v.p} + 2 \\cdot ${v.j} = ${v.p + 2 * v.j}$`,
        dice: v => { const a = 3 * v.p + 2 * v.j === 12, b = v.p + 2 * v.j === 8; return a && b ? 'Los dos recibos cuadran: es el punto común de las dos rectas.' : a ? 'El primer recibo cuadra; el segundo no.' : b ? 'El segundo recibo cuadra; el primero no.' : 'Ninguno de los dos recibos cuadra todavía.'; } },
        'Restando los recibos: $2p = 4$, $p = 2$ mil; y $2 + 2j = 8$, $j = 3$ mil.')],
  ], 'Cada ecuación es una recta o un plano; resolver es hallar lo común, y eliminar o sustituir es el camino para llegar.');
}
;
//#archivo js/explora-gva-2.js
// Geometría Vectorial · explicación de geo-2 «El conjunto Rⁿ y el álgebra matricial» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(Math.round(n)).replace('-', '−');
  const par = q => `(${q.map(sg).join(', ')})`;
  const k = v => Math.round(v.k);
  // Matriz con corchetes centrada en (cx, cy); cls(i, j) da la clase de cada entrada.
  const mat = (K, cx, cy, M, { dx = 26, dy = 22, cls = () => '' } = {}) => {
    const n = M[0].length, w = (n - 1) * dx + 24, h = (M.length - 1) * dy + 24, x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    return K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]])
      + M.map((r, i) => r.map((v, j) => K.t(x0 + 12 + j * dx, y0 + 17 + i * dy, typeof v === 'number' ? sg(v) : v, cls(i, j))).join('')).join('');
  };
  const corch = (K, x0, x1, y0, y1) => K.pl([[x0 + 6, y0], [x0, y0], [x0, y1], [x0 + 6, y1]]) + K.pl([[x1 - 6, y0], [x1, y0], [x1, y1], [x1 - 6, y1]]);
  // Plano cuadriculado con origen O y u píxeles por unidad.
  const rej = (K, O, u, [x0, x1], [y0, y1]) => {
    let h = '';
    for (let x = x0; x <= x1; x++) h += K.l(O[0] + x * u, O[1] - y0 * u, O[0] + x * u, O[1] - y1 * u, x ? 'ls' : 'lm');
    for (let y = y0; y <= y1; y++) h += K.l(O[0] + x0 * u, O[1] - y * u, O[0] + x1 * u, O[1] - y * u, y ? 'ls' : 'lm');
    return h;
  };
  const dentro = (x, y, H) => x > 14 && x < 326 && y > 14 && y < H - 4;

  // ---------------------------------------------------------------- capítulo 1: listas, suma y escalar
  const O1 = [160, 110], P1 = (X, Y) => [O1[0] + 20 * X, O1[1] - 20 * Y];
  const lista = (v, K) => {
    const A = [3 * v.e, 2 * v.e], B = [v.bx, v.by], a = P1(...A), c = [O1[0] + (a[0] - O1[0]) * v.cola, O1[1] + (a[1] - O1[1]) * v.cola], b = [c[0] + 20 * B[0], c[1] - 20 * B[1]];
    let p = rej(K, O1, 20, [-6, 7], [-4, 5]);
    if (v.pt > 0) p += K.f(v.pt, K.c(...a, 5, 'fA') + (dentro(a[0] + 8, a[1] - 10, 204) ? K.t(a[0] + (A[0] < 0 ? -10 : 8), a[1] - 10, par(A), 's ta', A[0] < 0 ? 'end' : 'start') : ''));
    if (v.fl > 0) p += K.f(v.fl, K.ar(...O1, ...a, 'la gr'));
    if (Math.hypot(...B) > 0.1) { const m = [(c[0] + b[0]) / 2 + 10, (c[1] + b[1]) / 2 + 4]; p += K.ar(...c, ...b, 'lg gr') + (dentro(...m, 204) ? K.t(...m, par(B), 's tg', 'start') : ''); }
    if (v.su > 0) { const s = P1(A[0] + B[0], A[1] + B[1]); p += K.f(v.su, K.ar(...O1, ...s, 'lo gr') + K.t(s[0] + 8, s[1] + 16, par([A[0] + B[0], A[1] + B[1]]), 's to', 'start')); }
    if (v.e !== 1 && v.fl > 0) p += K.t(332, 200, `${sg(v.e)}·(3, 2)`, 's ta', 'end');
    // R³: una caja con la esquina en (2, 1, 3).
    const o = [150, 168], I = (x, y, z) => K.iso(o, 26, x, y, z), q = I(2, 1, 3);
    const r3 = K.l(...I(0, 0, 0), ...I(4, 0, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 3, 0), 'lm') + K.l(...I(0, 0, 0), ...I(0, 0, 5.4), 'lm')
      + K.t(...I(4.4, 0, 0), 'x', 's tm') + K.t(...I(0, 3.4, 0), 'y', 's tm') + K.t(I(0, 0, 5.6)[0], I(0, 0, 5.6)[1], 'z', 's tm')
      + K.pl([I(2, 0, 0), I(2, 1, 0), I(0, 1, 0)], 'lm d') + K.l(...I(2, 1, 0), ...q, 'lm d') + K.ar(...I(0, 0, 0), ...q, 'la gr') + K.c(...q, 5, 'fA') + K.t(q[0] + 10, q[1] - 6, '(2, 1, 3)', 's ta', 'start');
    return K.f(1 - v.r3, p) + K.f(v.r3, r3);
  };
  // Práctica: la punta de la flecha.
  const punta = (v, K) => {
    const u = P1(2, -1), w = P1(1, 2), t = P1(v.x, v.y);
    return rej(K, O1, 20, [-6, 7], [-4, 5]) + K.ar(...O1, ...u, 'lg') + K.t(u[0] + 8, u[1] + 14, '(2, −1)', 's tg', 'start') + K.ar(...O1, ...w, 'lf') + K.t(w[0] - 8, w[1] - 6, '(1, 2)', 's tf', 'end')
      + K.ar(...O1, ...t, 'la gr') + K.t(332, 18, `punta en ${par([v.x, v.y])}`, 's ta', 'end');
  };

  // ---------------------------------------------------------------- capítulo 2: combinaciones lineales
  const O2 = [160, 130], P2 = (X, Y) => [O2[0] + 18 * X, O2[1] - 18 * Y];
  const combina = (u, w, T) => (v, K) => {
    const A = [v.a * u[0], v.a * u[1]], B = [v.b * w[0], v.b * w[1]], S = [A[0] + B[0], A[1] + B[1]], a = P2(...A), c = [O2[0] + (a[0] - O2[0]) * v.cola, O2[1] + (a[1] - O2[1]) * v.cola];
    let h = rej(K, O2, 18, [-7, 8], [-3, 6]);
    if (T) { const t = P2(...T); h += K.r(t[0] - 7, t[1] - 7, 14, 14, 'fg', 2); }
    h += K.ar(...O2, ...P2(...u), 'lm') + K.ar(...O2, ...P2(...w), 'lm') + K.ar(...O2, ...a, 'la gr') + K.ar(...c, c[0] + 18 * B[0], c[1] - 18 * B[1], 'lf gr');
    if (v.su > 0) h += K.f(v.su, K.ar(...O2, ...P2(...S), 'lo gr') + K.c(...P2(...S), 4, 'fo'));
    h = `<svg x="0" y="0" width="340" height="196" viewBox="0 0 340 196">${h}</svg>`;
    return h + K.t(8, 16, `${sg(v.a)}·u = ${par(A)}`, 's ta', 'start') + K.t(332, 16, `${sg(v.b)}·v = ${par(B)}`, 's tf', 'end') + (v.su > 0 ? K.t(332, 188, `suma: ${par(S)}`, 's to', 'end') : '');
  };

  // ---------------------------------------------------------------- capítulo 3: matrices, filas y columnas
  const A3 = [[2, 1, 0], [1, 3, 4]], X3 = [1, 2, 1];
  const tabla = (v, K) => {
    const q = k(v), cx = 120, cy = 62, dx = 36, dy = 28, x0 = cx - (2 * dx + 24) / 2, y0 = cy - (dy + 24) / 2, cxj = j => x0 + 12 + j * dx, cyi = i => y0 + 12 + i * dy;
    const cls = (i, j) => (q === 1 && i === 1 && j === 2 ? 'ta' : q === 3 && i === 0 ? 'ta' : '');
    let h = mat(K, cx, cy, A3, { dx, dy, cls }) + K.t(cx, 18, 'A', 'ta');
    if (q === 0) h += K.t(250, 50, '2 filas', 's') + K.t(250, 72, '3 columnas', 's') + K.t(170, 128, 'una matriz 2 × 3: filas primero', 's tm');
    if (q === 1) h += K.r(x0 - 4, cyi(1) - 12, 2 * dx + 32, 24, 'fn') + K.r(cxj(2) - 14, y0 - 4, 28, dy + 32, 'fn') + K.c(cxj(2), cyi(1), 13, 'fn') + K.t(170, 128, 'fila 2, columna 3: a₂₃ = 4', 's ta');
    if (q >= 2) h += K.t(222, 67, '·') + mat(K, 250, 62, X3.map(n => [n]), { dy: 20, cls: () => 'tg' }) + K.t(250, 18, 'x', 'tg');
    if (q === 2) h += [0, 1, 2].map(j => K.r(cxj(j) - 13, y0 - 2, 26, dy + 28, 'fn')).join('') + K.t(170, 128, '1·(2, 1) + 2·(1, 3) + 1·(0, 4) = (4, 11)', 's') + K.t(170, 154, 'cada número de x pesa su columna', 's tm');
    if (q === 3) h += K.t(170, 128, 'fila 1: 2·1 + 1·2 + 0·1 = 4', 's ta') + K.t(170, 154, 'fila 2: 1·1 + 3·2 + 4·1 = 11', 's');
    if (q === 4) h += K.t(170, 128, '2x₁ + x₂ = 4', 's') + K.t(170, 150, 'x₁ + 3x₂ + 4x₃ = 11', 's') + K.t(170, 180, 'las dos juntas: A·x = b, con b = (4, 11)', 's ta');
    return h;
  };

  // ---------------------------------------------------------------- capítulo 4: el producto AB
  const A4 = [[1, 2], [3, 1]], B4 = [[2, 0, 1], [1, 1, 3]], AB4 = [[4, 2, 7], [7, 1, 6]];
  const producto = (v, K) => {
    const q = k(v), hiA = q === 1 ? 0 : q === 2 ? 1 : -1, hiB = q === 1 ? 0 : q === 2 ? 2 : -1;
    const ver = (i, j) => q >= 3 || (q >= 1 && i === 0 && j === 0) || (q >= 2 && i === 1 && j === 2);
    let h = K.t(60, 18, 'A: 2 × 2', 's tm') + K.t(165, 18, 'B: 2 × 3', 's tm') + K.t(280, 18, 'AB: 2 × 3', 's tm');
    h += mat(K, 60, 56, A4, { cls: i => (i === hiA ? 'ta' : '') }) + mat(K, 165, 56, B4, { cls: (i, j) => (j === hiB ? 'tf' : '') }) + K.t(222, 61, '=');
    h += mat(K, 280, 56, AB4.map((r, i) => r.map((x, j) => (ver(i, j) ? x : '·'))), { cls: (i, j) => ((q === 1 && !i && !j) || (q === 2 && i === 1 && j === 2) ? 'to' : '') });
    if (q === 1) h += K.t(170, 124, 'fila 1 por columna 1: 1·2 + 2·1 = 4', 's');
    if (q === 2) h += K.t(170, 124, 'fila 2 por columna 3: 3·1 + 1·3 = 6', 's');
    if (q === 3) h += K.t(170, 124, '(2 × 2)(2 × 3) = 2 × 3', 'ta') + K.t(170, 150, 'adentro iguales; afuera, el tamaño', 's tm');
    if (q === 4) h += K.t(170, 124, 'BA: (2 × 3)(2 × 2)', 'ta') + K.t(170, 150, '3 no es 2: BA no existe', 's tf');
    if (q === 5) h += K.t(120, 136, 'I =', '', 'end') + mat(K, 152, 132, [[1, 0], [0, 1]], { cls: (i, j) => (i === j ? 'to' : 'tm') }) + K.t(196, 136, 'A·I = I·A = A', 's ta', 'start');
    return h;
  };

  // ---------------------------------------------------------------- fondos de las prácticas con fichas
  const fondoBx = K => K.t(56, 56, 'B =', '', 'end') + mat(K, 90, 52, [[1, 2], [3, 0]]) + K.t(184, 56, 'x =', '', 'end') + mat(K, 210, 52, [[2], [1]])
    + K.t(130, 135, 'B·x =', '', 'end') + corch(K, 140, 200, 88, 172);
  const caja = (K, x, y, m, n, et) => {
    let h = K.r(x, y, n * 10, m * 10, 'fa', 2);
    for (let i = 1; i < m; i++) h += K.l(x, y + i * 10, x + n * 10, y + i * 10, 'lr');
    for (let j = 1; j < n; j++) h += K.l(x + j * 10, y, x + j * 10, y + m * 10, 'lr');
    return h + K.t(x + n * 5, y - 8, et, 's');
  };
  const fondoCD = K => caja(K, 50, 30, 3, 2, 'C: 3 × 2') + caja(K, 150, 40, 2, 5, 'D: 2 × 5') + K.t(60, 125, 'CD:', '', 'end') + K.t(60, 175, 'DC:', '', 'end');
  const fondoPan = K => K.t(130, 16, 'harina', 's tm') + K.t(166, 16, 'queso', 's tm') + K.t(8, 46, 'arepa', 's', 'start') + K.t(8, 70, 'empanada', 's', 'start')
    + mat(K, 148, 52, [[2, 1], [3, 0]], { dx: 36, dy: 24 }) + K.t(196, 57, '·') + mat(K, 226, 52, [[2], [5]], { dy: 24, cls: () => 'tg' }) + K.t(270, 46, 'precio', 's tm', 'start')
    + K.t(130, 140, 'costo =', '', 'end') + corch(K, 140, 200, 96, 180);

  xpLec('geo-2', [
    ['Listas de números',
      xpMira('dibujo', 'Un vector de $\\mathbb{R}^n$ es solo una **lista de n números**. Con dos números se dibuja en el plano.', { dib: lista, v: { pt: 0, fl: 0, e: 1, bx: 0, by: 0, cola: 0, su: 0, r3: 0 }, alto: 204 }, [
        ['La lista (3, 2) es un punto del plano: 3 a la derecha y 2 arriba. Las listas de dos forman R².', { pt: 1 }],
        ['La misma lista se dibuja como una flecha que sale del origen. Punto o flecha: es el mismo vector.', { fl: 1 }],
        ['(3, 2) + (1, −3) suma componente con componente: (4, −1). La segunda flecha sale de la punta de la primera.', { bx: 1, by: -3, cola: 1, su: 1 }],
        ['Un número estira: 2·(3, 2) = (6, 4). Cada componente se multiplica por 2 y la flecha no gira.', { bx: 0, by: 0, cola: 0, su: 0, e: 2 }],
        ['Por −1 la flecha da media vuelta: −(3, 2) = (−3, −2). Restar es sumar el opuesto.', { e: -1 }],
        ['Con tres números, (2, 1, 3), se llega a un punto del espacio: R³. Con n números, Rⁿ, aunque no se dibuje.', { r3: 1 }],
      ], 'Un vector de Rⁿ es una lista de n números; se suma y se estira componente a componente.'),
      xpHaz('dibujo', 'Arrastra la punta de la flecha hasta $(2, -1) + 2 \\cdot (1, 2)$.', { dib: punta, v: { x: -2, y: 1 }, metas: { x: 4, y: 3 }, alto: 204,
        manijas: [{ k: ['x', 'y'], min: [-6, -4], max: [7, 5], paso: 1, en: v => P1(v.x, v.y), de: (x, y) => [(x - O1[0]) / 20, (O1[1] - y) / 20] }],
        lee: v => `$${par([v.x, v.y]).replace(/−/g, '-')}$`, dice: () => 'Primero 2·(1, 2) = (2, 4); después súmale (2, −1) componente a componente.' },
      '$(2, -1) + (2, 4) = (2 + 2,\\; -1 + 4) = (4, 3)$.')],
    ['Combinar dos flechas',
      xpMira('dibujo', 'Con dos flechas y dos números se llega a muchos puntos: eso es una **combinación lineal**.', { dib: combina([3, 1], [1, 2]), v: { a: 1, b: 1, cola: 0, su: 0 }, alto: 196 }, [
        ['Dos flechas fijas: u = (3, 1) y v = (1, 2). ¿A qué puntos se llega usando solo esas dos direcciones?', {}],
        ['Cada una se estira: 1·u queda igual y 2·v se alarga al doble. Los números a y b dicen cuánto.', { b: 2 }],
        ['Ahora 2·v se pone en la punta de u, como dos tramos de un viaje.', { cola: 1 }],
        ['El viaje termina en 1·(3, 1) + 2·(1, 2) = (5, 5). Eso es una combinación lineal de u y v.', { su: 1 }],
        ['Por componentes es un sistema: 3a + b = 5, a + 2b = 5. Hallar a y b da el camino.', {}],
        ['Con a = −1 se recorre u hacia atrás: −1·(3, 1) + 2·(1, 2) = (−1, 3). Los negativos también valen.', { a: -1 }],
      ], 'a·u + b·v estira las dos flechas y las pone en fila; por componentes es un sistema en a y b.'),
      xpHaz('dibujo', 'Con $\\vec u = (1, 1)$ y $\\vec v = (-1, 2)$, mueve $a$ y $b$ hasta llegar al cuadro en $(-1, 5)$.', { dib: combina([1, 1], [-1, 2], [-1, 5]), v: { a: 0, b: 0, cola: 1, su: 1 }, metas: { a: 1, b: 2 }, alto: 290,
        manijas: [{ k: 'a', min: -3, max: 3, paso: 1, et: 'a' }, { k: 'b', min: -3, max: 3, paso: 1, et: 'b' }],
        lee: v => `$${v.a}\\,\\vec u + ${v.b < 0 ? `(${v.b})` : v.b}\\,\\vec v = (${v.a - v.b}, ${v.a + 2 * v.b})$`, dice: () => 'La primera componente da a − b = −1 y la segunda, a + 2b = 5.' },
      '$1 \\cdot (1, 1) + 2 \\cdot (-1, 2) = (-1, 5)$: combinar es estirar cada flecha y ponerlas en fila.')],
    ['Matrices: filas y columnas',
      xpMira('dibujo', 'Una **matriz** es una tabla de números. Multiplicada por un vector, combina sus columnas.', { dib: tabla, v: { k: 0 }, alto: 200 }, [
        ['Esta tabla tiene 2 filas y 3 columnas: es una matriz 2 × 3. Siempre se dicen primero las filas.', {}],
        ['Cada número tiene su dirección, fila y columna. En la fila 2, columna 3, está a₂₃ = 4.', { k: 1 }],
        ['Una matriz por un vector combina sus columnas: x = (1, 2, 1) dice cuánto tomar de cada una. Da (4, 11).', { k: 2 }],
        ['También por filas: cada fila por x, pareja por pareja, y se suma. La fila 1 da 4; la fila 2, 11.', { k: 3 }],
        ['Y al revés: dos ecuaciones con x₁, x₂ y x₃ caben en una sola, A·x = b. A guarda los coeficientes.', { k: 4 }],
      ], 'Una matriz m × n tiene m filas y n columnas; A·x combina sus columnas, y cada componente es una fila por x.'),
      xpHaz('fichas', 'Completa $B\\vec x$ con $\\vec x = (2, 1)$: dos veces la primera columna más una vez la segunda.', {
        slots: [{ x: 170, y: 110, w: 50, h: 36 }, { x: 170, y: 150, w: 50, h: 36 }], alto: 182, fondo: fondoBx,
        fichas: ['5', '4', '7', '6'], meta: ['4', '6'], pista: 'Las columnas de B son (1, 3) y (2, 0): toma la primera dos veces y súmale la segunda.' },
      '$2 \\cdot (1, 3) + 1 \\cdot (2, 0) = (4, 6)$: el vector dice cuánto de cada columna.')],
    ['El producto AB',
      xpMira('dibujo', 'Dos matrices se multiplican **fila por columna**, y solo si sus medidas encajan.', { dib: producto, v: { k: 0 }, alto: 170 }, [
        ['Para multiplicar A por B, cada fila de A se cruza con cada columna de B: así sale cada casilla de AB.', {}],
        ['Casilla (1, 1): la fila 1 de A por la columna 1 de B, pareja por pareja: 1·2 + 2·1 = 4.', { k: 1 }],
        ['Casilla (2, 3): la fila 2 por la columna 3: 3·1 + 1·3 = 6. Así se llenan las seis casillas.', { k: 2 }],
        ['Medidas: (2 × 2)(2 × 3) = 2 × 3. Las de adentro deben coincidir; las de afuera dan el tamaño.', { k: 3 }],
        ['BA sería (2 × 3)(2 × 2): 3 no es 2 y no existe. El orden importa: en general AB ≠ BA.', { k: 4 }],
        ['La identidad I tiene unos en la diagonal y ceros fuera. No cambia nada: A·I = I·A = A.', { k: 5 }],
      ], 'La casilla (i, j) de AB es la fila i de A por la columna j de B; (m × n)(n × p) = m × p.'),
      xpHaz('fichas', 'C es 3 × 2 y D es 2 × 5. ¿Qué tamaño tiene CD? ¿Y DC?', {
        slots: [{ x: 130, y: 120, w: 100, h: 38 }, { x: 130, y: 170, w: 100, h: 38 }], alto: 196, fondo: fondoCD,
        fichas: ['2 × 2', 'no existe', '5 × 3', '3 × 5'], meta: ['3 × 5', 'no existe'], pista: 'Escribe las medidas una junto a la otra: las de adentro deben coincidir y las de afuera dan el tamaño.' },
      'CD: $(3 \\times 2)(2 \\times 5) = 3 \\times 5$. DC: $(2 \\times 5)(3 \\times 2)$, y 5 no es 3: no existe.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una arepa lleva 2 de harina y 1 de queso; una empanada, 3 de harina y nada de queso. La harina vale 2 y el queso 5 (miles). Completa el costo de cada una.', {
        slots: [{ x: 170, y: 118, w: 50, h: 36 }, { x: 170, y: 158, w: 50, h: 36 }], alto: 190, fondo: fondoPan,
        fichas: ['7', '9', '15', '6', '11'], meta: ['9', '6'], pista: 'Cada costo es una fila de la tabla por los precios: harina por su precio más queso por el suyo.' },
      '$(2 \\cdot 2 + 1 \\cdot 5,\\; 3 \\cdot 2 + 0 \\cdot 5) = (9, 6)$: cada fila por los precios.')],
  ], 'Rⁿ son listas que se suman y se estiran; una matriz combina columnas, y AB se arma fila por columna si las medidas encajan.');
}
;
//#archivo js/explora-gva-3.js
// Geometría Vectorial · explicación de geo-3 «Transpuesta, sistemas m×n y tipos de solución» (spec
// 2026-11-27-curso-geometria-vectorial). Los ejemplos no son los de los ejercicios.
{
  const sg = n => String(n).replace('-', '−');
  const R = Math.round;
  // Matriz con corchetes; txt(i, j, e) da el texto y cls(i, j) la clase. bar: columna tras la que va la raya.
  const mat = (K, x, y, M, o = {}) => {
    const cw = o.cw || 46, rh = o.rh || 34, w = M[0].length * cw + 8, h = M.length * rh;
    let s = K.pl([[x + 6, y], [x, y], [x, y + h], [x + 6, y + h]]) + K.pl([[x + w - 6, y], [x + w, y], [x + w, y + h], [x + w - 6, y + h]]);
    if (o.bar != null) s += K.l(x + 4 + cw * (o.bar + 1), y + 3, x + 4 + cw * (o.bar + 1), y + h - 3, 'lm');
    M.forEach((r, i) => r.forEach((e, j) => { s += K.t(x + 4 + cw * (j + 0.5), y + rh * (i + 0.5) + 5, typeof e === 'string' ? e : sg(e), o.cls ? o.cls(i, j) : ''); }));
    return s;
  };
  const cab = (K, x, cw, y, et) => et.map((t, j) => K.t(x + 4 + cw * (j + 0.5), y, t, 's tm')).join('');

  // --------------------------------------------------------------------------- 1. la transpuesta
  const A = [[3, 1, 7], [5, 0, 2]], S = [[2, 6, -1], [6, 5, 3], [-1, 3, 1]];
  const voltea = (v, K) => {
    const X = 113, Y = 40, u = 38;
    let h = K.f(v.d, K.l(X, Y, X + 3 * u, Y + 3 * u, 'lm d'));
    if (v.sym > 0.5) {
      h += mat(K, X - 4, Y, S, { cw: u, rh: u, cls: (i, j) => (i === j ? '' : i < j ? 'ta' : 'tg') });
      return h + K.t(170, 22, 'simétrica: Sᵀ = S', 'ta') + K.f(v.pr, K.t(170, 182, '(A + B)ᵀ = Aᵀ + Bᵀ      (AB)ᵀ = BᵀAᵀ', 's'));
    }
    const t = v.t, c = 3 + (2 - 3) * t, f = 2 + (3 - 2) * t;
    h += K.pl([[X + 6, Y], [X, Y], [X, Y + f * u], [X + 6, Y + f * u]]) + K.pl([[X + c * u - 6, Y], [X + c * u, Y], [X + c * u, Y + f * u], [X + c * u - 6, Y + f * u]]);
    A.forEach((r, i) => r.forEach((e, j) => {
      const x = X + u * ((j + 0.5) + ((i + 0.5) - (j + 0.5)) * t), y = Y + u * ((i + 0.5) + ((j + 0.5) - (i + 0.5)) * t);
      h += K.t(x, y + 5, sg(e), i ? 'tg' : 'ta');
    }));
    const tag = v.lab > 0.5 ? (t > 0.5 ? 'Aᵀ: 3 × 2' : 'A: 2 × 3, otra vez') : 'A: 2 × 3';
    return h + K.t(170, 22, tag, 'b') + K.f(v.lab, K.t(300, 120, '(i, j) → (j, i)', 's tm', 'end'));
  };
  // Simétrica con tres casillas por llenar.
  const SIM = [[2, 6, -1], ['', 5, 3], ['', '', 1]];
  const simFondo = K => K.l(90, 20, 258, 158, 'lm d') + mat(K, 86, 20, SIM, { cw: 56, rh: 46 });

  // --------------------------------------------------------------------------- 2. aumentada y operaciones
  const PASOS = [
    null,
    [[1, -1, 2, 5], [2, 1, 1, 7], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [-1, 2, 3, 6]],
    [[1, -1, 2, 5], [0, 3, -3, -3], [0, 1, 5, 11]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 3, -3, -3]],
    [[1, -1, 2, 5], [0, 1, 5, 11], [0, 1, -1, -1]],
  ];
  const OPS = ['', 'la matriz aumentada', 'F₂ → F₂ − 2F₁', 'F₃ → F₃ + F₁', 'F₂ ↔ F₃', 'F₃ → ⅓F₃'];
  const CAMBIA = [[], [], [1], [2], [1, 2], [2]];
  const aumentada = (v, K) => {
    const k = R(v.k);
    if (!k) return ['x − y + 2z = 5', '2x + y + z = 7', '−x + 2y + 3z = 6'].map((t, i) => K.t(170, 66 + i * 34, t)).join('') + K.t(170, 22, 'tres ecuaciones, tres incógnitas', 's tm');
    let h = K.t(170, 22, OPS[k], k > 1 ? 'ta' : 'tm');
    CAMBIA[k].forEach(i => { h += K.r(70, 44 + i * 34, 184, 34, 'fn', 4); });
    return h + mat(K, 66, 44, PASOS[k], { bar: 2 }) + cab(K, 66, 46, 38, ['x', 'y', 'z', 'c']);
  };
  // Tu turno: F₂ + k·F₁ deja un 0 debajo del 3.
  const anula = (v, K) => {
    const F1 = [3, -1, 4], F2 = [-6, 5, 1], N = F2.map((e, j) => e + v.k * F1[j]);
    return K.c(96, 47, 15, 'fn') + K.c(96, 81, 15, N[0] === 0 ? 'fo' : 'ff') + mat(K, 70, 30, [F1, N], { cw: 52, bar: 1 })
      + K.t(240, 52, 'F₁', 's tm', 'start') + K.t(240, 86, `F₂ ${v.k < 0 ? '−' : '+'} ${Math.abs(v.k)}·F₁`, 's ta', 'start');
  };

  // --------------------------------------------------------------------------- 3. escalera de pivotes
  const ESC = [[2, 4, -2, 6], [0, 3, 6, -3], [0, 0, 0, 0]], RED = [[1, 0, -5, 5], [0, 1, 2, -1], [0, 0, 0, 0]];
  const escalera = (v, K) => {
    const k = R(v.k), X = 66, Y = 34, cw = 50, rh = 34, M = k >= 3 ? RED : ESC, c = (i, j) => [X + 4 + cw * (j + 0.5), Y + rh * (i + 0.5)];
    let h = cab(K, X, cw, 26, ['x', 'y', 'z', 'c']);
    if (k >= 1) h += K.c(...c(0, 0), 15, 'fo') + K.c(...c(1, 1), 15, 'fo') + K.pl([[X + 4, Y + rh], [X + 4 + cw, Y + rh], [X + 4 + cw, Y + 2 * rh], [X + 4 + 3 * cw, Y + 2 * rh]], 'la d');
    if (k === 2) h += K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4);
    if (k >= 4) h += K.r(X + 4 + 2 * cw + 4, Y + 2, cw - 8, 3 * rh - 4, 'fn', 6);
    h += mat(K, X, Y, M, { cw, rh, bar: 2 });
    const pie = ['', 'pivotes: 2 y 3', 'forma escalonada', 'forma escalonada reducida', 'z sin pivote: z = t, libre', 'x = 5 + 5t     y = −1 − 2t     z = t'][k];
    return h + K.t(170, 166, pie, k >= 4 ? 'ta' : 's tm');
  };
  const PL = [[2, -1, 3, 0, 1], [0, 0, 1, 4, 2], [0, 0, 0, 5, 5]], XC = [52, 114, 176, 238, 298];
  const plFondo = K => {
    let h = K.pl([[26, 22], [20, 22], [20, 106], [26, 106]]) + K.pl([[318, 22], [324, 22], [324, 106], [318, 106]]) + K.l(268, 25, 268, 103, 'lm');
    PL.forEach((r, i) => r.forEach((e, j) => { h += K.t(XC[j], 22 + 28 * (i + 0.5) + 5, sg(e)); }));
    return h + ['x₁', 'x₂', 'x₃', 'x₄'].map((t, j) => K.t(XC[j], 14, t, 's tm')).join('');
  };

  // --------------------------------------------------------------------------- 4. leer el tipo
  const TOP = [[1, 2, -1, 4], [0, 1, 3, 5]];
  const ULT = [[0, 0, 2, 6], [0, 0, 0, 4], [0, 0, 0, 0], [0, 0, 'k − 1', 'k + 2']];
  const DICE = [['2z = 6: z = 3, y luego y, x', 'solución única'], ['0 = 4: imposible', 'ninguna solución'], ['0 = 0: z queda libre, z = t', 'infinitas soluciones'], ['depende de k', '']];
  const tipo = (v, K) => {
    const c = R(v.c), X = 66, Y = 30, cw = 50, rh = 34;
    let h = K.r(X + 4, Y + 2 * rh, 4 * cw, rh, c === 1 ? 'ff' : c === 2 ? 'fn' : 'fo', 4);
    h += mat(K, X, Y, [...TOP, ULT[c]], { cw, rh, bar: 2 }) + cab(K, X, cw, 22, ['x', 'y', 'z', 'c']);
    const [a, b] = c === 3 && v.k > 0.5 ? ['k ≠ 1: única     k = 1: 0 = 3, ninguna', ''] : DICE[c];
    return h + K.t(170, 158, a, 's') + K.t(170, 180, b, 'ta');
  };
  const tipoK = (v, K) => {
    const X = 66, Y = 24, cw = 50, rh = 34, a = v.k + 3, b = v.k - 2;
    return K.r(X + 4, Y + 2 * rh, 4 * cw, rh, 'fn', 4) + mat(K, X, Y, [[1, -2, 1, 0], [0, 1, 4, 2], [0, 0, a, b]], { cw, rh, bar: 2 }) + cab(K, X, cw, 16, ['x', 'y', 'z', 'c']);
  };

  // --------------------------------------------------------------------------- 5. el problema: una mezcla con un parámetro
  const mezcla = (v, K) => {
    const x = [8 - 2 * v.t, 2 + v.t, v.t], cls = ['fa', 'fg', 'fo'];
    return x.map((n, i) => K.t(30, 46 + i * 36, `x${'₁₂₃'[i]}`, 's', 'end') + K.r(40, 32 + i * 36, Math.max(0, n) * 26, 22, cls[i], 4) + K.t(Math.max(0, n) * 26 + 48, 48 + i * 36, `${n} bolsas`, 's', 'start')).join('')
      + K.t(170, 18, `t = ${v.t}`, 's tm');
  };

  xpLec('geo-3', [
    ['Voltear una matriz',
      xpMira('dibujo', 'Primera idea: la **transpuesta** voltea la matriz sobre su diagonal.', { dib: voltea, v: { t: 0, d: 0, lab: 0, sym: 0, pr: 0 }, alto: 196 }, [
        ['Esta tabla A tiene 2 filas y 3 columnas: es de 2 × 3. Cada fila, una tienda; cada columna, un día.', {}],
        ['Transponer es voltearla sobre su diagonal, la línea que baja desde la esquina de arriba a la izquierda.', { d: 1 }],
        ['La fila 1 cae como columna 1; la fila 2, como columna 2. La entrada (i, j) pasa al lugar (j, i).', { t: 1 }],
        ['Así nace la transpuesta Aᵀ, de 3 × 2. Si se voltea otra vez, vuelve A: (Aᵀ)ᵀ = A.', { lab: 1 }],
        ['Hay matrices que no cambian al voltearlas: las simétricas, con Sᵀ = S. Cada número copia a su reflejo.', { t: 0, sym: 1 }],
        ['Dos reglas más: (A + B)ᵀ = Aᵀ + Bᵀ. Y al voltear un producto, el orden se invierte: (AB)ᵀ = BᵀAᵀ.', { pr: 1 }],
      ], 'La transpuesta cambia filas por columnas; una simétrica es igual a su transpuesta, y (AB)ᵀ = BᵀAᵀ.'),
      xpHaz('fichas', 'Completa la matriz para que sea **simétrica**: cada casilla vacía copia a su reflejo en la diagonal.', {
        slots: [{ x: 118, y: 89, w: 46, h: 38 }, { x: 118, y: 135, w: 46, h: 38 }, { x: 174, y: 135, w: 46, h: 38 }], alto: 166, fondo: simFondo,
        fichas: ['3', '−6', '6', '1', '−1'], meta: ['6', '−1', '3'], pista: 'La casilla (2, 1) copia a la (1, 2); la (3, 1), a la (1, 3); la (3, 2), a la (2, 3).' },
      'En una simétrica, la casilla (i, j) vale lo mismo que la (j, i).')],
    ['Filas que se operan',
      xpMira('dibujo', 'Segunda idea: un sistema se guarda en una **matriz aumentada** y se trabaja por filas.', { dib: aumentada, v: { k: 0 }, alto: 158 }, [
        ['Tres ecuaciones con tres incógnitas. Para resolverlas, solo importan los números.', {}],
        ['En la matriz aumentada va una fila por ecuación y, tras la raya, las constantes.', { k: 1 }],
        ['Primera operación: sumar a una fila k veces otra. F₂ − 2F₁ deja un 0 debajo del primer 1.', { k: 2 }],
        ['Lo mismo abajo con F₃ + F₁. Es sumar dos ecuaciones: las soluciones no cambian.', { k: 3 }],
        ['Segunda: intercambiar dos filas. Es solo escribir las ecuaciones en otro orden.', { k: 4 }],
        ['Tercera: multiplicar una fila por k ≠ 0, aquí por ⅓. Con k = 0 se perdería una ecuación.', { k: 5 }],
      ], 'Intercambiar filas, multiplicar una por k ≠ 0 y sumarle k veces otra no cambian las soluciones.'),
      xpHaz('dibujo', 'Mueve k para que **F₂ + k·F₁** deje un 0 debajo del 3.', { dib: anula, v: { k: 0 }, metas: { k: 2 }, alto: 170,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$-6 + ${v.k < 0 ? `(${v.k})` : v.k} \\cdot 3 = ${-6 + 3 * v.k}$` },
      'Para anular −6 con el 3 de arriba hacen falta 2 veces: $-6 + 2 \\cdot 3 = 0$.')],
    ['La escalera de pivotes',
      xpMira('dibujo', 'Tercera idea: con esas operaciones la matriz queda en **escalera**.', { dib: escalera, v: { k: 0 }, alto: 180 }, [
        ['El pivote de una fila es su primer número distinto de cero.', {}],
        ['Aquí los pivotes son el 2 y el 3. Cada uno va más a la derecha que el de arriba; debajo, ceros.', { k: 1 }],
        ['La fila de ceros va al fondo. Así se ve la forma escalonada.', { k: 2 }],
        ['En la reducida cada pivote se vuelve 1 y también hay ceros encima de él.', { k: 3 }],
        ['La columna de z no tiene pivote: z es libre. Puede valer cualquier número; se le llama t.', { k: 4 }],
        ['Las demás se despejan con t. Cada valor de t da una solución distinta.', { k: 5 }],
      ], 'Pivote: primer número distinto de cero de su fila. Columna con pivote se despeja; sin pivote, queda libre.'),
      xpHaz('fichas', 'Rotula cada columna de esta escalonada: ¿tiene **pivote** o su variable queda **libre**?', {
        slots: XC.slice(0, 4).map(x => ({ x, y: 136, w: 60, h: 34 })), alto: 160, fondo: plFondo,
        fichas: ['pivote', 'libre', 'pivote', 'libre', 'pivote'], meta: ['pivote', 'libre', 'pivote', 'pivote'], pista: 'Fila por fila, busca el primer número distinto de cero: esa columna tiene pivote.' },
      'Los pivotes son el 2, el 1 y el 5: x₂ es la única libre.')],
    ['Una, ninguna o infinitas',
      xpMira('dibujo', 'Cuarta idea: la escalonada dice **cuántas soluciones** hay.', { dib: tipo, v: { c: 0, k: 0 }, alto: 192 }, [
        ['Si la última fila dice 2z = 6, sale z = 3 y, subiendo, y y x. Un pivote por incógnita: única.', {}],
        ['Si queda 0 0 0 | 4, esa fila dice 0 = 4. Ningún número lo cumple: el sistema no tiene solución.', { c: 1 }],
        ['Si queda una fila de puros ceros, dice 0 = 0: siempre se cumple. Pero z se queda sin pivote.', { c: 2 }],
        ['Con z = t libre hay una solución por cada t: infinitas.', {}],
        ['Si un número k está en la última fila, el tipo depende de k.', { c: 3 }],
        ['Con k ≠ 1 hay pivote: única. Con k = 1 queda 0 = 3: ninguna. Aquí infinitas no sale nunca.', { k: 1 }],
      ], 'Fila 0 … 0 | c con c ≠ 0: ninguna. Columna sin pivote y nada imposible: infinitas. Un pivote por incógnita: única.'),
      xpHaz('dibujo', 'Mueve k hasta que el sistema **no tenga solución**.', { dib: tipoK, v: { k: 0 }, metas: { k: -3 }, alto: 176,
        manijas: [{ k: 'k', min: -4, max: 4, paso: 1, et: 'k' }], lee: v => `$k = ${v.k}$` },
      'Con $k = -3$ la última fila es $0 \\ 0 \\ 0 \\mid -5$: dice $0 = -5$, imposible.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una mezcla de tres alimentos tiene infinitas soluciones: $x_1 = 8 - 2t$, $x_2 = 2 + t$, $x_3 = t$ bolsas. Busca la que lleva igual número de bolsas de $x_1$ y de $x_2$.', {
        dib: mezcla, v: { t: 0 }, metas: { t: 2 }, alto: 186, manijas: [{ k: 't', min: 0, max: 4, paso: 1, et: 'parámetro t' }],
        lee: v => `$x_1 = ${8 - 2 * v.t}$, $x_2 = ${2 + v.t}$, $x_3 = ${v.t}$` },
      'Con $t = 2$: $x_1 = 4$, $x_2 = 4$ y $x_3 = 2$. El parámetro recorre todas las soluciones; la condición escoge una.')],
  ], 'Aᵀ voltea filas y columnas; las operaciones de fila escalonan sin cambiar soluciones, y los pivotes dicen el tipo.');
}
;
//#archivo js/explora-gva-4.js
// Geometría Vectorial · explicación de geo-4 «Matrices invertibles y matrices elementales» (spec 2026-11-27-curso-geometria-vectorial).
// Los ejemplos no son los de los ejercicios.
{
  const r1 = x => String(Math.round(x * 10) / 10).replace('-', '−');
  const k = v => Math.round(v.k);
  const pm = M => `\\begin{pmatrix} ${M.map(f => f.join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
  const mul = (A, B) => A.map(f => B[0].map((_, j) => f.reduce((s, x, q) => s + x * B[q][j], 0)));
  function mat(K, cx, cy, M, cls = '', dx = 26, dy = 20) {
    const w = M[0].length * dx, h = M.length * dy, x0 = cx - w / 2, y0 = cy - h / 2, x1 = x0 + w;
    let s = K.pl([[x0 + 4, y0 - 2], [x0, y0 - 2], [x0, y0 + h + 2], [x0 + 4, y0 + h + 2]]) + K.pl([[x1 - 4, y0 - 2], [x1, y0 - 2], [x1, y0 + h + 2], [x1 - 4, y0 + h + 2]]);
    M.forEach((f, i) => f.forEach((e, j) => { s += K.t(x0 + dx * (j + 0.5), y0 + dy * (i + 0.5) + 5, typeof e === 'number' ? r1(e) : e, cls); }));
    return s;
  }
  const rej = (K, O, u, x0, x1, y0, y1) => {
    let h = '';
    for (let i = x0; i <= x1; i++) h += K.l(O[0] + i * u, O[1] - y0 * u, O[0] + i * u, O[1] - y1 * u, i ? 'lr' : 'lm');
    for (let j = y0; j <= y1; j++) h += K.l(O[0] + x0 * u, O[1] - j * u, O[0] + x1 * u, O[1] - j * u, j ? 'lr' : 'lm');
    return h;
  };
  const para = (K, O, u, c1, c2, cls) => K.p([[0, 0], c1, [c1[0] + c2[0], c1[1] + c2[1]], c2].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), cls);
  const cuadro = (K, O, u) => K.pl([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]].map(([x, y]) => [O[0] + x * u, O[1] - y * u]), 'lm d');

  // Capítulo 1: A estira al doble a lo ancho y A⁻¹ encoge a la mitad.  v { a, k }
  const estira = (v, K) => {
    const O = [40, 160], u = 50, q = k(v);
    let h = rej(K, O, u, 0, 3, 0, 2) + cuadro(K, O, u) + para(K, O, u, [v.a, 0], [0, 1], q === 3 ? 'fo' : 'fa');
    h += K.t(214, 40, 'A =', 's', 'start') + mat(K, 276, 36, [[2, 0], [0, 1]], 's');
    if (q >= 2) h += K.t(214, 92, 'A⁻¹ =', 's', 'start') + mat(K, 280, 88, [['½', 0], [0, 1]], 's ta');
    return h + K.t(260, 150, ['el cuadrado', 'después de A', 'A y luego A⁻¹', 'A⁻¹A = I'][q], 's tm');
  };
  // Capítulo 1, tu turno: B deshace el corte A = [[1, 2], [0, 1]].  v { p, q, r, s }
  const CA = [[1, 2], [0, 1]], CO = [150, 120], CU = 22, CB = v => [[v.p, v.r], [v.q, v.s]];
  const corte = (v, K) => {
    const BA = mul(CB(v), CA);
    return rej(K, CO, CU, -3, 3, -3, 3) + cuadro(K, CO, CU) + para(K, CO, CU, [BA[0][0], BA[1][0]], [BA[0][1], BA[1][1]], 'fa')
      + K.ar(...CO, CO[0] + v.p * CU, CO[1] - v.q * CU, 'la gr') + K.ar(...CO, CO[0] + v.r * CU, CO[1] - v.s * CU, 'lg gr')
      + K.t(240, 30, 'A =', 's', 'start') + mat(K, 296, 26, CA, 's') + K.t(240, 92, 'B =', 's', 'start') + mat(K, 296, 88, CB(v), 's');
  };
  const DE = (x, y) => [(x - CO[0]) / CU, (CO[1] - y) / CU];

  // Capítulo 2: columnas, área ad − bc y el aplastamiento.  v { b, d, k }
  const area = (v, K) => {
    const O = [40, 180], u = 34, c1 = [2, 1], c2 = [v.b, v.d], q = k(v), dt = 2 * v.d - v.b;
    let h = rej(K, O, u, 0, 6, 0, 3) + para(K, O, u, c1, c2, Math.abs(dt) < 0.05 ? 'ff' : 'fa');
    if (q === 3 || (q === 2 && Math.abs(dt) < 0.05)) h += K.l(O[0], O[1], O[0] + 6 * u, O[1] - 3 * u, 'lf gr');
    h += K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr');
    h += K.t(20, 30, 'A =', 's', 'start') + mat(K, 76, 26, [[2, v.b], [1, v.d]], 's');
    if (q >= 1) h += K.t(328, 24, `ad − bc = ${r1(dt)}`, 's ta', 'end');
    if (q === 3) h += K.t(328, 44, 'área 0: sin inversa', 's tf', 'end');
    if (q === 4) h += K.t(328, 44, 'área ≠ 0: hay inversa', 's to', 'end');
    return h;
  };
  // Capítulo 2, tu turno: la b que anula ad − bc.  v { b }
  const anula = (v, K) => {
    const O = [40, 168], u = 18, c1 = [2, 3], c2 = [v.b, 6], dt = 12 - 3 * v.b;
    return rej(K, O, u, 0, 8, 0, 8) + para(K, O, u, c1, c2, dt === 0 ? 'ff' : 'fa') + K.ar(...O, O[0] + c1[0] * u, O[1] - c1[1] * u, 'la gr') + K.ar(...O, O[0] + c2[0] * u, O[1] - c2[1] * u, 'lg gr')
      + K.t(212, 40, 'A =', 's', 'start') + mat(K, 274, 36, [[2, v.b], [3, 6]], 's') + K.t(328, 88, `ad − bc = ${r1(dt)}`, 's ta', 'end');
  };
  const brackets = (K, x0, x1, y0, y1) => K.pl([[x0 + 8, y0], [x0, y0], [x0, y1], [x0 + 8, y1]]) + K.pl([[x1 - 8, y0], [x1, y0], [x1, y1], [x1 - 8, y1]]);

  // Capítulo 3: la elemental de R₃ → R₃ + 4R₁, lo que hace sobre A y su inversa.  v { k }
  const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], E3 = [[1, 0, 0], [0, 1, 0], [4, 0, 1]], A3 = [[1, 2, 1], [0, 1, 3], [-4, 0, 2]], F3 = [[1, 0, 0], [0, 1, 0], [-4, 0, 1]];
  const elemental = (v, K) => {
    const q = k(v);
    if (q === 0) return K.t(120, 88, 'I =', '', 'end') + mat(K, 170, 84, I3) + K.t(170, 160, 'no mueve nada', 's tm');
    if (q === 1) return K.t(60, 88, 'I =', 's', 'end') + mat(K, 104, 84, I3, 's') + K.ar(146, 84, 186, 84, 'lm') + K.t(166, 70, 'R₃ + 4R₁', 's ta') + K.t(234, 88, 'E =', 's', 'end') + mat(K, 280, 84, E3, 's ta');
    if (q === 2) return K.t(36, 88, 'E·', 's', 'start') + mat(K, 90, 84, A3, 's') + K.t(150, 88, '=', '') + mat(K, 210, 84, mul(E3, A3), 's ta') + K.t(170, 160, 'a la fila 3 de A se le sumó 4 veces la fila 1', 's tm');
    if (q === 3) return K.t(60, 88, 'E⁻¹ =', 's', 'end') + mat(K, 104, 84, F3, 's ta') + K.t(170, 160, 'R₃ → R₃ − 4R₁ deshace a E', 's tm') + K.t(240, 88, 'E⁻¹E = I', 's', 'start');
    if (q === 4) return [['Rᵢ ↔ Rⱼ', 'se repite: Rᵢ ↔ Rⱼ'], ['Rᵢ → kRᵢ', 'se divide: Rᵢ → (1/k)Rᵢ'], ['Rᵢ → Rᵢ + kRⱼ', 'se resta: Rᵢ → Rᵢ − kRⱼ']]
      .map(([a, b], i) => K.t(20, 60 + i * 44, a, 's', 'start') + K.ar(124, 56 + i * 44, 156, 56 + i * 44, 'lm') + K.t(166, 60 + i * 44, b, 's ta', 'start')).join('') + K.t(170, 24, 'operación y la que la deshace', 's tm');
    return K.t(170, 60, 'A → … → I con operaciones de fila', 's') + K.t(170, 96, 'Eₖ ⋯ E₂E₁A = I', 'ta') + K.t(170, 132, 'A⁻¹ = Eₖ ⋯ E₂E₁', 'ta') + K.t(170, 168, 'A es un producto de elementales', 's tm');
  };

  // Capítulo 4: medias y zapatos.  v { k }
  const capas = (v, K) => {
    const q = k(v), media = q === 1 || q === 2, zapato = q === 2;
    let h = K.r(130, 60, 80, 90, 'fc', 30) + K.t(170, 110, 'pie', 's tm');
    if (media || q === 3) h += K.r(120, 50, 100, 110, 'fa', 34) + K.t(170, 70, 'A: media', 's');
    if (zapato) h += K.r(108, 38, 124, 134, 'fg', 38) + K.t(170, 54, 'B: zapato', 's');
    const pie = ['sin nada', 'queda A', 'queda BA', 'B⁻¹ quitó el zapato', '(BA)⁻¹ = A⁻¹B⁻¹', '(Aᵀ)⁻¹ = (A⁻¹)ᵀ'][q];
    return h + K.t(170, 196, pie, q >= 4 ? 'ta' : 's tm');
  };

  // Problema: tortas y ponqués.  v { x, y }
  const PA = [[1, 1], [2, 3]], PO = [40, 196], PU = 26;
  const recetas = (v, K) => {
    let h = rej(K, PO, PU, 0, 6, 0, 6) + K.t(PO[0] + 6 * PU, PO[1] + 18, 'tortas', 's tm', 'end') + K.t(PO[0] - 8, PO[1] - 6 * PU - 10, 'ponqués', 's tm', 'start');
    h += K.l(PO[0] + v.x * PU, PO[1], PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d') + K.l(PO[0], PO[1] - v.y * PU, PO[0] + v.x * PU, PO[1] - v.y * PU, 'la d');
    const az = v.x + v.y, ha = 2 * v.x + 3 * v.y;
    return h + K.t(246, 48, 'A⁻¹ =', 's', 'end') + mat(K, 286, 44, [[3, -1], [-2, 1]], 's') + K.t(222, 120, `azúcar: ${az} de 5`, `s ${az === 5 ? 'to' : 'tm'}`, 'start') + K.t(222, 142, `harina: ${ha} de 13`, `s ${ha === 13 ? 'to' : 'tm'}`, 'start');
  };

  xpLec('geo-4', [
    ['Deshacer lo que hace A',
      xpMira('dibujo', 'Una matriz **deshace** a otra cuando devuelve cada punto a su sitio.', { dib: estira, v: { a: 1, k: 0 }, alto: 200 }, [
        ['Una matriz mueve el plano. Mira el cuadrado de lado 1: cada matriz lo lleva a otra figura.', {}],
        ['Esta A estira todo al doble a lo ancho: el cuadrado se vuelve un rectángulo de 2 por 1.', { a: 2, k: 1 }],
        ['Para deshacerla hay que encoger a la mitad a lo ancho. Esa matriz es la inversa de A: A⁻¹.', { a: 1, k: 2 }],
        ['Hacer A y luego A⁻¹ deja todo como estaba: A⁻¹A = I, la identidad, que no mueve nada.', { k: 3 }],
        ['Es como dividir: 2 · ½ = 1. A⁻¹ hace el papel de ½ y la identidad, el del 1.', {}],
        ['La inversa deshace por los dos lados: AA⁻¹ = I y también A⁻¹A = I.', {}, '$AA^{-1} = A^{-1}A = I$'],
      ], 'A⁻¹ deshace lo que hace A: $AA^{-1} = A^{-1}A = I$, como $2 \\cdot \\tfrac{1}{2} = 1$.'),
      xpHaz('dibujo', 'A inclina el cuadrado: 2 a la derecha por cada paso arriba. Arrastra las columnas de B hasta que la figura vuelva a ser el cuadrado punteado.', {
        dib: corte, v: { p: 0, q: 1, r: -1, s: 0 }, metas: { p: 1, q: 0, r: -2, s: 1 }, alto: 200,
        manijas: [{ k: ['p', 'q'], min: -3, max: 3, paso: 1, rot: () => 'b₁', en: v => [CO[0] + v.p * CU, CO[1] - v.q * CU], de: DE }, { k: ['r', 's'], min: -3, max: 3, paso: 1, rot: () => 'b₂', en: v => [CO[0] + v.r * CU, CO[1] - v.s * CU], de: DE }],
        lee: v => `$BA = ${pm(mul(CB(v), CA))}$`, pista: 'A empuja hacia la derecha 2 por cada paso hacia arriba: B debe empujar 2 hacia la izquierda.' },
      'El corte que empuja 2 a la derecha se deshace empujando 2 a la izquierda.')],
    ['El número ad − bc',
      xpMira('dibujo', 'Hay matrices que **no** se pueden deshacer. Un número lo dice.', { dib: area, v: { b: 1, d: 2, k: 0 }, alto: 200 }, [
        ['Las columnas de A son las flechas a donde van los lados del cuadrado: aquí (2, 1) y (1, 2).', {}],
        ['Su área es |ad − bc| = 4 − 1 = 3: A agranda las áreas 3 veces.', { k: 1 }],
        ['Ahora la segunda columna gira hasta (4, 2), que es el doble de la primera.', { b: 4, d: 2, k: 2 }],
        ['El paralelogramo se aplasta en una recta: ad − bc = 4 − 4 = 0.', { k: 3 }],
        ['Todo el plano cae en esa recta y muchos puntos van al mismo sitio. Eso no se puede deshacer: no hay inversa.', {}],
        ['Si no es cero, hay inversa: se cambian a y d, b y c cambian de signo, y se divide.', { b: 1, d: 2, k: 4 }, '$A^{-1} = \\tfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$'],
      ], 'Si $ad - bc = 0$ el plano se aplasta y no hay inversa; si no, se intercambian a y d, b y c cambian de signo y se divide.'),
      xpHaz('dibujo', 'Desliza b hasta que A no tenga inversa: que las dos columnas queden en la misma recta.', {
        dib: anula, v: { b: 0 }, metas: { b: 4 }, alto: 230, manijas: [{ k: 'b', min: -2, max: 7, paso: 1, et: 'b' }],
        lee: v => `$ad - bc = 2 \\cdot 6 - ${v.b < 0 ? `(${v.b})` : v.b} \\cdot 3 = ${12 - 3 * v.b}$`, pista: 'La segunda columna debe ser un múltiplo de (2, 3): mira su segunda entrada, 6.' },
      'Con $b = 4$: $2 \\cdot 6 - 4 \\cdot 3 = 0$ y la columna $(4, 6)$ es el doble de $(2, 3)$.'),
      xpHaz('fichas', 'Arma la inversa de A = [3 5; 1 2]. Aquí ad − bc = 6 − 5 = 1, así que no hay que dividir.', {
        slots: [{ x: 196, y: 50, w: 50, h: 36 }, { x: 262, y: 50, w: 50, h: 36 }, { x: 196, y: 96, w: 50, h: 36 }, { x: 262, y: 96, w: 50, h: 36 }], alto: 124,
        fondo: K => K.t(20, 44, 'A =', 's', 'start') + mat(K, 76, 40, [[3, 5], [1, 2]], 's') + K.t(160, 79, 'A⁻¹ =', 's', 'end') + brackets(K, 164, 294, 26, 120),
        fichas: ['−5', '3', '5', '2', '−1', '1'], meta: ['2', '−5', '−1', '3'], pista: 'La diagonal se intercambia: el 3 y el 2 cambian de lugar; el 5 y el 1 solo cambian de signo.' },
      'Inversa de $\\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$: $\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$, porque $ad - bc = 1$.')],
    ['Matrices elementales',
      xpMira('dibujo', 'Las operaciones de fila también son matrices: las **elementales**.', { dib: elemental, v: { k: 0 }, alto: 190 }, [
        ['Una matriz elemental es la identidad después de una sola operación de fila.', {}],
        ['Si en I le sumas a la fila 3 cuatro veces la fila 1, sale esta matriz E.', { k: 1 }],
        ['Multiplicar E·A le hace a A esa misma operación: E es la operación escrita como matriz.', { k: 2 }],
        ['Para deshacerla, se resta cuatro veces la fila 1. Esa es E⁻¹, y también es elemental.', { k: 3 }],
        ['Cada operación tiene su contraria: el intercambio se repite, multiplicar se divide y sumar se resta.', { k: 4 }],
        ['Si A llega a I con operaciones de fila, A tiene inversa: es un producto de elementales.', { k: 5 }],
      ], 'E es I con una operación de fila; $EA$ hace esa operación sobre A y $E^{-1}$ es la operación contraria.'),
      xpHaz('fichas', 'Pon al lado de cada operación de fila la que la deshace.', {
        slots: [0, 1, 2].map(i => ({ x: 238, y: 26 + i * 46, w: 150, h: 36 })), alto: 140,
        fondo: K => ['R₁ ↔ R₃', 'R₂ → 6R₂', 'R₂ → R₂ − 2R₃'].map((t, i) => K.t(16, 31 + i * 46, t, 's', 'start') + K.ar(124, 26 + i * 46, 154, 26 + i * 46, 'lm')).join(''),
        fichas: ['R₂ → 6R₂', 'R₂ → R₂ + 2R₃', 'R₁ ↔ R₃', 'R₂ → −6R₂', 'R₂ → ⅙R₂'], meta: ['R₁ ↔ R₃', 'R₂ → ⅙R₂', 'R₂ → R₂ + 2R₃'], pista: 'Repetir un intercambio lo deshace; multiplicar por 6 se deshace dividiendo; restar se deshace sumando.' },
      'Intercambio: se repite. Multiplicar por 6: dividir entre 6. Restar $2R_3$: sumarlo.')],
    ['Deshacer en orden contrario',
      xpMira('dibujo', 'Cuando se aplican dos matrices, ¿en qué orden se deshacen?', { dib: capas, v: { k: 0 }, alto: 210 }, [
        ['Ponerse medias y zapatos es aplicar dos matrices: primero A, la media.', { k: 1 }],
        ['Después B, el zapato. Lo que queda puesto es BA: la matriz de la derecha actúa primero.', { k: 2 }],
        ['Para quitarlos, primero sale el zapato con B⁻¹, y después la media con A⁻¹.', { k: 3 }],
        ['Por eso (BA)⁻¹ = A⁻¹B⁻¹: las inversas van en el orden contrario.', { k: 4 }, '$(BA)^{-1} = A^{-1}B^{-1}$'],
        ['Con la transpuesta pasa algo parecido: la inversa de Aᵀ es la transpuesta de A⁻¹.', { k: 5 }, '$(A^T)^{-1} = (A^{-1})^T$'],
      ], 'Se deshace en orden contrario: $(AB)^{-1} = B^{-1}A^{-1}$; y $(A^T)^{-1} = (A^{-1})^T$.'),
      xpHaz('fichas', 'Un dato x pasa por C, luego por D y luego por F: y = FDCx. Pon las inversas que recuperan x.', {
        slots: [{ x: 132, y: 56, w: 52, h: 38 }, { x: 192, y: 56, w: 52, h: 38 }, { x: 252, y: 56, w: 52, h: 38 }], alto: 100,
        fondo: K => K.t(96, 61, 'x =', '', 'end') + K.t(286, 61, 'y', '', 'start') + K.t(170, 18, 'y = F · D · C · x', 's tm'),
        fichas: ['F⁻¹', 'C⁻¹', 'F', 'D⁻¹', 'C'], meta: ['C⁻¹', 'D⁻¹', 'F⁻¹'], pista: 'F fue la última en actuar: su inversa es la primera en quitarse, pegada a y.' },
      '$x = C^{-1}D^{-1}F^{-1}y$: la última capa, F, se quita primero.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Una torta usa 1 taza de azúcar y 2 de harina; un ponqué, 1 y 3. Se gastaron 5 tazas de azúcar y 13 de harina. Usa A⁻¹ y marca cuántos de cada uno.', {
        dib: recetas, v: { x: 0, y: 0 }, metas: { x: 2, y: 3 }, alto: 220,
        manijas: [{ k: ['x', 'y'], min: 0, max: 6, paso: 1, en: v => [PO[0] + v.x * PU, PO[1] - v.y * PU], de: (x, y) => [(x - PO[0]) / PU, (PO[1] - y) / PU] }],
        lee: v => `$A ${pm([[v.x], [v.y]])} = ${pm([[v.x + v.y], [2 * v.x + 3 * v.y]])}$`, pista: 'Multiplica A⁻¹ por (5, 13): fila por columna. La primera fila da las tortas.' },
      '$A^{-1}\\vec b = (3 \\cdot 5 - 13,\\ -2 \\cdot 5 + 13) = (2, 3)$: 2 tortas y 3 ponqués.')],
  ], 'Una matriz se deshace con su inversa si $ad - bc \\neq 0$; las elementales son operaciones de fila; todo se deshace al revés.');
}
