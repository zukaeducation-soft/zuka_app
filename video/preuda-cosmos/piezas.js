// Piezas de los mundos 2 a 16 del Preuniversitario (van después de kit.js y preu.js; spec 2026-11-19-preuda-videos-razonamiento).
// Nombres que no chocan con los de las películas del mundo 1 (que declaran lab, big, brace…): mono, bigT, brc, geometría plana
// (at, segL, polyL, arcA, ticks, rightA, ptL), cuerpos (prism, cyl, cone), tablas (gridT), fichas (pill) y la balanza (scale).
const DEG = Math.PI / 180;
const mono = (s, x, y, c = C.mute, o = {}) => T(s, x, y, { k: 'mono', s: o.s || 24, a: o.a || 'c', c, ls: 1, max: o.max });
const bigT = (s, x, y, c = C.ink, sz = 64, o = {}) => T(s, x, y, { k: o.k || 'r', s: sz, a: o.a || 'c', c, g: o.g ?? (c === C.ink ? 0 : 12), max: o.max });
const jT = (s, x, y, c = '#dfe5fb', sz = 38, o = {}) => T(s, x, y, { k: 'j', s: sz, a: o.a || 'c', c, max: o.max });
// Llave horizontal de x0 a x1 a la altura y (dir 1 abre hacia abajo, −1 hacia arriba).
function brc(x0, x1, y, col, k = 1, dir = 1) {
  if (k <= 0) return; const m = (x0 + x1) / 2, h = 18 * dir;
  stroke(col, 2.5, () => { X.moveTo(x0, y); X.quadraticCurveTo(x0, y + h, x0 + 20, y + h); X.lineTo(lerp(m, x0 + 20, 1 - k) - 10, y + h); X.quadraticCurveTo(m, y + h, m, y + 2 * h); X.moveTo(m, y + 2 * h); X.quadraticCurveTo(m, y + h, m + 10, y + h); X.lineTo(lerp(m, x1 - 20, k), y + h); X.quadraticCurveTo(x1, y + h, x1, y); }, { g: 8 });
}

