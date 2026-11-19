// «Encuestas» · escenas de la lección pu-cj-2. Motor en kit.js, preu.js y piezas.js; guion en encuestas.data.js.
// Inglés en cian, francés en ámbar, alemán en violeta, lo que se mira ahora en lima y el resultado en verde.
const I_ = C.cyan, F_ = C.amber, G_ = C.violet, NOW = C.lime, RES = C.green, BAD = C.mag;
// Venn de tres conjuntos: nums con zonas a, b, c, ab, ac, bc, abc, u; hl(z) resalta un número.
function venn3(cx, cy, r, labs, nums = {}, o = {}) {
  const P = { a: [cx - r * .55, cy - r * .3], b: [cx + r * .55, cy - r * .3], c: [cx, cy + r * .6] };
  stroke('rgba(200,210,240,.6)', 2, () => X.rect(cx - r * 2.1, cy - r * 1.6, r * 4.2, r * 3.2), { g: 0 });
  [['a', I_], ['b', F_], ['c', G_]].forEach(([k, c]) => ring(P[k][0], P[k][1], r, c, 3));
  if (labs) { mono(labs[0], P.a[0] - r * .7, P.a[1] - r - 14, I_, { s: 22 }); mono(labs[1], P.b[0] + r * .7, P.b[1] - r - 14, F_, { s: 22 }); mono(labs[2], P.c[0], P.c[1] + r + 34, G_, { s: 22 }); }
  const Z = { a: [cx - r * .95, cy - r * .55], b: [cx + r * .95, cy - r * .55], c: [cx, cy + r * 1.05], ab: [cx, cy - r * .62], ac: [cx - r * .58, cy + r * .38], bc: [cx + r * .58, cy + r * .38], abc: [cx, cy + r * .05], u: [cx - r * 1.85, cy + r * 1.45] };
  Object.entries(nums).forEach(([z, v]) => { if (v == null) return; const hl = o.hl && o.hl(z); T(String(v), Z[z][0], Z[z][1] + 14, { k: 'r', s: o.s || 40, a: 'c', c: hl ? NOW : z === 'abc' ? RES : C.ink, g: hl ? 12 : 0 }); });
}
const S = {
  // 1 · El reto: el instituto de idiomas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En un instituto hay 100 estudiantes: 50 estudian inglés, 40', 'francés y 30 alemán; 15 estudian inglés y francés, 10 inglés y', 'alemán, 8 francés y alemán, y 3 los tres idiomas. Los', 'estudiantes que no estudian ninguno de los tres son:'], opts: ['10', '13', '7', '0'], ok: 0 });
    fade(A(t, 9.6, .6), () => venn3(CX, 1180, 170, ['inglés 50', 'francés 40', 'alemán 30'], t > 20 ? { u: '?' } : {}));
  },
  // 2 · Ocho zonas.
  ocho(t) {
    stars(t, .3);
    const n = { a: 1, b: 1, c: 1, ab: 2, ac: 2, bc: 2, abc: 3 };
    venn3(CX, 860, 210, ['A', 'B', 'C'], t > 9.2 ? n : {}, { hl: z => (t > 9.2 && t < 18 && z.length === 2) });
    fade(A(t, 9.6, .5), () => mono('el número dice en cuántos conjuntos está', CX, 1300, C.mute, { s: 22 }));
    fade(A(t, 18.2, .5), () => { venn3(CX, 860, 210, null, { u: '0' }, { hl: () => true }); mono('ninguno', CX - 330, 1220, NOW, { s: 24 }); });
  },
  // 3 · Del centro hacia afuera.
  centro(t) {
    stars(t, .3);
    const nums = { abc: t > .8 ? 3 : null, ab: t > 9.2 ? 12 : null, ac: t > 11 ? 7 : null, bc: t > 12 ? 5 : null, a: t > 18.2 ? 28 : null };
    venn3(CX, 860, 210, ['inglés 50', 'francés 40', 'alemán 30'], nums, { hl: z => (t > 9.2 && t < 18 && z === 'ab') || (t > 18.2 && z === 'a') });
    fade(A(t, 9.4, .5), () => F([['15 − 3 = ', 'r'], ['12', 'r', NOW], ['    10 − 3 = 7    8 − 3 = 5', 'r']], CX, 1300, 38));
    fade(A(t, 18.4, .5), () => F([['50 − 12 − 7 − 3 = ', 'r'], ['28', 'r', RES]], CX, 1380, 44));
  },
  // 4 · Problema: series y novelas.
  series(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una encuesta a 45 personas, 28 ven series, 21 ven novelas y', '6 no ven ninguna de las dos. Las personas que solo ven series,', 'y no novelas, son:'], opts: ['18', '10', '28', '22'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const r = 180, ax = CX - 120, bx = CX + 120, cy = 1130;
      stroke('rgba(200,210,240,.6)', 2, () => X.rect(CX - 430, cy - 260, 860, 520), { g: 0 }); ring(ax, cy, r, I_, 3); ring(bx, cy, r, F_, 3);
      mono('series 28', ax - 80, cy - r - 14, I_, { s: 22 }); mono('novelas 21', bx + 80, cy - r - 14, F_, { s: 22 }); bigT('6', CX - 380, cy + 230, G_, 40);
      fade(A(t, 11.6, .5), () => bigT('10', CX, cy + 16, NOW, 46)); fade(A(t, 20.4, .5), () => { bigT('18', ax - 90, cy + 16, RES, 46); bigT('11', bx + 90, cy + 16, C.ink, 46); });
      fade(A(t, 12, .5), () => F([['45 − 6 = 39     28 + 21 − 39 = ', 'r'], ['10', 'r', NOW]], CX, 1460, 38));
    });
  },
  // 5 · La x en el centro.
  incognita(t) {
    stars(t, .3);
    const r = 190, ax = CX - 120, bx = CX + 120, cy = 800;
    stroke('rgba(200,210,240,.6)', 2, () => X.rect(CX - 440, cy - 270, 880, 540), { g: 0 }); ring(ax, cy, r, I_, 3); ring(bx, cy, r, F_, 3);
    bigT('x', CX, cy + 16, NOW, 52, { k: 'i' }); fade(A(t, 9.2, .5), () => { F([['28 − ', 'r'], ['x', 'i', NOW]], ax - 100, cy + 16, 36); F([['21 − ', 'r'], ['x', 'i', NOW]], bx + 100, cy + 16, 36); bigT('6', CX - 390, cy + 240, G_, 36); });
    fade(A(t, 10.6, .5), () => F([['(28 − ', 'r'], ['x', 'i', NOW], [') + ', 'r'], ['x', 'i', NOW], [' + (21 − ', 'r'], ['x', 'i', NOW], [') + 6 = 45', 'r']], CX, 1160, 42));
    fade(A(t, 18.2, .5), () => F([['55 − ', 'r'], ['x', 'i', NOW], [' = 45  →  ', 'r'], ['x', 'i', NOW], [' = ', 'r'], ['10', 'r', RES]], CX, 1260, 48));
  },
  // 6 · Sumar, restar, sumar.
  formula(t) {
    stars(t, .3);
    const ph = t < 9 ? 0 : t < 18 ? 1 : 2, cnt = [{ a: 1, b: 1, c: 1, ab: 2, ac: 2, bc: 2, abc: 3 }, { a: 1, b: 1, c: 1, ab: 1, ac: 1, bc: 1, abc: 0 }, { a: 1, b: 1, c: 1, ab: 1, ac: 1, bc: 1, abc: 1 }][ph];
    venn3(CX, 820, 200, ['A', 'B', 'C'], cnt, { hl: z => (ph === 0 && z.length === 2) || (ph === 1 && z === 'abc') || (ph === 2 && z === 'abc'), s: 38 });
    mono('veces que se cuenta cada zona', CX, 1235, C.mute, { s: 22 });
    F([[['A + B + C', 'r']], [['A + B + C − ', 'r'], ['AB − AC − BC', 'r', BAD]], [['A + B + C − AB − AC − BC + ', 'r'], ['ABC', 'r', RES]]][ph], CX, 1320, 40);
  },
  // 7 · Problema: la tabla del club.
  club(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En un club deportivo hay 50 socios: 30 son hombres y 10 son', 'zurdos; de los zurdos, 6 son hombres. La cantidad de hombres', 'diestros que hay en el club es:'], opts: ['24', '20', '16', '40'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      const V = [['?', '6', '30'], ['', '', ''], ['', '10', '50']];
      if (t > 20.4) V[0][0] = '24'; if (t > 22) { V[1][1] = '4'; V[1][2] = '20'; V[1][0] = '16'; V[2][0] = '40'; }
      gridT(120, 960, 230, 92, ['hombres', 'mujeres', 'total'], ['diestros', 'zurdos', 'total'], (i, j) => [V[i][j], V[i][j] === '24' ? RES : i === 2 || j === 2 ? F_ : C.ink], { hw: 190, hh: 60, cs: 40, rs: 30, hs: 26 });
    });
  },
  // 8 · Exactamente dos.
  exactamente(t) {
    stars(t, .3);
    venn3(CX, 860, 210, ['inglés', 'francés', 'alemán'], { a: 28, b: 20, c: 15, ab: 12, ac: 7, bc: 5, abc: 3, u: 10 }, { hl: z => (z.length === 2 && t > .8) || (z === 'abc' && t > 18.2) });
    fade(A(t, 9.2, .5), () => F([['exactamente dos: 12 + 7 + 5 = ', 'r'], ['24', 'r', NOW]], CX, 1320, 40));
    fade(A(t, 18.2, .5), () => F([['al menos dos: 24 + 3 = ', 'r'], ['27', 'r', RES]], CX, 1400, 40));
  },
  // 9 · Los idiomas resueltos.
  resolver(t) {
    stars(t, .3);
    venn3(CX, 800, 190, ['inglés 50', 'francés 40', 'alemán 30'], t > 20.2 ? { a: 28, b: 20, c: 15, ab: 12, ac: 7, bc: 5, abc: 3, u: 10 } : {}, { s: 34, hl: z => z === 'u' });
    F([['50 + 40 + 30 = 120', 'r']], CX, 1210, 42);
    fade(A(t, 10.2, .5), () => F([['120 − 15 − 10 − 8 + 3 = ', 'r'], ['90', 'r', NOW]], CX, 1290, 42));
    fade(A(t, 20.2, .5), () => F([['100 − 90 = ', 'r'], ['10', 'r', RES]], CX, 1380, 50));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['10', '13', '7', '0'], 0, [['120 − 33 + 3 = 90  →  100 − 90 = ', 'r'], ['10', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['8 zonas = total', 'r']], 'tres conjuntos'], [[['centro → parejas → lunas', 'r']], 'el orden'], [[['+ − +', 'r']], 'inclusión y exclusión'], [[['solo, exactamente, al menos', 'r']], 'leer con cuidado']], 420, 170, 38);
      endCard(t, 19.6, D.TITLE, D.LINE, [I_, F_, G_]);
    });
  },
};
