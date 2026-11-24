// Explora · tres escenas por datos para las lecciones de Razonamiento lógico (spec 2026-11-23-explora-leccion-interactiva):
//   dibujo   un dibujo SVG que depende de unos valores `v` (números): `dib(v, K)` devuelve el SVG con las piezas de K. En la
//            práctica se arrastran las `manijas` ([{ k, min, max, paso, en(v) → [x, y], de(x, y, v) → valor }]; con `k: [a, b]`
//            mueven dos valores) o un deslizador abajo (manija sin `en`: { k, min, max, paso, et }). Meta: `metas` {k: valor} o
//            `cumple(v)` con `sol`. En las explicaciones cada momento cambia `v` y el dibujo va solo hasta ahí.
//   fichas   fichas que se arrastran a casilleros o zonas (`slots`: { x, y, w, h, et, n }), con un `fondo(K, v)` detrás.
//   rejilla  una tabla de celdas que se tocan o se pintan arrastrando (marcas, ✓ / ✗, V / F).
// Y los ayudantes con que se escriben las lecciones: xpLec, xpMira (explicación) y xpHaz (práctica). Va después de explora.js.

// ------------------------------------------------------------------------------------------------- escribir lecciones
// xpLec(id, [[capítulo, paso, paso…], …, ['Ahora sí, un problema', paso]], idea del cierre)
function xpLec(id, caps, cierre, adios = 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.') {
  const ult = caps.length - 1, pasos = caps.flatMap(([, ...ps], c) => ps.map(p => ({ ...p, cap: c,
    texto: p.tipo === 'muestra' || c === ult ? p.texto : `**Tu turno.** ${p.texto}` })));
  EXPLORA[id] = { caps: caps.map(c => c[0]), pasos: [...pasos, { cap: ult, tipo: 'cierre', clave: id, real: '', texto: adios, idea: cierre }] };
}
// Explicación: momentos [lo que dice, lo que cambia en la escena, cuenta].
const xpMira = (escena, texto, en, momentos, idea) => ({ tipo: 'muestra', escena, texto, en, idea,
  momentos: momentos.map(([dice, d = {}, cuenta]) => ({ dice, ...(escena === 'dibujo' ? { v: d } : d), ...(cuenta ? { cuenta } : {}) })) });
const xpHaz = (tipo, texto, params, idea) => ({ tipo, texto, ...params, idea });