// ---------- geometría plana (ángulos en grados, sentido matemático: 0° a la derecha, 90° hacia arriba) ----------
const at = (p, deg, len) => [p[0] + len * Math.cos(deg * DEG), p[1] - len * Math.sin(deg * DEG)];
const angOf = (p, q) => Math.atan2(p[1] - q[1], q[0] - p[0]) / DEG;   // dirección de p hacia q
const mid = (p, q, k = .5) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
// Segmento de p a q dibujado hasta k.
function segL(p, q, col, k = 1, lw = 3, o = {}) { if (k <= 0) return; const e = mid(p, q, clamp(k)); stroke(col, lw, () => { X.moveTo(...p); X.lineTo(...e); }, o); }
// Polígono cerrado: o.fill (alfa del relleno), o.k (cuánto del borde), o.lw, o.dash, o.g.
function polyL(pts, col, o = {}) {
  const k = o.k ?? 1; if (k <= 0) return;
  if (o.fill && k >= 1) { X.save(); X.beginPath(); pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); X.fillStyle = hexA(o.fc || col, o.fill); X.fill(); X.restore(); }
  const n = pts.length, m = k * n;
  stroke(col, o.lw || 3, () => { X.moveTo(...pts[0]); for (let i = 0; i < n; i++) { const kk = clamp(m - i); if (kk <= 0) break; const q = mid(pts[i], pts[(i + 1) % n], kk); X.lineTo(...q); } }, { dash: o.dash, g: o.g });
}
// Arco de ángulo con vértice p, de d0 a d1 grados (sentido antihorario); o.lab rótulo, o.lr distancia del rótulo, o.fill.
function arcA(p, r, d0, d1, col, k = 1, o = {}) {
  if (k <= 0) return; const e = lerp(d0, d1, clamp(k));
  if (o.fill) { X.save(); X.beginPath(); X.moveTo(...p); X.arc(p[0], p[1], r, -d0 * DEG, -e * DEG, true); X.closePath(); X.fillStyle = hexA(col, o.fill * clamp(k)); X.fill(); X.restore(); }
  stroke(col, o.lw || 3, () => X.arc(p[0], p[1], r, -d0 * DEG, -e * DEG, true), { g: o.g ?? 12 });
  if (o.lab != null && k >= .99) { const q = at(p, (d0 + d1) / 2, o.lr || r + 40); T(String(o.lab), q[0], q[1] + (o.s || 34) * .35, { k: o.k || 'r', s: o.s || 34, a: 'c', c: o.lc || col, g: 8 }); }
}
// Marquitas de lados iguales (n rayitas en el punto medio de pq).
function ticks(p, q, n, col, k = 1) {
  if (k <= 0) return; const m = mid(p, q), a = angOf(p, q) + 90;
  for (let i = 0; i < n; i++) { const c = at(at(m, a - 90, (i - (n - 1) / 2) * 10), a, 0); segL(at(c, a, -12), at(c, a, 12), col, k, 3, { g: 6 }); }
}
// Cuadradito de ángulo recto en p, entre la dirección d y d + 90.
function rightA(p, d, s, col, k = 1) { if (k <= 0) return; const a = at(p, d, s), b = at(a, d + 90, s), c = at(p, d + 90, s); fade(k, () => stroke(col, 2.5, () => { X.moveTo(...a); X.lineTo(...b); X.lineTo(...c); }, { g: 6 })); }
// Punto con nombre (desplazado dx, dy).
function ptL(p, col, name, dx = 0, dy = -24, o = {}) { dot(p[0], p[1], o.r || 7, col, 14); if (name) T(name, p[0] + dx, p[1] + dy, { k: o.k || 'i', s: o.s || 38, a: 'c', c: o.c || C.ink }); }

