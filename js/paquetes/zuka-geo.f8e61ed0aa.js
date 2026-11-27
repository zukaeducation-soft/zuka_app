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