// ------------------------------------------------------------------------------------------------- piezas de dibujo
const XPK = {
  n: x => Math.round(x * 100) / 100,   // coordenada corta
  t: (x, y, s, cls = '', a = 'middle') => `<text class="xt ${cls}" x="${XPK.n(x)}" y="${XPK.n(y)}" style="text-anchor:${a}">${s}</text>`,
  l: (x1, y1, x2, y2, cls = '') => `<line class="xl ${cls}" x1="${XPK.n(x1)}" y1="${XPK.n(y1)}" x2="${XPK.n(x2)}" y2="${XPK.n(y2)}"/>`,
  r: (x, y, w, h, cls = '', rx = 3) => `<rect class="xf ${cls}" x="${XPK.n(x)}" y="${XPK.n(y)}" width="${XPK.n(Math.max(0, w))}" height="${XPK.n(Math.max(0, h))}" rx="${rx}"/>`,
  c: (x, y, r, cls = '') => `<circle class="xf ${cls}" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${XPK.n(Math.max(0, r))}"/>`,
  p: (pts, cls = '') => `<polygon class="xf ${cls}" points="${pts.map(q => q.map(XPK.n).join(',')).join(' ')}"/>`,
  pl: (pts, cls = '') => `<polyline class="xl ${cls}" points="${pts.map(q => q.map(XPK.n).join(',')).join(' ')}"/>`,
  // Arco y sector, en grados contra las agujas del reloj.
  at: (x, y, r, g) => [x + r * Math.cos(g * Math.PI / 180), y - r * Math.sin(g * Math.PI / 180)],
  arc(x, y, r, a, b, cls = '') {
    if (Math.abs(b - a) < 0.2) return '';
    if (Math.abs(b - a) >= 359.9) return `<circle class="xl ${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    const p = XPK.at(x, y, r, a), q = XPK.at(x, y, r, b);
    return `<path class="xl ${cls}" d="M${p.map(XPK.n)} A${r} ${r} 0 ${Math.abs(b - a) > 180 ? 1 : 0} ${b > a ? 0 : 1} ${q.map(XPK.n)}"/>`;
  },
  sec(x, y, r, a, b, cls = '') {
    if (Math.abs(b - a) < 0.2) return '';
    if (Math.abs(b - a) >= 359.9) return XPK.c(x, y, r, cls);
    const p = XPK.at(x, y, r, a), q = XPK.at(x, y, r, b);
    return `<path class="xf ${cls}" d="M${XPK.n(x)} ${XPK.n(y)} L${p.map(XPK.n)} A${r} ${r} 0 ${Math.abs(b - a) > 180 ? 1 : 0} ${b > a ? 0 : 1} ${q.map(XPK.n)} Z"/>`;
  },
  // Ángulo en el vértice V entre los rayos a P y Q (el menor), con su rótulo.
  ang(V, P, Q, r, label = '', cls = 'fa', tcls = '') {
    const g = W => Math.atan2(V[1] - W[1], W[0] - V[0]) * 180 / Math.PI;
    let a = g(P), b = g(Q); b = a + (((b - a) % 360) + 540) % 360 - 180;
    const m = XPK.at(V[0], V[1], r + 15, (a + b) / 2);
    return XPK.sec(V[0], V[1], r, a, b, cls) + (label ? XPK.t(m[0], m[1] + 5, label, tcls) : '');
  },
  ar(x1, y1, x2, y2, cls = '') {   // flecha
    const a = Math.atan2(y2 - y1, x2 - x1), q = d => `${XPK.n(x2 - 9 * Math.cos(a + d))} ${XPK.n(y2 - 9 * Math.sin(a + d))}`;
    return Math.hypot(x2 - x1, y2 - y1) < 2 ? '' : XPK.l(x1, y1, x2, y2, cls) + `<path class="xl ${cls.replace(/\bd\b/, '')}" d="M${q(0.45)} L${XPK.n(x2)} ${XPK.n(y2)} L${q(-0.45)}"/>`;
  },
  f: (f, s) => (f > 0.01 ? `<g opacity="${XPK.n(Math.min(1, f))}">${s}</g>` : ''),   // aparece poco a poco: f de 0 a 1
  // Cota horizontal o vertical con su rótulo.
  cota: (x1, y1, x2, y2, s, cls = 'tm') => XPK.l(x1, y1, x2, y2, 'lm') + (y1 === y2
    ? XPK.l(x1, y1 - 4, x1, y1 + 4, 'lm') + XPK.l(x2, y1 - 4, x2, y1 + 4, 'lm') + XPK.t((x1 + x2) / 2, y1 + 17, s, cls)
    : XPK.l(x1 - 4, y1, x1 + 4, y1, 'lm') + XPK.l(x1 - 4, y2, x1 + 4, y2, 'lm') + XPK.t(x1 + 9, (y1 + y2) / 2 + 5, s, cls, 'start')),
  // Isométrica: x hacia la derecha, y hacia el fondo, z hacia arriba, en unidades de u píxeles.
  iso: (o, u, x, y, z) => [o[0] + (x - y) * u * 0.866, o[1] - (x + y) * u * 0.5 * 0.8 - z * u],
  // Caja de a × b × c con la esquina de enfrente en o; con `rej`, se ven los cubitos.
  caja(o, u, a, b, c, cls = 'fa', rej = true) {
    const I = (x, y, z) => XPK.iso(o, u, x, y, z), q = (P, cl) => XPK.p(P, cl); let h = '';
    if (c > 0.01) h += q([I(0, 0, 0), I(a, 0, 0), I(a, 0, c), I(0, 0, c)], cls) + q([I(0, 0, 0), I(0, b, 0), I(0, b, c), I(0, 0, c)], cls);
    h += q([I(0, 0, c), I(a, 0, c), I(a, b, c), I(0, b, c)], cls);
    const L = (P, Q) => { h += XPK.l(P[0], P[1], Q[0], Q[1], 'lr'); };
    if (rej) {
      for (let k = 1; k < a; k++) { L(I(k, 0, 0), I(k, 0, c)); L(I(k, 0, c), I(k, b, c)); }
      for (let k = 1; k < b; k++) { L(I(0, k, 0), I(0, k, c)); L(I(0, k, c), I(a, k, c)); }
      for (let k = 1; k < c; k++) { L(I(0, 0, k), I(a, 0, k)); L(I(0, 0, k), I(0, b, k)); }
    }
    return h;
  },
  lerp: (a, b, t) => a + (b - a) * t,
  sig: x => String(Math.round(x * 100) / 100).replace('-', '−'),
};

// -------------------------------------------------------------------------------------------------------------- dibujo
const xpArr = x => (Array.isArray(x) ? x : [x]);
// Manijas normalizadas: un deslizador es una manija cuya posición está en la regla de abajo.
function xpManijas(p) {
  const H = p.alto || 200, sl = (p.manijas || []).filter(m => !m.en), n = sl.length;
  return (p.manijas || []).map(m => {
    const ks = xpArr(m.k), g = (q, d) => { const a = xpArr(m[q] ?? d); return ks.map((_, i) => a[i] ?? a.at(-1)); };
    const b = { ...m, ks, mn: g('min', 0), mx: g('max', 10), ps: g('paso', 1) };
    if (m.en) return b;
    const y = H - 20 - (n - 1 - sl.indexOf(m)) * 44;
    return { ...b, regla: true, y, en: v => [34 + (v[ks[0]] - b.mn[0]) / (b.mx[0] - b.mn[0]) * 272, y], de: x => b.mn[0] + (x - 34) / 272 * (b.mx[0] - b.mn[0]) };
  });
}
const xpPaso = (x, mn, mx, ps) => Math.round((Math.round((xpClamp(x, mn, mx) - mn) / ps) * ps + mn) * 1000) / 1000;

XP.dibujo = {
  ini: p => ({ v: { ...p.v } }),
  ok: (s, p) => (p.cumple ? !!p.cumple(s.v) : Object.entries(p.metas).every(([k, x]) => Math.abs(s.v[k] - x) < 1e-6)),
  sol: p => ({ v: { ...p.v, ...(p.sol || p.metas) } }),
  lee: (s, p) => (p.lee ? p.lee(s.v) : ''),
  dice: (s, p) => (p.dice ? p.dice(s.v) : ''),
};

XPD.dibujo = (stage, p, s, api) => {
  const W = 340, H = p.alto || 200, ms = p.momentos ? [] : xpManijas(p);
  let vis = { ...s.v }, stop = null, dedo = null, act = null, tocado = false, foco = 0, teclas = false;
  stage.innerHTML = `<svg class="xp-svg xd" viewBox="0 0 ${W} ${H}" ${ms.length ? 'tabindex="0" role="application"' : 'role="img"'} aria-label="${ms.length ? 'Arrastra, o usa las flechas del teclado' : 'Dibujo'}"></svg>`;
  const svg = stage.firstChild;
  function draw() {
    let h = p.dib(vis, XPK);
    ms.forEach(m => {
      const [x, y] = m.en(vis);
      if (m.regla) {
        h += XPK.l(34, m.y, 306, m.y, 'lm');
        const n = (m.mx[0] - m.mn[0]) / m.ps[0];
        if (n <= 24) for (let k = 0; k <= n; k++) h += XPK.l(34 + k / n * 272, m.y - 4, 34 + k / n * 272, m.y + 4, 'lm');
        if (m.et) h += XPK.t(34, m.y - 22, m.et, 's tm', 'start');
      }
      const t = m.rot ? m.rot(vis) : m.regla ? XPK.sig(vis[m.ks[0]]) : '', r = m.r || (t.length > 2 ? 16 : 12);
      if (!tocado) h += `<circle class="xp-halo" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r}"/>`;
      if (teclas && ms[foco] === m) h += `<circle class="xl la" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r + 4}"/>`;
      h += `<g class="xp-tok"><circle cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r}"/>${t ? `<text x="${XPK.n(x)}" y="${XPK.n(y + 5)}"${t.length > 3 ? ' style="font-size:11px"' : ''}>${t}</text>` : ''}</g>`;
    });
    svg.innerHTML = h;
  }
  const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  function pon(m, raw, vivo) {
    const nv = { ...s.v };
    m.ks.forEach((k, i) => { nv[k] = xpPaso(raw[i], m.mn[i], m.mx[i], m.ps[i]); });
    if (m.limita && !m.limita(nv)) return;
    if (!m.ks.some(k => nv[k] !== s.v[k])) return;
    XS.tick((nv[m.ks[0]] - m.mn[0]) / ((m.mx[0] - m.mn[0]) || 1) * 18 - 6); xpTick();
    s = { v: nv }; vis = { ...nv }; draw(); api.set(s, vivo);
  }
  if (ms.length) {
    svg.onpointerdown = e => {
      if (dedo != null) return;
      const [x, y] = at(e), cerca = ms.map((m, i) => { const q = m.en(s.v); return { i, d: m.regla ? (Math.abs(y - m.y) < 22 ? 0 : 999) : Math.hypot(q[0] - x, q[1] - y) }; }).sort((a, b) => a.d - b.d)[0];
      if (cerca.d > 46) return;
      dedo = e.pointerId; foco = cerca.i; act = ms[foco]; tocado = true;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      svg.classList.add('drag');
      if (act.regla) pon(act, xpArr(act.de(x, y, s.v)), true); else draw();
    };
    svg.onpointermove = e => { if (e.pointerId !== dedo || !act) return; const [x, y] = at(e); pon(act, xpArr(act.de(x, y, s.v)), true); };
    svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId !== dedo) return; dedo = null; act = null; svg.classList.remove('drag'); draw(); api.set(s); };
    svg.onkeydown = e => {
      teclas = true;
      const d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (e.key === ' ' && ms.length > 1) { e.preventDefault(); foco = (foco + 1) % ms.length; tocado = true; draw(); return; }   // espacio: otra manija
      if (!d) return;
      e.preventDefault(); tocado = true;
      const m = ms[foco];
      pon(m, m.ks.map((k, i) => s.v[k] + m.ps[i] * (m.ks.length > 1 ? d[i] : d[0] + d[1]) * (m.inv?.[i] ? -1 : 1)), true); api.set(s);
    };
  }
  draw();
  const num = x => typeof x === 'number';
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      const a = { ...vis }, b = { ...vis, ...m.v }, ks = Object.keys(m.v || {});
      if (ks.some(k => m.v[k] !== a[k])) XS.pop();
      stop = xpTween(0, 1, m.ms || (ks.length ? 1200 : 250), t => {
        vis = { ...b };
        for (const k in b) if (num(b[k]) && num(a[k]) && t < 1) vis[k] = a[k] + (b[k] - a[k]) * t;
        draw();
      }, done);
      return () => stop?.();
    },
    salta(l) { for (const m of l) vis = { ...vis, ...m.v }; draw(); },
  });
};

