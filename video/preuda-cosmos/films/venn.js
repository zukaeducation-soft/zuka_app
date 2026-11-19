// «Operaciones y Venn» · escenas de la lección pu-cj-1. Motor en kit.js, preu.js y piezas.js; guion en venn.data.js.
// El conjunto A en cian, el B en ámbar, la intersección en lima, lo de afuera en violeta y el resultado en verde.
const A_ = C.cyan, B_ = C.amber, MID = C.lime, OUT = C.violet, RES = C.green, BAD = C.mag;
// Venn de dos conjuntos en el universo; paint(z) con z en 'a', 'ab', 'b', 'u' da el color de relleno; nums escribe cada zona.
function venn2(cy, o = {}) {
  const r = o.r || 210, ax = CX - 130, bx = CX + 130, W = 920, H = 2 * r + 120;
  const fillZ = (z, col) => { X.save(); X.beginPath(); if (z === 'u') { X.rect(CX - W / 2, cy - H / 2, W, H); X.moveTo(ax + r, cy); X.arc(ax, cy, r, 0, 7); X.clip('evenodd'); X.beginPath(); X.rect(CX - W / 2, cy - H / 2, W, H); X.moveTo(bx + r, cy); X.arc(bx, cy, r, 0, 7); X.fillStyle = hexA(col, .25); X.fill('evenodd'); X.restore(); return; }
    if (z === 'ab') { X.arc(ax, cy, r, 0, 7); X.clip(); X.beginPath(); X.arc(bx, cy, r, 0, 7); }
    else { const [p, q] = z === 'a' ? [ax, bx] : [bx, ax]; X.arc(p, cy, r, 0, 7); X.clip(); X.beginPath(); X.rect(0, 0, 1080, 1920); X.moveTo(q + r, cy); X.arc(q, cy, r, 0, 7, true); }
    X.fillStyle = hexA(col, .3); X.fill(); X.restore(); };
  if (o.paint) ['u', 'a', 'ab', 'b'].forEach(z => { const c = o.paint(z); if (c) fillZ(z, c); });
  stroke('rgba(200,210,240,.6)', 2, () => X.rect(CX - W / 2, cy - H / 2, W, H), { g: 0 });
  ring(ax, cy, r, A_, 3); ring(bx, cy, r, B_, 3);
  if (o.la) mono(o.la, ax - 90, cy - r - 16, A_, { s: 24 }); if (o.lb) mono(o.lb, bx + 90, cy - r - 16, B_, { s: 24 });
  if (o.nums) { const P = { a: [ax - 90, cy], ab: [CX, cy], b: [bx + 90, cy], u: [CX - W / 2 + 80, cy + H / 2 - 30] }; Object.entries(o.nums).forEach(([z, v]) => v != null && bigT(String(v), P[z][0], P[z][1] + 16, z === 'ab' ? MID : z === 'u' ? OUT : C.ink, o.ns || 46)); }
}
const S = {
  // 1 · El reto: dos idiomas.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['En una empresa trabajan 200 empleados. El 60 % habla inglés,', 'el 25 % habla francés y el 30 % no habla ninguno de los dos', 'idiomas. La cantidad de empleados que habla los dos idiomas es:'], opts: ['30', '15', '50', '20'], ok: 0 });
    fade(A(t, 9.6, .6), () => venn2(1150, { la: 'inglés 60 %', lb: 'francés 25 %', r: 190, nums: t > 11 ? { u: '30 %', ab: '?' } : null }));
  },
  // 2 · Las cuatro zonas.
  zonas(t) {
    stars(t, .3);
    venn2(860, { la: 'A', lb: 'B', paint: z => (t > 9.2 && z !== 'u' ? { a: A_, ab: MID, b: B_ }[z] : t > 18.2 && z === 'u' ? OUT : null) });
    fade(A(t, 9.4, .5), () => { mono('solo A', CX - 220, 870, A_, { s: 26 }); mono('los dos', CX, 870, MID, { s: 26 }); mono('solo B', CX + 220, 870, B_, { s: 26 }); });
    fade(A(t, 18.4, .5), () => mono('ninguno', CX - 360, 1150, OUT, { s: 26 }));
  },
  // 3 · Las operaciones.
  operaciones(t) {
    stars(t, .3);
    const ph = t < 4.6 ? 0 : t < 9 ? 1 : t < 18 ? 2 : 3;
    const P = [z => (z === 'u' ? null : RES), z => (z === 'ab' ? RES : null), z => (z === 'a' ? RES : null), z => (z === 'a' || z === 'ab' ? null : RES)][ph];
    venn2(860, { la: 'A', lb: 'B', paint: P });
    F([[['A ∪ B', 'r', RES], ['   A o B', 'r', C.mute]], [['A ∩ B', 'r', RES], ['   A y B', 'r', C.mute]], [['A − B', 'r', RES], ['   A pero no B', 'r', C.mute]], [['Aᶜ', 'r', RES], ['   lo que no es A', 'r', C.mute]]][ph], CX, 1260, 52);
  },
  // 4 · Problema: perros y gatos.
  perros(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una encuesta a 60 familias de un barrio se encontró que 32', 'tienen perro, 25 tienen gato y 8 tienen perro y gato. Las', 'familias encuestadas que no tienen perro ni gato son:'], opts: ['11', '3', '19', '35'], ok: 0, rv: 22.6 });
    fade(A(t, 9.8, .5), () => {
      venn2(1110, { la: 'perro 32', lb: 'gato 25', r: 180, nums: { ab: t > 10.4 ? 8 : null, a: t > 12 ? 24 : null, b: t > 12 ? 17 : null, u: t > 20.4 ? 11 : null } });
      fade(A(t, 12.6, .5), () => F([['32 + 25 − 8 = ', 'r'], ['49', 'r', MID], ['   60 − 49 = ', 'r'], ['11', 'r', t > 20.4 ? RES : C.ink]], CX, 1430, 40));
    });
  },
  // 5 · El doble conteo.
  doble(t) {
    stars(t, .3);
    venn2(820, { la: 'A', lb: 'B', paint: z => (z === 'ab' && t > 1 ? MID : null) });
    fade(A(t, 1.4, .5), () => mono('contada dos veces', CX, 830, MID, { s: 22 }));
    fade(A(t, 9.2, .5), () => F([['n(A ∪ B) = n(A) + n(B) − ', 'r'], ['n(A ∩ B)', 'r', MID]], CX, 1170, 44));
    fade(A(t, 18.2, .5), () => F([['n(A) + n(B) − n(A ∪ B) = ', 'r'], ['n(A ∩ B)', 'r', RES]], CX, 1260, 40));
  },
  // 6 · Con porcentajes.
  porcentajes(t) {
    stars(t, .3);
    venn2(820, { la: 'fútbol 70 %', lb: 'tenis 50 %', nums: { u: t > 2 ? '10 %' : null, ab: t > 18.2 ? '30 %' : null } });
    fade(A(t, 9.2, .5), () => { F([['alguno: 100 − 10 = ', 'r'], ['90 %', 'r', C.ink]], CX, 1170, 42); F([['70 + 50 = ', 'r'], ['120 %', 'r', BAD]], CX, 1240, 42); });
    fade(A(t, 18.2, .5), () => F([['120 − 90 = ', 'r'], ['30 %', 'r', MID], [' los dos', 'r']], CX, 1320, 44));
  },
  // 7 · Solo y exactamente uno.
  solo(t) {
    stars(t, .3);
    venn2(820, { la: 'fútbol', lb: 'tenis', nums: { u: '10 %', ab: '30 %', a: t > .8 ? '40 %' : null, b: t > 9.2 ? '20 %' : null }, ns: 40, paint: z => (t > 18.2 && (z === 'a' || z === 'b') ? RES : null) });
    fade(A(t, 18.4, .5), () => { F([['40 + 20 = ', 'r'], ['60 %', 'r', RES], [' exactamente uno', 'r']], CX, 1170, 44); mono('40 + 30 + 20 + 10 = 100', CX, 1240, C.mute, { s: 26 }); });
  },
  // 8 · Desde el centro.
  centro(t) {
    stars(t, .3);
    venn2(820, { la: 'A', lb: 'B', paint: z => (z === 'ab' && t > .8 ? MID : (z === 'a' || z === 'b') && t > 9.2 ? (z === 'a' ? A_ : B_) : z === 'u' && t > 18.2 ? OUT : null) });
    [['1', CX, 830, .8, MID], ['2', CX - 220, 830, 9.2, A_], ['2', CX + 220, 830, 9.2, B_], ['3', CX - 380, 1120, 18.2, OUT]].forEach(([n, x, y, t0, c]) => fade(A(t, t0, .4), () => nodeC(x, y, 34, c, n, { s: 34 })));
    fade(A(t, 18.4, .5), () => mono('centro → lunas → afuera', CX, 1200, C.ink, { s: 28 }));
  },
  // 9 · Los idiomas resueltos.
  resolver(t) {
    stars(t, .3);
    venn2(800, { la: 'inglés 60 %', lb: 'francés 25 %', r: 200, nums: { u: '30 %', ab: t > 10.2 ? '15 %' : null, a: t > 20.2 ? '45 %' : null, b: t > 20.2 ? '10 %' : null }, ns: 40 });
    fade(A(t, 1, .5), () => F([['alguno: 70 %     60 + 25 = 85 %', 'r']], CX, 1140, 40));
    fade(A(t, 10.2, .5), () => F([['85 − 70 = 15 %  →  15 % de 200 = ', 'r'], ['30', 'r', RES]], CX, 1220, 40));
    fade(A(t, 20.2, .5), () => mono('solo francés: 10 % = 20 empleados', CX, 1300, B_, { s: 26 }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['30', '15', '50', '20'], 0, [['15 % de 200 = ', 'r'], ['30', 'r', RES]]);
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['4 zonas = total', 'r']], 'el diagrama'], [[['A + B − A ∩ B', 'r']], 'la unión'], [[['lo que sobra', 'r']], 'la intersección'], [[['centro → afuera', 'r']], 'el orden']], 420, 170, 42);
      endCard(t, 19.6, D.TITLE, D.LINE, [A_, B_, MID]);
    });
  },
};