// ---------- cuerpos (proyección oblicua sencilla) ----------
// Caja: esquina de abajo a la izquierda del frente en (x, y); ancho w, alto h, fondo d (se dibuja hacia arriba a la derecha).
function prism(x, y, w, h, d, col, o = {}) {
  const dx = d * .7, dy = -d * .5, fa = o.fill ?? .16;
  const face = (pts, a) => { X.save(); X.beginPath(); pts.forEach((p, i) => (i ? X.lineTo(...p) : X.moveTo(...p))); X.closePath(); X.fillStyle = hexA(col, a); X.fill(); X.restore(); };
  if (o.water) { const hw = h * o.water; face([[x, y], [x + w, y], [x + w + dx, y + dy], [x + w + dx, y + dy - hw], [x + w, y - hw], [x, y - hw]], .32); }
  face([[x, y - h], [x + w, y - h], [x + w + dx, y - h + dy], [x + dx, y - h + dy]], fa * 1.6);
  face([[x + w, y], [x + w + dx, y + dy], [x + w + dx, y - h + dy], [x + w, y - h]], fa);
  face([[x, y], [x + w, y], [x + w, y - h], [x, y - h]], fa * .8);
  stroke(hexA(col, .4), 1.5, () => { X.moveTo(x, y); X.lineTo(x + dx, y + dy); X.lineTo(x + w + dx, y + dy); X.moveTo(x + dx, y + dy); X.lineTo(x + dx, y - h + dy); }, { dash: [6, 7], g: 0 });
  stroke(col, o.lw || 3, () => { X.moveTo(x, y); X.lineTo(x + w, y); X.lineTo(x + w + dx, y + dy); X.lineTo(x + w + dx, y - h + dy); X.lineTo(x + dx, y - h + dy); X.lineTo(x, y - h); X.closePath(); X.moveTo(x, y - h); X.lineTo(x + w, y - h); X.lineTo(x + w + dx, y - h + dy); X.moveTo(x + w, y - h); X.lineTo(x + w, y); }, { g: o.g ?? 12 });
}
// Cilindro de base (cx, cy), radio r, alto h; o.water (0–1) lo llena; o.dash bordes punteados.
function cyl(cx, cy, r, h, col, o = {}) {
  const ry = r * .3;
  if (o.water) { const hw = h * o.water; X.save(); X.beginPath(); X.ellipse(cx, cy, r, ry, 0, 0, Math.PI); X.lineTo(cx - r, cy - hw); X.ellipse(cx, cy - hw, r, ry, 0, Math.PI, 0, true); X.closePath(); X.fillStyle = hexA(o.wc || C.cyan, .3); X.fill(); X.restore(); stroke(o.wc || C.cyan, 2, () => X.ellipse(cx, cy - hw, r, ry, 0, 0, 7), { g: 8 }); }
  if (o.fill) { X.save(); X.beginPath(); X.ellipse(cx, cy, r, ry, 0, 0, Math.PI); X.lineTo(cx - r, cy - h); X.ellipse(cx, cy - h, r, ry, 0, Math.PI, 0, true); X.closePath(); X.fillStyle = hexA(col, o.fill); X.fill(); X.restore(); }
  stroke(col, o.lw || 3, () => { X.ellipse(cx, cy - h, r, ry, 0, 0, 7); }, { g: o.g ?? 12, dash: o.dash });
  stroke(col, o.lw || 3, () => { X.moveTo(cx - r, cy - h); X.lineTo(cx - r, cy); X.ellipse(cx, cy, r, ry, 0, Math.PI, 0, true); X.lineTo(cx + r, cy - h); }, { g: o.g ?? 12, dash: o.dash });
  stroke(hexA(col, .4), 1.5, () => X.ellipse(cx, cy, r, ry, 0, Math.PI, 0, true), { dash: [6, 7], g: 0 });
  stroke(col, o.lw || 3, () => X.ellipse(cx, cy, r, ry, 0, 0, Math.PI), { g: o.g ?? 12, dash: o.dash });
}
// Cono con base en (cx, cy), radio r y alto h (punta arriba; o.down: punta abajo, con la boca arriba).
function cone(cx, cy, r, h, col, o = {}) {
  const ry = r * .3, tip = o.down ? [cx, cy + h] : [cx, cy - h];
  if (o.fill) { X.save(); X.beginPath(); X.moveTo(...tip); X.lineTo(cx - r, cy); X.ellipse(cx, cy, r, ry, 0, Math.PI, 0, !o.down); X.closePath(); X.fillStyle = hexA(col, o.fill); X.fill(); X.restore(); }
  stroke(col, o.lw || 3, () => { X.moveTo(cx - r, cy); X.lineTo(...tip); X.lineTo(cx + r, cy); }, { g: o.g ?? 12, dash: o.dash });
  stroke(col, o.lw || 3, () => X.ellipse(cx, cy, r, ry, 0, 0, 7), { g: o.g ?? 12, dash: o.dash });
}