// -------------------------------------------------------------------------------------------------------------- fichas
// Estado: q[slot] = fichas puestas (etiquetas). `fichas`: las que hay abajo; con `repite` no se gastan. `fijas` {slot: ficha}.
const xpLista = x => (x == null ? [] : xpArr(x));
const xpIgual = (a, b) => [...a].sort().join('|') === [...b].sort().join('|');
XP.fichas = {
  ini: p => ({ q: p.slots.map((_, i) => xpLista(p.fijas?.[i])) }),
  ok: (s, p) => (p.cumple ? !!p.cumple(s.q) : p.meta.every((m, i) => xpIgual(s.q[i], xpLista(m)))),
  sol: p => ({ q: (p.sol || p.meta).map(xpLista) }),
  lee: (s, p) => (p.lee ? p.lee(s.q) : ''),
  puestas: (s, p) => s.q.reduce((n, l, i) => n + (p.fijas?.[i] != null ? 0 : l.length), 0),
  faltan: (s, p) => (p.sol || p.meta).reduce((n, l, i) => n + (p.fijas?.[i] != null ? 0 : xpLista(l).length), 0) - XP.fichas.puestas(s, p),
  dice(s, p) {
    if (p.dice) return p.dice(s.q);
    const f = XP.fichas.faltan(s, p), n = XP.fichas.puestas(s, p);
    return !n ? 'Arrastra cada ficha a su lugar. Con un toque también va o vuelve.' : f > 0 ? `${f === 1 ? 'Falta una ficha' : `Faltan ${f} fichas`}.` : 'Todas en su lugar: mira si cumplen.';
  },
  // Fichas que quedan abajo (null en el sitio de las que ya se pusieron).
  bandeja(s, p) {
    if (p.repite) return [...p.fichas];
    const u = s.q.flatMap((l, i) => (p.fijas?.[i] != null ? [] : l));
    return p.fichas.map(f => { const k = u.indexOf(f); if (k < 0) return f; u.splice(k, 1); return null; });
  },
};

