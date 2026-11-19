// «Perímetros, áreas y círculos» · escenas de la lección pu-ge-4. Motor en kit.js, preu.js y piezas.js; guion en areas.data.js.
// El borde en lima, el relleno en cian, la pieza que se mueve en ámbar, las curvas en violeta y el resultado en verde.
const EDGE = C.lime, FILL = C.cyan, MOV = C.amber, CUR = C.violet, RES = C.green, BAD = C.mag;
const WH = 'rgba(225,232,255,.9)';
const sp2 = (s, c) => [String(s), 'sp', c];
const rot = (p, M, a) => { const c = Math.cos(a * DEG), s = Math.sin(a * DEG), x = p[0] - M[0], y = p[1] - M[1]; return [M[0] + x * c - y * s, M[1] + x * s + y * c]; };
// Pista: rectángulo de L × W px centrado en (cx, cy) con un semicírculo en cada extremo; o.parts colorea por tramos.
function track(cx, cy, L, W, o = {}) {
  const r = W / 2, x0 = cx - L / 2, x1 = cx + L / 2, c = o.cols || [WH, WH, WH, WH];
  if (o.fill) { X.save(); X.beginPath(); X.moveTo(x0, cy - r); X.lineTo(x1, cy - r); X.arc(x1, cy, r, -Math.PI / 2, Math.PI / 2); X.lineTo(x0, cy + r); X.arc(x0, cy, r, Math.PI / 2, Math.PI * 1.5); X.closePath(); X.fillStyle = hexA(FILL, o.fill); X.fill(); X.restore(); }
  segL([x0, cy - r], [x1, cy - r], c[0], 1, 4); segL([x1, cy + r], [x0, cy + r], c[2], 1, 4);
  stroke(c[1], 4, () => X.arc(x1, cy, r, -Math.PI / 2, Math.PI / 2)); stroke(c[3], 4, () => X.arc(x0, cy, r, Math.PI / 2, Math.PI * 1.5));
  if (o.inner) stroke(hexA(C.mute, .7), 2, () => { X.moveTo(x0, cy - r); X.lineTo(x0, cy + r); X.moveTo(x1, cy - r); X.lineTo(x1, cy + r); }, { dash: [8, 8], g: 0 });
}
const S = {
  // 1 · El reto: la pista de atletismo.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Una pista de atletismo está formada por un rectángulo de', '100 m de largo y 60 m de ancho, y dos semicírculos cuyos', 'diámetros son los lados de 60 m. La longitud del borde', 'de la pista, en metros, es:'], opts: [[['200 + 60π', 'r']], [['200 + 30π', 'r']], [['320 + 60π', 'r']], [['200 + 120π', 'r']]], ok: 0 });
    fade(A(t, 9.6, .6), () => {
      track(CX, 1150, 500, 300, { inner: true, fill: .08 });
      fade(A(t, 10.6, .5), () => { mono('100 m', CX, 980, C.ink, { s: 26 }); mono('60 m', CX + 250 - 20, 1160, C.ink, { s: 24, a: 'r' }); });
      const k = seg(t, 13, 18.5), L = 2 * 500 + Math.PI * 300, s = k * L; let p;
      if (s < 500) p = [CX - 250 + s, 1000]; else if (s < 500 + Math.PI * 150) { const a = (s - 500) / 150; p = [CX + 250 + 150 * Math.sin(a), 1150 - 150 * Math.cos(a)]; } else if (s < 1000 + Math.PI * 150) p = [CX + 250 - (s - 500 - Math.PI * 150), 1300]; else { const a = (s - 1000 - Math.PI * 150) / 150; p = [CX - 250 - 150 * Math.sin(a), 1150 + 150 * Math.cos(a)]; }
      if (k > 0) dot(p[0], p[1], 12, EDGE, 22);
    });
  },
  // 2 · Borde y relleno de un patio de 7 × 4.
  perimetro(t) {
    stars(t, .3);
    const u = 90, x0 = 270, y0 = 560, w = 6 * u, h = 4 * u;
    stroke(WH, 3, () => X.rect(x0, y0, w, h), { g: 6 });
    const k = seg(t, 1.6, 7.2), per = 2 * (w + h), s = k * per;
    if (k > 0) { stroke(EDGE, 6, () => { X.moveTo(x0, y0); let left = s; const pts = [[x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0]]; let prev = [x0, y0]; for (const q of pts) { const d = dist(prev, q); if (left <= d) { X.lineTo(...mid(prev, q, left / d)); break; } X.lineTo(...q); left -= d; prev = q; } }); }
    bigT(String(Math.round(k * 20)), CX, 1060, EDGE, 60); mono('metros de cerca', CX, 1110, C.mute);
    fade(A(t, 9, .4), () => {
      const n = Math.round(24 * seg(t, 9.4, 14));
      for (let i = 0; i < n; i++) { const r = Math.floor(i / 6), c = i % 6; X.save(); X.fillStyle = hexA(FILL, .3); X.fillRect(x0 + c * u + 4, y0 + r * u + 4, u - 8, u - 8); X.restore(); }
      bigT(String(n), CX, 1230, FILL, 60); mono('baldosas de 1 m²', CX, 1280, C.mute);
    });
    fade(A(t, 18.4, .5), () => F([['P = 20 m', 'r', EDGE], ['     ', 'r'], ['A = 24 m', 'r', FILL], sp2(2, FILL)], CX, 1400, 54));
  },
  // 3 · Paralelogramo: cortar y pegar.
  paralelogramo(t) {
    stars(t, .3);
    const u = 80, y1 = 1100, y0 = y1 - 5 * u, a = [180, y1], b = [180 + 7 * u, y1], c = [180 + 9 * u, y0], d = [180 + 2 * u, y0];
    const m = eio(seg(t, 9.4, 12.4)) * 7 * u;
    polyL([[d[0], y1], b, c, d], FILL, { fill: .18, lw: 2 });
    polyL([[a[0] + m, y1], [d[0] + m, y1], [d[0] + m, y0]], MOV, { fill: .3, lw: 2 });
    fade(1 - seg(t, 9.4, 10), () => polyL([a, b, c, d], WH, { lw: 3 }));
    segL([d[0], y0], [d[0], y1], EDGE, eo(seg(t, 2.4, 3.6)), 3, { dash: [8, 6] });
    fade(A(t, 3.6, .4), () => { rightA([d[0], y1], 0, 18, EDGE); mono('h = 5', d[0] - 70, y0 + 2.5 * u, EDGE, { s: 26 }); mono('b = 7', (a[0] + b[0]) / 2 + 40, y1 + 46, C.ink, { s: 26 }); });
    fade(A(t, 4.6, .4), () => { if (t < 9.4) mono('lado inclinado ≠ altura', 140, y0 - 30, BAD, { s: 22, a: 'l' }); });
    fade(A(t, 18.2, .5), () => F([['A = b · h = 7 · 5 = ', 'r'], ['35', 'r', RES]], CX, 1300, 56));
  },
  // 4 · Triángulo: la mitad de un paralelogramo.
  triangulo(t) {
    stars(t, .3);
    const u = 70, y1 = 1100, p = [120, y1], q = [120 + 9 * u, y1], r = [340, y1 - 4 * u], M = mid(q, r);
    polyL([p, q, r], FILL, { fill: .2, lw: 3 });
    const a = 180 * eio(seg(t, 9.4, 12));
    fade(A(t, 9, .4), () => polyL([p, q, r].map(v => rot(v, M, a)), MOV, { fill: .2, lw: 3 }));
    segL(r, [r[0], y1], EDGE, eo(seg(t, 2, 3)), 3, { dash: [8, 6] });
    fade(A(t, 3, .4), () => { mono('h = 4', r[0] - 66, y1 - 2 * u, EDGE, { s: 26 }); mono('b = 9', (p[0] + q[0]) / 2, y1 + 46, C.ink, { s: 26 }); });
    fade(A(t, 12.6, .5), () => F([['9 · 4 = 36', 'r', MOV]], CX, 640, 52));
    fade(A(t, 18.2, .5), () => F([['A = ', 'r'], ['b · h', 'r'], [' / 2 = 36 / 2 = ', 'r'], ['18', 'r', RES]], CX, 1300, 56));
  },
  // 5 · Trapecio: dos copias hacen un paralelogramo.
  trapecio(t) {
    stars(t, .3);
    const u = 45, y1 = 1080, y0 = y1 - 4 * u, P = [[90, y1], [90 + 11 * u, y1], [90 + 8 * u, y0], [90 + 3 * u, y0]], M = mid(P[1], P[2]);
    polyL(P, FILL, { fill: .2, lw: 3 });
    fade(A(t, 2, .4), () => { mono('B = 11', 90 + 5.5 * u, y1 + 46, C.ink, { s: 24 }); mono('b = 5', 90 + 5.5 * u, y0 - 22, C.ink, { s: 24 }); segL([90 + 3 * u, y0], [90 + 3 * u, y1], EDGE, 1, 2.5, { dash: [8, 6] }); mono('h = 4', 90 + 3 * u - 56, y0 + 2 * u + 8, EDGE, { s: 22 }); });
    const a = 180 * eio(seg(t, 9.4, 12));
    fade(A(t, 9, .4), () => polyL(P.map(v => rot(v, M, a)), MOV, { fill: .2, lw: 3 }));
    fade(A(t, 12.6, .5), () => { brc(90, 90 + 16 * u, y1 + 70, NOWC(), 1); mono('11 + 5 = 16', 90 + 8 * u, y1 + 150, MOV, { s: 26 }); });
    fade(A(t, 18.2, .5), () => F([['(11 + 5) · 4 / 2 = ', 'r'], ['32', 'r', RES]], CX, 1400, 54));
  },
  // 6 · π al desenrollar una rueda.
  pi(t) {
    stars(t, .3);
    const r = 90, y = 1000, x0 = 140, th = 2 * Math.PI * eio(seg(t, 1.4, 7.4)), cx = x0 + r * th;
    segL([100, y], [1000, y], 'rgba(225,232,255,.5)', 1, 2, { g: 0 });
    segL([x0, y], [cx, y], EDGE, 1, 6);
    ring(cx, y - r, r, CUR, 4); stroke(CUR, 3, () => { X.moveTo(cx, y - r); X.lineTo(cx - r * Math.sin(th), y - r + r * Math.cos(th)); });
    dot(cx - r * Math.sin(th), y - r + r * Math.cos(th), 9, EDGE, 16);
    fade(A(t, 9.4, .5), () => {
      for (let i = 0; i < 3; i++) fade(A(t, 9.6 + i * .8, .4), () => { const a = x0 + i * 2 * r; segL([a + 3, y + 40], [a + 2 * r - 3, y + 40], MOV, 1, 5); mono('d', a + r, y + 86, MOV, { s: 28 }); });
      fade(A(t, 12.4, .4), () => { segL([x0 + 6 * r + 3, y + 40], [x0 + 2 * Math.PI * r, y + 40], BAD, 1, 5); mono('0.14 d', x0 + 6.6 * r, y + 86, BAD, { s: 22 }); });
      fade(A(t, 13.6, .5), () => F([['π ≈ 3.14', 'r', CUR]], CX, 660, 64));
    });
    fade(A(t, 20.2, .5), () => F([['L = π · ', 'r'], ['d', 'i', MOV], [' = 2π · ', 'r'], ['r', 'i', CUR]], CX, 1260, 62));
  },
  // 7 · El área del círculo: tajadas que forman un rectángulo.
  circulo(t) {
    stars(t, .3);
    const r = 200, n = 16, da = 360 / n, O = [CX, 700], m = eio(seg(t, 9.6, 13));
    for (let j = 0; j < n; j++) {
      const col = j % 2 ? FILL : MOV;
      fade(1 - m, () => wedge(O, r, 90 - j * da - da, 90 - j * da, col, .3));
      const w = 2 * Math.PI * r / n, x0 = CX - (n * w / 2 + w / 2) / 2, xc = x0 + j * w / 2 + w / 2;
      fade(m, () => (j % 2 ? wedge([xc, 1260], r, 90 - da / 2, 90 + da / 2, col, .3) : wedge([xc, 1060], r, 270 - da / 2, 270 + da / 2, col, .3)));
    }
    fade(A(t, 13.4, .5), () => { mono('π · r', CX, 1310, EDGE, { s: 28 }); mono('r', 160, 1170, CUR, { s: 30 }); });
    fade(A(t, 20.2, .5), () => { F([['A = π · ', 'r'], ['r', 'i', CUR], sp2(2, CUR)], CX, 600, 64); F([['r = 7  →  A = ', 'r'], ['49π', 'r', RES]], CX, 700, 46); });
  },
  // 8 · Problema: la ventana.
  ventana(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Una ventana tiene la forma de un rectángulo de 2 m de', 'ancho y 1 m de alto, con un semicírculo encima cuyo', 'diámetro es el ancho del rectángulo. El área de la', 'ventana, en m², es:'], opts: [[['2 + π/2', 'r']], [['2 + π', 'r']], [['2 + 2π', 'r']], [['4 + π/2', 'r']]], ok: 0, rv: 23 });
    fade(A(t, 3, .5), () => {
      const u = 180, x0 = CX - u, y1 = 1360, y0 = y1 - u;
      X.save(); X.fillStyle = hexA(FILL, t > 10 ? .3 : .08); X.fillRect(x0, y0, 2 * u, u); X.restore();
      if (t > 20) { X.save(); X.beginPath(); X.moveTo(x0, y0); X.arc(CX, y0, u, Math.PI, 0); X.closePath(); X.fillStyle = hexA(CUR, .3); X.fill(); X.restore(); }
      stroke(WH, 3, () => { X.moveTo(x0, y0); X.lineTo(x0, y1); X.lineTo(x0 + 2 * u, y1); X.lineTo(x0 + 2 * u, y0); X.arc(CX, y0, u, 0, Math.PI, true); }, { g: 8 });
      segL([x0, y0], [x0 + 2 * u, y0], hexA(C.mute, .8), 1, 2, { dash: [8, 6], g: 0 });
      mono('2 m', CX, y1 + 40, C.ink, { s: 24 }); mono('1 m', x0 + 2 * u + 50, y0 + u / 2 + 8, C.ink, { s: 24 });
      fade(A(t, 10.4, .5), () => bigT('2', CX, y0 + u / 2 + 16, FILL, 50));
      fade(A(t, 20.4, .5), () => { segL([CX, y0], at([CX, y0], 60, u), EDGE, 1, 3); mono('r = 1', CX + 70, y0 - 30, EDGE, { s: 22 }); bigT('π/2', CX - 60, y0 - 50, CUR, 40); });
    });
    fade(A(t, 22.6, .5), () => F([['2 + ', 'r'], ['π/2', 'r', CUR], ['  m', 'r'], sp2(2)], 860, 1180, 44));
  },
  // 9 · La pista resuelta.
  resolver(t) {
    stars(t, .3);
    const cx = CX, cy = 760, Lp = 500, W = 300, sh = eio(seg(t, 11, 14));
    const cols = [RES, CUR, RES, CUR];
    fade(1 - sh, () => track(cx, cy, Lp, W, { cols: t > 1 ? cols : undefined, inner: true }));
    if (sh > 0) { segL([cx - Lp / 2, cy - W / 2], [cx + Lp / 2, cy - W / 2], RES, 1, 4); segL([cx - Lp / 2, cy + W / 2], [cx + Lp / 2, cy + W / 2], RES, 1, 4); }
    fade(A(t, 2, .4), () => { mono('100 m', cx, cy - W / 2 - 20, RES, { s: 26 }); mono('100 m', cx, cy + W / 2 + 46, RES, { s: 26 }); });
    fade(A(t, 4, .4), () => mono('adentro: no es borde', cx, cy + 10, C.mute, { s: 22 }));
    fade(A(t, 10.2, .4), () => {
      const y = 1200, xr = lerp(cx + Lp / 2, CX, sh), xl = lerp(cx - Lp / 2, CX, sh), yy = lerp(cy, y, sh);
      stroke(CUR, 5, () => X.arc(xr, yy, W / 2, -Math.PI / 2, Math.PI / 2)); stroke(CUR, 5, () => X.arc(xl, yy, W / 2, Math.PI / 2, Math.PI * 1.5));
      fade(A(t, 14.2, .4), () => { segL([CX - W / 2, y], [CX + W / 2, y], MOV, 1, 3, { dash: [8, 6] }); mono('d = 60', CX, y - 16, MOV, { s: 24 }); });
    });
    fade(A(t, 20.2, .5), () => { F([['100 + 100 + ', 'r'], ['π · 60', 'r', CUR], [' = ', 'r'], ['200 + 60π', 'r', RES]], CX, 1460, 50); mono('≈ 388 m', CX, 1520, C.mute, { s: 22 }); });
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, [[['200 + 60π', 'r']], [['200 + 30π', 'r']], [['320 + 60π', 'r']], [['200 + 120π', 'r']]], 0, [['2 · 100 + π · 60 = ', 'r'], ['200 + 60π', 'r', RES]], { s: 46 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['b · h', 'r']], 'rectángulo y paralelogramo'], [[['b · h / 2', 'r']], 'triángulo'], [[['(B + b) · h / 2', 'r']], 'trapecio'], [[['2π', 'r'], ['r', 'i'], ['  ·  π', 'r'], ['r', 'i'], sp2(2)], 'circunferencia y círculo']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [EDGE, FILL, CUR]);
    });
  },
};
function NOWC() { return EDGE; }
