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