XPD.fichas = (stage, p, s, api) => {
  const W = 340, HF = p.alto || 130, mira = !!p.momentos;
  const ancho = f => Math.max(36, String(f).length * 8 + 16);
  const filas = [[]];
  { let x = 0; p.fichas.forEach((f, k) => { const w = ancho(f); if (x + w > W - 8 && filas.at(-1).length) { filas.push([]); x = 0; } filas.at(-1).push(k); x += w + 8; }); }
  const H = HF + 14 + filas.length * 44, casa = [];   // casa: sitio de cada ficha en la bandeja
  filas.forEach((f, r) => { let x = (W - f.reduce((a, k) => a + ancho(p.fichas[k]) + 8, -8)) / 2; for (const k of f) { const w = ancho(p.fichas[k]); casa[k] = [x + w / 2, HF + 32 + r * 44]; x += w + 8; } });
  let v = { ...p.v }, marca = [], arr = null, stop = null, vuela = null, foco = null;
  stage.innerHTML = `<svg class="xp-svg xd xfi" viewBox="0 0 ${W} ${H}" role="group" aria-label="Fichas y casilleros"></svg>`;
  const svg = stage.firstChild, cap = i => p.slots[i].n || 1, SW = i => p.slots[i].w || 56, SH = i => p.slots[i].h || 42;
  const sitios = i => {   // dónde va cada ficha dentro de su casillero
    const sl = p.slots[i], l = s.q[i];
    if (cap(i) === 1) return l.map(() => [sl.x, sl.y]);
    const fs = [[]], out = []; let x = 0;
    l.forEach((f, k) => { const w = ancho(f); if (x + w > SW(i) - 8 && fs.at(-1).length) { fs.push([]); x = 0; } fs.at(-1).push(k); x += w + 5; });
    fs.forEach((f, r) => { let xx = sl.x - f.reduce((a, k) => a + ancho(l[k]) + 5, -5) / 2; for (const k of f) { const w = ancho(l[k]); out[k] = [xx + w / 2, sl.y + (sl.dy || 0) + (r - (fs.length - 1) / 2) * 34]; xx += w + 5; } });
    return out;
  };
  const ficha = (x, y, f, cls, data) => { const w = ancho(f); return `<g class="xfi-ch ${cls}" ${data} transform="translate(${XPK.n(x)} ${XPK.n(y)})"><rect x="${-w / 2}" y="-16" width="${w}" height="32" rx="9"/><text y="5">${f}</text></g>`; };
  const btn = (t, d) => (mira ? d : `${d} tabindex="0" role="button" aria-label="${String(t).replace(/"/g, '')}"`);
  function draw() {
    let h = p.fondo ? p.fondo(XPK, v, s.q) : '';
    p.slots.forEach((sl, i) => {
      const fija = p.fijas?.[i] != null, w = SW(i), hh = SH(i);
      if (!sl.libre) h += sl.red ? `<ellipse class="xfi-sl" cx="${sl.x}" cy="${sl.y}" rx="${w / 2}" ry="${hh / 2}"/>` : `<rect class="xfi-sl${marca.includes(i) ? ' on' : ''}" x="${sl.x - w / 2}" y="${sl.y - hh / 2}" width="${w}" height="${hh}" rx="10"/>`;
      if (sl.et) h += XPK.t(sl.x + (sl.ex || 0), sl.y + (sl.ey ?? hh / 2 + 16), sl.et, 's tm');
      const pos = sitios(i);
      s.q[i].forEach((f, k) => {
        if ((vuela && vuela.slot === i && vuela.k === k) || (arr?.mov && arr.slot === i && arr.k === k)) return;
        h += ficha(pos[k][0], pos[k][1], f, `in${fija ? ' fija' : ''}${marca.includes(i) ? ' mk' : ''}`, fija ? '' : btn(f, `data-slot="${i}" data-k="${k}"`));
      });
    });
    XP.fichas.bandeja(s, p).forEach((f, k) => {
      if (f == null || vuela?.casa === k || (arr?.mov && arr.casa === k && !p.repite)) return;
      h += ficha(casa[k][0], casa[k][1], f, '', btn(f, `data-casa="${k}"`));
    });
    if (vuela) h += ficha(vuela.x, vuela.y, vuela.f, 'in', '');
    if (arr?.mov) h += ficha(arr.x, arr.y, arr.f, 'drag', '');
    svg.innerHTML = h;
    if (mira) return;
    if (foco) { svg.querySelector(foco)?.focus?.(); foco = null; }
    svg.querySelectorAll('.xfi-ch[tabindex]').forEach(g => { g.onkeydown = e => { if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault(); foco = '.xfi-ch[tabindex]'; toca(g.dataset); }; });
  }
  const quita = (i, k) => { s = { q: s.q.map((l, j) => (j === i ? l.filter((_, m) => m !== k) : l)) }; };
  const mete = (i, f) => { s = { q: s.q.map((l, j) => (j !== i ? l : cap(i) === 1 ? [f] : l.length < cap(i) ? [...l, f] : l)) }; };
  const fin = () => {
    XS.pop(); xpTick(); api.nota(''); api.set(s); draw();
    if (!XP.fichas.ok(s, p) && XP.fichas.faltan(s, p) <= 0) { XS.nope(); api.nota(p.pista || 'Casi: algo no cumple. Mueve una ficha y vuelve a mirar.'); }
  };
  const libre = i => p.fijas?.[i] == null;
  const zonas = p.slots.every((x, i) => !libre(i) || (x.n || 1) > 1);
  function toca(d) {
    if (d.casa != null) {
      const f = p.fichas[+d.casa], i = p.slots.findIndex((_, j) => libre(j) && s.q[j].length < cap(j));
      if (i < 0) return; mete(i, f);
    } else {
      const i = +d.slot, f = s.q[i][+d.k]; quita(i, +d.k);
      if (zonas) { const j = p.slots.findIndex((_, m) => m > i && libre(m) && s.q[m].length < cap(m)); if (j >= 0) mete(j, f); }   // en zonas, cada toque la pasa a la siguiente
    }
    fin();
  }
  const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  if (!mira) {
    svg.onpointerdown = e => {
      if (arr) return;
      const g = e.target.closest('[data-casa],[data-slot]'); if (!g) return;
      const d = { ...g.dataset }, [x, y] = at(e);
      arr = { id: e.pointerId, d, f: d.casa != null ? p.fichas[+d.casa] : s.q[+d.slot][+d.k], casa: d.casa != null ? +d.casa : -1, slot: d.slot != null ? +d.slot : -1, k: +d.k, x, y, x0: x, y0: y, mov: false };
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
    };
    svg.onpointermove = e => { if (!arr || e.pointerId !== arr.id) return; [arr.x, arr.y] = at(e); if (Math.hypot(arr.x - arr.x0, arr.y - arr.y0) > 7) arr.mov = true; if (arr.mov) draw(); };
    svg.onpointercancel = e => { if (arr && e.pointerId === arr.id) { arr = null; draw(); } };
    svg.onpointerup = e => {
      if (!arr || e.pointerId !== arr.id) return;
      const a = arr; arr = null;
      if (!a.mov) return toca(a.d);
      // El casillero donde se suelta (con un margen); si hay varios, el más cercano.
      const c = p.slots.map((sl, i) => ({ i, dx: Math.abs(a.x - sl.x) - SW(i) / 2, dy: Math.abs(a.y - sl.y) - SH(i) / 2, d: Math.hypot(a.x - sl.x, a.y - sl.y) }))
        .filter(q => q.dx < 14 && q.dy < 14 && libre(q.i)).sort((q, r) => q.d - r.d)[0];
      if (a.slot >= 0) {
        if (c && c.i === a.slot) return draw();
        const sale = c && cap(c.i) === 1 ? s.q[c.i][0] : null;
        quita(a.slot, a.k);
        if (c) { mete(c.i, a.f); if (sale != null && cap(a.slot) === 1) mete(a.slot, sale); }   // dos fichas cambian de puesto
      } else if (c) mete(c.i, a.f); else return draw();
      fin();
    };
  }
  draw();
  const pasos = m => [...(m.saca || []).map(i => ({ saca: i })), ...Object.entries(m.pon || {}).flatMap(([i, l]) => xpLista(l).map(f => ({ slot: +i, f })))];
  const aplica = q => { if (q.saca != null) s = { q: s.q.map((l, i) => (i === q.saca ? [] : l)) }; else mete(q.slot, q.f); };
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      if (m.v) v = { ...v, ...m.v };
      marca = m.marca || []; draw();
      const ps = pasos(m); let i = 0, t = 0, par = null;
      const sig = () => {
        if (i >= ps.length) { t = setTimeout(done, 350); return; }
        const q = ps[i++];
        if (q.saca != null) { aplica(q); XS.tick(-8); draw(); t = setTimeout(sig, 260); return; }
        const k = XP.fichas.bandeja(s, p).indexOf(q.f), de = k >= 0 ? casa[k] : [p.slots[q.slot].x, HF + 30];
        aplica(q);
        const kk = s.q[q.slot].length - 1, a = sitios(q.slot)[kk] || [p.slots[q.slot].x, p.slots[q.slot].y];
        par = xpTween(0, 1, 420, z => { vuela = { slot: q.slot, k: kk, casa: p.repite ? -1 : k, f: q.f, x: XPK.lerp(de[0], a[0], z), y: XPK.lerp(de[1], a[1], z) }; draw(); }, () => { vuela = null; XS.pop(); draw(); t = setTimeout(sig, 140); });
      };
      sig();
      return () => { clearTimeout(t); par?.(); };
    },
    salta(l) { for (const m of l) { if (m.v) v = { ...v, ...m.v }; pasos(m).forEach(aplica); } marca = []; draw(); },
  });
};

