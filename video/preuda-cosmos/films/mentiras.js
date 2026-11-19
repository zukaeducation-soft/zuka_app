// «Verdad y mentira» · escenas de la lección pu-lo-5. Motor en kit.js, preu.js y piezas.js; guion en mentiras.data.js.
// Quien dice la verdad en verde, quien miente en magenta, lo que se supone en ámbar, lo que se mira ahora en lima y las frases en cian.
const TRU = C.green, LIE = C.mag, SUP = C.amber, NOW = C.lime, SAY = C.cyan;
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'], LIAR = [1, 1, 1, 0, 0, 0, 0];
// Fila de la semana: los días de mentira en magenta; ok(i) marca ✓ o ✗ debajo desde t0.
function week(y, t, t0, ok, o = {}) {
  DAYS.forEach((d, i) => { const x = 160 + i * 127; pill(x, y, 104, 90, LIAR[i] ? LIE : TRU, d, { s: 40, r: 16, fill: o.hl && o.hl(i) ? .4 : .14 }); if (ok) check(x, y + 90, 18, ok(i), A(t, t0 + i * .35, .5)); });
}
// Persona con su frase en un globo.
function says(x, y, name, txt, col, o = {}) { dot(x, y, 26, col, 16); mono(name, x, y + 64, col, { s: 24 }); pill(x + (o.dx ?? 330), y, o.w || 480, 80, SAY, txt, { s: o.s || 30, r: 18 }); }
const S = {
  // 1 · El reto: la semana de Pedro.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Pedro miente todos los lunes, martes y miércoles, y dice la', 'verdad los demás días de la semana. Hoy Pedro hizo dos', 'afirmaciones: «Ayer mentí» y «Dentro de tres días diré la', 'verdad». Hoy es:'], opts: ['Jueves', 'Lunes', 'Miércoles', 'Domingo'], ok: 0 });
    fade(A(t, 9.6, .6), () => { week(1020, t, 99); mono('miente', 287, 1110, LIE, { s: 22 }); mono('dice la verdad', 795, 1110, TRU, { s: 22 }); });
    fade(A(t, 10.4, .5), () => { pill(CX, 1240, 380, 84, SAY, '«Ayer mentí»', { s: 34 }); fade(A(t, 11.2, .5), () => pill(CX, 1350, 700, 84, SAY, '«Dentro de tres días diré la verdad»', { s: 32 })); });
  },
  // 2 · Suponer y buscar el choque.
  suponer(t) {
    stars(t, .3);
    says(150, 560, 'Lucía', '«Mateo miente»', t > 18 ? TRU : C.mute, { w: 420, dx: 300 });
    says(150, 720, 'Mateo', '«Lucía y yo decimos la verdad»', t > 18 ? LIE : t > 9 ? SUP : C.mute, { w: 640, dx: 400, s: 28 });
    fade(A(t, 9.4, .5), () => { pill(CX, 900, 560, 80, SUP, 'supongo: Mateo dice la verdad', { s: 28 }); arrow(CX, 945, CX, 990, C.mute, 1, 2.5, { h: 10 }); pill(CX, 1040, 560, 80, SUP, 'entonces Lucía también', { s: 28 }); arrow(CX, 1085, CX, 1130, C.mute, 1, 2.5, { h: 10 }); pill(CX, 1180, 620, 80, LIE, 'pero Lucía dice que él miente: choca', { s: 28 }); });
    fade(A(t, 18.4, .5), () => mono('se descarta: Mateo miente, Lucía dice la verdad', CX, 1300, TRU, { s: 24 }));
  },
  // 3 · Problema: la isla de los veraces.
  veraces(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['En una isla, los veraces siempre dicen la verdad y los falaces', 'siempre mienten. X le dice a un viajero: «Por lo menos uno', 'de nosotros dos es falaz». De lo anterior se concluye que:'], opts: ['X es veraz e Y es falaz', 'X es falaz e Y es veraz', 'Los dos son veraces', 'Los dos son falaces'], ok: 0, col1: true, os: 30, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      dot(300, 1240, 30, t > 20.4 ? TRU : SUP, 18); mono('X', 300, 1310, C.ink, { s: 28 }); dot(780, 1240, 30, t > 20.4 ? LIE : C.mute, 18); mono('Y', 780, 1310, C.ink, { s: 28 });
      fade(win(t, 10.4, 20), () => mono('si X fuera falaz, ya hay un falaz: la frase sería cierta', CX, 1390, LIE, { s: 22 }));
      fade(A(t, 20.4, .5), () => mono('X veraz → hay un falaz → es Y', CX, 1390, TRU, { s: 26 }));
    });
  },
  // 4 · Nadie dice «soy falaz».
  nadie(t) {
    stars(t, .3);
    pill(CX, 540, 420, 100, SAY, '«Soy falaz»', { s: 44 });
    fade(A(t, .8, .5), () => { dot(250, 720, 26, TRU, 16); mono('veraz', 250, 780, TRU, { s: 24 }); mono('estaría mintiendo', 600, 730, LIE, { s: 26 }); check(900, 720, 18, false, A(t, 1.6, .5)); });
    fade(A(t, 9.2, .5), () => { dot(250, 880, 26, LIE, 16); mono('falaz', 250, 940, LIE, { s: 24 }); mono('estaría diciendo la verdad', 600, 890, TRU, { s: 26 }); check(900, 880, 18, false, A(t, 10, .5)); });
    fade(A(t, 18.2, .5), () => { pill(CX, 1090, 420, 100, SAY, '«Soy veraz»', { s: 44 }); mono('la pueden decir los dos: no ayuda', CX, 1190, C.mute, { s: 26 }); });
  },
  // 5 · Los dos somos falaces.
  ambos(t) {
    stars(t, .3);
    says(150, 580, 'Z', '«Los dos somos falaces»', t > 9 ? LIE : SUP, { w: 560, dx: 380 });
    fade(A(t, .8, .5), () => mono('si Z fuera veraz, se llamaría falaz: imposible', CX, 720, LIE, { s: 24 }));
    fade(A(t, 9.2, .5), () => F([['Z falaz  ⇒  ', 'r', LIE], ['no son falaces los dos', 'r']], CX, 860, 44));
    fade(A(t, 18.2, .5), () => { dot(CX - 160, 1010, 26, LIE, 16); mono('Z', CX - 160, 1070, LIE, { s: 26 }); dot(CX + 160, 1010, 26, TRU, 16); mono('W veraz', CX + 160, 1070, TRU, { s: 26 }); });
  },
  // 6 · Problema: el vidrio roto.
  vidrio(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, lines: ['Uno de tres amigos rompió un vidrio. Andrés dice: «Fue', 'Bruno». Bruno dice: «Yo no fui». Camilo dice: «Yo no fui».', 'Si solo uno de los tres dice la verdad, quien rompió el vidrio es:'], opts: ['Camilo', 'Bruno', 'Andrés', 'No se sabe'], ok: 0, rv: 22.6 });
    fade(A(t, 10, .5), () => {
      const who = ['Andrés', 'Bruno', 'Camilo'], f = c => [c === 1, c !== 1, c !== 2];
      gridT(70, 920, 190, 86, who.map(w => 'si fue ' + w), ['Andrés', 'Bruno', 'Camilo', 'verdades'], (i, j) => { if (t < 10.4 + i * 2.4) return null; const v = f(i); if (j < 3) return v[j] ? ['V', TRU] : ['F', LIE]; const n = v.filter(Boolean).length; return [String(n), n === 1 ? NOW : LIE]; }, { hw: 220, hh: 56, cs: 38, rs: 28, hs: 24 });
    });
  },
  // 7 · Mentir con dos partes.
  compuesta(t) {
    stars(t, .3);
    says(150, 580, 'falaz', '«Llueve y hace frío»', LIE, { w: 520, dx: 380 });
    fade(A(t, 9.2, .5), () => { gridT(160, 720, 230, 86, ['llueve', 'no llueve'], ['frío', 'no frío'], (i, j) => i === 0 && j === 0 ? ['la frase', SAY, 'j'] : ['puede ser', NOW, 'j'], { hw: 200, hh: 56, cs: 32, rs: 30, hs: 26 }); });
    fade(A(t, 18.2, .5), () => F([['¬(', 'r', LIE], ['p', 'i'], [' ∧ ', 'r'], ['q', 'i'], [')', 'r', LIE], ['  =  ', 'r'], ['¬p', 'i', NOW], [' ∨ ', 'r'], ['¬q', 'i', NOW]], CX, 1100, 56));
  },
  // 8 · La fila de la semana: «mañana mentiré».
  semana(t) {
    stars(t, .3);
    pill(CX, 540, 460, 90, SAY, '«Mañana mentiré»', { s: 40 });
    const fits = i => { const c = !!LIAR[(i + 1) % 7]; return LIAR[i] ? !c : c; };
    week(760, t, 9.6, fits, { hl: i => t > 18 && (i === 2 || i === 6) });
    fade(A(t, 9.2, .5), () => { mono('verde: la frase debe ser cierta', CX, 940, TRU, { s: 24 }); mono('magenta: debe ser falsa', CX, 985, LIE, { s: 24 }); });
    fade(A(t, 18.2, .5), () => { mono('X: miente; el jueves dirá la verdad → falsa ✓', CX, 1090, NOW, { s: 23 }); mono('D: verdad; el lunes mentirá → cierta ✓', CX, 1140, NOW, { s: 23 }); });
  },
  // 9 · La semana resuelta.
  resolver(t) {
    stars(t, .3);
    const ayer = i => { const c = !!LIAR[(i + 6) % 7]; return LIAR[i] ? !c : c; }, tres = i => { const c = !LIAR[(i + 3) % 7]; return LIAR[i] ? !c : c; };
    mono('«Ayer mentí»', 140, 520, SAY, { s: 26, a: 'l' }); week(600, t, 1, ayer, { hl: i => t > 9 && (i === 0 || i === 3) });
    fade(A(t, 10, .5), () => { mono('«En tres días diré la verdad»', 140, 800, SAY, { s: 26, a: 'l' }); week(880, t, 10.4, tres, { hl: i => t > 20 && i === 3 }); });
    fade(A(t, 20.2, .5), () => mono('el único día con ✓ en las dos filas: jueves', CX, 1080, NOW, { s: 26 }));
  },
  // 10 · Cierre: la opción A, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['Jueves', 'Lunes', 'Miércoles', 'Domingo'], 0, 'jueves: ayer (miércoles) mintió; el domingo dirá la verdad', { fs: 34 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['suponer y chocar', 'r']], 'el método'], [[['culpable por culpable', 'r']], 'probar casos'], [[['«soy falaz»', 'r']], 'nadie lo dice'], [[['¬(p ∧ q)', 'r']], 'mentir con dos partes']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [TRU, LIE, SUP]);
    });
  },
};