// ---------- tablas, fichas y balanza ----------
// Tabla de doble entrada: esquina (x, y), celdas cw × ch, encabezados de filas y columnas, cell(i, j) → [texto, color] o null.
function gridT(x, y, cw, ch, rows, cols, cell, o = {}) {
  const hw = o.hw ?? cw * 1.4, hh = o.hh ?? ch * .8, k = o.k ?? 1;
  fade(k, () => {
    cols.forEach((c, j) => T(c, x + hw + (j + .5) * cw, y + hh * .62, { k: o.hk || 'mono', s: o.hs || 22, a: 'c', c: o.hc || C.mute, max: cw - 6 }));
    rows.forEach((r, i) => T(r, x + hw - 16, y + hh + (i + .62) * ch, { k: o.rk || 'j', s: o.rs || 30, a: 'r', c: o.rc || C.ink, max: hw - 20 }));
    stroke('rgba(160,180,240,.45)', 1.5, () => { for (let i = 0; i <= rows.length; i++) { X.moveTo(x + hw, y + hh + i * ch); X.lineTo(x + hw + cols.length * cw, y + hh + i * ch); } for (let j = 0; j <= cols.length; j++) { X.moveTo(x + hw + j * cw, y + hh); X.lineTo(x + hw + j * cw, y + hh + rows.length * ch); } }, { g: 0 });
    rows.forEach((_, i) => cols.forEach((_, j) => { const v = cell(i, j); if (v) T(v[0], x + hw + (j + .5) * cw, y + hh + (i + .62) * ch, { k: v[2] || 'r', s: o.cs || 36, a: 'c', c: v[1] || C.ink, g: v[1] ? 10 : 0 }); }));
  });
  return { cx: j => x + hw + (j + .5) * cw, cy: i => y + hh + (i + .5) * ch };
}
// Ficha redonda con texto (personas, casillas, cartas).
function pill(cx, cy, w, h, col, label, o = {}) {
  X.save(); X.fillStyle = hexA(col, o.fill ?? .16); X.beginPath(); X.roundRect(cx - w / 2, cy - h / 2, w, h, o.r ?? h / 2); X.fill(); X.restore();
  stroke(col, o.lw || 2.5, () => X.roundRect(cx - w / 2, cy - h / 2, w, h, o.r ?? h / 2), { g: o.g ?? 12 });
  if (label != null) T(String(label), cx, cy + (o.s || 34) * .36, { k: o.k || 'r', s: o.s || 34, a: 'c', c: o.c || C.ink, max: w - 14 });
}
// Silla o casilla numerada vacía.
function slotB(cx, cy, w, h, n, o = {}) { stroke(o.col || 'rgba(160,180,240,.5)', 2, () => X.roundRect(cx - w / 2, cy - h / 2, w, h, 12), { g: 0, dash: o.dash }); if (n != null) T(String(n), cx, cy + h / 2 + 30, { k: 'mono', s: 20, a: 'c', c: C.mute }); }
// Balanza de platillos: centro (cx, cy), inclinación tilt (−1 a 1, positivo baja la derecha), contenido de cada platillo con fn(x, y).
function scaleB(cx, cy, tilt, left, right, col = 'rgba(225,232,255,.85)') {
  const a = tilt * 12 * DEG, L = 300, lx = cx - L * Math.cos(a), ly = cy - L * Math.sin(a), rx = cx + L * Math.cos(a), ry = cy + L * Math.sin(a);
  stroke(col, 3, () => { X.moveTo(cx, cy); X.lineTo(cx, cy + 300); X.moveTo(cx - 90, cy + 300); X.lineTo(cx + 90, cy + 300); X.moveTo(lx, ly); X.lineTo(rx, ry); }, { g: 6 });
  dot(cx, cy, 9, C.lime, 14);
  [[lx, ly, left], [rx, ry, right]].forEach(([x, y, fn]) => { stroke(col, 2, () => { X.moveTo(x, y); X.lineTo(x - 110, y + 120); X.moveTo(x, y); X.lineTo(x + 110, y + 120); X.moveTo(x - 130, y + 120); X.lineTo(x + 130, y + 120); }, { g: 4 }); if (fn) fn(x, y + 120); });
}
// Nodo de un árbol o diagrama: círculo con texto.
function nodeC(x, y, r, col, label, o = {}) { X.save(); X.fillStyle = hexA(col, o.fill ?? .14); X.beginPath(); X.arc(x, y, r, 0, 7); X.fill(); X.restore(); ring(x, y, r, col, 2.5, o.k ?? 1); if (label != null) T(String(label), x, y + (o.s || 30) * .36, { k: o.font || 'r', s: o.s || 30, a: 'c', c: o.c || C.ink, max: 2 * r - 8 }); }
// Cierre común: las opciones del reto con la correcta encendida y su cuenta debajo; luego resumen y tarjeta final.
function closeOpts(t, opts, ok, formula, o = {}) {
  fade(win(t, .5, 10.8), () => {
    opts.forEach((r, i) => {
      const x = 300 + (i % 2) * 480, y = 620 + Math.floor(i / 2) * 200, good = i === ok;
      stroke(good ? C.green : C.dim, 3, () => X.roundRect(x - 200, y - 70, 400, 140, 24), { g: good ? 18 : 4 });
      T('ABCD'[i], x - 170, y + 10, { k: 'mono', s: 26, c: C.mute });
      if (Array.isArray(r)) F(r, x + 20, y + 20, o.s || 52, { max: 290, c: good ? C.green : C.dim }); else bigT(String(r), x + 20, y + 20, good ? C.green : C.dim, o.s || 52, { max: 290 });
      check(x + 160, y, 18, good, A(t, 1.5 + i * .4, .6));
    });
    if (formula) fade(A(t, 3.5, .6), () => (Array.isArray(formula) ? F(formula, CX, 1060, o.fs || 44, { max: 940 }) : jT(formula, CX, 1060, C.ink, o.fs || 40, { max: 940 })));
  });
}
// Ángulo en el vértice p entre los rayos hacia q1 y q2 (el menor de los dos): o como en arcA.
function arcV(p, q1, q2, r, col, k = 1, o = {}) {
  let a1 = angOf(p, q1), a2 = angOf(p, q2), d = ((a2 - a1) % 360 + 360) % 360;
  if (d > 180) { [a1, a2] = [a2, a1]; d = 360 - d; }
  arcA(p, r, a1, a1 + d, col, k, o);
}
// Cuña de ángulo rellena (vértice p, de d0 a d1 grados): para recortar y mover esquinas.
function wedge(p, r, d0, d1, col, a = .45) { X.save(); X.beginPath(); X.moveTo(...p); X.arc(p[0], p[1], r, -d0 * DEG, -d1 * DEG, true); X.closePath(); X.fillStyle = hexA(col, a); X.shadowColor = col; X.shadowBlur = 12; X.fill(); X.restore(); stroke(col, 2.5, () => { X.moveTo(...p); X.arc(p[0], p[1], r, -d0 * DEG, -d1 * DEG, true); X.closePath(); }, { g: 8 }); }
// Árbol de conteo que crece hacia la derecha: raíz en (x, cy), niveles con counts[i] ramas por nodo, alto total h, ancho por
// nivel dx. k (0–1) cuánto se ha dibujado; lab(nivel, índice) da el rótulo de cada nodo; cols[nivel] su color.
function treeD(x, cy, h, dx, counts, k, cols, lab) {
  const levels = [[[x, cy]]]; let n = 1;
  counts.forEach((c, l) => { n *= c; const gap = h / n, pts = []; for (let i = 0; i < n; i++) pts.push([x + (l + 1) * dx, cy - h / 2 + gap * (i + .5)]); levels.push(pts); });
  const tot = counts.length;
  for (let l = 1; l <= tot; l++) { const kk = clamp(k * tot - (l - 1)); if (kk <= 0) break;
    levels[l].forEach((p, i) => { const par = levels[l - 1][Math.floor(i / counts[l - 1])]; segL(par, p, hexA(cols[l - 1], .7), kk, 2, { g: 4 }); if (kk > .95) { dot(p[0], p[1], 6, cols[l - 1], 10); if (lab) { const s = lab(l - 1, i); if (s) T(s, p[0] + 14, p[1] + 8, { k: 'r', s: Math.min(26, h / levels[l].length * .8), c: C.ink }); } } }); }
  dot(x, cy, 8, C.ink, 12);
  return levels;
}
// Fila de casillas de decisión (centradas en cx): vals[i] el número de opciones (o null), etiquetas debajo, signos × entre ellas.
function boxes(cx, y, vals, cols, o = {}) {
  const w = o.w || 120, gap = o.gap || 170, x0 = cx - (vals.length - 1) * gap / 2;
  vals.forEach((v, i) => { const x = x0 + i * gap, kk = o.k == null ? 1 : clamp(o.k * vals.length - i); stroke(cols[i] || C.cyan, 3, () => X.roundRect(x - w / 2, y - w / 2, w, w, 16), { g: 10 }); if (v != null && kk > 0) fade(kk, () => bigT(String(v), x, y + 22, cols[i] || C.cyan, o.s || 60)); if (o.labs) mono(o.labs[i], x, y + w / 2 + 36, C.mute, { s: 20 }); if (i) T(o.op || '×', x - gap / 2, y + 16, { k: 'r', s: 44, a: 'c', c: C.mute }); });
  return i => x0 + i * gap;
}
// Gráfica de barras: base en (x0, y0), ancho w y alto h para vmax; vals con sus rótulos; cols (color por barra o uno solo).
// o.k (0–1) hace crecer las barras; o.ticks marcas del eje; o.vals escribe el valor encima; o.hl(i) resalta una barra.
function barsC(x0, y0, w, h, labs, vals, vmax, cols, o = {}) {
  const n = vals.length, bw = w / n, k = o.k ?? 1;
  (o.ticks || []).forEach(v => { const y = y0 - v / vmax * h; stroke('rgba(160,180,240,.22)', 1, () => { X.moveTo(x0, y); X.lineTo(x0 + w, y); }, { g: 0 }); T(String(v), x0 - 12, y + 8, { k: 'mono', s: 20, a: 'r', c: C.mute }); });
  stroke('rgba(225,232,255,.8)', 2.5, () => { X.moveTo(x0, y0 - h - 20); X.lineTo(x0, y0); X.lineTo(x0 + w, y0); }, { g: 4 });
  vals.forEach((v, i) => { const c = Array.isArray(cols) ? cols[i] : cols, hl = o.hl && o.hl(i), hh = v / vmax * h * clamp(k * n - i * .6); bar(x0 + i * bw + bw * .18, y0 - hh, bw * .64, hh, hl ? C.lime : c, 1, { fill: hl ? .4 : .25 }); T(labs[i], x0 + (i + .5) * bw, y0 + 34, { k: 'mono', s: 22, a: 'c', c: C.mute }); if (o.vals && hh > 0) T(String(v), x0 + (i + .5) * bw, y0 - hh - 14, { k: 'r', s: 28, a: 'c', c: hl ? C.lime : C.ink }); });
  return { x: i => x0 + (i + .5) * bw, y: v => y0 - v / vmax * h };
}
// Diagrama circular: centro O, radio R, partes [[ángulo°, color, rótulo]] desde arriba en el sentido del reloj; k dibuja.
function pieC(O, R, parts, k = 1, o = {}) {
  let a = -90;
  parts.forEach(([deg, c, lab], i) => { const a1 = a + deg * clamp(k * parts.length - i), am = (a + a + deg) / 2; if (a1 > a) { X.save(); X.beginPath(); X.moveTo(...O); X.arc(O[0], O[1], R, a * DEG, a1 * DEG); X.closePath(); X.fillStyle = hexA(c, o.hl === i ? .55 : .3); X.fill(); X.restore(); stroke(c, 2.5, () => { X.moveTo(...O); X.arc(O[0], O[1], R, a * DEG, a1 * DEG); X.closePath(); }, { g: 8 }); if (lab && a1 >= a + deg - .01) { const p = [O[0] + Math.cos(am * DEG) * R * .62, O[1] + Math.sin(am * DEG) * R * .62]; T(lab, p[0], p[1] + 10, { k: 'r', s: o.s || 26, a: 'c', c: C.ink }); } } a += deg; });
}