// ------------------------------------------------------------------------------------------------------------- rejilla
// Celdas f × c con estado 0, 1 (puesta) o 2 (tachada). `rot`: rótulo de cada estado (['', '✓', '✗']); `celda(i, r, c)`: rótulo fijo;
// `filas`, `cols`: encabezados; `dados` {i: estado} (no se cambian). Meta: índices puestos, objeto {i: estado} o cumple(celdas).
XP.rejilla = {
  ini: p => ({ c: Array.from({ length: p.f * p.c }, (_, i) => p.dados?.[i] ?? 0) }),
  ok(s, p) {
    if (p.cumple) return !!p.cumple(s.c);
    if (Array.isArray(p.meta)) return s.c.every((x, i) => (x === 1) === (p.meta.includes(i) || p.dados?.[i] === 1));
    return Object.entries(p.meta).every(([i, x]) => s.c[i] === x);
  },
  sol(p) {
    const c = XP.rejilla.ini(p).c, m = p.sol || p.meta;
    if (Array.isArray(m)) m.forEach(i => { c[i] = 1; }); else for (const i in m) c[i] = m[i];
    return { c };
  },
  lee: (s, p) => (p.lee ? p.lee(s.c) : ''),
  dice: (s, p) => (p.dice ? p.dice(s.c) : s.c.some((x, i) => x && !p.dados?.[i]) ? '' : `Toca${p.unoAUno ? '' : ' o arrastra sobre'} las casillas. Otro toque las cambia.`),
};

XPD.rejilla = (stage, p, s, api) => {
  const W = 340, izq = p.filas ? (p.izq || 78) : 0, est = p.estados || 2, y0 = p.cols ? 26 : 4;
  const cw = Math.min(p.cw || 44, (W - izq - 6) / p.c), ch = p.ch || Math.min(cw, 40), x0 = (W - izq - cw * p.c) / 2 + izq, H = y0 + ch * p.f + 6 + (p.pie ? 22 : 0);
  let luz = [], txt = {}, stop = null, dedo = null, pinta = 0, ult = -1, v = { ...p.v }, cur = -1;
  stage.innerHTML = `<svg class="xp-svg xd xre" viewBox="0 0 ${W} ${H}" role="${p.momentos ? 'img' : 'application'}" aria-label="Tabla: flechas para moverse y Enter para marcar" ${p.momentos ? '' : 'tabindex="0"'}></svg>`;
  const svg = stage.firstChild, hueco = i => p.hueco?.(i, Math.floor(i / p.c), i % p.c);
  function draw() {
    let h = '';
    (p.cols || []).forEach((t, c) => { h += XPK.t(x0 + (c + 0.5) * cw, y0 - 8, t, 's'); });
    (p.filas || []).forEach((t, r) => { h += XPK.t(x0 - 8, y0 + (r + 0.5) * ch + 5, t, 's', 'end'); });
    for (let i = 0; i < p.f * p.c; i++) {
      const r = Math.floor(i / p.c), c = i % p.c, e = s.c[i], g = txt[i] ?? (p.celda ? p.celda(i, r, c) : ''), t = p.rot ? (p.rot[e] || g) : g;
      if (hueco(i)) continue;
      h += `<rect class="xre-c e${e}${luz.includes(i) ? ' luz' : ''}${i === cur ? ' cur' : ''}${p.dados?.[i] ? ' dado' : ''}" x="${XPK.n(x0 + c * cw + 1.5)}" y="${XPK.n(y0 + r * ch + 1.5)}" width="${XPK.n(cw - 3)}" height="${XPK.n(ch - 3)}" rx="${XPK.n(Math.min(7, cw / 5))}"/>`;
      if (t !== '') h += `<text class="xre-t e${e}" x="${XPK.n(x0 + (c + 0.5) * cw)}" y="${XPK.n(y0 + (r + 0.5) * ch + 5)}"${String(t).length * 8.4 > cw - 4 ? ' style="font-size:11px"' : ''}>${t}</text>`;
    }
    if (p.sobre) h += p.sobre(XPK, { x: c => x0 + c * cw, y: r => y0 + r * ch, cw, ch }, v, s.c);
    if (p.pie) h += XPK.t(W / 2, H - 4, p.pie, 's tm');
    svg.innerHTML = h;
  }
  const celda = e => {
    const b = svg.getBoundingClientRect(), x = (e.clientX - b.left) * W / b.width - x0, y = (e.clientY - b.top) * H / b.height - y0;
    const c = Math.floor(x / cw), r = Math.floor(y / ch);
    return c < 0 || r < 0 || c >= p.c || r >= p.f ? -1 : r * p.c + c;
  };
  const puede = i => i >= 0 && !p.dados?.[i] && !hueco(i);
  const pon = (i, e) => { if (s.c[i] === e) return; s = { c: s.c.map((x, k) => (k === i ? e : x)) }; XS.tick(i % 12); xpTick(); draw(); api.set(s, true); };
  // Al soltar se mira la meta; el aviso espera un poco, por si se sigue tocando (para poner ✗ se pasa por ✓).
  let aviso = 0;
  const suelta = () => {
    api.set(s); clearTimeout(aviso);
    if (p.pista) aviso = setTimeout(() => { if (!XP.rejilla.ok(s, p) && p.lleno?.(s.c)) { XS.nope(); api.nota(p.pista); } }, 900);
  };
  if (!p.momentos) {
    svg.onpointerdown = e => {
      if (dedo != null) return;
      clearTimeout(aviso);
      const i = celda(e); if (!puede(i)) return;
      dedo = e.pointerId; ult = i; pinta = (s.c[i] + 1) % est;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      pon(i, pinta);
    };
    svg.onpointermove = e => { if (e.pointerId !== dedo || p.unoAUno || est > 2) return; const i = celda(e); if (i === ult || !puede(i)) return; ult = i; pon(i, pinta); };
    svg.onpointerup = svg.onpointercancel = e => {
      if (e.pointerId !== dedo) return;
      dedo = null; suelta();
    };
    svg.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowUp: -p.c, ArrowDown: p.c }[e.key];
      if (d) { e.preventDefault(); const q = cur + d; if (cur < 0) cur = 0; else if (q >= 0 && q < p.f * p.c) cur = q; draw(); } else if ((e.key === 'Enter' || e.key === ' ') && puede(cur)) { e.preventDefault(); pon(cur, (s.c[cur] + 1) % est); suelta(); }
    };
  }
  draw();
  const pasos = m => [...(m.off || []).map(i => [i, 0]), ...(m.on || []).map(i => [i, 1]), ...(m.x || []).map(i => [i, 2])];
  const antes = m => { if (m.limpia) { s = XP.rejilla.ini(p); txt = {}; } if (m.txt) txt = { ...txt, ...m.txt }; if (m.v) v = { ...v, ...m.v }; luz = m.luz || []; };
  return Object.assign(() => { stop?.(); clearTimeout(aviso); }, {
    anima(m, done) {
      antes(m); draw(); if (m.txt || m.luz) XS.pop();
      const ps = pasos(m), dt = Math.min(260, 1500 / Math.max(1, ps.length)); let i = 0, t = 0;
      const sig = () => { if (i >= ps.length) { t = setTimeout(done, 450); return; } const [k, e] = ps[i++]; s = { c: s.c.map((x, j) => (j === k ? e : x)) }; XS.tick(i); draw(); t = setTimeout(sig, dt); };
      sig();
      return () => clearTimeout(t);
    },
    salta(l) { for (const m of l) { antes(m); for (const [k, e] of pasos(m)) s = { c: s.c.map((x, j) => (j === k ? e : x)) }; } luz = []; draw(); },
  });
};
